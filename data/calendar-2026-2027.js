/* Lịch thi mặc định năm học 2026–2027 cho khối 4–12 (mốc năm học cho mọi khối 1–12).
   Đây là dữ liệu gốc. Khi quản trị viên sửa lịch trong app, bản sửa được lưu trong kho dữ liệu
   (store.js) và nút "Khôi phục lịch mặc định" sẽ chép lại từ file này. Máy đã có dữ liệu nhận kì thi mới và khối mới
   của kì dùng chung qua seedEventsSeen (xem "Lịch mặc định đến máy đã có dữ liệu" trong js/store.js và CLAUDE.md).

   Nguồn mốc chung (tra ngày 21–22/10/2026):
   - Khung kế hoạch thời gian năm học từ 2026–2027 (Quyết định 2308/QĐ-BGDĐT ngày 6/8/2026): khai giảng 5/9, học kì I 18 tuần,
     kết thúc học kì I trước 18/1/2027, kết thúc năm học trước 31/5/2027, thi tốt nghiệp THPT dự kiến 11–12/6/2027.
   - Lịch IOE 2026–2027 đã công bố: cấp trường 26–28/11/2026, cấp xã/phường 7–9/1/2027,
     cấp tỉnh/thành phố 4–6/3/2027, cấp quốc gia dự kiến 1–2/4/2027. IOE chỉ có bài ôn cho khối 4, 6.
   - Thông tư 89/2026/TT-BGDĐT (hiệu lực 1/12/2026): Sở GD&ĐT ra đề kiểm tra định kì chung một số môn ở lớp 5 (cuối kì I,
     cuối năm), lớp 9 và lớp 12 (cuối kì I, cuối kì II); các kì đó ghi chú để phụ huynh xem thông báo của Sở.
   - Thi vào lớp 10 (Thông tư 30/2024): mỗi tỉnh một lịch; năm 2026 TP.HCM thi 1–2/6, Hà Nội 30–31/5; môn thứ ba công bố
     trước 31/3. Lịch mặc định ghi 1–2/6/2027 và Tiếng Anh (như TP.HCM) đến khi Sở công bố.
   - Thi tốt nghiệp THPT (Thông tư 24/2024): Toán, Ngữ văn và 2 môn tự chọn trong 9 môn còn lại.
   Ngày kiểm tra định kì của từng trường khác nhau, nên các mục đó đều đánh dấu tentative: true. Lớp 5 cùng ngày với lớp 4;
   lớp 7, 8, 10, 11 cùng ngày với lớp 6; lớp 9 và 12 học xong sớm hơn nên cuối kì I, giữa kì II, cuối năm sớm hơn một tuần.

   Trường của một kì thi:
   id         mã duy nhất, không đổi sau khi tạo (kết quả, bài ôn và seedEventsSeen gắn vào mã này; kì kiểm tra định kì:
              gk1-l<khối>, ck1-l<khối>, gk2-l<khối>, ck2-l<khối>)
   title      tên hiển thị
   kind       "dinh-ki" (kiểm tra định kì) | "ioe" | "thi-khac" | "moc" (mốc năm học, không thi)
   grades     các khối áp dụng, ví dụ [4] hoặc [4, 6]. Kì thi của khối chưa bật trong data/grades.js vẫn được chép vào máy
              nhưng app không hiện (chỉ hiện khối đang bật và khối đang có học sinh)
   start,end  ngày dạng "YYYY-MM-DD"; null nếu chưa có lịch
   tentative  true = ngày dự kiến, chờ trường thông báo
   subjects   các môn thi
   scope      phạm vi kiến thức (ngắn gọn)
   note       ghi chú (không bắt buộc)
   modules    mã bài ôn trong data/modules.js
   banks      mã ngân hàng câu hỏi (danh mục data/banks/index.js, kể cả đề ngẫu nhiên có pool, hoặc do quản trị viên nhập)
   Thêm kì thi mới: thêm một mục vào mảng (mã mới, không dùng lại mã đã bỏ); máy đã có dữ liệu tự nhận ở lần mở sau.
   Thêm khối vào kì dùng chung đã có: chỉ thêm số khối vào grades; máy đã có dữ liệu chỉ được thêm khối đó, ngày đã sửa giữ nguyên. */
