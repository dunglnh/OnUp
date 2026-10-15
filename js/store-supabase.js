/* SupabaseStore: kho dữ liệu trên đám mây (Supabase), CÙNG các hàm với LocalStore trong js/store.js.
   Chỉ bật khi js/config.js có supabaseUrl và supabaseAnonKey; để trống thì file này không làm gì,
   app dùng LocalStore như cũ và không tải thư viện nào từ mạng.

   Cách chạy:
   - Store.init() tải supabase-js (bản UMD, ghi rõ phiên bản + mã kiểm tra SRI), đọc phiên đăng nhập,
     rồi tải vào bộ nhớ đệm mọi dữ liệu người đăng nhập được xem (RLS trong supabase/schema.sql quyết định).
   - Các hàm đọc (users, events, resultsFor…) đọc đồng bộ từ bộ nhớ đệm, như LocalStore.
   - Các hàm ghi cập nhật bộ nhớ đệm ngay, rồi đẩy lên máy chủ theo hàng đợi (giữ đúng thứ tự).
     Đẩy lên thất bại thì báo qua Store.onError (app hiện toast) và tải lại dữ liệu thật từ máy chủ.
     createUser, updateUser, checkPin là async như LocalStore, nên chờ máy chủ trả lời và báo lỗi trực tiếp.
   - Ngân hàng có sẵn (data/banks.js) không lưu lên máy chủ. Lịch thi mặc định được chép vào family khi tạo.

   Đăng nhập: quản trị/phụ huynh bằng email (magic link hoặc mã 6 số trong email); học sinh bằng
   mã gia đình + PIN qua Edge Function "student-login" (PIN băm phía máy chủ). Xem docs/HUONG-DAN-SUPABASE.md. */
