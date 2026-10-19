# Cải tiến giao diện và trải nghiệm (bản 2.x, 18/10/2026)

Kết quả rà lại các luồng của app trên bản vẽ Figma và đối chiếu với [KE-HOACH-PHAT-TRIEN-ONUP.md](KE-HOACH-PHAT-TRIEN-ONUP.md). Trạng thái và thứ tự các phiên ghi ở mục 3 của file đó; lời giao việc ở mục 4. File này giữ phần mô tả: vấn đề, đề xuất, ảnh, điều kiện xong.

**Figma:** file [OnUp](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=70-2):
- **Master 1.x:** 77 màn vẽ lại đúng app ở commit `0a1e8db`, gồm Users 51 màn, Admin 26 màn.
- **🚧 Master 2.x · Đề xuất UX/UI:** mỗi flow một section, theo thứ tự ghi chú → 1.x hiện tại → 2.x đề xuất. Section cuối có các thành phần mới: icon, thanh tab dưới `.tabbar (2.x)`. Đây chỉ là đề xuất, chưa có trong code.

Phiên Claude Code không mở được Figma. Vì vậy ảnh chụp 1.x và 2.x đặt cạnh nhau ở [hinh-ux-2x/](hinh-ux-2x/), và lời giao việc trỏ vào các ảnh đó. Ảnh là hướng làm, không bắt giống từng điểm ảnh. Ghi chép chỗ khó dùng của bố mẹ (mục 2 của kế hoạch) đi trước ảnh khi hai bên khác nhau.

**Cách rà:**
- Đi hết các luồng trên 77 màn 1.x: vào app, trang chính của con, làm bài, kết quả, khu phụ huynh, quản lí đề, báo cáo tuần, trang admin.
- Mỗi chỗ vướng đều được dò lại trong code: `js/app.js`, `js/quiz.js`, `js/store-supabase.js`, `css/app.css`, `admin.html`.
- Màn 2.x dựng bằng component và biến màu của design system trong Figma, rộng 390px, không tràn ngang, đã kiểm cả chế độ tối.
- Tiêu đề hai dòng được chụp thêm bằng Chromium với `css/app.css` thật (X15).

**Phần đã tốt, giữ nguyên:**
- Chốt rời trang khi đang làm bài.
- Khóa PIN tính riêng từng người, chờ lâu dần.
- Nút xem mật khẩu.
- Chạy khi mất mạng.
- Vùng bấm ≥ 44px, chữ ≥ 13px.
- Màu theo token, có chế độ tối.

---

## 1. Tóm tắt

| Flow (section Figma) | Đã có trong kế hoạch, 2.x chỉ minh họa | Mới (mã vấn đề) | Phiên mới | Ảnh |
|---|---|---|---|---|
| [Vào app](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=71-48) | S1 (A1) | X1–X4 | **UX4** | [s1-dang-nhap](hinh-ux-2x/s1-dang-nhap.jpg), [ux4-nhap-pin](hinh-ux-2x/ux4-nhap-pin.jpg), [ux4-phu-huynh-hinh-dai-dien](hinh-ux-2x/ux4-phu-huynh-hinh-dai-dien.jpg) |
| [Trang chính của con](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=72-730) | UX1 (B1, B2) | — | — | [ux1-trang-chinh](hinh-ux-2x/ux1-trang-chinh.jpg) |
| [Làm bài](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=75-1327) | UX1 (một dòng nhãn), R1 (C2, C3) | X5–X9 | **UX5** | [ux5-lam-bai](hinh-ux-2x/ux5-lam-bai.jpg), [r1-ux5-bao-sai-mo-de](hinh-ux-2x/r1-ux5-bao-sai-mo-de.jpg) |
| [Kết quả đề](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=78-1495) | UX1 (D1) | X10 | **UX6** | [ux1-ux6-ket-qua](hinh-ux-2x/ux1-ux6-ket-qua.jpg) |
| [Khu phụ huynh](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=80-1697) | UX2 (E1, E3), UX3 (E2) | — | — | [ux2-ux3-khu-phu-huynh](hinh-ux-2x/ux2-ux3-khu-phu-huynh.jpg), [ux2-lich-thi](hinh-ux-2x/ux2-lich-thi.jpg) |
| [Quản lí đề](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=82-2135) | UX2 (tên “Đề tự soạn”) | X11–X13 | **UX7** | [ux7-chon-de](hinh-ux-2x/ux7-chon-de.jpg), [ux7-de-tu-soan](hinh-ux-2x/ux7-de-tu-soan.jpg) |
| [Báo cáo tuần](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=84-2729) | — | X14 | **UX8** | [ux8-bao-cao-tuan](hinh-ux-2x/ux8-bao-cao-tuan.jpg) |
| [Chữ và màu](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=84-2933) | — | X15, X16 | **UI1** | [ui1-tieu-de](hinh-ux-2x/ui1-tieu-de.jpg), [ui1-o-ma](hinh-ux-2x/ui1-o-ma.jpg) |

