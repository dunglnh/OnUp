# Sửa lỗi cơ bản sau khi dùng thử (16/10/2026)

Bốn phiên sửa đầu (9a, 9b, 9c: L1–L14, PR #21, #22, #23; 9d: L15–L19, lỗi phát sinh khi rà soát lại ngày 17/10, PR #29) đã gộp vào `main`; ảnh 360px sau Phiên 9b: [hinh-360/](hinh-360/). Lần rà soát thứ ba (18/10/2026, sau Phiên K3) tìm thêm L20–L26 (nhóm E, Phiên 9e, TA1, TA2); trong đó L21 là yêu cầu của chủ app: **đề môn Tiếng Anh của mọi khối phải 100% tiếng Anh**. Góp ý chạy thử ngày 19/10/2026: L27 (nhóm F, Phiên 9f). Rà lời giao việc N2–N12 cùng ngày: L28 (kiểm thử hỏng theo ngày chạy), L29–L31 (ô nhập số trên điện thoại) (nhóm G, Phiên 9g, 9h). Kiểm thử định kì ngày 20/10/2026, sau Phiên 9g, 9h: L32 (gõ phân số, hỗn số có khoảng trắng), L33 (câu điền về số âm lộ dấu của đáp án) (nhóm H, Phiên 9i; L33 sửa trong Phiên N4). Chủ app báo ngày 21/10/2026, sau Phiên 9i: L34 (câu điền đáp án phân số, gõ kèm đơn vị bị chấm sai) (nhóm I, Phiên 9j); sau Phiên 9j: L35 (câu điền đáp án phân số âm viết bằng dấu trừ chữ in) (nhóm J, Phiên 9k); bài ôn KHTN giữa kì I lớp 6 đánh số bài theo bộ sách khác: L36 (nhóm K, Phiên 9l). Phiên N24b ghi ngày 21/10/2026 (PO ghi mã): đề và bài ôn Ngữ văn 6 còn câu về hai văn bản sách in năm 2026 đã thay: L37 (nhóm L, Phiên 9m). Trạng thái và việc còn chờ (bố mẹ thử L17 và L29–L31 trên iPhone thật) chỉ ghi ở [KE-HOACH-PHAT-TRIEN-ONUP.md](KE-HOACH-PHAT-TRIEN-ONUP.md). File này giữ phần mô tả lỗi, cách sửa và lời giao việc (mục 3).

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
- Ảnh sau Phiên TA1 (360px, sáng/tối; nội dung đề đã 100% tiếng Anh, giao diện làm đề còn tiếng Việt đến Phiên TA2): [hinh-ra-soat-k3/l21-ta1-doc-hieu.jpg](hinh-ra-soat-k3/l21-ta1-doc-hieu.jpg) câu đọc hiểu với đoạn đọc dùng chung; [hinh-ra-soat-k3/l21-ta1-dien-tu.jpg](hinh-ra-soat-k3/l21-ta1-dien-tu.jpg) câu điền sau khi bấm Kiểm tra.
- Ảnh sau Phiên TA2 (360px; giao diện làm đề Tiếng Anh bằng tiếng Anh, cùng bốn màn như ảnh trước khi sửa): [hinh-ra-soat-k3/l21-ta2-de-tieng-anh.jpg](hinh-ra-soat-k3/l21-ta2-de-tieng-anh.jpg) (sáng), [hinh-ra-soat-k3/l21-ta2-de-tieng-anh-toi.jpg](hinh-ra-soat-k3/l21-ta2-de-tieng-anh-toi.jpg) (tối): màn mở đề, câu điền sau khi bấm Check, câu đọc hiểu, hộp hỏi khi bấm Exit; [hinh-ra-soat-k3/l21-ta2-ket-qua.jpg](hinh-ra-soat-k3/l21-ta2-ket-qua.jpg): màn kết quả sáng/tối, hộp "Report a problem" và sau khi gửi; [hinh-ra-soat-k3/l21-ta2-roi-de.jpg](hinh-ra-soat-k3/l21-ta2-roi-de.jpg): hộp hỏi khi rời trang (chưa làm, đã làm, làm như thi) và khi rời bài ôn IOE 4. Đủ các màn ở `tests/screenshots/tieng-anh/ta2-*.jpg` sau khi chạy `tests/e2e.js`.

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

### Nhóm F · Góp ý chạy thử 19/10 (Phiên 9f)

**L27. Bài ôn dạng trang: làm đúng hết đề mà "Ôn câu sai" vẫn còn câu.**
- Chủ app báo ngày 19/10/2026 (bản đám mây, học sinh lớp 6, bài ôn "Ôn giữa kì · Lớp 6", môn Ngữ văn): làm "Đề 1" đúng 20/20, nhưng "Ôn câu sai" vẫn có 1 câu. Vào ôn, chọn đúng đáp án như lần trước thì app báo đúng. Báo cáo tuần ghi "Ngữ văn · Đề 1 · 20/20 · làm như thi" và "Ngữ văn · Ôn câu sai · 1/1".
- Tái hiện (bản lưu trên máy, Chromium 360px, `main` commit `ea4dc6a`):
  1. Ngữ văn, Đề 1, chọn sai câu thứ 4: 19/20, câu đó vào danh sách câu sai.
  2. Làm lại Đề 1 (đề cố định, cùng 20 câu), đúng hết: 20/20, không có mục "Câu cần xem lại", nhưng màn kết quả vẫn có nút "Ôn câu sai (1)" và danh sách vẫn giữ câu đó.
  3. Bấm "Ôn câu sai (1)": gặp đúng câu thứ 4 của lần đầu; chọn đáp án đúng thì app báo "Chính xác!", kết quả 1/1, danh sách trống.
  - Báo cáo tuần có ba dòng như của chủ app (thêm dòng 19/20 của lần đầu).
  - Ảnh: [hinh-ra-soat-k3/l27-on-cau-sai.jpg](hinh-ra-soat-k3/l27-on-cau-sai.jpg) (kết quả 20/20 còn nút "Ôn câu sai (1)" · câu đó khi ôn · kết quả 1/1).
  - Ảnh sau Phiên 9f (360px sáng/tối, Chromium): [hinh-ra-soat-k3/l27-9f-ket-qua-l6.jpg](hinh-ra-soat-k3/l27-9f-ket-qua-l6.jpg) (làm lại Đề 1 đúng hết khi danh sách còn một câu từ lần trước: dòng "Lần này bạn không sai câu nào…" ngay trên nút "Ôn câu sai (1)"; làm lại mà danh sách chỉ có câu của Đề 1 thì nút này không còn), [hinh-ra-soat-k3/l27-9f-trang-dau-l6.jpg](hinh-ra-soat-k3/l27-9f-trang-dau-l6.jpg) (chữ giải thích luật mới ở trang đầu), [hinh-ra-soat-k3/l27-9f-ket-qua-ioe-6.jpg](hinh-ra-soat-k3/l27-9f-ket-qua-ioe-6.jpg) (IOE 6: Review mistakes làm đúng một câu rồi End practice, dòng "No mistakes this time…").
- Nguyên nhân: hàm `record()` của cả 4 bài ôn chỉ bỏ câu khỏi danh sách khi làm đúng ở chế độ ôn luyện: `if(ok){if(S.mode!=="exam")w.delete(wkey(q))}else w.add(wkey(q));` (`l4-giua-ki-1`, `l6-giua-ki-1`; `ioe-4`, `ioe-6` viết giống vậy với `wrongIds`).
  - Câu vào danh sách khi làm sai hoặc bấm "Bỏ qua" ở bất kì đâu (ôn theo bài, đề thi thử, ôn câu sai), và khi nộp đề còn câu chưa làm.
  - Làm đúng trong đề thi thử thì câu không được bỏ ra.
- Vì sao dễ gặp:
  - Đề thi thử cố định ("làm lại vẫn ra đúng các câu đó"), nên trẻ hay làm lại cho được 10 điểm. Câu sai ở lần trước vẫn bị giữ dù lần sau làm đúng.
  - Nút "Ôn câu sai (N)" ở màn kết quả đếm cả danh sách của môn (gồm câu từ các bài, các đề khác) và đứng ngay dưới điểm 10/10, nên trông như đề vừa làm còn câu sai.
  - Luật bỏ câu chỉ ghi ở trang đầu bài ôn ("Làm đúng khi ôn thì câu đó được bỏ khỏi danh sách"), màn kết quả không nói.
- Không sai đáp án, không mất điểm, nhưng trẻ tưởng app chấm sai và phải làm lại câu đã biết. Bài ôn giữa kì I lớp 4, lớp 6 đang được dùng để ôn cho kì thi từ 2/11.

### Nhóm G · Rà lời giao việc N2–N12 ngày 19/10 (Phiên 9g, 9h)

PO rà lời giao việc các phiên làm đề N2–N12 ngày 19/10/2026 (sau PR #62, #63) và giao QC ghi mã hai việc: kiểm thử tự động sẽ hỏng theo ngày chạy (L28), ô nhập số trên iPhone không gõ được phân số (L29). QC thử lại trên `main` commit `9d44883`, rồi chạy lại các ngày chính trên `5ef6475` (sau PR #65: lời giao việc N2–N12b vào repo; PR #66: UX6), và tìm thêm L30, L31 ở cùng ô nhập số. Số dòng trong mục này theo `5ef6475`.

**L28. Kiểm thử tự động hỏng theo ngày chạy, dù không ai sửa gì.**
- Cách thử: chạy nguyên hai script (không sửa file) với giờ giả lập ở cả node và trình duyệt, bằng script bọc ở cuối mục này. Ở ngày thật (19/10/2026) cả hai in OK.
- Kết quả:

| Ngày giả lập | `tests/e2e.js` | `tests/supabase/cloud-e2e.js` |
|---|---|---|
| 19/10/2026 (ngày thật) | `E2E OK` | `CLOUD E2E OK` |
| 22/10/2026 | `E2E OK` | |
| 1/11/2026 | | `CLOUD E2E OK` |
| 2/11/2026 | các kiểm tra theo ngày đều qua; lượt này `ux5OK` sai vì kiểm tra chập chờn (nguyên nhân 7) | sai "UX2: tab Các con…" (nguyên nhân 2): thẻ của con ghi "Kiểm tra giữa học kì I đang diễn ra · chưa ôn Toán, Tiếng Việt" |
| 13/11/2026 | `E2E OK` | |
| 14/11/2026 | `E2E FAILED: k3OK` (nguyên nhân 1): link ghi "Tất cả bài ôn cho kì này · 1 bài ôn →" | sai UX2: "IOE cấp trường còn 12 ngày · chưa ôn Tiếng Anh" |
| 29/11/2026 | | sai UX2: "Kiểm tra cuối học kì I còn 29 ngày · …" |
| 21–22/12/2026 | `E2E FAILED: k3OK, ux5OK` (link ghi "· 11 bài ôn →"; `ux5OK`: nguyên nhân 6 và 7) | sai UX2 |
| 8/1/2027 | `E2E FAILED: k3OK, ux5OK` (`ux5OK`: nguyên nhân 6) | sai UX2 |
| 9/1/2027 | dừng giữa chừng sau 55 giây, ở bước "leave guard: bank exam, one answer (L1)" (nguyên nhân 3) | sai UX2 và "L18: nút đề ghi số đề theo tên đề; K3: đề ngẫu nhiên đứng trước" (nguyên nhân 4) |
| 10/1/2027, 27/3/2027 | dừng như 9/1 | sai như 9/1 |
| 7/3/2027, 14/5/2027 | | sai như 9/1 |
| 15/5/2027 | | dừng giữa chừng sau 25 giây, ở dòng 459 (`TypeError`, nguyên nhân 5) |
| 1/6/2027 | dừng như 9/1 | dừng như 15/5 |

- Nguyên nhân (đánh số để lời giao việc dẫn lại). Từ 1 đến 5: bước không tự cài đồng hồ giả lập thì chạy theo ngày thật, nhưng chữ mong đợi lại ghi theo lịch thi ở ngày viết kiểm thử.
  1. `tests/e2e.js`, bước K3: dòng `k3.hero` mong "Tất cả bài ôn cho kì này · 7 bài ôn →". Đó là kì giữa kì I lớp 6 (2 bài ôn dạng trang, 5 đề), thi đến hết 13/11. Từ 14/11, kì gần nhất có bài ôn của lớp 6 là IOE cấp trường, nên link ghi "· 1 bài ôn →".
  2. `tests/supabase/cloud-e2e.js`, kiểm tra "UX2: tab Các con…": thẻ của hai con mong "Kiểm tra giữa học kì I còn N ngày · chưa ôn …". Từ 2/11 kì đang diễn ra nên thẻ ghi "Kiểm tra giữa học kì I đang diễn ra · chưa ôn Toán, Tiếng Việt". Từ 14/11 thẻ ghi "IOE cấp trường còn 12 ngày · chưa ôn Tiếng Anh".
  3. Lịch thi của học sinh chỉ hiện kì thi chưa qua. `tests/e2e.js` bấm `[data-ev='ck1-l4']` ở bước thiết lập (dòng 266) và ở bước 360px (dòng 606). Từ 9/1/2027 kì cuối kì I lớp 4 đã qua, `page.click` chờ hết 30 giây rồi script dừng. Cũng ở bước 360px, điều kiện `evs.length > 3` sẽ sai từ 7/3/2027 (lớp 4 chỉ còn 3 kì thi chưa qua); QC chưa chạy tới vì script dừng trước đó.
  4. `cloud-e2e.js`, kiểm tra "L18: nút đề…": mong tab Bài ôn có nhóm "Kiểm tra cuối học kì I" và "Kiểm tra giữa học kì II". Từ 9/1/2027 kì cuối kì I đã qua, nên đề của kì đó chuyển sang nhóm "Bài ôn khác".
  5. `cloud-e2e.js`, dòng 459, đọc dòng kì thi trên thẻ của con bằng `(k.querySelector(".kid-ev") || {}).textContent.replace(…)`. Từ 15/5/2027 lớp 4 không còn kì thi nào, thẻ không có dòng này, `textContent` là `undefined` nên script dừng.
  6. Bước tự cài đồng hồ ở một ngày sớm hơn ngày chạy thì gặp dữ liệu "ở tương lai", vì dữ liệu của các bước đầu (`state`) ghi theo ngày thật. Bước UX5 (ngày giả lập 14/12/2026) lấy kết quả vừa nộp bằng `Store.resultsFor(…)[0]`, tức kết quả mới nhất theo giờ. Chạy sau 14/12/2026 thì đó là kết quả của một bước trước, nên dòng mong đợi của thẻ "Lần trước" (`prev.want`) lấy nhầm điểm. Hai điểm khác nhau thì `ux5OK` sai (gặp ở 22/12/2026 và 8/1/2027).
  7. Không theo ngày, nhưng cũng làm kết quả lúc qua lúc không: kiểm tra `submitSeen` của bước UX5 (hộp "Nộp bài ngay?" nằm trong màn hình). Đề như thi xáo câu. Câu thứ 4 mà là câu dài "Hai ngày đầu, mỗi ngày đội công nhân sửa được 1 250 m đường…" (`toan4-ck1-de3`) thì hộp được cuộn sát mép dưới, `bottom` = 740,125 lớn hơn `innerHeight` = 740. Hộp vẫn hiện đủ, app không sai. QC gặp ở 3 trong 8 lượt chạy đủ.
- Vì sao phải sửa trước 1/11:
  - Pull Request nào cũng phải có `tests/e2e.js` in `E2E OK` (CLAUDE.md); phiên sửa bản đám mây còn phải có `CLOUD E2E OK`.
  - Từ 2/11, phiên nào chạy `cloud-e2e.js` cũng thấy FAILED; từ 14/11 thì cả `e2e.js`, dù phiên đó không sửa gì. Phiên dễ sửa nhầm app cho khớp kiểm thử, hoặc tốn lượt đi tìm lỗi không có.
  - "Quy định chung của các phiên N" (mục 7 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md)) có dặn phiên tự sửa `tests/e2e.js` khi hỏng chỉ vì ngày. Nhưng mỗi phiên có thể sửa một kiểu, và các phiên N không chạy `cloud-e2e.js`. Phiên nào sửa bản đám mây sau 1/11 cũng gặp ngay (UX6 xong trước đó, PR #66).
- Script bọc QC dùng để thử (Phiên 9g chép vào `tests/chay-theo-ngay.js`). Script lệch `Date` của node (script kiểm thử, máy chủ giả, Edge Function admin) và cài đồng hồ Playwright ở cùng giờ cho mọi context; bước nào tự cài đồng hồ thì vẫn đè lên như cũ. Riêng đồng hồ của Playwright (`server/clock.js`) phải đọc giờ thật: nó ghi `Date.now()` của node vào nhật kí để trang dựng lại giờ, nếu cũng lệch thì giờ trong trang bị trừ mất khoảng lệch. Chạy: `FAKE_NOW=2026-11-14T10:00:00Z NODE_PATH=… node chay-theo-ngay.js tests/e2e.js` (máy chủ `python3 -m http.server 8000` đang chạy).

```js
// chay-theo-ngay.js: chạy một bộ kiểm thử như thể hôm nay là FAKE_NOW, không sửa file kiểm thử
process.env.PW_EXPERIMENTAL_SERVICE_WORKER_NETWORK_EVENTS = "1";
const FAKE = process.env.FAKE_NOW;
if (FAKE) {
  const Real = Date, OFF = new Real(FAKE).getTime() - Real.now();
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
```

**L29. Câu trả lời bằng số: trên iPhone không gõ được phân số.**
- Ô `#qzNum` (dạng `num` trong `js/quiz.js`) có `inputmode="decimal"`. Trên iPhone (trình duyệt nào cũng chạy bằng WebKit), ô này mở bàn phím số thập phân ([`UIKeyboardType.decimalPad`](https://developer.apple.com/documentation/uikit/uikeyboardtype/decimalpad): chữ số, một dấu thập phân, nút xóa). Bàn phím này không có "/" (cũng không có "-"; số âm đã có nút ±, xem [WebKit bug 193825](https://bugs.webkit.org/show_bug.cgi?id=193825)).
- Bộ chấm thì nhận phân số: `numVals` đọc "3/4" thành 0,75. Thử bằng `Quiz.score` (node, không cần trình duyệt):
  - đáp án 0,75: gõ "3/4" hay "0,75" đều đúng. Nhưng lớp 4 chưa học số thập phân (lớp 5), lớp 6 học phân số (chương VI) trước số thập phân (chương VII). Trên iPhone con không gõ được cách viết đã học.
  - đáp án 1/3: chỉ "1/3" đúng, "0,33" và "0,333" đều sai. Trên iPhone không làm được câu này.
- Chỗ hiện đáp án cũng chưa hợp với phân số: `correctText` làm tròn 2 chữ số (`fmtN`). Câu đáp án 2/3 hiện "0,67", mà gõ "0,67" thì bị chấm sai.
- Dòng nhắc dưới ô chỉ nói số thập phân: "Số thập phân viết bằng dấu phẩy, ví dụ 2,5."
- Ngân hàng tự nhập còn đọc sai đáp án phân số mà không báo lỗi. Thử `Quiz.parse` với câu "1/2 + 1/4 = ?" và dòng "Đáp số: 3/4": ra câu trả lời bằng số có đáp án 3 và đơn vị "/4" (ô nhập có chữ "/4" đứng sau). Gõ "3/4" hay "0,75" thì bị chấm sai, gõ "3" mới đúng.
- Đề có sẵn chưa có câu nào như vậy: có 10 câu trả lời bằng số, đáp án đều là số nguyên, trừ một câu 7,5 cm. Nhưng hai phiên Toán sắp tới, N7 (Toán 4 giữa kì II) và N8 (Toán 6 giữa kì II), đều có chương phân số. Khung đề lớp 6 (Công văn 7991) lại có phần trả lời ngắn. Lời giao việc N7, N8 (mục 7 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md)) đã dặn không dùng dạng câu này cho đáp án phân số, chờ sửa.

**L30. Câu điền có đáp án là số âm: trên iPhone không gõ được dấu trừ.**
- Hàm `body()` của `js/quiz.js` đặt `inputmode="decimal"` cho ô `#qzFill` khi mọi đáp án là số. Số âm cũng được tính là số (`isNum("-7")`). Bàn phím số thập phân của iPhone không có "-", câu điền lại không có nút ± như câu trả lời bằng số. Con không gõ được "-7", cũng không gõ được "(-7)".
- Thử ở 360px (Chromium, câu dựng bằng `Quiz.run`): câu "(-3) + (-4) = ___" (đáp án -7) có ô `inputmode="decimal"` và không có nút ±. Bộ chấm nhận "-7" và "(-7)".
- Bài ôn dạng trang (`l4-giua-ki-1`, `l6-giua-ki-1`) đã tránh lỗi này: đáp án có số âm thì ô dùng bàn phím thường và nhắc "Số âm: gõ dấu trừ phía trước, ví dụ -12."
- Đề có sẵn chưa có câu nào như vậy (QC quét 83 câu điền có đáp án là số). Nhưng ngân hàng phụ huynh, thầy cô tự nhập gặp ngay: viết "(−3) · 4 = [-12]" là ra câu điền như vậy (cũng là một câu mẫu trong `tests/so-bo-cham.js`). Toán 6 cuối kì I (Phiên N4) lại có chương số nguyên.

**L31. Câu điền số thập phân: gõ dấu chấm thì bị chấm sai.**
- `fillRight` so số bằng `numKey`: bỏ mọi dấu chấm (coi là dấu ngăn hàng nghìn) rồi đổi dấu phẩy thành dấu chấm. Thử bằng `Quiz.score`:
  - đáp án "1,25": gõ "1,25" đúng; gõ "1.25" (đọc thành 125) sai;
  - đáp án "25": gõ "2.5" lại được tính đúng.
- Câu trả lời bằng số không bị lỗi này: `numVals` nhận cả hai cách viết.
- Dấu thập phân trên bàn phím số của iPhone đi theo vùng và bàn phím đặt trên máy: có máy hiện dấu phẩy, có máy hiện dấu chấm ([Apple Developer Forums](https://developer.apple.com/forums/thread/107269)). Máy chỉ có dấu chấm thì không làm được câu điền có đáp án thập phân. Phần này chưa thử trên iPhone thật, cần bố mẹ xem lại (mục 2, Phiên 9h).
- Đề có sẵn chưa có câu điền đáp án thập phân. Số thập phân là chương VII của Toán 6 (giữa kì II, Phiên N8), và ngân hàng tự nhập viết được ngay ("1 250 g = [1,25] kg").

### Nhóm H · Kiểm thử định kì sau Phiên 9g, 9h ngày 20/10 (Phiên 9i, N4)

QC chạy lại mọi bộ kiểm thử trên `main` commit `def0de1` (sau PR #72: Phiên 9g, PR #74: Phiên 9h). Tất cả in OK, kể cả khi chạy như vào các ngày 2/11/2026, 14/11/2026, 22/12/2026, 10/1/2027 và 1/6/2027 bằng `tests/chay-theo-ngay.js` (`cloud-e2e.js` thêm ngày 15/5/2027): L28 đã sửa xong. QC thử thêm bộ chấm bằng `Quiz.score` trong node (khoảng 90 cách gõ) và quét câu điền của đề có sẵn, tìm thêm hai chỗ dưới đây.

**L32. Gõ phân số, hỗn số có khoảng trắng: chấm sai hoặc đọc nhầm.**
- Câu trả lời bằng số: `numVals` (`js/quiz.js`) bỏ mọi khoảng trắng trước khi đọc, để "1 200" thành 1200. Nên hỗn số "1 1/2" (một và một phần hai, tức 1,5) bị đọc thành "11/2", tức 5,5. Thử bằng `Quiz.score`:
  - đáp án "3/2" (hay 1,5): gõ "1 1/2" bị chấm sai, dù đúng giá trị;
  - đáp án "11/2" (hay 5,5): gõ "1 1/2" lại được chấm đúng;
  - "2 3/4" cũng bị đọc thành "23/4".
- Câu điền có đáp án là phân số (đề bắt viết phân số tối giản thì so chữ; lời giao việc N7, N8 dùng cách này): gõ "3 / 4" hay "3/ 4" bị chấm sai với đáp án "3/4". Câu trả lời bằng số thì nhận "2 / 3".
- Bàn phím số thập phân của iPhone không có phím cách, nên ở câu trả lời bằng số, trên iPhone không gõ được hỗn số. Bàn phím máy tính và một số bàn phím Android thì gõ được; câu điền mở bàn phím chữ, gõ được khoảng trắng ở mọi máy.
- Đọc nhầm hỗn số có từ trước Phiên 9h (đáp án số 5,5 cũng nhận "1 1/2"). Nay ô có nút "/" ở mọi câu, và lớp 6 học hỗn số dương ở Bài 24, nằm trong ngân hàng Toán 6 giữa kì II (Phiên N8), nên dễ gặp hơn. Đề có sẵn chưa có câu nào có đáp án là phân số.

**L33. Câu điền về số âm lộ dấu của đáp án.**
- Từ Phiên 9h (L30), câu điền có đáp án âm hiện dòng nhắc "Số âm: gõ dấu trừ phía trước, ví dụ -12." dưới câu. Câu điền mà mọi đáp án là số không âm thì mở bàn phím số, bàn phím này trên iPhone không có dấu trừ. Câu hỏi về dấu của kết quả (cộng, trừ, nhân, chia số nguyên) vì thế lộ đáp án: có dòng nhắc là đáp án âm, không gõ được dấu trừ là đáp án không âm (dòng nhắc: ảnh [hinh-9h/dien-so-am.jpg](hinh-9h/dien-so-am.jpg)). Cách sửa L30 do QC đề xuất đã không lường trước chỗ này.
- Ghi chú của Phiên 9h ở mục 3 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md) đã dặn câu như vậy dùng câu trả lời bằng số hoặc trắc nghiệm. Nhưng 5 câu của hai đề Toán 6 cuối kì I có sẵn vẫn là câu điền, và lời giao việc N4 dặn giữ nguyên câu của hai đề:
  - có dòng nhắc số âm, con biết trước đáp án âm: `toan6-ck1-de1` "Tính nhanh: (135 − 49) − (135 + 51) = ___" (−100) và "(−72) : 8 = ___" (−9); `toan6-ck1-de2` "(−38) + (−62) = ___" (−100);
  - bàn phím số không có dấu trừ, con tính ra số âm thì không gõ được: `toan6-ck1-de1` "(−25) + 17 − (−8) = ___" (0); `toan6-ck1-de2` "(−7) · 4 − 6 · (−5) = ___" (2).
- QC chép nguyên 5 câu vào một đề thử, làm ở chế độ ôn luyện ở 360px: đúng như trên (3 câu có dòng nhắc và bàn phím thường; 2 câu có `inputmode="decimal"`, không có dòng nhắc).
- Đề ngẫu nhiên Toán 6 cuối kì I rút cả 5 câu này. `tests/kiem-tra-de.js` chưa kiểm tra điều này, nên các phiên làm đề sau vẫn có thể viết câu như vậy.

### Nhóm I · Chủ app báo sau Phiên 9i ngày 21/10 (Phiên 9j)

Lỗi có từ trước Phiên 9i, chưa sửa vì ngoài phạm vi phiên đó. QC tái hiện bằng `Quiz.score` trong node trên `main` commit `4bc49f6` (sau PR #85).

**L34. Câu điền có đáp án là phân số: gõ kèm đơn vị bị chấm sai.**
- Đề in đơn vị ngay sau chỗ trống, như "1/2 kg + 1/4 kg = ___ kg", đáp án "3/4". Gõ "3/4" thì đúng; gõ "3/4 kg", "3/4kg", "3 / 4 kg", "3/4 KG" đều bị chấm sai.
- Đáp án là số thì gõ kèm đơn vị vẫn đúng: "5 tấn 30 kg = ___ kg" nhận "5030 kg", "5 030 kg"; "1/2 giờ = ___ phút" nhận "30 phút". Học sinh quen gõ kèm đơn vị ở các câu đó, sang câu phân số thì bị chấm sai dù đúng.
- Cùng lỗi với hỗn số ("3 1/2 m") và đơn vị có số mũ ("___ m²" gõ "3/4 m²").
- Nguyên nhân: `fillRight` (`js/quiz.js`) chỉ bỏ đơn vị ở cuối chữ gõ khi phần còn lại là một số (`isNum(rest)`), hoặc chỗ trống là số lượng viết bằng chữ khi đáp án là số. "3/4" không phải `isNum`, nên chỉ còn chữ gõ nguyên "3/4 kg" để so với đáp án "3/4". So phân số (`isFrac`, `fracT`, L32) chỉ áp cho chữ gõ nguyên.
- Câu trả lời bằng số không bị lỗi này: `numVals` bỏ đơn vị của câu (`q.unit`) trước khi đọc phân số.
- Đề có sẵn chưa có câu điền nào có đáp án là phân số. Ngân hàng Toán giữa kì II (N8 lớp 6, N7 lớp 4) có chương phân số, và lời giao việc dặn dùng câu điền khi đề bắt viết phân số tối giản; đề phụ huynh tự nhập cũng viết được câu như vậy.

### Nhóm J · Chủ app báo sau Phiên 9j ngày 21/10 (Phiên 9k)

Lỗi có từ Phiên 9i (L32), khi câu điền có đáp án là phân số bắt đầu so chữ riêng. QC tái hiện bằng `Quiz.score` trong node trên `main` commit `bd26bb0` (sau PR #87).

**L35. Câu điền có đáp án là phân số âm: dấu trừ khác kiểu thì bị chấm sai.**
- Đề phụ huynh tự nhập ghi đáp án bằng dấu trừ chữ in "−" (U+2212) hay gạch "–" (U+2013), như "Đáp án: −3/4". Dấu này hay có khi dán từ Word, PDF. Bàn phím chỉ gõ được "-", nên con gõ "-3/4" bị chấm sai. Gõ "-3/4 kg" (L34) cũng sai.
- Đáp án "-3/4" (gạch thường) thì ngược lại: con dán "−3/4" bị chấm sai. Gõ "- 3/4" (có khoảng trắng sau dấu trừ) sai với mọi kiểu dấu trừ, cả "-3/4".
- Cùng lỗi với hỗn số âm: đáp án "−1 1/2", gõ "-1 1/2" bị chấm sai.
- Đáp án là số thì không bị: "−7" nhận "-7", "−2,5" nhận "-2,5" (`numKey`, `numVals` đổi "−", "–" thành "-"). Câu trả lời bằng số cũng không bị: đáp án "−3/4" nhận "-3/4".
- Nguyên nhân: `fracT` (`js/quiz.js`, L32) chỉ bỏ khoảng trắng quanh "/" rồi so chữ, không đổi "−", "–" thành "-", không bỏ khoảng trắng sau dấu trừ. `isFrac` thì nhận cả ba kiểu dấu trừ và khoảng trắng đó, nên câu vẫn đi vào nhánh so phân số.
- Đề có sẵn không gặp: câu điền về số âm bị `tests/kiem-tra-de.js` cấm từ L33. Chỉ đề phụ huynh, thầy cô tự nhập bị (dòng nhắc số âm của L30 vẫn hiện cho các câu đó, nên con biết phải gõ dấu trừ, gõ đúng mà vẫn bị chấm sai).

### Nhóm K · Chủ app báo ngày 21/10 (Phiên 9l)

QC đối chiếu `modules/l6-giua-ki-1/index.html` trên `main` commit `bd26bb0` với mục lục sách Khoa học tự nhiên 6 của hai bộ sách. Bài ôn Ngữ văn (Bài 1–3), Toán (Bài 1–17) của cùng trang và bài ôn lớp 4 đánh số đúng sách Kết nối tri thức.

**L36. Bài ôn KHTN giữa kì I lớp 6 đánh số và đặt tên bài theo sách Chân trời sáng tạo.**
- Trang ghi "Sách Khoa học tự nhiên 6 Kết nối tri thức với cuộc sống", nhưng 20 bài trong `lessons` của môn KHTN (`k1`–`k15`, `k17`–`k19`, `k35`, `k36`) theo đúng số bài và tên bài của sách Chân trời sáng tạo: "Bài 9 · Oxygen", "Bài 2 · Các lĩnh vực chủ yếu của Khoa học tự nhiên", "Bài 7 · Thang nhiệt độ Celsius. Đo nhiệt độ", "Bài 17 · Tế bào", "Bài 35 · Lực và biểu diễn lực"…
- Sách Kết nối tri thức (sách của app) đánh số khác, ví dụ: Bài 2 An toàn trong phòng thực hành, Bài 3 Sử dụng kính lúp, Bài 4 Sử dụng kính hiển vi quang học, Bài 8 Đo nhiệt độ, Bài 11 Oxygen. Không khí, Bài 16 Hỗn hợp các chất, Bài 17 Tách chất ra khỏi hỗn hợp, Bài 18 Tế bào – đơn vị cơ bản của sự sống, Bài 40 Lực là gì.
- Con và bố mẹ thấy số bài sai ở nhiều chỗ: danh sách bài ở trang môn KHTN, dòng phạm vi "Trường dạy cuốn chiếu: Bài 1–15. Trường dạy song song: Bài 1–9, 17–19, 35–36", nút chọn phạm vi đề thi thử ("Bài 1–15", "Bài 1–9, 17–19, 35–36"), nhãn trên câu, mục "Theo bài" ở màn kết quả, tên lượt ôn ("KHTN · Bài 9") lưu vào kết quả và báo cáo tuần. Con đối chiếu với sách, đề cương của trường thì không khớp, nhất là với phạm vi "song song".
- Nội dung câu hỏi (110 câu) phần lớn vẫn hợp với sách Kết nối tri thức, vì hai bộ sách cùng chương trình. Lỗi là ở số bài, tên bài, tên chủ đề, cách chia phạm vi.
- Kì thi giữa kì I lớp 6 dự kiến từ 2/11/2026 (`gk1-l6`), nên cần sửa trước đó.
- Ngân hàng KHTN 6 cuối kì I (`data/banks/6-khtn.js`, Phiên N5) ghi chủ đề không kèm số bài, không bị lỗi này.

### Nhóm L · Phiên N24b ghi ngày 21/10 (PO ghi mã, Phiên 9m)

Phiên N24b đối chiếu bản PDF Ngữ văn 6 tập một, sách in năm 2026 (mã G1HH6V001h26, ĐKXB 7-2026; PR #94, mục “Chỗ chủ app nên xem”, ý 2). PO dò lại trên `main` commit `9af28fb`.

**L37. Đề và bài ôn Ngữ văn 6 còn câu về hai văn bản sách in năm 2026 đã thay.**
- Sách in năm 2026 đổi văn bản 3 của hai bài: Bài 1 «Tia nắng hạt mưa» (Lệ Bình, tr. 27) thay «Bắt nạt» (Nguyễn Thế Hoàng Linh); Bài 2 «Hương và Phai» (trích, Nguyễn Minh Châu, tr. 48) thay «Bức tranh của em gái tôi» (Tạ Duy Anh).
- Bài ôn `modules/l6-giua-ki-1/index.html` (kì giữa kì I lớp 6, `gk1-l6`):
  - Ghi nhớ của Bài 1 (`v1`) và Bài 2 (`v2`) còn một ý về mỗi văn bản cũ.
  - 6 câu hỏi thẳng về hai văn bản cũ (dòng 330, 331, 342–345 ở commit `9af28fb`; câu thứ 10, 11, 21–24 của môn Ngữ văn trong `items`): tác giả và lời nhắn của «Bắt nạt»; ngôi kể, tác giả, tên cô em gái của «Bức tranh của em gái tôi»; tâm trạng người anh trước bức tranh (câu này không ghi tên văn bản).
  - Năm câu khác lấy tên tác giả, nhân vật của hai văn bản cũ làm lựa chọn sai (“Tạ Duy Anh”, “Nguyễn Thế Hoàng Linh”, “Kiều Phương, người anh”).
- Ngân hàng `van6-ck1` (`data/banks/6-van.js`, kì cuối kì I lớp 6): `van6-ck1-de2` câu 1 (“Bắt nạt” thuộc thể loại nào) và câu 9 (đúng/sai: người kể chuyện của “Bức tranh của em gái tôi”); hai câu này cũng ở kho của `van6-ck1-ngau-nhien`. Một câu khác của Đề 2 lấy “Tạ Duy Anh” làm lựa chọn sai.
- Học sinh học sách in năm 2026 không học hai văn bản cũ, nên gặp câu lạ, dễ làm sai, và “chủ đề hay sai” của Bài 1, Bài 2 bị lệch.
- Kì kiểm tra giữa kì I lớp 6 dự kiến từ 2/11/2026, cuối kì I từ 21/12/2026.
- Phiên N24b chỉ đối chiếu Bài 1–3. Bài 4, Bài 5 của sách in năm 2026 (thuộc phạm vi cuối kì I) chưa ai dò.
- Ghi chú của Phiên 9m: số dòng, chữ cũ ở trên là của bản trước PR #96. PR #96 (Merge ở commit `9af28fb`) đã viết lại Ghi nhớ, 6 câu của bài ôn và câu 1, câu 9 của Đề 2 theo hai văn bản mới; 5 lựa chọn sai thay tên cũ là tên có trong Bài 1–2 (Lệ Bình, Nguyễn Minh Châu, “Hương, Phai, anh Định”). Phiên 9m đối chiếu lại với sách, đổi 5 lựa chọn sai đó sang tên không có trong Bài 1–3 và dò Bài 4, Bài 5 (không văn bản nào bị thay).

### Nhóm M · Chủ app báo ngày 22/10 (Phiên 9n, 9o)

**L38. Bấm “Bỏ qua” thì không quay lại câu đó được.**
- Đề ngân hàng (`Quiz.run` trong `js/quiz.js`, cả ôn luyện lẫn làm như thi): `#qzSkip` ghi câu là chưa làm (`g: null`) rồi sang câu sau; hết câu cuối là ra màn kết quả ngay. Làm như thi cũng không có đường về câu đã bỏ qua trước khi nộp.
- Bài ôn dạng trang (`l4-giua-ki-1`, `l6-giua-ki-1`, `ioe-4`, `ioe-6`): `#skipBtn` gọi `record(q, null)` (câu vào “Ôn câu sai”) rồi `next()`; hết câu là `finish()`.
- Con lỡ tay bấm, hoặc muốn để câu khó lại làm sau, thì câu đó tính là sai mà không được làm. Làm bài trên giấy thì học sinh quay lại câu bỏ trống được trước khi nộp.

**L39. Không có bảng số câu: không nhảy tới câu bất kì, làm như thi không sửa được câu đã trả lời.**
- Đề ngân hàng và bài ôn dạng trang chỉ đi lần lượt từng câu. Làm như thi, bấm “Trả lời” là sang câu sau; câu đã trả lời không mở lại để xem hay sửa trước khi nộp.
- Chủ app muốn có bảng số câu như khi làm bài kiểm tra trên máy tính: nhảy tới câu bất kì, sửa câu trả lời trước khi nộp (22/10/2026).

### Nhóm N · Phiên DS1 ghi ngày 23/10 (Phiên 9p)

Phiên DS1 dò `modules/l4-giua-ki-1/index.html` (Toán Bài 1–19, Tiếng Việt tuần 1–8) và phần Toán của `modules/l6-giua-ki-1/index.html` (Chương I–III) trên `main` commit `6314d28` với bản PDF sách in năm 2026: Toán 4 tập một (mã G1HH4T001h26), Tiếng Việt 4 tập một (G1HH4V001h26), Toán 6 tập một (G1HH6T001h26), số ĐKXB 7-2026. Tên bài, tên chủ đề, chủ điểm và phạm vi khớp mục lục. Số trang dưới đây là trang in. Kì kiểm tra giữa kì I lớp 4 và lớp 6 dự kiến từ 2/11/2026 (`gk1-l4`, `gk1-l6`).

**L40. Phần Toán của bài ôn giữa kì I lớp 4: một Ghi nhớ dễ hiểu sai, vài câu lệch bài, 17 câu quá gần sách.**
- Ghi nhớ Bài 1 (`b1`), ý thứ ba: “Số liền sau hơn số liền trước 1 đơn vị.” Câu này dễ hiểu sai. Sách cho câu “Số liền trước của một số bé hơn số liền sau của số đó 2 đơn vị” là Đúng (Bài 15, tr. 50, HĐ1d); khung tr. 50 nói hai số tự nhiên liên tiếp hơn kém nhau 1 đơn vị.
- Bài 2 (`b2`): hai câu “Tìm x, biết: x + 2 450 = 10 000”, “Tìm x, biết: x × 4 = 3 600” và hai ý Ghi nhớ về tìm số hạng, thừa số chưa biết. Bài 2 của sách (tr. 9–11) chỉ ôn tính nhẩm, đặt tính, tính giá trị biểu thức và bài toán có lời. Bài 1–19 không dùng chữ x cho số chưa biết.
- Bài 3 (`b3`): câu đúng/sai “Tổng của hai số lẻ là một số chẵn.” là điều sách không dạy (tr. 12–13). Ghi nhớ định nghĩa số chẵn, số lẻ bằng chữ số tận cùng; sách định nghĩa số chẵn là số chia hết cho 2, số lẻ là số không chia hết cho 2, còn chữ số tận cùng là phần nhận xét (tr. 12).
- Bài 5 (`b5`, “Giải bài toán có ba bước tính”): câu cố định “Một đội có 3 xe, mỗi xe chở 2 450 kg hàng và 1 xe chở 1 800 kg hàng…” chỉ có hai bước tính. Bối cảnh xe chở hàng gần bài tập 3 tr. 10 (4 xe chở gạo).
- Bài 11, Bài 12 (`b11`, `b12`): sách dạy lớp triệu, mười triệu, một trăm triệu ở Bài 11 (tr. 38). Bài 12 (tr. 41–44) dạy đọc, viết số đến lớp triệu và số 1 000 000 000 (một tỉ). Bài ôn để Ghi nhớ về lớp triệu và câu “Số mười triệu viết là:” ở Bài 12; Ghi nhớ Bài 11 không có lớp triệu, cả hai bài không có “một tỉ”.
- 17 câu cố định quá gần sách: câu khái niệm của khung kiến thức thành câu hỏi, cùng số liệu, hoặc cùng khung chỉ đổi số với bài tập (Rút ra N23 và “Rút ra khi dò `toan4-ck1`” ở mục 3 của `docs/KE-HOACH-NOI-DUNG.md`):
  - `b3`: “Từ 1 đến 20 có bao nhiêu số lẻ?” (tr. 13, HĐ3: từ 10 đến 31).
  - `b7`: “Đơn vị đo góc là:”, “Khi đo góc, ta đặt tâm của thước đo góc trùng với:” (khung tr. 23).
  - `b8`: “Góc bẹt bằng mấy góc vuông?”, đúng/sai “Góc tù bé hơn góc vuông.” (khung tr. 26); “Lúc 3 giờ đúng…”, “Lúc 6 giờ đúng, kim giờ và kim phút tạo thành:” (tr. 25, 28, 121).
  - `b11`: “Lớp nghìn gồm những hàng nào?” (khung tr. 37). `b12`: “Số mười triệu viết là:” (khung tr. 38).
  - `b15`: “Số tự nhiên bé nhất là:”, đúng/sai “Có số tự nhiên lớn nhất.” (khung và HĐ1 tr. 50); “Số tự nhiên liền trước của 100 000 là:” (tr. 51).
  - `b17`: “1 tấn bằng bao nhiêu tạ?” (khung tr. 56, tr. 125); “Một con voi trưởng thành có thể nặng khoảng:” 5 tấn (tr. 56, HĐ1: voi 4 tấn).
  - `b18`: “Diện tích một phòng học khoảng:” 50 m² (tr. 62–63, HĐ2, HĐ3); “1 m² = ___ cm²” (tr. 126).
  - `b19`: “1 thế kỉ = ___ năm” (khung tr. 66, tr. 67, tr. 126).
  PR #108 đã soạn lại các câu cùng loại ở `toan4-ck1` (voi nặng mấy tấn, góc của hai kim lúc 3 giờ và 6 giờ, tâm thước đo góc, số tự nhiên bé nhất).
- Ghi nhớ của các bài 4, 8, 11, 13, 14, 15, 17, 18, 19 chép gần nguyên văn khung kiến thức của sách; kiến thức đúng. Câu sinh ngẫu nhiên (ngoài phạm vi dò của DS1, ghi để phiên sửa xem): lời dẫn của `perim` ghi công thức chu vi của khung (tr. 15–16); `step3` có hai bối cảnh gần bài tập của sách (cửa hàng bán hai buổi, buổi sau gấp mấy lần, hỏi còn lại: tr. 20, bài tập 2; mua hàng, đưa tiền, hỏi tiền trả lại: tr. 22, bài tập 3).

**L41. Phần Tiếng Việt của bài ôn giữa kì I lớp 4: nội dung ngoài tuần 1–8, hai kiểu bài Viết lệch sách.**
- Sách tuần 1–8 (Bài 1–16), Luyện từ và câu: Danh từ (tr. 9), Danh từ chung, danh từ riêng (tr. 18), Luyện tập về danh từ (tr. 24), Quy tắc viết tên cơ quan, tổ chức (tr. 32), Động từ (tr. 41), Luyện tập về động từ (tr. 49, tr. 57), Cách dùng và công dụng của từ điển (tr. 64). Viết: đoạn văn nêu ý kiến (Bài 2–5), báo cáo thảo luận nhóm (Bài 6–8), bài văn thuật lại một sự việc (Bài 9–11), bài văn kể lại một câu chuyện (Bài 12–16). Ghi nhớ về danh từ, danh từ chung và riêng, tên cơ quan, hai ý đầu của Ghi nhớ về động từ, hai kiểu bài Viết thứ ba, thứ tư và 6 bài đọc tự soạn của bài ôn khớp sách; không câu nào nhắc văn bản, tác giả, nhân vật của sách.
- Bài “Động từ” (`n4`): Ghi nhớ có ý “Các từ đã, đang, sẽ đứng trước động từ để cho biết thời gian của hoạt động” và ba câu chọn từ điền “sẽ” (“Ngày mai, lớp em ___ đi tham quan.”), “đã” (“Em ___ làm xong bài tập từ tối qua.”), “đang” (“Lúc này, mẹ ___ nấu cơm dưới bếp.”). Tuần 1–8 chỉ dạy động từ chỉ hoạt động, trạng thái (tr. 41), động từ chỉ hoạt động di chuyển (tr. 50), động từ thể hiện tình cảm, cảm xúc (tr. 57); không có đã, đang, sẽ.
- Kiểu bài Viết thứ nhất (`writing[0]`, “Viết đoạn văn nêu ý kiến”): đề và dàn ý nêu ý kiến về một nhân vật em yêu thích. Sách tuần 1–4 dạy đoạn văn nêu ý kiến về **một câu chuyện** đã đọc hoặc đã nghe: nói rõ thích hay không thích câu chuyện và nêu rõ lí do (Ghi nhớ tr. 15); dàn ý Mở đầu (tên câu chuyện, ý kiến chung), Triển khai (lí do, dẫn chứng), Kết thúc (khẳng định lại ý kiến) (tr. 19).
- Kiểu bài Viết thứ hai (`writing[1]`, “Viết báo cáo thảo luận nhóm”): dàn ý ghi phần đầu là tên báo cáo, nhóm, lớp, thời gian; phần cuối là người viết ghi tên; bảng kiểm không có quốc hiệu, tiêu ngữ, người nhận, chữ kí. Ghi nhớ tr. 29: báo cáo gồm phần đầu (quốc hiệu và tiêu ngữ, địa điểm và thời gian viết báo cáo), phần chính (tiêu đề, người nhận, nội dung báo cáo), phần cuối (chữ kí, họ và tên của người viết báo cáo); nội dung sắp xếp theo mục (mẫu tr. 28, dàn ý tr. 33, mỗi kết quả đánh dấu bằng dấu gạch ngang tr. 36).
- Chỗ nhỏ:
  - Ghi nhớ bài “Từ điển” (`n5`) và câu đúng/sai “Từ điển giúp em kiểm tra một từ viết đúng hay sai chính tả.” nói từ điển giúp kiểm tra chính tả. Sách nêu công dụng là cho biết từ loại, cách dùng từ qua ví dụ và nghĩa của từ (tr. 65, bài tập 3).
  - Câu đúng/sai “Khi viết tên cơ quan, tổ chức, ta viết hoa chữ cái đầu của mỗi bộ phận tạo thành tên đó.” (`n3`) chép gần nguyên khung Ghi nhớ tr. 32 thành câu hỏi.
  - Câu “Trong câu “Mùa hè, em được về quê ngoại ở Nam Định thăm bà.”, danh từ riêng là:” (`n2`) dùng tên tỉnh đã sáp nhập năm 2025 (CLAUDE.md: không dựa vào đơn vị hành chính cũ; Rút ra N3).

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

### Phiên 9f

**L27 · Làm đúng ở đâu cũng bỏ câu khỏi "Ôn câu sai".**
- `record()` trong 4 file `modules/l4-giua-ki-1/index.html`, `modules/l6-giua-ki-1/index.html`, `modules/ioe-4/index.html`, `modules/ioe-6/index.html`:
  - làm đúng ở mọi chế độ (cả đề thi thử) thì bỏ câu khỏi danh sách;
  - làm sai, bấm "Bỏ qua", nộp đề còn câu chưa làm thì thêm vào như cũ;
  - câu sinh số ngẫu nhiên (`it.g` ở Toán) vẫn tính theo mã câu gốc như cũ.
  - Đã thử trên máy khi rà soát (không đưa vào Pull Request): sửa dòng đó của `l6-giua-ki-1` thành `if(ok)w.delete(wkey(q));else w.add(wkey(q));` thì làm lại Đề 1 đúng hết, danh sách trống, màn kết quả chỉ còn nút "Làm Đề 2" và "Trang chủ".
- Chữ ở trang đầu bài ôn, mục "Ôn câu sai":
  - l4, l6: "Làm đúng câu đó ở bất kì phần nào (ôn theo bài, đề thi thử hay ôn câu sai) thì câu được bỏ khỏi danh sách."
  - IOE 4, IOE 6 (giữ 100% tiếng Anh): "Answer it correctly in any practice or test and it leaves the list."
- Màn kết quả: lượt vừa làm không sai câu nào mà danh sách vẫn còn câu (từ bài khác hoặc lần trước) thì thêm một dòng ngay trên các nút: "Lần này bạn không sai câu nào. Danh sách Ôn câu sai còn N câu từ các lần làm trước." IOE: "No mistakes this time. Your review list still has N questions from earlier." Lượt có câu sai thì giữ như cũ.
- Không xóa danh sách câu sai đang có trên máy học sinh: không biết câu nào đã được làm đúng trong đề trước đây. Câu thừa tự ra khỏi danh sách khi làm đúng ở bất kì đâu.
- Giữ ba chỗ nối với app và nút `#endBtn` (CLAUDE.md, mục "Hợp đồng giữa bài ôn và app"). Câu "Mỗi file `modules/*/index.html` có ba chỗ nối với app so với artifact gốc (ngoài ra chỉ sửa lời…)" của CLAUDE.md thêm việc sửa L27. Chỉ sửa nội dung HTML nên không tăng `VERSION` của `sw.js`.

**Xong khi:**
- `tests/e2e.js` in `E2E OK`, có thêm bước "L27" ở 360px:
  - Học sinh lớp 6 mở `l6-giua-ki-1` trong khung, Ngữ văn, Đề 1:
    - chọn sai một câu thì câu đó vào danh sách (localStorage khóa `u_<mã học sinh>__gk1-l6-v1_wrong_van`);
    - làm lại Đề 1 đúng hết: 20/20, danh sách trống, màn kết quả không có nút "Ôn câu sai";
    - đáp án đọc trong khung bằng `buildTest("van", "all", 0)`: hàm ở cấp ngoài cùng của script bài ôn, câu trên màn hình theo đúng thứ tự hàm trả về; câu trắc nghiệm bấm `.opt[data-o="<a>"]`, câu điền gõ `ans[0]`.
  - Ghi sẵn vào danh sách một mã câu không có trong Đề 1, rồi làm Đề 1 đúng hết: màn kết quả có dòng "Lần này bạn không sai câu nào…" và nút "Ôn câu sai (1)"; màn đó qua kiểm tra 360px (không tràn ngang, nút ≥ 44px, chữ ≥ 13px) sáng và tối.
  - `l4-giua-ki-1`: một môn, như trên (khóa `…gk1-l4-v1_wrong_<mã môn>`).
  - `ioe-4`, `ioe-6`: đề IOE có câu nghe, câu xếp chữ, nên chỉ cần một câu: ghi sẵn vào danh sách (khóa `…ioe4v1_wrong`, `…ioe6v2_wrong`) mã của câu trắc nghiệm đầu tiên trong một đề (`buildTest` của khung), bắt đầu đề đó, bấm "Skip" đến câu đó, trả lời đúng, rồi "Finish test now": câu đó ra khỏi danh sách, các câu bỏ qua và chưa làm thì vào danh sách.
  - Bước cũ "leave guard: module in frame (L1, L16)" vẫn qua.
- `node tests/supabase/cloud-e2e.js` in `CLOUD E2E OK` (bản đám mây không đổi; chạy để chắc bài ôn trong khung vẫn gửi điểm).
- Ảnh 360px sáng/tối màn kết quả có dòng mới. Pull Request đặt ảnh trước ([hinh-ra-soat-k3/l27-on-cau-sai.jpg](hinh-ra-soat-k3/l27-on-cau-sai.jpg)) cạnh ảnh sau.
- Bố mẹ thử lại trên máy đang dùng: làm lại một đề đúng hết thì "Ôn câu sai" không còn câu của đề đó.

### Phiên 9g

**L28 · Hai script kiểm thử chạy ở một ngày cố định.** Chỉ sửa `tests/e2e.js`, `tests/supabase/cloud-e2e.js` và CLAUDE.md, không sửa app.
- `tests/e2e.js`:
  - Thêm hằng `TODAY` ở đầu file, ví dụ `"2026-10-21T08:00:00"`, và một hàm tạo context dùng chung: gọi `browser.newContext(opts)` rồi `ctx.clock.install({ time: new Date(TODAY) })`.
    - `TODAY` không được muộn hơn ngày giả lập sớm nhất của các bước tự cài đồng hồ (21/10/2026 của UX1, UX2), để không bước nào gặp dữ liệu "ở tương lai" (nguyên nhân 6).
    - Ngày 21/10/2026 là ngày các chữ mong đợi đang đúng: `k3.hero` vẫn là "· 7 bài ôn →", lớp 4 có 8 kì thi chưa qua (nguyên nhân 1, 3).
  - Mọi chỗ tạo context đi qua hàm này: 20 chỗ `browser.newContext` ở `main` hôm nay, kể cả context đầu tiên của bước thiết lập. Như vậy dữ liệu của các bước đầu (`state`) cũng ghi ở `TODAY`. Trang ghép ảnh (`browser.newPage` cho `gp`) không mở app nên giữ nguyên.
  - Bước tự cài đồng hồ giữ như cũ: L18 (1/4/2027), 9e (21/12/2026), UX1 (21/10 rồi 1/12), UX2 (21/10), UX5 (14/12). Cài lại đè lên `TODAY` được: QC đã thử với Playwright 1.56, cả khi tải lại trang và sau `setSystemTime`.
  - Bước UX5 lấy kết quả vừa nộp theo đề và cách làm (`refId` là `toan4-ck1-de3`, `mode` là `"exam"`), không lấy phần tử đầu của `Store.resultsFor(…)` (nguyên nhân 6).
  - Chỗ so giờ ở node thì so với giờ trong trang. Hiện có một chỗ: `fresh` của bước L14 (sao lưu) so `lastBackupAt` với `Date.now()` của node. Bước service worker (L19) đo thời gian bằng giờ node, giữ như cũ.
  - Chữ mong đợi đang ghi (`k3.hero`, lịch thi của học sinh) giữ nguyên, vì đúng ở `TODAY`. Phiên N4 viết lại bước K3 thì giữ `TODAY`.
  - Kiểm tra `submitSeen` của bước UX5 cho sai lệch 1px: `b.bottom <= innerHeight + 1` (nguyên nhân 7).
- `tests/supabase/cloud-e2e.js`:
  - `device()` là chỗ duy nhất tạo context của trang học và trang admin: cài đồng hồ ở `TODAY` ở đó (nguyên nhân 2, 4).
  - Máy chủ giả và Edge Function admin dùng cùng giờ đó: đặt `be.clock = new Date(TODAY) - Date.now()` ngay sau `createBackend()`, và tạo `createHandler({ …, now: () => new Date(Date.now() + be.clock) })` như `tests/supabase/store-test.mjs`.
    - Không thì máy chủ giả vẫn theo giờ thật. Nó ghi `at` của kết quả là giờ sớm hơn trong hai giờ (giờ gửi, giờ máy chủ), nên chạy trước `TODAY` thì "2 bài hôm nay" thành 0. "Dùng trong 7 ngày" của trang admin cũng tính theo giờ thật.
  - Dòng 459 đọc dòng kì thi trên thẻ của con sao cho thẻ không có dòng đó thì kiểm tra báo sai, không làm script dừng (nguyên nhân 5).
- CLAUDE.md, mục "Chạy và kiểm tra": hai script chạy ở một ngày cố định (`TODAY` ở đầu file); bước nào cần ngày khác thì tự cài đồng hồ; bước mới tạo context bằng hàm dùng chung. Có thể thêm script bọc ở mục 1 (L28) vào `tests/` để lần sau thử lại theo ngày.

**Xong khi:**
- `tests/e2e.js` in `E2E OK` và `tests/supabase/cloud-e2e.js` in `CLOUD E2E OK`:
  - ở ngày thật;
  - và qua script bọc ở mục 1 (L28) với `FAKE_NOW` là 2/11/2026, 14/11/2026, 22/12/2026, 10/1/2027 và 1/6/2027. Bản đã sửa thì đồng hồ của script đè lên giờ của script bọc, nên kết quả không đổi theo ngày.
- Không còn `browser.newContext` nào ngoài hàm dùng chung (trang ghép ảnh dùng `browser.newPage` thì được).
- Pull Request ghi các ngày đã thử.

### Phiên 9h

**L29 · Câu trả lời bằng số nhận phân số trên mọi máy.**
- Thêm nút "/" cạnh nút ± ở hàng `.num-row` (ví dụ `#qzSlash`, cao ≥ 44px ở 360px).
  - Bấm thì thêm "/" vào chỗ con trỏ trong ô; ô đã có "/" thì không thêm nữa. Rồi trả focus về ô như nút ±.
  - Nút hiện ở mọi câu trả lời bằng số, không tùy đáp án, để không lộ ra đáp án là phân số.
  - Giữ `inputmode="decimal"`.
- Dữ liệu ghi được đáp án phân số, ví dụ `ans: "2/3"` (chuỗi a/b, có thể có dấu trừ). Số nguyên, số thập phân vẫn ghi dạng số như cũ.
  - Chấm: đổi ra giá trị bằng `numVals`, sai số `tol` như cũ.
  - Chỗ hiện đáp án (`correctText`, cũng là bản chụp `Quiz.text` khi báo câu sai) ghi đúng "2/3", không làm tròn.
  - Câu trả lời bằng số so giá trị, nên 6/8 cũng đúng với đáp án 3/4. Đề bắt viết phân số tối giản thì vẫn dùng câu điền (so chữ), như lời giao việc N7, N8.
- Chữ mới (bảng chữ `TXT`, cả cột `vi` và `en`):
  - dòng nhắc dưới ô: "Phân số viết a/b, ví dụ 3/4. Số thập phân viết bằng dấu phẩy, ví dụ 2,5." / "Write a fraction as a/b, for example 3/4. Use a decimal point, for example 2.5.";
  - tên đọc của nút: "Thêm dấu phân số" / "Add a fraction bar".
- `Quiz.parse`: "Đáp số: 3/4" (và "-3/4") thành câu trả lời bằng số có đáp án "3/4", không còn đọc thành đáp án 3 với đơn vị "/4". Dòng "Cách viết câu hỏi" thêm ví dụ này.
- `tests/kiem-tra-de.js`: câu `num` có `ans` là chuỗi thì phải đúng dạng a/b, b khác 0. Ghi cách viết này vào chú thích dạng câu ở đầu `data/banks/index.js`.

**L30 · Câu điền có đáp án âm mở bàn phím có dấu trừ.**
- Làm như bài ôn dạng trang. Đáp án có số âm thì ô `#qzFill` không đặt `inputmode="decimal"`, để điện thoại mở bàn phím thường (có "-").
- Dưới câu thêm dòng nhắc "Số âm: gõ dấu trừ phía trước, ví dụ -12." / "For a negative number, type the minus sign first, for example -12."
- Đáp án toàn số không âm thì giữ `inputmode="decimal"` như UX1.

**L31 · Câu điền số so theo giá trị.**
- Trong `fillRight`, khi đáp án và chữ gõ đều là số thì so giá trị như `numVals`, thay cho so chuỗi `numKey`.
  - Chữ viết mơ hồ như "1.200" có hai cách đọc; trùng một cách là đúng.
  - "1.25" và "1,25" đều đúng với đáp án 1,25; "2.5" không còn đúng với đáp án 25.
  - Vẫn như cũ: "1 200", "1200", "1.200" đúng với đáp án "1 200"; "(-7)" đúng với -7; số gõ kèm đơn vị.
- Chạy `CHI_TIET=1 node tests/so-bo-cham.js` (so bộ chấm câu điền bản cũ với bản mới).
  - Chỗ khác nhau chỉ được thuộc hai loại trên: gõ dấu chấm thập phân nay đúng; gõ "2.5" cho đáp án "25" nay sai.
  - Ghi danh sách vào Pull Request, rồi đổi bản so mặc định của script sang commit của phiên, để lần sau script lại in 0.

**Chung:**
- Chỉ sửa:
  - `js/quiz.js` (cả hai cột của `TXT`);
  - `css/app.css` nếu nút mới cần;
  - `tests/`;
  - chú thích ở đầu `data/banks/index.js`;
  - tài liệu.
- Không sửa `modules/`. Không đổi câu, đáp án của đề có sẵn: `Quiz.key` của câu cũ giữ nguyên.
- CLAUDE.md:
  - câu "câu điền mà mọi đáp án là số có `inputmode="decimal"`" (mục "Trang Hôm nay", UX1) thêm "trừ khi có đáp án âm";
  - ghi nút "/" và đáp án phân số của dạng `num`.
- `docs/KE-HOACH-NOI-DUNG.md` mục 3, phần ghi chú cho các phiên làm đề:
  - câu trả lời bằng số dùng được cho phân số (`ans: "a/b"`), số âm, số thập phân;
  - câu điền dùng được cho số âm, số thập phân.
- `docs/KE-HOACH-NOI-DUNG.md` mục 7:
  - lời giao việc N7, N8: thay câu dặn "không dùng câu trả lời bằng số" cho đáp án phân số bằng cách viết mới (`ans: "a/b"`; đề bắt viết phân số tối giản thì dùng câu điền);
  - "Quy định chung của các phiên N": bỏ câu dặn tạm về số âm, số thập phân (L30, L31).

**Xong khi:**
- `tests/e2e.js` in `E2E OK`, có thêm bước "L29–L31" ở 360px, sáng và tối. Bước này dùng một đề thử thêm vào danh mục lúc chạy, như pool giả ở bước K3:
  - câu trả lời bằng số đáp án "2/3":
    - có nút "/" (≥ 44px) cạnh nút ±;
    - gõ 2, bấm nút "/", gõ 3 (chỉ gõ chữ số, dấu bằng nút), Kiểm tra: đúng;
    - gõ "0,67": sai, phần đáp án hiện "2/3";
  - câu đáp án "-3/4", dùng nút ± và nút "/": đúng;
  - câu điền đáp án "-7": ô không có `inputmode="decimal"`, có dòng nhắc số âm, gõ "-7" đúng;
  - câu điền đáp án "1,25": ô có `inputmode="decimal"`, gõ "1.25" đúng;
  - câu điền đáp án "25": gõ "2.5" sai;
  - màn đó qua kiểm tra 360px (không tràn ngang, nút ≥ 44px, chữ ≥ 13px);
  - `Quiz.TXT.en` có đủ chữ mới, không có chữ cái tiếng Việt;
  - bước TA2 vẫn qua.
- `node tests/kiem-tra-de.js` in `DE OK`. Script tự thử:
  - câu `num` với `ans: "2/3"` qua; `ans: "2/0"` và `ans: "hai phần ba"` bị báo lỗi;
  - `Quiz.parse` đọc "Đáp số: 3/4" thành đáp án "3/4", không có đơn vị.
- `CHI_TIET=1 node tests/so-bo-cham.js`: chỉ khác như ở L31.
- `node tests/supabase/cloud-e2e.js` in `CLOUD E2E OK`: màn làm đề dùng chung cho bản đám mây, kể cả màn làm đề Tiếng Anh (`c8e`–`c8g`).
- Bố mẹ thử trên iPhone thật một đề tự nhập (Khu phụ huynh → Cài đặt → + Nhập đề) có ba câu:
  ```
  1/2 + 1/4 = ?
  Đáp số: 3/4

  (−3) · 4 = [-12]

  1 250 g = [1,25] kg
  ```
  Làm ở chế độ ôn luyện:
  - câu 1 gõ được "3/4" nhờ nút "/";
  - câu 2 bàn phím có dấu trừ;
  - câu 3 gõ được bằng dấu thập phân trên bàn phím của máy, dấu phẩy hay dấu chấm đều được chấm đúng.

### Phiên 9i

**L32 · Phân số, hỗn số gõ có khoảng trắng.** Chỉ sửa `js/quiz.js`, `tests/` và tài liệu; không đổi đề có sẵn, không sửa `modules/`.
- Câu trả lời bằng số (`numVals`): chữ gõ có dạng hỗn số "a b/c" (số tự nhiên, khoảng trắng, phân số; có thể có dấu trừ phía trước, có thể nằm trong ngoặc) thì đọc là a + b/c, dấu trừ áp cho cả số ("-1 1/2" là −1,5). Đọc hỗn số trước bước bỏ khoảng trắng; c bằng 0 thì không đọc được.
  - "1 1/2" đúng với đáp án "3/2" và 1,5, không còn đúng với "11/2".
  - Các cách đọc khác giữ nguyên: "1 200" vẫn là 1200; "11/2", "2 / 3", "3/4 kg" như cũ.
  - Chữ đọc được hai cách ("1 200/3": hỗn số, hay 1 200 phần 3) thì nhận cả hai, như `numVals` đang làm với "1.000".
- Câu điền (`fillRight`): đáp án là phân số hoặc hỗn số ("3/4", "-3/4", "3 1/2") thì bỏ khoảng trắng quanh dấu "/" ở cả đáp án và chữ gõ rồi mới so chữ. Vẫn so chữ, nên "6/8" vẫn sai với "3/4" (câu bắt viết phân số tối giản).
- Không đổi dòng nhắc dưới ô: trên iPhone con đổi hỗn số ra phân số như sách. `Quiz.parse` vẫn báo lỗi dòng "Đáp số: 1 1/2" và dặn viết 3/2.

**Xong khi:**
- `node tests/kiem-tra-de.js` in `DE OK`. Phần tự thử câu trả lời bằng số thử thêm bằng `Quiz.score`:
  - "1 1/2" đúng với "3/2" và với 1,5, sai với "11/2"; "-1 1/2" đúng với "-3/2"; "2 3/4" đúng với "11/4", sai với "23/4"; "1 1/0" sai;
  - vẫn như cũ: "1 200" đúng với 1200, "2 / 3" đúng với "2/3";
  - câu điền đáp án "3/4": "3 / 4" và "3/ 4" đúng, "6/8" sai; đáp án "3 1/2": "3 1 / 2" đúng.
- `CHI_TIET=1 node tests/so-bo-cham.js`: thêm một câu đáp án "3/4" vào nhóm câu kiểu quản trị viên nhập của script; chỗ khác so với bản mặc định chỉ được là gõ có khoảng trắng quanh "/". Ghi danh sách vào Pull Request, rồi đổi bản so mặc định sang commit của phiên.
- `tests/e2e.js` in `E2E OK`, `node tests/supabase/cloud-e2e.js` in `CLOUD E2E OK`.
- CLAUDE.md, mục "Nội dung câu hỏi": hỗn số "1 1/2" đọc là 1,5; câu điền phân số không tính khoảng trắng quanh "/".

**L33 · Câu về số âm không dùng câu điền.** Sửa trong Phiên N4 (PR #78), vì N4 làm lại ngân hàng Toán 6 cuối kì I từ đúng hai đề này. Sửa câu và thêm kiểm tra trong cùng một phiên, để `DE OK` không hỏng ở giữa.
- Đổi 5 câu ở L33 sang câu trả lời bằng số: `type: "num"`, `ans` là số (−100, −9, −100, 0, 2), đề bỏ "___" (ví dụ "(−72) : 8 = ?"); giữ chủ đề, lời giải, thêm `lv` như các câu khác.
  - `Quiz.key` của 5 câu đổi theo, nên lịch sử từng câu của đề ngẫu nhiên (`PoolHist`) với 5 câu này bắt đầu lại. Điểm đã lưu và "chủ đề hay sai" không đổi.
- `tests/kiem-tra-de.js` báo lỗi câu điền có đáp án là số âm, hoặc câu điền mà mọi đáp án là số và đề có số âm: "câu về số âm dùng câu trả lời bằng số hoặc trắc nghiệm (L33)".
  - Số âm trong đề là dấu trừ ("−" hoặc "-") đứng liền trước chữ số, và đứng đầu câu, sau khoảng trắng hoặc sau dấu mở ngoặc, như "(−25)", "−5". Dấu trừ của phép trừ có khoảng trắng hai bên, như "862 450 − 315 270", nên không tính; gạch nối khoảng như "Bài 1–22" cũng không tính.
  - Script tự thử với hai câu cố ý viết sai: "(−72) : 8 = ___" đáp án "-9"; "(−25) + 30 = ___" đáp án "5".
  - Đề phụ huynh tự nhập không qua script này. Dòng nhắc số âm của L30 vẫn dùng cho các đề đó.
- CLAUDE.md, đoạn về `tests/kiem-tra-de.js` ở mục "Chạy và kiểm tra": ghi kiểm tra mới.

**Xong khi** (cùng với điều kiện xong của N4): `node tests/kiem-tra-de.js` in `DE OK` với dữ liệu mới, và báo lỗi hai câu tự thử; không câu điền nào của đề có sẵn hiện dòng nhắc số âm.

### Phiên 9j

**L34 · Câu điền đáp án phân số, gõ kèm đơn vị.** Chỉ sửa `js/quiz.js`, `tests/` và tài liệu; không đổi đề có sẵn, không sửa `modules/`.
- `fillRight`: khi chữ gõ có đơn vị của câu ở cuối (`tail`, như hôm nay), phần còn lại là phân số hoặc hỗn số (`isFrac(rest)`) thì cũng đưa vào `cands`, như với số. Sau đó so như L32: bỏ khoảng trắng quanh "/" rồi so chữ.
  - "3/4 kg", "3/4kg", "3 / 4 kg", "3/4 KG" đúng. Chỉ bỏ đơn vị in sau chỗ trống, kể cả gõ không dấu hay "m2" thay "m²" như hôm nay; đơn vị khác ("3/4 g") vẫn sai.
  - Vẫn so chữ: "6/8 kg" vẫn sai với "3/4"; "0,75 kg" vẫn sai (câu điền phân số bắt viết phân số).
  - "3 1/2 m" đúng với đáp án "3 1/2"; "3/4 m²", "3/4 m2" đúng với "___ m²".
- Không đổi cách chấm câu có đáp án là số, câu trả lời bằng số và câu chữ.

**Xong khi:**
- `node tests/kiem-tra-de.js` in `DE OK`; phần tự thử câu điền thêm bằng `Quiz.score`: câu "1/2 kg + 1/4 kg = ___ kg" đáp án "3/4": "3/4 kg", "3/4kg", "3 / 4 kg" đúng, "6/8 kg", "0,75 kg", "3/4 g" sai; câu "___ m" đáp án "3 1/2": "3 1/2 m" đúng; câu "___ m²" đáp án "3/4": "3/4 m²", "3/4 m2" đúng.
- `CHI_TIET=1 node tests/so-bo-cham.js`: thêm câu "1/2 kg + 1/4 kg = ___ kg" đáp án "3/4" vào nhóm câu kiểu quản trị viên nhập, với các cách gõ trên. Chỗ khác so với bản mặc định (`74b7645`) chỉ được là phân số gõ kèm đơn vị của câu. Ghi danh sách vào Pull Request, rồi đổi bản so mặc định sang commit của phiên.
- `tests/e2e.js` in `E2E OK`, `node tests/supabase/cloud-e2e.js` in `CLOUD E2E OK`.
- CLAUDE.md, mục "Nội dung câu hỏi": câu điền đáp án phân số nhận chữ gõ kèm đơn vị in sau chỗ trống.

### Phiên 9k

**L35 · Câu điền đáp án phân số âm, dấu trừ khác kiểu.** Chỉ sửa `js/quiz.js`, `tests/` và tài liệu; không đổi đề có sẵn, không sửa `modules/`.
- `fracT`: trước khi so, đổi "−" (U+2212), "–" (U+2013) thành "-" và bỏ khoảng trắng ngay sau dấu trừ đầu chữ, ở cả đáp án và chữ gõ (như `numKey`, `numVals` đang làm với số).
  - Đáp án "−3/4", "–3/4" hay "-3/4": "-3/4", "−3/4", "- 3/4", "-3/4 kg" (câu "___ kg", L34) đều đúng.
  - Đáp án "−1 1/2": "-1 1/2" đúng.
  - Vẫn so chữ: "3/4" sai với "−3/4", "-6/8" sai với "−3/4", "-3/4" sai với "3/4".
- Không đổi cách chấm câu có đáp án là số, câu trả lời bằng số và câu chữ. Không đổi `isFrac`, dòng nhắc số âm, `Quiz.parse` (đáp án vẫn lưu như phụ huynh viết).

**Xong khi:**
- `node tests/kiem-tra-de.js` in `DE OK`; phần tự thử câu điền thêm bằng `Quiz.score` các cách gõ ở trên (đúng và sai).
- `CHI_TIET=1 node tests/so-bo-cham.js`: thêm câu đáp án "−3/4" (dấu trừ chữ in) và câu đáp án "-3/4" vào nhóm câu kiểu quản trị viên nhập, với các cách gõ trên. Chỗ khác so với bản mặc định (`fe01877`) chỉ được là phân số âm gõ bằng dấu trừ khác kiểu hoặc có khoảng trắng sau dấu trừ. Ghi danh sách vào Pull Request, rồi đổi bản so mặc định sang commit của phiên.
- `tests/e2e.js` in `E2E OK`, `node tests/supabase/cloud-e2e.js` in `CLOUD E2E OK`.
- CLAUDE.md, mục "Nội dung câu hỏi": câu điền đáp án phân số không phân biệt kiểu dấu trừ ("−3/4" đúng với "-3/4").

### Phiên 9l

**L36 · Bài ôn KHTN 6 theo đúng sách Kết nối tri thức.** Chỉ sửa phần KHTN 6 trong `modules/l6-giua-ki-1/index.html` (khối `/* KHTN 6 */`), `tests/` và tài liệu.
- Đối chiếu từng bài với mục lục sách Khoa học tự nhiên 6 Kết nối tri thức (tìm mục lục trên mạng, so ít nhất hai nguồn). Sửa `short`, `name` của từng bài, tên chủ đề `K1`–`K6` (theo tên chương của sách), `scopeText` và `note`, `name` của hai phạm vi đề thi thử.
  - QC đối chiếu sơ bộ (phiên sửa kiểm lại): `k1`, `k2` → Bài 1; `k3` → Bài 2–4; `k4`–`k7` → Bài 5–8; `k8` → Bài 9–10; `k9`, `k10` → Bài 11; `k11` → Bài 12; `k13` → Bài 13; `k12` → Bài 14; `k14` → Bài 15; `k15` → Bài 16–17; `k17` → Bài 18–19; `k18` → Bài 21; `k19` → Bài 22–23; `k35`, `k36` → Bài 40–41.
  - Bài nào gộp nhiều bài sách thì `short` ghi khoảng ("Bài 2–4"); hai bài của trang cùng một bài sách thì ghi cùng số và tên bài phân biệt nội dung ("Bài 11 · Oxygen", "Bài 11 · Không khí"). Có thể gộp hai bài đó thành một nếu giữ nguyên `id` của câu.
  - Phạm vi viết lại theo số bài Kết nối tri thức (ví dụ cuốn chiếu Bài 1–17; song song Bài 1–11, 18–23, 40–41). Thêm `k10` vào phạm vi song song nếu `k9` có mặt (cùng Bài 11).
- Không đổi `id` của bài (`k1`…`k36`), không chèn, xóa hay đổi thứ tự câu trong `items`: kết quả theo bài (`lres`) lưu theo `id` bài, danh sách "Ôn câu sai" lưu theo số thứ tự câu trong môn (`wkey`). Đổi thứ tự hiện của bài trong `lessons` theo sách thì được.
- Sửa câu nào nói theo cách của sách Chân trời sáng tạo mà sách Kết nối tri thức không có (nếu có); giữ số câu. Không đổi phần Toán, Ngữ văn và ba chỗ nối với app (hợp đồng ở CLAUDE.md).
- Kết quả cũ đã lưu giữ tên cũ ("KHTN · Bài 9"); không cần sửa.

**Xong khi:**
- Mọi `short`, `name`, chủ đề, phạm vi của KHTN khớp mục lục sách Kết nối tri thức; Pull Request có bảng đối chiếu (bài của trang → bài sách) và nguồn mục lục.
- Không còn chữ "Bài 35", "Bài 36", "Thang nhiệt độ Celsius" trong phần KHTN.
- Câu và `id` không đổi: script nhỏ so `items` của KHTN trước và sau (cùng số câu, cùng `l`, cùng `q`, trừ câu cố ý sửa ghi trong Pull Request).
- `tests/e2e.js` in `E2E OK` (bước "lesson pages l4, l6").
- `docs/TINH-NANG.md`, `docs/KE-HOACH-NOI-DUNG.md` nếu có ghi số bài KHTN 6 theo sách cũ thì sửa theo.

### Phiên 9m

**L37 · Ngữ văn 6 theo sách in năm 2026.** Chỉ sửa phần Ngữ văn của `modules/l6-giua-ki-1/index.html`, các đề `van6-ck1-*` trong `data/banks/6-van.js`, `tests/` và tài liệu.
- Mở bản PDF Ngữ văn 6 tập một: link ở bảng “Sách và link của từng phiên”, cách mở ở đoạn “Sách” ngay trên bảng (mục 4 của `docs/KE-HOACH-NOI-DUNG.md`). Xem trang cuối (năm in 2026), đọc «Tia nắng hạt mưa» (tr. 27), «Hương và Phai» (tr. 48) và mục lục Bài 4, Bài 5 (tr. 6–7).
- Bài ôn `l6-giua-ki-1`:
  - Ghi nhớ của `v1`, `v2`: thay ý về văn bản cũ bằng ý về văn bản thay thế (tên, tác giả, thể loại, nội dung chính), viết bằng lời của mình.
  - 6 câu về hai văn bản cũ: viết lại thành câu về văn bản thay thế, cùng bài (`l`), cùng dạng câu, cùng số lựa chọn. Câu tự soạn, không chép nguyên văn đoạn dài của sách.
  - Lựa chọn sai là tên tác giả, nhân vật của văn bản cũ: đổi sang tên khác không có trong Bài 1–3.
  - Không đổi `id` của bài, không chèn, xóa hay đổi thứ tự câu trong `items`: kết quả theo bài (`lres`) lưu theo `id` bài, “Ôn câu sai” lưu theo số thứ tự câu trong môn (`wkey`), như Phiên 9l. Không đổi phần Toán, KHTN và ba chỗ nối với app (hợp đồng ở CLAUDE.md).
- `van6-ck1-de2`: viết lại câu 1, câu 9 thành câu về văn bản thay thế, giữ chủ đề (“Tôi và các bạn”, “Gõ cửa trái tim”), dạng câu, `lv` và vị trí trong đề; đổi lựa chọn sai “Tạ Duy Anh”. Ma trận của `van6-ck1-ngau-nhien` không đổi.
- Bài 4, Bài 5: so văn bản trong mục lục sách in năm 2026 với note và câu của `van6-ck1`. Văn bản nào đã thay thì sửa câu theo cách trên; ghi kết quả dò vào Pull Request.
- Không mở được bản PDF: không viết câu về hai văn bản mới. Viết lại các câu đó thành câu về phần không đổi của cùng bài (văn bản 1, 2, Tri thức ngữ văn, Thực hành tiếng Việt, Viết; mục lục ở PR #94), Ghi nhớ bỏ ý về văn bản cũ, và ghi rõ trong Pull Request để chủ app dò lại.
- Câu viết lại có `Quiz.key` mới (khóa tính từ chữ của câu), nên lịch sử của câu cũ trong đề ngẫu nhiên không còn dùng, câu mới được rút như câu chưa làm. Kết quả đã lưu giữ nguyên, không cần chuyển.

**Xong khi:**
- Không còn “Bắt nạt”, “Bức tranh của em gái tôi”, “Nguyễn Thế Hoàng Linh”, “Tạ Duy Anh”, “Kiều Phương” trong phần Ngữ văn của `modules/l6-giua-ki-1/index.html` và trong `data/banks/6-van.js`.
- Câu và `id` của bài ôn không đổi ngoài các câu cố ý sửa: script nhỏ so `items` của Ngữ văn trước và sau (cùng số câu, cùng `l`; chỉ khác `q`, `o` ở các câu ghi trong Pull Request).
- `node tests/kiem-tra-de.js` in `DE OK`, không còn dòng “Nhắc:” về `van6-ck1`; dò lộ đáp án bằng code (Rút ra N5, mục 3 của `docs/KE-HOACH-NOI-DUNG.md`) với các câu mới của Đề 2.
- `tests/e2e.js` in `E2E OK` (bước "lesson pages l4, l6").
- CLAUDE.md, đoạn “Hợp đồng giữa bài ôn và app”: thêm một ý (Phiên 9m, L37) như ý của Phiên 9l. Pull Request ghi trang sách đã đọc cho từng câu mới và kết quả dò Bài 4, Bài 5.

### Phiên 9n

**L38, L39 · Bỏ qua rồi quay lại, bảng số câu: đề ngân hàng.** Chỉ sửa `js/quiz.js`, `css/app.css` (nếu cần), `tests/` và tài liệu. Phiên lớn: làm L38 (bỏ qua, màn “Xem lại bài làm”) trước rồi L39 (bảng số câu).

Flow (chủ app yêu cầu 22/10/2026; Phiên 9o dùng lại cho bài ôn dạng trang). Thiết kế (ảnh 360px, id, class, chữ, và bảy chỗ flow chưa rõ X21–X27, đã chốt vào các ý dưới đây): [CAI-TIEN-UX-2X.md](CAI-TIEN-UX-2X.md), mục 3, “Phiên 9n, 9o”. Mỗi câu của lượt ở một trong bốn trạng thái: chưa làm (chưa mở, hoặc mở rồi rời đi mà chưa trả lời), đã bỏ qua, đã trả lời (làm như thi) hoặc đã Kiểm tra (ôn luyện; câu tự luận là đã Xem gợi ý). “Câu còn trống” là câu chưa làm hoặc đã bỏ qua.
1. **Bỏ qua** như bây giờ: câu thành đã bỏ qua, sang câu sau. Câu đã Kiểm tra thì không còn nút “Bỏ qua” (X8); câu đã trả lời (làm như thi) mở lại cũng không có, vì “Bỏ qua” để trống câu (X23).
2. **Bảng số câu (L39):**
   - `#qzProg` (“Câu 9/25”) ở thanh trên thành nút mở, đóng bảng (`aria-expanded`). Bảng mở ngay dưới thanh trên, không phải hộp nổi.
   - Mỗi câu một ô số, cao ≥ 44px, 5 ô mỗi hàng ở 360px.
   - Ô ghi trạng thái bằng màu token kèm dấu, không chỉ dựa vào màu: câu đang làm có viền đậm; đã trả lời có nền nhạt; đã bỏ qua có dấu “–”; chưa làm để trống; ôn luyện thì câu đã Kiểm tra có ✓ hoặc ✗. Dưới bảng có một dòng chú thích.
   - Bấm ô thì tới câu đó, bảng đóng lại. Ở lượt đầu, “Trả lời”, “Câu tiếp” và “Bỏ qua” vẫn đi tới câu sau theo số câu. Câu mở từ màn “Xem lại bài làm” thì xong câu đó là về lại màn đó, không đi qua các câu sau (X22).
   - Làm như thi: mở lại câu đã trả lời thì thấy câu trả lời cũ và sửa được; bấm “Trả lời” thì ghi câu trả lời mới. Chỉ chấm khi nộp. Rời câu bằng bảng số câu mà lựa chọn đã đủ thì ghi như bấm “Trả lời” (không đi tiếp), chưa đủ thì giữ câu trả lời cũ; nộp bài (cả hết giờ, rời trang) thì ghi lựa chọn đã đủ của câu đang mở trước khi chấm (X23).
   - Ôn luyện: mở lại câu đã Kiểm tra thì chỉ xem lại (câu trả lời, đáp án, lời giải như ngay sau Kiểm tra), không làm lại. Câu còn trống thì làm như thường. Rời câu bằng bảng thì bỏ lựa chọn chưa Kiểm tra.
3. **Màn “Xem lại bài làm”** (`#qzRecap`; không dùng `#qzReview`, id đó là mục “Câu cần xem lại” của màn kết quả, X21) vẫn thuộc lượt đang làm: đồng hồ vẫn chạy, chế độ tập trung giữ nguyên, rời trang vẫn hỏi lại. Bảng số câu hiện sẵn trên màn này; bấm ô nào thì tới câu đó.
   - Hiện khi đi qua câu cuối (bấm nút đi tiếp sau Kiểm tra, “Trả lời” hay “Bỏ qua” ở câu cuối) mà còn câu còn trống. Làm như thi thì hiện cả khi đã làm hết, trước khi nộp. Ôn luyện mà không còn câu trống thì ra kết quả như bây giờ.
   - Ôn luyện, sau Kiểm tra, nút đi tiếp ghi tên màn sẽ tới: “Câu tiếp”, “Xem lại bài làm” hoặc “Xem kết quả”; ở câu cuối không ghi “Xem kết quả” khi màn này sẽ hiện (X25).
   - Còn câu trống: dòng đầu “Bạn còn 3 câu chưa làm.” Nút chính “Làm tiếp 3 câu”. Nút phụ: ôn luyện “Xem kết quả”, làm như thi “Nộp bài”. Bấm nút phụ thì hỏi lại ngay trong trang như X6: “Còn 3 câu chưa làm, sẽ tính là sai.” Chưa trả lời câu nào thì hỏi như bây giờ (“Thoát đề?…”, không lưu điểm; X24).
   - Màn này không có “← Thoát”, nút mở bảng, “Nộp bài” ở hàng trên (làm như thi hàng trên chỉ còn đồng hồ): nút cuối màn là lối ra duy nhất (X24).
   - Làm như thi, đã làm hết: dòng đầu “Bạn đã làm hết 25 câu. Xem lại hoặc nộp bài.” Nút chính “Nộp bài”, không hỏi lại.
4. **Vòng làm tiếp** chỉ gồm các câu còn trống, theo số câu.
   - Câu hiện như lần đầu; câu có đoạn đọc chung thì đoạn đọc hiện lại.
   - Trên thẻ câu có dòng nhỏ “Câu còn trống 2/3”.
   - Câu sau là câu kế tiếp trong danh sách câu còn trống lúc bấm “Làm tiếp”, theo số câu.
   - Bỏ qua lần nữa thì câu vẫn còn trống. Hết vòng thì về màn “Xem lại bài làm”. Không giới hạn số vòng.
5. **Nộp, thoát:** làm như thi, “Nộp bài” ở thanh trên bấm lúc nào cũng được (ở màn “Xem lại bài làm” là nút cuối màn), lời hỏi lại ghi số câu còn trống; hết giờ thì nộp ngay như bây giờ. Ôn luyện: “← Thoát” như bây giờ (câu bỏ qua tính sai, câu chưa làm không tính); “Xem kết quả” ở màn “Xem lại bài làm” tính mọi câu còn trống là sai, đúng như lời hỏi lại (X24).
6. **Chấm và lưu không đổi:**
   - Câu đã trả lời chấm theo câu trả lời cuối cùng; câu còn trống lúc nộp tính như bây giờ (câu chấm tự động tính sai).
   - Lịch sử câu của đề ngẫu nhiên (`opts.onMarks`) ghi theo câu trả lời cuối cùng của mỗi câu.
   - Lượt chưa trả lời câu nào thì như bây giờ (“chưa làm câu nào”, không lưu).
   - Câu tự luận theo cùng flow.
   - Mọi lượt đều như vậy: đề cố định, đề ngẫu nhiên, “Làm lại”, “Ôn lại N câu sai”.
7. **Đề Tiếng Anh và bài ôn IOE:** chữ mới có bản tiếng Anh trong bảng `TXT` (ví dụ “You have 3 questions left.”, “Do the 3 left”, “You have answered all 25 questions. Review or finish the test.”, “See results”, “Finish test”; đủ các khóa ở bảng chữ của mục thiết kế).

**Xong khi:**
- `tests/e2e.js` có bước L38, L39 mới, ở 360px sáng/tối, dùng một đề có đoạn đọc:
  - ôn luyện: bỏ qua 2 câu, đi hết đề thì thấy màn “Xem lại bài làm” ghi còn 2 câu; bảng số câu đúng trạng thái (ô ≥ 44px, có dấu, không chỉ màu); “Làm tiếp” rồi làm đúng một câu thì còn 1 câu; mở lại câu đã Kiểm tra từ bảng thì chỉ xem lại; “Xem kết quả” hỏi lại rồi ra kết quả, câu còn trống tính sai;
  - làm như thi: trả lời một câu, mở lại từ bảng, sửa câu trả lời, nộp: điểm tính theo câu trả lời cuối; đã làm hết vẫn thấy màn “Xem lại bài làm” trước khi nộp; đồng hồ vẫn chạy ở màn này, tua hết giờ thì nộp;
  - rời trang khi đang ở màn “Xem lại bài làm” thì vẫn hỏi lại;
  - đề Tiếng Anh không có chữ cái tiếng Việt (như bước TA2).
- Các bước đang đi hết đề bằng “Bỏ qua” hay “Trả lời” (K3, K4, 9e, TA2, UX5, L29–L31…) đi qua màn mới mà không bỏ kiểm tra nào. `tests/supabase/cloud-e2e.js` cũng vậy.
- `node tests/kiem-tra-de.js`, `tests/e2e.js`, `tests/supabase/store-test.mjs`, `tests/supabase/cloud-e2e.js` đều in OK.
- Có các kiểm tra thêm ở mục thiết kế ([CAI-TIEN-UX-2X.md](CAI-TIEN-UX-2X.md), mục 3, “Phiên 9n, 9o”): hàng trên cùng một hàng ở 360px từ câu 10, X21–X25.
- Ảnh 360px sáng/tối (bảng số câu; màn “Xem lại bài làm” khi còn câu trống và khi đã làm hết) chép sang `docs/hinh-9n/`.
- CLAUDE.md ghi flow mới vào mô tả `Quiz.run` và mục “Làm bài tập trung”.

### Phiên 9o

**L38, L39 · Bỏ qua rồi quay lại, bảng số câu: bài ôn dạng trang.** Làm sau Phiên 9n. Chỉ sửa phần làm bài của `modules/l4-giua-ki-1`, `l6-giua-ki-1`, `ioe-4`, `ioe-6` (`index.html`), `tests/` và tài liệu.
- Cùng flow như Phiên 9n (bảng số câu, màn “Xem lại bài làm”, vòng làm tiếp), ở mọi lượt làm của trang (luyện theo bài, đề thi thử, ôn câu sai). Chữ như 9n (IOE viết tiếng Anh), trình bày theo token của trang. Thiết kế: [CAI-TIEN-UX-2X.md](CAI-TIEN-UX-2X.md), mục 3, “Phiên 9n, 9o” (ảnh `9o-bai-on`).
- Thanh trên của trang ở 360px đã kín (X26): chip “10 / 20” rời thanh trên, xuống hàng đầu của màn làm bài thành nút mở bảng (cạnh thanh tiến độ).
- Ô và chú thích như đề ngân hàng sau Phiên 9nb: mẫu ô ở chú thích có dấu đứng, cùng màu với dấu trong ô (X28); chú thích không ghi mục 0 câu, kể cả “Chưa làm” (X29). Số đo và Figma C5–C8: [CAI-TIEN-UX-2X.md](CAI-TIEN-UX-2X.md), mục 3.
- Bảng số câu và màn “Xem lại bài làm” thuộc lượt đang làm, nên `#endArea` vẫn có `#endBtn` (“Nộp bài sớm”, “Dừng luyện tập”, “Finish test now”…) để app hỏi lại khi rời bài (hợp đồng ở CLAUDE.md). Trên màn “Xem lại bài làm”, `#endBtn` chính là nút “Nộp bài”/“Xem kết quả” của màn (không thêm nút nộp thứ hai), hỏi lại bằng `#yesEnd`, `#noEnd`. Màn kết quả của trang giữ như cũ.
- Bỏ qua vẫn gọi `record(q, null)`, nên câu vào “Ôn câu sai”. Trả lời (cả khi sửa câu trả lời ở đề thi thử) thì `record` theo câu trả lời mới; làm đúng thì câu ra khỏi “Ôn câu sai” (L27).
- `finish()` và `ontapReport` vẫn chỉ gọi một lần, khi ra màn kết quả. Câu nghe của IOE phát lại được; lượt nghe còn lại giữ theo từng câu. Máy không phát được tiếng thì `soundFailed()` thay mọi câu nghe chưa trả lời ở mọi vị trí, không bỏ câu khỏi `S.qs` (`S.ans` ghi theo vị trí; X27).
- Không đổi dữ liệu câu, `id` của bài, thứ tự câu trong `items`, `wkey`, khóa localStorage và ba chỗ nối với app.

**Xong khi:**
- Bước “lesson pages l4, l6” và bước bài ôn IOE của `tests/e2e.js` (360px, chạy trong khung): mỗi bài một lượt luyện tập (bỏ qua 2 câu → màn “Xem lại bài làm” → làm tiếp → kết quả) và một lượt đề thi thử (sửa một câu đã trả lời từ bảng số câu rồi nộp). Kiểm tra thêm:
  - ở bảng số câu và màn “Xem lại bài làm” trang có `#endBtn`, và app hỏi lại khi rời bài;
  - `ontapReport` chỉ gọi một lần;
  - “Ôn câu sai” đúng;
  - IOE không có chữ cái tiếng Việt;
  - thanh trên của trang một hàng ở 360px;
  - chú thích dưới bảng không có mục 0 câu, dấu trong mẫu ô cùng màu với dấu trong ô (X28, X29).
- Script nhỏ so `items` của 4 bài trước và sau khi sửa: không đổi.
- CLAUDE.md, đoạn “Hợp đồng giữa bài ôn và app”, thêm một ý: Phiên 9o, L38, L39, chủ app duyệt 22/10/2026.
- Ảnh 360px sáng/tối chép sang `docs/hinh-9o/`.

### Phiên 9p

**L40, L41 · Bài ôn giữa kì I lớp 4 theo sách in năm 2026.** Chỉ sửa phần dữ liệu của `modules/l4-giua-ki-1/index.html` (khối `/* TOÁN 4 */`, khối `/* TIẾNG VIỆT 4 */`, hai hàm `perim`, `step3` trong `gen`), `tests/` và tài liệu.
- Mở bản PDF Toán 4 tập một và Tiếng Việt 4 tập một: link ở bảng “Sách và link của từng phiên”, cách mở ở đoạn “Sách” ngay trên bảng (mục 4 của `docs/KE-HOACH-NOI-DUNG.md`); cả hai cuốn ảnh page-N là trang in N − 2. Đọc các trang ghi ở L40, L41.
- Toán (L40):
  - Ghi nhớ `b1`: viết lại ý thứ ba cho không hiểu sai được (số liền sau của một số hơn số đó 1 đơn vị; số liền trước kém số đó 1 đơn vị).
  - `b2`: hai câu “Tìm x” và hai ý Ghi nhớ về tìm số hạng, thừa số chưa biết đổi sang nội dung của Bài 2 (tính nhẩm, đặt tính, tính giá trị biểu thức, bài toán có lời trong phạm vi 100 000; phép tính theo Rút ra N23).
  - `b3`: câu đúng/sai về tổng hai số lẻ đổi sang câu trong Bài 3; Ghi nhớ nêu định nghĩa của sách (số chia hết cho 2 là số chẵn…) rồi cách nhận ra bằng chữ số tận cùng.
  - `b5`: câu cố định thành bài toán có đúng ba bước tính, bối cảnh khác bài tập của Bài 2, Bài 5, Bài 6.
  - `b11`, `b12`: Ghi nhớ theo bài của sách: lớp triệu, mười triệu, một trăm triệu ở `b11`; đọc, viết số đến lớp triệu và số 1 000 000 000 (một tỉ) ở `b12`. Câu “Số mười triệu viết là:” đổi thành câu đọc hoặc viết số đến lớp triệu (vẫn `l: "b12"`).
  - 17 câu quá gần sách: soạn lại như Rút ra N23 và “Rút ra khi dò `toan4-ck1`”: điều trong khung kiến thức hỏi qua ví dụ bằng số hoặc tình huống; bài tập của sách thì đổi bối cảnh, không chỉ đổi số. Xem cách PR #108 soạn lại các câu cùng loại.
  - Ghi nhớ chép gần nguyên văn khung (bài 4, 8, 11, 13, 14, 15, 17, 18, 19): viết lại bằng lời của mình, giữ kiến thức (quy tắc đổi đơn vị, công thức chu vi giữ như sách).
  - `perim`: lời dẫn không ghi sẵn công thức chu vi. `step3`: đổi hai bối cảnh gần sách (cửa hàng bán hai buổi; mua hàng, đưa tiền, hỏi tiền trả lại). Đáp án vẫn tính bằng code trong hàm.
- Tiếng Việt (L41):
  - `n4`: thay ý Ghi nhớ “đã, đang, sẽ” bằng một ý của tuần 1–8 (động từ chỉ hoạt động di chuyển, hoặc động từ thể hiện tình cảm, cảm xúc), viết bằng lời của mình. Ba câu “sẽ”, “đã”, “đang” viết lại thành câu về động từ trong phạm vi đó, cùng dạng trắc nghiệm 4 lựa chọn; không dùng câu, đoạn văn, tục ngữ, từ ngữ của bài tập trong sách (tr. 41, 49–50, 57).
  - `writing[0]`: đề, dàn ý, bảng kiểm theo đoạn văn nêu ý kiến về một câu chuyện đã đọc hoặc đã nghe (nói rõ thích hay không thích và lí do; Mở đầu – Triển khai – Kết thúc; tr. 15, 19). Đề tự soạn, khác hai đề tr. 19 (câu chuyện về tình cảm gia đình, về các con vật). Giữ tên mục.
  - `writing[1]`: dàn ý, bảng kiểm theo bố cục ba phần của sách (tr. 29): quốc hiệu, tiêu ngữ, địa điểm và thời gian viết báo cáo; tiêu đề, người nhận, nội dung sắp theo mục, mỗi kết quả một dòng có dấu gạch ngang; chữ kí, họ và tên người viết. Chủ đề khác hai chủ đề của sách (tr. 33, 36).
  - Chỗ nhỏ: Ghi nhớ `n5` nêu công dụng theo sách (nghĩa, từ loại, cách dùng từ qua ví dụ); câu đúng/sai về chính tả đổi thành câu về một công dụng sách nêu. Câu đúng/sai của `n3` hỏi qua một tên cơ quan, tổ chức cụ thể (tên khác các tên trong sách tr. 32). Câu có “Nam Định” (`n2`) đổi sang tên tỉnh, thành phố còn giữ sau năm 2025 (Rút ra N3: Hà Nội, Phú Thọ, Lào Cai, Bắc Ninh, Thái Nguyên…); đáp án vẫn là danh từ riêng của câu.
- Không đổi `id` của bài, không chèn, xóa hay đổi thứ tự câu trong `items`: kết quả theo bài (`lres`) lưu theo `id` bài, “Ôn câu sai” lưu theo số thứ tự câu trong môn (`wkey`), như Phiên 9l, 9m. Giữ 4 mục `writing` đúng thứ tự, bảng kiểm mỗi mục 5 dòng (bản nháp `wdraft_`, ô đã tích `wchk_` lưu theo số thứ tự). Câu sửa giữ bài (`l`), dạng câu, số lựa chọn. Câu tự soạn, không chép nguyên văn sách, không đưa tệp hay ảnh trang sách vào repo. Không sửa ba chỗ nối với app (hợp đồng ở CLAUDE.md), `js/`, `css/`, `data/`.
- Kết quả đã lưu và danh sách “Ôn câu sai” giữ theo `id` bài, số thứ tự câu, nên không cần chuyển dữ liệu.

**Xong khi:**
- Phần dữ liệu của `l4-giua-ki-1` không còn “Tìm x”, “Tổng của hai số lẻ”, “Nam Định”, không còn “đã, đang, sẽ” ở bài `n4`; `writing[0]` là đoạn văn nêu ý kiến về một câu chuyện; dàn ý và bảng kiểm của `writing[1]` có quốc hiệu, tiêu ngữ, người nhận, chữ kí.
- Đáp án Toán mới tính lại bằng code. Script nhỏ so `lessons`, `items`, `writing` của hai môn trước và sau: cùng số câu, cùng `l`, cùng dạng câu; chỉ khác ở các câu, Ghi nhớ, mục Viết ghi trong Pull Request. `node tests/so-du-lieu-bai-on.js` báo `l6-giua-ki-1`, `ioe-4`, `ioe-6` không đổi.
- Dò lộ đáp án bằng code giữa các câu cố định của cùng môn (đề thi thử rút câu từ mọi bài; Rút ra N5).
- `tests/e2e.js` in `E2E OK` (bước “lesson pages l4, l6”: chữ không đè ở 360px, 720px; thêm kiểm tra Ghi nhớ `n4` không còn “đã, đang, sẽ” và dàn ý `writing[1]` có quốc hiệu, như kiểm tra L37 của Phiên 9m).
- CLAUDE.md, đoạn “Hợp đồng giữa bài ôn và app”: thêm một ý (Phiên 9p, L40, L41) như ý của Phiên 9l, 9m. Pull Request ghi trang sách đã đọc cho từng chỗ sửa.

---

## 3. Các phiên Claude Code

Làm theo thứ tự, mỗi phiên một cuộc trò chuyện mới, Merge xong mới mở phiên sau. Chỉ giữ lời giao việc của phiên chưa làm; 9a–9m, TA1, TA2 đã xong (PR #21, #22, #23, #29, #49, #50, #52, #57, #72, #74, #85, #87, #90, #91, #103), lời giao việc cũ còn trong lịch sử git. 9n, 9nb, 9o, 9ob đã xong (PR #119, #122, #123, #132). Chưa có phiên chờ làm. Lỗi mới thì QC ghi mã (tiếp theo L40) ở mục 1, cách sửa ở mục 2 và lời giao việc ở đây. Mục 1, 2 vẫn giữ mô tả lỗi và cách sửa của mọi mã lỗi.
