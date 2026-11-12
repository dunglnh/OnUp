// Kiểm tra các đề Lịch sử thi thử tốt nghiệp THPT (data/banks/12-lichsu.js, lichsu12-tn-de<N>; Phiên N12-tn-lichsu: Đề 1–4; phiên sau thêm đề
// thì mở rộng script này: thêm các mục kiểm tra của đề mới vào RIENG, thêm sự kiện mới vào SU_KIEN). Đề tính điểm theo khung đề tốt nghiệp THPT
// từ năm 2025 (Quyết định 764/QĐ-BGDĐT; docs/KE-HOACH-NOI-DUNG.md, mục 2 và mục 7, khối “Phiên N12-tn-lichsu”). Số đề, số câu lấy từ danh mục.
// Khung: danh mục (tên, khối 12, môn Lịch sử, file, 50 phút, pts 10, gắn vào tn-thpt-2027); Phần I 24 câu nhiều lựa chọn pt 0,25, Phần II
// 4 câu đúng/sai 4 ý pt 1 (đúng tên part, đúng thứ tự; không có Phần III), Quiz.grade điểm tối đa 6 – 4; mức độ và phạm vi như ma trận đề
// tham khảo năm 2025 (40 lệnh hỏi: Phần I 12 Biết, 8 Hiểu, 4 Vận dụng; Phần II mỗi câu 1 ý Biết, 1 ý Hiểu, 2 ý Vận dụng nên bốn câu ghi mức
// 1, 2, 3, 3; 6 lệnh hỏi thuộc Lịch sử 11, đều ở Phần I, mỗi mức 2 câu; không có câu Lịch sử 10; câu lớp 12 của Phần I chia theo sáu chủ đề
// 2 – 3 – 4 – 3 – 3 – 3 với mức như ma trận đó; Phần II bốn câu lớp 12 thuộc Chủ đề 1, 3, 4 và một trong Chủ đề 5, 6 thay câu chuyên đề học
// tập); câu lớp 12 mang đúng chữ chủ đề của ba kho Lịch sử 12 (cuối kì I, giữa kì II, cuối năm), riêng Bài 9 (không có ở kho nào) mang tên bài
// rút gọn; câu lớp 11 ghi “Lớp 11 · ” và tên chủ đề của sách (rút gọn cho vừa mã đề “Ôn chủ đề”), đối chiếu mục lục trong README của cuốn ở
// OnUp-Book; trong mỗi phần, câu lớp 12 theo thứ tự bài; mỗi câu Phần II có một đoạn tư liệu riêng (người soạn viết, ghi ở tên đoạn), không
// dùng cho câu khác; lời dặn ghi đúng số câu, số điểm, số câu mỗi lớp tính từ dữ liệu.
// Mỗi câu khớp đúng một mục kiểm tra của đề đó (theo chữ has trong đề bài): câu nhiều lựa chọn so với bảng sự kiện, ngày tháng theo sách
// (SU_KIEN: Lịch sử 11, 12 in năm 2026, ghi trang in) hay với chữ khoá của đáp án theo bài của sách (đúng một lựa chọn có chữ đó); câu sắp xếp
// trình tự thời gian (đề bài liệt kê sự kiện 1–4, lựa chọn là thứ tự) tính lại bằng bảng ngày tháng; số năm tính lại; ý “A diễn ra trước B”,
// “A và B cách nhau N năm” của câu đúng/sai 4 ý tính lại bằng bảng; các ý khác so với bảng ý → đúng/sai ghi trong script.
// Rồi: chữ (số ngăn hàng nghìn bằng khoảng trắng, dấu thanh kiểu sách “hoá”, “thuỷ”; ngày tháng viết như sách “6 – 3 – 1946”; tên tỉnh theo 34
// đơn vị hành chính, tên tỉnh đã nhập chỉ ghi kèm “nay thuộc …”; không “huyện”, “63 tỉnh”); kiểu Đ/S không lặp trong một đề, mỗi kiểu nhiều
// nhất ba lần trong các đề thi thử; đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba
// và không dưới một phần sáu số câu nhiều lựa chọn của đề, không là lựa chọn duy nhất có chữ của nhãn chủ đề, ba lựa chọn sai không cùng mở
// đầu bằng một chữ mà đáp án đúng không có; lời giải không nhắc vị trí của phương án. So với ba kho Lịch sử 12 và giữa các đề thi thử: đề bài
// không trùng câu nào trong file, không gần trùng (chuỗi 6 từ; cặp hai âm tiết chung với câu của ba kho), đáp án không trùng câu cùng chủ đề.
// Dò lộ đáp án giữa mọi câu của một đề (đoạn tư liệu, lời dặn cùng hiện) và giữa câu cùng chủ đề của các đề thi thử và ba kho Lịch sử 12
// (đề “Ôn chủ đề” rút chung): đáp án bằng chữ tách thành chuỗi 3 từ, chuỗi có ở câu kia in ra với DO_LO=1 để xem tay, đã xem ghi ở DA_XEM;
// năm là đáp án có ở vị trí kết quả của câu kia; ngày tháng của các sự kiện trong câu về trình tự thời gian (câu sắp xếp, ý “A diễn ra trước
// B”) không được có ở câu kia. Có ../OnUp-Book thì so mọi trường chữ (cả đoạn tư liệu, lời dặn) với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp
// nguyên âm, gộp tên riêng nhiều chữ thành một từ (GOP; không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và với câu của mọi kho khác,
// cả giữa các đề thi thử (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 6 từ). Bộ tính trình tự, bộ dò lộ tự thử với câu cố ý viết sai.
// Chạy: node tests/lichsu12-tn.js → in MATH OK.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe().filter((b) => b.questions || !process.env.TAM);
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, EVENTS = ctx.window.ONTAP_SEED_EVENTS;
const sum = (a) => a.reduce((s, v) => s + v, 0);
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
const NUM = "[−-]?\\d{1,3}(?: \\d{3})*(?:,\\d+)?";
const val = (s) => { const m = /^[−-]?\d{1,3}(?: \d{3})*(?:,\d+)?$/.exec(String(s).trim()); assert.ok(m, "không đọc được số “" + s + "”"); return +String(s).trim().replace(/ /g, "").replace(",", ".").replace("−", "-"); };
const gan = (a, b, e = 1e-9) => a === b || Math.abs(a - b) <= e * Math.max(Math.abs(a), Math.abs(b));
const coX = (q, ...cum) => cum.forEach((c) => assert.ok(q.x.includes(c), "lời giải cần có “" + c + "”"));
const motCai = (q, f, at = "") => { const c = q.o.filter(f); assert.equal(c.length, 1, at + "cần đúng một lựa chọn thoả điều kiện, có " + c.length + ": " + c.join(" | ")); return c[0]; };
// lựa chọn duy nhất có mọi đoạn chữ cho trước (chữ khoá của đáp án theo sách)
const chon = (q, ...has) => motCai(q, (o) => has.every((h) => o.includes(h)));
// ý của câu đúng/sai 4 ý có chữ “…”: trả lời bằng bảng tên ý → đúng/sai (hàm: tính bằng code)
const yCo = (q, has) => { const i = q.o.findIndex((o) => o.includes(has)); assert.ok(i >= 0, "không thấy ý có “" + has + "”"); assert.equal(q.o.filter((o) => o.includes(has)).length, 1, "nhiều ý có “" + has + "”"); return i; };
const traY = (q, bang) => { const r = q.o.map(() => undefined); Object.entries(bang).forEach(([has, v]) => { const i = yCo(q, has); assert.equal(r[i], undefined, "hai mục cùng khớp ý " + (i + 1)); r[i] = typeof v === "function" ? v(q.o[i]) : v; });
  assert.ok(r.every((v) => typeof v === "boolean"), "mọi ý đều có trong bảng"); return r; };

/* ---------- trình tự thời gian (bảng ngày tháng theo sách Lịch sử 11, 12 Kết nối tri thức in năm 2026) ----------
   Mỗi sự kiện: [chữ nhận ra trong đề bài, ý, lựa chọn; ngày dạng YYYY-MM-DD, YYYY-MM hay YYYY để so; cách ghi ngày như sách (ghi trong lời
   giải); sách và trang in]. Năm trước Công nguyên ghi số âm (“-0040” là năm 40 trước Công nguyên không dùng; năm Công nguyên ghi 4 chữ số). */
const SU_KIEN = [
  // Lịch sử 12, Bài 9 (tr. 55–57)
  ["đánh vào vùng biên giới thuộc tỉnh an giang", "1977-04-30", "30 – 4 – 1977", "LS12 tr. 55"],
  ["tuyên bố về lãnh hải và các vùng biển", "1977-05-12", "12 – 5 – 1977", "LS12 tr. 57"],
  ["phnôm pênh (cam-pu-chia) được giải phóng", "1979-01-07", "7 – 1 – 1979", "LS12 tr. 55"],
  ["đánh vào sáu tỉnh biên giới phía bắc", "1979-02-17", "17 – 2 – 1979", "LS12 tr. 56"],
  // các ý về thời gian của kho Lịch sử 12 cùng chủ đề (dò lộ ở đề “Ôn chủ đề”): ngày ghi như lời giải của kho
  ["khởi nghĩa ở huế", "1945-08-23", "23 – 8", "LS12 tr. 33"],
  ["khởi nghĩa ở sài gòn", "1945-08-25", "25 – 8", "LS12 tr. 33"],
  ["khởi nghĩa ở hà nội", "1945-08-19", "19 – 8", "LS12 tr. 33"],
  ["đồng nai thượng và hà tiên giành chính quyền", "1945-08-28", "28 – 8", "LS12 tr. 33"],
  ["lễ đọc tuyên ngôn độc lập", "1945-09-02", "2 – 9 – 1945", "LS12 tr. 34"],
  ["chiến dịch điện biên phủ", "1954-03-13", "13 – 3 – 1954", "LS12 tr. 44"],
  ["kế hoạch na-va", "1953-07", "7 – 1953", "LS12 tr. 43"],
  ["chiến dịch tây bắc", "1952-10", "thu – đông năm 1952", "LS12 tr. 42"],
  ["chiến dịch hoà bình", "1951-12", "đông – xuân 1951 – 1952", "LS12 tr. 42"],
  ["chiến dịch huế – đà nẵng", "1975-03", "3 – 1975", "LS12 tr. 50"],
  ["chiến dịch hồ chí minh", "1975-04", "4 – 1975", "LS12 tr. 51"],
  ["lập việt nam quang phục hội", "1912", "năm 1912", "LS12 tr. 76"],
  ["phan châu trinh sang pháp", "1911", "năm 1911", "LS12 tr. 76"],
  ["lập hội liên hiệp thuộc địa", "1921", "năm 1921", "LS12 tr. 77"],
  ["nguyễn ái quốc đến liên xô", "1923-06", "6 – 1923", "LS12 tr. 77"],
];
const suKien = (s) => { const m = SU_KIEN.filter(([k]) => s.toLowerCase().includes(k.toLowerCase())); assert.equal(m.length, 1, "không nhận ra đúng một sự kiện: " + s); return m[0]; };
const namCua = (sk) => +sk[1].slice(0, 4);
// câu sắp xếp trình tự thời gian dạng nhiều lựa chọn: đề bài “… 1. A; 2. B; 3. C; 4. D.”, lựa chọn là thứ tự “2, 1, 4, 3”
const dsSuKien = (q) => { const m = /1\. (.+?); 2\. (.+?); 3\. (.+?)(?:; 4\. (.+?))?\.$/.exec(q.q); assert.ok(m, "đề bài liệt kê sự kiện “1. …; 2. …; 3. ….”"); return m.slice(1).filter(Boolean); };
const thuTu = (q) => {
  const ds = dsSuKien(q), sk = ds.map(suKien);
  assert.equal(new Set(sk.map((s) => s[1])).size, sk.length, "các sự kiện khác ngày nhau");
  sk.forEach((s) => coX(q, s[2]));
  const dung = sk.map((s, i) => [s[1], i + 1]).sort((a, b) => (a[0] < b[0] ? -1 : 1)).map((x) => x[1]).join(", ");
  q.o.forEach((o) => assert.ok(/^\d(, \d){2,3}$/.test(o) && o.split(", ").map(Number).sort().join() === ds.map((_, i) => i + 1).join(), "lựa chọn là một thứ tự của các sự kiện: " + o));
  return dung;
};
// ý “A diễn ra trước B.”, “A và B cách nhau N năm.”: tính lại bằng bảng; lời giải ghi ngày của cả hai sự kiện
const yThoiGian = (q, o) => {
  let m = /^(.+) diễn ra trước (.+)\.$/.exec(o);
  if (m) { const a = suKien(m[1]), b = suKien(m[2]); coX(q, a[2], b[2]); return a[1] < b[1]; }
  m = /^(.+) và (.+) cách nhau (\d+) năm\.$/.exec(o);
  if (m) { const a = suKien(m[1]), b = suKien(m[2]); coX(q, a[2], b[2]); return Math.abs(namCua(a) - namCua(b)) === +m[3]; }
  return undefined;
};

/* ---------- bảng ý đúng/sai và chữ khoá theo sách (ghi trong từng mục RIENG) ---------- */
// (bảng riêng của từng đề ở RIENG)

/* ---------- các mục kiểm tra của từng đề (RIENG; phiên thêm đề thì thêm một khoá mới) ----------
   has: đoạn chữ của đề bài; right(q, d): đáp án tính bằng code hay so với bảng, d là chữ của đoạn tư liệu (rỗng nếu câu không có): câu nhiều
   lựa chọn trả về lựa chọn đúng, câu đúng/sai 4 ý trả về mảng 4 ý. */
