/* Danh mục đề có sẵn (ngân hàng câu hỏi chạy bằng js/quiz.js). Quản trị viên, phụ huynh nhập thêm ngân hàng ngay trong app
   (Quản trị → Ngân hàng đề); ngân hàng nhập vào lưu trong kho dữ liệu, không sửa các file này.

   App nạp danh mục này lúc mở: trang chủ, lịch thi, nhóm bài ôn chỉ cần tên, khối, môn, số câu. Câu hỏi nằm ở
   data/banks/<khối>-<mã môn>.js, chỉ tải khi mở một đề của file đó (Store.loadBank trong js/store.js).
   Mỗi đề: id (đã có thì không đổi: kết quả cũ, lịch thi, seedBanksSeen dùng mã này), title, grade, subject,
   minutes (số phút khi làm như thi), n (số câu, bằng số câu trong file), file.
   title đúng dạng "<môn> <khối> · <kì> · Đề N" (kì: Giữa kì I, Cuối kì I, Giữa kì II, Cuối năm; N từ 1): chữ trên nút đề
     lấy từ tên (bankLabels trong js/app.js), thiếu số đề thì nút chỉ ghi "Đề". tests/kiem-tra-de.js kiểm tra, trừ đề thử nghiệm.
   Đề ngẫu nhiên (Phiên K3) là mục có thêm trường pool: { from, matrix }. Tên dạng "<môn> <khối> · <kì> · Đề ngẫu nhiên".
     from: mã các đề cố định cùng khối, cùng môn, cùng file; câu của các đề đó gộp thành kho câu của pool (đề cố định
       vẫn làm riêng được). Pool có thể có thêm câu riêng ghi trong file như đề thường ("<mã pool>": { note, questions }),
       không có thì không ghi vào file. Kho câu = câu riêng + câu của các đề trong from.
     matrix: ma trận đề, { "<chủ đề>": số câu } hoặc { "<chủ đề>": [Biết, Hiểu, Vận dụng] } (số câu từng mức, theo lv của
       câu). Tổng bằng n (số câu rút mỗi lần). Chủ đề phải đúng chữ topic của câu. Mỗi lần học sinh bấm "Đề ngẫu nhiên",
       app rút câu theo ma trận (Quiz.draw trong js/quiz.js), ưu tiên câu chưa làm hoặc hay sai; ô thiếu câu thì lấy bù
       cùng chủ đề (câu chưa ghi mức, rồi mức gần nhất) rồi từ chủ đề khác, và ghi chú cho học sinh. Kết quả ghi refId là mã pool.
     Kho phải đủ câu cho từng chủ đề (tests/kiem-tra-de.js báo lỗi); thiếu ở một mức thì chỉ nhắc.
   Mã môn: toan, tv (Tiếng Việt), van (Ngữ văn), ta (Tiếng Anh), khoahoc, lsdl (Lịch sử và Địa lí), khtn, gdcd, tin,
   congnghe, tincn (Tin học và Công nghệ), thunghiem (đề thử nghiệm). Môn mới thì đặt mã mới, viết thường không dấu.

   File câu hỏi ghi vào window.ONTAP_SEED_QUESTIONS: "<mã đề>": { note, passages?, questions }. Dạng câu hỏi (js/quiz.js):
   { type: "mc",   q: "...", o: ["đáp án đúng", "sai", "sai", "sai"], x: "giải thích" }   // đáp án đúng luôn đứng đầu, app tự xáo
   { type: "fill", q: "... ___ ...", ans: ["đáp án", "cách viết khác"], x: "..." }
   { type: "tf",   q: "Mệnh đề", a: true, x: "..." }
   { type: "tf4",  q: "Đề chung", o: ["ý a", "ý b", "ý c", "ý d"], a: [true, false, true, true], x: "..." }
                   // đúng/sai 4 ý, chấm từng ý như đề thi tốt nghiệp: đúng 1/2/3/4 ý được 0,1/0,25/0,5/1 câu
   { type: "num",  q: "...", ans: 2.5, tol: 0.1, unit: "kg", x: "..." }   // trả lời ngắn bằng số; tol (sai số cho phép), unit không bắt buộc
   { type: "match", q: "Nối…", l: ["trái 1", "trái 2"], r: ["phải 1", "phải 2", "ô thừa"], x: "..." }
                   // nối cột: l[i] nối với r[i]; r có thể thêm ô thừa ở cuối; chấm theo số cặp nối đúng
   { type: "order", q: "Sắp xếp…", o: ["thứ 1", "thứ 2", "thứ 3"], x: "..." }   // viết theo thứ tự đúng (ít nhất 3 ô), app tự xáo
   { type: "essay", q: "Đề bài", rubric: [{ c: "ý cần có", p: 0.5 }, …], x: "đáp án gợi ý" }
                   // tự luận: học sinh, phụ huynh tự chấm theo thang (điểm mỗi ý chia hết cho 0,25); không tính vào điểm trung bình
   topic: tên chủ đề để thống kê câu sai theo chủ đề. Trường chung không bắt buộc:
   lv: mức độ 1 (Biết), 2 (Hiểu), 3 (Vận dụng);
   p: mã đoạn đọc trong passages: { "<mã>": { title?, text?, svg? } } (các câu cùng đoạn đứng liền nhau khi làm bài);
   svg: hình vẽ '<svg viewBox="0 0 320 200">…</svg>'. Chỉ dùng thẻ svg, g, path, rect, circle, ellipse, line, polyline,
   polygon, text, tspan, title và thuộc tính vẽ; màu fill, stroke ghi bằng tên token của css/app.css (ink, muted, line,
   surface, bg, acc, acc-soft, sun, sun-soft, ok, ok-soft, bad, bad-soft…) để đọc được ở chế độ tối. Mặc định nét màu
   chữ, không tô; chữ cỡ 15. viewBox rộng khoảng 320 để chữ trên điện thoại không nhỏ hơn 13px. Bộ lọc: Quiz.svg.
   Thêm đề: xem CLAUDE.md, mục "Thêm đề có sẵn". Kiểm tra: node tests/kiem-tra-de.js (in "DE OK"). */
