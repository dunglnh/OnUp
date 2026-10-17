/* App chính: đăng nhập, trang chủ theo vai trò, lịch thi cả năm, mở bài ôn, quản trị.
   Định tuyến bằng hash: #/home, #/calendar, #/play/<mã bài>, #/quiz/<mã ngân hàng>,
   #/child/<mã học sinh>, #/report/<mã học sinh>, #/admin/<tab>, #/admin/event/<mã|new>,
   #/admin/user/<mã|new>, #/admin/bank/<mã|new>, #/account.
   Bản đám mây (Store.cloud, xem js/store-supabase.js): đăng nhập tên đăng nhập + mật khẩu → "Ai đang học?" (hồ sơ con
   hoặc Phụ huynh). Phụ huynh là người dùng vai trò "admin" của app nên dùng chung các màn hình quản trị, gọi là "Khu phụ huynh". */
(function () {
  "use strict";
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const view = $("#view"), who = $("#who"), foot = $(".foot");
  const MODULES = window.ONTAP_MODULES || [];
  const modById = (id) => MODULES.find((m) => m.id === id) || null;
  const AVATARS = ["🐣", "🦊", "🐼", "🐯", "🐨", "🐸", "🦄", "🐙", "🐬", "🚀", "⚽", "🎨", "🌻", "🧭", "📚", "🌟"];
  const KIND = { "dinh-ki": "Kiểm tra định kì", ioe: "IOE", "thi-khac": "Thi khác", moc: "Mốc năm học" };
  const DAY = 864e5;
  const WD = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const TITLE = document.title;
  /* Khối lớp (data/grades.js): chỉ hiện khối đang có nội dung, cộng thêm các khối trong keep (dữ liệu đang có) để sửa không mất khối. */
  const GRADES = window.ONTAP_GRADES || [];
  const gradeList = (keep) => GRADES.filter((g) => g.active || (keep || []).includes(g.grade)).map((g) => g.grade);
  const gradeName = (g) => (GRADES.find((x) => x.grade === +g) || { name: "Lớp " + g }).name;
  const gradeOptions = (sel) => gradeList([+sel]).map((g) => `<option value="${g}" ${+sel === g ? "selected" : ""}>${esc(gradeName(g))}</option>`).join("");
  const gradesOf = (users) => [...new Set(users.map((u) => +u.grade))].sort((a, b) => a - b);

  /* ---------------- ngày tháng ---------------- */
  const today0 = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const pd = (s) => (s ? new Date(s + "T00:00:00") : null);
  const dm = (s) => { const d = pd(s); return d ? d.getDate() + "/" + (d.getMonth() + 1) : ""; };
  const dmy = (s) => { const d = pd(s); return d ? d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() : ""; };
  const range = (e) => (!e.start ? "Chưa có lịch" : e.end && e.end !== e.start ? dm(e.start) + " – " + dmy(e.end) : WD[pd(e.start).getDay()] + ", " + dmy(e.start));
  function status(e) {
    if (!e.start) return "nodate";
    const t = today0(), s = pd(e.start), en = pd(e.end || e.start);
    return en < t ? "past" : s <= t ? "now" : "future";
  }
  const daysTo = (e) => Math.round((pd(e.start) - today0()) / DAY);
  const ago = (iso) => {
    const d = new Date(iso), t = today0(), diff = Math.floor((t - new Date(d.getFullYear(), d.getMonth(), d.getDate())) / DAY);
    const hm = String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
    return diff <= 0 ? "Hôm nay " + hm : diff === 1 ? "Hôm qua " + hm : d.getDate() + "/" + (d.getMonth() + 1) + " " + hm;
  };
  const pct = (r, t) => (t ? Math.round((r / t) * 100) : 0);
  const d10 = (r, t) => (t ? String(Math.round((r / t) * 40) / 4).replace(".", ",") : "–");
  const isoDay = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

  /* ---------------- tiện ích giao diện ---------------- */
  let toastTimer;
  function toast(msg) {
    let t = $("#toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status"); document.body.append(t); }
    t.textContent = msg; t.hidden = false; clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (t.hidden = true), 2600);
  }
  const go = (h) => { if (guardOn()) { askLeave(h, false); return; } if (location.hash === h) route(); else location.hash = h; };
  const back = (h, txt) => `<button class="linkbtn" data-go="${h}">← ${esc(txt || "Quay lại")}</button>`;
  function wireGo(root) { $$("[data-go]", root || view).forEach((b) => (b.onclick = () => go(b.dataset.go))); }
  const avatar = (u, lg) => `<span class="av${lg ? " lg" : ""}" aria-hidden="true">${esc(u.avatar || "🙂")}</span>`;
  const gradeTxt = (u) => (u.role === "student" ? "Lớp " + u.grade + (u.className ? " · " + u.className : "") : Store.ROLES[u.role]);
  function emojiPicker(sel) {
    return `<div class="emojis" role="group" aria-label="Chọn hình đại diện">${AVATARS.map((a) => `<button type="button" data-emo="${a}" aria-pressed="${a === sel}">${a}</button>`).join("")}</div>`;
  }
  function wireEmoji(root, cb) {
    $$("[data-emo]", root).forEach((b) => (b.onclick = () => { $$("[data-emo]", root).forEach((x) => x.setAttribute("aria-pressed", x === b)); cb(b.dataset.emo); }));
  }
  function download(name, text) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "application/json" }));
    a.download = name; document.body.append(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  /* ---------------- sao lưu ----------------
     Bản lưu trên máy ghi lúc sao lưu xong (settings.lastBackupAt). Quá 7 ngày chưa sao lưu, hoặc chưa sao lưu lần nào
     mà đã có kết quả làm bài, thì trang chủ của quản trị và phụ huynh hiện thẻ nhắc. Bản đám mây không nhắc.
     backupNow() → Promise: "share" | "download" khi đã sao lưu, false khi người dùng bấm hủy.
     - Bản lưu trên máy, máy cảm ứng chia sẻ được file (iPhone, iPad): mở bảng chia sẻ (lưu vào Tệp, gửi Zalo…), vì app mở từ
       Màn hình chính trên iOS có thể không lưu được file tải bằng <a download>. Chỉ ghi lastBackupAt khi chia sẻ xong; hủy thì
       không ghi, không báo. Máy tính bỏ qua bảng chia sẻ (trên Mac bảng này không có chỗ lưu file); Chrome trên Android không
       chia sẻ được file .json.
     - Còn lại (cả bản đám mây): tải file như thường và ghi lastBackupAt ngay.
     Trình duyệt chỉ cho chia sẻ trong lúc người dùng đang bấm, nên gọi backupNow() ngay trong sự kiện bấm nút.
     Bảng chia sẻ đang mở thì bỏ qua lần bấm sau (bấm hai lần liền), để lần đó không bị coi là đã sao lưu. */
  let sharing = false;
  function backupNow() {
    if (sharing) return Promise.resolve(false);
    const d = new Date(), name = `on-thi-sao-luu-${isoDay(d)}.json`, text = Store.exportJSON();
    const done = (how) => { if (!Store.cloud) Store.setSettings({ lastBackupAt: d.toISOString() }); return how; };
    const save = () => { download(name, text); return done("download"); };
    let file = null;
    if (!Store.cloud) try {
      const f = new File([text], name, { type: "application/json" });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [f] }) && matchMedia("(any-pointer: coarse)").matches) file = f;
    } catch (e) { /* trình duyệt cũ: tải file như thường */ }
    if (!file) return Promise.resolve(save());
    sharing = true;
    return navigator.share({ files: [file], title: "File sao lưu OnUp" })
      .then(() => done("share"), (e) => (e && e.name === "AbortError" ? false : save()))
      .finally(() => (sharing = false));
  }
  function backupDue() {
    if (Store.cloud) return null;
    const last = Date.parse(Store.settings().lastBackupAt || "");
    if (!last) return Store.data().results.length ? "Chưa sao lưu lần nào" : null;
    return Date.now() - last > 7 * DAY ? `Đã ${Math.floor((Date.now() - last) / DAY)} ngày chưa sao lưu` : null;
  }
  function backupCard() {
    const due = backupDue();
    return due ? `<section class="panel remind" id="backupRemind"><b>${esc(due)}</b>
      <span class="small">Dữ liệu chỉ nằm trên trình duyệt của máy này, có thể mất khi xóa lịch sử duyệt web hoặc lâu không mở app (iPhone, iPad). Tải file sao lưu rồi cất vào Zalo, Google Drive hoặc email.</span>
      <div class="row"><button class="btn main sm" id="backupNow">Tải file sao lưu</button></div></section>` : "";
  }
  const lastBackupTxt = () => { const s = Store.settings().lastBackupAt; return s ? "Lần sao lưu gần nhất: " + ago(s) + "." : "Máy này chưa sao lưu lần nào."; };
  /* Đang mở app từ Màn hình chính (không phải từ trình duyệt). */
  const standalone = () => { try { return matchMedia("(display-mode: standalone)").matches || navigator.standalone === true; } catch (e) { return false; } };
  function wireBackupCard() {
    const b = $("#backupNow");
    if (b) b.onclick = () => backupNow().then((how) => {
      if (!how) return;
      const c = $("#backupRemind"); if (c) c.remove();
      toast(how === "share" ? "Đã lưu file sao lưu" : "Đã tải file sao lưu");
    });
  }

  /* ---------------- chốt rời trang ----------------
     Đang làm bài (đề ngân hàng chưa nộp, bài ôn trong khung đang làm một lượt) thì rời màn hình phải qua hộp hỏi lại:
     - link và nút trong app (go(), thẻ <a href="#…">, kể cả "Lịch thi" và nút tài khoản trên thanh đầu): hỏi trước khi đổi hash;
     - nút Back/Forward, gõ địa chỉ: hashchange không hủy được, nên thêm lại địa chỉ cũ vào lịch sử (không vẽ lại màn hình)
       rồi hỏi; đồng ý thì lùi về đúng địa chỉ đích;
     - tải lại, đóng tab: hộp hỏi của trình duyệt (beforeunload).
     guard = {busy(): còn bài làm dở?, ask, note, yes, no: chữ trên hộp, leave(): việc làm trước khi rời (nộp bài)}.
              Chữ đổi theo bài đang làm thì thêm text() trả về {ask, note, yes, no}, đọc lúc mở hộp.
              route() bỏ chốt; màn hình nào cần thì đặt lại. */
  let guard = null, shownHash = location.hash, leaving = null;
  const guardOn = () => !!(guard && guard.busy());
  /* viaHistory: trình duyệt đã đổi hash và app vừa thêm lại địa chỉ cũ, nên đồng ý thì chỉ cần lùi một bước. */
  function askLeave(to, viaHistory) {
    leaving = { to, viaHistory };
    if ($("#leaveBox")) return;
    const g = guard, t = g.text ? g.text() : g, box = document.createElement("div");
    box.id = "leaveBox"; box.className = "leave";
    box.innerHTML = `<div class="confirm" role="alertdialog" aria-modal="true" aria-labelledby="leaveQ"${t.note ? ` aria-describedby="leaveNote"` : ""}>
      <b id="leaveQ">${esc(t.ask)}</b>${t.note ? `<span id="leaveNote">${esc(t.note)}</span>` : ""}
      <div class="row"><button class="btn danger" id="leaveYes">${esc(t.yes)}</button><button class="btn main" id="leaveNo">${esc(t.no)}</button></div></div>`;
    document.body.append(box);
    const stay = $("#leaveNo");
    stay.onclick = closeLeave;
    box.onkeydown = (e) => { if (e.key === "Escape") closeLeave(); };
    $("#leaveYes").onclick = () => {
      const { to, viaHistory } = leaving; closeLeave();
      if (g.leave) g.leave();
      guard = null;
      if (viaHistory) history.back(); else go(to);
    };
    stay.focus();
  }
  function closeLeave() { const b = $("#leaveBox"); if (b) b.remove(); leaving = null; }
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || !guardOn() || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault(); askLeave(a.getAttribute("href"), false);
  }, true);
  window.addEventListener("beforeunload", (e) => { if (guardOn()) { e.preventDefault(); e.returnValue = "leave"; } });

  /* ---------------- số liệu học tập ---------------- */
  function within(results, days) { const lim = Date.now() - days * DAY; return results.filter((r) => new Date(r.at).getTime() >= lim); }
  function sumRT(list) { return list.reduce((a, r) => [a[0] + r.r, a[1] + r.t], [0, 0]); }
  function streak(results) {
    const days = new Set(results.map((r) => { const d = new Date(r.at); return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate(); }));
    let n = 0; const d = today0();
    const key = (x) => x.getFullYear() + "-" + x.getMonth() + "-" + x.getDate();
    if (!days.has(key(d))) d.setDate(d.getDate() - 1);
    while (days.has(key(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function readiness(e, student, results) {
    const mods = (e.modules || []).filter((id) => { const m = modById(id); return m && m.grade === student.grade; });
    const rel = within(results, 28).filter((r) => (r.source === "module" && mods.includes(r.refId)) || (r.source === "bank" && (e.banks || []).includes(r.refId)));
    const [r, t] = sumRT(rel);
    return { n: rel.length, p: t ? pct(r, t) : null };
  }
  function practiceFor(e, grade) {
    const mods = (e.modules || []).map(modById).filter((m) => m && (grade == null || m.grade === +grade));
    const bks = (e.banks || []).map((id) => Store.bank(id)).filter((b) => b && (grade == null || +b.grade === +grade));
    return { mods, bks };
  }
  function nextEvent(grade) {
    return Store.events(grade).find((e) => e.kind !== "moc" && (status(e) === "now" || status(e) === "future")) || null;
  }
  function bySubject(list) {
    const m = {};
    list.forEach((x) => { const k = x.subject || "Khác", o = (m[k] = m[k] || { name: k, n: 0, r: 0, t: 0 }); o.n++; o.r += x.r; o.t += x.t; });
    return Object.values(m).sort((a, b) => b.n - a.n || a.name.localeCompare(b.name, "vi"));
  }
  /* [chủ đề, số câu sai], nhiều nhất trước. Chỉ ngân hàng câu hỏi ghi chủ đề; bài ôn dạng trang chỉ gửi điểm tổng. */
  function wrongTopics(list) {
    const m = {};
    list.forEach((x) => (x.wrongTopics || []).forEach((t) => (m[t] = (m[t] || 0) + 1)));
    return Object.entries(m).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "vi"));
  }

  /* ---------------- thanh người dùng ---------------- */
  function drawWho(u) {
    if (!u) { who.innerHTML = ""; return; }
    who.innerHTML = `<a class="btn ghost sm" href="#/calendar">Lịch thi</a><button class="linkbtn row" id="whoBtn" aria-label="Tài khoản của ${esc(u.name)}" style="gap:6px">${avatar(u)}<span class="nm">${esc(u.name)}</span></button>`;
    $("#whoBtn").onclick = () => go("#/account");
  }

  /* ================= THIẾT LẬP LẦN ĐẦU ================= */
  function renderSetup() {
    drawWho(null);
    let emo = "🧭";
    view.innerHTML = `<div class="stack">
      <section class="hero"><span class="label">Chào mừng</span><h1>Thiết lập app ôn thi</h1>
        <p>Tạo tài khoản quản trị trước. Sau đó bạn thêm tài khoản học sinh, phụ huynh và chỉnh lịch thi của trường.</p></section>
      ${standalone() ? `<section class="panel remind" id="restoreTip"><b>Đã dùng OnUp trong Safari?</b>
        <span class="small">Dữ liệu ở đó không tự sang đây. Mở OnUp trong Safari → Quản trị → Dữ liệu → Tải file sao lưu, rồi quay lại đây chọn Khôi phục từ file sao lưu.</span>
        <div class="row"><label class="btn main" for="sImport">Khôi phục từ file sao lưu</label></div></section>` : ""}
      <form class="panel" id="setupForm" autocomplete="off">
        <div class="form">
          <label class="field"><span>Tên trường hoặc gia đình <span class="opt-note">· không bắt buộc</span></span><input id="sSchool" placeholder="Ví dụ: Lớp 4A Trường Tiểu học Kim Đồng"></label>
          <label class="field"><span>Tên người quản trị</span><input id="sName" placeholder="Ví dụ: Cô Lan, Bố Minh" required></label>
          <label class="field"><span>Mã PIN (4–6 chữ số)</span><input id="sPin" type="password" inputmode="numeric" maxlength="6" required></label>
          <label class="field"><span>Nhập lại mã PIN</span><input id="sPin2" type="password" inputmode="numeric" maxlength="6" required></label>
          <div class="field full"><span>Hình đại diện</span>${emojiPicker(emo)}</div>
        </div>
        <div id="sErr"></div>
        <div class="row"><button class="btn main" type="submit">Tạo và bắt đầu</button><label class="btn ghost" for="sImport">Khôi phục từ file sao lưu</label><input type="file" id="sImport" accept=".json,application/json" hidden></div>
        <p class="muted small">Dữ liệu được lưu trên trình duyệt của máy này. Nhớ sao lưu ra file trong mục Quản trị → Dữ liệu.</p>
      </form></div>`;
    wireEmoji(view, (e) => (emo = e));
    $("#setupForm").onsubmit = async (ev) => {
      ev.preventDefault();
      const err = $("#sErr"), pin = $("#sPin").value.trim();
      if (pin !== $("#sPin2").value.trim()) { err.innerHTML = `<div class="fb bad">Hai mã PIN chưa khớp.</div>`; return; }
      try {
        Store.setup({ schoolName: $("#sSchool").value.trim() });
        const u = await Store.createUser({ role: "admin", name: $("#sName").value, pin, avatar: emo });
        Store.setSession(u.id); toast("Đã tạo tài khoản quản trị"); go("#/admin/users");
      } catch (e) { Store.wipe(); err.innerHTML = `<div class="fb bad">${esc(e.message)}</div>`; }
    };
    $("#sImport").onchange = (e) => importFile(e.target.files[0], () => go("#/"));
  }
  function importFile(f, done) {
    if (!f) return;
    const r = new FileReader();
    r.onload = () => { try { Store.importJSON(r.result); Store.setSession(null); toast("Đã khôi phục dữ liệu"); done && done(); } catch (e) { toast(e.message); } };
    r.readAsText(f, "utf-8");
  }

  /* ================= ĐĂNG NHẬP ================= */
  const pinBoxHTML = () => `<section class="panel" id="pinBox" hidden>
        <div class="row" style="justify-content:center" id="pinWho"></div>
        <div class="pin" id="pinDots" aria-hidden="true"></div>
        <label class="field" style="max-width:300px;margin:0 auto;width:100%"><span>Mã PIN</span><input id="pinIn" type="password" inputmode="numeric" maxlength="6" autocomplete="off"></label>
        <div class="pad">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<button type="button" data-k="${n}">${n}</button>`).join("")}<button type="button" data-k="del" aria-label="Xóa">⌫</button><button type="button" data-k="0">0</button><button type="button" data-k="ok" aria-label="Vào" style="background:var(--sun);color:var(--sun-ink)">Vào</button></div>
        <div id="pinErr" aria-live="assertive"></div>
      </section>`;
  /* Bàn phím PIN dùng chung cho đăng nhập trên máy và trên đám mây. submit(pin) được gọi khi bấm Vào, Enter,
     hoặc gõ đủ độ dài PIN của người đã chọn (u.pinLen; chưa biết thì 6).
     probe(pin), không bắt buộc: chưa biết độ dài thì gọi khi gõ đủ 4 số, để thử lặng lẽ PIN 4 số. */
  function wirePinBox(submit, probe) {
    const inp = $("#pinIn");
    let pin = "", len = 0;
    const set = (v) => { pin = v; inp.value = v; $("#pinDots").innerHTML = Array.from({ length: Math.max(len || 4, pin.length) }, (_, i) => `<span class="${i < pin.length ? "on" : ""}"></span>`).join(""); };
    const typed = (v) => { set(v); if (pin.length === (len || 6)) submit(pin); else if (!len && pin.length === 4 && probe) probe(pin); };
    $$(".pad button").forEach((b) => (b.onclick = () => {
      const k = b.dataset.k;
      if (k === "ok") submit(pin);
      else if (k === "del") set(pin.slice(0, -1));
      else if (pin.length < (len || 6)) typed(pin + k);
    }));
    inp.oninput = () => { const v = inp.value.replace(/\D/g, "").slice(0, len || 6); if (v.length > pin.length) typed(v); else set(v); };
    inp.onkeydown = (e) => { if (e.key === "Enter") submit(pin); };
    return {
      clear: () => set(""),
      show(u) {
        len = u.pinLen >= 4 && u.pinLen <= 6 ? u.pinLen : 0;
        set(""); $("#pinErr").innerHTML = "";
        $("#pinWho").innerHTML = `${avatar(u)}<b>${esc(u.name)}</b>`;
        $("#pinBox").hidden = false; setTimeout(() => inp.focus({ preventScroll: true }), 30);
        $("#pinBox").scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    };
  }
  const pinError = (msg) => { $("#pinErr").innerHTML = `<div class="fb bad">${esc(msg)}</div>`; };

  /* Khóa tạm sau nhiều lần sai PIN, tính riêng từng người, lưu trong localStorage nên tải lại trang không xóa được.
     Mỗi 5 lần sai liên tiếp phải đợi: 30 giây, 1 phút, 5 phút, rồi 15 phút. Đăng nhập đúng thì xóa bộ đếm.
     Chỉ làm việc đoán mò PIN mất thời gian; không phải bảo mật thật (ai mở công cụ trình duyệt cũng xóa được). */
  const PinLock = (() => {
    const KEY = "ontap_pinlock_v1", EVERY = 5, WAITS = [30, 60, 300, 900];
    let mem = {};
    const read = () => { try { const o = JSON.parse(localStorage.getItem(KEY) || "{}"); return o && typeof o === "object" ? o : {}; } catch (e) { return mem; } };
    const write = (o) => { mem = o; try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) { /* chỉ giữ trong bộ nhớ */ } };
    const wait = (id) => { const x = read()[id]; return x && x.until > Date.now() ? Math.ceil((x.until - Date.now()) / 1000) : 0; };
    return {
      wait, // số giây còn phải đợi, 0 = nhập được
      left(id) { const x = read()[id]; return EVERY - ((x && x.fails) || 0) % EVERY; }, // còn mấy lần sai nữa thì bị khóa
      /* Lượt thử lặng lẽ khi chưa biết độ dài PIN (xem wirePinBox): không tính là lần sai, nhưng mỗi người chỉ có EVERY lượt
         cho tới khi đăng nhập đúng, để không thành cách đoán PIN 4 số không giới hạn. */
      probe(id) {
        const o = read(), x = (o[id] = o[id] || { fails: 0, until: 0 });
        if (wait(id) || (x.probes || 0) >= EVERY) return false;
        x.probes = (x.probes || 0) + 1; write(o); return true;
      },
      fail(id) {
        const o = read(), x = (o[id] = o[id] || { fails: 0, until: 0 });
        x.fails++;
        if (x.fails % EVERY === 0) x.until = Date.now() + WAITS[Math.min(x.fails / EVERY, WAITS.length) - 1] * 1000;
        write(o); return wait(id);
      },
      clear(id) { const o = read(); if (o[id]) { delete o[id]; write(o); } }
    };
  })();
  const waitTxt = (s) => (s < 60 ? s + " giây" : Math.floor(s / 60) + " phút" + (s % 60 ? " " + (s % 60) + " giây" : ""));

  /* Chọn người dùng rồi nhập PIN. Bản lưu trên máy: mọi tài khoản của máy, theo vai trò.
     Bản đám mây ("Ai đang học?", đã đăng nhập tài khoản gia đình): các hồ sơ con và ô Phụ huynh. Hồ sơ con không có PIN
     thì bấm là vào; Phụ huynh phải nhập lại mật khẩu (vừa nhập trong 5 phút thì không hỏi lại). */
  function renderLogin() {
    drawWho(null);
    const cloud = !!Store.cloud, parent = cloud ? Store.users("admin")[0] : null;
    // Bản đám mây, tài khoản chưa có hồ sơ con và bố mẹ vừa đăng nhập: vào thẳng khu phụ huynh để thêm hồ sơ.
    if (cloud && !Store.users("student").length && Store.parentUnlocked()) { Store.setSession(parent.id); go("#/home"); return; }
    const groups = cloud ? [["student", "Con"], ["admin", "Bố mẹ"]] : [["student", "Học sinh"], ["parent", "Phụ huynh"], ["admin", "Quản trị"]];
    const sub = (u) => (cloud && u.role === "admin" ? "Nhập mật khẩu" : gradeTxt(u));
    let sel = Store.user(Store.lastUserId()) ? Store.lastUserId() : null;
    view.innerHTML = `<div class="stack">
      <div><h1>${cloud ? "Ai đang học?" : "Xin chào!"}</h1><p class="muted">${esc(Store.settings().schoolName || (cloud ? "Chọn hồ sơ của bạn." : "Chọn tên của bạn để bắt đầu."))}</p></div>
      ${cloud && !Store.users("student").length ? `<div class="notice">Chưa có hồ sơ con. Bố mẹ chọn “Phụ huynh” để thêm hồ sơ cho con.</div>` : ""}
      ${groups.map(([role, name]) => { const us = Store.users(role); return us.length ? `<section class="sec"><div class="label">${name}</div><div class="tiles">${us.map((u) => `<button class="tile" data-u="${esc(u.id)}" aria-pressed="${u.id === sel}">${avatar(u, true)}<span class="nm">${esc(u.name)}</span><span class="small muted">${esc(sub(u))}</span></button>`).join("")}</div></section>` : ""; }).join("")}
      ${pinBoxHTML()}
      ${cloud ? `<form class="panel" id="pwBox" hidden autocomplete="on">
        <div class="row" style="justify-content:center">${avatar(parent)}<b>Phụ huynh</b></div>
        <input type="text" name="username" autocomplete="username" value="${esc(Store.username())}" hidden>
        <label class="field" style="max-width:300px;margin:0 auto;width:100%"><span>Mật khẩu của bố mẹ</span><input id="pwIn" type="password" autocomplete="current-password" maxlength="72"></label>
        <div class="captcha" id="pwCaptcha"></div>
        <div id="pwErr" aria-live="assertive"></div>
        <div class="row" style="justify-content:center"><button class="btn main" type="submit" id="pwGo">Vào khu phụ huynh</button></div>
      </form>` : ""}</div>`;
    const box = wirePinBox(submit, probe);
    let tick = null, busy = false;
    const errBox = () => $(cloud && sel === (parent && parent.id) ? "#pwErr" : "#pinErr");
    const err = (msg) => { errBox().innerHTML = `<div class="fb bad">${esc(msg)}</div>`; };
    // Đếm ngược trong #pinWait (aria-live="off" để trình đọc màn hình không đọc lại mỗi giây).
    function showWait(id, lead) {
      clearInterval(tick);
      const out = errBox();
      out.innerHTML = `<div class="fb bad">${esc(lead || "Sai nhiều lần.")} Đợi <b id="pinWait" aria-live="off">${waitTxt(PinLock.wait(id))}</b> rồi thử lại.</div>`;
      tick = setInterval(() => {
        const w = $("#pinWait"), s = PinLock.wait(id);
        if (!w || sel !== id) { clearInterval(tick); return; }
        if (!s) { clearInterval(tick); out.innerHTML = `<div class="fb ok">Bạn nhập lại được rồi.</div>`; return; }
        w.textContent = waitTxt(s);
      }, 1000);
    }
    /* tapped: người dùng bấm vào ô (không phải ô chọn sẵn lúc mở trang). Ô chọn sẵn không tự vào hồ sơ không có PIN. */
    function pick(id, tapped) {
      sel = id; clearInterval(tick);
      $$(".tile").forEach((t) => t.setAttribute("aria-pressed", t.dataset.u === id));
      const u = Store.user(id);
      if (cloud) {
        $("#pwBox").hidden = true; $("#pinBox").hidden = true;
        if (u.role === "admin") {
          if (tapped && Store.parentUnlocked()) { enter(id); return; }
          $("#pwErr").innerHTML = ""; $("#pwIn").value = ""; $("#pwBox").hidden = false;
          setTimeout(() => $("#pwIn").focus({ preventScroll: true }), 30);
          $("#pwBox").scrollIntoView({ behavior: "smooth", block: "nearest" });
          if (PinLock.wait(id)) showWait(id);
          return;
        }
        if (!u.hasPin) { if (tapped) enter(id); return; }
      }
      box.show(u);
      if (PinLock.wait(id)) showWait(id);
    }
    const enter = (id) => { PinLock.clear(id); clearInterval(tick); Store.setSession(id); go("#/home"); };
    // busy: gõ đủ số rồi bấm Enter ngay (hoặc thử lặng lẽ chưa xong) thì không kiểm tra hai lần.
    async function submit(pin) {
      if (!sel || !pin || busy) return;
      const id = sel;
      if (PinLock.wait(id)) { box.clear(); showWait(id); return; }
      busy = true;
      const ok = await Store.checkPin(id, pin);
      busy = false;
      if (sel !== id) return;
      if (ok) { enter(id); return; }
      box.clear();
      if (PinLock.fail(id)) { showWait(id, "Mã PIN chưa đúng."); return; }
      const left = PinLock.left(id);
      pinError(left <= 2 ? `Mã PIN chưa đúng. Sai thêm ${left} lần nữa thì phải đợi một lúc.` : "Mã PIN chưa đúng. Thử lại nhé.");
    }
    // Tài khoản cũ chưa biết độ dài PIN: gõ đủ 4 số thì thử lặng lẽ. Sai thì không báo, không tính là lần sai, chờ gõ tiếp.
    async function probe(pin) {
      const id = sel;
      if (!id || busy || !PinLock.probe(id)) return;
      busy = true;
      const ok = await Store.checkPin(id, pin);
      busy = false;
      if (ok && sel === id) enter(id);
    }
    // Mật khẩu của bố mẹ (bản đám mây): sai cũng tính vào khóa tạm như PIN, để con không đoán mãi được.
    if (cloud) $("#pwBox").onsubmit = async (ev) => {
      ev.preventDefault();
      const id = sel, pw = $("#pwIn").value;
      if (!pw || busy) return;
      if (PinLock.wait(id)) { showWait(id); return; }
      busy = true; $("#pwGo").disabled = true;
      try {
        const ok = await Store.checkPassword(pw);
        if (sel !== id) return;
        if (ok) { enter(id); return; }
        $("#pwIn").value = "";
        if (PinLock.fail(id)) { showWait(id, "Mật khẩu chưa đúng."); return; }
        const left = PinLock.left(id);
        err(left <= 2 ? `Mật khẩu chưa đúng. Sai thêm ${left} lần nữa thì phải đợi một lúc.` : "Mật khẩu chưa đúng. Thử lại nhé.");
      } catch (e) { err(e.message); } finally { busy = false; if ($("#pwGo")) $("#pwGo").disabled = false; }
    };
    $$(".tile").forEach((t) => (t.onclick = () => pick(t.dataset.u, true)));
    if (sel) pick(sel, false);
    if (!cloud && !Store.users().length) view.insertAdjacentHTML("afterbegin", `<div class="fb bad">Chưa có tài khoản nào.</div>`);
  }

  /* ================= ĐĂNG NHẬP ĐÁM MÂY (khi js/config.js có Supabase) ================= */
  /* Dòng liên hệ khi quên mật khẩu hoặc tài khoản bị khóa: chữ và đường liên hệ lấy từ js/config.js (contactText, contactUrl).
     Chỉ nhận đường https:, tel:, sms:, mailto:. */
  function contactLine(lead) {
    const c = window.ONTAP_CONFIG || {}, txt = String(c.contactText || "").trim() || "Liên hệ người cấp tài khoản.", url = String(c.contactUrl || "").trim();
    const ok = /^(https:|tel:|sms:|mailto:)/i.test(url);
    return `<div class="row contact" id="contact" style="gap:4px 8px"><span class="small muted">${esc(lead)}</span>${ok
      ? `<a class="linkbtn small" href="${esc(url)}"${/^https:/i.test(url) ? ` target="_blank" rel="noopener"` : ""}>${esc(txt)}</a>` : `<span class="small muted">${esc(txt)}</span>`}</div>`;
  }
  function renderCloudLogin() {
    drawWho(null);
    view.innerHTML = `<div class="stack">
      <div><h1>Xin chào!</h1><p class="muted">Bố mẹ đăng nhập bằng tài khoản được cấp. Sau đó con chọn hồ sơ của mình để học.</p></div>
      <form class="panel" id="loginForm" autocomplete="on">
        <label class="field"><span>Tên đăng nhập</span><input id="lUser" name="username" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false" maxlength="20" required></label>
        <label class="field"><span>Mật khẩu</span><input id="lPass" name="password" type="password" autocomplete="current-password" maxlength="72" required></label>
        <div class="checks"><label><input type="checkbox" id="lRemember" ${Store.rememberLogin() ? "checked" : ""}>Ghi nhớ trên máy này</label></div>
        <p class="small muted">Chọn ghi nhớ trên máy của gia đình để con mở app là học được. Không chọn thì đóng trang là phải đăng nhập lại.</p>
        <div class="captcha" id="loginCaptcha"></div>
        <div id="loginErr" aria-live="assertive"></div>
        <div class="row"><button class="btn main" type="submit" id="lGo">Đăng nhập</button></div>
        ${contactLine("Quên mật khẩu?")}
      </form></div>`;
    $("#loginForm").onsubmit = async (ev) => {
      ev.preventDefault();
      const btn = $("#lGo"); if (btn.disabled) return;
      btn.disabled = true; $("#loginErr").innerHTML = "";
      try { await Store.signIn($("#lUser").value, $("#lPass").value, $("#lRemember").checked); go("#/"); }
      catch (e) { $("#lPass").value = ""; $("#loginErr").innerHTML = `<div class="fb bad">${esc(e.message)}</div>`; btn.disabled = false; }
    };
  }
  /* Ô đổi mật khẩu (dùng chung cho bắt đổi mật khẩu tạm và trang Tài khoản). cur: hỏi mật khẩu hiện tại. */
  const pwFields = (cur) => `<input type="text" name="username" autocomplete="username" value="${esc(Store.username())}" hidden>
    ${cur ? `<label class="field"><span>Mật khẩu hiện tại</span><input id="pwOld" type="password" autocomplete="current-password" maxlength="72" required></label>` : ""}
    <label class="field"><span>Mật khẩu mới (ít nhất 8 kí tự)</span><input id="pwNew" type="password" autocomplete="new-password" maxlength="72" required></label>
    <label class="field"><span>Nhập lại mật khẩu mới</span><input id="pwNew2" type="password" autocomplete="new-password" maxlength="72" required></label>
    <div class="captcha" id="pwCaptcha"></div><div id="pwErr" aria-live="assertive"></div>`;
  function wirePwForm(form, cur, done) {
    form.onsubmit = async (ev) => {
      ev.preventDefault();
      const btn = $("[type=submit]", form), nw = $("#pwNew").value;
      const err = (m) => ($("#pwErr").innerHTML = m ? `<div class="fb bad">${esc(m)}</div>` : "");
      if (btn.disabled) return;
      if (nw !== $("#pwNew2").value) { err("Hai mật khẩu mới chưa khớp."); return; }
      btn.disabled = true; err("");
      try { await Store.changePassword(nw, cur ? $("#pwOld").value : undefined); done(); }
      catch (e) { err(e.message); btn.disabled = false; }
    };
  }
  /* Lần đầu đăng nhập (hoặc sau khi chủ app đặt lại mật khẩu): bắt đặt mật khẩu mới. */
  function renderNewPassword() {
    drawWho(null);
    view.innerHTML = `<div class="stack">
      <section class="hero"><span class="label">Mật khẩu tạm</span><h1>Đặt mật khẩu mới</h1><p>Mật khẩu bạn vừa dùng là mật khẩu tạm. Đặt mật khẩu của riêng bạn để dùng tiếp.</p></section>
      <form class="panel" id="npForm" autocomplete="on"><div class="form">${pwFields(false)}</div>
        <div class="row"><button class="btn main" type="submit">Lưu mật khẩu</button><button class="btn ghost" type="button" id="npOut">Đăng xuất</button></div></form></div>`;
    wirePwForm($("#npForm"), false, () => { toast("Đã đặt mật khẩu mới"); go("#/"); });
    $("#npOut").onclick = async () => { await Store.signOut(); go("#/"); };
  }
  /* Tài khoản bị khóa, hoặc tài khoản không có dữ liệu gia đình (ví dụ tài khoản của chủ app). */
  function renderCloudBlocked(st) {
    drawWho(null);
    const locked = st === "locked";
    view.innerHTML = `<div class="stack"><section class="panel" id="blocked"><h1>${locked ? "Tài khoản đang bị khóa" : "Tài khoản này không dùng để học"}</h1>
      <p>${locked ? "Tài khoản này tạm thời không dùng được. Dữ liệu của gia đình vẫn được giữ nguyên." : "Tài khoản này chưa có dữ liệu gia đình (có thể là tài khoản quản lý của chủ app). Đăng nhập bằng tài khoản gia đình để học."}</p>
      ${contactLine(locked ? "Cần mở khóa?" : "Cần tài khoản gia đình?")}
      <div class="row"><button class="btn main" id="bOut">Đăng xuất</button></div></section></div>`;
    $("#bOut").onclick = async () => { await Store.signOut(); go("#/"); };
  }

  /* ================= TRANG CHỦ ================= */
  function renderHome(u) {
    if (u.role === "student") return renderStudent(u, u, false);
    if (u.role === "parent") return renderParent(u);
    return renderAdmin(u, "overview");
  }

  function eventRow(e, opts) {
    const st = status(e), g = opts && opts.grade;
    const { mods, bks } = practiceFor(e, g);
    const extra = opts && opts.student ? readiness(e, opts.student, opts.results) : null;
    const dd = !e.start ? `<span class="d">?<small>chưa có</small></span>` : `<span class="d">${dm(e.start)}<small>${e.end && e.end !== e.start ? "đến " + dm(e.end) : WD[pd(e.start).getDay()]}</small></span>`;
    return `<button class="ev ${esc(e.kind)} ${st}" data-ev="${esc(e.id)}">
      ${dd}
      <span class="t"><b>${esc(e.title)}${g == null && e.grades ? ` · Lớp ${e.grades.join(", ")}` : ""}</b>
        <span class="tags">${e.kind !== "moc" ? `<span class="tag ${e.kind === "ioe" ? "ioe" : ""}">${esc(KIND[e.kind] || e.kind)}</span>` : `<span class="tag moc">Mốc năm học</span>`}
          ${e.tentative && e.start ? `<span class="tag warn">Dự kiến</span>` : ""}
          ${st === "now" ? `<span class="tag warn">Đang diễn ra</span>` : st === "future" && e.kind !== "moc" ? `<span class="tag">Còn ${daysTo(e)} ngày</span>` : ""}
          ${mods.length + bks.length ? `<span class="tag">${mods.length + bks.length} bài ôn</span>` : ""}
          ${extra && extra.p != null ? `<span class="tag ${extra.p >= 80 ? "ioe" : "warn"}">Sẵn sàng ${extra.p}%</span>` : ""}</span>
        ${e.subjects && e.subjects.length ? `<span class="small muted">${esc(e.subjects.join(", "))}</span>` : ""}</span>
    </button>`;
  }
  function wireEvents(root, grade, student) {
    $$("[data-ev]", root).forEach((b) => (b.onclick = () => openEvent(b.dataset.ev, grade, student)));
  }

  /* Chữ trên nút đề trong một hàng (cùng môn), lấy từ tên đề dạng "<môn> <khối> · <kì> · Đề N" (data/banks.js):
     - mọi đề cùng một kì: "Đề N", N lấy từ tên (tên không có số thì "Đề");
     - nhiều kì khác nhau (nhóm "Bài ôn khác"): tên bỏ phần môn và khối, ví dụ "Cuối kì I · Đề 1";
     - tên tự đặt không bắt đầu bằng môn và khối (ngân hàng quản trị viên nhập): nguyên tên đề.
     Hai nút trùng chữ thì ghi dài như nhóm nhiều kì, vẫn trùng thì ghi nguyên tên đề. */
  function bankLabels(list) {
    const norm = (x) => String(x).normalize("NFC").replace(/\s+/g, " ").trim().toLowerCase();
    const info = list.map((b) => {
      const title = String(b.title).normalize("NFC"), parts = title.split(/\s*·\s*/), head = norm(parts[0]);
      const rest = parts.length > 1 && [b.subject + " " + b.grade, b.subject + " lớp " + b.grade].some((h) => norm(h) === head) ? parts.slice(1) : null;
      const term = rest && rest.slice(0, /^Đề\s*\d*$/i.test(rest[rest.length - 1]) ? -1 : rest.length).join(" · ");
      return { rest, term, n: (/Đề\s*(\d+)/i.exec(title) || [])[1], title: b.title };
    });
    const uniq = (a) => new Set(a).size === a.length;
    const short = info.map((x) => (x.n ? "Đề " + x.n : "Đề")), long = info.map((x) => (x.rest ? x.rest.join(" · ") : x.title));
    if (info.every((x) => x.rest && x.term === info[0].term) && uniq(short)) return short;
    return uniq(long) ? long : info.map((x) => x.title);
  }
  /* Mỗi bài ôn dạng trang một dòng; đề ngân hàng gom theo môn thành một dòng có các nút "Đề 1 · Đề 2 · …"
     (xếp theo tên đề, chữ trên nút theo bankLabels; aria-label là tên đề đầy đủ). */
  function practiceList(mods, bks, canPlay) {
    if (!mods.length && !bks.length) return `<div class="panel muted">Chưa có bài ôn cho mục này. Quản trị viên có thể nhập ngân hàng câu hỏi trong mục Quản trị.</div>`;
    const subs = new Map(), act = canPlay ? "main" : "";
    bks.forEach((b) => { const k = b.subject || "Khác"; subs.set(k, (subs.get(k) || []).concat(b)); });
    return `<div class="list">${mods.map((m) => `<div class="item"><span class="grow"><b>${esc(m.title)}</b><span class="small muted">${esc(m.desc)}</span></span><a class="btn ${act} sm" href="#/play/${esc(m.id)}">${canPlay ? "Vào ôn" : "Xem thử"}</a></div>`).join("")}
      ${[...subs].map(([sub, list]) => {
        list.sort((a, b) => a.title.localeCompare(b.title, "vi", { numeric: true }));
        const nq = list[0].questions.length, same = list.every((b) => b.questions.length === nq);
        return `<div class="item subj"><span class="grow"><b>${esc(sub)}</b><span class="small muted">${list.length} đề${same ? ` · ${nq} câu${list.length > 1 ? " mỗi đề" : ""}` : ""}</span></span>
          <span class="des">${bankLabels(list).map((lb, i) => { const b = list[i]; return `<a class="btn ${act} sm" href="#/quiz/${esc(b.id)}" aria-label="${canPlay ? "" : "Xem thử "}${esc(b.title.includes(lb) ? b.title : lb + " · " + b.title)}">${esc(lb)}</a>`; }).join("")}</span></div>`;
      }).join("")}</div>`;
  }
  /* "Tất cả bài ôn" của một khối, gom theo kì thi chưa qua: kì gần nhất mở sẵn, các kì sau thu gọn.
     Bài không thuộc kì nào trong số đó (kì đã qua, ngân hàng chưa gắn) nằm ở nhóm cuối "Bài ôn khác", nên không sót bài nào. */
  function practiceGroups(grade, canPlay) {
    const seen = new Set(), key = (x) => (x.path ? "m:" : "b:") + x.id;
    const groups = Store.events(grade).filter((e) => e.kind !== "moc" && status(e) !== "past").map((e) => Object.assign({ e }, practiceFor(e, grade)))
      .filter((g) => g.mods.length + g.bks.length);
    groups.forEach((g) => g.mods.concat(g.bks).forEach((x) => seen.add(key(x))));
    const rest = { mods: MODULES.filter((m) => m.grade === +grade && !seen.has(key(m))), bks: Store.banks(grade).filter((b) => !seen.has(key(b))) };
    if (rest.mods.length + rest.bks.length) groups.push(rest);
    if (!groups.length) return practiceList([], [], canPlay);
    return groups.map((g, i) => `<details class="grp"${g.e ? ` data-grp="${esc(g.e.id)}"` : ""}${i ? "" : " open"}>
      <summary><span class="grow"><b>${g.e ? esc(g.e.title) : "Bài ôn khác"}</b><span class="small muted">${g.e ? esc(range(g.e)) + " · " : ""}${g.mods.length + g.bks.length} bài ôn</span></span></summary>
      ${practiceList(g.mods, g.bks, canPlay)}</details>`).join("");
  }

  function renderStudent(s, viewer, asObserver) {
    const results = Store.resultsFor(s.id), next = nextEvent(s.grade);
    const w7 = within(results, 7), [r30, t30] = sumRT(within(results, 30));
    const evs = Store.events(s.grade).filter((e) => status(e) !== "past").slice(0, 5);
    let hero = `<section class="hero"><span class="label">Kì thi tiếp theo</span><h1>Chưa có kì thi sắp tới</h1><p>Xem lịch thi cả năm để biết thêm.</p></section>`;
    if (next) {
      const { mods, bks } = practiceFor(next, s.grade), st = status(next), rd = readiness(next, s, results);
      hero = `<section class="hero">
        <span class="label">${asObserver ? "Kì thi tiếp theo của " + esc(s.name) : "Kì thi tiếp theo"}${next.tentative ? " · ngày dự kiến" : ""}</span>
        <div class="row between" style="align-items:flex-end"><h1>${esc(next.title)}</h1>
          <div class="row" style="gap:6px;align-items:baseline"><div class="count">${st === "now" ? "Hôm nay" : daysTo(next)}</div>${st === "now" ? "" : `<span class="small">ngày nữa</span>`}</div></div>
        <p>${esc(range(next))}${next.subjects.length ? " · " + esc(next.subjects.join(", ")) : ""}</p>
        ${next.scope ? `<p class="small">${esc(next.scope)}</p>` : ""}
        ${rd.p != null ? `<p class="small">Điểm ôn 4 tuần qua cho kì này: <b>${rd.p}%</b> (${rd.n} lần làm)</p>` : ""}
        <div class="row">${mods.map((m) => `<a class="btn main" href="#/play/${esc(m.id)}">${esc(m.title)}</a>`).join("")}${bks.length ? `<button class="btn ${mods.length ? "ghost" : "main"}" id="toBanks">Đề ôn · ${bks.length} đề</button>` : ""}</div>
      </section>`;
    }
    const subs = bySubject(within(results, 30)), weakList = wrongTopics(within(results, 30)).slice(0, 5);
    // Học sinh: 3 kết quả mới nhất ngay dưới hàng thống kê. Phụ huynh, quản trị xem hồ sơ: 30 kết quả ở cuối trang.
    const recent = `<section class="sec" id="recent"><h2>Kết quả gần đây</h2>${resultsList(results.slice(0, asObserver ? 30 : 3))}</section>`;
    view.innerHTML = `<div class="stack">
      ${asObserver ? `<div class="row between">${back(viewer.role === "admin" ? "#/admin/overview" : "#/home", "Về danh sách")}${viewer.role !== "student" ? `<a class="btn ghost sm" href="#/admin/user/${esc(s.id)}">Sửa hồ sơ</a>` : ""}</div>
        <div class="row between"><div class="row">${avatar(s, true)}<div><h2>${esc(s.name)}</h2><span class="muted">${esc(gradeTxt(s))}</span></div></div><a class="btn main sm" id="toReport" href="#/report/${esc(s.id)}">Báo cáo tuần</a></div>` : `<div><h2>Chào ${esc(s.name)}! ${esc(s.avatar)}</h2><span class="muted">${esc(gradeTxt(s))}</span></div>`}
      ${s.locked ? `<div class="notice">Hồ sơ này đang khóa vì tài khoản có nhiều hồ sơ con hơn gói hiện tại cho phép. Vẫn xem được kết quả cũ, bài làm mới chưa được lưu.</div>` : ""}
      ${hero}
      <div class="stats">
        <div class="stat"><b>${w7.length}</b><span>bài trong 7 ngày</span></div>
        <div class="stat"><b>${t30 ? d10(r30, t30) : "–"}</b><span>điểm TB 30 ngày (/10)</span></div>
        <div class="stat"><b>${streak(results)}</b><span>ngày ôn liên tiếp</span></div>
      </div>
      ${asObserver ? "" : recent}
      ${subs.length ? `<section class="panel"><div class="label">Theo môn · 30 ngày</div><div class="ubreak">${subs.map(({ name, r, t }) => `<span>${esc(name)}</span><div class="bar ${pct(r, t) >= 80 ? "good" : ""}"><i style="width:${pct(r, t)}%"></i></div><span>${pct(r, t)}%</span>`).join("")}</div></section>` : ""}
      ${weakList.length ? `<section class="panel"><div class="label">Chủ đề hay sai</div><div class="tags">${weakList.map(([t, n]) => `<span class="tag warn">${esc(t)} · ${n} câu</span>`).join("")}</div></section>` : ""}
      <section class="sec"><div class="row between"><h2>Lịch thi sắp tới</h2><a class="linkbtn" href="#/calendar">Cả năm →</a></div>
        <div class="timeline">${evs.map((e) => eventRow(e, { grade: s.grade, student: s, results })).join("") || `<div class="panel muted">Không còn kì thi nào trong năm học.</div>`}</div></section>
      <section class="sec" id="allPractice"><h2>Tất cả bài ôn lớp ${s.grade}</h2>${practiceGroups(s.grade, !asObserver)}</section>
      ${asObserver ? recent : ""}
    </div>`;
    wireEvents(view, s.grade, s); wireGo();
    // Nút "Đề ôn" trên thẻ kì thi: mở nhóm của kì đó trong "Tất cả bài ôn" (đề gom theo môn ở đó).
    if ($("#toBanks")) $("#toBanks").onclick = () => {
      const g = $(`#allPractice [data-grp="${CSS.escape(next.id)}"]`); if (!g) return;
      g.open = true; g.scrollIntoView({ behavior: "smooth", block: "start" });
    };
  }
  function resultsList(list) {
    if (!list.length) return `<div class="panel muted">Chưa có kết quả. Làm một bài ôn để bắt đầu.</div>`;
    return `<div class="list">${list.map((r) => `<div class="item"><div class="grow"><b>${esc(r.label || "Bài ôn")}</b><span class="small muted">${esc(ago(r.at))}${r.subject ? " · " + esc(r.subject) : ""}${r.mode === "exam" ? " · làm như thi" : ""}</span></div><b class="${pct(r.r, r.t) >= 80 ? "" : ""}" style="font-variant-numeric:tabular-nums">${r.r}/${r.t}</b></div>`).join("")}</div>`;
  }

  /* ================= BÁO CÁO TUẦN =================
     Phụ huynh, quản trị mở từ hồ sơ của con. Tóm tắt 7 ngày gần nhất (hôm nay và 6 ngày trước), in được
     (@media print trong css/app.css). Chỉ đọc qua Store nên chạy như nhau ở bản trên máy và bản đám mây. */
  const MAX_SECS = 5400; // một lần làm quá 90 phút thường là quên đóng bài: chỉ tính 90 phút
  function weekStats(list) {
    const [r, t] = sumRT(list);
    return { n: list.length, r, t, days: new Set(list.map((x) => isoDay(new Date(x.at)))).size, mins: Math.round(list.reduce((a, x) => a + Math.min(+x.s || 0, MAX_SECS), 0) / 60) };
  }
  /* Gợi ý dạng câu thường (chưa esc), tối đa 5 câu, việc cần làm trước đứng trước. */
  function weekTips(s, week, all) {
    const tips = [], st = weekStats(week), nm = s.name;
    if (!st.n) tips.push(`${nm} chưa làm bài nào trong 7 ngày qua. Tuần sau bắt đầu lại nhẹ nhàng: mỗi ngày một đề ngắn 20–30 phút.`);
    else if (st.days < 5) tips.push(`${nm} ôn ${st.days}/7 ngày. Tuần sau cố gắng ôn ít nhất 5 ngày, mỗi ngày 20–30 phút, thay vì làm dồn một buổi.`);
    else tips.push(`${nm} ôn đều ${st.days}/7 ngày. Giữ nhịp này cho tuần sau.`);
    const nx = nextEvent(s.grade);
    const later = [];
    if (nx) {
      const { mods, bks } = practiceFor(nx, s.grade), items = mods.concat(bks);
      const todo = items.filter((x) => !all.some((r) => r.refId === x.id)).map((x) => x.title);
      let t = `${nx.title}: ${status(nx) === "now" ? "đang diễn ra" : "còn " + daysTo(nx) + " ngày"}.`;
      if (todo.length) t += ` Bài ôn chưa làm: ${todo.slice(0, 3).join("; ")}${todo.length > 3 ? " và " + (todo.length - 3) + " bài khác" : ""}.`;
      else if (items.length) {
        const low = items.map((x) => { const [r, n] = sumRT(all.filter((y) => y.refId === x.id)); return { title: x.title, p: pct(r, n) }; }).sort((a, b) => a.p - b.p)[0];
        t += low.p < 90 ? ` Ôn tiếp “${low.title}”: đang đúng ${low.p}%.` : ` Các bài ôn của kì này đang đúng từ ${low.p}% trở lên.`;
      }
      tips.push(t);
      const subs = [...new Set(mods.flatMap((m) => Object.values(m.subjects || {})).concat(bks.map((b) => b.subject)).filter(Boolean))];
      const miss = subs.filter((x) => !week.some((r) => r.subject === x));
      if (st.n && miss.length) later.push(`Tuần này chưa ôn ${miss.join(", ")} cho kì thi sắp tới.`);
      if (st.n && items.length && status(nx) === "future" && daysTo(nx) <= 14 && !week.some((r) => r.mode === "exam")) later.push("Sắp thi: làm ít nhất một đề ở chế độ “Làm như thi” (có tính giờ) để quen với thời gian làm bài.");
    }
    const weak = bySubject(week).filter((x) => x.t >= 5 && pct(x.r, x.t) < 70);
    if (weak.length) tips.push(`${weak.map((x) => x.name + " mới đúng " + pct(x.r, x.t) + "%").join(", ")}: xem lại lời giải các câu sai rồi làm lại đề đó.`);
    const tp = wrongTopics(week).slice(0, 3).map(([t]) => t);
    if (tp.length) tips.push(`Ôn lại chủ đề hay sai: ${tp.join(", ")}.`);
    return tips.concat(later).slice(0, 5);
  }
  function renderReport(s) {
    const all = Store.resultsFor(s.id), t0 = today0(), from = addDays(t0, -6);
    const span = (a, b) => all.filter((r) => { const d = new Date(r.at); return d >= a && d < b; });
    const week = span(from, addDays(t0, 1)), st = weekStats(week), pv = weekStats(span(addDays(from, -7), from));
    const perDay = {}; week.forEach((r) => { const k = isoDay(new Date(r.at)); perDay[k] = (perDay[k] || 0) + 1; });
    const subs = bySubject(week), topics = wrongTopics(week).slice(0, 6), school = Store.settings().schoolName;
    const evs = Store.events(s.grade).filter((e) => e.kind !== "moc" && e.start && status(e) !== "past").slice(0, 3);
    const a = isoDay(from), b = isoDay(t0);
    document.title = `Báo cáo tuần · ${s.name} · ${dm(a)}–${dmy(b)}`; // tên file gợi ý khi lưu PDF
    view.innerHTML = `<div class="stack report">
      <div class="row between noprint">${back("#/child/" + esc(s.id), "Hồ sơ của con")}<button class="btn main sm" id="rpPrint">In báo cáo</button></div>
      <header class="stack tight">
        <span class="label">OnUp · Báo cáo tuần</span>
        <div class="row">${avatar(s, true)}<div><h1>${esc(s.name)}</h1><span class="muted">${esc(gradeTxt(s))}${school ? " · " + esc(school) : ""}</span></div></div>
        <p><b>${WD[from.getDay()]}, ${dm(a)} – ${WD[t0.getDay()]}, ${dmy(b)}</b> <span class="small muted">· 7 ngày gần nhất</span></p>
      </header>
      <div class="stats four">
        <div class="stat"><b id="rpCount">${st.n}</b><span>bài đã làm</span><small>Tuần trước: ${pv.n}</small></div>
        <div class="stat"><b>${st.days}/7</b><span>ngày có ôn</span><small>Tuần trước: ${pv.days}/7</small></div>
        <div class="stat"><b>${d10(st.r, st.t)}</b><span>điểm TB (/10)</span><small>Tuần trước: ${d10(pv.r, pv.t)}</small></div>
        <div class="stat"><b>${st.mins}</b><span>phút làm bài</span><small>Tuần trước: ${pv.mins}</small></div>
      </div>
      <section class="panel"><div class="label">Số bài từng ngày</div><div class="rp-days">${Array.from({ length: 7 }, (_, i) => {
        const d = addDays(from, i), n = perDay[isoDay(d)] || 0;
        return `<div class="rp-day${n ? " on" : ""}"><span>${WD[d.getDay()]}</span><b>${n || "–"}</b><small>${d.getDate()}/${d.getMonth() + 1}</small></div>`;
      }).join("")}</div></section>
      ${st.n ? `<section class="panel" id="rpSubjects"><div class="label">Điểm theo môn</div>${subs.map((x) => `<div class="rp-sub"><div class="row between"><b>${esc(x.name)}</b><b>${d10(x.r, x.t)}<span class="small muted">/10</span></b></div>
          <div class="bar ${pct(x.r, x.t) >= 80 ? "good" : ""}"><i style="width:${pct(x.r, x.t)}%"></i></div><span class="small muted">${x.n} bài · ${x.r}/${x.t} câu đúng</span></div>`).join("")}</section>
        <section class="panel" id="rpTopics"><div class="label">Chủ đề hay sai</div>${topics.length ? `<div class="list">${topics.map(([t, n]) => `<div class="item"><span class="grow">${esc(t)}</span><b class="small">${n} câu sai</b></div>`).join("")}</div>`
          : `<p class="small muted">Không có câu sai nào được ghi theo chủ đề. Bài ôn IOE và ôn giữa kì I chỉ gửi về điểm tổng.</p>`}</section>`
        : `<div class="panel muted">Chưa có bài làm nào trong 7 ngày qua.</div>`}
      <section class="sec"><h2>Kì thi sắp tới</h2>${evs.length ? `<div class="timeline">${evs.map((e) => eventRow(e, { grade: s.grade, student: s, results: all })).join("")}</div>` : `<div class="panel muted">Không còn kì thi nào có lịch trong năm học.</div>`}</section>
      <section class="panel" id="rpTips"><h2>Gợi ý ôn tuần sau</h2><ol class="tips">${weekTips(s, week, all).map((t) => `<li>${esc(t)}</li>`).join("")}</ol></section>
      ${st.n ? `<section class="sec"><h2>Bài đã làm trong tuần</h2>${resultsList(week)}</section>` : ""}
      <p class="small muted">Lập ngày ${dmy(b)}. Điểm quy về thang 10 theo số câu đúng.</p>
    </div>`;
    wireGo(); wireEvents(view, s.grade, s);
    $("#rpPrint").onclick = () => window.print();
  }

  /* Bản đám mây: hồ sơ vượt số hồ sơ của gói (máy chủ đặt profiles.locked) không ghi được kết quả mới. */
  const lockTag = (u) => (u.locked ? " · đang khóa theo gói" : "");
  function childCard(c) {
    const res = Store.resultsFor(c.id), nx = nextEvent(c.grade), [r, t] = sumRT(within(res, 30));
    return `<button class="item" data-child="${esc(c.id)}">${avatar(c)}<span class="grow"><b>${esc(c.name)}</b>
      <span class="small muted">${esc(gradeTxt(c))}${esc(lockTag(c))} · ${res.length ? "Lần cuối: " + esc(ago(res[0].at)) : "Chưa làm bài nào"}${t ? " · TB 30 ngày " + d10(r, t) + "/10" : ""}</span>
      ${nx ? `<span class="small">Sắp tới: ${esc(nx.title)} · ${esc(range(nx))}</span>` : ""}</span><span aria-hidden="true">›</span></button>`;
  }
  function renderParent(p) {
    const kids = Store.childrenOf(p.id);
    view.innerHTML = `<div class="stack">
      <div><h2>Chào ${esc(p.name)}</h2><span class="muted">Theo dõi việc ôn thi của con.</span></div>
      ${backupCard()}
      <section class="sec"><div class="row between"><h2>Con của tôi</h2><button class="btn sm" id="addKid">+ Thêm con</button></div>
        ${kids.length ? `<div class="list">${kids.map(childCard).join("")}</div>` : `<div class="panel muted">Chưa có tài khoản con. Bấm “Thêm con” để tạo, hoặc nhờ quản trị viên gắn tài khoản của con vào.</div>`}</section>
      ${gradesOf(kids).map((g) => `<section class="sec"><div class="row between"><h2>Lịch thi lớp ${g}</h2><a class="linkbtn" href="#/calendar">Cả năm →</a></div><div class="timeline">${Store.events(g).filter((e) => status(e) !== "past").slice(0, 4).map((e) => eventRow(e, { grade: g })).join("")}</div></section>`).join("")}
      <section class="panel small"><b>Gợi ý cho phụ huynh</b><span>Mỗi ngày con làm 1 đề ngắn (20–30 phút) tốt hơn làm dồn cuối tuần. Xem mục “Chủ đề hay sai” trong hồ sơ của con để biết cần ôn lại phần nào.</span></section>
    </div>`;
    $$("[data-child]").forEach((b) => (b.onclick = () => go("#/child/" + b.dataset.child)));
    $("#addKid").onclick = () => go("#/admin/user/new?role=student");
    wireBackupCard();
    wireEvents(view, null, null);
  }

  /* ================= CHI TIẾT KÌ THI ================= */
  function openEvent(id, grade, student) {
    const e = Store.event(id); if (!e) return;
    const u = Store.sessionUser();
    const g = grade != null ? grade : null;
    const { mods, bks } = practiceFor(e, g);
    const canPlay = u.role === "student";
    const box = document.createElement("div");
    box.className = "panel"; box.id = "evDetail";
    box.innerHTML = `<div class="row between"><span class="label">${esc(KIND[e.kind] || "")}${e.tentative && e.start ? " · Dự kiến" : ""}</span><button class="linkbtn" id="evClose">Đóng ✕</button></div>
      <h2>${esc(e.title)}</h2>
      <p><b>${esc(range(e))}</b> · Lớp ${esc((e.grades || []).join(", "))}</p>
      ${e.subjects && e.subjects.length ? `<p>Môn: ${esc(e.subjects.join(", "))}</p>` : ""}
      ${e.scope ? `<p class="small">Phạm vi: ${esc(e.scope)}</p>` : ""}
      ${e.note ? `<p class="small muted">${esc(e.note)}</p>` : ""}
      ${e.kind !== "moc" ? `<div class="label">Bài ôn cho kì này</div>${practiceList(mods, bks, canPlay)}` : ""}
      ${u.role === "admin" ? `<div class="row"><a class="btn sm" href="#/admin/event/${esc(e.id)}">Sửa kì thi</a></div>` : ""}`;
    const old = $("#evDetail"); if (old) old.remove();
    const anchor = $(`[data-ev="${CSS.escape(id)}"]`);
    if (anchor) anchor.after(box); else view.prepend(box);
    $("#evClose").onclick = () => box.remove();
    box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /* ================= LỊCH THI CẢ NĂM ================= */
  let calGrade = null;
  function renderCalendar(u) {
    const fixed = u.role === "student" ? u.grade : null;
    const kidGrades = u.role === "parent" || (Store.cloud && u.role === "admin") ? gradesOf(Store.childrenOf(u.id)) : [];
    const gl = gradeList(kidGrades);
    if (fixed) calGrade = fixed;
    else if (calGrade == null) calGrade = kidGrades.length === 1 ? kidGrades[0] : 0;
    const evs = Store.events(calGrade || null), dated = evs.filter((e) => e.start), undated = evs.filter((e) => !e.start);
    const months = {};
    dated.forEach((e) => { const d = pd(e.start), k = d.getFullYear() * 100 + d.getMonth(); (months[k] = months[k] || []).push(e); });
    const student = u.role === "student" ? u : null, results = student ? Store.resultsFor(u.id) : [];
    view.innerHTML = `<div class="stack">
      <div class="row between">${back("#/home", "Trang chính")}${u.role === "admin" ? `<a class="btn sm" href="#/admin/event/new">+ Thêm kì thi</a>` : ""}</div>
      <div><h1>Lịch thi năm học ${esc(Store.settings().schoolYear || "2026–2027")}</h1>
      <p class="muted small">Kiểm tra định kì, IOE và các mốc năm học. Mục “Dự kiến” sẽ được cập nhật khi trường thông báo.</p></div>
      ${fixed ? "" : `<div class="tabs" role="group" aria-label="Chọn khối">${[[0, gl.length === 2 ? "Cả hai khối" : "Mọi khối"]].concat(gl.map((g) => [g, gradeName(g)])).map(([g, t]) => `<button data-g="${g}" aria-pressed="${calGrade === g}">${t}</button>`).join("")}</div>`}
      <div class="timeline">
        ${Object.keys(months).sort().map((k) => `<div class="month">Tháng ${(k % 100) + 1}/${Math.floor(k / 100)}</div>${months[k].map((e) => eventRow(e, { grade: calGrade || null, student, results })).join("")}`).join("")}
        ${undated.length ? `<div class="month">Chưa có lịch</div>${undated.map((e) => eventRow(e, { grade: calGrade || null })).join("")}` : ""}
      </div></div>`;
    $$("[data-g]").forEach((b) => (b.onclick = () => { calGrade = +b.dataset.g; renderCalendar(u); }));
    wireEvents(view, calGrade || null, student); wireGo();
  }

  /* ================= KHÔNG TÌM THẤY, SAI KHỐI ================= */
  function renderMissing(title, msg) {
    view.innerHTML = `<div class="stack"><section class="panel" id="missing"><h1>${esc(title)}</h1><p>${esc(msg)}</p>
      <div class="row"><button class="btn main" data-go="#/home">Về trang chính</button></div></section></div>`;
    wireGo();
  }
  const notFound = () => renderMissing("Không tìm thấy trang", "Trang này không có trong app. Có thể bạn gõ nhầm, hoặc trang đã được bỏ đi.");
  /* Học sinh chỉ làm bài của khối mình (điểm lưu vào hồ sơ). Phụ huynh, quản trị vẫn xem thử mọi khối. */
  function wrongGrade(u, g) {
    if (u.role !== "student" || +g === +u.grade) return false;
    renderMissing(`Bài này dành cho lớp ${g}`, `Bạn đang học lớp ${u.grade}. Về trang chính để chọn bài của lớp ${u.grade} nhé.`);
    return true;
  }

  /* ================= MỞ BÀI ÔN ================= */
  function renderPlay(u, id) {
    const m = modById(id);
    if (!m) { renderMissing("Không tìm thấy bài ôn", "Bài ôn này không có trong app, hoặc đã được bỏ đi."); return; }
    if (wrongGrade(u, m.grade)) return;
    const src = m.path + "?u=" + encodeURIComponent(u.id) + "&m=" + encodeURIComponent(m.id);
    const note = u.role === "student" ? ["Điểm được lưu", "Điểm mỗi lần làm xong được lưu vào hồ sơ của bạn."] : ["Xem thử, không lưu điểm", "Chế độ xem thử: điểm không được lưu."];
    view.innerHTML = `<div class="player">
      <div class="row between">${back("#/home", "Trang chính")}<span class="small muted note" title="${note[1]}">${note[0]}</span></div>
      <iframe id="playerFrame" title="${esc(m.title)}" src="${esc(src)}"></iframe></div>`;
    document.body.classList.add("playing");
    wireGo();
    if (u.role !== "student") return;
    // Bài ôn đang làm một lượt thì có nút #endBtn ("Nộp bài sớm", "Dừng luyện"…), hoặc hộp hỏi lại #yesEnd của nút đó;
    // trang đầu và trang kết quả không có (hợp đồng với bài ôn, xem CLAUDE.md). Khung cùng origin nên app đọc được, không ghi gì.
    // Mở bằng file:// hoặc không đọc được khung thì không hỏi.
    const fr = $("#playerFrame");
    const busy = () => { try { const d = fr.contentDocument; return !!(d && d.querySelector("#endBtn, #yesEnd")); } catch (e) { return false; } };
    guard = { busy, ask: "Rời bài ôn?", note: "Bài đang làm dở sẽ không được lưu.", yes: "Rời bài", no: "Ở lại" };
  }
  window.addEventListener("message", (e) => {
    const fr = $("#playerFrame");
    if (!fr || e.source !== fr.contentWindow) return;
    if (location.origin !== "null" && e.origin !== location.origin) return;
    const d = e.data; if (!d || d.type !== "ontap:result") return;
    const u = Store.sessionUser(); if (!u || u.role !== "student") return;
    const m = modById(d.module); if (!m || m.grade !== u.grade) return;
    if (!(+d.t > 0)) return;
    Store.addResult({ userId: u.id, source: "module", refId: m.id, subject: (m.subjects && m.subjects[d.subject]) || "", label: d.label, mode: d.mode, r: d.r, t: d.t, s: d.s });
    toast(`Đã lưu kết quả: ${+d.r}/${+d.t} câu đúng`);
  });

  /* ================= LÀM BÀI TỪ NGÂN HÀNG ================= */
  let quizRun = null;
  function renderQuiz(u, id) {
    const b = Store.bank(id);
    if (!b) { renderMissing("Không tìm thấy đề", "Đề này không có trong app, hoặc đã được bỏ đi."); return; }
    if (wrongGrade(u, b.grade)) return;
    view.innerHTML = `<div class="stack">${back("#/home", "Trang chính")}
      <section class="hero"><span class="label">Lớp ${b.grade} · ${esc(b.subject)}</span><h1>${esc(b.title)}</h1>
        <p>${b.questions.length} câu.${b.note ? " " + esc(b.note) : ""}</p>
        <div class="row"><button class="btn main" id="qPractice">Ôn luyện (xem đáp án từng câu)</button>${b.minutes ? `<button class="btn ghost" id="qExam">Làm như thi · ${b.minutes} phút</button>` : ""}</div></section>
      ${u.role !== "student" ? `<div class="notice">Chế độ xem thử: điểm không được lưu.</div>` : ""}</div>`;
    wireGo();
    const start = (mode) => {
      const run = (quizRun = Quiz.run(view, b, {
        mode, onExit: () => go("#/home"),
        onFinish: (res) => { if (u.role === "student") { Store.addResult(Object.assign({ userId: u.id, source: "bank", refId: b.id, subject: b.subject, label: b.title }, res)); toast("Đã lưu kết quả"); } }
      }));
      // Xem thử (phụ huynh, quản trị) không lưu điểm nên không cần hỏi.
      // Gọi qua run: "Làm lại" thay busy/answered/submit của lượt mới vào cùng đối tượng.
      // Chưa trả lời câu nào thì rời là thoát đề, không nộp (nộp cũng không lưu điểm).
      if (u.role === "student") guard = {
        busy: () => run.busy(),
        leave: () => (run.answered() ? run.submit() : run.stop()),
        text: () => (!run.answered() ? { ask: "Thoát đề?", note: "Bạn chưa làm câu nào nên không lưu điểm.", yes: "Thoát", no: "Làm tiếp" }
          : run.exam ? { ask: "Nộp bài và rời trang?", note: "Câu chưa làm tính là sai.", yes: "Nộp bài", no: "Làm tiếp" }
          : { ask: "Dừng ôn và rời trang?", note: "Kết quả các câu đã làm được lưu lại.", yes: "Dừng ôn", no: "Ôn tiếp" })
      };
    };
    $("#qPractice").onclick = () => start("practice");
    if ($("#qExam")) $("#qExam").onclick = () => start("exam");
  }

  /* ================= QUẢN TRỊ ================= */
  /* Bản đám mây gọi phần quản trị là "Khu phụ huynh", tab Tài khoản là "Hồ sơ con". */
  const ADMIN_TABS = [["overview", "Tổng quan"], ["users", "Tài khoản"], ["events", "Lịch thi"], ["banks", "Ngân hàng đề"], ["data", "Dữ liệu"]];
  function adminTabs(cur) { return `<div class="tabs" role="group" aria-label="${Store.cloud ? "Mục trong khu phụ huynh" : "Mục quản trị"}">${ADMIN_TABS.map(([k, t]) => `<button data-go="#/admin/${k}" aria-pressed="${k === cur}">${k === "users" && Store.cloud ? "Hồ sơ con" : t}</button>`).join("")}</div>`; }
  const fullMsg = () => `Tài khoản đã có đủ ${(Store.plan() || {}).maxChildren || 0} hồ sơ con theo gói hiện tại.`;
  function renderAdmin(u, tab) {
    if (u.role !== "admin") { go("#/home"); return; }
    tab = ADMIN_TABS.some(([k]) => k === tab) ? tab : "overview";
    const cloud = !!Store.cloud;
    let body = "";
    if (tab === "overview") {
      const studs = Store.users("student"), w7 = within(Store.data().results, 7);
      const addBtn = Store.can("addChild") ? `<a class="btn sm" href="#/admin/user/new?role=student">+ Thêm hồ sơ con</a>` : "";
      body = (cloud ? `<div class="stats"><div class="stat"><b>${studs.length}</b><span>hồ sơ con</span></div><div class="stat"><b>${w7.length}</b><span>bài làm 7 ngày qua</span></div><div class="stat"><b>${new Set(w7.map((r) => r.userId)).size}</b><span>con có ôn 7 ngày qua</span></div></div>
        <section class="sec"><div class="row between"><h2>Con của tôi</h2>${addBtn}</div>${studs.length ? `<div class="list">${studs.map(childCard).join("")}</div>` : `<div class="panel muted">Chưa có hồ sơ con. Bấm “Thêm hồ sơ con”: tên, khối, lớp và mã PIN nếu muốn. Mỗi con chọn hồ sơ của mình ở màn hình “Ai đang học?”.</div>`}</section>`
        : `<div class="stats"><div class="stat"><b>${studs.length}</b><span>học sinh</span></div><div class="stat"><b>${Store.users("parent").length}</b><span>phụ huynh</span></div><div class="stat"><b>${w7.length}</b><span>bài làm 7 ngày qua</span></div></div>
        ${!Store.persistent() ? `<div class="fb bad">Trình duyệt đang chặn lưu dữ liệu. Dữ liệu sẽ mất khi tải lại trang.</div>` : ""}
        ${backupCard()}
        <section class="sec"><h2>Học sinh</h2>${studs.length ? `<div class="list">${studs.map(childCard).join("")}</div>` : `<div class="panel">Chưa có học sinh. <div class="row"><a class="btn main" href="#/admin/user/new?role=student">Thêm học sinh</a></div></div>`}</section>`)
        + (cloud && studs.length ? gradesOf(studs) : gradeList()).map((g) => { const n = nextEvent(g); return n ? `<section class="sec"><h2>Kì thi tiếp theo · ${esc(gradeName(g))}</h2><div class="timeline">${eventRow(n, { grade: g })}</div></section>` : ""; }).join("");
    } else if (tab === "users" && cloud) {
      const us = Store.users("student"), full = !Store.can("addChild");
      body = `<section class="sec"><div class="row between"><h2>Hồ sơ con (${us.length}/${(Store.plan() || {}).maxChildren || 0})</h2>${full ? "" : `<a class="btn sm" href="#/admin/user/new?role=student">+ Thêm</a>`}</div>
        ${us.length ? `<div class="list">${us.map((x) => `<a class="item" href="#/admin/user/${esc(x.id)}" style="color:inherit;text-decoration:none">${avatar(x)}<span class="grow"><b>${esc(x.name)}</b><span class="small muted">${esc(gradeTxt(x))} · ${x.hasPin ? "có mã PIN" : "không có mã PIN"}${esc(lockTag(x))}</span></span><span aria-hidden="true">›</span></a>`).join("")}</div>` : `<div class="panel muted">Chưa có hồ sơ con.</div>`}
        ${full ? `<p class="small muted">${esc(fullMsg())} Xóa bớt hồ sơ không dùng nữa để thêm hồ sơ mới.</p>` : ""}
        <p class="small muted">Mã PIN 4 số giúp anh em không vào nhầm hồ sơ của nhau. Đây không phải mật khẩu: muốn giữ dữ liệu an toàn thì giữ kín mật khẩu của bố mẹ.</p></section>`;
    } else if (tab === "users") {
      const sect = (role, name) => { const us = Store.users(role); return `<section class="sec"><div class="row between"><h2>${name} (${us.length})</h2><a class="btn sm" href="#/admin/user/new?role=${role}">+ Thêm</a></div>${us.length ? `<div class="list">${us.map((x) => `<a class="item" href="#/admin/user/${esc(x.id)}" style="color:inherit;text-decoration:none">${avatar(x)}<span class="grow"><b>${esc(x.name)}</b><span class="small muted">${esc(gradeTxt(x))}${role === "student" ? " · Phụ huynh: " + esc((x.parentIds || []).map((p) => (Store.user(p) || {}).name).filter(Boolean).join(", ") || "chưa gắn") : role === "parent" ? " · Con: " + esc(Store.childrenOf(x.id).map((c) => c.name).join(", ") || "chưa gắn") : ""}</span></span><span aria-hidden="true">›</span></a>`).join("")}</div>` : `<div class="panel muted">Chưa có.</div>`}</section>`; };
      body = sect("student", "Học sinh") + sect("parent", "Phụ huynh") + sect("admin", "Quản trị");
    } else if (tab === "events") {
      body = `<div class="row between"><p class="muted small" style="flex:1">Sửa ngày khi trường thông báo, gắn bài ôn vào từng kì thi.</p><a class="btn main sm" href="#/admin/event/new">+ Thêm kì thi</a></div>
        <div class="list">${Store.events().map((e) => `<a class="item" href="#/admin/event/${esc(e.id)}" style="color:inherit;text-decoration:none"><span class="grow"><b>${esc(e.title)} · Lớp ${esc(e.grades.join(", "))}</b><span class="small muted">${esc(range(e))}${e.tentative && e.start ? " · dự kiến" : ""} · ${(e.modules || []).length + (e.banks || []).length} bài ôn</span></span><span aria-hidden="true">›</span></a>`).join("")}</div>
        <div class="row"><button class="btn ghost sm" id="resetEv">Khôi phục lịch mặc định</button></div><div id="resetArea"></div>`;
    } else if (tab === "banks") {
      body = `<div class="row between"><p class="muted small" style="flex:1">Dán câu hỏi từ Word, Zalo, sách bài tập. App tự nhận dạng trắc nghiệm, điền khuyết, đúng/sai.</p><a class="btn main sm" href="#/admin/bank/new">+ Nhập ngân hàng</a></div>
        <div class="list">${Store.banks().map((b) => `<a class="item" href="#/${b.seed ? "quiz" : "admin/bank"}/${esc(b.id)}" style="color:inherit;text-decoration:none"><span class="grow"><b>${esc(b.title)}</b><span class="small muted">Lớp ${b.grade} · ${esc(b.subject)} · ${b.questions.length} câu${b.seed ? " · có sẵn (chỉ xem)" : ""}</span></span><span aria-hidden="true">›</span></a>`).join("")}</div>`;
    } else if (tab === "data" && cloud) {
      const st = Store.settings(), loc = Store.localData(), mig = Store.migratedAt();
      const kids = loc ? loc.users.filter((x) => x.role === "student").length : 0;
      body = `<section class="panel"><h3>Thông tin chung</h3><div class="form">
          <label class="field"><span>Tên gia đình</span><input id="dSchool" value="${esc(st.schoolName || "")}" maxlength="80" placeholder="Ví dụ: Nhà Bin"></label>
          <label class="field"><span>Năm học</span><input id="dYear" value="${esc(st.schoolYear || "")}" maxlength="20"></label></div>
          <div class="row"><button class="btn sm" id="dSave">Lưu</button></div></section>
        <section class="panel" id="migBox"><h3>Chuyển dữ liệu máy này lên đám mây</h3>
          ${loc ? `<p class="small">Trình duyệt này còn dữ liệu của bản lưu trên máy: ${kids} học sinh, ${(loc.results || []).length} kết quả.${mig ? ` Đã chuyển lần gần nhất: ${esc(ago(mig))}.` : ""}</p>`
            : `<p class="small">Trình duyệt này không có dữ liệu cũ. Nếu dữ liệu nằm ở máy khác: đăng nhập tài khoản này trên máy đó rồi bấm nút chuyển ở đó; hoặc chọn file sao lưu đã tải từ bản lưu trên máy.</p>`}
          <p class="small">Trên iPhone, iPad: hãy chuyển trong Safari, nơi đang có dữ liệu, trước khi dùng app ở Màn hình chính.</p>
          <p class="small muted">Mỗi học sinh thành một hồ sơ con, giữ mã PIN cũ, kết quả và tiến độ bài ôn; lịch thi và ngân hàng đề tự nhập cũng được chuyển. Tài khoản quản trị, phụ huynh của bản trên máy không cần chuyển. Chuyển lại nhiều lần không bị trùng.</p>
          <div class="row"><button class="btn main sm" id="dMigrate" ${loc ? "" : "disabled"}>Chuyển dữ liệu máy này lên đám mây</button><label class="btn ghost sm" for="dMigFile">Chuyển từ file sao lưu</label><input type="file" id="dMigFile" accept=".json,application/json" hidden></div>
          <div id="migRes" aria-live="polite"></div></section>
        <section class="panel"><h3>Sao lưu</h3><p class="small">Tải bản sao dữ liệu trên đám mây về máy (không chứa mã PIN).</p>
          <div class="row"><button class="btn sm" id="dExport">Tải file sao lưu</button></div></section>`;
    } else if (tab === "data") {
      const st = Store.settings();
      body = `<section class="panel"><h3>Thông tin chung</h3><div class="form">
          <label class="field"><span>Tên trường hoặc gia đình</span><input id="dSchool" value="${esc(st.schoolName || "")}"></label>
          <label class="field"><span>Năm học</span><input id="dYear" value="${esc(st.schoolYear || "")}"></label></div>
          <div class="row"><button class="btn sm" id="dSave">Lưu</button></div></section>
        <section class="panel"><h3>Sao lưu và chuyển máy</h3>
          <p class="small">Dữ liệu đang nằm trên trình duyệt của máy này. Tải file sao lưu mỗi tuần; muốn dùng trên máy khác thì mở app ở máy đó và chọn “Khôi phục từ file”.</p>
          <p class="small" id="dLast">${lastBackupTxt()}</p>
          <div class="row"><button class="btn main sm" id="dExport">Tải file sao lưu</button><label class="btn ghost sm" for="dImport">Khôi phục từ file</label><input type="file" id="dImport" accept=".json,application/json" hidden></div></section>
        <section class="panel" id="homeScreen"><h3>Thêm vào Màn hình chính</h3>
          ${standalone() ? `<div class="fb ok">Máy này đang mở app từ Màn hình chính.</div>` : ""}
          <p class="small">App có biểu tượng riêng như một ứng dụng, mở được cả khi mất mạng. Trên iPhone, iPad, Safari có thể xóa dữ liệu của trang không được mở trong 7 ngày; app đã thêm vào Màn hình chính thì không bị xóa.</p>
          <p class="small"><b>Trên iPhone, iPad, app ở Màn hình chính không dùng chung dữ liệu với Safari.</b> Đã dùng trong Safari thì chuyển sang như sau:</p>
          <ol class="tips small"><li>Trong Safari, bấm “Tải file sao lưu” ở trên, cất file vào Tệp hoặc Zalo.</li>
            <li>Bấm nút Chia sẻ (ô vuông có mũi tên lên) → “Thêm vào MH chính”.</li>
            <li>Mở app từ biểu tượng mới, chọn “Khôi phục từ file sao lưu”.</li>
            <li>Từ đó chỉ dùng app ở Màn hình chính.</li></ol>
          <p class="small"><b>Android (Chrome):</b> menu ⋮ → “Thêm vào màn hình chính” (có máy ghi “Cài đặt ứng dụng”). Dùng chung dữ liệu với Chrome, không cần chuyển.</p></section>
        <section class="panel"><h3>Xóa toàn bộ dữ liệu</h3><p class="small">Xóa mọi tài khoản, kết quả và lịch đã sửa trên máy này. Không hoàn tác được.</p>
          <div class="row"><button class="btn danger sm" id="dWipe">Xóa toàn bộ…</button></div><div id="wipeArea"></div></section>`;
    }
    view.innerHTML = `<div class="stack"><div class="row between"><div><h2>${cloud ? "Khu phụ huynh" : "Quản trị"}</h2><span class="muted">${esc(Store.settings().schoolName || "")}</span></div>${cloud ? `<button class="btn ghost sm" id="switchWho">Đổi người học</button>` : ""}</div>${adminTabs(tab)}${body}</div>`;
    wireGo();
    wireBackupCard();
    $$("[data-child]").forEach((b) => (b.onclick = () => go("#/child/" + b.dataset.child)));
    wireEvents(view, null, null);
    if ($("#switchWho")) $("#switchWho").onclick = switchWho;
    if (tab === "events") $("#resetEv").onclick = () => {
      $("#resetArea").innerHTML = `<div class="confirm"><div>Chép lại lịch thi gốc? Các kì thi bạn đã thêm hoặc sửa sẽ bị thay thế.</div><div class="row"><button class="btn danger sm" id="rsYes">Khôi phục</button><button class="btn ghost sm" id="rsNo">Thôi</button></div></div>`;
      $("#rsYes").onclick = () => { Store.resetEvents(); toast("Đã khôi phục lịch mặc định"); renderAdmin(u, "events"); };
      $("#rsNo").onclick = () => ($("#resetArea").innerHTML = "");
    };
    if (tab === "data") {
      $("#dSave").onclick = () => { Store.setSettings({ schoolName: $("#dSchool").value.trim(), schoolYear: $("#dYear").value.trim() }); toast("Đã lưu"); };
      $("#dExport").onclick = () => backupNow().then((how) => { if (how && $("#dLast")) $("#dLast").textContent = lastBackupTxt(); });
      if ($("#dImport")) $("#dImport").onchange = (e) => importFile(e.target.files[0], () => go("#/"));
      if (cloud) wireCloudData();
      if ($("#dWipe")) $("#dWipe").onclick = () => {
        $("#wipeArea").innerHTML = `<div class="confirm"><label class="field"><span>Gõ XOA để xác nhận</span><input id="wipeTxt" autocomplete="off"></label><div class="row"><button class="btn danger sm" id="wipeYes">Xóa hết</button><button class="btn ghost sm" id="wipeNo">Thôi</button></div></div>`;
        $("#wipeYes").onclick = () => { if ($("#wipeTxt").value.trim().toUpperCase() !== "XOA") { toast("Gõ đúng chữ XOA"); return; } Store.wipe(); go("#/"); };
        $("#wipeNo").onclick = () => ($("#wipeArea").innerHTML = "");
      };
    }
  }

  /* Bản đám mây: về màn hình "Ai đang học?" (không đăng xuất tài khoản gia đình). */
  function switchWho() {
    if (!Store.users("student").length) { toast("Chưa có hồ sơ con. Thêm hồ sơ con trước nhé."); return; }
    Store.setSession(null); go("#/");
  }
  function wireCloudData() {
    const doMig = async (data) => {
      const btn = $("#dMigrate"); btn.disabled = true;
      $("#migRes").innerHTML = `<p class="muted small">Đang chuyển…</p>`;
      try {
        const res = await Store.migrate(data);
        $("#migRes").innerHTML = `<div class="fb ok">Đã chuyển lên đám mây: ${+res.profiles || 0} hồ sơ con mới, ${+res.results || 0} kết quả.</div>`;
        toast("Đã chuyển dữ liệu lên đám mây");
      } catch (e) { $("#migRes").innerHTML = `<div class="fb bad">${esc(e.message)}</div>`; }
      btn.disabled = !Store.localData();
    };
    $("#dMigrate").onclick = () => doMig(Store.localData());
    $("#dMigFile").onchange = (e) => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => { let d; try { d = JSON.parse(r.result); } catch (er) { toast("File không đúng định dạng JSON."); return; } doMig(d); };
      r.readAsText(f, "utf-8"); e.target.value = "";
    };
  }

  /* -------- sửa tài khoản -------- */
  function renderUserForm(viewer, id, query) {
    const isAdmin = viewer.role === "admin", cloud = !!Store.cloud;
    const editing = id !== "new" ? Store.user(id) : null;
    if (id !== "new" && !editing) { go("#/home"); return; }
    if (!isAdmin) {
      const ok = viewer.role === "parent" && (id === "new" ? query.role === "student" : editing.role === "student" && (editing.parentIds || []).includes(viewer.id));
      if (!ok) { go("#/home"); return; }
    }
    // Bản đám mây chỉ có hồ sơ con; tài khoản của bố mẹ do chủ app quản lý (đổi mật khẩu ở trang Tài khoản).
    if (cloud && editing && editing.role !== "student") { go("#/account"); return; }
    const role = cloud ? "student" : editing ? editing.role : (Store.ROLES[query.role] ? query.role : "student");
    let emo = editing ? editing.avatar : role === "student" ? "🐣" : role === "parent" ? "🌻" : "🧭";
    const parents = Store.users("parent"), studs = Store.users("student");
    const backTo = isAdmin ? "#/admin/users" : editing ? "#/child/" + editing.id : "#/home";
    const full = cloud && !editing && !Store.can("addChild");
    const title = cloud ? (editing ? "Sửa hồ sơ con" : "Thêm hồ sơ con") : editing ? "Sửa tài khoản" : "Thêm " + Store.ROLES[role].toLowerCase();
    const pinLabel = cloud ? (editing && editing.hasPin ? "Mã PIN mới, 4 số (để trống nếu giữ nguyên)" : "Mã PIN 4 số (không bắt buộc)")
      : editing ? "Mã PIN mới (để trống nếu giữ nguyên)" : "Mã PIN (4–6 chữ số)";
    view.innerHTML = `<div class="stack">${back(backTo)}
      <h2>${title}</h2>
      ${full ? `<div class="fb bad">${esc(fullMsg())}</div>` : ""}
      <form class="panel" id="uForm" autocomplete="off"><div class="form">
        <label class="field"><span>Tên hiển thị</span><input id="uName" value="${esc(editing ? editing.name : "")}" required maxlength="40" placeholder="${role === "student" ? "Ví dụ: Bin, Minh Anh" : "Ví dụ: Mẹ Bin"}"></label>
        <label class="field"><span>${pinLabel}</span><input id="uPin" type="password" inputmode="numeric" maxlength="${cloud ? 4 : 6}" ${editing || cloud ? "" : "required"}></label>
        ${role === "student" ? `<label class="field"><span>Khối</span><select id="uGrade">${gradeOptions(editing ? editing.grade : null)}</select></label>
          <label class="field"><span>Lớp (không bắt buộc)</span><input id="uClass" value="${esc(editing ? editing.className || "" : "")}" placeholder="Ví dụ: 4A"></label>` : ""}
        ${cloud && editing && editing.hasPin ? `<div class="field full"><div class="checks"><label><input type="checkbox" id="uNoPin">Bỏ mã PIN (con bấm vào hồ sơ là vào)</label></div></div>` : ""}
        <div class="field full"><span>Hình đại diện</span>${emojiPicker(emo)}</div>
        ${isAdmin && !cloud && role === "student" ? `<div class="field full"><span>Phụ huynh</span>${parents.length ? `<div class="checks">${parents.map((p) => `<label><input type="checkbox" name="par" value="${esc(p.id)}" ${editing && (editing.parentIds || []).includes(p.id) ? "checked" : ""}>${esc(p.name)}</label>`).join("")}</div>` : `<span class="small muted">Chưa có tài khoản phụ huynh.</span>`}</div>` : ""}
        ${isAdmin && role === "parent" ? `<div class="field full"><span>Con</span>${studs.length ? `<div class="checks">${studs.map((s) => `<label><input type="checkbox" name="kid" value="${esc(s.id)}" ${editing && (s.parentIds || []).includes(editing.id) ? "checked" : ""}>${esc(s.name)} (lớp ${s.grade})</label>`).join("")}</div>` : `<span class="small muted">Chưa có tài khoản học sinh.</span>`}</div>` : ""}
      </div>${cloud ? `<p class="small muted">Mã PIN chỉ để anh em không vào nhầm hồ sơ của nhau, không phải mật khẩu.</p>` : ""}<div id="uErr"></div>
      <div class="row"><button class="btn main" type="submit" ${full ? "disabled" : ""}>${editing ? "Lưu" : cloud ? "Tạo hồ sơ" : "Tạo tài khoản"}</button>${editing && (isAdmin || role === "student") && editing.id !== viewer.id ? `<button class="btn danger" type="button" id="uDel">${cloud ? "Xóa hồ sơ" : "Xóa tài khoản"}</button>` : ""}</div>
      <div id="uDelArea"></div></form></div>`;
    wireGo(); wireEmoji(view, (e) => (emo = e));
    $("#uForm").onsubmit = async (ev) => {
      ev.preventDefault();
      const data = { name: $("#uName").value, pin: $("#uPin").value.trim(), avatar: emo, noPin: !!($("#uNoPin") && $("#uNoPin").checked) };
      if (role === "student") { data.grade = +$("#uGrade").value; data.className = $("#uClass").value; }
      if (isAdmin && !cloud && role === "student") data.parentIds = $$("input[name=par]:checked").map((x) => x.value);
      try {
        let saved;
        if (editing) {
          saved = await Store.updateUser(editing.id, data);
          if (data.pin || data.noPin) PinLock.clear(editing.id); // đặt PIN mới thì không phải đợi nữa
        } else {
          if (!isAdmin) data.parentIds = [viewer.id];
          saved = await Store.createUser(Object.assign({ role }, data));
        }
        if (isAdmin && role === "parent") {
          const kids = new Set($$("input[name=kid]:checked").map((x) => x.value));
          for (const s of Store.users("student")) {
            const has = (s.parentIds || []).includes(saved.id);
            if (kids.has(s.id) && !has) await Store.updateUser(s.id, { parentIds: (s.parentIds || []).concat(saved.id) });
            if (!kids.has(s.id) && has) await Store.updateUser(s.id, { parentIds: s.parentIds.filter((p) => p !== saved.id) });
          }
        }
        toast(editing ? "Đã lưu" : (cloud ? "Đã tạo hồ sơ " : "Đã tạo tài khoản ") + saved.name);
        go(isAdmin ? "#/admin/users" : "#/home");
      } catch (e) { $("#uErr").innerHTML = `<div class="fb bad">${esc(e.message)}</div>`; }
    };
    if ($("#uDel")) $("#uDel").onclick = () => {
      $("#uDelArea").innerHTML = `<div class="confirm"><div>Xóa ${cloud ? "hồ sơ" : "tài khoản"} ${esc(editing.name)}? Mọi kết quả của ${cloud ? "hồ sơ" : "tài khoản"} này cũng bị xóa.</div><div class="row"><button class="btn danger sm" type="button" id="dYes">Xóa</button><button class="btn ghost sm" type="button" id="dNo">Thôi</button></div></div>`;
      $("#dYes").onclick = () => { try { Store.removeUser(editing.id); toast("Đã xóa"); go(isAdmin ? "#/admin/users" : "#/home"); } catch (e) { toast(e.message); } };
      $("#dNo").onclick = () => ($("#uDelArea").innerHTML = "");
    };
  }

  /* -------- sửa kì thi -------- */
  function renderEventForm(u, id) {
    if (u.role !== "admin") { go("#/home"); return; }
    const e = id === "new" ? { id: "", title: "", kind: "dinh-ki", grades: gradeList().slice(0, 1), start: "", end: "", tentative: true, subjects: [], scope: "", note: "", modules: [], banks: [] } : Store.event(id);
    if (!e) { go("#/admin/events"); return; }
    view.innerHTML = `<div class="stack">${back("#/admin/events", "Lịch thi")}
      <h2>${id === "new" ? "Thêm kì thi" : "Sửa kì thi"}</h2>
      <form class="panel" id="eForm" autocomplete="off"><div class="form">
        <label class="field full"><span>Tên kì thi</span><input id="eTitle" value="${esc(e.title)}" required placeholder="Ví dụ: Kiểm tra cuối học kì I"></label>
        <label class="field"><span>Loại</span><select id="eKind">${Object.entries(KIND).map(([k, t]) => `<option value="${k}" ${e.kind === k ? "selected" : ""}>${t}</option>`).join("")}</select></label>
        <div class="field"><span>Khối</span><div class="checks">${gradeList(e.grades).map((g) => `<label><input type="checkbox" name="eg" value="${g}" ${e.grades.includes(g) ? "checked" : ""}>${esc(gradeName(g))}</label>`).join("")}</div></div>
        <label class="field"><span>Từ ngày (để trống nếu chưa có lịch)</span><input type="date" id="eStart" value="${esc(e.start || "")}"></label>
        <label class="field"><span>Đến ngày</span><input type="date" id="eEnd" value="${esc(e.end || "")}"></label>
        <div class="field full"><div class="checks"><label><input type="checkbox" id="eTent" ${e.tentative ? "checked" : ""}>Ngày dự kiến (chưa có thông báo chính thức)</label></div></div>
        <label class="field full"><span>Môn thi (cách nhau bằng dấu phẩy)</span><input id="eSubj" value="${esc((e.subjects || []).join(", "))}"></label>
        <label class="field full"><span>Phạm vi kiến thức</span><input id="eScope" value="${esc(e.scope || "")}"></label>
        <label class="field full"><span>Ghi chú</span><input id="eNote" value="${esc(e.note || "")}"></label>
        <div class="field full"><span>Bài ôn gắn với kì thi</span><div class="checks">${MODULES.map((m) => `<label><input type="checkbox" name="em" value="${m.id}" ${(e.modules || []).includes(m.id) ? "checked" : ""}>${esc(m.title)}</label>`).join("")}</div></div>
        <div class="field full"><span>Ngân hàng câu hỏi</span><div class="checks">${Store.banks().map((b) => `<label><input type="checkbox" name="eb" value="${esc(b.id)}" ${(e.banks || []).includes(b.id) ? "checked" : ""}>${esc(b.title)}</label>`).join("") || `<span class="small muted">Chưa có.</span>`}</div></div>
      </div><div id="eErr"></div>
      <div class="row"><button class="btn main" type="submit">Lưu</button>${id !== "new" ? `<button class="btn danger" type="button" id="eDel">Xóa kì thi</button>` : ""}</div><div id="eDelArea"></div></form></div>`;
    wireGo();
    $("#eForm").onsubmit = (ev) => {
      ev.preventDefault();
      try {
        Store.upsertEvent({
          id: e.id, title: $("#eTitle").value, kind: $("#eKind").value, grades: $$("input[name=eg]:checked").map((x) => +x.value),
          start: $("#eStart").value || null, end: $("#eEnd").value || null, tentative: $("#eTent").checked,
          subjects: $("#eSubj").value.split(",").map((s) => s.trim()).filter(Boolean), scope: $("#eScope").value.trim(), note: $("#eNote").value.trim(),
          modules: $$("input[name=em]:checked").map((x) => x.value), banks: $$("input[name=eb]:checked").map((x) => x.value)
        });
        toast("Đã lưu kì thi"); go("#/admin/events");
      } catch (err) { $("#eErr").innerHTML = `<div class="fb bad">${esc(err.message)}</div>`; }
    };
    if ($("#eDel")) $("#eDel").onclick = () => {
      $("#eDelArea").innerHTML = `<div class="confirm"><div>Xóa “${esc(e.title)}” khỏi lịch?</div><div class="row"><button class="btn danger sm" type="button" id="edYes">Xóa</button><button class="btn ghost sm" type="button" id="edNo">Thôi</button></div></div>`;
      $("#edYes").onclick = () => { Store.removeEvent(e.id); toast("Đã xóa"); go("#/admin/events"); };
      $("#edNo").onclick = () => ($("#eDelArea").innerHTML = "");
    };
  }

  /* -------- nhập ngân hàng câu hỏi -------- */
  const BANK_SAMPLE = `# Phép cộng
345 678 + 254 322 = ?
* 600 000
- 590 000
- 599 990
> Cộng từ phải sang trái, nhớ sang hàng bên trái.

1 000 000 − 456 789 = [543211|543 211]

# Hình học
Đúng: Hai đường thẳng song song thì không bao giờ cắt nhau.

Sai: Hình thoi có bốn góc vuông.`;
  function renderBankForm(u, id) {
    if (u.role !== "admin") { go("#/home"); return; }
    const b = id === "new" ? { id: "", title: "", grade: gradeList()[0], subject: "", minutes: 20, note: "", src: "" } : Store.bank(id);
    if (!b || b.seed) { go("#/admin/banks"); return; }
    view.innerHTML = `<div class="stack">${back("#/admin/banks", "Ngân hàng đề")}
      <h2>${id === "new" ? "Nhập ngân hàng câu hỏi" : "Sửa ngân hàng câu hỏi"}</h2>
      <form class="panel" id="bForm" autocomplete="off"><div class="form">
        <label class="field full"><span>Tên</span><input id="bTitle" value="${esc(b.title)}" required placeholder="Ví dụ: Toán 4 · Đề ôn cuối kì I số 1"></label>
        <label class="field"><span>Khối</span><select id="bGrade">${gradeOptions(b.grade)}</select></label>
        <label class="field"><span>Môn</span><input id="bSubj" value="${esc(b.subject)}" placeholder="Toán, Tiếng Việt, Tiếng Anh…"></label>
        <label class="field"><span>Thời gian khi làm như thi (phút, 0 = không tính giờ)</span><input id="bMin" type="number" min="0" max="180" value="${+b.minutes || 0}"></label>
        <label class="field full"><span>Ghi chú</span><input id="bNote" value="${esc(b.note || "")}"></label>
      </div>
      <details class="small"><summary><b>Cách viết câu hỏi</b></summary><pre style="white-space:pre-wrap;margin:8px 0 0">Mỗi câu cách nhau một dòng trống.
# Tên chủ đề          → các câu bên dưới thuộc chủ đề này
* đáp án đúng / - đáp án sai   → trắc nghiệm
Câu có [đáp án]        → điền vào chỗ trống, nhiều đáp án: [a|b]
Đúng: … hoặc Sai: …    → câu đúng/sai
> giải thích           → hiện sau khi trả lời</pre></details>
      <textarea id="bSrc" spellcheck="false" aria-label="Câu hỏi" placeholder="Dán câu hỏi vào đây…">${esc(b.src || "")}</textarea>
      <div class="row"><button class="btn ghost sm" type="button" id="bSample">Xem ví dụ</button><label class="btn ghost sm" for="bFile">Mở file .txt</label><input type="file" id="bFile" accept=".txt,text/plain" hidden><button class="btn sm" type="button" id="bCheck">Kiểm tra</button></div>
      <div id="bRes"></div>
      <div class="row"><button class="btn main" type="submit">Lưu ngân hàng</button>${id !== "new" ? `<button class="btn danger" type="button" id="bDel">Xóa</button>` : ""}</div><div id="bDelArea"></div></form></div>`;
    wireGo();
    const check = () => {
      const { questions, errors } = Quiz.parse($("#bSrc").value), c = (t) => questions.filter((q) => q.type === t).length;
      $("#bRes").innerHTML = `<div class="${errors.length ? "notice" : "fb ok"}">Nhận được ${questions.length} câu: ${c("mc")} trắc nghiệm, ${c("fill")} điền khuyết, ${c("tf")} đúng/sai.${errors.length ? "<br>" + errors.map(esc).join("<br>") : ""}</div>`;
      return questions;
    };
    $("#bSample").onclick = () => { $("#bSrc").value = BANK_SAMPLE; check(); };
    $("#bCheck").onclick = check;
    $("#bFile").onchange = (ev) => { const f = ev.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { $("#bSrc").value = r.result; check(); }; r.readAsText(f, "utf-8"); };
    $("#bForm").onsubmit = (ev) => {
      ev.preventDefault();
      const qs = check();
      try {
        Store.upsertBank({ id: b.id, title: $("#bTitle").value, grade: +$("#bGrade").value, subject: $("#bSubj").value.trim(), minutes: +$("#bMin").value || 0, note: $("#bNote").value.trim(), questions: qs, src: $("#bSrc").value });
        toast("Đã lưu. Vào Lịch thi để gắn ngân hàng này vào kì thi."); go("#/admin/banks");
      } catch (err) { $("#bRes").innerHTML = `<div class="fb bad">${esc(err.message)}</div>`; }
    };
    if ($("#bDel")) $("#bDel").onclick = () => {
      $("#bDelArea").innerHTML = `<div class="confirm"><div>Xóa ngân hàng “${esc(b.title)}”?</div><div class="row"><button class="btn danger sm" type="button" id="bdYes">Xóa</button><button class="btn ghost sm" type="button" id="bdNo">Thôi</button></div></div>`;
      $("#bdYes").onclick = () => { Store.removeBank(b.id); toast("Đã xóa"); go("#/admin/banks"); };
      $("#bdNo").onclick = () => ($("#bDelArea").innerHTML = "");
    };
  }

  /* -------- tài khoản của tôi -------- */
  function renderAccount(u) {
    if (Store.cloud) return renderCloudAccount(u);
    let emo = u.avatar;
    view.innerHTML = `<div class="stack">${back("#/home", "Trang chính")}
      <div class="row">${avatar(u, true)}<div><h2>${esc(u.name)}</h2><span class="muted">${esc(gradeTxt(u))}</span></div></div>
      <form class="panel" id="aForm" autocomplete="off"><h3>Đổi hình đại diện hoặc mã PIN</h3>
        ${emojiPicker(emo)}
        <div class="form"><label class="field"><span>Mã PIN hiện tại</span><input id="aOld" type="password" inputmode="numeric" maxlength="6"></label>
        <label class="field"><span>Mã PIN mới</span><input id="aNew" type="password" inputmode="numeric" maxlength="6"></label></div>
        <div id="aErr"></div><div class="row"><button class="btn sm" type="submit">Lưu</button></div></form>
      <div class="row"><button class="btn main" id="logout">Đăng xuất</button></div></div>`;
    wireGo(); wireEmoji(view, (e) => (emo = e));
    $("#aForm").onsubmit = async (ev) => {
      ev.preventDefault();
      const nw = $("#aNew").value.trim(), old = $("#aOld").value.trim();
      try {
        if (nw) { if (!(await Store.checkPin(u.id, old))) throw new Error("Mã PIN hiện tại chưa đúng."); }
        await Store.updateUser(u.id, { avatar: emo, pin: nw || null });
        toast("Đã lưu"); renderAccount(Store.user(u.id)); drawWho(Store.user(u.id));
      } catch (e) { $("#aErr").innerHTML = `<div class="fb bad">${esc(e.message)}</div>`; }
    };
    $("#logout").onclick = () => { Store.setSession(null); go("#/"); };
  }
  /* Bản đám mây. Phụ huynh: tên đăng nhập, đổi mật khẩu, đổi người học, đăng xuất khỏi máy này.
     Hồ sơ con: đổi hình đại diện, đổi người học (PIN do bố mẹ đặt trong khu phụ huynh; con không đăng xuất được tài khoản). */
  function renderCloudAccount(u) {
    const adult = u.role !== "student";
    let emo = u.avatar;
    view.innerHTML = `<div class="stack">${back("#/home", adult ? "Khu phụ huynh" : "Trang chính")}
      <div class="row">${avatar(u, true)}<div><h2>${esc(u.name)}</h2><span class="muted">${adult ? "Tên đăng nhập: " + esc(Store.username()) : esc(gradeTxt(u))}</span></div></div>
      ${adult ? `<form class="panel" id="pwForm" autocomplete="on"><h3>Đổi mật khẩu</h3><div class="form">${pwFields(true)}</div>
          <div class="row"><button class="btn sm" type="submit">Đổi mật khẩu</button></div></form>`
        : `<form class="panel" id="aForm" autocomplete="off"><h3>Đổi hình đại diện</h3>${emojiPicker(emo)}
          <div id="aErr"></div><div class="row"><button class="btn sm" type="submit">Lưu</button></div></form>`}
      <div class="row"><button class="btn main" id="switchWho">Đổi người học</button>${adult ? `<button class="btn ghost" id="signOut">Đăng xuất khỏi máy này</button>` : ""}</div>
      ${adult ? `<p class="small muted">Con dùng máy này hằng ngày thì chỉ cần “Đổi người học”. Đăng xuất thì lần sau phải nhập lại tên đăng nhập và mật khẩu.</p>` : ""}</div>`;
    wireGo();
    $("#switchWho").onclick = switchWho;
    if (adult) {
      wirePwForm($("#pwForm"), true, () => { toast("Đã đổi mật khẩu"); renderCloudAccount(u); });
      $("#signOut").onclick = async () => { await Store.signOut(); go("#/"); };
      return;
    }
    wireEmoji(view, (e) => (emo = e));
    $("#aForm").onsubmit = async (ev) => {
      ev.preventDefault();
      try { await Store.updateUser(u.id, { avatar: emo }); toast("Đã lưu"); renderCloudAccount(Store.user(u.id)); drawWho(Store.user(u.id)); }
      catch (e) { $("#aErr").innerHTML = `<div class="fb bad">${esc(e.message)}</div>`; }
    };
  }

  /* ================= ĐỊNH TUYẾN ================= */
  function route() {
    if (quizRun) { quizRun.stop(); quizRun = null; }
    guard = null; closeLeave(); shownHash = location.hash;
    document.body.classList.remove("playing");
    foot.hidden = true;
    const old = $("#evDetail"); if (old) old.remove();
    document.title = TITLE;
    if (Store.cloud) {
      const st = Store.authState();
      if (st === "signed-out") { renderCloudLogin(); return; }
      if (st === "change-password") { renderNewPassword(); return; }
      if (st !== "ready") { renderCloudBlocked(st); return; }
    } else if (!Store.isReady() && !Store.load()) { renderSetup(); return; }
    const u = Store.sessionUser();
    if (!u) { renderLogin(); return; }
    drawWho(u);
    const raw = (location.hash || "#/").slice(1), [path, qs] = raw.split("?");
    const query = {}; (qs || "").split("&").filter(Boolean).forEach((p) => { const [k, v] = p.split("="); query[decodeURIComponent(k)] = decodeURIComponent(v || ""); });
    const parts = path.split("/").filter(Boolean);
    const [name, a, b] = parts;
    window.scrollTo(0, 0);
    // Chú thích lịch thi cuối trang chỉ ở trang chủ (của quản trị là tab Tổng quan) và trang Lịch thi.
    foot.hidden = !(name === undefined || name === "home" || name === "calendar" || (name === "admin" && (!a || a === "overview")));
    switch (name) {
      case "calendar": return renderCalendar(u);
      case "play": return renderPlay(u, a);
      case "quiz": return renderQuiz(u, a);
      case "account": return renderAccount(u);
      case "child":
      case "report": {
        const c = Store.user(a);
        const allowed = c && c.role === "student" && (u.role === "admin" || (u.role === "parent" && (c.parentIds || []).includes(u.id)));
        if (!allowed) { go("#/home"); return; }
        return name === "report" ? renderReport(c) : renderStudent(c, u, true);
      }
      case "admin":
        if (a === "user") return renderUserForm(u, b || "new", query);
        if (u.role !== "admin") { go("#/home"); return; }
        if (a === "event") return renderEventForm(u, b || "new");
        if (a === "bank") return renderBankForm(u, b || "new");
        if (a && !ADMIN_TABS.some(([k]) => k === a)) return notFound();
        return renderAdmin(u, a);
      case undefined:
      case "home": return renderHome(u);
      default: return notFound();
    }
  }
  let booted = false;
  window.addEventListener("hashchange", () => {
    if (!booted) return;
    if (guardOn()) {
      const to = location.hash;
      if (to === shownHash) return;
      let pushed = true;
      try { history.pushState(null, "", shownHash); } catch (e) { pushed = false; }
      askLeave(to, pushed);
      return;
    }
    route();
  });
  if (Store.cloud) {
    // Đang nhập liệu thì không vẽ lại màn hình khi dữ liệu trên máy chủ thay đổi.
    const calm = () => !/^\/(play|quiz|account)|^\/admin\/(user|event|bank|data)/.test((location.hash || "#/").slice(1));
    Store.onError = toast;
    Store.onChange = () => { if (booted && calm()) route(); };
    view.innerHTML = `<div class="panel muted" role="status">Đang tải dữ liệu…</div>`;
    Store.init().then(() => { booted = true; route(); }, (e) => {
      view.innerHTML = `<div class="stack"><div class="fb bad">${esc((e && e.message) || "Không kết nối được máy chủ.")}</div><div class="row"><button class="btn main" id="retry">Tải lại trang</button></div></div>`;
      $("#retry").onclick = () => location.reload();
    });
    let lastRefresh = Date.now();
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState !== "visible" || !booted || Date.now() - lastRefresh < 60000) return;
      lastRefresh = Date.now();
      Store.refresh().then((ok) => { if (ok && calm()) route(); }, () => {});
    });
  } else {
    booted = true;
    Store.load();
    route();
  }
  /* Service worker (sw.js): đệm sẵn các file để mở lại được app khi mất mạng. Chỉ chạy trên https hoặc localhost;
     mở bằng file:// thì bỏ qua. Đăng kí sau khi trang tải xong để không tranh mạng với lần mở đầu. */
  try {
    if (location.protocol !== "file:" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
    }
  } catch (e) { /* trình duyệt chặn service worker: app vẫn chạy khi có mạng */ }
})();