const RIENG = {
  "lichsu12-tn-de1": [
    { has: "thuộc trào lưu nào", right: (q) => chon(q, "Ánh sáng") },
    { has: "được giải quyết triệt để hơn", right: (q) => chon(q, "dân nghèo thành thị") },
    { has: "diễn ra năm 1511", right: (q) => chon(q, "Ma-lắc-ca") },
    { has: "Từ trường hợp của Xiêm", right: (q) => chon(q, "ngoại giao mềm dẻo") },
    { has: "thường chọn đi qua Biển Đông", right: (q) => chon(q, "ngắn nhất") },
    { has: "thời Minh Mạng, triều đình cử thuỷ quân", right: (q) => chon(q, "liên tục") },
    { has: "thông qua năm 1948", right: (q) => chon(q, "Nhân quyền") },
    { has: "nhiều cơ chế hợp tác khu vực ra đời", right: (q) => chon(q, "đối thoại") },
    { has: "Năm 1994, ASEAN lập ra diễn đàn", right: (q) => chon(q, "ARF") },
    { has: "thông qua năm 2003", right: (q) => chon(q, "Ba-li II") },
    { has: "xuất phát từ bên ngoài", right: (q) => chon(q, "cường quốc") },
    { has: "Đại hội Quốc dân họp ở Tân Trào", right: (q) => chon(q, "10 chính sách") },
    { has: "kí ngày 28 – 2 – 1946", right: (q) => chon(q, "Hoa – Pháp") },
    { has: "thắng lợi ở Ấp Bắc", right: (q) => chon(q, "Trực thăng vận") },
    { has: "Trung Quốc đưa quân đánh vào sáu tỉnh", right: (q) => thuTu(q) },
    { has: "việc đổi mới về chính trị", right: (q) => chon(q, "vững chắc") },
    { has: "mô hình quản lí kinh tế", right: (q) => chon(q, "định hướng xã hội chủ nghĩa", "Từ tập trung") },
    { has: "thành tựu đối ngoại của công cuộc Đổi mới", right: (q) => chon(q, "quan hệ ngoại giao") },
    { has: "do Phan Bội Châu khởi xướng", right: (q) => chon(q, "Đông du") },
    { has: "kết hợp đấu tranh quân sự với đấu tranh ngoại giao", right: (q) => chon(q, "Vừa đánh") },
    { has: "Hiệp ước biên giới trên đất liền", right: (q) => chon(q, "thương lượng") },
    { has: "Ngày 5 – 6 – 1911", right: (q) => chon(q, "Nhà Rồng") },
    { has: "Tháng 8 – 1942", right: (q) => chon(q, "Đồng minh") },
    { has: "kỉ niệm ngày sinh Chủ tịch Hồ Chí Minh", right: (q) => chon(q, "di tích") },
    { has: "các mục tiêu phát triển của Liên hợp quốc", right: (q) => traY(q, { "không chỉ trong lĩnh vực chính trị": true, "được thông qua trước Tuyên bố": false,
      "điều phối hợp tác quốc tế": true, "chỉ những nước nghèo": false }) },
    { has: "khởi nghĩa giành chính quyền ở Hà Nội", right: (q, d) => traY(q, { "trong một ngày": d.includes("từ sáng sớm") && d.includes("Đến tối"), "do đối phương tổ chức": d.includes("ủng hộ chính phủ thân Nhật"),
      "chủ yếu bằng lực lượng chính trị": d.includes("có tự vệ đi cùng"), "không ảnh hưởng gì": false }) },
    { has: "ba chặng đường Đổi mới", right: (q, d) => traY(q, { "giai đoạn khởi đầu": d.includes("Giai đoạn đầu (1986 – 1995)"), "ngay từ giai đoạn đầu": /Giai đoạn đầu[^.]*tri thức/.test(d),
      "đóng cửa": false, "phạm vi hội nhập ngày càng mở rộng": true }) },
    { has: "cuộc thương lượng ở Pa-ri", right: (q, d) => traY(q, { "bốn bên tham gia ngay": !d.includes("Từ ngày 25 – 1 – 1969, hội nghị có bốn bên"), "vị thế quốc tế": true,
      "gắn chặt với thắng lợi trên chiến trường": d.includes("Mỹ phải trở lại thương lượng"), "nhanh chóng đi đến thoả thuận": !d.includes("gần năm năm") }) }
  ],
  "lichsu12-tn-de2": [
    { has: "Cuối năm 1922, ở thủ đô Mát-xcơ-va", right: (q) => chon(q, "Tuyên ngôn thành lập") },
    { has: "lâm vào khủng hoảng rồi sụp đổ", right: (q) => chon(q, "máy móc") },
    { has: "Lý Thường Kiệt đánh tan quân Tống", right: (q) => chon(q, "Như Nguyệt") },
    { has: "Nhà Hồ có thành cao", right: (q) => chon(q, "lòng dân") },
    { has: "Chính sách hạn điền", right: (q) => chon(q, "Hạn chế sở hữu") },
    { has: "Điểm giống nhau giữa cuộc cải cách của Lê Thánh Tông", right: (q) => chon(q, "tập trung cao độ") },
    { has: "đều có một phiếu bầu", right: (q) => chon(q, "Bình đẳng") },
    { has: "Năm 1949, Mỹ cùng nhiều nước Tây Âu", right: (q) => chon(q, "Bắc Đại Tây Dương") },
    { has: "Năm 1963, Ma-lai-xi-a", right: (q) => chon(q, "MAPHILINDO") },
    { has: "trong mười năm tiếp theo", right: (q) => chon(q, "2025") },
    { has: "Tầm nhìn ASEAN 2020", right: (q) => chon(q, "Phác hoạ") },
    { has: "tập dượt trực tiếp", right: (q) => chon(q, "kháng Nhật") },
    { has: "Cuộc chiến đấu mở đầu diễn ra ở đâu", right: (q) => chon(q, "vĩ tuyến 16") },
    { has: "phối hợp với quân dân Lào", right: (q) => chon(q, "Nam Lào") },
    { has: "vừa xây dựng lực lượng dân quân", right: (q) => chon(q, "Gắn xây dựng") },
    { has: "chặng đường Đổi mới bắt đầu từ năm 2006", right: (q) => chon(q, "đang phát triển") },
    { has: "hợp tác về quân sự với hơn 100 quốc gia", right: (q) => chon(q, "quốc phòng") },
    { has: "Bạn Minh cần một dẫn chứng", right: (q) => chon(q, "Xuất khẩu") },
    { has: "tình hữu nghị với nhân dân các nước", right: (q) => chon(q, "Bảo vệ hoà bình") },
    { has: "về biến đổi khí hậu", right: (q) => chon(q, "Ki-ô-tô") },
    { has: "Lễ hội pháo hoa quốc tế Đà Nẵng", right: (q) => chon(q, "giao lưu văn hoá") },
    { has: "(tháng 2 – 1951), Hồ Chí Minh được bầu", right: (q) => chon(q, "Chủ tịch Ban Chấp hành") },
    { has: "Đường Kách mệnh", right: (q) => chon(q, "đảng cách mạng") },
    { has: "Nhà văn hoá kiệt xuất", right: (q) => chon(q, "tác phẩm") },
    { has: "những dấu hiệu hoà hoãn", right: (q, d) => traY(q, { "Tháng 5 – 1972, Tổng thống Mỹ": d.includes("Tháng 5 – 1972, Tổng thống Mỹ Ních-xơn sang thăm Liên Xô"),
      "chấm dứt hẳn việc chạy đua": !d.includes("vẫn chạy đua vũ trang"), "xu thế hoà hoãn": true, "chỉ có các nước xã hội chủ nghĩa": !d.includes("cùng Mỹ, Ca-na-đa") }) },
    { has: "Việt Bắc cuối năm 1947", right: (q, d) => traY(q, { "Mục tiêu của quân Pháp": d.includes("hòng phá cơ quan đầu não kháng chiến và đánh tan bộ đội chủ lực"),
      "chủ yếu đánh phòng ngự": !d.includes("không đánh trực diện"), "địa hình hiểm trở": true, "bảo vệ an toàn": d.includes("các cơ quan lãnh đạo kháng chiến vẫn an toàn") }) },
    { has: "câu chuyện của ông Tư", right: (q, d) => traY(q, { "hầu như không đổi": false, "bắt đầu đủ ăn": +/đến năm (\d{4}), chúng tôi đã đủ gạo/.exec(d)[1] > 1986,
      "giao ruộng cho từng hộ": d.includes("Từ khi ruộng được giao hẳn cho từng hộ, cả nhà dốc sức làm ăn"), "chỉ có ở thành phố": false }) },
    { has: "bản Tuyên ngôn Độc lập", right: (q, d) => traY(q, { "đọc tại Quảng trường Ba Đình": d.includes("tại Quảng trường Ba Đình, Người đọc"), "Việc trích dẫn tuyên ngôn": true,
      "lấy lại nước từ tay thực dân Pháp": !d.includes("từ phát xít Nhật, không phải từ thực dân Pháp"), "chỉ hướng tới nhân dân trong nước": !d.includes("trước toàn thế giới") }) }
  ],
  "lichsu12-tn-de3": [
    { has: "Năm 1868, cuộc cải cách nào ở Nhật Bản", right: (q) => chon(q, "Minh Trị") },
    { has: "Chiếm lấy phố Uôn", right: (q) => chon(q, "giàu nghèo") },
    { has: "Rạch Gầm – Xoài Mút", right: (q) => chon(q, "Xiêm") },
    { has: "Khâm Châu, Liêm Châu, Ung Châu", right: (q) => chon(q, "tiến công trước") },
    { has: "giữ vai trò then chốt trong việc giữ an ninh trên biển", right: (q) => chon(q, "kiểm soát giao thông") },
    { has: "Một nhóm học sinh lớp 12 muốn làm điều gì đó có ích", right: (q) => chon(q, "tư liệu chính xác") },
    { has: "Chiến tranh Triều Tiên (1950 – 1953)", right: (q) => chon(q, "chiến tranh cục bộ") },
    { has: "(11 – 1989)", right: (q) => chon(q, "Béc-lin") },
    { has: "nằm trong xu thế nào", right: (q) => chon(q, "Liên kết khu vực") },
    { has: "chốt lộ trình sáu năm (2009 – 2015)", right: (q) => chon(q, "Thái Lan") },
    { has: "Tầm nhìn ASEAN 2020 được thông qua năm 1997", right: (q) => chon(q, "Ma-lai-xi-a") },
    { has: "bị Mỹ thả bom nguyên tử", right: (q) => chon(q, "Na-ga-xa-ki") },
    { has: "ranh giới quân sự tạm thời giữa hai miền", right: (q) => chon(q, "17") },
    { has: "Vạn Tường (Quảng Ngãi) tháng 8 – 1965", right: (q) => chon(q, "khả năng đánh thắng") },
    { has: "Tháng 3 – 1988", right: (q) => chon(q, "Gạc Ma") },
    { has: "mong muốn làm bạn với mọi nước", right: (q) => chon(q, "Đa phương hoá") },
    { has: "Chỉ số phát triển con người (HDI)", right: (q) => chon(q, "Tuổi thọ") },
    { has: "góp phần tiếp nối những gì đất nước đạt được", right: (q) => chon(q, "ngoại ngữ") },
    { has: "Tháng 7 – 1995", right: (q) => chon(q, "Đông Nam Á") },
    { has: "Diễn đàn Hợp tác Á – Âu. Diễn đàn này", right: (q) => chon(q, "ASEM") },
    { has: "ưu tiên hợp tác về kinh tế, quốc phòng – an ninh", right: (q) => chon(q, "phát triển đất nước") },
    { has: "Tháng 6 – 1945, theo chỉ thị", right: (q) => chon(q, "Khu Giải phóng") },
    { has: "chọn Cao Bằng", right: (q) => chon(q, "hiểm trở") },
    { has: "Việc làm nào sau đây của học sinh thể hiện điều đó", right: (q) => chon(q, "Tiết kiệm") },
    { has: "những trung tâm kinh tế mới", right: (q, d) => { const m = /gấp khoảng (\d+) lần Trung Quốc vào năm 2000, đến năm 2021 chỉ còn hơn (\d+),(\d+) lần/.exec(d);
      return traY(q, { "thu hẹp từ năm 2000": +m[1] > +(m[2] + "." + m[3]), "trật tự thế giới đơn cực": false, "nhiều trung tâm kinh tế": true, "tự mình giải quyết": !d.includes("không quốc gia nào có thể tự mình giải quyết") }); } },
    { has: "cuộc tiến công năm 1972", right: (q, d) => traY(q, { "mở đầu ở Quảng Trị": d.includes("mở cuộc tiến công lớn vào Quảng Trị, rồi phát triển"), "đánh phá miền Bắc trở lại": d.includes("Để cứu vãn tình thế"),
      "chỉ diễn ra trên một hướng": !d.includes("ba phòng tuyến mạnh của đối phương ở ba hướng"), "đã đạt được mục tiêu": false }) },
    { has: "hội nhập quốc tế của Việt Nam trên nhiều lĩnh vực", right: (q, d) => traY(q, { "cả trong lĩnh vực y tế": ["y tế", "môi trường", "văn hoá"].every((x) => d.includes(x)),
      "hoàn toàn nhờ tự nghiên cứu": !d.includes("Nhờ mở rộng hợp tác quốc tế"), "chất độc hoá học tồn lưu": d.includes("tồn lưu sau chiến tranh"), "biết đến Việt Nam nhiều hơn": d.includes("giúp bạn bè thế giới hiểu thêm") }) },
    { has: "những người lính mũ nồi xanh", right: (q, d) => traY(q, { "từ trước năm 2000": +/Năm (\d{4}), Việt Nam lần đầu cử/.exec(d)[1] < 2000, "làm nhiệm vụ ở Nam Xu-đăng": d.includes("lên đường làm nhiệm vụ ở Nam Xu-đăng"),
      "chỉ làm nhiệm vụ quân sự": !d.includes("dạy chữ cho trẻ em"), "thành viên tích cực": true }) }
  ],
  "lichsu12-tn-de4": [
    { has: "Từ tháng 12 – 1978, Trung Quốc", right: (q) => chon(q, "mở cửa") },
    { has: "khẳng định chủ nghĩa xã hội vẫn có sức sống", right: (q) => chon(q, "Những thành tựu mà các nước") },
    { has: "những nước nào sau đây ở Đông Nam Á đã tuyên bố độc lập", right: (q) => chon(q, "In-đô-nê-xi-a, Việt Nam, Lào") },
    { has: "Chính sách “chia để trị”", right: (q) => chon(q, "đoàn kết các dân tộc") },
    { has: "Đô ty, Thừa ty, Hiến ty", right: (q) => chon(q, "cát cứ") },
    { has: "quan hệ cha – con, anh – em ruột", right: (q) => chon(q, "hồi ty") },
    { has: "Nhật Bản và các nước Tây Âu vươn lên mạnh mẽ", right: (q) => chon(q, "trung tâm kinh tế") },
    { has: "ra đời năm 1999", right: (q) => chon(q, "G20") },
    { has: "Năm 1971, ASEAN ra tuyên bố", right: (q) => chon(q, "trung lập") },
    { has: "ASEAN 5 (1967) đến ASEAN 10 (1999)", right: (q) => chon(q, "giữ ổn định") },
    { has: "ba trụ cột nào sau đây", right: (q) => chon(q, "Chính trị – An ninh, Kinh tế, Văn hoá – Xã hội") },
    { has: "Ngày 16 – 8 – 1945, từ Tân Trào", right: (q) => chon(q, "Thái Nguyên") },
    { has: "Năm 1952, ở vùng tự do", right: (q) => chon(q, "tiết kiệm") },
    { has: "Ở Bến Tre (nay thuộc tỉnh Vĩnh Long)", right: (q) => chon(q, "tóc dài") },
    { has: "Tháng 2 – 1979, khi quân Trung Quốc tấn công", right: (q) => chon(q, "đánh nhanh, thắng nhanh") },
    { has: "đường lối Đổi mới đề ra nhiệm vụ nào", right: (q) => chon(q, "lạm phát") },
    { has: "đổi mới kinh tế, đồng thời đổi mới về chính trị", right: (q) => chon(q, "toàn diện, đồng bộ") },
    { has: "đưa nông sản sang thị trường châu Âu", right: (q) => chon(q, "hiệp định thương mại tự do") },
    { has: "Năm 1908, Phan Bội Châu cùng những người yêu nước", right: (q) => chon(q, "Đông Á") },
    { has: "Tháng 4 – 1970, sự kiện nào", right: (q) => chon(q, "cấp cao") },
    { has: "lên đối tác chiến lược toàn diện. Điều đó cho thấy", right: (q) => chon(q, "coi trọng, tin cậy") },
    { has: "Cuối năm 1920, Nguyễn Ái Quốc đứng về phía", right: (q) => chon(q, "đầu tiên vào hàng ngũ cộng sản") },
    { has: "quan hệ Liên Xô – Trung Quốc căng thẳng", right: (q) => chon(q, "hàn gắn") },
    { has: "Bác Hồ trong trái tim chúng em", right: (q) => chon(q, "bài thơ viết về Người") },
    { has: "sự ra đời của Liên hợp quốc. Mỗi ý", right: (q, d) => { const a = +/với (\d+) nước thành viên/.exec(d)[1], b = +/có (\d+) nước thành viên/.exec(d)[1];
      return traY(q, { "Hội Quốc liên được thành lập sau": +/Hội Quốc liên ra đời năm (\d{4})/.exec(d)[1] > 1945, "được kí sau khi": +/ngày 1 – 1 – (\d{4}), đại diện/.exec(d)[1] > 1945,
        "gần gấp bốn lần": b / a > 3.5 && b / a < 4, "giữ vai trò chủ chốt": d.includes("lãnh đạo Liên Xô, Mỹ, Anh") && d.includes("ba nước đi tới quyết định thành lập Liên hợp quốc") }); } },
    { has: "giữ gìn chủ quyền biển đảo từ năm 1975. Mỗi ý", right: (q, d) => { const pc = +/Năm (\d{4}), Việt Nam phê chuẩn/.exec(d)[1], lb = +/thông qua năm (\d{4})/.exec(d)[1];
      return traY(q, { "Năm 1994, Việt Nam phê chuẩn": pc === 1994, "được thông qua trước khi": lb < pc, "dùng sức mạnh quân sự": !d.includes("Việt Nam kiên trì thương lượng hoà bình"),
        "thực thi chủ quyền": /Năm \d{4}, Chính phủ lập đơn vị hành chính ở hai quần đảo/.test(d) && d.includes("đưa người dân ra định cư trên đảo") }); } },
    { has: "tăng trưởng kinh tế thời kì Đổi mới. Mỗi ý", right: (q, d) => { const m = /chỉ còn (\d+),(\d+)% và (\d+),(\d+)%/.exec(d), a20 = +(m[1] + "." + m[2]), a21 = +(m[3] + "." + m[4]);
      return traY(q, { "hơn 400 tỉ USD": +/đạt khoảng (\d+) tỉ USD/.exec(d)[1] > 400, "chủ yếu do đại dịch": d.includes("đại dịch COVID-19 lan rộng, tốc độ tăng GDP chỉ còn"),
        "GDP của Việt Nam giảm": !(a20 > 0 && a21 > 0), "năm 2021 thấp hơn năm 2020": a21 < a20 }); } },
    { has: "những dấu ấn về Bác Hồ trên quê hương. Mỗi ý", right: (q, d) => traY(q, { "chỉ có con đường trên bộ": !d.includes("con đường trên biển"),
      "sức người, sức của": d.includes("sức người, vũ khí, lương thực từ hậu phương lớn"), "tự lập đền thờ cho thấy": d.includes("nhân dân còn tự lập đền thờ"),
      "không chỉ ở Thủ đô": +/đã có (\d+) chi nhánh ở nhiều địa phương/.exec(d)[1] > 1 }) }
  ],
  // Phiên N12-tn-lichsu-b: Đề 5–8
  "lichsu12-tn-de5": [
    { has: "13 thuộc địa Anh ở Bắc Mỹ", right: (q) => chon(q, "chủ nô") },
    { has: "Việc thống nhất I-ta-li-a và nước Đức", right: (q) => chon(q, "chia cắt") },
    { has: "mới chiếm được Miến Điện", right: (q) => chon(q, "dân Anh") },
    { has: "hướng về xuất khẩu và đạt tốc độ tăng trưởng cao", right: (q) => chon(q, "thị trường thế giới") },
    { has: "chế độ quân điền thời vua Lê Thánh Tông", right: (q) => chon(q, "yếu thế") },
    { has: "Vua Minh Mạng bỏ Bắc Thành", right: (q) => chon(q, "gọn nhẹ") },
    { has: "UNCTAD", right: (q) => chon(q, "thương mại") },
    { has: "trật tự thế giới đa cực", right: (q) => chon(q, "chi phối") },
    { has: "Cam-pu-chia trở thành thành viên thứ mười", right: (q) => chon(q, "Hà Nội") },
    { has: "Cộng đồng Văn hoá – Xã hội ASEAN", right: (q) => chon(q, "Phúc lợi") },
    { has: "Cộng đồng Kinh tế ASEAN (AEC)", right: (q) => chon(q, "Kế thừa") },
    { has: "Cách mạng tháng Tám năm 1945 đã mở ra", right: (q) => chon(q, "kỉ nguyên") },
    { has: "Quyết tử để Tổ quốc quyết sinh", right: (q) => chon(q, "Cảm tử") },
    { has: "kế hoạch Xta-lây – Tay-lo", right: (q) => chon(q, "bình định") },
    { has: "“từ sớm, từ xa”", right: (q) => chon(q, "ngăn ngừa") },
    { has: "1996 – 2006, công cuộc Đổi mới về chính trị", right: (q) => chon(q, "pháp quyền") },
    { has: "Tỉnh K đầu tư tu bổ di tích", right: (q) => chon(q, "sức mạnh nội sinh") },
    { has: "khoa học – công nghệ nước ta", right: (q) => chon(q, "làm chủ") },
    { has: "Phan Bội Châu đã cho người bắt liên lạc", right: (q) => chon(q, "Công sứ Đức") },
    { has: "Chỉ thị Kháng chiến kiến quốc", right: (q) => chon(q, "tương trợ") },
    { has: "lễ chào cột mốc", right: (q) => chon(q, "hữu nghị") },
    { has: "Nguyễn Ái Quốc đã sáng lập tờ báo", right: (q) => chon(q, "Thanh niên") },
    { has: "“người cầm lái”", right: (q) => chon(q, "dẫn dắt") },
    { has: "bịa đặt, xuyên tạc", right: (q) => chon(q, "nguồn chính thống") },
    { has: "quan hệ giữa Liên Xô và Mỹ cuối Chiến tranh lạnh", right: (q, d) => traY(q, { "đồng ý loại bỏ": d.includes("Năm 1987, hai bên đồng ý loại bỏ toàn bộ tên lửa tầm trung"),
      "chỉ đối thoại về quân sự": !["kinh tế", "thương mại", "khoa học"].some((x) => d.includes(x)), "chiến tranh trực tiếp": !d.includes("tuyên bố Chiến tranh lạnh đã kết thúc"),
      "đang suy yếu": true }) },
    { has: "những tỉnh lị giành chính quyền đầu tiên", right: (q, d) => traY(q, { "đều thuộc Bắc Bộ": !["Hà Tĩnh", "Quảng Nam"].some((t) => d.includes(t)),
      "chờ khởi nghĩa ở Thủ đô": !d.includes("Sớm nhất cả nước"), "nổ ra trước khi Nhật Bản": !d.includes("Ngay khi có tin Nhật Bản đầu hàng"),
      "góp phần cổ vũ": d.includes("cổ vũ các địa phương khác") }) },
    { has: "câu chuyện của ông Hoà", right: (q, d) => traY(q, { "bán ra nước ngoài": !d.includes("bán trong nước"), "đổi mới cơ chế quản lí": d.includes("các hộ được tự tổ chức sản xuất"),
      "mở rộng thị trường": d.includes("xuất khẩu sang Nhật Bản, châu Âu"), "khi gia đình ông Hoà bán hàng qua mạng": !d.includes("Đầu những năm 2000, gốm của làng bắt đầu theo các công ty xuất khẩu") }) },
    { has: "những người nước ngoài viết, vẽ về Hồ Chí Minh", right: (q, d) => traY(q, { "đã gặp Nguyễn Ái Quốc": d.includes("Năm 1923") && d.includes("gặp Nguyễn Ái Quốc"),
      "dấu ấn của Hồ Chí Minh": true, "theo đặt hàng": !d.includes("tự nguyện vẽ chân dung"), "chỉ được người nước ngoài biết đến": +/Năm (\d{4}), ở Mát-xcơ-va/.exec(d)[1] > 1945 }) }
  ],
  "lichsu12-tn-de6": [
    { has: "Đại hội Xô viết toàn Nga lần thứ hai", right: (q) => chon(q, "Lê-nin") },
    { has: "đã thành một hệ thống thế giới", right: (q) => chon(q, "nhiều châu lục") },
    { has: "Năm 938, trên sông Bạch Đằng", right: (q) => chon(q, "Nam Hán") },
    { has: "Triệu Đà giả vờ giảng hoà", right: (q) => chon(q, "cảnh giác") },
    { has: "vai trò quan trọng về quốc phòng, an ninh", right: (q) => chon(q, "lá chắn") },
    { has: "một vùng biển còn tranh chấp", right: (q) => chon(q, "luật pháp quốc tế") },
    { has: "cứ mỗi mười năm", right: (q) => chon(q, "phát triển chung") },
    { has: "trở thành nước trung lập", right: (q) => chon(q, "Phần Lan") },
    { has: "hội nghị cấp cao lần thứ 37", right: (q) => chon(q, "kinh tế số") },
    { has: "tăng cường quan hệ với đối tác ngoài khu vực", right: (q) => chon(q, "dẫn dắt") },
    { has: "triển vọng của Cộng đồng ASEAN", right: (q) => chon(q, "Gắn bó mật thiết hơn") },
    { has: "Đảng triệu tập Hội nghị toàn quốc", right: (q) => chon(q, "đối nội, đối ngoại") },
    { has: "tối hậu thư", right: (q) => chon(q, "giải tán") },
    { has: "kéo dài bao nhiêu năm", right: (q) => { const m = /từ năm (\d{4}).* vào năm (\d{4})/.exec(q.q); return motCai(q, (o) => o === m[2] - m[1] + " năm"); } },
    { has: "sức mạnh dân tộc được coi là yếu tố quyết định", right: (q) => chon(q, "tự lực, tự cường") },
    { has: "một mục tiêu kinh tế của đường lối đổi mới", right: (q) => chon(q, "tích luỹ") },
    { has: "chính quyền và các đoàn thể được đổi mới", right: (q) => chon(q, "làm chủ thật sự") },
    { has: "Một trường học tổ chức cho học sinh", right: (q) => chon(q, "con người toàn diện") },
    { has: "là một phân bộ của tổ chức nào", right: (q) => chon(q, "Quốc tế Cộng sản") },
    { has: "mở rộng hoạt động đối ngoại ra nhiều hướng", right: (q) => chon(q, "thương lượng") },
    { has: "đàm phán về ranh giới trên biển", right: (q) => chon(q, "Phi-líp-pin") },
    { has: "Chủ nhiệm kiêm chủ bút", right: (q) => chon(q, "Người cùng khổ") },
    { has: "Chương trình cứu nước của Việt Minh", right: (q) => chon(q, "dân cũng phải") },
    { has: "lối sống giản dị, gần gũi", right: (q) => chon(q, "không chạy theo") },
    { has: "hạn chế vũ khí giết người hàng loạt", right: (q, d) => { const nam = (ten) => +new RegExp(escRe(ten) + " \\((\\d{4})\\)").exec(d)[1];
      return traY(q, { "đều được thông qua dưới sự bảo trợ": d.includes("Dưới sự bảo trợ của Liên hợp quốc"),
        "ra đời trước Hiệp ước cấm phổ biến": nam("Công ước cấm vũ khí hoá học") < nam("Hiệp ước cấm phổ biến vũ khí hạt nhân"),
        "chỉ quan tâm tới vũ khí hạt nhân": !d.includes("vũ khí hoá học"), "mỗi nước tự quyết định": !d.includes("loại bỏ hẳn") }); } },
    { has: "cả nước hướng về Nam Bộ", right: (q, d) => traY(q, { "chỉ kháng chiến khi có quân Đồng minh": !d.includes("quân dân Nam Bộ chặn đánh"),
      "được tổ chức từ miền Bắc và miền Trung": d.includes("ở miền Bắc, miền Trung xung phong gia nhập các đoàn quân “Nam tiến”"),
      "bắt đầu sau ngày cả nước bước vào kháng chiến toàn quốc": !d.includes("Hơn một năm sau, khi Pháp mở rộng chiến tranh ra cả nước, cuộc kháng chiến toàn quốc mới bùng nổ"),
      "tinh thần đoàn kết": true }) },
    { has: "Mục tiêu phát triển Thiên niên kỉ. Mỗi ý", right: (q, d) => traY(q, { "đã hoàn thành mọi Mục tiêu": !d.includes("vẫn đòi hỏi nhiều nỗ lực"),
      "chỉ được đặt ra cho riêng Việt Nam": !d.includes("cùng các nước thành viên"), "thành tựu về đời sống xã hội": true,
      "chỉ lo các mục tiêu về kinh tế": !["giáo dục", "sức khoẻ"].every((x) => d.includes(x)) }) },
    { has: "Bác Hồ ở chiến khu Việt Bắc", right: (q, d) => traY(q, { "lãnh đạo kháng chiến ở chiến khu Việt Bắc": d.includes("Đầu năm 1947") && d.includes("lên chiến khu Việt Bắc"),
      "sâu sát với chiến trường": d.includes("trực tiếp ra mặt trận"), "vừa vạch đường lối": true,
      "họp sau khi cuộc kháng chiến chống Pháp kết thúc": +/Tháng 2 – (\d{4}), ở Tuyên Quang, Đại hội/.exec(d)[1] > 1954 }) }
  ],
  "lichsu12-tn-de7": [
    { has: "được thành lập vào tháng 12 – 1975", right: (q) => chon(q, "Lào") },
    { has: "Cu-ba vẫn xây dựng được nền giáo dục, y tế", right: (q) => chon(q, "ngay cả khi") },
    { has: "nghĩa quân của Pu-côm-bô", right: (q) => chon(q, "Trương Quyền") },
    { has: "các đảng cộng sản lần lượt ra đời", right: (q) => chon(q, "xu hướng vô sản") },
    { has: "lễ Khao lề thế lính Hoàng Sa", right: (q) => chon(q, "Tri ân") },
    { has: "Một tỉnh ven biển vừa phát triển đánh bắt xa bờ", right: (q) => chon(q, "vừa giữ vững") },
    { has: "Uỷ ban Di sản thế giới", right: (q) => chon(q, "UNESCO") },
    { has: "trên lãnh thổ nước Đức", right: (q) => chon(q, "hai khối đối lập") },
    { has: "Việt Nam gia nhập ASEAN (7 – 1995)", right: (q) => chon(q, "triển vọng") },
    { has: "Cộng đồng Văn hoá – Xã hội ASEAN có nền tảng", right: (q) => chon(q, "văn hoá lâu đời") },
    { has: "vị trí thứ mấy", right: (q) => motCai(q, (o) => o === "Thứ năm") },
    { has: "Tính từ khi Đảng Cộng sản Việt Nam ra đời", right: (q) => { const m = /\(năm (\d{4})\).*\(năm (\d{4})\)/.exec(q.q); return motCai(q, (o) => o === m[2] - m[1] + " năm"); } },
    { has: "Kế hoạch Na-va", right: (q) => chon(q, "18 tháng") },
    { has: "Ba năm đầu của “Chiến tranh đặc biệt”", right: (q) => chon(q, "bốn vạn người") },
    { has: "lật đổ chế độ Pôn Pốt", right: (q) => chon(q, "Quyền tự vệ") },
    { has: "trong lĩnh vực quốc phòng, an ninh", right: (q) => chon(q, "môi trường hoà bình") },
    { has: "chính quyền địa phương hai cấp", right: (q) => chon(q, "tinh gọn") },
    { has: "kinh tế quốc doanh và kinh tế tập thể", right: (q) => chon(q, "Nhiều thành phần") },
    { has: "Đảng Cộng sản Đông Dương triển khai nhiều hoạt động đối ngoại", right: (q) => chon(q, "phát xít") },
    { has: "xây dựng quan hệ nào sau đây với Cam-pu-chia", right: (q) => chon(q, "láng giềng hữu nghị") },
    { has: "V. Gô-rơ-bát-cô", right: (q) => chon(q, "Phạm Tuân") },
    { has: "chủ trì vào đầu năm 1930", right: (q) => chon(q, "hợp nhất") },
    { has: "lập mặt trận riêng cho từng nước", right: (q) => chon(q, "quyền tự quyết") },
    { has: "Trước khi chọn con đường cứu nước", right: (q) => chon(q, "thực tế") },
    { has: "nước Mỹ sau Chiến tranh lạnh", right: (q, d) => { const m = /khoảng (\d+) tỉ USD năm 1980 đã tăng lên khoảng (\d+) tỉ USD năm 1990/.exec(d);
      return traY(q, { "chỉ bằng một nửa": +m[2] <= +m[1] / 2, "siêu cường duy nhất": d.includes("Mỹ trở thành siêu cường duy nhất"), "gặp không ít khó khăn": d.includes("Mỹ cũng gặp không ít khó khăn"),
        "thúc đẩy xu thế đa cực": d.includes("nhiều trung tâm cùng tham gia") }); } },
    { has: "miền Nam sau Hiệp định Pa-ri", right: (q, d) => traY(q, { "chấm dứt hẳn mọi viện trợ": !d.includes("tiếp tục viện trợ"),
      "chỉ trong vòng một tháng": !d.includes("kế hoạch hai năm (1975 – 1976)"), "vẫn lấn chiếm vùng giải phóng": d.includes("lấn chiếm vùng giải phóng"),
      "can thiệp bằng quân sự rất hạn chế": d.includes("Mỹ chỉ phản ứng yếu ớt") }) },
    { has: "gia nhập Tổ chức Thương mại Thế giới. Mỗi ý", right: (q, d) => { const nop = +/Năm (\d{4}), Việt Nam nộp đơn/.exec(d)[1], vao = +/ngày 11 – 1 – (\d{4}), Việt Nam chính thức/.exec(d)[1];
      const xk = /từ khoảng (\d+) tỉ USD năm 2006 lên hơn (\d+) tỉ USD năm 2020/.exec(d), ti = +xk[2] / +xk[1];
      return traY(q, { "sau hơn mười năm": vao - nop > 10, "gấp khoảng 7 lần": ti > 6.5 && ti < 7.5, "bảo hộ hoàn toàn": !d.includes("hàng hoá nước ngoài vào thị trường trong nước nhiều hơn"),
        "vừa mở ra cơ hội": true }); } },
    { has: "tháng 9 năm 1969", right: (q, d) => { const mat = /Ngày (\d+) – 9 – (\d{4}), [^.]*Chủ tịch Hồ Chí Minh qua đời/.exec(d), td = /Ngày (\d+) – 9 – 1969, Lễ truy điệu/.exec(d);
      return traY(q, { "đã được hoàn toàn giải phóng": +mat[2] >= 1975, "một tuần sau ngày Người qua đời": +td[1] - +mat[1] === 7,
        "chỉ có nhân dân ở Thủ đô": !d.includes("khắp hai miền"), "phải tạm dừng": !d.includes("đẩy mạnh kháng chiến") }); } }
  ],
  "lichsu12-tn-de8": [
    { has: "Cách mạng Tân Hợi", right: (q) => chon(q, "Thanh") },
    { has: "dù trải qua nhiều cuộc khủng hoảng, chủ nghĩa tư bản", right: (q) => chon(q, "tự điều chỉnh") },
    { has: "trước nguy cơ quân Nguyên xâm lược lần thứ hai", right: (q) => chon(q, "Bình Than") },
    { has: "Quang Trung dừng lại ở Nghệ An", right: (q) => chon(q, "lực lượng chu đáo") },
    { has: "Bộ Quốc triều hình luật", right: (q) => chon(q, "tính nhân đạo") },
    { has: "chữ Nôm được coi trọng", right: (q) => chon(q, "tiếng Việt luôn trong sáng") },
    { has: "bán đảo Triều Tiên", right: (q) => motCai(q, (o) => o === "Vĩ tuyến 38") },
    { has: "Đông Nam Á vẫn được coi là vùng ảnh hưởng", right: (q) => chon(q, "quay lại xâm lược") },
    { has: "ra tuyên bố về sự hoà hợp", right: (q) => motCai(q, (o) => o === "Tuyên bố Ba-li I") },
    { has: "Tuyên bố Băng Cốc (1967) đã nêu mục tiêu", right: (q) => chon(q, "thịnh vượng") },
    { has: "kim ngạch thương mại giữa Việt Nam và các nước ASEAN", right: (q) => { const m = /hơn (\d+) tỉ USD \(năm 2016\) lên hơn (\d+) tỉ USD/.exec(q.q);
      return chon(q, "gấp khoảng " + (m[2] / m[1]).toFixed(1).replace(".", ",") + " lần"); } },
    { has: "quân phiệt Nhật Bản ở nước ta", right: (q) => chon(q, "Gần 5 năm") },
    { has: "biểu dương những anh hùng đầu tiên", right: (q) => chon(q, "Chiến sĩ thi đua") },
    { has: "Điện Biên Phủ trên không", right: (q) => chon(q, "12 ngày đêm") },
    { has: "mặt trận Vị Xuyên", right: (q) => chon(q, "rất ác liệt") },
    { has: "kết hợp sức mạnh trong nước với sức mạnh của thời đại", right: (q) => chon(q, "phân công lao động quốc tế") },
    { has: "tổ an ninh tự quản", right: (q) => chon(q, "thế trận an ninh nhân dân") },
    { has: "247 đảng chính trị", right: (q) => chon(q, "nhiều kênh") },
    { has: "hoạt động ngoại giao của nước ta phải hướng tới", right: (q) => chon(q, "ít kẻ thù") },
    { has: "đẩy mạnh hoạt động đối ngoại trước hết là để", right: (q) => chon(q, "vị thế đất nước") },
    { has: "Việt Nam và Hoa Kỳ đã bình thường hoá quan hệ", right: (q) => chon(q, "Gác lại quá khứ") },
    { has: "làm nhiều nghề vất vả", right: (q) => chon(q, "Tự lập") },
    { has: "khó khăn về tài chính", right: (q) => chon(q, "Tuần lễ vàng") },
    { has: "kí Hiệp định Sơ bộ với Pháp", right: (q) => chon(q, "mưu đồ cấu kết") },
    { has: "Liên hợp quốc với trẻ em ở những vùng khó khăn", right: (q, d) => traY(q, { "chỉ hỗ trợ trẻ em ở những nơi đang có chiến sự": !d.includes("hoặc gặp nhiều khó khăn"),
      "chưa tới 100 triệu": +/khoảng (\d+) triệu trẻ em/.exec(d)[1] < 100, "không thuộc Liên hợp quốc": !d.includes("cơ quan của Liên hợp quốc lo cho người tị nạn"),
      "chăm lo quyền con người": d.includes("quyền lợi của con người") && d.includes("lớp học tạm thời") }) },
    { has: "một chiến dịch ở vùng biên giới năm 1950", right: (q, d) => traY(q, { "biên giới giữa nước ta với Trung Quốc": d.includes("biên giới Việt – Trung"),
      "chỉ tấn công các cứ điểm": !d.includes("chặn đánh"), "bị quân Pháp chiếm đóng": !d.includes("căn cứ địa Việt Bắc được bảo vệ"),
      "hơn ba tháng": !d.includes("gần một tháng") }) },
    { has: "Dân ca Quan họ trong thời kì Đổi mới", right: (q, d) => traY(q, { "trước khi công cuộc Đổi mới bắt đầu": +/Năm (\d{4}), Dân ca Quan họ/.exec(d)[1] < 1986,
      "hội nhập về văn hoá": d.includes("Cộng hoà Séc biểu diễn"), "mất thêm việc làm": !d.includes("tạo thêm việc làm"),
      "chỉ dành cho các nghệ sĩ": !d.includes("dạy hát cho thiếu nhi") }) },
    { has: "bức tượng ở nhà tù Côn Đảo", right: (q, d) => traY(q, { "chính quyền nhà tù đã đưa": !d.includes("các chiến sĩ cách mạng đã bí mật"),
      "tịch thu rồi phá huỷ": !d.includes("cất giữ làm vật kỉ niệm"), "sức lay động": d.includes("Xúc động trước lòng kính yêu"),
      "vẫn giữ bức tượng ở nhà mình": !/Năm \d{4}, người con trai trao tặng/.test(d) }) }
  ],
};

