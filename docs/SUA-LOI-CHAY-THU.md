# Sửa lỗi cơ bản sau khi dùng thử (16/10/2026)

Trạng thái: **chưa làm**. Ba phiên Claude Code để sửa: mục 3.

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

---

## 3. Các phiên Claude Code

Làm theo thứ tự, mỗi phiên một cuộc trò chuyện mới, Merge xong mới mở phiên sau. Phiên A (máy chủ) đã gộp và không đụng tới các file các phiên này sửa. Nên làm 9a và 9b **trước Phiên B**, vì Phiên B sửa lại màn hình đăng nhập và trang chủ. Riêng Phiên 9c có thể làm sau Phiên C nếu cần ưu tiên khung tài khoản.

**Phiên 9a · Không mất bài, khóa PIN, đường dẫn sai**
> Đọc CLAUDE.md và docs/SUA-LOI-CHAY-THU.md (mục 1 nhóm A, mục 2 Phiên 9a). Sửa L1, L2, L3 trong js/app.js và js/quiz.js theo cách gợi ý: chốt rời trang khi đang làm đề ngân hàng hoặc bài ôn trong khung (hộp xác nhận trong trang, nộp bài trước khi rời, beforeunload), khóa PIN lưu trong localStorage theo từng người với thời gian chờ tăng dần, trang "Không tìm thấy" và chặn học sinh mở bài khác khối. Không đổi ba chỗ nối của bài ôn với app, không sửa phần đám mây ngoài chỗ bắt buộc. Mỗi lỗi một commit ghi mã lỗi (L1…). Thêm các bước kiểm tra ở mục "Xong khi" vào tests/e2e.js, chạy đến khi in E2E OK, chỉ tự rà soát một vòng, rồi mở Pull Request liệt kê lỗi đã sửa và chưa sửa được kèm lí do.

**Phiên 9b · Giao diện điện thoại 360px**
> Đọc CLAUDE.md và docs/SUA-LOI-CHAY-THU.md (mục 1 nhóm B, mục 2 Phiên 9b). Sửa L4–L11 trong css/app.css và js/app.js (và js/store.js cho trường pinLen, có giá trị mặc định khi đọc dữ liệu cũ): bài ôn trong khung chỉ còn một lớp cuộn, tab quản trị thấy đủ ở 360px, vùng bấm tối thiểu 44px, chữ tối thiểu 13px, hàng thống kê 3 ô không vỡ, trang chủ học sinh gom bài theo kì thi và môn với kết quả gần đây lên trên, PIN tự vào khi đủ độ dài, chú thích cuối trang chỉ ở trang chủ và lịch. Chỉ dùng token màu có sẵn. Mỗi lỗi một commit ghi mã lỗi. Thêm kiểm tra tự động 360px vào tests/e2e.js (không tràn ngang, nút ≥ 44px, chữ ≥ 13px), chạy đến khi in E2E OK, chụp ảnh 360px sáng/tối các màn hình nêu ở mục "Xong khi", chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh.

**Phiên 9c · Chạy khi mất mạng, nhắc sao lưu**
> Đọc CLAUDE.md và docs/SUA-LOI-CHAY-THU.md (mục 1 nhóm C, mục 2 Phiên 9c). Sửa L12–L14: tự lưu font Baloo 2 và Be Vietnam Pro trong thư mục fonts/ (lấy từ gói npm @fontsource, ghi giấy phép OFL), bỏ Google Fonts ở index.html và các bài ôn; thêm manifest.webmanifest, biểu tượng và sw.js (mạng trước cho HTML/JS/CSS/data, đệm trước cho font, có phiên bản đệm, không đệm Supabase/Cloudflare/CDN); lưu lastBackupAt và nhắc sao lưu sau 7 ngày ở bản lưu trên máy; thêm hướng dẫn "Thêm vào Màn hình chính" trong Quản trị → Dữ liệu. Cập nhật CLAUDE.md (thư mục fonts/, sw.js, quy tắc tăng phiên bản đệm). Thêm kiểm tra offline vào tests/e2e.js, chạy tests/e2e.js và tests/supabase/cloud-e2e.js đến khi in OK, chỉ tự rà soát một vòng, rồi mở Pull Request.
