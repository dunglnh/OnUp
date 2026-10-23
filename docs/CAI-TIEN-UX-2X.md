# Cải tiến giao diện và trải nghiệm (bản 2.x, 18/10/2026)

Kết quả rà lại các luồng của app trên bản vẽ Figma và đối chiếu với [KE-HOACH-PHAT-TRIEN-ONUP.md](KE-HOACH-PHAT-TRIEN-ONUP.md). Trạng thái và thứ tự các phiên ghi ở mục 3 của file đó; lời giao việc ở mục 4. File này giữ phần mô tả: vấn đề, đề xuất, ảnh, điều kiện xong, và kết quả kiểm thử thiết kế sau khi mỗi phiên gộp (mục 5).

**Figma:** file [OnUp](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=70-2):
- **Master 1.x:** 77 màn vẽ lại đúng app ở commit `0a1e8db`, gồm Users 51 màn, Admin 26 màn.
- **🚧 Master 2.x · Đề xuất UX/UI:** mỗi flow một section, theo thứ tự ghi chú → 1.x hiện tại → 2.x đề xuất. Section cuối có các thành phần mới: icon, thanh tab dưới `.tabbar (2.x)`. Đây chỉ là đề xuất, chưa có trong code. Riêng section “Làm bài · Bảng số câu (9n)” vẽ theo code sau khi gộp Phiên 9n (PR #119), có sửa hai chỗ của kiểm thử thiết kế (X28, X29).

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
| [Vào app](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=71-48) | S1 (A1) | X1–X4 | **UX4** | [s1-dang-nhap](hinh-ux-2x/s1-dang-nhap.jpg), [ux4-nhap-pin](hinh-ux-2x/ux4-nhap-pin.jpg), [ux4-phu-huynh-hinh-dai-dien](hinh-ux-2x/ux4-phu-huynh-hinh-dai-dien.jpg), [kt-ux3-ma-mo-nhanh](hinh-ux-2x/kt-ux3-ma-mo-nhanh.jpg) |
| [Trang chính của con](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=72-730) | UX1 (B1, B2) | — | — | [ux1-trang-chinh](hinh-ux-2x/ux1-trang-chinh.jpg) |
| [Làm bài](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=75-1327) | UX1 (một dòng nhãn), R1 (C2, C3) | X5–X9 | **UX5** | [ux5-lam-bai](hinh-ux-2x/ux5-lam-bai.jpg), [r1-ux5-bao-sai-mo-de](hinh-ux-2x/r1-ux5-bao-sai-mo-de.jpg) |
| [Kết quả đề](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=78-1495) | UX1 (D1) | X10 | **UX6** | [ux1-ux6-ket-qua](hinh-ux-2x/ux1-ux6-ket-qua.jpg) |
| [Khu phụ huynh](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=80-1697) | UX2 (E1, E3), UX3 (E2) | X17–X20 (kiểm thử sau UX3) | **UX3b** | [ux2-ux3-khu-phu-huynh](hinh-ux-2x/ux2-ux3-khu-phu-huynh.jpg), [ux2-lich-thi](hinh-ux-2x/ux2-lich-thi.jpg), [kt-ux3-bat-dau](hinh-ux-2x/kt-ux3-bat-dau.jpg), [kt-ux3-dat-pin](hinh-ux-2x/kt-ux3-dat-pin.jpg), [kt-ux3-dang-xuat](hinh-ux-2x/kt-ux3-dang-xuat.jpg) |
| [Quản lí đề](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=82-2135) | UX2 (tên “Đề tự soạn”) | X11–X13 | **UX7** | [ux7-chon-de](hinh-ux-2x/ux7-chon-de.jpg), [ux7-de-tu-soan](hinh-ux-2x/ux7-de-tu-soan.jpg) |
| [Báo cáo tuần](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=84-2729) | — | X14 | **UX8** | [ux8-bao-cao-tuan](hinh-ux-2x/ux8-bao-cao-tuan.jpg) |
| [Chữ và màu](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=84-2933) | — | X15, X16 | **UI1** | [ui1-tieu-de](hinh-ux-2x/ui1-tieu-de.jpg), [ui1-o-ma](hinh-ux-2x/ui1-o-ma.jpg) |
| [Làm bài · bảng số câu](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=267-3035) | L38, L39 (flow của PO, [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md) mục 2) | X21–X27; X28, X29 (kiểm thử sau 9n) | **9nb**, **9o** (9n xong ở PR #119) | [9n-bang-so-cau](hinh-ux-2x/9n-bang-so-cau.jpg), [9n-xem-lai-bai-lam](hinh-ux-2x/9n-xem-lai-bai-lam.jpg), [9n-lam-tiep-sua-cau](hinh-ux-2x/9n-lam-tiep-sua-cau.jpg), [9o-bai-on](hinh-ux-2x/9o-bai-on.jpg), [kt-9n-xem-lai](hinh-ux-2x/kt-9n-xem-lai.jpg), [kt-9n-chu-thich](hinh-ux-2x/kt-9n-chu-thich.jpg) |

Mã vấn đề (X1, X2…) dùng trong lời giao việc và trong commit, như mã lỗi L1–L19 của [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md).

## 2. Đã có trong kế hoạch: 2.x chỉ minh họa

Các phiên này giữ nguyên lời giao việc, trừ UX3: đã bỏ màn hỏi “Đây là máy của nhà mình?”. Mục 4 của kế hoạch chỉ thêm một dòng “Thiết kế tham khảo” trỏ vào ảnh.

- **S1 · Màn hình đăng nhập cho người mới (A1):**
  - Thẻ nhắc “Máy này còn dữ liệu ôn tập cũ…” đặt trên form.
  - Thẻ “Chưa có tài khoản?” đặt dưới form, kèm link liên hệ.
- **UX3 · Bắt đầu và chuyển máy cho con:**
  - **Không làm màn hỏi “Đây là máy của nhà mình?”** (A2 cũ). Chủ app bỏ màn này ngày 18/10/2026. Màn đăng nhập giữ ô “Ghi nhớ trên máy này” và dòng giải thích như bản đang chạy; Figma đã xóa A2.
  - **E2:** thẻ “Bắt đầu trong 3 bước” thay cho ba ô số 0. Nút “Cho con học” mờ cho đến khi có hồ sơ con. Kết quả kiểm thử sau khi gộp ở mục 5, việc sửa thêm ở Phiên UX3b (mục 3).
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

### Phiên UX3b · Sửa sau kiểm thử UX3

Tìm được khi kiểm thử thiết kế sau khi gộp PR #56 (mục 5). Figma: [E2b, E4](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=80-1697) trong section Khu phụ huynh.

![Kiểm thử UX3: đặt mã PIN từ thẻ Bắt đầu](hinh-ux-2x/kt-ux3-dat-pin.jpg)

**X17. Đăng xuất chưa cần mật khẩu.**
- Lời giao việc UX3 ghi “Đổi mật khẩu và đăng xuất vẫn cần mật khẩu”, và ô mã mở nhanh ở trang Tài khoản cũng ghi đúng câu đó. Nhưng nút `#signOut` trong `renderCloudAccount` gọi `Store.signOut()` ngay.
- Vào khu phụ huynh bằng mã mở nhanh (`Store.checkQuickCode` mở khóa như vừa nhập mật khẩu), rồi Cài đặt → Tài khoản → “Đăng xuất khỏi máy này”: thoát ngay, không hỏi gì, mã bị xóa. Ai biết mã, ví dụ con nhìn bố mẹ gõ, cũng đăng xuất được tài khoản gia đình; lần sau bố mẹ phải nhập lại tên đăng nhập, mật khẩu và đặt lại mã.

**X18. Đặt mã PIN từ thẻ Bắt đầu xong thì lạc sang Cài đặt.**
- Link “Đặt mã PIN” của bước 2 (`startCard`; nhà một con: `#/admin/user/<mã>`) mở form sửa hồ sơ. Lưu xong, `renderUserForm` về Cài đặt theo quy ước của UX2 (sửa xong về Cài đặt). Thẻ Bắt đầu không còn trên màn hình; bố mẹ phải tự bấm tab Các con để làm bước 3.
- Mở từ thẻ mà ô “Mã PIN” không được focus: trên điện thoại bàn phím số không tự mở, bố mẹ phải chạm vào ô.

**X19. Bước 2 có ✓ khi mới một con có mã PIN.**
- `step(2, pinned.length > 0, …)`: nhà có Bin (có mã) và Na (không mã) thì bước 2 có ✓, ghi “Bin đã có mã PIN.” và không còn link. Bố mẹ không biết Na chưa có mã, trong khi bước này để “anh chị em không vào nhầm hồ sơ của nhau”.
- Nhà hai con trở lên thì link “Đặt mã PIN” mở Cài đặt (danh sách hồ sơ), chưa mở thẳng hồ sơ của con chưa có mã.

**X20. Chữ ở ô mã mở nhanh.**
- Dòng cuối có chữ kĩ thuật “(đã băm)” (CLAUDE.md: không thuật ngữ kỹ thuật trên màn hình).
- Máy chưa ghi nhớ đăng nhập: chữ bảo chọn “Ghi nhớ trên máy này” khi đăng nhập, nhưng bố mẹ đang đăng nhập rồi; chữ chưa nói phải đăng xuất trước.

![Kiểm thử UX3: mã mở nhanh và đăng xuất](hinh-ux-2x/kt-ux3-dang-xuat.jpg)

**Cách làm gợi ý:**
- **Đăng xuất hỏi mật khẩu (E4, X17).** Bấm “Đăng xuất khỏi máy này” thì hộp `.confirm` mở ngay dưới nút, không dùng hộp nổi. Hộp gồm:
  - “Đăng xuất khỏi máy này?” và dòng “Nhập mật khẩu của bố mẹ để xác nhận. Mã mở nhanh không dùng được ở đây.”;
  - ô “Mật khẩu của bố mẹ” (`type="password"`, nút xem qua `wireReveal`);
  - nút “Đăng xuất” và “Thôi”;
  - dòng “Quên mật khẩu?” lấy từ `contactText`, `contactUrl` như màn đăng nhập.

  Lúc nào cũng hỏi, kể cả khi vừa nhập mật khẩu: bố mẹ ít khi đăng xuất, một luồng thì dễ hiểu hơn. Kiểm bằng `Store.checkPassword` (có CAPTCHA như ô mật khẩu ở “Ai đang học?”). Hàm này hiện luôn đặt ô CAPTCHA vào `#pwCaptcha`, mà trên trang Tài khoản ô đó nằm trong form đổi mật khẩu: cho hàm nhận thêm chỗ đặt ô (mặc định vẫn `#pwCaptcha`) để ô CAPTCHA hiện trong hộp đăng xuất, nên phiên này sửa cả `js/store-supabase.js`. Đúng thì `Store.signOut()`; sai thì báo trong hộp và tính vào `PinLock` của Phụ huynh như sai mật khẩu ở “Ai đang học?”. Nút “Đăng xuất” ở màn đổi mật khẩu tạm (`#npOut`) và màn tài khoản bị khóa (`#bOut`) giữ nguyên: ở đó chưa vào khu phụ huynh, chưa có mã mở nhanh.
- **Đặt mã PIN từ thẻ (E2b, X18, X19).**
  - Link trong thẻ mở form hồ sơ của con với một dấu cho biết mở từ thẻ (ví dụ `?tu=batdau`, hoặc cách tương đương). Khi đó ô Mã PIN được focus và nằm giữa màn hình; lưu xong về Các con (`#/admin/overview`): có mã thì toast “Đã đặt mã PIN cho <tên>”, để trống ô mã thì toast như lưu bình thường. Nút quay lại của form mở từ thẻ cũng về Các con. Mở form từ chỗ khác thì giữ như UX2 (về Cài đặt).
  - Bước 2 có ✓ khi mọi con đã có mã. Còn con chưa có thì không có ✓, ghi “Bin đã có mã PIN. Na chưa có.” (chưa ai có thì giữ “Để anh chị em không vào nhầm hồ sơ của nhau.”), kèm link “Đặt mã PIN cho Na” mở thẳng form của con đầu tiên chưa có mã, kể cả khi nhà nhiều con.
  - Bước 3 và nút “Cho con học” giữ như UX3: bật khi đã có hồ sơ con, kể cả khi bước 2 chưa xong (mã PIN không bắt buộc).
- **Chữ (X20).**
  - Dòng cuối ô mã mở nhanh: “Mã chỉ lưu trên máy này, không gửi đi đâu; máy khác muốn dùng thì đặt riêng. Đăng xuất thì mã bị xóa.”
  - Máy chưa ghi nhớ: thay câu nhắc bằng “Máy này chưa ghi nhớ đăng nhập. Muốn đặt mã: bấm “Đăng xuất khỏi máy này”, rồi đăng nhập lại và chọn “Ghi nhớ trên máy này”.”
  - `tests/supabase/cloud-e2e.js` đang so đúng chữ cũ của ô này: sửa theo chữ mới.

**Xong khi:** `tests/supabase/cloud-e2e.js` kiểm các điều sau và vẫn in `CLOUD E2E OK`, cả lượt sáng và tối. Vài bước UX3 đang có phải sửa theo hành vi mới, không chỉ thêm bước:
- **Đăng xuất.** Bước đăng xuất đang có (bấm `#signOut` rồi chờ `#loginForm`) đổi thành: bấm nút → hộp hỏi mật khẩu hiện ngay dưới nút, chưa đăng xuất.
  - Sai mật khẩu: báo trong hộp, vẫn đăng nhập, số lần sai trong `PinLock` của Phụ huynh tăng một.
  - “Thôi”: hộp đóng, vẫn đăng nhập.
  - Đúng mật khẩu: về màn đăng nhập, `ontap_cloud_quick` không còn mã của gia đình.
  - `revealTry` có ô mật khẩu của hộp.

  Giữ bước này ở cuối luồng của máy gia đình: các tab dùng chung localStorage, đăng xuất ở một tab là mọi tab đều ra.
- **Thẻ Bắt đầu.** Kiểm tra đang có so bước 2 có ✓ khi Bin có mã, Na không mã: đổi thành bước 2 không có ✓, có chữ “Na chưa có”, link “Đặt mã PIN cho Na” mở hồ sơ của Na (so đường dẫn `#/admin/user/<mã của Na>`, bỏ phần `?…` nếu có). Bấm link: ô Mã PIN được focus; lưu có mã thì về `#/admin/overview`, toast “Đã đặt mã PIN cho Na”, bước 2 có ✓. Các bước sau đang vào hồ sơ Na không mã (chạm là vào) thì đổi theo, hoặc thử bước này bằng một hồ sơ khác.
- **Chữ.** Ô mã mở nhanh không có “băm”; máy chưa ghi nhớ có câu bảo đăng xuất rồi đăng nhập lại và chọn “Ghi nhớ trên máy này”.
- Có ảnh 360px sáng/tối của hộp đăng xuất và thẻ Bắt đầu khi hai con mà một con chưa có mã, chép sang `docs/hinh-ux3/`.

### Phiên UX4 · Chọn hồ sơ và nhập PIN

![Nhập PIN: 1.x và 2.x](hinh-ux-2x/ux4-nhap-pin.jpg)

**X1. Ô nhập PIN nối dưới danh sách hồ sơ.**
- `pinBoxHTML()` nằm cuối `renderLogin` trong `js/app.js`.
- Ở 360×740, nhà có 2 con và ô Phụ huynh: vừa chạm một hồ sơ thì nút cuối của bàn phím ở khoảng 1.180px, dưới mép màn hình (U-05, U-07). Nhiều con hơn thì còn thấp hơn.
- `scrollIntoView` kéo trang xuống khoảng 460px, và hồ sơ vừa chọn trượt khỏi màn hình.
- Ô Phụ huynh có mã mở nhanh (UX3) dùng chung bàn phím này nên vướng y như vậy: kiểm thử 19/10 đo trang tự cuộn 420px, ô Phụ huynh trượt một phần khỏi màn hình, mã hiện cả ở hàng chấm lẫn ô nhập ([kt-ux3-ma-mo-nhanh](hinh-ux-2x/kt-ux3-ma-mo-nhanh.jpg)).

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

  Máy đã đặt mã mở nhanh (UX3) thì bước của Phụ huynh mở bàn phím mã trước, cùng kiểu bước nhập PIN (A5b):
  - dòng “Nhập mã mở nhanh của máy này”;
  - hàng chấm theo độ dài mã (`Store.quickCodeLen()`), nút “Hiện số”, bàn phím ngay dưới;
  - dòng “Quên mã? Nhập mật khẩu” sang bước mật khẩu ở trên; bước mật khẩu có link “Dùng mã mở nhanh” quay lại.

  Giữ cách tính sai mã vào `PinLock` của Phụ huynh như UX3.

  ![Ô Phụ huynh có mã mở nhanh: app sau UX3 và A5b](hinh-ux-2x/kt-ux3-ma-mo-nhanh.jpg)

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
  - Nút “Chọn hồ sơ khác” (tên UX3 đã dùng) giữ nguyên.

**Xong khi:** `tests/e2e.js` và `tests/supabase/cloud-e2e.js` có thêm các bước sau và vẫn in OK:
- Sau khi chạm hồ sơ có PIN:
  - trang không cuộn (`scrollY` = 0), đo sau khi cuộn mượt đã dừng: đo ngay sau khi chạm thì vẫn ra 0 dù trang sắp cuộn (kiểm thử 19/10);
  - tên hồ sơ đang nhập và cả 12 nút bàn phím đều nằm trong khung nhìn: 740px ở `tests/e2e.js`, 760px ở `cloud-e2e.js`.

  Hiện nay chỉ đo nút cuối sau khi trang tự cuộn thì vẫn qua, nên phải kiểm cả hai điều trên.
- Không lúc nào vừa hiện hàng chấm vừa hiện ô nhập có chữ hoặc dấu chấm.
- Sai 5 lần thì nút bàn phím `disabled`, đếm ngược nằm trên bàn phím; hết giờ thì bấm được lại.
- Chạm hình đại diện thì `Store.user(id).avatar` đổi ngay, không phải bấm Lưu.
- Bản đám mây, máy có mã mở nhanh: chạm “Phụ huynh” thì trang không cuộn, cả 12 nút bàn phím mã nằm trong khung nhìn, số hàng chấm bằng độ dài mã; “Quên mã? Nhập mật khẩu” sang bước mật khẩu, “Dùng mã mở nhanh” quay lại; sai 5 lần thì bàn phím mã `disabled` như PIN của con.
- `revealTry` vẫn qua. Có ảnh 360px sáng/tối của các màn A3–A6 và A5b.

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

### Phiên 9nb · Sửa sau kiểm thử 9n

Tìm được khi kiểm thử thiết kế sau khi gộp PR #119 (mục 5). Figma: [C5–C8](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=267-3035) trong section Làm bài · Bảng số câu (9n), vẽ theo code, chú thích đã sửa theo hai mục dưới đây. Phiên ngắn: sửa `keyHtml` trong `js/quiz.js`, bước L38, L39 của `tests/e2e.js` và CLAUDE.md. Làm trước 9o, vì 9o vẽ cùng chú thích trong bài ôn dạng trang.

![Chú thích dưới bảng số câu: app sau 9n và Figma](hinh-ux-2x/kt-9n-chu-thich.jpg)

**X28. Mẫu ô ở chú thích không giống ô thật.**
- `keyHtml` vẽ mẫu ô là `<i class="qz-cell st-ok">✓</i>`: dấu nằm thẳng trong thẻ `<i>` mang lớp `.qz-cell`. Các quy tắc cho dấu (`.qz-cell i`: chữ đứng, màu `muted`; `.qz-cell.st-ok i`, `.qz-cell.st-bad i`: màu `ok`, `bad`) chỉ áp vào thẻ `<i>` nằm bên trong ô, nên không áp vào mẫu ô. Quy tắc `.qz-key .qz-cell i` có sẵn trong `css/app.css` cũng không áp vào đâu.
- Đo ở 360px: dấu –, ✓, ✗ của mẫu ô là chữ nghiêng (mặc định của `<i>`), màu `ink` (sáng #172029, tối #e8edf2). Dấu trong ô thật là chữ đứng, màu `muted`, `ok`, `bad`. Ở chế độ tối, ✓ và ✗ của chú thích thành chữ trắng trên nền xanh, nền cam, khác ô mà chú thích giải thích.

**X29. Chú thích ghi “Chưa làm (0)”.**
- `keyHtml` luôn ghi mục “Chưa làm” (`st === "blank" || cnt[st]`), đúng như mục thiết kế bên dưới từng ghi “luôn có Chưa làm”. Lỗi nằm ở thiết kế.
- Ở màn “Xem lại bài làm”, khi các câu còn trống đều là câu đã bỏ qua, dòng đầu ghi “Bạn còn 3 câu chưa làm.” mà chú thích ngay dưới ghi “Chưa làm (0)”. Con đọc thấy hai số trái nhau. Đề Tiếng Anh cũng vậy: “You have 2 questions left.” và “Not done (0)”. Gặp ở mọi lượt đi hết đề lần lượt, vì đi lần lượt thì không còn câu chưa mở. Ảnh `docs/hinh-9n/xem-lai-con-trong.jpg` của PR #119 cũng có.

**Cách làm gợi ý:**
- **Mẫu ô (X28).** Trong `keyHtml`, đặt dấu vào một thẻ `<i>` bên trong mẫu ô, như ô thật: `<i class="qz-cell st-skip" aria-hidden="true"><i>–</i></i>`. Các quy tắc có sẵn sẽ tự áp vào: dấu đứng, cùng màu với dấu trong ô, cỡ 13px (`.qz-key .qz-cell i`). Mẫu ô vẫn 18px, bo 5px, viền và nền như cũ. Không phải sửa `css/app.css`.
- **Chỉ ghi mục có câu (X29).** `keyHtml` bỏ ngoại lệ của “Chưa làm”: mục nào 0 câu thì không ghi. “Đang làm” giữ như cũ (khi bảng mở trên một câu). Mở bảng ở câu đầu của lượt thì chú thích vẫn là “Chưa làm (25)”, “Đang làm”.
- **Kiểm thử** (bước L38, L39 của `tests/e2e.js`):
  - chỗ so `eb.key === "Chưa làm (0)Đã trả lời (15)"` đổi thành `"Đã trả lời (15)"`;
  - màn “Xem lại bài làm” còn câu đã bỏ qua mà không còn câu chưa mở: chú thích không có “Chưa làm” (ôn luyện), không có “Not done” (đề Tiếng Anh);
  - mẫu ô: dấu nằm trong một thẻ `<i>` bên trong mẫu; `getComputedStyle` của dấu đó có `font-style: normal` và màu bằng màu dấu trong ô thật cùng trạng thái, ở cả sáng và tối.
- **CLAUDE.md:** câu “dòng chú thích `p.qz-key` chỉ ghi trạng thái đang có” ghi thêm: mục 0 câu không ghi, kể cả “Chưa làm”; mẫu ô có dấu trong thẻ `<i>` như ô thật.

**Xong khi:**
- `tests/e2e.js` in `E2E OK`, có ba kiểm tra trên.
- Ảnh 360px sáng/tối của bước L38, L39 chép lại sang `docs/hinh-9n/` (`bang-so-cau`, `xem-lai-con-trong`, `xem-lai-da-lam-het`): chú thích không còn “Chưa làm (0)”, dấu ✓, ✗ của chú thích cùng màu với ô.

### Phiên 9n, 9o · Bảng số câu và màn “Xem lại bài làm” (L38, L39)

Flow do PO viết ở [SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md), mục 2, “Phiên 9n” (chủ app yêu cầu 22/10/2026). Mục này là phần thiết kế cho flow đó: ảnh, cách trình bày, id, chữ. Khi rà flow có bảy chỗ chưa rõ (X21–X27); cách chốt đã ghi vào flow. Ảnh chụp bản mẫu ở 360px: `css/app.css` thật, câu hỏi vẽ bằng `Quiz.run` thật, bài ôn dạng trang thật (như X15). Ảnh là hướng làm, không bắt giống từng điểm ảnh. Phiên 9n đã làm phần đề ngân hàng (PR #119, kiểm thử ở mục 5). Figma: section [Làm bài · Bảng số câu (9n)](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=267-3035), vẽ theo code sau khi gộp (C5–C11, bản tối của C6, C7); bài ôn dạng trang (9o) chưa vẽ.

![Bảng số câu: hiện tại và đề xuất](hinh-ux-2x/9n-bang-so-cau.jpg)

**X21. Trùng id.** Flow đặt id màn mới là `#qzReview`. Nhưng id này đang là mục “Câu cần xem lại” của màn kết quả: `tests/e2e.js` đọc `#qzReview .rv-body` và so thứ tự `qzScore,row,qzReview,…`. Màn mới dùng `#qzRecap`.

**X22. Sửa câu từ màn “Xem lại bài làm” xong thì đi đâu.** Theo luật “Câu tiếp tới câu sau theo số câu”, sửa câu 7 xong thì phải bấm qua câu 8–25 mới về lại màn này để nộp. Cách khác là mở bảng tìm ô 25.

**X23. Lựa chọn chưa bấm “Trả lời” (làm như thi).**
- Con chọn B rồi chạm ô số khác: flow chưa nói B có được ghi không. Con nghĩ đã chọn là đã trả lời (như tô phiếu), nên mất B thì bất ngờ. Hết giờ hay bấm “Nộp bài” lúc đang chọn cũng vậy: hiện nay lựa chọn đó bị bỏ.
- Câu đã trả lời mở lại mà vẫn có nút “Bỏ qua”: bấm “Bỏ qua” để đi tiếp là xóa câu trả lời cũ.

**X24. Ôn luyện có hai lối kết thúc, tính câu chưa mở khác nhau.**
- “← Thoát” (như bây giờ): câu chưa tới không tính.
- “Xem kết quả” ở màn mới: hỏi lại “Còn 3 câu chưa làm, sẽ tính là sai”.

Có bảng số câu thì có câu chưa mở, vì con nhảy qua. Vậy phải chốt mỗi lối tính câu đó thế nào, và màn mới chỉ nên có một lối ra. Thêm một trường hợp: chưa trả lời câu nào mà bấm “Nộp bài” ở màn mới thì lời “sẽ tính là sai” không đúng. Khi đó app không lưu điểm (“Thoát đề?”).

**X25. Nút ở câu cuối ghi “Câu tiếp” mà lại tới màn “Xem lại bài làm”.**

**X26. Hàng trên cùng chật ở 360px.**
- Làm như thi: [Còn 08:40] [Câu 11/25 ▾] [Nộp bài] cần 335px mà khung có 328px. Từ câu 10, “Nộp bài” rớt xuống hàng thứ hai. Tiếng Anh cần 336px.
- Bài ôn dạng trang: thanh trên đã kín 328px (chữ của trang 184px, đồng hồ, chip “1 / 20”), chưa thêm được nút.

**X27. IOE thay câu nghe theo vị trí.** Máy không phát được tiếng thì `soundFailed()` làm như sau:
- đề thi thử: thay các câu nghe từ `S.i` trở đi;
- luyện tập: bỏ các câu nghe khỏi `S.qs`.

Có bảng số câu thì câu nghe đã bỏ qua có thể nằm trước `S.i`, và bỏ câu khỏi `S.qs` làm lệch `S.ans`, vốn ghi theo vị trí. Ngoài ra, mỗi lần vẽ câu nghe, `renderQ` đặt lại 3 lượt nghe, nên rời câu rồi quay lại là có thêm lượt.

![Màn “Xem lại bài làm”](hinh-ux-2x/9n-xem-lai-bai-lam.jpg)

**Thiết kế cho đề ngân hàng (9n, `js/quiz.js`, `css/app.css`):**
- **Nút mở bảng.** `#qzProg` đổi từ chip thành `button.btn.ghost.sm.qz-prog`, cao 44px như “Nộp bài”:
  - chữ `L.progress` (“Câu 9/25”, tiếng Anh “9 of 25”) và mũi tên xuống 16px màu `acc`;
  - `aria-expanded`, `aria-controls="qzGrid"`; mở thì viền `acc`, mũi tên quay lên.

  Hàng trên cùng: ôn luyện [← Thoát] … [Câu 9/25 ▾]; làm như thi [Còn 31:20] [Câu 9/25 ▾] … [Nộp bài]. Để vừa một hàng (X26), sửa trong `.qz-top`:
  - gap 8px;
  - chip đồng hồ padding 5px 10px, gap 4px;
  - nút “Nộp bài” padding 7px 10px;
  - nút mở bảng padding 7px 6px 7px 10px, gap 2px.

  Đo ở câu 11/25: tiếng Việt 313px, tiếng Anh 314px, trong khung 328px.
- **Bảng số câu.** `section.panel.qz-grid#qzGrid` (gap 12px) nằm ngay dưới `.qz-top`, trên `.bar`. Khi vẽ câu mới, bảng đóng sẵn.
  - Ô là `button.qz-cell`: số câu (`<b>`) ở dòng trên, dấu trạng thái (`<i aria-hidden="true">`, 13px) ở dòng dưới.
  - Lưới `repeat(auto-fill,minmax(48px,1fr))`, gap 8px, ô cao 48px, bo 10px. Ở 360px có 5 ô một hàng (52×48px); màn rộng hơn có nhiều ô hơn.
  - Nhóm ô có `role="group"` và `aria-label` “Bảng số câu”. Mỗi ô có `aria-label` “Câu 5, đã bỏ qua”; ô đang làm thêm “, đang làm” và `aria-current="step"`.
  - Dòng chú thích `p.qz-key`: mẫu ô 18px, tên trạng thái và số câu, như “Bỏ qua (2)”. Chỉ ghi trạng thái có câu, không ghi mục 0 câu, kể cả “Chưa làm” (X29); thêm “Đang làm” khi bảng mở trên một câu. Mẫu ô vẽ như ô thật: cùng viền, nền, dấu đứng cùng màu với dấu trong ô (X28). Chữ 13px màu `muted`, tự xuống dòng.

  Trạng thái phân biệt bằng viền và dấu, không chỉ bằng màu:

  | Trạng thái | Ô | Dấu | Chú thích (vi / en) |
  |---|---|---|---|
  | Chưa làm: chưa mở, hoặc mở rồi rời đi mà chưa trả lời | viền 1px `line`, nền `surface` | | Chưa làm / Not done |
  | Bỏ qua: đã bấm “Bỏ qua”, chưa làm lại | viền 2px nét đứt `muted` | – | Bỏ qua / Skipped |
  | Đã trả lời (làm như thi) | viền 2px `acc`, nền `acc-soft`, như ô đang chọn | | Đã trả lời / Answered |
  | Đã làm (ôn luyện, câu tự luận đã Xem gợi ý) | như Đã trả lời | | Đã làm / Done |
  | Đúng (ôn luyện, đủ điểm) | viền 2px `ok`, nền `ok-soft` | ✓ màu `ok` | Đúng / Correct |
  | Chưa đúng (ôn luyện, dưới 1 điểm, cả câu đúng một phần) | viền 2px `bad`, nền `bad-soft` | ✗ màu `bad` | Chưa đúng / Not correct |
  | Đang làm | thêm vòng ngoài `box-shadow: 0 0 0 2px var(--surface), 0 0 0 4px var(--ink)` | | Đang làm / Current |

  Làm như thi không hiện ✓, ✗ trước khi nộp.
- **Màn “Xem lại bài làm”** (`section.panel.qz-grid.qz-recap#qzRecap`, X21):
  - Tiêu đề `h2` “Xem lại bài làm” (1.25rem), một dòng chữ thường (“Bạn còn 3 câu chưa làm.” / “Bạn đã làm hết 25 câu. Xem lại hoặc nộp bài.”), bảng số câu và chú thích. Không có ô đang làm.
  - Dưới thẻ là `.row.between.qz-nav`:
    - còn câu trống: nút phụ `#qzEnd` (`btn ghost`: “Nộp bài” / “Xem kết quả”) bên trái, nút chính `#qzMore` “Làm tiếp 3 câu” bên phải, cùng chỗ với “Trả lời”, “Câu tiếp” ở màn câu hỏi;
    - đã làm hết (làm như thi): chỉ `#qzEnd` “Nộp bài”, là nút chính (`btn main`), bên phải.
  - Bấm `#qzEnd` khi còn câu trống thì hộp `.confirm` mở ngay dưới, trong `#qzFb`: “Còn 3 câu chưa làm, sẽ tính là sai.”, nút `#qzYes` (`btn danger`, chữ như `#qzEnd`) và `#qzNo` “Làm tiếp” (đóng hộp, ở lại màn này). Chưa trả lời câu nào thì hỏi như bây giờ (“Thoát đề?…”, X24).
  - Hàng trên cùng của màn này: làm như thi chỉ còn chip đồng hồ (vẫn chạy, vẫn đổi màu dưới 2 phút); ôn luyện không có hàng trên. Không có “← Thoát”, “Nộp bài” ở hàng trên, nút mở bảng, `.bar`: nút ở cuối màn là lối ra duy nhất (X24).

![Vòng làm tiếp, sửa câu, đề Tiếng Anh](hinh-ux-2x/9n-lam-tiep-sua-cau.jpg)

- **Đi giữa các câu** (X22):
  - Lượt đầu: “Bỏ qua”, “Trả lời”, “Câu tiếp” tới câu sau theo số câu, kể cả câu vừa nhảy tới bằng bảng (từ câu 20 thì tới câu 21). Qua câu cuối thì tới màn “Xem lại bài làm” hoặc màn kết quả, như flow.
  - Vòng làm tiếp: danh sách câu còn trống lúc bấm “Làm tiếp N câu”, theo số câu. Câu sau là câu kế tiếp trong danh sách, có số lớn hơn câu đang mở; hết danh sách thì về màn “Xem lại bài làm”. Nhãn `span.tag.warn.qz-left` “Câu còn trống 2/3” (vị trí trong danh sách) đứng đầu thẻ câu, chỉ trên câu của danh sách mà còn trống.
  - Câu mở từ màn “Xem lại bài làm”: xong câu đó (“Trả lời”, “Bỏ qua”, hay nút đi tiếp sau Kiểm tra) thì về lại màn đó; ôn luyện mà không còn câu trống thì ra kết quả. Từ câu đó chạm một ô khác trên bảng cũng vậy, cho đến khi bấm “Làm tiếp”.
  - Chạm ô thì tới câu đó, bảng đóng, trang cuộn lên đầu (`render()` đã `scrollTo(0,0)`). Câu có đoạn đọc chung thì đoạn đọc hiện lại, giữ trạng thái mở/thu gọn (`S.psgOpen`).
- **Ghi câu trả lời** (X23):
  - Làm như thi:
    - “Trả lời” ghi lựa chọn đang có rồi đi tiếp; chưa đủ thì báo như bây giờ.
    - “Bỏ qua” bỏ lựa chọn đang có, để trống câu, rồi đi tiếp. Nút này chỉ có ở câu chưa trả lời.
    - Câu đã trả lời mở lại thì vẽ sẵn câu trả lời cũ: ô đã chọn, chữ đã gõ, Đúng/Sai của 4 ý, cặp đã nối, thứ tự đã xếp, bài tự luận. Dưới câu có dòng `p.small.muted#qzEditNote` “Bạn đã trả lời câu này. Muốn sửa thì chọn lại rồi bấm Trả lời.”. Chỉ có nút “Trả lời”, bên phải. Chưa đủ thì báo lỗi không kèm đuôi “hoặc bấm Bỏ qua nhé.”.
    - Rời câu bằng bảng số câu: lựa chọn đã đủ thì ghi như bấm “Trả lời” nhưng không đi tiếp. Chưa đủ thì giữ câu trả lời đã ghi trước đó (nếu có). Câu tự luận để trống không tính là đã trả lời.
    - Nộp bài bằng mọi lối (nút, hết giờ, rời trang): câu đang mở mà lựa chọn đã đủ thì ghi trước khi chấm.
  - Ôn luyện:
    - Chỉ “Kiểm tra” (tự luận: “Xem gợi ý”) ghi câu trả lời. Rời câu bằng bảng thì bỏ lựa chọn chưa kiểm tra; câu giữ trạng thái cũ.
    - Câu đã Kiểm tra mở lại thì vẽ lại như ngay sau Kiểm tra: lựa chọn, đúng/sai, đáp án, lời giải, link báo câu sai. Tự luận hiện bài làm (chỉ đọc), gợi ý, thang tự chấm (vẫn chọn lại mức được). Chỉ có một nút đi tiếp.
    - Nên tách phần vẽ sau Kiểm tra thành một hàm, dùng cho cả hai chỗ.
- **Nút đi tiếp ghi tên màn sẽ tới** (ôn luyện, sau Kiểm tra; X25): “Câu tiếp” (câu khác), “Xem lại bài làm” (về màn mới, khi còn câu trống), “Xem kết quả” (không còn câu trống, kể cả câu mở từ màn mới). Làm như thi giữ “Trả lời”.
- **Kết thúc lượt** (X24):
  - Làm như thi: mọi lối chấm như bây giờ, câu còn trống tính sai.
  - Ôn luyện:
    - “Xem kết quả” ở màn mới tính mọi câu còn trống (bỏ qua và chưa làm) là sai, đúng như lời hỏi lại. Cách làm: ghi các câu đó như câu bỏ qua rồi gọi `finish()`.
    - “← Thoát” ở màn câu hỏi và rời trang: như bây giờ (câu bỏ qua tính sai, câu chưa làm không tính).
- **Thanh tiến độ** `.bar`: theo số câu đã trả lời hoặc đã Kiểm tra trên tổng số câu, không theo vị trí, vì giờ nhảy câu được.

**Chữ mới** (bảng `TXT`, cả hai cột; chuỗi có tham số viết là hàm):

| Khóa (gợi ý) | vi | en |
|---|---|---|
| `gridAria` | Bảng số câu | Question board |
| `cellAria(n, st, cur)` | Câu 5, đã bỏ qua(, đang làm) | Question 5, skipped(, current) |
| `st` (aria) | chưa làm · đã bỏ qua · đã trả lời · đã làm · đúng · chưa đúng | not done · skipped · answered · done · correct · not correct |
| `key` (chú thích) | Chưa làm · Bỏ qua · Đã trả lời · Đã làm · Đúng · Chưa đúng · Đang làm | Not done · Skipped · Answered · Done · Correct · Not correct · Current |
| `recapHead` | Xem lại bài làm | Review your answers |
| `recapLeft(n)` | Bạn còn 3 câu chưa làm. | You have 3 questions left. (1: “1 question”) |
| `recapAll(n)` | Bạn đã làm hết 25 câu. Xem lại hoặc nộp bài. | You have answered all 25 questions. Review or finish the test. |
| `doLeft(n)` | Làm tiếp 3 câu | Do the 3 left |
| `leftWarn(n)` | Còn 3 câu chưa làm, sẽ tính là sai. | 3 questions are not done and will count as wrong. (1: “1 question is …”) |
| `leftTag(i, n)` | Câu còn trống 2/3 | Left to do: 2 of 3 |
| `editNote` | Bạn đã trả lời câu này. Muốn sửa thì chọn lại rồi bấm Trả lời. | You have answered this question. To change it, choose again and tap Answer. |
| `backRecap` | Xem lại bài làm | Back to review |

Dùng lại khóa có sẵn: `progress`, `submit` (“Nộp bài” / “Finish test”), `seeResults`, `next`, `keepGoing`, `exNone`.

![Bài ôn dạng trang: bảng số câu, Xem lại bài làm](hinh-ux-2x/9o-bai-on.jpg)

**Thiết kế cho bài ôn dạng trang (9o):**
- **Số câu chuyển xuống màn làm bài (X26).** Bỏ chip “10 / 20” khỏi thanh trên (`#topRight` chỉ còn đồng hồ khi làm đề thi thử). Hàng đầu của màn làm bài là `.qtop`: thanh tiến độ co giãn bên trái, nút `#gridBtn` bên phải.
  - Nút: “Câu 10/20 ▾”, IOE “10 of 30 ▾”; viên thuốc cao 44px, viền `line`, mũi tên màu `--acc` của môn; mở thì viền `--acc`.
  - Bảng `#grid` (`.panel.qgrid`) ngay dưới, cùng kiểu ô, chú thích như 9n. Ô đã trả lời dùng `--pick`, `--pick-soft` (không theo màu của môn, như ô đang chọn).
  - Số đo lấy từ code của 9n sau 9nb (`.qz-cells`, `.qz-cell`, `.qz-cell.st-…`, `.cur`, `.qz-key` trong `css/app.css`; Figma C5–C8), chép vào CSS của trang. Chú thích theo X28, X29: mẫu ô như ô thật, không ghi mục 0 câu. Nên đặt tên lớp trạng thái như 9n (`st-blank`, `st-skip`, `st-ans`, `st-ok`, `st-bad`, `cur`) để kiểm thử đọc bảng của hai nơi theo một cách.
- **Màn “Xem lại bài làm” `#recap`.** Nút kết thúc của màn chính là `#endBtn` (“Nộp bài” / “Xem kết quả”, IOE “Finish test” / “See results”), đứng bên trái `#moreBtn` “Làm tiếp N câu”. Hỏi lại trong `#endArea` bằng `#yesEnd`, `#noEnd` như bây giờ. Đã làm hết thì `#endBtn` là nút chính, bấm là nộp. Như vậy:
  - app vẫn biết bài đang làm dở (hợp đồng: có `#endBtn` hoặc `#yesEnd`);
  - màn này không có hai nút nộp;
  - màn câu hỏi giữ `#endArea` (“Nộp bài sớm”, “Dừng luyện tập”…) như bây giờ.
- **Chữ.** Như 9n, viết thẳng trong trang. IOE viết tiếng Anh như bảng trên.
- **IOE (X27).**
  - `soundFailed()` thay mọi câu nghe chưa trả lời, ở mọi vị trí, bằng câu đọc. Luyện tập cũng thay như đề thi thử, không bỏ câu khỏi `S.qs`.
  - Số lượt nghe còn lại giữ theo từng câu (ví dụ `S.plays[i]`), rời câu rồi quay lại không có thêm lượt.
  - Câu đã Check thì nghe lại thoải mái như bây giờ.

**Kiểm thử thêm** (ngoài “Xong khi” của flow):
- 9n:
  - hàng trên cùng của làm như thi một hàng (cao 44px) ở 360px, ở câu từ 10 trở đi, cả đề Tiếng Anh;
  - ô bảng ≥ 44px, 5 ô một hàng ở 360px;
  - `#qzReview` chỉ có ở màn kết quả;
  - câu mở từ màn “Xem lại bài làm” xong thì về màn đó;
  - làm như thi: chọn rồi chạm ô khác thì câu thành “Đã trả lời” và điểm tính lựa chọn đó; câu đã trả lời không có “Bỏ qua”; chọn rồi để hết giờ thì câu đó được chấm;
  - ôn luyện: “Xem kết quả” ở màn mới tính câu chưa làm là sai; “← Thoát” giữa chừng không tính câu chưa tới;
  - mở lại từng dạng câu ở làm như thi (đề `thunghiem6-dang-cau-moi` có đủ dạng) thì thấy đúng câu trả lời cũ;
  - `audit` không báo chữ đè ở bảng và màn mới.
- 9o:
  - thanh trên của trang một hàng ở 360px;
  - chú thích dưới bảng không có mục 0 câu, dấu trong mẫu ô cùng màu với dấu trong ô (X28, X29);
  - IOE: máy không phát được tiếng thì câu nghe đã bỏ qua cũng được thay; rời câu nghe rồi quay lại không có thêm lượt nghe.

## 4. Để sau

- **Đánh dấu câu để xem lại trên bảng số câu** (như lá cờ của bài thi trên máy tính): làm sau khi con đã quen bảng số câu của 9n, 9o; hiện “Bỏ qua” đã dùng để để dành câu khó.
- **Bố mẹ đọc và chấm bài tự luận thay con.** Việc này cần lưu chữ con viết lên máy chủ, nên phải quyết định về dữ liệu của trẻ trước (CLAUDE.md: thu thập tối thiểu). Hiện con tự chấm theo thang, và kết quả tự chấm ghi riêng.
- **Thanh tab dưới cho Khu phụ huynh:** xem lại sau khi đã dùng ba mục của UX2 một thời gian.

## 5. Kiểm thử thiết kế sau khi gộp

Sau khi một phiên UX gộp vào `main`, người làm thiết kế kiểm lại trước khi giao phiên tiếp theo:
1. Chạy app ở 360px sáng và tối: bản đám mây trên máy chủ giả (như `tests/supabase/cloud-e2e.js`) hoặc bản lưu trên máy.
2. Đi lại từng ý trong lời giao việc của phiên (mục 4 của kế hoạch) và màn 2.x tương ứng trong Figma; chụp từng trạng thái, đặt cạnh Figma.
3. Ghi kết quả vào mục này: khớp, lệch so với yêu cầu, khác Figma nhưng chấp nhận.
4. Chỗ lệch thành mã X mới (tiếp theo X1–X16) và một phiên sửa ngắn tên “<phiên>b” ở mục 3. Chỗ khác Figma mà chấp nhận thì sửa Figma theo code.

Lượt kiểm thử không sửa code: chỉ ghi lại, rồi giao việc.

### UX3 · Bắt đầu và chuyển máy cho con · PR #56 · kiểm thử 19/10/2026

**Kết luận:** đạt phần lớn. Thẻ “Bắt đầu trong 3 bước”, nút “Chọn hồ sơ khác” và mã mở nhanh làm đúng lời giao việc và màn E2. Một ý chưa làm: đăng xuất chưa hỏi mật khẩu (X17). Thêm ba chỗ nhỏ trong luồng và chữ (X18–X20). Cả bốn giao cho Phiên UX3b (mục 3).

![Thẻ Bắt đầu: E2 và app sau UX3](hinh-ux-2x/kt-ux3-bat-dau.jpg)

| Yêu cầu (lời giao việc UX3, màn E2) | Kết quả | Ghi chú |
|---|---|---|
| Thẻ “Bắt đầu” 3 bước trên mục Các con: thêm hồ sơ con → đặt PIN (không bắt buộc) → đưa máy cho con | Khớp | Chữ, thứ tự bước, nút “+ Thêm hồ sơ con” trong thẻ đúng E2. Bước đang làm có số trên nền xanh, bước xong có ✓. Chưa có con thì mục Các con chỉ có thẻ này. |
| Thẻ hiện đến khi làm xong | Khớp | Thẻ ẩn khi một con đã chọn hồ sơ trên máy này hoặc đã có kết quả. |
| Nút to “Cho con học” mở “Ai đang học?”, mờ khi chưa có hồ sơ con | Khớp | Cao 55px (CSS tối thiểu 52px). Ở chế độ tối nút mờ khó nhận ra là đang tắt (xem “Ghi nhận” bên dưới). |
| Bước 2 “Đặt mã PIN” | Lệch nhỏ | Lưu mã xong thì lạc sang Cài đặt (X18); có ✓ khi mới một con có mã (X19). |
| Đổi “Đổi người học” thành một tên dễ hiểu, dùng thống nhất | Khớp | “Chọn hồ sơ khác” ở góc trên khu phụ huynh, trang Tài khoản của phụ huynh và của con. Code không còn chữ “Đổi người học”. |
| Mã mở nhanh 4–6 số trên máy đã ghi nhớ, lưu trên máy, quên thì nhập mật khẩu | Khớp | Chỉ đặt được khi máy ghi nhớ đăng nhập; mã băm, lưu theo gia đình trên máy, không lên máy chủ. Ô Phụ huynh ghi “Nhập mã mở nhanh”, có link “Nhập mật khẩu” và ngược lại “Dùng mã mở nhanh”. Sai 5 lần thì ô mật khẩu cũng phải đợi; đúng mã thì vào. Dòng Tài khoản ở Cài đặt có ghi “mã mở nhanh”. Chữ trên ô mã cần sửa nhỏ (X20). |
| Đổi mật khẩu vẫn cần mật khẩu | Khớp | Form đổi mật khẩu có ô mật khẩu hiện tại. |
| Đăng xuất vẫn cần mật khẩu | **Chưa làm** | Vào bằng mã mở nhanh rồi bấm “Đăng xuất khỏi máy này” là thoát ngay (X17), dù ô mã ghi “đăng xuất vẫn cần mật khẩu”. |
| Không có màn “Đây là máy của nhà mình?”; màn đăng nhập giữ ô Ghi nhớ và dòng giải thích | Khớp | Đăng nhập lần đầu, đổi mật khẩu tạm xong là vào thẳng khu phụ huynh. |
| 360px sáng/tối: không tràn ngang, vùng bấm ≥ 44px, chữ ≥ 13px | Khớp | 11 trạng thái đo ở 360px đều đạt, ảnh chụp cả sáng và tối; `cloud-e2e.js` đo cả hai chế độ. Không có lỗi JavaScript. |

**Khác Figma nhưng chấp nhận** (Figma đã vẽ theo code ở E2b):
- Nút “Cho con học” và dòng chú thích nằm trong thẻ; E2 vẽ dưới thẻ. Gọn hơn, giữ như code.
- Nút “Chọn hồ sơ khác” ở góc trên khu phụ huynh là nút viền; E2 vẽ nền xanh nhạt. Giữ như code.
- Thanh trên của phụ huynh vẫn có “Lịch thi”, cuối trang có dòng chú thích lịch thi; E1, E2 không vẽ hai thứ này. Đây là phần của UX2: nút đó về đúng tab Lịch thi, nên không còn hai nút cùng tên làm hai việc khác nhau.

**Đã biết, để UX4:** ô Phụ huynh có mã mở nhanh dùng chung bàn phím PIN, nên vướng cùng X1–X3: trang tự cuộn, số hiện hai lần, đang phải đợi vẫn bấm được. UX4 làm bước nhập mã riêng theo A5b (mục 3, Phiên UX4).

**Ghi nhận cho design system, chưa giao việc:** nút chính bị tắt (`.btn:disabled`, `opacity: .45`) ở chế độ tối thành một khối màu ô liu nổi rõ trên thẻ (3,2:1) trong khi chữ trên nút chỉ đạt 1,7:1, nên trông như một nút khác màu đang bấm được. Ở chế độ sáng thì nhạt rõ ràng. Nếu sửa: nút tắt dùng nền `--line`, chữ `--muted` thay cho làm mờ, áp dụng cho mọi nút chính, và sửa cùng component `.btn` (State=disabled) trong Figma.

**Kiểm thử tự động trên `main` sau khi gộp (`d121ca1`):**
- `tests/e2e.js`: E2E OK.
- `tests/supabase/cloud-e2e.js`: CLOUD E2E OK, 116 mục đạt ở hai lượt sáng và tối, trong đó có 4 kiểm tra UX3 mỗi lượt.
- `store-test.mjs`: SUPABASE STORE OK. `admin-test.mjs`: ADMIN OK.
- `sh tests/supabase/run.sh`: RLS OK, 205 kiểm tra. PR #56 chưa chạy bước này vì máy của phiên đó không có PostgreSQL.

### 9n · Bảng số câu và màn “Xem lại bài làm” · PR #119 · kiểm thử 23/10/2026

**Kết luận:** đạt. Bảng số câu, màn “Xem lại bài làm”, vòng làm tiếp, sửa câu khi làm như thi và chỉ xem lại khi ôn luyện làm đúng flow “Phiên 9n” ([SUA-LOI-CHAY-THU.md](SUA-LOI-CHAY-THU.md), mục 2) và mục thiết kế ở mục 3 (X21–X26). Còn hai chỗ nhỏ ở dòng chú thích dưới bảng: mẫu ô không giống ô thật (X28), và mục “Chưa làm (0)” trái với dòng đầu của màn “Xem lại bài làm” (X29, lỗi ở mục thiết kế). Cả hai giao cho Phiên 9nb (mục 3), làm trước 9o.

**Cách kiểm:**
- Chạy `Quiz.run` của `main` (`34aa512`) với `css/app.css` thật và đề có sẵn (Toán 4, Tiếng Việt 4, Tiếng Anh 4 · Cuối kì I), ở 360px sáng và tối; đi các luồng bằng chạm; đo bằng `getBoundingClientRect`, `getComputedStyle`.
- Đọc `js/quiz.js`, `css/app.css` của PR #119.
- Vẽ section [Làm bài · Bảng số câu (9n)](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=267-3035) trong Figma theo code, rồi đặt cạnh app.

![Màn “Xem lại bài làm”: app sau 9n và Figma C7](hinh-ux-2x/kt-9n-xem-lai.jpg)

| Yêu cầu (flow “Phiên 9n”, mục thiết kế) | Kết quả | Ghi chú |
|---|---|---|
| “Câu 9/25” là nút mở bảng ngay dưới hàng trên (`aria-expanded`, `aria-controls="qzGrid"`); mở thì viền `acc`, mũi tên quay lên | Khớp | Nút cao 44px. Bảng vẽ lại mỗi lần mở, đóng sẵn khi sang câu mới. |
| Ô ≥ 44px, 5 ô một hàng ở 360px; trạng thái bằng viền và dấu, không chỉ màu; ô đang làm có vòng ngoài; `aria-label` theo trạng thái | Khớp | Ô 52×48px. `aria-label` “Câu 5, đã bỏ qua”; ô đang làm thêm “, đang làm” và `aria-current="step"`. Làm như thi không hiện ✓, ✗. |
| Dòng chú thích dưới bảng | **Lệch nhỏ** | Dấu trong mẫu ô nghiêng, màu `ink` (X28). Luôn có “Chưa làm”, kể cả “Chưa làm (0)” (X29). |
| Bấm ô thì tới câu đó, bảng đóng, trang lên đầu; đoạn đọc hiện lại, giữ mở/thu gọn | Khớp | |
| Hàng trên cùng một hàng ở 360px từ câu 10, cả đề Tiếng Anh (X26) | Khớp | [Còn 31:20] [Câu 11/25 ▾] [Nộp bài] và “11 of 25” một hàng, cao 44px. |
| Làm như thi: mở lại câu đã trả lời thấy câu trả lời cũ, sửa được; dòng `#qzEditNote`; chỉ nút “Trả lời”; rời câu bằng bảng, nộp, hết giờ thì lựa chọn đã đủ được ghi (X23) | Khớp | `tests/e2e.js` mở lại đủ 7 dạng câu của đề thử nghiệm. |
| Ôn luyện: câu đã Kiểm tra mở lại chỉ xem lại; rời câu bằng bảng thì bỏ lựa chọn chưa Kiểm tra | Khớp | Câu mở từ màn “Xem lại bài làm” có một nút “Xem lại bài làm” (Figma C11). |
| Màn “Xem lại bài làm” `#qzRecap` (X21): tiêu đề, một dòng, bảng không có ô đang làm; còn câu trống thì [Nộp bài hoặc Xem kết quả] [Làm tiếp N câu]; làm như thi đã làm hết thì chỉ “Nộp bài”, là nút chính | Khớp | `#qzReview` chỉ còn ở màn kết quả. |
| Màn đó không có “← Thoát”, nút mở bảng, “Nộp bài” ở hàng trên, `.bar`; làm như thi hàng trên chỉ còn đồng hồ, vẫn chạy (X24) | Khớp | Rời trang vẫn hỏi lại. |
| Bấm nút phụ khi còn câu trống: hỏi lại ngay dưới (“Còn 3 câu chưa làm, sẽ tính là sai.”, `#qzYes` đỏ, `#qzNo` “Làm tiếp”); chưa trả lời câu nào thì “Thoát đề?” | Khớp | |
| Vòng làm tiếp chỉ gồm câu còn trống; nhãn “Câu còn trống 1/3” đầu thẻ câu; hết vòng về màn đó; câu mở từ màn đó xong là về màn đó (X22) | Khớp | |
| Nút đi tiếp sau Kiểm tra ghi tên màn sẽ tới (X25) | Khớp | “Câu tiếp”, “Xem lại bài làm”, “Xem kết quả”. |
| Ôn luyện: “Xem kết quả” ở màn mới tính câu còn trống là sai; “← Thoát” giữa chừng không tính câu chưa tới (X24) | Khớp | `tests/e2e.js` so dòng điểm của cả hai lối. |
| Thanh tiến độ theo số câu đã làm, không theo vị trí | Khớp | |
| Chữ mới ở cả hai cột `TXT`; đề Tiếng Anh không có chữ cái tiếng Việt | Khớp | “Review your answers”, “Do the 2 left”, “Left to do: 1 of 3”, “Back to review”. |
| 360px sáng/tối: không tràn ngang, vùng bấm ≥ 44px, chữ ≥ 13px, chữ không đè | Khớp | Mẫu ô 18px của chú thích không phải nút. `audit` của `tests/e2e.js` không báo gì. |

**Khác thiết kế nhưng chấp nhận** (Figma vẽ theo code):
- “Nộp bài” ở hàng trên khi còn câu trống hỏi “Nộp bài ngay? Còn 22 câu chưa làm, sẽ tính là sai.”. Thiết kế chỉ ghi lời hỏi lại có số câu còn trống; code ghép câu hỏi cũ với `leftWarn`. Rõ, giữ.
- Chạm ô của câu đang mở thì bảng đóng, ở lại câu đó. Thiết kế không nói; giữ.

**Figma:** section [Làm bài · Bảng số câu (9n)](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=267-3035), ngay dưới section Làm bài:
- C5: làm như thi, bảng mở ở câu 11. C6: ôn luyện, bảng mở ở câu 12.
- C7: màn “Xem lại bài làm” còn câu trống, đang hỏi lại. C8: làm như thi, đã làm hết.
- C9: vòng làm tiếp, câu có đoạn đọc. C10: làm như thi, sửa câu đã trả lời. C11: ôn luyện, câu đã Kiểm tra mở từ màn “Xem lại bài làm”.
- Bản tối của C6, C7.

Ba component mới ở Local Components: `.qz-cell` (State chưa làm, bỏ qua, đã trả lời, đã làm, đúng, chưa đúng × Current), `.qz-key item`, `.qz-prog` (Expanded). Chú thích ở C5–C8 vẽ theo X28, X29.

**Kiểm thử tự động trên `main` sau khi gộp (`34aa512`):**
- `tests/e2e.js`: E2E OK.
- `tests/supabase/cloud-e2e.js`: CLOUD E2E OK, 152 mục đạt ở hai lượt sáng và tối. PR #119 chỉ sửa chỗ đọc tiến độ ở đây (`#qzProg`); các luồng làm đề của bản đám mây kết thúc bằng “Nộp bài”, “← Thoát” hoặc làm hết mọi câu, nên chưa đi qua màn “Xem lại bài làm”.
- Không chạy `store-test.mjs`, `admin-test.mjs`, `run.sh`: PR #119 không sửa kho dữ liệu, trang admin, máy chủ.
