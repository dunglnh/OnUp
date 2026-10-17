# Kế hoạch nội dung: đủ đề lớp 4 và 6, rồi lớp 5, 7–12

Phiên bản 1 · 17/10/2026 · Trạng thái: **chưa làm**. Lời giao việc từng phiên: mục 6 và 7.

Tài liệu này trả lời ba câu hỏi:
- Còn thiếu bao nhiêu đề.
- Làm thế nào để đề đa dạng mà không phải viết tay hàng nghìn đề.
- Làm theo thứ tự nào, mỗi phiên Claude Code làm gì.

Phần dự trù chi phí và giá bán nằm ở tài liệu riêng của chủ app, không để trong repo công khai này.

---

## 1. Hiện trạng (kiểm kê ngày 17/10/2026)

**Kiểm thử toàn app sau Phiên C (17/10):**
- Kiểm thử tự động: `tests/e2e.js` E2E OK; `admin-test.mjs` ADMIN OK; `store-test.mjs` OK; `cloud-e2e.js` 76 kiểm tra OK; RLS trên PostgreSQL 164 kiểm tra OK.
- Trang thật: trang học và `admin.html` mở được, không lỗi. Supabase đã tắt tự đăng ký, Edge Function `admin` chạy đúng.
- Việc nhỏ: `cloud-e2e.js` hết giờ chờ ở bước service worker 1 trong 3 lần chạy (chập chờn, không phải lỗi app).

**Nội dung có sẵn:**
- 4 bài ôn dạng trang: giữa kì I lớp 4 (Toán, Tiếng Việt), giữa kì I lớp 6 (Ngữ văn, Toán, KHTN), IOE 4, IOE 6.
- 22 ngân hàng đề, 550 câu, câu nào cũng có lời giải. Dạng câu: 325 trắc nghiệm, 99 đúng/sai, 126 điền khuyết. Mỗi đề 25 câu, chia 6–14 chủ đề.
- `data/banks.js` nặng 230 KB, khoảng 420 byte mỗi câu. App nạp cả file này ngay khi mở.

| Kì thi (lịch 2026–2027) | Lớp 4 | Lớp 6 |
|---|---|---|
| Giữa kì I (2–13/11) | bài ôn Toán, TV | bài ôn Văn, Toán, KHTN; **thiếu** Anh, LS&ĐL, GDCD, Tin, Công nghệ |
| Cuối kì I (lớp 6: 21/12–8/1; lớp 4: 28/12–8/1) | Toán 3, TV 2, KH 1, LS&ĐL 1, Tin&CN 1; **thiếu** Tiếng Anh | Toán 2, Văn 2, Anh 1, KHTN 1, LS&ĐL 1, GDCD 1, Tin 1, CN 1 |
| Giữa kì II (15–26/3) | Toán 2, TV 2 | **chưa có** |
| Cuối năm (lớp 6: 26/4–14/5; lớp 4: 3–14/5) | **chưa có** | **chưa có** |

Môn và kì kiểm tra lấy theo quy định đánh giá hiện hành:
- **Lớp 4–5:** Toán, Tiếng Việt kiểm tra 4 lần (giữa kì I, cuối kì I, giữa kì II, cuối năm). Tiếng Anh, Khoa học, Lịch sử và Địa lí, Tin học và Công nghệ kiểm tra 2 lần (cuối kì I, cuối năm).
- **THCS, THPT:** mọi môn đánh giá bằng điểm đều có giữa kì và cuối kì của mỗi học kì.

Từ năm học 2026–2027, cả nước dùng thống nhất bộ sách **Kết nối tri thức với cuộc sống** (Quyết định 3588/QĐ-BGDĐT ngày 26/12/2025). Đây đúng là bộ sách app đang theo, nên mọi đề mới tiếp tục theo bộ này.

---

## 2. Thế nào là "đủ đề"

Số đề mục tiêu mỗi môn, mỗi kì:

