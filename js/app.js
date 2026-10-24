/* App chính: đăng nhập, trang chủ theo vai trò, lịch thi cả năm, mở bài ôn, quản trị.
   Định tuyến bằng hash: #/home, #/practice (học sinh: tab Bài ôn), #/results (học sinh: tab Kết quả), #/calendar,
   #/play/<mã bài>, #/quiz/<mã ngân hàng>, #/child/<mã học sinh> (= #/report/<mã>: báo cáo tuần của con), #/child/<mã>/practice,
   #/admin/<tab>, #/admin/event/<mã|new>, #/admin/user/<mã|new>, #/admin/bank/<mã|new>, #/account.
   Học sinh có thanh tab dưới màn hình (Hôm nay · Bài ôn · Lịch thi · Kết quả, Phiên UX1; drawTabs).
   Bản đám mây (Store.cloud, xem js/store-supabase.js): đăng nhập tên đăng nhập + mật khẩu → "Ai đang học?" (hồ sơ con
   hoặc Phụ huynh). Phụ huynh là người dùng vai trò "admin" của app nên dùng chung các màn hình quản trị, gọi là "Khu phụ huynh":
   ba mục Các con · Lịch thi · Cài đặt (PARENT_TABS, Phiên UX2); bản lưu trên máy giữ năm tab quản trị của thầy cô (ADMIN_TABS). */
