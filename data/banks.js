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
  }
];
