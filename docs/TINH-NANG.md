# Mô tả tính năng — OnUp - Ôn Luyện Mỗi Ngày

Phiên bản 1.1 · 18/10/2026 · Năm học 2026–2027. File này mô tả những gì app đang có; trạng thái và lộ trình các phiên chỉ ghi ở [KE-HOACH-PHAT-TRIEN-ONUP.md](KE-HOACH-PHAT-TRIEN-ONUP.md).

## 1. Mục tiêu

Một nơi duy nhất để học sinh lớp 4 và lớp 6 ôn **mọi kì thi trong năm học**: kiểm tra định kì (giữa kì, cuối kì) và các cuộc thi như IOE. Phụ huynh xem con đã ôn gì, điểm ra sao, còn bao lâu đến kì thi tiếp theo.

App được ghép từ 4 trang ôn tập đã làm trước đó:

| Bài ôn | Khối | Nội dung |
|---|---|---|
| Ôn giữa kì I · Lớp 4 | 4 | Toán (Bài 1–19), Tiếng Việt (tuần 1–8), sách Kết nối tri thức. Đề có giờ, ôn theo bài, ôn câu sai, câu Toán sinh ngẫu nhiên |
| Ôn giữa kì I · Lớp 6 | 6 | Ngữ văn (Bài 1–3, có đọc hiểu văn bản mới), Toán (Chương I–III), KHTN |
| IOE · Global Success 4 | 4 | Đề IOE cấp trường (Unit 1–6), cấp xã/phường (Unit 1–10) và cấp tỉnh (Unit 1–10, câu khó hơn, có bài đọc ngắn), có câu nghe, 7 đề mỗi tuần theo lộ trình |
| IOE · Global Success 6 | 6 | Đề IOE cấp xã/phường (Unit 1–6) và cấp thành phố (Unit 1–9), có câu nghe |

Phần mở rộng so với 4 trang gốc: **tài khoản người dùng**, **lịch thi cả năm**, **ngân hàng câu hỏi nhập được**, **theo dõi tiến độ và báo cáo tuần cho phụ huynh**, **bản đám mây** dùng chung trên nhiều máy (mục 5).

## 2. Người dùng và quyền

| Vai trò | Ai | Làm được gì |
|---|---|---|
| Học sinh | Con lớp 4 hoặc lớp 6 | Xem kì thi tiếp theo của khối mình, làm bài ôn, xem điểm và chủ đề hay sai của mình |
| Phụ huynh | Bố, mẹ, người giám hộ | Xem hồ sơ và kết quả của các con được gắn với mình; thêm con; đổi tên, lớp, PIN của con; xem thử bài ôn (không lưu điểm) |
| Quản trị | Thầy cô, hoặc bố/mẹ quản lý app | Mọi quyền trên, cộng: tạo/sửa/xóa mọi tài khoản, gắn phụ huynh với con, sửa lịch thi, nhập ngân hàng câu hỏi, sao lưu/khôi phục, xóa dữ liệu |

Bảng trên là **bản lưu trên máy** (một máy dùng chung cho cả nhà hoặc cả lớp). **Bản đám mây** (trang thật, mục 5) chỉ có hai vai trò trong app: **Phụ huynh** (tài khoản gia đình; dùng chung các màn hình quản trị dưới tên “Khu phụ huynh”: hồ sơ con, lịch thi, ngân hàng đề, dữ liệu, tài khoản) và **hồ sơ con** (học sinh). Tài khoản gia đình do **chủ app** tạo ở trang admin riêng (`admin.html`); chủ app không xem bài làm của các con.