/* ---------- đề và danh mục: số đề, số câu lấy từ danh mục ---------- */
const soDe = (id) => +/de(\d+)$/.exec(id)[1];
const DE = BANKS.filter((b) => /^lichsu12-tn-de\d+$/.test(b.id)).sort((a, b) => soDe(a.id) - soDe(b.id));
assert.ok(DE.length >= 1, "chưa có đề Lịch sử thi thử tốt nghiệp nào trong danh mục");
DE.forEach((b, i) => assert.equal(b.id, "lichsu12-tn-de" + (i + 1), "mã đề phải liên tiếp từ lichsu12-tn-de1"));
const TN = EVENTS.find((e) => e.id === "tn-thpt-2027");
const P1 = "Phần I. Trắc nghiệm nhiều lựa chọn", P2 = "Phần II. Trắc nghiệm đúng sai";
const KHUNG = [[P1, "mc", 24, 0.25], [P2, "tf4", 4, 1]];
// chủ đề lớp 12: đúng chữ chủ đề của ba kho Lịch sử 12 (cuối kì I, giữa kì II, cuối năm), thêm Bài 9 (không có ở kho nào: tên bài rút gọn);
// thứ tự theo bài của sách, sáu chủ đề của sách theo mục lục (README của cuốn ở OnUp-Book)
const KHO = BANKS.filter((b) => b.file === "12-lichsu.js" && b.pool), CD_KHO = new Set(KHO.flatMap((b) => Object.keys(b.pool.matrix)));
const BAI_9 = "Cuộc đấu tranh bảo vệ Tổ quốc từ sau tháng 4 – 1975 đến nay";
const CHU_DE_12 = [["Thế giới trong và sau Chiến tranh lạnh", ["Liên hợp quốc", "Trật tự thế giới trong Chiến tranh lạnh", "Trật tự thế giới sau Chiến tranh lạnh"]],
  ["ASEAN: Những chặng đường lịch sử", ["Sự ra đời và phát triển của Hiệp hội các quốc gia Đông Nam Á", "Cộng đồng ASEAN: Từ ý tưởng đến hiện thực"]],
  ["Cách mạng tháng Tám năm 1945, chiến tranh giải phóng dân tộc và chiến tranh bảo vệ Tổ quốc trong lịch sử Việt Nam (từ tháng 8 năm 1945 đến nay)",
    ["Cách mạng tháng Tám năm 1945", "Cuộc kháng chiến chống thực dân Pháp (1945 – 1954)", "Cuộc kháng chiến chống Mỹ, cứu nước (1954 – 1975)", BAI_9]],
  ["Công cuộc Đổi mới ở Việt Nam từ năm 1986 đến nay", ["Khái quát về công cuộc Đổi mới từ năm 1986 đến nay", "Thành tựu cơ bản và bài học của công cuộc Đổi mới"]],
  ["Lịch sử đối ngoại của Việt Nam thời cận – hiện đại", ["Hoạt động đối ngoại trong đấu tranh giành độc lập dân tộc", "Hoạt động đối ngoại trong kháng chiến chống Pháp và chống Mỹ",
    "Hoạt động đối ngoại của Việt Nam từ năm 1975 đến nay"]],
  ["Hồ Chí Minh trong lịch sử Việt Nam", ["Khái quát cuộc đời và sự nghiệp của Hồ Chí Minh", "Hồ Chí Minh – Anh hùng giải phóng dân tộc",
    "Dấu ấn Hồ Chí Minh trong lòng nhân dân thế giới và Việt Nam"]]];
