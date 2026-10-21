# Hướng dẫn cài bản đám mây (Supabase)

Mặc định app lưu dữ liệu trong trình duyệt của từng máy. Bản đám mây để dữ liệu trên máy chủ Supabase (miễn phí), dùng chung trên nhiều máy:

- **Bạn (chủ app)** tạo tài khoản cho từng gia đình ở trang admin, gửi **tên đăng nhập + mật khẩu tạm** cho phụ huynh (Zalo hoặc nói trực tiếp).
- **Phụ huynh** đăng nhập bằng tên đăng nhập + mật khẩu, lần đầu phải đặt mật khẩu mới. **Con** là hồ sơ trong tài khoản của bố mẹ, không cần tài khoản riêng.
- **Không cần email**: không cài hộp thư gửi, không có link đăng nhập. Quên mật khẩu thì phụ huynh báo bạn, bạn đặt mật khẩu tạm mới ở trang admin.

Thiết kế đầy đủ: [THIET-KE-TAI-KHOAN.md](THIET-KE-TAI-KHOAN.md).

Mất khoảng 15 phút. Cần một máy tính và tài khoản GitHub.

> Tên các mục trong trang Supabase đôi khi được đổi. Không thấy đúng chữ thì tìm mục có ý nghĩa gần nhất.

---

## Bước 1. Tạo project Supabase

1. Vào https://supabase.com → **Start your project** → đăng nhập bằng GitHub.
2. **New project**: Name `OnUp`; Database Password: **Generate a password**, cất kĩ; Region: **Southeast Asia (Singapore)**; gói **Free**. Có ô **Automatically expose new tables and functions** thì để trống (không tick): `schema.sql` tự cấp quyền cho từng bảng, đúng phần app cần.
3. **Create new project**, đợi 1–2 phút.

Giữ gói Free đến khi bắt đầu thu tiền (quyết định 18/10/2026). Gói này không có sao lưu tự động và tự tạm dừng project khi cả tuần không ai dùng, nên có hai việc hằng tuần ghi ở mục “Gói và đề trả phí” bên dưới.

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

## Bước 6. Tạo tài khoản gia đình ở trang admin

Làm sau bước 7 (trang admin đọc `js/config.js`). Ảnh: [`docs/hinh-dam-may/`](hinh-dam-may/) (các ảnh `admin-*.jpg`).

1. Mở **https://dunglnh.github.io/OnUp/admin.html** (trang học thêm `admin.html` vào cuối địa chỉ). Nên lưu dấu trang trên máy của bạn; trang học không có nút dẫn tới đây.
2. Đăng nhập bằng tài khoản chủ app (bước 4): gõ tên đăng nhập, ví dụ `chu.app`. Đóng thẻ là thoát. Tài khoản gia đình đăng nhập vào đây chỉ thấy “Không có quyền”.
3. **Tạo tài khoản**: tên đăng nhập (ví dụ `nha.bin`), tên hiển thị (ví dụ `Nhà Bin`), ghi chú nếu cần (cách liên lạc với phụ huynh; chỉ bạn đọc được). Mật khẩu tạm đã gợi ý sẵn (bấm **Gợi ý khác** để đổi). Bấm **Tạo tài khoản**.
4. Bấm **Chép lời nhắn** rồi dán vào Zalo gửi phụ huynh. Lời nhắn đã xuống dòng sẵn: tên đăng nhập, mật khẩu tạm, rồi ba bước vào trang học. Dán vào là gửi được, không phải sửa. Mật khẩu tạm chỉ hiện lần này; phụ huynh đăng nhập lần đầu sẽ phải đặt mật khẩu mới.

Ở trang admin còn có:
- **Tài khoản**: số liệu nhanh (số tài khoản, số tài khoản dùng trong 7 ngày, số hồ sơ con theo khối), tìm theo tên đăng nhập, tên hoặc ghi chú, lọc tài khoản đang khóa hoặc chưa đổi mật khẩu tạm.
- Bấm vào một tài khoản: **xem nhanh** (số hồ sơ con, khối, lần dùng gần nhất; không xem bài làm), sửa **ghi chú**, **đặt lại mật khẩu** khi phụ huynh quên (mọi máy đang đăng nhập bị đăng xuất), **khóa / mở khóa**, **xóa** (phải gõ đúng tên đăng nhập; xóa luôn hồ sơ con và kết quả).
- **Câu bị báo**: các câu học sinh, phụ huynh bấm “Báo câu này sai” khi làm bài (cần đã chạy `supabase/cap-nhat-r1.sql`, xem “Cập nhật máy chủ” bên dưới). Mỗi câu một dòng, mới nhất trước: tên đề, file chứa câu (`data/banks/…`), nội dung câu, các lí do và ghi chú, số lần bị báo; lọc theo đề và trạng thái. Sửa đề xong bấm **Đã sửa**; câu đúng rồi bấm **Bỏ qua**; bấm nhầm thì **Mở lại**. Không hiện tên hồ sơ con.
- **Nhật ký**: ai đã tạo, đặt lại mật khẩu, khóa, mở khóa, xóa tài khoản nào, lúc nào.

