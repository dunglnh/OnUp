/* Chạy giao diện bản đám mây trong Chromium với máy chủ Supabase giả (tests/supabase/fake-backend.js) và Edge Function
   admin thật (chủ app tạo tài khoản). Trình duyệt gọi máy chủ giả qua page.exposeFunction, không cần mạng.
   Chạy: python3 -m http.server 8000 &  rồi  node tests/supabase/cloud-e2e.js   (in "CLOUD E2E OK")
   Luồng: đăng nhập tên đăng nhập + mật khẩu (ghi nhớ; thẻ “Chưa có tài khoản?”, thẻ nhắc dữ liệu cũ của bản lưu trên máy)
   → bắt đổi mật khẩu tạm → khu phụ huynh (thẻ “Bắt đầu trong 3 bước”, UX3) → thêm hồ sơ con (PIN 4 số tùy chọn) → “Cho con học” mở
   “Ai đang học?” → con nhập PIN, làm đề, kết quả lên máy chủ (con thứ hai làm một đề Tiếng Anh: màn làm đề bằng tiếng Anh, TA2;
   UX6: máy chủ giả làm lượt gửi kết quả lỗi (be.failResults) → màn kết quả ghi “Sẽ gửi cho bố mẹ khi có mạng”, trang chính có dòng
   “1 bài chưa gửi” → tắt lỗi, bấm Gửi lại; khu phụ huynh trên cùng máy cũng có dòng đó)
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
/* Dữ liệu của app nạp trong node (như run.sh): lịch mặc định và danh mục đề, cho kiểm tra "tài khoản cũ nhận lịch mới". */
const loadData = (f) => { const c = { window: {} }; c.window.window = c.window; require("vm").runInNewContext(fs.readFileSync(path.join(__dirname, "..", "..", f), "utf8"), c); return c.window; };
const SEED_EVENTS = loadData("data/calendar-2026-2027.js").ONTAP_SEED_EVENTS, SEED_BANK_IDS = loadData("data/banks/index.js").ONTAP_SEED_BANKS.map((b) => b.id);
const HIDDEN_GRADE = "Lớp (1|2|3|5|7|8|9|10|11|12)(,|$)"; // chữ "Lớp …" của khối chưa bật: không được hiện ở đâu (Lịch các khối mới)
/* Cả lần chạy dùng một ngày "hôm nay" cố định, không theo ngày chạy (L28), như tests/e2e.js: mỗi lượt (sáng, tối) tạo máy chủ giả với
   be.clock bắt đầu ở TODAY; Edge Function admin và mọi context (device()) theo cùng giờ đó, giờ đi như thường. Chữ mong đợi theo kì thi
   gần nhất (thẻ của con “Kiểm tra giữa học kì I còn N ngày”, nhóm kì thi ở tab Bài ôn) ghi theo ngày này. */
const TODAY = "2026-10-21T07:00:00";
const OUT = path.join(__dirname, "..", "screenshots", "cloud");
fs.mkdirSync(OUT, { recursive: true });
const FAKE_CLIENT = fs.readFileSync(path.join(__dirname, "fake-client.js"), "utf8");
const CONTACT = "https://zalo.me/0912345678", SIGNUP = "https://zalo.me/0912345678?moi", SIGNUP_TXT = "Nhắn Zalo cho cô Lan để được mời";
/* signup: điền signupText, signupUrl (thẻ “Chưa có tài khoản?”); không thì để trống, thẻ phải dùng contactText, contactUrl. */
const config = (siteKey, signup) => `window.ONTAP_CONFIG = { supabaseUrl: "https://fake.supabase.co", supabaseAnonKey: "anon-key", turnstileSiteKey: ${JSON.stringify(siteKey || "")},
  contactText: "Nhắn Zalo cho cô Lan", contactUrl: ${JSON.stringify(CONTACT)}, signupText: ${JSON.stringify(signup ? SIGNUP_TXT : "")}, signupUrl: ${JSON.stringify(signup ? SIGNUP : "")} };`;
/* Thay cho script Cloudflare Turnstile (không có mạng): trả mã hợp lệ sau một chút, ghi lại ô đã dùng. */
const TURNSTILE_STUB = `window.turnstile = { n: 0, boxes: [], render(host, o) { this.boxes.push(host.id || "?"); const t = "ok-" + Date.now() + "-" + (++this.n); setTimeout(() => o.callback(t), 20); return this.n; }, remove() {} };`;
/* Bảng chia sẻ của máy (navigator.share) giả lập cho nút "Gửi báo cáo" (UX8, như tests/e2e.js): ghi lại dữ liệu được truyền vào. */
const SHARE_STUB = () => {
  window.__share = { calls: [] };
  Object.defineProperty(navigator, "share", { configurable: true, value: (d) => { __share.calls.push(d); return Promise.resolve(); } });
};

/* Như audit trong tests/e2e.js: ở 360px không tràn ngang; mọi button, a.btn, .linkbtn, summary đang hiện cao ≥ 44px; chữ ≥ 13px; chữ không đè
   lên nhau, không tràn khỏi ô, không đè lên ô nhập, hình (chủ app yêu cầu 22/10/2026; cách đo ghi ở audit của tests/e2e.js, hai bản giống nhau);
   không có hai phần tử cùng id, kể cả phần tử đang ẩn (X33, Phiên UX7b). */
const audit = () => {
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
  if (document.documentElement.scrollWidth > innerWidth) bad.push("tràn ngang: rộng " + document.documentElement.scrollWidth + "px");
  document.querySelectorAll("button, a.btn, .linkbtn, summary").forEach((el) => { const h = el.getBoundingClientRect().height; if (shown(el) && h < 44) bad.push(`nút "${el.textContent.trim().slice(0, 24)}" cao ${Math.round(h)}px`); });
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = tw.nextNode());) {
    const el = n.parentElement, fs = parseFloat(getComputedStyle(el).fontSize);
    if (n.textContent.trim() && shown(el) && fs < 13) bad.push(`chữ "${n.textContent.trim().slice(0, 24)}" ${fs}px`);
  }
  return [...new Set(bad)];
};
/* Phiên UI2 (X32), như btnTone của tests/e2e.js: màu đã vẽ của nút (nền, chữ, opacity) và màu đã tính của token line, muted, sun, sun-ink.
   Nút chính, phím Vào bị tắt: nền line, chữ muted, opacity 1 (offTone); bật: nền sun, chữ sun-ink (onTone). */
const btnTone = (sel) => { const b = document.querySelector(sel), s = getComputedStyle(b), tok = (v) => { const i = document.createElement("i"); i.style.color = `var(${v})`; document.body.appendChild(i); const c = getComputedStyle(i).color; i.remove(); return c; };
  return { dis: b.disabled, bg: s.backgroundColor, color: s.color, op: s.opacity, line: tok("--line"), muted: tok("--muted"), sun: tok("--sun"), sunInk: tok("--sun-ink") }; };
