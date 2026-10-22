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
      banks: [],      // ngân hàng do quản trị viên nhập (đề có sẵn nằm ở data/banks/)
      results: [],    // {id, userId, source:"module"|"bank", refId, subject, label, mode, r, t, s, at} (xem addResult)
      reports: [],    // câu bị báo sai: {id, userId, bankId, qKey, qText, reason, note, at} (xem addReport)
      seedBanksSeen: seedBankIds(), // mã các ngân hàng có sẵn đã xét (xem linkNewSeedBanks)
      seedEventsSeen: seedEventKeys() // khóa "<mã kì thi>:<khối>" của lịch mặc định đã xét (xem mergeSeedEvents)
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
    if (db) { fillDefaults(); dropRetiredEvents(); dropRetiredBanks(); syncSeedEvents(); linkNewSeedBanks(); }
    return db;
  }
  /* Giá trị mặc định cho trường thêm sau khi đã có dữ liệu trên máy.
     pinLen: độ dài PIN (4–6) để bàn phím tự vào khi gõ đủ số. Tài khoản cũ chưa có thì 0 = chưa biết; checkPin đúng sẽ ghi lại.
     settings.lastBackupAt: lần tải file sao lưu gần nhất, để nhắc sao lưu. Dữ liệu cũ chưa có thì null = chưa sao lưu lần nào. */
  function fillDefaults() {
    db.users.forEach((u) => { if (!(u.pinLen >= 4 && u.pinLen <= 6)) u.pinLen = 0; });
    if (!db.settings || typeof db.settings !== "object") db.settings = {};
    if (typeof db.settings.lastBackupAt !== "string") db.settings.lastBackupAt = null;
    if (!Array.isArray(db.reports)) db.reports = []; // câu bị báo sai (Phiên R1): dữ liệu cũ chưa có
  }
  /* Kì thi từng có trong lịch mặc định nhưng đã bỏ khỏi bản 1.0: xóa khỏi máy đã có dữ liệu (một lần). */
  const RETIRED_EVENTS = ["violympic-l4", "trang-nguyen-l4"];
  function dropRetiredEvents() {
    if (!Array.isArray(db.events)) return;
    const n = db.events.length;
    db.events = db.events.filter((e) => !RETIRED_EVENTS.includes(e.id));
    if (db.events.length !== n) save();
  }
  /* Bộ có sẵn đã bỏ khỏi danh mục data/banks/index.js (hai bộ mẫu 12 câu, thay bằng các đề cuối kì I): gỡ khỏi các kì thi trên máy.
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
  /* ---- Lịch mặc định đến máy đã có dữ liệu (Phiên Lịch các khối mới) ----
     Lịch thi được chép vào máy khi thiết lập; sau đó mỗi lần mở app (và sau khi khôi phục từ file), lịch mặc định (data/calendar-2026-2027.js)
     được gộp thêm vào lịch trên máy theo từng khối của từng kì thi: khóa "<mã kì thi>:<khối>" đã xét ghi ở seedEventsSeen (như seedBanksSeen).
     - Kì thi chưa xét khối nào (kì thi mới trong lịch mặc định): chép cả kì thi vào máy (kèm bài ôn, đề của nó).
     - Kì thi đã có trên máy mà lịch mặc định thêm khối mới (mốc năm học cho thêm khối): chỉ thêm khối đó vào grades; ngày, môn, ghi chú,
       bài ôn bố mẹ đã sửa giữ nguyên; khối bố mẹ đã bỏ (đã xét) không thêm lại.
     - Kì thi đã xét mà không còn trên máy (bố mẹ đã xóa): không chép lại, kể cả khi có khối mới.
     - Ngày của mốc năm học đổi trong lịch mặc định (SEED_DATE_FIXES): máy còn đúng ngày cũ của lịch mặc định thì đổi theo; ngày bố mẹ đã sửa giữ nguyên.
     Kì thi của khối chưa bật (data/grades.js) vẫn được chép (app không hiện), nên con thêm sau thuộc khối đó có đủ kì thi.
     Dữ liệu cũ chưa có seedEventsSeen (hoặc rỗng) coi như đã xét 16 kì thi của lịch khối 4, 6 ban đầu (SEED_EVENTS_V1).
     mergeSeedEvents là hàm thuần dùng chung với SupabaseStore (Store._mergeSeedEvents): nhận events, seen của kho, trả về
     { events, seen, added, changed }: added = kì thi chép mới, changed = kì thi được thêm khối hoặc đổi ngày (cùng đối tượng trong events);
     seen là danh sách đã xét mới (có thể dài ra dù added, changed rỗng). */
  const SEED_EVENTS_V1 = { "khai-giang": [4, 6], "gk1-l4": [4], "gk1-l6": [6], "ioe-truong": [4, 6], "ck1-l6": [6], "ck1-l4": [4], "ioe-xa": [4, 6],
    "het-hk1": [4, 6], "tet-2027": [4, 6], "ioe-tinh": [4, 6], "gk2-l4": [4], "gk2-l6": [6], "ioe-qg": [4, 6], "ck2-l6": [6], "ck2-l4": [4], "het-nam": [4, 6] };
  const SEED_DATE_FIXES = [{ id: "het-hk1", from: "2027-01-17", to: "2027-01-18" }]; // khung năm học: học kì I xong trước 18/1 (lịch cũ ghi 17/1)
  const seedEventKeys = () => (window.ONTAP_SEED_EVENTS || []).flatMap((e) => (e.grades || []).map((g) => e.id + ":" + g));
  const seenEventKeys = (seen) => (Array.isArray(seen) && seen.length ? seen : Object.entries(SEED_EVENTS_V1).flatMap(([id, gs]) => gs.map((g) => id + ":" + g)));
  function mergeSeedEvents(events, seen) {
    const was = new Set(seenEventKeys(seen)), out = events.slice(), added = [], changed = [], fresh = [];
    (window.ONTAP_SEED_EVENTS || []).forEach((se) => {
      const gs = (se.grades || []).map(Number), ev = out.find((e) => e.id === se.id);
      const add = gs.filter((g) => !was.has(se.id + ":" + g));
      add.forEach((g) => fresh.push(se.id + ":" + g));
      if (!add.length) return;
      if (ev) {
        const more = add.filter((g) => !(ev.grades || []).map(Number).includes(g));
        if (more.length) { ev.grades = (ev.grades || []).map(Number).concat(more); changed.push(ev); }
      } else if (add.length === gs.length) { const c = clone(se); out.push(c); added.push(c); } // chưa xét khối nào: kì thi mới
    });
    SEED_DATE_FIXES.forEach((f) => {
      const ev = out.find((e) => e.id === f.id);
      if (ev && ev.start === f.from && (ev.end || ev.start) === f.from) { ev.start = f.to; ev.end = f.to; if (!changed.includes(ev)) changed.push(ev); }
    });
    return { events: out, seen: Array.from(was).concat(fresh), added, changed };
  }
  function syncSeedEvents() {
    if (!Array.isArray(db.events)) return;
    const r = mergeSeedEvents(db.events, db.seedEventsSeen);
    if (!r.added.length && !r.changed.length && Array.isArray(db.seedEventsSeen) && r.seen.length === db.seedEventsSeen.length) return;
    db.events = r.events; db.seedEventsSeen = r.seen; save();
  }
  /* Khi data/banks/index.js có bộ mới và lịch mặc định gắn bộ đó vào một kì thi, gắn thêm vào kì thi đó trên máy đã có dữ liệu.
     Bộ đã xét thì không gắn lại, để giữ lựa chọn của quản trị viên khi họ bỏ gắn. Bộ chỉ được ghi là đã xét khi đã gắn được, khi không
     kì thi mặc định nào gắn nó, hoặc khi kì thi gắn nó đã bị bố mẹ xóa (đã xét mà không còn trên máy); bộ gắn vào kì thi máy chưa có
     thì để lại, gắn ở lần sau (syncSeedEvents chạy trước nên thường gắn ngay trong lần mở này).
     linkSeedBanks là hàm thuần dùng chung với SupabaseStore (Store._linkSeedBanks): trả về { changed, seen } (changed: kì thi có banks đổi,
     cùng đối tượng trong events) hoặc null khi danh mục không có bộ mới. */
  const SEED_BANKS_V1 = ["mau-toan4-ck1", "mau-toan6-ck1"]; // các bộ có sẵn trước khi có seedBanksSeen
  function linkSeedBanks(events, seen, eventsSeen) {
    const was = new Set(Array.isArray(seen) ? seen : SEED_BANKS_V1), fresh = seedBankIds().filter((id) => !was.has(id));
    if (!fresh.length) return null;
    const evSeen = new Set(seenEventKeys(eventsSeen).map((k) => k.slice(0, k.lastIndexOf(":"))));
    const changed = [], done = new Set(), waiting = new Set();
    (window.ONTAP_SEED_EVENTS || []).forEach((se) => {
      const add = (se.banks || []).filter((id) => fresh.includes(id));
      if (!add.length) return;
      const ev = events.find((e) => e.id === se.id);
      if (ev) {
        if (add.some((id) => !(ev.banks || []).includes(id))) { ev.banks = add.concat((ev.banks || []).filter((id) => !add.includes(id))); changed.push(ev); }
        add.forEach((id) => done.add(id));
      } else if (evSeen.has(se.id)) add.forEach((id) => done.add(id)); // kì thi bố mẹ đã xóa: không còn chỗ gắn
      else add.forEach((id) => waiting.add(id)); // kì thi máy chưa có: chờ kì thi đến
    });
    return { changed, seen: Array.from(was).concat(fresh.filter((id) => done.has(id) || !waiting.has(id))) };
  }
  function linkNewSeedBanks() {
    if (!Array.isArray(db.events)) return;
    const r = linkSeedBanks(db.events, db.seedBanksSeen, db.seedEventsSeen);
    if (!r || (!r.changed.length && Array.isArray(db.seedBanksSeen) && r.seen.length === db.seedBanksSeen.length)) return;
    db.seedBanksSeen = r.seen;
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
  function resetEvents() { db.events = clone(window.ONTAP_SEED_EVENTS || []); db.seedBanksSeen = seedBankIds(); db.seedEventsSeen = seedEventKeys(); save(); }

  /* -------- Ngân hàng câu hỏi -------- */
  function banks(grade) {
    const seed = (window.ONTAP_SEED_BANKS || []).map((b) => Object.assign({ seed: true }, b));
    const all = seed.concat((db ? db.banks : []).map((b) => Object.assign({ seed: false }, b)));
    return grade == null ? all : all.filter((b) => +b.grade === +grade);
  }
  const bankById = (id) => banks().find((b) => b.id === id) || null;
  /* Đề có sẵn: lúc mở app chỉ có danh mục data/banks/index.js (không có câu hỏi). Câu hỏi nằm ở data/banks/<file>, mỗi file
     một khối một môn, tải khi mở đề: file ghi vào ONTAP_SEED_QUESTIONS, tải xong thì note, questions được gắn vào mục
     của danh mục, nên banks(), bank() từ đó trả về đề đủ câu hỏi. Mỗi file tải một lần; lỗi (mất mạng mà chưa mở đề nào
     của file này) hoặc file thiếu đề thì lần sau tải lại.
     loadBank(id) → Promise: đề có câu hỏi, null nếu không có đề này; ngân hàng tự nhập có sẵn câu hỏi.
     Bản đám mây gọi hàm này (kho trên máy chưa nạp thì chỉ thấy đề có sẵn) rồi tự tìm lại đề trong kho của nó. */
  const seedFiles = {};
  function loadSeedFile(file) {
    if (!seedFiles[file]) seedFiles[file] = new Promise((ok, fail) => {
      const s = document.createElement("script");
      s.src = "data/banks/" + file;
      s.onload = () => { fillSeedFile(file); ok(); };
      s.onerror = () => { delete seedFiles[file]; s.remove(); fail(new Error("Chưa tải được đề.")); };
      document.head.append(s);
    });
    return seedFiles[file];
  }
  /* File câu hỏi đã chạy (window.ONTAP_SEED_QUESTIONS có các đề của file): gắn note, passages, questions vào mục danh mục.
     Đề ngẫu nhiên (pool, Phiên K3): kho câu = câu riêng của pool trong file (nếu có) cộng câu của các đề cố định ghi ở
     pool.from (cùng file), mỗi câu chép ra kèm src là mã đề gốc (để ưu tiên câu của đề học sinh chưa làm); passages gộp.
     Tạo xong thì pool có questions (cả kho) như đề thường; số câu rút mỗi lần là n. Thiếu đề gốc nào thì chưa tạo.
     Dùng chung với tests/nap-de.js (node): gọi với danh mục và kho câu truyền vào. */
  function fillSeedFile(file, list, qs) {
    list = list || window.ONTAP_SEED_BANKS || []; qs = qs || window.ONTAP_SEED_QUESTIONS || {};
    list.forEach((b) => { if (b.file === file && !b.pool && qs[b.id]) Object.assign(b, qs[b.id]); });
    list.forEach((b) => {
      if (b.file !== file || !b.pool) return;
      const own = qs[b.id] || {}, srcs = (b.pool.from || []).map((id) => list.find((x) => x.id === id));
      if (srcs.some((x) => !x || !x.questions)) return;
      const tag = (x, id) => (x.questions || []).map((q) => Object.assign({ src: id }, q));
      const passages = Object.assign({}, own.passages || {}, ...srcs.map((x) => x.passages || {}));
      b.note = own.note || b.note || "";
      b.questions = tag(own, b.id).concat(...srcs.map((x) => tag(x, x.id)));
      if (Object.keys(passages).length) b.passages = passages;
    });
  }
  function loadBank(id) {
    const s = (window.ONTAP_SEED_BANKS || []).find((b) => b.id === id);
    if (!s || s.questions) return Promise.resolve(bankById(id));
    return loadSeedFile(s.file).then(() => {
      if (!s.questions) delete seedFiles[s.file];
      return bankById(id);
    });
  }
  const hasPassages = (b) => !!b.passages && typeof b.passages === "object" && !Array.isArray(b.passages) && Object.keys(b.passages).length > 0;
  function upsertBank(b) {
    if ((window.ONTAP_SEED_BANKS || []).some((s) => s.id === b.id)) throw new Error("Không sửa được bộ có sẵn trong app. Hãy tạo bộ mới.");
    if (!b.title || !b.questions || !b.questions.length) throw new Error("Ngân hàng cần tên và ít nhất một câu hỏi.");
    const clean = { id: b.id || "bk-" + uid(), title: String(b.title).trim(), grade: +b.grade, subject: b.subject || "", minutes: +b.minutes || 0, note: b.note || "", questions: b.questions, src: String(b.src || "").slice(0, 200000) };
    if (hasPassages(b)) clean.passages = b.passages; // đoạn đọc dùng chung (Quiz.parse), câu tham chiếu bằng mã đoạn
    const i = db.banks.findIndex((x) => x.id === clean.id);
    if (i >= 0) db.banks[i] = clean; else db.banks.push(clean);
    save(); return clean;
  }
  function removeBank(id) {
    db.banks = db.banks.filter((b) => b.id !== id);
    db.events.forEach((e) => { e.banks = (e.banks || []).filter((x) => x !== id); });
    save();
  }

  /* -------- Kết quả --------
     r: số câu đúng trong t câu, lẻ đến 0,01 (câu đúng/sai 4 ý, nối cột chấm từng ý). mode: "exam", "practice" (đề ngân hàng),
     chế độ của bài ôn dạng trang, hoặc "self": điểm tự chấm phần tự luận, r và t tính bằng phần tư điểm, không tính vào điểm
     trung bình (js/app.js, graded). */
  function addResult(r) {
    const clean = {
      id: uid(), userId: r.userId, source: r.source, refId: r.refId, subject: r.subject || "",
      label: String(r.label || "").slice(0, 120), mode: r.mode || "", r: Math.round(Math.max(0, +r.r || 0) * 100) / 100,
      t: Math.max(0, +r.t || 0), s: Math.max(0, +r.s || 0), at: new Date().toISOString(),
      wrongTopics: Array.isArray(r.wrongTopics) ? r.wrongTopics.slice(0, 50) : undefined
    };
    if (clean.r > clean.t) clean.r = clean.t;
    db.results.push(clean);
    if (db.results.length > 5000) db.results = db.results.slice(-5000);
    save(); return clean;
  }
  const resultsFor = (userId) => db.results.filter((r) => r.userId === userId).sort((a, b) => (a.at < b.at ? 1 : -1));

  /* -------- Câu bị báo sai (Phiên R1) --------
     addReport({userId, bankId, qKey, qText, reason, note}) → Promise<báo cáo đã lưu>. bankId: mã đề chứa câu (đề ngẫu nhiên
     thì là mã đề gốc), qKey: Quiz.key(câu), qText: bản chụp nội dung câu (Quiz.text, tối đa 500 kí tự), reason: mã trong
     Quiz.REASONS, note: tối đa 200 kí tự. Bản lưu trên máy giữ tối đa 200 báo cáo (Quản trị → Dữ liệu có nút chép để gửi).
     Async như bản đám mây (gửi lên máy chủ, có thể bị từ chối). reports(): mới nhất trước. */
  const REASON_CODES = ["wrong", "unclear", "typo", "other"];
  async function addReport(r) {
    if (!r || !r.userId || !r.bankId || !r.qKey) throw new Error("Thiếu thông tin câu bị báo.");
    if (!REASON_CODES.includes(r.reason)) throw new Error("Bạn chọn một lí do nhé.");
    const clean = {
      id: uid(), userId: String(r.userId), bankId: String(r.bankId).slice(0, 80), qKey: String(r.qKey).slice(0, 40),
      qText: String(r.qText || "").slice(0, 500), reason: r.reason, note: String(r.note || "").trim().slice(0, 200), at: new Date().toISOString()
    };
    db.reports.push(clean);
    if (db.reports.length > 200) db.reports = db.reports.slice(-200);
    save(); return clean;
  }
  const reports = () => (db ? db.reports.slice().sort((a, b) => (a.at < b.at ? 1 : -1)) : []);

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
    db = data; fillDefaults(); syncSeedEvents(); linkNewSeedBanks(); save();
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
    banks, bank: bankById, loadBank, upsertBank, removeBank,
    addResult, resultsFor,
    // Hộp gửi kết quả lên máy chủ chỉ có ở bản đám mây (Phiên UX6): bản lưu trên máy không có bài nào chờ gửi.
    pendingResults: () => 0, sendPending: () => Promise.resolve(),
    addReport, reports,
    exportJSON, importJSON, wipe,
    settings: () => db.settings, setSettings: (p) => { Object.assign(db.settings, p); save(); },
    // Quyền theo gói (docs/THIET-KE-TAI-KHOAN.md mục 5, 9). Bản lưu trên máy không có gói: luôn được.
    can: () => true,
    _mem: null,
    _fillSeedFile: fillSeedFile, // chỉ cho tests/nap-de.js
    // hàm thuần gộp lịch mặc định, gắn đề có sẵn: SupabaseStore dùng chung (và kiểm thử)
    _mergeSeedEvents: mergeSeedEvents, _linkSeedBanks: linkSeedBanks, _seedEventKeys: seedEventKeys
  };
})();
