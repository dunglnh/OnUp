/* Chạy một script kiểm thử như thể hôm nay là FAKE_NOW, không sửa file kiểm thử (L28: kiểm thử không được hỏng theo ngày chạy).
   Chạy (máy chủ python3 -m http.server 8000 đang chạy):
     FAKE_NOW=2026-11-14T10:00:00Z node tests/chay-theo-ngay.js tests/e2e.js
     FAKE_NOW=2027-06-01T10:00:00Z node tests/chay-theo-ngay.js tests/supabase/cloud-e2e.js
   Lệch Date của node (script kiểm thử, máy chủ giả, Edge Function admin) và cài đồng hồ giả lập của Playwright ở cùng giờ cho mọi
   context. Hai script tự cài đồng hồ ở TODAY (đầu file) đè lên giờ này, nên phải in OK như ở ngày thật; chỗ nào còn theo ngày chạy
   thì hỏng ở đây. Riêng mã của Playwright đọc giờ thật: đồng hồ của nó ghi Date.now() của node vào nhật kí để trang dựng lại giờ khi
   tải lại, nếu cũng lệch thì sau khi tải lại giờ trong trang lùi về lúc cài, đổi đồng hồ gần nhất (L43). Lời gọi Date của Playwright
   nhận ra theo chỗ gọi, tức dòng đầu tiên của stack không thuộc file này, nằm ở file nào của playwright-core (PW_CLOCK): đến bản 1.56
   là lib/server/clock.js; từ 1.63 mọi mã gộp vào lib/coreBundle.js, nên mọi lời gọi Date của Playwright đều lấy giờ thật (kiểm thử
   không dùng giờ Playwright tự lấy). Không xét cả stack: hàm gọi lại của kiểm thử (máy chủ giả qua exposeFunction, route) có mã của
   Playwright ở các dòng dưới mà vẫn phải lệch giờ. Mỗi lần cài đồng hồ mà không nhận ra lời gọi Date nào của Playwright thì dừng
   ngay, in phiên bản Playwright và chỗ gọi Date thấy được (Playwright đổi cách đóng gói: sửa PW_CLOCK).
   Không có FAKE_NOW thì chạy script như thường. */
process.env.PW_EXPERIMENTAL_SERVICE_WORKER_NETWORK_EVENTS = "1"; // như đầu hai script: đặt trước khi nạp playwright
const FAKE = process.env.FAKE_NOW;
const PW_CLOCK = /playwright-core[\\/]lib[\\/](server[\\/]clock|coreBundle)\.js:/;
let pwSeen = 0, pwOther = []; // số lời gọi Date nhận ra là của Playwright; chỗ gọi khác trong thư mục của Playwright (để báo khi dừng)
if (FAKE) {
  const Real = Date, OFF = new Real(FAKE).getTime() - Real.now();
  if (isNaN(OFF)) throw new Error("FAKE_NOW không phải ngày giờ: " + FAKE);
  const pwClock = () => {
    const at = new Error().stack.split("\n").find((l, i) => i > 0 && !l.includes(__filename + ":")) || "", hit = PW_CLOCK.test(at);
    if (hit) pwSeen++; else if (pwOther.length < 5 && /node_modules[\\/]playwright/.test(at)) pwOther.push(at.trim());
    return hit;
  };
  const now = () => (pwClock() ? Real.now() : Real.now() + OFF);
  class D extends Real { constructor(...a) { if (a.length) super(...a); else super(now()); } static now() { return now(); } }
  global.Date = D;
}
const pw = require("playwright"), launch = pw.chromium.launch.bind(pw.chromium);
pw.chromium.launch = async (...args) => {
  const b = await launch(...args), nc = b.newContext.bind(b);
  b.newContext = async (...o) => {
    const c = await nc(...o);
    if (!FAKE) return c;
    const seen = pwSeen; pwOther = [];
    await c.clock.install({ time: new Date() });
    if (pwSeen > seen) return c;
    let v = "?"; try { v = require("playwright/package.json").version; } catch {}
    console.error(`Không nhận ra mã đồng hồ của Playwright ${v}: sửa PW_CLOCK trong tests/chay-theo-ngay.js.` +
      (pwOther.length ? "\nChỗ gọi Date của Playwright lúc cài đồng hồ:\n  " + pwOther.join("\n  ") : ""));
    await b.close().catch(() => {});
    process.exit(1);
  };
  return b;
};
require(require("path").resolve(process.argv[2]));
