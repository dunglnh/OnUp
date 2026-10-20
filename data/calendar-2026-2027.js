/* Lịch thi mặc định năm học 2026–2027 cho khối 4 và khối 6.
   Đây là dữ liệu gốc. Khi quản trị viên sửa lịch trong app, bản sửa được lưu trong kho dữ liệu
   (store.js) và nút "Khôi phục lịch mặc định" sẽ chép lại từ file này.

   Nguồn mốc chung:
   - Khung kế hoạch thời gian năm học từ 2026–2027 (Bộ GD&ĐT): khai giảng 5/9, học kì I 18 tuần,
     kết thúc học kì I trước 18/1, kết thúc năm học trước 31/5.
   - Lịch IOE 2026–2027 đã công bố: cấp trường 26–28/11/2026, cấp xã/phường 7–9/1/2027,
     cấp tỉnh/thành phố 4–6/3/2027, cấp quốc gia dự kiến 1–2/4/2027.
   Ngày kiểm tra định kì của từng trường khác nhau, nên các mục đó đều đánh dấu tentative: true.

   Trường của một kì thi:
   id         mã duy nhất, không đổi sau khi tạo (kết quả và bài ôn gắn vào mã này)
   title      tên hiển thị
   kind       "dinh-ki" (kiểm tra định kì) | "ioe" | "thi-khac" | "moc" (mốc năm học, không thi)
   grades     các khối áp dụng, ví dụ [4] hoặc [4, 6]
   start,end  ngày dạng "YYYY-MM-DD"; null nếu chưa có lịch
   tentative  true = ngày dự kiến, chờ trường thông báo
   subjects   các môn thi
   scope      phạm vi kiến thức (ngắn gọn)
   modules    mã bài ôn trong data/modules.js
   banks      mã ngân hàng câu hỏi (danh mục data/banks/index.js, kể cả đề ngẫu nhiên có pool, hoặc do quản trị viên nhập)
*/
window.ONTAP_SEED_EVENTS = [
  { id: "khai-giang", title: "Khai giảng năm học 2026–2027", kind: "moc", grades: [4, 6],
    start: "2026-09-05", end: "2026-09-05", tentative: false, subjects: [], scope: "", modules: [], banks: [] },

  /* ---------------- Học kì I ---------------- */
  { id: "gk1-l4", title: "Kiểm tra giữa học kì I", kind: "dinh-ki", grades: [4],
    start: "2026-11-02", end: "2026-11-13", tentative: true,
    subjects: ["Toán", "Tiếng Việt"],
    scope: "Toán: Bài 1–19. Tiếng Việt: tuần 1–8. Sách Kết nối tri thức với cuộc sống.",
    note: "Theo Thông tư 27, lớp 4 kiểm tra giữa kì môn Toán và Tiếng Việt.",
    modules: ["l4-giua-ki-1"], banks: [] },
  { id: "gk1-l6", title: "Kiểm tra giữa học kì I", kind: "dinh-ki", grades: [6],
    start: "2026-11-02", end: "2026-11-13", tentative: true,
    subjects: ["Toán", "Ngữ văn", "Tiếng Anh", "KHTN", "Lịch sử và Địa lí", "GDCD", "Tin học", "Công nghệ"],
    scope: "Ngữ văn: Bài 1–3. Toán: Chương I–III. KHTN: theo cách dạy của trường. Tiếng Anh: Unit 1–3. Lịch sử và Địa lí: Bài 1–6 mỗi phân môn. GDCD: Bài 1–4. Tin học: Bài 1–5. Công nghệ: Bài 1–3.",
    modules: ["l6-giua-ki-1", "ioe-6"], banks: ["ta6-gk1-de1", "lsdl6-gk1-de1", "gdcd6-gk1-de1", "tin6-gk1-de1", "congnghe6-gk1-de1"] },
  { id: "ioe-truong", title: "IOE cấp trường", kind: "ioe", grades: [4, 6],
    start: "2026-11-26", end: "2026-11-28", tentative: false,
    subjects: ["Tiếng Anh"], scope: "Lớp 4: Unit 1–6. Lớp 6: Unit 1–6.",
    modules: ["ioe-4", "ioe-6"], banks: [] },
  { id: "ck1-l6", title: "Kiểm tra cuối học kì I", kind: "dinh-ki", grades: [6],
    start: "2026-12-21", end: "2027-01-08", tentative: true,
    subjects: ["Toán", "Ngữ văn", "Tiếng Anh", "KHTN", "Lịch sử và Địa lí", "GDCD", "Tin học", "Công nghệ"],
    scope: "Toàn bộ chương trình học kì I.", modules: ["ioe-6"],
    banks: ["toan6-ck1-de1", "toan6-ck1-de2", "van6-ck1-de1", "van6-ck1-de2", "khtn6-ck1-de1", "lsdl6-ck1-de1",
      "ta6-ck1-de1", "gdcd6-ck1-de1", "tin6-ck1-de1", "congnghe6-ck1-de1", "toan6-ck1-ngau-nhien", "van6-ck1-ngau-nhien"] },
  { id: "ck1-l4", title: "Kiểm tra cuối học kì I", kind: "dinh-ki", grades: [4],
    start: "2026-12-28", end: "2027-01-08", tentative: true,
    subjects: ["Toán", "Tiếng Việt", "Tiếng Anh", "Lịch sử và Địa lí", "Khoa học", "Tin học và Công nghệ"],
    scope: "Toàn bộ chương trình học kì I. Tiếng Anh: Unit 1–10.", modules: ["ioe-4"],
    banks: ["toan4-ck1-de1", "toan4-ck1-de2", "toan4-ck1-de3", "tv4-ck1-de1", "tv4-ck1-de2", "khoahoc4-ck1-de1", "lsdl4-ck1-de1", "tincn4-ck1-de1",
      "tincn4-ck1-de2", "ta4-ck1-de1", "ta4-ck1-de2", "khoahoc4-ck1-de2", "lsdl4-ck1-de2", "toan4-ck1-ngau-nhien", "tv4-ck1-ngau-nhien",
      "ta4-ck1-ngau-nhien", "tincn4-ck1-ngau-nhien", "khoahoc4-ck1-ngau-nhien", "lsdl4-ck1-ngau-nhien"] },
  { id: "ioe-xa", title: "IOE cấp xã/phường", kind: "ioe", grades: [4, 6],
    start: "2027-01-07", end: "2027-01-09", tentative: false,
    subjects: ["Tiếng Anh"], scope: "Lớp 4: Unit 1–10. Lớp 6: Unit 1–6.",
    modules: ["ioe-4", "ioe-6"], banks: [] },
  { id: "het-hk1", title: "Kết thúc học kì I (trước ngày này)", kind: "moc", grades: [4, 6],
    start: "2027-01-17", end: "2027-01-17", tentative: false, subjects: [], scope: "", modules: [], banks: [] },

  /* ---------------- Học kì II ---------------- */
  { id: "tet-2027", title: "Tết Nguyên đán Đinh Mùi (mùng 1)", kind: "moc", grades: [4, 6],
    start: "2027-02-06", end: "2027-02-06", tentative: false, subjects: [],
    scope: "", note: "Lịch nghỉ Tết theo quyết định của từng tỉnh, thành phố.", modules: [], banks: [] },
  { id: "ioe-tinh", title: "IOE cấp tỉnh/thành phố", kind: "ioe", grades: [4, 6],
    start: "2027-03-04", end: "2027-03-06", tentative: false,
    subjects: ["Tiếng Anh"], scope: "Lớp 4: Unit 1–10. Lớp 6: Unit 1–9.", modules: ["ioe-4", "ioe-6"], banks: [] },
  { id: "gk2-l4", title: "Kiểm tra giữa học kì II", kind: "dinh-ki", grades: [4],
    start: "2027-03-15", end: "2027-03-26", tentative: true,
    subjects: ["Toán", "Tiếng Việt"],
    scope: "Toán: Bài 38–59. Tiếng Việt: tập 2, Bài 1–16. Sách Kết nối tri thức với cuộc sống.",
    modules: [], banks: ["toan4-gk2-de1", "toan4-gk2-de2", "tv4-gk2-de1", "tv4-gk2-de2", "toan4-gk2-ngau-nhien", "tv4-gk2-ngau-nhien"] },
  { id: "gk2-l6", title: "Kiểm tra giữa học kì II", kind: "dinh-ki", grades: [6],
    start: "2027-03-15", end: "2027-03-26", tentative: true,
    subjects: ["Toán", "Ngữ văn", "Tiếng Anh", "KHTN", "Lịch sử và Địa lí", "GDCD", "Tin học", "Công nghệ"],
    scope: "Nửa đầu học kì II.", modules: [], banks: [] },
  { id: "ioe-qg", title: "IOE cấp quốc gia", kind: "ioe", grades: [4, 6],
    start: "2027-04-01", end: "2027-04-02", tentative: true,
    subjects: ["Tiếng Anh"], scope: "Chỉ học sinh đạt giải cấp tỉnh; ban tổ chức sẽ công bố khối dự thi.",
    modules: [], banks: [] },
  { id: "ck2-l6", title: "Kiểm tra cuối năm học", kind: "dinh-ki", grades: [6],
    start: "2027-04-26", end: "2027-05-14", tentative: true,
    subjects: ["Toán", "Ngữ văn", "Tiếng Anh", "KHTN", "Lịch sử và Địa lí", "GDCD", "Tin học", "Công nghệ"],
    scope: "Toàn bộ chương trình lớp 6.", modules: [], banks: [] },
  { id: "ck2-l4", title: "Kiểm tra cuối năm học", kind: "dinh-ki", grades: [4],
    start: "2027-05-03", end: "2027-05-14", tentative: true,
    subjects: ["Toán", "Tiếng Việt", "Tiếng Anh", "Lịch sử và Địa lí", "Khoa học", "Tin học và Công nghệ"],
    scope: "Toàn bộ chương trình lớp 4.", modules: [], banks: [] },
  { id: "het-nam", title: "Kết thúc năm học (trước ngày này)", kind: "moc", grades: [4, 6],
    start: "2027-05-31", end: "2027-05-31", tentative: false, subjects: [], scope: "", modules: [], banks: [] }
  /* Violympic Toán, Trạng Nguyên Tiếng Việt: tạm bỏ ở bản 1.0 (xem docs/TINH-NANG.md mục 6). */
];
