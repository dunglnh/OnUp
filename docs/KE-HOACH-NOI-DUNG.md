# Kế hoạch nội dung: đủ đề lớp 4 và 6, rồi lớp 5, 7–12

Phiên bản 3 · 19/10/2026 (mục 7: lời giao việc đã điền cho từng phiên, chủ app chốt 19/10; ngày 20/10 bỏ lời giao việc của các phiên đã xong). Trạng thái từng phiên chỉ ghi ở [KE-HOACH-PHAT-TRIEN-ONUP.md](KE-HOACH-PHAT-TRIEN-ONUP.md). Lời giao việc các phiên làm đề và kĩ thuật cho đề chưa làm: mục 7 của file này.

Tài liệu này trả lời ba câu hỏi:
- Còn thiếu bao nhiêu đề.
- Làm thế nào để đề đa dạng mà không phải viết tay hàng nghìn đề.
- Làm theo thứ tự nào, mỗi phiên Claude Code làm gì.

Phần dự trù chi phí và giá bán nằm ở tài liệu riêng của chủ app, không để trong repo công khai này.

---

## 1. Hiện trạng (kiểm kê ngày 18/10/2026)

Số đề, số câu, dạng câu dưới đây lấy từ `node tests/kiem-tra-de.js`; dung lượng từ `du -b data/banks/`. Cần số mới thì chạy lại, không chép số ở đây.

