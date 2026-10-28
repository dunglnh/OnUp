# Kế hoạch phát triển OnUp

> **Tìm nhanh:** phiên làm đề, dò sách, kĩ thuật cho đề: hàng đợi ở mục 7 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md) (mở từ trên xuống) · phiên sửa lỗi: mục 3 của [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md) · việc của chủ app: mục 2 · thứ tự các phiên: mục 3 · lời giao việc phiên giao diện, chuẩn bị bán: mục 4 · đã xong: mục 1.

> **Trạng thái (28/10/2026):** trang thật https://dunglnh.github.io/OnUp/ chạy bản đám mây từ 17/10/2026 (PR #27), chỉ dành cho gia đình được mời. Đã gộp tới PR #208; PR #209 (Phiên N9-gk2-toan) chờ Merge (bảng “Đã xong” ở mục 1). Phiên xong chỉ sửa ngày và số PR ở dòng này.

> **Đã chốt 18/10/2026, đổi mốc 21/10/2026:** đủ đề lớp 4–12 và rà xong trong tháng 2/2027; từ đầu tháng 3/2027 mời khách tiềm năng dùng thử miễn phí đến hết các kì thi của năm học 2026–2027 (kì cuối là thi tốt nghiệp THPT, dự kiến 11–12/6/2027); mở bán chính thức từ tháng 6/2027 nếu không vướng thủ tục hành chính (thay mốc “bán khi đủ đề lớp 4–12, khoảng cuối năm học 2028–2029” của ngày 18/10; nhịp cần, mốc kiểm tra và cách lùi khi chậm ở mục 4 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md)); trong thời gian dùng thử và đến lúc bán, gói Miễn phí giữ như hiện nay (5 hồ sơ, mọi đề; bảng `plans` không đổi), hạn mức hai gói lúc bán chốt sau (giữa tháng 5/2027); các phiên chuẩn bị G0, B1 làm trước khi mở dùng thử, B2, B4, G1 trước khi bán (mục 3); Supabase giữ gói Free đến khi bắt đầu thu tiền (chủ app xuất CSV hằng tuần, mở app mỗi tuần); trang công khai chỉ dành cho gia đình được mời, gia đình dùng thử cũng do chủ app tạo tài khoản (màn đăng nhập có dòng “Chưa có tài khoản?”, Phiên S1; muốn mở tự đăng kí thì đổi quyết định này trước, việc 9 ở mục 2); câu sai báo bằng nút trong app (Phiên R1), GitHub Issues chỉ còn cho chủ app; không ghi giá bán, chi phí hay so sánh đối thủ vào repo. Thiết kế gói: mục 9 của [THIET-KE-TAI-KHOAN.md](THIET-KE-TAI-KHOAN.md).

> **Bài ôn dạng trang (24/10/2026, chủ app giao PO quyết):** giữ bốn bài ôn `modules/`; tính năng giao diện mới mặc định chỉ làm ở đề ngân hàng (`js/quiz.js`), bài ôn chỉ sửa nội dung, lỗi (làm cả hai khi chủ app yêu cầu rõ, như L38, L39); “Ôn theo bài” từ ngân hàng và gộp bài ôn vào ngân hàng làm cùng đợt rà sách 2027.

> **Quy ước:** chỉ file này ghi trạng thái và lộ trình; CLAUDE.md, README và các tài liệu khác chỉ trỏ sang đây. Làm xong một phiên thì: thêm **một dòng ngắn** vào cuối bảng “Đã xong” ở mục 1 (số PR và tiêu đề Pull Request, không chép mô tả); sửa ngày và số PR ở dòng trạng thái; xóa dòng của phiên ở mục 3 và lời giao việc của phiên (ở mục 4 hoặc ở file đang giữ lời giao việc đó; phiên UX, UI thì xóa sau lượt kiểm thử thiết kế ở mục 5 của [CAI-TIEN-UX-2X.md](CAI-TIEN-UX-2X.md), bản 3.x ở mục 6 của [CAI-TIEN-UX-3X.md](CAI-TIEN-UX-3X.md)). Không viết thêm vào “Tiếp theo”, trừ khi thứ tự lớn đổi. Chi tiết của phiên để ở mô tả Pull Request; lịch sử git giữ bản cũ. Đổi quyết định thì sửa đoạn “Đã chốt” trước.

> **Tiếp theo (25/10/2026):**
> - Các phiên dò sách DS1–DS12c đã xong (PR #135–#176); kế hoạch nội dung viết gọn lại, mốc dự trù tính lại theo nhịp đo được (mục 4 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md)).
> - Hàng đợi ở mục 7 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md): cuối năm lớp 6 rồi lớp 4; rồi lớp 9 (trước 15/11), lớp 12 và 5 (10/12), lớp 7, 8 (31/12), lớp 10, 11 (20/1/2027).
> - 9ob, UI2, UX7, UX8, UX7b đã kiểm thử thiết kế (24/10/2026, mục 5 của [CAI-TIEN-UX-2X.md](CAI-TIEN-UX-2X.md)).
> - Mốc: đủ đề lớp 4–12, rà xong trong tháng 2/2027; dùng thử từ tháng 3/2027; mở bán từ tháng 6/2027 (đoạn “Đã chốt”).

## 1. Tình hình hiện tại

**Nội dung hiện có** (23/10/2026, `node tests/kiem-tra-de.js`: 70 đề, 2 539 câu): lớp 4 và 6 đủ đề giữa kì I, cuối kì I, giữa kì II (ngân hàng câu có mức độ, đề cố định, đề ngẫu nhiên theo ma trận); còn cuối năm (N13–N22b ở mục 7 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md)). Bốn bài ôn dạng trang: giữa kì I lớp 4, lớp 6; IOE 4 (cấp trường, xã, tỉnh), IOE 6 (cấp xã, thành phố). Danh sách đề và số câu từng đề: chạy `node tests/kiem-tra-de.js`.

**Đã xong** (tất cả đã gộp vào `main`; mỗi dòng là số PR và tiêu đề Pull Request, chi tiết ở mô tả PR; bản dài của bảng còn trong lịch sử git, trước PR rút gọn ngày 24/10/2026):

<details><summary>Bảng “Đã xong” (bấm để mở; dòng mới ở cuối)</summary>