- Đăng nhập: chọn tên trên màn hình. Hồ sơ có mã PIN thì sang **màn nhập riêng** (Phiên UX4, ảnh [hinh-ux4/](hinh-ux4/)): hình to, tên, lớp, hàng chấm và bàn phím ngay dưới, vừa một màn hình điện thoại không phải cuộn; link “← Chọn hồ sơ khác” hoặc nút Back về danh sách; hồ sơ không có PIN chạm là vào. Nhập mã PIN 4–6 số (gõ đủ số là tự vào, không cần bấm “Vào”). Sai 5 lần phải đợi, thời gian chờ tăng dần (30 giây, 1 phút, 5 phút, rồi 15 phút), tính riêng từng người và không mất khi tải lại trang; đang đợi thì đếm ngược hiện ngay dưới hàng chấm và bàn phím mờ đi, hết giờ tự bật lại. Bản đám mây: hồ sơ con có mã PIN 4 số nếu bố mẹ đặt (không bắt buộc); ô Phụ huynh cũng là một màn riêng: ô mật khẩu, nút “Vào khu phụ huynh”, dòng “Quên mật khẩu?” (hoặc bàn phím mã mở nhanh kèm “Nhập mật khẩu”, mục 5); nhập sai cũng tính vào cùng bộ đếm chờ.
- Ô mật khẩu và mã PIN nào cũng có nút hình con mắt: bấm để xem mình đã gõ gì, bấm lại để ẩn. Bàn phím PIN: số đã gõ chỉ hiện ở hàng chấm, nút chữ “Hiện số” dưới hàng chấm cho xem chữ số (bấm lại: “Giấu số”). Gửi đi, xóa hết ô hoặc sang màn hình khác thì tự ẩn lại. Ảnh: [hinh-xem-mat-khau/](hinh-xem-mat-khau/).
- Trang Tài khoản: chạm một hình đại diện là đổi ngay (có thông báo “Đã đổi hình đại diện”), không phải bấm Lưu; bản lưu trên máy có thêm form đổi mã PIN riêng.
- Một học sinh có thể có nhiều phụ huynh; một phụ huynh có thể có nhiều con (khác khối cũng được).
- Phải luôn còn ít nhất một tài khoản quản trị.
- Dữ liệu về trẻ chỉ gồm tên hiển thị, khối, lớp, hình đại diện (biểu tượng cảm xúc). Không thu thập thông tin khác.

## 3. Lịch thi cả năm

Lịch năm học 2026–2027 có sẵn cho cả hai khối, chia theo tháng:

| Thời gian | Kì thi | Khối | Trạng thái |
|---|---|---|---|
| 5/9/2026 | Khai giảng | 4, 6 | Chính thức |
| 2–13/11/2026 | Kiểm tra giữa học kì I | 4 (Toán, TV); 6 (các môn có điểm số) | Dự kiến |
| 26–28/11/2026 | IOE cấp trường | 4, 6 | Đã công bố |
| 21/12/2026–8/1/2027 | Kiểm tra cuối học kì I | 6 | Dự kiến |
| 28/12/2026–8/1/2027 | Kiểm tra cuối học kì I | 4 | Dự kiến |
| 7–9/1/2027 | IOE cấp xã/phường | 4, 6 | Đã công bố |
| trước 18/1/2027 | Kết thúc học kì I | 4, 6 | Theo khung của Bộ |
| 6/2/2027 | Tết Nguyên đán | 4, 6 | Mốc |
| 4–6/3/2027 | IOE cấp tỉnh/thành phố | 4, 6 | Đã công bố |
| 15–26/3/2027 | Kiểm tra giữa học kì II | 4, 6 | Dự kiến |
| 1–2/4/2027 | IOE cấp quốc gia | 4, 6 | Dự kiến |
| 26/4–14/5/2027 | Kiểm tra cuối năm | 6 | Dự kiến |
| 3–14/5/2027 | Kiểm tra cuối năm | 4 | Dự kiến |
| trước 31/5/2027 | Kết thúc năm học | 4, 6 | Theo khung của Bộ |

Mỗi kì thi có: tên, loại (kiểm tra định kì / IOE / thi khác / mốc), khối, ngày bắt đầu–kết thúc, cờ "dự kiến", môn, phạm vi kiến thức, ghi chú, **bài ôn và ngân hàng câu hỏi được gắn vào**.

- Học sinh chỉ thấy lịch của khối mình. Phụ huynh và quản trị chọn xem lớp 4, lớp 6 hoặc cả hai.
- Bấm vào một kì thi để xem chi tiết và vào thẳng bài ôn của kì đó.
- Quản trị sửa ngày khi trường thông báo, thêm kì thi mới, hoặc khôi phục lịch mặc định.

## 4. Màn hình

