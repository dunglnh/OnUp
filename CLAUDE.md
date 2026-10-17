# CLAUDE.md — OnUp - Ôn Luyện Mỗi Ngày (lớp 4 và 6)

Hướng dẫn cho Claude (và người) khi làm việc trong repo này. Đọc hết file này trước khi sửa code.

## App này là gì

Web app ôn thi **cả năm học** cho học sinh **lớp 4 và lớp 6** (sách Kết nối tri thức, Tiếng Anh Global Success) và **phụ huynh** theo dõi con. Có ba vai trò: học sinh, phụ huynh, quản trị (thầy cô hoặc bố mẹ quản lý). Bản mô tả tính năng đầy đủ: `docs/TINH-NANG.md`.

Người dùng là trẻ 9–12 tuổi và phụ huynh, nên:
- Giao diện tiếng Việt, câu ngắn. Gọi người đang dùng app là "bạn" (cả học sinh, phụ huynh, quản trị); chỉ dùng "con" khi nói với phụ huynh về con của họ ("hồ sơ của con"). Không thuật ngữ kỹ thuật trên màn hình.
- Ưu tiên điện thoại (rộng 360–420px), không cuộn ngang, vùng bấm cao ≥ 44px, chữ ≥ 13px (`tests/e2e.js` kiểm tra ở 360px).
- Thu thập dữ liệu tối thiểu: tên hiển thị, khối, lớp. **Không** hỏi ngày sinh, số điện thoại, email, ảnh của trẻ.

## Kiến trúc

Trang tĩnh, **không có bước build**, chạy được trên GitHub Pages. Không thêm framework hay bundler nếu chưa được yêu cầu.

```
index.html              khung app, nạp các file theo thứ tự: data → config → store → store-supabase → quiz → app
css/app.css             toàn bộ giao diện app chính (token màu ở :root, có chế độ tối)
fonts/                  font tự lưu (Baloo 2, Be Vietnam Pro, woff2 từ @fontsource), fonts.css dùng chung cho app và bài ôn; giấy phép OFL.txt
sw.js                   service worker: đệm sẵn file của app để mở lại được khi mất mạng (xem "Chạy khi mất mạng")
manifest.webmanifest    tên, màu, biểu tượng khi thêm vào Màn hình chính; icons/ (icon.svg là bản gốc, PNG vẽ lại từ đó)
js/config.js            cấu hình Supabase (và dòng liên hệ “Quên mật khẩu?”). ĐỂ TRỐNG (mặc định) = dùng LocalStore, không tải gì từ mạng
js/store.js             kho dữ liệu (LocalStore, localStorage khóa "ontap_db_v1"). Mọi màn hình chỉ gọi Store.*
js/store-supabase.js    SupabaseStore: cùng các hàm với LocalStore, chỉ bật khi js/config.js có URL + anon key
js/app.js               định tuyến hash + tất cả màn hình (đăng nhập, trang chủ theo vai trò, báo cáo tuần, lịch, quản trị)
js/quiz.js              bộ làm bài chung cho ngân hàng câu hỏi + bộ đọc cú pháp nhập câu hỏi
js/bridge.js            nạp bên trong mỗi bài ôn: tách dữ liệu theo học sinh, gửi điểm về app
data/grades.js          danh sách khối lớp 1–12 (window.ONTAP_GRADES), chỉ lớp 4 và 6 `active`. Không viết cứng [4, 6] ở đâu khác
data/calendar-2026-2027.js  lịch thi mặc định (window.ONTAP_SEED_EVENTS)
data/modules.js         danh mục bài ôn dạng trang riêng (window.ONTAP_MODULES)
data/banks.js           ngân hàng câu hỏi có sẵn (window.ONTAP_SEED_BANKS). Bỏ một bộ thì thêm mã vào RETIRED_SEED_BANKS ở cả hai kho
modules/<mã>/index.html bài ôn độc lập, mỗi bài là một file HTML tự chứa (từ 4 artifact gốc)
supabase/schema.sql     bảng, chính sách RLS, trigger, hàm RPC cho bản đám mây (tài khoản = gia đình, hồ sơ con, gói)
supabase/functions/admin/index.ts  Edge Function của chủ app: tạo, đặt lại mật khẩu, đổi gói, khóa, xóa, liệt kê tài khoản
supabase/banks-to-sql.js  chuyển đề trong data/banks.js thành SQL chèn vào bảng paid_banks (chưa dùng, để dành khi bán gói)
tests/supabase/         kiểm thử bản đám mây: RLS trên PostgreSQL, Edge Function trên máy chủ giả, giao diện
docs/HUONG-DAN-SUPABASE.md  hướng dẫn chủ app cài Supabase từng bước
```

