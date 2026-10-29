# Đề xuất giao diện 3.x (27/10/2026)

Bản 2.x (UX1–UX8, UI1, UI2, 9n, 9o và các phiên “b”) đã làm xong và đã kiểm thử thiết kế ([CAI-TIEN-UX-2X.md](CAI-TIEN-UX-2X.md), mục 5). Bản 3.x rà lại app để trả lời ba câu hỏi:
- con có biết mình đã ôn đến đâu không;
- bố mẹ làm được gì ngoài đọc báo cáo;
- app có nhắc được con ôn, nhắc bố mẹ ngày thi không.

**Figma:** trang [🚧 Master 3.x · Đề xuất UX/UI](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=329-2). Mỗi phiên một section, xếp theo thứ tự làm. Trong section là ghi chú rồi các khung 3.x, phần lớn khung có thêm bản tối:
- [UX9](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=329-12): K1–K3;
- [UX11](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=329-59): M1, M2;
- [UX10](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=329-36): L1, L2;
- [UX12](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=329-81): N1, N2;
- [UX14](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=329-126): P1–P3.

Khung vẽ bằng component và biến màu của design system. Thành phần mới (icon/target, icon/calendar-plus, `.bdg`, `.day-pick button`, `.wk-nav`, `.btn icon`, `.empty`) nằm ở section [3.x · Thành phần đề xuất](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=342-238). Phiên Claude Code không mở được Figma, nên lời giao việc trỏ vào ảnh ở [hinh-ux-3x/](hinh-ux-3x/).

File này giữ vấn đề, đề xuất, ảnh và điều kiện xong. Chủ app đã chọn phiên ngày 27/10/2026 (mục 3). Thứ tự, hạn và lời giao việc ở mục 3, 4 của [KE-HOACH-PHAT-TRIEN-ONUP.md](KE-HOACH-PHAT-TRIEN-ONUP.md); trạng thái chỉ ghi ở đó. Mã vấn đề nối tiếp bản 2.x: X38–X48; lượt kiểm thử thiết kế ngày 29/10/2026 thêm X49 (mục 6, Phiên UX9b).

**Cách rà:**
- Chạy `main` (`a739293`) bản lưu trên máy, ngày giả lập 27/10/2026 17:30, 360px sáng và tối. Dữ liệu mẫu: Bin lớp 4 làm 4 bài trong 6 ngày (Toán 4 · Giữa kì I · Đề 1, Đề 2, Đề ngẫu nhiên; Tiếng Việt 4 · Giữa kì I · Đề 1); Na lớp 6 chưa làm bài nào; Mẹ Bin là phụ huynh của hai con.
- Đi các màn: Hôm nay, Bài ôn, Kết quả, Lịch thi của con; màn kết quả đề; Các con, báo cáo tuần, lịch thi của bố mẹ.
- Ảnh đề xuất ở [hinh-ux-3x/](hinh-ux-3x/) là app thật, phần đề xuất chèn vào trang bằng `css/app.css` cộng vài lớp mới (ghi ở từng mục), nên phiên code làm theo được sát. Đã đo trong trang: không cuộn ngang, nút cao ≥ 44px, chữ ≥ 13px. Ảnh là hướng làm, không bắt giống từng điểm ảnh.
- Tên lớp, id mới đã tra trong `css/app.css`, `js/app.js`, `js/quiz.js` để không trùng (`.ck`, `.opts`, `.note`, `.remind` đã có, nên đề xuất dùng tên khác).

---

## 1. Tóm tắt

| Phiên | Mã | Việc | Đổi dữ liệu | File sửa | Ảnh |
|---|---|---|---|---|---|
| **UX9** · Con biết mình đã ôn đến đâu | X38–X40 | Bài ôn có tiến độ, đề đã làm có dấu ✓; huy hiệu có tiến độ; Hôm nay đã ôn; trang rỗng có hình | Không | `js/app.js`, `css/app.css` | [ux9-bai-on](hinh-ux-3x/ux9-bai-on.jpg), [ux9-hom-nay](hinh-ux-3x/ux9-hom-nay.jpg), [ux9-trang-rong](hinh-ux-3x/ux9-trang-rong.jpg) |
| **UX10** · Nhắc bằng lịch của điện thoại | X41 | Thêm kì thi vào lịch điện thoại; lời nhắc ôn bài lặp lại theo ngày, giờ | Không (file lịch tạo trên máy) | `js/app.js`, `css/app.css` | [ux10-lich-dien-thoai](hinh-ux-3x/ux10-lich-dien-thoai.jpg) |
| **UX11** · Bảng câu ở màn kết quả | X42 | Ô ✓ ✗ của mọi câu, chạm để xem lại câu đó | Không | `js/quiz.js`, `css/app.css` | [ux11-bang-cau](hinh-ux-3x/ux11-bang-cau.jpg) |
| **UX12** · Báo cáo các tuần trước, sửa nhỏ | X43–X45 | Chọn tuần ở báo cáo của con; ô “0 bài”; nút chính và nút viền cao bằng nhau | Không | `js/app.js`, `css/app.css` | [ux12-bao-cao-tuan](hinh-ux-3x/ux12-bao-cao-tuan.jpg) |
| **UX14** · Ôn 10 câu theo chủ đề | X48 | “Ôn 10 câu” từ chủ đề hay sai, rút từ các đề có sẵn của khối | Không (kết quả lưu như đề) | `js/app.js`, `js/quiz.js` | [ux14-on-chu-de](hinh-ux-3x/ux14-on-chu-de.jpg) |
| **UX9b** · Sửa sau kiểm thử UX9 | X49 | Dòng mô tả của bài ôn dạng trang đã làm không còn “. ·” | Không | `js/app.js` | [kt-ux9-bai-on](hinh-ux-3x/kt-ux9-bai-on.jpg) |

UX13 (bố mẹ giao bài, khen bài; X46, X47) chủ app quyết không làm, ngày 27/10/2026. Đề xuất của UX13 giữ ở mục 5.

**Thứ tự (chủ app chọn 27/10/2026):** UX9 → UX11 → UX10 → UX12 → UX14.
- UX10 xong trước kì kiểm tra cuối kì I. Lớp 6 thi từ 21/12/2026, nên lời nhắc trước 7 ngày phải có từ 14/12.
- UX14 làm sau UX12, để con ôn chủ đề hay sai trước kì cuối kì I.
- Hạn từng phiên: mục 3 của [KE-HOACH-PHAT-TRIEN-ONUP.md](KE-HOACH-PHAT-TRIEN-ONUP.md).
- Mỗi phiên một Pull Request. Không chạy cùng lúc hai phiên sửa `js/app.js` hay `js/quiz.js`. Phiên làm đề chỉ sửa `data/banks/`, nên chạy xen được.

## 2. Nguyên tắc giữ nguyên

- Không bảng xếp hạng, không so với bạn khác (có từ UX1).
- Điều hướng giữ như bây giờ: con có 4 tab, bố mẹ có 3 mục. Không thêm menu, không chuông thông báo có chấm đỏ. Tin mới cho con (sau này, như bài bố mẹ giao) hiện thành thẻ ở đầu trang Hôm nay.
- Mỗi màn chỉ một nút chính màu vàng cho việc nên làm tiếp.
- Danh sách xếp dọc. Ở 360px không dùng băng chuyền ngang, không cắt chữ bằng “…”, không có nút nổi đè lên nội dung.
- Trang chính không có quảng cáo, khuyến mãi; không có con số không giúp con ôn (lượt xem, số người học).
- Bài quá hạn không tô đỏ, không đếm ngược: chữ nhạt, lời nhẹ.
- Đề là bài làm ngay trong app, không phải file để xem.
- Thu thập tối thiểu (CLAUDE.md): không hỏi thêm gì về con.

## 3. Chủ app đã quyết (27/10/2026)

1. **Làm UX9, UX11, UX10, UX12, UX14, không làm UX13.** UX13 cần thêm bảng trên máy chủ (bài giao) và một cột (lời khen) ở cả hai kho. Đề xuất của UX13 giữ ở mục 5 để xem lại sau khi mời dùng thử.
2. **Lời dặn khi giao bài:** không cần quyết nữa, vì chỉ UX13 có lời dặn.
3. **UX14 làm trong đợt này,** sau UX12, không đợi “Ôn theo bài từ ngân hàng” của đợt rà sách 2027.
4. **UX10 vẫn cần thử trên máy thật.** File lịch (.ics) phải mở được trên iPhone, cả trong Safari lẫn khi app đã thêm vào Màn hình chính, và trên Android. Chủ app thử trước khi Merge.

## 4. Vấn đề và đề xuất theo phiên

### Phiên UX9 · Con biết mình đã ôn đến đâu

Khung Figma ([section UX9](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=329-12)): K1 là tab Bài ôn, K2 là Hôm nay đã ôn, K3 là tab Kết quả chưa có bài. Cả ba khung có bản tối.

![Tab Bài ôn: hiện tại và đề xuất](hinh-ux-3x/ux9-bai-on.jpg)

**X38. Tab Bài ôn không cho biết bài nào đã làm.**
- Mọi nút đề cùng màu vàng, đã làm hay chưa cũng như nhau. Con lớp 4 không biết còn bài nào, và nút nào cũng như nút nên bấm (`practiceList`).
- Nhóm kì thi chỉ ghi “5 bài ôn”, không ghi đã làm mấy bài (`practiceGroups`).
- Thẻ kì thi ghi “Đã làm đúng 82% bài ôn của kì này”. Câu này đọc như “82% số bài”, nhưng thật ra là tỉ lệ câu đúng của các lần làm trong 28 ngày (`readiness`).

