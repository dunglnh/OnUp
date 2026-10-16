# CLAUDE.md — OnUp - Ôn Luyện Mỗi Ngày (lớp 4 và 6)

Hướng dẫn cho Claude (và người) khi làm việc trong repo này. Đọc hết file này trước khi sửa code.

## App này là gì

Web app ôn thi **cả năm học** cho học sinh **lớp 4 và lớp 6** (sách Kết nối tri thức, Tiếng Anh Global Success) và **phụ huynh** theo dõi con. Có ba vai trò: học sinh, phụ huynh, quản trị (thầy cô hoặc bố mẹ quản lý). Bản mô tả tính năng đầy đủ: `docs/TINH-NANG.md`.

Người dùng là trẻ 9–12 tuổi và phụ huynh, nên:
- Giao diện tiếng Việt, câu ngắn. Gọi người đang dùng app là "bạn" (cả học sinh, phụ huynh, quản trị); chỉ dùng "con" khi nói với phụ huynh về con của họ ("hồ sơ của con"). Không thuật ngữ kỹ thuật trên màn hình.
- Ưu tiên điện thoại (rộng 360–420px), nút to, không cuộn ngang.
- Thu thập dữ liệu tối thiểu: tên hiển thị, khối, lớp. **Không** hỏi ngày sinh, số điện thoại, email, ảnh của trẻ.

## Kiến trúc

Trang tĩnh, **không có bước build**, chạy được trên GitHub Pages. Không thêm framework hay bundler nếu chưa được yêu cầu.

```
index.html              khung app, nạp các file theo thứ tự: data → config → store → store-supabase → quiz → app
css/app.css             toàn bộ giao diện app chính (token màu ở :root, có chế độ tối)
js/config.js            cấu hình Supabase. ĐỂ TRỐNG (mặc định) = dùng LocalStore, không tải gì từ mạng
js/store.js             kho dữ liệu (LocalStore, localStorage khóa "ontap_db_v1"). Mọi màn hình chỉ gọi Store.*
js/store-supabase.js    SupabaseStore: cùng các hàm với LocalStore, chỉ bật khi js/config.js có URL + anon key
js/app.js               định tuyến hash + tất cả màn hình (đăng nhập, trang chủ theo vai trò, báo cáo tuần, lịch, quản trị)
js/quiz.js              bộ làm bài chung cho ngân hàng câu hỏi + bộ đọc cú pháp nhập câu hỏi
js/bridge.js            nạp bên trong mỗi bài ôn: tách dữ liệu theo học sinh, gửi điểm về app
data/calendar-2026-2027.js  lịch thi mặc định (window.ONTAP_SEED_EVENTS)
data/modules.js         danh mục bài ôn dạng trang riêng (window.ONTAP_MODULES)
data/banks.js           ngân hàng câu hỏi có sẵn (window.ONTAP_SEED_BANKS). Bỏ một bộ thì thêm mã vào RETIRED_SEED_BANKS ở cả hai kho
modules/<mã>/index.html bài ôn độc lập, mỗi bài là một file HTML tự chứa (từ 4 artifact gốc)
supabase/schema.sql     bảng, chính sách RLS, hàm RPC cho bản đám mây
supabase/functions/student-login/index.ts  Edge Function: học sinh đăng nhập bằng mã gia đình + PIN, đặt PIN (băm PBKDF2)
tests/supabase/         kiểm thử bản đám mây: máy chủ giả, RLS trên PostgreSQL, giao diện
docs/HUONG-DAN-SUPABASE.md  hướng dẫn phụ huynh cài Supabase từng bước
```

### Hai loại nội dung ôn
1. **Bài ôn dạng trang** (`modules/`): ioe-4, ioe-6, l4-giua-ki-1, l6-giua-ki-1. Mỗi bài có bộ câu hỏi, sinh câu Toán ngẫu nhiên, đề có giờ, ôn câu sai riêng. App mở trong `<iframe>` với `?u=<mã học sinh>&m=<mã bài>`.
2. **Ngân hàng câu hỏi** (`data/banks.js` + do quản trị viên nhập): chạy bằng `js/quiz.js` ngay trong app. Đây là cách thêm đề cho các kì thi mới (cuối kì, giữa kì II…) mà không phải viết trang mới.

### Hợp đồng giữa bài ôn và app (không được phá)
Mỗi file `modules/*/index.html` có ba chỗ nối với app so với artifact gốc (ngoài ra chỉ sửa lời: xưng “bạn” với học sinh):
- `<script src="../../js/bridge.js"></script>` ngay trước thẻ `<script>` chính.
- `const PFX=(window.ONTAP_NS||"")+...` — khóa localStorage có tiền tố theo học sinh.
- Sau dòng lưu lịch sử trong `finish()`: `window.ontapReport&&ontapReport({label,mode,subject,r,t,s})`.
  `subject` là mã môn (`toan`, `tv`, `van`, `khtn`, `ta`) và phải có trong `subjects` của bài đó ở `data/modules.js`.