### Hai loại nội dung ôn
1. **Bài ôn dạng trang** (`modules/`): ioe-4, ioe-6, l4-giua-ki-1, l6-giua-ki-1. Mỗi bài có bộ câu hỏi, sinh câu Toán ngẫu nhiên, đề có giờ, ôn câu sai riêng. App mở trong `<iframe>` với `?u=<mã học sinh>&m=<mã bài>`.
2. **Ngân hàng câu hỏi** (`data/banks.js` + do quản trị viên nhập): chạy bằng `js/quiz.js` ngay trong app. Đây là cách thêm đề cho các kì thi mới (cuối kì, giữa kì II…) mà không phải viết trang mới.

### Hợp đồng giữa bài ôn và app (không được phá)
Mỗi file `modules/*/index.html` có ba chỗ nối với app so với artifact gốc (ngoài ra chỉ sửa lời: xưng “bạn” với học sinh, và thay Google Fonts bằng `<link rel="stylesheet" href="../../fonts/fonts.css">`):
- `<script src="../../js/bridge.js"></script>` ngay trước thẻ `<script>` chính.
- `const PFX=(window.ONTAP_NS||"")+...` — khóa localStorage có tiền tố theo học sinh.
- Sau dòng lưu lịch sử trong `finish()`: `window.ontapReport&&ontapReport({label,mode,subject,r,t,s})`.
  `subject` là mã môn (`toan`, `tv`, `van`, `khtn`, `ta`) và phải có trong `subjects` của bài đó ở `data/modules.js`.

App chỉ nhận tin nhắn khi `event.source` là đúng iframe đang mở và cùng origin, và chỉ lưu điểm khi người đang đăng nhập là học sinh.

App còn **đọc** (không ghi) DOM của khung để biết học sinh đang làm dở (chốt rời trang, `renderPlay` trong js/app.js): đang làm một lượt thì trang bài ôn có nút `#endBtn` (“Nộp bài sớm”, “Dừng luyện”, “Finish test now”…) hoặc hộp hỏi lại `#yesEnd` của nút đó; trang đầu và trang kết quả không có. Bài ôn mới phải theo đúng như vậy. Không có thì app không hỏi lại khi rời bài, nhưng bài vẫn chạy.

**Thêm bài ôn dạng trang mới:** tạo `modules/<mã>/index.html`, làm ba chỗ sửa trên, dùng font qua `../../fonts/fonts.css`, khai báo trong `data/modules.js`, gắn mã vào `modules` của các kì thi trong `data/calendar-2026-2027.js`, rồi thêm file vào `FILES` trong `sw.js` và tăng `VERSION`.