![Trang Hôm nay: hiện tại và đề xuất](hinh-ux-3x/ux9-hom-nay.jpg)

**X39. Huy hiệu không có mục tiêu gần.**
- Ba huy hiệu chuỗi ngày là ba chip xám như nhau cho đến khi đạt; chỉ có một dòng gợi ý cho huy hiệu chuỗi kế tiếp.
- “Hết đề · <kì thi>” chỉ hiện khi đã đạt. Bin còn 2 bài là đạt mà không thấy ở đâu, dù đó là mục tiêu gần nhất trong tuần thi.

**X40. Không có điểm dừng trong ngày; trang rỗng chỉ có một dòng chữ.**
- Con làm xong bài hôm nay, thẻ “Hôm nay ôn gì?” vẫn là nút Bắt đầu to cho bài khác. Ngoài chuỗi ngày, không có gì ghi nhận việc vừa làm, cũng không có chỗ để dừng.
- Tab Kết quả của con mới có ba ô “0 · – · 0” và dòng “Chưa có kết quả. Làm một bài ôn để bắt đầu.”
- Dòng “Chưa có bài ôn cho mục này. Quản trị viên có thể nhập ngân hàng câu hỏi trong mục Quản trị.” (`practiceList`) và “Quản trị viên có thể nhập thêm đề trong mục Quản trị.” (`renderToday`) hiện cả cho con và cho bố mẹ bản đám mây, nơi không có mục Quản trị.

![Tab Kết quả khi chưa có bài: hiện tại và đề xuất](hinh-ux-3x/ux9-trang-rong.jpg)

**Cách làm:**
- **Tiến độ của một kì thi (X38).** Một hàm dùng chung, ví dụ `progressOf(e, s, results)`, trả `{ done, total, p }`:
  - `total`: bài ôn dạng trang và đề cố định của kì cho khối của con, như `practiceCount` (đề ngẫu nhiên không tính);
  - `done`: số bài trong đó con đã có kết quả, mọi lần, kể cả kết quả tự chấm (đề toàn tự luận chỉ có kết quả tự chấm);
  - `p`: tỉ lệ câu đúng của lần làm gần nhất của mỗi bài đã làm, kể cả đề ngẫu nhiên, chỉ tính kết quả chấm tự động (`graded`). Chưa có thì `null`.

  Dùng ở bốn chỗ, cùng chữ, cùng số:
  - tóm tắt nhóm kì thi;
  - thẻ kì thi (`.ready`): “Đã làm 3/5 bài ôn · đúng 82%”, chưa làm bài nào thì không ghi;
  - link ở thẻ Hôm nay: “Bài ôn cho kì này · đã làm 3/5 →” (chưa làm bài nào: giữ “Tất cả bài ôn cho kì này · 5 bài ôn →”);
  - huy hiệu “Hết đề” (X39).
- **Tóm tắt nhóm kì thi (X38).** Có bài đã làm thì dưới dòng ngày thêm `span.grp-prog`:
  - dòng `.prog-txt` “Đã làm **3/5** bài · đúng 82%”;
  - thanh `.bar` cao 6px, phần tô là `done/total`, `role="img"`, `aria-label` “Đã làm 3 trên 5 bài”;
  - làm hết thì `.bar.good` và chữ “Đã làm hết 5 bài · đúng 85%”.

  Chưa làm bài nào thì không có dòng này.
- **Nút đề đã làm (X38).** Đề cố định con đã làm (như `done` ở trên):
  - nút thành `btn sm done`: nền trong, viền 1px `line`, chữ `ink`, đậm 600, đệm 7px 10px, khoảng cách 4px;
  - trước chữ có dấu “✓” (`span.done-ic`, màu `ok`, đậm 700, `aria-hidden`), như dấu trong ô của bảng số câu. Không đặt tên lớp `.ck`: lớp này đã có (dòng ô đánh dấu, cao 44px), đặt vào nút thì nút cao lên 60px;
  - `aria-label` thêm “, đã làm, lần gần nhất đúng 76%”.

  Đề chưa làm giữ `btn main sm`. Đề ngẫu nhiên luôn là nút vàng, vì mỗi lần ra một đề khác. Bài ôn dạng trang đã làm: nút “Vào ôn” cũng thành `done`, dòng mô tả thêm “ · đã ôn 3 lần”.
- **Dòng môn (X38).** Đã làm ít nhất một đề của môn thì ghi “Đã làm 2/2 đề · 25 câu mỗi đề” (bỏ phần đề ngẫu nhiên cho gọn); chưa làm đề nào thì giữ như cũ. Hàng “Đề ngẫu nhiên · ✓ Đề 1 · ✓ Đề 2” vừa một hàng ở 360px (298px trong nhóm).
- **Bố mẹ xem thử (X38).** Trang “Bài ôn của <tên>” (`renderChildPractice`) có ✓ và dòng tiến độ theo bài của con đó. Nút vẫn ghi “Xem thử”, chỉ đổi kiểu thành `done`. Chi tiết kì thi trên lịch của bố mẹ không có ✓, vì không biết đang xem cho con nào.
- **Huy hiệu (X39).** `#badges` thành `.bdg-list`, tối đa hai mục tiêu kế tiếp, mỗi mục là một `.bdg` (biểu tượng, tên đậm 15px, số 14px màu `muted`, thanh `.bar` 6px bên dưới):
  1. “🎯 Hết đề · <kì thi gần nhất có bài ôn>” · “3/5 bài” (theo `progressOf`);
  2. huy hiệu chuỗi đầu tiên chưa có (3, 7, 14 ngày) · “2/3 ngày” (chuỗi hiện tại trên số ngày của huy hiệu).

  Phía dưới:
  - Huy hiệu đã có nằm trong một hàng `.bdg-got`: chữ “Đã có:” rồi các `span.badge.on` như cũ. Chưa có huy hiệu nào thì không có hàng này.
  - `#badgeHint` ghi cả hai mục tiêu, ví dụ “Ôn thêm ngày mai là có “Chuỗi 3 ngày”. Làm thêm 2 bài của kì này là có “Hết đề”.”
  - Dòng chúc mừng huy hiệu mới (`#newBadge`) giữ nguyên.
- **Hôm nay đã ôn (X40).** Hôm nay con đã có kết quả (từ 0:00, kể cả tự chấm) thì `#today` thêm lớp `done`:
  - nền `ok-soft`, chữ `ink`, nhãn màu `ok`;
  - đầu thẻ `.done-head`: hình `icons/avatars/hai-cau-bong.svg` 64px (`alt=""`), nhãn “Hôm nay”, h1 “Bạn đã ôn rồi. Giỏi lắm!”;
  - dòng “Hôm nay: 1 bài · 21 phút · đúng 23/25 câu. Nghỉ một chút, hoặc làm thêm một bài nếu muốn.” Số phút tính như báo cáo tuần (`MAX_SECS`);
  - dòng nhỏ màu `muted` “Gợi ý nếu làm thêm: <bài chính của todayPicks> (bạn chưa làm).”;
  - nút `btn ghost` cỡ thường “Làm thêm một bài” (`#todayGo`, tới bài chính), nền `surface`;
  - link `#toBanks` như X38.

  Bài phụ `#todayMore` giữ nguyên.
- **Trang rỗng (X40).** Thành phần `.empty`: một `panel` căn giữa, đệm 24px 16px, gồm:
  - hình hải cẩu 96px lấy từ `icons/avatars/` (`alt=""`);
  - tên đậm 18px;
  - một dòng `small muted`;
  - không quá một nút.

  Dùng ở:
  - tab Kết quả chưa có bài: hình `hai-cau-kinh`, “Chưa có bài nào”, “Làm bài đầu tiên nhé. Điểm, môn và chủ đề hay sai sẽ hiện ở đây.”, nút chính “Làm bài đầu tiên” tới bài chính của Hôm nay. Không có ba ô số liệu, không có dòng “Chưa có bài nào” dưới tiêu đề;
  - Hôm nay, Bài ôn khi khối chưa có đề: chữ theo vai. Con bản đám mây: “Bố mẹ có thể nhập đề trong Khu phụ huynh.” Bản lưu trên máy: “Nhờ thầy cô nhập đề trong mục Quản trị.” Phụ huynh bản đám mây: “Bạn có thể nhập đề ở Cài đặt → Đề tự soạn.”, kèm nút tới `#/admin/banks`;
  - Lịch thi của con khi không còn kì thi: “Không còn kì thi nào trong năm học này.”

  Báo cáo tuần chưa có bài trong 7 ngày giữ như cũ.

**Xong khi:** `tests/e2e.js` có thêm các bước sau và vẫn in OK (cloud-e2e.js chỉ cần vẫn in OK):
- Bin có 3/5 bài của giữa kì I: nhóm kì thi, thẻ kì thi, link ở Hôm nay đều ghi “3/5” và cùng tỉ lệ đúng.
- Nút của đề đã làm có lớp `done`, có `.done-ic`, cao đúng 44px, `aria-label` ghi đã làm; đề chưa làm và đề ngẫu nhiên vẫn là `btn main`.
- Hàng nút của một môn có hai đề và một đề ngẫu nhiên nằm trên một hàng ở 360px.
- Huy hiệu ghi “3/5 bài” và “2/3 ngày”; làm thêm bài cuối thì “Hết đề” sang hàng “Đã có”.
- Hôm nay có bài thì thẻ đầu có lớp `done`, chữ đúng số bài, số phút; ngày khác (đồng hồ giả lập sang hôm sau) thì về như cũ.
- Na (chưa có bài): tab Kết quả có `.empty`, không có `.stats`.
- `audit` 360px sáng/tối không báo gì; có ảnh 360px sáng/tối của bốn màn.

