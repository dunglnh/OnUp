# Kế hoạch phát triển OnUp

> **Trạng thái (18/10/2026):** trang thật https://dunglnh.github.io/OnUp/ chạy **bản đám mây** từ 17/10 (PR #27), đang chạy thử trong gia đình, chỉ dành cho gia đình được mời. Đã xong: khung tài khoản (Phiên A, B, C), sửa lỗi chạy thử (9a–9d), U1, K1, K2, K3 (đề ngẫu nhiên theo ma trận), đề N0a, N0b, đồng bộ tài liệu D0, UI1, S1 (màn đăng nhập cho người mới), R1 (nút “Báo câu này sai”; chủ app chạy `supabase/cap-nhat-r1.sql` sau khi Merge), TA1 (nội dung 3 đề Tiếng Anh 100% tiếng Anh), 9e (sửa L22–L26 sau K3), TA2 (màn làm đề Tiếng Anh bằng tiếng Anh: bảng chữ `TXT` trong js/quiz.js), UX1 (trang “Hôm nay” với thanh tab dưới cho học sinh; màn kết quả có lời khen, so với lần trước, ôn lại câu sai), UX2 (khu phụ huynh gọn lại: Các con · Lịch thi · Cài đặt, thẻ của con mở báo cáo tuần, sửa ngày thi tại chỗ), UX3 (thẻ “Bắt đầu trong 3 bước”, nút “Chọn hồ sơ khác”, mã mở nhanh khu phụ huynh trên máy đã ghi nhớ). Còn chờ bố mẹ thử L17 (sao lưu trên iPhone thật, [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md) mục 2, Phiên 9d). Kho đề: `node tests/kiem-tra-de.js` in số đề, số câu, dạng câu (18/10: 29 đề, 715 câu, 6 đề ngẫu nhiên).
> **Đã chốt 18/10/2026:** bán khi đủ đề lớp 4–12 (theo nhịp 1–2 phiên mỗi tuần: khoảng cuối năm học 2028–2029); đến lúc đó gói Miễn phí giữ như hiện nay (5 hồ sơ, mọi đề; bảng `plans` không đổi), hạn mức hai gói lúc bán chốt sau; các phiên chuẩn bị bán G1, B1, B2, B4 làm ngay trước lúc đó; Supabase giữ gói Free đến khi bắt đầu thu tiền (chủ app xuất CSV hằng tuần, mở app mỗi tuần); trang công khai chỉ dành cho gia đình được mời (màn đăng nhập có dòng “Chưa có tài khoản?”, Phiên S1); câu sai báo bằng nút trong app (Phiên R1), GitHub Issues chỉ còn cho chủ app; không ghi giá bán, chi phí hay so sánh đối thủ vào repo. Thiết kế gói: mục 9 của [THIET-KE-TAI-KHOAN.md](THIET-KE-TAI-KHOAN.md).
> **Quy ước (từ Phiên D0):** chỉ file này ghi trạng thái và lộ trình. CLAUDE.md, README và các tài liệu khác trong docs/ chỉ trỏ sang đây. Làm xong một phiên thì gạch dòng của nó ở mục 3 và ghi số PR; đổi quyết định thì sửa đoạn trên trước.
> **Rà soát toàn app sau K3 (18/10/2026):** app chạy tốt, 35 mục đề làm đúng hết đều được 10/10; lỗi mới L20 (PR #47 của R1 đã sửa), L22–L26 và yêu cầu L21 xếp vào Phiên TA1, 9e, TA2, làm trước UX1 ([SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md), nhóm E). **Chủ app chốt thêm (18/10/2026):** môn Tiếng Anh của mọi khối 100% tiếng Anh, cả lời dặn, lời giải và giao diện làm đề (quy tắc ở [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md) mục 3).
> **Tiếp theo:** Phiên 9f (L27, "Ôn câu sai" trong bài ôn dạng trang; gấp, trước kì thi giữa kì I từ 2/11), rồi UX3. Mục 2 (việc của chủ app) và mục 3 (thứ tự các phiên). Mục 5: nhật ký chạy thử, chủ app tự điền.

## 1. Tình hình hiện tại

**Credit cloud session $100** (hạn 5/11/2026): theo trang Usage ngày 16/10, mục credit không còn hiện và Claude Code đã chiếm 47% mức dùng tuần của gói Pro, nên credit coi như **đã dùng hết**. Từ nay mỗi phiên cloud **trừ vào giới hạn tuần của gói Pro**, dùng chung với phần chat.

**Đã xong** (tất cả đã gộp vào `main`):

| PR | Việc |
|---|---|
| #1 | Phiên 1: 3 đề Toán 4 cuối kì I |
| #3 | Phiên 2: 2 đề Tiếng Việt 4 cuối kì I |
| #5 | Phiên 3: 2 đề Toán 6, 2 đề Ngữ văn 6 cuối kì I |
| #4 | Phiên 4: Khoa học 4, Lịch sử và Địa lí 4, KHTN 6, Lịch sử và Địa lí 6 cuối kì I |
| #6 | Phiên 5: đồng bộ đám mây (Supabase) bản đầu, đăng nhập email và mã gia đình — cách đó đã được **thay bằng Phiên A, B, C** (tên đăng nhập + mật khẩu, hồ sơ con, trang admin) |
| #8 | Phiên 5b: chống máy tự động (CAPTCHA) cho bản đám mây — chỉ chạy khi có khóa |
| #10 | Phiên 8: rà soát đề (56 chỗ sửa), bộ chấm điền khuyết, giao diện 360px |
| #7, #9 | Canh trái nút quay lại; xưng "bạn" trong bài ôn; bỏ 2 bộ mẫu 12 câu |
| #13, #14 | Phiên 10, 11: đề cuối kì I còn thiếu (Tiếng Anh, GDCD, Tin học, Công nghệ 6; Tin học và Công nghệ 4) |
| #15 | Phiên 12: báo cáo tuần cho phụ huynh |
| #16 | Phiên 13: IOE cấp tỉnh lớp 4 |
| #17 | Phiên 14: đề giữa kì II lớp 4 (Toán, Tiếng Việt) |
| #18 | Thiết kế khung tài khoản và trang admin ([THIET-KE-TAI-KHOAN.md](THIET-KE-TAI-KHOAN.md)), chưa làm bản trả phí |
| #19 | Phiên A: máy chủ tài khoản tên đăng nhập + mật khẩu, hồ sơ con, gói, Edge Function `admin` |
| #20, #24 | Lỗi tìm được khi dùng thử ngày 16/10 và sau rà soát 17/10 ([SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md)) |
| #21, #22, #23 | Phiên 9a, 9b, 9c: chốt rời trang, khóa PIN, đường dẫn sai; giao diện 360px; chạy khi mất mạng, nhắc sao lưu |
| #25 | Phiên B: app đăng nhập, “Ai đang học?”, khu phụ huynh, `data/grades.js`, `Store.can` |
| #26 | tests/supabase: không ghi cứng số đề trong `paid_banks` |
| #27 | Điền URL và khóa công khai Supabase vào `js/config.js`: **trang GitHub Pages chạy bản đám mây từ 17/10/2026** |
| #29 | Phiên 9d: lỗi phát sinh sau rà soát 17/10 |
| #30 | Phiên C: trang admin `admin.html` |
| #31 | Kế hoạch nội dung ([KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md)) |
| #32, #34 | Phiên N0a, N0b: đề giữa kì I lớp 6 còn thiếu; Tiếng Anh 4 cuối kì I |
| #33, #35 | Phiên U1: nút xem mật khẩu và mã PIN (lời giao việc #33, code #35) |
| #36 | Phiên K1: tách dữ liệu đề theo khối và môn, bộ kiểm tra đề |
| #37 | Phiên K2: dạng câu hỏi mới |
| #38 | Quyết định của chủ app (bán khi đủ lớp 4–12), lộ trình các phiên tiếp theo |
| #39 | Đề xuất UX/UI 2.x, lời giao việc UI1, UX4–UX8 ([CAI-TIEN-UX-2X.md](CAI-TIEN-UX-2X.md)) |
| #40 | Phiên UI1: tiêu đề line-height 1.35, ô mã trong thẻ nhắc nổi khung |
| #41 | Phiên D0: đồng bộ tài liệu theo quyết định 18/10/2026 |
| #42 | Góp ý chạy thử: lời nhắn gửi phụ huynh ở trang admin xuống dòng sẵn, dán vào Zalo không phải sửa |
| #43 | Phiên S1: màn đăng nhập cho người mới (thẻ “Chưa có tài khoản?” từ `signupText`, `signupUrl`; nhắc dữ liệu cũ chưa chuyển) |
| #46 | Phiên K3: đề ngẫu nhiên theo ma trận (`pool` trong `data/banks/index.js`, `Quiz.draw`); 6 đề ngẫu nhiên gộp từ các đề cố định cùng môn, cùng kì |
| #48 | Rà soát toàn app sau K3: lỗi L20–L26, yêu cầu đề Tiếng Anh 100% tiếng Anh; lời giao việc Phiên TA1, 9e, TA2 ([SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md), nhóm E) |
| #49 | Phiên TA1: 3 đề Tiếng Anh có sẵn và 3 câu Tiếng Anh của đề thử nghiệm viết 100% tiếng Anh (đoạn đọc dùng chung, `lv`); `tests/kiem-tra-de.js` kiểm tra đề Tiếng Anh không có chữ tiếng Việt; `tests/e2e.js` làm 3 đề 10/10 |
| #50 | Phiên 9e: sửa L22–L26 sau K3 (tên đề Tin học và Công nghệ 4 có số đề, `tests/kiem-tra-de.js` kiểm tra quy ước tên đề; `summary` cao ≥ 44px; nhóm "Bài ôn khác" ghi tên kì trên nút đề; "N bài ôn" không đếm đề ngẫu nhiên; tên không xuống dòng ngay trước dấu "·") |
| #53 | Phiên UX1: trang “Hôm nay” của học sinh với thanh tab dưới (Hôm nay · Bài ôn · Lịch thi · Kết quả; thẻ gợi ý bài ôn, chuỗi ngày và mục tiêu tuần, huy hiệu), lịch thi của con chỉ có kì thi, nhãn “Điểm trung bình tháng”, “Đã làm đúng x% bài ôn của kì này”; màn kết quả có lời khen theo điểm, so với lần trước, nút “Ôn lại N câu sai”, câu sai thu gọn; một dòng nhãn trên câu, bàn phím số ở câu điền; hồ sơ mới lấy hình chưa ai dùng; ảnh `docs/hinh-ux1/` |
| #54 | Phiên UX2: khu phụ huynh bản đám mây còn ba mục Các con · Lịch thi · Cài đặt; mỗi con một thẻ (số bài, điểm hôm nay, chuỗi ngày, kì thi gần nhất còn N ngày · chưa ôn môn nào), bấm thẻ mở thẳng báo cáo tuần (link phụ: lịch thi lớp N, bài ôn của con); tab Lịch thi xem và sửa ngày ở một chỗ (“Trường đã báo lịch? Sửa ngày”); Cài đặt gồm hồ sơ con, đề tự soạn (tên mới của Ngân hàng đề), chuyển dữ liệu và sao lưu, tài khoản; quản trị bản lưu trên máy giữ nguyên; ảnh `docs/hinh-ux2/` |
| #56 | Phiên UX3: thẻ “Bắt đầu trong 3 bước” ở mục Các con (thêm hồ sơ con → đặt mã PIN, không bắt buộc → đưa máy cho con; nút to “Cho con học” mở “Ai đang học?”, thẻ ẩn khi một con đã học); “Đổi người học” thành “Chọn hồ sơ khác” ở mọi chỗ; mã mở nhanh 4–6 số của khu phụ huynh trên máy đã ghi nhớ (Cài đặt → Tài khoản; băm, lưu trên máy, không lên máy chủ; ô Phụ huynh ở “Ai đang học?” có bàn phím mã và link “Nhập mật khẩu”; đổi mật khẩu, đăng xuất vẫn cần mật khẩu); ảnh `docs/hinh-ux3/` |
| #52 | Phiên TA2: màn làm đề Tiếng Anh bằng tiếng Anh (bảng chữ hai ngôn ngữ `TXT` trong `js/quiz.js`, `Quiz.lang`, `Quiz.title`; cả phần app bọc ngoài bài ôn IOE; chữ mới trên màn làm đề phải có cả bản tiếng Anh, CLAUDE.md “Quy ước code”); `tests/e2e.js` bước TA2, `cloud-e2e.js` c8e–c8g |

Nội dung hiện có (18/10/2026, `node tests/kiem-tra-de.js`: 29 đề, 715 câu): 4 bài ôn (giữa kì I lớp 4, lớp 6; IOE 4 cấp trường, cấp xã và cấp tỉnh (Phiên 13); IOE 6 cấp xã và cấp thành phố), 19 đề cuối kì I (lớp 6 đủ 8 môn từ Phiên 10: thêm Tiếng Anh, GDCD, Tin học, Công nghệ; lớp 4 thêm Tin học và Công nghệ từ Phiên 11, Tiếng Anh từ Phiên N0b; nhiều môn mới có 1 đề, N1–N6 làm cho đủ), 4 đề giữa kì II lớp 4 (Toán, Tiếng Việt, Phiên 14), 5 đề giữa kì I lớp 6 (Tiếng Anh, Lịch sử và Địa lí, GDCD, Phiên N0a; Tin học, Công nghệ, Phiên N0b) và 1 đề thử nghiệm các dạng câu mới (Phiên K2).

**Chưa làm từ kế hoạch cũ:** Phiên 6 (nhập đề từ Excel). Phiên 7 (báo cáo tuần cho phụ huynh) đã làm ở Phiên 12.

## 2. Việc của chủ app (không tốn lượt Claude)

**Tuần 18–25/10/2026:**
1. **Supabase:**
   - Chạy `supabase/cap-nhat-k2.sql` một lần, nếu chưa chạy (SQL Editor → dán → Run; xem `docs/HUONG-DAN-SUPABASE.md`).
   - Giữ gói Free đến khi bắt đầu thu tiền. Gói này không có sao lưu và dự án tự tạm dừng khi cả tuần không ai dùng, nên:
     - mỗi tuần vào Table Editor xuất CSV các bảng `families`, `profiles`, `results`, `exam_events`, `question_banks`, cất vào Google Drive;
     - dịp nghỉ dài (Tết, hè) vẫn mở app ít nhất mỗi tuần một lần; bị tạm dừng thì vào Supabase bấm Restore.
2. **Liên hệ:** điền `contactText`, `contactUrl` (ví dụ link Zalo) trong `js/config.js`, để người mở trang biết hỏi ai; muốn thẻ “Chưa có tài khoản?” ghi khác (ví dụ "Nhắn Zalo cho cô Lan để được mời") thì điền thêm `signupText`, `signupUrl`. `main` đang được bảo vệ: sửa trên GitHub thì chọn "Create a new branch… and start a pull request", rồi tự Merge.
3. **Ghi chỗ khó dùng** khi các con dùng thật, đến khoảng 25/10. Mỗi chỗ một dòng: ai dùng · màn hình · định làm gì · vướng ở đâu · khó chịu hay không làm được. Phiên UX1–UX8 dùng ghi chép này. Bản rà giao diện ngày 18/10 ([CAI-TIEN-UX-2X.md](CAI-TIEN-UX-2X.md), ảnh 1.x và 2.x đặt cạnh nhau) đã có đề xuất cho từng màn: khi ghi, xem con có vướng đúng những chỗ đó không, và thêm những chỗ khác.
4. **Năm quyết định đã chốt ngày 18/10** (đầu tài liệu) đã được ghi vào CLAUDE.md, README và các tài liệu trong docs/ (Phiên D0). Đổi quyết định nào thì sửa đoạn đầu file này trước, rồi mở một phiên đồng bộ tài liệu như D0.
5. **Theo dõi chạy thử:** vì còn khoảng hai năm rưỡi nữa mới thu tiền, nên đo sớm xem gia đình có thật sự dùng: số gia đình được mời, số lượt làm bài mỗi tuần, gia đình còn dùng sau 4 tuần. Cuối học kì I, hỏi vài gia đình "app có đáng trả tiền không, khoảng bao nhiêu" (câu trả lời cất ở tài liệu riêng, không ghi số tiền vào repo). Ghi vào mục 5 "Nhật ký chạy thử" ở cuối file này.

**Thường xuyên:**
6. Rà đề mới: cho con làm thử; câu sai thì bấm “Báo câu này sai” ngay trong app (Phiên R1). Chủ app xem và xử lí ở trang admin → tab Câu bị báo (bản lưu trên máy: Quản trị → Dữ liệu → Chép để gửi). GitHub Issues chỉ còn cho chủ app.
7. Trường báo lịch chính thức thì sửa ngày trong Khu phụ huynh → Lịch thi.
8. Trước khi chia sẻ trang rộng rãi: bật CAPTCHA (bước 8 của `docs/HUONG-DAN-SUPABASE.md`).
9. Trước khi bán (khoảng năm 2029): lên Supabase Pro, thông báo website với Bộ Công Thương (online.gov.vn), hỏi kế toán về thuế.

## 3. Lộ trình khi làm tiếp

Mỗi dòng là **một phiên Claude Code riêng**: mở claude.ai/code, chọn repo `dunglnh/OnUp`, dán lời giao việc, xem Pull Request rồi Merge. Phiên A, B, C lấy lời giao việc ở mục 8 của [THIET-KE-TAI-KHOAN.md](THIET-KE-TAI-KHOAN.md); Phiên 9a, 9b, 9c (lỗi tìm được khi dùng thử ngày 16/10, đã làm), Phiên 9d (lỗi phát sinh khi rà soát lại ngày 17/10), **Phiên TA1, 9e, TA2** (rà soát sau K3 ngày 18/10: lỗi L20, L22–L26, đề Tiếng Anh 100% tiếng Anh) và **Phiên 9f** (góp ý chạy thử 19/10: L27, ôn câu sai trong bài ôn dạng trang) ở mục 3 của [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md); **các phiên làm đề và kĩ thuật cho đề (N0–N25, K1–K3, chuẩn bị bán B1–B4) ở mục 6, 7 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md)**; các phiên khác ở mục 4 dưới đây. Phiên UI1, UX4–UX8 đến từ bản rà giao diện ngày 18/10: vấn đề (X1–X16), ảnh và điều kiện xong ở [CAI-TIEN-UX-2X.md](CAI-TIEN-UX-2X.md). Thiết kế nằm trong file Figma [OnUp](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=70-2): Master 1.x là 77 màn vẽ lại đúng app ở commit `0a1e8db`; Master 2.x là các đề xuất, kể cả minh họa cho S1, R1, UX1–UX3.