(function () {
  const ALL = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const MON_TH_GK = ["Toán", "Tiếng Việt"];
  const MON_TH_CK = ["Toán", "Tiếng Việt", "Tiếng Anh", "Lịch sử và Địa lí", "Khoa học", "Tin học và Công nghệ"];
  const MON_THCS = ["Toán", "Ngữ văn", "Tiếng Anh", "KHTN", "Lịch sử và Địa lí", "GDCD", "Tin học", "Công nghệ"];
  const MON_THPT = ["Toán", "Ngữ văn", "Tiếng Anh", "Lịch sử", "Vật lí", "Hóa học", "Sinh học", "Địa lí", "GDKT&PL", "Tin học", "Công nghệ"];
  const SO = "Sở GD&ĐT ra đề chung một số môn (Thông tư 89/2026/TT-BGDĐT, từ 1/12/2026); môn và ngày kiểm tra theo thông báo của Sở.";
  const TT27 = (k) => `Theo Thông tư 27, lớp ${k} kiểm tra giữa kì môn Toán và Tiếng Việt.`;

  window.ONTAP_SEED_EVENTS = [
  { id: "khai-giang", title: "Khai giảng năm học 2026–2027", kind: "moc", grades: ALL,
    start: "2026-09-05", end: "2026-09-05", tentative: false, subjects: [], scope: "", modules: [], banks: [] },

  /* ---------------- Học kì I ---------------- */
  { id: "gk1-l4", title: "Kiểm tra giữa học kì I", kind: "dinh-ki", grades: [4],
    start: "2026-11-02", end: "2026-11-13", tentative: true,
    subjects: ["Toán", "Tiếng Việt"],
    scope: "Toán: Bài 1–19. Tiếng Việt: tuần 1–8. Sách Kết nối tri thức với cuộc sống.",
    note: TT27(4),
    modules: ["l4-giua-ki-1"], banks: ["toan4-gk1-de1", "toan4-gk1-de2", "toan4-gk1-ngau-nhien",
      "tv4-gk1-de1", "tv4-gk1-de2", "tv4-gk1-ngau-nhien"] },
  { id: "gk1-l5", title: "Kiểm tra giữa học kì I", kind: "dinh-ki", grades: [5],
    start: "2026-11-02", end: "2026-11-13", tentative: true, subjects: MON_TH_GK,
    scope: "Nửa đầu học kì I. Sách Kết nối tri thức với cuộc sống.", note: TT27(5), modules: [], banks: [] },
  { id: "gk1-l6", title: "Kiểm tra giữa học kì I", kind: "dinh-ki", grades: [6],
    start: "2026-11-02", end: "2026-11-13", tentative: true,
    subjects: MON_THCS,
    scope: "Ngữ văn: Bài 1–3. Toán: Chương I–III; trường dạy song song số và hình: Chương I, II, IV (Đề 1, Đề 3, Đề 4). KHTN: theo cách dạy của trường. Tiếng Anh: Unit 1–3. Lịch sử và Địa lí: Lịch sử Bài 1–6, Địa lí Bài 1–7 (có trường chỉ đến Bài 6). GDCD: Bài 1–4. Tin học: Bài 1–5. Công nghệ: Bài 1–3.",
    modules: ["l6-giua-ki-1", "ioe-6"], banks: ["ta6-gk1-de1", "lsdl6-gk1-de1", "gdcd6-gk1-de1", "tin6-gk1-de1", "congnghe6-gk1-de1",
      "toan6-gk1-de1", "toan6-gk1-de2", "toan6-gk1-ngau-nhien", "van6-gk1-de1", "van6-gk1-de2", "van6-gk1-ngau-nhien",
      "gdcd6-gk1-de2", "gdcd6-gk1-ngau-nhien", "khtn6-gk1-de1", "khtn6-gk1-de2", "khtn6-gk1-ngau-nhien", "congnghe6-gk1-de2",
      "congnghe6-gk1-ngau-nhien", "ta6-gk1-de2", "ta6-gk1-ngau-nhien", "lsdl6-gk1-de2", "lsdl6-gk1-ngau-nhien", "tin6-gk1-de2",
      "tin6-gk1-ngau-nhien", "toan6-gk1-de3", "toan6-gk1-de4"] },
  { id: "gk1-l7", title: "Kiểm tra giữa học kì I", kind: "dinh-ki", grades: [7],
    start: "2026-11-02", end: "2026-11-13", tentative: true, subjects: MON_THCS, scope: "Nửa đầu học kì I.", modules: [], banks: [] },
  { id: "gk1-l8", title: "Kiểm tra giữa học kì I", kind: "dinh-ki", grades: [8],
    start: "2026-11-02", end: "2026-11-13", tentative: true, subjects: MON_THCS, scope: "Nửa đầu học kì I.", modules: [], banks: [] },
  { id: "gk1-l9", title: "Kiểm tra giữa học kì I", kind: "dinh-ki", grades: [9],
    start: "2026-11-02", end: "2026-11-13", tentative: true, subjects: MON_THCS, scope: "Nửa đầu học kì I.", modules: [], banks: [] },
  { id: "gk1-l10", title: "Kiểm tra giữa học kì I", kind: "dinh-ki", grades: [10],
    start: "2026-11-02", end: "2026-11-13", tentative: true, subjects: MON_THPT, scope: "Nửa đầu học kì I.", modules: [], banks: [] },
  { id: "gk1-l11", title: "Kiểm tra giữa học kì I", kind: "dinh-ki", grades: [11],
    start: "2026-11-02", end: "2026-11-13", tentative: true, subjects: MON_THPT, scope: "Nửa đầu học kì I.", modules: [], banks: [] },
  { id: "gk1-l12", title: "Kiểm tra giữa học kì I", kind: "dinh-ki", grades: [12],
    start: "2026-11-02", end: "2026-11-13", tentative: true, subjects: MON_THPT, scope: "Nửa đầu học kì I.", modules: [], banks: [] },
  { id: "ioe-truong", title: "IOE cấp trường", kind: "ioe", grades: [4, 6],
    start: "2026-11-26", end: "2026-11-28", tentative: false,
    subjects: ["Tiếng Anh"], scope: "Lớp 4: Unit 1–6. Lớp 6: Unit 1–4.",
    modules: ["ioe-4", "ioe-6"], banks: [] },
  { id: "ck1-l9", title: "Kiểm tra cuối học kì I", kind: "dinh-ki", grades: [9],
    start: "2026-12-14", end: "2027-01-02", tentative: true, subjects: MON_THCS,
    scope: "Toàn bộ chương trình học kì I.", note: SO, modules: [], banks: [] },
  { id: "ck1-l12", title: "Kiểm tra cuối học kì I", kind: "dinh-ki", grades: [12],
    start: "2026-12-14", end: "2027-01-02", tentative: true, subjects: MON_THPT,
    scope: "Toàn bộ chương trình học kì I.", note: SO, modules: [], banks: [] },
  { id: "ck1-l6", title: "Kiểm tra cuối học kì I", kind: "dinh-ki", grades: [6],
    start: "2026-12-21", end: "2027-01-08", tentative: true,
    subjects: MON_THCS,
    scope: "Toàn bộ chương trình học kì I.", modules: ["ioe-6"],
    banks: ["toan6-ck1-de1", "toan6-ck1-de2", "van6-ck1-de1", "van6-ck1-de2", "khtn6-ck1-de1", "lsdl6-ck1-de1",
      "ta6-ck1-de1", "gdcd6-ck1-de1", "tin6-ck1-de1", "congnghe6-ck1-de1", "toan6-ck1-ngau-nhien", "van6-ck1-ngau-nhien",
      "ta6-ck1-de2", "ta6-ck1-ngau-nhien", "khtn6-ck1-de2", "khtn6-ck1-ngau-nhien", "lsdl6-ck1-de2", "lsdl6-ck1-ngau-nhien",
      "gdcd6-ck1-de2", "gdcd6-ck1-ngau-nhien", "tin6-ck1-de2", "tin6-ck1-ngau-nhien", "congnghe6-ck1-de2", "congnghe6-ck1-ngau-nhien"] },
  { id: "ck1-l7", title: "Kiểm tra cuối học kì I", kind: "dinh-ki", grades: [7],
    start: "2026-12-21", end: "2027-01-08", tentative: true, subjects: MON_THCS, scope: "Toàn bộ chương trình học kì I.", modules: [], banks: [] },
  { id: "ck1-l8", title: "Kiểm tra cuối học kì I", kind: "dinh-ki", grades: [8],
    start: "2026-12-21", end: "2027-01-08", tentative: true, subjects: MON_THCS, scope: "Toàn bộ chương trình học kì I.", modules: [], banks: [] },
  { id: "ck1-l10", title: "Kiểm tra cuối học kì I", kind: "dinh-ki", grades: [10],
    start: "2026-12-21", end: "2027-01-08", tentative: true, subjects: MON_THPT, scope: "Toàn bộ chương trình học kì I.", modules: [], banks: [] },
  { id: "ck1-l11", title: "Kiểm tra cuối học kì I", kind: "dinh-ki", grades: [11],
    start: "2026-12-21", end: "2027-01-08", tentative: true, subjects: MON_THPT, scope: "Toàn bộ chương trình học kì I.", modules: [], banks: [] },
  { id: "ck1-l4", title: "Kiểm tra cuối học kì I", kind: "dinh-ki", grades: [4],
    start: "2026-12-28", end: "2027-01-08", tentative: true,
    subjects: MON_TH_CK,
    scope: "Toàn bộ chương trình học kì I. Tiếng Anh: Unit 1–10.", modules: ["ioe-4"],
    banks: ["toan4-ck1-de1", "toan4-ck1-de2", "toan4-ck1-de3", "tv4-ck1-de1", "tv4-ck1-de2", "khoahoc4-ck1-de1", "lsdl4-ck1-de1", "tincn4-ck1-de1",
      "tincn4-ck1-de2", "ta4-ck1-de1", "ta4-ck1-de2", "khoahoc4-ck1-de2", "lsdl4-ck1-de2", "toan4-ck1-ngau-nhien", "tv4-ck1-ngau-nhien",
      "ta4-ck1-ngau-nhien", "tincn4-ck1-ngau-nhien", "khoahoc4-ck1-ngau-nhien", "lsdl4-ck1-ngau-nhien"] },
  { id: "ck1-l5", title: "Kiểm tra cuối học kì I", kind: "dinh-ki", grades: [5],
    start: "2026-12-28", end: "2027-01-08", tentative: true, subjects: MON_TH_CK,
    scope: "Toàn bộ chương trình học kì I.", note: SO, modules: [], banks: [] },
  { id: "ioe-xa", title: "IOE cấp xã/phường", kind: "ioe", grades: [4, 6],
    start: "2027-01-07", end: "2027-01-09", tentative: false,
    subjects: ["Tiếng Anh"], scope: "Lớp 4: Unit 1–10. Lớp 6: Unit 1–6.",
    modules: ["ioe-4", "ioe-6"], banks: [] },
  { id: "het-hk1", title: "Kết thúc học kì I (trước ngày này)", kind: "moc", grades: ALL,
    start: "2027-01-18", end: "2027-01-18", tentative: false, subjects: [], scope: "", modules: [], banks: [] },

  /* ---------------- Học kì II ---------------- */
  { id: "tet-2027", title: "Tết Nguyên đán Đinh Mùi (mùng 1)", kind: "moc", grades: ALL,
    start: "2027-02-06", end: "2027-02-06", tentative: false, subjects: [],
    scope: "", note: "Lịch nghỉ Tết theo quyết định của từng tỉnh, thành phố.", modules: [], banks: [] },
  { id: "ioe-tinh", title: "IOE cấp tỉnh/thành phố", kind: "ioe", grades: [4, 6],
    start: "2027-03-04", end: "2027-03-06", tentative: false,
    subjects: ["Tiếng Anh"], scope: "Lớp 4: Unit 1–10. Lớp 6: Unit 1–9.", modules: ["ioe-4", "ioe-6"], banks: [] },
  { id: "gk2-l9", title: "Kiểm tra giữa học kì II", kind: "dinh-ki", grades: [9],
    start: "2027-03-08", end: "2027-03-19", tentative: true, subjects: MON_THCS, scope: "Nửa đầu học kì II.", modules: [], banks: [] },
  { id: "gk2-l12", title: "Kiểm tra giữa học kì II", kind: "dinh-ki", grades: [12],
    start: "2027-03-08", end: "2027-03-19", tentative: true, subjects: MON_THPT, scope: "Nửa đầu học kì II.", modules: [], banks: [] },
  { id: "gk2-l4", title: "Kiểm tra giữa học kì II", kind: "dinh-ki", grades: [4],
    start: "2027-03-15", end: "2027-03-26", tentative: true,
    subjects: ["Toán", "Tiếng Việt"],
    scope: "Toán: Bài 38–59. Tiếng Việt: tập 2, Bài 1–16. Sách Kết nối tri thức với cuộc sống.",
    modules: [], banks: ["toan4-gk2-de1", "toan4-gk2-de2", "tv4-gk2-de1", "tv4-gk2-de2", "toan4-gk2-ngau-nhien", "tv4-gk2-ngau-nhien"] },
  { id: "gk2-l5", title: "Kiểm tra giữa học kì II", kind: "dinh-ki", grades: [5],
    start: "2027-03-15", end: "2027-03-26", tentative: true, subjects: MON_TH_GK,
    scope: "Nửa đầu học kì II. Sách Kết nối tri thức với cuộc sống.", note: TT27(5), modules: [], banks: [] },
  { id: "gk2-l6", title: "Kiểm tra giữa học kì II", kind: "dinh-ki", grades: [6],
    start: "2027-03-15", end: "2027-03-26", tentative: true,
    subjects: MON_THCS,
    scope: "Toán: Bài 23–35. Ngữ văn: Bài 6–7. Tiếng Anh: Unit 7–9. KHTN: Bài 25–39 (Đa dạng thế giới sống). Lịch sử và Địa lí: Lịch sử Bài 11–15, Địa lí Bài 16–22. GDCD: Bài 7–9. Tin học: Bài 9–13. Công nghệ: Bài 7–10.",
    modules: [], banks: ["toan6-gk2-de1", "toan6-gk2-de2", "toan6-gk2-ngau-nhien", "van6-gk2-de1", "van6-gk2-de2", "van6-gk2-ngau-nhien",
      "ta6-gk2-de1", "ta6-gk2-de2", "ta6-gk2-ngau-nhien", "khtn6-gk2-de1", "khtn6-gk2-de2", "khtn6-gk2-ngau-nhien",
      "lsdl6-gk2-de1", "lsdl6-gk2-de2", "lsdl6-gk2-ngau-nhien", "gdcd6-gk2-de1", "gdcd6-gk2-de2", "gdcd6-gk2-ngau-nhien",
      "tin6-gk2-de1", "tin6-gk2-de2", "tin6-gk2-ngau-nhien", "congnghe6-gk2-de1", "congnghe6-gk2-de2", "congnghe6-gk2-ngau-nhien"] },
  { id: "gk2-l7", title: "Kiểm tra giữa học kì II", kind: "dinh-ki", grades: [7],
    start: "2027-03-15", end: "2027-03-26", tentative: true, subjects: MON_THCS, scope: "Nửa đầu học kì II.", modules: [], banks: [] },
  { id: "gk2-l8", title: "Kiểm tra giữa học kì II", kind: "dinh-ki", grades: [8],
    start: "2027-03-15", end: "2027-03-26", tentative: true, subjects: MON_THCS, scope: "Nửa đầu học kì II.", modules: [], banks: [] },
  { id: "gk2-l10", title: "Kiểm tra giữa học kì II", kind: "dinh-ki", grades: [10],
    start: "2027-03-15", end: "2027-03-26", tentative: true, subjects: MON_THPT, scope: "Nửa đầu học kì II.", modules: [], banks: [] },
  { id: "gk2-l11", title: "Kiểm tra giữa học kì II", kind: "dinh-ki", grades: [11],
    start: "2027-03-15", end: "2027-03-26", tentative: true, subjects: MON_THPT, scope: "Nửa đầu học kì II.", modules: [], banks: [] },
  { id: "ioe-qg", title: "IOE cấp quốc gia", kind: "ioe", grades: [4, 6],
    start: "2027-04-01", end: "2027-04-02", tentative: true,
    subjects: ["Tiếng Anh"], scope: "Học sinh đủ điều kiện sau vòng cấp tỉnh/thành phố; ban tổ chức sẽ công bố điều kiện và khối dự thi. Lớp 4: Unit 1–15. Lớp 6: Unit 1–10.",
    modules: ["ioe-4", "ioe-6"], banks: [] },
  { id: "ck2-l12", title: "Kiểm tra cuối năm học", kind: "dinh-ki", grades: [12],
    start: "2027-04-12", end: "2027-05-14", tentative: true, subjects: MON_THPT,
    scope: "Toàn bộ chương trình lớp 12.", note: SO, modules: [], banks: [] },
  { id: "ck2-l9", title: "Kiểm tra cuối năm học", kind: "dinh-ki", grades: [9],
    start: "2027-04-19", end: "2027-05-14", tentative: true, subjects: MON_THCS,
    scope: "Toàn bộ chương trình lớp 9.", note: SO, modules: [], banks: [] },
  { id: "ck2-l6", title: "Kiểm tra cuối năm học", kind: "dinh-ki", grades: [6],
    start: "2027-04-26", end: "2027-05-14", tentative: true,
    subjects: MON_THCS,
    scope: "Học kì II. Toán: Bài 23–43. Ngữ văn: Bài 6–9, trọng tâm Bài 8–9. Tiếng Anh: Unit 7–12. KHTN: Bài 40–55, ôn Bài 34–39. Lịch sử và Địa lí: Lịch sử Bài 16–20, Địa lí Bài 23–29. GDCD: Bài 7–12. Tin học: Bài 9–17. Công nghệ: Bài 7–14.",
    modules: [], banks: ["toan6-ck2-de1", "toan6-ck2-de2", "toan6-ck2-ngau-nhien", "van6-ck2-de1", "van6-ck2-de2", "van6-ck2-ngau-nhien",
      "ta6-ck2-de1", "ta6-ck2-de2", "ta6-ck2-ngau-nhien", "khtn6-ck2-de1", "khtn6-ck2-de2", "khtn6-ck2-ngau-nhien",
      "lsdl6-ck2-de1", "lsdl6-ck2-de2", "lsdl6-ck2-ngau-nhien", "gdcd6-ck2-de1", "gdcd6-ck2-de2", "gdcd6-ck2-ngau-nhien",
      "tin6-ck2-de1", "tin6-ck2-de2", "tin6-ck2-ngau-nhien", "congnghe6-ck2-de1", "congnghe6-ck2-de2", "congnghe6-ck2-ngau-nhien"] },
  { id: "ck2-l7", title: "Kiểm tra cuối năm học", kind: "dinh-ki", grades: [7],
    start: "2027-04-26", end: "2027-05-14", tentative: true, subjects: MON_THCS, scope: "Toàn bộ chương trình lớp 7.", modules: [], banks: [] },
  { id: "ck2-l8", title: "Kiểm tra cuối năm học", kind: "dinh-ki", grades: [8],
    start: "2027-04-26", end: "2027-05-14", tentative: true, subjects: MON_THCS, scope: "Toàn bộ chương trình lớp 8.", modules: [], banks: [] },
  { id: "ck2-l10", title: "Kiểm tra cuối năm học", kind: "dinh-ki", grades: [10],
    start: "2027-04-26", end: "2027-05-14", tentative: true, subjects: MON_THPT, scope: "Toàn bộ chương trình lớp 10.", modules: [], banks: [] },
  { id: "ck2-l11", title: "Kiểm tra cuối năm học", kind: "dinh-ki", grades: [11],
    start: "2027-04-26", end: "2027-05-14", tentative: true, subjects: MON_THPT, scope: "Toàn bộ chương trình lớp 11.", modules: [], banks: [] },
  { id: "ck2-l4", title: "Kiểm tra cuối năm học", kind: "dinh-ki", grades: [4],
    start: "2027-05-03", end: "2027-05-14", tentative: true,
    subjects: MON_TH_CK,
    scope: "Toán: cả năm, trọng tâm học kì II (Bài 38–73). Tiếng Việt: tập 2, trọng tâm Bài 17–30. Tiếng Anh: Unit 11–20. Khoa học: Bài 19–31. Lịch sử và Địa lí: Bài 15–27. Tin học và Công nghệ: Tin học Bài 10–16, Công nghệ Bài 7–12.",
    modules: [], banks: ["toan4-ck2-de1", "toan4-ck2-de2", "toan4-ck2-ngau-nhien", "tv4-ck2-de1", "tv4-ck2-de2", "tv4-ck2-ngau-nhien",
      "ta4-ck2-de1", "ta4-ck2-de2", "ta4-ck2-ngau-nhien"] },
  { id: "ck2-l5", title: "Kiểm tra cuối năm học", kind: "dinh-ki", grades: [5],
    start: "2027-05-03", end: "2027-05-14", tentative: true, subjects: MON_TH_CK,
    scope: "Toàn bộ chương trình lớp 5.", note: SO, modules: [], banks: [] },
  { id: "het-nam", title: "Kết thúc năm học (trước ngày này)", kind: "moc", grades: ALL,
    start: "2027-05-31", end: "2027-05-31", tentative: false, subjects: [], scope: "", modules: [], banks: [] },

  /* ---------------- Thi chuyển cấp, thi tốt nghiệp ---------------- */
  { id: "vao10-2027", title: "Thi tuyển sinh vào lớp 10", kind: "thi-khac", grades: [9],
    start: "2027-06-01", end: "2027-06-02", tentative: true,
    subjects: ["Toán", "Ngữ văn", "Tiếng Anh"], scope: "Chương trình THCS, trọng tâm lớp 9. Toán, Ngữ văn 120 phút; môn thứ ba theo đề của Sở.",
    note: "Mỗi tỉnh, thành phố một lịch thi (năm 2026: TP.HCM 1–2/6, Hà Nội 30–31/5). Môn thứ ba do Sở GD&ĐT chọn và công bố trước 31/3/2027; ở đây ghi Tiếng Anh đến khi Sở công bố. Bố mẹ sửa ngày theo thông báo của Sở.",
    modules: [], banks: [] },
  { id: "tn-thpt-2027", title: "Thi tốt nghiệp THPT", kind: "thi-khac", grades: [12],
    start: "2027-06-11", end: "2027-06-12", tentative: true,
    subjects: ["Toán", "Ngữ văn", "Tiếng Anh", "Vật lí", "Hóa học", "Sinh học", "Lịch sử", "Địa lí", "GDKT&PL", "Tin học", "Công nghệ"],
    scope: "Thi 4 môn: Toán, Ngữ văn bắt buộc và 2 môn tự chọn trong 9 môn còn lại (Thông tư 24/2024). Chương trình THPT, trọng tâm lớp 12.",
    note: "Ngày dự kiến theo khung kế hoạch năm học của Bộ (Quyết định 2308/QĐ-BGDĐT), Bộ sẽ công bố lịch chính thức. Năm 2027 thí điểm thi trên máy tính ở nơi đủ điều kiện, đề như thi giấy.",
    modules: [], banks: [] }
  /* Violympic Toán, Trạng Nguyên Tiếng Việt: tạm bỏ ở bản 1.0 (xem docs/TINH-NANG.md mục 6). */
  ];
})();
