# Sửa lỗi cơ bản sau khi dùng thử (16/10/2026)

Trạng thái: **Phiên 9a, 9b, 9c đã làm** (L1–L14, PR #21, #22, #23; ảnh 360px sau Phiên 9b: [hinh-360/](hinh-360/)). **Phiên 9d chưa làm** (L15–L19, lỗi phát sinh tìm được khi rà soát lại ngày 17/10). Các phiên Claude Code để sửa: mục 3.

**Cách đã thử:** chạy mã nhánh `main` (commit `5866b72`, giống bản đang đăng trên GitHub Pages) bằng Chromium tự động, màn hình điện thoại 360×740, rồi thêm chế độ tối và màn hình 1280px. Đi hết các luồng:
- thiết lập lần đầu và các tab quản trị;
- thêm học sinh, đăng nhập bằng PIN;
- làm đề ngân hàng (cả "Làm như thi");
- mở đủ 4 bài ôn trong khung;
- trang lịch, trang tài khoản.

**Phần đã tốt (giữ nguyên):**
- `tests/e2e.js` in `E2E OK`.
- Không có lỗi JavaScript.
- Không màn nào bị tràn ngang.
- Ô nhập nào cũng có nhãn.
- Bản lưu trên máy không gọi mạng ngoài, trừ Google Fonts.

---

## 1. Danh sách lỗi

Mã lỗi (L1, L2…) dùng trong lời giao việc và trong commit.

### Nhóm A · Mất bài, mất dữ liệu, khóa PIN (Phiên 9a)

**L1. Đang làm bài mà rời trang là mất bài, không hỏi lại.**
- Trong đề ngân hàng, nút "← Thoát" có hỏi xác nhận (`confirmExit` trong `js/quiz.js`).
- Nhưng nút Back của trình duyệt, nút "Lịch thi" và hình đại diện trên thanh đầu (`drawWho` trong `js/app.js`) đổi hash ngay. `route()` gọi `quizRun.stop()`, nên bài bị hủy và điểm không được lưu.
- Đã thử: làm như thi, trả lời câu 1, bấm Back → về trang chủ, không có kết quả nào được lưu.
- Bài ôn trong khung (`#/play/<mã>`) cũng vậy: rời trang khi đang làm đề có giờ thì mất bài, không hỏi.
- Tải lại trang hay đóng tab cũng không có cảnh báo.

**L2. Khóa PIN sau 5 lần sai bị vượt qua bằng cách tải lại trang.**
- Biến `lock` trong `renderLogin` (`js/app.js`) chỉ nằm trong bộ nhớ.
- Đã thử: sai 6 lần thì app báo "Đợi 30 giây". Tải lại trang thì nhập tiếp được ngay.
- Khóa dùng chung cho mọi người, không tính riêng từng tài khoản.
- PIN 4 số chỉ có 10.000 tổ hợp, nên anh chị em trong nhà dễ đoán PIN của nhau, kể cả PIN của quản trị.
- CLAUDE.md đã ghi PIN cục bộ không phải bảo mật thật. Mục tiêu ở đây chỉ là làm việc đoán mò tốn thời gian, không phải mã hóa.

**L3. Đường dẫn sai, đề sai khối: app không báo gì.**
- Gõ `#/khongcotrang` thì app lặng lẽ hiện trang chủ (`default:` trong `route()`).
- Học sinh lớp 6 mở được đề lớp 4 bằng cách gõ `#/quiz/toan4-ck1-de1`, và kết quả được lưu vào hồ sơ lớp 6.
- `#/play/<mã>` cũng không kiểm tra khối.

### Nhóm B · Giao diện điện thoại 360px (Phiên 9b)

**L4. Bài ôn trong khung bị cuộn hai lớp.**
- `.player iframe` có `height: calc(100dvh - 130px)`, nhưng khung bắt đầu ở 164px vì thanh đầu và hàng "← Trang chính" + dòng chú thích xuống 2 dòng. Bên dưới khung còn dòng chú thích `.foot`.
- Nội dung bài ôn dài 2.500–4.000px, nên học sinh phải cuộn trong khung rồi cuộn cả trang.
- Ảnh tham khảo: ioe-4 ở 360px chỉ thấy khoảng 4 unit trong một khung bo góc, trang ngoài vẫn cuộn được.

**L5. Tab quản trị bị che ở 360px.**
- `.tabs` có `overflow-x:auto` nhưng không có dấu hiệu cuộn: chỉ thấy "Tổng quan · Tài khoản · Lịch thi · N…".
- Hai tab "Ngân hàng đề" và "Dữ liệu" nằm ngoài màn hình.

**L6. Nút và link nhỏ so với tay trẻ.**
- `.linkbtn` ("← Trang chính", "← Quay lại", "← Thoát", "Cả năm →") cao 33px.
- `.btn.sm` ("Vào ôn", "Làm bài", "+ Thêm", "Lưu", "Tải file sao lưu") cao 36px.
- Nên tối thiểu 44×44px vùng bấm; chữ có thể giữ cỡ cũ, chỉ tăng padding hoặc min-height.

**L7. Chữ quá nhỏ.** `.tag`, `.ev .d small`, `.stat small`, `.rp-day span/small` đặt `.72rem` (11,5px), ví dụ "Còn 17 ngày", "Dự kiến", "đến 13/11". Nên tối thiểu `.8125rem` (13px).

**L8. Hàng thống kê 3 ô bị vỡ thành 2 + 1.** Dưới 520px, `.stats` chuyển sang 2 cột, nên hàng 3 ô ở trang chủ học sinh và quản trị bị lệch. `.stats.four` thì 2 + 2 là đúng.

**L9. Trang chủ học sinh quá dài.**
- Học sinh lớp 6 có trang chủ dài khoảng 3.500px: 2 bài ôn và 12 thẻ đề cuối kì giống hệt nhau xếp dọc.
- "Kết quả gần đây" bị đẩy xuống tận cuối trang.

**L10. Bàn phím PIN chỉ tự vào khi đủ 6 số.** `wirePinBox` chỉ gọi `submit` khi `pin.length === 6`. PIN 4 số (đa số) nhập xong không có gì xảy ra cho đến khi bấm "Vào", nên trẻ dễ tưởng app bị đứng.

**L11. Dòng chú thích lịch thi (`.foot`) hiện ở mọi màn hình,** kể cả lúc làm bài thi và trong bài ôn, gây rối mắt và chiếm chỗ.

### Nhóm C · Không cần mạng, không mất dữ liệu (Phiên 9c)

**L12. Font Google chặn hiển thị.**
- `index.html` nạp `fonts.googleapis.com` bằng `<link rel="stylesheet">` trong `<head>`.
- Khi mạng chậm hoặc chặn Google (đã gặp khi thử: `ERR_TUNNEL_CONNECTION_FAILED`), trang trắng cho đến khi hết thời gian chờ.
- README nói bản lưu trên máy "chạy được cả khi không có mạng", nên font cần nằm trong repo.

**L13. Không mở lại được khi mất mạng.** Không có service worker và không có web app manifest: mất mạng mà tải lại hoặc mở lại trang là không vào được, dù dữ liệu vẫn còn trong localStorage.

**L14. Nguy cơ mất dữ liệu bản lưu trên máy.**
- Safari trên iPhone/iPad có thể xóa dữ liệu của trang không được mở trong 7 ngày, trừ khi trang đã được thêm vào Màn hình chính. Xóa lịch sử trình duyệt cũng làm mất hết.
- Hiện app chỉ nhắc sao lưu bằng một dòng chữ nhỏ ở màn hình thiết lập và trong Quản trị → Dữ liệu.
- App không biết lần sao lưu cuối là khi nào.

### Nhóm D · Phát sinh sau Phiên 9a–9c (Phiên 9d)

**Lần rà soát thứ hai (17/10/2026):** chạy bản `main` commit `b651567` (đã gộp PR #21, #22, #23).
- Bốn bộ kiểm thử đều in OK: `tests/e2e.js`, `tests/supabase/admin-test.mjs`, `store-test.mjs`, `cloud-e2e.js`.
- Thử thêm bằng Chromium ở 360×740, có chạm như điện thoại, sáng và tối. Giả lập ngày 1/4/2027 bằng `page.clock.install`.
- L1–L14 đã sửa đúng. Các lỗi dưới đây là lỗi mới, hoặc lỗi cũ nay gặp thường hơn.

**L15. Vào "Làm như thi" rồi rời ngay, chưa làm câu nào, vẫn bị lưu điểm 0/25.**
- Đã thử: mở đề Toán 4, bấm "Làm như thi", rồi bấm "Lịch thi" trên thanh đầu. Hộp hỏi chỉ có "Nộp bài" và "Làm tiếp"; chọn "Nộp bài" thì lưu kết quả 0/25. Nút "← Thoát" trong đề cũng vậy (`confirmExit` → `finish` trong `js/quiz.js`).
- `finish()` điền mọi câu chưa làm thành sai rồi gọi `onFinish` khi `total > 0`, nên lượt thi chưa trả lời câu nào vẫn được lưu.
- Hậu quả thấy được sau 2 lần thoát như vậy:
  - Phụ huynh thấy "TB 30 ngày 0/10".
  - "Chủ đề hay sai" đầy đủ 25 chủ đề của đề.
  - "Bài trong 7 ngày" và "ngày ôn liên tiếp" vẫn tăng.
- Trước Phiên 9a, bấm Back là bỏ bài mà không lưu. Giờ mọi đường rời trang đều đi qua "Nộp bài", nên lỗi này gặp thường hơn.

**L16. Bài ôn trong khung hỏi "Bài đang làm dở sẽ không được lưu" dù chưa làm gì.**
- Chốt bật khi có `pointerdown` ở bất kỳ đâu trong trang bài ôn (`renderPlay` trong `js/app.js`). Vuốt cuộn danh sách Unit trên điện thoại cũng sinh `pointerdown`.
- Đã thử: chạm vào lề trống của ioe-4 rồi bấm "← Trang chính" thì hộp hỏi hiện ra. Làm xong một đề (điểm đã gửi về) rồi bấm xem lại câu sai thì cũng bị hỏi.
- Bị hỏi nhầm nhiều lần thì trẻ quen tay bấm "Rời bài", và hộp hỏi mất tác dụng khi bài đang làm dở thật.

**L17. iPhone, iPad: mở app từ Màn hình chính không thấy dữ liệu đã có trong Safari.**
- Trên iOS, app mở từ biểu tượng ở Màn hình chính có kho dữ liệu riêng, không dùng chung localStorage với Safari ([WebKit bug 181849](https://bugs.webkit.org/show_bug.cgi?id=181849)).
- Phiên 9c khuyên "Thêm vào Màn hình chính" (Quản trị → Dữ liệu), nhưng không nói điều này. Gia đình đã dùng OnUp trong Safari, bấm biểu tượng mới sẽ thấy màn hình thiết lập trống. Dễ có người tạo lại từ đầu, và dữ liệu nằm lại trong Safari, nơi iOS có thể xóa sau 7 ngày không mở.
- `backupNow()` ghi `lastBackupAt` ngay lúc bấm nút, trước khi biết file có thật sự tải về hay không. Khi mở app từ Màn hình chính trên iOS, tải file bằng `<a download>` có thể không lưu được file ra máy. Khi đó thẻ nhắc vẫn biến mất dù chưa có bản sao lưu nào.
- Chưa thử được trên iPhone thật (máy thử không có iOS). Phần này dựa trên cách iOS hoạt động, cần bố mẹ thử lại (mục 2, Phiên 9d).

**L18. Đánh số đề sai trong nhóm "Bài ôn khác" và khi kì thi chỉ gắn một phần đề.**
- `practiceList` ghi nút "Đề 1, Đề 2…" theo thứ tự trong hàng, không theo số đề thật.
- Đã thử với ngày giả lập 1/4/2027 (giữa kì II đã qua): mọi đề lớp 4 dồn vào nhóm "Bài ôn khác". Hàng Toán hiện "Đề 1 … Đề 5", trong đó "Đề 4" là "Toán 4 · Giữa kì II · Đề 1". Hàng Tiếng Việt cũng lệch như vậy.
- Kì thi chỉ gắn "Đề 2" và "Đề 3" của một môn thì nút ghi "Đề 1, Đề 2".

**L19. Rủi ro: service worker có thể trộn file cũ và file mới trên mạng chậm (chưa gặp).**
- `networkFirst` trong `sw.js` quyết định riêng từng file: file nào tải quá `SLOW_MS` (4 giây) thì lấy bản trong đệm, file nào nhanh thì lấy bản mới.
- Ngay sau một lần cập nhật, trên mạng chậm, trang có thể chạy `js/app.js` cũ cùng `js/store.js` mới (hoặc ngược lại). Nếu hai bản không khớp nhau thì app lỗi.
- Chưa tái hiện được; ghi lại để chặn trước khi Phiên B sửa nhiều `js/store-supabase.js` và `js/app.js` cùng lúc.

---

## 2. Cách sửa gợi ý và điều kiện xong

### Phiên 9a

**L1 · Chặn rời trang khi đang làm bài.**
- Thêm vào `js/app.js` một "chốt rời trang" dùng chung, ví dụ `leaveGuard = { active: () => bool, message }`.
- Chốt bật khi:
  - đang làm đề ngân hàng và chưa nộp: `Quiz.run` trả thêm `busy()`;
  - đang ở `#/play/<mã>` và học sinh đã chạm vào bài trong khung. Khung cùng origin, nên app gắn `pointerdown`/`keydown` vào `contentDocument` khi khung tải xong. Tắt chốt khi nhận `ontap:result`.
- **Không đổi ba chỗ nối của bài ôn với app.**
- `hashchange` không hủy được. Khi chốt đang bật:
  1. ghi hash đích;
  2. đặt lại hash cũ, không vẽ lại màn hình;
  3. hiện hộp xác nhận ngay trong trang (kiểu `.confirm` đang có). Đề thi: "Nộp bài và rời trang?"; bài ôn: "Rời bài ôn? Bài đang làm dở sẽ không được lưu.";
  4. đồng ý thì đi tới hash đích. Với đề ngân hàng thì **nộp bài** (lưu điểm như bấm Nộp) trước khi đi.
- Thêm `beforeunload` khi chốt bật.
- Trong lúc làm như thi, ẩn link "Lịch thi" và nút tài khoản ở thanh đầu, hoặc để chúng đi qua cùng chốt.

**L2 · Khóa PIN lưu lại và tính riêng từng người.**
- Lưu `{fails, until}` theo mã người dùng trong localStorage (khóa riêng, ví dụ `ontap_pinlock_v1`, bọc try/catch).
- Thời gian chờ tăng dần: 30 giây, 1 phút, 5 phút, rồi 15 phút cho mỗi 5 lần sai tiếp.
- Đăng nhập đúng thì xóa bộ đếm của người đó. Thông báo có đếm ngược.
- Không mô tả là "an toàn" trên giao diện.
- Chỉ sửa luồng đăng nhập bản lưu trên máy. Bản đám mây sẽ được viết lại ở Phiên B. Nên viết thành hàm nhỏ dùng lại được, vì Phiên B cần PIN 4 số cho hồ sơ con.

**L3 · Báo trang không có, chặn đề sai khối.**
- Đường dẫn lạ thì hiện panel "Không tìm thấy trang" + nút về trang chính.
- Học sinh mở `#/quiz/<mã>` hoặc `#/play/<mã>` khác khối của mình thì hiện "Bài này dành cho lớp X" + nút về trang chính, không cho làm và không lưu điểm.
- Phụ huynh và quản trị vẫn xem thử được mọi khối như hiện nay.

**Xong khi:** `tests/e2e.js` có thêm các bước sau và vẫn in `E2E OK`:
- làm như thi 1 câu, bấm Back thì hiện hộp xác nhận; chọn ở lại thì vẫn đúng câu đó; chọn rời thì có 1 kết quả mới;
- sai PIN 5 lần, tải lại trang thì vẫn bị khóa, và người dùng khác vẫn đăng nhập được;
- `#/khongcotrang` hiện "Không tìm thấy";
- học sinh lớp 6 mở đề lớp 4 bị chặn.

### Phiên 9b

**L4.**
- Khi ở `#/play`, thêm class trên `body` (ví dụ `playing`) để ẩn `.foot` và rút gọn hàng trên khung còn 1 dòng (dòng chú thích dài bỏ vào `title` hoặc rút còn "Điểm được lưu" / "Xem thử").
- Khung cao đúng phần còn lại của màn hình, tính bằng `100dvh` trừ chiều cao thực của phần phía trên (CSS hoặc đo bằng JS khi `resize`), để **chỉ còn một lớp cuộn** (cuộn trong khung).

**L5.** Trên màn hẹp, cho `.tabs` xuống dòng (`flex-wrap:wrap`) hoặc xếp lưới 3 cột, để thấy đủ 5 tab mà không cần cuộn ngang.

**L6.** `.btn.sm`, `.linkbtn`, `.tabs button`, nút trong `.pad` có `min-height:44px`, và `.linkbtn` có `min-width:44px`. Kiểm tra lại bố cục không vỡ ở 360px.

**L7.** Mọi chữ phụ tối thiểu `.8125rem`. Kiểm tra độ tương phản `--muted` trên `--surface` vẫn đạt 4,5:1 ở cả sáng và tối.

**L8.** Hàng 3 ô giữ 3 cột ở mọi bề rộng: thu cỡ chữ `.stat b`, cho chữ nhãn xuống dòng. Chỉ `.stats.four` mới về 2 cột.

**L9.**
- Trang chủ học sinh: "Kết quả gần đây" (tối đa 3 dòng) đưa lên ngay dưới hàng thống kê.
- "Tất cả bài ôn" gom theo kì thi: kì thi gần nhất mở sẵn, các kì sau thu gọn (`<details>`). Trong mỗi kì, đề ngân hàng gom theo môn thành một dòng có các nút "Đề 1 · Đề 2 · Đề 3".
- Không bỏ đề nào.

**L10.** Khi chọn người, app biết độ dài PIN của người đó. Bản lưu trên máy:
- thêm trường `pinLen` khi tạo hoặc đổi PIN;
- với dữ liệu cũ chưa có `pinLen`: thử đăng nhập khi đủ 4 số. Nếu sai thì **không tính là một lần sai** mà chờ nhập tiếp đến 6 số hoặc bấm "Vào".
- Theo quy ước CLAUDE.md: trường mới có giá trị mặc định khi đọc dữ liệu cũ.

**L11.** `.foot` chỉ hiện ở trang chủ và trang Lịch thi.

**Xong khi:**
- `tests/e2e.js` in `E2E OK`.
- Có thêm kiểm tra tự động ở 360px: không tràn ngang; mọi `button`, `a.btn`, `.linkbtn` hiện trên màn hình cao ≥ 44px; không có chữ nhỏ hơn 13px.
- Ảnh chụp 360px sáng/tối của: trang chủ học sinh, bài ôn trong khung, tab quản trị, đăng nhập. Đính kèm vào Pull Request.

### Phiên 9c

**L12.**
- Tự lưu font trong repo, ví dụ thư mục `fonts/` có các file woff2 subset Latin và tiếng Việt, kèm `@font-face` trong `css/app.css` với `font-display:swap`.
- Bỏ link Google Fonts ở `index.html` và trong 4 file `modules/*/index.html` nếu có.
- Lấy font từ gói npm `@fontsource/baloo-2` và `@fontsource/be-vietnam-pro` (giấy phép SIL OFL, ghi chú giấy phép trong `fonts/`).

**L13.**
- Thêm `manifest.webmanifest` (tên OnUp, màu nền và màu chủ đạo theo token, biểu tượng 192/512 vẽ từ biểu tượng hiện có) và `sw.js` ở thư mục gốc.
- Cách lưu đệm:
  - Mạng trước, đệm sau cho HTML, JS, CSS và `data/`, để bản mới lên Pages là học sinh có ngay.
  - Đệm trước cho font và biểu tượng.
- Có hằng số phiên bản đệm và xóa đệm cũ khi kích hoạt.
- **Không** lưu đệm request đến Supabase, Cloudflare hay CDN.
- Đăng kí service worker trong `js/app.js`, bọc try/catch. Bỏ qua khi mở bằng `file://`.
- Ghi vào CLAUDE.md: khi đổi danh sách file cần lưu đệm thì tăng phiên bản đệm.

**L14.**
- Lưu `lastBackupAt` khi tải file sao lưu (Store, có giá trị mặc định cho dữ liệu cũ).
- Bản lưu trên máy: khi quản trị hoặc phụ huynh vào trang chủ mà đã quá 7 ngày chưa sao lưu (hoặc chưa sao lưu lần nào và đã có kết quả), hiện thẻ nhắc có nút "Tải file sao lưu".
- Thêm mục "Thêm vào Màn hình chính" ngắn trong Quản trị → Dữ liệu (iPhone: nút Chia sẻ → Thêm vào MH chính; Android: menu ⋮ → Thêm vào màn hình chính).
- Bản đám mây không cần nhắc.

**Xong khi:**
- `tests/e2e.js` in `E2E OK` và không có request nào ra ngoài `localhost` ở bản lưu trên máy (sửa phần kiểm tra `cloudReqs` cho chặt hơn: mọi host khác localhost).
- Thêm bước kiểm tra trong e2e: tải trang một lần, cho trình duyệt offline (`context.setOffline(true)`), tải lại thì vẫn vào được trang đăng nhập và mở được một đề ngân hàng.
- `node tests/supabase/cloud-e2e.js` vẫn in `CLOUD E2E OK`, nghĩa là service worker không làm hỏng bản đám mây.

### Phiên 9d

**L15 · Lượt thi chưa trả lời câu nào thì không lưu điểm.**
- `js/quiz.js`:
  - Đối tượng trả về từ `Quiz.run` có thêm `answered()`: số câu đã trả lời (không tính câu bấm "Bỏ qua").
  - Trong `finish()`, làm như thi mà `answered() === 0` thì không gọi `onFinish`. Màn kết quả thay bằng một dòng "Bạn chưa làm câu nào nên không lưu điểm." và hai nút "Làm lại", "Về trang chính".
  - Quy tắc này áp dụng cả khi hết giờ mà chưa trả lời câu nào.
- Hỏi lại khi rời trang (cả `confirmExit` trong quiz.js lẫn chốt trong `js/app.js`) đổi chữ theo trạng thái:
  - Chưa trả lời câu nào: "Thoát đề?" · "Bạn chưa làm câu nào nên không lưu điểm." · nút "Thoát" / "Làm tiếp". Chọn "Thoát" thì dừng đề (`stop()`), không nộp.
  - Đã trả lời ít nhất một câu: giữ như hiện nay ("Nộp bài và rời trang?" · "Câu chưa làm tính là sai.").
- Chốt cần đọc chữ lúc hỏi chứ không phải lúc vào đề: cho phép `guard.ask`, `note`, `yes`, `no`, `leave` là hàm, hoặc thêm `guard.text()` trả về các chữ đó. `askLeave` đọc khi mở hộp.
- Lượt thi đã trả lời ít nhất một câu: giữ quy tắc "câu chưa làm tính là sai".
- Không tự xóa kết quả 0 điểm đã lưu trên máy của người dùng.

**L16 · Bài ôn trong khung: chỉ hỏi khi đang có một lượt làm bài.**
- Cả bốn bài ôn đều vẽ nút `#endBtn` ("Nộp bài sớm" / "Dừng luyện" / "Finish test now" / "End practice") trong `#endArea` khi đang làm một lượt (hàm `drawEnd()`). Nút này không có ở trang đầu và trang kết quả. Đã kiểm tra bằng Chromium cho cả ioe-4, ioe-6, l4-giua-ki-1, l6-giua-ki-1.
- Đổi `guard.busy` của `renderPlay` thành: đọc được `contentDocument` của khung (cùng origin) và trong đó có `#endBtn`. Bỏ việc theo dõi `pointerdown`, `keydown` và `saved()`.
- **Không sửa file nào trong `modules/`, không đổi ba chỗ nối.** App chỉ đọc DOM của bài ôn, không ghi.
- Ghi vào CLAUDE.md, mục "Hợp đồng giữa bài ôn và app": app đọc (không ghi) `#endBtn` trong khung để biết học sinh đang làm dở. Bài ôn mới phải có nút này khi đang làm một lượt và bỏ nút khi xong. Nếu không có, app không hỏi lại, nhưng bài vẫn chạy.
- Mở bằng `file://` hoặc không đọc được `contentDocument` thì không hỏi (như hiện nay).

**L17 · iPhone, iPad: chuyển dữ liệu sang app ở Màn hình chính, sao lưu chắc chắn.**
- Quản trị → Dữ liệu, mục "Thêm vào Màn hình chính":
  - Thêm dòng in đậm: "Trên iPhone, iPad, app ở Màn hình chính **không dùng chung dữ liệu** với Safari."
  - Thêm các bước:
    1. Trong Safari, bấm "Tải file sao lưu" và cất file vào ứng dụng Tệp hoặc Zalo.
    2. Thêm vào Màn hình chính.
    3. Mở app từ biểu tượng mới, chọn "Khôi phục từ file sao lưu".
    4. Dùng app ở Màn hình chính từ đó về sau.
  - Android không cần các bước này (dùng chung dữ liệu với Chrome); ghi rõ để phụ huynh khỏi lo.
- Màn hình thiết lập lần đầu (`renderSetup`): khi `standalone()` đúng (mở từ Màn hình chính), hiện thêm một thẻ ngắn phía trên form: "Đã dùng OnUp trong Safari? Dữ liệu ở đó không tự sang đây. Mở OnUp trong Safari → Quản trị → Dữ liệu → Tải file sao lưu, rồi quay lại đây chọn Khôi phục từ file sao lưu." Thẻ có nút làm nổi bật "Khôi phục từ file sao lưu".
- Sao lưu (`backupNow`):
  - Nếu `navigator.canShare && navigator.canShare({ files: [file] })` thì dùng `navigator.share({ files: [file], title })` để mở bảng chia sẻ (lưu vào Tệp, gửi Zalo…). Chỉ ghi `lastBackupAt` khi `share()` thành công. Người dùng hủy (`AbortError`) thì không ghi và không báo lỗi.
  - Không có `share` thì tải file như hiện nay, ghi `lastBackupAt` như hiện nay.
  - Gọi `share()` ngay trong sự kiện bấm nút (không đợi việc gì khác trước), vì trình duyệt chỉ cho chia sẻ trong lúc người dùng đang bấm.
  - Dùng chung cho thẻ nhắc sao lưu và nút trong Quản trị → Dữ liệu.
- Không đổi định dạng file sao lưu.

**L18 · Nút đề ghi đúng số đề và tên kì.**
- Trong `practiceList`, chữ trên nút lấy từ tên đề, không lấy theo thứ tự trong hàng:
  - Mọi đề trong hàng cùng một kì (phần giữa tên, ví dụ "Cuối kì I") thì ghi "Đề N", với N lấy từ tên (`/Đề\s*(\d+)/`). Tên không có số thì ghi "Đề".
  - Đề trong hàng thuộc nhiều kì khác nhau (nhóm "Bài ôn khác") thì ghi tên đề bỏ phần môn và khối ở đầu, ví dụ "Cuối kì I · Đề 1", "Giữa kì II · Đề 1". Nút dài thì xuống dòng, không tràn ngang.
  - Ngân hàng do quản trị viên nhập, tên tự do: không đoán được phần kì thì ghi nguyên tên đề.
- `aria-label` giữ tên đề đầy đủ như hiện nay.

**L19 · Service worker: mỗi lần mở trang dùng một bộ file thống nhất.**
- Trong `sw.js`:
  - Khi trả một request điều hướng (`req.mode === "navigate"`, gồm cả trang bài ôn trong khung), ghi lại trang đó lấy từ mạng hay từ đệm, theo `e.resultingClientId`, trong một `Map` (bỏ mục cũ khi Map lớn).
  - Các request khác của trang đó (`e.clientId`):
    - Trang lấy từ **đệm**: lấy file từ đệm trước, để cả trang là bản cũ thống nhất.
    - Trang lấy từ **mạng**: lấy file từ mạng, không chạy đua 4 giây; chỉ dùng đệm khi mạng lỗi hẳn.
- Font, biểu tượng: giữ đệm trước như hiện nay.
- Tăng `VERSION` (theo quy tắc trong CLAUDE.md), cập nhật chú thích đầu `sw.js`.

**Xong khi:**
- `tests/e2e.js` in `E2E OK`, có thêm các bước sau:
  - **L15:** vào "Làm như thi", bấm Back khi chưa trả lời câu nào: hộp hỏi ghi "Thoát đề?". Chọn "Thoát" thì số kết quả không đổi. Bấm "← Thoát" khi chưa trả lời: cũng không lưu. Trả lời 1 câu rồi rời: lưu 1 kết quả (giữ bước kiểm tra cũ).
  - **L16:** mở ioe-4, chạm vào trang đầu của bài (chỗ không phải nút bắt đầu) rồi bấm "← Trang chính": đi luôn, không hỏi. Bắt đầu một lượt (có `#endBtn`) rồi bấm "← Trang chính": có hỏi. Sửa bước "leave guard: module in frame (L1)" hiện đang `click("#playerFrame")` cho khớp cách mới.
  - **L17:** giả lập mở từ Màn hình chính bằng `page.addInitScript(() => Object.defineProperty(navigator, "standalone", { get: () => true }))` trên máy chưa có dữ liệu: màn hình thiết lập có thẻ hướng dẫn khôi phục. Giả lập `navigator.canShare`/`navigator.share` trả lỗi `AbortError`: `lastBackupAt` không đổi. Giả lập `share` thành công: `lastBackupAt` được ghi.
  - **L18:** `page.clock.install` ngày 1/4/2027, đăng nhập học sinh lớp 4: trong "Bài ôn khác", hàng Toán có nút "Cuối kì I · Đề 1" và "Giữa kì II · Đề 1", không có nút "Đề 4".
  - **L19:** sau khi service worker đã cài, làm chậm mọi file của app 6 giây và tải lại: trang vẫn hiện trong dưới 6 giây và không lỗi JS. Làm chậm riêng `js/app.js` và đổi nội dung `js/store.js` (thêm một dòng đánh dấu): không được có lúc chạy `app.js` cũ cùng `store.js` mới. Nếu `page.route` không chặn được request do service worker gửi, chạy một máy chủ tĩnh nhỏ bằng Node ngay trong bài kiểm thử, làm chậm được từng đường dẫn.
- `node tests/supabase/cloud-e2e.js` vẫn in `CLOUD E2E OK`.
- Bố mẹ thử trên iPhone thật sau khi Merge (không tốn lượt Claude), ghi kết quả vào GitHub Issue:
  1. Trong Safari, tải file sao lưu: có bảng chia sẻ, lưu được vào Tệp.
  2. Thêm vào Màn hình chính, mở biểu tượng: thấy thẻ hướng dẫn khôi phục.
  3. Khôi phục từ file vừa lưu: thấy đủ tài khoản và kết quả.
  4. Trong app ở Màn hình chính, bấm "Tải file sao lưu": có bảng chia sẻ, lưu được.

---

## 3. Các phiên Claude Code

Làm theo thứ tự, mỗi phiên một cuộc trò chuyện mới, Merge xong mới mở phiên sau. Phiên A (máy chủ) đã gộp và không đụng tới các file các phiên này sửa. Nên làm 9a và 9b **trước Phiên B**, vì Phiên B sửa lại màn hình đăng nhập và trang chủ. Riêng Phiên 9c có thể làm sau Phiên C nếu cần ưu tiên khung tài khoản. Phiên 9d (sau rà soát 17/10) cũng nên làm **trước Phiên B**: nó sửa `js/app.js`, `js/quiz.js`, `sw.js`, và Phiên B sẽ sửa nhiều file cùng lúc nên cần L19 trước.

**Phiên 9a · Không mất bài, khóa PIN, đường dẫn sai**
> Đọc CLAUDE.md và docs/SUA-LOI-CHAY-THU.md (mục 1 nhóm A, mục 2 Phiên 9a). Sửa L1, L2, L3 trong js/app.js và js/quiz.js theo cách gợi ý: chốt rời trang khi đang làm đề ngân hàng hoặc bài ôn trong khung (hộp xác nhận trong trang, nộp bài trước khi rời, beforeunload), khóa PIN lưu trong localStorage theo từng người với thời gian chờ tăng dần, trang "Không tìm thấy" và chặn học sinh mở bài khác khối. Không đổi ba chỗ nối của bài ôn với app, không sửa phần đám mây ngoài chỗ bắt buộc. Mỗi lỗi một commit ghi mã lỗi (L1…). Thêm các bước kiểm tra ở mục "Xong khi" vào tests/e2e.js, chạy đến khi in E2E OK, chỉ tự rà soát một vòng, rồi mở Pull Request liệt kê lỗi đã sửa và chưa sửa được kèm lí do.

**Phiên 9b · Giao diện điện thoại 360px**
> Đọc CLAUDE.md và docs/SUA-LOI-CHAY-THU.md (mục 1 nhóm B, mục 2 Phiên 9b). Sửa L4–L11 trong css/app.css và js/app.js (và js/store.js cho trường pinLen, có giá trị mặc định khi đọc dữ liệu cũ): bài ôn trong khung chỉ còn một lớp cuộn, tab quản trị thấy đủ ở 360px, vùng bấm tối thiểu 44px, chữ tối thiểu 13px, hàng thống kê 3 ô không vỡ, trang chủ học sinh gom bài theo kì thi và môn với kết quả gần đây lên trên, PIN tự vào khi đủ độ dài, chú thích cuối trang chỉ ở trang chủ và lịch. Chỉ dùng token màu có sẵn. Mỗi lỗi một commit ghi mã lỗi. Thêm kiểm tra tự động 360px vào tests/e2e.js (không tràn ngang, nút ≥ 44px, chữ ≥ 13px), chạy đến khi in E2E OK, chụp ảnh 360px sáng/tối các màn hình nêu ở mục "Xong khi", chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh.

**Phiên 9c · Chạy khi mất mạng, nhắc sao lưu**
> Đọc CLAUDE.md và docs/SUA-LOI-CHAY-THU.md (mục 1 nhóm C, mục 2 Phiên 9c). Sửa L12–L14: tự lưu font Baloo 2 và Be Vietnam Pro trong thư mục fonts/ (lấy từ gói npm @fontsource, ghi giấy phép OFL), bỏ Google Fonts ở index.html và các bài ôn; thêm manifest.webmanifest, biểu tượng và sw.js (mạng trước cho HTML/JS/CSS/data, đệm trước cho font, có phiên bản đệm, không đệm Supabase/Cloudflare/CDN); lưu lastBackupAt và nhắc sao lưu sau 7 ngày ở bản lưu trên máy; thêm hướng dẫn "Thêm vào Màn hình chính" trong Quản trị → Dữ liệu. Cập nhật CLAUDE.md (thư mục fonts/, sw.js, quy tắc tăng phiên bản đệm). Thêm kiểm tra offline vào tests/e2e.js, chạy tests/e2e.js và tests/supabase/cloud-e2e.js đến khi in OK, chỉ tự rà soát một vòng, rồi mở Pull Request.

**Phiên 9d · Lỗi phát sinh sau rà soát 17/10**
> Đọc CLAUDE.md và docs/SUA-LOI-CHAY-THU.md (mục 1 nhóm D, mục 2 Phiên 9d). Sửa L15–L19 theo cách gợi ý: lượt "Làm như thi" chưa trả lời câu nào thì không lưu điểm và hộp hỏi đổi thành "Thoát đề?" (js/quiz.js, chốt rời trang trong js/app.js); bài ôn trong khung chỉ hỏi khi trong khung có #endBtn, bỏ theo dõi pointerdown (không sửa file nào trong modules/, không đổi ba chỗ nối; ghi điều app đọc #endBtn vào CLAUDE.md); hướng dẫn chuyển dữ liệu sang app ở Màn hình chính trên iPhone/iPad trong Quản trị → Dữ liệu và trên màn hình thiết lập khi mở từ Màn hình chính, sao lưu bằng navigator.share khi có và chỉ ghi lastBackupAt khi chia sẻ thành công; nút đề ghi đúng số đề và tên kì; service worker dùng một bộ file thống nhất cho mỗi lần mở trang (theo clientId), tăng VERSION. Không sửa phần đám mây ngoài chỗ bắt buộc. Mỗi lỗi một commit ghi mã lỗi (L15…). Thêm các bước kiểm tra ở mục "Xong khi" vào tests/e2e.js, chạy tests/e2e.js và tests/supabase/cloud-e2e.js đến khi in OK, chỉ tự rà soát một vòng, rồi mở Pull Request liệt kê lỗi đã sửa, lỗi chưa sửa được kèm lí do, và các bước bố mẹ cần thử trên iPhone.