Mã vấn đề (X1, X2…) dùng trong lời giao việc và trong commit, như mã lỗi L1–L19 của [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md).

## 2. Đã có trong kế hoạch: 2.x chỉ minh họa

Các phiên này giữ nguyên lời giao việc, trừ UX3: đã bỏ màn hỏi “Đây là máy của nhà mình?”. Mục 4 của kế hoạch chỉ thêm một dòng “Thiết kế tham khảo” trỏ vào ảnh.

- **S1 · Màn hình đăng nhập cho người mới (A1):**
  - Thẻ nhắc “Máy này còn dữ liệu ôn tập cũ…” đặt trên form.
  - Thẻ “Chưa có tài khoản?” đặt dưới form, kèm link liên hệ.
- **UX3 · Bắt đầu và chuyển máy cho con:**
  - **Không làm màn hỏi “Đây là máy của nhà mình?”** (A2 cũ). Chủ app bỏ màn này ngày 18/10/2026. Màn đăng nhập giữ ô “Ghi nhớ trên máy này” và dòng giải thích như bản đang chạy; Figma đã xóa A2.
  - **E2:** thẻ “Bắt đầu trong 3 bước” thay cho ba ô số 0. Nút “Cho con học” mờ cho đến khi có hồ sơ con.
  - Tên mới của “Đổi người học” là **“Chọn hồ sơ khác”** (UX3 đã làm), dùng ở cả khu phụ huynh và trang tài khoản của con. UX3 cũng thêm mã mở nhanh 4–6 số của khu phụ huynh trên máy đã ghi nhớ: ô Phụ huynh ở “Ai đang học?” mở bàn phím mã, có link “Nhập mật khẩu”.
- **UX1 · Trang “Hôm nay” và màn kết quả:**
  - **B1:**
    - Thẻ “Hôm nay ôn gì?” có một việc chính với nút Bắt đầu to, thêm một việc phụ.
    - Chuỗi ngày ôn hiện các ngày T2–CN, kèm mục tiêu 5 ngày mỗi tuần.
    - Huy hiệu nhẹ.
    - Thanh tab dưới: Hôm nay · Bài ôn · Lịch thi · Kết quả. Thanh trên bỏ nút “Lịch thi”.
  - **B2:** lịch của con chỉ có kì thi, mỗi kì một nhãn “Còn N ngày”.
  - **C1:** khi làm bài, trên câu chỉ còn một dòng nhãn: môn · chủ đề.
  - **D1:** màn kết quả có:
    - lời khen theo mức điểm;
    - so sánh với lần trước cùng đề;
    - nút chính “Ôn lại 2 câu sai”;
    - danh sách câu sai thu gọn;
    - phần chủ đề chỉ hiện chỗ cần ôn thêm.
- **R1 · Nút “Báo câu này sai”:**
  - **C2:** link nhỏ có biểu tượng lá cờ, đặt dưới lời giải.
  - **C3:** bấm vào thì hộp chọn lí do mở ngay dưới lời giải, như kiểu `.confirm` đang có, không dùng hộp nổi. Hộp có:
    - bốn lí do;
    - ô ghi chú;
    - hai nút Gửi / Thôi.
- **UX2 · Khu phụ huynh gọn lại:**
  - **E1:** ba tab Các con · Lịch thi · Cài đặt. Mỗi con một thẻ, gồm:
    - ba ô: hôm nay, điểm trung bình tuần, chuỗi ngày;
    - một dòng “kì gần nhất còn N ngày · chưa ôn …”.
    - Bấm vào thẻ là mở báo cáo.
  - **E3:** lịch thi chỉ có kì của các khối con đang học. Kì dự kiến có “Trường đã báo lịch? Sửa ngày”, sửa ngay trong danh sách.
  - **F2:** tab “Đề tự soạn” nằm trong Cài đặt.

## 3. Vấn đề mới và đề xuất

### Phiên UX4 · Chọn hồ sơ và nhập PIN

