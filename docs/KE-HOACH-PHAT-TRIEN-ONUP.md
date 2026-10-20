# Kế hoạch phát triển OnUp

> **Trạng thái (18/10/2026):** trang thật https://dunglnh.github.io/OnUp/ chạy **bản đám mây** từ 17/10 (PR #27), đang chạy thử trong gia đình, chỉ dành cho gia đình được mời. Đã xong: khung tài khoản (Phiên A, B, C), sửa lỗi chạy thử (9a–9d), U1, K1, K2, K3 (đề ngẫu nhiên theo ma trận), đề N0a, N0b, đồng bộ tài liệu D0, UI1, S1 (màn đăng nhập cho người mới), R1 (nút “Báo câu này sai”; chủ app chạy `supabase/cap-nhat-r1.sql` sau khi Merge), TA1 (nội dung 3 đề Tiếng Anh 100% tiếng Anh), 9e (sửa L22–L26 sau K3), TA2 (màn làm đề Tiếng Anh bằng tiếng Anh: bảng chữ `TXT` trong js/quiz.js), UX1 (trang “Hôm nay” với thanh tab dưới cho học sinh; màn kết quả có lời khen, so với lần trước, ôn lại câu sai), UX2 (khu phụ huynh gọn lại: Các con · Lịch thi · Cài đặt, thẻ của con mở báo cáo tuần, sửa ngày thi tại chỗ), UX3 (thẻ “Bắt đầu trong 3 bước”, nút “Chọn hồ sơ khác”, mã mở nhanh khu phụ huynh trên máy đã ghi nhớ), 9f (sửa L27: bài ôn dạng trang bỏ câu khỏi “Ôn câu sai” khi làm đúng ở bất kì chế độ nào, cả đề thi thử), UX4 (bước nhập PIN riêng `#/vao/<mã>` không cuộn, số chỉ hiện ở hàng chấm với nút “Hiện số”, đếm ngược dưới hàng chấm và bàn phím mờ khi phải đợi, chạm hình đại diện là lưu ngay), UX3b (sửa sau kiểm thử UX3: đăng xuất hỏi mật khẩu, đặt mã PIN từ thẻ Bắt đầu xong về Các con, bước 2 ghi con chưa có mã, chữ ô mã mở nhanh), UX5 (làm bài tập trung: trong lúc làm đề thanh trên chỉ còn chữ OnUp, làm như thi có nút “Nộp bài” và đồng hồ “Còn 12:30”, tiến độ “Câu 9/25”, sau Kiểm tra ẩn hẳn “Bỏ qua”, màn mở đề có thẻ “Lần trước” và hai thẻ chọn cách làm), UX6 (bản đám mây: màn kết quả ghi “Đã lưu và gửi cho bố mẹ.” hay “Đã lưu trên máy này. Sẽ gửi cho bố mẹ khi có mạng.”, còn bài chưa gửi thì trang chính của con và khu phụ huynh trên cùng máy có dòng “N bài chưa gửi · Gửi lại”, PR #66; sửa sau rà soát nhiều lượt: PR #70), N1 (ngân hàng Toán 4 cuối kì I: 3 đề có sẵn thêm mức độ và 31 câu riêng đủ các dạng câu, có hình vẽ; đề ngẫu nhiên rút 25 câu theo ma trận 10 Biết – 8 Hiểu – 7 Vận dụng), N2 (ngân hàng Tiếng Việt 4 cuối kì I: 2 đề có sẵn thêm mức độ và 54 câu riêng gồm 6 đoạn đọc dùng chung, 6 câu Viết tự chấm; đề ngẫu nhiên 40 phút, ma trận 10 – 8 – 7, có đúng một câu Viết, PR #68), 9g (kiểm thử không phụ thuộc ngày chạy: `tests/e2e.js`, `tests/supabase/cloud-e2e.js` chạy ở một ngày cố định `TODAY`, PR #72). Còn chờ bố mẹ thử L17 (sao lưu trên iPhone thật, [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md) mục 2, Phiên 9d). Kho đề: `node tests/kiem-tra-de.js` in số đề, số câu, dạng câu (19/10, sau N2: 29 đề, 800 câu, 6 đề ngẫu nhiên).
> **Đã chốt 18/10/2026:** bán khi đủ đề lớp 4–12 (theo nhịp 1–2 phiên mỗi tuần: khoảng cuối năm học 2028–2029); đến lúc đó gói Miễn phí giữ như hiện nay (5 hồ sơ, mọi đề; bảng `plans` không đổi), hạn mức hai gói lúc bán chốt sau; các phiên chuẩn bị bán G1, B1, B2, B4 làm ngay trước lúc đó; Supabase giữ gói Free đến khi bắt đầu thu tiền (chủ app xuất CSV hằng tuần, mở app mỗi tuần); trang công khai chỉ dành cho gia đình được mời (màn đăng nhập có dòng “Chưa có tài khoản?”, Phiên S1); câu sai báo bằng nút trong app (Phiên R1), GitHub Issues chỉ còn cho chủ app; không ghi giá bán, chi phí hay so sánh đối thủ vào repo. Thiết kế gói: mục 9 của [THIET-KE-TAI-KHOAN.md](THIET-KE-TAI-KHOAN.md).
> **Quy ước (từ Phiên D0):** chỉ file này ghi trạng thái và lộ trình. CLAUDE.md, README và các tài liệu khác trong docs/ chỉ trỏ sang đây. Làm xong một phiên thì ghi số PR vào bảng “Đã xong” ở mục 1, xóa dòng của phiên ở mục 3 và xóa lời giao việc của phiên (ở mục 4, hoặc ở file đang giữ lời giao việc đó; phiên UX thì xóa sau lượt kiểm thử thiết kế ở mục 5 của [CAI-TIEN-UX-2X.md](CAI-TIEN-UX-2X.md), vì lượt đó đi lại từng ý của lời giao việc); lịch sử git còn giữ bản cũ, nên các file kế hoạch chỉ còn việc sắp làm. Đổi quyết định thì sửa đoạn trên trước.
> **Rà soát toàn app sau K3 (18/10/2026):** app chạy tốt, 35 mục đề làm đúng hết đều được 10/10; lỗi mới L20 (PR #47 của R1 đã sửa), L22–L26 và yêu cầu L21 xếp vào Phiên TA1, 9e, TA2, làm trước UX1 ([SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md), nhóm E). **Chủ app chốt thêm (18/10/2026):** môn Tiếng Anh của mọi khối 100% tiếng Anh, cả lời dặn, lời giải và giao diện làm đề (quy tắc ở [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md) mục 3).
> **Tiếp theo:** 9h (nên trước N4), bảng “Làm ngay” ở mục 3; các phiên làm đề theo lời giao việc chủ app chốt 19/10/2026 ([KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md) mục 7): cuối kì I N4 (sau 9h) → N4b → N5 → N6 (lớp 6, hạn 30/11; 9h chưa gộp thì làm N4b, N5, N6 trước N4) → N3 → N3b (lớp 4, hạn 7/12; N1, N2 đã xong, PR #62, #68), rồi K4 và giữa kì II (hạn 22/2/2027); kiểm thử thiết kế sau UX5, UX6 (mục 5 của [CAI-TIEN-UX-2X.md](CAI-TIEN-UX-2X.md)); bố mẹ thử lại L27 trên máy đang dùng sau khi Merge PR #57 (làm lại một đề đúng hết thì “Ôn câu sai” không còn câu của đề đó). Mục 2 (việc của chủ app) và mục 3 (thứ tự các phiên). Mục 5: nhật ký chạy thử, chủ app tự điền.

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
| #33, #35 | Phiên U1: nút xem mật khẩu và mã PIN (lời giao việc #33, code #35; bố mẹ thử trên iPhone, Android) |
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
| #59 | Phiên UX4: chọn hồ sơ và nhập PIN (X1–X4): chạm hồ sơ có PIN hoặc ô Phụ huynh thì sang bước nhập riêng `#/vao/<mã>` (hình to, tên, lớp, hàng chấm, bàn phím ngay dưới, vừa một màn hình 360×740; “← Chọn hồ sơ khác” và nút Back về danh sách); số đã gõ chỉ hiện ở hàng chấm, nút chữ “Hiện số”; lỗi và đếm ngược ngay dưới hàng chấm, đang đợi thì bàn phím mờ, hết giờ tự bật lại; trang Tài khoản chạm hình đại diện là lưu ngay, bản lưu trên máy có form đổi mã PIN riêng. Kiểm thử ở `tests/e2e.js` (bước UX4, ảnh `docs/hinh-ux4/`) và `tests/supabase/cloud-e2e.js` (các kiểm tra “UX4:”) |
| #57 | Phiên 9f: sửa L27 trong 4 bài ôn dạng trang (làm đúng ở bất kì chế độ nào, cả đề thi thử, thì bỏ câu khỏi “Ôn câu sai”; chữ giải thích luật ở trang đầu; màn kết quả có dòng “Lần này bạn không sai câu nào…” khi danh sách còn câu từ lần trước, IOE tiếng Anh; nhãn 13px, nút tiêu đề 44px để qua kiểm tra 360px trong khung; bước L27 trong `tests/e2e.js`) |
| #60 | Phiên UX3b: sửa sau kiểm thử thiết kế UX3 (X17–X20): “Đăng xuất khỏi máy này” hỏi mật khẩu của bố mẹ trong hộp mở ngay dưới nút (mã mở nhanh không dùng được, sai tính vào khóa tạm; `Store.checkPassword` nhận chỗ đặt ô CAPTCHA); link “Đặt mã PIN cho <tên>” ở thẻ Bắt đầu mở thẳng hồ sơ của con chưa có mã với ô Mã PIN được focus, lưu xong về Các con kèm toast “Đã đặt mã PIN cho <tên>”; bước 2 chỉ ✓ khi mọi con đã có mã; bỏ chữ “(đã băm)”, máy chưa ghi nhớ thì chỉ cách đăng xuất rồi đăng nhập lại có ghi nhớ; ảnh `docs/hinh-ux3/` |
| #52 | Phiên TA2: màn làm đề Tiếng Anh bằng tiếng Anh (bảng chữ hai ngôn ngữ `TXT` trong `js/quiz.js`, `Quiz.lang`, `Quiz.title`; cả phần app bọc ngoài bài ôn IOE; chữ mới trên màn làm đề phải có cả bản tiếng Anh, CLAUDE.md “Quy ước code”); `tests/e2e.js` bước TA2, `cloud-e2e.js` c8e–c8g |
| #62 | Phiên N1: ngân hàng Toán 4 cuối kì I: 75 câu của 3 đề có sẵn thêm mức độ `lv` (câu, chủ đề giữ nguyên), 31 câu riêng của `toan4-ck1-ngau-nhien` (đúng/sai 4 ý, trả lời bằng số, nối cột, sắp xếp, tự luận, 8 câu có hình); ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 theo Thông tư 27/2020; `tests/toan4-ck1.js` tính lại đáp án 106 câu (đọc cả toạ độ trong hình); giữ 3 đề cố định thay vì chọn 2 |
| #63 | Số có nhóm hàng nghìn (“1 200”, “987 650”) không bị tách ra hai dòng ở 360px (ghi chú ngoài phạm vi của PR #62): `nbNum()` trong `js/quiz.js` đổi khoảng trắng giữa hai nhóm số thành khoảng trắng không ngắt khi hiện chữ của câu (màn làm đề, màn kết quả; danh sách câu bị báo qua `Quiz.nbNum`); dữ liệu, `Quiz.key`, `Quiz.text` và cách chấm không đổi (CLAUDE.md “Quy ước code”); `tests/e2e.js` bước “numbers with thousands spaces” (cả kho Toán 4 cuối kì I và một đề tự nhập đủ dạng câu) |
| #64 | Bài ôn dạng trang l4, l6: số có nhóm hàng nghìn không bị tách ra hai dòng ở 360px (ghi chú ngoài phạm vi của PR #63; chủ app duyệt thêm chỗ sửa vào hợp đồng với bài ôn, 19/10/2026): `nbNum` của trang (cùng biểu thức với `js/quiz.js`) cho câu hỏi, lựa chọn, đáp án, lời giải, đoạn đọc, câu cần xem lại, tên bài, Ghi nhớ; dữ liệu, cách chấm và ba chỗ nối với app không đổi (CLAUDE.md “Hợp đồng giữa bài ôn và app”); `tests/e2e.js` bước “lesson pages l4, l6” (mọi màn của hai bài trong khung ở 360px) |
| #65 | Lời giao việc các phiên làm đề N2–N12b và K4, chủ app chốt 19/10/2026 ([KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md) mục 7): thêm N3b (Tiếng Anh 4, Tin học và Công nghệ 4 cuối kì I), tách N4b, N7b, thêm N12b; hạn 30/11 (lớp 6), 7/12 (lớp 4), 22/2/2027 (giữa kì II); Quy định chung của các phiên N; K4 (đề ngẫu nhiên rút giữ trọn đoạn đọc) |
| #67 | Đổi font (chủ app yêu cầu 19/10/2026): Lora thay Baloo 2 cho tiêu đề và số to, Noto Sans thay Be Vietnam Pro cho chữ (@fontsource 5.3.0, tự lưu trong `fonts/`); Lora chỉ có đến 700 nên chỗ 800 thành 700, số to bằng Lora bỏ `tabular-nums`, tiêu đề của 4 bài ôn line-height 1.15 → 1.35 (ghi vào hợp đồng bài ôn trong CLAUDE.md); `sw.js` `onup-v5`; `tests/e2e.js` kiểm tra luật font; Figma đổi theo; ảnh trước/sau ở [hinh-font/](hinh-font/) |
| #68 | Phiên N2: ngân hàng Tiếng Việt 4 cuối kì I: 50 câu của 2 đề có sẵn thêm mức độ `lv` (câu, chủ đề giữ nguyên), 54 câu riêng của `tv4-ck1-ngau-nhien` (6 đoạn đọc tự viết dùng chung ở `passages`: 4 đoạn văn, 2 bài thơ, mỗi đoạn 3–4 câu đủ ba mức; Luyện từ và câu bằng đúng/sai 4 ý, nối cột, sắp xếp, điền; 6 câu Viết đoạn văn tự chấm theo thang, chủ đề mới “Viết”); ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 theo Thông tư 27/2020 (Đọc hiểu 7 câu, Viết 1 câu), đề ngẫu nhiên 40 phút |
| #71 | Dọn các file kế hoạch: bỏ lời giao việc của các phiên đã xong hoặc đã bị thay (giữ UX5, UX6 đến khi kiểm thử thiết kế xong), bỏ các dòng đã gạch ở mục 3; quy ước mới: làm xong một phiên thì ghi PR ở bảng này, xóa dòng ở mục 3 và lời giao việc của phiên |
| #72 | Phiên 9g: sửa L28, hai script kiểm thử chạy ở một ngày cố định (hằng `TODAY` 21/10/2026 7:00 ở đầu `tests/e2e.js`, `tests/supabase/cloud-e2e.js`; mọi context qua hàm dùng chung `newContext`, `device()` cài đồng hồ giả lập của Playwright ở `TODAY` cộng thời gian đã chạy; máy chủ giả và Edge Function admin cùng giờ `be.clock`; chỗ so giờ ở node so với giờ trong trang); script bọc `tests/chay-theo-ngay.js` để thử như chạy vào ngày khác; đã thử ngày thật và 2/11/2026, 14/11/2026, 22/12/2026, 10/1/2027, 1/6/2027 |

Nội dung hiện có (19/10/2026, `node tests/kiem-tra-de.js`: 29 đề, 800 câu; Toán 4 cuối kì I là ngân hàng 106 câu có mức độ từ Phiên N1, Tiếng Việt 4 cuối kì I ngân hàng 104 câu từ Phiên N2): 4 bài ôn (giữa kì I lớp 4, lớp 6; IOE 4 cấp trường, cấp xã và cấp tỉnh (Phiên 13); IOE 6 cấp xã và cấp thành phố), 19 đề cuối kì I (lớp 6 đủ 8 môn từ Phiên 10: thêm Tiếng Anh, GDCD, Tin học, Công nghệ; lớp 4 thêm Tin học và Công nghệ từ Phiên 11, Tiếng Anh từ Phiên N0b; nhiều môn mới có 1 đề, N1–N6 làm cho đủ), 4 đề giữa kì II lớp 4 (Toán, Tiếng Việt, Phiên 14), 5 đề giữa kì I lớp 6 (Tiếng Anh, Lịch sử và Địa lí, GDCD, Phiên N0a; Tin học, Công nghệ, Phiên N0b) và 1 đề thử nghiệm các dạng câu mới (Phiên K2).

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

Mỗi dòng là **một phiên Claude Code riêng**: mở claude.ai/code, chọn repo `dunglnh/OnUp`, dán lời giao việc, xem Pull Request rồi Merge. Lời giao việc chỉ giữ cho phiên chưa làm: phiên sửa lỗi (hiện là 9h: L29–L31 ô nhập số trên điện thoại; QC ghi mã lỗi và lời giao việc) ở mục 3 của [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md); **các phiên làm đề và kĩ thuật cho đề (N3–N25, K4) ở mục 7 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md)** (B4 ở mục 5 của file đó); các phiên khác ở mục 4 dưới đây. Phiên UX7, UX8 đến từ bản rà giao diện ngày 18/10: vấn đề (X11–X14), ảnh và điều kiện xong ở [CAI-TIEN-UX-2X.md](CAI-TIEN-UX-2X.md). Sau khi gộp mỗi phiên UX có một lượt kiểm thử thiết kế, ghi ở mục 5 của file đó; chỗ lệch thành một phiên sửa ngắn tên “b”, như UX3b (X17–X20, kiểm thử 19/10). Thiết kế nằm trong file Figma [OnUp](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=70-2): Master 1.x là 77 màn vẽ lại đúng app ở commit `0a1e8db`; Master 2.x là các đề xuất, kể cả minh họa cho S1, R1, UX1–UX3.

**Làm ngay, chen trước các phiên còn lại** (lời giao việc ở mục 3 của [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md)): **9h** (L29–L31: ô nhập số trên iPhone không gõ được phân số, số âm; nên trước N4):

| Thứ tự | Hạn | Phiên | Cần trước | Ghi chú |
|---|---|---|---|---|
| 1 | 8/11 | **9h · Ô nhập số trên điện thoại** | | L29–L31 trong `js/quiz.js`: nút "/" và đáp án phân số cho câu trả lời bằng số; câu điền đáp án âm mở bàn phím có dấu trừ; câu điền số thập phân gõ dấu chấm vẫn đúng. Nên trước N4 (Toán 6 cuối kì I có số nguyên); trước K4 (cùng sửa `js/quiz.js`). Bố mẹ thử trên iPhone thật |

Thứ tự các phiên:

| Thứ tự | Hạn | Phiên | Cần trước | Ghi chú |
|---|---|---|---|---|
| 2 | 30/11 (lớp 6), 7/12 (lớp 4) | **N3–N6, N3b, N4b · Đủ đề cuối kì I lớp 4 và 6** ([KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md) mục 7; N1, N2 đã xong) | 9h nên trước N4 | chạy theo thứ tự N4 (sau 9h; viết lại bước K3 của tests/e2e.js) → N4b → N5 → N6 (lớp 6; 9h chưa gộp thì làm N4b, N5, N6 trước N4) → N3 → N3b (lớp 4); chỉ sửa file đề và kiểm thử, chen được giữa các phiên UX |
| 3 | 14/12 | **K4 · Đề ngẫu nhiên rút giữ trọn đoạn đọc** ([KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md) mục 7) | N4, 9h (cùng sửa js/quiz.js, bước K3 của tests/e2e.js) | trước các phiên giữa kì II có đoạn đọc (N7b, N9, N10) |
| 4 | 24/1 | **UX7 · Quản lí đề** | UX2 (tab "Đề tự soạn") | |
| 5 | 31/1 | **UX8 · Gửi báo cáo tuần** | UX2 | |
| 6 | 22/2 | **N7–N12, N7b, N12b · Giữa kì II lớp 4 và 6** ([KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md) mục 7) | K3; K4 trước N7b, N9, N10 | chạy theo thứ tự N8 → N9 → N10 → N11 → N12 → N12b (lớp 6 chưa có đề nào) → N7 → N7b; bắt đầu sau N3b (tháng 12), xen với UX7, UX8 |
| 7 | 10/3 | **N-IOE · IOE cấp quốc gia** | | thi 1–2/4/2027 (dự kiến), hiện chưa có bài ôn |
| 8 | 10/4 | **N13–N22 · Cuối năm lớp 4 và 6** | K3 | |
| 9 | hè 2027 | Lịch 2027–2028 (thêm kì thi các khối mới); giữa kì I lớp 4, 6 năm sau (N23–N25); giữa kì I và cuối kì I lớp 5, 7; gộp bài ôn dạng trang vào ngân hàng | | [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md) mục 4, 7 |
| 10 | 2027–2028 | Lớp 5, 7 phần còn lại; lớp 9 (có đề thi thử vào 10); lớp 8 | | khoảng 70 phiên |
| 11 | 2028–2029 | Lớp 12 (đề thi thử tốt nghiệp trước), 10, 11 | | khoảng 90 phiên |
| 12 | trước khi bán | **G1 · Kích hoạt gói, màn hình Nâng cấp, Điều khoản và Quyền riêng tư** → **B1 · Chuyển hosting sang Cloudflare Pages, repo riêng tư** → **B2 · Đề trả phí lên máy chủ** → B4 (bớt tải dữ liệu); lên Supabase Pro | đủ đề lớp 4–12 | lời giao việc ở mục 4; B4 ở [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md) mục 5 |
| — | khi có | **Sửa lỗi từ góp ý chạy thử**: QC ghi mã lỗi (tiếp theo L31) và lời giao việc phiên 9 + chữ cái ở [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md) | | chen vào bất cứ lúc nào; gấp thì xếp vào bảng “Làm ngay” |

Từ 20/10/2026 đến 10/4/2027 còn khoảng 29 phiên: 9h; 6 phiên đề cuối kì I (N3–N6, N3b, N4b); K4; UX7, UX8; 8 phiên đề giữa kì II (N7–N12, N7b, N12b); N-IOE; 10 phiên đề cuối năm (N13–N22); thêm phiên sửa ngắn “b” sau kiểm thử thiết kế nếu có. Trung bình 1–2 phiên mỗi tuần. Từ nay đến đầu tháng 12 dày nhất: 9h và các phiên đề cuối kì I. Tháng 12 có K4 và bắt đầu giữa kì II; UX7, UX8 làm sau kì thi cuối kì I, xen với các phiên giữa kì II. Sau đó việc chính là làm đề cho đủ lớp 4–12 (khoảng 200 phiên); chất lượng đề quyết định có bán được hay không, nên nút báo câu sai (R1) và việc rà đề đi trước.

Lưu ý: đến khi làm B1 (ngay trước khi bán), repo vẫn công khai nên ai cũng tải được trọn bộ đề bằng một lệnh; chủ app đã chấp nhận như vậy (18/10/2026). Nếu sau này muốn giữ đề sớm hơn thì đổi quyết định ở đầu file rồi làm B1 trước (Cloudflare Pages miễn phí, chạy được từ repo riêng tư) mà chưa bật gói; giữ đề thật sự (người chưa trả tiền không tải được) thì cần B2.

Không chạy cùng lúc hai phiên cùng sửa `js/app.js` hoặc `js/quiz.js`; các phiên N chỉ sửa file đề nên chạy xen được.

**Để sau, chỉ làm khi có nhu cầu thật:** nhập đề từ Excel (Phiên 6 cũ); tự đăng ký, email để tự lấy lại mật khẩu, tài khoản giáo viên/lớp học (mục 7 bản thiết kế); **bản trả phí** (hướng đi ở mục 9 bản thiết kế; việc kĩ thuật cần làm trước ở mục 5 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md)). Đề lớp 5, 7–12 đã có thứ tự và số phiên dự kiến trong [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md). Việc “bắt buộc đổi PIN cũ” không còn cần vì cách đăng nhập mới bỏ kiểm tra PIN ở máy chủ; `pin_hash` của hồ sơ con chỉ là khóa trên giao diện.