### Phiên UX10 · Nhắc lịch thi và giờ ôn bằng lịch của điện thoại

Khung Figma ([section UX10](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=329-36)): L1 là lịch thi của bố mẹ, có chi tiết kì thi đang mở. L2 là Cài đặt có thẻ “Nhắc con ôn bài”, sáng và tối.

![Thêm kì thi vào lịch điện thoại, nhắc con ôn bài](hinh-ux-3x/ux10-lich-dien-thoai.jpg)

**X41. App không nhắc gì.**
- Bố mẹ phải tự nhớ ngày thi, con phải tự nhớ mở app. Chuỗi ngày ôn chỉ có tác dụng khi con đã mở app.
- Thông báo của trang web cần máy chủ gửi. Trên iPhone, thông báo chỉ chạy khi app đã thêm vào Màn hình chính (iOS 16.4 trở lên).
- Lịch của điện thoại nhắc được ngay, không cần máy chủ, và bố mẹ đã quen dùng.

**Cách làm** (`js/app.js`; không đổi dữ liệu):
- **Kì thi.** Chi tiết kì thi có ngày (`openEvent`, mọi vai trò) có `div.cal-add#evIcs` ngay sau dòng ngày:
  - nút `btn` (nền `acc-soft`) có biểu tượng lịch, chữ “Thêm vào lịch điện thoại”;
  - dòng `small muted` “Máy nhắc trước 7 ngày và 1 ngày, lúc 19:00.” Kì dự kiến (`tentative`) thêm “Ngày còn dự kiến: trường báo lịch thì sửa ngày, rồi thêm lại.”

  File `onup-<mã kì thi>.ics`:
  - `text/calendar`, UTF-8, xuống dòng CRLF;
  - một `VEVENT` cả ngày: `DTSTART;VALUE=DATE` là ngày đầu, `DTEND` là ngày cuối cộng 1;
  - `SUMMARY` “<tên kì thi> · Lớp <khối>”, thêm “ (dự kiến)” khi `tentative`;
  - `DESCRIPTION` gồm môn, phạm vi và địa chỉ app (`location.origin + location.pathname`);
  - `UID` cố định `<mã kì thi>-l<khối>@onup`, để thêm lại thì ứng dụng Lịch có thể cập nhật sự kiện cũ;
  - hai `VALARM` `ACTION:DISPLAY`: `TRIGGER:-P6DT5H` (19:00, bảy ngày trước) và `TRIGGER:-PT5H` (19:00, ngày trước).

  Kì thi nhiều khối thì lấy khối đang xem (tab khối ở lịch thi, khối của con).
- **Lời nhắc ôn bài.** Thẻ `section.panel#studyRemind` nằm ở Cài đặt của Khu phụ huynh (bản đám mây, sau Hồ sơ con) và ở trang chủ phụ huynh bản lưu trên máy (dưới thẻ các con). Thẻ gồm:
  - h3 “Nhắc con ôn bài”;
  - dòng `small muted` “Thêm lời nhắc vào lịch điện thoại. Máy nhắc vào giờ đã chọn, kể cả khi không mở app.”;
  - `.field` “Ngày nhắc”: `.day-pick` gồm 7 nút T2–CN, có `aria-pressed`, cao ≥ 44px, mặc định T2–T6;
  - `.field` “Giờ nhắc”: `input type="time"`, mặc định 19:30;
  - nút chính có biểu tượng lịch “Thêm vào lịch điện thoại”;
  - dòng `small muted` “Muốn đổi giờ: xóa lời nhắc cũ trong ứng dụng Lịch rồi thêm lại.”

  Lựa chọn gần nhất nhớ ở localStorage cho tiện (bọc try/catch); không lưu lên máy chủ.

  File `onup-nhac-on-bai.ics`:
  - `VTIMEZONE` Asia/Ho_Chi_Minh (một mục `STANDARD`, +0700);
  - một `VEVENT` bắt đầu ở ngày đầu tiên hợp lệ kể từ hôm nay, đúng giờ đã chọn, `DURATION:PT20M`;
  - `RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR` theo các ngày đã chọn;
  - `SUMMARY` “OnUp: ôn bài 20 phút”, `DESCRIPTION` có địa chỉ app;
  - `VALARM` `TRIGGER:PT0M`.
- **Đưa file cho máy.** Như `backupNow`:
  - máy cảm ứng chia sẻ được file (`navigator.canShare({ files })`) thì `navigator.share`;
  - còn lại thì tải bằng `download()`;
  - hủy chia sẻ thì thôi;
  - tải xong thì toast “Mở file vừa tải để thêm vào Lịch.”;
  - lỗi thì toast “Chưa tạo được lời nhắc. Thử lại nhé.”

  Chủ app thử trên iPhone và Android. Cách nào chạy tốt hơn (tải hay chia sẻ) thì ghi vào dòng dưới nút.
- Không gửi gì lên mạng; không đổi `sw.js`.

**Xong khi:**
- `tests/e2e.js` bắt file tải về (`page.waitForEvent("download")`) và đọc nội dung. File kì thi đúng ngày đầu, ngày cuối cộng 1, hai lời nhắc, `UID`, chữ tiếng Việt UTF-8, CRLF. File nhắc ôn đúng `RRULE` theo ngày chọn, đúng giờ, `TZID`.
- `tests/supabase/cloud-e2e.js` thấy thẻ “Nhắc con ôn bài” ở Cài đặt của Khu phụ huynh, tải được file nhắc ôn, và vẫn in OK.
- Không có request nào ra ngoài máy chủ của app (bước kiểm tra sẵn có của `tests/e2e.js`).
- Có ảnh 360px sáng/tối.
- Chủ app đã thử: iPhone (Safari, app trên Màn hình chính) mở được và thêm vào Lịch; Android (Google Lịch hoặc Lịch của máy) cũng vậy.

### Phiên UX11 · Bảng câu ở màn kết quả

Khung Figma ([section UX11](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=329-59)): M1 là bảng câu, sáng và tối. M2 là lúc chạm ô của một câu đúng: hộp `#qzPeek` mở ngay dưới lưới.

![Màn kết quả đề: hiện tại và đề xuất](hinh-ux-3x/ux11-bang-cau.jpg)

**X42. Màn kết quả chỉ có danh sách câu sai.**
- Con không nhìn được cả đề: câu mấy đúng, câu mấy sai.
- Muốn xem lại câu 18 thì phải cuộn tìm.
- Lúc làm bài đã có bảng số câu (9n), sang màn kết quả thì mất.

**Cách làm** (`js/quiz.js`, `css/app.css`; chữ mới thêm ở cả hai cột của `TXT`):
- **Bảng câu.** Ngay sau hàng nút “Ôn lại N câu sai” / “Làm lại cả đề” có `section.panel#qzSheet`:
  - nhãn `L.sheet`: “Bảng câu” / “Answers”;
  - lưới `.qz-cells` như 9n. Mỗi câu một `button.qz-cell`: câu chấm tự động đúng hết điểm là `st-ok` (✓), còn lại là `st-bad` (✗), kể cả câu chưa làm của bài làm như thi; câu tự luận là `st-done`, không có dấu. Dấu nằm trong `<i>` như 9n;
  - `aria-label` `L.cellAria`, ví dụ “Câu 5, chưa đúng”;
  - chú thích `.qz-key` chỉ ghi mục có câu, ví dụ “Đúng (21)”, “Chưa đúng (4)”, “Tự chấm (2)”;
  - dòng `small muted` `L.sheetTap`: “Chạm vào số câu để xem lại câu đó.” / “Tap a number to review that question.”
- **Chạm ô câu sai.** Mở `details.rv` của câu đó trong `#qzReview`, cuộn tới (`block: "start"`) và đặt focus vào `summary`.
- **Chạm ô câu đúng hoặc câu tự luận.** Hộp `#qzPeek` mở ngay dưới lưới, kiểu `.report-box`:
  - dòng đầu “Câu 7 · Đúng”, nút “Đóng”;
  - câu hỏi, đáp án, lời giải (`nbNum`), link báo câu sai.

  Chạm ô khác thì thay nội dung; chạm lại ô đang mở hoặc bấm “Đóng” thì đóng.
- Đề tính điểm (K5) cũng có bảng. Lượt “Ôn lại câu sai” chỉ có các câu của lượt đó. Đề Tiếng Anh dùng chữ tiếng Anh.

**Xong khi:**
- `tests/e2e.js` (bước mới) kiểm tra:
  - đề 25 câu ở 360px là 5 hàng, mỗi hàng 5 ô cao 48px;
  - số ô `st-bad` bằng số câu trong `#qzReview`;
  - chạm ô sai thì `details.rv` của câu đó mở và nằm trong khung nhìn;
  - chạm ô đúng thì `#qzPeek` ghi đúng số câu.
- Bước TA2 không thấy chữ cái tiếng Việt trên bảng.
- `tests/supabase/cloud-e2e.js` vẫn in OK. Có ảnh 360px sáng/tối.

### Phiên UX12 · Báo cáo các tuần trước, sửa nhỏ

Khung Figma ([section UX12](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=329-81)): N1 là báo cáo có chọn tuần, sáng và tối. N2 là thẻ của con có ô “0 bài”. X45 không có khung: component `.btn` sửa ở lượt kiểm thử thiết kế, sau khi gộp.

