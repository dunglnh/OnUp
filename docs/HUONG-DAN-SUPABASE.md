# Hướng dẫn bật đồng bộ đám mây (Supabase)

Mặc định app lưu dữ liệu trong trình duyệt của từng máy. Làm theo hướng dẫn này để dữ liệu nằm trên máy chủ Supabase (miễn phí), dùng chung trên nhiều máy:

- **Bố mẹ, thầy cô** đăng nhập bằng email: app gửi một đường link (kèm mã số), bấm vào là vào, không cần mật khẩu.
- **Học sinh** không cần email: nhập **mã gia đình**, chọn tên, nhập **mã PIN 6 số**.
- Phụ huynh chỉ xem được hồ sơ và kết quả của con mình. Quản trị quản lý cả gia đình.

Mất khoảng 30–45 phút. Cần: một máy tính, tài khoản GitHub (đã có), và **một hộp thư Gmail riêng chỉ để app gửi email đăng nhập** (tạo mới, đừng dùng email cá nhân hay công việc).

> Tên các mục trong trang Supabase đôi khi được đổi. Nếu không thấy đúng chữ như dưới đây, tìm mục có ý nghĩa gần nhất (hoặc gõ vào ô tìm kiếm của trang).

---

## Bước 0. Tải file sao lưu dữ liệu cũ (nên làm)

