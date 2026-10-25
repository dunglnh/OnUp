/* Kiểm tra bài ôn modules/ioe-6 (Phiên 9s, L44: lộ trình School Level, Unit 1–4; Phiên N-IOE: lộ trình National Level, Unit 1–10).
   Chạy: node tests/bai-on-ioe6.js [commit] (mặc định origin/main). Không cần trình duyệt. In "BAI ON IOE6 OK" khi đạt. Phần chung: tests/ioe-chung.js.
   Tách phần dữ liệu (UNITS, các ngân hàng câu) và phần "Test plan" của trang (TRACKS, buildTest, inst), chạy trong vm.
   1. Dữ liệu cũ giữ nguyên: UNITS (các unit đã có; unit mới chỉ thêm ở cuối), SCHOOL, WARD, CITY và các bộ nghe giống hệt commit (NATIONAL,
      NATIONAL_L cũng vậy khi commit đã có); mọi lộ trình đã có ở commit giống hệt, và mọi đề của chúng (có và không có câu nghe) ra đúng các câu,
      thứ tự lựa chọn, chữ ẩn, thứ tự ô như commit (mã câu S…, W…, C… và đề học sinh đã làm không đổi).
   2. SCHOOL, SCHOOL_L chỉ Unit 1–4, dạng m, o, p, s, f, l, r (không có e) và h, hf; NATIONAL, NATIONAL_L chỉ Unit 1–10, dạng m, o, p, s, e, f, l, r, rd
      và h, hf. In số câu theo unit và dạng. m, h, rd có 4 lựa chọn khác nhau; o, p, s có 4 từ khác nhau (p: mỗi từ đúng một chỗ gạch chân); e có
      đúng 4 phần [ ], chỉ số phần sai 0–3, chữ sửa khác phần sai; f, hf có đúng một ___ và đáp án; hf điền đáp án vào thì đúng câu được đọc; l chỉ
      có chữ cái; r ít nhất 3 mảnh, mảnh đầu viết hoa, dấu câu ở mảnh cuối.
   3. Không chữ cái tiếng Việt (trừ café); không câu nào của hai ngân hàng mới trùng câu khác của trang (so sau khi bỏ dấu câu, khoảng trắng, chữ
      thường: câu hỏi của m, f; câu được đọc của h, hf; đoạn đọc và câu hỏi của rd; câu của r, e; từ của l; bộ từ của o, p, s); không có từ không
      theo sách in năm 2026 (ghi chú Tiếng Anh 6 ở mục 3.4 của docs/KE-HOACH-NOI-DUNG.md; bảng "Cập nhật năm 2026" trong README của cuốn).
   4. TRACKS.S, TRACKS.N đúng lời giao việc, TRACK_ORDER = S, W, C, N; rút thử mọi đề School Level (49) và National Level (28): đủ 30 câu, không
      câu nào ra hai lần, mã câu và unit đúng lộ trình, có câu nghe (máy không đọc được tiếng: không có câu nghe, vẫn 30 câu), mọi câu của ngân
      hàng chính có mặt ít nhất một lần. defaultTrack: School Level đến hết 29/11/2026, Ward Level từ 30/11/2026, City Level từ 11/1/2027,
      National Level từ 8/3/2027.
   5. In ra để xem (không tính lỗi): đáp án của câu f, l, hf có trong chữ của câu khác cùng unit (lộ đáp án, mục 3.3 của docs/KE-HOACH-NOI-DUNG.md);
      đáp án là từ chức năng (at, on, in…) không xét.
   Script tự thử bộ kiểm tra với vài câu cố ý viết sai. */
const { chay } = require("./ioe-chung.js");
const CAM_DIA_DANH = ["Bac Giang", "Nam Dinh", "Phu Yen", "Quang Binh", "District 1"];
chay({
  file: "modules/ioe-6/index.html",
  ref: process.argv[2] || "origin/main",
  cu: ["UNITS", "SCHOOL", "WARD", "CITY", "NATIONAL", "SCHOOL_L", "WARD_L", "CITY_L", "NATIONAL_L"],
  kiemTra: [
    { ten: "SCHOOL", tenL: "SCHOOL_L", label: "School Level",
      luat: { S: ["m", "o", "p", "s", "f", "l", "r"], L: ["h", "hf"], units: [1, 4], cam: ["attic", "talkative", "generous", "patient", "curious", "lazy"].concat(CAM_DIA_DANH) } },
    { ten: "NATIONAL", tenL: "NATIONAL_L", label: "National Level",
      luat: { S: ["m", "o", "p", "s", "e", "f", "l", "r", "rd"], L: ["h", "hf"], units: [1, 10],
        cam: ["attic", "talkative", "generous", "patient", "curious", "lazy", "torch", "newsreader", "weatherman", "remote control", "documentary", "weather forecast",
          "skiing", "stadium", "basketball", "judo", "gloves", "helmets", "although", "whose"].concat(CAM_DIA_DANH) } },
  ],
  track: {
    S: { key: "S", name: "School Level", units: "Units 1–4", start: new Date(2026, 9, 12), weeks: 7, exam: new Date(2026, 10, 26), examText: "26–28 Nov 2026", pools: [["S", 30]], mins: 20 },
    N: { key: "N", name: "National Level", units: "Units 1–10", start: new Date(2027, 2, 8), weeks: 4, exam: new Date(2027, 3, 1), examText: "1–2 Apr 2027 (expected)", pools: [["N", 24], ["C", 6]], mins: 20 },
  },
  order: ["S", "W", "C", "N"],
  ngay: [["2026-10-12T12:00", "S"], ["2026-10-21T07:00", "S"], ["2026-11-29T23:00", "S"], ["2026-11-30T00:30", "W"], ["2027-01-10T20:00", "W"], ["2027-01-11T08:00", "C"],
    ["2027-03-07T20:00", "C"], ["2027-03-08T07:00", "N"], ["2027-04-02T08:00", "N"]],
  rut: [{ tk: "S", lv: ["S"], units: [1, 4] }, { tk: "N", lv: ["N", "C"], units: [1, 10] }],
  ok: "BAI ON IOE6 OK",
});
