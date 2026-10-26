/* Kiểm tra bài ôn modules/ioe-4 (Phiên N-IOE: lộ trình National Level, Unit 1–15; Unit 11–15 của tập hai chỉ có ở ngân hàng mới).
   Chạy: node tests/bai-on-ioe4.js [commit] (mặc định origin/main). Không cần trình duyệt. In "BAI ON IOE4 OK" khi đạt. Phần chung: tests/ioe-chung.js.
   Tách phần dữ liệu (UNITS, các ngân hàng câu) và phần "Test plan" của trang (TRACKS, buildTest, inst), chạy trong vm.
   1. Dữ liệu cũ giữ nguyên: UNITS (Unit 1–10; Unit 11–15 chỉ thêm ở cuối), SCHOOL, WARD, PROVINCE và các bộ nghe giống hệt commit (NATIONAL,
      NATIONAL_L cũng vậy khi commit đã có); School Level, Ward Level, Province Level giống hệt, và mọi đề của chúng (có và không có câu nghe) ra
      đúng các câu, thứ tự lựa chọn, chữ ẩn, thứ tự ô như commit (mã câu S…, W…, P… và đề học sinh đã làm không đổi).
   2. NATIONAL, NATIONAL_L chỉ Unit 1–15, dạng m, o, p, e, f, l, w, r, rd và h, hp, hf. In số câu theo unit và dạng. m, h, rd có 4 lựa chọn khác
      nhau; hp có 4 hình khác nhau; o, p có 4 từ khác nhau (p: mỗi từ đúng một chỗ gạch chân); e có đúng 4 phần [ ], chỉ số phần sai 0–3, chữ sửa
      khác phần sai; f, hf có đúng một ___ và đáp án; hf điền đáp án vào thì đúng câu được đọc; l, w chỉ có chữ cái (w: ít nhất 3 chữ cái khác
      nhau); r ít nhất 3 mảnh, mảnh đầu viết hoa, dấu câu ở mảnh cuối.
   3. Không chữ cái tiếng Việt (trừ café); không câu nào của ngân hàng mới trùng câu khác của trang (so sau khi bỏ dấu câu, khoảng trắng, chữ
      thường); không có địa danh cũ.
   4. TRACKS.N đúng lời giao việc (từ 8/3/2027, 4 tuần × 7 đề, thi 1–2/4/2027 dự kiến, 24 câu National + 6 câu Province), TRACK_ORDER = S, W, P, N;
      rút thử 28 đề National Level: đủ 30 câu, không câu nào ra hai lần, mã câu N…, P…, Unit 1–15, có câu nghe (máy không đọc được tiếng: không có
      câu nghe, vẫn 30 câu), mọi câu của NATIONAL, NATIONAL_L có mặt ít nhất một lần. defaultTrack (lộ trình bắt đầu muộn nhất): School Level đến
      hết 29/11/2026, Ward Level từ 30/11/2026, Province Level từ 11/1/2027, National Level từ 8/3/2027.
   5. In ra để xem (không tính lỗi): đáp án của câu f, l, w, hf có trong chữ của câu khác cùng unit (lộ đáp án); đáp án là từ chức năng không xét.
   Script tự thử bộ kiểm tra với vài câu cố ý viết sai. */
const { chay } = require("./ioe-chung.js");
chay({
  file: "modules/ioe-4/index.html",
  ref: process.argv[2] || "origin/main",
  cu: ["UNITS", "SCHOOL", "WARD", "PROVINCE", "NATIONAL", "SCHOOL_L", "WARD_L", "PROVINCE_L", "NATIONAL_L"],
  sua: require("./ioe-sua.js")["ioe-4"], // Phiên DS-IOE: câu cũ đổi chữ cho khớp sách in năm 2026
  luatSua: { S: ["m", "o", "p", "e", "f", "l", "w", "r", "rd"], L: ["h", "hp", "hf"], units: [1, 10],
    cam: ["nationality", "Japanese", "American", "Australian", "Malaysian", "Thai", "British", "Singaporean", "Canada", "Kuala Lumpur",
      "artist", "scientist", "engineer", "programmer", "athlete", "writer", "footballer", "floor", "stairs", "swimming pool", "sandwich", "sandwiches",
      "Bac Giang", "Nam Dinh", "Phu Yen", "Quang Binh", "District 1", "Ha Tay"] },
  kiemTra: [
    { ten: "NATIONAL", tenL: "NATIONAL_L", label: "National Level",
      luat: { S: ["m", "o", "p", "e", "f", "l", "w", "r", "rd"], L: ["h", "hp", "hf"], units: [1, 15], cam: ["Bac Giang", "Nam Dinh", "Phu Yen", "Quang Binh", "District 1", "Ha Tay"] } },
  ],
  track: {
    N: { key: "N", name: "National Level", units: "Units 1–15", start: new Date(2027, 2, 8), weeks: 4, exam: new Date(2027, 3, 1), examText: "1–2 Apr 2027 (expected)", pools: [["N", 24], ["P", 6]], mins: 20 },
  },
  order: ["S", "W", "P", "N"],
  ngay: [["2026-10-21T07:00", "S"], ["2026-11-29T23:00", "S"], ["2026-11-30T08:00", "W"], ["2027-01-10T20:00", "W"], ["2027-01-11T08:00", "P"],
    ["2027-03-07T20:00", "P"], ["2027-03-08T07:00", "N"], ["2027-04-02T08:00", "N"]],
  rut: [{ tk: "N", lv: ["N", "P"], units: [1, 15] }],
  ok: "BAI ON IOE4 OK",
});
