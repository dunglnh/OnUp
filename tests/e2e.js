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
  step("leave guard: module in frame (L1)");
  const nRes = () => page.evaluate(() => JSON.parse(localStorage.getItem("ontap_db_v1")).results.length);
  await page.click("#playerFrame"); // học sinh chạm vào giữa bài (góc trên có thể bị thanh đầu che)
  await page.click(".player [data-go]"); await page.waitForTimeout(150);
  const modAsk = await page.$("#leaveBox") ? await page.textContent("#leaveBox") : "";
  await page.click("#leaveNo"); await page.waitForTimeout(100);
  const modStay = await page.evaluate(() => location.hash);
  await frame.evaluate(() => ontapReport({ label: "School Level · Test 2", mode: "exam", subject: "ta", r: 20, t: 30, s: 800 }));
  await page.waitForTimeout(200);
  await page.click(".player [data-go]"); await page.waitForTimeout(200); // điểm đã gửi về: đi luôn, không hỏi
  const modLeft = { hash: await page.evaluate(() => location.hash), box: !!(await page.$("#leaveBox")) };
  console.log("module guard:", modAsk.replace(/\s+/g, " "), modStay, modLeft);
  const modGuardOK = /Rời bài ôn/.test(modAsk) && modStay === "#/play/ioe-4" && modLeft.hash === "#/home" && !modLeft.box;
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

  step("leave guard: bank exam (L1)");
  await page.goto(BASE + "/#/home"); await page.waitForTimeout(200);
  await page.evaluate(() => (document.querySelector("a[href='#/quiz/toan4-ck1-de1']").closest("details").open = true)); // đề nằm trong nhóm kì thi đang thu gọn
  await page.click("a[href='#/quiz/toan4-ck1-de1']"); await page.waitForTimeout(200);
  const nBefore = await nRes();
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
  bk.file = (await dl).suggestedFilename();
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
  if (real.length || cloudMode || outReqs.length || !backupOK || !offlineOK || !cloudOK || db.results.length !== 5 || db.banks.length !== 1 || dataErrs.length || !migOK || !reportOK || !modGuardOK || !examGuardOK || !pinLockOK || !routeOK || !pinAutoOK || !ok360 || !gradesOK) { console.error("E2E FAILED"); process.exitCode = 1; } else console.log("E2E OK");
  await browser.close();
})();