| Cấp | Môn (số đề mỗi kì) |
|---|---|
| Tiểu học (lớp 4, 5) | Toán 4 · Tiếng Việt 4 · Tiếng Anh 3 · Khoa học 3 · LS&ĐL 3 · Tin học và Công nghệ 2 |
| THCS (lớp 6–9) | Toán 4 · Ngữ văn 3 · Tiếng Anh 3 · KHTN 3 · LS&ĐL 2 · GDCD 2 · Tin học 2 · Công nghệ 2 |
| THPT (lớp 10–12) | Toán 3 · Tiếng Anh 3 · Ngữ văn 2 · Lí, Hóa, Sinh, Sử, Địa, GDKT&PL, Tin, Công nghệ mỗi môn 2 |
| Lớp 9 thêm | Đề thi thử vào 10: Toán 10 · Tiếng Anh 10 · Ngữ văn 6 |
| Lớp 12 thêm | Đề thi thử tốt nghiệp THPT: Toán, Tiếng Anh 10 · Lí, Hóa, Sinh, Sử, Địa 8 · GDKT&PL, Tin, Công nghệ 5 · Ngữ văn 5 |

Định dạng đề kiểm tra định kì THPT (Công văn 7991/BGDĐT-GDTrH, từ học kì 2 năm học 2024–2025): phần khách quan 7 điểm (nhiều lựa chọn 3 điểm, đúng/sai 4 ý 2 điểm, trả lời ngắn 2 điểm) và tự luận 3 điểm. Một số nơi ra đề THCS theo cùng khung (có ma trận đề THCS ghi theo Công văn này). Vì vậy dạng đúng/sai 4 ý và trả lời ngắn (mục 3) cần cho cả đề hằng kì, không chỉ đề thi tốt nghiệp.

Kì thi chuyển cấp và tốt nghiệp:
- **Thi vào 10** (Thông tư 30/2024): Toán, Ngữ văn bắt buộc. Môn thứ ba do từng tỉnh chọn, đa số chọn Tiếng Anh hoặc Ngoại ngữ (Hà Nội, TP.HCM đều thi Ngoại ngữ), và được công bố trước 31/3 hằng năm.
- **Tốt nghiệp THPT** (Thông tư 24/2024): 4 môn. Toán, Ngữ văn bắt buộc; chọn 2 môn trong Ngoại ngữ, Lí, Hóa, Sinh, Sử, Địa, GDKT&PL, Tin học, Công nghệ.
  - Ngữ văn thi tự luận 120 phút.
  - Toán 90 phút: 12 câu nhiều lựa chọn, 4 câu đúng/sai (mỗi câu 4 ý), 6 câu trả lời ngắn.
  - Lí, Hóa, Sinh, Địa: 18 câu nhiều lựa chọn, 4 câu đúng/sai, 6 câu trả lời ngắn. Sử: 24 câu nhiều lựa chọn, 4 câu đúng/sai. Tiếng Anh: 40 câu nhiều lựa chọn.

**Khối lượng** (tính bằng code: 25 câu mỗi đề, khoảng 4 đề mỗi phiên như Phiên 10 và 14):

| Lớp | Đề mục tiêu | Đã có | Câu | Dữ liệu | Phiên cần thêm |
|---|---|---|---|---|---|
| 4 | 54 | 12 | 1.350 | 0,55 MB | 10 |
| 5 | 54 | 0 | 1.350 | 0,55 MB | 14 |
| 6 | 84 | 10 | 2.100 | 0,86 MB | 18 |
| 7 | 84 | 0 | 2.100 | 0,86 MB | 21 |
| 8 | 84 | 0 | 2.100 | 0,86 MB | 21 |
| 9 | 110 | 0 | 2.750 | 1,1 MB | 28 |
| 10 | 96 | 0 | 2.400 | 1,0 MB | 24 |
| 11 | 96 | 0 | 2.400 | 1,0 MB | 24 |
| 12 | 176 | 0 | 4.400 | 1,8 MB | 44 |
| **Tổng** | **838** | **22** | **20.950** | **8,4 MB** | **~204** |

Rút ra hai điều:
1. **Không thể giữ cách hiện nay:** nạp một file `data/banks.js` chứa mọi đề và đưa hết vào đệm của service worker. Ở mức 8 MB, máy học sinh tải chậm và tốn dung lượng. Phải tách đề theo khối và môn, cần môn nào thì tải môn đó (Phiên K1).
2. **Viết tay 838 đề cố định không phải cách tốt nhất để đề đa dạng.** Cách tốt hơn ở mục 3.

