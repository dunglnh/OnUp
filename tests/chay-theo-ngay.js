/* Chạy một script kiểm thử như thể hôm nay là FAKE_NOW, không sửa file kiểm thử (L28: kiểm thử không được hỏng theo ngày chạy).
   Chạy (máy chủ python3 -m http.server 8000 đang chạy):
     FAKE_NOW=2026-11-14T10:00:00Z node tests/chay-theo-ngay.js tests/e2e.js
     FAKE_NOW=2027-06-01T10:00:00Z node tests/chay-theo-ngay.js tests/supabase/cloud-e2e.js
   Lệch Date của node (script kiểm thử, máy chủ giả, Edge Function admin) và cài đồng hồ giả lập của Playwright ở cùng giờ cho mọi
   context. Hai script tự cài đồng hồ ở TODAY (đầu file) đè lên giờ này, nên phải in OK như ở ngày thật; chỗ nào còn theo ngày chạy
   thì hỏng ở đây. Riêng đồng hồ của Playwright (server/clock.js) đọc giờ thật: nó ghi Date.now() của node vào nhật kí để trang dựng
   lại giờ, nếu cũng lệch thì giờ trong trang bị trừ mất khoảng lệch. Không có FAKE_NOW thì chạy script như thường. */
process.env.PW_EXPERIMENTAL_SERVICE_WORKER_NETWORK_EVENTS = "1"; // như đầu hai script: đặt trước khi nạp playwright
const FAKE = process.env.FAKE_NOW;
if (FAKE) {
  const Real = Date, OFF = new Real(FAKE).getTime() - Real.now();
  if (isNaN(OFF)) throw new Error("FAKE_NOW không phải ngày giờ: " + FAKE);
  const pwClock = () => /playwright-core[\\/]lib[\\/]server[\\/]clock/.test(new Error().stack);
  const now = () => (pwClock() ? Real.now() : Real.now() + OFF);
  class D extends Real { constructor(...a) { if (a.length) super(...a); else super(now()); } static now() { return now(); } }
  global.Date = D;
}
const pw = require("playwright"), launch = pw.chromium.launch.bind(pw.chromium);
pw.chromium.launch = async (...args) => {
  const b = await launch(...args), nc = b.newContext.bind(b);
  b.newContext = async (...o) => { const c = await nc(...o); if (FAKE) await c.clock.install({ time: new Date() }); return c; };
  return b;
};
require(require("path").resolve(process.argv[2]));
