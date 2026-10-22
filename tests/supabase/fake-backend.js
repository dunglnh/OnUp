/* Máy chủ Supabase giả trong bộ nhớ, để kiểm thử Edge Function admin (và sau này SupabaseStore) khi chưa có project thật.
   Mô phỏng supabase/schema.sql: các bảng, khóa chính, xóa dây chuyền, quyền theo cột (grant), chính sách RLS, trigger
   (hạn mức hồ sơ con theo gói, khóa hồ sơ vượt hạn mức, kết quả), các hàm RPC; Supabase Auth: đăng nhập bằng mật khẩu,
   đổi mật khẩu, API admin (tạo, sửa, cấm, xóa người dùng); gọi Edge Function (hàm thật được truyền vào).
   RLS thật được kiểm tra riêng trên PostgreSQL bằng tests/supabase/run.sh; tests/supabase/admin-test.mjs so hai bên.
   be.intR = true: như máy chủ chưa chạy supabase/cap-nhat-k2.sql (results.r còn là số nguyên, chưa có cột passages).
   be.noReports = true: như máy chủ chưa chạy supabase/cap-nhat-r1.sql (chưa có bảng question_reports).
   be.failResults = true: mọi lệnh ghi vào bảng results lỗi như mất mạng, đến khi tắt (Phiên UX6: kết quả nằm lại trong hộp gửi).
     cloud-e2e.js gọi máy chủ giả qua exposeFunction, không qua mạng, nên context.setOffline không làm lượt gửi lỗi được.
   be.delayResults = <ms>: lệnh ghi vào bảng results trả lời chậm chừng đó (mạng chậm hơn thời gian app chờ lượt gửi, UX6).
   be.noEventsSeen = true: như máy chủ chưa chạy supabase/cap-nhat-lich.sql (families chưa có cột seed_events_seen: select không trả cột đó,
     update có cột đó lỗi PGRST204; app bỏ qua bước gộp lịch mặc định). */
"use strict";
const nodeCrypto = require("crypto");

const PK = {
  plans: ["id"], app_owners: ["user_id"], families: ["id"], profiles: ["id"], exam_events: ["family_id", "id"],
  question_banks: ["family_id", "id"], results: ["id"], paid_banks: ["id"], question_reports: ["id"], admin_notes: ["family_id"], plan_log: ["id"], admin_log: ["id"]
};
const ALL = "*";
// Quyền của người đăng nhập (authenticated) theo cột, như các lệnh grant trong schema.sql. null = không được.
const GRANT = {
  plans: { select: ALL, insert: ALL, update: ALL, delete: true },
  app_owners: { select: ALL, insert: null, update: null, delete: false },
  families: { select: ALL, insert: null, update: ["display_name", "school_year", "seed_banks_seen", "seed_events_seen"], delete: false },
  profiles: { select: ALL, insert: ["id", "family_id", "name", "avatar", "grade", "class_name", "pin_hash"], update: ["name", "avatar", "grade", "class_name", "pin_hash"], delete: true },
  exam_events: { select: ALL, insert: ALL, update: ALL, delete: true },
  question_banks: { select: ALL, insert: ALL, update: ALL, delete: true },
  results: { select: ALL, insert: ["id", "profile_id", "source", "ref_id", "subject", "label", "mode", "r", "t", "s", "wrong_topics"], update: null, delete: true },
  paid_banks: { select: ALL, insert: ALL, update: ALL, delete: true },
  question_reports: { select: ALL, insert: ["id", "profile_id", "bank_id", "q_key", "q_text", "reason", "note"], update: ["status"], delete: false },
  admin_notes: { select: ALL, insert: ALL, update: ALL, delete: true },
  plan_log: { select: ALL, insert: null, update: null, delete: false },
  admin_log: { select: ALL, insert: null, update: null, delete: false }
};
const USERNAME_RE = /^[a-z0-9][a-z0-9._]{2,18}[a-z0-9]$/;
const clone = (x) => (x === undefined ? undefined : JSON.parse(JSON.stringify(x)));
const fail = (message, code) => ({ data: null, error: { message, code: code == null ? "42501" : code } });
class Fail extends Error { constructor(m, code) { super(m); this.code = code; } }
const denied = (t) => new Fail("permission denied for table " + t);
const rlsFail = (t) => new Fail('new row violates row-level security policy for table "' + t + '"');

