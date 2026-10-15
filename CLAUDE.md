# CLAUDE.md — OnUp (Ôn Thi Lớp 4 và 6)

Hướng dẫn cho Claude (và người) khi làm việc trong repo này. Đọc hết file này trước khi sửa code.

## App này là gì

Web app ôn thi **cả năm học** cho học sinh **lớp 4 và lớp 6** (sách Kết nối tri thức, Tiếng Anh Global Success) và **phụ huynh** theo dõi con. Có ba vai trò: học sinh, phụ huynh, quản trị (thầy cô hoặc bố mẹ quản lý). Bản mô tả tính năng đầy đủ: `docs/TINH-NANG.md`.

Người dùng là trẻ 9–12 tuổi và phụ huynh, nên:
- Giao diện tiếng Việt, câu ngắn, xưng "con" với học sinh. Không thuật ngữ kỹ thuật trên màn hình.
- Ưu tiên điện thoại (rộng 360–420px), nút to, không cuộn ngang.
- Thu thập dữ liệu tối thiểu: tên hiển thị, khối, lớp. **Không** hỏi ngày sinh, số điện thoại, email, ảnh của trẻ.

## Kiến trúc

Trang tĩnh, **không có bước build**, chạy được trên GitHub Pages. Không thêm framework hay bundler nếu chưa được yêu cầu.

```
index.html              khung app, nạp các file theo thứ tự: data → store → quiz → app
css/app.css             toàn bộ giao diện app chính (token màu ở :root, có chế độ tối)
js/store.js             kho dữ liệu (LocalStore, localStorage khóa "ontap_db_v1"). Mọi màn hình chỉ gọi Store.*
js/app.js               định tuyến hash + tất cả màn hình (đăng nhập, trang chủ theo vai trò, lịch, quản trị)
js/quiz.js              bộ làm bài chung cho ngân hàng câu hỏi + bộ đọc cú pháp nhập câu hỏi
js/bridge.js            nạp bên trong mỗi bài ôn: tách dữ liệu theo học sinh, gửi điểm về app
data/calendar-2026-2027.js  lịch thi mặc định (window.ONTAP_SEED_EVENTS)
data/modules.js         danh mục bài ôn dạng trang riêng (window.ONTAP_MODULES)
data/banks.js           ngân hàng câu hỏi mẫu (window.ONTAP_SEED_BANKS)
modules/<mã>/index.html bài ôn độc lập, mỗi bài là một file HTML tự chứa (từ 4 artifact gốc)
supabase/schema.sql     lược đồ cơ sở dữ liệu cho giai đoạn 2 (chưa dùng)
```

### Hai loại nội dung ôn
1. **Bài ôn dạng trang** (`modules/`): ioe-4, ioe-6, l4-giua-ki-1, l6-giua-ki-1. Mỗi bài có bộ câu hỏi, sinh câu Toán ngẫu nhiên, đề có giờ, ôn câu sai riêng. App mở trong `<iframe>` với `?u=<mã học sinh>&m=<mã bài>`.
2. **Ngân hàng câu hỏi** (`data/banks.js` + do quản trị viên nhập): chạy bằng `js/quiz.js` ngay trong app. Đây là cách thêm đề cho các kì thi mới (cuối kì, giữa kì II…) mà không phải viết trang mới.

### Hợp đồng giữa bài ôn và app (không được phá)
Mỗi file `modules/*/index.html` có đúng ba chỗ sửa so với artifact gốc:
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

Khi thêm trường mới: thêm giá trị mặc định khi đọc dữ liệu cũ, vì người dùng đã có dữ liệu trên máy. Nếu đổi cấu trúc không tương thích, tăng `SCHEMA_VERSION` và viết hàm chuyển đổi trong `load()`.

Mã PIN ở chế độ cục bộ chỉ để phân biệt người trong nhà/lớp, **không phải bảo mật thật**. Đừng mô tả nó là an toàn trên giao diện.

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

Ngoài ra chạy tay các luồng: thiết lập lần đầu → tạo phụ huynh, học sinh → đăng nhập học sinh bằng PIN → mở một bài ôn và làm xong một đề → làm một ngân hàng câu hỏi → đăng nhập phụ huynh xem hồ sơ con → quản trị sửa một kì thi. Kiểm tra ở bề rộng 390px và chế độ tối.

## Triển khai
GitHub Pages: Settings → Pages → Deploy from a branch → `main` / root. File `.nojekyll` đã có.

## Việc tiếp theo (theo thứ tự ưu tiên)
Xem mục 7 của `docs/TINH-NANG.md` và danh sách phiên làm việc trong `docs/KE-HOACH-CREDIT.md`. Tóm tắt:
1. Bổ sung ngân hàng câu hỏi cho cuối kì I (lớp 4, lớp 6) — kì thi gần nhất sau giữa kì I.
2. Đồng bộ đám mây bằng Supabase (`supabase/schema.sql`): viết `SupabaseStore` cùng giao diện với `Store`, đăng nhập phụ huynh bằng email, học sinh bằng mã lớp + PIN.
3. Bài ôn giữa kì II và cuối năm cho cả hai khối.