const offTone = (t) => !!t && t.dis && t.bg === t.line && t.color === t.muted && t.op === "1";
const onTone = (t) => !!t && !t.dis && t.bg === t.sun && t.color === t.sunInk && t.op === "1";

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
  be.clock = new Date(TODAY) - Date.now(); // máy chủ giả ở TODAY (L28); Edge Function admin và trình duyệt (device()) dùng cùng giờ
  const { createHandler, LOGIN_DOMAIN } = await (await import(pathToFileURL(path.join(__dirname, "load-edge.mjs")).href)).loadEdgeFunction();
  be.functions.admin = createHandler({ db: createFakeSupabase((m) => be.handle(m), { service: true }), getUser: be.getUser, now: () => new Date(Date.now() + be.clock) });
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
  async function device() { // chỗ duy nhất tạo context của trang học và trang admin
    const ctx = await browser.newContext({ viewport: { width: 360, height: 760 }, deviceScaleFactor: 2, colorScheme: scheme });
    await ctx.clock.install({ time: new Date(Date.now() + be.clock) }); // đồng hồ giả lập cùng giờ với máy chủ giả (L28)
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
  // UX2: khu phụ huynh còn ba mục Các con · Lịch thi · Cài đặt; thanh trên không có nút Lịch thi (lịch thi chỉ ở tab, 20/10/2026)
  const tabsOf = (pg) => pg.$$eval(".tabs button", (b) => b.map((x) => x.textContent + (x.getAttribute("aria-pressed") === "true" ? "*" : "")).join());
  c.ux2 = { tabs: await tabsOf(p), topCal: !!(await p.$(".who a")), empty: await text(p, "#kids") };
  // UX3: chưa có hồ sơ con: mục Các con chỉ có thẻ "Bắt đầu trong 3 bước" (bước 1 đang làm, nút thêm trong thẻ), "Cho con học" mờ; nút góc trên là "Chọn hồ sơ khác"
  const startOf = (pg) => pg.evaluate(() => { const st = document.querySelector("#start"); return st ? { steps: [...st.querySelectorAll(".step")].map((x) => x.className.replace("step", "").trim() + ":" + x.querySelector("b").textContent).join("|"),
    text: st.textContent.replace(/\s+/g, " ").trim(), disabled: document.querySelector("#letStudy").disabled, h: Math.round(document.querySelector("#letStudy").getBoundingClientRect().height),
    add: !!st.querySelector("a.btn[href='#/admin/user/new?role=student']"), first: document.querySelector("#kids").firstElementChild.id, rows: document.querySelectorAll("#kids > .row").length,
    link2: [...st.querySelectorAll(".step:nth-child(2) a")].map((a) => a.getAttribute("href") + " · " + a.textContent).join() } : null; }); // link2: link đặt mã PIN của bước 2 (UX3b)
  c.ux3 = { start0: await startOf(p), switchTxt: await text(p, "#switchWho") }; c.ux3b = {}; // ux3b: các kiểm tra của Phiên UX3b
  c.ui2 = { letOff: await p.evaluate(btnTone, "#letStudy") }; // UI2 (X32): "Cho con học" bị tắt: nền line, chữ muted, không mờ

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
  c.ui2.letOn = await p.evaluate(btnTone, "#letStudy");
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
  c.ux2.cal = await p.evaluate((re) => ({ tabs: [...document.querySelectorAll(".tabs")].map((t) => [...t.children].map((b) => b.textContent.replace(/\s+/g, " ") + (b.getAttribute("aria-pressed") === "true" ? "*" : "")).join()).join(" / "),
    fix: (document.querySelector('[data-fix="gk1-l4"]') || {}).textContent, fixH: Math.round((document.querySelector('[data-fix="gk1-l4"]') || { getBoundingClientRect: () => ({}) }).getBoundingClientRect().height),
    tent: !!document.querySelector('[data-ev="gk1-l4"] .tag.warn'), edit: (document.querySelector('[data-ev="ioe-truong"] + .ev-act a') || {}).getAttribute("href"), months: document.querySelectorAll(".month").length,
    // Lịch các khối mới: chỉ kì thi của khối 4, 6 (khối của các con), không có kì thi hay chữ "Lớp …" của khối chưa bật; mốc năm học ghi "Lớp 4, 6"
    only46: [...document.querySelectorAll("[data-ev]")].every((b) => Store.event(b.dataset.ev).grades.some((g) => g === 4 || g === 6)), n: document.querySelectorAll("[data-ev]").length,
    shown: Store.events().filter((e) => e.grades.some((g) => g === 4 || g === 6)).length, all: Store.events().length, kg: document.querySelector('[data-ev="khai-giang"] .t b').textContent.replace(/\s+/g, " "),
    hidden: [...document.querySelectorAll("[data-ev] .t b")].some((b) => new RegExp(re).test(b.textContent)) }), HIDDEN_GRADE);
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
  c.ux2.banks = await p.evaluate(() => ({ tabs: document.querySelector('.tabs [aria-pressed="true"]').textContent, back: document.querySelector("#view .linkbtn[data-go]").textContent, h2: [...document.querySelectorAll("#view h2")].map((h) => h.textContent).join(), mine: document.querySelector("#myBanks").textContent.trim(),
    seedOpen: document.querySelectorAll("#seedBanks details[open]").length, seedN: document.querySelectorAll("#seedBanks .item").length, seedAll: Store.banks().filter((b) => b.seed).length, add: (document.querySelector("a[href='#/admin/bank/new']") || {}).textContent }));
  await shot(p, "c5b-de-tu-soan");
  await p.click("a[href='#/admin/bank/new']"); await p.waitForSelector("#bForm");
  c.ux2.bankForm = (await text(p, "#view h2")) + " | " + (await text(p, "#view .linkbtn[data-go]")) + " | " + (await text(p, "#bForm [type=submit]"));
  /* UX7 (X11–X13, docs/CAI-TIEN-UX-2X.md mục 3): Sửa kì thi ck1-l4: chỉ đề lớp 4 (số đề bằng Store.banks(4)), tìm "toan de 2" chỉ còn đề Toán 4
     có "Đề 2", "Hiện cả đề của khối khác" thêm Toán 6; chọn một đề Toán 6 rồi ẩn khối khác: đề đó vẫn hiện; Lưu lên máy chủ đủ lựa chọn cũ cộng
     đề lớp 6; mở lại vẫn đủ, bỏ đề lớp 6 rồi Lưu thì máy chủ về như cũ. Trang Đề tự soạn: đề có sẵn theo tab khối (mặc định Lớp 4, khối của
     con đầu), ô tìm. Nhập đề có một câu bị bỏ, một câu thiếu phần: thẻ viền đỏ, Lưu thì hỏi lại; gắn vào kì thi cuối năm (ck2-l4, để không
     đổi bài ôn gần nhất của các bước sau) thì đề lên máy chủ và đứng đầu danh sách đề của kì thi đó; rồi xóa đề (kì thi bỏ đề theo). */
  const UX7_SRC = "# Phép cộng\n345 678 + 254 322 = ?\n* 600 000\n- 590 000\n> Cộng từ phải sang trái.\n\n1 000 000 − 456 789 = [543211|543 211]\nMức: Rất khó\n\n"
    + "# Đo lường\nMột sợi dây dài 2 m, cắt đi 0,75 m. Đoạn còn lại dài bao nhiêu mét?\nĐáp số: một phẩy hai lăm m";
  const ebShown = () => p.$$eval("#ePick .ck:not([hidden]) input[name=eb]", (i) => i.map((x) => x.value).sort().join());
  const ebChecked = () => p.$$eval("#ePick input[name=eb]:checked", (i) => i.map((x) => x.value).sort().join());
  const de2 = (gs) => p.evaluate((gs) => Store.banks().filter((b) => gs.includes(+b.grade) && b.subject === "Toán" && / · Đề 2$/.test(b.title)).map((b) => b.id).sort().join(), gs);
  const evRow = (id) => be.T.exam_events.find((x) => x.family_id === acc.id && x.id === id) || {};
  await p.goto(BASE + "/#/admin/event/ck1-l4"); await p.waitForSelector("#ePick");
  const ck0 = await ebChecked(), toan6 = await p.evaluate(() => Store.banks(6).find((b) => b.subject === "Toán" && / · Đề 2$/.test(b.title)).id);
  /* X33 (Phiên UX7b): dòng khối đang hiện là #ePickScope, hiện ra (cao hơn 0), đổi chữ theo link “Hiện cả đề của khối khác” và ô Khối;
     ô Phạm vi kiến thức (#eScope) không bị ghi chữ vào, Lưu lên máy chủ giữ nguyên phạm vi kiến thức. */
  const scopeLine = () => p.$eval("#ePickScope", (x) => (x.getBoundingClientRect().height > 0 ? x.textContent : "(không hiện)"));
  const scope0 = await p.evaluate(() => Store.event("ck1-l4").scope);
  c.ux7 = { only4: (await ebShown()) === (await p.evaluate(() => Store.banks(4).map((b) => b.id).sort().join())), n: await text(p, "#ePickN"),
    nWant: await p.evaluate(() => Store.event("ck1-l4").banks.length + Store.event("ck1-l4").modules.length + " đã chọn"), head: await text(p, "#ePickH"),
    scope: [await scopeLine()], scopeIn: await p.$eval("#eScope", (x) => [x.tagName, x.value === Store.event("ck1-l4").scope, x.textContent].join("|")) };
  await shot(p, "c5c-sua-ki-thi");
  await p.fill("#eFind", "toan de 2");
  c.ux7.find = (await ebShown()) === (await de2([4])) && (await de2([4])).split(",").length >= 2;
  await p.click("#eAll");
  c.ux7.findAll = (await ebShown()) === (await de2([4, 6])) && (await de2([6])).includes(toan6);
  c.ux7.scope.push(await scopeLine());
  await shot(p, "c5d-sua-ki-thi-tim");
  await p.click(`#ePick input[value="${toan6}"]`); await p.click("#eAll"); await p.fill("#eFind", "");
  c.ux7.sticky = (await ebShown()).split(",").includes(toan6) && (await text(p, "#eAll")) === "Hiện cả đề của khối khác";
  await p.uncheck('input[name=eg][value="4"]'); c.ux7.scope.push(await scopeLine());
  await p.check('input[name=eg][value="4"]'); c.ux7.scope.push(await scopeLine());
  const ck1 = await ebChecked();
  await p.click("#eForm [type=submit]"); await p.waitForSelector("#parentCal");
  c.ux7.saved = ck1 === ck0.split(",").concat(toan6).sort().join() && await until(p, () => (evRow("ck1-l4").banks || []).slice().sort().join() === ck1);
  c.ux7.scopeSaved = scope0.length > 10 && evRow("ck1-l4").scope === scope0;
  await p.goto(BASE + "/#/admin/event/ck1-l4"); await p.waitForSelector("#ePick");
  c.ux7.reopen = (await ebChecked()) === ck1 && (await ebShown()).split(",").includes(toan6);
  await p.click(`#ePick input[value="${toan6}"]`); await p.click("#eForm [type=submit]"); await p.waitForSelector("#parentCal");
  c.ux7.restored = await until(p, () => (evRow("ck1-l4").banks || []).slice().sort().join() === ck0);
  /* X34 (Phiên UX7b): nhóm môn theo lịch thi. Sửa kì thi giữa kì I lớp 4 (môn thi Toán, Tiếng Việt): Bài ôn dạng trang, Toán, Tiếng Việt
     đứng đầu, rồi các môn khác theo lịch thi lớp 4; nhóm Toán: đề giữa kì I trước đề cuối kì I, đề ngẫu nhiên đầu mỗi kì. */
  await p.goto(BASE + "/#/admin/event/gk1-l4"); await p.waitForSelector("#ePick");
  c.ux7.order = await p.evaluate(() => { const g = [...document.querySelectorAll("#ePick .pk-g")].filter((d) => !d.hidden);
    return { subj: Store.event("gk1-l4").subjects.join(), groups: g.map((d) => d.querySelector("b").textContent).join(),
      toan: [...g[1].querySelectorAll(".ck")].filter((x) => !x.hidden).map((x) => x.textContent.replace(/\s+/g, " ").trim()).slice(0, 7).join("|") }; });
  // Đề tự soạn: đề có sẵn theo tab khối, ô tìm
  await p.goto(BASE + "/#/admin/banks"); await p.waitForSelector("#seedFind");
  c.ux7.list = await p.evaluate(() => ({ tabs: [...document.querySelectorAll("#seedBanks .tabs button")].map((b) => b.textContent + (b.getAttribute("aria-pressed") === "true" ? "*" : "")).join(),
    want: [4, 6].map((g, i) => `Lớp ${g} · ${Store.banks(g).filter((b) => b.seed).length} đề` + (i ? "" : "*")).join(), first: !!(document.querySelector("#myBanks").compareDocumentPosition(document.querySelector("#seedBanks")) & Node.DOCUMENT_POSITION_FOLLOWING),
    groups: [4, 6].map((g) => [...document.querySelectorAll(`.sb-g[data-sg="${g}"] .grp`)].map((d) => d.querySelector("b").textContent).join()).join(" / "), // X34: môn theo lịch thi của khối
    toan4: [...document.querySelectorAll('.sb-g[data-sg="4"] .grp:first-child a.item b')].map((x) => x.textContent.replace(/\s+/g, " ")).slice(0, 7).join("|") }));
  await p.fill("#seedFind", "toan de 2");
  c.ux7.list.find = await p.$$eval(".sb-g:not([hidden]) a.item:not([hidden])", (a) => a.map((x) => x.getAttribute("href").slice(7)).sort().join()) === (await de2([4]));
  await shot(p, "c5e-de-co-san-tim");
  // nhập đề có lỗi, gắn vào kì thi
  await p.goto(BASE + "/#/admin/bank/new"); await p.waitForSelector("#bForm");
  await p.fill("#bTitle", "Ôn tổng hợp · tuần 7"); await p.selectOption("#bGrade", "4"); await p.fill("#bSubj", "Toán");
  await p.fill("#bSrc", UX7_SRC); await p.click("#bCheck");
  c.ux7.prev = await p.evaluate(() => [...document.querySelectorAll(".pv-card")].map((x) => x.id + (x.hasAttribute("data-bad") ? "!" : "")).join() + " | " + document.querySelector("#pv3 .tag.bad").textContent + " | " + document.querySelector("#pv2 .fb.bad").textContent);
  await shot(p, "c5f-nhap-de-loi");
  await p.selectOption("#bEvent", "ck2-l4");
  await p.click("#bForm [type=submit]"); await p.waitForSelector("#bAskBox");
  c.ux7.ask = await p.$eval("#bAskBox > div", (d) => d.textContent);
  await shot(p, "c5g-nhap-de-hoi-lai");
  await p.click("#bAskYes"); await p.waitForSelector("#myBanks .item");
  const newId = await p.evaluate(() => (Store.banks().find((b) => b.title === "Ôn tổng hợp · tuần 7") || {}).id);
  c.ux7.saved = { toast: await text(p, "#toast"), row: await text(p, "#myBanks .item"),
    server: await until(p, () => { const r = be.T.question_banks.find((x) => x.family_id === acc.id && x.id === newId); return !!r && r.questions.length === 2 && (evRow("ck2-l4").banks || [])[0] === newId; }) };
  await shot(p, "c5h-de-tu-soan-sau-khi-luu");
  await p.goto(BASE + "/#/admin/bank/" + newId); await p.waitForSelector("#bDel");
  c.ux7.linked = await text(p, "#bLinked");
  await p.click("#bDel"); await p.click("#bdYes"); await p.waitForSelector("#myBanks");
  c.ux7.removed = await until(p, () => !be.T.question_banks.some((x) => x.family_id === acc.id && x.id === newId) && !(evRow("ck2-l4").banks || []).includes(newId));
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
  // UX6 (X10, D1): bài gửi được thì màn kết quả ghi “Đã lưu và gửi cho bố mẹ.” (trong ô điểm, nền ok-soft, chữ ok), thông báo cùng ý
  const savedOf = (page) => page.$eval("#qzSaved", (e) => { const cs = getComputedStyle(e); return { text: e.textContent, cls: e.className, shown: !e.hidden, inScore: !!e.closest("#qzScore"), bg: cs.backgroundColor, color: cs.color, icon: !!e.querySelector("svg") }; }).catch(() => null);
  const tok = (page, n) => page.evaluate((n) => { const i = document.createElement("i"); i.style.color = `var(--${n})`; document.body.append(i); const x = getComputedStyle(i).color; i.remove(); return x; }, n);
  await p.waitForSelector("#qzSaved:not([hidden])");
  c.ux6 = { first: await savedOf(p), firstToast: await text(p, "#toast"), tok: { ok: await tok(p, "ok"), okSoft: await tok(p, "ok-soft"), sunSoft: await tok(p, "sun-soft"), ink: await tok(p, "ink") } };
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
  c.ux1.retryChip = await text(p, "#qzProg"); // 9n: tiến độ là nút mở bảng số câu
  for (let i = 0; i < 40 && !(await p.$(".score")); i++) { if (await p.$("#qzFill")) await p.fill("#qzFill", "1"); else await p.click(".opt >> nth=0"); await p.click("#qzGo"); await p.click("#qzGo"); }
  await p.waitForSelector(".score");
  c.ux1.retryResult = await text(p, "#qzScore"); await wait(p, 300);
  c.ux6.retryHidden = await p.$eval("#qzSaved", (e) => e.hidden && !e.textContent); // lượt ôn lại câu sai không lưu điểm: không có dòng gửi cho bố mẹ
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
  // K3: con làm đề ngẫu nhiên (kho gộp từ 3 đề Toán 4 cuối kì I và 31 câu riêng của ngân hàng, Phiên N1; rút 25 câu theo ma trận):
  // kết quả lên máy chủ với ref_id là mã pool. Kho có đủ các dạng câu: mỗi câu trả lời đại cho đủ để bấm Kiểm tra; câu tự luận
  // không tính vào số câu chấm tự động (t), đã xem gợi ý nên vẫn vào lịch sử câu (cả 25 câu).
  await p.goto(BASE + "/#/quiz/toan4-ck1-ngau-nhien"); await p.waitForSelector("#qPractice");
  c.k3 = { intro: await text(p, ".hero"), kho: await p.evaluate(() => { const b = Store.bank("toan4-ck1-ngau-nhien"); return b.questions.length + "/" + b.n + "/" + Store.bank("toan4-ck1-de1").questions.length; }), essays: 0 };
  await shot(p, "c8b-de-ngau-nhien");
  await p.click("#qPractice");
  const answerAny = async () => {
    if (await p.$("#qzFill")) await p.fill("#qzFill", "1");
    else if (await p.$("#qzNum")) await p.fill("#qzNum", "1");
    else if (await p.$("#qzEssay")) { c.k3.essays++; await p.fill("#qzEssay", "Bài giải"); }
    else if (await p.$(".tf4")) for (let k = 0; k < 4; k++) await p.click(`.tf4 .opt[data-i="${k}"][data-v="1"]`);
    else if (await p.$(".mt-li")) { const n = (await p.$$(".mt-li")).length; for (let k = 0; k < n; k++) { await p.click(`.mt-li[data-i="${k}"]`); await p.click(`.mt-ri >> nth=${k}`); } }
    else if (await p.$(".ord-p")) { const n = (await p.$$(".ord-p")).length; for (let k = 0; k < n; k++) await p.click(".ord-p:not([hidden]) >> nth=0"); }
    else await p.click(".opts .opt >> nth=0");
  };
  for (let i = 0; i < 40 && !(await p.$(".score")); i++) { await answerAny(); await p.click("#qzGo"); await p.click("#qzGo"); }
  await p.waitForSelector(".score");
  c.k3.again = await text(p, "#qzAgain");
  c.k3.server = await until(p, () => be.T.results.some((r) => r.profile_id === binId && r.ref_id === "toan4-ck1-ngau-nhien" && r.t === 25 - c.k3.essays && r.subject === "Toán"));
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
  /* Hình đại diện vẽ riêng (hải cẩu, chủ app yêu cầu 22/10/2026): mã "hai-cau-con" lên máy chủ như emoji (cột avatar ≤ 16 kí tự); đầu
     trang, thanh trên và ô hồ sơ ở "Ai đang học?" vẽ <img class="art" src="icons/avatars/hai-cau-con.svg">. Bin giữ hình này đến hết. */
  await p.click('#avBox [data-emo="hai-cau-con"]'); await p.waitForFunction(() => Store.sessionUser().avatar === "hai-cau-con");
  const artIn = (sel) => p.waitForFunction((sel) => { const i = document.querySelector(sel + " img.art"); return !!i && i.complete && i.naturalWidth > 0 && i.getAttribute("src") === "icons/avatars/hai-cau-con.svg"; }, sel, { timeout: 5000 }).then(() => true, () => false);
  c.art = { head: await artIn("#acAv"), top: await artIn("#who .av"), seals: await p.$$eval('#avBox [data-emo^="hai-cau-"][aria-label] img.art', (x) => x.length) };
  c.art.server = await until(p, () => be.T.profiles.find((x) => x.id === binId).avatar === "hai-cau-con");
  await shot(p, "c9c-hinh-hai-cau");
  await p.click("#switchWho"); await p.waitForSelector(WHO);
  c.art.tile = await p.waitForFunction(() => { const t = [...document.querySelectorAll(".tile")].find((x) => (x.querySelector(".nm") || {}).textContent === "Bin"), i = t && t.querySelector(".av img.art");
    return !!i && i.complete && i.naturalWidth > 0 && i.getAttribute("src") === "icons/avatars/hai-cau-con.svg"; }, null, { timeout: 5000 }).then(() => true, () => false);
  await tile(p, "Na"); await p.waitForSelector("text=Chào Na"); // hồ sơ không có PIN: bấm là vào
  c.na = true;
  /* UX6 (X10): bài đã gửi cho bố mẹ chưa (làm với Na để số bài của Bin ở các kiểm tra khác giữ nguyên). cloud-e2e gọi máy chủ giả qua
     exposeFunction, không qua mạng, nên context.setOffline không làm lượt gửi lỗi được: bật be.failResults (mọi lệnh ghi vào bảng results
     lỗi như mất mạng). Không dùng sự kiện online (sự kiện đó cũng tự gửi lại, kết quả sẽ phụ thuộc bên nào chạy trước): tắt công tắc rồi
     bấm “Gửi lại”. quick(id, n): mở đề, ôn luyện n câu (câu điền, câu trả lời bằng số gõ 1, câu khác chọn ô đầu; đề Toán 6 cuối kì I
     có câu trả lời bằng số từ Phiên N4) rồi “← Thoát” → Dừng, đợi dòng #qzSaved hiện. */
  const naRes = () => be.T.results.filter((r) => r.profile_id === naId).length;
  const quick = async (id, n) => {
    if (p.url().endsWith("#/quiz/" + id)) { await p.goto(BASE + "/#/home"); await p.waitForSelector("#today"); } // cùng địa chỉ thì không mở lại đề
    await p.goto(BASE + "/#/quiz/" + id); await p.waitForSelector("#qPractice"); await p.click("#qPractice");
    for (let i = 0; i < n; i++) { if (await p.$("#qzFill")) await p.fill("#qzFill", "1"); else if (await p.$("#qzNum")) await p.fill("#qzNum", "1"); else await p.click(".opt >> nth=0"); await p.click("#qzGo"); await p.click("#qzGo"); }
    await p.click("#qzExit"); await p.click("#qzYes"); await p.waitForSelector(".score"); await p.waitForSelector("#qzSaved:not([hidden])");
  };
  const n0 = naRes();
  be.failResults = true;
  await quick("toan6-ck1-de1", 2); // D2: chưa gửi được
  c.ux6.wait = await savedOf(p); c.ux6.waitToast = await text(p, "#toast"); c.ux6.waitServer = naRes() === n0;
  await shot(p, "c8i-chua-gui");
  await p.goto(BASE + "/#/home"); await p.waitForSelector("#unsent"); // D3: trang chính có dòng “1 bài chưa gửi cho bố mẹ · Gửi lại”
  c.ux6.bar = await p.$eval("#unsent", (e) => { const cs = getComputedStyle(e), b = e.querySelector("#sendNow"); return { text: e.querySelector(".grow").textContent, btn: b.textContent, h: Math.round(e.getBoundingClientRect().height), btnH: Math.round(b.getBoundingClientRect().height),
    bg: cs.backgroundColor, color: cs.color, beforeToday: !!(e.compareDocumentPosition(document.querySelector("#today")) & Node.DOCUMENT_POSITION_FOLLOWING) }; });
  await shot(p, "c8j-bai-chua-gui");
  // Gửi lại khi máy chủ vẫn lỗi: báo chưa gửi được, dòng còn nguyên, trang không vẽ lại (số bài chưa gửi không đổi)
  await p.$eval("#unsent", (e) => (e.dataset.mark = "1"));
  await p.click("#sendNow"); await p.waitForFunction(() => /^Chưa gửi được/.test(document.querySelector("#toast").textContent));
  c.ux6.retryFail = { toast: await text(p, "#toast"), bar: await text(p, "#unsent .grow"), same: await p.$eval("#unsent", (e) => e.dataset.mark === "1"), server: naRes() === n0 };
  be.failResults = false;
  await p.click("#sendNow"); await p.waitForSelector("#unsent", { state: "detached" });
  c.ux6.retryOK = { toast: await text(p, "#toast"), server: await until(p, () => naRes() === n0 + 1 && be.T.results.some((r) => r.profile_id === naId && r.ref_id === "toan6-ck1-de1")), outbox: await p.evaluate(() => localStorage.getItem("ontap_cloud_outbox")) };
  await quick("toan6-ck1-de2", 1); // lượt sau: đã lưu và gửi
  c.ux6.sent = await savedOf(p); c.ux6.sentToast = await text(p, "#toast");
  c.ux6.sentServer = await until(p, () => be.T.results.some((r) => r.profile_id === naId && r.ref_id === "toan6-ck1-de2"));
  await shot(p, "c8k-da-gui");
  // Máy chủ trả lời chậm hơn thời gian app chờ (4 giây; be.delayResults): màn kết quả ghi chưa gửi trước, gửi xong thì đổi thành đã gửi
  // trên đúng màn đó. Lượt sau bấm “Ôn lại câu sai” ngay khi bài trước còn đang gửi: màn kết quả của lượt ôn lại (không lưu điểm) không bị ghi.
  // aSkip: trả lời một câu, bỏ qua một câu (chắc chắn có câu sai) rồi “← Thoát” → Dừng.
  const aSkip = async () => {
    if (await p.$("#qzFill")) await p.fill("#qzFill", "1"); else if (await p.$("#qzNum")) await p.fill("#qzNum", "1"); else await p.click(".opt >> nth=0");
    await p.click("#qzGo"); await p.click("#qzGo"); await p.click("#qzSkip");
    await p.click("#qzExit"); await p.click("#qzYes"); await p.waitForSelector("#qzRetry");
  };
  be.delayResults = 6000;
  const n3 = naRes();
  await p.goto(BASE + "/#/quiz/toan6-ck1-de1"); await p.waitForSelector("#qPractice"); await p.click("#qPractice");
  await aSkip();
  await p.waitForSelector("#qzSaved:not([hidden])", { timeout: 8000 });
  c.ux6.slow = { first: await savedOf(p), server: naRes() === n3 };
  await p.$eval("#qzSaved", (e) => (e.dataset.mark = "1"));
  await p.waitForFunction(() => /^Đã lưu và gửi/.test(document.querySelector("#qzSaved").textContent), null, { timeout: 10000 });
  c.ux6.slow.after = await savedOf(p); c.ux6.slow.same = await p.$eval("#qzSaved", (e) => e.dataset.mark === "1"); c.ux6.slow.toast = await text(p, "#toast");
  c.ux6.slow.sent = naRes() === n3 + 1;
  await p.click("#qzAgain"); await p.waitForSelector(".qcard"); await aSkip();
  await p.click("#qzRetry"); await p.waitForSelector(".qcard");
  for (let i = 0; i < 10 && !(await p.$("#qzScore")); i++) { if (await p.$("#qzFill")) await p.fill("#qzFill", "1"); else if (await p.$("#qzNum")) await p.fill("#qzNum", "1"); else await p.click(".opt >> nth=0"); await p.click("#qzGo"); await p.click("#qzGo"); }
  await p.waitForSelector("#qzScore");
  c.ux6.slow.retryRound = /Ôn lại câu sai/.test(await text(p, "#qzScore .label"));
  for (let i = 0; i < 100 && naRes() !== n3 + 2; i++) await wait(p, 100); // lượt gửi chậm của lượt trước xong khi đang ở màn ôn lại
  c.ux6.slow.sent2 = naRes() === n3 + 2; await wait(p, 400);
  c.ux6.slow.retrySlot = await p.$eval("#qzSaved", (e) => e.hidden && !e.textContent);
  be.delayResults = 0;
  // Bài ôn trong khung (bridge.js gửi ontapReport): thông báo ghi số câu đúng kèm câu đã gửi / chưa gửi; bài IOE bằng tiếng Anh
  const frameReport = async (id, d) => {
    await p.goto(BASE + "/#/home"); await p.waitForSelector("#today"); // mở lại khung mới mỗi lần (cùng địa chỉ thì không đổi màn hình)
    await p.goto(BASE + "/#/play/" + id); await p.waitForSelector("#playerFrame");
    const fr = await until(p, () => p.frames().find((f) => f.url().includes("/modules/" + id + "/")));
    await fr.waitForFunction(() => typeof window.ontapReport === "function");
    await p.evaluate(() => { const t = document.querySelector("#toast"); if (t) t.textContent = ""; });
    await fr.evaluate((x) => window.ontapReport(x), d);
    await p.waitForFunction(() => /\. \S/.test((document.querySelector("#toast") || {}).textContent || ""), null, { timeout: 8000 });
    return text(p, "#toast");
  };
  const n4 = naRes();
  c.ux6.frame = { sent: await frameReport("l6-giua-ki-1", { label: "Toán · Đề 1", mode: "exam", subject: "toan", r: 18, t: 20, s: 600 }) };
  be.failResults = true;
  c.ux6.frame.pending = await frameReport("l6-giua-ki-1", { label: "Toán · Đề 2", mode: "exam", subject: "toan", r: 17, t: 20, s: 600 });
  c.ux6.frame.en = await frameReport("ioe-6", { label: "Test 1", mode: "exam", subject: "ta", r: 24, t: 30, s: 800 });
  c.ux6.frame.server = naRes() === n4 + 1;
  be.failResults = false;
  await p.evaluate(() => Store.sendPending());
  c.ux6.frame.drained = await until(p, () => naRes() === n4 + 3) && (await p.evaluate(() => Store.pendingResults())) === 0;
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
  await p.click("#qzYes"); await p.waitForSelector(".score"); await p.waitForSelector("#qzSaved:not([hidden])"); // UX6: dòng gửi cho bố mẹ bằng tiếng Anh
  c.ta2.result = await text(p, "#view"); c.ta2.toast = await text(p, "#toast"); c.ta2.saved = await text(p, "#qzSaved");
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
  // thẻ không có dòng kì thi (.kid-ev) thì chữ rỗng: kiểm tra báo sai, script không dừng (L28, nguyên nhân 5)
  c.ux2.binCard = await p2.$eval(`a.kid[href="#/child/${binId}"]`, (k) => [...k.querySelectorAll(".stat")].map((s) => s.querySelector("b").textContent + " " + s.querySelector("span").textContent).join("|") + " " + ((k.querySelector(".kid-ev") || {}).textContent || "").replace(/\s+/g, " "));
  await shot(p2, "c11-cac-con");
  await p2.click(`[data-child="${binId}"]`); await p2.waitForSelector(".report");
  c.report = await p2.evaluate(() => ({ n: +document.querySelector("#rpCount").textContent, subj: [...document.querySelectorAll("#rpSubjects .rp-sub b:first-child")].map((b) => b.textContent).join() }));
  c.ux2.report = await p2.evaluate(() => ({ hash: location.hash, back: document.querySelector("#view .linkbtn[data-go]").textContent, links: [...document.querySelectorAll("#rpCal, #rpPractice")].map((a) => a.textContent + "=" + a.getAttribute("href")).join(), head: [...document.querySelectorAll("#rpHead h1, #rpHead .rp-who .muted")].map((x) => x.textContent.replace(/\s+/g, " ").trim()).join(" | "), headAll: document.querySelector("#rpHead").innerText, topCal: !!document.querySelector(".who a"), edit: !!document.querySelector("a[href^='#/admin/user/']") }));
  await shot(p2, "c12-bao-cao-tuan");
  /* UX8 (X14): khối “Tin nhắn sẽ gửi” ngay dưới đầu trang: tin nhắn khớp các ô số liệu, không có tên đăng nhập, tên gia đình, đường dẫn;
     giả lập navigator.share (addInitScript, tải lại trang) thì “Gửi báo cáo” truyền đúng { title, text }; không có navigator.share thì
     clipboard có tin nhắn; “Chép tin nhắn” cũng vậy; bản in không có khối này. */
  const readMsg = () => p2.evaluate(() => { const t = (s) => document.querySelector(s).textContent.replace(/\s+/g, " ").trim();
    return { msg: document.querySelector("#rpMsgText").textContent, after: document.querySelector("#rpHead").nextElementSibling.id, head: t("#rpHead .rp-who .muted:last-child"), count: t("#rpCount"), days: t("#rpDays"),
      mins: t("#rpMins"), avg: t("#rpAvg"), pvAvg: t("#rpAvg + span + small"), send: t("#rpSend"), main: document.querySelector("#rpSend").classList.contains("main"), copy: t("#rpCopy"), printBtn: t("#rpPrint"), family: Store.settings().schoolName, user: Store.username() }; });
  c.ux8 = await readMsg();
  await home.grantPermissions(["clipboard-read", "clipboard-write"], { origin: BASE });
  await p2.addInitScript(SHARE_STUB); await p2.reload(); await p2.waitForSelector("#rpSend");
  c.ux8.reload = (await readMsg()).msg === c.ux8.msg;
  await p2.click("#rpSend"); await wait(p2);
  c.ux8.shared = await p2.evaluate(() => __share.calls.map((d) => ({ keys: Object.keys(d).sort().join(), title: d.title, text: d.text })));
  await p2.evaluate(() => { delete navigator.share; const t = document.getElementById("toast"); if (t) t.hidden = true; return navigator.clipboard.writeText("trước"); });
  await p2.click("#rpSend"); await wait(p2);
  c.ux8.noShare = { clip: await p2.evaluate(() => navigator.clipboard.readText()).catch((e) => "lỗi: " + e.message), toast: await text(p2, "#toast") };
  await p2.evaluate(() => navigator.clipboard.writeText("trước"));
  await p2.click("#rpCopy"); await wait(p2);
  c.ux8.copied = await p2.evaluate(() => navigator.clipboard.readText()).catch((e) => "lỗi: " + e.message);
  await p2.emulateMedia({ media: "print" });
  c.ux8.printCss = await p2.evaluate(() => getComputedStyle(document.querySelector("#rpMsg")).display + "," + document.querySelector("#rpPrint").getBoundingClientRect().height); // nút In nằm trong hàng .noprint
  await p2.emulateMedia({ media: "screen" });
  await p2.click("#rpPractice"); await p2.waitForSelector("#allPractice");
  c.ux2.practice = (await text(p2, "#view h2")) + " | " + (await text(p2, "#view .linkbtn[data-go]")) + " | " + (await p2.$$eval("#allPractice a.btn", (a) => a.length));
  await p2.click("#view .linkbtn[data-go]"); await p2.waitForSelector(".report");
  await p2.click("#rpCal"); await p2.waitForSelector("#parentCal");
  c.ux2.calFromReport = await p2.evaluate(() => location.hash + " " + document.querySelector('.tabs [data-g][aria-pressed="true"]').textContent.replace(/\s+/g, " "));
  // UX6 (D3): khu phụ huynh trên cùng máy: Na (tab kia) làm đề Tiếng Anh khi máy chủ lỗi: màn kết quả ghi chưa gửi bằng tiếng Anh;
  // mục Các con có dòng “1 bài làm trên máy này chưa gửi đi · Gửi lại”; bấm Gửi lại thì gửi, dòng mất
  const n1 = naRes();
  be.failResults = true;
  await quick("ta6-gk1-de1", 1);
  c.ux6.en = { saved: await text(p, "#qzSaved"), toast: await text(p, "#toast"), cls: (await savedOf(p)).cls };
  await p2.goto(BASE + "/#/admin/overview"); await p2.waitForSelector("#unsent");
  c.ux6.parent = await p2.$eval("#unsent", (e) => ({ text: e.querySelector(".grow").textContent, btn: e.querySelector("#sendNow").textContent, h: Math.round(e.getBoundingClientRect().height), beforeKids: !!(e.compareDocumentPosition(document.querySelector("#kids")) & Node.DOCUMENT_POSITION_FOLLOWING) }));
  await shot(p2, "c11b-bai-chua-gui");
  be.failResults = false;
  await p2.click("#sendNow"); await p2.waitForSelector("#unsent", { state: "detached" });
  c.ux6.parentSent = { toast: await text(p2, "#toast"), server: await until(p2, () => naRes() === n1 + 1), kids: !!(await p2.$("a.kid")) };
  // Tab kia (Na) gửi được trước khi bố mẹ bấm: dòng ở tab khu phụ huynh còn số cũ; bấm Gửi lại thì báo “Đã gửi” và dòng mất (vẽ lại theo số thật)
  be.failResults = true;
  await quick("ta6-gk1-de1", 1);
  await p2.goto(BASE + "/#/admin/events"); await p2.waitForSelector("#parentCal"); await p2.goto(BASE + "/#/admin/overview"); await p2.waitForSelector("#unsent");
  be.failResults = false;
  const n6 = naRes();
  await p.evaluate(() => Store.sendPending());
  c.ux6.stale = { drained: await until(p, () => naRes() === n6 + 1), shown: await p2.$eval("#unsent", (e) => e.dataset.n) };
  await p2.click("#sendNow"); await p2.waitForSelector("#unsent", { state: "detached", timeout: 5000 }).catch(() => {});
  c.ux6.stale.gone = !(await p2.$("#unsent")); c.ux6.stale.toast = await text(p2, "#toast");
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
  c.ui2.padOff = await p3.evaluate(btnTone, ".pad .ok"); // UI2 (X32): phím Vào bị tắt như nút chính bị tắt; phím số, Hiện số vẫn mờ .45
  c.ui2.padDim = await p3.evaluate(() => [...document.querySelectorAll('.pad button:not(.ok)'), document.querySelector("#pinShow")].map((b) => getComputedStyle(b).opacity));
  await shot(p3, "c10c-dang-doi");
  await p3.evaluate(() => { const o = JSON.parse(localStorage.getItem("ontap_pinlock_v1")); o["phu-huynh"].until = Date.now() + 1200; localStorage.setItem("ontap_pinlock_v1", JSON.stringify(o)); });
  await p3.waitForSelector("#pinErr .fb.ok", { timeout: 5000 });
  c.ux4.unlocked = await lockUI3();
  c.ui2.padOn = await p3.evaluate(btnTone, ".pad .ok");
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
  // UX6: phiên hết giữa lúc con làm bài (máy chủ thu hồi phiên của tài khoản, như khi chủ app đặt lại mật khẩu): màn kết quả ghi chưa gửi,
  // thông báo giữ lời nhắc “Bố mẹ đăng nhập lại…” của kho (câu của app không che); đăng nhập lại thì tự gửi bài đó
  await q.click("#switchWho"); await q.waitForSelector(WHO);
  await tile(q, "Na"); await q.waitForSelector("text=Chào Na");
  const n2 = naRes(), famUser = be.T.families.find((f) => f.id === acc.id).auth_user_id;
  await q.goto(BASE + "/#/quiz/toan6-ck1-de1"); await q.waitForSelector("#qPractice"); await q.click("#qPractice");
  if (await q.$("#qzFill")) await q.fill("#qzFill", "1"); else if (await q.$("#qzNum")) await q.fill("#qzNum", "1"); else await q.click(".opt >> nth=0");
  await q.click("#qzGo"); await q.click("#qzGo");
  for (const [t, uid] of be.tokens) if (uid === famUser) be.tokens.delete(t);
  await q.click("#qzExit"); await q.click("#qzYes"); await q.waitForSelector("#qzSaved:not([hidden])");
  c.ux6.expired = { saved: await text(q, "#qzSaved"), toast: await text(q, "#toast"), server: naRes() === n2 };
  await q.goto(BASE + "/#/"); await q.waitForSelector("#loginForm");
  await q.fill("#lUser", "nha.bin"); await q.fill("#lPass", PW2); await q.click("#lGo"); await q.waitForSelector(WHO);
  c.ux6.expired.sent = await until(q, () => naRes() === n2 + 1);
  // Phiên hết rồi mới bấm “Gửi lại” ở trang chính: không báo “Đã gửi” (bài chưa tới máy chủ), giữ lời nhắc đăng nhập lại của kho
  await tile(q, "Na"); await q.waitForSelector("text=Chào Na");
  be.failResults = true;
  await q.goto(BASE + "/#/quiz/toan6-ck1-de2"); await q.waitForSelector("#qPractice"); await q.click("#qPractice");
  if (await q.$("#qzFill")) await q.fill("#qzFill", "1"); else if (await q.$("#qzNum")) await q.fill("#qzNum", "1"); else await q.click(".opt >> nth=0");
  await q.click("#qzGo"); await q.click("#qzGo"); await q.click("#qzExit"); await q.click("#qzYes"); await q.waitForSelector("#qzSaved:not([hidden])");
  await q.goto(BASE + "/#/home"); await q.waitForSelector("#unsent");
  be.failResults = false;
  for (const [t, uid] of be.tokens) if (uid === famUser) be.tokens.delete(t);
  const n5 = naRes();
  await q.click("#sendNow"); await q.waitForSelector("#loginForm"); await wait(q, 300);
  c.ux6.expiredBar = { toast: await text(q, "#toast"), server: naRes() === n5 };
  await q.fill("#lUser", "nha.bin"); await q.fill("#lPass", PW2); await q.click("#lGo"); await q.waitForSelector(WHO);
  c.ux6.expiredBar.sent = await until(q, () => naRes() === n5 + 1);
  /* ---- tài khoản bị khóa ---- */
  await admin({ action: "set_status", id: acc.id, status: "locked" });
  await q.reload(); await q.waitForSelector("#blocked");
  c.locked = await text(q, "#blocked");
  await shot(q, "c15-tai-khoan-bi-khoa");
  await q.click("#bOut"); await q.waitForSelector("#loginForm");
  await q.fill("#lUser", "nha.bin"); await q.fill("#lPass", PW2); await q.click("#lGo"); await q.waitForSelector("#loginErr .fb");
  c.lockedLogin = await text(q, "#loginErr");

  /* ---- tài khoản cũ (lịch khối 4, 6 trước Phiên Lịch các khối mới) mở bản mới: máy chủ chưa chạy cap-nhat-lich.sql thì lịch giữ nguyên, không lỗi;
     có cột seed_events_seen thì kì thi của khối 5, 7–12 lên máy chủ, mốc năm học thêm khối (không thêm lại khối bố mẹ đã bỏ), ngày đã sửa và kì đã xóa giữ,
     mở lại không chép lần hai, kì mới bố mẹ xóa không quay lại; tab Lịch thi không có khối chưa bật. Tài khoản tạo thẳng trong máy chủ giả (không qua
     Edge Function, để nhật ký admin và danh sách tài khoản của phần trang admin bên dưới không đổi) và xóa khi xong. ---- */
  const V1 = { "khai-giang": [4, 6], "gk1-l4": [4], "gk1-l6": [6], "ioe-truong": [4, 6], "ck1-l6": [6], "ck1-l4": [4], "ioe-xa": [4, 6], "het-hk1": [4, 6], "tet-2027": [4, 6],
    "ioe-tinh": [4, 6], "gk2-l4": [4], "gk2-l6": [6], "ioe-qg": [4, 6], "ck2-l6": [6], "ck2-l4": [4], "het-nam": [4, 6] };
  const oldUser = be.addUser("nha.cu@" + LOGIN_DOMAIN, "mat-khau-cu-2026");
  const oldFam = { id: nodeCrypto.randomUUID(), auth_user_id: oldUser.id, username: "nha.cu", display_name: "Nhà Cũ", school_year: "2026–2027", seed_banks_seen: SEED_BANK_IDS.slice(), seed_events_seen: [],
    plan: "free", plan_until: null, must_change_password: false, status: "active", created_at: new Date(Date.now() + be.clock).toISOString(), last_seen_at: null };
  be.T.families.push(oldFam);
  SEED_EVENTS.filter((e) => V1[e.id] && e.id !== "ioe-qg").forEach((e) => be.T.exam_events.push({ family_id: oldFam.id, id: e.id, title: e.title, kind: e.kind, grades: e.id === "tet-2027" ? [4] : V1[e.id],
    start_date: e.id === "gk1-l4" ? "2026-11-04" : e.id === "het-hk1" ? "2027-01-17" : e.start, end_date: e.id === "gk1-l4" ? "2026-11-06" : e.id === "het-hk1" ? "2027-01-17" : e.end,
    tentative: e.id === "gk1-l4" ? false : !!e.tentative, subjects: e.subjects || [], scope: e.scope || "", note: e.note || "", modules: e.modules || [], banks: e.banks || [] }));
  const oldRows = () => be.T.exam_events.filter((x) => x.family_id === oldFam.id), oldRow = (id) => oldRows().find((x) => x.id === id) || null;
  const oldDev = await device(), qo = await oldDev.newPage();
  be.noEventsSeen = true;
  await qo.goto(BASE + "/"); await qo.waitForSelector("#loginForm");
  await qo.fill("#lUser", "nha.cu"); await qo.fill("#lPass", "mat-khau-cu-2026"); await qo.click("#lGo"); await qo.waitForSelector("#kids"); await wait(qo, 500);
  c.lich = { noCol: { n: oldRows().length, seen: oldFam.seed_events_seen.length, inApp: await qo.evaluate(() => Store.events().length), toast: await text(qo, "#toast") } };
  be.noEventsSeen = false;
  await qo.reload(); await qo.waitForSelector("#kids");
  c.lich.keysN = await qo.evaluate(() => Store._seedEventKeys().length);
  c.lich.synced = await until(qo, () => oldRows().length === SEED_EVENTS.length - 1 && oldFam.seed_events_seen.length === c.lich.keysN);
  c.lich.after = { gk1: [oldRow("gk1-l4").start_date, oldRow("gk1-l4").end_date, oldRow("gk1-l4").tentative].join(), ioeQg: !!oldRow("ioe-qg"), tet: (oldRow("tet-2027") || { grades: [] }).grades.join(), kg: (oldRow("khai-giang") || { grades: [] }).grades.join(),
    hk1: (oldRow("het-hk1") || {}).start_date, vao10: !!oldRow("vao10-2027") && oldRow("vao10-2027").grades.join() === "9", l12: !!oldRow("ck1-l12") && /Thông tư 89/.test(oldRow("ck1-l12").note), inApp: await qo.evaluate(() => Store.events().length) };
  await qo.reload(); await qo.waitForSelector("#kids"); await wait(qo, 500);
  c.lich.again = { n: oldRows().length, seen: oldFam.seed_events_seen.length };
  await qo.evaluate(() => { Store.removeEvent("vao10-2027"); return Store.flush(); });
  await qo.reload(); await qo.waitForSelector("#kids"); await wait(qo, 500);
  c.lich.removed = { n: oldRows().length, vao10: !!oldRow("vao10-2027") };
  await qo.goto(BASE + "/#/admin/events"); await qo.waitForSelector("#parentCal");
  c.lich.cal = await qo.evaluate((re) => ({ tabs: [...document.querySelectorAll(".tabs")].map((t) => [...t.children].map((b) => b.textContent.replace(/\s+/g, " ") + (b.getAttribute("aria-pressed") === "true" ? "*" : "")).join()).join(" / "),
    n: document.querySelectorAll("[data-ev]").length, shown: Store.events().filter((e) => e.grades.some((g) => g === 4 || g === 6)).length, all: Store.events().length,
    hidden: [...document.querySelectorAll("[data-ev] .t b")].some((b) => new RegExp(re).test(b.textContent)) }), HIDDEN_GRADE);
  await shot(qo, "c15b-lich-tai-khoan-cu");
  await oldDev.close();
  be.T.exam_events = be.T.exam_events.filter((x) => x.family_id !== oldFam.id); be.T.families = be.T.families.filter((f) => f.id !== oldFam.id); be.users.delete(oldUser.id);
  for (const [t, uid] of be.tokens) if (uid === oldUser.id) be.tokens.delete(t);

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
    "K3: đề ngẫu nhiên rút 25 câu từ kho 106 câu (31 câu riêng và 3 đề, N1), kết quả lên máy chủ với ref_id là mã pool, lịch sử câu trên máy (cả câu tự luận)": /25 câu rút từ kho 106 câu \(3 đề\)/.test(c.k3.intro) && c.k3.kho === "106/25/25"
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
      && /Go to home$/.test(c.ta2.result) && c.ta2.toast === "Saved and sent to your parents." && c.ta2.saved === "Saved and sent to your parents." && c.ta2.server,
    "UX1: trang “Hôm nay” của con có thanh tab dưới (4 tab, ≥ 44px), thẻ gợi ý, chuỗi ngày, huy hiệu; thanh trên không có nút Lịch thi; màn đề không có thanh tab; một dòng nhãn trên câu":
      c.ux1.tabs === "Hôm nay*,Bài ôn,Lịch thi,Kết quả" && c.ux1.tabH && c.ux1.today && !c.ux1.cal && c.ux1.tabbed && c.ux1.quizTabs && /^Toán · \S/.test(c.ux1.label) && !c.ux1.label.includes("|"),
    "UX1: màn kết quả có lời khen, nút “Ôn lại N câu sai”, câu sai thu gọn; lượt ôn lại chỉ gồm câu sai và không gửi thêm kết quả lên máy chủ":
      /^(Xuất sắc|Giỏi lắm|Khá tốt|Được rồi|Chưa sao), Bin[!.]/.test(c.ux1.result.praise) && c.ux1.result.retry === `Ôn lại ${c.ux1.result.n} câu sai` && c.ux1.result.n > 0 && c.ux1.result.closed && c.ux1.result.again === "Làm lại cả đề"
      && c.ux1.retryChip === `Câu 1/${c.ux1.result.n}` && /· Ôn lại câu sai /.test(c.ux1.retryResult) && /Lượt ôn lại câu sai không lưu điểm\./.test(c.ux1.retryResult) && c.ux1.retryServer,
    "UX5: làm đề tập trung (thanh trên chỉ còn chữ OnUp, màn kết quả có lại); làm như thi có “Nộp bài”, “Còn 40:00”; màn mở đề có thẻ “Lần trước” và hai thẻ cách làm":
      c.ux5.run.quizzing && !c.ux5.run.av && c.ux5.exit === "← Thoát" && c.ux5.prog === "Câu 1/25" && !c.ux5.result.quizzing && c.ux5.result.av
      && /^Lần trước: \d+(,\d+)?\/25 câu đúng$/.test(c.ux5.prev) && c.ux5.modes === "Ôn luyện,Làm như thi · 40 phút"
      && c.ux5.exam.submit === "Nộp bài" && !c.ux5.exam.exit && /^Còn (40:00|39:5\d)$/.test(c.ux5.exam.timer) && c.ux5.exam.top.quizzing && !c.ux5.exam.top.av,
    "UX6 (X10, D1): bài gửi được thì màn kết quả có dòng “Đã lưu và gửi cho bố mẹ.” trong ô điểm (nền ok-soft, chữ ok, có biểu tượng), thông báo cùng ý; lượt ôn lại câu sai không có dòng":
      !!c.ux6.first && c.ux6.first.text === "Đã lưu và gửi cho bố mẹ." && c.ux6.first.cls === "saved ok" && c.ux6.first.shown && c.ux6.first.inScore && c.ux6.first.icon
      && c.ux6.first.bg === c.ux6.tok.okSoft && c.ux6.first.color === c.ux6.tok.ok && c.ux6.firstToast === "Đã lưu và gửi cho bố mẹ." && c.ux6.retryHidden
      && c.ux6.sent.text === "Đã lưu và gửi cho bố mẹ." && c.ux6.sent.cls === "saved ok" && c.ux6.sentToast === "Đã lưu và gửi cho bố mẹ." && c.ux6.sentServer,
    "UX6 (X10, D2): máy chủ lỗi (be.failResults) thì màn kết quả ghi “Đã lưu trên máy này. Sẽ gửi cho bố mẹ khi có mạng.” (nền sun-soft, chữ ink), thông báo cùng ý; kết quả chưa lên máy chủ":
      c.ux6.wait.text === "Đã lưu trên máy này. Sẽ gửi cho bố mẹ khi có mạng." && c.ux6.wait.cls === "saved wait" && c.ux6.wait.inScore && c.ux6.wait.icon && c.ux6.wait.bg === c.ux6.tok.sunSoft && c.ux6.wait.color === c.ux6.tok.ink
      && c.ux6.waitToast === c.ux6.wait.text && c.ux6.waitServer,
    "UX6 (X10, D3): trang chính của con có dòng “1 bài chưa gửi cho bố mẹ · Gửi lại” trên thẻ Hôm nay (≥ 44px, nền sun-soft, chữ ink); Gửi lại khi máy chủ còn lỗi: báo chưa gửi được, trang không vẽ lại; tắt công tắc, Gửi lại: dòng mất, máy chủ có kết quả, hộp gửi trống":
      c.ux6.bar.text === "1 bài chưa gửi cho bố mẹ" && c.ux6.bar.btn === "Gửi lại" && c.ux6.bar.h >= 44 && c.ux6.bar.btnH >= 44 && c.ux6.bar.bg === c.ux6.tok.sunSoft && c.ux6.bar.color === c.ux6.tok.ink && c.ux6.bar.beforeToday
      && c.ux6.retryFail.toast === "Chưa gửi được. App sẽ thử lại khi có mạng." && c.ux6.retryFail.bar === "1 bài chưa gửi cho bố mẹ" && c.ux6.retryFail.same && c.ux6.retryFail.server
      && c.ux6.retryOK.toast === "Đã gửi" && c.ux6.retryOK.server && c.ux6.retryOK.outbox === null,
    "UX6: đề Tiếng Anh chưa gửi được: dòng và thông báo bằng tiếng Anh; khu phụ huynh trên cùng máy có dòng “1 bài làm trên máy này chưa gửi đi · Gửi lại” ở đầu mục Các con; bấm Gửi lại thì gửi, dòng mất; tab kia gửi trước thì bấm Gửi lại cũng làm dòng mất":
      c.ux6.en.saved === "Saved on this device. It will be sent to your parents when you're online." && c.ux6.en.toast === c.ux6.en.saved && c.ux6.en.cls === "saved wait"
      && c.ux6.parent.text === "1 bài làm trên máy này chưa gửi đi" && c.ux6.parent.btn === "Gửi lại" && c.ux6.parent.h >= 44 && c.ux6.parent.beforeKids
      && c.ux6.parentSent.toast === "Đã gửi" && c.ux6.parentSent.server && c.ux6.parentSent.kids
      && c.ux6.stale.drained && c.ux6.stale.shown === "1" && c.ux6.stale.gone && c.ux6.stale.toast === "Đã gửi",
    "UX6: phiên hết giữa lúc con làm bài: màn kết quả ghi “Đã lưu trên máy này…”, thông báo vẫn là lời nhắc bố mẹ đăng nhập lại; đăng nhập lại thì tự gửi bài đó":
      c.ux6.expired.saved === "Đã lưu trên máy này. Sẽ gửi cho bố mẹ khi có mạng." && /đăng nhập lại để gửi/.test(c.ux6.expired.toast) && c.ux6.expired.server && c.ux6.expired.sent,
    "UX6: máy chủ chậm hơn 4 giây: màn kết quả ghi chưa gửi trước, gửi xong thì đổi thành “Đã lưu và gửi cho bố mẹ.” trên đúng màn đó; bấm “Ôn lại câu sai” khi bài trước còn đang gửi: màn kết quả của lượt ôn lại không bị ghi":
      c.ux6.slow.first.cls === "saved wait" && c.ux6.slow.server && c.ux6.slow.after.cls === "saved ok" && c.ux6.slow.after.text === "Đã lưu và gửi cho bố mẹ." && c.ux6.slow.same
      && c.ux6.slow.toast === "Đã lưu và gửi cho bố mẹ." && c.ux6.slow.sent && c.ux6.slow.retryRound && c.ux6.slow.sent2 && c.ux6.slow.retrySlot,
    "UX6: bài ôn trong khung: thông báo “18/20 câu đúng. Đã lưu và gửi cho bố mẹ.” hoặc “… Đã lưu trên máy này. Sẽ gửi cho bố mẹ khi có mạng.”; bài IOE bằng tiếng Anh; gửi lại thì hết bài chờ":
      c.ux6.frame.sent === "18/20 câu đúng. Đã lưu và gửi cho bố mẹ." && c.ux6.frame.pending === "17/20 câu đúng. Đã lưu trên máy này. Sẽ gửi cho bố mẹ khi có mạng."
      && c.ux6.frame.en === "24/30 correct. Saved on this device. It will be sent to your parents when you're online." && c.ux6.frame.server && c.ux6.frame.drained,
    "UX6: phiên hết rồi bấm “Gửi lại”: không báo “Đã gửi”, thông báo là lời nhắc bố mẹ đăng nhập lại; đăng nhập lại thì tự gửi":
      /đăng nhập lại để gửi/.test(c.ux6.expiredBar.toast) && c.ux6.expiredBar.server && c.ux6.expiredBar.sent,
    "UX2: khu phụ huynh có ba mục Các con · Lịch thi · Cài đặt; thanh trên không có nút Lịch thi, #/calendar về tab Lịch thi; thêm hồ sơ xong về Các con": c.ux2.tabs === "Các con*,Lịch thi,Cài đặt" && !c.ux2.topCal
      && /^Bắt đầu trong 3 bước/.test(c.ux2.empty) && c.ux2.afterAdd === "#/admin/overview" && c.ux2.calRedirect === "#/admin/events",
    "UX2: tab Các con: mỗi con một thẻ (chưa có bài: Chưa ôn · – · 0; kì thi gần nhất còn N ngày · chưa ôn …), không có ô số liệu trùng ý; thẻ có bài hôm nay ghi số bài, điểm hôm nay":
      /^#\/child\/\S+ Chưa ôn hôm nay\|– điểm TB tuần\|0 chuỗi ngày Kiểm tra giữa học kì I còn \d+ ngày · chưa ôn Toán, Tiếng Việt; #\/child\/\S+ Chưa ôn hôm nay\|– điểm TB tuần\|0 chuỗi ngày Kiểm tra giữa học kì I còn \d+ ngày · chưa ôn Ngữ văn, Toán, KHTN và 5 môn khác$/.test(c.ux2.kids.cards)
      && !c.ux2.kids.extraStats && c.ux2.kids.h2 === "Khu phụ huynh" && c.ux2.kids.count === "2/5 hồ sơ" && c.ux2.kids.add && /^Bấm vào thẻ của con/.test(c.ux2.kids.hint)
      && /^2 bài hôm nay\|\d+(,\d+)? điểm hôm nay\|1 chuỗi ngày Kiểm tra giữa học kì I còn \d+ ngày · chưa ôn Tiếng Việt$/.test(c.ux2.binCard),
    "UX2: tab Lịch thi: khối của các con (Lớp 4 · Bin, Lớp 6 · Na), gom theo tháng; kì thi dự kiến có nút “Trường đã báo lịch? Sửa ngày” (≥ 44px), kì khác có “Sửa ngày, bài ôn”":
      c.ux2.cal.tabs === "Các con,Lịch thi*,Cài đặt / Cả hai khối*,Lớp 4 · Bin,Lớp 6 · Na" && c.ux2.cal.fix === "Trường đã báo lịch? Sửa ngày" && c.ux2.cal.fixH >= 44 && c.ux2.cal.tent && c.ux2.cal.edit === "#/admin/event/ioe-truong"
      && c.ux2.cal.months >= 6 && c.ux2.cal.only46 && c.ux2.cal.n === c.ux2.cal.shown && c.ux2.cal.all > c.ux2.cal.shown && !c.ux2.cal.hidden && c.ux2.cal.kg === "Khai giảng năm học 2026–2027 · Lớp 4, 6" && c.ux2.calG6,
    "UX2: hộp sửa ngày mở ngay dưới kì thi, ô chọn “lịch chính thức” bật sẵn; thiếu ngày thì báo; Lưu thì bỏ cờ dự kiến, lên máy chủ, hộp đóng": c.ux2.fixBox.after && c.ux2.fixBox.start === "2026-11-02" && c.ux2.fixBox.end === "2026-11-13" && c.ux2.fixBox.official
      && /^Trường đã báo lịch\? Sửa ngày cho đúng\. ?Kiểm tra giữa học kì I/.test(c.ux2.fixBox.text) && /Chọn ngày thi/.test(c.ux2.fixErr) && c.ux2.fixed.toast === "Đã lưu ngày thi" && !c.ux2.fixed.box && !c.ux2.fixed.tent
      && c.ux2.fixed.date === "4/11đến 6/11" && c.ux2.fixed.act === "Sửa ngày, bài ôn" && c.ux2.fixed.ev.start === "2026-11-04" && c.ux2.fixed.ev.end === "2026-11-06" && c.ux2.fixed.ev.tentative === false && c.ux2.fixServer,
    "UX7 (X11): Sửa kì thi lớp 4 chỉ hiện đề lớp 4 (bằng Store.banks(4)), “N đã chọn”; tìm “toan de 2” còn đúng đề Toán 4 có “Đề 2”, hiện cả khối khác thì thêm Toán 6; đề lớp 6 vừa chọn vẫn hiện khi ẩn khối khác; Lưu lên máy chủ đủ lựa chọn cũ cộng đề đó, mở lại vẫn đủ, bỏ đi thì về như cũ":
      c.ux7.only4 && c.ux7.n === c.ux7.nWant && c.ux7.head === "Bài ôn và đề cho kì này" && c.ux7.find && c.ux7.findAll && c.ux7.sticky && c.ux7.saved && c.ux7.reopen && c.ux7.restored,
    "UX7b (X33): Sửa kì thi cuối kì I lớp 4: dòng #ePickScope hiện, ghi “Đang hiện bài ôn và đề của Lớp 4…”, hiện cả khối khác thì “… của mọi khối.”, bỏ ô Lớp 4 thì “Chọn khối ở trên…”; ô Phạm vi kiến thức không bị ghi chữ vào, Lưu giữ nguyên; audit không báo id trùng":
      c.ux7.scope.join(" | ") === "Đang hiện bài ôn và đề của Lớp 4, khối của kì thi này. | Đang hiện bài ôn và đề của mọi khối. | Chọn khối ở trên để thấy bài ôn và đề của khối đó. | Đang hiện bài ôn và đề của Lớp 4, khối của kì thi này."
      && c.ux7.scopeIn === "INPUT|true|" && c.ux7.scopeSaved && !problems.some((x) => /id trùng/.test(x)),
    "UX7b (X34): nhóm môn theo lịch thi: Sửa kì thi giữa kì I lớp 4 có Bài ôn dạng trang, Toán, Tiếng Việt đứng đầu; Đề tự soạn: Lớp 4 Toán, Tiếng Việt, Tiếng Anh, Lịch sử và Địa lí, Khoa học, Tin học và Công nghệ, Lớp 6 theo lịch lớp 6 (Thử nghiệm cuối); nhóm Toán lớp 4: ba đề giữa kì I trước bốn đề cuối kì I, đề ngẫu nhiên đầu mỗi kì": (() => {
      const S4 = "Toán,Tiếng Việt,Tiếng Anh,Lịch sử và Địa lí,Khoa học,Tin học và Công nghệ", T4 = "Toán 4 · Giữa kì I · Đề ngẫu nhiên|Toán 4 · Giữa kì I · Đề 1|Toán 4 · Giữa kì I · Đề 2|Toán 4 · Cuối kì I · Đề ngẫu nhiên|Toán 4 · Cuối kì I · Đề 1|Toán 4 · Cuối kì I · Đề 2|Toán 4 · Cuối kì I · Đề 3";
      return c.ux7.order.subj === "Toán,Tiếng Việt" && c.ux7.order.groups === "Bài ôn dạng trang," + S4 && c.ux7.order.toan === T4
        && c.ux7.list.groups === S4 + " / Toán,Ngữ văn,Tiếng Anh,KHTN,Lịch sử và Địa lí,GDCD,Tin học,Công nghệ,Thử nghiệm" && c.ux7.list.toan4 === T4;
    })(),
    "UX7 (X12): Đề tự soạn đứng trước đề có sẵn; đề có sẵn theo tab khối (Lớp 4 · N đề chọn sẵn, Lớp 6 · N đề), tìm “toan de 2” còn đúng đề Toán 4 có “Đề 2”":
      c.ux7.list.first && c.ux7.list.tabs === c.ux7.list.want && c.ux7.list.find,
    "UX7 (X13): nhập đề có một câu bị bỏ, một câu thiếu phần: thẻ hai câu đó viền đỏ, lỗi trong thẻ; Lưu thì hỏi lại; gắn vào kì thi thì đề lên máy chủ, đứng đầu danh sách đề của kì thi; form sửa đề ghi kì thi đã gắn; xóa đề thì kì thi bỏ đề theo":
      c.ux7.prev === "pv1,pv2!,pv3! | Chưa lưu được | Mức độ “Rất khó” chưa đúng (Biết, Hiểu hoặc Vận dụng)" && c.ux7.ask === "1 câu sẽ không được lưu, 1 câu thiếu phần bị lỗi. Vẫn lưu?"
      && c.ux7.saved.toast === "Đã lưu đề, gắn vào “Kiểm tra cuối năm học”." && /^Ôn tổng hợp · tuần 7 ?Lớp 4 · Toán · 2 câu · gắn vào Kiểm tra cuối năm học/.test(c.ux7.saved.row) && c.ux7.saved.server
      && c.ux7.linked === "Đang gắn vào: Kiểm tra cuối năm học. Bỏ gắn ở Lịch thi → Sửa kì thi." && c.ux7.removed,
    "UX2: Cài đặt: Hồ sơ con (2/5), Đề tự soạn, Thông tin chung, rồi Chuyển dữ liệu và sao lưu, Tài khoản; #/admin/users về đây; trang Đề tự soạn (đề có sẵn theo khối, các nhóm môn thu gọn; UX7), nhập đề, Dữ liệu, Tài khoản về Cài đặt":
      c.ux2.settings.tabs === "Các con,Lịch thi,Cài đặt*" && c.ux2.settings.h3 === "Hồ sơ con (2/5),Đề tự soạn,Thông tin chung" && c.ux2.settings.kids === 2 && c.ux2.settings.info
      && c.ux2.settings.links === "Xem đề tự soạn=#/admin/banks,+ Nhập đề=#/admin/bank/new,Chuyển dữ liệu và sao lưu=#/admin/data,Tài khoản=#/account"
      && c.ux2.banks.tabs === "Cài đặt" && c.ux2.banks.back === "← Cài đặt" && c.ux2.banks.h2 === "Khu phụ huynh,Đề tự soạn,Đề có sẵn của app" && /^Chưa có đề tự soạn/.test(c.ux2.banks.mine) && !c.ux2.banks.seedOpen && c.ux2.banks.seedN === c.ux2.banks.seedAll && c.ux2.banks.seedN > 20 && c.ux2.banks.add === "+ Nhập đề"
      && c.ux2.bankForm === "Nhập đề | ← Đề tự soạn | Lưu đề" && c.ux2.data === "← Cài đặt | Chuyển dữ liệu và sao lưu | Các con,Lịch thi,Cài đặt* | true | true" && c.ux2.accountBack === "← Cài đặt",
    "UX2: bấm thẻ của con là mở báo cáo tuần (#/child/<mã>), có “← Các con”, Sửa hồ sơ; đầu trang chỉ hình, tên, dòng lớp và dòng “Báo cáo <ngày> – <ngày>”; link “Xem cả năm →” ở Kì thi sắp tới (tab Lịch thi, chọn sẵn khối) và “Bài ôn của Bin →” cuối Gợi ý (xem thử)": c.ux2.report.hash === "#/child/" + binId && c.ux2.report.back === "← Các con" && c.ux2.report.edit
      && c.ux2.report.links === `Xem cả năm →=#/admin/events?g=4,Bài ôn của Bin →=#/child/${binId}/practice` && /^Bin \| Lớp 4 · 4A \| Báo cáo \d+\/\d+ – \d+\/\d+\/\d{4}$/.test(c.ux2.report.head) && !/OnUp/.test(c.ux2.report.headAll) && !c.ux2.report.topCal && /^Bài ôn lớp 4 của Bin \| ← Báo cáo của Bin \| \d+$/.test(c.ux2.practice) && c.ux2.calFromReport === "#/admin/events?g=4 Lớp 4 · Bin",
    "UX3: thẻ “Bắt đầu trong 3 bước” ở đầu mục Các con: chưa có con thì chỉ có thẻ (bước 1 đang làm, nút thêm trong thẻ, “Cho con học” mờ); có con thì bước 1 xong, bước 3 đang làm, nút bật ≥ 52px và mở “Ai đang học?”; con đã học thì thẻ ẩn":
      !!c.ux3.start0 && c.ux3.start0.steps === "now:Thêm hồ sơ con|:Đặt mã PIN (không bắt buộc)|:Đưa máy cho con" && c.ux3.start0.disabled && c.ux3.start0.add && c.ux3.start0.first === "start" && c.ux3.start0.rows === 0 && c.ux3.start0.link2 === ""
      && /^Bắt đầu trong 3 bước 1Thêm hồ sơ conTên, khối, lớp và hình đại diện\. App không hỏi ngày sinh hay ảnh của con\.\+ Thêm hồ sơ con 2Đặt mã PIN \(không bắt buộc\)Để anh chị em không vào nhầm hồ sơ của nhau\. 3Đưa máy cho conBấm “Cho con học”, con chọn hồ sơ của mình rồi bắt đầu ôn\. Cho con học Nút này mở màn hình “Ai đang học\?” khi đã có hồ sơ con\.$/.test(c.ux3.start0.text)
      && !!c.ux3.start2 && c.ux3.start2.steps === "done:Thêm hồ sơ con|:Đặt mã PIN (không bắt buộc)|now:Đưa máy cho con" && !c.ux3.start2.disabled && c.ux3.start2.h >= 52 && c.ux3.start2.first === "start" && c.ux3.start2.rows === 1
      && /✓Thêm hồ sơ conĐã có 2 hồ sơ: Bin, Na\. 2Đặt mã PIN \(không bắt buộc\)Bin đã có mã PIN\. Na chưa có\.Đặt mã PIN cho Na 3Đưa máy cho con/.test(c.ux3.start2.text) && /Lúc khác, bấm “Chọn hồ sơ khác” ở góc trên\.$/.test(c.ux3.start2.text)
      && c.ux3.letStudy && c.ux3.gone,
    "UI2 (X32): nút chính, phím Vào bị tắt có nền line, chữ muted, không mờ (“Cho con học” khi chưa có hồ sơ con, Vào khi phải đợi); bật lại thì nền sun, chữ sun-ink; phím số, Hiện số bị tắt vẫn mờ .45":
      offTone(c.ui2.letOff) && onTone(c.ui2.letOn) && offTone(c.ui2.padOff) && onTone(c.ui2.padOn) && c.ui2.padDim.length === 12 && c.ui2.padDim.every((o) => o === "0.45"),
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
    "UX8 (X14): báo cáo tuần có khối “Tin nhắn sẽ gửi” ngay dưới đầu trang: tin nhắn chữ thuần khớp các ô số liệu (số bài, ngày ôn, phút, điểm trung bình, tuần trước), có kì thi gần nhất, gợi ý, dòng cuối “Gửi từ OnUp.”, không có tên đăng nhập, tên gia đình, đường dẫn; giả lập navigator.share thì “Gửi báo cáo” truyền đúng { title, text }; không có thì chép vào clipboard và báo; “Chép tin nhắn” cũng chép; bản in không có khối này": (() => {
      const u = c.ux8, L = u.msg.split("\n"), pv = u.pvAvg.replace(/^Tuần trước: /, "");
      return u.after === "rpMsg" && L[0] === `Báo cáo tuần của Bin (${u.head.replace(/^Báo cáo /, "")})` && L[1] === `• Làm ${u.count} bài, ôn ${u.days} ngày, ${u.mins} phút.` && u.count === "2"
        && L[2] === `• Điểm trung bình ${u.avg}/10 (tuần trước ${pv === "–" ? "chưa làm bài" : pv}).` && L.some((x) => /^• Sắp tới: Kiểm tra giữa học kì I, \d+\/\d+ – \d+\/\d+\/\d{4} \((dự kiến, )?còn \d+ ngày\)\.$/.test(x))
        && L.slice(3, -1).every((x) => /^• (Chủ đề hay sai|Sắp tới|Gợi ý): /.test(x)) && [1, 2].includes(L.filter((x) => /^• Gợi ý: /.test(x)).length) && L[L.length - 1] === "Gửi từ OnUp." && u.msg.length <= 600
        && u.user === "nha.bin" && u.family === "Nhà Bin" && !u.msg.includes(u.user) && !u.msg.includes(u.family) && !/https?:|#\/|www\./.test(u.msg)
        && u.send === "Gửi báo cáo" && u.main && u.copy === "Chép tin nhắn" && u.printBtn === "In" && u.reload
        && u.shared.length === 1 && u.shared[0].keys === "text,title" && u.shared[0].title === "Báo cáo tuần của Bin" && u.shared[0].text === u.msg
        && u.noShare.clip === u.msg && u.noShare.toast === "Đã chép tin nhắn. Dán vào Zalo hoặc tin nhắn để gửi." && u.copied === u.msg && u.printCss === "none,0";
    })(),
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
    "Lịch các khối mới: tài khoản cũ (lịch khối 4, 6) mở bản mới: máy chủ chưa chạy cap-nhat-lich.sql thì lịch giữ nguyên, không lỗi; có cột thì kì thi của khối 5, 7–12 (thi vào 10, tốt nghiệp) lên máy chủ, mốc năm học thêm khối (tet-2027 không thêm lại khối 6), gk1-l4 giữ ngày đã sửa, ioe-qg không quay lại, het-hk1 sang 18/1; mở lại không chép lần hai; kì mới bố mẹ xóa không quay lại; tab Lịch thi không có khối chưa bật":
      c.lich.noCol.n === 15 && c.lich.noCol.seen === 0 && c.lich.noCol.inApp === 15 && !/Máy chủ|chưa nhận|lỗi/i.test(c.lich.noCol.toast)
      && c.lich.synced && c.lich.keysN === SEED_EVENTS.reduce((a, e) => a + e.grades.length, 0) && c.lich.after.gk1 === "2026-11-04,2026-11-06,false" && !c.lich.after.ioeQg
      && c.lich.after.tet === "4,1,2,3,5,7,8,9,10,11,12" && c.lich.after.kg === "4,6,1,2,3,5,7,8,9,10,11,12" && c.lich.after.hk1 === "2027-01-18" && c.lich.after.vao10 && c.lich.after.l12
      && c.lich.after.inApp === SEED_EVENTS.length - 1 && c.lich.again.n === SEED_EVENTS.length - 1 && c.lich.again.seen === c.lich.keysN && c.lich.removed.n === SEED_EVENTS.length - 2 && !c.lich.removed.vao10
      && c.lich.cal.tabs === "Các con,Lịch thi*,Cài đặt / Cả hai khối*,Lớp 4,Lớp 6" && c.lich.cal.n === c.lich.cal.shown && c.lich.cal.all > c.lich.cal.shown && !c.lich.cal.hidden,
    "U1: nút xem mật khẩu, mã PIN, mã mở nhanh (lPass, pwNew, pwNew2, pwIn, uPin, pwOld, qcNew, pinIn, outPw, adPass): hiện, ẩn, giữ giá trị và focus; gửi form, xóa hết ô thì ẩn lại": rv.length === 0,
    "hình hải cẩu (22/10/2026): chọn là lưu lên máy chủ (hai-cau-con); đầu trang, thanh trên, ô hồ sơ ở “Ai đang học?” vẽ hình; bộ chọn có 6 hải cẩu có tên đọc":
      !!c.art && c.art.head && c.art.top && c.art.seals === 6 && c.art.server && c.art.tile,
    "360px: không cuộn ngang, nút cao ≥ 44px, chữ ≥ 13px, chữ không đè lên nhau": problems.length === 0,
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