### 4.1 Học sinh — Trang chính (Phiên UX1)
Bốn tab dưới màn hình: **Hôm nay · Bài ôn · Lịch thi · Kết quả**. Thanh trên chỉ còn hình đại diện (bấm vào là trang Tài khoản). Ảnh: [hinh-ux1/](hinh-ux1/).
- **Hôm nay**:
  - Thẻ **"Hôm nay ôn gì?"**: một bài chính với nút Bắt đầu to, lấy từ kì thi gần nhất có bài ôn (ưu tiên bài chưa làm, rồi bài đúng dưới 90%, rồi đề ngẫu nhiên), kèm câu giải thích ("Kiểm tra giữa học kì I còn 12 ngày. Bài này bạn chưa làm…") và link "Tất cả bài ôn cho kì này · N bài ôn". Thêm một bài phụ: đề của môn chưa làm trong 7 ngày, hoặc đề có nhiều câu sai ở chủ đề hay sai.
  - **Chuỗi ngày ôn**: số ngày liền, hàng T2–CN tuần này (ngày có ôn tô xanh), mục tiêu 5 ngày mỗi tuần ("Tuần này bạn ôn 3/5 ngày", "Đạt mục tiêu tuần").
  - **Huy hiệu** (phần thưởng nhẹ, không có bảng xếp hạng): Chuỗi 3, 7, 14 ngày (tính theo chuỗi dài nhất từ trước đến nay nên không mất khi chuỗi đứt) và "Hết đề · <kì thi>" khi đã làm mọi bài ôn của một kì; huy hiệu mới có dòng chúc mừng một lần, kèm gợi ý huy hiệu tiếp theo.
  - **Kết quả gần đây**: 3 lần làm bài mới nhất, link "Xem tất cả" sang tab Kết quả. **Kì thi tiếp theo**: một thẻ, bấm để xem chi tiết và bài ôn của kì.
- **Bài ôn**: mọi bài ôn của khối, gom theo kì thi chưa qua: kì gần nhất mở sẵn, các kì sau thu gọn; bài không thuộc kì nào trong số đó ở nhóm "Bài ôn khác". Trong mỗi kì, đề ngân hàng gom theo môn thành một dòng có nút "Đề ngẫu nhiên · Đề 1 · Đề 2 · …" (nút đầu khi môn đó có đề ngẫu nhiên, Phiên K3); ở nhóm "Bài ôn khác" nút luôn ghi kèm tên kì ("Giữa kì I · Đề 1", "Cuối kì I · Đề ngẫu nhiên") để biết đề của kì nào. Nhãn "N bài ôn" (thẻ kì thi, đầu nhóm) đếm bài ôn dạng trang và đề cố định, không đếm đề ngẫu nhiên.
- **Lịch thi**: chỉ các kì thi chưa qua của khối mình (không có mốc năm học), mỗi kì một nhãn "Còn N ngày"; kì đã ôn có dòng "Đã làm đúng x% bài ôn của kì này".
- **Kết quả**: ba con số (số bài trong 7 ngày, **Điểm trung bình tháng** thang 10, số ngày ôn liên tiếp), **Theo môn** (thanh tỉ lệ đúng từng môn trong 30 ngày), **Chủ đề hay sai** (các chủ đề có nhiều câu sai nhất, từ ngân hàng câu hỏi), 30 bài gần nhất.
- Hồ sơ mới (thêm con, thêm học sinh) tự chọn sẵn hình đại diện chưa có ai dùng.