| PR | Việc |
|---|---|
| #1 | Thêm 3 đề Toán 4 cuối học kì I (Phiên 1) |
| #3 | Phiên 2: 2 đề Tiếng Việt 4 cuối học kì I |
| #4 | Phiên 4: 4 đề cuối học kì I — Khoa học 4, Lịch sử và Địa lí 4, KHTN 6, Lịch sử và Địa lí 6 |
| #5 | Phiên 3: 2 đề Toán 6 và 2 đề Ngữ văn 6 cuối học kì I |
| #6 | Phiên 5: Đồng bộ đám mây bằng Supabase (SupabaseStore, RLS, đăng nhập email và mã gia đình + PIN) |
| #7, #9 | Canh trái nút quay lại; xưng "bạn" trong bài ôn; bỏ 2 bộ mẫu 12 câu |
| #8 | Phiên 5b: Chống máy tự động (CAPTCHA) cho bản đám mây |
| #10 | Phiên 8: rà soát câu hỏi (56 chỗ sửa), bộ chấm điền khuyết, giao diện 360px |
| #13, #14 | Phiên 10, 11: đề cuối kì I còn thiếu (Tiếng Anh, GDCD, Tin học, Công nghệ 6; Tin học và Công nghệ 4) |
| #15 | Phiên 12: báo cáo tuần cho phụ huynh |
| #16 | Phiên 13: IOE cấp tỉnh lớp 4 (Province Level) |
| #17 | Phiên 14: đề giữa kì II lớp 4 (Toán, Tiếng Việt) |
| #18 | Thiết kế khung tài khoản và trang admin (chưa làm bản trả phí) |
| #19 | Phiên A: máy chủ tài khoản tên đăng nhập + mật khẩu, hồ sơ con, gói, Edge Function admin |
| #20, #24 | Lỗi tìm được khi dùng thử ngày 16/10 và sau rà soát 17/10 ([SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md)) |
| #21, #22, #23 | Phiên 9a, 9b, 9c: chốt rời trang, khóa PIN, đường dẫn sai; giao diện 360px; chạy khi mất mạng, nhắc sao lưu |
| #25 | Phiên B · App: đăng nhập, chọn hồ sơ, khu phụ huynh, khối lớp chung |
| #26 | tests/supabase: không ghi cứng số đề trong paid_banks (sửa RLS FAILED trên main) |
| #27 | Set Supabase URL and anon key in config.js |
| #29 | Phiên 9d: sửa L15–L19 (lỗi phát sinh sau rà soát 17/10) |
| #30 | Phiên C: trang admin của chủ app (admin.html) |
| #31 | Docs: kế hoạch nội dung đủ đề lớp 4 và 6, rồi lớp 5, 7–12 |
| #32, #34 | Phiên N0a, N0b: đề giữa kì I lớp 6 còn thiếu; Tiếng Anh 4 cuối kì I |
| #33, #35 | Phiên U1: nút xem mật khẩu và mã PIN (lời giao việc #33, code #35; bố mẹ thử trên iPhone, Android) |
| #36 | Phiên K1: tách dữ liệu đề theo khối và môn, bộ kiểm tra đề |
| #37 | Phiên K2: dạng câu hỏi mới |
| #38 | Docs: lộ trình các phiên tiếp theo (D0 → N22) |
| #39 | Docs: đề xuất UX/UI 2.x, lời giao việc UI1, UX4–UX8 |
| #40 | Phiên UI1 · Chỉnh nhỏ chữ và màu (X15, X16) |
| #41 | Phiên D0: đồng bộ tài liệu theo quyết định 18/10/2026 |
| #42 | Lời nhắn gửi phụ huynh xuống dòng sẵn, dán vào Zalo không phải sửa |
| #43 | Phiên S1: màn hình đăng nhập cho người mới (thẻ “Chưa có tài khoản?”, nhắc dữ liệu cũ) |
| #46 | Phiên K3: đề ngẫu nhiên theo ma trận (pool) |
| #48 | Rà soát toàn app sau Phiên K3; đề Tiếng Anh 100% tiếng Anh (Phiên TA1, 9e, TA2) |
| #49 | Phiên TA1: đề Tiếng Anh 100% tiếng Anh (nội dung) |
| #50 | Phiên 9e: sửa L22–L26 (lỗi phát sinh sau K3) |
| #52 | Phiên TA2: màn làm đề Tiếng Anh bằng tiếng Anh (giao diện) |
| #53 | Phiên UX1: trang "Hôm nay" với thanh tab dưới cho học sinh; màn kết quả có lời khen, so với lần trước, ôn lại câu sai |
| #54 | Phiên UX2: Khu phụ huynh gọn lại (Các con · Lịch thi · Cài đặt), thẻ của con mở báo cáo tuần, sửa ngày thi tại chỗ |
| #56 | Phiên UX3: thẻ “Bắt đầu trong 3 bước”, nút “Chọn hồ sơ khác”, mã mở nhanh khu phụ huynh |
| #57 | Phiên 9f · L27: làm đúng ở bất kì chế độ nào thì bỏ câu khỏi "Ôn câu sai" (4 bài ôn dạng trang) |
| #59 | Phiên UX4: bước nhập PIN riêng, nút “Hiện số”, bàn phím mờ khi phải đợi, chạm hình đại diện là lưu |
| #60 | Phiên UX3b: đăng xuất hỏi mật khẩu, đặt mã PIN từ thẻ Bắt đầu về Các con, bước 2 ghi con chưa có mã, chữ ô mã mở nhanh (X17–X20) |
| #62, #108 | Phiên N1: ngân hàng Toán 4 cuối kì I (106 câu, ma trận Biết – Hiểu – Vận dụng); Phiên N1: dò ngân hàng Toán 4 cuối kì I với sách bản in năm 2026 |
| #63 | Số có nhóm hàng nghìn (“1 200”, “987 650”) không bị tách ra hai dòng ở 360px |
| #64 | Bài ôn dạng trang l4, l6: số có nhóm hàng nghìn không bị tách ra hai dòng ở 360px |
| #65 | docs: lời giao việc các phiên làm đề N2–N12b và K4 (chủ app chốt 19/10) |
| #67 | Đổi font: Lora (tiêu đề, số) thay Baloo 2, Noto Sans (chữ) thay Be Vietnam Pro |
| #68 | Phiên N2: ngân hàng Tiếng Việt 4 cuối kì I (104 câu có mức độ) |
| #71 | docs: bỏ lời giao việc của các phiên đã xong, chỉ giữ việc sắp làm |
| #72 | Phiên 9g · L28: kiểm thử chạy ở một ngày cố định, không hỏng theo ngày chạy |
| #73 | docs: bỏ hạn “N4 trước 13/11” và lí do k3.hero sau Phiên 9g |
| #74 | Phiên 9h: ô nhập số trên điện thoại (L29–L31) |
| #75 | Phiên N3b: ngân hàng Tiếng Anh 4 (76 câu) và Tin học và Công nghệ 4 (50 câu) cuối kì I |
| #77 | Phiên N3: ngân hàng Khoa học 4 (77 câu) và Lịch sử và Địa lí 4 (78 câu) cuối kì I |
| #78 | Phiên N4: ngân hàng Toán 6 cuối kì I (108 câu), sửa L33, viết lại bước K3 của tests/e2e.js |
| #79 | Câu tự luận vào lịch sử câu của đề ngẫu nhiên |
| #80 | Phiên N4b: ngân hàng Ngữ văn 6 cuối kì I (83 câu) |
| #81 | Phiên N5: ngân hàng Tiếng Anh 6, KHTN 6 cuối kì I (mỗi kho 76 câu) |
| #82 | Chữ một font, Lịch thi một lối vào, đầu báo cáo tuần gọn |
| #83 | Phiên N6: ngân hàng Lịch sử và Địa lí, GDCD, Tin học, Công nghệ 6 cuối kì I |
| #84 | Phiên K4: đề ngẫu nhiên rút giữ trọn đoạn đọc |
| #85 | Phiên 9i: phân số, hỗn số gõ có khoảng trắng (L32) |
| #87 | Phiên 9j: câu điền đáp án phân số, gõ kèm đơn vị (L34) |
| #89 | docs: lời giao việc N13–N25b; mốc mới (đủ đề 2/2027, dùng thử, mở bán 6/2027); kiểm thử grant Supabase |
| #90 | Phiên 9k: câu điền đáp án phân số âm, dấu trừ khác kiểu (L35) |
| #91 | Phiên 9l: bài ôn KHTN 6 theo đúng sách Kết nối tri thức (L36) |
| #92 | docs: sách thống nhất 2026, dự trù sách chỉnh sửa 2027; N25 thêm Bài 16 (theo PR #91) |
| #93 | Phiên N24: ngân hàng Toán 6 giữa kì I (Đề 1, Đề 2, đề ngẫu nhiên; 101 câu) |
| #94 | Phiên N24b: ngân hàng Ngữ văn 6 và GDCD 6 giữa kì I |
| #96 | Ngữ văn 6: câu về «Tia nắng hạt mưa», «Hương và Phai» theo sách in năm 2026 |
| #97 | Phiên N24,: Phiên N24: dò ngân hàng Toán 6 giữa kì I với bản PDF SGK Toán 6 tập một |
| #98 | Phiên 9l bổ sung: đối chiếu KHTN 6 với SGK ở mục “Bộ SGK thống nhất” (taphuan.nxbgd.vn) |
| #99 | Ô đang chọn: một màu xanh ở mọi môn (4 bài ôn dạng trang) |
| #101 | Kiểm thử UX5 hết lúc qua lúc không: tua đồng hồ bằng setSystemTime |
| #103 | Phiên 9m: Ngữ văn 6 theo sách in năm 2026 (L37) |
| #104, #107 | Phiên N23: ngân hàng Toán 4 giữa kì I (Bài 1–19); Phiên N23 (tiếp): dò ngân hàng Toán 4 giữa kì I với sách bản in năm 2026 |
| #106 | Phiên N23b: ngân hàng Tiếng Việt 4 giữa kì I (Bài 1–16) |
| #110 | Chữ đè lên nhau: danh sách bài của bài ôn l4, l6; kiểm thử chữ đè cho mọi màn |
| #111 | Phiên N25: ngân hàng KHTN 6 giữa kì I (77 câu), Công nghệ 6 giữa kì I (50 câu) |
| #112 | Phiên N25b: ngân hàng Tiếng Anh 6 giữa kì I (78 câu), Lịch sử và Địa lí 6, Tin học 6 giữa kì I (50 câu mỗi môn) |
| #113 | Phiên Lịch các khối mới: kì thi năm học 2026–2027 của lớp 5, 7–12; gia đình đang dùng nhận kì thi mới |
| #114 | Phiên N8: ngân hàng Toán 6 giữa kì II (Bài 23–35), 108 câu; tests/toan6-gk2.js; phạm vi 8 môn của gk2-l6 |
| #115 | Phiên N9: ngân hàng Ngữ văn 6 giữa kì II (Bài 6–7), 81 câu |
| #116 | Hình đại diện: thêm 6 hình hải cẩu vẽ riêng |
| #119 | Phiên 9n: Bỏ qua rồi quay lại, bảng số câu ở đề ngân hàng (L38, L39) |
| #121 | Phiên N10: ngân hàng Tiếng Anh 6 giữa kì II (Global Success 6, Unit 7–9), 75 câu |
| #122 | Phiên 9nb: chú thích dưới bảng số câu (X28, X29) |
| #123 | Phiên 9o: bỏ qua rồi quay lại, bảng số câu ở 4 bài ôn dạng trang (L38, L39) |
| #124 | Phiên N11: ngân hàng KHTN 6 giữa kì II (Bài 25–39, Đa dạng thế giới sống), 76 câu |
| #125 | Phiên N12: ngân hàng Lịch sử và Địa lí 6, GDCD 6 giữa kì II, 100 câu |
| #126 | Phiên N12b: ngân hàng Tin học 6, Công nghệ 6 giữa kì II (Bài 9–13; Bài 7–10), 100 câu |
| #127 | Phiên N7: ngân hàng Toán 4 giữa kì II, nâng hai đề có sẵn lên 106 câu (ma trận 10 – 8 – 7) |
| #130 | Phiên N7b: ngân hàng Tiếng Việt 4 giữa kì II, nâng hai đề có sẵn lên 100 câu (ma trận 10 – 8 – 7) |
| #132 | Phiên 9ob: bài ôn dạng trang, hai nút một hàng, một nhãn trên câu (X30, X31) |
| #133 | Phiên UI2: nút chính và phím Vào bị tắt có nền line, chữ muted (X32) |
| #134 | Phiên UX7: quản lí đề: chọn đề cho kì thi theo khối, danh sách đề, xem trước khi nhập đề (X11–X13) |
| #135 | Phiên DS1: dò bài ôn giữa kì I lớp 4, 6 với sách in năm 2026 (L40–L42, Phiên 9p, 9q) |
| #137 | Phiên 9p: bài ôn giữa kì I lớp 4 theo sách in năm 2026 (L40, L41) |
| #139 | Phiên 9q: phần Toán của bài ôn giữa kì I lớp 6 theo sách in năm 2026 (L42) |
| #143 | Phiên UX8: gửi báo cáo tuần: xem trước tin nhắn, Gửi báo cáo, Chép tin nhắn, nút In (X14) |
| #145 | Phiên N26: Toán 6 giữa kì I, Đề 3, Đề 4 theo Chương I, II, IV (trường dạy song song số và hình) |
| #146 | Phiên DS2: dò Lịch sử 6 Bài 1–6 với sách in năm 2026 |
| #147 | Phiên DS2b: dò Địa lí 6 Bài 1–8 với sách in năm 2026 |
| #148 | Phiên DS3b: dò Luyện từ và câu Tiếng Việt 4 Bài 1–16 với sách in năm 2026 |
| #149 | Phiên DS3: dò Đọc hiểu, Chính tả, Viết Tiếng Việt 4 giữa kì I với sách in năm 2026 |
| #150 | Phiên UX7b: sửa sau kiểm thử UX7, UX8 (X33–X37) |
| #151 | Phiên DS4: dò KHTN 6 Bài 1–8 với sách in năm 2026 |
| #152 | Phiên DS4b: dò KHTN 6 Bài 9–17 với sách in năm 2026 |
| #153 | Kiểm thử R1 hết lúc qua lúc không: Bin trả lời sai có chủ ý |
| #155 | Phiên DS5: dò Tiếng Anh 6 Unit 1–3 với sách in năm 2026 |
| #156 | Phiên DS6: dò Tin học 6 Bài 1–5 với sách in năm 2026 |
| #158 | Phiên DS7: dò Công nghệ 6 Bài 1–3 với sách in năm 2026 |
| #159 | Phiên DS2c: dò Lịch sử 6 Bài 7–15 với sách in năm 2026 |
| #160 | Phiên DS2d: dò Địa lí 6 Bài 10–22 với sách in năm 2026 |
| #161 | Phiên DS4c: dò KHTN 6 Bài 18–24 với sách in năm 2026 |
| #162 | Phiên DS5b: dò Tiếng Anh 6 Unit 4–6 với sách in năm 2026 |
| #163 | Phiên DS9b: dò Tiếng Anh 6 tập 2 giữa kì II với sách in năm 2026 |
| #164 | Phiên DS6b: dò Tin học 6 Bài 6–13 với sách in năm 2026 |
| #165 | Phiên DS8: dò Toán 6 Chương I–II (Bài 1–12) với sách in năm 2026 |
| #166 | Phiên DS7b: dò Công nghệ 6 Bài 4–10 với sách in năm 2026 |
| #167 | Phiên DS8b: dò Toán 6 Chương III–V (Bài 13–22) với sách in năm 2026 |
| #169 | Phiên DS9: dò GDCD 6 cuối kì I, giữa kì II với sách in năm 2026 |
| #170 | Phiên DS10: dò Lịch sử và Địa lí 4 cuối kì I (Bài 1, vùng Trung du và miền núi phía Bắc) với sách in năm 2026 |
| #171 | Phiên DS10b: dò Lịch sử và Địa lí 4 cuối kì I (vùng Đồng bằng Bắc Bộ) với sách in năm 2026 |
| #172 | Phiên DS10c: dò Khoa học 4 cuối kì I, chủ đề Chất với sách in năm 2026 |
| #173 | Phiên DS10d: dò Khoa học 4 cuối kì I, chủ đề Năng lượng, Thực vật và động vật với sách in năm 2026 |
| #174 | Phiên 9r: script bọc chạy kiểm thử như vào ngày khác với Playwright 1.63 (L43) |
| #175 | Phiên DS11: dò Tiếng Việt 4 cuối kì I (Đọc hiểu, Chính tả, Viết, Luyện từ và câu từ Bài 17) với sách in năm 2026 |
| #175 | Phiên DS11b: dò hai đề có sẵn của Tiếng Việt 4 giữa kì II với sách in năm 2026 (cùng PR với DS11) |
| #176 | Phiên DS12: dò Tiếng Anh 4 tập một cuối kì I, Unit 1–5 với sách in năm 2026 |
| #176 | Phiên DS12b: dò Tiếng Anh 4 tập một cuối kì I, Unit 6–10 và Reading với sách in năm 2026 (cùng PR với DS12) |
| #176 | Phiên DS12c: dò Tin học và Công nghệ 4 cuối kì I với sách in năm 2026 (cùng PR với DS12) |
| #178 | Phiên N18: ngân hàng Toán 6 cuối năm (Bài 23–43), 100 câu; tests/toan6-ck2.js; phạm vi 8 môn của ck2-l6 |
| #180 | Phiên 9s: bài ôn IOE 6 thêm lộ trình cấp trường (School Level, Unit 1–4) |
| #181 | Phiên N19: ngân hàng Ngữ văn 6 cuối năm (Bài 6–9), 75 câu |
| #182 | Phiên N20: ngân hàng Tiếng Anh 6 cuối năm (Unit 7–12), 75 câu |
| #183 | Phiên N-IOE: lộ trình National Level (IOE cấp quốc gia) cho bài ôn ioe-4, ioe-6 |
| #184 | Phiên N21: ngân hàng KHTN 6 cuối năm (Bài 40–55), 75 câu; tests/khtn6-ck2.js |
| #185 | Phiên DS-IOE: dò câu cũ của bài ôn ioe-4, ioe-6 với sách in năm 2026 |
| #186 | Phiên N22: ngân hàng Lịch sử và Địa lí 6, GDCD 6 cuối năm, 100 câu; tests/lsdl-gdcd6-ck2.js |
| #187 | Phiên DS-IOE (bổ sung): sửa hai câu ioe-4 trùng, lộ đáp án giữa các cấp; bảng mốc |
| #189 | Phiên N22b: ngân hàng Tin học 6, Công nghệ 6 cuối năm, 100 câu; tests/tin-congnghe6-ck2.js |
| #190 | Phiên N13: ngân hàng Toán 4 cuối năm, 100 câu; tests/toan4-ck2.js |
| #191 | Phiên N14: ngân hàng Tiếng Việt 4 cuối năm, 102 câu |
| #192 | Phiên N15: ngân hàng Tiếng Anh 4 cuối năm (Unit 11–20), 74 câu |
| #194 | Phiên N16: ngân hàng Khoa học 4 cuối năm, 75 câu; tests/khoahoc4-ck2.js |
| #195 | Phiên 9t: sửa hai kiểm thử báo lỗi giả, tests/bai-on-l6.js (L45) và câu chữ cái IOE trong tests/e2e.js (L46) |
| #196 | Phiên N17: ngân hàng Tin học và Công nghệ 4 cuối năm, 50 câu; tests/tincn4-ck2.js |
| #197 | Phiên N16b: ngân hàng Lịch sử và Địa lí 4 cuối năm, 75 câu; tests/lsdl4-ck2.js |
| #198 | Phiên K5: đề tính điểm cho đề thi thử vào 10 và tốt nghiệp THPT |
| #201 | Phiên N9-ck1-toan: ngân hàng Toán 9 cuối kì I, 100 câu; tests/toan9-ck1.js; phạm vi 8 môn của ck1-l9 |
| #202 | Phiên N9-ck1-van: ngân hàng Ngữ văn 9 cuối kì I, 75 câu; tests/van9-ck1.js |
| #204 | Phiên N9-ck1-khtn: ngân hàng KHTN 9 cuối kì I, 75 câu; tests/khtn9-ck1.js |
| #205 | Phiên N9-ck1-ta: ngân hàng Tiếng Anh 9 cuối kì I, 75 câu; tests/ta9-ck1.js |
| #207 | Phiên N9-ck1-tin-congnghe: ngân hàng Tin học 9, Công nghệ 9 cuối kì I, mỗi môn 50 câu; tests/tin-congnghe9-ck1.js |
| #208 | Phiên N9-ck1-lsdl-gdcd: ngân hàng Lịch sử và Địa lí 9, GDCD 9 cuối kì I, mỗi môn 50 câu; tests/lsdl-gdcd9-ck1.js |
| #209 | Phiên N9-gk2-toan: ngân hàng Toán 9 giữa kì II, 100 câu; tests/toan9-gk2.js |

