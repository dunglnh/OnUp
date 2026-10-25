/* Danh mục bài ôn dạng trang riêng (mỗi bài là một thư mục trong modules/).
   Mỗi bài tự lưu tiến độ chi tiết của nó; app chỉ nhận về điểm tổng sau mỗi lần làm (qua js/bridge.js).
   subjects: mã môn mà bài ôn gửi về trong ontapReport → tên hiển thị.
   lang: "en" khi bài ôn bằng tiếng Anh (IOE): phần app bọc ngoài (nút quay lại, dòng ghi chú, hộp hỏi khi rời bài, thông báo
   lưu điểm) hiện tiếng Anh (Phiên TA2, chữ ở bảng TXT của js/quiz.js); không ghi thì bài chỉ có môn ta cũng tính là tiếng Anh. */
window.ONTAP_MODULES = [
  { id: "l4-giua-ki-1", title: "Ôn giữa kì I · Lớp 4", grade: 4, path: "modules/l4-giua-ki-1/index.html",
    desc: "Toán và Tiếng Việt, sách Kết nối tri thức, đến tuần 9. Đề có giờ, ôn theo bài, ôn câu sai.",
    subjects: { toan: "Toán", tv: "Tiếng Việt" } },
  { id: "l6-giua-ki-1", title: "Ôn giữa kì I · Lớp 6", grade: 6, path: "modules/l6-giua-ki-1/index.html",
    desc: "Ngữ văn, Toán, KHTN, sách Kết nối tri thức. Có đọc hiểu văn bản mới.",
    subjects: { van: "Ngữ văn", toan: "Toán", khtn: "KHTN" } },
  { id: "ioe-4", title: "IOE · Global Success 4", grade: 4, lang: "en", path: "modules/ioe-4/index.html",
    desc: "Luyện đề IOE cấp trường, cấp xã/phường, cấp tỉnh và cấp quốc gia, có câu nghe. 7 đề mỗi tuần.",
    subjects: { ta: "Tiếng Anh" } },
  { id: "ioe-6", title: "IOE · Global Success 6", grade: 6, lang: "en", path: "modules/ioe-6/index.html",
    desc: "Luyện đề IOE cấp trường, cấp xã/phường, cấp thành phố và cấp quốc gia, có câu nghe. 7 đề mỗi tuần.",
    subjects: { ta: "Tiếng Anh" } }
];