---

## 3. Làm đề đa dạng: ngân hàng theo chủ đề và ma trận

Hiện mỗi "đề" là 25 câu cố định. Làm lại vài lần, học sinh nhớ đáp án.

Cách mới: mỗi môn, mỗi kì có một **ngân hàng câu** (khoảng 100 câu, tương đương 4 đề), mỗi câu gắn **chủ đề** và **mức độ**. Mỗi lần học sinh bấm làm, app **rút ngẫu nhiên** 25 câu theo **ma trận đề**, tức số câu của từng chủ đề và mức độ, giống cách giáo viên ra đề thật. Cùng 100 câu nhưng mỗi lần là một đề khác.
- Mức độ: 3 mức Biết, Hiểu, Vận dụng cho mọi cấp. Hướng dẫn ra đề kiểm tra định kì mới nhất của Bộ (Công văn 7991/BGDĐT-GDTrH) chỉ dùng 3 mức này, không còn Vận dụng cao.
- Vẫn giữ vài **đề cố định** ("Đề thi thử số 1…") cho ai muốn làm đúng một đề và so điểm.

Cùng lúc cần thêm **dạng câu**, vì đề thật không chỉ có trắc nghiệm:

| Dạng mới | Dùng cho | Ghi chú |
|---|---|---|
| Mức độ `lv` (1 Biết, 2 Hiểu, 3 Vận dụng) | mọi môn | để rút đề theo ma trận và báo cáo "câu vận dụng hay sai" |
| Đoạn đọc dùng chung | Tiếng Việt, Ngữ văn, Tiếng Anh (đọc hiểu) | hiện đoạn văn phải chép lại trong từng câu (câu dài nhất 331 kí tự) |
| Hình (SVG trong dữ liệu, có lọc an toàn) | Toán hình, KHTN, Địa lí (bản đồ, biểu đồ) | hiện app chỉ có chữ |
| Nối cột, sắp xếp thứ tự | tiểu học, Tiếng Anh, Lịch sử | dạng quen thuộc ở đề lớp 4–5 |
| Đúng/sai 4 ý | Toán, KHTN, các môn thi tốt nghiệp | đúng định dạng thi tốt nghiệp từ 2025 |
| Trả lời ngắn bằng số (có sai số cho phép) | Toán, Lí, Hóa | phần III đề thi tốt nghiệp |
| Tự luận có đáp án gợi ý và thang tự chấm | Ngữ văn (viết), Toán tự luận | không chấm tự động; học sinh hoặc phụ huynh tự chấm theo thang, không tính vào điểm trung bình |
| Câu nghe (đọc bằng giọng máy của trình duyệt) | Tiếng Anh | như bài ôn IOE đang làm |

Thứ tự: làm các phiên kĩ thuật K1 → K2 → K3 trước, rồi mới làm đề hàng loạt, để đề mới dùng được ngay dạng câu mới và không phải sửa lại.

---

## 4. Thứ tự làm

Nguyên tắc:
1. Kì thi nào gần thì làm đề cho kì đó trước.
2. Xong lớp 4 và 6 rồi mới sang khối khác.
3. Thứ tự khối tiếp theo: **5 và 7 → 9 → 8 → 12 → 10 → 11.**
   - Học sinh lớp 4, 6 năm nay sẽ lên lớp 5, 7 vào tháng 9/2027, nên làm 5 và 7 trước để giữ chân người dùng hiện có.
   - Lớp 9 (thi vào 10) và lớp 12 (thi tốt nghiệp) là hai khối phụ huynh sẵn lòng trả tiền nhất, nên đi ngay sau.
4. Chỉ bật một khối (`active: true` trong `data/grades.js`) khi khối đó đã có đủ đề cho kì thi sắp tới.

