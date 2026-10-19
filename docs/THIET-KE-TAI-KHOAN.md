# Thiết kế: khung quản lý tài khoản và trang admin

Phiên bản 3 · 18/10/2026. Trạng thái và thứ tự các phiên chỉ ghi ở [KE-HOACH-PHAT-TRIEN-ONUP.md](KE-HOACH-PHAT-TRIEN-ONUP.md); các đoạn “Đã làm ở Phiên A/B/C” dưới đây mô tả những gì đã có trong code. Lời giao việc của ba phiên đó: mục 8.

**Phạm vi bây giờ:** khung tài khoản đã dựng xong và đang chạy trên trang thật. Chủ app (bạn) tạo và quản lý tài khoản ở một **trang admin riêng**; phụ huynh đăng nhập bằng **tên đăng nhập + mật khẩu**; con là hồ sơ trong tài khoản của bố mẹ. Theo quyết định của chủ app ngày 18/10/2026:
- **Trang công khai chỉ dành cho gia đình được mời.** Không tự đăng ký; màn đăng nhập có thẻ “Chưa có tài khoản?” kèm cách liên hệ (`signupText`, `signupUrl` trong `js/config.js`). Không làm đăng nhập email, mã mời, mã gia đình (mục 1, 2).
- **Chưa làm bản trả phí.** Bán khi đủ đề lớp 4–12 (khoảng cuối năm học 2028–2029). Đến lúc đó gói Miễn phí giữ như hiện nay: 5 hồ sơ con, mọi đề; bảng `plans` không đổi. Hạn mức gói Miễn phí và gói Gia đình lúc bán sẽ chốt sau. Hướng đi ở mục 9; khung đã chừa sẵn chỗ để lúc đó không phải làm lại.
- **Supabase giữ gói Free** đến khi bắt đầu thu tiền (chủ app xuất CSV hằng tuần, mở app mỗi tuần; [HUONG-DAN-SUPABASE.md](HUONG-DAN-SUPABASE.md)).
- Không ghi giá bán, chi phí hay so sánh đối thủ vào repo.

---

## 1. Các quyết định chính

1. **Một tài khoản = một gia đình, do phụ huynh giữ.** Con **không có tài khoản riêng**, chỉ là **hồ sơ** trong tài khoản của bố mẹ (giống hồ sơ trên Netflix). Bố mẹ đăng nhập một lần trên máy của con; con chọn hồ sơ của mình là học, không phải nhớ mật khẩu.
2. **Bạn tạo tài khoản ở trang admin**, gửi tên đăng nhập + mật khẩu tạm cho phụ huynh (qua Zalo hoặc nói trực tiếp). Chưa mở tự đăng ký. Nhờ vậy **không cần email, không cần xác nhận email, không cần cài hộp thư gửi**.
3. **Quyền kiểm tra ở máy chủ** (Supabase, chính sách RLS), không chỉ ẩn nút trên giao diện.
4. **Khối lớp không cố định 4 và 6.** Danh sách khối lấy từ một chỗ duy nhất (lớp 1–12), nội dung nào gắn khối nấy. Thêm lớp mới chỉ là thêm nội dung, không sửa code.
5. **Chừa sẵn chỗ cho gói** (cột `plan`, bảng hạn mức) nhưng **chưa dùng**: hôm nay mọi tài khoản là `free` và được dùng tất cả.

Bỏ khỏi bản đám mây cũ (Phiên 5) cho gọn và bớt chỗ dễ lỗi: đăng nhập email, link/mã số qua email, cài SMTP, mã mời, mã gia đình, kiểm tra PIN ở máy chủ (`pin_hash` của hồ sơ con chỉ là khóa trên giao diện, app tự băm và tự kiểm tra), đăng nhập ẩn danh, danh sách email được tạo gia đình.

---

## 2. Có cần xác nhận email không?