</details>

## 2. Việc của chủ app (không tốn lượt Claude)

**Đang làm (từ 18/10/2026):**
1. **Supabase:**
   - Chạy một lần, nếu chưa chạy (SQL Editor → dán → Run; xem `docs/HUONG-DAN-SUPABASE.md`): `supabase/cap-nhat-k2.sql`, `supabase/cap-nhat-r1.sql` (sau Phiên R1), `supabase/cap-nhat-lich.sql` (sau PR #113).
   - Giữ gói Free đến khi bắt đầu thu tiền. Gói này không có sao lưu và dự án tự tạm dừng khi cả tuần không ai dùng, nên:
     - mỗi tuần vào Table Editor xuất CSV các bảng `families`, `profiles`, `results`, `exam_events`, `question_banks`, cất vào Google Drive;
     - dịp nghỉ dài (Tết, hè) vẫn mở app ít nhất mỗi tuần một lần; bị tạm dừng thì vào Supabase bấm Restore.
2. **Liên hệ:** điền `contactText`, `contactUrl` (ví dụ link Zalo) trong `js/config.js`, để người mở trang biết hỏi ai; muốn thẻ “Chưa có tài khoản?” ghi khác (ví dụ "Nhắn Zalo cho cô Lan để được mời") thì điền thêm `signupText`, `signupUrl`. `main` đang được bảo vệ: sửa trên GitHub thì chọn "Create a new branch… and start a pull request", rồi tự Merge.
3. **Ghi chỗ khó dùng** khi các con dùng thật, đến khoảng 25/10. Mỗi chỗ một dòng: ai dùng · màn hình · định làm gì · vướng ở đâu · khó chịu hay không làm được. Phiên UX1–UX8 dùng ghi chép này. Bản rà giao diện ngày 18/10 ([CAI-TIEN-UX-2X.md](CAI-TIEN-UX-2X.md), ảnh 1.x và 2.x đặt cạnh nhau) đã có đề xuất cho từng màn: khi ghi, xem con có vướng đúng những chỗ đó không, và thêm những chỗ khác.
4. **Đổi quyết định:** báo PO; PO sửa đoạn “Đã chốt” ở đầu file này rồi đồng bộ các tài liệu khác (như Phiên D0, PR #89).
5. **Theo dõi chạy thử:** tháng 6/2027 đã mở bán, nên đo ngay từ bây giờ xem gia đình có thật sự dùng: số gia đình được mời (từ tháng 3/2027 tính cả gia đình dùng thử), số lượt làm bài mỗi tuần, gia đình còn dùng sau 4 tuần. Cuối học kì I hỏi vài gia đình đang dùng, rồi trong tháng 4–5/2027 hỏi các gia đình dùng thử "app có đáng trả tiền không, khoảng bao nhiêu" (câu trả lời cất ở tài liệu riêng, không ghi số tiền vào repo). Ghi vào mục 5 "Nhật ký chạy thử" ở cuối file này.

**Thường xuyên:**

6. Rà đề mới: cho con làm thử; câu sai thì bấm “Báo câu này sai” ngay trong app (Phiên R1). Chủ app xem và xử lí ở trang admin → tab Câu bị báo (bản lưu trên máy: Quản trị → Dữ liệu → Chép để gửi). GitHub Issues chỉ còn cho chủ app.
   - Nếu chưa thử: L27 trên máy đang dùng (làm lại một đề đúng hết thì “Ôn câu sai” không còn câu của đề đó, PR #57); L29–L31 trên iPhone thật (PR #74; các bước ở mục 2 của [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md), Phiên 9h).
7. Trường báo lịch chính thức thì sửa ngày trong Khu phụ huynh → Lịch thi.
8. Trước khi mở dùng thử (cuối tháng 2/2027, sau B1): bật CAPTCHA (bước 8 của `docs/HUONG-DAN-SUPABASE.md`; Hostnames là tên miền mới).

**Chuẩn bị dùng thử (đầu tháng 3/2027) và bán (tháng 6/2027):**

9. Theo mốc ở đầu file; vì sao cần từng việc: mục 5 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md).
   - Trước 31/1/2027, chốt và báo PO:
     - cách mời gia đình dùng thử: mặc định chủ app tạo tài khoản ở `admin.html` như bây giờ, hợp với vài chục gia đình; muốn mở tự đăng kí thì đổi quyết định ở đầu file, cần thêm một phiên kĩ thuật;
     - ngày hết dùng thử (hết các kì thi năm học 2026–2027), để điền vào lời giao việc G0;
     - có lên Supabase Pro ngay khi mở dùng thử không: gói Free không có sao lưu, dữ liệu của gia đình dùng thử chỉ còn bản CSV hằng tuần.
   - Cũng trước 31/1/2027: mua tên miền cho B1; nhờ người hiểu luật xem trước khung trang Quyền riêng tư (G0), vì dữ liệu là của trẻ em.
   - Tháng 2/2027, khi làm B1: gửi các gia đình đang dùng lời nhắn chuyển sang địa chỉ mới (mẫu ở Pull Request của B1); bật CAPTCHA (việc 8).
   - Tháng 3–4/2027: hỏi kế toán về thuế hộ, cá nhân kinh doanh, hóa đơn.
   - Giữa tháng 5/2027: chốt hạn mức gói Miễn phí, gói Gia đình và quyền lợi của gia đình dùng thử sau khi hết dùng thử, điền vào lời giao việc G1.
   - Sau G1 (cuối tháng 5/2027): thông báo website với Bộ Công Thương (online.gov.vn); lên Supabase Pro trước ngày mở bán.
   - Việc hành chính nào chưa xong thì lùi ngày mở bán; dùng thử vẫn chạy đến hết kì thi.

**Sách giáo khoa** (bộ Kết nối tri thức dùng thống nhất từ năm học 2026–2027; cách mở bản PDF và link từng cuốn: mục 4 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md), đoạn “Sách”):

10. Dò sách in năm 2026 là việc của các phiên DS (hàng đợi ở mục 7 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md)), không phải của chủ app (chủ app yêu cầu 23/10/2026). Phiên làm đề không mở được sách thì ghi mã đề vào dòng “Đề chờ dò sách” ở mục 7, PO lập phiên DS. Từ 24/10/2026 chủ app tải file “SGK …” (mục “Phiên bản sách điện tử” của trang sách) của các cuốn ở bảng “Sách và link của từng phiên” chưa có trong repo riêng tư OnUp-Book, theo thứ tự hàng đợi, rồi gửi PO; PO đưa lên repo đó, các phiên đọc sách ở đó (mục 4 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md), đoạn “Sách đã tải sẵn”). Một phiên DS hai lần không mở được sách thì ghi một dòng ngay dưới đây (phiên, sách, lỗi, ngày) để chủ app tải cuốn đó trước.
    - Ba cuốn lớp 4, 6 thiếu nửa sau đã đủ (25–26/10/2026).
    - Sách lớp 9 đã có (26/10/2026; PO đã viết lời giao việc cuối kì I, giữa kì II lớp 9). Sách lớp 7, 8, 10–12 do việc định kì “OnUp-Book · Lấy sách lớp 7, 8, 10–12” lấy dần; lớp 12 trước, vì PO viết lời giao việc lớp 12 tiếp sau lớp 9 (mục 4 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md), nguyên tắc 6). Lớp 5 đã có.