const BAI = CHU_DE_12.flatMap(([, ts]) => ts), chuDe12 = (t) => CHU_DE_12.findIndex(([, ts]) => ts.includes(t));
assert.equal(BAI.length, 17, "Lịch sử 12 có 17 bài");
assert.deepEqual([...CD_KHO].sort(), BAI.filter((t) => t !== BAI_9).sort(), "chủ đề của ba kho Lịch sử 12 đúng các bài của sách, trừ Bài 9");
// tên bài rút gọn (cho vừa mã đề “Ôn chủ đề”, 80 kí tự) → tên trong mục lục
const RUT_GON = { "Sự ra đời và phát triển của Hiệp hội các quốc gia Đông Nam Á": "Sự ra đời và phát triển của Hiệp hội các quốc gia Đông Nam Á (ASEAN)",
  [BAI_9]: "Cuộc đấu tranh bảo vệ Tổ quốc từ sau tháng 4 – 1975 đến nay. Một số bài học lịch sử của các cuộc kháng chiến bảo vệ Tổ quốc từ năm 1945 đến nay",
  "Thành tựu cơ bản và bài học của công cuộc Đổi mới": "Thành tựu cơ bản và bài học của công cuộc Đổi mới ở Việt Nam từ năm 1986 đến nay",
  "Hoạt động đối ngoại trong đấu tranh giành độc lập dân tộc": "Hoạt động đối ngoại của Việt Nam trong đấu tranh giành độc lập dân tộc (từ đầu thế kỉ XX đến Cách mạng tháng Tám năm 1945)",
  "Hoạt động đối ngoại trong kháng chiến chống Pháp và chống Mỹ": "Hoạt động đối ngoại của Việt Nam trong kháng chiến chống Pháp (1945 – 1954) và kháng chiến chống Mỹ (1954 – 1975)" };
