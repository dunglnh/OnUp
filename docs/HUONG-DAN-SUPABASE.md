# Hướng dẫn cài bản đám mây (Supabase)

Mặc định app lưu dữ liệu trong trình duyệt của từng máy. Bản đám mây để dữ liệu trên máy chủ Supabase (miễn phí), dùng chung trên nhiều máy:

- **Bạn (chủ app)** tạo tài khoản cho từng gia đình ở trang admin, gửi **tên đăng nhập + mật khẩu tạm** cho phụ huynh (Zalo hoặc nói trực tiếp).
- **Phụ huynh** đăng nhập bằng tên đăng nhập + mật khẩu, lần đầu phải đặt mật khẩu mới. **Con** là hồ sơ trong tài khoản của bố mẹ, không cần tài khoản riêng.
- **Không cần email**: không cài hộp thư gửi, không có link đăng nhập. Quên mật khẩu thì phụ huynh báo bạn, bạn đặt mật khẩu tạm mới ở trang admin.

Thiết kế đầy đủ: [THIET-KE-TAI-KHOAN.md](THIET-KE-TAI-KHOAN.md).

> **Đang làm dở.** Phần máy chủ (bước 1–5) đã xong, làm được ngay. Màn hình đăng nhập mới trong app (Phiên B) và trang admin (Phiên C) chưa làm: **chưa điền `js/config.js`** (bước 6) cho tới khi Phiên B đã gộp, vì giao diện hiện tại vẫn là kiểu đăng nhập email cũ.

Mất khoảng 15 phút. Cần một máy tính và tài khoản GitHub.

> Tên các mục trong trang Supabase đôi khi được đổi. Không thấy đúng chữ thì tìm mục có ý nghĩa gần nhất.

---

## Bước 1. Tạo project Supabase

1. Vào https://supabase.com → **Start your project** → đăng nhập bằng GitHub.
2. **New project**: Name `OnUp`; Database Password: **Generate a password**, cất kĩ; Region: **Southeast Asia (Singapore)**; gói **Free**.
3. **Create new project**, đợi 1–2 phút.

Đã cài bản cũ (đăng nhập email, mã gia đình) theo hướng dẫn trước? Bản mới không dùng chung bảng với bản cũ: xóa project cũ (**Project Settings → General → Delete project**) rồi tạo project mới.

## Bước 2. Tạo bảng dữ liệu

1. Mở [`supabase/schema.sql`](../supabase/schema.sql) trên GitHub → **Copy raw file**.
2. Supabase → **SQL Editor** → **New query** → dán → **Run**. Thấy `Success. No rows returned` là xong. Chỉ chạy một lần.

## Bước 3. Cài đăng nhập

Supabase → **Authentication**:

1. **Sign In / Providers**:
   - **Allow new users to sign up**: **tắt**. Chỉ bạn tạo tài khoản (qua trang admin); người lạ không tự tạo được.
   - **Allow anonymous sign-ins**: **tắt**.
   - **Email** (cách đăng nhập bằng mật khẩu dùng mục này): **bật**. Trong đó: **Secure password change** **tắt** (bật thì phải nhận email); **Minimum password length** = `8`.
2. **Emails → Notifications** (nếu có): tắt thông báo **Password changed** (không có hộp thư thật để gửi).

Không cần cài SMTP, mẫu email, Site URL hay Redirect URLs.

## Bước 4. Tạo tài khoản chủ app

1. **Authentication → Users → Add user → Create new user**:
   - Email: `<tên-đăng-nhập>@users.onup.invalid`, ví dụ `chu.app@users.onup.invalid`. Tên đăng nhập 4–20 kí tự, chỉ gồm chữ thường không dấu, số, dấu chấm, gạch dưới. Đuôi `.invalid` không phải email thật, không thư nào được gửi.
   - Password: **dài, ít nhất 16 kí tự**, cất kĩ. Đây là chìa khóa cả app.
   - Tick **Auto Confirm User** → **Create user**.