**Không cần.** Xác nhận email dùng để (a) biết người đăng ký là thật và (b) cho người dùng tự lấy lại mật khẩu. Ở đây bạn tự tạo tài khoản cho người mình biết; quên mật khẩu thì phụ huynh báo bạn, bạn đặt mật khẩu tạm mới ở trang admin.

Khi nào cần email: khi mở **tự đăng ký** cho người lạ, hoặc khi việc đặt lại mật khẩu tay quá nhiều. Lúc đó thêm email *không bắt buộc* để tự lấy lại mật khẩu (mục 9).

## 3. Bảo mật tối thiểu

| Rủi ro | Cách chặn | Công sức |
|---|---|---|
| Đoán mật khẩu | Supabase băm mật khẩu và tự giới hạn số lần đăng nhập; mật khẩu tối thiểu 8 kí tự; CAPTCHA khi đăng nhập (đã có từ PR #8, tùy chọn) | Có sẵn |
| Mật khẩu tạm bị lộ khi gửi | Lần đăng nhập đầu **bắt buộc đổi mật khẩu** | Nhỏ |
| Con vào khu phụ huynh, xóa dữ liệu | Từ hồ sơ con sang khu phụ huynh phải nhập lại mật khẩu | Nhỏ |
| Anh em dùng nhầm hồ sơ của nhau | PIN 4 số tùy chọn cho từng hồ sơ con (chỉ khóa trên giao diện, không phải bảo mật) | Nhỏ |
| Gia đình này xem dữ liệu gia đình khác | Chính sách RLS theo `family_id` (đã có kiểu này ở Phiên 5) | Có sẵn |
| Người lạ vào trang admin | Chỉ tài khoản trong bảng `app_owners` gọi được chức năng admin (kiểm tra ở Edge Function và RLS); mật khẩu chủ dài | Nhỏ |
| Lộ khóa bí mật | Khóa `service_role` chỉ nằm trong Edge Function; trang web chỉ có khóa công khai | Có sẵn |

Dữ liệu cá nhân: tài khoản chỉ có tên đăng nhập và tên hiển thị; hồ sơ con chỉ có tên, khối, lớp, hình đại diện. Thông tin liên lạc của phụ huynh (nếu cần ghi) nằm trong **ghi chú admin**, chỉ bạn đọc được.

---

## 4. Luồng

### 4.1 Cấp tài khoản

```mermaid
flowchart TD
  A[Phụ huynh muốn dùng OnUp] --> B[Bạn mở trang admin → Tạo tài khoản<br/>tên đăng nhập + mật khẩu tạm gợi ý sẵn]
  B --> C[Gửi tên đăng nhập + mật khẩu tạm cho phụ huynh]
  C --> D[Phụ huynh đăng nhập → bắt buộc đặt mật khẩu mới]
  D --> E[Thêm hồ sơ con: tên, khối, lớp, hình, PIN tùy chọn]
  E --> F[Con chọn hồ sơ và học]
```

### 4.2 Đăng nhập và chọn hồ sơ

```mermaid
flowchart TD
  A[Mở app] --> B{Máy đã đăng nhập?}
  B -- Chưa --> C[Tên đăng nhập + mật khẩu<br/>+ ô Ghi nhớ trên máy này]
  C --> D{Mật khẩu tạm?}
  D -- Có --> E[Bắt buộc đặt mật khẩu mới] --> F
  D -- Không --> F
  B -- Rồi --> F[Ai đang học?<br/>các hồ sơ con + ô Phụ huynh]
  F -- Chọn con --> G[PIN 4 số nếu có] --> H[Trang của con: bài ôn, đề, lịch thi theo khối của con]
  F -- Phụ huynh --> I[Nhập lại mật khẩu] --> J[Khu phụ huynh: tiến độ, báo cáo tuần,<br/>thêm/sửa hồ sơ con, đổi mật khẩu, đăng xuất]
```

Quên mật khẩu: dưới ô đăng nhập có dòng “Quên mật khẩu? Liên hệ người cấp tài khoản” (nội dung và đường liên hệ lấy từ `js/config.js`).

### 4.3 Trang admin (`admin.html`, chỉ chủ app vào được)

- **Danh sách và tìm kiếm** tài khoản theo tên đăng nhập hoặc ghi chú.
- **Tạo tài khoản:** tên đăng nhập (4–20 kí tự `a-z 0-9 . _`), mật khẩu tạm (gợi ý sẵn), tên hiển thị, ghi chú.
- **Đặt lại mật khẩu** (sinh mật khẩu tạm, bắt buộc đổi lần sau).
- **Khóa / mở khóa / xóa** tài khoản (xóa có xác nhận, xóa luôn hồ sơ con và kết quả).
- **Xem nhanh** một tài khoản: số hồ sơ con, khối, lần dùng gần nhất (không xem nội dung bài làm).
- **Nhật ký** thao tác admin (ai, làm gì, lúc nào).
- Số liệu nhanh: tổng tài khoản, số hồ sơ con theo khối, số tài khoản dùng trong 7 ngày.

**Đã làm ở Phiên C** (`admin.html`; ảnh 360px sáng/tối: `admin-*.jpg` trong [hinh-dam-may/](hinh-dam-may/)):
- Một trang riêng, dùng `css/app.css`, JavaScript thuần trong file. Đăng nhập bằng tài khoản chủ app; phiên chỉ giữ trong thẻ, riêng với phiên của trang học. Tài khoản không có trong `app_owners` thấy “Không có quyền”. `js/config.js` để trống thì trang chỉ báo, không tải gì từ mạng.
- Ba mục: **Tài khoản** (số liệu nhanh; tìm theo tên đăng nhập, tên hiển thị, ghi chú, không phân biệt dấu; lọc đang khóa, chưa đổi mật khẩu tạm, không dùng 7 ngày), **Tạo tài khoản** (mật khẩu tạm gợi ý sẵn, bỏ các chữ dễ đọc nhầm), **Nhật ký** (ai, làm gì, lúc nào; xem thêm theo trang).
- Trang của một tài khoản: xem nhanh (trạng thái, số hồ sơ con và khối, lần dùng gần nhất, mật khẩu tạm hay đã đổi, gói, ngày tạo), ghi chú, đặt lại mật khẩu, khóa / mở khóa (có hỏi lại), xóa (phải gõ đúng tên đăng nhập), nhật ký của tài khoản đó.
- Tạo tài khoản hoặc đặt lại mật khẩu xong: tên đăng nhập và mật khẩu tạm hiện một lần, kèm nút **Chép lời nhắn** (tên đăng nhập, mật khẩu tạm, địa chỉ trang học) để dán vào Zalo.
- Thao tác với tài khoản qua Edge Function `admin` (có nhật ký); ghi chú ghi thẳng vào `admin_notes`, nhật ký đọc từ `admin_log` (RLS chỉ cho chủ app). Không sửa máy chủ: không phải triển khai lại hàm `admin`. Chưa có nút đổi gói (mục 9).
- **Thêm ở Phiên R1:** mục **Câu bị báo** (`#/reports`): các câu học sinh, phụ huynh báo sai từ app (bảng `question_reports`, đọc thẳng, RLS chỉ cho chủ app đọc tất cả và đổi `status`), gom theo câu, đếm số lần, lọc theo đề và trạng thái, nút Đã sửa / Bỏ qua / Mở lại; ảnh `admin-cau-bi-bao.jpg`.

---

## 5. Dữ liệu trên Supabase (thay cho lược đồ Phiên 5)

| Bảng | Nội dung | Ai đọc/ghi |
|---|---|---|
| `app_owners` | id người dùng của chủ app | chỉ owner |
| `families` | 1 dòng mỗi tài khoản: `id`, `auth_user_id`, `username` (duy nhất), `display_name`, `must_change_password`, `status` (`active`/`locked`), **`plan` (mặc định `free`), `plan_until` (để trống)**, `created_at`, `last_seen_at` | phụ huynh đọc dòng của mình, sửa `display_name`; chỉ owner sửa `status`, `plan` |
| `profiles` | hồ sơ con: `family_id`, tên, hình, `grade` (1–12), lớp, `pin_hash` tùy chọn | phụ huynh của gia đình đó |
| `results`, `exam_events` | giữ như hiện nay, theo `family_id` | phụ huynh của gia đình đó |
| `plans` | hạn mức theo gói. Hôm nay chỉ có `free`: tối đa **5** hồ sơ con (chặn lạm dụng), dùng mọi nội dung | ai đã đăng nhập đều đọc; chỉ owner sửa |
| `question_reports` | câu bị báo sai từ nút “Báo câu này sai” (Phiên R1): `family_id`, `profile_id` (trống khi phụ huynh báo), `bank_id`, `q_key`, `q_text` (bản chụp câu ≤ 500 kí tự), `reason`, `note` (≤ 200), `status` (`new`/`fixed`/`rejected`), `created_at`; tối đa 30 báo cáo mỗi ngày mỗi gia đình | gia đình chỉ thêm và đọc của mình; owner đọc tất cả, chỉ đổi `status` (tab “Câu bị báo” của trang admin) |
| `admin_notes` | ghi chú của chủ app về tài khoản | chỉ owner |
| `admin_log` | nhật ký thao tác admin | chỉ owner |

Quy tắc ở máy chủ:
- Trigger khi thêm hồ sơ con: số hồ sơ phải nhỏ hơn `max_children` của gói (hôm nay 5).
- Tài khoản `locked` không đọc/ghi được gì.
- Tên đăng nhập lưu ở Supabase Auth dạng email nội bộ `ten-dang-nhap@users.onup.invalid` (đuôi `.invalid` không bao giờ là email thật, không gửi thư). Người dùng chỉ thấy và gõ tên đăng nhập.

Edge Function `admin` (thay cho `student-login`), chỉ owner gọi được: `create_account`, `reset_password`, `set_status`, `delete_account`, `list_accounts`. Dùng khóa `service_role` để tạo người dùng (`auth.admin.createUser`, đã xác nhận sẵn, không gửi email). Mọi thao tác ghi vào `admin_log`.

**Đã làm ở Phiên A** (`supabase/schema.sql`, `supabase/functions/admin/index.ts`), theo lời giao việc của bản thiết kế 1 nên có thêm phần chừa sẵn cho gói (mục 9) nhưng chưa bật:
- `plans` có 2 dòng `free` và `family`, cột `max_children`, `all_banks` (đọc mọi đề hay chỉ đề thử), `price`. Hôm nay cả hai đều 5 hồ sơ, mọi đề, nên mọi tài khoản dùng được mọi nội dung.
- Hàm `plan_active(family)` (gói khác `free` và `plan_until` ≥ hôm nay, giờ Việt Nam); hết hạn thì về hạn mức `free`. `profiles.locked`: hồ sơ vượt hạn mức (giữ các hồ sơ tạo sớm nhất), không ghi được kết quả mới, vẫn xem được kết quả cũ.
- `plan_log` (nhật ký đổi gói, số tiền) và thao tác `set_plan` của Edge Function `admin`.
- `paid_banks` (đề của chủ app, cờ `free_trial`, `published`) và `supabase/banks-to-sql.js` chuyển mọi đề trong `data/banks/` thành SQL (đề số 1 mỗi môn mỗi kì là đề thử). App vẫn đọc đề từ `data/banks/`.
- Tài khoản `locked` chỉ còn đọc được dòng `families` của mình (để app báo “đã bị khóa”), và bị cấm đăng nhập ở Supabase Auth.
- Giữ `question_banks` (ngân hàng phụ huynh tự nhập) và RPC `import_local` (chuyển dữ liệu từ bản lưu trên máy); thêm RPC `touch` (lần dùng gần nhất) và `password_changed` (bỏ cờ bắt đổi mật khẩu).

**Danh sách khối lớp** để một chỗ: `data/grades.js` (ví dụ `[{grade:4, name:"Lớp 4", active:true}, …, {grade:12, …, active:false}]`). Form hồ sơ con, lịch thi, trang quản trị đều đọc từ đây thay vì viết cứng `[4, 6]` như hiện nay (`js/store.js`, `js/store-supabase.js`, `js/app.js`). Khối chưa có nội dung thì `active:false`, không hiện cho phụ huynh chọn.

**Chỗ chừa cho gói (chưa dùng):** app có một hàm duy nhất `Store.can(feature)` (ví dụ `"addChild"`, `"bank:<mã>"`), hôm nay luôn trả lời “được” trừ hạn mức số hồ sơ. Sau này bật gói chỉ cần sửa hàm này và bảng `plans`, không phải sửa từng màn hình.

Bản lưu trên máy (LocalStore) giữ lại cho kiểm thử và dùng không cần mạng; nó cũng đọc `data/grades.js`.

**Đã làm ở Phiên B** (`data/grades.js`, `js/store-supabase.js`, `js/app.js`; ảnh 360px sáng/tối: [hinh-dam-may/](hinh-dam-may/)):
- `data/grades.js` (lớp 1–12, chỉ lớp 4 và 6 `active`) thay mọi chỗ viết cứng `[4, 6]`. `Store.can(feature)` ở cả hai kho: bản lưu trên máy luôn được; bản đám mây chỉ giới hạn `"addChild"` theo `max_children` của gói đang hiệu lực.
- Đăng nhập tên đăng nhập + mật khẩu, ô “Ghi nhớ trên máy này”, CAPTCHA khi có khóa, dòng “Quên mật khẩu?” lấy `contactText`, `contactUrl` từ `js/config.js`. Mật khẩu tạm thì bắt đặt mật khẩu mới. Tài khoản bị khóa, tài khoản không có gia đình (chủ app) thấy màn hình báo, có dòng liên hệ. Dưới form đăng nhập có thẻ “Chưa có tài khoản?” (link từ `signupText`, `signupUrl`, để trống thì dùng hai khóa contact); máy còn dữ liệu của bản lưu trên máy có học sinh mà chưa chuyển thì trên form có thẻ nhắc đường chuyển (Khu phụ huynh → Cài đặt → Chuyển dữ liệu và sao lưu); ảnh `dang-nhap.jpg`, `dang-nhap-du-lieu-cu.jpg`.
- “Ai đang học?”: các hồ sơ con và ô Phụ huynh. Hồ sơ có PIN 4 số thì nhập PIN (băm và kiểm tra trên máy, khóa tạm sau 5 lần sai), không có thì bấm là vào. Ô Phụ huynh phải nhập lại mật khẩu (vừa nhập trong 5 phút thì không hỏi lại).
- Khu phụ huynh (dùng chung các màn hình quản trị của bản lưu trên máy): tổng quan các con, hồ sơ con (thêm/sửa/xóa, đặt hoặc bỏ PIN, hạn mức theo gói), lịch thi, ngân hàng đề, dữ liệu (tên gia đình, chuyển dữ liệu máy này lên, tải file sao lưu); trang Tài khoản: đổi mật khẩu, “Đổi người học”, đăng xuất khỏi máy này. Tài khoản mới tự chép lịch thi mặc định ở lần mở đầu.
- Bỏ giao diện đăng nhập email, mã mời, mã gia đình.

---

## 6. Việc bạn tự làm (không tốn lượt Claude)

1. Tạo project Supabase miễn phí, làm theo hướng dẫn mới mà Phiên A viết. Ngắn hơn hướng dẫn cũ vì **không còn bước cài email**.
2. Tạo tài khoản chủ app của bạn (hướng dẫn có lệnh SQL một dòng để thêm vào `app_owners`).
3. Điền `js/config.js` (URL, khóa công khai, dòng liên hệ khi quên mật khẩu). `main` đang được bảo vệ: sửa trên GitHub thì chọn “Create a new branch… and start a pull request”, rồi tự Merge.
4. Thử luồng 4.1 và 4.2 với tài khoản của gia đình mình.

## 7. Để sau

Tự đăng ký; email không bắt buộc để tự lấy lại mật khẩu; xác thực 2 lớp cho tài khoản chủ app; tài khoản giáo viên/lớp học; bản trả phí (mục 9).

---

## 8. Các phiên Claude Code để làm

Làm **theo thứ tự**, mỗi phiên một cuộc trò chuyện mới, Merge xong mới mở phiên sau.

**Phiên A · Máy chủ: tài khoản, hồ sơ, Edge Function admin**
> Đọc CLAUDE.md và docs/THIET-KE-TAI-KHOAN.md (mục 1–5). Viết lại supabase/schema.sql theo mục 5: app_owners, families (username, display_name, must_change_password, status, plan mặc định 'free', plan_until, last_seen_at), profiles (hồ sơ con, grade 1–12, pin_hash tùy chọn), plans (chỉ 'free', max_children 5), admin_notes, admin_log; giữ results và exam_events theo family_id; trigger giới hạn số hồ sơ con theo plans; tài khoản locked không đọc/ghi được; RLS đúng bảng quyền mục 5. Bỏ các phần mục 1 nói bỏ (mã gia đình, mã mời, PIN học sinh trên máy chủ, đăng nhập ẩn danh, allowed_creators). Thay Edge Function student-login bằng Edge Function admin (create_account, reset_password, set_status, delete_account, list_accounts; chỉ owner; tạo người dùng bằng email nội bộ tên-đăng-nhập@users.onup.invalid; ghi admin_log). Viết lại tests/supabase (RLS trên PostgreSQL, Edge Function trên máy chủ giả) cho đủ các quy tắc. Viết lại docs/HUONG-DAN-SUPABASE.md ngắn gọn, không còn bước email. Chưa sửa giao diện app. Chạy sh tests/supabase/run.sh, tự rà soát một vòng, mở Pull Request.

**Phiên B · App: đăng nhập, chọn hồ sơ, khu phụ huynh, khối lớp chung**
> Đọc CLAUDE.md và docs/THIET-KE-TAI-KHOAN.md (mục 4.2 và 5). Sau khi Phiên A đã gộp: tạo data/grades.js (lớp 1–12, chỉ lớp 4 và 6 active) và thay mọi chỗ viết cứng [4, 6] trong js/store.js, js/store-supabase.js, js/app.js bằng danh sách này. Sửa js/store-supabase.js và js/app.js cho bản đám mây: đăng nhập tên đăng nhập + mật khẩu (+ Ghi nhớ, CAPTCHA nếu có khóa), bắt buộc đổi mật khẩu tạm, màn hình “Ai đang học?”, PIN 4 số tùy chọn cho hồ sơ con, nhập lại mật khẩu khi vào khu phụ huynh, thêm/sửa/xóa hồ sơ con (giới hạn theo plans), đổi mật khẩu, dòng “Quên mật khẩu?” lấy từ js/config.js. Thêm Store.can(feature) ở cả hai kho, hôm nay luôn cho phép trừ hạn mức hồ sơ. Bỏ giao diện đăng nhập email, mã mời, mã gia đình. Bản lưu trên máy giữ nguyên cách dùng. Cập nhật tests/e2e.js, tests/supabase/store-test.mjs, tests/supabase/cloud-e2e.js, ảnh 360px sáng/tối, cập nhật CLAUDE.md phần bản đám mây, tự rà soát một vòng, mở Pull Request.

**Phiên C · Trang admin**
> Đọc CLAUDE.md và docs/THIET-KE-TAI-KHOAN.md (mục 4.3). Sau khi Phiên B đã gộp: tạo admin.html (dùng css/app.css, JavaScript thuần, không build) cho chủ app: danh sách và tìm tài khoản, tạo tài khoản (gợi ý mật khẩu tạm), đặt lại mật khẩu, khóa/mở khóa/xóa có xác nhận, xem nhanh một tài khoản, ghi chú, nhật ký thao tác, số liệu nhanh. Gọi Edge Function admin; tài khoản không phải owner thấy “Không có quyền”. Thêm kiểm thử trang admin vào tests/supabase/cloud-e2e.js, tự rà soát một vòng, mở Pull Request.

---

## 9. Hướng phát triển bản trả phí (chưa làm — khi đủ đề lớp 4–12)

**Đã chốt 18/10/2026:** bán khi đủ đề lớp 4–12 (theo nhịp 1–2 phiên mỗi tuần: khoảng cuối năm học 2028–2029). Đến lúc đó **gói Miễn phí giữ như hiện nay** (5 hồ sơ con, mọi đề; bảng `plans` không đổi, `Store.can()` chỉ giới hạn số hồ sơ). Hạn mức gói Miễn phí và gói Gia đình lúc bán **chốt sau**, chủ app điền vào lời giao việc Phiên G1. Các phiên chuẩn bị bán **G1 → B1 → B2 → B4** làm ngay trước lúc đó (lời giao việc ở mục 4 của [KE-HOACH-PHAT-TRIEN-ONUP.md](KE-HOACH-PHAT-TRIEN-ONUP.md); vì sao cần từng phiên: mục 5 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md)); lên Supabase Pro khi bắt đầu thu tiền. Giá bán không ghi trong repo (giá đọc từ bảng `plans`, chủ app điền lúc kích hoạt).