**Mẹo tiết kiệm lượt dùng gói Pro:**
- Một phiên một việc, giao việc rõ ràng. Phiên càng dài càng tốn, vì mỗi lượt Claude đọc lại toàn bộ cuộc trò chuyện.
- Chỉ yêu cầu **một vòng** tự rà soát; nhiều vòng rà soát và phiên “điều phối” nhiều trợ lý là phần tốn nhất trước đây.
- Mỗi việc lớn mở một cuộc trò chuyện mới thay vì nói tiếp trong cuộc cũ.
- Xem mức “This week” ở Settings → Usage trước khi mở phiên; giới hạn tuần làm mới mỗi thứ Sáu khoảng 13:00.
- Merge từng Pull Request trước khi mở phiên sửa cùng file.

## 4. Lời giao việc (dán nguyên vào phiên mới)

Chỉ giữ lời giao việc của phiên chưa làm, và của phiên UX đã xong mà chưa kiểm thử thiết kế (UX5, UX6). Phiên K4 và các phiên làm đề: mục 7 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md); phiên sửa lỗi (9h): mục 3 của [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md). Các phiên dưới đây xếp theo thứ tự ở mục 3.

**Phiên UX5 · Làm bài tập trung** (đã xong, PR #61; giữ đến khi kiểm thử thiết kế xong, mục 5 của [CAI-TIEN-UX-2X.md](CAI-TIEN-UX-2X.md))
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

**Phiên UX6 · Biết bài đã gửi chưa** (bản đám mây; đã xong, PR #66; sửa sau rà soát: PR #70; giữ đến khi kiểm thử thiết kế xong, mục 5 của [CAI-TIEN-UX-2X.md](CAI-TIEN-UX-2X.md))
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

---

## 5. Nhật ký chạy thử

Chủ app tự điền, mỗi tuần một dòng, không tốn lượt Claude. Nguồn số liệu: trang admin (số tài khoản, số tài khoản dùng trong 7 ngày, số hồ sơ con theo khối); Supabase → **Table Editor → `results`**, đếm dòng có `at` trong tuần (hoặc đếm từ file CSV xuất hằng tuần). Góp ý ghi nguyên lời của phụ huynh, học sinh; chỗ khó dùng thì chuyển sang ghi chép ở mục 2 (việc 3) để các phiên UX dùng. Không ghi tên thật của trẻ, không ghi số tiền.

| Tuần (từ ngày) | Gia đình được mời | Gia đình có dùng trong tuần | Lượt làm bài trong tuần | Còn dùng sau 4 tuần | Góp ý thật (ai · nói gì) | Đã xử lí (phiên / issue) |
|---|---|---|---|---|---|---|
| 18/10/2026 | | | | | Chủ app dùng thử · đề Tiếng Anh lẫn tiếng Việt; môn Tiếng Anh mọi khối phải 100% tiếng Anh. 19/10, học sinh lớp 6 · bài ôn giữa kì I, Ngữ văn Đề 1 đúng 20/20 mà "Ôn câu sai" vẫn còn 1 câu, làm lại thì app báo đúng | L21 · Phiên TA1, TA2; L27 · Phiên 9f ([SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md)) |
| | | | | | | |
| | | | | | | |

Mốc cần nhìn lại: **cuối học kì I (tháng 1/2027)**, hỏi vài gia đình app có đáng trả tiền không; **cuối năm học 2026–2027**, xem số gia đình còn dùng trước khi làm lớp 5, 7.