### 4.2 Phụ huynh — Mục “Các con” (Phiên UX2)
- Mỗi con một thẻ: số bài hôm nay; điểm hôm nay (chưa làm hôm nay thì điểm trung bình tuần); chuỗi ngày ôn; dòng “<kì thi gần nhất của khối con> còn N ngày · chưa ôn <môn>” (môn của bài ôn gắn với kì đó mà con chưa làm trong 7 ngày). Không còn các ô số liệu trùng ý.
- Bấm vào thẻ của con là mở thẳng báo cáo tuần của con (bên dưới). Ảnh: [hinh-ux2/](hinh-ux2/). Ở đó có hai link phụ: **Lịch thi lớp N** (lịch mở sẵn tab khối của con) và **Bài ôn của <tên>** (mọi bài ôn của khối, xem thử không lưu điểm); bài làm trước tuần này thu gọn ở cuối.
- **Báo cáo tuần** (= hồ sơ của con, phụ huynh và quản trị đều mở được): tóm tắt 7 ngày gần nhất (hôm nay và 6 ngày trước) gồm số bài, số ngày có ôn, điểm trung bình, số phút làm bài (so với tuần trước), số bài từng ngày, điểm theo môn, chủ đề hay sai, 3 kì thi sắp tới và tối đa 5 gợi ý ôn tuần sau. Gợi ý dựa trên số ngày ôn, bài ôn của kì thi tiếp theo chưa làm hoặc điểm thấp, môn dưới 70%, chủ đề hay sai, môn của kì thi chưa ôn trong tuần, chế độ “Làm như thi” khi còn ≤ 14 ngày. Nút “In báo cáo” in ra giấy A4 hoặc lưu PDF (nền trắng kể cả khi máy đang ở chế độ tối). Chỉ đọc dữ liệu, chạy như nhau ở bản lưu trên máy và bản đám mây. Ảnh: [màn hình 360px](hinh-bao-cao-tuan/bao-cao-tuan-360.jpg), [bản in](hinh-bao-cao-tuan/ban-in-a4.jpg).
- Lịch thi cả năm của các khối con đang học: nút “Lịch thi” ở thanh trên (bản đám mây: mục Lịch thi của khu phụ huynh, có sửa ngày tại chỗ).

### 4.3 Làm bài
- **Bài ôn dạng trang**: mở trong khung, giữ nguyên mọi chức năng của trang gốc. Tiến độ trong bài được tách riêng cho từng học sinh dù dùng chung máy. Mỗi lần làm xong, điểm tổng được gửi về hồ sơ.
- **Đề ngẫu nhiên** (Phiên K3): kho câu gộp từ các đề cố định cùng môn, cùng kì (và câu riêng nếu có); mỗi lần bấm là một đề khác, rút theo ma trận (số câu từng chủ đề, từng mức độ), ưu tiên câu con chưa làm hoặc hay sai; thiếu câu ở một ô thì lấy bù và ghi chú ngay ở màn đầu; trang kết quả có nút "Làm đề khác". Kết quả tính như đề thường (báo cáo tuần, chủ đề hay sai). Các đề cố định vẫn làm riêng được.
- **Ngân hàng câu hỏi**: hai chế độ — *Ôn luyện* (xem đáp án và lời giải sau từng câu) và *Làm như thi* (tính giờ, chỉ xem đáp án khi nộp). Trên mỗi câu chỉ một dòng nhãn "môn · chủ đề"; câu điền mà mọi đáp án là số thì mở bàn phím số (Phiên UX1).
- **Màn kết quả** (Phiên UX1): điểm thang 10 kèm lời khen hoặc động viên theo mức điểm ("Xuất sắc, Bin!", "Chưa sao, Bin. Xem lại lời giải rồi thử lại nhé."), so với lần trước cùng đề ("Hơn lần trước 2 câu (21/25)"), nút **"Ôn lại N câu sai"** (làm lại đúng các câu sai, không lưu điểm) và "Làm lại cả đề"; danh sách câu sai thu gọn, bấm từng câu mới xem đáp án và lời giải; thống kê theo chủ đề chỉ hiện chủ đề cần ôn thêm (có "Xem cả N chủ đề"), theo mức độ (Biết, Hiểu, Vận dụng, khi câu có ghi mức độ).
- **Đề Tiếng Anh bằng tiếng Anh** (Phiên TA2): với đề có môn Tiếng Anh (mọi khối, cả ngân hàng phụ huynh tự nhập) và bài ôn IOE, mọi chữ học sinh thấy từ màn mở đề đến hết màn kết quả đều bằng tiếng Anh: tên đề (“English 4 · End-of-term 1 · Test 1”), Practice / Test mode, True / False, Check, Skip, Next question, hộp hỏi khi rời đề, thông báo “Result saved”, link “Report a problem” và hộp chọn lí do, mức độ Know / Understand / Apply, số thập phân viết 9.25. Trang chủ, lịch thi, báo cáo, khu phụ huynh và dòng chỉ phụ huynh thấy (“Chế độ xem thử…”) giữ tiếng Việt; đề môn khác không đổi.
- **Báo câu này sai** (Phiên R1): dưới lời giải khi ôn luyện và dưới từng câu cần xem lại ở màn kết quả có link nhỏ có lá cờ; bấm thì chọn lí do (Đáp án sai · Câu hỏi khó hiểu · Lỗi chính tả · Khác), ghi chú ngắn nếu muốn, bấm Gửi là xong, có lời cảm ơn. Ai cũng báo được, kể cả phụ huynh đang xem thử. Bản lưu trên máy: Quản trị → Dữ liệu có danh sách và nút “Chép để gửi” (dán vào Zalo gửi người làm đề). Bản đám mây: báo cáo lên máy chủ (tối đa 30 câu mỗi ngày mỗi gia đình), Khu phụ huynh → Cài đặt → Chuyển dữ liệu và sao lưu xem lại kèm trạng thái; chủ app xử lí ở trang admin, tab “Câu bị báo” (đếm số lần mỗi câu bị báo, lọc theo đề, Đã sửa / Bỏ qua).
- **Dạng câu** (Phiên K2; mọi dạng làm bằng chạm trên điện thoại, không phải kéo thả): trắc nghiệm, điền khuyết, đúng/sai; **đúng/sai 4 ý** chấm từng ý như đề thi tốt nghiệp (đúng 1/2/3/4 ý được 0,1/0,25/0,5/1 câu); **trả lời bằng số** (dấu phẩy thập phân, có sai số cho phép, nút ± để gõ số âm); **nối cột** (chạm ô bên trái rồi ô bên phải, chấm theo số cặp nối đúng); **sắp xếp thứ tự** (chạm lần lượt, chạm lại để bỏ ra); **tự luận** có đáp án gợi ý và thang tự chấm (Chưa có, Một phần, Đủ cho từng ý). Câu có thể kèm **đoạn đọc dùng chung** (hiện phía trên câu hỏi, thu gọn được, các câu cùng đoạn đứng liền nhau) và **hình vẽ** (SVG đã lọc an toàn, màu đổi theo chế độ tối). Điểm tự chấm phần tự luận lưu riêng, không cộng vào điểm trung bình; báo cáo tuần có mục “Tự luận tự chấm”. Đề mẫu: “Đề thử nghiệm · Các dạng câu mới” (lớp 6, nhóm Bài ôn khác). Ảnh: [hinh-dang-cau/](hinh-dang-cau/).

