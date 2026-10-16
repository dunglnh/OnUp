/* Kiểm thử toàn luồng bằng Playwright. Chạy: python3 -m http.server 8000 & node tests/e2e.js
   (cần cài playwright: npm i -D playwright). Ảnh chụp lưu ở tests/screenshots/. */
const { chromium } = require("playwright");
const OUT = __dirname + "/screenshots/"; require("fs").mkdirSync(OUT, { recursive: true });
const BASE = process.env.BASE_URL || "http://localhost:8000";
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push("pageerror: " + e.message));
  page.on("console", (m) => { if (m.type() === "error") errs.push("console: " + m.text()); });
  const cloudReqs = []; // js/config.js để trống: không được gọi Supabase hay tải supabase-js
  page.on("request", (r) => { if (/jsdelivr|supabase\.(co|in)|supabase-js/i.test(r.url())) cloudReqs.push(r.url()); });
  const shot = (n) => page.screenshot({ path: OUT + n + ".png", fullPage: true });
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
  await page.goto(BASE + "/#/admin/events"); await page.waitForTimeout(200); await shot("03-admin-events");

  step("logout + login student");
  await page.goto(BASE + "/#/account"); await page.click("#logout"); await page.waitForTimeout(200);
  await shot("04-login");
  await page.click(".tile:has-text('Bin')");
  for (const k of "1111") await page.click(`.pad button[data-k="${k}"]`);
  await page.click(`.pad button[data-k="ok"]`).catch(() => {});
  await page.waitForTimeout(400);
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
  await frame.click("body", { position: { x: 5, y: 5 } }); // học sinh chạm vào bài
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
  await page.goto(BASE + "/#/calendar"); await page.waitForTimeout(300);
  await page.click("[data-ev='ck1-l4']"); await page.waitForTimeout(300); await shot("10-calendar");

  step("parent");
  await page.goto(BASE + "/#/account"); await page.click("#logout"); await page.waitForTimeout(200);
  await page.click(".tile:has-text('Mẹ Bin')");
  await page.fill("#pinIn", "2222"); await page.press("#pinIn", "Enter"); await page.waitForTimeout(400);
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

  step("bank import as admin");
  await page.goto(BASE + "/#/account"); await page.click("#logout"); await page.waitForTimeout(200);
  await page.click(".tile:has-text('Bố Minh')"); await page.fill("#pinIn", "9999"); await page.press("#pinIn", "Enter"); await page.waitForTimeout(300);
  console.log("wrong pin msg:", await page.textContent("#pinErr"));
  await page.fill("#pinIn", "1234"); await page.press("#pinIn", "Enter"); await page.waitForTimeout(400);
  await page.goto(BASE + "/#/admin/bank/new"); await page.waitForTimeout(200);
  await page.fill("#bTitle", "Tiếng Việt 4 · thử"); await page.fill("#bSubj", "Tiếng Việt");
  await page.click("#bSample"); console.log("check:", await page.textContent("#bRes"));
  await page.click("button[type=submit]"); await page.waitForTimeout(300); await shot("13-banks");
  await page.goto(BASE + "/#/admin/overview"); await page.waitForTimeout(300); await shot("14-admin-overview");
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
  const editDb = (fn) => page.evaluate((src) => { const d = JSON.parse(localStorage.getItem("ontap_db_v1")); new Function("d", src)(d); localStorage.setItem("ontap_db_v1", JSON.stringify(d)); }, fn);
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
  const cloudMode = await page.evaluate(() => !!(window.Store.cloud || window.LocalStore));
  console.log("local mode:", !cloudMode, "cloud requests:", cloudReqs);
  const real = errs.filter((e) => !/fonts\.g|ERR_TUNNEL|ERR_NAME|net::/.test(e));
  console.log("ERRORS:", real);
  if (real.length || cloudMode || cloudReqs.length || !cloudOK || db.results.length !== 5 || db.banks.length !== 1 || dataErrs.length || !migOK || !reportOK || !modGuardOK || !examGuardOK) { console.error("E2E FAILED"); process.exitCode = 1; } else console.log("E2E OK");
  await browser.close();
})();
