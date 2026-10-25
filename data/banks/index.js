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
     Câu dùng chung đoạn đọc (p, Phiên K4) rút theo đoạn: k câu của một chủ đề lấy từ không quá ⌈k/3⌉ đoạn, mỗi đoạn lấy cả đoạn
       (hoặc phần vừa đủ, chọn câu theo mức còn thiếu), đoạn có câu hay sai, chưa làm được chọn trước; số câu từng mức theo đoạn
       có thể lệch ma trận, lệch quá 1 câu ở một mức thì ghi chú. Nên viết mỗi đoạn 3–4 câu của một chủ đề, đủ ba mức theo tỉ lệ
       của ô (tests/kiem-tra-de.js thử mọi thứ tự đoạn và nhắc khi app sẽ ghi chú). Câu không có đoạn vẫn rút theo ô như trên.
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
                   // đáp án là phân số: ans là chuỗi "a/b" (ví dụ "2/3", "-3/4"; mẫu số khác 0); số nguyên, số thập phân vẫn ghi dạng số.
                   // Chấm theo giá trị (6/8, 0,75 cũng đúng với "3/4"), hiện đáp án đúng "2/3". Ô nhập có nút ± và nút "/" (bàn phím số
                   // của iPhone không có hai dấu này). Đề bắt viết phân số tối giản thì dùng câu điền (so chữ).
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
  { id: "khoahoc4-ck1-de2", title: "Khoa học 4 · Cuối kì I · Đề 2", grade: 4, subject: "Khoa học", minutes: 35, n: 25, file: "4-khoahoc.js" },
  { id: "lsdl4-ck1-de1", title: "Lịch sử và Địa lí 4 · Cuối kì I · Đề 1", grade: 4, subject: "Lịch sử và Địa lí", minutes: 35, n: 25, file: "4-lsdl.js" },
  { id: "lsdl4-ck1-de2", title: "Lịch sử và Địa lí 4 · Cuối kì I · Đề 2", grade: 4, subject: "Lịch sử và Địa lí", minutes: 35, n: 25, file: "4-lsdl.js" },
  { id: "khtn6-ck1-de1", title: "KHTN 6 · Cuối kì I · Đề 1", grade: 6, subject: "KHTN", minutes: 45, n: 25, file: "6-khtn.js" },
  { id: "khtn6-ck1-de2", title: "KHTN 6 · Cuối kì I · Đề 2", grade: 6, subject: "KHTN", minutes: 45, n: 25, file: "6-khtn.js" },
  { id: "lsdl6-ck1-de1", title: "Lịch sử và Địa lí 6 · Cuối kì I · Đề 1", grade: 6, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "6-lsdl.js" },
  { id: "lsdl6-ck1-de2", title: "Lịch sử và Địa lí 6 · Cuối kì I · Đề 2", grade: 6, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "6-lsdl.js" },

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
  { id: "ta6-ck1-de2", title: "Tiếng Anh 6 · Cuối kì I · Đề 2", grade: 6, subject: "Tiếng Anh", minutes: 45, n: 25, file: "6-ta.js" },
  { id: "gdcd6-ck1-de1", title: "GDCD 6 · Cuối kì I · Đề 1", grade: 6, subject: "GDCD", minutes: 35, n: 25, file: "6-gdcd.js" },
  { id: "gdcd6-ck1-de2", title: "GDCD 6 · Cuối kì I · Đề 2", grade: 6, subject: "GDCD", minutes: 35, n: 25, file: "6-gdcd.js" },
  { id: "tin6-ck1-de1", title: "Tin học 6 · Cuối kì I · Đề 1", grade: 6, subject: "Tin học", minutes: 35, n: 25, file: "6-tin.js" },
  { id: "tin6-ck1-de2", title: "Tin học 6 · Cuối kì I · Đề 2", grade: 6, subject: "Tin học", minutes: 35, n: 25, file: "6-tin.js" },
  { id: "congnghe6-ck1-de1", title: "Công nghệ 6 · Cuối kì I · Đề 1", grade: 6, subject: "Công nghệ", minutes: 35, n: 25, file: "6-congnghe.js" },
  { id: "congnghe6-ck1-de2", title: "Công nghệ 6 · Cuối kì I · Đề 2", grade: 6, subject: "Công nghệ", minutes: 35, n: 25, file: "6-congnghe.js" },

  /* Tin học và Công nghệ 4 · Kiểm tra cuối học kì I (Kết nối tri thức) */
  { id: "tincn4-ck1-de1", title: "Tin học và Công nghệ 4 · Cuối kì I · Đề 1", grade: 4, subject: "Tin học và Công nghệ", minutes: 35, n: 25, file: "4-tincn.js" },
  { id: "tincn4-ck1-de2", title: "Tin học và Công nghệ 4 · Cuối kì I · Đề 2", grade: 4, subject: "Tin học và Công nghệ", minutes: 35, n: 25, file: "4-tincn.js" },

  /* Tiếng Anh 4 · Kiểm tra cuối học kì I (Global Success 4, Unit 1–10) */
  { id: "ta4-ck1-de1", title: "Tiếng Anh 4 · Cuối kì I · Đề 1", grade: 4, subject: "Tiếng Anh", minutes: 35, n: 25, file: "4-ta.js" },
  { id: "ta4-ck1-de2", title: "Tiếng Anh 4 · Cuối kì I · Đề 2", grade: 4, subject: "Tiếng Anh", minutes: 35, n: 25, file: "4-ta.js" },

  /* Toán 4 · Kiểm tra giữa học kì II (Kết nối tri thức, Bài 38–59) */
  { id: "toan4-gk2-de1", title: "Toán 4 · Giữa kì II · Đề 1", grade: 4, subject: "Toán", minutes: 40, n: 25, file: "4-toan.js" },
  { id: "toan4-gk2-de2", title: "Toán 4 · Giữa kì II · Đề 2", grade: 4, subject: "Toán", minutes: 40, n: 25, file: "4-toan.js" },

  /* Tiếng Việt 4 · Kiểm tra giữa học kì II (Kết nối tri thức, tập 2, Bài 1–16) */
  { id: "tv4-gk2-de1", title: "Tiếng Việt 4 · Giữa kì II · Đề 1", grade: 4, subject: "Tiếng Việt", minutes: 35, n: 25, file: "4-tv.js" },
  { id: "tv4-gk2-de2", title: "Tiếng Việt 4 · Giữa kì II · Đề 2", grade: 4, subject: "Tiếng Việt", minutes: 35, n: 25, file: "4-tv.js" },

  /* Tiếng Anh, Lịch sử và Địa lí, GDCD, Tin học, Công nghệ 6 · Kiểm tra giữa học kì I (Kết nối tri thức, Global Success) */
  { id: "ta6-gk1-de1", title: "Tiếng Anh 6 · Giữa kì I · Đề 1", grade: 6, subject: "Tiếng Anh", minutes: 45, n: 25, file: "6-ta.js" },
  { id: "ta6-gk1-de2", title: "Tiếng Anh 6 · Giữa kì I · Đề 2", grade: 6, subject: "Tiếng Anh", minutes: 45, n: 25, file: "6-ta.js" },
  { id: "lsdl6-gk1-de1", title: "Lịch sử và Địa lí 6 · Giữa kì I · Đề 1", grade: 6, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "6-lsdl.js" },
  { id: "lsdl6-gk1-de2", title: "Lịch sử và Địa lí 6 · Giữa kì I · Đề 2", grade: 6, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "6-lsdl.js" },
  { id: "gdcd6-gk1-de1", title: "GDCD 6 · Giữa kì I · Đề 1", grade: 6, subject: "GDCD", minutes: 35, n: 25, file: "6-gdcd.js" },
  { id: "gdcd6-gk1-de2", title: "GDCD 6 · Giữa kì I · Đề 2", grade: 6, subject: "GDCD", minutes: 35, n: 25, file: "6-gdcd.js" },
  { id: "tin6-gk1-de1", title: "Tin học 6 · Giữa kì I · Đề 1", grade: 6, subject: "Tin học", minutes: 35, n: 25, file: "6-tin.js" },
  { id: "tin6-gk1-de2", title: "Tin học 6 · Giữa kì I · Đề 2", grade: 6, subject: "Tin học", minutes: 35, n: 25, file: "6-tin.js" },
  { id: "congnghe6-gk1-de1", title: "Công nghệ 6 · Giữa kì I · Đề 1", grade: 6, subject: "Công nghệ", minutes: 35, n: 25, file: "6-congnghe.js" },
  { id: "congnghe6-gk1-de2", title: "Công nghệ 6 · Giữa kì I · Đề 2", grade: 6, subject: "Công nghệ", minutes: 35, n: 25, file: "6-congnghe.js" },

  /* KHTN 6 · Kiểm tra giữa học kì I (Kết nối tri thức, Bài 1–16, trường dạy cuốn chiếu; Phiên N25) */
  { id: "khtn6-gk1-de1", title: "KHTN 6 · Giữa kì I · Đề 1", grade: 6, subject: "KHTN", minutes: 45, n: 25, file: "6-khtn.js" },
  { id: "khtn6-gk1-de2", title: "KHTN 6 · Giữa kì I · Đề 2", grade: 6, subject: "KHTN", minutes: 45, n: 25, file: "6-khtn.js" },

  /* Toán 6 · Kiểm tra giữa học kì I (Kết nối tri thức; Đề 1: Chương I–II, Bài 1–12, cho lớp chưa học số nguyên;
     Đề 2: Chương I–III, Bài 1–17; Đề 3, Đề 4: Chương I, II, IV, Bài 1–12 và 18–20, cho trường dạy song song số và hình,
     60 phút như đề tự luận của trường, không nằm trong kho của đề ngẫu nhiên; Phiên N26) */
  { id: "toan6-gk1-de1", title: "Toán 6 · Giữa kì I · Đề 1", grade: 6, subject: "Toán", minutes: 45, n: 25, file: "6-toan.js" },
  { id: "toan6-gk1-de2", title: "Toán 6 · Giữa kì I · Đề 2", grade: 6, subject: "Toán", minutes: 45, n: 25, file: "6-toan.js" },
  { id: "toan6-gk1-de3", title: "Toán 6 · Giữa kì I · Đề 3", grade: 6, subject: "Toán", minutes: 60, n: 25, file: "6-toan.js" },
  { id: "toan6-gk1-de4", title: "Toán 6 · Giữa kì I · Đề 4", grade: 6, subject: "Toán", minutes: 60, n: 25, file: "6-toan.js" },

  /* Ngữ văn 6 · Kiểm tra giữa học kì I (Kết nối tri thức, Bài 1–3) */
  { id: "van6-gk1-de1", title: "Ngữ văn 6 · Giữa kì I · Đề 1", grade: 6, subject: "Ngữ văn", minutes: 45, n: 25, file: "6-van.js" },
  { id: "van6-gk1-de2", title: "Ngữ văn 6 · Giữa kì I · Đề 2", grade: 6, subject: "Ngữ văn", minutes: 45, n: 25, file: "6-van.js" },

  /* Toán 4 · Kiểm tra giữa học kì I (Kết nối tri thức, Bài 1–19) */
  { id: "toan4-gk1-de1", title: "Toán 4 · Giữa kì I · Đề 1", grade: 4, subject: "Toán", minutes: 40, n: 25, file: "4-toan.js" },
  { id: "toan4-gk1-de2", title: "Toán 4 · Giữa kì I · Đề 2", grade: 4, subject: "Toán", minutes: 40, n: 25, file: "4-toan.js" },

  /* Tiếng Việt 4 · Kiểm tra giữa học kì I (Kết nối tri thức, tập 1, Bài 1–16, tuần 1–8) */
  { id: "tv4-gk1-de1", title: "Tiếng Việt 4 · Giữa kì I · Đề 1", grade: 4, subject: "Tiếng Việt", minutes: 40, n: 25, file: "4-tv.js" },
  { id: "tv4-gk1-de2", title: "Tiếng Việt 4 · Giữa kì I · Đề 2", grade: 4, subject: "Tiếng Việt", minutes: 40, n: 25, file: "4-tv.js" },

  /* Toán 6 · Kiểm tra giữa học kì II (Kết nối tri thức, Bài 23–35: Chương VI Phân số, Chương VII Số thập phân, Chương VIII Bài 32–35;
     Phiên N8) */
  { id: "toan6-gk2-de1", title: "Toán 6 · Giữa kì II · Đề 1", grade: 6, subject: "Toán", minutes: 45, n: 25, file: "6-toan.js" },
  { id: "toan6-gk2-de2", title: "Toán 6 · Giữa kì II · Đề 2", grade: 6, subject: "Toán", minutes: 45, n: 25, file: "6-toan.js" },
  /* Ngữ văn 6 · Kiểm tra giữa học kì II (Kết nối tri thức, Bài 6 Chuyện kể về những người anh hùng, Bài 7 Thế giới cổ tích; Phiên N9) */
  { id: "van6-gk2-de1", title: "Ngữ văn 6 · Giữa kì II · Đề 1", grade: 6, subject: "Ngữ văn", minutes: 45, n: 25, file: "6-van.js" },
  { id: "van6-gk2-de2", title: "Ngữ văn 6 · Giữa kì II · Đề 2", grade: 6, subject: "Ngữ văn", minutes: 45, n: 25, file: "6-van.js" },
  /* Tiếng Anh 6 · Kiểm tra giữa học kì II (Global Success 6, Unit 7 Television, Unit 8 Sports and Games, Unit 9 Cities of the World,
     Review 3; Phiên N10) */
  { id: "ta6-gk2-de1", title: "Tiếng Anh 6 · Giữa kì II · Đề 1", grade: 6, subject: "Tiếng Anh", minutes: 45, n: 25, file: "6-ta.js" },
  { id: "ta6-gk2-de2", title: "Tiếng Anh 6 · Giữa kì II · Đề 2", grade: 6, subject: "Tiếng Anh", minutes: 45, n: 25, file: "6-ta.js" },
  /* KHTN 6 · Kiểm tra giữa học kì II (Kết nối tri thức, Chương VII Đa dạng thế giới sống, Bài 25–39; Phiên N11) */
  { id: "khtn6-gk2-de1", title: "KHTN 6 · Giữa kì II · Đề 1", grade: 6, subject: "KHTN", minutes: 45, n: 25, file: "6-khtn.js" },
  { id: "khtn6-gk2-de2", title: "KHTN 6 · Giữa kì II · Đề 2", grade: 6, subject: "KHTN", minutes: 45, n: 25, file: "6-khtn.js" },
  /* Lịch sử và Địa lí 6, GDCD 6 · Kiểm tra giữa học kì II (Kết nối tri thức; Lịch sử Bài 11–15, Địa lí Bài 16–22; GDCD Bài 7–9;
     Phiên N12) */
  { id: "lsdl6-gk2-de1", title: "Lịch sử và Địa lí 6 · Giữa kì II · Đề 1", grade: 6, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "6-lsdl.js" },
  { id: "lsdl6-gk2-de2", title: "Lịch sử và Địa lí 6 · Giữa kì II · Đề 2", grade: 6, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "6-lsdl.js" },
  { id: "gdcd6-gk2-de1", title: "GDCD 6 · Giữa kì II · Đề 1", grade: 6, subject: "GDCD", minutes: 35, n: 25, file: "6-gdcd.js" },
  { id: "gdcd6-gk2-de2", title: "GDCD 6 · Giữa kì II · Đề 2", grade: 6, subject: "GDCD", minutes: 35, n: 25, file: "6-gdcd.js" },
  /* Tin học 6, Công nghệ 6 · Kiểm tra giữa học kì II (Kết nối tri thức; Tin học Bài 9–13; Công nghệ Bài 7–10; Phiên N12b) */
  { id: "tin6-gk2-de1", title: "Tin học 6 · Giữa kì II · Đề 1", grade: 6, subject: "Tin học", minutes: 35, n: 25, file: "6-tin.js" },
  { id: "tin6-gk2-de2", title: "Tin học 6 · Giữa kì II · Đề 2", grade: 6, subject: "Tin học", minutes: 35, n: 25, file: "6-tin.js" },
  { id: "congnghe6-gk2-de1", title: "Công nghệ 6 · Giữa kì II · Đề 1", grade: 6, subject: "Công nghệ", minutes: 35, n: 25, file: "6-congnghe.js" },
  { id: "congnghe6-gk2-de2", title: "Công nghệ 6 · Giữa kì II · Đề 2", grade: 6, subject: "Công nghệ", minutes: 35, n: 25, file: "6-congnghe.js" },

  /* Ngân hàng Toán 4 cuối kì I (Phiên N1): kho câu = 31 câu riêng trong file + 75 câu của 3 đề cố định ở trên, câu nào cũng
     có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020 (3 mức, không quy định tỉ lệ): 10 – 8 – 7 câu (40% – 32% – 28%). */
  { id: "toan4-ck1-ngau-nhien", title: "Toán 4 · Cuối kì I · Đề ngẫu nhiên", grade: 4, subject: "Toán", minutes: 40, n: 25, file: "4-toan.js",
    pool: { from: ["toan4-ck1-de1", "toan4-ck1-de2", "toan4-ck1-de3"], matrix: {
      "Số có nhiều chữ số": [2, 1, 1], "Làm tròn số": [1, 0, 0], "Số chẵn, số lẻ": [1, 0, 0], "Biểu thức chứa chữ": [1, 0, 1],
      "Phép cộng, phép trừ": [1, 1, 1], "Phép nhân, phép chia": [1, 0, 0], "Tính chất phép cộng": [0, 1, 0], "Tổng và hiệu": [0, 1, 1],
      "Giải bài toán có ba bước tính": [0, 0, 2], "Góc và đo góc": [1, 1, 0], "Đơn vị đo": [1, 1, 1],
      "Đường thẳng vuông góc, song song": [1, 1, 0], "Hình bình hành, hình thoi": [0, 1, 0] } } },
  /* Ngân hàng Tiếng Việt 4 cuối kì I (Phiên N2): kho câu = 54 câu riêng trong file (6 đoạn đọc, 6 câu Viết) + 50 câu của 2 đề
     cố định ở trên, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu, trong đó 7 câu
     Đọc hiểu và 1 câu Viết (đoạn văn tự chấm, nên 40 phút; hai đề cố định 35 phút). 16 câu Luyện từ và câu chia theo số bài
     Luyện từ và câu của từng chủ đề trong sách: danh từ, viết tên cơ quan 5 câu (Bài 1, 3, 5, 7 và một phần Bài 31 luyện tập
     danh từ, động từ, tính từ); động từ 3 (Bài 9, 11, 13); từ điển 1 (Bài 15); nhân hoá 2 (Bài 17, 19); tính từ 3 (Bài 21, 23,
     25); dấu gạch ngang 2 (Bài 27, 29); thêm 1 câu Chính tả. */
  { id: "tv4-ck1-ngau-nhien", title: "Tiếng Việt 4 · Cuối kì I · Đề ngẫu nhiên", grade: 4, subject: "Tiếng Việt", minutes: 40, n: 25, file: "4-tv.js",
    pool: { from: ["tv4-ck1-de1", "tv4-ck1-de2"], matrix: {
      "Đọc hiểu": [3, 2, 2], "Danh từ": [1, 1, 0], "Danh từ chung, danh từ riêng": [1, 0, 1], "Viết tên cơ quan, tổ chức": [0, 1, 0],
      "Động từ": [1, 1, 1], "Tính từ": [1, 1, 1], "Biện pháp nhân hoá": [0, 1, 1], "Dấu gạch ngang": [1, 1, 0], "Sử dụng từ điển": [1, 0, 0],
      "Chính tả": [1, 0, 0], "Viết": [0, 0, 1] } } },
  /* Ngân hàng Tiếng Anh 4 cuối kì I (Phiên N3b): kho câu = 26 câu riêng trong file (2 đoạn đọc) + 50 câu của 2 đề cố định ở trên,
     câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu, mỗi Unit 2–3 câu và Reading
     3 câu như đề cố định; ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó rút. */
  { id: "ta4-ck1-ngau-nhien", title: "Tiếng Anh 4 · Cuối kì I · Đề ngẫu nhiên", grade: 4, subject: "Tiếng Anh", minutes: 35, n: 25, file: "4-ta.js",
    pool: { from: ["ta4-ck1-de1", "ta4-ck1-de2"], matrix: {
      "Unit 1 · My Friends": [1, 1, 0], "Unit 2 · Time and Daily Routines": [1, 1, 1], "Unit 3 · My Week": [1, 0, 1],
      "Unit 4 · My Birthday Party": [1, 1, 1], "Unit 5 · Things We Can Do": [1, 1, 0], "Unit 6 · Our School Facilities": [1, 1, 0],
      "Unit 7 · Our Timetables": [0, 1, 1], "Unit 8 · My Favourite Subjects": [1, 1, 0], "Unit 9 · Our Sports Day": [1, 0, 1],
      "Unit 10 · Our Summer Holidays": [1, 0, 1], "Reading": [1, 1, 1] } } },
  /* Ngân hàng Tin học và Công nghệ 4 cuối kì I (Phiên N3b): kho câu = 50 câu của 2 đề cố định ở trên (không có câu riêng),
     câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu, 13 câu Tin học và 12 câu
     Công nghệ như đề cố định; đề 2 chia đúng theo ma trận và bù câu Vận dụng đề 1 còn thiếu, nên ô nào cũng đủ câu. */
  { id: "tincn4-ck1-ngau-nhien", title: "Tin học và Công nghệ 4 · Cuối kì I · Đề ngẫu nhiên", grade: 4, subject: "Tin học và Công nghệ", minutes: 35, n: 25, file: "4-tincn.js",
    pool: { from: ["tincn4-ck1-de1", "tincn4-ck1-de2"], matrix: {
      "Tin học · Phần cứng và phần mềm": [1, 1, 0], "Tin học · Gõ bàn phím đúng cách": [1, 0, 1], "Tin học · Thông tin trên trang web": [1, 0, 1],
      "Tin học · Tìm kiếm thông tin trên Internet": [0, 0, 1], "Tin học · Tệp và thư mục": [1, 1, 0], "Tin học · Dùng phần mềm khi được phép": [0, 1, 0],
      "Tin học · Bài trình chiếu": [1, 1, 1], "Công nghệ · Lợi ích của hoa, cây cảnh": [1, 1, 0], "Công nghệ · Một số loại hoa, cây cảnh": [2, 0, 0],
      "Công nghệ · Vật liệu và dụng cụ trồng cây trong chậu": [1, 0, 1], "Công nghệ · Gieo hạt hoa, cây cảnh trong chậu": [0, 1, 1],
      "Công nghệ · Trồng hoa, cây cảnh trong chậu": [1, 1, 0], "Công nghệ · Chăm sóc hoa, cây cảnh trong chậu": [0, 1, 1] } } },
  /* Ngân hàng Khoa học 4 cuối kì I (Phiên N3): kho câu = 27 câu riêng trong file + 50 câu của 2 đề cố định ở trên, câu nào
     cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu; chủ đề Chất 12 câu (nước 7, không khí 3,
     gió và bão 2), Năng lượng 9 câu, Thực vật và động vật 4 câu; ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó rút. */
  { id: "khoahoc4-ck1-ngau-nhien", title: "Khoa học 4 · Cuối kì I · Đề ngẫu nhiên", grade: 4, subject: "Khoa học", minutes: 35, n: 25, file: "4-khoahoc.js",
    pool: { from: ["khoahoc4-ck1-de1", "khoahoc4-ck1-de2"], matrix: {
      "Tính chất của nước": [1, 1, 0], "Sự chuyển thể của nước": [1, 1, 1], "Bảo vệ nguồn nước": [1, 0, 1], "Không khí": [1, 1, 0],
      "Ô nhiễm không khí": [1, 0, 0], "Gió, bão và phòng chống bão": [1, 0, 1], "Ánh sáng": [1, 1, 1], "Âm thanh": [1, 1, 1],
      "Nhiệt độ và sự truyền nhiệt": [1, 1, 1], "Thực vật cần gì để sống": [1, 1, 0], "Động vật cần gì để sống": [0, 1, 0],
      "Chăm sóc cây trồng, vật nuôi": [0, 0, 1] } } },
  /* Ngân hàng Lịch sử và Địa lí 4 cuối kì I (Phiên N3): kho câu = 28 câu riêng trong file + 50 câu của 2 đề cố định ở trên,
     câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu; Bài 1 và Bài 4–10 mỗi bài
     2 câu, Bài 11, 12, 13 (lịch sử) mỗi bài 3 câu, một câu mỗi mức; ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó rút. */
  { id: "lsdl4-ck1-ngau-nhien", title: "Lịch sử và Địa lí 4 · Cuối kì I · Đề ngẫu nhiên", grade: 4, subject: "Lịch sử và Địa lí", minutes: 35, n: 25, file: "4-lsdl.js",
    pool: { from: ["lsdl4-ck1-de1", "lsdl4-ck1-de2"], matrix: {
      "Phương tiện học tập": [1, 0, 1], "Thiên nhiên Trung du và miền núi phía Bắc": [1, 1, 0],
      "Dân cư, sản xuất ở Trung du và miền núi phía Bắc": [1, 1, 0], "Văn hoá vùng Trung du và miền núi phía Bắc": [1, 0, 1],
      "Đền Hùng và lễ giỗ Tổ Hùng Vương": [1, 0, 1], "Thiên nhiên Đồng bằng Bắc Bộ": [1, 1, 0],
      "Dân cư, sản xuất ở Đồng bằng Bắc Bộ": [0, 1, 1], "Văn hoá vùng Đồng bằng Bắc Bộ": [1, 1, 0],
      "Sông Hồng và văn minh sông Hồng": [1, 1, 1], "Thăng Long – Hà Nội": [1, 1, 1], "Văn Miếu – Quốc Tử Giám": [1, 1, 1] } } },
  /* Ngân hàng Toán 6 cuối kì I (Phiên N4): kho câu = 58 câu riêng trong file + 50 câu của 2 đề cố định ở trên, câu nào cũng
     có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì lớp 6 (Công văn 7991); mỗi
     chủ đề số học 3 câu, Hình phẳng 2 câu Biết, Chu vi, diện tích 3 câu, Tính đối xứng 2 câu; ô (chủ đề, mức) nào cũng có ít nhất
     gấp đôi số câu ô đó rút. Câu tự luận chỉ ở hai ô Vận dụng (ƯCLN và BCNN; Chu vi, diện tích): mỗi lần rút nhiều nhất 2 câu. */
  { id: "toan6-ck1-ngau-nhien", title: "Toán 6 · Cuối kì I · Đề ngẫu nhiên", grade: 6, subject: "Toán", minutes: 45, n: 25, file: "6-toan.js",
    pool: { from: ["toan6-ck1-de1", "toan6-ck1-de2"], matrix: {
      "Tập hợp các số tự nhiên": [1, 1, 1], "Lũy thừa, thứ tự thực hiện phép tính": [1, 1, 1], "Tính chia hết, số nguyên tố": [1, 1, 1],
      "ƯCLN và BCNN": [1, 1, 1], "Số nguyên": [1, 1, 1], "Nhân, chia số nguyên": [1, 1, 1], "Hình phẳng": [2, 0, 0],
      "Chu vi, diện tích": [1, 1, 1], "Tính đối xứng": [1, 1, 0] } } },
  /* Ngân hàng Ngữ văn 6 cuối kì I (Phiên N4b): kho câu = 33 câu riêng trong file (5 đoạn đọc, 5 câu Viết) + 50 câu của 2 đề cố
     định ở trên, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%): năm bài đọc (Bài 1–5)
     mỗi bài một câu mỗi mức (câu của đoạn đọc tự viết cùng thể loại và câu của đề cố định), 9 câu Tiếng Việt (nhận ra biện pháp
     tu từ 3 câu; từ đơn và từ phức 2; dấu câu, nghĩa của từ, cụm từ, từ đồng âm và từ đa nghĩa mỗi chủ đề 1), 1 câu Viết đoạn văn
     tự chấm; ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó rút. Câu tự luận chỉ ở ô Viết: mỗi lần rút đúng 1 câu. */
  { id: "van6-ck1-ngau-nhien", title: "Ngữ văn 6 · Cuối kì I · Đề ngẫu nhiên", grade: 6, subject: "Ngữ văn", minutes: 45, n: 25, file: "6-van.js",
    pool: { from: ["van6-ck1-de1", "van6-ck1-de2"], matrix: {
      "Tôi và các bạn": [1, 1, 1], "Gõ cửa trái tim": [1, 1, 1], "Yêu thương và chia sẻ": [1, 1, 1], "Quê hương yêu dấu": [1, 1, 1],
      "Những nẻo đường xứ sở": [1, 1, 1], "Dấu câu": [0, 1, 0], "Từ đơn và từ phức": [1, 0, 1], "Nghĩa của từ": [0, 1, 0],
      "Biện pháp tu từ": [3, 0, 0], "Cụm danh từ, cụm động từ, cụm tính từ": [1, 0, 0], "Từ đồng âm và từ đa nghĩa": [0, 1, 0],
      "Viết": [0, 0, 1] } } },
  /* Ngân hàng Tiếng Anh 6 cuối kì I (Phiên N5): kho câu = 26 câu riêng trong file (2 đoạn đọc) + 50 câu của 2 đề cố định ở trên,
     câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%): mỗi chủ đề bằng số câu của đề 1
     (Pronunciation 2, Unit 1–6 mỗi Unit 3–4, Reading 3); ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó rút. */
  { id: "ta6-ck1-ngau-nhien", title: "Tiếng Anh 6 · Cuối kì I · Đề ngẫu nhiên", grade: 6, subject: "Tiếng Anh", minutes: 45, n: 25, file: "6-ta.js",
    pool: { from: ["ta6-ck1-de1", "ta6-ck1-de2"], matrix: {
      "Pronunciation": [2, 0, 0], "Unit 1 · My New School": [1, 1, 1], "Unit 2 · My House": [2, 1, 1], "Unit 3 · My Friends": [1, 2, 1],
      "Unit 4 · My Neighbourhood": [1, 1, 1], "Unit 5 · Natural Wonders of Viet Nam": [1, 1, 1], "Unit 6 · Our Tet Holiday": [1, 1, 1],
      "Reading": [1, 1, 1] } } },
  /* Ngân hàng KHTN 6 cuối kì I (Phiên N5): kho câu = 26 câu riêng trong file + 50 câu của 2 đề cố định ở trên, câu nào cũng có
     mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì lớp 6 (Công văn 7991): đủ 11 chủ
     đề như đề 1, mỗi chủ đề 1–3 câu; ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó rút. */
  { id: "khtn6-ck1-ngau-nhien", title: "KHTN 6 · Cuối kì I · Đề ngẫu nhiên", grade: 6, subject: "KHTN", minutes: 45, n: 25, file: "6-khtn.js",
    pool: { from: ["khtn6-ck1-de1", "khtn6-ck1-de2"], matrix: {
      "Giới thiệu về Khoa học tự nhiên": [1, 1, 0], "An toàn trong phòng thực hành": [1, 0, 1], "Kính lúp, kính hiển vi": [1, 0, 1],
      "Đo chiều dài, khối lượng, thời gian": [1, 1, 1], "Đo nhiệt độ": [1, 0, 1], "Chất và sự chuyển thể": [1, 1, 1],
      "Oxygen và không khí": [1, 1, 0], "Vật liệu, nhiên liệu, lương thực – thực phẩm": [1, 1, 0], "Hỗn hợp và tách chất": [1, 1, 1],
      "Tế bào": [1, 1, 1], "Từ tế bào đến cơ thể": [0, 1, 0] } } },
  /* Ngân hàng Lịch sử và Địa lí 6 cuối kì I (Phiên N6): kho câu = 10 câu riêng trong file + 50 câu của 2 đề cố định ở trên, câu
     nào cũng có mức độ. Phạm vi: Lịch sử Bài 1–10 như đề 1; Địa lí Bài 1–15 (đề 1 chỉ có Bài 1–9; Bài 10–15 ở Đề 2 và câu riêng,
     6 chủ đề mới theo tên bài rút gọn). Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì lớp 6
     (Công văn 7991): 12 câu Lịch sử (mỗi bài 1–2 câu), 13 câu Địa lí (Bài 1–9 6 câu, Bài 10–15 7 câu); đề 2 chia đúng theo ma
     trận, câu riêng thêm vào các ô của 6 chủ đề mới, nên ô nào cũng đủ câu, ô của chủ đề mới có ít nhất gấp đôi số câu ô đó rút. */
  { id: "lsdl6-ck1-ngau-nhien", title: "Lịch sử và Địa lí 6 · Cuối kì I · Đề ngẫu nhiên", grade: 6, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "6-lsdl.js",
    pool: { from: ["lsdl6-ck1-de1", "lsdl6-ck1-de2"], matrix: {
      "Tư liệu lịch sử": [1, 1, 0], "Thời gian trong lịch sử": [0, 1, 1], "Thời kì nguyên thủy": [1, 1, 0], "Ai Cập và Lưỡng Hà cổ đại": [1, 1, 0],
      "Ấn Độ cổ đại": [1, 0, 0], "Trung Quốc cổ đại": [1, 0, 0], "Hy Lạp và La Mã cổ đại": [1, 0, 1],
      "Kinh tuyến, vĩ tuyến, tọa độ địa lí": [1, 1, 0], "Bản đồ": [0, 0, 1], "Trái Đất trong hệ Mặt Trời": [1, 0, 0], "Chuyển động của Trái Đất": [0, 1, 1],
      "Cấu tạo của Trái Đất": [1, 0, 0], "Nội sinh và ngoại sinh": [0, 1, 0], "Núi lửa và động đất": [0, 0, 1], "Địa hình và khoáng sản": [1, 0, 1],
      "Lược đồ địa hình, lát cắt": [0, 0, 1], "Lớp vỏ khí, khí áp và gió": [0, 1, 0] } } },
  /* Ngân hàng GDCD 6 cuối kì I (Phiên N6): kho câu = 50 câu của 2 đề cố định ở trên (không có câu riêng), câu nào cũng có mức
     độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì lớp 6 (Công văn 7991): Bài 1–5 mỗi
     bài 4 câu, Bài 6 Tự nhận thức bản thân 5 câu, bài nào cũng có câu xử lí tình huống; đề 2 chia đúng theo ma trận và bù câu Vận
     dụng đề 1 còn thiếu, nên ô nào cũng đủ câu. */
  { id: "gdcd6-ck1-ngau-nhien", title: "GDCD 6 · Cuối kì I · Đề ngẫu nhiên", grade: 6, subject: "GDCD", minutes: 35, n: 25, file: "6-gdcd.js",
    pool: { from: ["gdcd6-ck1-de1", "gdcd6-ck1-de2"], matrix: {
      "Truyền thống gia đình, dòng họ": [2, 1, 1], "Yêu thương con người": [2, 1, 1], "Siêng năng, kiên trì": [2, 1, 1],
      "Tôn trọng sự thật": [1, 2, 1], "Tự lập": [2, 1, 1], "Tự nhận thức bản thân": [1, 2, 2] } } },
  /* Ngân hàng Tin học 6 cuối kì I (Phiên N6): kho câu = 50 câu của 2 đề cố định ở trên (không có câu riêng), câu nào cũng có
     mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì lớp 6 (Công văn 7991): đủ 9 chủ
     đề như đề 1 (Bài 1–9), mỗi chủ đề 2–4 câu; đề 2 chia đúng theo ma trận và bù câu Vận dụng đề 1 còn thiếu, nên ô nào cũng đủ
     câu. Ô “Tìm kiếm thông tin trên Internet” chỉ rút câu Vận dụng (chọn từ khóa, nguồn tin, các bước tìm kiếm): các bước tìm
     kiếm ghi sẵn cách dùng máy tìm kiếm, nên câu Biết “Máy tìm kiếm là” của đề 1 không được rút cùng. */
  { id: "tin6-ck1-ngau-nhien", title: "Tin học 6 · Cuối kì I · Đề ngẫu nhiên", grade: 6, subject: "Tin học", minutes: 35, n: 25, file: "6-tin.js",
    pool: { from: ["tin6-ck1-de1", "tin6-ck1-de2"], matrix: {
      "Thông tin và dữ liệu": [1, 1, 0], "Xử lí thông tin": [2, 0, 0], "Thông tin trong máy tính": [1, 1, 2], "Mạng máy tính": [1, 2, 0],
      "Internet": [1, 1, 0], "Mạng thông tin toàn cầu": [2, 0, 1], "Tìm kiếm thông tin trên Internet": [0, 0, 2], "Thư điện tử": [1, 2, 1],
      "An toàn thông tin trên Internet": [1, 1, 1] } } },
  /* Ngân hàng Công nghệ 6 cuối kì I (Phiên N6): kho câu = 50 câu của 2 đề cố định ở trên (không có câu riêng), câu nào cũng có
     mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì lớp 6 (Công văn 7991): Chương I
     Nhà ở 12 câu (Bài 1–3; chủ đề theo tên bài của sách in năm 2026, Phiên DS7: tiết kiệm năng lượng là mục III của Bài 3 Ngôi
     nhà thông minh), Chương II 13 câu (Bài 4–6, Bài 5 bảo quản và chế biến thực phẩm 6 câu); đề 2 chia đúng theo ma trận
     và bù câu Vận dụng đề 1 còn thiếu, nên ô nào cũng đủ câu. Ô Biết của “Thực phẩm và dinh dưỡng” rút 1 câu, nên câu nối nhóm
     thực phẩm – chất dinh dưỡng của đề 2 không cùng một đề với các câu về nhóm thực phẩm của đề 1. */
  { id: "congnghe6-ck1-ngau-nhien", title: "Công nghệ 6 · Cuối kì I · Đề ngẫu nhiên", grade: 6, subject: "Công nghệ", minutes: 35, n: 25, file: "6-congnghe.js",
    pool: { from: ["congnghe6-ck1-de1", "congnghe6-ck1-de2"], matrix: {
      "Khái quát về nhà ở": [2, 1, 1], "Xây dựng nhà ở": [2, 1, 0], "Ngôi nhà thông minh": [2, 1, 2],
      "Thực phẩm và dinh dưỡng": [1, 2, 1], "Bảo quản và chế biến thực phẩm": [3, 2, 1], "Bữa ăn kết nối yêu thương": [0, 1, 2] } } },
  /* Ngân hàng Toán 6 giữa kì I (Phiên N24): kho câu = 51 câu riêng trong file + 50 câu của 2 đề cố định ở trên (Đề 1 chỉ có
     Chương I–II), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì
     lớp 6 (Công văn 7991): Chương I 8 câu, Chương II 8 câu, Chương III 9 câu; ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô
     đó rút. Câu tự luận chỉ ở hai ô Vận dụng (ƯCLN và BCNN; Nhân, chia số nguyên): mỗi lần rút nhiều nhất 2 câu. */
  { id: "toan6-gk1-ngau-nhien", title: "Toán 6 · Giữa kì I · Đề ngẫu nhiên", grade: 6, subject: "Toán", minutes: 45, n: 25, file: "6-toan.js",
    pool: { from: ["toan6-gk1-de1", "toan6-gk1-de2"], matrix: {
      "Tập hợp các số tự nhiên": [2, 1, 1], "Lũy thừa, thứ tự thực hiện phép tính": [2, 1, 1], "Tính chia hết, số nguyên tố": [2, 1, 1],
      "ƯCLN và BCNN": [1, 2, 1], "Số nguyên": [2, 1, 2], "Nhân, chia số nguyên": [1, 2, 1] } } },
  /* Ngân hàng Ngữ văn 6 giữa kì I (Phiên N24b): kho câu = 25 câu riêng trong file (3 đoạn đọc, 3 câu Viết) + 50 câu của 2 đề cố
     định ở trên (mỗi đề 3 đoạn đọc, 1 câu Viết), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% –
     28%): ba bài đọc (Bài 1–3) mỗi bài một đoạn 4 câu [1, 1, 2]; 12 câu Tiếng Việt chỉ mức Biết, Hiểu (từ đơn và từ phức 3, nghĩa
     của từ 2, biện pháp tu từ 4, cụm từ 2, dấu câu 1); 1 câu Viết đoạn văn tự chấm. Hai đề cố định đúng ma trận, câu riêng thêm vào
     mọi ô, nên ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó rút. Câu tự luận chỉ ở ô Viết: mỗi lần rút đúng 1 câu. */
  { id: "van6-gk1-ngau-nhien", title: "Ngữ văn 6 · Giữa kì I · Đề ngẫu nhiên", grade: 6, subject: "Ngữ văn", minutes: 45, n: 25, file: "6-van.js",
    pool: { from: ["van6-gk1-de1", "van6-gk1-de2"], matrix: {
      "Tôi và các bạn": [1, 1, 2], "Gõ cửa trái tim": [1, 1, 2], "Yêu thương và chia sẻ": [1, 1, 2],
      "Từ đơn và từ phức": [2, 1, 0], "Nghĩa của từ": [0, 2, 0], "Biện pháp tu từ": [3, 1, 0],
      "Cụm danh từ, cụm động từ, cụm tính từ": [2, 0, 0], "Dấu câu": [0, 1, 0], "Viết": [0, 0, 1] } } },
  /* Ngân hàng GDCD 6 giữa kì I (Phiên N24b): kho câu = 50 câu của 2 đề cố định ở trên (không có câu riêng), câu nào cũng có mức
     độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì lớp 6 (Công văn 7991): Bài 1–3 mỗi
     bài 7 câu, Bài 4 Tôn trọng sự thật 4 câu như đề 1; đề 2 chia đúng theo ma trận và bù câu Vận dụng đề 1 còn thiếu, nên ô nào
     cũng đủ câu. */
  { id: "gdcd6-gk1-ngau-nhien", title: "GDCD 6 · Giữa kì I · Đề ngẫu nhiên", grade: 6, subject: "GDCD", minutes: 35, n: 25, file: "6-gdcd.js",
    pool: { from: ["gdcd6-gk1-de1", "gdcd6-gk1-de2"], matrix: {
      "Truyền thống gia đình, dòng họ": [3, 2, 2], "Yêu thương con người": [3, 2, 2], "Siêng năng, kiên trì": [3, 2, 2],
      "Tôn trọng sự thật": [1, 2, 1] } } },
  /* Ngân hàng KHTN 6 giữa kì I (Phiên N25): kho câu = 27 câu riêng trong file + 50 câu của 2 đề cố định ở trên, câu nào cũng có
     mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì lớp 6 (Công văn 7991): đủ 9 chủ
     đề của Bài 1–16 (chữ chủ đề như khtn6-ck1), mỗi chủ đề 2–4 câu; hai đề cố định đều chia đúng theo ma trận, nên ô (chủ đề, mức)
     nào cũng có ít nhất gấp đôi số câu ô đó rút. */
  { id: "khtn6-gk1-ngau-nhien", title: "KHTN 6 · Giữa kì I · Đề ngẫu nhiên", grade: 6, subject: "KHTN", minutes: 45, n: 25, file: "6-khtn.js",
    pool: { from: ["khtn6-gk1-de1", "khtn6-gk1-de2"], matrix: {
      "Giới thiệu về Khoa học tự nhiên": [1, 1, 0], "An toàn trong phòng thực hành": [1, 1, 1], "Kính lúp, kính hiển vi": [1, 0, 1],
      "Đo chiều dài, khối lượng, thời gian": [2, 1, 1], "Đo nhiệt độ": [1, 1, 1], "Chất và sự chuyển thể": [1, 1, 1],
      "Oxygen và không khí": [1, 1, 1], "Vật liệu, nhiên liệu, lương thực – thực phẩm": [1, 1, 1], "Hỗn hợp và tách chất": [1, 1, 0] } } },
  /* Ngân hàng Công nghệ 6 giữa kì I (Phiên N25): kho câu = 50 câu của 2 đề cố định ở trên (không có câu riêng), câu nào cũng có
     mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì lớp 6 (Công văn 7991): chủ đề theo
     tên bài của sách in năm 2026 (Phiên DS7): Bài 1 Khái quát về nhà ở 6 câu, Bài 2 Xây dựng nhà ở 7 câu, Bài 3 Ngôi nhà thông
     minh 12 câu (cả mục III Sử dụng năng lượng tiết kiệm và hiệu quả trong gia đình) như đề 1; đề 2 chia đúng theo ma trận và bù câu Vận dụng đề 1 còn thiếu (đề 1 có 11 – 11 – 3), nên ô nào cũng đủ câu. */
  { id: "congnghe6-gk1-ngau-nhien", title: "Công nghệ 6 · Giữa kì I · Đề ngẫu nhiên", grade: 6, subject: "Công nghệ", minutes: 35, n: 25, file: "6-congnghe.js",
    pool: { from: ["congnghe6-gk1-de1", "congnghe6-gk1-de2"], matrix: {
      "Khái quát về nhà ở": [3, 2, 1], "Xây dựng nhà ở": [3, 2, 2], "Ngôi nhà thông minh": [4, 4, 4] } } },
  /* Ngân hàng Tiếng Anh 6 giữa kì I (Phiên N25b): kho câu = 28 câu riêng trong file + 50 câu của 2 đề cố định ở trên, câu nào
     cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì lớp 6 (Công văn 7991):
     số câu từng chủ đề như đề 1 (Pronunciation 3, mỗi Unit 6, Reading 4); đề 1 ít câu Vận dụng (12 – 10 – 3) nên Đề 2 chia đúng
     ma trận và câu riêng bù các ô Vận dụng; ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó rút. Reading rút theo đoạn
     (K4): bốn đoạn đọc của kho đều 4 câu mức 1-2-2-3, đúng ô [1, 2, 1]. */
  { id: "ta6-gk1-ngau-nhien", title: "Tiếng Anh 6 · Giữa kì I · Đề ngẫu nhiên", grade: 6, subject: "Tiếng Anh", minutes: 45, n: 25, file: "6-ta.js",
    pool: { from: ["ta6-gk1-de1", "ta6-gk1-de2"], matrix: {
      "Pronunciation": [2, 1, 0], "Unit 1 · My New School": [2, 2, 2], "Unit 2 · My House": [3, 1, 2], "Unit 3 · My Friends": [2, 2, 2],
      "Reading": [1, 2, 1] } } },
  /* Ngân hàng Lịch sử và Địa lí 6 giữa kì I (Phiên N25b): kho câu = 50 câu của 2 đề cố định ở trên (không có câu riêng), câu nào
     cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì lớp 6 (Công văn 7991):
     12 chủ đề với số câu như đề 1 (Lịch sử Bài 1–6: 13 câu; Địa lí Bài 1–6: 12 câu); đề 1 có 14 – 8 – 3 nên Đề 2 chia đúng ma trận
     và bù các ô Vận dụng, nên ô nào cũng đủ câu. */
  { id: "lsdl6-gk1-ngau-nhien", title: "Lịch sử và Địa lí 6 · Giữa kì I · Đề ngẫu nhiên", grade: 6, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "6-lsdl.js",
    pool: { from: ["lsdl6-gk1-de1", "lsdl6-gk1-de2"], matrix: {
      "Lịch sử và cuộc sống": [1, 1, 0], "Tư liệu lịch sử": [1, 1, 1], "Thời gian trong lịch sử": [1, 1, 1], "Nguồn gốc loài người": [1, 0, 1],
      "Xã hội nguyên thủy": [1, 0, 1], "Chuyển biến của xã hội nguyên thủy": [0, 1, 0],
      "Kinh tuyến, vĩ tuyến, tọa độ địa lí": [1, 1, 1], "Kí hiệu và chú giải bản đồ": [0, 1, 0], "Phương hướng và tỉ lệ bản đồ": [1, 1, 1],
      "Lược đồ trí nhớ": [0, 1, 0], "Trái Đất trong hệ Mặt Trời": [2, 0, 0], "Chuyển động tự quay của Trái Đất": [1, 0, 1] } } },
  /* Ngân hàng Tin học 6 giữa kì I (Phiên N25b): kho câu = 50 câu của 2 đề cố định ở trên (không có câu riêng), câu nào cũng có
     mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì lớp 6 (Công văn 7991): 5 chủ đề
     với số câu như đề 1 (Bài 1: 5, Bài 2: 6, Bài 3: 6, Bài 4: 4, Bài 5: 4); đề 1 có 14 – 10 – 1 nên Đề 2 chia đúng ma trận và bù
     các ô Vận dụng, nên ô nào cũng đủ câu. */
  { id: "tin6-gk1-ngau-nhien", title: "Tin học 6 · Giữa kì I · Đề ngẫu nhiên", grade: 6, subject: "Tin học", minutes: 35, n: 25, file: "6-tin.js",
    pool: { from: ["tin6-gk1-de1", "tin6-gk1-de2"], matrix: {
      "Thông tin và dữ liệu": [2, 2, 1], "Xử lí thông tin": [2, 2, 2], "Thông tin trong máy tính": [2, 2, 2], "Mạng máy tính": [2, 1, 1],
      "Internet": [2, 1, 1] } } },
  /* Ngân hàng Toán 4 giữa kì I (Phiên N23): kho câu = 51 câu riêng trong file + 50 câu của 2 đề cố định ở trên, câu nào cũng có
     mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu (40% – 32% – 28%) trên chín chủ đề của toan4-ck1
     có trong Bài 1–19 (chưa có tính chất phép cộng, tổng và hiệu, đường thẳng vuông góc, song song, hình bình hành, hình thoi):
     Số có nhiều chữ số 6 câu, Biểu thức chứa chữ, Góc và đo góc, Đơn vị đo mỗi chủ đề 3 câu, các chủ đề còn lại 2 câu. Hai đề cố
     định chia đúng theo ma trận, câu riêng ở ô nào cũng ít nhất gấp đôi số câu ô đó rút, nên ô (chủ đề, mức) nào cũng có ít nhất gấp
     bốn số câu ô đó rút và học sinh đã làm hai đề cố định vẫn gặp toàn câu mới. Ba câu tự luận chỉ ở ô Vận dụng của “Giải bài toán
     có ba bước tính” (rút 2 câu): mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "toan4-gk1-ngau-nhien", title: "Toán 4 · Giữa kì I · Đề ngẫu nhiên", grade: 4, subject: "Toán", minutes: 40, n: 25, file: "4-toan.js",
    pool: { from: ["toan4-gk1-de1", "toan4-gk1-de2"], matrix: {
      "Số có nhiều chữ số": [3, 2, 1], "Làm tròn số": [1, 1, 0], "Số chẵn, số lẻ": [1, 1, 0], "Biểu thức chứa chữ": [1, 1, 1],
      "Phép cộng, phép trừ": [1, 1, 0], "Phép nhân, phép chia": [1, 0, 1], "Giải bài toán có ba bước tính": [0, 0, 2],
      "Góc và đo góc": [1, 1, 1], "Đơn vị đo": [1, 1, 1] } } },
  /* Ngân hàng Tiếng Việt 4 giữa kì I (Phiên N23b): kho câu = 52 câu riêng trong file (4 đoạn đọc, 4 câu Viết) + 50 câu của 2 đề
     cố định ở trên, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu, trong đó 7 câu
     Đọc hiểu, 1 câu Viết (tự chấm, nên cả ba đề 40 phút). 17 câu Luyện từ và câu, Chính tả trên các chủ đề của tv4-ck1 có trong
     Bài 1–16, chia theo số bài trong sách: danh từ 4 (Bài 1, 5), danh từ chung, danh từ riêng 3 (Bài 3), viết tên cơ quan, tổ
     chức 2 (Bài 7), động từ 5 (Bài 9, 11, 13), từ điển 2 (Bài 15), chính tả 1. Hai đề cố định chia đúng theo ma trận, câu riêng
     ở ô nào cũng gấp đôi số câu ô đó rút, nên học sinh đã làm hai đề cố định vẫn gặp toàn câu mới. */
  { id: "tv4-gk1-ngau-nhien", title: "Tiếng Việt 4 · Giữa kì I · Đề ngẫu nhiên", grade: 4, subject: "Tiếng Việt", minutes: 40, n: 25, file: "4-tv.js",
    pool: { from: ["tv4-gk1-de1", "tv4-gk1-de2"], matrix: {
      "Đọc hiểu": [3, 2, 2], "Danh từ": [2, 1, 1], "Danh từ chung, danh từ riêng": [1, 1, 1], "Viết tên cơ quan, tổ chức": [1, 1, 0],
      "Động từ": [1, 2, 2], "Sử dụng từ điển": [1, 1, 0], "Chính tả": [1, 0, 0], "Viết": [0, 0, 1] } } },
  /* Ngân hàng Toán 6 giữa kì II (Phiên N8): kho câu = 58 câu riêng trong file + 50 câu của 2 đề cố định ở trên, câu nào cũng có
     mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%) theo khung đề định kì lớp 6 (Công văn 7991) trên 11 chủ
     đề theo tên bài: phân số 11 câu (Bài 23–27), số thập phân 8 câu (Bài 28–31), hình học 6 câu (Bài 32–35). Hai đề cố định chia
     đúng theo ma trận, câu riêng ở ô nào cũng ít nhất bằng số câu ô đó rút, nên ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu
     ô đó rút và học sinh đã làm một đề cố định vẫn gặp câu mới. Bốn câu tự luận chỉ ở hai ô Vận dụng rút 1 câu (Hai bài toán về
     phân số; Đoạn thẳng, trung điểm): mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "toan6-gk2-ngau-nhien", title: "Toán 6 · Giữa kì II · Đề ngẫu nhiên", grade: 6, subject: "Toán", minutes: 45, n: 25, file: "6-toan.js",
    pool: { from: ["toan6-gk2-de1", "toan6-gk2-de2"], matrix: {
      "Phân số bằng nhau": [1, 1, 0], "So sánh phân số, hỗn số": [1, 1, 0], "Cộng, trừ phân số": [1, 1, 1], "Nhân, chia phân số": [1, 0, 1],
      "Hai bài toán về phân số": [0, 1, 1], "Số thập phân": [1, 1, 0], "Tính toán với số thập phân": [1, 0, 1], "Làm tròn và ước lượng": [1, 1, 0],
      "Tỉ số, tỉ số phần trăm": [0, 1, 1], "Điểm, đường thẳng, tia": [2, 0, 1], "Đoạn thẳng, trung điểm": [1, 1, 1] } } },
  /* Ngân hàng Ngữ văn 6 giữa kì II (Phiên N9): kho câu = 31 câu riêng trong file (4 đoạn đọc, 3 câu Viết) + 50 câu của 2 đề cố
     định ở trên (mỗi đề 2 đoạn đọc, 6 câu lẻ về thể loại và văn bản trong sách, 1 câu Viết), câu nào cũng có mức độ. Ma trận [Biết,
     Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%): hai bài đọc (Bài 6, 7) mỗi bài 7 câu [2, 2, 3], rút theo đoạn (đoạn 4 câu mức
     1-2-3-3 hoặc 3 câu mức 1-2-3, nên lần nào cũng lấy hai đoạn, đúng mức; câu lẻ được rút khi đã làm hết các đoạn); 10 câu Tiếng
     Việt chỉ mức Biết, Hiểu (nghĩa của từ 3, từ ghép và từ láy 2, cụm từ 2, biện pháp tu từ 2, dấu chấm phẩy 1); 1 câu Viết tự chấm.
     Hai đề cố định đúng ma trận, câu riêng thêm vào mọi ô, nên ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó rút. Câu tự
     luận chỉ ở ô Viết: mỗi lần rút đúng 1 câu. */
  { id: "van6-gk2-ngau-nhien", title: "Ngữ văn 6 · Giữa kì II · Đề ngẫu nhiên", grade: 6, subject: "Ngữ văn", minutes: 45, n: 25, file: "6-van.js",
    pool: { from: ["van6-gk2-de1", "van6-gk2-de2"], matrix: {
      "Chuyện kể về những người anh hùng": [2, 2, 3], "Thế giới cổ tích": [2, 2, 3],
      "Nghĩa của từ": [1, 2, 0], "Từ đơn và từ phức": [2, 0, 0], "Cụm danh từ, cụm động từ, cụm tính từ": [2, 0, 0],
      "Biện pháp tu từ": [1, 1, 0], "Dấu câu": [0, 1, 0], "Viết": [0, 0, 1] } } },
  /* Ngân hàng Tiếng Anh 6 giữa kì II (Phiên N10): kho câu = 25 câu riêng trong file (hai đoạn đọc) + 50 câu của 2 đề cố định ở trên,
     câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì lớp 6 (Công văn
     7991): số câu từng chủ đề như kho giữa kì I (Pronunciation 3, mỗi Unit 6, Reading 4). Cả hai đề cố định chia đúng ma trận nên ô
     (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó rút; câu riêng chỉ ở ô có rút câu. Reading rút theo đoạn (K4): bốn đoạn
     đọc của kho đều 4 câu mức 1-2-2-3, đúng ô [1, 2, 1], nên lần rút nào cũng lấy trọn một đoạn. */
  { id: "ta6-gk2-ngau-nhien", title: "Tiếng Anh 6 · Giữa kì II · Đề ngẫu nhiên", grade: 6, subject: "Tiếng Anh", minutes: 45, n: 25, file: "6-ta.js",
    pool: { from: ["ta6-gk2-de1", "ta6-gk2-de2"], matrix: {
      "Pronunciation": [2, 1, 0], "Unit 7 · Television": [2, 2, 2], "Unit 8 · Sports and Games": [3, 1, 2], "Unit 9 · Cities of the World": [2, 2, 2],
      "Reading": [1, 2, 1] } } },
  /* Ngân hàng KHTN 6 giữa kì II (Phiên N11): kho câu = 26 câu riêng trong file + 50 câu của 2 đề cố định ở trên, câu nào cũng có
     mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì lớp 6 (Công văn 7991): 10 chủ đề
     theo nhóm bài của Chương VII (Bài 25–39), mỗi chủ đề 1–4 câu (Động vật nhiều nhất). Hai đề cố định chia đúng theo ma trận, câu
     riêng ở ô nào cũng ít nhất bằng số câu ô đó rút, nên ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó rút và học sinh
     đã làm một đề cố định vẫn gặp câu mới. */
  { id: "khtn6-gk2-ngau-nhien", title: "KHTN 6 · Giữa kì II · Đề ngẫu nhiên", grade: 6, subject: "KHTN", minutes: 45, n: 25, file: "6-khtn.js",
    pool: { from: ["khtn6-gk2-de1", "khtn6-gk2-de2"], matrix: {
      "Phân loại sinh vật": [1, 1, 0], "Khoá lưỡng phân": [0, 1, 1], "Vi khuẩn": [1, 1, 1], "Virus": [1, 1, 1], "Nguyên sinh vật": [1, 0, 1],
      "Nấm": [1, 1, 1], "Thực vật": [1, 1, 1], "Động vật": [2, 1, 1], "Đa dạng sinh học": [1, 1, 0],
      "Tìm hiểu sinh vật ngoài thiên nhiên": [1, 0, 0] } } },
  /* Ngân hàng Lịch sử và Địa lí 6 giữa kì II (Phiên N12): kho câu = 50 câu của 2 đề cố định ở trên (không có câu riêng), câu nào
     cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì lớp 6 (Công văn 7991):
     12 câu Lịch sử (Bài 11–15, chủ đề theo tên bài rút gọn, mỗi bài 2–3 câu), 13 câu Địa lí (Bài 16, 17 mỗi bài 3 câu; Bài 18, 20
     mỗi bài 2 câu; Bài 19, 21, 22 mỗi bài 1 câu). Hai đề cố định chia đúng theo ma trận, nên ô (chủ đề, mức) nào cũng có đúng 2 câu,
     gấp đôi số câu ô đó rút. */
  { id: "lsdl6-gk2-ngau-nhien", title: "Lịch sử và Địa lí 6 · Giữa kì II · Đề ngẫu nhiên", grade: 6, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "6-lsdl.js",
    pool: { from: ["lsdl6-gk2-de1", "lsdl6-gk2-de2"], matrix: {
      "Các quốc gia sơ kì ở Đông Nam Á": [1, 1, 0], "Các vương quốc phong kiến ở Đông Nam Á": [1, 1, 0], "Giao lưu văn hóa ở Đông Nam Á": [1, 0, 1],
      "Nhà nước Văn Lang, Âu Lạc": [1, 1, 1], "Thời Bắc thuộc": [1, 1, 1],
      "Nhiệt độ không khí, mây và mưa": [1, 1, 1], "Thời tiết, khí hậu và biến đổi khí hậu": [1, 1, 1], "Biểu đồ nhiệt độ, lượng mưa": [0, 1, 1],
      "Thủy quyển, vòng tuần hoàn của nước": [0, 1, 0], "Sông, hồ, nước ngầm, băng hà": [1, 0, 1], "Biển và đại dương": [1, 0, 0],
      "Lớp đất trên Trái Đất": [1, 0, 0] } } },
  /* Ngân hàng GDCD 6 giữa kì II (Phiên N12): kho câu = 50 câu của 2 đề cố định ở trên (không có câu riêng), câu nào cũng có mức
     độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì lớp 6 (Công văn 7991): Bài 7 Ứng phó
     với tình huống nguy hiểm 10 câu, Bài 8 Tiết kiệm 11 câu, Bài 9 Công dân nước Cộng hòa xã hội chủ nghĩa Việt Nam 4 câu (có trường
     chỉ kiểm tra đến Bài 8). Hai đề cố định chia đúng theo ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. */
  { id: "gdcd6-gk2-ngau-nhien", title: "GDCD 6 · Giữa kì II · Đề ngẫu nhiên", grade: 6, subject: "GDCD", minutes: 35, n: 25, file: "6-gdcd.js",
    pool: { from: ["gdcd6-gk2-de1", "gdcd6-gk2-de2"], matrix: {
      "Ứng phó với tình huống nguy hiểm": [4, 3, 3], "Tiết kiệm": [4, 4, 3], "Công dân nước Việt Nam": [2, 1, 1] } } },
  /* Ngân hàng Tin học 6 giữa kì II (Phiên N12b): kho câu = 50 câu của 2 đề cố định ở trên (không có câu riêng), câu nào cũng có
     mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì lớp 6 (Công văn 7991): Bài 9 An
     toàn thông tin trên Internet 3 câu (có trường dạy ở học kì I), Bài 10 Sơ đồ tư duy 5 câu, Bài 11 Định dạng văn bản 8 câu, Bài 12
     Trình bày thông tin ở dạng bảng 6 câu, Bài 13 Tìm kiếm và thay thế 3 câu. Hai đề cố định chia đúng theo ma trận, nên ô (chủ
     đề, mức) nào cũng có đúng 2 câu, gấp đôi số câu ô đó rút. */
  { id: "tin6-gk2-ngau-nhien", title: "Tin học 6 · Giữa kì II · Đề ngẫu nhiên", grade: 6, subject: "Tin học", minutes: 35, n: 25, file: "6-tin.js",
    pool: { from: ["tin6-gk2-de1", "tin6-gk2-de2"], matrix: {
      "An toàn thông tin trên Internet": [1, 1, 1], "Sơ đồ tư duy": [2, 2, 1], "Định dạng văn bản": [3, 3, 2],
      "Trình bày thông tin ở dạng bảng": [3, 1, 2], "Tìm kiếm và thay thế": [1, 1, 1] } } },
  /* Ngân hàng Công nghệ 6 giữa kì II (Phiên N12b): kho câu = 50 câu của 2 đề cố định ở trên (không có câu riêng), câu nào cũng có
     mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì lớp 6 (Công văn 7991): Bài 7
     Trang phục trong đời sống 7 câu, Bài 8 Sử dụng và bảo quản trang phục 8 câu, Bài 9 Thời trang 5 câu, Bài 10 Khái quát về đồ
     dùng điện trong gia đình 5 câu (có trường chỉ kiểm tra đến Bài 9). Hai đề cố định chia đúng theo ma trận, nên ô (chủ đề, mức)
     nào cũng có đúng 2 câu, gấp đôi số câu ô đó rút. */
  { id: "congnghe6-gk2-ngau-nhien", title: "Công nghệ 6 · Giữa kì II · Đề ngẫu nhiên", grade: 6, subject: "Công nghệ", minutes: 35, n: 25, file: "6-congnghe.js",
    pool: { from: ["congnghe6-gk2-de1", "congnghe6-gk2-de2"], matrix: {
      "Trang phục trong đời sống": [3, 2, 2], "Sử dụng và bảo quản trang phục": [3, 3, 2], "Thời trang": [2, 2, 1],
      "Đồ dùng điện trong gia đình": [2, 1, 2] } } },
  /* Ngân hàng Toán 4 giữa kì II (Phiên N7, nâng hai đề có sẵn lên ngân hàng): kho câu = 56 câu riêng trong file + 50 câu của
     2 đề cố định ở trên (giữ nguyên câu, chỉ thêm mức độ), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư
     27/2020: 10 – 8 – 7 câu trên 14 chủ đề như hai đề cố định; ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó rút.
     Ba câu tự luận ở ô Vận dụng của “Phép chia”, “Số trung bình cộng”, “Rút về đơn vị” (mỗi ô rút 1 câu). */
  { id: "toan4-gk2-ngau-nhien", title: "Toán 4 · Giữa kì II · Đề ngẫu nhiên", grade: 4, subject: "Toán", minutes: 40, n: 25, file: "4-toan.js",
    pool: { from: ["toan4-gk2-de1", "toan4-gk2-de2"], matrix: {
      "Phép nhân": [1, 1, 1], "Phép chia": [1, 1, 1], "Tính chất phép nhân": [1, 1, 1], "Nhân, chia với 10, 100, 1 000": [1, 0, 0],
      "Ước lượng": [0, 1, 0], "Số trung bình cộng": [1, 0, 1], "Rút về đơn vị": [0, 1, 1], "Dãy số liệu, biểu đồ cột": [1, 1, 1],
      "Số lần xuất hiện của sự kiện": [1, 0, 0], "Phân số": [1, 0, 0], "Tính chất cơ bản của phân số": [1, 0, 0], "Rút gọn phân số": [0, 1, 0],
      "Quy đồng mẫu số": [0, 1, 0], "So sánh phân số": [1, 0, 1] } } },
  /* Ngân hàng Tiếng Việt 4 giữa kì II (Phiên N7b, nâng hai đề có sẵn lên ngân hàng): kho câu = 50 câu riêng trong file (5 đoạn
     đọc, 6 câu Viết) + 50 câu của 2 đề cố định ở trên (giữ nguyên câu, chỉ thêm mức độ), câu nào cũng có mức độ. Ma trận [Biết,
     Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu, trong đó 7 câu Đọc hiểu (rút theo đoạn: đoạn 4 câu mức 1-1-2-3, đoạn 3
     câu mức 1-2-3, nên lần nào cũng đúng mức; câu đọc hiểu của hai đề cố định chép đoạn văn trong từng câu nên là câu lẻ, được rút
     khi đã làm hết các đoạn) và 1 câu Viết (tự chấm, nên 40 phút; hai đề cố định 35 phút). 17 câu Luyện từ và câu, Chính tả trên các
     chủ đề của hai đề cố định, chia theo các bài Luyện từ và câu Bài 1–15: câu 2 (Bài 1), chủ ngữ 3, vị ngữ 3 (Bài 3, 5, 7, 9),
     trạng ngữ 1 (Bài 11), trạng ngữ chỉ thời gian, nơi chốn 2 (Bài 13), chỉ nguyên nhân, mục đích 2 (Bài 15), mở rộng vốn từ theo
     hai chủ điểm 3, chính tả 1. Cả 50 câu của hai đề cố định nằm ở ô có rút; câu riêng ở ô nào cũng ít nhất bằng số câu ô đó rút,
     nên ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó rút và học sinh đã làm hai đề cố định vẫn gặp câu mới. */
  { id: "tv4-gk2-ngau-nhien", title: "Tiếng Việt 4 · Giữa kì II · Đề ngẫu nhiên", grade: 4, subject: "Tiếng Việt", minutes: 40, n: 25, file: "4-tv.js",
    pool: { from: ["tv4-gk2-de1", "tv4-gk2-de2"], matrix: {
      "Đọc hiểu": [3, 2, 2], "Câu": [1, 1, 0], "Chủ ngữ": [1, 1, 1], "Vị ngữ": [1, 1, 1], "Trạng ngữ": [1, 0, 0],
      "Trạng ngữ chỉ thời gian, nơi chốn": [1, 1, 0], "Trạng ngữ chỉ nguyên nhân, mục đích": [0, 1, 1], "Mở rộng vốn từ": [1, 1, 1],
      "Chính tả": [1, 0, 0], "Viết": [0, 0, 1] } } },

  /* Toán 6 · Kiểm tra cuối năm học (Kết nối tri thức, học kì II, Bài 23–43: Chương VI Phân số, Chương VII Số thập phân, Chương VIII
     Những hình hình học cơ bản, Chương IX Dữ liệu và xác suất thực nghiệm; Phiên N18). Kho câu = 50 câu riêng trong file + 50 câu của
     2 đề cố định, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 15 chủ đề: phân số 5 câu (Bài 23–27),
     số thập phân và tỉ số phần trăm 5 (Bài 28–31), hình học 8 (Bài 32–37), dữ liệu và xác suất 7 (Bài 38–43); chủ đề Bài 23–35 đúng
     chữ của kho giữa kì II. Hai đề cố định chia đúng ma trận, câu riêng ở ô nào cũng gấp đôi số câu ô đó rút, nên ô (chủ đề, mức)
     nào cũng có gấp bốn số câu ô đó rút và học sinh đã làm một đề cố định vẫn gặp câu mới. Bốn câu tự luận chỉ ở hai ô Vận dụng rút
     1 câu (Hai bài toán về phân số; Đoạn thẳng, trung điểm): mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "toan6-ck2-de1", title: "Toán 6 · Cuối năm · Đề 1", grade: 6, subject: "Toán", minutes: 45, n: 25, file: "6-toan.js" },
  { id: "toan6-ck2-de2", title: "Toán 6 · Cuối năm · Đề 2", grade: 6, subject: "Toán", minutes: 45, n: 25, file: "6-toan.js" },
  { id: "toan6-ck2-ngau-nhien", title: "Toán 6 · Cuối năm · Đề ngẫu nhiên", grade: 6, subject: "Toán", minutes: 45, n: 25, file: "6-toan.js",
    pool: { from: ["toan6-ck2-de1", "toan6-ck2-de2"], matrix: {
      "Phân số bằng nhau": [1, 0, 0], "So sánh phân số, hỗn số": [0, 1, 0], "Cộng, trừ phân số": [1, 0, 0], "Nhân, chia phân số": [0, 1, 0],
      "Hai bài toán về phân số": [0, 0, 1], "Số thập phân": [1, 0, 0], "Tính toán với số thập phân": [0, 1, 0], "Làm tròn và ước lượng": [1, 0, 0],
      "Tỉ số, tỉ số phần trăm": [0, 1, 1], "Điểm, đường thẳng, tia": [1, 1, 0], "Đoạn thẳng, trung điểm": [1, 0, 1], "Góc, số đo góc": [2, 1, 1],
      "Dữ liệu, biểu đồ tranh": [1, 0, 1], "Biểu đồ cột, biểu đồ cột kép": [0, 1, 1], "Xác suất thực nghiệm": [1, 1, 1] } } },

  /* Đề thử nghiệm các dạng câu mới (Phiên K2), không gắn kì thi: hiện ở nhóm "Bài ôn khác" của lớp 6 */
  { id: "thunghiem6-dang-cau-moi", title: "Đề thử nghiệm · Các dạng câu mới", grade: 6, subject: "Thử nghiệm", minutes: 30, n: 15, file: "6-thunghiem.js" }
];