// câu lớp 11: “Lớp 11 · ” và tên chủ đề trong mục lục của Lịch sử 11 (rút gọn cho vừa mã đề “Ôn chủ đề”); không có câu lớp 10
const CHU_DE_11 = { "Cách mạng tư sản và sự phát triển của chủ nghĩa tư bản": "Cách mạng tư sản và sự phát triển của chủ nghĩa tư bản",
  "Chủ nghĩa xã hội từ năm 1917 đến nay": "Chủ nghĩa xã hội từ năm 1917 đến nay",
  "Quá trình giành độc lập dân tộc ở Đông Nam Á": "Quá trình giành độc lập dân tộc của các quốc gia Đông Nam Á",
  "Chiến tranh bảo vệ Tổ quốc và giải phóng dân tộc": "Chiến tranh bảo vệ Tổ quốc và chiến tranh giải phóng dân tộc trong lịch sử Việt Nam (trước Cách mạng tháng Tám năm 1945)",
  "Một số cuộc cải cách lớn trong lịch sử Việt Nam": "Một số cuộc cải cách lớn trong lịch sử Việt Nam (trước năm 1858)",
  "Lịch sử bảo vệ chủ quyền ở Biển Đông": "Lịch sử bảo vệ chủ quyền, các quyền và lợi ích hợp pháp của Việt Nam ở Biển Đông" };
const lop = (t) => (BAI.includes(t) ? 12 : /^Lớp 11 · /.test(t) && t.slice(9) in CHU_DE_11 ? 11 : 0);
[...BAI, ...Object.keys(CHU_DE_11).map((t) => "Lớp 11 · " + t)].forEach((t) => assert.ok(("chu-de:12:lichsu:" + t).length <= 80, "mã đề “Ôn chủ đề” quá 80 kí tự: " + t));
const soY = (q) => (q.type === "tf4" ? 4 : 1);
const dpOf = (b, q) => (q.p && b.passages && b.passages[q.p] ? b.passages[q.p].text : "");

/* ---------- chạy kiểm tra từng câu ---------- */
let n = 0;
const dung = new Set();
DE.forEach((b) => {
  const CK = RIENG[b.id]; assert.ok(CK, b.id + ": chưa có các mục kiểm tra của đề ở RIENG"); assert.equal(b.questions.length, b.n, b.id + ": số câu khác danh mục");
  b.questions.forEach((q, i) => {
    const at = b.id + "#" + (i + 1), cs_ = CK.filter((c) => q.q.includes(c.has)), dai_ = Math.max(...cs_.map((c) => c.has.length)), ch = cs_.filter((c) => c.has.length === dai_);
    assert.equal(ch.length, 1, at + ": cần đúng một mục kiểm tra cho “" + q.q.slice(0, 60) + "…”, có " + ch.length);
    const c = ch[0]; assert.ok(!dung.has(c), at + ": hai câu cùng khớp “" + c.has + "”"); dung.add(c);
    try {
      const want = c.right(q, dpOf(b, q));
      if (q.type === "tf4") {
        // ý về thời gian tính lại bằng bảng ngày tháng, phải khớp bảng của mục kiểm tra
        q.o.forEach((o, k) => { const t = yThoiGian(q, o); if (t !== undefined) assert.strictEqual(want[k], t, "ý " + "abcd"[k] + " về thời gian: bảng ghi " + want[k] + ", tính được " + t); });
      }
      const got = q.type === "tf4" ? q.a : q.o[0];
      assert.strictEqual(JSON.stringify(got), JSON.stringify(want), "đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
      if (q.type === "mc") {
        assert.ok(new Set(q.o).size === 4 && q.o.length === 4, "bốn lựa chọn khác nhau");
        const L = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(q.o[0].length <= Math.max(1.2 * L, L + 8), "đáp án đúng dài hơn hẳn lựa chọn sai");
      }
      if (q.type === "tf4") {
        assert.ok(q.o.length === 4 && q.a.includes(true) && q.a.includes(false), "đúng/sai 4 ý có cả ý đúng và ý sai");
        // lời giải ghi “a) Đúng: …”, “b) Sai: …” theo đúng đáp án
        q.a.forEach((a, k) => assert.ok(q.x.includes("abcd"[k] + ") " + (a ? "Đúng" : "Sai")), "lời giải ghi “" + "abcd"[k] + ") " + (a ? "Đúng" : "Sai") + "”"));
      }
      assert.ok(!q.svg, "đề Lịch sử không có hình");
    } catch (e) { throw new Error(at + ": " + e.message + "\n" + e.stack.split("\n").slice(1, 3).join("\n")); }
    n++;
  });
});
assert.deepEqual(Object.keys(RIENG).sort(), DE.map((b) => b.id).sort(), "RIENG có đúng các đề thi thử của danh mục");
assert.deepEqual(Object.entries(RIENG).flatMap(([id, ck]) => ck.filter((c) => !dung.has(c)).map((c) => id + ": " + c.has)), [], "có mục kiểm tra không khớp câu nào");

/* ---------- khung đề (Quyết định 764/QĐ-BGDĐT): danh mục, phần, điểm, mức độ, phạm vi, đoạn tư liệu, lời dặn ---------- */
const KIEU = {};
DE.forEach((b) => {
  const at = b.id, qs = b.questions;
  assert.deepEqual([b.title, b.grade, b.subject, b.minutes, b.pts, b.file, !!b.pool], ["Lịch sử 12 · Thi thử tốt nghiệp · Đề " + soDe(b.id), 12, "Lịch sử", 50, 10, "12-lichsu.js", false], at + ": danh mục");
  assert.ok(TN && TN.banks.includes(b.id) && TN.grades.includes(12) && TN.subjects.includes("Lịch sử"), at + ": phải gắn vào tn-thpt-2027");
  let k = 0;
  KHUNG.forEach(([part, type, so_, pt]) => { const ph = qs.slice(k, k + so_); k += so_;
    assert.ok(ph.length === so_ && ph.every((q) => q.part === part && q.type === type && q.pt === pt), at + ": " + part + " gồm " + so_ + " câu " + type + ", mỗi câu " + pt + " điểm"); });
  assert.equal(k, qs.length, at + ": đề có đúng 28 câu theo khung 24 – 4");
  const G = Quiz.grade(qs, qs.map(() => null));
  assert.ok(G.max === 10 && G.got === 0, at + ": Quiz.grade: tối đa 10 điểm");
  assert.deepEqual(G.parts.map((p) => [p.part, p.max]), [[P1, 6], [P2, 4]], at + ": điểm tối đa từng phần 6 – 4");
  const dem = (a, c, f) => qs.slice(a, c).filter(f).length;
  // mức độ như ma trận đề tham khảo năm 2025: Phần I 12 Biết, 8 Hiểu, 4 Vận dụng (lớp 11 mỗi mức 2 câu); Phần II mỗi câu 1 ý Biết, 1 ý Hiểu,
  // 2 ý Vận dụng, nên bốn câu ghi mức 1, 2, 3, 3
  assert.deepEqual([1, 2, 3].map((l) => dem(0, 24, (q) => q.lv === l)), [12, 8, 4], at + ": Phần I 12 Biết, 8 Hiểu, 4 Vận dụng");
  assert.deepEqual([1, 2, 3].map((l) => dem(0, 24, (q) => q.lv === l && lop(q.topic) === 11)), [2, 2, 2], at + ": câu lớp 11 mỗi mức 2 câu");
  assert.deepEqual(qs.slice(24, 28).map((q) => q.lv).sort(), [1, 2, 3, 3], at + ": Phần II bốn câu ghi mức 1, 2, 3, 3");
  // phạm vi: chủ đề lớp 12 đúng chữ của ba kho (thêm Bài 9), lớp 11 theo tên chủ đề; 6 trong 40 lệnh hỏi thuộc lớp 11, đều ở Phần I
  qs.forEach((q, i) => assert.ok(lop(q.topic), at + "#" + (i + 1) + ": chủ đề lạ “" + q.topic + "”"));
  const lenh11 = sum(qs.filter((q) => lop(q.topic) === 11).map(soY));
  assert.equal(sum(qs.map(soY)), 40, at + ": đề có 40 lệnh hỏi"); assert.equal(lenh11, 6, at + ": 6 trong 40 lệnh hỏi thuộc lớp 11 (15%)");
  assert.equal(dem(24, 28, (q) => lop(q.topic) === 11), 0, at + ": Phần II không có câu lớp 11");
  // câu lớp 11 thuộc ba chủ đề, mỗi chủ đề 2 câu
  const c11 = {}; qs.filter((q) => lop(q.topic) === 11).forEach((q) => (c11[q.topic] = (c11[q.topic] || 0) + 1));
  assert.deepEqual(Object.values(c11), [2, 2, 2], at + ": câu lớp 11 thuộc ba chủ đề, mỗi chủ đề 2 câu");
  // câu lớp 12 của Phần I theo sáu chủ đề của sách 2 – 3 – 4 – 3 – 3 – 3, mức như ma trận đề tham khảo năm 2025
  const cd = (a, c, l) => [0, 1, 2, 3, 4, 5].map((x) => dem(a, c, (q) => lop(q.topic) === 12 && chuDe12(q.topic) === x && (!l || q.lv === l)));
  assert.deepEqual(cd(0, 24), [2, 3, 4, 3, 3, 3], at + ": Phần I chia theo sáu chủ đề Lịch sử 12: 2 – 3 – 4 – 3 – 3 – 3");
  assert.deepEqual([cd(0, 24, 1), cd(0, 24, 2), cd(0, 24, 3)], [[1, 2, 3, 1, 2, 1], [1, 1, 1, 1, 1, 1], [0, 0, 0, 1, 0, 1]], at + ": mức của câu lớp 12 Phần I theo từng chủ đề");
  // Phần II: Chủ đề 1, 3, 4 và một trong Chủ đề 5, 6 (thay câu chuyên đề học tập)
  const cd2 = qs.slice(24, 28).map((q) => chuDe12(q.topic));
  assert.ok(cd2[0] === 0 && cd2[1] === 2 && cd2[2] === 3 && (cd2[3] === 4 || cd2[3] === 5), at + ": Phần II thuộc Chủ đề 1, 3, 4 và Chủ đề 5 hoặc 6: " + cd2.map((x) => x + 1).join(", "));
  // trong mỗi phần, câu lớp 12 theo thứ tự bài; câu lớp 11 đứng trước, theo thứ tự chủ đề của sách
  [[0, 24], [24, 28]].forEach(([a, c]) => { const ch = qs.slice(a, c).filter((q) => lop(q.topic) === 12).map((q) => BAI.indexOf(q.topic));
    ch.forEach((v, i) => i && assert.ok(v >= ch[i - 1], at + ": câu lớp 12 theo thứ tự bài trong từng phần")); });
  const t11 = Object.keys(CHU_DE_11), i11 = qs.slice(0, 6).map((q) => t11.indexOf(q.topic.slice(9)));
  assert.ok(qs.slice(0, 6).every((q) => lop(q.topic) === 11) && i11.every((v, i) => !i || v >= i11[i - 1]), at + ": sáu câu lớp 11 đứng đầu Phần I, theo thứ tự chủ đề");
  // đoạn tư liệu: mỗi câu Phần II một đoạn riêng (người soạn viết), không dùng cho câu khác, không ghi số câu
  const ps = Object.keys(b.passages || {});
  assert.deepEqual(ps.sort(), qs.slice(24, 28).map((q) => q.p).sort(), at + ": mỗi câu Phần II một đoạn tư liệu riêng");
  assert.ok(qs.slice(0, 24).every((q) => !q.p), at + ": Phần I không dùng đoạn tư liệu");
  ps.forEach((p) => { const d = b.passages[p];
    assert.ok(d.title && d.text && / \(tư liệu người soạn viết\)$/.test(d.title) && !/câu \d/i.test(d.title + d.text), at + ": đoạn " + p + " có tên ghi “(tư liệu người soạn viết)”, có chữ, không ghi số câu");
    const w = d.text.split(/\s+/).length; assert.ok(w >= 60 && w <= 170, at + ": đoạn " + p + " dài " + w + " chữ (60–170)"); });
  // lời dặn: số câu, số điểm, số câu mỗi lớp tính từ dữ liệu
  const c12 = dem(0, 28, (q) => lop(q.topic) === 12), c11_ = dem(0, 28, (q) => lop(q.topic) === 11);
  ["Quyết định 764/QĐ-BGDĐT", "thí điểm thi trên máy tính", `đề có ${c12} câu Lịch sử 12 và ${c11_} câu Lịch sử 11 (${lenh11} trong 40 lệnh hỏi), câu lớp 11 đều ở Phần I`,
    "không có câu lớp 10", `Đề có ${qs.length} câu, làm trong ${b.minutes} phút`, "Phần I gồm 24 câu nhiều lựa chọn (6 điểm, mỗi câu 0,25 điểm)",
    "Phần II gồm 4 câu đúng/sai, mỗi câu 4 ý (4 điểm)", "đề Lịch sử không có Phần III", "đoạn tư liệu do người soạn đề viết", "Đề không có câu tự chấm",
    "ma trận đề tham khảo năm 2025", "đề chính thức năm 2026"]
    .forEach((s) => assert.ok(b.note.includes(s), at + ": lời dặn thiếu “" + s + "”"));
  // đúng/sai 4 ý: trong một đề không lặp kiểu Đ/S
  const kieu = qs.filter((q) => q.type === "tf4").map((q) => q.a.map((a) => (a ? "Đ" : "S")).join(""));
  assert.equal(new Set(kieu).size, kieu.length, at + ": kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + kieu.join(", "));
  kieu.forEach((x) => (KIEU[x] = (KIEU[x] || 0) + 1));
  // đáp án đúng là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba và không dưới một phần sáu số câu nhiều lựa chọn của đề (câu sắp xếp
  // có mọi lựa chọn dài bằng nhau nên không tính)
  const mc = qs.filter((q) => q.type === "mc" && new Set(q.o.map((o) => o.length)).size > 1), hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
  const dai2 = mc.filter((q) => hon(q, (a, c) => a > c)).length, ngan = mc.filter((q) => hon(q, (a, c) => a < c)).length;
  assert.ok(dai2 * 3 <= mc.length && ngan * 3 <= mc.length && (dai2 + ngan) * 6 >= mc.length, at + `: đáp án đúng dài nhất ở ${dai2}, ngắn nhất ở ${ngan} trong ${mc.length} câu`);
  b._le = dai2 + ngan; b._mc = mc.length;
  // lời giải không nhắc vị trí của phương án (app xáo phương án)
  qs.forEach((q) => assert.ok(!/(phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x + " " + (q.o || []).join(" ")), at + ": nhắc vị trí của phương án: " + q.q.slice(0, 50)));
});
assert.ok(Object.values(KIEU).every((c) => c <= 3), "một kiểu Đ/S dùng quá ba lần trong các đề thi thử: " + JSON.stringify(KIEU));
// câu nhiều lựa chọn: đáp án đúng không là lựa chọn duy nhất có chữ của nhãn chủ đề; ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có
{
  const chuThuong = (s) => String(s).normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean), loi = [];
  DE.forEach((b) => b.questions.forEach((q, i) => {
    if (q.type !== "mc") return;
    const at = b.id + "#" + (i + 1), c = chuThuong(q.topic.replace(/^Lớp 11 · /, "")), tu = c.length === 1 ? c : c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số|lên|giữa|từ|đến|năm|nay|sau)( |$)/u.test(w));
    tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); if (co[0] && !co.slice(1).some(Boolean)) loi.push(`${at}: chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề`); });
    const dau = q.o.map((o) => o.split(" ")[0]);
    if (dau.slice(1).every((d) => d === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1) loi.push(at + ": ba lựa chọn sai cùng mở đầu bằng “" + dau[1] + "”");
  }));
  assert.deepEqual(loi, [], "câu nhiều lựa chọn có gợi ý từ chữ của lựa chọn:\n" + loi.join("\n"));
}