Ghi lại để lúc đó không phải nghĩ lại từ đầu. Khung ở mục 5 đã chừa chỗ cho tất cả.

- **Gói:** hướng dự kiến là Miễn phí (ít hồ sơ con hơn, bài ôn, đề thử số 1 mỗi môn mỗi kì) và Gói Gia đình (nhiều hồ sơ, mọi đề, hạn đến 31/8 cuối năm học); con số cụ thể chốt lúc bán. Cấu hình trong bảng `plans`; app chỉ đổi `Store.can()`. Gia đình đã dùng từ trước: cách chuyển (ví dụ giữ quyền lợi cũ đến hết năm học) cũng chốt lúc đó.
- **Bán qua Zalo, kích hoạt tay (Phiên G1):** màn hình Nâng cấp (quyền lợi, giá đọc từ `plans`, QR chuyển khoản, nội dung `ONUP tên-đăng-nhập`, nút Nhắn Zalo soạn sẵn) → bạn kiểm tra tiền → trang admin thêm nút “Kích hoạt gói” (gói, hạn, số tiền, ghi chú) gọi `set_plan` đã có, bảng `plan_log` để đối soát.
- **Bảo vệ đề trả phí (Phiên B1, B2):** repo đang công khai nên đề trong `data/banks/` ai cũng tải được; đến khi bán chấp nhận như vậy. Khi bán, repo chuyển sang riêng tư và trang chạy trên Cloudflare Pages (B1); đề trả phí chuyển vào bảng `paid_banks` trên Supabase, đọc qua RLS khi gói còn hạn hoặc đề là đề thử (B2).
- **Hết hạn:** về gói miễn phí, không mất dữ liệu; hồ sơ vượt hạn mức bị khóa đến khi gia hạn; nhắc trước 14 ngày.
- **Thêm khi thu tiền:** trang Điều khoản và Quyền riêng tư theo quy định bảo vệ dữ liệu cá nhân hiện hành (Phiên G1); Supabase lên gói Pro; thông báo website với Bộ Công Thương; hỏi kế toán về thuế, hóa đơn.
- **Khi đơn nhiều:** tự đăng ký có CAPTCHA, email tự lấy lại mật khẩu, thanh toán tự động.