**Làm ngay, chen trước các phiên còn lại** (rà soát sau K3 ngày 18/10, góp ý chạy thử 19/10; lời giao việc ở mục 3 của [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md)):

| Thứ tự | Hạn | Phiên | Cần trước | Ghi chú |
|---|---|---|---|---|
| 5a | 1/11 | ~~TA1 · Đề Tiếng Anh 100% tiếng Anh (nội dung)~~ (đã xong, PR #49) | | 3 đề Tiếng Anh và 3 câu Tiếng Anh của đề thử nghiệm đã 100% tiếng Anh, có `lv`, đoạn đọc dùng chung; `tests/kiem-tra-de.js` báo lỗi khi đề Tiếng Anh có chữ tiếng Việt |
| 5b | 1/11 | ~~9e · Lỗi phát sinh sau K3~~ (đã xong, PR #50) | TA1 (đã xong) | L22–L26 đã sửa; L20 đã sửa trong PR #47 (R1) |
| 5c | 8/11 | ~~TA2 · Màn làm đề Tiếng Anh bằng tiếng Anh~~ (đã xong, PR #52) | TA1, 9e, R1 (đã xong) | bảng chữ `TXT` trong `js/quiz.js`; chữ mới của UX1, UX5 thêm ở cả hai cột vi, en |
| 5d | 1/11 | **9f · "Ôn câu sai" trong bài ôn dạng trang** | | gấp: bài ôn giữa kì I lớp 4, 6 dùng cho kì thi từ 2/11; làm đúng 20/20 mà "Ôn câu sai" vẫn còn câu (L27); chỉ sửa 4 file trong `modules/`, `tests/e2e.js`, CLAUDE.md |

Thứ tự các phiên:

| Thứ tự | Hạn | Phiên | Cần trước | Ghi chú |
|---|---|---|---|---|
| 1 | 25/10 | ~~D0 · Đồng bộ tài liệu~~ (đã xong, PR #41) | quyết định đã chốt 18/10 (đầu tài liệu) | chỉ sửa tài liệu; từ đó trạng thái chỉ ghi ở file này |
| 2 | 25/10 | ~~UI1 · Chỉnh nhỏ chữ và màu~~ (đã xong, PR #40) | | sửa css/app.css, thêm một kiểm tra vào tests/e2e.js; chạy cùng lúc với D0 được |
| 3 | 1/11 | ~~K3 · Rút đề ngẫu nhiên theo ma trận~~ (đã xong, PR #46) | K1, K2 (đã xong) | các phiên làm đề N1 trở đi dùng dạng ngân hàng của K3 ([KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md) mục 3, 7) |
| 4 | 1/11 | ~~S1 · Màn hình đăng nhập cho người mới~~ (đã xong, PR #43) | `contactUrl` đã điền | nhỏ; dùng khi trang công khai chỉ dành cho gia đình được mời |
| 5 | 8/11 | ~~R1 · Nút "Báo câu này sai"~~ (đã xong, PR #47) | K3 (đã xong) | chủ app chạy `supabase/cap-nhat-r1.sql` sau khi Merge |
| 6 | 15/11 | ~~UX1 · Trang "Hôm nay" và màn kết quả của con~~ (đã xong, PR #53) | R1 (đã xong); ghi chép của chủ app chưa có, làm theo lời giao việc và ảnh B1, B2, C1, D1 | thanh tab dưới của học sinh ẩn trong lúc làm bài: UX5 |
| 7 | 22/11 | ~~UX2 · Khu phụ huynh gọn lại~~ (đã xong, PR #54) | UX1 (đã xong); ghi chép của chủ app chưa có, làm theo lời giao việc và ảnh E1, E3, F2 | trang Đề tự soạn chia theo khối, môn, ô tìm: UX7 |
| 8 | 29/11 | ~~UX3 · Bắt đầu và chuyển máy cho con~~ (đã xong, PR #56) | UX2 (đã xong); ghi chép của chủ app chưa có, làm theo lời giao việc và ảnh E2 | tên nút là “Chọn hồ sơ khác”; mã mở nhanh 4–6 số của khu phụ huynh lưu trên máy đã ghi nhớ |
| 9 | 6/12 | **UX4 · Chọn hồ sơ và nhập PIN** | UX3 (đã xong; cùng sửa renderLogin, trang Tài khoản) | ô Phụ huynh có bàn phím mã mở nhanh kèm link “Nhập mật khẩu” (UX3 đã làm trên bàn phím PIN dùng chung) |
| 10 | 13/12 | **UX5 · Làm bài tập trung** | R1, UX1 (cùng sửa js/quiz.js) | xong trước kì thi cuối kì I (từ 21/12) |
| 11 | 15/12 | **N1–N6 · Đủ đề cuối kì I lớp 4 và 6** ([KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md) mục 7) | K3; N5 (Tiếng Anh 6) sau TA1 | chỉ sửa file đề, chen được giữa các phiên UX |
| 12 | 17/1/2027 | **UX6 · Biết bài đã gửi chưa** | UX1, UX5 (cùng sửa màn kết quả) | bản đám mây; làm sau kì thi cuối kì I |
| 13 | 24/1 | **UX7 · Quản lí đề** | UX2 (tab "Đề tự soạn") | |
| 14 | 31/1 | **UX8 · Gửi báo cáo tuần** | UX2 | |
| 15 | 1/3 | **N7–N12 · Giữa kì II lớp 4 và 6** | K3 | |
| 16 | 10/3 | **N-IOE · IOE cấp quốc gia** | | thi 1–2/4/2027 (dự kiến), hiện chưa có bài ôn |
| 17 | 10/4 | **N13–N22 · Cuối năm lớp 4 và 6** | K3 | |
| 18 | hè 2027 | Lịch 2027–2028 (thêm kì thi các khối mới); giữa kì I lớp 4, 6 năm sau (N23–N25); giữa kì I và cuối kì I lớp 5, 7; gộp bài ôn dạng trang vào ngân hàng | | [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md) mục 4, 7 |
| 19 | 2027–2028 | Lớp 5, 7 phần còn lại; lớp 9 (có đề thi thử vào 10); lớp 8 | | khoảng 70 phiên |
| 20 | 2028–2029 | Lớp 12 (đề thi thử tốt nghiệp trước), 10, 11 | | khoảng 90 phiên |
| 21 | trước khi bán | **G1 · Kích hoạt gói, màn hình Nâng cấp, Điều khoản và Quyền riêng tư** → **B1 · Chuyển hosting sang Cloudflare Pages, repo riêng tư** → **B2 · Đề trả phí lên máy chủ** → B4 (bớt tải dữ liệu); lên Supabase Pro | đủ đề lớp 4–12 | lời giao việc ở mục 4; B4 ở [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md) mục 5 |
| — | khi có | **Phiên 9 · Sửa lỗi từ góp ý chạy thử** (GitHub Issues do chủ app ghi từ góp ý của gia đình) | | chen vào bất cứ lúc nào |

Khoảng 35 phiên từ 18/10/2026 đến 10/4/2027 (gồm UX4–UX8 từ bản rà giao diện 18/10 và TA1, 9e, TA2 từ lần rà soát sau K3), trung bình 1–2 phiên mỗi tuần. Cuối tháng 10 và tháng 11 dày nhất: R1, TA1, 9e, TA2, UX1–UX3 và bắt đầu N1–N6. Tháng 12 có UX4, UX5, xong trước kì thi cuối kì I. UX6–UX8 làm sau kì thi, xen với N7–N12. Sau đó việc chính là làm đề cho đủ lớp 4–12 (khoảng 200 phiên); chất lượng đề quyết định có bán được hay không, nên nút báo câu sai (R1) và việc rà đề đi trước.

Lưu ý: đến khi làm B1 (ngay trước khi bán), repo vẫn công khai nên ai cũng tải được trọn bộ đề bằng một lệnh; chủ app đã chấp nhận như vậy (18/10/2026). Nếu sau này muốn giữ đề sớm hơn thì đổi quyết định ở đầu file rồi làm B1 trước (Cloudflare Pages miễn phí, chạy được từ repo riêng tư) mà chưa bật gói; giữ đề thật sự (người chưa trả tiền không tải được) thì cần B2.

Không chạy cùng lúc hai phiên cùng sửa `js/app.js` hoặc `js/quiz.js`; các phiên N chỉ sửa file đề nên chạy xen được.

**Đã xong:**

| | | Phiên | |
|---|---|---|---|
| — | — | ~~Phiên 10 · Đề cuối kì I lớp 6 còn thiếu~~ (đã xong, PR #13) | |
| — | — | ~~Phiên 11 · Đề cuối kì I lớp 4 còn thiếu~~ (đã xong, PR #14) | |
| — | — | ~~Phiên 12 · Báo cáo tuần cho phụ huynh~~ (đã xong, PR #15) | |
| — | — | ~~Phiên 13 · IOE cấp tỉnh lớp 4~~ (đã xong, PR #16) | |
| — | — | ~~Phiên 14 · Đề giữa kì II lớp 4~~ (đã xong, PR #17) | |
| — | — | ~~Phiên A · Máy chủ: tài khoản, hồ sơ con, Edge Function admin~~ (đã xong, PR #19) | |
| — | — | ~~Phiên 9a · Không mất bài, khóa PIN, đường dẫn sai~~ (đã xong, PR #21) | |
| — | — | ~~Phiên 9b · Giao diện điện thoại 360px~~ (đã xong, PR #22) | |
| — | — | ~~Phiên 9c · Chạy khi mất mạng, nhắc sao lưu~~ (đã xong, PR #23) | |
| — | — | ~~Phiên B · App: đăng nhập, chọn hồ sơ, khu phụ huynh, khối lớp chung~~ (đã xong, PR #25) | |
| — | — | ~~Phiên 9d · Lỗi phát sinh sau rà soát 17/10~~ (đã xong, PR #29; bố mẹ thử L17 trên iPhone) | |
| — | — | ~~Phiên C · Trang admin~~ (đã xong, PR #30) | |
| — | — | ~~Phiên U1 · Nút xem mật khẩu và mã PIN~~ (đã xong, PR #35; bố mẹ thử trên iPhone, Android) | |
| — | — | ~~Phiên N0a, N0b · Đề giữa kì I lớp 6 còn thiếu, Tiếng Anh 4 cuối kì I~~ (đã xong, PR #32, #34) | |
| — | — | ~~Phiên K1 · Tách dữ liệu đề, bộ kiểm tra đề~~ (đã xong, PR #36) | |
| — | — | ~~Phiên K2 · Dạng câu hỏi mới~~ (đã xong, PR #37; chủ app chạy `supabase/cap-nhat-k2.sql`) | |
| — | — | ~~Phiên UI1 · Chỉnh nhỏ chữ và màu~~ (đã xong, PR #40) | |
| — | — | ~~Phiên S1 · Màn hình đăng nhập cho người mới~~ (đã xong, PR #43; chủ app điền `signupText`, `signupUrl` nếu muốn) | |
| — | — | ~~Phiên K3 · Rút đề ngẫu nhiên theo ma trận~~ (đã xong, PR #46) | |
| — | — | ~~Phiên R1 · Nút “Báo câu này sai”~~ (đã xong, PR #47; chủ app chạy `supabase/cap-nhat-r1.sql`) | |

**Để sau, chỉ làm khi có nhu cầu thật:** nhập đề từ Excel (Phiên 6 cũ); tự đăng ký, email để tự lấy lại mật khẩu, tài khoản giáo viên/lớp học (mục 7 bản thiết kế); **bản trả phí** (hướng đi ở mục 9 bản thiết kế; việc kĩ thuật cần làm trước ở mục 5 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md)). Đề lớp 5, 7–12 đã có thứ tự và số phiên dự kiến trong [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md). Việc “bắt buộc đổi PIN cũ” không còn cần vì cách đăng nhập mới bỏ kiểm tra PIN ở máy chủ; `pin_hash` của hồ sơ con chỉ là khóa trên giao diện.

**Mẹo tiết kiệm lượt dùng gói Pro:**
- Một phiên một việc, giao việc rõ ràng. Phiên càng dài càng tốn, vì mỗi lượt Claude đọc lại toàn bộ cuộc trò chuyện.
- Chỉ yêu cầu **một vòng** tự rà soát; nhiều vòng rà soát và phiên “điều phối” nhiều trợ lý là phần tốn nhất trước đây.
- Mỗi việc lớn mở một cuộc trò chuyện mới thay vì nói tiếp trong cuộc cũ.
- Xem mức “This week” ở Settings → Usage trước khi mở phiên; giới hạn tuần làm mới mỗi thứ Sáu khoảng 13:00.
- Merge từng Pull Request trước khi mở phiên sửa cùng file.

## 4. Lời giao việc (dán nguyên vào phiên mới)

Phiên K3 và các phiên làm đề N1–N25: lời giao việc ở mục 6, 7 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md). Các phiên dưới đây xếp theo thứ tự ở mục 3.

**Phiên D0 · Đồng bộ tài liệu** (đã xong, PR #41; quyết định đã điền theo lựa chọn của chủ app ngày 18/10/2026)
> Đọc CLAUDE.md, README.md và mọi file trong docs/. Chỉ sửa tài liệu, không sửa code.
>
> Quyết định của chủ app (18/10/2026):
> - Khi nào bán: khi đủ đề lớp 4–12 (theo nhịp 1–2 phiên mỗi tuần: khoảng cuối năm học 2028–2029). Các phiên chuẩn bị bán (G1, B1, B2, B4) làm ngay trước lúc đó.
> - Hạn mức gói: đến khi bán, gói Miễn phí giữ như hiện nay (5 hồ sơ, mọi đề; bảng plans không đổi). Hạn mức gói Miễn phí và gói Gia đình lúc bán sẽ chốt sau.
> - Supabase: giữ gói Free đến khi bắt đầu thu tiền; trước đó chủ app xuất CSV hằng tuần và mở app ít nhất mỗi tuần một lần.
> - Báo câu sai: nút trong app (Phiên R1); GitHub Issues chỉ còn cho chủ app.
> - Trang công khai: chỉ dành cho gia đình được mời; màn đăng nhập có dòng "Chưa có tài khoản?" kèm cách liên hệ (Phiên S1).
>
> Việc cần làm:
> 1. Ghi các quyết định vào đúng chỗ: CLAUDE.md mục "Việc tiếp theo", THIET-KE-TAI-KHOAN (đoạn "Phạm vi bây giờ" và mục 9), KE-HOACH-NOI-DUNG mục 4, 5, 8 (giai đoạn 5 không còn là chuẩn bị bán vào hè 2027: B1–B4 dời đến trước khi bán, khi đủ đề lớp 4–12; mục 5 bỏ câu "khi đã có đủ đề lớp 4 và 6"), HUONG-DAN-SUPABASE mục "Gói và đề trả phí" (thêm việc xuất CSV hằng tuần khi còn gói Free), README, TINH-NANG mục 5. Ví dụ lệnh SQL trong HUONG-DAN-SUPABASE dùng số giữ chỗ, không ghi giá thật.
> 2. Sửa các chỗ trạng thái cũ:
>    - CLAUDE.md: dòng trạng thái; "Đề cuối kì I: đã đủ các môn" (nhiều môn mới có 1 đề, còn N1–N6); `js/config.js` trong danh sách file đã điền trên main.
>    - README: bỏ "đang tạm dừng"; viết lại phần "Dùng ngay" và "Đồng bộ đám mây" theo quyết định trang công khai.
>    - KE-HOACH-PHAT-TRIEN mục 1: thêm PR #27; Phiên 5 cũ đã được thay bằng Phiên A, B, C.
>    - KE-HOACH-NOI-DUNG mục 1, 2: số đề, số câu, dạng câu, dung lượng lấy từ `node tests/kiem-tra-de.js`, không chép số cũ.
>    - TINH-NANG: mục 2 (thời gian chờ PIN tăng dần; vai trò ở bản đám mây), mục 5, 6 (đồng bộ đã có; đăng nhập email không làm theo THIET-KE-TAI-KHOAN mục 1), mục 7 (thay bằng một dòng trỏ sang KE-HOACH-PHAT-TRIEN).
>    - THIET-KE-TAI-KHOAN mục 1 và KE-HOACH-PHAT-TRIEN mục 3: "bỏ PIN học sinh trên máy chủ" thành "bỏ kiểm tra PIN ở máy chủ; pin_hash chỉ là khóa trên giao diện".
> 3. Từ nay chỉ KE-HOACH-PHAT-TRIEN ghi trạng thái và lộ trình; tài liệu khác trỏ sang đó. Ghi quy ước này vào CLAUDE.md.
> 4. Thêm mục "Nhật ký chạy thử" vào KE-HOACH-PHAT-TRIEN (số gia đình, lượt làm bài mỗi tuần, góp ý thật), để trống cho chủ app điền.
> 5. Không ghi giá bán, chi phí hay so sánh đối thủ vào repo.
>
> Tự rà soát một vòng: tìm "để trống", "chưa bật", "tạm dừng", "4–12", "đã đủ các môn", "16/10/2026" trong README.md, CLAUDE.md, docs/ và sửa câu không còn đúng. Chạy tests/e2e.js (phải in E2E OK), rồi mở Pull Request.

**Phiên UI1 · Chỉnh nhỏ chữ và màu** (đã xong, PR #40; sửa css/app.css và một kiểm tra trong tests/e2e.js; chạy cùng lúc với D0 được)
> Đọc CLAUDE.md và docs/CAI-TIEN-UX-2X.md (mục 3, Phiên UI1: X15, X16; ảnh docs/hinh-ux-2x/ui1-tieu-de.jpg, ui1-o-ma.jpg). Trong css/app.css:
> - X15: h1, h2, h3 dùng line-height 1.35 cho cả màn hình, giữ text-wrap: balance. Dòng line-height trong @media print thành thừa thì bỏ, giữ break-after.
> - X16: thêm `.remind .code{background:var(--surface)}`, để tên đăng nhập và mật khẩu tạm trong thẻ nhắc của trang admin nổi khung.
>
> Thêm vào tests/e2e.js một kiểm tra: line-height của h1 ≥ 1,3 lần cỡ chữ. Chạy tests/e2e.js và tests/supabase/cloud-e2e.js đến khi in OK. Xem lại ảnh 360px sáng/tối trong tests/screenshots/360/ và ảnh admin-da-tao, chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh trước và sau.

**Phiên S1 · Màn hình đăng nhập cho người mới** (đã xong, PR #43)
> Đọc CLAUDE.md. Bản đám mây, màn hình đăng nhập (renderCloudLogin):
> - Thêm dòng "Chưa có tài khoản?" kèm chữ và link liên hệ. Thêm hai khóa tùy chọn `signupText`, `signupUrl` vào js/config.js; để trống thì dùng `contactText`, `contactUrl`.
> - Trình duyệt còn dữ liệu của bản lưu trên máy (`Store.localData()` có học sinh) mà chưa chuyển (`Store.migratedAt()` trống): hiện thẻ ngắn "Máy này còn dữ liệu ôn tập cũ. Đăng nhập tài khoản gia đình, rồi vào Khu phụ huynh → Dữ liệu → Chuyển dữ liệu máy này lên đám mây." Đã chuyển thì không hiện.
> - Sửa bước chờ service worker trong tests/supabase/cloud-e2e.js: thỉnh thoảng hết 30 giây vì trang chưa được service worker điều khiển; nếu chưa có controller thì tải lại trang một lần rồi chờ.
> - **Thiết kế tham khảo:** docs/hinh-ux-2x/s1-dang-nhap.jpg (A1) và mục 2 của docs/CAI-TIEN-UX-2X.md: thẻ nhắc dữ liệu cũ trên form, thẻ "Chưa có tài khoản?" dưới form.
>
> Thêm kiểm tra vào cloud-e2e.js, chụp ảnh 360px sáng/tối màn đăng nhập. Chạy tests/e2e.js và tests/supabase/cloud-e2e.js đến khi in OK (cloud-e2e chạy 3 lần liền đều OK), chỉ tự rà soát một vòng, rồi mở Pull Request.

**Phiên R1 · Nút "Báo câu này sai"** (đã xong, PR #47)
> Đọc CLAUDE.md. Sau khi K3 đã gộp.
> - **Giao diện:** nút nhỏ "Báo câu này sai" ở phần lời giải khi ôn luyện và ở từng câu trong màn kết quả. Bấm thì mở ô chọn lí do (Đáp án sai · Câu hỏi khó hiểu · Lỗi chính tả · Khác) và ô ghi chú ngắn (tối đa 200 kí tự), gửi xong hiện lời cảm ơn. Vùng bấm ≥ 44px.
> - **Nhận diện câu:** mã đề cộng mã câu ổn định (dùng mã câu sẵn có nếu K1–K3 đã thêm; không thì băm nội dung câu), lưu kèm bản chụp nội dung câu (tối đa 500 kí tự) để sau khi sửa đề vẫn biết câu nào bị báo.
> - **Bản đám mây:**
>   - Bảng mới `question_reports`: family_id, profile_id, bank_id, q_key, q_text, reason, note, status (`new` | `fixed` | `rejected`), created_at.
>   - RLS: gia đình chỉ thêm và đọc báo cáo của mình; chủ app đọc tất cả và đổi status. Trigger giới hạn 30 báo cáo mỗi ngày mỗi gia đình.
>   - Thêm vào supabase/schema.sql; viết `supabase/cap-nhat-r1.sql` cho project đã cài (như cap-nhat-k2.sql); cập nhật tests/supabase/rls-test.sql và fake-backend.js; ghi bước chạy vào docs/HUONG-DAN-SUPABASE.md.
> - **Trang admin:** tab "Câu bị báo": mới nhất trước, lọc theo đề, đếm số lần mỗi câu bị báo, nút "Đã sửa" / "Bỏ qua".
> - **Bản lưu trên máy:** lưu trong Store (trường mới, mặc định rỗng khi đọc dữ liệu cũ); Quản trị → Dữ liệu hiện danh sách và nút "Chép để gửi" (văn bản gọn để dán vào Zalo).
> - **Thiết kế tham khảo:** docs/hinh-ux-2x/r1-ux5-bao-sai-mo-de.jpg (C3) và ux5-lam-bai.jpg (C2): link nhỏ có lá cờ dưới lời giải; ô chọn lí do mở ngay dưới lời giải theo kiểu .confirm, không dùng hộp nổi.
>
> Chạy tests/e2e.js, tests/supabase/admin-test.mjs, store-test.mjs, cloud-e2e.js và sh tests/supabase/run.sh đến khi in OK, chỉ tự rà soát một vòng, rồi mở Pull Request. Ghi trong Pull Request việc chủ app cần làm sau khi Merge (chạy cap-nhat-r1.sql).

**Phiên UX1 · Trang "Hôm nay" và màn kết quả của con** (đã xong, PR #53; ghi chép của chủ app chưa có, làm theo lời giao việc và ảnh)
> Đọc CLAUDE.md và ghi chép của bố mẹ dưới đây. Sửa cho cả hai bản (lưu trên máy và đám mây):
> - **Thẻ "Hôm nay"** trên cùng trang chủ học sinh: 1–2 bài gợi ý (kì thi gần nhất có bài ôn; môn chưa làm trong 7 ngày; chủ đề hay sai), nút Bắt đầu to, chuỗi ngày ôn và mục tiêu tuần (ví dụ 5 ngày).
> - **Trang chủ gọn lại:** chia tab dưới màn hình (Hôm nay · Bài ôn · Lịch thi · Kết quả), hoặc thu gọn tương đương. Lịch thi của con chỉ có kì thi (bỏ mốc năm học); mỗi kì một nhãn "Còn N ngày".
> - **Màn kết quả:** điểm kèm lời khen hoặc động viên theo mức điểm; so với lần trước cùng đề; nút "Ôn lại câu sai" (chỉ làm lại các câu sai); danh sách câu sai thu gọn, bấm mới xem lời giải.
> - **Màn làm bài:** chỉ một dòng nhãn trên câu thay cho ba; câu điền mà mọi đáp án là số thì mở bàn phím số.
> - **Hồ sơ mới** tự lấy hình đại diện chưa có ai dùng.
> - **Nhãn dễ hiểu:** "Sẵn sàng x%" thành "Đã làm đúng x% bài ôn của kì này"; "điểm TB 30 ngày (/10)" thành "Điểm trung bình tháng".
> - **Phần thưởng nhẹ:** huy hiệu khi đạt chuỗi 3, 7, 14 ngày ôn và khi làm hết đề của một kì. Không có bảng xếp hạng công khai.
> - **Thiết kế tham khảo:** docs/hinh-ux-2x/ux1-trang-chinh.jpg (B1, B2), ux1-ux6-ket-qua.jpg (D1), ux5-lam-bai.jpg (C1, một dòng nhãn) và mục 2 của docs/CAI-TIEN-UX-2X.md. Ghi chép của bố mẹ đi trước nếu khác ảnh.
> - **Đề Tiếng Anh:** chữ mới trên màn làm bài và màn kết quả (lời khen, "Ôn lại câu sai"…) có cả bản tiếng Anh trong bảng chữ của js/quiz.js (Phiên TA2).
>
> Giữ vùng bấm ≥ 44px, chữ ≥ 13px, chế độ tối. Thêm kiểm tra vào tests/e2e.js và tests/supabase/cloud-e2e.js, chụp ảnh 360px sáng/tối trang chủ học sinh và màn kết quả, chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh.
>
> Ghi chép của bố mẹ: […]

**Phiên UX2 · Khu phụ huynh gọn lại** (đã xong, PR #54; ghi chép của chủ app chưa có, làm theo lời giao việc và ảnh)
> Đọc CLAUDE.md và ghi chép của bố mẹ dưới đây. Bản đám mây, Khu phụ huynh:
> - Còn ba mục: **Các con** (mặc định) · **Lịch thi** (xem và sửa ngày ở cùng một chỗ; kì thi dự kiến có nút "Trường đã báo lịch? Sửa ngày") · **Cài đặt** (hồ sơ con, đề tự soạn (đổi tên từ "Ngân hàng đề"), chuyển dữ liệu và sao lưu, tài khoản). Không còn hai nút cùng tên "Lịch thi" làm hai việc khác nhau.
> - **Các con:** mỗi con một thẻ: hôm nay (số bài, điểm), chuỗi ngày, môn chưa ôn cho kì gần nhất. Chỉ hiện kì thi của các khối con đang học. Bỏ các ô số liệu trùng ý.
> - Bấm vào con thì mở thẳng phần báo cáo (tuần này, chủ đề hay sai, gợi ý, bài đã làm); lịch thi và danh sách bài của con thành link phụ.
> - Bản lưu trên máy: màn hình quản trị của thầy cô giữ nguyên; phụ huynh dùng phần "Các con" như trên.
> - **Thiết kế tham khảo:** docs/hinh-ux-2x/ux2-ux3-khu-phu-huynh.jpg (E1), ux2-lich-thi.jpg (E3), ux7-de-tu-soan.jpg (F2, tab "Đề tự soạn") và mục 2 của docs/CAI-TIEN-UX-2X.md.
>
> Thêm kiểm tra, ảnh 360px sáng/tối, chạy tests/e2e.js và tests/supabase/cloud-e2e.js, chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh.
>
> Ghi chép của bố mẹ: […]

**Phiên UX3 · Bắt đầu và chuyển máy cho con** (đã xong, PR #56; ghi chép của chủ app chưa có, làm theo lời giao việc và ảnh E2)
> Đọc CLAUDE.md và ghi chép của bố mẹ dưới đây. Bản đám mây:
> - Thẻ "Bắt đầu" 3 bước trên mục Các con, hiện đến khi làm xong: thêm hồ sơ con → đặt PIN (không bắt buộc) → đưa máy cho con. Có nút to "Cho con học" mở màn hình "Ai đang học?".
> - Đổi chữ "Đổi người học" thành một tên dễ hiểu, dùng thống nhất mọi chỗ.
> - Trên máy đã ghi nhớ, bố mẹ có thể đặt mã 4–6 số để mở nhanh khu phụ huynh (băm và lưu trên chính máy đó; quên thì nhập mật khẩu). Đổi mật khẩu và đăng xuất vẫn cần mật khẩu.
> - Không thêm màn hỏi "Đây là máy của nhà mình?" sau lần đăng nhập đầu (chủ app bỏ, 18/10/2026). Màn đăng nhập giữ ô "Ghi nhớ trên máy này" và dòng giải thích như hiện nay.
> - **Thiết kế tham khảo:** docs/hinh-ux-2x/ux2-ux3-khu-phu-huynh.jpg (E2) và mục 2 của docs/CAI-TIEN-UX-2X.md. Tên gợi ý thay cho "Đổi người học": "Chọn hồ sơ khác".
>
> Thêm kiểm tra, ảnh 360px sáng/tối, chạy tests/e2e.js và tests/supabase/cloud-e2e.js, chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh.
>
> Ghi chép của bố mẹ: […]

**Phiên UX4 · Chọn hồ sơ và nhập PIN** (sau UX3)
> Đọc CLAUDE.md và docs/CAI-TIEN-UX-2X.md (mục 3, Phiên UX4: X1–X4; ảnh docs/hinh-ux-2x/ux4-nhap-pin.jpg, ux4-phu-huynh-hinh-dai-dien.jpg). Sửa trong js/app.js và css/app.css, cho cả bản lưu trên máy và bản đám mây:
> - X1: chạm hồ sơ có PIN thì sang một bước nhập riêng, gồm:
>   - link "← Chọn hồ sơ khác";
>   - hình to, tên, lớp;
>   - hàng chấm, nút "Hiện số", bàn phím ngay dưới.
>
>   Ô Phụ huynh của bản đám mây cũng là một bước riêng, gồm:
>   - ô mật khẩu;
>   - nút "Vào khu phụ huynh";
>   - dòng "Quên mật khẩu?";
>   - nếu UX3 đã thêm mã mở nhanh thì có bàn phím của mã đó, kèm link "Nhập mật khẩu".
>
>   Hồ sơ không có PIN thì chạm là vào, như cũ.
> - X2: số đã gõ chỉ hiện ở hàng chấm.
>   - Giữ #pinIn cho bàn phím máy tính và trình đọc màn hình, nhưng ẩn khỏi mắt. Không dùng display:none, vì các bộ kiểm thử gõ PIN bằng page.fill.
>   - Nút xem thành nút chữ "Hiện số", vẫn đi qua wireReveal/conceal.
>   - Sửa revealTry trong tests/e2e.js và cloud-e2e.js cho ô PIN, và ghi ngoại lệ này vào quy ước "nút xem" của CLAUDE.md.
> - X3: lỗi và đếm ngược nằm ngay dưới hàng chấm. Đang phải đợi thì bàn phím, nút Vào, nút Hiện số chuyển sang disabled; hết giờ thì tự bật lại.
> - X4: chạm hình đại diện là lưu ngay: bỏ nút Lưu, hiện toast "Đã đổi hình đại diện". Bản lưu trên máy giữ form đổi PIN, với nút riêng.
>
> Giữ nguyên PinLock, lượt thử lặng lẽ và việc tự vào khi gõ đủ pinLen. Mỗi vấn đề một commit ghi mã (X1…). Thêm các bước ở mục "Xong khi" vào tests/e2e.js và tests/supabase/cloud-e2e.js, chạy đến khi in OK. Chụp ảnh 360px sáng/tối, chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh.

**Phiên UX5 · Làm bài tập trung** (sau R1 và UX1; xong trước kì thi cuối kì I, từ 21/12)
> Đọc CLAUDE.md và docs/CAI-TIEN-UX-2X.md (mục 3, Phiên UX5: X5–X9; ảnh docs/hinh-ux-2x/ux5-lam-bai.jpg, r1-ux5-bao-sai-mo-de.jpg). Sửa trong js/quiz.js, js/app.js, css/app.css, cho cả hai bản:
> - X5: trong lúc làm đề ngân hàng, thanh trên chỉ còn chữ OnUp: ẩn "Lịch thi", hình đại diện, và cả thanh tab dưới nếu có. Chốt rời trang giữ nguyên. Trang kết quả hiện lại đủ: js/quiz.js thêm một callback báo lượt làm đã xong, gọi ở mọi nhánh của finish().
> - X6: làm như thi thì nút trên cùng là "Nộp bài" thay cho "← Thoát", và vẫn hỏi lại như cũ. Ôn luyện giữ "← Thoát".
> - X7: đồng hồ ghi "Còn 12:30", có biểu tượng và aria-label "Thời gian còn lại". Tiến độ ghi "Câu 9/25".
> - X8: sau khi Kiểm tra thì ẩn hẳn nút "Bỏ qua".
> - X9: màn mở đề có:
>   - thẻ "Lần trước": kết quả gần nhất của đề này, lọc bằng graded();
>   - hai thẻ chọn cách làm, mỗi thẻ một dòng giải thích.
>
> Chữ mới ("Nộp bài", "Còn 12:30", "Câu 9/25", thẻ "Lần trước"…) có cả bản tiếng Anh trong bảng chữ của js/quiz.js (đề Tiếng Anh, Phiên TA2). Không đổi cách chấm và cách lưu điểm. Mỗi vấn đề một commit ghi mã. Thêm các bước ở mục "Xong khi" vào tests/e2e.js. Chạy tests/e2e.js và tests/supabase/cloud-e2e.js đến khi in OK, chụp ảnh 360px sáng/tối, chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh.

**Phiên UX6 · Biết bài đã gửi chưa** (bản đám mây; sau UX5)
> Đọc CLAUDE.md và docs/CAI-TIEN-UX-2X.md (mục 3, Phiên UX6: X10; ảnh docs/hinh-ux-2x/ux1-ux6-ket-qua.jpg).
> - Thêm Store.pendingResults(userId?) và Store.sendPending() ở cả hai kho:
>   - LocalStore trả 0 và Promise.resolve();
>   - SupabaseStore đếm các kết quả trong hộp gửi ontap_cloud_outbox của các hồ sơ thuộc tài khoản và gửi lại bằng sendOutbox.
>   - Chỉ gọi changed() khi số bài chưa gửi thay đổi, vì Store.onChange vẽ lại cả trang.
> - Màn kết quả đề và toast của bài ôn trong khung ghi rõ một trong hai câu: "Đã lưu và gửi cho bố mẹ." hoặc "Đã lưu trên máy này. Sẽ gửi cho bố mẹ khi có mạng." js/quiz.js thêm một chỗ trống để app điền câu này.
> - Đề Tiếng Anh và bài ôn IOE: hai câu đó có bản tiếng Anh ("Saved and sent to your parents.", "Saved on this device. It will be sent to your parents when you're online.") trong bảng chữ của js/quiz.js (Phiên TA2).
> - Còn bài chưa gửi thì trang chính của con, và Khu phụ huynh trên cùng máy, có dòng "N bài chưa gửi … · Gửi lại": nền sun-soft, chữ ink, cao ≥ 44px.
> - Bản lưu trên máy không đổi.
>
> Thêm kiểm tra vào tests/supabase/store-test.mjs và cloud-e2e.js theo mục "Xong khi". Vì cloud-e2e.js đi qua máy chủ giả chứ không qua mạng, thêm vào fake-backend.js một công tắc làm lượt gửi lỗi: bật công tắc rồi làm một đề, tắt công tắc rồi bấm Gửi lại. Chạy tests/e2e.js, tests/supabase/admin-test.mjs, store-test.mjs, cloud-e2e.js đến khi in OK. Chụp ảnh 360px sáng/tối, chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh.

**Phiên UX7 · Quản lí đề** (sau UX2)
> Đọc CLAUDE.md và docs/CAI-TIEN-UX-2X.md (mục 3, Phiên UX7: X11–X13; ảnh docs/hinh-ux-2x/ux7-chon-de.jpg, ux7-de-tu-soan.jpg). Sửa trong js/app.js, js/quiz.js, css/app.css, cho cả hai bản:
> - X11: màn Sửa kì thi gộp bài ôn và đề thành một khối "Bài ôn và đề cho kì này", có nhãn "N đã chọn".
>   - Mặc định chỉ hiện đề đúng khối của kì thi, nhóm theo môn bằng <details>.
>   - Có ô tìm không phân biệt dấu, khớp theo từng từ, và link "Hiện cả đề của khối khác".
>   - Không làm mất lựa chọn cũ.
> - X12: danh sách đề:
>   - đề tự soạn lên đầu, ghi kì thi đã gắn;
>   - đề có sẵn chọn theo khối (gradeList()), nhóm theo môn, có ô tìm.
> - X13: nhập đề:
>   - sau "Kiểm tra", xem trước từng câu, kèm đáp án được chấm đúng;
>   - lỗi gắn vào câu hoặc đoạn đọc: Quiz.parse trả thêm mảng issues (số câu, câu có bị bỏ hẳn không), giữ errors dạng chữ;
>   - có lỗi mà bấm Lưu thì hỏi lại, nói rõ bao nhiêu câu sẽ không được lưu;
>   - thêm ô "Gắn vào kì thi".
>
> Mỗi vấn đề một commit ghi mã. Thêm các bước ở mục "Xong khi" vào tests/e2e.js và tests/supabase/cloud-e2e.js, chạy đến khi in OK. Vì sửa js/quiz.js nên chạy thêm node tests/kiem-tra-de.js. Chụp ảnh 360px sáng/tối, chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh.

**Phiên UX8 · Gửi báo cáo tuần** (sau UX2)
> Đọc CLAUDE.md và docs/CAI-TIEN-UX-2X.md (mục 3, Phiên UX8: X14; ảnh docs/hinh-ux-2x/ux8-bao-cao-tuan.jpg). Trong renderReport (js/app.js), cho cả hai bản:
> - Nút chính "Gửi báo cáo", nút phụ "In".
> - Khối "Tin nhắn sẽ gửi" xem trước một tin nhắn chữ thuần, gồm:
>   - tên con, khoảng ngày;
>   - số bài, số ngày ôn, số phút;
>   - điểm trung bình, so với tuần trước;
>   - tối đa 3 chủ đề hay sai;
>   - kì thi gần nhất;
>   - 1–2 gợi ý, không lặp lại dòng kì thi;
>   - dòng cuối "Gửi từ OnUp."
> - Gửi bằng navigator.share({ title, text }) khi máy có; người dùng hủy thì thôi. Máy không có thì chép vào clipboard và báo "Đã chép tin nhắn…". Có thêm nút "Chép tin nhắn".
> - Tin nhắn không có tên đăng nhập hay đường dẫn vào tài khoản. Khối xem trước không in ra.
>
> Thêm các bước ở mục "Xong khi" vào tests/e2e.js và tests/supabase/cloud-e2e.js, chạy đến khi in OK. Chụp ảnh 360px sáng/tối, chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh.

**Phiên G1 · Kích hoạt gói, màn hình Nâng cấp, Điều khoản và Quyền riêng tư** (làm trước khi bán, khi đủ đề lớp 4–12)
> Đọc CLAUDE.md, mục 9 của docs/THIET-KE-TAI-KHOAN.md và mục 5 của docs/KE-HOACH-NOI-DUNG.md. Hạn mức gói Miễn phí và gói Gia đình lúc bán: […] (chủ app điền trước khi dán).
> - **Trang admin**, phần xem nhanh tài khoản: khối "Gói" (gói hiện tại, hạn, lịch sử từ plan_log) và nút "Kích hoạt gói" (chọn gói, hạn mặc định 31/8 của năm học, số tiền, ghi chú) gọi thao tác set_plan có sẵn.
> - **App, Khu phụ huynh:** màn hình "Nâng cấp" gồm quyền lợi theo bảng plans; giá đọc từ plans, không viết cứng trong code; ảnh QR chuyển khoản do chủ app đặt vào repo, cùng số tài khoản, tên người nhận, nội dung "ONUP <tên đăng nhập>" lấy từ js/config.js; nút nhắn Zalo soạn sẵn tin. Hiện hạn gói và nhắc trước 14 ngày. Không gọi dịch vụ bên ngoài để tạo QR.
> - **Hạn mức:** Store.can và bảng plans theo hạn mức ở trên. Gia đình đã dùng từ trước: […] (chủ app điền, ví dụ giữ quyền lợi cũ đến hết năm học). Cập nhật supabase/schema.sql, viết supabase/cap-nhat-g1.sql nếu đổi dữ liệu plans.
> - **Trang tĩnh** dieu-khoan.html và quyen-rieng-tu.html: nội dung khung theo Luật Bảo vệ dữ liệu cá nhân 2025 (app chỉ thu tên hiển thị, khối, lớp; phụ huynh tạo hồ sơ con), để chủ app sửa. Có link ở màn đăng nhập và Khu phụ huynh.
>
> Chạy đủ các bộ kiểm thử (e2e, admin-test, store-test, cloud-e2e, run.sh), chỉ tự rà soát một vòng, rồi mở Pull Request ghi việc chủ app cần làm sau khi Merge.

**Phiên B1 · Chuyển hosting sang Cloudflare Pages, repo riêng tư** (làm trước khi bán)
> Đọc CLAUDE.md và mục 5 của docs/KE-HOACH-NOI-DUNG.md. Viết docs/HUONG-DAN-CLOUDFLARE.md từng bước cho chủ app:
> 1. Tạo Cloudflare Pages từ repo (không có bước build, thư mục gốc).
> 2. Gắn tên miền riêng.
> 3. Chuyển repo OnUp sang riêng tư.
> 4. Tạo một repo công khai nhỏ cùng tên đường dẫn cũ, chỉ có trang báo "OnUp đã chuyển sang <địa chỉ mới>" và tự chuyển hướng, để gia đình mở địa chỉ cũ vẫn tìm được. Trang này gỡ service worker cũ trên máy học sinh.
>
> Kiểm tra trong code: mọi đường dẫn đều tương đối; phạm vi của sw.js, start_url của manifest, admin.html chạy đúng ở tên miền mới; Supabase không cần đổi gì (nếu cần thì ghi rõ). Sửa mục "Triển khai" của CLAUDE.md. Chạy tests/e2e.js và tests/supabase/cloud-e2e.js, chỉ tự rà soát một vòng, rồi mở Pull Request.

**Phiên B2 · Đề trả phí lên máy chủ** (làm trước khi bán, sau B1)
> Đọc CLAUDE.md, mục 9 của docs/THIET-KE-TAI-KHOAN.md và mục 5 của docs/KE-HOACH-NOI-DUNG.md. Sau khi B1 đã gộp và repo đã riêng tư.
> - Đề thử (cờ free_trial: đề số 1 mỗi môn mỗi kì, hoặc theo hạn mức chốt lúc bán) và bài ôn dạng trang vẫn là file tĩnh trong data/ và modules/. Câu hỏi của các đề còn lại chỉ nằm trong bảng paid_banks (supabase/banks-to-sql.js sinh SQL, chủ app chạy).
> - Danh mục đề (tên, số câu) vẫn công khai để vẽ danh sách và nút Nâng cấp. Câu hỏi đề trả phí tải từ paid_banks khi mở (RLS theo gói, Store.can("bank:<mã>")), lưu lại trên máy cho lần sau, mất mạng vẫn làm được đề đã tải.
> - Bản lưu trên máy chỉ có đề thử.
> - Gỡ câu hỏi đề trả phí khỏi data/; tests/kiem-tra-de.js kiểm cả SQL sinh ra.
>
> Chạy đủ các bộ kiểm thử, chỉ tự rà soát một vòng, rồi mở Pull Request ghi việc chủ app cần làm.

**Phiên N-IOE · IOE cấp quốc gia**
> Đọc CLAUDE.md, giữ nguyên ba chỗ nối của bài ôn với app và nút #endBtn khi đang làm một lượt. Trong modules/ioe-4/index.html và modules/ioe-6/index.html thêm lộ trình "National Level": khó hơn cấp tỉnh, có câu nghe, bắt đầu sau IOE cấp tỉnh (6/3/2027), thi 1–2/4/2027 (dự kiến), cùng cách chia 7 đề mỗi tuần như các lộ trình đang có. Câu tự soạn. Gắn ioe-4, ioe-6 vào kì thi ioe-qg trong data/calendar-2026-2027.js. Chạy tests/e2e.js, chỉ tự rà soát một vòng, rồi mở Pull Request.

**Phiên U1 · Nút xem mật khẩu và mã PIN** (đã xong, PR #35)
> Đọc CLAUDE.md. Thêm nút hình con mắt vào mọi ô mật khẩu và mã PIN (`input type="password"`), bấm để xem mình đã gõ gì, bấm lại để ẩn.
> - **Phạm vi** (12 ô):
>   - bản lưu trên máy: sPin, sPin2 (thiết lập lần đầu), pinIn (bàn phím PIN khi đăng nhập), uPin (form học sinh/phụ huynh), aOld, aNew (trang Tài khoản);
>   - bản đám mây: lPass (đăng nhập), pwOld, pwNew, pwNew2 (đặt và đổi mật khẩu), pwIn (Phụ huynh nhập lại mật khẩu), uPin (PIN hồ sơ con);
>   - admin.html: adPass.
>
>   Ô mật khẩu tạm ở trang admin đã hiện chữ sẵn, không cần thêm.
> - **Cách làm:**
>   - Viết một hàm dùng chung trong js/app.js (ví dụ wireReveal(root)), gọi sau khi vẽ mỗi màn hình có ô mật khẩu. Hàm tự tìm mọi ô type="password" trong màn hình, nên sau này thêm ô mới chỉ cần gọi hàm.
>   - admin.html tự chứa nên có bản riêng, cùng cách làm và cùng lớp CSS trong css/app.css.
> - **Nút:**
>   - `<button type="button">` nằm trong ô, sát cạnh phải; biểu tượng SVG vẽ trong code (mắt / mắt gạch chéo), không tải từ ngoài; màu theo token, rõ ở chế độ tối.
>   - Vùng bấm ≥ 44×44px. Ô thêm khoảng trống bên phải để chữ không chui dưới nút, và vẫn đủ rộng ở 360px.
>   - aria-label "Hiện mật khẩu"/"Ẩn mật khẩu" (ô PIN: "Hiện mã PIN"/"Ẩn mã PIN"), cùng aria-pressed.
> - **Khi bấm:**
>   - Đổi type giữa password và text, giữ nguyên giá trị, vị trí con trỏ, inputmode="numeric" của ô PIN, autocomplete.
>   - Giữ ô đang gõ trong trạng thái focus để bàn phím điện thoại không đóng lại.
>   - Riêng bàn phím PIN: khi hiện thì hàng chấm #pinDots cũng hiện chữ số đã gõ thay cho chấm.
> - **Tự ẩn lại** khi gửi form (đúng hay sai), khi xóa hết ô, và khi chuyển màn hình. Không lưu trạng thái hiện/ẩn ở đâu cả, không ghi giá trị ra console hay localStorage.
> - **Kiểm thử:**
>   - tests/e2e.js (thiết lập, đăng nhập PIN, form học sinh, trang Tài khoản): mỗi ô có nút; bấm thì type="text", aria-pressed="true", giá trị không đổi; bấm lại thì về password; gửi form xong về password; kiểm tra 360px vẫn qua.
>   - tests/supabase/cloud-e2e.js: lPass, pwNew, pwNew2, pwIn, adPass như trên.
>   - Ảnh 360px sáng/tối của màn đăng nhập (cả hai bản) và bàn phím PIN khi đang hiện số.
> - Ghi vào CLAUDE.md (mục Quy ước code): ô mật khẩu mới phải có nút xem.
>
> Chạy tests/e2e.js và tests/supabase/cloud-e2e.js đến khi in OK, chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh.


**Phiên 9 · Sửa lỗi từ góp ý chạy thử**
> Đọc CLAUDE.md. Đọc các GitHub Issue đang mở của repo này (góp ý từ việc chạy thử với học sinh). Sửa từng issue trong một nhánh, mỗi issue một commit có ghi “Fixes #số”. Không thêm tính năng mới ngoài các issue. Chạy tests/e2e.js (và các bài kiểm thử Supabase nếu sửa phần đám mây), chỉ tự rà soát một vòng, rồi mở một Pull Request liệt kê issue đã sửa và issue chưa sửa được kèm lí do.

**Phiên 10 · Đề cuối kì I lớp 6 còn thiếu**
> Đọc CLAUDE.md. Tạo 4 ngân hàng câu hỏi trong data/banks.js cho “Kiểm tra cuối học kì I” lớp 6, mỗi bộ 25 câu, có chủ đề và lời giải: Tiếng Anh 6 Global Success (Unit 1–6; không dùng câu nghe), Giáo dục công dân 6, Tin học 6, Công nghệ 6 (sách Kết nối tri thức, phạm vi học kì I). Câu tự soạn, không chép sách. Gắn cả 4 bộ vào kì thi ck1-l6 trong data/calendar-2026-2027.js. Chạy tests/e2e.js, tự rà soát một vòng, rồi mở Pull Request.

**Phiên 11 · Đề cuối kì I lớp 4 còn thiếu**
> Đọc CLAUDE.md. Tạo 1 ngân hàng 25 câu “Tin học và Công nghệ 4 · Cuối kì I” trong data/banks.js (sách Kết nối tri thức, phạm vi học kì I, chia chủ đề Tin học và Công nghệ), có lời giải, câu tự soạn. Gắn vào kì thi ck1-l4. Chạy tests/e2e.js, tự rà soát một vòng, rồi mở Pull Request.

**Phiên 12 · Báo cáo tuần cho phụ huynh**
> Đọc CLAUDE.md. Thêm vào hồ sơ của con nút “Báo cáo tuần”: trang in được (CSS @media print) tóm tắt 7 ngày qua: số bài, điểm theo môn, chủ đề hay sai, kì thi sắp tới và gợi ý ôn tuần sau. Chạy được ở cả bản lưu trên máy và bản đám mây (chỉ đọc qua Store). Chạy tests/e2e.js và tests/supabase/cloud-e2e.js, rồi mở Pull Request kèm ảnh chụp 360px sáng/tối.

**Phiên 13 · IOE cấp tỉnh lớp 4**
> Đọc CLAUDE.md, giữ nguyên ba chỗ nối của bài ôn với app. Trong modules/ioe-4/index.html thêm lộ trình “Province Level” (Unit 1–10, câu khó hơn cấp xã, có câu nghe), bắt đầu sau IOE cấp xã, thi 4–6/3/2027, cùng cách chia 7 đề mỗi tuần như các lộ trình đang có. Thêm câu mới cho phần nâng cao, câu tự soạn. Gắn bài ioe-4 vào kì thi ioe-tinh trong data/calendar-2026-2027.js. Chạy tests/e2e.js, rồi mở Pull Request.

**Phiên 14 · Đề giữa kì II lớp 4**
> Đọc CLAUDE.md. Tạo 2 đề Toán 4 và 2 đề Tiếng Việt 4 “Kiểm tra giữa học kì II” trong data/banks.js (sách Kết nối tri thức, phạm vi nửa đầu học kì II), mỗi đề 25 câu, có chủ đề và lời giải. Tự tính lại mọi đáp án Toán bằng code. Gắn vào kì thi gk2-l4. Chạy tests/e2e.js, tự rà soát một vòng, rồi mở Pull Request.

**Phiên 15 · Đề giữa kì II lớp 6** (cũ, thay bằng N8–N12 trong [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md))
> Đọc CLAUDE.md. Tạo mỗi môn 1 đề 25 câu “Kiểm tra giữa học kì II” lớp 6 trong data/banks.js: Toán, Ngữ văn, KHTN (Kết nối tri thức), Tiếng Anh (Global Success, Unit 7–9). Có chủ đề và lời giải; tự tính lại đáp án Toán bằng code. Gắn vào kì thi gk2-l6. Chạy tests/e2e.js, tự rà soát một vòng, rồi mở Pull Request.

**Phiên 16–17 · Đề cuối năm** (cũ, thay bằng N13–N22 trong [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md))
> Đọc CLAUDE.md. Tạo đề “Kiểm tra cuối năm học” lớp [4 | 6] trong data/banks.js cho các môn của kì thi [ck2-l4 | ck2-l6] trong data/calendar-2026-2027.js, mỗi môn 1 đề 25 câu, phạm vi cả năm, có chủ đề và lời giải. Gắn vào kì thi đó. Chạy tests/e2e.js, tự rà soát một vòng, rồi mở Pull Request.

---

## 5. Nhật ký chạy thử

Chủ app tự điền, mỗi tuần một dòng, không tốn lượt Claude. Nguồn số liệu: trang admin (số tài khoản, số tài khoản dùng trong 7 ngày, số hồ sơ con theo khối); Supabase → **Table Editor → `results`**, đếm dòng có `at` trong tuần (hoặc đếm từ file CSV xuất hằng tuần). Góp ý ghi nguyên lời của phụ huynh, học sinh; chỗ khó dùng thì chuyển sang ghi chép ở mục 2 (việc 3) để các phiên UX dùng. Không ghi tên thật của trẻ, không ghi số tiền.

| Tuần (từ ngày) | Gia đình được mời | Gia đình có dùng trong tuần | Lượt làm bài trong tuần | Còn dùng sau 4 tuần | Góp ý thật (ai · nói gì) | Đã xử lí (phiên / issue) |
|---|---|---|---|---|---|---|
| 18/10/2026 | | | | | Chủ app dùng thử · đề Tiếng Anh lẫn tiếng Việt; môn Tiếng Anh mọi khối phải 100% tiếng Anh. 19/10, học sinh lớp 6 · bài ôn giữa kì I, Ngữ văn Đề 1 đúng 20/20 mà "Ôn câu sai" vẫn còn 1 câu, làm lại thì app báo đúng | L21 · Phiên TA1, TA2; L27 · Phiên 9f ([SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md)) |
| | | | | | | |
| | | | | | | |

Mốc cần nhìn lại: **cuối học kì I (tháng 1/2027)**, hỏi vài gia đình app có đáng trả tiền không; **cuối năm học 2026–2027**, xem số gia đình còn dùng trước khi làm lớp 5, 7.
