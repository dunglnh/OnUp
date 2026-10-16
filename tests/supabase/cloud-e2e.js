/* Chạy giao diện bản đám mây trong Chromium với máy chủ Supabase giả (tests/supabase/fake-backend.js) và
   Edge Function thật. Trình duyệt gọi máy chủ giả qua page.exposeFunction, không cần mạng.
   Chạy: python3 -m http.server 8000 &  rồi  node tests/supabase/cloud-e2e.js
   Ảnh chụp (360px, sáng và tối) lưu ở tests/screenshots/cloud/. */
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const nodeCrypto = require("crypto");
const { pathToFileURL } = require("url");
const { createBackend } = require("./fake-backend.js");
const { createFakeSupabase } = require("./fake-client.js");

const BASE = process.env.BASE_URL || "http://localhost:8000";
const OUT = path.join(__dirname, "..", "screenshots", "cloud");
fs.mkdirSync(OUT, { recursive: true });
const FAKE_CLIENT = fs.readFileSync(path.join(__dirname, "fake-client.js"), "utf8");
const CONFIG = `window.ONTAP_CONFIG = { supabaseUrl: "https://fake.supabase.co", supabaseAnonKey: "anon-key" };`;

/* Dữ liệu cũ của bản cục bộ (định dạng js/store.js) để thử nút chuyển dữ liệu. */
function localData() {
  const h = (salt, pin) => "s256:" + nodeCrypto.createHash("sha256").update(salt + ":" + pin).digest("hex");
  return {
    v: 1, settings: { schoolName: "Nhà Bin", schoolYear: "2026–2027" },
    users: [
      { id: "a1", role: "admin", name: "Bố Minh", avatar: "🧭", salt: "s1", pinHash: h("s1", "1234") },
      { id: "p1", role: "parent", name: "Bà ngoại", avatar: "🌻", salt: "s2", pinHash: h("s2", "5555") },
      { id: "k1", role: "student", name: "Bông", avatar: "🐼", grade: 6, className: "6A", parentIds: ["p1"], salt: "s3", pinHash: h("s3", "4321") }
    ],
    events: [], banks: [],
    results: [{ id: "r1", userId: "k1", source: "module", refId: "l6-giua-ki-1", subject: "Toán", label: "Toán · Đề 1", mode: "exam", r: 17, t: 20, s: 1200, at: "2026-10-10T09:00:00.000Z" }],
    seedBanksSeen: []
  };
}

