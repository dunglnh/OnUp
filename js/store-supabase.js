/* SupabaseStore: kho dữ liệu trên đám mây (Supabase), CÙNG các hàm với LocalStore trong js/store.js.
   Chỉ bật khi js/config.js có supabaseUrl và supabaseAnonKey; để trống thì file này không làm gì,
   app dùng LocalStore như cũ và không tải thư viện nào từ mạng. Thiết kế: docs/THIET-KE-TAI-KHOAN.md.

   Tài khoản: một tài khoản = một gia đình, do phụ huynh giữ, đăng nhập bằng tên đăng nhập + mật khẩu (Supabase Auth lưu
   dạng email nội bộ <tên>@users.onup.invalid, không gửi thư). Con là hồ sơ (bảng profiles) trong tài khoản, dùng chung
   phiên đăng nhập của bố mẹ. Trong app:
   - Người lớn là một người dùng ảo PARENT, vai trò "admin" (quản lý: hồ sơ con, lịch thi, ngân hàng đề, dữ liệu),
     hiện tên "Phụ huynh". Mỗi hồ sơ con là một học sinh (role "student", parentIds = [PARENT]).
   - Sau khi đăng nhập, tab chọn "Ai đang học?" (setSession: mã hồ sơ con hoặc PARENT, giữ trong sessionStorage).
     Vào PARENT phải nhập lại mật khẩu (checkPassword); vừa nhập mật khẩu trong 5 phút thì không hỏi lại (parentUnlocked).
     Đăng xuất khỏi máy này cũng hỏi mật khẩu trước (app gọi checkPassword rồi signOut; mã mở nhanh không dùng được, Phiên UX3b).
     Máy đã ghi nhớ đăng nhập có thể đặt mã mở nhanh 4–6 số (setQuickCode, checkQuickCode: băm và lưu trên máy này, UX3).
   - PIN của hồ sơ con (4 số, không bắt buộc) chỉ khóa trên giao diện: app tự băm, kiểm tra ngay trên máy.
   - Mật khẩu tạm (families.must_change_password): authState "change-password", app bắt đặt mật khẩu mới.
   - Hạn mức hồ sơ con theo gói (bảng plans): Store.can("addChild"). Máy chủ cũng chặn bằng trigger.

   Cách chạy:
   - Store.init() tải supabase-js (bản UMD, ghi rõ phiên bản + mã kiểm tra SRI), đọc phiên đăng nhập,
     rồi tải vào bộ nhớ đệm mọi dữ liệu của gia đình (RLS trong supabase/schema.sql quyết định).
   - Các hàm đọc (users, events, resultsFor…) đọc đồng bộ từ bộ nhớ đệm, như LocalStore.
   - Các hàm ghi cập nhật bộ nhớ đệm ngay, rồi đẩy lên máy chủ theo hàng đợi (giữ đúng thứ tự).
     Đẩy lên thất bại thì báo qua Store.onError (app hiện toast) và tải lại dữ liệu thật từ máy chủ.
     createUser, updateUser, checkPin là async như LocalStore; hai hàm đầu chờ máy chủ trả lời và báo lỗi trực tiếp.
   - Đề có sẵn (data/banks/) không lưu lên máy chủ; seed_banks_seen của families làm việc như seedBanksSeen.
   Phiên đăng nhập mặc định chỉ giữ trong tab (sessionStorage), như bản cục bộ; chọn "Ghi nhớ trên máy này" thì giữ lâu dài.
   Kết quả làm bài được giữ trong hộp gửi (localStorage) tới khi máy chủ nhận, nên mất mạng cũng không mất điểm. App hỏi số bài còn
   chờ gửi (pendingResults) để ghi "Đã lưu và gửi cho bố mẹ" hay "Sẽ gửi khi có mạng", và gửi lại ngay (sendPending; Phiên UX6). */
