/* Máy chủ Supabase giả trong bộ nhớ, chỉ để kiểm thử SupabaseStore khi chưa có project thật.
   Mô phỏng: các bảng, khóa chính, xóa dây chuyền, trigger và chính sách RLS của supabase/schema.sql (phần app dùng),
   các hàm RPC, đăng nhập email bằng mã OTP, đăng nhập ẩn danh, và gọi Edge Function (hàm thật được truyền vào).
   RLS thật được kiểm tra riêng trên PostgreSQL bằng tests/supabase/run.sh. */
"use strict";
const nodeCrypto = require("crypto");

const PK = {
  families: ["id"], profiles: ["id"], parent_child: ["parent_id", "child_id"], exam_events: ["family_id", "id"],
  question_banks: ["family_id", "id"], results: ["id"], student_sessions: ["auth_user_id"], student_pins: ["profile_id"], login_attempts: ["key"],
  known_devices: ["profile_id", "device"], allowed_creators: ["email"]
};
// Cột người đăng nhập (authenticated) được ghi, như các lệnh grant trong schema.sql.
const GRANT = {
  families: { insert: null, update: ["name", "school_year", "seed_banks_seen"], select: ["id", "name", "school_year", "seed_banks_seen", "created_at"] },
  profiles: { insert: ["id", "family_id", "role", "name", "avatar", "grade", "class_name"], update: ["name", "avatar", "grade", "class_name"] },
  parent_child: { insert: ["parent_id", "child_id"], update: null },
  exam_events: { insert: "*", update: "*" }, question_banks: { insert: "*", update: "*" },
  results: { insert: ["id", "profile_id", "source", "ref_id", "subject", "label", "mode", "r", "t", "s", "wrong_topics"], update: null },
  student_sessions: { insert: null, update: null }, student_pins: null, login_attempts: null, known_devices: null, allowed_creators: null
};
const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const code = (n) => Array.from(nodeCrypto.randomBytes(n), (b) => ALPHA[b % 32]).join("");
const clone = (x) => (x === undefined ? undefined : JSON.parse(JSON.stringify(x)));
const fail = (message, code) => ({ data: null, error: { message, code: code == null ? "42501" : code } });
class Fail extends Error { constructor(m, code) { super(m); this.code = code; } }