![Nhập PIN: 1.x và 2.x](hinh-ux-2x/ux4-nhap-pin.jpg)

**X1. Ô nhập PIN nối dưới danh sách hồ sơ.**
- `pinBoxHTML()` nằm cuối `renderLogin` trong `js/app.js`.
- Ở 360×740, nhà có 2 con và ô Phụ huynh: vừa chạm một hồ sơ thì nút cuối của bàn phím ở khoảng 1.180px, dưới mép màn hình (U-05, U-07). Nhiều con hơn thì còn thấp hơn.
- `scrollIntoView` kéo trang xuống khoảng 460px, và hồ sơ vừa chọn trượt khỏi màn hình.

**X2. Mã PIN hiện hai lần.** Hàng chấm `#pinDots` và ô `#pinIn` (`type="password"`, có nút xem) cùng hiện số đã gõ.

**X3. Báo sai và đếm ngược nằm cuối khung.**
- `#pinErr` nằm dưới bàn phím, xa hàng chấm (U-05b).
- Đang phải đợi (`PinLock.wait(id) > 0`) mà bàn phím vẫn bấm được: số vẫn hiện thành chấm, đến khi gõ đủ hoặc bấm Vào mới hiện lại thông báo phải đợi.

**X4. Đổi hình đại diện phải bấm thêm “Lưu”.** Trong `renderCloudAccount` và `renderAccount` của học sinh, con chọn hình rồi rời trang mà quên bấm “Lưu” thì mất lựa chọn (U-26).

![Mật khẩu bố mẹ và hình đại diện: 1.x và 2.x](hinh-ux-2x/ux4-phu-huynh-hinh-dai-dien.jpg)

**Cách làm gợi ý:**
- **Bước nhập riêng (A3, A5).** Chạm hồ sơ có PIN thì danh sách được thay bằng màn nhập, gồm:
  - link “← Chọn hồ sơ khác” về lại danh sách;
  - hình to, tên, lớp, dòng “Nhập mã PIN của bạn”;
  - hàng chấm, nút chữ “Hiện số”, bàn phím ngay dưới;
  - dòng “Quên mã PIN? Nhờ bố mẹ đặt lại trong Khu phụ huynh → Hồ sơ con.” Bản lưu trên máy ghi: “Nhờ quản trị đặt lại trong Quản trị → Tài khoản.”

  Có thể cho bước nhập một đường dẫn riêng (ví dụ `#/vao/<mã>`) để nút Back của điện thoại quay về danh sách. Cách tương đương khác cũng được.

  Ô Phụ huynh của bản đám mây làm cùng kiểu, gồm:
  - hình, tên, tên đăng nhập;
  - ô mật khẩu (giữ nút xem);
  - nút to “Vào khu phụ huynh”;
  - dòng “Quên mật khẩu?” lấy từ `contactText`, `contactUrl`.

  Hồ sơ không có PIN thì chạm là vào, như hiện nay. Bản lưu trên máy (U-07) dùng chung bước này.
- **Một chỗ hiện số (X2).**
  - Giữ ô `#pinIn` để gõ bằng bàn phím máy tính và cho trình đọc màn hình, nhưng ẩn khỏi mắt, theo kiểu chỉ trình đọc màn hình đọc được. Không dùng `display:none`, vì các bộ kiểm thử gõ PIN bằng `page.fill("#pinIn")`.
  - Nút xem trở thành nút chữ “Hiện số” dưới hàng chấm, vẫn bật/tắt bằng `wireReveal`/`conceal`. Hiện nay:
    - `wireReveal` đặt nút mắt ngay sau ô;
    - `revealTry` (`tests/e2e.js`, `tests/supabase/cloud-e2e.js`) tìm `button.reveal-btn` có `<svg>` đứng sau ô.

    Vì vậy cần sửa `wireReveal` để nhận một nút đặt sẵn, sửa `revealTry` cho ô PIN, và ghi ngoại lệ này vào quy ước “nút xem” của CLAUDE.md.
- **Lỗi ngay dưới hàng chấm (X3).** Khi đang phải đợi:
  - bàn phím, nút Vào và nút Hiện số chuyển sang `disabled` (mờ);
  - hết giờ thì tự bật lại, kèm dòng “Bạn nhập lại được rồi.”

  Giữ nguyên `PinLock`, lượt thử lặng lẽ khi chưa biết độ dài (`probe`) và việc tự vào khi gõ đủ `pinLen`.
