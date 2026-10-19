/* Chạy giao diện bản đám mây trong Chromium với máy chủ Supabase giả (tests/supabase/fake-backend.js) và Edge Function
   admin thật (chủ app tạo tài khoản). Trình duyệt gọi máy chủ giả qua page.exposeFunction, không cần mạng.
   Chạy: python3 -m http.server 8000 &  rồi  node tests/supabase/cloud-e2e.js   (in "CLOUD E2E OK")
   Luồng: đăng nhập tên đăng nhập + mật khẩu (ghi nhớ; thẻ “Chưa có tài khoản?”, thẻ nhắc dữ liệu cũ của bản lưu trên máy)
   → bắt đổi mật khẩu tạm → khu phụ huynh (thẻ “Bắt đầu trong 3 bước”, UX3) → thêm hồ sơ con (PIN 4 số tùy chọn) → “Cho con học” mở
   “Ai đang học?” → con nhập PIN, làm đề, kết quả lên máy chủ (con thứ hai làm một đề Tiếng Anh: màn làm đề bằng tiếng Anh, TA2)
   → tab mới: nhập lại mật khẩu vào khu phụ huynh → báo cáo tuần, đổi mật khẩu, đặt mã mở nhanh (UX3; tab mới nữa vào bằng mã đó),
   chuyển dữ liệu máy này, đăng xuất (hỏi mật khẩu trước, UX3b; xóa mã) → máy không ghi nhớ (không đặt được mã) → tài khoản bị khóa.
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

/* Như audit trong tests/e2e.js: ở 360px không tràn ngang; mọi button, a.btn, .linkbtn, summary đang hiện cao ≥ 44px; chữ ≥ 13px. */
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