11. Theo dõi danh mục sách chỉnh sửa cho năm học 2027–2028 (lần trước Bộ công bố ngày 26/12/2025); có danh mục thì báo PO để lập các phiên rà đề (mục 4 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md), đoạn “Sách”). Phiên nào cần mục lục bản mới thì chủ app chép mục lục vào lời giao việc.

**Quy định kiểm tra:**

12. Theo dõi thông báo của Sở GD&ĐT (tỉnh mình; Hà Nội, TP.HCM) về đề kiểm tra định kì chung lớp 5, 9, 12 (Thông tư 89/2026/TT-BGDĐT, từ 1/12/2026): môn nào, cấu trúc đề, ngày kiểm tra cuối kì I (tháng 12/2026–1/2027). Có thì báo PO để ghi vào lời giao việc các khối đó (mục 2 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md)).

## 3. Lộ trình khi làm tiếp

Mỗi dòng là **một phiên Claude Code riêng** (mở claude.ai/code, chọn repo `dunglnh/OnUp`, dán lời giao việc, xem Pull Request rồi Merge). Lời giao việc chỉ giữ cho phiên chưa làm: **phiên làm đề, dò sách, kĩ thuật cho đề ở hàng đợi, mục 7 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md): mở từ trên xuống**; phiên sửa lỗi ở mục 3 của [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md); phiên khác ở mục 4 dưới đây. Phiên giao diện (UX, UI) có lượt kiểm thử thiết kế ở mục 5 của [CAI-TIEN-UX-2X.md](CAI-TIEN-UX-2X.md) (bản 3.x: mục 6 của [CAI-TIEN-UX-3X.md](CAI-TIEN-UX-3X.md)); chỗ lệch thành phiên sửa ngắn “b” (như UX3b, 9nb, 9ob). Thiết kế ở file Figma [OnUp](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=70-2) (bản 3.x: trang [Master 3.x](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=329-2)).

