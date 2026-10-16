# Kế hoạch phát triển OnUp

> **Trạng thái (16/10/2026): TẠM DỪNG PHÁT TRIỂN để chạy thử với học sinh.**
> Trang vẫn chạy bình thường ở https://dunglnh.github.io/OnUp/. Chưa mở phiên Claude Code mới cho OnUp cho tới khi có góp ý từ việc dùng thật.

## 1. Tình hình hiện tại

**Credit cloud session $100** (hạn 5/11/2026): theo trang Usage ngày 16/10, mục credit không còn hiện và Claude Code đã chiếm 47% mức dùng tuần của gói Pro, nên credit coi như **đã dùng hết**. Từ nay mỗi phiên cloud **trừ vào giới hạn tuần của gói Pro**, dùng chung với phần chat.

**Đã xong** (tất cả đã gộp vào `main`):

| PR | Việc |
|---|---|
| #1 | Phiên 1: 3 đề Toán 4 cuối kì I |
| #3 | Phiên 2: 2 đề Tiếng Việt 4 cuối kì I |
| #5 | Phiên 3: 2 đề Toán 6, 2 đề Ngữ văn 6 cuối kì I |
| #4 | Phiên 4: Khoa học 4, Lịch sử và Địa lí 4, KHTN 6, Lịch sử và Địa lí 6 cuối kì I |
| #6 | Phiên 5: đồng bộ đám mây (Supabase), có hướng dẫn cài từng bước — **chưa bật** (`js/config.js` để trống) |
| #8 | Phiên 5b: chống máy tự động (CAPTCHA) cho bản đám mây — chỉ chạy khi có khóa |
| #10 | Phiên 8: rà soát đề (56 chỗ sửa), bộ chấm điền khuyết, giao diện 360px |
| #7, #9 | Canh trái nút quay lại; xưng "bạn" trong bài ôn; bỏ 2 bộ mẫu 12 câu |

Nội dung hiện có: 4 bài ôn (giữa kì I lớp 4, lớp 6; IOE 4 cấp trường và cấp xã; IOE 6 cấp xã và cấp thành phố) và 17 đề cuối kì I (lớp 6 đủ 8 môn từ Phiên 10: thêm Tiếng Anh, GDCD, Tin học, Công nghệ).

**Chưa làm từ kế hoạch cũ:** Phiên 6 (nhập đề từ Excel). Phiên 7 (báo cáo tuần cho phụ huynh) đã làm ở Phiên 12.

## 2. Trong thời gian chạy thử (việc của bố mẹ, không tốn lượt dùng)

1. Cho con dùng hằng ngày trên máy quen; mỗi tuần tải file sao lưu (Quản trị → Dữ liệu).
2. Khi trường báo lịch chính thức, sửa ngày trong Quản trị → Lịch thi.
3. **Ghi góp ý vào GitHub Issues** (repo → Issues → New issue), mỗi vấn đề một issue, kèm ảnh chụp màn hình nếu có. Ví dụ: “Câu 7 đề Toán 4 số 2 sai đáp án”, “Nút Kiểm tra khó bấm trên điện thoại”.
4. Tùy chọn: bật đồng bộ đám mây theo `docs/HUONG-DAN-SUPABASE.md` nếu bố mẹ và con dùng máy khác nhau. Lưu ý `main` đang được bảo vệ: khi sửa `js/config.js` trên GitHub, chọn “Create a new branch… and start a pull request”, rồi tự Merge.

## 3. Lộ trình khi làm tiếp

Mỗi dòng là **một phiên Claude Code riêng**: mở claude.ai/code, chọn repo `dunglnh/OnUp`, dán lời giao việc ở mục 4, xem Pull Request rồi Merge. Thứ tự theo lịch thi.

| Ưu tiên | Nên xong trước | Phiên | Kì thi phục vụ |
|---|---|---|---|
| 1 | 1/11 | **Phiên 9 · Sửa lỗi từ góp ý chạy thử** | Giữa kì I (2–13/11) |
| 2 | 10/12 | **Phiên 10 · Đề cuối kì I lớp 6 còn thiếu**: Tiếng Anh, GDCD, Tin học, Công nghệ | Cuối kì I lớp 6 (21/12–8/1) |
| 3 | 10/12 | **Phiên 11 · Đề cuối kì I lớp 4 còn thiếu**: Tin học và Công nghệ | Cuối kì I lớp 4 (28/12–8/1) |
| 4 | 15/12 | ~~**Phiên 12 · Báo cáo tuần cho phụ huynh** (Phiên 7 cũ)~~ — đã xong | Cả năm |
| 5 | 15/2 | **Phiên 13 · IOE cấp tỉnh lớp 4** | IOE tỉnh (4–6/3) |
| 6 | 1/3 | **Phiên 14 · Đề giữa kì II lớp 4** (Toán, Tiếng Việt) | Giữa kì II (15–26/3) |
| 7 | 1/3 | **Phiên 15 · Đề giữa kì II lớp 6** (Toán, Ngữ văn, KHTN, Tiếng Anh) | Giữa kì II (15–26/3) |
| 8 | 10/4 | **Phiên 16–17 · Đề cuối năm** lớp 4 và lớp 6 | Cuối năm (26/4–14/5) |

**Để sau, chỉ làm khi có nhu cầu thật:** nhập đề từ Excel (Phiên 6 cũ); bắt buộc học sinh đổi PIN cũ sau khi chuyển lên đám mây (chỉ cần khi chuyển nhiều học sinh cùng lúc); giáo viên giao bài cho cả lớp (cần bản đám mây).

**Mẹo tiết kiệm lượt dùng gói Pro:**
- Một phiên một việc, giao việc rõ ràng. Phiên càng dài càng tốn, vì mỗi lượt Claude đọc lại toàn bộ cuộc trò chuyện.
- Chỉ yêu cầu **một vòng** tự rà soát; nhiều vòng rà soát và phiên “điều phối” nhiều trợ lý là phần tốn nhất trước đây.
- Mỗi việc lớn mở một cuộc trò chuyện mới thay vì nói tiếp trong cuộc cũ.
- Xem mức “This week” ở Settings → Usage trước khi mở phiên; giới hạn tuần làm mới mỗi thứ Sáu khoảng 13:00.
- Merge từng Pull Request trước khi mở phiên sửa cùng file.

## 4. Lời giao việc (dán nguyên vào phiên mới)

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

**Phiên 15 · Đề giữa kì II lớp 6**
> Đọc CLAUDE.md. Tạo mỗi môn 1 đề 25 câu “Kiểm tra giữa học kì II” lớp 6 trong data/banks.js: Toán, Ngữ văn, KHTN (Kết nối tri thức), Tiếng Anh (Global Success, Unit 7–9). Có chủ đề và lời giải; tự tính lại đáp án Toán bằng code. Gắn vào kì thi gk2-l6. Chạy tests/e2e.js, tự rà soát một vòng, rồi mở Pull Request.

**Phiên 16–17 · Đề cuối năm**
> Đọc CLAUDE.md. Tạo đề “Kiểm tra cuối năm học” lớp [4 | 6] trong data/banks.js cho các môn của kì thi [ck2-l4 | ck2-l6] trong data/calendar-2026-2027.js, mỗi môn 1 đề 25 câu, phạm vi cả năm, có chủ đề và lời giải. Gắn vào kì thi đó. Chạy tests/e2e.js, tự rà soát một vòng, rồi mở Pull Request.
