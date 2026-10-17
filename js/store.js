/* Kho dữ liệu của app.
   Bản hiện tại: LocalStore — mọi dữ liệu nằm trong localStorage của trình duyệt (một khóa duy nhất).
   Phù hợp cho một gia đình hoặc một lớp dùng chung một máy. Sao lưu/chuyển máy bằng file JSON.

   Giai đoạn 2 (xem docs/TINH-NANG.md, mục 7): thêm SupabaseStore có CÙNG các hàm dưới đây,
   dữ liệu chuyển sang các bảng trong supabase/schema.sql. Các màn hình chỉ gọi Store.*,
   nên không phải sửa giao diện khi đổi kho.

   Lưu ý bảo mật: mã PIN ở chế độ máy cục bộ chỉ để phân biệt người dùng trong nhà/lớp,
   không phải bảo mật thật — ai mở được công cụ trình duyệt trên máy đều đọc được dữ liệu. */
(function () {
  const KEY = "ontap_db_v1";
  const SESSION_KEY = "ontap_session";
  const SCHEMA_VERSION = 1;

  const clone = (x) => JSON.parse(JSON.stringify(x));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  const seedBankIds = () => (window.ONTAP_SEED_BANKS || []).map((b) => b.id);

  function emptyDB() {
    return {
      v: SCHEMA_VERSION,
      settings: { schoolName: "", schoolYear: "2026–2027", createdAt: new Date().toISOString(), lastBackupAt: null }, // lastBackupAt: lần tải file sao lưu gần nhất (ISO)
      users: [],      // {id, role, name, avatar, salt, pinHash, pinLen, grade?, className?, parentIds?: [], createdAt}
      events: clone(window.ONTAP_SEED_EVENTS || []),
      banks: [],      // ngân hàng do quản trị viên nhập (ngân hàng có sẵn nằm ở data/banks.js)
      results: [],    // {id, userId, source:"module"|"bank", refId, subject, label, mode, r, t, s, at}
      seedBanksSeen: seedBankIds() // mã các ngân hàng có sẵn đã xét (xem linkNewSeedBanks)
    };
  }

  let db = null;
  let memoryOnly = false;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      db = raw ? JSON.parse(raw) : null;
    } catch (e) { db = null; memoryOnly = true; }
    if (!db || typeof db !== "object" || !Array.isArray(db.users)) db = null;
    if (db) { fillDefaults(); dropRetiredEvents(); dropRetiredBanks(); linkNewSeedBanks(); }
    return db;
  }
  /* Giá trị mặc định cho trường thêm sau khi đã có dữ liệu trên máy.
     pinLen: độ dài PIN (4–6) để bàn phím tự vào khi gõ đủ số. Tài khoản cũ chưa có thì 0 = chưa biết; checkPin đúng sẽ ghi lại.
     settings.lastBackupAt: lần tải file sao lưu gần nhất, để nhắc sao lưu. Dữ liệu cũ chưa có thì null = chưa sao lưu lần nào. */
  function fillDefaults() {
    db.users.forEach((u) => { if (!(u.pinLen >= 4 && u.pinLen <= 6)) u.pinLen = 0; });
    if (!db.settings || typeof db.settings !== "object") db.settings = {};
    if (typeof db.settings.lastBackupAt !== "string") db.settings.lastBackupAt = null;
  }
  /* Kì thi từng có trong lịch mặc định nhưng đã bỏ khỏi bản 1.0: xóa khỏi máy đã có dữ liệu (một lần). */
  const RETIRED_EVENTS = ["violympic-l4", "trang-nguyen-l4"];
  function dropRetiredEvents() {
    if (!Array.isArray(db.events)) return;
    const n = db.events.length;
    db.events = db.events.filter((e) => !RETIRED_EVENTS.includes(e.id));
    if (db.events.length !== n) save();
  }
  /* Bộ có sẵn đã bỏ khỏi data/banks.js (hai bộ mẫu 12 câu, thay bằng các đề cuối kì I): gỡ khỏi các kì thi trên máy.
     Kết quả cũ vẫn giữ nguyên trong lịch sử. Giữ danh sách này giống RETIRED_SEED_BANKS ở store-supabase.js. */
  const RETIRED_SEED_BANKS = ["mau-toan4-ck1", "mau-toan6-ck1"];
  function dropRetiredBanks() {
    if (!Array.isArray(db.events)) return;
    let changed = false;
    db.events.forEach((e) => {
      const keep = (e.banks || []).filter((id) => !RETIRED_SEED_BANKS.includes(id));
      if (keep.length !== (e.banks || []).length) { e.banks = keep; changed = true; }
    });
    if (changed) save();
  }
  /* Lịch thi chỉ được chép vào máy một lần khi thiết lập. Khi data/banks.js có bộ mới và lịch mặc định
     gắn bộ đó vào một kì thi, gắn thêm vào kì thi đó trên máy đã có dữ liệu. Bộ đã xét thì không gắn lại,
     để giữ lựa chọn của quản trị viên khi họ bỏ gắn. */
  const SEED_BANKS_V1 = ["mau-toan4-ck1", "mau-toan6-ck1"]; // các bộ có sẵn trước khi có seedBanksSeen
  function linkNewSeedBanks() {
    if (!Array.isArray(db.events)) return;
    const seen = new Set(Array.isArray(db.seedBanksSeen) ? db.seedBanksSeen : SEED_BANKS_V1);
    const fresh = seedBankIds().filter((id) => !seen.has(id));
    if (!fresh.length) return;
    (window.ONTAP_SEED_EVENTS || []).forEach((se) => {
      const ev = db.events.find((e) => e.id === se.id), add = (se.banks || []).filter((id) => fresh.includes(id));
      if (ev && add.length) ev.banks = add.concat((ev.banks || []).filter((id) => !add.includes(id)));
    });
    db.seedBanksSeen = Array.from(seen).concat(fresh);
    save();
  }
  function save() {
    if (!db) return;
    try { localStorage.setItem(KEY, JSON.stringify(db)); memoryOnly = false; }
    catch (e) { memoryOnly = true; }
  }

  /* -------- Mã PIN -------- */
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
  const validPin = (pin) => /^\d{4,6}$/.test(String(pin || ""));

  /* -------- Người dùng -------- */
  const ROLES = { admin: "Quản trị", parent: "Phụ huynh", student: "Học sinh" };
  /* Khối lớp lấy từ data/grades.js. Học sinh mới chỉ chọn được khối đang có nội dung (active);
     sửa hồ sơ thì vẫn giữ được khối hiện tại. */
  const activeGrades = () => (window.ONTAP_GRADES || []).filter((g) => g.active).map((g) => g.grade);
  function gradeMsg() {
    const a = activeGrades();
    return "Chọn khối lớp " + (a.length > 1 ? a.slice(0, -1).join(", ") + " hoặc " + a[a.length - 1] : a.join("")) + ".";
  }

  async function createUser(data) {
    if (!data.name || !String(data.name).trim()) throw new Error("Cần nhập tên.");
    if (!ROLES[data.role]) throw new Error("Vai trò không hợp lệ.");
    if (!validPin(data.pin)) throw new Error("Mã PIN gồm 4 đến 6 chữ số.");
    if (data.role === "student" && !activeGrades().includes(+data.grade)) throw new Error(gradeMsg());
    const salt = uid();
    const u = {
      id: uid(), role: data.role, name: String(data.name).trim().slice(0, 40),
      avatar: data.avatar || (data.role === "student" ? "🐣" : data.role === "parent" ? "🌻" : "🧭"),
      salt, pinHash: await hashPin(String(data.pin), salt), pinLen: String(data.pin).length, createdAt: new Date().toISOString()
    };
    if (u.role === "student") {
      u.grade = +data.grade;
      u.className = String(data.className || "").trim().slice(0, 20);
      u.parentIds = Array.isArray(data.parentIds) ? data.parentIds.slice() : [];
    }
    db.users.push(u); save();
    return u;
  }
  async function updateUser(id, patch) {
    const u = db.users.find((x) => x.id === id);
    if (!u) throw new Error("Không tìm thấy người dùng.");
    if (patch.name != null) { if (!String(patch.name).trim()) throw new Error("Cần nhập tên."); u.name = String(patch.name).trim().slice(0, 40); }
    if (patch.avatar) u.avatar = patch.avatar;
    if (patch.pin != null && patch.pin !== "") {
      if (!validPin(patch.pin)) throw new Error("Mã PIN gồm 4 đến 6 chữ số.");
      u.salt = uid(); u.pinHash = await hashPin(String(patch.pin), u.salt); u.pinLen = String(patch.pin).length;
    }
    if (u.role === "student") {
      if (patch.grade != null) { if (+patch.grade !== u.grade && !activeGrades().includes(+patch.grade)) throw new Error(gradeMsg()); u.grade = +patch.grade; }
      if (patch.className != null) u.className = String(patch.className).trim().slice(0, 20);
      if (Array.isArray(patch.parentIds)) u.parentIds = patch.parentIds.slice();
    }
    save(); return u;
  }
  function removeUser(id) {
    const u = db.users.find((x) => x.id === id);
    if (!u) return;
    if (u.role === "admin" && db.users.filter((x) => x.role === "admin").length <= 1) throw new Error("Phải còn ít nhất một tài khoản quản trị.");
    db.users = db.users.filter((x) => x.id !== id);
    db.users.forEach((s) => { if (s.parentIds) s.parentIds = s.parentIds.filter((p) => p !== id); });
    db.results = db.results.filter((r) => r.userId !== id);
    save();
  }
  async function checkPin(id, pin) {
    const u = db.users.find((x) => x.id === id);
    if (!u) return false;
    const ok = (await hashPin(String(pin), u.salt)) === u.pinHash;
    if (ok && !u.pinLen) { u.pinLen = String(pin).length; save(); }
    return ok;
  }
  const childrenOf = (parentId) => db.users.filter((u) => u.role === "student" && (u.parentIds || []).includes(parentId));

  /* -------- Phiên đăng nhập -------- */
  function setSession(id) {
    try { if (id) sessionStorage.setItem(SESSION_KEY, id); else sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
    Store._mem = id || null;
    try { if (id) localStorage.setItem(SESSION_KEY + "_last", id); } catch (e) {}
  }
  function sessionUser() {
    let id = Store._mem;
    try { id = sessionStorage.getItem(SESSION_KEY) || id; } catch (e) {}
    return db && id ? db.users.find((u) => u.id === id) || null : null;
  }
  function lastUserId() { try { return localStorage.getItem(SESSION_KEY + "_last"); } catch (e) { return null; } }

  /* -------- Lịch thi -------- */
  const sortEvents = (a, b) => (a.start || "9999") < (b.start || "9999") ? -1 : (a.start || "9999") > (b.start || "9999") ? 1 : a.title.localeCompare(b.title, "vi");
  function events(grade) {
    const list = db.events.filter((e) => grade == null || (e.grades || []).includes(+grade));
    return list.slice().sort(sortEvents);
  }
  function upsertEvent(e) {
    if (!e.title || !String(e.title).trim()) throw new Error("Cần nhập tên kì thi.");
    if (!e.grades || !e.grades.length) throw new Error("Chọn ít nhất một khối.");
    if (e.start && e.end && e.end < e.start) throw new Error("Ngày kết thúc phải sau ngày bắt đầu.");
    const clean = {
      id: e.id || "ev-" + uid(), title: String(e.title).trim(), kind: e.kind || "dinh-ki",
      grades: e.grades.map(Number), start: e.start || null, end: e.end || e.start || null,
      tentative: !!e.tentative, subjects: e.subjects || [], scope: e.scope || "", note: e.note || "",
      modules: e.modules || [], banks: e.banks || []
    };
    const i = db.events.findIndex((x) => x.id === clean.id);
    if (i >= 0) db.events[i] = clean; else db.events.push(clean);
    save(); return clean;
  }
  function removeEvent(id) { db.events = db.events.filter((e) => e.id !== id); save(); }
  function resetEvents() { db.events = clone(window.ONTAP_SEED_EVENTS || []); db.seedBanksSeen = seedBankIds(); save(); }

  /* -------- Ngân hàng câu hỏi -------- */
  function banks(grade) {
    const seed = (window.ONTAP_SEED_BANKS || []).map((b) => Object.assign({ seed: true }, b));
    const all = seed.concat(db.banks.map((b) => Object.assign({ seed: false }, b)));
    return grade == null ? all : all.filter((b) => +b.grade === +grade);
  }
  const bankById = (id) => banks().find((b) => b.id === id) || null;
  function upsertBank(b) {
    if ((window.ONTAP_SEED_BANKS || []).some((s) => s.id === b.id)) throw new Error("Không sửa được bộ có sẵn trong app. Hãy tạo bộ mới.");
    if (!b.title || !b.questions || !b.questions.length) throw new Error("Ngân hàng cần tên và ít nhất một câu hỏi.");
    const clean = { id: b.id || "bk-" + uid(), title: String(b.title).trim(), grade: +b.grade, subject: b.subject || "", minutes: +b.minutes || 0, note: b.note || "", questions: b.questions, src: String(b.src || "").slice(0, 200000) };
    const i = db.banks.findIndex((x) => x.id === clean.id);
    if (i >= 0) db.banks[i] = clean; else db.banks.push(clean);
    save(); return clean;
  }
  function removeBank(id) {
    db.banks = db.banks.filter((b) => b.id !== id);
    db.events.forEach((e) => { e.banks = (e.banks || []).filter((x) => x !== id); });
    save();
  }

  /* -------- Kết quả -------- */
  function addResult(r) {
    const clean = {
      id: uid(), userId: r.userId, source: r.source, refId: r.refId, subject: r.subject || "",
      label: String(r.label || "").slice(0, 120), mode: r.mode || "", r: Math.max(0, +r.r || 0),
      t: Math.max(0, +r.t || 0), s: Math.max(0, +r.s || 0), at: new Date().toISOString(),
      wrongTopics: Array.isArray(r.wrongTopics) ? r.wrongTopics.slice(0, 50) : undefined
    };
    if (clean.r > clean.t) clean.r = clean.t;
    db.results.push(clean);
    if (db.results.length > 5000) db.results = db.results.slice(-5000);
    save(); return clean;
  }
  const resultsFor = (userId) => db.results.filter((r) => r.userId === userId).sort((a, b) => (a.at < b.at ? 1 : -1));

  /* -------- Sao lưu -------- */
  function exportJSON() { return JSON.stringify(Object.assign({ app: "on-thi-4-6", exportedAt: new Date().toISOString() }, db), null, 2); }
  function importJSON(text) {
    let data;
    try { data = JSON.parse(text); } catch (e) { throw new Error("File không đúng định dạng JSON."); }
    if (!data || !Array.isArray(data.users) || !Array.isArray(data.events) || !Array.isArray(data.results)) throw new Error("File sao lưu thiếu dữ liệu người dùng, lịch thi hoặc kết quả.");
    if (!data.users.some((u) => u.role === "admin")) throw new Error("File sao lưu không có tài khoản quản trị.");
    // Bản sao lưu từ đám mây không có mã PIN: khôi phục vào máy sẽ không ai đăng nhập được.
    if (data.from === "cloud" || data.users.some((u) => !u.pinHash || !u.salt)) throw new Error("File này là bản sao lưu từ đám mây (không có mã PIN), không khôi phục vào máy được. Dùng file sao lưu tải từ bản lưu trên máy.");
    delete data.app; delete data.exportedAt;
    data.banks = Array.isArray(data.banks) ? data.banks : [];
    data.settings = data.settings || {};
    data.v = SCHEMA_VERSION;
    db = data; fillDefaults(); linkNewSeedBanks(); save();
  }
  function wipe() {
    try {
      Object.keys(localStorage).filter((k) => k === KEY || k.startsWith("u_")).forEach((k) => localStorage.removeItem(k));
    } catch (e) {}
    db = null; setSession(null);
  }
  function setup(settings) { db = emptyDB(); Object.assign(db.settings, settings || {}); save(); }

  window.Store = {
    ROLES, load, save, setup, isReady: () => !!db, persistent: () => !memoryOnly, data: () => db,
    createUser, updateUser, removeUser, checkPin, validPin, childrenOf,
    users: (role) => (db ? db.users.filter((u) => !role || u.role === role) : []),
    user: (id) => (db ? db.users.find((u) => u.id === id) || null : null),
    setSession, sessionUser, lastUserId,
    events, event: (id) => db.events.find((e) => e.id === id) || null, upsertEvent, removeEvent, resetEvents,
    banks, bank: bankById, upsertBank, removeBank,
    addResult, resultsFor,
    exportJSON, importJSON, wipe,
    settings: () => db.settings, setSettings: (p) => { Object.assign(db.settings, p); save(); },
    // Quyền theo gói (docs/THIET-KE-TAI-KHOAN.md mục 5, 9). Bản lưu trên máy không có gói: luôn được.
    can: () => true,
    _mem: null
  };
})();