/* ---------- chữ ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || []).map(String);
// 34 đơn vị hành chính cấp tỉnh (Nghị quyết 202/2025/QH15) như tests/lichsu-diali12-ck2.js; tên tỉnh đã nhập năm 2025 chỉ ghi kèm “nay thuộc …”
const TINH = ["Hà Nội", "Huế", "Hải Phòng", "Đà Nẵng", "Cần Thơ", "Thành phố Hồ Chí Minh", "Lai Châu", "Điện Biên", "Sơn La", "Lạng Sơn", "Quảng Ninh",
  "Thanh Hoá", "Nghệ An", "Hà Tĩnh", "Cao Bằng", "Tuyên Quang", "Lào Cai", "Thái Nguyên", "Phú Thọ", "Bắc Ninh", "Hưng Yên", "Ninh Bình", "Quảng Trị",
  "Quảng Ngãi", "Gia Lai", "Khánh Hoà", "Lâm Đồng", "Đắk Lắk", "Đồng Nai", "Tây Ninh", "Vĩnh Long", "Đồng Tháp", "Cà Mau", "An Giang"];
assert.equal(TINH.length, 34);
const TINH_CU = ["Hà Giang", "Yên Bái", "Bắc Kạn", "Vĩnh Phúc", "Hoà Bình", "Bắc Giang", "Thái Bình", "Hải Dương", "Hà Nam", "Nam Định", "Quảng Bình",
  "Quảng Nam", "Kon Tum", "Bình Định", "Phú Yên", "Ninh Thuận", "Bình Thuận", "Đắk Nông", "Bà Rịa – Vũng Tàu", "Bà Rịa - Vũng Tàu", "Bình Dương", "Bình Phước",
  "Long An", "Tiền Giang", "Bến Tre", "Trà Vinh", "Hậu Giang", "Sóc Trăng", "Bạc Liêu", "Kiên Giang", "Thừa Thiên Huế"];
{
  const loi = [], kt = (ok, m) => ok || loi.push(m);
  DE.forEach((b) => {
    const doan = Object.values(b.passages || {}).flatMap((p) => [p.title, p.text]);
    b.questions.map((q) => [b.id + ": " + q.q.slice(0, 50), chu(q)]).concat([[b.id + ": đoạn tư liệu, lời dặn", doan.concat(b.note)]]).forEach(([at, ss]) => ss.forEach((s) => {
      // số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân (năm viết liền)
      kt(!/(?<![,\d])\d{5,}/.test(s) && !/(?<![,\d])\d{4}(?![\d ])/.test(s.replace(/\b(?:1[0-9]|20)\d{2}\b/g, "").replace(/\d+\/QĐ-BGDĐT/g, "")) && !/\d\.\d/.test(s), at + ": số viết sai cách: " + s.slice(0, 120));
      kt(!/(?<![\p{L}])(?:hóa|hòa|thủy|tỏa|hủy|tùy|khỏe|lũy|thụy)(?![\p{L}])/iu.test(s), at + ": dấu thanh kiểu mới: " + s.slice(0, 120));
      // địa danh theo đơn vị hành chính hiện nay: không “huyện”, “63 tỉnh”; tỉnh đã nhập chỉ ghi kèm “nay thuộc …”
      kt(!/(?<![\p{L}])(?:huyện|63 tỉnh|64 tỉnh)(?![\p{L}])/iu.test(s), at + ": đơn vị hành chính cũ: " + s.slice(0, 120));
      const s2 = s.replace(/(?:[Cc]hiến dịch|thuỷ điện) Hoà Bình|Thái Bình Dương|sông (?:Hồng, )?Thái Bình/g, "");
      TINH_CU.forEach((t) => { if (s2.includes(t)) kt(new RegExp(escRe(t) + " \\(nay (?:thuộc|là) ").test(s2), at + ": tên tỉnh cũ “" + t + "” không ghi tên mới"); });
      [...s.matchAll(/(?:tỉnh|thành phố) (\p{Lu}[\p{L}]*(?: \p{Lu}[\p{L}]*)*)/gu)].forEach((x) => kt(TINH.includes(x[1]) || TINH.includes("Thành phố " + x[1]) || /^Hồ Chí Minh$/.test(x[1]), at + ": tên tỉnh, thành phố không có trong 34 đơn vị: " + x[0]));
      // ngày tháng viết như sách (“6 – 3 – 1946”, “tháng 6 – 1923”), không “6/3/1946”, “6-3-1946”
      kt(!/(?<!\d)\d{1,2}\/\d{1,2}(?!\d)(?:\/\d{4})?|\b\d{1,2}-\d{1,2}-\d{4}\b|\d – \d{1,2}\/|tháng \d{1,2}\/\d{4}/.test(s), at + ": ngày tháng viết như sách (“6 – 3 – 1946”): " + s.slice(0, 120));
    }));
  });
  assert.deepEqual(loi, [], "chữ viết khác quy ước:\n" + loi.join("\n"));
}

/* ---------- so với ba kho Lịch sử 12 và giữa các đề thi thử: đề bài không trùng, không gần trùng; đáp án không trùng câu cùng chủ đề ---------- */
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const ten = new Map();
DE.forEach((b) => b.questions.forEach((q, i) => ten.set(q, b.id.replace("lichsu12-", "") + "#" + (i + 1))));
const KHO_Q = BANKS.filter((b) => b.file === "12-lichsu.js" && !b.pool && !/^lichsu12-tn-/.test(b.id)).flatMap((b) => b.questions.map((q, i) => { ten.set(q, b.id.replace("lichsu12-", "") + "#" + (i + 1)); return Object.assign(q, { _de: b.id }); }));
const TNQ = DE.flatMap((b) => b.questions.map((q) => Object.assign(q, { _de: b.id, _d: dpOf(b, q) })));