### 4.4 Quản trị (bản đám mây: Khu phụ huynh)
**Bản đám mây** (Phiên UX2) gọn còn ba mục: **Các con** (mặc định; thẻ từng con như 4.2, “+ Thêm hồ sơ con”, N/5 hồ sơ) · **Lịch thi** (xem và sửa ngày ở cùng một chỗ: cả năm học của các khối con đang học, tab khối ghi tên con; dưới kì thi dự kiến có nút “Trường đã báo lịch? Sửa ngày” mở hộp sửa ngày ngay tại chỗ, lưu là bỏ nhãn Dự kiến; kì thi khác có “Sửa ngày, bài ôn”; nút “Lịch thi” ở thanh trên cũng về đây) · **Cài đặt** (Hồ sơ con; Đề tự soạn, tên mới của “Ngân hàng đề”, đề tự nhập trước và đề có sẵn thu gọn; Thông tin chung; Chuyển dữ liệu và sao lưu; Tài khoản). **Bắt đầu và chuyển máy cho con** (Phiên UX3, ảnh [hinh-ux3/](hinh-ux3/)): đầu mục Các con có thẻ “Bắt đầu trong 3 bước” (Thêm hồ sơ con → Đặt mã PIN, không bắt buộc → Đưa máy cho con) với nút to “Cho con học” mở màn hình “Ai đang học?”; thẻ ẩn khi một con đã học. Nút về “Ai đang học?” ở mọi chỗ gọi là **“Chọn hồ sơ khác”**. Trên máy đã ghi nhớ đăng nhập, bố mẹ đặt **mã mở nhanh** 4–6 số (Cài đặt → Tài khoản) để vào khu phụ huynh không phải gõ mật khẩu: mã băm và lưu trên chính máy đó, quên mã thì nhập mật khẩu; đổi mật khẩu và đăng xuất vẫn cần mật khẩu, đăng xuất thì mã bị xóa. Bản lưu trên máy giữ năm tab quản trị dưới đây cho thầy cô:
- **Tổng quan**: số học sinh, phụ huynh, số bài làm 7 ngày; danh sách học sinh (bấm là mở báo cáo tuần); kì thi tiếp theo mỗi khối.
- **Tài khoản**: thêm/sửa/xóa, đặt lại PIN, gắn phụ huynh–con.
- **Lịch thi**: sửa từng kì, gắn bài ôn và ngân hàng câu hỏi.
- **Ngân hàng đề**: dán câu hỏi từ Word/Zalo hoặc mở file .txt theo cú pháp:

  ```
  # Tên chủ đề
  Câu hỏi trắc nghiệm?
  * đáp án đúng
  - đáp án sai
  > lời giải (không bắt buộc)

  Câu điền khuyết có [đáp án|cách viết khác].

  Đúng: một mệnh đề đúng.

  Sai: một mệnh đề sai.

  Câu đúng/sai 4 ý?
  a) Đúng: ý a
  b) Sai: ý b
  c) Đúng: ý c
  d) Sai: ý d
  Mức: Hiểu

  Câu trả lời bằng số?
  Đáp số: 2,5 ± 0,1 kg

  Nối cột:
  trái 1 -> phải 1
  trái 2 -> phải 2
  -> ô thừa

  Sắp xếp theo thứ tự:
  1) thứ nhất
  2) thứ hai
  3) thứ ba

  Tự luận: đề bài
  + ý cần có (1)
  + ý khác (0,5)
  > đáp án gợi ý

  Đoạn đọc: Tiêu đề
  Đoạn văn dùng chung cho các câu bên dưới (nhiều dòng được).
  Hết đoạn

  Câu hỏi về đoạn đọc?
  * đáp án đúng
  - đáp án sai
  ```
  Hình vẽ: dán mã `<svg viewBox="…">…</svg>` vào câu (màu ghi bằng tên: ink, acc, ok, bad…). App báo số câu từng dạng nhận được và dòng nào sai cú pháp trước khi lưu.
