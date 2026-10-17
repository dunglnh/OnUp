/* Chạy giao diện bản đám mây trong Chromium với máy chủ Supabase giả (tests/supabase/fake-backend.js).
   Trình duyệt gọi máy chủ giả qua page.exposeFunction, không cần mạng.
   Chạy: python3 -m http.server 8000 &  rồi  node tests/supabase/cloud-e2e.js
   Ảnh chụp (360px, sáng và tối) lưu ở tests/screenshots/cloud/.
   Máy chủ đã chuyển sang tài khoản tên đăng nhập + mật khẩu (supabase/schema.sql); giao diện đăng nhập mới làm ở Phiên B
   (docs/THIET-KE-TAI-KHOAN.md mục 8), khi đó viết lại các luồng ở đây. Hiện chỉ kiểm tra app khởi động được ở chế độ
   đám mây khi chưa đăng nhập: không lỗi, không cuộn ngang, CAPTCHA (khi có khóa) không làm hỏng trang,
   và service worker (sw.js) không làm hỏng bản đám mây. */
// Cho route và sự kiện request của Playwright áp dụng cả cho service worker (xem tests/e2e.js).
process.env.PW_EXPERIMENTAL_SERVICE_WORKER_NETWORK_EVENTS = "1";
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const { createBackend } = require("./fake-backend.js");

const BASE = process.env.BASE_URL || "http://localhost:8000";
const OUT = path.join(__dirname, "..", "screenshots", "cloud");
fs.mkdirSync(OUT, { recursive: true });
const FAKE_CLIENT = fs.readFileSync(path.join(__dirname, "fake-client.js"), "utf8");
const config = (siteKey) => `window.ONTAP_CONFIG = { supabaseUrl: "https://fake.supabase.co", supabaseAnonKey: "anon-key", turnstileSiteKey: ${JSON.stringify(siteKey || "")} };`;
/* Thay cho script Cloudflare Turnstile (không có mạng): trả mã hợp lệ sau một chút. */
const TURNSTILE_STUB = `window.turnstile = { n: 0, boxes: [], render(host, o) { this.boxes.push(host.id || "?"); const t = "ok-" + Date.now() + "-" + (++this.n); setTimeout(() => o.callback(t), 20); return this.n; }, remove() {} };`;

async function run(browser, scheme) {
  const be = createBackend();
  const withCaptcha = scheme === "dark"; // lượt tối chạy với CAPTCHA bật
  const errs = [];
  const ctx = await browser.newContext({ viewport: { width: 360, height: 760 }, deviceScaleFactor: 1, colorScheme: scheme });
  await ctx.exposeFunction("__fakeSupabase", (msg) => be.handle(msg));
  await ctx.addInitScript(FAKE_CLIENT);
  if (withCaptcha) await ctx.addInitScript(TURNSTILE_STUB);
  await ctx.route("**/js/config.js", (r) => r.fulfill({ contentType: "text/javascript", body: config(withCaptcha ? "0x4AAAAAAAtest" : "") }));
  await ctx.route(/challenges\.cloudflare\.com/, (r) => r.abort());
  await ctx.route(/cdn\.jsdelivr\.net|fonts\.g/, (r) => r.abort()); // không cần mạng
  await ctx.route(/fake\.supabase\.co/, (r) => r.fulfill({ contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: "[]" }));
  const swOut = []; // request service worker tự gửi ra ngoài app: phải không có
  ctx.on("request", (r) => { if (r.serviceWorker() && !r.url().startsWith(BASE + "/")) swOut.push(r.url()); });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errs.push("pageerror: " + e.message));
  page.on("console", (m) => { if (m.type() === "error" && !/net::|Failed to load resource/.test(m.text())) errs.push("console: " + m.text()); });
  await page.goto(BASE + "/");
  await page.waitForSelector("form");
  await page.waitForTimeout(300);
  const wide = await page.evaluate(() => document.documentElement.scrollWidth);
  await page.evaluate(() => { const t = document.getElementById("toast"); if (t) t.hidden = true; });
  await page.screenshot({ path: path.join(OUT, `c1-dang-nhap-${scheme}.png`), fullPage: true });
  const cloud = await page.evaluate(() => !!(window.Store && window.Store.cloud) && window.Store.authState() === "signed-out");
  // Service worker đã cài và điều khiển trang: gọi Supabase, Cloudflare, CDN rồi tải lại trang.
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
  await page.evaluate(() => Promise.all(["https://fake.supabase.co/rest/v1/families?select=*", "https://challenges.cloudflare.com/turnstile/v0/api.js",
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.116.0/dist/umd/supabase.js"].map((u) => fetch(u).then((r) => r.text(), () => ""))));
  await page.reload();
  await page.waitForSelector("form");
  await page.waitForTimeout(300);
  const again = await page.evaluate(() => !!(window.Store && window.Store.cloud) && window.Store.authState() === "signed-out" && document.documentElement.scrollWidth <= 360);
  const cached = await page.evaluate(async () => { const out = []; for (const k of await caches.keys()) for (const r of await (await caches.open(k)).keys()) out.push(r.url); return out; });
  await ctx.close();
  return {
    checks: {
      "bản đám mây khởi động, chưa đăng nhập": cloud,
      "không cuộn ngang ở 360px": wide <= 360,
      "có service worker, tải lại vẫn là bản đám mây": again,
      "service worker không đệm, không gửi request ra ngoài app": cached.length > 0 && cached.every((u) => u.startsWith(BASE + "/")) && swOut.length === 0,
      "không lỗi trên trang": errs.length === 0
    },
    errs: errs.concat(swOut)
  };
}

(async () => {
  const browser = await chromium.launch();
  let bad = 0;
  for (const scheme of ["light", "dark"]) {
    const { checks, errs } = await run(browser, scheme);
    for (const [k, v] of Object.entries(checks)) { console.log((v ? "ok  " : "FAIL ") + scheme + ": " + k); if (!v) bad++; }
    if (errs.length) console.log(errs);
  }
  await browser.close();
  if (bad) { console.error("CLOUD E2E FAILED"); process.exitCode = 1; } else console.log("CLOUD E2E OK");
})();