| Giai đoạn | Thời gian | Việc | Số phiên |
|---|---|---|---|
| 0 · Gấp | trước 1/11/2026 | N0a, N0b: đề giữa kì I lớp 6 còn thiếu; Tiếng Anh 4 cuối kì I | 2 |
| 1 · Kĩ thuật | tháng 11/2026 | K1 tách dữ liệu và bộ kiểm tra đề; K2 dạng câu mới; K3 rút đề theo ma trận | 3 |
| 2 · Cuối kì I | trước 15/12/2026 | N1–N6: thêm đề cuối kì I lớp 4 và 6 cho đủ mục tiêu | 6 |
| 3 · Giữa kì II | trước 1/3/2027 | N7–N12: giữa kì II lớp 4 (thêm) và lớp 6 (8 môn) | 6 |
| 4 · Cuối năm | trước 10/4/2027 | N13–N22: cuối năm lớp 4 và lớp 6 | 10 |
| 5 · Chuẩn bị bán, năm học mới | 5–8/2027 | B1–B4 (mục 5), lịch 2027–2028, giữa kì I lớp 4 và 6 cho năm sau; giữa kì I và cuối kì I lớp 5, 7 | ~20 |
| 6 · Năm học 2027–2028 | 9/2027–5/2028 | lớp 5, 7 phần còn lại; lớp 9; lớp 8 | ~70 |
| 7 · Năm học 2028–2029 | từ 2028 | lớp 12 (đề thi tốt nghiệp trước), 10, 11 | ~90 |

Nhịp làm: với gói Pro, mỗi tuần làm được khoảng 2–3 phiên đề, tùy mức dùng còn lại trong tuần. Như vậy giai đoạn 0–4 (27 phiên) xong trước mùa thi cuối năm. Muốn kịp lớp 5–12 trong hai năm học thì cần gói Max, hoặc chấp nhận làm chậm hơn.

**Việc của bố mẹ (không tốn lượt Claude), quan trọng nhất:** rà đề. Mỗi đề mới, cho con làm thử một lần và ghi câu sai đáp án vào GitHub Issues. Có thể nhờ giáo viên quen rà các môn mình không chắc. Chất lượng đề là thứ quyết định phụ huynh có trả tiền hay không.

---

## 5. Chuẩn bị trước khi bán (giai đoạn 5)

Chỉ làm khi đã có đủ đề lớp 4 và 6 và quyết định bán. Thiết kế gói đã có ở mục 9 của [THIET-KE-TAI-KHOAN.md](THIET-KE-TAI-KHOAN.md).

| Phiên | Việc | Vì sao |
|---|---|---|
| B1 · Chuyển hosting | Repo chuyển sang riêng tư; trang chạy trên Cloudflare Pages (gói miễn phí, không giới hạn băng thông trang tĩnh, cho dùng thương mại); tên miền riêng | Điều khoản GitHub Pages không cho dùng gói miễn phí để chạy dịch vụ bán hàng hay phần mềm trả phí (SaaS). Repo công khai thì ai cũng tải được toàn bộ đề |
| B2 · Đề trả phí lên máy chủ | Đề trả phí chỉ nằm trong bảng `paid_banks` (đã có sẵn từ Phiên A), đọc qua RLS theo gói; đề thử và bài ôn miễn phí vẫn là file tĩnh; `Store.can("bank:<mã>")` | Không ai tải được đề trả phí nếu chưa mua |
| B3 · Màn hình Nâng cấp và kích hoạt gói | Như mục 9 thiết kế: quyền lợi, giá, QR chuyển khoản VietQR, nút nhắn Zalo; trang admin thêm "Kích hoạt gói" (đã có `set_plan` trong Edge Function) | Bán tay qua Zalo, không mất phí cổng thanh toán |
| B4 · Bớt tải dữ liệu | Lúc mở app chỉ tải kết quả 90 ngày gần nhất (báo cáo chỉ dùng 7 và 30 ngày); đề tải khi mở và lưu lại trên máy | Hiện mỗi lần mở app tải toàn bộ kết quả của gia đình |

