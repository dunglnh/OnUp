# Kế hoạch phát triển OnUp

> **Trạng thái (18/10/2026):** trang thật https://dunglnh.github.io/OnUp/ chạy **bản đám mây** từ 17/10 (PR #27), đang chạy thử trong gia đình. Đã xong: khung tài khoản (Phiên A, B, C), sửa lỗi chạy thử (9a–9d), U1, K1, K2, đề N0a, N0b. Kho đề: `node tests/kiem-tra-de.js` in số đề, số câu, dạng câu.
> **Tiếp theo:** mục 2 (việc của chủ app tuần này) và mục 3 (thứ tự các phiên). Thời điểm bán và hạn mức gói chờ chủ app chốt (mục 2, việc 4); thiết kế gói: mục 9 của [THIET-KE-TAI-KHOAN.md](THIET-KE-TAI-KHOAN.md).

## 1. Tình hình hiện tại

**Credit cloud session $100** (hạn 5/11/2026): theo trang Usage ngày 16/10, mục credit không còn hiện và Claude Code đã chiếm 47% mức dùng tuần của gói Pro, nên credit coi như **đã dùng hết**. Từ nay mỗi phiên cloud **trừ vào giới hạn tuần của gói Pro**, dùng chung với phần chat.

**Đã xong** (tất cả đã gộp vào `main`):

| PR | Việc |
|---|---|
| #1 | Phiên 1: 3 đề Toán 4 cuối kì I |
| #3 | Phiên 2: 2 đề Tiếng Việt 4 cuối kì I |
| #5 | Phiên 3: 2 đề Toán 6, 2 đề Ngữ văn 6 cuối kì I |
| #4 | Phiên 4: Khoa học 4, Lịch sử và Địa lí 4, KHTN 6, Lịch sử và Địa lí 6 cuối kì I |
| #6 | Phiên 5: đồng bộ đám mây (Supabase), có hướng dẫn cài từng bước — **chưa bật** (`js/config.js` để trống) |
| #8 | Phiên 5b: chống máy tự động (CAPTCHA) cho bản đám mây — chỉ chạy khi có khóa |
| #10 | Phiên 8: rà soát đề (56 chỗ sửa), bộ chấm điền khuyết, giao diện 360px |
| #7, #9 | Canh trái nút quay lại; xưng "bạn" trong bài ôn; bỏ 2 bộ mẫu 12 câu |
| #13, #14 | Phiên 10, 11: đề cuối kì I còn thiếu (Tiếng Anh, GDCD, Tin học, Công nghệ 6; Tin học và Công nghệ 4) |
| #15 | Phiên 12: báo cáo tuần cho phụ huynh |
| #16 | Phiên 13: IOE cấp tỉnh lớp 4 |

Nội dung hiện có: 4 bài ôn (giữa kì I lớp 4, lớp 6; IOE 4 cấp trường, cấp xã và cấp tỉnh (Phiên 13); IOE 6 cấp xã và cấp thành phố), 19 đề cuối kì I (lớp 6 đủ 8 môn từ Phiên 10: thêm Tiếng Anh, GDCD, Tin học, Công nghệ; lớp 4 thêm Tin học và Công nghệ từ Phiên 11, Tiếng Anh từ Phiên N0b), 4 đề giữa kì II lớp 4 (Toán, Tiếng Việt, Phiên 14) và 5 đề giữa kì I lớp 6 (Tiếng Anh, Lịch sử và Địa lí, GDCD, Phiên N0a; Tin học, Công nghệ, Phiên N0b).

**Chưa làm từ kế hoạch cũ:** Phiên 6 (nhập đề từ Excel). Phiên 7 (báo cáo tuần cho phụ huynh) đã làm ở Phiên 12.

## 2. Việc của chủ app (không tốn lượt Claude)

**Tuần 18–25/10/2026:**
1. **Supabase:**
   - Chạy `supabase/cap-nhat-k2.sql` một lần, nếu chưa chạy (SQL Editor → dán → Run; xem `docs/HUONG-DAN-SUPABASE.md`).
   - Dữ liệu gia đình thật đang nằm ở gói Free: gói này không có sao lưu và dự án tự tạm dừng khi cả tuần không ai dùng. Chọn một trong hai: lên gói Pro, hoặc mỗi tuần vào Table Editor xuất CSV các bảng `families`, `profiles`, `results`, `exam_events`, `question_banks`.
2. **Liên hệ:** điền `contactText`, `contactUrl` (ví dụ link Zalo) trong `js/config.js`, để người mở trang biết hỏi ai. `main` đang được bảo vệ: sửa trên GitHub thì chọn "Create a new branch… and start a pull request", rồi tự Merge.
3. **Ghi chỗ khó dùng** khi các con dùng thật, đến khoảng 25/10. Mỗi chỗ một dòng: ai dùng · màn hình · định làm gì · vướng ở đâu · khó chịu hay không làm được. Phiên UX1–UX3 dùng ghi chép này.
4. **Chốt 5 quyết định**, rồi điền vào lời giao việc Phiên D0 (mục 4):
   - khi nào bán thử;
   - hạn mức gói Miễn phí và gói Gia đình, và chính sách cho gia đình dùng thử từ trước;
   - khi nào lên Supabase Pro;
   - kênh báo câu sai (đề xuất: nút trong app, Phiên R1);
   - trang công khai dành cho ai (chỉ gia đình được mời, hay tách thêm một địa chỉ cho bản lưu trên máy).