(function () {
  "use strict";
  const CFG = window.ONTAP_CONFIG || {};
  if (!CFG.supabaseUrl || !CFG.supabaseAnonKey) return;

  const Local = window.Store;
  const LIB = {
    src: "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.116.0/dist/umd/supabase.js",
    integrity: "sha384-iLddHTLokph6Omwoyid4XKxHaWa6w41BnoEj0q5oOrzmYPpHIKt1wyjReA7s//pP"
  };
  const FN = CFG.studentFunction || "student-login";
  const LOCAL_KEY = "ontap_db_v1";          // dữ liệu của LocalStore trên máy này (để chuyển lên)
  const KID_FLAG = "ontap_cloud_kid";       // sessionStorage: học sinh đã nhập PIN trong phiên trình duyệt này
  const LAST_KEY = "ontap_cloud_last";      // localStorage: mã gia đình và học sinh gần nhất trên máy này
  const MIGRATED_KEY = "ontap_cloud_migrated";
  const MAX_RESULTS = 5000;
  const ROLES = Local.ROLES;

  const clone = (x) => JSON.parse(JSON.stringify(x));
  const uuid = () => (crypto.randomUUID ? crypto.randomUUID()
    : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)));
  const seedBankIds = () => (window.ONTAP_SEED_BANKS || []).map((b) => b.id);
  const validPin = (pin) => /^\d{4,6}$/.test(String(pin || ""));
  const lsGet = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };

  let sb = null;              // client supabase-js
  let db = null;              // bộ nhớ đệm, cùng dạng với db của LocalStore
  let famId = null, meId = null, authUser = null;
  let state = "signed-out";   // "signed-out" | "no-profile" (email chưa thuộc gia đình nào) | "ready"
  let authErr = "";
  let queue = Promise.resolve();

  /* ---------------- thông báo lỗi ---------------- */
  const VI = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
  function errMsg(e, fallback) {
    const m = String((e && (e.message || e.error_description || e.msg)) || e || "");
    if (/fetch|network|Load failed|NetworkError/i.test(m)) return "Mất kết nối mạng. Kiểm tra mạng rồi thử lại.";
    if (/rate limit|security purposes|only request this/i.test(m)) return "Gửi quá nhiều lần. Đợi một phút rồi thử lại.";
    if (/anonymous sign-ins are disabled/i.test(m)) return "Máy chủ chưa bật đăng nhập cho học sinh (Anonymous sign-ins). Báo bố mẹ xem hướng dẫn cài đặt.";
    if (/expired|invalid.*(otp|token)|otp.*invalid/i.test(m)) return "Mã trong email đã hết hạn hoặc chưa đúng. Gửi lại mã mới nhé.";
    if (VI.test(m) && m.length < 200) return m;
    return fallback || "Máy chủ chưa nhận được thay đổi. Tải lại trang rồi thử lại.";
  }
  const report = (msg) => { if (typeof Store.onError === "function") Store.onError(msg); };
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

  async function all(table, order) {
    const N = 1000, out = [];
    for (let from = 0; ; from += N) {
      let q = sb.from(table).select("*");
      if (order) q = order(q);
      const rows = await run(q.range(from, from + N - 1));
      out.push(...(rows || []));
      if (!rows || rows.length < N || (table === "results" && out.length >= MAX_RESULTS)) return out;
    }
  }

  const FN_ERR = {
    code: "Mã gia đình chưa đúng. Hỏi bố mẹ mã gia đình nhé.", wrong: "Mã PIN chưa đúng. Thử lại nhé.",
    auth: "Phiên đăng nhập đã hết. Tải lại trang rồi thử lại.", forbidden: "Không có quyền làm việc này.",
    pin: "Mã PIN gồm 4 đến 6 chữ số.", server: "Máy chủ đang lỗi. Thử lại sau ít phút.", bad_request: "Yêu cầu không hợp lệ."
  };
  const fnError = (d) => (d.error === "locked" ? `Sai nhiều lần. Đợi ${d.wait} giây rồi thử lại.` : FN_ERR[d.error] || "Có lỗi, thử lại nhé.");
  async function invoke(body) {
    const { data, error } = await sb.functions.invoke(FN, { body });
    if (error) {
      let d = null;
      try { if (error.context && typeof error.context.json === "function") d = await error.context.json(); } catch (e) {}
      if (d && d.error) return d;
      throw new Error(errMsg(error, "Không gọi được máy chủ đăng nhập. Kiểm tra mạng rồi thử lại."));
    }
    return data || {};
  }
  async function setPin(studentId, pin, oldPin) {
    const d = await invoke({ action: "set_pin", studentId, pin: String(pin), oldPin: oldPin == null ? undefined : String(oldPin) });
    if (d.error) throw new Error(d.error === "wrong" ? "Mã PIN hiện tại chưa đúng." : fnError(d));
  }

  /* ---------------- chuyển dạng dữ liệu ---------------- */
  function toUser(p, links) {
    const u = { id: p.id, role: p.role, name: p.name, avatar: p.avatar, createdAt: p.created_at, linked: !!p.auth_user_id, inviteCode: p.invite_code || null };
    if (p.role === "student") {
      u.grade = +p.grade; u.className = p.class_name || "";
      u.parentIds = links.filter((l) => l.child_id === p.id).map((l) => l.parent_id);
    }
    return u;
  }
  const toEvent = (e) => ({
    id: e.id, title: e.title, kind: e.kind, grades: (e.grades || []).map(Number), start: e.start_date || null, end: e.end_date || null,
    tentative: !!e.tentative, subjects: e.subjects || [], scope: e.scope || "", note: e.note || "", modules: e.modules || [], banks: e.banks || []
  });
  const fromEvent = (e) => ({
    family_id: famId, id: e.id, title: e.title, kind: e.kind, grades: e.grades, start_date: e.start || null, end_date: e.end || null,
    tentative: !!e.tentative, subjects: e.subjects || [], scope: e.scope || "", note: e.note || "", modules: e.modules || [], banks: e.banks || []
  });
  const toBank = (b) => ({ id: b.id, title: b.title, grade: +b.grade, subject: b.subject || "", minutes: +b.minutes || 0, note: b.note || "", questions: b.questions || [], src: b.src || "" });
  const fromBank = (b) => ({ family_id: famId, id: b.id, title: b.title, grade: b.grade, subject: b.subject, minutes: b.minutes, note: b.note, questions: b.questions, src: b.src });
  const toResult = (r) => ({
    id: r.id, userId: r.profile_id, source: r.source, refId: r.ref_id, subject: r.subject || "", label: r.label || "", mode: r.mode || "",
    r: r.r, t: r.t, s: r.s, at: new Date(r.at).toISOString(), wrongTopics: r.wrong_topics || undefined
  });

  /* ---------------- tải dữ liệu ---------------- */
  async function loadAll() {
    const pid = await rpc("current_profile_id");
    if (!pid) { db = null; meId = null; famId = null; return false; }
    const [fam, profs, links, evs, bks, res] = await Promise.all([
      run(sb.from("families").select("*").maybeSingle()),
      all("profiles"), all("parent_child"), all("exam_events"), all("question_banks"),
      all("results", (q) => q.order("at", { ascending: false }).order("id"))
    ]);
    if (!fam) { db = null; return false; }
    famId = fam.id; meId = pid;
    db = {
      v: 1,
      settings: { schoolName: fam.name || "", schoolYear: fam.school_year || "", joinCode: fam.join_code, createdAt: fam.created_at },
      users: profs.map((p) => toUser(p, links)),
      events: evs.map(toEvent),
      banks: bks.map(toBank),
      results: res.slice(0, MAX_RESULTS).reverse().map(toResult),
      seedBanksSeen: fam.seed_banks_seen || []
    };
    linkNewSeedBanks();
    return true;
  }
  /* Như LocalStore: bộ có sẵn mới trong data/banks.js được gắn vào kì thi theo lịch mặc định; bộ quản trị viên
     đã bỏ gắn (đã có trong seedBanksSeen) thì không gắn lại. Chỉ quản trị ghi lên máy chủ; các vai khác chỉ
     thấy trong bộ nhớ đệm cho tới khi quản trị mở app. */
  function linkNewSeedBanks() {
    const seen = new Set(db.seedBanksSeen);
    const fresh = seedBankIds().filter((id) => !seen.has(id));
    if (!fresh.length) return;
    const changed = [];
    (window.ONTAP_SEED_EVENTS || []).forEach((se) => {
      const ev = db.events.find((e) => e.id === se.id), add = (se.banks || []).filter((id) => fresh.includes(id));
      if (ev && add.length) { ev.banks = add.concat((ev.banks || []).filter((id) => !add.includes(id))); changed.push(ev); }
    });
    db.seedBanksSeen = Array.from(seen).concat(fresh);
    const me = sessionUser();
    if (me && me.role === "admin") {
      const seenNow = db.seedBanksSeen.slice(), rows = changed.map(fromEvent);
      push(async () => {
        if (rows.length) await run(sb.from("exam_events").upsert(rows, { onConflict: "family_id,id" }));
        return sb.from("families").update({ seed_banks_seen: seenNow }).eq("id", famId);
      });
    }
  }

  async function afterAuth(session) {
    authUser = session ? session.user : null; db = null; meId = null;
    if (!authUser) { state = "signed-out"; return; }
    if (authUser.is_anonymous) {
      let kid = false;
      try { kid = sessionStorage.getItem(KID_FLAG) === "1"; } catch (e) {}
      // Như bản cục bộ: đóng trình duyệt là học sinh phải nhập lại PIN (máy dùng chung cho nhiều con).
      if (!kid) { await sb.from("student_sessions").delete().eq("auth_user_id", authUser.id); state = "signed-out"; return; }
    }
    const ok = await loadAll();
    state = ok ? "ready" : authUser.is_anonymous ? "signed-out" : "no-profile";
  }

  function readHashError() {
    const h = location.hash || "";
    if (!/error_description=|error_code=/.test(h)) return;
    const p = new URLSearchParams(h.replace(/^#\/?/, ""));
    authErr = p.get("error_code") === "otp_expired" ? "Link đăng nhập đã hết hạn hoặc đã được dùng. Gửi link mới nhé."
      : "Chưa đăng nhập được: " + (p.get("error_description") || "link không hợp lệ") + ".";
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
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
    readHashError();
    await loadLib();
    sb = window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: "ontap_sb_auth" }
    });
    const { data, error } = await sb.auth.getSession();
    if (error) authErr = errMsg(error, "Chưa đăng nhập được. Gửi link mới nhé.");
    try { await afterAuth(data && data.session); }
    catch (e) {
      console.warn("SupabaseStore:", e);
      throw new Error(errMsg(e, "Không tải được dữ liệu từ máy chủ. Kiểm tra mạng, hoặc xem lại bước chạy schema.sql trong docs/HUONG-DAN-SUPABASE.md."));
    }
    sb.auth.onAuthStateChange((ev) => {
      if (ev === "SIGNED_OUT" && state !== "signed-out") {
        state = "signed-out"; db = null; meId = null;
        if (typeof Store.onChange === "function") setTimeout(Store.onChange, 0);
      }
    });
  }
  async function refresh() {
    if (state !== "ready") return false;
    await flush();
    const ok = await loadAll();
    if (!ok) state = authUser && authUser.is_anonymous ? "signed-out" : "no-profile";
    return true;
  }

  /* ---------------- đăng nhập ---------------- */
  async function sendLink(email) {
    email = String(email || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Email chưa đúng.");
    const { data } = await sb.auth.getSession();
    if (data && data.session) await sb.auth.signOut();
    const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: location.origin + location.pathname, shouldCreateUser: true } });
    if (error) throw new Error(errMsg(error, "Chưa gửi được email. Thử lại sau ít phút."));
  }
  async function verifyCode(email, code) {
    const { data, error } = await sb.auth.verifyOtp({ email: String(email).trim(), token: String(code).replace(/\D/g, ""), type: "email" });
    if (error) throw new Error(errMsg(error, "Mã chưa đúng hoặc đã hết hạn."));
    await afterAuth(data.session);
  }
  async function familyStudents(code) {
    const d = await invoke({ action: "students", code: String(code || "") });
    if (d.error) throw new Error(fnError(d));
    return { family: d.family || "", students: d.students || [] };
  }
  async function studentLogin(code, studentId, pin) {
    let { data } = await sb.auth.getSession();
    if (data && data.session && !data.session.user.is_anonymous) { await sb.auth.signOut(); data = null; }
    if (!data || !data.session) {
      const r = await sb.auth.signInAnonymously();
      if (r.error) throw new Error(errMsg(r.error, "Chưa đăng nhập được. Thử lại sau ít phút."));
    }
    const d = await invoke({ action: "login", code: String(code || ""), studentId, pin: String(pin || "") });
    if (d.error) return { ok: false, message: fnError(d), locked: d.error === "locked" };
    try { sessionStorage.setItem(KID_FLAG, "1"); } catch (e) {}
    lsSet(LAST_KEY, JSON.stringify({ code: String(code).toUpperCase(), id: studentId }));
    await afterAuth((await sb.auth.getSession()).data.session);
    return { ok: state === "ready" };
  }
  const lastLogin = () => { try { return JSON.parse(lsGet(LAST_KEY) || "null") || {}; } catch (e) { return {}; } };

  async function createFamily(d) {
    if (!d.name || !String(d.name).trim()) throw new Error("Cần nhập tên.");
    const events = clone(window.ONTAP_SEED_EVENTS || []);
    try {
      await rpc("create_family", { p_name: String(d.schoolName || "").trim(), p_school_year: "2026–2027", p_admin_name: String(d.name).trim().slice(0, 40),
        p_avatar: d.avatar || "🧭", p_events: events, p_seed_banks: seedBankIds() });
    } catch (e) { throw new Error(errMsg(e, "Chưa tạo được gia đình. Thử lại nhé.")); }
    await afterAuth((await sb.auth.getSession()).data.session);
  }
  async function claimInvite(code) {
    let pid;
    try { pid = await rpc("claim_invite", { p_code: String(code || "") }); } catch (e) { throw new Error(errMsg(e, "Chưa dùng được mã mời. Thử lại nhé.")); }
    if (!pid) throw new Error("Mã mời không đúng hoặc đã được dùng.");
    await afterAuth((await sb.auth.getSession()).data.session);
  }

  /* ---------------- phiên ---------------- */
  function setSession(id) {
    if (id) return; // phiên do Supabase quản lý
    const user = authUser;
    state = "signed-out"; db = null; meId = null;
    try { sessionStorage.removeItem(KID_FLAG); } catch (e) {}
    if (!user) return;
    // Học sinh: chỉ gỡ gắn, giữ phiên ẩn danh để lần sau dùng lại (đỡ tạo người dùng ẩn danh mới).
    queue = queue.then(() => (user.is_anonymous ? sb.from("student_sessions").delete().eq("auth_user_id", user.id) : sb.auth.signOut())).catch(() => {});
  }
  const sessionUser = () => (state === "ready" && db ? db.users.find((u) => u.id === meId) || null : null);

  /* ---------------- người dùng ---------------- */
  async function createUser(data) {
    if (!data.name || !String(data.name).trim()) throw new Error("Cần nhập tên.");
    if (!ROLES[data.role]) throw new Error("Vai trò không hợp lệ.");
    const student = data.role === "student";
    if (student && !validPin(data.pin)) throw new Error("Mã PIN gồm 4 đến 6 chữ số.");
    if (student && ![4, 6].includes(+data.grade)) throw new Error("Chọn khối lớp 4 hoặc 6.");
    const viewer = sessionUser();
    if (!viewer) throw new Error("Phiên đăng nhập đã hết. Tải lại trang.");
    await flush();
    const id = uuid(), name = String(data.name).trim().slice(0, 40);
    const avatar = data.avatar || (student ? "🐣" : data.role === "parent" ? "🌻" : "🧭");
    const className = String(data.className || "").trim().slice(0, 20);
    let parentIds = [];
    try {
      if (student && viewer.role === "parent") {
        await rpc("add_child", { p_id: id, p_name: name, p_avatar: avatar, p_grade: +data.grade, p_class: className });
        parentIds = [viewer.id];
      } else {
        const row = { id, family_id: famId, role: data.role, name, avatar };
        if (student) { row.grade = +data.grade; row.class_name = className; }
        await run(sb.from("profiles").insert(row));
        if (student && Array.isArray(data.parentIds) && data.parentIds.length) {
          parentIds = data.parentIds.slice();
          await run(sb.from("parent_child").insert(parentIds.map((p) => ({ parent_id: p, child_id: id }))));
        }
      }
    } catch (e) { throw new Error(errMsg(e, "Chưa tạo được tài khoản. Thử lại nhé.")); }
    if (student) {
      try { await setPin(id, data.pin); } catch (e) { await sb.from("profiles").delete().eq("id", id); throw e; }
    }
    const row = await run(sb.from("profiles").select("*").eq("id", id).maybeSingle());
    const u = toUser(row || { id, role: data.role, name, avatar, grade: data.grade, class_name: className }, parentIds.map((p) => ({ parent_id: p, child_id: id })));
    db.users.push(u);
    return u;
  }
  async function updateUser(id, patch) {
    const u = db && db.users.find((x) => x.id === id);
    if (!u) throw new Error("Không tìm thấy người dùng.");
    const cols = {};
    if (patch.name != null) { if (!String(patch.name).trim()) throw new Error("Cần nhập tên."); cols.name = String(patch.name).trim().slice(0, 40); }
    if (patch.avatar) cols.avatar = patch.avatar;
    const newPin = patch.pin != null && patch.pin !== "" && u.role === "student";
    if (newPin && !validPin(patch.pin)) throw new Error("Mã PIN gồm 4 đến 6 chữ số.");
    if (u.role === "student") {
      if (patch.grade != null) { if (![4, 6].includes(+patch.grade)) throw new Error("Chọn khối lớp 4 hoặc 6."); cols.grade = +patch.grade; }
      if (patch.className != null) cols.class_name = String(patch.className).trim().slice(0, 20);
    }
    // RLS chặn xóa/sửa thì máy chủ chỉ báo "0 dòng", không báo lỗi, nên kiểm tra quyền ở đây để báo rõ.
    const viewer = sessionUser();
    const linksChanged = u.role === "student" && Array.isArray(patch.parentIds) && patch.parentIds.slice().sort().join() !== (u.parentIds || []).slice().sort().join();
    if (linksChanged && !(viewer && viewer.role === "admin")) throw new Error("Chỉ quản trị mới đổi được phụ huynh của học sinh.");
    await flush();
    try {
      if (Object.keys(cols).length) await run(sb.from("profiles").update(cols).eq("id", id));
      if (u.role === "student" && Array.isArray(patch.parentIds)) {
        const want = patch.parentIds, had = u.parentIds || [];
        const add = want.filter((p) => !had.includes(p)), del = had.filter((p) => !want.includes(p));
        if (add.length) await run(sb.from("parent_child").insert(add.map((p) => ({ parent_id: p, child_id: id }))));
        if (del.length) await run(sb.from("parent_child").delete().eq("child_id", id).in("parent_id", del));
        u.parentIds = want.slice();
      }
    } catch (e) { refreshSoon(); throw new Error(errMsg(e, "Chưa lưu được. Thử lại nhé.")); }
    if (cols.name != null) u.name = cols.name;
    if (cols.avatar) u.avatar = cols.avatar;
    if (cols.grade != null) u.grade = cols.grade;
    if (cols.class_name != null) u.className = cols.class_name;
    if (newPin) await setPin(id, patch.pin, id === meId ? patch.oldPin || "" : undefined);
    return u;
  }
  function removeUser(id) {
    const u = db.users.find((x) => x.id === id);
    if (!u) return;
    if (u.role === "admin" && db.users.filter((x) => x.role === "admin").length <= 1) throw new Error("Phải còn ít nhất một tài khoản quản trị.");
    db.users = db.users.filter((x) => x.id !== id);
    db.users.forEach((s) => { if (s.parentIds) s.parentIds = s.parentIds.filter((p) => p !== id); });
    db.results = db.results.filter((r) => r.userId !== id);
    push(() => sb.from("profiles").delete().eq("id", id));
  }
  /* Chỉ học sinh tự kiểm tra PIN của mình (đổi PIN ở trang Tài khoản). Quản trị, phụ huynh dùng email, không có PIN. */
  async function checkPin(id, pin) {
    if (!(state === "ready" && id === meId && sessionUser().role === "student")) return false;
    const d = await invoke({ action: "check_pin", pin: String(pin || "") });
    if (d.error) throw new Error(fnError(d));
    return !!d.ok;
  }
  const childrenOf = (parentId) => (db ? db.users.filter((u) => u.role === "student" && (u.parentIds || []).includes(parentId)) : []);
  async function newInvite(id) {
    const code = await rpc("new_invite", { p_profile: id }).catch((e) => { throw new Error(errMsg(e, "Chưa tạo được mã mời.")); });
    const u = db.users.find((x) => x.id === id);
    if (u) { u.inviteCode = code; u.linked = false; }
    return code;
  }
  async function newJoinCode() {
    const code = await rpc("new_join_code").catch((e) => { throw new Error(errMsg(e, "Chưa đổi được mã gia đình.")); });
    db.settings.joinCode = code;
    return code;
  }

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
  function upsertBank(b) {
    if ((window.ONTAP_SEED_BANKS || []).some((s) => s.id === b.id)) throw new Error("Không sửa được bộ có sẵn trong app. Hãy tạo bộ mới.");
    if (!b.title || !b.questions || !b.questions.length) throw new Error("Ngân hàng cần tên và ít nhất một câu hỏi.");
    const clean = { id: b.id || "bk-" + uuid().slice(0, 13), title: String(b.title).trim(), grade: +b.grade, subject: b.subject || "", minutes: +b.minutes || 0, note: b.note || "", questions: b.questions, src: String(b.src || "").slice(0, 200000) };
    const i = db.banks.findIndex((x) => x.id === clean.id);
    if (i >= 0) db.banks[i] = clean; else db.banks.push(clean);
    const row = fromBank(clean);
    push(() => sb.from("question_banks").upsert(row, { onConflict: "family_id,id" }));
    return clean;
  }
  function removeBank(id) {
    db.banks = db.banks.filter((b) => b.id !== id);
    const changed = db.events.filter((e) => (e.banks || []).includes(id));
    changed.forEach((e) => { e.banks = e.banks.filter((x) => x !== id); });
    const rows = changed.map(fromEvent);
    push(async () => {
      if (rows.length) await run(sb.from("exam_events").upsert(rows, { onConflict: "family_id,id" }));
      return sb.from("question_banks").delete().eq("family_id", famId).eq("id", id);
    });
  }

  /* ---------------- kết quả ---------------- */
  function addResult(r) {
    const clean = {
      id: uuid(), userId: r.userId, source: r.source, refId: r.refId, subject: r.subject || "",
      label: String(r.label || "").slice(0, 120), mode: r.mode || "", r: Math.max(0, +r.r || 0),
      t: Math.max(0, +r.t || 0), s: Math.max(0, +r.s || 0), at: new Date().toISOString(),
      wrongTopics: Array.isArray(r.wrongTopics) ? r.wrongTopics.slice(0, 50) : undefined
    };
    if (clean.r > clean.t) clean.r = clean.t;
    db.results.push(clean);
    if (db.results.length > MAX_RESULTS) db.results = db.results.slice(-MAX_RESULTS);
    if (!(clean.t > 0)) return clean;
    const row = { id: clean.id, profile_id: clean.userId, source: clean.source, ref_id: String(clean.refId || "").slice(0, 80), subject: String(clean.subject).slice(0, 60),
      label: clean.label, mode: String(clean.mode).slice(0, 20), r: clean.r, t: Math.min(clean.t, 1000), s: clean.s,
      wrong_topics: clean.wrongTopics ? clean.wrongTopics.map((x) => String(x).slice(0, 200)) : null };
    push(() => sb.from("results").insert(row));
    return clean;
  }
  const resultsFor = (userId) => db.results.filter((r) => r.userId === userId).sort((a, b) => (a.at < b.at ? 1 : -1));

  /* ---------------- sao lưu, chuyển dữ liệu ---------------- */
  function exportJSON() {
    const users = db.users.map((u) => { const x = clone(u); delete x.inviteCode; delete x.linked; return x; });
    return JSON.stringify({ app: "on-thi-4-6", exportedAt: new Date().toISOString(), from: "cloud", v: 1,
      settings: { schoolName: db.settings.schoolName, schoolYear: db.settings.schoolYear }, users, events: db.events, banks: db.banks,
      results: db.results, seedBanksSeen: db.seedBanksSeen }, null, 2);
  }
  function localData() {
    try { const d = JSON.parse(lsGet(LOCAL_KEY) || "null"); return d && Array.isArray(d.users) ? d : null; } catch (e) { return null; }
  }
  /* Chuyển dữ liệu dạng LocalStore (trên máy này hoặc từ file sao lưu) lên family đang đăng nhập. Chạy lại không bị trùng. */
  async function migrate(data) {
    if (!data || !Array.isArray(data.users) || !Array.isArray(data.events) || !Array.isArray(data.results)) throw new Error("Dữ liệu thiếu người dùng, lịch thi hoặc kết quả.");
    const payload = {
      users: data.users.map((u) => ({ id: u.id, role: u.role, name: u.name, avatar: u.avatar, grade: u.grade, className: u.className, parentIds: u.parentIds, salt: u.salt, pinHash: u.pinHash })),
      events: data.events, banks: Array.isArray(data.banks) ? data.banks : [], results: data.results.slice(-MAX_RESULTS),
      seedBanksSeen: Array.isArray(data.seedBanksSeen) ? data.seedBanksSeen : undefined, settings: data.settings || {}
    };
    await flush();
    let res;
    try { res = await rpc("import_local", { p_data: payload }); } catch (e) { throw new Error(errMsg(e, "Chưa chuyển được dữ liệu. Thử lại nhé.")); }
    lsSet(MIGRATED_KEY, new Date().toISOString());
    await loadAll();
    return res || {};
  }
  function importJSON(text) {
    let data;
    try { data = JSON.parse(text); } catch (e) { return Promise.reject(new Error("File không đúng định dạng JSON.")); }
    return migrate(data);
  }
  function wipe() {
    if (!(sessionUser() && sessionUser().role === "admin")) return Promise.resolve();
    state = "signed-out"; db = null; meId = null;
    const p = queue.then(() => rpc("delete_family")).then(() => sb.auth.signOut());
    queue = p.catch(() => {});
    return p.catch((e) => { report(errMsg(e, "Chưa xóa được dữ liệu trên đám mây.")); });
  }
  function setSettings(p) {
    Object.assign(db.settings, p);
    const cols = {};
    if (p.schoolName != null) cols.name = String(p.schoolName).slice(0, 80);
    if (p.schoolYear != null) cols.school_year = String(p.schoolYear).slice(0, 20);
    push(() => sb.from("families").update(cols).eq("id", famId));
  }

  window.LocalStore = Local;
  window.Store = {
    ROLES, cloud: true,
    load: () => db, save: () => {}, setup: () => { throw new Error("Bản đám mây tạo gia đình bằng Store.createFamily."); },
    isReady: () => state === "ready", persistent: () => true, data: () => db,
    createUser, updateUser, removeUser, checkPin, validPin, childrenOf,
    users: (role) => (db ? db.users.filter((u) => !role || u.role === role) : []),
    user: (id) => (db ? db.users.find((u) => u.id === id) || null : null),
    setSession, sessionUser, lastUserId: () => lastLogin().id || null,
    events, event: (id) => (db ? db.events.find((e) => e.id === id) || null : null), upsertEvent, removeEvent, resetEvents,
    banks, bank: bankById, upsertBank, removeBank,
    addResult, resultsFor,
    exportJSON, importJSON, wipe,
    settings: () => (db ? db.settings : {}), setSettings,
    _mem: null,
    // chỉ có ở bản đám mây
    init, refresh, flush, authState: () => state, authError: () => { const m = authErr; authErr = ""; return m; },
    authEmail: () => (authUser && authUser.email) || "",
    sendLink, verifyCode, familyStudents, studentLogin, lastFamilyCode: () => lastLogin().code || "",
    createFamily, claimInvite, newInvite, newJoinCode, familyCode: () => (db ? db.settings.joinCode : ""),
    localData, migrate, migratedAt: () => lsGet(MIGRATED_KEY),
    onError: null, onChange: null
  };
})();
