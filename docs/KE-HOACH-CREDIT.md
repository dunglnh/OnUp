# Kế hoạch dùng $100 credit cloud session (hết hạn 14:59 ngày 5/11/2026)

Mỗi mục dưới đây là **một phiên cloud riêng**. Mở claude.ai/code (hoặc tab Code trên app điện thoại), chọn repo `dunglnh/OnUp`, dán nguyên lời giao việc vào, rồi xem Pull Request khi phiên chạy xong. Các phiên đánh dấu “song song được” có thể chạy cùng lúc vì chúng sửa những file khác nhau.

Mẹo để credit không bị phí:
- Một phiên làm một việc. Đừng gộp nhiều việc vào một phiên.
- Lời giao việc đã nhắc Claude đọc `CLAUDE.md` và chạy `tests/e2e.js`, nên con không phải giải thích lại.
- Gộp (merge) từng Pull Request trước khi mở phiên sửa cùng file đó.
- Xem số dư ở Settings → Usage. Theo ước lượng, mỗi phiên tốn khoảng $3–10, tùy độ dài.

---

## Tuần 1 (15–21/10): nội dung cho kì thi gần nhất

**Phiên 1 · Đề cuối kì I Toán 4** (song song được)
> Đọc CLAUDE.md. Tạo 3 ngân hàng câu hỏi mới trong data/banks.js cho “Kiểm tra cuối học kì I” Toán lớp 4, sách Kết nối tri thức (toàn bộ chương trình học kì I), mỗi bộ 25 câu, trộn trắc nghiệm, điền khuyết, đúng/sai, có chủ đề và lời giải. Tự tính lại mọi đáp án bằng code trước khi ghi. Gắn ba bộ vào kì thi ck1-l4 trong data/calendar-2026-2027.js. Chạy tests/e2e.js, rồi mở Pull Request.

**Phiên 2 · Đề cuối kì I Tiếng Việt 4** (song song được)
> Đọc CLAUDE.md. Tạo 2 ngân hàng câu hỏi Tiếng Việt lớp 4 cho cuối học kì I (luyện từ và câu, chính tả, đọc hiểu với đoạn văn tự soạn) trong data/banks.js, mỗi bộ 25 câu, có chủ đề và lời giải. Không chép văn bản trong sách. Gắn vào kì thi ck1-l4. Chạy tests/e2e.js, rồi mở Pull Request.

**Phiên 3 · Đề cuối kì I Toán 6 và Ngữ văn 6** (song song được)
> Đọc CLAUDE.md. Tạo 2 bộ Toán 6 và 2 bộ Ngữ văn 6 cho cuối học kì I, sách Kết nối tri thức, mỗi bộ 25 câu, đưa vào data/banks.js và gắn vào kì thi ck1-l6. Tự kiểm tra đáp án Toán bằng code. Chạy tests/e2e.js, rồi mở Pull Request.

**Phiên 4 · KHTN 6, Khoa học 4, Lịch sử và Địa lí** (song song được)
> Đọc CLAUDE.md. Tạo mỗi môn một bộ 25 câu cho cuối học kì I: KHTN 6, Lịch sử và Địa lí 6, Khoa học 4, Lịch sử và Địa lí 4 (sách Kết nối tri thức). Đưa vào data/banks.js, gắn vào ck1-l4 hoặc ck1-l6. Chạy tests/e2e.js, rồi mở Pull Request.

## Tuần 2 (22–28/10): đồng bộ đám mây

Cần làm trước: tạo một project Supabase miễn phí, lấy URL và anon key.

**Phiên 5 · SupabaseStore**
> Đọc CLAUDE.md và docs/TINH-NANG.md mục 7. Viết js/store-supabase.js có cùng giao diện với window.Store, dùng supabase-js từ CDN, theo supabase/schema.sql. Hoàn thiện chính sách RLS trong schema.sql. Phụ huynh và quản trị đăng nhập bằng email (magic link); học sinh đăng nhập bằng mã gia đình + PIN qua một Edge Function. Thêm file js/config.js: để trống thì app dùng LocalStore như cũ. Thêm nút “Chuyển dữ liệu máy này lên đám mây”. Giữ tests/e2e.js chạy được ở chế độ cục bộ. Mở Pull Request kèm hướng dẫn cài đặt từng bước bằng tiếng Việt.

## Tuần 3 (29/10–4/11): tiện ích và rà soát

**Phiên 6 · Nhập câu hỏi từ Excel** (song song được)
> Đọc CLAUDE.md. Trong mục Quản trị → Ngân hàng đề, cho phép tải lên file .xlsx (dùng SheetJS từ cdnjs) với các cột: chủ đề, câu hỏi, đáp án đúng, sai 1, sai 2, sai 3, lời giải. Cột đáp án sai để trống nghĩa là câu điền khuyết. Thêm file mẫu docs/mau-nhap-cau-hoi.xlsx. Chạy tests/e2e.js, rồi mở Pull Request.

**Phiên 7 · Báo cáo tuần cho phụ huynh** (song song được)
> Đọc CLAUDE.md. Thêm vào hồ sơ của con nút “Báo cáo tuần”: trang in được (CSS @media print) tóm tắt số bài, điểm theo môn, chủ đề yếu, kì thi sắp tới và gợi ý ôn tuần sau. Chạy tests/e2e.js, rồi mở Pull Request.

**Phiên 8 · Rà soát nội dung và giao diện**
> Đọc CLAUDE.md. Rà soát mọi câu hỏi trong data/banks.js: đáp án đúng, đúng chương trình, không trùng lặp, lời giải rõ. Sửa câu sai. Sau đó kiểm tra giao diện ở bề rộng 360px và chế độ tối trên mọi màn hình, sửa lỗi hiển thị. Mở Pull Request liệt kê từng chỗ đã sửa.

## Nếu còn credit trước 5/11
- Ôn giữa kì II lớp 4 và lớp 6, theo mẫu ngân hàng câu hỏi.
- Đề IOE cấp tỉnh lớp 4 (Unit 1–10, nâng cao).
