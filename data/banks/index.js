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
   congnghe, tincn (Tin học và Công nghệ), vatli (Vật lí), hoahoc (Hoá học), sinhhoc (Sinh học), ktpl (Giáo dục kinh tế và pháp
   luật), lichsu (Lịch sử), diali (Địa lí), thunghiem (đề thử nghiệm). Môn mới thì đặt mã mới,
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
     Đề có cả câu chấm tự động và câu tự luận (Phiên 9u, L47; Ngữ văn thi thử) ghi thêm auto sau pts: điểm tối đa của phần app chấm
     (tổng pt của các câu không phải tự luận, ví dụ pts: 10, auto: 3), để app biết trước khi tải file câu hỏi: màn kết quả, thẻ "Lần
     trước", dòng bài ghi "3/3 điểm phần app chấm"; điểm trung bình, tỉ lệ đúng quy phần app chấm về thang của đề (r × pts / auto).
     Đề toàn tự luận (Toán thi thử vào 10) và đề không có tự luận không ghi auto. tests/kiem-tra-de.js kiểm tra: có auto khi và chỉ khi
     0 < tổng đó < pts, và auto bằng tổng đó; tests/ghep-de.js tự ghi auto từ câu của đề nháp.
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
  /* Ngân hàng Toán 4 giữa kì II (Phiên N7, nâng hai đề có sẵn lên ngân hàng): kho câu = 76 câu riêng trong file (Phiên
     BS4-toan-tv thêm 20 câu cho các chủ đề dưới 10 câu chấm tự động) + 50 câu của 2 đề cố định ở trên (giữ nguyên câu, chỉ thêm
     mức độ), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu trên 14 chủ đề như hai
     đề cố định; ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó rút.
     Ba câu tự luận ở ô Vận dụng của “Phép chia”, “Số trung bình cộng”, “Rút về đơn vị” (mỗi ô rút 1 câu). */
  { id: "toan4-gk2-ngau-nhien", title: "Toán 4 · Giữa kì II · Đề ngẫu nhiên", grade: 4, subject: "Toán", minutes: 40, n: 25, file: "4-toan.js",
    pool: { from: ["toan4-gk2-de1", "toan4-gk2-de2"], matrix: {
      "Phép nhân": [1, 1, 1], "Phép chia": [1, 1, 1], "Tính chất phép nhân": [1, 1, 1], "Nhân, chia với 10, 100, 1 000": [1, 0, 0],
      "Ước lượng": [0, 1, 0], "Số trung bình cộng": [1, 0, 1], "Rút về đơn vị": [0, 1, 1], "Dãy số liệu, biểu đồ cột": [1, 1, 1],
      "Số lần xuất hiện của sự kiện": [1, 0, 0], "Phân số": [1, 0, 0], "Tính chất cơ bản của phân số": [1, 0, 0], "Rút gọn phân số": [0, 1, 0],
      "Quy đồng mẫu số": [0, 1, 0], "So sánh phân số": [1, 0, 1] } } },
  /* Ngân hàng Tiếng Việt 4 giữa kì II (Phiên N7b, nâng hai đề có sẵn lên ngân hàng): kho câu = 57 câu riêng trong file (5
     đoạn đọc, 6 câu Viết; Phiên BS4-toan-tv thêm 7 câu trạng ngữ cuối) + 50 câu của 2 đề cố định ở trên (giữ nguyên câu, chỉ
     thêm mức độ), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu, trong đó 7
     câu Đọc hiểu (rút theo đoạn: đoạn 4 câu mức 1-1-2-3, đoạn 3 câu mức 1-2-3, nên lần nào cũng đúng mức; câu đọc hiểu của
     hai đề cố định chép đoạn văn trong từng câu nên là câu lẻ, được rút khi đã làm hết các đoạn) và 1 câu Viết (tự chấm, nên
     40 phút; hai đề cố định 35 phút). 17 câu Luyện từ và câu, Chính tả trên các chủ đề của hai đề cố định, chia theo các bài
     Luyện từ và câu Bài 1–15: câu 2 (Bài 1), chủ ngữ 3, vị ngữ 3 (Bài 3, 5, 7, 9), trạng ngữ 1 (Bài 11), trạng ngữ chỉ thời
     gian, nơi chốn 2 (Bài 13), chỉ nguyên nhân, mục đích 2 (Bài 15), mở rộng vốn từ theo hai chủ điểm 3, chính tả 1. Cả 50
     câu của hai đề cố định nằm ở ô có rút; câu riêng ở ô nào cũng ít nhất bằng số câu ô đó rút, nên ô (chủ đề, mức) nào cũng
     có ít nhất gấp đôi số câu ô đó rút và học sinh đã làm hai đề cố định vẫn gặp câu mới. */
  { id: "tv4-gk2-ngau-nhien", title: "Tiếng Việt 4 · Giữa kì II · Đề ngẫu nhiên", grade: 4, subject: "Tiếng Việt", minutes: 40, n: 25, file: "4-tv.js",
    pool: { from: ["tv4-gk2-de1", "tv4-gk2-de2"], matrix: {
      "Đọc hiểu": [3, 2, 2], "Câu": [1, 1, 0], "Chủ ngữ": [1, 1, 1], "Vị ngữ": [1, 1, 1], "Trạng ngữ": [1, 0, 0],
      "Trạng ngữ chỉ thời gian, nơi chốn": [1, 1, 0], "Trạng ngữ chỉ nguyên nhân, mục đích": [0, 1, 1], "Mở rộng vốn từ": [1, 1, 1],
      "Chính tả": [1, 0, 0], "Viết": [0, 0, 1] } } },

  /* Toán 4 · Kiểm tra cuối năm học (Kết nối tri thức, cả năm, trọng tâm học kì II Bài 38–73; Phiên N13). Kho câu = 57 câu riêng
     trong file (Phiên BS4-toan-tv thêm 7 câu) + 50 câu của 2 đề cố định, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng]
     theo Thông tư 27/2020: 10 – 8 – 7 câu trên 18 chủ đề: phân số 10 câu (Bài 53–66), số tự nhiên và phép tính 7 (Bài 38–48, ôn số
     có nhiều chữ số), thống kê và xác suất 3 (Bài 49–52), hình học và đo lường 5 (ôn học kì I); chữ chủ đề như kho giữa kì II, cuối
     kì I, thêm “Cộng, trừ phân số”, “Nhân, chia phân số”, “Tìm phân số của một số”. Mỗi ô (chủ đề, mức) rút 1 câu và có từ 4 câu:
     một câu ở mỗi đề cố định, hai câu riêng trở lên, nên học sinh đã làm một đề cố định vẫn gặp câu mới. Ba câu tự luận chỉ ở ba ô
     Vận dụng (Số trung bình cộng, Rút về đơn vị, Tìm phân số của một số): mỗi lần rút nhiều nhất 3 câu tự luận. */
  { id: "toan4-ck2-de1", title: "Toán 4 · Cuối năm · Đề 1", grade: 4, subject: "Toán", minutes: 40, n: 25, file: "4-toan.js" },
  { id: "toan4-ck2-de2", title: "Toán 4 · Cuối năm · Đề 2", grade: 4, subject: "Toán", minutes: 40, n: 25, file: "4-toan.js" },
  { id: "toan4-ck2-ngau-nhien", title: "Toán 4 · Cuối năm · Đề ngẫu nhiên", grade: 4, subject: "Toán", minutes: 40, n: 25, file: "4-toan.js",
    pool: { from: ["toan4-ck2-de1", "toan4-ck2-de2"], matrix: {
      "Số có nhiều chữ số": [1, 1, 0], "Phép nhân": [1, 0, 0], "Phép chia": [0, 1, 0], "Tính chất phép nhân": [0, 0, 1],
      "Số trung bình cộng": [0, 0, 1], "Rút về đơn vị": [0, 0, 1], "Phân số": [1, 0, 0], "Rút gọn phân số": [0, 1, 0],
      "Quy đồng mẫu số": [0, 1, 0], "So sánh phân số": [1, 0, 0], "Cộng, trừ phân số": [1, 0, 1], "Nhân, chia phân số": [1, 1, 0],
      "Tìm phân số của một số": [0, 1, 1], "Dãy số liệu, biểu đồ cột": [1, 1, 0], "Số lần xuất hiện của sự kiện": [1, 0, 0],
      "Đơn vị đo": [1, 0, 1], "Đường thẳng vuông góc, song song": [1, 0, 0], "Hình bình hành, hình thoi": [0, 1, 1] } } },

  /* Tiếng Việt 4 · Kiểm tra cuối năm học (Kết nối tri thức, tập 2, trọng tâm Bài 17–30; Phiên N14). Kho câu = 70 câu riêng
     trong file (4 đoạn đọc, 4 câu Viết; Phiên BS4-toan-tv thêm 18 câu Luyện từ và câu cuối) + 50 câu của 2 đề cố định (mỗi đề
     2 đoạn đọc, 1 câu Viết), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu,
     trong đó 7 câu Đọc hiểu (rút theo đoạn: đoạn 4 câu mức 1-1-2-3, đoạn 3 câu mức 1-2-3, nên lần nào cũng đúng mức), 1 câu
     Viết (tự chấm, nên cả ba đề 40 phút) và 17 câu Luyện từ và câu, Chính tả trên 14 chủ đề: các bài Luyện từ và câu của Bài
     17–29 (trạng ngữ chỉ phương tiện 2, dấu ngoặc kép 2, dấu ngoặc đơn 1, viết tên cơ quan, tổ chức 1, lựa chọn từ ngữ 2, dấu
     câu 1) và ôn tập (câu, chủ ngữ, vị ngữ, trạng ngữ, danh từ, động từ, tính từ, chính tả, mỗi chủ đề 1). Hai đề cố định
     chia đúng theo ma trận; mỗi ô (chủ đề, mức) Luyện từ và câu, Chính tả rút 1 câu và có từ 4 câu (một câu ở mỗi đề cố định,
     hai câu riêng trở lên), nên học sinh đã làm một đề cố định vẫn gặp câu mới. Câu tự luận chỉ ở ô Viết: mỗi lần rút đúng 1
     câu. */
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

  /* Toán 9 · Thi thử vào 10 (đề tính điểm, Phiên K5; Phiên N9-vao10-toan, N9-vao10-toan-b, N9-vao10-toan-c). Khung đề theo đề minh hoạ tuyển sinh lớp 10 của TP.HCM
     năm 2026: 120 phút, 10 điểm, 7 bài tự luận (Bài 1 hàm số y = ax², Bài 2 phương trình bậc hai và định lí Viète, Bài 3 thống kê,
     xác suất, Bài 4 lập biểu thức, Bài 5 đo lường thực tế, Bài 6 bài toán thực tế dẫn đến phương trình, bất phương trình hoặc hệ,
     Bài 7 hình học phẳng về đường tròn 3 điểm). Mỗi ý là một câu tự luận tự chấm (15 ý mỗi đề), nên đề chỉ có điểm tự chấm, không có
     kết quả vào điểm trung bình. Đề cố định, không có đề ngẫu nhiên (pts không đi với pool); cách viết ở đầu phần đề này trong
     data/banks/9-toan.js. Khối 9 chưa bật nên đề chưa hiện với gia đình. */
  { id: "toan9-vao10-de1", title: "Toán 9 · Thi thử vào 10 · Đề 1", grade: 9, subject: "Toán", minutes: 120, n: 15, file: "9-toan.js", pts: 10 },
  { id: "toan9-vao10-de2", title: "Toán 9 · Thi thử vào 10 · Đề 2", grade: 9, subject: "Toán", minutes: 120, n: 15, file: "9-toan.js", pts: 10 },
  { id: "toan9-vao10-de3", title: "Toán 9 · Thi thử vào 10 · Đề 3", grade: 9, subject: "Toán", minutes: 120, n: 15, file: "9-toan.js", pts: 10 },
  { id: "toan9-vao10-de4", title: "Toán 9 · Thi thử vào 10 · Đề 4", grade: 9, subject: "Toán", minutes: 120, n: 15, file: "9-toan.js", pts: 10 },
  { id: "toan9-vao10-de5", title: "Toán 9 · Thi thử vào 10 · Đề 5", grade: 9, subject: "Toán", minutes: 120, n: 15, file: "9-toan.js", pts: 10 },
  { id: "toan9-vao10-de6", title: "Toán 9 · Thi thử vào 10 · Đề 6", grade: 9, subject: "Toán", minutes: 120, n: 15, file: "9-toan.js", pts: 10 },
  { id: "toan9-vao10-de7", title: "Toán 9 · Thi thử vào 10 · Đề 7", grade: 9, subject: "Toán", minutes: 120, n: 15, file: "9-toan.js", pts: 10 },
  { id: "toan9-vao10-de8", title: "Toán 9 · Thi thử vào 10 · Đề 8", grade: 9, subject: "Toán", minutes: 120, n: 15, file: "9-toan.js", pts: 10 },
  { id: "toan9-vao10-de9", title: "Toán 9 · Thi thử vào 10 · Đề 9", grade: 9, subject: "Toán", minutes: 120, n: 15, file: "9-toan.js", pts: 10 },
  { id: "toan9-vao10-de10", title: "Toán 9 · Thi thử vào 10 · Đề 10", grade: 9, subject: "Toán", minutes: 120, n: 15, file: "9-toan.js", pts: 10 },

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

  /* Ngữ văn 9 · Thi thử vào 10 (đề tính điểm, Phiên K5; Phiên N9-vao10-van). Khung đề theo đề minh hoạ tuyển sinh lớp 10 của TP.HCM
     năm 2026: 120 phút, 10 điểm; Phần I một văn bản văn học (đọc hiểu 3 điểm, đoạn văn nghị luận văn học khoảng 200 chữ 2 điểm),
     Phần II một văn bản nghị luận hoặc thông tin (đọc hiểu 1 điểm, bài văn nghị luận xã hội 4 điểm). Đề cố định, không có đề ngẫu
     nhiên (pts không đi với pool). Câu đọc hiểu phần lớn chấm tự động, câu viết và câu nêu ý kiến tự chấm; cách viết ở đầu phần đề
     này trong data/banks/9-van.js. Khối 9 chưa bật nên đề chưa hiện với gia đình. Đề 1: truyện ngắn, văn bản nghị luận; Đề 2: thơ tám
     chữ, văn bản thông tin; Đề 3 (Phiên N9-vao10-van-b): du kí, văn bản nghị luận; Đề 4: thơ tự do, văn bản thông tin; Đề 5 (Phiên
     N9-vao10-van-c): truyện khoa học viễn tưởng, văn bản nghị luận; Đề 6: tuỳ bút, văn bản thông tin. */
  { id: "van9-vao10-de1", title: "Ngữ văn 9 · Thi thử vào 10 · Đề 1", grade: 9, subject: "Ngữ văn", minutes: 120, n: 10, file: "9-van.js", pts: 10, auto: 3 },
  { id: "van9-vao10-de2", title: "Ngữ văn 9 · Thi thử vào 10 · Đề 2", grade: 9, subject: "Ngữ văn", minutes: 120, n: 9, file: "9-van.js", pts: 10, auto: 3.5 },
  { id: "van9-vao10-de3", title: "Ngữ văn 9 · Thi thử vào 10 · Đề 3", grade: 9, subject: "Ngữ văn", minutes: 120, n: 10, file: "9-van.js", pts: 10, auto: 3.5 },
  { id: "van9-vao10-de4", title: "Ngữ văn 9 · Thi thử vào 10 · Đề 4", grade: 9, subject: "Ngữ văn", minutes: 120, n: 10, file: "9-van.js", pts: 10, auto: 3.5 },
  { id: "van9-vao10-de5", title: "Ngữ văn 9 · Thi thử vào 10 · Đề 5", grade: 9, subject: "Ngữ văn", minutes: 120, n: 10, file: "9-van.js", pts: 10, auto: 3.5 },
  { id: "van9-vao10-de6", title: "Ngữ văn 9 · Thi thử vào 10 · Đề 6", grade: 9, subject: "Ngữ văn", minutes: 120, n: 10, file: "9-van.js", pts: 10, auto: 3.5 },

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

  /* KHTN 9 · Kiểm tra giữa học kì I (Kết nối tri thức, Khoa học tự nhiên 9; Phiên N9-gk1-khtn). Khối 9 chưa bật nên đề chưa hiện với
     gia đình. Phạm vi mặc định PO chọn, phần chung của ma trận đề giữa kì I và phân phối chương trình dạy song song ba phân môn (nguồn ở
     mục 7 của docs/KE-HOACH-NOI-DUNG.md): Bài 1 (dụng cụ, hoá chất) 2 câu, Vật lí Bài 2–5 8 câu, Hoá học Bài 22–25 8 câu, Sinh học
     Bài 36–38 7 câu; trường dạy theo thứ tự khác thì xem đề cương của trường (note của đề có ghi). Kho câu = 25 câu riêng trong file +
     50 câu của 2 đề cố định, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 12 chủ đề theo tên bài của sách
     (11 chủ đề đúng chữ của kho cuối kì I; chủ đề Bài 1 rút gọn tên bài): ô Biết của Bài 1 rút 2 câu, các ô khác rút nhiều nhất 1 câu.
     Hai đề cố định và 25 câu riêng đều chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp ba số câu ô đó rút. Không có câu tự luận. */
  { id: "khtn9-gk1-de1", title: "KHTN 9 · Giữa kì I · Đề 1", grade: 9, subject: "KHTN", minutes: 45, n: 25, file: "9-khtn.js" },
  { id: "khtn9-gk1-de2", title: "KHTN 9 · Giữa kì I · Đề 2", grade: 9, subject: "KHTN", minutes: 45, n: 25, file: "9-khtn.js" },
  { id: "khtn9-gk1-ngau-nhien", title: "KHTN 9 · Giữa kì I · Đề ngẫu nhiên", grade: 9, subject: "KHTN", minutes: 45, n: 25, file: "9-khtn.js",
    pool: { from: ["khtn9-gk1-de1", "khtn9-gk1-de2"], matrix: {
      "Nhận biết một số dụng cụ, hoá chất": [2, 0, 0], "Động năng. Thế năng": [0, 1, 1], "Cơ năng": [0, 1, 1],
      "Công và công suất": [1, 0, 1], "Khúc xạ ánh sáng": [1, 1, 0], "Giới thiệu về hợp chất hữu cơ": [1, 1, 0], "Alkane": [1, 0, 1],
      "Alkene": [0, 1, 1], "Nguồn nhiên liệu": [1, 1, 0], "Khái quát về di truyền học": [1, 1, 0],
      "Các quy luật di truyền của Mendel": [1, 1, 1], "Nucleic acid và gene": [1, 0, 1] } } },

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

  /* Lịch sử và Địa lí 9 · Kiểm tra giữa học kì I (Kết nối tri thức, bản chỉnh sửa năm 2026; Lịch sử Bài 1–8, Địa lí Bài 1–8; Phiên
     N9-gk1-lsdl-gdcd). Khối 9 chưa bật nên đề chưa hiện với gia đình. Phạm vi theo ma trận đề giữa kì I tra được. Kho câu = 50 câu của 2
     đề cố định (không có câu riêng), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu, theo khung đề định kì (Công
     văn 7991): 12 câu Lịch sử (Bài 4, 5, 7, 8 mỗi bài 2 câu, các bài khác 1 câu; chữ chủ đề như kho cuối kì I), 13 câu Địa lí (Nông
     nghiệp 3 câu, gồm bài thực hành Bài 7; Lao động và việc làm gồm bài thực hành Bài 4; các chủ đề khác mỗi chủ đề 2 câu). Hai đề cố
     định chia đúng theo ma trận, nên ô (chủ đề, mức) nào cũng có đúng 2 câu, gấp đôi số câu ô đó rút. */
  { id: "lsdl9-gk1-de1", title: "Lịch sử và Địa lí 9 · Giữa kì I · Đề 1", grade: 9, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "9-lsdl.js" },
  { id: "lsdl9-gk1-de2", title: "Lịch sử và Địa lí 9 · Giữa kì I · Đề 2", grade: 9, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "9-lsdl.js" },
  { id: "lsdl9-gk1-ngau-nhien", title: "Lịch sử và Địa lí 9 · Giữa kì I · Đề ngẫu nhiên", grade: 9, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "9-lsdl.js",
    pool: { from: ["lsdl9-gk1-de1", "lsdl9-gk1-de2"], matrix: {
      "Nước Nga và Liên Xô (1918 – 1945)": [1, 0, 0], "Châu Âu và nước Mỹ (1918 – 1945)": [0, 1, 0], "Châu Á (1918 – 1945)": [1, 0, 0],
      "Chiến tranh thế giới thứ hai": [1, 0, 1], "Phong trào dân tộc dân chủ (1918 – 1930)": [1, 1, 0],
      "Nguyễn Ái Quốc và sự thành lập Đảng": [0, 1, 0], "Phong trào cách mạng (1930 – 1939)": [1, 0, 1], "Cách mạng tháng Tám năm 1945": [0, 1, 1],
      "Dân tộc và dân số": [1, 0, 1], "Phân bố dân cư và quần cư": [1, 1, 0], "Lao động và việc làm": [0, 1, 1], "Nông nghiệp": [1, 1, 1],
      "Lâm nghiệp và thuỷ sản": [1, 0, 1], "Công nghiệp": [1, 1, 0] } } },

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

  /* GDCD 9 · Kiểm tra giữa học kì I (Kết nối tri thức; Bài 1–3; Phiên N9-gk1-lsdl-gdcd). Khối 9 chưa bật nên đề chưa hiện với gia
     đình. Kho câu = 50 câu của 2 đề cố định (không có câu riêng), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu,
     theo khung đề định kì (Công văn 7991): Sống có lí tưởng, Khoan dung mỗi bài 8 câu, Tích cực tham gia các hoạt động cộng đồng 9 câu
     (chữ chủ đề như kho cuối kì I), câu tình huống là chính. Hai đề cố định chia đúng theo ma trận, nên ô (chủ đề, mức) nào cũng có gấp
     đôi số câu ô đó rút. */
  { id: "gdcd9-gk1-de1", title: "GDCD 9 · Giữa kì I · Đề 1", grade: 9, subject: "GDCD", minutes: 35, n: 25, file: "9-gdcd.js" },
  { id: "gdcd9-gk1-de2", title: "GDCD 9 · Giữa kì I · Đề 2", grade: 9, subject: "GDCD", minutes: 35, n: 25, file: "9-gdcd.js" },
  { id: "gdcd9-gk1-ngau-nhien", title: "GDCD 9 · Giữa kì I · Đề ngẫu nhiên", grade: 9, subject: "GDCD", minutes: 35, n: 25, file: "9-gdcd.js",
    pool: { from: ["gdcd9-gk1-de1", "gdcd9-gk1-de2"], matrix: {
      "Sống có lí tưởng": [3, 3, 2], "Khoan dung": [3, 3, 2], "Hoạt động cộng đồng": [4, 2, 3] } } },

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

  /* Tin học 9 · Kiểm tra giữa học kì I (Kết nối tri thức, Tin học 9, Bài 1–4; Phiên N9-gk1-tin-congnghe). Khối 9 chưa bật nên đề
     chưa hiện với gia đình. Phạm vi theo đề giữa kì I tra được (Bài 1, 2, 4; Bài 3 là bài thực hành của Bài 2, hỏi qua tình huống ở
     chủ đề của Bài 2); chữ chủ đề như kho cuối kì I (đề “Ôn chủ đề” rút chung câu hai kho). Kho câu = 50 câu của 2 đề cố định, không
     có câu riêng; ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7: Bài 1, Bài 4 mỗi bài 8 câu, Bài 2 (cả Bài 3) 9 câu; hai đề cố định chia
     đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. */
  { id: "tin9-gk1-de1", title: "Tin học 9 · Giữa kì I · Đề 1", grade: 9, subject: "Tin học", minutes: 35, n: 25, file: "9-tin.js" },
  { id: "tin9-gk1-de2", title: "Tin học 9 · Giữa kì I · Đề 2", grade: 9, subject: "Tin học", minutes: 35, n: 25, file: "9-tin.js" },
  { id: "tin9-gk1-ngau-nhien", title: "Tin học 9 · Giữa kì I · Đề ngẫu nhiên", grade: 9, subject: "Tin học", minutes: 35, n: 25, file: "9-tin.js",
    pool: { from: ["tin9-gk1-de1", "tin9-gk1-de2"], matrix: {
      "Thế giới kĩ thuật số": [4, 2, 2], "Thông tin trong giải quyết vấn đề": [3, 3, 3], "Một số vấn đề pháp lí về sử dụng dịch vụ Internet": [3, 3, 2] } } },

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

  /* Công nghệ 9 · Kiểm tra giữa học kì I (Kết nối tri thức, Công nghệ 9 – Định hướng nghề nghiệp, mô đun bắt buộc, Bài 1–3; Phiên
     N9-gk1-tin-congnghe). Khối 9 chưa bật nên đề chưa hiện với gia đình. Phạm vi theo đề giữa kì I tra được; chữ chủ đề như kho cuối
     kì I (đề “Ôn chủ đề” rút chung câu các kho). Kho câu = 50 câu của 2 đề cố định, không có câu riêng; ma trận [Biết, Hiểu, Vận dụng]
     10 – 8 – 7: Bài 1, Bài 2 mỗi bài 7 câu, Bài 3 11 câu (có phần tìm thông tin, đọc số liệu thị trường lao động); hai đề cố định chia
     đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. */
  { id: "congnghe9-gk1-de1", title: "Công nghệ 9 · Giữa kì I · Đề 1", grade: 9, subject: "Công nghệ", minutes: 35, n: 25, file: "9-congnghe.js" },
  { id: "congnghe9-gk1-de2", title: "Công nghệ 9 · Giữa kì I · Đề 2", grade: 9, subject: "Công nghệ", minutes: 35, n: 25, file: "9-congnghe.js" },
  { id: "congnghe9-gk1-ngau-nhien", title: "Công nghệ 9 · Giữa kì I · Đề ngẫu nhiên", grade: 9, subject: "Công nghệ", minutes: 35, n: 25, file: "9-congnghe.js",
    pool: { from: ["congnghe9-gk1-de1", "congnghe9-gk1-de2"], matrix: {
      "Nghề nghiệp trong lĩnh vực kĩ thuật và công nghệ": [4, 2, 1], "Cơ cấu hệ thống giáo dục quốc dân": [3, 2, 2],
      "Thị trường lao động kĩ thuật, công nghệ": [3, 4, 4] } } },

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

  /* Sinh học 12 · Kiểm tra cuối học kì I (Kết nối tri thức, Sinh học 12, Phần bốn Di truyền học, Bài 1–18: Chương 1 Di truyền phân tử,
     Chương 2 Di truyền nhiễm sắc thể, Chương 3 Mở rộng học thuyết di truyền nhiễm sắc thể, Chương 4 Di truyền quần thể, trọng tâm Bài 7–18;
     Phiên N12-ck1-sinhhoc-ktpl). Phạm vi theo ma trận cuối kì I tra được; lời dặn của đề nhắc phụ huynh đối chiếu đề cương của trường.
     Khối 12 chưa bật (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2 đề cố định, không có câu riêng. Ma trận
     [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 15 chủ đề theo tên bài (Bài 6, 14, 17 là bài thực hành nên không ra chủ đề riêng):
     Chương 1 7 câu, Chương 2 14 câu, Chương 3 2 câu, Chương 4 2 câu. Hai đề cố định chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có
     gấp đôi số câu ô đó rút. Hai câu tự luận ở hai ô Vận dụng rút 1 câu (Học thuyết di truyền Mendel; Di truyền học quần thể): mỗi lần
     rút nhiều nhất 2 câu tự luận. */
  { id: "sinhhoc12-ck1-de1", title: "Sinh học 12 · Cuối kì I · Đề 1", grade: 12, subject: "Sinh học", minutes: 45, n: 25, file: "12-sinhhoc.js" },
  { id: "sinhhoc12-ck1-de2", title: "Sinh học 12 · Cuối kì I · Đề 2", grade: 12, subject: "Sinh học", minutes: 45, n: 25, file: "12-sinhhoc.js" },
  { id: "sinhhoc12-ck1-ngau-nhien", title: "Sinh học 12 · Cuối kì I · Đề ngẫu nhiên", grade: 12, subject: "Sinh học", minutes: 45, n: 25, file: "12-sinhhoc.js",
    pool: { from: ["sinhhoc12-ck1-de1", "sinhhoc12-ck1-de2"], matrix: {
      "DNA và cơ chế tái bản DNA": [1, 0, 0], "Gene, hệ gene và quá trình truyền đạt thông tin di truyền": [1, 1, 1],
      "Điều hoà biểu hiện gene": [0, 1, 0], "Đột biến gene": [1, 0, 0], "Công nghệ gene": [1, 0, 0],
      "Cấu trúc và chức năng của nhiễm sắc thể": [1, 0, 0], "Học thuyết di truyền Mendel": [1, 1, 1], "Mở rộng học thuyết Mendel": [0, 1, 1],
      "Di truyền giới tính và di truyền liên kết với giới tính": [1, 0, 1], "Liên kết gene và hoán vị gene": [0, 1, 1],
      "Đột biến nhiễm sắc thể": [1, 0, 1], "Di truyền học người và di truyền y học": [1, 1, 0], "Di truyền gene ngoài nhân": [1, 0, 0],
      "Tương tác giữa kiểu gene với môi trường, thành tựu chọn giống": [0, 1, 0], "Di truyền học quần thể": [0, 1, 1] } } },

  /* GDKT&PL 12 · Kiểm tra cuối học kì I (Kết nối tri thức, Giáo dục kinh tế và pháp luật 12, Phần một Giáo dục kinh tế, Bài 1–7, trọng
     tâm Bài 4–7; Phiên N12-ck1-sinhhoc-ktpl). Phạm vi theo đề cương học kì I tra được; lời dặn của đề nhắc phụ huynh đối chiếu đề cương
     của trường. Khối 12 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2 đề cố định, không có câu riêng; câu tình huống là
     chính. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 7 chủ đề theo tên bài: Bài 1–3 mỗi bài 3 câu, Bài 4–7 mỗi bài 4 câu. Hai
     đề cố định chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. Một câu tự luận (Đề 1) ở ô Vận dụng rút 1
     câu của “Quản lí thu, chi trong gia đình”: mỗi lần rút nhiều nhất 1 câu tự luận. */
  { id: "ktpl12-ck1-de1", title: "GDKT&PL 12 · Cuối kì I · Đề 1", grade: 12, subject: "GDKT&PL", minutes: 45, n: 25, file: "12-ktpl.js" },
  { id: "ktpl12-ck1-de2", title: "GDKT&PL 12 · Cuối kì I · Đề 2", grade: 12, subject: "GDKT&PL", minutes: 45, n: 25, file: "12-ktpl.js" },
  { id: "ktpl12-ck1-ngau-nhien", title: "GDKT&PL 12 · Cuối kì I · Đề ngẫu nhiên", grade: 12, subject: "GDKT&PL", minutes: 45, n: 25, file: "12-ktpl.js",
    pool: { from: ["ktpl12-ck1-de1", "ktpl12-ck1-de2"], matrix: {
      "Tăng trưởng và phát triển kinh tế": [1, 1, 1], "Hội nhập kinh tế quốc tế": [1, 1, 1], "Bảo hiểm": [1, 1, 1], "An sinh xã hội": [2, 1, 1],
      "Lập kế hoạch kinh doanh": [2, 1, 1], "Trách nhiệm xã hội của doanh nghiệp": [2, 1, 1], "Quản lí thu, chi trong gia đình": [1, 2, 1] } } },

  /* Lịch sử 12 · Kiểm tra cuối học kì I (Kết nối tri thức, Lịch sử 12, Bài 1–8: Chủ đề 1 Thế giới trong và sau Chiến tranh lạnh, Chủ đề 2
     ASEAN: những chặng đường lịch sử, Chủ đề 3 đến hết Bài 8, trọng tâm Bài 6–8; Phiên N12-ck1-lichsu-diali). Phạm vi theo ma trận cuối kì I
     và đề học kì I năm học 2025–2026 tra được; lời dặn của đề nhắc phụ huynh đối chiếu đề cương của trường (có đề cương gồm Bài 6–11).
     Khối 12 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2 đề cố định, không có câu riêng. Ma trận [Biết, Hiểu, Vận dụng]
     10 – 8 – 7 câu trên 8 chủ đề theo tên bài (tên Bài 4 rút gọn): Bài 1–5 mỗi bài 2 câu, Bài 6–8 mỗi bài 5 câu. Hai đề cố định chia đúng
     ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. Hai câu tự luận ở hai ô Vận dụng rút 1 câu (Trật tự thế giới sau
     Chiến tranh lạnh; kháng chiến chống thực dân Pháp): mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "lichsu12-ck1-de1", title: "Lịch sử 12 · Cuối kì I · Đề 1", grade: 12, subject: "Lịch sử", minutes: 45, n: 25, file: "12-lichsu.js" },
  { id: "lichsu12-ck1-de2", title: "Lịch sử 12 · Cuối kì I · Đề 2", grade: 12, subject: "Lịch sử", minutes: 45, n: 25, file: "12-lichsu.js" },
  { id: "lichsu12-ck1-ngau-nhien", title: "Lịch sử 12 · Cuối kì I · Đề ngẫu nhiên", grade: 12, subject: "Lịch sử", minutes: 45, n: 25, file: "12-lichsu.js",
    pool: { from: ["lichsu12-ck1-de1", "lichsu12-ck1-de2"], matrix: {
      "Liên hợp quốc": [1, 1, 0], "Trật tự thế giới trong Chiến tranh lạnh": [1, 1, 0], "Trật tự thế giới sau Chiến tranh lạnh": [1, 0, 1],
      "Sự ra đời và phát triển của Hiệp hội các quốc gia Đông Nam Á": [1, 1, 0], "Cộng đồng ASEAN: Từ ý tưởng đến hiện thực": [0, 1, 1],
      "Cách mạng tháng Tám năm 1945": [2, 1, 2], "Cuộc kháng chiến chống thực dân Pháp (1945 – 1954)": [2, 2, 1],
      "Cuộc kháng chiến chống Mỹ, cứu nước (1954 – 1975)": [2, 1, 2] } } },

  /* Địa lí 12 · Kiểm tra cuối học kì I (Kết nối tri thức, Địa lí 12 bản chỉnh sửa năm 2026, Bài 1–19: Phần 1 Địa lí tự nhiên, Phần 2 Địa lí
     dân cư, Phần 3 đến hết công nghiệp, trọng tâm Bài 11–19; Phiên N12-ck1-lichsu-diali). Phạm vi theo hai ma trận cuối kì I tra được; lời
     dặn của đề nhắc phụ huynh đối chiếu đề cương của trường (một kế hoạch dạy học dừng học kì I ở dân cư). Khối 12 chưa bật nên đề chưa
     hiện với gia đình. Kho câu = 50 câu của 2 đề cố định, không có câu riêng. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 14 chủ đề
     theo tên bài (bài thực hành không ra chủ đề riêng; tên Bài 5 rút gọn): Phần 1 4 câu, Phần 2 3 câu, Phần 3 18 câu. Hai đề cố định chia
     đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. Hai câu tự luận ở hai ô Vận dụng rút 1 câu (lâm nghiệp và thuỷ
     sản; Một số ngành công nghiệp): mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "diali12-ck1-de1", title: "Địa lí 12 · Cuối kì I · Đề 1", grade: 12, subject: "Địa lí", minutes: 45, n: 25, file: "12-diali.js" },
  { id: "diali12-ck1-de2", title: "Địa lí 12 · Cuối kì I · Đề 2", grade: 12, subject: "Địa lí", minutes: 45, n: 25, file: "12-diali.js" },
  { id: "diali12-ck1-ngau-nhien", title: "Địa lí 12 · Cuối kì I · Đề ngẫu nhiên", grade: 12, subject: "Địa lí", minutes: 45, n: 25, file: "12-diali.js",
    pool: { from: ["diali12-ck1-de1", "diali12-ck1-de2"], matrix: {
      "Vị trí địa lí và phạm vi lãnh thổ": [1, 0, 0], "Thiên nhiên nhiệt đới ẩm gió mùa": [0, 1, 0], "Sự phân hoá đa dạng của thiên nhiên": [1, 0, 0],
      "Sử dụng hợp lí tài nguyên thiên nhiên và bảo vệ môi trường": [0, 1, 0], "Dân số Việt Nam": [0, 0, 1], "Lao động và việc làm": [1, 0, 0],
      "Đô thị hoá": [0, 1, 0], "Chuyển dịch cơ cấu kinh tế": [1, 1, 1], "Vấn đề phát triển ngành nông nghiệp": [1, 1, 1],
      "Vấn đề phát triển ngành lâm nghiệp và thuỷ sản": [1, 0, 1], "Tổ chức lãnh thổ nông nghiệp": [1, 1, 0],
      "Chuyển dịch cơ cấu ngành công nghiệp": [1, 1, 1], "Một số ngành công nghiệp": [1, 1, 1],
      "Một số hình thức tổ chức lãnh thổ công nghiệp": [1, 0, 1] } } },

  /* Tin học 12 · Kiểm tra cuối học kì I (Kết nối tri thức, Tin học 12, phần chung của hai sách Định hướng Tin học ứng dụng và Định hướng
     Khoa học máy tính, Bài 1–12: Chủ đề 1 Trí tuệ nhân tạo, Chủ đề 2 Mạng máy tính và Internet, Chủ đề 3 Bài 6, Chủ đề 4 HTML Bài 7–12,
     trọng tâm Bài 7–12; Phiên N12-ck1-tin-congnghe). Phạm vi theo ma trận cuối kì I tra được; lời dặn của đề nhắc phụ huynh đối chiếu đề
     cương của trường (có đề học kì I hỏi cả CSS, Bài 13–17). Khối 12 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2 đề cố
     định, không có câu riêng. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 12 chủ đề theo tên bài: Bài 1–6 11 câu (bài thực hành
     Bài 5 một câu tình huống), Bài 7–12 14 câu. Hai đề cố định chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút.
     Câu tự luận ở ô Vận dụng rút 1 câu: mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "tin12-ck1-de1", title: "Tin học 12 · Cuối kì I · Đề 1", grade: 12, subject: "Tin học", minutes: 45, n: 25, file: "12-tin.js" },
  { id: "tin12-ck1-de2", title: "Tin học 12 · Cuối kì I · Đề 2", grade: 12, subject: "Tin học", minutes: 45, n: 25, file: "12-tin.js" },
  { id: "tin12-ck1-ngau-nhien", title: "Tin học 12 · Cuối kì I · Đề ngẫu nhiên", grade: 12, subject: "Tin học", minutes: 45, n: 25, file: "12-tin.js",
    pool: { from: ["tin12-ck1-de1", "tin12-ck1-de2"], matrix: {
      "Làm quen với Trí tuệ nhân tạo": [1, 1, 0], "Trí tuệ nhân tạo trong khoa học và đời sống": [0, 1, 1], "Một số thiết bị mạng thông dụng": [1, 1, 0],
      "Giao thức mạng": [1, 1, 0], "Thực hành chia sẻ tài nguyên trên mạng": [0, 0, 1], "Giao tiếp và ứng xử trong không gian mạng": [1, 0, 1],
      "HTML và cấu trúc trang web": [1, 1, 0], "Định dạng văn bản": [1, 1, 1], "Tạo danh sách, bảng": [1, 1, 1], "Tạo liên kết": [1, 0, 1],
      "Chèn tệp tin đa phương tiện và khung nội tuyến vào trang web": [1, 1, 0], "Tạo biểu mẫu": [1, 0, 1] } } },

  /* Công nghệ 12 · Kiểm tra cuối học kì I (Kết nối tri thức, Công nghệ 12 – Công nghệ điện – điện tử, Phần một Công nghệ điện, Chương I–IV,
     Bài 1–12, trọng tâm Chương II–IV; Phiên N12-ck1-tin-congnghe). Phạm vi theo ma trận cuối kì I tra được (hai nguồn khác cùng Bài 1–12);
     trường học sách Lâm nghiệp – Thuỷ sản hay đã học sang Phần hai thì đối chiếu đề cương (lời dặn của đề). Khối 12 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50 câu
     của 2 đề cố định, không có câu riêng. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 12 chủ đề theo tên bài: Chương I 4 câu,
     Chương II 11 câu, Chương III 6 câu, Chương IV 4 câu. Hai đề cố định chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô
     đó rút. Câu tự luận ở ô Vận dụng rút 1 câu: mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "congnghe12-ck1-de1", title: "Công nghệ 12 · Cuối kì I · Đề 1", grade: 12, subject: "Công nghệ", minutes: 45, n: 25, file: "12-congnghe.js" },
  { id: "congnghe12-ck1-de2", title: "Công nghệ 12 · Cuối kì I · Đề 2", grade: 12, subject: "Công nghệ", minutes: 45, n: 25, file: "12-congnghe.js" },
  { id: "congnghe12-ck1-ngau-nhien", title: "Công nghệ 12 · Cuối kì I · Đề ngẫu nhiên", grade: 12, subject: "Công nghệ", minutes: 45, n: 25, file: "12-congnghe.js",
    pool: { from: ["congnghe12-ck1-de1", "congnghe12-ck1-de2"], matrix: {
      "Giới thiệu tổng quan về kĩ thuật điện": [1, 1, 0], "Ngành nghề trong lĩnh vực kĩ thuật điện": [1, 0, 1], "Mạch điện xoay chiều ba pha": [1, 1, 1],
      "Hệ thống điện quốc gia": [1, 1, 0], "Sản xuất điện năng": [1, 1, 0], "Mạng điện sản xuất quy mô nhỏ": [1, 0, 1],
      "Mạng điện hạ áp dùng trong sinh hoạt": [0, 1, 1], "Hệ thống điện trong gia đình": [1, 1, 0], "Thiết bị điện trong hệ thống điện gia đình": [1, 0, 1],
      "Thiết kế và lắp đặt mạch điện điều khiển trong gia đình": [0, 1, 1], "An toàn điện": [1, 1, 0], "Tiết kiệm điện năng": [1, 0, 1] } } },

  /* Toán 5 · Kiểm tra cuối học kì I (Kết nối tri thức, Toán 5 tập một, Bài 1–35; Phiên N5-ck1-toan). Khối 5 chưa bật (data/grades.js)
     nên đề chưa hiện với gia đình. Kho câu = 50 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức độ. Ma trận [Biết,
     Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu trên 15 chủ đề, trọng tâm Chủ đề 2, 4, 5 của sách: ôn tập và bổ sung (phân số
     thập phân, hỗn số, cộng, trừ phân số) 4 câu, số thập phân 6, đơn vị đo diện tích 2, các phép tính với số thập phân 6, hình phẳng 7.
     Mỗi ô (chủ đề, mức) rút 1 câu và có 4 câu: một câu ở mỗi đề cố định, hai câu riêng, nên học sinh đã làm một đề cố định vẫn gặp câu
     mới. Không có câu tự luận. */
  { id: "toan5-ck1-de1", title: "Toán 5 · Cuối kì I · Đề 1", grade: 5, subject: "Toán", minutes: 40, n: 25, file: "5-toan.js" },
  { id: "toan5-ck1-de2", title: "Toán 5 · Cuối kì I · Đề 2", grade: 5, subject: "Toán", minutes: 40, n: 25, file: "5-toan.js" },
  { id: "toan5-ck1-ngau-nhien", title: "Toán 5 · Cuối kì I · Đề ngẫu nhiên", grade: 5, subject: "Toán", minutes: 40, n: 25, file: "5-toan.js",
    pool: { from: ["toan5-ck1-de1", "toan5-ck1-de2"], matrix: {
      "Phân số thập phân": [1, 0, 0], "Hỗn số": [1, 1, 0], "Cộng, trừ phân số": [0, 0, 1], "Số thập phân": [1, 1, 0],
      "So sánh số thập phân": [1, 0, 1], "Viết số đo dưới dạng số thập phân": [0, 1, 0], "Làm tròn số thập phân": [1, 0, 0],
      "Đơn vị đo diện tích": [1, 1, 0], "Cộng, trừ số thập phân": [1, 0, 1], "Nhân số thập phân": [0, 1, 0], "Chia số thập phân": [0, 1, 1],
      "Nhân, chia với 10; 100; 1 000; 0,1; 0,01; 0,001": [1, 0, 0], "Hình tam giác": [1, 0, 1], "Hình thang": [0, 1, 1],
      "Hình tròn": [1, 1, 1] } } },

  /* Tiếng Việt 5 · Kiểm tra cuối học kì I (Kết nối tri thức, Tiếng Việt 5 tập một, tuần 1–18, Bài 1–32; Phiên N5-ck1-tv). Khối 5 chưa
     bật (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 53 câu riêng trong file (4 đoạn đọc, 5 câu Viết) + 50 câu của 2 đề cố
     định, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu, trong đó 7 câu Đọc hiểu (đoạn 4
     câu mức 1-1-2-3 và đoạn 3 câu mức 1-2-3), 17 câu Luyện từ và câu chia theo số bài Luyện từ và câu của sách (danh từ, động từ, tính
     từ 2; đại từ 3; từ đồng nghĩa, từ đa nghĩa, sử dụng từ điển, dấu gạch ngang, điệp từ và điệp ngữ, kết từ mỗi chủ đề 2), 1 câu Viết
     tự chấm (nên cả ba đề 40 phút). Hai đề cố định chia đúng ma trận; mỗi ô có rút có 4 câu Luyện từ và câu (một câu ở mỗi đề cố định,
     hai câu riêng), nên học sinh đã làm một đề cố định vẫn gặp câu mới. */
  { id: "tv5-ck1-de1", title: "Tiếng Việt 5 · Cuối kì I · Đề 1", grade: 5, subject: "Tiếng Việt", minutes: 40, n: 25, file: "5-tv.js" },
  { id: "tv5-ck1-de2", title: "Tiếng Việt 5 · Cuối kì I · Đề 2", grade: 5, subject: "Tiếng Việt", minutes: 40, n: 25, file: "5-tv.js" },
  { id: "tv5-ck1-ngau-nhien", title: "Tiếng Việt 5 · Cuối kì I · Đề ngẫu nhiên", grade: 5, subject: "Tiếng Việt", minutes: 40, n: 25, file: "5-tv.js",
    pool: { from: ["tv5-ck1-de1", "tv5-ck1-de2"], matrix: {
      "Đọc hiểu": [3, 2, 2], "Danh từ, động từ, tính từ": [1, 1, 0], "Đại từ": [1, 1, 1], "Từ đồng nghĩa": [1, 0, 1], "Từ đa nghĩa": [1, 1, 0],
      "Sử dụng từ điển": [1, 1, 0], "Dấu gạch ngang": [1, 1, 0], "Biện pháp điệp từ, điệp ngữ": [0, 1, 1], "Kết từ": [1, 0, 1], "Viết": [0, 0, 1] } } },
  /* Tiếng Việt 5 · Kiểm tra giữa học kì II (Kết nối tri thức, Tiếng Việt 5 tập hai, tuần 19–26, Bài 1–16; Phiên N5-gk2-tv). Khối 5
     chưa bật (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 53 câu riêng trong file (4 đoạn đọc, 5 câu Viết) + 50 câu của 2
     đề cố định, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu, trong đó 7 câu Đọc hiểu
     (đoạn 4 câu mức 1-1-2-3 và đoạn 3 câu mức 1-2-3), 17 câu Luyện từ và câu theo số bài Luyện từ và câu của sách (cách nối các vế
     câu ghép 4 vì có hai bài; câu đơn và câu ghép 3; câu ghép, liên kết câu bằng cách lặp từ ngữ, bằng từ ngữ nối, bằng từ ngữ thay
     thế, liên kết câu trong đoạn văn mỗi chủ đề 2), 1 câu Viết tự chấm (nên cả ba đề 40 phút). Hai đề cố định chia đúng ma trận; mỗi
     ô Luyện từ và câu có rút có 4 câu cho mỗi câu ô đó rút (một ở mỗi đề cố định, hai câu riêng), nên học sinh đã làm một đề cố định
     vẫn gặp câu mới. */
  { id: "tv5-gk2-de1", title: "Tiếng Việt 5 · Giữa kì II · Đề 1", grade: 5, subject: "Tiếng Việt", minutes: 40, n: 25, file: "5-tv.js" },
  { id: "tv5-gk2-de2", title: "Tiếng Việt 5 · Giữa kì II · Đề 2", grade: 5, subject: "Tiếng Việt", minutes: 40, n: 25, file: "5-tv.js" },
  { id: "tv5-gk2-ngau-nhien", title: "Tiếng Việt 5 · Giữa kì II · Đề ngẫu nhiên", grade: 5, subject: "Tiếng Việt", minutes: 40, n: 25, file: "5-tv.js",
    pool: { from: ["tv5-gk2-de1", "tv5-gk2-de2"], matrix: {
      "Đọc hiểu": [3, 2, 2], "Câu đơn và câu ghép": [1, 1, 1], "Cách nối các vế câu ghép": [2, 1, 1], "Câu ghép": [0, 1, 1],
      "Liên kết câu bằng cách lặp từ ngữ": [1, 1, 0], "Liên kết câu bằng từ ngữ nối": [1, 0, 1], "Liên kết câu bằng từ ngữ thay thế": [1, 1, 0],
      "Liên kết câu trong đoạn văn": [1, 1, 0], "Viết": [0, 0, 1] } } },
  /* Tiếng Việt 5 · Kiểm tra cuối năm học (Kết nối tri thức, Tiếng Việt 5 tập hai, trọng tâm tuần 28–34, Bài 17–30; Phiên N5-ck2-tv).
     Khối 5 chưa bật (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 53 câu riêng trong file (4 đoạn đọc, 5 câu Viết) + 50
     câu của 2 đề cố định, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu, trong đó 7
     câu Đọc hiểu (đoạn 4 câu mức 1-1-2-3 và đoạn 3 câu mức 1-2-3), 17 câu Luyện từ và câu theo các bài Luyện từ và câu của Bài 17–29
     (đại từ 2, kết từ 1, từ đồng nghĩa 2, từ đa nghĩa 1, câu ghép 2, viết hoa danh từ chung 1, viết tên người, tên địa lí nước ngoài 3,
     dấu gạch ngang 2, liên kết câu trong đoạn văn 2) và ôn cách nối các vế câu ghép (1), 1 câu Viết tự chấm (nên cả ba đề 40 phút).
     Chủ đề ôn đúng chữ chủ đề của kho cuối kì I, giữa kì II. Hai đề cố định chia đúng ma trận; mỗi ô Luyện từ và câu có rút có 4 câu
     (một ở mỗi đề cố định, hai câu riêng), nên học sinh đã làm một đề cố định vẫn gặp câu mới. */
  { id: "tv5-ck2-de1", title: "Tiếng Việt 5 · Cuối năm · Đề 1", grade: 5, subject: "Tiếng Việt", minutes: 40, n: 25, file: "5-tv.js" },
  { id: "tv5-ck2-de2", title: "Tiếng Việt 5 · Cuối năm · Đề 2", grade: 5, subject: "Tiếng Việt", minutes: 40, n: 25, file: "5-tv.js" },
  { id: "tv5-ck2-ngau-nhien", title: "Tiếng Việt 5 · Cuối năm · Đề ngẫu nhiên", grade: 5, subject: "Tiếng Việt", minutes: 40, n: 25, file: "5-tv.js",
    pool: { from: ["tv5-ck2-de1", "tv5-ck2-de2"], matrix: {
      "Đọc hiểu": [3, 2, 2], "Đại từ": [1, 1, 0], "Kết từ": [1, 0, 0], "Từ đồng nghĩa": [0, 1, 1], "Từ đa nghĩa": [0, 1, 0], "Câu ghép": [0, 1, 1],
      "Cách nối các vế câu ghép": [1, 0, 0], "Viết hoa danh từ chung": [1, 0, 0], "Viết tên người, tên địa lí nước ngoài": [1, 1, 1],
      "Dấu gạch ngang": [1, 1, 0], "Liên kết câu trong đoạn văn": [1, 0, 1], "Viết": [0, 0, 1] } } },
  /* Tiếng Việt 5 · Kiểm tra giữa học kì I (Kết nối tri thức, Tiếng Việt 5 tập một, tuần 1–8, Bài 1–16; Phiên N5-gk1-tv). Kì đã
     thi (2–13/11/2026), đề dùng cho năm học 2027–2028. Kho câu = 53 câu riêng trong file (4 đoạn đọc, 5 câu Viết) + 50 câu của 2 đề
     cố định, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu, trong đó 7 câu Đọc hiểu
     (đoạn 4 câu mức 1-1-2-3 và đoạn 3 câu mức 1-2-3), 17 câu Luyện từ và câu theo các bài Luyện từ và câu của Bài 1–15 (danh từ,
     động từ, tính từ 3; đại từ 6 vì có ba bài; từ đồng nghĩa 4; từ đa nghĩa 4), 1 câu Viết tự chấm (nên cả ba đề 40 phút). Chữ chủ
     đề như kho cuối kì I (đề “Ôn chủ đề” rút chung câu cùng chủ đề). Hai đề cố định chia đúng ma trận; mỗi ô Luyện từ và câu có rút
     có 4 câu cho mỗi câu ô đó rút (một ở mỗi đề cố định, hai câu riêng), nên học sinh đã làm một đề cố định vẫn gặp câu mới. */
  { id: "tv5-gk1-de1", title: "Tiếng Việt 5 · Giữa kì I · Đề 1", grade: 5, subject: "Tiếng Việt", minutes: 40, n: 25, file: "5-tv.js" },
  { id: "tv5-gk1-de2", title: "Tiếng Việt 5 · Giữa kì I · Đề 2", grade: 5, subject: "Tiếng Việt", minutes: 40, n: 25, file: "5-tv.js" },
  { id: "tv5-gk1-ngau-nhien", title: "Tiếng Việt 5 · Giữa kì I · Đề ngẫu nhiên", grade: 5, subject: "Tiếng Việt", minutes: 40, n: 25, file: "5-tv.js",
    pool: { from: ["tv5-gk1-de1", "tv5-gk1-de2"], matrix: {
      "Đọc hiểu": [3, 2, 2], "Danh từ, động từ, tính từ": [1, 1, 1], "Đại từ": [2, 2, 2], "Từ đồng nghĩa": [2, 1, 1], "Từ đa nghĩa": [2, 2, 0],
      "Viết": [0, 0, 1] } } },

  /* Tiếng Anh 5 · Kiểm tra cuối học kì I (Global Success 5 tập một, Units 1–10, Review 1–2; Phiên N5-ck1-ta). Khối 5 chưa bật
     (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 25 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức
     độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu, mỗi Unit 2–3 câu (Unit 4, 9 ba câu), Reading 3 câu một
     đoạn đọc (mức 1-2-3). Hai đề cố định và phần câu riêng đều chia đúng ma trận: mỗi ô rút 1 câu và có 3 câu (một câu ở mỗi đề cố
     định, một câu riêng), nên học sinh đã làm một đề cố định vẫn gặp câu mới. Không có câu nghe, câu phát âm. */
  { id: "ta5-ck1-de1", title: "Tiếng Anh 5 · Cuối kì I · Đề 1", grade: 5, subject: "Tiếng Anh", minutes: 35, n: 25, file: "5-ta.js" },
  { id: "ta5-ck1-de2", title: "Tiếng Anh 5 · Cuối kì I · Đề 2", grade: 5, subject: "Tiếng Anh", minutes: 35, n: 25, file: "5-ta.js" },
  { id: "ta5-ck1-ngau-nhien", title: "Tiếng Anh 5 · Cuối kì I · Đề ngẫu nhiên", grade: 5, subject: "Tiếng Anh", minutes: 35, n: 25, file: "5-ta.js",
    pool: { from: ["ta5-ck1-de1", "ta5-ck1-de2"], matrix: {
      "Unit 1 · All About Me!": [1, 1, 0], "Unit 2 · Our Homes": [1, 0, 1], "Unit 3 · My Foreign Friends": [1, 1, 0],
      "Unit 4 · Our Free-Time Activities": [1, 1, 1], "Unit 5 · My Future Job": [1, 1, 0], "Unit 6 · Our School Rooms": [1, 0, 1],
      "Unit 7 · Our Favourite School Activities": [0, 1, 1], "Unit 8 · In Our Classroom": [1, 1, 0], "Unit 9 · Our Outdoor Activities": [1, 1, 1],
      "Unit 10 · Our School Trip": [1, 0, 1], "Reading": [1, 1, 1] } } },
  /* Tiếng Anh 5 · Kiểm tra cuối năm học (Global Success 5 tập hai, Units 11–20, Review 3–4; Phiên N5-ck2-ta). Khối 5 chưa bật
     (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 25 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức
     độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu, mỗi Unit 2–3 câu (Unit 11, 14 ba câu), Reading 3 câu một
     đoạn đọc (mức 1-2-3). Hai đề cố định và phần câu riêng đều chia đúng ma trận: mỗi ô rút 1 câu và có 3 câu (một câu ở mỗi đề cố
     định, một câu riêng), nên học sinh đã làm một đề cố định vẫn gặp câu mới. Không có câu nghe, câu phát âm. */
  { id: "ta5-ck2-de1", title: "Tiếng Anh 5 · Cuối năm · Đề 1", grade: 5, subject: "Tiếng Anh", minutes: 35, n: 25, file: "5-ta.js" },
  { id: "ta5-ck2-de2", title: "Tiếng Anh 5 · Cuối năm · Đề 2", grade: 5, subject: "Tiếng Anh", minutes: 35, n: 25, file: "5-ta.js" },
  { id: "ta5-ck2-ngau-nhien", title: "Tiếng Anh 5 · Cuối năm · Đề ngẫu nhiên", grade: 5, subject: "Tiếng Anh", minutes: 35, n: 25, file: "5-ta.js",
    pool: { from: ["ta5-ck2-de1", "ta5-ck2-de2"], matrix: {
      "Unit 11 · Family Time": [1, 1, 1], "Unit 12 · Our Tet Holiday": [1, 1, 0], "Unit 13 · Our Special Days": [1, 0, 1],
      "Unit 14 · Staying Healthy": [1, 1, 1], "Unit 15 · Our Health": [1, 1, 0], "Unit 16 · Seasons and the Weather": [1, 0, 1],
      "Unit 17 · Stories for Children": [1, 1, 0], "Unit 18 · Means of Transport": [0, 1, 1], "Unit 19 · Places of Interest": [1, 0, 1],
      "Unit 20 · Our Summer Holidays": [1, 1, 0], "Reading": [1, 1, 1] } } },

  /* Khoa học 5 · Kiểm tra cuối học kì I (Kết nối tri thức, Khoa học 5, Bài 1–17; Phiên N5-ck1-khoahoc). Khối 5 chưa bật (data/grades.js)
     nên đề chưa hiện với gia đình. Kho câu = 25 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức độ. Ma trận [Biết,
     Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu trên 14 chủ đề theo tên bài (Bài 6, 12, 17 là ôn tập, không có chủ đề riêng):
     Chất 9 câu (Bài 1–5), Năng lượng 9 câu (Bài 7–11), Thực vật và động vật 7 câu (Bài 13–16). Mỗi ô (chủ đề, mức) rút 1 câu và có 3 câu:
     một câu ở mỗi đề cố định, một câu riêng; hai đề cố định chia đúng ma trận, nên học sinh đã làm một đề cố định vẫn gặp câu mới. Không
     có câu tự luận. */
  { id: "khoahoc5-ck1-de1", title: "Khoa học 5 · Cuối kì I · Đề 1", grade: 5, subject: "Khoa học", minutes: 35, n: 25, file: "5-khoahoc.js" },
  { id: "khoahoc5-ck1-de2", title: "Khoa học 5 · Cuối kì I · Đề 2", grade: 5, subject: "Khoa học", minutes: 35, n: 25, file: "5-khoahoc.js" },
  { id: "khoahoc5-ck1-ngau-nhien", title: "Khoa học 5 · Cuối kì I · Đề ngẫu nhiên", grade: 5, subject: "Khoa học", minutes: 35, n: 25, file: "5-khoahoc.js",
    pool: { from: ["khoahoc5-ck1-de1", "khoahoc5-ck1-de2"], matrix: {
      "Thành phần và vai trò của đất": [1, 1, 0], "Ô nhiễm, xói mòn đất": [1, 0, 1], "Hỗn hợp và dung dịch": [1, 1, 0],
      "Chất ở trạng thái rắn, lỏng, khí": [1, 0, 1], "Sự biến đổi hoá học": [0, 1, 0], "Vai trò của năng lượng": [1, 0, 0],
      "Sử dụng năng lượng điện": [0, 1, 1], "Mạch điện, vật dẫn điện và vật cách điện": [1, 1, 1], "Năng lượng chất đốt": [1, 0, 1],
      "Năng lượng mặt trời, gió, nước chảy": [0, 1, 0], "Sinh sản của thực vật có hoa": [1, 1, 0], "Sự phát triển của cây con": [1, 0, 1],
      "Sinh sản của động vật": [1, 0, 0], "Vòng đời của động vật": [0, 1, 1] } } },
  /* Khoa học 5 · Kiểm tra cuối năm học (Kết nối tri thức, Khoa học 5, Bài 18–29; Phiên N5-ck2-khoahoc). Khối 5 chưa bật (data/grades.js)
     nên đề chưa hiện với gia đình. Kho câu = 25 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức độ. Ma trận [Biết,
     Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu trên 10 chủ đề theo tên bài (Bài 21, 27, 30 là ôn tập, không có chủ đề riêng):
     Vi khuẩn 8 câu (Bài 18–20), Con người và sức khoẻ 12 câu (Bài 22–26), Sinh vật và môi trường 5 câu (Bài 28–29). Mỗi ô (chủ đề, mức)
     rút 1 câu và có 3 câu: một câu ở mỗi đề cố định, một câu riêng; hai đề cố định chia đúng ma trận, nên học sinh đã làm một đề cố định
     vẫn gặp câu mới. Không có câu tự luận. */
  { id: "khoahoc5-ck2-de1", title: "Khoa học 5 · Cuối năm · Đề 1", grade: 5, subject: "Khoa học", minutes: 35, n: 25, file: "5-khoahoc.js" },
  { id: "khoahoc5-ck2-de2", title: "Khoa học 5 · Cuối năm · Đề 2", grade: 5, subject: "Khoa học", minutes: 35, n: 25, file: "5-khoahoc.js" },
  { id: "khoahoc5-ck2-ngau-nhien", title: "Khoa học 5 · Cuối năm · Đề ngẫu nhiên", grade: 5, subject: "Khoa học", minutes: 35, n: 25, file: "5-khoahoc.js",
    pool: { from: ["khoahoc5-ck2-de1", "khoahoc5-ck2-de2"], matrix: {
      "Vi khuẩn xung quanh chúng ta": [1, 1, 0], "Vi khuẩn có ích trong chế biến thực phẩm": [1, 1, 1], "Vi khuẩn gây bệnh ở người": [1, 1, 1],
      "Sự hình thành cơ thể người": [1, 1, 0], "Các giai đoạn phát triển của con người": [1, 1, 1], "Nam và nữ": [1, 0, 1],
      "Chăm sóc sức khoẻ tuổi dậy thì": [1, 1, 1], "Phòng tránh bị xâm hại": [1, 0, 1], "Chức năng của môi trường đối với sinh vật": [1, 1, 0],
      "Tác động của con người đến môi trường": [1, 1, 1] } } },

  /* Lịch sử và Địa lí 5 · Kiểm tra cuối học kì I (Kết nối tri thức, bản chỉnh sửa năm 2026, Bài 1–11; Phiên N5-ck1-lsdl). Khối 5 chưa bật
     (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 25 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức độ.
     Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu trên 10 chủ đề theo tên Bài 1–10 (Bài 11 là ôn tập): Địa lí 11
     câu (Bài 1–4), Lịch sử 14 câu (Bài 5–10); Bài 1, 2, 4, 8, 10 mỗi bài 3 câu (một câu mỗi mức), các bài khác 2 câu. Mỗi ô (chủ đề, mức)
     rút 1 câu và có 3 câu: một câu ở mỗi đề cố định, một câu riêng; hai đề cố định chia đúng ma trận, nên học sinh đã làm một đề cố định
     vẫn gặp câu mới. Không có câu tự luận. */
  { id: "lsdl5-ck1-de1", title: "Lịch sử và Địa lí 5 · Cuối kì I · Đề 1", grade: 5, subject: "Lịch sử và Địa lí", minutes: 35, n: 25, file: "5-lsdl.js" },
  { id: "lsdl5-ck1-de2", title: "Lịch sử và Địa lí 5 · Cuối kì I · Đề 2", grade: 5, subject: "Lịch sử và Địa lí", minutes: 35, n: 25, file: "5-lsdl.js" },
  { id: "lsdl5-ck1-ngau-nhien", title: "Lịch sử và Địa lí 5 · Cuối kì I · Đề ngẫu nhiên", grade: 5, subject: "Lịch sử và Địa lí", minutes: 35, n: 25, file: "5-lsdl.js",
    pool: { from: ["lsdl5-ck1-de1", "lsdl5-ck1-de2"], matrix: {
      "Vị trí, lãnh thổ, đơn vị hành chính, Quốc kì, Quốc huy, Quốc ca": [1, 1, 1], "Thiên nhiên Việt Nam": [1, 1, 1],
      "Biển, đảo Việt Nam": [1, 0, 1], "Dân cư và dân tộc ở Việt Nam": [1, 1, 1], "Nhà nước Văn Lang, Nhà nước Âu Lạc": [1, 1, 0],
      "Vương quốc Phù Nam": [1, 1, 0], "Vương quốc Chăm-pa": [1, 1, 0], "Đấu tranh giành độc lập thời kì Bắc thuộc": [1, 1, 1],
      "Triều Lý và việc định đô ở Thăng Long": [1, 0, 1], "Triều Trần xây dựng đất nước, kháng chiến chống Mông – Nguyên": [1, 1, 1] } } },

  /* Lịch sử và Địa lí 5 · Kiểm tra cuối năm học (Kết nối tri thức, bản chỉnh sửa năm 2026, Bài 12–27; Phiên N5-ck2-lsdl). Khối 5 chưa bật
     (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 25 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức độ. Ma
     trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu trên 16 chủ đề theo tên Bài 12–27 (Bài 28 là ôn tập): Lịch sử Việt Nam
     (Bài 12–17) và văn minh Ai Cập, Hy Lạp (Bài 24–25) 13 câu; các nước láng giềng, châu lục và đại dương, dân số, xây dựng thế giới (Bài
     18–23, 26–27) 12 câu; mỗi bài 1–2 câu. Mỗi ô (chủ đề, mức) rút 1 câu và có 3 câu: một câu ở mỗi đề cố định, một câu riêng; hai đề cố định
     chia đúng ma trận, nên học sinh đã làm một đề cố định vẫn gặp câu mới. Không có câu tự luận. */
  { id: "lsdl5-ck2-de1", title: "Lịch sử và Địa lí 5 · Cuối năm · Đề 1", grade: 5, subject: "Lịch sử và Địa lí", minutes: 35, n: 25, file: "5-lsdl.js" },
  { id: "lsdl5-ck2-de2", title: "Lịch sử và Địa lí 5 · Cuối năm · Đề 2", grade: 5, subject: "Lịch sử và Địa lí", minutes: 35, n: 25, file: "5-lsdl.js" },
  { id: "lsdl5-ck2-ngau-nhien", title: "Lịch sử và Địa lí 5 · Cuối năm · Đề ngẫu nhiên", grade: 5, subject: "Lịch sử và Địa lí", minutes: 35, n: 25, file: "5-lsdl.js",
    pool: { from: ["lsdl5-ck2-de1", "lsdl5-ck2-de2"], matrix: {
      "Khởi nghĩa Lam Sơn và Triều Hậu Lê": [1, 0, 1], "Triều Nguyễn": [1, 1, 0], "Cách mạng tháng Tám năm 1945": [1, 0, 1],
      "Chiến dịch Điện Biên Phủ năm 1954": [0, 1, 1], "Chiến dịch Hồ Chí Minh năm 1975": [1, 1, 0], "Đất nước Đổi mới": [0, 1, 0],
      "Nước Cộng hoà Nhân dân Trung Hoa": [1, 1, 0], "Nước Cộng hoà Dân chủ Nhân dân Lào": [1, 0, 0], "Vương quốc Cam-pu-chia": [0, 1, 0],
      "Hiệp hội các quốc gia Đông Nam Á": [1, 0, 1], "Các châu lục và đại dương trên thế giới": [1, 0, 1],
      "Dân số và các chủng tộc chính trên thế giới": [0, 1, 1], "Văn minh Ai Cập": [1, 0, 0], "Văn minh Hy Lạp": [1, 0, 0],
      "Xây dựng thế giới xanh – sạch – đẹp": [0, 0, 1], "Xây dựng thế giới hoà bình": [0, 1, 0] } } },

  /* Tin học và Công nghệ 5 · Kiểm tra cuối học kì I (Kết nối tri thức; Tin học 5 Bài 1–7 và Chủ đề 5 phần A, Bài 8A, 9A; Công nghệ 5 Bài 1–6;
     Phiên N5-ck1-tincn). Khối 5 chưa bật (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2 đề cố định (không có câu
     riêng), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu, 13 câu Tin học (8 chủ đề) và 12 câu
     Công nghệ (6 chủ đề) như kho Tin học và Công nghệ 4 cuối kì I; mỗi ô (chủ đề, mức) rút 1 câu và có 2 câu, một ở mỗi đề cố định. Không có
     câu tự luận. */
  { id: "tincn5-ck1-de1", title: "Tin học và Công nghệ 5 · Cuối kì I · Đề 1", grade: 5, subject: "Tin học và Công nghệ", minutes: 35, n: 25, file: "5-tincn.js" },
  { id: "tincn5-ck1-de2", title: "Tin học và Công nghệ 5 · Cuối kì I · Đề 2", grade: 5, subject: "Tin học và Công nghệ", minutes: 35, n: 25, file: "5-tincn.js" },
  { id: "tincn5-ck1-ngau-nhien", title: "Tin học và Công nghệ 5 · Cuối kì I · Đề ngẫu nhiên", grade: 5, subject: "Tin học và Công nghệ", minutes: 35, n: 25, file: "5-tincn.js",
    pool: { from: ["tincn5-ck1-de1", "tincn5-ck1-de2"], matrix: {
      "Tin học · Làm được gì với máy tính": [1, 0, 0], "Tin học · Tìm kiếm thông tin trên website": [1, 0, 1],
      "Tin học · Tìm kiếm thông tin trong giải quyết vấn đề": [1, 1, 0], "Tin học · Cây thư mục": [0, 1, 1],
      "Tin học · Bản quyền nội dung thông tin": [1, 1, 0], "Tin học · Định dạng kí tự và bố trí hình ảnh": [0, 1, 0],
      "Tin học · Thực hành soạn thảo văn bản": [0, 0, 1], "Tin học · Phần mềm đồ hoạ": [1, 0, 1],
      "Công nghệ · Vai trò của công nghệ": [1, 1, 0], "Công nghệ · Nhà sáng chế": [1, 1, 0], "Công nghệ · Tìm hiểu thiết kế": [1, 1, 0],
      "Công nghệ · Thiết kế sản phẩm": [0, 0, 1], "Công nghệ · Sử dụng điện thoại": [1, 1, 1], "Công nghệ · Sử dụng tủ lạnh": [1, 0, 1] } } },
  /* Tin học và Công nghệ 5 · Kiểm tra cuối năm học (Kết nối tri thức; Tin học 5 Chủ đề 6, Bài 10–16; Công nghệ 5 Phần hai, Bài 7–9;
     Phiên N5-ck2-tincn). Khối 5 chưa bật (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2 đề cố định (không có câu
     riêng), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu, 13 câu Tin học (7 chủ đề theo tên
     Bài 10–16) và 12 câu Công nghệ (3 chủ đề theo tên Bài 7–9, mỗi chủ đề 4 câu) như kho cuối kì I. Ô (chủ đề, mức) của Tin học rút 1 câu và
     có 2 câu, một ở mỗi đề cố định; Công nghệ chỉ có 3 bài nên có ô rút 2 câu, có 4 câu, hai ở mỗi đề. Không có câu tự luận. */
  { id: "tincn5-ck2-de1", title: "Tin học và Công nghệ 5 · Cuối năm · Đề 1", grade: 5, subject: "Tin học và Công nghệ", minutes: 35, n: 25, file: "5-tincn.js" },
  { id: "tincn5-ck2-de2", title: "Tin học và Công nghệ 5 · Cuối năm · Đề 2", grade: 5, subject: "Tin học và Công nghệ", minutes: 35, n: 25, file: "5-tincn.js" },
  { id: "tincn5-ck2-ngau-nhien", title: "Tin học và Công nghệ 5 · Cuối năm · Đề ngẫu nhiên", grade: 5, subject: "Tin học và Công nghệ", minutes: 35, n: 25, file: "5-tincn.js",
    pool: { from: ["tincn5-ck2-de1", "tincn5-ck2-de2"], matrix: {
      "Tin học · Cấu trúc tuần tự": [1, 1, 0], "Tin học · Cấu trúc lặp": [1, 1, 0], "Tin học · Thực hành sử dụng lệnh lặp": [0, 0, 1],
      "Tin học · Cấu trúc rẽ nhánh": [1, 1, 0], "Tin học · Sử dụng biến trong chương trình": [1, 0, 1],
      "Tin học · Sử dụng biểu thức trong chương trình": [0, 1, 1], "Tin học · Từ kịch bản đến chương trình": [1, 0, 1],
      "Công nghệ · Lắp ráp mô hình xe điện chạy bằng pin": [2, 1, 1], "Công nghệ · Mô hình máy phát điện gió": [2, 1, 1],
      "Công nghệ · Mô hình điện mặt trời": [1, 2, 1] } } },

  /* Toán 12 · Kiểm tra giữa học kì II (Kết nối tri thức, Toán 12 tập hai, Bài 11–15: Chương IV Nguyên hàm và tích phân, Chương V Phương
     pháp toạ độ trong không gian đến Bài 15; trọng tâm Chương IV; không có chủ đề riêng cho Hoạt động thực hành trải nghiệm; Phiên
     N12-gk2-toan). Khối 12 chưa bật (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 25 câu riêng trong file + 50 câu của 2 đề
     cố định, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 5 chủ đề theo tên Bài 11–15: Chương IV 15 câu,
     Chương V 10 câu. Hai đề cố định và phần câu riêng đều chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp ba số câu ô đó rút. Hai
     câu tự luận chỉ ở hai ô Vận dụng rút 1 câu (Tích phân; Phương trình đường thẳng trong không gian): mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "toan12-gk2-de1", title: "Toán 12 · Giữa kì II · Đề 1", grade: 12, subject: "Toán", minutes: 45, n: 25, file: "12-toan.js" },
  { id: "toan12-gk2-de2", title: "Toán 12 · Giữa kì II · Đề 2", grade: 12, subject: "Toán", minutes: 45, n: 25, file: "12-toan.js" },
  { id: "toan12-gk2-ngau-nhien", title: "Toán 12 · Giữa kì II · Đề ngẫu nhiên", grade: 12, subject: "Toán", minutes: 45, n: 25, file: "12-toan.js",
    pool: { from: ["toan12-gk2-de1", "toan12-gk2-de2"], matrix: {
      "Nguyên hàm": [2, 2, 1], "Tích phân": [2, 2, 1], "Ứng dụng hình học của tích phân": [2, 1, 2], "Phương trình mặt phẳng": [2, 2, 2],
      "Phương trình đường thẳng trong không gian": [2, 1, 1] } } },

  /* Ngữ văn 12 · Kiểm tra giữa học kì II (Kết nối tri thức, Ngữ văn 12 tập hai, Bài 6–7; Phiên N12-gk2-van). Khối 12 chưa bật
     (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2 đề cố định (mỗi đề 4 đoạn đọc, 1 câu Viết), không có câu
     riêng, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu: hai chủ đề đọc hiểu theo tên Bài 6, 7, mỗi chủ đề
     [2, 2, 2] (mỗi đề hai đoạn 3 câu mức 1-2-3 mỗi bài: Bài 6 một bài thơ chữ Hán của Hồ Chí Minh và một văn bản nghị luận, Bài 7
     một bài viết theo lối phóng sự và một đoạn hồi kí), nên lần rút nào cũng lấy trọn hai đoạn mỗi bài, đúng mức; 12 câu tiếng Việt
     theo hai mục Thực hành tiếng Việt của Bài 6, 7 (ba chủ đề); 1 câu Viết tự chấm (hai đề: hai kiểu bài Viết của Bài 6, 7). Hai đề
     cố định đúng ma trận nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. Câu tự luận chỉ ở ô Viết: mỗi lần rút đúng 1 câu. */
  { id: "van12-gk2-de1", title: "Ngữ văn 12 · Giữa kì II · Đề 1", grade: 12, subject: "Ngữ văn", minutes: 45, n: 25, file: "12-van.js" },
  { id: "van12-gk2-de2", title: "Ngữ văn 12 · Giữa kì II · Đề 2", grade: 12, subject: "Ngữ văn", minutes: 45, n: 25, file: "12-van.js" },
  { id: "van12-gk2-ngau-nhien", title: "Ngữ văn 12 · Giữa kì II · Đề ngẫu nhiên", grade: 12, subject: "Ngữ văn", minutes: 45, n: 25, file: "12-van.js",
    pool: { from: ["van12-gk2-de1", "van12-gk2-de2"], matrix: {
      "Hồ Chí Minh – “Văn hoá phải soi đường cho quốc dân đi”": [2, 2, 2], "Sự thật trong tác phẩm kí": [2, 2, 2],
      "Biện pháp làm tăng tính khẳng định": [2, 1, 1], "Biện pháp làm tăng tính phủ định": [2, 1, 0],
      "Ngôn ngữ trang trọng và ngôn ngữ thân mật": [2, 2, 1], "Viết": [0, 0, 1] } } },

  /* Tiếng Anh 12 · Kiểm tra giữa học kì II (Global Success 12, Units 6–7 và ôn Units 1–5; Phiên N12-gk2-ta). Khối 12 chưa bật
     (data/grades.js) nên đề chưa hiện với gia đình. Phạm vi theo đề cương giữa kì II (Units 6–7); trường đã học Unit 8 thì đối chiếu đề
     cương của trường (lời dặn của đề). Kho câu = 25 câu riêng trong file (1 đoạn điền, 1 bài đọc) + 50 câu của 2 đề cố định (mỗi đề 1
     đoạn điền, 1 bài đọc), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu: Pronunciation 2 (từ đồng âm của
     Unit 6, âm /r/ nối của Unit 7), Unit 6 8, Unit 7 7 (ô Hiểu, Vận dụng của mỗi Unit rút 2 câu: một câu ngữ pháp, một câu khác),
     Review of Units 1–5 2 (ngữ pháp của học kì I, như kho Tiếng Anh 9 giữa kì II), Cloze 3 (một đoạn điền 3 chỗ trống mức 1-2-3),
     Reading 3 (một bài đọc 3 câu mức 1-2-3). Hai đề cố định và câu riêng đều chia đúng ma trận nên ô (chủ đề, mức) nào cũng có gấp ba
     số câu ô đó rút. Không có câu nghe, không có câu tự luận. */
  { id: "ta12-gk2-de1", title: "Tiếng Anh 12 · Giữa kì II · Đề 1", grade: 12, subject: "Tiếng Anh", minutes: 45, n: 25, file: "12-ta.js" },
  { id: "ta12-gk2-de2", title: "Tiếng Anh 12 · Giữa kì II · Đề 2", grade: 12, subject: "Tiếng Anh", minutes: 45, n: 25, file: "12-ta.js" },
  { id: "ta12-gk2-ngau-nhien", title: "Tiếng Anh 12 · Giữa kì II · Đề ngẫu nhiên", grade: 12, subject: "Tiếng Anh", minutes: 45, n: 25, file: "12-ta.js",
    pool: { from: ["ta12-gk2-de1", "ta12-gk2-de2"], matrix: {
      "Pronunciation": [1, 1, 0], "Unit 6 · Artificial Intelligence": [4, 2, 2], "Unit 7 · The World of Mass Media": [3, 2, 2],
      "Review of Units 1–5": [0, 1, 1], "Cloze": [1, 1, 1], "Reading": [1, 1, 1] } } },

  /* Vật lí 12 · Kiểm tra giữa học kì II (Kết nối tri thức, Vật lí 12, Chương III Từ trường, Bài 14–20, trọng tâm Bài 16–19; Phiên
     N12-gk2-vatli-hoahoc). Khối 12 chưa bật (data/grades.js) nên đề chưa hiện với gia đình. Trường đã học sang Chương IV (Vật lí hạt
     nhân) trước khi kiểm tra thì đối chiếu đề cương (lời dặn của đề). Kho câu = 50 câu của 2 đề cố định, không có câu riêng. Ma trận
     [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 6 chủ đề theo tên Bài 14–19 (Bài 20 là bài tập nên không ra chủ đề riêng): Bài 14–15 8
     câu, Bài 16–19 17 câu. Hai đề cố định chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. Hai câu tự luận
     ở hai ô Vận dụng rút 1 câu (Máy phát điện xoay chiều; Ứng dụng hiện tượng cảm ứng điện từ): mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "vatli12-gk2-de1", title: "Vật lí 12 · Giữa kì II · Đề 1", grade: 12, subject: "Vật lí", minutes: 45, n: 25, file: "12-vatli.js" },
  { id: "vatli12-gk2-de2", title: "Vật lí 12 · Giữa kì II · Đề 2", grade: 12, subject: "Vật lí", minutes: 45, n: 25, file: "12-vatli.js" },
  { id: "vatli12-gk2-ngau-nhien", title: "Vật lí 12 · Giữa kì II · Đề ngẫu nhiên", grade: 12, subject: "Vật lí", minutes: 45, n: 25, file: "12-vatli.js",
    pool: { from: ["vatli12-gk2-de1", "vatli12-gk2-de2"], matrix: {
      "Từ trường": [2, 1, 1], "Lực từ tác dụng lên dây dẫn mang dòng điện. Cảm ứng từ": [1, 1, 2],
      "Từ thông. Hiện tượng cảm ứng điện từ": [2, 2, 2], "Máy phát điện xoay chiều": [2, 2, 1], "Ứng dụng hiện tượng cảm ứng điện từ": [1, 1, 1],
      "Điện từ trường. Mô hình sóng điện từ": [2, 1, 0] } } },

  /* Hoá học 12 · Kiểm tra giữa học kì II (Kết nối tri thức, Hoá học 12, Bài 16, Chương 6 Đại cương về kim loại Bài 18–23, Bài 24 Nguyên tố
     nhóm IA; trọng tâm Chương 6; Phiên N12-gk2-vatli-hoahoc). Phạm vi theo nguồn đa số (hai nguồn giữa kì II đều không có Bài 25, nên
     Bài 25 để sang kho cuối năm); trường đã kiểm tra Bài 16 ở cuối kì I, trường mới học hết Chương 6 hay đã học Bài 25 thì xem lời dặn
     của đề. Khối 12 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2 đề cố định, không có câu riêng. Ma trận [Biết, Hiểu,
     Vận dụng] 10 – 8 – 7 câu trên 7 chủ đề theo tên bài (Bài 23 ôn tập chương không ra chủ đề riêng): Bài 16 4 câu, Chương 6 17 câu,
     Bài 24 4 câu. Hai đề cố định chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. Hai câu tự luận ở hai ô
     Vận dụng rút 1 câu (Kim loại trong tự nhiên và phương pháp tách kim loại; Nguyên tố nhóm IA): mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "hoahoc12-gk2-de1", title: "Hóa học 12 · Giữa kì II · Đề 1", grade: 12, subject: "Hóa học", minutes: 45, n: 25, file: "12-hoahoc.js" },
  { id: "hoahoc12-gk2-de2", title: "Hóa học 12 · Giữa kì II · Đề 2", grade: 12, subject: "Hóa học", minutes: 45, n: 25, file: "12-hoahoc.js" },
  { id: "hoahoc12-gk2-ngau-nhien", title: "Hóa học 12 · Giữa kì II · Đề ngẫu nhiên", grade: 12, subject: "Hóa học", minutes: 45, n: 25, file: "12-hoahoc.js",
    pool: { from: ["hoahoc12-gk2-de1", "hoahoc12-gk2-de2"], matrix: {
      "Điện phân": [1, 2, 1], "Cấu tạo và liên kết trong tinh thể kim loại": [1, 1, 0], "Tính chất vật lí và tính chất hoá học của kim loại": [2, 2, 2],
      "Kim loại trong tự nhiên và phương pháp tách kim loại": [2, 1, 1], "Hợp kim": [1, 0, 1], "Sự ăn mòn kim loại": [1, 1, 1],
      "Nguyên tố nhóm IA": [2, 1, 1] } } },

  /* Sinh học 12 · Kiểm tra giữa học kì II (Kết nối tri thức, Sinh học 12, Bài 19–24: Chương 5 Bằng chứng và các học thuyết tiến hoá,
     Chương 6 Môi trường và sinh thái học quần thể; Phiên N12-gk2-sinhhoc-ktpl). Phạm vi theo ma trận giữa kì II tra được; lời dặn của
     đề nhắc phụ huynh đối chiếu đề cương của trường. Khối 12 chưa bật (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 50 câu
     của 2 đề cố định, không có câu riêng. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 6 chủ đề theo tên Bài 19–24 (Bài 25 là
     bài thực hành nên không ra chủ đề riêng): Chương 5 16 câu, Chương 6 9 câu. Hai đề cố định chia đúng ma trận, nên ô (chủ đề, mức)
     nào cũng có gấp đôi số câu ô đó rút. Hai câu tự luận ở hai ô Vận dụng rút 1 câu (Môi trường và các nhân tố sinh thái; Sinh thái
     học quần thể): mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "sinhhoc12-gk2-de1", title: "Sinh học 12 · Giữa kì II · Đề 1", grade: 12, subject: "Sinh học", minutes: 45, n: 25, file: "12-sinhhoc.js" },
  { id: "sinhhoc12-gk2-de2", title: "Sinh học 12 · Giữa kì II · Đề 2", grade: 12, subject: "Sinh học", minutes: 45, n: 25, file: "12-sinhhoc.js" },
  { id: "sinhhoc12-gk2-ngau-nhien", title: "Sinh học 12 · Giữa kì II · Đề ngẫu nhiên", grade: 12, subject: "Sinh học", minutes: 45, n: 25, file: "12-sinhhoc.js",
    pool: { from: ["sinhhoc12-gk2-de1", "sinhhoc12-gk2-de2"], matrix: {
      "Các bằng chứng tiến hoá": [1, 1, 1], "Quan niệm của Darwin về chọn lọc tự nhiên và hình thành loài": [1, 1, 1],
      "Học thuyết tiến hoá tổng hợp hiện đại": [2, 2, 2], "Tiến hoá lớn và quá trình phát sinh chủng loại": [2, 1, 1],
      "Môi trường và các nhân tố sinh thái": [2, 1, 1], "Sinh thái học quần thể": [2, 2, 1] } } },

  /* GDKT&PL 12 · Kiểm tra giữa học kì II (Kết nối tri thức, Giáo dục kinh tế và pháp luật 12, Phần hai Giáo dục pháp luật, Bài 8–11;
     Phiên N12-gk2-sinhhoc-ktpl). Phạm vi theo đề cương, ma trận giữa kì II tra được; lời dặn của đề nhắc phụ huynh đối chiếu đề cương
     của trường. Khối 12 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2 đề cố định, không có câu riêng; câu tình huống là
     chính. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 4 chủ đề theo tên bài (tên Bài 9 rút gọn): Bài 8 7 câu, Bài 9 6 câu,
     Bài 10 7 câu, Bài 11 5 câu. Hai đề cố định chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. Một câu tự
     luận (Đề 1) ở ô Vận dụng rút 1 câu của “Quyền và nghĩa vụ của công dân trong học tập”: mỗi lần rút nhiều nhất 1 câu tự luận. */
  { id: "ktpl12-gk2-de1", title: "GDKT&PL 12 · Giữa kì II · Đề 1", grade: 12, subject: "GDKT&PL", minutes: 45, n: 25, file: "12-ktpl.js" },
  { id: "ktpl12-gk2-de2", title: "GDKT&PL 12 · Giữa kì II · Đề 2", grade: 12, subject: "GDKT&PL", minutes: 45, n: 25, file: "12-ktpl.js" },
  { id: "ktpl12-gk2-ngau-nhien", title: "GDKT&PL 12 · Giữa kì II · Đề ngẫu nhiên", grade: 12, subject: "GDKT&PL", minutes: 45, n: 25, file: "12-ktpl.js",
    pool: { from: ["ktpl12-gk2-de1", "ktpl12-gk2-de2"], matrix: {
      "Quyền và nghĩa vụ của công dân về kinh doanh và nộp thuế": [3, 2, 2],
      "Quyền và nghĩa vụ về sở hữu tài sản, tôn trọng tài sản người khác": [2, 2, 2],
      "Quyền và nghĩa vụ của công dân trong hôn nhân và gia đình": [3, 2, 2], "Quyền và nghĩa vụ của công dân trong học tập": [2, 2, 1] } } },

  /* Lịch sử 12 · Kiểm tra giữa học kì II (Kết nối tri thức, Lịch sử 12, Bài 10–13: Chủ đề 4 Công cuộc Đổi mới ở Việt Nam từ năm 1986 đến
     nay, Chủ đề 5 đến hết Bài 13; Phiên N12-gk2-lichsu-diali). Phạm vi theo nguồn đa số tra được (ma trận giữa học kì II của một trường,
     đề cương giữa kì II đều bắt đầu từ Bài 10, khung kế hoạch dạy học đặt học kì II từ Bài 10), khác mặc định ban đầu Bài 9–13; lời dặn của đề nhắc phụ huynh
     đối chiếu đề cương khi trường kiểm tra cả Bài 9 hoặc Bài 14. Khối 12 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2 đề
     cố định, không có câu riêng. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 4 chủ đề theo tên bài (tên Bài 11–13 rút gọn): Bài 10
     5 câu, Bài 11 8 câu, Bài 12 6 câu, Bài 13 6 câu. Hai đề cố định chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó
     rút. Hai câu tự luận ở hai ô Vận dụng rút 1 câu (Bài 10; Bài 13): mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "lichsu12-gk2-de1", title: "Lịch sử 12 · Giữa kì II · Đề 1", grade: 12, subject: "Lịch sử", minutes: 45, n: 25, file: "12-lichsu.js" },
  { id: "lichsu12-gk2-de2", title: "Lịch sử 12 · Giữa kì II · Đề 2", grade: 12, subject: "Lịch sử", minutes: 45, n: 25, file: "12-lichsu.js" },
  { id: "lichsu12-gk2-ngau-nhien", title: "Lịch sử 12 · Giữa kì II · Đề ngẫu nhiên", grade: 12, subject: "Lịch sử", minutes: 45, n: 25, file: "12-lichsu.js",
    pool: { from: ["lichsu12-gk2-de1", "lichsu12-gk2-de2"], matrix: {
      "Khái quát về công cuộc Đổi mới từ năm 1986 đến nay": [2, 2, 1], "Thành tựu cơ bản và bài học của công cuộc Đổi mới": [3, 2, 3],
      "Hoạt động đối ngoại trong đấu tranh giành độc lập dân tộc": [2, 2, 2],
      "Hoạt động đối ngoại trong kháng chiến chống Pháp và chống Mỹ": [3, 2, 1] } } },

  /* Địa lí 12 · Kiểm tra giữa học kì II (Kết nối tri thức, Địa lí 12 bản chỉnh sửa năm 2026, Bài 20–27: Phần 3 các ngành dịch vụ, Phần 4
     Trung du và miền núi phía Bắc, Đồng bằng sông Hồng, Bắc Trung Bộ; Phiên N12-gk2-lichsu-diali). Phạm vi theo ma trận giữa học kì II và
     đề giữa kì II tra được; lời dặn của đề nhắc phụ huynh đối chiếu đề cương khi trường kiểm tra cả Bài 28. Khối 12 chưa bật nên đề chưa
     hiện với gia đình. Kho câu = 50 câu của 2 đề cố định, không có câu riêng. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 6 chủ đề
     theo tên bài (bài thực hành Bài 23, 26 không ra chủ đề riêng; tên Bài 20 rút gọn): phần dịch vụ 13 câu, phần vùng 12 câu. Hai đề cố
     định chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. Hai câu tự luận ở hai ô Vận dụng rút 1 câu (Thương
     mại và du lịch; Đồng bằng sông Hồng): mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "diali12-gk2-de1", title: "Địa lí 12 · Giữa kì II · Đề 1", grade: 12, subject: "Địa lí", minutes: 45, n: 25, file: "12-diali.js" },
  { id: "diali12-gk2-de2", title: "Địa lí 12 · Giữa kì II · Đề 2", grade: 12, subject: "Địa lí", minutes: 45, n: 25, file: "12-diali.js" },
  { id: "diali12-gk2-ngau-nhien", title: "Địa lí 12 · Giữa kì II · Đề ngẫu nhiên", grade: 12, subject: "Địa lí", minutes: 45, n: 25, file: "12-diali.js",
    pool: { from: ["diali12-gk2-de1", "diali12-gk2-de2"], matrix: {
      "Vai trò, các nhân tố ảnh hưởng đến các ngành dịch vụ": [1, 1, 1], "Giao thông vận tải và bưu chính viễn thông": [2, 1, 2],
      "Thương mại và du lịch": [2, 2, 1], "Khai thác thế mạnh ở Trung du và miền núi phía Bắc": [2, 1, 1],
      "Phát triển kinh tế – xã hội ở Đồng bằng sông Hồng": [2, 1, 1], "Phát triển kinh tế – xã hội ở Bắc Trung Bộ": [1, 2, 1] } } },

  /* Tin học 12 · Kiểm tra giữa học kì II (Kết nối tri thức, Tin học 12, phần chung của hai sách Định hướng Tin học ứng dụng và Định hướng
     Khoa học máy tính, Chủ đề 4 phần CSS Bài 13–17 và Chủ đề 5 Bài 19–20; Bài 18, 21 không ra chủ đề riêng; Phiên N12-gk2-tin-congnghe).
     Phạm vi theo nguồn đa số tra được (đề cương giữa kì II của một trường: Bài 16–21; một đề giữa kì II: CSS và nghề sửa chữa, bảo trì,
     quản trị), khác mặc định ban đầu Bài 13–18; lời dặn của đề nhắc phụ huynh đối chiếu đề cương khi trường chỉ kiểm tra phần CSS hay kiểm
     tra cả Bài 21. Khối 12 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2 đề cố định, không có câu riêng. Ma trận [Biết,
     Hiểu, Vận dụng] 10 – 8 – 7 câu trên 7 chủ đề theo tên bài: CSS 19 câu, hướng nghiệp 6 câu. Hai đề cố định chia đúng ma trận, nên ô (chủ
     đề, mức) nào cũng có gấp đôi số câu ô đó rút. Câu tự luận ở ô Vận dụng rút 1 câu: mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "tin12-gk2-de1", title: "Tin học 12 · Giữa kì II · Đề 1", grade: 12, subject: "Tin học", minutes: 45, n: 25, file: "12-tin.js" },
  { id: "tin12-gk2-de2", title: "Tin học 12 · Giữa kì II · Đề 2", grade: 12, subject: "Tin học", minutes: 45, n: 25, file: "12-tin.js" },
  { id: "tin12-gk2-ngau-nhien", title: "Tin học 12 · Giữa kì II · Đề ngẫu nhiên", grade: 12, subject: "Tin học", minutes: 45, n: 25, file: "12-tin.js",
    pool: { from: ["tin12-gk2-de1", "tin12-gk2-de2"], matrix: {
      "Khái niệm, vai trò của CSS": [1, 1, 1], "Định dạng văn bản bằng CSS": [2, 1, 1], "Tạo màu cho chữ và nền": [1, 2, 1], "Định dạng khung": [1, 1, 2],
      "Các mức ưu tiên của bộ chọn": [1, 2, 1], "Dịch vụ sửa chữa và bảo trì máy tính": [2, 0, 1],
      "Nhóm nghề quản trị trong ngành Công nghệ thông tin": [2, 1, 0] } } },

  /* Công nghệ 12 · Kiểm tra giữa học kì II (Kết nối tri thức, Công nghệ 12 – Công nghệ điện – điện tử, Phần hai Công nghệ điện tử,
     Chương V–VII: Bài 13–16, 18–19, trọng tâm Chương VI; Bài 17, 20 thực hành không ra chủ đề riêng; Phiên N12-gk2-tin-congnghe). Phạm vi
     theo đề cương, đề giữa kì II tra được (một đề cương dừng ở Chương VI, một đề có cả Chương VII), giữ mặc định; lời dặn của đề nhắc phụ
     huynh đối chiếu đề cương khi trường học sách Lâm nghiệp – Thuỷ sản hay chỉ kiểm tra đến Chương VI. Khối 12 chưa bật nên đề chưa hiện
     với gia đình. Kho câu = 50 câu của 2 đề cố định, không có câu riêng. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 6 chủ đề theo
     tên bài: Chương V 6 câu, Chương VI 13 câu, Chương VII 6 câu. Hai đề cố định chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi
     số câu ô đó rút. Câu tự luận ở ô Vận dụng rút 1 câu: mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "congnghe12-gk2-de1", title: "Công nghệ 12 · Giữa kì II · Đề 1", grade: 12, subject: "Công nghệ", minutes: 45, n: 25, file: "12-congnghe.js" },
  { id: "congnghe12-gk2-de2", title: "Công nghệ 12 · Giữa kì II · Đề 2", grade: 12, subject: "Công nghệ", minutes: 45, n: 25, file: "12-congnghe.js" },
  { id: "congnghe12-gk2-ngau-nhien", title: "Công nghệ 12 · Giữa kì II · Đề ngẫu nhiên", grade: 12, subject: "Công nghệ", minutes: 45, n: 25, file: "12-congnghe.js",
    pool: { from: ["congnghe12-gk2-de1", "congnghe12-gk2-de2"], matrix: {
      "Khái quát về kĩ thuật điện tử": [2, 1, 0], "Ngành nghề và dịch vụ trong lĩnh vực kĩ thuật điện tử": [2, 0, 1], "Điện trở, tụ điện và cuộn cảm": [2, 2, 3],
      "Diode, transistor và mạch tích hợp IC": [2, 2, 2], "Giới thiệu về điện tử tương tự": [1, 2, 0], "Khuếch đại thuật toán": [1, 1, 1] } } },

  /* Toán 12 · Kiểm tra cuối năm học (Kết nối tri thức, Toán 12 tập hai, Bài 11–19; Phiên N12-ck2-toan). Trọng tâm phần sau giữa kì II:
     Bài 16 Công thức tính góc trong không gian, Bài 17 Phương trình mặt cầu (Chương V), Bài 18 Xác suất có điều kiện, Bài 19 Công thức
     xác suất toàn phần và công thức Bayes (Chương VI); ôn Bài 11–15 (phạm vi kho giữa kì II toan12-gk2-*), không có câu ôn học kì I,
     không có chủ đề riêng cho Hoạt động thực hành trải nghiệm, Bài tập ôn tập cuối năm. Khối 12 chưa bật (data/grades.js) nên đề chưa
     hiện với gia đình. Kho câu = 25 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận
     dụng] 10 – 8 – 7 câu trên 9 chủ đề theo tên bài của sách: 17 câu Bài 16–19 (góc, mặt cầu 9; xác suất 8) và 8 câu ôn Bài 11–15 (chữ
     chủ đề như kho giữa kì II). Hai đề cố định và phần câu riêng đều chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp ba số câu ô
     đó rút. Hai câu tự luận chỉ ở hai ô Vận dụng rút 1 câu (Công thức tính góc trong không gian; Xác suất có điều kiện): mỗi lần rút
     nhiều nhất 2 câu tự luận. */
  { id: "toan12-ck2-de1", title: "Toán 12 · Cuối năm · Đề 1", grade: 12, subject: "Toán", minutes: 45, n: 25, file: "12-toan.js" },
  { id: "toan12-ck2-de2", title: "Toán 12 · Cuối năm · Đề 2", grade: 12, subject: "Toán", minutes: 45, n: 25, file: "12-toan.js" },
  { id: "toan12-ck2-ngau-nhien", title: "Toán 12 · Cuối năm · Đề ngẫu nhiên", grade: 12, subject: "Toán", minutes: 45, n: 25, file: "12-toan.js",
    pool: { from: ["toan12-ck2-de1", "toan12-ck2-de2"], matrix: {
      "Nguyên hàm": [1, 0, 0], "Tích phân": [1, 1, 0], "Ứng dụng hình học của tích phân": [0, 1, 1], "Phương trình mặt phẳng": [1, 0, 1],
      "Phương trình đường thẳng trong không gian": [1, 0, 0], "Công thức tính góc trong không gian": [2, 1, 1], "Phương trình mặt cầu": [2, 2, 1],
      "Xác suất có điều kiện": [1, 2, 1], "Công thức xác suất toàn phần và công thức Bayes": [1, 1, 2] } } },

  /* Toán 12 · Thi thử tốt nghiệp THPT (đề tính điểm, Phiên K5; Phiên N12-tn-toan: Đề 1–4, N12-tn-toan-b: Đề 5–7). Khung đề tốt nghiệp THPT từ năm 2025 (Quyết định 764/QĐ-BGDĐT): 90
     phút, 10 điểm, 22 câu: Phần I 12 câu nhiều lựa chọn (3 điểm), Phần II 4 câu đúng/sai 4 ý (4 điểm), Phần III 6 câu trả lời ngắn (3
     điểm). App chấm tự động cả ba phần như đề thật. Phạm vi chủ yếu Toán 12 cả năm, phần còn lại Toán 11 và một câu Toán 10 (ma trận đề
     tham khảo năm 2025). Đề cố định, không có đề ngẫu nhiên (pts không đi với pool); cách viết ở đầu phần đề này trong
     data/banks/12-toan.js. Khối 12 chưa bật nên đề chưa hiện với gia đình. */
  { id: "toan12-tn-de1", title: "Toán 12 · Thi thử tốt nghiệp · Đề 1", grade: 12, subject: "Toán", minutes: 90, n: 22, file: "12-toan.js", pts: 10 },
  { id: "toan12-tn-de2", title: "Toán 12 · Thi thử tốt nghiệp · Đề 2", grade: 12, subject: "Toán", minutes: 90, n: 22, file: "12-toan.js", pts: 10 },
  { id: "toan12-tn-de3", title: "Toán 12 · Thi thử tốt nghiệp · Đề 3", grade: 12, subject: "Toán", minutes: 90, n: 22, file: "12-toan.js", pts: 10 },
  { id: "toan12-tn-de4", title: "Toán 12 · Thi thử tốt nghiệp · Đề 4", grade: 12, subject: "Toán", minutes: 90, n: 22, file: "12-toan.js", pts: 10 },
  { id: "toan12-tn-de5", title: "Toán 12 · Thi thử tốt nghiệp · Đề 5", grade: 12, subject: "Toán", minutes: 90, n: 22, file: "12-toan.js", pts: 10 },
  { id: "toan12-tn-de6", title: "Toán 12 · Thi thử tốt nghiệp · Đề 6", grade: 12, subject: "Toán", minutes: 90, n: 22, file: "12-toan.js", pts: 10 },
  { id: "toan12-tn-de7", title: "Toán 12 · Thi thử tốt nghiệp · Đề 7", grade: 12, subject: "Toán", minutes: 90, n: 22, file: "12-toan.js", pts: 10 },
  { id: "toan12-tn-de8", title: "Toán 12 · Thi thử tốt nghiệp · Đề 8", grade: 12, subject: "Toán", minutes: 90, n: 22, file: "12-toan.js", pts: 10 },
  { id: "toan12-tn-de9", title: "Toán 12 · Thi thử tốt nghiệp · Đề 9", grade: 12, subject: "Toán", minutes: 90, n: 22, file: "12-toan.js", pts: 10 },
  { id: "toan12-tn-de10", title: "Toán 12 · Thi thử tốt nghiệp · Đề 10", grade: 12, subject: "Toán", minutes: 90, n: 22, file: "12-toan.js", pts: 10 },

  /* Ngữ văn 12 · Kiểm tra cuối năm học (Kết nối tri thức, Ngữ văn 12 tập hai, Bài 6–9, trọng tâm Bài 8–9; Phiên N12-ck2-van). Khối 12
     chưa bật (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2 đề cố định (mỗi đề 4 đoạn đọc, 1 câu Viết) + 2 câu
     Viết riêng trong file, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu như kho Ngữ văn 9 cuối năm: bốn chủ
     đề đọc hiểu theo tên Bài 6–9, Bài 6, 7 mỗi chủ đề [1, 1, 1] (đoạn 3 câu mức 1-2-3), Bài 8, 9 mỗi chủ đề [1, 1, 2] (đoạn 4 câu mức
     1-2-3-3), nên lần rút nào cũng lấy trọn một đoạn mỗi bài, đúng mức; 10 câu tiếng Việt theo bốn mục Thực hành tiếng Việt Bài 6–9:
     3 câu ôn Bài 6, 7 (đúng chữ chủ đề của kho giữa kì II), 7 câu Bài 8, 9; 1 câu Viết tự chấm. Hai đề cố định đúng ma trận nên ô
     (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút; câu Viết riêng giúp chủ đề Viết đủ bốn kiểu bài Viết của Bài 6–9. Câu tự luận
     chỉ ở ô Viết: mỗi lần rút đúng 1 câu. */
  { id: "van12-ck2-de1", title: "Ngữ văn 12 · Cuối năm · Đề 1", grade: 12, subject: "Ngữ văn", minutes: 45, n: 25, file: "12-van.js" },
  { id: "van12-ck2-de2", title: "Ngữ văn 12 · Cuối năm · Đề 2", grade: 12, subject: "Ngữ văn", minutes: 45, n: 25, file: "12-van.js" },
  { id: "van12-ck2-ngau-nhien", title: "Ngữ văn 12 · Cuối năm · Đề ngẫu nhiên", grade: 12, subject: "Ngữ văn", minutes: 45, n: 25, file: "12-van.js",
    pool: { from: ["van12-ck2-de1", "van12-ck2-de2"], matrix: {
      "Hồ Chí Minh – “Văn hoá phải soi đường cho quốc dân đi”": [1, 1, 1], "Sự thật trong tác phẩm kí": [1, 1, 1],
      "Dữ liệu trong văn bản thông tin": [1, 1, 2], "Văn học và cuộc đời": [1, 1, 2],
      "Biện pháp làm tăng tính khẳng định": [1, 0, 0], "Biện pháp làm tăng tính phủ định": [0, 1, 0],
      "Ngôn ngữ trang trọng và ngôn ngữ thân mật": [1, 0, 0], "Tôn trọng và bảo vệ quyền sở hữu trí tuệ": [2, 1, 0],
      "Giữ gìn và phát triển tiếng Việt": [2, 2, 0], "Viết": [0, 0, 1] } } },

  /* Ngữ văn 12 · Thi thử tốt nghiệp THPT (đề tính điểm, Phiên K5; Phiên N12-tn-van: Đề 1–2; Phiên N12-tn-van-b: Đề 3–4; Phiên
     N12-tn-van-c: Đề 5). Khung đề tốt nghiệp THPT từ năm 2025
     (Quyết định 764/QĐ-BGDĐT): tự luận 120 phút, 10 điểm; Phần I đọc hiểu một văn bản ngoài sách giáo khoa (4 điểm; đề thật năm 2025,
     2026 có 5 câu: hai câu Biết, hai câu Hiểu, một câu Vận dụng), Phần II viết đoạn văn nghị luận khoảng 200 chữ (2 điểm) và bài văn
     nghị luận khoảng 600 chữ (4 điểm). Đề cố định, không có đề ngẫu nhiên (pts không đi với pool). Câu đọc hiểu phần lớn chấm tự
     động (3 điểm), câu Vận dụng và hai câu viết tự chấm; cách viết ở đầu phần đề này trong data/banks/12-van.js. Khối 12 chưa bật nên
     đề chưa hiện với gia đình. Đề 1: truyện ngắn, Đề 2: văn bản nghị luận, Đề 3: bài thơ tám chữ (câu 1 Phần II so sánh, đánh giá
     hai đoạn thơ), Đề 4: văn bản thông tin có bảng số liệu, Đề 5: bài kí (tản văn; phần đọc hiểu 5 câu, điểm từng câu như đề thật,
     nên đề có 7 câu). */
  { id: "van12-tn-de1", title: "Ngữ văn 12 · Thi thử tốt nghiệp · Đề 1", grade: 12, subject: "Ngữ văn", minutes: 120, n: 8, file: "12-van.js", pts: 10, auto: 3 },
  { id: "van12-tn-de2", title: "Ngữ văn 12 · Thi thử tốt nghiệp · Đề 2", grade: 12, subject: "Ngữ văn", minutes: 120, n: 8, file: "12-van.js", pts: 10, auto: 3 },
  { id: "van12-tn-de3", title: "Ngữ văn 12 · Thi thử tốt nghiệp · Đề 3", grade: 12, subject: "Ngữ văn", minutes: 120, n: 8, file: "12-van.js", pts: 10, auto: 3 },
  { id: "van12-tn-de4", title: "Ngữ văn 12 · Thi thử tốt nghiệp · Đề 4", grade: 12, subject: "Ngữ văn", minutes: 120, n: 8, file: "12-van.js", pts: 10, auto: 3 },
  { id: "van12-tn-de5", title: "Ngữ văn 12 · Thi thử tốt nghiệp · Đề 5", grade: 12, subject: "Ngữ văn", minutes: 120, n: 7, file: "12-van.js", pts: 10, auto: 3 },

  /* Tiếng Anh 12 · Kiểm tra cuối năm học (Global Success 12, Units 6–10, Review 3, 4, trọng tâm Units 8–10; Phiên N12-ck2-ta). Khối 12
     chưa bật (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 25 câu riêng trong file (1 đoạn điền, 1 bài đọc) + 50 câu của 2
     đề cố định (mỗi đề 1 đoạn điền, 1 bài đọc), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu như kho Tiếng Anh
     12 cuối kì I: Pronunciation 2 (ngữ điệu câu hỏi của Unit 10; đồng hóa âm của Unit 8, trọng âm câu của Unit 9), Unit 6, 7, 10 mỗi
     Unit 3, Unit 8, 9 mỗi Unit 4 (trọng tâm Units 8–10: 11 câu, ôn Units 6–7: 6 câu, chữ chủ đề như kho giữa kì II), Cloze 3 (một đoạn
     điền 3 chỗ trống mức 1-2-3), Reading 3 (một bài đọc 3 câu mức 1-2-3). Hai đề cố định và câu riêng đều chia đúng ma trận nên ô (chủ
     đề, mức) nào cũng có gấp ba số câu ô đó rút. Không có câu nghe, không có câu tự luận. */
  { id: "ta12-ck2-de1", title: "Tiếng Anh 12 · Cuối năm · Đề 1", grade: 12, subject: "Tiếng Anh", minutes: 45, n: 25, file: "12-ta.js" },
  { id: "ta12-ck2-de2", title: "Tiếng Anh 12 · Cuối năm · Đề 2", grade: 12, subject: "Tiếng Anh", minutes: 45, n: 25, file: "12-ta.js" },
  { id: "ta12-ck2-ngau-nhien", title: "Tiếng Anh 12 · Cuối năm · Đề ngẫu nhiên", grade: 12, subject: "Tiếng Anh", minutes: 45, n: 25, file: "12-ta.js",
    pool: { from: ["ta12-ck2-de1", "ta12-ck2-de2"], matrix: {
      "Pronunciation": [1, 1, 0], "Unit 6 · Artificial Intelligence": [1, 1, 1], "Unit 7 · The World of Mass Media": [1, 1, 1],
      "Unit 8 · Wildlife Conservation": [2, 1, 1], "Unit 9 · Career Paths": [2, 1, 1], "Unit 10 · Lifelong Learning": [1, 1, 1],
      "Cloze": [1, 1, 1], "Reading": [1, 1, 1] } } },

  /* Tiếng Anh 12 · Thi thử tốt nghiệp THPT (đề tính điểm, Phiên K5; Phiên N12-tn-ta: Đề 1–2; Phiên N12-tn-ta-b: Đề 3–4; Phiên N12-tn-ta-c: Đề 5–6;
     Phiên N12-tn-ta-d: Đề 7–8; Phiên N12-tn-ta-e: Đề 9–10, đủ mười đề). Khung đề tốt nghiệp THPT từ năm 2025
     (Quyết định 764/QĐ-BGDĐT), đề năm 2026 giữ nguyên: 40 câu nhiều lựa chọn, 50 phút, 10 điểm, mỗi câu 0,25 điểm; Part I câu 1–12
     (điền vào quảng cáo hoặc thông báo, tờ rơi), Part II câu 13–17 (sắp xếp), Part III câu 18–22 (điền câu vào đoạn văn), Part IV câu 23–40 (hai bài
     đọc). App chấm tự động cả đề. Phạm vi Global Success 10–12, chủ yếu lớp 12. Đề cố định, không có đề ngẫu nhiên (pts không đi với
     pool); cách viết ở đầu phần đề này trong data/banks/12-ta.js. Khối 12 chưa bật nên đề chưa hiện với gia đình. */
  { id: "ta12-tn-de1", title: "Tiếng Anh 12 · Thi thử tốt nghiệp · Đề 1", grade: 12, subject: "Tiếng Anh", minutes: 50, n: 40, file: "12-ta.js", pts: 10 },
  { id: "ta12-tn-de2", title: "Tiếng Anh 12 · Thi thử tốt nghiệp · Đề 2", grade: 12, subject: "Tiếng Anh", minutes: 50, n: 40, file: "12-ta.js", pts: 10 },
  { id: "ta12-tn-de3", title: "Tiếng Anh 12 · Thi thử tốt nghiệp · Đề 3", grade: 12, subject: "Tiếng Anh", minutes: 50, n: 40, file: "12-ta.js", pts: 10 },
  { id: "ta12-tn-de4", title: "Tiếng Anh 12 · Thi thử tốt nghiệp · Đề 4", grade: 12, subject: "Tiếng Anh", minutes: 50, n: 40, file: "12-ta.js", pts: 10 },
  { id: "ta12-tn-de5", title: "Tiếng Anh 12 · Thi thử tốt nghiệp · Đề 5", grade: 12, subject: "Tiếng Anh", minutes: 50, n: 40, file: "12-ta.js", pts: 10 },
  { id: "ta12-tn-de6", title: "Tiếng Anh 12 · Thi thử tốt nghiệp · Đề 6", grade: 12, subject: "Tiếng Anh", minutes: 50, n: 40, file: "12-ta.js", pts: 10 },
  { id: "ta12-tn-de7", title: "Tiếng Anh 12 · Thi thử tốt nghiệp · Đề 7", grade: 12, subject: "Tiếng Anh", minutes: 50, n: 40, file: "12-ta.js", pts: 10 },
  { id: "ta12-tn-de8", title: "Tiếng Anh 12 · Thi thử tốt nghiệp · Đề 8", grade: 12, subject: "Tiếng Anh", minutes: 50, n: 40, file: "12-ta.js", pts: 10 },
  { id: "ta12-tn-de9", title: "Tiếng Anh 12 · Thi thử tốt nghiệp · Đề 9", grade: 12, subject: "Tiếng Anh", minutes: 50, n: 40, file: "12-ta.js", pts: 10 },
  { id: "ta12-tn-de10", title: "Tiếng Anh 12 · Thi thử tốt nghiệp · Đề 10", grade: 12, subject: "Tiếng Anh", minutes: 50, n: 40, file: "12-ta.js", pts: 10 },

  /* Vật lí 12 · Kiểm tra cuối năm học (Kết nối tri thức, Vật lí 12, Chương III Từ trường Bài 14–20 và Chương IV Vật lí hạt nhân Bài
     21–25, trọng tâm Chương IV; Phiên N12-ck2-vatli-hoahoc). Khối 12 chưa bật (data/grades.js) nên đề chưa hiện với gia đình. Trường
     chỉ kiểm tra Chương IV hay kiểm tra cả học kì I thì xem lời dặn của đề. Kho câu = 50 câu của 2 đề cố định, không có câu riêng. Ma
     trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 10 chủ đề theo tên bài (Bài 20, 25 là bài tập nên không ra chủ đề riêng): ôn Bài
     14–19 8 câu (chữ chủ đề như kho giữa kì II), Bài 21–24 17 câu. Hai đề cố định chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có
     gấp đôi số câu ô đó rút. Hai câu tự luận ở hai ô Vận dụng rút 1 câu (Cấu trúc hạt nhân; Hiện tượng phóng xạ): mỗi lần rút nhiều
     nhất 2 câu tự luận. */
  { id: "vatli12-ck2-de1", title: "Vật lí 12 · Cuối năm · Đề 1", grade: 12, subject: "Vật lí", minutes: 45, n: 25, file: "12-vatli.js" },
  { id: "vatli12-ck2-de2", title: "Vật lí 12 · Cuối năm · Đề 2", grade: 12, subject: "Vật lí", minutes: 45, n: 25, file: "12-vatli.js" },
  { id: "vatli12-ck2-ngau-nhien", title: "Vật lí 12 · Cuối năm · Đề ngẫu nhiên", grade: 12, subject: "Vật lí", minutes: 45, n: 25, file: "12-vatli.js",
    pool: { from: ["vatli12-ck2-de1", "vatli12-ck2-de2"], matrix: {
      "Từ trường": [1, 0, 0], "Lực từ tác dụng lên dây dẫn mang dòng điện. Cảm ứng từ": [0, 1, 1],
      "Từ thông. Hiện tượng cảm ứng điện từ": [0, 1, 1], "Máy phát điện xoay chiều": [0, 0, 1], "Ứng dụng hiện tượng cảm ứng điện từ": [0, 1, 0],
      "Điện từ trường. Mô hình sóng điện từ": [1, 0, 0], "Cấu trúc hạt nhân": [2, 1, 1], "Phản ứng hạt nhân và năng lượng liên kết": [2, 2, 1],
      "Hiện tượng phóng xạ": [3, 1, 1], "Công nghiệp hạt nhân": [1, 1, 1] } } },

  /* Vật lí 12 · Thi thử tốt nghiệp THPT (đề tính điểm, Phiên K5; Phiên N12-tn-vatli: Đề 1–4; Phiên N12-tn-vatli-b: Đề 5–8). Khung đề tốt nghiệp THPT từ năm 2025 (Quyết định
     764/QĐ-BGDĐT): 50 phút, 10 điểm, 28 câu: Phần I 18 câu nhiều lựa chọn (4,5 điểm), Phần II 4 câu đúng/sai 4 ý (4 điểm), Phần III 6 câu
     trả lời ngắn (1,5 điểm). App chấm tự động cả ba phần như đề thật. Phạm vi Vật lí 12 cả năm, như đề tham khảo năm 2025 và đề chính thức
     năm 2026. Đề cố định, không có đề ngẫu nhiên (pts không đi với pool); cách viết ở đầu phần đề này trong data/banks/12-vatli.js. Khối 12
     chưa bật nên đề chưa hiện với gia đình. */
  { id: "vatli12-tn-de1", title: "Vật lí 12 · Thi thử tốt nghiệp · Đề 1", grade: 12, subject: "Vật lí", minutes: 50, n: 28, file: "12-vatli.js", pts: 10 },
  { id: "vatli12-tn-de2", title: "Vật lí 12 · Thi thử tốt nghiệp · Đề 2", grade: 12, subject: "Vật lí", minutes: 50, n: 28, file: "12-vatli.js", pts: 10 },
  { id: "vatli12-tn-de3", title: "Vật lí 12 · Thi thử tốt nghiệp · Đề 3", grade: 12, subject: "Vật lí", minutes: 50, n: 28, file: "12-vatli.js", pts: 10 },
  { id: "vatli12-tn-de4", title: "Vật lí 12 · Thi thử tốt nghiệp · Đề 4", grade: 12, subject: "Vật lí", minutes: 50, n: 28, file: "12-vatli.js", pts: 10 },
  { id: "vatli12-tn-de5", title: "Vật lí 12 · Thi thử tốt nghiệp · Đề 5", grade: 12, subject: "Vật lí", minutes: 50, n: 28, file: "12-vatli.js", pts: 10 },
  { id: "vatli12-tn-de6", title: "Vật lí 12 · Thi thử tốt nghiệp · Đề 6", grade: 12, subject: "Vật lí", minutes: 50, n: 28, file: "12-vatli.js", pts: 10 },
  { id: "vatli12-tn-de7", title: "Vật lí 12 · Thi thử tốt nghiệp · Đề 7", grade: 12, subject: "Vật lí", minutes: 50, n: 28, file: "12-vatli.js", pts: 10 },
  { id: "vatli12-tn-de8", title: "Vật lí 12 · Thi thử tốt nghiệp · Đề 8", grade: 12, subject: "Vật lí", minutes: 50, n: 28, file: "12-vatli.js", pts: 10 },

  /* Hoá học 12 · Kiểm tra cuối năm học (Kết nối tri thức, Hoá học 12, Chương 6 Đại cương về kim loại, Chương 7 Nguyên tố nhóm IA và nhóm
     IIA, Chương 8 Sơ lược về dãy kim loại chuyển tiếp thứ nhất và phức chất, Bài 18–30, trọng tâm Chương 8; Phiên N12-ck2-vatli-hoahoc).
     Khối 12 chưa bật nên đề chưa hiện với gia đình. Trường kiểm tra cả Bài 15–16 thì xem lời dặn của đề. Kho câu = 50 câu của 2 đề cố
     định, không có câu riêng. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 10 chủ đề theo tên bài (Bài 23, 26, 30 ôn tập chương
     không ra chủ đề riêng): ôn Bài 18–22, 24 8 câu (chữ chủ đề như kho giữa kì II), Bài 25 5 câu, Bài 27–29 12 câu. Hai đề cố định chia
     đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. Hai câu tự luận ở hai ô Vận dụng rút 1 câu (Đại cương về kim
     loại chuyển tiếp dãy thứ nhất; Sơ lược về phức chất): mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "hoahoc12-ck2-de1", title: "Hóa học 12 · Cuối năm · Đề 1", grade: 12, subject: "Hóa học", minutes: 45, n: 25, file: "12-hoahoc.js" },
  { id: "hoahoc12-ck2-de2", title: "Hóa học 12 · Cuối năm · Đề 2", grade: 12, subject: "Hóa học", minutes: 45, n: 25, file: "12-hoahoc.js" },
  { id: "hoahoc12-ck2-ngau-nhien", title: "Hóa học 12 · Cuối năm · Đề ngẫu nhiên", grade: 12, subject: "Hóa học", minutes: 45, n: 25, file: "12-hoahoc.js",
    pool: { from: ["hoahoc12-ck2-de1", "hoahoc12-ck2-de2"], matrix: {
      "Cấu tạo và liên kết trong tinh thể kim loại": [1, 0, 0], "Tính chất vật lí và tính chất hoá học của kim loại": [1, 1, 0],
      "Kim loại trong tự nhiên và phương pháp tách kim loại": [0, 1, 1], "Hợp kim": [1, 0, 0], "Sự ăn mòn kim loại": [0, 1, 0],
      "Nguyên tố nhóm IA": [1, 0, 0], "Nguyên tố nhóm IIA": [2, 1, 2], "Đại cương về kim loại chuyển tiếp dãy thứ nhất": [2, 2, 1],
      "Sơ lược về phức chất": [1, 1, 1], "Một số tính chất và ứng dụng của phức chất": [1, 1, 2] } } },

  /* Hoá học 12 · Thi thử tốt nghiệp THPT (đề tính điểm, Phiên N12-tn-hoahoc: Đề 1–4). Khung đề tốt nghiệp THPT từ năm 2025 (Quyết định
     764/QĐ-BGDĐT): 50 phút, 10 điểm, 28 câu: Phần I 18 câu nhiều lựa chọn (4,5 điểm), Phần II 4 câu đúng/sai 4 ý (4 điểm), Phần III 6 câu
     trả lời ngắn (1,5 điểm). App chấm tự động cả ba phần như đề thật. Phạm vi chương trình THPT, chủ yếu Hoá học 12 cả năm; như đề tham
     khảo năm 2025, mỗi đề 2 câu lớp 10, 2 câu lớp 11. Đề cố định, không có đề ngẫu nhiên (pts không đi với pool); cách viết ở đầu phần đề
     này trong data/banks/12-hoahoc.js. Khối 12 chưa bật nên đề chưa hiện với gia đình. */
  { id: "hoahoc12-tn-de1", title: "Hóa học 12 · Thi thử tốt nghiệp · Đề 1", grade: 12, subject: "Hóa học", minutes: 50, n: 28, file: "12-hoahoc.js", pts: 10 },
  { id: "hoahoc12-tn-de2", title: "Hóa học 12 · Thi thử tốt nghiệp · Đề 2", grade: 12, subject: "Hóa học", minutes: 50, n: 28, file: "12-hoahoc.js", pts: 10 },
  { id: "hoahoc12-tn-de3", title: "Hóa học 12 · Thi thử tốt nghiệp · Đề 3", grade: 12, subject: "Hóa học", minutes: 50, n: 28, file: "12-hoahoc.js", pts: 10 },
  { id: "hoahoc12-tn-de4", title: "Hóa học 12 · Thi thử tốt nghiệp · Đề 4", grade: 12, subject: "Hóa học", minutes: 50, n: 28, file: "12-hoahoc.js", pts: 10 },
  { id: "hoahoc12-tn-de5", title: "Hóa học 12 · Thi thử tốt nghiệp · Đề 5", grade: 12, subject: "Hóa học", minutes: 50, n: 28, file: "12-hoahoc.js", pts: 10 },
  { id: "hoahoc12-tn-de6", title: "Hóa học 12 · Thi thử tốt nghiệp · Đề 6", grade: 12, subject: "Hóa học", minutes: 50, n: 28, file: "12-hoahoc.js", pts: 10 },
  { id: "hoahoc12-tn-de7", title: "Hóa học 12 · Thi thử tốt nghiệp · Đề 7", grade: 12, subject: "Hóa học", minutes: 50, n: 28, file: "12-hoahoc.js", pts: 10 },
  { id: "hoahoc12-tn-de8", title: "Hóa học 12 · Thi thử tốt nghiệp · Đề 8", grade: 12, subject: "Hóa học", minutes: 50, n: 28, file: "12-hoahoc.js", pts: 10 },

  /* Sinh học 12 · Thi thử tốt nghiệp THPT (đề tính điểm, Phiên N12-tn-sinhhoc: Đề 1–4). Khung đề tốt nghiệp THPT từ năm 2025 (Quyết định
     764/QĐ-BGDĐT): 50 phút, 10 điểm, 28 câu: Phần I 18 câu nhiều lựa chọn (4,5 điểm), Phần II 4 câu đúng/sai 4 ý (4 điểm), Phần III 6 câu
     trả lời ngắn (1,5 điểm). App chấm tự động cả ba phần như đề thật. Phạm vi chương trình THPT, chủ yếu Sinh học 12 cả năm; như đề tham
     khảo năm 2025 và đề chính thức năm 2026, mỗi đề 3 câu Sinh học 11 (6 trong 40 lệnh hỏi), không có câu Sinh học 10. Đề cố định, không có
     đề ngẫu nhiên (pts không đi với pool); cách viết ở đầu phần đề này trong data/banks/12-sinhhoc.js. Khối 12 chưa bật nên đề chưa hiện
     với gia đình. */
  { id: "sinhhoc12-tn-de1", title: "Sinh học 12 · Thi thử tốt nghiệp · Đề 1", grade: 12, subject: "Sinh học", minutes: 50, n: 28, file: "12-sinhhoc.js", pts: 10 },
  { id: "sinhhoc12-tn-de2", title: "Sinh học 12 · Thi thử tốt nghiệp · Đề 2", grade: 12, subject: "Sinh học", minutes: 50, n: 28, file: "12-sinhhoc.js", pts: 10 },
  { id: "sinhhoc12-tn-de3", title: "Sinh học 12 · Thi thử tốt nghiệp · Đề 3", grade: 12, subject: "Sinh học", minutes: 50, n: 28, file: "12-sinhhoc.js", pts: 10 },
  { id: "sinhhoc12-tn-de4", title: "Sinh học 12 · Thi thử tốt nghiệp · Đề 4", grade: 12, subject: "Sinh học", minutes: 50, n: 28, file: "12-sinhhoc.js", pts: 10 },
  { id: "sinhhoc12-tn-de5", title: "Sinh học 12 · Thi thử tốt nghiệp · Đề 5", grade: 12, subject: "Sinh học", minutes: 50, n: 28, file: "12-sinhhoc.js", pts: 10 },
  { id: "sinhhoc12-tn-de6", title: "Sinh học 12 · Thi thử tốt nghiệp · Đề 6", grade: 12, subject: "Sinh học", minutes: 50, n: 28, file: "12-sinhhoc.js", pts: 10 },
  { id: "sinhhoc12-tn-de7", title: "Sinh học 12 · Thi thử tốt nghiệp · Đề 7", grade: 12, subject: "Sinh học", minutes: 50, n: 28, file: "12-sinhhoc.js", pts: 10 },
  { id: "sinhhoc12-tn-de8", title: "Sinh học 12 · Thi thử tốt nghiệp · Đề 8", grade: 12, subject: "Sinh học", minutes: 50, n: 28, file: "12-sinhhoc.js", pts: 10 },

  /* Lịch sử 12 · Thi thử tốt nghiệp THPT (đề tính điểm, Phiên N12-tn-lichsu: Đề 1–4; Phiên N12-tn-lichsu-b: Đề 5–8). Khung đề tốt nghiệp THPT từ năm 2025 (Quyết định
     764/QĐ-BGDĐT): 50 phút, 10 điểm, 28 câu: Phần I 24 câu nhiều lựa chọn (6 điểm), Phần II 4 câu đúng/sai 4 ý (4 điểm), không có Phần III.
     App chấm tự động cả hai phần như đề thật. Phạm vi chương trình THPT, chủ yếu Lịch sử 12 cả năm; như ma trận đề tham khảo năm 2025 (đề
     chính thức năm 2026 giữ cấu trúc), mỗi đề 6 câu Lịch sử 11 ở Phần I (6 trong 40 lệnh hỏi), không có câu Lịch sử 10, mỗi câu Phần II có
     một đoạn tư liệu người soạn viết. Đề cố định, không có đề ngẫu nhiên (pts không đi với pool); cách viết ở đầu phần đề này trong
     data/banks/12-lichsu.js. Khối 12 chưa bật nên đề chưa hiện với gia đình. */
  { id: "lichsu12-tn-de1", title: "Lịch sử 12 · Thi thử tốt nghiệp · Đề 1", grade: 12, subject: "Lịch sử", minutes: 50, n: 28, file: "12-lichsu.js", pts: 10 },
  { id: "lichsu12-tn-de2", title: "Lịch sử 12 · Thi thử tốt nghiệp · Đề 2", grade: 12, subject: "Lịch sử", minutes: 50, n: 28, file: "12-lichsu.js", pts: 10 },
  { id: "lichsu12-tn-de3", title: "Lịch sử 12 · Thi thử tốt nghiệp · Đề 3", grade: 12, subject: "Lịch sử", minutes: 50, n: 28, file: "12-lichsu.js", pts: 10 },
  { id: "lichsu12-tn-de4", title: "Lịch sử 12 · Thi thử tốt nghiệp · Đề 4", grade: 12, subject: "Lịch sử", minutes: 50, n: 28, file: "12-lichsu.js", pts: 10 },
  { id: "lichsu12-tn-de5", title: "Lịch sử 12 · Thi thử tốt nghiệp · Đề 5", grade: 12, subject: "Lịch sử", minutes: 50, n: 28, file: "12-lichsu.js", pts: 10 },
  { id: "lichsu12-tn-de6", title: "Lịch sử 12 · Thi thử tốt nghiệp · Đề 6", grade: 12, subject: "Lịch sử", minutes: 50, n: 28, file: "12-lichsu.js", pts: 10 },
  { id: "lichsu12-tn-de7", title: "Lịch sử 12 · Thi thử tốt nghiệp · Đề 7", grade: 12, subject: "Lịch sử", minutes: 50, n: 28, file: "12-lichsu.js", pts: 10 },
  { id: "lichsu12-tn-de8", title: "Lịch sử 12 · Thi thử tốt nghiệp · Đề 8", grade: 12, subject: "Lịch sử", minutes: 50, n: 28, file: "12-lichsu.js", pts: 10 },

  /* Địa lí 12 · Thi thử tốt nghiệp THPT (đề tính điểm, Phiên N12-tn-diali: Đề 1–4). Khung đề tốt nghiệp THPT từ năm 2025 (Quyết định
     764/QĐ-BGDĐT): 50 phút, 10 điểm, 28 câu: Phần I 18 câu nhiều lựa chọn (4,5 điểm), Phần II 4 câu đúng/sai 4 ý (4 điểm), Phần III 6 câu
     trả lời ngắn (1,5 điểm). App chấm tự động cả ba phần như đề thật. Phạm vi chương trình THPT, chủ yếu Địa lí 12 cả năm (bản chỉnh sửa
     năm 2026): đề tham khảo năm 2025 toàn câu lớp 12, đề chính thức năm 2026 có thêm số liệu lớp 11 và nội dung lớp 10, nên mỗi đề có 24 câu
     Địa lí 12 (mỗi bài lí thuyết một câu), 3 câu Địa lí 11 và 1 câu Địa lí 10, đều là câu kĩ năng (36 trong 40 lệnh hỏi thuộc lớp 12). Đề
     cố định, không có đề ngẫu nhiên (pts không đi với pool); cách viết ở đầu phần đề này trong data/banks/12-diali.js. Khối 12 chưa bật nên
     đề chưa hiện với gia đình. */
  { id: "diali12-tn-de1", title: "Địa lí 12 · Thi thử tốt nghiệp · Đề 1", grade: 12, subject: "Địa lí", minutes: 50, n: 28, file: "12-diali.js", pts: 10 },
  { id: "diali12-tn-de2", title: "Địa lí 12 · Thi thử tốt nghiệp · Đề 2", grade: 12, subject: "Địa lí", minutes: 50, n: 28, file: "12-diali.js", pts: 10 },
  { id: "diali12-tn-de3", title: "Địa lí 12 · Thi thử tốt nghiệp · Đề 3", grade: 12, subject: "Địa lí", minutes: 50, n: 28, file: "12-diali.js", pts: 10 },
  { id: "diali12-tn-de4", title: "Địa lí 12 · Thi thử tốt nghiệp · Đề 4", grade: 12, subject: "Địa lí", minutes: 50, n: 28, file: "12-diali.js", pts: 10 },
  { id: "diali12-tn-de5", title: "Địa lí 12 · Thi thử tốt nghiệp · Đề 5", grade: 12, subject: "Địa lí", minutes: 50, n: 28, file: "12-diali.js", pts: 10 },
  { id: "diali12-tn-de6", title: "Địa lí 12 · Thi thử tốt nghiệp · Đề 6", grade: 12, subject: "Địa lí", minutes: 50, n: 28, file: "12-diali.js", pts: 10 },
  { id: "diali12-tn-de7", title: "Địa lí 12 · Thi thử tốt nghiệp · Đề 7", grade: 12, subject: "Địa lí", minutes: 50, n: 28, file: "12-diali.js", pts: 10 },
  { id: "diali12-tn-de8", title: "Địa lí 12 · Thi thử tốt nghiệp · Đề 8", grade: 12, subject: "Địa lí", minutes: 50, n: 28, file: "12-diali.js", pts: 10 },
  /* GDKT&PL 12 · Thi thử tốt nghiệp THPT (đề tính điểm, Phiên N12-tn-ktpl: Đề 1–3; Phiên N12-tn-ktpl-b: Đề 4–5). Khung đề tốt nghiệp THPT từ năm 2025 (Quyết định
     764/QĐ-BGDĐT): 50 phút, 10 điểm, 28 câu: Phần I 24 câu nhiều lựa chọn (6 điểm), Phần II 4 câu đúng/sai 4 ý (4 điểm), không có Phần III.
     App chấm tự động cả hai phần như đề thật. Phạm vi chương trình THPT, chủ yếu GDKT&PL 12 cả năm; như ma trận đề tham khảo năm 2025 (đề
     chính thức năm 2026 giữ cấu trúc), mỗi đề có 16 câu GDKT&PL 12 (mỗi bài một câu), 8 câu GDKT&PL 11 và 4 câu GDKT&PL 10, câu lớp 10, 11
     đều ở Phần I (12 trong 40 lệnh hỏi). Đề cố định, không có đề ngẫu nhiên (pts không đi với pool); cách viết ở đầu phần đề này trong
     data/banks/12-ktpl.js. Khối 12 chưa bật nên đề chưa hiện với gia đình. */
  { id: "ktpl12-tn-de1", title: "GDKT&PL 12 · Thi thử tốt nghiệp · Đề 1", grade: 12, subject: "GDKT&PL", minutes: 50, n: 28, file: "12-ktpl.js", pts: 10 },
  { id: "ktpl12-tn-de2", title: "GDKT&PL 12 · Thi thử tốt nghiệp · Đề 2", grade: 12, subject: "GDKT&PL", minutes: 50, n: 28, file: "12-ktpl.js", pts: 10 },
  { id: "ktpl12-tn-de3", title: "GDKT&PL 12 · Thi thử tốt nghiệp · Đề 3", grade: 12, subject: "GDKT&PL", minutes: 50, n: 28, file: "12-ktpl.js", pts: 10 },
  { id: "ktpl12-tn-de4", title: "GDKT&PL 12 · Thi thử tốt nghiệp · Đề 4", grade: 12, subject: "GDKT&PL", minutes: 50, n: 28, file: "12-ktpl.js", pts: 10 },
  { id: "ktpl12-tn-de5", title: "GDKT&PL 12 · Thi thử tốt nghiệp · Đề 5", grade: 12, subject: "GDKT&PL", minutes: 50, n: 28, file: "12-ktpl.js", pts: 10 },
  /* Tin học 12 · Thi thử tốt nghiệp THPT (đề tính điểm, Phiên N12-tn-tin: Đề 1–3). Khung đề tốt nghiệp THPT từ năm 2025 (Quyết định
     764/QĐ-BGDĐT): 50 phút, 10 điểm, 28 câu: Phần I 24 câu nhiều lựa chọn (6 điểm), Phần II 4 câu đúng/sai 4 ý (4 điểm), không có Phần III.
     Như đề chính thức năm 2025, 2026, cả 24 câu Phần I là phần chung; Phần II 2 câu chung và 2 câu riêng của một định hướng (Đề 1, Đề 3 Tin
     học ứng dụng, Đề 2 Khoa học máy tính). App chấm tự động cả hai phần như đề thật. Đề cố định, không có đề ngẫu nhiên (pts không đi với
     pool); cách viết ở đầu phần đề này trong data/banks/12-tin.js. Khối 12 chưa bật nên đề chưa hiện với gia đình. */
  { id: "tin12-tn-de1", title: "Tin học 12 · Thi thử tốt nghiệp · Đề 1", grade: 12, subject: "Tin học", minutes: 50, n: 28, file: "12-tin.js", pts: 10 },
  { id: "tin12-tn-de2", title: "Tin học 12 · Thi thử tốt nghiệp · Đề 2", grade: 12, subject: "Tin học", minutes: 50, n: 28, file: "12-tin.js", pts: 10 },
  { id: "tin12-tn-de3", title: "Tin học 12 · Thi thử tốt nghiệp · Đề 3", grade: 12, subject: "Tin học", minutes: 50, n: 28, file: "12-tin.js", pts: 10 },
  { id: "tin12-tn-de4", title: "Tin học 12 · Thi thử tốt nghiệp · Đề 4", grade: 12, subject: "Tin học", minutes: 50, n: 28, file: "12-tin.js", pts: 10 },
  { id: "tin12-tn-de5", title: "Tin học 12 · Thi thử tốt nghiệp · Đề 5", grade: 12, subject: "Tin học", minutes: 50, n: 28, file: "12-tin.js", pts: 10 },
  /* Công nghệ 12 · Thi thử tốt nghiệp THPT, định hướng Công nghiệp (đề tính điểm, Phiên N12-tn-congnghe: Đề 1–3). Khung đề tốt nghiệp
     THPT từ năm 2025 (Quyết định 764/QĐ-BGDĐT): 50 phút, 10 điểm, 28 câu: Phần I 24 câu nhiều lựa chọn (6 điểm), Phần II 4 câu đúng/sai 4
     ý (4 điểm), không có Phần III. Môn Công nghệ thi hai đề riêng theo định hướng; các đề này là đề định hướng Công nghiệp (Công nghệ 10 –
     Thiết kế và công nghệ, Công nghệ 11 – Công nghệ cơ khí, Công nghệ 12 – Công nghệ điện – điện tử). App chấm tự động cả hai phần như đề
     thật. Đề cố định, không có đề ngẫu nhiên (pts không đi với pool); cách viết ở đầu phần đề này trong data/banks/12-congnghe.js. Khối 12
     chưa bật nên đề chưa hiện với gia đình. */
  { id: "congnghe12-tn-de1", title: "Công nghệ 12 · Thi thử tốt nghiệp · Đề 1", grade: 12, subject: "Công nghệ", minutes: 50, n: 28, file: "12-congnghe.js", pts: 10 },
  { id: "congnghe12-tn-de2", title: "Công nghệ 12 · Thi thử tốt nghiệp · Đề 2", grade: 12, subject: "Công nghệ", minutes: 50, n: 28, file: "12-congnghe.js", pts: 10 },
  { id: "congnghe12-tn-de3", title: "Công nghệ 12 · Thi thử tốt nghiệp · Đề 3", grade: 12, subject: "Công nghệ", minutes: 50, n: 28, file: "12-congnghe.js", pts: 10 },
  { id: "congnghe12-tn-de4", title: "Công nghệ 12 · Thi thử tốt nghiệp · Đề 4", grade: 12, subject: "Công nghệ", minutes: 50, n: 28, file: "12-congnghe.js", pts: 10 },
  { id: "congnghe12-tn-de5", title: "Công nghệ 12 · Thi thử tốt nghiệp · Đề 5", grade: 12, subject: "Công nghệ", minutes: 50, n: 28, file: "12-congnghe.js", pts: 10 },

  /* Sinh học 12 · Kiểm tra cuối năm học (Kết nối tri thức, Sinh học 12, Phần sáu Sinh thái học và môi trường, Bài 23–35; Phiên
     N12-ck2-sinhhoc-ktpl). Phạm vi theo ma trận cuối kì II tra được, trọng tâm Chương 7–8; lời dặn của đề nhắc trường kiểm tra cả Tiến
     hoá (Bài 19–22) ôn thêm các đề giữa kì II. Khối 12 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2 đề cố định, không
     có câu riêng. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 9 chủ đề theo tên bài (Bài 25, 27, 32 thực hành, Bài 35 dự án
     không ra chủ đề riêng): ôn Bài 23–24 5 câu (chữ chủ đề như kho giữa kì II), Chương 7 16 câu, Chương 8 4 câu. Hai đề cố định chia
     đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. Hai câu tự luận ở hai ô Vận dụng rút 1 câu (Quần xã sinh
     vật; Sinh quyển, khu sinh học và chu trình sinh – địa – hoá): mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "sinhhoc12-ck2-de1", title: "Sinh học 12 · Cuối năm · Đề 1", grade: 12, subject: "Sinh học", minutes: 45, n: 25, file: "12-sinhhoc.js" },
  { id: "sinhhoc12-ck2-de2", title: "Sinh học 12 · Cuối năm · Đề 2", grade: 12, subject: "Sinh học", minutes: 45, n: 25, file: "12-sinhhoc.js" },
  { id: "sinhhoc12-ck2-ngau-nhien", title: "Sinh học 12 · Cuối năm · Đề ngẫu nhiên", grade: 12, subject: "Sinh học", minutes: 45, n: 25, file: "12-sinhhoc.js",
    pool: { from: ["sinhhoc12-ck2-de1", "sinhhoc12-ck2-de2"], matrix: {
      "Môi trường và các nhân tố sinh thái": [1, 1, 0], "Sinh thái học quần thể": [1, 1, 1], "Quần xã sinh vật": [2, 1, 1], "Hệ sinh thái": [1, 1, 0],
      "Trao đổi vật chất và chuyển hoá năng lượng trong hệ sinh thái": [1, 1, 2], "Diễn thế sinh thái": [1, 1, 1],
      "Sinh quyển, khu sinh học và chu trình sinh – địa – hoá": [1, 1, 1], "Sinh thái học phục hồi và bảo tồn đa dạng sinh vật": [1, 0, 1],
      "Phát triển bền vững": [1, 1, 0] } } },

  /* GDKT&PL 12 · Kiểm tra cuối năm học (Kết nối tri thức, Giáo dục kinh tế và pháp luật 12, Phần hai Giáo dục pháp luật, Bài 10–16;
     Phiên N12-ck2-sinhhoc-ktpl). Phạm vi theo đề cương ôn tập, đề kiểm tra học kì II tra được, trọng tâm Bài 12–16; lời dặn của đề nhắc
     trường kiểm tra cả Bài 8–9 ôn thêm các đề giữa kì II. Khối 12 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2 đề cố
     định, không có câu riêng; câu tình huống là chính. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 7 chủ đề theo tên bài (tên Bài
     12, 13, 16 rút gọn): ôn Bài 10–11 6 câu (chữ chủ đề như kho giữa kì II), Bài 12–13 8 câu, Bài 14–16 11 câu. Hai đề cố định chia
     đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. Một câu tự luận (Đề 2) ở ô Vận dụng rút 1 câu của “Quyền và
     nghĩa vụ về di sản văn hoá, môi trường, tài nguyên”: mỗi lần rút nhiều nhất 1 câu tự luận. */
  { id: "ktpl12-ck2-de1", title: "GDKT&PL 12 · Cuối năm · Đề 1", grade: 12, subject: "GDKT&PL", minutes: 45, n: 25, file: "12-ktpl.js" },
  { id: "ktpl12-ck2-de2", title: "GDKT&PL 12 · Cuối năm · Đề 2", grade: 12, subject: "GDKT&PL", minutes: 45, n: 25, file: "12-ktpl.js" },
  { id: "ktpl12-ck2-ngau-nhien", title: "GDKT&PL 12 · Cuối năm · Đề ngẫu nhiên", grade: 12, subject: "GDKT&PL", minutes: 45, n: 25, file: "12-ktpl.js",
    pool: { from: ["ktpl12-ck2-de1", "ktpl12-ck2-de2"], matrix: {
      "Quyền và nghĩa vụ của công dân trong hôn nhân và gia đình": [1, 1, 1], "Quyền và nghĩa vụ của công dân trong học tập": [1, 1, 1],
      "Quyền và nghĩa vụ về chăm sóc sức khoẻ, bảo đảm an sinh xã hội": [2, 1, 1],
      "Quyền và nghĩa vụ về di sản văn hoá, môi trường, tài nguyên": [2, 1, 1], "Một số vấn đề chung về pháp luật quốc tế": [2, 1, 1],
      "Công pháp quốc tế về dân cư, lãnh thổ và chủ quyền quốc gia": [1, 2, 1],
      "Nguyên tắc cơ bản của WTO và hợp đồng thương mại quốc tế": [1, 1, 1] } } },

  /* Lịch sử 12 · Kiểm tra cuối năm học (Kết nối tri thức, Lịch sử 12, Bài 10–17: Chủ đề 4, 5 và Chủ đề 6 Hồ Chí Minh trong lịch sử Việt
     Nam; Phiên N12-ck2-lichsu-diali). Phạm vi theo nguồn đa số tra được, trọng tâm Bài 14–17; Bài 10–13 là phần ôn (chữ chủ đề như kho
     giữa kì II); lời dặn của đề nhắc trường chỉ kiểm tra Chủ đề 6 hoặc kiểm tra cả Bài 9 đối chiếu đề cương. Khối 12 chưa bật nên đề chưa
     hiện với gia đình. Kho câu = 50 câu của 2 đề cố định, không có câu riêng. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 8 chủ
     đề theo tên bài (tên Bài 11–13 rút gọn như kho giữa kì II): ôn Bài 10–13 4 câu, Bài 14 5 câu, Bài 15–17 16 câu. Hai đề cố định chia
     đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. Hai câu tự luận ở hai ô Vận dụng rút 1 câu (Bài 14; Bài 17):
     mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "lichsu12-ck2-de1", title: "Lịch sử 12 · Cuối năm · Đề 1", grade: 12, subject: "Lịch sử", minutes: 45, n: 25, file: "12-lichsu.js" },
  { id: "lichsu12-ck2-de2", title: "Lịch sử 12 · Cuối năm · Đề 2", grade: 12, subject: "Lịch sử", minutes: 45, n: 25, file: "12-lichsu.js" },
  { id: "lichsu12-ck2-ngau-nhien", title: "Lịch sử 12 · Cuối năm · Đề ngẫu nhiên", grade: 12, subject: "Lịch sử", minutes: 45, n: 25, file: "12-lichsu.js",
    pool: { from: ["lichsu12-ck2-de1", "lichsu12-ck2-de2"], matrix: {
      "Khái quát về công cuộc Đổi mới từ năm 1986 đến nay": [1, 0, 0], "Thành tựu cơ bản và bài học của công cuộc Đổi mới": [0, 0, 1],
      "Hoạt động đối ngoại trong đấu tranh giành độc lập dân tộc": [1, 0, 0],
      "Hoạt động đối ngoại trong kháng chiến chống Pháp và chống Mỹ": [0, 1, 0],
      "Hoạt động đối ngoại của Việt Nam từ năm 1975 đến nay": [2, 2, 1], "Khái quát cuộc đời và sự nghiệp của Hồ Chí Minh": [2, 1, 2],
      "Hồ Chí Minh – Anh hùng giải phóng dân tộc": [3, 3, 2], "Dấu ấn Hồ Chí Minh trong lòng nhân dân thế giới và Việt Nam": [1, 1, 1] } } },

  /* Địa lí 12 · Kiểm tra cuối năm học (Kết nối tri thức, Địa lí 12 bản chỉnh sửa năm 2026, Bài 20–35: ôn Phần 3 các ngành dịch vụ và
     Bài 24–27, trọng tâm Bài 28–33 Duyên hải Nam Trung Bộ và Tây Nguyên, Đông Nam Bộ, Đồng bằng sông Cửu Long, Biển Đông và các đảo,
     quần đảo; Phiên N12-ck2-lichsu-diali). Phạm vi theo nguồn đa số tra được; lời dặn của đề nhắc trường chỉ kiểm tra Bài 28–33 bỏ qua
     câu ôn. Khối 12 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2 đề cố định, không có câu riêng. Ma trận [Biết, Hiểu,
     Vận dụng] 10 – 8 – 7 câu trên 10 chủ đề theo tên bài (bài thực hành Bài 23, 26, 29, 32, 34, 35 không ra chủ đề riêng; tên Bài 20
     rút gọn như kho giữa kì II, tên Bài 28, 31, 33 rút gọn): ôn Bài 20–27 6 câu (chữ chủ đề như kho giữa kì II), Bài 28–33 19 câu.
     Hai đề cố định chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. Hai câu tự luận ở hai ô Vận dụng rút 1
     câu (Đồng bằng sông Cửu Long; Biển Đông): mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "diali12-ck2-de1", title: "Địa lí 12 · Cuối năm · Đề 1", grade: 12, subject: "Địa lí", minutes: 45, n: 25, file: "12-diali.js" },
  { id: "diali12-ck2-de2", title: "Địa lí 12 · Cuối năm · Đề 2", grade: 12, subject: "Địa lí", minutes: 45, n: 25, file: "12-diali.js" },
  { id: "diali12-ck2-ngau-nhien", title: "Địa lí 12 · Cuối năm · Đề ngẫu nhiên", grade: 12, subject: "Địa lí", minutes: 45, n: 25, file: "12-diali.js",
    pool: { from: ["diali12-ck2-de1", "diali12-ck2-de2"], matrix: {
      "Vai trò, các nhân tố ảnh hưởng đến các ngành dịch vụ": [1, 0, 0], "Giao thông vận tải và bưu chính viễn thông": [0, 0, 1],
      "Thương mại và du lịch": [0, 1, 0], "Khai thác thế mạnh ở Trung du và miền núi phía Bắc": [1, 0, 0],
      "Phát triển kinh tế – xã hội ở Đồng bằng sông Hồng": [0, 1, 0], "Phát triển kinh tế – xã hội ở Bắc Trung Bộ": [0, 0, 1],
      "Phát triển kinh tế – xã hội ở Nam Trung Bộ": [2, 2, 1], "Phát triển kinh tế – xã hội ở Đông Nam Bộ": [2, 1, 2],
      "Sử dụng hợp lí tự nhiên ở Đồng bằng sông Cửu Long": [2, 2, 1],
      "Phát triển kinh tế và đảm bảo quốc phòng, an ninh ở Biển Đông": [2, 1, 1] } } },

  /* Tin học 12 · Kiểm tra cuối năm học (Kết nối tri thức, Tin học 12, phần chung của hai sách Định hướng Tin học ứng dụng và Định hướng
     Khoa học máy tính: Chủ đề 4 phần CSS Bài 13–17, Chủ đề 5 Bài 19–20, trọng tâm Bài 17, 19–20; Bài 18, 21 không ra chủ đề riêng;
     Phiên N12-ck2-tin-congnghe). Phạm vi mặc định của PO (chưa xem được nguồn); phần riêng của hai định hướng không vào kho, lời dặn của
     đề nhắc trường kiểm tra phần riêng thì đối chiếu đề cương. Khối 12 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2 đề
     cố định, không có câu riêng. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 7 chủ đề, cùng chữ chủ đề với kho giữa kì II: Bài 13–16
     10 câu, Bài 17, 19–20 15 câu. Hai đề cố định chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. Câu tự luận
     ở ô Vận dụng rút 1 câu: mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "tin12-ck2-de1", title: "Tin học 12 · Cuối năm · Đề 1", grade: 12, subject: "Tin học", minutes: 45, n: 25, file: "12-tin.js" },
  { id: "tin12-ck2-de2", title: "Tin học 12 · Cuối năm · Đề 2", grade: 12, subject: "Tin học", minutes: 45, n: 25, file: "12-tin.js" },
  { id: "tin12-ck2-ngau-nhien", title: "Tin học 12 · Cuối năm · Đề ngẫu nhiên", grade: 12, subject: "Tin học", minutes: 45, n: 25, file: "12-tin.js",
    pool: { from: ["tin12-ck2-de1", "tin12-ck2-de2"], matrix: {
      "Khái niệm, vai trò của CSS": [1, 1, 0], "Định dạng văn bản bằng CSS": [1, 0, 1], "Tạo màu cho chữ và nền": [1, 1, 1],
      "Định dạng khung": [1, 1, 1], "Các mức ưu tiên của bộ chọn": [3, 3, 3], "Dịch vụ sửa chữa và bảo trì máy tính": [1, 1, 1],
      "Nhóm nghề quản trị trong ngành Công nghệ thông tin": [2, 1, 0] } } },

  /* Công nghệ 12 · Kiểm tra cuối năm học (Kết nối tri thức, Công nghệ 12 – Công nghệ điện – điện tử, Phần hai Công nghệ điện tử,
     Chương V–IX: Bài 13–16, 18–19, 21–22, 24–25, trọng tâm Chương VIII–IX; bài thực hành Bài 17, 20, 23, 26 không ra chủ đề riêng; Phiên
     N12-ck2-tin-congnghe). Phạm vi mặc định của PO (chưa xem được nguồn); lời dặn của đề nhắc trường chỉ kiểm tra Chương VIII–IX bỏ qua
     câu ôn, trường học sách Lâm nghiệp – Thuỷ sản đối chiếu đề cương. Khối 12 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50 câu
     của 2 đề cố định, không có câu riêng. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 10 chủ đề theo tên bài: ôn Chương V–VII
     9 câu (chữ chủ đề như kho giữa kì II), Chương VIII–IX 16 câu. Hai đề cố định chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp
     đôi số câu ô đó rút. Câu tự luận ở ô Vận dụng rút 1 câu: mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "congnghe12-ck2-de1", title: "Công nghệ 12 · Cuối năm · Đề 1", grade: 12, subject: "Công nghệ", minutes: 45, n: 25, file: "12-congnghe.js" },
  { id: "congnghe12-ck2-de2", title: "Công nghệ 12 · Cuối năm · Đề 2", grade: 12, subject: "Công nghệ", minutes: 45, n: 25, file: "12-congnghe.js" },
  { id: "congnghe12-ck2-ngau-nhien", title: "Công nghệ 12 · Cuối năm · Đề ngẫu nhiên", grade: 12, subject: "Công nghệ", minutes: 45, n: 25, file: "12-congnghe.js",
    pool: { from: ["congnghe12-ck2-de1", "congnghe12-ck2-de2"], matrix: {
      "Khái quát về kĩ thuật điện tử": [1, 0, 0], "Ngành nghề và dịch vụ trong lĩnh vực kĩ thuật điện tử": [1, 0, 0],
      "Điện trở, tụ điện và cuộn cảm": [1, 1, 0], "Diode, transistor và mạch tích hợp IC": [0, 1, 1], "Giới thiệu về điện tử tương tự": [0, 1, 0],
      "Khuếch đại thuật toán": [1, 0, 1], "Tín hiệu số và các cổng logic cơ bản": [2, 2, 1],
      "Một số mạch xử lí tín hiệu trong điện tử số": [2, 1, 1], "Khái quát về vi điều khiển": [1, 1, 2], "Bo mạch lập trình vi điều khiển": [1, 1, 1] } } },

  /* Toán 7 · Kiểm tra cuối học kì I (Kết nối tri thức, Toán 7 tập một, Bài 1–19: Chương I Số hữu tỉ, Chương II Số thực, Chương III Góc
     và đường thẳng song song, Chương IV Tam giác bằng nhau, Chương V Thu thập và biểu diễn dữ liệu; Phiên N7-ck1-toan). Khối 7 chưa bật
     (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 50 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức độ.
     Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 19 chủ đề theo tên bài (Bài 5 “Làm quen với số thập phân vô hạn tuần hoàn”, Bài 13
     “Hai tam giác bằng nhau. Trường hợp bằng nhau thứ nhất của tam giác” ghi gọn): Chương I 6 câu, Chương II 4, Chương III 4, Chương IV 8,
     Chương V 3. Mỗi ô (chủ đề, mức) rút 1 câu và có 4 câu: một câu ở mỗi đề cố định, hai câu riêng, nên học sinh đã làm một đề cố định
     vẫn gặp câu mới. Câu tự luận (chứng minh hai tam giác bằng nhau) chỉ ở hai ô Vận dụng của Bài 14, Bài 15: mỗi lần rút nhiều nhất
     2 câu tự luận. */
  { id: "toan7-ck1-de1", title: "Toán 7 · Cuối kì I · Đề 1", grade: 7, subject: "Toán", minutes: 45, n: 25, file: "7-toan.js" },
  { id: "toan7-ck1-de2", title: "Toán 7 · Cuối kì I · Đề 2", grade: 7, subject: "Toán", minutes: 45, n: 25, file: "7-toan.js" },
  { id: "toan7-ck1-ngau-nhien", title: "Toán 7 · Cuối kì I · Đề ngẫu nhiên", grade: 7, subject: "Toán", minutes: 45, n: 25, file: "7-toan.js",
    pool: { from: ["toan7-ck1-de1", "toan7-ck1-de2"], matrix: {
      "Tập hợp các số hữu tỉ": [1, 1, 0], "Cộng, trừ, nhân, chia số hữu tỉ": [1, 0, 1], "Luỹ thừa với số mũ tự nhiên của một số hữu tỉ": [0, 1, 0],
      "Thứ tự thực hiện các phép tính. Quy tắc chuyển vế": [0, 0, 1], "Số thập phân vô hạn tuần hoàn": [1, 0, 0],
      "Số vô tỉ. Căn bậc hai số học": [1, 1, 0], "Tập hợp các số thực": [0, 0, 1], "Góc ở vị trí đặc biệt. Tia phân giác của một góc": [1, 0, 0],
      "Hai đường thẳng song song và dấu hiệu nhận biết": [1, 0, 0], "Tiên đề Euclid. Tính chất của hai đường thẳng song song": [0, 0, 1],
      "Định lí và chứng minh định lí": [0, 1, 0], "Tổng các góc trong một tam giác": [1, 1, 0], "Hai tam giác bằng nhau. Trường hợp bằng nhau thứ nhất": [1, 0, 0],
      "Trường hợp bằng nhau thứ hai và thứ ba của tam giác": [0, 1, 1], "Các trường hợp bằng nhau của tam giác vuông": [0, 0, 1],
      "Tam giác cân. Đường trung trực của đoạn thẳng": [1, 1, 0], "Thu thập và phân loại dữ liệu": [1, 0, 0],
      "Biểu đồ hình quạt tròn": [0, 0, 1], "Biểu đồ đoạn thẳng": [0, 1, 0] } } },
  /* Ngữ văn 7 · Kiểm tra cuối học kì I (Kết nối tri thức, Ngữ văn 7 tập một, Bài 1–5; Phiên N7-ck1-van). Khối 7 chưa bật nên đề chưa
     hiện với gia đình. Kho câu = 50 câu riêng trong file (5 đoạn đọc, 4 câu Viết) + 50 câu của 2 đề cố định (mỗi đề 5 đoạn đọc, 1 câu
     Viết), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu: năm chủ đề đọc hiểu theo tên Bài 1–5, mỗi chủ đề
     [1, 1, 1] (đoạn 3 câu mức 1-2-3), nên lần rút nào cũng lấy trọn một đoạn mỗi bài, đúng mức; 9 câu Tiếng Việt theo chín chủ đề
     gom từ các mục Thực hành tiếng Việt Bài 1–5 (Biết 5, Hiểu 3, Vận dụng 1: mở rộng thành phần câu); 1 câu Viết tự chấm. Hai đề cố
     định đúng ma trận, câu riêng thêm vào năm chủ đề đọc hiểu, chín chủ đề Tiếng Việt và Viết, nên ô (chủ đề, mức) nào cũng có ít nhất
     gấp đôi số câu ô đó rút. Câu tự luận chỉ ở ô Viết, không gắn đoạn đọc: mỗi lần rút đúng 1 câu, đủ sáu kiểu bài Viết của Bài 1–5. */
  { id: "van7-ck1-de1", title: "Ngữ văn 7 · Cuối kì I · Đề 1", grade: 7, subject: "Ngữ văn", minutes: 45, n: 25, file: "7-van.js" },
  { id: "van7-ck1-de2", title: "Ngữ văn 7 · Cuối kì I · Đề 2", grade: 7, subject: "Ngữ văn", minutes: 45, n: 25, file: "7-van.js" },
  { id: "van7-ck1-ngau-nhien", title: "Ngữ văn 7 · Cuối kì I · Đề ngẫu nhiên", grade: 7, subject: "Ngữ văn", minutes: 45, n: 25, file: "7-van.js",
    pool: { from: ["van7-ck1-de1", "van7-ck1-de2"], matrix: {
      "Bầu trời tuổi thơ": [1, 1, 1], "Khúc nhạc tâm hồn": [1, 1, 1], "Cội nguồn yêu thương": [1, 1, 1], "Giai điệu đất nước": [1, 1, 1],
      "Màu sắc trăm miền": [1, 1, 1], "Mở rộng thành phần câu bằng cụm từ": [0, 0, 1], "Từ láy": [1, 0, 0], "Nói giảm nói tránh": [1, 0, 0],
      "Nghĩa của từ ngữ trong ngữ cảnh": [0, 1, 0], "Biện pháp tu từ": [0, 1, 0], "Số từ": [1, 0, 0], "Phó từ": [1, 0, 0], "Dấu câu": [0, 1, 0],
      "Từ ngữ địa phương": [1, 0, 0], "Viết": [0, 0, 1] } } },
  /* Tiếng Anh 7 · Kiểm tra cuối học kì I (Global Success 7, Units 1–6, Review 1, 2; Phiên N7-ck1-ta). Khối 7 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50 câu riêng trong file (2 đoạn đọc) + 50 câu của 2 đề cố định (mỗi đề 1 đoạn đọc), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu: Pronunciation 2 (âm của Book map Units 1–6), Unit 1, 5 mỗi Unit 4 (hai câu từ vựng Biết), Unit 2, 3, 4, 6 mỗi Unit 3, Reading 3 (một đoạn 3 câu mức 1-2-3). Hai đề cố định đúng ma trận, câu riêng gấp đôi ma trận, nên ô (chủ đề, mức) nào cũng có gấp bốn số câu ô đó rút. Không có câu nghe, không có câu tự luận. */
  { id: "ta7-ck1-de1", title: "Tiếng Anh 7 · Cuối kì I · Đề 1", grade: 7, subject: "Tiếng Anh", minutes: 45, n: 25, file: "7-ta.js" },
  { id: "ta7-ck1-de2", title: "Tiếng Anh 7 · Cuối kì I · Đề 2", grade: 7, subject: "Tiếng Anh", minutes: 45, n: 25, file: "7-ta.js" },
  { id: "ta7-ck1-ngau-nhien", title: "Tiếng Anh 7 · Cuối kì I · Đề ngẫu nhiên", grade: 7, subject: "Tiếng Anh", minutes: 45, n: 25, file: "7-ta.js",
    pool: { from: ["ta7-ck1-de1", "ta7-ck1-de2"], matrix: {
      "Pronunciation": [1, 1, 0], "Unit 1 · Hobbies": [2, 1, 1], "Unit 2 · Healthy Living": [1, 1, 1], "Unit 3 · Community Service": [1, 1, 1],
      "Unit 4 · Music and Arts": [1, 1, 1], "Unit 5 · Food and Drink": [2, 1, 1], "Unit 6 · A Visit to a School": [1, 1, 1], "Reading": [1, 1, 1] } } },
  /* KHTN 7 · Kiểm tra cuối học kì I (Kết nối tri thức, Khoa học tự nhiên 7; Phiên N7-ck1-khtn). Khối 7 chưa bật nên đề chưa hiện
     với gia đình. Phạm vi mặc định PO chọn theo đề học kì 1 của Loigiaihay, đối chiếu đề cương học kì 1 của Loigiaihay, VietJack
     (nguồn ở mục 7 của docs/KE-HOACH-NOI-DUNG.md): Bài 1 2 câu, Chương I, II (Bài 2–7) 10 câu, Chương III–V (Bài 8–17) 13 câu; trường dạy song song ba phân môn thì xem đề cương của
     trường (note của đề có ghi). Kho câu = 25 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức độ. Ma trận [Biết,
     Hiểu, Vận dụng] 10 – 8 – 7 câu trên 17 chủ đề theo tên bài của sách (Bài 11 ghi gọn), ô nào cũng rút 1 câu. Hai đề cố định và 25
     câu riêng đều chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp ba số câu ô đó rút. Không có câu tự luận. */
  { id: "khtn7-ck1-de1", title: "KHTN 7 · Cuối kì I · Đề 1", grade: 7, subject: "KHTN", minutes: 45, n: 25, file: "7-khtn.js" },
  { id: "khtn7-ck1-de2", title: "KHTN 7 · Cuối kì I · Đề 2", grade: 7, subject: "KHTN", minutes: 45, n: 25, file: "7-khtn.js" },
  { id: "khtn7-ck1-ngau-nhien", title: "KHTN 7 · Cuối kì I · Đề ngẫu nhiên", grade: 7, subject: "KHTN", minutes: 45, n: 25, file: "7-khtn.js",
    pool: { from: ["khtn7-ck1-de1", "khtn7-ck1-de2"], matrix: {
      "Phương pháp và kĩ năng học tập môn Khoa học tự nhiên": [1, 1, 0], "Nguyên tử": [1, 0, 1], "Nguyên tố hoá học": [1, 0, 0],
      "Sơ lược về bảng tuần hoàn các nguyên tố hoá học": [0, 1, 1], "Phân tử – Đơn chất – Hợp chất": [1, 0, 1],
      "Giới thiệu về liên kết hoá học": [0, 1, 0], "Hoá trị và công thức hoá học": [0, 1, 1], "Tốc độ chuyển động": [1, 0, 1], "Đo tốc độ": [1, 0, 0],
      "Đồ thị quãng đường – thời gian": [0, 1, 1], "Ảnh hưởng của tốc độ trong an toàn giao thông": [0, 1, 0], "Sóng âm": [1, 0, 0],
      "Độ to và độ cao của âm": [1, 1, 0], "Phản xạ âm, chống ô nhiễm tiếng ồn": [1, 0, 0], "Năng lượng ánh sáng. Tia sáng, vùng tối": [1, 0, 0],
      "Sự phản xạ ánh sáng": [0, 1, 0], "Ảnh của vật qua gương phẳng": [0, 0, 1] } } },
  /* Lịch sử và Địa lí 7 · Kiểm tra cuối học kì I (Kết nối tri thức, bản chỉnh sửa năm 2026; Lịch sử Bài 1–10, Địa lí Bài 1–12; Phiên
     N7-ck1-lsdl-gdcd). Khối 7 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2 đề cố định (không có câu riêng), câu nào cũng có
     mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu, theo khung đề định kì (Công văn 7991): 12 câu Lịch sử (Bài 9, 10 mỗi bài 2 câu, các
     bài khác 1 câu; chữ chủ đề theo tên bài của sách, rút gọn), 13 câu Địa lí (Bài 5, 7, 9 mỗi bài 2 câu, các bài khác 1 câu; Bài 8, 12 là bài
     thực hành, không ra câu riêng). Hai đề cố định chia đúng theo ma trận, nên ô (chủ đề, mức) nào cũng có đúng 2 câu, gấp đôi số câu ô đó rút. */
  { id: "lsdl7-ck1-de1", title: "Lịch sử và Địa lí 7 · Cuối kì I · Đề 1", grade: 7, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "7-lsdl.js" },
  { id: "lsdl7-ck1-de2", title: "Lịch sử và Địa lí 7 · Cuối kì I · Đề 2", grade: 7, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "7-lsdl.js" },
  { id: "lsdl7-ck1-ngau-nhien", title: "Lịch sử và Địa lí 7 · Cuối kì I · Đề ngẫu nhiên", grade: 7, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "7-lsdl.js",
    pool: { from: ["lsdl7-ck1-de1", "lsdl7-ck1-de2"], matrix: {
      "Chế độ phong kiến ở Tây Âu": [1, 0, 0], "Các cuộc phát kiến địa lí": [0, 0, 1], "Văn hoá Phục hưng và Cải cách tôn giáo": [0, 1, 0],
      "Trung Quốc thời trung đại": [1, 0, 0], "Ấn Độ thời trung đại": [0, 1, 0], "Các vương quốc phong kiến Đông Nam Á": [1, 0, 0],
      "Vương quốc Lào": [0, 1, 0], "Vương quốc Cam-pu-chia": [0, 0, 1], "Đất nước buổi đầu độc lập (939 – 967)": [1, 1, 0],
      "Đại Cồ Việt thời Đinh và Tiền Lê (968 – 1009)": [1, 0, 1], "Vị trí địa lí, tự nhiên châu Âu": [1, 0, 0], "Dân cư, xã hội châu Âu": [0, 0, 1],
      "Bảo vệ thiên nhiên ở châu Âu": [0, 1, 0], "Liên minh châu Âu": [1, 0, 0], "Vị trí địa lí, tự nhiên châu Á": [1, 1, 0],
      "Dân cư, xã hội châu Á": [0, 0, 1], "Các khu vực của châu Á": [1, 0, 1], "Vị trí địa lí, tự nhiên châu Phi": [1, 1, 0],
      "Dân cư, xã hội châu Phi": [0, 1, 0], "Con người khai thác thiên nhiên châu Phi": [0, 0, 1] } } },
  /* GDCD 7 · Kiểm tra cuối học kì I (Kết nối tri thức; Bài 1–6; Phiên N7-ck1-lsdl-gdcd). Khối 7 chưa bật nên đề chưa hiện với gia đình.
     Kho câu = 50 câu của 2 đề cố định (không có câu riêng), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu, theo khung
     đề định kì (Công văn 7991): Bài 1, 2 mỗi bài 3 câu, Bài 3 Học tập tự giác, tích cực 4 câu, Bài 4–6 mỗi bài 5 câu, bài nào cũng có câu xử lí
     tình huống. Hai đề cố định chia đúng theo ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. */
  { id: "gdcd7-ck1-de1", title: "GDCD 7 · Cuối kì I · Đề 1", grade: 7, subject: "GDCD", minutes: 35, n: 25, file: "7-gdcd.js" },
  { id: "gdcd7-ck1-de2", title: "GDCD 7 · Cuối kì I · Đề 2", grade: 7, subject: "GDCD", minutes: 35, n: 25, file: "7-gdcd.js" },
  { id: "gdcd7-ck1-ngau-nhien", title: "GDCD 7 · Cuối kì I · Đề ngẫu nhiên", grade: 7, subject: "GDCD", minutes: 35, n: 25, file: "7-gdcd.js",
    pool: { from: ["gdcd7-ck1-de1", "gdcd7-ck1-de2"], matrix: {
      "Tự hào về truyền thống quê hương": [1, 1, 1], "Quan tâm, cảm thông và chia sẻ": [1, 1, 1], "Học tập tự giác, tích cực": [2, 1, 1],
      "Giữ chữ tín": [2, 2, 1], "Bảo tồn di sản văn hoá": [2, 2, 1], "Ứng phó với tâm lí căng thẳng": [2, 1, 2] } } },
  /* Tin học 7 · Kiểm tra cuối học kì I (Kết nối tri thức, Tin học 7, Bài 1–8; Phiên N7-ck1-tin-congnghe). Khối 7 chưa bật nên đề chưa hiện với
     gia đình. Tám chủ đề theo tên bài (Bài 4 rút gọn), mỗi đề 2 – 2 – 3 – 2 – 3 – 4 – 4 – 5 câu (phần bảng tính, học sau giữa kì, nhiều câu hơn).
     Kho câu = 50 câu của 2 đề cố định, không có câu riêng; ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7, hai đề cố định chia đúng ma trận, nên ô
     (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. */
  { id: "tin7-ck1-de1", title: "Tin học 7 · Cuối kì I · Đề 1", grade: 7, subject: "Tin học", minutes: 35, n: 25, file: "7-tin.js" },
  { id: "tin7-ck1-de2", title: "Tin học 7 · Cuối kì I · Đề 2", grade: 7, subject: "Tin học", minutes: 35, n: 25, file: "7-tin.js" },
  { id: "tin7-ck1-ngau-nhien", title: "Tin học 7 · Cuối kì I · Đề ngẫu nhiên", grade: 7, subject: "Tin học", minutes: 35, n: 25, file: "7-tin.js",
    pool: { from: ["tin7-ck1-de1", "tin7-ck1-de2"], matrix: {
      "Thiết bị vào – ra": [1, 0, 1], "Phần mềm máy tính": [1, 1, 0], "Quản lí dữ liệu trong máy tính": [1, 1, 1],
      "Mạng xã hội và kênh trao đổi thông tin": [1, 1, 0], "Ứng xử trên mạng": [1, 1, 1], "Làm quen với phần mềm bảng tính": [2, 1, 1],
      "Tính toán tự động trên bảng tính": [1, 2, 1], "Công cụ hỗ trợ tính toán": [2, 1, 2] } } },
  /* Công nghệ 7 · Kiểm tra cuối học kì I (Kết nối tri thức, Công nghệ 7, Chương I Trồng trọt Bài 1–6, Chương II Lâm nghiệp Bài 7–8; Phiên
     N7-ck1-tin-congnghe). Khối 7 chưa bật nên đề chưa hiện với gia đình. Bảy chủ đề theo tên bài (Bài 3 rút gọn; Bài 6 dự án và ôn tập chương không
     có chủ đề riêng), mỗi đề 4 – 3 – 4 – 3 – 4 – 3 – 4 câu. Kho câu = 50 câu của 2 đề cố định, không có câu riêng; ma trận [Biết, Hiểu, Vận dụng]
     10 – 8 – 7, hai đề cố định chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. */
  { id: "congnghe7-ck1-de1", title: "Công nghệ 7 · Cuối kì I · Đề 1", grade: 7, subject: "Công nghệ", minutes: 35, n: 25, file: "7-congnghe.js" },
  { id: "congnghe7-ck1-de2", title: "Công nghệ 7 · Cuối kì I · Đề 2", grade: 7, subject: "Công nghệ", minutes: 35, n: 25, file: "7-congnghe.js" },
  { id: "congnghe7-ck1-ngau-nhien", title: "Công nghệ 7 · Cuối kì I · Đề ngẫu nhiên", grade: 7, subject: "Công nghệ", minutes: 35, n: 25, file: "7-congnghe.js",
    pool: { from: ["congnghe7-ck1-de1", "congnghe7-ck1-de2"], matrix: {
      "Giới thiệu về trồng trọt": [2, 1, 1], "Làm đất trồng cây": [1, 1, 1], "Gieo trồng, chăm sóc và phòng trừ sâu, bệnh": [2, 1, 1],
      "Thu hoạch sản phẩm trồng trọt": [1, 1, 1], "Nhân giống vô tính cây trồng": [1, 2, 1], "Giới thiệu về rừng": [1, 1, 1],
      "Trồng, chăm sóc và bảo vệ rừng": [2, 1, 1] } } },
  /* Toán 8 · Kiểm tra cuối học kì I (Kết nối tri thức, Toán 8 tập một, Bài 1–20; Phiên N8-ck1-toan). Khối 8 chưa bật nên đề chưa
     hiện với gia đình. Kho câu = 50 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức độ.
     Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu trên 20 chủ đề theo tên Bài 1–20 như mục lục của sách: Chương I 6 câu, Chương II 6,
     Chương III 6, Chương IV 4, Chương V 3. Mỗi ô (chủ đề, mức) rút 1 câu và có 4 câu: một câu ở mỗi đề cố định, hai câu riêng, nên học
     sinh đã làm một đề cố định vẫn gặp câu mới. Câu tự luận chỉ ở hai ô Vận dụng: phân tích đa thức thành nhân tử (Bài 9), chứng minh
     tứ giác là hình bình hành (Bài 12); mỗi lần rút nhiều nhất 2 câu tự luận. */
  { id: "toan8-ck1-de1", title: "Toán 8 · Cuối kì I · Đề 1", grade: 8, subject: "Toán", minutes: 45, n: 25, file: "8-toan.js" },
  { id: "toan8-ck1-de2", title: "Toán 8 · Cuối kì I · Đề 2", grade: 8, subject: "Toán", minutes: 45, n: 25, file: "8-toan.js" },
  { id: "toan8-ck1-ngau-nhien", title: "Toán 8 · Cuối kì I · Đề ngẫu nhiên", grade: 8, subject: "Toán", minutes: 45, n: 25, file: "8-toan.js",
    pool: { from: ["toan8-ck1-de1", "toan8-ck1-de2"], matrix: {
      "Đơn thức": [1, 0, 0], "Đa thức": [0, 1, 0], "Phép cộng và phép trừ đa thức": [1, 0, 0], "Phép nhân đa thức": [1, 0, 1],
      "Phép chia đa thức cho đơn thức": [0, 1, 0], "Hiệu hai bình phương. Bình phương của một tổng hay một hiệu": [1, 1, 0],
      "Lập phương của một tổng. Lập phương của một hiệu": [1, 0, 0], "Tổng và hiệu hai lập phương": [0, 1, 0],
      "Phân tích đa thức thành nhân tử": [0, 1, 1], "Tứ giác": [1, 0, 0], "Hình thang cân": [1, 0, 0], "Hình bình hành": [1, 0, 1],
      "Hình chữ nhật": [0, 1, 0], "Hình thoi và hình vuông": [0, 0, 1], "Định lí Thalès trong tam giác": [1, 0, 1],
      "Đường trung bình của tam giác": [0, 1, 0], "Tính chất đường phân giác của tam giác": [0, 0, 1], "Thu thập và phân loại dữ liệu": [1, 0, 0],
      "Biểu diễn dữ liệu bằng bảng, biểu đồ": [0, 1, 0], "Phân tích số liệu thống kê dựa vào biểu đồ": [0, 0, 1] } } },
  /* Ngữ văn 8 · Kiểm tra cuối học kì I (Kết nối tri thức, Ngữ văn 8 tập một, Bài 1–5; Phiên N8-ck1-van). Khối 8 chưa bật nên đề chưa
     hiện với gia đình. Kho câu = 50 câu riêng trong file (5 đoạn đọc, 4 câu Viết) + 50 câu của 2 đề cố định (mỗi đề 5 đoạn đọc, 1 câu
     Viết), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu: năm chủ đề đọc hiểu theo tên Bài 1–5, mỗi chủ đề
     [1, 1, 1] (đoạn 3 câu mức 1-2-3), nên lần rút nào cũng lấy trọn một đoạn mỗi bài, đúng mức; 9 câu Tiếng Việt theo chín chủ đề
     gom từ các mục Thực hành tiếng Việt Bài 1–5 (Biết 5, Hiểu 3, Vận dụng 1: chọn từ ngữ hợp sắc thái); 1 câu Viết tự chấm. Hai đề cố
     định đúng ma trận, câu riêng thêm vào năm chủ đề đọc hiểu, chín chủ đề Tiếng Việt và Viết, nên ô (chủ đề, mức) nào cũng có ít nhất
     gấp đôi số câu ô đó rút. Câu tự luận chỉ ở ô Viết, không gắn đoạn đọc: mỗi lần rút đúng 1 câu, đủ năm kiểu bài Viết của Bài 1–5. */
  { id: "van8-ck1-de1", title: "Ngữ văn 8 · Cuối kì I · Đề 1", grade: 8, subject: "Ngữ văn", minutes: 45, n: 25, file: "8-van.js" },
  { id: "van8-ck1-de2", title: "Ngữ văn 8 · Cuối kì I · Đề 2", grade: 8, subject: "Ngữ văn", minutes: 45, n: 25, file: "8-van.js" },
  { id: "van8-ck1-ngau-nhien", title: "Ngữ văn 8 · Cuối kì I · Đề ngẫu nhiên", grade: 8, subject: "Ngữ văn", minutes: 45, n: 25, file: "8-van.js",
    pool: { from: ["van8-ck1-de1", "van8-ck1-de2"], matrix: {
      "Câu chuyện của lịch sử": [1, 1, 1], "Vẻ đẹp cổ điển": [1, 1, 1], "Lời sông núi": [1, 1, 1], "Tiếng cười trào phúng trong thơ": [1, 1, 1],
      "Những câu chuyện hài": [1, 1, 1], "Biệt ngữ xã hội": [1, 0, 0], "Từ ngữ địa phương": [1, 0, 0], "Từ tượng hình, từ tượng thanh": [1, 0, 0],
      "Đảo ngữ": [0, 1, 0], "Đoạn văn diễn dịch, quy nạp, song song, phối hợp": [0, 1, 0], "Từ, thành ngữ Hán Việt": [1, 0, 0],
      "Sắc thái nghĩa của từ ngữ": [0, 0, 1], "Câu hỏi tu từ": [1, 0, 0], "Nghĩa tường minh và nghĩa hàm ẩn": [0, 1, 0], "Viết": [0, 0, 1] } } },
  /* Tiếng Anh 8 · Kiểm tra cuối học kì I (Global Success 8, Units 1–6, Review 1, 2; Phiên N8-ck1-ta). Khối 8 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50 câu riêng trong file (2 đoạn đọc) + 50 câu của 2 đề cố định (mỗi đề 1 đoạn đọc), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu: Pronunciation 2 (âm của Book map Units 1–5), Unit 1, 4 mỗi Unit 4 (hai câu từ vựng Biết), Unit 2, 3, 5, 6 mỗi Unit 3, Reading 3 (một đoạn 3 câu mức 1-2-3). Hai đề cố định đúng ma trận, câu riêng gấp đôi ma trận, nên ô (chủ đề, mức) nào cũng có gấp bốn số câu ô đó rút. Không có câu nghe, không có câu tự luận. */
  { id: "ta8-ck1-de1", title: "Tiếng Anh 8 · Cuối kì I · Đề 1", grade: 8, subject: "Tiếng Anh", minutes: 45, n: 25, file: "8-ta.js" },
  { id: "ta8-ck1-de2", title: "Tiếng Anh 8 · Cuối kì I · Đề 2", grade: 8, subject: "Tiếng Anh", minutes: 45, n: 25, file: "8-ta.js" },
  { id: "ta8-ck1-ngau-nhien", title: "Tiếng Anh 8 · Cuối kì I · Đề ngẫu nhiên", grade: 8, subject: "Tiếng Anh", minutes: 45, n: 25, file: "8-ta.js",
    pool: { from: ["ta8-ck1-de1", "ta8-ck1-de2"], matrix: {
      "Pronunciation": [1, 1, 0], "Unit 1 · Leisure Time": [2, 1, 1], "Unit 2 · Life in the Countryside": [1, 1, 1], "Unit 3 · Teenagers": [1, 1, 1],
      "Unit 4 · Ethnic Groups of Viet Nam": [2, 1, 1], "Unit 5 · Our Customs and Traditions": [1, 1, 1], "Unit 6 · Lifestyles": [1, 1, 1],
      "Reading": [1, 1, 1] } } },
  /* KHTN 8 · Kiểm tra cuối học kì I (Kết nối tri thức, Khoa học tự nhiên 8, Bài 1–19; Phiên N8-ck1-khtn). Khối 8 chưa bật nên đề chưa
     hiện với gia đình. Kho câu = 25 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng]
     10 – 8 – 7 câu trên 18 chủ đề theo tên bài (Bài 14 thực hành không có chủ đề riêng): Bài 1 2 câu, Chương I 9 câu, Chương II 5 câu,
     Chương III, IV 9 câu. Hai đề cố định và câu riêng đều chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có 3 câu, gấp ba số câu ô đó rút. */
  { id: "khtn8-ck1-de1", title: "KHTN 8 · Cuối kì I · Đề 1", grade: 8, subject: "KHTN", minutes: 45, n: 25, file: "8-khtn.js" },
  { id: "khtn8-ck1-de2", title: "KHTN 8 · Cuối kì I · Đề 2", grade: 8, subject: "KHTN", minutes: 45, n: 25, file: "8-khtn.js" },
  { id: "khtn8-ck1-ngau-nhien", title: "KHTN 8 · Cuối kì I · Đề ngẫu nhiên", grade: 8, subject: "KHTN", minutes: 45, n: 25, file: "8-khtn.js",
    pool: { from: ["khtn8-ck1-de1", "khtn8-ck1-de2"], matrix: {
      "Sử dụng một số hoá chất, thiết bị cơ bản trong phòng thí nghiệm": [1, 1, 0], "Phản ứng hoá học": [1, 1, 0],
      "Mol và tỉ khối chất khí": [0, 1, 1], "Dung dịch và nồng độ": [1, 0, 1], "Định luật bảo toàn khối lượng và phương trình hoá học": [0, 1, 0],
      "Tính theo phương trình hoá học": [0, 0, 1], "Tốc độ phản ứng và chất xúc tác": [1, 0, 0], "Acid": [1, 0, 0], "Base. Thang pH": [1, 0, 0],
      "Oxide": [0, 1, 0], "Muối": [0, 0, 1], "Phân bón hoá học": [1, 0, 0], "Khối lượng riêng": [1, 0, 1], "Áp suất trên một bề mặt": [0, 1, 0],
      "Áp suất chất lỏng. Áp suất khí quyển": [1, 0, 1], "Lực đẩy Archimedes": [0, 1, 0], "Tác dụng làm quay của lực. Moment lực": [1, 0, 0],
      "Đòn bẩy và ứng dụng": [0, 1, 1] } } },
  /* Lịch sử và Địa lí 8 · Kiểm tra cuối học kì I (Kết nối tri thức, bản chỉnh sửa năm 2026; Lịch sử Bài 1–11, Địa lí Bài 1–8; Phiên
     N8-ck1-lsdl-gdcd). Khối 8 chưa bật nên đề chưa hiện với gia đình. Kho câu = 50 câu của 2 đề cố định (không có câu riêng), câu nào cũng có
     mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu, theo khung đề định kì (Công văn 7991): 13 câu Lịch sử (Bài 8, 11 mỗi bài 2 câu, các
     bài khác 1 câu; chữ chủ đề theo tên bài của sách, rút gọn), 12 câu Địa lí (Bài 4 3 câu, Bài 1, 2, 6 mỗi bài 2 câu, Bài 3, 7, 8 mỗi bài 1 câu;
     Bài 5 là bài thực hành, không ra câu riêng). Hai đề cố định chia đúng theo ma trận, nên ô (chủ đề, mức) nào cũng có đúng 2 câu, gấp đôi số câu
     ô đó rút. */
  { id: "lsdl8-ck1-de1", title: "Lịch sử và Địa lí 8 · Cuối kì I · Đề 1", grade: 8, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "8-lsdl.js" },
  { id: "lsdl8-ck1-de2", title: "Lịch sử và Địa lí 8 · Cuối kì I · Đề 2", grade: 8, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "8-lsdl.js" },
  { id: "lsdl8-ck1-ngau-nhien", title: "Lịch sử và Địa lí 8 · Cuối kì I · Đề ngẫu nhiên", grade: 8, subject: "Lịch sử và Địa lí", minutes: 45, n: 25, file: "8-lsdl.js",
    pool: { from: ["lsdl8-ck1-de1", "lsdl8-ck1-de2"], matrix: {
      "Cách mạng tư sản Anh và Chiến tranh giành độc lập ở Bắc Mỹ": [1, 0, 0], "Cách mạng tư sản Pháp cuối thế kỉ XVIII": [0, 1, 0],
      "Cách mạng công nghiệp": [0, 0, 1], "Đông Nam Á từ nửa sau thế kỉ XVI đến giữa thế kỉ XIX": [1, 0, 0],
      "Xung đột Nam – Bắc triều và Trịnh – Nguyễn": [0, 1, 0], "Khai phá vùng đất phía Nam (thế kỉ XVI – XVIII)": [1, 0, 0],
      "Khởi nghĩa nông dân ở Đàng Ngoài thế kỉ XVIII": [0, 1, 0], "Phong trào Tây Sơn": [1, 0, 1],
      "Kinh tế, văn hoá, tôn giáo thế kỉ XVI – XVIII": [1, 0, 0], "Sự hình thành chủ nghĩa đế quốc": [0, 1, 0],
      "Phong trào công nhân và chủ nghĩa xã hội khoa học": [1, 0, 1], "Vị trí địa lí và phạm vi lãnh thổ Việt Nam": [1, 0, 1],
      "Địa hình Việt Nam": [1, 1, 0], "Khoáng sản Việt Nam": [1, 0, 0], "Khí hậu Việt Nam": [1, 1, 1], "Thuỷ văn Việt Nam": [0, 1, 1],
      "Vai trò của tài nguyên khí hậu và tài nguyên nước": [0, 1, 0], "Tác động của biến đổi khí hậu": [0, 0, 1] } } },
  /* GDCD 8 · Kiểm tra cuối học kì I (Kết nối tri thức; Bài 1–6; Phiên N8-ck1-lsdl-gdcd). Khối 8 chưa bật nên đề chưa hiện với gia đình.
     Kho câu = 50 câu của 2 đề cố định (không có câu riêng), câu nào cũng có mức độ. Ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7 câu, theo khung
     đề định kì (Công văn 7991): Bài 1, 2 mỗi bài 3 câu, Bài 3 Lao động cần cù, sáng tạo 4 câu, Bài 4–6 mỗi bài 5 câu, bài nào cũng có câu xử lí
     tình huống. Hai đề cố định chia đúng theo ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. */
  { id: "gdcd8-ck1-de1", title: "GDCD 8 · Cuối kì I · Đề 1", grade: 8, subject: "GDCD", minutes: 35, n: 25, file: "8-gdcd.js" },
  { id: "gdcd8-ck1-de2", title: "GDCD 8 · Cuối kì I · Đề 2", grade: 8, subject: "GDCD", minutes: 35, n: 25, file: "8-gdcd.js" },
  { id: "gdcd8-ck1-ngau-nhien", title: "GDCD 8 · Cuối kì I · Đề ngẫu nhiên", grade: 8, subject: "GDCD", minutes: 35, n: 25, file: "8-gdcd.js",
    pool: { from: ["gdcd8-ck1-de1", "gdcd8-ck1-de2"], matrix: {
      "Tự hào về truyền thống dân tộc Việt Nam": [1, 1, 1], "Tôn trọng sự đa dạng của các dân tộc": [1, 1, 1], "Lao động cần cù, sáng tạo": [2, 1, 1],
      "Bảo vệ lẽ phải": [2, 2, 1], "Bảo vệ môi trường và tài nguyên thiên nhiên": [2, 2, 1], "Xác định mục tiêu cá nhân": [2, 1, 2] } } },
  /* Tin học 8 · Kiểm tra cuối học kì I (Kết nối tri thức, Tin học 8, Bài 1–7; Phiên N8-ck1-tin-congnghe). Khối 8 chưa bật nên đề chưa hiện với
     gia đình. Sáu chủ đề theo tên bài (Bài 3 thực hành không có chủ đề riêng), mỗi đề 4 – 4 – 4 – 5 – 4 – 4 câu (13 câu bảng tính, Bài 5–7).
     Kho câu = 50 câu của 2 đề cố định, không có câu riêng; ma trận [Biết, Hiểu, Vận dụng] 10 – 8 – 7, hai đề cố định chia đúng ma trận, nên ô
     (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. */
  { id: "tin8-ck1-de1", title: "Tin học 8 · Cuối kì I · Đề 1", grade: 8, subject: "Tin học", minutes: 35, n: 25, file: "8-tin.js" },
  { id: "tin8-ck1-de2", title: "Tin học 8 · Cuối kì I · Đề 2", grade: 8, subject: "Tin học", minutes: 35, n: 25, file: "8-tin.js" },
  { id: "tin8-ck1-ngau-nhien", title: "Tin học 8 · Cuối kì I · Đề ngẫu nhiên", grade: 8, subject: "Tin học", minutes: 35, n: 25, file: "8-tin.js",
    pool: { from: ["tin8-ck1-de1", "tin8-ck1-de2"], matrix: {
      "Lược sử công cụ tính toán": [2, 2, 0], "Thông tin trong môi trường số": [2, 1, 1],
      "Đạo đức và văn hoá trong sử dụng công nghệ kĩ thuật số": [1, 1, 2], "Sử dụng bảng tính giải quyết bài toán thực tế": [1, 2, 2],
      "Sắp xếp và lọc dữ liệu": [2, 1, 1], "Trình bày dữ liệu bằng biểu đồ": [2, 1, 1] } } },
  /* Công nghệ 8 · Kiểm tra cuối học kì I (Kết nối tri thức, Công nghệ 8, Chương I Bài 1–5, Chương II Bài 6–9; Phiên N8-ck1-tin-congnghe). Khối 8
     chưa bật nên đề chưa hiện với gia đình. Chín chủ đề theo tên bài (Bài 1 rút gọn; Bài 10 dự án không có chủ đề riêng), mỗi đề
     3 – 4 – 3 – 2 – 3 câu cho Chương I và 3 – 4 – 2 – 1 câu cho Chương II. Kho câu = 50 câu của 2 đề cố định, không có câu riêng; ma trận [Biết,
     Hiểu, Vận dụng] 10 – 8 – 7, hai đề cố định chia đúng ma trận, nên ô (chủ đề, mức) nào cũng có gấp đôi số câu ô đó rút. */
  { id: "congnghe8-ck1-de1", title: "Công nghệ 8 · Cuối kì I · Đề 1", grade: 8, subject: "Công nghệ", minutes: 35, n: 25, file: "8-congnghe.js" },
  { id: "congnghe8-ck1-de2", title: "Công nghệ 8 · Cuối kì I · Đề 2", grade: 8, subject: "Công nghệ", minutes: 35, n: 25, file: "8-congnghe.js" },
  { id: "congnghe8-ck1-ngau-nhien", title: "Công nghệ 8 · Cuối kì I · Đề ngẫu nhiên", grade: 8, subject: "Công nghệ", minutes: 35, n: 25, file: "8-congnghe.js",
    pool: { from: ["congnghe8-ck1-de1", "congnghe8-ck1-de2"], matrix: {
      "Tiêu chuẩn trình bày bản vẽ kĩ thuật": [1, 1, 1], "Hình chiếu vuông góc": [2, 1, 1], "Bản vẽ chi tiết": [1, 1, 1], "Bản vẽ lắp": [1, 1, 0],
      "Bản vẽ nhà": [1, 1, 1], "Vật liệu cơ khí": [1, 1, 1], "Truyền và biến đổi chuyển động": [1, 1, 2], "Gia công cơ khí bằng tay": [1, 1, 0],
      "Ngành nghề trong lĩnh vực cơ khí": [1, 0, 0] } } },
  /* Toán 5 · Kiểm tra giữa học kì II (Kết nối tri thức, Toán 5 tập hai, Bài 36–55; Phiên N5-gk2-toan). Khối 5 chưa bật
     (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 50 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức
     độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu trên 15 chủ đề theo tên bài: Chủ đề 7 (tỉ số, tỉ lệ bản
     đồ, tổng – tỉ, hiệu – tỉ, tỉ số phần trăm, máy tính cầm tay) 12 câu, Chủ đề 8 (thể tích, đơn vị đo thể tích) 5, Chủ đề 9 (hình
     khai triển, diện tích xung quanh, toàn phần, thể tích của hình hộp chữ nhật, hình lập phương) 8. Mỗi ô (chủ đề, mức) rút 1 câu
     và có 4 câu: một câu ở mỗi đề cố định, hai câu riêng, nên học sinh đã làm một đề cố định vẫn gặp câu mới. Không có câu tự luận,
     không hỏi số đo thời gian, vận tốc (Chủ đề 10). */
  { id: "toan5-gk2-de1", title: "Toán 5 · Giữa kì II · Đề 1", grade: 5, subject: "Toán", minutes: 40, n: 25, file: "5-toan.js" },
  { id: "toan5-gk2-de2", title: "Toán 5 · Giữa kì II · Đề 2", grade: 5, subject: "Toán", minutes: 40, n: 25, file: "5-toan.js" },
  { id: "toan5-gk2-ngau-nhien", title: "Toán 5 · Giữa kì II · Đề ngẫu nhiên", grade: 5, subject: "Toán", minutes: 40, n: 25, file: "5-toan.js",
    pool: { from: ["toan5-gk2-de1", "toan5-gk2-de2"], matrix: {
      "Tỉ số, tỉ số phần trăm": [1, 1, 0], "Tỉ lệ bản đồ": [1, 0, 1], "Tìm hai số khi biết tổng và tỉ số": [0, 1, 1],
      "Tìm hai số khi biết hiệu và tỉ số": [0, 1, 1], "Tìm tỉ số phần trăm của hai số": [0, 1, 0], "Tìm giá trị phần trăm của một số": [1, 0, 1],
      "Máy tính cầm tay": [1, 0, 0], "Thể tích của một hình": [1, 1, 0], "Xăng-ti-mét khối, đề-xi-mét khối": [1, 0, 0], "Mét khối": [1, 1, 0],
      "Hình khai triển": [1, 1, 0], "Diện tích xung quanh, toàn phần của hình hộp chữ nhật": [0, 1, 1],
      "Diện tích xung quanh, toàn phần của hình lập phương": [1, 0, 0], "Thể tích của hình hộp chữ nhật": [1, 0, 1],
      "Thể tích của hình lập phương": [0, 0, 1] } } },
  /* Toán 5 · Kiểm tra cuối năm học (Kết nối tri thức, cả năm, trọng tâm học kì II Bài 36–75; Phiên N5-ck2-toan). Khối 5 chưa bật
     (data/grades.js) nên đề chưa hiện với gia đình. Kho câu = 50 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức
     độ. Ma trận [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu trên 17 chủ đề theo tên bài: phần trọng tâm 16 câu (Chủ
     đề 10 số đo thời gian, vận tốc, chuyển động đều 10; Chủ đề 11 thống kê và xác suất 6), phần ôn 9 câu (Chủ đề 7–9: 6, chữ chủ đề
     như kho giữa kì II; học kì I: chia số thập phân, hình thang, hình tròn 3, chữ chủ đề như kho cuối kì I). Mỗi ô (chủ đề, mức) rút 1
     câu và có 4 câu: một câu ở mỗi đề cố định, hai câu riêng, nên học sinh đã làm một đề cố định vẫn gặp câu mới. Không có câu tự luận. */
  { id: "toan5-ck2-de1", title: "Toán 5 · Cuối năm · Đề 1", grade: 5, subject: "Toán", minutes: 40, n: 25, file: "5-toan.js" },
  { id: "toan5-ck2-de2", title: "Toán 5 · Cuối năm · Đề 2", grade: 5, subject: "Toán", minutes: 40, n: 25, file: "5-toan.js" },
  { id: "toan5-ck2-ngau-nhien", title: "Toán 5 · Cuối năm · Đề ngẫu nhiên", grade: 5, subject: "Toán", minutes: 40, n: 25, file: "5-toan.js",
    pool: { from: ["toan5-ck2-de1", "toan5-ck2-de2"], matrix: {
      "Chia số thập phân": [1, 0, 0], "Hình thang": [0, 1, 0], "Hình tròn": [0, 0, 1], "Tỉ số, tỉ số phần trăm": [1, 0, 0],
      "Tìm giá trị phần trăm của một số": [0, 1, 0], "Tìm hai số khi biết tổng và tỉ số": [0, 0, 1], "Mét khối": [1, 0, 0],
      "Diện tích xung quanh, toàn phần của hình hộp chữ nhật": [0, 1, 0], "Thể tích của hình hộp chữ nhật": [0, 0, 1],
      "Các đơn vị đo thời gian": [1, 1, 0], "Cộng, trừ số đo thời gian": [1, 0, 1], "Nhân, chia số đo thời gian với một số": [0, 1, 0],
      "Vận tốc": [1, 0, 1], "Quãng đường, thời gian của một chuyển động đều": [1, 1, 1], "Thu thập, phân loại, sắp xếp các số liệu": [1, 0, 0],
      "Biểu đồ hình quạt tròn": [1, 1, 1], "Tỉ số của số lần lặp lại một sự kiện": [1, 1, 0] } } },
  /* Toán 5 · Kiểm tra giữa học kì I (Kết nối tri thức, Toán 5 tập một, Bài 1–18; Phiên N5-gk1-toan). Kì đã thi (2–13/11/2026),
     đề dùng cho năm học 2027–2028. Kho câu = 50 câu riêng trong file + 50 câu của 2 đề cố định, câu nào cũng có mức độ. Ma trận
     [Biết, Hiểu, Vận dụng] theo Thông tư 27/2020: 10 – 8 – 7 câu trên 13 chủ đề: Chủ đề 1 (ôn tập và bổ sung) 13 câu, Chủ đề 2 (số
     thập phân) 9, Chủ đề 3 (đơn vị đo diện tích) 3. Chữ chủ đề của bài cũng có ở kho cuối kì I giống kho đó. Mỗi ô (chủ đề, mức) rút
     1 câu và có 4 câu: một câu ở mỗi đề cố định, hai câu riêng, nên học sinh đã làm một đề cố định vẫn gặp câu mới. Không có câu tự
     luận. */
  { id: "toan5-gk1-de1", title: "Toán 5 · Giữa kì I · Đề 1", grade: 5, subject: "Toán", minutes: 40, n: 25, file: "5-toan.js" },
  { id: "toan5-gk1-de2", title: "Toán 5 · Giữa kì I · Đề 2", grade: 5, subject: "Toán", minutes: 40, n: 25, file: "5-toan.js" },
  { id: "toan5-gk1-ngau-nhien", title: "Toán 5 · Giữa kì I · Đề ngẫu nhiên", grade: 5, subject: "Toán", minutes: 40, n: 25, file: "5-toan.js",
    pool: { from: ["toan5-gk1-de1", "toan5-gk1-de2"], matrix: {
      "Ôn tập số tự nhiên": [1, 1, 0], "Ôn tập các phép tính với số tự nhiên": [0, 1, 1], "Ôn tập phân số": [1, 1, 0], "Phân số thập phân": [1, 0, 0],
      "Ôn tập các phép tính với phân số": [0, 1, 1], "Cộng, trừ phân số": [0, 0, 1], "Hỗn số": [1, 1, 0], "Ôn tập hình học và đo lường": [1, 0, 0],
      "Số thập phân": [1, 1, 0], "So sánh số thập phân": [1, 0, 1], "Viết số đo dưới dạng số thập phân": [1, 1, 1],
      "Làm tròn số thập phân": [1, 0, 1], "Đơn vị đo diện tích": [1, 1, 1] } } },

  /* Đề thử nghiệm các dạng câu mới (Phiên K2), không gắn kì thi: hiện ở nhóm "Đề khác" của lớp 6 */
  { id: "thunghiem6-dang-cau-moi", title: "Đề thử nghiệm · Các dạng câu mới", grade: 6, subject: "Thử nghiệm", minutes: 30, n: 15, file: "6-thunghiem.js" }
];