Việc hành chính chủ app tự làm:
- Nâng Supabase lên gói Pro (dự án không bị tạm dừng, có sao lưu hằng ngày).
- Thông báo website bán hàng với Bộ Công Thương tại online.gov.vn (không mất phí, cần mã số thuế cá nhân).
- Trang Điều khoản và Quyền riêng tư theo Luật Bảo vệ dữ liệu cá nhân 2025 (hiệu lực 1/1/2026). App đã chỉ thu tên hiển thị, khối, lớp; phụ huynh là người tạo hồ sơ của con.
- Hỏi kế toán về thuế hộ, cá nhân kinh doanh.

---

## 6. Lời giao việc: giai đoạn 0–1 (dán nguyên vào phiên mới)

Mỗi phiên một cuộc trò chuyện mới, Merge xong mới mở phiên sau.

**Phiên N0a · Đề giữa kì I lớp 6 còn thiếu (1)**
> Đọc CLAUDE.md và docs/KE-HOACH-NOI-DUNG.md (mục 1, 2). Tạo 3 ngân hàng 25 câu trong data/banks.js cho "Kiểm tra giữa học kì I" lớp 6, sách Kết nối tri thức (Tiếng Anh: Global Success, Unit 1–3, không dùng câu nghe), phạm vi nửa đầu học kì I: Tiếng Anh 6, Lịch sử và Địa lí 6, GDCD 6. Có chủ đề và lời giải, câu tự soạn, không chép sách. Gắn vào kì thi gk1-l6 trong data/calendar-2026-2027.js. Chạy tests/e2e.js, chỉ tự rà soát một vòng, rồi mở Pull Request.

**Phiên N0b · Đề giữa kì I lớp 6 còn thiếu (2), Tiếng Anh 4 cuối kì I**
> Đọc CLAUDE.md và docs/KE-HOACH-NOI-DUNG.md (mục 1, 2). Tạo 3 ngân hàng 25 câu trong data/banks.js, sách Kết nối tri thức, có chủ đề và lời giải, câu tự soạn: Tin học 6 và Công nghệ 6 "Giữa kì I" (phạm vi nửa đầu học kì I, gắn vào gk1-l6); Tiếng Anh 4 "Cuối kì I" (Global Success 4, Unit 1–10, dạng đề kiểm tra ở trường chứ không phải IOE, không dùng câu nghe, gắn vào ck1-l4). Chạy tests/e2e.js, chỉ tự rà soát một vòng, rồi mở Pull Request.

**Phiên K1 · Tách dữ liệu đề theo khối và môn, bộ kiểm tra đề**
> Đọc CLAUDE.md và docs/KE-HOACH-NOI-DUNG.md (mục 2, 3).
> 1. Tách data/banks.js thành một danh mục nhỏ data/banks/index.js (mỗi đề: id, title, grade, subject, minutes, số câu, file) và các file data/banks/<khối>-<mã môn>.js chứa câu hỏi. App chỉ tải file của môn khi học sinh mở đề hoặc trang cần câu hỏi; danh mục vẫn nạp lúc mở app để vẽ trang chủ, lịch thi, nhóm bài ôn.
> 2. Giữ nguyên mã đề, seedBanksSeen, RETIRED_SEED_BANKS, cách gắn đề mới vào kì thi ở cả hai kho, và kết quả cũ của người dùng.
> 3. sw.js: danh mục vào FILES; file câu hỏi chỉ vào đệm khi đã mở (để mở lại được khi mất mạng); tăng VERSION.
> 4. Viết tests/kiem-tra-de.js chạy bằng node, không cần trình duyệt. Kiểm tra: mã đề không trùng; khối có trong data/grades.js; mỗi câu có chủ đề và lời giải; trắc nghiệm có ít nhất 2 lựa chọn không trùng nhau; điền khuyết có đáp án và đúng một chỗ trống; không có câu trùng nhau (so sau khi bỏ dấu câu, khoảng trắng); đề gắn vào kì thi có thật; số câu và số phút hợp lí. In "DE OK".
> 5. Cập nhật CLAUDE.md (cách thêm đề mới, chạy kiem-tra-de.js trước mỗi Pull Request có đề).
> Chạy tests/e2e.js, tests/supabase/cloud-e2e.js, tests/kiem-tra-de.js, chỉ tự rà soát một vòng, rồi mở Pull Request.