async function run(browser, scheme) {
  const be = createBackend();
  const { createHandler } = await (await import(pathToFileURL(path.join(__dirname, "load-edge.mjs")).href)).loadEdgeFunction();
  be.functions["student-login"] = createHandler({ db: createFakeSupabase((m) => be.handle(m), { service: true }), getUser: be.getUser, pepper: "e2e-pepper-0123456789-abcdefghijklmn", iter: 1000 });
  be.T.allowed_creators.push({ email: "bo.minh@example.com" });
  const errs = [];
  async function device() {
    const ctx = await browser.newContext({ viewport: { width: 360, height: 760 }, deviceScaleFactor: 1, colorScheme: scheme });
    await ctx.exposeFunction("__fakeSupabase", (msg) => be.handle(msg));
    await ctx.addInitScript(FAKE_CLIENT);
    await ctx.route("**/js/config.js", (r) => r.fulfill({ contentType: "text/javascript", body: CONFIG }));
    await ctx.route(/cdn\.jsdelivr\.net|fonts\.g/, (r) => r.abort()); // không cần mạng
    const page = await ctx.newPage();
    page.on("pageerror", (e) => errs.push("pageerror: " + e.message));
    page.on("console", (m) => { if (m.type() === "error" && !/net::|Failed to load resource/.test(m.text())) errs.push("console: " + m.text()); });
    return page;
  }
  const shot = async (page, name) => {
    const wide = await page.evaluate(() => document.documentElement.scrollWidth);
    if (wide > 360) errs.push(name + ": cuộn ngang " + wide + "px");
    await page.evaluate(() => { window.scrollTo(0, 0); const t = document.getElementById("toast"); if (t) t.hidden = true; });
    await page.screenshot({ path: path.join(OUT, `${name}-${scheme}.png`), fullPage: true });
  };
  const wait = (page, ms) => page.waitForTimeout(ms || 250);

  /* ---- quản trị: đăng nhập email, tạo gia đình ---- */
  const admin = await device();
  await admin.goto(BASE + "/");
  await admin.waitForSelector("#mailForm");
  await shot(admin, "c1-dang-nhap");
  await admin.fill("#mEmail", "bo.minh@example.com");
  await admin.click("#mSend");
  await admin.waitForSelector("#otpForm");
  await shot(admin, "c2-da-gui-email");
  await admin.fill("#mCode", be.outbox[be.outbox.length - 1].otp);
  await admin.click("#otpForm button");
  await admin.waitForSelector("#invForm");
  await shot(admin, "c3-tao-gia-dinh");
  await admin.fill("#sSchool", "Nhà Bin");
  await admin.fill("#sName", "Bố Minh");
  await admin.click("#setupForm button[type=submit]");
  await admin.waitForSelector("text=Quản trị");
  // thêm học sinh và phụ huynh
  await admin.goto(BASE + "/#/admin/user/new?role=student");
  await admin.fill("#uName", "Bin"); await admin.fill("#uPin", "482915");
  await admin.selectOption("#uGrade", "4"); await admin.fill("#uClass", "4A");
  await admin.click("button[type=submit]");
  await admin.waitForSelector("text=Học sinh (1)");
  await admin.goto(BASE + "/#/admin/user/new?role=parent");
  await admin.fill("#uName", "Mẹ Bin");
  await admin.click("button[type=submit]");
  await admin.waitForSelector("#invBox .code");
  await shot(admin, "c4-ma-moi");
  const invite = (await admin.textContent("#invBox .code")).trim();
  // chuyển dữ liệu máy này lên
  await admin.evaluate((d) => localStorage.setItem("ontap_db_v1", JSON.stringify(d)), localData());
  await admin.goto(BASE + "/#/admin/data"); await wait(admin);
  await shot(admin, "c5-chuyen-du-lieu");
  await admin.click("#dMigrate");
  await admin.waitForSelector("#migRes .fb.ok");
  await shot(admin, "c6-da-chuyen");
  const migText = await admin.textContent("#migRes");
  const famCode = (await admin.textContent("#dCode")).trim();

  /* ---- học sinh: mã gia đình + PIN ---- */
  const kid = await device();
  await kid.goto(BASE + "/");
  await kid.waitForSelector("#codeForm");
  await kid.fill("#fCode", famCode.toLowerCase());
  await kid.click("#codeForm button");
  await kid.waitForSelector("#kidList .tile");
  await kid.click("#kidList .tile:has-text('Bông')");
  for (const k of "9999") await kid.click(`.pad button[data-k="${k}"]`);
  await kid.click(`.pad button[data-k="ok"]`);
  await kid.waitForSelector("#pinErr .fb");
  await shot(kid, "c7-ma-gia-dinh-pin");
  for (const k of "4321") await kid.click(`.pad button[data-k="${k}"]`); // PIN cũ chuyển từ máy cũ
  await kid.click(`.pad button[data-k="ok"]`);
  await kid.waitForSelector("text=Bạn đang dùng mã PIN cũ"); // PIN cũ chuyển từ máy: được mời đổi PIN 6 số
  await shot(kid, "c9-doi-pin-cu");
  await kid.goto(BASE + "/#/home");
  await kid.waitForSelector("text=Chào Bông");
  await kid.goto(BASE + "/#/quiz/toan6-ck1-de1"); await wait(kid);
  await kid.click("#qPractice");
  for (let i = 0; i < 40 && !(await kid.$(".score")); i++) {
    if (await kid.$("#qzFill")) await kid.fill("#qzFill", "1"); else await kid.click(".opt >> nth=0");
    await kid.click("#qzGo"); await kid.click("#qzGo");
  }
  await kid.waitForSelector(".score");
  await kid.goto(BASE + "/#/home"); await wait(kid, 400);
  await shot(kid, "c8-hoc-sinh");
  await kid.goto(BASE + "/#/account"); await kid.click("#logout");
  await kid.waitForSelector("#kidList .tile");
  const remembered = await kid.evaluate(() => document.querySelectorAll("#kidList .tile").length);

  /* ---- phụ huynh: nhận mã mời, xem kết quả của con ---- */
  const mom = await device();
  await mom.goto(BASE + "/");
  await mom.fill("#mEmail", "me.bin@example.com"); await mom.click("#mSend");
  await mom.waitForSelector("#otpForm");
  await mom.fill("#mCode", be.outbox[be.outbox.length - 1].otp); await mom.click("#otpForm button");
  await mom.waitForSelector("#jInvite");
  await mom.fill("#jInvite", invite.toLowerCase()); await mom.click("#invForm button");
  await mom.waitForSelector("text=Con của tôi");
  const kidsOfMom = await mom.$$eval("[data-child]", (b) => b.length);
  const grandma = be.T.profiles.find((p) => p.name === "Bà ngoại");

  const bong = be.T.profiles.find((p) => p.name === "Bông");
  const results = be.T.results.filter((r) => r.profile_id === bong.id);
  const checks = {
    "mã mời 12 kí tự": /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(invite),
    "chuyển dữ liệu: 2 tài khoản, 1 kết quả": /2 tài khoản mới, 1 kết quả/.test(migText) && !!grandma && !!grandma.invite_code,
    "học sinh vào bằng PIN cũ, PIN đổi sang PBKDF2 (đánh dấu nên đặt lại)": be.T.student_pins.find((p) => p.profile_id === bong.id).pin_hash.startsWith("pbkdf2v2w$"),
    "kết quả làm bài được lưu lên máy chủ": results.length === 2 && results.some((r) => r.source === "bank" && r.ref_id === "toan6-ck1-de1"),
    "đăng xuất: máy nhớ mã gia đình, hiện lại danh sách": remembered === 2,
    "phụ huynh nhận mã mời (chưa gắn con)": kidsOfMom === 0,
    "không lỗi trên trang": errs.length === 0
  };
  return { checks, errs };
}