App chỉ nhận tin nhắn khi `event.source` là đúng iframe đang mở và cùng origin, và chỉ lưu điểm khi người đang đăng nhập là học sinh.

**Thêm bài ôn dạng trang mới:** tạo `modules/<mã>/index.html`, làm ba chỗ sửa trên, khai báo trong `data/modules.js`, rồi gắn mã vào `modules` của các kì thi trong `data/calendar-2026-2027.js`.

### Kho dữ liệu
`Store` (js/store.js) là ranh giới duy nhất với dữ liệu. Cấu trúc:
- `users`: `{id, role, name, avatar, salt, pinHash, grade?, className?, parentIds?}` — quan hệ phụ huynh–con lưu ở `parentIds` của học sinh.
- `events`: kì thi, xem chú thích đầu `data/calendar-2026-2027.js`. **Không đổi `id`** của kì thi đã có.
- `banks`: ngân hàng do quản trị viên nhập (giữ cả văn bản gốc ở `src` để sửa lại).
- `results`: `{userId, source:"module"|"bank", refId, subject, label, mode, r, t, s, at, wrongTopics?}`.
- `seedBanksSeen`: mã các ngân hàng có sẵn (data/banks.js) máy này đã xét. Khi thêm bộ mới vào data/banks.js và gắn vào `banks` của một kì thi trong lịch mặc định, `load()` tự gắn bộ đó vào kì thi trên máy đã có dữ liệu; bộ quản trị viên đã bỏ gắn thì không gắn lại.

Khi thêm trường mới: thêm giá trị mặc định khi đọc dữ liệu cũ, vì người dùng đã có dữ liệu trên máy. Nếu đổi cấu trúc không tương thích, tăng `SCHEMA_VERSION` và viết hàm chuyển đổi trong `load()`.

Mã PIN ở chế độ cục bộ chỉ để phân biệt người trong nhà/lớp, **không phải bảo mật thật**. Đừng mô tả nó là an toàn trên giao diện.

### Bản đám mây (SupabaseStore)
Bật khi `js/config.js` có `supabaseUrl` + `supabaseAnonKey`; khi đó `window.Store` là SupabaseStore (`Store.cloud === true`), LocalStore còn ở `window.LocalStore` để đọc dữ liệu cũ khi chuyển lên. Hướng dẫn cài: `docs/HUONG-DAN-SUPABASE.md`.
- Giao diện giống hệt LocalStore: hàm đọc đồng bộ (đọc từ bộ nhớ đệm tải lúc đăng nhập), `createUser`/`updateUser`/`checkPin` async. Hàm ghi cập nhật bộ nhớ đệm ngay rồi đẩy lên máy chủ theo hàng đợi; lỗi thì gọi `Store.onError` (app hiện toast) và tải lại dữ liệu thật. **Thêm hàm mới vào Store thì thêm ở cả hai kho**; `tests/supabase/store-test.mjs` so danh sách hàm.
- Hàm chỉ có ở bản đám mây: `init, refresh, flush, authState ("signed-out"|"no-profile"|"ready"), sendLink, verifyCode, rememberLogin, familyStudents, studentLogin, createFamily, claimInvite, newInvite, newJoinCode, signOutChild, familyCode, localData, migrate`.
- Phiên đăng nhập giữ trong sessionStorage (người lớn chọn “Ghi nhớ” mới dùng localStorage); mỗi tab học sinh một phiên ẩn danh. Kết quả làm bài đi qua hộp gửi trong localStorage (`ontap_cloud_outbox`), chỉ xóa khi máy chủ đã nhận.
- PIN mới ở bản đám mây: 6 số, không dễ đoán (`pinProblem`, giống nhau ở Edge Function và store-supabase.js). Bản cục bộ giữ 4–6 số.
- Đăng nhập: quản trị/phụ huynh bằng email (magic link hoặc mã số), gắn vào hồ sơ bằng mã mời; học sinh đăng nhập ẩn danh rồi Edge Function `student-login` kiểm tra mã gia đình + PIN và ghi `student_sessions`. PIN chỉ được băm trong Edge Function, bảng `student_pins` trình duyệt không đọc được.
- Quyền do RLS trong `supabase/schema.sql` quyết định (anon key là công khai). Đổi bảng hoặc chính sách thì chạy `sh tests/supabase/run.sh` và thêm kiểm tra vào `tests/supabase/rls-test.sql`. Không bao giờ đưa service_role key vào code phía trình duyệt.
- Ngân hàng có sẵn (data/banks.js) không lưu lên máy chủ; `seed_banks_seen` của family làm việc như `seedBanksSeen`. Tối đa 2000 kết quả mỗi học sinh và 60 kết quả mỗi 10 phút (trigger).
- CAPTCHA (Cloudflare Turnstile) tùy chọn: `turnstileSiteKey` trong `js/config.js`; `captcha()` trong store-supabase.js lấy mã cho `signInWithOtp`, `verifyOtp`, `signInAnonymously`. Không có khóa thì không tải script của Cloudflare.
- Chỉ email trong bảng `allowed_creators` mới tạo được gia đình mới; mỗi gia đình có hạn mức số hồ sơ, kì thi, ngân hàng đề.

