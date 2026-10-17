/* Danh sách khối lớp, dùng chung cho form hồ sơ học sinh, lịch thi, ngân hàng đề, trang quản trị (cả bản lưu trên máy
   và bản đám mây). Thêm lớp mới chỉ là thêm nội dung (bài ôn, đề, kì thi) rồi đổi active thành true, không sửa code.
   active: false = khối chưa có nội dung, không hiện cho người dùng chọn. Máy chủ (supabase/schema.sql) nhận khối 1–12. */
window.ONTAP_GRADES = [
  { grade: 1, name: "Lớp 1", active: false },
  { grade: 2, name: "Lớp 2", active: false },
  { grade: 3, name: "Lớp 3", active: false },
  { grade: 4, name: "Lớp 4", active: true },
  { grade: 5, name: "Lớp 5", active: false },
  { grade: 6, name: "Lớp 6", active: true },
  { grade: 7, name: "Lớp 7", active: false },
  { grade: 8, name: "Lớp 8", active: false },
  { grade: 9, name: "Lớp 9", active: false },
  { grade: 10, name: "Lớp 10", active: false },
  { grade: 11, name: "Lớp 11", active: false },
  { grade: 12, name: "Lớp 12", active: false }
];