- **Chạm hình là đổi (A6, X4).**
  - Chạm một hình thì gọi `Store.updateUser` ngay, hiện toast “Đã đổi hình đại diện”, đổi luôn hình trên thanh trên. Bỏ nút Lưu.
  - Bản lưu trên máy: `renderAccount` dùng cho mọi vai trò và hiện lưu hình cùng PIN trong một form. Tách phần đổi mã PIN thành form riêng, với nút “Đổi mã PIN”.
  - Nút “Đổi người học” dùng tên mà UX3 đã chọn.

**Xong khi:** `tests/e2e.js` và `tests/supabase/cloud-e2e.js` có thêm các bước sau và vẫn in OK:
- Sau khi chạm hồ sơ có PIN:
  - trang không cuộn (`scrollY` = 0);
  - tên hồ sơ đang nhập và cả 12 nút bàn phím đều nằm trong khung nhìn: 740px ở `tests/e2e.js`, 760px ở `cloud-e2e.js`.

  Hiện nay chỉ đo nút cuối sau khi trang tự cuộn thì vẫn qua, nên phải kiểm cả hai điều trên.
- Không lúc nào vừa hiện hàng chấm vừa hiện ô nhập có chữ hoặc dấu chấm.
- Sai 5 lần thì nút bàn phím `disabled`, đếm ngược nằm trên bàn phím; hết giờ thì bấm được lại.
- Chạm hình đại diện thì `Store.user(id).avatar` đổi ngay, không phải bấm Lưu.
- `revealTry` vẫn qua. Có ảnh 360px sáng/tối của các màn A3–A6.

### Phiên UX5 · Làm bài tập trung

![Làm bài: 1.x và 2.x](hinh-ux-2x/ux5-lam-bai.jpg)

**X5. Đang làm bài vẫn có lối ra.** Thanh trên vẫn có link “Lịch thi” và hình đại diện (U-14, U-23). Con bấm nhầm thì gặp hộp hỏi rời bài của chốt rời trang. Không mất bài, nhưng làm con mất tập trung.

**X6. “← Thoát” mà thực ra là nộp bài.** Khi làm như thi, `#qzExit` ghi “← Thoát”, nhưng `confirmExit` hỏi “Nộp bài ngay? Câu chưa làm tính là sai.”

**X7. Đồng hồ không nói rõ.** `#qzTimer` hiện “01:42”: con không biết đó là thời gian còn lại hay thời gian đã qua.

**X8. Nút thừa sau khi kiểm tra.** Sau khi bấm Kiểm tra, `#qzSkip` (“Bỏ qua”) chỉ bị `disabled` nên vẫn nằm đó, mờ đi (U-15).

![Báo câu sai và mở đề: 1.x và 2.x](hinh-ux-2x/r1-ux5-bao-sai-mo-de.jpg)

**X9. Màn mở đề thiếu thông tin.**
- `renderQuiz` không cho biết lần trước con làm đề này được bao nhiêu.
- Hai cách làm chỉ khác nhau ở chữ trên nút: “Ôn luyện (xem đáp án từng câu)” và “Làm như thi · 40 phút” (U-12).

**Cách làm gợi ý:**
- **Chế độ tập trung (C1, X5).** Trong lúc làm đề ngân hàng, cả ôn luyện lẫn làm như thi:
  - thanh trên chỉ còn chữ OnUp;
  - ẩn link “Lịch thi”, hình đại diện, và cả thanh tab dưới nếu UX1 đã thêm. Có thể dùng một class trên `body` như cách `playing` của bài ôn trong khung.

  Chốt rời trang giữ nguyên: nút Back và tải lại trang vẫn hỏi. Trang kết quả có lại đủ thanh trên.

  `js/quiz.js` hiện chưa báo cho app biết lượt làm đã xong: `onFinish` không chạy khi chưa trả lời câu nào. Cần thêm một callback, ví dụ `opts.onEnd`, gọi ở mọi nhánh của `finish()`.
- **Nút Nộp bài (X6).**
  - Làm như thi: bỏ “← Thoát”, thay bằng nút “Nộp bài” (`btn ghost sm`, bên phải). Bấm vẫn hỏi như cũ. Chưa trả lời câu nào thì hỏi “Thoát đề?” như L15.
  - Ôn luyện giữ “← Thoát”.