(async () => {
  const browser = await chromium.launch();
  let bad = 0;
  for (const scheme of ["light", "dark"]) {
    const { checks, errs } = await run(browser, scheme);
    for (const [k, v] of Object.entries(checks)) { console.log((v ? "ok  " : "FAIL ") + scheme + ": " + k); if (!v) bad++; }
    if (errs.length) console.log(errs);
  }
  // ghép ảnh sáng/tối cạnh nhau để xem nhanh
  const page = await browser.newPage({ viewport: { width: 760, height: 400 } });
  const names = [...new Set(fs.readdirSync(OUT).filter((f) => /-light\.png$/.test(f)).map((f) => f.replace("-light.png", "")))].sort();
  for (const n of names) {
    const img = (s) => "data:image/png;base64," + fs.readFileSync(path.join(OUT, `${n}-${s}.png`)).toString("base64");
    await page.setContent(`<body style="margin:0;display:flex;gap:16px;padding:16px;background:#888;align-items:flex-start"><img src="${img("light")}" width="360"><img src="${img("dark")}" width="360"></body>`);
    await page.screenshot({ path: path.join(OUT, `${n}.jpg`), fullPage: true, type: "jpeg", quality: 70 });
  }
  await browser.close();
  if (bad) { console.error("CLOUD E2E FAILED"); process.exitCode = 1; } else console.log("CLOUD E2E OK");
})();