Thứ tự các phiên:

| Thứ tự | Hạn | Phiên | Cần trước | Ghi chú |
|---|---|---|---|---|
| 1 | 15/11/2026 | Lớp 9 (33 phiên, có 9 phiên đề thi thử vào 10); phiên rà soát lớp 9. Cuối kì I, giữa kì II (12 phiên N9-ck1-*, N9-gk2-*) đã vào hàng đợi (26/10/2026) | K5 (đã xong, PR #198; chỉ trước đề thi thử vào 10) | thứ tự khối, thứ tự kì trong mỗi khối và mốc kiểm tra: mục 4 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md); các bước trước khi bật một khối: mục 7 (“Lớp 5, 7–12”) |
| song song | UX9 15/11 · UX11 22/11 · UX10 6/12 · UX12 13/12 · UX14 20/12/2026 | **UX9 → UX11 → UX10 → UX12 → UX14 · Giao diện 3.x** (chủ app chọn 27/10/2026; vấn đề, cách làm, ảnh ở [CAI-TIEN-UX-3X.md](CAI-TIEN-UX-3X.md)) | UX14 sau UX9, UX11 | phiên mở tay, chạy xen với phiên làm đề; không chạy cùng lúc hai phiên sửa `js/app.js` hay `js/quiz.js`; UX10 xong trước kì cuối kì I (lớp 6 từ 21/12), chủ app thử file lịch trên iPhone, Android trước khi Merge; UX13 không làm; lời giao việc ở mục 4; phiên xong thì bỏ tên mình khỏi dòng này, phiên cuối xóa cả dòng |
| 2 | 10/12/2026 | Lớp 12 (53 phiên, có 25 phiên đề thi thử tốt nghiệp), lớp 5 (16); mỗi khối một phiên rà soát | | cuối kì I của lớp 12 (thi từ 14/12/2026, xong trước 23/11) rồi của lớp 5 (thi từ 28/12, xong trước 7/12) làm trước các kì khác |
| 3 | 31/12/2026 | Lớp 7, 8 (mỗi khối 24 phiên); mỗi khối một phiên rà soát | | |
| 4 | 20/1/2027 (dự phòng đến 28/2/2027) | Lớp 10, 11 (mỗi khối 28 phiên); mỗi khối một phiên rà soát; sửa lỗi các phiên rà soát tìm ra | | xong là đủ đề lớp 4–12 và rà xong; phần dự phòng cho sửa lỗi, rà đề, nghỉ Tết |
| 5 | 28/2/2027 | **G0 · Chuẩn bị dùng thử** → **B1 · Chuyển hosting sang Cloudflare Pages, repo riêng tư** | | trước khi mở dùng thử (đầu tháng 3/2027); lời giao việc ở mục 4 |
| 6 | 31/5/2027 | **B2 · Đề trả phí lên máy chủ** → B4 (bớt tải dữ liệu) → **G1 · Kích hoạt gói, màn hình Nâng cấp** | B1 | trong thời gian dùng thử, xong trước khi mở bán (tháng 6/2027); lời giao việc ở mục 4, B4 ở [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md) mục 5 |
| 7 | 31/8/2027 | Rà đề theo sách chỉnh sửa năm 2027 (dự trù khoảng 15 phiên, theo danh mục Bộ công bố); Lịch 2027–2028 (khi Bộ, Sở công bố khung năm học); gộp bài ôn dạng trang vào ngân hàng | | trước năm học 2027–2028: khách mua từ tháng 6/2027 dùng đề cho năm học đó (mục 4 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md), đoạn “Sách”) |
| — | khi có | **Sửa lỗi từ góp ý chạy thử**: QC ghi mã lỗi (tiếp theo L47) và lời giao việc phiên 9 + chữ cái ở [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md) | | chen vào bất cứ lúc nào; gấp thì xếp vào bảng “Làm ngay” |

Từ 25/10/2026 còn khoảng 232 phiên (217 phiên làm đề, K5, 7 phiên rà soát, Lịch 2027–2028, gộp bài ôn dạng trang, G0, B1, B2, B4, G1; mục 2 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md)), cùng phiên sửa lỗi. Ngày 20–25/10/2026 xong khoảng 9 phiên của kế hoạch mỗi ngày (cả phiên dò sách); cột Hạn tính với 3 phiên mỗi ngày cho các khối mới, nên đủ đề lớp 4–12 khoảng giữa tháng 1/2027, sớm hơn mốc tháng 2/2027 khoảng 6 tuần (mục 4 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md)). Cột Hạn là mốc kiểm tra theo nhịp (hạn theo kì thi trong ngoặc); chậm hơn mốc quá một tuần thì PO báo chủ app và lùi theo mục 4 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md). Phiên rà soát của mỗi khối không bỏ khi chậm.

Lưu ý: đến B1 (tháng 2/2027) repo vẫn công khai, ai cũng tải được trọn bộ đề (chủ app chấp nhận 18/10/2026); giữ đề thật sự cần B2, làm trước khi bán.

Không chạy cùng lúc hai phiên cùng sửa `js/app.js` hoặc `js/quiz.js`; các phiên N chỉ sửa file đề nên chạy xen được.

**Để sau, chỉ làm khi có nhu cầu thật:** nhập đề từ Excel (Phiên 6 cũ); tự đăng ký (xem lại khi chủ app chốt cách mời gia đình dùng thử, việc 9 ở mục 2); email để tự lấy lại mật khẩu; tài khoản giáo viên, lớp học (mục 7 của [THIET-KE-TAI-KHOAN.md](THIET-KE-TAI-KHOAN.md)).

**Mẹo tiết kiệm lượt dùng gói Pro:**
- Một phiên một việc, giao việc rõ ràng. Phiên càng dài càng tốn, vì mỗi lượt Claude đọc lại toàn bộ cuộc trò chuyện.
- Chỉ yêu cầu **một vòng** tự rà soát; nhiều vòng rà soát và phiên “điều phối” nhiều trợ lý là phần tốn nhất trước đây.
- Mỗi việc lớn mở một cuộc trò chuyện mới thay vì nói tiếp trong cuộc cũ.
- Xem mức “This week” ở Settings → Usage trước khi mở phiên; giới hạn tuần làm mới mỗi thứ Sáu khoảng 13:00.
- Merge từng Pull Request trước khi mở phiên sửa cùng file.
- Phiên cloud dùng chung giới hạn tuần của gói Pro với phần chat (credit cloud đã hết từ 16/10/2026). Phiên tự chạy và phiên mở tay chạy cùng lúc thì hết lượt nhanh hơn.
- Tài liệu càng dài thì phiên càng tốn, vì mỗi lượt gửi lại những gì đã đọc: phiên đọc theo đoạn (Quy định chung của các phiên N ở mục 7 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md)), file này giữ ngắn (quy ước ở đầu file).

