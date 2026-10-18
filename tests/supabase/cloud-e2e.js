/* Chạy giao diện bản đám mây trong Chromium với máy chủ Supabase giả (tests/supabase/fake-backend.js) và Edge Function
   admin thật (chủ app tạo tài khoản). Trình duyệt gọi máy chủ giả qua page.exposeFunction, không cần mạng.
   Chạy: python3 -m http.server 8000 &  rồi  node tests/supabase/cloud-e2e.js   (in "CLOUD E2E OK")
   Luồng: đăng nhập tên đăng nhập + mật khẩu (ghi nhớ; thẻ “Chưa có tài khoản?”, thẻ nhắc dữ liệu cũ của bản lưu trên máy)
   → bắt đổi mật khẩu tạm → khu phụ huynh → thêm hồ sơ con (PIN 4 số tùy chọn) → “Ai đang học?” → con nhập PIN, làm đề,
   kết quả lên máy chủ → tab mới: nhập lại mật khẩu vào khu phụ huynh → báo cáo tuần, đổi mật khẩu, chuyển dữ liệu máy này,
   đăng xuất → máy không ghi nhớ → tài khoản bị khóa.
   Mỗi màn hình kiểm tra ở 360px như tests/e2e.js (không cuộn ngang, nút cao ≥ 44px, chữ ≥ 13px); ảnh sáng và tối lưu ở
   tests/screenshots/cloud/ (thêm bản ghép sáng/tối cạnh nhau <tên>.jpg để xem nhanh). Lượt tối chạy với CAPTCHA bật. Cuối cùng kiểm tra service worker (sw.js) không làm hỏng bản
   đám mây và không đệm request ra ngoài app, rồi trang admin của chủ app (admin.html): tài khoản gia đình thấy “Không có
   quyền”; chủ app xem số liệu nhanh, tìm, lọc, tạo tài khoản, xem nhanh, ghi chú, đặt lại mật khẩu, khóa, mở khóa, xóa,
   nhật ký. */
// Cho route và sự kiện request của Playwright áp dụng cả cho service worker (xem tests/e2e.js).
process.env.PW_EXPERIMENTAL_SERVICE_WORKER_NETWORK_EVENTS = "1";
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
const CONTACT = "https://zalo.me/0912345678", SIGNUP = "https://zalo.me/0912345678?moi", SIGNUP_TXT = "Nhắn Zalo cho cô Lan để được mời";
/* signup: điền signupText, signupUrl (thẻ “Chưa có tài khoản?”); không thì để trống, thẻ phải dùng contactText, contactUrl. */
const config = (siteKey, signup) => `window.ONTAP_CONFIG = { supabaseUrl: "https://fake.supabase.co", supabaseAnonKey: "anon-key", turnstileSiteKey: ${JSON.stringify(siteKey || "")},
  contactText: "Nhắn Zalo cho cô Lan", contactUrl: ${JSON.stringify(CONTACT)}, signupText: ${JSON.stringify(signup ? SIGNUP_TXT : "")}, signupUrl: ${JSON.stringify(signup ? SIGNUP : "")} };`;
/* Thay cho script Cloudflare Turnstile (không có mạng): trả mã hợp lệ sau một chút, ghi lại ô đã dùng. */
const TURNSTILE_STUB = `window.turnstile = { n: 0, boxes: [], render(host, o) { this.boxes.push(host.id || "?"); const t = "ok-" + Date.now() + "-" + (++this.n); setTimeout(() => o.callback(t), 20); return this.n; }, remove() {} };`;

/* Như audit trong tests/e2e.js: ở 360px không tràn ngang; mọi button, a.btn, .linkbtn đang hiện cao ≥ 44px; chữ ≥ 13px. */
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

/* Dữ liệu cũ của bản lưu trên máy (định dạng js/store.js) để thử nút chuyển dữ liệu. */
function localData() {
  const h = (salt, pin) => "s256:" + nodeCrypto.createHash("sha256").update(salt + ":" + pin).digest("hex");
  return {
    v: 1, settings: { schoolName: "Nhà Bin", schoolYear: "2026–2027" },
    users: [
      { id: "a1", role: "admin", name: "Bố Minh", avatar: "🧭", salt: "s1", pinHash: h("s1", "1234") },
      { id: "k1", role: "student", name: "Bông", avatar: "🐼", grade: 6, className: "6A", salt: "s3", pinHash: h("s3", "4321") }
    ],
    events: [], banks: [],
    results: [{ id: "r1", userId: "k1", source: "module", refId: "l6-giua-ki-1", subject: "Toán", label: "Toán · Đề 1", mode: "exam", r: 17, t: 20, s: 1200, at: "2026-10-10T09:00:00.000Z" }],
    seedBanksSeen: []
  };
}

