/* Danh mục đề có sẵn (ngân hàng câu hỏi chạy bằng js/quiz.js). Quản trị viên, phụ huynh nhập thêm ngân hàng ngay trong app
   (Quản trị → Ngân hàng đề); ngân hàng nhập vào lưu trong kho dữ liệu, không sửa các file này.

   App nạp danh mục này lúc mở: trang chủ, lịch thi, nhóm bài ôn chỉ cần tên, khối, môn, số câu. Câu hỏi nằm ở
   data/banks/<khối>-<mã môn>.js, chỉ tải khi mở một đề của file đó (Store.loadBank trong js/store.js).
   Mỗi đề: id (đã có thì không đổi: kết quả cũ, lịch thi, seedBanksSeen dùng mã này), title, grade, subject,
   minutes (số phút khi làm như thi), n (số câu, bằng số câu trong file), file.
   Mã môn: toan, tv (Tiếng Việt), van (Ngữ văn), ta (Tiếng Anh), khoahoc, lsdl (Lịch sử và Địa lí), khtn, gdcd, tin,
   congnghe, tincn (Tin học và Công nghệ). Môn mới thì đặt mã mới, viết thường không dấu.

   File câu hỏi ghi vào window.ONTAP_SEED_QUESTIONS: "<mã đề>": { note, questions }. Dạng câu hỏi:
   { type: "mc",   q: "...", o: ["đáp án đúng", "sai", "sai", "sai"], x: "giải thích" }   // đáp án đúng luôn đứng đầu, app tự xáo
   { type: "fill", q: "... ___ ...", ans: ["đáp án", "cách viết khác"], x: "..." }
   { type: "tf",   q: "Mệnh đề", a: true, x: "..." }
   topic: tên chủ đề để thống kê câu sai theo chủ đề.
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
  { id: "tincn4-ck1-de1", title: "Tin học và Công nghệ 4 · Cuối kì I", grade: 4, subject: "Tin học và Công nghệ", minutes: 35, n: 25, file: "4-tincn.js" },

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
  { id: "congnghe6-gk1-de1", title: "Công nghệ 6 · Giữa kì I · Đề 1", grade: 6, subject: "Công nghệ", minutes: 35, n: 25, file: "6-congnghe.js" }
];