window.ONTAP_SEED_BANKS = [
  /* Khoa học, Lịch sử và Địa lí, KHTN · Kiểm tra cuối học kì I (Kết nối tri thức) */
  { id: "khoahoc4-ck1-de1", title: "Khoa học 4 · Cuối kì I · Đề 1", grade: 4, subject: "Khoa học", minutes: 35, n: 25, file: "4-khoahoc.js" },
  { id: "lsdl4-ck1-de1", title: "Lịch sử và Địa lí 4 · Cuối kì I · Đề 1", grade: 4, subject: "Lịch sử và Địa lí", minutes: 35, n: 25, file: "4-lsdl.js" },
  { id: "khtn6-ck1-de1", title: "KHTN 6 · Cuối kì I · Đề 1", grade: 6, subject: "KHTN", minutes: 45, n: 25, file: "6-khtn.js" },
  { id: "lsdl6-ck1-de1", title: "Lịch sử và Địa lí 6 · Cuối kì I · Đề 1", grade: 6, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "6-lsdl.js" },

  /* Toán 4 · Kiểm tra cuối học kì I (Kết nối tri thức, Bài 1–37) */
  { id: "toan4-ck1-de1", title: "Toán 4 · Cuối kì I · Đề 1", grade: 4, subject: "Toán", minutes: 40, n: 25, file: "4-toan.js" },
  { id: "toan4-ck1-de2", title: "Toán 4 · Cuối kì I · Đề 2", grade: 4, subject: "Toán", minutes: 40, n: 25, file: "4-toan.js" },
  { id: "toan4-ck1-de3", title: "Toán 4 · Cuối kì I · Đề 3", grade: 4, subject: "Toán", minutes: 40, n: 25, file: "4-toan.js" },

  /* Tiếng Việt 4 · Kiểm tra cuối học kì I (Kết nối tri thức, tập 1, Bài 1–32) */
  { id: "tv4-ck1-de1", title: "Tiếng Việt 4 · Cuối kì I · Đề 1", grade: 4, subject: "Tiếng Việt", minutes: 35, n: 25, file: "4-tv.js" },
  { id: "tv4-ck1-de2", title: "Tiếng Việt 4 · Cuối kì I · Đề 2", grade: 4, subject: "Tiếng Việt", minutes: 35, n: 25, file: "4-tv.js" },

  /* Toán 6 · Kiểm tra cuối học kì I (Kết nối tri thức, Chương I–V, Bài 1–22) */
  { id: "toan6-ck1-de1", title: "Toán 6 · Cuối kì I · Đề 1", grade: 6, subject: "Toán", minutes: 45, n: 25, file: "6-toan.js" },
  { id: "toan6-ck1-de2", title: "Toán 6 · Cuối kì I · Đề 2", grade: 6, subject: "Toán", minutes: 45, n: 25, file: "6-toan.js" },

  /* Ngữ văn 6 · Kiểm tra cuối học kì I (Kết nối tri thức, Bài 1–5) */
  { id: "van6-ck1-de1", title: "Ngữ văn 6 · Cuối kì I · Đề 1", grade: 6, subject: "Ngữ văn", minutes: 45, n: 25, file: "6-van.js" },
  { id: "van6-ck1-de2", title: "Ngữ văn 6 · Cuối kì I · Đề 2", grade: 6, subject: "Ngữ văn", minutes: 45, n: 25, file: "6-van.js" },

  /* Tiếng Anh, GDCD, Tin học, Công nghệ 6 · Kiểm tra cuối học kì I */
  { id: "ta6-ck1-de1", title: "Tiếng Anh 6 · Cuối kì I · Đề 1", grade: 6, subject: "Tiếng Anh", minutes: 45, n: 25, file: "6-ta.js" },
  { id: "gdcd6-ck1-de1", title: "GDCD 6 · Cuối kì I · Đề 1", grade: 6, subject: "GDCD", minutes: 35, n: 25, file: "6-gdcd.js" },
  { id: "tin6-ck1-de1", title: "Tin học 6 · Cuối kì I · Đề 1", grade: 6, subject: "Tin học", minutes: 35, n: 25, file: "6-tin.js" },
  { id: "congnghe6-ck1-de1", title: "Công nghệ 6 · Cuối kì I · Đề 1", grade: 6, subject: "Công nghệ", minutes: 35, n: 25, file: "6-congnghe.js" },

  /* Tin học và Công nghệ 4 · Kiểm tra cuối học kì I (Kết nối tri thức) */
  { id: "tincn4-ck1-de1", title: "Tin học và Công nghệ 4 · Cuối kì I · Đề 1", grade: 4, subject: "Tin học và Công nghệ", minutes: 35, n: 25, file: "4-tincn.js" },

  /* Tiếng Anh 4 · Kiểm tra cuối học kì I (Global Success 4, Unit 1–10) */
  { id: "ta4-ck1-de1", title: "Tiếng Anh 4 · Cuối kì I · Đề 1", grade: 4, subject: "Tiếng Anh", minutes: 35, n: 25, file: "4-ta.js" },

  /* Toán 4 · Kiểm tra giữa học kì II (Kết nối tri thức, Bài 38–59) */
  { id: "toan4-gk2-de1", title: "Toán 4 · Giữa kì II · Đề 1", grade: 4, subject: "Toán", minutes: 40, n: 25, file: "4-toan.js" },
  { id: "toan4-gk2-de2", title: "Toán 4 · Giữa kì II · Đề 2", grade: 4, subject: "Toán", minutes: 40, n: 25, file: "4-toan.js" },

  /* Tiếng Việt 4 · Kiểm tra giữa học kì II (Kết nối tri thức, tập 2, Bài 1–16) */
  { id: "tv4-gk2-de1", title: "Tiếng Việt 4 · Giữa kì II · Đề 1", grade: 4, subject: "Tiếng Việt", minutes: 35, n: 25, file: "4-tv.js" },
  { id: "tv4-gk2-de2", title: "Tiếng Việt 4 · Giữa kì II · Đề 2", grade: 4, subject: "Tiếng Việt", minutes: 35, n: 25, file: "4-tv.js" },

  /* Tiếng Anh, Lịch sử và Địa lí, GDCD, Tin học, Công nghệ 6 · Kiểm tra giữa học kì I (Kết nối tri thức, Global Success) */
  { id: "ta6-gk1-de1", title: "Tiếng Anh 6 · Giữa kì I · Đề 1", grade: 6, subject: "Tiếng Anh", minutes: 45, n: 25, file: "6-ta.js" },
  { id: "lsdl6-gk1-de1", title: "Lịch sử và Địa lí 6 · Giữa kì I · Đề 1", grade: 6, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "6-lsdl.js" },
  { id: "gdcd6-gk1-de1", title: "GDCD 6 · Giữa kì I · Đề 1", grade: 6, subject: "GDCD", minutes: 35, n: 25, file: "6-gdcd.js" },
  { id: "tin6-gk1-de1", title: "Tin học 6 · Giữa kì I · Đề 1", grade: 6, subject: "Tin học", minutes: 35, n: 25, file: "6-tin.js" },
  { id: "congnghe6-gk1-de1", title: "Công nghệ 6 · Giữa kì I · Đề 1", grade: 6, subject: "Công nghệ", minutes: 35, n: 25, file: "6-congnghe.js" },

  /* Ngân hàng Toán 4 cuối kì I (Phiên N1): kho câu = 31 câu riêng trong file + 75 câu của 3 đề cố định ở trên, câu nào cũng
     có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020 (3 mức, không quy định tỉ lệ): 10 – 8 – 7 câu (40% – 32% – 28%). */
  { id: "toan4-ck1-ngau-nhien", title: "Toán 4 · Cuối kì I · Đề ngẫu nhiên", grade: 4, subject: "Toán", minutes: 40, n: 25, file: "4-toan.js",
    pool: { from: ["toan4-ck1-de1", "toan4-ck1-de2", "toan4-ck1-de3"], matrix: {
      "Số có nhiều chữ số": [2, 1, 1], "Làm tròn số": [1, 0, 0], "Số chẵn, số lẻ": [1, 0, 0], "Biểu thức chứa chữ": [1, 0, 1],
      "Phép cộng, phép trừ": [1, 1, 1], "Phép nhân, phép chia": [1, 0, 0], "Tính chất phép cộng": [0, 1, 0], "Tổng và hiệu": [0, 1, 1],
      "Giải bài toán có ba bước tính": [0, 0, 2], "Góc và đo góc": [1, 1, 0], "Đơn vị đo": [1, 1, 1],
      "Đường thẳng vuông góc, song song": [1, 1, 0], "Hình bình hành, hình thoi": [0, 1, 0] } } },
  /* Các đề ngẫu nhiên dưới đây (Phiên K3): kho câu gộp từ các đề cố định cùng môn, cùng kì ở trên; ma trận theo chủ đề (số câu
     mỗi chủ đề tỉ lệ với số câu có trong kho, mỗi chủ đề ít nhất 1 câu). Câu chưa ghi mức độ nên chưa chia theo mức. */
  { id: "tv4-ck1-ngau-nhien", title: "Tiếng Việt 4 · Cuối kì I · Đề ngẫu nhiên", grade: 4, subject: "Tiếng Việt", minutes: 35, n: 25, file: "4-tv.js",
    pool: { from: ["tv4-ck1-de1", "tv4-ck1-de2"], matrix: {
      "Đọc hiểu": 7, "Danh từ": 2, "Danh từ chung, danh từ riêng": 2, "Viết tên cơ quan, tổ chức": 1, "Động từ": 3, "Tính từ": 3,
      "Biện pháp nhân hoá": 2, "Dấu gạch ngang": 2, "Sử dụng từ điển": 1, "Chính tả": 2 } } },
  { id: "toan6-ck1-ngau-nhien", title: "Toán 6 · Cuối kì I · Đề ngẫu nhiên", grade: 6, subject: "Toán", minutes: 45, n: 25, file: "6-toan.js",
    pool: { from: ["toan6-ck1-de1", "toan6-ck1-de2"], matrix: {
      "Tập hợp các số tự nhiên": 4, "Lũy thừa, thứ tự thực hiện phép tính": 4, "Tính chia hết, số nguyên tố": 5, "ƯCLN và BCNN": 2,
      "Số nguyên": 4, "Nhân, chia số nguyên": 2, "Hình phẳng": 1, "Chu vi, diện tích": 1, "Tính đối xứng": 2 } } },
  { id: "van6-ck1-ngau-nhien", title: "Ngữ văn 6 · Cuối kì I · Đề ngẫu nhiên", grade: 6, subject: "Ngữ văn", minutes: 45, n: 25, file: "6-van.js",
    pool: { from: ["van6-ck1-de1", "van6-ck1-de2"], matrix: {
      "Tôi và các bạn": 3, "Dấu câu": 1, "Từ đơn và từ phức": 3, "Nghĩa của từ": 1, "Biện pháp tu từ": 5, "Gõ cửa trái tim": 2,
      "Yêu thương và chia sẻ": 3, "Cụm danh từ, cụm động từ, cụm tính từ": 2, "Quê hương yêu dấu": 2, "Từ đồng âm và từ đa nghĩa": 1,
      "Những nẻo đường xứ sở": 2 } } },
  { id: "toan4-gk2-ngau-nhien", title: "Toán 4 · Giữa kì II · Đề ngẫu nhiên", grade: 4, subject: "Toán", minutes: 40, n: 25, file: "4-toan.js",
    pool: { from: ["toan4-gk2-de1", "toan4-gk2-de2"], matrix: {
      "Phép nhân": 3, "Phép chia": 4, "Tính chất phép nhân": 3, "Nhân, chia với 10, 100, 1 000": 1, "Ước lượng": 1, "Số trung bình cộng": 2,
      "Rút về đơn vị": 2, "Dãy số liệu, biểu đồ cột": 3, "Số lần xuất hiện của sự kiện": 1, "Phân số": 1, "Rút gọn phân số": 1,
      "Quy đồng mẫu số": 1, "So sánh phân số": 1, "Tính chất cơ bản của phân số": 1 } } },
  { id: "tv4-gk2-ngau-nhien", title: "Tiếng Việt 4 · Giữa kì II · Đề ngẫu nhiên", grade: 4, subject: "Tiếng Việt", minutes: 35, n: 25, file: "4-tv.js",
    pool: { from: ["tv4-gk2-de1", "tv4-gk2-de2"], matrix: {
      "Đọc hiểu": 7, "Câu": 2, "Chủ ngữ": 3, "Vị ngữ": 4, "Trạng ngữ": 1, "Trạng ngữ chỉ thời gian, nơi chốn": 2,
      "Trạng ngữ chỉ nguyên nhân, mục đích": 2, "Mở rộng vốn từ": 2, "Chính tả": 2 } } },

  /* Đề thử nghiệm các dạng câu mới (Phiên K2), không gắn kì thi: hiện ở nhóm "Bài ôn khác" của lớp 6 */
  { id: "thunghiem6-dang-cau-moi", title: "Đề thử nghiệm · Các dạng câu mới", grade: 6, subject: "Thử nghiệm", minutes: 30, n: 15, file: "6-thunghiem.js" }
];