Trang admin báo lỗi khi gọi hàm `admin`: xem bảng gỡ lỗi cuối trang. Cần tạo tài khoản khi hàm `admin` chưa chạy được thì làm bằng tay: **Authentication → Users → Add user** với email `nha.bin@users.onup.invalid`, mật khẩu tạm, tick **Auto Confirm User**; rồi **SQL Editor**:
```sql
insert into families (auth_user_id, username, display_name)
select id, 'nha.bin', 'Nhà Bin' from auth.users where email = 'nha.bin@users.onup.invalid';
```

## Bước 7. Điền `js/config.js`

1. Supabase → **Project Settings → API Keys**. Chép **Project URL** (`https://abcdxyz.supabase.co`) và khóa **publishable** (`sb_publishable_...`) hoặc **anon public**.
2. GitHub → [`js/config.js`](../js/config.js) → **Edit** → điền `supabaseUrl`, `supabaseAnonKey`. Nên sửa luôn dòng “Quên mật khẩu?” dưới ô đăng nhập: `contactText` (ví dụ `"Nhắn Zalo cho cô Lan"`) và `contactUrl` (ví dụ `"https://zalo.me/0912345678"`, hoặc `"tel:0912345678"`; để trống thì chỉ hiện chữ). Thẻ “Chưa có tài khoản?” dưới form dùng `signupText`, `signupUrl` (ví dụ `"Nhắn Zalo cho cô Lan để được mời"`); để trống thì dùng luôn hai giá trị trên. `main` đang được bảo vệ: chọn **Create a new branch… and start a pull request**, rồi tự **Merge**.

> ⚠️ **Không bao giờ** dán khóa `service_role` / `secret` (`sb_secret_...`) vào file này: khóa đó bỏ qua mọi lớp bảo vệ. Lỡ dán thì xóa ngay và đổi khóa (**Roll**) trong Supabase. Khóa publishable/anon là công khai, để trên GitHub được: dữ liệu được bảo vệ bằng chính sách RLS trong `schema.sql`.

Muốn quay lại bản lưu trên máy: xóa hai giá trị đầu (để `""`). Những gì làm trong lúc dùng đám mây chỉ nằm trên Supabase.

**Phụ huynh dùng app thế nào** (ảnh: [`docs/hinh-dam-may/`](hinh-dam-may/)):
- Đăng nhập bằng tên đăng nhập + mật khẩu tạm, đặt mật khẩu mới. Trên máy con dùng hằng ngày thì tick **Ghi nhớ trên máy này**.
- **Khu phụ huynh**: thẻ “Bắt đầu trong 3 bước” dẫn việc đầu tiên (thêm hồ sơ con → đặt mã PIN nếu muốn → đưa máy cho con); thêm hồ sơ cho từng con (tên, khối, lớp, mã PIN 4 số nếu muốn; tối đa 5 hồ sơ), xem tiến độ, báo cáo tuần, sửa lịch thi, nhập đề tự soạn, chuyển dữ liệu từ bản lưu trên máy (Cài đặt → Chuyển dữ liệu và sao lưu), đổi mật khẩu, đăng xuất.
- **Cho con học** hoặc **Chọn hồ sơ khác** → màn hình **Ai đang học?**: con chọn hồ sơ của mình (nhập PIN nếu có) là học. Vào lại khu phụ huynh phải nhập mật khẩu của bố mẹ, hoặc mã mở nhanh 4–6 số đã đặt ở Cài đặt → Tài khoản trên máy đã ghi nhớ (quên mã thì nhập mật khẩu).

## Bước 8 (nên làm). Chống máy tự động đoán mật khẩu (CAPTCHA)

Supabase đã tự giới hạn số lần đăng nhập sai. Muốn chặn thêm máy tự động: dùng **Cloudflare Turnstile** (miễn phí). **Làm đúng thứ tự**, bật trên Supabase trước khi app có khóa thì không ai đăng nhập được.

1. https://dash.cloudflare.com → **Turnstile → Add widget**: Hostnames `dunglnh.github.io`, Widget mode **Managed** → **Create**. Chép **Site Key** và **Secret Key**.
2. Dán **Site Key** vào `turnstileSiteKey` trong `js/config.js` → Merge, đợi 1–2 phút. (**Secret Key** không bao giờ dán vào file này.)
3. Supabase → **Authentication → Attack Protection** → **Enable CAPTCHA protection** → **Turnstile** → dán **Secret Key** → **Save**.