function createBackend() {
  const T = {}; Object.keys(PK).forEach((k) => (T[k] = []));
  const users = new Map(), tokens = new Map(), outbox = [];
  const be = { T, users, outbox, clock: 0, failWrites: 0, functions: {}, log: [], anonEnabled: true, rateLimit: true };
  const now = () => new Date(Date.now() + be.clock);

  /* ---------- RLS ---------- */
  const uidOf = (token) => (token ? tokens.get(token) || null : null);
  function me(uid) {
    if (!uid) return null;
    const p = T.profiles.find((x) => x.auth_user_id === uid);
    if (p) return p;
    const s = T.student_sessions.find((x) => x.auth_user_id === uid && new Date(x.created_at || 0) > new Date(+now() - 30 * 864e5));
    return s ? T.profiles.find((x) => x.id === s.profile_id) || null : null;
  }
  const famOf = (pid) => (T.profiles.find((p) => p.id === pid) || {}).family_id || null;
  const isAdminOf = (m, fid) => !!m && m.role === "admin" && m.family_id === fid;
  const isParentOf = (m, child) => !!m && m.role === "parent" && T.parent_child.some((l) => l.parent_id === m.id && l.child_id === child);
  function canSee(table, row, uid) {
    const m = me(uid);
    switch (table) {
      case "families": return !!m && row.id === m.family_id;
      case "profiles": return !!m && (row.id === m.id || isAdminOf(m, row.family_id) || isParentOf(m, row.id));
      case "parent_child": return !!m && (row.parent_id === m.id || row.child_id === m.id || isAdminOf(m, famOf(row.child_id)));
      case "exam_events": case "question_banks": return !!m && row.family_id === m.family_id;
      case "results": return !!m && (row.profile_id === m.id || isParentOf(m, row.profile_id) || isAdminOf(m, row.family_id));
      case "student_sessions": return row.auth_user_id === uid;
      default: return false;
    }
  }
  function canInsert(table, row, uid) {
    const m = me(uid);
    switch (table) {
      case "profiles": return isAdminOf(m, row.family_id);
      case "parent_child": return isAdminOf(m, famOf(row.child_id));
      case "exam_events": case "question_banks": return isAdminOf(m, row.family_id);
      case "results": return !!m && m.role === "student" && row.profile_id === m.id;
      default: return false;
    }
  }
  function canWrite(table, row, uid, op) {
    const m = me(uid);
    switch (table) {
      case "families": return op === "update" && isAdminOf(m, row.id);
      case "profiles": return op === "update" ? !!m && (row.id === m.id || isAdminOf(m, row.family_id) || isParentOf(m, row.id)) : isAdminOf(m, row.family_id) || isParentOf(m, row.id);
      case "parent_child": return op === "delete" && isAdminOf(m, famOf(row.child_id));
      case "exam_events": case "question_banks": return isAdminOf(m, row.family_id);
      case "results": return op === "delete" && isAdminOf(m, row.family_id);
      case "student_sessions": return op === "delete" && row.auth_user_id === uid;
      default: return false;
    }
  }

  /* ---------- trigger, ràng buộc, xóa dây chuyền ---------- */
  function beforeInsert(table, row, service, importing) {
    if (table === "profiles") {
      row.id = row.id || nodeCrypto.randomUUID();
      row.name = String(row.name || "").trim();
      if (!row.name || row.name.length > 40) throw new Fail("profiles_name_check");
      if (!["admin", "parent", "student"].includes(row.role)) throw new Fail("profiles_role_check");
      if (row.role === "student" && ![4, 6].includes(+row.grade)) throw new Fail('new row for relation "profiles" violates check constraint "profiles_check"');
      if (row.role !== "student") { row.grade = null; row.class_name = ""; }
      row.avatar = row.avatar || "🙂"; row.class_name = row.class_name || ""; row.created_at = now().toISOString();
      row.auth_user_id = row.auth_user_id || null; row.import_key = row.import_key || null;
      if (row.role !== "student" && !row.auth_user_id && !row.invite_code) row.invite_code = code(12);
      if (row.role === "student") row.invite_code = null;
    }
    if (table === "parent_child") {
      const p = T.profiles.find((x) => x.id === row.parent_id), c = T.profiles.find((x) => x.id === row.child_id);
      if (!p || !c || p.role !== "parent" || c.role !== "student" || p.family_id !== c.family_id) throw new Fail("Phụ huynh và học sinh phải cùng gia đình.");
    }
    if (table === "results") {
      row.id = row.id || nodeCrypto.randomUUID();
      row.family_id = famOf(row.profile_id);
      if (!importing) { row.at = now().toISOString(); row.import_key = null; }
      if (!(row.t > 0 && row.t <= 1000 && row.r >= 0 && row.r <= row.t)) throw new Fail('new row for relation "results" violates check constraint "results_check"', "23514");
      if (!importing && be.rateLimit && T.results.filter((x) => x.profile_id === row.profile_id && new Date(x.at) > new Date(+now() - 600000) && new Date(x.at) <= now()).length >= 60) {
        throw new Fail("Gửi quá nhiều kết quả trong thời gian ngắn. Đợi vài phút rồi thử lại.", "P0001");
      }
      if (!["module", "bank"].includes(row.source)) throw new Fail("results_source_check");
    }
    if (table === "exam_events") {
      if (!["dinh-ki", "ioe", "thi-khac", "moc"].includes(row.kind)) throw new Fail("exam_events_kind_check");
      row.start_date = row.start_date || null; row.end_date = row.end_date || null;
    }
  }
  function keepAdmin(p) {
    if (p.role === "admin" && T.families.some((f) => f.id === p.family_id) &&
        !T.profiles.some((x) => x.family_id === p.family_id && x.role === "admin" && x.id !== p.id)) throw new Fail("Phải còn ít nhất một tài khoản quản trị.");
  }
  function removeRow(table, row) {
    if (table === "profiles") keepAdmin(row);
    T[table] = T[table].filter((x) => x !== row);
    if (table === "families") {
      ["exam_events", "question_banks", "results"].forEach((t) => (T[t] = T[t].filter((x) => x.family_id !== row.id)));
      T.profiles.filter((p) => p.family_id === row.id).forEach((p) => removeRow("profiles", p));
    }
    if (table === "profiles") {
      T.parent_child = T.parent_child.filter((l) => l.parent_id !== row.id && l.child_id !== row.id);
      T.results = T.results.filter((r) => r.profile_id !== row.id);
      T.student_sessions = T.student_sessions.filter((s) => s.profile_id !== row.id);
      T.student_pins = T.student_pins.filter((s) => s.profile_id !== row.id);
    }
  }
  // tối đa 2000 kết quả mỗi học sinh
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
  const pick = (row, cols) => {
    if (!cols || cols === "*") return clone(row);
    const o = {}; cols.split(",").map((c) => c.trim()).forEach((c) => (o[c] = row[c] === undefined ? null : clone(row[c]))); return o;
  };
  const pkOf = (table, row, keys) => (keys || PK[table]).map((k) => row[k]).join("|");
  function checkCols(table, op, row, service) {
    if (service) return;
    const g = GRANT[table];
    if (!g || g[op] == null) throw new Fail("permission denied for table " + table);
    if (g[op] !== "*") Object.keys(row).forEach((c) => { if (!g[op].includes(c)) throw new Fail("permission denied for table " + table); });
  }
  function query(q, uid, service) {
    const table = q.table;
    if (!T[table]) throw new Fail("relation does not exist");
    if (!service && GRANT[table] === null) throw new Fail("permission denied for table " + table);
    const visible = (r) => service || canSee(table, r, uid);
    if (q.op !== "select" && be.failWrites > 0) { be.failWrites--; throw new Fail(be.failMsg || "TypeError: Failed to fetch", be.failCode || ""); }
    if (q.op === "select") {
      if (!service && GRANT[table].select && (q.cols === "*" || q.cols.split(",").some((c) => !GRANT[table].select.includes(c.trim())))) throw new Fail("permission denied for table " + table);
      let rows = T[table].filter((r) => visible(r) && match(r, q.filters));
      q.orders.slice().reverse().forEach(([c, asc]) => rows.sort((a, b) => (a[c] === b[c] ? 0 : (a[c] < b[c] ? -1 : 1) * (asc ? 1 : -1))));
      const [a, b] = q.range || [0, 999];
      rows = rows.slice(a, Math.min(b, a + 999) + 1); // như PostgREST: tối đa 1000 dòng mỗi lần
      rows = rows.map((r) => pick(r, q.cols));
      if (q.single) {
        if (rows.length > 1 || (q.single === "one" && !rows.length)) throw new Fail("JSON object requested, multiple (or no) rows returned");
        return rows[0] || null;
      }
      return rows;
    }
    if (q.op === "insert" || q.op === "upsert") {
      const keys = q.onConflict ? q.onConflict.split(",").map((s) => s.trim()) : PK[table];
      const staged = clone(T); // để hủy cả lệnh khi một dòng lỗi
      try {
        q.values.forEach((v) => {
          const row = clone(v);
          const old = T[table].find((x) => pkOf(table, x, keys) === pkOf(table, row, keys));
          if (old && q.op === "upsert") {
            checkCols(table, "update", row, service);
            if (!service && !(visible(old) && canWrite(table, old, uid, "update"))) throw new Fail("new row violates row-level security policy for table \"" + table + "\"");
            Object.assign(old, row);
            if (!service && !canWrite(table, old, uid, "update")) throw new Fail("new row violates row-level security policy for table \"" + table + "\"");
            return;
          }
          if (old && q.ignoreDuplicates) return;
          if (old) throw new Fail("duplicate key value violates unique constraint", "23505");
          checkCols(table, "insert", row, service);
          beforeInsert(table, row, service, false);
          if (!service && !canInsert(table, row, uid)) throw new Fail("new row violates row-level security policy for table \"" + table + "\"");
          if (table === "profiles" && T.profiles.filter((x) => x.family_id === row.family_id).length >= 300) throw new Fail("Gia đình đã có 300 mục, không thêm được nữa.");
          T[table].push(row);
          if (table === "results") trimResults([row.profile_id]);
        });
      } catch (e) { Object.keys(staged).forEach((k) => (T[k] = staged[k])); throw e; }
      return q.returning ? q.values.map((v) => pick(T[table].find((x) => pkOf(table, x, keys) === pkOf(table, v, keys)), q.returning)) : null;
    }
    if (q.op === "update") {
      checkCols(table, "update", q.patch, service);
      const rows = T[table].filter((r) => visible(r) && match(r, q.filters) && (service || canWrite(table, r, uid, "update")));
      const m = me(uid);
      if (table === "profiles" && m && rows.some((r) => r.role === "student" && r.id === m.id && ["name", "grade", "class_name"].some((c) => c in q.patch && q.patch[c] !== r[c]))) {
        throw new Fail("Bạn chỉ đổi được hình đại diện. Nhờ bố mẹ sửa tên hoặc lớp nhé.");
      }
      rows.forEach((r) => Object.assign(r, clone(q.patch)));
      return q.returning ? rows.map((r) => pick(r, q.returning)) : null;
    }
    if (q.op === "delete") {
      const staged = clone(T);
      try {
        T[table].filter((r) => visible(r) && match(r, q.filters) && (service || canWrite(table, r, uid, "delete"))).forEach((r) => removeRow(table, r));
      } catch (e) { Object.keys(staged).forEach((k) => (T[k] = staged[k])); throw e; }
      return null;
    }
    throw new Fail("bad op");
  }

  /* ---------- đếm lần thử (như attempt_begin / attempt_done trong schema.sql) ---------- */
  const row = (key) => {
    let a = T.login_attempts.find((x) => x.key === key);
    if (!a) { a = { key, fails: 0, rounds: 0, locked_until: null, since_ok: 0, day_fails: 0, day_start: null, hard: false, updated_at: now().toISOString() }; T.login_attempts.push(a); }
    return a;
  };
  const waitOf = (a) => (a.locked_until && new Date(a.locked_until) > now() ? Math.ceil((new Date(a.locked_until) - now()) / 1000) : 0);
  function attemptBegin(key, max, secs, maxRounds = 7, window = 86400, cap = null, dayCap = null) {
    const a = row(key);
    if (a.hard) return -1;
    if (waitOf(a)) return waitOf(a);
    if (new Date(a.updated_at) < new Date(+now() - window * 1000)) { a.fails = 0; a.rounds = 0; }
    if (!a.day_start || new Date(a.day_start) < new Date(+now() - 864e5)) { a.day_start = now().toISOString(); a.day_fails = 0; }
    if ((cap != null && a.since_ok >= cap) || (dayCap != null && a.day_fails >= dayCap)) { a.hard = true; a.updated_at = now().toISOString(); return -1; }
    a.fails++; a.since_ok++; a.day_fails++;
    if (a.fails >= max) { a.locked_until = new Date(+now() + secs * 1000 * Math.pow(2, Math.min(a.rounds, maxRounds))).toISOString(); a.rounds++; a.fails = 0; }
    a.updated_at = now().toISOString();
    return 0;
  }
  function attemptDone(key, reset) {
    const a = T.login_attempts.find((x) => x.key === key);
    if (!a || a.hard) return;
    if (reset) { a.fails = 0; a.since_ok = 0; a.locked_until = null; } else { a.fails = Math.max(a.fails - 1, 0); a.since_ok = Math.max(a.since_ok - 1, 0); }
    a.day_fails = Math.max(a.day_fails - 1, 0); a.updated_at = now().toISOString();
  }

  /* ---------- RPC (như các hàm trong schema.sql) ---------- */
  function rpc(name, a, uid, service) {
    const m = me(uid), user = uid ? users.get(uid) : null;
    const emailUser = () => { if (!user || user.is_anonymous) throw new Fail("Cần đăng nhập bằng email."); if (m) throw new Fail("Tài khoản này đã thuộc một gia đình."); };
    const serviceOnly = () => { if (!service) throw new Fail("permission denied for function " + name); };
    if (!uid && !service) throw new Fail("permission denied for function " + name);
    switch (name) {
      case "current_profile_id": return m ? m.id : null;
      case "create_family": {
        emailUser();
        if (!T.allowed_creators.some((c) => c.email === String(user.email).toLowerCase())) throw new Fail("Email này chưa được phép tạo gia đình mới. Nếu bạn là phụ huynh, hãy nhờ người quản trị gửi mã mời.");
        const fid = nodeCrypto.randomUUID();
        T.families.push({ id: fid, name: String(a.p_name || "").trim().slice(0, 80), school_year: String(a.p_school_year || "").trim() || "2026–2027", join_code: code(6), seed_banks_seen: a.p_seed_banks || [], created_at: now().toISOString() });
        const p = { family_id: fid, auth_user_id: uid, role: "admin", name: a.p_admin_name, avatar: a.p_avatar || "🧭" };
        beforeInsert("profiles", p); T.profiles.push(p);
        (a.p_events || []).forEach((e) => T.exam_events.push({ id: e.id, family_id: fid, title: e.title, kind: e.kind || "dinh-ki", grades: e.grades, start_date: e.start || null, end_date: e.end || e.start || null,
          tentative: !!e.tentative, subjects: e.subjects || [], scope: e.scope || "", note: e.note || "", modules: e.modules || [], banks: e.banks || [] }));
        return fid;
      }
      case "claim_invite": {
        emailUser();
        const k = "invite:" + uid, w = attemptBegin(k, 5, 30);
        if (w > 0) throw new Fail("Sai nhiều lần. Đợi " + w + " giây rồi thử lại.");
        const c = String(a.p_code || "").replace(/[^A-Za-z0-9]/g, "").toUpperCase();
        const p = T.profiles.find((x) => x.invite_code === c && !x.auth_user_id && x.role !== "student");
        if (!p) return null;
        p.auth_user_id = uid; p.invite_code = null; attemptDone(k, true);
        return p.id;
      }
      case "new_invite": {
        const p = T.profiles.find((x) => x.id === a.p_profile);
        if (!p || !isAdminOf(m, p.family_id)) throw new Fail("Không có quyền.");
        if (p.id === m.id) throw new Fail("Không tạo mã mời cho chính mình.");
        if (p.role === "student") throw new Fail("Chỉ tạo mã mời cho phụ huynh hoặc quản trị.");
        p.invite_code = code(12); p.auth_user_id = null; return p.invite_code;
      }
      case "new_join_code": {
        if (!m || m.role !== "admin") throw new Fail("Không có quyền.");
        const f = T.families.find((x) => x.id === m.family_id); f.join_code = code(6);
        const kids = new Set(T.profiles.filter((p) => p.family_id === f.id).map((p) => p.id));
        T.student_sessions = T.student_sessions.filter((x) => !kids.has(x.profile_id));
        T.known_devices = T.known_devices.filter((x) => !kids.has(x.profile_id));
        return f.join_code;
      }
      case "get_join_code": return m && m.role !== "student" ? T.families.find((x) => x.id === m.family_id).join_code : null;
      case "child_pin_status":
        return T.profiles.filter((p) => p.role === "student" && (isAdminOf(m, p.family_id) || isParentOf(m, p.id))).map((p) => ({
          profile_id: p.id,
          locked: T.login_attempts.some((a) => (a.key === "pin:" + p.id || a.key.startsWith("pin:" + p.id + ":")) && a.hard),
          legacy: T.student_pins.some((x) => x.profile_id === p.id && !/^pbkdf2v2\$/.test(x.pin_hash))
        }));
      case "sign_out_child": {
        const p = T.profiles.find((x) => x.id === a.p_profile);
        if (!p || !(isAdminOf(m, p.family_id) || isParentOf(m, p.id))) throw new Fail("Không có quyền.");
        const n = T.student_sessions.filter((x) => x.profile_id === p.id).length;
        T.student_sessions = T.student_sessions.filter((x) => x.profile_id !== p.id);
        T.known_devices = T.known_devices.filter((x) => x.profile_id !== p.id);
        return n;
      }
      case "add_child": {
        if (!m || m.role !== "parent") throw new Fail("Không có quyền.");
        const p = { id: a.p_id || nodeCrypto.randomUUID(), family_id: m.family_id, role: "student", name: a.p_name, avatar: a.p_avatar || "🐣", grade: a.p_grade, class_name: a.p_class || "" };
        beforeInsert("profiles", p); T.profiles.push(p); T.parent_child.push({ parent_id: m.id, child_id: p.id });
        return p.id;
      }
      case "delete_family": {
        if (!m || m.role !== "admin") throw new Fail("Không có quyền.");
        removeRow("families", T.families.find((f) => f.id === m.family_id)); return null;
      }
      case "import_local": return importLocal(a.p_data, m);
      case "attempt_begin": serviceOnly(); return attemptBegin(a.p_key, a.p_max, a.p_seconds, a.p_max_rounds ?? 7, a.p_window ?? 86400, a.p_cap ?? null, a.p_day_cap ?? null);
      case "attempt_done": serviceOnly(); attemptDone(a.p_key, a.p_reset); return null;
      case "attempt_reset_profile": serviceOnly(); T.login_attempts = T.login_attempts.filter((x) => x.key !== "pin:" + a.p_profile && !x.key.startsWith("pin:" + a.p_profile + ":")); return null;
      case "family_by_code": {
        serviceOnly();
        const f = T.families.find((x) => x.join_code === a.p_code);
        if (f && a.p_device && T.known_devices.some((d) => d.device === a.p_device && famOf(d.profile_id) === f.id)) return { id: f.id, name: f.name };
        const w = Math.max(0, ...(a.p_keys || []).map((k) => waitOf(row(k))));
        if (w) return { wait: w };
        if (f) return { id: f.id, name: f.name };
        (a.p_keys || []).forEach((k, i) => attemptBegin(k, (a.p_maxes || [])[i] || 10, a.p_seconds, 2, a.p_window));
        return { miss: true };
      }
      default: throw new Fail("function " + name + " does not exist");
    }
  }
  function importLocal(d, m) {
    if (!m || m.role !== "admin") throw new Fail("Chỉ quản trị mới chuyển được dữ liệu.");
    if (!d || !Array.isArray(d.users)) throw new Fail("Dữ liệu không đúng định dạng.");
    if (d.from === "cloud" || d.users.some((u) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(u.id))))
      throw new Fail("File này là bản sao lưu từ đám mây, dữ liệu đã có trên máy chủ.");
    const fid = m.family_id, ids = {};
    let nUsers = 0, nRes = 0; const touched = [];
    d.users.forEach((u) => {
      if (!["admin", "parent", "student"].includes(u.role) || !String(u.name || "").trim()) return;
      if (u.role === "student" && ![4, 6].includes(+u.grade)) return;
      let p = u.role === "admin" && String(u.name).trim() === m.name ? m : T.profiles.find((x) => x.family_id === fid && x.import_key === u.id);
      if (!p) {
        p = { family_id: fid, role: u.role, name: u.name, avatar: u.avatar || "🙂", grade: u.role === "student" ? +u.grade : null, class_name: u.role === "student" ? u.className || "" : "", import_key: u.id };
        beforeInsert("profiles", p); T.profiles.push(p); nUsers++;
        if (u.role === "student" && u.pinHash) T.student_pins.push({ profile_id: p.id, pin_hash: "legacy$" + (u.salt || "") + "$" + u.pinHash });
      }
      ids[u.id] = p.id;
    });
    d.users.forEach((u) => {
      if (u.role !== "student" || !ids[u.id] || !Array.isArray(u.parentIds)) return;
      u.parentIds.forEach((pp) => {
        const par = T.profiles.find((x) => x.id === ids[pp]);
        if (par && par.role === "parent" && !T.parent_child.some((l) => l.parent_id === par.id && l.child_id === ids[u.id])) T.parent_child.push({ parent_id: par.id, child_id: ids[u.id] });
      });
    });
    (d.events || []).forEach((e) => {
      if (!e.id || !String(e.title || "").trim()) return;
      const row = { id: e.id, family_id: fid, title: e.title, kind: ["dinh-ki", "ioe", "thi-khac", "moc"].includes(e.kind) ? e.kind : "dinh-ki", grades: e.grades || [], start_date: e.start || null,
        end_date: e.end || e.start || null, tentative: !!e.tentative, subjects: e.subjects || [], scope: e.scope || "", note: e.note || "", modules: e.modules || [], banks: e.banks || [] };
      const old = T.exam_events.find((x) => x.family_id === fid && x.id === e.id);
      if (old) Object.assign(old, row); else T.exam_events.push(row);
    });
    (d.banks || []).forEach((b) => {
      if (!b.id || !Array.isArray(b.questions) || ![4, 6].includes(+b.grade)) return;
      const row = { id: b.id, family_id: fid, title: b.title || "Ngân hàng", grade: +b.grade, subject: b.subject || "", minutes: +b.minutes || 0, note: b.note || "", src: b.src || "", questions: b.questions };
      const old = T.question_banks.find((x) => x.family_id === fid && x.id === b.id);
      if (old) Object.assign(old, row); else T.question_banks.push(row);
    });
    (d.results || []).forEach((r) => {
      const pid = ids[r.userId], p = T.profiles.find((x) => x.id === pid);
      if (!p || p.role !== "student" || !(+r.t > 0) || !["module", "bank"].includes(r.source)) return;
      const key = r.id || JSON.stringify(r);
      if (T.results.some((x) => (x.family_id === fid && x.import_key === key) || x.id === r.id)) return;
      const t = Math.min(+r.t, 1000);
      const row = { id: nodeCrypto.randomUUID(), profile_id: pid, source: r.source, ref_id: r.refId || "", subject: r.subject || "", label: r.label || "", mode: r.mode || "",
        r: Math.min(Math.max(+r.r || 0, 0), t), t, s: Math.max(+r.s || 0, 0), wrong_topics: r.wrongTopics || null, import_key: key,
        at: /^\d{4}-\d{2}-\d{2}T/.test(r.at || "") && !isNaN(new Date(r.at)) ? new Date(Math.min(+new Date(r.at), +now())).toISOString() : now().toISOString() };
      beforeInsert("results", row, true, true); T.results.push(row); nRes++; touched.push(pid);
    });
    trimResults(touched);
    const f = T.families.find((x) => x.id === fid);
    if (Array.isArray(d.seedBanksSeen)) f.seed_banks_seen = Array.from(new Set(f.seed_banks_seen.concat(d.seedBanksSeen)));
    if (!f.name && d.settings && d.settings.schoolName) f.name = d.settings.schoolName;
    const invites = T.profiles.filter((p) => p.family_id === fid && p.invite_code).map((p) => ({ id: p.id, name: p.name, role: p.role, code: p.invite_code }));
    return { users: nUsers, results: nRes, invites, ids };
  }

  /* ---------- đăng nhập ---------- */
  function newSession(user) {
    const t = "tok-" + nodeCrypto.randomUUID();
    tokens.set(t, user.id);
    return { access_token: t, refresh_token: "r-" + t, token_type: "bearer", user: clone(user) };
  }
  function auth(op, a, token) {
    if (op === "otp") {
      let u = [...users.values()].find((x) => x.email === a.email);
      if (!u) { u = { id: nodeCrypto.randomUUID(), email: a.email, is_anonymous: false }; users.set(u.id, u); }
      const otp = String(nodeCrypto.randomInt(100000, 1000000));
      outbox.push({ email: a.email, otp });
      return {};
    }
    if (op === "verify") {
      const mail = outbox.filter((x) => x.email === a.email).pop();
      if (!mail || mail.otp !== a.token || mail.used) return { error: { message: "Token has expired or is invalid" } };
      mail.used = true;
      return { session: newSession([...users.values()].find((x) => x.email === a.email)) };
    }
    if (op === "anon") {
      if (!be.anonEnabled) return { error: { message: "Anonymous sign-ins are disabled" } };
      const u = { id: nodeCrypto.randomUUID(), email: null, is_anonymous: true };
      users.set(u.id, u);
      return { session: newSession(u) };
    }
    if (op === "signOut") { tokens.delete(token); return {}; }
    if (op === "getUser") { const id = uidOf(a.token); return id ? { user: clone(users.get(id)) } : { error: { message: "invalid JWT" } }; }
    return { error: { message: "bad auth op" } };
  }

  /* ---------- cổng nhận tin nhắn từ client giả ---------- */
  be.handle = async function (msg) {
    const uid = msg.service ? null : uidOf(msg.token);
    be.log.push({ kind: msg.kind, op: msg.q ? msg.q.op + " " + msg.q.table : msg.name || msg.op, uid });
    try {
      if (msg.kind === "query") return { data: query(msg.q, uid, msg.service), error: null };
      if (msg.kind === "rpc") return { data: clone(rpc(msg.name, msg.args, uid, msg.service)), error: null };
      if (msg.kind === "auth") return auth(msg.op, msg.args || {}, msg.token);
      if (msg.kind === "invoke") {
        const h = be.functions[msg.name];
        if (!h) return { status: 404, body: { error: "not found" } };
        const res = await h(new Request("http://fake/functions/v1/" + msg.name, {
          method: "POST", body: JSON.stringify(msg.body),
          headers: { "content-type": "application/json", authorization: "Bearer " + (msg.token || "anon-key"), "x-forwarded-for": msg.ip || "203.0.113.7" }
        }));
        return { status: res.status, body: await res.json() };
      }
      return fail("bad message");
    } catch (e) {
      if (e instanceof Fail) return fail(e.message, e.code);
      throw e;
    }
  };
  be.getUser = async (token) => { const id = uidOf(token); const u = id && users.get(id); return u ? { id: u.id, is_anonymous: !!u.is_anonymous } : null; };
  return be;
}
module.exports = { createBackend };
