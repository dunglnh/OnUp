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
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
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
  /* Nút xem mật khẩu, mã PIN (U1). revealTry: ô (đã có chữ) có nút ngay sau nó; bấm thì hiện chữ (type="text",
     aria-pressed="true", aria-label "Ẩn …"), bấm lại thì ẩn; giá trị, focus, vị trí con trỏ, inputmode, autocomplete giữ nguyên.
     Chỗ sai ghi vào rv. eye(sel): bấm nút của ô; types(...sel): type của các ô. */
  const rv = [];
  const eye = (pg, sel) => pg.click(sel + " + .reveal-btn");
  const types = (pg, ...sels) => Promise.all(sels.map((x) => pg.$eval(x, (i) => i.type))).then((t) => t.join());
  async function revealTry(pg, sel, what) {
    const st = () => pg.$eval(sel, (i) => { const b = i.nextElementSibling; return { type: i.type, btn: !!b && b.matches("button.reveal-btn[type=button]") && !!b.querySelector("svg"), pressed: b && b.getAttribute("aria-pressed"), label: b && b.getAttribute("aria-label"), value: i.value, focus: document.activeElement === i, caret: i.selectionStart, mode: i.getAttribute("inputmode"), ac: i.getAttribute("autocomplete") }; });
    await pg.focus(sel); await pg.$eval(sel, (i) => i.setSelectionRange(1, 1));
    const a = await st(); await eye(pg, sel);
    const b = await st(); await eye(pg, sel);
    const c = await st();
    const good = (x, type, pressed, verb) => x.btn && x.type === type && x.pressed === pressed && x.label === verb + " " + what && x.value === a.value && x.focus && x.caret === 1 && x.mode === a.mode && x.ac === a.ac;
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
  await page.click(".tile:has-text('Bin')");
  // bàn phím PIN: nút xem, hàng chấm hiện chữ số; gửi PIN (sai) hoặc xóa hết thì ẩn lại
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
  await page.waitForTimeout(200); await shot("08-quiz-result");

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
  await page.click("#qzExit"); ex0.exit = (await page.textContent("#qzFb")).replace(/\s+/g, " ");
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
  await page.click("[data-child]"); await page.waitForTimeout(300); await shot("12-child");

  step("weekly report");
  await page.click("#toReport"); await page.waitForSelector(".report");
  const rep = await page.evaluate(() => ({
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
  const printHidden = await page.evaluate(() => [".top", ".noprint", ".foot"].every((s) => getComputedStyle(document.querySelector(s)).display === "none")
    && getComputedStyle(document.body).backgroundColor === "rgb(255, 255, 255)");
  await page.pdf({ path: OUT + "12c-bao-cao-tuan.pdf", format: "A4", printBackground: false });
  await page.emulateMedia({ media: "screen", colorScheme: "light" });
  await page.goto(BASE + "/#/report/" + (await page.evaluate(() => Store.users("student").find((u) => u.name === "Na").id)));
  await page.waitForTimeout(200);
  const otherKid = await page.evaluate(() => location.hash); // Na không phải con của Mẹ Bin: về trang chính
  const reportOK = rep.count === "5" && rep.subjects.join() === "Toán,Tiếng Anh" && rep.topics > 0 && rep.tips >= 2 && rep.days === 1
    && /Bin/.test(rep.title) && rep.wide <= 390 && printHidden && otherKid === "#/home";
  console.log("report print:", printHidden, "other kid:", otherKid);

  step("pin lock per user survives reload (L2)");
  await page.goto(BASE + "/#/account"); await page.click("#logout"); await page.waitForTimeout(200);
  await page.click(".tile:has-text('Na')");
  for (let i = 0; i < 5; i++) { await page.fill("#pinIn", "0000"); await page.press("#pinIn", "Enter"); await page.waitForTimeout(120); } // tự kiểm tra khi đủ 4 số, Enter ngay sau đó không tính thêm lần sai
  const lockMsg = await page.textContent("#pinErr"), naFails = (await pinLog()).Na.fails;
  await page.reload(); await page.waitForTimeout(300);
  await page.click(".tile:has-text('Na')"); await page.waitForTimeout(100);
  const lockAfter = await page.textContent("#pinErr");
  await page.fill("#pinIn", "3333"); await page.press("#pinIn", "Enter"); await page.waitForTimeout(300); // PIN đúng cũng phải đợi
  const lockedOut = await page.evaluate(() => !Store.sessionUser() && !!document.querySelector("#pinBox"));
  await shot("12d-pin-locked");

  step("bank import as admin");
  await page.click(".tile:has-text('Bố Minh')"); await page.fill("#pinIn", "9999"); await page.press("#pinIn", "Enter"); await page.waitForTimeout(300);
  const wrongMsg = await page.textContent("#pinErr");
  console.log("wrong pin msg:", wrongMsg);
  await page.fill("#pinIn", "1234"); await page.waitForTimeout(400);
  const otherIn = await who();
  const pinLockOK = /Đợi 30 giây/.test(lockMsg) && naFails === 5 && /Đợi (29|30) giây/.test(lockAfter) && lockedOut && /chưa đúng/.test(wrongMsg) && otherIn === "Bố Minh";
  console.log("pin lock:", { lockMsg, naFails, lockAfter, lockedOut, otherIn });
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
  const fresh = (iso) => !!iso && Math.abs(Date.now() - Date.parse(iso)) < 60000;
  const backupOK = /Chưa sao lưu lần nào/.test(bk.first) && /^on-thi-sao-luu-\d{4}-\d\d-\d\d\.json$/.test(bk.file) && bk.gone && fresh(bk.at) && bk.after === ""
    && /Đã 8 ngày chưa sao lưu/.test(bk.d8) && bk.d6 === "" && /Lần sao lưu gần nhất: \d+\/\d+ \d\d:\d\d/.test(bk.dataTab.last) && /Thêm vào MH chính/.test(bk.dataTab.home) && /⋮/.test(bk.dataTab.home)
    && fresh(bk.dataAt) && /Hôm nay/.test(bk.dataLast) && bk.oldDefault === null && /Chưa sao lưu lần nào/.test(bk.old) && remindParent && !remindStudent;

  step("iPhone home screen: restore tip, backup via share sheet (L17)");
  // App mở từ Màn hình chính trên iPhone (navigator.standalone), máy chưa có dữ liệu: màn hình thiết lập có thẻ hướng dẫn khôi phục.
  const tipCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
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
  const shareCtx = await browser.newContext({ storageState: await ctx.storageState(), viewport: { width: 390, height: 844 }, hasTouch: true });
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
  await shareCtx.close();
  console.log("L17:", hs, sh, "tip in browser:", tipInBrowser);
  const homeScreenOK = !tipInBrowser && hs.tip && /Đã dùng OnUp trong Safari/.test(hs.tip.text) && hs.tip.btn && hs.tip.above && /Bố Minh/.test(hs.restored) && /Bin/.test(hs.restored) && hs.results === 5
    && /không dùng chung dữ liệu/.test(sh.home) && /Khôi phục từ file sao lưu/.test(sh.home) && /Android.*không cần chuyển/.test(sh.home)
    && sh.before == null && sh.abort.at == null && sh.abort.card && sh.abortData.at == null && /chưa sao lưu lần nào/.test(sh.abortData.last)
    && sh.double.at == null && sh.double.calls === 3
    && fresh(sh.okData.at) && /Hôm nay/.test(sh.okData.last) && sh.calls.length === 4 && sh.calls.every((n) => /^on-thi-sao-luu-\d{4}-\d\d-\d\d\.json$/.test(n))
    && fresh(sh.ok.at) && !sh.ok.card && /Đã lưu file sao lưu/.test(sh.ok.toast) && sh.ok.calls === 1 && sh.downloads === 0;

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
     đăng nhập): chưa có câu hỏi nào; mở một đề Toán 4 thì có đủ câu của cả năm đề Toán 4 (cùng file). */
  lazy.now = bankList();
  const seedState = () => page.evaluate(() => ({ loaded: Object.keys(window.ONTAP_SEED_QUESTIONS || {}).sort().join(), toan4: Store.banks(4).filter((b) => b.subject === "Toán" && b.seed).map((b) => (b.questions || []).length + "/" + b.n).join() }));
  await page.goto(BASE + "/#/home"); await page.waitForTimeout(200);
  lazy.home2 = await seedState();
  await page.goto(BASE + "/#/quiz/toan4-ck1-de2"); await page.waitForSelector("#qPractice");
  lazy.quiz2 = await seedState();
  console.log("bank files:", lazy);
  const dataErrs = [];
  if (lazy.home !== "index.js" || lazy.quiz !== "4-toan.js,index.js" || lazy.now !== "4-toan.js,6-khtn.js,index.js") dataErrs.push("file đề tải về: " + JSON.stringify(lazy));
  // đề ngẫu nhiên (K3): cùng file, tải xong thì có cả kho câu (3 đề cuối kì I: 75 câu, 2 đề giữa kì II: 50 câu), số câu rút mỗi lần là n
  if (lazy.home2.loaded !== "" || lazy.home2.toan4 !== "0/25,0/25,0/25,0/25,0/25,0/25,0/25" || lazy.quiz2.loaded !== "toan4-ck1-de1,toan4-ck1-de2,toan4-ck1-de3,toan4-gk2-de1,toan4-gk2-de2"
    || lazy.quiz2.toan4 !== "25/25,25/25,25/25,25/25,25/25,75/25,50/25") dataErrs.push("đề đã tải: " + JSON.stringify([lazy.home2, lazy.quiz2]));

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

  step("360px light + dark (L4–L11)");
  /* Ở 360px: không tràn ngang; mọi button, a.btn, .linkbtn, summary (dòng mở/đóng của <details>, L23) đang hiện cao ≥ 44px; không chữ nào nhỏ hơn 13px.
     Phần tử bị ẩn (display:none, nằm trong <details> đang đóng) không tính. Trả về danh sách lỗi. */
  const audit = () => {
    const bad = [], shown = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden"; };
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
    const c = await browser.newContext(Object.assign({ storageState: state }, opts)), fresh = await browser.newContext(opts);
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
    await open("#/"); await p.click(`.tile[data-u="${ids.Bin}"]`); await p.waitForTimeout(300);
    await check("đăng nhập"); await snap("dang-nhap", true);
    r.loginFoot = !(await footShown());
    // bàn phím PIN đang hiện số (U1): gõ 3 số, bấm nút xem
    for (const k of PINS.Bin.slice(0, 3)) await p.click(`.pad button[data-k="${k}"]`);
    await p.click("#pinIn + .reveal-btn");
    r.pinShown = await p.evaluate(() => { const d = document.querySelector("#pinDots"), b = document.querySelector("#pinIn + .reveal-btn").getBoundingClientRect();
      return d.classList.contains("shown") && d.textContent === "123" && document.querySelector("#pinIn").type === "text" && b.width >= 44 && b.height >= 44; });
    await check("bàn phím PIN đang hiện số"); await snap("ban-phim-pin-hien-so", true);
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
    // tiêu đề (X15): line-height tính ra của h1 ≥ 1,3 lần cỡ chữ, để dấu thanh của tiêu đề hai dòng không chạm nhau
    r.h1Line = await p.evaluate(() => { const cs = getComputedStyle(document.querySelector(".hero h1")); return parseFloat(cs.lineHeight) >= 1.3 * parseFloat(cs.fontSize); });
    await p.click("#qPractice"); await check("đề, câu hỏi");
    if (await p.$("#qzFill")) await p.fill("#qzFill", "1"); else await p.click(".opt >> nth=0");
    await p.click("#qzGo"); await check("đề, sau khi trả lời");
    // phụ huynh
    await signIn("Mẹ Bin"); await check("trang chủ phụ huynh");
    await open("#/child/" + ids.Bin); await check("hồ sơ của con");
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
    const c = await browser.newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, colorScheme: scheme });
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
    for (let i = 0; i < 20 && !(await p.$("#qzSelf, .score")); i++) {
      const head = (await p.textContent(".qcard .qtext")).trim(), q = Q.find((x) => head.startsWith(x.q.slice(0, 12)));
      if (q.type === "essay") await p.click("#qzGo");
      else if (q.type === "tf4" && q.svg) { for (let k = 0; k < 4; k++) await p.click(`.tf4 .opt[data-i="${k}"][data-v="${q.a[k] ? 1 : 0}"]`); await p.click("#qzGo"); }
      else await p.click("#qzSkip");
    }
    await p.waitForSelector("#qzSelfSave");
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
  // 1/4/2027: cuối kì I, giữa kì II đã qua nên đề lớp 4 dồn vào "Bài ôn khác"; kì cuối năm chỉ gắn Đề 2, Đề 3 Toán cuối kì I;
  // thêm một đề tên tự đặt dài (nút xuống dòng, không tràn ngang ở 360px).
  const lc = await browser.newContext({ storageState: state, viewport: { width: 360, height: 740 } });
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
  const labelsOK = l18.today === "1/4/2027" && ["Cuối kì I · Đề 1", "Giữa kì II · Đề 1", "Giữa kì II · Đề 2", "Đề ôn tập tổng hợp cuối năm của cô Lan cho cả lớp 4A"].every((x) => l18.toan.includes(x))
    && l18.toan.slice(0, 2).join() === "Cuối kì I · Đề ngẫu nhiên,Giữa kì II · Đề ngẫu nhiên" // đề ngẫu nhiên (K3) đứng trước, ghi kì khi nhiều kì
    && !l18.toan.some((x) => /^Đề \d+$/.test(x)) && l18.tv.includes("Cuối kì I · Đề 2") && l18.tv.includes("Giữa kì II · Đề 1") && l18.ck2.join() === "Đề 2,Đề 3"
    && l18.aria.includes("Toán 4 · Giữa kì II · Đề 1") && l18.aria.includes("Toán 4 · Cuối kì I · Đề 3") && l18.wide <= 360 && l18.fits;

  step("after K3 review (9e): L22, L24, L25, L26");
  /* Ngày giả lập 21/12/2026: kì cuối kì I lớp 6 bắt đầu, giữa kì I lớp 6 đã qua; cuối kì I lớp 4 còn một tuần. Kì ck1-l4 gắn
     lại đủ đề như lịch mặc định (bước "new seed banks" đã bỏ gắn một đề).
     L22: học sinh lớp 4, hàng "Tin học và Công nghệ" của kì cuối kì I có nút "Đề 1" (tên đề trong danh mục có số đề).
     L24: học sinh lớp 6, hàng Tiếng Anh của nhóm "Bài ôn khác" (đề giữa kì I đã qua) ghi "Giữa kì I · Đề 1"; nhóm cuối kì I
     vẫn ghi "Đề 1"; aria-label vẫn là tên đề đầy đủ; đề thử nghiệm (tên tự đặt) ghi nguyên tên.
     L25: kì cuối kì I lớp 4 (1 bài IOE, 9 đề cố định, 2 đề ngẫu nhiên) ghi "10 bài ôn" ở thẻ kì thi trên trang chủ, đầu nhóm
     bài ôn và trang Lịch thi; nút "Đề ôn · 9 đề" như cũ.
     L26: tên đề ở màn mở đề toan6-ck1-ngau-nhien (h1 và dòng nhãn), nhãn trên thẻ câu hỏi, tên kì thi trên thẻ kì thi và đầu nhóm
     có khoảng trắng không ngắt (U+00A0) trước mỗi dấu "·"; aria-label của nút đề vẫn là khoảng trắng thường. */
  const nc = await browser.newContext({ storageState: state, viewport: { width: 360, height: 740 } });
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
  const fix9eOK = f9e.l4.today === "21/12/2026" && f9e.l4.tincn.join() === "Đề 1"
    && /\|10 bài ôn\|/.test("|" + f9e.l4.homeTags + "|") && / · 10 bài ôn$/.test(f9e.l4.grpHead) && /\|10 bài ôn\|/.test("|" + f9e.l4.calTags + "|") && f9e.l4.hero === "Tất cả bài ôn cho kì này · 10 bài ôn →"
    && f9e.l6.taOther.join() === "Giữa kì I · Đề 1" && f9e.l6.taCk1.join() === "Đề 1" && f9e.l6.thu.join() === "Đề thử nghiệm · Các dạng câu mới"
    && f9e.l6.aria.includes("Tiếng Anh 6 · Giữa kì I · Đề 1") && !f9e.l6.aria.some((x) => /·.*·.*·/.test(x))
    && Object.values(f9e.nb).every((s) => /·/.test(s) && !/[^\u00a0]·/.test(s)) && f9e.nb.h1 === "Toán 6\u00a0· Cuối kì I\u00a0· Đề ngẫu nhiên";

  step("random exam by matrix (K3)");
  /* Đề ngẫu nhiên (mục có pool trong data/banks/index.js): hàng Toán của kì cuối kì I lớp 6 có nút "Đề ngẫu nhiên" trước
     Đề 1, Đề 2. Na (chưa có kết quả) làm xong Đề 1 (đúng hết), rồi mở đề ngẫu nhiên: màn đầu nói rõ 25 câu rút từ kho 50 câu
     (2 đề); kho gộp từ hai đề, mỗi câu ghi src, đề cố định không bị sửa; bộ rút đúng ma trận; vì đã làm Đề 1 nên bộ rút lấy
     câu của Đề 2 trước (chỉ 2 câu của Đề 1, ở hai chủ đề Đề 2 không đủ). Làm ôn luyện: câu đầu sai, còn lại đúng → kết quả
     ghi refId là mã pool, môn Toán, 24/25, chủ đề sai; lịch sử câu (ontap_pool_v1) ghi 25 câu, câu sai đánh dấu. "Làm đề
     khác": bộ mới có câu vừa sai (hay sai) và hai câu Đề 2 chưa làm, không giống bộ cũ. Trang chủ: "Chủ đề hay sai", kết quả
     gần đây; báo cáo tuần tính đề ngẫu nhiên như đề thường; tab Ngân hàng đề ghi "rút ngẫu nhiên". Kho thiếu câu (pool giả
     thêm vào danh mục lúc chạy): màn đầu ghi chú lấy bù. Mỗi màn hình kiểm tra 360px. */
  const kc = await browser.newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2 });
  await localConfig(kc); watchOut(kc);
  const kp = await kc.newPage(); kp.on("pageerror", (e) => errs.push("pageerror K3: " + e.message)); kp.on("console", (m) => { if (m.type() === "error") errs.push("console K3: " + m.text()); });
  const k3 = { problems: [] }, POOL = "toan6-ck1-ngau-nhien", DE1 = "toan6-ck1-de1";
  const kcheck = async (label) => (await kp.evaluate(audit)).forEach((x) => k3.problems.push(`K3 · ${label}: ${x}`));
  const ksnap = async (n) => { await kp.evaluate(() => { scrollTo(0, 0); const t = document.querySelector("#toast"); if (t) t.hidden = true; }); await kp.screenshot({ path: `${OUT}19-${n}.png`, fullPage: true }); };
  // câu đang hiện trên màn hình → câu trong kho (so chữ câu hỏi, bỏ chỗ trống và khoảng trắng); trả lời đúng hoặc sai rồi bấm Kiểm tra
  const flatQ = (x) => String(x).replace(/___/g, "").replace(/\s+/g, "");
  const current = async (qs) => { const t = await kp.$eval(".qcard .qtext", (e) => e.textContent); return qs.find((q) => flatQ(q.q) === flatQ(t)) || null; };
  const answer = async (q, right) => {
    if (q.type === "fill") await kp.fill("#qzFill", right ? q.ans[0] : "không đúng");
    else { const want = q.type === "tf" ? (q.a === right ? "Đúng" : "Sai") : right ? q.o[0] : q.o[1]; await kp.$$eval(".opts .opt", (bs, w) => bs.find((b) => b.lastElementChild.textContent === w).click(), want); }
    await kp.click("#qzGo");
  };
  // làm hết một lượt ôn luyện: wrongAt = số thứ tự câu trả lời sai (−1: đúng hết); snap: chụp màn hình sau câu đầu; trả về các câu đã gặp
  const playAll = async (qs, wrongAt, snap) => {
    const seen = [];
    for (let i = 0; i < 40 && !(await kp.$(".score")); i++) {
      const q = await current(qs);
      if (!q) { k3.problems.push("K3: không nhận ra câu " + (await kp.textContent(".qcard .qtext")).slice(0, 50)); break; }
      seen.push(q); await answer(q, i !== wrongAt);
      if (i === 0 && snap) { await kcheck("đề ngẫu nhiên, sau khi trả lời"); await ksnap(snap); }
      await kp.click("#qzGo");
    }
    await kp.waitForSelector(".score"); return seen;
  };
  await kp.goto(BASE + "/"); await kp.click(`.tile[data-u="${ids.Na}"]`); await kp.fill("#pinIn", "4444"); await kp.waitForSelector("#today");
  k3.hero = (await kp.textContent("#toBanks")).replace(/\s+/g, " "); // trang "Hôm nay" (UX1): link tới nhóm bài ôn của kì gần nhất (giữa kì I lớp 6: 2 bài ôn, 5 đề)
  await kp.goto(BASE + "/#/practice"); await kp.waitForSelector("#allPractice");
  k3.row = await kp.evaluate((id) => {
    const g = document.querySelector('#allPractice details.grp[data-grp="ck1-l6"]'), row = [...g.querySelectorAll(".subj")].find((x) => x.querySelector("b").textContent === "Toán"), a = [...row.querySelectorAll(".des a")];
    return { labels: a.map((x) => x.textContent).join(), first: a[0].getAttribute("href") === "#/quiz/" + id && a[0].classList.contains("rnd"), aria: a[0].getAttribute("aria-label"), info: row.querySelector(".small").textContent };
  }, POOL);
  await kcheck("tab Bài ôn có nút Đề ngẫu nhiên");
  // Đề 1: làm đúng hết
  await kp.goto(BASE + "/#/quiz/" + DE1); await kp.waitForSelector("#qPractice");
  const QS = await kp.evaluate((id) => Store.bank(id).questions, DE1);
  await kp.click("#qPractice"); await playAll(QS, -1);
  k3.de1 = await kp.evaluate((id) => { const r = Store.resultsFor(Store.sessionUser().id); return r.length === 1 && r[0].refId === id && r[0].r === 25 && r[0].t === 25; }, DE1);
  // đề ngẫu nhiên: màn đầu, kho câu, ma trận
  await kp.goto(BASE + "/#/quiz/" + POOL); await kp.waitForSelector("#qPractice");
  k3.intro = (await kp.textContent(".hero")).replace(/\s+/g, " ");
  k3.noNotes = !(await kp.$("#qNotes"));
  await kcheck("đề ngẫu nhiên, màn đầu"); await ksnap("de-ngau-nhien");
  k3.kho = await kp.evaluate(({ POOL, DE1 }) => {
    const b = Store.bank(POOL), d = Quiz.draw(b), cnt = {}; d.questions.forEach((q) => (cnt[q.topic] = (cnt[q.topic] || 0) + 1));
    const keys = d.questions.map(Quiz.key);
    return { n: d.questions.length, kho: b.questions.length, srcs: [...new Set(b.questions.map((q) => q.src))].join(), matrix: JSON.stringify(cnt) === JSON.stringify(b.pool.matrix),
      uniq: new Set(keys).size === keys.length, notes: d.notes.length, fixedN: Store.bank(DE1).questions.length, fixedClean: !("src" in Store.bank(DE1).questions[0]), label: document.querySelector(".hero .label").textContent.replace(/\s+/g, " ") };
  }, { POOL, DE1 });
  const PQ = await kp.evaluate((id) => Store.bank(id).questions, POOL);
  // lượt 1: câu đầu sai, còn lại đúng
  await kp.click("#qPractice");
  const run1 = await playAll(PQ, 0, "de-ngau-nhien-cau-sai");
  const wrongQ = run1[0];
  k3.run1 = { n: run1.length, de1: run1.filter((q) => q.src === DE1).length, score: (await kp.textContent(".score")).trim(), again: (await kp.textContent("#qzAgain")).trim() };
  await kcheck("kết quả đề ngẫu nhiên");
  k3.saved = await kp.evaluate(({ POOL, key }) => {
    const u = Store.sessionUser(), r = Store.resultsFor(u.id)[0], h = JSON.parse(localStorage.getItem("ontap_pool_v1"))[u.id + "|" + POOL] || {};
    return { refId: r.refId, subject: r.subject, label: r.label, r: r.r, t: r.t, wrong: (r.wrongTopics || []).length, histN: Object.keys(h).length, histWrong: JSON.stringify(h[key]), histRight: Object.values(h).filter((x) => x[0] === 1 && x[1] === 0).length };
  }, { POOL, key: await kp.evaluate((q) => Quiz.key(q), wrongQ) });
  // lượt 2 ("Làm đề khác"): bộ mới
  await kp.click("#qzAgain"); await kp.waitForSelector(".qcard");
  const seen2 = [];
  for (let i = 0; i < 25; i++) { const q = await current(PQ); if (!q) break; seen2.push(q); if (i < 24) { await kp.click("#qzSkip"); } }
  const leftover = PQ.filter((q) => q.src !== DE1 && !run1.includes(q)); // câu Đề 2 chưa làm ở lượt 1
  // Câu chưa làm chỉ bị bỏ khi cùng ô ma trận (chủ đề, mức) với câu vừa sai mà ô chỉ lấy 1 câu: câu sai (hay sai) được ưu tiên hơn.
  const sameCell = (a, b) => a.topic === b.topic && (a.lv || 0) === (b.lv || 0);
  k3.run2 = { n: seen2.length, hasWrong: seen2.includes(wrongQ), leftovers: leftover.length + "/" + leftover.filter((q) => seen2.includes(q)).length, differs: seen2.some((q) => !run1.includes(q)),
    missOK: leftover.filter((q) => !seen2.includes(q)).every((q) => sameCell(q, wrongQ)) };
  await kp.click("#qzExit"); k3.exitAsk = (await kp.textContent("#qzFb")).replace(/\s+/g, " "); // bỏ qua hết: chưa trả lời câu nào
  await kp.click("#qzYes"); await kp.waitForTimeout(300);
  k3.home = await kp.evaluate(() => ({ hash: location.hash, recent: document.querySelector("#recent").textContent.replace(/\s+/g, " "), n: Store.resultsFor(Store.sessionUser().id).length }));
  await kp.goto(BASE + "/#/results"); await kp.waitForSelector("#allResults"); // chủ đề hay sai ở tab Kết quả (UX1)
  k3.home.weak = await kp.evaluate(() => [...document.querySelectorAll("#weakTopics .tag.warn")].map((t) => t.textContent).join("|"));
  // kho thiếu câu: pool giả (3 câu "Hình phẳng" mức Vận dụng, kho chỉ có 2 câu chưa ghi mức) → màn đầu ghi chú lấy bù
  k3.short = await kp.evaluate((POOL) => {
    const b = Store.bank(POOL);
    window.ONTAP_SEED_BANKS.push({ id: "thu-pool", title: "Toán 6 · Thử · Đề ngẫu nhiên", grade: 6, subject: "Toán", minutes: 10, n: 3, file: "6-toan.js", pool: { matrix: { "Hình phẳng": [0, 0, 3] } }, note: "", questions: b.questions });
    return true;
  }, POOL);
  await kp.goto(BASE + "/#/quiz/thu-pool"); await kp.waitForSelector("#qPractice");
  k3.notes = (await kp.textContent("#qNotes").catch(() => "")).replace(/\s+/g, " ");
  await kcheck("đề ngẫu nhiên, kho thiếu câu"); await ksnap("de-ngau-nhien-thieu-cau");
  await kp.click("#qPractice"); k3.shortN = await kp.$eval(".chip:last-child", (c) => c.textContent);
  await kp.evaluate(() => window.ONTAP_SEED_BANKS.pop());
  // phụ huynh (quản trị): báo cáo tuần của Na, tab Ngân hàng đề
  await kp.goto(BASE + "/#/account"); await kp.click("#switchWho, #logout"); await kp.waitForTimeout(200);
  await kp.click(`.tile[data-u="${ids["Bố Minh"]}"]`); await kp.fill("#pinIn", PINS["Bố Minh"]); await kp.waitForTimeout(400);
  await kp.goto(BASE + "/#/report/" + ids.Na); await kp.waitForSelector(".report");
  k3.report = await kp.evaluate(() => ({ n: document.querySelector("#rpCount").textContent, subj: [...document.querySelectorAll("#rpSubjects .rp-sub")].map((x) => [...x.querySelectorAll(".row > b")].map((b) => b.textContent).join(" ") + " " + x.lastElementChild.textContent).join("|"),
    topics: document.querySelectorAll("#rpTopics .item").length, week: [...document.querySelectorAll(".sec")].find((x) => /Bài đã làm trong tuần/.test(x.textContent)).textContent.replace(/\s+/g, " ") }));
  await kcheck("báo cáo tuần có đề ngẫu nhiên");
  await kp.goto(BASE + "/#/admin/banks"); await kp.waitForTimeout(200);
  k3.adminRow = await kp.$eval(`a[href="#/quiz/${POOL}"] .small`, (x) => x.textContent);
  await kcheck("ngân hàng đề có đề ngẫu nhiên");
  await kc.close();
  console.log("K3:", k3);
  const k3OK = !k3.problems.length && k3.row.labels === "Đề ngẫu nhiên,Đề 1,Đề 2" && k3.row.first && k3.row.aria === "Toán 6 · Cuối kì I · Đề ngẫu nhiên" && k3.row.info === "2 đề · 25 câu mỗi đề · đề ngẫu nhiên 25 câu" && k3.hero === "Tất cả bài ôn cho kì này · 7 bài ôn →"
    && k3.de1 && /Mỗi lần làm là một đề khác: 25 câu rút từ kho 50 câu \(2 đề\) theo ma trận đề, ưu tiên câu bạn chưa làm hoặc hay sai\./.test(k3.intro) && k3.noNotes
    && k3.kho.n === 25 && k3.kho.kho === 50 && k3.kho.srcs === "toan6-ck1-de1,toan6-ck1-de2" && k3.kho.matrix && k3.kho.uniq && k3.kho.notes === 0 && k3.kho.fixedN === 25 && k3.kho.fixedClean && k3.kho.label === "Lớp 6 · Toán · Đề ngẫu nhiên"
    && k3.run1.n === 25 && k3.run1.de1 === 2 && k3.run1.score === "9,5/10" && k3.run1.again === "Làm đề khác"
    && k3.saved.refId === POOL && k3.saved.subject === "Toán" && k3.saved.label === "Toán 6 · Cuối kì I · Đề ngẫu nhiên" && k3.saved.r === 24 && k3.saved.t === 25 && k3.saved.wrong === 1
    && k3.saved.histN === 25 && k3.saved.histWrong === "[1,1]" && k3.saved.histRight === 24
    && k3.run2.n === 25 && k3.run2.hasWrong && /^2\/[12]$/.test(k3.run2.leftovers) && k3.run2.missOK && k3.run2.differs && /Thoát đề\?/.test(k3.exitAsk)
    && k3.home.hash === "#/home" && k3.home.weak === wrongQ.topic + " · 1 câu" && /Toán 6 · Cuối kì I · Đề ngẫu nhiên/.test(k3.home.recent) && /24\/25/.test(k3.home.recent) && k3.home.n === 2
    && k3.short && k3.notes === "Kho còn thiếu câu, lần này: Hình phẳng: thiếu 2 câu mức Vận dụng, lấy bù câu chưa ghi mức; Hình phẳng: thiếu 1 câu, lấy từ chủ đề khác." && k3.shortN === "1 / 3"
    && k3.report.n === "2" && k3.report.subj === "Toán 9,75/10 2 bài · 49/50 câu đúng" && k3.report.topics === 1 && /Đề ngẫu nhiên/.test(k3.report.week)
    && k3.adminRow === "Lớp 6 · Toán · 25 câu rút ngẫu nhiên · có sẵn (chỉ xem)";

  step("report wrong question (R1)");
  /* Nút "Báo câu này sai" (js/quiz.js, opts.onReport). Bin ôn luyện Toán 4 Đề 1: làm như thi không có link trong lúc làm; ôn luyện
     thì sau khi Kiểm tra, dưới lời giải có link nhỏ (≥ 44px) có lá cờ; bấm mở hộp lí do ngay bên dưới (không phải hộp nổi), chưa chọn
     lí do thì báo, "Thôi" đóng hộp; gửi xong hiện cảm ơn, link thành "Đã báo câu này". Báo cáo lưu trong Store (userId, mã đề, mã
     câu = Quiz.key, bản chụp nội dung câu ≤ 500 kí tự, lí do, ghi chú cắt 200). Màn kết quả: mỗi câu cần xem lại có link, câu đã báo
     thì link tắt. opts.reported (đã báo từ trước) và onReport bị từ chối (hiện lỗi, bấm lại được) thử bằng Quiz.run trực tiếp.
     Dữ liệu cũ chưa có trường reports: đọc vào là []. Quản trị → Dữ liệu: danh sách và nút "Chép để gửi" (văn bản dán Zalo).
     Phụ huynh xem thử cũng báo được. Mỗi màn hình kiểm tra 360px, ảnh 20-*.png. */
  const rc = await browser.newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2 });
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
  await rp.click("#qzExit"); await rp.click("#qzYes"); await rp.waitForTimeout(300); // chưa làm câu nào: thoát
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
    const c = await browser.newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, colorScheme: scheme });
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
     "← Exit"; chưa trả lời, đã trả lời, làm như thi), link và hộp "Report a problem", thông báo lưu điểm lấy từ bảng chữ TXT của
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
    const c = await browser.newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, colorScheme: scheme });
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
      r.open = (await txt(".hero h1")) === title && (await txt(".hero .label")) === label && (await txt("#qPractice")) === "Practice (see the answer after each question)" && (await txt("#qExam")) === `Test mode · ${minutes} minutes`
        && (await txt("#view .linkbtn")) === "← Home" && (await p.$eval("#view > .stack", (e) => e.getAttribute("lang"))) === "en" && /25 questions\./.test(open);
      if (!snapped("mo-de")) await snap("mo-de");
      // làm như thi, rời khi chưa trả lời: nút Back hỏi "Exit the test?"; "← Exit" hỏi ngay trong trang
      await p.click("#qExam"); await p.evaluate(() => history.back()); await p.waitForSelector("#leaveBox");
      await check("hộp rời trang, chưa trả lời"); r.leave0 = (await txt("#leaveBox")) === "Exit the test?You haven't answered any questions, so no score is saved. ExitKeep going";
      if (!snapped("roi-trang-chua-lam")) await snap("roi-trang-chua-lam");
      await p.click("#leaveNo"); await p.click("#qzExit");
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
      r.retryN = (await txt(".chip:last-child")) === "1 / 2";
      if (await p.$("#qzFill")) await p.fill("#qzFill", "zzz"); else await p.click(".opt >> nth=0");
      await p.click("#qzGo"); await check("ôn lại câu sai"); if (!snapped("on-lai-cau-sai")) await snap("on-lai-cau-sai");
      await p.click("#qzExit"); r.retryExit = (await txt("#qzFb .confirm")) === "Stop reviewing your mistakes? This round is not scored.StopKeep going";
      await p.click("#qzYes"); await p.waitForSelector(".score");
      const rr = await check("kết quả ôn lại câu sai");
      r.retryResult = (await txt("#view .panel .label")) === `${title} · Reviewing mistakes` && /Reviewing your mistakes is not scored\./.test(rr) && (await txt("#qzAgain")) === "Try the whole test again"
        && (await p.evaluate(() => Store.resultsFor(Store.sessionUser().id).length)) === nSaved;
      if (!snapped("ket-qua-on-lai")) await snap("ket-qua-on-lai", true);
      // làm như thi: 2 câu rồi nộp sớm bằng "← Exit"; nút Back hỏi "Finish the test and leave?"
      await p.goto(BASE + "/#/home"); await p.goto(BASE + "/#/quiz/" + id); await p.waitForSelector("#qExam"); await p.click("#qExam");
      for (let k = 0; k < 2; k++) { if (await p.$("#qzFill")) await p.fill("#qzFill", "x"); else await p.click(".opt >> nth=0"); r.examBtn = (await txt("#qzGo")) === "Answer" && (await txt("#qzSkip")) === "Skip"; await p.click("#qzGo"); }
      await p.evaluate(() => history.back()); await p.waitForSelector("#leaveBox");
      await check("hộp rời trang, làm như thi"); r.leaveExam = (await txt("#leaveBox")) === "Finish the test and leave?Unanswered questions count as wrong. Finish testKeep going";
      await p.click("#leaveNo"); await p.click("#qzExit");
      r.exitExam = (await txt("#qzFb .confirm")) === "Finish test now? Unanswered questions count as wrong.Finish testKeep going";
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
    ta2["parent-" + scheme] = { notice: await txt(".notice"), lang: await p.$eval(".notice", (e) => e.getAttribute("lang")), h1: await txt(".hero h1"), btn: await txt("#qPractice") };
    (await p.evaluate(audit)).forEach((x) => ta2.problems.push(`TA2 · ${scheme} · xem thử: ${x}`));
    if (!snapped("xem-thu")) await snap("xem-thu");
    // đề Toán 4 vẫn tiếng Việt, không có lang="en"
    await p.goto(BASE + "/#/quiz/toan4-ck1-de1"); await p.waitForSelector("#qPractice");
    ta2["toan-" + scheme] = { h1: await txt(".hero h1"), btn: await txt("#qPractice"), lang: await p.$eval("#view > .stack", (e) => e.getAttribute("lang")) };
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
    && ta2.runs.every((r) => r.open && r.leave0 && r.exit0 && r.exit0Home && r.n === 25 && r.wrongN === 2 && r.mcWrong && r.fillWrong && r.rightFb && r.rpBox && r.rpNeed && r.rpDone && r.leave1 && r.exit1 && r.stay && r.result && r.saved && r.retryN && r.retryExit && r.retryResult && r.examBtn && r.leaveExam && r.exitExam && r.examResult)
    && ["light", "dark"].every((sc) => { const io = ta2["ioe-" + sc], pa = ta2["parent-" + sc], to = ta2["toan-" + sc];
      return io.note === "Score saved" && io.back === "← Home" && io.lang === "en" && io.title === "Your score is saved to your profile each time you finish." && io.leave === "Leave this practice?Your unfinished work won't be saved. LeaveStay" && io.toast === "Result saved: 24/30 correct" && io.left === "#/home"
        && pa.notice === "Chế độ xem thử: điểm không được lưu." && pa.lang === "vi" && pa.h1 === "English 4 · End-of-term 1 · Test 1" && pa.btn === "Practice (see the answer after each question)"
        && to.h1 === "Toán 4 · Cuối kì I · Đề 1" && to.btn === "Ôn luyện (xem đáp án từng câu)" && to.lang === null; })
    && TA2_SHOTS.every((n) => ta2.shots.includes(`ta2-${n}-light`) && ta2.shots.includes(`ta2-${n}-dark`));

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
     quản trị giữ bố cục cũ với nhãn mới, không có thanh tab. Ảnh 360px sáng/tối ở tests/screenshots/ux1/ (bản ghép <tên>.jpg). */
  const OUTUX = OUT + "ux1/"; fs.mkdirSync(OUTUX, { recursive: true });
  const ux1 = { problems: [], shots: [] };
  for (const scheme of ["light", "dark"]) {
    const c = await browser.newContext({ storageState: state, viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, colorScheme: scheme });
    await localConfig(c); watchOut(c);
    const p = await c.newPage(); p.on("pageerror", (e) => errs.push("pageerror UX1: " + e.message)); p.on("console", (m) => { if (m.type() === "error") errs.push("console UX1: " + m.text()); });
    const r = (ux1[scheme] = {});
    const ucheck = async (label) => (await p.evaluate(audit)).forEach((x) => ux1.problems.push(`UX1 · ${scheme} · ${label}: ${x}`));
    const usnap = async (n) => { await p.evaluate(() => { scrollTo(0, 0); const t = document.querySelector("#toast"); if (t) t.hidden = true; }); await pinTabs(p, true); await p.screenshot({ path: `${OUTUX}${n}-${scheme}.png`, fullPage: true }); await pinTabs(p, false); ux1.shots.push(`${n}-${scheme}`); };
    const txt = (sel) => p.evaluate((s) => { const e = document.querySelector(s); return e ? e.textContent.replace(/\s+/g, " ").trim() : ""; }, sel);
    const tabbar = () => p.evaluate(() => ({ tabs: [...document.querySelectorAll("#tabbar a")].map((a) => a.textContent + (a.getAttribute("aria-current") ? "*" : "")).join(), tabbed: document.body.classList.contains("tabbed"), cal: !!document.querySelector(".who a[href='#/calendar']") }));
    await p.clock.install({ time: new Date("2026-10-21T08:00:00") });
    await p.goto(BASE + "/");
    await p.evaluate(() => {
      const d = JSON.parse(localStorage.getItem("ontap_db_v1")), bin = d.users.find((u) => u.name === "Bin");
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
    const answerQ = async (q, right) => {
      if (q.type === "fill") await p.fill("#qzFill", right ? q.ans[0] : "zzz");
      else { const w = q.type === "tf" ? (q.a === right ? "Đúng" : "Sai") : right ? q.o[0] : q.o[1]; await p.$$eval(".opts .opt", (bs, w) => bs.find((b) => b.lastElementChild.textContent === w).click(), w); }
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
    r.retry = { chip: await txt(".chip:last-child") };
    await answerQ(await curQ(), true); await p.click("#qzGo");
    await p.evaluate(() => history.back()); await p.waitForSelector("#leaveBox");
    r.retry.leave = await txt("#leaveBox"); await p.click("#leaveNo"); await p.waitForTimeout(100);
    await p.click("#qzGo"); await answerQ(await curQ(), true); await p.click("#qzGo"); await p.click("#qzGo"); await p.waitForSelector(".score");
    r.retry.result = await txt("#qzScore"); r.retry.btns = (await txt("#qzRetry")) + "|" + (await txt("#qzAgain"));
    r.retry.saved = (await p.evaluate(() => Store.resultsFor(Store.sessionUser().id).length)) - nSaved0; // chỉ lượt đầy đủ được lưu
    await ucheck("kết quả ôn lại câu sai"); await usnap("ket-qua-on-lai");
    await p.click("#qzAgain"); await p.waitForSelector(".qcard"); r.retry.full = (await txt(".chip:last-child")) + " " + (await txt("#qzExit"));
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
    await p.goto(BASE + "/#/child/" + ids.Bin); await p.waitForSelector("#allPractice");
    r.child = await p.evaluate(() => ({ stat: document.querySelector(".stats .stat:nth-child(2) span").textContent, ready: (document.querySelector(".ev .ready") || {}).textContent || "", streak: !!document.querySelector("#streak"), recent: document.querySelectorAll("#recent .item").length, hero: document.querySelector(".hero").textContent.replace(/\s+/g, " ") }));
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
      && r.retry.chip === "1 / 2" && r.retry.leave === "Dừng ôn lại và rời trang?Lượt ôn lại câu sai không lưu điểm. DừngÔn tiếp" && /^Toán 4 · Cuối kì I · Đề 1 · Ôn lại câu sai Xuất sắc, Bin! 10\/10 2\/2 câu đúng.*Lượt ôn lại câu sai không lưu điểm\.$/.test(r.retry.result)
      && r.retry.btns === "|Làm lại cả đề" && r.retry.saved === 1 && r.retry.full === "1 / 25 ← Thoát"
      && r.numeric === "decimal,null" && r.tabAdmin.tabs === "" && r.tabAdmin.cal
      && !r.avatar.used.includes(r.avatar.student) && !r.avatar.used.includes(r.avatar.parent) && r.avatar.student === "🐼" && r.avatar.parent === "🐼" // 🐣 (Bin), 🦊 (Na, form đã chọn sẵn), 🌻, 🧭 đã có người dùng
      && r.child.stat === "Điểm trung bình tháng" && r.child.ready === "Đã làm đúng 90% bài ôn của kì này" && r.child.streak && r.child.recent === 4 && /Đã làm đúng 90% bài ôn của kì này trong 4 tuần qua \(1 lần làm\)/.test(r.child.hero); });

  step("offline (L13)");
  /* sw.js đệm đủ file của app: so danh sách FILES với các file trong repo (thiếu thì mất mạng là hỏng, thừa thì không cài được).
     Đề có sẵn: chỉ danh mục data/banks/index.js nằm trong FILES; file câu hỏi vào đệm khi mở đề. */
  const sw = new Function("self", fs.readFileSync(ROOT + "sw.js", "utf8") + "\nreturn { VERSION, FILES };")({ addEventListener() {} });
  const ls = (dir, re) => fs.readdirSync(ROOT + dir).filter((n) => re.test(n)).map((n) => dir + n);
  const want = ["./", "manifest.webmanifest"].concat(ls("css/", /\.css$/), ls("js/", /\.js$/), ls("data/", /\.js$/), ["data/banks/index.js"], ls("fonts/", /\.(css|woff2)$/), ls("icons/", /./),
    fs.readdirSync(ROOT + "modules").map((m) => `modules/${m}/index.html`));
  const swList = { missing: want.filter((f) => !sw.FILES.includes(f)), extra: sw.FILES.filter((f) => !want.includes(f)) };
  // Tải trang một lần (service worker cài và đệm), rồi mất mạng: tải lại vẫn vào được, đăng nhập, mở bài ôn và đề ngân hàng.
  const off = await browser.newContext({ storageState: state, viewport: { width: 390, height: 844 } });
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
  console.log("offline:", ol, "sw list:", swList, "sw version:", sw.VERSION, "cache:", cache.names, cache.urls.length, "new version:", bump, "sw requests:", swSeen.length, "leaked:", leaked);
  const offlineOK = !swList.missing.length && !swList.extra.length && cache.names.join() === sw.VERSION && cache.urls.length === sw.FILES.length && cache.urls.every((u) => u.startsWith(BASE + "/"))
    && bump.keys === sw.VERSION && bump.n === sw.FILES.length + 2 && bump.tv === "/* ban-cu */" && bump.toan && bump.index !== "/* ban-cu */" && bump.cu === null
    && swSeen.length > 0 && !leaked.length && ol.login && ol.fonts === "Baloo 2,Be Vietnam Pro" && ol.who === "Bin" && /Global Success 4/.test(ol.play) && ol.quiz && ol.keptTv && ol.notOpened && ol.other;

  step("service worker: one set of files per page load (L19)");
  /* Service worker đã cài. Mọi file của app chậm 6 giây: trang vẫn hiện trước 6 giây (cả bộ lấy từ đệm), không lỗi JS,
     và trang HTML đến muộn không ghi vào đệm. Rồi chỉ js/app.js chậm 6 giây, js/store.js có bản mới: không được chạy
     app.js cũ cùng store.js mới. Route của context áp dụng cho request do service worker gửi (cờ ở đầu file). */
  const sc = await browser.newContext({ storageState: state, viewport: { width: 390, height: 844 } });
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
    migOK, reportOK, modGuardOK, examGuardOK, pinLockOK, routeOK, pinAutoOK, ok360, gradesOK, noAnswerOK, homeScreenOK, labelsOK, swOK, adminLocal, k2OK, k3OK, r1OK, ta1OK, ta2OK, modViOK, fix9eOK, ux1OK };
  const failed = Object.keys(flags).filter((k) => !flags[k]);
  if (failed.length) { console.error("E2E FAILED:", failed.join(", ")); process.exitCode = 1; } else console.log("E2E OK");
  await browser.close();
})();
