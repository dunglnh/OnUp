/* Kiểm thử toàn luồng bằng Playwright. Chạy: python3 -m http.server 8000 & node tests/e2e.js
   (cần cài playwright: npm i -D playwright). Ảnh chụp lưu ở tests/screenshots/. */
/* Cho Playwright thấy request của service worker (sw.js): chế độ offline và danh sách request ra ngoài áp dụng cả cho nó.
   Bước offline kiểm tra lại là cờ này còn tác dụng. */
process.env.PW_EXPERIMENTAL_SERVICE_WORKER_NETWORK_EVENTS = "1";
const { chromium } = require("playwright");
const fs = require("fs");
const OUT = __dirname + "/screenshots/"; fs.mkdirSync(OUT, { recursive: true });
const ROOT = __dirname + "/../";
const BASE = process.env.BASE_URL || "http://localhost:8000";
/* Đây là kiểm thử bản lưu trên máy. js/config.js thật có thể đã điền Supabase (trang đang chạy bản đám mây), nên trả về
   bản để trống hai giá trị đó cho mọi request tới js/config.js. Bản đám mây kiểm thử riêng ở tests/supabase/. */
const LOCAL_CONFIG = fs.readFileSync(ROOT + "js/config.js", "utf8").replace(/(supabaseUrl|supabaseAnonKey):\s*"[^"]*"/g, '$1: ""');
const localConfig = (c) => c.route("**/js/config.js", (r) => r.fulfill({ contentType: "text/javascript", body: LOCAL_CONFIG }));
/* Cả lần chạy dùng một ngày "hôm nay" cố định, không theo ngày chạy (L28). Mọi context của app tạo bằng newContext(): đồng hồ giả lập
   của Playwright bắt đầu ở TODAY lúc script chạy rồi đi như thường; context tạo sau ở TODAY cộng thời gian đã chạy, để dữ liệu bước trước
   ghi (state) không nằm ở "tương lai" của bước sau. Chữ mong đợi theo kì thi gần nhất (k3.hero, lịch thi của học sinh…) ghi theo ngày này.
   Bước cần ngày khác thì tự cài đồng hồ (page.clock.install, setSystemTime), đè lên TODAY; TODAY sớm hơn giờ của các bước đó (sớm nhất là
   21/10/2026 8:00 của UX1). Giờ so ở node thì lấy giờ trong trang (nowIn). Tua giờ khi trang đang chạy cũng dùng setSystemTime rồi chờ
   trang tự cập nhật, không dùng clock.fastForward, runFor, pauseAt (giờ có thể lùi lại ngay sau lần tua, xem bước UX5).
   Thử như chạy vào ngày khác: tests/chay-theo-ngay.js. */
const TODAY = "2026-10-21T07:00:00", T0 = Date.now();
(async () => {
  const browser = await chromium.launch();
  // chỗ duy nhất tạo context (L28); trang ghép ảnh (browser.newPage) không mở app nên không cần
  const newContext = async (opts) => { const c = await browser.newContext(opts); await c.clock.install({ time: new Date(Date.parse(TODAY) + Date.now() - T0) }); return c; };
  const ctx = await newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push("pageerror: " + e.message));
  page.on("console", (m) => { if (m.type() === "error") errs.push("console: " + m.text()); });
  /* Bản lưu trên máy (js/config.js để trống) không gọi ra ngoài máy chủ của app: không Supabase, CDN, Google Fonts.
     Ghi mọi request (kể cả của khung bài ôn và service worker) tới host khác host của BASE. */
  const outReqs = [], HOST = new URL(BASE).host;
  const watchOut = (c) => c.on("request", (r) => { const u = new URL(r.url()); if (/^https?:$/.test(u.protocol) && u.host !== HOST) outReqs.push(r.url()); });
  watchOut(ctx);
  await localConfig(ctx);
  /* Đề có sẵn: lúc mở app chỉ tải danh mục data/banks/index.js; file câu hỏi của một khối, một môn chỉ tải khi mở đề
     của file đó (Store.loadBank). Ghi tên các file trong data/banks/ đã được tải (kể cả do service worker tải). */
  const bankFiles = new Set(), bankList = () => [...bankFiles].sort().join();
  ctx.on("request", (r) => { const m = /\/data\/banks\/([^/?#]+)/.exec(r.url()); if (m) bankFiles.add(m[1]); });
  const shot = (n) => page.screenshot({ path: OUT + n + ".png", fullPage: true });
  const editDb = (fn) => page.evaluate((src) => { const d = JSON.parse(localStorage.getItem("ontap_db_v1")); new Function("d", src)(d); localStorage.setItem("ontap_db_v1", JSON.stringify(d)); }, fn);
  const who = () => page.evaluate(() => (Store.sessionUser() || {}).name || "");
  // độ dài PIN đã lưu và số lần sai PIN của từng người, theo tên
  const pinLog = () => page.evaluate(() => { const o = JSON.parse(localStorage.getItem("ontap_pinlock_v1") || "{}"), d = JSON.parse(localStorage.getItem("ontap_db_v1")); return Object.fromEntries(d.users.map((u) => [u.name, { len: u.pinLen, fails: (o[u.id] || {}).fails || 0 }])); });
  const step = (s) => console.log("STEP", s);
  /* Màn "Xem lại bài làm" (#qzRecap, Phiên 9n): đi hết đề mà còn câu bỏ qua, hoặc làm như thi, thì tới màn này trước màn kết quả.
     Các bước đi hết đề gọi endRecap(pg) để nộp (hỏi lại khi còn câu trống thì xác nhận). */
  const endRecap = async (pg) => { if (await pg.$("#qzRecap")) { await pg.click("#qzEnd"); if (await pg.$("#qzYes")) await pg.click("#qzYes"); } };
  // bài ôn dạng trang (Phiên 9o): màn "Xem lại bài làm" #recap trong khung, #endBtn là nút nộp của màn đó (hỏi lại bằng #yesEnd khi còn câu trống)
  const endRecapMod = async (fr) => { if (await fr.$("#recap")) { await fr.click("#endBtn"); if (await fr.$("#yesEnd")) await fr.click("#yesEnd"); } };
  const nowIn = (pg) => pg.evaluate(() => Date.now()); // giờ trong trang (đồng hồ giả lập): node so giờ với giờ này, không với Date.now() của node (L28)
  /* Nút xem mật khẩu, mã PIN (U1). revealTry: ô (đã có chữ) có nút ngay sau nó; bấm thì hiện chữ (type="text",
     aria-pressed="true", aria-label "Ẩn …"), bấm lại thì ẩn; giá trị, focus, vị trí con trỏ, inputmode, autocomplete giữ nguyên.
     Ngoại lệ (UX4, X2): ô có data-reveal="<id>" (bàn phím PIN, #pinIn) dùng nút chữ đặt sẵn ở chỗ khác, không có aria-label: chữ đang
     hiện là "Hiện số", đang hiện số thì "Giấu số" (hai <span>, CSS ẩn một); ô đó phải ẩn khỏi mắt (rộng ≤ 1px) ở cả hai trạng thái.
     Chỗ sai ghi vào rv. eye(sel): bấm nút của ô; types(...sel): type của các ô. */
  const rv = [];
  const eyeOf = (pg, sel) => pg.$eval(sel, (i) => (i.dataset.reveal ? "#" + i.dataset.reveal : null)).then((x) => x || sel + " + .reveal-btn");
  const eye = async (pg, sel) => pg.click(await eyeOf(pg, sel));
  const types = (pg, ...sels) => Promise.all(sels.map((x) => pg.$eval(x, (i) => i.type))).then((t) => t.join());
  async function revealTry(pg, sel, what) {
    const st = () => pg.$eval(sel, (i) => { const pre = !!i.dataset.reveal, b = pre ? document.getElementById(i.dataset.reveal) : i.nextElementSibling;
      const shown = (el) => el.offsetParent !== null;
      return { pre, type: i.type, btn: !!b && b.matches("button.reveal-btn[type=button]") && !!b.querySelector("svg"), pressed: b && b.getAttribute("aria-pressed"), label: b && (pre ? [...b.querySelectorAll("span")].filter(shown).map((x) => x.textContent).join() : b.getAttribute("aria-label")),
        hidden: !pre || i.getBoundingClientRect().width <= 1, value: i.value, focus: document.activeElement === i, caret: i.selectionStart, mode: i.getAttribute("inputmode"), ac: i.getAttribute("autocomplete") }; });
    await pg.focus(sel); await pg.$eval(sel, (i) => i.setSelectionRange(1, 1));
    const a = await st(); await eye(pg, sel);
    const b = await st(); await eye(pg, sel);
    const c = await st();
    const good = (x, type, pressed, verb) => x.btn && x.type === type && x.pressed === pressed && x.label === (x.pre ? (verb === "Hiện" ? "Hiện số" : "Giấu số") : verb + " " + what) && x.hidden && x.value === a.value && x.focus && x.caret === 1 && x.mode === a.mode && x.ac === a.ac;
    if (!a.value || !good(a, "password", "false", "Hiện") || !good(b, "text", "true", "Ẩn") || !good(c, "password", "false", "Hiện")) rv.push(sel + ": " + JSON.stringify([a, b, c]));
  }
  const rvIs = (ok, msg) => { if (!ok) rv.push(msg); };

  await page.goto(BASE + "/");
  step("setup"); await shot("01-setup");
  const tipInBrowser = !!(await page.$("#restoreTip")); // mở trong trình duyệt: không có thẻ hướng dẫn của app ở Màn hình chính (L17)
  await page.fill("#sSchool", "Nhà Bin");
  await page.fill("#sName", "Bố Minh");
  await page.fill("#sPin", "1234"); await page.fill("#sPin2", "1239");
  for (const x of ["#sPin", "#sPin2"]) await revealTry(page, x, "mã PIN");
  await eye(page, "#sPin"); await eye(page, "#sPin2"); await page.click("button[type=submit]"); // gửi sai (chưa khớp): ẩn lại
  rvIs(/chưa khớp/.test(await page.textContent("#sErr")) && (await types(page, "#sPin", "#sPin2")) === "password,password", "thiết lập: gửi sai vẫn hiện");
  await eye(page, "#sPin2"); await page.fill("#sPin2", ""); // xóa hết ô: ẩn lại
  rvIs((await types(page, "#sPin2")) === "password", "thiết lập: xóa hết ô vẫn hiện");
  await page.fill("#sPin2", "1234"); await eye(page, "#sPin");
  await page.evaluate(() => document.addEventListener("submit", () => (window.__sent = [...document.querySelectorAll(".reveal>input")].map((i) => i.type).join()), { once: true }));
  await page.click("button[type=submit]"); // gửi đúng: ẩn lại trước khi chuyển màn hình
  await page.waitForSelector("text=Quản trị");
  rvIs((await page.evaluate(() => window.__sent)) === "password,password", "thiết lập: gửi đúng vẫn hiện");
  step("add parent");
  await page.goto(BASE + "/#/admin/user/new?role=parent");
  await page.fill("#uName", "Mẹ Bin"); await page.fill("#uPin", "22");
  await revealTry(page, "#uPin", "mã PIN");
  await eye(page, "#uPin"); await page.click("button[type=submit]"); await page.waitForSelector("#uErr .fb"); // PIN 2 số: báo sai, ẩn lại
  rvIs(/4 đến 6 chữ số/.test(await page.textContent("#uErr")) && (await types(page, "#uPin")) === "password", "form tài khoản: gửi sai vẫn hiện");
  await page.fill("#uPin", "2222");
  await page.click("button[type=submit]"); await page.waitForTimeout(300);
  step("add student 4");
  await page.goto(BASE + "/#/admin/user/new?role=student");
  await page.fill("#uName", "Bin"); await page.fill("#uPin", "1111");
  await page.selectOption("#uGrade", "4"); await page.fill("#uClass", "4A");
  await page.check("input[name=par]");
  await page.click("button[type=submit]"); await page.waitForTimeout(300);
  step("add student 6");
  await page.goto(BASE + "/#/admin/user/new?role=student");
  await page.fill("#uName", "Na"); await page.fill("#uPin", "3333");
  await page.selectOption("#uGrade", "6");
  await page.click("button[type=submit]"); await page.waitForTimeout(300);
  await shot("02-admin-users");
  step("grades from data/grades.js");
  // Khối lớp lấy từ data/grades.js: hôm nay chỉ lớp 4 và 6 active, hiện ở form học sinh, kì thi, ngân hàng đề, lịch thi.
  const opts = (sel) => page.$$eval(sel, (o) => o.map((x) => x.value + (x.tagName === "OPTION" ? ":" + x.textContent : x.checked ? "*" : "")).join());
  const gradeUI = {};
  await page.goto(BASE + "/#/admin/user/new?role=student"); await page.waitForTimeout(150); gradeUI.student = await opts("#uGrade option");
  await page.goto(BASE + "/#/admin/event/new"); await page.waitForTimeout(150); gradeUI.event = await opts("input[name=eg]");
  await page.goto(BASE + "/#/admin/bank/new"); await page.waitForTimeout(150); gradeUI.bank = await opts("#bGrade option");
  await page.goto(BASE + "/#/calendar"); await page.waitForTimeout(150); gradeUI.cal = await page.$$eval(".tabs button", (b) => b.map((x) => x.textContent).join());
  gradeUI.store = await page.evaluate(async () => {
    let msg = "";
    try { await Store.createUser({ role: "student", name: "Lớp năm", pin: "1234", grade: 5 }); } catch (e) { msg = e.message; }
    return { msg, can: Store.can("addChild") && Store.can("bank:toan4-ck1-de1"), n: Store.users("student").length, all: window.ONTAP_GRADES.length };
  });
  console.log("grades:", gradeUI);
  const gradesOK = gradeUI.student === "4:Lớp 4,6:Lớp 6" && gradeUI.event === "4*,6" && gradeUI.bank === "4:Lớp 4,6:Lớp 6" && gradeUI.cal === "Cả hai khối,Lớp 4,Lớp 6"
    && gradeUI.store.msg === "Chọn khối lớp 4 hoặc 6." && gradeUI.store.can && gradeUI.store.n === 2 && gradeUI.store.all === 12;
  await page.goto(BASE + "/#/admin/events"); await page.waitForTimeout(200); await shot("03-admin-events");

  step("account page: show PIN (U1)");
  await page.goto(BASE + "/#/account"); await page.waitForSelector("#aForm");
  await page.fill("#aOld", "0000"); await page.fill("#aNew", "4321");
  for (const x of ["#aOld", "#aNew"]) await revealTry(page, x, "mã PIN");
  await eye(page, "#aOld"); await eye(page, "#aNew"); await page.click("#aForm [type=submit]"); await page.waitForSelector("#aErr .fb"); // PIN hiện tại sai: ẩn lại
  rvIs(/hiện tại chưa đúng/.test(await page.textContent("#aErr")) && (await types(page, "#aOld", "#aNew")) === "password,password", "tài khoản: gửi sai vẫn hiện");
  await eye(page, "#aNew"); await page.goto(BASE + "/#/home"); await page.goto(BASE + "/#/account"); await page.waitForSelector("#aForm"); // chuyển màn hình: ẩn
  rvIs((await types(page, "#aNew")) === "password" && !(await page.inputValue("#aNew")), "tài khoản: chuyển màn hình vẫn hiện");
  step("logout + login student");
  await page.click("#logout"); await page.waitForTimeout(200);
  await shot("04-login");
  await page.click(".tile:has-text('Bin')"); await page.waitForSelector("#pinBox:not([hidden])"); // UX4: bước nhập riêng (#/vao/<mã>)
  await shot("04b-nhap-pin");
  // bàn phím PIN: nút chữ "Hiện số" (UX4), hàng chấm hiện chữ số; gửi PIN (sai) hoặc xóa hết thì ẩn lại
  const dotsTxt = () => page.$eval("#pinDots", (d) => (d.classList.contains("shown") ? "shown:" : "") + d.textContent);
  await page.click('.pad button[data-k="1"]'); await revealTry(page, "#pinIn", "mã PIN");
  await page.click('.pad button[data-k="2"]'); await eye(page, "#pinIn"); // ô không focus (vừa bấm bàn phím số): nút xem không đặt focus vào ô
  const pinShown = await dotsTxt() + (await page.evaluate(() => (document.activeElement.id === "pinIn" ? " focus" : "")));
  await page.click('.pad button[data-k="del"]'); await page.click('.pad button[data-k="del"]');
  const pinCleared = (await types(page, "#pinIn")) + " " + (await dotsTxt());
  await eye(page, "#pinIn");
  for (const k of "1234") await page.click(`.pad button[data-k="${k}"]`); // sai PIN của Bin
  await page.waitForSelector("#pinErr .fb");
  const pinWrong = (await types(page, "#pinIn")) + " " + (await dotsTxt());
  console.log("pin reveal:", pinShown, "|", pinCleared, "|", pinWrong);
  rvIs(pinShown === "shown:12" && pinCleared === "password " && pinWrong === "password ", "bàn phím PIN: " + [pinShown, pinCleared, pinWrong].join(" | "));
  for (const k of "1111") await page.click(`.pad button[data-k="${k}"]`);
  await page.waitForTimeout(400);
  const autoIn = await who(); // PIN 4 số: gõ đủ 4 số là vào, không cần bấm "Vào" (L10)
  await shot("05-student-home");
  console.log("hero:", (await page.textContent(".hero")).replace(/\s+/g, " ").slice(0, 200));

  step("open module ioe-4");
  await page.goto(BASE + "/#/play/ioe-4"); await page.waitForTimeout(1500);
  const frame = page.frames().find(f => /modules\/ioe-4/.test(f.url()));
  console.log("NS:", await frame.evaluate(() => window.ONTAP_NS));
  console.log("frame title:", await frame.evaluate(() => document.title));
  await frame.evaluate(() => ontapReport({ label: "School Level · Test 1", mode: "exam", subject: "ta", r: 24, t: 30, s: 900 }));
  await page.waitForTimeout(300);
  await shot("06-play");
  step("leave guard: module in frame (L1, L16)");
  const nRes = () => page.evaluate(() => JSON.parse(localStorage.getItem("ontap_db_v1")).results.length);
  const modBack = async () => { await page.click(".player [data-go]"); await page.waitForTimeout(200); return { hash: await page.evaluate(() => location.hash), box: !!(await page.$("#leaveBox")) }; };
  await frame.click("h1.page-h"); // chạm vào trang đầu của bài, không phải nút bắt đầu
  const modIdle = await modBack(); // chưa làm lượt nào: đi luôn, không hỏi
  await page.goto(BASE + "/#/play/ioe-4"); await page.waitForTimeout(1200);
  const fr4 = page.frames().find((f) => /modules\/ioe-4/.test(f.url()));
  await fr4.click(".unit >> nth=0"); await fr4.waitForSelector("#endBtn"); // bắt đầu ôn Unit 1: bài ôn hiện #endBtn
  await page.click(".player [data-go]"); await page.waitForTimeout(150);
  const modAsk = await page.$("#leaveBox") ? await page.textContent("#leaveBox") : "";
  await page.click("#leaveNo"); await page.waitForTimeout(100);
  const modStay = await page.evaluate(() => location.hash);
  await fr4.click("#endBtn"); // bài ôn đang hỏi "End practice?" (#yesEnd): vẫn là đang làm dở
  const modConfirm = await modBack();
  if (modConfirm.box) { await page.click("#leaveNo"); await page.waitForTimeout(100); }
  await fr4.evaluate(() => ontapReport({ label: "School Level · Test 2", mode: "exam", subject: "ta", r: 20, t: 30, s: 800 }));
  await fr4.click("#yesEnd"); await page.waitForTimeout(200); // xong lượt: bài ôn bỏ #endBtn
  const modLeft = await modBack(); // xong lượt: đi luôn, không hỏi
  console.log("module guard:", modIdle, modAsk.replace(/\s+/g, " "), modStay, modConfirm, modLeft);
  // ioe-4 là bài ôn Tiếng Anh nên hộp hỏi bằng tiếng Anh (TA2); bản tiếng Việt "Rời bài ôn?" thử với bài ôn lớp 4 ở bước sau
  const modGuardOK = modIdle.hash === "#/home" && !modIdle.box && /Leave this practice\?/.test(modAsk) && modStay === "#/play/ioe-4"
    && modConfirm.box && modConfirm.hash === "#/play/ioe-4" && modLeft.hash === "#/home" && !modLeft.box;
  step("open module l4");
  await page.goto(BASE + "/#/play/l4-giua-ki-1"); await page.waitForTimeout(1200);
  const f2 = page.frames().find(f => /modules\/l4-giua-ki-1/.test(f.url()));
  await f2.evaluate(() => ontapReport({ label: "Toán · Đề 1", mode: "exam", subject: "toan", r: 18, t: 20, s: 1500 }));
  await page.waitForTimeout(200);
  // bài ôn tiếng Việt: dòng ghi chú, thông báo lưu điểm, nút quay lại và hộp hỏi khi rời bài đang làm vẫn tiếng Việt (TA2 chỉ đổi bài Tiếng Anh)
  const l4 = { toast: await page.textContent("#toast"), note: await page.textContent(".player .note"), back: await page.textContent(".player .linkbtn"), lang: await page.$eval("#view > .player", (e) => e.getAttribute("lang")) };
  await f2.click(".tb >> nth=0"); await f2.waitForSelector("#endBtn"); // bắt đầu một đề của bài ôn: bài ôn hiện #endBtn
  await page.click(".player [data-go]"); await page.waitForSelector("#leaveBox");
  l4.ask = (await page.textContent("#leaveBox")).replace(/\s+/g, " ").trim();
  await page.click("#leaveYes"); await page.waitForTimeout(300);
  l4.left = await page.evaluate(() => location.hash);
  console.log("module l4 (vi):", l4);
  const modViOK = l4.toast === "Đã lưu kết quả: 18/20 câu đúng" && l4.note === "Điểm được lưu" && l4.back === "← Trang chính" && l4.lang === null
    && l4.ask === "Rời bài ôn?Bài đang làm dở sẽ không được lưu. Rời bàiỞ lại" && l4.left === "#/home";

  step("quiz bank practice");
  const lazy = { home: bankList() }; // đã qua thiết lập, đăng nhập, trang chủ, bài ôn trong khung
  await page.goto(BASE + "/#/quiz/toan4-ck1-de1"); await page.waitForSelector("#qPractice");
  lazy.quiz = bankList();
  await page.click("#qPractice");
  for (let i = 0; i < 40 && !(await page.$(".score")); i++) {
    if (await page.$("#qzFill")) await page.fill("#qzFill", "400"); else await page.click(".opt >> nth=0");
    await page.click("#qzGo"); // check
    if (i === 3) await shot("07-quiz-feedback");
    await page.click("#qzGo"); // next
  }
  await page.waitForTimeout(200);
  // UX6: bản lưu trên máy không có hộp gửi: màn kết quả không ghi "Đã lưu và gửi cho bố mẹ" (chỗ trống #qzSaved ẩn), thông báo vẫn
  // "Đã lưu kết quả"; trang chính của con không có dòng "N bài chưa gửi"
  const ux6Local = { saved: await page.$eval("#qzSaved", (e) => e.hidden && !e.textContent).catch(() => false), toast: await page.textContent("#toast").catch(() => "") };
  await shot("08-quiz-result");
  await page.goto(BASE + "/#/home"); await page.waitForSelector("#today");
  ux6Local.bar = !(await page.$("#unsent, .unsent, #sendNow"));
  console.log("UX6 local:", ux6Local);
  const ux6LocalOK = ux6Local.saved && ux6Local.toast === "Đã lưu kết quả" && ux6Local.bar;

  step("open bank from practice tab");
  await page.goto(BASE + "/#/practice"); await page.waitForSelector("#allPractice"); // UX1: mọi bài ôn ở tab Bài ôn
  await page.evaluate(() => (document.querySelector("a[href='#/quiz/toan4-ck1-de1']").closest("details").open = true)); // đề nằm trong nhóm kì thi đang thu gọn
  await page.click("a[href='#/quiz/toan4-ck1-de1']"); await page.waitForTimeout(200);
  const nBefore = await nRes();
  step("exam left before any answer is not saved (L15)");
  await page.click("#qExam");
  await page.evaluate(() => history.back()); await page.waitForSelector("#leaveBox");
  const ex0 = { ask: (await page.textContent("#leaveBox")).replace(/\s+/g, " ") };
  await page.click("#leaveYes"); await page.waitForTimeout(300);
  ex0.back = { hash: await page.evaluate(() => location.hash), n: await nRes() };
  await page.goto(BASE + "/#/quiz/toan4-ck1-de1"); await page.waitForTimeout(200);
  await page.click("#qExam"); await page.click("#qzSkip"); // bỏ qua không tính là đã trả lời
  await page.click("#qzSubmit"); ex0.exit = (await page.textContent("#qzFb")).replace(/\s+/g, " ");
  await page.click("#qzYes"); await page.waitForTimeout(300);
  ex0.exitLeft = { hash: await page.evaluate(() => location.hash), n: await nRes() };
  ex0.timeUp = await page.evaluate(() => new Promise((ok) => { // hết giờ mà chưa trả lời câu nào: không lưu
    const el = document.createElement("div"); let saved = 0;
    Quiz.run(el, { title: "Thử", minutes: 0.01, questions: [{ type: "tf", q: "1 + 1 = 2", a: true }] }, { mode: "exam", onFinish: () => saved++ });
    setTimeout(() => ok({ saved, text: el.textContent.replace(/\s+/g, " ").trim() }), 1500);
  }));
  console.log("L15:", ex0);
  const noAnswerOK = /Thoát đề\?/.test(ex0.ask) && /chưa làm câu nào/.test(ex0.ask) && ex0.back.hash === "#/practice" && ex0.back.n === nBefore // nút Back về tab Bài ôn (đề được mở từ đó)
    && /Thoát đề\?/.test(ex0.exit) && ex0.exitLeft.hash === "#/home" && ex0.exitLeft.n === nBefore
    && ex0.timeUp.saved === 0 && /chưa làm câu nào nên không lưu điểm/.test(ex0.timeUp.text);
  step("leave guard: bank exam, one answer (L1)");
  await page.goto(BASE + "/#/quiz/toan4-ck1-de1"); await page.waitForTimeout(200);
  await page.click("#qExam");
  if (await page.$("#qzFill")) await page.fill("#qzFill", "400"); else await page.click(".opt >> nth=0");
  await page.click("#qzGo");
  const exQ = await page.textContent(".qcard");
  await page.evaluate(() => history.back()); await page.waitForSelector("#leaveBox");
  const exAsk = await page.textContent("#leaveBox");
  await shot("08b-leave-ask");
  await page.click("#leaveNo"); await page.waitForTimeout(150);
  const exStay = { hash: await page.evaluate(() => location.hash), same: (await page.textContent(".qcard")) === exQ, n: await nRes(), box: !!(await page.$("#leaveBox")) };
  let unloadAsk = "";
  page.once("dialog", (d) => { unloadAsk = d.type(); d.dismiss(); }); // tải lại trang: trình duyệt hỏi, chọn ở lại
  await page.evaluate(() => setTimeout(() => location.reload())); await page.waitForTimeout(400);
  const exReload = { ask: unloadAsk, same: (await page.textContent(".qcard")) === exQ };
  await page.click(".top a.brand"); await page.waitForTimeout(150); // link trên thanh đầu cũng phải hỏi (học sinh không còn nút Lịch thi ở đó, UX1)
  const exTop = { box: !!(await page.$("#leaveBox")), hash: await page.evaluate(() => location.hash) };
  await page.click("#leaveNo"); await page.waitForTimeout(100);
  await page.evaluate(() => history.back()); await page.waitForSelector("#leaveBox");
  await page.click("#leaveYes"); await page.waitForTimeout(400);
  const exLeft = { hash: await page.evaluate(() => location.hash), n: await nRes(), last: await page.evaluate(() => { const r = JSON.parse(localStorage.getItem("ontap_db_v1")).results; return r[r.length - 1]; }) };
  console.log("exam guard:", exAsk.replace(/\s+/g, " "), exStay, exReload, exTop, exLeft.hash, exLeft.n - nBefore, exLeft.last.mode, exLeft.last.r + "/" + exLeft.last.t);
  const examGuardOK = /Nộp bài và rời trang/.test(exAsk) && exStay.hash === "#/quiz/toan4-ck1-de1" && exStay.same && exStay.n === nBefore && !exStay.box && exReload.ask === "beforeunload" && exReload.same
    && exTop.box && exTop.hash === "#/quiz/toan4-ck1-de1" && exLeft.hash === "#/home" && exLeft.n === nBefore + 1 && exLeft.last.mode === "exam" && exLeft.last.refId === "toan4-ck1-de1";
  await page.goto(BASE + "/#/home"); await page.waitForTimeout(300); await shot("09-student-home-after");
  const remindStudent = !!(await page.$("#backupRemind")); // học sinh không thấy thẻ nhắc sao lưu
  await page.goto(BASE + "/#/calendar"); await page.waitForTimeout(300);
  await page.click("[data-ev='ck1-l4']"); await page.waitForTimeout(300); await shot("10-calendar");

  step("parent");
  await page.goto(BASE + "/#/account"); await page.click("#logout"); await page.waitForTimeout(200);
  await page.click(".tile:has-text('Mẹ Bin')");
  await page.fill("#pinIn", "2222"); await page.waitForTimeout(400);
  const remindParent = await page.$eval("#view", (v) => { const c = v.querySelector("#backupRemind"); return !!c && /Chưa sao lưu lần nào/.test(c.textContent) && !!c.querySelector("#backupNow"); }); // L14
  await shot("11-parent-home");
  await page.click("[data-child]"); await page.waitForSelector(".report"); await shot("12-child"); // UX2: bấm thẻ của con là mở báo cáo tuần

  step("weekly report");
  const rep = await page.evaluate(() => ({
    links: [...document.querySelectorAll("#rpCal, #rpPractice")].map((a) => a.getAttribute("href")).join(), oldLinks: !!document.querySelector("#rpLinks"),
    head: [...document.querySelectorAll("#rpHead h1, #rpHead .rp-who .muted")].map((x) => x.textContent.replace(/\s+/g, " ").trim()).join(" | "), headAll: document.querySelector("#rpHead").innerText,
    side: (() => { const a = document.querySelector("#rpHead .av").getBoundingClientRect(), h = document.querySelector("#rpHead h1").getBoundingClientRect(); return h.left >= a.right && h.top < a.bottom; })(), // tên đứng cạnh hình
    label: getComputedStyle(document.querySelector("#rpHead .onlyprint")).display,
    printMain: document.querySelector("#rpPrint").classList.contains("main"), topCal: !!document.querySelector(".who a"),
    count: document.querySelector("#rpCount").textContent,
    subjects: [...document.querySelectorAll("#rpSubjects .rp-sub b:first-child")].map((b) => b.textContent),
    topics: document.querySelectorAll("#rpTopics .item").length,
    tips: document.querySelectorAll("#rpTips li").length,
    days: document.querySelectorAll(".rp-day.on").length,
    title: document.title, wide: document.documentElement.scrollWidth
  }));
  console.log("report:", rep);
  await shot("12b-report");
  await page.emulateMedia({ media: "print", colorScheme: "dark" });
  const printHidden = await page.evaluate(() => [".top", ".noprint", ".foot", "#rpCal", "#rpPractice"].every((s) => getComputedStyle(document.querySelector(s)).display === "none")
    && getComputedStyle(document.body).backgroundColor === "rgb(255, 255, 255)" && getComputedStyle(document.querySelector("#rpHead .onlyprint")).display !== "none"); // in: có nhãn OnUp · Báo cáo tuần, không có hai link
  await page.pdf({ path: OUT + "12c-bao-cao-tuan.pdf", format: "A4", printBackground: false });
  await page.emulateMedia({ media: "screen", colorScheme: "light" });
  await page.goto(BASE + "/#/report/" + (await page.evaluate(() => Store.users("student").find((u) => u.name === "Na").id)));
  await page.waitForTimeout(200);
  const otherKid = await page.evaluate(() => location.hash); // Na không phải con của Mẹ Bin: về trang chính
  const reportOK = rep.count === "5" && rep.subjects.join() === "Toán,Tiếng Anh" && rep.topics > 0 && rep.tips >= 2 && rep.days === 1
    && /Bin/.test(rep.title) && rep.wide <= 390 && printHidden && otherKid === "#/home" && /^#\/calendar\?g=4,#\/child\/[^,]+\/practice$/.test(rep.links)
    && !rep.oldLinks && /^Bin \| Lớp 4 · 4A \| Báo cáo \d+\/\d+ – \d+\/\d+\/\d{4}$/.test(rep.head) && !/OnUp/.test(rep.headAll) && rep.side && rep.label === "none" && !rep.printMain && !rep.topCal;
  console.log("report print:", printHidden, "other kid:", otherKid);

  step("pin lock per user survives reload (L2); waiting disables the keypad (UX4 X3)");
  await page.goto(BASE + "/#/account"); await page.click("#logout"); await page.waitForTimeout(200);
  await page.click(".tile:has-text('Na')"); await page.waitForSelector("#pinBox:not([hidden])");
  for (let i = 0; i < 5; i++) { await page.fill("#pinIn", "0000"); await page.press("#pinIn", "Enter"); await page.waitForTimeout(120); } // tự kiểm tra khi đủ 4 số, Enter ngay sau đó không tính thêm lần sai
  const lockMsg = await page.textContent("#pinErr"), naFails = (await pinLog()).Na.fails;
  // UX4 X3: lỗi và đếm ngược ngay dưới hàng chấm, trên nút Hiện số và bàn phím; đang đợi thì 12 nút bàn phím và nút Hiện số disabled
  const lockUI = () => page.evaluate(() => { const top = (s) => document.querySelector(s).getBoundingClientRect().top; return { dis: [...document.querySelectorAll(".pad button")].filter((b) => b.disabled).length, show: document.querySelector("#pinShow").disabled,
    order: top("#pinDots") < top("#pinErr") && top("#pinErr") < top("#pinShow") && top("#pinShow") < top(".pad"), hash: /^#\/vao\//.test(location.hash), who: document.querySelector("#pinWho b").textContent }; });
  const lockedUI = await lockUI();
  await page.reload(); await page.waitForSelector("#pinBox:not([hidden])"); await page.waitForTimeout(150); // tải lại: vẫn ở bước nhập của Na (#/vao/<mã>), vẫn phải đợi
  const lockAfter = await page.textContent("#pinErr"), lockedUI2 = await lockUI();
  await page.fill("#pinIn", "3333"); await page.press("#pinIn", "Enter"); await page.waitForTimeout(300); // PIN đúng cũng phải đợi; số gõ vào bị bỏ
  const lockedOut = await page.evaluate(() => !Store.sessionUser() && !!document.querySelector("#pinBox") && !document.querySelector("#pinIn").value && !document.querySelector("#pinDots .on"));
  await shot("12d-pin-locked");
  // hết giờ (rút ngắn còn 1,2 giây) thì tự bật lại bàn phím và báo "Bạn nhập lại được rồi."
  await page.evaluate(() => { const o = JSON.parse(localStorage.getItem("ontap_pinlock_v1")); for (const k in o) if (o[k].until) o[k].until = Date.now() + 1200; localStorage.setItem("ontap_pinlock_v1", JSON.stringify(o)); });
  await page.waitForSelector("#pinErr .fb.ok", { timeout: 5000 });
  const unlockedUI = Object.assign(await lockUI(), { msg: (await page.textContent("#pinErr")).trim() });
  await page.click("#toList"); await page.waitForSelector(".tile"); // "← Chọn hồ sơ khác" về danh sách
  const backHash = await page.evaluate(() => location.hash);

  step("bank import as admin");
  await page.click(".tile:has-text('Bố Minh')"); await page.fill("#pinIn", "9999"); await page.press("#pinIn", "Enter"); await page.waitForTimeout(300);
  const wrongMsg = await page.textContent("#pinErr");
  console.log("wrong pin msg:", wrongMsg);
  await page.fill("#pinIn", "1234"); await page.waitForTimeout(400);
  const otherIn = await who();
  const pinLockOK = /Đợi 30 giây/.test(lockMsg) && naFails === 5 && /Đợi (29|30) giây/.test(lockAfter) && lockedOut && /chưa đúng/.test(wrongMsg) && otherIn === "Bố Minh"
    && [lockedUI, lockedUI2].every((x) => x.dis === 12 && x.show && x.order && x.hash && x.who === "Na") && unlockedUI.dis === 0 && !unlockedUI.show && unlockedUI.order && unlockedUI.msg === "Bạn nhập lại được rồi." && backHash === "#/";
  console.log("pin lock:", { lockMsg, naFails, lockAfter, lockedOut, otherIn, lockedUI, lockedUI2, unlockedUI, backHash });
  await page.goto(BASE + "/#/admin/bank/new"); await page.waitForTimeout(200);
  await page.fill("#bTitle", "Tiếng Việt 4 · thử"); await page.fill("#bSubj", "Tiếng Việt");
  await page.click("#bSample"); const bankCheck = await page.textContent("#bRes"); console.log("check:", bankCheck);
  await page.click("button[type=submit]"); await page.waitForTimeout(300); await shot("13-banks");
  await page.goto(BASE + "/#/admin/overview"); await page.waitForTimeout(300); await shot("14-admin-overview");

  step("backup reminder (L14)");
  const lastBackup = () => page.evaluate(() => JSON.parse(localStorage.getItem("ontap_db_v1")).settings.lastBackupAt);
  const remind = async () => { await page.goto(BASE + "/#/admin/overview"); await page.reload(); await page.waitForTimeout(250); const c = await page.$("#backupRemind"); return c ? (await c.textContent()).replace(/\s+/g, " ").trim() : ""; };
  const daysAgo = (n) => `d.settings.lastBackupAt = new Date(Date.now() - ${n} * 864e5).toISOString();`;
  const bk = { first: await remind() }; // chưa sao lưu lần nào, đã có kết quả
  let dl = page.waitForEvent("download");
  await page.click("#backupNow");
  const dl1 = await dl; bk.file = dl1.suggestedFilename();
  const backupPath = await dl1.path(); // dùng lại ở bước L17: khôi phục trên app ở Màn hình chính
  bk.gone = !(await page.$("#backupRemind")); bk.at = await lastBackup();
  bk.after = await remind();
  await editDb(daysAgo(8)); bk.d8 = await remind();
  await editDb(daysAgo(6)); bk.d6 = await remind();
  await page.goto(BASE + "/#/admin/data"); await page.waitForTimeout(200);
  bk.dataTab = { last: await page.textContent("#dLast"), home: (await page.textContent("#homeScreen")).replace(/\s+/g, " ") };
  dl = page.waitForEvent("download");
  await page.click("#dExport"); await dl;
  bk.dataAt = await lastBackup(); bk.dataLast = await page.textContent("#dLast");
  await editDb(`delete d.settings.lastBackupAt;`); // như dữ liệu trước khi có lastBackupAt
  bk.oldDefault = await page.evaluate(() => { Store.load(); return Store.settings().lastBackupAt; });
  bk.old = await remind();
  await shot("14b-backup-remind");
  console.log("L14:", bk, "parent:", remindParent, "student:", remindStudent);
  const fresh = (iso, now) => !!iso && Math.abs(now - Date.parse(iso)) < 60000, bkNow = await nowIn(page);
  const backupOK = /Chưa sao lưu lần nào/.test(bk.first) && /^on-thi-sao-luu-\d{4}-\d\d-\d\d\.json$/.test(bk.file) && bk.gone && fresh(bk.at, bkNow) && bk.after === ""
    && /Đã 8 ngày chưa sao lưu/.test(bk.d8) && bk.d6 === "" && /Lần sao lưu gần nhất: \d+\/\d+ \d\d:\d\d/.test(bk.dataTab.last) && /Thêm vào MH chính/.test(bk.dataTab.home) && /⋮/.test(bk.dataTab.home)
    && fresh(bk.dataAt, bkNow) && /Hôm nay/.test(bk.dataLast) && bk.oldDefault === null && /Chưa sao lưu lần nào/.test(bk.old) && remindParent && !remindStudent;

  step("iPhone home screen: restore tip, backup via share sheet (L17)");
  // App mở từ Màn hình chính trên iPhone (navigator.standalone), máy chưa có dữ liệu: màn hình thiết lập có thẻ hướng dẫn khôi phục.
  const tipCtx = await newContext({ viewport: { width: 390, height: 844 } });
  await localConfig(tipCtx); watchOut(tipCtx);
  await tipCtx.addInitScript(() => Object.defineProperty(navigator, "standalone", { get: () => true }));
  const tp = await tipCtx.newPage(); tp.on("pageerror", (e) => errs.push("pageerror L17: " + e.message));
  await tp.goto(BASE + "/"); await tp.waitForSelector("#setupForm");
  const hs = { tip: await tp.evaluate(() => { const t = document.querySelector("#restoreTip"), f = document.querySelector("#setupForm");
    return t && { text: t.textContent.replace(/\s+/g, " ").trim(), btn: !!t.querySelector("label.btn.main[for=sImport]"), above: !!(t.compareDocumentPosition(f) & Node.DOCUMENT_POSITION_FOLLOWING) }; }) };
  await tp.screenshot({ path: OUT + "14c-setup-home-screen.png", fullPage: true });
  await tp.setInputFiles("#sImport", backupPath); await tp.waitForSelector(".tile"); // chọn file sao lưu đã tải trong Safari
  hs.restored = await tp.$$eval(".tile", (t) => t.map((x) => x.textContent.trim()).join("|"));
  hs.results = await tp.evaluate(() => JSON.parse(localStorage.getItem("ontap_db_v1")).results.length);
  await tipCtx.close();
  // Máy cảm ứng có bảng chia sẻ (giả lập navigator.share): hủy thì không ghi lastBackupAt, chia sẻ xong thì ghi.
  const shareCtx = await newContext({ storageState: await ctx.storageState(), viewport: { width: 390, height: 844 }, hasTouch: true });
  await localConfig(shareCtx); watchOut(shareCtx);
  await shareCtx.addInitScript(() => {
    window.__share = { mode: "abort", calls: [] };
    Object.defineProperty(navigator, "canShare", { configurable: true, value: (d) => !!(d && d.files && d.files.length) });
    const cancel = () => new DOMException("Share canceled", "AbortError"), busy = () => new DOMException("A share is already in progress", "InvalidStateError");
    Object.defineProperty(navigator, "share", { configurable: true, value: (d) => {
      __share.calls.push(d.files[0].name);
      if (__share.open) return Promise.reject(busy()); // như Safari: bảng chia sẻ đang mở
      if (__share.mode === "abort") return Promise.reject(cancel());
      if (__share.mode === "slow-abort") { __share.open = true; return new Promise((_, no) => setTimeout(() => { __share.open = false; no(cancel()); }, 400)); }
      return Promise.resolve();
    } });
  });
  const sp = await shareCtx.newPage(); sp.on("pageerror", (e) => errs.push("pageerror L17: " + e.message));
  let spDownloads = 0; sp.on("download", () => spDownloads++);
  const spAt = () => sp.evaluate(() => JSON.parse(localStorage.getItem("ontap_db_v1")).settings.lastBackupAt);
  await sp.goto(BASE + "/"); await sp.click(".tile:has-text('Bố Minh')"); await sp.fill("#pinIn", "1234"); await sp.waitForTimeout(400);
  const sh = { before: await spAt() };
  await sp.goto(BASE + "/#/admin/overview"); await sp.waitForSelector("#backupNow");
  await sp.click("#backupNow"); await sp.waitForTimeout(300); // bấm hủy trên bảng chia sẻ
  sh.abort = { at: await spAt(), card: !!(await sp.$("#backupRemind")) };
  await sp.goto(BASE + "/#/admin/data"); await sp.waitForTimeout(200);
  await sp.click("#dExport"); await sp.waitForTimeout(300);
  sh.abortData = { at: await spAt(), last: await sp.textContent("#dLast") };
  await sp.evaluate(() => (__share.mode = "slow-abort"));
  await sp.dblclick("#dExport"); await sp.waitForTimeout(700); // bấm hai lần liền, rồi hủy bảng chia sẻ
  sh.double = { at: await spAt(), calls: await sp.evaluate(() => __share.calls.length) };
  await sp.evaluate(() => (__share.mode = "ok"));
  await sp.click("#dExport"); await sp.waitForTimeout(300);
  sh.okData = { at: await spAt(), last: await sp.textContent("#dLast") };
  sh.calls = await sp.evaluate(() => __share.calls);
  sh.home = (await sp.textContent("#homeScreen")).replace(/\s+/g, " ");
  await sp.evaluate(() => { const d = JSON.parse(localStorage.getItem("ontap_db_v1")); delete d.settings.lastBackupAt; localStorage.setItem("ontap_db_v1", JSON.stringify(d)); });
  await sp.goto(BASE + "/#/admin/overview"); await sp.reload(); await sp.waitForSelector("#backupNow");
  await sp.evaluate(() => (__share.mode = "ok"));
  await sp.click("#backupNow"); await sp.waitForTimeout(300); // thẻ nhắc trên trang chủ, chia sẻ xong
  sh.ok = { at: await spAt(), card: !!(await sp.$("#backupRemind")), toast: await sp.textContent("#toast"), calls: await sp.evaluate(() => __share.calls.length) };
  sh.downloads = spDownloads;
  const spNow = await nowIn(sp);
  await shareCtx.close();
  console.log("L17:", hs, sh, "tip in browser:", tipInBrowser);
  const homeScreenOK = !tipInBrowser && hs.tip && /Đã dùng OnUp trong Safari/.test(hs.tip.text) && hs.tip.btn && hs.tip.above && /Bố Minh/.test(hs.restored) && /Bin/.test(hs.restored) && hs.results === 5
    && /không dùng chung dữ liệu/.test(sh.home) && /Khôi phục từ file sao lưu/.test(sh.home) && /Android.*không cần chuyển/.test(sh.home)
    && sh.before == null && sh.abort.at == null && sh.abort.card && sh.abortData.at == null && /chưa sao lưu lần nào/.test(sh.abortData.last)
    && sh.double.at == null && sh.double.calls === 3
    && fresh(sh.okData.at, spNow) && /Hôm nay/.test(sh.okData.last) && sh.calls.length === 4 && sh.calls.every((n) => /^on-thi-sao-luu-\d{4}-\d\d-\d\d\.json$/.test(n))
    && fresh(sh.ok.at, spNow) && !sh.ok.card && /Đã lưu file sao lưu/.test(sh.ok.toast) && sh.ok.calls === 1 && sh.downloads === 0;

  step("not found + wrong grade (L3)");
  const view = async (h) => { await page.goto(BASE + "/" + h); await page.waitForTimeout(200); await page.waitForSelector("#missing, #qPractice, #playerFrame", { timeout: 5000 }).catch(() => {}); return { text: (await page.textContent("#view")).replace(/\s+/g, " ").trim(), missing: !!(await page.$("#missing")), quiz: !!(await page.$("#qPractice")), frame: !!(await page.$("#playerFrame")) }; };
  const nf = await view("#/khongcotrang"); await shot("15-not-found");
  const nfAdmin = await view("#/admin/khongco");
  const adminPeek = [await view("#/quiz/toan4-ck1-de1"), await view("#/quiz/khtn6-ck1-de1"), await view("#/play/ioe-6")]; // quản trị xem thử mọi khối
  const naId = await page.evaluate(() => Store.users("student").find((u) => u.name === "Na").id);
  await page.goto(BASE + "/#/admin/user/" + naId); await page.waitForTimeout(200);
  await page.fill("#uPin", "4444"); await page.click("button[type=submit]"); await page.waitForTimeout(300); // đặt PIN mới cũng mở khóa
  await page.goto(BASE + "/#/account"); await page.click("#logout"); await page.waitForTimeout(200);
  await page.click(".tile:has-text('Na')"); await page.fill("#pinIn", "4444"); await page.waitForTimeout(400);
  const naIn = await page.evaluate(() => (Store.sessionUser() || {}).name);
  const g4quiz = await view("#/quiz/toan4-ck1-de1"); await shot("16-wrong-grade");
  const g4play = await view("#/play/l4-giua-ki-1");
  const g6quiz = await view("#/quiz/khtn6-ck1-de1"), g6play = await view("#/play/ioe-6");
  const noBank = await view("#/quiz/khongco");
  console.log("L3:", { nf: nf.text.slice(0, 60), nfAdmin: nfAdmin.missing, adminPeek: adminPeek.map((x) => x.quiz || x.frame), naIn, g4quiz: g4quiz.text.slice(0, 60), g4play: g4play.missing && !g4play.frame, g6: g6quiz.quiz && g6play.frame, noBank: noBank.text.slice(0, 40) });
  const routeOK = nf.missing && /Không tìm thấy trang/.test(nf.text) && nfAdmin.missing && adminPeek.every((x) => !x.missing && (x.quiz || x.frame))
    && naIn === "Na" && g4quiz.missing && !g4quiz.quiz && /dành cho lớp 4/.test(g4quiz.text) && g4play.missing && !g4play.frame && /dành cho lớp 4/.test(g4play.text)
    && g6quiz.quiz && g6play.frame && noBank.missing;

  step("PIN auto submit by length (L10)");
  const logout = async () => { await page.goto(BASE + "/#/account"); await page.click("#logout"); await page.waitForTimeout(200); };
  const tile = async (n) => page.click(`.tile[data-u="${await page.evaluate((x) => Store.users().find((u) => u.name === x).id, n)}"]`);
  const tap = async (digits) => { for (const k of digits) await page.click(`.pad button[data-k="${k}"]`); await page.waitForTimeout(250); };
  await page.evaluate(() => Store.updateUser(Store.users().find((u) => u.name === "Bin").id, { pin: "123456" }));
  const lenNew = (await pinLog()).Bin.len; // đổi PIN thì lưu độ dài mới
  await editDb(`d.users.forEach((u) => { if (u.name === "Bin" || u.name === "Mẹ Bin") delete u.pinLen; });`); // như dữ liệu trước khi có pinLen
  await logout(); await page.reload(); await page.waitForTimeout(300);
  const lenOld = await page.evaluate(() => Store.users().filter((u) => /Bin/.test(u.name)).map((u) => u.pinLen)); // giá trị mặc định: 0 = chưa biết
  await tile("Mẹ Bin"); await tap("2222"); // tài khoản cũ, PIN 4 số: đủ 4 số thì thử lặng lẽ và vào được
  const oldFour = { who: await who(), len: (await pinLog())["Mẹ Bin"].len };
  await logout(); await tile("Bin"); await tap("9999"); // tài khoản cũ, PIN 6 số: thử lặng lẽ sai thì không báo, không tính
  const partial = { who: await who(), err: (await page.textContent("#pinErr")).trim(), fails: (await pinLog()).Bin.fails };
  await tap("99"); // đủ 6 số: kiểm tra thật, sai tính 1 lần
  const wrong6 = { err: await page.textContent("#pinErr"), fails: (await pinLog()).Bin.fails };
  await tap("123456");
  const sixIn = { who: await who(), len: (await pinLog()).Bin.len };
  console.log("L10:", { autoIn, lenNew, lenOld, oldFour, partial, wrong6, sixIn });
  const pinAutoOK = autoIn === "Bin" && lenNew === 6 && lenOld.join() === "0,0" && oldFour.who === "Mẹ Bin" && oldFour.len === 4
    && partial.who === "" && partial.err === "" && partial.fails === 0 && /chưa đúng/.test(wrong6.err) && wrong6.fails === 1 && sixIn.who === "Bin" && sixIn.len === 6;
  const db = await page.evaluate(() => JSON.parse(localStorage.getItem("ontap_db_v1")));
  console.log("results:", db.results.map((r) => [r.source, r.refId, r.subject, r.r, r.t, r.userId === db.users.find(u=>u.name==="Bin").id]));
  console.log("banks:", db.banks.map((b) => [b.title, b.questions.length, b.src.length > 0, Object.keys(b.passages || {}).join()]));
  const bankImportOK = /Nhận được 11 câu: 3 trắc nghiệm, 1 điền khuyết, 2 đúng\/sai, 1 đúng\/sai 4 ý, 1 trả lời bằng số, 1 nối cột, 1 sắp xếp, 1 tự luận; 1 đoạn đọc\.$/.test(bankCheck.trim())
    && db.banks.length === 1 && db.banks[0].passages.d1.title === "Chú mèo con" && db.banks[0].questions.filter((q) => q.p === "d1").length === 2;
  console.log("keys:", await page.evaluate(() => Object.keys(localStorage)));

  step("seed banks load on demand");
  /* Nội dung đề (mã, khối, chủ đề, lời giải, đáp án, gắn kì thi…) do tests/kiem-tra-de.js kiểm tra. Ở đây: trước khi mở đề
     chỉ có danh mục; mở đề Toán 4 thì tải 4-toan.js; đến giờ mới mở thêm đề KHTN 6 (quản trị xem thử, L3) nên chỉ thêm 6-khtn.js.
     Số câu trên nút đề ở trang chủ lấy từ danh mục (n), nên trang chủ không cần tải câu hỏi. Trang vừa tải lại (L10, Bin đang
     đăng nhập): chưa có câu hỏi nào; mở một đề Toán 4 thì mọi đề của file 4-toan.js có đủ câu (cùng file). Số mong đợi tính từ
     danh mục (ONTAP_SEED_BANKS) và file đã tải, không ghi cứng (Phiên N23), nên thêm đề Toán 4 không phải sửa bước này: đề cố định
     nào cũng đủ n câu; đề ngẫu nhiên (K3) có kho = câu riêng của pool trong file (nếu có) + câu của các đề trong from; file chỉ ghi
     mã đề của chính nó (không có mã của file khác) và có đủ các đề cố định danh mục ghi cho nó. */
  lazy.now = bankList();
  const seedState = () => page.evaluate(() => {
    const cat = window.ONTAP_SEED_BANKS.filter((b) => b.file === "4-toan.js"), Q = window.ONTAP_SEED_QUESTIONS || {}, loaded = Object.keys(Q);
    const n = (id) => cat.find((b) => b.id === id).n, want = (b) => (!loaded.length ? 0 : b.pool ? ((Q[b.id] || {}).questions || []).length + b.pool.from.map(n).reduce((a, x) => a + x, 0) : b.n);
    return { loaded: loaded.length, banks: cat.length, pools: cat.filter((b) => b.pool).length, foreign: loaded.filter((id) => !cat.some((b) => b.id === id)),
      missing: cat.filter((b) => !b.pool && !Q[b.id]).map((b) => b.id), bad: cat.filter((b) => (Store.bank(b.id).questions || []).length !== want(b)).map((b) => b.id + ": " + (Store.bank(b.id).questions || []).length + "/" + want(b)) };
  });
  await page.goto(BASE + "/#/home"); await page.waitForTimeout(200);
  lazy.home2 = await seedState();
  await page.goto(BASE + "/#/quiz/toan4-ck1-de2"); await page.waitForSelector("#qPractice");
  lazy.quiz2 = await seedState();
  console.log("bank files:", lazy);
  const dataErrs = [];
  if (lazy.home !== "index.js" || lazy.quiz !== "4-toan.js,index.js" || lazy.now !== "4-toan.js,6-khtn.js,index.js") dataErrs.push("file đề tải về: " + JSON.stringify(lazy));
  const seedOK = (s, open) => s.banks > s.pools && s.pools > 0 && !s.foreign.length && !s.bad.length && (open ? s.loaded > 0 && !s.missing.length : s.loaded === 0);
  if (!seedOK(lazy.home2, false) || !seedOK(lazy.quiz2, true)) dataErrs.push("đề đã tải: " + JSON.stringify([lazy.home2, lazy.quiz2]));

  step("new seed banks reach old data");
  const ck1 = () => page.evaluate(() => JSON.parse(localStorage.getItem("ontap_db_v1")).events.find((e) => e.id === "ck1-l4").banks);
  await editDb(`d.events.find((e) => e.id === "ck1-l4").banks = ["mau-toan4-ck1"]; delete d.seedBanksSeen;`); // như máy cài trước khi có đề mới
  await page.reload(); await page.waitForTimeout(300);
  const seedCk1 = await page.evaluate(() => window.ONTAP_SEED_EVENTS.find((e) => e.id === "ck1-l4").banks);
  const linked = await ck1();
  await editDb(`const e = d.events.find((x) => x.id === "ck1-l4"); e.banks = e.banks.filter((id) => id !== "toan4-ck1-de3");`); // quản trị bỏ gắn một đề
  await page.reload(); await page.waitForTimeout(300);
  const kept = await ck1();
  const migOK = JSON.stringify(linked) === JSON.stringify(seedCk1) && !kept.includes("toan4-ck1-de3") && kept.length === seedCk1.length - 1;
  console.log("ck1-l4 after reload:", linked, "after admin unlink:", kept);

  step("restore cloud backup refused");
  const cloudBackup = await page.evaluate(() => {
    const before = JSON.stringify(Store.data());
    const file = JSON.stringify({ app: "on-thi-4-6", from: "cloud", users: Store.users().map((u) => ({ id: u.id, role: u.role, name: u.name })), events: Store.events(), results: [] });
    let msg = "";
    try { Store.importJSON(file); } catch (e) { msg = e.message; }
    return { msg, same: JSON.stringify(Store.data()) === before };
  });
  console.log("cloud backup:", cloudBackup);
  const cloudOK = /đám mây/.test(cloudBackup.msg) && cloudBackup.same;

  step("default calendar reaches old data; exams of inactive grades stay hidden (Lịch các khối mới)");
  /* Máy đã có lịch cũ (16 kì thi của khối 4, 6, chưa có seedEventsSeen; bố mẹ đã sửa ngày gk1-l4, xóa ioe-qg, bỏ khối 6 khỏi tet-2027, het-hk1
     còn ngày cũ 17/1 của lịch mặc định) mở bản mới: có thêm mọi kì thi của khối 5, 7–12 (kể cả thi vào 10, thi tốt nghiệp THPT), mốc năm học
     được thêm khối (tet-2027 không thêm lại khối 6), gk1-l4 giữ ngày đã sửa, ioe-qg không quay lại, het-hk1 sang 18/1; mở lại không chép lần hai;
     kì thi mới bố mẹ xóa không quay lại. Khối chưa bật (data/grades.js) không hiện: lịch thi "Cả hai khối", chi tiết kì thi, danh sách kì thi của
     quản trị, form kì thi (khối ẩn giữ nguyên khi lưu). Đề mới chỉ ghi là đã xét khi đã gắn được: thử hai hàm thuần (Store._linkSeedBanks,
     Store._mergeSeedEvents) với kì thi giả gắn đề giả thêm tạm vào lịch và danh mục. Chạy trong context riêng (bản sao dữ liệu), không đụng
     dữ liệu của các bước sau. */
  const calCtx = await newContext({ storageState: await ctx.storageState(), viewport: { width: 390, height: 844 } });
  await localConfig(calCtx); watchOut(calCtx);
  const cp = await calCtx.newPage(); cp.on("pageerror", (e) => errs.push("pageerror lịch: " + e.message)); cp.on("console", (m) => { if (m.type() === "error") errs.push("console lịch: " + m.text()); });
  await cp.goto(BASE + "/"); await cp.waitForTimeout(200);
  const cal = {};
  const V1 = { "khai-giang": [4, 6], "gk1-l4": [4], "gk1-l6": [6], "ioe-truong": [4, 6], "ck1-l6": [6], "ck1-l4": [4], "ioe-xa": [4, 6], "het-hk1": [4, 6], "tet-2027": [4, 6],
    "ioe-tinh": [4, 6], "gk2-l4": [4], "gk2-l6": [6], "ioe-qg": [4, 6], "ck2-l6": [6], "ck2-l4": [4], "het-nam": [4, 6] }; // lịch khối 4, 6 trước phiên này
  await cp.evaluate((V1) => {
    const d = JSON.parse(localStorage.getItem("ontap_db_v1"));
    d.events = window.ONTAP_SEED_EVENTS.filter((e) => V1[e.id] && e.id !== "ioe-qg").map((e) => Object.assign(JSON.parse(JSON.stringify(e)), { grades: V1[e.id] })); // ioe-qg: bố mẹ đã xóa
    const gk = d.events.find((e) => e.id === "gk1-l4"); gk.start = "2026-11-04"; gk.end = "2026-11-06"; gk.tentative = false; // trường đã báo lịch
    d.events.find((e) => e.id === "tet-2027").grades = [4]; // bố mẹ bỏ khối 6
    const hk = d.events.find((e) => e.id === "het-hk1"); hk.start = hk.end = "2027-01-17"; // ngày cũ của lịch mặc định
    delete d.seedEventsSeen;
    localStorage.setItem("ontap_db_v1", JSON.stringify(d));
  }, V1);
  const calState = () => cp.evaluate(() => { const d = JSON.parse(localStorage.getItem("ontap_db_v1")), ev = (id) => d.events.find((e) => e.id === id) || null, g = (id) => (ev(id) ? ev(id).grades.join() : null);
    return { n: d.events.length, seed: window.ONTAP_SEED_EVENTS.length, seen: (d.seedEventsSeen || []).length, keys: Store._seedEventKeys().length, ids: d.events.map((e) => e.id).sort().join(),
      gk1: ev("gk1-l4") && [ev("gk1-l4").start, ev("gk1-l4").end, ev("gk1-l4").tentative].join(), ioeQg: !!ev("ioe-qg"), tet: g("tet-2027"), kg: g("khai-giang"), hk1: ev("het-hk1") && ev("het-hk1").start + "/" + ev("het-hk1").end,
      vao10: ev("vao10-2027") && g("vao10-2027") + " " + ev("vao10-2027").start + " " + ev("vao10-2027").subjects.join("+"), l9: !!ev("ck1-l9") && g("ck1-l9") === "9" && /Thông tư 89/.test(ev("ck1-l9").note),
      banks: ev("gk1-l4").banks.length, bseen: d.seedBanksSeen.length }; });
  await cp.reload(); await cp.waitForTimeout(300);
  cal.first = await calState();
  await cp.reload(); await cp.waitForTimeout(300);
  cal.second = await calState(); // mở lại: không chép lần hai
  await cp.evaluate(() => Store.removeEvent("vao10-2027")); await cp.reload(); await cp.waitForTimeout(300);
  cal.removed = await calState(); // kì thi mới bố mẹ xóa không quay lại
  cal.link = await cp.evaluate(() => {
    const ev = { id: "thu-l9", title: "Thi thử", kind: "thi-khac", grades: [9], start: "2027-05-01", end: "2027-05-02", tentative: true, subjects: [], scope: "", modules: [], banks: ["thu9-de1"] };
    const bk = { id: "thu9-de1", title: "Thử 9 · Thi thử · Đề 1", grade: 9, subject: "Toán", minutes: 10, n: 1, file: "9-thu.js" };
    window.ONTAP_SEED_EVENTS.push(ev); window.ONTAP_SEED_BANKS.push(bk);
    try {
      const d = Store.data(), events = JSON.parse(JSON.stringify(d.events)), seenB = d.seedBanksSeen.slice(), seenE = d.seedEventsSeen.slice();
      const a = Store._linkSeedBanks(events, seenB, seenE); // kì thi máy chưa có, chưa xét: đề để lại
      const b = Store._linkSeedBanks(events, seenB, seenE.concat("thu-l9:9")); // kì thi bố mẹ đã xóa: đã xét, không gắn
      const m = Store._mergeSeedEvents(events, seenE), c = Store._linkSeedBanks(m.events, seenB, m.seen); // kì thi đến cùng lần mở: có đề, đã xét
      return { a: !a.seen.includes("thu9-de1") && a.changed.length === 0 && a.seen.length === seenB.length, b: b.seen.includes("thu9-de1") && b.changed.length === 0,
        m: m.added.length === 1 && m.added[0].id === "thu-l9" && m.added[0].banks.join() === "thu9-de1" && m.seen.includes("thu-l9:9") && m.changed.length === 0,
        c: c.seen.includes("thu9-de1") && c.changed.length === 0 && m.events.find((e) => e.id === "thu-l9").banks.join() === "thu9-de1" };
    } finally { window.ONTAP_SEED_EVENTS.pop(); window.ONTAP_SEED_BANKS.pop(); }
  });
  // context mới không có phiên đăng nhập (sessionStorage không chép theo): đang ở màn chọn hồ sơ, vào bằng Bố Minh (quản trị)
  await cp.goto(BASE + "/#/"); await cp.waitForSelector(".tile");
  await cp.click(`.tile[data-u="${await cp.evaluate(() => Store.users("admin")[0].id)}"]`); await cp.fill("#pinIn", "1234"); await cp.waitForTimeout(400);
  await cp.goto(BASE + "/#/calendar"); await cp.waitForSelector(".tabs [data-g]"); await cp.click('.tabs [data-g="0"]'); await cp.waitForTimeout(200);
  const HIDDEN_GRADE = /Lớp (1|2|3|5|7|8|9|10|11|12)(,|$)/;
  cal.ui = await cp.evaluate((re) => { const evs = [...document.querySelectorAll("[data-ev]")], lbl = (id) => ((document.querySelector(`[data-ev="${id}"] .t b`) || {}).textContent || "").replace(/\s+/g, " ");
    return { tabs: [...document.querySelectorAll(".tabs button")].map((b) => b.textContent).join(), n: evs.length, shown: Store.events().filter((e) => e.grades.some((g) => g === 4 || g === 6)).length, all: Store.events().length,
      only46: evs.every((b) => Store.event(b.dataset.ev).grades.some((g) => g === 4 || g === 6)), kg: lbl("khai-giang"), tet: lbl("tet-2027"), hidden: evs.some((b) => new RegExp(re).test(b.querySelector(".t b").textContent)) }; }, HIDDEN_GRADE.source);
  await cp.click('[data-ev="khai-giang"]'); await cp.waitForSelector("#evDetail");
  cal.ui.detail = (await cp.textContent("#evDetail p")).replace(/\s+/g, " ").trim();
  await cp.goto(BASE + "/#/admin/events"); await cp.waitForSelector("#calLink");
  cal.ui.adminList = await cp.evaluate((re) => ({ n: document.querySelectorAll("#view .list .item").length, hidden: [...document.querySelectorAll("#view .list .item b")].some((b) => new RegExp(re).test(b.textContent)) }), HIDDEN_GRADE.source);
  await cp.goto(BASE + "/#/admin/event/khai-giang"); await cp.waitForSelector("#eForm");
  cal.ui.form = await cp.$$eval("input[name=eg]", (o) => o.map((x) => x.value + (x.checked ? "*" : "")).join());
  await cp.click("#eForm [type=submit]"); await cp.waitForTimeout(200);
  cal.ui.formSaved = await cp.evaluate(() => Store.event("khai-giang").grades.join()); // khối ẩn giữ nguyên khi lưu
  await cp.goto(BASE + "/#/admin/event/gk1-l4"); await cp.waitForSelector("#eForm");
  cal.ui.form4 = await cp.$$eval("input[name=eg]", (o) => o.map((x) => x.value + (x.checked ? "*" : "")).join());
  await calCtx.close();
  console.log("Lịch các khối mới:", JSON.stringify(cal));
  const calOK = cal.first.n === cal.first.seed - 1 && cal.first.seed > 40 && cal.first.seen === cal.first.keys && cal.first.gk1 === "2026-11-04,2026-11-06,false" && !cal.first.ioeQg
    && cal.first.tet === "4,1,2,3,5,7,8,9,10,11,12" && cal.first.kg === "4,6,1,2,3,5,7,8,9,10,11,12" && cal.first.hk1 === "2027-01-18/2027-01-18"
    && cal.first.vao10 === "9 2027-06-01 Toán+Ngữ văn+Tiếng Anh" && cal.first.l9 && cal.first.banks === 6
    && cal.second.n === cal.first.n && cal.second.seen === cal.first.keys && cal.second.ids === cal.first.ids && cal.second.hk1 === cal.first.hk1 && cal.second.bseen === cal.first.bseen
    && cal.removed.n === cal.first.n - 1 && !cal.removed.vao10 && cal.removed.seen === cal.first.keys
    && cal.link.a && cal.link.b && cal.link.m && cal.link.c
    && cal.ui.tabs === "Cả hai khối,Lớp 4,Lớp 6" && cal.ui.n === cal.ui.shown && cal.ui.all > cal.ui.shown && cal.ui.only46 && !cal.ui.hidden
    && cal.ui.kg === "Khai giảng năm học 2026–2027 · Lớp 4, 6" && cal.ui.tet === "Tết Nguyên đán Đinh Mùi (mùng 1) · Lớp 4" && /· Lớp 4, 6$/.test(cal.ui.detail)
    && cal.ui.adminList.n === cal.ui.shown && !cal.ui.adminList.hidden && cal.ui.form === "4*,6*" && cal.ui.formSaved === cal.first.kg && cal.ui.form4 === "4*,6";

  step("360px light + dark (L4–L11)");
  /* Ở 360px: không tràn ngang; mọi button, a.btn, .linkbtn, summary (dòng mở/đóng của <details>, L23) đang hiện cao ≥ 44px; không chữ nào nhỏ hơn 13px.
     Phần tử bị ẩn (display:none, nằm trong <details> đang đóng) không tính. Trả về danh sách lỗi.
     Chữ không đè lên nhau (chủ app yêu cầu 22/10/2026; trước đây tên ngắn dài như “Từ đơn, từ phức” tràn khỏi cột số bài, đè lên tên bài ở
     bài ôn l4, l6). Mỗi đoạn chữ (text node) đang hiện đo bằng Range.getClientRects, cắt theo khung có overflow khác visible (phần cuộn
     khuất không tính); hai đoạn khác nhau cùng lớp (cùng phần tử position fixed/sticky gần nhất, hoặc cùng không có: thanh dính, thông báo
     nổi che nội dung là đúng thiết kế) chồng lên nhau quá 2px theo chiều ngang và quá 40% chiều cao dòng thấp hơn (hai dòng liền nhau của một
     đoạn, dòng sát nhau vì line-height nhỏ không tính); chữ không tràn ra ngoài ô chứa nó (phần tử không inline gần nhất) quá 1,5px theo chiều
     ngang; chữ không đè lên ô nhập, hình. Không có hai phần tử cùng id, kể cả phần tử đang ẩn (X33, Phiên UX7b: $("#…") chỉ thấy phần tử
     đầu; dòng khối đang hiện của Sửa kì thi từng trùng id với ô Phạm vi kiến thức nên không hiện). only === "chữ": chỉ kiểm tra chữ đè,
     chữ tràn, id trùng (bài ôn dạng trang giữ cỡ chữ, cỡ nút của bài gốc). */
  const audit = (only) => {
    const bad = [], shown = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden"; };
    const idN = new Map(); document.querySelectorAll("[id]").forEach((e) => { if (e.id) idN.set(e.id, (idN.get(e.id) || 0) + 1); });
    idN.forEach((n, id) => { if (n > 1) bad.push(`id trùng: #${id} (${n} phần tử)`); });
    {
      const cs = (e) => getComputedStyle(e), say = (s) => `"${s.slice(0, 32)}"`;
      /* ẩn: nằm trong <details> đang đóng (trừ dòng summary; getComputedStyle không ghi display:none), display:none, visibility, opacity 0,
         content-visibility:hidden. <details> đang đóng xét bằng DOM trước, không gọi getComputedStyle trong phần đang đóng: gọi rồi thì
         getBoundingClientRect của nút trong đó có lúc ra 0, kiểm tra cỡ nút bên dưới đo sai. */
      const closed = (el) => { for (let e = el; e; e = e.parentElement) { const d = e.parentElement; if ((e === el && e.tagName === "DETAILS" && !e.open) || (d && d.tagName === "DETAILS" && !d.open && e.tagName !== "SUMMARY")) return true; } return false; };
      const hid = (el) => { if (closed(el)) return true; for (let e = el; e; e = e.parentElement) { const s = cs(e); if (s.display === "none" || s.visibility !== "visible" || parseFloat(s.opacity) === 0 || s.contentVisibility === "hidden") return true; } return false; };
      const layer = (el) => { for (let e = el; e; e = e.parentElement) if (/^(fixed|sticky)$/.test(cs(e).position)) return e; return null; };
      const cut = (el, r) => { // phần đang thấy của ô chữ r: cắt theo các khung có overflow khác visible (không tính body, html: cuộn cả trang)
        let L = r.left, T = r.top, R = r.right, B = r.bottom;
        for (let e = el; e && e !== document.body && e !== document.documentElement; e = e.parentElement) {
          const s = cs(e), x = s.overflowX !== "visible", y = s.overflowY !== "visible";
          if (x || y) { const b = e.getBoundingClientRect(); if (x) { L = Math.max(L, b.left); R = Math.min(R, b.right); } if (y) { T = Math.max(T, b.top); B = Math.min(B, b.bottom); } }
          if (s.position === "fixed") break;
        }
        return R - L > 0.5 && B - T > 0.5 ? { left: L, top: T, right: R, bottom: B } : null;
      };
      const items = [], tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let n; (n = tw.nextNode());) {
        const t = n.textContent, a = t.search(/\S/), el = n.parentElement;
        if (a < 0 || !el || el.closest("script,style,template,noscript,option") || hid(el)) continue;
        const rg = document.createRange(); rg.setStart(n, a); rg.setEnd(n, t.trimEnd().length);
        for (const r of rg.getClientRects()) { const c = r.width >= 1 && r.height >= 1 && cut(el, r); if (c) items.push({ n, el, ly: layer(el), r: c, h: r.height, t: t.trim().replace(/\s+/g, " ") }); }
      }
      const over = (a, b) => [Math.min(a.right, b.right) - Math.max(a.left, b.left), Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)];
      for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
        const a = items[i], b = items[j], [w, h] = over(a.r, b.r);
        if (a.n !== b.n && a.ly === b.ly && w > 2 && h > 0.4 * Math.min(a.h, b.h)) bad.push(`chữ đè lên nhau: ${say(a.t)} và ${say(b.t)}`);
      }
      for (const it of items) {
        let box = it.el; while (box && /^(inline|contents)$/.test(cs(box).display)) box = box.parentElement;
        if (!box || box.closest("svg")) continue;
        const b = box.getBoundingClientRect(), d = Math.max(it.r.right - b.right, b.left - it.r.left);
        if (d > 1.5) bad.push(`chữ tràn khỏi ô: ${say(it.t)} ra ngoài ${Math.round(d)}px`);
      }
      const boxes = [...document.querySelectorAll("input:not([type=hidden]),textarea,select,img,canvas,video")].filter((e) => !hid(e)).map((e) => ({ e, ly: layer(e), r: e.getBoundingClientRect() }));
      for (const it of items) for (const x of boxes) {
        const [w, h] = over(it.r, x.r);
        if (x.ly === it.ly && x.r.width > 2 && x.r.height > 2 && w > 2 && h > 0.4 * it.h) bad.push(`chữ đè lên ô nhập, hình: ${say(it.t)} và <${x.e.tagName.toLowerCase()}>`);
      }
    }
    if (only === "chữ") return [...new Set(bad)];
    if (document.documentElement.scrollWidth > innerWidth) bad.push("tràn ngang: rộng " + document.documentElement.scrollWidth + "px");
    document.querySelectorAll("button, a.btn, .linkbtn, summary").forEach((el) => { const h = el.getBoundingClientRect().height; if (shown(el) && h < 44) bad.push(`nút "${el.textContent.trim().slice(0, 24)}" cao ${Math.round(h)}px`); });
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n; (n = tw.nextNode());) {
      const el = n.parentElement, fs = parseFloat(getComputedStyle(el).fontSize);
      if (n.textContent.trim() && shown(el) && fs < 13) bad.push(`chữ "${n.textContent.trim().slice(0, 24)}" ${fs}px`);
    }
    return [...new Set(bad)];
  };
  const OUT360 = OUT + "360/"; require("fs").mkdirSync(OUT360, { recursive: true });
  // Thanh tab dưới của học sinh (#tabbar, UX1) cố định ở mép màn hình; chụp cả trang thì ghim tạm xuống cuối trang (on = true), chụp xong trả lại.
  const pinTabs = (pg, on) => pg.evaluate((on) => { const b = document.querySelector("#tabbar"); if (!b) return; b.style.position = on ? "absolute" : ""; b.style.top = on ? document.documentElement.scrollHeight - b.offsetHeight + "px" : ""; }, on);
  const state = await ctx.storageState(); // dữ liệu của các bước trên (localStorage), chưa đăng nhập
  const ids = await page.evaluate(() => Object.fromEntries(Store.users().map((u) => [u.name, u.id])));
  const PINS = { "Bố Minh": "1234", "Mẹ Bin": "2222", Bin: "123456" };
  const m360 = [], c360 = {};
  for (const scheme of ["light", "dark"]) {
    const opts = { viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, colorScheme: scheme };
    const c = await newContext(Object.assign({ storageState: state }, opts)), fresh = await newContext(opts);
    for (const x of [c, fresh]) { await localConfig(x); watchOut(x); x.on("page", (pg) => pg.on("pageerror", (e) => errs.push("pageerror 360: " + e.message))); }
    let p = await fresh.newPage();
    const open = async (h, wait) => { await p.goto(BASE + "/" + h); await p.waitForTimeout(wait || 250); };
    const check = async (label) => (await p.evaluate(audit)).forEach((x) => m360.push(`${scheme} · ${label}: ${x}`));
    // thanh đầu dính: chụp cả trang từ đầu trang. Thanh tab dưới (UX1) cố định ở mép màn hình: chụp cả trang thì ghim xuống cuối trang.
    const snap = async (n, full) => { if (full) { await p.evaluate(() => scrollTo(0, 0)); await pinTabs(p, true); } await p.screenshot({ path: `${OUT360}${n}-${scheme}.png`, fullPage: !!full }); if (full) await pinTabs(p, false); };
    const footShown = () => p.evaluate(() => getComputedStyle(document.querySelector(".foot")).display !== "none");
    const statsRow = () => p.evaluate(() => { const t = [...document.querySelector(".stats:not(.four)").children].map((x) => Math.round(x.getBoundingClientRect().top)); return t.length === 3 && new Set(t).size === 1; });
    const signIn = async (name) => {
      await open("#/account"); if (await p.$("#logout")) { await p.click("#logout"); await p.waitForTimeout(200); }
      await p.click(`.tile[data-u="${ids[name]}"]`); await p.fill("#pinIn", PINS[name]); await p.waitForTimeout(400);
    };
    const r = (c360[scheme] = {});
    await open("#/"); await check("thiết lập lần đầu");
    p = await c.newPage();
    await open("#/"); await p.waitForSelector(".tile");
    await check("đăng nhập"); await snap("dang-nhap", true);
    r.loginFoot = !(await footShown());
    // UX4 X1: chạm hồ sơ có PIN thì sang bước nhập riêng (#/vao/<mã>): trang không cuộn, tên và 12 nút bàn phím đều trong khung nhìn 740px,
    // không còn danh sách, có "← Chọn hồ sơ khác" và dòng quên PIN; ô #pinIn ẩn khỏi mắt (X2)
    await p.click(`.tile[data-u="${ids.Bin}"]`); await p.waitForSelector("#pinBox:not([hidden])"); await p.waitForTimeout(300);
    r.enter = await p.evaluate(() => { const pad = [...document.querySelectorAll(".pad button")].map((b) => b.getBoundingClientRect()), nm = document.querySelector("#pinWho b"), inp = document.querySelector("#pinIn").getBoundingClientRect();
      const vis = (x) => x.top >= 0 && x.bottom <= innerHeight;
      return /^#\/vao\//.test(location.hash) && scrollY === 0 && nm.textContent === "Bin" && vis(nm.getBoundingClientRect()) && pad.length === 12 && pad.every(vis) && !document.querySelector(".tile")
        && document.querySelector("#toList").textContent === "← Chọn hồ sơ khác" && inp.width <= 1 && inp.height <= 1 && /^Quên mã PIN\? Nhờ quản trị đặt lại trong Quản trị → Tài khoản\.$/.test(document.querySelector("#pinHelp").textContent); });
    await check("bước nhập PIN"); await snap("nhap-pin");
    // bàn phím PIN đang hiện số (U1, X2): gõ 3 số, bấm nút chữ "Hiện số" dưới hàng chấm; ô nhập vẫn ẩn
    for (const k of PINS.Bin.slice(0, 3)) await p.click(`.pad button[data-k="${k}"]`);
    await p.click("#pinShow");
    r.pinShown = await p.evaluate(() => { const d = document.querySelector("#pinDots"), b = document.querySelector("#pinShow"), bb = b.getBoundingClientRect(), inp = document.querySelector("#pinIn").getBoundingClientRect();
      return d.classList.contains("shown") && d.textContent === "123" && document.querySelector("#pinIn").type === "text" && bb.height >= 44 && b.getAttribute("aria-pressed") === "true" && inp.width <= 1; });
    await check("bàn phím PIN đang hiện số"); await snap("ban-phim-pin-hien-so");
    for (const k of PINS.Bin.slice(3)) await p.click(`.pad button[data-k="${k}"]`);
    await p.waitForTimeout(400);
    // học sinh lớp 4: trang chủ "Hôm nay" (UX1): thẻ gợi ý với nút Bắt đầu, chuỗi ngày, huy hiệu, 3 kết quả gần đây; thanh tab dưới 4 mục, tab đang mở
    // là Hôm nay, mỗi tab cao ≥ 44px và nằm trong màn hình; thanh trên không còn nút Lịch thi.
    r.home = await p.evaluate(() => {
      const tabs = [...document.querySelectorAll("#tabbar a")], rects = tabs.map((a) => a.getBoundingClientRect());
      return !!document.querySelector("#today #todayGo") && !!document.querySelector("#streak .week") && !!document.querySelector("#badges") && document.querySelectorAll("#recent .item").length === 3
        && tabs.map((a) => a.textContent).join() === "Hôm nay,Bài ôn,Lịch thi,Kết quả" && tabs[0].getAttribute("aria-current") === "page" && rects.every((x) => x.height >= 44 && x.bottom <= innerHeight && x.left >= 0 && x.right <= innerWidth)
        && document.body.classList.contains("tabbed") && !document.querySelector(".who a[href='#/calendar']");
    });
    r.homeFoot = await footShown();
    await check("trang chủ học sinh"); await snap("trang-chu-hoc-sinh", true);
    // tab Bài ôn: mọi bài ôn của khối gom theo kì thi, kì gần nhất mở sẵn
    await open("#/practice"); await p.waitForSelector("#allPractice");
    r.practice = await p.evaluate(() => {
      const g = Store.sessionUser().grade, box = document.querySelector("#allPractice");
      const want = window.ONTAP_MODULES.filter((m) => m.grade === g).map((m) => "#/play/" + m.id).concat(Store.banks(g).map((b) => "#/quiz/" + b.id));
      const grps = [...box.querySelectorAll("details.grp")].map((d) => d.open);
      return grps.length > 1 && grps[0] && !grps.slice(1).some(Boolean) && want.every((h) => box.querySelector(`a[href="${h}"]`)) && [...box.querySelectorAll(".subj")].some((x) => x.querySelectorAll(".des a").length > 1)
        && document.querySelector('#tabbar a[aria-current="page"]').getAttribute("href") === "#/practice";
    });
    await check("tab Bài ôn"); await snap("bai-on", true);
    await p.evaluate(() => document.querySelectorAll("details.grp").forEach((d) => (d.open = true)));
    await check("tab Bài ôn, mở mọi nhóm");
    // tab Kết quả: ba ô số liệu ("Điểm trung bình tháng"), theo môn, chủ đề hay sai, bài đã làm
    await open("#/results"); await p.waitForSelector("#allResults");
    r.results = await p.evaluate(() => document.querySelector(".stats .stat:nth-child(2) span").textContent === "Điểm trung bình tháng" && document.querySelectorAll("#allResults .item").length >= 3);
    r.homeStats = await statsRow();
    await check("tab Kết quả"); await snap("ket-qua", true);
    // tab Lịch thi của học sinh: chỉ kì thi chưa qua, không có mốc năm học, mỗi kì có "Còn N ngày" (hoặc đang diễn ra)
    await open("#/calendar"); await p.waitForSelector(".timeline");
    r.calendar = await p.evaluate(() => { const evs = [...document.querySelectorAll(".ev")]; return document.querySelector("h1").textContent === "Lịch thi lớp 4" && evs.length > 3 && !evs.some((e) => e.classList.contains("moc") || e.classList.contains("past"))
      && evs.every((e) => [...e.querySelectorAll(".tag")].some((t) => /^Còn \d+ ngày$/.test(t.textContent) || t.textContent === "Đang diễn ra")) && !document.querySelector("#view .linkbtn[data-go='#/home']"); });
    await snap("lich-thi-hoc-sinh", true);
    await p.click("[data-ev='ck1-l4']"); await p.waitForTimeout(300);
    await check("lịch thi + chi tiết kì thi"); r.calFoot = await footShown();
    await open("#/play/ioe-4", 1500);
    await check("bài ôn trong khung"); await snap("bai-on-trong-khung");
    r.play = await p.evaluate(() => { // chỉ cuộn trong khung: trang ngoài vừa màn hình, khung nằm trọn trong màn hình và dài hơn khung
      const f = document.querySelector("#playerFrame"), fr = f.getBoundingClientRect();
      return document.documentElement.scrollHeight <= innerHeight && fr.top > 0 && fr.bottom <= innerHeight && f.contentDocument.documentElement.scrollHeight > f.clientHeight;
    });
    r.playFoot = !(await footShown());
    for (const h of ["#/account", "#/khongco"]) { await open(h); await check(h); }
    // quản trị
    await signIn("Bố Minh");
    for (const t of ["overview", "users", "events", "banks", "data"]) {
      await open("#/admin/" + t); await check("quản trị " + t);
      if (t === "overview") {
        await snap("quan-tri"); r.adminStats = await statsRow(); r.adminFoot = await footShown();
        r.tabs = await p.evaluate(() => { const t = document.querySelector(".tabs"); return t.children.length === 5 && t.scrollWidth <= t.clientWidth && [...t.children].every((b) => { const x = b.getBoundingClientRect(); return x.left >= 0 && x.right <= innerWidth; }); });
      }
      if (t === "users") r.usersFoot = !(await footShown());
      if (t === "data") await snap("du-lieu", true);
    }
    for (const h of ["#/admin/user/new?role=student", "#/admin/event/ck1-l4", "#/admin/bank/new"]) { await open(h); await check(h); } // màn nhập đề: dòng "Cách viết câu hỏi" (summary) cũng phải cao ≥ 44px (L23)
    // đề chưa tải được (mất mạng mà chưa mở đề nào của môn này): báo và có nút Thử lại
    await c.route("**/data/banks/4-tv.js", (rt) => rt.abort("internetdisconnected"));
    await open("#/quiz/tv4-ck1-de1"); await p.waitForSelector("#qRetry"); await check("đề chưa tải được"); await snap("de-chua-tai-duoc");
    await c.unroute("**/data/banks/4-tv.js"); await p.click("#qRetry"); r.retry = !!(await p.waitForSelector("#qPractice").catch(() => null));
    await open("#/quiz/toan4-ck1-de1"); await p.waitForSelector("#qPractice"); await check("đề, màn đầu"); r.quizFoot = !(await footShown());
    // tiêu đề (X15): line-height tính ra của h1 ≥ 1,35 lần cỡ chữ, để chữ hoa hai dấu (Ố, Ẫ) của dòng dưới không chạm chân chữ g, y của dòng trên
    r.h1Line = await p.evaluate(() => { const cs = getComputedStyle(document.querySelector(".hero h1")); return parseFloat(cs.lineHeight) >= 1.35 * parseFloat(cs.fontSize) - 0.01; });
    await p.click("#qPractice"); await check("đề, câu hỏi");
    if (await p.$("#qzFill")) await p.fill("#qzFill", "1"); else await p.click(".opt >> nth=0");
    await p.click("#qzGo"); await check("đề, sau khi trả lời");
    // phụ huynh
    await signIn("Mẹ Bin"); await check("trang chủ phụ huynh");
    await open("#/child/" + ids.Bin); await check("hồ sơ của con (báo cáo tuần)");
    await open("#/child/" + ids.Bin + "/practice"); await check("bài ôn của con");
    await open("#/report/" + ids.Bin); await check("báo cáo tuần");
    await c.close(); await fresh.close();
  }
  const ok360 = !m360.length && Object.values(c360).every((r) => Object.values(r).every(Boolean));
  console.log("360:", c360, "problems:", m360);

  step("new question types (K2): 360px light + dark");
  /* Đề thử nghiệm thunghiem6-dang-cau-moi (lớp 6, không gắn kì thi): Na làm ôn luyện bằng chạm, mỗi câu trả lời theo
     KE_HOACH (có câu đúng hết, đúng một phần, sai), rồi so điểm: phần chấm tự động 8,75/13 câu; tự luận tự chấm 6/7 điểm,
     lưu riêng (mode "self", phần tư điểm: 24/28). Rồi làm như thi: tự chấm sau khi nộp. Phụ huynh xem báo cáo tuần:
     tự luận ghi riêng, không vào điểm trung bình. Mỗi màn hình kiểm tra 360px (audit), chụp ảnh sáng/tối ở
     tests/screenshots/dang-cau/ (bản ghép <tên>.jpg). Bộ lọc hình chạy với trình phân tích HTML thật của trình duyệt. */
  const OUTK2 = OUT + "dang-cau/"; fs.mkdirSync(OUTK2, { recursive: true });
  const BANK = "thunghiem6-dang-cau-moi";
  // [đầu câu hỏi, cách trả lời]. mc: chọn đúng/sai; tf4: số ý chọn đúng (các ý đầu); match: thứ tự ô phải cho từng ô trái;
  // order: thứ tự chạm; essay: mức chọn cho từng ý của thang (giá trị điểm).
  const KE_HOACH = [
    ["Theo đoạn văn, vào mùa nào", { mc: true }], ["Câu “Mùa hè", { mc: true }], ["Sắp xếp các hình ảnh", { order: [0, 1, 2, 3] }],
    ["How many days", { mc: true }], ["Read the text again", { tf4: 2 }], ["Match the words with their meanings", { match: [0, 1, 2, 3] }],
    ["Nối mỗi dụng cụ đo", { match: [1, 0, 2, 3] }], ["Quan sát hình. Chiếc bút chì", { num: "7,6 cm" }], ["Sắp xếp các số nguyên", { order: [1, 0, 2, 3] }],
    ["Cho hình chữ nhật ABCD", { tf4: 4 }], ["Một mảnh vườn", { num: "250" }], ["Hình vẽ dưới đây", { mc: false }], ["Số đối của", { fill: "7" }],
    ["Trình bày lời giải", { essay: [0.5, 0.5, 0.5, 0.5] }], ["Viết một đoạn văn", { essay: [1, 1, 1, 1], text: "Trước nhà em có cây khế. Lá khế nhỏ như cúc áo." }]
  ];
  const k2 = { problems: [] };
  for (const scheme of ["light", "dark"]) {
    const r = (k2[scheme] = {});
    const c = await newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, colorScheme: scheme });
    await localConfig(c); watchOut(c);
    const p = await c.newPage(); p.on("pageerror", (e) => errs.push("pageerror K2: " + e.message)); p.on("console", (m) => { if (m.type() === "error") errs.push("console K2: " + m.text()); });
    const check = async (label) => (await p.evaluate(audit)).forEach((x) => k2.problems.push(`${scheme} · ${label}: ${x}`));
    const snap = async (n) => { await p.evaluate(() => scrollTo(0, 0)); await p.screenshot({ path: `${OUTK2}${n}-${scheme}.png`, fullPage: true }); };
    // chỉ chụp một phần (trang dài): cắt từ ảnh cả trang để thanh đầu dính không đè lên; ẩn thông báo nổi
    const snapEl = async (sel, n) => {
      await p.evaluate(() => { scrollTo(0, 0); const t = document.querySelector("#toast"); if (t) t.hidden = true; });
      await p.screenshot({ path: `${OUTK2}${n}-${scheme}.png`, fullPage: true, clip: await p.locator(sel).boundingBox() });
    };
    await p.goto(BASE + "/"); await p.click(`.tile[data-u="${ids.Na}"]`); await p.fill("#pinIn", "4444"); await p.waitForTimeout(400);
    await p.goto(BASE + "/#/practice"); await p.waitForSelector("#allPractice"); // UX1: mọi bài ôn ở tab Bài ôn
    r.home = await p.evaluate((id) => !!document.querySelector(`#allPractice details.grp:not([data-grp]) a[href="#/quiz/${id}"]`), BANK); // không gắn kì thi: nhóm "Bài ôn khác"
    await p.goto(BASE + "/#/quiz/" + BANK); await p.waitForSelector("#qPractice");
    r.hero = /15 câu \(2 câu tự luận tự chấm\)/.test(await p.textContent(".hero"));
    const Q = await p.evaluate((id) => Store.bank(id).questions, BANK);
    await p.click("#qPractice");
    const seq = [], shots = new Set(), pk = [];
    for (let i = 0; i < 20 && !(await p.$(".score")); i++) {
      const head = (await p.textContent(".qcard .qtext")).trim();
      const plan = KE_HOACH.find(([h]) => head.startsWith(h)), q = plan && Q.find((x) => x.q.startsWith(plan[0]));
      if (!plan || !q) { k2.problems.push(scheme + ": không nhận ra câu " + head.slice(0, 40)); break; }
      const how = plan[1], kind = q.type; seq.push(q.p || "");
      if (q.p && seq.filter((x) => x === q.p).length === 2 && q.p === "bang") { // câu thứ hai của đoạn: thu gọn đoạn đọc
        await p.click(".psg > summary"); await p.waitForTimeout(100); // sự kiện toggle chạy sau cú chạm
        r.collapse = await p.evaluate(() => !document.querySelector(".psg").open && document.querySelector(".psg-t").textContent === "Mở ra");
        await check("đoạn đọc thu gọn"); await snap("doan-doc-thu-gon");
      }
      if (q.p && seq.filter((x) => x === q.p).length === 3) { r.stayClosed = await p.evaluate(() => !document.querySelector(".psg").open); await p.click(".psg > summary"); }
      if (kind === "mc") await p.click(`.opt:has-text("${how.mc ? q.o[0] : q.o[1]}")`);
      if (kind === "fill") await p.fill("#qzFill", how.fill);
      if (kind === "num") {
        await p.fill("#qzNum", how.num);
        if (how.num === "250") { await p.click("#qzSign"); const neg = await p.inputValue("#qzNum"); await p.click("#qzSign"); r.sign = neg === "-250" && (await p.inputValue("#qzNum")) === "250"; }
      }
      if (kind === "tf4") for (let k = 0; k < 4; k++) await p.click(`.tf4 .opt[data-i="${k}"][data-v="${(k < how.tf4 ? q.a[k] : !q.a[k]) ? 1 : 0}"]`);
      if (kind === "match") {
        for (let k = 0; k < how.match.length; k++) {
          await p.click(`.mt-li[data-i="${k}"]`); await p.click(`.mt-ri[data-r="${how.match[k]}"]`);
          if (k === 1 && how.match[0] === 1) { // chạm lại ô đang nối: bỏ nối; ô đã nối với ô khác: chuyển sang ô đang chọn
            await p.click(`.mt-li[data-i="1"]`); await p.click(`.mt-ri[data-r="0"]`);
            const off = await p.textContent('.mt-li[data-i="1"] .mt-to');
            await p.click(`.mt-ri[data-r="0"]`); await p.click('.mt-li[data-i="2"]'); await p.click('.mt-ri[data-r="1"]');
            const moved = await p.evaluate(() => [...document.querySelectorAll(".mt-li .mt-to")].map((x) => x.textContent));
            r.matchTap = off === "Chưa nối" && moved[0] === "Chưa nối" && /^→ [A-E]\. /.test(moved[2]);
            await snap("noi-cot"); await check("nối cột đang nối");
            await p.click('.mt-li[data-i="2"]'); await p.click('.mt-ri[data-r="1"]'); // bỏ nối thử, nối lại theo kế hoạch
            await p.click('.mt-li[data-i="0"]'); await p.click('.mt-ri[data-r="1"]');
          }
        }
      }
      if (kind === "order") {
        await p.click(`.ord-p[data-k="${how.order[1]}"]`);
        const placed = await p.evaluate((k) => document.querySelector(`.ord-p[data-k="${k}"]`).hidden && document.querySelectorAll(".ord-s").length === 1, how.order[1]);
        if (q.p) { await snap("sap-xep"); await check("sắp xếp đang xếp"); }
        await p.click(`.ord-s[data-k="${how.order[1]}"]`); // chạm ô đã xếp: trở lại bên dưới
        r.orderTap = placed && (await p.evaluate(() => !document.querySelectorAll(".ord-s").length)) && r.orderTap !== false;
        for (const k of how.order) await p.click(`.ord-p[data-k="${k}"]`);
      }
      if (kind === "essay" && how.text) await p.fill("#qzEssay", how.text);
      if (kind === "mc" && q.p === "bang" && !shots.has("doan-doc")) { shots.add("doan-doc"); await check("đoạn đọc"); await snap("doan-doc"); }
      await p.click("#qzGo");
      if (kind === "essay") { for (let j = 0; j < how.essay.length; j++) await p.click(`.rubric .opt[data-j="${j}"][data-v="${how.essay[j]}"]`); pk.push(await p.textContent(".rb-sum")); }
      const name = { tf4: q.svg ? "dung-sai-4-y" : "", num: q.svg ? "tra-loi-so" : "", match: "noi-cot-cham", order: q.p ? "sap-xep-cham" : "", essay: how.text ? "tu-luan" : "", mc: q.svg ? "hinh" : "" }[kind];
      await check("câu " + kind + " sau khi kiểm tra");
      if (name && !shots.has(name)) { shots.add(name); await snap(name); }
      if (name === "dung-sai-4-y") r.svgColor = await p.evaluate(() => { // màu hình theo token của chế độ đang dùng
        const t = document.createElement("i"); t.style.color = "var(--acc)"; document.body.append(t); const acc = getComputedStyle(t).color; t.remove();
        return getComputedStyle(document.querySelector(".qfig rect")).stroke === acc && document.querySelector(".qfig svg").getAttribute("role") === "img";
      });
      await p.click("#qzGo");
    }
    await p.waitForSelector(".score");
    // các câu cùng đoạn đọc đứng liền nhau, theo thứ tự trong đề
    const runs = seq.filter((x, i) => x && x !== seq[i - 1]);
    r.grouped = runs.length === 2 && new Set(runs).size === 2 && r.collapse && r.stayClosed;
    const res1 = await p.evaluate(() => Store.resultsFor(Store.sessionUser().id).map((x) => ({ mode: x.mode, r: x.r, t: x.t, subject: x.subject })));
    r.practice = res1.length === 2 && res1.some((x) => x.mode === "practice" && x.r === 8.75 && x.t === 13 && x.subject === "Thử nghiệm") && res1.some((x) => x.mode === "self" && x.r === 24 && x.t === 28);
    r.rubric = pk.length === 2 && pk.every((t) => /Tự chấm: (2\/2|4\/5) điểm/.test(t));
    r.resultScreen = await p.evaluate(() => {
      const t = document.querySelector("#view").textContent.replace(/\s+/g, " ");
      return /8,75\/13 câu đúng/.test(t) && document.querySelector(".score").textContent.startsWith("6,75") && /Theo mức độ/.test(t)
        && [...document.querySelectorAll("#qzLv .ubreak > span:first-child, #qzLv .ubreak > span:nth-child(3n+1)")].map((x) => x.textContent).join() === "Biết,Hiểu,Vận dụng"
        && /Đã lưu điểm tự chấm: 6\/7 điểm/.test(t) && /được 0,25\/1 điểm/.test(t) && /được 0,5\/1 điểm/.test(t);
    });
    await check("kết quả ôn luyện"); await snap("ket-qua");
    // làm như thi: bỏ qua mọi câu trừ một câu đúng/sai 4 ý (đúng hết) và hai câu tự luận; tự chấm sau khi nộp
    await p.goto(BASE + "/#/home"); await p.goto(BASE + "/#/quiz/" + BANK); await p.waitForSelector("#qExam"); await p.click("#qExam");
    for (let i = 0; i < 20 && !(await p.$("#qzRecap, #qzSelf, .score")); i++) {
      const head = (await p.textContent(".qcard .qtext")).trim(), q = Q.find((x) => head.startsWith(x.q.slice(0, 12)));
      if (q.type === "essay") await p.click("#qzGo");
      else if (q.type === "tf4" && q.svg) { for (let k = 0; k < 4; k++) await p.click(`.tf4 .opt[data-i="${k}"][data-v="${q.a[k] ? 1 : 0}"]`); await p.click("#qzGo"); }
      else await p.click("#qzSkip");
    }
    await endRecap(p); await p.waitForSelector("#qzSelfSave");
    await p.click("#qzSelfSave"); r.needPick = /Chọn mức cho từng ý/.test(await p.textContent("#qzSelfMsg"));
    const rows = await p.$$eval("#qzSelf .rubric", (x) => x.map((b) => b.querySelectorAll(".rb-row").length));
    for (let k = 0; k < rows.length; k++) for (let j = 0; j < rows[k]; j++) await p.click(`#qzSelf .rubric >> nth=${k} >> .opt[data-j="${j}"] >> nth=-1`);
    await check("tự chấm sau khi nộp"); await snapEl("#qzSelf", "tu-cham-sau-khi-nop"); // trang dài (các câu bỏ qua): chụp phần tự chấm
    await p.click("#qzSelfSave");
    r.examSelf = /Đã lưu điểm tự chấm: 7\/7 điểm/.test(await p.textContent("#qzSelfArea")) && (await p.$$eval("#qzSelf .rubric .opt", (b) => b.every((x) => x.disabled)));
    const res2 = await p.evaluate(() => Store.resultsFor(Store.sessionUser().id).map((x) => [x.mode, x.r, x.t].join(":")));
    r.exam = res2.length === 4 && res2.includes("exam:1:13") && res2.includes("self:28:28");
    await p.goto(BASE + "/#/home"); await p.waitForTimeout(250);
    r.recent = await p.evaluate(() => /tự luận tự chấm/.test(document.querySelector("#recent").textContent) && /7\/7 điểm/.test(document.querySelector("#recent").textContent));
    await p.goto(BASE + "/#/results"); await p.waitForSelector(".stats"); // UX1: ba ô số liệu ở tab Kết quả
    r.avg = (await p.textContent(".stats .stat:nth-child(2) b")).trim() === "3,75"; // (8,75 + 1) / 26 câu, tự luận không tính
    // phụ huynh (quản trị) xem báo cáo tuần của Na: tự luận ghi riêng
    await p.goto(BASE + "/#/account"); await p.click("#logout"); await p.waitForTimeout(200);
    await p.click(`.tile[data-u="${ids["Bố Minh"]}"]`); await p.fill("#pinIn", PINS["Bố Minh"]); await p.waitForTimeout(400);
    await p.goto(BASE + "/#/report/" + ids.Na); await p.waitForSelector(".report");
    r.report = await p.evaluate(() => {
      const t = (s) => (document.querySelector(s) || {}).textContent || "";
      return t("#rpCount") === "2" && /9,75\/26 câu đúng/.test(t("#rpSubjects")) && document.querySelectorAll("#rpSelf .item").length === 2
        && /6\/7 điểm/.test(t("#rpSelf")) && /7\/7 điểm/.test(t("#rpSelf")) && !/tự chấm/.test([...document.querySelectorAll(".sec")].find((x) => /Bài đã làm trong tuần/.test(x.textContent)).textContent);
    });
    await check("báo cáo tuần có tự luận"); await snapEl("#rpSelf", "bao-cao-tu-luan");
    // bộ lọc hình, chạy với trình phân tích HTML thật: không còn mã chạy, link ngoài; màu theo token
    if (scheme === "light") {
      r.svgSafe = await p.evaluate(async () => {
        const el = document.createElement("div"); document.body.append(el);
        Quiz.run(el, { title: "Thử", questions: [{ type: "mc", q: "Hình?", o: ["a", "b"], svg: '<svg viewBox="0 0 10 10" onload="window.__x=1"><script>window.__x=2</script><circle cx="5" cy="5" r="4" onmouseover="window.__x=3" fill="acc"/><image href="x" onerror="window.__x=4"/><foreignObject><img src="x" onerror="window.__x=5"/></foreignObject><a href="javascript:window.__x=6"><text x="1" y="5">A</text></a></svg>' }] }, { mode: "practice" });
        await new Promise((ok) => setTimeout(ok, 300));
        const nodes = [...el.querySelectorAll(".qfig *")], circle = el.querySelector(".qfig circle");
        const out = { x: window.__x, circle: !!circle, fill: circle && getComputedStyle(circle).fill, acc: getComputedStyle(document.documentElement).getPropertyValue("--acc").trim(),
          bad: nodes.filter((n) => [...n.attributes].some((a) => /^on|href/i.test(a.name)) || !/^(svg|circle|title)$/.test(n.tagName)).map((n) => n.tagName) };
        el.remove(); return out;
      });
      r.svgSafe = !r.svgSafe.x && r.svgSafe.circle && !r.svgSafe.bad.length && r.svgSafe.fill === "rgb(31, 60, 143)" && r.svgSafe.acc === "#1f3c8f" ? true : JSON.stringify(r.svgSafe);
    }
    await c.close();
  }
  // ghép ảnh sáng/tối cạnh nhau để xem nhanh (tests/screenshots/dang-cau/<tên>.jpg)
  {
    const gp = await browser.newPage({ viewport: { width: 752, height: 400 }, deviceScaleFactor: 2 });
    const names = [...new Set(fs.readdirSync(OUTK2).filter((f) => /-light\.png$/.test(f)).map((f) => f.replace("-light.png", "")))].sort();
    for (const n of names) {
      const img = (sc) => "data:image/png;base64," + fs.readFileSync(`${OUTK2}${n}-${sc}.png`).toString("base64");
      await gp.setContent(`<body style="margin:0;display:flex;gap:16px;padding:8px;background:#888;align-items:flex-start"><img src="${img("light")}" width="360"><img src="${img("dark")}" width="360"></body>`);
      await gp.screenshot({ path: `${OUTK2}${n}.jpg`, fullPage: true, type: "jpeg", quality: 70 });
    }
    await gp.close();
  }
  const k2OK = !k2.problems.length && ["light", "dark"].every((sc) => Object.values(k2[sc]).every((v) => v === true)) && bankImportOK;
  console.log("K2:", k2.light, k2.dark, "problems:", k2.problems, "bank import:", bankImportOK);

  step("practice buttons named by exam (L18)");
  // 1/4/2027: giữa kì I, cuối kì I, giữa kì II đã qua nên đề lớp 4 dồn vào "Bài ôn khác"; kì cuối năm chỉ gắn Đề 2, Đề 3 Toán cuối kì I;
  // thêm một đề tên tự đặt dài (nút xuống dòng, không tràn ngang ở 360px). Hàng Toán của "Bài ôn khác": mọi nút "… · Đề ngẫu nhiên"
  // (K3) đứng trước đề cố định, xếp theo tên, có đủ đề ngẫu nhiên cuối kì I và giữa kì II (đề Toán 4 thêm sau này cũng ở nhóm này).
  const lc = await newContext({ storageState: state, viewport: { width: 360, height: 740 } });
  await localConfig(lc); watchOut(lc);
  const lp = await lc.newPage(); lp.on("pageerror", (e) => errs.push("pageerror L18: " + e.message));
  await lp.clock.install({ time: new Date("2027-04-01T08:00:00") });
  await lp.goto(BASE + "/");
  await lp.evaluate(() => {
    const d = JSON.parse(localStorage.getItem("ontap_db_v1"));
    d.events.find((e) => e.id === "ck2-l4").banks = ["toan4-ck1-de2", "toan4-ck1-de3"];
    d.banks.push(Object.assign(JSON.parse(JSON.stringify(d.banks[0])), { id: "b-dai", title: "Đề ôn tập tổng hợp cuối năm của cô Lan cho cả lớp 4A", subject: "Toán", grade: 4 }));
    localStorage.setItem("ontap_db_v1", JSON.stringify(d));
  });
  await lp.reload(); await lp.click(`.tile[data-u="${ids.Bin}"]`); await lp.fill("#pinIn", PINS.Bin); await lp.waitForTimeout(400);
  await lp.goto(BASE + "/#/practice"); await lp.waitForSelector("#allPractice"); // UX1: mọi bài ôn ở tab Bài ôn
  await lp.evaluate(() => document.querySelectorAll("details.grp").forEach((d) => (d.open = true)));
  const l18 = await lp.evaluate(() => {
    const row = (g, sub) => { const r = g && [...g.querySelectorAll(".subj")].find((x) => x.querySelector("b").textContent === sub); return r ? [...r.querySelectorAll(".des a")].map((a) => a.textContent) : []; };
    const grps = [...document.querySelectorAll("#allPractice details.grp")], other = grps.find((g) => !g.dataset.grp), ck2 = grps.find((g) => g.dataset.grp === "ck2-l4");
    const btns = [...document.querySelectorAll("#allPractice .des a")];
    return { today: new Date().toLocaleDateString("vi"), toan: row(other, "Toán"), tv: row(other, "Tiếng Việt"), ck2: row(ck2, "Toán"),
      aria: btns.map((a) => a.getAttribute("aria-label")), wide: document.documentElement.scrollWidth,
      fits: btns.every((a) => { const r = a.getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth; }) };
  });
  await lp.screenshot({ path: OUT + "18-de-theo-ki.png", fullPage: true });
  await lc.close();
  console.log("L18:", l18);
  const l18rnd = l18.toan.filter((x) => / · Đề ngẫu nhiên$/.test(x)); // đề ngẫu nhiên (K3) đứng trước, xếp theo tên, ghi kì khi nhiều kì
  const labelsOK = l18.today === "1/4/2027" && ["Cuối kì I · Đề 1", "Giữa kì II · Đề 1", "Giữa kì II · Đề 2", "Đề ôn tập tổng hợp cuối năm của cô Lan cho cả lớp 4A"].every((x) => l18.toan.includes(x))
    && l18.toan.slice(0, l18rnd.length).join() === l18rnd.join() && l18rnd.join() === l18rnd.slice().sort((a, b) => a.localeCompare(b, "vi", { numeric: true })).join()
    && ["Cuối kì I · Đề ngẫu nhiên", "Giữa kì II · Đề ngẫu nhiên"].every((x) => l18rnd.includes(x))
    && !l18.toan.some((x) => /^Đề \d+$/.test(x)) && l18.tv.includes("Cuối kì I · Đề 2") && l18.tv.includes("Giữa kì II · Đề 1") && l18.ck2.join() === "Đề 2,Đề 3"
    && l18.aria.includes("Toán 4 · Giữa kì II · Đề 1") && l18.aria.includes("Toán 4 · Cuối kì I · Đề 3") && l18.wide <= 360 && l18.fits;

  step("after K3 review (9e): L22, L24, L25, L26");
  /* Ngày giả lập 21/12/2026: kì cuối kì I lớp 6 bắt đầu, giữa kì I lớp 6 đã qua; cuối kì I lớp 4 còn một tuần. Kì ck1-l4 gắn
     lại đủ đề như lịch mặc định (bước "new seed banks" đã bỏ gắn một đề).
     L22: học sinh lớp 4, hàng "Tin học và Công nghệ" của kì cuối kì I có các nút "Đề ngẫu nhiên", "Đề 1", "Đề 2" (tên đề
     trong danh mục có số đề; đề ngẫu nhiên đứng trước; Đề 2 và đề ngẫu nhiên thêm ở Phiên N3b).
     L24: học sinh lớp 6, hàng Tiếng Anh của nhóm "Bài ôn khác" (đề giữa kì I đã qua) ghi "Giữa kì I · Đề ngẫu nhiên", "Giữa kì I
     · Đề 1", "Giữa kì I · Đề 2" (đề ngẫu nhiên đứng trước; Đề 2 và đề ngẫu nhiên giữa kì I thêm ở Phiên N25b); nhóm cuối kì I
     vẫn ghi chữ ngắn "Đề ngẫu nhiên", "Đề 1", "Đề 2" (Đề 2 và đề ngẫu nhiên thêm ở Phiên N5); aria-label vẫn là tên đề đầy đủ;
     đề thử nghiệm (tên tự đặt) ghi nguyên tên.
     L25: kì cuối kì I lớp 4 (1 bài IOE, 13 đề cố định, 6 đề ngẫu nhiên; Phiên N3b thêm Đề 2 và đề ngẫu nhiên của Tiếng Anh,
     Tin học và Công nghệ; Phiên N3 thêm Đề 2 và đề ngẫu nhiên của Khoa học, Lịch sử và Địa lí) ghi "14 bài ôn" (đề ngẫu nhiên
     không tính) ở thẻ kì thi trên trang chủ, đầu nhóm bài ôn, trang Lịch thi và link "Tất cả bài ôn cho kì này" của trang "Hôm nay"
     (UX1, thay nút "Đề ôn · N đề" cũ).
     L26: tên đề ở màn mở đề toan6-ck1-ngau-nhien (h1 và dòng nhãn), nhãn trên thẻ câu hỏi, tên kì thi trên thẻ kì thi và đầu nhóm
     có khoảng trắng không ngắt (U+00A0) trước mỗi dấu "·"; aria-label của nút đề vẫn là khoảng trắng thường. */
  const nc = await newContext({ storageState: state, viewport: { width: 360, height: 740 } });
  await localConfig(nc); watchOut(nc);
  const np = await nc.newPage(); np.on("pageerror", (e) => errs.push("pageerror 9e: " + e.message));
  await np.clock.install({ time: new Date("2026-12-21T08:00:00") });
  await np.goto(BASE + "/");
  await np.evaluate(() => {
    const d = JSON.parse(localStorage.getItem("ontap_db_v1"));
    d.events.find((e) => e.id === "ck1-l4").banks = window.ONTAP_SEED_EVENTS.find((e) => e.id === "ck1-l4").banks.slice();
    localStorage.setItem("ontap_db_v1", JSON.stringify(d));
  });
  const asStudent = async (name, pin) => { // vào trang chủ "Hôm nay" của một học sinh
    await np.evaluate(() => Store.setSession(null)); await np.goto(BASE + "/"); await np.reload();
    await np.click(`.tile[data-u="${ids[name]}"]`); await np.fill("#pinIn", pin); await np.waitForSelector("#today");
  };
  const toPractice = async () => { await np.goto(BASE + "/#/practice"); await np.waitForSelector("#allPractice"); await np.evaluate(() => document.querySelectorAll("details.grp").forEach((d) => (d.open = true))); }; // tab Bài ôn (UX1), mở mọi nhóm
  // chữ trên các nút đề của một hàng môn trong một nhóm (id kì thi; "" là nhóm "Bài ôn khác")
  const rowOf = (id, sub) => np.evaluate(([id, sub]) => {
    const g = document.querySelector(id ? `#allPractice details.grp[data-grp="${id}"]` : "#allPractice details.grp:not([data-grp])");
    const r = g && [...g.querySelectorAll(".subj")].find((x) => x.querySelector("b").textContent === sub);
    return r ? [...r.querySelectorAll(".des a")].map((a) => a.textContent) : [];
  }, [id, sub]);
  const f9e = {};
  await asStudent("Bin", PINS.Bin);
  const textOf = (sel) => np.evaluate((sel) => [...document.querySelectorAll(sel)].map((x) => x.textContent.replace(/\s+/g, " ").trim()).join("|"), sel);
  // trang "Hôm nay" (UX1): thẻ kì thi tiếp theo và link "Tất cả bài ôn cho kì này · N bài ôn" (thay nút "Đề ôn · N đề" cũ)
  f9e.l4 = { today: await np.evaluate(() => new Date().toLocaleDateString("vi")), homeTags: await textOf('#nextEvent .ev[data-ev="ck1-l4"] .tag'), hero: await textOf("#toBanks") };
  await toPractice();
  Object.assign(f9e.l4, { tincn: await rowOf("ck1-l4", "Tin học và Công nghệ"), grpHead: await textOf('#allPractice details.grp[data-grp="ck1-l4"] summary .small') });
  await np.goto(BASE + "/#/calendar"); await np.waitForSelector(".timeline");
  f9e.l4.calTags = await textOf('.ev[data-ev="ck1-l4"] .tag');
  await toPractice();
  await np.screenshot({ path: OUT + "21-9e-lop4.png", fullPage: true });
  await asStudent("Na", "4444");
  const rawOf = (sel) => np.$eval(sel, (x) => x.textContent.replace(/[ \t\n]+/g, " ").trim()); // giữ U+00A0 (textOf gộp cả \s) để kiểm tra L26
  f9e.nb = { hero: await rawOf("#today h1") }; // tên bài gợi ý trên thẻ "Hôm nay" (có " · ")
  await toPractice();
  f9e.l6 = { taOther: await rowOf("", "Tiếng Anh"), taCk1: await rowOf("ck1-l6", "Tiếng Anh"), thu: await rowOf("", "Thử nghiệm"),
    aria: await np.$$eval('#allPractice details.grp:not([data-grp]) .des a', (a) => a.map((x) => x.getAttribute("aria-label"))) };
  f9e.nb.grp = await rawOf('#allPractice details.grp[data-grp="ck1-l6"] summary .small');
  await np.screenshot({ path: OUT + "21-9e-lop6.png", fullPage: true });
  await np.goto(BASE + "/#/quiz/toan6-ck1-ngau-nhien"); await np.waitForSelector("#qPractice");
  Object.assign(f9e.nb, { h1: await rawOf(".hero h1"), label: await rawOf(".hero .label") });
  await np.click("#qPractice"); f9e.nb.card = await rawOf(".qcard .label");
  await nc.close();
  console.log("9e:", JSON.stringify(f9e));
  const fix9eOK = f9e.l4.today === "21/12/2026" && f9e.l4.tincn.join() === "Đề ngẫu nhiên,Đề 1,Đề 2"
    && /\|14 bài ôn\|/.test("|" + f9e.l4.homeTags + "|") && / · 14 bài ôn$/.test(f9e.l4.grpHead) && /\|14 bài ôn\|/.test("|" + f9e.l4.calTags + "|") && f9e.l4.hero === "Tất cả bài ôn cho kì này · 14 bài ôn →"
    && f9e.l6.taOther.join() === "Giữa kì I · Đề ngẫu nhiên,Giữa kì I · Đề 1,Giữa kì I · Đề 2" && f9e.l6.taCk1.join() === "Đề ngẫu nhiên,Đề 1,Đề 2" && f9e.l6.thu.join() === "Đề thử nghiệm · Các dạng câu mới"
    && f9e.l6.aria.includes("Tiếng Anh 6 · Giữa kì I · Đề 1") && !f9e.l6.aria.some((x) => /·.*·.*·/.test(x))
    && Object.values(f9e.nb).every((s) => /·/.test(s) && !/[^\u00a0]·/.test(s)) && f9e.nb.h1 === "Toán 6\u00a0· Cuối kì I\u00a0· Đề ngẫu nhiên";

  step("random exam by matrix (K3)");
  /* Đề ngẫu nhiên (mục có pool trong data/banks/index.js): hàng Toán của kì cuối kì I lớp 6 có nút "Đề ngẫu nhiên" trước
     Đề 1, Đề 2. Kho của toan6-ck1-ngau-nhien (Phiên N4) = câu riêng của pool + hai đề cố định, câu nào cũng có mức độ, ma trận
     [Biết, Hiểu, Vận dụng], đủ các dạng câu (có câu tự luận); số liệu mong đợi (số câu của kho, nguồn câu, ma trận, điểm, số câu
     chấm tự động) tính từ dữ liệu, không ghi cứng, nên thêm câu vào kho không phải sửa bước này. Na (chưa có kết quả) làm xong
     Đề 1 (đúng hết), rồi mở đề ngẫu nhiên (mở lại đến khi bộ rút có câu tự luận; mỗi lần mở là một lần rút, không ghi gì): màn
     đầu nói rõ số câu rút từ kho bao nhiêu câu (2 đề); kho gộp từ câu riêng và hai đề, mỗi câu ghi src, đề cố định không bị sửa;
     bộ rút đúng ma trận, không ghi chú; vì đã làm Đề 1 nên bộ rút chỉ lấy câu của Đề 1 ở ô (chủ đề, mức) không đủ câu khác. Làm
     ôn luyện, trả lời theo dữ liệu mọi dạng câu: câu chấm tự động đầu tiên sai hết (0 điểm), còn lại đúng hết (câu nào cũng được
     chấm đúng như dữ liệu), câu tự luận viết bài, xem gợi ý, không tự chấm → kết quả ghi refId là mã pool, môn Toán, (t − 1)/t
     với t là số câu chấm tự động (25 trừ số câu tự luận rút được), chủ đề sai; lịch sử câu (ontap_pool_v1) ghi cả 25 câu, câu
     sai đánh dấu, câu tự luận là đã làm, không sai. "Làm đề khác": bộ mới có câu vừa sai (hay sai) và ở mỗi ô của ma trận lấy
     câu chưa làm trước câu đã làm (câu tự luận vừa làm là câu đã làm: không được rút lại khi ô của nó còn câu chưa làm), không
     giống bộ cũ. Trang chủ: "Chủ đề hay sai", kết quả gần đây; báo cáo tuần tính đề ngẫu nhiên như đề thường; tab Ngân hàng đề
     ghi "rút ngẫu nhiên". Kho thiếu câu (pool giả thêm vào danh mục lúc chạy): màn đầu ghi chú lấy bù. Câu tự luận tự chấm trong
     lịch sử câu (một pool giả khác): xem chú thích ở chỗ đó. Mỗi màn hình kiểm tra 360px, cả từng câu của lượt đầu sau khi Kiểm tra. */
  const kc = await newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2 });
  await localConfig(kc); watchOut(kc);
  const kp = await kc.newPage(); kp.on("pageerror", (e) => errs.push("pageerror K3: " + e.message)); kp.on("console", (m) => { if (m.type() === "error") errs.push("console K3: " + m.text()); });
  const k3 = { problems: [] }, POOL = "toan6-ck1-ngau-nhien", DE1 = "toan6-ck1-de1";
  const kcheck = async (label) => (await kp.evaluate(audit)).forEach((x) => k3.problems.push(`K3 · ${label}: ${x}`));
  const ksnap = async (n) => { await kp.evaluate(() => { scrollTo(0, 0); const t = document.querySelector("#toast"); if (t) t.hidden = true; }); await kp.screenshot({ path: `${OUT}19-${n}.png`, fullPage: true }); };
  /* Câu đang hiện trên màn hình → câu trong kho: so chữ câu hỏi (bỏ chỗ trống và khoảng trắng); nhiều câu cùng lời dặn thì so thêm
     các ô (lựa chọn, ý, cột nối, ô sắp xếp) như bước TA1. Chữ trên màn hình gộp khoảng trắng trước khi so: khoảng trắng giữa các
     nhóm số là khoảng trắng không ngắt (nbNum, "4 512"). */
  const flatQ = (x) => String(x).replace(/___/g, "").replace(/\s+/g, "");
  const currentOn = async (pg, qs) => {
    const s = await pg.evaluate(() => ({ t: document.querySelector(".qcard .qtext").textContent, card: document.querySelector(".qcard").textContent }));
    const cands = qs.filter((q) => flatQ(q.q) === flatQ(s.t));
    return (cands.length > 1 ? cands.find((q) => [].concat(q.o || [], q.l || [], q.r || []).every((o) => flatQ(s.card).includes(flatQ(o)))) : cands[0]) || null;
  };
  const current = (qs) => currentOn(kp, qs);
  /* Trả lời câu đang hiện theo dữ liệu, mọi dạng câu, rồi bấm Kiểm tra (tự luận: Xem gợi ý). right = true: đúng hết; false: sai hết,
     0 điểm (trắc nghiệm, đúng/sai chọn ô sai; điền, số gõ số khác; đúng/sai 4 ý chọn ngược cả 4 ý; nối cột nối lệch mọi cặp; sắp xếp
     xếp ngược). Chữ trên nút so sau khi gộp khoảng trắng. Trả về false khi không tìm thấy ô cần chạm. */
  const answerOn = async (pg, q, right, go = true) => {
    const pick = (w) => pg.$$eval(".opts .opt", (bs, w) => { const b = bs.find((x) => x.lastElementChild.textContent.replace(/\s+/g, " ") === w); if (b) b.click(); return !!b; }, String(w).replace(/\s+/g, " "));
    const v = typeof q.ans === "number" ? q.ans : String(q.ans).split("/").reduce((a, b) => a / b);
    let ok = true;
    if (q.type === "mc") ok = await pick(right ? q.o[0] : q.o[1]);
    else if (q.type === "tf") ok = await pick(q.a === right ? "Đúng" : "Sai");
    else if (q.type === "fill") await pg.fill("#qzFill", right ? q.ans[0] : "không đúng");
    else if (q.type === "num") await pg.fill("#qzNum", right ? String(q.ans) : String(v + 1 + 2 * (q.tol || 0)));
    else if (q.type === "tf4") for (let k = 0; k < 4; k++) await pg.click(`.tf4 .opt[data-i="${k}"][data-v="${q.a[k] === right ? 1 : 0}"]`);
    else if (q.type === "match") for (let k = 0; k < q.l.length; k++) { await pg.click(`.mt-li[data-i="${k}"]`); await pg.click(`.mt-ri[data-r="${right ? k : (k + 1) % q.l.length}"]`); }
    else if (q.type === "order") for (let k = 0; k < q.o.length; k++) await pg.click(`.ord-p[data-k="${right ? k : q.o.length - 1 - k}"]`);
    else if (q.type === "essay") await pg.fill("#qzEssay", "Bài làm thử.");
    if (ok && go) await pg.click("#qzGo");
    return ok;
  };
  const answer = (q, right) => answerOn(kp, q, right);
  /* Làm hết một lượt ôn luyện. wrong: câu chấm tự động đầu tiên (không lấy câu của Đề 1) trả lời sai, còn lại đúng; snap: chụp màn
     hình câu sai sau khi Kiểm tra; audit: kiểm tra 360px từng câu sau khi Kiểm tra. Ghi chỗ chấm khác dữ liệu. Trả về các câu đã gặp. */
  const playAll = async (qs, wrong, snap, audit360) => {
    const seen = [];
    let wrongQ = null;
    for (let i = 0; i < 40 && !(await kp.$(".score")); i++) {
      const q = await current(qs);
      if (!q) { k3.problems.push("K3: không nhận ra câu " + (await kp.textContent(".qcard .qtext")).slice(0, 50)); break; }
      seen.push(q);
      const bad = wrong && !wrongQ && q.type !== "essay" && q.src !== DE1;
      if (bad) wrongQ = q;
      if (!(await answer(q, !bad))) { k3.problems.push(`K3: không tìm thấy ô để trả lời câu ${q.q.slice(0, 50)}`); break; }
      if (q.type !== "essay" && !!(await kp.$("#qzFb .fb.ok")) !== !bad) k3.problems.push(`K3: câu ${q.q.slice(0, 50)} được chấm ${bad ? "đúng" : "sai"} khi trả lời ${bad ? "sai" : "đúng"} theo dữ liệu`);
      if (audit360) await kcheck(`câu ${q.type} ${q.topic}, sau khi Kiểm tra`);
      if (bad && snap) await ksnap(snap);
      await kp.click("#qzGo");
    }
    await kp.waitForSelector(".score"); return { seen, wrongQ };
  };
  await kp.goto(BASE + "/"); await kp.click(`.tile[data-u="${ids.Na}"]`); await kp.fill("#pinIn", "4444"); await kp.waitForSelector("#today");
  /* trang "Hôm nay" (UX1): link tới nhóm bài ôn của kì gần nhất (giữa kì I lớp 6). Số bài ôn mong đợi tính từ lịch mặc định: bài ôn
     dạng trang lớp 6 và đề cố định lớp 6 gắn vào gk1-l6 trong ONTAP_SEED_EVENTS (đề ngẫu nhiên không tính), nên các phiên thêm đề
     cho kì này không phải sửa dòng này. */
  k3.hero = (await kp.textContent("#toBanks")).replace(/\s+/g, " ");
  k3.heroWant = await kp.evaluate(() => {
    const e = window.ONTAP_SEED_EVENTS.find((x) => x.id === "gk1-l6"), mods = e.modules.filter((id) => (window.ONTAP_MODULES.find((m) => m.id === id) || {}).grade === 6);
    const bks = e.banks.filter((id) => { const b = window.ONTAP_SEED_BANKS.find((x) => x.id === id); return b && b.grade === 6 && !b.pool; });
    return `Tất cả bài ôn cho kì này · ${mods.length + bks.length} bài ôn →`;
  });
  await kp.goto(BASE + "/#/practice"); await kp.waitForSelector("#allPractice");
  k3.row = await kp.evaluate((id) => {
    const g = document.querySelector('#allPractice details.grp[data-grp="ck1-l6"]'), row = [...g.querySelectorAll(".subj")].find((x) => x.querySelector("b").textContent === "Toán"), a = [...row.querySelectorAll(".des a")];
    return { labels: a.map((x) => x.textContent).join(), first: a[0].getAttribute("href") === "#/quiz/" + id && a[0].classList.contains("rnd"), aria: a[0].getAttribute("aria-label"), info: row.querySelector(".small").textContent };
  }, POOL);
  await kcheck("tab Bài ôn có nút Đề ngẫu nhiên");
  // Đề 1: làm đúng hết (có câu trả lời bằng số)
  await kp.goto(BASE + "/#/quiz/" + DE1); await kp.waitForSelector("#qPractice");
  const QS = await kp.evaluate((id) => Store.bank(id).questions, DE1);
  await kp.click("#qPractice"); await playAll(QS, false);
  k3.de1 = await kp.evaluate((id) => { const r = Store.resultsFor(Store.sessionUser().id); return r.length === 1 && r[0].refId === id && r[0].r === 25 && r[0].t === 25; }, DE1);
  // đề ngẫu nhiên: màn đầu, kho câu, ma trận (số mong đợi tính từ danh mục và file câu hỏi)
  await kp.goto(BASE + "/#/quiz/" + POOL); await kp.waitForSelector("#qPractice");
  // lượt 1 cần có câu tự luận (câu tự luận đã làm không được rút lại ở lượt 2): mở lại đề đến khi màn đầu ghi số câu tự luận
  const essayDrawn = async () => /\(\d+ câu tự luận tự chấm\)/.test(await kp.textContent(".hero"));
  for (let i = 0; i < 30 && !(await essayDrawn()); i++) { await kp.goto(BASE + "/#/home"); await kp.waitForSelector("#today"); await kp.goto(BASE + "/#/quiz/" + POOL); await kp.waitForSelector("#qPractice"); }
  k3.intro = (await kp.textContent(".hero")).replace(/\s+/g, " ");
  k3.noNotes = !(await kp.$("#qNotes"));
  await kcheck("đề ngẫu nhiên, màn đầu"); await ksnap("de-ngau-nhien");
  k3.kho = await kp.evaluate(({ POOL, DE1 }) => {
    const b = Store.bank(POOL), d = Quiz.draw(b), cnt = {}, own = (window.ONTAP_SEED_QUESTIONS[POOL] || { questions: [] }).questions.length;
    d.questions.forEach((q) => ((cnt[q.topic] = cnt[q.topic] || [0, 0, 0])[q.lv - 1]++));
    const keys = d.questions.map(Quiz.key), m = b.pool.matrix;
    return { n: d.questions.length, want: b.n, kho: b.questions.length, khoWant: own + b.pool.from.reduce((a, id) => a + Store.bank(id).questions.length, 0), own, from: b.pool.from.length,
      srcs: [...new Set(b.questions.map((q) => q.src))].join() === [POOL].concat(b.pool.from).join(), matrix: Object.keys(m).every((t) => JSON.stringify(cnt[t] || [0, 0, 0]) === JSON.stringify(m[t])) && Object.keys(cnt).every((t) => t in m),
      uniq: new Set(keys).size === keys.length, notes: d.notes.length, fixedN: Store.bank(DE1).questions.length, fixedClean: !("src" in Store.bank(DE1).questions[0]), label: document.querySelector(".hero .label").textContent.replace(/\s+/g, " ") };
  }, { POOL, DE1 });
  const PQ = await kp.evaluate((id) => Store.bank(id).questions, POOL), MATRIX = await kp.evaluate((id) => Store.bank(id).pool.matrix, POOL);
  const cellOf = (q) => q.topic + "|" + q.lv, CELLS = Object.entries(MATRIX).flatMap(([t, v]) => v.map((n, i) => [t + "|" + (i + 1), n]).filter(([, n]) => n > 0));
  const inCell = (c, list) => list.filter((q) => cellOf(q) === c);
  // lượt 1: câu chấm tự động đầu tiên sai, còn lại đúng; câu tự luận xem gợi ý, không tự chấm
  await kp.click("#qPractice");
  const { seen: run1, wrongQ } = await playAll(PQ, true, "de-ngau-nhien-cau-sai", true);
  const auto1 = run1.filter((q) => q.type !== "essay"), t1 = auto1.length, e1 = run1.length - t1, d10 = (r, t) => String(Math.round((r / t) * 40) / 4).replace(".", ",");
  k3.run1 = { n: run1.length, essays: e1, de1: run1.filter((q) => q.src === DE1).length, score: (await kp.textContent(".score")).trim(), again: (await kp.textContent("#qzAgain")).trim(),
    de1Want: CELLS.reduce((a, [c, n]) => a + Math.max(0, n - inCell(c, PQ).filter((q) => q.src !== DE1).length), 0), wrong: !!wrongQ };
  await kcheck("kết quả đề ngẫu nhiên");
  const ess1 = run1.filter((q) => q.type === "essay");
  k3.saved = !wrongQ ? {} : await kp.evaluate(({ POOL, key, ess1 }) => {
    const u = Store.sessionUser(), r = Store.resultsFor(u.id)[0], h = JSON.parse(localStorage.getItem("ontap_pool_v1"))[u.id + "|" + POOL] || {};
    return { refId: r.refId, subject: r.subject, label: r.label, r: r.r, t: r.t, wrong: (r.wrongTopics || []).length, histN: Object.keys(h).length, histWrong: JSON.stringify(h[key]), histRight: Object.values(h).filter((x) => x[0] === 1 && x[1] === 0).length,
      histEssays: ess1.map((q) => JSON.stringify(h[Quiz.key(q)])).join(" ") };
  }, { POOL, key: await kp.evaluate((q) => Quiz.key(q), wrongQ), ess1 });
  // lượt 2 ("Làm đề khác"): bộ mới, bỏ qua từng câu để xem đủ 25 câu
  await kp.click("#qzAgain"); await kp.waitForSelector(".qcard");
  const run2 = [];
  for (let i = 0; i < 25; i++) { const q = await current(PQ); if (!q) break; run2.push(q); if (i < 24) { await kp.click("#qzSkip"); } }
  /* Ở mỗi ô (chủ đề, mức) của ma trận, bộ rút lấy câu theo thứ tự: câu vừa sai; câu chưa làm (không có ở lượt 1, không phải câu của
     Đề 1); rồi mới tới câu đã làm (lượt 1, kể cả câu tự luận đã xem gợi ý; Đề 1). Ô nào cũng chỉ lấy câu đã làm khi hết câu chưa làm.
     Riêng câu tự luận của lượt 1: ô của câu đó còn đủ câu vừa sai và câu chưa làm cho số câu ô rút (roomy) thì không được rút lại. */
  const undone = (q) => q !== wrongQ && q.src !== DE1 && !run1.includes(q);
  const roomy = (q) => inCell(cellOf(q), PQ).filter((x) => x === wrongQ || undone(x)).length >= CELLS.find(([c]) => c === cellOf(q))[1];
  k3.run2 = { n: run2.length, hasWrong: run2.includes(wrongQ), differs: run2.some((q) => !run1.includes(q)), fresh: run2.filter(undone).length,
    cellsOK: CELLS.every(([c, n]) => inCell(c, run2).length === n && inCell(c, run2).filter((q) => q !== wrongQ && !undone(q)).length === Math.max(0, n - inCell(c, wrongQ ? [wrongQ] : []).length - inCell(c, PQ).filter(undone).length)),
    essays: { n: ess1.length, roomy: ess1.filter(roomy).length, again: ess1.filter((q) => roomy(q) && run2.includes(q)).length } };
  await kp.click("#qzExit"); k3.exitAsk = (await kp.textContent("#qzFb")).replace(/\s+/g, " "); // bỏ qua hết: chưa trả lời câu nào
  await kp.click("#qzYes"); await kp.waitForTimeout(300);
  k3.home = await kp.evaluate(() => ({ hash: location.hash, recent: document.querySelector("#recent").textContent.replace(/\s+/g, " "), n: Store.resultsFor(Store.sessionUser().id).length }));
  await kp.goto(BASE + "/#/results"); await kp.waitForSelector("#allResults"); // chủ đề hay sai ở tab Kết quả (UX1)
  k3.home.weak = await kp.evaluate(() => [...document.querySelectorAll("#weakTopics .tag.warn")].map((t) => t.textContent).join("|"));
  /* kho thiếu câu: pool giả rút số câu mức Vận dụng của chủ đề "Hình phẳng" nhiều hơn số câu chủ đề đó có trong kho (kho chỉ có câu
     mức Biết của chủ đề này) → màn đầu ghi chú lấy bù mức khác, rồi lấy từ chủ đề khác */
  const HP = PQ.filter((q) => q.topic === "Hình phẳng"), LVN = ["", "Biết", "Hiểu", "Vận dụng"];
  const hpLv = [...new Set(HP.map((q) => q.lv).sort((a, b) => Math.abs(3 - a) - Math.abs(3 - b)))].map((l) => "mức " + LVN[l]).join(", ");
  k3.shortWant = { notes: `Kho còn thiếu câu, lần này: Hình phẳng: thiếu ${HP.length} câu mức Vận dụng, lấy bù ${hpLv}; Hình phẳng: thiếu 1 câu, lấy từ chủ đề khác.`, n: `Câu 1/${HP.length + 1}`, noV: HP.length > 0 && !HP.some((q) => q.lv === 3) };
  k3.short = await kp.evaluate(([POOL, k]) => {
    const b = Store.bank(POOL);
    window.ONTAP_SEED_BANKS.push({ id: "thu-pool", title: "Toán 6 · Thử · Đề ngẫu nhiên", grade: 6, subject: "Toán", minutes: 10, n: k, file: "6-toan.js", pool: { matrix: { "Hình phẳng": [0, 0, k] } }, note: "", questions: b.questions });
    return true;
  }, [POOL, HP.length + 1]);
  await kp.goto(BASE + "/#/quiz/thu-pool"); await kp.waitForSelector("#qPractice");
  k3.notes = (await kp.textContent("#qNotes").catch(() => "")).replace(/\s+/g, " ");
  await kcheck("đề ngẫu nhiên, kho thiếu câu"); await ksnap("de-ngau-nhien-thieu-cau");
  await kp.click("#qPractice"); k3.shortN = await kp.$eval("#qzProg", (c) => c.textContent);
  await kp.evaluate(() => window.ONTAP_SEED_BANKS.pop());
  /* Câu tự luận tự chấm trong lịch sử câu: pool giả (thêm vào danh mục lúc chạy) gồm hai câu tự luận của kho, chép sang một chủ đề
     riêng. Ôn luyện, mỗi lần rút 1 câu (bộ rút chỉ chọn giữa hai câu): câu rút được (A) xem gợi ý, tự chấm đủ điểm → lịch sử [1, 0]
     (đã làm, không sai); "Làm đề khác" rút câu kia (B, chưa làm), không rút lại A. B tự chấm 0 điểm (dưới một nửa) → [1, 1] (sai);
     "Làm đề khác" rút lại B. Làm như thi, rút cả hai câu: trả lời B, bỏ qua A, nộp → B ghi một lần làm ngay lúc nộp, chưa tự chấm nên
     không sai ([2, 1]), A bỏ qua chưa ghi gì; tự chấm A đủ điểm (có thể đã làm ra giấy), B 0 điểm, bấm "Lưu điểm tự chấm" → A thêm
     một lần làm ([2, 0]), B chỉ thêm lần sai ([2, 2]). Lượt nào cũng chỉ có câu tự luận (không có phần chấm tự động để lưu); điểm tự
     chấm vẫn lưu như cũ (phần tư điểm). */
  const ES = PQ.filter((q) => q.type === "essay").slice(0, 2).map(({ src, ...q }) => Object.assign(q, { topic: "Thử tự luận", lv: 3 }));
  const fakeE = (k) => kp.evaluate(([qs, k]) => { const all = window.ONTAP_SEED_BANKS, i = all.findIndex((b) => b.id === "thu-tu-luan"); if (i >= 0) all.splice(i, 1); if (k) all.push({ id: "thu-tu-luan", title: "Toán 6 · Thử tự luận · Đề ngẫu nhiên", grade: 6, subject: "Toán", minutes: 10, n: k, file: "6-toan.js", pool: { matrix: { "Thử tự luận": [0, 0, k] } }, note: "", questions: qs }); }, [ES, k]);
  const eHist = (list) => kp.evaluate((list) => { const h = JSON.parse(localStorage.getItem("ontap_pool_v1") || "{}")[Store.sessionUser().id + "|thu-tu-luan"] || {}; return list.map((q) => JSON.stringify(h[Quiz.key(q)] || null)).join(" "); }, list);
  // tự chấm: đủ điểm (full) chọn mức cuối của mỗi ý, 0 điểm chọn "Chưa có"; ở màn kết quả khi làm như thi chọn theo từng câu (chữ câu hỏi)
  const selfMark = (full) => kp.$$eval("#qzFb .rubric .rb-b", (rows, full) => rows.forEach((r) => (full ? r.lastElementChild : r.firstElementChild).click()), full);
  const selfMarkEach = (fullQ) => kp.evaluate((fullQ) => document.querySelectorAll("#qzSelf .self-q").forEach((box) => {
    const full = box.querySelector("b").textContent.replace(/\s+/g, "") === fullQ;
    box.querySelectorAll(".rubric .rb-b").forEach((r) => (full ? r.lastElementChild : r.firstElementChild).click());
  }), fullQ.replace(/\s+/g, ""));
  const practiceOne = async (full) => { await kp.fill("#qzEssay", "Bài làm thử."); await kp.click("#qzGo"); await selfMark(full); await kp.click("#qzGo"); await kp.waitForSelector("#qzSelf"); };
  k3.essay = {};
  await fakeE(1); await kp.goto(BASE + "/#/quiz/thu-tu-luan"); await kp.click("#qPractice");
  const eA = await current(ES), eB = ES.find((q) => q !== eA), eMax = (q) => q.rubric.reduce((a, c) => a + c.p, 0) * 4;
  await practiceOne(true); k3.essay.a = await eHist([eA, eB]);
  await kp.click("#qzAgain"); await kp.waitForSelector("#qzEssay"); k3.essay.next = (await current(ES)) === eB;
  await practiceOne(false); k3.essay.b = await eHist([eA, eB]);
  await kp.click("#qzAgain"); await kp.waitForSelector("#qzEssay"); k3.essay.again = (await current(ES)) === eB;
  await kp.click("#qzExit"); await kp.click("#qzYes"); await kp.waitForSelector("#today");
  await fakeE(2); await kp.goto(BASE + "/#/quiz/thu-tu-luan"); await kp.click("#qExam");
  for (let i = 0; i < 2; i++) { if ((await current(ES)) === eB) { await kp.fill("#qzEssay", "Bài làm thử."); await kp.click("#qzGo"); } else await kp.click("#qzSkip"); }
  await endRecap(kp); await kp.waitForSelector("#qzSelfSave"); k3.essay.submit = await eHist([eA, eB]);
  await selfMarkEach(eA.q); await kp.click("#qzSelfSave"); await kp.waitForSelector("#qzSelfArea .fb.ok"); k3.essay.late = await eHist([eA, eB]);
  k3.essay.saved = await kp.evaluate(() => Store.resultsFor(Store.sessionUser().id).filter((r) => r.refId === "thu-tu-luan").map((r) => `${r.mode}:${r.r}/${r.t}`).sort().join(" "));
  k3.essayWant = [`self:${eMax(eA)}/${eMax(eA)}`, `self:0/${eMax(eB)}`, `self:${eMax(eA)}/${eMax(eA) + eMax(eB)}`].sort().join(" ");
  await fakeE(0);
  // phụ huynh (quản trị): báo cáo tuần của Na, tab Ngân hàng đề
  await kp.goto(BASE + "/#/account"); await kp.click("#switchWho, #logout"); await kp.waitForTimeout(200);
  await kp.click(`.tile[data-u="${ids["Bố Minh"]}"]`); await kp.fill("#pinIn", PINS["Bố Minh"]); await kp.waitForTimeout(400);
  await kp.goto(BASE + "/#/report/" + ids.Na); await kp.waitForSelector(".report");
  k3.report = await kp.evaluate(() => ({ n: document.querySelector("#rpCount").textContent, subj: [...document.querySelectorAll("#rpSubjects .rp-sub")].map((x) => [...x.querySelectorAll(".row > b")].map((b) => b.textContent).join(" ") + " " + x.lastElementChild.textContent).join("|"),
    topics: document.querySelectorAll("#rpTopics .item").length, week: [...document.querySelectorAll(".sec")].find((x) => /Bài đã làm trong tuần/.test(x.textContent)).textContent.replace(/\s+/g, " ") }));
  await kcheck("báo cáo tuần có đề ngẫu nhiên");
  await kp.goto(BASE + "/#/admin/banks"); await kp.waitForTimeout(200);
  k3.adminRow = await kp.$eval(`a[href="#/quiz/${POOL}"] .small`, (x) => x.textContent); // tab Ngân hàng đề (UX7, X12): đề có sẵn theo tab khối, nhóm theo môn; dòng đề ghi số câu, số phút
  await kcheck("ngân hàng đề có đề ngẫu nhiên");
  await kc.close();
  console.log("K3:", k3);
  const k3Intro = new RegExp(`Mỗi lần làm là một đề khác: ${k3.kho.want} câu rút từ kho ${k3.kho.khoWant} câu \\(${k3.kho.from} đề\\) theo ma trận đề, ưu tiên câu bạn chưa làm hoặc hay sai${e1 ? ` \\(${e1} câu tự luận tự chấm\\)` : ""}\\.`);
  const k3OK = !k3.problems.length && k3.row.labels === "Đề ngẫu nhiên,Đề 1,Đề 2" && k3.row.first && k3.row.aria === "Toán 6 · Cuối kì I · Đề ngẫu nhiên" && k3.row.info === "2 đề · 25 câu mỗi đề · đề ngẫu nhiên 25 câu" && k3.hero === k3.heroWant
    && k3.de1 && k3Intro.test(k3.intro) && k3.noNotes
    && k3.kho.n === k3.kho.want && k3.kho.kho === k3.kho.khoWant && k3.kho.own > 0 && k3.kho.srcs && k3.kho.matrix && k3.kho.uniq && k3.kho.notes === 0 && k3.kho.fixedN === 25 && k3.kho.fixedClean && k3.kho.label === "Lớp 6 · Toán · Đề ngẫu nhiên"
    && k3.run1.n === k3.kho.want && k3.run1.wrong && k3.run1.essays > 0 && k3.run1.de1 === k3.run1.de1Want && k3.run1.score === d10(t1 - 1, t1) + "/10" && k3.run1.again === "Làm đề khác"
    && k3.saved.refId === POOL && k3.saved.subject === "Toán" && k3.saved.label === "Toán 6 · Cuối kì I · Đề ngẫu nhiên" && k3.saved.r === t1 - 1 && k3.saved.t === t1 && k3.saved.wrong === 1
    && k3.saved.histN === k3.run1.n && k3.saved.histWrong === "[1,1]" && k3.saved.histRight === k3.run1.n - 1 && k3.saved.histEssays === ess1.map(() => "[1,0]").join(" ")
    && k3.run2.n === k3.kho.want && k3.run2.hasWrong && k3.run2.cellsOK && k3.run2.differs && /Thoát đề\?/.test(k3.exitAsk)
    && k3.run2.essays.roomy > 0 && k3.run2.essays.again === 0
    && k3.essay.a === "[1,0] null" && k3.essay.next && k3.essay.b === "[1,0] [1,1]" && k3.essay.again
    && k3.essay.submit === "[1,0] [2,1]" && k3.essay.late === "[2,0] [2,2]" && k3.essay.saved === k3.essayWant
    && k3.home.hash === "#/home" && k3.home.weak === wrongQ.topic + " · 1 câu" && /Toán 6 · Cuối kì I · Đề ngẫu nhiên/.test(k3.home.recent) && k3.home.recent.includes(`${t1 - 1}/${t1}`) && k3.home.n === 2
    && k3.short && k3.shortWant.noV && k3.notes === k3.shortWant.notes && k3.shortN === k3.shortWant.n
    && k3.report.n === "2" && k3.report.subj === `Toán ${d10(25 + t1 - 1, 25 + t1)}/10 2 bài · ${25 + t1 - 1}/${25 + t1} câu đúng` && k3.report.topics === 1 && /Đề ngẫu nhiên/.test(k3.report.week)
    && k3.adminRow === "25 câu rút ngẫu nhiên · 45 phút · xem thử";
  step("random exams keep passages whole (K4)");
  /* Đề ngẫu nhiên có đoạn đọc (Phiên K4): câu dùng chung một đoạn đọc được rút theo đoạn (Quiz.draw, CLAUDE.md mục “Đề ngẫu nhiên”). Bốn đề
     ngẫu nhiên đang có đoạn đọc: Tiếng Việt 4, Tiếng Anh 4 (Bin), Ngữ văn 6, Tiếng Anh 6 cuối kì I (Na). Với mỗi đề: (1) rút 60 lần ngay
     trong trang (xen kẽ không lịch sử và lịch sử ngẫu nhiên): lần nào cũng đủ n câu không trùng, đúng số câu từng chủ đề, mức lệch ma trận
     không quá 1 câu, không ghi chú, mỗi chủ đề không quá ⌈k/3⌉ đoạn, nhiều nhất một đoạn lấy một phần, câu cùng đoạn liền nhau; rút lần 2
     sau khi đánh dấu cả bộ lần 1 đã làm thì chủ đề có đoạn không lấy lại câu nào của lần 1 và không lấy lại đoạn nào (trừ Ngữ văn 6: mỗi chủ
     đề chỉ có một đoạn); (2) mở ôn luyện, bỏ qua từng câu để xem đủ n câu trên màn làm bài: tiến độ "Câu 1/n" (đề Tiếng Anh "1 of n"), đúng
     số câu từng chủ đề (dòng nhãn "môn · chủ đề"), các câu cùng đoạn đứng liền nhau và hộp đoạn đọc ghi đúng "Dùng chung cho N câu", không
     quá ⌈k/3⌉ đoạn mỗi chủ đề; màn đầu không ghi chú. Tiếng Việt 4 (Bin) còn làm hết một lượt đúng theo dữ liệu (câu Viết xem gợi ý,
     24/24 câu chấm tự động → 10/10) rồi "Làm đề khác": bộ mới không có đoạn nào của lượt đầu (kho còn đoạn chưa làm) và câu Viết khác. Mỗi
     màn hình kiểm tra 360px; ảnh một câu đọc hiểu sau khi Kiểm tra ở tests/screenshots/19-k4-doan-doc.png. */
  const K4_POOLS = [["tv4-ck1-ngau-nhien", "Bin", PINS.Bin], ["ta4-ck1-ngau-nhien", "Bin", PINS.Bin], ["van6-ck1-ngau-nhien", "Na", "4444"], ["ta6-ck1-ngau-nhien", "Na", "4444"]];
  const k4 = { problems: [], pools: {} };
  const k4c = await newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2 });
  await localConfig(k4c); watchOut(k4c);
  const k4p = await k4c.newPage(); k4p.on("pageerror", (e) => errs.push("pageerror K4: " + e.message)); k4p.on("console", (m) => { if (m.type() === "error") errs.push("console K4: " + m.text()); });
  const k4check = async (label) => (await k4p.evaluate(audit)).forEach((x) => k4.problems.push(`K4 · ${label}: ${x}`));
  // câu đang hiện: dòng nhãn "môn · chủ đề[ · cách làm]", mã đoạn đọc và dòng "Dùng chung cho N câu" của hộp đoạn đọc, tiến độ, chữ câu hỏi
  const k4now = () => k4p.evaluate(() => { const ps = document.querySelector(".psg"); return { label: document.querySelector(".qcard .label").textContent.replace(/\s+/g, " "), p: ps ? ps.dataset.p : "", psgN: ps ? ps.querySelector("summary .small").textContent : "", prog: document.querySelector("#qzProg").textContent, text: document.querySelector(".qcard .qtext").textContent }; });
  // chủ đề của câu: chữ sau "môn · " khớp một chủ đề của ma trận (chủ đề có thể chứa " · ", sau chủ đề có thể còn " · cách làm")
  const k4topic = (label, m) => { const i = label.indexOf(" · "), rest = i < 0 ? label : label.slice(i + 3); return Object.keys(m).find((t) => rest === t || rest.startsWith(t + " · ")) || rest; };
  // xem hết n câu của lượt đang làm bằng "Bỏ qua" (không trả lời câu nào); mỗi câu ghi chủ đề theo ma trận m
  const k4walk = async (n, m) => { const seen = []; for (let i = 0; i < n; i++) { const x = await k4now(); x.topic = k4topic(x.label, m); seen.push(x); if (i < n - 1) await k4p.click("#qzSkip"); } return seen; };
  const k4login = async (who, pin) => { await k4p.goto(BASE + "/#/account"); await k4p.waitForTimeout(200); if (await k4p.$("#switchWho, #logout")) { await k4p.click("#switchWho, #logout"); await k4p.waitForTimeout(200); } await k4p.goto(BASE + "/"); await k4p.click(`.tile[data-u="${ids[who]}"]`); await k4p.fill("#pinIn", pin); await k4p.waitForTimeout(400); };
  const kOf = (m, t) => (Array.isArray(m[t]) ? m[t].reduce((a, x) => a + x, 0) : m[t]);
  const topicsOK = (list, m) => Object.keys(m).every((t) => list.filter((x) => x.topic === t).length === kOf(m, t)) && list.every((x) => x.topic in m);
  // câu cùng đoạn liền nhau, hộp ghi đúng số câu; mỗi chủ đề không quá ⌈k/3⌉ đoạn
  const psgOK = (list, m) => {
    const pids = [...new Set(list.map((x) => x.p).filter(Boolean))];
    const contiguous = pids.every((p) => { const at = list.map((x, k) => (x.p === p ? k : -1)).filter((k) => k >= 0); return at[at.length - 1] - at[0] === at.length - 1 && list.filter((x) => x.p === p).every((x) => [`Dùng chung cho ${at.length} câu`, `For ${at.length} question${at.length === 1 ? "" : "s"}`].includes(x.psgN)); });
    return contiguous && Object.keys(m).every((t) => new Set(list.filter((x) => x.topic === t && x.p).map((x) => x.p)).size <= Math.ceil(kOf(m, t) / 3));
  };
  for (const [id, who, pin] of K4_POOLS) {
    await k4login(who, pin);
    await k4p.goto(BASE + "/#/quiz/" + id); await k4p.waitForSelector("#qPractice");
    const r = { notes: !!(await k4p.$("#qNotes")) };
    // (1) rút nhiều lần ngay trong trang
    r.draws = await k4p.evaluate((id) => {
      const b = Store.bank(id), m = b.pool.matrix, ps = b.passages || {}, bad = [], kOf = (t) => (Array.isArray(m[t]) ? m[t].reduce((a, x) => a + x, 0) : m[t]);
      const chk = (d, label) => {
        const keys = d.questions.map(Quiz.key), cnt = {};
        if (d.questions.length !== b.n) bad.push(`${label}: ${d.questions.length} câu`);
        if (new Set(keys).size !== keys.length) bad.push(`${label}: câu trùng`);
        if (d.notes.length) bad.push(`${label}: ghi chú ${d.notes.join("; ")}`);
        d.questions.forEach((q) => (cnt[q.topic] = (cnt[q.topic] || 0) + 1));
        Object.keys(cnt).forEach((t) => { if (!(t in m)) bad.push(`${label}: chủ đề lạ ${t}`); });
        Object.keys(m).forEach((t) => {
          if ((cnt[t] || 0) !== kOf(t)) bad.push(`${label}: ${t} ${cnt[t] || 0}/${kOf(t)} câu`);
          if (Array.isArray(m[t])) [1, 2, 3].forEach((lv) => { const n = d.questions.filter((q) => q.topic === t && q.lv === lv).length; if (Math.abs(n - m[t][lv - 1]) > 1) bad.push(`${label}: ${t} mức ${lv} ${n}/${m[t][lv - 1]}`); });
          const inT = d.questions.filter((q) => q.topic === t), pids = [...new Set(inT.filter((q) => q.p && ps[q.p]).map((q) => q.p))];
          if (pids.length > Math.ceil(kOf(t) / 3)) bad.push(`${label}: ${t} lấy ${pids.length} đoạn`);
          if (pids.filter((p) => inT.filter((q) => q.p === p).length < b.questions.filter((q) => q.p === p && q.topic === t).length).length > 1) bad.push(`${label}: ${t} lấy một phần ở hơn một đoạn`);
          pids.forEach((p) => { const at = inT.map((q, k) => (q.p === p ? k : -1)).filter((k) => k >= 0); if (at[at.length - 1] - at[0] !== at.length - 1) bad.push(`${label}: đoạn ${p} không liền nhau`); });
        });
      };
      for (let i = 0; i < 60; i++) chk(Quiz.draw(b, i % 2 ? () => ({ done: Math.floor(Math.random() * 3), wrong: Math.random() < 0.2 ? 1 : 0 }) : null), "lần " + (i + 1));
      // lần 2 sau khi làm hết bộ lần 1: chủ đề có đoạn không lấy lại câu đã làm; chủ đề có từ 2 đoạn trở lên không lấy lại đoạn đã rút cho
      // chủ đề đó ở lần 1 (Ngữ văn 6: mỗi bài đọc chỉ có một đoạn, lần 2 lấy câu lẻ và câu còn lại của đoạn; câu Viết sang đoạn khác hoặc câu lẻ)
      const d1 = Quiz.draw(b), done = new Set(d1.questions.map(Quiz.key)), d2 = Quiz.draw(b, (q) => ({ done: done.has(Quiz.key(q)) ? 1 : 0, wrong: 0 }));
      const pt = new Set(b.questions.filter((q) => q.p && ps[q.p]).map((q) => q.topic)), p1 = new Set(d1.questions.filter((q) => q.p && ps[q.p]).map((q) => q.topic + "|" + q.p));
      const multi = new Set([...pt].filter((t) => new Set(b.questions.filter((q) => q.topic === t && q.p && ps[q.p]).map((q) => q.p)).size >= 2));
      return { bad: bad.slice(0, 8), nBad: bad.length, reuseQ: d2.questions.filter((q) => pt.has(q.topic) && done.has(Quiz.key(q))).length, reuseP: d2.questions.filter((q) => q.p && ps[q.p] && multi.has(q.topic) && p1.has(q.topic + "|" + q.p)).length, n: b.n, matrix: m, nPsg: Object.keys(ps).length };
    }, id);
    // (2) trên màn làm bài: bỏ qua từng câu
    await k4check(id + " màn đầu");
    await k4p.click("#qPractice"); await k4p.waitForSelector(".qcard");
    const seen = await k4walk(r.draws.n, r.draws.matrix);
    r.walk = { n: seen.length, prog: seen[0].prog, topics: topicsOK(seen, r.draws.matrix), psg: psgOK(seen, r.draws.matrix), nPsg: new Set(seen.map((x) => x.p).filter(Boolean)).size };
    await k4check(id + " câu cuối");
    await k4p.click("#qzExit"); await k4p.click("#qzYes"); await k4p.waitForSelector("#today");
    k4.pools[id] = r;
  }
  // Tiếng Việt 4: làm hết một lượt đúng theo dữ liệu, rồi "Làm đề khác" ra đoạn khác, câu Viết khác
  const TV_ID = "tv4-ck1-ngau-nhien", TV_M = k4.pools[TV_ID].draws.matrix, tv = { run1: [] };
  await k4login("Bin", PINS.Bin);
  await k4p.goto(BASE + "/#/quiz/" + TV_ID); await k4p.waitForSelector("#qPractice");
  const TVQ = await k4p.evaluate((id) => Store.bank(id).questions, TV_ID);
  await k4p.click("#qPractice"); await k4p.waitForSelector(".qcard");
  let k4shot = false;
  for (let i = 0; i < 40 && !(await k4p.$(".score")); i++) {
    const q = await currentOn(k4p, TVQ);
    if (!q) { k4.problems.push("K4: không nhận ra câu " + (await k4p.textContent(".qcard .qtext")).slice(0, 50)); break; }
    tv.run1.push(q);
    if (!(await answerOn(k4p, q, true))) { k4.problems.push(`K4: không tìm thấy ô để trả lời câu ${q.q.slice(0, 50)}`); break; }
    if (q.type !== "essay" && !(await k4p.$("#qzFb .fb.ok"))) k4.problems.push(`K4: câu ${q.q.slice(0, 50)} bị chấm sai khi trả lời đúng theo dữ liệu`);
    if (q.p && !k4shot) { k4shot = true; await k4check("Tiếng Việt 4, câu đọc hiểu sau khi Kiểm tra"); await k4p.evaluate(() => scrollTo(0, 0)); await k4p.screenshot({ path: `${OUT}19-k4-doan-doc.png`, fullPage: true }); }
    await k4p.click("#qzGo");
  }
  await k4p.waitForSelector(".score");
  tv.score = (await k4p.textContent(".score")).trim(); tv.again = (await k4p.textContent("#qzAgain")).trim();
  await k4check("Tiếng Việt 4, kết quả");
  await k4p.click("#qzAgain"); await k4p.waitForSelector(".qcard");
  const tvRun2 = await k4walk(25, TV_M), tvP1 = new Set(tv.run1.filter((q) => q.p).map((q) => q.p)), essay2 = tvRun2.find((x) => x.topic === "Viết");
  tv.run2 = { n: tvRun2.length, samePsg: tvRun2.filter((x) => x.p && tvP1.has(x.p)).length, nPsg: new Set(tvRun2.map((x) => x.p).filter(Boolean)).size, psg: psgOK(tvRun2, TV_M), topics: topicsOK(tvRun2, TV_M),
    newEssay: !!essay2 && !tv.run1.some((q) => q.type === "essay" && flatQ(q.q) === flatQ(essay2.text)) };
  await k4p.click("#qzExit"); await k4p.click("#qzYes"); await k4p.waitForSelector("#today");
  await k4c.close();
  console.log("K4:", JSON.stringify(Object.fromEntries(Object.entries(k4.pools).map(([id, r]) => [id, { notes: r.notes, draws: Object.assign({}, r.draws, { matrix: undefined }), walk: r.walk }]))), "tv4:", tv.run1.length, tv.score, tv.again, JSON.stringify(tv.run2), "problems:", k4.problems);
  const k4OK = !k4.problems.length && K4_POOLS.every(([id]) => { const r = k4.pools[id]; return r && !r.notes && r.draws.nPsg > 0 && r.draws.nBad === 0 && r.draws.reuseQ === 0 && r.draws.reuseP === 0 && r.walk.n === r.draws.n && r.walk.nPsg > 0 && r.walk.topics && r.walk.psg && r.walk.prog === (id.startsWith("ta") ? `1 of ${r.draws.n}` : `Câu 1/${r.draws.n}`); })
    && tv.run1.length === 25 && tv.score === "10/10" && tv.again === "Làm đề khác" && tv.run2.n === 25 && tv.run2.samePsg === 0 && tv.run2.nPsg >= 2 && tv.run2.psg && tv.run2.topics && tv.run2.newEssay;

  step("report wrong question (R1)");
  /* Nút "Báo câu này sai" (js/quiz.js, opts.onReport). Bin ôn luyện Toán 4 Đề 1: làm như thi không có link trong lúc làm; ôn luyện
     thì sau khi Kiểm tra, dưới lời giải có link nhỏ (≥ 44px) có lá cờ; bấm mở hộp lí do ngay bên dưới (không phải hộp nổi), chưa chọn
     lí do thì báo, "Thôi" đóng hộp; gửi xong hiện cảm ơn, link thành "Đã báo câu này". Báo cáo lưu trong Store (userId, mã đề, mã
     câu = Quiz.key, bản chụp nội dung câu ≤ 500 kí tự, lí do, ghi chú cắt 200). Màn kết quả: mỗi câu cần xem lại có link, câu đã báo
     thì link tắt. opts.reported (đã báo từ trước) và onReport bị từ chối (hiện lỗi, bấm lại được) thử bằng Quiz.run trực tiếp.
     Dữ liệu cũ chưa có trường reports: đọc vào là []. Quản trị → Dữ liệu: danh sách và nút "Chép để gửi" (văn bản dán Zalo).
     Phụ huynh xem thử cũng báo được. Mỗi màn hình kiểm tra 360px, ảnh 20-*.png. */
  const rc = await newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2 });
  await localConfig(rc); watchOut(rc); await rc.grantPermissions(["clipboard-read", "clipboard-write"], { origin: BASE });
  const rp = await rc.newPage(); rp.on("pageerror", (e) => errs.push("pageerror R1: " + e.message)); rp.on("console", (m) => { if (m.type() === "error") errs.push("console R1: " + m.text()); });
  const r1 = { problems: [] };
  const rcheck = async (label) => (await rp.evaluate(audit)).forEach((x) => r1.problems.push(`R1 · ${label}: ${x}`));
  const rsnap = async (n) => { await rp.evaluate(() => { scrollTo(0, 0); const t = document.querySelector("#toast"); if (t) t.hidden = true; }); await rp.screenshot({ path: `${OUT}20-${n}.png`, fullPage: true }); };
  const rtext = (sel) => rp.textContent(sel).then((t) => t.replace(/\s+/g, " ").trim(), () => "");
  const answerFirst = async () => { if (await rp.$("#qzFill")) await rp.fill("#qzFill", "1"); else await rp.click(".opt >> nth=0"); await rp.click("#qzGo"); };
  const curKey = () => rp.evaluate((id) => { const t = document.querySelector(".qcard .qtext").textContent.replace(/___/g, "").replace(/\s+/g, ""); const q = Store.bank(id).questions.find((x) => String(x.q).replace(/___/g, "").replace(/\s+/g, "") === t); return q ? [Quiz.key(q), Quiz.text(q)] : null; }, "toan4-ck1-de1");
  await rp.goto(BASE + "/");
  r1.oldDefault = await rp.evaluate(() => { const d = JSON.parse(localStorage.getItem("ontap_db_v1")); delete d.reports; localStorage.setItem("ontap_db_v1", JSON.stringify(d)); Store.load(); return Array.isArray(Store.data().reports) && Store.reports().length === 0; });
  await rp.click(`.tile[data-u="${ids.Bin}"]`); await rp.fill("#pinIn", PINS.Bin); await rp.waitForTimeout(400);
  await rp.goto(BASE + "/#/quiz/toan4-ck1-de1"); await rp.waitForSelector("#qPractice");
  await rp.click("#qExam"); r1.examNoLink = !(await rp.$(".rp-link")); // làm như thi: không có lời giải, không có link
  await rp.click("#qzSubmit"); await rp.click("#qzYes"); await rp.waitForTimeout(300); // chưa làm câu nào: thoát
  await rp.goto(BASE + "/#/quiz/toan4-ck1-de1"); await rp.waitForSelector("#qPractice"); await rp.click("#qPractice");
  r1.beforeCheck = !(await rp.$(".rp-link")); // chưa kiểm tra: chưa có link
  const rk1 = await curKey(); await answerFirst();
  r1.link = await rp.$eval(".rp-link", (b) => ({ h: Math.round(b.getBoundingClientRect().height), text: b.textContent.trim(), flag: !!b.querySelector("svg"), inFb: !!b.closest("#qzFb"), after: !!b.closest("#qzFb").querySelector(".fb") }));
  await rp.click(".rp-link"); await rp.waitForSelector(".report-box");
  r1.box = await rp.evaluate(() => { const b = document.querySelector(".report-box"); return { inline: !!b.closest("#qzFb") && getComputedStyle(b).position === "static" && !document.querySelector("#leaveBox"),
    reasons: [...b.querySelectorAll(".rsn .opt")].map((x) => x.textContent.trim()).join(), max: b.querySelector(".report-note").maxLength, btns: [...b.querySelectorAll(".row button")].map((x) => x.textContent).join() }; });
  await rp.click(".report-box [type=submit]"); r1.needReason = await rtext(".rp-err");
  await rcheck("hộp báo câu sai"); await rsnap("bao-cau-sai");
  await rp.click(".report-box .rp-no"); r1.closed = !(await rp.$(".report-box")); // Thôi: đóng hộp, link vẫn bấm được
  await rp.click(".rp-link"); await rp.click('.rsn .opt[data-r="typo"]'); await rp.fill(".report-note", "Thiếu dấu. " + "x".repeat(300));
  r1.pressed = await rp.$eval('.rsn .opt[data-r="typo"]', (b) => b.getAttribute("aria-pressed"));
  await rp.click(".report-box [type=submit]"); await rp.waitForSelector(".rp-done");
  r1.done = await rtext(".rp-done"); r1.after = await rp.$eval(".rp-link", (b) => b.disabled + " " + b.textContent.trim() + " " + b.getAttribute("aria-expanded"));
  await rcheck("đã báo"); await rsnap("bao-cau-sai-xong");
  await rp.evaluate(() => document.querySelector(".rp-link").click()); r1.noReopen = !(await rp.$(".report-box")); // link đã tắt: bấm không mở lại
  const saved = await rp.evaluate(() => Store.reports());
  r1.saved = saved.length === 1 && saved[0].userId === ids.Bin && saved[0].bankId === "toan4-ck1-de1" && !!rk1 && saved[0].qKey === rk1[0] && saved[0].qText === rk1[1] && saved[0].qText.length <= 500
    && saved[0].reason === "typo" && saved[0].note.length === 200 && saved[0].note.startsWith("Thiếu dấu. ") && /^\d{4}-/.test(saved[0].at);
  await rp.click("#qzGo"); // câu 2: báo "Khác" không ghi chú
  const rk2 = await curKey(); await answerFirst();
  await rp.click(".rp-link"); await rp.click('.rsn .opt[data-r="other"]'); await rp.click(".report-box [type=submit]"); await rp.waitForSelector(".rp-done");
  await rp.click("#qzGo"); await answerFirst(); // câu 3: không báo
  await rp.click("#qzExit"); await rp.click("#qzYes"); await rp.waitForSelector(".score"); // dừng ôn: màn kết quả
  r1.resultLinks = await rp.evaluate((keys) => { const rows = [...document.querySelectorAll(".rv")]; const links = rows.map((r) => r.querySelector(".rp-link"));
    return { n: rows.length, all: links.every(Boolean), off: links.filter((b) => b.disabled).map((b) => b.dataset.k + ":" + b.textContent.trim()), on: links.filter((b) => !b.disabled).length, keys }; }, [rk1[0], rk2[0]]);
  if (r1.resultLinks.on) { // báo một câu ở màn kết quả (câu sai thu gọn, UX1: mở ra rồi mới thấy link)
    await rp.evaluate(() => document.querySelectorAll("details.rv").forEach((d) => (d.open = true)));
    await rp.click(".rv .rp-link:not([disabled]) >> nth=0"); await rp.click('.rsn .opt[data-r="wrong"]'); await rp.fill(".report-note", "Theo sách là 6 080.");
    await rcheck("báo ở màn kết quả"); await rp.click(".report-box [type=submit]"); await rp.waitForSelector(".rv .rp-done");
  }
  r1.n3 = await rp.evaluate(() => Store.reports().length);
  // opts.reported (đã báo từ trước) và onReport bị từ chối: thử Quiz.run trực tiếp
  r1.direct = await rp.evaluate(async () => {
    const mk = (opts) => { const el = document.createElement("div"); document.body.append(el); Quiz.run(el, { title: "Thử", questions: [{ type: "tf", q: "1 + 1 = 2", a: true, x: "Giải thích." }] }, Object.assign({ mode: "practice" }, opts)); el.querySelector(".opt").click(); el.querySelector("#qzGo").click(); return el; };
    const tick = () => new Promise((ok) => setTimeout(ok, 30));
    const a = mk({ onReport: () => Promise.resolve(), reported: () => true }), la = a.querySelector(".rp-link");
    const was = { disabled: la.disabled, text: la.textContent.trim() };
    const b = mk({ onReport: () => Promise.reject(new Error("Mất kết nối mạng.")) }), lb = b.querySelector(".rp-link");
    lb.click(); b.querySelector('.rsn .opt[data-r="wrong"]').click(); b.querySelector(".report-box [type=submit]").click(); await tick();
    const err = b.querySelector(".rp-err").textContent, again = !b.querySelector(".report-box [type=submit]").disabled && !lb.disabled;
    const c = mk({}), none = !c.querySelector(".rp-link");
    a.remove(); b.remove(); c.remove();
    return { was, err, again, none };
  });
  // quản trị: Dữ liệu → danh sách, chép để gửi
  await rp.goto(BASE + "/#/account"); await rp.click("#logout"); await rp.waitForTimeout(200);
  await rp.click(`.tile[data-u="${ids["Bố Minh"]}"]`); await rp.fill("#pinIn", PINS["Bố Minh"]); await rp.waitForTimeout(400);
  await rp.goto(BASE + "/#/admin/data"); await rp.waitForSelector("#reportsBox");
  r1.list = await rp.evaluate(() => { const b = document.querySelector("#reportsBox"); return { head: b.querySelector("h3").textContent, n: b.querySelectorAll(".item").length, first: b.querySelector(".item").textContent.replace(/\s+/g, " ").trim(), copy: !!b.querySelector("#copyReports"), chips: b.querySelectorAll(".chip").length }; });
  await rcheck("dữ liệu: câu bị báo"); await rsnap("du-lieu-cau-bi-bao");
  await rp.click("#copyReports"); await rp.waitForTimeout(300);
  r1.clip = await rp.evaluate(() => navigator.clipboard.readText()).catch((e) => "lỗi: " + e.message);
  r1.toast = await rtext("#toast");
  // phụ huynh xem thử cũng báo được (ghi tên phụ huynh)
  await rp.goto(BASE + "/#/account"); await rp.click("#logout"); await rp.waitForTimeout(200);
  await rp.click(`.tile[data-u="${ids["Mẹ Bin"]}"]`); await rp.fill("#pinIn", PINS["Mẹ Bin"]); await rp.waitForTimeout(400);
  await rp.goto(BASE + "/#/quiz/toan4-ck1-de1"); await rp.waitForSelector("#qPractice"); await rp.click("#qPractice"); await answerFirst();
  await rp.click(".rp-link"); await rp.click('.rsn .opt[data-r="unclear"]'); await rp.click(".report-box [type=submit]"); await rp.waitForSelector(".rp-done");
  // số báo cáo = số trước đó + 1 (trước đó 2 hoặc 3 tùy màn kết quả còn câu chưa báo hay không: thứ tự câu ngẫu nhiên)
  r1.parent = await rp.evaluate(([id, n3]) => { const r = Store.reports()[0]; return r.userId === id && r.reason === "unclear" && Store.reports().length === n3 + 1; }, [ids["Mẹ Bin"], r1.n3]);
  await rc.close();
  console.log("R1:", r1);
  const r1OK = !r1.problems.length && r1.oldDefault && r1.examNoLink && r1.beforeCheck && r1.link.h >= 44 && r1.link.text === "Báo câu này sai" && r1.link.flag && r1.link.inFb && r1.link.after
    && r1.box.inline && r1.box.reasons === "Đáp án sai,Câu hỏi khó hiểu,Lỗi chính tả,Khác" && r1.box.max === 200 && r1.box.btns === "Gửi,Thôi" && /chọn một lí do/.test(r1.needReason) && r1.closed
    && r1.pressed === "true" && /Cảm ơn bạn/.test(r1.done) && r1.after === "true Đã báo câu này false" && r1.noReopen && r1.saved
    && r1.resultLinks.n >= 1 && r1.resultLinks.all && r1.resultLinks.off.every((x) => /:Đã báo câu này$/.test(x) && [rk1[0], rk2[0]].includes(x.split(":")[0])) && r1.n3 === 2 + (r1.resultLinks.on ? 1 : 0)
    && r1.direct.was.disabled && r1.direct.was.text === "Đã báo câu này" && /Mất kết nối mạng/.test(r1.direct.err) && r1.direct.again && r1.direct.none
    && /^Câu bị báo sai \(\d\)$/.test(r1.list.head) && r1.list.n === r1.n3 && /Toán 4 · Cuối kì I · Đề 1/.test(r1.list.first) && /Bin · /.test(r1.list.first) && r1.list.copy && r1.list.chips === 0
    && r1.clip.startsWith(`Báo câu sai · OnUp · Nhà Bin · ${r1.n3} câu`) && /\n1\) Toán 4 · Cuối kì I · Đề 1 · /.test(r1.clip) && /Lỗi chính tả\nCâu: /.test(r1.clip) && /Ghi chú: Thiếu dấu\. /.test(r1.clip)
    && /\nBin · /.test(r1.clip) && /toan4-ck1-de1 · /.test(r1.clip) && /Đã chép \d câu/.test(r1.toast) && r1.parent;

  step("English banks 100% English (TA1)");
  /* Ba đề Tiếng Anh có sẵn (ta6-gk1-de1, ta6-ck1-de1: Na lớp 6; ta4-ck1-de1: Bin lớp 4) viết 100% tiếng Anh, đoạn đọc dùng chung
     (passages). Làm ôn luyện bằng đáp án trong dữ liệu (như K3): câu nào cũng "Đúng rồi!", mỗi đề 10/10, kết quả lưu 25/25 môn
     Tiếng Anh; câu có đoạn đọc: hộp đoạn đọc mở sẵn, đúng tên và chữ của đoạn, các câu cùng đoạn đứng liền nhau, câu không có đoạn
     thì không có hộp; chữ câu hỏi và lời giải trên màn hình không có chữ cái tiếng Việt (giao diện làm đề bằng tiếng Anh từ Phiên
     TA2: nút đúng/sai là True/False, thử kĩ ở bước TA2). Mỗi màn hình kiểm tra 360px; ảnh sáng/tối một câu đọc hiểu và một câu điền sau khi Kiểm tra ở
     tests/screenshots/tieng-anh/ (bản ghép <tên>.jpg); chế độ tối chỉ làm đề giữa kì I lớp 6. */
  const OUTTA = OUT + "tieng-anh/"; fs.mkdirSync(OUTTA, { recursive: true });
  const TA_BANKS = [["ta6-gk1-de1", "Na", "4444"], ["ta6-ck1-de1", "Na", "4444"], ["ta4-ck1-de1", "Bin", PINS.Bin]];
  const CHU_VIET = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/iu;
  const ta1 = { problems: [], runs: [], shots: [] };
  for (const scheme of ["light", "dark"]) {
    const c = await newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, colorScheme: scheme });
    await localConfig(c); watchOut(c);
    const p = await c.newPage(); p.on("pageerror", (e) => errs.push("pageerror TA1: " + e.message)); p.on("console", (m) => { if (m.type() === "error") errs.push("console TA1: " + m.text()); });
    const tcheck = async (label) => (await p.evaluate(audit)).forEach((x) => ta1.problems.push(`TA1 · ${scheme} · ${label}: ${x}`));
    const tsnap = async (n) => { await p.evaluate(() => { scrollTo(0, 0); const t = document.querySelector("#toast"); if (t) t.hidden = true; }); await p.screenshot({ path: `${OUTTA}${n}-${scheme}.png`, fullPage: true }); ta1.shots.push(`${n}-${scheme}`); };
    const snapped = (n) => ta1.shots.includes(`${n}-${scheme}`);
    for (const [id, who, pin] of scheme === "light" ? TA_BANKS : TA_BANKS.slice(0, 1)) {
      await p.goto(BASE + "/#/account"); await p.waitForTimeout(200);
      if (await p.$("#switchWho, #logout")) { await p.click("#switchWho, #logout"); await p.waitForTimeout(200); }
      await p.goto(BASE + "/"); await p.click(`.tile[data-u="${ids[who]}"]`); await p.fill("#pinIn", pin); await p.waitForTimeout(400);
      await p.goto(BASE + "/#/quiz/" + id); await p.waitForSelector("#qPractice");
      const bank = await p.evaluate((id) => { const b = Store.bank(id); return { questions: b.questions, passages: b.passages || {} }; }, id);
      await tcheck(id + " màn đầu");
      await p.click("#qPractice");
      const r = { id, scheme, n: 0, right: 0, vi: [], psgBad: [], seq: [] };
      for (let i = 0; i < 30 && !(await p.$(".score")); i++) {
        // câu trên màn hình → câu trong đề: so chữ câu hỏi; hai câu cùng lời dặn ("Choose the odd one out.") thì so thêm các lựa chọn
        const t = await p.$eval(".qcard .qtext", (e) => e.textContent), opts = await p.$$eval(".opts .opt", (bs) => bs.map((b) => b.lastElementChild.textContent));
        const cands = bank.questions.filter((x) => flatQ(x.q) === flatQ(t)), q = cands.length > 1 ? cands.find((x) => (x.o || []).every((o) => opts.includes(o))) : cands[0];
        if (!q) { ta1.problems.push(`TA1 ${id}: không nhận ra câu ` + t.slice(0, 50)); break; }
        r.n++; r.seq.push(q.p || "");
        const psg = await p.evaluate(() => { const e = document.querySelector(".psg"); return e ? { title: e.querySelector("summary b").textContent, text: (e.querySelector(".psg-text") || {}).textContent || "", open: e.open } : null; });
        const want = q.p ? bank.passages[q.p] : null;
        if (want ? !psg || psg.title !== want.title || psg.text !== want.text || !psg.open : psg) r.psgBad.push(i + 1);
        if (q.type === "fill") await p.fill("#qzFill", q.ans[0]);
        else { const w = q.type === "tf" ? (q.a ? "True" : "False") : q.o[0]; await p.$$eval(".opts .opt", (bs, w) => bs.find((b) => b.lastElementChild.textContent === w).click(), w); }
        await p.click("#qzGo");
        const fb = await p.evaluate(() => ({ ok: !!document.querySelector("#qzFb .fb.ok"), text: [document.querySelector(".qcard .qtext"), document.querySelector("#qzFb .expl")].map((e) => (e ? e.textContent : "")).join(" ") }));
        if (fb.ok) r.right++;
        if (CHU_VIET.test(fb.text)) r.vi.push(i + 1);
        if (q.p && !snapped("doc-hieu")) { await tcheck(id + " câu đọc hiểu"); await tsnap("doc-hieu"); }
        if (q.type === "fill" && !snapped("dien-tu")) { await tcheck(id + " câu điền sau Kiểm tra"); await tsnap("dien-tu"); }
        await p.click("#qzGo");
      }
      await p.waitForSelector(".score");
      r.score = (await p.textContent(".score")).trim();
      r.saved = await p.evaluate((id) => { const x = Store.resultsFor(Store.sessionUser().id)[0]; return !!x && x.refId === id && x.subject === "Tiếng Anh" && x.r === 25 && x.t === 25 && x.source === "bank"; }, id);
      // câu cùng đoạn đọc đứng liền nhau, đủ số câu của đoạn
      r.contiguous = Object.keys(bank.passages).every((pid) => { const at = r.seq.map((x, k) => (x === pid ? k : -1)).filter((k) => k >= 0); return at.length === bank.questions.filter((q) => q.p === pid).length && at[at.length - 1] - at[0] === at.length - 1; });
      await tcheck(id + " kết quả");
      ta1.runs.push(r);
    }
    await c.close();
  }
  // ghép ảnh sáng/tối cạnh nhau (tests/screenshots/tieng-anh/<tên>.jpg)
  {
    const gp = await browser.newPage({ viewport: { width: 752, height: 400 }, deviceScaleFactor: 2 });
    for (const n of ["doc-hieu", "dien-tu"]) {
      if (!ta1.shots.includes(n + "-light") || !ta1.shots.includes(n + "-dark")) continue;
      const img = (sc) => "data:image/png;base64," + fs.readFileSync(`${OUTTA}${n}-${sc}.png`).toString("base64");
      await gp.setContent(`<body style="margin:0;display:flex;gap:16px;padding:8px;background:#888;align-items:flex-start"><img src="${img("light")}" width="360"><img src="${img("dark")}" width="360"></body>`);
      await gp.screenshot({ path: `${OUTTA}${n}.jpg`, fullPage: true, type: "jpeg", quality: 70 });
    }
    await gp.close();
  }
  console.log("TA1:", ta1.runs.map((r) => `${r.id} ${r.scheme}: ${r.right}/${r.n} đúng, ${r.score}, lưu ${r.saved}, đoạn đọc ${r.psgBad.length ? "sai ở câu " + r.psgBad : "đúng"}${r.contiguous ? "" : ", câu cùng đoạn không liền nhau"}${r.vi.length ? ", chữ Việt ở câu " + r.vi : ""}`), "problems:", ta1.problems);
  const ta1OK = !ta1.problems.length && ta1.runs.length === 4 && ta1.runs.every((r) => r.n === 25 && r.right === 25 && r.score === "10/10" && r.saved && !r.psgBad.length && !r.vi.length && r.contiguous)
    && ["doc-hieu-light", "doc-hieu-dark", "dien-tu-light", "dien-tu-dark"].every((x) => ta1.shots.includes(x));

  step("English test UI in English (TA2)");
  /* Đề Tiếng Anh (Quiz.lang(bank) → "en"): mọi chữ học sinh thấy từ màn mở đề đến hết màn kết quả, hộp hỏi khi rời đề (nút Back và
     "← Exit", "Finish test"; chưa trả lời, đã trả lời, làm như thi), link và hộp "Report a problem", thông báo lưu điểm lấy từ bảng chữ TXT của
     js/quiz.js: tên đề dựng lại ("English 4 · End-of-term 1 · Test 1"), mức độ Know/Understand/Apply, nút True/False, số thập phân
     dùng dấu chấm (9.25/10), khung có lang="en". Bin lớp 4 làm ta4-ck1-de1, Na lớp 6 làm ta6-gk1-de1: ôn luyện (câu trắc nghiệm đầu
     và câu điền đầu cố ý sai, báo câu sai ở câu điền) rồi làm như thi (2 câu rồi nộp sớm); mọi chữ trong #view, #leaveBox, #toast
     không có chữ cái tiếng Việt (CHU_VIET, như tests/kiem-tra-de.js). Bài ôn IOE 4 trong khung: nút quay lại, dòng ghi chú, hộp hỏi
     khi rời bài đang làm, thông báo lưu điểm bằng tiếng Anh. Phụ huynh xem thử đề Tiếng Anh: dòng "Chế độ xem thử" vẫn tiếng Việt,
     còn lại tiếng Anh. Đề Toán 4 vẫn tiếng Việt (các bước trên, và xem lại màn mở đề ở đây). Kết quả lưu vẫn ghi tên đề và môn trong
     danh mục (tiếng Việt). Mỗi màn hình kiểm tra 360px; ảnh sáng/tối ở tests/screenshots/tieng-anh/ta2-*.png (bản ghép ta2-<tên>.jpg). */
  const ta2 = { problems: [], vi: [], shots: [], runs: [] };
  const TA2_BANKS = [["ta4-ck1-de1", "Bin", PINS.Bin, "English 4 · End-of-term 1 · Test 1", "Grade 4 · English", 35], ["ta6-gk1-de1", "Na", "4444", "English 6 · Mid-term 1 · Test 1", "Grade 6 · English", 45]];
  for (const scheme of ["light", "dark"]) {
    const c = await newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, colorScheme: scheme });
    await localConfig(c); watchOut(c);
    const p = await c.newPage(); p.on("pageerror", (e) => errs.push("pageerror TA2: " + e.message)); p.on("console", (m) => { if (m.type() === "error") errs.push("console TA2: " + m.text()); });
    const txt = (sel) => p.evaluate((s) => { const e = document.querySelector(s); return e ? e.textContent.replace(/\s+/g, " ").trim() : ""; }, sel);
    // chữ tiếng Việt đang hiện (màn hình, hộp rời trang, thông báo): ghi bước và vài từ đầu
    const noVi = async (label) => { const t = [await txt("#view"), await txt("#leaveBox"), await txt("#toast")].join(" "), m = t.split(/\s+/).filter((w) => CHU_VIET.test(w)); if (m.length) ta2.vi.push(`${scheme} · ${label}: ${m.slice(0, 5).join(" ")}`); return t; };
    const check = async (label) => { (await p.evaluate(audit)).forEach((x) => ta2.problems.push(`TA2 · ${scheme} · ${label}: ${x}`)); return noVi(label); };
    const snap = async (n, keepToast) => { await p.evaluate((k) => { scrollTo(0, 0); const t = document.querySelector("#toast"); if (t && !k) t.hidden = true; }, !!keepToast); await p.screenshot({ path: `${OUTTA}ta2-${n}-${scheme}.png`, fullPage: true }); ta2.shots.push(`ta2-${n}-${scheme}`); };
    const snapped = (n) => ta2.shots.includes(`ta2-${n}-${scheme}`);
    const signIn = async (who, pin) => { await p.goto(BASE + "/#/account"); await p.waitForTimeout(200); if (await p.$("#switchWho, #logout")) { await p.click("#switchWho, #logout"); await p.waitForTimeout(200); } await p.goto(BASE + "/"); await p.click(`.tile[data-u="${ids[who]}"]`); await p.fill("#pinIn", pin); await p.waitForTimeout(400); };
    const answer = async (q, right) => { // trả lời theo dữ liệu; right = false thì cố ý sai (chỉ trắc nghiệm, điền)
      if (q.type === "fill") await p.fill("#qzFill", right ? q.ans[0] : "zzz");
      else { const w = q.type === "tf" ? (q.a ? "True" : "False") : right ? q.o[0] : q.o[1]; await p.$$eval(".opts .opt", (bs, w) => bs.find((b) => b.lastElementChild.textContent === w).click(), w); }
    };
    for (const [id, who, pin, title, label, minutes] of TA2_BANKS) {
      const r = { id, scheme };
      await signIn(who, pin);
      await p.goto(BASE + "/#/quiz/" + id); await p.waitForSelector("#qPractice");
      const bank = await p.evaluate((id) => Store.bank(id).questions, id);
      const open = await check("màn mở đề");
      r.open = (await txt(".hero h1")) === title && (await txt(".hero .label")) === label && (await txt("#qPractice b")) === "Practice" && (await txt("#qExam b")) === `Test mode · ${minutes} minutes` && (await txt("#qModes")) === "Choose a mode"
        && (await txt("#view .linkbtn")) === "← Home" && (await p.$eval("#view > .stack", (e) => e.getAttribute("lang"))) === "en" && /25 questions\./.test(open);
      if (!snapped("mo-de")) await snap("mo-de");
      // làm như thi, rời khi chưa trả lời: nút Back hỏi "Exit the test?"; nút "Finish test" (X6) hỏi ngay trong trang
      await p.click("#qExam"); await p.evaluate(() => history.back()); await p.waitForSelector("#leaveBox");
      await check("hộp rời trang, chưa trả lời"); r.leave0 = (await txt("#leaveBox")) === "Exit the test?You haven't answered any questions, so no score is saved. ExitKeep going";
      if (!snapped("roi-trang-chua-lam")) await snap("roi-trang-chua-lam");
      await p.click("#leaveNo"); await p.click("#qzSubmit");
      await check("hộp Thoát, chưa trả lời"); r.exit0 = (await txt("#qzFb")) === "Exit the test? You haven't answered any questions, so no score is saved.ExitKeep going";
      if (!snapped("thoat-de")) await snap("thoat-de");
      await p.click("#qzYes"); await p.waitForTimeout(300);
      r.exit0Home = (await p.evaluate(() => location.hash)) === "#/home";
      // ôn luyện: câu trắc nghiệm đầu và câu điền đầu cố ý sai, còn lại đúng; báo câu sai ở câu điền sai; sau câu 3 thử rời trang
      await p.goto(BASE + "/#/quiz/" + id); await p.waitForSelector("#qPractice"); await p.click("#qPractice");
      const seen = {}; let wrongN = 0, n = 0;
      for (let i = 0; i < 30 && !(await p.$(".score")); i++) {
        const t = await p.$eval(".qcard .qtext", (e) => e.textContent), opts = await p.$$eval(".opts .opt", (bs) => bs.map((b) => b.lastElementChild.textContent));
        const cands = bank.filter((x) => flatQ(x.q) === flatQ(t)), q = cands.length > 1 ? cands.find((x) => (x.o || []).every((o) => opts.includes(o))) : cands[0];
        if (!q) { ta2.problems.push(`TA2 ${id}: không nhận ra câu ` + t.slice(0, 50)); break; }
        n++;
        // ảnh lần đầu gặp mỗi dạng (mc, fill, tf) và câu có đoạn đọc (doc-hieu; câu đúng/sai của đề Tiếng Anh đều thuộc đoạn đọc)
        const kinds = [q.type].concat(q.p ? ["doc-hieu"] : []).filter((k) => !seen[k]); kinds.forEach((k) => (seen[k] = true));
        for (const k of kinds) { await check(`câu ${k}`); if (!snapped(k)) await snap(k); }
        const wrong = (q.type === "mc" && !seen.wrongMc) || (q.type === "fill" && !seen.wrongFill);
        if (wrong) { seen[q.type === "mc" ? "wrongMc" : "wrongFill"] = true; wrongN++; }
        await answer(q, !wrong);
        await p.click("#qzGo");
        const fb = await txt("#qzFb");
        for (const k of kinds) { await check(`câu ${k} sau Kiểm tra`); if (!snapped(k + "-kiem-tra")) await snap(k + "-kiem-tra"); }
        if (wrong) r[q.type + "Wrong"] = /^Not quite\. Answer: /.test(fb) && /Report a problem$/.test(fb) && (await txt("#qzGo")) === "Next question";
        else if (!r.rightFb) r.rightFb = /^Correct!/.test(fb);
        if (wrong && q.type === "fill" && !seen.report) { // báo câu sai: hộp lí do tiếng Anh, phải chọn lí do, gửi xong
          seen.report = true;
          await p.click(".rp-link"); await p.waitForSelector(".report-box");
          r.rpBox = (await txt(".report-box")) === "What's wrong with this question? Wrong answerConfusing questionSpelling mistakeOther Note (optional, up to 200 characters) SendCancel"
            && (await p.$eval(".report-note", (e) => e.placeholder)) === "Write more if you like" && (await p.$eval(".rsn", (e) => e.getAttribute("aria-label"))) === "Reason";
          await p.click(".report-box [type=submit]"); r.rpNeed = (await txt(".rp-err")) === "Please choose a reason.";
          await check("hộp báo câu sai"); if (!snapped("bao-cau-sai")) await snap("bao-cau-sai");
          await p.click('.rsn .opt[data-r="typo"]'); await p.click(".report-box [type=submit]"); await p.waitForSelector(".rp-done");
          r.rpDone = (await txt(".rp-done")) === "Thank you! We will check this question." && (await txt(".rp-link")) === "Reported";
          await check("đã báo câu sai"); if (!snapped("bao-cau-sai-xong")) await snap("bao-cau-sai-xong");
        }
        if (n === 3) { // đã trả lời: nút Back hỏi "End practice and leave?"; "← Exit" hỏi "End practice and see your results?"
          await p.evaluate(() => history.back()); await p.waitForSelector("#leaveBox");
          await check("hộp rời trang, đã trả lời"); r.leave1 = (await txt("#leaveBox")) === "End practice and leave?Your answers so far will be saved. End practiceKeep practising";
          if (!snapped("roi-trang-da-lam")) await snap("roi-trang-da-lam");
          await p.click("#leaveNo"); await p.waitForTimeout(100);
          await p.click("#qzExit"); r.exit1 = (await txt("#qzFb .confirm")) === "End practice and see your results?End practiceKeep going";
          await check("hộp Dừng ôn, đã trả lời"); if (!snapped("dung-on")) await snap("dung-on");
          await p.click("#qzNo");
          r.stay = !(await p.$("#leaveBox")) && (await p.evaluate(() => location.hash)) === "#/quiz/" + id;
        }
        await p.click("#qzGo");
      }
      await p.waitForSelector(".score");
      const res = await check("màn kết quả"), d10 = String(Math.round(((25 - wrongN) / 25) * 40) / 4);
      r.n = n; r.wrongN = wrongN;
      // so chữ sau khi bỏ hết khoảng trắng (các khối liền nhau không có khoảng trắng giữa); UX1: lời khen, nút "Review N mistakes", câu sai thu gọn
      const flatRes = res.replace(/\s+/g, ""), flatHead = `${title} · Practice Excellent, ${who}! ${d10}/10 ${25 - wrongN}/25 correct Time:`.replace(/\s+/g, "");
      r.result = (await txt(".score")) === `${d10}/10` && flatRes.startsWith(flatHead) && /Bytopic/.test(flatRes) && /BylevelKnow/.test(flatRes)
        && flatRes.includes(`Reviewmistakes(${wrongN})`) && /Youranswer:/.test(flatRes) && /taptoseetheanswerandguide/.test(flatRes) && /Answer:/.test(flatRes) && /Reported/.test(flatRes) && /Reportaproblem/.test(flatRes)
        && (await txt("#qzRetry")) === `Review ${wrongN} mistakes` && (await txt("#qzAgain")) === "Try the whole test again" && (await txt("#qzHome")) === "Go to home" && (await txt("#toast")) === "Result saved"
        && (await p.$$eval("details.rv", (d) => d.length === 2 && d.every((x) => !x.open)));
      r.saved = await p.evaluate((id) => { const x = Store.resultsFor(Store.sessionUser().id)[0]; return !!x && x.refId === id && x.subject === "Tiếng Anh" && x.label === Store.bank(id).title && x.t === 25 && x.mode === "practice"; }, id);
      if (!snapped("ket-qua")) await snap("ket-qua", true);
      // ôn lại câu sai (UX1) bằng tiếng Anh: lượt chỉ có 2 câu, dừng giữa chừng hỏi "Stop reviewing…", kết quả ghi "Reviewing mistakes", không lưu thêm kết quả
      const nSaved = await p.evaluate(() => Store.resultsFor(Store.sessionUser().id).length);
      await p.click("#qzRetry"); await p.waitForSelector(".qcard");
      r.retryN = (await txt("#qzProg")) === "1 of 2";
      if (await p.$("#qzFill")) await p.fill("#qzFill", "zzz"); else await p.click(".opt >> nth=0");
      await p.click("#qzGo"); await check("ôn lại câu sai"); if (!snapped("on-lai-cau-sai")) await snap("on-lai-cau-sai");
      await p.click("#qzExit"); r.retryExit = (await txt("#qzFb .confirm")) === "Stop reviewing your mistakes? This round is not scored.StopKeep going";
      await p.click("#qzYes"); await p.waitForSelector(".score");
      const rr = await check("kết quả ôn lại câu sai");
      r.retryResult = (await txt("#view .panel .label")) === `${title} · Reviewing mistakes` && /Reviewing your mistakes is not scored\./.test(rr) && (await txt("#qzAgain")) === "Try the whole test again"
        && (await p.evaluate(() => Store.resultsFor(Store.sessionUser().id).length)) === nSaved;
      if (!snapped("ket-qua-on-lai")) await snap("ket-qua-on-lai", true);
      // làm như thi: 2 câu rồi nộp sớm bằng nút "Finish test" (UX5, X6); nút Back hỏi "Finish the test and leave?"
      await p.goto(BASE + "/#/home"); await p.goto(BASE + "/#/quiz/" + id); await p.waitForSelector("#qExam");
      // UX5: thẻ "Last time" (lượt ôn luyện vừa xong), chip đồng hồ "35:00 left" (aria-label "Time left"), tiến độ "1 of 25", nút "Finish test"
      r.prevEn = /^Last time: \d+\/25 correct$/.test(await txt("#qPrev b")) && /^Today \d\d:\d\d · practice( · \d+ (seconds?|minutes?))?$/.test(await txt("#qPrev .muted"));
      await p.click("#qExam");
      r.examTop = (await txt("#qzSubmit")) === "Finish test" && new RegExp(`^(${minutes}:00|${minutes - 1}:5\\d) left$`).test(await txt("#qzTimer")) && (await p.$eval("#qzTimer", (e) => e.getAttribute("aria-label"))) === "Time left"
        && (await txt("#qzProg")) === "1 of 25" && !(await p.$("#qzExit"));
      for (let k = 0; k < 2; k++) { if (await p.$("#qzFill")) await p.fill("#qzFill", "x"); else await p.click(".opt >> nth=0"); r.examBtn = (await txt("#qzGo")) === "Answer" && (await txt("#qzSkip")) === "Skip"; await p.click("#qzGo"); }
      await p.evaluate(() => history.back()); await p.waitForSelector("#leaveBox");
      await check("hộp rời trang, làm như thi"); r.leaveExam = (await txt("#leaveBox")) === "Finish the test and leave?Unanswered questions count as wrong. Finish testKeep going";
      await p.click("#leaveNo"); await p.click("#qzSubmit");
      r.exitExam = (await txt("#qzFb .confirm")) === "Finish test now? 23 questions are not done and will count as wrong.Finish testKeep going"; // 9n: ghi số câu còn trống
      if (!snapped("nop-bai")) await snap("nop-bai");
      await p.click("#qzYes"); await p.waitForSelector(".score");
      const ex = await check("kết quả làm như thi");
      r.examResult = (await txt("#view .panel .label")) === `${title} · Test mode` && /\/25 correct/.test(ex) && /\(no answer\)/.test(ex) && (await txt("#toast")) === "Result saved" && !/,\d/.test(await txt(".score"));
      ta2.runs.push(r);
    }
    // bài ôn IOE 4 trong khung (Bin): nút quay lại, dòng ghi chú, hộp hỏi khi rời bài đang làm, thông báo lưu điểm
    await signIn("Bin", PINS.Bin);
    await p.goto(BASE + "/#/play/ioe-4"); await p.waitForTimeout(1500);
    const io = { note: await txt(".player .note"), back: await txt(".player .linkbtn"), lang: await p.$eval("#view > .player", (e) => e.getAttribute("lang")), title: await p.$eval(".player .note", (e) => e.title) };
    const fr = p.frames().find((f) => /modules\/ioe-4/.test(f.url()));
    await fr.click(".unit >> nth=0"); await fr.waitForSelector("#endBtn");
    await p.click(".player [data-go]"); await p.waitForSelector("#leaveBox");
    io.leave = await txt("#leaveBox"); (await p.evaluate(audit)).forEach((x) => ta2.problems.push(`TA2 · ${scheme} · bài ôn IOE: ${x}`));
    if (!snapped("ioe-roi-bai")) await snap("ioe-roi-bai");
    await p.click("#leaveNo");
    await fr.evaluate(() => ontapReport({ label: "School Level · Test 1", mode: "exam", subject: "ta", r: 24, t: 30, s: 900 })); await p.waitForTimeout(200);
    io.toast = await txt("#toast");
    // rời bài đang làm dở qua hộp hỏi (chốt rời trang còn giữ cho đến khi đồng ý rời)
    await p.click(".player [data-go]"); await p.waitForSelector("#leaveBox"); await p.click("#leaveYes"); await p.waitForTimeout(300);
    io.left = await p.evaluate(() => location.hash);
    ta2["ioe-" + scheme] = io;
    // phụ huynh xem thử đề Tiếng Anh: dòng "Chế độ xem thử" vẫn tiếng Việt, còn lại tiếng Anh
    await signIn("Mẹ Bin", PINS["Mẹ Bin"]);
    await p.goto(BASE + "/#/quiz/ta4-ck1-de1"); await p.waitForSelector("#qPractice");
    ta2["parent-" + scheme] = { notice: await txt(".notice"), lang: await p.$eval(".notice", (e) => e.getAttribute("lang")), h1: await txt(".hero h1"), btn: await txt("#qPractice b") };
    (await p.evaluate(audit)).forEach((x) => ta2.problems.push(`TA2 · ${scheme} · xem thử: ${x}`));
    if (!snapped("xem-thu")) await snap("xem-thu");
    // đề Toán 4 vẫn tiếng Việt, không có lang="en"
    await p.goto(BASE + "/#/quiz/toan4-ck1-de1"); await p.waitForSelector("#qPractice");
    ta2["toan-" + scheme] = { h1: await txt(".hero h1"), btn: await txt("#qPractice b"), lang: await p.$eval("#view > .stack", (e) => e.getAttribute("lang")) };
    await c.close();
  }
  // ghép ảnh sáng/tối cạnh nhau (tests/screenshots/tieng-anh/ta2-<tên>.jpg)
  {
    const gp = await browser.newPage({ viewport: { width: 752, height: 400 }, deviceScaleFactor: 2 });
    for (const n of [...new Set(ta2.shots.map((x) => x.replace(/-(light|dark)$/, "")))]) {
      if (!ta2.shots.includes(n + "-light") || !ta2.shots.includes(n + "-dark")) continue;
      const img = (sc) => "data:image/png;base64," + fs.readFileSync(`${OUTTA}${n}-${sc}.png`).toString("base64");
      await gp.setContent(`<body style="margin:0;display:flex;gap:16px;padding:8px;background:#888;align-items:flex-start"><img src="${img("light")}" width="360"><img src="${img("dark")}" width="360"></body>`);
      await gp.screenshot({ path: `${OUTTA}${n}.jpg`, fullPage: true, type: "jpeg", quality: 70 });
    }
    await gp.close();
  }
  console.log("TA2:", ta2.runs, { ioe: [ta2["ioe-light"], ta2["ioe-dark"]], parent: [ta2["parent-light"], ta2["parent-dark"]], toan: [ta2["toan-light"], ta2["toan-dark"]] }, "chữ Việt:", ta2.vi, "problems:", ta2.problems);
  const TA2_SHOTS = ["mo-de", "roi-trang-chua-lam", "thoat-de", "mc", "mc-kiem-tra", "fill", "fill-kiem-tra", "tf", "tf-kiem-tra", "doc-hieu", "doc-hieu-kiem-tra", "bao-cau-sai", "bao-cau-sai-xong", "roi-trang-da-lam", "dung-on", "ket-qua", "on-lai-cau-sai", "ket-qua-on-lai", "nop-bai", "ioe-roi-bai", "xem-thu"];
  const ta2OK = !ta2.problems.length && !ta2.vi.length && ta2.runs.length === 4
    && ta2.runs.every((r) => r.open && r.leave0 && r.exit0 && r.exit0Home && r.n === 25 && r.wrongN === 2 && r.mcWrong && r.fillWrong && r.rightFb && r.rpBox && r.rpNeed && r.rpDone && r.leave1 && r.exit1 && r.stay && r.result && r.saved && r.retryN && r.retryExit && r.retryResult && r.examBtn && r.prevEn && r.examTop && r.leaveExam && r.exitExam && r.examResult)
    && ["light", "dark"].every((sc) => { const io = ta2["ioe-" + sc], pa = ta2["parent-" + sc], to = ta2["toan-" + sc];
      return io.note === "Score saved" && io.back === "← Home" && io.lang === "en" && io.title === "Your score is saved to your profile each time you finish." && io.leave === "Leave this practice?Your unfinished work won't be saved. LeaveStay" && io.toast === "Result saved: 24/30 correct" && io.left === "#/home"
        && pa.notice === "Chế độ xem thử: điểm không được lưu." && pa.lang === "vi" && pa.h1 === "English 4 · End-of-term 1 · Test 1" && pa.btn === "Practice"
        && to.h1 === "Toán 4 · Cuối kì I · Đề 1" && to.btn === "Ôn luyện" && to.lang === null; })
    && TA2_SHOTS.every((n) => ta2.shots.includes(`ta2-${n}-light`) && ta2.shots.includes(`ta2-${n}-dark`));

  step("module wrong list: a correct answer anywhere removes the question (L27)");
  /* Bài ôn dạng trang (Phiên 9f): làm đúng một câu ở bất kì chế độ nào (cả đề thi thử) thì câu ra khỏi danh sách "Ôn câu sai"
     (localStorage u_<mã học sinh>__<khóa bài>_wrong[_<môn>]); làm sai, Bỏ qua, nộp đề còn câu chưa làm thì vào danh sách như cũ.
     Na lớp 6 (l6-giua-ki-1, Ngữ văn) và Bin lớp 4 (l4-giua-ki-1, Tiếng Việt): Đề 1 chọn sai câu thứ 4 (câu vào danh sách), làm lại
     Đề 1 đúng hết (20/20, danh sách trống, không có nút "Ôn câu sai"); ghi sẵn một mã câu ngoài Đề 1 rồi làm Đề 1 đúng hết: trang
     đầu có chữ giải thích luật mới, màn kết quả có dòng "Lần này bạn không sai câu nào…" ngay trên nút "Ôn câu sai (1)" và qua
     kiểm tra 360px trong khung. Đáp án đọc bằng buildTest(môn, "all", 0) của khung (câu theo đúng thứ tự hàm trả về).
     IOE 4 (Bin), IOE 6 (Na): ghi sẵn mã câu trắc nghiệm đầu tiên của đề tiếp theo, Skip đến câu đó, trả lời đúng, Finish test now:
     câu đó ra khỏi danh sách, câu bỏ qua và chưa làm vào danh sách; rồi Review mistakes làm đúng một câu, End practice: dòng
     "No mistakes this time…" bằng tiếng Anh. Ảnh 360px sáng/tối ở tests/screenshots/l27/ (bản ghép <tên>.jpg). */
  const l27 = { problems: [], shots: [], runs: [] };
  const OUTL27 = OUT + "l27/"; fs.mkdirSync(OUTL27, { recursive: true });
  const L27_KEY = { "l6-giua-ki-1": "gk1-l6-v1", "l4-giua-ki-1": "gk1-l4-v1", "ioe-4": "ioe4v1", "ioe-6": "ioe6v2" };
  for (const scheme of ["light", "dark"]) {
    const c = await newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, colorScheme: scheme });
    await localConfig(c); watchOut(c);
    const p = await c.newPage(); p.on("pageerror", (e) => errs.push("pageerror L27: " + e.message)); p.on("console", (m) => { if (m.type() === "error") errs.push("console L27: " + m.text()); });
    const signIn = async (who, pin) => { await p.goto(BASE + "/#/account"); await p.waitForTimeout(200); if (await p.$("#switchWho, #logout")) { await p.click("#switchWho, #logout"); await p.waitForTimeout(200); } await p.goto(BASE + "/"); await p.click(`.tile[data-u="${ids[who]}"]`); await p.fill("#pinIn", pin); await p.waitForTimeout(400); };
    let fr = null; // khung bài ôn đang mở
    const openMod = async (m) => {
      await p.goto(BASE + "/#/home"); await p.waitForTimeout(150); await p.goto(BASE + "/#/play/" + m);
      for (let i = 0; i < 60 && !(fr = p.frames().find((f) => f.url().includes(`/modules/${m}/`))); i++) await p.waitForTimeout(100);
      await fr.waitForSelector(".stab, .unit"); await p.waitForTimeout(150);
    };
    const wrongKeyOf = (m, who, sid) => `u_${ids[who]}__${L27_KEY[m]}_wrong${sid ? "_" + sid : ""}`;
    const getWrong = (k) => p.evaluate((k) => JSON.parse(localStorage.getItem(k) || "[]"), k);
    const setWrong = (k, v) => p.evaluate(([k, v]) => localStorage.setItem(k, JSON.stringify(v)), [k, v]);
    const same = (a, b) => a.length === b.length && a.every((x) => b.includes(x));
    const ftxt = (sel) => fr.evaluate((s) => { const e = document.querySelector(s); return e ? e.textContent.replace(/\s+/g, " ").trim() : ""; }, sel);
    const resBtns = () => fr.$$eval("#resBtns button", (bs) => bs.map((b) => b.textContent.trim()).join("|"));
    const wrongPanel = () => fr.evaluate(() => { const s = [...document.querySelectorAll("section.sec")].find((x) => /^(Ôn câu sai|Review Mistakes)$/.test((x.querySelector("h2") || {}).textContent)); return s ? s.querySelector(".panel > div").textContent.replace(/\s+/g, " ").trim() : ""; });
    const noteAboveBtns = () => fr.$eval("#wrongNote", (e) => e.nextElementSibling && e.nextElementSibling.id === "resBtns");
    // kiểm tra 360px trong khung (màn kết quả của bài ôn) và trang app bọc ngoài
    const check = async (label) => { (await fr.evaluate(audit)).forEach((x) => l27.problems.push(`L27 · ${scheme} · ${label}: ${x}`)); (await p.evaluate(audit)).forEach((x) => l27.problems.push(`L27 · ${scheme} · ${label} (trang app): ${x}`)); };
    // chụp cả màn kết quả trong khung: khung cao theo màn hình (body.playing), nên tạm kéo màn hình cao bằng nội dung khung rồi trả lại 740px
    const snap = async (n) => {
      const h = await fr.evaluate(() => document.documentElement.scrollHeight), top = await p.$eval(".player iframe", (e) => Math.round(e.getBoundingClientRect().top));
      await p.setViewportSize({ width: 360, height: Math.min(1600, Math.max(740, top + h + 12)) }); await p.waitForTimeout(150);
      await p.evaluate(() => { const t = document.querySelector("#toast"); if (t) t.hidden = true; }); // thông báo lưu điểm đè lên nút
      await p.screenshot({ path: `${OUTL27}${n}-${scheme}.png` });
      await p.setViewportSize({ width: 360, height: 740 }); await p.waitForTimeout(100);
      l27.shots.push(`${n}-${scheme}`);
    };
    // Bài ôn l4/l6: làm Đề k+1 của môn sid, câu thứ wrongAt (từ 0) cố ý sai; trả về các câu của đề (kind, a, ans, key)
    const doTest = async (sid, k, wrongAt) => {
      const qs = await fr.evaluate(([sid, k]) => buildTest(sid, "all", k).map((q) => ({ kind: q.kind, a: q.a, ans: q.ans, key: wkey(q) })), [sid, k]);
      await fr.click(`.tb[data-k="${k}"]`); await fr.waitForSelector("#endBtn");
      for (let i = 0; i < qs.length; i++) {
        const q = qs[i], prog = await ftxt("#gridBtn"); // Phiên 9o: số câu ở nút mở bảng số câu, không còn chip ở thanh trên
        if (prog !== `Câu ${i + 1}/${qs.length}`) { l27.problems.push(`L27 · ${scheme} · ${sid} Đề ${k + 1}: câu ${i + 1} mà khung ghi "${prog}"`); break; }
        if (q.kind === "mc") await fr.click(i === wrongAt ? `.opt:not([data-o="${q.a}"]) >> nth=0` : `.opt[data-o="${q.a}"]`);
        else await fr.fill("#fillIn", i === wrongAt ? "zzz" : q.ans[0]);
        await fr.click("#goBtn");
      }
      await endRecapMod(fr); // Phiên 9o: trả lời hết thì tới màn "Xem lại bài làm" trước khi nộp
      await fr.waitForSelector("#resBtns");
      return qs;
    };
    for (const [m, who, pin, sid] of [["l6-giua-ki-1", "Na", "4444", "van"], ["l4-giua-ki-1", "Bin", PINS.Bin, "tv"]]) {
      const r = { m, scheme }, key = wrongKeyOf(m, who, sid);
      await signIn(who, pin); await openMod(m);
      await fr.click(`.stab[data-sid="${sid}"]`); await fr.waitForSelector(`.stab[data-sid="${sid}"][aria-pressed="true"]`);
      const name = await fr.evaluate((sid) => SUBJ[sid].name, sid);
      r.empty = same(await getWrong(key), []);
      // Đề 1, sai câu thứ 4: câu đó vào danh sách
      const qs = await doTest(sid, 0, 3);
      r.wrong1 = same(await getWrong(key), [qs[3].key]) && (await ftxt(".score")).startsWith("9,5") && /Ôn câu sai \(1\)/.test(await resBtns()) && !(await fr.$("#wrongNote"));
      await fr.click("#resBtns .ghost"); await fr.waitForSelector(".tb");
      // làm lại Đề 1 đúng hết (làm như thi): câu được bỏ khỏi danh sách, không còn nút "Ôn câu sai"
      await doTest(sid, 0, -1);
      r.clean = same(await getWrong(key), []) && (await ftxt(".score")).startsWith("10") && !/Ôn câu sai/.test(await resBtns()) && !(await fr.$("#wrongNote")) && !(await fr.$(".review"));
      // ghi sẵn một câu ngoài Đề 1 (câu từ lần trước / bài khác), mở lại bài ôn: trang đầu ghi luật mới
      const extra = await fr.evaluate(([sid, keys]) => SUBJ[sid].items.find((it) => !it.rd && !it.g && !keys.includes(it.id)).id, [sid, qs.map((q) => q.key.split("#")[0])]);
      await setWrong(key, [extra]); await openMod(m);
      await fr.click(`.stab[data-sid="${sid}"]`); await fr.waitForSelector(`.stab[data-sid="${sid}"][aria-pressed="true"]`);
      r.home = (await wrongPanel()) === `Có 1 câu bạn từng làm sai ở môn ${name}. Làm đúng câu đó ở bất kì phần nào (ôn theo bài, đề thi thử hay ôn câu sai) thì câu được bỏ khỏi danh sách.` && (await ftxt("#wrongBtn")) === "Ôn 1 câu sai";
      await fr.evaluate(() => document.querySelector("#wrongBtn").scrollIntoView({ block: "center" })); await p.evaluate(() => { const t = document.querySelector("#toast"); if (t) t.hidden = true; }); await p.waitForTimeout(100);
      await p.screenshot({ path: `${OUTL27}trang-dau-${m}-${scheme}.png` }); l27.shots.push(`trang-dau-${m}-${scheme}`);
      // Đề 1 đúng hết: dòng "Lần này bạn không sai câu nào…" ngay trên nút "Ôn câu sai (1)"
      await doTest(sid, 0, -1);
      r.note = (await ftxt("#wrongNote")) === "Lần này bạn không sai câu nào. Danh sách Ôn câu sai còn 1 câu từ các lần làm trước." && (await noteAboveBtns())
        && (await resBtns()) === "Làm Đề 2|Ôn câu sai (1)|Trang chủ" && same(await getWrong(key), [extra]) && (await ftxt(".score")).startsWith("10");
      await check(`${m} kết quả`); await snap(`ket-qua-${m}`);
      l27.runs.push(r);
    }
    // Bài ôn IOE: trả lời đúng câu đang hiện theo dữ liệu trong khung (S.qs[S.i]; mọi dạng câu)
    const answerIoe = async () => {
      const q = await fr.evaluate(() => { const q = S.qs[S.i]; return { o: !!q.o, a: q.a, t: q.t, ans: q.ans, w: q.w, miss: q.miss, tiles: q.tiles, say: !!q.say }; });
      if (q.o || q.t === "e") await fr.click(`.opt[data-o="${q.a}"]`);
      else if (q.ans) await fr.fill("#fillIn", q.ans[0]);
      else if (q.t === "l") for (let j = 0; j < q.miss.length; j++) await fr.fill(`input.letter[data-m="${j}"]`, q.w[q.miss[j]]);
      else for (let i = 0; i < q.tiles.length; i++) await fr.click(`#pool .tile[data-k="${q.tiles.findIndex((t) => t.i === i)}"]`); // xếp từ, xếp chữ: bấm theo thứ tự gốc
      return q.t + (q.say ? "+say" : "");
    };
    for (const [m, who, pin] of [["ioe-4", "Bin", PINS.Bin], ["ioe-6", "Na", "4444"]]) {
      const r = { m, scheme }, key = wrongKeyOf(m, who);
      await signIn(who, pin); await openMod(m);
      const before = await getWrong(key);
      // đề tiếp theo của bài (như nút Start Test), câu trắc nghiệm đầu tiên của đề
      const t = await fr.evaluate(async () => { await TTS.ready; const tk = defaultTrack(), k = nextTest(tk), qs = buildTest(tk, k, !canListen()), i = qs.findIndex((q) => q.o && !q.say); return { i, id: qs[i].id, a: qs[i].a, ids: qs.map((q) => q.id), label: `${TRACKS[tk].name} · Test ${k + 1}` }; });
      await setWrong(key, before.concat(t.id)); await openMod(m);
      const n0 = before.length + 1;
      r.home = (await wrongPanel()) === `You have ${n0} questions to review. Answer one correctly in any practice or test and it leaves the list.` && (await ftxt("#wrongBtn")) === `Review ${n0} questions`;
      await fr.click("#heroBtn"); await fr.waitForSelector("#endBtn");
      r.label = (await ftxt(".qhead .label")) === t.label;
      for (let j = 0; j < t.i; j++) await fr.click("#skipBtn");
      r.at = (await ftxt("#gridBtn")) === `${t.i + 1} of ${t.ids.length}`; // Phiên 9o: số câu ở nút mở bảng số câu
      await fr.click(`.opt[data-o="${t.a}"]`); await fr.click("#goBtn");
      await fr.click("#endBtn"); await fr.waitForSelector("#yesEnd"); await fr.click("#yesEnd"); await fr.waitForSelector("#resBtns");
      // câu làm đúng ra khỏi danh sách; câu bỏ qua, chưa làm vào danh sách
      const want = [...new Set(before.concat(t.ids))].filter((x) => x !== t.id), after = await getWrong(key);
      r.list = same(after, want) && !after.includes(t.id);
      r.result = (await ftxt(".score")) === `1/${t.ids.length}` && /Questions to review \(/.test(await ftxt("#view")) && (await resBtns()).includes(`Review mistakes (${want.length})`) && !(await fr.$("#wrongNote"));
      // Review mistakes: làm đúng một câu rồi End practice: lượt không sai câu nào, danh sách còn câu từ trước
      await fr.click("#resBtns button:has-text('Review mistakes')"); await fr.waitForSelector("#endBtn");
      r.kind = await answerIoe();
      await fr.click("#goBtn"); r.fb = /^Correct!/.test(await ftxt("#fb"));
      await fr.click("#endBtn"); await fr.waitForSelector("#yesEnd"); await fr.click("#yesEnd"); await fr.waitForSelector("#resBtns");
      const n1 = want.length - 1;
      r.note = (await ftxt("#wrongNote")) === `No mistakes this time. Your review list still has ${n1} question${n1 > 1 ? "s" : ""} from earlier.` && (await noteAboveBtns())
        && (await resBtns()) === `Review mistakes (${n1})|Home` && (await getWrong(key)).length === n1 && (await ftxt(".score")) === "1/1" && !(await fr.$(".review"));
      await check(`${m} kết quả`); await snap(`ket-qua-${m}`);
      l27.runs.push(r);
    }
    await c.close();
  }
  { // ghép ảnh sáng/tối cạnh nhau (tests/screenshots/l27/<tên>.jpg)
    const gp = await browser.newPage({ viewport: { width: 752, height: 400 }, deviceScaleFactor: 2 });
    for (const n of [...new Set(l27.shots.map((x) => x.replace(/-(light|dark)$/, "")))]) {
      if (!l27.shots.includes(n + "-light") || !l27.shots.includes(n + "-dark")) continue;
      const img = (sc) => "data:image/png;base64," + fs.readFileSync(`${OUTL27}${n}-${sc}.png`).toString("base64");
      await gp.setContent(`<body style="margin:0;display:flex;gap:16px;padding:8px;background:#888;align-items:flex-start"><img src="${img("light")}" width="360"><img src="${img("dark")}" width="360"></body>`);
      await gp.screenshot({ path: `${OUTL27}${n}.jpg`, fullPage: true, type: "jpeg", quality: 70 });
    }
    await gp.close();
  }
  console.log("L27:", l27.runs, "problems:", l27.problems);
  const l27OK = !l27.problems.length && l27.runs.length === 8 && l27.runs.every((r) => Object.keys(r).every((k) => ["m", "scheme", "kind"].includes(k) || r[k] === true))
    && Object.keys(L27_KEY).every((m) => ["light", "dark"].every((sc) => l27.shots.includes(`ket-qua-${m}-${sc}`)));

  step("lesson pages l4, l6: numbers with thousands spaces stay on one line, no overlapping text (360px, 720px)");
  /* Bài ôn dạng trang l4-giua-ki-1, l6-giua-ki-1 viết số kiểu Việt Nam, ngăn hàng nghìn bằng khoảng trắng thường ("20 000", "2 500 000"); khi hiện
     ra, nbNum của trang đổi khoảng trắng đó thành khoảng trắng không ngắt (hợp đồng với bài ôn, CLAUDE.md). Bố Minh (quản trị, xem thử, không lưu
     điểm) mở từng bài trong khung ở 360px; với mỗi môn: trang đầu (tên bài), phần Ghi nhớ của từng bài, ôn luyện từng bài (mỗi câu lúc mới hiện và
     sau Kiểm tra, rồi màn kết quả), Đề 1 bấm Bỏ qua đến hết rồi màn kết quả (mọi câu cần xem lại, kèm đáp án, lời giải). Trong #view của khung: không
     đoạn chữ (text node) nào còn khoảng trắng thường giữa hai nhóm số, không số nào nằm trên hai dòng (Range.getClientRects), khung không tràn ngang. Câu điền
     trong dữ liệu có đáp án là số từ 4 chữ số: gõ đáp án ngăn hàng nghìn bằng khoảng trắng không ngắt (như chép từ màn hình) vẫn được chấm đúng;
     câu khác trả lời sai (ô điền) hoặc chọn ô đầu tiên, để thấy đáp án và lời giải.
     Chữ đè (chủ app yêu cầu 22/10/2026): mỗi màn trên còn chạy audit(…, "chữ") trong khung (chữ không đè lên nhau, không tràn khỏi ô). Trang đầu: bài
     có số ("Bài 3", "Bài 22–23") có cột số bài đúng tên ngắn; bài có tên ngắn là chữ (Tiếng Việt 4: “DT chung, riêng”, “Tên cơ quan”; Ngữ văn 6:
     “Từ đơn, từ phức”, “Biện pháp tu từ”…) không có cột số (.lrow.plain), chỉ có tên bài; tiêu đề phần Ghi nhớ là “Bài 3. <tên bài>” hoặc chỉ tên bài
     (trước đây “Nghĩa của từ. Nghĩa của từ”). Ở 720px (máy tính bảng) mở lại trang đầu và phần Ghi nhớ của mọi bài; IOE 4, IOE 6 ở 360px và 720px:
     trang đầu, câu đầu của Unit 1 trước và sau Check, câu đầu của Test 1, màn kết quả.
     L36 (Phiên 9l): trang môn KHTN của l6 đánh số bài, tên chương theo mục lục sách KHTN 6 Kết nối tri thức (bài ôn gốc theo sách Chân trời
     sáng tạo): đúng tên chương, số bài và thứ tự bài; mỗi phạm vi đề thi thử ghi đúng các bài sách của các bài trong phạm vi (ở nút chọn phạm vi
     và dòng phạm vi đầu trang), bài cùng một bài sách thì cùng phạm vi; không còn "Bài 35", "Bài 36", "Thang nhiệt độ Celsius".
     L37 (Phiên 9m): phần Ngữ văn của l6 theo sách Ngữ văn 6 tập một in năm 2026: phần Ghi nhớ của Bài 1, Bài 2 hiện ý về «Tia nắng hạt mưa»
     (Lệ Bình), «Hương và Phai» (Nguyễn Minh Châu); không còn tên hai văn bản cũ, tác giả, nhân vật của chúng; tên tác giả, nhân vật của hai văn
     bản mới chỉ làm lựa chọn sai ở câu hỏi về chính văn bản đó; bài của từng câu trong items giữ như cũ (lres lưu theo id bài, “Ôn câu sai”
     theo số thứ tự câu).
     L40, L41 (Phiên 9p): phần Toán, Tiếng Việt của l4 theo sách Toán 4, Tiếng Việt 4 tập một in năm 2026: phần Ghi nhớ của bài Động từ (n4)
     không còn “đã, đang, sẽ”, có động từ chỉ hoạt động di chuyển; lớp triệu ở Ghi nhớ Bài 11, số một tỉ ở Bài 12; mục Viết “Viết đoạn văn nêu
     ý kiến” là ý kiến về một câu chuyện (Mở đầu – Triển khai – Kết thúc), dàn ý và bảng kiểm của “Viết báo cáo thảo luận nhóm” có quốc hiệu,
     tiêu ngữ, người nhận, chữ kí (trang Viết mở ra ở 360px, chạy audit); không còn “Tìm x”, “Tổng của hai số lẻ”, “Nam Định”; bài và dạng câu
     của từng câu trong items, tên và thứ tự 4 mục Viết giữ như cũ (lres theo id bài, “Ôn câu sai” theo số thứ tự câu, wdraft_, wchk_ theo số
     thứ tự mục).
     L42 (Phiên 9q): phần Toán của l6 theo sách Toán 6 tập một in năm 2026: Ghi nhớ Bài 2 viết số La Mã bằng năm thành phần, số bằng tổng giá trị
     các thành phần (không còn quy tắc trừ); Ghi nhớ Bài 5 có “0 ≤ r < b”, r = 0 là phép chia hết; số đối ở Ghi nhớ Bài 14, không ở Bài 13 (kể
     cả trang Ghi nhớ đang hiện); không còn “ước nguyên của”, “NHA TRANG”, “Các bội của 6 nhỏ hơn 30”; bài và dạng câu của từng câu trong items
     giữ như cũ (lres theo id bài, “Ôn câu sai” theo số thứ tự câu). */
  const L42 = {
    items: "b1×5 b2×4 b3×4 b4×3 b5×4 b6×5 b7×3 b8×3 b9×4 b10×4 b11×3 b12×3 b13×4 b14×3 b15×3 b16×3 b17×4",
    kinds: "oooggooggotggffgffggoogggoggoogtgggooggfggfggoogggggoggoggoogg",
    notes: { b2: /năm thành phần: I = 1, V = 5, X = 10, IV = 4, IX = 9/, b5: /0 ≤ r < b/, b14: /số đối/ },
    old: /thì trừ|0 < r|ước nguyên của|NHA TRANG|Các bội của 6 nhỏ hơn 30|tính chất đặc trưng/g,
  };
  const l42 = { data: null, screen: {} };
  const L40 = {
    items: { toan: "b1×5 b2×5 b3×5 b4×4 b5×3 b7×4 b8×5 b10×4 b11×3 b12×4 b13×3 b14×3 b15×4 b17×4 b18×4 b19×4", tv: "n1×14 n2×14 n3×10 n4×16 n5×10 d1×6" },
    // dạng từng câu: o trắc nghiệm 4 lựa chọn, t đúng/sai, f điền, g sinh ngẫu nhiên, r bài đọc 4 câu
    kinds: { toan: "ofoggfffggooftgffggfggoooooootgofggoggooggoggoggotfgooggofggofgg", tv: "ooooooooootoooooooottoffooofoooooffttoooooooooooottooooooooootoorrrrrr" },
    writing: "Viết đoạn văn nêu ý kiến|Viết báo cáo thảo luận nhóm|Viết bài văn thuật lại một sự việc|Viết bài văn kể lại một câu chuyện",
    notes: { "toan b11": /hàng triệu, hàng chục triệu, hàng trăm triệu/, "toan b12": /1 000 000 000, đọc là một tỉ/, "tv n4": /di chuyển/ },
    old: /Tìm x|Tổng của hai số lẻ|mười triệu viết là|Số liền sau hơn số liền trước|Nam Định/gi,
  };
  const l40 = { data: {}, screen: {}, writing: [] };
  const L37 = {
    notes: { v1: "“Tia nắng hạt mưa” (Lệ Bình)", v2: "“Hương và Phai” (trích, Nguyễn Minh Châu)" },
    items: "v1×13 v2×13 v3×11 t1×14 t2×10 t3×13 t4×10 d×6",
    old: /Bắt nạt|Bức tranh của em gái tôi|Nguyễn Thế Hoàng Linh|Tạ Duy Anh|Kiều Phương/g,
    names: [["Tia nắng hạt mưa", /Lệ Bình/], ["Hương và Phai", /Nguyễn Minh Châu|(^|[^\p{L}])(Hương|Phai|Định)(?!\p{L})/u]],
  };
  const l37 = { data: null, screen: {} };
  const L36 = {
    chapters: ["Chương I. Mở đầu về Khoa học tự nhiên", "Chương II. Chất quanh ta", "Chương III. Một số vật liệu, nguyên liệu, nhiên liệu, lương thực – thực phẩm thông dụng",
      "Chương IV. Hỗn hợp. Tách chất ra khỏi hỗn hợp", "Chương V. Tế bào", "Chương VI. Từ tế bào đến cơ thể", "Chương VIII. Lực trong đời sống"],
    lessons: "k1 Bài 1|k2 Bài 1|k3 Bài 2–4|k4 Bài 5|k5 Bài 6|k6 Bài 7|k7 Bài 8|k8 Bài 9–10|k9 Bài 11|k10 Bài 11|k11 Bài 12|k13 Bài 13|k12 Bài 14|k14 Bài 15|k15 Bài 16|k17 Bài 18–20|k18 Bài 21|k19 Bài 22–23|k36 Bài 40|k35 Bài 40–41",
    notes: ["Bài 1–16", "Bài 1–11, 18–23, 40–41"],
  };
  let l36 = null;
  const mn = { problems: [], seen: {}, screens: 0, typed: [], want: 0 };
  // chữ đè (22/10/2026): ov.problems ghi chỗ sai, ov.screens số màn đã xét, ov.plain số dòng bài không đánh số đã thấy
  const ov = { problems: [], screens: 0, plain: 0, titles: 0 };
  const chu = async (fr, label) => { (await fr.evaluate(audit, "chữ")).forEach((x) => ov.problems.push(`${label}: ${x}`)); ov.screens++; };
  // trang đầu của một môn: bài có số có cột số bài đúng tên ngắn; bài khác là .lrow.plain, không có cột số
  const lessonRows = async (fr, sid, label) => {
    const r = await fr.evaluate((sid) => ({ plain: document.querySelectorAll("#view .lrow.plain").length, bad: SUBJ[sid].lessons.filter((l) => {
      const b = document.querySelector(`#view .lrow[data-l="${l.id}"]`), n = b && b.querySelector(".lnum");
      return !(b && (/^Bài\s/.test(l.short) ? n && n.textContent === l.short && !b.classList.contains("plain") : !n && b.classList.contains("plain")));
    }).map((l) => l.id + " " + l.short) }), sid);
    ov.plain += r.plain; r.bad.forEach((x) => ov.problems.push(`${label}: dòng bài ${x}`));
  };
  // phần Ghi nhớ: tiêu đề "Bài 3. <tên bài>", bài không đánh số chỉ có tên bài (không "Nghĩa của từ. Nghĩa của từ")
  const lessonTitle = async (fr, sid, l, label) => {
    const got = await fr.evaluate(([sid, l]) => { const L = SUBJ[sid].L[l], t = document.querySelector("#view h2").textContent.replace(/\s+/g, " ");
      return t === ((/^Bài\s/.test(L.short) ? L.short + ". " : "") + L.name).replace(/\s+/g, " ") ? null : t; }, [sid, l]);
    ov.titles++; if (got) ov.problems.push(`${label}: tiêu đề "${got}"`);
  };
  {
    const c = await newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2 });
    await localConfig(c); watchOut(c);
    const p = await c.newPage(); p.on("pageerror", (e) => errs.push("pageerror số bài ôn: " + e.message)); p.on("console", (m) => { if (m.type() === "error") errs.push("console số bài ôn: " + m.text()); });
    await p.goto(BASE + "/"); await p.click(`.tile[data-u="${ids["Bố Minh"]}"]`); await p.fill("#pinIn", PINS["Bố Minh"]); await p.waitForTimeout(400);
    for (const m of ["l4-giua-ki-1", "l6-giua-ki-1"]) {
      let fr = null;
      await p.goto(BASE + "/#/home"); await p.waitForTimeout(150); await p.goto(BASE + "/#/play/" + m);
      for (let i = 0; i < 60 && !(fr = p.frames().find((f) => f.url().includes(`/modules/${m}/`))); i++) await p.waitForTimeout(100);
      await fr.waitForSelector(".stab");
      mn.seen[m] = 0;
      // số có nhóm hàng nghìn trong #view của khung: còn khoảng trắng thường (kể cả chữ đang ẩn), hoặc đang hiện mà nằm trên hai dòng (các ô chữ của Range lệch nhau quá nửa dòng)
      const check = async (label) => {
        const r = await fr.evaluate(() => {
          const bad = [], re = /\d+(?:[ \u00a0]\d{3})+(?!\d)/g;
          let seen = 0;
          if (document.documentElement.scrollWidth > innerWidth) bad.push("tràn ngang: rộng " + document.documentElement.scrollWidth + "px");
          const tw = document.createTreeWalker(document.querySelector("#view"), NodeFilter.SHOW_TEXT);
          for (let n; (n = tw.nextNode());) for (const x of n.textContent.matchAll(re)) {
            if (x[0].includes(" ")) bad.push(`khoảng trắng thường: "${x[0]}"`);
            const rg = document.createRange(); rg.setStart(n, x.index); rg.setEnd(n, x.index + x[0].length);
            const rs = [...rg.getClientRects()].filter((b) => b.width > 0 && b.height > 0), tops = rs.map((b) => b.top);
            if (!rs.length) continue;
            seen++;
            if (Math.max(...tops) - Math.min(...tops) > Math.min(...rs.map((b) => b.height)) / 2) bad.push(`hai dòng: "${x[0].replace(/\u00a0/g, " ")}"`);
          }
          return { bad, seen };
        });
        mn.seen[m] += r.seen; mn.screens++;
        r.bad.forEach((x) => mn.problems.push(`${m} · ${label}: ${x}`));
        await chu(fr, `360 · ${m} · ${label}`);
      };
      // câu điền đang hiện là câu trong dữ liệu có đáp án số từ 4 chữ số: đáp án ngăn hàng nghìn bằng khoảng trắng không ngắt ("50 000"); không thì null
      const nbAns = (sid) => fr.evaluate((sid) => {
        const flat = (s) => String(s).replace(/<[^>]+>/g, "").replace(/___/g, "").replace(/\s+/g, ""), t = flat(document.querySelector(".qtext").textContent);
        const it = document.querySelector("#fillIn") && SUBJ[sid].items.find((x) => x.q && x.ans != null && flat(x.q) === t), a = it && String(it.ans).split("|")[0];
        return a && /^\d{4,}$/.test(a) ? a.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0") : null;
      }, sid);
      for (const sid of await fr.$$eval(".stab", (bs) => bs.map((b) => b.dataset.sid))) {
        await fr.click(`.stab[data-sid="${sid}"]`); await fr.waitForSelector(`.stab[data-sid="${sid}"][aria-pressed="true"]`);
        await check(`${sid}, trang đầu`); await lessonRows(fr, sid, `360 · ${m} · ${sid}, trang đầu`);
        if (m === "l6-giua-ki-1" && sid === "khtn") l36 = await fr.evaluate(() => ({
          groups: [...document.querySelectorAll("#view .grp")].map((g) => [g.querySelector(".grp-h").textContent, [...g.querySelectorAll(".lrow")].map((b) => b.dataset.l + " " + b.querySelector(".lnum").textContent)]),
          seg: [...document.querySelectorAll("#view .seg button")].map((b) => b.textContent), scopeText: SUBJ.khtn.scopeText,
          scopes: SUBJ.khtn.test.scopes.map((x) => ({ note: x.note, lessons: x.lessons })), shorts: SUBJ.khtn.lessons.map((l) => [l.id, l.short]),
          text: JSON.stringify([SUBJ.khtn.lessons, SUBJ.khtn.test, SUBJ.khtn.scopeText, SUBJ.khtn.items]) + document.querySelector("#view").textContent,
        }));
        if (m === "l6-giua-ki-1" && sid === "van") l37.data = await fr.evaluate(() => ({
          notes: Object.fromEntries(SUBJ.van.lessons.map((l) => [l.id, l.notes])),
          items: SUBJ.van.items.reduce((a, it) => { const z = a[a.length - 1]; if (z && z[0] === it.l) z[1]++; else a.push([it.l, 1]); return a; }, []).map(([l, n]) => l + "×" + n).join(" "),
          qs: SUBJ.van.items.flatMap((it) => (it.qs || [it]).map((x) => [(it.qs ? it.t + " · " : "") + x.q, (x.o || []).filter((_, i) => i !== (x.a || 0))])),
          text: JSON.stringify([SUBJ.van.lessons, SUBJ.van.items, SUBJ.van.writing, SUBJ.van.scopeText]) + document.querySelector("#view").textContent,
        }));
        if (m === "l6-giua-ki-1" && sid === "toan") l42.data = await fr.evaluate(() => ({
          notes: Object.fromEntries(SUBJ.toan.lessons.map((l) => [l.id, l.notes])),
          items: SUBJ.toan.items.reduce((a, it) => { const z = a[a.length - 1]; if (z && z[0] === it.l) z[1]++; else a.push([it.l, 1]); return a; }, []).map(([l, n]) => l + "×" + n).join(" "),
          kinds: SUBJ.toan.items.map((it) => (it.g ? "g" : it.o ? (it.o.length === 4 ? "o" : "?") : it.tf !== undefined ? "t" : "f")).join(""),
          text: JSON.stringify([SUBJ.toan.lessons, SUBJ.toan.items]) + document.querySelector("#view").textContent,
        }));
        if (m === "l4-giua-ki-1") l40.data[sid] = await fr.evaluate((sid) => ({
          notes: Object.fromEntries(SUBJ[sid].lessons.map((l) => [l.id, l.notes])),
          items: SUBJ[sid].items.reduce((a, it) => { const z = a[a.length - 1]; if (z && z[0] === it.l) z[1]++; else a.push([it.l, 1]); return a; }, []).map(([l, n]) => l + "×" + n).join(" "),
          kinds: SUBJ[sid].items.map((it) => (it.rd ? (it.qs.length === 4 ? "r" : "?") : it.g ? "g" : it.o ? (it.o.length === 4 ? "o" : "?") : it.tf !== undefined ? "t" : "f")).join(""),
          writing: (SUBJ[sid].writing || []).map((w) => ({ title: w.title, prompt: w.prompt, outline: w.outline, checklist: w.checklist })),
          text: JSON.stringify([SUBJ[sid].lessons, SUBJ[sid].items, SUBJ[sid].writing || []]) + document.querySelector("#view").textContent,
        }), sid);
        mn.want += await fr.evaluate((sid) => SUBJ[sid].items.filter((x) => x.q && x.ans != null && /^\d{4,}$/.test(String(x.ans).split("|")[0])).length, sid);
        for (const l of await fr.$$eval(".lrow", (bs) => bs.map((b) => b.dataset.l))) {
          await fr.click(`.lrow[data-l="${l}"]`); await check(`${sid} ${l}, ghi nhớ`); await lessonTitle(fr, sid, l, `360 · ${m} · ${sid} ${l}, ghi nhớ`);
          if (m === "l6-giua-ki-1" && sid === "van" && L37.notes[l]) l37.screen[l] = await fr.$$eval("#view .notes li", (li) => li.map((x) => x.textContent.replace(/\s+/g, " ")));
          if (m === "l6-giua-ki-1" && sid === "toan") l42.screen[l] = await fr.$$eval("#view .notes li", (li) => li.map((x) => x.textContent.replace(/\s+/g, " ")));
          if (m === "l4-giua-ki-1") l40.screen[`${sid} ${l}`] = await fr.$$eval("#view .notes li", (li) => li.map((x) => x.textContent.replace(/\s+/g, " ")));
          await fr.click("#goBtn");
          for (let i = 1; i <= 80 && (await fr.$("#skipBtn")); i++) {
            await check(`${sid} ${l}, câu ${i}`);
            const typed = await nbAns(sid);
            if (typed) await fr.fill("#fillIn", typed); else if (await fr.$("#fillIn")) await fr.fill("#fillIn", "zz"); else await fr.click(".opt >> nth=0");
            await fr.click("#goBtn"); await check(`${sid} ${l}, câu ${i}, sau Kiểm tra`);
            if (typed) mn.typed.push(!!(await fr.$("#fb .fb.ok")));
            await fr.click("#goBtn");
          }
          await check(`${sid} ${l}, kết quả`); await fr.click("#homeBtn");
        }
        // L41: hai mục Viết đầu của l4 (đoạn văn nêu ý kiến, báo cáo thảo luận nhóm), mở cả phần gợi ý dàn ý
        if (m === "l4-giua-ki-1" && sid === "tv") for (const w of [0, 1]) {
          await fr.click(`.wrow[data-w="${w}"]`); await fr.click("#view details.outline summary");
          await check(`${sid} Viết ${w + 1}`);
          l40.writing[w] = await fr.evaluate(() => ({ title: document.querySelector("#view h2").textContent,
            outline: [...document.querySelectorAll("#view details.outline li")].map((x) => x.textContent.replace(/\s+/g, " ")),
            checklist: [...document.querySelectorAll("#view .check span")].map((x) => x.textContent.replace(/\s+/g, " ")) }));
          await fr.click("#backBtn"); await fr.waitForSelector(".stab");
        }
        await fr.click('.tb[data-k="0"]');
        for (let i = 1; i <= 60 && (await fr.$("#skipBtn")); i++) { await check(`${sid} Đề 1, câu ${i}`); await fr.click("#skipBtn"); }
        await check(`${sid} Đề 1, xem lại bài làm`); await endRecapMod(fr); // Phiên 9o: bỏ qua hết thì tới màn "Xem lại bài làm", nộp thì câu trống tính sai
        await check(`${sid} Đề 1, kết quả`); await fr.click("#homeBtn");
      }
    }
    await c.close();
  }
  // chữ đè: 720px (máy tính bảng) trang đầu và phần Ghi nhớ của mọi bài ở l4, l6; IOE 4, IOE 6 ở 360px và 720px
  for (const w of [360, 720]) {
    const c = await newContext({ storageState: state, viewport: { width: w, height: w === 360 ? 740 : 1000 } });
    await localConfig(c); watchOut(c);
    const p = await c.newPage(); p.on("pageerror", (e) => errs.push(`pageerror chữ đè ${w}: ` + e.message));
    await p.goto(BASE + "/"); await p.click(`.tile[data-u="${ids["Bố Minh"]}"]`); await p.fill("#pinIn", PINS["Bố Minh"]); await p.waitForTimeout(400);
    const frameOf = async (m) => {
      await p.goto(BASE + "/#/home"); await p.waitForTimeout(150); await p.goto(BASE + "/#/play/" + m);
      let fr = null; for (let i = 0; i < 60 && !(fr = p.frames().find((f) => f.url().includes(`/modules/${m}/`))); i++) await p.waitForTimeout(100);
      return fr;
    };
    for (const m of w === 720 ? ["l4-giua-ki-1", "l6-giua-ki-1"] : []) {
      const fr = await frameOf(m); await fr.waitForSelector(".stab");
      for (const sid of await fr.$$eval(".stab", (bs) => bs.map((b) => b.dataset.sid))) {
        await fr.click(`.stab[data-sid="${sid}"]`); await fr.waitForSelector(`.stab[data-sid="${sid}"][aria-pressed="true"]`);
        await chu(fr, `${w} · ${m} · ${sid}, trang đầu`); await lessonRows(fr, sid, `${w} · ${m} · ${sid}, trang đầu`);
        for (const l of await fr.$$eval(".lrow", (bs) => bs.map((b) => b.dataset.l))) {
          await fr.click(`.lrow[data-l="${l}"]`); await chu(fr, `${w} · ${m} · ${sid} ${l}, ghi nhớ`); await lessonTitle(fr, sid, l, `${w} · ${m} · ${sid} ${l}, ghi nhớ`);
          await fr.click("#backBtn"); await fr.waitForSelector(".stab");
        }
      }
    }
    for (const m of ["ioe-4", "ioe-6"]) {
      const fr = await frameOf(m); await fr.waitForSelector("#heroBtn");
      const at = (label) => chu(fr, `${w} · ${m} · ${label}`);
      // trả lời câu đang hiện, dạng nào cũng được: chọn ô đầu, gõ vào ô điền, chạm hết các ô chữ cần sắp xếp
      const answer = async () => {
        if (await fr.$(".opt")) return fr.click(".opt >> nth=0");
        for (const b of await fr.$$("input.blank.letter")) await b.fill("z");
        if (await fr.$("#fillIn")) return fr.fill("#fillIn", "zz");
        for (let k = 0; k < 20; k++) { const t = fr.locator("#pool .tile:visible:not([disabled])").first(); if (!(await t.count())) break; await t.click(); }
      };
      await at("trang đầu");
      await fr.click('.unit[data-u="1"]'); await fr.waitForSelector("#endBtn", { timeout: 15000 });
      await at("Unit 1, câu 1"); await answer(); await fr.click("#goBtn"); await at("Unit 1, câu 1, sau Check");
      await fr.click("#endBtn"); await fr.click("#yesEnd"); await fr.waitForSelector("#resBtns"); await at("Unit 1, kết quả");
      await fr.click("#homeBtn"); await fr.click("#heroBtn"); await fr.waitForSelector("#endBtn", { timeout: 15000 }); await at("Test 1, câu 1");
      await fr.click("#endBtn"); await fr.click("#yesEnd"); await fr.waitForSelector("#resBtns"); await at("Test 1, kết quả");
    }
    await c.close();
  }
  console.log("chữ đè (bài ôn dạng trang):", { screens: ov.screens, plain: ov.plain, titles: ov.titles }, "problems:", ov.problems.length, ov.problems.slice(0, 30));
  const overlapOK = !ov.problems.length && ov.screens > 500 && ov.plain > 0 && ov.titles > 0;
  console.log("số trong bài ôn dạng trang:", { screens: mn.screens, seen: mn.seen, typed: mn.typed, want: mn.want }, "problems:", mn.problems.length, mn.problems.slice(0, 30));
  const modNumOK = !mn.problems.length && mn.seen["l4-giua-ki-1"] > 200 && mn.seen["l6-giua-ki-1"] > 20 && mn.want > 0 && mn.typed.length === mn.want && mn.typed.every(Boolean);
  const l36Errs = [];
  if (!l36) l36Errs.push("không đọc được trang môn KHTN");
  else {
    const nums = (s) => { const x = /^Bài (\d+)(?:–(\d+))?$/.exec(s); return x ? Array.from({ length: +(x[2] || x[1]) - +x[1] + 1 }, (_, i) => +x[1] + i) : []; }; // "Bài 18–20" → 18, 19, 20
    const range = (ns) => "Bài " + ns.sort((a, b) => a - b).reduce((acc, n) => { const z = acc[acc.length - 1]; if (z && n === z[1] + 1) z[1] = n; else acc.push([n, n]); return acc; }, [])
      .map(([a, b]) => (a === b ? String(a) : a + "–" + b)).join(", ");
    if (l36.groups.map((g) => g[0]).join("|") !== L36.chapters.join("|")) l36Errs.push("chương: " + l36.groups.map((g) => g[0]).join(" | "));
    if (l36.groups.flatMap((g) => g[1]).join("|") !== L36.lessons) l36Errs.push("bài: " + l36.groups.flatMap((g) => g[1]).join(" | "));
    l36.scopes.forEach((sc, i) => {
      const cov = new Set(l36.shorts.filter(([id]) => sc.lessons.includes(id)).flatMap(([, s]) => nums(s)));
      const out = l36.shorts.filter(([id, s]) => !sc.lessons.includes(id) && nums(s).some((n) => cov.has(n))).map(([id]) => id);
      if (sc.note !== L36.notes[i] || range([...cov]) !== sc.note) l36Errs.push(`phạm vi ${i + 1}: ghi "${sc.note}", các bài ${range([...cov])}`);
      if (out.length) l36Errs.push(`phạm vi ${i + 1} thiếu ${out.join(", ")} (cùng bài sách với bài đã có)`);
    });
    if (l36.seg.join("|") !== `Cuốn chiếu${L36.notes[0]}|Song song${L36.notes[1]}`) l36Errs.push("nút phạm vi: " + l36.seg.join(" | "));
    if (!l36.scopeText.includes(`cuốn chiếu: ${L36.notes[0]}.`) || !l36.scopeText.includes(`song song: ${L36.notes[1]}.`)) l36Errs.push("dòng phạm vi: " + l36.scopeText);
    const old = l36.text.match(/Bài 3[56]\b|Thang nhiệt độ Celsius/g);
    if (old) l36Errs.push("còn chữ cũ: " + [...new Set(old)].join(", "));
  }
  console.log("L36 (KHTN 6 theo sách Kết nối tri thức):", l36Errs.length ? l36Errs : "OK");
  const l36OK = !l36Errs.length;
  const l37Errs = [];
  if (!l37.data) l37Errs.push("không đọc được trang môn Ngữ văn");
  else {
    Object.entries(L37.notes).forEach(([l, want]) => {
      if (!l37.data.notes[l].some((n) => n.startsWith(want))) l37Errs.push(`Ghi nhớ ${l} không có ${want}`);
      if (!(l37.screen[l] || []).some((n) => n.startsWith(want))) l37Errs.push(`trang Ghi nhớ ${l} không hiện ${want}`);
    });
    if (l37.data.items !== L37.items) l37Errs.push("bài của các câu: " + l37.data.items);
    const old = (l37.data.text + Object.values(l37.screen).flat().join(" ")).match(L37.old);
    if (old) l37Errs.push("còn chữ cũ: " + [...new Set(old)].join(", "));
    l37.data.qs.forEach(([q, wrong]) => L37.names.forEach(([title, re]) => {
      const bad = q.includes(title) ? [] : wrong.filter((x) => re.test(x));
      if (bad.length) l37Errs.push(`lựa chọn sai mang tên của «${title}»: ${q} → ${bad.join(", ")}`);
    }));
  }
  console.log("L37 (Ngữ văn 6 theo sách in năm 2026):", l37Errs.length ? l37Errs : "OK");
  const l37OK = !l37Errs.length;
  const l40Errs = [];
  if (!l40.data.toan || !l40.data.tv) l40Errs.push("không đọc được trang môn Toán, Tiếng Việt của l4");
  else {
    for (const sid of ["toan", "tv"]) {
      if (l40.data[sid].items !== L40.items[sid]) l40Errs.push(`${sid}: bài của các câu: ${l40.data[sid].items}`);
      if (l40.data[sid].kinds !== L40.kinds[sid]) l40Errs.push(`${sid}: dạng các câu: ${l40.data[sid].kinds}`);
    }
    Object.entries(L40.notes).forEach(([k, re]) => {
      const [sid, l] = k.split(" ");
      if (!l40.data[sid].notes[l].some((n) => re.test(n))) l40Errs.push(`Ghi nhớ ${k} không có ${re}`);
      if (!(l40.screen[k] || []).some((n) => re.test(n))) l40Errs.push(`trang Ghi nhớ ${k} không hiện ${re}`);
    });
    if (l40.data.toan.notes.b12.some((n) => /hàng chục triệu/.test(n))) l40Errs.push("lớp triệu còn ở Ghi nhớ Bài 12");
    const dds = /(^|[^\p{L}])(đã|đang|sẽ)(?!\p{L})/u;
    if (l40.data.tv.notes.n4.some((n) => dds.test(n)) || (l40.screen["tv n4"] || []).some((n) => dds.test(n))) l40Errs.push("Ghi nhớ bài Động từ còn “đã, đang, sẽ”");
    const old = (l40.data.toan.text + l40.data.tv.text + Object.values(l40.screen).flat().join(" ")).match(L40.old);
    if (old) l40Errs.push("còn chữ cũ: " + [...new Set(old)].join(", "));
    const W = l40.data.tv.writing;
    if (W.map((w) => w.title).join("|") !== L40.writing || W.some((w) => w.checklist.length !== 5)) l40Errs.push("mục Viết: " + W.map((w) => `${w.title} (${w.checklist.length})`).join(" | "));
    if (!/một câu chuyện/.test(W[0].prompt) || !/thích hay không thích/.test(W[0].prompt + W[0].outline.join(" ")) || W[0].outline.map((x) => x.split(":")[0]).join("|") !== "Mở đầu|Triển khai|Kết thúc") l40Errs.push("Viết đoạn văn nêu ý kiến: " + W[0].prompt);
    for (const word of ["quốc hiệu", "tiêu ngữ", "người nhận", "chữ kí"]) {
      if (!W[1].outline.some((x) => x.toLowerCase().includes(word)) || !W[1].checklist.some((x) => x.toLowerCase().includes(word))) l40Errs.push(`báo cáo thảo luận nhóm: dàn ý, bảng kiểm chưa có “${word}”`);
      if (!l40.writing[1] || !l40.writing[1].outline.some((x) => x.toLowerCase().includes(word)) || !l40.writing[1].checklist.some((x) => x.toLowerCase().includes(word))) l40Errs.push(`trang Viết báo cáo thảo luận nhóm không hiện “${word}”`);
    }
    if (!l40.writing[0] || l40.writing[0].title !== W[0].title || l40.writing[0].outline.length !== 3) l40Errs.push("trang Viết đoạn văn nêu ý kiến: " + JSON.stringify(l40.writing[0]));
  }
  console.log("L40, L41 (bài ôn lớp 4 theo sách in năm 2026):", l40Errs.length ? l40Errs : "OK");
  const l40OK = !l40Errs.length;
  const l42Errs = [];
  if (!l42.data) l42Errs.push("không đọc được trang môn Toán của l6");
  else {
    if (l42.data.items !== L42.items) l42Errs.push("bài của các câu: " + l42.data.items);
    if (l42.data.kinds !== L42.kinds) l42Errs.push("dạng các câu: " + l42.data.kinds);
    Object.entries(L42.notes).forEach(([l, re]) => {
      if (!l42.data.notes[l].some((n) => re.test(n))) l42Errs.push(`Ghi nhớ ${l} không có ${re}`);
      if (!(l42.screen[l] || []).some((n) => re.test(n))) l42Errs.push(`trang Ghi nhớ ${l} không hiện ${re}`);
    });
    if ([...l42.data.notes.b13, ...(l42.screen.b13 || [])].some((n) => /đối/.test(n))) l42Errs.push("số đối còn ở Ghi nhớ Bài 13");
    const old = (l42.data.text + Object.values(l42.screen).flat().join(" ")).match(L42.old);
    if (old) l42Errs.push("còn chữ cũ: " + [...new Set(old)].join(", "));
  }
  console.log("L42 (Toán 6 của bài ôn lớp 6 theo sách in năm 2026):", l42Errs.length ? l42Errs : "OK");
  const l42OK = !l42Errs.length;

  step("selected answer: one blue in every subject (lesson pages l4, l6, IOE)");
  /* Ô đang chọn (chưa kiểm tra) và ô điền đang gõ của 4 bài ôn dạng trang dùng một màu ở mọi môn (chủ app yêu cầu 21/10/2026): token --pick,
     --pick-soft của trang, cùng giá trị với .opt.sel của app (--acc, --acc-soft của css/app.css), cả sáng và tối. Trước đây ô đang chọn theo màu
     của môn: Tiếng Việt, Ngữ văn hồng (giống câu sai), KHTN xanh lá (giống câu đúng), IOE 4 xanh mòng két. Mở từng trang (không qua khung): ở mỗi
     môn của l4, l6, ôn luyện từ bài đầu tiên, chọn một ô ở câu trắc nghiệm đầu tiên và gõ vào ô điền đầu tiên (câu khác bấm Bỏ qua); IOE: Start
     Test, chọn một ô ở câu trắc nghiệm đầu tiên. Màu viền và nền phải bằng màu .opt.sel của app, màu đó khác màu câu đúng, câu sai. */
  const pick = { problems: [], seen: [] };
  for (const scheme of ["light", "dark"]) {
    const c = await newContext({ viewport: { width: 360, height: 740 }, colorScheme: scheme });
    await localConfig(c); watchOut(c);
    const p = await c.newPage(); p.on("pageerror", (e) => errs.push("pageerror ô đang chọn: " + e.message));
    await p.goto(BASE + "/");
    const [want, right, wrong] = await p.evaluate(() => ["opt sel", "opt right", "opt wrong"].map((cls) => {
      const b = document.createElement("button"); b.className = cls; document.body.append(b);
      const cs = getComputedStyle(b), v = cs.borderTopColor + " / " + cs.backgroundColor; b.remove(); return v;
    }));
    if (want === right || want === wrong) pick.problems.push(`${scheme} · app: ô đang chọn trùng màu câu đúng hoặc câu sai (${want})`);
    const colors = (sel, side) => p.evaluate(([sel, side]) => { const b = document.querySelector(sel); if (!b) return ""; const cs = getComputedStyle(b); return cs[side] + " / " + cs.backgroundColor; }, [sel, side]);
    const look = (what, got) => { pick.seen.push(`${scheme} ${what}`); if (got !== want) pick.problems.push(`${scheme} · ${what}: ${got || "không thấy"} (app: ${want})`); };
    for (const [m, sids] of [["l4-giua-ki-1", ["toan", "tv"]], ["l6-giua-ki-1", ["toan", "van", "khtn"]]]) {
      let fills = 0;
      for (const sid of sids) {
        let mc = false, fill = false;
        for (let l = 0; l < 6 && !(mc && fill); l++) {
          await p.goto(`${BASE}/modules/${m}/index.html?u=pick&m=${m}`); await p.waitForSelector(".stab");
          await p.click(`.stab[data-sid="${sid}"]`); await p.waitForSelector(`.stab[data-sid="${sid}"][aria-pressed="true"]`);
          const row = (await p.$$(".lrow[data-l]"))[l]; if (!row) break;
          await row.click(); await p.click("#goBtn"); await p.waitForSelector("#skipBtn");
          for (let i = 0; i < 40 && !(mc && fill) && (await p.$("#skipBtn")); i++) {
            if (!mc && (await p.$(".opt"))) { await p.click(".opt >> nth=-1"); look(`${m} ${sid} ô đang chọn`, await colors(".opt.sel", "borderTopColor")); mc = true; }
            else if (!fill && (await p.$("#fillIn"))) { await p.fill("#fillIn", "abc"); look(`${m} ${sid} ô điền`, await colors("#fillIn", "borderBottomColor")); fill = true; fills++; }
            await p.click("#skipBtn"); await p.waitForTimeout(50);
          }
        }
        if (!mc) pick.problems.push(`${scheme} · ${m} ${sid}: không gặp câu trắc nghiệm nào`);
      }
      if (!fills) pick.problems.push(`${scheme} · ${m}: không gặp câu điền nào`);
    }
    for (const m of ["ioe-4", "ioe-6"]) {
      await p.goto(`${BASE}/modules/${m}/index.html?u=pick&m=${m}`); await p.waitForSelector("#heroBtn");
      await p.click("#heroBtn"); await p.waitForSelector("#endBtn");
      for (let j = 0; j < 40 && !(await p.$(".opt")); j++) await p.click("#skipBtn");
      await p.click(".opt >> nth=-1"); look(`${m} ô đang chọn`, await colors(".opt.sel", "borderTopColor"));
    }
    await c.close();
  }
  console.log("ô đang chọn:", pick.seen.length, "chỗ", pick.problems.length ? pick.problems : "OK");
  const pickOK = !pick.problems.length && pick.seen.length >= 2 * 9;

  step("today page, tabs, badges, result screen (UX1)");
  /* Trang chủ học sinh là trang "Hôm nay" với thanh tab dưới (Hôm nay · Bài ôn · Lịch thi · Kết quả); thanh trên không còn nút Lịch thi.
     Ngày giả lập thứ tư 21/10/2026; Bin có 3 ngày ôn liền (Toán 4 Đề 1 21/25 sai "Góc và đo góc" hôm kia, bài ôn giữa kì I 18/20 hôm qua,
     Tiếng Anh 4 Đề 1 hôm nay). Thẻ "Hôm nay ôn gì?": bài chính là bài ôn của kì giữa kì I (kì gần nhất có bài ôn; đã làm tốt nên "làm lại"),
     nút Bắt đầu ≥ 44px, link "Tất cả bài ôn cho kì này · 1 bài ôn"; bài phụ: đề có nhiều câu sai ở chủ đề hay sai. Chuỗi 3 ngày, tuần này
     3/5 ngày (T2–T4), huy hiệu "Chuỗi 3 ngày" và "Hết đề · Kiểm tra giữa học kì I" mới nhận (dòng chúc mừng chỉ một lần), gợi ý huy hiệu
     tiếp theo. Sang 1/12: kì cuối kì I có đề, bài phụ là đề của môn chưa làm trong 7 ngày. Tab Bài ôn (?ki= mở sẵn nhóm), Lịch thi (chỉ kì
     thi, "Còn N ngày"), Kết quả ("Điểm trung bình tháng"); thanh tab không có ở màn đề, tài khoản. Màn kết quả: lời khen theo điểm, "Hơn lần
     trước 2 câu (21/25)", nút "Ôn lại 2 câu sai" (lượt chỉ có 2 câu, hộp rời trang riêng, không lưu điểm, "Làm lại cả đề" về đủ 25 câu),
     câu sai thu gọn (bấm mới thấy đáp án, lời giải), chủ đề chỉ hiện chỗ cần ôn thêm. Trên câu chỉ một dòng nhãn "Toán · chủ đề"; câu điền
     mà mọi đáp án là số có inputmode="decimal". Hồ sơ mới chọn sẵn hình chưa ai dùng. Hồ sơ của con (phụ huynh xem) và trang phụ huynh,
     quản trị giữ bố cục cũ với nhãn mới, không có thanh tab; thanh trên của quản trị cũng không có nút Lịch thi (20/10/2026: chỉ tab Lịch thi).
     Ảnh 360px sáng/tối ở tests/screenshots/ux1/ (bản ghép <tên>.jpg). */
  const OUTUX = OUT + "ux1/"; fs.mkdirSync(OUTUX, { recursive: true });
  const ux1 = { problems: [], shots: [] };
  for (const scheme of ["light", "dark"]) {
    const c = await newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, colorScheme: scheme });
    await localConfig(c); watchOut(c);
    const p = await c.newPage(); p.on("pageerror", (e) => errs.push("pageerror UX1: " + e.message)); p.on("console", (m) => { if (m.type() === "error") errs.push("console UX1: " + m.text()); });
    const r = (ux1[scheme] = {});
    const ucheck = async (label) => (await p.evaluate(audit)).forEach((x) => ux1.problems.push(`UX1 · ${scheme} · ${label}: ${x}`));
    const usnap = async (n) => { await p.evaluate(() => { scrollTo(0, 0); const t = document.querySelector("#toast"); if (t) t.hidden = true; }); await pinTabs(p, true); await p.screenshot({ path: `${OUTUX}${n}-${scheme}.png`, fullPage: true }); await pinTabs(p, false); ux1.shots.push(`${n}-${scheme}`); };
    const txt = (sel) => p.evaluate((s) => { const e = document.querySelector(s); return e ? e.textContent.replace(/\s+/g, " ").trim() : ""; }, sel);
    const tabbar = () => p.evaluate(() => ({ tabs: [...document.querySelectorAll("#tabbar a")].map((a) => a.textContent + (a.getAttribute("aria-current") ? "*" : "")).join(), tabbed: document.body.classList.contains("tabbed"), cal: !!document.querySelector(".who a") })); // cal: nút Lịch thi ở thanh trên (đã bỏ ở mọi vai trò, 20/10/2026)
    await p.clock.install({ time: new Date("2026-10-21T08:00:00") });
    await p.goto(BASE + "/");
    await p.evaluate(() => {
      const d = JSON.parse(localStorage.getItem("ontap_db_v1")), bin = d.users.find((u) => u.name === "Bin");
      /* Kịch bản của bước là kì giữa kì I lớp 4 chỉ có bài ôn l4-giua-ki-1 (Bin đã làm đúng 90%). Lịch mặc định gắn thêm đề Toán 4
         giữa kì I (Phiên N23) vào gk1-l4, nên bỏ các đề gắn vào kì đó ở đây, để bài chính, “1 bài ôn”, huy hiệu “Hết đề · Kiểm tra
         giữa học kì I”, “Đã làm đúng 90% bài ôn của kì này”, bài phụ theo chủ đề hay sai và hồ sơ của con vẫn như kịch bản. Tải lại
         không gắn lại: các mã đề đó đã có trong seedBanksSeen. */
      d.events.find((e) => e.id === "gk1-l4").banks = [];
      const at = (days, h) => { const x = new Date(); x.setDate(x.getDate() - days); x.setHours(h, 10, 0, 0); return x.toISOString(); };
      const mk = (o) => Object.assign({ id: "ux" + Math.random().toString(36).slice(2), userId: bin.id, s: 900 }, o);
      d.results = d.results.filter((x) => x.userId !== bin.id).concat([
        mk({ source: "bank", refId: "toan4-ck1-de1", subject: "Toán", label: "Toán 4 · Cuối kì I · Đề 1", mode: "practice", r: 21, t: 25, at: at(2, 9), wrongTopics: ["Góc và đo góc", "Góc và đo góc", "Đơn vị đo", "Số có nhiều chữ số"] }),
        mk({ source: "module", refId: "l4-giua-ki-1", subject: "Toán", label: "Toán · Đề 1", mode: "exam", r: 18, t: 20, at: at(1, 20) }),
        mk({ source: "bank", refId: "ta4-ck1-de1", subject: "Tiếng Anh", label: "Tiếng Anh 4 · Cuối kì I · Đề 1", mode: "exam", r: 22, t: 25, at: at(0, 9) })]);
      localStorage.setItem("ontap_db_v1", JSON.stringify(d)); localStorage.removeItem("ontap_badges_v1");
    });
    await p.reload(); await p.click(`.tile[data-u="${ids.Bin}"]`); await p.fill("#pinIn", PINS.Bin); await p.waitForSelector("#today");
    r.date = await p.evaluate(() => new Date().toLocaleDateString("vi"));
    r.head = await txt("#view > .stack > div:first-child");
    r.today = await p.evaluate(() => { const m = document.querySelector("#today"), go = document.querySelector("#todayGo"), more = document.querySelector("#todayMore");
      return { title: m.querySelector("h1").textContent.replace(/\s+/g, " "), why: m.querySelector("p").textContent, go: go.getAttribute("href"), goH: Math.round(go.getBoundingClientRect().height), goW: Math.round(go.getBoundingClientRect().width),
        link: document.querySelector("#toBanks").textContent.replace(/\s+/g, " ").trim(), more: more ? more.textContent.replace(/\s+/g, " ").trim() : "", moreHref: more ? more.querySelector("a").getAttribute("href") : "" }; });
    r.streak = await txt("#streak"); r.week = await p.$$eval("#streak .wd", (w) => w.map((x) => x.className.replace("wd", "").trim()).join("|"));
    r.badges = await txt("#badges"); r.newBadge = await txt("#newBadge"); r.badgeOn = await p.$$eval(".badge.on", (b) => b.map((x) => x.textContent.replace(/\s+/g, " ").trim()).join("|"));
    r.recentN = await p.$$eval("#recent .item", (x) => x.length); r.next = await txt("#nextEvent .ev .ready");
    r.tabHome = await tabbar();
    await ucheck("Hôm nay"); await usnap("hom-nay");
    await p.reload(); await p.waitForSelector("#today"); r.newBadgeAgain = !!(await p.$("#newBadge")); // chúc mừng chỉ hiện một lần
    // tab Bài ôn (?ki= mở sẵn nhóm), Lịch thi, Kết quả
    await p.goto(BASE + "/#/practice?ki=ck1-l4"); await p.waitForSelector("#allPractice");
    r.practice = await p.evaluate(() => { const g = [...document.querySelectorAll("#allPractice details.grp")]; return { tabs: document.querySelector('#tabbar a[aria-current="page"]').getAttribute("href"), open: g.filter((x) => x.open).map((x) => x.dataset.grp).join(), n: g.length }; });
    await ucheck("tab Bài ôn"); await usnap("bai-on");
    await p.goto(BASE + "/#/calendar"); await p.waitForSelector(".timeline");
    r.calendar = await p.evaluate(() => { const evs = [...document.querySelectorAll(".ev")]; return { h1: document.querySelector("h1").textContent, n: evs.length, moc: evs.filter((e) => e.classList.contains("moc")).length, past: evs.filter((e) => e.classList.contains("past")).length,
      days: evs.every((e) => [...e.querySelectorAll(".tag")].some((t) => /^Còn \d+ ngày$/.test(t.textContent))), back: !!document.querySelector("#view .linkbtn[data-go]"), tab: document.querySelector('#tabbar a[aria-current="page"]').getAttribute("href") }; });
    await ucheck("tab Lịch thi"); await usnap("lich-thi");
    await p.goto(BASE + "/#/results"); await p.waitForSelector("#allResults");
    r.results = await p.evaluate(() => ({ stats: [...document.querySelectorAll(".stats .stat")].map((s) => s.querySelector("b").textContent + " " + s.querySelector("span").textContent).join("|"), subj: !!document.querySelector("#bySubject"), weak: document.querySelector("#weakTopics .tag.warn").textContent, n: document.querySelectorAll("#allResults .item").length, tab: document.querySelector('#tabbar a[aria-current="page"]').getAttribute("href") }));
    await ucheck("tab Kết quả"); await usnap("ket-qua");
    await p.goto(BASE + "/#/account"); await p.waitForTimeout(200); r.tabAccount = await tabbar();
    // sang 1/12: kì cuối kì I lớp 4 có đề; bài phụ là đề của môn chưa làm trong 7 ngày (Toán: đề chưa làm)
    await p.clock.setSystemTime(new Date("2026-12-01T08:00:00"));
    await p.goto(BASE + "/#/home"); await p.reload(); await p.waitForSelector("#today");
    r.dec = { title: await txt("#today h1"), why: await txt("#today p"), more: await txt("#todayMore"), moreHref: await p.$eval("#todayMore a", (a) => a.getAttribute("href")), streak: await txt("#streak") };
    await ucheck("Hôm nay, kì có nhiều đề"); await usnap("hom-nay-thang-12");
    // màn làm bài và màn kết quả: Toán 4 Đề 1, ôn luyện, hai câu đầu cố ý sai (lần trước 21/25)
    await p.goto(BASE + "/#/quiz/toan4-ck1-de1"); await p.waitForSelector("#qPractice"); r.tabQuiz = await tabbar();
    const Q = await p.evaluate(() => Store.bank("toan4-ck1-de1").questions), nSaved0 = await p.evaluate(() => Store.resultsFor(Store.sessionUser().id).length);
    // chữ trên nút gộp khoảng trắng trước khi so với dữ liệu: số có nhóm hàng nghìn hiện bằng khoảng trắng không ngắt (nbNum, "305 420")
    const answerQ = async (q, right) => {
      if (q.type === "fill") await p.fill("#qzFill", right ? q.ans[0] : "zzz");
      else { const w = q.type === "tf" ? (q.a === right ? "Đúng" : "Sai") : right ? q.o[0] : q.o[1]; await p.$$eval(".opts .opt", (bs, w) => bs.find((b) => b.lastElementChild.textContent.replace(/\s+/g, " ") === w).click(), w); }
    };
    const curQ = async () => { const t = await p.$eval(".qcard .qtext", (e) => e.textContent); return Q.find((x) => flatQ(x.q) === flatQ(t)); };
    await p.click("#qPractice");
    r.labels = await p.$$eval(".qcard .label", (l) => l.map((x) => x.textContent));
    r.tabRun = await tabbar();
    for (let i = 0; i < 40 && !(await p.$(".score")); i++) {
      const q = await curQ(); if (!q) { ux1.problems.push(`UX1 ${scheme}: không nhận ra câu`); break; }
      await answerQ(q, i >= 2); await p.click("#qzGo");
      if (i === 0) { await ucheck("câu sau khi kiểm tra"); await usnap("lam-bai"); }
      await p.click("#qzGo");
    }
    await p.waitForSelector(".score");
    r.result = await p.evaluate(() => ({ label: document.querySelector("#qzScore .label").textContent.replace(/\s+/g, " "), praise: document.querySelector("#qzScore .praise").textContent, score: document.querySelector(".score").textContent,
      cmp: (document.querySelector("#qzCmp") || {}).textContent || "", retry: (document.querySelector("#qzRetry") || {}).textContent || "", again: document.querySelector("#qzAgain").textContent, home: document.querySelector("#qzHome").textContent,
      rv: [...document.querySelectorAll("details.rv")].map((d) => (d.open ? "open" : "closed") + ":" + Math.round(d.querySelector("summary").getBoundingClientRect().height) + ":" + (d.querySelector(".rv-body").checkVisibility() ? "shown" : "hidden")).join("|"),
      rvHead: document.querySelector("details.rv summary").textContent.replace(/\s+/g, " ").trim(), topics: document.querySelector("#qzTopics").textContent.replace(/\s+/g, " ").trim(), order: [...document.querySelectorAll("#view > .stack > *")].map((x) => x.id || x.className).join() }));
    await ucheck("màn kết quả"); await usnap("ket-qua-de");
    await p.click("details.rv >> nth=0 >> summary"); await p.waitForTimeout(100);
    r.rvOpen = await p.evaluate(() => { const d = document.querySelector("details.rv"), b = d.querySelector(".rv-body"); return d.open && b.checkVisibility() && b.getBoundingClientRect().height > 0 && /^Đáp án: /.test(b.textContent.trim()) && !!b.querySelector(".rp-link") && (!d.querySelector(".expl") || !!b.querySelector(".expl")); });
    await p.evaluate(() => document.querySelectorAll("details.rv, #qzTopics details").forEach((d) => (d.open = true)));
    await ucheck("màn kết quả, mở câu sai"); await usnap("ket-qua-de-mo");
    // ôn lại câu sai: lượt 2 câu, rời trang hỏi riêng, không lưu điểm; "Làm lại cả đề" về đủ 25 câu
    await p.click("#qzRetry"); await p.waitForSelector(".qcard");
    r.retry = { chip: await txt("#qzProg") };
    await answerQ(await curQ(), true); await p.click("#qzGo");
    await p.evaluate(() => history.back()); await p.waitForSelector("#leaveBox");
    r.retry.leave = await txt("#leaveBox"); await p.click("#leaveNo"); await p.waitForTimeout(100);
    await p.click("#qzGo"); await answerQ(await curQ(), true); await p.click("#qzGo"); await p.click("#qzGo"); await p.waitForSelector(".score");
    r.retry.result = await txt("#qzScore"); r.retry.btns = (await txt("#qzRetry")) + "|" + (await txt("#qzAgain"));
    r.retry.saved = (await p.evaluate(() => Store.resultsFor(Store.sessionUser().id).length)) - nSaved0; // chỉ lượt đầy đủ được lưu
    await ucheck("kết quả ôn lại câu sai"); await usnap("ket-qua-on-lai");
    await p.click("#qzAgain"); await p.waitForSelector(".qcard"); r.retry.full = (await txt("#qzProg")) + " " + (await txt("#qzExit"));
    await p.click("#qzExit"); await p.click("#qzYes"); await p.waitForTimeout(300);
    // câu điền: mọi đáp án là số → bàn phím số
    r.numeric = await p.evaluate(() => { const mk = (ans) => { const el = document.createElement("div"); document.body.append(el); Quiz.run(el, { title: "Thử", questions: [{ type: "fill", q: "2 + 2 = ___", ans }] }, { mode: "practice" }); const m = el.querySelector("#qzFill").getAttribute("inputmode"); el.remove(); return m; }; return mk(["4", "04"]) + "," + mk(["bốn", "4"]); });
    // quản trị (về lại 21/10): hồ sơ mới chọn sẵn hình chưa ai dùng; hồ sơ của con giữ bố cục cũ với nhãn mới; không có thanh tab
    await p.clock.setSystemTime(new Date("2026-10-21T09:00:00"));
    await p.goto(BASE + "/#/account"); await p.click("#logout"); await p.waitForTimeout(200);
    await p.click(`.tile[data-u="${ids["Bố Minh"]}"]`); await p.fill("#pinIn", PINS["Bố Minh"]); await p.waitForTimeout(400);
    r.tabAdmin = await tabbar();
    const used = await p.evaluate(() => Store.users().map((u) => u.avatar));
    const picked = async (role) => { await p.goto(BASE + "/#/admin/user/new?role=" + role); await p.waitForSelector("#uForm"); return p.$eval('[data-emo][aria-pressed="true"]', (b) => b.dataset.emo); };
    r.avatar = { student: await picked("student"), parent: await picked("parent"), used: used.join("") };
    // hồ sơ của con là báo cáo tuần (UX2): quản trị bản lưu trên máy về "Danh sách học sinh"; thẻ kì thi vẫn có nhãn "Đã làm đúng x%"
    await p.goto(BASE + "/#/child/" + ids.Bin); await p.waitForSelector(".report");
    r.child = await p.evaluate(() => ({ report: !!document.querySelector("#rpCount"), back: document.querySelector("#view .linkbtn[data-go]").textContent, ready: (document.querySelector(".ev .ready") || {}).textContent || "", links: document.querySelectorAll("#rpCal, #rpPractice").length, edit: !!document.querySelector(`a[href="#/admin/user/${Store.users("student").find((u) => u.name === "Bin").id}"]`) }));
    await ucheck("hồ sơ của con");
    await c.close();
  }
  // ghép ảnh sáng/tối cạnh nhau (tests/screenshots/ux1/<tên>.jpg)
  {
    const gp = await browser.newPage({ viewport: { width: 752, height: 400 }, deviceScaleFactor: 2 });
    for (const n of [...new Set(ux1.shots.map((x) => x.replace(/-(light|dark)$/, "")))]) {
      if (!ux1.shots.includes(n + "-light") || !ux1.shots.includes(n + "-dark")) continue;
      const img = (sc) => "data:image/png;base64," + fs.readFileSync(`${OUTUX}${n}-${sc}.png`).toString("base64");
      await gp.setContent(`<body style="margin:0;display:flex;gap:16px;padding:8px;background:#888;align-items:flex-start"><img src="${img("light")}" width="360"><img src="${img("dark")}" width="360"></body>`);
      await gp.screenshot({ path: `${OUTUX}${n}.jpg`, fullPage: true, type: "jpeg", quality: 70 });
    }
    await gp.close();
  }
  console.log("UX1:", JSON.stringify(ux1.light), "dark:", JSON.stringify(ux1.dark), "problems:", ux1.problems);
  const ux1OK = !ux1.problems.length && ["light", "dark"].every((sc) => { const r = ux1[sc];
    return r.date === "21/10/2026" && /^Chào Bin! .*Thứ tư 21\/10 · Lớp 4 · 4A$/.test(r.head)
      && r.today.title === "Ôn giữa kì I · Lớp 4" && /^Kiểm tra giữa học kì I còn 12 ngày\. Bạn đã làm tốt cả kì này\./.test(r.today.why) && r.today.go === "#/play/l4-giua-ki-1" && r.today.goH >= 44 && r.today.goW >= 280 // nút Bắt đầu rộng hết thẻ (360 − 2×16 lề − 2×20 đệm thẻ = 288px)
      && r.today.link === "Tất cả bài ôn cho kì này · 1 bài ôn →" && /^📖 ?Toán 4 · Cuối kì I · Đề 1 ?Ôn lại chủ đề “Góc và đo góc” · 2 câu sai gần đây ?Làm$/.test(r.today.more) && r.today.moreHref === "#/quiz/toan4-ck1-de1"
      && /3 ngày liền/.test(r.streak) && /Mục tiêu 5 ngày\/tuần/.test(r.streak) && /Tuần này bạn ôn 3\/5 ngày\.$/.test(r.streak) && r.week === "on|on|on now|later|later|later|later"
      && r.newBadge === "🎉 Bạn vừa nhận huy hiệu “Chuỗi 3 ngày”, “Hết đề · Kiểm tra giữa học kì I”!" && r.badgeOn === "🏅 Chuỗi 3 ngày|🎯 Hết đề · Kiểm tra giữa học kì I" && /Ôn 4 ngày liền nữa là có huy hiệu “Chuỗi 7 ngày”\.$/.test(r.badges) && !r.newBadgeAgain
      && r.recentN === 3 && r.next === "Đã làm đúng 90% bài ôn của kì này" && r.tabHome.tabs === "Hôm nay*,Bài ôn,Lịch thi,Kết quả" && r.tabHome.tabbed && !r.tabHome.cal
      && r.practice.tabs === "#/practice" && r.practice.open === "gk1-l4,ck1-l4" && r.practice.n > 2
      && r.calendar.h1 === "Lịch thi lớp 4" && r.calendar.n >= 7 && !r.calendar.moc && !r.calendar.past && r.calendar.days && !r.calendar.back && r.calendar.tab === "#/calendar"
      && r.results.stats === "3 bài trong 7 ngày|8,75 Điểm trung bình tháng|3 ngày ôn liên tiếp" && r.results.subj && r.results.weak === "Góc và đo góc · 2 câu" && r.results.n === 3 && r.results.tab === "#/results"
      && r.tabAccount.tabs === "" && !r.tabAccount.tabbed && r.tabQuiz.tabs === "" && !r.tabQuiz.tabbed && r.tabRun.tabs === "" && !r.tabRun.cal
      && r.dec.title === "IOE · Global Success 4" && /^Kiểm tra cuối học kì I còn 27 ngày\. Bài này bạn chưa làm\./.test(r.dec.why) && /^📖 ?Toán 4 · Cuối kì I · Đề 2 ?Môn chưa làm trong 7 ngày qua · 25 câu ?Làm$/.test(r.dec.more) && r.dec.moreHref === "#/quiz/toan4-ck1-de2" && /0 ngày liền/.test(r.dec.streak)
      && r.labels.length === 1 && /^Toán · \S/.test(r.labels[0])
      && r.result.label === "Toán 4 · Cuối kì I · Đề 1 · Ôn luyện" && r.result.praise === "Xuất sắc, Bin!" && r.result.score === "9,25/10" && r.result.cmp === "Hơn lần trước 2 câu (21/25)" && r.result.retry === "Ôn lại 2 câu sai" && r.result.again === "Làm lại cả đề" && r.result.home === "Về trang chính"
      && /^closed:(4[4-9]|[5-9]\d|\d{3}):hidden\|closed:(4[4-9]|[5-9]\d|\d{3}):hidden$/.test(r.result.rv) && /^Câu [12] · .+Bạn trả lời: .+ · bấm để xem đáp án, lời giải$/.test(r.result.rvHead) && !/Đáp án:/.test(r.result.rvHead)
      && /^Theo chủ đề Đúng hết \d+\/\d+ chủ đề\. Cần ôn thêm: .+Xem cả \d+ chủ đề/.test(r.result.topics) && /^qzScore,row,qzReview,qzTopics,(qzLv,)?row$/.test(r.result.order) && r.rvOpen
      && r.retry.chip === "Câu 1/2" && r.retry.leave === "Dừng ôn lại và rời trang?Lượt ôn lại câu sai không lưu điểm. DừngÔn tiếp" && /^Toán 4 · Cuối kì I · Đề 1 · Ôn lại câu sai Xuất sắc, Bin! 10\/10 2\/2 câu đúng.*Lượt ôn lại câu sai không lưu điểm\.$/.test(r.retry.result)
      && r.retry.btns === "|Làm lại cả đề" && r.retry.saved === 1 && r.retry.full === "Câu 1/25 ← Thoát"
      && r.numeric === "decimal,null" && r.tabAdmin.tabs === "" && !r.tabAdmin.cal
      && !r.avatar.used.includes(r.avatar.student) && !r.avatar.used.includes(r.avatar.parent) && r.avatar.student === "🐼" && r.avatar.parent === "🐼" // 🐣 (Bin), 🦊 (Na, form đã chọn sẵn), 🌻, 🧭 đã có người dùng
      && r.child.report && r.child.back === "← Danh sách học sinh" && r.child.ready === "Đã làm đúng 90% bài ôn của kì này" && r.child.links === 2 && r.child.edit; });

  step("parent area: child cards, report first (UX2)");
  /* Phụ huynh bản lưu trên máy (Mẹ Bin, có hai con): trang chủ là mục "Các con", mỗi con một thẻ (số bài hôm nay; điểm hôm nay, chưa làm
     hôm nay thì điểm trung bình tuần; chuỗi ngày; kì thi gần nhất của khối con còn N ngày · chưa ôn môn nào trong 7 ngày, tối đa 3 môn),
     không còn ba ô số liệu và các mục "Lịch thi lớp N" trùng ý; thanh trên không có nút Lịch thi, dưới thẻ có link "Lịch thi cả năm →".
     Bấm thẻ là mở báo cáo tuần (#/child/<mã>): có "← Các con", "Sửa hồ sơ", đầu trang chỉ hình, bên cạnh là tên con, dòng "Lớp 4 · 4A",
     dòng "Báo cáo <ngày> – <ngày>", link "Xem cả năm →" ở mục Kì thi sắp tới (#/calendar?g=4: chọn sẵn tab khối) và "Bài ôn của Bin →" cuối mục
     Gợi ý ôn tuần sau (#/child/<mã>/practice: mọi bài ôn của khối, Xem thử), bài làm trước tuần này thu gọn. Quản trị (thầy cô) giữ
     5 tab và dòng học sinh cũ, bấm vào cũng mở báo cáo; tab Lịch thi có link "Xem theo tháng →" (#/calendar).
     Ngày giả lập 21/10/2026 18:00. Ảnh 360px sáng/tối ở tests/screenshots/ux2/ (bản ghép <tên>.jpg). */
  const OUTUX2 = OUT + "ux2/"; fs.mkdirSync(OUTUX2, { recursive: true });
  const ux2 = { problems: [], shots: [] };
  for (const scheme of ["light", "dark"]) {
    const c = await newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, colorScheme: scheme });
    await localConfig(c); watchOut(c);
    const p = await c.newPage(); p.on("pageerror", (e) => errs.push("pageerror UX2: " + e.message)); p.on("console", (m) => { if (m.type() === "error") errs.push("console UX2: " + m.text()); });
    const r = (ux2[scheme] = {});
    const check2 = async (label) => (await p.evaluate(audit)).forEach((x) => ux2.problems.push(`UX2 · ${scheme} · ${label}: ${x}`));
    const snap2 = async (n) => { await p.evaluate(() => { scrollTo(0, 0); const t = document.querySelector("#toast"); if (t) t.hidden = true; }); await p.screenshot({ path: `${OUTUX2}${n}-${scheme}.png`, fullPage: true }); ux2.shots.push(`${n}-${scheme}`); };
    const txt = (sel) => p.evaluate((s) => { const e = document.querySelector(s); return e ? e.textContent.replace(/\s+/g, " ").trim() : ""; }, sel);
    await p.clock.install({ time: new Date("2026-10-21T18:00:00") });
    await p.goto(BASE + "/");
    await p.evaluate(() => {
      const d = JSON.parse(localStorage.getItem("ontap_db_v1")), bin = d.users.find((u) => u.name === "Bin"), na = d.users.find((u) => u.name === "Na");
      na.parentIds = [d.users.find((u) => u.name === "Mẹ Bin").id]; // Na cũng là con của Mẹ Bin (chỉ trong ngữ cảnh này)
      const at = (days, h) => { const x = new Date(); x.setDate(x.getDate() - days); x.setHours(h, 10, 0, 0); return x.toISOString(); };
      const mk = (o) => Object.assign({ id: "ux2" + Math.random().toString(36).slice(2), s: 900 }, o);
      d.results = [
        mk({ userId: bin.id, source: "bank", refId: "toan4-ck1-de1", subject: "Toán", label: "Toán 4 · Cuối kì I · Đề 1", mode: "practice", r: 19, t: 25, at: at(10, 9), wrongTopics: ["Góc và đo góc"] }), // trước tuần này
        mk({ userId: bin.id, source: "bank", refId: "toan4-ck1-de1", subject: "Toán", label: "Toán 4 · Cuối kì I · Đề 1", mode: "practice", r: 21, t: 25, at: at(2, 9), wrongTopics: ["Góc và đo góc", "Góc và đo góc", "Đơn vị đo"] }),
        mk({ userId: bin.id, source: "module", refId: "l4-giua-ki-1", subject: "Toán", label: "Toán · Đề 1", mode: "exam", r: 18, t: 20, at: at(1, 20) }),
        mk({ userId: bin.id, source: "bank", refId: "ta4-ck1-de1", subject: "Tiếng Anh", label: "Tiếng Anh 4 · Cuối kì I · Đề 1", mode: "exam", r: 22, t: 25, at: at(0, 9) }),
        mk({ userId: bin.id, source: "bank", refId: "toan4-ck1-de2", subject: "Toán", label: "Toán 4 · Cuối kì I · Đề 2", mode: "practice", r: 20, t: 25, at: at(0, 17) }),
        mk({ userId: na.id, source: "bank", refId: "toan6-ck1-de1", subject: "Toán", label: "Toán 6 · Cuối kì I · Đề 1", mode: "practice", r: 15, t: 25, at: at(3, 9), wrongTopics: ["Phân số"] })];
      localStorage.setItem("ontap_db_v1", JSON.stringify(d));
    });
    await p.reload(); await p.click(`.tile[data-u="${ids["Mẹ Bin"]}"]`); await p.fill("#pinIn", PINS["Mẹ Bin"]); await p.waitForSelector("#kids");
    r.home = await p.evaluate(() => ({
      cards: [...document.querySelectorAll("#kids a.kid")].map((k) => ({ href: k.getAttribute("href"), h: Math.round(k.getBoundingClientRect().height), stats: [...k.querySelectorAll(".stat")].map((s) => s.querySelector("b").textContent + " " + s.querySelector("span").textContent).join("|"), ev: (k.querySelector(".kid-ev") || {}).textContent || "" })),
      extraStats: !!document.querySelector("#view > .stack > .stats"), h2: [...document.querySelectorAll("#view h2")].map((h) => h.textContent).join(), hint: document.querySelector("#kids p.small").textContent,
      topCal: !!document.querySelector(".who a"), calLink: (() => { const a = document.querySelector("#calLink"); return a ? a.textContent + "=" + a.getAttribute("href") : ""; })(), tabbar: !!document.querySelector("#tabbar") }));
    await check2("trang chủ phụ huynh"); await snap2("phu-huynh");
    await p.click(`a.kid[href="#/child/${ids.Bin}"]`); await p.waitForSelector(".report");
    r.report = await p.evaluate((id) => ({ hash: location.hash, back: document.querySelector("#view .linkbtn[data-go]").textContent, edit: !!document.querySelector(`a[href="#/admin/user/${id}"]`), print: !!document.querySelector("#rpPrint"),
      links: [...document.querySelectorAll("#rpCal, #rpPractice")].map((a) => a.textContent + "=" + a.getAttribute("href")).join(), head: [...document.querySelectorAll("#rpHead h1, #rpHead .rp-who .muted")].map((x) => x.textContent.replace(/\s+/g, " ").trim()).join(" | "), count: document.querySelector("#rpCount").textContent, topics: document.querySelectorAll("#rpTopics .item").length,
      week: document.querySelectorAll(".report > .sec .item").length, older: { open: document.querySelector("#rpOlder").open, head: document.querySelector("#rpOlder summary").textContent.replace(/\s+/g, " ").trim(), n: document.querySelectorAll("#rpOlder .item").length } }), ids.Bin);
    await check2("báo cáo của con"); await snap2("bao-cao-con");
    await p.evaluate(() => (document.querySelector("#rpOlder").open = true)); await check2("báo cáo của con, mở bài trước");
    await p.click("#rpPractice"); await p.waitForSelector("#allPractice");
    r.practice = await p.evaluate(() => ({ hash: location.hash, back: document.querySelector("#view .linkbtn[data-go]").textContent, h2: document.querySelector("#view h2").textContent, groups: document.querySelectorAll("#allPractice details.grp").length,
      preview: [...document.querySelectorAll("#allPractice a.btn")].every((a) => /Xem thử/.test(a.getAttribute("aria-label") || a.textContent)) }));
    await check2("bài ôn của con"); await snap2("bai-on-cua-con");
    await p.click("#view .linkbtn[data-go]"); await p.waitForSelector(".report");
    await p.click("#rpCal"); await p.waitForSelector(".tabs [data-g]"); // (.timeline có cả ở báo cáo)
    r.cal = await p.evaluate(() => ({ hash: location.hash, tab: document.querySelector('.tabs [aria-pressed="true"]').textContent, h1: document.querySelector("h1").textContent }));
    // quản trị bản lưu trên máy (thầy cô): giữ nguyên 5 tab và dòng học sinh; bấm dòng cũng mở báo cáo, về "Danh sách học sinh"
    await p.goto(BASE + "/#/account"); await p.click("#logout"); await p.waitForTimeout(200);
    await p.click(`.tile[data-u="${ids["Bố Minh"]}"]`); await p.fill("#pinIn", PINS["Bố Minh"]); await p.waitForSelector(".tabs");
    r.admin = await p.evaluate(() => ({ tabs: [...document.querySelectorAll(".tabs button")].map((b) => b.textContent).join(), topCal: !!document.querySelector(".who a"), stats: document.querySelectorAll("#view > .stack > .stats .stat").length, rows: document.querySelectorAll("button[data-child]").length, cards: document.querySelectorAll("a.kid").length }));
    await p.click("button[data-child] >> nth=0"); await p.waitForSelector(".report");
    r.admin.back = await txt("#view .linkbtn[data-go]");
    await p.goto(BASE + "/#/admin/events"); await p.waitForSelector("#calLink");
    r.admin.calLink = await p.evaluate(() => { const a = document.querySelector("#calLink"); return a.textContent + "=" + a.getAttribute("href"); });
    await c.close();
  }
  { // ghép ảnh sáng/tối cạnh nhau (tests/screenshots/ux2/<tên>.jpg)
    const gp = await browser.newPage({ viewport: { width: 752, height: 400 }, deviceScaleFactor: 2 });
    for (const n of [...new Set(ux2.shots.map((x) => x.replace(/-(light|dark)$/, "")))]) {
      const img = (sc) => "data:image/png;base64," + fs.readFileSync(`${OUTUX2}${n}-${sc}.png`).toString("base64");
      await gp.setContent(`<body style="margin:0;display:flex;gap:16px;padding:8px;background:#888;align-items:flex-start"><img src="${img("light")}" width="360"><img src="${img("dark")}" width="360"></body>`);
      await gp.screenshot({ path: `${OUTUX2}${n}.jpg`, fullPage: true, type: "jpeg", quality: 70 });
    }
    await gp.close();
  }
  console.log("UX2:", JSON.stringify(ux2.light), "dark:", JSON.stringify(ux2.dark), "problems:", ux2.problems);
  const ux2OK = !ux2.problems.length && ["light", "dark"].every((sc) => { const r = ux2[sc], bin = r.home.cards[0], na = r.home.cards[1];
    return r.home.cards.length === 2 && bin.href === "#/child/" + ids.Bin && bin.h >= 44 && bin.stats === "2 bài hôm nay|8,5 điểm hôm nay|3 chuỗi ngày" && bin.ev.replace(/\s+/g, " ").trim() === "Kiểm tra giữa học kì I còn 12 ngày · chưa ôn Tiếng Việt"
      && na.href === "#/child/" + ids.Na && na.stats === "Chưa ôn hôm nay|6 điểm TB tuần|0 chuỗi ngày" && na.ev.replace(/\s+/g, " ").trim() === "Kiểm tra giữa học kì I còn 12 ngày · chưa ôn Ngữ văn, KHTN, Tiếng Anh và 4 môn khác"
      && !r.home.extraStats && r.home.h2 === "Chào Mẹ Bin,Các con" && /^Bấm vào thẻ của con để xem báo cáo tuần/.test(r.home.hint) && !r.home.topCal && r.home.calLink === "Lịch thi cả năm →=#/calendar" && !r.home.tabbar
      && r.report.hash === "#/child/" + ids.Bin && r.report.back === "← Các con" && r.report.edit && r.report.print && r.report.links === `Xem cả năm →=#/calendar?g=4,Bài ôn của Bin →=#/child/${ids.Bin}/practice` && r.report.head === "Bin | Lớp 4 · 4A | Báo cáo 15/10 – 21/10/2026"
      && r.report.count === "4" && r.report.topics === 2 && r.report.week === 4 && !r.report.older.open && /^Bài làm trước tuần này ?1 bài$/.test(r.report.older.head) && r.report.older.n === 1
      && r.practice.hash === `#/child/${ids.Bin}/practice` && r.practice.back === "← Báo cáo của Bin" && r.practice.h2 === "Bài ôn lớp 4 của Bin" && r.practice.groups >= 3 && r.practice.preview
      && r.cal.hash === "#/calendar?g=4" && r.cal.tab === "Lớp 4" && /^Lịch thi năm học/.test(r.cal.h1)
      && r.admin.tabs === "Tổng quan,Tài khoản,Lịch thi,Ngân hàng đề,Dữ liệu" && !r.admin.topCal && r.admin.calLink === "Xem theo tháng →=#/calendar" && r.admin.stats === 3 && r.admin.rows === 2 && r.admin.cards === 0 && r.admin.back === "← Danh sách học sinh"; });

  step("profile entry step, PIN lock UI, tap-to-change avatar (UX4)");
  /* Phiên UX4 (X1–X4), bản lưu trên máy: chạm hồ sơ có PIN thì sang bước nhập riêng #/vao/<mã> (không cuộn, tên và 12 nút bàn phím
     trong khung nhìn 740px, "← Chọn hồ sơ khác", hình to, tên, lớp, "Nhập mã PIN của bạn", hàng chấm, nút chữ "Hiện số", bàn phím, dòng
     quên PIN); số đã gõ chỉ hiện ở hàng chấm (ô #pinIn ẩn); sai 5 lần thì đếm ngược ngay dưới hàng chấm, bàn phím và Hiện số disabled
     (phím Vào nền line, chữ muted, không mờ; phím khác mờ .45; Phiên UI2, X32), hết giờ bật lại; trang Tài khoản: chạm hình là đổi ngay
     (Store.user(id).avatar đổi, toast, không có nút Lưu), form đổi mã PIN riêng.
     Ảnh 360px sáng/tối ở tests/screenshots/ux4/ (bản ghép <tên>.jpg): a3-nhap-pin, a3-hien-so, a4-dang-doi, a6-hinh-dai-dien, a6-da-doi. */
  const OUTUX4 = OUT + "ux4/"; fs.mkdirSync(OUTUX4, { recursive: true });
  const ux4 = { problems: [], shots: [] };
  /* Phiên UI2 (X32): màu đã vẽ của nút (nền, chữ, opacity) và màu đã tính của token line, muted, sun, sun-ink (bản giống trong
     tests/supabase/cloud-e2e.js). Phím Vào bị tắt khi phải đợi: nền line, chữ muted, opacity 1 (offTone); bật lại: nền sun, chữ sun-ink (onTone). */
  const btnTone = (sel) => { const b = document.querySelector(sel), s = getComputedStyle(b), tok = (v) => { const i = document.createElement("i"); i.style.color = `var(${v})`; document.body.appendChild(i); const c = getComputedStyle(i).color; i.remove(); return c; };
    return { dis: b.disabled, bg: s.backgroundColor, color: s.color, op: s.opacity, line: tok("--line"), muted: tok("--muted"), sun: tok("--sun"), sunInk: tok("--sun-ink") }; };
  const offTone = (t) => !!t && t.dis && t.bg === t.line && t.color === t.muted && t.op === "1";
  const onTone = (t) => !!t && !t.dis && t.bg === t.sun && t.color === t.sunInk && t.op === "1";
  for (const scheme of ["light", "dark"]) {
    const c = await newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, colorScheme: scheme });
    await localConfig(c); watchOut(c);
    const p = await c.newPage(); p.on("pageerror", (e) => errs.push("pageerror UX4: " + e.message)); p.on("console", (m) => { if (m.type() === "error") errs.push("console UX4: " + m.text()); });
    const r = (ux4[scheme] = {});
    const check4 = async (label) => (await p.evaluate(audit)).forEach((x) => ux4.problems.push(`UX4 · ${scheme} · ${label}: ${x}`));
    const snap4 = async (n, keepToast) => { await p.evaluate((k) => { scrollTo(0, 0); const t = document.querySelector("#toast"); if (t && !k) t.hidden = true; }, !!keepToast); await p.screenshot({ path: `${OUTUX4}${n}-${scheme}.png`, fullPage: true }); ux4.shots.push(`${n}-${scheme}`); };
    const lockUI4 = () => p.evaluate(() => { const top = (s) => document.querySelector(s).getBoundingClientRect().top; return { dis: [...document.querySelectorAll(".pad button")].filter((b) => b.disabled).length, show: document.querySelector("#pinShow").disabled,
      order: top("#pinDots") < top("#pinErr") && top("#pinErr") < top("#pinShow") && top("#pinShow") < top(".pad"), err: document.querySelector("#pinErr").textContent.replace(/\s+/g, " ").trim(), inputW: document.querySelector("#pinIn").getBoundingClientRect().width }; });
    await p.goto(BASE + "/"); await p.waitForSelector(".tile");
    await p.evaluate(() => scrollTo(0, 400)); // đang cuộn giữa danh sách thì chạm hồ sơ: bước nhập phải ở đầu trang
    await p.click(`.tile[data-u="${ids.Na}"]`); await p.waitForSelector("#pinBox:not([hidden])"); await p.waitForTimeout(300);
    r.enter = await p.evaluate(() => { const pad = [...document.querySelectorAll(".pad button")].map((b) => b.getBoundingClientRect()), nm = document.querySelector("#pinWho b"), vis = (x) => x.top >= 0 && x.bottom <= innerHeight;
      return { hash: /^#\/vao\//.test(location.hash), scroll: scrollY, name: nm.textContent, nameIn: vis(nm.getBoundingClientRect()), pad: pad.length === 12 && pad.every(vis), tiles: document.querySelectorAll(".tile").length, back: document.querySelector("#toList").textContent,
        whoOK: document.querySelector("#pinWho").textContent.replace(/\s+/g, " ").trim() === Store.users("student").find((u) => u.name === "Na").avatar + "NaLớp 6", sub: document.querySelector("#pinSub").textContent, show: document.querySelector("#pinShow").textContent, inputW: document.querySelector("#pinIn").getBoundingClientRect().width, help: document.querySelector("#pinHelp").textContent, dots: document.querySelectorAll("#pinDots span").length }; });
    await check4("bước nhập PIN"); await snap4("a3-nhap-pin");
    for (const k of "44") await p.click(`.pad button[data-k="${k}"]`);
    await p.click("#pinShow"); await p.waitForTimeout(100);
    r.shown = await p.evaluate(() => ({ dots: document.querySelector("#pinDots").textContent, cls: document.querySelector("#pinDots").className, show: document.querySelector("#pinShow").textContent, pressed: document.querySelector("#pinShow").getAttribute("aria-pressed"), inputW: document.querySelector("#pinIn").getBoundingClientRect().width, type: document.querySelector("#pinIn").type }));
    await check4("đang hiện số"); await snap4("a3-hien-so");
    await p.click('.pad button[data-k="del"]'); await p.click('.pad button[data-k="del"]');
    for (let i = 0; i < 5; i++) { for (const k of "0000") await p.click(`.pad button[data-k="${k}"]`); await p.waitForTimeout(250); } // sai 5 lần
    await p.waitForSelector("#pinWait");
    r.locked = await lockUI4();
    r.okOff = await p.evaluate(btnTone, ".pad .ok"); // UI2 (X32): phím Vào bị tắt; phím số, Hiện số vẫn mờ .45
    r.dim = await p.evaluate(() => [...document.querySelectorAll(".pad button:not(.ok)"), document.querySelector("#pinShow")].map((b) => getComputedStyle(b).opacity));
    await check4("đang phải đợi"); await snap4("a4-dang-doi");
    await p.evaluate(() => { const o = JSON.parse(localStorage.getItem("ontap_pinlock_v1")); for (const k in o) if (o[k].until) o[k].until = Date.now() + 1200; localStorage.setItem("ontap_pinlock_v1", JSON.stringify(o)); });
    await p.waitForSelector("#pinErr .fb.ok", { timeout: 5000 });
    r.unlocked = await lockUI4();
    r.okOn = await p.evaluate(btnTone, ".pad .ok");
    for (const k of "4444") await p.click(`.pad button[data-k="${k}"]`); await p.waitForSelector("#today"); // bật lại thì vào được
    r.in = await p.evaluate(() => (Store.sessionUser() || {}).name);
    // X4: trang Tài khoản: thẻ "Hình đại diện" chạm là đổi; form "Đổi mã PIN" riêng
    await p.goto(BASE + "/#/account"); await p.waitForSelector("#avBox");
    const before = await p.evaluate(() => Store.sessionUser().avatar);
    r.account = await p.evaluate(() => ({ hint: document.querySelector("#avBox p").textContent, save: !!document.querySelector("#avBox [type=submit]"), pinBtn: document.querySelector("#aForm [type=submit]").textContent, h3: [...document.querySelectorAll("#view h3")].map((h) => h.textContent).join() }));
    await check4("tài khoản"); await snap4("a6-hinh-dai-dien");
    const pick = before === "🐬" ? "🚀" : "🐬";
    await p.click(`#avBox [data-emo="${pick}"]`); await p.waitForSelector("#toast:not([hidden])");
    r.changed = await p.evaluate((pick) => ({ av: Store.sessionUser().avatar === pick, toast: document.querySelector("#toast").textContent, head: document.querySelector("#acAv").textContent === pick, top: document.querySelector("#who .av").textContent === pick, pressed: document.querySelector('#avBox [aria-pressed="true"]').dataset.emo === pick, saved: JSON.parse(localStorage.getItem("ontap_db_v1")).users.find((u) => u.id === Store.sessionUser().id).avatar === pick }), pick);
    await check4("đã đổi hình"); await snap4("a6-da-doi", true);
    await p.fill("#aOld", "4444"); await p.click("#aForm [type=submit]"); await p.waitForSelector("#aErr .fb");
    r.pinForm = await p.textContent("#aErr");
    await p.click(`#avBox [data-emo="${before}"]`); await p.waitForTimeout(200); // trả lại hình cũ
    await p.goto(BASE + "/#/account"); await p.click("#logout"); await p.waitForTimeout(200);
    await c.close();
  }
  { // ghép ảnh sáng/tối cạnh nhau (tests/screenshots/ux4/<tên>.jpg)
    const gp = await browser.newPage({ viewport: { width: 752, height: 400 }, deviceScaleFactor: 2 });
    for (const n of [...new Set(ux4.shots.map((x) => x.replace(/-(light|dark)$/, "")))]) {
      const img = (sc) => "data:image/png;base64," + fs.readFileSync(`${OUTUX4}${n}-${sc}.png`).toString("base64");
      await gp.setContent(`<body style="margin:0;display:flex;gap:16px;padding:8px;background:#888;align-items:flex-start"><img src="${img("light")}" width="360"><img src="${img("dark")}" width="360"></body>`);
      await gp.screenshot({ path: `${OUTUX4}${n}.jpg`, fullPage: true, type: "jpeg", quality: 70 });
    }
    await gp.close();
  }
  console.log("UX4:", JSON.stringify(ux4.light), "dark:", JSON.stringify(ux4.dark), "problems:", ux4.problems);
  const ux4OK = !ux4.problems.length && ["light", "dark"].every((sc) => { const r = ux4[sc];
    return r.enter.hash && r.enter.scroll === 0 && r.enter.name === "Na" && r.enter.nameIn && r.enter.pad && r.enter.tiles === 0 && r.enter.back === "← Chọn hồ sơ khác" && r.enter.whoOK && r.enter.sub === "Nhập mã PIN của bạn"
      && r.enter.show === "Hiện sốGiấu số" && r.enter.inputW <= 1 && r.enter.help === "Quên mã PIN? Nhờ quản trị đặt lại trong Quản trị → Tài khoản." && r.enter.dots === 4
      && r.shown.dots === "44" && /shown/.test(r.shown.cls) && r.shown.pressed === "true" && r.shown.inputW <= 1 && r.shown.type === "text"
      && r.locked.dis === 12 && r.locked.show && r.locked.order && /^Mã PIN chưa đúng\. Đợi (30|29) giây rồi thử lại\.$/.test(r.locked.err) && r.locked.inputW <= 1
      && r.unlocked.dis === 0 && !r.unlocked.show && r.unlocked.order && r.unlocked.err === "Bạn nhập lại được rồi." && r.in === "Na"
      && offTone(r.okOff) && onTone(r.okOn) && r.dim.length === 12 && r.dim.every((o) => o === "0.45")
      && r.account.hint === "Chạm vào hình là đổi ngay." && !r.account.save && r.account.pinBtn === "Đổi mã PIN" && r.account.h3 === "Hình đại diện,Đổi mã PIN"
      && r.changed.av && r.changed.toast === "Đã đổi hình đại diện" && r.changed.head && r.changed.top && r.changed.pressed && r.changed.saved && /Nhập mã PIN mới/.test(r.pinForm); });

  step("seal avatars: drawn art in the avatar picker and everywhere the avatar shows");
  /* Hình đại diện vẽ riêng (chủ app yêu cầu 22/10/2026: thêm vài hình hải cẩu; emoji chỉ có một 🦭, máy cũ không hiện được). Mã hình
     (hai-cau-…, ≤ 16 kí tự như cột profiles.avatar) lưu ở trường avatar như emoji; app vẽ <img class="art" src="icons/avatars/<mã>.svg">.
     Ở 360px sáng/tối: bộ chọn hình có 16 emoji và 6 hải cẩu (mỗi ô có tên đọc, hình tải được, rộng gần bằng emoji); Bin chọn "Hải cẩu đội
     mũ tốt nghiệp": lưu ngay, hình ở đầu trang Tài khoản và thanh trên là hình vẽ; lời chào ở trang Hôm nay, ô hồ sơ ở "Xin chào!", thẻ
     của con ở trang chủ phụ huynh và đầu báo cáo tuần cũng vậy. Mỗi màn chạy audit (cả chữ đè). Ảnh ở tests/screenshots/hai-cau/
     (bản ghép <tên>.jpg; chép sang docs/hinh-hai-cau/). */
  const OUTART = OUT + "hai-cau/"; fs.mkdirSync(OUTART, { recursive: true });
  const art = { problems: [], shots: [] }, SEAL = "hai-cau-mu";
  for (const scheme of ["light", "dark"]) {
    const c = await newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, colorScheme: scheme });
    await localConfig(c); watchOut(c);
    const p = await c.newPage(); p.on("pageerror", (e) => errs.push("pageerror hải cẩu: " + e.message)); p.on("console", (m) => { if (m.type() === "error") errs.push("console hải cẩu: " + m.text()); });
    const r = (art[scheme] = {});
    const checkA = async (label) => (await p.evaluate(audit)).forEach((x) => art.problems.push(`hải cẩu · ${scheme} · ${label}: ${x}`));
    const snapA = async (n) => { await p.evaluate(() => { scrollTo(0, 0); const t = document.querySelector("#toast"); if (t) t.hidden = true; }); await p.screenshot({ path: `${OUTART}${n}-${scheme}.png` }); art.shots.push(`${n}-${scheme}`); };
    // hình vẽ trong phần tử sel: đúng file, tải xong (rộng tự nhiên > 0); hình vừa chèn thì chờ tải xong
    const drawn = async (sel) => {
      await p.waitForFunction((sel) => { const i = document.querySelector(sel + " img.art"); return !i || i.complete; }, sel, { timeout: 5000 }).catch(() => {});
      return p.evaluate((sel) => { const i = document.querySelector(sel + " img.art"); return !!i && i.complete && i.naturalWidth > 0 && i.getAttribute("src") === "icons/avatars/hai-cau-mu.svg"; }, sel);
    };
    const signIn = async (name) => { await p.goto(BASE + "/#/account"); if (await p.$("#logout")) { await p.click("#logout"); await p.waitForTimeout(200); }
      await p.goto(BASE + "/#/"); await p.click(`.tile[data-u="${ids[name]}"]`); await p.fill("#pinIn", PINS[name]); await p.waitForTimeout(400); };
    await signIn("Bin");
    await p.goto(BASE + "/#/account"); await p.waitForSelector("#avBox"); await p.waitForFunction(() => [...document.querySelectorAll("#avBox img.art")].every((i) => i.complete));
    r.picker = await p.evaluate(() => {
      const bs = [...document.querySelectorAll("#avBox [data-emo]")], seals = bs.filter((b) => b.dataset.emo.startsWith("hai-cau-")), emo = bs.find((b) => b.dataset.emo === "🦊").getBoundingClientRect();
      return { n: bs.length, seals: seals.map((b) => b.dataset.emo).join(), names: seals.every((b) => /^Hải cẩu/.test(b.getAttribute("aria-label"))), short: seals.every((b) => b.dataset.emo.length <= 16),
        loaded: seals.every((b) => { const i = b.querySelector("img.art"); return i && i.complete && i.naturalWidth > 0 && i.alt === ""; }),
        size: seals.every((b) => { const i = b.querySelector("img.art").getBoundingClientRect(), x = b.getBoundingClientRect(); return i.width >= 26 && i.width <= 34 && i.left >= x.left && i.right <= x.right && i.top >= x.top && i.bottom <= x.bottom; }), emoW: emo.width };
    });
    await p.click(`#avBox [data-emo="${SEAL}"]`); await p.waitForFunction((s) => Store.sessionUser().avatar === s, SEAL);
    r.changed = { head: await drawn("#acAv"), top: await drawn("#who .av"), pressed: await p.$eval('#avBox [aria-pressed="true"]', (b) => b.dataset.emo) === SEAL,
      saved: await p.evaluate((s) => JSON.parse(localStorage.getItem("ontap_db_v1")).users.find((u) => u.name === "Bin").avatar === s, SEAL) };
    await checkA("tài khoản, đã chọn hải cẩu"); await snapA("chon-hinh");
    await p.goto(BASE + "/#/home"); await p.waitForSelector("#today");
    r.home = await drawn("#view h2") && (await p.$eval("#view h2", (h) => { const i = h.querySelector("img.art").getBoundingClientRect(), fs = parseFloat(getComputedStyle(h).fontSize); return h.textContent.trim() === "Chào Bin!" && i.height >= 1.2 * fs && i.height <= 1.6 * fs; }));
    await checkA("Hôm nay"); await snapA("hom-nay");
    await p.goto(BASE + "/#/account"); await p.click("#logout"); await p.waitForSelector(".tile");
    r.tile = await drawn(`.tile[data-u="${ids.Bin}"] .av`);
    await checkA("Xin chào!"); await snapA("xin-chao");
    await signIn("Mẹ Bin");
    r.kid = await drawn(`a.kid[href="#/child/${ids.Bin}"] .av`);
    await checkA("trang chủ phụ huynh");
    await p.goto(BASE + "/#/child/" + ids.Bin); await p.waitForSelector("#rpHead");
    r.report = await drawn("#rpHead .av");
    await checkA("báo cáo tuần"); await snapA("bao-cao");
    await c.close();
  }
  { // ghép ảnh sáng/tối cạnh nhau (tests/screenshots/hai-cau/<tên>.jpg)
    const gp = await browser.newPage({ viewport: { width: 752, height: 400 }, deviceScaleFactor: 2 });
    for (const n of [...new Set(art.shots.map((x) => x.replace(/-(light|dark)$/, "")))]) {
      const img = (sc) => "data:image/png;base64," + fs.readFileSync(`${OUTART}${n}-${sc}.png`).toString("base64");
      await gp.setContent(`<body style="margin:0;display:flex;gap:16px;padding:8px;background:#888;align-items:flex-start"><img src="${img("light")}" width="360"><img src="${img("dark")}" width="360"></body>`);
      await gp.screenshot({ path: `${OUTART}${n}.jpg`, fullPage: true, type: "jpeg", quality: 70 });
    }
    await gp.close();
  }
  console.log("hải cẩu:", JSON.stringify({ light: art.light, dark: art.dark }), "problems:", art.problems);
  const artOK = !art.problems.length && ["light", "dark"].every((sc) => { const r = art[sc];
    return r.picker.n === 22 && r.picker.seals === "hai-cau-xam,hai-cau-con,hai-cau-dom,hai-cau-mu,hai-cau-bong,hai-cau-kinh" && r.picker.names && r.picker.short && r.picker.loaded && r.picker.size
      && r.changed.head && r.changed.top && r.changed.pressed && r.changed.saved && r.home && r.tile && r.kid && r.report; });

  step("focused test screen: top bar, Finish button, timer, Skip, open screen (UX5)");
  /* Phiên UX5 (X5–X9), bản lưu trên máy, ngày giả lập 14/12/2026 8:00. Bin (lớp 4) mở Toán 4 · Cuối kì I · Đề 3 (chưa làm lần nào):
     màn mở đề không có thẻ "Lần trước", có "Chọn cách làm" với hai thẻ (cao ≥ 64px, biểu tượng, một dòng giải thích). Làm như thi (X5–X7):
     thanh trên chỉ còn chữ OnUp (không hình đại diện, không thanh tab, body.quizzing), nút "Nộp bài" thay "← Thoát", chip "Còn 40:00" có
     biểu tượng, role="timer", aria-label "Thời gian còn lại", tiến độ "Câu 1/25"; chưa trả lời mà bấm Nộp bài thì hỏi "Thoát đề?", thoát
     thì không lưu điểm. Trả lời 3 câu, tua đồng hồ còn dưới 2 phút (chip .warn), Nộp bài hỏi lại như cũ, nộp thì màn kết quả có lại hình
     đại diện. Mở lại đề (X9): thẻ "Lần trước: x/25 câu đúng" (Hôm nay … · làm như thi · N phút), không lấy kết quả tự chấm mới hơn
     (graded). Ôn luyện (X8): "← Thoát", không có đồng hồ; sau Kiểm tra không còn nút "Bỏ qua" nào hiện ra, "Câu tiếp" ở mép phải;
     "Làm lại" từ màn kết quả lại vào chế độ tập trung. Phụ huynh xem thử: trong lúc làm không có hình đại diện, màn kết quả có lại
     (thanh trên không có nút Lịch thi ở mọi màn); không có thẻ "Lần trước". Đề tự nhập không có số phút: chỉ thẻ Ôn luyện. Mỗi màn hình kiểm tra 360px (audit).
     Ảnh 360px sáng/tối ở tests/screenshots/ux5/ (bản ghép <tên>.jpg): c1-lam-nhu-thi, c1-nop-bai, c2-sau-kiem-tra, c4-mo-de. */
  const OUTUX5 = OUT + "ux5/"; fs.mkdirSync(OUTUX5, { recursive: true });
  const ux5 = { problems: [], shots: [] };
  const UX5_BANK = "toan4-ck1-de3";
  for (const scheme of ["light", "dark"]) {
    const c = await newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, colorScheme: scheme });
    await localConfig(c); watchOut(c);
    const p = await c.newPage(); p.on("pageerror", (e) => errs.push("pageerror UX5: " + e.message)); p.on("console", (m) => { if (m.type() === "error") errs.push("console UX5: " + m.text()); });
    await p.clock.install({ time: new Date("2026-12-14T08:00:00") });
    const r = (ux5[scheme] = {});
    const check5 = async (label) => (await p.evaluate(audit)).forEach((x) => ux5.problems.push(`UX5 · ${scheme} · ${label}: ${x}`));
    const snap5 = async (n) => { await p.evaluate(() => { scrollTo(0, 0); const t = document.querySelector("#toast"); if (t) t.hidden = true; }); await p.screenshot({ path: `${OUTUX5}${n}-${scheme}.png`, fullPage: true }); ux5.shots.push(`${n}-${scheme}`); };
    const txt = (sel) => p.evaluate((s) => { const e = document.querySelector(s); return e ? e.textContent.replace(/\s+/g, " ").trim() : null; }, sel);
    // thanh trên: hình đại diện, có link nào khác không (không còn nút Lịch thi); chế độ tập trung; thanh tab dưới
    const top = () => p.evaluate(() => { const vis = (e) => !!e && e.getBoundingClientRect().width > 0; return { av: vis(document.querySelector("#who .av")), cal: vis(document.querySelector("#who a")), brand: vis(document.querySelector(".top .brand")), quizzing: document.body.classList.contains("quizzing"), tabbar: vis(document.querySelector("#tabbar")) }; });
    const answer = async () => { if (await p.$("#qzFill")) await p.fill("#qzFill", "1"); else if (await p.$("#qzNum")) await p.fill("#qzNum", "1"); else await p.click(".opts .opt >> nth=0"); await p.click("#qzGo"); };
    const nRes = () => p.evaluate(() => Store.resultsFor(Store.sessionUser().id).length);
    await p.goto(BASE + "/"); await p.click(`.tile[data-u="${ids.Bin}"]`); await p.fill("#pinIn", PINS.Bin); await p.waitForSelector("#today");
    // X9: màn mở đề, chưa làm lần nào
    await p.goto(BASE + "/#/quiz/" + UX5_BANK); await p.waitForSelector("#qPractice");
    r.open0 = await p.evaluate(() => { const card = (id) => { const b = document.querySelector(id), x = b.getBoundingClientRect(); return { h: x.height >= 64, ic: b.querySelectorAll("svg").length === 2, head: b.querySelector("b").textContent.replace(/\s+/g, " "), note: b.querySelector(".muted").textContent }; }; // nb(): khoảng trắng không ngắt trước "·"
      return { prev: !!document.querySelector("#qPrev"), choose: document.querySelector("#qModes").textContent, group: document.querySelector(".modes").getAttribute("aria-labelledby"), practice: card("#qPractice"), exam: card("#qExam"), heroBtns: document.querySelectorAll(".hero button").length }; });
    r.top0 = await top();
    await check5("màn mở đề, chưa làm");
    // X6: làm như thi, chưa trả lời câu nào mà bấm "Nộp bài": hỏi "Thoát đề?", thoát thì không lưu điểm và bỏ chế độ tập trung
    const n0 = await nRes();
    await p.click("#qExam"); await p.click("#qzSubmit");
    r.exit0 = { ask: await txt("#qzFb .confirm") };
    await p.click("#qzYes"); await p.waitForTimeout(300);
    Object.assign(r.exit0, { hash: await p.evaluate(() => location.hash), same: (await nRes()) === n0, top: await top() });
    // X5–X7: làm như thi
    await p.goto(BASE + "/#/quiz/" + UX5_BANK); await p.waitForSelector("#qExam"); await p.click("#qExam"); await p.waitForSelector("#qzGo");
    r.exam = await p.evaluate(() => { const t = document.querySelector("#qzTimer"), s = document.querySelector("#qzSubmit"), row = document.querySelector(".qz-top").getBoundingClientRect(), sb = s.getBoundingClientRect();
      return { exit: !!document.querySelector("#qzExit"), thoat: /Thoát/.test(document.querySelector("#view").textContent), submit: s.textContent, cls: s.className, right: Math.round(row.right - sb.right), oneRow: Math.abs(sb.top - t.getBoundingClientRect().top) < 12,
        timer: t.textContent, role: t.getAttribute("role"), aria: t.getAttribute("aria-label"), icon: !!t.querySelector("svg"), warn: t.classList.contains("warn"), prog: document.querySelector("#qzProg").textContent }; });
    r.examTop = await top();
    await check5("làm như thi"); await snap5("c1-lam-nhu-thi");
    for (let k = 0; k < 3; k++) await answer();
    r.examProg = await txt("#qzProg");
    /* Tua đồng hồ 38:30, còn dưới 2 phút: lượt đếm giờ kế tiếp của trang (mỗi 500 ms) đổi màu chip. Đặt giờ bằng setSystemTime, không
       dùng clock.fastForward: đồng hồ giả lập của Playwright (1.56) đi theo giờ thật bằng một vòng gọi timer của trang; lần tua rơi vào
       lúc vòng đó đang gọi dở một timer thì xong lượt nó kéo giờ lùi về chỗ cũ, kết quả vừa nộp ghi "1 giây" (21/10/2026). */
    await p.clock.setSystemTime((await nowIn(p)) + (38 * 60 + 30) * 1000); await p.waitForSelector("#qzTimer.warn", { timeout: 5000 }).catch(() => {});
    r.warn = await p.evaluate(() => { const t = document.querySelector("#qzTimer"); return { warn: t.classList.contains("warn"), text: t.textContent }; });
    await p.click("#qzSubmit");
    r.submitAsk = await txt("#qzFb .confirm");
    await p.waitForTimeout(500); // hộp hỏi lại nằm trong màn hình (cuộn tới nếu câu dài), "Làm tiếp" được focus
    // sai lệch 1px: câu dài thì hộp được cuộn sát mép dưới, bottom có thể là 740,125 (L28, nguyên nhân 7)
    r.submitSeen = await p.evaluate(() => { const b = document.querySelector("#qzFb .confirm").getBoundingClientRect(); return b.top >= 0 && b.bottom <= innerHeight + 1 && document.activeElement.id === "qzNo"; });
    await check5("hỏi lại khi nộp bài"); await snap5("c1-nop-bai");
    await p.click("#qzYes"); await p.waitForSelector(".score");
    r.resultTop = await top();
    // kết quả vừa nộp: tìm theo đề và cách làm, không lấy kết quả mới nhất theo giờ (có thể là dữ liệu của bước trước; L28, nguyên nhân 6)
    const saved = (await p.evaluate((id) => Store.resultsFor(Store.sessionUser().id).find((x) => x.refId === id && x.mode === "exam"), UX5_BANK)) || {};
    // kết quả tự chấm mới hơn cùng đề không phải "Lần trước" (graded)
    await p.evaluate((id) => Store.addResult({ userId: Store.sessionUser().id, source: "bank", refId: id, subject: "Toán", label: "x", mode: "self", r: 4, t: 8, s: 0 }), UX5_BANK);
    // X9: mở lại đề: thẻ "Lần trước"
    await p.goto(BASE + "/#/home"); await p.goto(BASE + "/#/quiz/" + UX5_BANK); await p.waitForSelector("#qPrev");
    r.prev = { head: await txt("#qPrev b"), sub: await txt("#qPrev .muted"), want: `Lần trước: ${String(saved.r).replace(".", ",")}/${saved.t} câu đúng`, mode: saved.mode, icon: await p.$eval("#qPrev", (e) => !!e.querySelector("svg")) };
    await check5("màn mở đề, đã làm"); await snap5("c4-mo-de");
    // X8: ôn luyện: "← Thoát", không có đồng hồ; sau Kiểm tra không còn nút "Bỏ qua" nào hiện ra, "Câu tiếp" ở mép phải
    await p.click("#qPractice"); await p.waitForSelector("#qzGo");
    r.practice = { exit: await txt("#qzExit"), submit: !!(await p.$("#qzSubmit")), timer: !!(await p.$("#qzTimer")), prog: await txt("#qzProg"), top: await top(), skip: await p.$eval("#qzSkip", (b) => !b.hidden && b.getBoundingClientRect().width > 0) };
    await answer();
    r.checked = await p.evaluate(() => { const g = document.querySelector("#qzGo").getBoundingClientRect(), row = document.querySelector(".qz-nav").getBoundingClientRect();
      return { skips: [...document.querySelectorAll("button")].filter((b) => /Bỏ qua/.test(b.textContent) && b.getBoundingClientRect().width > 0).length, right: Math.round(row.right - g.right), go: document.querySelector("#qzGo").textContent }; });
    await check5("ôn luyện, sau Kiểm tra"); await snap5("c2-sau-kiem-tra");
    await p.click("#qzGo"); r.nextSkip = await p.$eval("#qzSkip", (b) => !b.hidden && b.getBoundingClientRect().width > 0); // câu sau: "Bỏ qua" hiện lại
    await p.click("#qzExit"); await p.click("#qzYes"); await p.waitForSelector(".score");
    r.practiceEnd = await top();
    await p.click("#qzAgain"); await p.waitForSelector("#qzGo"); r.again = await top(); // "Làm lại": lại vào chế độ tập trung
    await p.goto(BASE + "/#/home"); await p.waitForSelector("#today"); r.home = await top();
    // phụ huynh xem thử: trong lúc làm không có nút "Lịch thi" và hình đại diện, màn kết quả có lại; không có thẻ "Lần trước"
    await p.goto(BASE + "/#/account"); await p.click("#logout"); await p.waitForTimeout(200);
    await p.click(`.tile[data-u="${ids["Mẹ Bin"]}"]`); await p.fill("#pinIn", PINS["Mẹ Bin"]); await p.waitForTimeout(400);
    await p.goto(BASE + "/#/quiz/" + UX5_BANK); await p.waitForSelector("#qPractice");
    r.parent = { prev: !!(await p.$("#qPrev")), notice: await txt(".notice"), open: await top() };
    await p.click("#qPractice"); await p.waitForSelector("#qzGo"); r.parent.run = await top();
    await answer(); await p.click("#qzExit"); await p.click("#qzYes"); await p.waitForSelector(".score");
    r.parent.result = await top();
    // đề tự nhập không có số phút: chỉ thẻ Ôn luyện
    await p.evaluate(() => Store.upsertBank({ id: "ux5-khong-gio", title: "Ôn nhanh phép nhân", grade: 4, subject: "Toán", minutes: 0, questions: [{ type: "mc", q: "6 × 7 = ?", o: ["42", "48"], topic: "Phép nhân" }] }));
    await p.goto(BASE + "/#/quiz/ux5-khong-gio"); await p.waitForSelector("#qPractice");
    r.noMinutes = await p.evaluate(() => document.querySelectorAll(".modes .mode").length === 1 && !document.querySelector("#qExam"));
    await check5("đề không có số phút");
    await p.evaluate(() => Store.removeBank("ux5-khong-gio"));
    await c.close();
  }
  { // ghép ảnh sáng/tối cạnh nhau (tests/screenshots/ux5/<tên>.jpg)
    const gp = await browser.newPage({ viewport: { width: 752, height: 400 }, deviceScaleFactor: 2 });
    for (const n of [...new Set(ux5.shots.map((x) => x.replace(/-(light|dark)$/, "")))]) {
      const img = (sc) => "data:image/png;base64," + fs.readFileSync(`${OUTUX5}${n}-${sc}.png`).toString("base64");
      await gp.setContent(`<body style="margin:0;display:flex;gap:16px;padding:8px;background:#888;align-items:flex-start"><img src="${img("light")}" width="360"><img src="${img("dark")}" width="360"></body>`);
      await gp.screenshot({ path: `${OUTUX5}${n}.jpg`, fullPage: true, type: "jpeg", quality: 70 });
    }
    await gp.close();
  }
  console.log("UX5:", JSON.stringify(ux5.light), "dark:", JSON.stringify(ux5.dark), "problems:", ux5.problems);
  const offTop = (t) => !t.av && !t.cal && t.brand && t.quizzing && !t.tabbar, fullTop = (t) => t.av && t.brand && !t.quizzing;
  const ux5OK = !ux5.problems.length && ["light", "dark"].every((sc) => { const r = ux5[sc];
    return !r.open0.prev && r.open0.choose === "Chọn cách làm" && r.open0.group === "qModes" && r.open0.heroBtns === 0 && fullTop(r.top0)
      && r.open0.practice.h && r.open0.practice.ic && r.open0.practice.head === "Ôn luyện" && r.open0.practice.note === "Xem đáp án và lời giải ngay sau mỗi câu. Không tính giờ."
      && r.open0.exam.h && r.open0.exam.ic && r.open0.exam.head === "Làm như thi · 40 phút" && r.open0.exam.note === "Tính giờ như ở trường, chấm điểm khi nộp bài."
      && r.exit0.ask === "Thoát đề? Bạn chưa làm câu nào nên không lưu điểm.ThoátLàm tiếp" && r.exit0.hash === "#/home" && r.exit0.same && fullTop(r.exit0.top)
      && !r.exam.exit && !r.exam.thoat && r.exam.submit === "Nộp bài" && r.exam.cls === "btn ghost sm" && r.exam.right === 0 && r.exam.oneRow
      && /^Còn (40:00|39:5\d)$/.test(r.exam.timer) && r.exam.role === "timer" && r.exam.aria === "Thời gian còn lại" && r.exam.icon && !r.exam.warn && r.exam.prog === "Câu 1/25"
      && offTop(r.examTop) && r.examProg === "Câu 4/25" && r.warn.warn && /^Còn 01:[23]\d$/.test(r.warn.text)
      && r.submitAsk === "Nộp bài ngay? Còn 22 câu chưa làm, sẽ tính là sai.Nộp bàiLàm tiếp" && r.submitSeen && fullTop(r.resultTop) // 9n: ghi số câu còn trống
      && r.prev.head === r.prev.want && r.prev.mode === "exam" && /^Hôm nay 08:\d\d · làm như thi · \d+ phút$/.test(r.prev.sub) && r.prev.icon
      && r.practice.exit === "← Thoát" && !r.practice.submit && !r.practice.timer && r.practice.prog === "Câu 1/25" && offTop(r.practice.top) && r.practice.skip
      && r.checked.skips === 0 && r.checked.right === 0 && r.checked.go === "Câu tiếp" && r.nextSkip
      && fullTop(r.practiceEnd) && offTop(r.again) && fullTop(r.home) && r.home.tabbar
      && !r.parent.prev && r.parent.notice === "Chế độ xem thử: điểm không được lưu." && fullTop(r.parent.open) && !r.parent.open.cal && offTop(r.parent.run) && fullTop(r.parent.result) && !r.parent.result.cal
      && r.noMinutes; })
    && ["c1-lam-nhu-thi", "c1-nop-bai", "c2-sau-kiem-tra", "c4-mo-de"].every((n) => ux5.shots.includes(n + "-light") && ux5.shots.includes(n + "-dark"));

  step("skip and come back, question board, review screen (L38, L39)");
  /* Phiên 9n (L38, L39), bản lưu trên máy, 360px sáng/tối. Ôn luyện (Bin, Tiếng Việt 4 · Cuối kì I · Đề 1, có đoạn đọc): "Câu 1/25" là nút
     mở bảng số câu #qzGrid (25 ô ≥ 44px, 5 ô một hàng, aria-label theo trạng thái, ô đang làm aria-current, chú thích); bỏ qua 2 câu, làm
     các câu còn lại thì sau câu cuối (nút ghi "Xem lại bài làm", X25) tới màn #qzRecap "Bạn còn 2 câu chưa làm." với bảng đúng trạng thái
     (–, ✓, ✗), không có "← Thoát", nút mở bảng, .bar, #qzReview (X21, X24); chú thích ở màn đó không ghi mục 0 câu (không có "Chưa làm",
     X29), mẫu ô ở chú thích có dấu trong một thẻ <i> như ô thật: chữ đứng, cùng màu với dấu trong ô cùng trạng thái (X28, Phiên 9nb);
     rời trang vẫn hỏi; mở lại câu đã Kiểm tra từ bảng thì chỉ xem lại (đáp án, lời giải, không "Bỏ qua") và xong về lại màn đó (X22);
     "Làm tiếp 2 câu": nhãn "Câu còn trống 1/2", làm một câu thì còn 1; "Xem kết quả" hỏi lại "Còn 1 câu chưa làm, sẽ tính là sai." rồi ra
     kết quả, câu trống tính sai. "← Thoát" giữa chừng vẫn không tính câu chưa tới. Làm như thi (Na, đề thử nghiệm đủ dạng câu): chọn rồi
     chạm ô khác thì câu thành "Đã trả lời" (X23); trả lời hết 15 câu (một câu trắc nghiệm cố ý sai) thì màn "Xem lại bài làm" ghi đã làm
     hết, chỉ có "Nộp bài", chú thích chỉ có "Đã trả lời (15)"; mở lại từng câu thấy đúng câu trả lời cũ (dòng #qzEditNote, không "Bỏ qua"),
     "Trả lời" về lại màn đó; sửa câu sai thành đúng rồi nộp: điểm theo câu trả lời cuối (đúng hết, không có #qzReview); đồng hồ chạy ở màn
     đó; hàng trên cùng một hàng ở câu 11; lượt khác chọn rồi để hết giờ thì câu đó được chấm. Đề Tiếng Anh (Bin, làm như thi): hàng trên
     cùng một hàng ở câu 11/25, bảng và màn "Xem lại bài làm" không có chữ cái tiếng Việt; bỏ qua cả 25 câu thì chú thích ở màn đó chỉ có
     "Skipped (25)", không có "Not done" (X29). Ảnh ở tests/screenshots/l38-l39/ (bản ghép <tên>.jpg: bang-so-cau, xem-lai-con-trong,
     lam-tiep, sua-cau, xem-lai-da-lam-het; chép sang docs/hinh-9n/). */
  const OUTL38 = OUT + "l38-l39/"; fs.mkdirSync(OUTL38, { recursive: true });
  const l38 = { problems: [], shots: [], runs: [] };
  const CHU_VIET38 = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/iu;
  for (const scheme of ["light", "dark"]) {
    const c = await newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, colorScheme: scheme });
    await localConfig(c); watchOut(c);
    const p = await c.newPage(); p.on("pageerror", (e) => errs.push("pageerror L38: " + e.message)); p.on("console", (m) => { if (m.type() === "error") errs.push("console L38: " + m.text()); });
    const r = { scheme }; l38.runs.push(r);
    const check = async (label) => (await p.evaluate(audit)).forEach((x) => l38.problems.push(`L38 · ${scheme} · ${label}: ${x}`));
    const snap = async (n) => { await p.evaluate(() => { scrollTo(0, 0); const t = document.querySelector("#toast"); if (t) t.hidden = true; }); await p.screenshot({ path: `${OUTL38}${n}-${scheme}.png`, fullPage: true }); l38.shots.push(`${n}-${scheme}`); };
    const txt = (sel) => p.evaluate((s) => { const e = document.querySelector(s); return e ? e.textContent.replace(/\s+/g, " ").trim() : null; }, sel);
    const has = (sel) => p.evaluate((s) => !!document.querySelector(s), sel);
    // bảng số câu đang hiện (#qzGrid hay #qzRecap): số ô, cỡ ô, số ô ở hàng đầu, lớp và dấu của từng ô, aria-label, ô đang làm, chú thích, bảng đang mở
    const board = () => p.evaluate(() => { const cells = [...document.querySelectorAll(".qz-cells .qz-cell[data-i]")], b0 = cells[0] && cells[0].getBoundingClientRect();
      return { n: cells.length, h: b0 ? Math.round(b0.height) : 0, perRow: b0 ? cells.filter((e) => Math.abs(e.getBoundingClientRect().top - b0.top) < 1).length : 0,
        st: cells.map((e) => e.className.replace("qz-cell ", "") + ":" + e.querySelector("i").textContent), aria: cells.map((e) => e.getAttribute("aria-label")), cur: cells.findIndex((e) => e.getAttribute("aria-current") === "step"),
        key: (document.querySelector(".qz-key") || {}).textContent || "", open: !(document.querySelector("#qzGrid") || { hidden: true }).hidden, exp: document.querySelector("#qzProg") ? document.querySelector("#qzProg").getAttribute("aria-expanded") : null }; });
    // mẫu ô có dấu ở chú thích (X28): dấu có nằm trong một thẻ <i> bên trong mẫu như ô thật không; kiểu chữ, màu của dấu đó và của dấu trong
    // một ô thật cùng trạng thái
    const keyMarks = () => p.evaluate(() => [...document.querySelectorAll(".qz-key .qz-cell")].filter((e) => e.textContent).map((e) => {
      const st = (e.className.match(/\bst-(\w+)/) || [])[1], m = e.querySelector("i"), real = document.querySelector(`.qz-cells .qz-cell.st-${st} i`);
      return { st, mark: e.textContent, inner: !!m && m.textContent === e.textContent, style: m && getComputedStyle(m).fontStyle, color: m && getComputedStyle(m).color,
        want: real && getComputedStyle(real).color, wantMark: real && real.textContent };
    }));
    // hàng trên cùng của làm như thi: một hàng (đồng hồ, nút mở bảng, "Nộp bài" cùng mép trên), cao ≤ 48px (X26)
    const topRow = () => p.evaluate(() => { const row = document.querySelector(".qz-top").getBoundingClientRect(), bs = ["#qzTimer", "#qzProg", "#qzSubmit"].map((s) => document.querySelector(s).getBoundingClientRect());
      const mid = (b) => (b.top + b.bottom) / 2; // chip đồng hồ thấp hơn hai nút, canh giữa theo chiều dọc
      return { h: Math.round(row.height), oneRow: bs.every((b) => Math.abs(mid(b) - mid(bs[0])) < 2) && bs.slice(1).every((b) => b.height >= 44), used: Math.round(bs.reduce((a, b) => a + b.width, 0)), w: Math.round(row.width) }; });
    const login = async (who, pin) => { await p.goto(BASE + "/"); await p.click(`.tile[data-u="${ids[who]}"]`); await p.fill("#pinIn", pin); await p.waitForSelector("#today"); };
    const guess = async () => { if (await p.$("#qzFill")) await p.fill("#qzFill", "1"); else if (await p.$("#qzNum")) await p.fill("#qzNum", "1"); else if (await p.$("#qzEssay")) await p.fill("#qzEssay", "Bài làm thử."); else await p.click(".opts .opt >> nth=0"); };
    const scoreLine = () => txt("#qzScore .stack b");
    // ---- ôn luyện: Bin, Tiếng Việt 4 · Cuối kì I · Đề 1
    await login("Bin", PINS.Bin);
    await p.goto(BASE + "/#/quiz/tv4-ck1-de1"); await p.waitForSelector("#qPractice");
    const TVQ = await p.evaluate(() => Store.bank("tv4-ck1-de1").questions), nEssay = TVQ.filter((q) => q.type === "essay").length;
    await p.click("#qPractice"); await p.waitForSelector("#qzGo");
    r.prog = await p.$eval("#qzProg", (b) => ({ tag: b.tagName, text: b.textContent.trim(), exp: b.getAttribute("aria-expanded"), ctl: b.getAttribute("aria-controls"), h: Math.round(b.getBoundingClientRect().height), svg: !!b.querySelector("svg") }));
    r.grid0 = await board();
    await p.click("#qzProg"); r.grid1 = await board(); await check("bảng số câu mở"); await snap("bang-so-cau");
    await p.click("#qzProg"); r.grid2 = await board();
    let ok = 0; r.goMid = null; r.goLast = null;
    for (let i = 0; i < 40 && !(await p.$("#qzRecap, .score")); i++) {
      if (i === 1 || i === 3) { await p.click("#qzSkip"); continue; }
      await guess(); await p.click("#qzGo");
      if (await p.$("#qzFb .fb.ok")) ok++;
      if (i === 5) r.goMid = await txt("#qzGo");
      if (i === 24) r.goLast = await txt("#qzGo");
      await p.click("#qzGo");
    }
    r.recap1 = { has: await has("#qzRecap"), h2: await txt("#qzRecap h2"), p: await txt("#qzRecap p"), end: await txt("#qzEnd"), more: await txt("#qzMore"), gone: await p.evaluate(() => ["#qzExit", "#qzProg", "#qzSubmit", ".bar", "#qzReview", "#qzTimer", "#qzSkip"].filter((s) => document.querySelector(s))),
      board: await board(), marks: await keyMarks(), quizzing: await p.evaluate(() => document.body.classList.contains("quizzing")) };
    await check("Xem lại bài làm, còn câu trống"); await snap("xem-lai-con-trong");
    // rời trang khi đang ở màn này: vẫn hỏi lại
    await p.evaluate(() => history.back()); await p.waitForSelector("#leaveBox"); r.leave = await txt("#leaveBox"); await p.click("#leaveNo"); await p.waitForTimeout(300); r.stay = await has("#qzRecap");
    // mở lại câu đã Kiểm tra (chấm tự động) từ bảng: chỉ xem lại; xong về lại màn này (X22)
    const okCell = await p.$eval(".qz-cells", (g) => { const x = [...g.querySelectorAll(".qz-cell")].find((e) => /st-(ok|bad)/.test(e.className)); return x ? +x.dataset.i : -1; });
    await p.click(`.qz-cells .qz-cell[data-i="${okCell}"]`); await p.waitForSelector("#qzGo");
    r.reopen = { prog: await txt("#qzProg"), want: `Câu ${okCell + 1}/25`, fb: await has("#qzFb .fb"), marked: await p.evaluate(() => !!document.querySelector(".opt.right, .opt.wrong, .mt-li.right, .mt-li.wrong, .ord-s.right, .ord-s.wrong, #qzFill[readonly], #qzNum[readonly]")),
      skip: await has("#qzSkip"), go: await txt("#qzGo"), report: await has(".rp-link") };
    await check("câu đã Kiểm tra mở lại"); await p.click("#qzGo"); r.reopen.back = await has("#qzRecap");
    // làm tiếp: chỉ các câu còn trống, theo số câu
    await p.click("#qzMore"); await p.waitForSelector("#qzGo");
    r.round = { tag: await txt(".qz-left"), prog: await txt("#qzProg"), skip: await has("#qzSkip") };
    await check("vòng làm tiếp"); await snap("lam-tiep");
    await guess(); await p.click("#qzGo"); if (await p.$("#qzFb .fb.ok")) ok++; r.round.go = await txt("#qzGo"); await p.click("#qzGo");
    r.round.tag2 = await txt(".qz-left"); r.round.prog2 = await txt("#qzProg"); await p.click("#qzSkip");
    r.recap2 = { p: await txt("#qzRecap p"), more: await txt("#qzMore") };
    await p.click("#qzEnd"); r.ask = await txt("#qzFb .confirm"); await check("hỏi lại khi xem kết quả"); await p.click("#qzNo"); r.askClosed = (await txt("#qzFb")) === "" && (await has("#qzRecap"));
    await p.click("#qzEnd"); await p.click("#qzYes"); await p.waitForSelector(".score");
    r.result = { line: await scoreLine(), want: `${ok}/${25 - nEssay} câu đúng`, review: await has("#qzReview") };
    // "← Thoát" giữa chừng (như trước): câu bỏ qua tính sai, câu chưa tới không tính
    await p.click("#qzAgain"); await p.waitForSelector("#qzGo");
    const q1 = await currentOn(p, TVQ); await guess(); await p.click("#qzGo"); const ok2 = (await p.$("#qzFb .fb.ok")) ? 1 : 0; await p.click("#qzGo"); await p.click("#qzSkip");
    await p.click("#qzExit"); r.exitAsk = await txt("#qzFb .confirm"); await p.click("#qzYes"); await p.waitForSelector(".score");
    r.exitResult = { line: await scoreLine(), want: `${ok2}/${q1 && q1.type === "essay" ? 1 : 2} câu đúng` };
    // ---- làm như thi: Na, đề thử nghiệm đủ dạng câu
    await p.goto(BASE + "/#/account"); await p.click("#switchWho, #logout"); await p.waitForTimeout(200);
    await login("Na", "4444");
    const EX = "thunghiem6-dang-cau-moi";
    await p.goto(BASE + "/#/quiz/" + EX); await p.waitForSelector("#qExam");
    const Q = await p.evaluate((id) => Store.bank(id).questions, EX), nAuto = Q.filter((q) => q.type !== "essay").length;
    await p.click("#qExam"); await p.waitForSelector("#qzGo");
    // chọn rồi chạm ô khác (X23): câu thành "Đã trả lời"; chạm ô đang làm thì chỉ đóng bảng
    const q0 = await currentOn(p, Q);
    if (!q0) l38.problems.push(`L38 · ${scheme}: không nhận ra câu đầu của đề thử nghiệm`);
    else {
      await answerOn(p, q0, true, false);
      await p.click("#qzProg"); await p.click('.qz-cells .qz-cell[data-i="1"]'); await p.waitForSelector("#qzGo");
      await p.click("#qzProg"); r.exJump = await board();
      await p.click('.qz-cells .qz-cell[data-i="1"]'); r.exSame = { open: (await board()).open, prog: await txt("#qzProg") };
      // trả lời hết theo dữ liệu, câu trắc nghiệm đầu tiên cố ý sai
      let wrongQ = null;
      for (let i = 0; i < 20 && !(await p.$("#qzRecap, .score")); i++) {
        const q = await currentOn(p, Q); if (!q) { l38.problems.push(`L38 · ${scheme}: không nhận ra câu ` + (await txt(".qcard .qtext"))); break; }
        const bad = !wrongQ && q.type === "mc"; if (bad) wrongQ = q;
        if (!(await answerOn(p, q, !bad))) { l38.problems.push(`L38 · ${scheme}: không trả lời được câu ${q.q.slice(0, 40)}`); break; }
      }
      r.exRecap = { p: await txt("#qzRecap p"), end: await p.$eval("#qzEnd", (b) => b.textContent + "|" + b.className).catch(() => null), more: await has("#qzMore"), timer: await txt("#qzTimer"), board: await board(), gone: await p.evaluate(() => ["#qzExit", "#qzProg", "#qzSubmit", ".bar", "#qzReview"].filter((s) => document.querySelector(s))) };
      await check("Xem lại bài làm, đã làm hết"); await snap("xem-lai-da-lam-het");
      await p.waitForTimeout(1200); r.exRecap.ticks = (await txt("#qzTimer")) !== r.exRecap.timer; // đồng hồ vẫn chạy
      // mở lại từng câu: đúng câu trả lời cũ; "Trả lời" về lại màn này; sửa câu sai thành đúng
      r.exReopen = []; let shotSua = false;
      for (let i = 0; i < Q.length; i++) {
        await p.click(`.qz-cells .qz-cell[data-i="${i}"]`); await p.waitForSelector("#qzGo");
        const q = await currentOn(p, Q); if (!q) { l38.problems.push(`L38 · ${scheme}: không nhận ra câu ${i + 1} mở lại`); break; }
        const right = q !== wrongQ;
        const got = await p.evaluate(([q, right]) => {
          const T = (s) => s.replace(/\s+/g, " ").trim(), sel = document.querySelector(".opts .opt.sel");
          switch (q.type) {
            case "mc": return !!sel && T(sel.lastElementChild.textContent) === T(right ? q.o[0] : q.o[1]);
            case "tf": return !!sel && T(sel.lastElementChild.textContent) === (q.a === right ? "Đúng" : "Sai");
            case "fill": return document.querySelector("#qzFill").value === q.ans[0];
            case "num": return document.querySelector("#qzNum").value === String(q.ans);
            case "tf4": return q.a.every((a, k) => { const b = document.querySelector(`.tf4 .opt[data-i="${k}"].sel`); return !!b && b.dataset.v === (a === right ? "1" : "0") && b.getAttribute("aria-pressed") === "true"; });
            case "match": return document.querySelectorAll(".mt-ri.sel").length === q.l.length && q.l.every((_, k) => T(document.querySelector(`.mt-li[data-i="${k}"] .mt-to`).textContent).endsWith(T(q.r[right ? k : (k + 1) % q.l.length])));
            case "order": return [...document.querySelectorAll(".ord-s")].map((b) => +b.dataset.k).join() === q.o.map((_, k) => (right ? k : q.o.length - 1 - k)).join();
            case "essay": return document.querySelector("#qzEssay").value === "Bài làm thử." && !document.querySelector("#qzEssay").readOnly;
          }
          return false;
        }, [q, right]);
        r.exReopen.push({ type: q.type, ok: got, note: await txt("#qzEditNote"), skip: await has("#qzSkip"), go: await txt("#qzGo") });
        if (i === 10) r.viTop = Object.assign(await topRow(), { prog: await txt("#qzProg") });
        if (!right) { if (!shotSua) { await check("câu đã trả lời mở lại"); await snap("sua-cau"); shotSua = true; } await answerOn(p, q, true); }
        else await p.click("#qzGo");
        if (!(await has("#qzRecap"))) { l38.problems.push(`L38 · ${scheme}: xong câu ${i + 1} mở lại không về màn Xem lại bài làm`); break; }
      }
      await p.click("#qzEnd"); await p.waitForSelector(".score");
      r.exResult = { line: await scoreLine(), want: `${nAuto}/${nAuto} câu đúng`, review: await has("#qzReview") };
      // chọn rồi để hết giờ: câu đó được chấm (X23)
      await p.goto(BASE + "/#/home"); await p.waitForSelector("#today"); await p.goto(BASE + "/#/quiz/" + EX); await p.waitForSelector("#qExam"); await p.click("#qExam"); await p.waitForSelector("#qzGo");
      const qt = await currentOn(p, Q);
      if (qt) { await answerOn(p, qt, true, false); await p.clock.setSystemTime((await nowIn(p)) + 31 * 60 * 1000); await p.waitForSelector(".score", { timeout: 5000 }).catch(() => {}); }
      r.timeout = { score: await has(".score"), line: await scoreLine(), want: qt ? `${qt.type === "essay" ? 0 : 1}/${nAuto} câu đúng` : null };
    }
    // ---- đề Tiếng Anh, làm như thi (Bin): hàng trên cùng một hàng ở câu 11/25; bảng và màn "Xem lại bài làm" bằng tiếng Anh
    await p.goto(BASE + "/#/account"); await p.click("#switchWho, #logout"); await p.waitForTimeout(200);
    await login("Bin", PINS.Bin);
    await p.goto(BASE + "/#/quiz/ta4-ck1-de1"); await p.waitForSelector("#qExam"); await p.click("#qExam"); await p.waitForSelector("#qzGo");
    for (let k = 0; k < 10; k++) await p.click("#qzSkip");
    r.en = { prog: await txt("#qzProg"), top: await topRow() };
    await check("đề Tiếng Anh, câu 11"); await p.click("#qzProg"); r.en.board = await board(); r.en.viGrid = CHU_VIET38.test(await txt("#qzGrid")); await check("đề Tiếng Anh, bảng số câu");
    await p.click("#qzProg");
    for (let k = 0; k < 20 && !(await p.$("#qzRecap")); k++) await p.click("#qzSkip");
    r.en.recap = { p: await txt("#qzRecap p"), end: await txt("#qzEnd"), more: await txt("#qzMore"), key: await txt(".qz-key"), vi: CHU_VIET38.test(await txt("#view")) };
    await check("đề Tiếng Anh, Xem lại bài làm");
    await p.click("#qzEnd"); r.en.ask = await txt("#qzFb .confirm"); await p.click("#qzYes"); await p.waitForTimeout(300); r.en.home = await p.evaluate(() => location.hash);
    await c.close();
  }
  { // ghép ảnh sáng/tối cạnh nhau (tests/screenshots/l38-l39/<tên>.jpg)
    const gp = await browser.newPage({ viewport: { width: 752, height: 400 }, deviceScaleFactor: 2 });
    for (const n of [...new Set(l38.shots.map((x) => x.replace(/-(light|dark)$/, "")))]) {
      const img = (sc) => "data:image/png;base64," + fs.readFileSync(`${OUTL38}${n}-${sc}.png`).toString("base64");
      await gp.setContent(`<body style="margin:0;display:flex;gap:16px;padding:8px;background:#888;align-items:flex-start"><img src="${img("light")}" width="360"><img src="${img("dark")}" width="360"></body>`);
      await gp.screenshot({ path: `${OUTL38}${n}.jpg`, fullPage: true, type: "jpeg", quality: 70 });
    }
    await gp.close();
  }
  console.log("L38:", JSON.stringify(l38.runs), "problems:", l38.problems);
  const l38OK = !l38.problems.length && l38.runs.length === 2 && l38.runs.every((r) => { const g1 = r.grid1, rb = r.recap1.board, eb = r.exRecap && r.exRecap.board;
    return r.prog.tag === "BUTTON" && r.prog.text === "Câu 1/25" && r.prog.exp === "false" && r.prog.ctl === "qzGrid" && r.prog.h >= 44 && r.prog.svg && !r.grid0.open
      && g1.open && g1.exp === "true" && g1.n === 25 && g1.h >= 44 && g1.perRow === 5 && g1.cur === 0 && g1.aria[0] === "Câu 1, chưa làm, đang làm" && g1.aria[1] === "Câu 2, chưa làm" && g1.key === "Chưa làm (25)Đang làm" && g1.st.every((s) => s.startsWith("st-blank"))
      && !r.grid2.open && r.grid2.exp === "false" && r.goMid === "Câu tiếp" && r.goLast === "Xem lại bài làm"
      && r.recap1.has && r.recap1.h2 === "Xem lại bài làm" && r.recap1.p === "Bạn còn 2 câu chưa làm." && r.recap1.end === "Xem kết quả" && r.recap1.more === "Làm tiếp 2 câu" && !r.recap1.gone.length && r.recap1.quizzing
      && rb.n === 25 && rb.cur === -1 && rb.st.filter((s) => s === "st-skip:–").length === 2 && rb.st.filter((s) => s === "st-ok:✓" || s === "st-bad:✗" || s === "st-done:").length === 23 && /Bỏ qua \(2\)/.test(rb.key) && !/Đang làm/.test(rb.key) && rb.aria.filter((a) => / đã bỏ qua$/.test(a)).length === 2
      && !/Chưa làm/.test(rb.key) && ["skip", "ok", "bad"].every((st) => r.recap1.marks.some((k) => k.st === st)) && r.recap1.marks.every((k) => k.inner && k.style === "normal" && k.color === k.want && k.mark === k.wantMark) // X29, X28
      && /Dừng ôn và rời trang\?/.test(r.leave) && r.stay
      && r.reopen.prog === r.reopen.want && r.reopen.fb && r.reopen.marked && !r.reopen.skip && r.reopen.go === "Xem lại bài làm" && r.reopen.report && r.reopen.back
      && r.round.tag === "Câu còn trống 1/2" && r.round.prog === "Câu 2/25" && r.round.skip && r.round.go === "Câu tiếp" && r.round.tag2 === "Câu còn trống 2/2" && r.round.prog2 === "Câu 4/25"
      && r.recap2.p === "Bạn còn 1 câu chưa làm." && r.recap2.more === "Làm tiếp 1 câu" && r.ask === "Còn 1 câu chưa làm, sẽ tính là sai.Xem kết quảLàm tiếp" && r.askClosed
      && r.result.line === r.result.want && r.result.review && r.exitAsk === "Dừng ôn và xem kết quả?DừngLàm tiếp" && r.exitResult.line === r.exitResult.want
      && r.exJump && r.exJump.st[0] === "st-ans:" && r.exJump.cur === 1 && /Đã trả lời \(1\)/.test(r.exJump.key) && !r.exSame.open && r.exSame.prog === "Câu 2/15"
      && r.exRecap.p === "Bạn đã làm hết 15 câu. Xem lại hoặc nộp bài." && r.exRecap.end === "Nộp bài|btn main" && !r.exRecap.more && /^Còn \d\d:\d\d$/.test(r.exRecap.timer) && r.exRecap.ticks && !r.exRecap.gone.length && eb.st.every((s) => s === "st-ans:") && eb.key === "Đã trả lời (15)"
      && r.exReopen.length === 15 && r.exReopen.every((x) => x.ok && x.note === "Bạn đã trả lời câu này. Muốn sửa thì chọn lại rồi bấm Trả lời." && !x.skip && x.go === "Trả lời") && ["mc", "fill", "tf4", "num", "match", "order", "essay"].every((t) => r.exReopen.some((x) => x.type === t))
      && r.viTop.oneRow && r.viTop.h <= 48 && r.viTop.prog === "Câu 11/15" && r.exResult.line === r.exResult.want && !r.exResult.review && r.timeout.score && r.timeout.line === r.timeout.want
      && r.en.prog === "11 of 25" && r.en.top.oneRow && r.en.top.h <= 48 && !r.en.viGrid && /^Not done \(15\)–Skipped \(10\)Current$/.test(r.en.board.key) && r.en.board.aria[0] === "Question 1, skipped" && r.en.board.aria[10] === "Question 11, not done, current"
      && r.en.recap.p === "You have 25 questions left." && r.en.recap.end === "Finish test" && r.en.recap.more === "Do the 25 left" && !r.en.recap.vi && r.en.recap.key === "–Skipped (25)" && r.en.ask === "Exit the test? You haven't answered any questions, so no score is saved.ExitKeep going" && r.en.home === "#/home"; })
    && ["bang-so-cau", "xem-lai-con-trong", "lam-tiep", "sua-cau", "xem-lai-da-lam-het"].every((n) => l38.shots.includes(n + "-light") && l38.shots.includes(n + "-dark"));

  step("lesson pages: skip and come back, question board, review screen (9o, L38, L39)");
  /* Phiên 9o (L38, L39): cùng flow với đề ngân hàng (Phiên 9n) trong 4 bài ôn dạng trang, chạy trong khung ở 360px sáng/tối. Chữ "9 / 20" rời
     thanh trên, thành nút #gridBtn "Câu 9/20" (IOE "9 of 30") cạnh thanh tiến độ, mở bảng #grid (ô .qz-cell như đề ngân hàng, ≥ 44px, 5 ô một
     hàng; chú thích không ghi mục 0 câu, mẫu ô có dấu đứng cùng màu với dấu trong ô, X28, X29). Mỗi bài: một lượt luyện tập (Bin: l4, IOE 4;
     Na: l6, IOE 6): bỏ qua câu 2 và 3, câu 4 sai, còn lại đúng → sau câu cuối (nút ghi "Xem lại bài làm") tới màn #recap "Bạn còn 2 câu chưa làm."
     (không có #gridBtn, #skipBtn, .bar; #endBtn là nút "Xem kết quả" nên app vẫn hỏi khi rời bài, kể cả khi bảng số câu đang mở); mở lại câu đã
     Kiểm tra chỉ xem lại rồi về màn đó; "Làm tiếp 2 câu" (nhãn "Câu còn trống 1/2", "Câu tiếp", "Câu còn trống 2/2"), bỏ qua lần nữa → còn 1
     câu; "Xem kết quả" hỏi lại trong #endArea (#yesEnd, #noEnd), câu trống tính sai: n−2 câu đúng, ontapReport gọi một lần, "Ôn câu sai" =
     câu sai + câu bỏ qua (câu bỏ qua rồi làm đúng ở vòng làm tiếp đã ra khỏi danh sách). Một lượt đề thi thử: câu 1 chọn rồi bấm "Nộp bài sớm"
     thì lời hỏi lại tính câu đó là đã trả lời (X23), "Làm tiếp" về câu; câu 2 cố ý sai, còn lại đúng → màn "Bạn đã làm hết N câu…" chỉ có
     "Nộp bài" (nút chính), đồng hồ ở thanh trên cùng hàng với tên bài (X26); mở lại câu 2 thấy câu trả lời cũ, dòng #editNote, không "Bỏ qua",
     sửa rồi "Trả lời" về lại màn đó; câu 3 chọn sai rồi chạm ô khác trên bảng là đã trả lời (X23), sửa lại; nộp: đúng hết, ontapReport một lần,
     các câu của đề ra khỏi "Ôn câu sai". IOE: mọi màn không có chữ cái tiếng Việt; X27: giả lập máy phát được tiếng (speak giả), đề thi thử có
     câu nghe: Play một lần còn "2 of 3 plays left", rời câu bằng bảng rồi quay lại vẫn 2; tiếng lỗi thì mọi câu nghe còn trống, kể cả câu đã bỏ
     qua trước đó, thành câu đọc, không bỏ câu khỏi S.qs. Phiên 9ob: màn "Xem lại bài làm" còn câu trống có #endBtn, #moreBtn một hàng, trong
     hàng, cao ≥ 44px, chữ một dòng; nút padding ngang 12px, cách nhau 8px (màn câu hỏi giữ 18px, 10px); đổi chữ thành "Làm tiếp 120 câu" ("Do
     the 120 left") vẫn một hàng (X30). Luyện theo bài, theo unit: mọi câu (cả câu mở lại, vòng làm tiếp) chỉ có một nhãn trên câu, là tên lượt;
     "Ôn câu sai" ("Mistake Review", dừng ngay, không làm câu nào) và đề thi thử có hai nhãn, nhãn phải là bài, unit của câu (X31). Ảnh ở
     tests/screenshots/9o/ (bản ghép <tên>.jpg, chép sang docs/hinh-9o/). */
  const OUT9O = OUT + "9o/"; fs.mkdirSync(OUT9O, { recursive: true });
  const mo = { problems: [], shots: [], runs: [] };
  // mẫu ô ở chú thích (X28): có đủ các trạng thái sts, dấu trong thẻ <i>, chữ đứng, cùng màu và cùng dấu với ô thật
  const marksOK = (ms, sts) => sts.every((st) => ms.some((k) => k.st === st)) && ms.every((k) => k.inner && k.style === "normal" && k.color === k.want && k.mark === k.wantMark);
  // chữ của hai loại bài (IOE tiếng Anh)
  const T = (m) => (m.startsWith("ioe") ? { prog: (i, n) => `${i} of ${n}`, go: "Next question", recap: "Back to review", res: "See results", head: "Review your answers", left: (n) => `You have ${n} question${n === 1 ? "" : "s"} left.`, all: (n) => `You have answered all ${n} questions. Review or finish the test.`, more: (n) => `Do the ${n} left`, submit: "Finish test", tag: (i, n) => `Left to do: ${i} of ${n}`, warn: (n) => (n === 1 ? "1 question is not done and will count as wrong." : `${n} questions are not done and will count as wrong.`), keep: "Keep going", answer: "Submit answer", note: "You have answered this question. To change it, choose again and tap Submit answer.", keyBlank: (n) => `Not done (${n})Current`, keySkip: "Skipped (2)", keyAns: (n) => `Answered (${n})`, notDone: /Not done/, endEarly: (n) => `Finish the test now? ${n} questions are not done and will count as wrong.`, line: (r, t) => `${Math.round(r / t * 100)}% correct`, score: (r, t) => `${r}/${t}` }
      : { prog: (i, n) => `Câu ${i}/${n}`, go: "Câu tiếp", recap: "Xem lại bài làm", res: "Xem kết quả", head: "Xem lại bài làm", left: (n) => `Bạn còn ${n} câu chưa làm.`, all: (n) => `Bạn đã làm hết ${n} câu. Xem lại hoặc nộp bài.`, more: (n) => `Làm tiếp ${n} câu`, submit: "Nộp bài", tag: (i, n) => `Câu còn trống ${i}/${n}`, warn: (n) => `Còn ${n} câu chưa làm, sẽ tính là sai.`, keep: "Làm tiếp", answer: "Trả lời", note: "Bạn đã trả lời câu này. Muốn sửa thì chọn lại rồi bấm Trả lời.", keyBlank: (n) => `Chưa làm (${n})Đang làm`, keySkip: "Bỏ qua (2)", keyAns: (n) => `Đã trả lời (${n})`, notDone: /Chưa làm/, endEarly: (n) => `Nộp bài ngay? Còn ${n} câu chưa làm, sẽ tính là sai.`, line: (r, t) => `${r}/${t} câu đúng`, score: null });
  for (const scheme of ["light", "dark"]) {
    const c = await newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, colorScheme: scheme });
    await localConfig(c); watchOut(c);
    const p = await c.newPage(); p.on("pageerror", (e) => errs.push("pageerror 9o: " + e.message)); p.on("console", (m) => { if (m.type() === "error") errs.push("console 9o: " + m.text()); });
    const signIn = async (who, pin) => { await p.goto(BASE + "/#/account"); await p.waitForTimeout(200); if (await p.$("#switchWho, #logout")) { await p.click("#switchWho, #logout"); await p.waitForTimeout(200); } await p.goto(BASE + "/"); await p.click(`.tile[data-u="${ids[who]}"]`); await p.fill("#pinIn", pin); await p.waitForTimeout(400); };
    let fr = null;
    const openMod = async (m) => {
      await p.goto(BASE + "/#/home"); await p.waitForTimeout(150); await p.goto(BASE + "/#/play/" + m);
      for (let i = 0; i < 60 && !(fr = p.frames().find((f) => f.url().includes(`/modules/${m}/`))); i++) await p.waitForTimeout(100);
      await fr.waitForSelector(".stab, .unit"); await p.waitForTimeout(150);
    };
    const wrongKeyOf = (m, who, sid) => `u_${ids[who]}__${L27_KEY[m]}_wrong${sid ? "_" + sid : ""}`;
    const getWrong = (k) => p.evaluate((k) => JSON.parse(localStorage.getItem(k) || "[]"), k);
    const setWrong = (k, v) => p.evaluate(([k, v]) => localStorage.setItem(k, JSON.stringify(v)), [k, v]);
    const same = (a, b) => a.length === b.length && a.every((x) => b.includes(x));
    const ftxt = (sel) => fr.evaluate((s) => { const e = document.querySelector(s); return e ? e.textContent.replace(/\s+/g, " ").trim() : null; }, sel);
    const fhas = (sel) => fr.evaluate((s) => !!document.querySelector(s), sel);
    const check = async (label) => { (await fr.evaluate(audit)).forEach((x) => mo.problems.push(`9o · ${scheme} · ${label}: ${x}`)); (await p.evaluate(audit)).forEach((x) => mo.problems.push(`9o · ${scheme} · ${label} (trang app): ${x}`)); };
    const snap = async (n) => {
      const h = await fr.evaluate(() => document.documentElement.scrollHeight), top = await p.$eval(".player iframe", (e) => Math.round(e.getBoundingClientRect().top));
      await p.setViewportSize({ width: 360, height: Math.min(1600, Math.max(740, top + h + 12)) }); await p.waitForTimeout(150);
      await p.evaluate(() => { const t = document.querySelector("#toast"); if (t) t.hidden = true; });
      await p.screenshot({ path: `${OUT9O}${n}-${scheme}.png` });
      await p.setViewportSize({ width: 360, height: 740 }); await p.waitForTimeout(100);
      mo.shots.push(`${n}-${scheme}`);
    };
    // bảng số câu đang hiện trong khung (#grid hay #recap): số ô, cỡ ô, số ô ở hàng đầu, lớp và dấu từng ô, aria-label, ô đang làm, chú thích, bảng mở
    const board = () => fr.evaluate(() => { const cells = [...document.querySelectorAll(".qz-cells .qz-cell[data-i]")], b0 = cells[0] && cells[0].getBoundingClientRect();
      return { n: cells.length, h: b0 ? Math.round(b0.height) : 0, perRow: b0 ? cells.filter((e) => Math.abs(e.getBoundingClientRect().top - b0.top) < 1).length : 0,
        st: cells.map((e) => e.className.replace("qz-cell ", "") + ":" + e.querySelector("i").textContent), aria: cells.map((e) => e.getAttribute("aria-label")), cur: cells.findIndex((e) => e.getAttribute("aria-current") === "step"),
        key: (document.querySelector(".qz-key") || {}).textContent || "", open: !(document.querySelector("#grid") || { hidden: true }).hidden, exp: document.querySelector("#gridBtn") ? document.querySelector("#gridBtn").getAttribute("aria-expanded") : null }; });
    // mẫu ô có dấu ở chú thích (X28): dấu trong thẻ <i> như ô thật, chữ đứng, cùng màu với dấu trong một ô thật cùng trạng thái
    const keyMarks = () => fr.evaluate(() => [...document.querySelectorAll(".qz-key .qz-cell")].filter((e) => e.textContent).map((e) => {
      const st = (e.className.match(/\bst-(\w+)/) || [])[1], m = e.querySelector("i"), real = document.querySelector(`.qz-cells .qz-cell.st-${st} i`);
      return { st, mark: e.textContent, inner: !!m && m.textContent === e.textContent, style: m && getComputedStyle(m).fontStyle, color: m && getComputedStyle(m).color, want: real && getComputedStyle(real).color, wantMark: real && real.textContent };
    }));
    // thanh trên của trang một hàng ở 360px (X26): tên bài và đồng hồ (đề thi thử) cùng mép; hàng đầu màn làm bài: thanh tiến độ và nút mở bảng cùng hàng, nút ≥ 44px, không tràn
    const topRow = () => fr.evaluate(() => { const mid = (e) => { const b = e.getBoundingClientRect(); return (b.top + b.bottom) / 2; }; const brand = document.querySelector(".brand"), chip = document.querySelector("#timer"), top = document.querySelector(".top").getBoundingClientRect(), bar = document.querySelector(".qtop .bar"), gb = document.querySelector("#gridBtn");
      return { chip: !!chip, oneRow: !chip || Math.abs(mid(brand) - mid(chip)) < 2, topH: Math.round(top.height), qtop: !!bar && !!gb && Math.abs(mid(bar) - mid(gb)) < 2 && gb.getBoundingClientRect().height >= 44 && gb.getBoundingClientRect().right <= innerWidth && bar.getBoundingClientRect().width > 100 }; });
    // nhãn trên câu đang hiện (X31): chữ của từng nhãn trong .qhead, nối bằng "|"
    const heads = () => fr.evaluate(() => [...document.querySelectorAll(".qcard .qhead .label")].map((e) => e.textContent.replace(/\s+/g, " ").trim()).join("|"));
    // hàng nút dưới màn "Xem lại bài làm" (X30): #endBtn, #moreBtn cùng hàng, trong hàng, hàng trong khung, nút cao ≥ 44px mà chữ một dòng (< 60px);
    // đo lại với chữ more (số câu có ba chữ số) rồi trả chữ cũ; padding ngang của hai nút và khoảng cách
    const recapRow = (more) => fr.evaluate((more) => {
      const a = document.querySelector("#endBtn"), b = document.querySelector("#moreBtn"), row = b.parentElement, ok = (r) => r.height >= 44 && r.height < 60;
      const m = () => { const x = a.getBoundingClientRect(), y = b.getBoundingClientRect(), w = row.getBoundingClientRect();
        return { same: Math.abs(x.top - y.top) < 1, fit: x.left >= w.left - 0.5 && y.right <= w.right + 0.5 && w.right <= innerWidth && ok(x) && ok(y), need: Math.round((x.width + y.width) * 10) / 10, rowW: Math.round(w.width) }; };
      const now = m(), old = b.textContent; b.textContent = more; const long = m(); b.textContent = old;
      const pa = getComputedStyle(a), pb = getComputedStyle(b);
      return { now, long, pad: [pa.paddingLeft, pa.paddingRight, pb.paddingLeft, pb.paddingRight].join(" "), gap: getComputedStyle(row).columnGap };
    }, more);
    // app vẫn hỏi khi rời bài (có #endBtn hoặc #yesEnd trong khung): bấm nút quay lại của app rồi "Ở lại"
    const leaveAsks = async () => { await p.click(".player [data-go]"); const box = await p.waitForSelector("#leaveBox", { timeout: 2000 }).catch(() => null); if (box) { await p.click("#leaveNo"); await p.waitForTimeout(100); } return !!box; };
    const countRep = () => fr.evaluate(() => { window.__rep = 0; if (!window.__repWrapped) { window.__repWrapped = true; const o = window.ontapReport; window.ontapReport = (x) => { window.__rep++; return o(x); }; } });
    const reps = () => fr.evaluate(() => window.__rep);
    // ---- bài ôn l4, l6: câu đang hiện so chữ câu hỏi với items của môn (S của trang nằm trong IIFE); đề thi thử đọc buildTest (cố định theo số đề)
    const curQ = (sid) => fr.evaluate((sid) => {
      const flat = (s) => String(s).replace(/<[^>]+>/g, "").replace(/___/g, "").replace(/\s+/g, ""), t = flat(document.querySelector(".qtext").textContent);
      for (const it of SUBJ[sid].items) { const list = it.rd ? it.qs : [it]; for (let k = 0; k < list.length; k++) { const x = list[k]; if (flat(x.q) !== t) continue;
        const key = it.id + (it.rd ? "#" + k : "");
        if (x.o) return { kind: "mc", a: x.a || 0, key }; if (x.tf !== undefined) return { kind: "mc", a: x.tf ? 0 : 1, key }; return { kind: "fill", ans: [String(x.ans).split("|")[0]], key }; } }
      return null;
    }, sid);
    const answerL = async (q, right) => { if (q.kind === "mc") await fr.click(right ? `.opt[data-o="${q.a}"]` : `.opt:not([data-o="${q.a}"]) >> nth=0`); else await fr.fill("#fillIn", right ? q.ans[0] : "zzz"); };
    const givenL = (q, right) => fr.evaluate(([q, right]) => { if (q.kind === "fill") return document.querySelector("#fillIn").value === (right ? q.ans[0] : "zzz"); const s = document.querySelector(".opt.sel"); return !!s && (right ? +s.dataset.o === q.a : +s.dataset.o !== q.a); }, [q, right]);
    // ---- IOE: S là biến toàn cục của trang; trả lời câu đang hiện theo dữ liệu (mọi dạng câu), đúng hoặc sai
    const ioeQ = () => fr.evaluate(() => { const q = S.qs[S.i]; return { id: q.id, o: !!q.o, a: q.a, t: q.t, ans: q.ans, w: q.w, miss: q.miss, tiles: q.tiles, say: !!q.say, n: S.qs.length, i: S.i }; });
    const answerI = async (q, right) => {
      if (q.o || q.t === "e") await fr.click(right ? `.opt[data-o="${q.a}"]` : `.opt:not([data-o="${q.a}"]) >> nth=0`);
      else if (q.ans) await fr.fill("#fillIn", right ? q.ans[0] : "zzz");
      else if (q.t === "l") for (let j = 0; j < q.miss.length; j++) await fr.fill(`input.letter[data-m="${j}"]`, right ? q.w[q.miss[j]] : "z");
      else { // xếp từ, xếp chữ: câu mở lại đã có ô trong khung trả lời thì bỏ hết ra trước (chạm ô trong khung), rồi chạm theo thứ tự gốc (sai: ngược lại)
        for (let k = 0; k < 30; k++) { const t = fr.locator("#slot .tile").first(); if (!(await t.count())) break; await t.click(); }
        const ord = q.tiles.map((t, k) => [t.i, k]).sort((a, b) => a[0] - b[0]).map((x) => x[1]); if (!right) ord.reverse(); for (const k of ord) await fr.click(`#pool .tile[data-k="${k}"]`); }
    };
    const givenI = (q, right) => fr.evaluate(([q, right]) => {
      if (q.o || q.t === "e") { const s = document.querySelector(".opt.sel"); return !!s && (right ? +s.dataset.o === q.a : +s.dataset.o !== q.a); }
      if (q.ans) return document.querySelector("#fillIn").value === (right ? q.ans[0] : "zzz");
      if (q.t === "l") return [...document.querySelectorAll("input.letter")].every((inp, j) => inp.value === (right ? q.w[q.miss[j]] : "z"));
      const got = [...document.querySelectorAll("#slot .tile")].map((t) => t.textContent), ord = q.tiles.map((t) => t).sort((a, b) => a.i - b.i).map((t) => t.c); if (!right) ord.reverse(); return got.join("|") === ord.join("|");
    }, [q, right]);
    const vi = async (label) => { if (CHU_VIET38.test(await ftxt("#view"))) mo.problems.push(`9o · ${scheme} · ${label}: có chữ cái tiếng Việt`); };
    for (const [m, who, pin] of [["l4-giua-ki-1", "Bin", PINS.Bin], ["ioe-4", "Bin", PINS.Bin], ["l6-giua-ki-1", "Na", "4444"], ["ioe-6", "Na", "4444"]]) {
      const ioe = m.startsWith("ioe"), t = T(m), r = { m, scheme }, pre = ioe ? "ioe-" : "bai-on-", shotIt = (ioe ? m === "ioe-4" : m === "l4-giua-ki-1");
      mo.runs.push(r);
      await signIn(who, pin); await openMod(m);
      // chọn môn, bài (l4, l6: bài ≥ 4 câu, không có câu sinh ngẫu nhiên, để nhận ra câu theo chữ; IOE: unit ít câu nhất, ≥ 4 câu)
      // own: nhãn trên câu mong đợi (X31): left tên lượt luyện theo bài, theo unit; side bài, unit của các câu đó; wrong tên lượt "Ôn câu sai"
      let sid = null, key, own;
      if (!ioe) {
        const pick = await fr.evaluate(() => { for (const s of APP.subjects) { const l = s.lessons.find((l) => l.count >= 4 && !l.hasGen); if (l) return { sid: s.id, lid: l.id }; } return null; });
        sid = pick.sid; key = wrongKeyOf(m, who, sid); await setWrong(key, []);
        own = await fr.evaluate(([sid, lid]) => { const s = SUBJ[sid]; return { left: s.name + " · " + s.L[lid].short, side: s.L[lid].short, wrong: s.name + " · Ôn câu sai" }; }, [sid, pick.lid]);
        await fr.click(`.stab[data-sid="${sid}"]`); await fr.waitForSelector(`.stab[data-sid="${sid}"][aria-pressed="true"]`);
        await fr.click(`.lrow[data-l="${pick.lid}"]`); await fr.click("#goBtn"); await fr.waitForSelector("#skipBtn");
      } else {
        key = wrongKeyOf(m, who); await setWrong(key, []);
        const u = await fr.evaluate(() => Object.keys(UNITS).map((u) => [u, allQ().filter((q) => q.u == u && !q.say).length]).filter((x) => x[1] >= 4).sort((a, b) => a[1] - b[1])[0][0]);
        own = { left: `Unit ${u} Practice`, side: `Unit ${u}`, wrong: "Mistake Review" };
        await fr.click(`.unit[data-u="${u}"]`); await fr.waitForSelector("#skipBtn", { timeout: 15000 });
      }
      await countRep();
      const cur = () => (ioe ? ioeQ() : curQ(sid)), answer = (q, right) => (ioe ? answerI(q, right) : answerL(q, right)), given = (q, right) => (ioe ? givenI(q, right) : givenL(q, right)), keyOf = (q) => (ioe ? q.id : q.key);
      const n = +(await ftxt("#gridBtn")).replace(/\D+/g, " ").trim().split(" ")[1];
      r.prog = await fr.$eval("#gridBtn", (b) => ({ tag: b.tagName, exp: b.getAttribute("aria-expanded"), ctl: b.getAttribute("aria-controls"), h: Math.round(b.getBoundingClientRect().height), svg: !!b.querySelector("svg") }));
      r.prog.text = (await ftxt("#gridBtn")) === t.prog(1, n) && n >= 4;
      r.grid0 = await board(); r.top0 = await topRow();
      r.qPad = await fr.evaluate(() => { const g = document.querySelector("#goBtn"); return getComputedStyle(g).paddingLeft + " " + getComputedStyle(g.parentElement).columnGap; }); // màn câu hỏi giữ 18px, 10px (X30)
      await fr.click("#gridBtn"); r.grid1 = await board(); r.grid1.endBtn = await fhas("#endBtn"); r.grid1.leave = await leaveAsks(); r.grid1.stillOpen = (await board()).open;
      await check("bảng số câu mở"); if (ioe) await vi("bảng số câu"); if (shotIt) await snap(pre + "bang-so-cau");
      await fr.click("#gridBtn"); r.grid2 = await board();
      // luyện tập: câu 2, 3 bỏ qua, câu 4 sai, còn lại đúng (bài ≥ 4 câu: câu cuối luôn được trả lời, để đọc nhãn nút đi tiếp)
      const qs = []; r.headP = []; // mỗi câu một nhãn trên câu, là tên lượt (X31)
      for (let i = 0; i < n; i++) {
        const q = await cur(); qs.push(q);
        if (!q) { mo.problems.push(`9o · ${scheme} · ${m}: không nhận ra câu ${i + 1}: ` + (await ftxt(".qtext"))); break; }
        r.headP.push((await heads()) === own.left);
        if (i === 1 || i === 2) { await fr.click("#skipBtn"); continue; }
        await answer(q, i !== 3); await fr.click("#goBtn");
        if (i === n - 1) r.lastGo = await ftxt("#goBtn");
        await fr.click("#goBtn");
      }
      r.recap1 = { has: await fhas("#recap"), h2: await ftxt("#recap h2"), p: await ftxt("#recap p"), end: await ftxt("#endBtn"), more: await ftxt("#moreBtn"), gone: await fr.evaluate(() => ["#gridBtn", "#skipBtn", ".bar", "#goBtn", "#timer"].filter((s) => document.querySelector(s))),
        board: await board(), marks: await keyMarks(), leave: await leaveAsks() };
      r.recapRow = await recapRow(t.more(120)); // X30: hai nút một hàng, cả khi số câu có ba chữ số
      await check("Xem lại bài làm, còn câu trống"); if (ioe) await vi("Xem lại bài làm"); if (shotIt) await snap(pre + "xem-lai");
      // mở lại câu đã Kiểm tra (câu 1, đúng) từ bảng: chỉ xem lại, không "Bỏ qua"; xong thì về lại màn đó (X22)
      await fr.click('.qz-cells .qz-cell[data-i="0"]'); await fr.waitForSelector("#goBtn");
      r.reopen = { prog: (await ftxt("#gridBtn")) === t.prog(1, n), fb: /^(Chính xác!|Correct!)/.test(await ftxt("#fb")), marked: await fr.evaluate(() => !!document.querySelector(".opt.right, #fillIn[readonly], input.letter[readonly]") || !!document.querySelector("#slot .tile")), skip: await fhas("#skipBtn"), go: (await ftxt("#goBtn")) === t.recap, endBtn: await fhas("#endBtn"), head: (await heads()) === own.left };
      await check("câu đã Kiểm tra mở lại"); await fr.click("#goBtn"); r.reopen.back = await fhas("#recap");
      // làm tiếp: chỉ các câu còn trống (câu 2, 3), theo số câu; câu 2 làm đúng, câu 3 bỏ qua lần nữa
      await fr.click("#moreBtn"); await fr.waitForSelector("#goBtn");
      r.round = { tag: (await ftxt(".qleft")) === t.tag(1, 2), prog: (await ftxt("#gridBtn")) === t.prog(2, n), skip: await fhas("#skipBtn"), head: (await heads()) === own.left };
      await check("vòng làm tiếp"); if (ioe) await vi("vòng làm tiếp"); if (shotIt) await snap(pre + "lam-tiep");
      await answer(qs[1], true); await fr.click("#goBtn"); r.round.go = (await ftxt("#goBtn")) === t.go; await fr.click("#goBtn");
      r.round.tag2 = (await ftxt(".qleft")) === t.tag(2, 2); r.round.prog2 = (await ftxt("#gridBtn")) === t.prog(3, n); await fr.click("#skipBtn");
      r.recap2 = { p: (await ftxt("#recap p")) === t.left(1), more: (await ftxt("#moreBtn")) === t.more(1) };
      await fr.click("#endBtn"); r.ask = (await ftxt("#endArea")) === t.warn(1) + t.res + t.keep; r.askYes = await fhas("#yesEnd"); await check("hỏi lại khi xem kết quả");
      await fr.click("#noEnd"); r.askClosed = (await ftxt("#endArea")) === "" && (await fhas("#recap"));
      await fr.click("#endBtn"); await fr.click("#yesEnd"); await fr.waitForSelector("#resBtns");
      r.result = { line: ioe ? (await ftxt(".score")) === t.score(n - 2, n) : (await ftxt(".panel .stack b")) === t.line(n - 2, n), rep: await reps(), wrong: same(await getWrong(key), [keyOf(qs[3]), keyOf(qs[2])]) };
      await check("kết quả luyện tập");
      // "Ôn câu sai" ("Mistake Review"): câu của nhiều bài nên giữ nhãn bài, unit của câu bên phải (X31); dừng ngay, không làm câu nào
      // (danh sách câu sai không đổi, app không lưu lượt 0 câu)
      await fr.evaluate((w) => [...document.querySelectorAll("#resBtns button")].find((b) => b.textContent.startsWith(w)).click(), ioe ? "Review mistakes" : "Ôn câu sai");
      await fr.waitForSelector("#skipBtn", { timeout: 15000 });
      r.wrongHead = (await heads()) === own.wrong + "|" + own.side; await check("ôn câu sai");
      await fr.click("#endBtn"); await fr.click("#yesEnd"); await fr.waitForSelector("#resBtns");
      // ---- đề thi thử: mọi câu có hai nhãn, nhãn phải là bài, unit của câu (X31)
      await fr.click("#resBtns .ghost"); await fr.waitForSelector(ioe ? "#heroBtn" : ".tb");
      let eq;
      if (!ioe) { eq = await fr.evaluate((sid) => buildTest(sid, "all", 0).map((q) => ({ kind: q.kind, a: q.a, ans: q.ans, key: wkey(q), side: (SUBJ[sid].L[q.l] || {}).short || "" })), sid); await fr.click('.tb[data-k="0"]'); }
      else { await fr.click("#heroBtn"); }
      await fr.waitForSelector("#skipBtn", { timeout: 15000 }); await countRep();
      if (ioe) eq = await fr.evaluate(() => S.qs.map((q) => ({ id: q.id, o: !!q.o, a: q.a, t: q.t, ans: q.ans, w: q.w, miss: q.miss, tiles: q.tiles, say: !!q.say, side: q.u ? "Unit " + q.u : "My Questions" })));
      const ne = eq.length;
      r.exTop = await topRow(); r.headE = [];
      for (let i = 0; i < ne; i++) {
        const h = (await heads()).split("|"); r.headE.push(h.length === 2 && h[1] === eq[i].side);
        await answer(eq[i], i !== 1);
        if (i === 0) { // chọn rồi bấm "Nộp bài sớm": lời hỏi lại tính câu này là đã trả lời (X23); "Làm tiếp" về câu
          await fr.click("#endBtn"); r.exEarly = (await ftxt("#endArea")).startsWith(t.endEarly(ne - 1)); await fr.click("#noEnd"); r.exEarlyBack = (await fhas("#endBtn")) && (await given(eq[0], true));
        }
        await fr.click("#goBtn");
      }
      r.exRecap = { p: (await ftxt("#recap p")) === t.all(ne), end: await fr.$eval("#endBtn", (b) => b.textContent + "|" + b.className), more: await fhas("#moreBtn"), timer: /^\d\d:\d\d$/.test((await ftxt("#timer")) || ""), top: await topRow(), board: await board(), leave: await leaveAsks(), gone: await fr.evaluate(() => ["#gridBtn", "#skipBtn", ".bar", "#goBtn", "#yesEnd"].filter((s) => document.querySelector(s))) };
      await check("Xem lại bài làm, đã làm hết"); if (ioe) await vi("Xem lại bài làm, đã làm hết"); if (shotIt) await snap(pre + "da-lam-het");
      // mở lại câu 2 (sai): thấy câu trả lời cũ, sửa rồi "Trả lời" về lại màn đó
      await fr.click('.qz-cells .qz-cell[data-i="1"]'); await fr.waitForSelector("#goBtn");
      r.exReopen = { prog: (await ftxt("#gridBtn")) === t.prog(2, ne), old: await given(eq[1], false), note: (await ftxt("#editNote")) === t.note, skip: await fhas("#skipBtn"), go: (await ftxt("#goBtn")) === t.answer, top: await topRow(), head: (await heads()).split("|")[1] === eq[1].side };
      await check("câu đã trả lời mở lại"); if (shotIt) await snap(pre + "sua-cau");
      await answer(eq[1], true); await fr.click("#goBtn"); r.exReopen.back = await fhas("#recap");
      // câu 3: chọn sai rồi chạm ô khác trên bảng → đã trả lời theo lựa chọn đó (X23); mở lại thấy lựa chọn sai, sửa lại
      await fr.click('.qz-cells .qz-cell[data-i="2"]'); await fr.waitForSelector("#goBtn"); await answer(eq[2], false);
      await fr.click("#gridBtn"); await fr.click('.qz-cells .qz-cell[data-i="3"]'); await fr.waitForSelector("#goBtn");
      await fr.click("#gridBtn"); r.x23 = { cell: (await board()).st[2], prog: (await ftxt("#gridBtn")) === t.prog(4, ne) };
      await fr.click('.qz-cells .qz-cell[data-i="2"]'); await fr.waitForSelector("#goBtn"); r.x23.old = await given(eq[2], false);
      await answer(eq[2], true); await fr.click("#goBtn"); r.x23.back = await fhas("#recap");
      await fr.click("#endBtn"); await fr.waitForSelector("#resBtns");
      const prev = [keyOf(qs[3]), keyOf(qs[2])].filter((k) => !eq.some((q) => keyOf(q) === k));
      r.exResult = { line: ioe ? (await ftxt(".score")) === t.score(ne, ne) : (await ftxt(".panel .stack b")) === t.line(ne, ne), rep: await reps(), wrong: same(await getWrong(key), prev), review: await fhas(".review") };
      await check("kết quả đề thi thử");
      // ---- IOE (X27): giả lập máy phát được tiếng; lượt nghe theo từng câu; tiếng lỗi thì thay mọi câu nghe còn trống, kể cả câu đã bỏ qua
      if (ioe) {
        await fr.click("#resBtns .ghost"); await fr.waitForSelector("#heroBtn");
        await fr.evaluate(() => { TTS.done = true; TTS.ok = true; TTS.off = false; store.set("listenOff", false); window.__speakErr = null; window.speak = (text, rate, cb) => setTimeout(() => cb(window.__speakErr), 20); });
        await fr.click("#heroBtn"); await fr.waitForSelector("#skipBtn", { timeout: 15000 });
        const li = await fr.evaluate(() => S.qs.map((q, i) => (q.say ? i : -1)).filter((i) => i >= 0));
        const x = { nSay: li.length };
        if (li.length >= 2) {
          for (let k = 0; k <= li[0]; k++) await fr.click("#skipBtn"); // bỏ qua tới câu nghe đầu tiên và bỏ qua nó
          for (let k = li[0] + 1; k < li[1]; k++) await fr.click("#skipBtn");
          x.at = (await ioeQ()).i === li[1] && (await ftxt("#plays")) === "3 of 3 plays left";
          await fr.click("#playBtn"); await fr.waitForFunction(() => document.querySelector("#plays").textContent === "2 of 3 plays left", null, { timeout: 3000 }).catch(() => {});
          x.played = (await ftxt("#plays")) === "2 of 3 plays left";
          await fr.click("#gridBtn"); await fr.click('.qz-cells .qz-cell[data-i="0"]'); await fr.waitForSelector("#goBtn"); // rời câu bằng bảng rồi quay lại: vẫn 2 lượt
          await fr.click("#gridBtn"); await fr.click(`.qz-cells .qz-cell[data-i="${li[1]}"]`); await fr.waitForSelector("#playBtn");
          x.kept = (await ftxt("#plays")) === "2 of 3 plays left";
          await fr.evaluate(() => { window.__speakErr = "error"; }); await fr.click("#playBtn"); await fr.waitForSelector(".notice", { timeout: 3000 }).catch(() => {});
          x.replaced = await fr.evaluate((li) => ({ notice: !!document.querySelector(".notice"), anySay: S.qs.some((q) => q.say), skippedNow: !S.qs[li[0]].say && !S.ans[li[0]], n: S.qs.length, i: S.i, off: TTS.off }), li);
          await check("câu nghe đã thay"); await vi("câu nghe đã thay");
        }
        r.x27 = x;
        await fr.click("#endBtn"); await fr.waitForSelector("#yesEnd"); await fr.click("#yesEnd"); await fr.waitForSelector("#resBtns");
        await fr.evaluate(() => { TTS.ok = false; TTS.off = false; store.set("listenOff", false); });
      }
      console.log("9o", m, scheme, JSON.stringify(r));
    }
    await c.close();
  }
  { // ghép ảnh sáng/tối cạnh nhau (tests/screenshots/9o/<tên>.jpg)
    const gp = await browser.newPage({ viewport: { width: 752, height: 400 }, deviceScaleFactor: 2 });
    for (const n of [...new Set(mo.shots.map((x) => x.replace(/-(light|dark)$/, "")))]) {
      if (!mo.shots.includes(n + "-light") || !mo.shots.includes(n + "-dark")) continue;
      const img = (sc) => "data:image/png;base64," + fs.readFileSync(`${OUT9O}${n}-${sc}.png`).toString("base64");
      await gp.setContent(`<body style="margin:0;display:flex;gap:16px;padding:8px;background:#888;align-items:flex-start"><img src="${img("light")}" width="360"><img src="${img("dark")}" width="360"></body>`);
      await gp.screenshot({ path: `${OUT9O}${n}.jpg`, fullPage: true, type: "jpeg", quality: 70 });
    }
    await gp.close();
  }
  console.log("9o:", JSON.stringify(mo.runs), "problems:", mo.problems);
  const mod9oOK = !mo.problems.length && mo.runs.length === 8 && mo.runs.every((r) => { const ioe = r.m.startsWith("ioe"), t = T(r.m), g1 = r.grid1, rb = r.recap1.board, eb = r.exRecap.board, n = g1.n, ne = eb.n;
    return r.prog.tag === "BUTTON" && r.prog.text && r.prog.exp === "false" && r.prog.ctl === "grid" && r.prog.h >= 44 && r.prog.svg && !r.grid0.open && !r.top0.chip && r.top0.qtop
      && g1.open && g1.exp === "true" && g1.h >= 44 && g1.perRow === Math.min(5, n) && g1.cur === 0 && g1.key === t.keyBlank(n) && g1.st.every((s) => s.startsWith("st-blank")) && g1.endBtn && g1.leave && g1.stillOpen
      && !r.grid2.open && r.grid2.exp === "false" && r.lastGo === t.recap
      && r.recap1.has && r.recap1.h2 === t.head && r.recap1.p === t.left(2) && r.recap1.end === t.res && r.recap1.more === t.more(2) && !r.recap1.gone.length && r.recap1.leave
      && rb.n === n && rb.cur === -1 && rb.st.filter((s) => s === "st-skip:–").length === 2 && rb.st.filter((s) => s === "st-ok:✓").length === n - 3 && rb.st.filter((s) => s === "st-bad:✗").length === 1 && rb.key.includes(t.keySkip) && !t.notDone.test(rb.key) && !/Current|Đang làm/.test(rb.key) && marksOK(r.recap1.marks, ["skip", "ok", "bad"])
      && r.reopen.prog && r.reopen.fb && r.reopen.marked && !r.reopen.skip && r.reopen.go && r.reopen.endBtn && r.reopen.back
      && r.round.tag && r.round.prog && r.round.skip && r.round.go && r.round.tag2 && r.round.prog2 && r.recap2.p && r.recap2.more && r.ask && r.askYes && r.askClosed
      && r.result.line && r.result.rep === 1 && r.result.wrong
      && r.exTop.chip && r.exTop.oneRow && r.exTop.topH <= 72 && r.exTop.qtop && r.exEarly && r.exEarlyBack
      && r.exRecap.p && r.exRecap.end === t.submit + "|btn main" && !r.exRecap.more && r.exRecap.timer && r.exRecap.top.chip && r.exRecap.top.oneRow && r.exRecap.leave && !r.exRecap.gone.length && eb.cur === -1 && eb.st.every((s) => s === "st-ans:") && eb.key === t.keyAns(ne)
      && r.exReopen.prog && r.exReopen.old && r.exReopen.note && !r.exReopen.skip && r.exReopen.go && r.exReopen.top.qtop && r.exReopen.back
      && r.x23.cell === "st-ans:" && r.x23.prog && r.x23.old && r.x23.back && r.exResult.line && r.exResult.rep === 1 && r.exResult.wrong && !r.exResult.review
      && (!ioe || (r.x27.nSay >= 2 && r.x27.at && r.x27.played && r.x27.kept && r.x27.replaced.notice && !r.x27.replaced.anySay && r.x27.replaced.skippedNow && r.x27.replaced.n === ne && r.x27.replaced.off))
      // Phiên 9ob: hai nút một hàng ở màn "Xem lại bài làm", cả với số câu có ba chữ số; màn câu hỏi giữ padding, khoảng cách cũ (X30)
      && r.qPad === "18px 10px" && r.recapRow.pad === "12px 12px 12px 12px" && r.recapRow.gap === "8px" && r.recapRow.now.same && r.recapRow.now.fit && r.recapRow.long.same && r.recapRow.long.fit
      // một nhãn trên câu khi luyện theo bài, theo unit; hai nhãn ở "Ôn câu sai" và đề thi thử (X31)
      && r.headP.length === n && r.headP.every(Boolean) && r.reopen.head && r.round.head && r.wrongHead && r.headE.length === ne && r.headE.every(Boolean) && r.exReopen.head; })
    && ["bai-on-bang-so-cau", "bai-on-xem-lai", "bai-on-lam-tiep", "bai-on-da-lam-het", "bai-on-sua-cau", "ioe-bang-so-cau", "ioe-xem-lai", "ioe-lam-tiep", "ioe-da-lam-het", "ioe-sua-cau"].every((n) => mo.shots.includes(n + "-light") && mo.shots.includes(n + "-dark"));
  step("numbers with thousands spaces stay on one line (360px)");
  /* Số trong dữ liệu ngăn hàng nghìn bằng khoảng trắng ("1 200", "987 650", "2 450 − 1 800 = 650 (kg)"). Ở 360px, màn làm đề và màn
     kết quả hiện khoảng trắng đó là khoảng trắng không ngắt (nbNum trong js/quiz.js): trong #view không còn khoảng trắng thường giữa
     hai nhóm số, không số nào nằm trên hai dòng (đo bằng Range.getClientRects), trang không tràn ngang. Bin ôn luyện cả kho Toán 4 ·
     Cuối kì I: ba đề cố định và các câu riêng của đề ngẫu nhiên (Phiên N1, đủ dạng câu; rút ngẫu nhiên thì không chắc gặp hết nên làm
     thành một đề tự nhập), trả lời bất kì để thấy đáp án, lời giải; rồi một đề tự nhập có đủ dạng câu và đoạn đọc. Mỗi câu kiểm tra lúc
     mới hiện, khi đã trả lời và sau Kiểm tra, rồi màn kết quả với mọi câu cần xem lại mở ra. Đề tự nhập làm thêm một lượt như thi: bài
     tự luận có số, tự chấm sau khi nộp. Câu điền, câu trả lời bằng số gõ đáp án có khoảng trắng không ngắt vẫn được chấm đúng. Một câu
     bị báo sai: bản chụp lưu (Quiz.text) giữ khoảng trắng thường, danh sách ở Quản trị → Dữ liệu hiện khoảng trắng không ngắt. */
  const NUM_BANKS = ["toan4-ck1-de1", "toan4-ck1-de2", "toan4-ck1-de3"];
  const NB = { id: "so-nhieu-chu-so", title: "Số có nhiều chữ số", grade: 4, subject: "Toán", minutes: 15,
    passages: { d1: { title: "Thư viện trường", text: "Năm 2025, thư viện trường có 12 450 cuốn sách. Năm 2026, thư viện mua thêm 570 cuốn nên có 13 020 cuốn.\nMỗi tháng có khoảng 1 200 lượt mượn sách." } },
    questions: [
      { topic: "Số có nhiều chữ số", type: "mc", p: "d1", q: "Theo đoạn đọc, năm 2026 thư viện có bao nhiêu cuốn sách?", o: ["13 020", "12 450", "13 200", "1 302"], x: "Năm 2025 có 12 450 cuốn, mua thêm 570 cuốn: 12 450 + 570 = 13 020 (cuốn)." },
      { topic: "Nhân, chia với 10, 100, 1 000", type: "num", p: "d1", q: "Theo đoạn đọc, mỗi tháng có khoảng 1 200 lượt mượn sách. Hỏi 10 tháng có khoảng bao nhiêu lượt mượn sách?", ans: 12000, unit: "lượt", x: "1 200 × 10 = 12 000 (lượt)." },
      { topic: "Số có nhiều chữ số", type: "fill", q: "999 999 + 1 = ___", ans: ["1 000 000", "1000000"], x: "999 999 + 1 = 1 000 000 (một triệu)." },
      { topic: "Số có nhiều chữ số", type: "tf4", q: "Mỗi ý sau đúng hay sai?", o: ["987 650 < 1 020 304", "1 200 + 600 = 1 800", "2 450 − 1 800 = 560", "Làm tròn số 3 459 210 đến hàng trăm nghìn được 3 500 000"], a: [true, true, false, true],
        x: "987 650 có 6 chữ số, 1 020 304 có 7 chữ số nên 987 650 < 1 020 304. 1 200 + 600 = 1 800. 2 450 − 1 800 = 650, không phải 560. Chữ số hàng chục nghìn của 3 459 210 là 5 nên làm tròn lên: 3 500 000." },
      { topic: "Cộng, trừ các số đến 1 000 000", type: "match", q: "Nối mỗi phép tính với kết quả của nó.", l: ["1 200 + 600", "2 450 − 1 800", "125 × 8"], r: ["1 800", "650", "1 000", "1 080"], x: "1 200 + 600 = 1 800; 2 450 − 1 800 = 650; 125 × 8 = 1 000." },
      { topic: "Số có nhiều chữ số", type: "order", q: "Sắp xếp các số theo thứ tự từ bé đến lớn.", o: ["98 765", "987 650", "1 020 304", "1 200 000"], x: "98 765 < 987 650 < 1 020 304 < 1 200 000." },
      { topic: "Cộng, trừ các số đến 1 000 000", type: "essay", q: "Một cửa hàng có 2 450 kg khoai. Buổi sáng bán được 1 200 kg, buổi chiều bán được 600 kg. Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam khoai?",
        rubric: [{ c: "Tính số khoai đã bán: 1 200 + 600 = 1 800 (kg)", p: 0.5 }, { c: "Tính số khoai còn lại: 2 450 − 1 800 = 650 (kg)", p: 0.5 }],
        x: "Số khoai đã bán: 1 200 + 600 = 1 800 (kg).\nSố khoai còn lại: 2 450 − 1 800 = 650 (kg).\nĐáp số: 650 kg." },
      { topic: "Số có nhiều chữ số", type: "mc", q: "So sánh 987 650 và 1 020 304.", o: ["987 650 < 1 020 304", "987 650 > 1 020 304", "987 650 = 1 020 304"], x: "987 650 có 6 chữ số, 1 020 304 có 7 chữ số. Số có ít chữ số hơn thì bé hơn. Vậy 987 650 < 1 020 304." }
    ] };
  // câu điền, câu trả lời bằng số của đề tự nhập: gõ đáp án có khoảng trắng không ngắt (chép từ chữ trên màn hình, bàn phím điện thoại)
  const NB_TYPED = { [flatQ(NB.questions[1].q)]: "12\u00a0000", [flatQ(NB.questions[2].q)]: "1\u00a0000\u00a0000" };
  const numc = await newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2 });
  await localConfig(numc); watchOut(numc);
  const nump = await numc.newPage(); nump.on("pageerror", (e) => errs.push("pageerror số: " + e.message)); nump.on("console", (m) => { if (m.type() === "error") errs.push("console số: " + m.text()); });
  const nm = { problems: [], seen: 0, typed: [] };
  /* Số có nhóm hàng nghìn ("1 200", "1 020 304") đang hiện trong các phần tử root: còn khoảng trắng thường giữa hai nhóm, hoặc nằm trên
     hai dòng (các ô chữ của Range lệch nhau quá nửa dòng). Số trong <details> đang đóng không hiện nên không tính; chữ trong hình (svg)
     không xuống dòng và không qua nbNum nên bỏ qua. */
  const numCheck = async (label, root) => {
    const r = await nump.evaluate((root) => {
      const bad = [], re = /\d+(?:[ \u00a0]\d{3})+(?!\d)/g;
      let seen = 0;
      if (document.documentElement.scrollWidth > innerWidth) bad.push("tràn ngang: rộng " + document.documentElement.scrollWidth + "px");
      for (const el of document.querySelectorAll(root)) {
        const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        for (let n; (n = tw.nextNode());) if (!n.parentElement.closest("svg")) for (const m of n.textContent.matchAll(re)) {
          const rg = document.createRange(); rg.setStart(n, m.index); rg.setEnd(n, m.index + m[0].length);
          const rs = [...rg.getClientRects()].filter((x) => x.width > 0 && x.height > 0), tops = rs.map((x) => x.top);
          if (!rs.length) continue;
          seen++;
          if (m[0].includes(" ")) bad.push(`khoảng trắng thường: "${m[0]}"`);
          if (Math.max(...tops) - Math.min(...tops) > Math.min(...rs.map((x) => x.height)) / 2) bad.push(`hai dòng: "${m[0].replace(/\u00a0/g, " ")}"`);
        }
      }
      return { bad, seen };
    }, root || "#view");
    nm.seen += r.seen;
    r.bad.forEach((x) => nm.problems.push(`${label}: ${x}`));
  };
  // trả lời bất kì (thường là sai, để thấy đáp án và lời giải); typed: chữ gõ vào ô điền hoặc ô trả lời bằng số
  const answerAny = async (typed) => {
    if (await nump.$("#qzFill")) await nump.fill("#qzFill", typed || "1");
    else if (await nump.$("#qzNum")) await nump.fill("#qzNum", typed || "1");
    else if (await nump.$(".tf4")) { for (let k = 0; k < 4; k++) await nump.click(`.tf4 .opt[data-i="${k}"][data-v="1"]`); }
    else if (await nump.$(".mt-li")) { const n = (await nump.$$(".mt-li")).length; for (let k = 0; k < n; k++) { await nump.click(`.mt-li[data-i="${k}"]`); await nump.click(`.mt-ri >> nth=${k}`); } }
    else if (await nump.$(".ord-p")) { const n = (await nump.$$(".ord-p")).length; for (let k = 0; k < n; k++) await nump.click(".ord-p:not([hidden]) >> nth=0"); }
    else if (!(await nump.$("#qzEssay"))) await nump.click(".opts .opt >> nth=0");
  };
  const openAll = () => nump.evaluate(() => document.querySelectorAll("#view details").forEach((d) => (d.open = true)));
  // một lượt ôn luyện cả đề; câu đầu tiên có số lớn thì báo sai (Phiên R1)
  const playNum = async (id, typedFor) => {
    await nump.goto(BASE + "/#/home"); await nump.goto(BASE + "/#/quiz/" + id); await nump.waitForSelector("#qPractice"); await nump.click("#qPractice");
    for (let i = 1; i <= 40 && !(await nump.$(".score")); i++) {
      await numCheck(`${id}, câu ${i}`);
      const typed = typedFor && typedFor[flatQ(await nump.$eval(".qcard .qtext", (e) => e.textContent))];
      await answerAny(typed); await numCheck(`${id}, câu ${i}, đã trả lời`);
      await nump.click("#qzGo"); await numCheck(`${id}, câu ${i}, sau Kiểm tra`);
      if (typed) nm.typed.push(!!(await nump.$("#qzFb .fb.ok")));
      if (!nm.reported && (await nump.$eval(".qcard .qtext", (e) => /\d[ \u00a0]\d{3}/.test(e.textContent)))) {
        await nump.click(".rp-link"); await nump.click('.rsn .opt[data-r="wrong"]'); await nump.click(".report-box [type=submit]"); await nump.waitForSelector(".rp-done");
        nm.reported = id;
      }
      await nump.click("#qzGo");
    }
    await nump.waitForSelector(".score"); await openAll(); await numCheck(id + ", kết quả");
  };
  await nump.goto(BASE + "/"); await nump.click(`.tile[data-u="${ids.Bin}"]`); await nump.fill("#pinIn", PINS.Bin); await nump.waitForSelector("#today");
  await nump.evaluate((b) => Store.upsertBank(b), NB);
  // câu riêng của đề ngẫu nhiên Toán 4 cuối kì I (Phiên N1) thành một đề tự nhập
  const NUM_POOL = "toan4-ck1-ngau-nhien", NUM_POOL_OWN = "so-kho-ngau-nhien";
  nm.pool = await nump.evaluate(async ([pool, id]) => { await Store.loadBank(pool); const b = Store.bank(pool), qs = b.questions.filter((q) => q.src === pool);
    if (qs.length) Store.upsertBank({ id, title: "Câu riêng của " + b.title, grade: b.grade, subject: b.subject, questions: qs }); return qs.length; }, [NUM_POOL, NUM_POOL_OWN]);
  for (const id of NUM_BANKS.concat(nm.pool ? [NUM_POOL_OWN] : [])) await playNum(id);
  await playNum(NB.id, NB_TYPED);
  // đề tự nhập, làm như thi: bỏ qua mọi câu, trừ bài tự luận; màn kết quả có câu cần xem lại, bài làm, gợi ý và thang tự chấm
  await nump.goto(BASE + "/#/home"); await nump.goto(BASE + "/#/quiz/" + NB.id); await nump.waitForSelector("#qExam"); await nump.click("#qExam");
  for (let i = 0; i < 20 && !(await nump.$("#qzRecap, .score")); i++) {
    if (await nump.$("#qzEssay")) { await nump.fill("#qzEssay", "Số khoai đã bán: 1 200 + 600 = 1 800 (kg).\nSố khoai còn lại: 2 450 − 1 800 = 650 (kg)."); await nump.click("#qzGo"); }
    else await nump.click("#qzSkip");
  }
  await endRecap(nump); await nump.waitForSelector("#qzSelf .essay-done"); await openAll(); await numCheck(NB.id + ", kết quả làm như thi");
  nm.essay = await nump.$eval("#qzSelf .essay-done", (e) => e.textContent.includes("1\u00a0200 + 600 = 1\u00a0800"));
  // câu bị báo sai: bản chụp lưu giữ khoảng trắng thường; danh sách ở Quản trị → Dữ liệu hiện khoảng trắng không ngắt
  nm.saved = await nump.evaluate(() => { const r = Store.reports(); return r.length === 1 && /\d \d{3}/.test(r[0].qText) && !r[0].qText.includes("\u00a0"); });
  await nump.goto(BASE + "/#/account"); await nump.click("#logout"); await nump.waitForTimeout(200);
  await nump.click(`.tile[data-u="${ids["Bố Minh"]}"]`); await nump.fill("#pinIn", PINS["Bố Minh"]); await nump.waitForTimeout(400);
  await nump.goto(BASE + "/#/admin/data"); await nump.waitForSelector("#reportsBox .rp-q");
  const nSeen = nm.seen; await numCheck("Quản trị → Dữ liệu, câu bị báo", "#reportsBox .rp-q"); nm.list = nm.seen - nSeen;
  await numc.close();
  console.log("số:", { seen: nm.seen, pool: nm.pool, typed: nm.typed, reported: nm.reported, essay: nm.essay, saved: nm.saved, list: nm.list }, "problems:", nm.problems.length, nm.problems.slice(0, 30));
  const numOK = !nm.problems.length && nm.seen > 600 && nm.pool > 0 && nm.typed.length === 2 && nm.typed.every(Boolean) && nm.reported === NUM_BANKS[0] && nm.essay && nm.saved && nm.list > 0;

  step("number inputs on phones: fraction button, negative and decimal fill answers (L29–L31)");
  /* Bàn phím số thập phân của iPhone không có "/" và "-" (Phiên 9h). Câu trả lời bằng số: nút "/" (#qzSlash, ≥ 44px) ngay sau nút ±
     ở mọi câu, ô vẫn inputmode="decimal"; đáp án phân số "a/b" chấm theo giá trị, phần đáp án hiện đúng "2/3" (L29). Câu điền có đáp
     án âm: ô không có inputmode="decimal", dưới câu có dòng nhắc số âm (L30). Câu điền số so theo giá trị: gõ dấu chấm hay dấu phẩy
     thập phân đều đúng, "2.5" không đúng với 25 (L31). Đề thử thêm vào danh mục lúc chạy (như pool giả ở bước K3); Na lớp 6 ôn luyện
     ở 360px sáng và tối. Lượt 1: câu "2/3" gõ 2, bấm "/", gõ 3 (dấu chỉ bằng nút; bấm "/" lần nữa không thêm), Kiểm tra: đúng; câu
     "-3/4" bấm ±, gõ 3, bấm "/", gõ 4: đúng; câu điền "-7" gõ "-7": đúng; câu điền "1,25" gõ "1.25": đúng; câu điền "25" gõ "2.5":
     sai; kết quả lưu 4/5. Lượt 2 ("Làm lại cả đề"): câu "2/3" gõ "0,67": sai, phần đáp án hiện "2/3"; còn lại bỏ qua; màn kết quả
     ghi đáp án "2/3", "-3/4". Mỗi màn hình kiểm tra 360px (audit). Quiz.TXT.en có đủ các khóa như cột vi, chữ mới không có chữ cái
     tiếng Việt. Ảnh sáng/tối ở tests/screenshots/l29-l31/ (bản ghép <tên>.jpg): so-phan-so, so-phan-so-sai, dien-so-am. */
  const OUTL29 = OUT + "l29-l31/"; fs.mkdirSync(OUTL29, { recursive: true });
  const L29_BANK = { id: "thu-o-so", title: "Toán 6 · Thử ô nhập số", grade: 6, subject: "Toán", minutes: 10, n: 5, file: "6-toan.js", note: "",
    questions: [
      { topic: "Phân số", type: "num", q: "Tính: 1/3 + 1/3 = ?", ans: "2/3", x: "1/3 + 1/3 = 2/3." },
      { topic: "Phân số", type: "num", q: "Tính: 1/4 − 1 = ?", ans: "-3/4", x: "1/4 − 1 = 1/4 − 4/4 = −3/4." },
      { topic: "Số nguyên", type: "fill", q: "(−3) + (−4) = ___", ans: ["-7"], x: "Cộng hai số nguyên âm: 3 + 4 = 7 rồi đặt dấu “−” trước kết quả: −7." },
      { topic: "Số thập phân", type: "fill", q: "1 250 g = ___ kg", ans: ["1,25"], x: "1 000 g = 1 kg, nên 1 250 g = 1,25 kg." },
      { topic: "Số tự nhiên", type: "fill", q: "5 × 5 = ___", ans: ["25"], x: "5 × 5 = 25." }
    ] };
  const L29_TYPE = { "-7": "-7", "1,25": "1.25", "25": "2.5" }; // câu điền: chữ gõ vào ô
  const L29_SHOTS = ["so-phan-so", "so-phan-so-sai", "dien-so-am"];
  const l29 = { problems: [], shots: [], runs: [] };
  { // bảng chữ: cột en đủ khóa như cột vi; chữ mới của Phiên 9h có ở cả hai cột, cột en không có chữ cái tiếng Việt
    const w = {}; require("vm").runInNewContext(fs.readFileSync(ROOT + "js/quiz.js", "utf8"), { window: w });
    const T = w.Quiz.TXT, keys = (o) => Object.keys(o).sort().join();
    l29.txt = keys(T.vi) === keys(T.en) && ["numSlash", "numHint", "negHint"].every((k) => typeof T.vi[k] === "string" && typeof T.en[k] === "string" && T.en[k] !== T.vi[k] && !CHU_VIET.test(T.en[k]));
  }
  for (const scheme of ["light", "dark"]) {
    const c = await newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, colorScheme: scheme });
    await localConfig(c); watchOut(c);
    const p = await c.newPage(); p.on("pageerror", (e) => errs.push("pageerror L29: " + e.message)); p.on("console", (m) => { if (m.type() === "error") errs.push("console L29: " + m.text()); });
    const check = async (label) => (await p.evaluate(audit)).forEach((x) => l29.problems.push(`L29 · ${scheme} · ${label}: ${x}`));
    const snap = async (n) => { await p.evaluate(() => { scrollTo(0, 0); const t = document.querySelector("#toast"); if (t) t.hidden = true; }); await p.screenshot({ path: `${OUTL29}${n}-${scheme}.png`, fullPage: true }); l29.shots.push(`${n}-${scheme}`); };
    const txt = (sel) => p.evaluate((s) => { const e = document.querySelector(s); return e ? e.textContent.replace(/\s+/g, " ").trim() : ""; }, sel);
    const cur = async () => { const t = await p.$eval(".qcard .qtext", (e) => e.textContent); return L29_BANK.questions.find((q) => flatQ(q.q) === flatQ(t)) || null; };
    // hàng ô số: nút ±, nút "/" rồi ô, cùng một hàng; hai nút cao ≥ 44px; ô vẫn mở bàn phím số thập phân
    const numRow = () => p.evaluate(() => {
      const s = document.querySelector("#qzSign"), sl = document.querySelector("#qzSlash"), i = document.querySelector("#qzNum"), box = (e) => e.getBoundingClientRect();
      return !!sl && s.nextElementSibling === sl && sl.nextElementSibling === i && box(s).height >= 44 && box(sl).height >= 44 && Math.abs(box(sl).top - box(s).top) < 1
        && sl.textContent === "/" && sl.getAttribute("aria-label") === "Thêm dấu phân số" && i.getAttribute("inputmode") === "decimal";
    });
    const val = () => p.inputValue("#qzNum"), focused = () => p.evaluate(() => (document.activeElement || {}).id);
    const r = { scheme, ok: {}, fill: {} };
    await p.goto(BASE + "/"); await p.click(`.tile[data-u="${ids.Na}"]`); await p.fill("#pinIn", "4444"); await p.waitForSelector("#today");
    await p.evaluate((b) => window.ONTAP_SEED_BANKS.push(b), L29_BANK);
    await p.goto(BASE + "/#/quiz/" + L29_BANK.id); await p.waitForSelector("#qPractice"); await p.click("#qPractice");
    // lượt 1
    for (let i = 0; i < 10 && !(await p.$(".score")); i++) {
      const q = await cur(), a = q && [].concat(q.ans)[0];
      if (!q) { l29.problems.push(`L29 · ${scheme}: không nhận ra câu ` + (await txt(".qcard .qtext"))); break; }
      await check("câu " + a);
      if (a === "2/3") {
        r.row = await numRow();
        await p.focus("#qzNum"); await p.keyboard.type("2"); await p.click("#qzSlash"); await p.keyboard.type("3");
        r.slash = (await val()) === "2/3" && (await focused()) === "qzNum";
        await p.click("#qzSlash"); r.once = (await val()) === "2/3" && (await focused()) === "qzNum"; // ô đã có "/": không thêm nữa
        await check("câu 2/3, đã gõ"); await snap("so-phan-so");
      } else if (a === "-3/4") {
        r.row2 = await numRow();
        await p.click("#qzSign"); await p.keyboard.type("3"); await p.click("#qzSlash"); await p.keyboard.type("4");
        r.neg = (await val()) === "-3/4";
      } else {
        r.fill[a] = await p.$eval("#qzFill", (e) => ({ mode: e.getAttribute("inputmode"), hint: [...e.closest(".qcard").querySelectorAll("p.small")].map((x) => x.textContent).join("|") }));
        await p.fill("#qzFill", L29_TYPE[a]);
        if (a === "-7") { await check("câu điền -7, đã gõ"); await snap("dien-so-am"); }
      }
      await p.click("#qzGo"); await check(`câu ${a} sau Kiểm tra`);
      r.ok[a] = !!(await p.$("#qzFb .fb.ok"));
      await p.click("#qzGo");
    }
    await p.waitForSelector(".score"); await check("kết quả lượt 1");
    r.saved = await p.evaluate((id) => { const x = Store.resultsFor(Store.sessionUser().id).find((y) => y.refId === id); return !!x && x.r === 4 && x.t === 5 && x.mode === "practice"; }, L29_BANK.id);
    // lượt 2: câu 2/3 gõ "0,67" → sai, phần đáp án hiện "2/3"; còn lại bỏ qua
    await p.click("#qzAgain"); await p.waitForSelector(".qcard");
    for (let i = 0; i < 10 && !(await p.$("#qzRecap, .score")); i++) {
      const q = await cur();
      if (q && q.ans === "2/3") {
        await p.fill("#qzNum", "0,67"); await p.click("#qzGo");
        r.wrong = await txt("#qzFb .fb.bad");
        await check("câu 2/3 gõ 0,67"); await snap("so-phan-so-sai");
        await p.click("#qzGo");
      } else await p.click("#qzSkip");
    }
    await endRecap(p); await p.waitForSelector(".score");
    r.review = await p.$$eval("#qzReview .rv-body > .small", (xs) => xs.map((x) => x.textContent.replace(/\s+/g, " ").trim()));
    await p.evaluate(() => document.querySelectorAll("#view details").forEach((d) => (d.open = true))); await check("kết quả lượt 2, mở câu cần xem lại");
    l29.runs.push(r);
    await c.close();
  }
  { // ghép ảnh sáng/tối cạnh nhau (tests/screenshots/l29-l31/<tên>.jpg)
    const gp = await browser.newPage({ viewport: { width: 752, height: 400 }, deviceScaleFactor: 2 });
    for (const n of L29_SHOTS) {
      if (!l29.shots.includes(n + "-light") || !l29.shots.includes(n + "-dark")) continue;
      const img = (sc) => "data:image/png;base64," + fs.readFileSync(`${OUTL29}${n}-${sc}.png`).toString("base64");
      await gp.setContent(`<body style="margin:0;display:flex;gap:16px;padding:8px;background:#888;align-items:flex-start"><img src="${img("light")}" width="360"><img src="${img("dark")}" width="360"></body>`);
      await gp.screenshot({ path: `${OUTL29}${n}.jpg`, fullPage: true, type: "jpeg", quality: 70 });
    }
    await gp.close();
  }
  console.log("L29–L31:", l29.runs, "txt:", l29.txt, "problems:", l29.problems);
  const l29OK = !l29.problems.length && l29.txt && l29.runs.length === 2
    && l29.runs.every((r) => r.row && r.row2 && r.slash && r.once && r.neg && r.ok["2/3"] && r.ok["-3/4"] && r.ok["-7"] && r.ok["1,25"] && r.ok["25"] === false
      && r.fill["-7"].mode === null && r.fill["-7"].hint === "Số âm: gõ dấu trừ phía trước, ví dụ -12."
      && r.fill["1,25"].mode === "decimal" && !r.fill["1,25"].hint && r.fill["25"].mode === "decimal" && !r.fill["25"].hint
      && r.saved && r.wrong === "Chưa đúng. Đáp án: 2/3" && r.review.includes("Đáp án: 2/3") && r.review.includes("Đáp án: -3/4"))
    && L29_SHOTS.every((n) => l29.shots.includes(n + "-light") && l29.shots.includes(n + "-dark"));

  step("bank management: exam picker, bank list, import preview (UX7, X11–X13)");
  /* Phiên UX7 (docs/CAI-TIEN-UX-2X.md, mục 3): quản trị bản lưu trên máy (Bố Minh) ở 360px sáng/tối; mỗi lượt một context mới từ state
     (đề, kì thi lưu ở đây không sang các bước khác). Ảnh ở tests/screenshots/ux7/ (bản ghép <tên>.jpg; chép sang docs/hinh-ux7/).
     X11 Sửa kì thi: khối "Bài ôn và đề cho kì này" có nhãn "N đã chọn"; kì thi lớp 4 (gk2-l4) chỉ hiện đề, bài ôn có khối của kì thi,
     số đề hiện ra bằng Store.banks(4); chọn thêm ô Lớp 6 thì thấy cả đề lớp 6. Kì thi ck1-l4 đã chọn sẵn một đề Ngữ văn 6 và bài ôn
     IOE 6 (khác khối): hai mục đó vẫn hiện; tìm "toan de 2" chỉ còn các đề Toán 4 có "Đề 2" (cộng đề khác khối không khớp thì ẩn),
     "Hiện cả đề của khối khác" thì thêm Toán 6; bỏ một đề, chọn một đề rồi Lưu: kì thi giữ đủ lựa chọn cũ, kể cả hai mục khác khối.
     X12 Ngân hàng đề: ngân hàng tự nhập đứng trước đề có sẵn và ghi kì thi đã gắn; đề có sẵn theo tab khối (Lớp 4 · N đề, Lớp 6 · N đề;
     mặc định lớp của học sinh đầu tiên), nhóm theo môn thu gọn; tìm "toan de 2" thì tab ghi số đề khớp, mở nhóm Toán; tab Lớp 6 ra Toán 6.
     X13 Nhập đề: một câu bị bỏ (dòng "Đáp số:" không phải số), một câu thiếu phần (mức độ sai), một đoạn đọc: thẻ của hai câu đó viền
     đỏ, lỗi ở trong thẻ; trắc nghiệm có lựa chọn đúng đánh dấu ✓, câu điền ghi đáp án nhận được; lọc "Cần sửa" chỉ còn hai thẻ; Lưu thì
     hỏi lại "1 câu sẽ không được lưu, 1 câu thiếu phần bị lỗi. Vẫn lưu?", "Sửa tiếp" đóng hộp và lọc thẻ cần sửa; ô "Gắn vào kì thi" chỉ
     có kì thi chưa qua của lớp 4 (không có mốc năm học); "Vẫn lưu" thì đề có 3 câu và đứng đầu danh sách đề của kì thi đã chọn. Đề mẫu
     ("Xem ví dụ", mọi dạng câu) không có thẻ lỗi, không có bộ lọc. */
  const OUTUX7 = OUT + "ux7/"; fs.mkdirSync(OUTUX7, { recursive: true });
  const ux7 = { problems: [], shots: [] };
  /* X34 (Phiên UX7b): trong một nhóm môn, đề có sẵn theo kì (Giữa kì I, Cuối kì I, Giữa kì II, Cuối năm), trong một kì đề ngẫu nhiên trước
     rồi Đề 1, Đề 2…; đề tự soạn (dòng ghi “· tự soạn”) sau đề có sẵn. inOrder(tên các dòng theo thứ tự trên màn). Nhóm môn theo lịch thi:
     lớp 4 Toán, Tiếng Việt, Tiếng Anh, Lịch sử và Địa lí, Khoa học, Tin học và Công nghệ; lớp 6 Toán, Ngữ văn, Tiếng Anh, KHTN, Lịch sử và
     Địa lí, GDCD, Tin học, Công nghệ; môn không có trong lịch (Thử nghiệm) cuối. */
  const TERMS7 = ["Giữa kì I", "Cuối kì I", "Giữa kì II", "Cuối năm"], SUBJ4 = "Toán,Tiếng Việt,Tiếng Anh,Lịch sử và Địa lí,Khoa học,Tin học và Công nghệ";
  const orderKey = (t) => { const p = t.split(" · "); return /· tự soạn$/.test(t) ? [1, 0, 0, 0] : [0, TERMS7.findIndex((m) => p.includes(m)), /· Đề ngẫu nhiên$/.test(t) ? 0 : 1, +((/· Đề (\d+)$/.exec(t) || [])[1] || 0)]; };
  const inOrder = (titles) => titles.length > 0 && titles.every((t, i) => { if (!i) return true; const a = orderKey(titles[i - 1]), b = orderKey(t), j = a.findIndex((v, k) => v !== b[k]); return j < 0 || a[j] < b[j]; });
  const UX7_SRC = "# Phép cộng\n345 678 + 254 322 = ?\n* 600 000\n- 590 000\n- 599 990\n> Cộng từ phải sang trái, nhớ sang hàng bên trái.\n\n1 000 000 − 456 789 = [543211|543 211]\nMức: Rất khó\n\n"
    + "# Đo lường\nMột sợi dây dài 2 m, cắt đi 0,75 m. Đoạn còn lại dài bao nhiêu mét?\nĐáp số: một phẩy hai lăm m\n\n"
    + "# Đọc hiểu\nĐoạn đọc: Chú mèo con\nNhà Bin có một chú mèo con lông trắng muốt.\nHết đoạn\n\nChú mèo con có bộ lông màu gì?\n* Trắng\n- Đen\n- Vàng";
  for (const scheme of ["light", "dark"]) {
    const c = await newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, colorScheme: scheme });
    await localConfig(c); watchOut(c);
    const p = await c.newPage(); p.on("pageerror", (e) => errs.push("pageerror UX7: " + e.message)); p.on("console", (m) => { if (m.type() === "error") errs.push("console UX7: " + m.text()); });
    const r = (ux7[scheme] = {});
    const check7 = async (label) => (await p.evaluate(audit)).forEach((x) => ux7.problems.push(`UX7 · ${scheme} · ${label}: ${x}`));
    const snap7 = async (n) => { await p.evaluate(() => { scrollTo(0, 0); const t = document.querySelector("#toast"); if (t) t.hidden = true; }); await p.screenshot({ path: `${OUTUX7}${n}-${scheme}.png`, fullPage: true }); ux7.shots.push(`${n}-${scheme}`); };
    const txt = (sel) => p.evaluate((s) => { const e = document.querySelector(s); return e ? e.textContent.replace(/\s+/g, " ").trim() : ""; }, sel);
    const shown = (name) => p.$$eval(`#ePick .ck:not([hidden]) input[name=${name}]`, (i) => i.map((x) => x.value).sort().join());
    const picked = () => p.evaluate(() => ({ eb: [...document.querySelectorAll("#ePick input[name=eb]:checked")].map((x) => x.value).sort().join(), em: [...document.querySelectorAll("#ePick input[name=em]:checked")].map((x) => x.value).sort().join() }));
    await p.goto(BASE + "/");
    // kì thi ck1-l4 đã gắn sẵn một đề Ngữ văn 6 và bài ôn IOE 6 (khác khối)
    r.other = await p.evaluate(() => {
      const d = JSON.parse(localStorage.getItem("ontap_db_v1")), ev = d.events.find((e) => e.id === "ck1-l4"), van6 = window.ONTAP_SEED_BANKS.find((b) => b.grade === 6 && b.subject === "Ngữ văn" && !b.pool).id;
      ev.banks = ev.banks.filter((x) => x !== van6).concat(van6); ev.modules = (ev.modules || []).filter((x) => x !== "ioe-6").concat("ioe-6");
      localStorage.setItem("ontap_db_v1", JSON.stringify(d)); return van6;
    });
    await p.reload(); await p.click(`.tile[data-u="${ids["Bố Minh"]}"]`); await p.fill("#pinIn", PINS["Bố Minh"]); await p.waitForSelector(".tabs");
    // X11: kì thi chỉ của lớp 4
    await p.goto(BASE + "/#/admin/event/gk2-l4"); await p.waitForSelector("#ePick");
    r.only4 = await p.evaluate(() => { const e = Store.event("gk2-l4"), ck = document.querySelectorAll("#ePick input:checked").length;
      return { grades: e.grades.join(), want: Store.banks(4).map((b) => b.id).sort().join(), wantM: window.ONTAP_MODULES.filter((m) => m.grade === 4).map((m) => m.id).sort().join(), n: document.querySelector("#ePickN").textContent, ck, mine: e.banks.length + e.modules.length,
        head: document.querySelector("#ePickH").textContent, scope: document.querySelector("#ePickScope").textContent, all: document.querySelector("#eAll").textContent,
        rows: [...document.querySelectorAll("#ePick .ck")].filter((x) => x.offsetParent).every((x) => x.getBoundingClientRect().height >= 44), find: document.querySelector("#eFind").placeholder }; });
    r.only4.eb = await shown("eb"); r.only4.em = await shown("em");
    await p.check('input[name=eg][value="6"]');
    r.only4.with6 = (await shown("eb")) === (await p.evaluate(() => Store.banks().filter((b) => b.grade === 4 || b.grade === 6).map((b) => b.id).sort().join()));
    // X34: các nhóm đang hiện, mỗi nhóm [tên môn, tên các dòng đang hiện]
    const pickRows = () => p.$$eval("#ePick .pk-g", (d) => d.filter((x) => !x.hidden).map((x) => { const ck = [...x.querySelectorAll(".ck")].filter((c) => !c.hidden);
      return [x.querySelector("b").textContent, ck.map((c) => c.textContent.replace(/\s+/g, " ").trim()), ck.map((c) => +c.dataset.g)]; }));
    r.only4.rows6 = await pickRows(); // gk2-l4 có cả lớp 6: mục của khối kì thi (lớp 4) trước mục lớp 6 trong mỗi nhóm
    // X34: kì thi giữa kì I lớp 4 (môn thi Toán, Tiếng Việt): Bài ôn dạng trang, Toán, Tiếng Việt đứng đầu, rồi các môn khác theo lịch thi lớp 4
    await p.goto(BASE + "/#/admin/event/gk1-l4"); await p.waitForSelector("#ePick");
    r.order = { subj: await p.evaluate(() => Store.event("gk1-l4").subjects.join()), gk1: (await pickRows()).map(([g]) => g).join() };
    // X11: kì thi có lựa chọn khác khối, tìm, hiện cả khối khác, lưu
    await p.goto(BASE + "/#/admin/event/ck1-l4"); await p.waitForSelector("#ePick");
    const before = await picked();
    // X33 (Phiên UX7b): dòng khối đang hiện là #ePickScope, hiện ra (cao hơn 0); ô Phạm vi kiến thức giữ id eScope, Lưu đọc ô đó
    const scopeLine = () => p.$eval("#ePickScope", (x) => ({ t: x.textContent, h: x.getBoundingClientRect().height }));
    before.scope = await p.evaluate(() => [Store.event("ck1-l4").scope, document.querySelector("#eScope").tagName, document.querySelector("#eScope").value, document.querySelector("#eScope").textContent].join("|"));
    r.keep = { n: await txt("#ePickN"), ck: before, van6: (await shown("eb")).split(",").includes(r.other), ioe6: (await shown("em")).split(",").includes("ioe-6"), scope: await scopeLine(),
      groups: await p.$$eval("#ePick .pk-g", (d) => d.map((x) => (x.hidden ? "-" : x.open ? "+" : "") + x.querySelector("b").textContent + " " + x.querySelector(".pk-n").textContent).join("|")), rows: await pickRows(),
      gaps: await p.$$eval("#ePick .pk-g:not([hidden])", (d) => [...new Set(d.slice(1).map((x, i) => Math.round(x.getBoundingClientRect().top - d[i].getBoundingClientRect().bottom)))].join()) }; // X35: khoảng cách các thẻ môn ở Sửa kì thi
    await check7("sửa kì thi"); await snap7("sua-ki-thi");
    await p.fill("#eFind", "toan de 2");
    const de2 = (gs) => p.evaluate((gs) => Store.banks().filter((b) => gs.includes(b.grade) && b.subject === "Toán" && / · Đề 2$/.test(b.title)).map((b) => b.id).sort().join(), gs);
    r.find = { eb: await shown("eb"), want: await de2([4]), em: await shown("em"), n: await txt("#ePickN") };
    await check7("sửa kì thi, tìm"); await snap7("sua-ki-thi-tim");
    await p.click("#eAll");
    r.find.all = { eb: await shown("eb"), want: await de2([4, 6]), link: await txt("#eAll"), scope: await txt("#ePickScope") };
    await p.click("#eAll"); await p.fill("#eFind", "");
    r.find.back = (await shown("eb")).split(",").length;
    await p.uncheck('input[name=eg][value="4"]'); r.find.none = await scopeLine(); // bỏ ô Lớp 4: dòng nhắc chọn khối
    await p.check('input[name=eg][value="4"]'); r.find.again = await scopeLine();
    // bỏ một đề Toán 4 đã chọn, chọn một đề Toán 4 chưa chọn
    const flip = await p.evaluate(() => { const ins = [...document.querySelectorAll("#ePick .ck:not([hidden]) input[name=eb]")].filter((i) => /^Toán 4\s/.test(i.parentElement.textContent)); // nb(): khoảng trắng trước "·" là U+00A0
      return { off: (ins.find((i) => i.checked) || {}).value, on: (ins.find((i) => !i.checked) || {}).value }; });
    await p.click(`#ePick input[value="${flip.off}"]`); await p.click(`#ePick input[value="${flip.on}"]`);
    r.keep.n2 = await txt("#ePickN");
    await p.click("#eForm [type=submit]"); await p.waitForFunction(() => location.hash === "#/admin/events");
    const after = await p.evaluate(() => { const e = Store.event("ck1-l4"); return { eb: e.banks.slice().sort().join(), em: e.modules.slice().sort().join(), scope: e.scope }; });
    r.keep.saved = after.em === before.em && after.eb === before.eb.split(",").filter((x) => x !== flip.off).concat(flip.on).sort().join() && after.eb.includes(r.other) && after.em.includes("ioe-6") && !!flip.off && !!flip.on;
    r.keep.scopeSaved = before.scope === `${after.scope}|INPUT|${after.scope}|` && after.scope.length > 10; // ô Phạm vi kiến thức không có chữ ghi nhầm vào, Lưu giữ nguyên
    // X12: tab Ngân hàng đề
    await p.goto(BASE + "/#/admin/banks"); await p.waitForSelector("#seedBanks");
    r.list = await p.evaluate(() => { const seed = window.ONTAP_SEED_BANKS, act = window.ONTAP_GRADES.filter((g) => g.active).map((g) => g.grade), mine = document.querySelector("#myBanks");
      return { first: !!(mine.compareDocumentPosition(document.querySelector("#seedBanks")) & Node.DOCUMENT_POSITION_FOLLOWING), mine: mine.textContent.replace(/\s+/g, " ").trim(),
        tabs: [...document.querySelectorAll("#seedBanks .tabs button")].map((b) => b.textContent + (b.getAttribute("aria-pressed") === "true" ? "*" : "")).join(),
        wantTabs: act.map((g, i) => `Lớp ${g} · ${seed.filter((b) => b.grade === g).length} đề` + (i ? "" : "*")).join(),
        groups: [...document.querySelectorAll('.sb-g[data-sg="4"] .grp')].map((d) => d.querySelector("b").textContent + (d.open ? "+" : "")).join(),
        groups6: [...document.querySelectorAll('.sb-g[data-sg="6"] .grp')].map((d) => d.querySelector("b").textContent).join(),
        lists: [...document.querySelectorAll(".sb-g .grp")].map((d) => [...d.querySelectorAll("a.item b")].map((x) => x.textContent.replace(/\s+/g, " "))), // X34: tên đề trong từng nhóm, theo thứ tự trên màn
        gaps: (() => { const d = [...document.querySelectorAll(".sb-g:not([hidden]) > .grp")]; return d.slice(1).map((x, i) => Math.round(x.getBoundingClientRect().top - d[i].getBoundingClientRect().bottom)).join(); })(), // X35: thẻ môn cách nhau 10px
        rows: document.querySelectorAll("#seedBanks a.item").length, wantRows: seed.filter((b) => act.includes(b.grade)).length }; });
    await check7("ngân hàng đề"); await snap7("ngan-hang-de");
    await p.fill("#seedFind", "toan de 2");
    const visTitles = () => p.$$eval(".sb-g:not([hidden]) a.item:not([hidden]) b", (b) => b.map((x) => x.textContent.replace(/\s+/g, " ")).sort().join());
    const de2T = (g) => p.evaluate((g) => Store.banks(g).filter((b) => b.seed && b.subject === "Toán" && / · Đề 2$/.test(b.title)).map((b) => b.title).sort().join(), g);
    r.list.find4 = { got: await visTitles(), want: await de2T(4), tabs: await p.$$eval("#seedBanks .tabs button", (b) => b.map((x) => x.textContent).join()), open: await p.$$eval('.sb-g[data-sg="4"] .grp:not([hidden])', (d) => d.map((x) => x.querySelector("b").textContent + (x.open ? "+" : "")).join()) };
    await check7("ngân hàng đề, tìm"); await snap7("ngan-hang-de-tim");
    await p.click('#seedBanks .tabs [data-sg="6"]');
    r.list.find6 = { got: await visTitles(), want: await de2T(6) };
    // X13: nhập đề có lỗi
    await p.goto(BASE + "/#/admin/bank/new"); await p.waitForSelector("#bForm");
    await p.fill("#bTitle", "Ôn tổng hợp · tuần 7"); await p.selectOption("#bGrade", "4"); await p.fill("#bSubj", "Toán");
    r.evOpts = await p.evaluate(() => { const v = [...document.querySelectorAll("#bEvent option")].map((o) => o.value), today = new Date().toISOString().slice(0, 10);
      return { first: v[0], n: v.length, ok: v.slice(1).every((id) => { const e = Store.event(id); return e && e.grades.includes(4) && e.kind !== "moc" && (!e.end || e.end >= today); }), gk1: v.includes("gk1-l4"), label: (document.querySelector('#bEvent option[value="gk1-l4"]') || {}).textContent }; });
    await p.fill("#bSrc", UX7_SRC); await p.click("#bCheck");
    r.prev = await p.evaluate(() => { const t = (s) => (document.querySelector(s) || { textContent: "" }).textContent.replace(/\s+/g, " ").trim();
      return { res: t("#bRes"), cards: [...document.querySelectorAll(".pv-card")].map((x) => x.id + (x.hasAttribute("data-bad") ? "!" : "")).join(), filter: t("#bPrev .tabs"),
        pv2: t("#pv2 .fb.bad"), pv3: { tag: t("#pv3 .tag.bad"), src: t("#pv3 .pv-src"), err: t("#pv3 .fb.bad"), head: t("#pv3 .label") },
        right: [...document.querySelectorAll("#pv1 .pv-opts li.right")].map((x) => x.textContent.replace(/\s+/g, " ").trim()).join("|"), fill: t("#pv2 .pv-ans"), psg: t("#pvd1 .pv-head"), check: t("#bCheck") }; });
    await check7("nhập đề có lỗi"); await snap7("nhap-de-loi");
    await p.click('[data-pf="bad"]');
    r.prev.onlyBad = await p.$$eval(".pv-card", (c) => c.filter((x) => !x.hidden).map((x) => x.id).join());
    await p.click('[data-pf="all"]');
    await p.selectOption("#bEvent", "gk1-l4");
    await p.click("#bForm [type=submit]"); await p.waitForSelector("#bAskBox");
    r.ask = await txt("#bAskBox");
    await check7("nhập đề, hỏi lại"); await snap7("nhap-de-hoi-lai");
    await p.click("#bAskNo");
    r.askNo = { box: !(await p.$("#bAskBox")), bad: await p.$eval('[data-pf="bad"]', (b) => b.getAttribute("aria-pressed")), shown: await p.$$eval(".pv-card", (c) => c.filter((x) => !x.hidden).map((x) => x.id).join()), saved: await p.evaluate(() => Store.banks().filter((b) => !b.seed).length) };
    await p.click("#bForm [type=submit]"); await p.click("#bAskYes"); await p.waitForSelector("#myBanks");
    r.saved = await p.evaluate(() => { const b = Store.banks().find((x) => x.title === "Ôn tổng hợp · tuần 7"), e = Store.event("gk1-l4");
      return { hash: location.hash, toast: document.querySelector("#toast").textContent, n: b && b.questions.length, lv: b && b.questions.map((q) => q.lv || 0).join(), first: !!b && e.banks[0] === b.id, once: !!b && e.banks.filter((x) => x === b.id).length === 1,
        row: [...document.querySelectorAll("#myBanks .item")].map((x) => x.textContent.replace(/\s+/g, " ").trim()).find((x) => /tuần 7/.test(x)) || "" }; });
    await check7("ngân hàng đề sau khi lưu"); await snap7("ngan-hang-de-sau-khi-luu");
    // đề mẫu: mọi dạng câu, không lỗi
    await p.goto(BASE + "/#/admin/bank/new"); await p.waitForSelector("#bForm"); await p.click("#bSample");
    r.sample = await p.evaluate(() => ({ cards: document.querySelectorAll(".pv-card").length, bad: document.querySelectorAll(".pv-card[data-bad]").length, filter: !!document.querySelector("#bPrev .tabs"),
      types: [...document.querySelectorAll(".pv-card .pv-head .tag")].map((x) => x.textContent).join(), right: document.querySelectorAll(".pv-opts li.right").length, svgless: !document.querySelector(".pv-card .qfig svg script") }));
    await check7("nhập đề, xem trước đề mẫu"); await snap7("nhap-de-xem-truoc");
    await c.close();
  }
  { // ghép ảnh sáng/tối cạnh nhau (tests/screenshots/ux7/<tên>.jpg)
    const gp = await browser.newPage({ viewport: { width: 752, height: 400 }, deviceScaleFactor: 2 });
    for (const n of [...new Set(ux7.shots.map((x) => x.replace(/-(light|dark)$/, "")))]) {
      const img = (sc) => "data:image/png;base64," + fs.readFileSync(`${OUTUX7}${n}-${sc}.png`).toString("base64");
      await gp.setContent(`<body style="margin:0;display:flex;gap:16px;padding:8px;background:#888;align-items:flex-start"><img src="${img("light")}" width="360"><img src="${img("dark")}" width="360"></body>`);
      await gp.screenshot({ path: `${OUTUX7}${n}.jpg`, fullPage: true, type: "jpeg", quality: 70 });
    }
    await gp.close();
  }
  console.log("UX7:", JSON.stringify(ux7.light), "dark:", JSON.stringify(ux7.dark), "problems:", ux7.problems);
  const ux7OK = !ux7.problems.length && ["light", "dark"].every((sc) => { const r = ux7[sc];
    return r.only4.grades === "4" && r.only4.eb === r.only4.want && r.only4.em === r.only4.wantM && r.only4.n === r.only4.ck + " đã chọn" && r.only4.ck === r.only4.mine && r.only4.head === "Bài ôn và đề cho kì này"
      && r.only4.scope === "Đang hiện bài ôn và đề của Lớp 4, khối của kì thi này." && r.only4.all === "Hiện cả đề của khối khác" && r.only4.rows && r.only4.find === "Tìm đề, ví dụ “Toán Đề 2”" && r.only4.with6
      && r.keep.van6 && r.keep.ioe6 && r.keep.n === (r.keep.ck.eb.split(",").length + r.keep.ck.em.split(",").length) + " đã chọn" && /^\+Bài ôn dạng trang \d+\/\d+ đã chọn\|/.test(r.keep.groups) && /\|\+Toán \d+\/\d+ đã chọn\|/.test(r.keep.groups) && /\|\+Ngữ văn 1\/1 đã chọn(\||$)/.test(r.keep.groups) && /\|\+?Tiếng Việt \d+\/\d+ đã chọn · 1 đề tự soạn\|/.test(r.keep.groups)
      && r.find.eb === r.find.want && r.find.want.split(",").length >= 2 && r.find.em === "" && r.find.all.eb === r.find.all.want && r.find.all.want.split(",").length > r.find.want.split(",").length
      && r.find.all.link === "Chỉ hiện đề của khối kì thi" && r.find.all.scope === "Đang hiện bài ôn và đề của mọi khối." && r.find.back > 10 && r.keep.n2 === r.keep.n && r.keep.saved
      && r.keep.scope.t === "Đang hiện bài ôn và đề của Lớp 4, khối của kì thi này." && r.keep.scope.h > 0 && r.keep.scopeSaved
      && r.find.none.t === "Chọn khối ở trên để thấy bài ôn và đề của khối đó." && r.find.none.h > 0 && r.find.again.t === r.keep.scope.t
      && r.list.first && /^Tiếng Việt 4 · thử ?Lớp 4 · Tiếng Việt · 11 câu · chưa gắn vào kì thi nào/.test(r.list.mine) && r.list.tabs === r.list.wantTabs && r.list.rows === r.list.wantRows
      // X34: môn theo lịch thi của khối; đề theo kì, đề ngẫu nhiên đầu mỗi kì (Toán 4: ba đề giữa kì I trước bốn đề cuối kì I); Sửa kì thi
      && r.list.groups === SUBJ4 && r.list.groups6 === "Toán,Ngữ văn,Tiếng Anh,KHTN,Lịch sử và Địa lí,GDCD,Tin học,Công nghệ,Thử nghiệm" && r.list.lists.length > 10 && r.list.lists.every(inOrder)
      && r.list.lists[0].slice(0, 7).join("|") === "Toán 4 · Giữa kì I · Đề ngẫu nhiên|Toán 4 · Giữa kì I · Đề 1|Toán 4 · Giữa kì I · Đề 2|Toán 4 · Cuối kì I · Đề ngẫu nhiên|Toán 4 · Cuối kì I · Đề 1|Toán 4 · Cuối kì I · Đề 2|Toán 4 · Cuối kì I · Đề 3"
      && r.order.subj === "Toán,Tiếng Việt" && r.order.gk1 === "Bài ôn dạng trang," + SUBJ4
      && r.keep.rows.map(([g]) => g).join() === "Bài ôn dạng trang," + SUBJ4 + ",Ngữ văn" && r.keep.rows.slice(1).every(([, t]) => inOrder(t))
      && /· tự soạn$/.test(r.keep.rows[2][1][r.keep.rows[2][1].length - 1]) && r.keep.rows[1][1].slice(0, 3).join("|") === "Toán 4 · Giữa kì I · Đề ngẫu nhiên|Toán 4 · Giữa kì I · Đề 1|Toán 4 · Giữa kì I · Đề 2"
      && r.only4.rows6.slice(1).every(([, t, g]) => { const k = g.includes(6) ? g.indexOf(6) : g.length; return g.slice(0, k).every((x) => x === 4) && g.slice(k).every((x) => x === 6) && (!k || inOrder(t.slice(0, k))) && (k === g.length || inOrder(t.slice(k))); })
      && r.only4.rows6.some(([, , g]) => g.includes(4) && g.includes(6))
      && r.keep.gaps === "10" && r.list.gaps === "10,10,10,10,10" // X35: thẻ môn của danh sách đề có sẵn cách nhau 10px như ở Sửa kì thi
      && r.list.find4.got === r.list.find4.want && r.list.find4.want.split(",").length >= 2 && /^Lớp 4 · \d+ đề,Lớp 6 · \d+ đề$/.test(r.list.find4.tabs) && r.list.find4.open === "Toán+" && r.list.find6.got === r.list.find6.want && r.list.find6.want.split(",").length >= 2
      && r.evOpts.first === "" && r.evOpts.n > 3 && r.evOpts.ok && r.evOpts.gk1 && /^Kiểm tra giữa học kì I \(\d+\/\d+\)$/.test(r.evOpts.label)
      && r.prev.res === "Nhận được 3 câu: 2 trắc nghiệm, 1 điền khuyết, 0 đúng/sai; 1 đoạn đọc. Cần sửa: 1 câu sẽ không được lưu, 1 câu thiếu phần bị lỗi. Xem các thẻ viền đỏ bên dưới."
      && r.prev.cards === "pv1,pv2!,pv3!,pvd1,pv4" && r.prev.filter === "Tất cả · 5Cần sửa · 2" && r.prev.pv2 === "Mức độ “Rất khó” chưa đúng (Biết, Hiểu hoặc Vận dụng)"
      && r.prev.pv3.tag === "Chưa lưu được" && r.prev.pv3.head === "Câu 3 · Đo lường" && /^Một sợi dây dài 2 m.*Đáp số: một phẩy hai lăm m$/.test(r.prev.pv3.src) && /^Dòng “Đáp số:” cần một số/.test(r.prev.pv3.err)
      && r.prev.right === "A600 000✓ Đúng" && r.prev.fill === "Đáp án được chấm đúng: 543211 hoặc 543 211" && r.prev.psg === "Đoạn đọc 1 · Chú mèo conDùng cho 1 câu" && r.prev.check === "Kiểm tra lại" && r.prev.onlyBad === "pv2,pv3"
      && r.ask === "1 câu sẽ không được lưu, 1 câu thiếu phần bị lỗi. Vẫn lưu?Vẫn lưuSửa tiếp" && r.askNo.box && r.askNo.bad === "true" && r.askNo.shown === "pv2,pv3" && r.askNo.saved === 1
      && r.saved.hash === "#/admin/banks" && r.saved.toast === "Đã lưu, gắn vào “Kiểm tra giữa học kì I”." && r.saved.n === 3 && r.saved.lv === "0,0,0" && r.saved.first && r.saved.once && /gắn vào Kiểm tra giữa học kì I/.test(r.saved.row)
      && r.sample.cards === 12 && r.sample.bad === 0 && !r.sample.filter && r.sample.types === "Trắc nghiệm,Điền khuyết,Đúng/sai,Đúng/sai,Đúng/sai 4 ý,Hiểu,Dùng cho 2 câu,Trắc nghiệm,Trắc nghiệm,Trả lời bằng số,Nối cột,Sắp xếp,Tự luận" && r.sample.right === 3 && r.sample.svgless; });

  step("send weekly report: message preview, share sheet, copy, print (UX8, X14)");
  /* Phiên UX8 (docs/CAI-TIEN-UX-2X.md, mục 3, X14): Mẹ Bin mở báo cáo tuần của Bin ở 360px sáng/tối, ngày giả lập 21/10/2026 18:00, dữ
     liệu như bước UX2 (4 bài trong tuần, 1 bài tuần trước). Khối "Tin nhắn sẽ gửi" (#rpMsg) ngay dưới đầu trang, trước các ô số liệu:
     tin nhắn chữ thuần khớp các ô (số bài, ngày ôn, phút, điểm trung bình và điểm tuần trước), chủ đề hay sai như mục Chủ đề hay sai
     (tối đa 3), kì thi gần nhất như thẻ đầu ở Kì thi sắp tới (ngày, dự kiến, còn N ngày), 1–2 gợi ý lấy từ mục Gợi ý ôn tuần sau nhưng
     không nói về kì thi, chủ đề hay sai, dòng cuối "Gửi từ OnUp.", không quá 600 chữ cái, không có tên gia đình, đường dẫn; nút chính
     "Gửi báo cáo" có biểu tượng, nút "Chép tin nhắn"; hàng trên cùng có nút phụ "In" (≥ 44×44px).
     - Giả lập navigator.share (page.addInitScript): "Gửi báo cáo" truyền đúng { title, text } (không có url), không chép, không báo gì;
       người dùng hủy (AbortError) cũng không chép, không báo; share lỗi khác (NotAllowedError) thì chép tin nhắn.
     - Không có navigator.share: "Gửi báo cáo" chép tin nhắn vào clipboard, toast "Đã chép tin nhắn…"; "Chép tin nhắn" cũng vậy; chép
       không được (clipboard, execCommand đều lỗi) thì chữ trong khối xem trước được chọn sẵn, toast "Chưa chép được…".
     - In (emulateMedia print): không có khối tin nhắn, nút In; vẫn có nhãn OnUp · Báo cáo tuần.
     - Na (lớp 6, cũng là con của Mẹ Bin trong bước này) chưa làm bài nào trong tuần: tin nhắn chỉ có dòng "Chưa làm bài nào", kì thi
       gần nhất, gợi ý bắt đầu lại; không có dòng điểm, chủ đề.
     Ảnh 360px sáng/tối ở tests/screenshots/ux8/ (bản ghép <tên>.jpg; chép sang docs/hinh-ux8/): bao-cao-tin-nhan, da-chep, ban-in. */
  const OUTUX8 = OUT + "ux8/"; fs.mkdirSync(OUTUX8, { recursive: true });
  const ux8 = { problems: [], shots: [] };
  const SHARE_STUB = () => {
    window.__share = { mode: "ok", calls: [] };
    Object.defineProperty(navigator, "share", { configurable: true, value: (d) => {
      __share.calls.push(d);
      if (__share.mode === "abort") return Promise.reject(new DOMException("Share canceled", "AbortError"));
      if (__share.mode === "fail") return Promise.reject(new DOMException("Not allowed", "NotAllowedError"));
      return Promise.resolve();
    } });
  };
  for (const scheme of ["light", "dark"]) {
    const c = await newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, colorScheme: scheme });
    await localConfig(c); watchOut(c); await c.grantPermissions(["clipboard-read", "clipboard-write"], { origin: BASE });
    const p = await c.newPage(); p.on("pageerror", (e) => errs.push("pageerror UX8: " + e.message)); p.on("console", (m) => { if (m.type() === "error") errs.push("console UX8: " + m.text()); });
    await p.addInitScript(SHARE_STUB);
    const r = (ux8[scheme] = {});
    const check8 = async (label) => (await p.evaluate(audit)).forEach((x) => ux8.problems.push(`UX8 · ${scheme} · ${label}: ${x}`));
    const snap8 = async (n, view) => { await p.evaluate((view) => { scrollTo(0, 0); const t = document.querySelector("#toast"); if (t && !view) t.hidden = true; }, view); await p.screenshot({ path: `${OUTUX8}${n}-${scheme}.png`, fullPage: !view }); ux8.shots.push(`${n}-${scheme}`); };
    const clip = () => p.evaluate(() => navigator.clipboard.readText()).catch((e) => "lỗi: " + e.message);
    const toastNow = () => p.evaluate(() => { const t = document.querySelector("#toast"); return t && !t.hidden ? t.textContent : ""; });
    const hush = () => p.evaluate(() => { const t = document.querySelector("#toast"); if (t) t.hidden = true; });
    const tap = async (sel) => { await hush(); await p.click(sel); await p.waitForTimeout(250); }; // bấm nút, chờ chép xong
    const shares = () => p.evaluate(() => __share.calls.length);
    await p.clock.install({ time: new Date("2026-10-21T18:00:00") });
    await p.goto(BASE + "/");
    await p.evaluate(() => {
      const d = JSON.parse(localStorage.getItem("ontap_db_v1")), bin = d.users.find((u) => u.name === "Bin");
      d.users.find((u) => u.name === "Na").parentIds = [d.users.find((u) => u.name === "Mẹ Bin").id]; // Na cũng là con của Mẹ Bin (chỉ trong bước này)
      const at = (days, h) => { const x = new Date(); x.setDate(x.getDate() - days); x.setHours(h, 10, 0, 0); return x.toISOString(); };
      const mk = (o) => Object.assign({ id: "ux8" + Math.random().toString(36).slice(2), userId: bin.id, s: 900 }, o);
      d.results = [
        mk({ source: "bank", refId: "toan4-ck1-de1", subject: "Toán", label: "Toán 4 · Cuối kì I · Đề 1", mode: "practice", r: 19, t: 25, at: at(10, 9), wrongTopics: ["Góc và đo góc"] }), // tuần trước
        mk({ source: "bank", refId: "toan4-ck1-de1", subject: "Toán", label: "Toán 4 · Cuối kì I · Đề 1", mode: "practice", r: 21, t: 25, at: at(2, 9), wrongTopics: ["Góc và đo góc", "Góc và đo góc", "Đơn vị đo"] }),
        mk({ source: "module", refId: "l4-giua-ki-1", subject: "Toán", label: "Toán · Đề 1", mode: "exam", r: 18, t: 20, at: at(1, 20) }),
        mk({ source: "bank", refId: "ta4-ck1-de1", subject: "Tiếng Anh", label: "Tiếng Anh 4 · Cuối kì I · Đề 1", mode: "exam", r: 22, t: 25, at: at(0, 9) }),
        mk({ source: "bank", refId: "toan4-ck1-de2", subject: "Toán", label: "Toán 4 · Cuối kì I · Đề 2", mode: "practice", r: 20, t: 25, at: at(0, 17) })];
      localStorage.setItem("ontap_db_v1", JSON.stringify(d));
    });
    await p.reload(); await p.click(`.tile[data-u="${ids["Mẹ Bin"]}"]`); await p.fill("#pinIn", PINS["Mẹ Bin"]); await p.waitForSelector("#kids");
    await p.click(`a.kid[href="#/child/${ids.Bin}"]`); await p.waitForSelector("#rpMsg");
    r.page = await p.evaluate(() => {
      const t = (s) => { const e = document.querySelector(s); return e ? e.textContent.replace(/\s+/g, " ").trim() : ""; }, box = (s) => document.querySelector(s).getBoundingClientRect();
      let next = document.querySelector("#rpHead").nextElementSibling; while (next && next.classList.contains("notice")) next = next.nextElementSibling;
      const btn = (s) => ({ text: t(s), main: document.querySelector(s).classList.contains("main"), icon: !!document.querySelector(s + " svg"), w: Math.round(box(s).width), h: Math.round(box(s).height) });
      return { msg: document.querySelector("#rpMsgText").textContent, label: t("#rpMsg .label"), pre: getComputedStyle(document.querySelector("#rpMsgText")).whiteSpace, after: next && next.id,
        beforeStats: !!(document.querySelector("#rpMsg").compareDocumentPosition(document.querySelector(".stats.four")) & Node.DOCUMENT_POSITION_FOLLOWING),
        count: t("#rpCount"), days: t("#rpDays"), mins: t("#rpMins"), avg: t("#rpAvg"), pvAvg: t("#rpAvg + span + small"),
        topics: [...document.querySelectorAll("#rpTopics .item .grow")].map((x) => x.textContent.trim()), tips: [...document.querySelectorAll("#rpTips li")].map((x) => x.textContent.trim()),
        ev: { title: t("#rpEvents .ev b"), left: [...document.querySelectorAll("#rpEvents .ev:first-child .tag")].map((x) => x.textContent).find((x) => /^Còn \d+ ngày$/.test(x)) || "" },
        send: btn("#rpSend"), copy: btn("#rpCopy"), print: Object.assign(btn("#rpPrint"), { top: box("#rpPrint").bottom <= box("#rpHead").top }), school: Store.settings().schoolName };
    });
    await check8("báo cáo tuần, tin nhắn"); await snap8("bao-cao-tin-nhan");
    // giả lập navigator.share: tin nhắn truyền vào đúng, không chép, không báo gì; hủy cũng vậy; lỗi khác thì chép
    await p.evaluate(() => navigator.clipboard.writeText("trước"));
    await tap("#rpSend");
    r.share = { calls: await p.evaluate(() => __share.calls.map((d) => ({ keys: Object.keys(d).sort().join(), title: d.title, text: d.text }))), clip: await clip(), toast: await toastNow() };
    await p.evaluate(() => (__share.mode = "abort")); await tap("#rpSend");
    r.abort = { n: await shares(), clip: await clip(), toast: await toastNow() };
    await p.evaluate(() => (__share.mode = "fail")); await tap("#rpSend");
    r.fail = { n: await shares(), clip: await clip(), toast: await toastNow() };
    // máy không có bảng chia sẻ: "Gửi báo cáo" chép tin nhắn; "Chép tin nhắn" cũng vậy
    await p.evaluate(() => { delete navigator.share; return navigator.clipboard.writeText("trước"); }); await tap("#rpSend");
    r.noShare = { type: await p.evaluate(() => typeof navigator.share), n: await shares(), clip: await clip(), toast: await toastNow() };
    await p.evaluate(() => navigator.clipboard.writeText("trước")); await tap("#rpCopy");
    r.copy = { clip: await clip(), toast: await toastNow() };
    await check8("báo cáo tuần, đã chép"); await snap8("da-chep", true);
    // chép không được: chữ trong khối xem trước được chọn sẵn
    await p.evaluate(() => { navigator.clipboard.writeText = () => Promise.reject(new DOMException("Denied", "NotAllowedError")); document.execCommand = () => false; getSelection().removeAllRanges(); });
    await tap("#rpCopy");
    r.noCopy = await p.evaluate(() => { const s = getSelection(), t = document.querySelector("#toast"); return { sel: s.toString(), inBox: s.rangeCount > 0 && document.querySelector("#rpMsg").contains(s.getRangeAt(0).commonAncestorContainer), toast: t && !t.hidden ? t.textContent : "" }; });
    // bản in: không có khối tin nhắn, nút In
    await p.evaluate(() => getSelection().removeAllRanges()); await hush();
    await p.emulateMedia({ media: "print" });
    r.print = await p.evaluate(() => ({ msg: getComputedStyle(document.querySelector("#rpMsg")).display, send: document.querySelector("#rpSend").getBoundingClientRect().height, printBtn: document.querySelector("#rpPrint").getBoundingClientRect().height, label: getComputedStyle(document.querySelector("#rpHead .onlyprint")).display }));
    await snap8("ban-in");
    await p.emulateMedia({ media: "screen" });
    // con chưa làm bài nào trong tuần
    await p.goto(BASE + "/#/child/" + ids.Na); await p.waitForFunction(() => /của Na/.test((document.querySelector("#rpMsgText") || {}).textContent || ""));
    r.empty = await p.evaluate(() => document.querySelector("#rpMsgText").textContent);
    await c.close();
  }
  { // ghép ảnh sáng/tối cạnh nhau (tests/screenshots/ux8/<tên>.jpg)
    const gp = await browser.newPage({ viewport: { width: 752, height: 400 }, deviceScaleFactor: 2 });
    for (const n of [...new Set(ux8.shots.map((x) => x.replace(/-(light|dark)$/, "")))]) {
      const img = (sc) => "data:image/png;base64," + fs.readFileSync(`${OUTUX8}${n}-${sc}.png`).toString("base64");
      await gp.setContent(`<body style="margin:0;display:flex;gap:16px;padding:8px;background:#888;align-items:flex-start"><img src="${img("light")}" width="360"><img src="${img("dark")}" width="360"></body>`);
      await gp.screenshot({ path: `${OUTUX8}${n}.jpg`, fullPage: true, type: "jpeg", quality: 70 });
    }
    await gp.close();
  }
  const brief8 = (r) => r && JSON.stringify(r, (k, v) => (k !== "msg" && typeof v === "string" && v === r.page.msg ? "= tin nhắn" : v)); // tin nhắn chỉ in một lần
  console.log("UX8:", brief8(ux8.light), "dark:", brief8(ux8.dark), "problems:", ux8.problems);
  const COPIED = "Đã chép tin nhắn. Dán vào Zalo hoặc tin nhắn để gửi.";
  const ux8OK = !ux8.problems.length && ["light", "dark"].every((sc) => { const r = ux8[sc], g = r.page, L = g.msg.split("\n"), tipL = L.slice(5, -1), flat = (x) => x.replace(/\s+/g, " ").trim();
    return L[0] === "Báo cáo tuần của Bin (15/10 – 21/10/2026)" && L[1] === `• Làm ${g.count} bài, ôn ${g.days} ngày, ${g.mins} phút.` && g.count === "4" && g.days === "3/7" && g.mins === "60"
      && L[2] === `• Điểm trung bình ${g.avg}/10 (tuần trước ${g.pvAvg.replace(/^Tuần trước: /, "")}).` && g.avg === "8,5" && g.pvAvg === "Tuần trước: 7,5"
      && L[3] === `• Chủ đề hay sai: ${g.topics.slice(0, 3).join("; ")}.` && g.topics.join() === "Góc và đo góc,Đơn vị đo"
      && L[4] === `• Sắp tới: ${g.ev.title}, 2/11 – 13/11/2026 (dự kiến, ${g.ev.left.toLowerCase()}).` && g.ev.title === "Kiểm tra giữa học kì I" && g.ev.left === "Còn 12 ngày"
      && tipL.join("|") === "• Gợi ý: Tuần sau cố gắng ôn ít nhất 5 ngày, mỗi ngày 20–30 phút, thay vì làm dồn một buổi.|• Gợi ý: Tuần này chưa ôn Tiếng Việt cho kì thi sắp tới."
      && tipL.every((x) => g.tips.some((li) => li.includes(x.slice("• Gợi ý: ".length))) && !x.includes(g.ev.title) && !/còn \d+ ngày|chủ đề hay sai/i.test(x)) && g.tips.length === 4
      && L[L.length - 1] === "Gửi từ OnUp." && g.msg.length <= 600 && g.school === "Nhà Bin" && !g.msg.includes(g.school) && !/https?:|#\/|www\./.test(g.msg)
      && g.label === "Tin nhắn sẽ gửi" && g.pre === "pre-line" && g.after === "rpMsg" && g.beforeStats
      && g.send.text === "Gửi báo cáo" && g.send.main && g.send.icon && g.send.h >= 44 && g.copy.text === "Chép tin nhắn" && !g.copy.main && g.copy.h >= 44
      && g.print.text === "In" && !g.print.main && g.print.w >= 44 && g.print.h >= 44 && g.print.top
      && r.share.calls.length === 1 && r.share.calls[0].keys === "text,title" && r.share.calls[0].title === "Báo cáo tuần của Bin" && r.share.calls[0].text === g.msg && r.share.clip === "trước" && r.share.toast === ""
      && r.abort.n === 2 && r.abort.clip === "trước" && r.abort.toast === "" && r.fail.n === 3 && r.fail.clip === g.msg && r.fail.toast === COPIED
      && r.noShare.type === "undefined" && r.noShare.n === 3 && r.noShare.clip === g.msg && r.noShare.toast === COPIED && r.copy.clip === g.msg && r.copy.toast === COPIED
      && r.noCopy.inBox && flat(r.noCopy.sel) === flat(g.msg) && r.noCopy.toast === "Chưa chép được. Tin nhắn đã được chọn sẵn, bấm giữ để chép."
      && r.print.msg === "none" && r.print.send === 0 && r.print.printBtn === 0 && r.print.label !== "none"
      && /^Báo cáo tuần của Na \(15\/10 – 21\/10\/2026\)\n• Chưa làm bài nào trong 7 ngày qua\.\n• Sắp tới: Kiểm tra giữa học kì I, \d+\/\d+ – \d+\/\d+\/2026 \(dự kiến, còn \d+ ngày\)\.\n• Gợi ý: Tuần sau bắt đầu lại nhẹ nhàng: mỗi ngày một đề ngắn 20–30 phút\.\nGửi từ OnUp\.$/.test(r.empty); });

  step("offline (L13)");
  /* sw.js đệm đủ file của app: so danh sách FILES với các file trong repo (thiếu thì mất mạng là hỏng, thừa thì không cài được).
     Đề có sẵn: chỉ danh mục data/banks/index.js nằm trong FILES; file câu hỏi vào đệm khi mở đề. */
  const sw = new Function("self", fs.readFileSync(ROOT + "sw.js", "utf8") + "\nreturn { VERSION, FILES };")({ addEventListener() {} });
  const ls = (dir, re) => fs.readdirSync(ROOT + dir).filter((n) => re.test(n)).map((n) => dir + n);
  const want = ["./", "manifest.webmanifest"].concat(ls("css/", /\.css$/), ls("js/", /\.js$/), ls("data/", /\.js$/), ["data/banks/index.js"], ls("fonts/", /\.(css|woff2)$/), ls("icons/", /\./), ls("icons/avatars/", /\.svg$/),
    fs.readdirSync(ROOT + "modules").map((m) => `modules/${m}/index.html`));
  const swList = { missing: want.filter((f) => !sw.FILES.includes(f)), extra: sw.FILES.filter((f) => !want.includes(f)) };
  /* Chữ (luật trong CLAUDE.md, “Quy ước code”): Lora (var(--display)) chỉ ở chữ OnUp (.brand) và điểm to (.score) của css/app.css, ở
     4 bài ôn chỉ .score; các quy tắc đó không ghi tabular-nums (chữ số bằng nhau và dấu phẩy của Lora rộng); h1,h2,h3 có line-height 1.35;
     css/app.css không ghi độ đậm 800 (chỉ có font 400–700). */
  const fontBad = ["css/app.css"].concat(fs.readdirSync(ROOT + "modules").map((m) => `modules/${m}/index.html`)).flatMap((f) => {
    const css = fs.readFileSync(ROOT + f, "utf8").replace(/\/\*[\s\S]*?\*\//g, ""), bad = [];
    const disp = css.match(/[^{}]*\{[^{}]*var\(--display\)[^{}]*\}/g) || [], sels = disp.map((r) => r.slice(0, r.indexOf("{")).trim()).join();
    if (sels !== (f === "css/app.css" ? ".brand,.score" : ".score")) bad.push(f + ": Lora ở " + sels);
    disp.filter((r) => /tabular-nums/.test(r)).forEach((r) => bad.push(f + ": tabular-nums ở " + r.trim().slice(0, 40)));
    const h = css.match(/(^|\})\s*h1,h2,h3\{[^}]*\}/);
    if (!h || !/line-height:1\.35/.test(h[0])) bad.push(f + ": h1,h2,h3 chưa có line-height 1.35");
    if (f === "css/app.css" && /font-weight:800|font:800/.test(css)) bad.push(f + ": còn độ đậm 800");
    return bad;
  });
  // Tải trang một lần (service worker cài và đệm), rồi mất mạng: tải lại vẫn vào được, đăng nhập, mở bài ôn và đề ngân hàng.
  const off = await newContext({ storageState: state, viewport: { width: 390, height: 844 } });
  await localConfig(off);
  watchOut(off);
  const swSeen = [], leaked = []; let offline = false;
  off.on("request", (r) => { if (r.serviceWorker()) swSeen.push(r.url()); });
  off.on("response", (r) => { if (offline && /^http/.test(r.url()) && !r.fromServiceWorker()) leaked.push(r.url()); }); // mất mạng: mọi file phải do service worker trả
  const op = await off.newPage();
  op.on("pageerror", (e) => errs.push("pageerror offline: " + e.message));
  let expectFail = null;
  op.on("console", (m) => { if (m.type() === "error" && !(expectFail && expectFail.test(m.location().url || ""))) errs.push("console offline: " + m.text() + " " + (m.location().url || "")); });
  await op.goto(BASE + "/");
  await op.evaluate(() => navigator.serviceWorker.ready); await op.waitForFunction(() => !!navigator.serviceWorker.controller);
  const cache = await op.evaluate(async () => { const k = await caches.keys(), c = await caches.open(k[0]); return { names: k, urls: (await c.keys()).map((r) => r.url) }; });
  /* File câu hỏi chỉ vào đệm khi đã mở: Bin mở một đề Toán 4 khi còn mạng (4-toan.js vào đệm), rồi về màn hình đăng nhập. */
  await op.click(`.tile[data-u="${ids.Bin}"]`); await op.fill("#pinIn", PINS.Bin); await op.waitForTimeout(400);
  await op.goto(BASE + "/#/quiz/toan4-ck1-de1"); await op.waitForSelector("#qPractice");
  await op.evaluate(() => Store.setSession(null));
  /* Đổi VERSION: activate của sw.js chép file câu hỏi đã mở từ đệm cũ sang đệm mới rồi xóa đệm cũ (keepBanks). Playwright
     không thay được sw.js lúc trình duyệt kiểm tra bản mới, nên chạy hàm activate của sw.js ngay trong trang (CacheStorage
     giống hệt trong service worker), với một đệm cũ dựng tay: 4-tv.js (Bin đã mở Tiếng Việt ở bản trước), danh mục và
     js/cu.js của bản cũ (không được chép). */
  const swSrc = fs.readFileSync(ROOT + "sw.js", "utf8"), tvSrc = "/* ban-cu */\n" + fs.readFileSync(ROOT + "data/banks/4-tv.js", "utf8");
  const bump = await op.evaluate(async ({ swSrc, tvSrc }) => {
    const old = await caches.open("onup-v0-cu"), js = (t) => new Response(t, { headers: { "content-type": "text/javascript" } }), at = (f) => location.origin + "/" + f;
    await old.put(at("data/banks/4-tv.js"), js(tvSrc)); await old.put(at("data/banks/index.js"), js("/* ban-cu */")); await old.put(at("js/cu.js"), js("/* ban-cu */"));
    const on = {};
    new Function("self", swSrc)({ addEventListener: (t, f) => (on[t] = f), clients: { claim: () => Promise.resolve() } });
    let done; on.activate({ waitUntil: (p) => (done = p) }); await done;
    const now = await caches.open((await caches.keys())[0]), text = async (f) => { const r = await now.match(at(f)); return r ? (await r.text()).slice(0, 12) : null; };
    return { keys: (await caches.keys()).join(), n: (await now.keys()).length, tv: await text("data/banks/4-tv.js"), toan: !!(await text("data/banks/4-toan.js")),
      index: await text("data/banks/index.js"), cu: await text("js/cu.js") };
  }, { swSrc, tvSrc });
  /* Mất mạng: setOffline chưa chặn hết request của service worker, nên chặn thêm mọi request bằng route (có cờ ở đầu file,
     route áp dụng cả cho service worker) và bỏ đệm HTTP của trình duyệt. Chỉ còn đệm của service worker. */
  await off.setOffline(true); offline = true;
  await off.route("**/*", (r) => r.abort("internetdisconnected"));
  await (await off.newCDPSession(op)).send("Network.clearBrowserCache");
  await op.reload(); await op.waitForSelector(`.tile[data-u="${ids.Bin}"]`, { timeout: 5000 }).catch(() => {});
  const offFonts = await op.evaluate(async () => { await document.fonts.ready; return [...new Set([...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family))].sort().join(); });
  const ol = { login: !!(await op.$(`.tile[data-u="${ids.Bin}"]`)), fonts: offFonts };
  await op.click(`.tile[data-u="${ids.Bin}"]`); await op.fill("#pinIn", PINS.Bin); await op.waitForTimeout(400);
  ol.who = await op.evaluate(() => (Store.sessionUser() || {}).name);
  await op.goto(BASE + "/#/play/ioe-4"); await op.waitForTimeout(1200);
  const offFrame = op.frames().find((x) => /modules\/ioe-4/.test(x.url()));
  ol.play = !!offFrame && (await offFrame.evaluate(() => document.title + " · " + window.ONTAP_NS));
  await op.goto(BASE + "/#/quiz/toan4-ck1-de1"); await op.waitForTimeout(300);
  await op.click("#qPractice"); await op.waitForTimeout(200);
  ol.quiz = !!(await op.$(".qcard")) && !!(await op.$(".opt, #qzFill"));
  await op.screenshot({ path: OUT + "17-offline-quiz.png", fullPage: true });
  await op.goto(BASE + "/#/quiz/tv4-ck1-de1"); await op.waitForSelector("#qPractice", { timeout: 5000 }).catch(() => {});
  ol.keptTv = !!(await op.$("#qPractice")); // đề Tiếng Việt mở ở bản trước, chép sang đệm mới
  expectFail = /\/data\/banks\/4-ta\.js$/; // đề chưa mở lần nào: trình duyệt báo lỗi tải file này, đúng như mong đợi
  await op.goto(BASE + "/#/quiz/ta4-ck1-de1"); await op.waitForSelector("#qRetry", { timeout: 5000 }).catch(() => {});
  ol.notOpened = /Can't load this test/.test(await op.textContent("#view")) && !!(await op.$("#qRetry")) && !(await op.$("#qPractice")); // đề Tiếng Anh: báo bằng tiếng Anh (TA2); bản tiếng Việt thử ở bước 360px (tv4-ck1-de1)
  await op.screenshot({ path: OUT + "17b-offline-de-chua-mo.png", fullPage: true });
  expectFail = null;
  await op.goto(BASE + "/index.html"); await op.waitForTimeout(300); // trang chưa đệm riêng: trả về trang chính
  ol.other = await op.evaluate(() => !!document.querySelector("#view .tile, #view .hero"));
  offline = false; await off.close();
  console.log("offline:", ol, "font rules:", fontBad, "sw list:", swList, "sw version:", sw.VERSION, "cache:", cache.names, cache.urls.length, "new version:", bump, "sw requests:", swSeen.length, "leaked:", leaked);
  const offlineOK = !swList.missing.length && !swList.extra.length && !fontBad.length && cache.names.join() === sw.VERSION && cache.urls.length === sw.FILES.length && cache.urls.every((u) => u.startsWith(BASE + "/"))
    && bump.keys === sw.VERSION && bump.n === sw.FILES.length + 2 && bump.tv === "/* ban-cu */" && bump.toan && bump.index !== "/* ban-cu */" && bump.cu === null
    && swSeen.length > 0 && !leaked.length && ol.login && ol.fonts === "Lora,Noto Sans" && ol.who === "Bin" && /Global Success 4/.test(ol.play) && ol.quiz && ol.keptTv && ol.notOpened && ol.other;

  step("service worker: one set of files per page load (L19)");
  /* Service worker đã cài. Mọi file của app chậm 6 giây: trang vẫn hiện trước 6 giây (cả bộ lấy từ đệm), không lỗi JS,
     và trang HTML đến muộn không ghi vào đệm. Rồi chỉ js/app.js chậm 6 giây, js/store.js có bản mới: không được chạy
     app.js cũ cùng store.js mới. Route của context áp dụng cho request do service worker gửi (cờ ở đầu file). */
  const sc = await newContext({ storageState: state, viewport: { width: 390, height: 844 } });
  await localConfig(sc); watchOut(sc);
  const sp19 = await sc.newPage();
  sp19.on("pageerror", (e) => errs.push("pageerror L19: " + e.message));
  sp19.on("console", (m) => { if (m.type() === "error") errs.push("console L19: " + m.text()); });
  const sleep = (ms) => new Promise((ok) => setTimeout(ok, ms));
  await sp19.goto(BASE + "/"); await sp19.evaluate(() => navigator.serviceWorker.ready); await sp19.waitForFunction(() => !!navigator.serviceWorker.controller);
  const html = fs.readFileSync(ROOT + "index.html", "utf8");
  const slowAll = (r) => sleep(6000).then(() => (r.request().url() === BASE + "/" ? r.fulfill({ contentType: "text/html", body: html + "<!-- ban-moi -->" }) : r.fallback())).catch(() => {});
  await sc.route("**/*", slowAll);
  let t19 = Date.now();
  await sp19.reload({ waitUntil: "commit" }); await sp19.waitForSelector(".tile", { timeout: 20000 });
  const s19 = { slowAll: Date.now() - t19 };
  await sleep(Math.max(0, 7500 - s19.slowAll)); // trang HTML từ mạng đã đến (sau 6 giây)
  s19.cachedHtml = await sp19.evaluate((v) => caches.open(v).then((c) => c.match(location.origin + "/")).then((r) => r.text()).then((t) => t.includes("ban-moi")), sw.VERSION);
  await sc.unroute("**/*", slowAll);
  const appSrc = fs.readFileSync(ROOT + "js/app.js", "utf8"), storeSrc = fs.readFileSync(ROOT + "js/store.js", "utf8");
  await sc.route("**/js/app.js", (r) => sleep(6000).then(() => r.fulfill({ contentType: "text/javascript", body: appSrc + "\nwindow.__swApp = 'new';" })).catch(() => {}));
  await sc.route("**/js/store.js", (r) => r.fulfill({ contentType: "text/javascript", body: "window.__swStore = 'new';\n" + storeSrc }));
  t19 = Date.now();
  await sp19.reload({ waitUntil: "commit" }); await sp19.waitForSelector(".tile", { timeout: 20000 });
  s19.mixedMs = Date.now() - t19;
  s19.mixed = await sp19.evaluate(() => (window.__swApp || "old") + " app.js, " + (window.__swStore || "old") + " store.js");
  await sc.close();
  console.log("L19:", s19);
  const swOK = s19.slowAll < 6000 && !s19.cachedHtml && s19.mixed === "new app.js, new store.js";
  step("admin page in local mode");
  // Trang admin của chủ app (admin.html) chỉ dùng với bản đám mây: ở bản lưu trên máy chỉ báo, không tải gì từ mạng (outReqs).
  const ap = await ctx.newPage();
  ap.on("pageerror", (e) => errs.push("pageerror admin: " + e.message));
  await ap.goto(BASE + "/admin.html"); await ap.waitForSelector("#noCloud");
  const adminLocal = /chỉ dùng với bản đám mây/.test(await ap.textContent("#noCloud")) && !(await ap.evaluate(() => !!window.supabase || !!document.querySelector("#adLogin")));
  await ap.close();
  const cloudMode = await page.evaluate(() => !!(window.Store.cloud || window.LocalStore));
  console.log("local mode:", !cloudMode, "requests outside " + HOST + ":", outReqs);
  const real = errs;
  console.log("ERRORS:", real);
  console.log("reveal (U1):", rv);
  // Mỗi bước một cờ; bước nào sai thì in tên cờ để tìm cho nhanh.
  const flags = { reveal: !rv.length, errors: !real.length, localMode: !cloudMode, noOutside: !outReqs.length, backupOK, offlineOK, cloudOK, results5: db.results.length === 5, banks1: db.banks.length === 1, dataOK: !dataErrs.length,
    migOK, calOK, reportOK, modGuardOK, examGuardOK, pinLockOK, routeOK, pinAutoOK, ok360, gradesOK, noAnswerOK, homeScreenOK, labelsOK, swOK, adminLocal, k2OK, k3OK, k4OK, r1OK, ta1OK, ta2OK, modViOK, fix9eOK, ux1OK, ux2OK, l27OK, modNumOK, overlapOK, l36OK, l37OK, l40OK, l42OK, pickOK, ux4OK, artOK, ux5OK, numOK, l29OK, ux6LocalOK, l38OK, mod9oOK, ux7OK, ux8OK };
  const failed = Object.keys(flags).filter((k) => !flags[k]);
  if (failed.length) { console.error("E2E FAILED:", failed.join(", ")); process.exitCode = 1; } else console.log("E2E OK");
  await browser.close();
})();