Muốn tắt: tắt trên Supabase **trước**, rồi mới xóa Site Key.

## Gói và đề trả phí (chưa dùng)

Hôm nay mọi tài khoản là gói `free`: dùng mọi nội dung, tối đa 5 hồ sơ con. Giữ như vậy đến khi bán (khi đủ đề lớp 4–12, khoảng cuối năm học 2028–2029; quyết định 18/10/2026): **không sửa bảng `plans`** trước lúc đó. Hạn mức hai gói lúc bán sẽ chốt sau ([THIET-KE-TAI-KHOAN.md](THIET-KE-TAI-KHOAN.md) mục 9).

**Việc hằng tuần khi còn gói Free của Supabase** (đến khi bắt đầu thu tiền thì lên gói Pro, có sao lưu hằng ngày):
- **Xuất CSV:** **Table Editor** → mở từng bảng `families`, `profiles`, `results`, `exam_events`, `question_banks`, `question_reports` → nút **Export** (hoặc menu ⋯ của bảng) → **Export to CSV**, cất vào Google Drive theo ngày. Gói Free không có sao lưu; đây là bản sao duy nhất nếu project hỏng.
- **Mở app ít nhất mỗi tuần một lần** (kể cả dịp Tết, hè): project tự tạm dừng khi cả tuần không ai dùng. Thấy **Paused** thì vào Supabase bấm **Restore**; dữ liệu vẫn còn.

Bảng `plans`, `plan_log`, `paid_banks` đã có sẵn cho lúc bán gói (Phiên G1, B2). Khi đó:

- Đổi hạn mức trong **SQL Editor** (số giữ chỗ, điền con số đã chốt): `update plans set max_children = <số hồ sơ>, all_banks = false where id = 'free';` và `update plans set max_children = <số hồ sơ>, price = <giá> where id = 'family';`
- Chép đề vào máy chủ: trên máy có Node, chạy `node supabase/banks-to-sql.js > paid-banks.sql`, mở file, dán vào SQL Editor → **Run** (chạy lại được, không trùng). Đề số 1 mỗi môn mỗi kì là **đề thử**: tài khoản nào cũng đọc được; đề khác chỉ tài khoản có gói còn hạn mới đọc được.

## Cập nhật máy chủ khi app có phiên bản mới

Project đã cài từ trước thì **không** chạy lại `supabase/schema.sql` (file đó tạo bảng mới từ đầu). Phiên bản nào cần đổi bảng sẽ có một file `supabase/cap-nhat-<phiên>.sql`: mở **SQL Editor**, dán toàn bộ file → **Run**. Chạy lại lần hai cũng không sao. Nên chạy trước hoặc ngay sau khi gộp Pull Request của phiên đó.

**Supabase đổi cách cấp quyền từ 30/10/2026** (có thể nhận email “Breaking change: tables not exposed to Data and GraphQL API automatically”): bảng tạo mới sau ngày đó không còn tự được cấp quyền. OnUp không bị ảnh hưởng: `schema.sql` và mọi file `cap-nhat-*.sql` đã tự cấp quyền cho từng bảng; chủ app không phải bật hay chạy gì thêm.

| File | Phiên | Đổi gì | Chưa chạy thì |
|---|---|---|---|
| `supabase/cap-nhat-k2.sql` | K2 (dạng câu mới) | `results.r` nhận số lẻ đến 0,01 (câu đúng/sai 4 ý, nối cột chấm từng ý); thêm cột `passages` (đoạn đọc dùng chung) cho `question_banks`, `paid_banks`; `import_local` chuyển cả hai | Kết quả có số câu đúng lẻ được làm tròn trước khi lưu; ngân hàng tự nhập có “Đoạn đọc:” chưa lưu được |
| `supabase/cap-nhat-r1.sql` | R1 (nút “Báo câu này sai”) | Thêm bảng `question_reports` (câu bị báo sai), trigger (tối đa 30 báo cáo mỗi ngày mỗi gia đình) và RLS (gia đình chỉ thêm, đọc của mình; chủ app đọc tất cả, đổi trạng thái) | App vẫn chạy; bấm Gửi báo cáo thì báo “Máy chủ chưa cập nhật để nhận báo cáo”; tab Câu bị báo ở trang admin báo chưa có bảng |

Kiểm tra sau khi chạy: **Table Editor → results**, cột `r` có kiểu `numeric`; **question_banks** có cột `passages`; có bảng **question_reports**.

## Tự kiểm tra sau khi cài