## Quy ước code
- JavaScript thuần, ES2019+, không module/import (để mở được cả bằng file://). Mỗi file bọc trong IIFE, xuất ra `window.<Tên>`.
- Mọi chuỗi từ người dùng hoặc dữ liệu đi vào HTML phải qua `esc()`.
- Mọi đọc/ghi localStorage/sessionStorage bọc try/catch.
- Màu chỉ dùng token trong `:root` của `css/app.css`. Font: Baloo 2 (tiêu đề), Be Vietnam Pro (chữ).
- Ngày lưu dạng `"YYYY-MM-DD"`, hiển thị kiểu Việt Nam `2/11/2026`.
- Câu hỏi trắc nghiệm trong dữ liệu: đáp án đúng đứng đầu mảng, app tự xáo.

## Nội dung câu hỏi
- Câu hỏi phải đúng chương trình và đúng đáp án. Với Toán, tự tính lại mọi đáp án (chạy bằng code nếu cần) trước khi thêm.
- Không chép nguyên văn đề của sách, nhà xuất bản hay đề thi có bản quyền; tự soạn câu tương tự.
- Ngày thi lấy từ nguồn chính thức. Ngày chưa công bố thì để `tentative: true`.

## Chạy và kiểm tra
```bash
python3 -m http.server 8000      # rồi mở http://localhost:8000
```
Không mở bằng file:// khi thử bài ôn trong khung: một số trình duyệt chặn localStorage giữa các trang file://.

Kiểm thử tự động (bắt buộc trước mỗi Pull Request): `python3 -m http.server 8000 &` rồi `node tests/e2e.js` (cần `npm i -D playwright`). Script phải in `E2E OK`; ảnh chụp ở `tests/screenshots/` để xem giao diện.

Khi sửa `js/store-supabase.js`, `js/app.js` (phần đám mây), `supabase/`: chạy thêm `node tests/supabase/store-test.mjs` (in `SUPABASE STORE OK`), `node tests/supabase/cloud-e2e.js` (in `CLOUD E2E OK`, ảnh 360px sáng/tối ở `tests/screenshots/cloud/`), và nếu máy có PostgreSQL thì `sh tests/supabase/run.sh` (in `RLS OK`).

Ngoài ra chạy tay các luồng: thiết lập lần đầu → tạo phụ huynh, học sinh → đăng nhập học sinh bằng PIN → mở một bài ôn và làm xong một đề → làm một ngân hàng câu hỏi → đăng nhập phụ huynh xem hồ sơ con và báo cáo tuần → quản trị sửa một kì thi. Kiểm tra ở bề rộng 390px và chế độ tối.

## Triển khai
GitHub Pages: Settings → Pages → Deploy from a branch → `main` / root. File `.nojekyll` đã có.

## Việc tiếp theo (theo thứ tự ưu tiên)
**Trạng thái 16/10/2026: tạm dừng phát triển để chạy thử với học sinh.** Khi làm tiếp, ưu tiên sửa các GitHub Issue góp ý từ việc chạy thử trước mọi tính năng mới. Lộ trình đầy đủ và lời giao việc từng phiên: `docs/KE-HOACH-PHAT-TRIEN-ONUP.md`. Tóm tắt:
1. Sửa lỗi từ góp ý chạy thử (GitHub Issues).
2. Đề cuối kì I còn thiếu: Tin học và Công nghệ lớp 4 (lớp 6 đã đủ các môn từ Phiên 10).
3. IOE cấp tỉnh lớp 4 (báo cáo tuần cho phụ huynh đã có từ Phiên 12).
4. Đề giữa kì II và cuối năm cho cả hai khối.
5. Đồng bộ đám mây đã có (Phiên 5, 5b) nhưng chưa bật: phụ huynh tự cài theo `docs/HUONG-DAN-SUPABASE.md`.