async function run(browser, scheme) {
  const be = createBackend();
  const { createHandler, LOGIN_DOMAIN } = await (await import(pathToFileURL(path.join(__dirname, "load-edge.mjs")).href)).loadEdgeFunction();
  be.functions.admin = createHandler({ db: createFakeSupabase((m) => be.handle(m), { service: true }), getUser: be.getUser });
  const OWNER_PW = "chu-app-mat-khau-rat-dai-2026";
  const ownerUser = be.addUser("chu.app@" + LOGIN_DOMAIN, OWNER_PW);
  be.T.app_owners.push({ user_id: ownerUser.id, created_at: new Date().toISOString() });
  const mem = new Map(), owner = createFakeSupabase((m) => be.handle(m), { storage: { getItem: (k) => mem.get(k) || null, setItem: (k, v) => mem.set(k, v), removeItem: (k) => mem.delete(k) } });
  await owner.auth.signInWithPassword({ email: "chu.app@" + LOGIN_DOMAIN, password: OWNER_PW });
  const admin = async (body) => { const r = await owner.functions.invoke("admin", { body }); return r.error ? r.error.context.json() : r.data; };
  const TEMP = "tam-7k2m9q", PW = "me-bin-2026", PW2 = "me-bin-moi-2026";
  const acc = (await admin({ action: "create_account", username: "nha.bin", password: TEMP, display_name: "Nhà Bin" })).account;

  const withCaptcha = scheme === "dark"; // lượt tối chạy với CAPTCHA bật ở cả app và máy chủ
  const withSignup = scheme === "light"; // lượt sáng điền signupText, signupUrl; lượt tối để trống (thẻ dùng contactText, contactUrl)
  be.captchaRequired = withCaptcha;
  const errs = [], problems = [], swOut = [];
  async function device() {
    const ctx = await browser.newContext({ viewport: { width: 360, height: 760 }, deviceScaleFactor: 2, colorScheme: scheme });
    await ctx.exposeFunction("__fakeSupabase", (msg) => be.handle(msg));
    await ctx.addInitScript(FAKE_CLIENT);
    if (withCaptcha) await ctx.addInitScript(TURNSTILE_STUB);
    await ctx.route("**/js/config.js", (r) => r.fulfill({ contentType: "text/javascript", body: config(withCaptcha ? "0x4AAAAAAAtest" : "", withSignup) }));
    await ctx.route(/challenges\.cloudflare\.com/, (r) => r.abort());
    await ctx.route(/cdn\.jsdelivr\.net|fonts\.g/, (r) => r.abort()); // không cần mạng
    await ctx.route(/fake\.supabase\.co/, (r) => r.fulfill({ contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: "[]" }));
    ctx.on("request", (r) => { if (r.serviceWorker() && !r.url().startsWith(BASE + "/")) swOut.push(r.url()); }); // service worker gửi ra ngoài app: phải không có
    ctx.on("page", (pg) => {
      pg.on("pageerror", (e) => errs.push("pageerror: " + e.message));
      pg.on("console", (m) => { if (m.type() === "error" && !/net::|Failed to load resource/.test(m.text())) errs.push("console: " + m.text()); });
    });
    return ctx;
  }
  const wait = (page, ms) => page.waitForTimeout(ms || 250);
  /* Kiểm tra 360px rồi chụp ảnh (cả trang, từ đầu trang; ẩn toast). */
  async function shot(page, name) {
    await page.evaluate(() => { window.scrollTo(0, 0); const t = document.getElementById("toast"); if (t) t.hidden = true; });
    (await page.evaluate(audit)).forEach((x) => problems.push(`${name}: ${x}`));
    await page.screenshot({ path: path.join(OUT, `${name}-${scheme}.png`), fullPage: true });
  }
  const text = (page, sel) => page.textContent(sel).then((t) => t.replace(/\s+/g, " ").trim(), () => "");
  const tile = (page, name) => page.click(`.tile:has(.nm:text-is("${name}"))`);
  const pad = async (page, digits) => { for (const k of digits) await page.click(`.pad button[data-k="${k}"]`); await wait(page, 300); };
  const until = async (page, fn) => { for (let i = 0; i < 40 && !fn(); i++) await wait(page, 100); return fn(); };
  /* Chờ service worker điều khiển trang (sel: ô có trên trang sau khi tải lại). Trang vừa đăng kí service worker không
     được điều khiển ngay (clients.claim chạy khi kích hoạt xong, có khi sau khi trang đã tải), thỉnh thoảng chờ 30 giây
     vẫn chưa có controller: chưa có thì tải lại trang một lần rồi chờ. */
  async function swControl(page, sel) {
    await page.evaluate(() => navigator.serviceWorker.ready);
    if (!(await page.evaluate(() => !!navigator.serviceWorker.controller))) { await page.reload(); await page.waitForSelector(sel); }
    await page.waitForFunction(() => !!navigator.serviceWorker.controller);
  }
  /* Thẻ liên hệ trên trang đăng nhập: đường và chữ của link trong #sel. */
  const linkOf = (page, sel) => page.$eval(sel + " a", (a) => a.getAttribute("href") + " · " + a.textContent).catch(() => "");
  const c = {};
  /* Nút xem mật khẩu, mã PIN (U1), như revealTry trong tests/e2e.js: ô (đã có chữ) có nút ngay sau nó; bấm thì type="text",
     aria-pressed="true", bấm lại thì ẩn; giá trị, focus, vị trí con trỏ, autocomplete giữ nguyên. Chỗ sai ghi vào rv. */
  const rv = [];
  const eye = (page, sel) => page.click(sel + " + .reveal-btn");
  const types = (page, ...sels) => Promise.all(sels.map((x) => page.$eval(x, (i) => i.type))).then((t) => t.join());
  async function revealTry(page, sel, what) {
    const st = () => page.$eval(sel, (i) => { const b = i.nextElementSibling; return { type: i.type, btn: !!b && b.matches("button.reveal-btn[type=button]") && !!b.querySelector("svg"), pressed: b && b.getAttribute("aria-pressed"), label: b && b.getAttribute("aria-label"), value: i.value, focus: document.activeElement === i, caret: i.selectionStart, mode: i.getAttribute("inputmode"), ac: i.getAttribute("autocomplete") }; });
    await page.focus(sel); await page.$eval(sel, (i) => i.setSelectionRange(1, 1));
    const a = await st(); await eye(page, sel);
    const b = await st(); await eye(page, sel);
    const d = await st();
    const good = (x, type, pressed, verb) => x.btn && x.type === type && x.pressed === pressed && x.label === verb + " " + what && x.value === a.value && x.focus && x.caret === 1 && x.mode === a.mode && x.ac === a.ac;
    if (!a.value || !good(a, "password", "false", "Hiện") || !good(b, "text", "true", "Ẩn") || !good(d, "password", "false", "Hiện")) rv.push(sel + ": " + JSON.stringify([a, b, d]));
  }
  const rvIs = (ok, msg) => { if (!ok) rv.push(msg); };

  /* ---- máy của gia đình: đăng nhập (ghi nhớ), đổi mật khẩu tạm ---- */
  const home = await device();
  const p = await home.newPage();
  await p.goto(BASE + "/");
  await p.waitForSelector("#loginForm");
  await shot(p, "c1-dang-nhap");
  c.contact = await linkOf(p, "#contact");
  // S1: thẻ “Chưa có tài khoản?” dưới form; máy không có dữ liệu bản lưu trên máy thì không có thẻ nhắc dữ liệu cũ
  c.signup = { text: await text(p, "#signup"), link: await linkOf(p, "#signup"),
    below: await p.evaluate(() => !!(document.querySelector("#loginForm").compareDocumentPosition(document.querySelector("#signup")) & Node.DOCUMENT_POSITION_FOLLOWING)) };
  c.oldData = { none: !(await p.$("#oldData")) };
  await p.fill("#lUser", "nha.bin"); await p.fill("#lPass", "sai-mat-khau");
  await revealTry(p, "#lPass", "mật khẩu");
  await eye(p, "#lPass"); await shot(p, "c1-dang-nhap-hien-mat-khau");
  await p.click("#lGo"); await p.waitForSelector("#loginErr .fb");
  c.wrong = await text(p, "#loginErr");
  rvIs((await types(p, "#lPass")) === "password", "đăng nhập: gửi sai vẫn hiện"); // gửi form: ẩn lại
  await p.fill("#lUser", "Nha.Bin"); await p.fill("#lPass", TEMP); await p.check("#lRemember");
  await p.click("#lGo"); await p.waitForSelector("#npForm");
  await shot(p, "c2-doi-mat-khau-tam");
  await p.fill("#pwNew", PW); await p.fill("#pwNew2", PW + "x");
  for (const x of ["#pwNew", "#pwNew2"]) await revealTry(p, x, "mật khẩu");
  await eye(p, "#pwNew"); await eye(p, "#pwNew2"); await p.click("#npForm [type=submit]");
  c.mismatch = await text(p, "#pwErr");
  rvIs((await types(p, "#pwNew", "#pwNew2")) === "password,password", "đặt mật khẩu mới: gửi sai vẫn hiện");
  await p.fill("#pwNew2", PW); await p.click("#npForm [type=submit]");
  await p.waitForSelector("text=Khu phụ huynh");
  c.changed = !be.T.families.find((f) => f.username === "nha.bin").must_change_password;
  c.remembered = await p.evaluate(() => !!localStorage.getItem("ontap_sb_auth") && !sessionStorage.getItem("ontap_sb_auth"));
  await shot(p, "c3-khu-phu-huynh-moi");

  /* ---- thêm hồ sơ con ---- */
  await p.click("a[href='#/admin/user/new?role=student']"); await p.waitForSelector("#uForm");
  c.grades = await p.$$eval("#uGrade option", (o) => o.map((x) => x.value).join());
  await shot(p, "c4-them-ho-so-con");
  await p.fill("#uName", "Bin"); await p.selectOption("#uGrade", "4"); await p.fill("#uClass", "4A"); await p.fill("#uPin", "1357");
  await revealTry(p, "#uPin", "mã PIN");
  await p.click("#uForm [type=submit]"); await p.waitForSelector("text=Hồ sơ con (1/5)");
  await p.goto(BASE + "/#/admin/user/new?role=student"); await p.waitForSelector("#uForm");
  await p.fill("#uName", "Na"); await p.selectOption("#uGrade", "6");
  await p.click("#uForm [type=submit]"); await p.waitForSelector("text=Hồ sơ con (2/5)");
  await shot(p, "c5-ho-so-con");
  const prof = be.T.profiles.filter((x) => x.family_id === acc.id);
  c.profiles = prof.length === 2 && /^4\./.test(prof.find((x) => x.name === "Bin").pin_hash) && prof.find((x) => x.name === "Na").pin_hash === null;
  await p.goto(BASE + "/#/admin/overview"); await wait(p);
  await shot(p, "c6-tong-quan");

  /* ---- “Ai đang học?”, con nhập PIN, làm đề ---- */
  await p.click("#switchWho"); await p.waitForSelector("text=Ai đang học?");
  c.tiles = await p.$$eval(".tile .nm", (t) => t.map((x) => x.textContent).join());
  await shot(p, "c7-ai-dang-hoc");
  await tile(p, "Bin"); await pad(p, "9999");
  c.wrongPin = await text(p, "#pinErr");
  await pad(p, "1357"); // PIN 4 số: gõ đủ là vào
  await p.waitForSelector("text=Chào Bin");
  await shot(p, "c8-trang-con");
  await p.goto(BASE + "/#/quiz/toan4-ck1-de1"); await wait(p);
  await p.click("#qPractice");
  for (let i = 0; i < 40 && !(await p.$(".score")); i++) {
    if (await p.$("#qzFill")) await p.fill("#qzFill", "1"); else await p.click(".opt >> nth=0");
    await p.click("#qzGo"); await p.click("#qzGo");
  }
  await p.waitForSelector(".score");
  const binId = prof.find((x) => x.name === "Bin").id;
  c.result = await until(p, () => be.T.results.some((r) => r.profile_id === binId && r.ref_id === "toan4-ck1-de1"));
  /* Hồ sơ con là học sinh nên L15, L16, L18 (tests/e2e.js) cũng áp dụng ở bản đám mây. */
  const kidRes = () => p.evaluate((id) => Store.resultsFor(id).length, binId);
  const nKid = await kidRes();
  // L15: vào "Làm như thi" rồi bấm Back khi chưa trả lời câu nào: hỏi "Thoát đề?", thoát thì không lưu điểm
  await p.goto(BASE + "/#/home"); await wait(p); await p.goto(BASE + "/#/quiz/toan4-ck1-de1"); await wait(p);
  await p.click("#qExam"); await p.evaluate(() => history.back()); await p.waitForSelector("#leaveBox");
  c.l15 = { ask: await text(p, "#leaveBox") };
  await p.click("#leaveYes"); await wait(p, 400);
  Object.assign(c.l15, { hash: await p.evaluate(() => location.hash), same: (await kidRes()) === nKid });
  // L16: bài ôn trong khung chỉ hỏi khi đang làm một lượt (#endBtn)
  const frameOf = () => p.frames().find((f) => /modules\/ioe-4/.test(f.url()));
  const leaveFrame = async () => { await p.click(".player [data-go]"); await wait(p, 200); return !!(await p.$("#leaveBox")); };
  await p.goto(BASE + "/#/play/ioe-4"); await p.waitForTimeout(1200);
  await frameOf().click("h1.page-h");
  c.l16 = { idleAsk: await leaveFrame() };
  await p.goto(BASE + "/#/play/ioe-4"); await p.waitForTimeout(1200);
  await frameOf().click(".unit >> nth=0"); await frameOf().waitForSelector("#endBtn");
  c.l16.runAsk = await leaveFrame();
  if (c.l16.runAsk) { c.l16.text = await text(p, "#leaveBox"); await p.click("#leaveYes"); await wait(p); }
  c.l16.same = (await kidRes()) === nKid;
  // L18: nút đề ghi số đề lấy từ tên đề
  await p.goto(BASE + "/#/home"); await wait(p);
  c.l18 = await p.evaluate(() => Object.fromEntries([...document.querySelectorAll("#allPractice details.grp")].map((g) => {
    const r = [...g.querySelectorAll(".subj")].find((x) => x.querySelector("b").textContent === "Toán");
    return [g.querySelector("summary b").textContent, r ? [...r.querySelectorAll(".des a")].map((a) => a.textContent).join() : ""];
  }).filter(([, v]) => v)));
  await p.goto(BASE + "/#/account"); await wait(p);
  c.kidAccount = (await p.$("#switchWho")) && !(await p.$("#signOut")) && !(await p.$("#pwForm"));
  await shot(p, "c9-tai-khoan-con");
  await p.click("#switchWho"); await p.waitForSelector("text=Ai đang học?");
  await tile(p, "Na"); await p.waitForSelector("text=Chào Na"); // hồ sơ không có PIN: bấm là vào
  c.na = true;
  await p.goto(BASE + "/#/admin/overview"); await wait(p);
  c.kidBlocked = !(await p.$("text=Khu phụ huynh"));
  await p.goto(BASE + "/#/admin/user/" + binId); await wait(p);
  c.kidBlocked = c.kidBlocked && !(await p.$("#uForm"));

  /* ---- tab mới trên máy đã ghi nhớ: vào khu phụ huynh phải nhập lại mật khẩu ---- */
  const p2 = await home.newPage();
  await p2.goto(BASE + "/"); await p2.waitForSelector("text=Ai đang học?");
  c.preselect = await p2.$eval(`.tile[aria-pressed="true"] .nm`, (x) => x.textContent).catch(() => ""); // máy nhớ hồ sơ chọn gần nhất (Na, không PIN: không tự vào)
  await tile(p2, "Phụ huynh"); await p2.waitForSelector("#pwBox:not([hidden])");
  await shot(p2, "c10-mat-khau-phu-huynh");
  await p2.fill("#pwIn", "sai-mat-khau"); await revealTry(p2, "#pwIn", "mật khẩu");
  await eye(p2, "#pwIn"); await p2.click("#pwGo"); await p2.waitForSelector("#pwErr .fb");
  c.wrongPw = await text(p2, "#pwErr");
  rvIs((await types(p2, "#pwIn")) === "password", "mật khẩu phụ huynh: gửi sai vẫn hiện");
  await p2.fill("#pwIn", PW); await p2.click("#pwGo"); await p2.waitForSelector("text=Khu phụ huynh");
  await p2.click(`[data-child="${binId}"]`); await p2.waitForSelector("#toReport");
  await shot(p2, "c11-ho-so-cua-con");
  await p2.click("#toReport"); await p2.waitForSelector(".report");
  c.report = await p2.evaluate(() => ({ n: +document.querySelector("#rpCount").textContent, subj: [...document.querySelectorAll("#rpSubjects .rp-sub b:first-child")].map((b) => b.textContent).join() }));
  await shot(p2, "c12-bao-cao-tuan");
  // đổi mật khẩu
  await p2.goto(BASE + "/#/account"); await p2.waitForSelector("#pwForm");
  await shot(p2, "c13-tai-khoan-phu-huynh");
  await p2.fill("#pwOld", "sai-mat-khau"); await p2.fill("#pwNew", PW2); await p2.fill("#pwNew2", PW2);
  await revealTry(p2, "#pwOld", "mật khẩu"); await eye(p2, "#pwOld");
  await p2.click("#pwForm [type=submit]");
  await p2.waitForSelector("#pwErr .fb");
  c.wrongOld = await text(p2, "#pwErr");
  rvIs((await types(p2, "#pwOld", "#pwNew", "#pwNew2")) === "password,password,password", "đổi mật khẩu: gửi sai vẫn hiện");
  await p2.fill("#pwOld", PW); await p2.click("#pwForm [type=submit]"); await p2.waitForSelector("text=Đã đổi mật khẩu");
  c.pwChanged = true;
  // chuyển dữ liệu bản lưu trên máy
  await p2.evaluate((d) => localStorage.setItem("ontap_db_v1", JSON.stringify(d)), localData());
  await p2.goto(BASE + "/#/admin/data"); await wait(p2);
  c.migHint = /Trên iPhone, iPad: hãy chuyển trong Safari, nơi đang có dữ liệu, trước khi dùng app ở Màn hình chính/.test(await text(p2, "#migBox"));
  c.noHomeScreen = !(await p2.$("#homeScreen")); // hướng dẫn Màn hình chính (L17) chỉ ở bản lưu trên máy
  await p2.click("#dMigrate"); await p2.waitForSelector("#migRes .fb");
  c.migrate = await text(p2, "#migRes");
  await shot(p2, "c14-du-lieu");
  // Bông (PIN cũ 4 số, chưa biết độ dài): gõ đủ 4 số thì thử lặng lẽ và vào được
  await p2.click("#switchWho"); await p2.waitForSelector("text=Ai đang học?");
  await tile(p2, "Bông"); await pad(p2, "4321");
  c.bong = await p2.waitForSelector("text=Chào Bông", { timeout: 3000 }).then(() => true, () => false);
  // đăng xuất
  await p2.goto(BASE + "/#/account"); await wait(p2);
  await p2.click("#switchWho"); await tile(p2, "Phụ huynh");
  if (await p2.$("#pwBox:not([hidden])")) { await p2.fill("#pwIn", PW2); await p2.click("#pwGo"); } // vừa nhập mật khẩu trong 5 phút: không hỏi lại
  await p2.waitForSelector("text=Khu phụ huynh");
  const captchaBoxes = withCaptcha ? await p2.evaluate(() => window.turnstile.boxes.join()) + "," + await p.evaluate(() => window.turnstile.boxes.join()) : "";
  await p2.goto(BASE + "/#/account"); await p2.click("#signOut"); await p2.waitForSelector("#loginForm");
  await p2.reload(); await p2.waitForSelector("#loginForm");
  c.signedOut = await p2.evaluate(() => !localStorage.getItem("ontap_sb_auth") && !sessionStorage.getItem("ontap_sb_auth"));
  c.oldData.migrated = !(await p2.$("#oldData")); // máy còn dữ liệu cũ nhưng đã chuyển: không nhắc
  await home.close();

  /* ---- máy khác, không ghi nhớ: tab mới phải đăng nhập lại ---- */
  const other = await device();
  const q = await other.newPage();
  await q.goto(BASE + "/"); await q.waitForSelector("#loginForm");
  // S1: máy còn dữ liệu bản lưu trên máy (có học sinh) chưa chuyển: thẻ nhắc trên form; chỉ có quản trị thì không nhắc
  const setLocal = (d) => q.evaluate((x) => { if (x) localStorage.setItem("ontap_db_v1", JSON.stringify(x)); else localStorage.removeItem("ontap_db_v1"); }, d);
  await setLocal(localData()); await q.reload(); await q.waitForSelector("#loginForm");
  c.oldData.text = await text(q, "#oldData");
  c.oldData.above = await q.evaluate(() => { const o = document.querySelector("#oldData"), f = document.querySelector("#loginForm"); return !!o && !!(o.compareDocumentPosition(f) & Node.DOCUMENT_POSITION_FOLLOWING); });
  await shot(q, "c1-dang-nhap-du-lieu-cu");
  await setLocal(Object.assign(localData(), { users: localData().users.filter((u) => u.role !== "student") })); await q.reload(); await q.waitForSelector("#loginForm");
  c.oldData.noKid = !(await q.$("#oldData"));
  await setLocal(null); await q.reload(); await q.waitForSelector("#loginForm");
  c.oldData.removed = !(await q.$("#oldData"));
  await q.fill("#lUser", "nha.bin"); await q.fill("#lPass", PW2); await q.click("#lGo");
  await q.waitForSelector("text=Ai đang học?");
  const q2 = await other.newPage();
  await q2.goto(BASE + "/"); await q2.waitForSelector("form");
  c.notRemembered = !!(await q2.$("#loginForm"));
  /* ---- tài khoản bị khóa ---- */
  await admin({ action: "set_status", id: acc.id, status: "locked" });
  await q.reload(); await q.waitForSelector("#blocked");
  c.locked = await text(q, "#blocked");
  await shot(q, "c15-tai-khoan-bi-khoa");
  await q.click("#bOut"); await q.waitForSelector("#loginForm");
  await q.fill("#lUser", "nha.bin"); await q.fill("#lPass", PW2); await q.click("#lGo"); await q.waitForSelector("#loginErr .fb");
  c.lockedLogin = await text(q, "#loginErr");

  /* ---- service worker: đã cài và điều khiển trang; gọi Supabase, Cloudflare, CDN rồi tải lại trang ---- */
  await swControl(q, "#loginForm");
  await q.evaluate(() => Promise.all(["https://fake.supabase.co/rest/v1/families?select=*", "https://challenges.cloudflare.com/turnstile/v0/api.js",
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.116.0/dist/umd/supabase.js"].map((u) => fetch(u).then((r) => r.text(), () => ""))));
  await q.reload(); await q.waitForSelector("#loginForm");
  const swAgain = await q.evaluate(() => !!(window.Store && window.Store.cloud) && window.Store.authState() === "signed-out");
  // L19: js/app.js chậm 6 giây, js/store-supabase.js có bản mới: không được chạy app.js cũ cùng store-supabase.js mới
  const src = (f) => fs.readFileSync(path.join(__dirname, "..", "..", "js", f), "utf8");
  await other.route("**/js/app.js", (r) => new Promise((ok) => setTimeout(ok, 6000)).then(() => r.fulfill({ contentType: "text/javascript", body: src("app.js") + "\nwindow.__swApp = 'new';" })).catch(() => {}));
  await other.route("**/js/store-supabase.js", (r) => r.fulfill({ contentType: "text/javascript", body: "window.__swStore = 'new';\n" + src("store-supabase.js") }));
  await q.reload(); await q.waitForSelector("#loginForm", { timeout: 20000 });
  c.swMixed = await q.evaluate(() => (window.__swApp || "old") + " app.js, " + (window.__swStore || "old") + " store-supabase.js, " + !!(window.Store && window.Store.cloud));
  const cached = await q.evaluate(async () => { const out = []; for (const k of await caches.keys()) for (const r of await (await caches.open(k)).keys()) out.push(r.url); return out; });
  await other.close();

  /* ---- trang admin của chủ app (admin.html) ---- */
  const ad = {};
  const userOf = (name) => [...be.users.values()].find((x) => x.email === name + "@" + LOGIN_DOMAIN);
  const famOf = (name) => be.T.families.find((f) => f.username === name);
  await admin({ action: "create_account", username: "nha.na", password: "tam-na-2026" }); // tài khoản gia đình, không phải chủ app
  const adm = await device();
  await adm.grantPermissions(["clipboard-read", "clipboard-write"], { origin: BASE });
  const a = await adm.newPage();
  await a.goto(BASE + "/"); await a.waitForSelector("#loginForm"); // trang học cài service worker; trang admin không đi qua nó
  await swControl(a, "#loginForm");
  await a.goto(BASE + "/admin.html"); await a.waitForSelector("#adLogin");
  await shot(a, "c16-admin-dang-nhap");
  await a.fill("#adUser", "nha.na"); await a.fill("#adPass", "tam-na-2026"); await a.click("#adGo"); await a.waitForSelector("#noPerm");
  ad.noPerm = await text(a, "#noPerm");
  await shot(a, "c17-admin-khong-co-quyen");
  await a.click("#npOut"); await a.waitForSelector("#adLogin");
  await a.fill("#adUser", "chu.app"); await a.fill("#adPass", "sai-mat-khau");
  await revealTry(a, "#adPass", "mật khẩu"); await eye(a, "#adPass");
  await a.click("#adGo"); await a.waitForSelector("#adErr .fb");
  ad.wrong = await text(a, "#adErr");
  rvIs((await types(a, "#adPass")) === "password", "admin: gửi sai vẫn hiện");
  await a.fill("#adPass", "abc"); await eye(a, "#adPass"); await a.fill("#adPass", ""); // xóa hết ô: ẩn lại
  rvIs((await types(a, "#adPass")) === "password", "admin: xóa hết ô vẫn hiện");
  await a.fill("#adPass", OWNER_PW); await a.click("#adGo"); await a.waitForSelector("#accList .list");
  ad.captcha = withCaptcha ? await a.evaluate(() => window.turnstile.boxes.join()) : "";
  ad.session = await a.evaluate(() => !!sessionStorage.getItem("onup_admin_auth") && !localStorage.getItem("onup_admin_auth") && !localStorage.getItem("ontap_sb_auth") && !sessionStorage.getItem("ontap_sb_auth"));
  await a.reload(); await a.waitForSelector("#accList .list"); // tải lại trong cùng thẻ: vẫn đăng nhập
  const rows = () => a.$$eval("#accList .item b", (b) => b.map((x) => x.textContent).join());
  ad.stats = await a.$$eval("#stats .stat", (s) => s.map((x) => x.querySelector("b").textContent + " " + x.querySelector("span").textContent).join(" | "));
  ad.byGrade = await text(a, "#byGrade");
  ad.rows = await rows();
  await shot(a, "c18-admin-danh-sach");
  await a.fill("#q", "BIN"); ad.search = await rows();
  await a.fill("#q", "khong-co-ai"); ad.none = await text(a, "#accList");
  await a.fill("#q", ""); await a.selectOption("#st", "locked"); ad.lockedOnly = await rows();
  await a.selectOption("#st", "all");
  // tạo tài khoản
  await a.click('.tabs [data-go="#/new"]'); await a.waitForSelector("#cForm");
  const sug = await a.inputValue("#cPass"); await a.click("#cPassSug"); const sug2 = await a.inputValue("#cPass");
  ad.suggest = /^[a-hj-km-np-z2-9]{10}$/.test(sug) && /^[a-hj-km-np-z2-9]{10}$/.test(sug2) && sug !== sug2;
  await a.fill("#cUser", "Nha.Tom"); await a.fill("#cName", "Nhà Tôm"); await a.fill("#cNote", "Bố Tôm, Zalo 0901 234 567");
  await shot(a, "c19-admin-tao-tai-khoan");
  await a.fill("#cUser", "Ab"); await a.click("#cGo"); ad.badUser = await text(a, "#cErr");
  await a.fill("#cUser", "nha.bin"); await a.click("#cGo"); await a.waitForSelector("#cErr .fb"); ad.taken = await text(a, "#cErr");
  await a.fill("#cUser", "Nha.Tom"); await a.click("#cGo"); await a.waitForSelector("#creds");
  ad.created = { user: await text(a, "#credUser"), pass: await text(a, "#credPass"), msg: await text(a, "#credMsg"),
    shown: await a.evaluate(() => document.querySelector("#credMsg").innerText) }; // lời nhắn đúng như hiện trên màn hình, có xuống dòng
  await a.click("#copyMsg"); await wait(a, 300);
  ad.clip = await a.evaluate(() => navigator.clipboard.readText()).catch((e) => "lỗi: " + e.message);
  // Lời nhắn dán vào Zalo không phải sửa: mỗi thông tin một dòng, chép ra đúng như trên màn hình.
  const clipLines = ad.clip.split("\n");
  ad.clipOK = ad.clip === ad.created.shown && clipLines[0] === "Tài khoản OnUp của gia đình" && clipLines.includes("👤 Tên đăng nhập: nha.tom")
    && clipLines.includes("🔑 Mật khẩu tạm: " + ad.created.pass) && clipLines.includes("1. Mở " + BASE + "/") && clipLines.every((l) => l === l.trim());
  await shot(a, "c20-admin-da-tao");
  const tom = famOf("nha.tom");
  ad.tomOK = !!tom && tom.must_change_password && tom.display_name === "Nhà Tôm" && userOf("nha.tom").password === ad.created.pass
    && (be.T.admin_notes.find((n) => n.family_id === tom.id) || {}).note === "Bố Tôm, Zalo 0901 234 567";
  // xem nhanh, đặt lại mật khẩu, khóa, xóa tài khoản vừa tạo
  await a.click("text=Xem tài khoản"); await a.waitForSelector("#quick");
  ad.tomQuick = await text(a, "#quick");
  await a.click("#rpOpen"); await a.fill("#rpPass", "ngan"); await a.click("#rpGo"); ad.shortPw = await text(a, "#rpErr");
  await a.click("#rpPassSug"); const newPw = await a.inputValue("#rpPass");
  await a.click("#rpGo"); await a.waitForSelector("#creds");
  const resetMsg = await a.evaluate(() => document.querySelector("#credMsg").innerText);
  ad.reset = (await text(a, "#credPass")) === newPw && userOf("nha.tom").password === newPw && famOf("nha.tom").must_change_password
    && resetMsg.split("\n")[0] === "Mật khẩu OnUp của gia đình đã được đặt lại" && resetMsg.split("\n").includes("🔑 Mật khẩu tạm: " + newPw);
  await a.click("#stOpen"); await a.click("#stGo"); await a.waitForSelector('#stOpen:text-is("Mở khóa")');
  ad.lock = famOf("nha.tom").status === "locked" && !!userOf("nha.tom").banned_until;
  await a.click("#delOpen"); await a.fill("#delIn", "nha.to"); ad.delOff = await a.$eval("#delGo", (b) => b.disabled);
  await a.fill("#delIn", "nha.tom"); ad.delOn = !(await a.$eval("#delGo", (b) => b.disabled));
  await a.click("#delGo"); await a.waitForSelector("#accList .list");
  ad.deleted = !famOf("nha.tom") && !userOf("nha.tom") && (await rows()) === "nha.na,nha.bin";
  // tài khoản có hồ sơ con: xem nhanh, ghi chú, mở khóa, nhật ký của tài khoản
  await a.click('#accList a.item:has(b:text-is("nha.bin"))'); await a.waitForSelector("#quick");
  ad.binQuick = await text(a, "#quick");
  await a.fill("#nText", "Mẹ Bin, Zalo 0987 654 321"); await a.click("#nGo");
  ad.note = await until(a, () => (be.T.admin_notes.find((n) => n.family_id === acc.id) || {}).note === "Mẹ Bin, Zalo 0987 654 321");
  await a.click("#stOpen"); await a.click("#stGo"); await a.waitForSelector('#stOpen:text-is("Khóa tài khoản")');
  ad.unlock = famOf("nha.bin").status === "active" && !userOf("nha.bin").banned_until;
  await a.waitForSelector("#accLog .item");
  ad.accLog = await a.$$eval("#accLog .item b", (b) => b.map((x) => x.textContent).join());
  await shot(a, "c21-admin-xem-nhanh");
  await a.click('.linkbtn[data-go="#/"]'); await a.waitForSelector("#accList .list");
  await a.fill("#q", "0987"); ad.noteSearch = await rows();
  await a.fill("#q", "nha bin"); ad.foldSearch = await rows(); // tên hiển thị “Nhà Bin”: tìm không dấu
  await a.fill("#q", "");
  // trang học trong cùng thẻ không dùng phiên của trang admin; quay lại trang admin vẫn đăng nhập
  await a.goto(BASE + "/"); await a.waitForSelector("#loginForm");
  await a.goto(BASE + "/admin.html#/log"); await a.waitForSelector("#logList .item");
  ad.appSeparate = true;
  ad.log = await a.$$eval("#logList .item b", (b) => b.map((x) => x.textContent).join(" | "));
  ad.actor = await a.$$eval("#logList .item .muted", (s) => s.length > 0 && s.every((x) => /· Bạn$/.test(x.textContent.trim())));
  await shot(a, "c22-admin-nhat-ky");
  const swUrls = await a.evaluate(async () => { const out = []; for (const k of await caches.keys()) for (const r of await (await caches.open(k)).keys()) out.push(r.url); return out; });
  ad.swAdmin = swUrls.filter((u) => /admin\.html/.test(u));
  ad.swSkip = swUrls.length > 0 && !ad.swAdmin.length;
  await a.click("#outBtn"); await a.waitForSelector("#adLogin");
  ad.out = await a.evaluate(() => !sessionStorage.getItem("onup_admin_auth"));
  await adm.close();
  const libOf = (f) => { const s = fs.readFileSync(path.join(__dirname, "..", "..", f), "utf8"); return [(/src:\s*"(https:\/\/cdn\.jsdelivr\.net\/npm\/@supabase\/[^"]+)"/.exec(s) || [])[1], (/integrity:\s*"([^"]+)"/.exec(s) || [])[1]].join(" "); };
  ad.lib = /supabase-js@[\d.]+\/.* sha384-/.test(libOf("admin.html")) && libOf("admin.html") === libOf("js/store-supabase.js");

  console.log(scheme, c, captchaBoxes, ad, "reveal (U1):", rv);
  const checks = {
    "đăng nhập: dòng “Quên mật khẩu?” lấy chữ và đường liên hệ từ js/config.js": c.contact === CONTACT + " · Nhắn Zalo cho cô Lan",
    "S1: thẻ “Chưa có tài khoản?” dưới form, link từ signupText, signupUrl (để trống thì contactText, contactUrl)": /^Chưa có tài khoản\? OnUp đang dùng thử với các gia đình được mời/.test(c.signup.text)
      && c.signup.link === (withSignup ? SIGNUP + " · " + SIGNUP_TXT : CONTACT + " · Nhắn Zalo cho cô Lan") && c.signup.below,
    "S1: thẻ nhắc dữ liệu cũ trên form khi máy còn dữ liệu bản lưu trên máy có học sinh chưa chuyển; không có, chỉ có quản trị, hoặc đã chuyển thì không": c.oldData.none && c.oldData.above
      && /^Máy này còn dữ liệu ôn tập cũ \(1 học sinh, 1 kết quả\)\. Đăng nhập tài khoản gia đình, rồi vào Khu phụ huynh → Dữ liệu → Chuyển dữ liệu máy này lên đám mây\.$/.test(c.oldData.text)
      && c.oldData.noKid && c.oldData.removed && c.oldData.migrated,
    "sai mật khẩu: báo rõ": /Tên đăng nhập hoặc mật khẩu chưa đúng/.test(c.wrong),
    "mật khẩu tạm: bắt đặt mật khẩu mới (hai ô phải khớp), máy chủ bỏ cờ": /chưa khớp/.test(c.mismatch) && c.changed,
    "ghi nhớ trên máy này: phiên giữ trong localStorage": c.remembered,
    "chưa có hồ sơ con: vào thẳng khu phụ huynh; form chỉ có khối 4 và 6 (data/grades.js)": c.grades === "4,6",
    "thêm hai hồ sơ con, PIN 4 số băm trên máy, hồ sơ không PIN": c.profiles,
    "“Ai đang học?”: các con và Phụ huynh": c.tiles === "Bin,Na,Phụ huynh",
    "con nhập PIN: sai thì báo, đúng 4 số là vào": /chưa đúng/.test(c.wrongPin),
    "kết quả làm bài lên máy chủ": c.result,
    "L15: con vào “Làm như thi”, rời khi chưa trả lời: hỏi “Thoát đề?”, không lưu điểm": /Thoát đề\?/.test(c.l15.ask) && c.l15.hash === "#/home" && c.l15.same,
    "L16: bài ôn trong khung chỉ hỏi khi đang làm một lượt (#endBtn)": !c.l16.idleAsk && c.l16.runAsk && /Rời bài ôn/.test(c.l16.text) && c.l16.same,
    "L18: nút đề ghi số đề theo tên đề": c.l18["Kiểm tra cuối học kì I"] === "Đề 1,Đề 2,Đề 3" && c.l18["Kiểm tra giữa học kì II"] === "Đề 1,Đề 2",
    "trang tài khoản của con: đổi người học, không đăng xuất, không đổi mật khẩu": !!c.kidAccount,
    "hồ sơ không PIN bấm là vào; con không vào được khu phụ huynh bằng địa chỉ": c.na && c.kidBlocked,
    "tab mới: nhớ hồ sơ chọn gần nhất, khu phụ huynh phải nhập lại mật khẩu": c.preselect === "Na" && /Mật khẩu chưa đúng/.test(c.wrongPw),
    "báo cáo tuần đọc kết quả từ máy chủ": c.report.n === 1 && c.report.subj === "Toán",
    "đổi mật khẩu: sai mật khẩu hiện tại thì báo": /hiện tại chưa đúng/.test(c.wrongOld) && c.pwChanged,
    "chuyển dữ liệu máy này: 1 hồ sơ con, 1 kết quả; PIN cũ dùng được": /1 hồ sơ con mới, 1 kết quả/.test(c.migrate) && c.bong,
    "chuyển dữ liệu: nhắc iPhone, iPad chuyển trong Safari; không có hướng dẫn Màn hình chính của bản trên máy": c.migHint && c.noHomeScreen,
    "đăng xuất: xóa phiên, tải lại vẫn ở trang đăng nhập": c.signedOut,
    "không ghi nhớ: tab mới phải đăng nhập lại": c.notRemembered,
    "tài khoản bị khóa: màn hình báo khóa có dòng liên hệ; đăng nhập bị từ chối": /đang bị khóa/.test(c.locked) && /Nhắn Zalo/.test(c.locked) && /đang bị khóa/.test(c.lockedLogin),
    "CAPTCHA (khi bật): đăng nhập và nhập lại mật khẩu đều kèm mã xác minh": !withCaptcha || (/loginCaptcha/.test(captchaBoxes) && /pwCaptcha/.test(captchaBoxes) && be.captchaUsed >= 5),
    "có service worker, tải lại vẫn là bản đám mây": swAgain,
    "L19: service worker không chạy app.js cũ cùng store-supabase.js mới": c.swMixed === "new app.js, new store-supabase.js, true",
    "service worker không đệm, không gửi request ra ngoài app": cached.length > 0 && cached.every((u) => u.startsWith(BASE + "/")) && swOut.length === 0,
    "admin: tài khoản gia đình thấy “Không có quyền”; sai mật khẩu thì báo": /Không có quyền/.test(ad.noPerm) && /chưa đúng/.test(ad.wrong),
    "admin: phiên chỉ trong thẻ, riêng với trang học; tải lại vẫn đăng nhập": ad.session && ad.appSeparate,
    "admin: số liệu nhanh (tài khoản, dùng trong 7 ngày, hồ sơ con theo khối)": ad.stats === "2 tài khoản | 1 dùng trong 7 ngày | 3 hồ sơ con" && /Lớp 4: 1/.test(ad.byGrade) && /Lớp 6: 2/.test(ad.byGrade),
    "admin: danh sách; tìm theo tên đăng nhập, tên (không dấu), ghi chú; lọc tài khoản đang khóa": ad.rows === "nha.na,nha.bin" && ad.search === "nha.bin" && /Không thấy/.test(ad.none)
      && ad.lockedOnly === "nha.bin" && ad.noteSearch === "nha.bin" && ad.foldSearch === "nha.bin",
    "admin: tạo tài khoản (gợi ý mật khẩu tạm, báo tên sai, tên đã có), chép lời nhắn (mỗi thông tin một dòng)": ad.suggest && /4–20 kí tự/.test(ad.badUser) && /đã có/.test(ad.taken) && ad.created.user === "nha.tom" && ad.tomOK
      && ad.created.msg.includes(ad.created.pass) && ad.created.msg.includes(BASE + "/") && ad.clipOK,
    "admin: xem nhanh (hồ sơ con, khối, lần dùng gần nhất), lưu ghi chú": /3 \(Lớp 4, Lớp 6\)/.test(ad.binQuick) && /Hôm nay/.test(ad.binQuick) && /Đang khóa/.test(ad.binQuick) && /Chưa dùng lần nào/.test(ad.tomQuick) && ad.note,
    "admin: đặt lại mật khẩu, khóa, mở khóa, xóa (gõ đúng tên đăng nhập mới xóa được)": /8–72/.test(ad.shortPw) && ad.reset && ad.lock && ad.unlock && ad.delOff && ad.delOn && ad.deleted,
    "admin: nhật ký thao tác (mới nhất trước, ai làm) và nhật ký của từng tài khoản": ad.actor && ad.accLog === "Mở khóa,Khóa tài khoản,Tạo tài khoản"
      && ad.log === "Mở khóa · nha.bin | Xóa tài khoản · nha.tom | Khóa tài khoản · nha.tom | Đặt lại mật khẩu · nha.tom | Tạo tài khoản · nha.tom | Tạo tài khoản · nha.na | Khóa tài khoản · nha.bin | Tạo tài khoản · nha.bin",
    "admin: đăng xuất; CAPTCHA (khi bật) khi đăng nhập": ad.out && (!withCaptcha || ad.captcha === "adCaptcha,adCaptcha,adCaptcha"),
    "admin: không đi qua service worker; cùng bản supabase-js với trang học": ad.swSkip && ad.lib,
    "U1: nút xem mật khẩu, mã PIN (lPass, pwNew, pwNew2, pwIn, uPin, pwOld, adPass): hiện, ẩn, giữ giá trị và focus; gửi form, xóa hết ô thì ẩn lại": rv.length === 0,
    "360px: không cuộn ngang, nút cao ≥ 44px, chữ ≥ 13px": problems.length === 0,
    "không lỗi trên trang": errs.length === 0
  };
  return { checks, errs: errs.concat(problems, swOut) };
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
  const page = await browser.newPage({ viewport: { width: 752, height: 400 }, deviceScaleFactor: 2 });
  const names = [...new Set(fs.readdirSync(OUT).filter((f) => /-light\.png$/.test(f)).map((f) => f.replace("-light.png", "")))].sort();
  for (const n of names) {
    const img = (s) => "data:image/png;base64," + fs.readFileSync(path.join(OUT, `${n}-${s}.png`)).toString("base64");
    await page.setContent(`<body style="margin:0;display:flex;gap:16px;padding:8px;background:#888;align-items:flex-start"><img src="${img("light")}" width="360"><img src="${img("dark")}" width="360"></body>`);
    await page.screenshot({ path: path.join(OUT, `${n}.jpg`), fullPage: true, type: "jpeg", quality: 70 });
  }
  await browser.close();
  if (bad) { console.error("CLOUD E2E FAILED"); process.exitCode = 1; } else console.log("CLOUD E2E OK");
})();
