/* Ngân hàng câu hỏi có sẵn cho bộ làm bài chung (js/quiz.js).
   Quản trị viên có thể nhập thêm ngân hàng ngay trong app (mục Quản trị → Ngân hàng đề);
   ngân hàng nhập vào được lưu trong kho dữ liệu, không sửa file này.

   Dạng câu hỏi:
   { type: "mc",   q: "...", o: ["đáp án đúng", "sai", "sai", "sai"], x: "giải thích" }   // đáp án đúng luôn đứng đầu, app tự xáo
   { type: "fill", q: "... ___ ...", ans: ["đáp án", "cách viết khác"], x: "..." }
   { type: "tf",   q: "Mệnh đề", a: true, x: "..." }
   topic: tên chủ đề để thống kê câu sai theo chủ đề. */
window.ONTAP_SEED_BANKS = [
  {
    id: "mau-toan4-ck1", title: "Toán 4 · Ôn cuối học kì I (bộ mẫu)", grade: 4, subject: "Toán", minutes: 25,
    note: "Bộ câu mẫu để thử bộ làm bài chung. Thầy cô, phụ huynh nhập thêm câu trong mục Quản trị.",
    questions: [
      { topic: "Phép cộng, phép trừ", type: "mc", q: "345 678 + 254 322 = ?", o: ["600 000", "590 000", "599 990", "600 100"], x: "Cộng từ phải sang trái, nhớ sang hàng bên trái: kết quả 600 000." },
      { topic: "Phép cộng, phép trừ", type: "fill", q: "1 000 000 − 456 789 = ___", ans: ["543211"], x: "1 000 000 − 456 789 = 543 211. Thử lại: 543 211 + 456 789 = 1 000 000." },
      { topic: "Tính chất phép cộng", type: "mc", q: "Tính chất giao hoán của phép cộng: a + b = ?", o: ["b + a", "a − b", "a × b", "(a + b) + 0 + 1"], x: "Khi đổi chỗ các số hạng trong một tổng thì tổng không thay đổi." },
      { topic: "Tính chất phép cộng", type: "fill", q: "Tính bằng cách thuận tiện: 237 + 98 + 63 + 2 = ___", ans: ["400"], x: "(237 + 63) + (98 + 2) = 300 + 100 = 400." },
      { topic: "Tổng và hiệu", type: "fill", q: "Tổng của hai số là 60, hiệu của chúng là 14. Số lớn là ___", ans: ["37"], x: "Số lớn = (tổng + hiệu) : 2 = (60 + 14) : 2 = 37." },
      { topic: "Tổng và hiệu", type: "fill", q: "Tổng của hai số là 100, hiệu của chúng là 20. Số bé là ___", ans: ["40"], x: "Số bé = (tổng − hiệu) : 2 = (100 − 20) : 2 = 40." },
      { topic: "Làm tròn số", type: "mc", q: "Làm tròn số 2 650 400 đến hàng trăm nghìn, ta được:", o: ["2 700 000", "2 600 000", "2 650 000", "3 000 000"], x: "Xét chữ số hàng chục nghìn: là 5, không bé hơn 5 nên làm tròn lên. Làm tròn số 2 650 400 đến hàng trăm nghìn ta được 2 700 000." },
      { topic: "Đường thẳng vuông góc, song song", type: "mc", q: "Hai đường thẳng vuông góc với nhau tạo thành mấy góc vuông?", o: ["4", "2", "1", "3"], x: "Hai đường thẳng vuông góc cắt nhau tạo thành 4 góc vuông chung đỉnh." },
      { topic: "Đường thẳng vuông góc, song song", type: "tf", q: "Hai đường thẳng song song thì không bao giờ cắt nhau.", a: true, x: "Kéo dài mãi về hai phía, hai đường thẳng song song vẫn không cắt nhau." },
      { topic: "Hình bình hành, hình thoi", type: "mc", q: "Hình bình hành có đặc điểm:", o: ["Hai cặp cạnh đối diện song song và bằng nhau", "Bốn góc vuông", "Chỉ có một cặp cạnh song song", "Ba cạnh bằng nhau"], x: "Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau." },
      { topic: "Hình bình hành, hình thoi", type: "mc", q: "Hình thoi có đặc điểm:", o: ["Bốn cạnh bằng nhau và hai cặp cạnh đối diện song song", "Bốn góc vuông và hai cạnh bằng nhau", "Chỉ có hai cạnh bằng nhau", "Không có cạnh nào song song"], x: "Hình thoi có bốn cạnh bằng nhau và hai cặp cạnh đối diện song song." },
      { topic: "Đơn vị đo", type: "fill", q: "5 tấn 30 kg = ___ kg", ans: ["5030"], x: "5 tấn = 5 000 kg; 5 000 + 30 = 5 030 (kg)." }
    ]
  },
  /* ---------- Toán 4 · Kiểm tra cuối học kì I (Kết nối tri thức, Bài 1–37) ----------
     Ba đề cùng phạm vi: số có nhiều chữ số, biểu thức chứa chữ, cộng trừ, tổng và hiệu,
     giải toán ba bước tính, góc, đơn vị đo (yến tạ tấn, dm² m² mm², giây thế kỉ),
     đường thẳng vuông góc/song song, hình bình hành, hình thoi. Câu tự soạn. */
  {
    id: "toan4-ck1-de1", title: "Toán 4 · Cuối kì I · Đề 1", grade: 4, subject: "Toán", minutes: 40,
    note: "Toàn bộ chương trình học kì I (Bài 1–37), sách Kết nối tri thức. Có lời giải từng câu.",
    questions: [
      { topic: "Số có nhiều chữ số", type: "mc", q: "Số “Ba trăm linh năm nghìn bốn trăm hai mươi” viết là:", o: ["305 420", "300 542", "350 420", "305 042"], x: "Ba trăm linh năm nghìn là 305 nghìn, bốn trăm hai mươi là 420. Viết liền: 305 420." },
      { topic: "Số có nhiều chữ số", type: "mc", q: "Trong số 47 256 913, chữ số 7 thuộc hàng nào?", o: ["Hàng triệu", "Hàng chục triệu", "Hàng trăm nghìn", "Hàng chục nghìn"], x: "Tách lớp: 47 | 256 | 913. Chữ số 4 ở hàng chục triệu, chữ số 7 ở hàng triệu." },
      { topic: "Số có nhiều chữ số", type: "fill", q: "Số gồm 6 trăm nghìn, 4 nghìn, 3 chục và 8 đơn vị viết là ___", ans: ["604 038"], x: "600 000 + 4 000 + 30 + 8 = 604 038. Hàng chục nghìn và hàng trăm không có nên viết chữ số 0." },
      { topic: "Số có nhiều chữ số", type: "mc", q: "Số lớn nhất trong các số 489 760; 498 670; 489 706; 498 607 là:", o: ["498 670", "498 607", "489 760", "489 706"], x: "Hàng trăm nghìn đều là 4. Hàng chục nghìn: 9 > 8, nên còn 498 670 và 498 607. Hàng nghìn, hàng trăm giống nhau; hàng chục 7 > 0, nên 498 670 lớn nhất." },
      { topic: "Làm tròn số", type: "mc", q: "Làm tròn số 3 459 210 đến hàng trăm nghìn, ta được:", o: ["3 500 000", "3 400 000", "3 460 000", "3 000 000"], x: "Xét chữ số hàng chục nghìn: là 5, không bé hơn 5 nên làm tròn lên. Làm tròn số 3 459 210 đến hàng trăm nghìn ta được 3 500 000." },
      { topic: "Số chẵn, số lẻ", type: "tf", q: "Số 9 998 là số lẻ.", a: false, x: "Số có chữ số tận cùng là 0, 2, 4, 6, 8 là số chẵn. 9 998 tận cùng là 8 nên là số chẵn." },
      { topic: "Số có nhiều chữ số", type: "fill", q: "Số liền sau của số 999 999 là ___", ans: ["1 000 000", "1 triệu", "một triệu"], x: "999 999 + 1 = 1 000 000 (một triệu)." },
      { topic: "Biểu thức chứa chữ", type: "fill", q: "Với a = 125, giá trị của biểu thức 900 − a × 4 là ___", ans: ["400"], x: "Thay a = 125: 900 − 125 × 4 = 900 − 500 = 400. Nhân trước, trừ sau." },
      { topic: "Biểu thức chứa chữ", type: "mc", q: "Hình vuông có cạnh là a. Công thức tính chu vi P của hình vuông là:", o: ["P = a × 4", "P = a + 4", "P = a × a", "P = (a + 4) × 2"], x: "Hình vuông có 4 cạnh bằng nhau, nên chu vi bằng độ dài một cạnh nhân 4: P = a × 4." },
      { topic: "Phép cộng, phép trừ", type: "fill", q: "458 362 + 236 519 = ___", ans: ["694 881"], x: "Đặt tính rồi cộng từ phải sang trái, nhớ sang hàng bên trái: 458 362 + 236 519 = 694 881." },
      { topic: "Phép cộng, phép trừ", type: "fill", q: "862 450 − 315 270 = ___", ans: ["547 180"], x: "Đặt tính rồi trừ từ phải sang trái: 862 450 − 315 270 = 547 180. Thử lại: 547 180 + 315 270 = 862 450." },
      { topic: "Phép nhân, phép chia", type: "fill", q: "36 480 : 6 = ___", ans: ["6 080"], x: "Chia từ trái sang phải: 36 : 6 = 6; hạ 4, 4 : 6 = 0 (dư 4); hạ 8 được 48, 48 : 6 = 8; hạ 0, 0 : 6 = 0. Kết quả 6 080. Thử lại: 6 080 × 6 = 36 480." },
      { topic: "Tính chất phép cộng", type: "fill", q: "Tính bằng cách thuận tiện: 1 568 + 3 750 + 432 = ___", ans: ["5 750"], x: "Đổi chỗ và nhóm hai số có tổng tròn nghìn: (1 568 + 432) + 3 750 = 2 000 + 3 750 = 5 750." },
      { topic: "Tính chất phép cộng", type: "tf", q: "(a + b) + c = a + (b + c) là tính chất giao hoán của phép cộng.", a: false, x: "Đây là tính chất kết hợp. Tính chất giao hoán là a + b = b + a." },
      { topic: "Tổng và hiệu", type: "fill", q: "Hai lớp 4A và 4B trồng được tất cả 86 cây. Lớp 4A trồng nhiều hơn lớp 4B 8 cây. Lớp 4A trồng được ___ cây.", ans: ["47"], x: "Số lớn = (tổng + hiệu) : 2 = (86 + 8) : 2 = 47. Lớp 4B trồng 86 − 47 = 39 cây." },
      { topic: "Tổng và hiệu", type: "mc", q: "Tổng của hai số là 1 250. Số lớn hơn số bé 150 đơn vị. Số bé là:", o: ["550", "700", "1 100", "600"], x: "Số bé = (tổng − hiệu) : 2 = (1 250 − 150) : 2 = 550. Số lớn là 550 + 150 = 700." },
      { topic: "Giải bài toán có ba bước tính", type: "fill", q: "Cửa hàng có 3 thùng dầu, mỗi thùng 45 lít. Buổi sáng bán 32 lít, buổi chiều bán 41 lít. Cửa hàng còn lại ___ lít dầu.", ans: ["62"], x: "Có tất cả: 45 × 3 = 135 (lít). Đã bán: 32 + 41 = 73 (lít). Còn lại: 135 − 73 = 62 (lít)." },
      { topic: "Góc và đo góc", type: "mc", q: "Góc có số đo 120° là:", o: ["Góc tù", "Góc nhọn", "Góc vuông", "Góc bẹt"], x: "Góc tù lớn hơn góc vuông (90°) và bé hơn góc bẹt (180°). 90° < 120° < 180° nên đây là góc tù." },
      { topic: "Góc và đo góc", type: "fill", q: "Góc bẹt có số đo bằng ___°", ans: ["180", "180°", "180 độ"], x: "Góc bẹt bằng hai góc vuông: 90° + 90° = 180°." },
      { topic: "Góc và đo góc", type: "mc", q: "Khi đo góc bằng thước đo góc, ta đặt tâm của thước trùng với:", o: ["Đỉnh của góc", "Điểm giữa một cạnh của góc", "Một điểm bất kì bên trong góc", "Một điểm bất kì bên ngoài góc"], x: "Đặt tâm của thước trùng với đỉnh của góc, một cạnh của góc đi qua vạch 0 của thước. Cạnh kia đi qua vạch nào thì đó là số đo của góc." },
      { topic: "Đơn vị đo", type: "fill", q: "3 tạ 5 kg = ___ kg", ans: ["305"], x: "1 tạ = 100 kg nên 3 tạ = 300 kg; 300 + 5 = 305 (kg)." },
      { topic: "Đơn vị đo", type: "mc", q: "2 m² = ? dm²", o: ["200 dm²", "20 dm²", "2 000 dm²", "20 000 dm²"], x: "1 m² = 100 dm² nên 2 m² = 200 dm²." },
      { topic: "Đơn vị đo", type: "fill", q: "3 phút 20 giây = ___ giây", ans: ["200"], x: "1 phút = 60 giây nên 3 phút = 180 giây; 180 + 20 = 200 (giây)." },
      { topic: "Đường thẳng vuông góc, song song", type: "tf", q: "Hai cạnh đối diện của hình chữ nhật thì song song với nhau.", a: true, x: "Hình chữ nhật có hai cặp cạnh đối diện song song (và bằng nhau)." },
      { topic: "Hình bình hành, hình thoi", type: "mc", q: "Hình thoi ABCD có cạnh AB = 6 cm. Chu vi hình thoi là:", o: ["24 cm", "12 cm", "36 cm", "18 cm"], x: "Hình thoi có bốn cạnh bằng nhau, nên chu vi là 6 × 4 = 24 (cm)." }
    ]
  },
  {
    id: "toan4-ck1-de2", title: "Toán 4 · Cuối kì I · Đề 2", grade: 4, subject: "Toán", minutes: 40,
    note: "Toàn bộ chương trình học kì I (Bài 1–37), sách Kết nối tri thức. Có lời giải từng câu.",
    questions: [
      { topic: "Số có nhiều chữ số", type: "mc", q: "Số 2 050 300 đọc là:", o: ["Hai triệu không trăm năm mươi nghìn ba trăm", "Hai triệu năm trăm nghìn ba trăm", "Hai trăm linh năm nghìn ba trăm", "Hai triệu không trăm năm mươi nghìn không trăm ba mươi"], x: "Tách lớp: 2 | 050 | 300. Đọc: hai triệu, không trăm năm mươi nghìn, ba trăm." },
      { topic: "Số có nhiều chữ số", type: "fill", q: "Giá trị của chữ số 8 trong số 3 816 405 là ___", ans: ["800 000", "800 nghìn", "8 trăm nghìn", "tám trăm nghìn"], x: "Tách lớp: 3 | 816 | 405. Chữ số 8 ở hàng trăm nghìn nên có giá trị 800 000." },
      { topic: "Số có nhiều chữ số", type: "mc", q: "Lớp nghìn của số 52 714 096 gồm các chữ số:", o: ["7; 1; 4", "5; 2", "0; 9; 6", "2; 7; 1"], x: "Tách lớp từ phải sang trái: 52 | 714 | 096. Lớp nghìn gồm 7, 1, 4." },
      { topic: "Số có nhiều chữ số", type: "tf", q: "987 654 > 1 000 000", a: false, x: "987 654 có 6 chữ số, 1 000 000 có 7 chữ số. Số nào nhiều chữ số hơn thì lớn hơn, nên 987 654 < 1 000 000." },
      { topic: "Làm tròn số", type: "fill", q: "Làm tròn số 7 249 860 đến hàng trăm nghìn, ta được ___", ans: ["7 200 000"], x: "Xét chữ số hàng chục nghìn: là 4, bé hơn 5 nên làm tròn xuống. Làm tròn số 7 249 860 đến hàng trăm nghìn ta được 7 200 000." },
      { topic: "Số chẵn, số lẻ", type: "fill", q: "Số chẵn lớn nhất có năm chữ số là ___", ans: ["99 998"], x: "Số lớn nhất có năm chữ số là 99 999 (số lẻ). Số chẵn liền trước nó là 99 998." },
      { topic: "Số có nhiều chữ số", type: "mc", q: "Số tự nhiên bé nhất là:", o: ["0", "1", "10", "Không có số bé nhất"], x: "Dãy số tự nhiên bắt đầu từ 0: 0, 1, 2, 3, … Số 0 là số tự nhiên bé nhất." },
      { topic: "Biểu thức chứa chữ", type: "fill", q: "Với m = 9 và n = 6, giá trị của biểu thức (m + n) × 7 là ___", ans: ["105"], x: "Thay m = 9, n = 6: (9 + 6) × 7 = 15 × 7 = 105. Tính trong ngoặc trước." },
      { topic: "Biểu thức chứa chữ", type: "mc", q: "Với b = 5, biểu thức nào có giá trị lớn nhất?", o: ["200 − b", "b × 30", "b + 120", "600 : b"], x: "Thay b = 5: 200 − 5 = 195; 5 × 30 = 150; 5 + 120 = 125; 600 : 5 = 120. Lớn nhất là 195." },
      { topic: "Phép cộng, phép trừ", type: "fill", q: "386 405 + 572 718 = ___", ans: ["959 123"], x: "Đặt tính rồi cộng từ phải sang trái, nhớ sang hàng bên trái: 386 405 + 572 718 = 959 123." },
      { topic: "Phép cộng, phép trừ", type: "fill", q: "657 928 − 219 635 = ___", ans: ["438 293"], x: "Đặt tính rồi trừ từ phải sang trái, có nhớ ở hàng chục và hàng nghìn: 657 928 − 219 635 = 438 293. Thử lại: 438 293 + 219 635 = 657 928." },
      { topic: "Phép cộng, phép trừ", type: "fill", q: "135 470 + ___ = 482 650", ans: ["347 180"], x: "Muốn tìm số hạng chưa biết, lấy tổng trừ số hạng đã biết: 482 650 − 135 470 = 347 180." },
      { topic: "Tính chất phép cộng", type: "mc", q: "Tính bằng cách thuận tiện: 4 725 + 999 + 275 = ?", o: ["5 999", "5 899", "6 000", "5 989"], x: "Nhóm hai số có tổng tròn nghìn: (4 725 + 275) + 999 = 5 000 + 999 = 5 999." },
      { topic: "Tổng và hiệu", type: "fill", q: "Tổng của hai số là số lớn nhất có ba chữ số, hiệu của chúng là 101. Số lớn là ___", ans: ["550"], x: "Số lớn nhất có ba chữ số là 999. Số lớn = (999 + 101) : 2 = 550. Số bé = 999 − 550 = 449." },
      { topic: "Tổng và hiệu", type: "tf", q: "Khi biết tổng và hiệu của hai số, muốn tìm số bé ta lấy tổng trừ đi hiệu rồi chia cho 2.", a: true, x: "Số bé = (tổng − hiệu) : 2; số lớn = (tổng + hiệu) : 2." },
      { topic: "Giải bài toán có ba bước tính", type: "mc", q: "Mẹ mua 4 kg táo, mỗi ki-lô-gam giá 22 000 đồng, và một hộp sữa giá 21 000 đồng. Mẹ đưa cô bán hàng 150 000 đồng. Cô trả lại mẹ bao nhiêu tiền?", o: ["41 000 đồng", "109 000 đồng", "62 000 đồng", "107 000 đồng"], x: "Tiền táo: 22 000 × 4 = 88 000 (đồng). Tiền táo và sữa: 88 000 + 21 000 = 109 000 (đồng). Tiền trả lại: 150 000 − 109 000 = 41 000 (đồng)." },
      { topic: "Giải bài toán có ba bước tính", type: "fill", q: "Một kho có 12 850 kg gạo. Ngày thứ nhất xuất 3 200 kg, ngày thứ hai xuất gấp đôi ngày thứ nhất. Kho còn lại ___ kg gạo.", ans: ["3 250"], x: "Ngày thứ hai xuất: 3 200 × 2 = 6 400 (kg). Hai ngày xuất: 3 200 + 6 400 = 9 600 (kg). Còn lại: 12 850 − 9 600 = 3 250 (kg)." },
      { topic: "Góc và đo góc", type: "mc", q: "Lúc 3 giờ, kim giờ và kim phút của đồng hồ tạo thành góc gì?", o: ["Góc vuông", "Góc nhọn", "Góc tù", "Góc bẹt"], x: "Lúc 3 giờ, kim phút chỉ số 12, kim giờ chỉ số 3. Hai kim tạo thành góc 90°, là góc vuông." },
      { topic: "Đơn vị đo", type: "mc", q: "Chọn đơn vị đo thích hợp: Một con voi trưởng thành nặng khoảng 5 …", o: ["tấn", "tạ", "yến", "kg"], x: "Con voi rất nặng, khoảng 5 tấn = 5 000 kg. 5 tạ = 500 kg, 5 yến = 50 kg và 5 kg đều quá nhẹ so với một con voi." },
      { topic: "Góc và đo góc", type: "mc", q: "Thước đo góc dùng để đo góc theo đơn vị nào?", o: ["Độ (°)", "Xăng-ti-mét (cm)", "Mét vuông (m²)", "Giây"], x: "Đơn vị đo góc là độ, kí hiệu °. Ví dụ: góc vuông bằng 90°." },
      { topic: "Đơn vị đo", type: "fill", q: "7 yến 6 kg = ___ kg", ans: ["76"], x: "1 yến = 10 kg nên 7 yến = 70 kg; 70 + 6 = 76 (kg)." },
      { topic: "Đơn vị đo", type: "fill", q: "5 dm² 8 cm² = ___ cm²", ans: ["508"], x: "1 dm² = 100 cm² nên 5 dm² = 500 cm²; 500 + 8 = 508 (cm²)." },
      { topic: "Đơn vị đo", type: "mc", q: "Năm 1945 thuộc thế kỉ nào?", o: ["Thế kỉ XX", "Thế kỉ XIX", "Thế kỉ XXI", "Thế kỉ XV"], x: "Thế kỉ XX tính từ năm 1901 đến hết năm 2000. Năm 1945 nằm trong khoảng đó." },
      { topic: "Đường thẳng vuông góc, song song", type: "mc", q: "Hình chữ nhật ABCD có bao nhiêu cặp cạnh vuông góc với nhau?", o: ["4", "2", "1", "8"], x: "Hai cạnh chung một đỉnh của hình chữ nhật thì vuông góc: AB và BC, BC và CD, CD và DA, DA và AB. Có 4 cặp." },
      { topic: "Hình bình hành, hình thoi", type: "tf", q: "Hình bình hành ABCD có AB = 7 cm, BC = 4 cm. Chu vi hình bình hành là 22 cm.", a: true, x: "Hình bình hành có các cạnh đối diện bằng nhau: CD = 7 cm, DA = 4 cm. Chu vi: 7 + 4 + 7 + 4 = 22 (cm)." }
    ]
  },
  {
    id: "toan4-ck1-de3", title: "Toán 4 · Cuối kì I · Đề 3", grade: 4, subject: "Toán", minutes: 40,
    note: "Toàn bộ chương trình học kì I (Bài 1–37), sách Kết nối tri thức. Đề này có thêm câu nâng cao.",
    questions: [
      { topic: "Số có nhiều chữ số", type: "fill", q: "Số gồm 5 chục triệu, 3 triệu, 7 nghìn và 2 chục viết là ___", ans: ["53 007 020"], x: "50 000 000 + 3 000 000 + 7 000 + 20 = 53 007 020. Các hàng không có thì viết chữ số 0." },
      { topic: "Số có nhiều chữ số", type: "mc", q: "Trong số 608 315 742, chữ số 0 thuộc hàng nào, lớp nào?", o: ["Hàng chục triệu, lớp triệu", "Hàng triệu, lớp triệu", "Hàng chục nghìn, lớp nghìn", "Hàng trăm triệu, lớp triệu"], x: "Tách lớp: 608 | 315 | 742. Lớp triệu gồm 6 (trăm triệu), 0 (chục triệu), 8 (triệu)." },
      { topic: "Số có nhiều chữ số", type: "mc", q: "Từ bốn chữ số 0, 3, 5, 9, số bé nhất có bốn chữ số khác nhau lập được là:", o: ["3 059", "0 359", "3 095", "9 530"], x: "Chữ số đầu tiên không được là 0, nên chọn chữ số bé nhất khác 0 là 3. Các chữ số còn lại xếp từ bé đến lớn: 0, 5, 9. Ta được 3 059." },
      { topic: "Số có nhiều chữ số", type: "mc", q: "Các số 5 309 280; 5 390 028; 5 093 820; 5 309 082 xếp theo thứ tự từ bé đến lớn là:", o: ["5 093 820; 5 309 082; 5 309 280; 5 390 028", "5 093 820; 5 309 280; 5 309 082; 5 390 028", "5 390 028; 5 309 280; 5 309 082; 5 093 820", "5 309 082; 5 093 820; 5 309 280; 5 390 028"], x: "Các số cùng có 7 chữ số và cùng chữ số hàng triệu là 5. So sánh lần lượt hàng trăm nghìn, chục nghìn, … ta được 5 093 820 < 5 309 082 < 5 309 280 < 5 390 028." },
      { topic: "Làm tròn số", type: "tf", q: "Làm tròn số 8 950 000 đến hàng trăm nghìn, ta được 9 000 000.", a: true, x: "Chữ số hàng chục nghìn là 5 nên làm tròn lên: 8 900 000 + 100 000 = 9 000 000." },
      { topic: "Số chẵn, số lẻ", type: "mc", q: "Từ 11 đến 29 có bao nhiêu số lẻ?", o: ["10", "9", "19", "20"], x: "Các số lẻ là 11, 13, 15, 17, 19, 21, 23, 25, 27, 29. Có 10 số." },
      { topic: "Số có nhiều chữ số", type: "fill", q: "Số liền trước của số 4 000 000 là ___", ans: ["3 999 999"], x: "4 000 000 − 1 = 3 999 999." },
      { topic: "Biểu thức chứa chữ", type: "fill", q: "Với a = 2 400 và b = 8, giá trị của biểu thức a : b + a là ___", ans: ["2 700"], x: "Thay a = 2 400, b = 8: 2 400 : 8 + 2 400 = 300 + 2 400 = 2 700. Chia trước, cộng sau." },
      { topic: "Hình bình hành, hình thoi", type: "fill", q: "Hình bình hành ABCD có chu vi 30 cm, cạnh AB dài 9 cm. Cạnh BC dài ___ cm.", ans: ["6"], x: "Hình bình hành có các cạnh đối diện bằng nhau (CD = AB, DA = BC), nên AB + BC bằng nửa chu vi: 30 : 2 = 15 (cm). Vậy BC = 15 − 9 = 6 (cm)." },
      { topic: "Phép cộng, phép trừ", type: "fill", q: "473 528 + 251 647 = ___", ans: ["725 175"], x: "Đặt tính rồi cộng từ phải sang trái, nhớ sang hàng bên trái ở hàng đơn vị, hàng trăm và hàng chục nghìn: 473 528 + 251 647 = 725 175." },
      { topic: "Phép cộng, phép trừ", type: "mc", q: "Hiệu của số lớn nhất có sáu chữ số và số bé nhất có sáu chữ số là:", o: ["899 999", "900 000", "899 990", "999 998"], x: "Số lớn nhất có sáu chữ số là 999 999, số bé nhất có sáu chữ số là 100 000. Hiệu: 999 999 − 100 000 = 899 999." },
      { topic: "Phép cộng, phép trừ", type: "fill", q: "___ + 48 735 = 351 960", ans: ["303 225"], x: "Muốn tìm số hạng chưa biết, lấy tổng trừ số hạng đã biết: 351 960 − 48 735 = 303 225." },
      { topic: "Tính chất phép cộng", type: "fill", q: "Tính bằng cách thuận tiện: 2 345 + 1 860 + 655 + 140 = ___", ans: ["5 000"], x: "(2 345 + 655) + (1 860 + 140) = 3 000 + 2 000 = 5 000." },
      { topic: "Phép nhân, phép chia", type: "fill", q: "13 204 × 4 = ___", ans: ["52 816"], x: "Đặt tính rồi nhân từ phải sang trái, nhớ sang hàng bên trái: 13 204 × 4 = 52 816. Thử lại: 52 816 : 4 = 13 204." },
      { topic: "Tổng và hiệu", type: "fill", q: "Bố hơn con 28 tuổi. Tổng số tuổi của hai bố con là 46 tuổi. Con ___ tuổi.", ans: ["9"], x: "Tuổi con (số bé) = (46 − 28) : 2 = 9 (tuổi). Tuổi bố: 9 + 28 = 37 (tuổi)." },
      { topic: "Tổng và hiệu", type: "mc", q: "Hình chữ nhật có chu vi 64 cm, chiều dài hơn chiều rộng 8 cm. Chiều dài hình chữ nhật là:", o: ["20 cm", "12 cm", "36 cm", "28 cm"], x: "Nửa chu vi (tổng chiều dài và chiều rộng): 64 : 2 = 32 (cm). Chiều dài = (32 + 8) : 2 = 20 (cm). Chiều rộng = 20 − 8 = 12 (cm)." },
      { topic: "Giải bài toán có ba bước tính", type: "fill", q: "Thư viện có 2 450 quyển truyện. Lần đầu mua thêm 380 quyển. Lần sau mua thêm số quyển gấp 3 lần số quyển mua lần đầu. Thư viện có tất cả ___ quyển truyện.", ans: ["3 970"], x: "Lần sau mua: 380 × 3 = 1 140 (quyển). Cả hai lần mua: 380 + 1 140 = 1 520 (quyển). Thư viện có: 2 450 + 1 520 = 3 970 (quyển)." },
      { topic: "Giải bài toán có ba bước tính", type: "mc", q: "Hai ngày đầu, mỗi ngày đội công nhân sửa được 1 250 m đường. Ngày thứ ba sửa được ít hơn ngày thứ nhất 320 m. Cả ba ngày đội sửa được bao nhiêu mét đường?", o: ["3 430 m", "3 750 m", "4 070 m", "2 180 m"], x: "Hai ngày đầu: 1 250 × 2 = 2 500 (m). Ngày thứ ba: 1 250 − 320 = 930 (m). Cả ba ngày: 2 500 + 930 = 3 430 (m)." },
      { topic: "Góc và đo góc", type: "mc", q: "Góc nào dưới đây là góc nhọn?", o: ["Góc 75°", "Góc 90°", "Góc 105°", "Góc 180°"], x: "Góc nhọn bé hơn 90°. Chỉ có 75° < 90°. Góc 90° là góc vuông, 105° là góc tù, 180° là góc bẹt." },
      { topic: "Góc và đo góc", type: "fill", q: "Lúc 6 giờ, kim giờ và kim phút tạo thành góc có số đo ___°", ans: ["180", "180°", "180 độ"], x: "Lúc 6 giờ, kim phút chỉ số 12, kim giờ chỉ số 6, hai kim nằm trên một đường thẳng. Đó là góc bẹt, bằng 180°." },
      { topic: "Đơn vị đo", type: "fill", q: "2 tấn 3 tạ = ___ kg", ans: ["2 300"], x: "1 tấn = 1 000 kg, 1 tạ = 100 kg. 2 tấn 3 tạ = 2 000 kg + 300 kg = 2 300 kg." },
      { topic: "Đơn vị đo", type: "mc", q: "4 cm² = ? mm²", o: ["400 mm²", "40 mm²", "4 000 mm²", "40 000 mm²"], x: "1 cm² = 100 mm² nên 4 cm² = 400 mm²." },
      { topic: "Đơn vị đo", type: "tf", q: "Thế kỉ XXI tính từ năm 2000 đến hết năm 2099.", a: false, x: "Mỗi thế kỉ có 100 năm. Thế kỉ XXI tính từ năm 2001 đến hết năm 2100. Năm 2000 là năm cuối cùng của thế kỉ XX." },
      { topic: "Đơn vị đo", type: "fill", q: "Bạn An chạy 300 m hết 1 phút 5 giây, bạn Bình chạy hết 58 giây. Bạn Bình chạy nhanh hơn bạn An ___ giây.", ans: ["7"], x: "1 phút 5 giây = 60 + 5 = 65 giây. Bình nhanh hơn: 65 − 58 = 7 (giây)." },
      { topic: "Đường thẳng vuông góc, song song", type: "tf", q: "Hai đường thẳng cùng vuông góc với một đường thẳng thứ ba thì song song với nhau.", a: true, x: "Đây là cách vẽ hai đường thẳng song song bằng ê ke: vẽ hai đường cùng vuông góc với một đường thẳng, chúng sẽ không bao giờ cắt nhau." }
    ]
  },
  {
    id: "mau-toan6-ck1", title: "Toán 6 · Ôn cuối học kì I (bộ mẫu)", grade: 6, subject: "Toán", minutes: 25,
    note: "Bộ câu mẫu để thử bộ làm bài chung. Thầy cô, phụ huynh nhập thêm câu trong mục Quản trị.",
    questions: [
      { topic: "Số nguyên", type: "fill", q: "(−15) + 8 = ___", ans: ["-7"], x: "Hai số khác dấu: 15 − 8 = 7, lấy dấu của −15. Kết quả −7." },
      { topic: "Số nguyên", type: "fill", q: "12 − (−9) = ___", ans: ["21"], x: "a − (−b) = a + b: 12 + 9 = 21." },
      { topic: "Số nguyên", type: "fill", q: "(−6) · (−7) = ___", ans: ["42"], x: "Hai số cùng dấu, tích dương: 6 · 7 = 42." },
      { topic: "Số nguyên", type: "mc", q: "Sắp xếp các số −3; 5; −8; 0 theo thứ tự tăng dần:", o: ["−8; −3; 0; 5", "−3; −8; 0; 5", "0; −3; −8; 5", "5; 0; −3; −8"], x: "Số âm nhỏ hơn 0; giữa hai số âm, số nào xa 0 hơn thì nhỏ hơn: −8 < −3." },
      { topic: "Ước và bội", type: "fill", q: "ƯCLN(24, 36) = ___", ans: ["12"], x: "24 = 2³ · 3; 36 = 2² · 3². ƯCLN = 2² · 3 = 12." },
      { topic: "Ước và bội", type: "fill", q: "BCNN(6, 8) = ___", ans: ["24"], x: "6 = 2 · 3; 8 = 2³. BCNN = 2³ · 3 = 24." },
      { topic: "Hình phẳng", type: "mc", q: "Hình nào có 6 cạnh bằng nhau và 6 góc bằng nhau?", o: ["Lục giác đều", "Hình thoi", "Tam giác đều", "Hình thang cân"], x: "Lục giác đều có 6 cạnh bằng nhau, 6 góc bằng nhau." },
      { topic: "Hình phẳng", type: "mc", q: "Mỗi góc của tam giác đều bằng:", o: ["60°", "90°", "45°", "120°"], x: "Tam giác đều có ba góc bằng nhau và bằng 60°." },
      { topic: "Hình phẳng", type: "tf", q: "Hình thang cân có hai đường chéo bằng nhau.", a: true, x: "Đây là một tính chất của hình thang cân." },
      { topic: "Chu vi, diện tích", type: "fill", q: "Chu vi hình vuông có cạnh 7 cm là ___ cm", ans: ["28"], x: "P = 4 · 7 = 28 (cm)." },
      { topic: "Chu vi, diện tích", type: "fill", q: "Diện tích hình thoi có hai đường chéo dài 6 cm và 8 cm là ___ cm²", ans: ["24"], x: "S = (6 · 8) : 2 = 24 (cm²)." },
      { topic: "Chu vi, diện tích", type: "fill", q: "Hình bình hành có cạnh đáy 10 cm, chiều cao tương ứng 4 cm. Diện tích là ___ cm²", ans: ["40"], x: "S = 10 · 4 = 40 (cm²)." }
    ]
  },
  /* ---------- Toán 6 · Kiểm tra cuối học kì I (Kết nối tri thức, Chương I–V, Bài 1–22) ----------
     Hai đề cùng phạm vi: tập hợp, số tự nhiên, lũy thừa, thứ tự thực hiện phép tính,
     tính chia hết, số nguyên tố, ƯCLN, BCNN, số nguyên, hình phẳng, chu vi và diện tích,
     hình có trục đối xứng, hình có tâm đối xứng. Câu tự soạn. */
  {
    id: "toan6-ck1-de1", title: "Toán 6 · Cuối kì I · Đề 1", grade: 6, subject: "Toán", minutes: 45,
    note: "Toàn bộ chương trình học kì I (Chương I–V, Bài 1–22), sách Kết nối tri thức. Có lời giải từng câu.",
    questions: [
      { topic: "Tập hợp các số tự nhiên", type: "mc", q: "Cho tập hợp A = {x ∈ ℕ | 3 < x ≤ 7}. Viết tập hợp A bằng cách liệt kê các phần tử, ta được:", o: ["A = {4; 5; 6; 7}", "A = {3; 4; 5; 6; 7}", "A = {4; 5; 6}", "A = {3; 4; 5; 6}"], x: "x là số tự nhiên lớn hơn 3 (không lấy 3) và nhỏ hơn hoặc bằng 7 (lấy cả 7). Vậy A = {4; 5; 6; 7}." },
      { topic: "Tập hợp các số tự nhiên", type: "mc", q: "Số La Mã XIV biểu diễn số nào?", o: ["14", "16", "9", "15"], x: "X là 10, IV là 4. XIV = 10 + 4 = 14." },
      { topic: "Tập hợp các số tự nhiên", type: "fill", q: "Tính nhanh: 25 · 37 · 4 = ___", ans: ["3700"], x: "Đổi chỗ và nhóm: (25 · 4) · 37 = 100 · 37 = 3 700." },
      { topic: "Tập hợp các số tự nhiên", type: "fill", q: "Tính nhanh: 46 · 73 + 46 · 27 = ___", ans: ["4600"], x: "Dùng tính chất phân phối: 46 · (73 + 27) = 46 · 100 = 4 600." },
      { topic: "Lũy thừa, thứ tự thực hiện phép tính", type: "mc", q: "Viết kết quả phép tính 5³ · 5⁴ dưới dạng một lũy thừa:", o: ["5⁷", "5¹²", "25⁷", "10⁷"], x: "Nhân hai lũy thừa cùng cơ số: giữ nguyên cơ số, cộng các số mũ. 5³ · 5⁴ = 5³⁺⁴ = 5⁷." },
      { topic: "Lũy thừa, thứ tự thực hiện phép tính", type: "tf", q: "7¹⁰ : 7² = 7⁵", a: false, x: "Chia hai lũy thừa cùng cơ số: giữ nguyên cơ số, trừ các số mũ. 7¹⁰ : 7² = 7¹⁰⁻² = 7⁸, không phải 7⁵." },
      { topic: "Lũy thừa, thứ tự thực hiện phép tính", type: "fill", q: "80 − 2 · (5 + 3²) = ___", ans: ["52"], x: "Trong ngoặc trước: 3² = 9, 5 + 9 = 14. Rồi nhân: 2 · 14 = 28. Cuối cùng trừ: 80 − 28 = 52." },
      { topic: "Lũy thừa, thứ tự thực hiện phép tính", type: "fill", q: "Tìm x, biết 3x − 15 = 42. Vậy x = ___", ans: ["19"], x: "3x = 42 + 15 = 57, nên x = 57 : 3 = 19. Thử lại: 3 · 19 − 15 = 57 − 15 = 42." },
      { topic: "Tính chia hết, số nguyên tố", type: "mc", q: "Số nào dưới đây chia hết cho cả 2, 3 và 5?", o: ["420", "425", "352", "135"], x: "Chia hết cho 2 và 5 thì chữ số tận cùng là 0, nên chỉ còn 420. Tổng các chữ số 4 + 2 + 0 = 6 chia hết cho 3, nên 420 chia hết cho cả 2, 3 và 5." },
      { topic: "Tính chia hết, số nguyên tố", type: "tf", q: "Số 2 457 chia hết cho 9.", a: true, x: "Tổng các chữ số: 2 + 4 + 5 + 7 = 18, chia hết cho 9, nên 2 457 chia hết cho 9 (2 457 = 9 · 273)." },
      { topic: "Tính chia hết, số nguyên tố", type: "fill", q: "Thay dấu * bằng một chữ số để số 37* chia hết cho cả 2 và 5. Chữ số cần điền là ___", ans: ["0"], x: "Số chia hết cho cả 2 và 5 có chữ số tận cùng là 0. Vậy * = 0, ta được 370." },
      { topic: "Tính chia hết, số nguyên tố", type: "mc", q: "Trong các số 1; 15; 23; 51, số nào là số nguyên tố?", o: ["23", "1", "15", "51"], x: "23 chỉ có hai ước là 1 và 23 nên là số nguyên tố. Số 1 không là số nguyên tố; 15 = 3 · 5 và 51 = 3 · 17 là hợp số." },
      { topic: "Tính chia hết, số nguyên tố", type: "mc", q: "Phân tích số 120 ra thừa số nguyên tố, ta được:", o: ["2³ · 3 · 5", "2² · 3 · 10", "2³ · 15", "2 · 3 · 4 · 5"], x: "120 = 2 · 60 = 2 · 2 · 30 = 2 · 2 · 2 · 15 = 2³ · 3 · 5. Các cách còn lại đều bằng 120 nhưng còn thừa số 10, 15 hoặc 4 không phải số nguyên tố." },
      { topic: "ƯCLN và BCNN", type: "fill", q: "ƯCLN(48, 72) = ___", ans: ["24"], x: "48 = 2⁴ · 3; 72 = 2³ · 3². Lấy các thừa số chung với số mũ nhỏ nhất: ƯCLN = 2³ · 3 = 24." },
      { topic: "ƯCLN và BCNN", type: "fill", q: "An cứ 8 ngày lại đến thư viện một lần, Bình cứ 12 ngày lại đến một lần. Hôm nay hai bạn cùng đến thư viện. Sau ít nhất ___ ngày nữa hai bạn lại cùng đến thư viện.", ans: ["24"], x: "Số ngày cần tìm là BCNN(8, 12). 8 = 2³; 12 = 2² · 3. BCNN = 2³ · 3 = 24 (ngày)." },
      { topic: "Số nguyên", type: "mc", q: "Số đối của −12 là:", o: ["12", "−12", "0", "−1"], x: "Hai số đối nhau có tổng bằng 0: −12 + 12 = 0. Vậy số đối của −12 là 12." },
      { topic: "Số nguyên", type: "tf", q: "−5 > −3", a: false, x: "Trên trục số, −5 nằm bên trái −3, nên −5 < −3. Giữa hai số nguyên âm, số nào xa 0 hơn thì nhỏ hơn." },
      { topic: "Số nguyên", type: "fill", q: "(−25) + 17 − (−8) = ___", ans: ["0"], x: "(−25) + 17 = −8. Trừ một số âm là cộng với số đối của nó: −8 − (−8) = −8 + 8 = 0." },
      { topic: "Số nguyên", type: "fill", q: "Tính nhanh: (135 − 49) − (135 + 51) = ___", ans: ["-100"], x: "Bỏ dấu ngoặc: 135 − 49 − 135 − 51 = (135 − 135) − (49 + 51) = 0 − 100 = −100. Trước ngoặc có dấu “−” thì đổi dấu mọi số hạng trong ngoặc." },
      { topic: "Nhân, chia số nguyên", type: "mc", q: "(−4) · 5 · (−3) = ?", o: ["60", "−60", "−12", "12"], x: "(−4) · 5 = −20; (−20) · (−3) = 60. Tích có hai thừa số âm nên mang dấu dương." },
      { topic: "Nhân, chia số nguyên", type: "fill", q: "(−72) : 8 = ___", ans: ["-9"], x: "Chia hai số khác dấu, thương mang dấu âm: 72 : 8 = 9, nên (−72) : 8 = −9." },
      { topic: "Hình phẳng", type: "mc", q: "Với mọi hình chữ nhật ABCD, khẳng định nào dưới đây luôn đúng?", o: ["Hai đường chéo AC và BD bằng nhau", "Bốn cạnh bằng nhau", "Hai đường chéo vuông góc với nhau", "Chỉ có hai góc vuông"], x: "Hình chữ nhật có bốn góc vuông, các cạnh đối bằng nhau và hai đường chéo bằng nhau. Bốn cạnh bằng nhau, hai đường chéo vuông góc chỉ đúng khi hình chữ nhật là hình vuông." },
      { topic: "Chu vi, diện tích", type: "fill", q: "Hình thang cân có hai đáy dài 6 cm và 10 cm, chiều cao 4 cm. Diện tích hình thang là ___ cm²", ans: ["32"], x: "Diện tích hình thang = (tổng hai đáy) · chiều cao : 2 = (6 + 10) · 4 : 2 = 32 (cm²)." },
      { topic: "Tính đối xứng", type: "tf", q: "Hình vuông có 4 trục đối xứng.", a: true, x: "Hình vuông có 4 trục đối xứng: hai đường chéo và hai đường thẳng đi qua trung điểm hai cạnh đối." },
      { topic: "Tính đối xứng", type: "mc", q: "Chữ cái in hoa nào dưới đây có tâm đối xứng nhưng không có trục đối xứng?", o: ["N", "H", "A", "E"], x: "Quay chữ N nửa vòng quanh điểm chính giữa thì được lại chữ N, nhưng không gấp đôi chữ N cho hai nửa trùng nhau được. H có cả trục và tâm đối xứng; A và E chỉ có trục đối xứng." }
    ]
  },
  {
    id: "toan6-ck1-de2", title: "Toán 6 · Cuối kì I · Đề 2", grade: 6, subject: "Toán", minutes: 45,
    note: "Toàn bộ chương trình học kì I (Chương I–V, Bài 1–22), sách Kết nối tri thức. Có lời giải từng câu.",
    questions: [
      { topic: "Tập hợp các số tự nhiên", type: "mc", q: "Tập hợp P = {x ∈ ℕ* | x < 6} có bao nhiêu phần tử?", o: ["5", "6", "4", "7"], x: "ℕ* là tập hợp các số tự nhiên khác 0. P = {1; 2; 3; 4; 5}, có 5 phần tử." },
      { topic: "Tập hợp các số tự nhiên", type: "tf", q: "Số La Mã XIX biểu diễn số 21.", a: false, x: "X là 10, IX là 9 (I đứng trước X nên lấy 10 − 1). XIX = 10 + 9 = 19. Số 21 viết là XXI." },
      { topic: "Tập hợp các số tự nhiên", type: "fill", q: "Trong số 4 052 817, chữ số 5 có giá trị là ___", ans: ["50000"], x: "Chữ số 5 ở hàng chục nghìn, nên có giá trị 5 · 10 000 = 50 000." },
      { topic: "Tính đối xứng", type: "mc", q: "Hình nào dưới đây có tâm đối xứng?", o: ["Hình chữ nhật", "Tam giác đều", "Hình thang cân", "Tam giác vuông"], x: "Giao điểm hai đường chéo là tâm đối xứng của hình chữ nhật. Tam giác đều, hình thang cân và tam giác vuông không có tâm đối xứng." },
      { topic: "Tính đối xứng", type: "tf", q: "Tam giác đều có đúng 1 trục đối xứng.", a: false, x: "Tam giác đều có 3 trục đối xứng, mỗi trục đi qua một đỉnh và trung điểm cạnh đối diện." },
      { topic: "Lũy thừa, thứ tự thực hiện phép tính", type: "fill", q: "Tìm số tự nhiên n, biết 2ⁿ = 64. Vậy n = ___", ans: ["6"], x: "2 · 2 · 2 · 2 · 2 · 2 = 64, tức là 2⁶ = 64. Vậy n = 6." },
      { topic: "Lũy thừa, thứ tự thực hiện phép tính", type: "mc", q: "Giá trị của biểu thức 4² + 3³ là:", o: ["43", "17", "49", "24"], x: "4² = 4 · 4 = 16; 3³ = 3 · 3 · 3 = 27. 16 + 27 = 43. Chú ý 4² không phải 4 · 2." },
      { topic: "Lũy thừa, thứ tự thực hiện phép tính", type: "fill", q: "[(14 − 4) · 5 + 50] : 10 = ___", ans: ["10"], x: "Ngoặc tròn trước: 14 − 4 = 10. Ngoặc vuông: 10 · 5 + 50 = 100. Cuối cùng: 100 : 10 = 10." },
      { topic: "Lũy thừa, thứ tự thực hiện phép tính", type: "tf", q: "Kết quả của phép tính 18 − 6 : 3 là 4.", a: false, x: "Chia trước, trừ sau: 6 : 3 = 2; 18 − 2 = 16. Kết quả là 16, không phải 4." },
      { topic: "Tính chia hết, số nguyên tố", type: "tf", q: "Nếu a chia hết cho 4 và b chia hết cho 4 thì a + b chia hết cho 4.", a: true, x: "Tính chất chia hết của một tổng: nếu tất cả các số hạng đều chia hết cho cùng một số thì tổng cũng chia hết cho số đó." },
      { topic: "Tính chia hết, số nguyên tố", type: "mc", q: "Số nào dưới đây chia hết cho 9?", o: ["5 391", "4 512", "7 023", "1 236"], x: "Tổng các chữ số: 5 + 3 + 9 + 1 = 18 chia hết cho 9. Ba số còn lại có tổng các chữ số là 12, chỉ chia hết cho 3, không chia hết cho 9." },
      { topic: "Tính chia hết, số nguyên tố", type: "fill", q: "Có ___ số nguyên tố nhỏ hơn 20.", ans: ["8"], x: "Các số nguyên tố nhỏ hơn 20 là 2, 3, 5, 7, 11, 13, 17, 19. Có 8 số." },
      { topic: "Tính chia hết, số nguyên tố", type: "mc", q: "Số nào dưới đây là hợp số?", o: ["91", "97", "89", "83"], x: "91 = 7 · 13 nên có nhiều hơn hai ước, là hợp số. 97, 89, 83 đều là số nguyên tố." },
      { topic: "ƯCLN và BCNN", type: "fill", q: "BCNN(12, 18) = ___", ans: ["36"], x: "12 = 2² · 3; 18 = 2 · 3². Lấy các thừa số chung và riêng với số mũ lớn nhất: BCNN = 2² · 3² = 36." },
      { topic: "ƯCLN và BCNN", type: "mc", q: "Cô giáo có 36 quyển vở và 24 chiếc bút. Cô muốn chia đều số vở và số bút vào các phần quà (phần nào cũng có cả vở và bút, không thừa quyển vở hay chiếc bút nào). Cô chia được nhiều nhất bao nhiêu phần quà?", o: ["12", "6", "72", "4"], x: "Số phần quà là ước chung của 36 và 24; nhiều nhất là ƯCLN(36, 24) = 12. Mỗi phần có 3 quyển vở và 2 chiếc bút. Chia 6 hay 4 phần cũng được nhưng chưa phải nhiều nhất; 72 không chia được." },
      { topic: "ƯCLN và BCNN", type: "tf", q: "Hai số 8 và 15 là hai số nguyên tố cùng nhau.", a: true, x: "Ước của 8: 1, 2, 4, 8. Ước của 15: 1, 3, 5, 15. ƯCLN(8, 15) = 1 nên 8 và 15 là hai số nguyên tố cùng nhau." },
      { topic: "Số nguyên", type: "mc", q: "Sắp xếp các số 4; −7; 0; −2; 9 theo thứ tự giảm dần:", o: ["9; 4; 0; −2; −7", "9; 4; 0; −7; −2", "−7; −2; 0; 4; 9", "9; 4; −2; −7; 0"], x: "Số dương lớn hơn 0, số 0 lớn hơn số âm. Giữa hai số âm, −2 > −7 vì −2 gần 0 hơn. Thứ tự giảm dần: 9; 4; 0; −2; −7." },
      { topic: "Số nguyên", type: "fill", q: "Buổi sáng nhiệt độ ở một vùng núi là −2 °C, đến trưa nhiệt độ tăng thêm 7 °C. Nhiệt độ buổi trưa là ___ °C.", ans: ["5"], x: "Tăng thêm thì cộng: −2 + 7 = 5 (°C)." },
      { topic: "Số nguyên", type: "fill", q: "(−38) + (−62) = ___", ans: ["-100"], x: "Cộng hai số nguyên âm: cộng hai số 38 + 62 = 100 rồi đặt dấu “−”. Kết quả −100." },
      { topic: "Số nguyên", type: "mc", q: "Bỏ dấu ngoặc trong biểu thức 15 − (a − 7 + b), ta được:", o: ["15 − a + 7 − b", "15 − a − 7 + b", "15 + a − 7 + b", "15 − a − 7 − b"], x: "Trước ngoặc có dấu “−” thì đổi dấu mọi số hạng trong ngoặc: a thành −a, −7 thành +7, b thành −b." },
      { topic: "Nhân, chia số nguyên", type: "fill", q: "(−7) · 4 − 6 · (−5) = ___", ans: ["2"], x: "Nhân trước: (−7) · 4 = −28; 6 · (−5) = −30. Rồi trừ: −28 − (−30) = −28 + 30 = 2." },
      { topic: "Nhân, chia số nguyên", type: "mc", q: "Tất cả các ước nguyên của 6 là:", o: ["−6; −3; −2; −1; 1; 2; 3; 6", "1; 2; 3; 6", "−6; −3; −2; −1", "0; 1; 2; 3; 6"], x: "Các ước tự nhiên của 6 là 1, 2, 3, 6. Số đối của chúng cũng là ước của 6. Số 0 không là ước của số nào." },
      { topic: "Hình phẳng", type: "mc", q: "Mỗi góc của hình lục giác đều có số đo bằng:", o: ["120°", "60°", "90°", "180°"], x: "Hình lục giác đều ghép được từ 6 tam giác đều chung một đỉnh ở tâm. Mỗi góc của lục giác gồm hai góc của tam giác đều: 60° + 60° = 120°." },
      { topic: "Chu vi, diện tích", type: "fill", q: "Mảnh vườn hình chữ nhật có chiều dài 15 m, chiều rộng 8 m. Chu vi mảnh vườn là ___ m", ans: ["46"], x: "Chu vi hình chữ nhật = 2 · (chiều dài + chiều rộng) = 2 · (15 + 8) = 46 (m)." },
      { topic: "Chu vi, diện tích", type: "mc", q: "Hình bình hành có cạnh đáy 12 cm, chiều cao tương ứng 5 cm. Diện tích hình bình hành là:", o: ["60 cm²", "30 cm²", "34 cm²", "17 cm²"], x: "Diện tích hình bình hành = cạnh đáy · chiều cao = 12 · 5 = 60 (cm²). Không chia cho 2 như hình thoi hay hình thang." }
    ]
  },
  /* ---------- Ngữ văn 6 · Kiểm tra cuối học kì I (Kết nối tri thức, Bài 1–5) ----------
     Hai đề cùng phạm vi: Bài 1 Tôi và các bạn, Bài 2 Gõ cửa trái tim, Bài 3 Yêu thương và chia sẻ,
     Bài 4 Quê hương yêu dấu, Bài 5 Những nẻo đường xứ sở; phần Tiếng Việt của năm bài.
     Đoạn văn, đoạn thơ đọc hiểu do người soạn tự viết (trừ ca dao, tục ngữ dân gian). */
  {
    id: "van6-ck1-de1", title: "Ngữ văn 6 · Cuối kì I · Đề 1", grade: 6, subject: "Ngữ văn", minutes: 45,
    note: "Phần đọc hiểu và tiếng Việt của học kì I (Bài 1–5), sách Kết nối tri thức. Đề thật còn có phần viết bài văn.",
    questions: [
      { topic: "Tôi và các bạn", type: "mc", q: "Truyện đồng thoại là truyện viết cho trẻ em. Nhân vật trong truyện đồng thoại thường là:", o: ["Loài vật hoặc đồ vật được nhân hoá", "Các vị thần trên trời", "Những người anh hùng có thật trong lịch sử", "Chỉ có con người trong đời sống hằng ngày"], x: "Nhân vật của truyện đồng thoại thường là loài vật, đồ vật được nhân hoá: biết nói, biết nghĩ như người nhưng vẫn giữ đặc điểm của loài, của vật." },
      { topic: "Tôi và các bạn", type: "mc", q: "Văn bản “Bài học đường đời đầu tiên” (Tô Hoài) được kể bằng lời của nhân vật nào?", o: ["Dế Mèn", "Dế Choắt", "Chị Cốc", "Một người kể giấu mặt, không có trong truyện"], x: "Dế Mèn xưng “tôi”, tự kể lại câu chuyện của mình. Truyện được kể theo ngôi thứ nhất." },
      { topic: "Tôi và các bạn", type: "tf", q: "Khi người kể chuyện xưng “tôi” và là một nhân vật trong truyện thì truyện được kể theo ngôi thứ nhất.", a: true, x: "Người kể xưng “tôi”, trực tiếp tham gia câu chuyện: đó là ngôi thứ nhất. Người kể giấu mình, gọi nhân vật bằng tên: đó là ngôi thứ ba." },
      { topic: "Tôi và các bạn", type: "mc", q: "Đọc đoạn văn: «Tôi là Sẻ Nâu, nhà ở bụi tre đầu làng. Sáng nào tôi cũng dậy sớm, chải lại bộ lông cho thật mượt rồi bay đi chào các bạn. Hôm ấy, thấy Chích Bông bị đau cánh nằm dưới gốc tre, tôi vội tha từng hạt thóc về cho bạn.» Đoạn văn được kể theo ngôi thứ mấy?", o: ["Ngôi thứ nhất", "Ngôi thứ hai", "Ngôi thứ ba", "Không có người kể chuyện"], x: "Người kể là Sẻ Nâu, xưng “tôi” và tham gia vào câu chuyện, nên đoạn văn kể theo ngôi thứ nhất." },
      { topic: "Từ đơn và từ phức", type: "mc", q: "Từ nào dưới đây là từ láy?", o: ["lấp lánh", "bàn ghế", "quần áo", "xe đạp"], x: "“Lấp lánh” có hai tiếng lặp lại âm đầu “l”, là từ láy. “Bàn ghế”, “quần áo”, “xe đạp” là từ ghép vì các tiếng đều có nghĩa và quan hệ với nhau về nghĩa." },
      { topic: "Từ đơn và từ phức", type: "tf", q: "Từ “xanh xanh” là từ ghép.", a: false, x: "“Xanh xanh” lặp lại toàn bộ tiếng “xanh”, là từ láy (láy toàn bộ), không phải từ ghép." },
      { topic: "Từ đơn và từ phức", type: "fill", q: "Câu “Mẹ mua cho em một chiếc cặp.” gồm ___ từ đơn.", ans: ["7", "bảy"], x: "Câu có 7 từ: Mẹ / mua / cho / em / một / chiếc / cặp. Mỗi từ chỉ có một tiếng nên đều là từ đơn." },
      { topic: "Nghĩa của từ", type: "mc", q: "Từ “hiền lành” trong câu “Bác nông dân rất hiền lành.” có nghĩa là:", o: ["Tốt bụng, không gây hại cho ai", "Thông minh, nhanh trí", "Nóng nảy, dễ nổi giận", "Giàu có, sung túc"], x: "“Hiền lành” chỉ tính nết tốt, dễ gần, không làm hại ai." },
      { topic: "Biện pháp tu từ", type: "mc", q: "Câu “Đôi mắt em bé sáng như sao.” sử dụng biện pháp tu từ nào?", o: ["So sánh", "Nhân hoá", "Ẩn dụ", "Hoán dụ"], x: "Câu đối chiếu đôi mắt với ngôi sao, có từ so sánh “như”: đó là biện pháp so sánh." },
      { topic: "Gõ cửa trái tim", type: "mc", q: "Bài thơ “Chuyện cổ tích về loài người” là của nhà thơ nào?", o: ["Xuân Quỳnh", "Tô Hoài", "Lâm Thị Mỹ Dạ", "Thép Mới"], x: "“Chuyện cổ tích về loài người” là bài thơ của Xuân Quỳnh, học ở Bài 2 Gõ cửa trái tim. Tô Hoài viết truyện, Thép Mới viết “Cây tre Việt Nam”, Lâm Thị Mỹ Dạ viết “Chuyện cổ nước mình”." },
      { topic: "Gõ cửa trái tim", type: "mc", q: "Đọc đoạn thơ: «Sáng nay mẹ đi chợ / Con đứng đợi đầu ngõ / Mẹ về, quang gánh nhỏ / Có cả nắng trong đó.» Đoạn thơ được viết theo thể thơ nào?", o: ["Thơ năm chữ", "Thơ bốn chữ", "Thơ lục bát", "Thơ bảy chữ"], x: "Mỗi dòng có 5 tiếng, ví dụ: Sáng / nay / mẹ / đi / chợ. Đó là thơ năm chữ." },
      { topic: "Biện pháp tu từ", type: "mc", q: "Ca dao: «Thuyền về có nhớ bến chăng / Bến thì một dạ khăng khăng đợi thuyền.» Hình ảnh “thuyền” và “bến” được dùng theo biện pháp tu từ nào?", o: ["Ẩn dụ", "So sánh", "Điệp ngữ", "Nhân hoá"], x: "“Thuyền” chỉ người ra đi, “bến” chỉ người ở lại chờ đợi, dựa trên nét giống nhau (thuyền đi rồi về, bến đứng yên một chỗ). Gọi tên sự vật này bằng tên sự vật khác có nét tương đồng là ẩn dụ." },
      { topic: "Biện pháp tu từ", type: "tf", q: "Trong đoạn thơ «Nhớ con sông quê / Nhớ hàng tre xanh / Nhớ lời mẹ ru», từ “nhớ” được lặp lại là biện pháp điệp ngữ.", a: true, x: "Từ “nhớ” được lặp lại ở đầu ba dòng thơ để nhấn mạnh nỗi nhớ quê. Đó là điệp ngữ." },
      { topic: "Yêu thương và chia sẻ", type: "mc", q: "Truyện “Cô bé bán diêm” là của nhà văn nào?", o: ["An-đéc-xen", "Ta-go", "Thạch Lam", "Tô Hoài"], x: "“Cô bé bán diêm” là truyện của nhà văn Đan Mạch An-đéc-xen, học ở Bài 3 Yêu thương và chia sẻ." },
      { topic: "Yêu thương và chia sẻ", type: "tf", q: "Trong truyện “Gió lạnh đầu mùa” của Thạch Lam, nhân vật Sơn là người kể chuyện, xưng “tôi”.", a: false, x: "Truyện được kể theo ngôi thứ ba: người kể giấu mình, gọi nhân vật là Sơn, Lan, Hiên. Sơn không xưng “tôi” kể chuyện." },
      { topic: "Yêu thương và chia sẻ", type: "mc", q: "Đọc đoạn văn: «Chiều mưa, Lan thấy Hoà đứng nép dưới mái hiên, áo ướt sũng. Lan chạy lại, nghiêng chiếc ô của mình che cho bạn, còn một bên vai mình thì ướt.» Chi tiết Lan nghiêng ô che cho bạn cho thấy Lan là người thế nào?", o: ["Biết quan tâm, chia sẻ với bạn", "Thích khoe đồ dùng mới", "Vụng về, hay quên", "Nhút nhát, sợ mưa"], x: "Lan chịu ướt một bên vai để che cho Hoà: Lan biết quan tâm, nhường nhịn và chia sẻ với bạn." },
      { topic: "Cụm danh từ, cụm động từ, cụm tính từ", type: "mc", q: "Cụm từ nào dưới đây là cụm danh từ?", o: ["những bông hoa đỏ thắm", "đang chạy rất nhanh", "rất xanh tươi", "sẽ đi học sớm"], x: "“Những bông hoa đỏ thắm” có danh từ “hoa” làm trung tâm. “Đang chạy rất nhanh”, “sẽ đi học sớm” là cụm động từ; “rất xanh tươi” là cụm tính từ." },
      { topic: "Cụm danh từ, cụm động từ, cụm tính từ", type: "mc", q: "Trong cụm động từ “đang đọc sách trong thư viện”, động từ trung tâm là:", o: ["đọc", "đang", "sách", "thư viện"], x: "“Đọc” là động từ chỉ hoạt động, làm trung tâm. “Đang” bổ sung ý thời gian; “sách”, “trong thư viện” bổ sung ý đối tượng và nơi chốn." },
      { topic: "Quê hương yêu dấu", type: "mc", q: "Thể thơ lục bát gồm các cặp câu thơ. Mỗi cặp có:", o: ["Một dòng sáu tiếng và một dòng tám tiếng", "Hai dòng bảy tiếng", "Một dòng năm tiếng và một dòng bảy tiếng", "Hai dòng tám tiếng"], x: "“Lục” là sáu, “bát” là tám: dòng trên sáu tiếng (dòng lục), dòng dưới tám tiếng (dòng bát)." },
      { topic: "Quê hương yêu dấu", type: "fill", q: "Trong thơ lục bát, tiếng thứ sáu của dòng sáu vần với tiếng thứ ___ của dòng tám.", ans: ["6", "sáu"], x: "Tiếng thứ sáu dòng lục vần với tiếng thứ sáu dòng bát; tiếng thứ tám dòng bát lại vần với tiếng thứ sáu của dòng lục tiếp theo." },
      { topic: "Từ đồng âm và từ đa nghĩa", type: "mc", q: "Từ “chân” trong “chân bàn”, “chân núi”, “chân tường” là:", o: ["Từ đa nghĩa", "Từ đồng âm", "Từ láy", "Từ trái nghĩa"], x: "Các nghĩa đều chỉ phần dưới cùng của sự vật, có liên hệ với nghĩa gốc “chân” của người, con vật. Một từ có nhiều nghĩa liên quan với nhau là từ đa nghĩa." },
      { topic: "Từ đồng âm và từ đa nghĩa", type: "tf", q: "Từ “đường” trong “con đường làng” và “bát chè có nhiều đường” là hai từ đồng âm.", a: true, x: "“Đường” để đi lại và “đường” để ăn (vị ngọt) có âm giống nhau nhưng nghĩa không liên quan gì đến nhau, nên là từ đồng âm." },
      { topic: "Biện pháp tu từ", type: "mc", q: "Trong câu “Cả lớp vỗ tay khen bạn Minh.”, từ “lớp” được dùng để chỉ các bạn học sinh trong lớp. Đây là biện pháp tu từ nào?", o: ["Hoán dụ", "Ẩn dụ", "So sánh", "Điệp ngữ"], x: "Lấy “lớp” (nơi chứa đựng) để chỉ những người ở trong lớp: gọi tên sự vật bằng tên sự vật có quan hệ gần gũi với nó là hoán dụ." },
      { topic: "Những nẻo đường xứ sở", type: "mc", q: "Du kí là thể loại ghi chép về:", o: ["Những chuyến đi, những điều người viết tận mắt thấy, tai nghe", "Những câu chuyện tưởng tượng về loài vật", "Những sự tích giải thích nguồn gốc sự vật", "Những kinh nghiệm về thời tiết"], x: "Du kí ghi lại chuyến đi đến một vùng đất, kể và tả những điều người viết trực tiếp trải qua, thường kể theo ngôi thứ nhất." },
      { topic: "Những nẻo đường xứ sở", type: "tf", q: "Văn bản “Cô Tô” là của nhà văn Thạch Lam.", a: false, x: "“Cô Tô” là bài kí của nhà văn Nguyễn Tuân, học ở Bài 5 Những nẻo đường xứ sở. Thạch Lam viết “Gió lạnh đầu mùa”." }
    ]
  },
  {
    id: "van6-ck1-de2", title: "Ngữ văn 6 · Cuối kì I · Đề 2", grade: 6, subject: "Ngữ văn", minutes: 45,
    note: "Phần đọc hiểu và tiếng Việt của học kì I (Bài 1–5), sách Kết nối tri thức. Đề thật còn có phần viết bài văn.",
    questions: [
      { topic: "Tôi và các bạn", type: "mc", q: "Văn bản “Bắt nạt” của Nguyễn Thế Hoàng Linh thuộc thể loại nào?", o: ["Thơ", "Truyện đồng thoại", "Du kí", "Ca dao"], x: "“Bắt nạt” là một bài thơ, học ở Bài 1 Tôi và các bạn." },
      { topic: "Tôi và các bạn", type: "mc", q: "Trong “Bài học đường đời đầu tiên”, vì sao Dế Choắt chết?", o: ["Bị chị Cốc mổ vì Dế Mèn trêu chị Cốc", "Bị ốm vì trời rét", "Bị Dế Mèn đánh", "Bị ngã xuống hố sâu"], x: "Dế Mèn hát trêu chị Cốc rồi chui vào hang. Chị Cốc tưởng Dế Choắt trêu mình nên mổ Dế Choắt. Dế Mèn rút ra bài học về thói hung hăng, xốc nổi." },
      { topic: "Tôi và các bạn", type: "mc", q: "Đọc đoạn văn: «Mèo Mướp nằm sưởi nắng trên hiên. Thấy Chuột Nhắt chạy qua, nó chỉ khẽ mở một mắt rồi lại lim dim ngủ. Nó nghĩ bụng: “Hôm nay no rồi, để mai tính.”» Đoạn văn được kể theo ngôi thứ mấy?", o: ["Ngôi thứ ba", "Ngôi thứ nhất", "Ngôi thứ hai", "Do Chuột Nhắt xưng “tôi” kể lại"], x: "Người kể giấu mình, gọi nhân vật bằng tên (Mèo Mướp) và “nó”, không xưng “tôi”: đoạn văn kể theo ngôi thứ ba." },
      { topic: "Từ đơn và từ phức", type: "mc", q: "Nhóm từ nào dưới đây gồm toàn từ láy?", o: ["lom khom, thoăn thoắt, rì rào", "nhà cửa, lom khom, sông núi", "bàn ghế, xinh xắn, sách vở", "học hành, chăm chỉ, đi đứng"], x: "“Lom khom”, “thoăn thoắt”, “rì rào” đều có các tiếng lặp lại âm hoặc vần. Các nhóm khác có lẫn từ ghép như “nhà cửa”, “sông núi”, “bàn ghế”, “sách vở”, “học hành”, “đi đứng”." },
      { topic: "Từ đơn và từ phức", type: "tf", q: "Từ “hoa hồng” là từ láy.", a: false, x: "“Hoa hồng” gồm hai tiếng có quan hệ về nghĩa (“hồng” chỉ một loài hoa), là từ ghép, không phải từ láy." },
      { topic: "Nghĩa của từ", type: "mc", q: "Từ “thoăn thoắt” trong câu “Đôi tay bà thoăn thoắt đan len.” có nghĩa là:", o: ["Nhanh và liên tục", "Chậm chạp, nặng nề", "Run run, yếu ớt", "Nhẹ nhàng, êm ái"], x: "“Thoăn thoắt” tả động tác (thường của tay, chân) nhanh, nhẹ và liên tục." },
      { topic: "Biện pháp tu từ", type: "tf", q: "Câu “Ông mặt trời thức dậy, vươn vai chào buổi sáng.” sử dụng biện pháp tu từ nhân hoá.", a: true, x: "Mặt trời được gọi là “ông” và có hoạt động như người (thức dậy, vươn vai, chào): đó là nhân hoá." },
      { topic: "Gõ cửa trái tim", type: "mc", q: "Bài thơ “Mây và sóng” là của nhà thơ nào?", o: ["Ta-go", "Xuân Quỳnh", "An-đéc-xen", "Nguyễn Tuân"], x: "“Mây và sóng” là bài thơ của nhà thơ Ấn Độ Ta-go, học ở Bài 2 Gõ cửa trái tim." },
      { topic: "Gõ cửa trái tim", type: "tf", q: "Trong truyện “Bức tranh của em gái tôi” (Tạ Duy Anh), người kể chuyện là người anh, xưng “tôi”.", a: true, x: "Người anh trai của Kiều Phương xưng “tôi” kể lại câu chuyện, nên truyện kể theo ngôi thứ nhất." },
      { topic: "Biện pháp tu từ", type: "mc", q: "Đọc đoạn thơ: «Con yêu cánh đồng xanh / Con yêu dòng sông nhỏ / Con yêu tiếng chim ca / Con yêu mẹ nhất nhà.» Cụm từ “Con yêu” được lặp lại ở đầu mỗi dòng là biện pháp tu từ nào?", o: ["Điệp ngữ", "Ẩn dụ", "Hoán dụ", "So sánh"], x: "Lặp lại một từ ngữ để nhấn mạnh ý, tạo nhịp cho câu thơ là điệp ngữ. Ở đây “Con yêu” nhấn mạnh tình yêu của con." },
      { topic: "Biện pháp tu từ", type: "fill", q: "Ẩn dụ là gọi tên sự vật, hiện tượng này bằng tên sự vật, hiện tượng khác có nét ___ với nó.", ans: ["tương đồng", "giống nhau", "tương tự", "giống"], x: "Ẩn dụ dựa trên nét tương đồng (giống nhau). Còn hoán dụ dựa trên quan hệ gần gũi giữa hai sự vật." },
      { topic: "Biện pháp tu từ", type: "mc", q: "Tục ngữ: «Ăn quả nhớ kẻ trồng cây.» Hình ảnh “kẻ trồng cây” chỉ những người đã làm ra thành quả cho mình hưởng. Câu tục ngữ dùng biện pháp tu từ nào?", o: ["Ẩn dụ", "Hoán dụ", "Điệp ngữ", "Nhân hoá"], x: "Người làm ra thành quả giống người trồng cây cho ta có quả ăn. Gọi tên dựa trên nét tương đồng là ẩn dụ." },
      { topic: "Yêu thương và chia sẻ", type: "mc", q: "Bài thơ “Con chào mào” là của nhà thơ nào?", o: ["Mai Văn Phấn", "Thạch Lam", "Tạ Duy Anh", "Tô Hoài"], x: "“Con chào mào” là bài thơ của Mai Văn Phấn, học ở Bài 3 Yêu thương và chia sẻ." },
      { topic: "Yêu thương và chia sẻ", type: "mc", q: "Lời nhân vật trong truyện là:", o: ["Lời nói trực tiếp của nhân vật, thường đặt sau dấu gạch ngang hoặc trong dấu ngoặc kép", "Lời của người kể chuyện tả cảnh vật", "Lời giới thiệu tác giả ở đầu sách", "Lời giải thích của thầy cô về truyện"], x: "Lời nhân vật là lời nói, lời nghĩ của nhân vật, thường được đánh dấu bằng dấu gạch ngang đầu dòng hoặc dấu ngoặc kép. Lời người kể chuyện là phần kể, tả còn lại." },
      { topic: "Yêu thương và chia sẻ", type: "tf", q: "Trong truyện “Cô bé bán diêm”, mỗi lần quẹt que diêm, em bé lại thấy một mộng tưởng như lò sưởi, bàn ăn có ngỗng quay, cây thông Nô-en và người bà.", a: true, x: "Mỗi que diêm sáng lên, em bé thấy một điều mình mong ước: được sưởi ấm, được ăn no, được vui đón Nô-en và được ở bên bà." },
      { topic: "Cụm danh từ, cụm động từ, cụm tính từ", type: "mc", q: "Trong câu “Gió đang thổi rất mạnh.”, cụm từ “đang thổi rất mạnh” là:", o: ["Cụm động từ", "Cụm danh từ", "Cụm tính từ", "Một từ ghép"], x: "Trung tâm là động từ “thổi”; “đang” và “rất mạnh” bổ sung ý cho “thổi”. Đó là cụm động từ." },
      { topic: "Cụm danh từ, cụm động từ, cụm tính từ", type: "tf", q: "“Những ngôi nhà mới” là cụm động từ.", a: false, x: "Trung tâm của cụm là danh từ “nhà” (“những”, “ngôi”, “mới” đi kèm), nên đây là cụm danh từ." },
      { topic: "Quê hương yêu dấu", type: "mc", q: "Văn bản “Cây tre Việt Nam” là của tác giả nào?", o: ["Thép Mới", "Nguyễn Tuân", "Xuân Quỳnh", "Tô Hoài"], x: "“Cây tre Việt Nam” là văn bản của Thép Mới, học ở Bài 4 Quê hương yêu dấu." },
      { topic: "Quê hương yêu dấu", type: "mc", q: "Đọc hai dòng thơ: «Quê em có dải sông xanh / Có hàng cau thẳng, có cành mai tươi.» Tiếng “xanh” ở dòng sáu vần với tiếng nào ở dòng tám?", o: ["cành", "cau", "tươi", "hàng"], x: "Trong lục bát, tiếng thứ sáu dòng sáu vần với tiếng thứ sáu dòng tám. Dòng tám: Có (1) hàng (2) cau (3) thẳng (4), có (5) cành (6)… “Xanh” vần với “cành” (vần “anh”)." },
      { topic: "Quê hương yêu dấu", type: "fill", q: "Trong thơ lục bát, dòng dưới (dòng bát) có ___ tiếng.", ans: ["8", "tám"], x: "“Bát” là tám: dòng bát có tám tiếng, dòng lục có sáu tiếng." },
      { topic: "Từ đồng âm và từ đa nghĩa", type: "mc", q: "Trong câu nào dưới đây, từ “ăn” được dùng với nghĩa gốc?", o: ["Em ăn cơm cùng gia đình.", "Tàu vào cảng ăn hàng.", "Da bạn ấy dễ ăn nắng.", "Hai màu áo này rất ăn với nhau."], x: "Nghĩa gốc của “ăn” là đưa thức ăn vào miệng để nuôi cơ thể. Các câu còn lại dùng nghĩa chuyển: nhận hàng, bị nắng làm đen da, hợp với nhau." },
      { topic: "Biện pháp tu từ", type: "mc", q: "Câu “Nhà có năm miệng ăn.” dùng “miệng ăn” để chỉ người trong nhà. Đây là biện pháp tu từ nào?", o: ["Hoán dụ", "Ẩn dụ", "So sánh", "Điệp ngữ"], x: "Lấy một bộ phận (cái miệng) để chỉ cả con người: đó là hoán dụ." },
      { topic: "Những nẻo đường xứ sở", type: "mc", q: "Văn bản “Hang Én” (Hà My) thuộc thể loại nào?", o: ["Du kí", "Truyện đồng thoại", "Thơ lục bát", "Truyện cổ tích"], x: "“Hang Én” ghi lại chuyến đi khám phá hang động của người viết, thuộc thể loại du kí, học ở Bài 5 Những nẻo đường xứ sở." },
      { topic: "Những nẻo đường xứ sở", type: "mc", q: "Đọc đoạn văn: «Sáng sớm, chúng tôi lên thuyền ra đảo. Mặt biển phẳng lặng như một tấm gương lớn. Tôi đứng ở mũi thuyền, nhìn đàn hải âu chao lượn mà lòng háo hức lạ thường.» Dấu hiệu nào cho thấy đây là một đoạn du kí?", o: ["Người viết kể lại chuyến đi do chính mình trải qua", "Nhân vật là loài vật biết nói", "Đoạn văn có vần như thơ lục bát", "Đoạn văn kể chuyện xảy ra từ thời xa xưa"], x: "Người viết xưng “tôi”, “chúng tôi”, kể và tả những điều tận mắt thấy trong chuyến ra đảo: đó là đặc điểm của du kí." },
      { topic: "Dấu câu", type: "mc", q: "Dấu ngoặc kép trong câu sau dùng để làm gì? Các bạn gọi ngôi trường là “ngôi nhà thứ hai”.", o: ["Đánh dấu từ ngữ được dùng với ý nghĩa đặc biệt", "Đánh dấu lời đối thoại của nhân vật", "Ngăn cách các bộ phận trong câu", "Kết thúc một câu hỏi"], x: "Ngôi trường không phải ngôi nhà thật. Cụm “ngôi nhà thứ hai” được dùng với ý nghĩa đặc biệt (nơi thân thuộc như nhà), nên đặt trong dấu ngoặc kép." }
    ]
  }
];