- **Dữ liệu**: tên trường, năm học, tải file sao lưu (JSON) kèm lần sao lưu gần nhất, khôi phục từ file, hướng dẫn thêm app vào Màn hình chính, xóa toàn bộ (gõ XOA để xác nhận).

## 5. Lưu trữ

App có hai cách lưu, cùng một giao diện.

**Bản lưu trên máy** (`js/config.js` để trống `supabaseUrl`, `supabaseAnonKey`): mọi thứ nằm trong trình duyệt của máy đang dùng. Phù hợp khi cả nhà hoặc cả lớp dùng chung một máy tính/máy tính bảng. Muốn dùng trên máy khác thì sao lưu ra file rồi khôi phục ở máy đó (dữ liệu hai máy không tự đồng bộ). Quá 7 ngày chưa sao lưu (hoặc chưa sao lưu lần nào mà đã có bài làm), trang chủ của quản trị và phụ huynh hiện thẻ nhắc có nút tải file sao lưu.

App mở lại được khi mất mạng: lần mở đầu (cần mạng) trình duyệt lưu sẵn các file của app, kể cả font. Thêm app vào Màn hình chính (iPhone, iPad: Chia sẻ → Thêm vào MH chính; Android: menu ⋮ → Thêm vào màn hình chính) để có biểu tượng riêng, và để Safari không xóa dữ liệu khi lâu không mở.

Mã PIN chỉ để phân biệt người dùng, không phải bảo mật thật.