**Kiểm thử toàn app sau Phiên K3 (18/10):** `kiem-tra-de.js`, `e2e.js`, `admin-test.mjs`, `store-test.mjs` và `cloud-e2e.js` (3 lần liền) đều OK; `run.sh` báo lỗi vì vẫn đếm cả đề ngẫu nhiên (L20, PR #47 của Phiên R1 sửa luôn). Làm hết 35 mục của danh mục bằng đáp án trong dữ liệu: đề nào cũng 10/10. Đề Tiếng Anh còn lẫn tiếng Việt ở cả 75 câu (L21; quy tắc mới ở mục 3). Chi tiết và cách sửa: [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md), nhóm E (Phiên TA1, 9e, TA2).

**Kiểm thử toàn app sau Phiên C (17/10):**
- Kiểm thử tự động: `tests/e2e.js` E2E OK; `admin-test.mjs` ADMIN OK; `store-test.mjs` OK; `cloud-e2e.js` 76 kiểm tra OK; RLS trên PostgreSQL 164 kiểm tra OK.
- Trang thật: trang học và `admin.html` mở được, không lỗi. Supabase đã tắt tự đăng ký, Edge Function `admin` chạy đúng.
- Việc nhỏ: `cloud-e2e.js` hết giờ chờ ở bước service worker 1 trong 3 lần chạy (chập chờn, không phải lỗi app).

**Nội dung có sẵn:**
- 4 bài ôn dạng trang: giữa kì I lớp 4 (Toán, Tiếng Việt), giữa kì I lớp 6 (Ngữ văn, Toán, KHTN), IOE 4, IOE 6.
- 29 đề trong `data/banks/` (28 đề gắn kì thi và 1 đề thử nghiệm các dạng câu mới của Phiên K2), 715 câu, câu nào cũng có lời giải. Dạng câu: 431 trắc nghiệm, 151 điền khuyết, 123 đúng/sai; mỗi dạng mới (đúng/sai 4 ý, trả lời bằng số, nối cột, sắp xếp, tự luận) mới có 2 câu, đều nằm trong đề thử nghiệm; 15 câu có ghi mức độ `lv`. Mỗi đề 25 câu (đề thử nghiệm 15), chia 3–14 chủ đề.
- Dung lượng `data/banks/`: 321 KB, gồm danh mục `index.js` 9 KB (nạp lúc mở app) và 15 file câu hỏi `<khối>-<mã môn>.js` 312 KB, khoảng 440 byte mỗi câu, chỉ tải khi mở đề (Phiên K1). Bộ kiểm tra đề: `tests/kiem-tra-de.js`.

| Kì thi (lịch 2026–2027) | Lớp 4 | Lớp 6 |
|---|---|---|
| Giữa kì I (2–13/11) | bài ôn Toán, TV | bài ôn Văn, Toán, KHTN; Anh 1, LS&ĐL 1, GDCD 1 (N0a); Tin 1, Công nghệ 1 (N0b) |
| Cuối kì I (lớp 6: 21/12–8/1; lớp 4: 28/12–8/1) | Toán 3, TV 2, KH 1, LS&ĐL 1, Tin&CN 1, Tiếng Anh 1 (N0b) | Toán 2, Văn 2, Anh 1, KHTN 1, LS&ĐL 1, GDCD 1, Tin 1, CN 1 |
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

**Khối lượng** (tính bằng code: 25 câu mỗi đề, khoảng 440 byte mỗi câu theo kho đề ngày 18/10/2026, khoảng 4 đề mỗi phiên như Phiên 10 và 14; cột “Đã có” không tính đề thử nghiệm):

| Lớp | Đề mục tiêu | Đã có | Câu | Dữ liệu | Phiên cần thêm |
|---|---|---|---|---|---|
| 4 | 54 | 13 | 1.350 | 0,59 MB | 10 |
| 5 | 54 | 0 | 1.350 | 0,59 MB | 14 |
| 6 | 84 | 15 | 2.100 | 0,92 MB | 17 |
| 7 | 84 | 0 | 2.100 | 0,92 MB | 21 |
| 8 | 84 | 0 | 2.100 | 0,92 MB | 21 |
| 9 | 110 | 0 | 2.750 | 1,2 MB | 28 |
| 10 | 96 | 0 | 2.400 | 1,1 MB | 24 |
| 11 | 96 | 0 | 2.400 | 1,1 MB | 24 |
| 12 | 176 | 0 | 4.400 | 1,9 MB | 44 |
| **Tổng** | **838** | **28** | **20.950** | **9,2 MB** | **~203** |

Rút ra hai điều:
1. **Không thể giữ cách cũ** (một file `data/banks.js` chứa mọi đề, đưa hết vào đệm của service worker): ở mức 9 MB, máy học sinh tải chậm và tốn dung lượng. Phiên K1 đã tách đề theo khối và môn, cần môn nào thì tải môn đó.
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

**Đã làm ở Phiên K2 (18/10/2026):** mọi dạng trong bảng trên trừ câu nghe. Cách viết dữ liệu ở đầu `data/banks/index.js`; cú pháp nhập cho phụ huynh, quản trị ở Quản trị → Ngân hàng đề → “Cách viết câu hỏi”; đề mẫu `thunghiem6-dang-cau-moi` (lớp 6, không gắn kì thi); ảnh ở `docs/hinh-dang-cau/`. Ghi chú cho các phiên làm đề:
- Mỗi câu nặng như nhau (1 câu). Đúng/sai 4 ý được 0,1/0,25/0,5/1 câu; nối cột chấm theo số cặp đúng; sắp xếp đúng cả thứ tự mới được điểm. Muốn tỉ lệ điểm như đề thi tốt nghiệp (câu đúng/sai 4 ý nặng gấp 4 câu trắc nghiệm) thì thêm trọng số câu ở K3.
- Tự luận không chấm tự động: điểm tự chấm lưu thành kết quả riêng, không vào điểm trung bình.
- Bản đám mây: chủ app chạy `supabase/cap-nhat-k2.sql` một lần (`docs/HUONG-DAN-SUPABASE.md`).

**Đã làm ở Phiên K3 (18/10/2026):** đề ngẫu nhiên theo ma trận. Mục danh mục có thêm `pool: { from, matrix }` (cách viết ở đầu `data/banks/index.js`, mục “Đề ngẫu nhiên” trong CLAUDE.md): kho câu gộp từ các đề cố định trong `from` (vẫn làm riêng được) cộng câu riêng của pool trong file; `matrix` ghi số câu từng chủ đề, hoặc `[Biết, Hiểu, Vận dụng]` theo `lv`. Mỗi lần bấm “Đề ngẫu nhiên” app rút câu theo ma trận, ưu tiên câu chưa làm hoặc hay sai (lịch sử câu trên máy + kết quả đã lưu); thiếu câu thì lấy bù và ghi chú. Kết quả ghi `refId` là mã pool nên báo cáo tuần, “chủ đề hay sai” chạy như cũ. Đã gộp 6 nhóm đề cố định cùng môn, cùng kì thành 6 đề ngẫu nhiên (Toán 4, Tiếng Việt 4 cuối kì I và giữa kì II; Toán 6, Ngữ văn 6 cuối kì I), ma trận theo chủ đề vì câu cũ chưa ghi mức. Chưa làm trọng số câu (ghi chú ở K2). Ghi chú cho các phiên làm đề:
- Ngân hàng ~100 câu của một môn, một kì = một pool: câu riêng ghi trong file (`"<mã pool>": { note, questions }`), 1–2 đề cố định 25 câu là các mục riêng ghi trong `from`. Câu nào cũng có `topic`, `lv`; ma trận viết theo `[Biết, Hiểu, Vận dụng]` và kho phải đủ câu từng chủ đề (`tests/kiem-tra-de.js` báo lỗi), đủ từng mức (thiếu thì chỉ nhắc, app lấy bù và ghi chú cho học sinh).
- Môn, kì đã có pool mà thêm đề cố định mới thì thêm mã vào `from` và chỉnh ma trận.
- Rút ra từ Phiên N1 (Toán 4 cuối kì I, nâng 3 đề có sẵn lên ngân hàng):
  - Nâng đề có sẵn: giữ nguyên đề cố định (mã, câu, chữ chủ đề, vì kết quả cũ và “chủ đề hay sai” dựa vào đó), chỉ thêm `lv`; câu mới viết thành câu riêng của pool với đúng chữ chủ đề cũ.
  - Câu riêng chỉ được rút khi ô (chủ đề, mức) của nó có câu trong ma trận (`tests/kiem-tra-de.js` nhắc nếu không). Câu của đề cố định ở ô không rút vẫn dùng trong đề cố định.
  - Câu tự luận trong kho: lần rút có câu tự luận thì phần chấm tự động ít hơn `n` câu, điểm tự luận lưu riêng (K2).
  - Toán: script tính lại đáp án theo mẫu `tests/toan4-ck1.js` (đủ các dạng câu mới, đọc toạ độ trong hình để tính góc, kiểm tra vuông góc, song song, cạnh bằng nhau).
- Rút ra từ Phiên N2 (Tiếng Việt 4 cuối kì I): chủ đề “Viết” chỉ gồm câu tự luận để lần rút nào cũng đúng một câu Viết (câu sắp xếp câu thành đoạn văn ghi chủ đề “Đọc hiểu”); ô điền chấm không phân biệt chữ hoa, nên quy tắc viết hoa (danh từ riêng, tên cơ quan) hỏi bằng trắc nghiệm hoặc đúng/sai 4 ý; đáp án đúng không dài hơn hẳn các lựa chọn sai.
- Rút ra từ Phiên N3b (Tiếng Anh 4, Tin học và Công nghệ 4 cuối kì I): câu sắp xếp từ thành câu (`order`) chỉ được có một thứ tự đúng: dấu câu ở ô cuối (“now?”, “the weekend.”), chữ hoa ở ô đầu, không tách “A and B” thành các ô đổi chỗ được; kho chỉ gồm hai đề cố định (không câu riêng) thì viết Đề 2 đúng theo ma trận, ô đề 1 thiếu mức vẫn đủ câu; note của đề ngẫu nhiên hiện sau câu “mỗi lần một đề mới…” của app nên viết ngắn.
- Rút ra từ Phiên N3 (Khoa học 4, Lịch sử và Địa lí 4 cuối kì I): câu ở hai ô khác nhau của ma trận có thể cùng được rút vào một đề, nên đề bài, các lựa chọn, các ô của câu này không ghi sẵn đáp án của câu khác trong kho (ô sắp xếp “Nước Âu Lạc ra đời, kinh đô ở Cổ Loa” lộ câu “Kinh đô của nước Âu Lạc ở:”; câu tính số năm không ghi năm của sự kiện mà câu điền khác hỏi; câu nối “sự kiện – năm” chỉ để năm ở cột phải); khi ôn luyện, lời giải hiện ngay sau mỗi câu, nên lời giải trong đề cố định cũng không ghi đáp án của câu khác cùng đề. Tên tỉnh trong sách in trước năm 2025 có thể đã đổi sau khi sáp nhập tỉnh năm 2025: chỉ dùng tên tỉnh còn giữ (Hà Nội, Phú Thọ, Lào Cai, Bắc Ninh, Thái Nguyên…), câu hỏi về nơi đã sáp nhập (Hà Giang, Hòa Bình, Nam Định, Thái Bình…) ghi theo tên di tích, làng nghề, không hỏi tên tỉnh.

**Đã làm ở Phiên 9h (20/10/2026):** ô nhập số trên điện thoại (L29–L31 ở [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md)). Bàn phím số của iPhone không có dấu “-” và “/”, còn dấu thập phân là dấu phẩy hay dấu chấm tùy máy. Ghi chú cho các phiên làm đề:
- Câu trả lời bằng số (`num`) dùng được cho số nguyên, số thập phân, số âm và phân số: ô có nút ± và nút “/” ở mọi câu. Đáp án phân số ghi `ans: "a/b"` (chuỗi, ví dụ `"2/3"`, `"-3/4"`; mẫu số khác 0); số nguyên, số thập phân vẫn ghi dạng số (`ans: 2.5`). Chấm theo giá trị: 6/8 và 0,75 cũng đúng với `"3/4"`; phần đáp án hiện đúng “3/4”, không làm tròn. Đề bắt viết phân số tối giản thì dùng câu điền (so chữ). Ngân hàng tự nhập viết “Đáp số: 3/4”.
- Câu điền (`fill`) dùng được cho số thập phân. Đáp án là số thì so theo giá trị: gõ “1,25” hay “1.25” đều đúng với đáp án “1,25” (đáp án viết dấu phẩy như dữ liệu đang có), còn “2.5” không đúng với 25.
- Câu có số âm (đáp án âm, hoặc đề có số âm như “(−25) + 17”) dùng câu trả lời bằng số (nút ± ở mọi câu, không lộ dấu của đáp án) hoặc trắc nghiệm, không dùng câu điền. Câu điền có đáp án âm hiện dòng nhắc “Số âm: gõ dấu trừ phía trước, ví dụ -12.”, còn câu điền có đáp án không âm mở bàn phím số không có dấu trừ, nên câu điền lộ dấu của đáp án (L33 ở [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md)). Từ Phiên N4, `tests/kiem-tra-de.js` báo lỗi câu điền như vậy. Dòng nhắc số âm vẫn dùng cho đề phụ huynh tự nhập.
- Hỗn số (lớp 6): câu trả lời bằng số ghi đáp án là phân số (`ans: "7/2"`); con gõ “7/2” hay “3,5” đều đúng, gõ “3 1/2” đúng sau Phiên 9i (L32). Bàn phím số của iPhone không có phím cách, nên đề bài dặn viết kết quả dưới dạng phân số. Đề bắt viết hỗn số thì dùng câu điền (`ans: ["3 1/2"]`, so chữ).
- Đơn vị (`unit`) của câu trả lời bằng số nên ngắn, một từ như “cm”, “kg”, “đồng”: nút ±, nút “/”, ô nhập và đơn vị nằm chung một hàng. QC đo ở 360px (20/10/2026): với “đồng” ô còn rộng khoảng 120px, với đơn vị hai từ như “quyển sách” ô chỉ còn khoảng 70px. Đơn vị dài thì đưa vào đề bài (“Hỏi có bao nhiêu quyển sách?”) và ghi `unit: "quyển"`.

**Đề Tiếng Anh: 100% tiếng Anh** (chủ app yêu cầu 18/10/2026, áp dụng cho mọi khối, mọi kì, cả đề thi thử vào 10 và tốt nghiệp)
- Mọi chữ của đề và câu Tiếng Anh viết bằng tiếng Anh: `note`, `topic`, lời dặn và đề bài `q`, lựa chọn `o`, đáp án `ans`, cột nối `l`, `r`, lời giải `x`, đoạn đọc (`passages`), thang tự chấm. Câu Tiếng Anh nằm trong đề nhiều môn (như đề thử nghiệm) cũng vậy.
- Không dịch nghĩa sang tiếng Việt, không chú thích tiếng Việt trong ngoặc. Nghĩa của từ giải thích bằng tiếng Anh đơn giản, bằng ví dụ, hoặc bằng hình (SVG).
- Tên riêng Việt Nam viết không dấu như sách Global Success: Viet Nam, Ha Noi, Ha Long Bay, Mai, Nam.
- Chủ đề: "Unit N · <tên Unit trong sách>"; phần chung của đề: "Pronunciation", "Vocabulary", "Grammar", "Reading", "Writing".
- Đoạn đọc viết một lần ở `passages`, tên đoạn "Read the text. Then answer the questions."; không chép đoạn văn vào từng câu.
- Lời dặn theo mẫu của đề kiểm tra ở trường, thống nhất với bài ôn IOE:

| Dạng | Lời dặn |
|---|---|
| Trắc nghiệm | Choose the best answer. |
| Phát âm | Which word has the sound /ʌ/? · Which word has the ending -s pronounced /ɪz/? |
| Từ khác loại | Choose the odd one out. |
| Điền từ | Fill in the blank with one word. · Write the correct form of the verb in brackets. |
| Sắp xếp (`order`) | Put the words in the correct order. |
| Nối cột (`match`) | Match the words with their meanings. · Match the questions with the answers. |
| Đọc hiểu | câu đúng/sai: đề bài là câu cần xét; `tf4`: Read the text again. Is each sentence true or false? |

- Lời giải `x`: tiếng Anh đơn giản, 1–2 câu ngắn, nêu quy tắc rồi câu đúng. Lớp 4–5 chỉ dùng từ đã học, từ Global Success 3 đến sách của lớp đó. Ví dụ:
  - "Japan is a country. Japanese is a nationality: He's Japanese."
  - "My brother = he, so have → has: My brother has Music on Fridays."
  - "Look! means it is happening now, so we use are + V-ing: are playing."
  - "A compass is a tool for drawing circles."
- Phiên TA1 viết lại 3 đề Tiếng Anh đang có theo các quy tắc này và thêm vào `tests/kiem-tra-de.js` kiểm tra đề Tiếng Anh không còn chữ tiếng Việt. Giao diện làm đề Tiếng Anh (từ màn mở đề đến màn kết quả) cũng phải bằng tiếng Anh: Phiên TA2. Hai phiên đã xong (PR #49, #52); lỗi L21 ghi ở [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md).

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
| 2 · Cuối kì I | lớp 6 trước 30/11, lớp 4 trước 7/12/2026 | N1–N6, N3b, N4b: thêm đề cuối kì I lớp 4 và 6 cho đủ mục tiêu | 8 |
| 3 · Giữa kì II | trước 22/2/2027 | K4 (đề ngẫu nhiên rút giữ trọn đoạn đọc); N7–N12, N7b, N12b: giữa kì II lớp 4 (thêm) và lớp 6 (8 môn) | 9 |
| 4 · Cuối năm | trước 10/4/2027 | N13–N22: cuối năm lớp 4 và lớp 6 | 10 |
| 5 · Năm học mới | 5–8/2027 | lịch 2027–2028 (thêm kì thi các khối mới), giữa kì I lớp 4 và 6 cho năm sau (N23–N25); giữa kì I và cuối kì I lớp 5, 7 | ~16 |
| 6 · Năm học 2027–2028 | 9/2027–5/2028 | lớp 5, 7 phần còn lại; lớp 9; lớp 8 | ~70 |
| 7 · Năm học 2028–2029 | từ 2028 | lớp 12 (đề thi tốt nghiệp trước), 10, 11 | ~90 |
| 8 · Chuẩn bị bán | ngay trước khi bán: khi đủ đề lớp 4–12 (khoảng cuối năm học 2028–2029) | G1, B1, B2, B4 (mục 5) | 4 |

Nhịp làm: 1–2 phiên mỗi tuần (đã chốt 18/10/2026). Giai đoạn 0–4 (32 phiên) xong trước mùa thi cuối năm 2027; lớp 5–12 (khoảng 200 phiên) xong khoảng cuối năm học 2028–2029, là lúc bán. Làm nhanh hơn thì bán sớm hơn, nhưng không bán khi chưa đủ đề lớp 4–12; các phiên chuẩn bị bán không làm sớm hơn giai đoạn 8.

**Việc của bố mẹ (không tốn lượt Claude), quan trọng nhất:** rà đề. Mỗi đề mới, cho con làm thử một lần; câu sai đáp án thì báo bằng nút “Báo câu này sai” trong app khi đã có (Phiên R1), trước đó chủ app ghi vào GitHub Issues (Issues chỉ chủ app dùng). Có thể nhờ giáo viên quen rà các môn mình không chắc. Chất lượng đề là thứ quyết định phụ huynh có trả tiền hay không.

---

## 5. Chuẩn bị trước khi bán (giai đoạn 8)

Làm **ngay trước khi bán**, tức khi đã đủ đề lớp 4–12 (khoảng cuối năm học 2028–2029; quyết định 18/10/2026), không làm sớm hơn. Đến lúc đó gói Miễn phí giữ như hiện nay (5 hồ sơ con, mọi đề; bảng `plans` không đổi); hạn mức gói Miễn phí và gói Gia đình lúc bán chốt sau, chủ app điền vào lời giao việc Phiên G1. Thiết kế gói: mục 9 của [THIET-KE-TAI-KHOAN.md](THIET-KE-TAI-KHOAN.md); lời giao việc G1, B1, B2: mục 4 của [KE-HOACH-PHAT-TRIEN-ONUP.md](KE-HOACH-PHAT-TRIEN-ONUP.md). Thứ tự: G1 → B1 → B2 → B4.

| Phiên | Việc | Vì sao |
|---|---|---|
| G1 · Kích hoạt gói, màn hình Nâng cấp, Điều khoản và Quyền riêng tư (trước gọi là B3) | Như mục 9 thiết kế: quyền lợi, giá đọc từ bảng `plans`, QR chuyển khoản, nút nhắn Zalo; trang admin thêm "Kích hoạt gói" (đã có `set_plan` trong Edge Function); hai trang tĩnh Điều khoản và Quyền riêng tư | Bán tay qua Zalo, không mất phí cổng thanh toán |
| B1 · Chuyển hosting | Repo chuyển sang riêng tư; trang chạy trên Cloudflare Pages (gói miễn phí, không giới hạn băng thông trang tĩnh, cho dùng thương mại); tên miền riêng | Điều khoản GitHub Pages không cho dùng gói miễn phí để chạy dịch vụ bán hàng hay phần mềm trả phí (SaaS). Repo công khai thì ai cũng tải được toàn bộ đề; đến khi bán chấp nhận như vậy |
| B2 · Đề trả phí lên máy chủ | Đề trả phí chỉ nằm trong bảng `paid_banks` (đã có sẵn từ Phiên A), đọc qua RLS theo gói; đề thử và bài ôn miễn phí vẫn là file tĩnh; `Store.can("bank:<mã>")` | Không ai tải được đề trả phí nếu chưa mua |
| B4 · Bớt tải dữ liệu | Lúc mở app chỉ tải kết quả 90 ngày gần nhất (báo cáo chỉ dùng 7 và 30 ngày); đề tải khi mở và lưu lại trên máy | Hiện mỗi lần mở app tải toàn bộ kết quả của gia đình |

Việc hành chính chủ app tự làm:
- Nâng Supabase lên gói Pro khi bắt đầu thu tiền (dự án không bị tạm dừng, có sao lưu hằng ngày). Trước đó giữ gói Free: xuất CSV hằng tuần, mở app ít nhất mỗi tuần một lần ([HUONG-DAN-SUPABASE.md](HUONG-DAN-SUPABASE.md), mục “Gói và đề trả phí”).
- Thông báo website bán hàng với Bộ Công Thương tại online.gov.vn (không mất phí, cần mã số thuế cá nhân).
- Trang Điều khoản và Quyền riêng tư theo Luật Bảo vệ dữ liệu cá nhân 2025 (hiệu lực 1/1/2026). App đã chỉ thu tên hiển thị, khối, lớp; phụ huynh là người tạo hồ sơ của con.
- Hỏi kế toán về thuế hộ, cá nhân kinh doanh.

---

## 6. Lời giao việc: giai đoạn 0–1 (đã làm xong)

N0a, N0b, K1, K2, K3 đã xong (PR #32, #34, #36, #37, #46); lời giao việc cũ còn trong lịch sử git của file này. Số mục giữ nguyên để các chỗ trỏ “mục 7” không đổi.

---

## 7. Lời giao việc: các phiên làm đề

Sau K3, đơn vị làm việc là **ngân hàng câu của một môn trong một kì** (khoảng 100 câu, có ma trận), kèm 1–2 đề cố định chọn từ ngân hàng đó: viết thành một mục `pool` trong `data/banks/index.js` (câu riêng trong file, đề cố định trong `from`; xem “Đã làm ở Phiên K3” ở mục 3). Một phiên làm 1 môn lớn (Toán, Ngữ văn, Tiếng Việt, Tiếng Anh) hoặc 2 môn nhỏ; môn nhỏ chỉ thêm 1 đề 25 câu thì một phiên làm được 4 môn (như N6).

**Mẫu lời giao việc** (thay phần trong ngoặc vuông):
> Đọc CLAUDE.md và docs/KE-HOACH-NOI-DUNG.md (mục 2, 3). Tạo ngân hàng câu "[Môn] [khối] · [Giữa kì I | Cuối kì I | Giữa kì II | Cuối năm]" khoảng [100] câu, sách Kết nối tri thức (Tiếng Anh: Global Success, đề 100% tiếng Anh kể cả lời dặn, lời giải, đoạn đọc theo mục 3), phạm vi [tuần/bài], có chủ đề, mức độ, lời giải, câu tự soạn, không chép sách hay đề có bản quyền. Dùng đủ các dạng câu hợp với môn (mục 3). Ma trận và định dạng theo hướng dẫn kiểm tra định kì hiện hành của cấp học (THPT: Công văn 7991/BGDĐT-GDTrH; tra lại văn bản mới nhất trước khi làm); không có hướng dẫn riêng thì dùng Biết 40% – Hiểu 30% – Vận dụng 30%, [số câu] câu, [số phút] phút. Chọn [2] đề cố định từ ngân hàng. Với Toán, Lí, Hóa: tính lại mọi đáp án bằng code. Gắn vào kì thi [mã kì thi]. Chạy tests/kiem-tra-de.js và tests/e2e.js, chỉ tự rà soát một vòng, rồi mở Pull Request.

**Thêm vào mẫu từ Phiên N1** (chủ app chốt 19/10/2026; lời giao việc bên dưới đã điền sẵn theo mẫu và bốn ý này, các phiên sau viết theo cùng cách):
1. **Nâng từ đề có sẵn:** giữ nguyên mã, câu, chữ chủ đề của đề cố định, chỉ thêm `lv` (kết quả cũ và “chủ đề hay sai” dựa vào đó). Lời giao việc ghi rõ mã đề, file, mục `pool` phải sửa.
2. **Ma trận ghi sẵn trong lời giao việc**, phiên không phải tự tra: `[Biết, Hiểu, Vận dụng]` 10 – 8 – 7 cho 25 câu, như N1.
   - Tiểu học: Thông tư 27/2020 chỉ quy định 3 mức, không quy định tỉ lệ.
   - Lớp 6: các trường ra đề định kì theo khung Công văn 7991/BGDĐT-GDTrH (nhiều lựa chọn, đúng/sai 4 ý, trả lời ngắn, tự luận; ma trận lớp 6 ghi “CV 7991”), nên kho lớp 6 cần đủ câu đúng/sai 4 ý và trả lời ngắn.
3. **Kiểm thử ghi cứng theo kho:** lời giao việc ghi chỗ phải sửa (bước 9e, K3, “seed banks load on demand” của `tests/e2e.js`; mục 7 của `tests/supabase/store-test.mjs`).
4. **Xong khi chặt hơn:** `tests/kiem-tra-de.js` in DE OK và không còn dòng “Nhắc:” về đề của phiên (ô ma trận thiếu câu, chủ đề ngoài ma trận, câu riêng chỉ để lấy bù).

**Quy định chung của các phiên N** (mỗi lời giao việc bên dưới trỏ về đây; sửa ở đây là áp dụng cho mọi phiên):
> - Chỉ sửa data/banks/, data/calendar-2026-2027.js, script và kiểm thử trong tests/, tài liệu; không sửa js/, css/, modules/ (thấy lỗi app thì ghi vào Pull Request).
> - Xong khi node tests/kiem-tra-de.js in DE OK và không còn dòng “Nhắc:” nào về đề của phiên, node tests/e2e.js in E2E OK.
> - Hai script kiểm thử chạy ở một ngày cố định (hằng TODAY 21/10/2026 ở đầu tests/e2e.js và tests/supabase/cloud-e2e.js, Phiên 9g; CLAUDE.md, mục “Chạy và kiểm tra”), nên không bước nào hỏng theo ngày chạy. Bước mới hoặc bước viết lại tạo context bằng hàm dùng chung (newContext của tests/e2e.js), không gọi browser.newContext; chữ mong đợi theo kì thi gần nhất ghi theo TODAY.
> - Chỉ tự rà soát một vòng, rồi mở Pull Request. Có số PR thì làm theo quy ước ở đầu docs/KE-HOACH-PHAT-TRIEN-ONUP.md: ghi PR vào dòng trạng thái và bảng “Đã xong” ở mục 1, xóa dòng của phiên ở mục 3 của file đó; xóa khối lời giao việc của phiên và dòng của phiên trong bảng ở mục 7 của docs/KE-HOACH-NOI-DUNG.md. Điều mới rút ra cho các phiên sau (nếu có) ghi một dòng vào mục 3 của docs/KE-HOACH-NOI-DUNG.md.

**Danh sách phiên lớp 4 và 6.** Hạn: xong trước kì thi ít nhất 3 tuần (mục 8). Thứ tự chạy ở mục 3 của [KE-HOACH-PHAT-TRIEN-ONUP.md](KE-HOACH-PHAT-TRIEN-ONUP.md). “Kho” là số câu mục tiêu theo mục 2 (25 câu mỗi đề): đề cố định + câu riêng của đề ngẫu nhiên.

| Phiên | Hạn | Nội dung | Kho | Mã mới | Kiểm thử phải sửa |
|---|---|---|---|---|---|
| N4 | 30/11 | Toán 6 cuối kì I: nâng lên ngân hàng (từ 2 đề có sẵn); sửa L33 (5 câu điền về số nguyên thành câu trả lời bằng số) | 50 + ~50 | (câu riêng của `toan6-ck1-ngau-nhien`); `tests/toan6-ck1.js` | bước K3 (viết lại); `tests/kiem-tra-de.js` thêm kiểm tra L33 |
| N4b | 30/11 | Ngữ văn 6 cuối kì I: nâng lên ngân hàng (từ 2 đề có sẵn) | 50 + ~25 | (câu riêng của `van6-ck1-ngau-nhien`) | không |
| N5 | 30/11 | Tiếng Anh 6, KHTN 6 cuối kì I | mỗi môn 50 + ~25 | `ta6-ck1-de2`, `ta6-ck1-ngau-nhien`, `khtn6-ck1-de2`, `khtn6-ck1-ngau-nhien`; `tests/khtn6-ck1.js` | 9e: hàng Tiếng Anh ck1-l6 |
| N6 | 30/11 | LS&ĐL 6, GDCD 6, Tin học 6, Công nghệ 6 cuối kì I | LS&ĐL 50 + ~10; ba môn kia 50 | `<mã>6-ck1-de2`, `<mã>6-ck1-ngau-nhien` cho lsdl, gdcd, tin, congnghe | không |
| K4 | 14/12 | Kĩ thuật: đề ngẫu nhiên rút giữ trọn đoạn đọc (`Quiz.draw`) | | | bước K3; rút thử trong `kiem-tra-de.js` |
| N7 | 22/2/2027 | Toán 4 giữa kì II: nâng lên ngân hàng (từ 2 đề có sẵn) | 50 + ~50 | (câu riêng của `toan4-gk2-ngau-nhien`); mở rộng `tests/toan4-gk2.js` | bước “seed banks load on demand”, `store-test.mjs` mục 7 |
| N7b | 22/2 | Tiếng Việt 4 giữa kì II: nâng lên ngân hàng (từ 2 đề có sẵn) | 50 + ~50 | (câu riêng của `tv4-gk2-ngau-nhien`) | không |
| N8 | 22/2 | Toán 6 giữa kì II | 50 + ~50 | `toan6-gk2-de1`, `-de2`, `-ngau-nhien`; `tests/toan6-gk2.js`; phạm vi của gk2-l6 | không |
| N9 | 22/2 | Ngữ văn 6 giữa kì II | 50 + ~25 | `van6-gk2-de1`, `-de2`, `-ngau-nhien` | không |
| N10 | 22/2 | Tiếng Anh 6 giữa kì II | 50 + ~25 | `ta6-gk2-de1`, `-de2`, `-ngau-nhien` | không |
| N11 | 22/2 | KHTN 6 giữa kì II | 50 + ~25 | `khtn6-gk2-de1`, `-de2`, `-ngau-nhien` | không |
| N12 | 22/2 | Lịch sử và Địa lí 6, GDCD 6 giữa kì II | mỗi môn 50 | `lsdl6-gk2-*`, `gdcd6-gk2-*` | không |
| N12b | 22/2 | Tin học 6, Công nghệ 6 giữa kì II | mỗi môn 50 | `tin6-gk2-*`, `congnghe6-gk2-*` | không |
| N13–N17 | 10/4 | Lớp 4 cuối năm: Toán · Tiếng Việt · Tiếng Anh · Khoa học + LS&ĐL · Tin học và Công nghệ | | | |
| N18–N22 | 10/4 | Lớp 6 cuối năm: Toán · Ngữ văn · Tiếng Anh · KHTN · LS&ĐL + GDCD + Tin + Công nghệ | | | |
| N23–N25 | 15/9/2027 | Giữa kì I lớp 4, lớp 6 cho năm học 2027–2028 (thay dần các bài ôn dạng trang) | | | |

Chủ app chốt ngày 19/10/2026, so với phiên bản 2 của kế hoạch:
- Thêm **N3b**: kế hoạch cũ bỏ sót Tiếng Anh 4 (mục tiêu 3 đề, có 1) và Tin học và Công nghệ 4 (mục tiêu 2, có 1) cuối kì I.
- Tách **N4b** (Ngữ văn 6) khỏi N4 và **N7b** (Tiếng Việt 4) khỏi N7: mỗi phiên cũ có hai môn lớn, nhiều câu mới gấp 2,5–3 lần N1.
- Thêm **N12b** (Tin học 6, Công nghệ 6 giữa kì II): hàng N8–N12 cũ có 6 nhóm môn cho 5 số phiên. Số các phiên N13 trở đi giữ nguyên.
- Đề có sẵn còn thiếu bài được bù bằng Đề 2 và câu riêng, không sửa đề 1: Địa lí 6 cuối kì I chỉ có Bài 1–9 (bù ở N6); Khoa học 4 thiếu Bài 6, LS&ĐL 4 thiếu Bài 6, Bài 10 (bù ở N3).
- Hạn mới 30/11 (lớp 6), 7/12 (lớp 4) cho cuối kì I và 22/2/2027 cho giữa kì II, thay cho 15/12 và 1/3.
- Thêm **K4** để đề ngẫu nhiên giống đề thật hơn: một đoạn đọc nhiều câu thay cho các câu lẻ của nhiều đoạn.

### Cuối kì I

**Phiên N4 · Toán 6 cuối kì I: nâng lên ngân hàng (từ 2 đề có sẵn), viết lại bước K3 của tests/e2e.js**
> Đọc CLAUDE.md và docs/KE-HOACH-NOI-DUNG.md (mục 2, 3, 7). Tạo ngân hàng câu "Toán 6 · Cuối kì I" khoảng 100 câu, sách Kết nối tri thức, phạm vi Chương I–V, Bài 1–22 như 2 đề có sẵn (tập hợp các số tự nhiên; luỹ thừa, thứ tự thực hiện phép tính; tính chia hết, số nguyên tố; ƯCLN, BCNN; số nguyên và các phép tính; hình phẳng trong thực tiễn; chu vi, diện tích; hình có trục đối xứng, tâm đối xứng), có chủ đề, mức độ, lời giải, câu tự soạn, không chép sách hay đề có bản quyền.
> - Kho = 50 câu của toan6-ck1-de1, toan6-ck1-de2 (giữ nguyên mã, câu, chữ chủ đề; chỉ thêm lv; trừ 5 câu điền về số nguyên, xem dòng L33 dưới) + khoảng 50 câu riêng của toan6-ck1-ngau-nhien (đã có trong danh mục), ghi vào data/banks/6-toan.js. Không thêm đề cố định. Chủ đề đúng chữ cũ (Tập hợp các số tự nhiên; Lũy thừa, thứ tự thực hiện phép tính; Tính chia hết, số nguyên tố; ƯCLN và BCNN; Số nguyên; Nhân, chia số nguyên; Hình phẳng; Chu vi, diện tích; Tính đối xứng).
> - Dạng câu theo khung đề lớp 6 các trường đang dùng (Công văn 7991/BGDĐT-GDTrH: nhiều lựa chọn, đúng/sai 4 ý, trả lời ngắn, tự luận): trong câu riêng có khoảng 8 câu đúng/sai 4 ý, 12 câu trả lời bằng số, 3–4 câu tự luận (lời giải từng bước, thang tự chấm; đặt ở ô Vận dụng xen với câu chấm tự động, để mỗi lần rút có nhiều nhất 1–2 câu tự luận), nối cột, sắp xếp, khoảng 10 câu có hình SVG (hình phẳng trên lưới ô vuông, trục và tâm đối xứng, chu vi, diện tích). Số viết như dữ liệu đang có: ngăn hàng nghìn bằng khoảng trắng (“1 200”, CLAUDE.md, Quy ước code).
> - Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7, 25 câu, 45 phút (khoảng 40 – 30 – 30%, như Phiên N1, không cần tra lại): đổi matrix của toan6-ck1-ngau-nhien sang [Biết, Hiểu, Vận dụng], mỗi ô nên có ít nhất gấp đôi số câu ô đó rút. Note của đề ngẫu nhiên ghi phạm vi, 10 – 8 – 7, “Có lời giải từng câu.”
> - Tính lại mọi đáp án bằng code: viết tests/toan6-ck1.js theo mẫu tests/toan4-ck1.js cho cả 100 câu (2 đề cố định và câu riêng, mọi dạng; câu có hình đọc toạ độ trong hình), kiểm tra mọi câu có lv, rút thử nhiều lần ra đúng 10 – 8 – 7; in MATH OK.
> - Kì thi: toan6-ck1-ngau-nhien đã gắn vào ck1-l6, không đổi lịch.
> - L33 (docs/SUA-LOI-CHAY-THU.md, nhóm H; cách sửa ở mục 2, "Phiên 9i", phần L33): 5 câu điền về số nguyên của hai đề lộ dấu của đáp án. Đổi 5 câu đó sang câu trả lời bằng số (type "num", ans là số, đề bỏ "___", ví dụ "(−72) : 8 = ?"; giữ chủ đề, lời giải); đây là chỗ duy nhất được đổi câu của hai đề. Cùng phiên này thêm vào tests/kiem-tra-de.js kiểm tra câu điền về số âm như ở đó và ghi vào CLAUDE.md; câu riêng mới về số âm dùng câu trả lời bằng số hoặc trắc nghiệm.
> - Kiểm thử phải sửa: bước K3 của tests/e2e.js ("random exam by matrix (K3)") dùng toan6-ck1-ngau-nhien và đang ghi cứng theo kho cũ: kho 50 câu, nguồn câu "toan6-ck1-de1,toan6-ck1-de2", chữ “25 câu rút từ kho 50 câu (2 đề)”, số câu của Đề 1 ở lượt đầu, điểm 9,5/10 và 24/25, số câu Đề 2 còn lại ở lượt hai, ghi chú của pool thử "Hình phẳng" [0, 0, 3], báo cáo tuần “Toán 9,75/10 2 bài · 49/50 câu đúng”; hàm answer chỉ trả lời trắc nghiệm, điền, đúng/sai. Viết lại bước này cho khớp kho mới mà vẫn giữ các ý đang kiểm tra (ưu tiên câu chưa làm, câu vừa sai được rút lại, lịch sử câu, kết quả ghi refId là mã pool, chủ đề hay sai, báo cáo tuần, ghi chú khi kho thiếu): trả lời được mọi dạng câu, đúng hoặc sai theo ý muốn (tìm ô như answerAny ở bước “numbers with thousands spaces stay on one line (360px)” của tests/e2e.js và vòng K3 của tests/supabase/cloud-e2e.js; trả lời đúng theo dữ liệu như bước K2; nhận ra câu trên màn hình bằng chữ câu hỏi, nhiều câu cùng lời dặn thì so thêm các ô như bước TA1; so chữ trên nút sau khi gộp khoảng trắng như hàm answer hiện nay, vì số có nhóm hàng nghìn hiện bằng khoảng trắng không ngắt từ PR #63), số câu chấm tự động trừ câu tự luận rút được, số liệu tính từ dữ liệu thay vì ghi cứng; giữ ngày cố định của Phiên 9g (context tạo bằng newContext; dòng k3.hero đúng ở TODAY nên giữ nguyên). Ghi thêm vào CLAUDE.md (mục "Thêm đề có sẵn", bước 4): bước K3 của tests/e2e.js dùng toan6-ck1-ngau-nhien.
>
> Còn lại theo Quy định chung ở mục 7 của docs/KE-HOACH-NOI-DUNG.md (phạm vi sửa, điều kiện xong, ngày cố định của kiểm thử, Pull Request, ghi trạng thái).

**Phiên N4b · Ngữ văn 6 cuối kì I: nâng lên ngân hàng (từ 2 đề có sẵn)** (tách từ N4)
> Đọc CLAUDE.md và docs/KE-HOACH-NOI-DUNG.md (mục 2, 3, 7). Tạo ngân hàng câu "Ngữ văn 6 · Cuối kì I" khoảng 75 câu, sách Kết nối tri thức, phạm vi Bài 1–5 (Tôi và các bạn; Gõ cửa trái tim; Yêu thương và chia sẻ; Quê hương yêu dấu; Những nẻo đường xứ sở), có chủ đề, mức độ, lời giải, câu tự soạn, không chép sách hay đề có bản quyền.
> - Kho = 50 câu của van6-ck1-de1, van6-ck1-de2 (giữ nguyên mã, câu, chữ chủ đề; chỉ thêm lv) + khoảng 25 câu riêng của van6-ck1-ngau-nhien (đã có trong danh mục, chưa có câu riêng), ghi vào data/banks/6-van.js. Không thêm đề cố định.
> - Đọc hiểu: ngữ liệu ngoài sách, tự viết, cùng thể loại với văn bản của từng bài, viết một lần ở passages (3–5 đoạn, mỗi đoạn 3–4 câu đủ ba mức; câu nào cũng làm được khi chỉ rút riêng câu đó cùng đoạn). Câu đọc hiểu đặt chủ đề theo tên bài cùng thể loại, như đề có sẵn ("Tôi và các bạn", "Gõ cửa trái tim"…). Tiếng Việt như đề có sẵn, dùng đúng chữ chủ đề cũ (Dấu câu; Từ đơn và từ phức; Nghĩa của từ; Biện pháp tu từ; Cụm danh từ, cụm động từ, cụm tính từ; Từ đồng âm và từ đa nghĩa).
> - Viết: 4–5 câu tự luận chủ đề "Viết" theo kiểu bài học kì I (kể lại một trải nghiệm của bản thân; đoạn văn ghi lại cảm xúc về một bài thơ có yếu tố tự sự và miêu tả; đoạn văn thể hiện cảm xúc về một bài thơ lục bát; tả cảnh sinh hoạt), đề nêu rõ độ dài (đoạn văn khoảng 150–200 chữ), thang tự chấm theo ý (điểm chia hết cho 0,25), đáp án gợi ý. Dạng khác: đúng/sai 4 ý, nối cột, sắp xếp, điền.
> - Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7, 25 câu, 45 phút (như Phiên N1, không cần tra lại): đổi matrix của van6-ck1-ngau-nhien sang [Biết, Hiểu, Vận dụng], "Viết": [0, 0, 1]; mỗi ô nên có ít nhất gấp đôi số câu ô đó rút. Note của đề ngẫu nhiên ghi phạm vi, 10 – 8 – 7, một câu Viết tự chấm; note hai đề cố định giữ nguyên.
> - Kì thi: van6-ck1-ngau-nhien đã gắn vào ck1-l6. Kiểm thử: không có số ghi cứng về kho Ngữ văn 6.
>
> Còn lại theo Quy định chung ở mục 7 của docs/KE-HOACH-NOI-DUNG.md (phạm vi sửa, điều kiện xong, ngày cố định của kiểm thử, Pull Request, ghi trạng thái).

**Phiên N5 · Tiếng Anh 6, KHTN 6 cuối kì I**
> Đọc CLAUDE.md và docs/KE-HOACH-NOI-DUNG.md (mục 2, 3, 7). Tạo ngân hàng câu "Tiếng Anh 6 · Cuối kì I" (Global Success 6, đề 100% tiếng Anh kể cả lời dặn, lời giải, đoạn đọc theo mục 3) và "KHTN 6 · Cuối kì I" (Kết nối tri thức), mỗi ngân hàng khoảng 75 câu, có chủ đề, mức độ, lời giải, câu tự soạn, không chép sách hay đề có bản quyền.
> - **Tiếng Anh 6** (data/banks/6-ta.js), phạm vi như ta6-ck1-de1 (đã viết lại ở Phiên TA1): Unit 1–6 (My New School; My House; My Friends; My Neighbourhood; Natural Wonders of Viet Nam; Our Tet Holiday), không có câu nghe (luyện nghe ở bài ôn IOE 6). Kho = ta6-ck1-de1 (giữ nguyên, đã có lv) + ta6-ck1-de2 "Tiếng Anh 6 · Cuối kì I · Đề 2" (25 câu, 45 phút, cấu trúc như đề 1: Pronunciation, các Unit, Reading; 10 – 8 – 7) + khoảng 25 câu riêng của đề ngẫu nhiên mới ta6-ck1-ngau-nhien "Tiếng Anh 6 · Cuối kì I · Đề ngẫu nhiên" (from = ["ta6-ck1-de1", "ta6-ck1-de2"], 45 phút). Chủ đề "Pronunciation", "Unit N · <tên Unit>", "Reading" như đề 1. Dạng câu và lời dặn theo bảng ở mục 3: trắc nghiệm (từ vựng, ngữ pháp, phát âm, odd one out), điền (one word, verb form), order (word order, sentence building), match, đọc hiểu bằng passages (mã đoạn không trùng nhau trong cả kho, đề 1 đã dùng "nam"; tf và tf4 "Read the text again. Is each sentence true or false?"). Không thêm câu tự luận.
> - **KHTN 6** (data/banks/6-khtn.js), phạm vi như khtn6-ck1-de1 (Bài 1–24: mở đầu, an toàn, kính lúp, kính hiển vi, đo chiều dài, khối lượng, thời gian, nhiệt độ; các thể của chất; oxygen và không khí; vật liệu, nhiên liệu, nguyên liệu, lương thực – thực phẩm; hỗn hợp và tách chất; tế bào; từ tế bào đến cơ thể). Không gồm đa dạng thế giới sống, lực, năng lượng, Trái Đất và bầu trời; note nhắc phụ huynh đối chiếu đề cương như đề 1. Kho = khtn6-ck1-de1 (giữ nguyên, thêm lv) + khtn6-ck1-de2 "KHTN 6 · Cuối kì I · Đề 2" (25 câu, 45 phút, 10 – 8 – 7) + khoảng 25 câu riêng của đề ngẫu nhiên mới khtn6-ck1-ngau-nhien "KHTN 6 · Cuối kì I · Đề ngẫu nhiên" (from = ["khtn6-ck1-de1", "khtn6-ck1-de2"], 45 phút). Chủ đề đúng chữ cũ. Dạng câu theo khung Công văn 7991 (nhiều lựa chọn, đúng/sai 4 ý, trả lời ngắn): đúng/sai 4 ý, trả lời bằng số (đọc số đo, đổi đơn vị đo), nối cột (dụng cụ – công dụng, thành phần tế bào – chức năng), sắp xếp (các bước dùng kính hiển vi, đo nhiệt độ, tách chất), vài câu có hình SVG (thước, nhiệt kế, tế bào). Câu có phép tính tính lại bằng code (tests/khtn6-ck1.js, in MATH OK).
> - Cả hai: ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7, 25 câu (khoảng 40 – 30 – 30%, như Phiên N1, không cần tra lại), mỗi ô có ít nhất gấp đôi số câu ô đó rút. Note của đề mới ghi phạm vi, 10 – 8 – 7 (Tiếng Anh viết bằng tiếng Anh). Gắn ta6-ck1-de2, ta6-ck1-ngau-nhien, khtn6-ck1-de2, khtn6-ck1-ngau-nhien vào ck1-l6.
> - Kiểm thử phải sửa, bước 9e của tests/e2e.js: hàng Tiếng Anh của nhóm ck1-l6 (f9e.l6.taCk1) đang mong "Đề 1" → "Đề ngẫu nhiên,Đề 1,Đề 2"; sửa cả chú thích L24 của bước. Bước TA1, TA2 chỉ làm ta4-ck1-de1, ta6-ck1-de1, ta6-gk1-de1 (giữ nguyên) nên không đổi.
>
> Còn lại theo Quy định chung ở mục 7 của docs/KE-HOACH-NOI-DUNG.md (phạm vi sửa, điều kiện xong, ngày cố định của kiểm thử, Pull Request, ghi trạng thái).

**Phiên N6 · Lịch sử và Địa lí 6, GDCD 6, Tin học 6, Công nghệ 6 cuối kì I**
> Đọc CLAUDE.md và docs/KE-HOACH-NOI-DUNG.md (mục 2, 3, 7). Tạo bốn ngân hàng câu "Lịch sử và Địa lí 6 · Cuối kì I" (khoảng 60 câu), "GDCD 6 · Cuối kì I", "Tin học 6 · Cuối kì I", "Công nghệ 6 · Cuối kì I" (mỗi ngân hàng 50 câu), sách Kết nối tri thức, có chủ đề, mức độ, lời giải, câu tự soạn, không chép sách hay đề có bản quyền.
> - Mỗi môn: giữ đề có sẵn …6-ck1-de1 (giữ nguyên mã, câu, chữ chủ đề; chỉ thêm lv); thêm đề cố định "<môn> 6 · Cuối kì I · Đề 2" (<môn> đúng chữ môn của đề 1: Lịch sử và Địa lí, GDCD, Tin học, Công nghệ) (25 câu, cùng số phút với đề 1, đủ chủ đề, 10 – 8 – 7) và đề ngẫu nhiên "<môn> 6 · Cuối kì I · Đề ngẫu nhiên" (pool, from = mã đề 1 và Đề 2 của môn đó, cùng số phút). Mã mới: lsdl6-ck1-de2, lsdl6-ck1-ngau-nhien (6-lsdl.js, 45 phút); gdcd6-ck1-de2, gdcd6-ck1-ngau-nhien (6-gdcd.js, 35 phút); tin6-ck1-de2, tin6-ck1-ngau-nhien (6-tin.js, 35 phút); congnghe6-ck1-de2, congnghe6-ck1-ngau-nhien (6-congnghe.js, 35 phút). Chỉ đề ngẫu nhiên Lịch sử và Địa lí có câu riêng; ba đề ngẫu nhiên kia không ghi vào file.
> - **Lịch sử và Địa lí 6**: Lịch sử Bài 1–10 như đề 1. Địa lí: đề 1 chỉ có Bài 1–9 (bản đồ; Trái Đất trong hệ Mặt Trời, các chuyển động, xác định phương hướng), còn phân phối chương trình các trường thường dạy học kì I đến hết Chương 3 và lớp vỏ khí, nên phạm vi ngân hàng là Bài 1–15: thêm Bài 10 Cấu tạo của Trái Đất. Các mảng kiến tạo; Bài 11 Quá trình nội sinh và ngoại sinh. Hiện tượng tạo núi; Bài 12 Núi lửa và động đất; Bài 13 Các dạng địa hình chính trên Trái Đất. Khoáng sản; Bài 14 Thực hành đọc lược đồ địa hình, lát cắt địa hình; Bài 15 Lớp vỏ khí của Trái Đất. Khí áp và gió. Câu cho các bài này nằm ở Đề 2 và khoảng 10 câu riêng của đề ngẫu nhiên (chủ đề mới theo tên bài rút gọn). Note của Đề 2 và đề ngẫu nhiên ghi phạm vi Bài 1–15 và nhắc phụ huynh đối chiếu đề cương của trường. Câu tính tỉ lệ bản đồ, khoảng cách, giờ tính lại bằng code.
> - **GDCD 6**: Bài 1–6 như đề 1 (Tự hào về truyền thống gia đình, dòng họ; Yêu thương con người; Siêng năng, kiên trì; Tôn trọng sự thật; Tự lập; Tự nhận thức bản thân); nhiều câu tình huống, đúng/sai 4 ý về một tình huống, nối cột (biểu hiện – phẩm chất).
> - **Tin học 6**: Bài 1–9 như đề 1; trả lời bằng số đổi đơn vị dữ liệu (bit, byte, KB, MB, GB), sắp xếp các bước (gửi thư điện tử, tìm kiếm thông tin), nối cột (thiết bị – chức năng, dịch vụ – công dụng).
> - **Công nghệ 6**: Bài 1–6 như đề 1 (nhà ở; sử dụng năng lượng trong gia đình; ngôi nhà thông minh; thực phẩm và dinh dưỡng; bảo quản và chế biến thực phẩm; dự án bữa ăn); sắp xếp các bước chế biến, bảo quản; nối cột (nhóm thực phẩm – chất dinh dưỡng chính).
> - Dạng câu chung theo khung Công văn 7991 (nhiều lựa chọn, đúng/sai 4 ý, trả lời ngắn bằng điền hoặc số): mỗi môn có ít nhất 3 câu đúng/sai 4 ý; không thêm câu tự luận (ma trận không rút thì kiem-tra-de.js nhắc).
> - Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7, 25 câu (khoảng 40 – 30 – 30%, như Phiên N1, không cần tra lại). Kho GDCD, Tin học, Công nghệ chỉ 50 câu nên Đề 2 bù mức mà đề 1 còn thiếu (thường là Vận dụng), để ô nào của ma trận cũng đủ câu. Câu có phép tính (Địa lí, Tin học) kiểm tra bằng một script node nhỏ trong tests/ (in MATH OK). Gắn 8 mã mới vào ck1-l6.
> - Kiểm thử: không có số ghi cứng về bốn môn này.
>
> Còn lại theo Quy định chung ở mục 7 của docs/KE-HOACH-NOI-DUNG.md (phạm vi sửa, điều kiện xong, ngày cố định của kiểm thử, Pull Request, ghi trạng thái).

### Kĩ thuật cho đề ngẫu nhiên

**Phiên K4 · Đề ngẫu nhiên rút giữ trọn đoạn đọc** (kĩ thuật; sau N4, trước N7b, N9, N10)
> Đọc CLAUDE.md (mục “Đề ngẫu nhiên”) và docs/KE-HOACH-NOI-DUNG.md (mục 3, 7). Làm sau khi N4 đã gộp (cùng sửa bước K3 của tests/e2e.js); không chạy cùng lúc với phiên khác sửa js/quiz.js.
> - Hiện Quiz.draw rút câu theo từng ô (chủ đề, mức), nên một lần rút 7 câu đọc hiểu có thể lấy từ 5–7 đoạn đọc khác nhau, không giống đề thật (một đoạn, nhiều câu). Sửa để câu dùng chung một đoạn đọc (p có trong passages của kho) được rút theo đoạn: k câu của một chủ đề có đoạn đọc lấy từ ít đoạn nhất có thể, không quá ⌈k/3⌉ đoạn (7 câu: tối đa 3 đoạn); mỗi đoạn lấy cả đoạn hoặc càng nhiều câu càng tốt; tổng số câu của chủ đề đúng ma trận; số câu từng mức gần ma trận nhất (lệch không quá 1 câu mỗi mức thì không ghi chú cho học sinh).
> - Vẫn ưu tiên câu chưa làm hoặc hay sai, tính theo đoạn (đoạn có câu chưa làm, hay sai được chọn trước); “Làm đề khác” ra đoạn khác khi kho còn đoạn chưa làm.
> - Câu không có đoạn đọc và đề ngẫu nhiên không có passages rút như cũ (cùng cách ưu tiên, lấy bù, ghi chú). Không đổi dữ liệu trong data/banks/, cách chấm, cách lưu kết quả, Quiz.key.
> - tests/kiem-tra-de.js: rút thử theo cách mới (đúng n câu, không trùng, câu cùng đoạn đi cùng nhau), điều kiện “Nhắc:” tính đúng cho chủ đề có đoạn đọc; thêm tự thử với kho giả có đoạn đọc.
> - tests/e2e.js: thêm một bước rút nhiều lần các đề ngẫu nhiên có đoạn đọc đang có (Tiếng Việt 4, Ngữ văn 6, Tiếng Anh 4, Tiếng Anh 6 cuối kì I): lần nào cũng đủ n câu, đúng số câu từng chủ đề, số đoạn không quá ⌈k/3⌉, các câu cùng đoạn đứng liền nhau trên màn làm bài; bước K3 vẫn qua.
> - Cập nhật CLAUDE.md (mục “Đề ngẫu nhiên”) và mục 3 của docs/KE-HOACH-NOI-DUNG.md (ghi chú cho các phiên làm đề: mỗi đoạn đọc bao nhiêu câu, đủ mấy mức).
>
> Chạy node tests/kiem-tra-de.js (DE OK), tests/e2e.js (E2E OK) và tests/supabase/cloud-e2e.js (CLOUD E2E OK, có vòng rút đề K3), chỉ tự rà soát một vòng, rồi mở Pull Request. Có số PR thì ghi phiên đã xong theo quy ước ở đầu docs/KE-HOACH-PHAT-TRIEN-ONUP.md và xóa khối lời giao việc này cùng dòng K4 trong bảng ở mục 7 của docs/KE-HOACH-NOI-DUNG.md.

### Giữa kì II

Phạm vi lớp 6 lấy theo phân phối chương trình và đề cương giữa kì II của các trường (nguồn ở cuối mục này). N8 ghi phạm vi cả 8 môn vào lịch thi một lần, các phiên sau dùng đúng phạm vi đó. Lớp 6 làm trước (chưa có đề nào), lớp 4 đã có 2 đề mỗi môn nên N7, N7b làm sau.

**Phiên N7 · Toán 4 giữa kì II: nâng lên ngân hàng (từ 2 đề có sẵn)**
> Đọc CLAUDE.md và docs/KE-HOACH-NOI-DUNG.md (mục 2, 3, 7). Tạo ngân hàng câu "Toán 4 · Giữa kì II" khoảng 100 câu, sách Kết nối tri thức, phạm vi Bài 38–59 như 2 đề có sẵn (nhân, chia với số có một, hai chữ số; tính chất phép nhân; nhân, chia với 10, 100, 1 000; ước lượng; số trung bình cộng; bài toán rút về đơn vị; dãy số liệu, biểu đồ cột; số lần xuất hiện của sự kiện; phân số, tính chất cơ bản, rút gọn, quy đồng mẫu số, so sánh phân số), có chủ đề, mức độ, lời giải, câu tự soạn, không chép sách hay đề có bản quyền.
> - Kho = 50 câu của toan4-gk2-de1, toan4-gk2-de2 (giữ nguyên mã, câu, chữ chủ đề; chỉ thêm lv) + khoảng 50 câu riêng của toan4-gk2-ngau-nhien (đã có trong danh mục, chưa có câu riêng), ghi vào data/banks/4-toan.js. Không thêm đề cố định. Chủ đề đúng chữ cũ (Phép nhân; Phép chia; Tính chất phép nhân; Nhân, chia với 10, 100, 1 000; Ước lượng; Số trung bình cộng; Rút về đơn vị; Dãy số liệu, biểu đồ cột; Số lần xuất hiện của sự kiện; Phân số; Rút gọn phân số; Quy đồng mẫu số; So sánh phân số; Tính chất cơ bản của phân số).
> - Dạng câu như ngân hàng Toán 4 cuối kì I (Phiên N1): đúng/sai 4 ý, trả lời bằng số, nối cột, sắp xếp, 2–3 câu tự luận (giải toán có lời văn, thang tự chấm, đặt ở ô Vận dụng xen với câu chấm tự động), khoảng 8 câu có hình SVG (biểu đồ cột để đọc số liệu, hình chia phần tô màu cho phân số). Số viết như dữ liệu đang có: ngăn hàng nghìn bằng khoảng trắng (“1 200”, CLAUDE.md, Quy ước code), phân số viết a/b (“18/24”). Đáp án là phân số: dùng trắc nghiệm, câu điền hỏi tử số hoặc mẫu số (“… viết thành ___/12” như đề có sẵn), câu trả lời bằng số với ans "a/b" (ô số có nút “/”, chấm theo giá trị nên 6/8 cũng đúng với "3/4"; mục 3, “Đã làm ở Phiên 9h”), hoặc câu điền cả phân số khi đề bắt viết phân số tối giản (ans "3/4", so chữ; đề dặn viết phân số tối giản).
> - Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7, 25 câu, 40 phút (Thông tư 27/2020, như Phiên N1, không cần tra lại): đổi matrix của toan4-gk2-ngau-nhien sang [Biết, Hiểu, Vận dụng], mỗi ô có ít nhất gấp đôi số câu ô đó rút. Note của đề ngẫu nhiên ghi phạm vi, 10 – 8 – 7, “Có lời giải từng câu.”
> - Tính lại mọi đáp án bằng code: mở rộng tests/toan4-gk2.js cho cả câu riêng và các dạng mới theo mẫu tests/toan4-ck1.js (đọc chiều cao cột trong hình biểu đồ, đếm phần tô màu), kiểm tra lv và rút thử 10 – 8 – 7; in MATH OK.
> - Kì thi: toan4-gk2-ngau-nhien đã gắn vào gk2-l4.
> - Kiểm thử phải sửa (CLAUDE.md, mục "Thêm đề có sẵn", bước 4 đã ghi): tests/e2e.js bước "seed banks load on demand" (danh sách mã trong ONTAP_SEED_QUESTIONS sau khi tải 4-toan.js có thêm toan4-gk2-ngau-nhien; số câu kho "50/25" của đề ngẫu nhiên giữa kì II thành số mới) và tests/supabase/store-test.mjs mục 7 (pool2.questions.length === 50). Chạy thêm node tests/supabase/store-test.mjs (in SUPABASE STORE OK). Sửa luôn chú thích "giữa kì II: 2 đề = 50 câu" ở bước đó của tests/e2e.js.
>
> Còn lại theo Quy định chung ở mục 7 của docs/KE-HOACH-NOI-DUNG.md (phạm vi sửa, điều kiện xong, ngày cố định của kiểm thử, Pull Request, ghi trạng thái).

**Phiên N7b · Tiếng Việt 4 giữa kì II: nâng lên ngân hàng (từ 2 đề có sẵn)** (tách từ N7; làm sau N2)
> Đọc CLAUDE.md và docs/KE-HOACH-NOI-DUNG.md (mục 2, 3, 7). Tạo ngân hàng câu "Tiếng Việt 4 · Giữa kì II" khoảng 100 câu, sách Kết nối tri thức, phạm vi tập 2, Bài 1–16 (chủ điểm Sống để yêu thương, Uống nước nhớ nguồn), có chủ đề, mức độ, lời giải, câu tự soạn, không chép sách hay đề có bản quyền; đoạn đọc tự viết.
> - Kho = 50 câu của tv4-gk2-de1, tv4-gk2-de2 (giữ nguyên mã, câu, chữ chủ đề; chỉ thêm lv) + khoảng 50 câu riêng của tv4-gk2-ngau-nhien (đã có trong danh mục, chưa có câu riêng), ghi vào data/banks/4-tv.js. Không thêm đề cố định.
> - Luyện từ và câu theo sách: câu; hai thành phần chính của câu (chủ ngữ, vị ngữ); trạng ngữ; trạng ngữ chỉ thời gian, nơi chốn; trạng ngữ chỉ nguyên nhân, mục đích; mở rộng vốn từ theo chủ điểm. Chủ đề đúng chữ cũ (Đọc hiểu; Câu; Chủ ngữ; Vị ngữ; Trạng ngữ; Trạng ngữ chỉ thời gian, nơi chốn; Trạng ngữ chỉ nguyên nhân, mục đích; Mở rộng vốn từ; Chính tả), thêm "Viết".
> - Dạng câu như ngân hàng Tiếng Việt 4 cuối kì I (Phiên N2, tv4-ck1-ngau-nhien trong data/banks/4-tv.js; đoạn đọc dùng chung, đoạn ngắn 3–4 câu đủ ba mức; nối cột, sắp xếp, đúng/sai 4 ý, điền). 4–6 câu tự luận "Viết" theo kiểu bài nửa đầu học kì II: đoạn văn nêu tình cảm, cảm xúc về người gần gũi, thân thiết hoặc về nhân vật văn học; hướng dẫn sử dụng một sản phẩm; bài văn kể lại một câu chuyện; đoạn văn nêu ý kiến; bài văn thuật lại một sự việc.
> - Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7, 25 câu (Thông tư 27/2020, như Phiên N1, không cần tra lại): đổi matrix của tv4-gk2-ngau-nhien sang [Biết, Hiểu, Vận dụng], Đọc hiểu khoảng 7 câu, "Viết": [0, 0, 1], mỗi ô có ít nhất gấp đôi số câu ô đó rút; minutes của đề ngẫu nhiên 40 (hai đề cố định giữ 35). Note ghi phạm vi, 10 – 8 – 7, một câu Viết tự chấm.
> - Kì thi: đã gắn vào gk2-l4. Kiểm thử: không có số ghi cứng về kho Tiếng Việt 4 giữa kì II.
>
> Còn lại theo Quy định chung ở mục 7 của docs/KE-HOACH-NOI-DUNG.md (phạm vi sửa, điều kiện xong, ngày cố định của kiểm thử, Pull Request, ghi trạng thái).

**Phiên N8 · Toán 6 giữa kì II**
> Đọc CLAUDE.md và docs/KE-HOACH-NOI-DUNG.md (mục 2, 3, 7). Tạo ngân hàng câu "Toán 6 · Giữa kì II" khoảng 100 câu, sách Kết nối tri thức, phạm vi Bài 23–35 (kiểm tra giữa kì II đặt sau Bài 35 theo phân phối chương trình): Chương VI Phân số (Bài 23 Mở rộng phân số. Phân số bằng nhau; Bài 24 So sánh phân số. Hỗn số dương; Bài 25 Phép cộng và phép trừ phân số; Bài 26 Phép nhân và phép chia phân số; Bài 27 Hai bài toán về phân số), Chương VII Số thập phân (Bài 28 Số thập phân; Bài 29 Tính toán với số thập phân; Bài 30 Làm tròn và ước lượng; Bài 31 Một số bài toán về tỉ số và tỉ số phần trăm), Chương VIII đến Bài 35 (Bài 32 Điểm và đường thẳng; Bài 33 Điểm nằm giữa hai điểm. Tia; Bài 34 Đoạn thẳng. Độ dài đoạn thẳng; Bài 35 Trung điểm của đoạn thẳng). Có chủ đề, mức độ, lời giải, câu tự soạn, không chép sách hay đề có bản quyền.
> - Mã mới (data/banks/6-toan.js, 45 phút): toan6-gk2-de1, toan6-gk2-de2 "Toán 6 · Giữa kì II · Đề 1", "… · Đề 2" (mỗi đề 25 câu, đủ chủ đề, 10 – 8 – 7) và toan6-gk2-ngau-nhien "Toán 6 · Giữa kì II · Đề ngẫu nhiên" (pool, from = ["toan6-gk2-de1", "toan6-gk2-de2"], khoảng 50 câu riêng).
> - Chủ đề theo tên bài rút gọn, cùng chữ ở hai đề và câu riêng (ví dụ "Phân số bằng nhau", "So sánh phân số, hỗn số", "Cộng, trừ phân số", "Nhân, chia phân số", "Hai bài toán về phân số", "Số thập phân", "Tính toán với số thập phân", "Làm tròn và ước lượng", "Tỉ số, tỉ số phần trăm", "Điểm, đường thẳng, tia", "Đoạn thẳng, trung điểm").
> - Dạng câu theo khung Công văn 7991 (nhiều lựa chọn, đúng/sai 4 ý, trả lời ngắn, tự luận) như ngân hàng Toán 6 cuối kì I (Phiên N4): trong kho khoảng 10 câu đúng/sai 4 ý, 16 câu trả lời bằng số, 4–5 câu tự luận (đặt ở ô Vận dụng xen với câu chấm tự động), nối cột, sắp xếp, khoảng 12 câu có hình SVG (điểm, đường thẳng, tia, đoạn thẳng, trung điểm; hình chia phần cho phân số). Số viết như dữ liệu đang có: ngăn hàng nghìn bằng khoảng trắng (“1 200”, CLAUDE.md, Quy ước code), số thập phân dùng dấu phẩy (“2,5”), phân số viết a/b (“18/24”, như toan4-gk2). Đáp án là phân số: dùng trắc nghiệm, câu điền hỏi tử số hoặc mẫu số (“… viết thành ___/12”, như toan4-gk2), câu trả lời bằng số với ans "a/b" (ô số có nút “/”, chấm theo giá trị nên 6/8 cũng đúng với "3/4"; mục 3, “Đã làm ở Phiên 9h”), hoặc câu điền cả phân số khi đề bắt viết phân số tối giản (ans "3/4", so chữ; đề dặn viết phân số tối giản). Câu trả lời bằng số dùng cho số nguyên, số thập phân, số âm (nút ±) và phân số (nút “/”); câu điền dùng được cho số thập phân, không dùng cho câu có số âm (L33). Đáp án là hỗn số: như mục 3, “Đã làm ở Phiên 9h”, dòng Hỗn số.
> - Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7, 25 câu, 45 phút (như Phiên N1, không cần tra lại), mỗi ô có ít nhất gấp đôi số câu ô đó rút.
> - Tính lại mọi đáp án bằng code: tests/toan6-gk2.js theo mẫu tests/toan4-ck1.js (phân số tính bằng số hữu tỉ chính xác, số thập phân, làm tròn, tỉ số phần trăm; câu có hình đọc toạ độ để kiểm tra thẳng hàng, điểm nằm giữa, trung điểm, độ dài), kiểm tra lv và rút thử 10 – 8 – 7; in MATH OK.
> - Lịch thi: gắn 3 mã vào gk2-l6 trong data/calendar-2026-2027.js; thay scope "Nửa đầu học kì II." bằng: "Toán: Bài 23–35. Ngữ văn: Bài 6–7. Tiếng Anh: Unit 7–9. KHTN: Bài 25–39 (Đa dạng thế giới sống). Lịch sử và Địa lí: Lịch sử Bài 11–15, Địa lí Bài 16–22. GDCD: Bài 7–9. Tin học: Bài 9–13. Công nghệ: Bài 7–10." (máy và tài khoản đã có lịch giữ chữ cũ; ghi điều này trong Pull Request).
> - Kiểm thử: không có số ghi cứng về giữa kì II lớp 6.
>
> Còn lại theo Quy định chung ở mục 7 của docs/KE-HOACH-NOI-DUNG.md (phạm vi sửa, điều kiện xong, ngày cố định của kiểm thử, Pull Request, ghi trạng thái).

**Phiên N9 · Ngữ văn 6 giữa kì II**
> Đọc CLAUDE.md và docs/KE-HOACH-NOI-DUNG.md (mục 2, 3, 7). Tạo ngân hàng câu "Ngữ văn 6 · Giữa kì II" khoảng 75 câu, sách Kết nối tri thức, phạm vi Bài 6 Chuyện kể về những người anh hùng (truyền thuyết Thánh Gióng; Sơn Tinh, Thủy Tinh; văn bản thông tin Ai ơi mồng 9 tháng 4) và Bài 7 Thế giới cổ tích (Thạch Sanh; Cây khế; Vua chích chòe), có chủ đề, mức độ, lời giải, câu tự soạn, không chép sách hay đề có bản quyền.
> - Mã mới (data/banks/6-van.js, 45 phút): van6-gk2-de1, van6-gk2-de2 "Ngữ văn 6 · Giữa kì II · Đề 1", "… · Đề 2" (mỗi đề 25 câu, 10 – 8 – 7) và van6-gk2-ngau-nhien "Ngữ văn 6 · Giữa kì II · Đề ngẫu nhiên" (pool, from = ["van6-gk2-de1", "van6-gk2-de2"], khoảng 25 câu riêng).
> - Đọc hiểu: chủ yếu ngữ liệu ngoài sách cùng thể loại như đề thật (truyền thuyết, truyện cổ tích Việt Nam và thế giới kể lại bằng lời của mình; văn bản thông tin thuật lại một lễ hội, sự kiện tự viết), viết một lần ở passages, mỗi đoạn 3–4 câu đủ ba mức, câu nào cũng làm được khi chỉ rút riêng câu đó cùng đoạn; kèm vài câu về đặc điểm thể loại và văn bản trong sách.
> - Tiếng Việt theo các mục Thực hành tiếng Việt của Bài 6, 7: từ Hán Việt; từ ghép, từ láy; cụm động từ, cụm tính từ; biện pháp so sánh; dấu chấm phẩy; nghĩa của từ ngữ; biện pháp tu từ. Chủ đề: đọc hiểu theo tên bài ("Chuyện kể về những người anh hùng", "Thế giới cổ tích"), tiếng Việt dùng lại chữ chủ đề đã có ở đề Ngữ văn 6 khi cùng nội dung (Dấu câu; Từ đơn và từ phức; Nghĩa của từ; Biện pháp tu từ; Cụm danh từ, cụm động từ, cụm tính từ), thêm "Viết".
> - Viết: 4–5 câu tự luận chủ đề "Viết" theo kiểu bài của Bài 6, 7 (bài văn thuyết minh thuật lại một sự kiện; bài văn đóng vai nhân vật kể lại một truyện cổ tích): viết mở bài, một đoạn thân bài hoặc dàn ý, nêu rõ độ dài, thang tự chấm theo ý, đáp án gợi ý. Dạng khác: đúng/sai 4 ý, nối cột, sắp xếp (trình tự sự việc trong truyện), điền.
> - Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7, 25 câu, 45 phút (như Phiên N1, không cần tra lại), "Viết": [0, 0, 1], mỗi ô có ít nhất gấp đôi số câu ô đó rút. Gắn 3 mã vào gk2-l6.
> - Kiểm thử: không có số ghi cứng.
>
> Còn lại theo Quy định chung ở mục 7 của docs/KE-HOACH-NOI-DUNG.md (phạm vi sửa, điều kiện xong, ngày cố định của kiểm thử, Pull Request, ghi trạng thái).

**Phiên N10 · Tiếng Anh 6 giữa kì II**
> Đọc CLAUDE.md và docs/KE-HOACH-NOI-DUNG.md (mục 2, 3, 7). Tạo ngân hàng câu "Tiếng Anh 6 · Giữa kì II" khoảng 75 câu, Global Success 6, đề 100% tiếng Anh kể cả lời dặn, lời giải, đoạn đọc theo mục 3, phạm vi Unit 7 Television, Unit 8 Sports and Games, Unit 9 Cities of the World (và Review 3): từ vựng của từng Unit; ngữ pháp Wh-questions, liên từ and, but, so, because, although (Unit 7), thì quá khứ đơn, câu mệnh lệnh (Unit 8), tính từ sở hữu, đại từ sở hữu (Unit 9); phát âm /θ/ – /ð/ (Unit 7), /e/ – /æ/ (Unit 8), /əʊ/ – /aʊ/ (Unit 9). Không có câu nghe (luyện nghe ở bài ôn IOE 6). Có chủ đề, mức độ, lời giải, câu tự soạn, không chép sách hay đề có bản quyền.
> - Mã mới (data/banks/6-ta.js, 45 phút): ta6-gk2-de1, ta6-gk2-de2 (mỗi đề 25 câu, cấu trúc như ta6-gk1-de1: Pronunciation 3, mỗi Unit 6, Reading 4; 10 – 8 – 7; tên "Tiếng Anh 6 · Giữa kì II · Đề 1", "… · Đề 2") và ta6-gk2-ngau-nhien "Tiếng Anh 6 · Giữa kì II · Đề ngẫu nhiên" (pool, from = ["ta6-gk2-de1", "ta6-gk2-de2"], khoảng 25 câu riêng).
> - Chủ đề "Pronunciation", "Unit 7 · Television", "Unit 8 · Sports and Games", "Unit 9 · Cities of the World", "Reading". Dạng câu và lời dặn theo bảng ở mục 3 (trắc nghiệm, odd one out, điền one word và verb form, order, match, đọc hiểu bằng passages với tf, tf4); mã đoạn đọc không trùng nhau trong kho. Không thêm câu tự luận.
> - Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7, 25 câu, 45 phút (như Phiên N1, không cần tra lại), mỗi ô có ít nhất gấp đôi số câu ô đó rút. Note viết bằng tiếng Anh. Gắn 3 mã vào gk2-l6.
> - Kiểm thử: không có số ghi cứng.
>
> Còn lại theo Quy định chung ở mục 7 của docs/KE-HOACH-NOI-DUNG.md (phạm vi sửa, điều kiện xong, ngày cố định của kiểm thử, Pull Request, ghi trạng thái).

**Phiên N11 · KHTN 6 giữa kì II**
> Đọc CLAUDE.md và docs/KE-HOACH-NOI-DUNG.md (mục 2, 3, 7). Tạo ngân hàng câu "KHTN 6 · Giữa kì II" khoảng 75 câu, sách Kết nối tri thức, phạm vi Chương VII Đa dạng thế giới sống, Bài 25–39: hệ thống phân loại sinh vật; khoá lưỡng phân; vi khuẩn (thực hành làm sữa chua và quan sát vi khuẩn); virus; nguyên sinh vật; nấm; thực vật; động vật; đa dạng sinh học; tìm hiểu sinh vật ngoài thiên nhiên; các bài thực hành ra câu về dụng cụ, các bước, điều quan sát được. Có chủ đề, mức độ, lời giải, câu tự soạn, không chép sách hay đề có bản quyền. Note nhắc: trường dạy ba phân môn song song có thể kiểm tra thêm phần đầu Chương VIII Lực trong đời sống (từ Bài 40), phụ huynh đối chiếu đề cương.
> - Mã mới (data/banks/6-khtn.js, 45 phút): khtn6-gk2-de1, khtn6-gk2-de2 "KHTN 6 · Giữa kì II · Đề 1", "… · Đề 2" (mỗi đề 25 câu, 10 – 8 – 7) và khtn6-gk2-ngau-nhien "KHTN 6 · Giữa kì II · Đề ngẫu nhiên" (pool, from = ["khtn6-gk2-de1", "khtn6-gk2-de2"], khoảng 25 câu riêng).
> - Chủ đề theo nhóm bài (ví dụ "Phân loại sinh vật", "Khoá lưỡng phân", "Vi khuẩn", "Virus", "Nguyên sinh vật", "Nấm", "Thực vật", "Động vật", "Đa dạng sinh học").
> - Dạng câu theo khung Công văn 7991 (nhiều lựa chọn, đúng/sai 4 ý, trả lời ngắn): đúng/sai 4 ý; nối cột (sinh vật – nhóm, bệnh – tác nhân, cách phòng); sắp xếp (các bậc phân loại, các bước làm sữa chua, các bước quan sát bằng kính hiển vi); trả lời ngắn bằng điền hoặc số; vài câu có hình SVG (khoá lưỡng phân, sơ đồ cấu tạo đơn giản).
> - Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7, 25 câu, 45 phút (như Phiên N1, không cần tra lại), mỗi ô có ít nhất gấp đôi số câu ô đó rút. Gắn 3 mã vào gk2-l6.
> - Kiểm thử: không có số ghi cứng.
>
> Còn lại theo Quy định chung ở mục 7 của docs/KE-HOACH-NOI-DUNG.md (phạm vi sửa, điều kiện xong, ngày cố định của kiểm thử, Pull Request, ghi trạng thái).

**Phiên N12 · Lịch sử và Địa lí 6, GDCD 6 giữa kì II**
> Đọc CLAUDE.md và docs/KE-HOACH-NOI-DUNG.md (mục 2, 3, 7). Tạo ngân hàng câu "Lịch sử và Địa lí 6 · Giữa kì II" và "GDCD 6 · Giữa kì II", mỗi ngân hàng 50 câu, sách Kết nối tri thức, có chủ đề, mức độ, lời giải, câu tự soạn, không chép sách hay đề có bản quyền.
> - **Lịch sử và Địa lí 6** (data/banks/6-lsdl.js, 45 phút): Lịch sử Bài 11–15 (các quốc gia sơ kì ở Đông Nam Á; sự hình thành và bước đầu phát triển của các vương quốc phong kiến ở Đông Nam Á; giao lưu văn hoá ở Đông Nam Á; nhà nước Văn Lang, Âu Lạc; chính sách cai trị của các triều đại phong kiến phương Bắc và sự chuyển biến của xã hội Âu Lạc), Địa lí Bài 16–22 (nhiệt độ không khí, mây và mưa; thời tiết và khí hậu, biến đổi khí hậu; thực hành phân tích biểu đồ nhiệt độ, lượng mưa; thuỷ quyển và vòng tuần hoàn lớn của nước; sông và hồ, nước ngầm và băng hà; biển và đại dương; lớp đất trên Trái Đất). Note nhắc: phạm vi Địa lí khác nhau giữa các trường, đối chiếu đề cương. Câu tính (nhiệt độ trung bình, tổng lượng mưa, biên độ nhiệt) tính lại bằng code; vài câu có hình SVG biểu đồ nhiệt độ – lượng mưa đơn giản, sơ đồ vòng tuần hoàn của nước.
> - **GDCD 6** (data/banks/6-gdcd.js, 35 phút): Bài 7 Ứng phó với tình huống nguy hiểm; Bài 8 Tiết kiệm; Bài 9 Công dân nước Cộng hoà xã hội chủ nghĩa Việt Nam. Note nhắc: có trường chỉ kiểm tra đến Bài 8. Nhiều câu tình huống, đúng/sai 4 ý về một tình huống, sắp xếp các bước ứng phó, nối cột.
> - Mỗi môn (<môn> đúng chữ môn đang dùng: Lịch sử và Địa lí, GDCD): hai đề cố định "<môn> 6 · Giữa kì II · Đề 1", "… · Đề 2" (25 câu, đủ chủ đề, 10 – 8 – 7) và đề ngẫu nhiên "<môn> 6 · Giữa kì II · Đề ngẫu nhiên" (pool, from = hai đề cố định của môn đó, không câu riêng, không ghi vào file). Mã: lsdl6-gk2-de1, lsdl6-gk2-de2, lsdl6-gk2-ngau-nhien; gdcd6-gk2-de1, gdcd6-gk2-de2, gdcd6-gk2-ngau-nhien. Dạng câu theo khung Công văn 7991 (nhiều lựa chọn, đúng/sai 4 ý, trả lời ngắn bằng điền hoặc số), mỗi môn ít nhất 3 câu đúng/sai 4 ý, không thêm câu tự luận.
> - Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7, 25 câu (như Phiên N1, không cần tra lại); hai đề cùng phân bố chủ đề và mức như ma trận, nên ô nào cũng có gấp đôi số câu ô đó rút. Câu có phép tính kiểm tra bằng một script node nhỏ trong tests/ (in MATH OK). Gắn 6 mã vào gk2-l6.
> - Kiểm thử: không có số ghi cứng.
>
> Còn lại theo Quy định chung ở mục 7 của docs/KE-HOACH-NOI-DUNG.md (phạm vi sửa, điều kiện xong, ngày cố định của kiểm thử, Pull Request, ghi trạng thái).

**Phiên N12b · Tin học 6, Công nghệ 6 giữa kì II** (thêm ngày 19/10/2026: hàng N8–N12 cũ có 6 nhóm môn cho 5 số phiên)
> Đọc CLAUDE.md và docs/KE-HOACH-NOI-DUNG.md (mục 2, 3, 7). Tạo ngân hàng câu "Tin học 6 · Giữa kì II" và "Công nghệ 6 · Giữa kì II", mỗi ngân hàng 50 câu, sách Kết nối tri thức, có chủ đề, mức độ, lời giải, câu tự soạn, không chép sách hay đề có bản quyền.
> - **Tin học 6** (data/banks/6-tin.js, 35 phút): Bài 9 An toàn thông tin trên Internet; Bài 10 Sơ đồ tư duy; Bài 11 Định dạng văn bản; Bài 12 Trình bày thông tin ở dạng bảng; Bài 13 Thực hành: tìm kiếm và thay thế (Bài 14, thực hành tổng hợp, không ra câu). Bài 9 cũng có trong đề cuối kì I (tin6-ck1-de1 ghi học kì I Bài 1–9) vì trường dạy Bài 9 ở học kì I hay học kì II khác nhau: câu Bài 9 tự soạn mới, không trùng câu của đề cuối kì I (kiem-tra-de.js so trùng trong mọi đề), mỗi đề khoảng 3 câu; note nhắc đối chiếu đề cương. Đề không có phần thực hành trên máy; câu hỏi về lệnh, nút, các bước làm, có thể kèm hình SVG đơn giản (sơ đồ tư duy, bảng). Sắp xếp các bước (tạo bảng, định dạng đoạn văn, tìm và thay thế), nối cột (lệnh – tác dụng).
> - **Công nghệ 6** (data/banks/6-congnghe.js, 35 phút): Bài 7 Trang phục trong đời sống; Bài 8 Sử dụng và bảo quản trang phục; Bài 9 Thời trang; Bài 10 Khái quát về đồ dùng điện trong gia đình. Note nhắc: có trường học Bài 7 ở cuối học kì I, có trường chỉ kiểm tra đến Bài 9. Sắp xếp các bước (giặt, là, cất giữ trang phục), nối cột (kí hiệu trên nhãn quần áo – ý nghĩa, đồ dùng điện – thông số).
> - Mỗi môn (<môn> đúng chữ môn đang dùng: Tin học, Công nghệ): hai đề cố định "<môn> 6 · Giữa kì II · Đề 1", "… · Đề 2" (25 câu, đủ chủ đề, 10 – 8 – 7) và đề ngẫu nhiên "<môn> 6 · Giữa kì II · Đề ngẫu nhiên" (pool, from = hai đề cố định của môn đó, không câu riêng, không ghi vào file). Mã: tin6-gk2-de1, tin6-gk2-de2, tin6-gk2-ngau-nhien; congnghe6-gk2-de1, congnghe6-gk2-de2, congnghe6-gk2-ngau-nhien. Dạng câu theo khung Công văn 7991 (nhiều lựa chọn, đúng/sai 4 ý, trả lời ngắn bằng điền hoặc số), mỗi môn ít nhất 3 câu đúng/sai 4 ý, không thêm câu tự luận.
> - Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7, 25 câu (như Phiên N1, không cần tra lại); hai đề cùng phân bố chủ đề và mức như ma trận, nên ô nào cũng có gấp đôi số câu ô đó rút. Câu có phép tính (nếu có) kiểm tra bằng code. Gắn 6 mã vào gk2-l6.
> - Kiểm thử: không có số ghi cứng.
>
> Còn lại theo Quy định chung ở mục 7 của docs/KE-HOACH-NOI-DUNG.md (phạm vi sửa, điều kiện xong, ngày cố định của kiểm thử, Pull Request, ghi trạng thái).

### Nguồn phạm vi bài (tra ngày 19/10/2026)

Phạm vi các bài khác nhau giữa các trường; các nguồn dưới đây là phân phối chương trình và đề cương phổ biến của sách Kết nối tri thức.

- Công văn 7991/BGDĐT-GDTrH, cấu trúc đề định kì (trắc nghiệm 7 điểm: nhiều lựa chọn 3, đúng/sai 2, trả lời ngắn 2; tự luận 3): [hoatieu.vn](https://hoatieu.vn/phap-luat/cong-van-7991-bgddt-gdtrh-2024-kiem-tra-danh-gia-cap-thcs-thpt-227764), [lsvn.vn](https://lsvn.vn/bo-gd-dt-thay-doi-cau-truc-de-kiem-tra-dinh-ky-thpt-a151617.html); ma trận lớp 6 ghi “CV 7991”: [Toán 6](https://hoatieu.vn/ma-tran-de-thi-giua-hoc-ki-2-mon-toan-6-246844), [KHTN 6](https://hoatieu.vn/ma-tran-de-thi-giua-hoc-ki-2-mon-khoa-hoc-tu-nhien-6-247175), [Địa lí 6](https://hoatieu.vn/ma-tran-de-thi-giua-hoc-ki-2-mon-dia-li-6-246371)
- Phân phối chương trình lớp 6 (Toán, Lịch sử, Địa lí, GDCD, Tin học): [hoatieu.vn](https://hoatieu.vn/tai-lieu/phan-phoi-chuong-trinh-lop-6-sach-ket-noi-tri-thuc-voi-cuoc-song-tat-ca-cac-mon-209429), [Toán 6](https://hoatieu.vn/phan-phoi-chuong-trinh-toan-lop-6-sach-ket-noi-tri-thuc-voi-cuoc-song-209428)
- Đề cương giữa kì II lớp 6: [Ngữ văn](https://thcsnguyenduccanh.dongtrieu.edu.vn/documents/48078/13128207/%C4%90%E1%BB%81%20c%C6%B0%C6%A1ng+%C3%B4n+t%E1%BA%ADp+gi%E1%BB%AFa+HKII+m%C3%B4n+Ng%E1%BB%AF%20v%C4%83n+6+n%C4%83m+h%E1%BB%8Dc+2023-2024), [Ngữ văn (hoatieu)](https://hoatieu.vn/de-cuong-giua-hoc-ki-2-mon-ngu-van-6-ket-noi-tri-thuc-219606), [LS&ĐL](https://hoatieu.vn/de-cuong-on-tap-giua-hoc-ki-2-lich-su-dia-li-6-ket-noi-tri-thuc-246908), [KHTN](https://hoatieu.vn/de-cuong-on-tap-giua-hoc-ki-2-mon-khoa-hoc-tu-nhien-6-sach-ket-noi-tri-thuc-219582), [Tin học](https://hoatieu.vn/de-cuong-on-tap-giua-hoc-ki-2-tin-hoc-6-ket-noi-tri-thuc-246903), [Công nghệ](https://hoatieu.vn/de-cuong-on-tap-giua-hoc-ki-2-cong-nghe-6-ket-noi-tri-thuc-247048), [GDCD](https://vietjack.com/de-kiem-tra-lop-6/de-cuong-on-tap-giua-ki-2-gdcd-lop-6-ket-noi.jsp), [Tiếng Anh](https://hoatieu.vn/de-cuong-on-tap-giua-hoc-ki-2-tieng-anh-6-global-success-247336)
- Ngữ văn 6 tập 2, Thực hành tiếng Việt: [Bài 6 tr. 9](https://hoatieu.vn/powerpoint-ngu-van-6-bai-6-thuc-hanh-tieng-viet-trang-9-244985), [Bài 6 tr. 13](https://hoatieu.vn/powerpoint-ngu-van-6-bai-6-thuc-hanh-tieng-viet-trang-13-244987), [Bài 7 tr. 30](https://hoatieu.vn/powerpoint-ngu-van-6-bai-7-thuc-hanh-tieng-viet-trang-30-244998), [Bài 7 tr. 35](https://hoatieu.vn/powerpoint-ngu-van-6-bai-7-thuc-hanh-tieng-viet-trang-35-245000); Viết [Bài 6](https://hoatieu.vn/powerpoint-ngu-van-6-bai-6-viet-bai-van-thuyet-minh-thuat-lai-mot-su-kien-244989), [Bài 7](https://hoatieu.vn/powerpoint-ngu-van-6-bai-7-viet-bai-van-dong-vai-nhan-vat-ke-lai-mot-truyen-co-tich-245002); Viết học kì I: [vietjack](https://vietjack.com/soan-van-lop-6-kn/viet-lop-6.jsp)
- KHTN 6, tên bài Chương VII: [Bài 25](https://hoatieu.vn/powerpoint-khoa-hoc-tu-nhien-6-bai-25-ket-noi-tri-thuc-252395), [Bài 38](https://hoatieu.vn/powerpoint-khoa-hoc-tu-nhien-6-bai-38-ket-noi-tri-thuc-252484), [Bài 39](https://hoatieu.vn/powerpoint-khoa-hoc-tu-nhien-6-bai-39-ket-noi-tri-thuc-252485), [Bài 40](https://hoatieu.vn/powerpoint-khoa-hoc-tu-nhien-6-bai-40-ket-noi-tri-thuc-252486)
- Lớp 4: [Kế hoạch dạy học Tiếng Việt 4](https://hoatieu.vn/tai-lieu/ke-hoach-day-hoc-tieng-viet-4-ket-noi-tri-thuc-221231), [Khoa học 4](https://hoatieu.vn/tai-lieu/ke-hoach-day-hoc-mon-khoa-hoc-lop-4-ket-noi-tri-thuc-221309), [Công nghệ 4](https://hoatieu.vn/tai-lieu/ke-hoach-day-hoc-mon-cong-nghe-lop-4-ket-noi-tri-thuc-221463), [Tin học 4](https://hoatieu.vn/giao-an-tin-hoc-4-kntt-hk1-245267); LS&ĐL 4: [Bài 6](https://hoatieu.vn/powerpoint-lich-su-dia-li-4-bai-6-ket-noi-tri-thuc-251597), [Bài 10](https://loigiaihay.com/bai-10-mot-so-net-van-hoa-o-vung-dong-bang-bac-bo-sgk-lich-su-va-dia-li-4-ket-noi-tri-thuc-a151089.html), [Bài 15](https://hoatieu.vn/powerpoint-lich-su-dia-li-4-bai-15-ket-noi-tri-thuc-251686)

### Lớp 5, 7–12

Dùng cùng mẫu lời giao việc, bốn ý thêm từ Phiên N1 và Quy định chung ở đầu mục này, theo thứ tự ở mục 4. Mỗi khối trước khi bật cần:
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
| Đề sai đáp án, sai chương trình | Bộ kiểm tra đề (K1); tính lại đáp án Toán, Lí, Hóa bằng code; bố mẹ, giáo viên rà; nút “Báo câu này sai” trong app (Phiên R1, trong [KE-HOACH-PHAT-TRIEN-ONUP.md](KE-HOACH-PHAT-TRIEN-ONUP.md)) |
| Đề không theo yêu cầu của chủ app (đề Tiếng Anh lẫn tiếng Việt, gặp khi chạy thử 18/10/2026) | Quy tắc ở mục 3 và CLAUDE.md; `tests/kiem-tra-de.js` kiểm tra đề Tiếng Anh không có chữ tiếng Việt (Phiên TA1) |
| Hết lượt dùng Claude giữa mùa thi | Làm trước hạn kì thi ít nhất 3 tuần; một phiên một môn lớn hoặc hai môn nhỏ (mục 7) |
| Kiểm thử ghi cứng theo kho đề nên hỏng khi thêm đề | Lời giao việc ghi chỗ phải sửa; từ Phiên 9g hai script kiểm thử chạy ở một ngày cố định nên không hỏng theo ngày chạy (Quy định chung ở mục 7) |
| Dữ liệu phình to, app chậm | K1 tách file; B4 chỉ tải 90 ngày; đề trả phí tải khi mở |
| Bị chép đề khi repo công khai | Đến khi bán chấp nhận repo công khai (đã chốt 18/10/2026); B1, B2 ngay trước khi bán |
| Mất dữ liệu trên Supabase gói Free (không có sao lưu, project tự tạm dừng) | Chủ app xuất CSV hằng tuần, mở app ít nhất mỗi tuần một lần; lên gói Pro khi bắt đầu thu tiền |
| Sách hoặc lịch thi thay đổi | Theo dõi thông báo của Bộ, Sở; ngày chưa công bố để dự kiến; câu hỏi gắn bài và tuần học để sửa nhanh |
