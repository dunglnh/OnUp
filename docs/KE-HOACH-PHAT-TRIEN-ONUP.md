# Kế hoạch phát triển OnUp

> **Trạng thái (16/10/2026): đang chạy thử với học sinh.** Trang vẫn chạy bình thường ở https://dunglnh.github.io/OnUp/.
> **Khung quản lý tài khoản đã xong** (tên đăng nhập + mật khẩu, hồ sơ con, trang admin, khối lớp 1–12 dùng chung; Phiên A, B, C). Chưa làm bản trả phí — chỉ tính khi app có đủ đề lớp 4–12. Thiết kế: [THIET-KE-TAI-KHOAN.md](THIET-KE-TAI-KHOAN.md).

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

## 2. Trong thời gian chạy thử (việc của bố mẹ, không tốn lượt dùng)

1. Cho con dùng hằng ngày trên máy quen; mỗi tuần tải file sao lưu (Quản trị → Dữ liệu).
2. Khi trường báo lịch chính thức, sửa ngày trong Quản trị → Lịch thi.
3. **Ghi góp ý vào GitHub Issues** (repo → Issues → New issue), mỗi vấn đề một issue, kèm ảnh chụp màn hình nếu có. Ví dụ: “Câu 7 đề Toán 4 số 2 sai đáp án”, “Nút Kiểm tra khó bấm trên điện thoại”.
4. Bản đám mây (Phiên A, B, C) đã xong: máy chủ, màn hình đăng nhập, “Ai đang học?”, khu phụ huynh, và trang admin `admin.html` để tạo tài khoản gia đình (bước 6 của `docs/HUONG-DAN-SUPABASE.md`). Lưu ý `main` đang được bảo vệ: khi sửa `js/config.js` trên GitHub, chọn “Create a new branch… and start a pull request”, rồi tự Merge.

## 3. Lộ trình khi làm tiếp

Mỗi dòng là **một phiên Claude Code riêng**: mở claude.ai/code, chọn repo `dunglnh/OnUp`, dán lời giao việc, xem Pull Request rồi Merge. Phiên A, B, C lấy lời giao việc ở mục 8 của [THIET-KE-TAI-KHOAN.md](THIET-KE-TAI-KHOAN.md); Phiên 9a, 9b, 9c (lỗi tìm được khi dùng thử ngày 16/10, đã làm) và Phiên 9d (lỗi phát sinh khi rà soát lại ngày 17/10) ở mục 3 của [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md); **các phiên làm đề và kĩ thuật cho đề (N0–N25, K1–K3, chuẩn bị bán B1–B4) ở mục 6, 7 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md)**; các phiên khác ở mục 4 dưới đây.

| Ưu tiên | Nên xong trước | Phiên | Phục vụ |
|---|---|---|---|
| 1 | 1/11 | **Phiên 9 · Sửa lỗi từ góp ý chạy thử** (GitHub Issues) | Giữa kì I (2–13/11) |
| 1 | 1/11 | **Phiên N0a, N0b · Đề giữa kì I lớp 6 còn thiếu, Tiếng Anh 4 cuối kì I** ([KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md); N0a, N0b đã xong) | Giữa kì I (2–13/11) |
| 1 | 1/11 | **Phiên U1 · Nút xem mật khẩu và mã PIN** (lời giao việc ở mục 4) | Phụ huynh, học sinh gõ đúng mật khẩu, PIN |
| 2 | 30/11 | **Phiên K1–K3 · Tách dữ liệu đề, dạng câu mới, rút đề theo ma trận** | Đa dạng đề, đủ chỗ cho lớp 5–12 |
| 3 | 15/12 | **Phiên N1–N6 · Đủ đề cuối kì I lớp 4 và 6** | Cuối kì I (21/12–8/1) |
| 4 | 1/3 | **Phiên N7–N12 · Giữa kì II lớp 4 và 6** (thay Phiên 15 cũ) | Giữa kì II (15–26/3) |
| 5 | 10/4 | **Phiên N13–N22 · Cuối năm lớp 4 và 6** (thay Phiên 16–17 cũ) | Cuối năm (26/4–14/5) |
| 6 | 8/2027 | **Phiên B1–B4 · Chuẩn bị bán**; lịch 2027–2028; lớp 5, 7 | Năm học 2027–2028 |
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

**Để sau, chỉ làm khi có nhu cầu thật:** nhập đề từ Excel (Phiên 6 cũ); tự đăng ký, email để tự lấy lại mật khẩu, tài khoản giáo viên/lớp học (mục 7 bản thiết kế); **bản trả phí** (hướng đi ở mục 9 bản thiết kế; việc kĩ thuật cần làm trước ở mục 5 của [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md)). Đề lớp 5, 7–12 đã có thứ tự và số phiên dự kiến trong [KE-HOACH-NOI-DUNG.md](KE-HOACH-NOI-DUNG.md). Việc “bắt buộc đổi PIN cũ” không còn cần vì cách đăng nhập mới bỏ PIN học sinh trên máy chủ.

**Mẹo tiết kiệm lượt dùng gói Pro:**
- Một phiên một việc, giao việc rõ ràng. Phiên càng dài càng tốn, vì mỗi lượt Claude đọc lại toàn bộ cuộc trò chuyện.
- Chỉ yêu cầu **một vòng** tự rà soát; nhiều vòng rà soát và phiên “điều phối” nhiều trợ lý là phần tốn nhất trước đây.
- Mỗi việc lớn mở một cuộc trò chuyện mới thay vì nói tiếp trong cuộc cũ.
- Xem mức “This week” ở Settings → Usage trước khi mở phiên; giới hạn tuần làm mới mỗi thứ Sáu khoảng 13:00.
- Merge từng Pull Request trước khi mở phiên sửa cùng file.

## 4. Lời giao việc (dán nguyên vào phiên mới)

**Phiên U1 · Nút xem mật khẩu và mã PIN**
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