## 4. Lời giao việc (dán nguyên vào phiên mới)

Chỉ giữ lời giao việc của phiên chưa làm (phiên UX, UI đã xong thì giữ đến khi kiểm thử thiết kế xong, mục 5 của [CAI-TIEN-UX-2X.md](CAI-TIEN-UX-2X.md), bản 3.x mục 6 của [CAI-TIEN-UX-3X.md](CAI-TIEN-UX-3X.md)). Phiên làm đề: mục 7 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md); phiên sửa lỗi: mục 3 của [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md). Các phiên dưới đây theo thứ tự ở mục 3; bấm tên phiên để mở lời giao việc.

<details><summary>Phiên UX9 · Con biết mình đã ôn đến đâu (X38–X40; hạn 15/11/2026)</summary>

**Phiên UX9 · Con biết mình đã ôn đến đâu** (X38–X40; hạn 15/11/2026; sửa `js/app.js`, `css/app.css`)
> Đọc CLAUDE.md và docs/CAI-TIEN-UX-3X.md (mục 2, nguyên tắc giữ nguyên; mục 4, Phiên UX9: X38–X40, cách làm, “Xong khi”; ảnh docs/hinh-ux-3x/ux9-bai-on.jpg, ux9-hom-nay.jpg, ux9-trang-rong.jpg). Sửa trong js/app.js, css/app.css, cho cả hai bản; không đổi dữ liệu:
> - X38: một hàm tiến độ dùng chung cho mỗi kì thi trả số bài đã làm trên tổng số bài ôn dạng trang và đề cố định của kì, cùng tỉ lệ đúng của lần làm gần nhất. Bốn chỗ dùng hàm này phải cùng chữ, cùng số:
>   - tóm tắt nhóm kì thi ở tab Bài ôn: dòng “Đã làm 3/5 bài · đúng 82%” và thanh 6px;
>   - thẻ kì thi (`.ready`);
>   - link ở thẻ Hôm nay;
>   - huy hiệu “Hết đề”.
>
>   Nút đề đã làm thành nút viền có dấu ✓ (`btn sm done`; không dùng tên lớp `.ck`). Đề chưa làm và đề ngẫu nhiên vẫn vàng. Trang “Bài ôn của <tên>” của bố mẹ cũng có ✓.
> - X39: huy hiệu có tiến độ: tối đa hai mục tiêu kế tiếp (`.bdg-list`), huy hiệu đã có ở hàng “Đã có:”, dòng gợi ý ghi cả hai mục tiêu.
> - X40: hôm nay con đã có kết quả thì thẻ đầu trang Hôm nay thành “Bạn đã ôn rồi. Giỏi lắm!” (nền `ok-soft`, hải cẩu tung bóng 64px, nút viền “Làm thêm một bài”). Trang rỗng có hình hải cẩu, một câu, một nút (`.empty`): tab Kết quả; Hôm nay và Bài ôn khi khối chưa có đề; Lịch thi khi không còn kì thi. Chữ theo vai: con và bố mẹ bản đám mây không còn thấy “Quản trị viên… mục Quản trị”.
>
> Mỗi vấn đề một commit ghi mã. Thêm các bước ở mục “Xong khi” vào tests/e2e.js, chạy tests/e2e.js và tests/supabase/cloud-e2e.js đến khi in OK. Ghi phần mô tả code vào CLAUDE.md, một mục như “Gửi báo cáo tuần (Phiên UX8)”. Chụp ảnh 360px sáng/tối, chép sang docs/hinh-ux9/, chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh.

</details>

<details><summary>Phiên UX11 · Bảng câu ở màn kết quả (X42; hạn 22/11/2026)</summary>

**Phiên UX11 · Bảng câu ở màn kết quả** (X42; hạn 22/11/2026; sửa `js/quiz.js`, `css/app.css`)
> Đọc CLAUDE.md và docs/CAI-TIEN-UX-3X.md (mục 2; mục 4, Phiên UX11: X42, cách làm, “Xong khi”; ảnh docs/hinh-ux-3x/ux11-bang-cau.jpg). Sửa màn kết quả của Quiz.run (js/quiz.js, css/app.css), dùng chung cho cả hai bản; chữ mới thêm ở cả hai cột `vi`, `en` của `TXT`:
> - Ngay dưới hàng nút “Ôn lại N câu sai” / “Làm lại cả đề” có bảng câu `section.panel#qzSheet`:
>   - lưới `.qz-cells` như bảng số câu của Phiên 9n, mỗi câu một `button.qz-cell`: `st-ok` có ✓; `st-bad` có ✗, kể cả câu chưa làm của bài làm như thi; câu tự luận là `st-done`;
>   - chú thích `.qz-key` chỉ ghi mục có câu;
>   - dòng “Chạm vào số câu để xem lại câu đó.”
> - Chạm ô câu sai thì mở `details.rv` của câu đó trong `#qzReview`, cuộn tới và đặt focus. Chạm ô câu đúng hoặc câu tự luận thì hộp `#qzPeek` (kiểu `.report-box`) mở ngay dưới lưới: “Câu 7 · Đúng”, nút “Đóng”, câu hỏi, đáp án, lời giải, link báo câu sai. Chạm lại ô đó hoặc bấm “Đóng” thì hộp đóng.
> - Đề tính điểm (K5) cũng có bảng. Lượt “Ôn lại câu sai” chỉ có các câu của lượt đó. Đề Tiếng Anh dùng chữ tiếng Anh.
>
> Không đổi cách chấm, cách lưu. Thêm các bước ở mục “Xong khi” vào tests/e2e.js (cả bước TA2). Chạy tests/e2e.js, tests/supabase/cloud-e2e.js và node tests/kiem-tra-de.js đến khi in OK. Ghi phần mô tả code vào CLAUDE.md, mục “Làm bài tập trung”. Chụp ảnh 360px sáng/tối, chép sang docs/hinh-ux11/, chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh.

</details>

<details><summary>Phiên UX10 · Nhắc lịch thi và giờ ôn bằng lịch của điện thoại (X41; hạn 6/12/2026)</summary>

**Phiên UX10 · Nhắc lịch thi và giờ ôn bằng lịch của điện thoại** (X41; hạn 6/12/2026, trước kì cuối kì I; sửa `js/app.js`, `css/app.css`)
> Đọc CLAUDE.md và docs/CAI-TIEN-UX-3X.md (mục 2; mục 4, Phiên UX10: X41, cách làm, “Xong khi”; ảnh docs/hinh-ux-3x/ux10-lich-dien-thoai.jpg). Sửa trong js/app.js, css/app.css, cho cả hai bản. Không đổi dữ liệu, không gửi gì lên mạng, không đổi sw.js:
> - Chi tiết kì thi có ngày (openEvent, mọi vai trò) có khối `div.cal-add#evIcs` ngay sau dòng ngày. Nút “Thêm vào lịch điện thoại” tạo file `onup-<mã kì thi>.ics`: sự kiện cả ngày, hai lời nhắc lúc 19:00 trước 7 ngày và trước 1 ngày, `UID` cố định. Kì dự kiến có thêm dòng nhắc sửa ngày rồi thêm lại.
> - Thẻ “Nhắc con ôn bài” `section.panel#studyRemind` nằm ở Cài đặt của Khu phụ huynh (bản đám mây, sau Hồ sơ con) và ở trang chủ phụ huynh bản lưu trên máy (dưới thẻ các con). Trong thẻ:
>   - chọn ngày bằng `.day-pick`, mặc định T2–T6;
>   - chọn giờ, mặc định 19:30;
>   - nút tạo file `onup-nhac-on-bai.ics` lặp theo tuần (`VTIMEZONE` Asia/Ho_Chi_Minh, `RRULE` theo ngày đã chọn, 20 phút).
>
>   Lựa chọn gần nhất nhớ ở localStorage (bọc try/catch).
> - Đưa file cho máy như `backupNow`: máy chia sẻ được file thì `navigator.share`, không thì tải về. Người dùng hủy thì thôi. Tải xong hoặc lỗi thì có toast.
>
> Thêm các bước ở mục “Xong khi” vào tests/e2e.js (đọc nội dung hai file tải về) và một kiểm tra thẻ ở Cài đặt vào tests/supabase/cloud-e2e.js. Chạy hai bộ đến khi in OK. Ghi phần mô tả code vào CLAUDE.md. Chụp ảnh 360px sáng/tối, chép sang docs/hinh-ux10/, chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh. Mô tả Pull Request ghi các bước chủ app thử trên iPhone (Safari, và app trên Màn hình chính) và Android trước khi Merge.

</details>