- **Đồng hồ và tiến độ (X7).** Chip đồng hồ ghi “Còn 12:30”, có biểu tượng đồng hồ và `aria-label` “Thời gian còn lại”. Còn dưới 2 phút thì vẫn đổi màu như `.warn`. Tiến độ ghi “Câu 9/25”.
- **Sau khi kiểm tra (C2, X8).** Ẩn hẳn `#qzSkip`; “Câu tiếp” (hoặc “Xem kết quả”) đứng một mình bên phải.
- **Màn mở đề (C4, X9).**
  - Thẻ “Lần trước”: kết quả gần nhất của hồ sơ đang học với đề này, gồm số câu đúng, lúc làm, cách làm, thời gian. Chưa làm lần nào thì không có thẻ.
    - Lọc bằng `graded()`: kết quả tự chấm (`mode: "self"`) có cùng `refId` nhưng tính bằng phần tư điểm.
  - Hai thẻ chọn cách làm, mỗi thẻ cao ≥ 64px, có biểu tượng và một dòng giải thích:
    - “Ôn luyện”: “Xem đáp án và lời giải ngay sau mỗi câu. Không tính giờ.”
    - “Làm như thi · N phút”: “Tính giờ như ở trường, chấm điểm khi nộp bài.”
  - Đề không có `minutes` thì chỉ có thẻ Ôn luyện.
  - Phụ huynh xem thử thì giữ dòng “Chế độ xem thử: điểm không được lưu.”

**Xong khi:** `tests/e2e.js` có thêm các bước sau và vẫn in `E2E OK`:
- Trong lúc làm đề, thanh trên không có link Lịch thi, không có hình đại diện. Ở trang kết quả thì có lại.
- Làm như thi: có nút “Nộp bài”, không có “← Thoát”. Chip đồng hồ có chữ “Còn”.
- Sau Kiểm tra, không còn nút “Bỏ qua” nào hiện ra.
- Làm xong một lượt rồi mở lại đề thì thấy “Lần trước: x/y”.
- Vùng bấm ≥ 44px, có ảnh 360px sáng/tối các màn C1, C2, C4. `tests/supabase/cloud-e2e.js` vẫn in OK.

### Phiên UX6 · Biết bài đã gửi chưa (bản đám mây)

![Kết quả đề: 1.x và 2.x](hinh-ux-2x/ux1-ux6-ket-qua.jpg)

**X10. Không biết bài đã tới bố mẹ chưa.**
- Bản đám mây đưa kết quả vào hộp gửi trên máy (`ontap_cloud_outbox`) rồi mới gửi lên máy chủ (`sendOutbox` trong `js/store-supabase.js`).
- Toast “Đã lưu kết quả” giống hệt nhau dù đã gửi hay chưa.
- Mất mạng thì chỉ có một thông báo chung, một lần: “Chưa gửi được kết quả lên máy chủ…”. Sau đó không còn dấu hiệu nào.
- Bố mẹ xem trên máy khác thì không thấy bài con vừa làm và không biết vì sao. Con thì không biết bài của mình đang nằm chờ.

**Cách làm gợi ý:**
- **Kho dữ liệu.** Thêm hai hàm ở cả hai kho:
  - `Store.pendingResults(userId?)`: số kết quả còn trong hộp gửi của các hồ sơ thuộc tài khoản đang đăng nhập; bỏ trống `userId` thì đếm cả tài khoản. LocalStore trả 0.
  - `Store.sendPending()`: gọi `sendOutbox`, trả Promise. LocalStore trả `Promise.resolve()`.

  `tests/supabase/store-test.mjs` so danh sách hàm của hai kho.

  Chỉ gọi `changed()` khi số bài chưa gửi thay đổi. Lý do: `Store.onChange` vẽ lại cả trang (cuộn lên đầu, đóng `#evDetail`), mà `sendOutbox` còn chạy lúc mở app và mỗi khi có mạng lại.
- **Màn kết quả (D1, D2).** Sau khi lưu, app chờ lượt gửi xong (tối đa vài giây) rồi hiện một dòng trạng thái trong màn kết quả, kèm toast cùng ý:
  - đã gửi: “Đã lưu và gửi cho bố mẹ.” (nền `ok-soft`, chữ `ok`);
  - chưa gửi: “Đã lưu trên máy này. Sẽ gửi cho bố mẹ khi có mạng.” (nền `sun-soft`, chữ `ink`).

  `js/quiz.js` cần một chỗ trống trong màn kết quả để app điền dòng này, ví dụ `#qzSaved`. Bài ôn trong khung cũng ghi rõ như vậy trong toast “Đã lưu kết quả: x/y câu đúng”.