- [ ] **Table Editor**: có các bảng `families`, `profiles`, `plans` (2 dòng: `free`, `family`), `app_owners` (1 dòng).
- [ ] **Authentication → Users**: chỉ có tài khoản chủ app (và các tài khoản bạn đã tạo).
- [ ] **Edge Functions → admin**: đã deploy, Verify JWT tắt, **Logs** không có lỗi đỏ.
- [ ] Tạo một tài khoản thử ở trang admin (bước 6) → đăng nhập trang học bằng mật khẩu tạm → app bắt đặt mật khẩu mới → thêm hồ sơ con → **Cho con học** → chọn hồ sơ con, làm một đề → Phụ huynh nhập lại mật khẩu, mở hồ sơ của con thấy kết quả.

## Bảo mật và quyền riêng tư

- Máy chủ lưu: tên đăng nhập, tên hiển thị của tài khoản; tên, hình, khối, lớp của hồ sơ con; kết quả làm bài; câu bị báo sai (nội dung câu, lí do, ghi chú người báo gõ). Không có email, số điện thoại, ngày sinh, ảnh. Thông tin liên lạc của phụ huynh (nếu cần) ghi trong **ghi chú admin**, chỉ chủ app đọc được.
- Quyền được kiểm tra trên máy chủ (RLS): mỗi tài khoản chỉ đọc/ghi dữ liệu của gia đình mình; phụ huynh không tự đổi gói, trạng thái; tài khoản bị khóa không đọc/ghi được gì và không đăng nhập được. Chủ app xem danh sách tài khoản, số hồ sơ con, khối, lần dùng gần nhất và các câu bị báo sai (không kèm tên hồ sơ con), **không** xem bài làm của các con.
- Mật khẩu do Supabase Auth băm và giới hạn số lần thử sai. Đặt lại mật khẩu ở trang admin thì mọi máy đang đăng nhập tài khoản đó bị đăng xuất.
- PIN của hồ sơ con chỉ để anh em khỏi dùng nhầm hồ sơ, **không phải bảo mật**.
- Xóa tài khoản ở trang admin xóa luôn hồ sơ con, kết quả, lịch thi của tài khoản đó; nhật ký admin và nhật ký gói giữ lại tên đăng nhập để đối soát.

## Gỡ lỗi thường gặp

| Hiện tượng | Cách xử lí |
|---|---|
| Lệnh ở bước 4.2 báo `0 rows` | Email gõ ở bước 4.1 khác lệnh SQL (phải viết thường, đúng đuôi `@users.onup.invalid`). |
| Trang admin báo không có quyền | Tài khoản đang dùng chưa có trong `app_owners` (bước 4.2). |
| Trang admin báo “Máy chủ chưa có hàm admin” | Chưa triển khai Edge Function, hoặc đặt tên khác `admin` (bước 5). |
| Trang admin báo “Máy chủ từ chối lời gọi hàm admin” | Còn bật **Verify JWT** cho hàm `admin` (bước 5.4). |
| Trang admin báo “chỉ dùng với bản đám mây” | `js/config.js` chưa điền URL và khóa (bước 7). |
| Tab Câu bị báo báo “chưa có bảng”; app báo “Máy chủ chưa cập nhật để nhận báo cáo” | Chưa chạy `supabase/cap-nhat-r1.sql` (mục “Cập nhật máy chủ”). |
| Lỗi `42501` “permission denied for table …” (ở **Logs** của hàm `admin`, hoặc app báo chưa lưu được) | Bảng thiếu quyền (grant). Kiểm tra đã chạy đủ các file `cap-nhat-*.sql` (mục “Cập nhật máy chủ”); còn lỗi thì ghi tên bảng vào GitHub Issues để sửa file cập nhật. |
| Gọi hàm `admin` báo lỗi 401 | Chưa tắt **Verify JWT** (bước 5.4), hoặc phiên đăng nhập đã hết hạn: đăng nhập lại. |
| Gọi hàm `admin` báo lỗi máy chủ | Xem **Edge Functions → admin → Logs**. Kiểm tra đã chạy `schema.sql` (bước 2). |
| `relation "families" already exists` khi chạy `schema.sql` | Project đã có bảng (đã chạy rồi, hoặc còn bảng của bản cũ). Dùng project mới (bước 1). |
| Phụ huynh báo “tài khoản bị khóa” | Mở khóa ở trang admin. |
| Trang Supabase báo project **Paused** | Gói Free tạm dừng project sau khoảng 1 tuần không ai dùng. Bấm **Restore**; dữ liệu vẫn còn. |

---

Phần kĩ thuật: `supabase/schema.sql` (bảng, RLS, trigger, hàm), `supabase/functions/admin/index.ts`, `supabase/banks-to-sql.js`, kiểm thử trong `tests/supabase/` (xem `CLAUDE.md`).