![Báo cáo của con có chọn tuần; ô “0 bài” ở thẻ của con](hinh-ux-3x/ux12-bao-cao-tuan.jpg)

**X43. Báo cáo của con chỉ xem được 7 ngày gần nhất.** Tuần trước chỉ còn trong danh sách thu gọn “Bài làm trước tuần này”. Bố mẹ không so được hai tuần, không gửi lại được báo cáo tuần trước.

**X44. Ô số liệu đặt chữ vào chỗ của số.** Thẻ của con (`kidCard`) chưa làm bài hôm nay thì ô đầu ghi “Chưa ôn” bằng cỡ chữ của số. Ở 360px chữ này xuống ba dòng (“Chưa / ôn / hôm nay”), các ô bên cạnh thì không.

**X45. Nút chính và nút viền đứng cạnh nhau lệch 2px.** `.btn.main` không viền cao 48,8px, `.btn.ghost` viền 1px cao 50,8px. Đã ghi ở lượt kiểm thử UX8 ([CAI-TIEN-UX-2X.md](CAI-TIEN-UX-2X.md), mục 5).

**Cách làm:**
- **Chọn tuần (X43, `renderReport`).** `nav.wk-nav#rpWeek` (`aria-label` “Chọn tuần”) nằm ngay dưới `#rpHead`, thay dòng “Báo cáo …” ở đầu trang:
  - nút ‹ (`btn ghost`, 44 × 44px, `aria-label` “Tuần trước”);
  - ở giữa: “Báo cáo 21/10 – 27/10/2026”, dòng nhỏ “7 ngày gần nhất” (lùi một tuần: “Tuần trước”; lùi xa hơn: “3 tuần trước”);
  - nút › (“Tuần sau”), tắt khi đang ở tuần này.

  Cách tính:
  - Hash `#/child/<mã>?tuan=<n>`, với n là số tuần lùi lại. Mỗi bước lùi 7 ngày, tính như bây giờ (hôm nay và 6 ngày trước).
  - Các mục theo tuần đang chọn: tin nhắn, bốn ô số liệu (“Tuần trước:” là tuần ngay trước tuần đang chọn), số bài từng ngày, điểm theo môn, chủ đề hay sai, bài đã làm.
  - Kì thi sắp tới và gợi ý vẫn tính theo hôm nay.
  - Nút ‹ tắt khi lùi tới tuần có kết quả đầu tiên. `#rpOlder` chỉ có ở tuần này. Bản in in tuần đang chọn.
- **Ô số liệu (X44).** Chưa làm bài hôm nay thì ô ghi “0 bài”, dòng dưới vẫn là “hôm nay”.
- **Nút (X45).** `.btn` có `border:1px solid transparent` thay cho `border:0`; `.btn.ghost` giữ viền `line`. Soát lại các chỗ `.btn` có viền riêng (`.hero .btn.ghost`, `.who .btn`, `.pad`), chụp lại ảnh 360px các màn có hai nút cạnh nhau (báo cáo tuần từ 390px, hộp hỏi lại của bài ôn, `#qzYes`/`#qzNo`).

**Xong khi:**
- `tests/e2e.js` (bước UX2 hoặc UX8) kiểm tra:
  - lùi một tuần thì số bài, số ngày, tin nhắn đúng tuần đó;
  - nút › tắt ở tuần này;
  - `?tuan=1` mở thẳng tuần trước;
  - thẻ của Na ghi “0 bài”;
  - hai nút cùng cỡ đứng cạnh nhau cao bằng nhau (đo `getBoundingClientRect`).
- `cloud-e2e.js` vẫn in OK. Có ảnh 360px sáng/tối.

### Phiên UX14 · Ôn 10 câu theo chủ đề hay sai

Khung Figma ([section UX14](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=329-126)):
- P1: tab Kết quả, sáng và tối;
- P2: Hôm nay có bài phụ “Ôn 10 câu” (vẽ sau UX9, nên link có “đã làm 3/5”);
- P3: màn mở đề “Ôn chủ đề”, chỉ có Ôn luyện.

![Chủ đề hay sai có nút ôn nhanh](hinh-ux-3x/ux14-on-chu-de.jpg)

**X48. Chủ đề hay sai chỉ để xem.**
- Tab Kết quả và báo cáo tuần liệt kê chủ đề hay sai nhưng không làm gì được với chúng.
- Bài phụ ở Hôm nay ghi “Ôn lại chủ đề “Góc và đo góc”” nhưng mở cả đề 25 câu; trong đề đó chỉ 3 câu thuộc chủ đề này.

**Cách làm:**
- **Kết quả.** `#weakTopics` thành danh sách:
  - mỗi chủ đề một `.item.topic-row`: tên đậm, dòng “Toán · 4 câu sai”, nút `btn sm` “Ôn 10 câu”;
  - tối đa 3 dòng; các chủ đề còn lại ghi tên ở một dòng `muted` bên dưới.

  Thêm hai chỗ:
  - Bài phụ theo chủ đề hay sai ở Hôm nay thành “Ôn 10 câu: <chủ đề>” · “<môn> · 4 câu sai gần đây · khoảng 10 phút”.
  - Màn kết quả đề (`#qzTopics`): chủ đề cần ôn thêm có link “Ôn 10 câu”. Chữ thêm ở cả hai cột `TXT`.
- **Đề “Ôn chủ đề”** (`#/chu-de/<khối>/<mã môn>/<chủ đề>`, chủ đề mã hóa bằng `encodeURIComponent`):
  - kho câu: các câu có `topic` đó trong đề có sẵn của khối, môn (`Store.loadBank` các file cần), kì gần nhất trước;
  - rút 10 câu bằng `Quiz.draw` với ma trận một chủ đề, ưu tiên câu chưa làm, hay sai (`PoolHist`); có dưới 10 câu thì lấy hết;
  - câu dùng chung đoạn đọc thì rút cả đoạn như K4;
  - tên “<môn> <khối> · Ôn chủ đề · <chủ đề>”, đề Tiếng Anh thì `Quiz.title` ra “English 4 · Topic practice · <chủ đề>”;
  - chỉ có Ôn luyện.
- **Lưu kết quả.**
  - `source: "bank"`, `refId: "chu-de:<khối>:<mã môn>:<chủ đề>"`, `wrongTopics` như đề. Cột `ref_id` là chữ, nên không đổi bảng.
  - Báo cáo tuần, chủ đề hay sai tính như đề thường. `progressOf` (X38) và `weekTips` không tính đề này vào bài ôn của kì.
  - Ôn chủ đề mà đúng từ 80% thì chủ đề đó có nhãn “Đã ôn lại ✓” trong 7 ngày.
- Chỉ dùng đề có sẵn; đề tự soạn không rút.

**Xong khi:**
- `tests/e2e.js` kiểm tra:
  - Bin bấm “Ôn 10 câu” ở “Góc và đo góc” thì có 10 câu, đều của chủ đề đó, của lớp 4;
  - làm xong thì kết quả có `refId` đúng;
  - tab Kết quả có nhãn “Đã ôn lại ✓”;
  - đề Tiếng Anh có tên tiếng Anh (bước TA2).
- `tests/kiem-tra-de.js` thử rút theo chủ đề cho mọi chủ đề có ít nhất 10 câu.
- Có ảnh 360px sáng/tối.

### Phiên UX9b · Sửa sau kiểm thử UX9

Tìm thấy ở lượt kiểm thử thiết kế ngày 29/10/2026 (mục 6, “UX9”). Ảnh: khung bên phải của [kt-ux9-bai-on](hinh-ux-3x/kt-ux9-bai-on.jpg).

**X49. Dòng mô tả của bài ôn dạng trang đã làm có dấu chấm rồi dấu “·”.** `practiceList` (`js/app.js`) thêm “ · đã ôn N lần” sau mô tả của bài ôn (`desc` trong `data/modules.js`). Cả bốn mô tả kết thúc bằng dấu chấm, nên dòng ra “Toán và Tiếng Việt, …, ôn câu sai. · đã ôn 1 lần”: dấu chấm liền dấu “·”, chữ “đã” viết thường ngay sau dấu chấm. Gặp ở tab Bài ôn của con, “Bài ôn của <tên>” của bố mẹ và chi tiết kì thi.

**Cách làm** (`js/app.js`, cho cả hai bản; không đổi dữ liệu):
- Bài ôn đã ôn ít nhất một lần thì sau mô tả có thêm một câu: “… ôn câu sai. Đã ôn 1 lần.” Mô tả không kết thúc bằng dấu chấm (bài ôn thêm sau này) thì thêm dấu chấm trước câu đó.
- Sửa chú thích trong `js/app.js` và dòng tương ứng ở mục “Con biết mình đã ôn đến đâu” của CLAUDE.md.

**Xong khi:**
- Bước UX9 của `tests/e2e.js` đọc “… ôn câu sai. Đã ôn 1 lần.” ở tab Bài ôn của con và ở “Bài ôn của Bin”; không chỗ nào có “. ·”.
- `tests/supabase/cloud-e2e.js` vẫn in OK. Có ảnh 360px sáng/tối của dòng đó, trước và sau.

## 5. Để sau

- **Phiên UX13 · Bố mẹ giao bài, khen bài (X46, X47):** chủ app quyết không làm, ngày 27/10/2026. Phiên này cần thêm bảng trên máy chủ (bài giao) và một cột (lời khen). Đề xuất giữ nguyên dưới đây để xem lại sau khi mời dùng thử. Nếu làm thì chủ app quyết lời dặn: chọn câu có sẵn hay cho tự viết (tối đa 60 kí tự, xóa sau 14 ngày, trang Quyền riêng tư của Phiên G0 ghi thêm một dòng).

