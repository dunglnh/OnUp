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
  const modGuardOK = modIdle.hash === "#/home" && !modIdle.box && /Rời bài ôn/.test(modAsk) && modStay === "#/play/ioe-4"
    && modConfirm.box && modConfirm.hash === "#/play/ioe-4" && modLeft.hash === "#/home" && !modLeft.box;
  step("open module l4");
  await page.goto(BASE + "/#/play/l4-giua-ki-1"); await page.waitForTimeout(1200);
  const f2 = page.frames().find(f => /modules\/l4-giua-ki-1/.test(f.url()));
  await f2.evaluate(() => ontapReport({ label: "Toán · Đề 1", mode: "exam", subject: "toan", r: 18, t: 20, s: 1500 }));
  await page.waitForTimeout(200);

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

  step("open bank from home");
  await page.goto(BASE + "/#/home"); await page.waitForTimeout(200);
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
  const noAnswerOK = /Thoát đề\?/.test(ex0.ask) && /chưa làm câu nào/.test(ex0.ask) && ex0.back.hash === "#/home" && ex0.back.n === nBefore
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
  await page.click(".who a[href='#/calendar']"); await page.waitForTimeout(150); // link trên thanh đầu cũng phải hỏi
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
  /* Ở 360px: không tràn ngang; mọi button, a.btn, .linkbtn đang hiện cao ≥ 44px; không chữ nào nhỏ hơn 13px.
     Phần tử bị ẩn (display:none, nằm trong <details> đang đóng) không tính. Trả về danh sách lỗi. */
  const audit = () => {
    const bad = [], shown = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden"; };
    if (document.documentElement.scrollWidth > innerWidth) bad.push("tràn ngang: rộng " + document.documentElement.scrollWidth + "px");
    document.querySelectorAll("button, a.btn, .linkbtn").forEach((el) => { const h = el.getBoundingClientRect().height; if (shown(el) && h < 44) bad.push(`nút "${el.textContent.trim().slice(0, 24)}" cao ${Math.round(h)}px`); });
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n; (n = tw.nextNode());) {
      const el = n.parentElement, fs = parseFloat(getComputedStyle(el).fontSize);
      if (n.textContent.trim() && shown(el) && fs < 13) bad.push(`chữ "${n.textContent.trim().slice(0, 24)}" ${fs}px`);
    }
    return [...new Set(bad)];
  };
  const OUT360 = OUT + "360/"; require("fs").mkdirSync(OUT360, { recursive: true });
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
    const snap = async (n, full) => { if (full) await p.evaluate(() => scrollTo(0, 0)); await p.screenshot({ path: `${OUT360}${n}-${scheme}.png`, fullPage: !!full }); }; // thanh đầu dính: chụp cả trang từ đầu trang
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
    // học sinh lớp 4: trang chủ
    r.home = await p.evaluate(() => {
      const st = document.querySelector(".stats"), g = Store.sessionUser().grade, box = document.querySelector("#allPractice");
      const want = window.ONTAP_MODULES.filter((m) => m.grade === g).map((m) => "#/play/" + m.id).concat(Store.banks(g).map((b) => "#/quiz/" + b.id));
      const grps = [...box.querySelectorAll("details.grp")].map((d) => d.open);
      return st.nextElementSibling.id === "recent" && document.querySelectorAll("#recent .item").length === 3 && grps.length > 1 && grps[0] && !grps.slice(1).some(Boolean)
        && want.every((h) => box.querySelector(`a[href="${h}"]`)) && [...box.querySelectorAll(".subj")].some((x) => x.querySelectorAll(".des a").length > 1);
    });
    r.homeStats = await statsRow(); r.homeFoot = await footShown();
    await check("trang chủ học sinh"); await snap("trang-chu-hoc-sinh", true);
    await p.evaluate(() => document.querySelectorAll("details.grp").forEach((d) => (d.open = true)));
    await check("trang chủ học sinh, mở mọi nhóm");
    await open("#/calendar"); await p.click("[data-ev='ck1-l4']"); await p.waitForTimeout(300);
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
    for (const h of ["#/admin/user/new?role=student", "#/admin/event/ck1-l4", "#/admin/bank/new"]) { await open(h); await check(h); }
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
  await kp.goto(BASE + "/"); await kp.click(`.tile[data-u="${ids.Na}"]`); await kp.fill("#pinIn", "4444"); await kp.waitForTimeout(400);
  k3.row = await kp.evaluate((id) => {
    const g = document.querySelector('#allPractice details.grp[data-grp="ck1-l6"]'), row = [...g.querySelectorAll(".subj")].find((x) => x.querySelector("b").textContent === "Toán"), a = [...row.querySelectorAll(".des a")];
    return { labels: a.map((x) => x.textContent).join(), first: a[0].getAttribute("href") === "#/quiz/" + id && a[0].classList.contains("rnd"), aria: a[0].getAttribute("aria-label"), info: row.querySelector(".small").textContent, hero: document.querySelector("#toBanks").textContent };
  }, POOL);
  await kcheck("trang chủ có nút Đề ngẫu nhiên");
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
      uniq: new Set(keys).size === keys.length, notes: d.notes.length, fixedN: Store.bank(DE1).questions.length, fixedClean: !("src" in Store.bank(DE1).questions[0]), label: document.querySelector(".hero .label").textContent };
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
  k3.run2 = { n: seen2.length, hasWrong: seen2.includes(wrongQ), leftovers: leftover.length + "/" + leftover.filter((q) => seen2.includes(q)).length, differs: seen2.some((q) => !run1.includes(q)) };
  await kp.click("#qzExit"); k3.exitAsk = (await kp.textContent("#qzFb")).replace(/\s+/g, " "); // bỏ qua hết: chưa trả lời câu nào
  await kp.click("#qzYes"); await kp.waitForTimeout(300);
  k3.home = await kp.evaluate(() => ({ hash: location.hash, weak: [...document.querySelectorAll(".panel > .tags .tag.warn")].map((t) => t.textContent).join("|"), recent: document.querySelector("#recent").textContent.replace(/\s+/g, " "),
    n: Store.resultsFor(Store.sessionUser().id).length }));
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
  const k3OK = !k3.problems.length && k3.row.labels === "Đề ngẫu nhiên,Đề 1,Đề 2" && k3.row.first && k3.row.aria === "Toán 6 · Cuối kì I · Đề ngẫu nhiên" && k3.row.info === "2 đề · 25 câu mỗi đề · đề ngẫu nhiên 25 câu" && k3.row.hero === "Đề ôn · 5 đề"
    && k3.de1 && /Mỗi lần làm là một đề khác: 25 câu rút từ kho 50 câu \(2 đề\) theo ma trận đề, ưu tiên câu bạn chưa làm hoặc hay sai\./.test(k3.intro) && k3.noNotes
    && k3.kho.n === 25 && k3.kho.kho === 50 && k3.kho.srcs === "toan6-ck1-de1,toan6-ck1-de2" && k3.kho.matrix && k3.kho.uniq && k3.kho.notes === 0 && k3.kho.fixedN === 25 && k3.kho.fixedClean && k3.kho.label === "Lớp 6 · Toán · Đề ngẫu nhiên"
    && k3.run1.n === 25 && k3.run1.de1 === 2 && k3.run1.score === "9,5/10" && k3.run1.again === "Làm đề khác"
    && k3.saved.refId === POOL && k3.saved.subject === "Toán" && k3.saved.label === "Toán 6 · Cuối kì I · Đề ngẫu nhiên" && k3.saved.r === 24 && k3.saved.t === 25 && k3.saved.wrong === 1
    && k3.saved.histN === 25 && k3.saved.histWrong === "[1,1]" && k3.saved.histRight === 24
    && k3.run2.n === 25 && k3.run2.hasWrong && k3.run2.leftovers === "2/2" && k3.run2.differs && /Thoát đề\?/.test(k3.exitAsk)
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
  if (r1.resultLinks.on) { // báo một câu ở màn kết quả
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
  r1.parent = await rp.evaluate((id) => { const r = Store.reports()[0]; return r.userId === id && r.reason === "unclear" && Store.reports().length === 4; }, ids["Mẹ Bin"]);
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
     thì không có hộp; chữ câu hỏi và lời giải trên màn hình không có chữ cái tiếng Việt (giao diện làm đề vẫn tiếng Việt: Phiên
     TA2). Mỗi màn hình kiểm tra 360px; ảnh sáng/tối một câu đọc hiểu và một câu điền sau khi Kiểm tra ở
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
        else { const w = q.type === "tf" ? (q.a ? "Đúng" : "Sai") : q.o[0]; await p.$$eval(".opts .opt", (bs, w) => bs.find((b) => b.lastElementChild.textContent === w).click(), w); }
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
  ol.notOpened = /Chưa tải được đề/.test(await op.textContent("#view")) && !!(await op.$("#qRetry")) && !(await op.$("#qPractice"));
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
  if (rv.length || real.length || cloudMode || outReqs.length || !backupOK || !offlineOK || !cloudOK || db.results.length !== 5 || db.banks.length !== 1 || dataErrs.length || !migOK || !reportOK || !modGuardOK || !examGuardOK || !pinLockOK || !routeOK || !pinAutoOK || !ok360 || !gradesOK || !noAnswerOK || !homeScreenOK || !labelsOK || !swOK || !adminLocal || !k2OK || !k3OK || !r1OK || !ta1OK) { console.error("E2E FAILED"); process.exitCode = 1; } else console.log("E2E OK");
  await browser.close();
})();