(function () {
  "use strict";
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  /* Chữ có " · " (tên đề, tên kì thi, dòng tóm tắt): khoảng trắng ngay trước dấu "·" thành khoảng trắng không ngắt (U+00A0, &nbsp;),
     để khi xuống dòng dấu "·" ở cuối dòng trên chứ không mở đầu dòng dưới (L26). Dùng sau esc() cho chữ hiện ở tiêu đề và thẻ;
     không dùng cho aria-label, dữ liệu lưu. js/quiz.js có bản giống hệt cho nhãn tên đề khi làm bài. */
  const nb = (s) => String(s).replace(/ (?=·)/g, "\u00a0");
  const view = $("#view"), who = $("#who"), foot = $(".foot");
  const MODULES = window.ONTAP_MODULES || [];
  const modById = (id) => MODULES.find((m) => m.id === id) || null;
  const qCount = (b) => (b.pool ? b.n || 0 : b.questions ? b.questions.length : b.n || 0); // đề có sẵn chưa tải câu hỏi: số câu ghi ở danh mục; đề ngẫu nhiên: số câu rút mỗi lần
  /* Hình đại diện (trường avatar của người dùng): một emoji, hoặc mã của hình vẽ riêng trong ART (file icons/avatars/<mã>.svg, giống nhau
     trên mọi máy; mã ≤ 16 kí tự như cột profiles.avatar của bản đám mây). Chủ app yêu cầu 22/10/2026: thêm hải cẩu (emoji chỉ có một 🦭,
     máy cũ không hiện được). Thêm hình vẽ: thêm file SVG, thêm mã và tên đọc vào ART, thêm file vào FILES của sw.js và tăng VERSION. */
  const ART = { "hai-cau-xam": "Hải cẩu xám", "hai-cau-con": "Hải cẩu con", "hai-cau-dom": "Hải cẩu đốm", "hai-cau-mu": "Hải cẩu đội mũ tốt nghiệp",
    "hai-cau-bong": "Hải cẩu tung bóng", "hai-cau-kinh": "Hải cẩu đeo kính đọc sách" };
  const isArt = (a) => Object.prototype.hasOwnProperty.call(ART, a);
  const AVATARS = ["🐣", "🦊", "🐼", "🐯", "🐨", "🐸", "🦄", "🐙", "🐬", "🚀", "⚽", "🎨", "🌻", "🧭", "📚", "🌟"].concat(Object.keys(ART));
  const KIND = { "dinh-ki": "Kiểm tra định kì", ioe: "IOE", "thi-khac": "Thi khác", moc: "Mốc năm học" };
  const DAY = 864e5;
  const WD = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const WDL = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  const GOAL = 5; // mục tiêu số ngày ôn mỗi tuần (thẻ "Hôm nay", Phiên UX1)
  const TITLE = document.title;
  /* Khối lớp (data/grades.js): chỉ hiện khối đang có nội dung, cộng thêm các khối trong keep (dữ liệu đang có) để sửa không mất khối.
     Lịch mặc định có kì thi của mọi khối 4–12 (mốc năm học: 1–12), nhưng kì thi của khối chưa bật không hiện ở đâu (Phiên Lịch các khối mới):
     shownGrades() = khối đang bật + khối đang có học sinh; lịch thi "Mọi khối", danh sách kì thi của quản trị, form kì thi và chữ "Lớp …"
     trên thẻ kì thi (gradesTxt) chỉ dùng các khối đó; khối ẩn của một kì thi vẫn giữ trong dữ liệu (form lưu lại nguyên). */
  const GRADES = window.ONTAP_GRADES || [];
  const gradeList = (keep) => GRADES.filter((g) => g.active || (keep || []).includes(g.grade)).map((g) => g.grade);
  const gradeName = (g) => (GRADES.find((x) => x.grade === +g) || { name: "Lớp " + g }).name;
  const gradeOptions = (sel) => gradeList([+sel]).map((g) => `<option value="${g}" ${+sel === g ? "selected" : ""}>${esc(gradeName(g))}</option>`).join("");
  const gradesOf = (users) => [...new Set(users.map((u) => +u.grade))].sort((a, b) => a - b);
  const shownGrades = () => gradeList(gradesOf(Store.users("student")));
  const shownEvents = (evs, gl) => { const s = gl || shownGrades(); return evs.filter((e) => (e.grades || []).some((g) => s.includes(+g))); };
  const gradesTxt = (e) => { const s = shownGrades(), v = (e.grades || []).map(Number).filter((g) => s.includes(g)); return (v.length ? v : (e.grades || [])).join(", "); };

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
  // "Hôm nay 12:43", "Hôm qua 12:43", "2/11 12:43". L: bảng chữ của js/quiz.js (đề Tiếng Anh: "Today 12:43", "2 Nov 12:43")
  const ago = (iso, L) => {
    const d = new Date(iso), t = today0(), diff = Math.floor((t - new Date(d.getFullYear(), d.getMonth(), d.getDate())) / DAY);
    const hm = String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
    return (L || Quiz.TXT.vi).appWhen(diff, hm, d.getDate(), d.getMonth() + 1);
  };
  const pct = (r, t) => (t ? Math.round((r / t) * 100) : 0);
  const nf = (x) => Quiz.fmtN(+x || 0); // 23,35 (số câu đúng có thể lẻ: câu đúng/sai 4 ý, nối cột chấm từng ý)
  const d10 = (r, t) => (t ? String(Math.round((r / t) * 40) / 4).replace(".", ",") : "–");
  const isoDay = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

  /* ---------------- tiện ích giao diện ---------------- */
  let toastTimer;
  function toast(msg, ms) { // ms: thời gian hiện (mặc định 2,6 giây; câu dài như "Sẽ gửi cho bố mẹ khi có mạng" cần lâu hơn)
    let t = $("#toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status"); document.body.append(t); }
    t.textContent = msg; t.hidden = false; clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (t.hidden = true), ms || 2600);
  }
  const go = (h) => { if (guardOn()) { askLeave(h, false); return; } if (location.hash === h) route(); else location.hash = h; };
  const back = (h, txt) => `<button class="linkbtn" data-go="${h}">← ${esc(txt || "Quay lại")}</button>`;
  function wireGo(root) { $$("[data-go]", root || view).forEach((b) => (b.onclick = () => go(b.dataset.go))); }
  // chỗ duy nhất vẽ hình đại diện: emoji là chữ, hình vẽ là <img class="art"> (to bằng emoji cùng cỡ chữ, css/app.css)
  const avIn = (a) => (isArt(a) ? `<img class="art" src="icons/avatars/${a}.svg" alt="">` : esc(a || "🙂"));
  const avatar = (u, lg) => `<span class="av${lg ? " lg" : ""}" aria-hidden="true">${avIn(u.avatar)}</span>`;
  const gradeTxt = (u) => (u.role === "student" ? "Lớp " + u.grade + (u.className ? " · " + u.className : "") : Store.ROLES[u.role]);
  function emojiPicker(sel) {
    return `<div class="emojis" role="group" aria-label="Chọn hình đại diện">${AVATARS.map((a) => `<button type="button" data-emo="${a}" aria-pressed="${a === sel}"${isArt(a) ? ` aria-label="${ART[a]}"` : ""}>${avIn(a)}</button>`).join("")}</div>`;
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
  /* Chép chữ vào bảng tạm (như copy trong admin.html): clipboard API, không được thì cách cũ. Trả về true khi chép được. */
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch (e) { /* thử cách cũ */ }
    try {
      const t = document.createElement("textarea");
      t.value = text; t.setAttribute("readonly", ""); t.style.position = "fixed"; t.style.opacity = "0";
      document.body.append(t); t.select();
      const ok = document.execCommand("copy"); t.remove(); return ok;
    } catch (e) { return false; }
  }

  /* ---------------- nút xem mật khẩu, mã PIN ----------------
     wireReveal(root): mọi ô type="password" trong root có nút hình con mắt sát cạnh phải; bấm thì hiện chữ đã gõ
     (type="text"), bấm lại thì ẩn. Gọi sau khi vẽ màn hình có ô mật khẩu; ô đã có nút thì bỏ qua.
     - Ô có inputmode="numeric" là ô mã PIN. Chỉ đổi type: giá trị, inputmode, autocomplete giữ nguyên; ô đang gõ giữ focus
       và vị trí con trỏ (bàn phím điện thoại không đóng), ô không focus thì vẫn không focus (không bật bàn phím).
     - Tự ẩn lại khi gửi form, khi xóa hết ô (gõ xóa); xóa ô bằng code hoặc gửi không qua form thì gọi conceal(ô).
       Chuyển màn hình là vẽ ô mới (đang ẩn). Mỗi lần đổi, ô báo sự kiện "reveal" (bàn phím PIN vẽ lại hàng chấm).
     - Nút nằm trong <label> của ô nên ô lấy tên từ chữ nhãn (aria-labelledby), không đọc kèm tên nút.
     - Ô có data-reveal="<id>" dùng nút chữ đặt sẵn ở chỗ khác thay cho nút mắt trong ô (bàn phím PIN: "Hiện số" dưới hàng chấm,
       UX4): không bọc ô, không đặt aria-label; nút ghi mắt + "Hiện số", đang hiện thì "Giấu số" (hai <span> on/off, CSS ẩn một).
     - Không lưu trạng thái hiện/ẩn ở đâu cả. admin.html có bản riêng cùng cách làm, cùng lớp CSS .reveal. */
  const EYE = `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path class="off" d="M4 4l16 16"/></svg>`;
  const revealers = new WeakMap(); // ô → hàm đặt hiện (true) / ẩn (false)
  let revealN = 0;
  function wireReveal(root) {
    $$('input[type="password"]', root || view).forEach((inp) => {
      if (revealers.has(inp)) return;
      // Tên trong aria-label của nút: data-what của ô (ví dụ "mã mở nhanh"), không có thì theo loại ô; ô đổi tên thì báo sự kiện "relabel".
      const what = () => inp.dataset.what || (inp.getAttribute("inputmode") === "numeric" ? "mã PIN" : "mật khẩu");
      const cap = inp.closest("label") && inp.closest("label").querySelector(":scope > span");
      if (cap) { cap.id = cap.id || "revealCap" + ++revealN; inp.setAttribute("aria-labelledby", cap.id); }
      const pre = inp.dataset.reveal ? document.getElementById(inp.dataset.reveal) : null; // nút chữ đặt sẵn (bàn phím PIN, UX4)
      const btn = pre || document.createElement("button");
      btn.type = "button"; btn.classList.add("reveal-btn");
      if (inp.id) btn.setAttribute("aria-controls", inp.id);
      if (pre) btn.innerHTML = `${EYE}<span class="on">Hiện số</span><span class="off">Giấu số</span>`;
      else {
        const box = document.createElement("span");
        box.className = "reveal"; inp.before(box); box.append(inp, btn);
        btn.innerHTML = EYE; // vẽ một lần: thay nút giữa lúc bấm thì <label> tưởng bấm vào nhãn và đặt focus vào ô
      }
      const draw = (show) => { btn.setAttribute("aria-pressed", show); if (!pre) btn.setAttribute("aria-label", (show ? "Ẩn " : "Hiện ") + what()); };
      inp.addEventListener("relabel", () => draw(inp.type === "text"));
      const set = (show, keep) => {
        if ((inp.type === "text") === show) return;
        const s = inp.selectionStart, e = inp.selectionEnd;
        inp.type = show ? "text" : "password"; draw(show);
        // Đổi type thì trình duyệt dựng lại ô ở lần tính bố cục sau và đặt lại con trỏ: tính bố cục ngay (offsetWidth) rồi mới đặt.
        if (keep) { void inp.offsetWidth; inp.focus({ preventScroll: true }); try { inp.setSelectionRange(s, e); } catch (er) { /* ô không chọn được chữ */ } }
        inp.dispatchEvent(new Event("reveal"));
      };
      draw(false);
      // Bấm nút không lấy focus của ô (mousedown); nếu trình duyệt vẫn bỏ focus thì click trả lại.
      let had = false;
      btn.addEventListener("pointerdown", () => (had = document.activeElement === inp));
      btn.addEventListener("mousedown", (e) => e.preventDefault());
      btn.addEventListener("click", () => { const keep = had || document.activeElement === inp; had = false; set(inp.type === "password", keep); });
      inp.addEventListener("input", () => { if (!inp.value) set(false); });
      if (inp.form) inp.form.addEventListener("submit", () => set(false), true); // trước onsubmit của màn hình
      revealers.set(inp, set);
    });
  }
  const conceal = (inp) => { const set = inp && revealers.get(inp); if (set) set(false); };

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
     - link và nút trong app (go(), thẻ <a href="#…">, kể cả chữ OnUp và nút tài khoản trên thanh đầu): hỏi trước khi đổi hash;
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
  /* Kết quả mode "self": điểm tự chấm phần tự luận (js/quiz.js), r và t tính bằng phần tư điểm. Không tính vào điểm
     trung bình, số bài, độ sẵn sàng: các màn hình lọc bằng graded() rồi mới tính; báo cáo tuần ghi riêng. */
  const isSelf = (r) => r.mode === "self";
  const graded = (list) => list.filter((r) => !isSelf(r));
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
  /* Chuỗi ngày ôn dài nhất từ trước đến nay (huy hiệu chuỗi 3, 7, 14 ngày, Phiên UX1). */
  function bestStreak(results) {
    const days = [...new Set(results.map((r) => { const d = new Date(r.at); return Math.round(new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() / DAY); }))].sort((a, b) => a - b);
    let best = 0, run = 0;
    days.forEach((d, i) => { run = i && days[i - 1] === d - 1 ? run + 1 : 1; if (run > best) best = run; });
    return best;
  }
  /* Tuần này (T2–CN): ngày nào có làm bài, ngày nào là hôm nay, ngày nào chưa tới. */
  function weekRow(results) {
    const t = today0(), mon = addDays(t, -((t.getDay() + 6) % 7));
    const done = new Set(results.map((r) => isoDay(new Date(r.at))));
    return Array.from({ length: 7 }, (_, i) => { const d = addDays(mon, i), k = isoDay(d); return { name: WD[d.getDay()], on: done.has(k), today: k === isoDay(t), future: d > t }; });
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
  /* Thanh trên chỉ có chữ OnUp và nút tài khoản (hình đại diện). Lịch thi có một lối vào cố định ở mỗi vai trò: tab Lịch thi ở thanh
     dưới (học sinh, UX1), tab Lịch thi của khu phụ huynh (bản đám mây, UX2) và của quản trị; phụ huynh bản lưu trên máy (không có tab)
     có link ở trang chủ. Báo cáo của con có link "Xem cả năm" ngay ở mục Kì thi sắp tới (calHref: bản đám mây là tab Lịch thi). */
  const calHref = (u) => (Store.cloud && u.role === "admin" ? "#/admin/events" : "#/calendar");
  function drawWho(u) {
    if (!u) { who.innerHTML = ""; return; }
    who.innerHTML = `<button class="linkbtn row" id="whoBtn" aria-label="Tài khoản của ${esc(u.name)}" style="gap:6px">${avatar(u)}<span class="nm">${esc(u.name)}</span></button>`;
    $("#whoBtn").onclick = () => go("#/account");
  }
  /* ---------------- thanh tab dưới màn hình (học sinh, Phiên UX1) ----------------
     Hôm nay (#/home) · Bài ôn (#/practice) · Lịch thi (#/calendar) · Kết quả (#/results). Chỉ hiện ở bốn màn hình đó của học sinh;
     màn mở đề, làm bài, bài ôn trong khung, tài khoản không có (ít lối ra khi đang làm bài). body.tabbed chừa chỗ ở dưới cho thanh. */
  const ICO = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const TABS = [
    ["home", "Hôm nay", ICO('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>')],
    ["practice", "Bài ôn", ICO('<path d="M4 5a2 2 0 0 1 2-2h6v16H6a2 2 0 0 0-2 2z"/><path d="M20 5a2 2 0 0 0-2-2h-6v16h6a2 2 0 0 1 2 2z"/>')],
    ["calendar", "Lịch thi", ICO('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>')],
    ["results", "Kết quả", ICO('<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>')]
  ];
  function drawTabs(u, name) {
    const show = !!u && u.role === "student" && TABS.some(([k]) => k === name);
    document.body.classList.toggle("tabbed", show);
    let bar = $("#tabbar");
    if (!show) { if (bar) bar.remove(); return; }
    if (!bar) { bar = document.createElement("nav"); bar.id = "tabbar"; bar.className = "tabbar"; bar.setAttribute("aria-label", "Mục chính"); document.body.append(bar); }
    bar.innerHTML = `<div class="tabbar-in">${TABS.map(([k, t, ic]) => `<a href="#/${k}"${k === name ? ' aria-current="page"' : ""}>${ic}<span>${t}</span></a>`).join("")}</div>`;
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
    wireEmoji(view, (e) => (emo = e)); wireReveal(view);
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
  /* Bước nhập riêng (Phiên UX4, X1): hồ sơ có PIN, hoặc ô Phụ huynh của bản đám mây, chạm vào thì chuyển sang #/vao/<mã>:
     link "← Chọn hồ sơ khác", hình to, tên, lớp, hàng chấm và bàn phím ngay dưới (vừa một màn hình 360×740, không cuộn);
     nút Back của điện thoại quay về danh sách. Hồ sơ không có PIN thì chạm là vào như cũ.
     Số đã gõ chỉ hiện ở hàng chấm (X2): ô #pinIn vẫn có cho bàn phím máy tính và trình đọc màn hình nhưng ẩn khỏi mắt (lớp .sr,
     không display:none vì kiểm thử gõ bằng page.fill); nút xem là nút chữ "Hiện số" (#pinShow) đặt sẵn dưới hàng chấm,
     wireReveal nhận qua data-reveal="pinShow" của ô. Lỗi và đếm ngược (#pinErr) nằm ngay dưới hàng chấm (X3); đang phải đợi
     (PinLock) thì bàn phím, Vào, Hiện số disabled (box.lock), số gõ từ bàn phím máy tính bị bỏ, hết giờ tự bật lại. */
  const pinBoxHTML = () => `<section class="panel" id="pinBox" hidden>
        <p class="small muted" id="pinSub" style="text-align:center;margin:0">Nhập mã PIN của bạn</p>
        <div class="pin" id="pinDots" aria-hidden="true"></div>
        <label class="field sr"><span id="pinLabel">Mã PIN</span><input id="pinIn" type="password" inputmode="numeric" maxlength="6" autocomplete="off" data-reveal="pinShow"></label>
        <div id="pinErr" aria-live="assertive"></div>
        <button type="button" class="linkbtn pin-show" id="pinShow"></button>
        <div class="pad">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<button type="button" data-k="${n}">${n}</button>`).join("")}<button type="button" data-k="del" aria-label="Xóa">⌫</button><button type="button" data-k="0">0</button><button type="button" class="ok" data-k="ok" aria-label="Vào">Vào</button></div>
        <div class="row" style="justify-content:center" id="pinAlt" hidden></div>
      </section>`;
  /* Bàn phím PIN dùng chung cho đăng nhập trên máy và trên đám mây. submit(pin) được gọi khi bấm Vào, Enter,
     hoặc gõ đủ độ dài PIN của người đã chọn (u.pinLen; chưa biết thì 6).
     probe(pin), không bắt buộc: chưa biết độ dài thì gọi khi gõ đủ 4 số, để thử lặng lẽ PIN 4 số.
     Nút xem (wireReveal) đang hiện thì hàng chấm hiện chữ số đã gõ; gửi PIN hoặc xóa hết thì ẩn lại.
     show(u, opts), opts không bắt buộc (mã mở nhanh của Phụ huynh, UX3): label là tên ô thay cho "Mã PIN", sub là dòng phụ trên hàng chấm
     (mặc định "Nhập mã PIN của bạn"), alt = {lead?, text, go} là link thay thế dưới bàn phím ("Quên mã?" + "Nhập mật khẩu", A5b); không truyền thì như bàn phím PIN của hồ sơ con. */
  function wirePinBox(submit, probe) {
    const inp = $("#pinIn"), dots = $("#pinDots");
    let pin = "", len = 0, locked = false; // locked: đang phải đợi (PinLock), bàn phím mờ, số gõ vào bị bỏ
    const draw = () => {
      const show = inp.type === "text";
      dots.classList.toggle("shown", show);
      dots.innerHTML = Array.from({ length: Math.max(len || 4, pin.length) }, (_, i) => `<span class="${i < pin.length ? "on" : ""}">${show && i < pin.length ? esc(pin[i]) : ""}</span>`).join("");
    };
    const set = (v) => { pin = v; inp.value = v; if (!v) conceal(inp); draw(); };
    const send = (v) => { conceal(inp); submit(v); };
    const typed = (v) => { set(v); if (pin.length === (len || 6)) send(pin); else if (!len && pin.length === 4 && probe) probe(pin); };
    $$(".pad button").forEach((b) => (b.onclick = () => {
      const k = b.dataset.k;
      if (locked) return;
      if (k === "ok") send(pin);
      else if (k === "del") set(pin.slice(0, -1));
      else if (pin.length < (len || 6)) typed(pin + k);
    }));
    inp.oninput = () => { if (locked) { set(""); return; } const v = inp.value.replace(/\D/g, "").slice(0, len || 6); if (v.length > pin.length) typed(v); else set(v); };
    inp.onkeydown = (e) => { if (e.key === "Enter" && !locked) send(pin); };
    inp.addEventListener("reveal", draw);
    return {
      clear: () => set(""),
      lock(on) { locked = !!on; if (locked) set(""); [...$$(".pad button"), $("#pinShow")].forEach((b) => { if (b) b.disabled = locked; }); },
      show(u, opts) {
        const { sub, alt, label } = opts || {};
        len = u.pinLen >= 4 && u.pinLen <= 6 ? u.pinLen : 0;
        set(""); $("#pinErr").innerHTML = "";
        $("#pinSub").textContent = sub || "Nhập mã PIN của bạn";
        $("#pinAlt").hidden = !alt; $("#pinAlt").innerHTML = alt ? `${alt.lead ? `<span class="small muted">${esc(alt.lead)}</span>` : ""}<button type="button" class="linkbtn" id="pinToPw">${esc(alt.text)}</button>` : "";
        if (alt) $("#pinToPw").onclick = alt.go;
        $("#pinLabel").textContent = label || "Mã PIN";
        if (label) inp.dataset.what = label.toLowerCase(); else delete inp.dataset.what;
        inp.dispatchEvent(new Event("relabel"));
        $("#pinBox").hidden = false; setTimeout(() => inp.focus({ preventScroll: true }), 30);
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

  /* Chọn hồ sơ rồi nhập PIN. Bản lưu trên máy: mọi tài khoản của máy, theo vai trò (ai cũng có PIN).
     Bản đám mây ("Ai đang học?", đã đăng nhập tài khoản gia đình): các hồ sơ con và ô Phụ huynh. Hồ sơ con không có PIN
     thì bấm là vào; Phụ huynh phải nhập lại mật khẩu (vừa nhập trong 5 phút thì không hỏi lại). Máy đã đặt mã mở nhanh
     (Store.quickCodeLen(), UX3) thì ô Phụ huynh mở bàn phím mã đó, có link "Nhập mật khẩu" (quên mã); sai mã cũng tính vào PinLock.
     Hồ sơ phải nhập thì chạm vào là sang #/vao/<mã> (renderEnter, UX4); hồ sơ chọn gần nhất chỉ được đánh dấu trên danh sách. */
  const loginCtx = () => { const cloud = !!Store.cloud, parent = cloud ? Store.users("admin")[0] : null; return { cloud, parent, quick: cloud ? Store.quickCodeLen() : 0, isParent: (id) => cloud && !!parent && id === parent.id }; };
  const needsEntry = (u, c) => !!u && (!c.cloud || c.isParent(u.id) || !!u.hasPin);
  const enterHash = (id) => "#/vao/" + encodeURIComponent(id);
  let loginTick = null; // đếm ngược khi phải đợi (showWait); vẽ lại màn hình đăng nhập thì dừng
  let enterFromList = false; // bước nhập mở từ danh sách trong lần tải trang này: "← Chọn hồ sơ khác" lùi lịch sử để không chồng thêm mục
  function loginEnter(id) { PinLock.clear(id); clearInterval(loginTick); Store.setSession(id); if (/^#\/vao\//.test(location.hash)) location.replace("#/home"); else go("#/home"); }
  function renderLogin() {
    drawWho(null); clearInterval(loginTick);
    const c = loginCtx(), { cloud, parent, quick } = c;
    // Bản đám mây, tài khoản chưa có hồ sơ con và bố mẹ vừa đăng nhập: vào thẳng khu phụ huynh để thêm hồ sơ.
    if (cloud && !Store.users("student").length && Store.parentUnlocked()) { Store.setSession(parent.id); go("#/home"); return; }
    window.scrollTo(0, 0);
    const m = /^#\/vao\/([^/?#]+)/.exec(location.hash || ""), target = m ? Store.user(decodeURIComponent(m[1])) : null;
    if (needsEntry(target, c)) { if (c.isParent(target.id) && Store.parentUnlocked()) { loginEnter(target.id); return; } renderEnter(target, c); return; } // Phụ huynh vừa nhập mật khẩu: vào thẳng như khi chạm ô
    if (m) { try { history.replaceState(null, "", "#/"); } catch (e) { /* vẫn hiện danh sách */ } } // mã lạ hoặc hồ sơ không có PIN: về danh sách
    const groups = cloud ? [["student", "Con"], ["admin", "Bố mẹ"]] : [["student", "Học sinh"], ["parent", "Phụ huynh"], ["admin", "Quản trị"]];
    const sub = (u) => (cloud && u.role === "admin" ? (quick ? "Nhập mã mở nhanh" : "Nhập mật khẩu") : gradeTxt(u));
    const last = Store.user(Store.lastUserId()) ? Store.lastUserId() : null;
    view.innerHTML = `<div class="stack">
      <div><h1>${cloud ? "Ai đang học?" : "Xin chào!"}</h1><p class="muted">${esc(Store.settings().schoolName || (cloud ? "Chọn hồ sơ của bạn." : "Chọn tên của bạn để bắt đầu."))}</p></div>
      ${cloud && !Store.users("student").length ? `<div class="notice">Chưa có hồ sơ con. Bố mẹ chọn “Phụ huynh” để thêm hồ sơ cho con.</div>` : ""}
      ${groups.map(([role, name]) => { const us = Store.users(role); return us.length ? `<section class="sec"><div class="label">${name}</div><div class="tiles">${us.map((u) => `<button class="tile" data-u="${esc(u.id)}" aria-pressed="${u.id === last}">${avatar(u, true)}<span class="nm">${esc(u.name)}</span><span class="small muted">${esc(sub(u))}</span></button>`).join("")}</div></section>` : ""; }).join("")}</div>`;
    $$(".tile").forEach((t) => (t.onclick = () => {
      const id = t.dataset.u, u = Store.user(id);
      if (!u) return;
      if (c.isParent(id) && Store.parentUnlocked()) { loginEnter(id); return; }
      if (!needsEntry(u, c)) { loginEnter(id); return; }
      enterFromList = true; location.hash = enterHash(id);
    }));
    if (!cloud && !Store.users().length) view.insertAdjacentHTML("afterbegin", `<div class="fb bad">Chưa có tài khoản nào.</div>`);
  }
  /* Bước nhập của một hồ sơ (#/vao/<mã>, UX4). Hồ sơ con, tài khoản của bản lưu trên máy: bàn phím PIN. Phụ huynh (bản đám mây):
     ô mật khẩu, nút "Vào khu phụ huynh", dòng "Quên mật khẩu?"; máy có mã mở nhanh thì bàn phím mã hiện trước, kèm link "Nhập mật khẩu". */
  function renderEnter(u, c) {
    const { cloud, quick } = c, parentIn = c.isParent(u.id), id = u.id;
    let usePw = false, busy = false; // usePw: Phụ huynh có mã mở nhanh nhưng chọn nhập mật khẩu
    const sub = u.role === "student" ? gradeTxt(u) : cloud ? [Store.settings().schoolName, Store.username()].filter(Boolean).join(" · ") : Store.ROLES[u.role];
    view.innerHTML = `<div class="stack enter" id="enterBox">
      <button class="linkbtn" type="button" id="toList">← Chọn hồ sơ khác</button>
      <div class="enter-who" id="pinWho">${avatar(u, true)}<b>${esc(u.name)}</b><span class="muted">${nb(esc(sub))}</span></div>
      ${pinBoxHTML()}
      ${parentIn ? `<form class="panel" id="pwBox" hidden autocomplete="on">
        <input type="text" name="username" autocomplete="username" value="${esc(Store.username())}" hidden>
        <label class="field"><span>Mật khẩu của bố mẹ</span><input id="pwIn" type="password" autocomplete="current-password" maxlength="72"></label>
        <div class="captcha" id="pwCaptcha"></div>
        <div id="pwErr" aria-live="assertive"></div>
        <button class="btn main lg" type="submit" id="pwGo">Vào khu phụ huynh</button>
        ${contactLine("Quên mật khẩu?")}
        ${quick ? `<div class="row" style="justify-content:center"><button type="button" class="linkbtn" id="pwToPin">Dùng mã mở nhanh</button></div>` : ""}
      </form>` : ""}
      ${u.role === "admin" ? "" : `<p class="small muted enter-help" id="pinHelp">Quên mã PIN? ${cloud ? "Nhờ bố mẹ đặt lại trong Khu phụ huynh → Cài đặt → Hồ sơ con." : "Nhờ quản trị đặt lại trong Quản trị → Tài khoản."}</p>`}
    </div>`;
    const box = wirePinBox(submit, probe), here = $("#enterBox");
    wireReveal(view);
    $("#toList").onclick = () => { clearInterval(loginTick); if (enterFromList) history.back(); else location.replace("#/"); };
    const errBox = () => $(parentIn && !$("#pwBox").hidden ? "#pwErr" : "#pinErr");
    const err = (msg) => { errBox().innerHTML = `<div class="fb bad">${esc(msg)}</div>`; };
    // Đếm ngược trong #pinWait (aria-live="off" để trình đọc màn hình không đọc lại mỗi giây).
    // Đang đợi thì bàn phím, Vào, Hiện số (box.lock) và nút "Vào khu phụ huynh" mờ; hết giờ tự bật lại (X3).
    const lock = (on) => { box.lock(on); if (parentIn) $("#pwGo").disabled = on; };
    function showWait(lead) {
      clearInterval(loginTick); lock(true);
      const out = errBox();
      out.innerHTML = `<div class="fb bad">${esc(lead || "Sai nhiều lần.")} Đợi <b id="pinWait" aria-live="off">${waitTxt(PinLock.wait(id))}</b> rồi thử lại.</div>`;
      loginTick = setInterval(() => {
        const w = $("#pinWait"), s = PinLock.wait(id);
        if (!w || !here.isConnected) { clearInterval(loginTick); return; }
        if (!s) { clearInterval(loginTick); lock(false); out.innerHTML = `<div class="fb ok">Bạn nhập lại được rồi.</div>`; return; }
        w.textContent = waitTxt(s);
      }, 1000);
    }
    const showPin = () => {
      if (parentIn) $("#pwBox").hidden = true;
      if (parentIn) box.show(Object.assign({}, u, { pinLen: quick }), { label: "Mã mở nhanh", sub: "Nhập mã mở nhanh của máy này", alt: { lead: "Quên mã?", text: "Nhập mật khẩu", go: () => { usePw = true; showPw(); } } }); // A5b
      else box.show(u);
      if (PinLock.wait(id)) showWait(); else lock(false);
    };
    const showPw = () => {
      $("#pinBox").hidden = true; clearInterval(loginTick);
      $("#pwErr").innerHTML = ""; $("#pwIn").value = ""; conceal($("#pwIn")); $("#pwBox").hidden = false;
      setTimeout(() => $("#pwIn").focus({ preventScroll: true }), 30);
      if (PinLock.wait(id)) showWait(); else lock(false);
    };
    // busy: gõ đủ số rồi bấm Enter ngay (hoặc thử lặng lẽ chưa xong) thì không kiểm tra hai lần.
    async function submit(pin) {
      if (!pin || busy) return;
      if (PinLock.wait(id)) { box.clear(); showWait(); return; }
      busy = true;
      const ok = parentIn ? await Store.checkQuickCode(pin) : await Store.checkPin(id, pin); // Phụ huynh: mã mở nhanh của máy này (UX3)
      busy = false;
      if (!here.isConnected) return; // đã rời màn hình
      if (ok) { loginEnter(id); return; }
      box.clear();
      const what = parentIn ? "Mã mở nhanh" : "Mã PIN";
      if (PinLock.fail(id)) { showWait(what + " chưa đúng."); return; }
      const left = PinLock.left(id);
      pinError(left <= 2 ? `${what} chưa đúng. Sai thêm ${left} lần nữa thì phải đợi một lúc.` : `${what} chưa đúng. Thử lại nhé.`);
    }
    // Tài khoản cũ chưa biết độ dài PIN: gõ đủ 4 số thì thử lặng lẽ. Sai thì không báo, không tính là lần sai, chờ gõ tiếp.
    async function probe(pin) {
      if (busy || parentIn || !PinLock.probe(id)) return;
      busy = true;
      const ok = await Store.checkPin(id, pin);
      busy = false;
      if (ok && here.isConnected) loginEnter(id);
    }
    // Mật khẩu của bố mẹ (bản đám mây): sai cũng tính vào khóa tạm như PIN, để con không đoán mãi được.
    if (parentIn) {
      $("#pwBox").onsubmit = async (ev) => {
        ev.preventDefault();
        const pw = $("#pwIn").value;
        if (!pw || busy) return;
        if (PinLock.wait(id)) { showWait(); return; }
        busy = true; $("#pwGo").disabled = true;
        try {
          const ok = await Store.checkPassword(pw);
          if (!here.isConnected) return;
          if (ok) { loginEnter(id); return; }
          $("#pwIn").value = "";
          if (PinLock.fail(id)) { showWait("Mật khẩu chưa đúng."); return; }
          const left = PinLock.left(id);
          err(left <= 2 ? `Mật khẩu chưa đúng. Sai thêm ${left} lần nữa thì phải đợi một lúc.` : "Mật khẩu chưa đúng. Thử lại nhé.");
        } catch (e) { err(e.message); } finally { busy = false; if ($("#pwGo")) $("#pwGo").disabled = !!PinLock.wait(id); }
      };
      if ($("#pwToPin")) $("#pwToPin").onclick = () => { usePw = false; showPin(); };
      if (quick && !usePw) showPin(); else showPw();
    } else showPin();
  }

  /* ================= ĐĂNG NHẬP ĐÁM MÂY (khi js/config.js có Supabase) ================= */
  /* Đường liên hệ lấy từ js/config.js, chỉ nhận https:, tel:, sms:, mailto: (không có hoặc sai thì chỉ hiện chữ).
     kind "contact": contactText, contactUrl (quên mật khẩu, tài khoản bị khóa); "signup": signupText, signupUrl (xin tài khoản,
     thẻ “Chưa có tài khoản?”), khóa nào để trống thì dùng khóa contact tương ứng. */
  function contactLink(kind, cls) {
    const c = window.ONTAP_CONFIG || {}, s = (k) => String(c[k] || "").trim();
    const txt = (kind === "signup" && s("signupText")) || s("contactText") || "Liên hệ người cấp tài khoản.";
    const url = (kind === "signup" && s("signupUrl")) || s("contactUrl");
    return /^(https:|tel:|sms:|mailto:)/i.test(url)
      ? `<a class="linkbtn${cls ? " " + cls : ""}" href="${esc(url)}"${/^https:/i.test(url) ? ` target="_blank" rel="noopener"` : ""}>${esc(txt)}</a>`
      : `<span class="muted${cls ? " " + cls : ""}">${esc(txt)}</span>`;
  }
  /* Dòng liên hệ khi quên mật khẩu hoặc tài khoản bị khóa. */
  function contactLine(lead) {
    return `<div class="row contact" id="contact" style="gap:4px 8px"><span class="small muted">${esc(lead)}</span>${contactLink("contact", "small")}</div>`;
  }
  function renderCloudLogin() {
    drawWho(null);
    // Máy còn dữ liệu của bản lưu trên máy (có học sinh) mà chưa chuyển lên đám mây: nhắc ngay trên form (Phiên S1).
    const loc = Store.localData(), kids = loc ? loc.users.filter((x) => x.role === "student").length : 0;
    const oldData = kids && !Store.migratedAt() ? `<div class="notice" id="oldData">Máy này còn dữ liệu ôn tập cũ (${kids} học sinh, ${(loc.results || []).length} kết quả). Đăng nhập tài khoản gia đình, rồi vào Khu phụ huynh → Cài đặt → Chuyển dữ liệu và sao lưu.</div>` : "";
    view.innerHTML = `<div class="stack">
      <div><h1>Xin chào!</h1><p class="muted">Bố mẹ đăng nhập bằng tài khoản được cấp. Sau đó con chọn hồ sơ của mình để học.</p></div>
      ${oldData}
      <form class="panel" id="loginForm" autocomplete="on">
        <label class="field"><span>Tên đăng nhập</span><input id="lUser" name="username" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false" maxlength="20" required></label>
        <label class="field"><span>Mật khẩu</span><input id="lPass" name="password" type="password" autocomplete="current-password" maxlength="72" required></label>
        <div class="checks"><label><input type="checkbox" id="lRemember" ${Store.rememberLogin() ? "checked" : ""}>Ghi nhớ trên máy này</label></div>
        <p class="small muted">Chọn ghi nhớ trên máy của gia đình để con mở app là học được. Không chọn thì đóng trang là phải đăng nhập lại.</p>
        <div class="captcha" id="loginCaptcha"></div>
        <div id="loginErr" aria-live="assertive"></div>
        <div class="row"><button class="btn main" type="submit" id="lGo">Đăng nhập</button></div>
        ${contactLine("Quên mật khẩu?")}
      </form>
      <section class="panel" id="signup"><b>Chưa có tài khoản?</b>
        <span class="small">OnUp đang dùng thử với các gia đình được mời, chưa tự đăng ký được.</span>
        ${contactLink("signup")}</section></div>`;
    wireReveal(view);
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
    wireReveal(view);
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
    if (u.role === "student") return renderToday(u);
    if (u.role === "parent") return renderParent(u);
    return renderAdmin(u, "overview");
  }

  /* Số "bài ôn" của một kì (nhãn trên thẻ kì thi, đầu nhóm bài ôn, danh sách kì thi ở quản trị): bài ôn dạng trang và đề cố định,
     không đếm đề ngẫu nhiên (chỉ là cách làm lại các đề cố định), để khớp với nút "Đề ôn · N đề" (L25). */
  const practiceCount = ({ mods, bks }) => mods.length + bks.filter((b) => !b.pool).length;
  function eventRow(e, opts) {
    const st = status(e), g = opts && opts.grade;
    const { mods, bks } = practiceFor(e, g), nPr = practiceCount({ mods, bks });
    const extra = opts && opts.student ? readiness(e, opts.student, opts.results) : null;
    const dd = !e.start ? `<span class="d">?<small>chưa có</small></span>` : `<span class="d">${dm(e.start)}<small>${e.end && e.end !== e.start ? "đến " + dm(e.end) : WD[pd(e.start).getDay()]}</small></span>`;
    return `<button class="ev ${esc(e.kind)} ${st}" data-ev="${esc(e.id)}">
      ${dd}
      <span class="t"><b>${nb(esc(e.title) + (g == null && e.grades ? ` · Lớp ${gradesTxt(e)}` : ""))}</b>
        <span class="tags">${e.kind !== "moc" ? `<span class="tag ${e.kind === "ioe" ? "ioe" : ""}">${esc(KIND[e.kind] || e.kind)}</span>` : `<span class="tag moc">Mốc năm học</span>`}
          ${e.tentative && e.start ? `<span class="tag warn">Dự kiến</span>` : ""}
          ${st === "now" ? `<span class="tag warn">Đang diễn ra</span>` : st === "future" && e.kind !== "moc" ? `<span class="tag">Còn ${daysTo(e)} ngày</span>` : ""}
          ${nPr ? `<span class="tag">${nPr} bài ôn</span>` : ""}</span>
        ${extra && extra.p != null ? `<span class="small ready${extra.p >= 80 ? " good" : ""}">Đã làm đúng ${extra.p}% bài ôn của kì này</span>` : ""}
        ${e.subjects && e.subjects.length ? `<span class="small muted">${esc(e.subjects.join(", "))}</span>` : ""}</span>
    </button>`;
  }
  function wireEvents(root, grade, student) {
    $$("[data-ev]", root).forEach((b) => (b.onclick = () => openEvent(b.dataset.ev, grade, student)));
  }

  /* Chữ trên nút đề trong một hàng (cùng môn), lấy từ tên đề dạng "<môn> <khối> · <kì> · Đề N" (data/banks/index.js;
     đề ngẫu nhiên: "… · Đề ngẫu nhiên"):
     - mọi đề cùng một kì: "Đề N", N lấy từ tên (tên không có số thì "Đề"), đề ngẫu nhiên là "Đề ngẫu nhiên";
     - nhiều kì khác nhau, hoặc full (nhóm "Bài ôn khác": đề của kì đã qua, đề chưa gắn kì; L24): tên bỏ phần môn và khối,
       ví dụ "Cuối kì I · Đề 1", "Giữa kì I · Đề ngẫu nhiên", để trẻ biết đề của kì nào;
     - tên tự đặt không bắt đầu bằng môn và khối (ngân hàng quản trị viên nhập): nguyên tên đề.
     Hai nút trùng chữ thì ghi dài như nhóm nhiều kì, vẫn trùng thì ghi nguyên tên đề. */
  function bankLabels(list, full) {
    const norm = (x) => String(x).normalize("NFC").replace(/\s+/g, " ").trim().toLowerCase();
    const info = list.map((b) => {
      const title = String(b.title).normalize("NFC"), parts = title.split(/\s*·\s*/), head = norm(parts[0]);
      const rest = parts.length > 1 && [b.subject + " " + b.grade, b.subject + " lớp " + b.grade].some((h) => norm(h) === head) ? parts.slice(1) : null;
      const term = rest && rest.slice(0, /^Đề(\s*\d+|\s+ngẫu nhiên)?$/i.test(rest[rest.length - 1]) ? -1 : rest.length).join(" · ");
      return { rest, term, n: (/Đề\s*(\d+)/i.exec(title) || [])[1], rnd: !!b.pool, title: b.title };
    });
    const uniq = (a) => new Set(a).size === a.length;
    const short = info.map((x) => (x.rnd ? "Đề ngẫu nhiên" : x.n ? "Đề " + x.n : "Đề")), long = info.map((x) => (x.rest ? x.rest.join(" · ") : x.title));
    if (!full && info.every((x) => x.rest && x.term === info[0].term) && uniq(short)) return short;
    return uniq(long) ? long : info.map((x) => x.title);
  }
  /* Mỗi bài ôn dạng trang một dòng; đề ngân hàng gom theo môn thành một dòng có các nút "Đề ngẫu nhiên · Đề 1 · Đề 2 · …"
     (đề ngẫu nhiên đứng trước, đề cố định xếp theo tên; chữ trên nút theo bankLabels, full = luôn ghi kèm tên kì;
     aria-label là tên đề đầy đủ). */
  function practiceList(mods, bks, canPlay, full) {
    if (!mods.length && !bks.length) return `<div class="panel muted">Chưa có bài ôn cho mục này. Quản trị viên có thể nhập ngân hàng câu hỏi trong mục Quản trị.</div>`;
    const subs = new Map(), act = canPlay ? "main" : "";
    bks.forEach((b) => { const k = b.subject || "Khác"; subs.set(k, (subs.get(k) || []).concat(b)); });
    return `<div class="list">${mods.map((m) => `<div class="item"><span class="grow"><b>${esc(m.title)}</b><span class="small muted">${esc(m.desc)}</span></span><a class="btn ${act} sm" href="#/play/${esc(m.id)}">${canPlay ? "Vào ôn" : "Xem thử"}</a></div>`).join("")}
      ${[...subs].map(([sub, all]) => {
        const byTitle = (a, b) => a.title.localeCompare(b.title, "vi", { numeric: true });
        const pools = all.filter((b) => b.pool).sort(byTitle), fixed = all.filter((b) => !b.pool).sort(byTitle), list = pools.concat(fixed);
        const nq = fixed.length ? qCount(fixed[0]) : 0, same = fixed.every((b) => qCount(b) === nq);
        const np = pools.length ? qCount(pools[0]) : 0, sameP = pools.every((b) => qCount(b) === np);
        const info = [fixed.length ? `${fixed.length} đề${same ? ` · ${nq} câu${fixed.length > 1 ? " mỗi đề" : ""}` : ""}` : "",
          pools.length ? `${pools.length > 1 ? pools.length + " " : ""}đề ngẫu nhiên${sameP ? ` ${np} câu` : ""}` : ""].filter(Boolean).join(" · ");
        return `<div class="item subj"><span class="grow"><b>${esc(sub)}</b><span class="small muted">${info}</span></span>
          <span class="des">${bankLabels(list, full).map((lb, i) => { const b = list[i]; return `<a class="btn ${act} sm${b.pool ? " rnd" : ""}" href="#/quiz/${esc(b.id)}" aria-label="${canPlay ? "" : "Xem thử "}${esc(b.title.includes(lb) ? b.title : lb + " · " + b.title)}">${esc(lb)}</a>`; }).join("")}</span></div>`;
      }).join("")}</div>`;
  }
  /* "Tất cả bài ôn" của một khối, gom theo kì thi chưa qua: kì gần nhất mở sẵn, các kì sau thu gọn.
     Bài không thuộc kì nào trong số đó (kì đã qua, ngân hàng chưa gắn) nằm ở nhóm cuối "Bài ôn khác", nên không sót bài nào;
     nút đề ở nhóm này luôn ghi kèm tên kì ("Giữa kì I · Đề 1", L24). */
  function practiceGroups(grade, canPlay) {
    const seen = new Set(), key = (x) => (x.path ? "m:" : "b:") + x.id;
    const groups = Store.events(grade).filter((e) => e.kind !== "moc" && status(e) !== "past").map((e) => Object.assign({ e }, practiceFor(e, grade)))
      .filter((g) => g.mods.length + g.bks.length);
    groups.forEach((g) => g.mods.concat(g.bks).forEach((x) => seen.add(key(x))));
    const rest = { mods: MODULES.filter((m) => m.grade === +grade && !seen.has(key(m))), bks: Store.banks(grade).filter((b) => !seen.has(key(b))) };
    if (rest.mods.length + rest.bks.length) groups.push(rest);
    if (!groups.length) return practiceList([], [], canPlay);
    return groups.map((g, i) => `<details class="grp"${g.e ? ` data-grp="${esc(g.e.id)}"` : ""}${i ? "" : " open"}>
      <summary><span class="grow"><b>${g.e ? nb(esc(g.e.title)) : "Bài ôn khác"}</b><span class="small muted">${nb((g.e ? esc(range(g.e)) + " · " : "") + practiceCount(g) + " bài ôn")}</span></span></summary>
      ${practiceList(g.mods, g.bks, canPlay, !g.e)}</details>`).join("");
  }

  /* Ba ô số liệu của một học sinh (tab Kết quả; hồ sơ của con ở khu phụ huynh). */
  function statsRow(results) {
    const w7 = within(results, 7), [r30, t30] = sumRT(within(results, 30));
    return `<div class="stats">
        <div class="stat"><b>${w7.length}</b><span>bài trong 7 ngày</span></div>
        <div class="stat"><b>${t30 ? d10(r30, t30) : "–"}</b><span>Điểm trung bình tháng</span></div>
        <div class="stat"><b>${streak(results)}</b><span>ngày ôn liên tiếp</span></div>
      </div>`;
  }
  const subjectPanel = (results) => { const subs = bySubject(within(results, 30)); return subs.length ? `<section class="panel" id="bySubject"><div class="label">Theo môn · 30 ngày</div><div class="ubreak">${subs.map(({ name, r, t }) => `<span>${esc(name)}</span><div class="bar ${pct(r, t) >= 80 ? "good" : ""}"><i style="width:${pct(r, t)}%"></i></div><span>${pct(r, t)}%</span>`).join("")}</div></section>` : ""; };
  const weakPanel = (results) => { const weakList = wrongTopics(within(results, 30)).slice(0, 5); return weakList.length ? `<section class="panel" id="weakTopics"><div class="label">Chủ đề hay sai</div><div class="tags">${weakList.map(([t, n]) => `<span class="tag warn">${esc(t)} · ${n} câu</span>`).join("")}</div></section>` : ""; };

  /* Hồ sơ của con (#/child/<mã>, phụ huynh và quản trị mở từ thẻ của con) là báo cáo tuần (renderReport, Phiên UX2); danh sách bài ôn
     của con để xem thử ở #/child/<mã>/practice (renderChildPractice). Trang chủ của chính học sinh là renderToday (Phiên UX1). */
  function renderChildPractice(s, viewer) {
    view.innerHTML = `<div class="stack">${back("#/child/" + esc(s.id), "Báo cáo của " + s.name)}
      <div><h2>Bài ôn lớp ${s.grade} của ${esc(s.name)}</h2><span class="muted">Gom theo kì thi. ${viewer.role === "student" ? "" : "Bạn xem thử được mọi bài, điểm không được lưu."}</span></div>
      <section class="sec" id="allPractice">${practiceGroups(s.grade, false)}</section></div>`;
    wireGo();
  }

  /* ================= TRANG "HÔM NAY" CỦA HỌC SINH (Phiên UX1) =================
     Bốn tab dưới màn hình: Hôm nay (đây) · Bài ôn (renderPractice) · Lịch thi (renderCalendar) · Kết quả (renderResults).
     Thẻ "Hôm nay ôn gì?": tối đa 2 bài gợi ý (todayPicks) với nút Bắt đầu to; chuỗi ngày ôn và mục tiêu GOAL ngày mỗi tuần
     (streakPanel); huy hiệu (badges); 3 kết quả gần đây; kì thi tiếp theo. */
  /* Gợi ý bài ôn hôm nay. Trả về tối đa 2 mục {href, title, why, n}.
     1. Bài chính: kì thi gần nhất (chưa qua) có bài ôn của khối; không có kì nào thì lấy mọi bài ôn của khối. Trong đó: bài chưa làm
        (bài ôn dạng trang trước, rồi đề cố định theo tên), rồi bài có tỉ lệ đúng thấp nhất (dưới 90%), rồi đề ngẫu nhiên, rồi bài đầu.
     2. Bài phụ: một đề của môn chưa làm trong 7 ngày (môn theo thứ tự môn thi của kì); không có thì đề có nhiều câu sai nhất ở chủ đề
        hay sai 30 ngày qua. Không trùng bài chính. */
  function todayPicks(s, results) {
    const did = (x) => results.filter((r) => r.refId === x.id);
    const pctOf = (x) => { const [r, t] = sumRT(did(x)); return t ? pct(r, t) : null; };
    const byTitle = (a, b) => a.title.localeCompare(b.title, "vi", { numeric: true });
    const item = (x, why) => ({ id: x.id, href: (x.path ? "#/play/" : "#/quiz/") + x.id, title: x.title, why, n: x.path ? 0 : qCount(x), subject: x.subject || "" });
    const withPr = (e) => { const p = practiceFor(e, s.grade); return p.mods.length + p.bks.length ? p : null; };
    const ev = Store.events(s.grade).filter((e) => e.kind !== "moc" && status(e) !== "past").find(withPr) || null;
    const { mods, bks } = ev ? practiceFor(ev, s.grade) : { mods: MODULES.filter((m) => m.grade === +s.grade), bks: Store.banks(s.grade) };
    const sorted = bks.slice().sort(byTitle), fixed = sorted.filter((b) => !b.pool), pools = sorted.filter((b) => b.pool), main = mods.concat(fixed);
    const evTxt = ev ? `${ev.title} ${status(ev) === "now" ? "đang diễn ra" : "còn " + daysTo(ev) + " ngày"}. ` : "";
    const picks = [];
    const undone = main.find((x) => !did(x).length);
    if (undone) picks.push(item(undone, evTxt + "Bài này bạn chưa làm. Làm khoảng 20 phút, xem đáp án sau mỗi câu."));
    else if (main.length || pools.length) {
      const low = main.map((x) => [x, pctOf(x)]).filter(([, p]) => p != null).sort((a, b) => a[1] - b[1])[0];
      if (low && low[1] < 90) picks.push(item(low[0], `${evTxt}Lần trước bạn đúng ${low[1]}%. Làm lại để lên điểm nhé.`));
      else if (pools.length) picks.push(item(pools[0], evTxt + "Mỗi lần một đề khác, ưu tiên câu bạn chưa làm hoặc hay sai."));
      else picks.push(item(main[0], evTxt + "Bạn đã làm tốt cả kì này. Làm lại một đề để nhớ lâu hơn."));
    }
    // bài phụ: môn chưa làm trong 7 ngày
    const week = within(results, 7), subs = [...new Set((ev ? ev.subjects : []).concat(sorted.map((b) => b.subject)).filter((x) => x && sorted.some((b) => b.subject === x)))];
    const idle = subs.find((sub) => !week.some((r) => r.subject === sub) && sorted.some((b) => b.subject === sub && (!picks[0] || b.id !== picks[0].id)));
    if (idle) {
      const of = sorted.filter((b) => b.subject === idle && (!picks[0] || b.id !== picks[0].id));
      const b = of.find((x) => !x.pool && !did(x).length) || of.find((x) => x.pool) || of[0];
      picks.push(item(b, `Môn chưa làm trong 7 ngày qua · ${qCount(b)} câu`));
    } else {
      const weak = wrongTopics(within(results, 30))[0];
      if (weak) {
        const cnt = {};
        within(results, 30).forEach((r) => { if (r.source === "bank" && (r.wrongTopics || []).includes(weak[0])) cnt[r.refId] = (cnt[r.refId] || 0) + r.wrongTopics.filter((t) => t === weak[0]).length; });
        const id = Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a]).find((x) => Store.bank(x) && +Store.bank(x).grade === +s.grade && (!picks[0] || x !== picks[0].id));
        if (id) picks.push(item(Store.bank(id), `Ôn lại chủ đề “${weak[0]}” · ${cnt[id]} câu sai gần đây`));
      }
    }
    return { ev, picks, count: ev ? practiceCount({ mods, bks }) : 0 };
  }
  /* Huy hiệu (phần thưởng nhẹ, không có bảng xếp hạng): chuỗi 3, 7, 14 ngày ôn (chuỗi dài nhất từ trước đến nay, tính từ kết quả
     đã lưu, nên không mất khi chuỗi đứt) và "Hết đề" của một kì thi (mọi bài ôn dạng trang và đề cố định của kì đó, của khối học
     sinh, đã làm ít nhất một lần). Huy hiệu chưa ghi ở localStorage ontap_badges_v1 (theo mã học sinh) thì hiện dòng chúc mừng một lần. */
  const STREAKS = [3, 7, 14];
  function badges(s, results) {
    const best = bestStreak(results);
    const out = STREAKS.map((n) => ({ id: "streak" + n, name: `Chuỗi ${n} ngày`, icon: n >= 14 ? "🏆" : "🏅", got: best >= n }));
    Store.events(s.grade).filter((e) => e.kind !== "moc").forEach((e) => {
      const { mods, bks } = practiceFor(e, s.grade), items = mods.concat(bks.filter((b) => !b.pool));
      if (items.length && items.every((x) => results.some((r) => r.refId === x.id))) out.push({ id: "exam:" + e.id, name: `Hết đề · ${e.title}`, icon: "🎯", got: true });
    });
    return out;
  }
  const Badges = (() => {
    const KEY = "ontap_badges_v1";
    let mem = {};
    const read = () => { try { const o = JSON.parse(localStorage.getItem(KEY) || "{}"); return o && typeof o === "object" ? o : mem; } catch (e) { return mem; } };
    return {
      seen: (uid) => new Set(read()[uid] || []),
      mark(uid, ids) { const o = read(); o[uid] = ids; mem = o; try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) { /* chỉ giữ trong bộ nhớ */ } }
    };
  })();
  /* who: "bạn" ở trang của học sinh, "con" khi phụ huynh, quản trị xem hồ sơ của con. */
  function streakPanel(results, who) {
    const st = streak(results), wk = weekRow(results), n = wk.filter((d) => d.on).length, today = wk.some((d) => d.today && d.on), w = who || "bạn";
    const goalTxt = n >= GOAL ? `Tuần này ${w} đã ôn đủ ${GOAL} ngày. Giỏi lắm!` : `Tuần này ${w} ôn ${n}/${GOAL} ngày.${today ? "" : " Hôm nay làm một bài là thêm một ngày."}`;
    return `<section class="panel streak" id="streak">
      <div class="row between"><div class="row" style="gap:8px"><span class="fire" aria-hidden="true">🔥</span><div class="stack tight"><b class="big">${st} ngày liền</b><span class="small muted">Chuỗi ngày ôn</span></div></div>
        <span class="tag${n >= GOAL ? " ioe" : ""}">${n >= GOAL ? "Đạt mục tiêu tuần" : `Mục tiêu ${GOAL} ngày/tuần`}</span></div>
      <div class="week" role="list" aria-label="Các ngày trong tuần">${wk.map((d) => `<span class="wd${d.on ? " on" : ""}${d.today ? " now" : ""}${d.future ? " later" : ""}" role="listitem" aria-label="${d.name}: ${d.on ? "có ôn" : d.future ? "chưa tới" : "chưa ôn"}">${d.name}</span>`).join("")}</div>
      <p class="small" id="goalTxt">${goalTxt}</p></section>`;
  }
  function badgePanel(s, results) {
    const list = badges(s, results), cur = streak(results), today = weekRow(results).some((d) => d.today && d.on);
    const got = list.filter((b) => b.got), seen = Badges.seen(s.id), fresh = got.filter((b) => !seen.has(b.id));
    Badges.mark(s.id, got.map((b) => b.id));
    const nextS = STREAKS.find((n) => n > cur), left = nextS ? nextS - cur : 0;
    const hint = !nextS ? "" : left === 1 ? `Ôn ${today ? "thêm ngày mai" : "hôm nay"} là có huy hiệu “Chuỗi ${nextS} ngày”.` : `Ôn ${left} ngày liền nữa là có huy hiệu “Chuỗi ${nextS} ngày”.`;
    return `<section class="panel" id="badges"><div class="label">Huy hiệu</div>
      ${fresh.length ? `<div class="fb ok" id="newBadge">🎉 Bạn vừa nhận huy hiệu ${fresh.map((b) => `“${esc(b.name)}”`).join(", ")}!</div>` : ""}
      <div class="tags">${list.map((b) => `<span class="badge${b.got ? " on" : ""}" aria-label="${esc(b.name)}: ${b.got ? "đã đạt" : "chưa đạt"}"><span aria-hidden="true">${b.icon}</span> ${nb(esc(b.name))}</span>`).join("")}</div>
      ${hint ? `<p class="small muted" id="badgeHint">${hint}</p>` : ""}</section>`;
  }
  function renderToday(s) {
    const all = Store.resultsFor(s.id), results = graded(all), t = today0();
    const { ev, picks, count } = todayPicks(s, results), main = picks[0], more = picks[1], next = nextEvent(s.grade);
    const card = main ? `<section class="hero today" id="today"><span class="label">Hôm nay ôn gì?</span>
        <h1>${nb(esc(main.title))}</h1><p>${esc(main.why)}</p>
        <a class="btn main lg" id="todayGo" href="${main.href}">Bắt đầu</a>
        ${ev ? `<a class="linkbtn" id="toBanks" href="#/practice?ki=${encodeURIComponent(ev.id)}">${nb(`Tất cả bài ôn cho kì này · ${count} bài ôn`)} →</a>` : ""}</section>`
      : `<section class="hero today" id="today"><span class="label">Hôm nay ôn gì?</span><h1>Chưa có bài ôn cho lớp ${s.grade}</h1><p>Quản trị viên có thể nhập thêm đề trong mục Quản trị.</p></section>`;
    view.innerHTML = `<div class="stack">
      <div><h2>Chào ${esc(s.name)}! ${avIn(s.avatar)}</h2><span class="muted">${WDL[t.getDay()]} ${dm(isoDay(t))} · ${esc(gradeTxt(s))}</span></div>
      ${unsentBar(s.id)}
      ${s.locked ? `<div class="notice">Hồ sơ này đang khóa vì tài khoản có nhiều hồ sơ con hơn gói hiện tại cho phép. Vẫn xem được kết quả cũ, bài làm mới chưa được lưu.</div>` : ""}
      ${card}
      ${more ? `<div class="panel pick" id="todayMore"><span class="pick-ic" aria-hidden="true">📖</span><span class="grow"><b>${nb(esc(more.title))}</b><span class="small muted">${nb(esc(more.why))}</span></span><a class="btn sm" href="${more.href}" aria-label="Làm ${esc(more.title)}">Làm</a></div>` : ""}
      ${streakPanel(results)}
      ${badgePanel(s, results)}
      <section class="sec" id="recent"><div class="row between"><h2>Kết quả gần đây</h2><a class="linkbtn" href="#/results">Xem tất cả →</a></div>${resultsList(all.slice(0, 3))}</section>
      ${next ? `<section class="sec" id="nextEvent"><h2>Kì thi tiếp theo</h2><div class="timeline">${eventRow(next, { grade: s.grade, student: s, results })}</div></section>` : ""}
    </div>`;
    wireEvents(view, s.grade, s); wireGo(); wireUnsent(s.id);
  }
  /* Tab Bài ôn: mọi bài ôn của khối, gom theo kì thi (practiceGroups). ?ki=<mã kì thi>: mở sẵn và cuộn tới nhóm đó. */
  function renderPractice(s, query) {
    view.innerHTML = `<div class="stack"><div><h2>Bài ôn lớp ${s.grade}</h2><span class="muted">Gom theo kì thi. Bấm tên kì để mở hoặc thu gọn.</span></div>
      <section class="sec" id="allPractice">${practiceGroups(s.grade, true)}</section></div>`;
    wireGo();
    const g = query && query.ki ? $(`#allPractice [data-grp="${CSS.escape(query.ki)}"]`) : null;
    if (g) { g.open = true; g.scrollIntoView({ behavior: "smooth", block: "start" }); }
  }
  /* Tab Kết quả: ba ô số liệu, theo môn, chủ đề hay sai, 30 bài gần nhất. */
  function renderResults(s) {
    const all = Store.resultsFor(s.id), results = graded(all);
    view.innerHTML = `<div class="stack"><div><h2>Kết quả của bạn</h2><span class="muted">${all.length ? `${all.length} bài đã làm` : "Chưa có bài nào"}</span></div>
      ${statsRow(results)}
      ${subjectPanel(results)}
      ${weakPanel(results)}
      <section class="sec" id="allResults"><h2>Bài đã làm</h2>${resultsList(all.slice(0, 30))}${all.length > 30 ? `<p class="small muted">Chỉ hiện 30 bài gần nhất.</p>` : ""}</section></div>`;
    wireGo();
  }
  function resultsList(list) {
    if (!list.length) return `<div class="panel muted">Chưa có kết quả. Làm một bài ôn để bắt đầu.</div>`;
    return `<div class="list">${list.map((r) => `<div class="item"><div class="grow"><b>${nb(esc(r.label || "Bài ôn"))}</b><span class="small muted">${esc(ago(r.at))}${r.subject ? " · " + esc(r.subject) : ""}${r.mode === "exam" ? " · làm như thi" : isSelf(r) ? " · tự luận tự chấm" : ""}</span></div><b style="font-variant-numeric:tabular-nums">${isSelf(r) ? nf(r.r / 4) + "/" + nf(r.t / 4) + " điểm" : nf(r.r) + "/" + r.t}</b></div>`).join("")}</div>`;
  }

  /* ================= BÁO CÁO TUẦN = HỒ SƠ CỦA CON =================
     Phụ huynh, quản trị mở từ thẻ của con (#/child/<mã>; #/report/<mã> là cùng trang, Phiên UX2). Tóm tắt 7 ngày gần nhất
     (hôm nay và 6 ngày trước), in được (@media print trong css/app.css). Đầu trang chỉ có hình, bên cạnh là tên con, dòng lớp và dòng
     "Báo cáo <ngày> – <ngày>" (.rp-who; nhãn "OnUp · Báo cáo tuần · <tên gia đình>" chỉ hiện khi in). Lịch thi của khối con là link "Xem cả năm" ở mục
     Kì thi sắp tới (#rpCal), danh sách bài ôn của con là link cuối mục Gợi ý ôn tuần sau (#rpPractice); bài làm trước tuần này thu
     gọn ở cuối (#rpOlder, không in). Ngay dưới đầu trang là khối "Tin nhắn sẽ gửi" (#rpMsg, không in; Phiên UX8): xem trước tin nhắn
     chữ thuần (reportMsg), nút chính "Gửi báo cáo" (#rpSend) và "Chép tin nhắn" (#rpCopy); nút phụ "In" (#rpPrint) ở hàng trên cùng.
     Chỉ đọc qua Store nên chạy như nhau ở bản trên máy và bản đám mây. */
  const MAX_SECS = 5400; // một lần làm quá 90 phút thường là quên đóng bài: chỉ tính 90 phút
  function weekStats(list) {
    const [r, t] = sumRT(list);
    return { n: list.length, r, t, days: new Set(list.map((x) => isoDay(new Date(x.at)))).size, mins: Math.round(list.reduce((a, x) => a + Math.min(+x.s || 0, MAX_SECS), 0) / 60) };
  }
  /* Gợi ý dạng câu thường (chưa esc), tối đa 5 câu, việc cần làm trước đứng trước. Mỗi gợi ý { k, t, m }: t là câu ở mục Gợi ý ôn
     tuần sau; k là loại ("days" ngày ôn, "exam" kì thi gần nhất, "weak" môn đúng dưới 70%, "topics" chủ đề hay sai, "later" môn chưa ôn,
     làm như thi), để tin nhắn gửi báo cáo (reportMsg) bỏ gợi ý trùng với dòng đã có; m là câu dùng trong tin nhắn khi khác t
     (gợi ý ngày ôn bỏ câu đầu: số ngày ôn đã có ở dòng số bài). */
  function weekTips(s, week, all) {
    const tips = [], st = weekStats(week), nm = s.name;
    const days = (fact, adv) => tips.push({ k: "days", t: fact + " " + adv, m: adv });
    if (!st.n) days(`${nm} chưa làm bài nào trong 7 ngày qua.`, "Tuần sau bắt đầu lại nhẹ nhàng: mỗi ngày một đề ngắn 20–30 phút.");
    else if (st.days < 5) days(`${nm} ôn ${st.days}/7 ngày.`, "Tuần sau cố gắng ôn ít nhất 5 ngày, mỗi ngày 20–30 phút, thay vì làm dồn một buổi.");
    else days(`${nm} ôn đều ${st.days}/7 ngày.`, "Giữ nhịp này cho tuần sau.");
    const nx = nextEvent(s.grade);
    const later = [];
    if (nx) {
      const { mods, bks } = practiceFor(nx, s.grade), items = mods.concat(bks);
      const did = (x) => all.some((r) => r.refId === x.id), done = items.filter(did);
      const todo = items.filter((x) => !x.pool && !did(x)).map((x) => x.title); // đề ngẫu nhiên không tính là bài chưa làm
      let t = `${nx.title}: ${status(nx) === "now" ? "đang diễn ra" : "còn " + daysTo(nx) + " ngày"}.`;
      if (todo.length) t += ` Bài ôn chưa làm: ${todo.slice(0, 3).join("; ")}${todo.length > 3 ? " và " + (todo.length - 3) + " bài khác" : ""}.`;
      else if (done.length) {
        const low = done.map((x) => { const [r, n] = sumRT(all.filter((y) => y.refId === x.id)); return { title: x.title, p: pct(r, n) }; }).sort((a, b) => a.p - b.p)[0];
        t += low.p < 90 ? ` Ôn tiếp “${low.title}”: đang đúng ${low.p}%.` : ` Các bài ôn của kì này đang đúng từ ${low.p}% trở lên.`;
      }
      tips.push({ k: "exam", t });
      const subs = [...new Set(mods.flatMap((m) => Object.values(m.subjects || {})).concat(bks.map((b) => b.subject)).filter(Boolean))];
      const miss = subs.filter((x) => !week.some((r) => r.subject === x));
      if (st.n && miss.length) later.push({ k: "later", t: `Tuần này chưa ôn ${miss.join(", ")} cho kì thi sắp tới.` });
      if (st.n && items.length && status(nx) === "future" && daysTo(nx) <= 14 && !week.some((r) => r.mode === "exam")) later.push({ k: "later", t: "Sắp thi: làm ít nhất một đề ở chế độ “Làm như thi” (có tính giờ) để quen với thời gian làm bài." });
    }
    const weak = bySubject(week).filter((x) => x.t >= 5 && pct(x.r, x.t) < 70);
    if (weak.length) tips.push({ k: "weak", t: `${weak.map((x) => x.name + " mới đúng " + pct(x.r, x.t) + "%").join(", ")}: xem lại lời giải các câu sai rồi làm lại đề đó.` });
    const tp = wrongTopics(week).slice(0, 3).map(([t]) => t);
    if (tp.length) tips.push({ k: "topics", t: `Ôn lại chủ đề hay sai: ${tp.join(", ")}.` });
    return tips.concat(later).slice(0, 5);
  }
  /* Tin nhắn gửi báo cáo tuần (Phiên UX8, X14): chữ thuần để bố mẹ gửi ông bà, cô giáo hay người kia trong nhà qua Zalo, khoảng
     600 chữ cái trở xuống (MSG_MAX). Từng dòng: tên con và khoảng ngày (span, như đầu trang); số bài, số ngày ôn, số phút; điểm trung bình so với tuần trước;
     tối đa 3 chủ đề hay sai (ngăn bằng dấu chấm phẩy); kì thi gần nhất (ngày, còn N ngày); 1–2 gợi ý của weekTips, bỏ gợi ý về kì thi và về chủ đề hay sai (trùng
     hai dòng trên), gợi ý thứ hai chỉ thêm khi tin nhắn chưa quá MSG_MAX; dòng cuối "Gửi từ OnUp.". Không có tên đăng nhập, tên gia
     đình hay đường dẫn nào. */
  const MSG_MAX = 600;
  function reportMsg(s, span, week, st, pv, tips) {
    const out = [`Báo cáo tuần của ${s.name} (${span})`], end = "Gửi từ OnUp.";
    out.push(st.n ? `• Làm ${st.n} bài, ôn ${st.days}/7 ngày, ${st.mins} phút.` : "• Chưa làm bài nào trong 7 ngày qua.");
    if (st.t) out.push(`• Điểm trung bình ${d10(st.r, st.t)}/10 (tuần trước ${pv.t ? d10(pv.r, pv.t) : "chưa làm bài"}).`);
    const tp = wrongTopics(week).slice(0, 3).map(([t]) => t);
    if (tp.length) out.push(`• Chủ đề hay sai: ${tp.join("; ")}.`); // "; ": tên chủ đề có thể có dấu phẩy ("Phép cộng, phép trừ")
    const nx = nextEvent(s.grade);
    if (nx) {
      const when = nx.end && nx.end !== nx.start ? dm(nx.start) + " – " + dmy(nx.end) : dmy(nx.start);
      out.push(status(nx) === "now" ? `• Đang diễn ra: ${nx.title}, ${when}.` : `• Sắp tới: ${nx.title}, ${when} (${nx.tentative ? "dự kiến, " : ""}còn ${daysTo(nx)} ngày).`);
    }
    tips.filter((x) => x.k !== "exam" && x.k !== "topics").slice(0, 2).forEach((x, i) => {
      const line = "• Gợi ý: " + (x.m || x.t);
      if (!i || out.concat(line, end).join("\n").length <= MSG_MAX) out.push(line);
    });
    return out.concat(end).join("\n");
  }
  /* Gửi tin nhắn (UX8): máy có bảng chia sẻ thì navigator.share({ title, text }) (người dùng hủy thì thôi, không báo gì; bảng chia sẻ
     đang mở thì lần bấm sau bị trình duyệt từ chối, cũng bỏ qua); không có, hoặc chia sẻ lỗi khác, thì chép tin nhắn (copyMsg). Chép
     không được thì chọn sẵn chữ trong khối xem trước để bố mẹ bấm giữ mà chép. Trình duyệt chỉ cho chia sẻ, chép trong lúc người dùng
     đang bấm: gọi ngay trong sự kiện bấm nút. */
  async function copyMsg(text, box) {
    if (await copyText(text)) { toast("Đã chép tin nhắn. Dán vào Zalo hoặc tin nhắn để gửi.", 4000); return; }
    try { getSelection().selectAllChildren(box); } catch (e) { /* không chọn được: bố mẹ tự bấm giữ */ }
    toast("Chưa chép được. Tin nhắn đã được chọn sẵn, bấm giữ để chép.", 4000);
  }
  async function sendMsg(title, text, box) {
    if (typeof navigator.share !== "function") return copyMsg(text, box);
    try { await navigator.share({ title, text }); }
    catch (e) { if (!e || (e.name !== "AbortError" && e.name !== "InvalidStateError")) await copyMsg(text, box); } // InvalidStateError: bảng chia sẻ đang mở (bấm hai lần)
  }
  function renderReport(s, viewer) {
    const mine = Store.resultsFor(s.id), all = graded(mine), t0 = today0(), from = addDays(t0, -6);
    const span = (a, b, list) => (list || all).filter((r) => { const d = new Date(r.at); return d >= a && d < b; });
    const week = span(from, addDays(t0, 1)), st = weekStats(week), pv = weekStats(span(addDays(from, -7), from));
    const selfWeek = span(from, addDays(t0, 1), mine.filter(isSelf));
    const older = mine.filter((r) => new Date(r.at) < from), olderN = older.length;
    const perDay = {}; week.forEach((r) => { const k = isoDay(new Date(r.at)); perDay[k] = (perDay[k] || 0) + 1; });
    const subs = bySubject(week), topics = wrongTopics(week).slice(0, 6), school = Store.settings().schoolName;
    const evs = Store.events(s.grade).filter((e) => e.kind !== "moc" && e.start && status(e) !== "past").slice(0, 3);
    const a = isoDay(from), b = isoDay(t0), tips = weekTips(s, week, all), msg = reportMsg(s, `${dm(a)} – ${dmy(b)}`, week, st, pv, tips);
    const teacher = viewer.role === "admin" && !Store.cloud; // quản trị bản lưu trên máy: về danh sách học sinh ở tab Tổng quan
    document.title = `Báo cáo tuần · ${s.name} · ${dm(a)}–${dmy(b)}`; // tên file gợi ý khi lưu PDF
    view.innerHTML = `<div class="stack report">
      <div class="row between noprint">${back(teacher ? "#/admin/overview" : "#/home", teacher ? "Danh sách học sinh" : "Các con")}
        <span class="row">${viewer.role === "student" ? "" : `<a class="btn ghost sm" href="#/admin/user/${esc(s.id)}">Sửa hồ sơ</a>`}<button class="btn ghost sm rp-print" id="rpPrint" aria-label="In báo cáo">In</button></span></div>
      <header class="stack tight" id="rpHead">
        <span class="label onlyprint">${nb("OnUp · Báo cáo tuần" + (school ? " · " + esc(school) : ""))}</span>
        <div class="rp-who">${avatar(s, true)}<div><h1>${esc(s.name)}</h1><span class="muted">${nb(esc(gradeTxt(s)) + esc(lockTag(s)))}</span><span class="muted">Báo cáo ${dm(a)} – ${dmy(b)}</span></div></div>
      </header>
      ${s.locked ? `<div class="notice">Hồ sơ này đang khóa vì tài khoản có nhiều hồ sơ con hơn gói hiện tại cho phép. Vẫn xem được kết quả cũ, bài làm mới chưa được lưu.</div>` : ""}
      <section class="panel rp-msg noprint" id="rpMsg" aria-labelledby="rpMsgH"><div class="label" id="rpMsgH">Tin nhắn sẽ gửi</div>
        <div class="share-msg" id="rpMsgText">${esc(msg)}</div>
        <div class="row"><button class="btn main" id="rpSend">${ICO('<path d="M12 15V3M7 8l5-5 5 5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>')}Gửi báo cáo</button><button class="btn ghost" id="rpCopy">Chép tin nhắn</button></div>
        <p class="small muted">Mở bảng chia sẻ của máy (Zalo, Messenger, tin nhắn…). Máy không có bảng chia sẻ thì app chép tin nhắn để bạn dán.</p></section>
      <div class="stats four">
        <div class="stat"><b id="rpCount">${st.n}</b><span>bài đã làm</span><small>Tuần trước: ${pv.n}</small></div>
        <div class="stat"><b id="rpDays">${st.days}/7</b><span>ngày có ôn</span><small>Tuần trước: ${pv.days}/7</small></div>
        <div class="stat"><b id="rpAvg">${d10(st.r, st.t)}</b><span>điểm TB (/10)</span><small>Tuần trước: ${d10(pv.r, pv.t)}</small></div>
        <div class="stat"><b id="rpMins">${st.mins}</b><span>phút làm bài</span><small>Tuần trước: ${pv.mins}</small></div>
      </div>
      <section class="panel"><div class="label">Số bài từng ngày</div><div class="rp-days">${Array.from({ length: 7 }, (_, i) => {
        const d = addDays(from, i), n = perDay[isoDay(d)] || 0;
        return `<div class="rp-day${n ? " on" : ""}"><span>${WD[d.getDay()]}</span><b>${n || "–"}</b><small>${d.getDate()}/${d.getMonth() + 1}</small></div>`;
      }).join("")}</div></section>
      ${st.n ? `<section class="panel" id="rpSubjects"><div class="label">Điểm theo môn</div>${subs.map((x) => `<div class="rp-sub"><div class="row between"><b>${esc(x.name)}</b><b>${d10(x.r, x.t)}<span class="small muted">/10</span></b></div>
          <div class="bar ${pct(x.r, x.t) >= 80 ? "good" : ""}"><i style="width:${pct(x.r, x.t)}%"></i></div><span class="small muted">${x.n} bài · ${nf(x.r)}/${x.t} câu đúng</span></div>`).join("")}</section>
        <section class="panel" id="rpTopics"><div class="label">Chủ đề hay sai</div>${topics.length ? `<div class="list">${topics.map(([t, n]) => `<div class="item"><span class="grow">${esc(t)}</span><b class="small">${n} câu sai</b></div>`).join("")}</div>`
          : `<p class="small muted">Không có câu sai nào được ghi theo chủ đề. Bài ôn IOE và ôn giữa kì I chỉ gửi về điểm tổng.</p>`}</section>`
        : `<div class="panel muted">Chưa có bài làm nào trong 7 ngày qua.</div>`}
      ${selfWeek.length ? `<section class="panel" id="rpSelf"><div class="label">Tự luận tự chấm</div>
        <p class="small muted">Điểm tự chấm theo thang gợi ý của đề, không tính vào điểm trung bình ở trên.</p>${resultsList(selfWeek)}</section>` : ""}
      <section class="sec" id="rpEvents"><div class="row between"><h2>Kì thi sắp tới</h2><a class="linkbtn noprint" id="rpCal" href="${calHref(viewer)}?g=${s.grade}">Xem cả năm →</a></div>${evs.length ? `<div class="timeline">${evs.map((e) => eventRow(e, { grade: s.grade, student: s, results: all })).join("")}</div>` : `<div class="panel muted">Không còn kì thi nào có lịch trong năm học.</div>`}</section>
      <section class="panel" id="rpTips"><h2>Gợi ý ôn tuần sau</h2><ol class="tips">${tips.map((x) => `<li>${esc(x.t)}</li>`).join("")}</ol>
        <a class="linkbtn noprint" id="rpPractice" href="#/child/${esc(s.id)}/practice">Bài ôn của ${esc(s.name)} →</a></section>
      ${st.n ? `<section class="sec"><h2>Bài đã làm trong tuần</h2>${resultsList(week)}</section>` : ""}
      ${olderN ? `<details class="grp noprint" id="rpOlder"><summary><span class="grow"><b>Bài làm trước tuần này</b><span class="small muted">${olderN} bài${olderN > 30 ? " · hiện 30 bài gần nhất" : ""}</span></span></summary>${resultsList(older.slice(0, 30))}</details>` : ""}
      <p class="small muted">Lập ngày ${dmy(b)}. Điểm quy về thang 10 theo số câu đúng.</p>
    </div>`;
    wireGo(); wireEvents(view, s.grade, s);
    $("#rpPrint").onclick = () => window.print();
    $("#rpSend").onclick = () => sendMsg(`Báo cáo tuần của ${s.name}`, msg, $("#rpMsgText"));
    $("#rpCopy").onclick = () => copyMsg(msg, $("#rpMsgText"));
  }

  /* Bản đám mây: hồ sơ vượt số hồ sơ của gói (máy chủ đặt profiles.locked) không ghi được kết quả mới. */
  const lockTag = (u) => (u.locked ? " · đang khóa theo gói" : "");
  /* Dòng học sinh ở tab Tổng quan của quản trị bản lưu trên máy (giữ nguyên ở Phiên UX2). */
  function childCard(c) {
    const res = graded(Store.resultsFor(c.id)), nx = nextEvent(c.grade), [r, t] = sumRT(within(res, 30));
    return `<button class="item" data-child="${esc(c.id)}">${avatar(c)}<span class="grow"><b>${esc(c.name)}</b>
      <span class="small muted">${esc(gradeTxt(c))}${esc(lockTag(c))} · ${res.length ? "Lần cuối: " + esc(ago(res[0].at)) : "Chưa làm bài nào"}${t ? " · Điểm trung bình tháng " + d10(r, t) + "/10" : ""}</span>
      ${nx ? `<span class="small">Sắp tới: ${esc(nx.title)} · ${esc(range(nx))}</span>` : ""}</span><span aria-hidden="true">›</span></button>`;
  }
  /* Thẻ của một con ở mục "Các con" (trang chủ phụ huynh bản lưu trên máy, tab Các con của khu phụ huynh; Phiên UX2):
     ba ô (số bài hôm nay; điểm hôm nay, chưa làm hôm nay thì điểm trung bình tuần; chuỗi ngày ôn) và dòng kì thi gần nhất của khối con
     ("còn N ngày") kèm môn chưa ôn trong 7 ngày (môn của bài ôn gắn với kì đó, như weekTips). Bấm cả thẻ thì mở báo cáo (#/child/<mã>). */
  const CAL_ICO = ICO('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>');
  function kidCard(c) {
    const res = graded(Store.resultsFor(c.id)), t0 = today0();
    const todayL = res.filter((r) => new Date(r.at) >= t0), week = within(res, 7), [rT, tT] = sumRT(todayL), [rW, tW] = sumRT(week);
    const nx = nextEvent(c.grade);
    let ev = "";
    if (nx) {
      const { mods, bks } = practiceFor(nx, c.grade);
      const subs = [...new Set(mods.flatMap((m) => Object.values(m.subjects || {})).concat(bks.map((b) => b.subject)).filter(Boolean))];
      const miss = subs.filter((x) => !week.some((r) => r.subject === x));
      const when = status(nx) === "now" ? "đang diễn ra" : "còn " + daysTo(nx) + " ngày";
      const missTxt = miss.length > 3 ? miss.slice(0, 3).join(", ") + ` và ${miss.length - 3} môn khác` : miss.join(", ");
      ev = `<span class="kid-ev">${CAL_ICO}<span>${nb(esc(nx.title) + " " + when + (miss.length ? " · chưa ôn " + esc(missTxt) : ""))}</span></span>`;
    }
    return `<a class="panel kid" href="#/child/${esc(c.id)}" data-child="${esc(c.id)}" aria-label="Báo cáo của ${esc(c.name)}">
      <span class="row between"><span class="row" style="gap:10px">${avatar(c)}<span class="stack tight"><b>${esc(c.name)}</b><span class="small muted">${esc(gradeTxt(c))}${esc(lockTag(c))}</span></span></span><span class="chev" aria-hidden="true">›</span></span>
      <span class="stats">
        <span class="stat"><b>${todayL.length ? todayL.length + " bài" : "Chưa ôn"}</b><span>hôm nay</span></span>
        <span class="stat"><b>${tT ? d10(rT, tT) : tW ? d10(rW, tW) : "–"}</b><span>${tT ? "điểm hôm nay" : "điểm TB tuần"}</span></span>
        <span class="stat"><b>${streak(res)}</b><span>chuỗi ngày</span></span>
      </span>${ev}</a>`;
  }
  const kidsHint = `<p class="small muted">Bấm vào thẻ của con để xem báo cáo tuần, chủ đề hay sai và bài đã làm.</p>`;
  /* Thẻ "Bắt đầu trong 3 bước" ở đầu mục Các con (bản đám mây, Phiên UX3): thêm hồ sơ con → đặt mã PIN (không bắt buộc) → đưa máy
     cho con. Hiện đến khi một con đã học: có kết quả (máy nào cũng thấy) hoặc đã chọn hồ sơ con trên máy này (Store.lastUserId()).
     Nút to "Cho con học" (#letStudy) mở màn hình "Ai đang học?" như nút "Chọn hồ sơ khác" ở góc trên; mờ khi chưa có hồ sơ con. */
  const startDone = (studs) => studs.some((c) => c.id === Store.lastUserId() || Store.resultsFor(c.id).length > 0);
  function startCard(studs) {
    const has = studs.length > 0, pinned = studs.filter((c) => c.hasPin), noPin = studs.filter((c) => !c.hasPin), names = (list) => esc(list.map((c) => c.name).join(", "));
    const step = (n, done, now, title, body) => `<li class="step${done ? " done" : now ? " now" : ""}"><span class="n" aria-hidden="true">${done ? "✓" : n}</span><span class="grow"><b>${title}</b>${body}</span></li>`;
    // Bước 2 (Phiên UX3b, X19): ✓ khi mọi con đã có mã PIN. Còn con chưa có thì ghi tên con đó và link "Đặt mã PIN cho <tên>" mở thẳng
    // hồ sơ của con đầu tiên chưa có mã, kể cả khi nhà nhiều con (?tu=batdau: ô Mã PIN được focus, lưu xong về Các con, X18).
    const pinNote = pinned.length ? `${names(pinned)} đã có mã PIN.${noPin.length ? ` ${names(noPin)} chưa có.` : ""}` : "Để anh chị em không vào nhầm hồ sơ của nhau.";
    const pinLink = noPin.length ? `<a class="linkbtn small" href="#/admin/user/${esc(noPin[0].id)}?tu=batdau">Đặt mã PIN cho ${esc(noPin[0].name)}</a>` : "";
    return `<section class="panel start" id="start"><h3>Bắt đầu trong 3 bước</h3><ol class="steps">
      ${step(1, has, !has, "Thêm hồ sơ con", has ? `<span class="small muted">Đã có ${studs.length} hồ sơ: ${names(studs)}.</span>`
        : `<span class="small muted">Tên, khối, lớp và hình đại diện. App không hỏi ngày sinh hay ảnh của con.</span>${Store.can("addChild") ? `<a class="btn main sm" href="#/admin/user/new?role=student">+ Thêm hồ sơ con</a>` : ""}`)}
      ${step(2, has && !noPin.length, false, "Đặt mã PIN (không bắt buộc)", `<span class="small muted">${pinNote}</span>${pinLink}`)}
      ${step(3, false, has, "Đưa máy cho con", `<span class="small muted">Bấm “Cho con học”, con chọn hồ sơ của mình rồi bắt đầu ôn.</span>`)}</ol>
      <button class="btn main lg" id="letStudy" ${has ? "" : "disabled"}>Cho con học</button>
      <p class="small muted" style="text-align:center;margin:0">${has ? "Nút này mở màn hình “Ai đang học?”. Lúc khác, bấm “Chọn hồ sơ khác” ở góc trên." : "Nút này mở màn hình “Ai đang học?” khi đã có hồ sơ con."}</p></section>`;
  }
  function renderParent(p) {
    const kids = Store.childrenOf(p.id);
    view.innerHTML = `<div class="stack">
      <div><h2>Chào ${esc(p.name)}</h2><span class="muted">Theo dõi việc ôn thi của con.</span></div>
      ${backupCard()}
      <section class="sec" id="kids"><div class="row between"><h2>Các con</h2><button class="btn sm" id="addKid">+ Thêm con</button></div>
        ${kids.length ? kids.map(kidCard).join("") + kidsHint : `<div class="panel muted">Chưa có tài khoản con. Bấm “Thêm con” để tạo, hoặc nhờ quản trị viên gắn tài khoản của con vào.</div>`}</section>
      <a class="linkbtn" id="calLink" href="#/calendar">Lịch thi cả năm →</a>
    </div>`;
    $("#addKid").onclick = () => go("#/admin/user/new?role=student");
    wireBackupCard();
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
      <h2>${nb(esc(e.title))}</h2>
      <p>${nb(`<b>${esc(range(e))}</b> · Lớp ${esc(gradesTxt(e))}`)}</p>
      ${e.subjects && e.subjects.length ? `<p>Môn: ${esc(e.subjects.join(", "))}</p>` : ""}
      ${e.scope ? `<p class="small">Phạm vi: ${esc(e.scope)}</p>` : ""}
      ${e.note ? `<p class="small muted">${esc(e.note)}</p>` : ""}
      ${e.kind !== "moc" ? `<div class="label">Bài ôn cho kì này</div>${practiceList(mods, bks, canPlay)}` : ""}
      ${u.role === "admin" ? `<div class="row"><a class="btn sm" href="#/admin/event/${esc(e.id)}">Sửa kì thi</a></div>` : ""}`;
    const old = $("#evDetail"); if (old) old.remove();
    let anchor = $(`[data-ev="${CSS.escape(id)}"]`);
    if (anchor && anchor.nextElementSibling && anchor.nextElementSibling.classList.contains("ev-act")) anchor = anchor.nextElementSibling; // tab Lịch thi của khu phụ huynh: hàng nút dưới thẻ
    if (anchor) anchor.after(box); else view.prepend(box);
    $("#evClose").onclick = () => box.remove();
    box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /* ================= LỊCH THI CẢ NĂM ================= */
  let calGrade = null;
  /* Gom kì thi theo tháng: { months: { yyyymm: [...] }, undated: [...] }. */
  function byMonth(evs) {
    const months = {};
    evs.filter((e) => e.start).forEach((e) => { const d = pd(e.start), k = d.getFullYear() * 100 + d.getMonth(); (months[k] = months[k] || []).push(e); });
    return { months, undated: evs.filter((e) => !e.start) };
  }
  const monthsHTML = (months, row) => Object.keys(months).sort().map((k) => `<div class="month">Tháng ${(k % 100) + 1}/${Math.floor(k / 100)}</div>${months[k].map(row).join("")}`).join("");
  /* ?g=<khối> (link "Xem cả năm" ở mục Kì thi sắp tới của báo cáo con) chọn sẵn tab khối. */
  function renderCalendar(u, query) {
    const fixed = u.role === "student" ? u.grade : null;
    const kidGrades = u.role === "parent" || (Store.cloud && u.role === "admin") ? gradesOf(Store.childrenOf(u.id)) : [];
    const gl = gradeList(kidGrades);
    if (fixed) calGrade = fixed;
    else if (query && gl.includes(+query.g)) calGrade = +query.g;
    else if (calGrade == null) calGrade = kidGrades.length === 1 ? kidGrades[0] : 0;
    // Học sinh (tab Lịch thi, UX1): chỉ kì thi chưa qua của khối mình, không có mốc năm học; mỗi kì có "Còn N ngày" (eventRow).
    // Tab "Mọi khối": chỉ kì thi của các khối đang hiện (gl), không có kì thi của khối chưa bật.
    const evs = (calGrade ? Store.events(calGrade) : shownEvents(Store.events(), gl)).filter((e) => !fixed || (e.kind !== "moc" && status(e) !== "past"));
    const { months, undated } = byMonth(evs);
    const student = u.role === "student" ? u : null, results = student ? graded(Store.resultsFor(u.id)) : [];
    const year = esc(Store.settings().schoolYear || "2026–2027");
    view.innerHTML = `<div class="stack">
      ${fixed ? "" : `<div class="row between">${back("#/home", "Trang chính")}${u.role === "admin" ? `<a class="btn sm" href="#/admin/event/new">+ Thêm kì thi</a>` : ""}</div>`}
      ${fixed ? `<div><h1>Lịch thi lớp ${fixed}</h1><p class="muted small">Năm học ${year}. Ngày dự kiến sẽ đổi khi trường báo lịch.</p></div>`
        : `<div><h1>Lịch thi năm học ${year}</h1><p class="muted small">Kiểm tra định kì, IOE và các mốc năm học. Mục “Dự kiến” sẽ được cập nhật khi trường thông báo.</p></div>`}
      ${fixed ? "" : `<div class="tabs" role="group" aria-label="Chọn khối">${[[0, gl.length === 2 ? "Cả hai khối" : "Mọi khối"]].concat(gl.map((g) => [g, gradeName(g)])).map(([g, t]) => `<button data-g="${g}" aria-pressed="${calGrade === g}">${t}</button>`).join("")}</div>`}
      <div class="timeline">
        ${monthsHTML(months, (e) => eventRow(e, { grade: calGrade || null, student, results }))}
        ${undated.length ? `<div class="month">Chưa có lịch</div>${undated.map((e) => eventRow(e, { grade: calGrade || null })).join("")}` : ""}
        ${fixed && !evs.length ? `<div class="panel muted">Không còn kì thi nào trong năm học.</div>` : ""}
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

  /* ================= BÀI ĐÃ GỬI CHO BỐ MẸ CHƯA (bản đám mây, Phiên UX6, X10) =================
     Bản đám mây đưa kết quả vào hộp gửi trên máy rồi mới gửi lên máy chủ (js/store-supabase.js). Sau khi lưu, whenSent chờ lượt
     gửi xong (tối đa SEND_WAIT) rồi gọi cb(true) khi hồ sơ không còn bài chờ gửi, cb(false) khi còn; quá giờ thì báo chưa gửi,
     gửi xong muộn hơn thì báo lại. Phiên đăng nhập đã hết (bài nằm lại trong hộp gửi, kho đã báo "Bố mẹ đăng nhập lại…"): cb(false, true),
     nơi gọi không hiện thông báo của mình để khỏi che lời nhắc đó. Màn kết quả đề ghi một dòng (#qzSaved, savedLine), bài ôn trong khung ghi trong thông báo.
     Còn bài chưa gửi thì trang chính của con và mục Các con của khu phụ huynh có dòng "N bài chưa gửi" với nút "Gửi lại"
     (unsentBar); số bài đổi thì Store.onChange vẽ lại trang. Bản lưu trên máy không có hộp gửi: whenSent trả false, không có dòng. */
  const SEND_WAIT = 4000;
  const CLOCK = ICO('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>');
  function whenSent(u, cb) {
    const me = Store.user(u.id);
    if (!Store.cloud || (me && me.locked)) return false; // hồ sơ bị khóa theo gói: máy chủ không nhận bài mới, kho báo lỗi riêng
    let last = null;
    const tell = (ok) => { if (ok !== last) { last = ok; cb(ok, Store.authState() !== "ready"); } };
    const timer = setTimeout(() => tell(false), SEND_WAIT);
    Store.sendPending().then(() => { clearTimeout(timer); tell(Store.authState() === "ready" && !Store.pendingResults(u.id)); });
    return true;
  }
  // el: chỗ trống #qzSaved của màn kết quả lượt vừa lưu (đã rời màn đó thì dòng không hiện ở đâu cả)
  function savedLine(el, ok, L) {
    if (!el) return;
    el.className = "saved " + (ok ? "ok" : "wait");
    el.innerHTML = (ok ? ICO('<path d="m5 12 5 5 9-10"/>') : CLOCK) + `<span>${ok ? L.appSent : L.appPending}</span>`;
    el.hidden = false;
  }
  // userId: trang chính của con (bài của con); null: khu phụ huynh (mọi hồ sơ con của tài khoản, làm trên máy này)
  function unsentBar(userId) {
    const n = Store.pendingResults(userId);
    if (!n) return "";
    return `<div class="unsent" id="unsent" data-n="${n}">${CLOCK}<span class="grow">${userId ? `${n} bài chưa gửi cho bố mẹ` : `${n} bài làm trên máy này chưa gửi đi`}</span><button class="linkbtn" id="sendNow">Gửi lại</button></div>`;
  }
  function wireUnsent(userId) {
    const b = $("#sendNow");
    if (!b) return;
    b.onclick = async () => {
      b.disabled = true; b.textContent = "Đang gửi…";
      await Store.sendPending();
      b.disabled = false; b.textContent = "Gửi lại";
      // Phiên đăng nhập đã hết (bài vẫn nằm trên máy): không báo gì thêm, để lời nhắc "Bố mẹ đăng nhập lại…" của kho còn hiện
      if (Store.authState() !== "ready") return;
      const n = Store.pendingResults(userId);
      toast(n ? "Chưa gửi được. App sẽ thử lại khi có mạng." : "Đã gửi", 4000);
      // Lượt gửi làm đổi số bài thì kho đã vẽ lại trang (Store.onChange). Tab khác trên cùng máy gửi trước thì số bài đã đổi mà lượt
      // này không đổi gì: vẽ lại để dòng khớp số thật (sau lượt vẽ lại của kho, nếu có)
      setTimeout(() => { const bar = $("#unsent"); if (bar && bar.contains(b) && +bar.dataset.n !== n) route(); }, 0);
    };
  }

  /* ================= MỞ BÀI ÔN ================= */
  /* Ngôn ngữ của bài ôn dạng trang (TA2): lang trong data/modules.js ("en": bài IOE); không ghi thì bài chỉ có môn Tiếng Anh (ta)
     là tiếng Anh. Phần app bọc ngoài (nút quay lại, dòng ghi chú, hộp hỏi khi rời bài, thông báo lưu điểm) lấy chữ ở Quiz.TXT;
     dòng chỉ phụ huynh thấy ("Xem thử, không lưu điểm") giữ tiếng Việt. */
  const modLang = (m) => (Quiz.TXT[m.lang] ? m.lang : Object.keys(m.subjects || {}).join() === "ta" ? "en" : "vi");
  function renderPlay(u, id) {
    const m = modById(id);
    if (!m) { renderMissing("Không tìm thấy bài ôn", "Bài ôn này không có trong app, hoặc đã được bỏ đi."); return; }
    if (wrongGrade(u, m.grade)) return;
    const src = m.path + "?u=" + encodeURIComponent(u.id) + "&m=" + encodeURIComponent(m.id);
    const lang = modLang(m), L = Quiz.TXT[lang], en = lang === "en" ? ' lang="en"' : "";
    const note = u.role === "student" ? L.appScoreSaved : ["Xem thử, không lưu điểm", "Chế độ xem thử: điểm không được lưu."];
    view.innerHTML = `<div class="player"${en}>
      <div class="row between">${back("#/home", L.appHome)}<span class="small muted note"${u.role === "student" ? "" : ' lang="vi"'} title="${note[1]}">${note[0]}</span></div>
      <iframe id="playerFrame" title="${esc(m.title)}" src="${esc(src)}"></iframe></div>`;
    document.body.classList.add("playing");
    wireGo();
    if (u.role !== "student") return;
    // Bài ôn đang làm một lượt thì có nút #endBtn ("Nộp bài sớm", "Dừng luyện"…), hoặc hộp hỏi lại #yesEnd của nút đó;
    // trang đầu và trang kết quả không có (hợp đồng với bài ôn, xem CLAUDE.md). Khung cùng origin nên app đọc được, không ghi gì.
    // Mở bằng file:// hoặc không đọc được khung thì không hỏi.
    const fr = $("#playerFrame");
    const busy = () => { try { const d = fr.contentDocument; return !!(d && d.querySelector("#endBtn, #yesEnd")); } catch (e) { return false; } };
    guard = Object.assign({ busy }, L.appLeavePlay);
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
    const L = Quiz.TXT[modLang(m)];
    // bản đám mây (UX6): "18/20 câu đúng. Đã lưu và gửi cho bố mẹ." hoặc "… Sẽ gửi cho bố mẹ khi có mạng."
    if (!whenSent(u, (ok, expired) => expired || toast(L.appModScore(+d.r, +d.t) + " " + (ok ? L.appSent : L.appPending), ok ? 3500 : 5000))) toast(L.appSavedModule(+d.r, +d.t));
  });

  /* ================= LÀM BÀI TỪ NGÂN HÀNG ================= */
  let quizRun = null;
  /* Chế độ tập trung (Phiên UX5, X5): body.quizzing ẩn hình đại diện (nút tài khoản) của thanh trên và thanh tab dưới, chỉ còn
     chữ OnUp (vẫn qua chốt rời trang). Bật khi một lượt bắt đầu, tắt khi lượt xong (opts.onStart, onEnd của Quiz.run); route() cũng tắt. */
  const focusMode = (on) => document.body.classList.toggle("quizzing", on);
  const essayN = (qs) => (qs || []).filter((q) => q.type === "essay").length;
  /* Đề ngẫu nhiên (đề có pool, xem đầu data/banks/index.js): mỗi lần mở là rút một bộ câu mới theo ma trận (Quiz.draw),
     ưu tiên câu học sinh chưa làm hoặc hay sai. Lịch sử từng câu của mỗi học sinh với mỗi đề ngẫu nhiên ghi ở localStorage
     (ontap_pool_v1: "<mã học sinh>|<mã đề>" → { <Quiz.key(câu)>: [số lần làm, số lần sai] }), chỉ trên máy này, từ opts.onMarks
     của Quiz.run: cả câu tự luận đã làm (tự chấm dưới một nửa số điểm là sai); cộng với kết quả đã lưu (dùng chung mọi máy):
     đã làm đề cố định nào trong pool.from thì câu của đề đó tính là đã làm, chủ đề nằm trong wrongTopics của kết quả (đề cố định
     đó hoặc chính đề ngẫu nhiên) thì tính là hay sai. */
  const PoolHist = (() => {
    const KEY = "ontap_pool_v1", MAX = 600;
    let mem = {};
    const read = () => { try { const o = JSON.parse(localStorage.getItem(KEY) || "{}"); return o && typeof o === "object" ? o : mem; } catch (e) { return mem; } };
    const write = (o) => { mem = o; try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) { /* chỉ giữ trong bộ nhớ */ } };
    return {
      get: (uid, pid) => read()[uid + "|" + pid] || {},
      // marks: [[mã câu, điểm 0–1]] của một lượt làm xong: mỗi câu thêm một lần làm, điểm dưới 1 thêm một lần sai.
      // late: điểm tự chấm câu tự luận sau khi nộp bài (làm như thi), lần làm đã ghi lúc nộp nên chỉ thêm lần sai.
      mark(uid, pid, marks, late) {
        const o = read(), k = uid + "|" + pid, h = (o[k] = o[k] || {});
        (marks || []).forEach(([key, pts]) => { const x = (h[key] = h[key] || [0, 0]); if (!late) x[0]++; if (pts < 1) x[1]++; });
        const keys = Object.keys(h);
        if (keys.length > MAX) keys.slice(0, keys.length - MAX).forEach((key) => delete h[key]);
        write(o);
      }
    };
  })();
  function poolHist(u, b) {
    const local = PoolHist.get(u.id, b.id), byRef = {};
    graded(Store.resultsFor(u.id)).filter((r) => r.source === "bank").forEach((r) => (byRef[r.refId] = byRef[r.refId] || []).push(r));
    const wrongIn = (list, topic) => list.filter((r) => (r.wrongTopics || []).includes(topic)).length;
    return (q) => {
      const h = local[Quiz.key(q)] || [0, 0], fixed = q.src && q.src !== b.id ? byRef[q.src] || [] : [];
      return { done: h[0] + fixed.length, wrong: h[1] + wrongIn(fixed, q.topic) + (wrongIn(byRef[b.id] || [], q.topic) ? 1 : 0) };
    };
  }
  function renderQuiz(u, id) {
    const b = Store.bank(id);
    if (!b) { renderMissing("Không tìm thấy đề", "Đề này không có trong app, hoặc đã được bỏ đi."); return; }
    if (wrongGrade(u, b.grade)) return;
    if (!b.questions) { loadQuiz(u, b); return; }
    // Đề Tiếng Anh (TA2): mọi chữ quanh đề bằng tiếng Anh, lấy từ bảng chữ của js/quiz.js (Quiz.lang, Quiz.TXT, Quiz.title);
    // dòng chỉ phụ huynh thấy ("Chế độ xem thử") giữ tiếng Việt. Tên đề trong kết quả (label) vẫn là tên trong danh mục.
    const lang = Quiz.lang(b), L = Quiz.TXT[lang], en = lang === "en";
    // hist đọc lại mỗi lần rút: "Làm đề khác" tính cả lượt vừa làm xong
    const hist = () => (b.pool && u.role === "student" ? poolHist(u, b) : null);
    let drawn = b.pool ? Quiz.draw(b, hist(), lang) : null;
    const qs = drawn ? drawn.questions : b.questions, nSrc = b.pool ? (b.pool.from || []).length : 0;
    // Lần trước cùng đề: kết quả gần nhất của học sinh với đề này, lọc bằng graded() (kết quả tự chấm cùng refId tính bằng phần tư điểm).
    // Màn mở đề có thẻ "Lần trước" (UX5, X9); màn kết quả so sánh (UX1, previous) đọc lúc kết thúc lượt, trước khi lưu.
    const last = () => (u.role === "student" ? graded(Store.resultsFor(u.id)).find((x) => x.source === "bank" && x.refId === b.id) || null : null);
    const previous = () => { const r = last(); return r ? { r: r.r, t: r.t } : null; };
    /* Màn mở đề (UX5, X9): thẻ "Lần trước: 21/25 câu đúng" (lúc làm · cách làm · thời gian; chưa làm lần nào thì không có), rồi hai thẻ
       chọn cách làm, mỗi thẻ có biểu tượng và một dòng giải thích. Đề không có số phút thì chỉ có thẻ Ôn luyện. */
    const pr = last();
    const prevCard = !pr ? "" : `<section class="panel prev" id="qPrev">${ICO('<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>')}<span class="grow">
        <b>${L.appPrev(Quiz.fmtN(pr.r, lang), pr.t)}</b><span class="small muted">${nb(esc([ago(pr.at, L), L.appPrevMode[pr.mode], pr.s > 0 ? L.appDur(pr.s) : ""].filter(Boolean).join(" · ")))}</span></span></section>`;
    const modeCard = (id, ic, head, note, main) => `<button class="mode${main ? " main" : ""}" id="${id}">${ICO(ic)}<span class="grow"><b>${head}</b><span class="small muted">${note}</span></span>${ICO('<path d="m9 6 6 6-6 6"/>')}</button>`;
    view.innerHTML = `<div class="stack"${en ? ' lang="en"' : ""}>${back("#/home", L.appHome)}
      <section class="hero"><span class="label">${nb(`${L.appGrade(b.grade)} · ${en ? L.english : esc(b.subject)}${b.pool ? " · " + L.appRandom : ""}`)}</span><h1>${nb(esc(Quiz.title(b, lang)))}</h1>
        <p>${b.pool ? L.appPoolIntro(qs.length, b.questions.length, nSrc) : L.appCount(qs.length)}${essayN(qs) ? L.appEssayN(essayN(qs)) : ""}.${b.note ? " " + esc(b.note) : ""}</p>
        ${drawn && drawn.notes.length ? `<p class="small" id="qNotes">${L.appNotes(esc(drawn.notes.join("; ")))}</p>` : ""}</section>
      ${prevCard}
      <div class="label" id="qModes">${L.appChoose}</div>
      <div class="modes" role="group" aria-labelledby="qModes">${modeCard("qPractice", '<path d="M4 5a2 2 0 0 1 2-2h6v16H6a2 2 0 0 0-2 2z"/><path d="M20 5a2 2 0 0 0-2-2h-6v16h6a2 2 0 0 1 2 2z"/>', L.appPractice, L.appPracticeNote, true)}${b.minutes ? modeCard("qExam", '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', nb(esc(L.appExam(b.minutes))), L.appExamNote) : ""}</div>
      ${u.role !== "student" ? `<div class="notice" lang="vi">Chế độ xem thử: điểm không được lưu.</div>` : ""}</div>`;
    wireGo();
    // Báo câu sai (Phiên R1): ai cũng báo được, kể cả phụ huynh, quản trị đang xem thử. Câu của đề ngẫu nhiên ghi mã đề gốc (q.src)
    // để người làm đề tìm đúng file; mỗi người chỉ báo một câu một lần (link thành "Đã báo câu này").
    const bankOf = (q) => q.src || b.id;
    const start = (mode) => {
      const run = (quizRun = Quiz.run(view, drawn ? Object.assign({}, b, { questions: drawn.questions }) : b, {
        mode, lang, onExit: () => go("#/home"),
        // Chế độ tập trung (UX5, X5): trong lúc làm một lượt (cả "Làm lại", "Ôn lại câu sai"), thanh trên chỉ còn chữ OnUp
        onStart: () => focusMode(true), onEnd: () => focusMode(false),
        name: u.role === "student" ? u.name : "", previous: u.role === "student" ? previous : undefined,
        // "Làm đề khác" ở trang kết quả: rút bộ câu mới (đã tính cả lượt vừa làm)
        redraw: b.pool ? () => { drawn = Quiz.draw(b, hist(), lang); if (drawn.notes.length) toast(L.appNotesToast(drawn.notes.join("; "))); return { questions: drawn.questions }; } : undefined,
        // lịch sử câu của đề ngẫu nhiên, chỉ của học sinh (xem PoolHist)
        onMarks: b.pool && u.role === "student" ? (marks, late) => PoolHist.mark(u.id, b.id, marks, late) : undefined,
        reported: (q) => Store.reports().some((r) => r.userId === u.id && r.bankId === bankOf(q) && r.qKey === q.key),
        onReport: (q, { reason, note }) => Store.addReport({ userId: u.id, bankId: bankOf(q), qKey: q.key, qText: Quiz.text(q), reason, note }),
        onFinish: (res) => {
          if (u.role !== "student") return;
          Store.addResult(Object.assign({ userId: u.id, source: "bank", refId: b.id, subject: b.subject, label: b.title }, res));
          // bản đám mây (UX6): dòng #qzSaved ở màn kết quả và thông báo ghi bài đã gửi cho bố mẹ chưa; bản lưu trên máy giữ "Đã lưu kết quả"
          // Quiz.run gọi onFinish ngay trước khi vẽ màn kết quả (lưu điểm tự chấm khi làm như thi: màn đó đã có): lấy chỗ trống của đúng màn
          // này ở microtask kế tiếp, xếp trước mọi lần whenSent gọi lại. Gửi xong muộn mà đã sang lượt khác thì không ghi (chỗ đó đã bị gỡ).
          let line = null;
          Promise.resolve().then(() => (line = $("#qzSaved")));
          if (!whenSent(u, (ok, expired) => { if (line && line.isConnected) savedLine(line, ok, L); if (!expired) toast(ok ? L.appSent : L.appPending, ok ? 3000 : 5000); })) toast(res.mode === "self" ? L.appSavedSelf : L.appSaved);
        }
      }));
      // Xem thử (phụ huynh, quản trị) không lưu điểm nên không cần hỏi.
      // Gọi qua run: "Làm lại" thay busy/answered/submit của lượt mới vào cùng đối tượng.
      // Chưa trả lời câu nào thì rời là thoát đề, không nộp (nộp cũng không lưu điểm).
      if (u.role === "student") guard = {
        busy: () => run.busy(),
        leave: () => (run.answered() ? run.submit() : run.stop()),
        text: () => (!run.answered() ? L.appLeaveNone : run.retry ? L.appLeaveRetry : run.exam ? L.appLeaveExam : L.appLeavePractice)
      };
    };
    $("#qPractice").onclick = () => start("practice");
    if ($("#qExam")) $("#qExam").onclick = () => start("exam");
  }
  /* Câu hỏi của đề có sẵn chỉ tải khi mở đề (Store.loadBank). Tải xong mà đã sang màn hình khác thì thôi. Mất mạng mà
     chưa mở đề nào của môn này lần nào (chưa có trong đệm của sw.js) thì báo và cho thử lại. */
  function loadQuiz(u, b) {
    const lang = Quiz.lang(b), L = Quiz.TXT[lang]; // đề Tiếng Anh: màn tải đề cũng bằng tiếng Anh (TA2)
    view.innerHTML = `<div class="stack"${lang === "en" ? ' lang="en"' : ""}>${back("#/home", L.appHome)}
      <section class="panel" id="qLoad"><p class="muted">${L.appLoading}</p></section></div>`;
    wireGo();
    const box = $("#qLoad");
    const failed = () => {
      if (!box.isConnected) return;
      box.innerHTML = `<h1>${nb(esc(Quiz.title(b, lang)))}</h1><p>${L.appLoadFail}</p>
        <p class="small muted">${L.appLoadTip}</p>
        <div class="row"><button class="btn main" id="qRetry">${L.appRetry}</button></div>`;
      $("#qRetry").onclick = () => renderQuiz(u, b.id);
    };
    Store.loadBank(b.id).then((x) => { if (box.isConnected) { if (x && x.questions) renderQuiz(u, b.id); else failed(); } }, failed);
  }

  /* ---------------- câu bị báo sai (Phiên R1) ----------------
     Danh sách ở Quản trị → Dữ liệu (bản đám mây: Khu phụ huynh → Dữ liệu). Bản lưu trên máy: nút "Chép để gửi" chép văn bản
     gọn (reportText) để dán vào Zalo gửi người làm đề. Bản đám mây: báo cáo đã lên máy chủ, hiện kèm trạng thái chủ app xử lí. */
  const REASON = Object.fromEntries(Quiz.REASONS);
  const RP_STATUS = { new: "Mới", fixed: "Đã sửa", rejected: "Bỏ qua" };
  const bankTitle = (id) => { const b = Store.bank(id); return b ? b.title : id; };
  const whoName = (id) => { const w = Store.user(id); return w ? w.name : "?"; };
  function reportText(list) {
    const school = Store.settings().schoolName;
    return [`Báo câu sai · OnUp${school ? " · " + school : ""} · ${list.length} câu`].concat(list.map((r, i) =>
      [`${i + 1}) ${bankTitle(r.bankId)} · ${REASON[r.reason] || r.reason}`, `Câu: ${r.qText}`, r.note ? `Ghi chú: ${r.note}` : "",
        `${whoName(r.userId)} · ${ago(r.at)} · ${r.bankId} · ${r.qKey}`].filter(Boolean).join("\n"))).join("\n\n");
  }
  function reportsPanel(cloud) {
    const list = Store.reports();
    return `<section class="panel" id="reportsBox"><h3>Câu bị báo sai${list.length ? ` (${list.length})` : ""}</h3>
      ${list.length ? `<p class="small">${cloud ? "Các câu đã báo từ tài khoản này. Người làm đề xem và đánh dấu đã sửa hay bỏ qua." : "Bấm “Chép để gửi” rồi dán vào Zalo gửi người làm đề."}</p>
        <div class="list">${list.slice(0, 50).map((r) => `<div class="item"><span class="grow"><b>${nb(esc(bankTitle(r.bankId)))}</b><span class="small rp-q">${Quiz.nbNum(esc(r.qText))}</span>
          <span class="small muted">${esc(REASON[r.reason] || r.reason)}${r.note ? " · " + esc(r.note) : ""} · ${esc(whoName(r.userId))} · ${esc(ago(r.at))}</span></span>${cloud ? `<span class="chip${r.status === "new" ? " warn" : ""}">${esc(RP_STATUS[r.status] || r.status)}</span>` : ""}</div>`).join("")}</div>
        ${list.length > 50 ? `<p class="small muted">Chỉ hiện 50 câu mới nhất.</p>` : ""}
        ${cloud ? "" : `<div class="row"><button class="btn main sm" id="copyReports">Chép để gửi</button></div>`}`
        : `<p class="small muted">Chưa có câu nào bị báo. Khi làm bài, dưới lời giải có link “Báo câu này sai”.</p>`}</section>`;
  }

  /* ================= QUẢN TRỊ ================= */
  /* Bản lưu trên máy: năm tab quản trị của thầy cô (ADMIN_TABS). Bản đám mây gọi phần này là "Khu phụ huynh" với ba mục (PARENT_TABS,
     Phiên UX2): Các con (mặc định; thẻ từng con, kidCard) · Lịch thi (xem và sửa ngày ở cùng một chỗ, parentCalendar) · Cài đặt (hồ sơ con,
     đề tự soạn, thông tin chung, rồi hai trang con: Chuyển dữ liệu và sao lưu #/admin/data, Tài khoản #/account). #/admin/users (địa chỉ cũ)
     về Cài đặt; #/admin/banks là trang "Đề tự soạn" (đề tự nhập trước, đề có sẵn thu gọn) với tab Cài đặt đang chọn. */
  const ADMIN_TABS = [["overview", "Tổng quan"], ["users", "Tài khoản"], ["events", "Lịch thi"], ["banks", "Ngân hàng đề"], ["data", "Dữ liệu"]];
  const PARENT_TABS = [["overview", "Các con"], ["events", "Lịch thi"], ["settings", "Cài đặt"]];
  const SETTINGS_SUB = { users: "settings", banks: "settings", data: "settings" }; // bản đám mây: trang con của Cài đặt
  const adminKeys = () => (Store.cloud ? PARENT_TABS.map(([k]) => k).concat(Object.keys(SETTINGS_SUB)) : ADMIN_TABS.map(([k]) => k));
  function adminTabs(cur) {
    const tabs = Store.cloud ? PARENT_TABS : ADMIN_TABS, on = Store.cloud ? SETTINGS_SUB[cur] || cur : cur;
    return `<div class="tabs" role="group" aria-label="${Store.cloud ? "Mục trong khu phụ huynh" : "Mục quản trị"}">${tabs.map(([k, t]) => `<button data-go="#/admin/${k}" aria-pressed="${k === on}">${t}</button>`).join("")}</div>`;
  }
  const fullMsg = () => `Tài khoản đã có đủ ${(Store.plan() || {}).maxChildren || 0} hồ sơ con theo gói hiện tại.`;
  const itemLink = (href, title, sub, lead) => `<a class="item" href="${href}" style="color:inherit;text-decoration:none">${lead || ""}<span class="grow"><b>${title}</b><span class="small muted">${sub}</span></span><span aria-hidden="true">›</span></a>`;
  /* Tab Lịch thi của khu phụ huynh (bản đám mây, Phiên UX2): cả năm học, gom theo tháng như renderCalendar, chỉ kì thi của các khối
     con đang học (chưa có hồ sơ con thì mọi khối đang mở), chọn khối bằng tab "Lớp 4 · Bin"; ?g=<khối> chọn sẵn. Dưới mỗi kì thi
     dự kiến (hoặc chưa có ngày) có nút "Trường đã báo lịch? Sửa ngày": hộp sửa ngày mở ngay dưới thẻ (openFix, #fixBox), Lưu thì bỏ
     cờ dự kiến; kì thi khác có link "Sửa ngày, bài ôn" sang form đầy đủ. Bấm thẻ vẫn mở chi tiết kì thi (openEvent). #/calendar của
     phụ huynh và link "Xem cả năm" ở báo cáo của con đều về đây: lịch thi chỉ có một chỗ. */
  function parentCalendar(query) {
    const kids = Store.users("student"), kg = gradesOf(kids), gl = kg.length ? kg : gradeList();
    if (query && gl.includes(+query.g)) calGrade = +query.g;
    else if (calGrade == null || (calGrade && !gl.includes(calGrade))) calGrade = gl.length === 1 ? gl[0] : 0;
    const evs = calGrade ? Store.events(calGrade) : Store.events().filter((e) => (e.grades || []).some((g) => gl.includes(g)));
    const { months, undated } = byMonth(evs);
    const tabLabel = (g) => { const n = kids.filter((k) => +k.grade === g).map((k) => k.name).join(", "); return gradeName(g) + (n ? " · " + n : ""); };
    const act = (e) => `<div class="ev-act">${e.kind !== "moc" && (e.tentative || !e.start) ? `<button class="linkbtn" data-fix="${esc(e.id)}">Trường đã báo lịch? ${e.start ? "Sửa" : "Thêm"} ngày</button>`
      : `<a class="linkbtn" href="#/admin/event/${esc(e.id)}">${e.kind === "moc" ? "Sửa" : "Sửa ngày, bài ôn"}</a>`}</div>`;
    const row = (e) => eventRow(e, { grade: calGrade || null }) + act(e);
    return `<div class="row between"><p class="muted small" style="flex:1">Năm học ${esc(Store.settings().schoolYear || "2026–2027")}. Kì thi “Dự kiến” sẽ được cập nhật khi trường thông báo: bấm “Trường đã báo lịch? Sửa ngày” ngay dưới kì thi đó.</p><a class="btn main sm" href="#/admin/event/new">+ Thêm kì thi</a></div>
      ${gl.length > 1 ? `<div class="tabs" role="group" aria-label="Chọn khối">${[[0, gl.length === 2 ? "Cả hai khối" : "Mọi khối"]].concat(gl.map((g) => [g, tabLabel(g)])).map(([g, t]) => `<button data-g="${g}" aria-pressed="${calGrade === g}">${nb(esc(t))}</button>`).join("")}</div>` : ""}
      <div class="timeline" id="parentCal">${monthsHTML(months, row)}
        ${undated.length ? `<div class="month">Chưa có lịch</div>${undated.map(row).join("")}` : ""}
        ${evs.length ? "" : `<div class="panel muted">Chưa có kì thi nào. Bấm “Thêm kì thi”.</div>`}</div>
      <div class="row"><button class="btn ghost sm" id="resetEv">Khôi phục lịch mặc định</button></div><div id="resetArea"></div>`;
  }
  function openFix(u, id) {
    const e = Store.event(id), btn = $(`[data-fix="${CSS.escape(id)}"]`); if (!e || !btn) return;
    const old = $("#fixBox"); if (old) old.remove();
    const f = document.createElement("form");
    f.className = "panel fix"; f.id = "fixBox"; f.autocomplete = "off"; f.setAttribute("aria-label", "Sửa ngày thi");
    f.innerHTML = `<b>Trường đã báo lịch? Sửa ngày cho đúng.</b><span class="small muted">${nb(esc(e.title))}</span>
      <div class="form"><label class="field"><span>Từ ngày</span><input type="date" id="fxStart" value="${esc(e.start || "")}"></label>
        <label class="field"><span>Đến ngày (để trống nếu thi một ngày)</span><input type="date" id="fxEnd" value="${esc(e.end && e.end !== e.start ? e.end : "")}"></label></div>
      <div class="checks"><label><input type="checkbox" id="fxOfficial" checked>Đây là lịch chính thức của trường</label></div>
      <div id="fxErr"></div>
      <div class="row"><button class="btn main sm" type="submit">Lưu</button><button class="btn ghost sm" type="button" id="fxNo">Thôi</button></div>`;
    btn.closest(".ev-act").after(f);
    $("#fxNo").onclick = () => f.remove();
    f.onsubmit = (ev) => {
      ev.preventDefault();
      const start = $("#fxStart").value, end = $("#fxEnd").value;
      try {
        if (!start) throw new Error("Chọn ngày thi (từ ngày).");
        Store.upsertEvent(Object.assign({}, e, { start, end: end || null, tentative: !$("#fxOfficial").checked }));
        toast("Đã lưu ngày thi"); renderAdmin(u, "events");
      } catch (err) { $("#fxErr").innerHTML = `<div class="fb bad">${esc(err.message)}</div>`; }
    };
    f.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  function renderAdmin(u, tab, query) {
    if (u.role !== "admin") { go("#/home"); return; }
    tab = adminKeys().includes(tab) ? tab : "overview";
    const cloud = !!Store.cloud;
    if (cloud && tab === "users") tab = "settings"; // địa chỉ cũ của tab Hồ sơ con
    let body = "";
    const kidRow = (x) => itemLink("#/admin/user/" + esc(x.id), esc(x.name), `${esc(gradeTxt(x))} · ${x.hasPin ? "có mã PIN" : "không có mã PIN"}${esc(lockTag(x))}`, avatar(x));
    if (tab === "overview" && cloud) {
      // Thẻ "Bắt đầu trong 3 bước" (UX3) đứng đầu đến khi một con đã học; chưa có hồ sơ con thì chỉ có thẻ này (nút thêm nằm trong thẻ).
      const studs = Store.users("student"), max = (Store.plan() || {}).maxChildren || 0;
      body = `${unsentBar(null)}<section class="sec" id="kids">${startDone(studs) ? "" : startCard(studs)}${studs.map(kidCard).join("")}
        ${studs.length ? `<div class="row">${Store.can("addChild") ? `<a class="btn sm" href="#/admin/user/new?role=student">+ Thêm hồ sơ con</a>` : ""}<span class="small muted">${studs.length}/${max} hồ sơ${Store.can("addChild") ? "" : " · " + esc(fullMsg())}</span></div>${kidsHint}` : ""}</section>`;
    } else if (tab === "overview") {
      const studs = Store.users("student"), w7 = within(graded(Store.data().results), 7);
      body = `<div class="stats"><div class="stat"><b>${studs.length}</b><span>học sinh</span></div><div class="stat"><b>${Store.users("parent").length}</b><span>phụ huynh</span></div><div class="stat"><b>${w7.length}</b><span>bài làm 7 ngày qua</span></div></div>
        ${!Store.persistent() ? `<div class="fb bad">Trình duyệt đang chặn lưu dữ liệu. Dữ liệu sẽ mất khi tải lại trang.</div>` : ""}
        ${backupCard()}
        <section class="sec"><h2>Học sinh</h2>${studs.length ? `<div class="list">${studs.map(childCard).join("")}</div>` : `<div class="panel">Chưa có học sinh. <div class="row"><a class="btn main" href="#/admin/user/new?role=student">Thêm học sinh</a></div></div>`}</section>`
        + shownGrades().map((g) => { const n = nextEvent(g); return n ? `<section class="sec"><h2>${nb("Kì thi tiếp theo · " + esc(gradeName(g)))}</h2><div class="timeline">${eventRow(n, { grade: g })}</div></section>` : ""; }).join("");
    } else if (tab === "settings") {
      const us = Store.users("student"), full = !Store.can("addChild"), st = Store.settings(), mine = Store.banks().filter((b) => !b.seed);
      body = `<section class="panel" id="kidsBox"><div class="row between"><h3>Hồ sơ con (${us.length}/${(Store.plan() || {}).maxChildren || 0})</h3>${full ? "" : `<a class="btn sm" href="#/admin/user/new?role=student">+ Thêm</a>`}</div>
          ${us.length ? `<div class="list">${us.map(kidRow).join("")}</div>` : `<p class="small muted">Chưa có hồ sơ con.</p>`}
          ${full ? `<p class="small muted">${esc(fullMsg())} Xóa bớt hồ sơ không dùng nữa để thêm hồ sơ mới.</p>` : ""}
          <p class="small muted">Mã PIN 4 số giúp anh em không vào nhầm hồ sơ của nhau. Đây không phải mật khẩu: muốn giữ dữ liệu an toàn thì giữ kín mật khẩu của bố mẹ.</p></section>
        <section class="panel" id="banksBox"><h3>Đề tự soạn</h3>
          <p class="small">${mine.length ? `Bạn đã nhập ${mine.length} đề.` : "Bạn chưa nhập đề nào."} Dán câu hỏi từ Word, Zalo, sách bài tập; app tự nhận dạng các dạng câu. Đề có sẵn của app xem ở cùng chỗ.</p>
          <div class="row"><a class="btn sm" href="#/admin/banks">Xem đề tự soạn</a><a class="btn main sm" href="#/admin/bank/new">+ Nhập đề</a></div></section>
        <section class="panel" id="infoBox"><h3>Thông tin chung</h3><div class="form">
          <label class="field"><span>Tên gia đình</span><input id="dSchool" value="${esc(st.schoolName || "")}" maxlength="80" placeholder="Ví dụ: Nhà Bin"></label>
          <label class="field"><span>Năm học</span><input id="dYear" value="${esc(st.schoolYear || "")}" maxlength="20"></label></div>
          <div class="row"><button class="btn sm" id="dSave">Lưu</button></div></section>
        <div class="list" id="moreBox">${itemLink("#/admin/data", "Chuyển dữ liệu và sao lưu", "Chuyển dữ liệu của bản lưu trên máy lên đám mây, tải file sao lưu, xem câu đã báo sai")}
          ${itemLink("#/account", "Tài khoản", `Tên đăng nhập ${esc(Store.username())} · đổi mật khẩu, mã mở nhanh, đăng xuất khỏi máy này`)}</div>`;
    } else if (tab === "users") {
      const sect = (role, name) => { const us = Store.users(role); return `<section class="sec"><div class="row between"><h2>${name} (${us.length})</h2><a class="btn sm" href="#/admin/user/new?role=${role}">+ Thêm</a></div>${us.length ? `<div class="list">${us.map((x) => `<a class="item" href="#/admin/user/${esc(x.id)}" style="color:inherit;text-decoration:none">${avatar(x)}<span class="grow"><b>${esc(x.name)}</b><span class="small muted">${esc(gradeTxt(x))}${role === "student" ? " · Phụ huynh: " + esc((x.parentIds || []).map((p) => (Store.user(p) || {}).name).filter(Boolean).join(", ") || "chưa gắn") : role === "parent" ? " · Con: " + esc(Store.childrenOf(x.id).map((c) => c.name).join(", ") || "chưa gắn") : ""}</span></span><span aria-hidden="true">›</span></a>`).join("")}</div>` : `<div class="panel muted">Chưa có.</div>`}</section>`; };
      body = sect("student", "Học sinh") + sect("parent", "Phụ huynh") + sect("admin", "Quản trị");
    } else if (tab === "events" && cloud) {
      body = parentCalendar(query);
    } else if (tab === "events") {
      body = `<div class="row between"><p class="muted small" style="flex:1">Sửa ngày khi trường thông báo, gắn bài ôn vào từng kì thi.</p><a class="btn main sm" href="#/admin/event/new">+ Thêm kì thi</a></div>
        <a class="linkbtn" id="calLink" href="#/calendar">Xem theo tháng →</a>
        <div class="list">${shownEvents(Store.events()).map((e) => `<a class="item" href="#/admin/event/${esc(e.id)}" style="color:inherit;text-decoration:none"><span class="grow"><b>${nb(`${esc(e.title)} · Lớp ${esc(gradesTxt(e))}`)}</b><span class="small muted">${esc(range(e))}${e.tentative && e.start ? " · dự kiến" : ""} · ${practiceCount(practiceFor(e, null))} bài ôn</span></span><span aria-hidden="true">›</span></a>`).join("")}</div>
        <div class="row"><button class="btn ghost sm" id="resetEv">Khôi phục lịch mặc định</button></div><div id="resetArea"></div>`;
    } else if (tab === "banks") {
      body = (cloud ? back("#/admin/settings", "Cài đặt") : "") + banksHTML(cloud);
    } else if (tab === "data" && cloud) {
      const loc = Store.localData(), mig = Store.migratedAt();
      const kids = loc ? loc.users.filter((x) => x.role === "student").length : 0;
      body = `${back("#/admin/settings", "Cài đặt")}<h2>Chuyển dữ liệu và sao lưu</h2>
        <section class="panel" id="migBox"><h3>Chuyển dữ liệu máy này lên đám mây</h3>
          ${loc ? `<p class="small">Trình duyệt này còn dữ liệu của bản lưu trên máy: ${kids} học sinh, ${(loc.results || []).length} kết quả.${mig ? ` Đã chuyển lần gần nhất: ${esc(ago(mig))}.` : ""}</p>`
            : `<p class="small">Trình duyệt này không có dữ liệu cũ. Nếu dữ liệu nằm ở máy khác: đăng nhập tài khoản này trên máy đó rồi bấm nút chuyển ở đó; hoặc chọn file sao lưu đã tải từ bản lưu trên máy.</p>`}
          <p class="small">Trên iPhone, iPad: hãy chuyển trong Safari, nơi đang có dữ liệu, trước khi dùng app ở Màn hình chính.</p>
          <p class="small muted">Mỗi học sinh thành một hồ sơ con, giữ mã PIN cũ, kết quả và tiến độ bài ôn; lịch thi và ngân hàng đề tự nhập cũng được chuyển. Tài khoản quản trị, phụ huynh của bản trên máy không cần chuyển. Chuyển lại nhiều lần không bị trùng.</p>
          <div class="row"><button class="btn main sm" id="dMigrate" ${loc ? "" : "disabled"}>Chuyển dữ liệu máy này lên đám mây</button><label class="btn ghost sm" for="dMigFile">Chuyển từ file sao lưu</label><input type="file" id="dMigFile" accept=".json,application/json" hidden></div>
          <div id="migRes" aria-live="polite"></div></section>
        ${reportsPanel(true)}
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
        ${reportsPanel(false)}
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
    view.innerHTML = `<div class="stack"><div class="row between"><div><h2>${cloud ? "Khu phụ huynh" : "Quản trị"}</h2><span class="muted">${esc(Store.settings().schoolName || "")}</span></div>${cloud ? `<button class="btn ghost sm" id="switchWho">Chọn hồ sơ khác</button>` : ""}</div>${adminTabs(tab)}${body}</div>`;
    wireGo();
    wireBackupCard();
    $$("button[data-child]").forEach((b) => (b.onclick = () => go("#/child/" + b.dataset.child))); // dòng học sinh của quản trị bản lưu trên máy (thẻ của con là link)
    wireEvents(view, tab === "events" && cloud ? calGrade || null : null, null); // tab Lịch thi của khu phụ huynh: chi tiết kì thi theo khối đang chọn
    if ($("#switchWho")) $("#switchWho").onclick = switchWho;
    if ($("#letStudy")) $("#letStudy").onclick = switchWho; // thẻ Bắt đầu (UX3)
    wireUnsent(null); // dòng "N bài làm trên máy này chưa gửi đi" ở mục Các con (UX6)
    if (tab === "banks") wireSeedBanks();
    if (tab === "events") $("#resetEv").onclick = () => {
      $("#resetArea").innerHTML = `<div class="confirm"><div>Chép lại lịch thi gốc? Các kì thi bạn đã thêm hoặc sửa sẽ bị thay thế.</div><div class="row"><button class="btn danger sm" id="rsYes">Khôi phục</button><button class="btn ghost sm" id="rsNo">Thôi</button></div></div>`;
      $("#rsYes").onclick = () => { Store.resetEvents(); toast("Đã khôi phục lịch mặc định"); renderAdmin(u, "events"); };
      $("#rsNo").onclick = () => ($("#resetArea").innerHTML = "");
    };
    if (tab === "events" && cloud) {
      $$("[data-g]").forEach((b) => (b.onclick = () => { calGrade = +b.dataset.g; renderAdmin(u, "events"); }));
      $$("[data-fix]").forEach((b) => (b.onclick = () => openFix(u, b.dataset.fix)));
    }
    if ($("#dSave")) $("#dSave").onclick = () => { Store.setSettings({ schoolName: $("#dSchool").value.trim(), schoolYear: $("#dYear").value.trim() }); toast("Đã lưu"); };
    if (tab === "data") {
      $("#dExport").onclick = () => backupNow().then((how) => { if (how && $("#dLast")) $("#dLast").textContent = lastBackupTxt(); });
      if ($("#dImport")) $("#dImport").onchange = (e) => importFile(e.target.files[0], () => go("#/"));
      if ($("#copyReports")) $("#copyReports").onclick = async () => {
        const list = Store.reports();
        toast((await copyText(reportText(list))) ? `Đã chép ${list.length} câu. Dán vào Zalo gửi người làm đề nhé.` : "Chưa chép được. Bấm giữ vào danh sách để chép.");
      };
      if (cloud) wireCloudData();
      if ($("#dWipe")) $("#dWipe").onclick = () => {
        $("#wipeArea").innerHTML = `<div class="confirm"><label class="field"><span>Gõ XOA để xác nhận</span><input id="wipeTxt" autocomplete="off"></label><div class="row"><button class="btn danger sm" id="wipeYes">Xóa hết</button><button class="btn ghost sm" id="wipeNo">Thôi</button></div></div>`;
        $("#wipeYes").onclick = () => { if ($("#wipeTxt").value.trim().toUpperCase() !== "XOA") { toast("Gõ đúng chữ XOA"); return; } Store.wipe(); go("#/"); };
        $("#wipeNo").onclick = () => ($("#wipeArea").innerHTML = "");
      };
    }
  }

  /* Danh sách đề (Phiên UX7, X12): trang "Đề tự soạn" của bản đám mây, tab "Ngân hàng đề" của bản lưu trên máy. Đề tự soạn (#myBanks)
     lên đầu, mỗi đề ghi kì thi đã gắn hoặc "chưa gắn vào kì thi nào". Đề có sẵn (#seedBanks) chọn theo khối: tab khối lấy từ gradeList(),
     ghi số đề (đang tìm thì số đề khớp), mặc định khối của các con; trong mỗi khối đề nhóm theo môn bằng <details> thu gọn (đang tìm thì
     nhóm có đề khớp mở ra), môn theo thứ tự môn của lịch thi của khối, đề theo kì, đề ngẫu nhiên đầu mỗi kì (X34). Ô tìm như ô tìm của
     màn Sửa kì thi (findHit), tìm ở mọi khối. Mọi khối vẽ sẵn, tab chỉ ẩn, hiện; bankGrade nhớ khối đang chọn. */
  let bankGrade = null;
  function banksHTML(cloud) {
    const all = Store.banks(), mine = all.filter((b) => !b.seed), seed = all.filter((b) => b.seed), gl = gradeList();
    const linked = (b) => { const ev = Store.events().filter((e) => (e.banks || []).includes(b.id)).map((e) => e.title); return ev.length ? "gắn vào " + ev.join(", ") : "chưa gắn vào kì thi nào"; };
    if (!gl.includes(bankGrade)) bankGrade = gradesOf(Store.users("student")).find((g) => gl.includes(g)) || gl[0];
    const row = (b) => `<a class="item" href="#/quiz/${esc(b.id)}" data-k="${esc(findKey(b.title + " " + b.subject))}" style="color:inherit;text-decoration:none"><span class="grow"><b>${nb(esc(b.title))}</b><span class="small muted">${qCount(b)} câu${b.pool ? " rút ngẫu nhiên" : ""}${b.minutes ? ` · ${b.minutes} phút` : ""} · xem thử</span></span><span aria-hidden="true">›</span></a>`;
    const pane = (g) => { // môn theo lịch thi của khối (subjOrder), đề theo kì, đề ngẫu nhiên đầu mỗi kì (bankOrder; X34)
      const subs = new Map(), bs = bySubj(subjOrder([], [g]));
      seed.filter((b) => +b.grade === g).forEach((b) => subs.set(b.subject || "Khác", (subs.get(b.subject || "Khác") || []).concat(b)));
      return `<div class="sb-g" data-sg="${g}"${g === bankGrade ? "" : " hidden"}>${[...subs].sort((a, b) => bs(a[0], b[0])).map(([sub, l]) => `<details class="grp"><summary><span class="grow"><b>${esc(sub)}</b><span class="small muted sb-n">${l.length} đề</span></span></summary><div class="list">${l.sort(bankOrder).map(row).join("")}</div></details>`).join("")
        || `<div class="panel muted">Chưa có đề có sẵn cho ${esc(gradeName(g))}.</div>`}</div>`;
    };
    const what = cloud ? "đề tự soạn" : "ngân hàng tự nhập", add = cloud ? "Nhập đề" : "Nhập ngân hàng";
    return `<div class="row between"><h2>${cloud ? "Đề tự soạn" : "Ngân hàng tự nhập"}${mine.length ? ` (${mine.length})` : ""}</h2><a class="btn main sm" href="#/admin/bank/new">+ ${add}</a></div>
      <p class="muted small">Dán câu hỏi từ Word, Zalo, sách bài tập. App tự nhận dạng trắc nghiệm, điền khuyết, đúng/sai, nối cột, sắp xếp, trả lời bằng số, tự luận.</p>
      ${mine.length ? `<div class="list" id="myBanks">${mine.map((b) => itemLink("#/admin/bank/" + esc(b.id), nb(esc(b.title)), `Lớp ${b.grade} · ${esc(b.subject)} · ${qCount(b)} câu · ${esc(linked(b))}`)).join("")}</div>`
        : `<div class="panel muted" id="myBanks">Chưa có ${what}. Bấm “${add}” để thêm.</div>`}
      <section class="sec" id="seedBanks"><h2>Đề có sẵn của app</h2>
        ${findBox("seedFind", "Tìm đề có sẵn", "Tìm đề có sẵn, ví dụ “Toán Đề 2”")}
        <div class="tabs" role="group" aria-label="Chọn khối">${gl.map((g) => `<button type="button" data-sg="${g}" aria-pressed="${g === bankGrade}">${esc(gradeName(g))} · <span class="sb-c">${seed.filter((b) => +b.grade === g).length}</span> đề</button>`).join("")}</div>
        ${gl.map(pane).join("")}<p class="muted small" id="seedNone" hidden></p></section>`;
  }
  function wireSeedBanks() {
    const box = $("#seedBanks"), find = $("#seedFind");
    let was = "";
    const sync = () => {
      const q = find.value.trim();
      $$(".tabs [data-sg]", box).forEach((b) => b.setAttribute("aria-pressed", +b.dataset.sg === bankGrade));
      let cur = 0, other = 0;
      $$(".sb-g", box).forEach((p) => {
        let n = 0;
        p.hidden = +p.dataset.sg !== bankGrade;
        $$(".grp", p).forEach((d) => {
          const rows = $$("a.item", d);
          rows.forEach((r) => (r.hidden = !findHit(q, r.dataset.k)));
          const k = rows.filter((r) => !r.hidden).length;
          n += k; d.hidden = !k; $(".sb-n", d).textContent = k + " đề";
          if (q && k) d.open = true; else if (!q && was) d.open = false; // xóa chữ tìm thì thu gọn lại như lúc mở trang
        });
        $(`.tabs [data-sg="${p.dataset.sg}"] .sb-c`, box).textContent = n;
        if (p.hidden) other += n; else cur = n;
      });
      $("#seedNone").hidden = !q || cur > 0;
      $("#seedNone").textContent = `Không có đề nào của ${gradeName(bankGrade)} khớp “${q}”.${other ? " Xem tab khối khác." : ""}`;
      was = q;
    };
    $$(".tabs [data-sg]", box).forEach((b) => (b.onclick = () => { bankGrade = +b.dataset.sg; sync(); }));
    find.addEventListener("input", sync);
  }

  /* Bản đám mây: "Chọn hồ sơ khác", "Cho con học": về màn hình "Ai đang học?" (không đăng xuất tài khoản gia đình). */
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
    // Hồ sơ mới chọn sẵn hình chưa có ai dùng (UX1): hình quen của vai trò nếu còn trống, không thì hình trống đầu tiên trong danh sách.
    const used = new Set(Store.users().map((x) => x.avatar)), fav = role === "student" ? "🐣" : role === "parent" ? "🌻" : "🧭";
    let emo = editing ? editing.avatar : !used.has(fav) ? fav : AVATARS.find((a) => !used.has(a)) || fav;
    const parents = Store.users("parent"), studs = Store.users("student");
    // Bản đám mây (UX2): thêm hồ sơ thì về tab Các con (thấy thẻ mới), sửa thì về Cài đặt → Hồ sơ con. Mở từ link "Đặt mã PIN cho <tên>"
    // của thẻ "Bắt đầu" (?tu=batdau, Phiên UX3b, X18): ô Mã PIN được focus; lưu xong và nút quay lại về Các con để làm tiếp bước 3.
    const fromStart = cloud && !!editing && query.tu === "batdau";
    const backTo = cloud ? (editing && !fromStart ? "#/admin/settings" : "#/admin/overview") : isAdmin ? "#/admin/users" : editing ? "#/child/" + editing.id : "#/home";
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
    wireGo(); wireEmoji(view, (e) => (emo = e)); wireReveal(view);
    if (fromStart) { const pin = $("#uPin"); pin.scrollIntoView({ block: "center" }); pin.focus({ preventScroll: true }); }
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
        toast(editing ? (fromStart && data.pin ? "Đã đặt mã PIN cho " + saved.name : "Đã lưu") : (cloud ? "Đã tạo hồ sơ " : "Đã tạo tài khoản ") + saved.name);
        go(cloud ? backTo : isAdmin ? "#/admin/users" : "#/home");
      } catch (e) { $("#uErr").innerHTML = `<div class="fb bad">${esc(e.message)}</div>`; }
    };
    if ($("#uDel")) $("#uDel").onclick = () => {
      $("#uDelArea").innerHTML = `<div class="confirm"><div>Xóa ${cloud ? "hồ sơ" : "tài khoản"} ${esc(editing.name)}? Mọi kết quả của ${cloud ? "hồ sơ" : "tài khoản"} này cũng bị xóa.</div><div class="row"><button class="btn danger sm" type="button" id="dYes">Xóa</button><button class="btn ghost sm" type="button" id="dNo">Thôi</button></div></div>`;
      $("#dYes").onclick = () => { try { Store.removeUser(editing.id); toast("Đã xóa"); go(cloud ? "#/admin/settings" : isAdmin ? "#/admin/users" : "#/home"); } catch (e) { toast(e.message); } };
      $("#dNo").onclick = () => ($("#uDelArea").innerHTML = "");
    };
  }

  /* -------- sửa kì thi -------- */
  /* ---------------- ô tìm đề (Phiên UX7) ----------------
     Tìm không phân biệt dấu, theo từng từ: mọi từ gõ vào phải là đầu một từ của tên ("toan de 2" khớp "Toán 4 · Cuối kì I · Đề 2";
     "2" không khớp "Đề 12"). findKey(chữ): các từ đã bỏ dấu, ghi vào data-k của dòng; findHit(chữ gõ, data-k). */
  const fold = (s) => String(s == null ? "" : s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
  const findWords = (s) => fold(s).split(/[^a-z0-9]+/).filter(Boolean);
  const findKey = (s) => findWords(s).join(" ");
  const findHit = (q, k) => { const h = String(k || "").split(" "); return findWords(q).every((w) => h.some((x) => x.startsWith(w))); };
  const findBox = (id, label, ph) => `<label class="find"><span class="sr">${label}</span>${ICO('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>')}<input type="search" id="${id}" placeholder="${esc(ph)}" autocomplete="off" enterkeyhint="search"></label>`;

  /* ---------------- thứ tự môn, thứ tự đề (Phiên UX7b, X34) ----------------
     Sửa kì thi và danh sách đề có sẵn nhóm đề theo môn, xếp theo thứ tự môn của lịch thi. subjOrder(head, gs): các môn trong head (Sửa kì
     thi: ô "Môn thi" của kì đang sửa, theo thứ tự đã ghi), rồi môn trong subjects của các kì thi của từng khối trong gs (kì thi theo
     ngày), rồi của các khối còn lại (data/grades.js); bySubj(thứ tự) so hai tên môn theo thứ tự đó (không phân biệt hoa thường, dấu), môn
     không có trong lịch đứng cuối, giữ thứ tự danh mục (sort ổn định). Trong một nhóm (bankOrder): đề có sẵn theo kì (TERMS, tên chuẩn
     của đề có sẵn), trong một kì đề ngẫu nhiên trước rồi Đề 1, Đề 2… như tab Bài ôn; đề tự soạn (own) sau đề có sẵn, theo tên; bài ôn
     dạng trang theo tên. */
  const TERMS = ["Giữa kì I", "Cuối kì I", "Giữa kì II", "Cuối năm"];
  const subjOrder = (head, gs) => [...new Set(head.concat(gs.concat(GRADES.map((g) => g.grade).filter((g) => !gs.includes(g)))
    .flatMap((g) => Store.events(g).flatMap((e) => e.subjects || []))).map(findKey))];
  const bySubj = (order) => { const at = (s) => { const i = order.indexOf(findKey(s)); return i < 0 ? order.length : i; }; return (a, b) => at(a) - at(b); };
  const bankKey = (x) => {
    const title = String(x.title).normalize("NFC"), t = TERMS.indexOf(title.split(/\s*·\s*/).find((p) => TERMS.includes(p)));
    return x.own ? [1, 0, 0, 0] : [0, t < 0 ? TERMS.length : t, x.pool ? 0 : 1, +((/Đề\s*(\d+)/.exec(title) || [])[1] || 0)];
  };
  const bankOrder = (a, b) => { const ka = bankKey(a), kb = bankKey(b), i = ka.findIndex((v, j) => v !== kb[j]); return i >= 0 ? ka[i] - kb[i] : a.title.localeCompare(b.title, "vi", { numeric: true }); };

  /* Khối "Bài ôn và đề cho kì này" của màn Sửa kì thi (Phiên UX7, X11): bài ôn dạng trang và đề (có sẵn, tự soạn) trong một danh sách,
     nhóm theo môn bằng <details class="grp"> (bài ôn dạng trang một nhóm, đứng đầu; nhóm có mục đã chọn mở sẵn), nhãn "N đã chọn"
     ở đầu khối, mỗi nhóm "x/y đã chọn". Mặc định chỉ hiện mục có khối nằm trong các ô Khối đang chọn (cộng khối ẩn của kì thi): đổi
     ô Khối thì danh sách đổi theo; link "Hiện cả đề của khối khác" hiện mọi khối; dòng #ePickScope ghi đang hiện khối nào (X33: không
     dùng id eScope, đó là ô Phạm vi kiến thức). Mục đã chọn (lúc mở form hoặc vừa chọn, data-keep)
     luôn hiện dù khác khối. Ô tìm lọc theo tên và môn (findHit). Mọi ô đánh dấu luôn nằm trong form (chỉ ẩn bằng hidden), nên Lưu
     giữ đủ lựa chọn cũ, kể cả mục đang ẩn. Dòng ô đánh dấu cao ≥ 44px. Thứ tự (X34): nhóm Bài ôn dạng trang, rồi các môn trong ô "Môn thi"
     của kì đang sửa, rồi theo lịch thi của khối kì thi, của các khối khác (subjOrder); trong nhóm, mục của khối kì thi trước mục khối
     khác, trong một khối theo bankOrder (kì, đề ngẫu nhiên trước, đề tự soạn cuối). */
  function pickBoxHTML(e) {
    const on = new Set((e.modules || []).map((x) => "em:" + x).concat((e.banks || []).map((x) => "eb:" + x))), eg = (e.grades || []).map(Number);
    const groups = new Map([["Bài ôn dạng trang", []]]), add = (g, it) => groups.set(g, (groups.get(g) || []).concat(it));
    MODULES.forEach((m) => add("Bài ôn dạng trang", { n: "em", id: m.id, title: m.title, grade: m.grade }));
    Store.banks().forEach((b) => add(b.subject || "Khác", { n: "eb", id: b.id, title: b.title, grade: +b.grade, own: !b.seed, pool: !!b.pool, subj: b.subject }));
    const sort = (a, b) => !eg.includes(a.grade) - !eg.includes(b.grade) || a.grade - b.grade || bankOrder(a, b);
    const [mods, ...subs] = [...groups], bs = bySubj(subjOrder(e.subjects || [], eg));
    const isOn = (it) => on.has(it.n + ":" + it.id);
    const row = (it) => `<label class="ck" data-g="${it.grade}" data-k="${esc(findKey(it.title + " " + (it.subj || "")))}"${it.own ? " data-own" : ""}${isOn(it) ? " data-keep" : ""}><input type="checkbox" name="${it.n}" value="${esc(it.id)}"${isOn(it) ? " checked" : ""}><span>${nb(esc(it.title))}${it.own ? `<span class="muted"> · tự soạn</span>` : ""}</span></label>`;
    const grps = [mods].concat(subs.sort((a, b) => bs(a[0], b[0]))).filter(([, l]) => l.length).map(([name, l]) => `<details class="grp pk-g"${l.some(isOn) ? " open" : ""}><summary><span class="grow"><b>${esc(name)}</b><span class="small muted pk-n"></span></span></summary><div class="pk-list">${l.sort(sort).map(row).join("")}</div></details>`).join("");
    return `<section class="full pk" id="ePick" aria-labelledby="ePickH"><div class="row between"><h3 id="ePickH">Bài ôn và đề cho kì này</h3><span class="tag" id="ePickN"></span></div>
      ${findBox("eFind", "Tìm bài ôn, đề", "Tìm đề, ví dụ “Toán Đề 2”")}
      <p class="small muted" id="ePickScope"></p>${grps}<p class="small muted" id="eNone" hidden></p>
      <button type="button" class="linkbtn" id="eAll" aria-pressed="false">Hiện cả đề của khối khác</button></section>`;
  }
  function wirePickBox(hiddenGrades) {
    const box = $("#ePick"), find = $("#eFind"), rows = $$(".ck", box);
    let all = false;
    const count = () => {
      $("#ePickN").textContent = $$("input:checked", box).length + " đã chọn";
      $$(".pk-g", box).forEach((d) => {
        const vis = $$(".ck:not([hidden])", d), own = vis.filter((r) => r.hasAttribute("data-own")).length;
        $(".pk-n", d).textContent = `${vis.filter((r) => r.firstChild.checked).length}/${vis.length} đã chọn${own ? ` · ${own} đề tự soạn` : ""}`;
      });
    };
    const filter = () => {
      const shown = $$("input[name=eg]:checked").map((x) => +x.value), gs = shown.concat(hiddenGrades), q = find.value.trim();
      rows.forEach((r) => (r.hidden = !((all || gs.includes(+r.dataset.g) || r.hasAttribute("data-keep")) && findHit(q, r.dataset.k))));
      $$(".pk-g", box).forEach((d) => { const n = $$(".ck:not([hidden])", d).length; d.hidden = !n; if (q && n) d.open = true; });
      const none = rows.every((r) => r.hidden);
      $("#ePickScope").textContent = all ? "Đang hiện bài ôn và đề của mọi khối." : shown.length ? `Đang hiện bài ôn và đề của Lớp ${shown.join(", ")}, khối của kì thi này.` : "Chọn khối ở trên để thấy bài ôn và đề của khối đó.";
      $("#eNone").hidden = !none || (!q && !all && !shown.length);
      $("#eNone").textContent = q ? `Không có bài ôn hay đề nào khớp “${q}”.` : "Chưa có bài ôn hay đề nào cho khối này.";
      $("#eAll").textContent = all ? "Chỉ hiện đề của khối kì thi" : "Hiện cả đề của khối khác";
      $("#eAll").setAttribute("aria-pressed", all);
      count();
    };
    rows.forEach((r) => r.firstChild.addEventListener("change", () => { if (r.firstChild.checked) r.setAttribute("data-keep", ""); count(); }));
    find.addEventListener("input", filter);
    find.addEventListener("keydown", (ev) => { if (ev.key === "Enter") ev.preventDefault(); }); // Enter trong ô tìm không gửi form
    $$("input[name=eg]").forEach((x) => x.addEventListener("change", filter));
    $("#eAll").onclick = () => { all = !all; filter(); };
    filter();
  }
  function renderEventForm(u, id) {
    if (u.role !== "admin") { go("#/home"); return; }
    const e = id === "new" ? { id: "", title: "", kind: "dinh-ki", grades: gradeList().slice(0, 1), start: "", end: "", tentative: true, subjects: [], scope: "", note: "", modules: [], banks: [] } : Store.event(id);
    if (!e) { go("#/admin/events"); return; }
    // Ô chọn khối: khối đang hiện (đang bật, đang có học sinh); khối ẩn của kì thi (mốc năm học cho cả 12 khối) không hiện nhưng được giữ khi lưu
    const shown = shownGrades(), hiddenGrades = (e.grades || []).map(Number).filter((g) => !shown.includes(g));
    view.innerHTML = `<div class="stack">${back("#/admin/events", "Lịch thi")}
      <div><h2>${id === "new" ? "Thêm kì thi" : "Sửa kì thi"}</h2>${id === "new" ? "" : `<p class="muted small">${nb(esc(`${e.title} · Lớp ${gradesTxt(e)} · ${range(e)}`))}</p>`}</div>
      <form class="panel" id="eForm" autocomplete="off"><div class="form">
        <label class="field full"><span>Tên kì thi</span><input id="eTitle" value="${esc(e.title)}" required placeholder="Ví dụ: Kiểm tra cuối học kì I"></label>
        <label class="field"><span>Loại</span><select id="eKind">${Object.entries(KIND).map(([k, t]) => `<option value="${k}" ${e.kind === k ? "selected" : ""}>${t}</option>`).join("")}</select></label>
        <div class="field"><span>Khối</span><div class="checks">${shown.map((g) => `<label><input type="checkbox" name="eg" value="${g}" ${(e.grades || []).map(Number).includes(g) ? "checked" : ""}>${esc(gradeName(g))}</label>`).join("")}</div></div>
        <label class="field"><span>Từ ngày (để trống nếu chưa có lịch)</span><input type="date" id="eStart" value="${esc(e.start || "")}"></label>
        <label class="field"><span>Đến ngày</span><input type="date" id="eEnd" value="${esc(e.end || "")}"></label>
        <div class="field full"><div class="checks"><label><input type="checkbox" id="eTent" ${e.tentative ? "checked" : ""}>Ngày dự kiến (chưa có thông báo chính thức)</label></div></div>
        <label class="field full"><span>Môn thi (cách nhau bằng dấu phẩy)</span><input id="eSubj" value="${esc((e.subjects || []).join(", "))}"></label>
        <label class="field full"><span>Phạm vi kiến thức</span><input id="eScope" value="${esc(e.scope || "")}"></label>
        <label class="field full"><span>Ghi chú</span><input id="eNote" value="${esc(e.note || "")}"></label>
        ${pickBoxHTML(e)}
      </div><div id="eErr"></div>
      <div class="row"><button class="btn main" type="submit">Lưu</button>${id !== "new" ? `<button class="btn danger" type="button" id="eDel">Xóa kì thi</button>` : ""}</div><div id="eDelArea"></div></form></div>`;
    wireGo();
    wirePickBox(hiddenGrades);
    $("#eForm").onsubmit = (ev) => {
      ev.preventDefault();
      try {
        Store.upsertEvent({
          id: e.id, title: $("#eTitle").value, kind: $("#eKind").value, grades: $$("input[name=eg]:checked").map((x) => +x.value).concat(hiddenGrades),
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

Sai: Hình thoi có bốn góc vuông.

Cho hình chữ nhật dài 6 cm, rộng 4 cm. Mỗi ý sau đúng hay sai?
a) Đúng: Chu vi hình chữ nhật là 20 cm.
b) Sai: Diện tích hình chữ nhật là 20 cm².
c) Đúng: Hình chữ nhật có 4 góc vuông.
d) Sai: Hai cạnh dài và rộng bằng nhau.
Mức: Hiểu

# Đọc hiểu
Đoạn đọc: Chú mèo con
Nhà Bin có một chú mèo con lông trắng muốt.
Mỗi sáng, chú nằm sưởi nắng bên cửa sổ.
Hết đoạn

Chú mèo con có bộ lông màu gì?
* Trắng
- Đen
- Vàng

Chú mèo nằm sưởi nắng ở đâu?
* Bên cửa sổ
- Trên mái nhà
- Dưới gầm bàn

# Đo lường
Một sợi dây dài 2 m, cắt đi 0,75 m. Đoạn còn lại dài bao nhiêu mét?
Đáp số: 1,25 m

Nối dụng cụ với đại lượng đo được.
Thước -> Chiều dài
Cân -> Khối lượng
Đồng hồ -> Thời gian
-> Nhiệt độ

Sắp xếp các số đo theo thứ tự từ bé đến lớn.
1) 5 mm
2) 3 cm
3) 1 dm
4) 2 m

# Viết
Tự luận: Viết 3 đến 5 câu kể về một việc tốt bạn đã làm.
+ Viết đủ 3 đến 5 câu, đúng chủ đề (1)
+ Kể rõ việc làm và cảm nghĩ của bạn (1)
+ Viết đúng chính tả (0,5)
> Gợi ý: Nói bạn đã làm việc gì, ở đâu, giúp ai; kết thúc bằng cảm nghĩ của bạn.`;
  /* -------- nhập đề: xem trước, lỗi gắn vào câu (Phiên UX7, X13) --------
     Sau "Kiểm tra" (cả Xem ví dụ, Mở file .txt) có dòng tóm tắt (#bRes) và danh sách xem trước (#bPrev): mỗi câu một thẻ (số câu như
     trong lỗi "Câu N", chủ đề, dạng câu, mức độ, rồi Quiz.preview: câu hỏi, hình, đáp án được chấm đúng, lời giải); đoạn đọc một thẻ thu
     gọn đứng trước câu đầu tiên dùng nó (đoạn không có câu nào thì đứng đầu). Lỗi (issues của Quiz.parse) gắn vào thẻ của câu, đoạn đọc
     bị lỗi (viền đỏ, data-bad); câu bị bỏ hẳn ghi "Chưa lưu được" và chữ đã dán. Có lỗi thì có bộ lọc "Tất cả · Cần sửa".
     bankProblems: các mức lỗi để báo ("1 câu sẽ không được lưu", "1 câu thiếu phần bị lỗi", "1 đoạn đọc có lỗi"), dùng cho dòng tóm
     tắt và hộp hỏi lại khi bấm Lưu. */
  const QTYPE = { mc: "Trắc nghiệm", fill: "Điền khuyết", tf: "Đúng/sai", tf4: "Đúng/sai 4 ý", num: "Trả lời bằng số", match: "Nối cột", order: "Sắp xếp", essay: "Tự luận" };
  function bankProblems(res) {
    const drop = new Set(res.issues.filter((x) => x.n && x.dropped).map((x) => x.n)), part = new Set(res.issues.filter((x) => x.n && !drop.has(x.n)).map((x) => x.n));
    const psg = new Set(res.issues.filter((x) => x.p).map((x) => x.p));
    return [drop.size ? `${drop.size} câu sẽ không được lưu` : "", part.size ? `${part.size} câu thiếu phần bị lỗi` : "", psg.size ? `${psg.size} đoạn đọc có lỗi` : ""].filter(Boolean);
  }
  function bankPreview(res) {
    const { questions, passages, issues } = res, T = (s) => Quiz.nbNum(esc(s));
    const drop = new Set(issues.filter((x) => x.n && x.dropped).map((x) => x.n)), total = questions.length + drop.size;
    const errs = (list) => (list.length ? `<div class="fb bad pv-err">${list.map((x) => T(x.msg.charAt(0).toUpperCase() + x.msg.slice(1))).join("<br>")}</div>` : "");
    const head = (lbl, tags) => `<div class="pv-head"><span class="label">${nb(T(lbl))}</span><span class="tags">${tags.map(([t, c]) => `<span class="tag${c ? " " + c : ""}">${esc(t)}</span>`).join("")}</span></div>`;
    let bad = 0;
    const card = (b, id, inner) => { if (b) bad++; return `<article class="pv-card${b ? " bad" : ""}" id="${id}"${b ? " data-bad" : ""}>${inner}</article>`; };
    const psgCard = (p) => {
      const ps = passages["d" + p], iss = issues.filter((x) => x.p === p), n = questions.filter((q) => q.p === "d" + p).length;
      return card(iss.length, "pvd" + p, head(`Đoạn đọc ${p}${ps && ps.title ? " · " + ps.title : ""}`, ps ? [[n ? `Dùng cho ${n} câu` : "Chưa có câu nào"]] : [["Chưa lưu được", "bad"]])
        + (ps ? `<details class="pv-psg"><summary>Xem đoạn đọc</summary>${ps.text ? `<div class="psg-text">${T(ps.text)}</div>` : ""}${ps.svg ? `<div class="qfig">${Quiz.svg(ps.svg).svg}</div>` : ""}</details>` : "") + errs(iss));
    };
    const pNums = [...new Set(Object.keys(passages).map((k) => +k.slice(1)).concat(issues.filter((x) => x.p).map((x) => x.p)))].sort((a, b) => a - b);
    const placed = new Set(pNums.filter((p) => !questions.some((q) => q.p === "d" + p))), out = [...placed].map(psgCard);
    for (let n = 1, qi = 0; n <= total; n++) {
      const iss = issues.filter((x) => x.n === n);
      if (drop.has(n)) {
        const d = iss.find((x) => x.dropped);
        out.push(card(true, "pv" + n, head(`Câu ${n}${d.topic ? " · " + d.topic : ""}`, [["Chưa lưu được", "bad"]]) + `<pre class="pv-src">${T(d.text)}</pre>` + errs(iss)));
        continue;
      }
      const q = questions[qi++], p = q.p ? +q.p.slice(1) : 0;
      if (p && !placed.has(p)) { placed.add(p); out.push(psgCard(p)); }
      out.push(card(iss.length, "pv" + n, head(`Câu ${n}${q.topic ? " · " + q.topic : ""}`, [[QTYPE[q.type]]].concat(q.lv ? [[Quiz.LV[q.lv]]] : [])) + Quiz.preview(q) + errs(iss)));
    }
    return (bad ? `<div class="tabs" role="group" aria-label="Lọc câu"><button type="button" data-pf="all" aria-pressed="true">Tất cả · ${out.length}</button><button type="button" data-pf="bad" aria-pressed="false">Cần sửa · ${bad}</button></div>` : "")
      + `<p class="small muted">Đáp án được chấm đúng có dấu ✓ hoặc chữ đậm. Khi làm bài, app tự xáo các lựa chọn.</p>` + out.join("");
  }
  function renderBankForm(u, id) {
    if (u.role !== "admin") { go("#/home"); return; }
    const b = id === "new" ? { id: "", title: "", grade: gradeList()[0], subject: "", minutes: 20, note: "", src: "" } : Store.bank(id);
    if (!b || b.seed) { go("#/admin/banks"); return; }
    const cloud = !!Store.cloud; // bản đám mây gọi là "đề tự soạn" (UX2)
    const linkedEvs = b.id ? Store.events().filter((e) => (e.banks || []).includes(b.id)) : [];
    view.innerHTML = `<div class="stack">${back("#/admin/banks", cloud ? "Đề tự soạn" : "Ngân hàng đề")}
      <h2>${id === "new" ? (cloud ? "Nhập đề" : "Nhập ngân hàng câu hỏi") : cloud ? "Sửa đề" : "Sửa ngân hàng câu hỏi"}</h2>
      <form class="panel" id="bForm" autocomplete="off"><div class="form">
        <label class="field full"><span>Tên</span><input id="bTitle" value="${esc(b.title)}" required placeholder="Ví dụ: Toán 4 · Đề ôn cuối kì I số 1"></label>
        <label class="field"><span>Khối</span><select id="bGrade">${gradeOptions(b.grade)}</select></label>
        <label class="field"><span>Môn</span><input id="bSubj" value="${esc(b.subject)}" placeholder="Toán, Tiếng Việt, Tiếng Anh…"></label>
        <label class="field full"><span>Gắn vào kì thi <span class="opt-note">(không bắt buộc)</span></span><select id="bEvent"></select></label>
        ${linkedEvs.length ? `<p class="full small muted" id="bLinked">${nb(esc("Đang gắn vào: " + linkedEvs.map((e) => e.title).join(", ")))}. Bỏ gắn ở Lịch thi → Sửa kì thi.</p>` : ""}
        <label class="field"><span>Thời gian khi làm như thi (phút, 0 = không tính giờ)</span><input id="bMin" type="number" min="0" max="180" value="${+b.minutes || 0}"></label>
        <label class="field full"><span>Ghi chú</span><input id="bNote" value="${esc(b.note || "")}"></label>
      </div>
      <details class="small"><summary><b>Cách viết câu hỏi</b></summary><pre style="white-space:pre-wrap;margin:8px 0 0">Mỗi câu cách nhau một dòng trống.
# Tên chủ đề          → các câu bên dưới thuộc chủ đề này
* đáp án đúng / - đáp án sai   → trắc nghiệm
Câu có [đáp án]        → điền vào chỗ trống, nhiều đáp án: [a|b]
Đúng: … hoặc Sai: …    → câu đúng/sai
Câu hỏi + 4 dòng a) Đúng: … / b) Sai: …   → đúng/sai 4 ý (chấm từng ý)
Câu hỏi + Đáp số: 2,5 ± 0,1 kg   → trả lời bằng số (sai số, đơn vị không bắt buộc)
Câu hỏi + Đáp số: 3/4   → trả lời bằng số, đáp án là phân số
Câu hỏi + các dòng trái -> phải  → nối cột (-> ô thừa: ô bên phải không nối)
Câu hỏi + 1) … 2) … 3) …   → sắp xếp (viết theo thứ tự đúng)
Tự luận: đề bài + các dòng + ý cần có (0,5)   → tự luận tự chấm
Mức: Biết | Hiểu | Vận dụng   → mức độ của câu
Đoạn đọc: tiêu đề … Hết đoạn   → đoạn văn dùng chung cho các câu bên dưới
&lt;svg viewBox="…"&gt;…&lt;/svg&gt;   → hình vẽ của câu (màu: ink, acc, ok, bad…)
> giải thích           → hiện sau khi trả lời (tự luận: đáp án gợi ý)</pre></details>
      <textarea id="bSrc" spellcheck="false" aria-label="Câu hỏi" placeholder="Dán câu hỏi vào đây…">${esc(b.src || "")}</textarea>
      <div class="row"><button class="btn ghost sm" type="button" id="bSample">Xem ví dụ</button><label class="btn ghost sm" for="bFile">Mở file .txt</label><input type="file" id="bFile" accept=".txt,text/plain" hidden><button class="btn sm" type="button" id="bCheck">Kiểm tra</button></div>
      <div id="bRes"></div><section class="pv" id="bPrev" aria-label="Xem trước các câu" hidden></section>
      <div class="row"><button class="btn main" type="submit">${cloud ? "Lưu đề" : "Lưu ngân hàng"}</button>${id !== "new" ? `<button class="btn danger" type="button" id="bDel">Xóa</button>` : ""}</div><div id="bAsk"></div><div id="bDelArea"></div></form></div>`;
    wireGo();
    // "Gắn vào kì thi": kì thi chưa qua của khối đang chọn (không có mốc năm học, kì thi đã gắn đề này); đổi khối thì đổi danh sách
    const evOpts = () => {
      const g = +$("#bGrade").value, cur = $("#bEvent").value;
      const evs = Store.events(g).filter((e) => e.kind !== "moc" && status(e) !== "past" && !(b.id && (e.banks || []).includes(b.id)));
      $("#bEvent").innerHTML = `<option value="">${linkedEvs.length ? "Không gắn thêm" : "Chưa gắn"}</option>`
        + evs.map((e) => `<option value="${esc(e.id)}"${e.id === cur ? " selected" : ""}>${esc(`${e.title} (${e.start ? dm(e.start) : "chưa có lịch"})`)}</option>`).join(""); // khối đã ghi ở ô Khối; tên ngắn để vừa ô ở 360px
    };
    $("#bGrade").onchange = evOpts; evOpts();
    const KINDS = [["mc", "trắc nghiệm"], ["fill", "điền khuyết"], ["tf", "đúng/sai"], ["tf4", "đúng/sai 4 ý"], ["num", "trả lời bằng số"], ["match", "nối cột"], ["order", "sắp xếp"], ["essay", "tự luận"]];
    const showBad = (only) => {
      $$("[data-pf]").forEach((x) => x.setAttribute("aria-pressed", (x.dataset.pf === "bad") === only));
      $$(".pv-card:not([data-bad])", $("#bPrev")).forEach((c) => (c.hidden = only));
      const first = $(".pv-card[data-bad]", $("#bPrev"));
      if (only && first) first.scrollIntoView({ block: "start" });
    };
    const check = () => {
      const res = Quiz.parse($("#bSrc").value), { questions, passages } = res, c = (t) => questions.filter((q) => q.type === t).length;
      const kinds = KINDS.filter(([t]) => c(t)).map(([t, nm]) => c(t) + " " + nm), np = Object.keys(passages).length, pr = bankProblems(res); // chỉ dạng có câu, không ghi "0 đúng/sai" (X36)
      $("#bRes").innerHTML = `<div class="${pr.length ? "notice" : "fb ok"}">Nhận được ${questions.length} câu${kinds.length ? ": " + kinds.join(", ") : ""}${np ? `; ${np} đoạn đọc` : ""}.${pr.length ? ` Cần sửa: ${esc(pr.join(", "))}. Xem các thẻ viền đỏ bên dưới.` : ""}</div>`;
      $("#bPrev").innerHTML = bankPreview(res); $("#bPrev").hidden = false;
      $$("[data-pf]").forEach((x) => (x.onclick = () => showBad(x.dataset.pf === "bad")));
      $("#bCheck").textContent = "Kiểm tra lại"; $("#bAsk").innerHTML = "";
      return res;
    };
    $("#bSample").onclick = () => { $("#bSrc").value = BANK_SAMPLE; check(); };
    $("#bCheck").onclick = check;
    $("#bFile").onchange = (ev) => { const f = ev.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { $("#bSrc").value = r.result; check(); }; r.readAsText(f, "utf-8"); };
    const save = ({ questions, passages }) => {
      try {
        const saved = Store.upsertBank({ id: b.id, title: $("#bTitle").value, grade: +$("#bGrade").value, subject: $("#bSubj").value.trim(), minutes: +$("#bMin").value || 0, note: $("#bNote").value.trim(), questions, passages, src: $("#bSrc").value });
        const ev = $("#bEvent").value && Store.event($("#bEvent").value);
        if (ev) Store.upsertEvent(Object.assign({}, ev, { banks: [saved.id].concat((ev.banks || []).filter((x) => x !== saved.id)) })); // đề mới đứng đầu, như đề có sẵn mới
        toast((cloud ? "Đã lưu đề" : "Đã lưu") + (ev ? `, gắn vào “${ev.title}”.` : "."), ev ? 3600 : 0); go("#/admin/banks");
      } catch (err) { $("#bAsk").innerHTML = ""; $("#bRes").innerHTML = `<div class="fb bad">${esc(err.message)}</div>`; }
    };
    $("#bForm").onsubmit = (ev) => {
      ev.preventDefault();
      const res = check(), pr = bankProblems(res);
      if (!pr.length || !res.questions.length) { save(res); return; } // không câu nào lưu được: kho tự báo "cần ít nhất một câu hỏi"
      // có lỗi: hỏi lại ngay dưới nút Lưu, nói rõ bao nhiêu câu sẽ không được lưu, bao nhiêu câu thiếu phần bị lỗi
      $("#bAsk").innerHTML = `<div class="confirm" id="bAskBox"><div>${esc(pr.join(", "))}. Vẫn lưu?</div><div class="row"><button class="btn sm" type="button" id="bAskYes">Vẫn lưu</button><button class="btn ghost sm" type="button" id="bAskNo">Sửa tiếp</button></div></div>`;
      $("#bAskYes").onclick = () => save(check()); // đọc lại chữ đang có: câu lưu và văn bản gốc (src) luôn khớp nhau
      $("#bAskNo").onclick = () => { $("#bAsk").innerHTML = ""; showBad(true); };
      $("#bAskBox").scrollIntoView({ block: "nearest" });
    };
    if ($("#bDel")) $("#bDel").onclick = () => {
      $("#bDelArea").innerHTML = `<div class="confirm"><div>Xóa ${cloud ? "đề" : "ngân hàng"} “${esc(b.title)}”?</div><div class="row"><button class="btn danger sm" type="button" id="bdYes">Xóa</button><button class="btn ghost sm" type="button" id="bdNo">Thôi</button></div></div>`;
      $("#bdYes").onclick = () => { Store.removeBank(b.id); toast("Đã xóa"); go("#/admin/banks"); };
      $("#bdNo").onclick = () => ($("#bDelArea").innerHTML = "");
    };
  }

  /* -------- tài khoản của tôi -------- */
  /* Thẻ "Hình đại diện" (UX4, X4): chạm một hình là Store.updateUser ngay, toast "Đã đổi hình đại diện", đổi luôn hình ở đầu trang
     và thanh trên; không có nút Lưu. Dùng ở trang Tài khoản của cả hai bản. */
  const avatarCard = (u) => `<section class="panel" id="avBox"><h3>Hình đại diện</h3><p class="small muted" style="margin:0">Chạm vào hình là đổi ngay.</p>${emojiPicker(u.avatar)}<div id="avErr"></div></section>`;
  function wireAvatarCard(u) {
    wireEmoji($("#avBox"), async (e) => {
      try {
        await Store.updateUser(u.id, { avatar: e });
        const nu = Store.user(u.id);
        $("#acAv").innerHTML = avIn(nu.avatar); drawWho(nu); toast("Đã đổi hình đại diện"); $("#avErr").innerHTML = "";
      } catch (er) { // không lưu được (bản đám mây): báo lỗi, trả khung chọn về hình đang có
        $("#avErr").innerHTML = `<div class="fb bad">${esc(er.message)}</div>`;
        $$("[data-emo]", $("#avBox")).forEach((x) => x.setAttribute("aria-pressed", x.dataset.emo === Store.user(u.id).avatar));
      }
    });
  }
  const acHead = (u, sub) => `<div class="row"><span class="av lg" id="acAv" aria-hidden="true">${avIn(u.avatar)}</span><div><h2>${esc(u.name)}</h2><span class="muted">${sub}</span></div></div>`;
  /* Bản lưu trên máy, mọi vai trò: hình đại diện (chạm là đổi) và form đổi mã PIN riêng, nút "Đổi mã PIN". */
  function renderAccount(u) {
    if (Store.cloud) return renderCloudAccount(u);
    view.innerHTML = `<div class="stack">${back("#/home", "Trang chính")}
      ${acHead(u, esc(gradeTxt(u)))}
      ${avatarCard(u)}
      <form class="panel" id="aForm" autocomplete="off"><h3>Đổi mã PIN</h3>
        <div class="form"><label class="field"><span>Mã PIN hiện tại</span><input id="aOld" type="password" inputmode="numeric" maxlength="6"></label>
        <label class="field"><span>Mã PIN mới (4–6 số)</span><input id="aNew" type="password" inputmode="numeric" maxlength="6"></label></div>
        <div id="aErr"></div><div class="row"><button class="btn sm" type="submit">Đổi mã PIN</button></div></form>
      <div class="row"><button class="btn main" id="logout">Đăng xuất</button></div></div>`;
    wireGo(); wireReveal(view); wireAvatarCard(u);
    $("#aForm").onsubmit = async (ev) => {
      ev.preventDefault();
      const nw = $("#aNew").value.trim(), old = $("#aOld").value.trim();
      try {
        if (!nw) throw new Error("Nhập mã PIN mới (4–6 số).");
        if (!(await Store.checkPin(u.id, old))) throw new Error("Mã PIN hiện tại chưa đúng.");
        await Store.updateUser(u.id, { pin: nw });
        toast("Đã đổi mã PIN"); renderAccount(Store.user(u.id));
      } catch (e) { $("#aErr").innerHTML = `<div class="fb bad">${esc(e.message)}</div>`; }
    };
    $("#logout").onclick = () => { Store.setSession(null); go("#/"); };
  }
  /* Ô mã mở nhanh khu phụ huynh ở trang Tài khoản (bản đám mây, Phiên UX3): mã 4–6 số băm và lưu trên máy này (Store.setQuickCode),
     chỉ đặt được khi máy đã ghi nhớ đăng nhập (Store.rememberLogin()); đã có mã thì đổi hoặc bỏ. Đổi mật khẩu, đăng xuất vẫn cần mật khẩu. */
  function quickBox() {
    const len = Store.quickCodeLen();
    // Máy chưa ghi nhớ đăng nhập (X20): nói rõ phải đăng xuất rồi đăng nhập lại và chọn "Ghi nhớ trên máy này" (bố mẹ đang đăng nhập rồi).
    if (!Store.rememberLogin()) return `<section class="panel" id="qcBox"><h3>Mã mở nhanh khu phụ huynh</h3>
      <p class="small">Mã 4–6 số để vào khu phụ huynh mà không phải gõ mật khẩu, chỉ đặt được trên máy đã ghi nhớ đăng nhập. Máy này chưa ghi nhớ đăng nhập. Muốn đặt mã: bấm “Đăng xuất khỏi máy này”, rồi đăng nhập lại và chọn “Ghi nhớ trên máy này”.</p></section>`;
    return `<form class="panel" id="qcBox" autocomplete="off"><h3>Mã mở nhanh khu phụ huynh</h3>
      <p class="small">Trên máy này, bạn gõ mã ${len ? len + " số" : "4–6 số"} ở màn hình “Ai đang học?” là vào khu phụ huynh, không phải gõ mật khẩu. Quên mã thì nhập mật khẩu như cũ. Đổi mật khẩu và đăng xuất vẫn cần mật khẩu.</p>
      ${len ? `<div class="fb ok" id="qcState">Máy này đã có mã mở nhanh.</div>` : ""}
      <label class="field" style="max-width:300px"><span>${len ? "Mã mới (4–6 số)" : "Mã mở nhanh (4–6 số)"}</span><input id="qcNew" type="password" inputmode="numeric" maxlength="6" autocomplete="off" data-what="mã mở nhanh"></label>
      <div id="qcErr" aria-live="assertive"></div>
      <div class="row"><button class="btn sm" type="submit" id="qcSave">${len ? "Đổi mã" : "Lưu mã"}</button>${len ? `<button class="btn ghost sm" type="button" id="qcDrop">Bỏ mã</button>` : ""}</div>
      <p class="small muted">Mã chỉ lưu trên máy này, không gửi đi đâu; máy khác muốn dùng thì đặt riêng. Đăng xuất thì mã bị xóa.</p></form>`;
  }
  /* Bản đám mây. Phụ huynh: tên đăng nhập, đổi mật khẩu, mã mở nhanh (UX3), chọn hồ sơ khác, đăng xuất khỏi máy này (hỏi mật khẩu
     trước, openSignOut). Hồ sơ con: hình đại diện (chạm là đổi, X4), chọn hồ sơ khác (PIN do bố mẹ đặt trong khu phụ huynh; con không
     đăng xuất được tài khoản). */
  function renderCloudAccount(u) {
    const adult = u.role !== "student";
    view.innerHTML = `<div class="stack">${back(adult ? "#/admin/settings" : "#/home", adult ? "Cài đặt" : "Trang chính")}
      ${acHead(u, adult ? "Tên đăng nhập: " + esc(Store.username()) : esc(gradeTxt(u)))}
      ${adult ? `<form class="panel" id="pwForm" autocomplete="on"><h3>Đổi mật khẩu</h3><div class="form">${pwFields(true)}</div>
          <div class="row"><button class="btn sm" type="submit">Đổi mật khẩu</button></div></form>${quickBox()}`
        : avatarCard(u)}
      <div class="row"><button class="btn main" id="switchWho">Chọn hồ sơ khác</button>${adult ? `<button class="btn ghost" id="signOut">Đăng xuất khỏi máy này</button>` : ""}</div>
      ${adult ? `<div id="outArea"></div><p class="small muted">Con dùng máy này hằng ngày thì chỉ cần “Chọn hồ sơ khác”. Đăng xuất thì lần sau phải nhập lại tên đăng nhập và mật khẩu.</p>` : ""}</div>`;
    wireGo(); wireReveal(view);
    $("#switchWho").onclick = switchWho;
    if (adult) {
      wirePwForm($("#pwForm"), true, () => { toast("Đã đổi mật khẩu"); renderCloudAccount(u); });
      $("#signOut").onclick = () => openSignOut(u);
      if ($("#qcSave")) {
        const qcErr = (m) => ($("#qcErr").innerHTML = m ? `<div class="fb bad">${esc(m)}</div>` : "");
        $("#qcBox").onsubmit = async (ev) => {
          ev.preventDefault(); qcErr("");
          const code = $("#qcNew").value.trim();
          if (!code) { qcErr("Mã mở nhanh gồm 4–6 chữ số."); return; } // ô trống không phải là bỏ mã (có nút Bỏ mã riêng)
          try { await Store.setQuickCode(code); toast("Đã lưu mã mở nhanh"); renderCloudAccount(u); }
          catch (e) { qcErr(e.message); }
        };
        if ($("#qcDrop")) $("#qcDrop").onclick = async () => { try { await Store.setQuickCode(null); toast("Đã bỏ mã mở nhanh"); renderCloudAccount(u); } catch (e) { qcErr(e.message); } };
      }
      return;
    }
    wireAvatarCard(u);
  }
  /* Hộp hỏi mật khẩu trước khi đăng xuất khỏi máy này (Phiên UX3b, X17, màn E4): mở ngay dưới nút #signOut (trong #outArea), kiểu
     .confirm, không phải hộp nổi. Lúc nào cũng hỏi, kể cả khi vừa nhập mật khẩu; mã mở nhanh không dùng được (ai biết mã, ví dụ con,
     cũng không đăng xuất được tài khoản gia đình). Kiểm bằng Store.checkPassword với ô CAPTCHA #outCaptcha trong hộp; sai thì báo trong
     hộp và tính vào PinLock của Phụ huynh như ở bước nhập (đang phải đợi thì nút Đăng xuất mờ, đếm ngược trong hộp); đúng thì
     Store.signOut() (xóa cả mã mở nhanh) rồi về màn đăng nhập. Nút Đăng xuất ở màn đổi mật khẩu tạm (#npOut) và màn tài khoản bị khóa
     (#bOut) không qua hộp này: ở đó chưa vào khu phụ huynh. */
  let outTick = null; // đếm ngược khi phải đợi; đóng hộp hoặc rời trang thì dừng
  function openSignOut(u) {
    clearInterval(outTick);
    const area = $("#outArea"), id = u.id;
    area.innerHTML = `<form class="confirm" id="outBox" autocomplete="on"><b>Đăng xuất khỏi máy này?</b>
      <span class="small">Nhập mật khẩu của bố mẹ để xác nhận. Mã mở nhanh không dùng được ở đây.</span>
      <input type="text" name="username" autocomplete="username" value="${esc(Store.username())}" hidden>
      <label class="field"><span>Mật khẩu của bố mẹ</span><input id="outPw" type="password" autocomplete="current-password" maxlength="72"></label>
      <div class="captcha" id="outCaptcha"></div>
      <div id="outErr" aria-live="assertive"></div>
      <div class="row"><button class="btn main sm" type="submit" id="outYes">Đăng xuất</button><button class="btn ghost sm" type="button" id="outNo">Thôi</button></div>
      ${contactLine("Quên mật khẩu?")}</form>`;
    wireReveal(area);
    const box = $("#outBox"), err = (m) => ($("#outErr").innerHTML = m ? `<div class="fb bad">${esc(m)}</div>` : "");
    let busy = false;
    function showWait(lead) {
      clearInterval(outTick); $("#outYes").disabled = true;
      $("#outErr").innerHTML = `<div class="fb bad">${esc(lead || "Sai nhiều lần.")} Đợi <b id="outWait" aria-live="off">${waitTxt(PinLock.wait(id))}</b> rồi thử lại.</div>`;
      outTick = setInterval(() => {
        const w = $("#outWait"), s = PinLock.wait(id);
        if (!w || !box.isConnected) { clearInterval(outTick); return; }
        if (!s) { clearInterval(outTick); $("#outYes").disabled = false; $("#outErr").innerHTML = `<div class="fb ok">Bạn nhập lại được rồi.</div>`; return; }
        w.textContent = waitTxt(s);
      }, 1000);
    }
    $("#outNo").onclick = () => { clearInterval(outTick); area.innerHTML = ""; $("#signOut").focus({ preventScroll: true }); };
    box.onsubmit = async (ev) => {
      ev.preventDefault();
      const pw = $("#outPw").value;
      if (!pw || busy) return;
      if (PinLock.wait(id)) { showWait(); return; }
      busy = true; $("#outYes").disabled = true; err("");
      try {
        const ok = await Store.checkPassword(pw, "#outCaptcha");
        if (!box.isConnected) return; // đã rời trang
        if (ok) { PinLock.clear(id); await Store.signOut(); go("#/"); return; }
        $("#outPw").value = ""; conceal($("#outPw"));
        if (PinLock.fail(id)) { showWait("Mật khẩu chưa đúng."); return; }
        const left = PinLock.left(id);
        err(left <= 2 ? `Mật khẩu chưa đúng. Sai thêm ${left} lần nữa thì phải đợi một lúc.` : "Mật khẩu chưa đúng. Thử lại nhé.");
      } catch (e) { err(e.message); } finally { busy = false; if ($("#outYes")) $("#outYes").disabled = !!PinLock.wait(id); }
    };
    if (PinLock.wait(id)) showWait();
    setTimeout(() => { if ($("#outPw")) $("#outPw").focus({ preventScroll: true }); }, 30);
    box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /* ================= ĐỊNH TUYẾN ================= */
  function route() {
    if (quizRun) { quizRun.stop(); quizRun = null; }
    guard = null; closeLeave(); shownHash = location.hash;
    document.body.classList.remove("playing", "quizzing");
    foot.hidden = true;
    const old = $("#evDetail"); if (old) old.remove();
    document.title = TITLE;
    if (Store.cloud) {
      const st = Store.authState();
      if (st !== "ready") drawTabs(null);
      if (st === "signed-out") { renderCloudLogin(); return; }
      if (st === "change-password") { renderNewPassword(); return; }
      if (st !== "ready") { renderCloudBlocked(st); return; }
    } else if (!Store.isReady() && !Store.load()) { drawTabs(null); renderSetup(); return; }
    const u = Store.sessionUser();
    if (!u) { drawTabs(null); renderLogin(); return; }
    drawWho(u);
    const raw = (location.hash || "#/").slice(1), [path, qs] = raw.split("?");
    const query = {}; (qs || "").split("&").filter(Boolean).forEach((p) => { const [k, v] = p.split("="); query[decodeURIComponent(k)] = decodeURIComponent(v || ""); });
    const parts = path.split("/").filter(Boolean);
    const [name, a, b] = parts;
    window.scrollTo(0, 0);
    drawTabs(u, name === undefined ? "home" : name); // thanh tab dưới màn hình của học sinh (UX1)
    // Chú thích lịch thi cuối trang chỉ ở trang chủ (của quản trị là tab Tổng quan) và trang Lịch thi.
    foot.hidden = !(name === undefined || name === "home" || name === "calendar" || (name === "admin" && (!a || a === "overview" || (Store.cloud && a === "events"))));
    switch (name) {
      case "calendar": if (Store.cloud && u.role === "admin") { go("#/admin/events" + (qs ? "?" + qs : "")); return; } return renderCalendar(u, query); // phụ huynh bản đám mây: một nơi xem và sửa lịch (UX2)
      case "practice": if (u.role !== "student") { go("#/home"); return; } return renderPractice(u, query);
      case "results": if (u.role !== "student") { go("#/home"); return; } return renderResults(u);
      case "play": return renderPlay(u, a);
      case "quiz": return renderQuiz(u, a);
      case "account": return renderAccount(u);
      case "vao": location.replace("#/home"); return; // đã đăng nhập mà còn ở bước nhập PIN (UX4): về trang chính
      case "child":
      case "report": {
        const c = Store.user(a);
        const allowed = c && c.role === "student" && (u.role === "admin" || (u.role === "parent" && (c.parentIds || []).includes(u.id)));
        if (!allowed) { go("#/home"); return; }
        if (b === "practice") return renderChildPractice(c, u);
        if (b) return notFound();
        return renderReport(c, u); // hồ sơ của con = báo cáo tuần (UX2)
      }
      case "admin":
        if (a === "user") return renderUserForm(u, b || "new", query);
        if (u.role !== "admin") { go("#/home"); return; }
        if (a === "event") return renderEventForm(u, b || "new");
        if (a === "bank") return renderBankForm(u, b || "new");
        if (a && !adminKeys().includes(a)) return notFound();
        return renderAdmin(u, a, query);
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
    const calm = () => !/^\/(play|quiz|account|vao)|^\/admin\/(user|event|bank|data|settings)/.test((location.hash || "#/").slice(1)) && !$("#fixBox"); // #fixBox: đang sửa ngày thi tại chỗ (UX2); /vao: đang nhập PIN (UX4)
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