**Thường xuyên:**
5. Rà đề mới: cho con làm thử, ghi câu sai vào GitHub Issues (cho đến khi có nút báo câu sai của Phiên R1).
6. Trường báo lịch chính thức thì sửa ngày trong Khu phụ huynh → Lịch thi.
7. Trước khi chia sẻ trang rộng rãi: bật CAPTCHA (bước 8 của `docs/HUONG-DAN-SUPABASE.md`).
8. Trước khi bán: thông báo website với Bộ Công Thương (online.gov.vn), hỏi kế toán về thuế.

## 3. Lộ trình khi làm tiếp

Mỗi dòng là **một phiên Claude Code riêng**: mở claude.ai/code, chọn repo `dunglnh/OnUp`, dán lời giao việc, xem Pull Request rồi Merge. Phiên A, B, C lấy lời giao việc ở mục 8 của [THIET-KE-TAI-KHOAN.md](THIET-KE-TAI-KHOAN.md); Phiên 9a, 9b, 9c (lỗi tìm được khi dùng thử ngày 16/10, đã làm) và Phiên 9d (lỗi phát sinh khi rà soát lại ngày 17/10) ở mục 3 của [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md); **các phiên làm đề và kĩ thuật cho đề (N0–N25, K1–K3, chuẩn bị bán B1–B4) ở mục 6, 7 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md)**; các phiên khác ở mục 4 dưới đây.

| Thứ tự | Hạn | Phiên | Cần trước | Ghi chú |
|---|---|---|---|---|
| 1 | 25/10 | **D0 · Đồng bộ tài liệu** | chủ app chốt 5 quyết định (mục 2) | chỉ sửa tài liệu; từ đó trạng thái chỉ ghi ở file này |
| 2 | 1/11 | **K3 · Rút đề ngẫu nhiên theo ma trận** ([KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md) mục 6) | K1, K2 (đã xong) | các phiên làm đề N1 trở đi dùng dạng ngân hàng của K3 |
| 3 | 1/11 | **S1 · Màn hình đăng nhập cho người mới** | `contactUrl` đã điền | nhỏ; dùng khi trang công khai chỉ dành cho gia đình được mời |
| 4 | 8/11 | **R1 · Nút "Báo câu này sai"** | K3 (cùng sửa js/quiz.js) | chủ app chạy `supabase/cap-nhat-r1.sql` sau khi Merge |
| 5 | 15/11 | **UX1 · Trang "Hôm nay" và màn kết quả của con** | R1; ghi chép của chủ app | |
| 6 | 22/11 | **UX2 · Khu phụ huynh gọn lại** | UX1 | |
| 7 | 29/11 | **UX3 · Bắt đầu và chuyển máy cho con** | UX2 | |
| 8 | 15/12 | **N1–N6 · Đủ đề cuối kì I lớp 4 và 6** ([KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md) mục 7) | K3 | chỉ sửa file đề, chen được giữa các phiên UX |
| 9 | 10/1/2027 | **G1 · Kích hoạt gói, màn hình Nâng cấp, Điều khoản và Quyền riêng tư** | D0 (hạn mức gói đã chốt) | |
| 10 | 20/1 | **B1 · Chuyển hosting sang Cloudflare Pages, repo riêng tư** | G1 | chủ app làm phần cài đặt theo hướng dẫn phiên này viết |
| 11 | 31/1 | **B2 · Đề trả phí lên máy chủ** | B1 | trước B1 thì đề vẫn nằm trong repo công khai |
| — | từ 15/2 | **Bán thử lớp 4 và 6** (nếu chủ app chốt như vậy) | G1, B1, B2, Supabase Pro | đo: số gia đình dùng thử, tỉ lệ trả tiền, còn dùng sau 4 tuần, kênh đến |
| 12 | 1/3 | **N7–N12 · Giữa kì II lớp 4 và 6** | K3 | |
| 13 | 10/3 | **N-IOE · IOE cấp quốc gia** | | thi 1–2/4/2027 (dự kiến), hiện chưa có bài ôn |
| 14 | 10/4 | **N13–N22 · Cuối năm lớp 4 và 6** | K3 | |
| 15 | 5/2027 | Chọn khối mở tiếp theo theo kết quả bán thử; lịch 2027–2028; gộp bài ôn dạng trang vào ngân hàng; B4 (bớt tải dữ liệu) | | [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md) mục 4, 5 |
| — | khi có | **Phiên 9 · Sửa lỗi từ góp ý chạy thử** (GitHub Issues) | | chen vào bất cứ lúc nào |