<details><summary>Phiên UX12 · Báo cáo các tuần trước, sửa nhỏ (X43–X45; hạn 13/12/2026)</summary>

**Phiên UX12 · Báo cáo các tuần trước, sửa nhỏ** (X43–X45; hạn 13/12/2026; sửa `js/app.js`, `css/app.css`)
> Đọc CLAUDE.md và docs/CAI-TIEN-UX-3X.md (mục 2; mục 4, Phiên UX12: X43–X45, cách làm, “Xong khi”; ảnh docs/hinh-ux-3x/ux12-bao-cao-tuan.jpg). Sửa trong js/app.js, css/app.css, cho cả hai bản:
> - X43: báo cáo của con (renderReport) có `nav.wk-nav#rpWeek` ngay dưới `#rpHead`, thay dòng “Báo cáo …”.
>   - Nút ‹ “Tuần trước” và › “Tuần sau” cỡ 44×44px. › tắt ở tuần này, ‹ tắt ở tuần có kết quả đầu tiên. Ở giữa là khoảng ngày và dòng “7 ngày gần nhất”, “Tuần trước” hoặc “3 tuần trước”.
>   - Hash `#/child/<mã>?tuan=<n>`.
>   - Theo tuần đang chọn: tin nhắn, ô số liệu, số bài từng ngày, điểm theo môn, chủ đề hay sai, bài đã làm. Theo hôm nay: kì thi sắp tới, gợi ý.
>   - `#rpOlder` chỉ có ở tuần này. Bản in in tuần đang chọn.
> - X44: thẻ của con chưa làm bài hôm nay ghi “0 bài” · “hôm nay”, không ghi “Chưa ôn”.
> - X45: `.btn` có viền 1px trong suốt, để nút chính và nút viền đứng cạnh nhau cao bằng nhau. Soát các chỗ `.btn` có viền riêng, chụp lại các màn có hai nút cạnh nhau.
>
> Mỗi vấn đề một commit ghi mã. Thêm các bước ở mục “Xong khi” vào tests/e2e.js (bước UX2 hoặc UX8), chạy tests/e2e.js và tests/supabase/cloud-e2e.js đến khi in OK. Ghi phần mô tả code vào CLAUDE.md, mục “Gửi báo cáo tuần” và “Khu phụ huynh gọn lại”. Chụp ảnh 360px sáng/tối, chép sang docs/hinh-ux12/, chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh.

</details>

<details><summary>Phiên UX14 · Ôn 10 câu theo chủ đề hay sai (X48; sau UX9, UX11; hạn 20/12/2026)</summary>

**Phiên UX14 · Ôn 10 câu theo chủ đề hay sai** (X48; sau UX9, UX11; hạn 20/12/2026; sửa `js/app.js`, `js/quiz.js`, `css/app.css`)
> Đọc CLAUDE.md và docs/CAI-TIEN-UX-3X.md (mục 2; mục 4, Phiên UX14: X48, cách làm, “Xong khi”; ảnh docs/hinh-ux-3x/ux14-on-chu-de.jpg). Sửa trong js/app.js, js/quiz.js, css/app.css, cho cả hai bản; không đổi bảng, không đổi kho:
> - Tab Kết quả: `#weakTopics` thành danh sách tối đa 3 chủ đề. Mỗi dòng có tên, “<môn> · N câu sai” và nút “Ôn 10 câu”; các chủ đề còn lại ghi tên ở một dòng bên dưới.
> - Thêm lối vào ở hai chỗ:
>   - bài phụ theo chủ đề hay sai ở Hôm nay thành “Ôn 10 câu: <chủ đề>”;
>   - màn kết quả đề (`#qzTopics`) có link “Ôn 10 câu” ở chủ đề cần ôn thêm, chữ ở cả hai cột `TXT`.
> - Đề “Ôn chủ đề” ở `#/chu-de/<khối>/<mã môn>/<chủ đề>`:
>   - kho câu là các câu có `topic` đó trong đề có sẵn của khối, môn (`Store.loadBank` các file cần); chỉ dùng đề có sẵn;
>   - rút 10 câu bằng `Quiz.draw` với ma trận một chủ đề, ưu tiên câu chưa làm, câu hay sai; câu cùng đoạn đọc rút cả đoạn như K4;
>   - tên “<môn> <khối> · Ôn chủ đề · <chủ đề>”, đề Tiếng Anh thì `Quiz.title` ra “English 4 · Topic practice · <chủ đề>”;
>   - chỉ có Ôn luyện.
> - Lưu như đề: `source: "bank"`, `refId: "chu-de:<khối>:<mã môn>:<chủ đề>"`. Báo cáo tuần và chủ đề hay sai tính như đề thường. Tiến độ kì thi (X38) và `weekTips` không tính đề này. Ôn chủ đề đúng từ 80% thì chủ đề đó có nhãn “Đã ôn lại ✓” trong 7 ngày.
>
> Thêm các bước ở mục “Xong khi” vào tests/e2e.js (cả bước TA2) và phần thử rút theo chủ đề vào tests/kiem-tra-de.js. Chạy tests/e2e.js, tests/supabase/cloud-e2e.js và node tests/kiem-tra-de.js đến khi in OK. Ghi phần mô tả code vào CLAUDE.md. Chụp ảnh 360px sáng/tối, chép sang docs/hinh-ux14/, chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh.

</details>

<details><summary>Phiên G0 · Chuẩn bị dùng thử: Điều khoản, Quyền riêng tư, dòng dùng thử (tháng 2/2027, trước B1; xong trước khi mở dùng thử)</summary>

**Phiên G0 · Chuẩn bị dùng thử: Điều khoản, Quyền riêng tư, dòng dùng thử** (tháng 2/2027, trước B1; xong trước khi mở dùng thử)
> Đọc CLAUDE.md, mục 9 của docs/THIET-KE-TAI-KHOAN.md và mục 5 của docs/KE-HOACH-NOI-DUNG.md. Dùng thử miễn phí đến: […] (chủ app điền, ví dụ ngày cuối của kì thi tốt nghiệp THPT 2027). Không đổi gói, bảng plans, Store.can.
> - **Trang tĩnh** dieu-khoan.html và quyen-rieng-tu.html: nội dung khung theo Luật Bảo vệ dữ liệu cá nhân 2025 (hiệu lực 1/1/2026), để chủ app sửa lời trước khi Merge:
>   - app chỉ thu những gì ở mục “Bảo mật và quyền riêng tư” của docs/HUONG-DAN-SUPABASE.md: tên đăng nhập, tên hiển thị của gia đình; tên, hình, khối, lớp của hồ sơ con do phụ huynh tạo; kết quả làm bài; câu bị báo sai; ghi chú của chủ app về tài khoản (ví dụ cách liên lạc); không có email, số điện thoại, ngày sinh, ảnh của trẻ;
>   - dùng để con ôn và để bố mẹ theo dõi; lưu trên Supabase (Singapore); chủ app không xem bài làm của các con;
>   - phụ huynh xóa hồ sơ con trong Khu phụ huynh, nhờ chủ app xóa cả tài khoản; liên hệ theo contactText, contactUrl của js/config.js;
>   - dùng thử miễn phí đến ngày ở trên, sau đó có gói trả phí (không ghi giá).
> - Hai trang dùng css/app.css và fonts/, mở được khi chưa đăng nhập, có link về trang chính (có vào FILES của sw.js hay không theo mục “Chạy khi mất mạng” của CLAUDE.md; có thì tăng VERSION). Link tới hai trang ở màn đăng nhập (dưới thẻ “Chưa có tài khoản?”), Khu phụ huynh → Cài đặt, và cuối lời nhắn gửi phụ huynh ở trang admin (shareText).
> - **Dòng dùng thử:** js/config.js thêm trialText; có chữ thì mục Các con và Cài đặt của Khu phụ huynh hiện một dòng nhỏ (ví dụ "Bạn đang dùng thử miễn phí đến hết các kì thi năm học 2026–2027."), để trống thì không hiện. Học sinh không thấy dòng này.
>
> Chạy tests/e2e.js, tests/supabase/admin-test.mjs, store-test.mjs, cloud-e2e.js đến khi in OK, chụp ảnh 360px sáng/tối, chỉ tự rà soát một vòng, rồi mở Pull Request ghi việc chủ app cần làm sau khi Merge (điền trialText, sửa lời hai trang).

</details>

<details><summary>Phiên B1 · Chuyển hosting sang Cloudflare Pages, repo riêng tư (tháng 2/2027, sau G0; xong trước khi mở dùng thử)</summary>