**Phiên K2 · Dạng câu hỏi mới**
> Đọc CLAUDE.md và docs/KE-HOACH-NOI-DUNG.md (mục 3). Sau khi K1 đã gộp. Thêm vào js/quiz.js (và cú pháp nhập Quiz.parse cho quản trị viên):
> - mức độ lv (1 Biết, 2 Hiểu, 3 Vận dụng);
> - đoạn đọc dùng chung (đề có passages, câu tham chiếu bằng mã đoạn; màn hình làm bài hiện đoạn văn phía trên, thu gọn được ở 360px);
> - hình SVG trong dữ liệu (lọc chỉ giữ thẻ và thuộc tính vẽ an toàn, không script, không link ngoài; màu theo token, đọc được ở chế độ tối);
> - nối cột; sắp xếp thứ tự;
> - đúng/sai 4 ý (chấm từng ý như đề thi tốt nghiệp: đúng 1/2/3/4 ý được 0,1/0,25/0,5/1 điểm);
> - trả lời ngắn bằng số có sai số cho phép;
> - tự luận có đáp án gợi ý và thang tự chấm (không cộng vào điểm trung bình, báo cáo ghi riêng).
>
> Mọi dạng chạy bằng chạm trên điện thoại 360px, vùng bấm ≥ 44px, không kéo thả bắt buộc (nối cột và sắp xếp làm bằng chạm chọn). Câu cũ không có trường mới vẫn chạy như cũ. Thêm vài câu mẫu mỗi dạng vào một đề thử nghiệm không gắn kì thi. Mở rộng tests/kiem-tra-de.js cho các dạng mới. Thêm bước kiểm tra vào tests/e2e.js, chạy đến khi in E2E OK, chụp ảnh 360px sáng/tối từng dạng, chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh.

**Phiên K3 · Rút đề ngẫu nhiên theo ma trận**
> Đọc CLAUDE.md và docs/KE-HOACH-NOI-DUNG.md (mục 3). Sau khi K2 đã gộp.
> - Thêm loại ngân hàng "pool": nhiều câu, có ma trận (số câu theo chủ đề và mức độ) và số phút.
> - Mỗi lần bấm "Làm đề ngẫu nhiên", app rút câu theo ma trận, ưu tiên câu học sinh chưa làm hoặc hay sai (đọc từ kết quả có sẵn). Thiếu câu ở ô nào của ma trận thì lấy bù từ mức gần nhất và ghi chú.
> - Kết quả ghi refId là mã pool. Báo cáo tuần và "chủ đề hay sai" vẫn chạy.
> - Gộp các đề cố định cùng môn, cùng kì vào pool mà vẫn giữ các đề cố định để làm đúng từng đề.
> - Trang chủ học sinh: hàng của môn có nút "Đề ngẫu nhiên" trước các nút Đề 1, Đề 2…
>
> Mở rộng tests/kiem-tra-de.js (pool đủ câu cho ma trận). Thêm bước vào tests/e2e.js và tests/supabase/cloud-e2e.js, chỉ tự rà soát một vòng, rồi mở Pull Request.

---

## 7. Lời giao việc: các phiên làm đề

Sau K3, đơn vị làm việc là **ngân hàng câu của một môn trong một kì** (khoảng 100 câu, có ma trận), kèm 1–2 đề cố định chọn từ ngân hàng đó. Một phiên làm 1 môn lớn (Toán, Ngữ văn, Tiếng Việt, Tiếng Anh) hoặc 2 môn nhỏ.

**Mẫu lời giao việc** (thay phần trong ngoặc vuông):
> Đọc CLAUDE.md và docs/KE-HOACH-NOI-DUNG.md (mục 2, 3). Tạo ngân hàng câu "[Môn] [khối] · [Giữa kì I | Cuối kì I | Giữa kì II | Cuối năm]" khoảng [100] câu, sách Kết nối tri thức (Tiếng Anh: Global Success), phạm vi [tuần/bài], có chủ đề, mức độ, lời giải, câu tự soạn, không chép sách hay đề có bản quyền. Dùng đủ các dạng câu hợp với môn (mục 3). Ma trận và định dạng theo hướng dẫn kiểm tra định kì hiện hành của cấp học (THPT: Công văn 7991/BGDĐT-GDTrH; tra lại văn bản mới nhất trước khi làm); không có hướng dẫn riêng thì dùng Biết 40% – Hiểu 30% – Vận dụng 30%, [số câu] câu, [số phút] phút. Chọn [2] đề cố định từ ngân hàng. Với Toán, Lí, Hóa: tính lại mọi đáp án bằng code. Gắn vào kì thi [mã kì thi]. Chạy tests/kiem-tra-de.js và tests/e2e.js, chỉ tự rà soát một vòng, rồi mở Pull Request.