**Bản đám mây** (trang https://dunglnh.github.io/OnUp/ chạy bản này từ 17/10/2026; tài khoản theo [THIET-KE-TAI-KHOAN.md](THIET-KE-TAI-KHOAN.md)): dữ liệu nằm trên Supabase và dùng chung trên nhiều máy. Một tài khoản là một gia đình, do chủ app cấp ở trang admin (`admin.html`: tạo tài khoản với mật khẩu tạm gợi ý sẵn, đặt lại mật khẩu, khóa, mở khóa, xóa, ghi chú, nhật ký, số liệu nhanh; không xem bài làm của các con): phụ huynh đăng nhập bằng tên đăng nhập + mật khẩu (lần đầu đặt mật khẩu mới; “Ghi nhớ trên máy này” cho máy con dùng hằng ngày; dòng “Quên mật khẩu?” và thẻ “Chưa có tài khoản?” chỉ cách liên hệ người cấp; máy còn dữ liệu của bản lưu trên máy chưa chuyển thì màn đăng nhập nhắc đường chuyển lên). Con là hồ sơ trong tài khoản: màn hình “Ai đang học?” hiện các hồ sơ con và ô Phụ huynh; hồ sơ có mã PIN 4 số (không bắt buộc) thì nhập PIN. Vào khu phụ huynh phải nhập lại mật khẩu, hoặc mã mở nhanh 4–6 số đã đặt trên máy đã ghi nhớ (Phiên UX3); ở đó có ba mục (Phiên UX2): Các con (thẻ từng con, bấm là mở báo cáo tuần), Lịch thi (xem và sửa ngày khi trường báo lịch), Cài đặt (thêm/sửa/xóa hồ sơ con, tối đa 5; đề tự soạn; chuyển dữ liệu từ bản lưu trên máy lên, học sinh giữ PIN cũ; sao lưu; đổi mật khẩu, đăng xuất). Kết quả làm xong khi mất mạng được giữ trên máy và gửi lên khi có mạng. Ảnh: [hinh-dam-may/](hinh-dam-may/).

Trang thật **chỉ dành cho gia đình được mời** (quyết định 18/10/2026): không tự đăng ký, không đăng nhập bằng email; chưa có tài khoản thì liên hệ theo dòng ở màn đăng nhập. App đang **miễn phí**: mỗi tài khoản tối đa 5 hồ sơ con, dùng được mọi đề. Bản trả phí chỉ tính đến khi đã đủ đề lớp 4–12 (hướng đi: [THIET-KE-TAI-KHOAN.md](THIET-KE-TAI-KHOAN.md) mục 9). Muốn cài một bản đám mây riêng: [HUONG-DAN-SUPABASE.md](HUONG-DAN-SUPABASE.md).

## 6. Không làm, hoặc chưa có
- **Không làm:** tự đăng ký, đăng nhập bằng email, mã mời, mã gia đình (trang chỉ dành cho gia đình được mời; lí do ở [THIET-KE-TAI-KHOAN.md](THIET-KE-TAI-KHOAN.md) mục 1, 2). Bản trả phí: xem mục 5.
- Violympic Toán, Trạng Nguyên Tiếng Việt (tạm bỏ khỏi lịch; quản trị viên vẫn tự thêm được nếu cần).
- Giáo viên giao bài cho cả lớp, bảng xếp hạng.
- Đề giữa kì II lớp 6 và đề cuối năm lớp 4, lớp 6 (đã có chỗ trong lịch, chưa có câu hỏi; lớp 4 đã có 4 đề giữa kì II). Số đề đang có: `node tests/kiem-tra-de.js`.
- Thông báo nhắc ôn qua điện thoại.
- Các cải tiến giao diện 2.x còn lại (làm bài tập trung, biết bài đã gửi chưa…): đã có trong lộ trình, chưa có trong app. Trang “Hôm nay” và màn kết quả mới đã làm ở Phiên UX1; khu phụ huynh gọn lại ở Phiên UX2; chọn hồ sơ và nhập PIN ở Phiên UX4.

## 7. Lộ trình tiếp theo

Trạng thái, thứ tự các phiên và lời giao việc chỉ ghi ở [KE-HOACH-PHAT-TRIEN-ONUP.md](KE-HOACH-PHAT-TRIEN-ONUP.md).

## 8. Tiêu chí hoàn thành bản 1.0
- [x] Thiết lập lần đầu, tạo quản trị, phụ huynh, học sinh; đăng nhập bằng PIN.
- [x] Lịch thi cả năm 2026–2027 cho khối 4 và 6, sửa được.
- [x] 4 bài ôn gốc chạy trong app, tiến độ tách theo học sinh, điểm lưu vào hồ sơ.
- [x] Ngân hàng câu hỏi: 18 đề cuối kì I có sẵn (thay 2 bộ mẫu ban đầu), nhập thêm bằng văn bản.
- [x] Phụ huynh xem tiến độ của con.
- [x] Sao lưu/khôi phục bằng file.
- [x] Chạy tốt trên điện thoại, có chế độ tối.
