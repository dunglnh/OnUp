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
admin.html              trang admin của chủ app (chỉ bản đám mây): tài khoản gia đình, ghi chú, nhật ký; script nằm trong file
css/app.css             toàn bộ giao diện app chính (token màu ở :root, có chế độ tối)
fonts/                  font tự lưu (Baloo 2, Be Vietnam Pro, woff2 từ @fontsource), fonts.css dùng chung cho app và bài ôn; giấy phép OFL.txt
sw.js                   service worker: đệm sẵn file của app để mở lại được khi mất mạng (xem "Chạy khi mất mạng")
manifest.webmanifest    tên, màu, biểu tượng khi thêm vào Màn hình chính; icons/ (icon.svg là bản gốc, PNG vẽ lại từ đó)
js/config.js            cấu hình Supabase (URL, khóa công khai, dòng liên hệ “Quên mật khẩu?” `contactText`, `contactUrl`; thẻ “Chưa có tài khoản?” `signupText`, `signupUrl`, để trống thì dùng hai khóa contact). Trên `main` ĐÃ ĐIỀN (PR #27, 17/10/2026): trang trên GitHub Pages chạy bản đám mây. Để trống hai giá trị đầu = dùng LocalStore, không tải gì từ mạng (tests/e2e.js tự chạy với bản đã xóa)
js/store.js             kho dữ liệu (LocalStore, localStorage khóa "ontap_db_v1"). Mọi màn hình chỉ gọi Store.*
js/store-supabase.js    SupabaseStore: cùng các hàm với LocalStore, chỉ bật khi js/config.js có URL + anon key
js/app.js               định tuyến hash + tất cả màn hình (đăng nhập, trang chủ theo vai trò, báo cáo tuần, lịch, quản trị)
js/quiz.js              bộ làm bài chung cho ngân hàng câu hỏi (mọi dạng câu, đoạn đọc chung, bộ lọc hình SVG Quiz.svg) + bộ đọc cú pháp nhập câu hỏi (Quiz.parse) + bộ rút đề theo ma trận (Quiz.draw, mã câu Quiz.key)
js/bridge.js            nạp bên trong mỗi bài ôn: tách dữ liệu theo học sinh, gửi điểm về app
data/grades.js          danh sách khối lớp 1–12 (window.ONTAP_GRADES), chỉ lớp 4 và 6 `active`. Không viết cứng [4, 6] ở đâu khác
data/calendar-2026-2027.js  lịch thi mặc định (window.ONTAP_SEED_EVENTS)
data/modules.js         danh mục bài ôn dạng trang riêng (window.ONTAP_MODULES)
data/banks/index.js     danh mục đề có sẵn (window.ONTAP_SEED_BANKS: mã, tên, khối, môn, số phút, số câu, file; đề ngẫu nhiên có thêm `pool`), nạp lúc mở app. Bỏ một bộ thì thêm mã vào RETIRED_SEED_BANKS ở cả hai kho
data/banks/<khối>-<mã môn>.js  câu hỏi các đề của một khối, một môn (window.ONTAP_SEED_QUESTIONS), chỉ tải khi mở đề
modules/<mã>/index.html bài ôn độc lập, mỗi bài là một file HTML tự chứa (từ 4 artifact gốc)
supabase/schema.sql     bảng, chính sách RLS, trigger, hàm RPC cho bản đám mây (tài khoản = gia đình, hồ sơ con, gói)
supabase/cap-nhat-k2.sql  cập nhật project đã cài trước Phiên K2 (results.r số lẻ, cột passages), chủ app chạy một lần
supabase/cap-nhat-r1.sql  cập nhật project đã cài trước Phiên R1 (bảng question_reports: câu bị báo sai), chủ app chạy một lần
supabase/functions/admin/index.ts  Edge Function của chủ app: tạo, đặt lại mật khẩu, đổi gói, khóa, xóa, liệt kê tài khoản
supabase/banks-to-sql.js  chuyển đề trong data/banks/ thành SQL chèn vào bảng paid_banks (chưa dùng, để dành khi bán gói)
tests/kiem-tra-de.js    bộ kiểm tra đề có sẵn (node, không cần trình duyệt); tests/nap-de.js nạp đề trong node cho các script khác
tests/supabase/         kiểm thử bản đám mây: RLS trên PostgreSQL, Edge Function trên máy chủ giả, giao diện
docs/HUONG-DAN-SUPABASE.md  hướng dẫn chủ app cài Supabase từng bước
```

### Hai loại nội dung ôn
1. **Bài ôn dạng trang** (`modules/`): ioe-4, ioe-6, l4-giua-ki-1, l6-giua-ki-1. Mỗi bài có bộ câu hỏi, sinh câu Toán ngẫu nhiên, đề có giờ, ôn câu sai riêng. App mở trong `<iframe>` với `?u=<mã học sinh>&m=<mã bài>`.
2. **Ngân hàng câu hỏi** (đề có sẵn trong `data/banks/` + do quản trị viên nhập): chạy bằng `js/quiz.js` ngay trong app. Đây là cách thêm đề cho các kì thi mới (cuối kì, giữa kì II…) mà không phải viết trang mới.

### Đề có sẵn (data/banks/)
- Dạng câu, trường của từng dạng, đoạn đọc (`passages`), hình (`svg`), mức độ (`lv`): ghi ở đầu `data/banks/index.js`. Đề mẫu đủ các dạng: `thunghiem6-dang-cau-moi` (`data/banks/6-thunghiem.js`, không gắn kì thi).
- `data/banks/index.js` là danh mục, nạp lúc mở app: trang chủ, lịch thi, nhóm bài ôn, tab Ngân hàng đề chỉ cần tên, khối, môn và số câu `n` (`qCount` trong js/app.js). Câu hỏi nằm ở `data/banks/<khối>-<mã môn>.js` (ví dụ `4-toan.js`; mã môn ghi ở đầu index.js), mỗi file ghi `"<mã đề>": { note, questions }` vào `window.ONTAP_SEED_QUESTIONS`.
- App chỉ tải file câu hỏi khi mở đề: `renderQuiz` (qua `loadQuiz`) gọi `Store.loadBank(id)` (Promise, cả hai kho; bản đám mây dùng hàm của LocalStore). Tải xong thì `Store.bank(id)` có `note`, `questions`; mỗi file tải một lần. Màn hình mới cần câu hỏi của đề có sẵn thì gọi `Store.loadBank` trước, không đọc `questions` từ `Store.banks()`.
- Mã đề, `seedBanksSeen`, `RETIRED_SEED_BANKS`, kết quả cũ (`refId`) giữ nguyên như khi còn một file `data/banks.js`.
- **Đề ngẫu nhiên** (Phiên K3): mục danh mục có thêm `pool: { from, matrix }` (cách viết ở đầu `data/banks/index.js`), tên `<môn> <khối> · <kì> · Đề ngẫu nhiên`. Kho câu = câu riêng của pool trong file (nếu có) + câu của các đề cố định trong `from` (cùng khối, môn, file); `Store.loadBank` (hàm `fillSeedFile` của LocalStore, cả hai kho) gộp kho sau khi tải file, mỗi câu chép ra kèm `src` là mã đề gốc, đề cố định không đổi. `n` là số câu rút mỗi lần (= tổng ma trận), `qCount` trả `n`. Mỗi lần mở đề, `renderQuiz` gọi `Quiz.draw(bank, hist)` rút câu theo ma trận, ưu tiên câu chưa làm hoặc hay sai; thiếu câu thì lấy bù (câu chưa ghi mức, mức gần nhất, chủ đề khác) và ghi chú ở màn đầu; nút “Làm đề khác” (`opts.redraw` của `Quiz.run`) rút bộ mới. Lịch sử từng câu của học sinh (`PoolHist`, localStorage `ontap_pool_v1`, theo `Quiz.key`) cộng với kết quả đã lưu (`poolHist`: đã làm đề cố định nào trong `from`, chủ đề trong `wrongTopics`) làm `hist`. Kết quả ghi `source: "bank"`, `refId` là mã pool, nên báo cáo tuần, “chủ đề hay sai”, độ sẵn sàng tính như đề thường (`weekTips` không liệt kê pool ở “bài ôn chưa làm”). Trang chủ: hàng môn có nút “Đề ngẫu nhiên” (`.rnd`) trước Đề 1, Đề 2… (`practiceList`, `bankLabels`). Pool chỉ có ở đề có sẵn, không lưu lên máy chủ; `supabase/banks-to-sql.js` bỏ qua pool.

**Thêm đề có sẵn:**
1. Thêm một dòng vào `data/banks/index.js`: `{ id, title, grade, subject, minutes, n, file }`. Mã mới, không trùng, không dùng lại mã trong `RETIRED_SEED_BANKS`; mã đã có thì không đổi. Tên dạng `<môn> <khối> · <kì> · Đề N` (chữ trên nút đề lấy từ tên, `bankLabels` trong js/app.js). `n` bằng số câu trong file.
2. Thêm `"<mã đề>": { note, questions }` (có đoạn đọc dùng chung: `{ note, passages, questions }`) vào `data/banks/<khối>-<mã môn>.js`. Môn chưa có file thì tạo file mới như các file đang có (cùng một mã môn cho mọi khối). File câu hỏi không vào `FILES` của `sw.js`, không phải tăng `VERSION`.
3. Gắn mã đề vào `banks` của kì thi trong `data/calendar-2026-2027.js` (máy đã có dữ liệu tự gắn qua `seedBanksSeen`).
4. Chạy `node tests/kiem-tra-de.js` (phải in `DE OK`), với Toán thì thêm script tính lại đáp án (như `tests/toan4-gk2.js`), rồi `tests/e2e.js`.
5. Đề cố định mới cùng môn, cùng kì với một đề ngẫu nhiên thì thêm mã vào `from` của pool đó và chỉnh `matrix` (tổng bằng `n`, chủ đề đúng chữ `topic`). Môn, kì chưa có pool: thêm một mục `pool` (bước 1 kèm `pool: { from, matrix }`; có câu riêng thì ghi `"<mã pool>": { note, questions }` vào file, không có thì không ghi), gắn vào kì thi như đề thường. Ngân hàng ~100 câu của các phiên N: câu riêng của pool + 1–2 đề cố định trong `from`.

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
- Mỗi lần mở trang (trang chính, bài ôn trong khung) dùng **một bộ file thống nhất**, không trộn bản cũ với bản mới. Trang HTML: **mạng trước** (bản mới lên Pages là có ngay), mất mạng hoặc chậm quá 4 giây thì dùng bản trong đệm; `sw.js` ghi lại trang lấy từ đâu theo `resultingClientId`. JS, CSS, `data/`, manifest của trang đó (`clientId`): trang từ đệm thì lấy từ đệm, trang từ mạng thì lấy từ mạng (chỉ dùng đệm khi mạng lỗi hẳn). Bản từ mạng chỉ vào đệm khi được dùng. Font, biểu tượng (`fonts/`, `icons/`): **đệm trước**. Khóa trong đệm bỏ phần `?…` (bài ôn mở bằng `?u=…&m=…`).
- Chỉ xử lí GET cùng origin trong phạm vi app. **Không** đệm request tới Supabase, Cloudflare, CDN; đừng thêm host ngoài vào `sw.js`. Trang `admin.html` không qua service worker (luôn cần mạng; `request.url` trong service worker giữ cả phần `#…`).
- File câu hỏi của đề có sẵn (`data/banks/<khối>-<mã môn>.js`) không nằm trong `FILES` (chỉ có danh mục `data/banks/index.js`): app tải khi mở đề, bản tải về được dùng thì vào đệm như các file khác, nên đề đã mở thì mở lại được khi mất mạng. Mất mạng mà chưa mở đề nào của file đó thì app báo “Chưa tải được đề này” và có nút Thử lại (`loadQuiz` trong js/app.js). Khi kích hoạt bản mới, `sw.js` chép các file câu hỏi đã có từ đệm cũ sang đệm mới (`keepBanks`) rồi mới xóa đệm cũ.
- **Tăng `VERSION`** khi thêm, bớt, đổi tên file trong `FILES`, hoặc đổi nội dung font, biểu tượng (đệm trước nên không tự cập nhật). Sửa nội dung HTML/JS/CSS/data, thêm file câu hỏi trong `data/banks/` thì không cần. `tests/e2e.js` so `FILES` với các file có trong `css/ js/ data/ modules/ fonts/ icons/` (trong `data/banks/` chỉ có `index.js`).
- Màu trong `manifest.webmanifest` (`background_color` = `--bg`, `theme_color` = `--sun`) và `<meta name="theme-color">` trong `index.html` (`--bg` sáng, tối) chép từ token; đổi token thì sửa cả ở đó.

### Báo câu sai (Phiên R1)
- `Quiz.run` có `opts.onReport(q, {reason, note}) → Promise` thì dưới lời giải khi ôn luyện (sau Kiểm tra, cả tự luận sau Xem gợi ý) và dưới từng câu ở màn kết quả (câu cần xem lại, tự luận tự chấm) có link nhỏ có lá cờ “Báo câu này sai” (`.rp-link`, cao ≥ 44px). Bấm thì hộp `.report-box` mở ngay bên dưới (kiểu `.confirm`, không phải hộp nổi): bốn lí do `Quiz.REASONS` (`wrong` Đáp án sai, `unclear` Câu hỏi khó hiểu, `typo` Lỗi chính tả, `other` Khác), ô ghi chú tối đa 200 kí tự, nút Gửi / Thôi; gửi xong hiện lời cảm ơn, link thành “Đã báo câu này”; `opts.reported(q)` → true thì link tắt sẵn. Làm như thi không có link trong lúc làm (không có lời giải).
- Nhận diện câu: mã đề + `Quiz.key(câu)` (K3); câu của đề ngẫu nhiên ghi mã đề gốc (`q.src`). Kèm bản chụp `Quiz.text(q)` (câu hỏi, các ô với ✓ ở đáp án đúng, đáp án hoặc gợi ý; tối đa 500 kí tự) để sửa đề xong vẫn biết câu nào. Ai cũng báo được, kể cả phụ huynh, quản trị đang xem thử (`renderQuiz` truyền `onReport`, `reported`).
- Kho: `Store.addReport({userId, bankId, qKey, qText, reason, note})` (async ở cả hai kho) và `Store.reports()` (mới nhất trước). Bản lưu trên máy: `db.reports` (dữ liệu cũ đọc vào là `[]`, giữ tối đa 200), Quản trị → Dữ liệu có danh sách và nút “Chép để gửi” (`reportText` trong js/app.js: văn bản gọn để dán vào Zalo). Bản đám mây: bảng `question_reports` (family_id, profile_id trống khi phụ huynh báo, bank_id, q_key, q_text, reason, note, status `new|fixed|rejected`, created_at; trigger điền family_id, chặn quá 30 báo cáo mỗi ngày mỗi gia đình; RLS: gia đình chỉ thêm và đọc của mình, owner đọc tất cả và chỉ đổi `status`); `addReport` chờ máy chủ trả lời (lỗi thì hộp hiện lời báo); máy chủ chưa chạy `supabase/cap-nhat-r1.sql` thì app vẫn chạy, chỉ báo “Máy chủ chưa cập nhật để nhận báo cáo” khi Gửi. Khu phụ huynh → Dữ liệu liệt kê câu đã báo kèm trạng thái.
- Trang admin: tab “Câu bị báo” (`#/reports`, `renderReports` trong admin.html, đọc thẳng bảng): gom theo câu (mã đề + mã câu), đếm số lần, mới nhất trước, lọc theo đề (tên từ `data/banks/index.js`, trang admin nạp thêm file này) và trạng thái (mặc định Mới), nút “Đã sửa” / “Bỏ qua” đổi `status` mọi lượt báo của câu đó, câu đã xử lí có “Mở lại”. Không ghi `admin_log`.

### Chốt rời trang, khóa PIN (js/app.js)
- Màn hình có bài đang làm dở đặt biến `guard` (xem chú thích "chốt rời trang"): mọi cách rời màn hình (link, `go()`, nút Back, tải lại) đều hỏi lại trước. Hiện có ở đề ngân hàng và bài ôn trong khung, chỉ với học sinh. Đề ngân hàng chưa trả lời câu nào thì hỏi “Thoát đề?” và không lưu điểm; bài ôn trong khung chỉ hỏi khi trong khung có `#endBtn`/`#yesEnd`. Màn hình mới có việc làm dở thì đặt `guard` trong hàm vẽ màn hình; `route()` tự bỏ. Chuyển màn hình luôn đi qua `go()` hoặc link `#/…`, không gọi `route()` trực tiếp khi đang làm bài.
- `PinLock`: sai PIN 5 lần thì phải đợi (30 giây, 1 phút, 5 phút, rồi 15 phút), lưu theo mã người dùng ở localStorage khóa `ontap_pinlock_v1`. Chỉ làm đoán mò tốn thời gian, không phải bảo mật thật.
- `PoolHist`: câu đã làm, làm sai của từng học sinh với từng đề ngẫu nhiên, localStorage khóa `ontap_pool_v1` (chỉ trên máy này; xem “Đề ngẫu nhiên” ở trên).
- Bàn phím PIN (`wirePinBox`) tự kiểm tra khi gõ đủ `pinLen` số; bấm nút xem (`wireReveal`) thì hàng chấm `#pinDots` hiện chữ số đã gõ. Tài khoản cũ chưa có `pinLen` thì đủ 4 số thử lặng lẽ (sai không báo, không tính; tối đa 5 lượt mỗi người, `PinLock.probe`), rồi chờ đủ 6 số hoặc bấm Vào.
- Chú thích lịch thi cuối trang (`.foot`) chỉ hiện ở trang chủ và Lịch thi (`route()`). Bài ôn trong khung đặt class `playing` trên `body`: trang cao đúng một màn hình, chỉ cuộn trong khung.

### Kho dữ liệu
`Store` (js/store.js) là ranh giới duy nhất với dữ liệu. Cấu trúc:
- `users`: `{id, role, name, avatar, salt, pinHash, pinLen, grade?, className?, parentIds?}` — quan hệ phụ huynh–con lưu ở `parentIds` của học sinh. `pinLen`: độ dài PIN (4–6); dữ liệu cũ đọc vào là 0 (chưa biết), đăng nhập đúng thì ghi lại.
- `events`: kì thi, xem chú thích đầu `data/calendar-2026-2027.js`. **Không đổi `id`** của kì thi đã có.
- `banks`: ngân hàng do quản trị viên nhập (giữ cả văn bản gốc ở `src` để sửa lại; `passages` khi có đoạn đọc dùng chung).
- `results`: `{userId, source:"module"|"bank", refId, subject, label, mode, r, t, s, at, wrongTopics?}`. `r` lẻ đến 0,01 (câu đúng/sai 4 ý, nối cột chấm từng ý; hiển thị bằng `nf()` trong js/app.js: 8,75/13). `mode: "self"`: điểm tự chấm phần tự luận, `r`, `t` tính bằng phần tư điểm, lưu thành kết quả riêng; mọi chỗ tính điểm trung bình, số bài, độ sẵn sàng lọc bằng `graded()` (js/app.js), báo cáo tuần ghi riêng ở mục “Tự luận tự chấm”.
- `settings`: `{schoolName, schoolYear, createdAt, lastBackupAt}`. `lastBackupAt`: lần sao lưu gần nhất (ISO), dữ liệu cũ là `null`. Bản lưu trên máy, máy cảm ứng chia sẻ được file (iPhone, iPad): “Tải file sao lưu” mở bảng chia sẻ (`navigator.share`) và chỉ ghi khi chia sẻ xong; còn lại (cả bản đám mây) tải file và ghi ngay (`backupNow` trong js/app.js). Trên iOS, app mở từ Màn hình chính không dùng chung dữ liệu với Safari: Quản trị → Dữ liệu có các bước chuyển bằng file sao lưu, màn hình thiết lập mở từ Màn hình chính có thẻ nhắc khôi phục; bản đám mây chỉ nhắc chuyển dữ liệu trong Safari ở ô “Chuyển dữ liệu máy này lên đám mây”. Trang chủ quản trị và phụ huynh hiện thẻ nhắc sao lưu khi quá 7 ngày, hoặc chưa sao lưu lần nào mà đã có kết quả (`backupDue` trong js/app.js; bản đám mây không nhắc).
- `seedBanksSeen`: mã các ngân hàng có sẵn (danh mục data/banks/index.js) máy này đã xét. Khi thêm bộ mới vào danh mục và gắn vào `banks` của một kì thi trong lịch mặc định, `load()` tự gắn bộ đó vào kì thi trên máy đã có dữ liệu; bộ quản trị viên đã bỏ gắn thì không gắn lại.

Khối lớp: `data/grades.js` là chỗ duy nhất. Hồ sơ học sinh mới chỉ chọn được khối `active` (sửa hồ sơ thì giữ được khối đang có); form kì thi, ngân hàng đề, tab khối ở Lịch thi, “Kì thi tiếp theo” ở trang quản trị đọc danh sách này (`gradeList()` trong js/app.js). Thêm lớp mới: thêm nội dung rồi đổi `active` thành `true`.

`Store.can(feature)` (cả hai kho): chỗ duy nhất hỏi quyền theo gói (`"addChild"`, `"bank:<mã>"`…). Bản lưu trên máy luôn trả `true`; bản đám mây hôm nay chỉ giới hạn `"addChild"` theo `max_children` của gói. Sau này bật gói trả phí chỉ sửa hàm này và bảng `plans`.

Khi thêm trường mới: thêm giá trị mặc định khi đọc dữ liệu cũ, vì người dùng đã có dữ liệu trên máy. Nếu đổi cấu trúc không tương thích, tăng `SCHEMA_VERSION` và viết hàm chuyển đổi trong `load()`.

Mã PIN ở chế độ cục bộ chỉ để phân biệt người trong nhà/lớp, **không phải bảo mật thật**. Đừng mô tả nó là an toàn trên giao diện.

### Bản đám mây (SupabaseStore)
Bật khi `js/config.js` có `supabaseUrl` + `supabaseAnonKey`; khi đó `window.Store` là SupabaseStore (`Store.cloud === true`), LocalStore còn ở `window.LocalStore` để đọc dữ liệu cũ khi chuyển lên. Hướng dẫn cài: `docs/HUONG-DAN-SUPABASE.md`. Thiết kế: `docs/THIET-KE-TAI-KHOAN.md`.

Từ 17/10/2026 `js/config.js` trên `main` đã điền URL và khóa công khai của project Supabase thật (PR #27): trang trên GitHub Pages chạy bản đám mây. Chủ app tạo và quản lý tài khoản gia đình ở `admin.html` (Phiên C, xem “Trang admin” bên dưới).

Máy chủ (`supabase/schema.sql`, Edge Function `admin`):
- Một tài khoản = một gia đình (`families`), do phụ huynh giữ; đăng nhập bằng tên đăng nhập + mật khẩu. Supabase Auth lưu tên đăng nhập dạng email nội bộ `<tên>@users.onup.invalid` (không gửi thư). Con là hồ sơ (`profiles`, khối 1–12) trong tài khoản, dùng phiên của bố mẹ; `pin_hash` chỉ là khóa trên giao diện, app tự băm.
- Chủ app: người dùng trong `app_owners`. Mọi thao tác quản lý tài khoản đi qua Edge Function `admin` (khóa bí mật, tự kiểm tra owner, ghi `admin_log`; đổi gói ghi thêm `plan_log`). Chủ app đọc `families`, `admin_notes`, nhật ký; không đọc hồ sơ con, kết quả.
- Phụ huynh: đọc/ghi hồ sơ con, kết quả, lịch thi, ngân hàng tự nhập của gia đình mình; chỉ sửa `display_name, school_year, seed_banks_seen` của `families`. RPC: `touch()` (lần dùng gần nhất, tính lại hồ sơ bị khóa), `password_changed()` (bỏ cờ `must_change_password` sau khi `auth.updateUser`), `import_local(data)` (chuyển dữ liệu LocalStore: chỉ học sinh thành hồ sơ con), `plan_active(family_id)`.
- Tài khoản `status = 'locked'`: chỉ đọc được dòng `families` của mình; Edge Function còn cấm đăng nhập (ban) trong Supabase Auth.
- Gói: bảng `plans` (`max_children`, `all_banks`). Hôm nay `free` = 5 hồ sơ, mọi đề. Gói trả phí còn hạn khi `plan <> 'free'` và `plan_until >= hôm nay` (giờ Việt Nam); hết hạn thì về hạn mức `free`, hồ sơ vượt hạn mức có `locked = true` (không ghi kết quả mới). Trigger chặn thêm hồ sơ quá hạn mức. `paid_banks` đọc được khi đề đã đăng và (đề thử hoặc gói cho đọc mọi đề); hiện app vẫn đọc đề từ `data/banks/`.
- `results.r` là `numeric(7,2)`, `question_banks.passages`, `paid_banks.passages` là jsonb (Phiên K2). Project cài trước đó chạy `supabase/cap-nhat-k2.sql` (`docs/HUONG-DAN-SUPABASE.md`, mục “Cập nhật máy chủ”); chưa chạy thì app gửi lại số câu đúng làm tròn (lỗi 22P02) và chỉ gửi `passages` khi ngân hàng có đoạn đọc. Bảng `question_reports` (Phiên R1) thêm bằng `supabase/cap-nhat-r1.sql`; chưa chạy thì app vẫn mở được (bỏ qua lỗi “không có bảng” khi tải), chỉ không gửi báo cáo câu sai được. Đổi bảng của project đang chạy thì thêm file `supabase/cap-nhat-<phiên>.sql` chạy lại được, sửa cả `schema.sql`; `tests/supabase/run.sh` chạy file cập nhật sau `schema.sql`.
- Quyền do RLS và quyền theo cột (grant) quyết định (khóa anon là công khai). Đổi bảng hoặc chính sách thì chạy `sh tests/supabase/run.sh`, thêm kiểm tra vào `tests/supabase/rls-test.sql`, và sửa máy chủ giả `tests/supabase/fake-backend.js` cho khớp. Không bao giờ đưa khóa service_role/secret vào code phía trình duyệt.
- Tối đa 2000 kết quả mỗi hồ sơ và 60 kết quả mỗi 10 phút; 500 kì thi, 100 ngân hàng tự nhập mỗi tài khoản (trigger).

Phía trình duyệt (`js/store-supabase.js`, phần đám mây của `js/app.js`):
- Giao diện giống hệt LocalStore: hàm đọc đồng bộ (đọc từ bộ nhớ đệm tải lúc đăng nhập), `createUser`/`updateUser`/`checkPin` async. Hàm ghi cập nhật bộ nhớ đệm ngay rồi đẩy lên máy chủ theo hàng đợi; lỗi thì gọi `Store.onError` (app hiện toast) và tải lại dữ liệu thật. **Thêm hàm mới vào Store thì thêm ở cả hai kho**; `tests/supabase/store-test.mjs` so danh sách hàm.
- Hàm chỉ có ở bản đám mây: `init, refresh, flush, authState ("signed-out"|"change-password"|"locked"|"no-family"|"ready"), signIn(tên, mật khẩu, ghi nhớ), signOut, checkPassword, changePassword(mới, hiện tại?), parentUnlocked, rememberLogin, username, plan ({id, name, maxChildren, until}), localData, migrate, migratedAt`.
- Người dùng trong bộ nhớ đệm: một người dùng ảo `Phụ huynh` (mã `phu-huynh`, vai trò `admin` của app, nên dùng chung các màn hình quản trị, trên giao diện gọi là “Khu phụ huynh”; `Store.ROLES.admin` = “Phụ huynh”) và mỗi hồ sơ con là một học sinh (`parentIds: ["phu-huynh"]`, thêm `hasPin`, `locked`). Bản đám mây chỉ thêm, sửa, xóa hồ sơ con; tài khoản của bố mẹ do chủ app quản lý.
- Luồng (js/app.js `route()`): chưa đăng nhập → `renderCloudLogin` (tên đăng nhập + mật khẩu + “Ghi nhớ trên máy này” + dòng “Quên mật khẩu?” từ `contactText`, `contactUrl` của js/config.js; dưới form là thẻ “Chưa có tài khoản?” với link từ `signupText`, `signupUrl`, khóa nào trống thì lấy khóa contact tương ứng, cả hai qua `contactLink`; trên form có thẻ nhắc `#oldData` khi máy còn dữ liệu bản lưu trên máy có học sinh (`Store.localData()`) mà chưa chuyển (`Store.migratedAt()` trống)); mật khẩu tạm → `renderNewPassword` (bắt đổi); bị khóa hoặc không có gia đình (ví dụ tài khoản chủ app) → `renderCloudBlocked`; đã đăng nhập mà tab chưa chọn ai → `renderLogin` thành màn hình “Ai đang học?”. Hồ sơ con có PIN thì nhập PIN, không có thì bấm là vào; Phụ huynh phải nhập lại mật khẩu (`checkPassword`, sai cũng tính vào `PinLock`), vừa nhập mật khẩu trong 5 phút thì không hỏi lại (`parentUnlocked`; `setSession` của Phụ huynh cũng kiểm tra). Tài khoản chưa có hồ sơ con và vừa đăng nhập thì vào thẳng khu phụ huynh. “Đổi người học” (`setSession(null)`) về “Ai đang học?” mà không đăng xuất; chỉ Phụ huynh đăng xuất được (trang Tài khoản, kèm đổi mật khẩu).
- Hồ sơ đang dùng giữ trong sessionStorage (`ontap_cloud_who`), hồ sơ con chọn gần nhất ở localStorage (`ontap_cloud_last`). Phiên Supabase giữ trong sessionStorage, chọn “Ghi nhớ” thì localStorage (`ontap_sb_auth`). Phiên bị máy chủ từ chối (hết hạn, chủ app đặt lại mật khẩu) thì tự đăng xuất trên máy.
- PIN hồ sơ con: 4 số, không bắt buộc, băm trên máy như `hashPin` của js/store.js, lưu `pin_hash = "<muối>$<mã băm>"`; muối bắt đầu bằng `<độ dài>.` để bàn phím tự vào khi gõ đủ. PIN chuyển từ máy cũ (`import_local`, 4–6 số, chưa biết độ dài) nhập đúng một lần thì được băm lại kèm độ dài.
- Tài khoản mới (Edge Function chỉ tạo dòng `families`) chưa có kì thi nào: lần mở đầu app chép lịch mặc định lên máy chủ. Đề có sẵn (data/banks/) không lưu lên máy chủ; `seed_banks_seen` của family làm việc như `seedBanksSeen`.
- Kết quả làm bài đi qua hộp gửi trong localStorage (`ontap_cloud_outbox`, theo mã hồ sơ), chỉ xóa khi máy chủ đã nhận; gửi kết quả của mọi hồ sơ con của tài khoản đang đăng nhập (máy dùng chung cho anh em), để lại kết quả của tài khoản khác.
- CAPTCHA (Cloudflare Turnstile) tùy chọn: `turnstileSiteKey` trong `js/config.js`; `captcha()` trong store-supabase.js lấy mã cho `signIn` và `checkPassword`. Không có khóa thì không tải script của Cloudflare.

Trang admin (`admin.html`, chủ app mở `…/OnUp/admin.html`):
- Một file tự chứa (script trong file, theo quy ước code bên dưới), dùng `css/app.css` (lớp `.kv`, `.note-in`, `.pw-row`, `.pw-in`, `.wrap`, `.share-msg` ở cuối file), `data/grades.js`, `js/config.js`. `js/config.js` để trống thì chỉ báo “chỉ dùng với bản đám mây”, không tải gì từ mạng (`tests/e2e.js` kiểm tra). Không nằm trong `FILES` của `sw.js`.
- Đăng nhập bằng tài khoản chủ app: gõ tên đăng nhập (thành `<tên>@users.onup.invalid`) hoặc cả email. Phiên chỉ giữ trong sessionStorage, khóa `onup_admin_auth`, riêng với `ontap_sb_auth` của trang học. CAPTCHA như trang học (ô `#adCaptcha`).
- Thao tác với tài khoản gọi Edge Function `admin`: `list_accounts` (danh sách, số liệu nhanh: tài khoản, dùng trong 7 ngày, hồ sơ con theo khối), `create_account`, `reset_password`, `set_status`, `delete_account` (gõ đúng tên đăng nhập mới bấm được). Hàm trả `forbidden` thì hiện “Không có quyền”; `auth` thì về màn hình đăng nhập. Tìm và lọc làm trên máy (không phân biệt dấu).
- Ghi chú: upsert thẳng vào `admin_notes` (RLS chỉ owner; không vào nhật ký). Nhật ký: đọc `admin_log` (mới nhất trước, 50 dòng mỗi lần; từng tài khoản 20 dòng). Câu bị báo: tab riêng (xem “Báo câu sai” ở trên). Không đọc hồ sơ con, kết quả.
- Mật khẩu tạm gợi ý trên máy, cùng bảng chữ với `tempPassword` của Edge Function; sau khi tạo hoặc đặt lại chỉ hiện một lần, kèm lời nhắn chép được để gửi phụ huynh (`shareText`). Lời nhắn là chữ thường, mỗi thông tin một dòng (`\n`), có emoji ở hai dòng tên đăng nhập, mật khẩu tạm, để dán vào Zalo là gửi được ngay, không phải sửa tay; khung xem trước `.share-msg` (`white-space: pre-line`) hiện đúng như khi dán. `cloud-e2e.js` so chữ chép ra với chữ trên màn hình, từng dòng.
- `LIB` (supabase-js, mã SRI) chép từ `js/store-supabase.js`: đổi phiên bản thì sửa cả hai (`cloud-e2e.js` so). Chưa có giao diện đổi gói (`set_plan`): làm khi bán gói (thiết kế mục 9).

## Quy ước code
- JavaScript thuần, ES2019+, không module/import (để mở được cả bằng file://). Mỗi file bọc trong IIFE, xuất ra `window.<Tên>`.
- Mọi chuỗi từ người dùng hoặc dữ liệu đi vào HTML phải qua `esc()`.
- Ô mật khẩu, mã PIN mới (`type="password"`; ô PIN có `inputmode="numeric"`) phải có nút xem: gọi `wireReveal(view)` (js/app.js) sau khi vẽ màn hình, admin.html dùng bản `wireReveal` riêng trong file (cùng lớp `.reveal`, `.reveal-btn` của css/app.css). Tên đọc của ô lấy từ `<span>` đầu tiên trong `<label>` chứa ô (nút nằm trong label nên ô dùng `aria-labelledby`). Xóa ô bằng code (`value = ""`) hoặc gửi không qua `<form>` thì gọi `conceal(ô)` để ẩn lại. Không lưu trạng thái hiện/ẩn. `tests/e2e.js`, `tests/supabase/cloud-e2e.js` thử từng ô bằng `revealTry`.
- Mọi đọc/ghi localStorage/sessionStorage bọc try/catch.
- Màu chỉ dùng token trong `:root` của `css/app.css`. Font: Baloo 2 (tiêu đề), Be Vietnam Pro (chữ), tự lưu trong `fonts/`. Bản lưu trên máy không tải gì từ host khác (không Google Fonts, không CDN); `tests/e2e.js` kiểm tra.
- Ngày lưu dạng `"YYYY-MM-DD"`, hiển thị kiểu Việt Nam `2/11/2026`.
- Câu hỏi trắc nghiệm trong dữ liệu: đáp án đúng đứng đầu mảng, app tự xáo. Sắp xếp: viết các ô theo thứ tự đúng; nối cột: `l[i]` nối với `r[i]`, ô thừa ở cuối `r`. App tự xáo.
- Hình trong dữ liệu chỉ là chuỗi SVG, luôn vẽ qua `Quiz.svg` (dựng lại từ danh sách thẻ, thuộc tính vẽ an toàn; bỏ script, `on…`, `href`, `style`, `url()`). Màu `fill`, `stroke` ghi bằng tên token (`ink`, `acc`, `ok-soft`…), không ghi mã màu. Dạng câu mới phải làm được bằng chạm (không kéo thả bắt buộc), nút cao ≥ 44px ở 360px.

## Nội dung câu hỏi
- Câu hỏi phải đúng chương trình và đúng đáp án. Với Toán, tự tính lại mọi đáp án (chạy bằng code nếu cần) trước khi thêm.
- Không chép nguyên văn đề của sách, nhà xuất bản hay đề thi có bản quyền; tự soạn câu tương tự.
- Dùng dạng câu hợp với môn (`docs/KE-HOACH-NOI-DUNG.md` mục 3), ghi mức độ `lv` cho câu mới. Trả lời bằng số: `ans` là số (tính lại bằng code), `tol` khi đáp án là số đo, ước lượng. Tự luận: thang chấm từng ý (điểm chia hết cho 0,25), `x` là đáp án gợi ý.
- **Môn Tiếng Anh (mọi khối): 100% tiếng Anh** (chủ app yêu cầu 18/10/2026). Mọi chữ của đề và câu Tiếng Anh viết bằng tiếng Anh: `note`, `topic`, lời dặn và đề bài, lựa chọn, đáp án, lời giải `x`, đoạn đọc, thang tự chấm. Không dịch nghĩa hay chú thích tiếng Việt; tên riêng Việt Nam viết không dấu như sách Global Success (Viet Nam, Ha Noi). Câu tiếng Anh trong đề nhiều môn cũng vậy. Giao diện làm đề Tiếng Anh, từ màn mở đề đến hết màn kết quả, cũng bằng tiếng Anh. Lời dặn mẫu, cách viết lời giải: `docs/KE-HOACH-NOI-DUNG.md` mục 3. Sửa các đề và giao diện đang có: Phiên TA1, TA2 (`docs/SUA-LOI-CHAY-THU.md`, L21).
- Ngày thi lấy từ nguồn chính thức. Ngày chưa công bố thì để `tentative: true`.

## Chạy và kiểm tra
```bash
python3 -m http.server 8000      # rồi mở http://localhost:8000
```
Không mở bằng file:// khi thử bài ôn trong khung: một số trình duyệt chặn localStorage giữa các trang file://.

Kiểm thử tự động (bắt buộc trước mỗi Pull Request): `python3 -m http.server 8000 &` rồi `node tests/e2e.js` (cần `npm i -D playwright`). Script luôn chạy bản lưu trên máy (trả về `js/config.js` đã xóa `supabaseUrl`, `supabaseAnonKey` dù file thật đã điền) và phải in `E2E OK`; ảnh chụp ở `tests/screenshots/` để xem giao diện, ảnh 360px sáng/tối của đăng nhập, trang chủ học sinh, bài ôn trong khung, quản trị, tab Dữ liệu ở `tests/screenshots/360/`. Bước K2 làm đề thử nghiệm các dạng câu mới bằng chạm ở 360px sáng/tối (điểm chấm từng ý, tự luận tự chấm lưu riêng, báo cáo tuần, bộ lọc hình trong trình duyệt); ảnh từng dạng ở `tests/screenshots/dang-cau/` (bản ghép sáng/tối `<tên>.jpg`, chép ảnh cần đưa vào tài liệu sang `docs/hinh-dang-cau/`). Bước TA1 làm 3 đề Tiếng Anh có sẵn ở chế độ ôn luyện bằng đáp án trong dữ liệu (mỗi đề 10/10, đoạn đọc dùng chung hiện đúng, chữ câu hỏi và lời giải không có chữ cái tiếng Việt), ảnh 360px sáng/tối một câu đọc hiểu và một câu điền ở `tests/screenshots/tieng-anh/`. Script có bước mất mạng: tải trang một lần, mở một đề, tắt mạng, tải lại vẫn đăng nhập và làm được bài ôn trong khung, đề đã mở (kể cả đề chép từ đệm của bản trước), đề chưa mở thì báo chưa tải được. Bước service worker (L19): mọi file chậm 6 giây thì trang vẫn hiện trước 6 giây; `js/app.js` chậm và `js/store.js` mới thì không chạy lẫn bản cũ với bản mới. Hai script Playwright đặt `PW_EXPERIMENTAL_SERVICE_WORKER_NETWORK_EVENTS=1` để route và chế độ offline áp dụng cả cho service worker.

Pull Request có thêm hoặc sửa đề có sẵn: chạy thêm `node tests/kiem-tra-de.js` (không cần trình duyệt, in `DE OK`). Script kiểm tra mã đề không trùng, tên đề đúng quy ước `<môn> <khối> · <kì> · Đề N` (kì: Giữa kì I, Cuối kì I, Giữa kì II, Cuối năm; đề ngẫu nhiên `· Đề ngẫu nhiên`; trừ đề thử nghiệm môn “Thử nghiệm”; chữ trên nút đề lấy từ tên), khối có trong `data/grades.js`, mỗi câu có chủ đề và lời giải, trắc nghiệm có ít nhất 2 lựa chọn không trùng nhau, điền khuyết có đáp án và đúng một chỗ trống `___`, trường của từng dạng mới (đúng/sai 4 ý, trả lời bằng số chấm đúng đáp án, nối cột, sắp xếp, thang tự chấm), mức độ, đoạn đọc có câu dùng, hình qua `Quiz.svg` không bị bỏ gì, không có câu trùng nhau (so sau khi bỏ dấu câu, khoảng trắng), đề gắn vào kì thi có thật và đúng khối, số câu, số phút hợp lí, danh mục khớp với file câu hỏi; đề ngẫu nhiên (`pool`): `from` đúng, ma trận đúng chữ chủ đề, tổng bằng `n`, kho đủ câu từng chủ đề (thiếu ở một mức chỉ nhắc), rút thử ra đúng `n` câu; đề Tiếng Anh 100% tiếng Anh (Phiên TA1): đề có môn Tiếng Anh (mọi khối) và câu có `topic` bắt đầu bằng “English” trong đề khác không có chữ cái tiếng Việt ở mọi trường chữ (`note`, đoạn đọc, `topic`, `q`, `o`, `ans`, `l`, `r`, `x`, thang tự chấm; vài từ như café được phép, lỗi ghi mã đề, số câu, trường và chữ sai, script tự thử với câu cố ý viết sai); và tự thử bộ lọc hình với vài hình cố ý viết sai, bộ rút đề với kho giả (ưu tiên, lấy bù). Thêm dạng câu mới thì thêm kiểm tra vào script này.

Thử tay sau khi sửa code: service worker dùng mạng trước nên tải lại trang là thấy bản mới. Sửa `sw.js` thì trình duyệt cài bản mới ở lần tải sau (DevTools → Application → Service workers để xem, gỡ).

Khi sửa `js/store-supabase.js`, `js/app.js` (phần đám mây), `admin.html`, `supabase/`: chạy thêm `node tests/supabase/admin-test.mjs` (Edge Function admin và máy chủ giả, in `ADMIN OK`), `node tests/supabase/store-test.mjs` (in `SUPABASE STORE OK`), `node tests/supabase/cloud-e2e.js` (in `CLOUD E2E OK`, ảnh 360px sáng/tối ở `tests/screenshots/cloud/`), và nếu máy có PostgreSQL thì `sh tests/supabase/run.sh` (in `RLS OK`). store-test.mjs và cloud-e2e.js chạy với Edge Function admin thật (chủ app tạo tài khoản) trên máy chủ giả; cloud-e2e.js kiểm tra 360px như tests/e2e.js, ảnh ghép sáng/tối `<tên>.jpg` cùng thư mục, các màn hình chính chép vào `docs/hinh-dam-may/`; phần cuối kiểm tra trang admin (`c16`–`c23`, ảnh `admin-*.jpg` trong `docs/hinh-dam-may/`). Nút báo câu sai (R1) thử ở cả hai: tests/e2e.js (bước R1, ảnh `tests/screenshots/20-*.png`) và cloud-e2e.js (`c8c`, `c8d`, tab admin `c23`).

Ngoài ra chạy tay các luồng: thiết lập lần đầu → tạo phụ huynh, học sinh → đăng nhập học sinh bằng PIN → mở một bài ôn và làm xong một đề → làm một ngân hàng câu hỏi → đăng nhập phụ huynh xem hồ sơ con và báo cáo tuần → quản trị sửa một kì thi. Kiểm tra ở bề rộng 390px và chế độ tối. Bản đám mây: trang admin tạo tài khoản → đăng nhập trang học bằng mật khẩu tạm → đặt mật khẩu mới → thêm hồ sơ con → “Ai đang học?” → con làm một đề → Phụ huynh nhập lại mật khẩu, xem báo cáo tuần → trang admin xem nhanh tài khoản, khóa, mở khóa.

## Triển khai
GitHub Pages: Settings → Pages → Deploy from a branch → `main` / root. File `.nojekyll` đã có.

## Việc tiếp theo

**Trạng thái, thứ tự các phiên và lời giao việc chỉ ghi ở một chỗ: `docs/KE-HOACH-PHAT-TRIEN-ONUP.md`** (đầu file: trạng thái; mục 2: việc của chủ app; mục 3: thứ tự và các phiên đã xong; mục 4: lời giao việc; mục 5: nhật ký chạy thử). Tài liệu khác (file này, README.md, `docs/TINH-NANG.md`, `docs/THIET-KE-TAI-KHOAN.md`, `docs/KE-HOACH-NOI-DUNG.md`, `docs/SUA-LOI-CHAY-THU.md`, `docs/CAI-TIEN-UX-2X.md`) chỉ trỏ sang đó, không ghi lại “đã làm / chưa làm”. Làm xong một phiên thì cập nhật file đó (và phần mô tả code trong file này nếu có thay đổi), không thêm dòng trạng thái vào file khác. Lời giao việc của các phiên làm đề nằm ở `docs/KE-HOACH-NOI-DUNG.md` mục 6, 7; của Phiên A, B, C (đã làm) ở `docs/THIET-KE-TAI-KHOAN.md` mục 8; của Phiên 9a–9d (đã làm) ở `docs/SUA-LOI-CHAY-THU.md` mục 3.

**Quyết định của chủ app (18/10/2026), áp dụng cho mọi phiên:**
- **Chưa làm bản trả phí.** Bán khi đủ đề lớp 4–12 (theo nhịp 1–2 phiên mỗi tuần: khoảng cuối năm học 2028–2029). Đến lúc đó gói Miễn phí giữ như hiện nay: 5 hồ sơ con, mọi đề; bảng `plans` không đổi; `Store.can()` chỉ giới hạn `"addChild"`. Hạn mức gói Miễn phí và gói Gia đình lúc bán sẽ chốt sau (chủ app điền vào lời giao việc Phiên G1). Các phiên chuẩn bị bán (G1, B1, B2, B4) làm ngay trước lúc đó, không làm sớm hơn. Hướng đi: `docs/THIET-KE-TAI-KHOAN.md` mục 9, `docs/KE-HOACH-NOI-DUNG.md` mục 5.
- **Không ghi giá bán, chi phí hay so sánh đối thủ vào repo** (repo công khai). Ví dụ SQL về gói dùng số giữ chỗ.
- **Supabase giữ gói Free** đến khi bắt đầu thu tiền. Trước đó chủ app xuất CSV các bảng hằng tuần và mở app ít nhất mỗi tuần một lần (`docs/HUONG-DAN-SUPABASE.md`, mục “Gói và đề trả phí”). Code không cần làm gì cho việc này.
- **Báo câu sai bằng nút trong app** (Phiên R1). GitHub Issues chỉ còn cho chủ app; không hướng dẫn phụ huynh, học sinh dùng GitHub trên giao diện hay trong tài liệu dành cho họ.
- **Trang công khai https://dunglnh.github.io/OnUp/ chỉ dành cho gia đình được mời:** không tự đăng ký; chủ app tạo tài khoản ở `admin.html`. Màn đăng nhập có thẻ “Chưa có tài khoản?” kèm cách liên hệ (đọc `signupText`, `signupUrl` từ `js/config.js`). Không làm đăng nhập email, mã mời, mã gia đình (`docs/THIET-KE-TAI-KHOAN.md` mục 1, 2).
