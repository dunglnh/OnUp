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
  step("open module l4");
  await page.goto(BASE + "/#/play/l4-giua-ki-1"); await page.waitForTimeout(1200);
  const f2 = page.frames().find(f => /modules\/l4-giua-ki-1/.test(f.url()));
  await f2.evaluate(() => ontapReport({ label: "Toán · Đề 1", mode: "exam", subject: "toan", r: 18, t: 20, s: 1500 }));
  await page.waitForTimeout(200);

  step("quiz bank practice");
  await page.goto(BASE + "/#/quiz/mau-toan4-ck1"); await page.waitForTimeout(200);
  await page.click("#qPractice");
  for (let i = 0; i < 12; i++) {
    if (await page.$("#qzFill")) await page.fill("#qzFill", "400"); else await page.click(".opt >> nth=0");
    await page.click("#qzGo"); // check
    if (i === 3) await shot("07-quiz-feedback");
    await page.click("#qzGo"); // next
  }
  await page.waitForTimeout(200); await shot("08-quiz-result");
  await page.goto(BASE + "/#/home"); await page.waitForTimeout(300); await shot("09-student-home-after");
  await page.goto(BASE + "/#/calendar"); await page.waitForTimeout(300);
  await page.click("[data-ev='ck1-l4']"); await page.waitForTimeout(300); await shot("10-calendar");

  step("parent");
  await page.goto(BASE + "/#/account"); await page.click("#logout"); await page.waitForTimeout(200);
  await page.click(".tile:has-text('Mẹ Bin')");
  await page.fill("#pinIn", "2222"); await page.press("#pinIn", "Enter"); await page.waitForTimeout(400);
  await shot("11-parent-home");
  await page.click("[data-child]"); await page.waitForTimeout(300); await shot("12-child");

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

  step("seed links");
  const seedFails = [];
  const check = (ok, msg) => { if (!ok) seedFails.push(msg); };
  const readDb = () => page.evaluate(() => JSON.parse(localStorage.getItem("ontap_db_v1")));
  const evOf = (d, id) => d.events.find((x) => x.id === id);
  const hasLinks = (d, keys) => Array.isArray(d.seedLinks) && keys.every((k) => d.seedLinks.includes(k));
  const reload = async () => { await page.reload(); await page.waitForTimeout(300); };
  const seedKeys = await page.evaluate(() => window.ONTAP_SEED_EVENTS.flatMap((e) =>
    (e.banks || []).map((x) => e.id + ":bank:" + x).concat((e.modules || []).map((x) => e.id + ":module:" + x))));
  const seed4 = await page.evaluate(() => window.ONTAP_SEED_EVENTS.find((e) => e.id === "ck1-l4"));
  const bk = seed4.banks[0], mod = seed4.modules[0], bkKey = "ck1-l4:bank:" + bk, modKey = "ck1-l4:module:" + mod;
  const bkTitle = await page.evaluate((id) => Store.bank(id).title, bk);
  let d = await readDb();
  check(hasLinks(d, seedKeys), "setup chưa ghi đủ seedLinks");
  // Máy có dữ liệu cũ, chưa nhận liên kết mới của ck1-l4; quản trị viên đã sửa tên và ngày.
  await page.evaluate(([bk, mod, bkKey, modKey]) => {
    const d = JSON.parse(localStorage.getItem("ontap_db_v1"));
    const e = d.events.find((x) => x.id === "ck1-l4");
    e.banks = e.banks.filter((x) => x !== bk); e.modules = e.modules.filter((x) => x !== mod);
    e.title = "Cuối kì I (trường sửa)"; e.start = "2027-01-04";
    d.seedLinks = (d.seedLinks || []).filter((k) => k !== bkKey && k !== modKey);
    localStorage.setItem("ontap_db_v1", JSON.stringify(d));
  }, [bk, mod, bkKey, modKey]);
  await reload();
  d = await readDb(); let ev = evOf(d, "ck1-l4");
  check(ev.banks.includes(bk) && ev.modules.includes(mod), "tải lại chưa thêm liên kết mới vào ck1-l4");
  check(ev.title === "Cuối kì I (trường sửa)" && ev.start === "2027-01-04", "tải lại đã ghi đè tên/ngày quản trị viên sửa");
  check(hasLinks(d, [bkKey, modKey]), "chưa ghi liên kết vừa thêm vào seedLinks");
  await page.goto(BASE + "/#/calendar"); await page.waitForTimeout(300);
  await page.click("[data-ev='ck1-l4']"); await page.waitForTimeout(300);
  check((await page.textContent("#evDetail")).includes(bkTitle), "trang kì thi chưa hiện ngân hàng mới");
  await shot("15-seed-link");
  // Quản trị viên bỏ ngân hàng: tải lại không được thêm lại.
  await page.evaluate((bk) => { const e = Store.event("ck1-l4"); Store.upsertEvent(Object.assign({}, e, { banks: e.banks.filter((x) => x !== bk) })); }, bk);
  await reload();
  d = await readDb(); ev = evOf(d, "ck1-l4");
  check(!ev.banks.includes(bk), "tải lại đã thêm lại ngân hàng quản trị viên bỏ");
  check(ev.modules.includes(mod), "mất bài ôn khi bỏ ngân hàng");
  // Dữ liệu cũ chưa có seedLinks: thêm liên kết còn thiếu và ghi đủ seedLinks.
  const seed6 = await page.evaluate(() => window.ONTAP_SEED_EVENTS.find((e) => e.id === "ck1-l6"));
  await page.evaluate(() => {
    const d = JSON.parse(localStorage.getItem("ontap_db_v1"));
    delete d.seedLinks; d.events.find((x) => x.id === "ck1-l6").banks = [];
    localStorage.setItem("ontap_db_v1", JSON.stringify(d));
  });
  await reload();
  d = await readDb();
  check(seed6.banks.every((x) => evOf(d, "ck1-l6").banks.includes(x)), "dữ liệu cũ chưa được thêm ngân hàng của ck1-l6");
  check(hasLinks(d, seedKeys), "dữ liệu cũ chưa được ghi đủ seedLinks");
  // Khôi phục lịch mặc định ghi lại đủ seedLinks.
  await page.evaluate(() => { const d = Store.data(); d.seedLinks = []; Store.resetEvents(); });
  d = await readDb();
  check(hasLinks(d, seedKeys), "resetEvents chưa ghi đủ seedLinks");
  console.log("seed links:", seedFails.length ? seedFails : "ok");

  const real = errs.filter((e) => !/fonts\.g|ERR_TUNNEL|ERR_NAME|net::/.test(e));
  console.log("ERRORS:", real);
  if (real.length || seedFails.length || db.results.length !== 3 || db.banks.length !== 1) { console.error("E2E FAILED"); process.exitCode = 1; } else console.log("E2E OK");
  await browser.close();
})();
