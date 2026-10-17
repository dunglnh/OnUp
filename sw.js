/* Service worker: mở lại được app khi mất mạng (đăng kí trong js/app.js).
   - Khi cài: tải sẵn mọi file trong FILES vào đệm, nên lần mở sau không cần mạng.
   - Mỗi lần mở trang (cả trang chính lẫn bài ôn trong khung) dùng một bộ file thống nhất, không trộn bản cũ với bản mới
     (ví dụ js/app.js cũ chạy cùng js/store.js mới ngay sau một lần cập nhật, trên mạng chậm):
     · Trang (HTML): mạng trước, để bản mới đưa lên GitHub Pages là học sinh có ngay. Mất mạng, hoặc mạng chậm quá SLOW_MS
       mà đệm đã có bản cũ, thì dùng bản trong đệm. Ghi lại trang lấy từ đâu, theo mã trang (resultingClientId).
     · JS, CSS, data/, manifest của trang đó (clientId): trang lấy từ đệm thì lấy từ đệm (cả trang là bản cũ);
       trang lấy từ mạng thì lấy từ mạng, đợi bao lâu cũng được, chỉ dùng đệm khi mạng lỗi hẳn.
       Không rõ trang lấy từ đâu (service worker vừa khởi động lại, trình duyệt cũ không có resultingClientId): như trang HTML.
     Bản tải từ mạng được dùng thì cập nhật đệm. Bản đến sau khi đã dùng đệm thì bỏ, để đệm không thành nửa cũ nửa mới.
   - Font, biểu tượng (fonts/, icons/): đệm trước, vì không đổi giữa các bản.
   - Câu hỏi của đề có sẵn (data/banks/<khối>-<môn>.js) không nằm trong FILES (chỉ có danh mục data/banks/index.js): app chỉ
     tải file của môn khi mở đề. Bản tải về được dùng thì vào đệm như các file khác, nên đề đã mở thì mở lại được khi mất
     mạng. Đổi VERSION thì các file câu hỏi đã có được chép sang đệm mới (keepBanks).
   - Chỉ xử lí request GET cùng origin, trong phạm vi app. Request tới Supabase, Cloudflare (CAPTCHA), CDN (supabase-js)
     đi thẳng ra mạng, không bao giờ vào đệm. Trang admin của chủ app (admin.html) cũng đi thẳng ra mạng: trang đó luôn
     cần mạng, không đệm, và mạng chậm hay mất mạng thì không bị thay bằng trang học.
   Thêm, bớt, đổi tên file trong FILES, hoặc đổi font, biểu tượng: tăng VERSION. Bản mới cài lại đệm và xóa đệm cũ.
   tests/e2e.js so FILES với các file có trong repo. */
const VERSION = "onup-v4";
const PREFIX = "onup-"; // GitHub Pages: các repo của một tài khoản chung origin, chỉ xóa đệm của app này
const SLOW_MS = 4000;
const FONTS = [["baloo-2", [600, 700, 800]], ["be-vietnam-pro", [400, 500, 600, 700]]]
  .flatMap(([name, weights]) => weights.flatMap((w) => ["latin", "latin-ext", "vietnamese"].map((s) => `fonts/${name}-${s}-${w}-normal.woff2`)));
const FILES = [
  "./", "manifest.webmanifest", "css/app.css",
  "js/config.js", "js/store.js", "js/store-supabase.js", "js/quiz.js", "js/app.js", "js/bridge.js",
  "data/grades.js", "data/calendar-2026-2027.js", "data/modules.js", "data/banks/index.js",
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
    .then((keys) => {
      const old = keys.filter((k) => k.startsWith(PREFIX) && k !== VERSION);
      return keepBanks(old).then(() => Promise.all(old.map((k) => caches.delete(k))));
    })
    .then(() => self.clients.claim()));
});
/* Chép file câu hỏi đã mở (data/banks/, trừ danh mục index.js) từ đệm cũ sang đệm mới. Lần sau mở đề khi có mạng thì
   bản mới thay vào như mọi file khác. Lỗi thì bỏ qua: học sinh chỉ phải mở lại đề khi có mạng. */
const BANK_FILE = /\/data\/banks\/(?!index\.js$)[^/]+\.js$/;
function keepBanks(old) {
  return caches.open(VERSION).then((cache) => Promise.all(old.map((k) => caches.open(k)
    .then((c) => c.keys().then((reqs) => Promise.all(reqs.filter((r) => BANK_FILE.test(r.url))
      .map((r) => cache.match(r).then((hit) => hit || c.match(r).then((res) => res && cache.put(r, res))))))))))
    .catch(() => {});
}

/* Mã trang → "net" | "cache": trang đó lấy từ mạng hay từ đệm. Chỉ giữ các trang mở gần đây. */
const pages = new Map();
function remember(id, from) {
  if (!id) return;
  pages.delete(id); pages.set(id, from);
  if (pages.size > 100) pages.delete(pages.keys().next().value);
}

self.addEventListener("fetch", (e) => {
  const req = e.request, scope = self.registration.scope;
  if (req.method !== "GET" || !req.url.startsWith(scope)) return;
  const path = req.url.slice(scope.length);
  if (/^admin\.html([?#]|$)/.test(path)) return; // request.url giữ cả phần #…
  e.respondWith(caches.open(VERSION).then((cache) => {
    if (/^(fonts|icons)\//.test(path)) return cacheFirst(req, cache);
    if (req.mode === "navigate") return networkFirst(req, cache, (from) => remember(e.resultingClientId, from));
    const from = pages.get(e.clientId);
    return from === "cache" ? cacheFirst(req, cache) : from === "net" ? networkOnly(req, cache) : networkFirst(req, cache);
  }));
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
/* Trang lấy từ mạng: chỉ dùng đệm khi mạng lỗi hẳn. */
function networkOnly(req, cache) {
  const key = keyOf(req);
  return fetchAndKeep(req, cache, key).catch(() => cache.match(key).then((hit) => hit || Promise.reject(new Error("offline"))));
}
/* Mạng trước; mất mạng, hoặc quá SLOW_MS mà đệm có bản cũ, thì dùng đệm. used("net" | "cache") báo bản nào được dùng.
   Bản từ mạng chỉ vào đệm khi được dùng. */
function networkFirst(req, cache, used) {
  const key = keyOf(req);
  // Mở trang lạ trong phạm vi app khi mất mạng: trả về trang chính.
  const saved = () => cache.match(key).then((hit) => hit || (req.mode === "navigate" ? cache.match(self.registration.scope) : undefined));
  return new Promise((resolve, reject) => {
    let done = false, timer = 0;
    const use = (res, from) => { if (done || !res) return false; done = true; clearTimeout(timer); if (used) used(from); resolve(res); return true; };
    fetch(req).then((res) => { if (!done && res.ok) cache.put(key, res.clone()).catch(() => {}); use(res, "net"); },
      () => saved().then((hit) => { if (!use(hit, "cache") && !done) { done = true; reject(new Error("offline")); } }));
    timer = setTimeout(() => saved().then((hit) => use(hit, "cache")), SLOW_MS);
  });
}