<details><summary>Đề xuất của Phiên UX13 (giữ để xem lại)</summary>

#### Phiên UX13 · Bố mẹ giao bài, khen bài (không làm)

![Bố mẹ giao bài và khen bài](hinh-ux-3x/ux13-bo-me-giao.jpg)

**X46. Bố mẹ chỉ đọc được báo cáo, không giao được bài.**
- Bố mẹ biết lịch của trường (đề cương, ngày kiểm tra từng môn) rõ hơn app.
- Mục Gợi ý ôn tuần sau ghi “Bài ôn chưa làm: …” nhưng không bấm vào được.
- Con chỉ có gợi ý của app.

**X47. Con không biết bố mẹ đã xem bài làm chưa.** Lời khen ở màn kết quả là của app, tự động theo điểm.

**Cách làm:**
- **Bố mẹ giao bài (X46).** Ở báo cáo của con, cuối mục Gợi ý ôn tuần sau, có khối `#rpAssign` “Giao bài cho <tên>”:
  - danh sách bài chưa làm của kì gần nhất (tối đa 5, như gợi ý), mỗi dòng một nút `btn sm` “Giao”;
  - trang “Bài ôn của <tên>” cũng có nút “Giao” ở mỗi đề.

  Bấm “Giao” thì `form.panel.fix#asgBox` mở ngay dưới dòng đó, như hộp sửa ngày `#fixBox`:
  - tiêu đề “Giao cho <tên>: <tên đề>”;
  - `.field` “Hạn làm”: `.choices` gồm Hôm nay · Ngày mai · Chủ nhật <ngày> (chủ nhật gần nhất) · Chọn ngày (mở ô `date`);
  - `.field` “Cách làm” (chỉ đề ngân hàng): `.choices.two`, hai ô một hàng: Ôn luyện · Làm như thi · N phút;
  - `.field` “Lời dặn · không bắt buộc”: Cố lên con! · Làm cẩn thận nhé. · Tự viết… (ô chữ tối đa 60 kí tự, nếu chủ app cho tự viết);
  - nút “Giao bài”, “Thôi”;
  - dòng `small muted` “<tên> thấy bài này ở đầu trang Hôm nay, hạn ngày mai 28/10. Thẻ của <tên> ghi đã làm chưa.”

  Mỗi con tối đa 5 bài đang giao; giao lại cùng một đề thì thay bài cũ. Dòng đã giao có `.tag` “Đã giao · hạn 28/10” và link “Bỏ giao”.

  Các nút chọn trong `.choices` là `button` có `aria-pressed`, cao ≥ 44px, bo tròn, chọn rồi thì viền 2px `acc`, nền `acc-soft`. Không dùng `.opt`, `.opts` của câu hỏi.
- **Con, trang Hôm nay (X46).** Có bài giao chưa làm thì `#today` là bài đó (hạn gần nhất trước):
  - nhãn “Bố mẹ giao · hạn ngày mai 28/10”. Quá hạn thì “Bố mẹ giao · quá hạn 1 ngày”, không tô đỏ;
  - h1 tên đề, dòng cách làm (“Làm như thi · 40 phút · 25 câu.”);
  - lời dặn `.asg-note`: nền `sun-soft`, chữ `ink`, hình đại diện của bố mẹ, “<tên của bố mẹ>: <lời dặn>”;
  - nút Bắt đầu, mở đề ở đúng cách làm (`renderQuiz` nhận `?cach=thi`); link bài ôn của kì.

  Gợi ý của app chuyển xuống `#todayMore` (💡, “Gợi ý của app · …”). Có hơn một bài giao thì thêm dòng “Bố mẹ giao thêm 2 bài”, bấm vào thì mở danh sách. Bài giao đã làm thì không còn ở Hôm nay; dòng của bài đó ở tab Kết quả ghi thêm “ · bố mẹ giao”. Bài giao được ưu tiên hơn thẻ “Hôm nay đã ôn” của X40.
- **Bố mẹ theo dõi (X46).**
  - Thẻ của con có dòng `.asg-line` (nền `acc-soft`, 📌), đặt trên dòng kì thi: “Bố mẹ giao: 1/2 bài đã làm · bài còn lại hạn ngày mai 28/10”.
  - Báo cáo tuần có mục “Bố mẹ giao tuần này”, và tin nhắn có thêm dòng “• Bố mẹ giao: 2/3 bài đã làm.”
- **Khen (X47).** Trong báo cáo của con, mục “Bài đã làm trong tuần”, dưới mỗi bài có `.cheer`:
  - ba nút tròn 44px: 👏 · ❤️ · 💪 (`aria-label` “Vỗ tay”, “Thương con”, “Cố lên”, có `aria-pressed`);
  - chọn một nút; chạm lại thì bỏ.

  Phía con:
  - lần đầu thấy lời khen, trang Hôm nay có `div.fb.ok#cheerNew` “👏 Mẹ khen bài <tên đề> · hôm qua 21:10”. Tên bố mẹ lấy từ hồ sơ phụ huynh, bản đám mây ghi “Bố mẹ”. Mỗi lời khen chỉ hiện một lần, nhớ ở localStorage như huy hiệu mới;
  - tab Kết quả có biểu tượng nhỏ cạnh điểm.

  Bài còn trong hộp gửi, chưa lên máy chủ, thì chưa khen được: nút mờ, dòng “Bài này chưa gửi lên.”
- **Dữ liệu** (ở cả hai kho; `tests/supabase/store-test.mjs` so danh sách hàm):
  - `Store.assignments(childId)`, `Store.addAssignment({ childId, refId, kind: "bank" | "module", mode, due, note })`, `Store.removeAssignment(id)`;
  - `Store.setCheer(resultId, "clap" | "heart" | "muscle" | null)`.

  LocalStore: `db.assignments` (dữ liệu cũ đọc vào là `[]`) và trường `cheer` của kết quả.

  Bản đám mây:
  - bảng `assignments`: id `generated always as identity`, `family_id`, `profile_id`, `ref_id`, `kind`, `mode`, `due date`, `note` (tối đa 60 kí tự), `created_at`;
  - RLS: gia đình chỉ đọc, ghi của mình; trigger điền `family_id`, trần 20 bài mỗi hồ sơ;
  - cột `results.cheer` có `check` ba giá trị; grant `update (cheer)` và chính sách update cho gia đình mình;
  - đủ các bước grant ở CLAUDE.md, trong `schema.sql` và `supabase/cap-nhat-ux13.sql` (chạy lại được);
  - sửa `fake-backend.js`, `rls-test.sql`, `run.sh`.

  Đã làm hay chưa tính từ `results`: có kết quả của đề đó sau lúc giao. Không lưu trạng thái riêng. Bài giao đã làm xong quá 14 ngày thì xóa.

**Xong khi:**
- `tests/e2e.js` (bản lưu trên máy) đi hết luồng:
  - Mẹ Bin giao một đề, hạn ngày mai, làm như thi, lời dặn;
  - Bin thấy bài ở `#today`, làm xong thì bài biến khỏi Hôm nay;
  - thẻ của Bin ghi 1/1;
  - Mẹ Bin khen một bài, Bin thấy `#cheerNew` một lần.
- `tests/supabase/cloud-e2e.js` đi cùng luồng trên máy chủ giả.
- `store-test.mjs`, `admin-test.mjs` in OK; `run.sh` in RLS OK, có kiểm tra bảng mới (máy không có PostgreSQL thì ghi rõ trong Pull Request).
- Có ảnh 360px sáng/tối.

</details>

- **Đánh dấu câu để xem lại trên bảng số câu; bố mẹ chấm tự luận thay con:** giữ ở mục 4 của [CAI-TIEN-UX-2X.md](CAI-TIEN-UX-2X.md).
- **Thông báo của trang web:** cần máy chủ gửi; trên iPhone chỉ chạy khi app đã thêm vào Màn hình chính. Xem lại sau UX10, nếu lời nhắc bằng lịch chưa đủ.
- **Biểu đồ số bài từng ngày ở tab Kết quả của con:** báo cáo tuần đã có “Số bài từng ngày” cho bố mẹ; trang Hôm nay đã có hàng T2–CN. Làm khi con cần xem lại nhiều tuần.
- **Bố mẹ giao bài tự soạn câu:** đã có Đề tự soạn; giao được cả đề tự soạn nếu sau này làm UX13.
- **Chủ đề đã ôn lại ở tab Kết quả** (ghi nhận khi kiểm thử UX14, 29/10/2026): con ôn lại một chủ đề đúng từ 80% thì có nhãn “Đã ôn lại ✓”. Nhưng chủ đề đó vẫn đứng đầu danh sách, và số câu sai tăng, vì câu sai của lượt ôn cũng được đếm (“4 câu sai” thành “6 câu sai”). Lúc đó Hôm nay đã gợi ý chủ đề kế tiếp. Nếu ghi chép dùng thử cho thấy con thắc mắc, có thể xếp chủ đề đã ôn lại xuống cuối trong ba dòng, hoặc ghi “đã ôn lại, đúng 8/10” thay cho số câu sai.
- **Màn hình máy tính bảng hai cột:** app đang là một cột rộng tối đa của `.app`; xem lại khi có ghi chép bố mẹ, con dùng iPad.

## 6. Kiểm thử thiết kế sau khi gộp