Khoảng 33 phiên từ nay đến 10/4/2027, trung bình 1–2 phiên mỗi tuần. Tháng 11 dày nhất (K3, S1, R1, UX1–UX3 và bắt đầu N1–N6). Không chạy cùng lúc hai phiên cùng sửa `js/app.js` hoặc `js/quiz.js`; các phiên N chỉ sửa file đề nên chạy xen được.

**Đã xong:**

| | | Phiên | |
|---|---|---|---|
| — | — | ~~Phiên 10 · Đề cuối kì I lớp 6 còn thiếu~~ (đã xong, PR #13) | |
| — | — | ~~Phiên 11 · Đề cuối kì I lớp 4 còn thiếu~~ (đã xong, PR #14) | |
| — | — | ~~Phiên 12 · Báo cáo tuần cho phụ huynh~~ (đã xong, PR #15) | |
| — | — | ~~Phiên 13 · IOE cấp tỉnh lớp 4~~ (đã xong, PR #16) | |
| — | — | ~~Phiên 14 · Đề giữa kì II lớp 4~~ (đã xong, PR #17) | |
| — | — | ~~Phiên A · Máy chủ: tài khoản, hồ sơ con, Edge Function admin~~ (đã xong, PR #19) | |
| — | — | ~~Phiên 9a · Không mất bài, khóa PIN, đường dẫn sai~~ (đã xong, PR #21) | |
| — | — | ~~Phiên 9b · Giao diện điện thoại 360px~~ (đã xong, PR #22) | |
| — | — | ~~Phiên 9c · Chạy khi mất mạng, nhắc sao lưu~~ (đã xong, PR #23) | |
| — | — | ~~Phiên B · App: đăng nhập, chọn hồ sơ, khu phụ huynh, khối lớp chung~~ (đã xong, PR #25) | |
| — | — | ~~Phiên 9d · Lỗi phát sinh sau rà soát 17/10~~ (đã xong, PR #29; bố mẹ thử L17 trên iPhone) | |
| — | — | ~~Phiên C · Trang admin~~ (đã xong, PR #30) | |
| — | — | ~~Phiên U1 · Nút xem mật khẩu và mã PIN~~ (đã xong, PR #35; bố mẹ thử trên iPhone, Android) | |
| — | — | ~~Phiên N0a, N0b · Đề giữa kì I lớp 6 còn thiếu, Tiếng Anh 4 cuối kì I~~ (đã xong, PR #32, #34) | |
| — | — | ~~Phiên K1 · Tách dữ liệu đề, bộ kiểm tra đề~~ (đã xong, PR #36) | |
| — | — | ~~Phiên K2 · Dạng câu hỏi mới~~ (đã xong, PR #37; chủ app chạy `supabase/cap-nhat-k2.sql`) | |

**Để sau, chỉ làm khi có nhu cầu thật:** nhập đề từ Excel (Phiên 6 cũ); tự đăng ký, email để tự lấy lại mật khẩu, tài khoản giáo viên/lớp học (mục 7 bản thiết kế); **bản trả phí** (hướng đi ở mục 9 bản thiết kế; việc kĩ thuật cần làm trước ở mục 5 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md)). Đề lớp 5, 7–12 đã có thứ tự và số phiên dự kiến trong [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md). Việc “bắt buộc đổi PIN cũ” không còn cần vì cách đăng nhập mới bỏ PIN học sinh trên máy chủ.

**Mẹo tiết kiệm lượt dùng gói Pro:**
- Một phiên một việc, giao việc rõ ràng. Phiên càng dài càng tốn, vì mỗi lượt Claude đọc lại toàn bộ cuộc trò chuyện.
- Chỉ yêu cầu **một vòng** tự rà soát; nhiều vòng rà soát và phiên “điều phối” nhiều trợ lý là phần tốn nhất trước đây.
- Mỗi việc lớn mở một cuộc trò chuyện mới thay vì nói tiếp trong cuộc cũ.
- Xem mức “This week” ở Settings → Usage trước khi mở phiên; giới hạn tuần làm mới mỗi thứ Sáu khoảng 13:00.
- Merge từng Pull Request trước khi mở phiên sửa cùng file.

## 4. Lời giao việc (dán nguyên vào phiên mới)

Phiên K3 và các phiên làm đề N1–N25: lời giao việc ở mục 6, 7 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md). Các phiên dưới đây xếp theo thứ tự ở mục 3.

**Phiên D0 · Đồng bộ tài liệu** (điền quyết định vào chỗ […] trước khi dán)
> Đọc CLAUDE.md, README.md và mọi file trong docs/. Chỉ sửa tài liệu, không sửa code.
>
> Quyết định của chủ app:
> - Khi nào bán thử: […].
> - Hạn mức gói: Miễn phí […] hồ sơ, [đề nào]; Gia đình […] hồ sơ, mọi đề. Gia đình dùng thử trước ngày bán: […].
> - Supabase Pro: […].
> - Báo câu sai: nút trong app (Phiên R1); GitHub Issues chỉ còn cho chủ app.
> - Trang công khai: [chỉ gia đình được mời, có cách xin tài khoản | tách thêm một địa chỉ cho bản lưu trên máy].
>
> Việc cần làm:
> 1. Ghi các quyết định vào đúng chỗ: CLAUDE.md mục "Việc tiếp theo", THIET-KE-TAI-KHOAN (đoạn "Phạm vi bây giờ" và mục 9), KE-HOACH-NOI-DUNG mục 4, 5, 8, HUONG-DAN-SUPABASE mục "Gói và đề trả phí", README, TINH-NANG mục 5. Ví dụ lệnh SQL trong HUONG-DAN-SUPABASE dùng số giữ chỗ, không ghi giá thật.
> 2. Sửa các chỗ trạng thái cũ:
>    - CLAUDE.md: dòng trạng thái; "Đề cuối kì I: đã đủ các môn" (nhiều môn mới có 1 đề, còn N1–N6); `js/config.js` trong danh sách file đã điền trên main.
>    - README: bỏ "đang tạm dừng"; viết lại phần "Dùng ngay" và "Đồng bộ đám mây" theo quyết định trang công khai.
>    - KE-HOACH-PHAT-TRIEN mục 1: thêm PR #27; Phiên 5 cũ đã được thay bằng Phiên A, B, C.
>    - KE-HOACH-NOI-DUNG mục 1, 2: số đề, số câu, dạng câu, dung lượng lấy từ `node tests/kiem-tra-de.js`, không chép số cũ.
>    - TINH-NANG: mục 2 (thời gian chờ PIN tăng dần; vai trò ở bản đám mây), mục 5, 6 (đồng bộ đã có; đăng nhập email không làm theo THIET-KE-TAI-KHOAN mục 1), mục 7 (thay bằng một dòng trỏ sang KE-HOACH-PHAT-TRIEN).
>    - THIET-KE-TAI-KHOAN mục 1 và KE-HOACH-PHAT-TRIEN mục 3: "bỏ PIN học sinh trên máy chủ" thành "bỏ kiểm tra PIN ở máy chủ; pin_hash chỉ là khóa trên giao diện".
> 3. Từ nay chỉ KE-HOACH-PHAT-TRIEN ghi trạng thái và lộ trình; tài liệu khác trỏ sang đó. Ghi quy ước này vào CLAUDE.md.
> 4. Thêm mục "Nhật ký chạy thử" vào KE-HOACH-PHAT-TRIEN (số gia đình, lượt làm bài mỗi tuần, góp ý thật), để trống cho chủ app điền.
> 5. Không ghi giá bán, chi phí hay so sánh đối thủ vào repo.
>
> Tự rà soát một vòng: tìm "để trống", "chưa bật", "tạm dừng", "4–12", "đã đủ các môn", "16/10/2026" trong README.md, CLAUDE.md, docs/ và sửa câu không còn đúng. Chạy tests/e2e.js (phải in E2E OK), rồi mở Pull Request.

**Phiên S1 · Màn hình đăng nhập cho người mới**
> Đọc CLAUDE.md. Bản đám mây, màn hình đăng nhập (renderCloudLogin):
> - Thêm dòng "Chưa có tài khoản?" kèm chữ và link liên hệ. Thêm hai khóa tùy chọn `signupText`, `signupUrl` vào js/config.js; để trống thì dùng `contactText`, `contactUrl`.
> - Trình duyệt còn dữ liệu của bản lưu trên máy (`Store.localData()` có học sinh) mà chưa chuyển (`Store.migratedAt()` trống): hiện thẻ ngắn "Máy này còn dữ liệu ôn tập cũ. Đăng nhập tài khoản gia đình, rồi vào Khu phụ huynh → Dữ liệu → Chuyển dữ liệu máy này lên đám mây." Đã chuyển thì không hiện.
> - Sửa bước chờ service worker trong tests/supabase/cloud-e2e.js: thỉnh thoảng hết 30 giây vì trang chưa được service worker điều khiển; nếu chưa có controller thì tải lại trang một lần rồi chờ.
>
> Thêm kiểm tra vào cloud-e2e.js, chụp ảnh 360px sáng/tối màn đăng nhập. Chạy tests/e2e.js và tests/supabase/cloud-e2e.js đến khi in OK (cloud-e2e chạy 3 lần liền đều OK), chỉ tự rà soát một vòng, rồi mở Pull Request.

**Phiên R1 · Nút "Báo câu này sai"**
> Đọc CLAUDE.md. Sau khi K3 đã gộp.
> - **Giao diện:** nút nhỏ "Báo câu này sai" ở phần lời giải khi ôn luyện và ở từng câu trong màn kết quả. Bấm thì mở ô chọn lí do (Đáp án sai · Câu hỏi khó hiểu · Lỗi chính tả · Khác) và ô ghi chú ngắn (tối đa 200 kí tự), gửi xong hiện lời cảm ơn. Vùng bấm ≥ 44px.
> - **Nhận diện câu:** mã đề cộng mã câu ổn định (dùng mã câu sẵn có nếu K1–K3 đã thêm; không thì băm nội dung câu), lưu kèm bản chụp nội dung câu (tối đa 500 kí tự) để sau khi sửa đề vẫn biết câu nào bị báo.
> - **Bản đám mây:**
>   - Bảng mới `question_reports`: family_id, profile_id, bank_id, q_key, q_text, reason, note, status (`new` | `fixed` | `rejected`), created_at.
>   - RLS: gia đình chỉ thêm và đọc báo cáo của mình; chủ app đọc tất cả và đổi status. Trigger giới hạn 30 báo cáo mỗi ngày mỗi gia đình.
>   - Thêm vào supabase/schema.sql; viết `supabase/cap-nhat-r1.sql` cho project đã cài (như cap-nhat-k2.sql); cập nhật tests/supabase/rls-test.sql và fake-backend.js; ghi bước chạy vào docs/HUONG-DAN-SUPABASE.md.
> - **Trang admin:** tab "Câu bị báo": mới nhất trước, lọc theo đề, đếm số lần mỗi câu bị báo, nút "Đã sửa" / "Bỏ qua".
> - **Bản lưu trên máy:** lưu trong Store (trường mới, mặc định rỗng khi đọc dữ liệu cũ); Quản trị → Dữ liệu hiện danh sách và nút "Chép để gửi" (văn bản gọn để dán vào Zalo).
>
> Chạy tests/e2e.js, tests/supabase/admin-test.mjs, store-test.mjs, cloud-e2e.js và sh tests/supabase/run.sh đến khi in OK, chỉ tự rà soát một vòng, rồi mở Pull Request. Ghi trong Pull Request việc chủ app cần làm sau khi Merge (chạy cap-nhat-r1.sql).

**Phiên UX1 · Trang "Hôm nay" và màn kết quả của con** (dán kèm ghi chép của chủ app)
> Đọc CLAUDE.md và ghi chép của bố mẹ dưới đây. Sửa cho cả hai bản (lưu trên máy và đám mây):
> - **Thẻ "Hôm nay"** trên cùng trang chủ học sinh: 1–2 bài gợi ý (kì thi gần nhất có bài ôn; môn chưa làm trong 7 ngày; chủ đề hay sai), nút Bắt đầu to, chuỗi ngày ôn và mục tiêu tuần (ví dụ 5 ngày).
> - **Trang chủ gọn lại:** chia tab dưới màn hình (Hôm nay · Bài ôn · Lịch thi · Kết quả), hoặc thu gọn tương đương. Lịch thi của con chỉ có kì thi (bỏ mốc năm học); mỗi kì một nhãn "Còn N ngày".
> - **Màn kết quả:** điểm kèm lời khen hoặc động viên theo mức điểm; so với lần trước cùng đề; nút "Ôn lại câu sai" (chỉ làm lại các câu sai); danh sách câu sai thu gọn, bấm mới xem lời giải.
> - **Màn làm bài:** chỉ một dòng nhãn trên câu thay cho ba; câu điền mà mọi đáp án là số thì mở bàn phím số.
> - **Hồ sơ mới** tự lấy hình đại diện chưa có ai dùng.
> - **Nhãn dễ hiểu:** "Sẵn sàng x%" thành "Đã làm đúng x% bài ôn của kì này"; "điểm TB 30 ngày (/10)" thành "Điểm trung bình tháng".
> - **Phần thưởng nhẹ:** huy hiệu khi đạt chuỗi 3, 7, 14 ngày ôn và khi làm hết đề của một kì. Không có bảng xếp hạng công khai.
>
> Giữ vùng bấm ≥ 44px, chữ ≥ 13px, chế độ tối. Thêm kiểm tra vào tests/e2e.js và tests/supabase/cloud-e2e.js, chụp ảnh 360px sáng/tối trang chủ học sinh và màn kết quả, chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh.
>
> Ghi chép của bố mẹ: […]

**Phiên UX2 · Khu phụ huynh gọn lại** (dán kèm ghi chép của chủ app)
> Đọc CLAUDE.md và ghi chép của bố mẹ dưới đây. Bản đám mây, Khu phụ huynh:
> - Còn ba mục: **Các con** (mặc định) · **Lịch thi** (xem và sửa ngày ở cùng một chỗ; kì thi dự kiến có nút "Trường đã báo lịch? Sửa ngày") · **Cài đặt** (hồ sơ con, đề tự soạn (đổi tên từ "Ngân hàng đề"), chuyển dữ liệu và sao lưu, tài khoản). Không còn hai nút cùng tên "Lịch thi" làm hai việc khác nhau.
> - **Các con:** mỗi con một thẻ: hôm nay (số bài, điểm), chuỗi ngày, môn chưa ôn cho kì gần nhất. Chỉ hiện kì thi của các khối con đang học. Bỏ các ô số liệu trùng ý.
> - Bấm vào con thì mở thẳng phần báo cáo (tuần này, chủ đề hay sai, gợi ý, bài đã làm); lịch thi và danh sách bài của con thành link phụ.
> - Bản lưu trên máy: màn hình quản trị của thầy cô giữ nguyên; phụ huynh dùng phần "Các con" như trên.
>
> Thêm kiểm tra, ảnh 360px sáng/tối, chạy tests/e2e.js và tests/supabase/cloud-e2e.js, chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh.
>
> Ghi chép của bố mẹ: […]

**Phiên UX3 · Bắt đầu và chuyển máy cho con** (dán kèm ghi chép của chủ app)
> Đọc CLAUDE.md và ghi chép của bố mẹ dưới đây. Bản đám mây:
> - Thẻ "Bắt đầu" 3 bước trên mục Các con, hiện đến khi làm xong: thêm hồ sơ con → đặt PIN (không bắt buộc) → đưa máy cho con. Có nút to "Cho con học" mở màn hình "Ai đang học?".
> - Đổi chữ "Đổi người học" thành một tên dễ hiểu, dùng thống nhất mọi chỗ.
> - Sau lần đăng nhập đầu, hỏi "Đây là máy của nhà mình?": Có thì ghi nhớ đăng nhập, Không thì không ghi nhớ. Ô "Ghi nhớ trên máy này" vẫn giữ để đổi lại.
> - Trên máy đã ghi nhớ, bố mẹ có thể đặt mã 4–6 số để mở nhanh khu phụ huynh (băm và lưu trên chính máy đó; quên thì nhập mật khẩu). Đổi mật khẩu và đăng xuất vẫn cần mật khẩu.
>
> Thêm kiểm tra, ảnh 360px sáng/tối, chạy tests/e2e.js và tests/supabase/cloud-e2e.js, chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh.
>
> Ghi chép của bố mẹ: […]

**Phiên G1 · Kích hoạt gói, màn hình Nâng cấp, Điều khoản và Quyền riêng tư**
> Đọc CLAUDE.md, mục 9 của docs/THIET-KE-TAI-KHOAN.md và mục 5 của docs/KE-HOACH-NOI-DUNG.md. Sau khi D0 đã gộp (hạn mức gói đã chốt).
> - **Trang admin**, phần xem nhanh tài khoản: khối "Gói" (gói hiện tại, hạn, lịch sử từ plan_log) và nút "Kích hoạt gói" (chọn gói, hạn mặc định 31/8 của năm học, số tiền, ghi chú) gọi thao tác set_plan có sẵn.
> - **App, Khu phụ huynh:** màn hình "Nâng cấp" gồm quyền lợi theo bảng plans; giá đọc từ plans, không viết cứng trong code; ảnh QR chuyển khoản do chủ app đặt vào repo, cùng số tài khoản, tên người nhận, nội dung "ONUP <tên đăng nhập>" lấy từ js/config.js; nút nhắn Zalo soạn sẵn tin. Hiện hạn gói và nhắc trước 14 ngày. Không gọi dịch vụ bên ngoài để tạo QR.
> - **Hạn mức:** Store.can và bảng plans theo hạn mức đã chốt. Gia đình dùng thử từ trước được giữ quyền lợi theo chính sách đã chốt (cập nhật supabase/schema.sql, viết supabase/cap-nhat-g1.sql nếu đổi dữ liệu plans).
> - **Trang tĩnh** dieu-khoan.html và quyen-rieng-tu.html: nội dung khung theo Luật Bảo vệ dữ liệu cá nhân 2025 (app chỉ thu tên hiển thị, khối, lớp; phụ huynh tạo hồ sơ con), để chủ app sửa. Có link ở màn đăng nhập và Khu phụ huynh.
>
> Chạy đủ các bộ kiểm thử (e2e, admin-test, store-test, cloud-e2e, run.sh), chỉ tự rà soát một vòng, rồi mở Pull Request ghi việc chủ app cần làm sau khi Merge.

**Phiên B1 · Chuyển hosting sang Cloudflare Pages, repo riêng tư**
> Đọc CLAUDE.md và mục 5 của docs/KE-HOACH-NOI-DUNG.md. Viết docs/HUONG-DAN-CLOUDFLARE.md từng bước cho chủ app:
> 1. Tạo Cloudflare Pages từ repo (không có bước build, thư mục gốc).
> 2. Gắn tên miền riêng.
> 3. Chuyển repo OnUp sang riêng tư.
> 4. Tạo một repo công khai nhỏ cùng tên đường dẫn cũ, chỉ có trang báo "OnUp đã chuyển sang <địa chỉ mới>" và tự chuyển hướng, để gia đình mở địa chỉ cũ vẫn tìm được. Trang này gỡ service worker cũ trên máy học sinh.
>
> Kiểm tra trong code: mọi đường dẫn đều tương đối; phạm vi của sw.js, start_url của manifest, admin.html chạy đúng ở tên miền mới; Supabase không cần đổi gì (nếu cần thì ghi rõ). Sửa mục "Triển khai" của CLAUDE.md. Chạy tests/e2e.js và tests/supabase/cloud-e2e.js, chỉ tự rà soát một vòng, rồi mở Pull Request.

**Phiên B2 · Đề trả phí lên máy chủ**
> Đọc CLAUDE.md, mục 9 của docs/THIET-KE-TAI-KHOAN.md và mục 5 của docs/KE-HOACH-NOI-DUNG.md. Sau khi B1 đã gộp và repo đã riêng tư.
> - Đề thử (cờ free_trial: đề số 1 mỗi môn mỗi kì, hoặc theo hạn mức đã chốt) và bài ôn dạng trang vẫn là file tĩnh trong data/ và modules/. Câu hỏi của các đề còn lại chỉ nằm trong bảng paid_banks (supabase/banks-to-sql.js sinh SQL, chủ app chạy).
> - Danh mục đề (tên, số câu) vẫn công khai để vẽ danh sách và nút Nâng cấp. Câu hỏi đề trả phí tải từ paid_banks khi mở (RLS theo gói, Store.can("bank:<mã>")), lưu lại trên máy cho lần sau, mất mạng vẫn làm được đề đã tải.
> - Bản lưu trên máy chỉ có đề thử.
> - Gỡ câu hỏi đề trả phí khỏi data/; tests/kiem-tra-de.js kiểm cả SQL sinh ra.
>
> Chạy đủ các bộ kiểm thử, chỉ tự rà soát một vòng, rồi mở Pull Request ghi việc chủ app cần làm.

**Phiên N-IOE · IOE cấp quốc gia**
> Đọc CLAUDE.md, giữ nguyên ba chỗ nối của bài ôn với app và nút #endBtn khi đang làm một lượt. Trong modules/ioe-4/index.html và modules/ioe-6/index.html thêm lộ trình "National Level": khó hơn cấp tỉnh, có câu nghe, bắt đầu sau IOE cấp tỉnh (6/3/2027), thi 1–2/4/2027 (dự kiến), cùng cách chia 7 đề mỗi tuần như các lộ trình đang có. Câu tự soạn. Gắn ioe-4, ioe-6 vào kì thi ioe-qg trong data/calendar-2026-2027.js. Chạy tests/e2e.js, chỉ tự rà soát một vòng, rồi mở Pull Request.

**Phiên U1 · Nút xem mật khẩu và mã PIN** (đã xong, PR #35)
> Đọc CLAUDE.md. Thêm nút hình con mắt vào mọi ô mật khẩu và mã PIN (`input type="password"`), bấm để xem mình đã gõ gì, bấm lại để ẩn.
> - **Phạm vi** (12 ô):
>   - bản lưu trên máy: sPin, sPin2 (thiết lập lần đầu), pinIn (bàn phím PIN khi đăng nhập), uPin (form học sinh/phụ huynh), aOld, aNew (trang Tài khoản);
>   - bản đám mây: lPass (đăng nhập), pwOld, pwNew, pwNew2 (đặt và đổi mật khẩu), pwIn (Phụ huynh nhập lại mật khẩu), uPin (PIN hồ sơ con);
>   - admin.html: adPass.
>
>   Ô mật khẩu tạm ở trang admin đã hiện chữ sẵn, không cần thêm.
> - **Cách làm:**
>   - Viết một hàm dùng chung trong js/app.js (ví dụ wireReveal(root)), gọi sau khi vẽ mỗi màn hình có ô mật khẩu. Hàm tự tìm mọi ô type="password" trong màn hình, nên sau này thêm ô mới chỉ cần gọi hàm.
>   - admin.html tự chứa nên có bản riêng, cùng cách làm và cùng lớp CSS trong css/app.css.
> - **Nút:**
>   - `<button type="button">` nằm trong ô, sát cạnh phải; biểu tượng SVG vẽ trong code (mắt / mắt gạch chéo), không tải từ ngoài; màu theo token, rõ ở chế độ tối.
>   - Vùng bấm ≥ 44×44px. Ô thêm khoảng trống bên phải để chữ không chui dưới nút, và vẫn đủ rộng ở 360px.
>   - aria-label "Hiện mật khẩu"/"Ẩn mật khẩu" (ô PIN: "Hiện mã PIN"/"Ẩn mã PIN"), cùng aria-pressed.
> - **Khi bấm:**
>   - Đổi type giữa password và text, giữ nguyên giá trị, vị trí con trỏ, inputmode="numeric" của ô PIN, autocomplete.
>   - Giữ ô đang gõ trong trạng thái focus để bàn phím điện thoại không đóng lại.
>   - Riêng bàn phím PIN: khi hiện thì hàng chấm #pinDots cũng hiện chữ số đã gõ thay cho chấm.
> - **Tự ẩn lại** khi gửi form (đúng hay sai), khi xóa hết ô, và khi chuyển màn hình. Không lưu trạng thái hiện/ẩn ở đâu cả, không ghi giá trị ra console hay localStorage.
> - **Kiểm thử:**
>   - tests/e2e.js (thiết lập, đăng nhập PIN, form học sinh, trang Tài khoản): mỗi ô có nút; bấm thì type="text", aria-pressed="true", giá trị không đổi; bấm lại thì về password; gửi form xong về password; kiểm tra 360px vẫn qua.
>   - tests/supabase/cloud-e2e.js: lPass, pwNew, pwNew2, pwIn, adPass như trên.
>   - Ảnh 360px sáng/tối của màn đăng nhập (cả hai bản) và bàn phím PIN khi đang hiện số.
> - Ghi vào CLAUDE.md (mục Quy ước code): ô mật khẩu mới phải có nút xem.
>
> Chạy tests/e2e.js và tests/supabase/cloud-e2e.js đến khi in OK, chỉ tự rà soát một vòng, rồi mở Pull Request kèm ảnh.


**Phiên 9 · Sửa lỗi từ góp ý chạy thử**
> Đọc CLAUDE.md. Đọc các GitHub Issue đang mở của repo này (góp ý từ việc chạy thử với học sinh). Sửa từng issue trong một nhánh, mỗi issue một commit có ghi “Fixes #số”. Không thêm tính năng mới ngoài các issue. Chạy tests/e2e.js (và các bài kiểm thử Supabase nếu sửa phần đám mây), chỉ tự rà soát một vòng, rồi mở một Pull Request liệt kê issue đã sửa và issue chưa sửa được kèm lí do.

**Phiên 10 · Đề cuối kì I lớp 6 còn thiếu**
> Đọc CLAUDE.md. Tạo 4 ngân hàng câu hỏi trong data/banks.js cho “Kiểm tra cuối học kì I” lớp 6, mỗi bộ 25 câu, có chủ đề và lời giải: Tiếng Anh 6 Global Success (Unit 1–6; không dùng câu nghe), Giáo dục công dân 6, Tin học 6, Công nghệ 6 (sách Kết nối tri thức, phạm vi học kì I). Câu tự soạn, không chép sách. Gắn cả 4 bộ vào kì thi ck1-l6 trong data/calendar-2026-2027.js. Chạy tests/e2e.js, tự rà soát một vòng, rồi mở Pull Request.

**Phiên 11 · Đề cuối kì I lớp 4 còn thiếu**
> Đọc CLAUDE.md. Tạo 1 ngân hàng 25 câu “Tin học và Công nghệ 4 · Cuối kì I” trong data/banks.js (sách Kết nối tri thức, phạm vi học kì I, chia chủ đề Tin học và Công nghệ), có lời giải, câu tự soạn. Gắn vào kì thi ck1-l4. Chạy tests/e2e.js, tự rà soát một vòng, rồi mở Pull Request.

**Phiên 12 · Báo cáo tuần cho phụ huynh**
> Đọc CLAUDE.md. Thêm vào hồ sơ của con nút “Báo cáo tuần”: trang in được (CSS @media print) tóm tắt 7 ngày qua: số bài, điểm theo môn, chủ đề hay sai, kì thi sắp tới và gợi ý ôn tuần sau. Chạy được ở cả bản lưu trên máy và bản đám mây (chỉ đọc qua Store). Chạy tests/e2e.js và tests/supabase/cloud-e2e.js, rồi mở Pull Request kèm ảnh chụp 360px sáng/tối.

**Phiên 13 · IOE cấp tỉnh lớp 4**
> Đọc CLAUDE.md, giữ nguyên ba chỗ nối của bài ôn với app. Trong modules/ioe-4/index.html thêm lộ trình “Province Level” (Unit 1–10, câu khó hơn cấp xã, có câu nghe), bắt đầu sau IOE cấp xã, thi 4–6/3/2027, cùng cách chia 7 đề mỗi tuần như các lộ trình đang có. Thêm câu mới cho phần nâng cao, câu tự soạn. Gắn bài ioe-4 vào kì thi ioe-tinh trong data/calendar-2026-2027.js. Chạy tests/e2e.js, rồi mở Pull Request.

**Phiên 14 · Đề giữa kì II lớp 4**
> Đọc CLAUDE.md. Tạo 2 đề Toán 4 và 2 đề Tiếng Việt 4 “Kiểm tra giữa học kì II” trong data/banks.js (sách Kết nối tri thức, phạm vi nửa đầu học kì II), mỗi đề 25 câu, có chủ đề và lời giải. Tự tính lại mọi đáp án Toán bằng code. Gắn vào kì thi gk2-l4. Chạy tests/e2e.js, tự rà soát một vòng, rồi mở Pull Request.

**Phiên 15 · Đề giữa kì II lớp 6** (cũ, thay bằng N8–N12 trong [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md))
> Đọc CLAUDE.md. Tạo mỗi môn 1 đề 25 câu “Kiểm tra giữa học kì II” lớp 6 trong data/banks.js: Toán, Ngữ văn, KHTN (Kết nối tri thức), Tiếng Anh (Global Success, Unit 7–9). Có chủ đề và lời giải; tự tính lại đáp án Toán bằng code. Gắn vào kì thi gk2-l6. Chạy tests/e2e.js, tự rà soát một vòng, rồi mở Pull Request.

**Phiên 16–17 · Đề cuối năm** (cũ, thay bằng N13–N22 trong [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md))
> Đọc CLAUDE.md. Tạo đề “Kiểm tra cuối năm học” lớp [4 | 6] trong data/banks.js cho các môn của kì thi [ck2-l4 | ck2-l6] trong data/calendar-2026-2027.js, mỗi môn 1 đề 25 câu, phạm vi cả năm, có chủ đề và lời giải. Gắn vào kì thi đó. Chạy tests/e2e.js, tự rà soát một vòng, rồi mở Pull Request.
