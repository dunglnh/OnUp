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
  const shot = (n) => page.screenshot({ path: OUT + n + ".png", fullPage: true });
  const editDb = (fn) => page.evaluate((src) => { const d = JSON.parse(localStorage.getItem("ontap_db_v1")); new Function("d", src)(d); localStorage.setItem("ontap_db_v1", JSON.stringify(d)); }, fn);
  const who = () => page.evaluate(() => (Store.sessionUser() || {}).name || "");
  // độ dài PIN đã lưu và số lần sai PIN của từng người, theo tên
  const pinLog = () => page.evaluate(() => { const o = JSON.parse(localStorage.getItem("ontap_pinlock_v1") || "{}"), d = JSON.parse(localStorage.getItem("ontap_db_v1")); return Object.fromEntries(d.users.map((u) => [u.name, { len: u.pinLen, fails: (o[u.id] || {}).fails || 0 }])); });
  const step = (s) => console.log("STEP", s);

  await page.goto(BASE + "/");
  step("setup"); await shot("01-setup");
  const tipInBrowser = !!(await page.$("#restoreTip")); // mở trong trình duyệt: không có thẻ hướng dẫn của app ở Màn hình chính (L17)
  await page.fill("#sSchool", "Nhà Bin");
  await page.fill("#sName", "Bố Minh");
  await page.fill("#sPin", "1234"); await page.fill("#sPin2", "1234");
  await page.click("button[type=submit]");
  await page.waitForSelector("text=Quản trị");
  step("add parent");
  await page.goto(BASE + "/#/admin/user/new?role=parent");
  await page.fill("#uName", "Mẹ Bin"); await page.fill("#uPin", "2222");
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

  step("logout + login student");
  await page.goto(BASE + "/#/account"); await page.click("#logout"); await page.waitForTimeout(200);
  await shot("04-login");
  await page.click(".tile:has-text('Bin')");
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
  await page.goto(BASE + "/#/quiz/toan4-ck1-de1"); await page.waitForTimeout(200);
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
  await page.click("#bSample"); console.log("check:", await page.textContent("#bRes"));
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
    Object.defineProperty(navigator, "share", { configurable: true, value: (d) => { __share.calls.push(d.files[0].name); return __share.mode === "abort" ? Promise.reject(new DOMException("Share canceled", "AbortError")) : Promise.resolve(); } });
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
    && fresh(sh.okData.at) && /Hôm nay/.test(sh.okData.last) && sh.calls.length === 3 && sh.calls.every((n) => /^on-thi-sao-luu-\d{4}-\d\d-\d\d\.json$/.test(n))
    && fresh(sh.ok.at) && !sh.ok.card && /Đã lưu file sao lưu/.test(sh.ok.toast) && sh.ok.calls === 1 && sh.downloads === 0;

  step("not found + wrong grade (L3)");
  const view = async (h) => { await page.goto(BASE + "/" + h); await page.waitForTimeout(200); return { text: (await page.textContent("#view")).replace(/\s+/g, " ").trim(), missing: !!(await page.$("#missing")), quiz: !!(await page.$("#qPractice")), frame: !!(await page.$("#playerFrame")) }; };
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
  console.log("banks:", db.banks.map((b) => [b.title, b.questions.length, b.src.length > 0]));
  console.log("keys:", await page.evaluate(() => Object.keys(localStorage)));

  step("seed data");
  const dataErrs = await page.evaluate(() => {
    const B = window.ONTAP_SEED_BANKS, ids = B.map((b) => b.id), bad = [];
    if (new Set(ids).size !== ids.length) bad.push("trùng mã ngân hàng");
    B.forEach((b) => b.questions.forEach((q, i) => {
      const at = b.id + "#" + (i + 1);
      if (!q.q || !q.topic) bad.push(at + " thiếu câu hỏi/chủ đề");
      if (q.type === "fill") { if (q.q.split("___").length !== 2) bad.push(at + " cần đúng một ___"); if (!q.ans || !q.ans.length || !Quiz.isRight(q, q.ans[0])) bad.push(at + " đáp án"); }
      else if (q.type === "mc") { if (!q.o || q.o.length < 2 || new Set(q.o).size !== q.o.length) bad.push(at + " lựa chọn"); }
      else if (q.type === "tf") { if (typeof q.a !== "boolean") bad.push(at + " đúng/sai"); }
      else bad.push(at + " dạng câu");
    }));
    window.ONTAP_SEED_EVENTS.forEach((e) => {
      (e.banks || []).forEach((id) => { if (!ids.includes(id)) bad.push(e.id + " gắn ngân hàng không có: " + id); });
      (e.modules || []).forEach((id) => { if (!window.ONTAP_MODULES.some((m) => m.id === id)) bad.push(e.id + " gắn bài ôn không có: " + id); });
    });
    return bad;
  });
  console.log("data errors:", dataErrs);

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
    for (const k of PINS.Bin) await p.click(`.pad button[data-k="${k}"]`);
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
    await open("#/quiz/toan4-ck1-de1"); await check("đề, màn đầu"); r.quizFoot = !(await footShown());
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
    && !l18.toan.some((x) => /^Đề \d+$/.test(x)) && l18.tv.includes("Cuối kì I · Đề 2") && l18.tv.includes("Giữa kì II · Đề 1") && l18.ck2.join() === "Đề 2,Đề 3"
    && l18.aria.includes("Toán 4 · Giữa kì II · Đề 1") && l18.aria.includes("Toán 4 · Cuối kì I · Đề 3") && l18.wide <= 360 && l18.fits;

  step("offline (L13)");
  /* sw.js đệm đủ file của app: so danh sách FILES với các file trong repo (thiếu thì mất mạng là hỏng, thừa thì không cài được). */
  const sw = new Function("self", fs.readFileSync(ROOT + "sw.js", "utf8") + "\nreturn { VERSION, FILES };")({ addEventListener() {} });
  const ls = (dir, re) => fs.readdirSync(ROOT + dir).filter((n) => re.test(n)).map((n) => dir + n);
  const want = ["./", "manifest.webmanifest"].concat(ls("css/", /\.css$/), ls("js/", /\.js$/), ls("data/", /\.js$/), ls("fonts/", /\.(css|woff2)$/), ls("icons/", /./),
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
  op.on("console", (m) => { if (m.type() === "error") errs.push("console offline: " + m.text()); });
  await op.goto(BASE + "/");
  await op.evaluate(() => navigator.serviceWorker.ready); await op.waitForFunction(() => !!navigator.serviceWorker.controller);
  const cache = await op.evaluate(async () => { const k = await caches.keys(), c = await caches.open(k[0]); return { names: k, urls: (await c.keys()).map((r) => r.url) }; });
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
  await op.goto(BASE + "/index.html"); await op.waitForTimeout(300); // trang chưa đệm riêng: trả về trang chính
  ol.other = await op.evaluate(() => !!document.querySelector("#view .tile, #view .hero"));
  offline = false; await off.close();
  console.log("offline:", ol, "sw list:", swList, "sw version:", sw.VERSION, "cache:", cache.names, cache.urls.length, "sw requests:", swSeen.length, "leaked:", leaked);
  const offlineOK = !swList.missing.length && !swList.extra.length && cache.names.join() === sw.VERSION && cache.urls.length === sw.FILES.length && cache.urls.every((u) => u.startsWith(BASE + "/"))
    && swSeen.length > 0 && !leaked.length && ol.login && ol.fonts === "Baloo 2,Be Vietnam Pro" && ol.who === "Bin" && /Global Success 4/.test(ol.play) && ol.quiz && ol.other;
  const cloudMode = await page.evaluate(() => !!(window.Store.cloud || window.LocalStore));
  console.log("local mode:", !cloudMode, "requests outside " + HOST + ":", outReqs);
  const real = errs;
  console.log("ERRORS:", real);
  if (real.length || cloudMode || outReqs.length || !backupOK || !offlineOK || !cloudOK || db.results.length !== 5 || db.banks.length !== 1 || dataErrs.length || !migOK || !reportOK || !modGuardOK || !examGuardOK || !pinLockOK || !routeOK || !pinAutoOK || !ok360 || !gradesOK || !noAnswerOK || !homeScreenOK || !labelsOK) { console.error("E2E FAILED"); process.exitCode = 1; } else console.log("E2E OK");
  await browser.close();
})();