function createBackend() {
  const T = {}; Object.keys(PK).forEach((k) => (T[k] = []));
  T.plans.push({ id: "free", name: "Miễn phí", max_children: 5, all_banks: true, price: null, note: "" },
    { id: "family", name: "Gói Gia đình", max_children: 5, all_banks: true, price: null, note: "" });
  const users = new Map(), tokens = new Map();
  const be = { T, users, tokens, clock: 0, failWrites: 0, failResults: false, delayResults: 0, functions: {}, log: [], rateLimit: true, captchaRequired: false, captchaUsed: 0 };
  const now = () => new Date(Date.now() + be.clock);
  const iso = () => now().toISOString();
  const todayVN = () => new Date(+now() + 7 * 3600e3).toISOString().slice(0, 10);
  let seq = 0, lastCreated = 0;

  /* ---------- hàm hỗ trợ RLS (như trong schema.sql) ---------- */
  const uidOf = (token) => (token ? tokens.get(token) || null : null);
  const myFamily = (uid) => (uid ? T.families.find((f) => f.auth_user_id === uid && f.status === "active") || null : null);
  const myFamilyId = (uid) => (myFamily(uid) || {}).id || null;
  const isOwner = (uid) => !!uid && T.app_owners.some((o) => o.user_id === uid);
  function planActive(fid, uid, service) {
    const f = T.families.find((x) => x.id === fid);
    if (!f || !(service || !uid || f.auth_user_id === uid || isOwner(uid))) return false;
    return f.plan !== "free" && !!f.plan_until && f.plan_until >= todayVN();
  }
  const effectivePlan = (fid) => (planActive(fid, null, true) ? T.families.find((f) => f.id === fid).plan : "free");
  const planOf = (fid) => T.plans.find((p) => p.id === effectivePlan(fid));
  const canReadAllBanks = (uid) => !!myFamilyId(uid) && !!(planOf(myFamilyId(uid)) || {}).all_banks;
  function syncLocks(fid) {
    const f = T.families.find((x) => x.id === fid);
    if (!f) return;
    const lim = planOf(fid).max_children;
    T.profiles.filter((p) => p.family_id === fid).sort((a, b) => (a.created_at === b.created_at ? (a.id < b.id ? -1 : 1) : a.created_at < b.created_at ? -1 : 1))
      .forEach((p, i) => { p.locked = i + 1 > lim; });
  }

  function canSee(table, row, uid) {
    const fid = myFamilyId(uid);
    switch (table) {
      case "plans": return true;
      case "app_owners": return row.user_id === uid;
      case "families": return row.auth_user_id === uid || isOwner(uid);
      case "profiles": case "exam_events": case "question_banks": case "results": return !!fid && row.family_id === fid;
      case "paid_banks": return isOwner(uid) || (row.published && !!fid && (row.free_trial || canReadAllBanks(uid)));
      case "question_reports": return (!!fid && row.family_id === fid) || isOwner(uid);
      case "admin_notes": case "plan_log": case "admin_log": return isOwner(uid);
      default: return false;
    }
  }
  function canInsert(table, row, uid) {
    const fid = myFamilyId(uid);
    switch (table) {
      case "plans": case "paid_banks": case "admin_notes": return isOwner(uid);
      case "profiles": case "exam_events": case "question_banks": case "results": case "question_reports": return !!fid && row.family_id === fid;
      default: return false;
    }
  }
  function canWrite(table, row, uid, op) {
    const fid = myFamilyId(uid);
    switch (table) {
      case "plans": return isOwner(uid) && (op !== "delete" || row.id !== "free");
      case "paid_banks": case "admin_notes": return isOwner(uid);
      case "question_reports": return op === "update" && isOwner(uid);
      case "families": return op === "update" && !!fid && row.id === fid;
      case "profiles": case "exam_events": case "question_banks": return !!fid && row.family_id === fid;
      case "results": return op === "delete" && !!fid && row.family_id === fid;
      default: return false;
    }
  }

  /* ---------- trigger, ràng buộc, xóa dây chuyền ---------- */
  function beforeInsert(table, row, uid, importing) {
    if (table === "families") {
      row.id = row.id || nodeCrypto.randomUUID();
      if (!USERNAME_RE.test(row.username || "") || row.username.includes("..")) throw new Fail('new row for relation "families" violates check constraint "families_username_check"', "23514");
      if (T.families.some((f) => f.username === row.username || f.auth_user_id === row.auth_user_id)) throw new Fail("duplicate key value violates unique constraint", "23505");
      if (!users.has(row.auth_user_id)) throw new Fail("insert or update on table \"families\" violates foreign key constraint", "23503");
      Object.assign(row, Object.assign({ display_name: "", school_year: "2026–2027", seed_banks_seen: [], seed_events_seen: [], plan: "free", plan_until: null,
        must_change_password: true, status: "active", created_at: iso(), last_seen_at: null }, row));
    }
    if (table === "profiles") {
      row.id = row.id || nodeCrypto.randomUUID();
      row.family_id = row.family_id || myFamilyId(uid);
      row.name = String(row.name || "").trim();
      if (!row.name || row.name.length > 40) throw new Fail('new row for relation "profiles" violates check constraint "profiles_name_check"', "23514");
      if (!(Number.isInteger(+row.grade) && row.grade >= 1 && row.grade <= 12)) throw new Fail('new row for relation "profiles" violates check constraint "profiles_grade_check"', "23514");
      row.avatar = row.avatar || "🐣"; row.class_name = row.class_name || ""; row.pin_hash = row.pin_hash == null ? null : row.pin_hash;
      row.locked = false; row.import_key = row.import_key || null;
      // thời điểm tạo tăng dần (như clock_timestamp()), để thứ tự khóa hồ sơ ổn định
      lastCreated = Math.max(+now(), lastCreated + 1);
      row.created_at = new Date(lastCreated).toISOString();
      const lim = (planOf(row.family_id) || {}).max_children || 0;
      if (T.profiles.filter((p) => p.family_id === row.family_id).length >= lim) throw new Fail("Tài khoản đã có đủ " + lim + " hồ sơ con theo gói hiện tại.", "P0001");
    }
    if (table === "results") {
      row.id = row.id || nodeCrypto.randomUUID();
      const p = T.profiles.find((x) => x.id === row.profile_id);
      row.family_id = p ? p.family_id : null;
      if (be.intR && !Number.isInteger(+row.r)) throw new Fail(`invalid input syntax for type integer: "${row.r}"`, "22P02");
      row.r = Math.round(+row.r * 100) / 100; // numeric(7,2)
      if (!(row.t > 0 && row.t <= 1000 && row.r >= 0 && row.r <= row.t)) throw new Fail('new row for relation "results" violates check constraint "results_check"', "23514");
      if (!["module", "bank"].includes(row.source)) throw new Fail('new row for relation "results" violates check constraint "results_source_check"', "23514");
      if (!importing) {
        row.at = iso(); row.import_key = null;
        if (p) {
          syncLocks(p.family_id);
          if (p.locked) throw new Fail("Hồ sơ này đang bị khóa vì vượt số hồ sơ của gói. Nhờ bố mẹ gia hạn gói để làm bài tiếp.", "P0001");
        }
        if (be.rateLimit && T.results.filter((x) => x.profile_id === row.profile_id && new Date(x.at) > new Date(+now() - 600000) && new Date(x.at) <= now()).length >= 60) {
          throw new Fail("Gửi quá nhiều kết quả trong thời gian ngắn. Đợi vài phút rồi thử lại.", "P0001");
        }
      }
    }
    if (table === "exam_events") {
      if (!["dinh-ki", "ioe", "thi-khac", "moc"].includes(row.kind)) throw new Fail("exam_events_kind_check", "23514");
      if ((row.grades || []).some((g) => !(g >= 1 && g <= 12))) throw new Fail("exam_events_grades_check", "23514");
      // như ràng buộc exam_events_check trong schema.sql (trần nâng ở supabase/cap-nhat-lich.sql: 500 đề một kì thi)
      if ((row.grades || []).length > 12 || (row.subjects || []).length > 30 || (row.modules || []).length > 50 || (row.banks || []).length > 500
        || (row.subjects || []).concat(row.modules || [], row.banks || []).join("").length > 20000) throw new Fail('new row for relation "exam_events" violates check constraint "exam_events_check"', "23514");
      row.start_date = row.start_date || null; row.end_date = row.end_date || null;
      if (T.exam_events.filter((x) => x.family_id === row.family_id).length >= 500) throw new Fail("Tài khoản đã có 500 mục, không thêm được nữa.", "P0001");
    }
    if (table === "question_banks") {
      if (!(row.grade >= 1 && row.grade <= 12)) throw new Fail("question_banks_grade_check", "23514");
      if (be.intR && "passages" in row) throw new Fail("Could not find the 'passages' column of 'question_banks' in the schema cache", "PGRST204");
      if (row.passages == null) row.passages = {};
      if (typeof row.passages !== "object" || Array.isArray(row.passages)) throw new Fail("question_banks_passages_check", "23514");
      if (T.question_banks.filter((x) => x.family_id === row.family_id).length >= 100) throw new Fail("Tài khoản đã có 100 mục, không thêm được nữa.", "P0001");
    }
    if (table === "paid_banks") row.updated_at = iso();
    if (table === "plan_log" || table === "admin_log") { row.id = row.id || ++seq; row.at = iso(); }
    if (table === "admin_notes") row.updated_at = row.updated_at || iso();
    if (table === "question_reports") {
      // như question_reports_before_insert trong schema.sql
      row.id = row.id || nodeCrypto.randomUUID();
      row.family_id = row.family_id || myFamilyId(uid);
      if (!row.family_id) throw new Fail('null value in column "family_id" of relation "question_reports" violates not-null constraint', "23502");
      if (row.profile_id != null && !T.profiles.some((p) => p.id === row.profile_id && p.family_id === row.family_id)) throw new Fail("Hồ sơ không thuộc tài khoản này.", "P0001");
      if (row.profile_id === undefined) row.profile_id = null;
      const len = (s) => String(s == null ? "" : s).length;
      if (!(len(row.bank_id) >= 1 && len(row.bank_id) <= 80) || !(len(row.q_key) >= 1 && len(row.q_key) <= 40)) throw new Fail("question_reports_bank_id_check", "23514");
      row.q_text = row.q_text == null ? "" : String(row.q_text); row.note = String(row.note == null ? "" : row.note).trim().slice(0, 200);
      if (row.q_text.length > 500) throw new Fail("question_reports_q_text_check", "23514");
      if (!["wrong", "unclear", "typo", "other"].includes(row.reason)) throw new Fail("question_reports_reason_check", "23514");
      row.status = "new"; row.created_at = iso();
      const dayStart = new Date(todayVN() + "T00:00:00+07:00");
      if (T.question_reports.filter((x) => x.family_id === row.family_id && new Date(x.created_at) >= dayStart).length >= 30) throw new Fail("Mỗi gia đình báo được tối đa 30 câu một ngày. Mai báo tiếp nhé.", "P0001");
    }
  }
  function afterUpdate(table, row, patch) {
    if (table === "families" && ("plan" in patch || "plan_until" in patch)) syncLocks(row.id);
    if (table === "families") { // trần số mã đã xét (families_seed_banks_seen_check, families_seed_events_seen_check: 5 000, cap-nhat-lich.sql)
      ["seed_banks_seen", "seed_events_seen"].forEach((c) => { if (c in patch && (!Array.isArray(patch[c]) || patch[c].length > 5000)) throw new Fail(`new row for relation "families" violates check constraint "families_${c}_check"`, "23514"); });
    }
    if (table === "profiles" && "name" in patch) row.name = String(row.name).trim();
    if (table === "paid_banks") row.updated_at = iso();
  }
  function removeRow(table, row) {
    T[table] = T[table].filter((x) => x !== row);
    if (table === "families") {
      ["exam_events", "question_banks", "results", "question_reports", "admin_notes"].forEach((t) => (T[t] = T[t].filter((x) => x.family_id !== row.id)));
      T.profiles = T.profiles.filter((p) => p.family_id !== row.id);
      T.plan_log.forEach((l) => { if (l.family_id === row.id) l.family_id = null; });
    }
    if (table === "profiles") {
      T.results = T.results.filter((r) => r.profile_id !== row.id);
      T.question_reports.forEach((r) => { if (r.profile_id === row.id) r.profile_id = null; });
      syncLocks(row.family_id);
    }
  }
  // tối đa 2000 kết quả mỗi hồ sơ
  function trimResults(pids) {
    const drop = new Set();
    new Set(pids).forEach((pid) => {
      const mine = T.results.filter((r) => r.profile_id === pid).sort((a, b) => (a.at < b.at ? 1 : a.at > b.at ? -1 : a.id < b.id ? 1 : -1));
      mine.slice(2000).forEach((r) => drop.add(r));
    });
    if (drop.size) T.results = T.results.filter((r) => !drop.has(r));
  }

  /* ---------- truy vấn ---------- */
  const match = (row, filters) => filters.every(([k, c, v]) => (k === "eq" ? row[c] === v : k === "neq" ? row[c] !== v : k === "in" ? v.includes(row[c]) : true));
  const pick = (row, cols, table) => {
    let out;
    if (!cols || cols === "*") out = clone(row);
    else { out = {}; cols.split(",").map((c) => c.trim()).forEach((c) => (out[c] = row[c] === undefined ? null : clone(row[c]))); }
    if (table === "families" && be.noEventsSeen) delete out.seed_events_seen; // máy chủ chưa có cột
    return out;
  };
  const pkOf = (table, row, keys) => (keys || PK[table]).map((k) => row[k]).join("|");
  function checkCols(table, op, row, service) {
    if (table === "families" && be.noEventsSeen && "seed_events_seen" in row) throw new Fail("Could not find the 'seed_events_seen' column of 'families' in the schema cache", "PGRST204");
    if (service) return;
    const g = GRANT[table];
    if (!g || g[op] == null) throw denied(table);
    if (g[op] !== ALL) Object.keys(row).forEach((c) => { if (!g[op].includes(c)) throw denied(table); });
  }
  function query(q, uid, service) {
    const table = q.table;
    if (!T[table]) throw new Fail("relation does not exist");
    if (table === "question_reports" && be.noReports) throw new Fail("Could not find the table 'public.question_reports' in the schema cache", "PGRST205");
    if (!service && !uid) throw denied(table); // vai trò anon: không được gì
    const visible = (r) => service || canSee(table, r, uid);
    if (q.op !== "select" && be.failWrites > 0) { be.failWrites--; throw new Fail(be.failMsg || "TypeError: Failed to fetch", be.failCode || ""); }
    if (q.op !== "select" && table === "results" && be.failResults) throw new Fail("TypeError: Failed to fetch", "");
    if (q.op === "select") {
      let rows = T[table].filter((r) => visible(r) && match(r, q.filters));
      q.orders.slice().reverse().forEach(([c, asc]) => rows.sort((a, b) => (a[c] === b[c] ? 0 : (a[c] < b[c] ? -1 : 1) * (asc ? 1 : -1))));
      const [a, b] = q.range || [0, 999];
      rows = rows.slice(a, Math.min(b, a + 999) + 1); // như PostgREST: tối đa 1000 dòng mỗi lần
      rows = rows.map((r) => pick(r, q.cols, table));
      if (q.single) {
        if (rows.length > 1 || (q.single === "one" && !rows.length)) throw new Fail("JSON object requested, multiple (or no) rows returned");
        return rows[0] || null;
      }
      return rows;
    }
    if (q.op === "insert" || q.op === "upsert") {
      const keys = q.onConflict ? q.onConflict.split(",").map((s) => s.trim()) : PK[table];
      const staged = clone(T); // để hủy cả lệnh khi một dòng lỗi
      const out = [];
      try {
        q.values.forEach((v) => {
          const row = clone(v);
          const old = T[table].find((x) => keys.every((k) => row[k] !== undefined) && pkOf(table, x, keys) === pkOf(table, row, keys));
          if (old && q.op === "upsert") {
            if (q.ignoreDuplicates) return;
            checkCols(table, "update", row, service);
            if (!service && !(visible(old) && canWrite(table, old, uid, "update"))) throw rlsFail(table);
            Object.assign(old, row); afterUpdate(table, old, row);
            if (!service && !canWrite(table, old, uid, "update")) throw rlsFail(table);
            out.push(old);
            return;
          }
          if (old) throw new Fail("duplicate key value violates unique constraint", "23505");
          checkCols(table, "insert", row, service);
          beforeInsert(table, row, uid, false);
          if (!service && !canInsert(table, row, uid)) throw rlsFail(table);
          T[table].push(row); out.push(row);
        });
        if (table === "results") trimResults(out.map((r) => r.profile_id));
      } catch (e) { Object.keys(staged).forEach((k) => (T[k] = staged[k])); throw e; }
      if (!q.returning) return null;
      const rows = out.map((r) => pick(r, q.returning, table));
      return q.single ? rows[0] || null : rows;
    }
    if (q.op === "update") {
      checkCols(table, "update", q.patch, service);
      if (table === "families") afterUpdate(table, {}, q.patch); // ràng buộc trên patch (trần số mã đã xét) trước khi ghi
      if (table === "question_reports" && "status" in q.patch && !["new", "fixed", "rejected"].includes(q.patch.status)) throw new Fail("question_reports_status_check", "23514");
      const rows = T[table].filter((r) => visible(r) && match(r, q.filters) && (service || canWrite(table, r, uid, "update")));
      rows.forEach((r) => { Object.assign(r, clone(q.patch)); afterUpdate(table, r, q.patch); });
      if (!q.returning) return null;
      const out = rows.map((r) => pick(r, q.returning, table));
      return q.single ? out[0] || null : out;
    }
    if (q.op === "delete") {
      if (!service && !GRANT[table].delete) throw denied(table);
      T[table].filter((r) => visible(r) && match(r, q.filters) && (service || canWrite(table, r, uid, "delete"))).forEach((r) => removeRow(table, r));
      return null;
    }
    throw new Fail("bad op");
  }

  /* ---------- RPC (như các hàm trong schema.sql) ---------- */
  function rpc(name, a, uid, service) {
    if (!uid && !service) throw new Fail("permission denied for function " + name);
    const fid = myFamilyId(uid);
    switch (name) {
      case "my_family_id": return fid;
      case "is_owner": return isOwner(uid);
      case "plan_active": return planActive(a.fid, uid, service);
      case "can_read_all_banks": return canReadAllBanks(uid);
      case "touch": {
        const f = myFamily(uid);
        if (!f) return null;
        if (!f.last_seen_at || new Date(f.last_seen_at) < new Date(+now() - 300000)) f.last_seen_at = iso();
        syncLocks(f.id);
        return null;
      }
      case "password_changed": { const f = myFamily(uid); if (f) f.must_change_password = false; return null; }
      case "import_local": {
        const staged = clone(T);
        try { return importLocal(a.p_data, fid); } catch (e) { Object.keys(staged).forEach((k) => (T[k] = staged[k])); throw e; }
      }
      default: throw new Fail("function " + name + " does not exist");
    }
  }
  function importLocal(d, fid) {
    if (!fid) throw new Fail("Cần đăng nhập bằng tài khoản đang hoạt động.");
    if (!d || !Array.isArray(d.users)) throw new Fail("Dữ liệu không đúng định dạng.");
    if (d.from === "cloud" || d.users.some((u) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(u.id))))
      throw new Fail("File này là bản sao lưu từ đám mây, dữ liệu đã có trên máy chủ.");
    const ids = {}, touched = [];
    let nProf = 0, nRes = 0;
    d.users.forEach((u) => {
      if (u.role !== "student" || !String(u.name || "").trim() || !u.id) return;
      if (!/^\d{1,2}$/.test(String(u.grade ?? "")) || !(+u.grade >= 1 && +u.grade <= 12)) return;
      let p = T.profiles.find((x) => x.family_id === fid && x.import_key === u.id);
      if (!p) {
        p = { family_id: fid, name: String(u.name).trim().slice(0, 40), avatar: u.avatar || "🐣", grade: +u.grade, class_name: String(u.className || "").slice(0, 20),
          pin_hash: u.pinHash ? ((u.salt || "") + "$" + u.pinHash).slice(0, 200) : null };
        beforeInsert("profiles", p, null, true); p.import_key = u.id;
        T.profiles.push(p); nProf++;
      }
      ids[u.id] = p.id;
    });
    (d.events || []).forEach((e) => {
      if (!e.id || !String(e.title || "").trim()) return;
      const row = { id: e.id, family_id: fid, title: e.title, kind: ["dinh-ki", "ioe", "thi-khac", "moc"].includes(e.kind) ? e.kind : "dinh-ki",
        grades: (e.grades || []).filter((g) => g >= 1 && g <= 12), start_date: e.start || null, end_date: e.end || e.start || null, tentative: !!e.tentative,
        subjects: e.subjects || [], scope: e.scope || "", note: e.note || "", modules: e.modules || [], banks: e.banks || [] };
      const old = T.exam_events.find((x) => x.family_id === fid && x.id === e.id);
      if (old) Object.assign(old, row); else T.exam_events.push(row);
    });
    (d.banks || []).forEach((b) => {
      if (!b.id || !Array.isArray(b.questions) || !(+b.grade >= 1 && +b.grade <= 12)) return;
      const row = { id: b.id, family_id: fid, title: b.title || "Ngân hàng", grade: +b.grade, subject: b.subject || "", minutes: +b.minutes || 0, note: b.note || "", src: b.src || "", questions: b.questions,
        passages: b.passages && typeof b.passages === "object" && !Array.isArray(b.passages) ? b.passages : {} };
      const old = T.question_banks.find((x) => x.family_id === fid && x.id === b.id);
      if (old) Object.assign(old, row); else T.question_banks.push(row);
    });
    (d.results || []).forEach((r) => {
      const pid = ids[r.userId];
      if (!pid || !["module", "bank"].includes(r.source) || !/^\d{1,9}$/.test(String(r.t ?? "")) || !(+r.t > 0)) return;
      const key = r.id || JSON.stringify(r);
      if (T.results.some((x) => x.family_id === fid && x.import_key === key)) return;
      const t = Math.min(+r.t, 1000);
      const row = { id: nodeCrypto.randomUUID(), profile_id: pid, source: r.source, ref_id: r.refId || "", subject: r.subject || "", label: r.label || "", mode: r.mode || "",
        r: Math.min(/^\d{1,9}(\.\d+)?$/.test(String(r.r ?? "")) ? Math.round(+r.r * 100) / 100 : 0, t), t, s: /^\d{1,9}$/.test(String(r.s ?? "")) ? +r.s : 0, wrong_topics: r.wrongTopics || null, import_key: key,
        at: /^\d{4}-\d{2}-\d{2}T/.test(r.at || "") && !isNaN(new Date(r.at)) ? new Date(Math.min(+new Date(r.at), +now())).toISOString() : iso() };
      beforeInsert("results", row, null, true); row.import_key = key;
      T.results.push(row); nRes++; touched.push(pid);
    });
    trimResults(touched);
    const f = T.families.find((x) => x.id === fid);
    if (Array.isArray(d.seedBanksSeen)) f.seed_banks_seen = Array.from(new Set(f.seed_banks_seen.concat(d.seedBanksSeen)));
    if (Array.isArray(d.seedEventsSeen) && !be.noEventsSeen) f.seed_events_seen = Array.from(new Set((f.seed_events_seen || []).concat(d.seedEventsSeen)));
    if (!f.display_name && d.settings && d.settings.schoolName) f.display_name = String(d.settings.schoolName).trim().slice(0, 80);
    return { profiles: nProf, results: nRes, ids };
  }

  /* ---------- Supabase Auth ---------- */
  function newSession(user) {
    const t = "tok-" + nodeCrypto.randomUUID();
    tokens.set(t, user.id);
    return { access_token: t, refresh_token: "r-" + t, token_type: "bearer", user: publicUser(user) };
  }
  const publicUser = (u) => ({ id: u.id, email: u.email, user_metadata: clone(u.user_metadata || {}), banned_until: u.banned_until || null });
  const banned = (u) => !!u.banned_until && new Date(u.banned_until) > now();
  const logout = (id) => { for (const [t, uid] of tokens) if (uid === id) tokens.delete(t); };
  // Như Supabase khi bật CAPTCHA: đăng nhập cần mã xác minh hợp lệ (mỗi mã dùng một lần).
  const usedCaptcha = new Set();
  function captchaFail(a) {
    if (!be.captchaRequired) return null;
    if (!a.captchaToken) return { error: { message: "captcha protection: request disallowed (no captcha_token)" } };
    if (!/^ok-/.test(a.captchaToken) || usedCaptcha.has(a.captchaToken)) return { error: { message: "captcha protection: request disallowed (captcha verification process failed)" } };
    usedCaptcha.add(a.captchaToken); be.captchaUsed++;
    return null;
  }
  const findByEmail = (email) => [...users.values()].find((x) => x.email === String(email || "").toLowerCase());
  function auth(op, a, token, service) {
    if (op === "password") {
      const c = captchaFail(a); if (c) return c;
      const u = findByEmail(a.email);
      if (!u || u.password !== a.password) return { error: { message: "Invalid login credentials", code: "invalid_credentials", status: 400 } };
      if (banned(u)) return { error: { message: "User is banned", code: "user_banned", status: 400 } };
      return { session: newSession(u) };
    }
    if (op === "signOut") { tokens.delete(token); return {}; }
    if (op === "getUser") {
      const id = uidOf(a.token), u = id && users.get(id);
      return u && !banned(u) ? { user: publicUser(u) } : { error: { message: "invalid JWT", status: 401 } };
    }
    if (op === "updateUser") {
      const id = uidOf(token), u = id && users.get(id);
      if (!u) return { error: { message: "Auth session missing!", status: 401 } };
      if (a.password != null) {
        if (String(a.password).length < 8) return { error: { message: "Password should be at least 8 characters.", code: "weak_password", status: 422 } };
        if (a.password === u.password) return { error: { message: "New password should be different from the old password.", code: "same_password", status: 422 } };
        u.password = a.password;
        for (const [t, uid] of tokens) if (uid === id && t !== token) tokens.delete(t); // đổi mật khẩu: đăng xuất các máy khác
      }
      return { user: publicUser(u) };
    }
    // API admin: chỉ với khóa bí mật
    if (op.startsWith("admin.") && !service) return { error: { message: "User not allowed", code: "not_admin", status: 403 } };
    if (op === "admin.createUser") {
      const email = String(a.email || "").toLowerCase();
      if (!/^[^@\s]+@[a-z0-9.-]+$/.test(email)) return { error: { message: "Unable to validate email address: invalid format", code: "validation_failed", status: 400 } };
      if (findByEmail(email)) return { error: { message: "A user with this email address has already been registered", code: "email_exists", status: 422 } };
      if (String(a.password || "").length < 8) return { error: { message: "Password should be at least 8 characters.", code: "weak_password", status: 422 } };
      const u = { id: nodeCrypto.randomUUID(), email, password: a.password, email_confirmed: !!a.email_confirm, user_metadata: clone(a.user_metadata || {}), banned_until: null };
      users.set(u.id, u);
      return { user: publicUser(u) };
    }
    if (op === "admin.updateUserById") {
      const u = users.get(a.id);
      if (!u) return { error: { message: "User not found", code: "user_not_found", status: 404 } };
      const p = a.attributes || {};
      if (p.password != null) {
        if (String(p.password).length < 8) return { error: { message: "Password should be at least 8 characters.", code: "weak_password", status: 422 } };
        u.password = p.password; logout(u.id); // như Supabase: đặt mật khẩu bằng quyền admin thì đăng xuất mọi máy
      }
      if (p.ban_duration != null) {
        if (p.ban_duration === "none") u.banned_until = null;
        else { const h = /^(\d+)h$/.exec(p.ban_duration); if (!h) return { error: { message: "invalid format for ban duration", status: 400 } }; u.banned_until = new Date(+now() + h[1] * 3600e3).toISOString(); }
      }
      return { user: publicUser(u) };
    }
    if (op === "admin.deleteUser") {
      const u = users.get(a.id);
      if (!u) return { error: { message: "User not found", code: "user_not_found", status: 404 } };
      users.delete(u.id); logout(u.id);
      // khóa ngoại on delete cascade: families, app_owners
      T.families.filter((f) => f.auth_user_id === u.id).forEach((f) => removeRow("families", f));
      T.app_owners = T.app_owners.filter((o) => o.user_id !== u.id);
      return { user: null };
    }
    return { error: { message: "bad auth op" } };
  }
  /* Tiện cho kiểm thử: tạo người dùng Auth (như Authentication → Add user trong trang Supabase). */
  be.addUser = (email, password) => auth("admin.createUser", { email, password, email_confirm: true }, null, true).user;

  /* ---------- cổng nhận tin nhắn từ client giả ---------- */
  be.handle = async function (msg) {
    const uid = msg.service ? null : uidOf(msg.token);
    be.log.push({ kind: msg.kind, op: msg.q ? msg.q.op + " " + msg.q.table : msg.name || msg.op, uid });
    if (be.delayResults > 0 && msg.kind === "query" && msg.q.table === "results" && msg.q.op !== "select") await new Promise((r) => setTimeout(r, be.delayResults));
    try {
      if (msg.kind === "query") return { data: query(msg.q, uid, msg.service), error: null };
      if (msg.kind === "rpc") return { data: clone(rpc(msg.name, msg.args || {}, uid, msg.service)), error: null };
      if (msg.kind === "auth") return auth(msg.op, msg.args || {}, msg.token, msg.service);
      if (msg.kind === "invoke") {
        const h = be.functions[msg.name];
        if (!h) return { status: 404, body: { error: "not found" } };
        const res = await h(new Request("http://fake/functions/v1/" + msg.name, {
          method: "POST", body: JSON.stringify(msg.body),
          headers: { "content-type": "application/json", authorization: "Bearer " + (msg.token || "anon-key") }
        }));
        return { status: res.status, body: await res.json() };
      }
      return fail("bad message");
    } catch (e) {
      if (e instanceof Fail) return fail(e.message, e.code);
      throw e;
    }
  };
  be.getUser = async (token) => { const r = auth("getUser", { token }); return r.user ? { id: r.user.id } : null; };
  be.todayVN = todayVN;
  return be;
}
module.exports = { createBackend };