// tên riêng nhiều chữ (tổ chức, văn kiện, sự kiện, hội nghị, chiến dịch, địa danh, triều đại): mỗi tên tính là một từ khi so với chữ của sách và
// của kho khác (như tests/lichsu-diali12-ck2.js)
const GOP = ["Đại hội Chiến sĩ thi đua và cán bộ gương mẫu toàn quốc", "Quỹ Giáo dục không thể chờ đợi", "Quốc triều hình luật", "Luật Hồng Đức", "Cộng hoà Dân chủ Nhân dân Lào", "Cộng hoà Dân chủ Nhân dân Triều Tiên", "Tuyên bố về Khu vực Hoà bình, Tự do và Trung lập", "Khao lề thế lính Hoàng Sa", "Mặt trận Đoàn kết dân tộc cứu nước Cam-pu-chia", "Hội nghị hợp nhất các tổ chức cộng sản", "Đại hội Xô viết toàn Nga", "Hiệp ước cấm phổ biến vũ khí hạt nhân", "Công ước cấm vũ khí hoá học", "Hiệp ước của Liên hợp quốc cấm vũ khí hạt nhân", "Công ước của Liên hợp quốc về Luật Biển", "Lực lượng gìn giữ hoà bình Liên hợp quốc", "Hi-rô-si-ma", "Na-ga-xa-ki", "Uỷ ban Bảo vệ hoà bình thế giới", "Trật tự thế giới hai cực I-an-ta", "Hiến chương Liên hợp quốc", "Liên hợp quốc", "Hội đồng Bảo an", "Đại hội đồng", "Hội Quốc liên", "Hội nghị I-an-ta", "trật tự hai cực I-an-ta", "I-an-ta", "Xan Phran-xi-xcô", "Chiến tranh lạnh", "Chiến tranh thế giới thứ hai", "Chiến tranh thế giới thứ nhất", "Liên Xô", "Liên bang Nga", "Liên minh châu Âu", "Trung Quốc", "Nhật Bản", "Ấn Độ", "Tây Âu", "Đông Âu", "Đông Nam Á", "Đông Bắc Á", "Tây Á", "Nam Á", "Mỹ La-tinh", "Hiệp hội các quốc gia Đông Nam Á", "Cộng đồng Chính trị – An ninh ASEAN", "Cộng đồng Kinh tế ASEAN", "Cộng đồng Văn hoá – Xã hội ASEAN", "Cộng đồng ASEAN", "Hiến chương ASEAN", "Hiệp ước Thân thiện và Hợp tác ở Đông Nam Á", "Khu vực Mậu dịch tự do ASEAN", "Tuyên bố Băng Cốc", "Băng Cốc", "Tầm nhìn ASEAN 2025", "Bru-nây", "Xin-ga-po", "Thái Lan", "In-đô-nê-xi-a", "Ma-lai-xi-a", "Phi-líp-pin", "Mi-an-ma", "Cam-pu-chia", "Cách mạng tháng Tám năm 1945", "Cách mạng tháng Tám", "Uỷ ban Khởi nghĩa toàn quốc", "Uỷ ban Dân tộc giải phóng Việt Nam", "Quân lệnh số 1", "Lệnh Tổng khởi nghĩa", "Hội nghị toàn quốc của Đảng", "Đại hội Quốc dân", "Tổng khởi nghĩa", "Tân Trào", "Bảo Đại", "Trần Trọng Kim", "Tuyên ngôn Độc lập", "Việt Nam Dân chủ Cộng hoà", "Chính phủ lâm thời", "Hồ Chí Minh", "Quảng trường Ba Đình", "Ba Đình", "Pốt-xđam", "Trung Hoa Dân quốc", "Quan Đông", "Đồng minh", "Đồng Nai Thượng", "Hà Tiên", "Sài Gòn", "Đảng Cộng sản Đông Dương", "Đảng Cộng sản Việt Nam", "Đông Dương", "Tổng bộ Việt Minh", "Mặt trận Việt Minh", "Việt Minh", "kháng chiến chống thực dân Pháp", "Chiến dịch Việt Bắc thu – đông năm 1947", "Chiến dịch Biên giới thu – đông năm 1950", "Chiến dịch Việt Bắc", "Chiến dịch Biên giới", "Chiến dịch Điện Biên Phủ", "Điện Biên Phủ", "Kế hoạch Na-va", "Na-va", "Hiệp định Giơ-ne-vơ", "Giơ-ne-vơ", "Đảng Lao động Việt Nam", "Đảng Dân chủ Việt Nam", "Mặt trận Liên Việt", "Hội Liên Việt", "Chiến dịch Hoà Bình", "Chiến dịch Tây Bắc", "Chiến dịch Thượng Lào", "Thượng Lào", "Luật Cải cách ruộng đất", "Him Lam", "Mường Thanh", "Bản Kéo", "Việt Bắc", "Đại hội đại biểu toàn quốc lần thứ II", "Đại hội đại biểu toàn quốc lần thứ III", "Đại hội đại biểu toàn quốc", "kháng chiến chống Mỹ, cứu nước", "Phong trào Đồng khởi", "Đồng khởi", "Chiến tranh đặc biệt", "Chiến tranh cục bộ", "Việt Nam hoá chiến tranh", "Chiến tranh đơn phương", "Mặt trận Dân tộc giải phóng miền Nam Việt Nam", "Quân Giải phóng miền Nam", "Vạn Tường", "Chính phủ cách mạng lâm thời Cộng hoà miền Nam Việt Nam", "Cộng hoà miền Nam Việt Nam", "Việt Nam Cộng hoà", "Ngô Đình Diệm", "Tổng tiến công và nổi dậy Xuân Mậu Thân năm 1968", "Tổng tiến công và nổi dậy Xuân Mậu Thân", "Xuân Mậu Thân", "Mậu Thân", "Hiệp định Pa-ri", "Pa-ri", "Tổng tiến công và nổi dậy Xuân 1975", "Chiến dịch Tây Nguyên", "Chiến dịch Huế – Đà Nẵng", "Chiến dịch Hồ Chí Minh", "Phước Long", "Buôn Ma Thuột", "Đường Hồ Chí Minh", "Trường Sơn", "Đà Nẵng", "Hà Nội", "Nam Bộ", "Trung Bộ", "Bắc Bộ", "Việt Nam", "Trung du và miền núi phía Bắc", "Đồng bằng sông Hồng", "Bắc Trung Bộ", "Duyên hải Nam Trung Bộ và Tây Nguyên", "Đông Nam Bộ", "Đồng bằng sông Cửu Long", "Tây Nguyên", "Nam Trung Bộ", "Cửu Long", "sông Hồng", "Biển Đông", "Lũng Cú", "Đất Mũi", "Sín Thầu", "Pu Sam Sao", "Hoàng Liên Sơn", "Trường Sơn Bắc", "Trường Sơn Nam", "Bạch Mã", "Đại Lãnh", "quần đảo Hoàng Sa", "quần đảo Trường Sa", "Hoàng Sa", "Trường Sa", "Ấn Độ Dương", "Thái Bình Dương", "Nam Côn Sơn", "Phú Mỹ", "Nhơn Trạch", "Ô Môn", "Thành phố Hồ Chí Minh", "Hải Phòng – Quảng Ninh", "Cà Mau – An Giang", "Khánh Hoà – Lâm Đồng – Thành phố Hồ Chí Minh", "Hải Phòng", "Quảng Ninh", "Khánh Hoà", "Cà Mau", "An Giang", "Lâm Đồng", "Hà Tĩnh", "Lạng Sơn", "Bắc Ninh", "Tuyên Quang", "Sơn La", "Lào Cai", "Cao Bằng", "Thái Nguyên", "Đồng Nai", "Cần Thơ", "Quảng Ngãi", "Lai Châu", "Điện Biên", "Gia Lai", "Đắk Lắk", "Thanh Hoá", "Nghệ An", "Phú Thọ", "Hưng Yên", "Ninh Bình", "Quảng Trị", "Tây Ninh", "Vĩnh Long", "Đồng Tháp", "gió mùa Đông Bắc", "gió mùa Tây Nam", "Tín phong bán cầu Bắc", "áp cao Xi-bia", "áp cao cận chí tuyến bán cầu Nam", "dải hội tụ nhiệt đới", "đai ôn đới gió mùa trên núi", "Bắc Ấn Độ Dương", "Phan-xi-păng", "khu nông nghiệp ứng dụng công nghệ cao", "khu công nghệ cao", "khu công nghiệp", "khu kinh tế", "khu chế xuất", "trung tâm công nghiệp", "khu vực có vốn đầu tư nước ngoài", "đầu tư trực tiếp nước ngoài", "kinh tế Nhà nước", "kinh tế ngoài Nhà nước", "nông nghiệp, lâm nghiệp và thuỷ sản", "công nghiệp và xây dựng", "công nghiệp chế biến, chế tạo", "sản xuất và phân phối điện", "tổng sản phẩm trên địa bàn", "tổng sản phẩm trong nước", "Đại hội đại biểu toàn quốc lần thứ VI", "Đại hội đại biểu toàn quốc lần thứ VII", "Đại hội đại biểu toàn quốc lần thứ VIII", "Đại hội đại biểu toàn quốc lần thứ IX", "Đại hội đại biểu toàn quốc lần thứ X", "Đại hội đại biểu toàn quốc lần thứ XI", "Đại hội đại biểu toàn quốc lần thứ XII", "Đại hội đại biểu toàn quốc lần thứ XIII", "Ba chương trình kinh tế lớn", "Cương lĩnh xây dựng đất nước trong thời kì quá độ lên chủ nghĩa xã hội", "Chiến lược ổn định và phát triển kinh tế – xã hội", "Nhà nước pháp quyền xã hội chủ nghĩa", "kinh tế thị trường định hướng xã hội chủ nghĩa", "đường dây 500 kV Bắc – Nam", "đường dây 500 kV", "cao tốc Thành phố Hồ Chí Minh – Trung Lương", "Trung Lương", "Tổ chức Thương mại Thế giới", "Hội đồng Nhân quyền", "Diễn đàn Hợp tác kinh tế châu Á – Thái Bình Dương", "Mục tiêu Phát triển Thiên niên kỉ", "Chỉ số Đổi mới sáng tạo toàn cầu", "COVID-19", "Phan Bội Châu", "Phan Châu Trinh", "Nguyễn Ái Quốc", "Phong trào Đông du", "Duy tân hội", "Việt Nam Quang phục hội", "Điền – Quế – Việt liên minh", "Đông Á Đồng minh hội", "Hội Liên hiệp thuộc địa", "Hội Liên hiệp các dân tộc bị áp bức", "Quốc tế Cộng sản", "Đảng Cộng sản Pháp", "Đảng Cộng sản Trung Quốc", "Đảng Xã hội Pháp", "Việt Nam Cách mạng thanh niên", "Việt Nam Cách mạng đồng minh hội", "Cơ quan Tình báo chiến lược Mỹ", "Chỉ thị Kháng chiến kiến quốc", "Hiệp định Sơ bộ", "Tạm ước Việt – Pháp", "Hội nghị Phông-ten-nơ-blô", "Phông-ten-nơ-blô", "Liên minh nhân dân Việt – Miên – Lào", "Hội nghị Giơ-ne-vơ", "Hội nghị Pa-ri", "Đại hội đồng Liên hợp quốc", "Quảng Châu", "Miến Điện", "Mã Lai", "Á, Phi, Mỹ La-tinh", "Huế", "đường sắt Thống Nhất", "quốc lộ 1", "đường Hồ Chí Minh", "Nội Bài", "Tân Sơn Nhất", "Long Thành", "Cái Mép – Thị Vải", "Lạch Huyện", "Nghi Sơn", "Vũng Áng", "Hòn La", "Chân Mây", "Cửa Lò", "Sầm Sơn", "Thiên Cầm", "Lăng Cô", "Phong Nha – Kẻ Bàng", "Mẫu Sơn", "Sa Pa", "Hồ Ba Bể", "Hồ Núi Cốc", "Mộc Châu", "Thác Bản Giốc", "Hạ Long", "Vịnh Hạ Long", "Cát Bà", "Tràng An", "Tam Đảo", "Vịnh Bắc Bộ", "sông Đà", "sông Thái Bình", "sông Đồng Nai", "sông Mê Công", "Hoà Bình", "Thác Bà", "Bản Chát", "Huội Quảng", "Lào", "Hoa Kỳ", "Hàn Quốc", "Cảng Hải Phòng", "Đình Vũ", "Hải Hà", "Vân Đồn", "Cẩm Phả", "Hòn Gai", "Uông Bí", "Mạo Khê", "Quỳnh Lập", "Thạch Khê", "Cổ Định", "Nhật Lệ", "Bãi Cháy", "Cộng hoà Nhân dân Trung Hoa", "Uỷ ban Giám sát quốc tế", "châu Á – Thái Bình Dương", "vị trí địa lí", "Hội đồng tương trợ kinh tế", "Phong trào Không liên kết", "Hiệp định Thương mại tự do Việt Nam – EU", "Hiệp định Đối tác kinh tế toàn diện Khu vực", "Đối tác chiến lược toàn diện", "Uỷ viên không thường trực Hội đồng Bảo an", "Phi-lip-pin", "Nguyễn Tất Thành", "Nguyễn Sinh Cung", "Nguyễn Sinh Sắc", "Hoàng Thị Loan", "Văn Ba", "Trường Dục Thanh", "Phan Thiết", "Trường Quốc học Huế", "Hội nghị Véc-xai", "Véc-xai", "Lê-nin", "Hội Việt Nam Cách mạng Thanh niên", "Việt Nam Quốc dân đảng", "Đội Việt Nam Tuyên truyền Giải phóng quân", "Hội nghị lần thứ 8 Ban Chấp hành Trung ương Đảng Cộng sản Đông Dương", "Ban Chấp hành Trung ương Đảng", "Ban Chấp hành Trung ương Đảng Cộng sản Đông Dương", "Hội nghị Trung ương 15", "Quốc hội khoá I", "Quốc hội khoá VI", "Lời kêu gọi toàn quốc kháng chiến", "Chính cương vắn tắt", "Sách lược vắn tắt", "Cương lĩnh chính trị đầu tiên", "Lăng Chủ tịch Hồ Chí Minh", "Bảo tàng Hồ Chí Minh", "Chủ tịch Hồ Chí Minh", "UNESCO", "Sài Gòn – Gia Định", "Phú Quý", "Lý Sơn", "Côn Đảo", "Phú Quốc", "Côn Sơn", "Tân Rai", "Nhân Cơ", "Sư Tử Đen", "Sư Tử Trắng", "Dung Quất", "Vân Phong", "Nhơn Hội", "Lan Tây", "Lan Đỏ", "Na Dương", "An Khánh", "Cát Tiên", "Bù Gia Mập", "Tràm Chim", "U Minh Thượng", "Mũi Cà Mau", "Cái Răng", "Phụng Hiệp", "vịnh Thái Lan", "Robusta", "Arabica", "Công ước của Liên hợp quốc về Luật Biển năm 1982", "Tuyên bố về ứng xử của các bên ở Biển Đông", "Bộ quy tắc ứng xử ở Biển Đông", "Cách mạng tư sản Anh", "Cách mạng tư sản Pháp", "Chiến tranh giành độc lập của 13 thuộc địa Anh ở Bắc Mỹ", "Hợp chúng quốc Mỹ", "Bắc Mỹ", "Tuyên ngôn Nhân quyền và Dân quyền", "Cách mạng tháng Mười Nga", "Liên bang Cộng hoà xã hội chủ nghĩa Xô viết", "Chính sách kinh tế mới", "Cu-ba", "Đông Ti-mo", "Hồ Quý Ly", "Lê Thánh Tông", "Minh Mạng", "Lý Thường Kiệt", "Trần Hưng Đạo", "Lê Lợi", "Nguyễn Trãi", "Quang Trung", "Nguyễn Huệ", "Ngô Quyền", "Hai Bà Trưng", "Bà Triệu", "Lý Bí", "Khúc Thừa Dụ", "Như Nguyệt", "Bạch Đằng", "Chi Lăng – Xương Giang", "Rạch Gầm – Xoài Mút", "Ngọc Hồi – Đống Đa", "Tây Sơn", "Lam Sơn", "Đại Việt", "Đại Ngu", "Luật Biển Việt Nam", "Hội nghị Tê-hê-ran", "Hội nghị Pốt-xđam", "Tuyên bố Liên hợp quốc", "Hiệp ước Bắc Đại Tây Dương", "Tổ chức Hiệp ước Vác-sa-va", "Vác-sa-va", "Gạc Ma", "Vị Xuyên", "Khơ-me Đỏ", "Phnôm Pênh"];
// cụm từ chung của môn: tên bài, tên chủ đề, cách nói chuẩn của đề (thay bằng dấu ngăn trước khi so)
const TU_CHUNG = [...BAI, ...Object.values(RUT_GON), ...Object.keys(CHU_DE_11), ...Object.values(CHU_DE_11), ...CHU_DE_12.map((c) => c[0]),
  "mỗi ý sau đúng hay sai", "sắp xếp các sự kiện sau theo trình tự thời gian", "đọc đoạn tư liệu", "tư liệu người soạn viết", "nào sau đây",
  "đề thi thử theo cấu trúc đề thi tốt nghiệp thpt từ năm 2025", "năm 2027 thí điểm thi trên máy tính ở nơi đủ điều kiện, đề như thi giấy",
  "cuối thế kỉ XIX – đầu thế kỉ XX", "từ thế kỉ XVII đến đầu thế kỉ XIX", "đầu những năm 70 của thế kỉ XX", "nửa đầu thế kỉ XIX",
  "cuộc cải cách của Lê Thánh Tông (thế kỉ XV)", "cuộc cải cách của Minh Mạng (nửa đầu thế kỉ XIX)", "cuộc cải cách của Hồ Quý Ly và Triều Hồ", "chính trị – an ninh, kinh tế, văn hoá – xã hội", "đa phương hoá, đa dạng hoá quan hệ đối ngoại", "kết hợp sức mạnh dân tộc với sức mạnh thời đại", "những năm 80 của thế kỉ XX", "học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh",];
const boDau = (s) => String(s).normalize("NFC").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const GOP_ = GOP.map(boDau).sort((a, b) => b.length - a.length), TU_CHUNG_ = TU_CHUNG.map((p) => " " + boDau(p) + " ").sort((a, b) => b.length - a.length);
const khongDau = (s) => {
  let t = " " + boDau(s) + " ";
  TU_CHUNG_.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  GOP_.forEach((g) => { t = t.split(" " + g + " ").join(" " + g.replace(/ /g, "") + " "); });
  return t.replace(/[aeiouy]+/g, "a").replace(/\s+/g, " ").trim();
};
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
{
  const ds = BANKS.filter((b) => b.file === "12-lichsu.js" && !b.pool).flatMap((b) => b.questions.map((q) => ({ q, k: gocChu(q.q) })));
  TNQ.forEach((q) => assert.deepEqual(ds.filter((e) => e.k === gocChu(q.q)).map((e) => ten.get(e.q)), [ten.get(q)], "đề bài trùng câu khác trong 12-lichsu.js"));
  // cặp hai âm tiết liền nhau (như tests/sinhhoc12-tn.js): đề bài cùng các lựa chọn có từ 4 cặp chung với một câu của ba kho và số cặp chung từ
  // một nửa số cặp của câu ít cặp hơn thì báo; không tính cặp có số hay chữ đơn, cặp của nhãn chủ đề, cụm chung và cặp có ở từ 3% số câu của file.
  // Giữa các đề thi thử (cùng cách hỏi của đề tốt nghiệp) chỉ so chuỗi 6 từ.
  const CUM = ["mỗi ý sau đúng hay sai", "nào sau đây", "sắp xếp các sự kiện sau theo trình tự thời gian"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => c.split(" ").every((x) => /\p{L}{2}/u.test(x))); };
  const ca = KHO_Q.concat(TNQ), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nhan.has(c) && df[c] < 0.03 * ca.length)); };
  const gan_ = [], gan6 = [], trung = [];
  TNQ.forEach((q) => {
    const c = capAm(q);
    KHO_Q.concat(TNQ.filter((p) => p._de !== q._de)).forEach((p) => {
      const d = capAm(p), chung = [...c].filter((x) => d.has(x));
      if (!/^lichsu12-tn-/.test(p._de) && chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size)) gan_.push(`${ten.get(q)} ~ ${ten.get(p)}: ${chung.join(", ")}`);
      const s = " " + khongDau(p.q) + " "; chuoi(q.q, 6).forEach((x) => { if (s.includes(" " + x + " ")) gan6.push(ten.get(q) + " ~ " + ten.get(p) + ": " + x); });
      if (p.topic !== q.topic) return;
      if (q.type === "mc" && p.type === "mc" && gocChu(q.o[0]) === gocChu(p.o[0])) trung.push(ten.get(q) + " ~ " + ten.get(p) + ": đáp án trùng câu cùng chủ đề");
    });
  });
  assert.deepEqual([...new Set(gan_)], [], "đề bài gần trùng (cặp hai âm tiết) câu khác:\n" + [...new Set(gan_)].join("\n"));
  assert.deepEqual([...new Set(gan6)], [], "đề bài gần trùng (chuỗi 6 từ) câu khác:\n" + [...new Set(gan6)].join("\n"));
  assert.deepEqual(trung, [], "đáp án trùng câu cùng chủ đề:\n" + trung.join("\n"));
}

/* ---------- dò lộ đáp án (như tests/sinhhoc12-tn.js, tests/lichsu-diali12-ck2.js) ----------
   Đề cố định: mọi câu cùng hiện, đoạn tư liệu cùng hiện, lời dặn hiện ở màn mở đề; đề “Ôn chủ đề” rút chung câu cùng chủ đề của các đề thi thử
   và ba kho Lịch sử 12 (kèm đoạn tư liệu của câu). Đáp án là năm hay số (lựa chọn đúng chỉ là số) tìm ở vị trí kết quả của câu kia (ngay sau
   “=”, “là”, “bằng”, “được”, “vào năm”): không được có. Đáp án bằng chữ tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy
   cả đáp án); chuỗi có ở từ hai lựa chọn sai thì không chỉ ra được lựa chọn đúng nên bỏ; chuỗi có trong đề bài, lựa chọn, lời giải, đoạn tư liệu
   của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM. Ngày tháng của các sự kiện trong câu về trình tự thời gian (câu sắp
   xếp, ý “A diễn ra trước B”, “cách nhau N năm”), ghi như sách, có ở câu kia thì lộ thứ tự: không được có. */