Trước khi đổi gì, mở app bản hiện tại (https://dunglnh.github.io/OnUp/), đăng nhập quản trị → **Quản trị → Dữ liệu → Tải file sao lưu**.

> ⚠️ File sao lưu của bản lưu trên máy chứa mã PIN của các con ở dạng **dò ngược được** rất nhanh. Giữ file ở máy của bạn, **không gửi qua Zalo, email**, và **xóa file** sau khi đã chuyển dữ liệu lên đám mây (bước 7).

## Bước 1. Tạo project Supabase

1. Vào https://supabase.com → **Start your project** → đăng nhập bằng GitHub.
2. **New project**:
   - Name: `OnUp`
   - Database Password: bấm **Generate a password**, chép lại cất kĩ (ít khi cần dùng).
   - Region: **Southeast Asia (Singapore)** cho nhanh ở Việt Nam.
   - Gói: **Free**.
3. Bấm **Create new project**, đợi 1–2 phút.

## Bước 2. Tạo bảng dữ liệu (chạy schema.sql) và cho phép email của bạn tạo gia đình

1. Mở file [`supabase/schema.sql`](../supabase/schema.sql) trên GitHub → bấm nút **Copy raw file** (biểu tượng hai tờ giấy).
2. Trong Supabase: thanh bên trái → **SQL Editor** → **New query** → dán toàn bộ → **Run**.
3. Thấy dòng `Success. No rows returned` là xong. Chỉ chạy một lần trên project mới (chạy lần hai sẽ báo `already exists`, không sao).
4. Vẫn trong SQL Editor, **New query**, dán dòng dưới (thay bằng email của bạn, viết thường) → **Run**:
   ```sql
   insert into allowed_creators (email) values ('email-cua-ban@gmail.com');
   ```
   Chỉ email trong danh sách này mới **tạo được gia đình mới**. Người khác (phụ huynh, thầy cô) vào gia đình bằng **mã mời** bạn gửi, không cần thêm vào đây. Nhờ vậy người lạ không dùng được project của bạn.

## Bước 3. Bật cách đăng nhập

Thanh bên trái → **Authentication**:

1. **Sign In / Providers** (hoặc **Providers**):
   - **Email**: bật (thường đã bật sẵn).
   - **Allow anonymous sign-ins**: **bật**. Học sinh cần mục này để đăng nhập bằng mã gia đình + PIN.
   - **Allow new users to sign up**: để **bật** (phụ huynh mới cần tạo tài khoản bằng email).
2. **Emails → SMTP Settings**: bật **Enable custom SMTP** (máy chủ email có sẵn của Supabase chỉ gửi cho thành viên của project). Dùng **hộp thư Gmail riêng cho app** (tạo mới, ví dụ `onthi.nhabin@gmail.com`):
   1. Bật xác minh 2 bước cho hộp thư đó → https://myaccount.google.com/apppasswords → tạo **mật khẩu ứng dụng** tên `OnUp` → chép 16 kí tự.
   2. Điền: Sender email = hộp thư riêng đó; Sender name = `Ôn Thi 4·6`; Host = `smtp.gmail.com`; Port = `465`; Username = hộp thư đó; Password = 16 kí tự vừa chép. **Save**.
   3. Địa chỉ gửi này ai bấm “Gửi link” cũng thấy, nên **không** dùng email cá nhân hay công việc. (Cách khác: dịch vụ gửi thư như Brevo, Resend có gói miễn phí, dùng địa chỉ no-reply.)
   4. Để giới hạn gửi email (**Authentication → Rate Limits**) ở mức mặc định. Chỉ tăng lên sau khi đã bật chống máy tự động (bước 5b).
3. **Emails → Templates**: thêm dòng dưới đây vào **cả hai** mẫu **Magic Link** và **Confirm signup** (lần đăng nhập đầu tiên của một email dùng mẫu Confirm signup). Nhờ mã số này, người mở email trên máy khác, hoặc khi ứng dụng email tự mở link trước, vẫn đăng nhập được:
   ```html
   <p>Hoặc nhập mã này trong app: <b>{{ .Token }}</b></p>
   ```
4. **URL Configuration**:
   - **Site URL**: `https://dunglnh.github.io/OnUp/`
   - **Redirect URLs** → **Add URL**: `https://dunglnh.github.io/OnUp/` và `https://dunglnh.github.io/OnUp/**`.
   - Chỉ khi đang thử trên máy tính mới thêm `http://localhost:8000/**`; thử xong thì **xóa** dòng này.

## Bước 4. Triển khai Edge Function `student-login`

Hàm này kiểm tra mã gia đình + PIN của học sinh và băm PIN trên máy chủ, nên PIN không bao giờ nằm trong trình duyệt.

1. Thanh bên trái → **Edge Functions → Secrets** (hoặc **Manage secrets**) → thêm **trước**:
   - Name: `PIN_PEPPER`
   - Value: một chuỗi ngẫu nhiên **ít nhất 32 kí tự**, ví dụ gõ bừa 40 chữ và số. **Bắt buộc**: thiếu hoặc ngắn quá thì học sinh không đăng nhập được. **Không chia sẻ, không đổi** sau khi đã có học sinh (đổi thì mọi PIN phải đặt lại).

   Khóa bí mật để hàm đọc dữ liệu (`SUPABASE_SECRET_KEYS` hoặc `SUPABASE_SERVICE_ROLE_KEY`) Supabase tự cấp cho hàm, không cần thêm.

**Cách A — ngay trên trang Supabase (không cần cài gì):**

2. **Edge Functions** → **Deploy a new function** → **Via Editor**.
3. Đặt tên đúng là `student-login`.
4. Xóa code mẫu. Mở [`supabase/functions/student-login/index.ts`](../supabase/functions/student-login/index.ts) trên GitHub → **Copy raw file** → dán vào → **Deploy function**.
5. Mở hàm vừa tạo → tab **Details** (hoặc **Settings**) → **tắt** mục **Verify JWT** / **Enforce JWT verification** → **Save**. (Hàm tự kiểm tra người gọi.)

**Cách B — bằng dòng lệnh (nếu quen dùng):**

```bash
npx supabase login
npx supabase link --project-ref <mã project, xem trong Project Settings>
npx supabase secrets set PIN_PEPPER="<chuỗi ngẫu nhiên ít nhất 32 kí tự>"
npx supabase functions deploy student-login --no-verify-jwt
```

## Bước 5. Điền `js/config.js`

1. Supabase → **Project Settings → API Keys** (hoặc **API**). Chép:
   - **Project URL**, dạng `https://abcdxyz.supabase.co` (ở **Project Settings → Data API** nếu không thấy ở đây).
   - Khóa **publishable** (bắt đầu bằng `sb_publishable_`) hoặc **anon public** (tab *Legacy API keys*).
2. Trên GitHub, mở [`js/config.js`](../js/config.js) → biểu tượng bút chì (**Edit**) → điền:
   ```js
   window.ONTAP_CONFIG = {
     supabaseUrl: "https://abcdxyz.supabase.co",
     supabaseAnonKey: "sb_publishable_... hoặc eyJhbGciOi..."
   };
   ```
3. **Commit changes**. Sau 1–2 phút GitHub Pages cập nhật.

> ⚠️ **Tuyệt đối không** dán khóa `service_role` hay `secret` (`sb_secret_...`) vào file này: khóa đó bỏ qua mọi lớp bảo vệ. App sẽ từ chối chạy nếu thấy khóa bí mật. Lỡ dán thì xóa ngay và bấm đổi khóa (Roll) trong Supabase.
>
> Khóa publishable/anon là khóa công khai, để trên GitHub được: dữ liệu được bảo vệ bằng chính sách RLS trong `schema.sql`.

Muốn quay lại bản lưu trên máy: xóa hai giá trị trong `js/config.js` (để lại `""`). Dữ liệu cũ trên từng máy (từ trước khi bật đám mây) vẫn còn. Nhưng mọi thứ làm trong thời gian dùng đám mây (kết quả, tài khoản, lịch đã sửa) **chỉ nằm trên Supabase**, không khôi phục được vào bản lưu trên máy.

## Bước 5b. Bật chống máy tự động (CAPTCHA) — nên làm

Trang đăng nhập là trang công khai: không có bước này, một chương trình tự động có thể bấm “Gửi link” liên tục làm hết lượt gửi email, hoặc tạo hàng loạt phiên học sinh. App dùng **Cloudflare Turnstile** (miễn phí): thường không hiện gì, chỉ thỉnh thoảng hiện một ô “Xác minh bạn là người” để bấm. Không có câu đố, không cần tài khoản cho trẻ.

**Làm đúng thứ tự** (bật trên Supabase trước khi app có khóa thì không ai đăng nhập được):

1. Vào https://dash.cloudflare.com → đăng kí miễn phí (nếu chưa có) → **Turnstile** → **Add widget**:
   - Widget name: `OnUp`
   - Hostnames: `dunglnh.github.io` (đang thử trên máy tính thì thêm `localhost`, thử xong xóa đi)
   - Widget mode: **Managed**
   - **Create**. Chép **Site Key** và **Secret Key**.
2. Trên GitHub, sửa [`js/config.js`](../js/config.js): dán **Site Key** vào `turnstileSiteKey: "..."` → **Commit changes**. Đợi 1–2 phút, mở app, tải lại trang. (Site Key là khóa công khai, để trên GitHub được. **Secret Key không bao giờ** dán vào file này.)
3. Supabase → **Authentication → Attack Protection** (hoặc **Bot and Abuse Protection**) → bật **Enable CAPTCHA protection** → Provider: **Turnstile by Cloudflare** → dán **Secret Key** → **Save**.
4. Thử lại: gửi link đăng nhập bằng email, và trên máy khác cho học sinh nhập mã gia đình. Cả hai đều vào được là xong.

Muốn tắt: tắt trên Supabase **trước**, rồi mới xóa Site Key trong `js/config.js`.

## Bước 6. Đăng nhập lần đầu, tạo gia đình

1. Mở https://dunglnh.github.io/OnUp/ (tải lại trang nếu đang mở).
2. Ở ô **Bố mẹ, thầy cô**, nhập email đã thêm ở bước 2.4 → **Gửi link đăng nhập** → mở email → bấm link, hoặc gõ mã số trong email.
   - Ô **Ghi nhớ đăng nhập trên máy này**: chỉ tick trên máy **riêng** của bạn. Không tick thì đóng tab là thoát (như bản cũ). Trên máy dùng chung với con, nhớ bấm **Đăng xuất** khi xong.
3. Màn hình **Chào bạn!** → **Tạo gia đình mới** → nhập tên → **Tạo và bắt đầu**. Bạn là quản trị. Lịch thi cả năm được chép sẵn.

![Đăng nhập](hinh-supabase/c1-dang-nhap.jpg)
![Đã gửi email](hinh-supabase/c2-da-gui-email.jpg)
![Tạo gia đình](hinh-supabase/c3-tao-gia-dinh.jpg)

## Bước 7. Chuyển dữ liệu máy cũ lên đám mây

Dữ liệu cũ nằm trong trình duyệt của máy đã dùng bản cũ. Trên **chính máy và trình duyệt đó**:

1. Mở app, đăng nhập quản trị bằng email (bước 6).
2. **Quản trị → Dữ liệu → Chuyển dữ liệu máy này lên đám mây**.
3. App báo số tài khoản và kết quả đã chuyển, kèm **mã mời** cho từng phụ huynh, quản trị khác.

Nếu dữ liệu ở máy khác hoặc chỉ còn file sao lưu: bấm **Chuyển từ file sao lưu** và chọn file đã tải ở bước 0. (File sao lưu tải từ bản đám mây thì không chuyển được, vì dữ liệu đó đã ở trên máy chủ.)

- Học sinh **đăng nhập được bằng mã PIN cũ**; ngay sau đó app đưa học sinh tới trang đổi mã PIN mới 6 số. Danh sách tài khoản của bố mẹ/quản trị ghi “nên đặt PIN mới 6 số” cho tới khi PIN được đổi. **Hãy đặt mã PIN mới cho từng con** (Quản trị → Tài khoản → tên con → Mã PIN mới), vì PIN cũ đã từng nằm trong file sao lưu.
- Quản trị cũ trùng tên với bạn được gộp vào tài khoản của bạn.
- Bấm chuyển nhiều lần cũng không bị trùng dữ liệu. Tiến độ trong các bài ôn trên máy này được giữ.
- Xong thì **xóa file sao lưu cũ** (bước 0).

![Chuyển dữ liệu](hinh-supabase/c6-da-chuyen.jpg)

## Bước 8. Mời phụ huynh, quản trị khác

1. **Quản trị → Tài khoản → + Thêm** (phụ huynh hoặc quản trị) → nhập tên → **Tạo tài khoản**.
2. App hiện **mã mời** 12 kí tự. Gửi mã qua Zalo/tin nhắn.
3. Người đó mở app → **Bố mẹ, thầy cô** → đăng nhập bằng email của họ → nhập mã mời → **Vào gia đình**.
4. Ở trang sửa tài khoản phụ huynh, tick tên con để phụ huynh xem được hồ sơ của con.

Mất máy hoặc đổi email: mở tài khoản đó → **Gỡ email, tạo mã mời mới**.

![Mã mời](hinh-supabase/c4-ma-moi.jpg)

## Bước 9. Học sinh đăng nhập

1. Lấy **mã gia đình** (6 kí tự) ở **Quản trị → Dữ liệu**, hoặc ở trang chủ phụ huynh.
2. Trên máy của con: mở app → ô **Học sinh** → nhập mã gia đình → **Tiếp** → chọn tên → nhập PIN.
3. Máy nhớ mã gia đình; lần sau con chỉ chọn tên và nhập PIN. Đóng tab thì phải nhập lại PIN (như bản cũ).

**Mã PIN** ở bản đám mây gồm **6 chữ số**, không nhận số dễ đoán (111111, 123456, năm sinh…). PIN chỉ để phân biệt người dùng, không phải mật khẩu.

**Ai biết mã gia đình** thì thấy **tên và hình đại diện** của các con trong gia đình (để chọn tên khi đăng nhập), và có thể thử đoán PIN. Máy chủ giới hạn việc thử:
- Sai 5 lần thì phải đợi 30 giây, càng sai càng phải đợi lâu.
- Trên máy lạ, sai 15 lần liên tiếp kể từ lần đăng nhập đúng gần nhất, hoặc 20 lần trong một ngày, thì PIN **bị khóa hẳn**: bố mẹ hoặc quản trị đặt mã PIN mới để mở. Trong lúc đó, máy con đã từng đăng nhập đúng (tối đa 10 máy gần nhất) vẫn vào được bình thường.
- Đặt PIN mới, đổi mã gia đình hay bấm “Đăng xuất mọi máy của con” thì các máy đó không còn là máy quen nữa: con nhập mã gia đình và PIN lại một lần.

Vì vậy:
- **Mỗi gia đình một mã**, chỉ đưa mã cho người trong nhà. Không nên dùng chung một “gia đình” cho cả lớp.
- Lỡ để lộ mã: **Quản trị → Dữ liệu → Đổi mã**. Đổi mã gia đình, hoặc đặt PIN mới cho con, sẽ **đăng xuất mọi máy** của học sinh đó / cả gia đình.
- Trang sửa tài khoản của con có nút **Đăng xuất mọi máy của con** (ví dụ khi mất điện thoại).

![Mã gia đình và PIN](hinh-supabase/c7-ma-gia-dinh-pin.jpg)

## Bước 10. Tự kiểm tra sau khi cài

Làm lần lượt, tick khi xong:

- [ ] Gửi link đăng nhập: email đến trong 1 phút, có mã số; bấm link hoặc gõ mã đều vào được app.
- [ ] Đã bật CAPTCHA (bước 5b): gửi link và học sinh nhập mã gia đình vẫn vào được.
- [ ] Email chưa có trong `allowed_creators` thì không tạo được gia đình mới.
- [ ] Tạo gia đình, thêm 1 học sinh (PIN 6 số) và 1 phụ huynh.
- [ ] Trên điện thoại khác: học sinh đăng nhập bằng mã gia đình + PIN, làm một đề ngắn.
- [ ] Thử nhập sai PIN 5 lần rồi nhập thêm lần thứ 6: app báo đợi 30 giây.
- [ ] Tắt mạng điện thoại, làm xong một đề, bật mạng lại: kết quả vẫn lên máy chủ.
- [ ] Phụ huynh nhận mã mời, đăng nhập bằng email khác, thấy kết quả vừa làm của con.
- [ ] Phụ huynh **không** thấy hồ sơ, kết quả của học sinh không phải con mình.
- [ ] Bấm **Chuyển dữ liệu máy này lên đám mây** trên máy cũ; học sinh cũ đăng nhập được bằng PIN cũ; đặt PIN mới cho con.
- [ ] Supabase → **Table Editor**: các bảng có dữ liệu; bảng `student_pins` chỉ có chuỗi bắt đầu bằng `pbkdf2v2`, `wrap$` (không có PIN gốc, không có `legacy$`).
- [ ] Supabase → **Edge Functions → student-login → Logs**: không có lỗi đỏ.

## Bảo mật và quyền riêng tư

- App lưu: tên hiển thị, hình đại diện, khối, lớp của học sinh; kết quả làm bài. Email của bố mẹ/thầy cô do Supabase Auth giữ để đăng nhập. Học sinh không có email. Không hỏi ngày sinh, số điện thoại, ảnh.
- Quyền xem, sửa được kiểm tra trên máy chủ (RLS): phụ huynh đọc hồ sơ và kết quả của con mình, sửa hoặc xóa được hồ sơ con mình; quản trị đọc/ghi trong gia đình của mình; học sinh chỉ đọc và ghi kết quả của chính mình, chỉ đổi được hình đại diện. Gia đình này không thấy dữ liệu gia đình khác.
- Ngoại lệ có chủ ý: ai biết mã gia đình thì thấy tên và hình đại diện của các con trong gia đình đó (xem bước 9).
- Mã PIN được kiểm tra và băm trên máy chủ (PBKDF2 + `PIN_PEPPER`); trình duyệt không bao giờ thấy PIN đã lưu hay bản băm. PIN chỉ để phân biệt người dùng, không phải mật khẩu.
- Nếu bật CAPTCHA (bước 5b), Cloudflare Turnstile xem một vài thông tin của trình duyệt để phân biệt người với máy tự động; nó không hỏi thông tin cá nhân và không dùng để quảng cáo. App không gửi tên hay dữ liệu học tập cho Cloudflare.
- Bộ đếm thử sai lưu địa chỉ IP ở dạng băm (không giữ IP gốc) và tự xóa sau 30 ngày. Supabase Auth tự ghi lại IP, thông tin trình duyệt khi đăng nhập (kể cả máy học sinh) theo chính sách của Supabase.
- **Xóa toàn bộ dữ liệu trên đám mây** (Quản trị → Dữ liệu) xóa gia đình, hồ sơ, kết quả, lịch; **không** xóa email đăng nhập của người lớn và người dùng ẩn danh của máy học sinh trong Supabase Auth. Muốn xóa hẳn: **Authentication → Users** → xóa từng người, hoặc chạy câu dọn dẹp bên dưới.
- Khóa `service_role`/`secret` chỉ nằm trong Supabase (Edge Function tự có), không bao giờ đưa vào code của trang.

## Gỡ lỗi thường gặp

| Hiện tượng | Cách xử lí |
|---|---|
| Không nhận được email, hoặc báo `Email address not authorized` | Làm lại bước 3.2 (SMTP riêng). Xem thư mục Spam. |
| Nhiều email đăng nhập lạ gửi đi, phụ huynh thật không nhận được link | Có người bấm gửi link liên tục. Bật chống máy tự động (bước 5b) nếu chưa bật; tạm thời đổi mật khẩu ứng dụng của hộp thư gửi, đợi một giờ. |
| “Máy chủ đang bật chống máy tự động (CAPTCHA) nhưng app chưa có khóa CAPTCHA” | Đã bật CAPTCHA trên Supabase mà `js/config.js` chưa có `turnstileSiteKey`. Điền Site Key (bước 5b.2), hoặc tạm tắt CAPTCHA trên Supabase. |
| “Chưa xác minh được” / “Không tải được bước xác minh” | Tải lại trang. Kiểm tra widget Turnstile có hostname `dunglnh.github.io`, Site Key trong `js/config.js` và Secret Key trong Supabase là của cùng một widget. Mạng chặn `challenges.cloudflare.com` thì không xác minh được. |
| “Email này chưa được phép tạo gia đình mới” | Thêm email đó vào `allowed_creators` (bước 2.4), hoặc nhờ quản trị gửi mã mời. |
| “Link đăng nhập đã hết hạn hoặc đã được dùng” / “không dùng được ở trình duyệt này” | Link chỉ dùng một lần, hết hạn sau 1 giờ, và nên mở trên đúng trình duyệt đã bấm gửi. Gõ **mã số trong email** (bước 3.3) hoặc gửi link mới. |
| Bấm link xong lại quay về trang đăng nhập | Kiểm tra bước 3.4 (Site URL, Redirect URLs có đúng `https://dunglnh.github.io/OnUp/`). |
| “Máy chủ chưa bật đăng nhập cho học sinh (Anonymous sign-ins)” | Bật **Allow anonymous sign-ins** (bước 3.1). |
| “Mã PIN đã bị khóa vì nhập sai nhiều lần” | Bố mẹ/quản trị mở tài khoản của con → nhập **Mã PIN mới** → Lưu. |
| Học sinh báo “Máy chủ đang lỗi” | Kiểm tra secret `PIN_PEPPER` có và đủ 32 kí tự (bước 4.1), tên hàm đúng `student-login`, đã tắt Verify JWT. Xem Logs của hàm. |
| “Không tải được thư viện đám mây” | Máy đang mất mạng, hoặc mạng chặn `cdn.jsdelivr.net`. Bản đám mây cần mạng; bản lưu trên máy thì không. |
| “js/config.js đang chứa khóa bí mật” | Bạn dán nhầm khóa service_role/secret. Xóa, dán khóa publishable/anon, rồi đổi (Roll) khóa bí mật trong Supabase. |
| Trang Supabase báo project **Paused** | Gói Free tạm dừng project sau khoảng 1 tuần không ai dùng. Vào Supabase bấm **Restore**; dữ liệu vẫn còn. |

## Dọn dẹp định kì (tùy chọn, vài tháng một lần, ngoài giờ học)

Mỗi tab học sinh tạo một người dùng ẩn danh. Câu dưới đây xóa người dùng ẩn danh **không hoạt động** quá 90 ngày (máy đang dùng không bị ảnh hưởng). Chạy trong **SQL Editor**:

```sql
delete from auth.users u
where u.is_anonymous
  and not exists (select 1 from auth.sessions s
                  where s.user_id = u.id
                    and coalesce(s.refreshed_at, s.updated_at, s.created_at) > now() - interval '90 days');
```

Bộ đếm thử sai cũ tự xóa sau 30 ngày.

---

Phần kĩ thuật cho người sửa code: `js/store-supabase.js` (cùng các hàm với `Store` trong `js/store.js`), `supabase/schema.sql` (bảng, RLS, hàm), `supabase/functions/student-login/index.ts`, kiểm thử trong `tests/supabase/` (xem `CLAUDE.md`).
