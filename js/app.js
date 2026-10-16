/* App chính: đăng nhập, trang chủ theo vai trò, lịch thi cả năm, mở bài ôn, quản trị.
   Định tuyến bằng hash: #/home, #/calendar, #/play/<mã bài>, #/quiz/<mã ngân hàng>,
   #/child/<mã học sinh>, #/report/<mã học sinh>, #/admin/<tab>, #/admin/event/<mã|new>,
   #/admin/user/<mã|new>, #/admin/bank/<mã|new>, #/account. */
(function () {
  "use strict";
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const view = $("#view"), who = $("#who");
  const MODULES = window.ONTAP_MODULES || [];
  const modById = (id) => MODULES.find((m) => m.id === id) || null;
  const AVATARS = ["🐣", "🦊", "🐼", "🐯", "🐨", "🐸", "🦄", "🐙", "🐬", "🚀", "⚽", "🎨", "🌻", "🧭", "📚", "🌟"];
  const KIND = { "dinh-ki": "Kiểm tra định kì", ioe: "IOE", "thi-khac": "Thi khác", moc: "Mốc năm học" };
  const DAY = 864e5;
  const WD = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const TITLE = document.title;

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
  const go = (h) => { if (location.hash === h) route(); else location.hash = h; };
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
  /* Bàn phím PIN dùng chung cho đăng nhập trên máy và trên đám mây. submit(pin) được gọi khi bấm Vào hoặc đủ 6 số. */
  function wirePinBox(submit) {
    const inp = $("#pinIn");
    let pin = "";
    const set = (v) => { pin = v; inp.value = v; $("#pinDots").innerHTML = Array.from({ length: Math.max(4, pin.length) }, (_, i) => `<span class="${i < pin.length ? "on" : ""}"></span>`).join(""); };
    $$(".pad button").forEach((b) => (b.onclick = () => {
      const k = b.dataset.k;
      if (k === "ok") { submit(pin); return; }
      set(k === "del" ? pin.slice(0, -1) : pin.length < 6 ? pin + k : pin);
      if (pin.length === 6) submit(pin);
    }));
    inp.oninput = () => set(inp.value.replace(/\D/g, "").slice(0, 6));
    inp.onkeydown = (e) => { if (e.key === "Enter") submit(pin); };
    return {
      clear: () => set(""),
      show(u) {
        set(""); $("#pinErr").innerHTML = "";
        $("#pinWho").innerHTML = `${avatar(u)}<b>${esc(u.name)}</b>`;
        $("#pinBox").hidden = false; setTimeout(() => inp.focus({ preventScroll: true }), 30);
        $("#pinBox").scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    };
  }
  const pinError = (msg) => { $("#pinErr").innerHTML = `<div class="fb bad">${esc(msg)}</div>`; };

  const lock = { fails: 0, until: 0 };
  function renderLogin() {
    drawWho(null);
    const groups = [["student", "Học sinh"], ["parent", "Phụ huynh"], ["admin", "Quản trị"]];
    let sel = Store.user(Store.lastUserId()) ? Store.lastUserId() : null;
    view.innerHTML = `<div class="stack">
      <div><h1>Xin chào!</h1><p class="muted">${esc(Store.settings().schoolName || "Chọn tên của bạn để bắt đầu.")}</p></div>
      ${groups.map(([role, name]) => { const us = Store.users(role); return us.length ? `<section class="sec"><div class="label">${name}</div><div class="tiles">${us.map((u) => `<button class="tile" data-u="${u.id}" aria-pressed="${u.id === sel}">${avatar(u, true)}<span class="nm">${esc(u.name)}</span><span class="small muted">${esc(gradeTxt(u))}</span></button>`).join("")}</div></section>` : ""; }).join("")}
      ${pinBoxHTML()}</div>`;
    const box = wirePinBox(submit);
    function pick(id) {
      sel = id;
      $$(".tile").forEach((t) => t.setAttribute("aria-pressed", t.dataset.u === id));
      box.show(Store.user(id));
    }
    async function submit(pin) {
      if (!sel || !pin) return;
      if (Date.now() < lock.until) { pinError(`Sai nhiều lần. Đợi ${Math.ceil((lock.until - Date.now()) / 1000)} giây rồi thử lại.`); return; }
      if (await Store.checkPin(sel, pin)) { lock.fails = 0; Store.setSession(sel); go("#/home"); return; }
      lock.fails++; if (lock.fails >= 5) { lock.until = Date.now() + 30000; lock.fails = 0; }
      box.clear(); pinError("Mã PIN chưa đúng. Thử lại nhé.");
    }
    $$(".tile").forEach((t) => (t.onclick = () => pick(t.dataset.u)));
    if (sel) pick(sel);
    if (!Store.users().length) view.insertAdjacentHTML("afterbegin", `<div class="fb bad">Chưa có tài khoản nào.</div>`);
  }

  /* ================= ĐĂNG NHẬP ĐÁM MÂY (khi js/config.js có Supabase) ================= */
  const fmtCode = (c) => (c && c.length === 12 ? c.match(/.{4}/g).join("-") : c || "");
  function renderCloudLogin() {
    drawWho(null);
    const err = Store.authError();
    let code = Store.lastFamilyCode(), sel = null, busy = false;
    view.innerHTML = `<div class="stack">
      <div><h1>Xin chào!</h1><p class="muted">Học sinh nhập mã gia đình rồi chọn tên. Bố mẹ, thầy cô đăng nhập bằng email.</p></div>
      ${err ? `<div class="fb bad">${esc(err)}</div>` : ""}
      <section class="panel" id="kidBox"><h2>Học sinh</h2>
        <form class="row" id="codeForm" autocomplete="off" style="align-items:flex-end">
          <label class="field" style="flex:1;min-width:150px"><span>Mã gia đình</span><input id="fCode" class="code-in" value="${esc(code)}" maxlength="12" autocapitalize="characters" spellcheck="false" placeholder="Ví dụ: K7M2QD"></label>
          <button class="btn main" type="submit">Tiếp</button></form>
        <div class="captcha" id="kidCaptcha"></div>
        <div id="codeErr" aria-live="assertive"></div>
        <div id="kidList"></div>
      </section>
      ${pinBoxHTML()}
      <section class="panel" id="mailBox"><h2>Bố mẹ, thầy cô</h2>
        <p class="small">App gửi một đường link vào email của bạn. Bấm vào link là vào app, không cần mật khẩu.</p>
        <form class="stack" id="mailForm" style="gap:10px"><div class="row" style="align-items:flex-end"><label class="field" style="flex:1;min-width:200px"><span>Email</span><input id="mEmail" type="email" autocomplete="email" inputmode="email" required></label><button class="btn" type="submit" id="mSend">Gửi link đăng nhập</button></div>
          <div class="checks"><label><input type="checkbox" id="mRemember" ${Store.rememberLogin() ? "checked" : ""}>Ghi nhớ đăng nhập trên máy này (chỉ chọn nếu là máy riêng của bạn)</label></div></form>
        <div class="captcha" id="mailCaptcha"></div>
        <div id="mailMsg" aria-live="polite"></div>
      </section></div>`;
    const box = wirePinBox(submit);
    async function loadKids(c) {
      $("#codeErr").innerHTML = ""; $("#pinBox").hidden = true;
      $("#kidList").innerHTML = `<p class="muted small">Đang tìm…</p>`;
      try {
        const r = await Store.familyStudents(c);
        code = c;
        $("#kidList").innerHTML = r.students.length ? `<div class="sec"><div class="label">${esc(r.family || "Chọn tên của bạn")}</div><div class="tiles">${r.students.map((k) => `<button class="tile" data-u="${esc(k.id)}" aria-pressed="false">${avatar(k, true)}<span class="nm">${esc(k.name)}</span></button>`).join("")}</div></div>`
          : `<p class="muted">Gia đình này chưa có tài khoản học sinh.</p>`;
        $$("#kidList .tile").forEach((t) => (t.onclick = () => {
          sel = t.dataset.u;
          $$("#kidList .tile").forEach((x) => x.setAttribute("aria-pressed", x === t));
          box.show(r.students.find((k) => k.id === sel));
        }));
        const last = r.students.find((k) => k.id === Store.lastUserId());
        if (last) $(`#kidList .tile[data-u="${CSS.escape(last.id)}"]`).click();
      } catch (e) { $("#kidList").innerHTML = ""; $("#codeErr").innerHTML = `<div class="fb bad">${esc(e.message)}</div>`; }
    }
    async function submit(pin) {
      if (!sel || !pin || busy) return;
      busy = true;
      try {
        const r = await Store.studentLogin(code, sel, pin);
        if (r.ok && r.mustChange) { toast("Bạn hãy đặt mã PIN mới 6 số nhé."); go("#/account"); return; }
        if (r.ok) { go("#/home"); return; }
        box.clear(); pinError(r.message || "Chưa đăng nhập được. Thử lại nhé.");
      } catch (e) { box.clear(); pinError(e.message); } finally { busy = false; }
    }
    $("#codeForm").onsubmit = (e) => { e.preventDefault(); const c = $("#fCode").value.trim().toUpperCase(); if (c) loadKids(c); };
    // Chỉ tự hiện danh sách khi tab này đã có phiên học sinh; tab mới thì chờ bấm "Tiếp" (đỡ tạo phiên thừa).
    if (code && Store.studentTab()) loadKids(code);
    $("#mailForm").onsubmit = async (e) => {
      e.preventDefault();
      const email = $("#mEmail").value.trim(), btn = $("#mSend");
      btn.disabled = true;
      try {
        await Store.sendLink(email, $("#mRemember").checked);
        $("#mailMsg").innerHTML = `<div class="fb ok">Đã gửi đến ${esc(email)}. Mở email và bấm vào link đăng nhập. Không thấy thư thì xem mục Spam (Thư rác).</div>
          <form class="row" id="otpForm" autocomplete="off" style="align-items:flex-end"><label class="field" style="flex:1;min-width:150px"><span>Hoặc nhập mã số trong email</span><input id="mCode" inputmode="numeric" maxlength="10" autocomplete="one-time-code"></label><button class="btn sm" type="submit">Vào</button></form>
          <div id="otpErr" aria-live="assertive"></div>`;
        $("#otpForm").onsubmit = async (ev) => {
          ev.preventDefault();
          try { await Store.verifyCode(email, $("#mCode").value); go("#/home"); }
          catch (er) { $("#otpErr").innerHTML = `<div class="fb bad">${esc(er.message)}</div>`; }
        };
      } catch (er) { $("#mailMsg").innerHTML = `<div class="fb bad">${esc(er.message)}</div>`; } finally { btn.disabled = false; }
    };
  }

  /* Đã đăng nhập email nhưng chưa thuộc gia đình nào: nhập mã mời hoặc tạo gia đình mới. */
  function renderCloudJoin() {
    drawWho(null);
    let emo = "🧭";
    view.innerHTML = `<div class="stack">
      <section class="hero"><span class="label">Đã đăng nhập</span><h1>Chào bạn!</h1><p>Email ${esc(Store.authEmail())} chưa thuộc gia đình nào trong app.</p></section>
      <form class="panel" id="invForm" autocomplete="off"><h2>Tôi có mã mời</h2>
        <p class="small">Người quản trị (bố mẹ hoặc thầy cô) tạo tài khoản cho bạn trong app và gửi bạn một mã mời 12 kí tự.</p>
        <div class="row" style="align-items:flex-end"><label class="field" style="flex:1;min-width:180px"><span>Mã mời</span><input id="jInvite" class="code-in" maxlength="20" autocapitalize="characters" spellcheck="false" placeholder="XXXX-XXXX-XXXX"></label><button class="btn main" type="submit">Vào gia đình</button></div>
        <div id="jErr" aria-live="assertive"></div></form>
      <form class="panel" id="setupForm" autocomplete="off"><h2>Tạo gia đình mới</h2>
        <p class="small">Bạn sẽ là người quản trị: thêm tài khoản học sinh, phụ huynh và chỉnh lịch thi.</p>
        <div class="form">
          <label class="field"><span>Tên trường hoặc gia đình <span class="opt-note">· không bắt buộc</span></span><input id="sSchool" placeholder="Ví dụ: Lớp 4A Trường Tiểu học Kim Đồng"></label>
          <label class="field"><span>Tên của bạn</span><input id="sName" placeholder="Ví dụ: Cô Lan, Bố Minh" required maxlength="40"></label>
          <div class="field full"><span>Hình đại diện</span>${emojiPicker(emo)}</div>
        </div>
        <div id="sErr"></div>
        <div class="row"><button class="btn main" type="submit">Tạo và bắt đầu</button></div></form>
      <div class="row"><button class="btn ghost" id="jOut">Đăng xuất</button></div></div>`;
    wireEmoji(view, (e) => (emo = e));
    $("#invForm").onsubmit = async (ev) => {
      ev.preventDefault();
      try { await Store.claimInvite($("#jInvite").value); toast("Đã vào gia đình"); go("#/home"); }
      catch (e) { $("#jErr").innerHTML = `<div class="fb bad">${esc(e.message)}</div>`; }
    };
    $("#setupForm").onsubmit = async (ev) => {
      ev.preventDefault();
      try { await Store.createFamily({ schoolName: $("#sSchool").value, name: $("#sName").value, avatar: emo }); toast("Đã tạo gia đình"); go("#/admin/users"); }
      catch (e) { $("#sErr").innerHTML = `<div class="fb bad">${esc(e.message)}</div>`; }
    };
    $("#jOut").onclick = () => { Store.setSession(null); route(); };
  }
  const famCodeBox = () => (Store.cloud ? `<section class="panel small"><div class="row between"><span>Mã gia đình để con đăng nhập trên máy khác</span><b class="code sm">${esc(Store.familyCode())}</b></div></section>` : "");

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

  function practiceCards(mods, bks, canPlay) {
    if (!mods.length && !bks.length) return `<div class="panel muted">Chưa có bài ôn cho mục này. Quản trị viên có thể nhập ngân hàng câu hỏi trong mục Quản trị.</div>`;
    return `<div class="grid2">${mods.map((m) => `<div class="panel"><b>${esc(m.title)}</b><span class="small muted">${esc(m.desc)}</span><div class="row"><a class="btn ${canPlay ? "main" : ""} sm" href="#/play/${esc(m.id)}">${canPlay ? "Vào ôn" : "Xem thử"}</a></div></div>`).join("")}
      ${bks.map((b) => `<div class="panel"><b>${esc(b.title)}</b><span class="small muted">${b.questions.length} câu${b.minutes ? " · " + b.minutes + " phút khi làm như thi" : ""}</span><div class="row"><a class="btn ${canPlay ? "main" : ""} sm" href="#/quiz/${esc(b.id)}">${canPlay ? "Làm bài" : "Xem thử"}</a></div></div>`).join("")}</div>`;
  }

  function renderStudent(s, viewer, asObserver) {
    const results = Store.resultsFor(s.id), next = nextEvent(s.grade);
    const w7 = within(results, 7), [r30, t30] = sumRT(within(results, 30));
    const evs = Store.events(s.grade).filter((e) => status(e) !== "past").slice(0, 5);
    const allMods = MODULES.filter((m) => m.grade === s.grade), allBanks = Store.banks(s.grade);
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
        <div class="row">${mods.map((m) => `<a class="btn main" href="#/play/${esc(m.id)}">${esc(m.title)}</a>`).join("")}${bks.map((b) => `<a class="btn ${mods.length ? "ghost" : "main"}" href="#/quiz/${esc(b.id)}">${esc(b.title)}</a>`).join("")}</div>
      </section>`;
    }
    const subs = bySubject(within(results, 30)), weakList = wrongTopics(within(results, 30)).slice(0, 5);
    view.innerHTML = `<div class="stack">
      ${asObserver ? `<div class="row between">${back(viewer.role === "admin" ? "#/admin/overview" : "#/home", "Về danh sách")}${viewer.role !== "student" ? `<a class="btn ghost sm" href="#/admin/user/${esc(s.id)}">Sửa hồ sơ</a>` : ""}</div>
        <div class="row between"><div class="row">${avatar(s, true)}<div><h2>${esc(s.name)}</h2><span class="muted">${esc(gradeTxt(s))}</span></div></div><a class="btn main sm" id="toReport" href="#/report/${esc(s.id)}">Báo cáo tuần</a></div>` : `<div><h2>Chào ${esc(s.name)}! ${esc(s.avatar)}</h2><span class="muted">${esc(gradeTxt(s))}</span></div>`}
      ${hero}
      <div class="stats">
        <div class="stat"><b>${w7.length}</b><span>bài trong 7 ngày</span></div>
        <div class="stat"><b>${t30 ? d10(r30, t30) : "–"}</b><span>điểm TB 30 ngày (/10)</span></div>
        <div class="stat"><b>${streak(results)}</b><span>ngày ôn liên tiếp</span></div>
      </div>
      ${subs.length ? `<section class="panel"><div class="label">Theo môn · 30 ngày</div><div class="ubreak">${subs.map(({ name, r, t }) => `<span>${esc(name)}</span><div class="bar ${pct(r, t) >= 80 ? "good" : ""}"><i style="width:${pct(r, t)}%"></i></div><span>${pct(r, t)}%</span>`).join("")}</div></section>` : ""}
      ${weakList.length ? `<section class="panel"><div class="label">Chủ đề hay sai</div><div class="tags">${weakList.map(([t, n]) => `<span class="tag warn">${esc(t)} · ${n} câu</span>`).join("")}</div></section>` : ""}
      <section class="sec"><div class="row between"><h2>Lịch thi sắp tới</h2><a class="linkbtn" href="#/calendar">Cả năm →</a></div>
        <div class="timeline">${evs.map((e) => eventRow(e, { grade: s.grade, student: s, results })).join("") || `<div class="panel muted">Không còn kì thi nào trong năm học.</div>`}</div></section>
      <section class="sec"><h2>Tất cả bài ôn lớp ${s.grade}</h2>${practiceCards(allMods, allBanks, !asObserver)}</section>
      <section class="sec"><h2>Kết quả gần đây</h2>${resultsList(results.slice(0, asObserver ? 30 : 10))}</section>
    </div>`;
    wireEvents(view, s.grade, s); wireGo();
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

  const pinTag = (u) => (u.pinLocked ? " · PIN bị khóa, cần đặt lại" : u.pinOld ? " · nên đặt PIN mới 6 số" : "");
  function childCard(c) {
    const res = Store.resultsFor(c.id), nx = nextEvent(c.grade), [r, t] = sumRT(within(res, 30));
    return `<button class="item" data-child="${esc(c.id)}">${avatar(c)}<span class="grow"><b>${esc(c.name)}</b>
      <span class="small muted">${esc(gradeTxt(c))}${esc(pinTag(c))} · ${res.length ? "Lần cuối: " + esc(ago(res[0].at)) : "Chưa làm bài nào"}${t ? " · TB 30 ngày " + d10(r, t) + "/10" : ""}</span>
      ${nx ? `<span class="small">Sắp tới: ${esc(nx.title)} · ${esc(range(nx))}</span>` : ""}</span><span aria-hidden="true">›</span></button>`;
  }
  function renderParent(p) {
    const kids = Store.childrenOf(p.id);
    view.innerHTML = `<div class="stack">
      <div><h2>Chào ${esc(p.name)}</h2><span class="muted">Theo dõi việc ôn thi của con.</span></div>
      <section class="sec"><div class="row between"><h2>Con của tôi</h2><button class="btn sm" id="addKid">+ Thêm con</button></div>
        ${kids.length ? `<div class="list">${kids.map(childCard).join("")}</div>` : `<div class="panel muted">Chưa có tài khoản con. Bấm “Thêm con” để tạo, hoặc nhờ quản trị viên gắn tài khoản của con vào.</div>`}</section>
      ${[4, 6].filter((g) => kids.some((k) => k.grade === g)).map((g) => `<section class="sec"><div class="row between"><h2>Lịch thi lớp ${g}</h2><a class="linkbtn" href="#/calendar">Cả năm →</a></div><div class="timeline">${Store.events(g).filter((e) => status(e) !== "past").slice(0, 4).map((e) => eventRow(e, { grade: g })).join("")}</div></section>`).join("")}
      ${famCodeBox()}
      <section class="panel small"><b>Gợi ý cho phụ huynh</b><span>Mỗi ngày con làm 1 đề ngắn (20–30 phút) tốt hơn làm dồn cuối tuần. Xem mục “Chủ đề hay sai” trong hồ sơ của con để biết cần ôn lại phần nào.</span></section>
    </div>`;
    $$("[data-child]").forEach((b) => (b.onclick = () => go("#/child/" + b.dataset.child)));
    $("#addKid").onclick = () => go("#/admin/user/new?role=student");
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
      ${e.kind !== "moc" ? `<div class="label">Bài ôn cho kì này</div>${practiceCards(mods, bks, canPlay)}` : ""}
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
    const kidGrades = u.role === "parent" ? [...new Set(Store.childrenOf(u.id).map((k) => k.grade))] : [];
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
      ${fixed ? "" : `<div class="tabs" role="group" aria-label="Chọn khối">${[[0, "Cả hai khối"], [4, "Lớp 4"], [6, "Lớp 6"]].map(([g, t]) => `<button data-g="${g}" aria-pressed="${calGrade === g}">${t}</button>`).join("")}</div>`}
      <div class="timeline">
        ${Object.keys(months).sort().map((k) => `<div class="month">Tháng ${(k % 100) + 1}/${Math.floor(k / 100)}</div>${months[k].map((e) => eventRow(e, { grade: calGrade || null, student, results })).join("")}`).join("")}
        ${undated.length ? `<div class="month">Chưa có lịch</div>${undated.map((e) => eventRow(e, { grade: calGrade || null })).join("")}` : ""}
      </div></div>`;
    $$("[data-g]").forEach((b) => (b.onclick = () => { calGrade = +b.dataset.g; renderCalendar(u); }));
    wireEvents(view, calGrade || null, student); wireGo();
  }

  /* ================= MỞ BÀI ÔN ================= */
  function renderPlay(u, id) {
    const m = modById(id);
    if (!m) { view.innerHTML = `<div class="panel">Không tìm thấy bài ôn. ${back("#/home", "Trang chính")}</div>`; wireGo(); return; }
    const src = m.path + "?u=" + encodeURIComponent(u.id) + "&m=" + encodeURIComponent(m.id);
    view.innerHTML = `<div class="player">
      <div class="row between">${back("#/home", "Trang chính")}<span class="small muted">${u.role === "student" ? "Điểm mỗi lần làm xong được lưu vào hồ sơ của bạn." : "Chế độ xem thử: điểm không được lưu."}</span></div>
      <iframe id="playerFrame" title="${esc(m.title)}" src="${esc(src)}"></iframe></div>`;
    wireGo();
  }
  window.addEventListener("message", (e) => {
    const fr = $("#playerFrame");
    if (!fr || e.source !== fr.contentWindow) return;
    if (location.origin !== "null" && e.origin !== location.origin) return;
    const d = e.data; if (!d || d.type !== "ontap:result") return;
    const u = Store.sessionUser(); if (!u || u.role !== "student") return;
    const m = modById(d.module); if (!m) return;
    if (!(+d.t > 0)) return;
    Store.addResult({ userId: u.id, source: "module", refId: m.id, subject: (m.subjects && m.subjects[d.subject]) || "", label: d.label, mode: d.mode, r: d.r, t: d.t, s: d.s });
    toast(`Đã lưu kết quả: ${+d.r}/${+d.t} câu đúng`);
  });

  /* ================= LÀM BÀI TỪ NGÂN HÀNG ================= */
  let quizRun = null;
  function renderQuiz(u, id) {
    const b = Store.bank(id);
    if (!b) { view.innerHTML = `<div class="panel">Không tìm thấy ngân hàng câu hỏi. ${back("#/home", "Trang chính")}</div>`; wireGo(); return; }
    view.innerHTML = `<div class="stack">${back("#/home", "Trang chính")}
      <section class="hero"><span class="label">Lớp ${b.grade} · ${esc(b.subject)}</span><h1>${esc(b.title)}</h1>
        <p>${b.questions.length} câu.${b.note ? " " + esc(b.note) : ""}</p>
        <div class="row"><button class="btn main" id="qPractice">Ôn luyện (xem đáp án từng câu)</button>${b.minutes ? `<button class="btn ghost" id="qExam">Làm như thi · ${b.minutes} phút</button>` : ""}</div></section>
      ${u.role !== "student" ? `<div class="notice">Chế độ xem thử: điểm không được lưu.</div>` : ""}</div>`;
    wireGo();
    const start = (mode) => {
      quizRun = Quiz.run(view, b, {
        mode, onExit: () => go("#/home"),
        onFinish: (res) => { if (u.role === "student") { Store.addResult(Object.assign({ userId: u.id, source: "bank", refId: b.id, subject: b.subject, label: b.title }, res)); toast("Đã lưu kết quả"); } }
      });
    };
    $("#qPractice").onclick = () => start("practice");
    if ($("#qExam")) $("#qExam").onclick = () => start("exam");
  }

  /* ================= QUẢN TRỊ ================= */
  const ADMIN_TABS = [["overview", "Tổng quan"], ["users", "Tài khoản"], ["events", "Lịch thi"], ["banks", "Ngân hàng đề"], ["data", "Dữ liệu"]];
  function adminTabs(cur) { return `<div class="tabs" role="group" aria-label="Mục quản trị">${ADMIN_TABS.map(([k, t]) => `<button data-go="#/admin/${k}" aria-pressed="${k === cur}">${t}</button>`).join("")}</div>`; }
  function renderAdmin(u, tab) {
    if (u.role !== "admin") { go("#/home"); return; }
    tab = ADMIN_TABS.some(([k]) => k === tab) ? tab : "overview";
    let body = "";
    if (tab === "overview") {
      const studs = Store.users("student");
      body = `<div class="stats"><div class="stat"><b>${studs.length}</b><span>học sinh</span></div><div class="stat"><b>${Store.users("parent").length}</b><span>phụ huynh</span></div><div class="stat"><b>${within(Store.data().results, 7).length}</b><span>bài làm 7 ngày qua</span></div></div>
        ${!Store.persistent() ? `<div class="fb bad">Trình duyệt đang chặn lưu dữ liệu. Dữ liệu sẽ mất khi tải lại trang.</div>` : ""}
        ${famCodeBox()}
        <section class="sec"><h2>Học sinh</h2>${studs.length ? `<div class="list">${studs.map(childCard).join("")}</div>` : `<div class="panel">Chưa có học sinh. <div class="row"><a class="btn main" href="#/admin/user/new?role=student">Thêm học sinh</a></div></div>`}</section>
        ${[4, 6].map((g) => { const n = nextEvent(g); return n ? `<section class="sec"><h2>Kì thi tiếp theo · Lớp ${g}</h2><div class="timeline">${eventRow(n, { grade: g })}</div></section>` : ""; }).join("")}`;
    } else if (tab === "users") {
      const sect = (role, name) => { const us = Store.users(role); return `<section class="sec"><div class="row between"><h2>${name} (${us.length})</h2><a class="btn sm" href="#/admin/user/new?role=${role}">+ Thêm</a></div>${us.length ? `<div class="list">${us.map((x) => `<a class="item" href="#/admin/user/${esc(x.id)}" style="color:inherit;text-decoration:none">${avatar(x)}<span class="grow"><b>${esc(x.name)}</b><span class="small muted">${esc(gradeTxt(x))}${pinTag(x)}${role === "student" ? " · Phụ huynh: " + esc((x.parentIds || []).map((p) => (Store.user(p) || {}).name).filter(Boolean).join(", ") || "chưa gắn") : role === "parent" ? " · Con: " + esc(Store.childrenOf(x.id).map((c) => c.name).join(", ") || "chưa gắn") : ""}${Store.cloud && role !== "student" ? (x.linked ? " · đã gắn email" : " · chưa gắn email") : ""}</span></span><span aria-hidden="true">›</span></a>`).join("")}</div>` : `<div class="panel muted">Chưa có.</div>`}</section>`; };
      body = sect("student", "Học sinh") + sect("parent", "Phụ huynh") + sect("admin", "Quản trị");
    } else if (tab === "events") {
      body = `<div class="row between"><p class="muted small" style="flex:1">Sửa ngày khi trường thông báo, gắn bài ôn vào từng kì thi.</p><a class="btn main sm" href="#/admin/event/new">+ Thêm kì thi</a></div>
        <div class="list">${Store.events().map((e) => `<a class="item" href="#/admin/event/${esc(e.id)}" style="color:inherit;text-decoration:none"><span class="grow"><b>${esc(e.title)} · Lớp ${esc(e.grades.join(", "))}</b><span class="small muted">${esc(range(e))}${e.tentative && e.start ? " · dự kiến" : ""} · ${(e.modules || []).length + (e.banks || []).length} bài ôn</span></span><span aria-hidden="true">›</span></a>`).join("")}</div>
        <div class="row"><button class="btn ghost sm" id="resetEv">Khôi phục lịch mặc định</button></div><div id="resetArea"></div>`;
    } else if (tab === "banks") {
      body = `<div class="row between"><p class="muted small" style="flex:1">Dán câu hỏi từ Word, Zalo, sách bài tập. App tự nhận dạng trắc nghiệm, điền khuyết, đúng/sai.</p><a class="btn main sm" href="#/admin/bank/new">+ Nhập ngân hàng</a></div>
        <div class="list">${Store.banks().map((b) => `<a class="item" href="#/${b.seed ? "quiz" : "admin/bank"}/${esc(b.id)}" style="color:inherit;text-decoration:none"><span class="grow"><b>${esc(b.title)}</b><span class="small muted">Lớp ${b.grade} · ${esc(b.subject)} · ${b.questions.length} câu${b.seed ? " · có sẵn (chỉ xem)" : ""}</span></span><span aria-hidden="true">›</span></a>`).join("")}</div>`;
    } else if (tab === "data" && Store.cloud) {
      const st = Store.settings(), loc = Store.localData(), mig = Store.migratedAt();
      const n = (role) => (loc ? loc.users.filter((x) => x.role === role).length : 0);
      body = `<section class="panel"><h3>Thông tin chung</h3><div class="form">
          <label class="field"><span>Tên trường hoặc gia đình</span><input id="dSchool" value="${esc(st.schoolName || "")}"></label>
          <label class="field"><span>Năm học</span><input id="dYear" value="${esc(st.schoolYear || "")}"></label></div>
          <div class="row"><button class="btn sm" id="dSave">Lưu</button></div></section>
        <section class="panel"><h3>Mã gia đình</h3><p class="small">Học sinh nhập mã này ở màn hình đăng nhập, chọn tên rồi nhập mã PIN.</p>
          <div class="row"><span class="code" id="dCode">${esc(st.joinCode || "")}</span><button class="btn ghost sm" id="dNewCode">Đổi mã</button></div><div id="dCodeArea"></div></section>
        <section class="panel" id="migBox"><h3>Chuyển dữ liệu máy này lên đám mây</h3>
          ${loc ? `<p class="small">Trình duyệt này còn dữ liệu của bản lưu trên máy: ${n("student")} học sinh, ${n("parent")} phụ huynh, ${(loc.results || []).length} kết quả.${mig ? ` Đã chuyển lần gần nhất: ${esc(ago(mig))}.` : ""}</p>`
            : `<p class="small">Trình duyệt này không có dữ liệu cũ. Nếu dữ liệu nằm ở máy khác: mở app trên máy đó, đăng nhập quản trị bằng email rồi bấm nút này ở đó; hoặc chọn file sao lưu đã tải từ bản lưu trên máy.</p>`}
          <p class="small muted">Học sinh giữ mã PIN cũ. Phụ huynh và quản trị khác nhận mã mời để gắn email của họ. Chuyển lại nhiều lần không bị trùng.</p>
          <div class="row"><button class="btn main sm" id="dMigrate" ${loc ? "" : "disabled"}>Chuyển dữ liệu máy này lên đám mây</button><label class="btn ghost sm" for="dMigFile">Chuyển từ file sao lưu</label><input type="file" id="dMigFile" accept=".json,application/json" hidden></div>
          <div id="migRes" aria-live="polite"></div></section>
        <section class="panel"><h3>Sao lưu</h3><p class="small">Tải bản sao dữ liệu trên đám mây về máy (không chứa mã PIN).</p>
          <div class="row"><button class="btn sm" id="dExport">Tải file sao lưu</button></div></section>
        <section class="panel"><h3>Xóa toàn bộ dữ liệu trên đám mây</h3><p class="small">Xóa gia đình này cùng mọi hồ sơ, kết quả và lịch đã sửa trên máy chủ. Không hoàn tác được. Email đăng nhập của bố mẹ, thầy cô vẫn còn trong Supabase (xóa ở Authentication → Users nếu muốn).</p>
          <div class="row"><button class="btn danger sm" id="dWipe">Xóa toàn bộ…</button></div><div id="wipeArea"></div></section>`;
    } else if (tab === "data") {
      const st = Store.settings();
      body = `<section class="panel"><h3>Thông tin chung</h3><div class="form">
          <label class="field"><span>Tên trường hoặc gia đình</span><input id="dSchool" value="${esc(st.schoolName || "")}"></label>
          <label class="field"><span>Năm học</span><input id="dYear" value="${esc(st.schoolYear || "")}"></label></div>
          <div class="row"><button class="btn sm" id="dSave">Lưu</button></div></section>
        <section class="panel"><h3>Sao lưu và chuyển máy</h3>
          <p class="small">Dữ liệu đang nằm trên trình duyệt của máy này. Tải file sao lưu mỗi tuần; muốn dùng trên máy khác thì mở app ở máy đó và chọn “Khôi phục từ file”.</p>
          <div class="row"><button class="btn main sm" id="dExport">Tải file sao lưu</button><label class="btn ghost sm" for="dImport">Khôi phục từ file</label><input type="file" id="dImport" accept=".json,application/json" hidden></div></section>
        <section class="panel"><h3>Xóa toàn bộ dữ liệu</h3><p class="small">Xóa mọi tài khoản, kết quả và lịch đã sửa trên máy này. Không hoàn tác được.</p>
          <div class="row"><button class="btn danger sm" id="dWipe">Xóa toàn bộ…</button></div><div id="wipeArea"></div></section>`;
    }
    view.innerHTML = `<div class="stack"><div><h2>Quản trị</h2><span class="muted">${esc(Store.settings().schoolName || "")}</span></div>${adminTabs(tab)}${body}</div>`;
    wireGo();
    $$("[data-child]").forEach((b) => (b.onclick = () => go("#/child/" + b.dataset.child)));
    wireEvents(view, null, null);
    if (tab === "events") $("#resetEv").onclick = () => {
      $("#resetArea").innerHTML = `<div class="confirm"><div>Chép lại lịch thi gốc? Các kì thi bạn đã thêm hoặc sửa sẽ bị thay thế.</div><div class="row"><button class="btn danger sm" id="rsYes">Khôi phục</button><button class="btn ghost sm" id="rsNo">Thôi</button></div></div>`;
      $("#rsYes").onclick = () => { Store.resetEvents(); toast("Đã khôi phục lịch mặc định"); renderAdmin(u, "events"); };
      $("#rsNo").onclick = () => ($("#resetArea").innerHTML = "");
    };
    if (tab === "data") {
      $("#dSave").onclick = () => { Store.setSettings({ schoolName: $("#dSchool").value.trim(), schoolYear: $("#dYear").value.trim() }); toast("Đã lưu"); };
      $("#dExport").onclick = () => { const d = new Date(); download(`on-thi-sao-luu-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}.json`, Store.exportJSON()); };
      if ($("#dImport")) $("#dImport").onchange = (e) => importFile(e.target.files[0], () => go("#/"));
      if (Store.cloud) wireCloudData();
      $("#dWipe").onclick = () => {
        $("#wipeArea").innerHTML = `<div class="confirm"><label class="field"><span>Gõ XOA để xác nhận</span><input id="wipeTxt" autocomplete="off"></label><div class="row"><button class="btn danger sm" id="wipeYes">Xóa hết</button><button class="btn ghost sm" id="wipeNo">Thôi</button></div></div>`;
        $("#wipeYes").onclick = () => { if ($("#wipeTxt").value.trim().toUpperCase() !== "XOA") { toast("Gõ đúng chữ XOA"); return; } Store.wipe(); go("#/"); };
        $("#wipeNo").onclick = () => ($("#wipeArea").innerHTML = "");
      };
    }
  }

  function wireCloudData() {
    $("#dNewCode").onclick = () => {
      $("#dCodeArea").innerHTML = `<div class="confirm"><div>Đổi mã gia đình? Mã cũ sẽ không dùng được nữa và mọi máy của học sinh phải đăng nhập lại bằng mã mới.</div><div class="row"><button class="btn danger sm" id="ncYes">Đổi mã</button><button class="btn ghost sm" id="ncNo">Thôi</button></div></div>`;
      $("#ncYes").onclick = async () => { try { $("#dCode").textContent = await Store.newJoinCode(); toast("Đã đổi mã gia đình"); } catch (e) { toast(e.message); } $("#dCodeArea").innerHTML = ""; };
      $("#ncNo").onclick = () => ($("#dCodeArea").innerHTML = "");
    };
    const doMig = async (data) => {
      const btn = $("#dMigrate"); btn.disabled = true;
      $("#migRes").innerHTML = `<p class="muted small">Đang chuyển…</p>`;
      try {
        const res = await Store.migrate(data);
        const inv = res.invites || [];
        $("#migRes").innerHTML = `<div class="fb ok">Đã chuyển lên đám mây: ${+res.users || 0} tài khoản mới, ${+res.results || 0} kết quả.</div>
          ${inv.length ? `<div class="stack tight"><b>Mã mời cho phụ huynh, quản trị</b><span class="small">Gửi mỗi người mã của mình. Họ mở app, đăng nhập bằng email rồi nhập mã mời.</span>
            <div class="list">${inv.map((i) => `<div class="item"><span class="grow"><b>${esc(i.name)}</b><span class="small muted">${esc(Store.ROLES[i.role] || "")}</span></span><span class="code sm">${esc(fmtCode(i.code))}</span></div>`).join("")}</div></div>` : ""}`;
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
    const isAdmin = viewer.role === "admin";
    const editing = id !== "new" ? Store.user(id) : null;
    if (id !== "new" && !editing) { go("#/home"); return; }
    if (!isAdmin) {
      const ok = viewer.role === "parent" && (id === "new" ? query.role === "student" : editing.role === "student" && (editing.parentIds || []).includes(viewer.id));
      if (!ok) { go("#/home"); return; }
    }
    const role = editing ? editing.role : (Store.ROLES[query.role] ? query.role : "student");
    let emo = editing ? editing.avatar : role === "student" ? "🐣" : role === "parent" ? "🌻" : "🧭";
    const parents = Store.users("parent"), studs = Store.users("student");
    const backTo = isAdmin ? "#/admin/users" : editing ? "#/child/" + editing.id : "#/home";
    view.innerHTML = `<div class="stack">${back(backTo)}
      <h2>${editing ? "Sửa tài khoản" : "Thêm " + Store.ROLES[role].toLowerCase()}</h2>
      <form class="panel" id="uForm" autocomplete="off"><div class="form">
        <label class="field"><span>Tên hiển thị</span><input id="uName" value="${esc(editing ? editing.name : "")}" required maxlength="40" placeholder="${role === "student" ? "Ví dụ: Bin, Minh Anh" : "Ví dụ: Mẹ Bin"}"></label>
        ${!Store.cloud || role === "student" ? `<label class="field"><span>${editing ? "Mã PIN mới (để trống nếu giữ nguyên)" : Store.cloud ? "Mã PIN (6 chữ số)" : "Mã PIN (4–6 chữ số)"}</span><input id="uPin" type="password" inputmode="numeric" maxlength="6" ${editing ? "" : "required"}></label>` : ""}
        ${role === "student" ? `<label class="field"><span>Khối</span><select id="uGrade"><option value="4" ${editing && editing.grade === 4 ? "selected" : ""}>Lớp 4</option><option value="6" ${editing && editing.grade === 6 ? "selected" : ""}>Lớp 6</option></select></label>
          <label class="field"><span>Lớp (không bắt buộc)</span><input id="uClass" value="${esc(editing ? editing.className || "" : "")}" placeholder="Ví dụ: 4A"></label>` : ""}
        <div class="field full"><span>Hình đại diện</span>${emojiPicker(emo)}</div>
        ${isAdmin && role === "student" ? `<div class="field full"><span>Phụ huynh</span>${parents.length ? `<div class="checks">${parents.map((p) => `<label><input type="checkbox" name="par" value="${esc(p.id)}" ${editing && (editing.parentIds || []).includes(p.id) ? "checked" : ""}>${esc(p.name)}</label>`).join("")}</div>` : `<span class="small muted">Chưa có tài khoản phụ huynh.</span>`}</div>` : ""}
        ${isAdmin && role === "parent" ? `<div class="field full"><span>Con</span>${studs.length ? `<div class="checks">${studs.map((s) => `<label><input type="checkbox" name="kid" value="${esc(s.id)}" ${editing && (s.parentIds || []).includes(editing.id) ? "checked" : ""}>${esc(s.name)} (lớp ${s.grade})</label>`).join("")}</div>` : `<span class="small muted">Chưa có tài khoản học sinh.</span>`}</div>` : ""}
      </div><div id="uErr"></div>
      <div class="row"><button class="btn main" type="submit">${editing ? "Lưu" : "Tạo tài khoản"}</button>${editing && (isAdmin || role === "student") && editing.id !== viewer.id ? `<button class="btn danger" type="button" id="uDel">Xóa tài khoản</button>` : ""}</div>
      <div id="uDelArea"></div></form>
      ${Store.cloud && role !== "student" ? inviteBox(editing, viewer) : ""}
      ${Store.cloud && editing && role === "student" ? `<section class="panel" id="kidBox"><h3>Đăng nhập của con</h3>
        ${editing.pinLocked ? `<div class="fb bad">Mã PIN của con đang bị khóa vì nhập sai nhiều lần. Đặt mã PIN mới ở trên để mở khóa.</div>` : editing.pinOld ? `<div class="notice">Con đang dùng mã PIN cũ chuyển từ máy. Nên đặt mã PIN mới 6 số.</div>` : ""}
        <p class="small">Đổi mã PIN cũng đăng xuất con khỏi mọi máy.</p>
        <div class="row"><button class="btn ghost sm" type="button" id="uKidOut">Đăng xuất mọi máy của con</button></div></section>` : ""}</div>`;
    wireGo(); wireEmoji(view, (e) => (emo = e));
    if ($("#uKidOut")) $("#uKidOut").onclick = async () => {
      try { const n = await Store.signOutChild(editing.id); toast(n ? "Đã đăng xuất con khỏi " + n + " máy" : "Con chưa đăng nhập trên máy nào"); } catch (e) { toast(e.message); }
    };
    if ($("#uInv")) $("#uInv").onclick = () => {
      const make = async () => { try { await Store.newInvite(editing.id); toast("Đã tạo mã mời mới"); renderUserForm(viewer, id, query); } catch (e) { toast(e.message); } };
      if (!editing.linked) { make(); return; }
      $("#uInvArea").innerHTML = `<div class="confirm"><div>Gỡ email đang gắn với ${esc(editing.name)}? Người đó sẽ không vào được nữa cho tới khi nhập mã mời mới.</div><div class="row"><button class="btn danger sm" type="button" id="invYes">Gỡ và tạo mã mới</button><button class="btn ghost sm" type="button" id="invNo">Thôi</button></div></div>`;
      $("#invYes").onclick = make; $("#invNo").onclick = () => ($("#uInvArea").innerHTML = "");
    };
    $("#uForm").onsubmit = async (ev) => {
      ev.preventDefault();
      const data = { name: $("#uName").value, pin: $("#uPin") ? $("#uPin").value.trim() : "", avatar: emo };
      if (role === "student") { data.grade = +$("#uGrade").value; data.className = $("#uClass").value; }
      if (isAdmin && role === "student") data.parentIds = $$("input[name=par]:checked").map((x) => x.value);
      try {
        let saved;
        if (editing) saved = await Store.updateUser(editing.id, data);
        else {
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
        if (Store.cloud && !editing && role !== "student") { toast("Đã tạo. Gửi mã mời cho " + saved.name); go("#/admin/user/" + saved.id); return; }
        toast(editing ? "Đã lưu" : "Đã tạo tài khoản " + saved.name);
        go(isAdmin ? "#/admin/users" : "#/home");
      } catch (e) { $("#uErr").innerHTML = `<div class="fb bad">${esc(e.message)}</div>`; }
    };
    if ($("#uDel")) $("#uDel").onclick = () => {
      $("#uDelArea").innerHTML = `<div class="confirm"><div>Xóa tài khoản ${esc(editing.name)}? Mọi kết quả của tài khoản này cũng bị xóa.</div><div class="row"><button class="btn danger sm" type="button" id="dYes">Xóa</button><button class="btn ghost sm" type="button" id="dNo">Thôi</button></div></div>`;
      $("#dYes").onclick = () => { try { Store.removeUser(editing.id); toast("Đã xóa"); go(isAdmin ? "#/admin/users" : "#/home"); } catch (e) { toast(e.message); } };
      $("#dNo").onclick = () => ($("#uDelArea").innerHTML = "");
    };
  }

  /* Bản đám mây: quản trị, phụ huynh đăng nhập bằng email của họ, gắn vào hồ sơ bằng mã mời. */
  function inviteBox(editing, viewer) {
    if (!editing) return `<p class="small muted">Sau khi tạo, app hiện một mã mời. Người này mở app, đăng nhập bằng email của họ rồi nhập mã mời.</p>`;
    if (editing.id === viewer.id) return "";
    return `<section class="panel" id="invBox"><h3>Đăng nhập bằng email</h3>
      ${editing.linked ? `<p class="small">Tài khoản này đã gắn với email của ${esc(editing.name)}.</p>`
        : `<p class="small">Gửi mã mời này cho ${esc(editing.name)}. Họ mở app, chọn “Bố mẹ, thầy cô”, đăng nhập bằng email của mình rồi nhập mã.</p><div><span class="code">${esc(fmtCode(editing.inviteCode))}</span></div>`}
      <div class="row"><button class="btn ghost sm" type="button" id="uInv">${editing.linked ? "Gỡ email, tạo mã mời mới" : "Tạo mã mời khác"}</button></div><div id="uInvArea"></div></section>`;
  }

  /* -------- sửa kì thi -------- */
  function renderEventForm(u, id) {
    if (u.role !== "admin") { go("#/home"); return; }
    const e = id === "new" ? { id: "", title: "", kind: "dinh-ki", grades: [4], start: "", end: "", tentative: true, subjects: [], scope: "", note: "", modules: [], banks: [] } : Store.event(id);
    if (!e) { go("#/admin/events"); return; }
    view.innerHTML = `<div class="stack">${back("#/admin/events", "Lịch thi")}
      <h2>${id === "new" ? "Thêm kì thi" : "Sửa kì thi"}</h2>
      <form class="panel" id="eForm" autocomplete="off"><div class="form">
        <label class="field full"><span>Tên kì thi</span><input id="eTitle" value="${esc(e.title)}" required placeholder="Ví dụ: Kiểm tra cuối học kì I"></label>
        <label class="field"><span>Loại</span><select id="eKind">${Object.entries(KIND).map(([k, t]) => `<option value="${k}" ${e.kind === k ? "selected" : ""}>${t}</option>`).join("")}</select></label>
        <div class="field"><span>Khối</span><div class="checks">${[4, 6].map((g) => `<label><input type="checkbox" name="eg" value="${g}" ${e.grades.includes(g) ? "checked" : ""}>Lớp ${g}</label>`).join("")}</div></div>
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
    const b = id === "new" ? { id: "", title: "", grade: 4, subject: "", minutes: 20, note: "", src: "" } : Store.bank(id);
    if (!b || b.seed) { go("#/admin/banks"); return; }
    view.innerHTML = `<div class="stack">${back("#/admin/banks", "Ngân hàng đề")}
      <h2>${id === "new" ? "Nhập ngân hàng câu hỏi" : "Sửa ngân hàng câu hỏi"}</h2>
      <form class="panel" id="bForm" autocomplete="off"><div class="form">
        <label class="field full"><span>Tên</span><input id="bTitle" value="${esc(b.title)}" required placeholder="Ví dụ: Toán 4 · Đề ôn cuối kì I số 1"></label>
        <label class="field"><span>Khối</span><select id="bGrade"><option value="4" ${+b.grade === 4 ? "selected" : ""}>Lớp 4</option><option value="6" ${+b.grade === 6 ? "selected" : ""}>Lớp 6</option></select></label>
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
    let emo = u.avatar;
    const hasPin = !Store.cloud || u.role === "student"; // bản đám mây: quản trị, phụ huynh dùng email, không có PIN
    view.innerHTML = `<div class="stack">${back("#/home", "Trang chính")}
      <div class="row">${avatar(u, true)}<div><h2>${esc(u.name)}</h2><span class="muted">${esc(gradeTxt(u))}</span></div></div>
      ${Store.cloud && Store.mustChangePin() ? `<div class="notice">Bạn đang dùng mã PIN cũ. Hãy đặt mã PIN mới gồm 6 chữ số (không dùng số dễ đoán như 111111, 123456).</div>` : ""}
      <form class="panel" id="aForm" autocomplete="off"><h3>${hasPin ? "Đổi hình đại diện hoặc mã PIN" : "Đổi hình đại diện"}</h3>
        ${emojiPicker(emo)}
        ${hasPin ? `<div class="form"><label class="field"><span>Mã PIN hiện tại</span><input id="aOld" type="password" inputmode="numeric" maxlength="6"></label>
        <label class="field"><span>${Store.cloud ? "Mã PIN mới (6 chữ số)" : "Mã PIN mới"}</span><input id="aNew" type="password" inputmode="numeric" maxlength="6"></label></div>` : ""}
        <div id="aErr"></div><div class="row"><button class="btn sm" type="submit">Lưu</button></div></form>
      ${Store.cloud && !hasPin ? `<p class="small muted">Đăng nhập bằng email ${esc(Store.authEmail())}.</p>` : ""}
      <div class="row"><button class="btn main" id="logout">Đăng xuất</button></div></div>`;
    wireGo(); wireEmoji(view, (e) => (emo = e));
    $("#aForm").onsubmit = async (ev) => {
      ev.preventDefault();
      const nw = hasPin ? $("#aNew").value.trim() : "", old = hasPin ? $("#aOld").value.trim() : "";
      try {
        if (nw) { if (!(await Store.checkPin(u.id, old))) throw new Error("Mã PIN hiện tại chưa đúng."); }
        await Store.updateUser(u.id, { avatar: emo, pin: nw || null, oldPin: old });
        toast("Đã lưu"); renderAccount(Store.user(u.id)); drawWho(Store.user(u.id));
      } catch (e) { $("#aErr").innerHTML = `<div class="fb bad">${esc(e.message)}</div>`; }
    };
    $("#logout").onclick = () => { Store.setSession(null); go("#/"); };
  }

  /* ================= ĐỊNH TUYẾN ================= */
  function route() {
    if (quizRun) { quizRun.stop(); quizRun = null; }
    const old = $("#evDetail"); if (old) old.remove();
    document.title = TITLE;
    if (Store.cloud) {
      const st = Store.authState();
      if (st === "signed-out") { renderCloudLogin(); return; }
      if (st === "no-profile") { renderCloudJoin(); return; }
    } else if (!Store.isReady() && !Store.load()) { renderSetup(); return; }
    const u = Store.sessionUser();
    if (!u) { renderLogin(); return; }
    drawWho(u);
    const raw = (location.hash || "#/").slice(1), [path, qs] = raw.split("?");
    const query = {}; (qs || "").split("&").filter(Boolean).forEach((p) => { const [k, v] = p.split("="); query[decodeURIComponent(k)] = decodeURIComponent(v || ""); });
    const parts = path.split("/").filter(Boolean);
    const [name, a, b] = parts;
    window.scrollTo(0, 0);
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
        return renderAdmin(u, a);
      default: return renderHome(u);
    }
  }
  let booted = false;
  window.addEventListener("hashchange", () => { if (booted) route(); });
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
})();