const KQ = new RegExp("(?:=|(?:^|[\\s(])(?:là|bằng|được|vào năm|năm))\\s+(" + NUM + ")(?![\\d,])", "gu");
const kqSo = (s) => [...String(s).matchAll(KQ)].map((x) => val(x[1]));
const tuCua = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum3 = (s) => { const w = tuCua(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
// chuỗi 3 từ chung của môn (thuật ngữ, cách nói của bài học) không làm lộ đáp án nào: bỏ qua khi là một phần của đáp án dài hơn
const CUM_CHUNG = new Set(["liên hợp quốc", "chiến tranh lạnh", "đông nam á", "cộng đồng asean", "việt nam dân", "nam dân chủ", "dân chủ cộng", "chủ cộng hoà", "xã hội chủ", "hội chủ nghĩa", "chủ tịch hồ", "tịch hồ chí", "hồ chí minh", "nguyễn ái quốc", "công nghiệp hoá", "nghiệp hoá hiện", "hoá hiện đại", "hiện đại hoá"]);
const chuP = (p) => (p.type === "note" ? [p.x] : chu(p).concat(p._d ? [p._d] : []));
const NOTES = DE.map((b) => { const o = { q: b.id + "-note", x: [b.note].join(" | "), topic: "note", type: "note", _de: b.id }; ten.set(o, b.id.replace("lichsu12-", "") + "-note"); return o; });
const ngayCua = (q) => [...new Set((q.type === "mc" && /1\. .+; 2\. /.test(q.q) ? dsSuKien(q) : q.type === "tf4" ? q.o.flatMap((o) => { const m = /^(.+) diễn ra trước (.+)\.$/.exec(o) || /^(.+) và (.+) cách nhau \d+ năm\.$/.exec(o); return m ? [m[1], m[2]] : []; }) : []).map((d) => suKien(d)[2]))];
const coNgay = (s, g) => new RegExp("(?<![\\d,]|[\\d,] )" + escRe(g) + "(?!\\d)").test(s);
const doLo = (qs, them, cap) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    let soDa = [], C = [];
    if (q.type === "mc") { if (/^\d{3,4}$/.test(q.o[0])) soDa = [+q.o[0]]; else if (!/^\d(, \d)+$/.test(q.o[0])) { const c3 = cum3(q.o[0]), sai = q.o.slice(1).map((o) => " " + tuCua(o).join(" ") + " ");
      C = [...new Set(c3.length > 1 ? c3.filter((c) => !CUM_CHUNG.has(c)) : c3)].filter((c) => sai.filter((o) => o.includes(" " + c + " ")).length < 2); } }
    const ngay = ngayCua(q);
    qs.concat(them).forEach((p) => {
      if (p === q || !cap(p, q)) return;
      const at = `${ten.get(p)} → ${ten.get(q)}: `, T = " " + chuP(p).map((s) => tuCua(s).join(" ")).join(" | ") + " ";
      soDa.filter((d) => chuP(p).flatMap(kqSo).some((y) => y === d)).forEach((d) => lo.push(at + d));
      ngay.filter((g) => chuP(p).some((s) => coNgay(s, g))).forEach((g) => lo.push(at + "ngày " + g));
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
// trong một đề (mọi câu cùng hiện) và với lời dặn, đoạn tư liệu của đề
const r1 = doLo(TNQ, NOTES, (p, q) => p._de === q._de);
// cùng chủ đề (đề “Ôn chủ đề”): câu của đề thi thử với câu cùng chủ đề của đề thi thử khác và của ba kho (trừ câu tự luận)
const onCD = TNQ.concat(KHO_Q.filter((q) => q.type !== "essay" && TNQ.some((t) => t.topic === q.topic)));
const r2 = doLo(onCD, [], (p, q) => p.topic === q.topic && p._de !== q._de && (/^lichsu12-tn-/.test(p._de) || /^lichsu12-tn-/.test(q._de)));
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu khác (xem tay):\n" + [...r1.chuLo, ...r2.chuLo].join("\n"));
// Đã xem tay (Phiên N12-tn-lichsu): chữ của đáp án có ở câu khác nhưng không chỉ ra đáp án.
const DA_XEM = [
  // tn-de1#18 (tập san về thành tựu đối ngoại): câu kia chỉ nói chung về quan hệ ngoại giao, không cho biết tư liệu nào hợp với tập san
  "ck2-de1#2 → tn-de1#18: các nước có", "gk2-de2#13 → tn-de1#18: có quan hệ", "gk2-de2#6 → tn-de1#18: có quan hệ", "gk2-de2#6 → tn-de1#18: hệ ngoại giao",
  "gk2-de2#6 → tn-de1#18: ngoại giao với", "gk2-de2#6 → tn-de1#18: quan hệ ngoại",
  // tn-de2#17 (hợp tác quân sự → an ninh – quốc phòng): câu kia chỉ nhắc tên lĩnh vực an ninh – quốc phòng
  "ck2-de1#2 → tn-de2#17: an ninh quốc", "gk2-de1#13 → tn-de2#17: an ninh quốc", "gk2-de1#13 → tn-de2#17: ninh quốc phòng", "gk2-de2#12 → tn-de2#17: an ninh quốc",
  "gk2-de2#12 → tn-de2#17: ninh quốc phòng",
  // tn-de2#22 (chức vụ năm 1951): “Chủ tịch Ban Chấp hành Trung ương Đảng” là lựa chọn sai của câu kia (chức vụ năm 1946)
  "ck2-de2#11 → tn-de2#22: ban chấp hành", "ck2-de2#11 → tn-de2#22: chấp hành trung", "ck2-de2#11 → tn-de2#22: chủ tịch ban", "ck2-de2#11 → tn-de2#22: hành trung ương",
  "ck2-de2#11 → tn-de2#22: trung ương đảng", "ck2-de2#11 → tn-de2#22: tịch ban chấp",
  // tn-de2#24, tn-de2#20: chữ chung, không cho biết đáp án (“Người để lại…” nói về di sản tinh thần; “Nghị định thư” thiết lập quan hệ với Mỹ)
  "ck2-de2#24 → tn-de2#24: người để lại", "ck2-de2#9 → tn-de2#20: nghị định thư",
  // tn-de3#22 (Khu Giải phóng Việt Bắc) và câu về Uỷ ban Dân tộc giải phóng Việt Nam: chỉ chung chữ “giải phóng Việt…”, là hai tên khác nhau
  "ck2-de2#16 → tn-de3#22: giải phóng việt", "tn-de3#22 → ck2-de2#16: giải phóng việt",
  // tn-de4#3 (các nước tuyên bố độc lập năm 1945): câu kia chỉ nhắc In-đô-nê-xi-a khi nói Hà Lan xâm nhập từ cuối thế kỉ XVI
  "tn-de1#3 → tn-de4#3: in đô nê", "tn-de1#3 → tn-de4#3: đô nê xi", "tn-de1#3 → tn-de4#3: nê xi a",
  // tn-de4#19 (Đông Á đồng minh, 1908): “Đông Á Đồng minh hội” là lựa chọn sai của câu kia (tổ chức Việt Minh cử người tham gia)
  "gk2-de2#15 → tn-de4#19: đông á đồng", "gk2-de2#15 → tn-de4#19: á đồng minh",
  // Phiên N12-tn-lichsu-b. ck2-de2#5 (vấn đề Cam-pu-chia những năm đầu Đổi mới): tn-de5#21 chỉ nhắc Cam-pu-chia khi nói về biên giới ba nước năm 2018
  "tn-de5#21 → ck2-de2#5: cam pu chia",
  // tn-de6#19 (Đảng Cộng sản Đông Dương là phân bộ của Quốc tế Cộng sản): gk2-de1#17 chỉ nói Nguyễn Ái Quốc dự hội nghị của Quốc tế Cộng sản
  // năm 1923, không cho biết Đảng là phân bộ của tổ chức nào
  "gk2-de1#17 → tn-de6#19: quốc tế cộng", "gk2-de1#17 → tn-de6#19: tế cộng sản",
  // tn-de8#23 (Tuần lễ vàng giải quyết khó khăn tài chính): ck2-de1#17 chỉ có “Lời kêu gọi đồng bào tham gia Tuần lễ vàng” ở một lựa chọn sai,
  // không cho biết phong trào đó nhằm việc gì
  "ck2-de1#17 → tn-de8#23: tuần lễ vàng",
];
assert.deepEqual([...r1.chuLo, ...r2.chuLo].sort(), [...DA_XEM].sort(), "đáp án bằng chữ có ở câu khác đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual([...r1.lo, ...r2.lo], [], "lộ đáp án:\n" + [...r1.lo, ...r2.lo].join("\n"));

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (nếu có) ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const truongChu = (q) => (q.type === "note" ? [q.x] : chu(q));
// tra nhanh: các chuỗi k từ của chữ đề thi thử (Map chuỗi → các câu), đi một lượt qua chữ nguồn đã chuẩn hoá; trả về Map chuỗi → các mã nguồn có chuỗi đó
const chuoiDe = (k, them) => { const m = new Map(); TNQ.concat(NOTES).forEach((q) => new Set(truongChu(q).concat(them && q._d ? [q._d] : []).flatMap((x) => chuoi(x, k))).forEach((c) => { if (!m.has(c)) m.set(c, []); m.get(c).push(q); })); return m; };
const timChuoi = (nguon, k, ds) => {
  const dau = new Set([...ds.keys()].map((c) => c.split(" ").slice(0, 2).join(" "))), ra = new Map();
  nguon.forEach(({ id, t }) => { const w = t.split(" "); for (let i = 0; i + k <= w.length; i++) { if (!dau.has(w[i] + " " + w[i + 1])) continue; const c = w.slice(i, i + k).join(" ");
    if (ds.has(c)) { if (!ra.has(c)) ra.set(c, new Set()); ra.get(c).add(id); } } });
  return ra;
};
if (SACH.length) {
  assert.ok(SACH.some((f) => /lich-su-12/.test(f)) && SACH.some((f) => /lich-su-11/.test(f)), "OnUp-Book có Lịch sử 11, 12");
  // chủ đề lớp 12 đúng tên bài trong mục lục (README của Lịch sử 12; tên rút gọn ở RUT_GON), tên chủ đề lớp 11 đúng mục lục (README của Lịch sử 11)
  const ml = (l, c) => { const f = path.join(BOOK, l, c, "README.md"); return fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null; };
  const r12 = ml("lop-12", "lich-su-12"), r11 = ml("lop-11", "lich-su-11");
  const hoa = (s) => s.normalize("NFC").toLocaleUpperCase("vi");
  if (r12) { const bai = [...r12.matchAll(/Bài (\d+)\. ([^|]+?) \|/g)].map((x) => x[2].trim());
    BAI.forEach((t) => assert.ok(bai.includes(RUT_GON[t] || t), "chủ đề đúng tên bài trong mục lục: " + t));
    const cd = [...r12.matchAll(/\*\*Chủ đề \d+\. ([^*]+)\*\*/g)].map((x) => hoa(x[1].trim())); CHU_DE_12.forEach(([t]) => assert.ok(cd.includes(hoa(t)), "tên chủ đề Lịch sử 12: " + t)); }
  if (r11) { const cd = [...r11.matchAll(/\*\*Chủ đề \d+\. ([^*]+)\*\*/g)].map((x) => hoa(x[1].trim()));
    assert.equal(cd.length, 6, "Lịch sử 11 có 6 chủ đề"); Object.values(CHU_DE_11).forEach((t) => assert.ok(cd.includes(hoa(t)), "tên chủ đề Lịch sử 11: " + t)); }
  const sach = SACH.map((f) => ({ id: f, t: khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")) }));
  const bao = (k) => { const ds = chuoiDe(k, true), gap = timChuoi(sach, k, ds); return [...gap.keys()].flatMap((c) => ds.get(c).map((q) => `${ten.get(q)}: ${c}`)); };
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách:\n" + [...new Set(bao(8))].join("\n"));
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách và mục lục.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả ba kho Lịch sử 12 và giữa các đề thi thử ---------- */
{
  const cua = (b, q) => ({ id: b.id, t: chu(q).concat(dpOf(b, q) ? [dpOf(b, q)] : []).map(khongDau).join(" | ") });
  const khac = BANKS.filter((b) => !b.pool).flatMap((b) => b.questions.map((q) => cua(b, q))).concat(BANKS.filter((b) => b.pool).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cua(b, q))));
  const bao = (k) => { const ds = chuoiDe(k, true), gap = timChuoi(khac, k, ds);
    return [...gap.keys()].flatMap((c) => ds.get(c).flatMap((q) => [...gap.get(c)].filter((id) => id !== q._de).map((id) => `${ten.get(q)} ~ ${id}: ${c}`))); };
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác:\n" + [...new Set(bao(8))].join("\n"));
}

/* ---------- tự thử các bộ tính với câu cố ý viết sai ---------- */
{
  // câu sắp xếp: đổi thứ tự hai sự kiện trong đề bài thì đáp án tính được đổi theo
  const qT = TNQ.find((q) => q.type === "mc" && /1\. .+; 2\. /.test(q.q));
  const ds = dsSuKien(qT), dao = Object.assign({}, qT, { q: qT.q.replace("1. " + ds[0] + ";", "1. " + ds[1] + ";").replace("2. " + ds[1] + ";", "2. " + ds[0] + ";") });
  assert.notEqual(thuTu(dao), thuTu(qT), "bộ tính trình tự nhận ra hai sự kiện đổi chỗ");
  // ý về thời gian viết sai
  const qY = TNQ.find((q) => q.type === "tf4" && q.o.some((o) => / diễn ra trước /.test(o)));
  if (qY) { const o = qY.o.find((x) => / diễn ra trước /.test(x)), m = /^(.+) diễn ra trước (.+)\.$/.exec(o);
    assert.equal(yThoiGian(qY, m[2] + " diễn ra trước " + m[1] + "."), !yThoiGian(qY, o), "đảo hai sự kiện thì ý đổi đúng/sai"); }
  // bộ dò lộ bắt được câu cố ý viết sai: đáp án của câu này chép vào lời giải câu khác; ngày tháng của câu sắp xếp chép sang câu khác
  const thu = (qs) => { const r = doLo(qs, [], () => true); return r.lo.concat(r.chuLo); };
  const ghi = (q, x) => { const o = Object.assign({}, q, { x: q.x + " " + x }); ten.set(o, "thử-giả"); return o; };
  const qA = TNQ.find((q) => q.type === "mc" && !/^\d/.test(q.o[0]) && q.o[0].split(" ").length >= 4), qK = TNQ.find((q) => q !== qA && q._de === qA._de && q.type === "mc");
  assert.ok(thu([qA, ghi(qK, qA.o[0] + ".")]).some((s) => s.startsWith("thử-giả → ")), "bộ dò lộ bắt được đáp án chép sang câu khác");
  assert.ok(thu([qT, ghi(qK, "Sự kiện ấy diễn ra ngày " + suKien(ds[0])[2] + ".")]).some((s) => /ngày /.test(s)), "bộ dò lộ bắt được ngày tháng của câu sắp xếp");
}
DE.forEach((b) => console.log(`${b.id}: ${b.questions.length} câu (${b.questions.filter((q) => q.type === "mc").length} nhiều lựa chọn, ${b.questions.filter((q) => q.type === "tf4").length} đúng/sai 4 ý), ` +
  `${b.questions.filter((q) => lop(q.topic) === 11).length} câu lớp 11, ${Object.keys(b.passages || {}).length} đoạn tư liệu; đáp án đúng dài nhất hoặc ngắn nhất ở ${b._le}/${b._mc} câu nhiều lựa chọn.`));
console.log(n + " câu đã tính lại hoặc so với bảng.");
console.log("MATH OK");