**Danh sách phiên lớp 4 và 6** (theo hạn của kì thi):

| Phiên | Hạn | Nội dung |
|---|---|---|
| N1 | 15/12 | Toán 4 cuối kì I: nâng lên ngân hàng (từ 3 đề có sẵn) |
| N2 | 15/12 | Tiếng Việt 4 cuối kì I: ngân hàng (từ 2 đề có sẵn) |
| N3 | 15/12 | Khoa học 4, Lịch sử và Địa lí 4 cuối kì I |
| N4 | 15/12 | Toán 6 cuối kì I; Ngữ văn 6 cuối kì I |
| N5 | 15/12 | Tiếng Anh 6, KHTN 6 cuối kì I |
| N6 | 15/12 | LS&ĐL 6, GDCD 6, Tin học 6, Công nghệ 6 cuối kì I |
| N7 | 1/3 | Toán 4, Tiếng Việt 4 giữa kì II (từ 4 đề có sẵn) |
| N8–N12 | 1/3 | Lớp 6 giữa kì II: Toán · Ngữ văn · Tiếng Anh · KHTN · LS&ĐL + GDCD · Tin + Công nghệ |
| N13–N17 | 10/4 | Lớp 4 cuối năm: Toán · Tiếng Việt · Tiếng Anh · Khoa học + LS&ĐL · Tin học và Công nghệ |
| N18–N22 | 10/4 | Lớp 6 cuối năm: Toán · Ngữ văn · Tiếng Anh · KHTN · LS&ĐL + GDCD + Tin + Công nghệ |
| N23–N25 | 15/9/2027 | Giữa kì I lớp 4, lớp 6 cho năm học 2027–2028 (thay dần các bài ôn dạng trang) |

**Lớp 5, 7–12:** dùng cùng mẫu lời giao việc, theo thứ tự ở mục 4. Mỗi khối trước khi bật cần:
1. Thêm các kì thi của khối vào lịch năm học mới (một phiên "Lịch 2027–2028" làm chung cho mọi khối, gồm thi vào 10 và thi tốt nghiệp THPT; ngày chưa công bố thì để dự kiến).
2. Có đủ đề cho kì thi gần nhất.
3. Đổi `active: true` trong `data/grades.js`.

Lớp 9 và 12 cần thêm phiên đề thi thử đúng định dạng kì thi:
- **Thi vào 10:** Toán, Ngữ văn, Tiếng Anh. Môn thứ ba các tỉnh công bố trước 31/3, nên làm Tiếng Anh trước.
- **Tốt nghiệp THPT:** dùng dạng đúng/sai 4 ý và trả lời ngắn của K2. Ngữ văn làm phần đọc hiểu chấm tự động, phần viết tự chấm theo thang.

---

## 8. Rủi ro

| Rủi ro | Cách giảm |
|---|---|
| Đề sai đáp án, sai chương trình | Bộ kiểm tra đề (K1); tính lại đáp án Toán, Lí, Hóa bằng code; bố mẹ, giáo viên rà; nút báo câu sai (làm cùng B3) |
| Hết lượt dùng Claude giữa mùa thi | Làm trước hạn kì thi ít nhất 3 tuần; một phiên một môn |
| Dữ liệu phình to, app chậm | K1 tách file; B4 chỉ tải 90 ngày; đề trả phí tải khi mở |
| Bị chép đề khi repo công khai | B1, B2 trước khi bán |
| Sách hoặc lịch thi thay đổi | Theo dõi thông báo của Bộ, Sở; ngày chưa công bố để dự kiến; câu hỏi gắn bài và tuần học để sửa nhanh |