- **Bài chưa gửi (D3).** Khi `pendingResults() > 0`:
  - trang chính của con có dòng “N bài chưa gửi cho bố mẹ · Gửi lại”;
  - Khu phụ huynh trên cùng máy có dòng “N bài làm trên máy này chưa gửi đi · Gửi lại”.

  Dòng cao ≥ 44px, nền `sun-soft`, chữ `ink`. Bấm Gửi lại thì gọi `sendPending()`, rồi hiện toast “Đã gửi” hoặc “Chưa gửi được. App sẽ thử lại khi có mạng.”
- Bản lưu trên máy không có hộp gửi, giữ nguyên “Đã lưu kết quả”.

**Xong khi:** các bộ kiểm thử có thêm các bước sau và vẫn in OK:
- `store-test.mjs`: có kiểm tra `pendingResults`, `sendPending` ở cả hai kho.
- `cloud-e2e.js`:
  - Mọi lệnh gọi Supabase ở đây đi qua máy chủ giả (`exposeFunction`), không qua mạng, nên `context.setOffline` không làm lượt gửi lỗi được. Thêm vào `tests/supabase/fake-backend.js` một công tắc làm lượt gửi kết quả lỗi.
  - Bật công tắc, làm một đề: màn kết quả có “Sẽ gửi cho bố mẹ khi có mạng”, trang chính có “1 bài chưa gửi”.
  - Tắt công tắc, bấm Gửi lại: dòng biến mất, máy chủ giả có kết quả, màn kết quả lượt sau có “Đã lưu và gửi”.
  - Không dùng sự kiện `online` trong bước này: sự kiện đó cũng tự gửi lại, nên kết quả kiểm thử sẽ phụ thuộc vào việc bên nào chạy trước.
  - Có ảnh 360px sáng/tối.
- `tests/e2e.js` vẫn in `E2E OK`, và bản lưu trên máy không hiện các dòng mới.

### Phiên UX7 · Quản lí đề

![Chọn đề cho kì thi: 1.x và 2.x](hinh-ux-2x/ux7-chon-de.jpg)

**X11. Chọn đề cho kì thi trong một danh sách phẳng.**
- “Ngân hàng câu hỏi” trong `renderEventForm` liệt kê mọi `Store.banks()`: 29 đề có sẵn của lớp 4 và lớp 6 cộng đề tự soạn, mỗi đề một ô đánh dấu (U-37).
- Không tìm được, không nhóm theo môn, không biết đã chọn bao nhiêu.
- Bài ôn dạng trang nằm ở một khối riêng phía trên.

![Đề tự soạn và nhập đề: 1.x và 2.x](hinh-ux-2x/ux7-de-tu-soan.jpg)

**X12. Danh sách đề trộn lẫn.** Tab “Ngân hàng đề” là một danh sách dài trộn đề có sẵn của mọi khối với đề tự soạn. Đề tự soạn, thứ phụ huynh hay tìm nhất, lại nằm cuối cùng (U-38).

**X13. Nhập đề không xem trước được.**
- Nút “Kiểm tra” trong `renderBankForm` chỉ báo số câu theo dạng, cộng một danh sách lỗi “Câu N: …” và “Đoạn đọc N: …”. Không thấy câu sẽ hiện ra sao, đáp án nào được chấm đúng (U-39).
- Nhiều lỗi làm `Quiz.parse` bỏ hẳn câu đó, ví dụ dòng “Đáp số:” không phải số. Một số lỗi khác (mức độ, hình, thang chấm) vẫn lưu câu nhưng bỏ phần sai. Cả hai trường hợp, nút Lưu đều không hỏi lại.
- Lưu xong, toast bảo “Vào Lịch thi để gắn ngân hàng này vào kì thi”: phải sang tab khác, mở kì thi, tìm đề trong danh sách X11.

**Cách làm gợi ý:**
- **Sửa kì thi (F1, X11).**
  - Gộp hai khối thành một khối “Bài ôn và đề cho kì này”, có nhãn “N đã chọn”.
  - Mặc định chỉ hiện bài ôn và đề có khối nằm trong `grades` của kì thi. Đổi ô Khối thì danh sách đổi theo.
  - Nhóm theo môn bằng `<details>` với tóm tắt kiểu “Toán · 3/5 đã chọn”. Nhóm có mục đã chọn thì mở sẵn.
  - Ô “Tìm đề” lọc theo tên, không phân biệt dấu, theo từng từ: mọi từ gõ vào đều phải có trong tên. Ô tìm của `admin.html` so cả chuỗi, nên “toan de 2” không khớp “Toán 4 · Cuối kì I · Đề 2”.
  - Link “Hiện cả đề của khối khác”.
  - Mục đã chọn mà khác khối vẫn hiện, không mất lựa chọn cũ.
  - Mỗi dòng ô đánh dấu cao ≥ 44px.