**Phiên B1 · Chuyển hosting sang Cloudflare Pages, repo riêng tư** (tháng 2/2027, sau G0; xong trước khi mở dùng thử)
> Đọc CLAUDE.md và mục 5 của docs/KE-HOACH-NOI-DUNG.md. Viết docs/HUONG-DAN-CLOUDFLARE.md từng bước cho chủ app:
> 1. Tạo Cloudflare Pages từ repo (không có bước build, thư mục gốc).
> 2. Gắn tên miền riêng.
> 3. Chuyển repo OnUp sang riêng tư.
> 4. Tạo một repo công khai nhỏ cùng tên đường dẫn cũ, chỉ có trang báo "OnUp đã chuyển sang <địa chỉ mới>" và tự chuyển hướng, để gia đình mở địa chỉ cũ vẫn tìm được. Trang này gỡ service worker cũ trên máy học sinh.
> 5. Nếu đã bật CAPTCHA: thêm tên miền mới vào Hostnames của Turnstile (bước 8 của docs/HUONG-DAN-SUPABASE.md).
> 6. Lời nhắn mẫu để chủ app gửi các gia đình đang dùng, trước ngày chuyển: mở app một lần khi có mạng để bài làm gửi hết lên máy chủ; sau ngày chuyển thì mở địa chỉ mới, đăng nhập lại (chọn lại “Ghi nhớ trên máy này”), đặt lại mã mở nhanh, thêm lại vào Màn hình chính. Kết quả đã gửi lên máy chủ vẫn còn; những gì chỉ lưu trên máy (đăng nhập ghi nhớ, mã mở nhanh, lịch sử câu của đề ngẫu nhiên) không theo sang địa chỉ mới.
>
> Kiểm tra trong code: mọi đường dẫn đều tương đối; phạm vi của sw.js, start_url của manifest, admin.html chạy đúng ở tên miền mới; Supabase không cần đổi gì (nếu cần thì ghi rõ). Sửa mục "Triển khai" của CLAUDE.md. Chạy tests/e2e.js và tests/supabase/cloud-e2e.js, chỉ tự rà soát một vòng, rồi mở Pull Request.

</details>

<details><summary>Phiên B2 · Đề trả phí lên máy chủ (tháng 3–4/2027, sau B1, trong thời gian dùng thử; xong trước G1)</summary>

**Phiên B2 · Đề trả phí lên máy chủ** (tháng 3–4/2027, sau B1, trong thời gian dùng thử; xong trước G1)
> Đọc CLAUDE.md, mục 9 của docs/THIET-KE-TAI-KHOAN.md và mục 5 của docs/KE-HOACH-NOI-DUNG.md. Sau khi B1 đã gộp và repo đã riêng tư.
> - Đề thử (cờ free_trial: đề số 1 mỗi môn mỗi kì, hoặc theo hạn mức chốt lúc bán) và bài ôn dạng trang vẫn là file tĩnh trong data/ và modules/. Câu hỏi của các đề còn lại chỉ nằm trong bảng paid_banks (supabase/banks-to-sql.js sinh SQL, chủ app chạy).
> - Danh mục đề (tên, số câu) vẫn công khai để vẽ danh sách và nút Nâng cấp. Câu hỏi đề trả phí tải từ paid_banks khi mở (RLS theo gói, Store.can("bank:<mã>")), lưu lại trên máy cho lần sau, mất mạng vẫn làm được đề đã tải.
> - Trong thời gian dùng thử gói Miễn phí vẫn đọc được mọi đề (plans.all_banks), nên gia đình dùng thử chỉ thấy đề tải từ máy chủ, không mất đề nào; G1 mới đổi hạn mức.
> - Bản lưu trên máy chỉ có đề thử.
> - Gỡ câu hỏi đề trả phí khỏi data/; tests/kiem-tra-de.js kiểm cả SQL sinh ra.
> - Sửa mục “Thêm đề có sẵn” của CLAUDE.md và Quy định chung của các phiên N (mục 7 của docs/KE-HOACH-NOI-DUNG.md) theo cách thêm đề sau B2, để các phiên làm đề còn lại (đề lùi sang tháng 3–8/2027 theo cách lùi ở mục 4 của file đó, Lịch 2027–2028) vẫn chạy được.
>
> Chạy đủ các bộ kiểm thử, chỉ tự rà soát một vòng, rồi mở Pull Request ghi việc chủ app cần làm.

</details>

<details><summary>Phiên G1 · Kích hoạt gói, màn hình Nâng cấp (tháng 5/2027, sau B2, B4; xong trước khi mở bán tháng 6/2027)</summary>

**Phiên G1 · Kích hoạt gói, màn hình Nâng cấp** (tháng 5/2027, sau B2, B4; xong trước khi mở bán tháng 6/2027)
> Đọc CLAUDE.md, mục 9 của docs/THIET-KE-TAI-KHOAN.md và mục 5 của docs/KE-HOACH-NOI-DUNG.md. Hạn mức gói Miễn phí và gói Gia đình lúc bán: […] (chủ app điền trước khi dán).
> - **Trang admin**, phần xem nhanh tài khoản: khối "Gói" (gói hiện tại, hạn, lịch sử từ plan_log) và nút "Kích hoạt gói" (chọn gói; hạn mặc định 31/8 cuối năm học, mua từ tháng 6 trở đi thì là 31/8 năm sau, vì bán từ tháng 6 là bán cho năm học mới; số tiền, ghi chú) gọi thao tác set_plan có sẵn.
> - **App, Khu phụ huynh:** màn hình "Nâng cấp" gồm quyền lợi theo bảng plans; giá đọc từ plans, không viết cứng trong code; ảnh QR chuyển khoản do chủ app đặt vào repo, cùng số tài khoản, tên người nhận, nội dung "ONUP <tên đăng nhập>" lấy từ js/config.js; nút nhắn Zalo soạn sẵn tin. Hiện hạn gói và nhắc trước 14 ngày. Không gọi dịch vụ bên ngoài để tạo QR.
> - **Hạn mức:** Store.can và bảng plans theo hạn mức ở trên. Gia đình dùng thử và gia đình đã dùng từ trước giữ mọi quyền lợi hiện có đến hết thời gian dùng thử (ngày […], chủ app điền; ví dụ kích hoạt gói Gia đình đến ngày đó cho các tài khoản đã có, có ghi plan_log), sau đó […] (chủ app điền). Cập nhật supabase/schema.sql, viết supabase/cap-nhat-g1.sql nếu đổi dữ liệu plans (theo quy tắc grant ở CLAUDE.md).
> - **Điều khoản** (dieu-khoan.html, có từ Phiên G0): thêm phần gói, hạn, gia hạn, chuyển khoản.
>
> Chạy đủ các bộ kiểm thử (e2e, admin-test, store-test, cloud-e2e, run.sh), chỉ tự rà soát một vòng, rồi mở Pull Request ghi việc chủ app cần làm sau khi Merge (kể cả sửa hoặc xóa trialText trong js/config.js khi hết dùng thử).

</details>

---

---

## 5. Nhật ký chạy thử

Chủ app tự điền, mỗi tuần một dòng, không tốn lượt Claude. Nguồn số liệu: trang admin (số tài khoản, số tài khoản dùng trong 7 ngày, số hồ sơ con theo khối); Supabase → **Table Editor → `results`**, đếm dòng có `at` trong tuần (hoặc đếm từ file CSV xuất hằng tuần). Góp ý ghi nguyên lời của phụ huynh, học sinh; chỗ khó dùng thì chuyển sang ghi chép ở mục 2 (việc 3) để các phiên UX dùng. Không ghi tên thật của trẻ, không ghi số tiền.

| Tuần (từ ngày) | Gia đình được mời | Gia đình có dùng trong tuần | Lượt làm bài trong tuần | Còn dùng sau 4 tuần | Góp ý thật (ai · nói gì) | Đã xử lí (phiên / issue) |
|---|---|---|---|---|---|---|
| 18/10/2026 | | | | | Chủ app dùng thử · đề Tiếng Anh lẫn tiếng Việt; môn Tiếng Anh mọi khối phải 100% tiếng Anh. 19/10, học sinh lớp 6 · bài ôn giữa kì I, Ngữ văn Đề 1 đúng 20/20 mà "Ôn câu sai" vẫn còn 1 câu, làm lại thì app báo đúng | L21 · Phiên TA1, TA2; L27 · Phiên 9f ([SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md)) |
| | | | | | | |
| | | | | | | |

Mốc cần nhìn lại: **cuối học kì I (tháng 1/2027)**, hỏi vài gia đình đang dùng app có đáng trả tiền không; **từ khi mở dùng thử (tháng 3/2027)**, mỗi tuần ghi cả gia đình dùng thử; **giữa tháng 5/2027**, xem số gia đình dùng thử còn dùng sau 4 tuần và câu trả lời “có đáng trả tiền không”, để chốt hạn mức hai gói trước G1.
