/* Câu hỏi các đề Toán lớp 6 có sẵn. Danh mục (tên, khối, môn, số phút, số câu): data/banks/index.js.
   App chỉ tải file này khi mở một đề trong đó. Dạng câu hỏi: xem đầu data/banks/index.js. */
window.ONTAP_SEED_QUESTIONS = Object.assign(window.ONTAP_SEED_QUESTIONS || {}, {
  /* ---------- Toán 6 · Kiểm tra cuối học kì I (Kết nối tri thức, Chương I–V, Bài 1–22) ----------
     Hai đề cùng phạm vi: tập hợp, số tự nhiên, lũy thừa, thứ tự thực hiện phép tính,
     tính chia hết, số nguyên tố, ƯCLN, BCNN, số nguyên, hình phẳng, chu vi và diện tích,
     hình có trục đối xứng, hình có tâm đối xứng. Câu tự soạn. */
  "toan6-ck1-de1": {
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
      { topic: "Số nguyên", type: "fill", q: "Tính nhanh: (135 − 49) − (135 + 51) = ___", ans: ["-100", "(-100)", "(−100)"], x: "Bỏ dấu ngoặc: 135 − 49 − 135 − 51 = (135 − 135) − (49 + 51) = 0 − 100 = −100. Trước ngoặc có dấu “−” thì đổi dấu mọi số hạng trong ngoặc." },
      { topic: "Nhân, chia số nguyên", type: "mc", q: "(−4) · 5 · (−3) = ?", o: ["60", "−60", "−12", "12"], x: "(−4) · 5 = −20; (−20) · (−3) = 60. Tích có hai thừa số âm nên mang dấu dương." },
      { topic: "Nhân, chia số nguyên", type: "fill", q: "(−72) : 8 = ___", ans: ["-9", "(-9)", "(−9)"], x: "Chia hai số khác dấu, thương mang dấu âm: 72 : 8 = 9, nên (−72) : 8 = −9." },
      { topic: "Hình phẳng", type: "mc", q: "Với mọi hình chữ nhật ABCD, khẳng định nào dưới đây luôn đúng?", o: ["Hai đường chéo AC và BD bằng nhau", "Bốn cạnh bằng nhau", "Hai đường chéo vuông góc với nhau", "Hai đường chéo cắt nhau tại trung điểm của mỗi cạnh"], x: "Hình chữ nhật có bốn góc vuông, các cạnh đối bằng nhau và hai đường chéo bằng nhau. Bốn cạnh bằng nhau, hai đường chéo vuông góc chỉ đúng khi hình chữ nhật là hình vuông. Hai đường chéo cắt nhau tại trung điểm của mỗi đường chéo, không phải trung điểm của cạnh." },
      { topic: "Chu vi, diện tích", type: "fill", q: "Hình thang cân có hai đáy dài 6 cm và 10 cm, chiều cao 4 cm. Diện tích hình thang là ___ cm²", ans: ["32"], x: "Diện tích hình thang = (tổng hai đáy) · chiều cao : 2 = (6 + 10) · 4 : 2 = 32 (cm²)." },
      { topic: "Tính đối xứng", type: "tf", q: "Hình vuông có 4 trục đối xứng.", a: true, x: "Hình vuông có 4 trục đối xứng: hai đường chéo và hai đường thẳng đi qua trung điểm hai cạnh đối." },
      { topic: "Tính đối xứng", type: "mc", q: "Chữ cái in hoa nào dưới đây có tâm đối xứng nhưng không có trục đối xứng?", o: ["N", "H", "A", "E"], x: "Quay chữ N nửa vòng quanh điểm chính giữa thì được lại chữ N, nhưng không gấp đôi chữ N cho hai nửa trùng nhau được. H có cả trục và tâm đối xứng; A và E chỉ có trục đối xứng." }
    ]
  },
  "toan6-ck1-de2": {
    note: "Toàn bộ chương trình học kì I (Chương I–V, Bài 1–22), sách Kết nối tri thức. Có lời giải từng câu.",
    questions: [
      { topic: "Tập hợp các số tự nhiên", type: "mc", q: "Tập hợp P = {x ∈ ℕ* | x < 6} có bao nhiêu phần tử?", o: ["5", "6", "4", "7"], x: "ℕ* là tập hợp các số tự nhiên khác 0. P = {1; 2; 3; 4; 5}, có 5 phần tử." },
      { topic: "Tập hợp các số tự nhiên", type: "tf", q: "Số La Mã XIX biểu diễn số 21.", a: false, x: "X là 10, IX là 9 (I đứng trước X nên lấy 10 − 1). XIX = 10 + 9 = 19. Số 21 viết là XXI." },
      { topic: "Tập hợp các số tự nhiên", type: "fill", q: "Trong số 4 052 817, chữ số 5 có giá trị là ___", ans: ["50 000", "50000", "50 nghìn"], x: "Chữ số 5 ở hàng chục nghìn, nên có giá trị 5 · 10 000 = 50 000." },
      { topic: "Tính đối xứng", type: "mc", q: "Hình nào dưới đây có tâm đối xứng?", o: ["Hình chữ nhật", "Tam giác đều", "Hình thang cân", "Tam giác vuông"], x: "Giao điểm hai đường chéo là tâm đối xứng của hình chữ nhật. Tam giác đều, hình thang cân và tam giác vuông không có tâm đối xứng." },
      { topic: "Tính đối xứng", type: "tf", q: "Tam giác đều có đúng 1 trục đối xứng.", a: false, x: "Tam giác đều có 3 trục đối xứng, mỗi trục đi qua một đỉnh và trung điểm cạnh đối diện." },
      { topic: "Lũy thừa, thứ tự thực hiện phép tính", type: "fill", q: "Tìm số tự nhiên n, biết 2ⁿ = 64. Vậy n = ___", ans: ["6"], x: "2 · 2 · 2 · 2 · 2 · 2 = 64, tức là 2⁶ = 64. Vậy n = 6." },
      { topic: "Lũy thừa, thứ tự thực hiện phép tính", type: "mc", q: "Giá trị của biểu thức 4² + 3³ là:", o: ["43", "17", "49", "24"], x: "4² = 4 · 4 = 16; 3³ = 3 · 3 · 3 = 27. 16 + 27 = 43. Chú ý 4² không phải 4 · 2." },
      { topic: "Lũy thừa, thứ tự thực hiện phép tính", type: "fill", q: "[(14 − 4) · 5 + 50] : 10 = ___", ans: ["10"], x: "Ngoặc tròn trước: 14 − 4 = 10. Ngoặc vuông: 10 · 5 + 50 = 100. Cuối cùng: 100 : 10 = 10." },
      { topic: "Lũy thừa, thứ tự thực hiện phép tính", type: "tf", q: "Kết quả của phép tính 18 − 6 : 3 là 4.", a: false, x: "Chia trước, trừ sau: 6 : 3 = 2; 18 − 2 = 16. Kết quả là 16, không phải 4." },
      { topic: "Tính chia hết, số nguyên tố", type: "tf", q: "Nếu a chia hết cho 4 và b chia hết cho 4 thì a + b chia hết cho 4.", a: true, x: "Tính chất chia hết của một tổng: nếu tất cả các số hạng đều chia hết cho cùng một số thì tổng cũng chia hết cho số đó." },
      { topic: "Tính chia hết, số nguyên tố", type: "mc", q: "Số nào dưới đây chia hết cho 3 nhưng không chia hết cho 9?", o: ["4 512", "5 391", "2 304", "1 235"], x: "Tổng các chữ số: 4 512 → 12 (chia hết cho 3, không chia hết cho 9); 5 391 → 18 và 2 304 → 9 (chia hết cho 9); 1 235 → 11 (không chia hết cho 3)." },
      { topic: "Tính chia hết, số nguyên tố", type: "fill", q: "Có ___ số nguyên tố nhỏ hơn 20.", ans: ["8"], x: "Các số nguyên tố nhỏ hơn 20 là 2, 3, 5, 7, 11, 13, 17, 19. Có 8 số." },
      { topic: "Tính chia hết, số nguyên tố", type: "mc", q: "Số nào dưới đây là hợp số?", o: ["91", "97", "89", "83"], x: "91 = 7 · 13 nên có nhiều hơn hai ước, là hợp số. 97, 89, 83 đều là số nguyên tố." },
      { topic: "ƯCLN và BCNN", type: "fill", q: "BCNN(12, 18) = ___", ans: ["36"], x: "12 = 2² · 3; 18 = 2 · 3². Lấy các thừa số chung và riêng với số mũ lớn nhất: BCNN = 2² · 3² = 36." },
      { topic: "ƯCLN và BCNN", type: "mc", q: "Cô giáo có 36 quyển vở và 24 chiếc bút. Cô muốn chia đều số vở và số bút vào các phần quà (phần nào cũng có cả vở và bút, không thừa quyển vở hay chiếc bút nào). Cô chia được nhiều nhất bao nhiêu phần quà?", o: ["12", "6", "72", "4"], x: "Số phần quà là ước chung của 36 và 24; nhiều nhất là ƯCLN(36, 24) = 12. Mỗi phần có 3 quyển vở và 2 chiếc bút. Chia 6 hay 4 phần cũng được nhưng chưa phải nhiều nhất; 72 không chia được." },
      { topic: "ƯCLN và BCNN", type: "tf", q: "Hai số 8 và 15 là hai số nguyên tố cùng nhau.", a: true, x: "Ước của 8: 1, 2, 4, 8. Ước của 15: 1, 3, 5, 15. ƯCLN(8, 15) = 1 nên 8 và 15 là hai số nguyên tố cùng nhau." },
      { topic: "Số nguyên", type: "mc", q: "Sắp xếp các số 4; −7; 0; −2; 9 theo thứ tự giảm dần:", o: ["9; 4; 0; −2; −7", "9; 4; 0; −7; −2", "−7; −2; 0; 4; 9", "9; 4; −2; −7; 0"], x: "Số dương lớn hơn 0, số 0 lớn hơn số âm. Giữa hai số âm, −2 > −7 vì −2 gần 0 hơn. Thứ tự giảm dần: 9; 4; 0; −2; −7." },
      { topic: "Số nguyên", type: "fill", q: "Buổi sáng nhiệt độ ở một vùng núi là −2 °C, đến trưa nhiệt độ tăng thêm 7 °C. Nhiệt độ buổi trưa là ___ °C.", ans: ["5", "+5", "+5°C"], x: "Tăng thêm thì cộng: −2 + 7 = 5 (°C)." },
      { topic: "Số nguyên", type: "fill", q: "(−38) + (−62) = ___", ans: ["-100", "(-100)", "(−100)"], x: "Cộng hai số nguyên âm: cộng hai số 38 + 62 = 100 rồi đặt dấu “−”. Kết quả −100." },
      { topic: "Số nguyên", type: "mc", q: "Bỏ dấu ngoặc trong biểu thức 15 − (a − 7 + b), ta được:", o: ["15 − a + 7 − b", "15 − a − 7 + b", "15 + a − 7 + b", "15 − a − 7 − b"], x: "Trước ngoặc có dấu “−” thì đổi dấu mọi số hạng trong ngoặc: a thành −a, −7 thành +7, b thành −b." },
      { topic: "Nhân, chia số nguyên", type: "fill", q: "(−7) · 4 − 6 · (−5) = ___", ans: ["2"], x: "Nhân trước: (−7) · 4 = −28; 6 · (−5) = −30. Rồi trừ: −28 − (−30) = −28 + 30 = 2." },
      { topic: "Nhân, chia số nguyên", type: "mc", q: "Tất cả các ước nguyên của 6 là:", o: ["−6; −3; −2; −1; 1; 2; 3; 6", "1; 2; 3; 6", "−6; −3; −2; −1", "0; 1; 2; 3; 6"], x: "Các ước tự nhiên của 6 là 1, 2, 3, 6. Số đối của chúng cũng là ước của 6. Số 0 không là ước của số nào." },
      { topic: "Hình phẳng", type: "mc", q: "Mỗi góc của hình lục giác đều có số đo bằng:", o: ["120°", "60°", "90°", "180°"], x: "Hình lục giác đều ghép được từ 6 tam giác đều chung một đỉnh ở tâm. Mỗi góc của lục giác gồm hai góc của tam giác đều: 60° + 60° = 120°." },
      { topic: "Chu vi, diện tích", type: "fill", q: "Mảnh vườn hình chữ nhật có chiều dài 15 m, chiều rộng 8 m. Chu vi mảnh vườn là ___ m", ans: ["46"], x: "Chu vi hình chữ nhật = 2 · (chiều dài + chiều rộng) = 2 · (15 + 8) = 46 (m)." },
      { topic: "Chu vi, diện tích", type: "mc", q: "Hình bình hành có cạnh đáy 12 cm, chiều cao tương ứng 5 cm. Diện tích hình bình hành là:", o: ["60 cm²", "30 cm²", "34 cm²", "17 cm²"], x: "Diện tích hình bình hành = cạnh đáy · chiều cao = 12 · 5 = 60 (cm²). Không chia cho 2. (Chỉ công thức diện tích hình thoi theo hai đường chéo, S = m · n : 2, và công thức diện tích hình thang mới có chia cho 2.)" }
    ]
  }
});