- **Danh sách đề (F2, X12).** Áp dụng cho tab “Đề tự soạn” trong Cài đặt, hoặc tab “Ngân hàng đề” nếu UX2 chưa gộp:
  - Đề tự soạn lên đầu. Mỗi đề ghi kì thi đã gắn, hoặc “chưa gắn vào kì thi nào”.
  - Đề có sẵn chọn theo khối: tab khối lấy từ `gradeList()`, mặc định là khối của các con. Trong mỗi khối, đề nhóm theo môn, thu gọn, có ô tìm.
- **Nhập đề (F3, X13).**
  - Sau “Kiểm tra”, dưới dòng tóm tắt có danh sách xem trước từng câu, gồm:
    - dạng câu, chủ đề, câu hỏi;
    - đáp án được chấm đúng: trắc nghiệm đánh dấu lựa chọn đúng; điền khuyết, trả lời bằng số ghi các đáp án nhận được; đúng/sai, nối cột, sắp xếp ghi đáp án; tự luận ghi thang chấm;
    - hình vẽ qua `Quiz.svg`;
    - đoạn đọc, thu gọn.
  - Lỗi gắn vào thẻ của câu, hoặc của đoạn đọc, bị lỗi. `Quiz.parse` trả thêm mảng `issues`, ví dụ `[{n, msg, dropped}]` cho câu và `[{p, msg}]` cho đoạn đọc:
    - `n` là thứ tự câu trong văn bản dán vào, kể cả câu bị bỏ, đúng như số trong “Câu N:” hiện nay;
    - `dropped` cho biết câu có bị bỏ hẳn không.

    Giữ nguyên `errors` dạng chữ cho các chỗ đang dùng.
  - Bộ lọc “Tất cả · Cần sửa”.
  - Có lỗi mà bấm Lưu thì hỏi lại theo kiểu `.confirm`, nói đúng mức độ, ví dụ “1 câu sẽ không được lưu, 1 câu thiếu phần bị lỗi. Vẫn lưu?”
  - Thêm ô không bắt buộc “Gắn vào kì thi”: chọn một kì thi chưa qua của khối đã chọn. Lưu xong là đề hiện ở kì thi đó.

**Xong khi:** `tests/e2e.js` và `tests/supabase/cloud-e2e.js` có thêm các bước sau và vẫn in OK:
- Sửa kì thi lớp 4 chỉ hiện đề lớp 4; số đề hiện ra khớp `Store.banks()` của khối 4.
- Tìm “toan de 2” thì còn đúng các đề Toán có “Đề 2” trong tên. Bật “Hiện cả đề của khối khác” thì thấy đề lớp 6.
- Lưu kì thi giữ đúng các lựa chọn cũ, kể cả mục khác khối.
- Nhập đề có một câu lỗi: thẻ của câu đó có lỗi, bấm Lưu thì hỏi lại.
- Chọn “Gắn vào kì thi” thì kì thi có đề mới.
- Có ảnh 360px sáng/tối.

### Phiên UX8 · Gửi báo cáo tuần

![Báo cáo tuần: 1.x và 2.x](hinh-ux-2x/ux8-bao-cao-tuan.jpg)

**X14. Báo cáo tuần chỉ in được.**
- `renderReport` có một nút “In báo cáo” (`window.print()`).
- Trên điện thoại, bố mẹ muốn gửi cho ông bà, cô giáo hay người kia trong nhà qua Zalo. Hiện phải lưu PDF rồi gửi file, hoặc chụp nhiều ảnh màn hình (U-35).

**Cách làm gợi ý (G1):**
- Đầu trang có nút chính “Gửi báo cáo” và nút phụ “In”.
- Khối “Tin nhắn sẽ gửi” xem trước một tin nhắn chữ thuần, khoảng 600 chữ cái trở xuống, gồm:
  - tên con, khoảng ngày;
  - số bài, số ngày ôn, số phút;
  - điểm trung bình, so với tuần trước;
  - tối đa 3 chủ đề hay sai;
  - kì thi gần nhất: ngày, còn N ngày;
  - 1–2 gợi ý của `weekTips`, bỏ gợi ý đã nói về kì thi sắp tới (gợi ý thứ hai thường đã ghi “còn N ngày”);
  - dòng cuối “Gửi từ OnUp.”
