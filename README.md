# OnUp
Daily Drill for your kids — web app ôn thi cả năm học cho học sinh lớp 4, lớp 6 và phụ huynh.

Có lịch thi năm học 2026–2027, đề luyện giữa kì, cuối kì và IOE, ngân hàng câu hỏi nhập được, báo cáo tuần cho phụ huynh.

- Mô tả tính năng: [docs/TINH-NANG.md](docs/TINH-NANG.md)
- Trạng thái, lộ trình và lời giao việc từng phiên (chỗ duy nhất ghi trạng thái): [docs/KE-HOACH-PHAT-TRIEN-ONUP.md](docs/KE-HOACH-PHAT-TRIEN-ONUP.md)
- Kế hoạch nội dung (đủ đề lớp 4 và 6, rồi lớp 5, 7–12; lời giao việc các phiên làm đề chưa làm; chuẩn bị bán B4): [docs/KE-HOACH-NOI-DUNG.md](docs/KE-HOACH-NOI-DUNG.md)
- Cải tiến giao diện 2.x (vấn đề X1–X16, lời giao việc UI1, UX4–UX8): [docs/CAI-TIEN-UX-2X.md](docs/CAI-TIEN-UX-2X.md)
- Lỗi tìm được khi dùng thử (L1–L31) và lời giao việc các phiên sửa lỗi chưa làm: [docs/SUA-LOI-CHAY-THU.md](docs/SUA-LOI-CHAY-THU.md)
- Thiết kế khung tài khoản, trang admin và hướng đi bản trả phí: [docs/THIET-KE-TAI-KHOAN.md](docs/THIET-KE-TAI-KHOAN.md)
- Hướng dẫn cho Claude khi sửa code: [CLAUDE.md](CLAUDE.md)
- Cài bản đám mây (Supabase), từng bước: [docs/HUONG-DAN-SUPABASE.md](docs/HUONG-DAN-SUPABASE.md)

## Dùng ngay

**Trang https://dunglnh.github.io/OnUp/** chạy bản đám mây và **chỉ dành cho gia đình được mời**: chủ app tạo tài khoản ở trang admin (`admin.html`) rồi gửi tên đăng nhập + mật khẩu tạm; phụ huynh đăng nhập, đặt mật khẩu mới, thêm hồ sơ cho từng con; con chọn hồ sơ của mình ở màn hình “Ai đang học?” (nhập mã PIN nếu có) là vào ôn. Không có tự đăng ký; chưa có tài khoản thì liên hệ theo dòng ghi ở màn đăng nhập. App đang miễn phí: mỗi tài khoản tối đa 5 hồ sơ con, dùng được mọi đề. Bản trả phí chỉ tính đến khi đã đủ đề lớp 4–12.

**Tự chạy trên máy tính (bản lưu trên máy, không cần Supabase):** trong `js/config.js` để trống hai giá trị `supabaseUrl`, `supabaseAnonKey` (`""`), rồi trong thư mục này chạy `python3 -m http.server 8000` và mở http://localhost:8000. Lần đầu mở app: tạo tài khoản quản trị → thêm phụ huynh, học sinh → học sinh chọn tên, nhập PIN là vào ôn. Dữ liệu nằm trong trình duyệt của máy đó, mở lại được cả khi không có mạng (sau lần mở đầu). Nhớ vào Quản trị → Dữ liệu để tải file sao lưu định kì (quá 7 ngày app sẽ nhắc), và thêm app vào Màn hình chính trên iPhone, iPad để Safari không xóa dữ liệu.

**Tự đưa bản của mình lên GitHub Pages (miễn phí):** fork repo → Settings → Pages → Source: *Deploy from a branch* → Branch: `main`, thư mục `/ (root)` → Save. Sau 1–2 phút có link `https://<tài khoản>.github.io/OnUp/`. Để trống `js/config.js` thì đó là bản lưu trên máy; muốn có bản đám mây riêng thì cài Supabase theo [docs/HUONG-DAN-SUPABASE.md](docs/HUONG-DAN-SUPABASE.md).

## Bản đám mây
`js/config.js` trên `main` đã điền URL và khóa công khai của project Supabase (từ 17/10/2026), nên trang trên GitHub Pages chạy bản đám mây theo [docs/THIET-KE-TAI-KHOAN.md](docs/THIET-KE-TAI-KHOAN.md): một tài khoản là một gia đình, phụ huynh đăng nhập bằng tên đăng nhập + mật khẩu, con là hồ sơ trong tài khoản của bố mẹ; dữ liệu nằm trên Supabase và dùng chung trên nhiều máy. Chủ app quản lý tài khoản ở `admin.html`. Supabase ở gói Free cho đến khi bắt đầu thu tiền: chủ app xuất CSV các bảng hằng tuần và mở app ít nhất mỗi tuần một lần (mục “Gói và đề trả phí” của [docs/HUONG-DAN-SUPABASE.md](docs/HUONG-DAN-SUPABASE.md)).

## Kiểm thử
```bash
python3 -m http.server 8000 &
npm i -D playwright && node tests/e2e.js     # bản lưu trên máy (script tự để trống js/config.js khi chạy), phải in E2E OK
node tests/kiem-tra-de.js                    # đề có sẵn trong data/banks/, không cần trình duyệt, phải in DE OK
node tests/supabase/admin-test.mjs           # Edge Function admin trên máy chủ giả, không cần mạng
node tests/supabase/store-test.mjs           # SupabaseStore: đăng nhập, hồ sơ con, kết quả… trên máy chủ giả
node tests/supabase/cloud-e2e.js             # giao diện bản đám mây và trang admin trong Chromium, máy chủ giả
sh tests/supabase/run.sh                     # schema.sql + RLS trên PostgreSQL thật (cần cài PostgreSQL)
```
