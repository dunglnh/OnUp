# OnUp
Daily Drill for your kids — web app ôn thi cả năm học cho học sinh lớp 4, lớp 6 và phụ huynh.

Có lịch thi năm học 2026–2027, đề luyện giữa kì và IOE, ngân hàng câu hỏi nhập được, theo dõi tiến độ.

- Mô tả tính năng: [docs/TINH-NANG.md](docs/TINH-NANG.md)
- Kế hoạch và lộ trình phát triển (đang tạm dừng để chạy thử): [docs/KE-HOACH-PHAT-TRIEN-ONUP.md](docs/KE-HOACH-PHAT-TRIEN-ONUP.md)
- Thiết kế khung tài khoản và trang admin (sắp làm): [docs/THIET-KE-TAI-KHOAN.md](docs/THIET-KE-TAI-KHOAN.md)
- Hướng dẫn cho Claude khi sửa code: [CLAUDE.md](CLAUDE.md)
- Bật đồng bộ đám mây (Supabase), từng bước: [docs/HUONG-DAN-SUPABASE.md](docs/HUONG-DAN-SUPABASE.md)

## Dùng ngay

**Trên máy tính:** trong thư mục này chạy `python3 -m http.server 8000`, rồi mở http://localhost:8000.

**Đưa lên mạng bằng GitHub Pages (miễn phí):**
1. Vào repo → Settings → Pages → Source: *Deploy from a branch* → Branch: `main`, thư mục `/ (root)` → Save.
2. Sau 1–2 phút sẽ có link `https://dunglnh.github.io/OnUp/`.

Lần đầu mở app: tạo tài khoản quản trị → thêm phụ huynh, học sinh → học sinh chọn tên, nhập PIN là vào ôn.

## Đồng bộ đám mây (tùy chọn)
Mặc định (`js/config.js` để trống) app lưu dữ liệu trong trình duyệt của từng máy, chạy được cả khi không có mạng. Nhớ vào Quản trị → Dữ liệu để tải file sao lưu định kì.

Muốn dùng chung dữ liệu trên nhiều máy: tạo project Supabase miễn phí và điền `js/config.js` theo [docs/HUONG-DAN-SUPABASE.md](docs/HUONG-DAN-SUPABASE.md). Bố mẹ, thầy cô đăng nhập bằng email; học sinh bằng mã gia đình + PIN. Có nút chuyển dữ liệu máy cũ lên đám mây.

## Kiểm thử
```bash
python3 -m http.server 8000 &
npm i -D playwright && node tests/e2e.js     # bản lưu trên máy, phải in E2E OK
node tests/supabase/store-test.mjs           # SupabaseStore + Edge Function trên máy chủ giả, không cần mạng
node tests/supabase/cloud-e2e.js             # giao diện bản đám mây trong Chromium, máy chủ giả
sh tests/supabase/run.sh                     # schema.sql + RLS trên PostgreSQL thật (cần cài PostgreSQL)
```