2. **SQL Editor → New query**, dán (sửa tên đăng nhập) → **Run**:
   ```sql
   insert into app_owners (user_id) select id from auth.users where email = 'chu.app@users.onup.invalid';
   ```
   Phải thấy `1 row` (hoặc `Success`). Kiểm tra: `select * from app_owners;` có một dòng.

Tài khoản chủ app chỉ để quản lý. Nhà mình dùng app thì tạo một **tài khoản gia đình riêng** ở trang admin như mọi gia đình khác.

Quên mật khẩu chủ app: tạo người dùng mới như bước 4.1 (tên khác), chạy lại lệnh 4.2 với tên mới, rồi xóa người dùng cũ ở **Authentication → Users**.

## Bước 5. Triển khai Edge Function `admin`

Hàm này tạo, khóa, xóa tài khoản và đổi gói. Chỉ người trong `app_owners` gọi được. Khóa bí mật để hàm làm việc Supabase tự cấp, không cần thêm secret nào.

**Cách A — ngay trên trang Supabase:**

1. **Edge Functions** → **Deploy a new function** → **Via Editor**.
2. Tên đúng là `admin`.
3. Xóa code mẫu. Mở [`supabase/functions/admin/index.ts`](../supabase/functions/admin/index.ts) → **Copy raw file** → dán → **Deploy function**.
4. Mở hàm vừa tạo → **Details** (hoặc **Settings**) → **tắt Verify JWT** → **Save**. (Hàm tự kiểm tra người gọi.)

**Cách B — dòng lệnh:**

```bash
npx supabase login
npx supabase link --project-ref <mã project>
npx supabase functions deploy admin --no-verify-jwt
```

Có hàm `student-login` cũ thì xóa đi (**Edge Functions → student-login → Delete**).

## Bước 6. Điền `js/config.js` (sau khi Phiên B đã gộp)

1. Supabase → **Project Settings → API Keys**. Chép **Project URL** (`https://abcdxyz.supabase.co`) và khóa **publishable** (`sb_publishable_...`) hoặc **anon public**.
2. GitHub → [`js/config.js`](../js/config.js) → **Edit** → điền `supabaseUrl`, `supabaseAnonKey`. `main` đang được bảo vệ: chọn **Create a new branch… and start a pull request**, rồi tự **Merge**.

> ⚠️ **Không bao giờ** dán khóa `service_role` / `secret` (`sb_secret_...`) vào file này: khóa đó bỏ qua mọi lớp bảo vệ. Lỡ dán thì xóa ngay và đổi khóa (**Roll**) trong Supabase. Khóa publishable/anon là công khai, để trên GitHub được: dữ liệu được bảo vệ bằng chính sách RLS trong `schema.sql`.

Muốn quay lại bản lưu trên máy: xóa hai giá trị (để `""`). Những gì làm trong lúc dùng đám mây chỉ nằm trên Supabase.

## Bước 7 (nên làm). Chống máy tự động đoán mật khẩu (CAPTCHA)

Supabase đã tự giới hạn số lần đăng nhập sai. Muốn chặn thêm máy tự động: dùng **Cloudflare Turnstile** (miễn phí). **Làm đúng thứ tự**, bật trên Supabase trước khi app có khóa thì không ai đăng nhập được.

1. https://dash.cloudflare.com → **Turnstile → Add widget**: Hostnames `dunglnh.github.io`, Widget mode **Managed** → **Create**. Chép **Site Key** và **Secret Key**.
2. Dán **Site Key** vào `turnstileSiteKey` trong `js/config.js` → Merge, đợi 1–2 phút. (**Secret Key** không bao giờ dán vào file này.)
3. Supabase → **Authentication → Attack Protection** → **Enable CAPTCHA protection** → **Turnstile** → dán **Secret Key** → **Save**.

Muốn tắt: tắt trên Supabase **trước**, rồi mới xóa Site Key.

## Gói và đề trả phí (chưa dùng)

Hôm nay mọi tài khoản là gói `free`: dùng mọi nội dung, tối đa 5 hồ sơ con. Bảng `plans`, `plan_log`, `paid_banks` đã có sẵn cho lúc bán gói (thiết kế mục 9). Khi đó:

- Đổi hạn mức trong **SQL Editor**, ví dụ: `update plans set max_children = 1, all_banks = false where id = 'free';` và `update plans set max_children = 3, price = 300000 where id = 'family';`
- Chép đề vào máy chủ: trên máy có Node, chạy `node supabase/banks-to-sql.js > paid-banks.sql`, mở file, dán vào SQL Editor → **Run** (chạy lại được, không trùng). Đề số 1 mỗi môn mỗi kì là **đề thử**: tài khoản nào cũng đọc được; đề khác chỉ tài khoản có gói còn hạn mới đọc được.

## Tự kiểm tra sau khi cài

- [ ] **Table Editor**: có các bảng `families`, `profiles`, `plans` (2 dòng: `free`, `family`), `app_owners` (1 dòng).
- [ ] **Authentication → Users**: chỉ có tài khoản chủ app (và các tài khoản bạn đã tạo).
- [ ] **Edge Functions → admin**: đã deploy, Verify JWT tắt, **Logs** không có lỗi đỏ.
- [ ] Sau Phiên B, C: tạo một tài khoản thử ở trang admin → đăng nhập bằng mật khẩu tạm → app bắt đặt mật khẩu mới → thêm hồ sơ con → làm một đề → trang admin thấy tài khoản có 1 hồ sơ con.

## Bảo mật và quyền riêng tư

- Máy chủ lưu: tên đăng nhập, tên hiển thị của tài khoản; tên, hình, khối, lớp của hồ sơ con; kết quả làm bài. Không có email, số điện thoại, ngày sinh, ảnh. Thông tin liên lạc của phụ huynh (nếu cần) ghi trong **ghi chú admin**, chỉ chủ app đọc được.
- Quyền được kiểm tra trên máy chủ (RLS): mỗi tài khoản chỉ đọc/ghi dữ liệu của gia đình mình; phụ huynh không tự đổi gói, trạng thái; tài khoản bị khóa không đọc/ghi được gì và không đăng nhập được. Chủ app xem danh sách tài khoản, số hồ sơ con, khối, lần dùng gần nhất, **không** xem bài làm của các con.
- Mật khẩu do Supabase Auth băm và giới hạn số lần thử sai. Đặt lại mật khẩu ở trang admin thì mọi máy đang đăng nhập tài khoản đó bị đăng xuất.
- PIN của hồ sơ con chỉ để anh em khỏi dùng nhầm hồ sơ, **không phải bảo mật**.
- Xóa tài khoản ở trang admin xóa luôn hồ sơ con, kết quả, lịch thi của tài khoản đó; nhật ký admin và nhật ký gói giữ lại tên đăng nhập để đối soát.

## Gỡ lỗi thường gặp

| Hiện tượng | Cách xử lí |
|---|---|
| Lệnh ở bước 4.2 báo `0 rows` | Email gõ ở bước 4.1 khác lệnh SQL (phải viết thường, đúng đuôi `@users.onup.invalid`). |
| Trang admin báo không có quyền | Tài khoản đang dùng chưa có trong `app_owners` (bước 4.2). |
| Gọi hàm `admin` báo lỗi 401 | Chưa tắt **Verify JWT** (bước 5.4), hoặc phiên đăng nhập đã hết hạn: đăng nhập lại. |
| Gọi hàm `admin` báo lỗi máy chủ | Xem **Edge Functions → admin → Logs**. Kiểm tra đã chạy `schema.sql` (bước 2). |
| `relation "families" already exists` khi chạy `schema.sql` | Project đã có bảng (đã chạy rồi, hoặc còn bảng của bản cũ). Dùng project mới (bước 1). |
| Phụ huynh báo “tài khoản bị khóa” | Mở khóa ở trang admin. |
| Trang Supabase báo project **Paused** | Gói Free tạm dừng project sau khoảng 1 tuần không ai dùng. Bấm **Restore**; dữ liệu vẫn còn. |

---

Phần kĩ thuật: `supabase/schema.sql` (bảng, RLS, trigger, hàm), `supabase/functions/admin/index.ts`, `supabase/banks-to-sql.js`, kiểm thử trong `tests/supabase/` (xem `CLAUDE.md`).
