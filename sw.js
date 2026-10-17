/* Service worker: mở lại được app khi mất mạng (đăng kí trong js/app.js).
   - Khi cài: tải sẵn mọi file trong FILES vào đệm, nên lần mở sau không cần mạng.
   - HTML, JS, CSS, data/, manifest: mạng trước, để bản mới đưa lên GitHub Pages là học sinh có ngay.
     Mất mạng, hoặc mạng chậm quá SLOW_MS mà đệm đã có bản cũ, thì dùng bản trong đệm. Tải được từ mạng thì cập nhật đệm.
   - Font, biểu tượng (fonts/, icons/): đệm trước, vì không đổi giữa các bản.
   - Chỉ xử lí request GET cùng origin, trong phạm vi app. Request tới Supabase, Cloudflare (CAPTCHA), CDN (supabase-js)
     đi thẳng ra mạng, không bao giờ vào đệm.
   Thêm, bớt, đổi tên file trong FILES, hoặc đổi font, biểu tượng: tăng VERSION. Bản mới cài lại đệm và xóa đệm cũ.
   tests/e2e.js so FILES với các file có trong repo. */
const VERSION = "onup-v1";
const PREFIX = "onup-"; // GitHub Pages: các repo của một tài khoản chung origin, chỉ xóa đệm của app này
const SLOW_MS = 4000;
const FONTS = [["baloo-2", [600, 700, 800]], ["be-vietnam-pro", [400, 500, 600, 700]]]
  .flatMap(([name, weights]) => weights.flatMap((w) => ["latin", "latin-ext", "vietnamese"].map((s) => `fonts/${name}-${s}-${w}-normal.woff2`)));
const FILES = [
  "./", "manifest.webmanifest", "css/app.css",
  "js/config.js", "js/store.js", "js/store-supabase.js", "js/quiz.js", "js/app.js", "js/bridge.js",
  "data/calendar-2026-2027.js", "data/modules.js", "data/banks.js",
  "modules/ioe-4/index.html", "modules/ioe-6/index.html", "modules/l4-giua-ki-1/index.html", "modules/l6-giua-ki-1/index.html",
  "fonts/fonts.css", ...FONTS,
  "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "icons/apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION)
    .then((cache) => cache.addAll(FILES.map((f) => new Request(f, { cache: "reload" })))) // bỏ qua đệm HTTP của trình duyệt
    .then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  const req = e.request, scope = self.registration.scope;
  if (req.method !== "GET" || !req.url.startsWith(scope)) return;
  const path = req.url.slice(scope.length);
  e.respondWith(caches.open(VERSION).then((cache) => (/^(fonts|icons)\//.test(path) ? cacheFirst : networkFirst)(req, cache)));
});

/* Khóa trong đệm bỏ phần ?…: bài ôn mở bằng modules/<mã>/index.html?u=<học sinh>&m=<mã> dùng chung một bản. */
const keyOf = (req) => { const u = new URL(req.url); u.search = ""; u.hash = ""; return u.href; };
function fetchAndKeep(req, cache, key) {
  return fetch(req).then((res) => { if (res.ok) cache.put(key, res.clone()).catch(() => {}); return res; });
}
function cacheFirst(req, cache) {
  const key = keyOf(req);
  return cache.match(key).then((hit) => hit || fetchAndKeep(req, cache, key));
}
function networkFirst(req, cache) {
  const key = keyOf(req);
  // Mở trang lạ trong phạm vi app khi mất mạng: trả về trang chính.
  const saved = () => cache.match(key).then((hit) => hit || (req.mode === "navigate" ? cache.match(self.registration.scope) : undefined));
  const net = fetchAndKeep(req, cache, key);
  const slow = new Promise((ok) => setTimeout(ok, SLOW_MS)).then(saved).then((hit) => hit || net);
  return Promise.race([net, slow]).catch(() => saved().then((hit) => hit || Promise.reject(new Error("offline"))));
}