### Chạy khi mất mạng (sw.js, manifest.webmanifest)
- `js/app.js` đăng kí `sw.js` sau khi trang tải xong (bọc try/catch; bỏ qua khi mở bằng file://; trình duyệt chỉ cho chạy trên https hoặc localhost).
- Khi cài, `sw.js` tải sẵn mọi file trong `FILES` vào đệm tên `VERSION`; khi kích hoạt thì xóa đệm cũ có tiền tố `onup-` (GitHub Pages: các repo của một tài khoản chung origin, không đụng đệm của trang khác).
- HTML, JS, CSS, `data/`, manifest: **mạng trước** (bản mới lên Pages là có ngay), mất mạng hoặc chậm quá 4 giây thì dùng bản trong đệm. Font, biểu tượng (`fonts/`, `icons/`): **đệm trước**. Khóa trong đệm bỏ phần `?…` (bài ôn mở bằng `?u=…&m=…`).
- Chỉ xử lí GET cùng origin trong phạm vi app. **Không** đệm request tới Supabase, Cloudflare, CDN; đừng thêm host ngoài vào `sw.js`.
- **Tăng `VERSION`** khi thêm, bớt, đổi tên file trong `FILES`, hoặc đổi nội dung font, biểu tượng (đệm trước nên không tự cập nhật). Sửa nội dung HTML/JS/CSS/data thì không cần. `tests/e2e.js` so `FILES` với các file có trong `css/ js/ data/ modules/ fonts/ icons/`.
- Màu trong `manifest.webmanifest` (`background_color` = `--bg`, `theme_color` = `--sun`) và `<meta name="theme-color">` trong `index.html` (`--bg` sáng, tối) chép từ token; đổi token thì sửa cả ở đó.

### Chốt rời trang, khóa PIN (js/app.js)
- Màn hình có bài đang làm dở đặt biến `guard` (xem chú thích "chốt rời trang"): mọi cách rời màn hình (link, `go()`, nút Back, tải lại) đều hỏi lại trước. Hiện có ở đề ngân hàng và bài ôn trong khung, chỉ với học sinh. Đề ngân hàng chưa trả lời câu nào thì hỏi “Thoát đề?” và không lưu điểm; bài ôn trong khung chỉ hỏi khi trong khung có `#endBtn`/`#yesEnd`. Màn hình mới có việc làm dở thì đặt `guard` trong hàm vẽ màn hình; `route()` tự bỏ. Chuyển màn hình luôn đi qua `go()` hoặc link `#/…`, không gọi `route()` trực tiếp khi đang làm bài.
- `PinLock`: sai PIN 5 lần thì phải đợi (30 giây, 1 phút, 5 phút, rồi 15 phút), lưu theo mã người dùng ở localStorage khóa `ontap_pinlock_v1`. Chỉ làm đoán mò tốn thời gian, không phải bảo mật thật.
- Bàn phím PIN (`wirePinBox`) tự kiểm tra khi gõ đủ `pinLen` số. Tài khoản cũ chưa có `pinLen` thì đủ 4 số thử lặng lẽ (sai không báo, không tính; tối đa 5 lượt mỗi người, `PinLock.probe`), rồi chờ đủ 6 số hoặc bấm Vào.
- Chú thích lịch thi cuối trang (`.foot`) chỉ hiện ở trang chủ và Lịch thi (`route()`). Bài ôn trong khung đặt class `playing` trên `body`: trang cao đúng một màn hình, chỉ cuộn trong khung.

### Kho dữ liệu
`Store` (js/store.js) là ranh giới duy nhất với dữ liệu. Cấu trúc:
- `users`: `{id, role, name, avatar, salt, pinHash, pinLen, grade?, className?, parentIds?}` — quan hệ phụ huynh–con lưu ở `parentIds` của học sinh. `pinLen`: độ dài PIN (4–6); dữ liệu cũ đọc vào là 0 (chưa biết), đăng nhập đúng thì ghi lại.
- `events`: kì thi, xem chú thích đầu `data/calendar-2026-2027.js`. **Không đổi `id`** của kì thi đã có.
- `banks`: ngân hàng do quản trị viên nhập (giữ cả văn bản gốc ở `src` để sửa lại).
- `results`: `{userId, source:"module"|"bank", refId, subject, label, mode, r, t, s, at, wrongTopics?}`.
- `settings`: `{schoolName, schoolYear, createdAt, lastBackupAt}`. `lastBackupAt`: lần tải file sao lưu gần nhất (ISO), dữ liệu cũ là `null`. Trang chủ quản trị và phụ huynh hiện thẻ nhắc sao lưu khi quá 7 ngày, hoặc chưa sao lưu lần nào mà đã có kết quả (`backupDue` trong js/app.js; bản đám mây không nhắc).
- `seedBanksSeen`: mã các ngân hàng có sẵn (data/banks.js) máy này đã xét. Khi thêm bộ mới vào data/banks.js và gắn vào `banks` của một kì thi trong lịch mặc định, `load()` tự gắn bộ đó vào kì thi trên máy đã có dữ liệu; bộ quản trị viên đã bỏ gắn thì không gắn lại.

Khối lớp: `data/grades.js` là chỗ duy nhất. Hồ sơ học sinh mới chỉ chọn được khối `active` (sửa hồ sơ thì giữ được khối đang có); form kì thi, ngân hàng đề, tab khối ở Lịch thi, “Kì thi tiếp theo” ở trang quản trị đọc danh sách này (`gradeList()` trong js/app.js). Thêm lớp mới: thêm nội dung rồi đổi `active` thành `true`.

`Store.can(feature)` (cả hai kho): chỗ duy nhất hỏi quyền theo gói (`"addChild"`, `"bank:<mã>"`…). Bản lưu trên máy luôn trả `true`; bản đám mây hôm nay chỉ giới hạn `"addChild"` theo `max_children` của gói. Sau này bật gói trả phí chỉ sửa hàm này và bảng `plans`.

Khi thêm trường mới: thêm giá trị mặc định khi đọc dữ liệu cũ, vì người dùng đã có dữ liệu trên máy. Nếu đổi cấu trúc không tương thích, tăng `SCHEMA_VERSION` và viết hàm chuyển đổi trong `load()`.

Mã PIN ở chế độ cục bộ chỉ để phân biệt người trong nhà/lớp, **không phải bảo mật thật**. Đừng mô tả nó là an toàn trên giao diện.

### Bản đám mây (SupabaseStore)
Bật khi `js/config.js` có `supabaseUrl` + `supabaseAnonKey`; khi đó `window.Store` là SupabaseStore (`Store.cloud === true`), LocalStore còn ở `window.LocalStore` để đọc dữ liệu cũ khi chuyển lên. Hướng dẫn cài: `docs/HUONG-DAN-SUPABASE.md`. Thiết kế: `docs/THIET-KE-TAI-KHOAN.md`.

Từ 17/10/2026 `js/config.js` trên `main` đã điền URL và khóa công khai của project Supabase thật (PR #27): trang trên GitHub Pages chạy bản đám mây. Trang admin của chủ app (`admin.html`) làm ở Phiên C; trước đó chủ app tạo tài khoản gia đình bằng tay (bước 6 của hướng dẫn) hoặc gọi Edge Function `admin`.

Máy chủ (`supabase/schema.sql`, Edge Function `admin`):
- Một tài khoản = một gia đình (`families`), do phụ huynh giữ; đăng nhập bằng tên đăng nhập + mật khẩu. Supabase Auth lưu tên đăng nhập dạng email nội bộ `<tên>@users.onup.invalid` (không gửi thư). Con là hồ sơ (`profiles`, khối 1–12) trong tài khoản, dùng phiên của bố mẹ; `pin_hash` chỉ là khóa trên giao diện, app tự băm.
- Chủ app: người dùng trong `app_owners`. Mọi thao tác quản lý tài khoản đi qua Edge Function `admin` (khóa bí mật, tự kiểm tra owner, ghi `admin_log`; đổi gói ghi thêm `plan_log`). Chủ app đọc `families`, `admin_notes`, nhật ký; không đọc hồ sơ con, kết quả.
- Phụ huynh: đọc/ghi hồ sơ con, kết quả, lịch thi, ngân hàng tự nhập của gia đình mình; chỉ sửa `display_name, school_year, seed_banks_seen` của `families`. RPC: `touch()` (lần dùng gần nhất, tính lại hồ sơ bị khóa), `password_changed()` (bỏ cờ `must_change_password` sau khi `auth.updateUser`), `import_local(data)` (chuyển dữ liệu LocalStore: chỉ học sinh thành hồ sơ con), `plan_active(family_id)`.
- Tài khoản `status = 'locked'`: chỉ đọc được dòng `families` của mình; Edge Function còn cấm đăng nhập (ban) trong Supabase Auth.
- Gói: bảng `plans` (`max_children`, `all_banks`). Hôm nay `free` = 5 hồ sơ, mọi đề. Gói trả phí còn hạn khi `plan <> 'free'` và `plan_until >= hôm nay` (giờ Việt Nam); hết hạn thì về hạn mức `free`, hồ sơ vượt hạn mức có `locked = true` (không ghi kết quả mới). Trigger chặn thêm hồ sơ quá hạn mức. `paid_banks` đọc được khi đề đã đăng và (đề thử hoặc gói cho đọc mọi đề); hiện app vẫn đọc đề từ `data/banks.js`.
- Quyền do RLS và quyền theo cột (grant) quyết định (khóa anon là công khai). Đổi bảng hoặc chính sách thì chạy `sh tests/supabase/run.sh`, thêm kiểm tra vào `tests/supabase/rls-test.sql`, và sửa máy chủ giả `tests/supabase/fake-backend.js` cho khớp. Không bao giờ đưa khóa service_role/secret vào code phía trình duyệt.
- Tối đa 2000 kết quả mỗi hồ sơ và 60 kết quả mỗi 10 phút; 500 kì thi, 100 ngân hàng tự nhập mỗi tài khoản (trigger).

Phía trình duyệt (`js/store-supabase.js`, phần đám mây của `js/app.js`):
- Giao diện giống hệt LocalStore: hàm đọc đồng bộ (đọc từ bộ nhớ đệm tải lúc đăng nhập), `createUser`/`updateUser`/`checkPin` async. Hàm ghi cập nhật bộ nhớ đệm ngay rồi đẩy lên máy chủ theo hàng đợi; lỗi thì gọi `Store.onError` (app hiện toast) và tải lại dữ liệu thật. **Thêm hàm mới vào Store thì thêm ở cả hai kho**; `tests/supabase/store-test.mjs` so danh sách hàm.
- Hàm chỉ có ở bản đám mây: `init, refresh, flush, authState ("signed-out"|"change-password"|"locked"|"no-family"|"ready"), signIn(tên, mật khẩu, ghi nhớ), signOut, checkPassword, changePassword(mới, hiện tại?), parentUnlocked, rememberLogin, username, plan ({id, name, maxChildren, until}), localData, migrate, migratedAt`.
- Người dùng trong bộ nhớ đệm: một người dùng ảo `Phụ huynh` (mã `phu-huynh`, vai trò `admin` của app, nên dùng chung các màn hình quản trị, trên giao diện gọi là “Khu phụ huynh”; `Store.ROLES.admin` = “Phụ huynh”) và mỗi hồ sơ con là một học sinh (`parentIds: ["phu-huynh"]`, thêm `hasPin`, `locked`). Bản đám mây chỉ thêm, sửa, xóa hồ sơ con; tài khoản của bố mẹ do chủ app quản lý.
- Luồng (js/app.js `route()`): chưa đăng nhập → `renderCloudLogin` (tên đăng nhập + mật khẩu + “Ghi nhớ trên máy này” + dòng “Quên mật khẩu?” từ `contactText`, `contactUrl` của js/config.js); mật khẩu tạm → `renderNewPassword` (bắt đổi); bị khóa hoặc không có gia đình (ví dụ tài khoản chủ app) → `renderCloudBlocked`; đã đăng nhập mà tab chưa chọn ai → `renderLogin` thành màn hình “Ai đang học?”. Hồ sơ con có PIN thì nhập PIN, không có thì bấm là vào; Phụ huynh phải nhập lại mật khẩu (`checkPassword`, sai cũng tính vào `PinLock`), vừa nhập mật khẩu trong 5 phút thì không hỏi lại (`parentUnlocked`; `setSession` của Phụ huynh cũng kiểm tra). Tài khoản chưa có hồ sơ con và vừa đăng nhập thì vào thẳng khu phụ huynh. “Đổi người học” (`setSession(null)`) về “Ai đang học?” mà không đăng xuất; chỉ Phụ huynh đăng xuất được (trang Tài khoản, kèm đổi mật khẩu).
- Hồ sơ đang dùng giữ trong sessionStorage (`ontap_cloud_who`), hồ sơ con chọn gần nhất ở localStorage (`ontap_cloud_last`). Phiên Supabase giữ trong sessionStorage, chọn “Ghi nhớ” thì localStorage (`ontap_sb_auth`). Phiên bị máy chủ từ chối (hết hạn, chủ app đặt lại mật khẩu) thì tự đăng xuất trên máy.
- PIN hồ sơ con: 4 số, không bắt buộc, băm trên máy như `hashPin` của js/store.js, lưu `pin_hash = "<muối>$<mã băm>"`; muối bắt đầu bằng `<độ dài>.` để bàn phím tự vào khi gõ đủ. PIN chuyển từ máy cũ (`import_local`, 4–6 số, chưa biết độ dài) nhập đúng một lần thì được băm lại kèm độ dài.
- Tài khoản mới (Edge Function chỉ tạo dòng `families`) chưa có kì thi nào: lần mở đầu app chép lịch mặc định lên máy chủ. Ngân hàng có sẵn (data/banks.js) không lưu lên máy chủ; `seed_banks_seen` của family làm việc như `seedBanksSeen`.
- Kết quả làm bài đi qua hộp gửi trong localStorage (`ontap_cloud_outbox`, theo mã hồ sơ), chỉ xóa khi máy chủ đã nhận; gửi kết quả của mọi hồ sơ con của tài khoản đang đăng nhập (máy dùng chung cho anh em), để lại kết quả của tài khoản khác.
- CAPTCHA (Cloudflare Turnstile) tùy chọn: `turnstileSiteKey` trong `js/config.js`; `captcha()` trong store-supabase.js lấy mã cho `signIn` và `checkPassword`. Không có khóa thì không tải script của Cloudflare.

## Quy ước code
- JavaScript thuần, ES2019+, không module/import (để mở được cả bằng file://). Mỗi file bọc trong IIFE, xuất ra `window.<Tên>`.
- Mọi chuỗi từ người dùng hoặc dữ liệu đi vào HTML phải qua `esc()`.
- Mọi đọc/ghi localStorage/sessionStorage bọc try/catch.
- Màu chỉ dùng token trong `:root` của `css/app.css`. Font: Baloo 2 (tiêu đề), Be Vietnam Pro (chữ), tự lưu trong `fonts/`. Bản lưu trên máy không tải gì từ host khác (không Google Fonts, không CDN); `tests/e2e.js` kiểm tra.
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

Kiểm thử tự động (bắt buộc trước mỗi Pull Request): `python3 -m http.server 8000 &` rồi `node tests/e2e.js` (cần `npm i -D playwright`). Script luôn chạy bản lưu trên máy (trả về `js/config.js` đã xóa `supabaseUrl`, `supabaseAnonKey` dù file thật đã điền) và phải in `E2E OK`; ảnh chụp ở `tests/screenshots/` để xem giao diện, ảnh 360px sáng/tối của đăng nhập, trang chủ học sinh, bài ôn trong khung, quản trị, tab Dữ liệu ở `tests/screenshots/360/`. Script có bước mất mạng: tải trang một lần, tắt mạng, tải lại vẫn đăng nhập và làm bài được. Hai script Playwright đặt `PW_EXPERIMENTAL_SERVICE_WORKER_NETWORK_EVENTS=1` để route và chế độ offline áp dụng cả cho service worker.

Thử tay sau khi sửa code: service worker dùng mạng trước nên tải lại trang là thấy bản mới. Sửa `sw.js` thì trình duyệt cài bản mới ở lần tải sau (DevTools → Application → Service workers để xem, gỡ).

Khi sửa `js/store-supabase.js`, `js/app.js` (phần đám mây), `supabase/`: chạy thêm `node tests/supabase/admin-test.mjs` (Edge Function admin và máy chủ giả, in `ADMIN OK`), `node tests/supabase/store-test.mjs` (in `SUPABASE STORE OK`), `node tests/supabase/cloud-e2e.js` (in `CLOUD E2E OK`, ảnh 360px sáng/tối ở `tests/screenshots/cloud/`), và nếu máy có PostgreSQL thì `sh tests/supabase/run.sh` (in `RLS OK`). store-test.mjs và cloud-e2e.js chạy với Edge Function admin thật (chủ app tạo tài khoản) trên máy chủ giả; cloud-e2e.js kiểm tra 360px như tests/e2e.js, ảnh ghép sáng/tối `<tên>.jpg` cùng thư mục, các màn hình chính chép vào `docs/hinh-dam-may/`.

Ngoài ra chạy tay các luồng: thiết lập lần đầu → tạo phụ huynh, học sinh → đăng nhập học sinh bằng PIN → mở một bài ôn và làm xong một đề → làm một ngân hàng câu hỏi → đăng nhập phụ huynh xem hồ sơ con và báo cáo tuần → quản trị sửa một kì thi. Kiểm tra ở bề rộng 390px và chế độ tối. Bản đám mây: đăng nhập bằng mật khẩu tạm → đặt mật khẩu mới → thêm hồ sơ con → “Ai đang học?” → con làm một đề → Phụ huynh nhập lại mật khẩu, xem báo cáo tuần.

## Triển khai
GitHub Pages: Settings → Pages → Deploy from a branch → `main` / root. File `.nojekyll` đã có.

## Việc tiếp theo (theo thứ tự ưu tiên)
**Trạng thái 16/10/2026: đang chạy thử với học sinh.** Ưu tiên: sửa các GitHub Issue góp ý từ việc chạy thử, rồi dựng **khung tài khoản: tên đăng nhập + mật khẩu, hồ sơ con, trang admin, khối lớp 1–12 dùng chung** theo `docs/THIET-KE-TAI-KHOAN.md` (Phiên A → B → C). **Chưa làm bản trả phí** (chỉ tính khi có đủ đề lớp 4–12); khung chừa sẵn `plan` và `Store.can()`. Thiết kế đó **thay thế** cách đăng nhập email, mã mời, mã gia đình + PIN của bản đám mây cũ. **Phiên A (máy chủ) và Phiên B (app: đăng nhập, “Ai đang học?”, khu phụ huynh, `data/grades.js`, `Store.can`) đã làm**; tiếp theo là Phiên C (trang admin). Lộ trình đầy đủ và lời giao việc từng phiên: `docs/KE-HOACH-PHAT-TRIEN-ONUP.md`. Tóm tắt:
1. Sửa lỗi cơ bản tìm được khi dùng thử (`docs/SUA-LOI-CHAY-THU.md`: Phiên 9a, 9b, 9c đã làm; Phiên 9d, lỗi phát sinh khi rà soát lại 17/10, chưa làm) và lỗi từ góp ý chạy thử (GitHub Issues).
2. Đề cuối kì I: đã đủ các môn cho cả lớp 4 và lớp 6 (Phiên 10, 11).
3. Báo cáo tuần cho phụ huynh (Phiên 12) và IOE cấp tỉnh lớp 4 (Phiên 13): đã có.
4. Đề giữa kì II lớp 4: đã có (Phiên 14). Còn đề giữa kì II lớp 6 và đề cuối năm cho cả hai khối.
5. Bản đám mây theo thiết kế tài khoản mới: máy chủ (Phiên A) và app (Phiên B) đã có, chưa bật; còn trang admin (Phiên C). Chủ app cài theo `docs/HUONG-DAN-SUPABASE.md`.