(function () {
  "use strict";
  const CFG = window.ONTAP_CONFIG || {};
  if (!CFG.supabaseUrl || !CFG.supabaseAnonKey) return;

  const Local = window.Store;
  const LIB = {
    src: "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.116.0/dist/umd/supabase.js",
    integrity: "sha384-iLddHTLokph6Omwoyid4XKxHaWa6w41BnoEj0q5oOrzmYPpHIKt1wyjReA7s//pP"
  };
  const LOGIN_DOMAIN = "users.onup.invalid";  // như LOGIN_DOMAIN trong supabase/functions/admin/index.ts
  const PARENT = "phu-huynh";                 // mã người dùng ảo của phụ huynh (không trùng mã hồ sơ, là UUID)
  const LOCAL_KEY = "ontap_db_v1";            // dữ liệu của LocalStore trên máy này (để chuyển lên)
  const WHO_KEY = "ontap_cloud_who";          // sessionStorage: hồ sơ đang dùng trong tab này
  const LAST_KEY = "ontap_cloud_last";        // localStorage: hồ sơ con chọn gần nhất trên máy này
  const MIGRATED_KEY = "ontap_cloud_migrated";
  const REMEMBER_KEY = "ontap_cloud_remember"; // localStorage: "1" = giữ đăng nhập trên máy này
  const OUTBOX_KEY = "ontap_cloud_outbox";    // localStorage: kết quả chưa gửi được, theo mã hồ sơ
  const QUICK_KEY = "ontap_cloud_quick";      // localStorage: mã mở nhanh khu phụ huynh của máy này, theo mã gia đình ("<muối>$<mã băm>" như PIN; UX3)
  const AUTH_KEY = "ontap_sb_auth";
  const UNLOCK_MS = 5 * 60e3;                 // vừa nhập mật khẩu trong 5 phút: vào khu phụ huynh không hỏi lại
  const MAX_PER_STUDENT = 2000;               // như trim_results_of trong schema.sql
  const MAX_FETCH = 20000;
  const ROLES = { admin: "Phụ huynh", parent: "Phụ huynh", student: "Học sinh" };

  const clone = (x) => JSON.parse(JSON.stringify(x));
  const uuid = () => (crypto.randomUUID ? crypto.randomUUID()
    : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)));
  const seedBankIds = () => (window.ONTAP_SEED_BANKS || []).map((b) => b.id);
  const lsGet = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const lsDel = (k) => { try { localStorage.removeItem(k); } catch (e) {} };
  const ssGet = (k) => { try { return sessionStorage.getItem(k); } catch (e) { return null; } };
  const ssSet = (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} };
  const ssDel = (k) => { try { sessionStorage.removeItem(k); } catch (e) {} };
  const todayVN = () => new Date(Date.now() + 7 * 3600e3).toISOString().slice(0, 10);

  /* Khối lớp: data/grades.js, như js/store.js. */
  const activeGrades = () => (window.ONTAP_GRADES || []).filter((g) => g.active).map((g) => g.grade);
  function gradeMsg() {
    const a = activeGrades();
    return "Chọn khối lớp " + (a.length > 1 ? a.slice(0, -1).join(", ") + " hoặc " + a[a.length - 1] : a.join("")) + ".";
  }
  /* Tên đăng nhập, mật khẩu: như usernameProblem, passwordProblem trong supabase/functions/admin/index.ts. */
  const usernameProblem = (u) => !/^[a-z0-9][a-z0-9._]{2,18}[a-z0-9]$/.test(u) || u.includes("..");
  const loginEmail = (u) => u + "@" + LOGIN_DOMAIN;

  /* ---------------- PIN của hồ sơ con ----------------
     Chỉ là khóa trên giao diện (anh em khỏi dùng nhầm hồ sơ), không phải bảo mật: máy chủ không đọc, app tự băm.
     pin_hash = "<muối>$<mã băm>", mã băm như hashPin trong js/store.js, nên PIN chuyển từ máy cũ (import_local ghi đúng
     dạng này) vẫn dùng được. Muối bắt đầu bằng "<độ dài>." (ví dụ "4.k2j…") để bàn phím biết khi nào gõ đủ; PIN chuyển
     từ máy cũ chưa có độ dài, nhập đúng một lần thì app băm lại kèm độ dài. PIN mới ở bản đám mây gồm 4 số. */
  async function hashPin(pin, salt) {
    const text = salt + ":" + pin;
    try {
      if (window.crypto && crypto.subtle) {
        const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
        return "s256:" + [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
      }
    } catch (e) { /* rơi xuống cách dự phòng */ }
    let h = 2166136261;
    for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
    return "fnv:" + (h >>> 0).toString(16);
  }
  const validPin = (pin) => /^\d{4}$/.test(String(pin == null ? "" : pin));
  const PIN_MSG = "Mã PIN gồm đúng 4 chữ số.";
  async function makePinHash(pin) {
    pin = String(pin);
    const salt = pin.length + "." + uuid().replace(/-/g, "").slice(0, 16);
    return salt + "$" + (await hashPin(pin, salt));
  }
  function parsePin(h) {
    if (!h) return null;
    h = String(h);
    const i = h.lastIndexOf("$");
    if (i < 0) return { salt: "", hash: h, len: 0 }; // sai dạng: coi như có PIN (không khớp), bố mẹ đặt lại được
    const salt = h.slice(0, i), m = /^([4-6])\./.exec(salt);
    return { salt, hash: h.slice(i + 1), len: m ? +m[1] : 0 };
  }

  /* Nơi supabase-js giữ phiên: mặc định sessionStorage (đóng tab là thoát, như bản cục bộ); chọn ghi nhớ thì localStorage. */
  const authStorage = {
    getItem(k) { return ssGet(k) || (lsGet(REMEMBER_KEY) === "1" ? lsGet(k) : null); },
    setItem(k, v) { if (lsGet(REMEMBER_KEY) === "1") { lsSet(k, v); ssDel(k); } else { ssSet(k, v); lsDel(k); } },
    removeItem(k) { ssDel(k); lsDel(k); }
  };

  let sb = null;              // client supabase-js
  let db = null;              // bộ nhớ đệm, cùng dạng với db của LocalStore
  let fam = null, famId = null, authUser = null, plan = null;
  let state = "signed-out";   // "signed-out" | "change-password" | "locked" | "no-family" | "ready"
  let who = null;             // hồ sơ đang dùng khi sessionStorage bị chặn
  let unlockedAt = 0;         // lần gần nhất nhập đúng mật khẩu trong trang này
  const pins = new Map();     // mã hồ sơ → {salt, hash, len}
  let queue = Promise.resolve();

  /* ---------------- thông báo lỗi ---------------- */
  const VI = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
  function errMsg(e, fallback) {
    const m = String((e && (e.message || e.error_description || e.msg)) || e || "");
    if (/fetch|network|Load failed|NetworkError/i.test(m)) return "Mất kết nối mạng. Kiểm tra mạng rồi thử lại.";
    if (/rate limit|security purposes|only request this|too many/i.test(m)) return "Thử quá nhiều lần. Đợi vài phút rồi thử lại.";
    if (/captcha/i.test(m)) return CFG.turnstileSiteKey ? "Chưa xác minh được. Tải lại trang rồi thử lại."
      : "Máy chủ đang bật chống máy tự động (CAPTCHA) nhưng app chưa có khóa CAPTCHA. Báo người cài đặt xem hướng dẫn.";
    if (/invalid login credentials/i.test(m)) return "Tên đăng nhập hoặc mật khẩu chưa đúng.";
    if (/banned/i.test(m)) return "Tài khoản đang bị khóa. Liên hệ người cấp tài khoản.";
    if (/should be different/i.test(m)) return "Mật khẩu mới phải khác mật khẩu đang dùng.";
    if (/password should|weak.?password|at least \d+ char/i.test(m)) return "Mật khẩu cần ít nhất 8 kí tự.";
    if (/session missing|JWT|not authenticated/i.test(m)) return "Phiên đăng nhập đã hết. Đăng nhập lại nhé.";
    if (VI.test(m) && m.length < 200) return m;
    return fallback || "Máy chủ chưa nhận được thay đổi. Tải lại trang rồi thử lại.";
  }
  const report = (msg) => { if (typeof Store.onError === "function") Store.onError(msg); };
  const changed = () => { if (typeof Store.onChange === "function") setTimeout(Store.onChange, 0); };
  let refreshTimer = null;
  function refreshSoon() {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => {
      refresh().then((ok) => { if (ok && typeof Store.onChange === "function") Store.onChange(); }, () => {});
    }, 300);
  }

  /* ---------------- gọi máy chủ ---------------- */
  async function run(q) {
    const r = await q;
    if (r && r.error) throw r.error;
    return r ? r.data : undefined;
  }
  const rpc = (name, args) => run(sb.rpc(name, args || {}));
  /* Ghi lên máy chủ theo hàng đợi; lỗi thì báo và tải lại dữ liệu thật. */
  function push(fn) {
    queue = queue.then(() => run(fn())).catch((e) => {
      console.warn("SupabaseStore:", e);
      report(errMsg(e));
      refreshSoon();
    });
    return queue;
  }
  const flush = () => queue;
  const FAMILY_COLS = "id, username, display_name, school_year, seed_banks_seen, plan, plan_until, must_change_password, status, created_at";

  async function all(table, order) {
    const N = 1000, out = [];
    for (let from = 0; ; from += N) {
      let q = sb.from(table).select("*");
      if (order) q = order(q);
      const rows = await run(q.range(from, from + N - 1));
      out.push(...(rows || []));
      if (!rows || rows.length < N || out.length >= MAX_FETCH) return out;
    }
  }

  /* ---------------- chuyển dạng dữ liệu ---------------- */
  function toUser(p) {
    const pin = parsePin(p.pin_hash);
    if (pin) pins.set(p.id, pin); else pins.delete(p.id);
    return { id: p.id, role: "student", name: p.name, avatar: p.avatar, grade: +p.grade, className: p.class_name || "", parentIds: [PARENT],
      createdAt: p.created_at, pinLen: pin ? pin.len : 0, hasPin: !!pin, locked: !!p.locked };
  }
  const toEvent = (e) => ({
    id: e.id, title: e.title, kind: e.kind, grades: (e.grades || []).map(Number), start: e.start_date || null, end: e.end_date || null,
    tentative: !!e.tentative, subjects: e.subjects || [], scope: e.scope || "", note: e.note || "", modules: e.modules || [], banks: e.banks || []
  });
  const fromEvent = (e) => ({
    family_id: famId, id: e.id, title: e.title, kind: e.kind, grades: e.grades, start_date: e.start || null, end_date: e.end || null,
    tentative: !!e.tentative, subjects: e.subjects || [], scope: e.scope || "", note: e.note || "", modules: e.modules || [], banks: e.banks || []
  });
  /* passages (đoạn đọc dùng chung, cột thêm ở Phiên K2): chỉ gửi khi có, để máy chủ chưa chạy supabase/cap-nhat-k2.sql
     vẫn lưu được ngân hàng không có đoạn đọc. */
  const hasPassages = (b) => !!b.passages && typeof b.passages === "object" && !Array.isArray(b.passages) && Object.keys(b.passages).length > 0;
  const toBank = (b) => Object.assign({ id: b.id, title: b.title, grade: +b.grade, subject: b.subject || "", minutes: +b.minutes || 0, note: b.note || "", questions: b.questions || [], src: b.src || "" }, hasPassages(b) ? { passages: b.passages } : {});
  const fromBank = (b) => Object.assign({ family_id: famId, id: b.id, title: b.title, grade: b.grade, subject: b.subject, minutes: b.minutes, note: b.note, questions: b.questions, src: b.src }, hasPassages(b) ? { passages: b.passages } : {});
  const toResult = (r) => ({
    id: r.id, userId: r.profile_id, source: r.source, refId: r.ref_id, subject: r.subject || "", label: r.label || "", mode: r.mode || "",
    r: +r.r, t: r.t, s: r.s, at: new Date(r.at).toISOString(), wrongTopics: r.wrong_topics || undefined
  });
  // Câu bị báo sai (bảng question_reports, Phiên R1). Phụ huynh báo thì profile_id trống: userId là PARENT.
  const toReport = (r) => ({
    id: r.id, userId: r.profile_id || PARENT, bankId: r.bank_id, qKey: r.q_key, qText: r.q_text || "", reason: r.reason, note: r.note || "",
    status: r.status || "new", at: new Date(r.created_at).toISOString()
  });

  /* ---------------- tải dữ liệu ---------------- */
  /* Đọc dòng families của tài khoản đang đăng nhập rồi đặt state. Chỉ khi tài khoản đang hoạt động và đã đổi mật khẩu tạm
     mới tải hồ sơ con, kết quả, lịch thi. Lỗi mạng thì ném lỗi, giữ nguyên bộ nhớ đệm cũ. */
  async function loadAll() {
    // Lọc theo người đăng nhập: chủ app đọc được mọi dòng families.
    const f = await run(sb.from("families").select(FAMILY_COLS).eq("auth_user_id", authUser.id).maybeSingle());
    fam = f || null;
    famId = f && f.status === "active" ? f.id : null;
    if (!f || f.status !== "active" || f.must_change_password) {
      db = null; plan = null;
      state = !f ? "no-family" : f.status !== "active" ? "locked" : "change-password";
      return false;
    }
    try { await rpc("touch"); } catch (e) { /* chỉ để ghi lần dùng gần nhất và tính lại hồ sơ bị khóa */ }
    // question_reports (Phiên R1): máy chủ chưa chạy supabase/cap-nhat-r1.sql thì chưa có bảng; app vẫn chạy, chỉ không báo câu sai được.
    const [profs, evs, bks, res, plans, reps] = await Promise.all([
      all("profiles", (q) => q.order("created_at").order("id")), all("exam_events"), all("question_banks"),
      all("results", (q) => q.order("at", { ascending: false }).order("id")),
      run(sb.from("plans").select("id, name, max_children")),
      all("question_reports", (q) => q.order("created_at", { ascending: false }).order("id")).catch((e) => (noTable(e) ? null : Promise.reject(e)))
    ]);
    const paid = f.plan !== "free" && !!f.plan_until && f.plan_until >= todayVN(); // như plan_active() trong schema.sql
    const p = (plans || []).find((x) => x.id === (paid ? f.plan : "free")) || (plans || []).find((x) => x.id === "free") || {};
    plan = { id: p.id || "free", name: p.name || "", maxChildren: +p.max_children || 0, until: paid ? f.plan_until : null };
    pins.clear();
    const parent = { id: PARENT, role: "admin", name: "Phụ huynh", avatar: "🌻", createdAt: f.created_at };
    db = {
      v: 1,
      settings: { schoolName: f.display_name || "", schoolYear: f.school_year || "", username: f.username, createdAt: f.created_at },
      users: [parent].concat(profs.map(toUser)),
      events: evs.map(toEvent),
      banks: bks.map(toBank),
      results: res.reverse().map(toResult),
      reports: (reps || []).map(toReport),
      seedBanksSeen: f.seed_banks_seen || []
    };
    reportsTable = reps !== null;
    state = "ready";
    // kết quả còn trong hộp gửi của máy này: hiện luôn, gửi lại sau
    const seen = new Set(db.results.map((r) => r.id)), box = outbox();
    Object.keys(box).forEach((pid) => (box[pid] || []).forEach((r) => {
      if (!seen.has(r.id) && db.users.some((u) => u.id === r.userId)) db.results.push(Object.assign({}, r));
    }));
    if (!db.events.length && !db.seedBanksSeen.length) seedEvents();
    else { dropRetiredBanks(); linkNewSeedBanks(); }
    return true;
  }
  /* Như LocalStore: bộ có sẵn đã bỏ khỏi danh mục data/banks/index.js thì gỡ khỏi kì thi, ghi lại lên máy chủ. */
  const RETIRED_SEED_BANKS = ["mau-toan4-ck1", "mau-toan6-ck1"];
  function dropRetiredBanks() {
    const changedEv = [];
    db.events.forEach((e) => {
      const keep = (e.banks || []).filter((id) => !RETIRED_SEED_BANKS.includes(id));
      if (keep.length !== (e.banks || []).length) { e.banks = keep; changedEv.push(e); }
    });
    if (changedEv.length) {
      const rows = changedEv.map(fromEvent);
      push(() => sb.from("exam_events").upsert(rows, { onConflict: "family_id,id" }));
    }
  }
  /* Như LocalStore: bộ có sẵn mới trong danh mục data/banks/index.js được gắn vào kì thi theo lịch mặc định; bộ phụ huynh đã bỏ gắn
     (đã có trong seedBanksSeen) thì không gắn lại. */
  function linkNewSeedBanks() {
    const seen = new Set(db.seedBanksSeen);
    const fresh = seedBankIds().filter((id) => !seen.has(id));
    if (!fresh.length) return;
    const changedEv = [];
    (window.ONTAP_SEED_EVENTS || []).forEach((se) => {
      const ev = db.events.find((e) => e.id === se.id), add = (se.banks || []).filter((id) => fresh.includes(id));
      if (ev && add.length) { ev.banks = add.concat((ev.banks || []).filter((id) => !add.includes(id))); changedEv.push(ev); }
    });
    db.seedBanksSeen = Array.from(seen).concat(fresh);
    const seenNow = db.seedBanksSeen.slice(), rows = changedEv.map(fromEvent);
    push(async () => {
      if (rows.length) await run(sb.from("exam_events").upsert(rows, { onConflict: "family_id,id" }));
      return sb.from("families").update({ seed_banks_seen: seenNow }).eq("id", famId);
    });
  }
  /* Tài khoản mới (Edge Function admin chỉ tạo dòng families) chưa có lịch thi nào và chưa xét bộ có sẵn nào:
     chép lịch mặc định, như bản cục bộ chép lúc thiết lập lần đầu. */
  function seedEvents() {
    db.events = clone(window.ONTAP_SEED_EVENTS || []); db.seedBanksSeen = seedBankIds();
    const rows = db.events.map(fromEvent), seen = db.seedBanksSeen.slice();
    push(async () => {
      if (rows.length) await run(sb.from("exam_events").upsert(rows, { onConflict: "family_id,id" }));
      return sb.from("families").update({ seed_banks_seen: seen }).eq("id", famId);
    });
  }

  /* Phiên không còn dùng được (hết hạn, chủ app đặt lại mật khẩu, khóa tài khoản): máy chủ từ chối thay vì báo lỗi mạng. */
  const authFail = (e) => /^(42501|PGRST30\d)$/.test(String((e && e.code) || "")) || /JWT|session/i.test(String((e && e.message) || ""));
  /* Bảng chưa có trên máy chủ (project chưa chạy file supabase/cap-nhat-<phiên>.sql): PostgREST báo PGRST205, PostgreSQL 42P01. */
  const noTable = (e) => /^(42P01|PGRST205)$/.test(String((e && e.code) || "")) || /Could not find the table|does not exist/i.test(String((e && e.message) || ""));
  let reportsTable = true; // false: máy chủ chưa có bảng question_reports
  /* Tải lại dữ liệu; phiên không dùng được thì đăng xuất trên máy này (app hiện màn hình đăng nhập). Lỗi mạng: ném lỗi. */
  async function reload() {
    try { await loadAll(); }
    catch (e) {
      if (!authFail(e)) throw e;
      forget();
      try { await sb.auth.signOut({ scope: "local" }); } catch (x) { /* phiên trên máy vẫn bị xóa */ }
      authStorage.removeItem(AUTH_KEY);
      lsDel(QUICK_KEY); // máy không còn được tin: mã mở nhanh cũng bỏ
      return;
    }
    if (state === "ready") sendOutbox();
  }
  async function afterAuth(session) {
    authUser = session ? session.user : null; db = null; fam = null; famId = null; plan = null;
    if (!authUser) { state = "signed-out"; return; }
    await reload();
  }

  function loadLib() {
    if (window.supabase && window.supabase.createClient) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = LIB.src; s.integrity = LIB.integrity; s.crossOrigin = "anonymous";
      s.onload = () => (window.supabase ? resolve() : reject(new Error("no supabase")));
      s.onerror = () => reject(new Error("Không tải được thư viện đám mây. Kiểm tra mạng rồi tải lại trang."));
      document.head.append(s);
    });
  }

  /* Chặn nhầm khóa bí mật vào js/config.js: khóa đó bỏ qua mọi RLS. */
  function secretKey(k) {
    if (/^sb_secret_/.test(k)) return true;
    try { return JSON.parse(atob(k.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))).role === "service_role"; } catch (e) { return false; }
  }

  async function init() {
    if (secretKey(CFG.supabaseAnonKey)) throw new Error("js/config.js đang chứa khóa bí mật (service_role/secret). Xóa khóa đó ngay, dùng khóa anon public, rồi đổi khóa bí mật trong Supabase.");
    await loadLib();
    sb = window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false, storageKey: AUTH_KEY, storage: authStorage }
    });
    const { data } = await sb.auth.getSession();
    try { await afterAuth(data && data.session); }
    catch (e) {
      console.warn("SupabaseStore:", e);
      throw new Error(errMsg(e, "Không tải được dữ liệu từ máy chủ. Kiểm tra mạng, hoặc xem lại bước chạy schema.sql trong docs/HUONG-DAN-SUPABASE.md."));
    }
    if (typeof window.addEventListener === "function") window.addEventListener("online", () => { if (state === "ready") sendOutbox(); });
    sb.auth.onAuthStateChange((ev) => {
      if (ev === "SIGNED_OUT" && state !== "signed-out") { forget(); changed(); }
    });
  }
  async function refresh() {
    if (state !== "ready") return false;
    await flush();
    await reload();
    return true;
  }

  /* ---------------- chống máy tự động (Cloudflare Turnstile) ----------------
     Chỉ dùng khi js/config.js có turnstileSiteKey; khi đó Supabase (Authentication → Attack Protection) phải bật
     CAPTCHA với khóa bí mật tương ứng. Thường không hiện gì; chỉ khi cần thì hiện một ô xác minh trong box. */
  const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
  let turnstileLoading = null;
  function loadTurnstile() {
    if (window.turnstile) return Promise.resolve();
    if (!turnstileLoading) turnstileLoading = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = TURNSTILE_SRC; s.async = true; // Cloudflare yêu cầu nạp thẳng từ địa chỉ gốc, không ghim phiên bản
      s.onload = () => (window.turnstile ? resolve() : reject(new Error("no turnstile")));
      s.onerror = () => { turnstileLoading = null; reject(new Error("Không tải được bước xác minh. Kiểm tra mạng rồi thử lại.")); };
      document.head.append(s);
    });
    return turnstileLoading;
  }
  /* Lấy một mã xác minh (dùng một lần). box: chỗ hiện ô xác minh nếu Cloudflare cần người bấm. */
  async function captcha(box) {
    if (!CFG.turnstileSiteKey) return undefined;
    await loadTurnstile();
    let host = typeof box === "string" ? document.querySelector(box) : box;
    if (!host) { host = document.createElement("div"); host.className = "captcha"; (document.querySelector("#view") || document.body).append(host); }
    return new Promise((resolve, reject) => {
      let id = null, done = false;
      const finish = (fn, v) => { if (done) return; done = true; clearTimeout(timer); try { if (id != null) window.turnstile.remove(id); } catch (e) {} fn(v); };
      const timer = setTimeout(() => finish(reject, new Error("Chưa xác minh xong. Thử lại nhé.")), 120000);
      try {
        id = window.turnstile.render(host, {
          sitekey: CFG.turnstileSiteKey, appearance: "interaction-only", size: "flexible", language: "vi",
          callback: (t) => finish(resolve, t),
          "error-callback": () => finish(reject, new Error("Chưa xác minh được. Tải lại trang rồi thử lại.")),
          "timeout-callback": () => finish(reject, new Error("Chưa xác minh xong. Thử lại nhé."))
        });
      } catch (e) { finish(reject, new Error("Chưa xác minh được. Tải lại trang rồi thử lại.")); }
    });
  }

  /* ---------------- đăng nhập, mật khẩu ---------------- */
  async function signIn(username, password, remember) {
    username = String(username || "").trim().toLowerCase();
    if (usernameProblem(username)) throw new Error("Tên đăng nhập gồm 4–20 kí tự: chữ thường không dấu, số, dấu chấm, gạch dưới.");
    if (!password) throw new Error("Nhập mật khẩu.");
    if (remember) lsSet(REMEMBER_KEY, "1"); else lsDel(REMEMBER_KEY);
    const captchaToken = await captcha("#loginCaptcha");
    const { data, error } = await sb.auth.signInWithPassword({ email: loginEmail(username), password: String(password), options: { captchaToken } });
    if (error) throw new Error(errMsg(error, "Chưa đăng nhập được. Thử lại sau ít phút."));
    ssDel(WHO_KEY); who = null;
    unlockedAt = Date.now();
    try { await afterAuth(data.session); }
    catch (e) { throw new Error(errMsg(e, "Không tải được dữ liệu từ máy chủ. Thử lại nhé.")); }
  }
  /* Nhập lại mật khẩu (vào khu phụ huynh, đổi mật khẩu, đăng xuất khỏi máy này): đăng nhập lại cùng tài khoản. Sai mật khẩu trả false.
     captchaBox: chỗ đặt ô CAPTCHA khi Cloudflare cần người bấm (mặc định "#pwCaptcha"; hộp đăng xuất ở trang Tài khoản đặt ô riêng
     trong hộp, Phiên UX3b). */
  async function checkPassword(password, captchaBox) {
    if (!fam || !password) return false;
    const captchaToken = await captcha(captchaBox || "#pwCaptcha");
    const { data, error } = await sb.auth.signInWithPassword({ email: loginEmail(fam.username), password: String(password), options: { captchaToken } });
    if (error) {
      if (/invalid login credentials/i.test(String(error.message || ""))) return false;
      throw new Error(errMsg(error, "Chưa kiểm tra được mật khẩu. Thử lại nhé."));
    }
    authUser = data.session.user;
    unlockedAt = Date.now();
    return true;
  }
  /* Đặt mật khẩu mới. current: mật khẩu đang dùng (bỏ trống khi đang bắt đổi mật khẩu tạm ngay sau khi đăng nhập). */
  async function changePassword(password, current) {
    password = String(password || "");
    if (password.length < 8 || !password.trim()) throw new Error("Mật khẩu mới cần ít nhất 8 kí tự.");
    if (password.length > 72) throw new Error("Mật khẩu mới dài quá (tối đa 72 kí tự).");
    if (state !== "change-password" && state !== "ready") throw new Error("Phiên đăng nhập đã hết. Đăng nhập lại nhé.");
    if (current !== undefined && !(await checkPassword(current))) throw new Error("Mật khẩu hiện tại chưa đúng.");
    const { error } = await sb.auth.updateUser({ password });
    if (error) throw new Error(errMsg(error, "Chưa đổi được mật khẩu. Thử lại nhé."));
    try { await rpc("password_changed"); } catch (e) { throw new Error(errMsg(e, "Đã đổi mật khẩu nhưng máy chủ chưa ghi nhận. Thử lại nhé.")); }
    unlockedAt = Date.now();
    if (state === "change-password") await afterAuth((await sb.auth.getSession()).data.session);
  }
  function forget() {
    state = "signed-out"; db = null; fam = null; famId = null; plan = null; authUser = null; unlockedAt = 0;
    pins.clear(); ssDel(WHO_KEY); who = null;
  }
  /* Đăng xuất trên máy này (gửi xong các thay đổi đang chờ). Kết quả chưa gửi được vẫn nằm trong hộp gửi; mã mở nhanh bị xóa. */
  async function signOut() {
    forget();
    await flush();
    try { await sb.auth.signOut({ scope: "local" }); } catch (e) { /* không có mạng: phiên trên máy vẫn bị xóa */ }
    authStorage.removeItem(AUTH_KEY);
    lsDel(QUICK_KEY);
  }
  const parentUnlocked = () => state === "ready" && Date.now() - unlockedAt < UNLOCK_MS;

  /* ---------------- mã mở nhanh khu phụ huynh (Phiên UX3) ----------------
     Trên máy đã ghi nhớ đăng nhập, bố mẹ đặt mã 4–6 số để vào khu phụ huynh mà không phải gõ mật khẩu. Mã chỉ băm và lưu trên
     máy này (localStorage QUICK_KEY, theo mã gia đình, dạng "<muối>$<mã băm>" như PIN, muối ghi độ dài), không gửi lên máy chủ;
     quên mã thì nhập mật khẩu như cũ. Đổi mật khẩu, đăng xuất vẫn cần mật khẩu; đăng xuất (kể cả khi máy chủ từ chối phiên) thì
     xóa mã. Sai nhiều lần: app tính vào PinLock như khi sai mật khẩu. */
  const quickAll = () => { try { const o = JSON.parse(lsGet(QUICK_KEY) || "{}"); return o && typeof o === "object" ? o : {}; } catch (e) { return {}; } };
  const quickHash = () => (famId && lsGet(REMEMBER_KEY) === "1" ? String(quickAll()[famId] || "") : "");
  const quickCodeLen = () => { const p = parsePin(quickHash()); return p && p.len ? p.len : 0; }; // 0: máy này chưa có mã; 4–6: độ dài mã
  const validQuick = (code) => /^\d{4,6}$/.test(String(code == null ? "" : code));
  /* Đặt mã (4–6 số) hoặc bỏ mã (null, ""). */
  async function setQuickCode(code) {
    if (state !== "ready" || !famId) throw new Error("Phiên đăng nhập đã hết. Đăng nhập lại nhé.");
    const all = quickAll();
    if (code == null || code === "") delete all[famId];
    else {
      if (lsGet(REMEMBER_KEY) !== "1") throw new Error("Chọn “Ghi nhớ trên máy này” khi đăng nhập thì mới đặt được mã mở nhanh.");
      if (!validQuick(code)) throw new Error("Mã mở nhanh gồm 4–6 chữ số.");
      all[famId] = await makePinHash(String(code));
    }
    if (Object.keys(all).length) lsSet(QUICK_KEY, JSON.stringify(all)); else lsDel(QUICK_KEY);
  }
  /* Đúng mã thì mở khóa khu phụ huynh như vừa nhập mật khẩu (setSession(PARENT) được phép). */
  async function checkQuickCode(code) {
    const p = parsePin(quickHash());
    if (!p || state !== "ready" || !validQuick(code)) return false;
    if ((await hashPin(String(code), p.salt)) !== p.hash) return false;
    unlockedAt = Date.now();
    return true;
  }

  /* ---------------- hồ sơ đang dùng trong tab ("Ai đang học?") ---------------- */
  function setSession(id) {
    if (!id) { ssDel(WHO_KEY); who = null; return; }
    if (!db || !db.users.some((u) => u.id === id)) return;
    if (id === PARENT && !parentUnlocked()) return; // khu phụ huynh: phải nhập lại mật khẩu trước (checkPassword)
    ssSet(WHO_KEY, id); who = id;
    if (id !== PARENT) lsSet(LAST_KEY, id);
  }
  function sessionUser() {
    if (state !== "ready" || !db) return null;
    const id = ssGet(WHO_KEY) || who;
    return id ? db.users.find((u) => u.id === id) || null : null;
  }

  /* ---------------- hồ sơ con ---------------- */
  function can(feature) {
    // Hôm nay gói nào cũng dùng được mọi nội dung ("bank:<mã>"…); chỉ giới hạn số hồ sơ con (bảng plans).
    if (feature === "addChild") return !!(db && plan) && db.users.filter((u) => u.role === "student").length < plan.maxChildren;
    return true;
  }
  async function createUser(data) {
    if (data.role !== "student") throw new Error("Bản đám mây chỉ thêm hồ sơ con. Tài khoản của bố mẹ do người cấp tài khoản tạo.");
    const name = String(data.name || "").trim();
    if (!name) throw new Error("Cần nhập tên.");
    if (!activeGrades().includes(+data.grade)) throw new Error(gradeMsg());
    const pin = String(data.pin == null ? "" : data.pin).trim();
    if (pin && !validPin(pin)) throw new Error(PIN_MSG);
    if (!(state === "ready" && db)) throw new Error("Phiên đăng nhập đã hết. Tải lại trang.");
    if (!can("addChild")) throw new Error(`Tài khoản đã có đủ ${plan ? plan.maxChildren : 0} hồ sơ con theo gói hiện tại.`);
    await flush();
    const row = { id: uuid(), family_id: famId, name: name.slice(0, 40), avatar: data.avatar || "🐣", grade: +data.grade,
      class_name: String(data.className || "").trim().slice(0, 20), pin_hash: pin ? await makePinHash(pin) : null };
    try { await run(sb.from("profiles").insert(row)); } catch (e) { throw new Error(errMsg(e, "Chưa tạo được hồ sơ. Thử lại nhé.")); }
    const u = toUser(Object.assign({ created_at: new Date().toISOString(), locked: false }, row));
    db.users.push(u);
    return u;
  }
  /* patch: name, avatar, grade, className, pin (4 số mới; để trống là giữ), noPin (true: bỏ PIN). */
  async function updateUser(id, patch) {
    const u = db && db.users.find((x) => x.id === id);
    if (!u) throw new Error("Không tìm thấy người dùng.");
    if (u.role !== "student") throw new Error("Thông tin tài khoản của bố mẹ do người cấp tài khoản quản lý.");
    const cols = {};
    if (patch.name != null) { if (!String(patch.name).trim()) throw new Error("Cần nhập tên."); cols.name = String(patch.name).trim().slice(0, 40); }
    if (patch.avatar) cols.avatar = patch.avatar;
    if (patch.grade != null) { if (+patch.grade !== u.grade && !activeGrades().includes(+patch.grade)) throw new Error(gradeMsg()); cols.grade = +patch.grade; }
    if (patch.className != null) cols.class_name = String(patch.className).trim().slice(0, 20);
    if (patch.pin != null && patch.pin !== "") {
      if (!validPin(String(patch.pin).trim())) throw new Error(PIN_MSG);
      cols.pin_hash = await makePinHash(String(patch.pin).trim());
    } else if (patch.noPin) cols.pin_hash = null;
    if (!Object.keys(cols).length) return u;
    await flush();
    try { await run(sb.from("profiles").update(cols).eq("id", id)); }
    catch (e) { refreshSoon(); throw new Error(errMsg(e, "Chưa lưu được. Thử lại nhé.")); }
    if (cols.name != null) u.name = cols.name;
    if (cols.avatar) u.avatar = cols.avatar;
    if (cols.grade != null) u.grade = cols.grade;
    if (cols.class_name != null) u.className = cols.class_name;
    if ("pin_hash" in cols) Object.assign(u, (({ pinLen, hasPin }) => ({ pinLen, hasPin }))(toUser({ id, pin_hash: cols.pin_hash })));
    return u;
  }
  function removeUser(id) {
    const u = db && db.users.find((x) => x.id === id);
    if (!u) return;
    if (u.role !== "student") throw new Error("Tài khoản của bố mẹ chỉ người cấp tài khoản xóa được.");
    db.users = db.users.filter((x) => x.id !== id);
    db.results = db.results.filter((r) => r.userId !== id);
    pins.delete(id);
    const box = outbox(); delete box[id]; saveOutbox(box);
    if (ssGet(WHO_KEY) === id || who === id) setSession(null);
    push(() => sb.from("profiles").delete().eq("id", id));
  }
  /* PIN của hồ sơ con, kiểm tra trên máy (xem ghi chú ở đầu phần PIN). Hồ sơ không có PIN: luôn đúng.
     Phụ huynh không có PIN (dùng mật khẩu: checkPassword). */
  async function checkPin(id, pin) {
    const u = db && db.users.find((x) => x.id === id);
    if (!u || u.role !== "student") return false;
    const p = pins.get(id);
    if (!p) return true;
    pin = String(pin == null ? "" : pin);
    const ok = (await hashPin(pin, p.salt)) === p.hash;
    if (ok && !p.len && /^\d{4,6}$/.test(pin)) {
      // PIN chuyển từ máy cũ: băm lại kèm độ dài để lần sau bàn phím tự vào khi gõ đủ số.
      const h = await makePinHash(pin);
      Object.assign(p, parsePin(h)); u.pinLen = p.len;
      push(() => sb.from("profiles").update({ pin_hash: h }).eq("id", id));
    }
    return ok;
  }
  const childrenOf = (parentId) => (db ? db.users.filter((u) => u.role === "student" && (u.parentIds || []).includes(parentId)) : []);

  /* ---------------- lịch thi (giống LocalStore, thêm bước đẩy lên máy chủ) ---------------- */
  const sortEvents = (a, b) => (a.start || "9999") < (b.start || "9999") ? -1 : (a.start || "9999") > (b.start || "9999") ? 1 : a.title.localeCompare(b.title, "vi");
  function events(grade) {
    return db.events.filter((e) => grade == null || (e.grades || []).includes(+grade)).slice().sort(sortEvents);
  }
  function upsertEvent(e) {
    if (!e.title || !String(e.title).trim()) throw new Error("Cần nhập tên kì thi.");
    if (!e.grades || !e.grades.length) throw new Error("Chọn ít nhất một khối.");
    if (e.start && e.end && e.end < e.start) throw new Error("Ngày kết thúc phải sau ngày bắt đầu.");
    const clean = {
      id: e.id || "ev-" + uuid().slice(0, 13), title: String(e.title).trim(), kind: e.kind || "dinh-ki",
      grades: e.grades.map(Number), start: e.start || null, end: e.end || e.start || null,
      tentative: !!e.tentative, subjects: e.subjects || [], scope: e.scope || "", note: e.note || "",
      modules: e.modules || [], banks: e.banks || []
    };
    const i = db.events.findIndex((x) => x.id === clean.id);
    if (i >= 0) db.events[i] = clean; else db.events.push(clean);
    const row = fromEvent(clean);
    push(() => sb.from("exam_events").upsert(row, { onConflict: "family_id,id" }));
    return clean;
  }
  function removeEvent(id) {
    db.events = db.events.filter((e) => e.id !== id);
    push(() => sb.from("exam_events").delete().eq("family_id", famId).eq("id", id));
  }
  function resetEvents() {
    db.events = clone(window.ONTAP_SEED_EVENTS || []); db.seedBanksSeen = seedBankIds();
    const rows = db.events.map(fromEvent), seen = db.seedBanksSeen.slice();
    push(async () => {
      await run(sb.from("exam_events").delete().eq("family_id", famId));
      if (rows.length) await run(sb.from("exam_events").insert(rows));
      return sb.from("families").update({ seed_banks_seen: seen }).eq("id", famId);
    });
  }

  /* ---------------- ngân hàng câu hỏi ---------------- */
  function banks(grade) {
    const seed = (window.ONTAP_SEED_BANKS || []).map((b) => Object.assign({ seed: true }, b));
    const list = seed.concat(db.banks.map((b) => Object.assign({ seed: false }, b)));
    return grade == null ? list : list.filter((b) => +b.grade === +grade);
  }
  const bankById = (id) => banks().find((b) => b.id === id) || null;
  // Câu hỏi của đề có sẵn tải khi mở đề, cùng cách với LocalStore (loadBank trong js/store.js).
  const loadBank = (id) => Local.loadBank(id).then(() => bankById(id));
  function upsertBank(b) {
    if ((window.ONTAP_SEED_BANKS || []).some((s) => s.id === b.id)) throw new Error("Không sửa được bộ có sẵn trong app. Hãy tạo bộ mới.");
    if (!b.title || !b.questions || !b.questions.length) throw new Error("Ngân hàng cần tên và ít nhất một câu hỏi.");
    const clean = { id: b.id || "bk-" + uuid().slice(0, 13), title: String(b.title).trim(), grade: +b.grade, subject: b.subject || "", minutes: +b.minutes || 0, note: b.note || "", questions: b.questions, src: String(b.src || "").slice(0, 200000) };
    if (hasPassages(b)) clean.passages = b.passages;
    const i = db.banks.findIndex((x) => x.id === clean.id);
    if (i >= 0) db.banks[i] = clean; else db.banks.push(clean);
    const row = fromBank(clean);
    push(() => sb.from("question_banks").upsert(row, { onConflict: "family_id,id" }));
    return clean;
  }
  function removeBank(id) {
    db.banks = db.banks.filter((b) => b.id !== id);
    const changedEv = db.events.filter((e) => (e.banks || []).includes(id));
    changedEv.forEach((e) => { e.banks = e.banks.filter((x) => x !== id); });
    const rows = changedEv.map(fromEvent);
    push(async () => {
      if (rows.length) await run(sb.from("exam_events").upsert(rows, { onConflict: "family_id,id" }));
      return sb.from("question_banks").delete().eq("family_id", famId).eq("id", id);
    });
  }

  /* ---------------- kết quả ---------------- */
  function addResult(r) {
    const clean = {
      id: uuid(), userId: r.userId, source: r.source, refId: r.refId, subject: r.subject || "",
      label: String(r.label || "").slice(0, 120), mode: r.mode || "", r: Math.round(Math.max(0, +r.r || 0) * 100) / 100, // lẻ đến 0,01, như LocalStore
      t: Math.max(0, +r.t || 0), s: Math.max(0, +r.s || 0), at: new Date().toISOString(),
      wrongTopics: Array.isArray(r.wrongTopics) ? r.wrongTopics.slice(0, 50) : undefined
    };
    if (clean.r > clean.t) clean.r = clean.t;
    if (!db) {
      // Phiên hết giữa lúc con đang làm bài: giữ trong hộp gửi, bố mẹ đăng nhập lại thì tự gửi (nếu đúng hồ sơ của tài khoản).
      if (clean.t > 0) { queueResult(clean); report("Phiên đăng nhập đã hết. Bố mẹ đăng nhập lại để gửi kết quả nhé."); }
      return clean;
    }
    db.results.push(clean);
    const mine = db.results.filter((x) => x.userId === clean.userId);
    if (mine.length > MAX_PER_STUDENT) { const drop = new Set(mine.slice(0, mine.length - MAX_PER_STUDENT)); db.results = db.results.filter((x) => !drop.has(x)); }
    if (!(clean.t > 0)) return clean;
    // Chỉ hồ sơ con đang dùng trong tab mới ghi kết quả của chính mình.
    const me = sessionUser();
    if (!me || me.role !== "student" || clean.userId !== me.id) { report("Chỉ lưu được kết quả của hồ sơ đang học."); db.results = db.results.filter((x) => x !== clean); return clean; }
    queueResult(clean);
    sendOutbox();
    return clean;
  }
  function queueResult(clean) {
    const box = outbox();
    box[clean.userId] = (box[clean.userId] || []).concat(clean).slice(-500);
    saveOutbox(box);
  }
  /* Hộp gửi kết quả: chỉ xóa một kết quả khỏi hộp khi máy chủ đã nhận (gửi lại không bị trùng nhờ mã kết quả). */
  function outbox() { try { return JSON.parse(lsGet(OUTBOX_KEY) || "{}") || {}; } catch (e) { return {}; } }
  function saveOutbox(box) { Object.keys(box).forEach((k) => { if (!box[k].length) delete box[k]; }); if (Object.keys(box).length) lsSet(OUTBOX_KEY, JSON.stringify(box)); else lsDel(OUTBOX_KEY); }
  let warned = false;
  // Mỗi lần gọi nối thêm một lượt gửi vào hàng đợi; lượt nào cũng đọc hộp gửi lúc chạy nên không gửi trùng.
  // Gửi kết quả của mọi hồ sơ con thuộc tài khoản này (máy dùng chung cho anh em); hồ sơ của tài khoản khác thì để lại.
  // Store.onChange vẽ lại cả trang (cuộn lên đầu, đóng #evDetail), mà lượt gửi còn chạy lúc mở app và mỗi khi có mạng lại:
  // chỉ báo khi lượt gửi làm đổi số bài chưa gửi (dòng "N bài chưa gửi" ở trang chính của con, khu phụ huynh; Phiên UX6).
  // Đếm cả tài khoản trong hộp gửi dùng chung của máy, nên tab khu phụ huynh gửi được bài con làm ở tab khác cũng vẽ lại.
  function sendOutbox() {
    queue = queue.then(async () => {
      if (state !== "ready" || !db) return;
      const before = pendingResults();
      try { await sendBox(); }
      finally { if (state === "ready" && db && pendingResults() !== before) changed(); }
    }).catch((e) => { console.warn("SupabaseStore:", e); });
    return queue;
  }
  async function sendBox() {
    for (const pid of Object.keys(outbox())) {
      if (!db.users.some((u) => u.id === pid && u.role === "student")) continue;
      for (const r of (outbox()[pid] || []).slice()) {
        if (state !== "ready") return;
        const row = { id: r.id, profile_id: pid, source: r.source, ref_id: String(r.refId || "").slice(0, 80), subject: String(r.subject || "").slice(0, 60),
          label: r.label, mode: String(r.mode || "").slice(0, 20), r: r.r, t: Math.min(r.t, 1000), s: r.s,
          wrong_topics: r.wrongTopics ? r.wrongTopics.slice(0, 50).map((x) => String(x).slice(0, 100)) : null };
        let res = await sb.from("results").upsert(row, { onConflict: "id", ignoreDuplicates: true });
        // Máy chủ chưa chạy supabase/cap-nhat-k2.sql (cột r còn là số nguyên): gửi lại số câu đúng làm tròn.
        if (res && res.error && String(res.error.code) === "22P02" && row.r % 1) { row.r = Math.round(row.r); res = await sb.from("results").upsert(row, { onConflict: "id", ignoreDuplicates: true }); }
        const err = res && res.error, msg = err ? String(err.message || "") : "", code = err ? String(err.code || "") : "";
        // Chỉ bỏ kết quả khi máy chủ không bao giờ nhận (hồ sơ đã xóa, dữ liệu sai dạng, hồ sơ bị khóa theo gói). Lỗi khác: giữ lại.
        const never = ["23503", "23514", "22P02", "22001"].includes(code) || (code === "P0001" && /bị khóa/.test(msg));
        if (err && !never) {
          if (code === "42501" || /^PGRST3/.test(code) || /JWT/i.test(msg)) {
            // Phiên hết hạn hoặc tài khoản vừa bị khóa: giữ kết quả, mời đăng nhập lại (đăng nhập xong sẽ tự gửi).
            forget();
            report("Phiên đăng nhập đã hết. Bố mẹ đăng nhập lại để gửi kết quả nhé.");
            changed();
            return;
          }
          // Mất mạng, máy chủ lỗi: giữ trong hộp, thử lại sau. App tự ghi bài nào chưa gửi (màn kết quả, dòng "N bài chưa gửi", UX6),
          // nên chỉ báo riêng khi máy chủ từ chối vì gửi quá nhiều (một lần, đến khi gửi được).
          if (/Gửi quá nhiều/.test(msg)) { if (!warned) report(msg); warned = true; }
          return;
        }
        if (err) report(errMsg(err, "Máy chủ không nhận một kết quả làm bài."));
        const box = outbox();
        box[pid] = (box[pid] || []).filter((x) => x.id !== r.id);
        saveOutbox(box);
        warned = false;
      }
    }
  }
  /* Bài chưa gửi (Phiên UX6, X10): số kết quả còn trong hộp gửi của các hồ sơ con thuộc tài khoản đang đăng nhập; có userId thì
     chỉ của hồ sơ đó. Hộp gửi của tài khoản khác trên cùng máy không tính (sendOutbox cũng để lại). */
  function pendingResults(userId) {
    if (state !== "ready" || !db) return 0;
    const box = outbox();
    return Object.keys(box).filter((pid) => (!userId || pid === userId) && db.users.some((u) => u.id === pid && u.role === "student"))
      .reduce((n, pid) => n + (box[pid] || []).length, 0);
  }
  // Gửi lại ngay (nút "Gửi lại", màn kết quả chờ lượt gửi): một lượt sendOutbox; Promise xong khi lượt gửi xong, không bao giờ lỗi.
  const sendPending = () => sendOutbox().then(() => {});
  const resultsFor = (userId) => db.results.filter((r) => r.userId === userId).sort((a, b) => (a.at < b.at ? 1 : -1));

  /* ---------------- câu bị báo sai (Phiên R1) ----------------
     Như addReport của LocalStore (xem chú thích ở js/store.js): gửi thẳng lên bảng question_reports và chờ máy chủ trả lời
     (trigger giới hạn 30 báo cáo mỗi ngày mỗi gia đình; máy chủ tự điền family_id, thời điểm). Phụ huynh báo thì profile_id
     trống. Máy chủ chưa có bảng (chưa chạy supabase/cap-nhat-r1.sql) thì báo lỗi dễ hiểu. reports(): của gia đình này, mới nhất trước. */
  const REASON_CODES = ["wrong", "unclear", "typo", "other"];
  const NO_REPORTS_MSG = "Máy chủ chưa cập nhật để nhận báo cáo. Bạn nhắn cho người cấp tài khoản giúp nhé.";
  async function addReport(r) {
    if (!r || !r.userId || !r.bankId || !r.qKey) throw new Error("Thiếu thông tin câu bị báo.");
    if (!REASON_CODES.includes(r.reason)) throw new Error("Bạn chọn một lí do nhé.");
    if (!(state === "ready" && db)) throw new Error("Phiên đăng nhập đã hết. Đăng nhập lại nhé.");
    if (!reportsTable) throw new Error(NO_REPORTS_MSG);
    const u = db.users.find((x) => x.id === r.userId);
    if (!u) throw new Error("Không tìm thấy người dùng.");
    const row = { id: uuid(), profile_id: u.role === "student" ? u.id : null, bank_id: String(r.bankId).slice(0, 80), q_key: String(r.qKey).slice(0, 40),
      q_text: String(r.qText || "").slice(0, 500), reason: r.reason, note: String(r.note || "").trim().slice(0, 200) };
    try { await run(sb.from("question_reports").insert(row)); }
    catch (e) {
      if (noTable(e)) { reportsTable = false; throw new Error(NO_REPORTS_MSG); }
      throw new Error(errMsg(e, "Chưa gửi được báo cáo. Thử lại nhé."));
    }
    const clean = toReport(Object.assign({ status: "new", created_at: new Date().toISOString() }, row));
    db.reports.unshift(clean);
    return clean;
  }
  const reports = () => (db ? db.reports.slice().sort((a, b) => (a.at < b.at ? 1 : -1)) : []);

  /* ---------------- sao lưu, chuyển dữ liệu ---------------- */
  function exportJSON() {
    const users = db.users.map((u) => { const x = clone(u); delete x.hasPin; delete x.locked; return x; });
    return JSON.stringify({ app: "on-thi-4-6", exportedAt: new Date().toISOString(), from: "cloud", v: 1,
      settings: { schoolName: db.settings.schoolName, schoolYear: db.settings.schoolYear }, users, events: db.events, banks: db.banks,
      results: db.results, seedBanksSeen: db.seedBanksSeen }, null, 2);
  }
  function localData() {
    try { const d = JSON.parse(lsGet(LOCAL_KEY) || "null"); return d && Array.isArray(d.users) ? d : null; } catch (e) { return null; }
  }
  /* Chuyển dữ liệu dạng LocalStore (trên máy này hoặc từ file sao lưu) lên tài khoản đang đăng nhập (RPC import_local):
     học sinh thành hồ sơ con (giữ PIN cũ), kèm kết quả, lịch thi, ngân hàng tự nhập. Chạy lại không bị trùng.
     Trả về {profiles, results, ids}. */
  async function migrate(data) {
    if (!data || !Array.isArray(data.users) || !Array.isArray(data.events) || !Array.isArray(data.results)) throw new Error("Dữ liệu thiếu người dùng, lịch thi hoặc kết quả.");
    if (data.from === "cloud") throw new Error("File này là bản sao lưu từ đám mây, dữ liệu đã có trên máy chủ.");
    const payload = {
      users: data.users.filter((u) => u.role === "student").map((u) => ({ id: u.id, role: u.role, name: u.name, avatar: u.avatar, grade: u.grade, className: u.className, salt: u.salt, pinHash: u.pinHash })),
      events: data.events, banks: Array.isArray(data.banks) ? data.banks : [], results: data.results.slice(-5000),
      seedBanksSeen: Array.isArray(data.seedBanksSeen) ? data.seedBanksSeen : undefined, settings: data.settings || {}
    };
    await flush();
    let res;
    try { res = await rpc("import_local", { p_data: payload }); } catch (e) { throw new Error(errMsg(e, "Chưa chuyển được dữ liệu. Thử lại nhé.")); }
    lsSet(MIGRATED_KEY, new Date().toISOString());
    copyModuleProgress((res && res.ids) || {});
    await reload();
    return res || {};
  }
  /* Tiến độ trong bài ôn lưu theo mã học sinh ("u_<mã>__…"); hồ sơ chuyển lên có mã mới nên chép sang. */
  function copyModuleProgress(ids) {
    try {
      const keys = []; for (let i = 0; i < localStorage.length; i++) keys.push(localStorage.key(i));
      Object.keys(ids).forEach((oldId) => {
        const nu = ids[oldId], pre = "u_" + oldId + "__";
        if (!nu || nu === oldId) return;
        keys.filter((k) => k && k.startsWith(pre)).forEach((k) => {
          const to = "u_" + nu + "__" + k.slice(pre.length);
          if (localStorage.getItem(to) == null) localStorage.setItem(to, localStorage.getItem(k));
        });
      });
    } catch (e) {}
  }
  function importJSON(text) {
    let data;
    try { data = JSON.parse(text); } catch (e) { return Promise.reject(new Error("File không đúng định dạng JSON.")); }
    return migrate(data);
  }
  /* Bản đám mây không xóa được cả tài khoản từ app (chỉ chủ app xóa ở trang admin): "xóa" là đăng xuất khỏi máy này. */
  const wipe = () => signOut();
  function setSettings(p) {
    Object.assign(db.settings, p);
    const cols = {};
    if (p.schoolName != null) cols.display_name = String(p.schoolName).slice(0, 80);
    if (p.schoolYear != null) cols.school_year = String(p.schoolYear).slice(0, 20);
    if (Object.keys(cols).length) push(() => sb.from("families").update(cols).eq("id", famId));
  }

  window.LocalStore = Local;
  window.Store = {
    ROLES, cloud: true,
    load: () => db, save: () => {}, setup: () => { throw new Error("Bản đám mây: tài khoản do chủ app tạo ở trang admin."); },
    isReady: () => state === "ready", persistent: () => true, data: () => db,
    createUser, updateUser, removeUser, checkPin, validPin, childrenOf,
    users: (role) => (db ? db.users.filter((u) => !role || u.role === role) : []),
    user: (id) => (db ? db.users.find((u) => u.id === id) || null : null),
    setSession, sessionUser, lastUserId: () => lsGet(LAST_KEY),
    events, event: (id) => (db ? db.events.find((e) => e.id === id) || null : null), upsertEvent, removeEvent, resetEvents,
    banks, bank: bankById, loadBank, upsertBank, removeBank,
    addResult, resultsFor, pendingResults, sendPending,
    addReport, reports,
    exportJSON, importJSON, wipe,
    settings: () => (db ? db.settings : {}), setSettings,
    can,
    _mem: null,
    _fillSeedFile: Local._fillSeedFile, // chỉ cho tests/nap-de.js (như LocalStore)
    // chỉ có ở bản đám mây
    init, refresh, flush, authState: () => state,
    signIn, signOut, checkPassword, changePassword, parentUnlocked,
    quickCodeLen, setQuickCode, checkQuickCode,
    rememberLogin: () => lsGet(REMEMBER_KEY) === "1",
    username: () => (fam ? fam.username : ""),
    plan: () => (plan ? Object.assign({}, plan) : null),
    localData, migrate, migratedAt: () => lsGet(MIGRATED_KEY),
    onError: null, onChange: null
  };
})();
