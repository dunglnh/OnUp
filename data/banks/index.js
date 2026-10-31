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
   congnghe, tincn (Tin học và Công nghệ), vatli (Vật lí), hoahoc (Hoá học), thunghiem (đề thử nghiệm). Môn mới thì đặt mã mới,
   viết thường không dấu.

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
   Đề tính điểm (Phiên K5; đề thi thử vào 10, thi thử tốt nghiệp THPT): mục danh mục có thêm pts: 10 (thang điểm, ghi sau file) để
     app biết trước khi tải file câu hỏi; mọi câu của đề có pt (điểm tối đa của câu, bội của 0,25; câu đúng/sai 4 ý pt: 1, vẫn chấm
     0,1/0,25/0,5/1 theo số ý đúng; tự luận: pt bằng tổng điểm thang chấm) và part (tên phần, ví dụ "Phần I. Trắc nghiệm nhiều lựa
     chọn"); tổng pt bằng pts, câu cùng part đứng liền nhau, câu cùng đoạn đọc liền nhau. App không xáo thứ tự câu của đề này (vẫn xáo
     phương án), chấm theo điểm (Quiz.grade): kết quả "6,35/10", bảng theo phần; lưu r = điểm phần chấm tự động, t = pts. Phần tự
     luận tự chấm vẫn lưu riêng. Tên đề "<môn> <khối> · Thi thử vào 10 · Đề N", "<môn> <khối> · Thi thử tốt nghiệp · Đề N"; mã
     "<mã môn><khối>-vao10-de<N>", "<mã môn><khối>-tn-de<N>". Chưa có đề ngẫu nhiên cho đề tính điểm (pts không đi cùng pool).
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

  /* Toán 4 · Kiểm tra cuối năm học (Kết nối tri thức, cả năm, trọng tâm học kì II Bài 38–73; Phiên N13). Kho câu = 50 câu riêng
     trong file + 50 câu của 2 đề cố định, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7
     câu trên 18 chủ đề: phân số 10 câu (Bài 53–66), số tự nhiên và phép tính 7 (Bài 38–48, ôn số có nhiều chữ số), thống kê và xác
     suất 3 (Bài 49–52), hình học và đo lường 5 (ôn học kì I); chữ chủ đề như kho giữa kì II, cuối kì I, thêm “Cộng, trừ phân số”,
     “Nhân, chia phân số”, “Tìm phân số của một số”. Mỗi ô (chủ đề, mức) rút 1 câu và có 4 câu: một câu ở mỗi đề cố định, hai câu
     riêng, nên học sinh đã làm một đề cố định vẫn gặp câu mới. Ba câu tự luận chỉ ở ba ô Vận dụng (Số trung bình cộng, Rút về đơn
     vị, Tìm phân số của một số): mỗi lần rút nhiều nhất 3 câu tự luận. */
  { id: "toan4-ck2-de1", title: "Toán 4 · Cuối năm · Đề 1", grade: 4, subject: "Toán", minutes: 40, n: 25, file: "4-toan.js" },
  { id: "toan4-ck2-de2", title: "Toán 4 · Cuối năm · Đề 2", grade: 4, subject: "Toán", minutes: 40, n: 25, file: "4-toan.js" },
  { id: "toan4-ck2-ngau-nhien", title: "Toán 4 · Cuối năm · Đề ngẫu nhiên", grade: 4, subject: "Toán", minutes: 40, n: 25, file: "4-toan.js",
    pool: { from: ["toan4-ck2-de1", "toan4-ck2-de2"], matrix: {
      "Số có nhiều chữ số": [1, 1, 0], "Phép nhân": [1, 0, 0], "Phép chia": [0, 1, 0], "Tính chất phép nhân": [0, 0, 1],
      "Số trung bình cộng": [0, 0, 1], "Rút về đơn vị": [0, 0, 1], "Phân số": [1, 0, 0], "Rút gọn phân số": [0, 1, 0],
      "Quy đồng mẫu số": [0, 1, 0], "So sánh phân số": [1, 0, 0], "Cộng, trừ phân số": [1, 0, 1], "Nhân, chia phân số": [1, 1, 0],
      "Tìm phân số của một số": [0, 1, 1], "Dãy số liệu, biểu đồ cột": [1, 1, 0], "Số lần xuất hiện của sự kiện": [1, 0, 0],
      "Đơn vị đo": [1, 0, 1], "Đường thẳng vuông góc, song song": [1, 0, 0], "Hình bình hành, hình thoi": [0, 1, 1] } } },

  /* Tiếng Việt 4 · Kiểm tra cuối năm học (Kết nối tri thức, tập 2, trọng tâm Bài 17–30; Phiên N14). Kho câu = 52 câu riêng trong
     file (4 đoạn đọc, 4 câu Viết) + 50 câu của 2 đề cố định (mỗi đề 2 đoạn đọc, 1 câu Viết), câu nào cũng có mức độ. Ma trận [Biết,
     Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu, trong đó 7 câu Đọc hiểu (rút theo đoạn: đoạn 4 câu mức 1-1-2-3, đoạn 3
     câu mức 1-2-3, nên lần nào cũng đúng mức), 1 câu Viết (tự chấm, nên cả ba đề 40 phút) và 17 câu Luyện từ và câu, Chính tả trên
     14 chủ đề: các bài Luyện từ và câu của Bài 17–29 (trạng ngữ chỉ phương tiện 2, dấu ngoặc kép 2, dấu ngoặc đơn 1, viết tên cơ
     quan, tổ chức 1, lựa chọn từ ngữ 2, dấu câu 1) và ôn tập (câu, chủ ngữ, vị ngữ, trạng ngữ, danh từ, động từ, tính từ, chính tả,
     mỗi chủ đề 1). Hai đề cố định chia đúng theo ma trận; mỗi ô (chủ đề, mức) Luyện từ và câu, Chính tả rút 1 câu và có 4 câu (một
     câu ở mỗi đề cố định, hai câu riêng), nên học sinh đã làm một đề cố định vẫn gặp câu mới. Câu tự luận chỉ ở ô Viết: mỗi lần rút
     đúng 1 câu. */
  { id: "tv4-ck2-de1", title: "Tiếng Việt 4 · Cuối năm · Đề 1", grade: 4, subject: "Tiếng Việt", minutes: 40, n: 25, file: "4-tv.js" },
  { id: "tv4-ck2-de2", title: "Tiếng Việt 4 · Cuối năm · Đề 2", grade: 4, subject: "Tiếng Việt", minutes: 40, n: 25, file: "4-tv.js" },
  { id: "tv4-ck2-ngau-nhien", title: "Tiếng Việt 4 · Cuối năm · Đề ngẫu nhiên", grade: 4, subject: "Tiếng Việt", minutes: 40, n: 25, file: "4-tv.js",
    pool: { from: ["tv4-ck2-de1", "tv4-ck2-de2"], matrix: {
      "Đọc hiểu": [3, 2, 2], "Câu": [1, 0, 0], "Chủ ngữ": [1, 0, 0], "Vị ngữ": [0, 1, 0], "Trạng ngữ": [0, 0, 1],
      "Trạng ngữ chỉ phương tiện": [1, 0, 1], "Dấu ngoặc kép": [1, 1, 0], "Dấu ngoặc đơn": [1, 0, 0],
      "Viết tên cơ quan, tổ chức": [0, 1, 0], "Lựa chọn từ ngữ": [0, 1, 1], "Dấu câu": [0, 0, 1], "Danh từ": [0, 1, 0],
      "Động từ": [1, 0, 0], "Tính từ": [0, 1, 0], "Chính tả": [1, 0, 0], "Viết": [0, 0, 1] } } },

  /* Tiếng Anh 4 · Kiểm tra cuối năm học (Global Success 4 tập hai, Unit 11–20, Review 3, 4; Phiên N15). Kho câu = 24 câu riêng trong
     file (1 đoạn đọc) + 50 câu của 2 đề cố định (mỗi đề 1 đoạn đọc), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo
     Thông tư 27/2020: 10 – 8 – 7 câu, mỗi Unit 2–3 câu (Unit 18, 20 mỗi Unit 3), Reading 3 câu (một đoạn 3 câu mức 1-2-3, nên lần rút
     nào cũng lấy trọn một đoạn, đúng mức). Câu phát âm (âm trong từ của Unit 11–15) và trọng âm (Unit 16–20) nằm ở ô Hiểu của Unit
     đó. Hai đề cố định chia đúng ma trận, câu riêng chỉ ở ô có rút câu, nên ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó
     rút. Không có câu nghe, không có câu tự luận. */
  { id: "ta4-ck2-de1", title: "Tiếng Anh 4 · Cuối năm · Đề 1", grade: 4, subject: "Tiếng Anh", minutes: 35, n: 25, file: "4-ta.js" },
  { id: "ta4-ck2-de2", title: "Tiếng Anh 4 · Cuối năm · Đề 2", grade: 4, subject: "Tiếng Anh", minutes: 35, n: 25, file: "4-ta.js" },
  { id: "ta4-ck2-ngau-nhien", title: "Tiếng Anh 4 · Cuối năm · Đề ngẫu nhiên", grade: 4, subject: "Tiếng Anh", minutes: 35, n: 25, file: "4-ta.js",
    pool: { from: ["ta4-ck2-de1", "ta4-ck2-de2"], matrix: {
      "Unit 11 · My Home": [1, 1, 0], "Unit 12 · Jobs": [1, 1, 0], "Unit 13 · Appearance": [1, 0, 1],
      "Unit 14 · Daily Activities": [1, 1, 0], "Unit 15 · My Family's Weekends": [1, 0, 1], "Unit 16 · Weather": [1, 1, 0],
      "Unit 17 · In the City": [0, 1, 1], "Unit 18 · At the Shopping Centre": [1, 1, 1], "Unit 19 · The Animal World": [1, 0, 1],
      "Unit 20 · At Summer Camp": [1, 1, 1], "Reading": [1, 1, 1] } } },

  /* Khoa học 4 · Kiểm tra cuối năm học (Kết nối tri thức, Bài 19–31; Phiên N16). Kho câu = 25 câu riêng trong file + 50 câu của 2
     đề cố định, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu trên 10 chủ đề theo tên
     bài: Nấm 7 câu (Bài 19–21), Con người và sức khoẻ 12 câu (Bài 23–27), Sinh vật và môi trường 6 câu (Bài 29–30). Mỗi ô (chủ đề,
     mức) rút 1 câu và có 3 câu: một câu ở mỗi đề cố định, một câu riêng; hai đề cố định chia đúng ma trận, nên học sinh đã làm một
     đề cố định vẫn gặp câu mới. Không có câu tự luận. */
  { id: "khoahoc4-ck2-de1", title: "Khoa học 4 · Cuối năm · Đề 1", grade: 4, subject: "Khoa học", minutes: 35, n: 25, file: "4-khoahoc.js" },
  { id: "khoahoc4-ck2-de2", title: "Khoa học 4 · Cuối năm · Đề 2", grade: 4, subject: "Khoa học", minutes: 35, n: 25, file: "4-khoahoc.js" },
  { id: "khoahoc4-ck2-ngau-nhien", title: "Khoa học 4 · Cuối năm · Đề ngẫu nhiên", grade: 4, subject: "Khoa học", minutes: 35, n: 25, file: "4-khoahoc.js",
    pool: { from: ["khoahoc4-ck2-de1", "khoahoc4-ck2-de2"], matrix: {
      "Đặc điểm chung của nấm": [1, 1, 0], "Nấm ăn, nấm trong chế biến thực phẩm": [1, 1, 0],
      "Nấm gây hỏng thực phẩm, nấm độc": [1, 1, 1], "Chất dinh dưỡng": [1, 1, 1], "Chế độ ăn uống cân bằng": [1, 1, 1],
      "Bệnh liên quan đến dinh dưỡng": [1, 1, 0], "Thực phẩm an toàn": [1, 0, 1], "Phòng tránh đuối nước": [1, 0, 1],
      "Chuỗi thức ăn": [1, 1, 1], "Vai trò của thực vật trong chuỗi thức ăn": [1, 1, 1] } } },

  /* Lịch sử và Địa lí 4 · Kiểm tra cuối năm học (Kết nối tri thức bản chỉnh sửa năm 2026, Bài 15–26; Phiên N16b). Kho câu = 25 câu
     riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7
     câu trên 13 chủ đề theo tên bài (Bài 24 tách hai chủ đề): Bắc Trung Bộ và Nam Trung Bộ 14 câu (Bài 15–21), Nam Bộ 11 câu (Bài 22–26);
     mỗi chủ đề 2 câu, riêng “Văn hoá vùng Nam Bộ” 1 câu. Mỗi ô (chủ đề, mức) rút 1 câu và có 3 câu: một câu ở mỗi đề cố định, một câu
     riêng; hai đề cố định chia đúng ma trận, nên học sinh đã làm một đề cố định vẫn gặp câu mới. Không có câu tự luận. */
  { id: "lsdl4-ck2-de1", title: "Lịch sử và Địa lí 4 · Cuối năm · Đề 1", grade: 4, subject: "Lịch sử và Địa lí", minutes: 35, n: 25, file: "4-lsdl.js" },
  { id: "lsdl4-ck2-de2", title: "Lịch sử và Địa lí 4 · Cuối năm · Đề 2", grade: 4, subject: "Lịch sử và Địa lí", minutes: 35, n: 25, file: "4-lsdl.js" },
  { id: "lsdl4-ck2-ngau-nhien", title: "Lịch sử và Địa lí 4 · Cuối năm · Đề ngẫu nhiên", grade: 4, subject: "Lịch sử và Địa lí", minutes: 35, n: 25, file: "4-lsdl.js",
    pool: { from: ["lsdl4-ck2-de1", "lsdl4-ck2-de2"], matrix: {
      "Thiên nhiên Bắc Trung Bộ và Nam Trung Bộ": [1, 0, 1], "Dân cư, sản xuất ở Bắc Trung Bộ và Nam Trung Bộ": [1, 1, 0],
      "Văn hoá vùng Bắc Trung Bộ và Nam Trung Bộ": [1, 1, 0], "Truyền thống yêu nước, cách mạng ở Bắc Trung Bộ và Nam Trung Bộ": [1, 0, 1],
      "Cố đô Huế": [1, 0, 1], "Phố cổ Hội An": [1, 1, 0], "Lễ hội Cồng chiêng Tây Nguyên": [0, 1, 1], "Thiên nhiên Nam Bộ": [1, 1, 0],
      "Dân cư, sản xuất ở Nam Bộ": [0, 1, 1], "Văn hoá vùng Nam Bộ": [1, 0, 0], "Truyền thống yêu nước, cách mạng ở Nam Bộ": [0, 1, 1],
      "Thành phố Hồ Chí Minh": [1, 1, 0], "Địa đạo Củ Chi": [1, 0, 1] } } },

  /* Tin học và Công nghệ 4 · Kiểm tra cuối năm học (Kết nối tri thức, Tin học Bài 10–16, Công nghệ Bài 7–12; Phiên N17). Kho câu =
     50 câu của 2 đề cố định (không có câu riêng), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020:
     10 – 8 – 7 câu, 13 câu Tin học (6 chủ đề) và 12 câu Công nghệ (mỗi bài 2 câu) như đề cố định. Hai đề cố định chia đúng ma trận,
     mỗi ô (chủ đề, mức) rút 1 câu và có đúng 2 câu, một ở mỗi đề, nên học sinh đã làm một đề cố định thì đề ngẫu nhiên ra toàn câu
     của đề kia (Rút ra N12). Không có câu tự luận. */
  { id: "tincn4-ck2-de1", title: "Tin học và Công nghệ 4 · Cuối năm · Đề 1", grade: 4, subject: "Tin học và Công nghệ", minutes: 35, n: 25, file: "4-tincn.js" },
  { id: "tincn4-ck2-de2", title: "Tin học và Công nghệ 4 · Cuối năm · Đề 2", grade: 4, subject: "Tin học và Công nghệ", minutes: 35, n: 25, file: "4-tincn.js" },
  { id: "tincn4-ck2-ngau-nhien", title: "Tin học và Công nghệ 4 · Cuối năm · Đề ngẫu nhiên", grade: 4, subject: "Tin học và Công nghệ", minutes: 35, n: 25, file: "4-tincn.js",
    pool: { from: ["tincn4-ck2-de1", "tincn4-ck2-de2"], matrix: {
      "Tin học · Soạn thảo văn bản": [1, 1, 0], "Tin học · Chỉnh sửa văn bản": [1, 1, 1],
      "Tin học · Đa phương tiện và luyện gõ phím": [1, 0, 1], "Tin học · Chương trình máy tính": [1, 0, 0],
      "Tin học · Lập trình trực quan": [1, 1, 1], "Tin học · Chương trình diễn tả ý tưởng": [0, 1, 1],
      "Công nghệ · Bộ lắp ghép mô hình kĩ thuật": [1, 1, 0], "Công nghệ · Lắp ghép mô hình bập bênh": [0, 1, 1],
      "Công nghệ · Lắp ghép mô hình rô-bốt": [1, 0, 1], "Công nghệ · Đồ chơi dân gian": [1, 1, 0],
      "Công nghệ · Làm đèn lồng": [1, 0, 1], "Công nghệ · Làm chuồn chuồn thăng bằng": [1, 1, 0] } } },

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

  /* Ngữ văn 6 · Kiểm tra cuối năm học (Kết nối tri thức, Bài 6–9, trọng tâm Bài 8–9; Phiên N19). Kho câu = 25 câu riêng trong file
     (4 đoạn đọc, 3 câu Viết) + 50 câu của 2 đề cố định (mỗi đề 4 đoạn đọc, 1 câu Viết), câu nào cũng có mức độ. Ma trận [Biết, Hiểu,
     Vận dụng] 10 – 8 – 7 câu: Bài 6, Bài 7 mỗi bài [1, 1, 1] (đoạn 3 câu mức 1-2-3), Bài 8, Bài 9 mỗi bài [1, 1, 2] (đoạn 4 câu mức
     1-2-3-3), nên lần rút nào cũng lấy trọn một đoạn mỗi bài, đúng mức; 10 câu Tiếng Việt chỉ mức Biết, Hiểu (trạng ngữ 3, từ mượn 2,
     lựa chọn từ ngữ và cấu trúc câu 1, nghĩa của thành ngữ 1, văn bản và đoạn văn 1, ôn từ đơn và từ phức 1, cụm từ 1); 1 câu Viết tự
     chấm. Hai đề cố định đúng ma trận, câu riêng thêm vào mọi chủ đề, nên ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó rút.
     Câu tự luận chỉ ở ô Viết: mỗi lần rút đúng 1 câu. */
  { id: "van6-ck2-de1", title: "Ngữ văn 6 · Cuối năm · Đề 1", grade: 6, subject: "Ngữ văn", minutes: 45, n: 25, file: "6-van.js" },
  { id: "van6-ck2-de2", title: "Ngữ văn 6 · Cuối năm · Đề 2", grade: 6, subject: "Ngữ văn", minutes: 45, n: 25, file: "6-van.js" },
  { id: "van6-ck2-ngau-nhien", title: "Ngữ văn 6 · Cuối năm · Đề ngẫu nhiên", grade: 6, subject: "Ngữ văn", minutes: 45, n: 25, file: "6-van.js",
    pool: { from: ["van6-ck2-de1", "van6-ck2-de2"], matrix: {
      "Chuyện kể về những người anh hùng": [1, 1, 1], "Thế giới cổ tích": [1, 1, 1], "Khác biệt và gần gũi": [1, 1, 2],
      "Trái Đất – ngôi nhà chung": [1, 1, 2], "Trạng ngữ": [2, 1, 0], "Từ mượn": [1, 1, 0], "Lựa chọn từ ngữ và cấu trúc câu": [0, 1, 0],
      "Nghĩa của từ": [0, 1, 0], "Văn bản và đoạn văn": [1, 0, 0], "Từ đơn và từ phức": [1, 0, 0],
      "Cụm danh từ, cụm động từ, cụm tính từ": [1, 0, 0], "Viết": [0, 0, 1] } } },

  /* Tiếng Anh 6 · Kiểm tra cuối năm học (Global Success 6, Unit 7–12, Review 3, 4, trọng tâm Unit 10–12; Phiên N20). Kho câu = 25 câu
     riêng trong file (2 đoạn đọc) + 50 câu của 2 đề cố định, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu:
     Pronunciation 2 (âm của Unit 7–9, trọng âm từ hai âm tiết của Unit 10), Unit 7, 8, 9 mỗi Unit 3, Unit 10, 11 mỗi Unit 4, Unit 12 3,
     Reading 3 (một đoạn 3 câu mức 1-2-3). Hai đề cố định chia đúng ma trận nên ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô
     đó rút; câu riêng chỉ ở ô có rút câu. Không có câu nghe, không có câu tự luận. */
  { id: "ta6-ck2-de1", title: "Tiếng Anh 6 · Cuối năm · Đề 1", grade: 6, subject: "Tiếng Anh", minutes: 45, n: 25, file: "6-ta.js" },
  { id: "ta6-ck2-de2", title: "Tiếng Anh 6 · Cuối năm · Đề 2", grade: 6, subject: "Tiếng Anh", minutes: 45, n: 25, file: "6-ta.js" },
  { id: "ta6-ck2-ngau-nhien", title: "Tiếng Anh 6 · Cuối năm · Đề ngẫu nhiên", grade: 6, subject: "Tiếng Anh", minutes: 45, n: 25, file: "6-ta.js",
    pool: { from: ["ta6-ck2-de1", "ta6-ck2-de2"], matrix: {
      "Pronunciation": [1, 1, 0], "Unit 7 · Television": [1, 1, 1], "Unit 8 · Sports and Games": [1, 1, 1], "Unit 9 · Cities of the World": [1, 1, 1],
      "Unit 10 · Our Houses in the Future": [2, 1, 1], "Unit 11 · Our Greener World": [2, 1, 1], "Unit 12 · Robots": [1, 1, 1],
      "Reading": [1, 1, 1] } } },

  /* KHTN 6 · Kiểm tra cuối năm học (Kết nối tri thức, Bài 40–55: Chương VIII Lực trong đời sống, Chương IX Năng lượng, Chương X Trái Đất
     và bầu trời; ôn Bài 34–39; Phiên N21). Kho câu = 25 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức độ. Ma
     trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 12 chủ đề: lực 9 câu (Bài 40–45), năng lượng 7 (Bài 46–51), Trái Đất và bầu trời 4
     (Bài 52–55), ôn thực vật, động vật, đa dạng sinh học 5 (chữ chủ đề như kho giữa kì II). Hai đề cố định và 25 câu riêng đều chia
     đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp ba số câu ô đó rút và học sinh đã làm một đề cố định vẫn gặp toàn câu mới. Không
     có câu tự luận. */
  { id: "khtn6-ck2-de1", title: "KHTN 6 · Cuối năm · Đề 1", grade: 6, subject: "KHTN", minutes: 45, n: 25, file: "6-khtn.js" },
  { id: "khtn6-ck2-de2", title: "KHTN 6 · Cuối năm · Đề 2", grade: 6, subject: "KHTN", minutes: 45, n: 25, file: "6-khtn.js" },
  { id: "khtn6-ck2-ngau-nhien", title: "KHTN 6 · Cuối năm · Đề ngẫu nhiên", grade: 6, subject: "KHTN", minutes: 45, n: 25, file: "6-khtn.js",
    pool: { from: ["khtn6-ck2-de1", "khtn6-ck2-de2"], matrix: {
      "Lực và biểu diễn lực": [1, 1, 1], "Biến dạng của lò xo": [1, 0, 1], "Trọng lượng, lực hấp dẫn": [0, 1, 1],
      "Lực ma sát, lực cản của nước": [1, 1, 0], "Năng lượng và các dạng năng lượng": [1, 1, 0],
      "Chuyển hoá năng lượng, năng lượng hao phí": [1, 1, 1], "Năng lượng tái tạo, tiết kiệm năng lượng": [1, 1, 0],
      "Mặt Trời, Mặt Trăng": [1, 0, 1], "Hệ Mặt Trời, Ngân Hà": [1, 1, 0], "Thực vật": [1, 0, 1], "Động vật": [1, 0, 1],
      "Đa dạng sinh học": [0, 1, 0] } } },

  /* Lịch sử và Địa lí 6 · Kiểm tra cuối năm học (Kết nối tri thức, bản chỉnh sửa năm 2026; Lịch sử Bài 16–20, Địa lí Bài 23–29;
     Phiên N22). Kho câu = 50 câu của 2 đề cố định (không có câu riêng), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng]
     10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì lớp 6 (Công văn 7991): 12 câu Lịch sử (Bài 16, 18 mỗi bài 3 câu;
     Bài 17, 19, 20 mỗi bài 2 câu), 13 câu Địa lí (Bài 27 3 câu; Bài 23, 24, 25, 28, 29 mỗi bài 2 câu; Bài 26, 30 là bài thực hành).
     Hai đề cố định chia đúng theo ma trận, nên ô (chủ đề, mức) nào cũng có đúng 2 câu, gấp đôi số câu ô đó rút. */
  { id: "lsdl6-ck2-de1", title: "Lịch sử và Địa lí 6 · Cuối năm · Đề 1", grade: 6, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "6-lsdl.js" },
  { id: "lsdl6-ck2-de2", title: "Lịch sử và Địa lí 6 · Cuối năm · Đề 2", grade: 6, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "6-lsdl.js" },
  { id: "lsdl6-ck2-ngau-nhien", title: "Lịch sử và Địa lí 6 · Cuối năm · Đề ngẫu nhiên", grade: 6, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "6-lsdl.js",
    pool: { from: ["lsdl6-ck2-de1", "lsdl6-ck2-de2"], matrix: {
      "Khởi nghĩa giành độc lập trước thế kỉ X": [1, 1, 1], "Bảo tồn và phát triển văn hoá dân tộc": [1, 1, 0],
      "Bước ngoặt lịch sử đầu thế kỉ X": [1, 1, 1], "Vương quốc Chăm-pa": [1, 0, 1], "Vương quốc Phù Nam": [1, 1, 0],
      "Sự sống trên Trái Đất": [1, 1, 0], "Rừng nhiệt đới": [1, 0, 1], "Các đới thiên nhiên trên Trái Đất": [1, 1, 0],
      "Dân số và phân bố dân cư": [1, 1, 1], "Con người và thiên nhiên": [0, 1, 1],
      "Bảo vệ tự nhiên, khai thác thông minh tài nguyên": [1, 0, 1] } } },

  /* GDCD 6 · Kiểm tra cuối năm học (Kết nối tri thức; Bài 10–12, ôn Bài 7–9; Phiên N22). Kho câu = 50 câu của 2 đề cố định (không
     có câu riêng), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì
     lớp 6 (Công văn 7991): Bài 10 Quyền và nghĩa vụ cơ bản của công dân 6 câu, Bài 11 Quyền cơ bản của trẻ em 6 câu, Bài 12 Thực
     hiện quyền trẻ em 6 câu; ôn Bài 7 3 câu, Bài 8 2 câu, Bài 9 2 câu (chữ chủ đề như kho giữa kì II). Hai đề cố định chia đúng theo
     ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. */
  { id: "gdcd6-ck2-de1", title: "GDCD 6 · Cuối năm · Đề 1", grade: 6, subject: "GDCD", minutes: 35, n: 25, file: "6-gdcd.js" },
  { id: "gdcd6-ck2-de2", title: "GDCD 6 · Cuối năm · Đề 2", grade: 6, subject: "GDCD", minutes: 35, n: 25, file: "6-gdcd.js" },
  { id: "gdcd6-ck2-ngau-nhien", title: "GDCD 6 · Cuối năm · Đề ngẫu nhiên", grade: 6, subject: "GDCD", minutes: 35, n: 25, file: "6-gdcd.js",
    pool: { from: ["gdcd6-ck2-de1", "gdcd6-ck2-de2"], matrix: {
      "Quyền và nghĩa vụ cơ bản của công dân": [2, 2, 2], "Quyền cơ bản của trẻ em": [3, 2, 1], "Thực hiện quyền trẻ em": [2, 2, 2],
      "Ứng phó với tình huống nguy hiểm": [1, 1, 1], "Tiết kiệm": [1, 0, 1], "Công dân nước Việt Nam": [1, 1, 0] } } },

  /* Tin học 6 · Kiểm tra cuối năm học (Kết nối tri thức; Chủ đề 6 Giải quyết vấn đề với sự trợ giúp của máy tính, Bài 15–17; ôn Bài 9–13;
     Phiên N22b). Kho câu = 50 câu của 2 đề cố định (không có câu riêng), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng]
     10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì lớp 6 (Công văn 7991): Bài 15 Thuật toán 7 câu, Bài 16 Các cấu trúc
     điều khiển 8 câu, Bài 17 Chương trình máy tính 5 câu; ôn Bài 9–13 mỗi bài 1 câu (chữ chủ đề như kho giữa kì II); Bài 14 thực
     hành tổng hợp không ra câu. Hai đề cố định chia đúng theo ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. */
  { id: "tin6-ck2-de1", title: "Tin học 6 · Cuối năm · Đề 1", grade: 6, subject: "Tin học", minutes: 35, n: 25, file: "6-tin.js" },
  { id: "tin6-ck2-de2", title: "Tin học 6 · Cuối năm · Đề 2", grade: 6, subject: "Tin học", minutes: 35, n: 25, file: "6-tin.js" },
  { id: "tin6-ck2-ngau-nhien", title: "Tin học 6 · Cuối năm · Đề ngẫu nhiên", grade: 6, subject: "Tin học", minutes: 35, n: 25, file: "6-tin.js",
    pool: { from: ["tin6-ck2-de1", "tin6-ck2-de2"], matrix: {
      "Thuật toán": [3, 2, 2], "Các cấu trúc điều khiển": [3, 3, 2], "Chương trình máy tính": [2, 1, 2],
      "An toàn thông tin trên Internet": [0, 0, 1], "Sơ đồ tư duy": [0, 1, 0], "Định dạng văn bản": [1, 0, 0],
      "Trình bày thông tin ở dạng bảng": [0, 1, 0], "Tìm kiếm và thay thế": [1, 0, 0] } } },

  /* Công nghệ 6 · Kiểm tra cuối năm học (Kết nối tri thức; Chương IV Đồ dùng điện trong gia đình, Bài 10–14; ôn Chương III, Bài 7–9;
     Phiên N22b). Kho câu = 50 câu của 2 đề cố định (không có câu riêng), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng]
     10 – 8 – 7 câu (40% – 32% – 28%), theo khung đề định kì lớp 6 (Công văn 7991): Bài 10 5 câu, Bài 11 Đèn điện 5 câu, Bài 12
     Nồi cơm điện 4 câu, Bài 13 Bếp hồng ngoại 4 câu, Bài 14 Dự án An toàn và tiết kiệm điện năng trong gia đình 4 câu (2 câu tính
     điện năng tiêu thụ); ôn Bài 7, 8, 9 mỗi bài 1 câu (chữ chủ đề như kho giữa kì II). Hai đề cố định chia đúng theo ma trận, nên
     ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. */
  { id: "congnghe6-ck2-de1", title: "Công nghệ 6 · Cuối năm · Đề 1", grade: 6, subject: "Công nghệ", minutes: 35, n: 25, file: "6-congnghe.js" },
  { id: "congnghe6-ck2-de2", title: "Công nghệ 6 · Cuối năm · Đề 2", grade: 6, subject: "Công nghệ", minutes: 35, n: 25, file: "6-congnghe.js" },
  { id: "congnghe6-ck2-ngau-nhien", title: "Công nghệ 6 · Cuối năm · Đề ngẫu nhiên", grade: 6, subject: "Công nghệ", minutes: 35, n: 25, file: "6-congnghe.js",
    pool: { from: ["congnghe6-ck2-de1", "congnghe6-ck2-de2"], matrix: {
      "Đồ dùng điện trong gia đình": [2, 2, 1], "Đèn điện": [2, 1, 2], "Nồi cơm điện": [2, 1, 1], "Bếp hồng ngoại": [1, 2, 1],
      "An toàn và tiết kiệm điện năng": [1, 1, 2], "Trang phục trong đời sống": [1, 0, 0], "Sử dụng và bảo quản trang phục": [0, 1, 0],
      "Thời trang": [1, 0, 0] } } },

  /* Toán 9 · Kiểm tra giữa học kì I (Kết nối tri thức, Toán 9 tập một: Chương I Phương trình và hệ hai phương trình bậc nhất hai ẩn,
     Bài 1–3; Chương II Phương trình và bất phương trình bậc nhất một ẩn, Bài 4–6; Chương IV Hệ thức lượng trong tam giác vuông, Bài
     11–12; Phiên N9-gk1-toan). Phạm vi theo phân phối chương trình dạy song song đại số, hình học (tuần 1–8) và ma trận đề giữa kì I
     trên hoatieu.vn (nguồn ở mục 7 của docs/KE-HOACH-NOI-DUNG.md; đọc ngày 30/10/2026: Chương I 30%, Chương II 35%, Chương IV 35%,
     không có Chương III); trường dạy theo thứ tự sách (Chương I–III) thì xem đề cương của trường (note của đề có ghi). Khối 9 chưa bật (data/grades.js) nên đề chưa hiện với gia đình.
     Kho câu = 50 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu
     trên 8 chủ đề theo tên bài (chữ chủ đề như kho cuối kì I): đại số 17 câu (Chương I 8, Chương II 9), hình học 8 câu. Hai đề cố
     định chia đúng ma trận, câu riêng ở ô nào cũng gấp đôi số câu ô đó rút, nên ô (chủ đề, mức) nào cũng có gấp bốn số câu ô đó rút
     và học sinh đã làm một đề cố định vẫn gặp câu mới. Ba câu tự luận: hai câu ở ô Vận dụng của Giải bài toán bằng cách lập hệ phương
     trình (ô rút 1 câu), một câu ở ô Vận dụng của Hệ thức giữa cạnh và góc trong tam giác vuông (ô rút 2 câu, chỉ có một câu tự luận):
     mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "toan9-gk1-de1", title: "Toán 9 · Giữa kì I · Đề 1", grade: 9, subject: "Toán", minutes: 45, n: 25, file: "9-toan.js" },
  { id: "toan9-gk1-de2", title: "Toán 9 · Giữa kì I · Đề 2", grade: 9, subject: "Toán", minutes: 45, n: 25, file: "9-toan.js" },
  { id: "toan9-gk1-ngau-nhien", title: "Toán 9 · Giữa kì I · Đề ngẫu nhiên", grade: 9, subject: "Toán", minutes: 45, n: 25, file: "9-toan.js",
    pool: { from: ["toan9-gk1-de1", "toan9-gk1-de2"], matrix: {
      "Phương trình và hệ hai phương trình bậc nhất hai ẩn": [2, 1, 0], "Giải hệ hai phương trình bậc nhất hai ẩn": [1, 1, 1],
      "Giải bài toán bằng cách lập hệ phương trình": [0, 1, 1], "Phương trình quy về phương trình bậc nhất một ẩn": [1, 1, 1],
      "Bất đẳng thức và tính chất": [2, 1, 0], "Bất phương trình bậc nhất một ẩn": [1, 1, 1], "Tỉ số lượng giác của góc nhọn": [2, 1, 1],
      "Hệ thức giữa cạnh và góc trong tam giác vuông": [1, 1, 2] } } },

  /* Toán 9 · Kiểm tra cuối học kì I (Kết nối tri thức, Toán 9 tập một, Bài 1–17: Chương I Phương trình và hệ hai phương trình bậc
     nhất hai ẩn, Chương II Phương trình và bất phương trình bậc nhất một ẩn, Chương III Căn bậc hai và căn bậc ba, Chương IV Hệ thức
     lượng trong tam giác vuông, Chương V Đường tròn; Phiên N9-ck1-toan). Khối 9 chưa bật (data/grades.js) nên đề chưa hiện với gia
     đình. Kho câu = 50 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng]
     10 – 8 – 7 câu trên 17 chủ đề theo bài (chữ chủ đề theo tên bài của sách, vài tên rút gọn): đại số (Chương I–III) 14 câu, hình
     học (Chương IV–V) 11 câu, gần khung đề cuối kì I theo Công văn 7991. Hai đề cố định chia đúng ma trận, câu riêng ở ô nào cũng
     gấp đôi số câu ô đó rút, nên ô (chủ đề, mức) nào cũng có gấp bốn số câu ô đó rút và học sinh đã làm một đề cố định vẫn gặp câu
     mới. Ba câu tự luận chỉ ở ba ô Vận dụng rút 1 câu (Giải bài toán bằng cách lập hệ phương trình; Biến đổi, rút gọn biểu thức
     chứa căn; Vị trí tương đối của đường thẳng và đường tròn): mỗi lần rút nhiều nhất 3 câu tự luận. */
  { id: "toan9-ck1-de1", title: "Toán 9 · Cuối kì I · Đề 1", grade: 9, subject: "Toán", minutes: 45, n: 25, file: "9-toan.js" },
  { id: "toan9-ck1-de2", title: "Toán 9 · Cuối kì I · Đề 2", grade: 9, subject: "Toán", minutes: 45, n: 25, file: "9-toan.js" },
  { id: "toan9-ck1-ngau-nhien", title: "Toán 9 · Cuối kì I · Đề ngẫu nhiên", grade: 9, subject: "Toán", minutes: 45, n: 25, file: "9-toan.js",
    pool: { from: ["toan9-ck1-de1", "toan9-ck1-de2"], matrix: {
      "Phương trình và hệ hai phương trình bậc nhất hai ẩn": [1, 0, 0], "Giải hệ hai phương trình bậc nhất hai ẩn": [1, 1, 0],
      "Giải bài toán bằng cách lập hệ phương trình": [0, 1, 1], "Phương trình quy về phương trình bậc nhất một ẩn": [0, 0, 1],
      "Bất đẳng thức và tính chất": [1, 0, 0], "Bất phương trình bậc nhất một ẩn": [0, 1, 1], "Căn bậc hai và căn thức bậc hai": [1, 0, 0],
      "Khai căn bậc hai với phép nhân và phép chia": [1, 0, 0], "Biến đổi, rút gọn biểu thức chứa căn": [0, 1, 1],
      "Căn bậc ba và căn thức bậc ba": [1, 0, 0], "Tỉ số lượng giác của góc nhọn": [1, 1, 0], "Hệ thức giữa cạnh và góc trong tam giác vuông": [0, 1, 1],
      "Mở đầu về đường tròn": [1, 0, 0], "Cung và dây của một đường tròn": [0, 1, 0], "Độ dài cung tròn, diện tích hình quạt tròn": [0, 1, 1],
      "Vị trí tương đối của đường thẳng và đường tròn": [1, 0, 1], "Vị trí tương đối của hai đường tròn": [1, 0, 0] } } },

  /* Toán 9 · Kiểm tra giữa học kì II (Kết nối tri thức, Toán 9 tập hai: Chương VI Hàm số y = ax² (a ≠ 0). Phương trình bậc hai một ẩn,
     Bài 18–21; Chương IX Đường tròn ngoại tiếp và đường tròn nội tiếp, Bài 27–30; Phiên N9-gk2-toan). Phạm vi theo các đề giữa kì II
     tra ngày 28/10/2026 (ma trận theo Công văn 7991 trên hoatieu.vn, hai đề trên 2048.vn: đều gồm Chương VI và Chương IX, không có
     Chương VII); trường dạy Chương VII, VIII trước Chương IX thì xem đề cương của trường (note của đề có ghi). Khối 9 chưa bật
     (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 50 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức
     độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 8 chủ đề theo tên Bài 18–21, 27–30 của sách: đại số 14 câu, hình học 11
     câu. Hai đề cố định chia đúng ma trận, câu riêng ở ô nào cũng gấp đôi số câu ô đó rút, nên ô (chủ đề, mức) nào cũng có gấp bốn
     số câu ô đó rút và học sinh đã làm một đề cố định vẫn gặp câu mới. Ba câu tự luận chỉ ở ba ô Vận dụng rút 1 câu (Định lí Viète
     và ứng dụng; Giải bài toán bằng cách lập phương trình; Tứ giác nội tiếp): mỗi lần rút nhiều nhất 3 câu tự luận. */
  { id: "toan9-gk2-de1", title: "Toán 9 · Giữa kì II · Đề 1", grade: 9, subject: "Toán", minutes: 45, n: 25, file: "9-toan.js" },
  { id: "toan9-gk2-de2", title: "Toán 9 · Giữa kì II · Đề 2", grade: 9, subject: "Toán", minutes: 45, n: 25, file: "9-toan.js" },
  { id: "toan9-gk2-ngau-nhien", title: "Toán 9 · Giữa kì II · Đề ngẫu nhiên", grade: 9, subject: "Toán", minutes: 45, n: 25, file: "9-toan.js",
    pool: { from: ["toan9-gk2-de1", "toan9-gk2-de2"], matrix: {
      "Hàm số y = ax² (a ≠ 0)": [2, 1, 1], "Phương trình bậc hai một ẩn": [2, 1, 1], "Định lí Viète và ứng dụng": [2, 1, 1],
      "Giải bài toán bằng cách lập phương trình": [0, 1, 1], "Góc nội tiếp": [1, 1, 1],
      "Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác": [1, 1, 1], "Tứ giác nội tiếp": [1, 1, 1], "Đa giác đều": [1, 1, 0] } } },

  /* Toán 9 · Kiểm tra cuối năm học (Kết nối tri thức, Toán 9 tập hai, Bài 18–32; Phiên N9-ck2-toan). Trọng tâm phần sau giữa kì II:
     Chương VII Tần số và tần số tương đối (Bài 22–24), Chương VIII Xác suất của biến cố trong một số mô hình xác suất đơn giản (Bài
     25–26), Chương X Một số hình khối trong thực tiễn (Bài 31–32); ôn Chương VI, IX (phạm vi kho giữa kì II toan9-gk2-*), không có câu
     ôn học kì I. Khối 9 chưa bật (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 50 câu riêng trong file + 50 câu của 2 đề
     cố định, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 15 chủ đề theo tên bài của sách: 17 câu
     Chương VII, VIII, X (thống kê 7, xác suất 5, hình khối 5) và 8 câu ôn (Chương VI 4, Chương IX 4; chữ chủ đề như kho giữa kì II).
     Hai đề cố định chia đúng ma trận, câu riêng ở ô nào cũng gấp đôi số câu ô đó rút, nên ô (chủ đề, mức) nào cũng có gấp bốn số câu
     ô đó rút và học sinh đã làm một đề cố định vẫn gặp câu mới. Ba câu tự luận chỉ ở ba ô Vận dụng rút 1 câu (Xác suất của biến cố
     liên quan tới phép thử; Tứ giác nội tiếp; Hình trụ và hình nón): mỗi lần rút nhiều nhất 3 câu tự luận. */
  { id: "toan9-ck2-de1", title: "Toán 9 · Cuối năm · Đề 1", grade: 9, subject: "Toán", minutes: 45, n: 25, file: "9-toan.js" },
  { id: "toan9-ck2-de2", title: "Toán 9 · Cuối năm · Đề 2", grade: 9, subject: "Toán", minutes: 45, n: 25, file: "9-toan.js" },
  { id: "toan9-ck2-ngau-nhien", title: "Toán 9 · Cuối năm · Đề ngẫu nhiên", grade: 9, subject: "Toán", minutes: 45, n: 25, file: "9-toan.js",
    pool: { from: ["toan9-ck2-de1", "toan9-ck2-de2"], matrix: {
      "Hàm số y = ax² (a ≠ 0)": [1, 0, 0], "Phương trình bậc hai một ẩn": [0, 1, 0], "Định lí Viète và ứng dụng": [0, 1, 0],
      "Giải bài toán bằng cách lập phương trình": [0, 0, 1], "Bảng tần số và biểu đồ tần số": [1, 1, 0],
      "Bảng tần số tương đối và biểu đồ tần số tương đối": [1, 1, 1], "Bảng tần số, tần số tương đối ghép nhóm và biểu đồ": [1, 0, 1],
      "Phép thử ngẫu nhiên và không gian mẫu": [1, 1, 0], "Xác suất của biến cố liên quan tới phép thử": [1, 1, 1], "Góc nội tiếp": [0, 1, 0],
      "Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác": [1, 0, 0], "Tứ giác nội tiếp": [0, 0, 1], "Đa giác đều": [1, 0, 0],
      "Hình trụ và hình nón": [1, 1, 1], "Hình cầu": [1, 0, 1] } } },

  /* Ngữ văn 9 · Kiểm tra giữa học kì I (Kết nối tri thức, Ngữ văn 9 tập một, Bài 1–3; Phiên N9-gk1-van). Phạm vi là mặc định PO
     chọn (đề giữa kì I tra được ghi “tuần 1 đến tuần 9”, mỗi bài khoảng 3 tuần); note nhắc trường thi đến Bài 2 hoặc Bài 4 đối
     chiếu đề cương. Khối 9 chưa bật nên đề chưa hiện với gia đình. Kho câu = 24 câu riêng trong file (3 đoạn đọc, 3 câu Viết) +
     50 câu của 2 đề cố định (mỗi đề 3 đoạn đọc, 1 câu Viết), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7
     câu, như kho Ngữ văn 6 giữa kì I: ba chủ đề đọc hiểu theo tên Bài 1–3, mỗi chủ đề [1, 1, 2] (đoạn 4 câu mức 1-2-3-3), nên lần
     rút nào cũng lấy trọn một đoạn mỗi bài, đúng mức; 12 câu Tiếng Việt chỉ mức Biết, Hiểu theo năm chủ đề của sáu mục Thực hành
     tiếng Việt Bài 1–3 (chữ chủ đề như kho cuối kì I); 1 câu Viết tự chấm. Hai đề cố định đúng ma trận, câu riêng thêm vào mọi ô
     có rút, nên ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó rút. Câu tự luận chỉ ở ô Viết: mỗi lần rút đúng 1 câu. */
  { id: "van9-gk1-de1", title: "Ngữ văn 9 · Giữa kì I · Đề 1", grade: 9, subject: "Ngữ văn", minutes: 45, n: 25, file: "9-van.js" },
  { id: "van9-gk1-de2", title: "Ngữ văn 9 · Giữa kì I · Đề 2", grade: 9, subject: "Ngữ văn", minutes: 45, n: 25, file: "9-van.js" },
  { id: "van9-gk1-ngau-nhien", title: "Ngữ văn 9 · Giữa kì I · Đề ngẫu nhiên", grade: 9, subject: "Ngữ văn", minutes: 45, n: 25, file: "9-van.js",
    pool: { from: ["van9-gk1-de1", "van9-gk1-de2"], matrix: {
      "Thế giới kì ảo": [1, 1, 2], "Những cung bậc tâm trạng": [1, 1, 2], "Hồn nước nằm trong tiếng mẹ cha": [1, 1, 2],
      "Điển tích, điển cố": [2, 1, 0], "Một số yếu tố Hán Việt dễ nhầm lẫn": [1, 2, 0], "Biện pháp tu từ chơi chữ": [2, 1, 0],
      "Điệp thanh, điệp vần": [1, 1, 0], "Chữ Nôm và chữ quốc ngữ": [1, 0, 0], "Viết": [0, 0, 1] } } },

  /* Ngữ văn 9 · Kiểm tra cuối học kì I (Kết nối tri thức, Ngữ văn 9 tập một, Bài 1–5; Phiên N9-ck1-van). Khối 9 chưa bật nên đề chưa
     hiện với gia đình. Kho câu = 25 câu riêng trong file (5 đoạn đọc, 3 câu Viết) + 50 câu của 2 đề cố định (mỗi đề 5 đoạn đọc, 1 câu
     Viết), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu: năm chủ đề đọc hiểu theo tên Bài 1–5, mỗi chủ đề
     [1, 1, 1] (đoạn 3 câu mức 1-2-3), nên lần rút nào cũng lấy trọn một đoạn mỗi bài, đúng mức; 9 câu Tiếng Việt theo chín chủ đề
     của mười mục Thực hành tiếng Việt Bài 1–5 (Biết 5, Hiểu 3, Vận dụng 1: chuyển cách dẫn); 1 câu Viết tự chấm. Hai đề cố định đúng ma trận, câu
     riêng thêm vào năm chủ đề đọc hiểu, bảy chủ đề Tiếng Việt và Viết, nên ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó rút.
     Câu tự luận chỉ ở ô Viết: mỗi lần rút đúng 1 câu. */
  { id: "van9-ck1-de1", title: "Ngữ văn 9 · Cuối kì I · Đề 1", grade: 9, subject: "Ngữ văn", minutes: 45, n: 25, file: "9-van.js" },
  { id: "van9-ck1-de2", title: "Ngữ văn 9 · Cuối kì I · Đề 2", grade: 9, subject: "Ngữ văn", minutes: 45, n: 25, file: "9-van.js" },
  { id: "van9-ck1-ngau-nhien", title: "Ngữ văn 9 · Cuối kì I · Đề ngẫu nhiên", grade: 9, subject: "Ngữ văn", minutes: 45, n: 25, file: "9-van.js",
    pool: { from: ["van9-ck1-de1", "van9-ck1-de2"], matrix: {
      "Thế giới kì ảo": [1, 1, 1], "Những cung bậc tâm trạng": [1, 1, 1], "Hồn nước nằm trong tiếng mẹ cha": [1, 1, 1],
      "Khám phá vẻ đẹp văn chương": [1, 1, 1], "Đối diện với nỗi đau": [1, 1, 1], "Điển tích, điển cố": [1, 0, 0],
      "Một số yếu tố Hán Việt dễ nhầm lẫn": [0, 1, 0], "Biện pháp tu từ chơi chữ": [1, 0, 0], "Điệp thanh, điệp vần": [0, 1, 0],
      "Chữ Nôm và chữ quốc ngữ": [1, 0, 0], "Cách dẫn trực tiếp và cách dẫn gián tiếp": [0, 0, 1], "Tham khảo, trích dẫn tài liệu": [1, 0, 0],
      "Câu rút gọn": [1, 0, 0], "Câu đặc biệt": [0, 1, 0], "Viết": [0, 0, 1] } } },

  /* Ngữ văn 9 · Kiểm tra giữa học kì II (Kết nối tri thức, Ngữ văn 9 tập hai, Bài 6–7; Phiên N9-gk2-van). Khối 9 chưa bật nên đề
     chưa hiện với gia đình. Kho câu = 27 câu riêng trong file (4 đoạn đọc, 3 câu Viết) + 50 câu của 2 đề cố định (mỗi đề 4 đoạn
     đọc, 1 câu Viết), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu, như kho Ngữ văn 6 giữa kì II: hai bài
     đọc (Bài 6, 7) mỗi bài 7 câu, rút theo đoạn (truyện trinh thám [2, 2, 3]: đoạn 4 câu mức 1-2-3-3 và đoạn 3 câu mức 1-2-3; thơ
     [3, 2, 2]: đoạn 3 câu mức 1-2-3 và đoạn 4 câu mức 1-1-2-3), nên lần nào cũng lấy hai đoạn mỗi bài, đúng mức; 10 câu Tiếng Việt
     theo năm mục Thực hành tiếng Việt của Bài 6–7 (Biết 5, Hiểu 4, Vận dụng 1); 1 câu Viết tự chấm. Hai đề cố định đúng ma trận,
     câu riêng thêm vào mọi ô có rút, nên ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó rút. Câu tự luận chỉ ở ô Viết:
     mỗi lần rút đúng 1 câu; câu Viết về bài thơ tám chữ đi cùng bài thơ ấy khi bài thơ được rút. */
  { id: "van9-gk2-de1", title: "Ngữ văn 9 · Giữa kì II · Đề 1", grade: 9, subject: "Ngữ văn", minutes: 45, n: 25, file: "9-van.js" },
  { id: "van9-gk2-de2", title: "Ngữ văn 9 · Giữa kì II · Đề 2", grade: 9, subject: "Ngữ văn", minutes: 45, n: 25, file: "9-van.js" },
  { id: "van9-gk2-ngau-nhien", title: "Ngữ văn 9 · Giữa kì II · Đề ngẫu nhiên", grade: 9, subject: "Ngữ văn", minutes: 45, n: 25, file: "9-van.js",
    pool: { from: ["van9-gk2-de1", "van9-gk2-de2"], matrix: {
      "Giải mã những bí mật": [2, 2, 3], "Hồn thơ muôn điệu": [3, 2, 2], "Các kiểu câu ghép": [1, 1, 0],
      "Phương tiện nối các vế câu ghép": [1, 0, 0], "Lựa chọn câu đơn hoặc câu ghép": [0, 1, 1], "Nghĩa của từ ngữ": [1, 1, 0], "Sự phát triển của từ vựng": [1, 1, 0],
      "Biện pháp tu từ": [1, 0, 0], "Viết": [0, 0, 1] } } },

  /* Ngữ văn 9 · Kiểm tra cuối năm học (Kết nối tri thức, Ngữ văn 9 tập hai, Bài 6–9, trọng tâm Bài 8–9; Phiên N9-ck2-van). Khối 9
     chưa bật nên đề chưa hiện với gia đình. Kho câu = 27 câu riêng trong file (4 đoạn đọc, 3 câu Viết) + 50 câu của 2 đề cố định
     (mỗi đề 4 đoạn đọc, 1 câu Viết), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu, như kho Ngữ văn 6 cuối
     năm: bốn chủ đề đọc hiểu theo tên Bài 6–9, Bài 6, 7 mỗi bài [1, 1, 1] (đoạn 3 câu mức 1-2-3), Bài 8, 9 mỗi bài [1, 1, 2] (đoạn
     4 câu mức 1-2-3-3), nên lần rút nào cũng lấy trọn một đoạn mỗi bài, đúng mức; 10 câu Tiếng Việt theo bảy chủ đề (năm chủ đề
     theo bốn mục Thực hành tiếng Việt của Bài 8–9, hai chủ đề ôn Bài 7; Biết 6, Hiểu 4); 1 câu Viết tự chấm. Hai đề cố định đúng
     ma trận, câu riêng thêm vào mọi ô có rút, nên ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó rút. Câu tự luận chỉ ở ô
     Viết: mỗi lần rút đúng 1 câu. */
  { id: "van9-ck2-de1", title: "Ngữ văn 9 · Cuối năm · Đề 1", grade: 9, subject: "Ngữ văn", minutes: 45, n: 25, file: "9-van.js" },
  { id: "van9-ck2-de2", title: "Ngữ văn 9 · Cuối năm · Đề 2", grade: 9, subject: "Ngữ văn", minutes: 45, n: 25, file: "9-van.js" },
  { id: "van9-ck2-ngau-nhien", title: "Ngữ văn 9 · Cuối năm · Đề ngẫu nhiên", grade: 9, subject: "Ngữ văn", minutes: 45, n: 25, file: "9-van.js",
    pool: { from: ["van9-ck2-de1", "van9-ck2-de2"], matrix: {
      "Giải mã những bí mật": [1, 1, 1], "Hồn thơ muôn điệu": [1, 1, 1], "Tiếng nói của lương tri": [1, 1, 2], "Đi và suy ngẫm": [1, 1, 2],
      "Tên viết tắt các tổ chức quốc tế": [1, 1, 0], "Lựa chọn câu đơn hoặc câu ghép": [0, 1, 0], "Các kiểu câu ghép": [1, 0, 0],
      "Biến đổi cấu trúc câu": [1, 1, 0], "Mở rộng cấu trúc câu": [1, 1, 0], "Sự phát triển của từ vựng": [1, 0, 0], "Biện pháp tu từ": [1, 0, 0],
      "Viết": [0, 0, 1] } } },

  /* Tiếng Anh 9 · Kiểm tra giữa học kì I (Global Success 9, Units 1–3, Review 1; Phiên N9-gk1-ta). Phạm vi theo đề, đề cương giữa kì I
     tra được (nguồn ở mục 7 của docs/KE-HOACH-NOI-DUNG.md). Khối 9 chưa bật nên đề chưa hiện với gia đình. Kho câu = 25 câu riêng trong
     file (1 đoạn đọc) + 50 câu của 2 đề cố định (mỗi đề 1 đoạn đọc), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7
     câu: Pronunciation 3 (nguyên âm của Unit 1, nguyên âm đôi của Unit 2, /h/, /r/ của Unit 3), Unit 1, 2, 3 mỗi Unit 6, Reading 4 (một
     đoạn 4 câu mức 1-1-2-3). Chữ chủ đề như kho cuối kì I (đề “Ôn chủ đề” rút chung câu của hai kho). Hai đề cố định và câu riêng đều
     chia đúng ma trận nên ô (chủ đề, mức) nào cũng có gấp ba số câu ô đó rút. Không có câu nghe, không có câu tự luận. */
  { id: "ta9-gk1-de1", title: "Tiếng Anh 9 · Giữa kì I · Đề 1", grade: 9, subject: "Tiếng Anh", minutes: 45, n: 25, file: "9-ta.js" },
  { id: "ta9-gk1-de2", title: "Tiếng Anh 9 · Giữa kì I · Đề 2", grade: 9, subject: "Tiếng Anh", minutes: 45, n: 25, file: "9-ta.js" },
  { id: "ta9-gk1-ngau-nhien", title: "Tiếng Anh 9 · Giữa kì I · Đề ngẫu nhiên", grade: 9, subject: "Tiếng Anh", minutes: 45, n: 25, file: "9-ta.js",
    pool: { from: ["ta9-gk1-de1", "ta9-gk1-de2"], matrix: {
      "Pronunciation": [2, 1, 0], "Unit 1 · Local Community": [2, 2, 2], "Unit 2 · City Life": [2, 2, 2],
      "Unit 3 · Healthy Living for Teens": [2, 2, 2], "Reading": [2, 1, 1] } } },

  /* Tiếng Anh 9 · Kiểm tra cuối học kì I (Global Success 9, Units 1–6, Review 1, 2; Phiên N9-ck1-ta). Khối 9 chưa bật nên đề chưa hiện
     với gia đình. Kho câu = 25 câu riêng trong file (1 đoạn đọc) + 50 câu của 2 đề cố định (mỗi đề 1 đoạn đọc), câu nào cũng có mức
     độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu: Pronunciation 2 (nguyên âm của Unit 1, 2, âm /h/ của Unit 3, /j/ của Unit 5),
     Unit 1, 2, 3, 6 mỗi Unit 3, Unit 4, 5 mỗi Unit 4, Reading 3 (một đoạn 3 câu mức 1-2-3). Hai đề cố định và câu riêng đều chia đúng
     ma trận nên ô (chủ đề, mức) nào cũng có gấp ba số câu ô đó rút. Không có câu nghe, không có câu tự luận. */
  { id: "ta9-ck1-de1", title: "Tiếng Anh 9 · Cuối kì I · Đề 1", grade: 9, subject: "Tiếng Anh", minutes: 45, n: 25, file: "9-ta.js" },
  { id: "ta9-ck1-de2", title: "Tiếng Anh 9 · Cuối kì I · Đề 2", grade: 9, subject: "Tiếng Anh", minutes: 45, n: 25, file: "9-ta.js" },
  { id: "ta9-ck1-ngau-nhien", title: "Tiếng Anh 9 · Cuối kì I · Đề ngẫu nhiên", grade: 9, subject: "Tiếng Anh", minutes: 45, n: 25, file: "9-ta.js",
    pool: { from: ["ta9-ck1-de1", "ta9-ck1-de2"], matrix: {
      "Pronunciation": [1, 1, 0], "Unit 1 · Local Community": [1, 1, 1], "Unit 2 · City Life": [1, 1, 1],
      "Unit 3 · Healthy Living for Teens": [1, 1, 1], "Unit 4 · Remembering the Past": [2, 1, 1], "Unit 5 · Our Experiences": [2, 1, 1],
      "Unit 6 · Vietnamese Lifestyle: Then and Now": [1, 1, 1], "Reading": [1, 1, 1] } } },

  /* Tiếng Anh 9 · Kiểm tra giữa học kì II (Global Success 9, Units 7–9, Review 3; Phiên N9-gk2-ta). Khối 9 chưa bật nên đề chưa hiện
     với gia đình. Kho câu = 25 câu riêng trong file (1 đoạn đọc) + 50 câu của 2 đề cố định (mỗi đề 1 đoạn đọc), câu nào cũng có mức
     độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu: Pronunciation 3 (âm /sl/, /sn/ của Unit 7, trọng âm từ tận cùng -ic, -ious của
     Unit 8, -ion, -ity của Unit 9), Unit 7, 8 mỗi Unit 6, Unit 9 5, Review of Units 1–6 2 (ngữ pháp của học kì I), Reading 3 (một đoạn
     3 câu mức 1-2-3). Hai đề cố định và câu riêng đều chia đúng ma trận nên ô (chủ đề, mức) nào cũng có gấp ba số câu ô đó rút. Không
     có câu nghe, không có câu tự luận. */
  { id: "ta9-gk2-de1", title: "Tiếng Anh 9 · Giữa kì II · Đề 1", grade: 9, subject: "Tiếng Anh", minutes: 45, n: 25, file: "9-ta.js" },
  { id: "ta9-gk2-de2", title: "Tiếng Anh 9 · Giữa kì II · Đề 2", grade: 9, subject: "Tiếng Anh", minutes: 45, n: 25, file: "9-ta.js" },
  { id: "ta9-gk2-ngau-nhien", title: "Tiếng Anh 9 · Giữa kì II · Đề ngẫu nhiên", grade: 9, subject: "Tiếng Anh", minutes: 45, n: 25, file: "9-ta.js",
    pool: { from: ["ta9-gk2-de1", "ta9-gk2-de2"], matrix: {
      "Pronunciation": [2, 1, 0], "Unit 7 · Natural Wonders of the World": [2, 2, 2], "Unit 8 · Tourism": [3, 2, 1],
      "Unit 9 · World Englishes": [2, 1, 2], "Review of Units 1–6": [0, 1, 1], "Reading": [1, 1, 1] } } },

  /* Tiếng Anh 9 · Kiểm tra cuối năm học (Global Success 9, Units 7–12, Review 3, 4, trọng tâm Units 10–12; Phiên N9-ck2-ta). Khối 9
     chưa bật nên đề chưa hiện với gia đình. Kho câu = 25 câu riêng trong file (1 đoạn đọc) + 50 câu của 2 đề cố định (mỗi đề 1 đoạn
     đọc), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu: Pronunciation 2 (âm /sl/, /sn/ của Unit 7, trọng âm
     từ tận cùng -ic, -ious, -ion, -ity của Unit 8, 9; Unit 10–12 dạy ngữ điệu, không hỏi được bằng chữ), Unit 7, 8, 9, 11 mỗi Unit 3,
     Unit 10, 12 mỗi Unit 4, Reading 3 (một đoạn 3 câu mức 1-2-3, bài đọc theo chủ đề Unit 10–12). Hai đề cố định và câu riêng đều
     chia đúng ma trận nên ô (chủ đề, mức) nào cũng có gấp ba số câu ô đó rút. Không có câu nghe, không có câu tự luận. */
  { id: "ta9-ck2-de1", title: "Tiếng Anh 9 · Cuối năm · Đề 1", grade: 9, subject: "Tiếng Anh", minutes: 45, n: 25, file: "9-ta.js" },
  { id: "ta9-ck2-de2", title: "Tiếng Anh 9 · Cuối năm · Đề 2", grade: 9, subject: "Tiếng Anh", minutes: 45, n: 25, file: "9-ta.js" },
  { id: "ta9-ck2-ngau-nhien", title: "Tiếng Anh 9 · Cuối năm · Đề ngẫu nhiên", grade: 9, subject: "Tiếng Anh", minutes: 45, n: 25, file: "9-ta.js",
    pool: { from: ["ta9-ck2-de1", "ta9-ck2-de2"], matrix: {
      "Pronunciation": [1, 1, 0], "Unit 7 · Natural Wonders of the World": [1, 1, 1], "Unit 8 · Tourism": [1, 1, 1],
      "Unit 9 · World Englishes": [1, 1, 1], "Unit 10 · Planet Earth": [2, 1, 1], "Unit 11 · Electronic Devices": [1, 1, 1],
      "Unit 12 · Career Choices": [2, 1, 1], "Reading": [1, 1, 1] } } },

  /* KHTN 9 · Kiểm tra cuối học kì I (Kết nối tri thức, Khoa học tự nhiên 9; Phiên N9-ck1-khtn). Khối 9 chưa bật nên đề chưa hiện
     với gia đình. Phạm vi theo phân phối chương trình dạy song song ba phân môn (nguồn ghi ở Pull Request của phiên): Vật lí Bài 2–10
     (Chương I Năng lượng cơ học, Chương II Ánh sáng) 9 câu, Hoá học Bài 22–32 (Chương VII–IX) 10 câu, Sinh học Bài 36–41 (Chương XI)
     6 câu; số câu mỗi phân môn theo số tiết của phạm vi. Kho câu = 25 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có
     mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 24 chủ đề theo tên bài của sách (Bài 8, 9 chung chủ đề “Thấu kính”;
     Bài 29, 30 chung chủ đề “Carbohydrate”), ô nào cũng rút 1 câu. Hai đề cố định và 25 câu riêng đều chia đúng ma trận, nên ô
     (chủ đề, mức) nào cũng có gấp ba số câu ô đó rút. Không có câu tự luận. */
  { id: "khtn9-ck1-de1", title: "KHTN 9 · Cuối kì I · Đề 1", grade: 9, subject: "KHTN", minutes: 45, n: 25, file: "9-khtn.js" },
  { id: "khtn9-ck1-de2", title: "KHTN 9 · Cuối kì I · Đề 2", grade: 9, subject: "KHTN", minutes: 45, n: 25, file: "9-khtn.js" },
  { id: "khtn9-ck1-ngau-nhien", title: "KHTN 9 · Cuối kì I · Đề ngẫu nhiên", grade: 9, subject: "KHTN", minutes: 45, n: 25, file: "9-khtn.js",
    pool: { from: ["khtn9-ck1-de1", "khtn9-ck1-de2"], matrix: {
      "Động năng. Thế năng": [1, 0, 1], "Cơ năng": [0, 1, 0], "Công và công suất": [0, 1, 0], "Khúc xạ ánh sáng": [0, 1, 0],
      "Phản xạ toàn phần": [1, 0, 0], "Lăng kính": [1, 0, 0], "Thấu kính": [1, 0, 0], "Kính lúp. Bài tập thấu kính": [0, 0, 1],
      "Giới thiệu về hợp chất hữu cơ": [1, 0, 0], "Alkane": [0, 0, 1], "Alkene": [0, 1, 0], "Nguồn nhiên liệu": [1, 0, 0],
      "Ethylic alcohol": [0, 0, 1], "Acetic acid": [0, 0, 1], "Lipid": [1, 0, 0], "Carbohydrate": [0, 1, 0], "Protein": [1, 0, 0],
      "Polymer": [0, 1, 0], "Khái quát về di truyền học": [1, 0, 0], "Các quy luật di truyền của Mendel": [0, 0, 1],
      "Nucleic acid và gene": [0, 1, 0], "Tái bản DNA và phiên mã tạo RNA": [0, 0, 1],
      "Dịch mã và mối quan hệ từ gene đến tính trạng": [0, 1, 0], "Đột biến gene": [1, 0, 0] } } },

  /* KHTN 9 · Kiểm tra giữa học kì II (Kết nối tri thức, Khoa học tự nhiên 9; Phiên N9-gk2-khtn). Khối 9 chưa bật nên đề chưa hiện
     với gia đình. Phạm vi theo phân phối chương trình dạy song song ba phân môn, tiếp sau kho cuối kì I (nguồn ghi ở Pull Request của
     phiên): Vật lí Bài 11–13 (Chương III Điện) 7 câu, Hoá học Bài 18–21 (Chương VI) 11 câu, Sinh học Bài 42–46 (Chương XII) 7 câu;
     số câu mỗi phân môn theo số tiết của phạm vi. Kho câu = 25 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức
     độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 12 chủ đề theo tên bài của sách, ô nào cũng rút nhiều nhất 1 câu. Hai đề
     cố định và 25 câu riêng đều chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp ba số câu ô đó rút. Không có câu tự luận. */
  { id: "khtn9-gk2-de1", title: "KHTN 9 · Giữa kì II · Đề 1", grade: 9, subject: "KHTN", minutes: 45, n: 25, file: "9-khtn.js" },
  { id: "khtn9-gk2-de2", title: "KHTN 9 · Giữa kì II · Đề 2", grade: 9, subject: "KHTN", minutes: 45, n: 25, file: "9-khtn.js" },
  { id: "khtn9-gk2-ngau-nhien", title: "KHTN 9 · Giữa kì II · Đề ngẫu nhiên", grade: 9, subject: "KHTN", minutes: 45, n: 25, file: "9-khtn.js",
    pool: { from: ["khtn9-gk2-de1", "khtn9-gk2-de2"], matrix: {
      "Điện trở. Định luật Ohm": [1, 1, 1], "Đoạn mạch nối tiếp, song song": [0, 1, 1], "Năng lượng của dòng điện và công suất điện": [1, 0, 1],
      "Tính chất chung của kim loại": [1, 1, 1], "Dãy hoạt động hoá học": [1, 1, 1], "Tách kim loại và việc sử dụng hợp kim": [1, 1, 1],
      "Sự khác nhau cơ bản giữa phi kim và kim loại": [1, 1, 0], "Nhiễm sắc thể và bộ nhiễm sắc thể": [1, 1, 0], "Nguyên phân và giảm phân": [1, 0, 1],
      "Nhiễm sắc thể giới tính và cơ chế xác định giới tính": [1, 0, 0], "Di truyền liên kết": [0, 1, 0], "Đột biến nhiễm sắc thể": [1, 0, 0] } } },

  /* KHTN 9 · Kiểm tra cuối năm học (Kết nối tri thức, Khoa học tự nhiên 9; Phiên N9-ck2-khtn). Khối 9 chưa bật nên đề chưa hiện với
     gia đình. Phạm vi cả học kì II theo phân phối chương trình dạy song song ba phân môn, trọng tâm phần sau giữa kì II (nguồn ghi ở
     Pull Request của phiên): Vật lí Bài 11–17 (trọng tâm Bài 14–17) 8 câu, Hoá học Bài 18–21 và Bài 33–35 (trọng tâm Bài 33–35) 10
     câu, Sinh học Bài 42–51 (trọng tâm Bài 47–51) 7 câu; số câu mỗi phân môn theo số tiết (Hoá học 2 tiết mỗi tuần, Vật lí, Sinh học
     mỗi môn 1 tiết). Kho câu = 25 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận
     dụng] 10 – 8 – 7 câu trên 18 chủ đề theo tên bài của sách: 19 câu của 12 bài phần sau giữa kì II và 6 câu ôn (Bài 13, 19, 20, 21,
     43, 46; chữ chủ đề như kho giữa kì II); chủ đề Bài 33, 35 rút gọn tên bài. Ô nào cũng rút nhiều nhất 1 câu; hai đề cố định và 25
     câu riêng đều chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp ba số câu ô đó rút. Không có câu tự luận. */
  { id: "khtn9-ck2-de1", title: "KHTN 9 · Cuối năm · Đề 1", grade: 9, subject: "KHTN", minutes: 45, n: 25, file: "9-khtn.js" },
  { id: "khtn9-ck2-de2", title: "KHTN 9 · Cuối năm · Đề 2", grade: 9, subject: "KHTN", minutes: 45, n: 25, file: "9-khtn.js" },
  { id: "khtn9-ck2-ngau-nhien", title: "KHTN 9 · Cuối năm · Đề ngẫu nhiên", grade: 9, subject: "KHTN", minutes: 45, n: 25, file: "9-khtn.js",
    pool: { from: ["khtn9-ck2-de1", "khtn9-ck2-de2"], matrix: {
      "Năng lượng của dòng điện và công suất điện": [0, 1, 0], "Cảm ứng điện từ. Nguyên tắc tạo ra dòng điện xoay chiều": [1, 1, 1],
      "Tác dụng của dòng điện xoay chiều": [1, 0, 0], "Vòng năng lượng trên Trái Đất. Năng lượng hoá thạch": [1, 0, 0],
      "Một số dạng năng lượng tái tạo": [1, 0, 1], "Dãy hoạt động hoá học": [0, 0, 1], "Tách kim loại và việc sử dụng hợp kim": [0, 1, 0],
      "Sự khác nhau cơ bản giữa phi kim và kim loại": [0, 1, 0], "Hoá học vỏ Trái Đất và khai thác tài nguyên từ vỏ Trái Đất": [1, 1, 0],
      "Khai thác đá vôi. Công nghiệp silicate": [1, 1, 1], "Nhiên liệu hoá thạch. Chu trình carbon và sự ấm lên toàn cầu": [1, 1, 0],
      "Nguyên phân và giảm phân": [0, 0, 1], "Đột biến nhiễm sắc thể": [0, 1, 0], "Di truyền học với con người": [1, 0, 0],
      "Ứng dụng công nghệ di truyền vào đời sống": [0, 0, 1], "Khái niệm tiến hoá và các hình thức chọn lọc": [1, 0, 0],
      "Cơ chế tiến hoá": [0, 0, 1], "Sự phát sinh và phát triển sự sống trên Trái Đất": [1, 0, 0] } } },

  /* Lịch sử và Địa lí 9 · Kiểm tra cuối học kì I (Kết nối tri thức, bản chỉnh sửa năm 2026; Lịch sử Bài 1–12, Địa lí Bài 1–13; Phiên
     N9-ck1-lsdl-gdcd). Khối 9 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2 đề cố định (không có câu riêng), câu nào
     cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu, theo khung đề định kì (Công văn 7991): 12 câu Lịch sử (mỗi bài 1
     câu; chữ chủ đề theo tên bài của sách, rút gọn), 13 câu Địa lí (Bài 1, 2, 3, 6, 10 mỗi bài 1 câu; Nông nghiệp, Công nghiệp, Vùng
     Trung du và miền núi phía Bắc, Vùng Đồng bằng sông Hồng mỗi chủ đề 2 câu; Bài 4, 7, 9, 11 là bài thực hành, không ra câu riêng).
     Hai đề cố định chia đúng theo ma trận, nên ô (chủ đề, mức) nào cũng có đúng 2 câu, gấp đôi số câu ô đó rút. */
  { id: "lsdl9-ck1-de1", title: "Lịch sử và Địa lí 9 · Cuối kì I · Đề 1", grade: 9, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "9-lsdl.js" },
  { id: "lsdl9-ck1-de2", title: "Lịch sử và Địa lí 9 · Cuối kì I · Đề 2", grade: 9, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "9-lsdl.js" },
  { id: "lsdl9-ck1-ngau-nhien", title: "Lịch sử và Địa lí 9 · Cuối kì I · Đề ngẫu nhiên", grade: 9, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "9-lsdl.js",
    pool: { from: ["lsdl9-ck1-de1", "lsdl9-ck1-de2"], matrix: {
      "Nước Nga và Liên Xô (1918 – 1945)": [1, 0, 0], "Châu Âu và nước Mỹ (1918 – 1945)": [0, 1, 0], "Châu Á (1918 – 1945)": [1, 0, 0],
      "Chiến tranh thế giới thứ hai": [0, 0, 1], "Phong trào dân tộc dân chủ (1918 – 1930)": [1, 0, 0],
      "Nguyễn Ái Quốc và sự thành lập Đảng": [0, 1, 0], "Phong trào cách mạng (1930 – 1939)": [0, 1, 0], "Cách mạng tháng Tám năm 1945": [0, 0, 1],
      "Chiến tranh lạnh": [1, 0, 0], "Liên Xô và Đông Âu (1945 – 1991)": [0, 1, 0], "Nước Mỹ và Tây Âu (1945 – 1991)": [1, 0, 0],
      "Mỹ La-tinh và châu Á (1945 – 1991)": [0, 0, 1], "Dân tộc và dân số": [0, 0, 1], "Phân bố dân cư và quần cư": [0, 0, 1],
      "Lao động và việc làm": [0, 1, 0], "Nông nghiệp": [1, 0, 1], "Lâm nghiệp và thuỷ sản": [1, 0, 0], "Công nghiệp": [1, 1, 0],
      "Dịch vụ": [1, 0, 0], "Vùng Trung du và miền núi phía Bắc": [1, 1, 0], "Vùng Đồng bằng sông Hồng": [0, 1, 1] } } },

  /* Lịch sử và Địa lí 9 · Kiểm tra giữa học kì II (Kết nối tri thức, bản chỉnh sửa năm 2026; Lịch sử Bài 13–17, Địa lí Bài 14–17,
     mỗi phân môn một câu ôn học kì I; Phiên N9-gk2-lsdl-gdcd). Khối 9 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2
     đề cố định (không có câu riêng), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu, theo khung đề định kì
     (Công văn 7991): 12 câu Lịch sử (câu ôn Bài 8 Cách mạng tháng Tám năm 1945; Bài 13–16 mỗi bài 2 câu, Bài 17 3 câu; chữ chủ đề
     theo tên bài, rút gọn), 13 câu Địa lí (câu ôn Bài 13 Vùng Đồng bằng sông Hồng; vùng Bắc Trung Bộ gồm cả bài thực hành Bài 15,
     vùng Duyên hải Nam Trung Bộ và Tây Nguyên, vùng Đông Nam Bộ mỗi vùng 4 câu). Hai đề cố định chia đúng theo ma trận, nên ô (chủ
     đề, mức) nào cũng có gấp đôi số câu ô đó rút. */
  { id: "lsdl9-gk2-de1", title: "Lịch sử và Địa lí 9 · Giữa kì II · Đề 1", grade: 9, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "9-lsdl.js" },
  { id: "lsdl9-gk2-de2", title: "Lịch sử và Địa lí 9 · Giữa kì II · Đề 2", grade: 9, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "9-lsdl.js" },
  { id: "lsdl9-gk2-ngau-nhien", title: "Lịch sử và Địa lí 9 · Giữa kì II · Đề ngẫu nhiên", grade: 9, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "9-lsdl.js",
    pool: { from: ["lsdl9-gk2-de1", "lsdl9-gk2-de2"], matrix: {
      "Cách mạng tháng Tám năm 1945": [0, 1, 0], "Năm đầu sau Cách mạng tháng Tám": [1, 1, 0], "Kháng chiến chống Pháp (1946 – 1950)": [1, 0, 1],
      "Kháng chiến chống Pháp (1951 – 1954)": [1, 1, 0], "Kháng chiến chống Mỹ (1954 – 1965)": [1, 0, 1], "Kháng chiến chống Mỹ (1965 – 1975)": [1, 1, 1],
      "Vùng Đồng bằng sông Hồng": [1, 0, 0], "Vùng Bắc Trung Bộ": [2, 1, 1], "Vùng Duyên hải Nam Trung Bộ và Tây Nguyên": [1, 1, 2],
      "Vùng Đông Nam Bộ": [1, 2, 1] } } },

  /* Lịch sử và Địa lí 9 · Kiểm tra cuối năm học (Kết nối tri thức, bản chỉnh sửa năm 2026; Lịch sử Bài 13–21, Địa lí Bài 14–21,
     trọng tâm Bài 18–21 của mỗi phân môn; Phiên N9-ck2-lsdl-gdcd). Khối 9 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50 câu
     của 2 đề cố định (không có câu riêng), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu, theo khung đề định
     kì (Công văn 7991): 12 câu Lịch sử (câu ôn kháng chiến chống Pháp, chống Mỹ với chữ chủ đề như kho giữa kì II; Bài 18, 19, 21
     mỗi bài 2 câu; Bài 20 4 câu chia hai chủ đề), 13 câu Địa lí (câu ôn Bắc Trung Bộ, Duyên hải Nam Trung Bộ và Tây Nguyên; Đông Nam
     Bộ 2 câu, gồm bài thực hành Bài 18; Đồng bằng sông Cửu Long 5 câu, gồm bài thực hành Bài 20; biển, đảo 4 câu). Ba Chủ đề chung
     cuối sách không có câu riêng. Hai đề cố định chia đúng theo ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. */
  { id: "lsdl9-ck2-de1", title: "Lịch sử và Địa lí 9 · Cuối năm · Đề 1", grade: 9, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "9-lsdl.js" },
  { id: "lsdl9-ck2-de2", title: "Lịch sử và Địa lí 9 · Cuối năm · Đề 2", grade: 9, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "9-lsdl.js" },
  { id: "lsdl9-ck2-ngau-nhien", title: "Lịch sử và Địa lí 9 · Cuối năm · Đề ngẫu nhiên", grade: 9, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "9-lsdl.js",
    pool: { from: ["lsdl9-ck2-de1", "lsdl9-ck2-de2"], matrix: {
      "Kháng chiến chống Pháp (1951 – 1954)": [0, 1, 0], "Kháng chiến chống Mỹ (1965 – 1975)": [1, 0, 0],
      "Trật tự thế giới, Nga và Mỹ (1991 – nay)": [1, 1, 0], "Châu Á (1991 – nay)": [1, 0, 1], "Thống nhất đất nước, bảo vệ Tổ quốc": [1, 0, 1],
      "Công cuộc Đổi mới (1986 – nay)": [0, 1, 1], "Cách mạng khoa học – kĩ thuật và toàn cầu hoá": [1, 1, 0],
      "Vùng Bắc Trung Bộ": [0, 1, 0], "Vùng Duyên hải Nam Trung Bộ và Tây Nguyên": [1, 0, 0], "Vùng Đông Nam Bộ": [1, 1, 0],
      "Vùng Đồng bằng sông Cửu Long": [2, 1, 2], "Biển, đảo Việt Nam": [1, 1, 2] } } },

  /* GDCD 9 · Kiểm tra cuối học kì I (Kết nối tri thức; Bài 1–6; Phiên N9-ck1-lsdl-gdcd). Khối 9 chưa bật nên đề chưa hiện với gia
     đình. Kho câu = 50 câu của 2 đề cố định (không có câu riêng), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7
     câu, theo khung đề định kì (Công văn 7991): Bài 1–5 mỗi bài 4 câu, Bài 6 Quản lí thời gian hiệu quả 5 câu, bài nào cũng có câu
     xử lí tình huống. Hai đề cố định chia đúng theo ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. */
  { id: "gdcd9-ck1-de1", title: "GDCD 9 · Cuối kì I · Đề 1", grade: 9, subject: "GDCD", minutes: 35, n: 25, file: "9-gdcd.js" },
  { id: "gdcd9-ck1-de2", title: "GDCD 9 · Cuối kì I · Đề 2", grade: 9, subject: "GDCD", minutes: 35, n: 25, file: "9-gdcd.js" },
  { id: "gdcd9-ck1-ngau-nhien", title: "GDCD 9 · Cuối kì I · Đề ngẫu nhiên", grade: 9, subject: "GDCD", minutes: 35, n: 25, file: "9-gdcd.js",
    pool: { from: ["gdcd9-ck1-de1", "gdcd9-ck1-de2"], matrix: {
      "Sống có lí tưởng": [2, 1, 1], "Khoan dung": [2, 1, 1], "Hoạt động cộng đồng": [2, 1, 1],
      "Khách quan và công bằng": [1, 2, 1], "Bảo vệ hoà bình": [2, 1, 1], "Quản lí thời gian hiệu quả": [1, 2, 2] } } },

  /* GDCD 9 · Kiểm tra giữa học kì II (Kết nối tri thức; Bài 7 Thích ứng với thay đổi, Bài 8 Tiêu dùng thông minh, 3 câu ôn Bài 6;
     Phiên N9-gk2-lsdl-gdcd). Khối 9 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2 đề cố định (không có câu riêng),
     câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu, theo khung đề định kì (Công văn 7991): Bài 6 3 câu, Bài 7,
     Bài 8 mỗi bài 11 câu, câu tình huống là chính. Hai đề cố định chia đúng theo ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số
     câu ô đó rút. */
  { id: "gdcd9-gk2-de1", title: "GDCD 9 · Giữa kì II · Đề 1", grade: 9, subject: "GDCD", minutes: 35, n: 25, file: "9-gdcd.js" },
  { id: "gdcd9-gk2-de2", title: "GDCD 9 · Giữa kì II · Đề 2", grade: 9, subject: "GDCD", minutes: 35, n: 25, file: "9-gdcd.js" },
  { id: "gdcd9-gk2-ngau-nhien", title: "GDCD 9 · Giữa kì II · Đề ngẫu nhiên", grade: 9, subject: "GDCD", minutes: 35, n: 25, file: "9-gdcd.js",
    pool: { from: ["gdcd9-gk2-de1", "gdcd9-gk2-de2"], matrix: {
      "Quản lí thời gian hiệu quả": [1, 1, 1], "Thích ứng với thay đổi": [4, 4, 3], "Tiêu dùng thông minh": [5, 3, 3] } } },

  /* GDCD 9 · Kiểm tra cuối năm học (Kết nối tri thức; Bài 7–10, trọng tâm Bài 9 Vi phạm pháp luật và trách nhiệm pháp lí, Bài 10
     Quyền tự do kinh doanh và nghĩa vụ nộp thuế; Phiên N9-ck2-lsdl-gdcd). Khối 9 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50
     câu của 2 đề cố định (không có câu riêng), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu, theo khung đề
     định kì (Công văn 7991): Bài 7 3 câu, Bài 8 4 câu, Bài 9, Bài 10 mỗi bài 9 câu, câu tình huống là chính. Hai đề cố định chia đúng
     theo ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. */
  { id: "gdcd9-ck2-de1", title: "GDCD 9 · Cuối năm · Đề 1", grade: 9, subject: "GDCD", minutes: 35, n: 25, file: "9-gdcd.js" },
  { id: "gdcd9-ck2-de2", title: "GDCD 9 · Cuối năm · Đề 2", grade: 9, subject: "GDCD", minutes: 35, n: 25, file: "9-gdcd.js" },
  { id: "gdcd9-ck2-ngau-nhien", title: "GDCD 9 · Cuối năm · Đề ngẫu nhiên", grade: 9, subject: "GDCD", minutes: 35, n: 25, file: "9-gdcd.js",
    pool: { from: ["gdcd9-ck2-de1", "gdcd9-ck2-de2"], matrix: {
      "Thích ứng với thay đổi": [1, 1, 1], "Tiêu dùng thông minh": [2, 1, 1], "Vi phạm pháp luật và trách nhiệm pháp lí": [4, 3, 2],
      "Quyền tự do kinh doanh và nghĩa vụ nộp thuế": [3, 3, 3] } } },

  /* Tin học 9 · Kiểm tra cuối học kì I (Kết nối tri thức, Tin học 9, Bài 1–8; Phiên N9-ck1-tin-congnghe). Khối 9 chưa bật nên đề chưa
     hiện với gia đình. Năm chủ đề theo năm bài lí thuyết (Bài 1, 2, 4, 5, 7; ba bài thực hành 3, 6, 8 hỏi qua tình huống ở chủ đề của
     bài đi trước), số câu mỗi chủ đề theo số tiết. Kho câu = 50 câu của 2 đề cố định, không có câu riêng; ma trận [Biết, Hiểu, Vận
     dụng] 10 – 8 – 7, hai đề cố định chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. Ô Hiểu của Bài 2
     chỉ rút 1 câu: hai câu ở ô đó (nối tình huống với tiêu chí đánh giá chất lượng thông tin; điền tên tiêu chí) không cùng một đề. */
  { id: "tin9-ck1-de1", title: "Tin học 9 · Cuối kì I · Đề 1", grade: 9, subject: "Tin học", minutes: 35, n: 25, file: "9-tin.js" },
  { id: "tin9-ck1-de2", title: "Tin học 9 · Cuối kì I · Đề 2", grade: 9, subject: "Tin học", minutes: 35, n: 25, file: "9-tin.js" },
  { id: "tin9-ck1-ngau-nhien", title: "Tin học 9 · Cuối kì I · Đề ngẫu nhiên", grade: 9, subject: "Tin học", minutes: 35, n: 25, file: "9-tin.js",
    pool: { from: ["tin9-ck1-de1", "tin9-ck1-de2"], matrix: {
      "Thế giới kĩ thuật số": [2, 1, 1], "Thông tin trong giải quyết vấn đề": [2, 1, 3], "Một số vấn đề pháp lí về sử dụng dịch vụ Internet": [2, 1, 1],
      "Phần mềm mô phỏng": [2, 2, 1], "Trình bày thông tin trong trao đổi và hợp tác": [2, 3, 1] } } },

  /* Công nghệ 9 · Kiểm tra cuối học kì I (Kết nối tri thức, Công nghệ 9 – Định hướng nghề nghiệp, mô đun bắt buộc, Bài 1–5; Phiên
     N9-ck1-tin-congnghe). Khối 9 chưa bật nên đề chưa hiện với gia đình. Trường dạy mô đun tự chọn ở học kì I thì đối chiếu đề cương
     (lời dặn của đề). Kho câu = 50 câu của 2 đề cố định, không có câu riêng; ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 trên năm chủ đề
     theo tên bài (vài tên rút gọn), số câu mỗi chủ đề theo số tiết; hai đề cố định chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có
     gấp đôi số câu ô đó rút. */
  { id: "congnghe9-ck1-de1", title: "Công nghệ 9 · Cuối kì I · Đề 1", grade: 9, subject: "Công nghệ", minutes: 35, n: 25, file: "9-congnghe.js" },
  { id: "congnghe9-ck1-de2", title: "Công nghệ 9 · Cuối kì I · Đề 2", grade: 9, subject: "Công nghệ", minutes: 35, n: 25, file: "9-congnghe.js" },
  { id: "congnghe9-ck1-ngau-nhien", title: "Công nghệ 9 · Cuối kì I · Đề ngẫu nhiên", grade: 9, subject: "Công nghệ", minutes: 35, n: 25, file: "9-congnghe.js",
    pool: { from: ["congnghe9-ck1-de1", "congnghe9-ck1-de2"], matrix: {
      "Nghề nghiệp trong lĩnh vực kĩ thuật và công nghệ": [3, 2, 1], "Cơ cấu hệ thống giáo dục quốc dân": [1, 1, 2],
      "Thị trường lao động kĩ thuật, công nghệ": [2, 2, 1], "Quy trình lựa chọn nghề nghiệp": [3, 2, 2],
      "Tự đánh giá mức độ phù hợp với nghề": [1, 1, 1] } } },

  /* Tin học 9 · Kiểm tra giữa học kì II (Kết nối tri thức, Tin học 9, Chủ đề 4 phần a. Sử dụng bảng tính điện tử nâng cao, Bài 9a–13a;
     Phiên N9-gk2-tin-congnghe). Khối 9 chưa bật nên đề chưa hiện với gia đình. Trường học phần b. Làm quen với phần mềm làm video thì
     đề không hợp (lời dặn của đề). Kho câu = 50 câu của 2 đề cố định, không có câu riêng; ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 trên
     năm chủ đề theo tên bài, mỗi bài 5 câu; hai đề cố định chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút.
     Ô Hiểu của Hàm COUNTIF chỉ rút 1 câu: hai câu ở ô đó (công thức sau khi sao chép, vì sao vùng có dấu $) không cùng một đề. */
  { id: "tin9-gk2-de1", title: "Tin học 9 · Giữa kì II · Đề 1", grade: 9, subject: "Tin học", minutes: 35, n: 25, file: "9-tin.js" },
  { id: "tin9-gk2-de2", title: "Tin học 9 · Giữa kì II · Đề 2", grade: 9, subject: "Tin học", minutes: 35, n: 25, file: "9-tin.js" },
  { id: "tin9-gk2-ngau-nhien", title: "Tin học 9 · Giữa kì II · Đề ngẫu nhiên", grade: 9, subject: "Tin học", minutes: 35, n: 25, file: "9-tin.js",
    pool: { from: ["tin9-gk2-de1", "tin9-gk2-de2"], matrix: {
      "Công cụ xác thực dữ liệu": [2, 2, 1], "Hàm COUNTIF": [2, 1, 2], "Hàm SUMIF": [2, 1, 2], "Hàm IF": [2, 2, 1],
      "Hoàn thiện bảng tính quản lí tài chính gia đình": [2, 2, 1] } } },

  /* Công nghệ 9 · Kiểm tra giữa học kì II (Kết nối tri thức, Công nghệ 9 – Trải nghiệm nghề nghiệp, mô đun Lắp đặt mạng điện trong nhà,
     Bài 1–4; Phiên N9-gk2-tin-congnghe). Khối 9 chưa bật nên đề chưa hiện với gia đình. Trường học mô đun khác hoặc học Định hướng nghề
     nghiệp ở học kì II thì đối chiếu đề cương (lời dặn của đề). Kho câu = 50 câu của 2 đề cố định, không có câu riêng; ma trận [Biết,
     Hiểu, Vận dụng] 10 – 8 – 7 trên bốn chủ đề theo tên bài (Bài 4 rút gọn), mỗi đề 5, 5, 7, 8 câu; hai đề cố định chia đúng ma trận,
     nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. */
  { id: "congnghe9-gk2-de1", title: "Công nghệ 9 · Giữa kì II · Đề 1", grade: 9, subject: "Công nghệ", minutes: 35, n: 25, file: "9-congnghe.js" },
  { id: "congnghe9-gk2-de2", title: "Công nghệ 9 · Giữa kì II · Đề 2", grade: 9, subject: "Công nghệ", minutes: 35, n: 25, file: "9-congnghe.js" },
  { id: "congnghe9-gk2-ngau-nhien", title: "Công nghệ 9 · Giữa kì II · Đề ngẫu nhiên", grade: 9, subject: "Công nghệ", minutes: 35, n: 25, file: "9-congnghe.js",
    pool: { from: ["congnghe9-gk2-de1", "congnghe9-gk2-de2"], matrix: {
      "Thiết bị đóng cắt và lấy điện trong gia đình": [3, 1, 1], "Dụng cụ đo điện cơ bản": [2, 2, 1],
      "Thiết kế mạng điện trong nhà": [2, 3, 2], "Vật liệu, thiết bị và dụng cụ lắp đặt mạng điện": [3, 2, 3] } } },

  /* Tin học 9 · Kiểm tra cuối năm học (Kết nối tri thức, Tin học 9: ôn Chủ đề 4 phần a, Bài 9a–13a; trọng tâm Bài 14–17; Phiên
     N9-ck2-tin-congnghe). Khối 9 chưa bật nên đề chưa hiện với gia đình. Trường học phần b. Làm quen với phần mềm làm video thì phần
     bảng tính của đề không hợp (lời dặn của đề). Kho câu = 50 câu của 2 đề cố định, không có câu riêng; ma trận [Biết, Hiểu, Vận dụng]
     10 – 8 – 7: mỗi đề 7 câu ôn Bài 9a–13a (chữ chủ đề như kho giữa kì II) và 18 câu Bài 14–17; hai đề cố định chia đúng ma trận, nên
     ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. */
  { id: "tin9-ck2-de1", title: "Tin học 9 · Cuối năm · Đề 1", grade: 9, subject: "Tin học", minutes: 35, n: 25, file: "9-tin.js" },
  { id: "tin9-ck2-de2", title: "Tin học 9 · Cuối năm · Đề 2", grade: 9, subject: "Tin học", minutes: 35, n: 25, file: "9-tin.js" },
  { id: "tin9-ck2-ngau-nhien", title: "Tin học 9 · Cuối năm · Đề ngẫu nhiên", grade: 9, subject: "Tin học", minutes: 35, n: 25, file: "9-tin.js",
    pool: { from: ["tin9-ck2-de1", "tin9-ck2-de2"], matrix: {
      "Công cụ xác thực dữ liệu": [1, 1, 0], "Hàm COUNTIF": [1, 0, 0], "Hàm SUMIF": [0, 1, 0], "Hàm IF": [1, 0, 1],
      "Hoàn thiện bảng tính quản lí tài chính gia đình": [0, 1, 0], "Giải quyết vấn đề": [2, 1, 1], "Bài toán tin học": [2, 2, 2],
      "Lập chương trình máy tính": [1, 1, 2], "Tin học và thế giới nghề nghiệp": [2, 1, 1] } } },

  /* Công nghệ 9 · Kiểm tra cuối năm học (Kết nối tri thức, Công nghệ 9 – Trải nghiệm nghề nghiệp, mô đun Lắp đặt mạng điện trong nhà,
     Bài 1–7, trọng tâm Bài 5–7; 2 câu ôn Định hướng nghề nghiệp; Phiên N9-ck2-tin-congnghe). Khối 9 chưa bật nên đề chưa hiện với gia
     đình. Trường học mô đun khác hoặc học Định hướng nghề nghiệp ở học kì II thì đối chiếu đề cương (lời dặn của đề). Kho câu = 50 câu
     của 2 đề cố định, không có câu riêng; ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7: mỗi đề 6 câu ôn Bài 1–4, 17 câu Bài 5–7 và 2 câu
     ôn Định hướng nghề nghiệp (chữ chủ đề như kho giữa kì II, cuối kì I); hai đề cố định chia đúng ma trận, nên ô (chủ đề, mức) nào
     cũng có gấp đôi số câu ô đó rút. */
  { id: "congnghe9-ck2-de1", title: "Công nghệ 9 · Cuối năm · Đề 1", grade: 9, subject: "Công nghệ", minutes: 35, n: 25, file: "9-congnghe.js" },
  { id: "congnghe9-ck2-de2", title: "Công nghệ 9 · Cuối năm · Đề 2", grade: 9, subject: "Công nghệ", minutes: 35, n: 25, file: "9-congnghe.js" },
  { id: "congnghe9-ck2-ngau-nhien", title: "Công nghệ 9 · Cuối năm · Đề ngẫu nhiên", grade: 9, subject: "Công nghệ", minutes: 35, n: 25, file: "9-congnghe.js",
    pool: { from: ["congnghe9-ck2-de1", "congnghe9-ck2-de2"], matrix: {
      "Thiết bị đóng cắt và lấy điện trong gia đình": [1, 1, 0], "Dụng cụ đo điện cơ bản": [1, 0, 1], "Thiết kế mạng điện trong nhà": [0, 0, 1],
      "Vật liệu, thiết bị và dụng cụ lắp đặt mạng điện": [0, 1, 0], "Tính toán chi phí mạng điện trong nhà": [2, 2, 2],
      "Lắp đặt mạng điện trong nhà": [3, 2, 2], "Ngành nghề liên quan đến lắp đặt mạng điện": [2, 1, 1],
      "Thị trường lao động kĩ thuật, công nghệ": [1, 0, 0], "Quy trình lựa chọn nghề nghiệp": [0, 1, 0] } } },

  /* Toán 12 · Kiểm tra cuối học kì I (Kết nối tri thức, Toán 12 tập một, Bài 1–10: Chương I Ứng dụng đạo hàm để khảo sát và vẽ đồ
     thị hàm số, Chương II Vectơ và hệ trục toạ độ trong không gian, Chương III Các số đặc trưng đo mức độ phân tán của mẫu số liệu ghép
     nhóm; không có chủ đề riêng cho Hoạt động thực hành trải nghiệm; Phiên N12-ck1-toan). Khối 12 chưa bật (data/grades.js) nên đề chưa
     hiện với gia đình. Kho câu = 25 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận
     dụng] 10 – 8 – 7 câu trên 10 chủ đề theo tên Bài 1–10 (tên Bài 5 rút gọn): Chương I 13 câu, Chương II 7 câu, Chương III 5 câu,
     gần thời lượng của ba chương. Hai đề cố định và phần câu riêng đều chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp ba số câu
     ô đó rút và học sinh đã làm một đề cố định vẫn gặp câu mới. Hai câu tự luận chỉ ở hai ô Vận dụng rút 1 câu (Ứng dụng đạo hàm để giải
     quyết vấn đề thực tiễn; Biểu thức toạ độ của các phép toán vectơ): mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "toan12-ck1-de1", title: "Toán 12 · Cuối kì I · Đề 1", grade: 12, subject: "Toán", minutes: 45, n: 25, file: "12-toan.js" },
  { id: "toan12-ck1-de2", title: "Toán 12 · Cuối kì I · Đề 2", grade: 12, subject: "Toán", minutes: 45, n: 25, file: "12-toan.js" },
  { id: "toan12-ck1-ngau-nhien", title: "Toán 12 · Cuối kì I · Đề ngẫu nhiên", grade: 12, subject: "Toán", minutes: 45, n: 25, file: "12-toan.js",
    pool: { from: ["toan12-ck1-de1", "toan12-ck1-de2"], matrix: {
      "Tính đơn điệu và cực trị của hàm số": [2, 1, 1], "Giá trị lớn nhất và giá trị nhỏ nhất của hàm số": [1, 1, 1],
      "Đường tiệm cận của đồ thị hàm số": [1, 1, 0], "Khảo sát sự biến thiên và vẽ đồ thị của hàm số": [1, 0, 1],
      "Ứng dụng đạo hàm để giải quyết vấn đề thực tiễn": [0, 1, 1], "Vectơ trong không gian": [1, 1, 1], "Hệ trục toạ độ trong không gian": [1, 1, 0],
      "Biểu thức toạ độ của các phép toán vectơ": [1, 0, 1], "Khoảng biến thiên và khoảng tứ phân vị": [1, 1, 0], "Phương sai và độ lệch chuẩn": [1, 1, 1] } } },

  /* Ngữ văn 12 · Kiểm tra cuối học kì I (Kết nối tri thức, Ngữ văn 12 tập một, Bài 1–5; Phiên N12-ck1-van). Khối 12 chưa bật
     (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2 đề cố định (mỗi đề 5 đoạn đọc, 1 câu Viết) + 3 câu Viết
     riêng trong file, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu như kho Ngữ văn 9 cuối kì I: năm chủ đề đọc
     hiểu theo tên Bài 1–5, mỗi chủ đề [1, 1, 1] (đoạn 3 câu mức 1-2-3), nên lần rút nào cũng lấy trọn một đoạn mỗi bài, đúng mức; 9 câu
     Tiếng Việt theo sáu chủ đề của bốn mục Thực hành tiếng Việt Bài 1–4 (Bài 5 không có mục này; Biết 5, Hiểu 3, Vận dụng 1: sửa câu mơ
     hồ), Bài 3, 4 sáu câu; 1 câu Viết tự chấm. Hai đề cố định đúng ma trận nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút;
     câu Viết riêng giúp chủ đề Viết đủ năm kiểu bài Viết của Bài 1–5. Câu tự luận chỉ ở ô Viết: mỗi lần rút đúng 1 câu. */
  { id: "van12-ck1-de1", title: "Ngữ văn 12 · Cuối kì I · Đề 1", grade: 12, subject: "Ngữ văn", minutes: 45, n: 25, file: "12-van.js" },
  { id: "van12-ck1-de2", title: "Ngữ văn 12 · Cuối kì I · Đề 2", grade: 12, subject: "Ngữ văn", minutes: 45, n: 25, file: "12-van.js" },
  { id: "van12-ck1-ngau-nhien", title: "Ngữ văn 12 · Cuối kì I · Đề ngẫu nhiên", grade: 12, subject: "Ngữ văn", minutes: 45, n: 25, file: "12-van.js",
    pool: { from: ["van12-ck1-de1", "van12-ck1-de2"], matrix: {
      "Khả năng lớn lao của tiểu thuyết": [1, 1, 1], "Những thế giới thơ": [1, 1, 1], "Lập luận trong văn bản nghị luận": [1, 1, 1],
      "Yếu tố kì ảo trong truyện kể": [1, 1, 1], "Tiếng cười của hài kịch": [1, 1, 1], "Nói mỉa": [1, 0, 0], "Nghịch ngữ": [1, 0, 0],
      "Biện pháp tu từ trong thơ": [0, 1, 0], "Lỗi logic": [1, 1, 0], "Lỗi câu mơ hồ": [1, 0, 1], "Điển cố": [1, 1, 0], "Viết": [0, 0, 1] } } },

  /* Tiếng Anh 12 · Kiểm tra cuối học kì I (Global Success 12, Units 1–5, Review 1, 2; Phiên N12-ck1-ta). Khối 12 chưa bật
     (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 25 câu riêng trong file (1 đoạn điền, 1 bài đọc) + 50 câu của 2 đề cố
     định (mỗi đề 1 đoạn điền, 1 bài đọc), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu như kho Tiếng Anh 9
     cuối kì I, trọng tâm Units 4–5: Pronunciation 2 (nguyên âm đôi của Unit 1–3; trọng âm trong câu của Unit 4, 5), Unit 1, 2, 3 mỗi
     Unit 3, Unit 4, 5 mỗi Unit 4, Cloze 3 (một đoạn điền 3 chỗ trống mức 1-2-3, như phần điền đoạn văn của đề thi tốt nghiệp),
     Reading 3 (một bài đọc 3 câu mức 1-2-3). Hai đề cố định và câu riêng đều chia đúng ma trận nên ô (chủ đề, mức) nào cũng có gấp ba
     số câu ô đó rút. Không có câu nghe, không có câu tự luận. */
  { id: "ta12-ck1-de1", title: "Tiếng Anh 12 · Cuối kì I · Đề 1", grade: 12, subject: "Tiếng Anh", minutes: 45, n: 25, file: "12-ta.js" },
  { id: "ta12-ck1-de2", title: "Tiếng Anh 12 · Cuối kì I · Đề 2", grade: 12, subject: "Tiếng Anh", minutes: 45, n: 25, file: "12-ta.js" },
  { id: "ta12-ck1-ngau-nhien", title: "Tiếng Anh 12 · Cuối kì I · Đề ngẫu nhiên", grade: 12, subject: "Tiếng Anh", minutes: 45, n: 25, file: "12-ta.js",
    pool: { from: ["ta12-ck1-de1", "ta12-ck1-de2"], matrix: {
      "Pronunciation": [1, 1, 0], "Unit 1 · Life Stories We Admire": [1, 1, 1], "Unit 2 · A Multicultural World": [1, 1, 1],
      "Unit 3 · Green Living": [1, 1, 1], "Unit 4 · Urbanisation": [2, 1, 1], "Unit 5 · The World of Work": [2, 1, 1],
      "Cloze": [1, 1, 1], "Reading": [1, 1, 1] } } },

  /* Vật lí 12 · Kiểm tra cuối học kì I (Kết nối tri thức, Vật lí 12, Bài 1–13: Chương I Vật lí nhiệt, Chương II Khí lí tưởng, trọng
     tâm Chương II; Phiên N12-ck1-vatli-hoahoc). Khối 12 chưa bật (data/grades.js) nên đề chưa hiện với gia đình. Trường đã học thêm
     Bài 14–15 (Từ trường) trước khi kiểm tra thì đối chiếu đề cương (lời dặn của đề). Kho câu = 50 câu của 2 đề cố định, không có câu
     riêng. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 11 chủ đề theo tên Bài 1–6, 8–12 (tên Bài 12 rút gọn; Bài 7, 13 là bài
     tập nên không ra chủ đề riêng): Chương I 11 câu, Chương II 14 câu. Hai đề cố định chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có
     gấp đôi số câu ô đó rút. Hai câu tự luận ở hai ô Vận dụng rút 1 câu (Nhiệt hoá hơi riêng; Phương trình trạng thái của khí lí
     tưởng): mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "vatli12-ck1-de1", title: "Vật lí 12 · Cuối kì I · Đề 1", grade: 12, subject: "Vật lí", minutes: 45, n: 25, file: "12-vatli.js" },
  { id: "vatli12-ck1-de2", title: "Vật lí 12 · Cuối kì I · Đề 2", grade: 12, subject: "Vật lí", minutes: 45, n: 25, file: "12-vatli.js" },
  { id: "vatli12-ck1-ngau-nhien", title: "Vật lí 12 · Cuối kì I · Đề ngẫu nhiên", grade: 12, subject: "Vật lí", minutes: 45, n: 25, file: "12-vatli.js",
    pool: { from: ["vatli12-ck1-de1", "vatli12-ck1-de2"], matrix: {
      "Cấu trúc của chất. Sự chuyển thể": [1, 1, 0], "Nội năng. Định luật I của nhiệt động lực học": [1, 1, 1],
      "Nhiệt độ. Thang nhiệt độ – nhiệt kế": [1, 1, 0], "Nhiệt dung riêng": [1, 0, 1], "Nhiệt nóng chảy riêng": [0, 1, 0],
      "Nhiệt hoá hơi riêng": [0, 0, 1], "Mô hình động học phân tử chất khí": [2, 1, 0], "Định luật Boyle": [1, 1, 1],
      "Định luật Charles": [1, 1, 1], "Phương trình trạng thái của khí lí tưởng": [1, 0, 1],
      "Áp suất khí. Động năng phân tử và nhiệt độ": [1, 1, 1] } } },

  /* Hoá học 12 · Kiểm tra cuối học kì I (Kết nối tri thức, Hoá học 12, Bài 1–15: Chương 1–4 và Bài 15 Thế điện cực và nguồn điện hoá
     học của Chương 5, trọng tâm Chương 3–5; Phiên N12-ck1-vatli-hoahoc). Phạm vi theo nguồn đa số (đề cương, đề học kì I dừng ở Bài 15);
     Bài 16 Điện phân để sang kho giữa kì II, trường đã học Bài 16 thì đối chiếu đề cương (lời dặn của đề). Khối 12 chưa bật nên đề chưa
     hiện với gia đình. Kho câu = 50 câu của 2 đề cố định, không có câu riêng. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 11 chủ
     đề theo tên bài (các bài ôn tập chương không ra chủ đề riêng): Chương 1–2 9 câu, Chương 3–4 12 câu, Bài 15 4 câu. Hai đề cố định
     chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. Hai câu tự luận ở hai ô Vận dụng rút 1 câu (Ester –
     Lipid; Tinh bột và cellulose): mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "hoahoc12-ck1-de1", title: "Hóa học 12 · Cuối kì I · Đề 1", grade: 12, subject: "Hóa học", minutes: 45, n: 25, file: "12-hoahoc.js" },
  { id: "hoahoc12-ck1-de2", title: "Hóa học 12 · Cuối kì I · Đề 2", grade: 12, subject: "Hóa học", minutes: 45, n: 25, file: "12-hoahoc.js" },
  { id: "hoahoc12-ck1-ngau-nhien", title: "Hóa học 12 · Cuối kì I · Đề ngẫu nhiên", grade: 12, subject: "Hóa học", minutes: 45, n: 25, file: "12-hoahoc.js",
    pool: { from: ["hoahoc12-ck1-de1", "hoahoc12-ck1-de2"], matrix: {
      "Ester – Lipid": [1, 1, 1], "Xà phòng và chất giặt rửa": [1, 0, 0], "Giới thiệu về carbohydrate. Glucose và fructose": [1, 0, 1],
      "Saccharose và maltose": [0, 1, 0], "Tinh bột và cellulose": [1, 0, 1], "Amine": [1, 1, 1], "Amino acid và peptide": [1, 1, 1],
      "Protein và enzyme": [1, 1, 0], "Đại cương về polymer": [1, 1, 0], "Vật liệu polymer": [1, 1, 0],
      "Thế điện cực và nguồn điện hoá học": [1, 1, 2] } } },

  /* Đề thử nghiệm các dạng câu mới (Phiên K2), không gắn kì thi: hiện ở nhóm "Bài ôn khác" của lớp 6 */
  { id: "thunghiem6-dang-cau-moi", title: "Đề thử nghiệm · Các dạng câu mới", grade: 6, subject: "Thử nghiệm", minutes: 30, n: 15, file: "6-thunghiem.js" }
];