// Chữ cái tiếng Việt (như tests/kiem-tra-de.js): màn làm đề Tiếng Anh không được có (TA2).
const CHU_VIET = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/iu;

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
  /* Kiểm tra 360px rồi chụp ảnh (cả trang, từ đầu trang; ẩn toast). Thanh tab dưới của con (#tabbar, UX1) cố định ở mép màn hình:
     chụp cả trang thì ghim tạm xuống cuối trang như pinTabs của tests/e2e.js. */
  async function shot(page, name) {
    await page.evaluate(() => { window.scrollTo(0, 0); const t = document.getElementById("toast"); if (t) t.hidden = true; });
    (await page.evaluate(audit)).forEach((x) => problems.push(`${name}: ${x}`));
    const pin = (on) => page.evaluate((on) => { const b = document.querySelector("#tabbar"); if (!b) return; b.style.position = on ? "absolute" : ""; b.style.top = on ? document.documentElement.scrollHeight - b.offsetHeight + "px" : ""; }, on);
    await pin(true); await page.screenshot({ path: path.join(OUT, `${name}-${scheme}.png`), fullPage: true }); await pin(false);
  }
  const text = (page, sel) => page.textContent(sel).then((t) => t.replace(/\s+/g, " ").trim(), () => "");
  const tile = (page, name) => page.click(`.tile:has(.nm:text-is("${name}"))`);
  const WHO = 'h1:text-is("Ai đang học?")'; // màn hình "Ai đang học?" (text= khớp cả lời ghi trên thẻ Bắt đầu của khu phụ huynh)
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
     aria-pressed="true", bấm lại thì ẩn; giá trị, focus, vị trí con trỏ, autocomplete giữ nguyên. Ngoại lệ (UX4, X2): ô có
     data-reveal="<id>" (bàn phím PIN, #pinIn) dùng nút chữ đặt sẵn, không có aria-label ("Hiện số" ↔ "Giấu số"), ô ẩn khỏi mắt (≤ 1px). Chỗ sai ghi vào rv. */
  const rv = [];
  const eyeOf = (page, sel) => page.$eval(sel, (i) => (i.dataset.reveal ? "#" + i.dataset.reveal : null)).then((x) => x || sel + " + .reveal-btn");
  const eye = async (page, sel) => page.click(await eyeOf(page, sel));
  const types = (page, ...sels) => Promise.all(sels.map((x) => page.$eval(x, (i) => i.type))).then((t) => t.join());
  async function revealTry(page, sel, what) {
    const st = () => page.$eval(sel, (i) => { const pre = !!i.dataset.reveal, b = pre ? document.getElementById(i.dataset.reveal) : i.nextElementSibling, shown = (el) => el.offsetParent !== null;
      return { pre, type: i.type, btn: !!b && b.matches("button.reveal-btn[type=button]") && !!b.querySelector("svg"), pressed: b && b.getAttribute("aria-pressed"), label: b && (pre ? [...b.querySelectorAll("span")].filter(shown).map((x) => x.textContent).join() : b.getAttribute("aria-label")),
        hidden: !pre || i.getBoundingClientRect().width <= 1, value: i.value, focus: document.activeElement === i, caret: i.selectionStart, mode: i.getAttribute("inputmode"), ac: i.getAttribute("autocomplete") }; });
    await page.focus(sel); await page.$eval(sel, (i) => i.setSelectionRange(1, 1));
    const a = await st(); await eye(page, sel);
    const b = await st(); await eye(page, sel);
    const d = await st();
    const good = (x, type, pressed, verb) => x.btn && x.type === type && x.pressed === pressed && x.label === (x.pre ? (verb === "Hiện" ? "Hiện số" : "Giấu số") : verb + " " + what) && x.hidden && x.value === a.value && x.focus && x.caret === 1 && x.mode === a.mode && x.ac === a.ac;
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
  // UX2: khu phụ huynh còn ba mục Các con · Lịch thi · Cài đặt; nút "Lịch thi" ở thanh trên về tab Lịch thi của khu phụ huynh
  const tabsOf = (pg) => pg.$$eval(".tabs button", (b) => b.map((x) => x.textContent + (x.getAttribute("aria-pressed") === "true" ? "*" : "")).join());
  c.ux2 = { tabs: await tabsOf(p), topCal: await p.$eval(".who a", (a) => a.getAttribute("href")), empty: await text(p, "#kids") };
  // UX3: chưa có hồ sơ con: mục Các con chỉ có thẻ "Bắt đầu trong 3 bước" (bước 1 đang làm, nút thêm trong thẻ), "Cho con học" mờ; nút góc trên là "Chọn hồ sơ khác"
  const startOf = (pg) => pg.evaluate(() => { const st = document.querySelector("#start"); return st ? { steps: [...st.querySelectorAll(".step")].map((x) => x.className.replace("step", "").trim() + ":" + x.querySelector("b").textContent).join("|"),
    text: st.textContent.replace(/\s+/g, " ").trim(), disabled: document.querySelector("#letStudy").disabled, h: Math.round(document.querySelector("#letStudy").getBoundingClientRect().height),
    add: !!st.querySelector("a.btn[href='#/admin/user/new?role=student']"), first: document.querySelector("#kids").firstElementChild.id, rows: document.querySelectorAll("#kids > .row").length,
    link2: [...st.querySelectorAll(".step:nth-child(2) a")].map((a) => a.getAttribute("href") + " · " + a.textContent).join() } : null; }); // link2: link đặt mã PIN của bước 2 (UX3b)
  c.ux3 = { start0: await startOf(p), switchTxt: await text(p, "#switchWho") }; c.ux3b = {}; // ux3b: các kiểm tra của Phiên UX3b

  /* ---- thêm hồ sơ con ---- */
  await p.click("a[href='#/admin/user/new?role=student']"); await p.waitForSelector("#uForm");
  c.grades = await p.$$eval("#uGrade option", (o) => o.map((x) => x.value).join());
  await shot(p, "c4-them-ho-so-con");
  await p.fill("#uName", "Bin"); await p.selectOption("#uGrade", "4"); await p.fill("#uClass", "4A"); await p.fill("#uPin", "1357");
  await revealTry(p, "#uPin", "mã PIN");
  await p.click("#uForm [type=submit]"); await p.waitForSelector("#kids a.kid"); // thêm xong về tab Các con, thấy thẻ của con
  c.ux2.afterAdd = await p.evaluate(() => location.hash);
  await p.goto(BASE + "/#/admin/user/new?role=student"); await p.waitForSelector("#uForm");
  await p.fill("#uName", "Na"); await p.selectOption("#uGrade", "6");
  await p.click("#uForm [type=submit]"); await p.waitForFunction(() => document.querySelectorAll("#kids a.kid").length === 2);
  const prof = be.T.profiles.filter((x) => x.family_id === acc.id), naId = prof.find((x) => x.name === "Na").id;
  c.profiles = prof.length === 2 && /^4\./.test(prof.find((x) => x.name === "Bin").pin_hash) && prof.find((x) => x.name === "Na").pin_hash === null;
  // UX2: tab Các con: mỗi con một thẻ (chưa có bài: "Chưa ôn", "–", 0), không có ba ô số liệu và mục "Kì thi tiếp theo"; "+ Thêm hồ sơ con", "2/5 hồ sơ"
  c.ux2.kids = await p.evaluate(() => ({ cards: [...document.querySelectorAll("#kids a.kid")].map((k) => k.getAttribute("href") + " " + [...k.querySelectorAll(".stat")].map((s) => s.querySelector("b").textContent + " " + s.querySelector("span").textContent).join("|") + " " + (k.querySelector(".kid-ev") || {}).textContent).join("; ").replace(/\s+/g, " "),
    extraStats: !!document.querySelector("#view > .stack > .stats"), h2: [...document.querySelectorAll("#view h2")].map((h) => h.textContent).join(), count: [...document.querySelectorAll("#kids > .row > .small")].map((x) => x.textContent).join(), add: !!document.querySelector("#kids > .row > a[href='#/admin/user/new?role=student']"), hint: document.querySelector("#kids > p.small").textContent }));
  c.ux3.start2 = await startOf(p); // UX3: có con nhưng chưa con nào học: bước 1 xong, bước 3 đang làm, "Cho con học" bật; UX3b (X19): Bin có mã, Na không: bước 2 chưa ✓, "Na chưa có", link "Đặt mã PIN cho Na"
  await shot(p, "c6-cac-con");
  // UX3b (X18): link của bước 2 mở thẳng hồ sơ của Na (?tu=batdau): ô Mã PIN được focus, nút quay lại về Các con; để trống mã mà Lưu thì toast "Đã lưu",
  // về Các con, bước 2 vẫn chưa ✓; có mã thì toast "Đã đặt mã PIN cho Na", về Các con, bước 2 có ✓ "Bin, Na đã có mã PIN." và hết link
  await p.click("#start .step:nth-child(2) a"); await p.waitForSelector("#uForm"); await wait(p, 100);
  c.ux3b.form = await p.evaluate(() => ({ hash: location.hash, focus: document.activeElement.id, name: document.querySelector("#uName").value, back: document.querySelector("#view .linkbtn[data-go]").dataset.go }));
  await shot(p, "c6d-dat-ma-pin-tu-the");
  await p.click("#uForm [type=submit]"); await p.waitForSelector("#start");
  c.ux3b.emptySave = (await p.evaluate(() => location.hash)) + " | " + (await text(p, "#toast")) + " | " + (await startOf(p)).steps;
  await p.click("#start .step:nth-child(2) a"); await p.waitForSelector("#uForm");
  await p.fill("#uPin", "2468"); await p.click("#uForm [type=submit]"); await p.waitForSelector("#start");
  c.ux3b.pinSave = { hash: await p.evaluate(() => location.hash), toast: await text(p, "#toast"), start: await startOf(p), server: await until(p, () => /^4\./.test(be.T.profiles.find((x) => x.id === naId).pin_hash || "")) };
  await shot(p, "c6e-du-ma-pin");
  // Mở form của Na từ chỗ khác (địa chỉ, như từ Cài đặt): không focus ô mã, lưu xong về Cài đặt như UX2. Bỏ mã PIN của Na để các bước sau chạm là vào.
  await p.goto(BASE + "/#/admin/user/" + naId); await p.waitForSelector("#uNoPin"); await wait(p, 100);
  c.ux3b.settingsForm = await p.evaluate(() => ({ focus: document.activeElement.id, back: document.querySelector("#view .linkbtn[data-go]").dataset.go }));
  await p.check("#uNoPin"); await p.click("#uForm [type=submit]"); await p.waitForSelector("#kidsBox");
  c.ux3b.noPin = (await p.evaluate(() => location.hash)) + " | " + (await text(p, "#toast")) + " | " + (await until(p, () => !be.T.profiles.find((x) => x.id === naId).pin_hash));
  await p.goto(BASE + "/#/admin/overview"); await p.waitForSelector("#start");
  // UX2: tab Lịch thi của khu phụ huynh: chỉ khối của các con ("Lớp 4 · Bin", "Lớp 6 · Na"), kì thi dự kiến có nút "Trường đã báo lịch? Sửa ngày",
  // hộp sửa ngày mở ngay dưới thẻ, Lưu thì bỏ cờ dự kiến và lên máy chủ; #/calendar của phụ huynh cũng về đây
  await p.goto(BASE + "/#/calendar"); await wait(p);
  c.ux2.calRedirect = await p.evaluate(() => location.hash);
  c.ux2.cal = await p.evaluate(() => ({ tabs: [...document.querySelectorAll(".tabs")].map((t) => [...t.children].map((b) => b.textContent.replace(/\s+/g, " ") + (b.getAttribute("aria-pressed") === "true" ? "*" : "")).join()).join(" / "),
    fix: (document.querySelector('[data-fix="gk1-l4"]') || {}).textContent, fixH: Math.round((document.querySelector('[data-fix="gk1-l4"]') || { getBoundingClientRect: () => ({}) }).getBoundingClientRect().height),
    tent: !!document.querySelector('[data-ev="gk1-l4"] .tag.warn'), edit: (document.querySelector('[data-ev="ioe-truong"] + .ev-act a') || {}).getAttribute("href"), months: document.querySelectorAll(".month").length, grades: [...document.querySelectorAll("[data-ev]")].map((b) => Store.event(b.dataset.ev).grades.join("")).join() }));
  await shot(p, "c6b-lich-thi");
  await p.click('[data-fix="gk1-l4"]'); await p.waitForSelector("#fixBox");
  c.ux2.fixBox = await p.evaluate(() => { const f = document.querySelector("#fixBox"); return { after: f.previousElementSibling.classList.contains("ev-act") && f.previousElementSibling.previousElementSibling.dataset.ev === "gk1-l4", start: f.querySelector("#fxStart").value, end: f.querySelector("#fxEnd").value, official: f.querySelector("#fxOfficial").checked, text: f.textContent.replace(/\s+/g, " ").trim() }; });
  await p.fill("#fxStart", ""); await p.click("#fixBox [type=submit]"); c.ux2.fixErr = await text(p, "#fxErr");
  await p.fill("#fxStart", "2026-11-04"); await p.fill("#fxEnd", "2026-11-06");
  await shot(p, "c6c-sua-ngay");
  await p.click("#fixBox [type=submit]"); await p.waitForSelector("#toast:not([hidden])");
  c.ux2.fixed = await p.evaluate(() => ({ toast: document.querySelector("#toast").textContent, box: !!document.querySelector("#fixBox"), tent: !!document.querySelector('[data-ev="gk1-l4"] .tag.warn'), date: document.querySelector('[data-ev="gk1-l4"] .d').textContent.replace(/\s+/g, " "),
    act: document.querySelector('[data-ev="gk1-l4"] + .ev-act').textContent.trim(), ev: Store.event("gk1-l4") }));
  c.ux2.fixServer = await until(p, () => { const r = be.T.exam_events.find((x) => x.family_id === acc.id && x.id === "gk1-l4"); return !!r && r.start_date === "2026-11-04" && r.end_date === "2026-11-06" && r.tentative === false; });
  await p.click('.tabs [data-g="6"]'); await wait(p);
  c.ux2.calG6 = await p.evaluate(() => [...document.querySelectorAll("[data-ev]")].every((b) => Store.event(b.dataset.ev).grades.includes(6)) && !!document.querySelector("[data-ev]"));
  // UX2: Cài đặt: hồ sơ con, đề tự soạn, thông tin chung, rồi "Chuyển dữ liệu và sao lưu" và "Tài khoản"; #/admin/users (địa chỉ cũ) về đây
  await p.goto(BASE + "/#/admin/users"); await p.waitForSelector("#kidsBox");
  c.ux2.settings = await p.evaluate(() => ({ tabs: [...document.querySelectorAll(".tabs button")].map((b) => b.textContent + (b.getAttribute("aria-pressed") === "true" ? "*" : "")).join(), h3: [...document.querySelectorAll("#view h3")].map((h) => h.textContent).join(),
    kids: document.querySelectorAll("#kidsBox .item").length, links: [...document.querySelectorAll("#banksBox a, #moreBox a")].map((a) => (a.querySelector("b") || a).textContent.trim() + "=" + a.getAttribute("href")).join(), info: !!document.querySelector("#dSchool") }));
  await shot(p, "c5-cai-dat");
  await p.click("#banksBox a[href='#/admin/banks']"); await p.waitForSelector("#seedBanks");
  c.ux2.banks = await p.evaluate(() => ({ tabs: document.querySelector('.tabs [aria-pressed="true"]').textContent, back: document.querySelector("#view .linkbtn[data-go]").textContent, h2: [...document.querySelectorAll("#view h2")].pop().textContent, mine: document.querySelector("#myBanks").textContent.trim(),
    seedOpen: document.querySelector("#seedBanks").open, seedN: document.querySelectorAll("#seedBanks .item").length, seedAll: Store.banks().filter((b) => b.seed).length, add: (document.querySelector("a[href='#/admin/bank/new']") || {}).textContent }));
  await shot(p, "c5b-de-tu-soan");
  await p.click("a[href='#/admin/bank/new']"); await p.waitForSelector("#bForm");
  c.ux2.bankForm = (await text(p, "#view h2")) + " | " + (await text(p, "#view .linkbtn[data-go]")) + " | " + (await text(p, "#bForm [type=submit]"));
  await p.goto(BASE + "/#/admin/overview"); await p.waitForSelector("#letStudy");

  /* ---- “Cho con học” (UX3) mở “Ai đang học?”, con nhập PIN, làm đề ---- */
  await p.click("#letStudy"); await p.waitForSelector(WHO);
  c.ux3.letStudy = true;
  c.tiles = await p.$$eval(".tile .nm", (t) => t.map((x) => x.textContent).join());
  await shot(p, "c7-ai-dang-hoc");
  // UX4 X1: chạm hồ sơ có PIN thì sang bước nhập riêng (#/vao/<mã>): không cuộn, tên và 12 nút bàn phím trong khung nhìn 760px, không còn danh sách,
  // "← Chọn hồ sơ khác", hình to, tên, lớp, "Nhập mã PIN của bạn", nút chữ "Hiện số", dòng quên PIN của bản đám mây; ô #pinIn ẩn khỏi mắt (X2)
  await p.evaluate(() => scrollTo(0, 300));
  await tile(p, "Bin"); await p.waitForSelector("#pinBox:not([hidden])"); await wait(p, 300);
  c.ux4 = { enter: await p.evaluate(() => { const pad = [...document.querySelectorAll(".pad button")].map((b) => b.getBoundingClientRect()), nm = document.querySelector("#pinWho b"), vis = (x) => x.top >= 0 && x.bottom <= innerHeight;
    return { hash: /^#\/vao\//.test(location.hash), scroll: scrollY, name: nm.textContent, nameIn: vis(nm.getBoundingClientRect()), pad: pad.length === 12 && pad.every(vis), tiles: document.querySelectorAll(".tile").length, back: document.querySelector("#toList").textContent,
      whoOK: document.querySelector("#pinWho").textContent.replace(/\s+/g, " ").trim() === Store.users("student").find((u) => u.name === "Bin").avatar + "BinLớp 4 · 4A", sub: document.querySelector("#pinSub").textContent, show: document.querySelector("#pinShow").textContent, inputW: document.querySelector("#pinIn").getBoundingClientRect().width, help: document.querySelector("#pinHelp").textContent, dots: document.querySelectorAll("#pinDots span").length }; }) };
  await shot(p, "c7b-nhap-pin");
  await pad(p, "9999");
  c.wrongPin = await text(p, "#pinErr");
  c.ux4.errOrder = await p.evaluate(() => { const top = (s) => document.querySelector(s).getBoundingClientRect().top; return top("#pinDots") < top("#pinErr") && top("#pinErr") < top("#pinShow") && top("#pinShow") < top(".pad"); }); // X3: lỗi ngay dưới hàng chấm
  await pad(p, "1357"); // PIN 4 số: gõ đủ là vào
  await p.waitForSelector("text=Chào Bin");
  // UX1: trang "Hôm nay" của con với thanh tab dưới (4 tab, tab Hôm nay đang mở), thẻ gợi ý có nút Bắt đầu, chuỗi ngày, huy hiệu; thanh trên không có nút Lịch thi
  c.ux1 = await p.evaluate(() => ({ tabs: [...document.querySelectorAll("#tabbar a")].map((a) => a.textContent + (a.getAttribute("aria-current") ? "*" : "")).join(), tabH: [...document.querySelectorAll("#tabbar a")].every((a) => a.getBoundingClientRect().height >= 44 && a.getBoundingClientRect().bottom <= innerHeight),
    today: !!document.querySelector("#today #todayGo") && !!document.querySelector("#streak .week") && !!document.querySelector("#badges"), cal: !!document.querySelector(".who a[href='#/calendar']"), tabbed: document.body.classList.contains("tabbed") }));
  await shot(p, "c8-trang-con");
  await p.goto(BASE + "/#/quiz/toan4-ck1-de1"); await wait(p);
  c.ux1.quizTabs = !(await p.$("#tabbar")); // màn đề không có thanh tab
  await p.click("#qPractice");
  // UX5 (X5): trong lúc làm đề, thanh trên chỉ còn chữ OnUp (không hình đại diện); ôn luyện giữ "← Thoát", tiến độ "Câu 1/25"
  const topBar = () => p.evaluate(() => { const av = document.querySelector("#who .av"); return { quizzing: document.body.classList.contains("quizzing"), av: !!av && av.getBoundingClientRect().width > 0 }; });
  c.ux5 = { run: await topBar(), exit: await text(p, "#qzExit"), prog: await text(p, "#qzProg") };
  c.ux1.label = await p.$$eval(".qcard .label", (l) => l.map((x) => x.textContent.replace(/\s+/g, " ")).join("|")); // một dòng nhãn "Toán · chủ đề"
  const binId = prof.find((x) => x.name === "Bin").id;
  for (let i = 0; i < 40 && !(await p.$(".score")); i++) {
    if (await p.$("#qzFill")) await p.fill("#qzFill", "1"); else await p.click(".opt >> nth=0");
    await p.click("#qzGo");
    if (i === 2) { // R1: link "Báo câu này sai" dưới lời giải, hộp lí do mở ngay bên dưới, gửi lên máy chủ với hồ sơ con
      c.r1 = { link: await p.$eval(".rp-link", (b) => ({ h: Math.round(b.getBoundingClientRect().height), text: b.textContent.trim(), inFb: !!b.closest("#qzFb") })) };
      await p.click(".rp-link"); await p.waitForSelector(".report-box");
      c.r1.inline = await p.evaluate(() => { const b = document.querySelector(".report-box"); return !!b.closest("#qzFb") && getComputedStyle(b).position === "static" && !document.querySelector("#leaveBox"); });
      await p.click(".report-box [type=submit]"); c.r1.needReason = await text(p, ".rp-err");
      await p.click('.rsn .opt[data-r="wrong"]'); await p.fill(".report-note", "Đáp án phải là 6 080. " + "x".repeat(300));
      await shot(p, "c8c-bao-cau-sai");
      await p.click(".report-box [type=submit]"); await p.waitForSelector(".rp-done");
      c.r1.done = await text(p, ".rp-done");
      c.r1.after = await p.$eval(".rp-link", (b) => b.disabled + " " + b.textContent.trim());
      c.r1.key = await p.$eval(".rp-link", (b) => b.dataset.k);
      await shot(p, "c8d-bao-cau-sai-xong");
    }
    await p.click("#qzGo");
  }
  await p.waitForSelector(".score");
  c.ux5.result = await topBar(); // màn kết quả: thanh trên có lại hình đại diện
  // UX1: màn kết quả có lời khen, nút "Ôn lại N câu sai" (N = số câu sai), câu sai thu gọn (bấm mới mở)
  c.ux1.result = await p.evaluate(() => ({ praise: document.querySelector("#qzScore .praise").textContent, retry: document.querySelector("#qzRetry").textContent, n: document.querySelectorAll("details.rv").length, closed: [...document.querySelectorAll("details.rv")].every((d) => !d.open), again: document.querySelector("#qzAgain").textContent }));
  await shot(p, "c8h-ket-qua-de");
  // R1: màn kết quả: mỗi câu cần xem lại có link (mở câu sai ra mới bấm được); báo thêm một câu ở đó
  c.r1.result = await p.$$eval(".rv", (rows) => rows.length > 0 && rows.every((r) => r.querySelector(".rp-link")));
  await p.evaluate(() => document.querySelectorAll("details.rv").forEach((d) => (d.open = true)));
  await p.click(".rv .rp-link:not([disabled]) >> nth=0"); await p.click('.rsn .opt[data-r="unclear"]'); await p.click(".report-box [type=submit]"); await p.waitForSelector(".rv .rp-done");
  c.r1.server = await until(p, () => be.T.question_reports.filter((r) => r.profile_id === binId).length === 2);
  const rpRows = be.T.question_reports.filter((r) => r.profile_id === binId), rp1 = rpRows.find((r) => r.q_key === c.r1.key);
  c.r1.row = !!rp1 && rp1.family_id === acc.id && rp1.bank_id === "toan4-ck1-de1" && rp1.reason === "wrong" && rp1.note.length === 200 && rp1.q_text.length > 10 && rp1.q_text.length <= 500 && rp1.status === "new"
    && rpRows.some((r) => r.reason === "unclear" && r.bank_id === "toan4-ck1-de1");
  c.result = await until(p, () => be.T.results.some((r) => r.profile_id === binId && r.ref_id === "toan4-ck1-de1"));
  // UX1: ôn lại câu sai: lượt chỉ gồm các câu sai, xong không gửi thêm kết quả lên máy chủ
  const nServer = be.T.results.filter((r) => r.profile_id === binId).length;
  await p.click("#qzRetry"); await p.waitForSelector(".qcard");
  c.ux1.retryChip = await text(p, ".chip:last-child");
  for (let i = 0; i < 40 && !(await p.$(".score")); i++) { if (await p.$("#qzFill")) await p.fill("#qzFill", "1"); else await p.click(".opt >> nth=0"); await p.click("#qzGo"); await p.click("#qzGo"); }
  await p.waitForSelector(".score");
  c.ux1.retryResult = await text(p, "#qzScore"); await wait(p, 300);
  c.ux1.retryServer = be.T.results.filter((r) => r.profile_id === binId).length === nServer;
  /* Hồ sơ con là học sinh nên L15, L16, L18 (tests/e2e.js) cũng áp dụng ở bản đám mây. */
  const kidRes = () => p.evaluate((id) => Store.resultsFor(id).length, binId);
  const nKid = await kidRes();
  // L15: vào "Làm như thi" rồi bấm Back khi chưa trả lời câu nào: hỏi "Thoát đề?", thoát thì không lưu điểm
  await p.goto(BASE + "/#/home"); await wait(p); await p.goto(BASE + "/#/quiz/toan4-ck1-de1"); await wait(p);
  c.ux5.prev = await text(p, "#qPrev b"); c.ux5.modes = await p.$$eval(".modes .mode", (b) => b.map((x) => x.querySelector("b").textContent.replace(/\s+/g, " ")).join()); // UX5 (X9): thẻ "Lần trước", hai thẻ cách làm
  await p.click("#qExam");
  c.ux5.exam = { submit: await text(p, "#qzSubmit"), exit: !!(await p.$("#qzExit")), timer: await text(p, "#qzTimer"), top: await topBar() }; // UX5 (X6, X7): "Nộp bài", "Còn 40:00"
  await p.evaluate(() => history.back()); await p.waitForSelector("#leaveBox");
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
  // L18: nút đề ghi số đề lấy từ tên đề; K3: đề ngẫu nhiên đứng trước (tab Bài ôn, UX1)
  await p.goto(BASE + "/#/practice"); await p.waitForSelector("#allPractice");
  c.l18 = await p.evaluate(() => Object.fromEntries([...document.querySelectorAll("#allPractice details.grp")].map((g) => {
    const r = [...g.querySelectorAll(".subj")].find((x) => x.querySelector("b").textContent === "Toán");
    return [g.querySelector("summary b").textContent, r ? [...r.querySelectorAll(".des a")].map((a) => a.textContent).join() : ""];
  }).filter(([, v]) => v)));
  // K3: con làm đề ngẫu nhiên (kho gộp từ 3 đề Toán 4 cuối kì I, rút 25 câu theo ma trận): kết quả lên máy chủ với ref_id là mã pool
  await p.goto(BASE + "/#/quiz/toan4-ck1-ngau-nhien"); await p.waitForSelector("#qPractice");
  c.k3 = { intro: await text(p, ".hero"), kho: await p.evaluate(() => { const b = Store.bank("toan4-ck1-ngau-nhien"); return b.questions.length + "/" + b.n + "/" + Store.bank("toan4-ck1-de1").questions.length; }) };
  await shot(p, "c8b-de-ngau-nhien");
  await p.click("#qPractice");
  for (let i = 0; i < 40 && !(await p.$(".score")); i++) {
    if (await p.$("#qzFill")) await p.fill("#qzFill", "1"); else await p.click(".opt >> nth=0");
    await p.click("#qzGo"); await p.click("#qzGo");
  }
  await p.waitForSelector(".score");
  c.k3.again = await text(p, "#qzAgain");
  c.k3.server = await until(p, () => be.T.results.some((r) => r.profile_id === binId && r.ref_id === "toan4-ck1-ngau-nhien" && r.t === 25 && r.subject === "Toán"));
  c.k3.hist = await p.evaluate((id) => Object.keys((JSON.parse(localStorage.getItem("ontap_pool_v1") || "{}")[id + "|toan4-ck1-ngau-nhien"]) || {}).length, binId);
  await p.goto(BASE + "/#/account"); await wait(p);
  c.kidAccount = (await p.$("#switchWho")) && !(await p.$("#signOut")) && !(await p.$("#pwForm")) && !(await p.$("#qcBox"));
  c.ux3.kidSwitch = await text(p, "#switchWho");
  await shot(p, "c9-tai-khoan-con");
  // UX4 X4: chạm hình là đổi ngay (lên máy chủ), toast "Đã đổi hình đại diện", không có nút Lưu; hình ở đầu trang và thanh trên đổi theo
  c.ux4.account = await p.evaluate(() => ({ hint: document.querySelector("#avBox p").textContent, save: !!document.querySelector("#avBox [type=submit], #aForm"), h3: [...document.querySelectorAll("#view h3")].map((h) => h.textContent).join() }));
  await p.click('#avBox [data-emo="🐬"]'); await p.waitForSelector("#toast:not([hidden])");
  c.ux4.avatar = await p.evaluate((id) => ({ av: Store.user(id).avatar, toast: document.querySelector("#toast").textContent, head: document.querySelector("#acAv").textContent, top: document.querySelector("#who .av").textContent, pressed: document.querySelector('#avBox [aria-pressed="true"]').dataset.emo }), binId);
  c.ux4.avatarServer = await until(p, () => be.T.profiles.find((x) => x.id === binId).avatar === "🐬");
  await shot(p, "c9b-doi-hinh-dai-dien");
  await p.click("#switchWho"); await p.waitForSelector(WHO);
  await tile(p, "Na"); await p.waitForSelector("text=Chào Na"); // hồ sơ không có PIN: bấm là vào
  c.na = true;
  // TA2: Na làm một đề Tiếng Anh: màn mở đề, câu hỏi và lời giải, hộp hỏi khi rời (nút Back, "← Exit"), màn kết quả, thông báo lưu điểm
  // bằng tiếng Anh (bảng chữ của js/quiz.js), không có chữ cái tiếng Việt; kết quả lên máy chủ vẫn ghi môn và tên đề trong danh mục.
  await p.goto(BASE + "/#/quiz/ta6-gk1-de1"); await p.waitForSelector("#qPractice");
  c.ta2 = { open: await text(p, "#view"), h1: await text(p, ".hero h1"), lang: await p.$eval("#view > .stack", (e) => e.getAttribute("lang")) };
  await shot(p, "c8e-de-tieng-anh");
  await p.click("#qPractice");
  for (let i = 0; i < 2; i++) { if (await p.$("#qzFill")) await p.fill("#qzFill", "x"); else await p.click(".opt >> nth=1"); await p.click("#qzGo"); if (!i) { c.ta2.fb = await text(p, "#qzFb"); c.ta2.next = await text(p, "#qzGo"); } await p.click("#qzGo"); }
  await p.evaluate(() => history.back()); await p.waitForSelector("#leaveBox");
  c.ta2.leave = await text(p, "#leaveBox"); await p.click("#leaveNo"); await wait(p, 100);
  await p.click("#qzExit"); c.ta2.exit = await text(p, "#qzFb .confirm");
  await shot(p, "c8f-de-tieng-anh-dung-on");
  await p.click("#qzYes"); await p.waitForSelector(".score");
  c.ta2.result = await text(p, "#view"); c.ta2.toast = await text(p, "#toast");
  await shot(p, "c8g-de-tieng-anh-ket-qua");
  c.ta2.server = await until(p, () => be.T.results.some((r) => r.profile_id === naId && r.ref_id === "ta6-gk1-de1" && r.subject === "Tiếng Anh" && r.label === "Tiếng Anh 6 · Giữa kì I · Đề 1" && r.t === 2));
  await p.goto(BASE + "/#/admin/overview"); await wait(p);
  c.kidBlocked = !(await p.$("text=Khu phụ huynh"));
  await p.goto(BASE + "/#/admin/user/" + binId); await wait(p);
  c.kidBlocked = c.kidBlocked && !(await p.$("#uForm"));

  /* ---- tab mới trên máy đã ghi nhớ: vào khu phụ huynh phải nhập lại mật khẩu ---- */
  const p2 = await home.newPage();
  await p2.goto(BASE + "/"); await p2.waitForSelector(WHO);
  c.preselect = await p2.$eval(`.tile[aria-pressed="true"] .nm`, (x) => x.textContent).catch(() => ""); // máy nhớ hồ sơ chọn gần nhất (Na, không PIN: không tự vào)
  await tile(p2, "Phụ huynh"); await p2.waitForSelector("#pwBox:not([hidden])"); await wait(p2, 300);
  // UX4 X1: ô Phụ huynh là bước riêng: "← Chọn hồ sơ khác", hình, tên, tên gia đình · tên đăng nhập, ô mật khẩu, nút to "Vào khu phụ huynh", dòng "Quên mật khẩu?" từ js/config.js
  c.ux4.parent = await p2.evaluate(() => ({ hash: /^#\/vao\//.test(location.hash), scroll: scrollY, back: document.querySelector("#toList").textContent, who: document.querySelector("#pinWho").textContent.replace(/\s+/g, " ").trim(), go: document.querySelector("#pwGo").textContent, goH: Math.round(document.querySelector("#pwGo").getBoundingClientRect().height),
    contact: document.querySelector("#pwBox #contact") ? document.querySelector("#pwBox #contact a").getAttribute("href") + " · " + document.querySelector("#pwBox #contact").textContent.replace(/\s+/g, " ").trim() : "", pin: document.querySelector("#pinBox").hidden, tiles: document.querySelectorAll(".tile").length, quick: !!document.querySelector("#pwToPin"), help: !!document.querySelector("#pinHelp") }));
  await shot(p2, "c10-mat-khau-phu-huynh");
  await p2.fill("#pwIn", "sai-mat-khau"); await revealTry(p2, "#pwIn", "mật khẩu");
  await eye(p2, "#pwIn"); await p2.click("#pwGo"); await p2.waitForSelector("#pwErr .fb");
  c.wrongPw = await text(p2, "#pwErr");
  rvIs((await types(p2, "#pwIn")) === "password", "mật khẩu phụ huynh: gửi sai vẫn hiện");
  await p2.fill("#pwIn", PW); await p2.click("#pwGo"); await p2.waitForSelector("text=Khu phụ huynh");
  // UX2: thẻ của con (có bài hôm nay: số bài, điểm hôm nay, chuỗi ngày, kì thi gần nhất); bấm thẻ là mở báo cáo tuần, có hai link phụ
  await p2.waitForSelector(`a.kid[href="#/child/${binId}"]`); // "text=Khu phụ huynh" đã khớp nút "Vào khu phụ huynh" của màn mật khẩu
  c.ux3.gone = !(await p2.$("#start")); // UX3: con đã học (có kết quả, đã chọn hồ sơ trên máy này): thẻ Bắt đầu ẩn
  c.ux2.binCard = await p2.$eval(`a.kid[href="#/child/${binId}"]`, (k) => [...k.querySelectorAll(".stat")].map((s) => s.querySelector("b").textContent + " " + s.querySelector("span").textContent).join("|") + " " + (k.querySelector(".kid-ev") || {}).textContent.replace(/\s+/g, " "));
  await shot(p2, "c11-cac-con");
  await p2.click(`[data-child="${binId}"]`); await p2.waitForSelector(".report");
  c.report = await p2.evaluate(() => ({ n: +document.querySelector("#rpCount").textContent, subj: [...document.querySelectorAll("#rpSubjects .rp-sub b:first-child")].map((b) => b.textContent).join() }));
  c.ux2.report = await p2.evaluate(() => ({ hash: location.hash, back: document.querySelector("#view .linkbtn[data-go]").textContent, links: [...document.querySelectorAll("#rpLinks a")].map((a) => a.textContent + "=" + a.getAttribute("href")).join(), edit: !!document.querySelector("a[href^='#/admin/user/']") }));
  await shot(p2, "c12-bao-cao-tuan");
  await p2.click("#rpLinks a >> nth=1"); await p2.waitForSelector("#allPractice");
  c.ux2.practice = (await text(p2, "#view h2")) + " | " + (await text(p2, "#view .linkbtn[data-go]")) + " | " + (await p2.$$eval("#allPractice a.btn", (a) => a.length));
  await p2.click("#view .linkbtn[data-go]"); await p2.waitForSelector(".report");
  await p2.click("#rpLinks a >> nth=0"); await p2.waitForSelector("#parentCal");
  c.ux2.calFromReport = await p2.evaluate(() => location.hash + " " + document.querySelector('.tabs [data-g][aria-pressed="true"]').textContent.replace(/\s+/g, " "));
  // đổi mật khẩu (trang Tài khoản về Cài đặt)
  await p2.goto(BASE + "/#/account"); await p2.waitForSelector("#pwForm");
  c.ux2.accountBack = await text(p2, "#view .linkbtn[data-go]");
  await shot(p2, "c13-tai-khoan-phu-huynh");
  await p2.fill("#pwOld", "sai-mat-khau"); await p2.fill("#pwNew", PW2); await p2.fill("#pwNew2", PW2);
  await revealTry(p2, "#pwOld", "mật khẩu"); await eye(p2, "#pwOld");
  await p2.click("#pwForm [type=submit]");
  await p2.waitForSelector("#pwErr .fb");
  c.wrongOld = await text(p2, "#pwErr");
  rvIs((await types(p2, "#pwOld", "#pwNew", "#pwNew2")) === "password,password,password", "đổi mật khẩu: gửi sai vẫn hiện");
  await p2.fill("#pwOld", PW); await p2.click("#pwForm [type=submit]"); await p2.waitForSelector("text=Đã đổi mật khẩu");
  c.pwChanged = true;
  // UX3: trang Tài khoản: "Chọn hồ sơ khác"; ô mã mở nhanh (máy đã ghi nhớ): sai dạng thì báo, đặt mã 5 số thì băm và lưu trên máy theo mã gia đình
  c.ux3.parentSwitch = await text(p2, "#switchWho"); c.ux3.accountText = await text(p2, "#view");
  c.ux3.qc0 = await text(p2, "#qcBox");
  await p2.fill("#qcNew", "12"); await revealTry(p2, "#qcNew", "mã mở nhanh"); await p2.click("#qcSave"); await p2.waitForSelector("#qcErr .fb");
  c.ux3.qcErr = await text(p2, "#qcErr");
  await p2.fill("#qcNew", "24680"); await p2.click("#qcSave"); await p2.waitForSelector("#qcState");
  c.ux3.qc1 = { text: await text(p2, "#qcBox"), toast: await text(p2, "#toast"), ls: await p2.evaluate(() => JSON.parse(localStorage.getItem("ontap_cloud_quick") || "{}")) };
  await shot(p2, "c13b-ma-mo-nhanh");
  // UX3: tab mới nữa: ô Phụ huynh ghi "Nhập mã mở nhanh", bàn phím mã (nhãn "Mã mở nhanh", 5 chấm), sai thì báo (tính vào PinLock), link "Nhập mật khẩu" mở ô mật khẩu
  // (có "Dùng mã mở nhanh" quay lại), đúng mã thì vào khu phụ huynh; ở đó bỏ mã được rồi đặt lại
  const p3 = await home.newPage();
  await p3.goto(BASE + "/"); await p3.waitForSelector(WHO);
  c.ux3.tileSub = await p3.$eval('.tile:has(.nm:text-is("Phụ huynh")) .small', (x) => x.textContent);
  await tile(p3, "Phụ huynh"); await p3.waitForSelector("#pinBox:not([hidden])");
  c.ux3.pad = await p3.evaluate(() => ({ pw: document.querySelector("#pwBox").hidden, who: document.querySelector("#pinWho").textContent.replace(/\s+/g, " ").trim(), sub: document.querySelector("#pinSub").textContent, label: document.querySelector("#pinLabel").textContent,
    dots: document.querySelectorAll("#pinDots span").length, alt: document.querySelector("#pinAlt button").textContent, altAll: document.querySelector("#pinAlt").textContent.replace(/\s+/g, " ").trim(), altH: Math.round(document.querySelector("#pinAlt button").getBoundingClientRect().height) }));
  await pad(p3, "1111"); await revealTry(p3, "#pinIn", "mã mở nhanh"); await pad(p3, "1"); await p3.waitForSelector("#pinErr .fb");
  c.ux3.padWrong = (await text(p3, "#pinErr")) + " | " + (await p3.evaluate(() => (JSON.parse(localStorage.getItem("ontap_pinlock_v1") || "{}")["phu-huynh"] || {}).fails));
  await shot(p3, "c10b-ma-mo-nhanh");
  // UX4 X3: sai thêm 4 lần (đủ 5) thì phải đợi: đếm ngược ngay dưới hàng chấm, trên nút Hiện số và bàn phím; 12 nút bàn phím và Hiện số disabled;
  // rút ngắn còn 1,2 giây thì tự bật lại kèm "Bạn nhập lại được rồi."
  for (let i = 0; i < 4; i++) await pad(p3, "11111");
  await p3.waitForSelector("#pinWait");
  const lockUI3 = () => p3.evaluate(() => { const top = (s) => document.querySelector(s).getBoundingClientRect().top; return { dis: [...document.querySelectorAll(".pad button")].filter((b) => b.disabled).length, show: document.querySelector("#pinShow").disabled,
    order: top("#pinDots") < top("#pinErr") && top("#pinErr") < top("#pinShow") && top("#pinShow") < top(".pad"), err: document.querySelector("#pinErr").textContent.replace(/\s+/g, " ").trim(), fails: (JSON.parse(localStorage.getItem("ontap_pinlock_v1") || "{}")["phu-huynh"] || {}).fails }; });
  c.ux4.locked = await lockUI3();
  await shot(p3, "c10c-dang-doi");
  await p3.evaluate(() => { const o = JSON.parse(localStorage.getItem("ontap_pinlock_v1")); o["phu-huynh"].until = Date.now() + 1200; localStorage.setItem("ontap_pinlock_v1", JSON.stringify(o)); });
  await p3.waitForSelector("#pinErr .fb.ok", { timeout: 5000 });
  c.ux4.unlocked = await lockUI3();
  await p3.click("#pinToPw"); await p3.waitForSelector("#pwBox:not([hidden])");
  c.ux3.toPw = (await p3.$eval("#pinBox", (b) => b.hidden)) + " " + (await text(p3, "#pwToPin"));
  await p3.click("#pwToPin"); await p3.waitForSelector("#pinBox:not([hidden])");
  await pad(p3, "24680"); await p3.waitForSelector("#kids");
  c.ux3.padIn = (await text(p3, "#view h2")) + " | " + !(await p3.$("#start"));
  await p3.goto(BASE + "/#/account"); await p3.waitForSelector("#qcDrop");
  await p3.click("#qcDrop"); await p3.waitForFunction(() => !document.querySelector("#qcState") && document.querySelector("#qcBox"));
  c.ux3.dropped = (await p3.evaluate(() => localStorage.getItem("ontap_cloud_quick"))) === null && (await text(p3, "#toast")) === "Đã bỏ mã mở nhanh" && (await text(p3, "#qcSave")) === "Lưu mã";
  await p3.fill("#qcNew", "2468"); await p3.click("#qcSave"); await p3.waitForSelector("#qcState");
  await p3.close();
  // chuyển dữ liệu bản lưu trên máy
  await p2.evaluate((d) => localStorage.setItem("ontap_db_v1", JSON.stringify(d)), localData());
  await p2.goto(BASE + "/#/admin/data"); await wait(p2);
  c.migHint = /Trên iPhone, iPad: hãy chuyển trong Safari, nơi đang có dữ liệu, trước khi dùng app ở Màn hình chính/.test(await text(p2, "#migBox"));
  c.noHomeScreen = !(await p2.$("#homeScreen")); // hướng dẫn Màn hình chính (L17) chỉ ở bản lưu trên máy
  c.ux2.data = (await text(p2, "#view .linkbtn[data-go]")) + " | " + (await p2.$$eval("#view h2", (h) => h.pop().textContent)) + " | " + (await tabsOf(p2)) + " | " + !(await p2.$("#dSchool")) + " | " + !!(await p2.$("#dExport"));
  // R1: tab Dữ liệu của khu phụ huynh liệt kê câu đã báo kèm trạng thái, không có nút chép (đã lên máy chủ)
  c.r1.data = await p2.evaluate(() => { const b = document.querySelector("#reportsBox"); return { n: b.querySelectorAll(".item").length, head: b.querySelector("h3").textContent, chips: [...b.querySelectorAll(".chip")].map((x) => x.textContent).join(), copy: !!b.querySelector("#copyReports"), who: /Bin/.test(b.textContent) && /Toán 4 · Cuối kì I · Đề 1/.test(b.textContent.replace(/\s+/g, " ")) }; });
  await p2.click("#dMigrate"); await p2.waitForSelector("#migRes .fb");
  c.migrate = await text(p2, "#migRes");
  await shot(p2, "c14-du-lieu");
  // Bông (PIN cũ 4 số, chưa biết độ dài): gõ đủ 4 số thì thử lặng lẽ và vào được
  await p2.click("#switchWho"); await p2.waitForSelector(WHO);
  await tile(p2, "Bông"); await pad(p2, "4321");
  c.bong = await p2.waitForSelector("text=Chào Bông", { timeout: 3000 }).then(() => true, () => false);
  // đăng xuất
  await p2.goto(BASE + "/#/account"); await wait(p2);
  await p2.click("#switchWho"); await tile(p2, "Phụ huynh");
  await p2.waitForSelector("#kids, #pinBox:not([hidden]), #pwBox:not([hidden])"); // bước nhập riêng (UX4) vẽ sau khi đổi hash
  if (await p2.$("#pinBox:not([hidden])")) await pad(p2, "2468"); // vừa nhập mật khẩu trong 5 phút: không hỏi lại; quá thì bàn phím mã mở nhanh (UX3)
  else if (await p2.$("#pwBox:not([hidden])")) { await p2.fill("#pwIn", PW2); await p2.click("#pwGo"); }
  await p2.waitForSelector("text=Khu phụ huynh");
  // UX3b (X17): "Đăng xuất khỏi máy này" hỏi mật khẩu trước: hộp .confirm mở ngay dưới nút (chưa đăng xuất): dòng giải thích, ô mật khẩu có nút xem,
  // nút Đăng xuất / Thôi, dòng "Quên mật khẩu?" từ js/config.js; sai thì báo trong hộp, vẫn đăng nhập, tính vào PinLock của Phụ huynh; Thôi thì đóng; đúng thì về màn đăng nhập
  await p2.goto(BASE + "/#/account"); await p2.waitForSelector("#signOut");
  const failsOf = (pg) => pg.evaluate(() => (JSON.parse(localStorage.getItem("ontap_pinlock_v1") || "{}")["phu-huynh"] || {}).fails || 0);
  const fails0 = await failsOf(p2);
  await p2.click("#signOut"); await p2.waitForSelector("#outBox"); await wait(p2, 600); // hộp cuộn mượt vào khung nhìn: chờ xong rồi mới đo, chụp
  c.ux3b.out = await p2.evaluate(() => { const b = document.querySelector("#outBox"); return { under: b.parentElement.previousElementSibling.contains(document.querySelector("#signOut")), confirm: b.classList.contains("confirm"), text: b.textContent.replace(/\s+/g, " ").trim(),
    contact: b.querySelector("#contact a") && b.querySelector("#contact a").getAttribute("href"), focus: document.activeElement.id, yes: document.querySelector("#outYes").textContent, no: document.querySelector("#outNo").textContent, state: Store.authState() + " " + !!Store.sessionUser() }; });
  await shot(p2, "c13c-dang-xuat");
  await p2.fill("#outPw", "sai-mat-khau"); await revealTry(p2, "#outPw", "mật khẩu"); await eye(p2, "#outPw");
  await p2.click("#outYes"); await p2.waitForSelector("#outErr .fb");
  c.ux3b.outWrong = { err: await text(p2, "#outErr"), fails: (await failsOf(p2)) - fails0, state: await p2.evaluate(() => Store.authState() + " " + !!document.querySelector("#pwForm")) };
  rvIs((await types(p2, "#outPw")) === "password", "đăng xuất: gửi sai vẫn hiện");
  await shot(p2, "c13d-dang-xuat-sai");
  await p2.click("#outNo"); await wait(p2, 100);
  c.ux3b.outNo = !(await p2.$("#outBox")) && !!(await p2.$("#signOut")) && (await p2.evaluate(() => Store.authState())) === "ready";
  await p2.click("#signOut"); await p2.waitForSelector("#outBox");
  await p2.fill("#outPw", PW2); await p2.click("#outYes"); await p2.waitForSelector("#loginForm");
  const captchaBoxes = withCaptcha ? await p2.evaluate(() => window.turnstile.boxes.join()) + "," + await p.evaluate(() => window.turnstile.boxes.join()) : "";
  await p2.reload(); await p2.waitForSelector("#loginForm");
  c.signedOut = await p2.evaluate(() => !localStorage.getItem("ontap_sb_auth") && !sessionStorage.getItem("ontap_sb_auth"));
  c.ux3.cleared = await p2.evaluate(() => localStorage.getItem("ontap_cloud_quick") === null); // UX3: đăng xuất thì xóa mã mở nhanh
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
  await q.waitForSelector(WHO);
  const q2 = await other.newPage();
  await q2.goto(BASE + "/"); await q2.waitForSelector("form");
  c.notRemembered = !!(await q2.$("#loginForm"));
  // UX3: máy không ghi nhớ: ô Phụ huynh vẫn là mật khẩu (không có link mã), trang Tài khoản chỉ nhắc chọn "Ghi nhớ trên máy này", không có ô đặt mã
  await tile(q, "Phụ huynh"); await q.waitForSelector("#kids"); // vừa đăng nhập: không hỏi lại mật khẩu
  await q.goto(BASE + "/#/account"); await q.waitForSelector("#qcBox");
  c.ux3.noRemember = (await text(q, "#qcBox")) + " | " + !(await q.$("#qcNew"));
  await shot(q, "c14b-tai-khoan-chua-ghi-nho"); // UX3b (X20): lời nhắc đăng xuất rồi đăng nhập lại có ghi nhớ
  await q.goto(BASE + "/#/"); await wait(q);
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
  // R1: tab "Câu bị báo": gom theo câu, đếm số lần, lọc theo đề và trạng thái, nút Đã sửa / Bỏ qua / Mở lại
  await a.click('.tabs [data-go="#/reports"]'); await a.waitForSelector("#rpList");
  const rpState = () => a.evaluate(() => ({ stats: [...document.querySelectorAll("#rpStats .stat")].map((s) => s.querySelector("b").textContent + " " + s.querySelector("span").textContent).join(" | "),
    rows: [...document.querySelectorAll("#rpList .rp-item")].map((r) => r.querySelector("b").textContent + " · " + [...r.querySelectorAll(".chip")].map((c) => c.textContent).join("/") + " · " + [...r.querySelectorAll("[data-rp]")].map((b) => b.textContent).join("/")),
    banks: [...document.querySelectorAll("#rpBank option")].map((o) => o.textContent).join(), count: document.querySelector("#rpCount").textContent, file: /data\/banks\/4-toan\.js · toan4-ck1-de1 · mã câu/.test(document.querySelector("#rpList").textContent),
    reasons: /Đáp án sai · “Đáp án phải là 6 080/.test(document.querySelector("#rpList").textContent) && /Câu hỏi khó hiểu/.test(document.querySelector("#rpList").textContent) }));
  const st0 = await rpState();
  await shot(a, "c23-admin-cau-bi-bao");
  const nStatus = (st) => be.T.question_reports.filter((r) => r.status === st).length;
  const mark = async (sel, st, n) => { await a.click(sel); const ok = await until(a, () => nStatus(st) === n); await wait(a, 200); return ok; }; // chờ máy chủ nhận rồi vẽ lại
  const fixedKey = await mark('#rpList .rp-item >> nth=0 >> [data-st="fixed"]', "fixed", 1);
  const st1 = await rpState();
  await a.selectOption("#rpSt", "all"); const st2 = await rpState();
  await a.selectOption("#rpBank", "toan4-ck1-de1"); const st3 = await rpState();
  const reopened = await mark('#rpList .rp-item [data-st="new"]', "new", 2);
  await a.selectOption("#rpSt", "new"); await a.selectOption("#rpBank", "");
  const rejected = await mark('#rpList .rp-item >> nth=1 >> [data-st="rejected"]', "rejected", 1);
  ad.reports = { st0, st1, st2, st3, fixedKey, reopened, rejected, rows: (await rpState()).rows.length };
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
      && /^Máy này còn dữ liệu ôn tập cũ \(1 học sinh, 1 kết quả\)\. Đăng nhập tài khoản gia đình, rồi vào Khu phụ huynh → Cài đặt → Chuyển dữ liệu và sao lưu\.$/.test(c.oldData.text)
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
    "L16: bài ôn trong khung chỉ hỏi khi đang làm một lượt (#endBtn); IOE là bài Tiếng Anh nên hộp hỏi bằng tiếng Anh (TA2)": !c.l16.idleAsk && c.l16.runAsk && /Leave this practice\?/.test(c.l16.text) && c.l16.same,
    "L18: nút đề ghi số đề theo tên đề; K3: đề ngẫu nhiên đứng trước": c.l18["Kiểm tra cuối học kì I"] === "Đề ngẫu nhiên,Đề 1,Đề 2,Đề 3" && c.l18["Kiểm tra giữa học kì II"] === "Đề ngẫu nhiên,Đề 1,Đề 2",
    "K3: đề ngẫu nhiên rút 25 câu từ kho 75 câu (3 đề), kết quả lên máy chủ với ref_id là mã pool, lịch sử câu trên máy": /25 câu rút từ kho 75 câu \(3 đề\)/.test(c.k3.intro) && c.k3.kho === "75/25/25"
      && c.k3.again === "Làm đề khác" && c.k3.server && c.k3.hist === 25,
    "R1: link “Báo câu này sai” (≥ 44px) dưới lời giải và ở từng câu cần xem lại; hộp lí do mở tại chỗ; phải chọn lí do; gửi xong cảm ơn, link thành “Đã báo câu này”":
      c.r1.link.h >= 44 && c.r1.link.text === "Báo câu này sai" && c.r1.link.inFb && c.r1.inline && /chọn một lí do/.test(c.r1.needReason) && /Cảm ơn bạn/.test(c.r1.done)
      && c.r1.after === "true Đã báo câu này" && c.r1.result,
    "R1: báo cáo lên máy chủ (hồ sơ con, gia đình, mã đề, mã câu, nội dung câu ≤ 500, ghi chú cắt 200, trạng thái mới); tab Dữ liệu liệt kê kèm trạng thái": c.r1.server && c.r1.row
      && c.r1.data.n === 2 && c.r1.data.head === "Câu bị báo sai (2)" && c.r1.data.chips === "Mới,Mới" && !c.r1.data.copy && c.r1.data.who,
    "TA2: đề Tiếng Anh: màn mở đề, câu hỏi, hộp hỏi khi rời, màn kết quả, thông báo lưu điểm bằng tiếng Anh, không có chữ tiếng Việt; kết quả lên máy chủ vẫn ghi môn Tiếng Anh": c.ta2.h1 === "English 6 · Mid-term 1 · Test 1" && c.ta2.lang === "en"
      && [c.ta2.open, c.ta2.fb, c.ta2.leave, c.ta2.exit, c.ta2.result, c.ta2.toast].every((t) => t && !CHU_VIET.test(t)) && /Choose a mode ?PracticeSee the answer and guide right after each question\. No timer\. ?Test mode · 45 minutesTimed like at school, scored when you finish\./.test(c.ta2.open)
      && /Report a problem$/.test(c.ta2.fb) && c.ta2.next === "Next question" && c.ta2.leave === "End practice and leave?Your answers so far will be saved. End practiceKeep practising"
      && c.ta2.exit === "End practice and see your results?End practiceKeep going" && /^English 6 · Mid-term 1 · Test 1 · Practice /.test(c.ta2.result) && /\/2 correctTime: /.test(c.ta2.result)
      && /Go to home$/.test(c.ta2.result) && c.ta2.toast === "Result saved" && c.ta2.server,
    "UX1: trang “Hôm nay” của con có thanh tab dưới (4 tab, ≥ 44px), thẻ gợi ý, chuỗi ngày, huy hiệu; thanh trên không có nút Lịch thi; màn đề không có thanh tab; một dòng nhãn trên câu":
      c.ux1.tabs === "Hôm nay*,Bài ôn,Lịch thi,Kết quả" && c.ux1.tabH && c.ux1.today && !c.ux1.cal && c.ux1.tabbed && c.ux1.quizTabs && /^Toán · \S/.test(c.ux1.label) && !c.ux1.label.includes("|"),
    "UX1: màn kết quả có lời khen, nút “Ôn lại N câu sai”, câu sai thu gọn; lượt ôn lại chỉ gồm câu sai và không gửi thêm kết quả lên máy chủ":
      /^(Xuất sắc|Giỏi lắm|Khá tốt|Được rồi|Chưa sao), Bin[!.]/.test(c.ux1.result.praise) && c.ux1.result.retry === `Ôn lại ${c.ux1.result.n} câu sai` && c.ux1.result.n > 0 && c.ux1.result.closed && c.ux1.result.again === "Làm lại cả đề"
      && c.ux1.retryChip === `Câu 1/${c.ux1.result.n}` && /· Ôn lại câu sai /.test(c.ux1.retryResult) && /Lượt ôn lại câu sai không lưu điểm\./.test(c.ux1.retryResult) && c.ux1.retryServer,
    "UX5: làm đề tập trung (thanh trên chỉ còn chữ OnUp, màn kết quả có lại); làm như thi có “Nộp bài”, “Còn 40:00”; màn mở đề có thẻ “Lần trước” và hai thẻ cách làm":
      c.ux5.run.quizzing && !c.ux5.run.av && c.ux5.exit === "← Thoát" && c.ux5.prog === "Câu 1/25" && !c.ux5.result.quizzing && c.ux5.result.av
      && /^Lần trước: \d+(,\d+)?\/25 câu đúng$/.test(c.ux5.prev) && c.ux5.modes === "Ôn luyện,Làm như thi · 40 phút"
      && c.ux5.exam.submit === "Nộp bài" && !c.ux5.exam.exit && /^Còn (40:00|39:5\d)$/.test(c.ux5.exam.timer) && c.ux5.exam.top.quizzing && !c.ux5.exam.top.av,
    "UX2: khu phụ huynh có ba mục Các con · Lịch thi · Cài đặt; nút Lịch thi trên cùng và #/calendar về tab Lịch thi; thêm hồ sơ xong về Các con": c.ux2.tabs === "Các con*,Lịch thi,Cài đặt" && c.ux2.topCal === "#/admin/events"
      && /^Bắt đầu trong 3 bước/.test(c.ux2.empty) && c.ux2.afterAdd === "#/admin/overview" && c.ux2.calRedirect === "#/admin/events",
    "UX2: tab Các con: mỗi con một thẻ (chưa có bài: Chưa ôn · – · 0; kì thi gần nhất còn N ngày · chưa ôn …), không có ô số liệu trùng ý; thẻ có bài hôm nay ghi số bài, điểm hôm nay":
      /^#\/child\/\S+ Chưa ôn hôm nay\|– điểm TB tuần\|0 chuỗi ngày Kiểm tra giữa học kì I còn \d+ ngày · chưa ôn Toán, Tiếng Việt; #\/child\/\S+ Chưa ôn hôm nay\|– điểm TB tuần\|0 chuỗi ngày Kiểm tra giữa học kì I còn \d+ ngày · chưa ôn Ngữ văn, Toán, KHTN và 5 môn khác$/.test(c.ux2.kids.cards)
      && !c.ux2.kids.extraStats && c.ux2.kids.h2 === "Khu phụ huynh" && c.ux2.kids.count === "2/5 hồ sơ" && c.ux2.kids.add && /^Bấm vào thẻ của con/.test(c.ux2.kids.hint)
      && /^2 bài hôm nay\|\d+(,\d+)? điểm hôm nay\|1 chuỗi ngày Kiểm tra giữa học kì I còn \d+ ngày · chưa ôn Tiếng Việt$/.test(c.ux2.binCard),
    "UX2: tab Lịch thi: khối của các con (Lớp 4 · Bin, Lớp 6 · Na), gom theo tháng; kì thi dự kiến có nút “Trường đã báo lịch? Sửa ngày” (≥ 44px), kì khác có “Sửa ngày, bài ôn”":
      c.ux2.cal.tabs === "Các con,Lịch thi*,Cài đặt / Cả hai khối*,Lớp 4 · Bin,Lớp 6 · Na" && c.ux2.cal.fix === "Trường đã báo lịch? Sửa ngày" && c.ux2.cal.fixH >= 44 && c.ux2.cal.tent && c.ux2.cal.edit === "#/admin/event/ioe-truong"
      && c.ux2.cal.months >= 6 && c.ux2.cal.grades.split(",").every((g) => /^(4|6|46)$/.test(g)) && c.ux2.calG6,
    "UX2: hộp sửa ngày mở ngay dưới kì thi, ô chọn “lịch chính thức” bật sẵn; thiếu ngày thì báo; Lưu thì bỏ cờ dự kiến, lên máy chủ, hộp đóng": c.ux2.fixBox.after && c.ux2.fixBox.start === "2026-11-02" && c.ux2.fixBox.end === "2026-11-13" && c.ux2.fixBox.official
      && /^Trường đã báo lịch\? Sửa ngày cho đúng\. ?Kiểm tra giữa học kì I/.test(c.ux2.fixBox.text) && /Chọn ngày thi/.test(c.ux2.fixErr) && c.ux2.fixed.toast === "Đã lưu ngày thi" && !c.ux2.fixed.box && !c.ux2.fixed.tent
      && c.ux2.fixed.date === "4/11đến 6/11" && c.ux2.fixed.act === "Sửa ngày, bài ôn" && c.ux2.fixed.ev.start === "2026-11-04" && c.ux2.fixed.ev.end === "2026-11-06" && c.ux2.fixed.ev.tentative === false && c.ux2.fixServer,
    "UX2: Cài đặt: Hồ sơ con (2/5), Đề tự soạn, Thông tin chung, rồi Chuyển dữ liệu và sao lưu, Tài khoản; #/admin/users về đây; trang Đề tự soạn (đề có sẵn thu gọn), nhập đề, Dữ liệu, Tài khoản về Cài đặt":
      c.ux2.settings.tabs === "Các con,Lịch thi,Cài đặt*" && c.ux2.settings.h3 === "Hồ sơ con (2/5),Đề tự soạn,Thông tin chung" && c.ux2.settings.kids === 2 && c.ux2.settings.info
      && c.ux2.settings.links === "Xem đề tự soạn=#/admin/banks,+ Nhập đề=#/admin/bank/new,Chuyển dữ liệu và sao lưu=#/admin/data,Tài khoản=#/account"
      && c.ux2.banks.tabs === "Cài đặt" && c.ux2.banks.back === "← Cài đặt" && c.ux2.banks.h2 === "Đề tự soạn" && /^Chưa có đề tự soạn/.test(c.ux2.banks.mine) && !c.ux2.banks.seedOpen && c.ux2.banks.seedN === c.ux2.banks.seedAll && c.ux2.banks.seedN > 20 && c.ux2.banks.add === "+ Nhập đề"
      && c.ux2.bankForm === "Nhập đề | ← Đề tự soạn | Lưu đề" && c.ux2.data === "← Cài đặt | Chuyển dữ liệu và sao lưu | Các con,Lịch thi,Cài đặt* | true | true" && c.ux2.accountBack === "← Cài đặt",
    "UX2: bấm thẻ của con là mở báo cáo tuần (#/child/<mã>), có “← Các con”, Sửa hồ sơ, link Lịch thi lớp 4 (chọn sẵn khối) và Bài ôn của Bin (xem thử)": c.ux2.report.hash === "#/child/" + binId && c.ux2.report.back === "← Các con" && c.ux2.report.edit
      && c.ux2.report.links === `Lịch thi lớp 4=#/admin/events?g=4,Bài ôn của Bin=#/child/${binId}/practice` && /^Bài ôn lớp 4 của Bin \| ← Báo cáo của Bin \| \d+$/.test(c.ux2.practice) && c.ux2.calFromReport === "#/admin/events?g=4 Lớp 4 · Bin",
    "UX3: thẻ “Bắt đầu trong 3 bước” ở đầu mục Các con: chưa có con thì chỉ có thẻ (bước 1 đang làm, nút thêm trong thẻ, “Cho con học” mờ); có con thì bước 1 xong, bước 3 đang làm, nút bật ≥ 52px và mở “Ai đang học?”; con đã học thì thẻ ẩn":
      !!c.ux3.start0 && c.ux3.start0.steps === "now:Thêm hồ sơ con|:Đặt mã PIN (không bắt buộc)|:Đưa máy cho con" && c.ux3.start0.disabled && c.ux3.start0.add && c.ux3.start0.first === "start" && c.ux3.start0.rows === 0 && c.ux3.start0.link2 === ""
      && /^Bắt đầu trong 3 bước 1Thêm hồ sơ conTên, khối, lớp và hình đại diện\. App không hỏi ngày sinh hay ảnh của con\.\+ Thêm hồ sơ con 2Đặt mã PIN \(không bắt buộc\)Để anh chị em không vào nhầm hồ sơ của nhau\. 3Đưa máy cho conBấm “Cho con học”, con chọn hồ sơ của mình rồi bắt đầu ôn\. Cho con học Nút này mở màn hình “Ai đang học\?” khi đã có hồ sơ con\.$/.test(c.ux3.start0.text)
      && !!c.ux3.start2 && c.ux3.start2.steps === "done:Thêm hồ sơ con|:Đặt mã PIN (không bắt buộc)|now:Đưa máy cho con" && !c.ux3.start2.disabled && c.ux3.start2.h >= 52 && c.ux3.start2.first === "start" && c.ux3.start2.rows === 1
      && /✓Thêm hồ sơ conĐã có 2 hồ sơ: Bin, Na\. 2Đặt mã PIN \(không bắt buộc\)Bin đã có mã PIN\. Na chưa có\.Đặt mã PIN cho Na 3Đưa máy cho con/.test(c.ux3.start2.text) && /Lúc khác, bấm “Chọn hồ sơ khác” ở góc trên\.$/.test(c.ux3.start2.text)
      && c.ux3.letStudy && c.ux3.gone,
    "UX3b (X19): bước 2 chưa ✓ khi Na chưa có mã: ghi “Bin đã có mã PIN. Na chưa có.”, link “Đặt mã PIN cho Na” mở thẳng hồ sơ của Na; mọi con có mã thì ✓ “Bin, Na đã có mã PIN.”, hết link; nút “Cho con học” vẫn bật":
      c.ux3.start2.link2 === `#/admin/user/${naId}?tu=batdau · Đặt mã PIN cho Na` && c.ux3b.pinSave.start.steps === "done:Thêm hồ sơ con|done:Đặt mã PIN (không bắt buộc)|now:Đưa máy cho con"
      && /✓Đặt mã PIN \(không bắt buộc\)Bin, Na đã có mã PIN\. 3Đưa máy cho con/.test(c.ux3b.pinSave.start.text) && c.ux3b.pinSave.start.link2 === "" && !c.ux3b.pinSave.start.disabled,
    "UX3b (X18): link từ thẻ mở form của Na với ô Mã PIN được focus, nút quay lại về Các con; lưu có mã thì về Các con, toast “Đã đặt mã PIN cho Na”, lên máy chủ; để trống thì toast “Đã lưu”; mở từ chỗ khác thì không focus, về Cài đặt như UX2":
      c.ux3b.form.hash === `#/admin/user/${naId}?tu=batdau` && c.ux3b.form.focus === "uPin" && c.ux3b.form.name === "Na" && c.ux3b.form.back === "#/admin/overview"
      && c.ux3b.emptySave === "#/admin/overview | Đã lưu | done:Thêm hồ sơ con|:Đặt mã PIN (không bắt buộc)|now:Đưa máy cho con"
      && c.ux3b.pinSave.hash === "#/admin/overview" && c.ux3b.pinSave.toast === "Đã đặt mã PIN cho Na" && c.ux3b.pinSave.server
      && c.ux3b.settingsForm.focus !== "uPin" && c.ux3b.settingsForm.back === "#/admin/settings" && c.ux3b.noPin === "#/admin/settings | Đã lưu | true",
    "UX3: “Đổi người học” thành “Chọn hồ sơ khác” ở khu phụ huynh và trang Tài khoản của phụ huynh, của con": c.ux3.switchTxt === "Chọn hồ sơ khác" && c.ux3.parentSwitch === "Chọn hồ sơ khác" && c.ux3.kidSwitch === "Chọn hồ sơ khác"
      && /chỉ cần “Chọn hồ sơ khác”/.test(c.ux3.accountText) && !/Đổi người học/.test(c.ux3.accountText),
    "UX3: mã mở nhanh: trang Tài khoản trên máy đã ghi nhớ đặt được mã 4–6 số (sai dạng thì báo; băm, lưu trên máy theo mã gia đình, muối ghi độ dài), bỏ mã được; máy không ghi nhớ chỉ nhắc, không có ô":
      /^Mã mở nhanh khu phụ huynh Trên máy này, bạn gõ mã 4–6 số ở màn hình “Ai đang học\?” là vào khu phụ huynh, không phải gõ mật khẩu\. Quên mã thì nhập mật khẩu như cũ\. Đổi mật khẩu và đăng xuất vẫn cần mật khẩu\. Mã mở nhanh \(4–6 số\) Lưu mã /.test(c.ux3.qc0)
      && c.ux3.qcErr === "Mã mở nhanh gồm 4–6 chữ số." && /bạn gõ mã 5 số /.test(c.ux3.qc1.text) && /Máy này đã có mã mở nhanh\. Mã mới \(4–6 số\) Đổi mãBỏ mã /.test(c.ux3.qc1.text) && c.ux3.qc1.toast === "Đã lưu mã mở nhanh"
      && Object.keys(c.ux3.qc1.ls).join() === acc.id && /^5\.[0-9a-f]{16}\$s256:[0-9a-f]{64}$/.test(c.ux3.qc1.ls[acc.id]) && c.ux3.dropped
      // UX3b (X20): không có chữ "băm"; máy chưa ghi nhớ thì nói rõ phải đăng xuất rồi đăng nhập lại và chọn "Ghi nhớ trên máy này"
      && /Mã chỉ lưu trên máy này, không gửi đi đâu; máy khác muốn dùng thì đặt riêng\. Đăng xuất thì mã bị xóa\.$/.test(c.ux3.qc0) && !/băm/i.test(c.ux3.qc0 + c.ux3.qc1.text + c.ux3.noRemember)
      && /chỉ đặt được trên máy đã ghi nhớ đăng nhập\. Máy này chưa ghi nhớ đăng nhập\. Muốn đặt mã: bấm “Đăng xuất khỏi máy này”, rồi đăng nhập lại và chọn “Ghi nhớ trên máy này”\. \| true$/.test(c.ux3.noRemember),
    "UX3, UX4 (A5b): tab mới trên máy đã ghi nhớ: ô Phụ huynh ghi “Nhập mã mở nhanh”, bước riêng mở bàn phím mã (dòng “Nhập mã mở nhanh của máy này”, nhãn Mã mở nhanh, 5 chấm), sai thì báo và tính vào khóa tạm, dòng “Quên mã? Nhập mật khẩu” (≥ 44px) mở ô mật khẩu có “Dùng mã mở nhanh”, đúng mã thì vào khu phụ huynh; đăng xuất thì xóa mã":
      c.ux3.tileSub === "Nhập mã mở nhanh" && c.ux3.pad.pw && c.ux3.pad.who === "🌻Phụ huynh" + "Nhà Bin · nha.bin" && c.ux3.pad.sub === "Nhập mã mở nhanh của máy này" && c.ux3.pad.label === "Mã mở nhanh" && c.ux3.pad.dots === 5
      && c.ux3.pad.alt === "Nhập mật khẩu" && c.ux3.pad.altAll === "Quên mã?Nhập mật khẩu" && c.ux3.pad.altH >= 44 && c.ux3.padWrong === "Mã mở nhanh chưa đúng. Thử lại nhé. | 1" && c.ux3.toPw === "true Dùng mã mở nhanh" && c.ux3.padIn === "Khu phụ huynh | true" && c.ux3.cleared,
    "UX4: chạm hồ sơ có PIN thì sang bước nhập riêng (#/vao/<mã>): không cuộn, tên và 12 nút bàn phím trong khung nhìn 760px, không còn danh sách, “← Chọn hồ sơ khác”, hình, tên, lớp, nút chữ “Hiện số”, dòng quên PIN; ô #pinIn ẩn khỏi mắt; lỗi ngay dưới hàng chấm":
      c.ux4.enter.hash && c.ux4.enter.scroll === 0 && c.ux4.enter.name === "Bin" && c.ux4.enter.nameIn && c.ux4.enter.pad && c.ux4.enter.tiles === 0 && c.ux4.enter.back === "← Chọn hồ sơ khác" && c.ux4.enter.whoOK && c.ux4.enter.sub === "Nhập mã PIN của bạn"
      && c.ux4.enter.show === "Hiện sốGiấu số" && c.ux4.enter.inputW <= 1 && c.ux4.enter.help === "Quên mã PIN? Nhờ bố mẹ đặt lại trong Khu phụ huynh → Cài đặt → Hồ sơ con." && c.ux4.enter.dots === 4 && c.ux4.errOrder,
    "UX4: ô Phụ huynh là bước riêng: “← Chọn hồ sơ khác”, hình, tên, tên gia đình · tên đăng nhập, ô mật khẩu, nút “Vào khu phụ huynh” (≥ 44px), dòng “Quên mật khẩu?” từ js/config.js; không có bàn phím, dòng quên PIN":
      c.ux4.parent.hash && c.ux4.parent.scroll === 0 && c.ux4.parent.back === "← Chọn hồ sơ khác" && c.ux4.parent.who === "🌻Phụ huynhNhà Bin · nha.bin" && c.ux4.parent.go === "Vào khu phụ huynh" && c.ux4.parent.goH >= 44
      && c.ux4.parent.contact === CONTACT + " · Quên mật khẩu?Nhắn Zalo cho cô Lan" && c.ux4.parent.pin && c.ux4.parent.tiles === 0 && !c.ux4.parent.quick && !c.ux4.parent.help,
    "UX4: sai 5 lần mã mở nhanh thì đếm ngược ngay dưới hàng chấm, 12 nút bàn phím và Hiện số disabled; hết giờ thì bật lại kèm “Bạn nhập lại được rồi.”":
      c.ux4.locked.dis === 12 && c.ux4.locked.show && c.ux4.locked.order && /^Mã mở nhanh chưa đúng\. Đợi (30|29) giây rồi thử lại\.$/.test(c.ux4.locked.err) && c.ux4.locked.fails === 5
      && c.ux4.unlocked.dis === 0 && !c.ux4.unlocked.show && c.ux4.unlocked.order && c.ux4.unlocked.err === "Bạn nhập lại được rồi.",
    "UX4: trang Tài khoản của con: thẻ Hình đại diện chạm là đổi ngay (lên máy chủ), toast “Đã đổi hình đại diện”, hình đầu trang và thanh trên đổi theo, không có nút Lưu":
      c.ux4.account.hint === "Chạm vào hình là đổi ngay." && !c.ux4.account.save && c.ux4.account.h3 === "Hình đại diện" && c.ux4.avatar.av === "🐬" && c.ux4.avatar.toast === "Đã đổi hình đại diện" && c.ux4.avatar.head === "🐬" && c.ux4.avatar.top === "🐬" && c.ux4.avatar.pressed === "🐬" && c.ux4.avatarServer,
    "trang tài khoản của con: chọn hồ sơ khác, không đăng xuất, không đổi mật khẩu, không có ô mã mở nhanh": !!c.kidAccount,
    "hồ sơ không PIN bấm là vào; con không vào được khu phụ huynh bằng địa chỉ": c.na && c.kidBlocked,
    "tab mới: nhớ hồ sơ chọn gần nhất, khu phụ huynh phải nhập lại mật khẩu": c.preselect === "Na" && /Mật khẩu chưa đúng/.test(c.wrongPw),
    "báo cáo tuần đọc kết quả từ máy chủ (Đề 1 và đề ngẫu nhiên)": c.report.n === 2 && c.report.subj === "Toán",
    "đổi mật khẩu: sai mật khẩu hiện tại thì báo": /hiện tại chưa đúng/.test(c.wrongOld) && c.pwChanged,
    "chuyển dữ liệu máy này: 1 hồ sơ con, 1 kết quả; PIN cũ dùng được": /1 hồ sơ con mới, 1 kết quả/.test(c.migrate) && c.bong,
    "chuyển dữ liệu: nhắc iPhone, iPad chuyển trong Safari; không có hướng dẫn Màn hình chính của bản trên máy": c.migHint && c.noHomeScreen,
    "đăng xuất: xóa phiên, tải lại vẫn ở trang đăng nhập": c.signedOut,
    "UX3b (X17): “Đăng xuất khỏi máy này” hỏi mật khẩu: hộp mở ngay dưới nút (chưa đăng xuất), dòng giải thích, ô mật khẩu có nút xem, nút Đăng xuất / Thôi, dòng “Quên mật khẩu?”; sai thì báo trong hộp, vẫn đăng nhập, tính vào khóa tạm; Thôi thì đóng; đúng thì về màn đăng nhập; CAPTCHA (khi bật) đặt trong hộp":
      c.ux3b.out.under && c.ux3b.out.confirm && /^Đăng xuất khỏi máy này\? Nhập mật khẩu của bố mẹ để xác nhận\. Mã mở nhanh không dùng được ở đây\. Mật khẩu của bố mẹ /.test(c.ux3b.out.text) && /Đăng xuấtThôi Quên mật khẩu\?Nhắn Zalo cho cô Lan$/.test(c.ux3b.out.text)
      && c.ux3b.out.contact === CONTACT && c.ux3b.out.focus === "outPw" && c.ux3b.out.yes === "Đăng xuất" && c.ux3b.out.no === "Thôi" && c.ux3b.out.state === "ready true"
      && c.ux3b.outWrong.err === "Mật khẩu chưa đúng. Thử lại nhé." && c.ux3b.outWrong.fails === 1 && c.ux3b.outWrong.state === "ready true" && c.ux3b.outNo && c.signedOut && c.ux3.cleared
      && (!withCaptcha || /outCaptcha/.test(captchaBoxes)),
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
    "admin: tab Câu bị báo (gom theo câu, đếm số lần, lọc theo đề và trạng thái, Đã sửa / Bỏ qua / Mở lại)": ad.reports.st0.stats === "2 câu chưa xử lí | 2 câu bị báo | 2 lượt báo"
      && ad.reports.st0.rows.length === 2 && ad.reports.st0.rows.every((r) => /^Toán 4 · Cuối kì I · Đề 1 · Mới · Đã sửa\/Bỏ qua$/.test(r)) && ad.reports.st0.banks === "Mọi đề,Toán 4 · Cuối kì I · Đề 1"
      && ad.reports.st0.count === "2 câu" && ad.reports.st0.file && ad.reports.st0.reasons
      && ad.reports.st1.rows.length === 1 && /1 câu chưa xử lí/.test(ad.reports.st1.stats) && ad.reports.st1.count === "Thấy 1/2 câu" && ad.reports.fixedKey
      && ad.reports.st2.rows.length === 2 && ad.reports.st2.rows.some((r) => /Đã sửa · Mở lại$/.test(r)) && ad.reports.st3.rows.length === 2
      && ad.reports.reopened && ad.reports.rejected && ad.reports.rows === 1,
    "admin: đăng xuất; CAPTCHA (khi bật) khi đăng nhập": ad.out && (!withCaptcha || ad.captcha === "adCaptcha,adCaptcha,adCaptcha"),
    "admin: không đi qua service worker; cùng bản supabase-js với trang học": ad.swSkip && ad.lib,
    "U1: nút xem mật khẩu, mã PIN, mã mở nhanh (lPass, pwNew, pwNew2, pwIn, uPin, pwOld, qcNew, pinIn, outPw, adPass): hiện, ẩn, giữ giá trị và focus; gửi form, xóa hết ô thì ẩn lại": rv.length === 0,
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