/* Danh mục chủ đề (Phiên UX23a), do tests/ghep-de.js ghi, không sửa tay. Ghép đề (node tests/ghep-de.js <nháp>) thì công cụ ghi lại khối này; chỉ
   ghi lại khối: node tests/ghep-de.js --chu-de. Tab Bài ôn (bên “Ôn theo chủ đề”, js/app.js) đọc khối này để biết chủ đề, số câu của
   mỗi kì mà không phải tải file câu hỏi. Mỗi file câu hỏi một danh sách [chủ đề, số câu, mã kì], theo thứ tự gặp (đề theo danh mục, câu
   trong đề; đề ngẫu nhiên chỉ câu riêng): chủ đề đã gộp khoảng trắng; số câu chấm tự động không trùng mà đề “Ôn chủ đề” rút được
   (Quiz.topicBank: bỏ tự luận, đề ngẫu nhiên chỉ góp câu riêng); mã các kì có câu của chủ đề (gk1, ck1, gk2, ck2, vao10, tn, lấy từ
   mã đề). Chủ đề toàn câu tự luận không có. tests/kiem-tra-de.js đếm lại và báo lỗi khi khối khác số đếm (tests/nap-de.js, chuDe). */
window.ONTAP_SEED_TOPICS = {
  "4-khoahoc.js": [
    ["Tính chất của nước", 7, "ck1"], ["Sự chuyển thể của nước", 10, "ck1"], ["Bảo vệ nguồn nước", 7, "ck1"], ["Không khí", 8, "ck1"],
    ["Ô nhiễm không khí", 3, "ck1"], ["Ánh sáng", 9, "ck1"], ["Âm thanh", 8, "ck1"], ["Nhiệt độ và sự truyền nhiệt", 8, "ck1"],
    ["Thực vật cần gì để sống", 5, "ck1"], ["Động vật cần gì để sống", 3, "ck1"], ["Chăm sóc cây trồng, vật nuôi", 3, "ck1"],
    ["Gió, bão và phòng chống bão", 6, "ck1"], ["Đặc điểm chung của nấm", 6, "ck2"], ["Nấm ăn, nấm trong chế biến thực phẩm", 6, "ck2"],
    ["Nấm gây hỏng thực phẩm, nấm độc", 9, "ck2"], ["Chất dinh dưỡng", 9, "ck2"], ["Chế độ ăn uống cân bằng", 9, "ck2"],
    ["Bệnh liên quan đến dinh dưỡng", 6, "ck2"], ["Thực phẩm an toàn", 6, "ck2"], ["Phòng tránh đuối nước", 6, "ck2"],
    ["Chuỗi thức ăn", 9, "ck2"], ["Vai trò của thực vật trong chuỗi thức ăn", 9, "ck2"]
  ],
  "4-lsdl.js": [
    ["Phương tiện học tập", 6, "ck1"], ["Thiên nhiên Trung du và miền núi phía Bắc", 6, "ck1"],
    ["Dân cư, sản xuất ở Trung du và miền núi phía Bắc", 6, "ck1"], ["Đền Hùng và lễ giỗ Tổ Hùng Vương", 8, "ck1"],
    ["Thiên nhiên Đồng bằng Bắc Bộ", 6, "ck1"], ["Dân cư, sản xuất ở Đồng bằng Bắc Bộ", 7, "ck1"],
    ["Sông Hồng và văn minh sông Hồng", 9, "ck1"], ["Thăng Long – Hà Nội", 9, "ck1"], ["Văn Miếu – Quốc Tử Giám", 10, "ck1"],
    ["Văn hoá vùng Trung du và miền núi phía Bắc", 6, "ck1"], ["Văn hoá vùng Đồng bằng Bắc Bộ", 5, "ck1"],
    ["Thiên nhiên Bắc Trung Bộ và Nam Trung Bộ", 6, "ck2"], ["Dân cư, sản xuất ở Bắc Trung Bộ và Nam Trung Bộ", 6, "ck2"],
    ["Văn hoá vùng Bắc Trung Bộ và Nam Trung Bộ", 6, "ck2"], ["Truyền thống yêu nước, cách mạng ở Bắc Trung Bộ và Nam Trung Bộ", 6, "ck2"],
    ["Cố đô Huế", 6, "ck2"], ["Phố cổ Hội An", 6, "ck2"], ["Lễ hội Cồng chiêng Tây Nguyên", 6, "ck2"], ["Thiên nhiên Nam Bộ", 6, "ck2"],
    ["Dân cư, sản xuất ở Nam Bộ", 6, "ck2"], ["Văn hoá vùng Nam Bộ", 3, "ck2"], ["Truyền thống yêu nước, cách mạng ở Nam Bộ", 6, "ck2"],
    ["Thành phố Hồ Chí Minh", 6, "ck2"], ["Địa đạo Củ Chi", 6, "ck2"]
  ],
  "4-ta.js": [
    ["Unit 1 · My Friends", 6, "ck1"], ["Unit 2 · Time and Daily Routines", 8, "ck1"], ["Unit 3 · My Week", 6, "ck1"],
    ["Unit 4 · My Birthday Party", 8, "ck1"], ["Unit 5 · Things We Can Do", 6, "ck1"], ["Unit 6 · Our School Facilities", 6, "ck1"],
    ["Unit 7 · Our Timetables", 6, "ck1"], ["Unit 8 · My Favourite Subjects", 6, "ck1"], ["Unit 9 · Our Sports Day", 6, "ck1"],
    ["Unit 10 · Our Summer Holidays", 6, "ck1"], ["Reading", 21, "ck1 ck2"], ["Unit 11 · My Home", 6, "ck2"], ["Unit 12 · Jobs", 7, "ck2"],
    ["Unit 13 · Appearance", 6, "ck2"], ["Unit 14 · Daily Activities", 6, "ck2"], ["Unit 15 · My Family's Weekends", 6, "ck2"],
    ["Unit 16 · Weather", 6, "ck2"], ["Unit 17 · In the City", 6, "ck2"], ["Unit 18 · At the Shopping Centre", 8, "ck2"],
    ["Unit 19 · The Animal World", 6, "ck2"], ["Unit 20 · At Summer Camp", 8, "ck2"]
  ],
  "4-tincn.js": [
    ["Tin học · Phần cứng và phần mềm", 4, "ck1"], ["Tin học · Gõ bàn phím đúng cách", 4, "ck1"],
    ["Tin học · Thông tin trên trang web", 4, "ck1"], ["Tin học · Tìm kiếm thông tin trên Internet", 2, "ck1"],
    ["Tin học · Tệp và thư mục", 4, "ck1"], ["Tin học · Dùng phần mềm khi được phép", 2, "ck1"], ["Tin học · Bài trình chiếu", 6, "ck1"],
    ["Công nghệ · Lợi ích của hoa, cây cảnh", 4, "ck1"], ["Công nghệ · Một số loại hoa, cây cảnh", 4, "ck1"],
    ["Công nghệ · Vật liệu và dụng cụ trồng cây trong chậu", 4, "ck1"], ["Công nghệ · Gieo hạt hoa, cây cảnh trong chậu", 4, "ck1"],
    ["Công nghệ · Trồng hoa, cây cảnh trong chậu", 4, "ck1"], ["Công nghệ · Chăm sóc hoa, cây cảnh trong chậu", 4, "ck1"],
    ["Tin học · Soạn thảo văn bản", 4, "ck2"], ["Tin học · Chỉnh sửa văn bản", 6, "ck2"],
    ["Tin học · Đa phương tiện và luyện gõ phím", 4, "ck2"], ["Tin học · Chương trình máy tính", 2, "ck2"],
    ["Tin học · Lập trình trực quan", 6, "ck2"], ["Tin học · Chương trình diễn tả ý tưởng", 4, "ck2"],
    ["Công nghệ · Bộ lắp ghép mô hình kĩ thuật", 4, "ck2"], ["Công nghệ · Lắp ghép mô hình bập bênh", 4, "ck2"],
    ["Công nghệ · Lắp ghép mô hình rô-bốt", 4, "ck2"], ["Công nghệ · Đồ chơi dân gian", 4, "ck2"], ["Công nghệ · Làm đèn lồng", 4, "ck2"],
    ["Công nghệ · Làm chuồn chuồn thăng bằng", 4, "ck2"]
  ],
  "4-toan.js": [
    ["Số có nhiều chữ số", 51, "gk1 ck1 ck2"], ["Làm tròn số", 12, "gk1 ck1"], ["Số chẵn, số lẻ", 12, "gk1 ck1"],
    ["Biểu thức chứa chữ", 20, "gk1 ck1"], ["Phép cộng, phép trừ", 19, "gk1 ck1"], ["Phép nhân, phép chia", 11, "gk1 ck1"],
    ["Tính chất phép cộng", 5, "ck1"], ["Tổng và hiệu", 7, "ck1"], ["Giải bài toán có ba bước tính", 13, "gk1 ck1"],
    ["Góc và đo góc", 22, "gk1 ck1"], ["Đơn vị đo", 35, "gk1 ck1 ck2"], ["Đường thẳng vuông góc, song song", 10, "ck1 ck2"],
    ["Hình bình hành, hình thoi", 13, "ck1 ck2"], ["Phép nhân", 15, "gk2 ck2"], ["Phép chia", 17, "gk2 ck2"],
    ["Tính chất phép nhân", 15, "gk2 ck2"], ["Nhân, chia với 10, 100, 1 000", 10, "gk2"], ["Ước lượng", 10, "gk2"],
    ["Số trung bình cộng", 10, "gk2 ck2"], ["Rút về đơn vị", 10, "gk2 ck2"], ["Dãy số liệu, biểu đồ cột", 21, "gk2 ck2"],
    ["Số lần xuất hiện của sự kiện", 10, "gk2 ck2"], ["Phân số", 10, "gk2 ck2"], ["Rút gọn phân số", 10, "gk2 ck2"],
    ["Quy đồng mẫu số", 10, "gk2 ck2"], ["So sánh phân số", 11, "gk2 ck2"], ["Tính chất cơ bản của phân số", 10, "gk2"],
    ["Cộng, trừ phân số", 10, "ck2"], ["Nhân, chia phân số", 10, "ck2"], ["Tìm phân số của một số", 10, "ck2"]
  ],
  "4-tv.js": [
    ["Đọc hiểu", 121, "gk1 ck1 gk2 ck2"], ["Danh từ", 27, "gk1 ck1 ck2"], ["Danh từ chung, danh từ riêng", 19, "gk1 ck1"],
    ["Viết tên cơ quan, tổ chức", 17, "gk1 ck1 ck2"], ["Động từ", 33, "gk1 ck1 ck2"], ["Tính từ", 14, "ck1 ck2"],
    ["Biện pháp nhân hoá", 8, "ck1"], ["Dấu gạch ngang", 7, "ck1"], ["Sử dụng từ điển", 13, "gk1 ck1"], ["Chính tả", 20, "gk1 ck1 gk2 ck2"],
    ["Câu", 11, "gk2 ck2"], ["Chủ ngữ", 14, "gk2 ck2"], ["Vị ngữ", 15, "gk2 ck2"], ["Trạng ngữ", 10, "gk2 ck2"],
    ["Trạng ngữ chỉ thời gian, nơi chốn", 10, "gk2"], ["Trạng ngữ chỉ nguyên nhân, mục đích", 10, "gk2"], ["Mở rộng vốn từ", 10, "gk2"],
    ["Trạng ngữ chỉ phương tiện", 10, "ck2"], ["Dấu ngoặc kép", 10, "ck2"], ["Dấu ngoặc đơn", 10, "ck2"], ["Lựa chọn từ ngữ", 10, "ck2"],
    ["Dấu câu", 10, "ck2"]
  ],
  "5-khoahoc.js": [
    ["Thành phần và vai trò của đất", 6, "ck1"], ["Ô nhiễm, xói mòn đất", 6, "ck1"], ["Hỗn hợp và dung dịch", 6, "ck1"],
    ["Chất ở trạng thái rắn, lỏng, khí", 6, "ck1"], ["Sự biến đổi hoá học", 3, "ck1"], ["Vai trò của năng lượng", 3, "ck1"],
    ["Sử dụng năng lượng điện", 6, "ck1"], ["Mạch điện, vật dẫn điện và vật cách điện", 9, "ck1"], ["Năng lượng chất đốt", 6, "ck1"],
    ["Năng lượng mặt trời, gió, nước chảy", 3, "ck1"], ["Sinh sản của thực vật có hoa", 6, "ck1"], ["Sự phát triển của cây con", 6, "ck1"],
    ["Sinh sản của động vật", 3, "ck1"], ["Vòng đời của động vật", 6, "ck1"], ["Vi khuẩn xung quanh chúng ta", 6, "ck2"],
    ["Vi khuẩn có ích trong chế biến thực phẩm", 9, "ck2"], ["Vi khuẩn gây bệnh ở người", 9, "ck2"], ["Sự hình thành cơ thể người", 6, "ck2"],
    ["Các giai đoạn phát triển của con người", 9, "ck2"], ["Nam và nữ", 6, "ck2"], ["Chăm sóc sức khoẻ tuổi dậy thì", 9, "ck2"],
    ["Phòng tránh bị xâm hại", 6, "ck2"], ["Chức năng của môi trường đối với sinh vật", 6, "ck2"],
    ["Tác động của con người đến môi trường", 9, "ck2"]
  ],
  "5-lsdl.js": [
    ["Vị trí, lãnh thổ, đơn vị hành chính, Quốc kì, Quốc huy, Quốc ca", 9, "ck1"], ["Thiên nhiên Việt Nam", 9, "ck1"],
    ["Biển, đảo Việt Nam", 6, "ck1"], ["Dân cư và dân tộc ở Việt Nam", 9, "ck1"], ["Nhà nước Văn Lang, Nhà nước Âu Lạc", 6, "ck1"],
    ["Vương quốc Phù Nam", 6, "ck1"], ["Vương quốc Chăm-pa", 6, "ck1"], ["Đấu tranh giành độc lập thời kì Bắc thuộc", 9, "ck1"],
    ["Triều Lý và việc định đô ở Thăng Long", 6, "ck1"], ["Triều Trần xây dựng đất nước, kháng chiến chống Mông – Nguyên", 9, "ck1"],
    ["Khởi nghĩa Lam Sơn và Triều Hậu Lê", 6, "ck2"], ["Triều Nguyễn", 6, "ck2"], ["Cách mạng tháng Tám năm 1945", 6, "ck2"],
    ["Chiến dịch Điện Biên Phủ năm 1954", 6, "ck2"], ["Chiến dịch Hồ Chí Minh năm 1975", 6, "ck2"], ["Đất nước Đổi mới", 3, "ck2"],
    ["Nước Cộng hoà Nhân dân Trung Hoa", 6, "ck2"], ["Nước Cộng hoà Dân chủ Nhân dân Lào", 3, "ck2"], ["Vương quốc Cam-pu-chia", 3, "ck2"],
    ["Hiệp hội các quốc gia Đông Nam Á", 6, "ck2"], ["Các châu lục và đại dương trên thế giới", 6, "ck2"],
    ["Dân số và các chủng tộc chính trên thế giới", 6, "ck2"], ["Văn minh Ai Cập", 3, "ck2"], ["Văn minh Hy Lạp", 3, "ck2"],
    ["Xây dựng thế giới xanh – sạch – đẹp", 3, "ck2"], ["Xây dựng thế giới hoà bình", 3, "ck2"]
  ],
  "5-ta.js": [
    ["Unit 1 · All About Me!", 6, "ck1"], ["Unit 2 · Our Homes", 6, "ck1"], ["Unit 3 · My Foreign Friends", 6, "ck1"],
    ["Unit 4 · Our Free-Time Activities", 9, "ck1"], ["Unit 5 · My Future Job", 6, "ck1"], ["Unit 6 · Our School Rooms", 6, "ck1"],
    ["Unit 7 · Our Favourite School Activities", 6, "ck1"], ["Unit 8 · In Our Classroom", 6, "ck1"],
    ["Unit 9 · Our Outdoor Activities", 9, "ck1"], ["Unit 10 · Our School Trip", 6, "ck1"], ["Reading", 18, "ck1 ck2"],
    ["Unit 11 · Family Time", 9, "ck2"], ["Unit 12 · Our Tet Holiday", 6, "ck2"], ["Unit 13 · Our Special Days", 6, "ck2"],
    ["Unit 14 · Staying Healthy", 9, "ck2"], ["Unit 15 · Our Health", 6, "ck2"], ["Unit 16 · Seasons and the Weather", 6, "ck2"],
    ["Unit 17 · Stories for Children", 6, "ck2"], ["Unit 18 · Means of Transport", 6, "ck2"], ["Unit 19 · Places of Interest", 6, "ck2"],
    ["Unit 20 · Our Summer Holidays", 6, "ck2"]
  ],
  "5-tincn.js": [
    ["Tin học · Làm được gì với máy tính", 2, "ck1"], ["Tin học · Tìm kiếm thông tin trên website", 4, "ck1"],
    ["Tin học · Tìm kiếm thông tin trong giải quyết vấn đề", 4, "ck1"], ["Tin học · Cây thư mục", 4, "ck1"],
    ["Tin học · Bản quyền nội dung thông tin", 4, "ck1"], ["Tin học · Định dạng kí tự và bố trí hình ảnh", 2, "ck1"],
    ["Tin học · Thực hành soạn thảo văn bản", 2, "ck1"], ["Tin học · Phần mềm đồ hoạ", 4, "ck1"],
    ["Công nghệ · Vai trò của công nghệ", 4, "ck1"], ["Công nghệ · Nhà sáng chế", 4, "ck1"], ["Công nghệ · Tìm hiểu thiết kế", 4, "ck1"],
    ["Công nghệ · Thiết kế sản phẩm", 2, "ck1"], ["Công nghệ · Sử dụng điện thoại", 6, "ck1"], ["Công nghệ · Sử dụng tủ lạnh", 4, "ck1"],
    ["Tin học · Cấu trúc tuần tự", 4, "ck2"], ["Tin học · Cấu trúc lặp", 4, "ck2"], ["Tin học · Thực hành sử dụng lệnh lặp", 2, "ck2"],
    ["Tin học · Cấu trúc rẽ nhánh", 4, "ck2"], ["Tin học · Sử dụng biến trong chương trình", 4, "ck2"],
    ["Tin học · Sử dụng biểu thức trong chương trình", 4, "ck2"], ["Tin học · Từ kịch bản đến chương trình", 4, "ck2"],
    ["Công nghệ · Lắp ráp mô hình xe điện chạy bằng pin", 8, "ck2"], ["Công nghệ · Mô hình máy phát điện gió", 8, "ck2"],
    ["Công nghệ · Mô hình điện mặt trời", 8, "ck2"]
  ],
  "5-toan.js": [
    ["Phân số thập phân", 8, "gk1 ck1"], ["Hỗn số", 16, "gk1 ck1"], ["Cộng, trừ phân số", 8, "gk1 ck1"], ["Số thập phân", 16, "gk1 ck1"],
    ["So sánh số thập phân", 16, "gk1 ck1"], ["Viết số đo dưới dạng số thập phân", 16, "gk1 ck1"], ["Làm tròn số thập phân", 12, "gk1 ck1"],
    ["Đơn vị đo diện tích", 20, "gk1 ck1"], ["Cộng, trừ số thập phân", 8, "ck1"], ["Nhân số thập phân", 4, "ck1"],
    ["Chia số thập phân", 12, "ck1 ck2"], ["Nhân, chia với 10; 100; 1 000; 0,1; 0,01; 0,001", 4, "ck1"], ["Hình tam giác", 8, "ck1"],
    ["Hình thang", 12, "ck1 ck2"], ["Hình tròn", 16, "ck1 ck2"], ["Tỉ số, tỉ số phần trăm", 12, "gk2 ck2"], ["Tỉ lệ bản đồ", 8, "gk2"],
    ["Tìm hai số khi biết tổng và tỉ số", 12, "gk2 ck2"], ["Tìm hai số khi biết hiệu và tỉ số", 8, "gk2"],
    ["Tìm tỉ số phần trăm của hai số", 4, "gk2"], ["Tìm giá trị phần trăm của một số", 12, "gk2 ck2"], ["Máy tính cầm tay", 4, "gk2"],
    ["Thể tích của một hình", 8, "gk2"], ["Xăng-ti-mét khối, đề-xi-mét khối", 4, "gk2"], ["Mét khối", 12, "gk2 ck2"],
    ["Hình khai triển", 8, "gk2"], ["Diện tích xung quanh, toàn phần của hình hộp chữ nhật", 12, "gk2 ck2"],
    ["Diện tích xung quanh, toàn phần của hình lập phương", 4, "gk2"], ["Thể tích của hình hộp chữ nhật", 12, "gk2 ck2"],
    ["Thể tích của hình lập phương", 4, "gk2"], ["Các đơn vị đo thời gian", 8, "ck2"], ["Cộng, trừ số đo thời gian", 8, "ck2"],
    ["Nhân, chia số đo thời gian với một số", 4, "ck2"], ["Vận tốc", 8, "ck2"], ["Quãng đường, thời gian của một chuyển động đều", 12, "ck2"],
    ["Thu thập, phân loại, sắp xếp các số liệu", 4, "ck2"], ["Biểu đồ hình quạt tròn", 12, "ck2"],
    ["Tỉ số của số lần lặp lại một sự kiện", 8, "ck2"], ["Ôn tập số tự nhiên", 8, "gk1"], ["Ôn tập các phép tính với số tự nhiên", 8, "gk1"],
    ["Ôn tập phân số", 8, "gk1"], ["Ôn tập các phép tính với phân số", 8, "gk1"], ["Ôn tập hình học và đo lường", 4, "gk1"]
  ],
  "5-tv.js": [
    ["Đọc hiểu", 112, "gk1 ck1 gk2 ck2"], ["Danh từ, động từ, tính từ", 20, "gk1 ck1"], ["Đại từ", 44, "gk1 ck1 ck2"],
    ["Từ đồng nghĩa", 32, "gk1 ck1 ck2"], ["Từ đa nghĩa", 28, "gk1 ck1 ck2"], ["Sử dụng từ điển", 8, "ck1"], ["Dấu gạch ngang", 16, "ck1 ck2"],
    ["Biện pháp điệp từ, điệp ngữ", 8, "ck1"], ["Kết từ", 12, "ck1 ck2"], ["Câu đơn và câu ghép", 12, "gk2"],
    ["Cách nối các vế câu ghép", 20, "gk2 ck2"], ["Câu ghép", 16, "gk2 ck2"], ["Liên kết câu bằng cách lặp từ ngữ", 8, "gk2"],
    ["Liên kết câu bằng từ ngữ nối", 8, "gk2"], ["Liên kết câu bằng từ ngữ thay thế", 8, "gk2"], ["Liên kết câu trong đoạn văn", 16, "gk2 ck2"],
    ["Viết hoa danh từ chung", 4, "ck2"], ["Viết tên người, tên địa lí nước ngoài", 12, "ck2"]
  ],
  "6-congnghe.js": [
    ["Khái quát về nhà ở", 20, "gk1 ck1"], ["Xây dựng nhà ở", 20, "gk1 ck1"], ["Ngôi nhà thông minh", 36, "gk1 ck1"],
    ["Thực phẩm và dinh dưỡng", 9, "ck1"], ["Bảo quản và chế biến thực phẩm", 11, "ck1"], ["Bữa ăn kết nối yêu thương", 4, "ck1"],
    ["Trang phục trong đời sống", 16, "gk2 ck2"], ["Sử dụng và bảo quản trang phục", 18, "gk2 ck2"], ["Thời trang", 12, "gk2 ck2"],
    ["Đồ dùng điện trong gia đình", 20, "gk2 ck2"], ["Đèn điện", 10, "ck2"], ["Nồi cơm điện", 8, "ck2"], ["Bếp hồng ngoại", 8, "ck2"],
    ["An toàn và tiết kiệm điện năng", 8, "ck2"]
  ],
  "6-gdcd.js": [
    ["Truyền thống gia đình, dòng họ", 22, "gk1 ck1"], ["Yêu thương con người", 22, "gk1 ck1"], ["Siêng năng, kiên trì", 23, "gk1 ck1"],
    ["Tôn trọng sự thật", 16, "gk1 ck1"], ["Tự lập", 8, "ck1"], ["Tự nhận thức bản thân", 9, "ck1"],
    ["Ứng phó với tình huống nguy hiểm", 26, "gk2 ck2"], ["Tiết kiệm", 26, "gk2 ck2"], ["Công dân nước Việt Nam", 12, "gk2 ck2"],
    ["Quyền và nghĩa vụ cơ bản của công dân", 12, "ck2"], ["Quyền cơ bản của trẻ em", 12, "ck2"], ["Thực hiện quyền trẻ em", 12, "ck2"]
  ],
  "6-khtn.js": [
    ["Giới thiệu về Khoa học tự nhiên", 12, "gk1 ck1"], ["An toàn trong phòng thực hành", 15, "gk1 ck1"],
    ["Kính lúp, kính hiển vi", 13, "gk1 ck1"], ["Đo chiều dài, khối lượng, thời gian", 22, "gk1 ck1"], ["Đo nhiệt độ", 16, "gk1 ck1"],
    ["Chất và sự chuyển thể", 19, "gk1 ck1"], ["Oxygen và không khí", 15, "gk1 ck1"],
    ["Vật liệu, nhiên liệu, lương thực – thực phẩm", 15, "gk1 ck1"], ["Hỗn hợp và tách chất", 14, "gk1 ck1"], ["Tế bào", 9, "ck1"],
    ["Từ tế bào đến cơ thể", 3, "ck1"], ["Phân loại sinh vật", 6, "gk2"], ["Khoá lưỡng phân", 6, "gk2"], ["Vi khuẩn", 10, "gk2"],
    ["Virus", 9, "gk2"], ["Nguyên sinh vật", 6, "gk2"], ["Nấm", 9, "gk2"], ["Thực vật", 15, "gk2 ck2"], ["Động vật", 18, "gk2 ck2"],
    ["Đa dạng sinh học", 9, "gk2 ck2"], ["Tìm hiểu sinh vật ngoài thiên nhiên", 3, "gk2"], ["Lực và biểu diễn lực", 9, "ck2"],
    ["Biến dạng của lò xo", 6, "ck2"], ["Trọng lượng, lực hấp dẫn", 6, "ck2"], ["Lực ma sát, lực cản của nước", 6, "ck2"],
    ["Năng lượng và các dạng năng lượng", 6, "ck2"], ["Chuyển hoá năng lượng, năng lượng hao phí", 9, "ck2"],
    ["Năng lượng tái tạo, tiết kiệm năng lượng", 6, "ck2"], ["Mặt Trời, Mặt Trăng", 6, "ck2"], ["Hệ Mặt Trời, Ngân Hà", 6, "ck2"]
  ],
  "6-lsdl.js": [
    ["Tư liệu lịch sử", 10, "gk1 ck1"], ["Thời gian trong lịch sử", 11, "gk1 ck1"], ["Thời kì nguyên thủy", 4, "ck1"],
    ["Ai Cập và Lưỡng Hà cổ đại", 4, "ck1"], ["Ấn Độ cổ đại", 3, "ck1"], ["Trung Quốc cổ đại", 3, "ck1"], ["Hy Lạp và La Mã cổ đại", 4, "ck1"],
    ["Kinh tuyến, vĩ tuyến, tọa độ địa lí", 11, "gk1 ck1"], ["Bản đồ", 3, "ck1"], ["Trái Đất trong hệ Mặt Trời", 6, "gk1 ck1"],
    ["Chuyển động của Trái Đất", 6, "ck1"], ["Cấu tạo của Trái Đất", 3, "ck1"], ["Nội sinh và ngoại sinh", 2, "ck1"],
    ["Núi lửa và động đất", 2, "ck1"], ["Địa hình và khoáng sản", 5, "ck1"], ["Lược đồ địa hình, lát cắt", 2, "ck1"],
    ["Lớp vỏ khí, khí áp và gió", 3, "ck1"], ["Lịch sử và cuộc sống", 4, "gk1"], ["Nguồn gốc loài người", 4, "gk1"],
    ["Xã hội nguyên thủy", 4, "gk1"], ["Chuyển biến của xã hội nguyên thủy", 2, "gk1"], ["Kí hiệu và chú giải bản đồ", 2, "gk1"],
    ["Phương hướng và tỉ lệ bản đồ", 6, "gk1"], ["Lược đồ trí nhớ", 2, "gk1"], ["Chuyển động tự quay của Trái Đất", 4, "gk1"],
    ["Các quốc gia sơ kì ở Đông Nam Á", 4, "gk2"], ["Các vương quốc phong kiến ở Đông Nam Á", 4, "gk2"],
    ["Giao lưu văn hóa ở Đông Nam Á", 4, "gk2"], ["Nhà nước Văn Lang, Âu Lạc", 6, "gk2"], ["Thời Bắc thuộc", 6, "gk2"],
    ["Nhiệt độ không khí, mây và mưa", 6, "gk2"], ["Thời tiết, khí hậu và biến đổi khí hậu", 6, "gk2"],
    ["Biểu đồ nhiệt độ, lượng mưa", 4, "gk2"], ["Thủy quyển, vòng tuần hoàn của nước", 2, "gk2"], ["Sông, hồ, nước ngầm, băng hà", 4, "gk2"],
    ["Biển và đại dương", 2, "gk2"], ["Lớp đất trên Trái Đất", 2, "gk2"], ["Khởi nghĩa giành độc lập trước thế kỉ X", 6, "ck2"],
    ["Bảo tồn và phát triển văn hoá dân tộc", 4, "ck2"], ["Bước ngoặt lịch sử đầu thế kỉ X", 6, "ck2"], ["Vương quốc Chăm-pa", 4, "ck2"],
    ["Vương quốc Phù Nam", 4, "ck2"], ["Sự sống trên Trái Đất", 4, "ck2"], ["Rừng nhiệt đới", 4, "ck2"],
    ["Các đới thiên nhiên trên Trái Đất", 4, "ck2"], ["Dân số và phân bố dân cư", 6, "ck2"], ["Con người và thiên nhiên", 4, "ck2"],
    ["Bảo vệ tự nhiên, khai thác thông minh tài nguyên", 4, "ck2"]
  ],
  "6-ta.js": [
    ["Pronunciation", 29, "gk1 ck1 gk2 ck2"], ["Unit 1 · My New School", 27, "gk1 ck1"], ["Unit 2 · My House", 29, "gk1 ck1"],
    ["Unit 3 · My Friends", 29, "gk1 ck1"], ["Unit 4 · My Neighbourhood", 9, "ck1"], ["Unit 5 · Natural Wonders of Viet Nam", 9, "ck1"],
    ["Unit 6 · Our Tet Holiday", 9, "ck1"], ["Reading", 56, "gk1 ck1 gk2 ck2"], ["Unit 7 · Television", 25, "gk2 ck2"],
    ["Unit 8 · Sports and Games", 24, "gk2 ck2"], ["Unit 9 · Cities of the World", 25, "gk2 ck2"],
    ["Unit 10 · Our Houses in the Future", 12, "ck2"], ["Unit 11 · Our Greener World", 12, "ck2"], ["Unit 12 · Robots", 9, "ck2"]
  ],
  "6-thunghiem.js": [
    ["Ngữ văn · Đọc hiểu", 3, ""], ["English · Reading", 2, ""], ["English · Vocabulary", 1, ""], ["KHTN · Đo lường", 2, ""],
    ["Toán · Số nguyên", 2, ""], ["Toán · Hình học trực quan", 2, ""], ["Toán · Số thập phân", 1, ""]
  ],
  "6-tin.js": [
    ["Thông tin và dữ liệu", 15, "gk1 ck1"], ["Xử lí thông tin", 17, "gk1 ck1"], ["Thông tin trong máy tính", 20, "gk1 ck1"],
    ["Mạng máy tính", 14, "gk1 ck1"], ["Internet", 12, "gk1 ck1"], ["Mạng thông tin toàn cầu", 5, "ck1"],
    ["Tìm kiếm thông tin trên Internet", 4, "ck1"], ["Thư điện tử", 7, "ck1"], ["An toàn thông tin trên Internet", 14, "ck1 gk2 ck2"],
    ["Sơ đồ tư duy", 12, "gk2 ck2"], ["Định dạng văn bản", 18, "gk2 ck2"], ["Trình bày thông tin ở dạng bảng", 14, "gk2 ck2"],
    ["Tìm kiếm và thay thế", 8, "gk2 ck2"], ["Thuật toán", 14, "ck2"], ["Các cấu trúc điều khiển", 16, "ck2"],
    ["Chương trình máy tính", 10, "ck2"]
  ],
  "6-toan.js": [
    ["Tập hợp các số tự nhiên", 38, "gk1 ck1"], ["Lũy thừa, thứ tự thực hiện phép tính", 38, "gk1 ck1"],
    ["Tính chia hết, số nguyên tố", 42, "gk1 ck1"], ["ƯCLN và BCNN", 36, "gk1 ck1"], ["Số nguyên", 28, "gk1 ck1"],
    ["Nhân, chia số nguyên", 23, "gk1 ck1"], ["Hình phẳng", 14, "gk1 ck1"], ["Chu vi, diện tích", 17, "gk1 ck1"], ["Tính đối xứng", 8, "ck1"],
    ["Phân số bằng nhau", 14, "gk2 ck2"], ["So sánh phân số, hỗn số", 13, "gk2 ck2"], ["Cộng, trừ phân số", 16, "gk2 ck2"],
    ["Nhân, chia phân số", 12, "gk2 ck2"], ["Hai bài toán về phân số", 10, "gk2 ck2"], ["Số thập phân", 12, "gk2 ck2"],
    ["Tính toán với số thập phân", 13, "gk2 ck2"], ["Làm tròn và ước lượng", 12, "gk2 ck2"], ["Tỉ số, tỉ số phần trăm", 18, "gk2 ck2"],
    ["Điểm, đường thẳng, tia", 19, "gk2 ck2"], ["Đoạn thẳng, trung điểm", 17, "gk2 ck2"], ["Góc, số đo góc", 16, "ck2"],
    ["Dữ liệu, biểu đồ tranh", 8, "ck2"], ["Biểu đồ cột, biểu đồ cột kép", 8, "ck2"], ["Xác suất thực nghiệm", 12, "ck2"]
  ],
  "6-van.js": [
    ["Tôi và các bạn", 22, "gk1 ck1"], ["Dấu câu", 10, "gk1 ck1 gk2"], ["Từ đơn và từ phức", 24, "gk1 ck1 gk2 ck2"],
    ["Nghĩa của từ", 21, "gk1 ck1 gk2 ck2"], ["Biện pháp tu từ", 29, "gk1 ck1 gk2"], ["Gõ cửa trái tim", 20, "gk1 ck1"],
    ["Yêu thương và chia sẻ", 22, "gk1 ck1"], ["Cụm danh từ, cụm động từ, cụm tính từ", 21, "gk1 ck1 gk2 ck2"], ["Quê hương yêu dấu", 9, "ck1"],
    ["Từ đồng âm và từ đa nghĩa", 4, "ck1"], ["Những nẻo đường xứ sở", 8, "ck1"], ["Chuyện kể về những người anh hùng", 30, "gk2 ck2"],
    ["Thế giới cổ tích", 30, "gk2 ck2"], ["Khác biệt và gần gũi", 12, "ck2"], ["Trái Đất – ngôi nhà chung", 12, "ck2"], ["Trạng ngữ", 8, "ck2"],
    ["Từ mượn", 6, "ck2"], ["Lựa chọn từ ngữ và cấu trúc câu", 3, "ck2"], ["Văn bản và đoạn văn", 3, "ck2"]
  ],
  "7-congnghe.js": [
    ["Giới thiệu về trồng trọt", 8, "ck1"], ["Làm đất trồng cây", 6, "ck1"], ["Gieo trồng, chăm sóc và phòng trừ sâu, bệnh", 8, "ck1"],
    ["Thu hoạch sản phẩm trồng trọt", 6, "ck1"], ["Nhân giống vô tính cây trồng", 8, "ck1"], ["Giới thiệu về rừng", 6, "ck1"],
    ["Trồng, chăm sóc và bảo vệ rừng", 8, "ck1"]
  ],
  "7-gdcd.js": [
    ["Tự hào về truyền thống quê hương", 6, "ck1"], ["Quan tâm, cảm thông và chia sẻ", 6, "ck1"], ["Học tập tự giác, tích cực", 8, "ck1"],
    ["Giữ chữ tín", 10, "ck1"], ["Bảo tồn di sản văn hoá", 10, "ck1"], ["Ứng phó với tâm lí căng thẳng", 10, "ck1"]
  ],
  "7-khtn.js": [
    ["Phương pháp và kĩ năng học tập môn Khoa học tự nhiên", 6, "ck1"], ["Nguyên tử", 6, "ck1"], ["Nguyên tố hoá học", 3, "ck1"],
    ["Sơ lược về bảng tuần hoàn các nguyên tố hoá học", 6, "ck1"], ["Phân tử – Đơn chất – Hợp chất", 6, "ck1"],
    ["Giới thiệu về liên kết hoá học", 3, "ck1"], ["Hoá trị và công thức hoá học", 6, "ck1"], ["Tốc độ chuyển động", 6, "ck1"],
    ["Đo tốc độ", 3, "ck1"], ["Đồ thị quãng đường – thời gian", 6, "ck1"], ["Ảnh hưởng của tốc độ trong an toàn giao thông", 3, "ck1"],
    ["Sóng âm", 3, "ck1"], ["Độ to và độ cao của âm", 6, "ck1"], ["Phản xạ âm, chống ô nhiễm tiếng ồn", 3, "ck1"],
    ["Năng lượng ánh sáng. Tia sáng, vùng tối", 3, "ck1"], ["Sự phản xạ ánh sáng", 3, "ck1"], ["Ảnh của vật qua gương phẳng", 3, "ck1"]
  ],
  "7-lsdl.js": [
    ["Chế độ phong kiến ở Tây Âu", 2, "ck1"], ["Các cuộc phát kiến địa lí", 2, "ck1"], ["Văn hoá Phục hưng và Cải cách tôn giáo", 2, "ck1"],
    ["Trung Quốc thời trung đại", 2, "ck1"], ["Ấn Độ thời trung đại", 2, "ck1"], ["Các vương quốc phong kiến Đông Nam Á", 2, "ck1"],
    ["Vương quốc Lào", 2, "ck1"], ["Vương quốc Cam-pu-chia", 2, "ck1"], ["Đất nước buổi đầu độc lập (939 – 967)", 4, "ck1"],
    ["Đại Cồ Việt thời Đinh và Tiền Lê (968 – 1009)", 4, "ck1"], ["Vị trí địa lí, tự nhiên châu Âu", 2, "ck1"],
    ["Dân cư, xã hội châu Âu", 2, "ck1"], ["Bảo vệ thiên nhiên ở châu Âu", 2, "ck1"], ["Liên minh châu Âu", 2, "ck1"],
    ["Vị trí địa lí, tự nhiên châu Á", 4, "ck1"], ["Dân cư, xã hội châu Á", 2, "ck1"], ["Các khu vực của châu Á", 4, "ck1"],
    ["Vị trí địa lí, tự nhiên châu Phi", 4, "ck1"], ["Dân cư, xã hội châu Phi", 2, "ck1"],
    ["Con người khai thác thiên nhiên châu Phi", 2, "ck1"]
  ],
  "7-ta.js": [
    ["Pronunciation", 8, "ck1"], ["Unit 1 · Hobbies", 16, "ck1"], ["Unit 2 · Healthy Living", 12, "ck1"],
    ["Unit 3 · Community Service", 12, "ck1"], ["Unit 4 · Music and Arts", 12, "ck1"], ["Unit 5 · Food and Drink", 16, "ck1"],
    ["Unit 6 · A Visit to a School", 12, "ck1"], ["Reading", 12, "ck1"]
  ],
  "7-tin.js": [
    ["Thiết bị vào – ra", 4, "ck1"], ["Phần mềm máy tính", 4, "ck1"], ["Quản lí dữ liệu trong máy tính", 6, "ck1"],
    ["Mạng xã hội và kênh trao đổi thông tin", 4, "ck1"], ["Ứng xử trên mạng", 6, "ck1"], ["Làm quen với phần mềm bảng tính", 8, "ck1"],
    ["Tính toán tự động trên bảng tính", 8, "ck1"], ["Công cụ hỗ trợ tính toán", 10, "ck1"]
  ],
  "7-toan.js": [
    ["Tập hợp các số hữu tỉ", 8, "ck1"], ["Cộng, trừ, nhân, chia số hữu tỉ", 8, "ck1"],
    ["Luỹ thừa với số mũ tự nhiên của một số hữu tỉ", 4, "ck1"], ["Thứ tự thực hiện các phép tính. Quy tắc chuyển vế", 4, "ck1"],
    ["Số thập phân vô hạn tuần hoàn", 4, "ck1"], ["Số vô tỉ. Căn bậc hai số học", 8, "ck1"], ["Tập hợp các số thực", 4, "ck1"],
    ["Góc ở vị trí đặc biệt. Tia phân giác của một góc", 4, "ck1"], ["Hai đường thẳng song song và dấu hiệu nhận biết", 4, "ck1"],
    ["Tiên đề Euclid. Tính chất của hai đường thẳng song song", 4, "ck1"], ["Định lí và chứng minh định lí", 4, "ck1"],
    ["Tổng các góc trong một tam giác", 8, "ck1"], ["Hai tam giác bằng nhau. Trường hợp bằng nhau thứ nhất", 4, "ck1"],
    ["Trường hợp bằng nhau thứ hai và thứ ba của tam giác", 5, "ck1"], ["Tam giác cân. Đường trung trực của đoạn thẳng", 8, "ck1"],
    ["Thu thập và phân loại dữ liệu", 4, "ck1"], ["Biểu đồ hình quạt tròn", 4, "ck1"], ["Biểu đồ đoạn thẳng", 4, "ck1"],
    ["Các trường hợp bằng nhau của tam giác vuông", 1, "ck1"]
  ],
  "7-van.js": [
    ["Bầu trời tuổi thơ", 9, "ck1"], ["Khúc nhạc tâm hồn", 9, "ck1"], ["Cội nguồn yêu thương", 9, "ck1"], ["Giai điệu đất nước", 9, "ck1"],
    ["Màu sắc trăm miền", 9, "ck1"], ["Mở rộng thành phần câu bằng cụm từ", 6, "ck1"], ["Từ láy", 5, "ck1"], ["Nói giảm nói tránh", 5, "ck1"],
    ["Nghĩa của từ ngữ trong ngữ cảnh", 6, "ck1"], ["Biện pháp tu từ", 6, "ck1"], ["Số từ", 5, "ck1"], ["Phó từ", 5, "ck1"],
    ["Dấu câu", 6, "ck1"], ["Từ ngữ địa phương", 5, "ck1"]
  ],
  "8-congnghe.js": [
    ["Tiêu chuẩn trình bày bản vẽ kĩ thuật", 6, "ck1"], ["Hình chiếu vuông góc", 8, "ck1"], ["Bản vẽ chi tiết", 6, "ck1"],
    ["Bản vẽ lắp", 4, "ck1"], ["Bản vẽ nhà", 6, "ck1"], ["Vật liệu cơ khí", 6, "ck1"], ["Truyền và biến đổi chuyển động", 8, "ck1"],
    ["Gia công cơ khí bằng tay", 4, "ck1"], ["Ngành nghề trong lĩnh vực cơ khí", 2, "ck1"]
  ],
  "8-gdcd.js": [
    ["Tự hào về truyền thống dân tộc Việt Nam", 6, "ck1"], ["Tôn trọng sự đa dạng của các dân tộc", 6, "ck1"],
    ["Lao động cần cù, sáng tạo", 8, "ck1"], ["Bảo vệ lẽ phải", 10, "ck1"], ["Bảo vệ môi trường và tài nguyên thiên nhiên", 10, "ck1"],
    ["Xác định mục tiêu cá nhân", 10, "ck1"]
  ],
  "8-khtn.js": [
    ["Sử dụng một số hoá chất, thiết bị cơ bản trong phòng thí nghiệm", 6, "ck1"], ["Phản ứng hoá học", 6, "ck1"],
    ["Mol và tỉ khối chất khí", 6, "ck1"], ["Dung dịch và nồng độ", 6, "ck1"],
    ["Định luật bảo toàn khối lượng và phương trình hoá học", 3, "ck1"], ["Tính theo phương trình hoá học", 3, "ck1"],
    ["Tốc độ phản ứng và chất xúc tác", 3, "ck1"], ["Acid", 3, "ck1"], ["Base. Thang pH", 3, "ck1"], ["Oxide", 3, "ck1"], ["Muối", 3, "ck1"],
    ["Phân bón hoá học", 3, "ck1"], ["Khối lượng riêng", 6, "ck1"], ["Áp suất trên một bề mặt", 3, "ck1"],
    ["Áp suất chất lỏng. Áp suất khí quyển", 6, "ck1"], ["Lực đẩy Archimedes", 3, "ck1"], ["Tác dụng làm quay của lực. Moment lực", 3, "ck1"],
    ["Đòn bẩy và ứng dụng", 6, "ck1"]
  ],
  "8-lsdl.js": [
    ["Cách mạng tư sản Anh và Chiến tranh giành độc lập ở Bắc Mỹ", 2, "ck1"], ["Cách mạng tư sản Pháp cuối thế kỉ XVIII", 2, "ck1"],
    ["Cách mạng công nghiệp", 2, "ck1"], ["Đông Nam Á từ nửa sau thế kỉ XVI đến giữa thế kỉ XIX", 2, "ck1"],
    ["Xung đột Nam – Bắc triều và Trịnh – Nguyễn", 2, "ck1"], ["Khai phá vùng đất phía Nam (thế kỉ XVI – XVIII)", 2, "ck1"],
    ["Khởi nghĩa nông dân ở Đàng Ngoài thế kỉ XVIII", 2, "ck1"], ["Phong trào Tây Sơn", 4, "ck1"],
    ["Kinh tế, văn hoá, tôn giáo thế kỉ XVI – XVIII", 2, "ck1"], ["Sự hình thành chủ nghĩa đế quốc", 2, "ck1"],
    ["Phong trào công nhân và chủ nghĩa xã hội khoa học", 4, "ck1"], ["Vị trí địa lí và phạm vi lãnh thổ Việt Nam", 4, "ck1"],
    ["Địa hình Việt Nam", 4, "ck1"], ["Khoáng sản Việt Nam", 2, "ck1"], ["Khí hậu Việt Nam", 6, "ck1"], ["Thuỷ văn Việt Nam", 4, "ck1"],
    ["Vai trò của tài nguyên khí hậu và tài nguyên nước", 2, "ck1"], ["Tác động của biến đổi khí hậu", 2, "ck1"]
  ],
  "8-ta.js": [
    ["Pronunciation", 8, "ck1"], ["Unit 1 · Leisure Time", 16, "ck1"], ["Unit 2 · Life in the Countryside", 12, "ck1"],
    ["Unit 3 · Teenagers", 12, "ck1"], ["Unit 4 · Ethnic Groups of Viet Nam", 16, "ck1"], ["Unit 5 · Our Customs and Traditions", 12, "ck1"],
    ["Unit 6 · Lifestyles", 12, "ck1"], ["Reading", 12, "ck1"]
  ],
  "8-tin.js": [
    ["Lược sử công cụ tính toán", 8, "ck1"], ["Thông tin trong môi trường số", 8, "ck1"],
    ["Đạo đức và văn hoá trong sử dụng công nghệ kĩ thuật số", 8, "ck1"], ["Sử dụng bảng tính giải quyết bài toán thực tế", 10, "ck1"],
    ["Sắp xếp và lọc dữ liệu", 8, "ck1"], ["Trình bày dữ liệu bằng biểu đồ", 8, "ck1"]
  ],
  "8-toan.js": [
    ["Đơn thức", 4, "ck1"], ["Đa thức", 4, "ck1"], ["Phép cộng và phép trừ đa thức", 4, "ck1"], ["Phép nhân đa thức", 8, "ck1"],
    ["Phép chia đa thức cho đơn thức", 4, "ck1"], ["Hiệu hai bình phương. Bình phương của một tổng hay một hiệu", 8, "ck1"],
    ["Lập phương của một tổng. Lập phương của một hiệu", 4, "ck1"], ["Tổng và hiệu hai lập phương", 4, "ck1"],
    ["Phân tích đa thức thành nhân tử", 5, "ck1"], ["Tứ giác", 4, "ck1"], ["Hình thang cân", 4, "ck1"], ["Hình bình hành", 5, "ck1"],
    ["Hình chữ nhật", 4, "ck1"], ["Hình thoi và hình vuông", 4, "ck1"], ["Định lí Thalès trong tam giác", 8, "ck1"],
    ["Đường trung bình của tam giác", 4, "ck1"], ["Tính chất đường phân giác của tam giác", 4, "ck1"],
    ["Thu thập và phân loại dữ liệu", 4, "ck1"], ["Biểu diễn dữ liệu bằng bảng, biểu đồ", 4, "ck1"],
    ["Phân tích số liệu thống kê dựa vào biểu đồ", 4, "ck1"]
  ],
  "8-van.js": [
    ["Câu chuyện của lịch sử", 9, "ck1"], ["Vẻ đẹp cổ điển", 9, "ck1"], ["Lời sông núi", 9, "ck1"],
    ["Tiếng cười trào phúng trong thơ", 9, "ck1"], ["Những câu chuyện hài", 9, "ck1"], ["Biệt ngữ xã hội", 5, "ck1"],
    ["Từ ngữ địa phương", 5, "ck1"], ["Từ tượng hình, từ tượng thanh", 5, "ck1"], ["Đảo ngữ", 6, "ck1"],
    ["Đoạn văn diễn dịch, quy nạp, song song, phối hợp", 6, "ck1"], ["Từ, thành ngữ Hán Việt", 5, "ck1"],
    ["Sắc thái nghĩa của từ ngữ", 6, "ck1"], ["Câu hỏi tu từ", 5, "ck1"], ["Nghĩa tường minh và nghĩa hàm ẩn", 6, "ck1"]
  ],
  "9-congnghe.js": [
    ["Nghề nghiệp trong lĩnh vực kĩ thuật và công nghệ", 26, "gk1 ck1"], ["Cơ cấu hệ thống giáo dục quốc dân", 22, "gk1 ck1"],
    ["Thị trường lao động kĩ thuật, công nghệ", 34, "gk1 ck1 ck2"], ["Quy trình lựa chọn nghề nghiệp", 16, "ck1 ck2"],
    ["Tự đánh giá mức độ phù hợp với nghề", 6, "ck1"], ["Thiết bị đóng cắt và lấy điện trong gia đình", 14, "gk2 ck2"],
    ["Dụng cụ đo điện cơ bản", 14, "gk2 ck2"], ["Thiết kế mạng điện trong nhà", 16, "gk2 ck2"],
    ["Vật liệu, thiết bị và dụng cụ lắp đặt mạng điện", 18, "gk2 ck2"], ["Tính toán chi phí mạng điện trong nhà", 12, "ck2"],
    ["Lắp đặt mạng điện trong nhà", 14, "ck2"], ["Ngành nghề liên quan đến lắp đặt mạng điện", 8, "ck2"]
  ],
  "9-gdcd.js": [
    ["Sống có lí tưởng", 24, "gk1 ck1"], ["Khoan dung", 24, "gk1 ck1"], ["Hoạt động cộng đồng", 26, "gk1 ck1"],
    ["Khách quan và công bằng", 8, "ck1"], ["Bảo vệ hoà bình", 8, "ck1"], ["Quản lí thời gian hiệu quả", 16, "ck1 gk2"],
    ["Thích ứng với thay đổi", 28, "gk2 ck2"], ["Tiêu dùng thông minh", 30, "gk2 ck2"], ["Vi phạm pháp luật và trách nhiệm pháp lí", 18, "ck2"],
    ["Quyền tự do kinh doanh và nghĩa vụ nộp thuế", 18, "ck2"]
  ],
  "9-khtn.js": [
    ["Nhận biết một số dụng cụ, hoá chất", 6, "gk1"], ["Động năng. Thế năng", 12, "gk1 ck1"], ["Cơ năng", 9, "gk1 ck1"],
    ["Công và công suất", 9, "gk1 ck1"], ["Khúc xạ ánh sáng", 9, "gk1 ck1"], ["Giới thiệu về hợp chất hữu cơ", 9, "gk1 ck1"],
    ["Alkane", 9, "gk1 ck1"], ["Alkene", 9, "gk1 ck1"], ["Nguồn nhiên liệu", 9, "gk1 ck1"], ["Khái quát về di truyền học", 9, "gk1 ck1"],
    ["Các quy luật di truyền của Mendel", 12, "gk1 ck1"], ["Nucleic acid và gene", 9, "gk1 ck1"], ["Phản xạ toàn phần", 3, "ck1"],
    ["Lăng kính", 3, "ck1"], ["Thấu kính", 3, "ck1"], ["Kính lúp. Bài tập thấu kính", 3, "ck1"], ["Ethylic alcohol", 3, "ck1"],
    ["Acetic acid", 3, "ck1"], ["Lipid", 3, "ck1"], ["Carbohydrate", 3, "ck1"], ["Protein", 3, "ck1"], ["Polymer", 3, "ck1"],
    ["Tái bản DNA và phiên mã tạo RNA", 3, "ck1"], ["Dịch mã và mối quan hệ từ gene đến tính trạng", 3, "ck1"], ["Đột biến gene", 3, "ck1"],
    ["Điện trở. Định luật Ohm", 9, "gk2"], ["Đoạn mạch nối tiếp, song song", 6, "gk2"],
    ["Năng lượng của dòng điện và công suất điện", 9, "gk2 ck2"], ["Tính chất chung của kim loại", 9, "gk2"],
    ["Dãy hoạt động hoá học", 12, "gk2 ck2"], ["Tách kim loại và việc sử dụng hợp kim", 12, "gk2 ck2"],
    ["Sự khác nhau cơ bản giữa phi kim và kim loại", 9, "gk2 ck2"], ["Nhiễm sắc thể và bộ nhiễm sắc thể", 6, "gk2"],
    ["Nguyên phân và giảm phân", 9, "gk2 ck2"], ["Nhiễm sắc thể giới tính và cơ chế xác định giới tính", 3, "gk2"],
    ["Di truyền liên kết", 3, "gk2"], ["Đột biến nhiễm sắc thể", 6, "gk2 ck2"],
    ["Cảm ứng điện từ. Nguyên tắc tạo ra dòng điện xoay chiều", 9, "ck2"], ["Tác dụng của dòng điện xoay chiều", 3, "ck2"],
    ["Vòng năng lượng trên Trái Đất. Năng lượng hoá thạch", 3, "ck2"], ["Một số dạng năng lượng tái tạo", 6, "ck2"],
    ["Hoá học vỏ Trái Đất và khai thác tài nguyên từ vỏ Trái Đất", 6, "ck2"], ["Khai thác đá vôi. Công nghiệp silicate", 9, "ck2"],
    ["Nhiên liệu hoá thạch. Chu trình carbon và sự ấm lên toàn cầu", 6, "ck2"], ["Di truyền học với con người", 3, "ck2"],
    ["Ứng dụng công nghệ di truyền vào đời sống", 3, "ck2"], ["Khái niệm tiến hoá và các hình thức chọn lọc", 3, "ck2"],
    ["Cơ chế tiến hoá", 3, "ck2"], ["Sự phát sinh và phát triển sự sống trên Trái Đất", 3, "ck2"]
  ],
  "9-lsdl.js": [
    ["Nước Nga và Liên Xô (1918 – 1945)", 4, "gk1 ck1"], ["Châu Âu và nước Mỹ (1918 – 1945)", 4, "gk1 ck1"],
    ["Châu Á (1918 – 1945)", 4, "gk1 ck1"], ["Chiến tranh thế giới thứ hai", 6, "gk1 ck1"],
    ["Phong trào dân tộc dân chủ (1918 – 1930)", 6, "gk1 ck1"], ["Nguyễn Ái Quốc và sự thành lập Đảng", 4, "gk1 ck1"],
    ["Phong trào cách mạng (1930 – 1939)", 6, "gk1 ck1"], ["Cách mạng tháng Tám năm 1945", 8, "gk1 ck1 gk2"],
    ["Dân tộc và dân số", 6, "gk1 ck1"], ["Phân bố dân cư và quần cư", 6, "gk1 ck1"], ["Lao động và việc làm", 6, "gk1 ck1"],
    ["Nông nghiệp", 10, "gk1 ck1"], ["Lâm nghiệp và thuỷ sản", 6, "gk1 ck1"], ["Công nghiệp", 8, "gk1 ck1"], ["Chiến tranh lạnh", 2, "ck1"],
    ["Liên Xô và Đông Âu (1945 – 1991)", 2, "ck1"], ["Nước Mỹ và Tây Âu (1945 – 1991)", 2, "ck1"],
    ["Mỹ La-tinh và châu Á (1945 – 1991)", 2, "ck1"], ["Dịch vụ", 2, "ck1"], ["Vùng Trung du và miền núi phía Bắc", 4, "ck1"],
    ["Vùng Đồng bằng sông Hồng", 6, "ck1 gk2"], ["Năm đầu sau Cách mạng tháng Tám", 4, "gk2"],
    ["Kháng chiến chống Pháp (1946 – 1950)", 4, "gk2"], ["Kháng chiến chống Pháp (1951 – 1954)", 6, "gk2 ck2"],
    ["Kháng chiến chống Mỹ (1954 – 1965)", 4, "gk2"], ["Kháng chiến chống Mỹ (1965 – 1975)", 8, "gk2 ck2"],
    ["Vùng Bắc Trung Bộ", 10, "gk2 ck2"], ["Vùng Duyên hải Nam Trung Bộ và Tây Nguyên", 10, "gk2 ck2"], ["Vùng Đông Nam Bộ", 12, "gk2 ck2"],
    ["Trật tự thế giới, Nga và Mỹ (1991 – nay)", 4, "ck2"], ["Châu Á (1991 – nay)", 4, "ck2"],
    ["Thống nhất đất nước, bảo vệ Tổ quốc", 4, "ck2"], ["Công cuộc Đổi mới (1986 – nay)", 4, "ck2"],
    ["Cách mạng khoa học – kĩ thuật và toàn cầu hoá", 4, "ck2"], ["Vùng Đồng bằng sông Cửu Long", 10, "ck2"], ["Biển, đảo Việt Nam", 8, "ck2"]
  ],
  "9-ta.js": [
    ["Pronunciation", 30, "gk1 ck1 gk2 ck2"], ["Unit 1 · Local Community", 27, "gk1 ck1"], ["Unit 2 · City Life", 27, "gk1 ck1"],
    ["Unit 3 · Healthy Living for Teens", 27, "gk1 ck1"], ["Reading", 39, "gk1 ck1 gk2 ck2"], ["Unit 4 · Remembering the Past", 12, "ck1"],
    ["Unit 5 · Our Experiences", 12, "ck1"], ["Unit 6 · Vietnamese Lifestyle: Then and Now", 9, "ck1"],
    ["Unit 7 · Natural Wonders of the World", 27, "gk2 ck2"], ["Unit 8 · Tourism", 27, "gk2 ck2"], ["Unit 9 · World Englishes", 24, "gk2 ck2"],
    ["Review of Units 1–6", 6, "gk2"], ["Unit 10 · Planet Earth", 12, "ck2"], ["Unit 11 · Electronic Devices", 9, "ck2"],
    ["Unit 12 · Career Choices", 12, "ck2"]
  ],
  "9-tin.js": [
    ["Thế giới kĩ thuật số", 24, "gk1 ck1"], ["Thông tin trong giải quyết vấn đề", 30, "gk1 ck1"],
    ["Một số vấn đề pháp lí về sử dụng dịch vụ Internet", 24, "gk1 ck1"], ["Phần mềm mô phỏng", 10, "ck1"],
    ["Trình bày thông tin trong trao đổi và hợp tác", 12, "ck1"], ["Công cụ xác thực dữ liệu", 14, "gk2 ck2"], ["Hàm COUNTIF", 12, "gk2 ck2"],
    ["Hàm SUMIF", 12, "gk2 ck2"], ["Hàm IF", 14, "gk2 ck2"], ["Hoàn thiện bảng tính quản lí tài chính gia đình", 12, "gk2 ck2"],
    ["Giải quyết vấn đề", 8, "ck2"], ["Bài toán tin học", 12, "ck2"], ["Lập chương trình máy tính", 8, "ck2"],
    ["Tin học và thế giới nghề nghiệp", 8, "ck2"]
  ],
  "9-toan.js": [
    ["Phương trình và hệ hai phương trình bậc nhất hai ẩn", 16, "gk1 ck1"], ["Giải hệ hai phương trình bậc nhất hai ẩn", 20, "gk1 ck1"],
    ["Giải bài toán bằng cách lập hệ phương trình", 13, "gk1 ck1"], ["Phương trình quy về phương trình bậc nhất một ẩn", 16, "gk1 ck1"],
    ["Bất đẳng thức và tính chất", 16, "gk1 ck1"], ["Bất phương trình bậc nhất một ẩn", 20, "gk1 ck1"],
    ["Tỉ số lượng giác của góc nhọn", 24, "gk1 ck1"], ["Hệ thức giữa cạnh và góc trong tam giác vuông", 23, "gk1 ck1"],
    ["Căn bậc hai và căn thức bậc hai", 4, "ck1"], ["Khai căn bậc hai với phép nhân và phép chia", 4, "ck1"],
    ["Biến đổi, rút gọn biểu thức chứa căn", 7, "ck1"], ["Căn bậc ba và căn thức bậc ba", 4, "ck1"], ["Mở đầu về đường tròn", 4, "ck1"],
    ["Cung và dây của một đường tròn", 4, "ck1"], ["Độ dài cung tròn, diện tích hình quạt tròn", 8, "ck1"],
    ["Vị trí tương đối của đường thẳng và đường tròn", 7, "ck1"], ["Vị trí tương đối của hai đường tròn", 4, "ck1"],
    ["Hàm số y = ax² (a ≠ 0)", 20, "gk2 ck2"], ["Phương trình bậc hai một ẩn", 20, "gk2 ck2"], ["Định lí Viète và ứng dụng", 19, "gk2 ck2"],
    ["Giải bài toán bằng cách lập phương trình", 11, "gk2 ck2"], ["Góc nội tiếp", 16, "gk2 ck2"],
    ["Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác", 16, "gk2 ck2"], ["Tứ giác nội tiếp", 14, "gk2 ck2"],
    ["Đa giác đều", 12, "gk2 ck2"], ["Bảng tần số và biểu đồ tần số", 8, "ck2"],
    ["Bảng tần số tương đối và biểu đồ tần số tương đối", 12, "ck2"], ["Bảng tần số, tần số tương đối ghép nhóm và biểu đồ", 8, "ck2"],
    ["Phép thử ngẫu nhiên và không gian mẫu", 8, "ck2"], ["Xác suất của biến cố liên quan tới phép thử", 11, "ck2"],
    ["Hình trụ và hình nón", 11, "ck2"], ["Hình cầu", 8, "ck2"]
  ],
  "9-van.js": [
    ["Thế giới kì ảo", 21, "gk1 ck1"], ["Những cung bậc tâm trạng", 21, "gk1 ck1"], ["Hồn nước nằm trong tiếng mẹ cha", 21, "gk1 ck1"],
    ["Điển tích, điển cố", 11, "gk1 ck1"], ["Một số yếu tố Hán Việt dễ nhầm lẫn", 11, "gk1 ck1"], ["Biện pháp tu từ chơi chữ", 11, "gk1 ck1"],
    ["Điệp thanh, điệp vần", 9, "gk1 ck1"], ["Chữ Nôm và chữ quốc ngữ", 5, "gk1 ck1"], ["Khám phá vẻ đẹp văn chương", 9, "ck1"],
    ["Đối diện với nỗi đau", 9, "ck1"], ["Cách dẫn trực tiếp và cách dẫn gián tiếp", 3, "ck1"], ["Tham khảo, trích dẫn tài liệu", 2, "ck1"],
    ["Câu rút gọn", 3, "ck1"], ["Câu đặc biệt", 3, "ck1"], ["Giải mã những bí mật", 30, "gk2 ck2"], ["Hồn thơ muôn điệu", 30, "gk2 ck2"],
    ["Các kiểu câu ghép", 9, "gk2 ck2"], ["Phương tiện nối các vế câu ghép", 3, "gk2"], ["Lựa chọn câu đơn hoặc câu ghép", 9, "gk2 ck2"],
    ["Nghĩa của từ ngữ", 6, "gk2"], ["Sự phát triển của từ vựng", 9, "gk2 ck2"], ["Biện pháp tu từ", 6, "gk2 ck2"],
    ["Tiếng nói của lương tri", 12, "ck2"], ["Đi và suy ngẫm", 12, "ck2"], ["Tên viết tắt các tổ chức quốc tế", 6, "ck2"],
    ["Biến đổi cấu trúc câu", 6, "ck2"], ["Mở rộng cấu trúc câu", 6, "ck2"], ["Đọc hiểu truyện", 8, "vao10"],
    ["Đọc hiểu văn bản nghị luận", 8, "vao10"], ["Đọc hiểu thơ", 9, "vao10"], ["Đọc hiểu văn bản thông tin", 7, "vao10"],
    ["Đọc hiểu kí", 8, "vao10"]
  ],
  "12-congnghe.js": [
    ["Giới thiệu tổng quan về kĩ thuật điện", 6, "ck1 tn"], ["Ngành nghề trong lĩnh vực kĩ thuật điện", 6, "ck1 tn"],
    ["Mạch điện xoay chiều ba pha", 9, "ck1 tn"], ["Hệ thống điện quốc gia", 7, "ck1 tn"], ["Sản xuất điện năng", 6, "ck1 tn"],
    ["Mạng điện sản xuất quy mô nhỏ", 6, "ck1 tn"], ["Mạng điện hạ áp dùng trong sinh hoạt", 6, "ck1 tn"],
    ["Hệ thống điện trong gia đình", 7, "ck1 tn"], ["Thiết bị điện trong hệ thống điện gia đình", 7, "ck1 tn"],
    ["Thiết kế và lắp đặt mạch điện điều khiển trong gia đình", 5, "ck1 tn"], ["An toàn điện", 7, "ck1 tn"],
    ["Tiết kiệm điện năng", 7, "ck1 tn"], ["Khái quát về kĩ thuật điện tử", 11, "gk2 ck2 tn"],
    ["Ngành nghề và dịch vụ trong lĩnh vực kĩ thuật điện tử", 10, "gk2 ck2 tn"], ["Điện trở, tụ điện và cuộn cảm", 21, "gk2 ck2 tn"],
    ["Diode, transistor và mạch tích hợp IC", 19, "gk2 ck2 tn"], ["Giới thiệu về điện tử tương tự", 11, "gk2 ck2 tn"],
    ["Khuếch đại thuật toán", 12, "gk2 ck2 tn"], ["Lớp 10 · Đại cương về công nghệ", 4, "tn"], ["Lớp 10 · Vẽ kĩ thuật", 5, "tn"],
    ["Lớp 11 · Vật liệu cơ khí", 2, "tn"], ["Lớp 11 · Động cơ đốt trong", 4, "tn"], ["Khái quát về vi điều khiển", 11, "ck2 tn"],
    ["Lớp 10 · Thiết kế kĩ thuật", 3, "tn"], ["Lớp 11 · Các phương pháp gia công cơ khí", 1, "tn"],
    ["Bo mạch lập trình vi điều khiển", 9, "ck2 tn"], ["Một số mạch xử lí tín hiệu trong điện tử số", 10, "ck2 tn"],
    ["Tín hiệu số và các cổng logic cơ bản", 12, "ck2 tn"], ["Lớp 11 · Giới thiệu chung về cơ khí chế tạo", 1, "tn"],
    ["Lớp 11 · Ô tô", 1, "tn"], ["Lớp 11 · Sản xuất cơ khí", 2, "tn"], ["Lớp 11 · Giới thiệu chung về cơ khí động lực", 1, "tn"],
    ["Lớp 10 · Giới thiệu chung về trồng trọt", 1, "tn"], ["Lớp 10 · Phân bón", 1, "tn"],
    ["Lớp 10 · Phòng trừ sâu, bệnh hại cây trồng", 1, "tn"], ["Lớp 11 · Giới thiệu chung về chăn nuôi", 1, "tn"],
    ["Lớp 11 · Công nghệ giống vật nuôi", 2, "tn"], ["Lâm nghiệp – Thuỷ sản · Vai trò và triển vọng của lâm nghiệp", 2, "tn"],
    ["Lâm nghiệp – Thuỷ sản · Sinh trưởng, phát triển của cây rừng", 2, "tn"],
    ["Lâm nghiệp – Thuỷ sản · Vai trò và triển vọng của thuỷ sản", 1, "tn"],
    ["Lâm nghiệp – Thuỷ sản · Các nhóm thuỷ sản, phương thức nuôi", 2, "tn"], ["Lâm nghiệp – Thuỷ sản · Vai trò của giống thuỷ sản", 1, "tn"],
    ["Lâm nghiệp – Thuỷ sản · Thức ăn thuỷ sản", 2, "tn"], ["Lâm nghiệp – Thuỷ sản · Bảo quản, chế biến sản phẩm thuỷ sản", 1, "tn"],
    ["Lớp 10 · Trồng trọt công nghệ cao", 1, "tn"], ["Lớp 11 · Phòng, trị bệnh cho vật nuôi", 2, "tn"],
    ["Lớp 11 · Công nghệ chăn nuôi", 1, "tn"], ["Lâm nghiệp – Thuỷ sản · Vai trò, nhiệm vụ của trồng rừng", 2, "tn"],
    ["Lâm nghiệp – Thuỷ sản · Biện pháp bảo vệ, khai thác rừng", 2, "tn"],
    ["Lâm nghiệp – Thuỷ sản · Giới thiệu môi trường nuôi thuỷ sản", 2, "tn"], ["Lâm nghiệp – Thuỷ sản · Sinh sản của cá và tôm", 2, "tn"],
    ["Lâm nghiệp – Thuỷ sản · Nuôi thuỷ sản theo tiêu chuẩn VietGAP", 1, "tn"],
    ["Lâm nghiệp – Thuỷ sản · Hoạt động lâm nghiệp, suy thoái rừng", 2, "tn"],
    ["Lâm nghiệp – Thuỷ sản · Kĩ thuật trồng và chăm sóc rừng", 2, "tn"],
    ["Lâm nghiệp – Thuỷ sản · Bảo quản, chế biến thức ăn thuỷ sản", 1, "tn"],
    ["Lâm nghiệp – Thuỷ sản · Công nghệ nuôi một số loài thuỷ sản", 2, "tn"],
    ["Lâm nghiệp – Thuỷ sản · Thực trạng bảo vệ và khai thác rừng", 2, "tn"],
    ["Lâm nghiệp – Thuỷ sản · Quản lí môi trường nuôi thuỷ sản", 1, "tn"], ["Lâm nghiệp – Thuỷ sản · Một số bệnh thuỷ sản phổ biến", 2, "tn"],
    ["Lâm nghiệp – Thuỷ sản · Bảo vệ nguồn lợi thuỷ sản", 1, "tn"], ["Lớp 10 · Đất trồng", 1, "tn"],
    ["Lớp 10 · Công nghệ giống cây trồng", 1, "tn"], ["Lớp 10 · Kĩ thuật trồng trọt", 1, "tn"],
    ["Lớp 11 · Công nghệ thức ăn chăn nuôi", 1, "tn"], ["Lớp 11 · Bảo vệ môi trường trong chăn nuôi", 1, "tn"],
    ["Lâm nghiệp – Thuỷ sản · Xử lí môi trường nuôi thuỷ sản", 1, "tn"],
    ["Lâm nghiệp – Thuỷ sản · Giống thuỷ sản: công nghệ sinh học", 1, "tn"],
    ["Lâm nghiệp – Thuỷ sản · Thức ăn thuỷ sản: công nghệ sinh học", 1, "tn"],
    ["Lâm nghiệp – Thuỷ sản · Vai trò của phòng, trị bệnh thuỷ sản", 1, "tn"],
    ["Lâm nghiệp – Thuỷ sản · Khai thác nguồn lợi thuỷ sản", 1, "tn"], ["Lớp 10 · Bảo vệ môi trường trong trồng trọt", 1, "tn"],
    ["Lâm nghiệp – Thuỷ sản · Công nghệ cao trong nuôi thuỷ sản", 1, "tn"],
    ["Lâm nghiệp – Thuỷ sản · Bệnh thuỷ sản: công nghệ sinh học", 1, "tn"]
  ],
  "12-diali.js": [
    ["Vị trí địa lí và phạm vi lãnh thổ", 10, "ck1 tn"], ["Thiên nhiên nhiệt đới ẩm gió mùa", 10, "ck1 tn"],
    ["Sự phân hoá đa dạng của thiên nhiên", 10, "ck1 tn"], ["Sử dụng hợp lí tài nguyên thiên nhiên và bảo vệ môi trường", 10, "ck1 tn"],
    ["Dân số Việt Nam", 10, "ck1 tn"], ["Lao động và việc làm", 10, "ck1 tn"], ["Đô thị hoá", 10, "ck1 tn"],
    ["Chuyển dịch cơ cấu kinh tế", 14, "ck1 tn"], ["Vấn đề phát triển ngành nông nghiệp", 14, "ck1 tn"],
    ["Vấn đề phát triển ngành lâm nghiệp và thuỷ sản", 11, "ck1 tn"], ["Tổ chức lãnh thổ nông nghiệp", 12, "ck1 tn"],
    ["Chuyển dịch cơ cấu ngành công nghiệp", 14, "ck1 tn"], ["Một số ngành công nghiệp", 13, "ck1 tn"],
    ["Một số hình thức tổ chức lãnh thổ công nghiệp", 12, "ck1 tn"], ["Vai trò, các nhân tố ảnh hưởng đến các ngành dịch vụ", 16, "gk2 ck2 tn"],
    ["Giao thông vận tải và bưu chính viễn thông", 20, "gk2 ck2 tn"], ["Thương mại và du lịch", 19, "gk2 ck2 tn"],
    ["Khai thác thế mạnh ở Trung du và miền núi phía Bắc", 18, "gk2 ck2 tn"],
    ["Phát triển kinh tế – xã hội ở Đồng bằng sông Hồng", 17, "gk2 ck2 tn"], ["Phát triển kinh tế – xã hội ở Bắc Trung Bộ", 18, "gk2 ck2 tn"],
    ["Phát triển kinh tế – xã hội ở Nam Trung Bộ", 18, "ck2 tn"],
    ["Phát triển kinh tế và đảm bảo quốc phòng, an ninh ở Biển Đông", 15, "ck2 tn"],
    ["Lớp 11 · Một số vấn đề về kinh tế – xã hội thế giới", 3, "tn"], ["Lớp 11 · Khu vực Đông Nam Á", 3, "tn"],
    ["Lớp 10 · Địa lí dân cư", 2, "tn"], ["Phát triển kinh tế – xã hội ở Đông Nam Bộ", 18, "ck2 tn"],
    ["Sử dụng hợp lí tự nhiên ở Đồng bằng sông Cửu Long", 17, "ck2 tn"], ["Lớp 11 · Liên minh châu Âu (EU)", 2, "tn"],
    ["Lớp 11 · Khu vực Mỹ La tinh", 3, "tn"], ["Lớp 10 · Khí quyển", 2, "tn"], ["Lớp 11 · Khu vực Tây Nam Á", 2, "tn"],
    ["Lớp 10 · Địa lí ngành dịch vụ", 2, "tn"], ["Lớp 11 · Hợp chúng quốc Hoa Kỳ (Hoa Kỳ)", 2, "tn"], ["Lớp 11 · Nhật Bản", 2, "tn"],
    ["Lớp 10 · Thuỷ quyển", 1, "tn"], ["Lớp 11 · Cộng hoà nhân dân Trung Hoa (Trung Quốc)", 2, "tn"], ["Lớp 11 · Liên bang Nga", 2, "tn"],
    ["Lớp 11 · Ô-xtrây-li-a", 1, "tn"], ["Lớp 10 · Địa lí ngành công nghiệp", 1, "tn"], ["Lớp 11 · Cộng hoà Nam Phi", 2, "tn"]
  ],
  "12-hoahoc.js": [
    ["Ester – Lipid", 24, "ck1 tn"], ["Xà phòng và chất giặt rửa", 8, "ck1 tn"],
    ["Giới thiệu về carbohydrate. Glucose và fructose", 14, "ck1 tn"], ["Saccharose và maltose", 5, "ck1 tn"],
    ["Tinh bột và cellulose", 13, "ck1 tn"], ["Amine", 17, "ck1 tn"], ["Amino acid và peptide", 17, "ck1 tn"],
    ["Protein và enzyme", 8, "ck1 tn"], ["Đại cương về polymer", 18, "ck1 tn"], ["Vật liệu polymer", 14, "ck1 tn"],
    ["Thế điện cực và nguồn điện hoá học", 20, "ck1 tn"], ["Điện phân", 16, "gk2 tn"],
    ["Cấu tạo và liên kết trong tinh thể kim loại", 8, "gk2 ck2 tn"], ["Tính chất vật lí và tính chất hoá học của kim loại", 29, "gk2 ck2 tn"],
    ["Kim loại trong tự nhiên và phương pháp tách kim loại", 17, "gk2 ck2 tn"], ["Hợp kim", 11, "gk2 ck2 tn"],
    ["Sự ăn mòn kim loại", 10, "gk2 ck2 tn"], ["Nguyên tố nhóm IA", 19, "gk2 ck2 tn"], ["Nguyên tố nhóm IIA", 26, "ck2 tn"],
    ["Đại cương về kim loại chuyển tiếp dãy thứ nhất", 20, "ck2 tn"], ["Sơ lược về phức chất", 10, "ck2 tn"],
    ["Một số tính chất và ứng dụng của phức chất", 12, "ck2 tn"], ["Lớp 10 · Tốc độ phản ứng", 3, "tn"],
    ["Lớp 11 · Nitrogen – Sulfur", 4, "tn"], ["Lớp 11 · Dẫn xuất halogen – Alcohol – Phenol", 2, "tn"],
    ["Lớp 10 · Năng lượng hoá học", 3, "tn"], ["Lớp 10 · Phản ứng oxi hoá – khử", 2, "tn"], ["Lớp 11 · Cân bằng hoá học", 3, "tn"],
    ["Lớp 11 · Hydrocarbon", 3, "tn"], ["Lớp 10 · Cấu tạo nguyên tử", 3, "tn"], ["Lớp 10 · Liên kết hoá học", 3, "tn"],
    ["Lớp 11 · Hợp chất carbonyl – Carboxylic acid", 2, "tn"], ["Lớp 10 · Nguyên tố nhóm halogen", 2, "tn"],
    ["Lớp 11 · Đại cương về hoá học hữu cơ", 2, "tn"]
  ],
  "12-ktpl.js": [
    ["Tăng trưởng và phát triển kinh tế", 11, "ck1 tn"], ["Hội nhập kinh tế quốc tế", 11, "ck1 tn"], ["Bảo hiểm", 11, "ck1 tn"],
    ["An sinh xã hội", 13, "ck1 tn"], ["Lập kế hoạch kinh doanh", 13, "ck1 tn"], ["Trách nhiệm xã hội của doanh nghiệp", 13, "ck1 tn"],
    ["Quản lí thu, chi trong gia đình", 12, "ck1 tn"], ["Quyền và nghĩa vụ của công dân về kinh doanh và nộp thuế", 19, "gk2 tn"],
    ["Quyền và nghĩa vụ về sở hữu tài sản, tôn trọng tài sản người khác", 17, "gk2 tn"],
    ["Quyền và nghĩa vụ của công dân trong hôn nhân và gia đình", 25, "gk2 ck2 tn"],
    ["Quyền và nghĩa vụ của công dân trong học tập", 20, "gk2 ck2 tn"], ["Lớp 10 · Nền kinh tế và các chủ thể của nền kinh tế", 2, "tn"],
    ["Lớp 10 · Sản xuất kinh doanh và các mô hình sản xuất kinh doanh", 2, "tn"],
    ["Lớp 10 · Pháp luật nước Cộng hoà xã hội chủ nghĩa Việt Nam", 3, "tn"],
    ["Lớp 10 · Hiến pháp nước Cộng hoà xã hội chủ nghĩa Việt Nam", 3, "tn"],
    ["Lớp 11 · Cạnh tranh, cung – cầu trong nền kinh tế thị trường", 3, "tn"], ["Lớp 11 · Lạm phát, thất nghiệp", 4, "tn"],
    ["Lớp 11 · Ý tưởng, cơ hội kinh doanh và năng lực người kinh doanh", 3, "tn"],
    ["Lớp 11 · Quyền bình đẳng của công dân trước pháp luật", 5, "tn"], ["Lớp 11 · Một số quyền dân chủ cơ bản của công dân", 8, "tn"],
    ["Lớp 11 · Một số quyền tự do cơ bản của công dân", 8, "tn"],
    ["Quyền và nghĩa vụ về chăm sóc sức khoẻ, bảo đảm an sinh xã hội", 13, "ck2 tn"],
    ["Quyền và nghĩa vụ về di sản văn hoá, môi trường, tài nguyên", 12, "ck2 tn"],
    ["Công pháp quốc tế về dân cư, lãnh thổ và chủ quyền quốc gia", 13, "ck2 tn"],
    ["Nguyên tắc cơ bản của WTO và hợp đồng thương mại quốc tế", 11, "ck2 tn"], ["Một số vấn đề chung về pháp luật quốc tế", 13, "ck2 tn"],
    ["Lớp 10 · Thị trường và cơ chế thị trường", 2, "tn"], ["Lớp 10 · Tín dụng và cách sử dụng các dịch vụ tín dụng", 2, "tn"],
    ["Lớp 10 · Hệ thống chính trị Việt Nam", 2, "tn"], ["Lớp 11 · Thị trường lao động và việc làm", 3, "tn"],
    ["Lớp 11 · Văn hoá tiêu dùng", 3, "tn"], ["Lớp 10 · Ngân sách nhà nước và thuế", 2, "tn"],
    ["Lớp 10 · Lập kế hoạch tài chính cá nhân", 2, "tn"], ["Lớp 11 · Đạo đức kinh doanh", 3, "tn"]
  ],
  "12-lichsu.js": [
    ["Liên hợp quốc", 13, "ck1 tn"], ["Trật tự thế giới trong Chiến tranh lạnh", 13, "ck1 tn"],
    ["Trật tự thế giới sau Chiến tranh lạnh", 9, "ck1 tn"], ["Sự ra đời và phát triển của Hiệp hội các quốc gia Đông Nam Á", 12, "ck1 tn"],
    ["Cộng đồng ASEAN: Từ ý tưởng đến hiện thực", 20, "ck1 tn"], ["Cách mạng tháng Tám năm 1945", 20, "ck1 tn"],
    ["Cuộc kháng chiến chống thực dân Pháp (1945 – 1954)", 20, "ck1 tn"], ["Cuộc kháng chiến chống Mỹ, cứu nước (1954 – 1975)", 20, "ck1 tn"],
    ["Khái quát về công cuộc Đổi mới từ năm 1986 đến nay", 24, "gk2 ck2 tn"],
    ["Thành tựu cơ bản và bài học của công cuộc Đổi mới", 37, "gk2 ck2 tn"],
    ["Hoạt động đối ngoại trong đấu tranh giành độc lập dân tộc", 19, "gk2 ck2 tn"],
    ["Hoạt động đối ngoại trong kháng chiến chống Pháp và chống Mỹ", 21, "gk2 ck2 tn"],
    ["Lớp 11 · Cách mạng tư sản và sự phát triển của chủ nghĩa tư bản", 8, "tn"],
    ["Lớp 11 · Quá trình giành độc lập dân tộc ở Đông Nam Á", 8, "tn"], ["Lớp 11 · Lịch sử bảo vệ chủ quyền ở Biển Đông", 8, "tn"],
    ["Cuộc đấu tranh bảo vệ Tổ quốc từ sau tháng 4 – 1975 đến nay", 9, "tn"],
    ["Hoạt động đối ngoại của Việt Nam từ năm 1975 đến nay", 22, "ck2 tn"], ["Khái quát cuộc đời và sự nghiệp của Hồ Chí Minh", 18, "ck2 tn"],
    ["Hồ Chí Minh – Anh hùng giải phóng dân tộc", 29, "ck2 tn"], ["Dấu ấn Hồ Chí Minh trong lòng nhân dân thế giới và Việt Nam", 14, "ck2 tn"],
    ["Lớp 11 · Chủ nghĩa xã hội từ năm 1917 đến nay", 8, "tn"], ["Lớp 11 · Chiến tranh bảo vệ Tổ quốc và giải phóng dân tộc", 8, "tn"],
    ["Lớp 11 · Một số cuộc cải cách lớn trong lịch sử Việt Nam", 8, "tn"]
  ],
  "12-sinhhoc.js": [
    ["DNA và cơ chế tái bản DNA", 12, "ck1 tn"], ["Gene, hệ gene và quá trình truyền đạt thông tin di truyền", 15, "ck1 tn"],
    ["Điều hoà biểu hiện gene", 5, "ck1 tn"], ["Đột biến gene", 9, "ck1 tn"], ["Công nghệ gene", 7, "ck1 tn"],
    ["Cấu trúc và chức năng của nhiễm sắc thể", 9, "ck1 tn"], ["Học thuyết di truyền Mendel", 19, "ck1 tn"],
    ["Mở rộng học thuyết Mendel", 10, "ck1 tn"], ["Di truyền giới tính và di truyền liên kết với giới tính", 12, "ck1 tn"],
    ["Liên kết gene và hoán vị gene", 13, "ck1 tn"], ["Đột biến nhiễm sắc thể", 16, "ck1 tn"],
    ["Di truyền học người và di truyền y học", 16, "ck1 tn"], ["Di truyền gene ngoài nhân", 6, "ck1 tn"],
    ["Tương tác giữa kiểu gene với môi trường, thành tựu chọn giống", 7, "ck1 tn"], ["Di truyền học quần thể", 17, "ck1 tn"],
    ["Các bằng chứng tiến hoá", 8, "gk2 tn"], ["Quan niệm của Darwin về chọn lọc tự nhiên và hình thành loài", 10, "gk2 tn"],
    ["Học thuyết tiến hoá tổng hợp hiện đại", 16, "gk2 tn"], ["Tiến hoá lớn và quá trình phát sinh chủng loại", 14, "gk2 tn"],
    ["Môi trường và các nhân tố sinh thái", 19, "gk2 ck2 tn"], ["Sinh thái học quần thể", 26, "gk2 ck2 tn"], ["Quần xã sinh vật", 16, "ck2 tn"],
    ["Sinh thái học phục hồi và bảo tồn đa dạng sinh vật", 9, "ck2 tn"], ["Lớp 11 · Cảm ứng ở sinh vật", 6, "tn"],
    ["Lớp 11 · Sinh sản ở sinh vật", 5, "tn"], ["Lớp 11 · Trao đổi chất và chuyển hoá năng lượng ở sinh vật", 8, "tn"],
    ["Trao đổi vật chất và chuyển hoá năng lượng trong hệ sinh thái", 17, "ck2 tn"],
    ["Sinh quyển, khu sinh học và chu trình sinh – địa – hoá", 10, "ck2 tn"], ["Phát triển bền vững", 10, "ck2 tn"],
    ["Lớp 11 · Sinh trưởng và phát triển ở sinh vật", 5, "tn"], ["Hệ sinh thái", 7, "ck2 tn"], ["Diễn thế sinh thái", 9, "ck2 tn"]
  ],
  "12-ta.js": [
    ["Pronunciation", 18, "ck1 gk2 ck2"], ["Unit 1 · Life Stories We Admire", 9, "ck1"], ["Unit 2 · A Multicultural World", 9, "ck1"],
    ["Unit 3 · Green Living", 9, "ck1"], ["Unit 4 · Urbanisation", 12, "ck1"], ["Unit 5 · The World of Work", 12, "ck1"],
    ["Cloze", 147, "ck1 gk2 ck2 tn"], ["Reading", 207, "ck1 gk2 ck2 tn"], ["Unit 6 · Artificial Intelligence", 33, "gk2 ck2"],
    ["Unit 7 · The World of Mass Media", 30, "gk2 ck2"], ["Review of Units 1–5", 6, "gk2"], ["Unit 8 · Wildlife Conservation", 12, "ck2"],
    ["Unit 9 · Career Paths", 12, "ck2"], ["Unit 10 · Lifelong Learning", 9, "ck2"], ["Arrangement", 50, "tn"], ["Text completion", 50, "tn"]
  ],
  "12-tin.js": [
    ["Làm quen với Trí tuệ nhân tạo", 9, "ck1 tn"], ["Trí tuệ nhân tạo trong khoa học và đời sống", 11, "ck1 tn"],
    ["Một số thiết bị mạng thông dụng", 6, "ck1 tn"], ["Giao thức mạng", 10, "ck1 tn"], ["Thực hành chia sẻ tài nguyên trên mạng", 8, "ck1 tn"],
    ["Giao tiếp và ứng xử trong không gian mạng", 12, "ck1 tn"], ["HTML và cấu trúc trang web", 9, "ck1 tn"],
    ["Định dạng văn bản", 11, "ck1 tn"], ["Tạo danh sách, bảng", 10, "ck1 tn"], ["Tạo liên kết", 8, "ck1 tn"],
    ["Chèn tệp tin đa phương tiện và khung nội tuyến vào trang web", 8, "ck1 tn"], ["Tạo biểu mẫu", 9, "ck1 tn"],
    ["Khái niệm, vai trò của CSS", 11, "gk2 ck2 tn"], ["Định dạng văn bản bằng CSS", 15, "gk2 ck2 tn"],
    ["Tạo màu cho chữ và nền", 16, "gk2 ck2 tn"], ["Định dạng khung", 16, "gk2 ck2 tn"], ["Các mức ưu tiên của bộ chọn", 26, "gk2 ck2"],
    ["Dịch vụ sửa chữa và bảo trì máy tính", 12, "gk2 ck2 tn"], ["Nhóm nghề quản trị trong ngành Công nghệ thông tin", 12, "gk2 ck2"],
    ["Lớp 10 · Máy tính và xã hội tri thức", 10, "tn"], ["Lớp 10 · Mạng máy tính và Internet", 5, "tn"],
    ["Lớp 10 · Đạo đức, pháp luật và văn hoá trong môi trường số", 2, "tn"],
    ["Lớp 10 · Giải quyết vấn đề với sự trợ giúp của máy tính", 15, "tn"], ["Lớp 11 · Máy tính và xã hội tri thức", 5, "tn"],
    ["Lớp 11 · Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", 2, "tn"], ["Lớp 11 · Giới thiệu các hệ cơ sở dữ liệu", 10, "tn"],
    ["Tin học ứng dụng · Lớp 11 · Phần mềm chỉnh sửa ảnh và làm video", 1, "tn"],
    ["Tin học ứng dụng · Xây dựng phần thân và chân trang web", 1, "tn"], ["Lớp 10 · Ứng dụng tin học", 2, "tn"],
    ["Lớp 11 · Đạo đức, pháp luật và văn hoá trong môi trường số", 2, "tn"], ["Khoa học máy tính · Lớp 11 · Kĩ thuật lập trình", 3, "tn"],
    ["Khoa học máy tính · Làm quen với Học máy", 1, "tn"], ["Lớp 10 · Hướng nghiệp với tin học", 1, "tn"],
    ["Lớp 11 · Hướng nghiệp với tin học", 1, "tn"], ["Tin học ứng dụng · Liên kết và thanh điều hướng", 1, "tn"],
    ["Tin học ứng dụng · Biểu mẫu trên trang web", 1, "tn"], ["Khoa học máy tính · Đường truyền mạng và ứng dụng", 1, "tn"],
    ["Khoa học máy tính · Làm quen với Khoa học dữ liệu", 1, "tn"]
  ],
  "12-toan.js": [
    ["Tính đơn điệu và cực trị của hàm số", 23, "ck1 tn"], ["Giá trị lớn nhất và giá trị nhỏ nhất của hàm số", 14, "ck1 tn"],
    ["Đường tiệm cận của đồ thị hàm số", 11, "ck1 tn"], ["Khảo sát sự biến thiên và vẽ đồ thị của hàm số", 12, "ck1 tn"],
    ["Ứng dụng đạo hàm để giải quyết vấn đề thực tiễn", 17, "ck1 tn"], ["Vectơ trong không gian", 10, "ck1 tn"],
    ["Hệ trục toạ độ trong không gian", 9, "ck1 tn"], ["Biểu thức toạ độ của các phép toán vectơ", 9, "ck1 tn"],
    ["Khoảng biến thiên và khoảng tứ phân vị", 11, "ck1 tn"], ["Phương sai và độ lệch chuẩn", 13, "ck1 tn"], ["Nguyên hàm", 28, "gk2 ck2 tn"],
    ["Tích phân", 32, "gk2 ck2 tn"], ["Ứng dụng hình học của tích phân", 32, "gk2 ck2 tn"], ["Phương trình mặt phẳng", 29, "gk2 ck2 tn"],
    ["Phương trình đường thẳng trong không gian", 23, "gk2 ck2 tn"], ["Công thức tính góc trong không gian", 14, "ck2 tn"],
    ["Phương trình mặt cầu", 21, "ck2 tn"], ["Xác suất có điều kiện", 21, "ck2 tn"],
    ["Công thức xác suất toàn phần và công thức Bayes", 20, "ck2 tn"], ["Lớp 11 · Hàm số mũ và hàm số lôgarit", 16, "tn"],
    ["Lớp 11 · Hàm số lượng giác và phương trình lượng giác", 12, "tn"], ["Lớp 11 · Dãy số. Cấp số cộng và cấp số nhân", 12, "tn"],
    ["Lớp 11 · Quan hệ vuông góc trong không gian", 20, "tn"], ["Lớp 11 · Đạo hàm", 10, "tn"], ["Lớp 10 · Đại số tổ hợp", 2, "tn"],
    ["Lớp 11 · Các quy tắc tính xác suất", 7, "tn"], ["Lớp 10 · Phương pháp toạ độ trong mặt phẳng", 3, "tn"],
    ["Lớp 10 · Tính xác suất theo định nghĩa cổ điển", 1, "tn"], ["Lớp 10 · Hệ thức lượng trong tam giác", 1, "tn"],
    ["Lớp 10 · Bất phương trình và hệ bất phương trình bậc nhất hai ẩn", 1, "tn"], ["Lớp 10 · Hàm số, đồ thị và ứng dụng", 1, "tn"],
    ["Lớp 10 · Các số đặc trưng của mẫu số liệu không ghép nhóm", 1, "tn"], ["Lớp 11 · Giới hạn. Hàm số liên tục", 2, "tn"],
    ["Lớp 11 · Quan hệ song song trong không gian", 1, "tn"]
  ],
  "12-van.js": [
    ["Khả năng lớn lao của tiểu thuyết", 6, "ck1"], ["Những thế giới thơ", 6, "ck1"], ["Lập luận trong văn bản nghị luận", 6, "ck1"],
    ["Yếu tố kì ảo trong truyện kể", 6, "ck1"], ["Tiếng cười của hài kịch", 6, "ck1"], ["Nói mỉa", 2, "ck1"], ["Nghịch ngữ", 2, "ck1"],
    ["Biện pháp tu từ trong thơ", 2, "ck1"], ["Lỗi logic", 4, "ck1"], ["Lỗi câu mơ hồ", 4, "ck1"], ["Điển cố", 4, "ck1"],
    ["Hồ Chí Minh – “Văn hoá phải soi đường cho quốc dân đi”", 18, "gk2 ck2"], ["Sự thật trong tác phẩm kí", 18, "gk2 ck2"],
    ["Biện pháp làm tăng tính khẳng định", 10, "gk2 ck2"], ["Biện pháp làm tăng tính phủ định", 8, "gk2 ck2"],
    ["Ngôn ngữ trang trọng và ngôn ngữ thân mật", 12, "gk2 ck2"], ["Dữ liệu trong văn bản thông tin", 8, "ck2"],
    ["Văn học và cuộc đời", 8, "ck2"], ["Tôn trọng và bảo vệ quyền sở hữu trí tuệ", 6, "ck2"], ["Giữ gìn và phát triển tiếng Việt", 8, "ck2"],
    ["Đọc hiểu truyện", 5, "tn"], ["Đọc hiểu văn bản nghị luận", 5, "tn"], ["Đọc hiểu thơ", 5, "tn"], ["Đọc hiểu văn bản thông tin", 5, "tn"],
    ["Đọc hiểu kí", 4, "tn"]
  ],
  "12-vatli.js": [
    ["Cấu trúc của chất. Sự chuyển thể", 10, "ck1 tn"], ["Nội năng. Định luật I của nhiệt động lực học", 13, "ck1 tn"],
    ["Nhiệt độ. Thang nhiệt độ – nhiệt kế", 10, "ck1 tn"], ["Nhiệt dung riêng", 13, "ck1 tn"], ["Nhiệt nóng chảy riêng", 8, "ck1 tn"],
    ["Mô hình động học phân tử chất khí", 12, "ck1 tn"], ["Định luật Boyle", 16, "ck1 tn"], ["Định luật Charles", 17, "ck1 tn"],
    ["Phương trình trạng thái của khí lí tưởng", 15, "ck1 tn"], ["Áp suất khí. Động năng phân tử và nhiệt độ", 15, "ck1 tn"],
    ["Nhiệt hoá hơi riêng", 7, "ck1 tn"], ["Từ trường", 19, "gk2 ck2 tn"],
    ["Lực từ tác dụng lên dây dẫn mang dòng điện. Cảm ứng từ", 27, "gk2 ck2 tn"], ["Từ thông. Hiện tượng cảm ứng điện từ", 32, "gk2 ck2 tn"],
    ["Máy phát điện xoay chiều", 29, "gk2 ck2 tn"], ["Ứng dụng hiện tượng cảm ứng điện từ", 16, "gk2 ck2 tn"],
    ["Điện từ trường. Mô hình sóng điện từ", 21, "gk2 ck2 tn"], ["Cấu trúc hạt nhân", 16, "ck2 tn"],
    ["Phản ứng hạt nhân và năng lượng liên kết", 26, "ck2 tn"], ["Hiện tượng phóng xạ", 29, "ck2 tn"], ["Công nghiệp hạt nhân", 17, "ck2 tn"]
  ]
};
