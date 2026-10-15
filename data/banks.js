/* Ngân hàng câu hỏi mẫu cho bộ làm bài chung (js/quiz.js).
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
      { topic: "Số trung bình cộng", type: "mc", q: "Số trung bình cộng của 12, 18 và 24 là:", o: ["18", "54", "20", "16"], x: "(12 + 18 + 24) : 3 = 54 : 3 = 18." },
      { topic: "Đường thẳng vuông góc, song song", type: "mc", q: "Hai đường thẳng vuông góc với nhau tạo thành mấy góc vuông?", o: ["4", "2", "1", "3"], x: "Hai đường thẳng vuông góc cắt nhau tạo thành 4 góc vuông chung đỉnh." },
      { topic: "Đường thẳng vuông góc, song song", type: "tf", q: "Hai đường thẳng song song thì không bao giờ cắt nhau.", a: true, x: "Kéo dài mãi về hai phía, hai đường thẳng song song vẫn không cắt nhau." },
      { topic: "Hình bình hành, hình thoi", type: "mc", q: "Hình bình hành có đặc điểm:", o: ["Hai cặp cạnh đối diện song song và bằng nhau", "Bốn góc vuông", "Chỉ có một cặp cạnh song song", "Ba cạnh bằng nhau"], x: "Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau." },
      { topic: "Hình bình hành, hình thoi", type: "mc", q: "Hình thoi có đặc điểm:", o: ["Bốn cạnh bằng nhau và hai cặp cạnh đối diện song song", "Bốn góc vuông và hai cạnh bằng nhau", "Chỉ có hai cạnh bằng nhau", "Không có cạnh nào song song"], x: "Hình thoi có bốn cạnh bằng nhau và hai cặp cạnh đối diện song song." },
      { topic: "Đơn vị đo", type: "fill", q: "5 tấn 30 kg = ___ kg", ans: ["5030"], x: "5 tấn = 5 000 kg; 5 000 + 30 = 5 030 (kg)." }
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