- Bấm “Gửi báo cáo”:
  - máy có bảng chia sẻ thì gọi `navigator.share({ title, text })`, bọc try/catch; người dùng hủy thì thôi, không báo lỗi;
  - không có thì chép tin nhắn (`navigator.clipboard`; không được thì chọn sẵn chữ trong khối xem trước) và hiện toast “Đã chép tin nhắn. Dán vào Zalo hoặc tin nhắn để gửi.”
- Có thêm nút “Chép tin nhắn”.
- Tin nhắn không có tên đăng nhập, không có đường dẫn vào tài khoản, không có gì ngoài nội dung báo cáo.
- Khối xem trước không in ra (`noprint`). Làm cho cả hai bản.

**Xong khi:** `tests/e2e.js` và `tests/supabase/cloud-e2e.js` có thêm các bước sau và vẫn in OK:
- Báo cáo có khối tin nhắn, với số bài và điểm khớp các ô số liệu.
- Giả lập `navigator.share` (`page.addInitScript`) thì tin nhắn được truyền vào đúng.
- Không có `navigator.share` thì clipboard có tin nhắn.
- Bản in (`emulateMedia print`) không có khối xem trước.
- Có ảnh 360px sáng/tối.

### Phiên UI1 · Chỉnh nhỏ chữ và màu

![Tiêu đề hai dòng: 1.15 và 1.35](hinh-ux-2x/ui1-tieu-de.jpg)

**X15. Tiêu đề hai dòng chật.**
- `h1,h2,h3{line-height:1.15}` (`css/app.css` dòng 31).
- Baloo 2 có dấu thanh cao. Ở 360px, tiêu đề hay xuống dòng, và dấu của dòng dưới nằm sát dấu nặng và chân chữ g của dòng trên. Ví dụ:
  - tên đề ở màn mở đề: “Lịch sử và Địa lí 6 · Cuối kì I · Đề 1”;
  - tên kì thi trong khung “Kì thi tiếp theo” của trang chính: “Kiểm tra giữa học kì I”.

  Thẻ kì thi trong danh sách lịch ghi tên bằng chữ thường (`<b>`), nên không đổi.
- Bản in đã phải nâng lên 1.35 (dòng 313). Design system trên Figma cũng dùng 1.35.

![Ô mã trong thẻ nhắc](hinh-ux-2x/ui1-o-ma.jpg)

**X16. Ô mã chìm trong thẻ nhắc.**
- `.code` có nền `sun-soft` và nằm trong thẻ `.remind` cũng nền `sun-soft`.
- Ở trang admin (A-05), tên đăng nhập và mật khẩu tạm vừa tạo không nổi khung, khó thấy chỗ cần chép.

**Cách làm gợi ý:**
- `h1,h2,h3{line-height:1.35}` cho cả màn hình, giữ `text-wrap:balance`. Dòng `line-height` trong `@media print` thành thừa, có thể bỏ; giữ `break-after`.
- Thêm `.remind .code{background:var(--surface)}`.
- Phiên này sửa `css/app.css` và thêm một kiểm tra vào `tests/e2e.js`. Chạy cùng lúc với D0 được, vì D0 chỉ sửa tài liệu. Với phiên khác cũng sửa `tests/e2e.js`, ví dụ K3, thì Merge phiên đó trước.

**Xong khi:**
- `tests/e2e.js` in `E2E OK`.
- Thêm một kiểm tra: `line-height` tính ra của `h1` ≥ 1,3 lần cỡ chữ.
- Xem lại ảnh 360px sáng/tối trong `tests/screenshots/360/` và ảnh `admin-da-tao` của `tests/supabase/cloud-e2e.js`: không có chỗ nào vỡ, ô mã nổi khung.

## 4. Để sau

- **Bố mẹ đọc và chấm bài tự luận thay con.** Việc này cần lưu chữ con viết lên máy chủ, nên phải quyết định về dữ liệu của trẻ trước (CLAUDE.md: thu thập tối thiểu). Hiện con tự chấm theo thang, và kết quả tự chấm ghi riêng.
- **Thanh tab dưới cho Khu phụ huynh:** xem lại sau khi đã dùng ba mục của UX2 một thời gian.
