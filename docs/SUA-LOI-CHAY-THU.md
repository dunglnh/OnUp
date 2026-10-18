# Sửa lỗi cơ bản sau khi dùng thử (16/10/2026)

Bốn phiên sửa đầu (9a, 9b, 9c: L1–L14, PR #21, #22, #23; 9d: L15–L19, lỗi phát sinh khi rà soát lại ngày 17/10, PR #29) đã gộp vào `main`; ảnh 360px sau Phiên 9b: [hinh-360/](hinh-360/). Lần rà soát thứ ba (18/10/2026, sau Phiên K3) tìm thêm L20–L26 (nhóm E, Phiên 9e, TA1, TA2); trong đó L21 là yêu cầu của chủ app: **đề môn Tiếng Anh của mọi khối phải 100% tiếng Anh**. Trạng thái và việc còn chờ (bố mẹ thử L17 trên iPhone thật) chỉ ghi ở [KE-HOACH-PHAT-TRIEN-ONUP.md](KE-HOACH-PHAT-TRIEN-ONUP.md). File này giữ phần mô tả lỗi, cách sửa và lời giao việc (mục 3).

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
- Đã sửa ở PR #29 chỉ cho bản lưu trên máy. Bản đám mây (trang thật từ 17/10) giữ dữ liệu trên máy chủ, chỉ thêm dòng nhắc chuyển dữ liệu trong Safari ở ô "Chuyển dữ liệu máy này lên đám mây".

**L18. Đánh số đề sai trong nhóm "Bài ôn khác" và khi kì thi chỉ gắn một phần đề.**
- `practiceList` ghi nút "Đề 1, Đề 2…" theo thứ tự trong hàng, không theo số đề thật.
- Đã thử với ngày giả lập 1/4/2027 (giữa kì II đã qua): mọi đề lớp 4 dồn vào nhóm "Bài ôn khác". Hàng Toán hiện "Đề 1 … Đề 5", trong đó "Đề 4" là "Toán 4 · Giữa kì II · Đề 1". Hàng Tiếng Việt cũng lệch như vậy.
- Kì thi chỉ gắn "Đề 2" và "Đề 3" của một môn thì nút ghi "Đề 1, Đề 2".

**L19. Rủi ro: service worker có thể trộn file cũ và file mới trên mạng chậm (chưa gặp).**
- `networkFirst` trong `sw.js` quyết định riêng từng file: file nào tải quá `SLOW_MS` (4 giây) thì lấy bản trong đệm, file nào nhanh thì lấy bản mới.
- Ngay sau một lần cập nhật, trên mạng chậm, trang có thể chạy `js/app.js` cũ cùng `js/store.js` mới (hoặc ngược lại). Nếu hai bản không khớp nhau thì app lỗi.
- Chưa tái hiện được; ghi lại để chặn trước khi Phiên B sửa nhiều `js/store-supabase.js` và `js/app.js` cùng lúc.

### Nhóm E · Phát sinh sau Phiên K3 (Phiên 9e, TA1, TA2)

**Lần rà soát thứ ba (18/10/2026):** chạy bản `main` commit `ae79a2e` (đã gộp PR #46, Phiên K3).
- Bộ kiểm thử:
  - `node tests/kiem-tra-de.js` in `DE OK` (29 đề, 715 câu, 6 đề ngẫu nhiên);
  - `tests/e2e.js` in `E2E OK`;
  - `admin-test.mjs` in `ADMIN OK`, `store-test.mjs` in `SUPABASE STORE OK` (mỗi bộ 93 kiểm tra);
  - `cloud-e2e.js` in `CLOUD E2E OK` cả 3 lần chạy liền (không còn chập chờn ở bước service worker);
  - riêng `sh tests/supabase/run.sh` (PostgreSQL 16) in `RLS FAILED` (L20).
- Thử thêm bằng Chromium ở 360×740, sáng và tối (script tạm, không đưa vào repo):
  - làm hết 35 mục của danh mục (29 đề cố định, 6 đề ngẫu nhiên) ở chế độ ôn luyện, trả lời bằng đáp án trong dữ liệu: đề nào cũng 10/10 và lưu đủ số câu, nghĩa là đáp án trong dữ liệu và bộ chấm khớp nhau; không lỗi JS; màn mở đề, câu đầu, màn kết quả không tràn ngang, nút ≥ 44px, chữ ≥ 13px;
  - đề ngẫu nhiên "Làm như thi": hết giờ thì tự nộp; "Làm đề khác" rút bộ mới và đặt lại đồng hồ; rời trang khi chưa trả lời câu nào thì hỏi "Thoát đề?";
  - 8 ngày giả lập từ 18/10/2026 đến 2/6/2027, học sinh lớp 4 và lớp 6: trang chủ, nhóm bài ôn theo kì, lịch thi;
  - khu quản trị: mọi tab, sửa kì thi, nhập đề, hồ sơ con, báo cáo tuần có đề ngẫu nhiên, xem thử đề ngẫu nhiên; 4 bài ôn dạng trang;
  - bản đám mây trên máy chủ giả: tài khoản tạo trước K3 (`seed_banks_seen` chưa có đề ngẫu nhiên) mở bản mới thì 6 đề ngẫu nhiên tự gắn vào kì thi và được ghi lên máy chủ;
  - trang thật https://dunglnh.github.io/OnUp/ đã có 6 đề ngẫu nhiên trong `data/banks/index.js`.
- Phần K3 chạy đúng: rút đủ 25 câu theo ma trận, ưu tiên câu chưa làm hoặc hay sai, ghi lịch sử từng câu; báo cáo tuần và "Chủ đề hay sai" tính đề ngẫu nhiên như đề thường. Các mục dưới đây là lỗi mới, riêng L21 là yêu cầu mới của chủ app.

**L20. `sh tests/supabase/run.sh` báo `RLS FAILED` sau K3.**
- K3 sửa `supabase/banks-to-sql.js` để bỏ đề ngẫu nhiên (pool không lưu lên máy chủ), nên SQL sinh ra chỉ còn 29 đề.
- `run.sh` vẫn đếm mọi mục của `data/banks/index.js` (35, kể cả 6 đề ngẫu nhiên) rồi truyền vào `rls-test.sql`, nên kiểm tra "banks-to-sql.js: đủ 35 đề có sẵn (data/banks/), đã đăng" sai.
- App không lỗi, nhưng bộ kiểm thử bắt buộc khi sửa `supabase/` không qua được. Phiên R1 (thêm bảng `question_reports`) sẽ vướng ngay.
- K3 sửa `supabase/banks-to-sql.js` mà chưa chạy `run.sh`; Pull Request #46 cũng không ghi là chưa chạy.
- Phiên R1 (PR #47, mở cùng ngày) gặp lỗi này khi chạy kiểm thử và đã sửa luôn trong PR đó: `run.sh` chỉ đếm đề cố định.

**L21. Đề Tiếng Anh lẫn tiếng Việt (yêu cầu của chủ app: môn Tiếng Anh mọi khối 100% tiếng Anh).**
- Chủ app dùng thử thấy đề Tiếng Anh có chữ tiếng Việt. Rà bằng script: cả 75/75 câu của 3 đề Tiếng Anh có chữ tiếng Việt (`ta4-ck1-de1` trong `data/banks/4-ta.js`; `ta6-gk1-de1`, `ta6-ck1-de1` trong `data/banks/6-ta.js`):
  - lời giải `x`: 75 câu, phần lớn là dịch nghĩa ("“compass” là cái com-pa…", "(Bạn ăn trưa lúc mấy giờ?)");
  - lời dặn, đề bài: 37 câu ("Điền một từ:", "Chọn từ khác loại:", "Viết dạng đúng của động từ trong ngoặc:", "Đọc đoạn văn rồi trả lời:"…), có câu chú thích nghĩa trong ngoặc ("(phòng ngủ của chị gái tôi)");
  - chủ đề "Phát âm", "Đọc hiểu" (15 câu); `note` của cả 3 đề.
- Đoạn đọc chép lại trong từng câu, trong ngoặc «…», câu cần xét đúng/sai nằm ngay sau đoạn văn (10 câu, 3 đoạn), chưa dùng đoạn đọc dùng chung (`passages`) của K2.
- Giao diện làm đề (chung cho mọi môn) toàn tiếng Việt: tên đề "Tiếng Anh 4 · Cuối kì I · Đề 1", "Ôn luyện", "Làm như thi", nhãn dạng câu ("Điền vào chỗ trống", "Chọn đáp án đúng"), "Đúng"/"Sai", "Kiểm tra", "Bỏ qua", "Câu tiếp", "Chưa đúng. Đáp án:", màn kết quả, hộp hỏi khi rời đề, thông báo lưu điểm.
- Bài ôn IOE 4, IOE 6 (`modules/`) đã toàn tiếng Anh, nhưng phần app bọc ngoài vẫn tiếng Việt: nút "← Trang chính", dòng "Điểm được lưu", hộp hỏi "Rời bài ôn?", thông báo "Đã lưu kết quả: …".
- Phiên R1 (PR #47) thêm vào màn làm đề link "Báo câu này sai" và hộp chọn lí do, cũng bằng tiếng Việt.
- Đề thử nghiệm `thunghiem6-dang-cau-moi` có 3 câu Tiếng Anh: câu nối cột nối từ tiếng Anh với nghĩa tiếng Việt, câu đúng/sai 4 ý có lời giải tiếng Việt.
- Ảnh (360px, trước khi sửa): [hinh-ra-soat-k3/l21-de-tieng-anh.jpg](hinh-ra-soat-k3/l21-de-tieng-anh.jpg): màn mở đề, câu điền sau khi Kiểm tra, câu đọc hiểu đúng/sai, hộp hỏi khi thoát.

**L22. Đề "Tin học và Công nghệ 4 · Cuối kì I" không có số đề nên nút chỉ ghi "Đề".**
- Tên trong `data/banks/index.js` thiếu "· Đề 1", khác quy ước `<môn> <khối> · <kì> · Đề N` của CLAUDE.md. `bankLabels` lấy số đề từ tên, nên hàng "Tin học và Công nghệ" trên trang chủ lớp 4 có một nút chỉ ghi chữ "Đề".
- `tests/kiem-tra-de.js` chưa kiểm tra quy ước tên đề. Đây là đề duy nhất sai quy ước (trừ đề thử nghiệm).

**L23. Nút "Cách viết câu hỏi" ở màn nhập đề cao 22px.**
- Quản trị (Khu phụ huynh) → Ngân hàng đề → Thêm: `<details class="small"><summary>` không có `min-height`, nên ở 360px vùng bấm chỉ cao 22px (sáng và tối).
- Hàm kiểm tra 360px (`audit`) của `tests/e2e.js` và `cloud-e2e.js` chỉ đo `button, a.btn, .linkbtn`, không đo `summary`, nên không thấy.

**L24. Nhóm "Bài ôn khác" ghi "Đề 1" mà không kèm tên kì.**
- L18 (Phiên 9d) chỉ ghi tên kì lên nút khi một hàng có đề của nhiều kì. Trong nhóm "Bài ôn khác", hàng chỉ có đề của một kì vẫn ghi "Đề 1".
- Ngày giả lập 21/12/2026, học sinh lớp 6: nhóm "Kiểm tra cuối học kì I" có hàng "Tiếng Anh · Đề 1" (đề cuối kì I); nhóm "Bài ôn khác" cũng có "Tiếng Anh · Đề 1", nhưng là đề giữa kì I đã qua. Lịch sử và Địa lí, GDCD, Tin học, Công nghệ cũng vậy.
- Ngày 20/1/2027, học sinh lớp 4: "Bài ôn khác" có hàng Toán "Đề ngẫu nhiên · Đề 1 · Đề 2 · Đề 3" của cuối kì I, ngay dưới nhóm giữa kì II cũng ghi "Đề ngẫu nhiên · Đề 1 · Đề 2". Trẻ không biết hai nút "Đề 1" là hai đề khác nhau.

**L25. Số bài ôn tính cả đề ngẫu nhiên, lệch với nút "Đề ôn".**
- Từ K3, nút trên thẻ kì thi chỉ đếm đề cố định ("Đề ôn · 9 đề" cho cuối kì I lớp 4). Nhãn "12 bài ôn" trên lịch thi và ở đầu nhóm bài ôn của cùng kì đếm cả bài IOE 4 và 2 đề ngẫu nhiên. Trên cùng một màn, phụ huynh cộng 9 đề với 1 bài IOE ra 10, không ra 12.
- Đề ngẫu nhiên là một cách làm lại các đề cố định, không phải thêm đề mới.

**L26. Tên đề xuống dòng bắt đầu bằng dấu "·".**
- Ở 360px, tiêu đề màn mở đề "Toán 6 · Cuối kì I · Đề ngẫu nhiên" xuống dòng thành "Toán 6 · Cuối kì I" và "· Đề ngẫu nhiên" (ảnh `tests/screenshots/19-de-ngau-nhien.png` của `tests/e2e.js`). Gặp ở mọi tên có " · " khi dòng ngắt ngay trước dấu chấm giữa.

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

### Phiên 9e

**L20 · `run.sh` đếm đúng số đề lưu lên máy chủ.**
- PR #47 (Phiên R1) đã sửa: `BANKS` trong `tests/supabase/run.sh` chỉ đếm các mục **không có** `pool`, cùng điều kiện với `supabase/banks-to-sql.js`. Khi `main` đã có bản sửa đó thì 9e chỉ chạy lại `run.sh` cho chắc.
- `main` chưa có bản sửa (PR #47 chưa gộp) thì sửa như vậy, kèm chú thích trong `run.sh` và chữ của kiểm tra trong `rls-test.sql`: "đủ N đề cố định (đề ngẫu nhiên không lưu lên máy chủ)".
- Ghi vào CLAUDE.md, mục "Chạy và kiểm tra": máy không có PostgreSQL thì ghi rõ trong Pull Request là chưa chạy `run.sh`, để chủ app biết mà chạy.

**L22 · Tên đề đúng quy ước.**
- Đổi tên `tincn4-ck1-de1` thành "Tin học và Công nghệ 4 · Cuối kì I · Đề 1". Giữ mã đề; kết quả đã lưu giữ nhãn cũ, không sửa.
- `tests/kiem-tra-de.js`: tên đề có sẵn phải đúng dạng `<môn> <khối> · <Giữa kì I | Cuối kì I | Giữa kì II | Cuối năm> · Đề <số>` (đề ngẫu nhiên: `· Đề ngẫu nhiên`, đã kiểm tra), trừ đề thử nghiệm (môn "Thử nghiệm"). Ghi thêm điều này vào mô tả script trong CLAUDE.md.

**L23 · Mọi `summary` có vùng bấm ≥ 44px.**
- `css/app.css`: `details.small>summary` (hoặc mọi `summary` chưa có lớp riêng) có `min-height:44px`, chữ căn giữa theo chiều dọc. Giữ `.grp>summary`, `.psg>summary` như cũ.
- Thêm `summary` vào bộ chọn của hàm `audit` trong `tests/e2e.js` và `tests/supabase/cloud-e2e.js`; bước 360px của `tests/e2e.js` mở thêm màn nhập đề (`#/admin/bank/new`).

**L24 · Nhóm "Bài ôn khác" luôn ghi tên kì.**
- `practiceList` nhận thêm cờ cho nhóm "Bài ôn khác" (`practiceGroups` biết nhóm nào không có kì thi). Khi bật, `bankLabels` luôn ghi dạng dài: "Giữa kì I · Đề 1", "Cuối kì I · Đề ngẫu nhiên". Tên tự đặt (ngân hàng quản trị viên nhập) vẫn ghi nguyên tên.
- Nhóm theo kì thi và ô chi tiết kì thi (`openEvent`) giữ "Đề N" như cũ.

**L25 · Đếm bài ôn không tính đề ngẫu nhiên.**
- Nhãn "N bài ôn" (thẻ kì thi ở lịch thi, đầu mỗi nhóm trong "Tất cả bài ôn") đếm bài ôn dạng trang và đề cố định, không đếm đề ngẫu nhiên, để khớp với nút "Đề ôn · N đề". Dòng tóm tắt của hàng môn ("2 đề · 25 câu mỗi đề · đề ngẫu nhiên 25 câu") giữ như cũ.

**L26 · Tên không xuống dòng ngay trước dấu "·".**
- Một hàm nhỏ dùng chung trong `js/app.js` (dùng sau `esc()`): thay khoảng trắng ngay trước " · " bằng khoảng trắng không ngắt (`&nbsp;`), để dấu "·" ở cuối dòng trên. Dùng cho tên đề, tên kì thi ở tiêu đề (`h1`, `h2`) và trên các thẻ. Không đổi dữ liệu, không đổi `aria-label`.

**Xong khi:**
- `sh tests/supabase/run.sh` in `RLS OK`.
- `node tests/kiem-tra-de.js` in `DE OK`; thử đổi tạm một tên đề sai quy ước thì script báo lỗi (thử xong trả lại).
- `tests/e2e.js` in `E2E OK`, có thêm:
  - **L22:** ngày giả lập 21/12/2026, học sinh lớp 4: hàng "Tin học và Công nghệ" có nút "Đề 1";
  - **L23:** `audit` đo cả `summary`; màn nhập đề qua kiểm tra 360px sáng và tối;
  - **L24:** ngày giả lập 21/12/2026, học sinh lớp 6: hàng Tiếng Anh của nhóm "Bài ôn khác" có nút "Giữa kì I · Đề 1", nhóm cuối kì I vẫn ghi "Đề 1"; bước L18 vẫn qua;
  - **L25:** kì cuối kì I lớp 4 ghi "10 bài ôn" (1 bài IOE, 9 đề cố định) ở cả lịch thi và đầu nhóm;
  - **L26:** tiêu đề màn mở đề `toan6-ck1-ngau-nhien` có khoảng trắng không ngắt trước mỗi dấu "·".
- `node tests/supabase/cloud-e2e.js` in `CLOUD E2E OK`.

### Phiên TA1 · Nội dung đề Tiếng Anh

**L21, phần dữ liệu đề.** Cách viết chung (lời dặn, lời giải, chủ đề, tên riêng) ở [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md) mục 3, phần "Đề Tiếng Anh: 100% tiếng Anh".
- Viết lại 3 đề `ta4-ck1-de1` (`data/banks/4-ta.js`), `ta6-gk1-de1`, `ta6-ck1-de1` (`data/banks/6-ta.js`), và 3 câu Tiếng Anh của đề thử nghiệm (`data/banks/6-thunghiem.js`: đoạn đọc `lan`, câu đúng/sai 4 ý, câu nối cột).
- **Giữ:** mã đề, 25 câu mỗi đề, dạng câu, phạm vi Unit, đáp án đúng và các lựa chọn nhiễu (lựa chọn hiện đã là tiếng Anh). Chỉ đổi câu khi bản tiếng Anh không còn hợp lí (ví dụ câu chỉ có nghĩa khi dịch).
- **Mọi trường chữ bằng tiếng Anh:** `note`, `topic`, `q` (lời dặn và đề bài), `o`, `ans`, `l`, `r`, `x`, đoạn đọc. Lời dặn theo mẫu; bỏ chú thích tiếng Việt trong ngoặc; lời giải tiếng Anh đơn giản, giải thích nghĩa bằng tiếng Anh, không dịch sang tiếng Việt.
- **Chủ đề:** giữ "Unit N · <tên Unit>"; "Phát âm" thành "Pronunciation", "Đọc hiểu" thành "Reading". Kết quả cũ còn chủ đề tiếng Việt trong "Chủ đề hay sai" đến khi hết 30 ngày; không sửa kết quả cũ.
- **Mức độ:** thêm `lv` (1 Biết, 2 Hiểu, 3 Vận dụng) cho từng câu, để sau này gộp thành đề ngẫu nhiên (Phiên N5 và các phiên Tiếng Anh sau).
- **Đoạn đọc:** chuyển sang `passages` của đề (`{ note, passages, questions }`, câu ghi `p`), tên đoạn "Read the text. Then answer the questions." Câu hỏi chỉ còn phần hỏi; câu đúng/sai thì đề bài là câu cần xét.
- **Đề thử nghiệm:** câu nối cột nối từ với nghĩa tiếng Anh (ví dụ "compass" → "You use it to draw circles."); lời giải câu đúng/sai 4 ý bằng tiếng Anh; chủ đề "English · Reading", "English · Vocabulary". Sửa đầu câu "Nối mỗi từ chỉ đồ dùng" trong `KE_HOACH` của bước K2 ở `tests/e2e.js` cho khớp.
- **`tests/kiem-tra-de.js`, kiểm tra "đề Tiếng Anh 100% tiếng Anh":**
  - áp dụng cho đề có môn Tiếng Anh (cả đề sau này của mọi khối) và cho câu có `topic` bắt đầu bằng "English" trong đề khác;
  - mọi trường chữ (`note`, tên và chữ của đoạn đọc, `topic`, `q`, `o`, `ans`, `l`, `r`, `x`, `rubric[].c`) không có chữ cái tiếng Việt (nguyên âm mang dấu thanh, ă, â, ê, ô, ơ, ư, đ); vài từ tiếng Anh có dấu được phép (café, cafés…) ghi thành danh sách trong script;
  - lỗi ghi rõ mã đề, số câu, trường và đoạn chữ tiếng Việt; script tự thử với một câu cố ý viết sai;
  - ghi điều script kiểm tra thêm vào CLAUDE.md, mục "Chạy và kiểm tra".
- **`tests/e2e.js`:** thêm bước làm 3 đề Tiếng Anh ở chế độ ôn luyện bằng đáp án trong dữ liệu (như bước K3), mỗi đề được 10/10.
- Không sửa giao diện làm đề: phần đó ở Phiên TA2.

**Xong khi:**
- `node tests/kiem-tra-de.js` in `DE OK`, với kiểm tra mới; không còn chữ tiếng Việt trong 3 đề Tiếng Anh và 3 câu tiếng Anh của đề thử nghiệm.
- `tests/e2e.js` in `E2E OK`: 3 đề Tiếng Anh làm đúng hết được 10/10; bước K2 vẫn qua.
- Ảnh 360px sáng/tối: một câu đọc hiểu có đoạn đọc dùng chung, một câu điền sau khi bấm Kiểm tra.

### Phiên TA2 · Màn làm đề Tiếng Anh bằng tiếng Anh

**L21, phần giao diện.**
- **Phạm vi:** mọi chữ học sinh thấy từ lúc mở một đề Tiếng Anh đến hết màn kết quả: màn tải đề, màn mở đề, màn làm bài, màn kết quả, hộp hỏi khi rời đề, thông báo lưu điểm, tên đề, tên mức độ, link "Báo câu này sai" và hộp chọn lí do (Phiên R1; lỗi tiếng Việt do kho trả về thì thay bằng một câu chung tiếng Anh). Áp dụng cho mọi khối và cả ngân hàng phụ huynh tự nhập có môn Tiếng Anh. Cả phần app bọc ngoài bài ôn IOE 4, IOE 6: nút quay lại, dòng "Điểm được lưu", hộp hỏi khi rời bài, thông báo lưu điểm.
- **Giữ tiếng Việt:** thanh trên cùng của app, trang chủ, lịch thi, báo cáo, khu phụ huynh, trang "Không tìm thấy", "Bài này dành cho lớp X", và các dòng chỉ phụ huynh thấy ("Chế độ xem thử: điểm không được lưu.", "Xem thử, không lưu điểm"). Tên đề trong danh mục và nhãn kết quả đã lưu (`label`) không đổi, nên trang chủ, báo cáo vẫn ghi tên tiếng Việt. Đề các môn khác giữ nguyên.
- **`js/quiz.js`:**
  - bảng chữ `TXT = { vi: {…}, en: {…} }` cho mọi chữ của màn làm bài, màn kết quả, hộp hỏi, thang tự chấm, đoạn đọc, gợi ý của nối cột và sắp xếp, `aria-label`, tên mức độ (`LV`), "Đúng"/"Sai"; ghi chú của `Quiz.draw` cũng theo ngôn ngữ;
  - `Quiz.lang(bank)` trả `"en"` khi môn là Tiếng Anh (so sau khi bỏ dấu, chữ thường: "tieng anh", "english"), còn lại `"vi"`. `Quiz.run` đọc `opts.lang`, mặc định `Quiz.lang(bank)`;
  - `Quiz.title(bank, lang)`: tên đề tiếng Anh dựng từ tên chuẩn ("Tiếng Anh 4 · Cuối kì I · Đề 1" → "English 4 · End-of-term 1 · Test 1"; Giữa kì I → Mid-term 1, Giữa kì II → Mid-term 2, Cuối năm → End-of-year, Đề ngẫu nhiên → Random test). Tên tự đặt giữ nguyên;
  - số thập phân trong phần tiếng Anh dùng dấu chấm (9.5/10, 0.25);
  - khung làm bài có `lang="en"`, để trình đọc màn hình đọc đúng giọng.
- **`js/app.js`:** màn mở đề (`renderQuiz`), màn tải đề (`loadQuiz`), chữ hỏi khi rời đề (`guard.text`), thông báo lưu điểm (`toast`), thông báo khi "Làm đề khác" thiếu câu; `renderPlay` với bài ôn chỉ có môn `ta` (thêm `lang: "en"` vào mục của bài trong `data/modules.js`, hoặc suy ra từ `subjects`). Không sửa file nào trong `modules/`, không đổi ba chỗ nối.
- **Bảng chữ gợi ý** (theo cách nói của bài ôn IOE, để dùng thống nhất):

| Tiếng Việt | Tiếng Anh |
|---|---|
| Lớp 4 · Tiếng Anh · Đề ngẫu nhiên | Grade 4 · English · Random test |
| 25 câu · Mỗi lần làm là một đề khác: 25 câu rút từ kho 75 câu (3 đề)… | 25 questions · A new test every time: 25 questions from a bank of 75 (3 tests), more of the ones you haven't done or often get wrong. |
| Ôn luyện (xem đáp án từng câu) · Làm như thi · 35 phút | Practice (see the answer after each question) · Test mode · 35 minutes |
| ← Trang chính · ← Thoát | ← Home · ← Exit |
| Đang tải đề… · Chưa tải được đề này… · Thử lại | Loading the test… · Can't load this test. Check your internet and tap Try again. · Try again |
| Chọn đáp án đúng · Đúng hay sai? · Điền vào chỗ trống | Choose the best answer · True or false? · Fill in the blank |
| Nối cột · Sắp xếp thứ tự · Thứ tự của bạn · Đúng hay sai? Chọn cho từng ý | Match · Put in order · Your order · True or false? Choose for each sentence |
| Đúng · Sai | True · False |
| Kiểm tra · Trả lời · Bỏ qua · Câu tiếp · Xem kết quả | Check · Answer · Skip · Next question · See results |
| Bạn trả lời trước, hoặc bấm Bỏ qua nhé. | Answer the question first, or tap Skip. |
| Đúng rồi! · Chưa đúng. · Đáp án: · Thứ tự đúng: | Correct! · Not quite. · Answer: · Correct order: |
| Đúng cả 4 ý! · Đúng 3/4 ý · được 0,5/1 điểm. | All 4 correct! · 3/4 correct · 0.5/1 point. |
| Nối đúng hết! · Chọn ô nối với ô 2 · Chưa nối | All matched! · Choose a match for item 2 · Not matched yet |
| Đọc kĩ rồi trả lời · Dùng chung cho 3 câu · Thu gọn · Mở ra | Read and answer · For 3 questions · Hide · Show |
| Thoát đề? Bạn chưa làm câu nào nên không lưu điểm. · Thoát | Exit the test? You haven't answered any questions, so no score is saved. · Exit |
| Nộp bài ngay? Câu chưa làm tính là sai. · Nộp bài | Finish test now? Unanswered questions count as wrong. · Finish test |
| Dừng ôn và xem kết quả? · Dừng · Làm tiếp | End practice and see your results? · End practice · Keep going |
| Nộp bài và rời trang? · Dừng ôn và rời trang? · Kết quả các câu đã làm được lưu lại. · Ôn tiếp | Finish the test and leave? · End practice and leave? · Your answers so far will be saved. · Keep practising |
| Kho còn thiếu câu, lần này: … | Not enough questions in the bank this time: … |
| Ôn luyện · Làm như thi (trên màn kết quả) | Practice · Test mode |
| 24/25 câu đúng · Thời gian: | 24/25 correct · Time: |
| Theo chủ đề · Theo mức độ · Biết · Hiểu · Vận dụng | By topic · By level · Know · Understand · Apply |
| Câu cần xem lại · Bạn trả lời: · (bỏ trống) | Review mistakes · Your answer: · (no answer) |
| Làm lại · Làm đề khác · Về trang chính | Try again · New test · Go to home |
| Đã lưu kết quả · Đã lưu điểm tự chấm | Result saved · Self-check score saved |
| Rời bài ôn? · Bài đang làm dở sẽ không được lưu. · Rời bài · Ở lại | Leave this practice? · Your unfinished work won't be saved. · Leave · Stay |
| Điểm được lưu · Đã lưu kết quả: 24/30 câu đúng | Score saved · Result saved: 24/30 correct |
| Tự luận · tự chấm · Gợi ý: · Chưa có · Một phần · Đủ · Lưu điểm tự chấm | Writing · self-check · Guide: · Not yet · Partly · Fully · Save my score |
| Báo câu này sai · Đã báo câu này · Câu này sai ở đâu? · Lí do | Report a problem · Reported · What's wrong with this question? · Reason |
| Đáp án sai · Câu hỏi khó hiểu · Lỗi chính tả · Khác | Wrong answer · Confusing question · Spelling mistake · Other |
| Ghi chú (không bắt buộc, tối đa 200 kí tự) · Viết thêm nếu muốn | Note (optional, up to 200 characters) · Write more if you like |
| Gửi · Thôi · Bạn chọn một lí do nhé. | Send · Cancel · Please choose a reason. |
| Cảm ơn bạn! Người làm đề sẽ xem lại câu này. · Chưa gửi được. Thử lại nhé. | Thank you! We will check this question. · Couldn't send. Please try again. |

- Ghi vào CLAUDE.md, mục "Quy ước code": chữ trên màn làm đề, màn kết quả lấy từ bảng chữ; phiên sau thêm chữ mới ở đó (UX1, UX5, UX6…) thì thêm cả bản tiếng Anh. Cập nhật `docs/TINH-NANG.md`.

**Xong khi:**
- `tests/e2e.js` in `E2E OK`, có thêm bước "đề Tiếng Anh toàn tiếng Anh" ở 360px sáng và tối:
  - học sinh lớp 4 làm `ta4-ck1-de1`, học sinh lớp 6 làm `ta6-gk1-de1`, ở cả ôn luyện và làm như thi: màn mở đề, câu trắc nghiệm, câu điền, câu đúng/sai và câu có đoạn đọc (trước và sau Kiểm tra), hộp hỏi khi bấm "← Exit" và khi bấm Back (chưa trả lời; đã trả lời), hộp "Report a problem" (mở ra, gửi xong), màn kết quả có câu sai, thông báo lưu điểm. Mọi chữ hiện trong `#view`, `#leaveBox`, `#toast` không có chữ cái tiếng Việt (cùng biểu thức với `tests/kiem-tra-de.js`);
  - mở `ioe-4` trong khung: nút quay lại, dòng ghi chú, hộp hỏi khi rời bài đang làm, thông báo lưu điểm bằng tiếng Anh;
  - phụ huynh xem thử một đề Tiếng Anh: dòng "Chế độ xem thử" vẫn tiếng Việt;
  - đề Toán 4 vẫn toàn tiếng Việt (các bước cũ vẫn qua).
- `node tests/supabase/cloud-e2e.js` in `CLOUD E2E OK`, có thêm một kiểm tra như trên với một đề Tiếng Anh.
- `node tests/kiem-tra-de.js` in `DE OK` (có sửa `js/quiz.js`).
- Ảnh 360px sáng/tối các màn trên. Pull Request đặt ảnh trước ([hinh-ra-soat-k3/l21-de-tieng-anh.jpg](hinh-ra-soat-k3/l21-de-tieng-anh.jpg)) cạnh ảnh sau.

---

## 3. Các phiên Claude Code

Làm theo thứ tự, mỗi phiên một cuộc trò chuyện mới, Merge xong mới mở phiên sau. Phiên A (máy chủ) đã gộp và không đụng tới các file các phiên này sửa. Nên làm 9a và 9b **trước Phiên B**, vì Phiên B sửa lại màn hình đăng nhập và trang chủ. Riêng Phiên 9c có thể làm sau Phiên C nếu cần ưu tiên khung tài khoản. Phiên 9d (sau rà soát 17/10) cũng nên làm **trước Phiên B**: nó sửa `js/app.js`, `js/quiz.js`, `sw.js`, và Phiên B sẽ sửa nhiều file cùng lúc nên cần L19 trước.

Nhóm E (rà soát 18/10, sau K3): làm **TA1 → 9e → TA2**, sau khi PR #47 (Phiên R1, mở cùng ngày) đã gộp, và trước UX1. TA1 gấp nhất: đề Tiếng Anh giữa kì I lớp 6 dùng cho kì thi từ 2/11. TA1 và 9e cùng sửa `tests/kiem-tra-de.js`, `tests/e2e.js` nên không chạy cùng lúc. TA2 sửa `js/quiz.js`, `js/app.js` như UX1, UX5 nên làm trước các phiên đó, để chữ mới của chúng thêm luôn bản tiếng Anh; TA2 dịch cả chữ R1 đã thêm.

**Phiên 9a · Không mất bài, khóa PIN, đường dẫn sai**
> Đọc CLAUDE.md và docs/SUA-LOI-CHAY-THU.md (mục 1 nhóm A, mục 2 Phiên 9a). Sửa L1, L2, L3 trong js/app.js và js/quiz.js theo cách gợi ý: chốt rời trang khi đang làm đề ngân hàng hoặc bài ôn trong khung (hộp xác nhận trong trang, nộp bài trước khi rời, beforeunload), khóa PIN lưu trong localStorage theo từng người với thời gian chờ tăng dần, trang "Không tìm thấy" và chặn học sinh mở bài khác khối. Không đổi ba chỗ nối của bài ôn với app, không sửa phần đám mây ngoài chỗ bắt buộc. Mỗi lỗi một commit ghi mã lỗi (L1…). Thêm các bước kiểm tra ở mục "Xong khi" vào tests/e2e.js, chạy đến khi in E2E OK, chỉ tự rà soát một vòng, rồi mở Pull Request liệt kê lỗi đã sửa và chưa sửa được kèm lí do.

**Phiên 9b · Giao diện điện thoại 360px**
> Đọc CLAUDE.md và docs/SUA-LOI-CHAY-THU.md (mục 1 nhóm B, mục 2 Phiên 9b). Sửa L4–L11 trong css/app.css và js/app.js (và js/store.js cho trường pinLen, có giá trị mặc định khi đọc dữ liệu cũ): bài ôn trong khung chỉ còn một lớp cuộn, tab quản trị thấy đủ ở 360px, vùng bấm tối thiểu 44px, chữ tối thiểu 13px, hàng thống kê 3 ô không vỡ, trang chủ học sinh gom bài theo kì thi và môn với kết quả gần đây lên trên, PIN tự vào khi đủ độ dài, chú thích cuối trang chỉ ở trang chủ và lịch. Chỉ dùng token màu có sẵn. Mỗi lỗi một commit ghi mã lỗi. Thêm kiểm tra tự động 360px vào tests/e2e.js (không tràn ngang, nút ≥ 44px, chữ ≥ 13px), chạy đến khi in E2E OK, chụp ảnh 360px sáng/tối các màn hình nêu ở mục "Xong khi", chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh.

**Phiên 9c · Chạy khi mất mạng, nhắc sao lưu**
> Đọc CLAUDE.md và docs/SUA-LOI-CHAY-THU.md (mục 1 nhóm C, mục 2 Phiên 9c). Sửa L12–L14: tự lưu font Baloo 2 và Be Vietnam Pro trong thư mục fonts/ (lấy từ gói npm @fontsource, ghi giấy phép OFL), bỏ Google Fonts ở index.html và các bài ôn; thêm manifest.webmanifest, biểu tượng và sw.js (mạng trước cho HTML/JS/CSS/data, đệm trước cho font, có phiên bản đệm, không đệm Supabase/Cloudflare/CDN); lưu lastBackupAt và nhắc sao lưu sau 7 ngày ở bản lưu trên máy; thêm hướng dẫn "Thêm vào Màn hình chính" trong Quản trị → Dữ liệu. Cập nhật CLAUDE.md (thư mục fonts/, sw.js, quy tắc tăng phiên bản đệm). Thêm kiểm tra offline vào tests/e2e.js, chạy tests/e2e.js và tests/supabase/cloud-e2e.js đến khi in OK, chỉ tự rà soát một vòng, rồi mở Pull Request.

**Phiên 9d · Lỗi phát sinh sau rà soát 17/10**
> Đọc CLAUDE.md và docs/SUA-LOI-CHAY-THU.md (mục 1 nhóm D, mục 2 Phiên 9d). Sửa L15–L19 theo cách gợi ý: lượt "Làm như thi" chưa trả lời câu nào thì không lưu điểm và hộp hỏi đổi thành "Thoát đề?" (js/quiz.js, chốt rời trang trong js/app.js); bài ôn trong khung chỉ hỏi khi trong khung có #endBtn, bỏ theo dõi pointerdown (không sửa file nào trong modules/, không đổi ba chỗ nối; ghi điều app đọc #endBtn vào CLAUDE.md); hướng dẫn chuyển dữ liệu sang app ở Màn hình chính trên iPhone/iPad trong Quản trị → Dữ liệu và trên màn hình thiết lập khi mở từ Màn hình chính, sao lưu bằng navigator.share khi có và chỉ ghi lastBackupAt khi chia sẻ thành công; nút đề ghi đúng số đề và tên kì; service worker dùng một bộ file thống nhất cho mỗi lần mở trang (theo clientId), tăng VERSION. Không sửa phần đám mây ngoài chỗ bắt buộc. Mỗi lỗi một commit ghi mã lỗi (L15…). Thêm các bước kiểm tra ở mục "Xong khi" vào tests/e2e.js, chạy tests/e2e.js và tests/supabase/cloud-e2e.js đến khi in OK, chỉ tự rà soát một vòng, rồi mở Pull Request liệt kê lỗi đã sửa, lỗi chưa sửa được kèm lí do, và các bước bố mẹ cần thử trên iPhone.

**Phiên TA1 · Đề Tiếng Anh 100% tiếng Anh (nội dung)** (gấp: trước 1/11, đề Tiếng Anh giữa kì I lớp 6 thi từ 2/11)
> Đọc CLAUDE.md, docs/SUA-LOI-CHAY-THU.md (mục 1 L21, mục 2 Phiên TA1) và docs/KE-HOACH-NOI-DUNG.md (mục 3, phần "Đề Tiếng Anh: 100% tiếng Anh"). Viết lại toàn bộ chữ của 3 đề Tiếng Anh có sẵn (ta4-ck1-de1 trong data/banks/4-ta.js; ta6-gk1-de1, ta6-ck1-de1 trong data/banks/6-ta.js) và 3 câu Tiếng Anh của đề thử nghiệm (data/banks/6-thunghiem.js) sang 100% tiếng Anh: ghi chú, chủ đề, lời dặn, đề bài, lựa chọn, đáp án, lời giải, đoạn đọc. Lời dặn theo mẫu; lời giải bằng tiếng Anh đơn giản, không dịch nghĩa sang tiếng Việt. Giữ mã đề, số câu, dạng câu và đáp án; đoạn đọc chuyển sang passages; thêm lv cho từng câu. Thêm vào tests/kiem-tra-de.js kiểm tra đề Tiếng Anh không còn chữ tiếng Việt (cả câu tiếng Anh trong đề khác), và vào tests/e2e.js bước làm 3 đề bằng đáp án trong dữ liệu được 10/10. Không sửa giao diện (Phiên TA2). Chạy node tests/kiem-tra-de.js và tests/e2e.js đến khi in OK, chụp ảnh 360px sáng/tối một câu đọc hiểu, chỉ tự rà soát một vòng, rồi mở Pull Request.

**Phiên 9e · Lỗi phát sinh sau K3** (sau TA1)
> Đọc CLAUDE.md và docs/SUA-LOI-CHAY-THU.md (mục 1 nhóm E, mục 2 Phiên 9e). Sửa L22–L26 theo cách gợi ý: tên đề Tin học và Công nghệ 4 thêm "· Đề 1" và tests/kiem-tra-de.js kiểm tra quy ước tên đề; summary có vùng bấm ≥ 44px và kiểm tra 360px đo cả summary; nhóm "Bài ôn khác" ghi tên kì trên nút đề; nhãn "N bài ôn" không đếm đề ngẫu nhiên; tên không xuống dòng ngay trước dấu "·". L20 (tests/supabase/run.sh không đếm đề ngẫu nhiên) đã sửa trong PR #47 của Phiên R1: chỉ sửa khi main chưa có bản sửa đó. Không làm phần nào của L21 (Phiên TA1, TA2). Mỗi lỗi một commit ghi mã lỗi (L22…). Thêm các bước ở mục "Xong khi" vào tests/e2e.js, chạy node tests/kiem-tra-de.js, tests/e2e.js, tests/supabase/cloud-e2e.js và sh tests/supabase/run.sh đến khi in OK, chỉ tự rà soát một vòng, rồi mở Pull Request.

**Phiên TA2 · Màn làm đề Tiếng Anh bằng tiếng Anh (giao diện)** (sau TA1, 9e và PR #47 của R1; trước UX1)
> Đọc CLAUDE.md và docs/SUA-LOI-CHAY-THU.md (mục 1 L21, mục 2 Phiên TA2). Làm cho mọi chữ học sinh thấy khi làm đề Tiếng Anh là tiếng Anh: từ màn mở đề đến hết màn kết quả, hộp hỏi khi rời đề, thông báo lưu điểm, tên đề, mức độ, số thập phân, link "Báo câu này sai" và hộp chọn lí do; áp dụng cho mọi khối và cả ngân hàng phụ huynh tự nhập có môn Tiếng Anh; cả phần app bọc ngoài bài ôn IOE 4, IOE 6. Dùng bảng chữ hai ngôn ngữ trong js/quiz.js theo bảng chữ gợi ý. Trang chủ, lịch thi, báo cáo, khu phụ huynh và các dòng chỉ phụ huynh thấy giữ tiếng Việt; đề môn khác không đổi. Không sửa file trong modules/, không đổi cách chấm và cách lưu điểm. Ghi quy ước bảng chữ vào CLAUDE.md (chữ mới trên màn làm đề phải có cả bản tiếng Anh). Thêm các bước ở mục "Xong khi" vào tests/e2e.js và tests/supabase/cloud-e2e.js, chạy node tests/kiem-tra-de.js, tests/e2e.js, tests/supabase/cloud-e2e.js đến khi in OK, chụp ảnh 360px sáng/tối, chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh trước và sau.