Như mục 5 của [CAI-TIEN-UX-2X.md](CAI-TIEN-UX-2X.md). Kết quả của các phiên 3.x ghi vào mục này. Chỗ lệch thành mã X mới, nối tiếp mã lớn nhất của hai file, và một phiên sửa ngắn “<phiên>b”.

Cả năm phiên kiểm thử ngày 29/10/2026 trên `main` `87e2327` (sau PR #218), bản lưu trên máy, ở 360px sáng và tối. Dữ liệu như lúc rà 3.x (đầu file): ngày giả lập 27/10/2026 17:30; Bin lớp 4 đã làm Toán 4 · Giữa kì I · Đề 1 và Tiếng Việt 4 · Giữa kì I · Đề 1 (21/10), Đề 2 (hôm qua 19:40), Đề ngẫu nhiên (hôm nay 17:05, 23/25 câu, 21 phút); Na lớp 6 chưa làm bài nào; Mẹ Bin là phụ huynh của hai con. Ở mỗi màn đo bằng `getBoundingClientRect`, `getComputedStyle` và tỉ lệ tương phản WCAG; quét cuộn ngang, nút dưới 44px, chữ dưới 13px, id trùng. Ảnh của các bước UX9–UX14 trong `tests/e2e.js` và `tests/supabase/cloud-e2e.js` dùng cho các trạng thái khó dựng tay. Ảnh so sánh đặt app cạnh khung Figma đã vẽ lại theo code.

### UX9 · Con biết mình đã ôn đến đâu · PR #210 · kiểm thử 29/10/2026

**Kết luận:** đạt. Tiến độ của kì thi, nút đề đã làm, huy hiệu có mục tiêu, thẻ “Bạn đã ôn rồi”, trang rỗng làm đúng mục 4 (“Phiên UX9”) và khung K1–K3, cả sáng và tối. Một chỗ lệch nhỏ: dòng mô tả của bài ôn dạng trang đã làm ghi “… ôn câu sai. · đã ôn 1 lần” (X49, giao Phiên UX9b ở mục 4).

**Cách kiểm:**
- Đi tab Bài ôn, Hôm nay, Kết quả, Lịch thi của Bin; tab Kết quả của Na; “Bài ôn của Bin” của Mẹ Bin.
- Đọc ảnh bước UX9 của `tests/e2e.js`: làm hết 5/5 bài, “Hết đề” sang hàng “Đã có”, khối chưa có đề, lịch thi không còn kì thi.
- Quét chữ đang hiện ở 17 màn của con, bố mẹ, quản trị tìm dấu câu lạ: “. ·”, “· ·”, dấu cách trước dấu câu, chữ thường ngay sau dấu chấm.
- Đặt cạnh K1–K3 của section [UX9](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=329-12).

![Tab Bài ôn: app sau UX9, sáng và tối; Figma K1; X49](hinh-ux-3x/kt-ux9-bai-on.jpg)

| Yêu cầu (mục 4, “Phiên UX9”) | Kết quả | Ghi chú |
|---|---|---|
| X38: một hàm tiến độ, cùng chữ, cùng số ở nhóm kì thi, thẻ kì thi, link ở Hôm nay và huy hiệu | Khớp | Nhóm kì thi và thẻ kì thi: “Đã làm 3/5 bài · đúng 82%”; link: “Bài ôn cho kì này · đã làm 3/5 →”; huy hiệu: “3/5 bài”. 82% là 82/100 câu của lần làm gần nhất mỗi bài, có cả đề ngẫu nhiên. |
| X38: dòng tiến độ của nhóm có “3/5” đậm, thanh 6px tô done/total, `role="img"`, `aria-label`; làm hết thì thanh `good` và “Đã làm hết 5 bài” | Khớp | Thanh tô 60%, màu `sun`. Làm hết thì thanh màu `ok`, chữ “Đã làm hết 5 bài · đúng 84%” (e2e). Chưa làm bài nào thì không có dòng này. |
| X38: nút đề đã làm `btn sm done` (nền trong, viền `line`, chữ `ink` đậm 600, ✓ màu `ok`, cao 44px, `aria-label` ghi đã làm); đề chưa làm và đề ngẫu nhiên vẫn vàng | Khớp | Tương phản của chữ 16,5 (sáng), 13,9 (tối); của dấu ✓ 5,4 và 9,4. |
| X38: dòng môn “Đã làm 2/2 đề · 25 câu mỗi đề”; ba nút một hàng ở 360px | Khớp | Hàng Toán, hàng Tiếng Việt đều một hàng (127 + 68 + 68px). |
| X38: “Bài ôn của <tên>” của bố mẹ có ✓ và dòng tiến độ; lịch thi của bố mẹ không có ✓ | Khớp | Nút “Xem thử” của bài đã làm thành `done`. |
| X38: bài ôn dạng trang đã làm: nút “Vào ôn” thành `done`, mô tả thêm “ · đã ôn 3 lần” | Lệch (X49) | Cả bốn mô tả trong `data/modules.js` kết thúc bằng dấu chấm, nên dòng ra “… ôn câu sai. · đã ôn 1 lần”: dấu chấm liền dấu “·”, chữ “đã” viết thường ngay sau dấu chấm. Gặp ở tab Bài ôn của con, “Bài ôn của <tên>” và chi tiết kì thi. Quét 17 màn không thấy chỗ nào khác như vậy. |
| X39: `.bdg-list` tối đa hai mục tiêu (tên đậm 15px, số 14px `muted`, thanh 6px); hàng “Đã có:”; `#badgeHint` ghi cả hai mục tiêu | Khớp | “Hết đề · Kiểm tra giữa học kì I · 3/5 bài”, “Chuỗi 3 ngày · 2/3 ngày”. Làm thêm hai bài thì “Hết đề” sang hàng “Đã có”, dòng chúc mừng hiện một lần (e2e). |
| X40: hôm nay đã có bài thì `#today.done`: nền `ok-soft`, hải cẩu tung bóng 64px, “Bạn đã ôn rồi. Giỏi lắm!”, dòng số bài, số phút, câu đúng; dòng gợi ý; nút viền “Làm thêm một bài” nền `surface`; link tiến độ | Khớp | Tương phản của nhãn “Hôm nay” (màu `ok`) 4,7 (sáng), 7,9 (tối); dòng gợi ý 5,0 và 5,6; link 8,7 và 7,0. Nút cao 50,8px. Sang hôm sau thì về thẻ “Hôm nay ôn gì?” (e2e). |
| X40: `.empty` ở tab Kết quả chưa có bài (hải cẩu đeo kính 96px, tên 18px, một dòng, nút chính), ở khối chưa có đề (lời theo vai), ở lịch thi không còn kì thi | Khớp | Đệm 24px 16px. Tab Kết quả của Na không có ba ô số liệu. |
| 360px sáng/tối | Khớp | Không cuộn ngang, nút ≥ 44px, chữ ≥ 13px, không id trùng, không lỗi JavaScript. |

![Hôm nay đã ôn: app sáng và tối, Figma K2](hinh-ux-3x/kt-ux9-hom-nay.jpg)

![Trang rỗng: tab Kết quả của Na, khối chưa có đề, lịch thi không còn kì thi; Figma K3](hinh-ux-3x/kt-ux9-trang-rong.jpg)

**Khác Figma nhưng chấp nhận:**
- Thẻ kì thi ghi “Đã làm 3/5 bài · đúng 82%” (mục 4 ghi “bài ôn”), cùng chữ với nhóm kì thi; đã ghi ở mô tả PR #210.
- Lịch thi không còn kì thi: dưới “Không còn kì thi nào” có thêm dòng “Năm học này đã hết các kì thi. Bạn vẫn ôn lại được ở tab Bài ôn.”
- 🎯, 🏅, 🔥, 📖 trong code là emoji; Figma vẽ bằng icon (`icon/target`, `icon/flame`, `icon/book`) vì Figma không hiện được font emoji màu.

**Figma:**
- K1 thêm ba nhóm kì thi mà K1 chưa vẽ: IOE cấp tỉnh/thành phố, IOE cấp quốc gia (có từ Phiên N-IOE), Kiểm tra cuối năm học. Nay đủ 8 nhóm như app.
- K2: bài phụ thành “Ôn 10 câu: Góc và đo góc” (đổi ở UX14). Kết quả gần đây ghi “Hôm nay 17:05 · Toán” như `resultsList`, có 3 bài và “Xem tất cả →”. Thêm mục Kì thi tiếp theo và dòng chú thích cuối trang.
- Component `.ev` bỏ tag “Sẵn sàng x%” của bản 1.x, thêm dòng `.ready` (text style mới `Body/.small 600`, màu `ink`, thuộc tính “Tiến độ”, bật bằng “Show tiến độ”). Các khung 1.x (trang Users, khung “1.x ·” ở Master 2.x) tắt dòng này.
- Bản tối của K1, K2 dựng lại từ bản sáng.

### UX11 · Bảng câu ở màn kết quả · PR #212 · kiểm thử 29/10/2026

**Kết luận:** đạt. Bảng câu, chạm ô câu sai, hộp `#qzPeek` làm đúng mục 4 (“Phiên UX11”) và khung M1, M2, cả sáng và tối. Phần ngoài bảng câu của M1, M2 cũ hơn code (có từ UX1, hoặc đổi ở UX14); Figma đã vẽ lại theo code. Không có chỗ lệch.

**Cách kiểm:**
- Đọc ảnh và số đo bước UX11 của `tests/e2e.js` (ngày giả lập 27/10/2026 18:00): Bin ôn luyện Toán 4 · Cuối kì I · Đề 3, sai câu 5, 10, 18, 23; lượt ôn lại câu sai; làm như thi 2 câu rồi nộp.
- Đọc bước TA2, K5 của `tests/e2e.js` và ảnh `c8h-ket-qua-de` của `cloud-e2e.js` (bản đám mây, có dòng “Đã lưu và gửi cho bố mẹ.”).
- Đặt cạnh M1, M2 của section [UX11](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=329-59).

![Màn kết quả đề: app sau UX11 và Figma M1](hinh-ux-3x/kt-ux11-bang-cau.jpg)

| Yêu cầu (mục 4, “Phiên UX11”) | Kết quả | Ghi chú |
|---|---|---|
| `section.panel#qzSheet` “Bảng câu” ngay sau hàng nút “Ôn lại N câu sai” / “Làm lại cả đề” | Khớp | |
| Lưới như 9n: đề 25 câu ở 360px là 5 hàng × 5 ô cao 48px; ✓ ở câu đúng hết điểm, ✗ ở câu còn lại (cả câu chưa làm của bài làm như thi); câu tự luận không có dấu; dấu trong `<i>` | Khớp | Số ô ✗ bằng số câu ở “Câu cần xem lại”. Làm như thi 2 câu rồi nộp: 23 ô ✗ (e2e). |
| `aria-label` “Câu 5, chưa đúng”; chú thích chỉ ghi mục có câu; dòng “Chạm vào số câu để xem lại câu đó.” | Khớp | “Đúng (21)”, “Chưa đúng (4)”. Đề Tiếng Anh có một câu tự luận: “Self-marked (1)” (bước K5). |
| Chạm ô câu sai: `details.rv` của câu đó mở, cuộn tới, focus ở dòng tóm tắt | Khớp | Câu 18 nằm trong khung nhìn, không bị thanh trên che. |
| Chạm ô câu đúng, câu tự luận: `#qzPeek` ngay dưới lưới, dòng “Câu 7 · Đúng”, nút “Đóng”, câu hỏi, đáp án, lời giải, link báo câu sai; chạm ô khác thì thay, chạm lại hoặc “Đóng” thì đóng | Khớp | Ô đang mở hộp có vòng ngoài như ô đang làm. Báo một câu xong thì mọi link báo câu đó trên màn tắt theo. |
| Đề tính điểm có bảng; lượt “Ôn lại câu sai” chỉ có câu của lượt đó; đề Tiếng Anh dùng chữ tiếng Anh | Khớp | Ôn lại 4 câu sai, đúng hết: 4 ô ✓. Bước TA2 không thấy chữ cái tiếng Việt. |
| 360px sáng/tối | Khớp | |

![Chạm ô câu đúng, ô câu sai: app sáng và tối, Figma M2](hinh-ux-3x/kt-ux11-xem-cau.jpg)

**Khác Figma nhưng chấp nhận:** ở `#qzPeek`, dòng đầu “Câu 7 · Đúng” một màu `ink` (M2 tô chữ “Đúng” xanh); “Đóng” là nút viền nhỏ cao 44px (M2 vẽ link); dòng đáp án là “Đáp án: 7”, không có “· bạn chọn đúng”.

**Figma:** M1, M2 vẽ lại theo code:
- bỏ link “← Về trang chính” ở đầu; cuối trang có mục Theo mức độ và nút viền “Về trang chính”;
- câu cần xem lại có viền trái 4px `bad`, “Câu 5” đậm màu `muted`, nhãn mức độ, dòng “Bạn trả lời: ~~8~~ · bấm để xem đáp án, lời giải” màu `ink`;
- Theo chủ đề: thanh 1/2, 0/1 đúng tỉ lệ; nút “Ôn 10 câu: …” (UX14); dòng thu gọn “▶ Xem cả 10 chủ đề” chữ `ink` 14px;
- M2: dòng đầu, nút “Đóng”, dòng đáp án như code; câu hỏi chữ thường; link báo câu sai màu `acc`;
- bản tối của M1 dựng lại.

### UX10 · Nhắc bằng lịch của điện thoại · PR #214 · kiểm thử 29/10/2026

**Kết luận:** đạt phần app. Nút ở chi tiết kì thi, thẻ “Nhắc con ôn bài” và hai file lịch làm đúng mục 4 (“Phiên UX10”) và khung L1, L2. Còn ý cuối của “Xong khi”: chủ app thử file lịch trên iPhone (Safari và app trên Màn hình chính) và trên Android. Repo chưa ghi lại lần thử này.

**Cách kiểm:**
- Mẹ Bin mở Lịch thi, tab Lớp 4, chi tiết Kiểm tra giữa học kì I; trang chủ phụ huynh có thẻ “Nhắc con ôn bài”.
- Đọc bước UX10 của `tests/e2e.js` (đọc nội dung hai file tải về, giả lập bảng chia sẻ) và kiểm tra “UX10” của `cloud-e2e.js` (thẻ ở Cài đặt ngay sau Hồ sơ con, ảnh `c5-cai-dat`).
- Đặt cạnh L1, L2 của section [UX10](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=329-36).

![Thêm kì thi vào lịch điện thoại, nhắc con ôn bài: app và Figma L1, L2](hinh-ux-3x/kt-ux10-lich-dien-thoai.jpg)

| Yêu cầu (mục 4, “Phiên UX10”) | Kết quả | Ghi chú |
|---|---|---|
| `div.cal-add#evIcs` ngay sau dòng ngày: nút nền `acc-soft` có biểu tượng lịch “Thêm vào lịch điện thoại”; dòng “Máy nhắc trước 7 ngày và 1 ngày, lúc 19:00.”; kì dự kiến thêm dòng sửa ngày | Khớp | Nút rộng hết thẻ, 294 × 51px. |
| Kì thi nhiều khối lấy khối đang xem | Khớp | Tab “Cả hai khối”, IOE cấp trường: hai nút “Thêm vào lịch · Lớp 4”, “Thêm vào lịch · Lớp 6” (ghi ở mô tả PR #214). Kì đã qua và mốc năm học không có nút. |
| File kì thi: UTF-8, CRLF, một `VEVENT` cả ngày, `DTEND` là ngày cuối cộng 1, `SUMMARY`, `DESCRIPTION`, `UID`, hai `VALARM` | Khớp | e2e đọc file tải về; mọi dòng ≤ 75 byte. |
| Thẻ `#studyRemind` ở Cài đặt (bản đám mây, sau Hồ sơ con) và ở trang chủ phụ huynh bản lưu trên máy (dưới thẻ các con): h3, dòng giải thích, 7 nút T2–CN có `aria-pressed`, cao ≥ 44px, mặc định T2–T6; ô giờ 19:30; nút chính có biểu tượng; dòng đổi giờ | Khớp | Bảy nút một hàng, mỗi nút 37 × 44px; nút đã chọn viền 2px và chữ `acc`, nền `acc-soft`. Ô giờ cao 49px, nút 51px. Thẻ chỉ có khi đã có hồ sơ con (ghi ở mô tả PR #214). |
| File nhắc ôn: `VTIMEZONE`, `RRULE` theo ngày chọn, `DURATION:PT20M`, `VALARM` `PT0M`; lựa chọn nhớ trên máy | Khớp | e2e: bỏ T6, chọn T7, giờ 20:15 thì ra `BYDAY=MO,TU,WE,TH,SA`; chỉ chọn CN thì bắt đầu 1/11; tải lại trang vẫn giữ lựa chọn. |
| Đưa file cho máy: chia sẻ được file thì chia sẻ, không thì tải về và toast; hủy thì thôi | Khớp | e2e giả lập `navigator.canShare`, `navigator.share`. |
| Không gửi gì lên mạng, không đổi `sw.js` | Khớp | Bước kiểm tra request của e2e. |
| Chủ app đã thử iPhone (Safari, app trên Màn hình chính) và Android | Chưa biết | Chờ chủ app. Cách nào chạy tốt hơn (tải hay chia sẻ) thì ghi vào dòng dưới nút. |
| 360px sáng/tối | Khớp | |

**Khác Figma nhưng chấp nhận:** ô giờ là ô `type="time"` của trình duyệt nên hiện theo máy. Trình duyệt thử chạy tiếng Anh nên ghi “07:30 PM”; máy tiếng Việt ghi 19:30 như L2.

**Figma:** L1, L2 khớp. Nút “Chọn hồ sơ khác” ở đầu Khu phụ huynh (có từ UX3) vẽ lại thành nút viền nhỏ như code (`btn ghost sm`) ở L1, L2 và N2. Component `.btn icon` có viền trong suốt như `.btn` (X45), cao 51.

### UX12 · Báo cáo các tuần trước, sửa nhỏ · PR #215 · kiểm thử 29/10/2026

**Kết luận:** đạt. Chọn tuần, ô “0 bài” và nút cùng cao làm đúng mục 4 (“Phiên UX12”) và khung N1, N2, cả sáng và tối. Theo X45, component `.btn` trong Figma có viền 1px trong suốt: mọi nút cỡ thường cao 51.

**Cách kiểm:**
- Mẹ Bin mở báo cáo của Bin (4 bài tuần này, 1 bài tuần trước) rồi bấm ‹; trang chủ phụ huynh có thẻ của Bin và Na (Na chưa làm bài). Ở 390px, đo nút chính, nút viền, nút thường, nút danger đứng cạnh nhau.
- Đọc bước UX8 của `tests/e2e.js` (có phần UX12: lùi từng tuần, `?tuan=1`, `?tuan=9`, focus, bản in; ảnh hai nút ở 390px, hộp hỏi lại của đề, hộp hỏi khi rời bài ôn) và kiểm tra UX2 (X44), UX8 của `cloud-e2e.js`.
- Đặt cạnh N1, N2 của section [UX12](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=329-81).

![Báo cáo các tuần trước, thẻ của con, hai nút cùng cao: app và Figma N1, N2](hinh-ux-3x/kt-ux12-bao-cao-tuan.jpg)

| Yêu cầu (mục 4, “Phiên UX12”) | Kết quả | Ghi chú |
|---|---|---|
| X43: `nav.wk-nav#rpWeek` ngay dưới `#rpHead`: nút ‹ `btn ghost` 44 × 44px, “Báo cáo 21/10 – 27/10/2026”, dòng “7 ngày gần nhất”, nút › tắt ở tuần này | Khớp | Thanh 328 × 57px; nút › tắt mờ 45%. Ngay dưới là khối “Tin nhắn sẽ gửi”. |
| Lùi một tuần: hash `?tuan=1`, “Tuần trước”; tin nhắn, bốn ô số liệu (“Tuần trước:” là tuần ngay trước đó), số bài từng ngày, điểm theo môn, chủ đề hay sai, bài đã làm theo tuần đang chọn; kì thi sắp tới, gợi ý theo hôm nay | Khớp | Tuần 14/10 – 20/10: 1 bài, 1/7 ngày, 25 phút, 6,5/10. |
| ‹ tắt ở tuần có kết quả đầu tiên; `#rpOlder` chỉ ở tuần này; bản in in tuần đang chọn | Khớp | Bản in không có nút ‹ › (e2e). |
| X44: thẻ của con chưa làm bài hôm nay ghi “0 bài”, dòng dưới “hôm nay” | Khớp | “0 bài” một dòng, cỡ 20,8px, màu `ink` như các ô bên cạnh; bản lưu trên máy và bản đám mây. |
| X45: `.btn` có viền 1px trong suốt; hai nút cùng cỡ đứng cạnh nhau cao bằng nhau | Khớp | Ở 390px nút chính, nút viền, nút thường, nút danger đều 50,8px; `sm` 44px; `lg` 57,3px. “Gửi báo cáo” và “Chép tin nhắn”, `#qzYes` và `#qzNo`, `#leaveYes` và `#leaveNo` cùng cao. |
| 360px sáng/tối | Khớp | |

**Khác Figma nhưng chấp nhận:** N2 vẽ chữ “0 bài” màu `muted`; code để màu `ink` như các ô khác (mục 4 không nói màu). Figma vẽ lại theo code.

**Figma:**
- Component `.btn`: 11 biến thể default, main, danger thêm viền 1px trong suốt, tính vào layout. Mọi biến thể cỡ thường cao 51, `sm` 44; mô tả component ghi X45. Nút “Gửi báo cáo” tự dựng ở N1, G1, G1b (sáng, tối) cũng cao 51.
- N2: ô số liệu vẽ như `.stat` (nền `surface`, viền `line`, bo 12), thay ô nền xám; “0 bài” màu `ink`.

### UX14 · Ôn 10 câu theo chủ đề hay sai · PR #218 · kiểm thử 29/10/2026

**Kết luận:** đạt. Nút “Ôn 10 câu” ở tab Kết quả, Hôm nay, màn kết quả đề và đề “Ôn chủ đề” làm đúng mục 4 (“Phiên UX14”) và khung P1–P3, cả sáng và tối. Không có chỗ lệch; một điều ghi nhận để xem lại sau (mục 5).

**Cách kiểm:**
- Tab Kết quả của Bin (27/10/2026 17:30); Hôm nay ngày 28/10 (chưa làm bài); bấm “Ôn 10 câu” ở “Góc và đo góc”.
- Đọc bước UX14 của `tests/e2e.js` (làm 8/10, “Đã ôn lại ✓”, “Làm đề khác”, nút ở `#qzTopics`, phụ huynh xem thử, chủ đề không có, sai khối), bước TA2 và `node tests/kiem-tra-de.js` (144 chủ đề có ít nhất 10 câu, rút thử 3 024 lần).
- Đặt cạnh P1–P3 của section [UX14](https://www.figma.com/design/9mkNYX0ZOczNDMwlKo5F4e/OnUp?node-id=329-126).

![Ôn 10 câu theo chủ đề hay sai: app và Figma P1, P3](hinh-ux-3x/kt-ux14-on-chu-de.jpg)

| Yêu cầu (mục 4, “Phiên UX14”) | Kết quả | Ghi chú |
|---|---|---|
| `#weakTopics`: tối đa 3 `.item.topic-row` có tên đậm, dòng “Toán · 4 câu sai”, nút `btn sm` “Ôn 10 câu”; các chủ đề còn lại ở một dòng `muted` | Khớp | Nút cao 44px, nền `acc-soft`, `aria-label` “Ôn 10 câu: <chủ đề>”. Chủ đề chỉ có ở đề tự soạn thì không có nút. Dòng dưới: “… Thêm: Biểu thức chứa chữ; Danh từ; Làm tròn số.” |
| Bài phụ ở Hôm nay: “Ôn 10 câu: <chủ đề>” · “Toán · 4 câu sai gần đây · khoảng 10 phút” | Khớp | Biểu tượng 🎯. |
| Màn kết quả đề: chủ đề cần ôn thêm có link “Ôn 10 câu” | Khớp | Nút `btn sm` “Ôn 10 câu: <chủ đề>”, tối đa 3; tên chủ đề dài thì xuống dòng trong nút. Đề Tiếng Anh: “Practise 10 questions: …”. |
| Đề “Ôn chủ đề”: câu có chủ đề đó trong các đề có sẵn của khối, môn; rút 10 câu, câu chưa làm, hay sai trước, đoạn đọc rút cả đoạn; tên “Toán 4 · Ôn chủ đề · <chủ đề>”; chỉ có Ôn luyện | Khớp | “10 câu của chủ đề này, rút từ 22 câu trong các đề lớp 4, …”. e2e: 10 câu đều của chủ đề; “Làm đề khác” có lại hai câu vừa sai. |
| Lưu `source: "bank"`, `refId` “chu-de:…”; không tính vào tiến độ của kì thi; “Đã ôn lại ✓” khi đúng từ 80% trong 7 ngày | Khớp | |
| Chỉ rút từ đề có sẵn | Khớp | |
| 360px sáng/tối | Khớp | |

**Khác Figma nhưng chấp nhận** (đã ghi ở mô tả PR #218):
- Màn mở đề có “← Trang chính” như mọi màn mở đề (P3 vẽ “← Kết quả”); nút Back của điện thoại vẫn về tab Kết quả.
- Nhãn “Lớp 4 · Toán · Ôn chủ đề” và câu giới thiệu theo code; dưới thẻ Ôn luyện không có dòng chú thích.
- Dòng “Thêm:” ngăn tên chủ đề bằng “; ” (P1 vẽ dấu phẩy), như X37.

**Ghi nhận, để xem lại sau:** con ôn lại “Góc và đo góc” đúng 8/10 thì có nhãn “Đã ôn lại ✓”, nhưng chủ đề vẫn đứng đầu danh sách, và dòng dưới tăng từ “4 câu sai” lên “6 câu sai”, vì câu sai của lượt ôn cũng được đếm. Lúc đó Hôm nay đã gợi ý chủ đề kế tiếp. Không lệch mục 4; ghi ở mục 5.

**Figma:**
- P1: dòng “4 bài đã làm” dưới tiêu đề, điểm trung bình 8,2 cho khớp 4 bài, dòng “Thêm:” ngăn bằng “; ”, 4 bài đã làm ghi “… · Toán”.
- P2: 3 kết quả gần đây, “Xem tất cả →”, mục Kì thi tiếp theo (“Đã làm 3/5 bài · đúng 79%”) và dòng chú thích cuối trang.
- P3: “← Trang chính”, nhãn và câu giới thiệu như code, bỏ dòng chú thích dưới thẻ.
- Bản tối của P1 dựng lại.

### Chung cho năm phiên

**Kiểm thử tự động trên `main` `87e2327`:**
- `tests/e2e.js`: E2E OK, có các bước UX9, UX11, UX10, UX14 và phần UX12 trong bước UX8, cả sáng và tối.
- `tests/supabase/cloud-e2e.js`: CLOUD E2E OK, 174 mục đạt ở hai lượt sáng và tối.
- `node tests/kiem-tra-de.js`: DE OK (124 đề, 4 442 câu).
- Nhánh của PR kiểm thử dựng trên `main` `b137c06` (thêm đề Lịch sử và Địa lí 9, GDCD 9, không sửa giao diện): `node tests/kiem-tra-de.js` vẫn DE OK.
- Không chạy `store-test.mjs`, `admin-test.mjs`, `run.sh`: năm PR không sửa kho dữ liệu, trang admin, máy chủ.

**Figma, trang Master 3.x:**
- Chú thích của mỗi khung ghi số PR, thay chữ “(đề xuất)”.
- Tag ở ghi chú của mỗi phiên thành “Đã làm · PR #… · Phiên …”; mỗi ghi chú có thêm đoạn “Kiểm thử thiết kế (29/10/2026)”. Tag của khung giới thiệu ghi năm phiên đã làm.
- Section UX9, UX11, UX14 cao thêm, các section bên dưới dời xuống theo.
- Section thành phần đổi tên thành “3.x · Thành phần mới (đã có trong code, PR #210–#218)”.
