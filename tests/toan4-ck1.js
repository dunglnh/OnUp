// Tính lại đáp án ngân hàng Toán 4 cuối kì I (data/banks/4-toan.js): ba đề cố định toan4-ck1-de1..de3 và các câu riêng
// của đề ngẫu nhiên toan4-ck1-ngau-nhien (Phiên N1). Mỗi câu: kiểm tra đề có đúng số liệu (has) rồi so đáp án với kết quả
// tính bằng code: trắc nghiệm o[0], điền khuyết ans[0], đúng/sai a, đúng/sai 4 ý a (4 ý), trả lời bằng số ans, nối cột
// r[i] của từng ô l[i], sắp xếp thứ tự o; tự luận: các số trong thang chấm và đáp án gợi ý. Câu có hình: đọc toạ độ trong
// hình (góc, vuông góc, song song, cạnh bằng nhau) rồi mới tính. Cuối cùng kiểm tra mức độ và ma trận: mọi câu có lv, rút thử
// nhiều lần ra đúng 10 Biết, 8 Hiểu, 7 Vận dụng.
// Chạy: node tests/toan4-ck1.js → in MATH OK.
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan4-ck1-ngau-nhien";

const fmt = (n) => { assert.ok(Number.isInteger(n), "không phải số nguyên: " + n); return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " "); };
const val = (s) => +String(s).replace(/\s/g, "");
const div = (a, b) => { assert.equal(a % b, 0, a + " : " + b + " có dư"); return a / b; };
const round = (n, p) => Math.round(n / p) * p;
const sum = (a) => a.reduce((s, v) => s + v, 0);
// giá trị biểu thức viết như trong đề ("a × 5", "64 : a", "1 999 + 467 + 1"), thay chữ bằng số
const ev = (e, vars) => {
  let s = String(e).replace(/(\d) (?=\d{3}\b)/g, "$1").replace(/×/g, "*").replace(/:/g, "/").replace(/−/g, "-");
  Object.entries(vars || {}).forEach(([k, v]) => (s = s.replace(new RegExp("\\b" + k + "\\b", "g"), "(" + v + ")")));
  assert.ok(/^[\d\s+\-*/().]+$/.test(s), "biểu thức lạ: " + e);
  return Function("return " + s)();
};
// đọc số kiểu sách Việt Nam: linh, mốt, tư, lăm; lớp không đứng đầu đọc đủ "không trăm"
const SO = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
function doc(n) {
  const groups = [];
  for (let x = n; x > 0; x = Math.floor(x / 1000)) groups.unshift(x % 1000);
  const LOP = ["", " nghìn", " triệu"];
  return groups.map((g, i) => {
    if (!g && i) return "";
    const h = Math.floor(g / 100), t = Math.floor(g / 10) % 10, u = g % 10, full = i > 0 || h > 0, w = [];
    if (full) w.push(SO[h] + " trăm");
    if (t === 0 && u) w.push(full ? "linh " + SO[u] : SO[u]);
    if (t === 1) w.push("mười" + (u === 5 ? " lăm" : u ? " " + SO[u] : ""));
    if (t >= 2) w.push(SO[t] + " mươi" + (u === 1 ? " mốt" : u === 4 ? " tư" : u === 5 ? " lăm" : u ? " " + SO[u] : ""));
    return w.join(" ") + LOP[groups.length - 1 - i];
  }).filter(Boolean).join(" ");
}
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const HANG = ["đơn vị", "chục", "trăm", "nghìn", "chục nghìn", "trăm nghìn", "triệu", "chục triệu", "trăm triệu"];
const LOP = ["đơn vị", "nghìn", "triệu"];
const hangOf = (n, d) => { const s = String(n), i = s.indexOf(String(d)); assert.ok(i >= 0 && s.lastIndexOf(String(d)) === i, `chữ số ${d} phải có đúng một lần trong ${n}`); return s.length - 1 - i; };
const loai = (deg) => (deg < 90 ? "Góc nhọn" : deg === 90 ? "Góc vuông" : deg < 180 ? "Góc tù" : "Góc bẹt");
const theKi = (y) => Math.ceil(y / 100);
const LA_MA = (n) => [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]].reduce((s, [v, r]) => { while (n >= v) { s += r; n -= v; } return s; }, "");

/* ---------- đọc hình SVG ---------- */
const nums = (s) => s.trim().split(/[\s,]+/).map(Number);
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const lines = (svg) => [...svg.matchAll(/<line [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { a: [+a.x1, +a.y1], b: [+a.x2, +a.y2], stroke: a.stroke || "" }; });
const polys = (svg) => [...svg.matchAll(/<polygon [^>]*>/g)].map((m) => { const p = nums(attrs(m[0]).points); return p.reduce((o, v, i) => (i % 2 ? o[o.length - 1].push(v) : o.push([v]), o), []); });
const dots = (svg) => [...svg.matchAll(/<circle [^>]*>/g)].map((m) => { const a = attrs(m[0]); return [+a.cx, +a.cy]; });
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { at: [+a.x, +a.y], t: m[2] }; });
const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const near = (p, q, e) => dist(p, q) <= (e || 0.6);
const dot = (u, v) => u[0] * v[0] + u[1] * v[1];
const cross = (u, v) => u[0] * v[1] - u[1] * v[0];
const deg = (u, v) => Math.round(Math.acos(dot(u, v) / Math.hypot(...u) / Math.hypot(...v)) * 180 / Math.PI * 10) / 10; // góc giữa hai vectơ
const songSong = (u, v) => Math.abs(cross(u, v)) < 1e-6 * Math.hypot(...u) * Math.hypot(...v) + 1e-9;
const vuongGoc = (u, v) => Math.abs(dot(u, v)) < 1e-6 * Math.hypot(...u) * Math.hypot(...v) + 1e-9;
const huong = (p, o) => Math.round(Math.atan2(o[1] - p[1], p[0] - o[0]) * 180 / Math.PI); // góc (độ) của điểm p nhìn từ o, chiều ngược kim đồng hồ
const nhan = (svg, name) => { const t = texts(svg).filter((x) => x.t === name); assert.equal(t.length, 1, "hình cần đúng một nhãn " + name); return t[0].at; };
// đỉnh có tên: điểm (đầu đoạn thẳng, đỉnh đa giác, chấm) gần nhãn nhất
const dinh = (pts, svg, name) => { const at = nhan(svg, name); return pts.slice().sort((p, q) => dist(p, at) - dist(q, at))[0]; };
// giao điểm của hai đoạn thẳng (nếu cắt nhau trong cả hai đoạn)
const cat = (l1, l2) => {
  const r = sub(l1.b, l1.a), s = sub(l2.b, l2.a), d = cross(r, s);
  if (Math.abs(d) < 1e-9) return null;
  const t = cross(sub(l2.a, l1.a), s) / d, u = cross(sub(l2.a, l1.a), r) / d;
  return t >= 0 && t <= 1 && u >= 0 && u <= 1 ? [l1.a[0] + t * r[0], l1.a[1] + t * r[1]] : null;
};
const tenDuong = (svg, ls) => { // đường thẳng có nhãn: đầu mút gần nhãn nhất
  const out = {};
  texts(svg).filter((x) => /^[a-z]$/.test(x.t)).forEach((x) => { out[x.t] = ls.slice().sort((p, q) => Math.min(dist(p.a, x.at), dist(p.b, x.at)) - Math.min(dist(q.a, x.at), dist(q.b, x.at)))[0]; });
  return out;
};
const vec = (l) => sub(l.b, l.a);
const tuGiac = (svg, names) => { // đa giác 4 đỉnh có nhãn → {A: [x, y], …}
  const ps = polys(svg); assert.equal(ps.length, 1, "hình cần đúng một tứ giác"); assert.equal(ps[0].length, 4);
  const o = {}; names.forEach((n) => (o[n] = dinh(ps[0], svg, n)));
  assert.equal(new Set(Object.values(o).map(String)).size, 4, "mỗi nhãn một đỉnh");
  return o;
};

/* ---------- kiểm tra từng câu ----------
   right(q): đáp án tính bằng code (so với o[0], ans[0], a, ans, r của từng ô trái, o); more(q): kiểm tra thêm (nhiễu, bước giải). */
const de1 = [
  { has: "Ba trăm linh năm nghìn bốn trăm hai mươi", right: (q) => { const n = 305420; assert.equal(cap(doc(n)), /“(.+)”/.exec(q.q)[1]); return fmt(n); } },
  { has: "47 256 913, chữ số 7", right: () => cap("hàng " + HANG[hangOf(47256913, 7)]) },
  { has: "6 trăm nghìn, 4 nghìn, 3 chục và 8 đơn vị", right: () => fmt(600000 + 4000 + 30 + 8) },
  { has: "489 760; 498 670; 489 706; 498 607", right: () => fmt(Math.max(489760, 498670, 489706, 498607)) },
  { has: "3 459 210 đến hàng trăm nghìn", right: () => fmt(round(3459210, 100000)) },
  { has: "9 998 là số lẻ", right: () => 9998 % 2 === 1 },
  { has: "Số liền sau của số 2 099 999", right: () => fmt(2099999 + 1) },
  { has: "a = 125, giá trị của biểu thức 900 − a × 4", right: () => fmt(ev("900 − a × 4", { a: 125 })) },
  { has: "tấm thảm hình vuông có cạnh dài n mét", right: (q) => { const m = q.o.filter((o) => [3, 5, 7].every((n) => ev(o, { n }) === n + n + n + n)); assert.equal(m.length, 1); return m[0]; } },
  { has: "458 362 + 236 519", right: () => fmt(458362 + 236519) },
  { has: "862 450 − 315 270", right: () => fmt(862450 - 315270) },
  { has: "36 480 : 6", right: () => fmt(div(36480, 6)) },
  { has: "1 568 + 3 750 + 432", right: () => fmt(1568 + 3750 + 432), more: () => assert.equal(1568 + 432, 2000) },
  // giao hoán là đổi chỗ các số hạng; hai vế giữ nguyên thứ tự 27, 45, 55, chỉ đổi cách nhóm, là tính chất kết hợp
  { has: "(27 + 45) + 55 = 27 + (45 + 55), ta đã dùng tính chất giao hoán", right: (q) => { const [, l, r] = /(\(27 \+ 45\) \+ 55) = (27 \+ \(45 \+ 55\))/.exec(q.q); assert.equal(ev(l), ev(r)); return l.match(/\d+/g).join() !== r.match(/\d+/g).join(); }, more: () => assert.equal(45 + 55, 100) },
  { has: "94 quả dưa hấu", right: () => fmt(div(94 + 12, 2)), more: (q) => assert.ok(q.x.includes(`94 − ${div(94 + 12, 2)} = ${94 - div(94 + 12, 2)}`)) },
  { has: "Tổng của hai số là 1 260. Số lớn hơn số bé 140", right: () => fmt(div(1260 - 140, 2)), more: (q) => [fmt(div(1260 + 140, 2)), fmt(1260 - 140), fmt(div(1260, 2))].forEach((o) => assert.ok(q.o.includes(o), "nhiễu " + o)) },
  { has: "3 thùng dầu, mỗi thùng 45 lít", right: () => fmt(45 * 3 - (32 + 41)) },
  { has: "Góc có số đo 120°", right: () => loai(120) },
  { has: "Góc bẹt có số đo bằng", right: () => fmt(90 * 2) },
  { has: "Hai mép của một trang vở", right: () => loai(deg([1, 0], [0, 1])) }, // trang vở hình chữ nhật: hai mép kề nhau vuông góc
  { has: "3 tạ 5 kg", right: () => fmt(3 * 100 + 5) },
  { has: "2 m² = ? dm²", right: () => fmt(2 * 100) + " dm²" },
  { has: "3 phút 20 giây", right: () => fmt(3 * 60 + 20) },
  { has: "Hai cạnh đối diện của hình chữ nhật thì song song", right: () => songSong(sub([5, 0], [0, 0]), sub([5, 3], [0, 3])) && songSong(sub([0, 3], [0, 0]), sub([5, 3], [5, 0])) },
  { has: "Hình thoi ABCD có cạnh AB = 6 cm", right: () => fmt(6 * 4) + " cm" }
];
const de2 = [
  { has: "Số 2 050 300 đọc là", right: () => cap(doc(2050300)), more: (q) => q.o.slice(1).forEach((o) => assert.notEqual(o, cap(doc(2050300)))) },
  { has: "chữ số 8 trong số 3 816 405", right: () => fmt(8 * 10 ** hangOf(3816405, 8)) },
  { has: "Lớp nghìn của số 52 714 096", right: () => String(Math.floor(52714096 / 1000) % 1000).padStart(3, "0").split("").join("; ") },
  { has: "987 654 > 1 000 000", right: () => 987654 > 1000000 },
  { has: "Làm tròn số 7 249 860", right: () => fmt(round(7249860, 100000)) },
  { has: "Số chẵn lớn nhất có năm chữ số", right: () => { let n = 99999; while (n % 2) n--; return fmt(n); } },
  { has: "Có bao nhiêu số tự nhiên bé hơn 5", right: () => { let c = 0; for (let k = 0; k < 5; k++) c++; return String(c); } }, // số tự nhiên bắt đầu từ 0
  { has: "m = 7 và n = 9", right: () => fmt(ev("(m + n) × 7", { m: 7, n: 9 })) },
  { has: "Với b = 5, biểu thức nào có giá trị lớn nhất", right: (q) => q.o.slice().sort((x, y) => ev(y, { b: 5 }) - ev(x, { b: 5 }))[0], more: (q) => assert.equal(new Set(q.o.map((o) => ev(o, { b: 5 }))).size, 4) },
  { has: "386 405 + 572 718", right: () => fmt(386405 + 572718) },
  { has: "657 928 − 219 635", right: () => fmt(657928 - 219635) },
  { has: "135 470 + ___ = 482 650", right: () => fmt(482650 - 135470) },
  { has: "4 725 + 999 + 275", right: () => fmt(4725 + 999 + 275), more: (q) => q.o.slice(1).forEach((o) => assert.notEqual(val(o), 4725 + 999 + 275)) },
  { has: "số lớn nhất có ba chữ số, hiệu của chúng là 101", right: () => fmt(div(999 + 101, 2)) },
  { has: "tổng là 90 và hiệu là 14. Số bé là (90 + 14) : 2", right: () => div(90 + 14, 2) === div(90 - 14, 2), more: (q) => assert.ok(q.x.includes(`(90 − 14) : 2 = ${div(90 - 14, 2)}`)) },
  { has: "4 kg táo", right: () => fmt(150000 - (22000 * 4 + 21000)) + " đồng" },
  { has: "12 850 kg gạo", right: () => fmt(12850 - (3200 + 3200 * 2)) },
  { has: "gấp 5 lần 20°", right: () => loai(20 * 5) },
  // xe máy nặng khoảng 80–150 kg: chỉ đơn vị tạ cho số đo hợp lí
  { has: "xe máy nặng khoảng 1", right: (q) => { const kg = { tấn: 1000, tạ: 100, yến: 10, kg: 1 }, m = q.o.filter((u) => 1 * kg[u] >= 80 && 1 * kg[u] <= 150); assert.equal(m.length, 1); return m[0]; } },
  { has: "Thước đo góc dùng để đo góc theo đơn vị nào", right: () => "Độ (°)" },
  { has: "7 yến 6 kg", right: () => fmt(7 * 10 + 6) },
  { has: "5 dm² 8 cm²", right: () => fmt(5 * 100 + 8) },
  { has: "Năm 1945 thuộc thế kỉ nào", right: () => "Thế kỉ " + LA_MA(theKi(1945)) },
  { has: "Hình chữ nhật ABCD có bao nhiêu cặp cạnh vuông góc", right: () => { const P = [[0, 0], [5, 0], [5, 3], [0, 3]], s = P.map((p, i) => sub(P[(i + 1) % 4], p)); let n = 0; for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) if (vuongGoc(s[i], s[j])) n++; return String(n); } },
  { has: "AB = 7 cm, BC = 4 cm. Chu vi hình bình hành là 22 cm", right: () => (7 + 4) * 2 === 22 }
];
const de3 = [
  { has: "5 chục triệu, 3 triệu, 7 nghìn và 2 chục", right: () => fmt(50000000 + 3000000 + 7000 + 20) },
  { has: "608 315 742, chữ số 0", right: () => { const h = hangOf(608315742, 0); return cap(`hàng ${HANG[h]}, lớp ${LOP[Math.floor(h / 3)]}`); } },
  { has: "Từ bốn chữ số 0, 3, 5, 9", right: () => { const d = [0, 3, 5, 9], all = []; d.forEach((a) => d.forEach((b) => d.forEach((c) => d.forEach((e) => { if (a && new Set([a, b, c, e]).size === 4) all.push(a * 1000 + b * 100 + c * 10 + e); })))); return fmt(Math.min(...all)); } },
  { has: "5 309 280; 5 390 028; 5 093 820; 5 309 082", right: () => [5309280, 5390028, 5093820, 5309082].sort((a, b) => a - b).map(fmt).join("; ") },
  { has: "Làm tròn số 8 950 000", right: () => round(8950000, 100000) === 9000000 },
  { has: "số lẻ lớn hơn 60 và bé hơn 80", right: () => { let n = 0; for (let k = 61; k < 80; k++) if (k % 2) n++; return String(n); } },
  { has: "Số liền trước của số 4 000 000", right: () => fmt(4000000 - 1) },
  { has: "a = 2 400 và b = 8", right: () => fmt(ev("a : b + a", { a: 2400, b: 8 })) },
  { has: "chu vi 30 cm, cạnh AB dài 9 cm", right: () => fmt(div(30, 2) - 9) },
  { has: "473 528 + 251 647", right: () => fmt(473528 + 251647) },
  { has: "Hiệu của số lớn nhất có sáu chữ số và số bé nhất có sáu chữ số", right: () => fmt(999999 - 100000) },
  { has: "___ + 48 735 = 351 960", right: () => fmt(351960 - 48735) },
  { has: "2 345 + 1 860 + 655 + 140", right: () => fmt(2345 + 1860 + 655 + 140), more: () => { assert.equal(2345 + 655, 3000); assert.equal(1860 + 140, 2000); } },
  // nhân với số có một chữ số trong phạm vi 100 000, có nhớ không quá hai lượt, không liên tiếp (Rút ra N23)
  { has: "21 403 × 4", right: () => fmt(21403 * 4), more: () => { let c = 0; const nho = String(21403).split("").reverse().map((d) => (c = Math.floor((+d * 4 + c) / 10))).map((v, i) => (v ? i : -1)).filter((i) => i >= 0); assert.ok(21403 * 4 <= 100000 && nho.length <= 2 && nho.every((i, k) => !k || i - nho[k - 1] > 1), "lượt nhớ " + nho); } },
  { has: "sợi dây dài 58 m", right: () => fmt(div(58 - 16, 2)) },
  { has: "Buổi tập bơi của Khoa kéo dài 1 giờ", right: () => fmt(div(60 + 32, 2)) + " phút", more: (q) => [60 - div(60 + 32, 2), div(60, 2), 60 - 32].forEach((n) => assert.ok(q.o.includes(n + " phút"), "nhiễu " + n)) }, // 1 giờ = 60 phút
  { has: "Thư viện có 2 450 quyển truyện", right: () => fmt(2450 + 380 + 380 * 3) },
  { has: "mỗi ngày đội công nhân sửa được 1 250 m", right: () => fmt(1250 * 2 + (1250 - 320)) + " m" },
  { has: "Góc nào dưới đây là góc nhọn", right: (q) => { const m = q.o.filter((o) => loai(val(/\d+/.exec(o)[0])) === "Góc nhọn"); assert.equal(m.length, 1); return m[0]; } },
  { has: "Chia một góc vuông thành hai góc bằng nhau", right: () => fmt(div(90, 2)) },
  { has: "2 tấn 3 tạ", right: () => fmt(2 * 1000 + 3 * 100) },
  { has: "9 cm² = ? mm²", right: () => fmt(9 * 100) + " mm²" },
  { has: "Năm 1800 thuộc thế kỉ XIX", right: () => LA_MA(theKi(1800)) === "XIX", more: (q) => { assert.equal(LA_MA(theKi(1800)), "XVIII"); assert.equal(LA_MA(theKi(1801)), "XIX"); assert.equal(theKi(1701), 18); assert.ok(q.x.includes("từ năm 1701 đến hết năm 1800")); } },
  { has: "Bạn An chạy 300 m hết 1 phút 5 giây", right: () => fmt(1 * 60 + 5 - 58) },
  // hai đường thẳng cùng vuông góc với đường thẳng thứ ba (hướng (1, 0)) thì có hướng (0, k), song song với nhau
  { has: "Hai đường thẳng cùng vuông góc với một đường thẳng thứ ba", right: () => vuongGoc([0, 2], [1, 0]) && vuongGoc([0, -5], [1, 0]) && songSong([0, 2], [0, -5]) }
];
// câu riêng của đề ngẫu nhiên
const own = [
  { has: "Cho số 84 506 237", right: (q) => { const n = 84506237; return [String(n).length === 8, HANG[hangOf(n, 5)] === "trăm nghìn" && LOP[Math.floor(hangOf(n, 5) / 3)] === "nghìn", 3 * 10 ** hangOf(n, 3) === 300, q.o[3] === "Số này đọc là: " + cap(doc(n)) + "."]; } },
  { has: "Sắp xếp các số sau theo thứ tự từ bé đến lớn", right: (q) => q.o.slice().sort((a, b) => val(a) - val(b)) },
  { has: "Số bé nhất có bảy chữ số khác nhau", right: () => { for (let n = 1000000; ; n++) if (new Set(String(n)).size === 7) return fmt(n); } },
  { has: "số tròn triệu lớn hơn 3 500 000 và bé hơn 8 000 000", right: () => { let c = 0; for (let n = 0; n < 8000000; n += 1000000) if (n > 3500000) c++; return c; } },
  { has: "1 362 500 chiếc bút bi", right: () => fmt(round(1362500, 100000)) + " chiếc" },
  { has: "4 571; 6 038; 9 995; 2 403, số chẵn", right: () => { const m = [4571, 6038, 9995, 2403].filter((n) => n % 2 === 0); assert.equal(m.length, 1); return fmt(m[0]); } },
  { has: "Với a = 8, nối mỗi biểu thức", right: (q) => q.l.map((e) => fmt(ev(e, { a: 8 }))), more: (q) => q.r.slice(q.l.length).forEach((x) => assert.ok(!q.l.some((e) => ev(e, { a: 8 }) === val(x)))) },
  { has: "phòng chiếu phim có a hàng ghế", right: () => ev("a × b − c", { a: 18, b: 9, c: 143 }) },
  { has: "tính chu vi chiếc khăn bằng biểu thức (a + b) × 2. Mỗi ý", right: () => { const P = (a, b) => ev("(a + b) × 2", { a, b }); return [P(12, 8) === 40, P(12, 8) === 28, [[12, 8], [30, 7], [5, 5]].every(([a, b]) => P(a + 1, b + 1) - P(a, b) === 4), P(15, 5) === P(12, 8)]; }, more: () => assert.equal(ev("12 + 8 × 2"), 28) },
  { has: "___ − 125 360 = 274 640", right: () => fmt(274640 + 125360) },
  { has: "tổng của số bị trừ, số trừ và hiệu là 1 000 000", right: () => { const T = 1000000, sbt = div(T, 2); [1, 123456, 499999].forEach((st) => assert.equal(sbt + st + (sbt - st), T)); return sbt; } },
  { has: "cộng với 45 678 thì được tổng bé hơn 100 000", right: () => { for (let n = 99999; n >= 10000; n--) if (n + 45678 < 100000) return n; } },
  { has: "45 236 : 4", right: () => fmt(div(45236, 4)), more: (q) => q.o.slice(1).forEach((o) => assert.notEqual(val(o) * 4, 45236)) },
  { has: "Tính bằng cách thuận tiện rồi nối", right: (q) => q.l.map((e) => fmt(ev(e))), more: (q) => { q.r.slice(q.l.length).forEach((x) => assert.ok(!q.l.some((e) => ev(e) === val(x)))); [[57, 43], [250, 750], [1999, 1], [3600, 400]].forEach(([a, b]) => assert.equal((a + b) % 100, 0)); } },
  { has: "Hai thùng có tất cả 120 l dầu", essay: (q) => {
    const tong = 120, chuyen = 10, hieu = chuyen * 2, mot = div(tong + hieu, 2), hai = tong - mot;
    assert.equal(mot - chuyen, hai + chuyen);
    const rb = q.rubric.map((c) => c.c).join(" | ");
    [`${chuyen} × 2 = ${hieu}`, `(${tong} + ${hieu}) : 2 = ${mot}`, `${tong} − ${mot} = ${hai}`].forEach((s) => { assert.ok(rb.includes(s), "thang chấm thiếu " + s); assert.ok(q.x.includes(s), "gợi ý thiếu " + s); });
    assert.ok(q.x.includes(`thùng thứ nhất ${mot} l, thùng thứ hai ${hai} l`));
  } },
  { has: "Tổng số tuổi của mẹ và con là 42 tuổi", right: () => div(42 - 26, 2) + 5 },
  { has: "Nhà bác Ba thu hoạch được 2 450 kg khoai", essay: (q) => {
    const hai = div(1200, 2), ban = 1200 + hai, con = 2450 - ban;
    const rb = q.rubric.map((c) => c.c).join(" | ");
    [`1 200 : 2 = ${fmt(hai)}`, `1 200 + ${fmt(hai)} = ${fmt(ban)}`, `2 450 − ${fmt(ban)} = ${fmt(con)}`].forEach((s) => { assert.ok(rb.includes(s), "thang chấm thiếu " + s); assert.ok(q.x.includes(s), "gợi ý thiếu " + s); });
    assert.ok(q.x.includes(`Đáp số: ${fmt(con)} kg`));
  } },
  { has: "8 thùng nước uống, mỗi thùng có 24 chai", right: () => div(24 * 8 - 75, 3) },
  { has: "Một cuộn vải dài 120 m", right: () => 120 - (3 * 15 + 2 * 20) },
  { has: "Góc nào là góc tù", right: (q) => {
    const L = lines(q.svg), m = ["A", "B", "C", "D"].map((n) => {
      const v = (([x, y]) => [x, y - 22])(nhan(q.svg, n)), rays = L.filter((l) => near(l.a, v)).map((l) => sub(l.b, l.a));
      if (rays.length === 2) return [n, deg(rays[0], rays[1])];
      const through = L.filter((l) => !near(l.a, v) && !near(l.b, v) && Math.abs(cross(sub(l.b, l.a), sub(v, l.a))) < 1e-6 && dot(sub(v, l.a), sub(v, l.b)) < 0);
      assert.equal(through.length, 1, "góc đỉnh " + n); return [n, 180];
    });
    assert.deepEqual(m.map(([, d]) => loai(d)), ["Góc nhọn", "Góc vuông", "Góc tù", "Góc bẹt"]);
    return "Góc đỉnh " + m.find(([, d]) => loai(d) === "Góc tù")[0];
  } },
  { has: "Góc đỉnh O, cạnh OA, OB có số đo bằng bao nhiêu", right: (q) => {
    const O = (([x, y]) => [x, y - 24])(nhan(q.svg, "O")), L = lines(q.svg).filter((l) => near(l.a, O));
    assert.equal(L.length, 2, "hai cạnh OA, OB");
    const A = L.find((l) => huong(l.b, O) === 0), B = L.find((l) => l !== A);
    assert.ok(A && dist(A.b, nhan(q.svg, "A")) < 20 && dist(B.b, nhan(q.svg, "B")) < 20, "cạnh OA đi qua vạch 0");
    texts(q.svg).filter((t) => /^\d+$/.test(t.t)).forEach((t) => assert.ok(Math.abs(huong(t.at, O) - +t.t) <= 6, `vạch ${t.t} đặt sai chỗ`)); // thang số tăng ngược chiều kim đồng hồ từ vạch 0
    return huong(B.b, O) + "°";
  } },
  { has: "ba điểm A, O, C cùng nằm trên một đường thẳng", right: (q) => {
    const P = dots(q.svg), [A, O, C, B] = ["A", "O", "C", "B"].map((n) => dinh(P, q.svg, n));
    const aob = deg(sub(A, O), sub(B, O)), boc = deg(sub(B, O), sub(C, O)), aoc = deg(sub(A, O), sub(C, O));
    assert.ok(lines(q.svg).some((l) => near(l.a, O) && near(l.b, B)), "có tia OB");
    return [loai(boc) === "Góc nhọn", loai(aob) === "Góc vuông", loai(aoc) === "Góc bẹt", aob < boc];
  } },
  { has: "Sắp xếp các số đo khối lượng", right: (q) => { const kg = { kg: 1, yến: 10, tạ: 100, tấn: 1000 }, w = (s) => val(s.split(" ")[0]) * kg[s.split(" ")[1]]; assert.equal(new Set(q.o.map(w)).size, 4); return q.o.slice().sort((a, b) => w(a) - w(b)); } },
  { has: "Nối mỗi số đo ở cột trái với số đo bằng nó", right: (q) => {
    const D = { "1 tạ": [100, "kg"], "1 tấn": [1000, "kg"], "1 m²": [100, "dm²"], "1 thế kỉ": [100, "năm"] }, parse = (s) => [val(s.slice(0, s.lastIndexOf(" "))), s.slice(s.lastIndexOf(" ") + 1)];
    q.r.slice(q.l.length).forEach((x) => assert.ok(!q.l.some((l) => JSON.stringify(D[l]) === JSON.stringify(parse(x)))));
    return q.l.map((l) => q.r.find((x) => JSON.stringify(parse(x)) === JSON.stringify(D[l])));
  } },
  { has: "1 tấn 5 tạ cà phê", right: () => div(1 * 1000 + 5 * 100 - 11 * 100, 8) }, // 1 tấn = 1 000 kg, 1 tạ = 100 kg
  { has: "Minh chạy hết 2 phút 15 giây", right: () => { const t = { Minh: 2 * 60 + 15, Hùng: 128, Nam: 2 * 60 + 5 }; return Object.keys(t).sort((a, b) => t[a] - t[b])[0]; } },
  { has: "Đường thẳng nào vuông góc với đường thẳng m", right: (q) => {
    const d = tenDuong(q.svg, lines(q.svg));
    ["n", "p"].forEach((k) => assert.ok(cat(d.m, d[k]), k + " phải cắt m trong hình"));
    const m = ["n", "p"].filter((k) => vuongGoc(vec(d.m), vec(d[k])));
    assert.equal(m.length, 1); assert.ok(Math.abs(deg(vec(d.m), vec(d.p)) - 90) >= 30, "p phải nhìn rõ là không vuông góc");
    return "Đường thẳng " + m[0];
  } },
  { has: "Cặp đường thẳng nào song song với nhau", right: (q) => {
    const d = tenDuong(q.svg, lines(q.svg)), pairs = [["a", "b"], ["a", "c"], ["b", "c"]].filter(([x, y]) => songSong(vec(d[x]), vec(d[y])));
    assert.equal(pairs.length, 1); assert.ok(cat(d.c, d.a) && cat(d.c, d.b), "c phải cắt a và b trong hình");
    return pairs[0].join(" và ");
  } },
  { has: "Quan sát tứ giác PQRS", right: (q) => {
    const p = tuGiac(q.svg, ["P", "Q", "R", "S"]), s = (x, y) => sub(p[y], p[x]);
    assert.ok(Math.abs(deg(s("P", "Q"), s("P", "S")) - 90) >= 15 && deg(s("P", "Q"), s("S", "R")) >= 15, "PQ phải nhìn rõ là không vuông góc với PS, không song song với SR");
    const keo = (a, b) => ({ a, b: [a[0] + 100 * (b[0] - a[0]), a[1] + 100 * (b[1] - a[1])] }), g = cat(keo(p.P, p.Q), keo(p.S, p.R));
    assert.ok(g && g[0] > p.R[0], "kéo dài PQ và SR về phía bên phải thì cắt nhau (lời giải ý d)");
    // kí hiệu góc vuông (đường gấp khúc ngắn) ở hai đỉnh S và R, nơi cạnh SR vuông góc với PS và QR
    const ki = [...q.svg.matchAll(/<path d="M([\d.]+) ([\d.]+) [HV]([\d.]+) [HV]([\d.]+)"/g)].map((m) => [+m[1], +m[2]]);
    ["S", "R"].forEach((n) => assert.ok(vuongGoc(s(n === "S" ? "P" : "Q", n), s("S", "R")) && ki.some((k) => dist(k, p[n]) <= 15), "kí hiệu góc vuông ở đỉnh " + n));
    return [songSong(s("P", "S"), s("Q", "R")), vuongGoc(s("P", "Q"), s("P", "S")), vuongGoc(s("S", "R"), s("P", "S")), songSong(s("P", "Q"), s("S", "R"))];
  } },
  { has: "Hình nào là hình thoi", right: (q) => {
    const ps = polys(q.svg), cuoi = (P) => P.map((p, i) => sub(P[(i + 1) % 4], p)), dai = (v) => Math.hypot(...v);
    const thoi = ps.map((P) => { const s = cuoi(P), len = s.map(dai); return songSong(s[0], s[2]) && songSong(s[1], s[3]) && len.every((x) => Math.abs(x - len[0]) < 1e-9); });
    assert.equal(ps.length, 4); assert.equal(thoi.filter(Boolean).length, 1);
    ps.flat(2).forEach((v) => assert.equal(v % 16, 0, "đỉnh phải nằm trên giao điểm của lưới ô vuông (ô 16)")); // học sinh đếm ô để so cạnh
    ps.flat().forEach(([x]) => assert.ok(x > 0 && x < 320, "hình nằm trong khung, không chạm mép"));
    const k = thoi.indexOf(true), at = ps[k].reduce((a, p) => a + p[0], 0) / 4, lb = texts(q.svg).filter((t) => /^Hình \d$/.test(t.t)).sort((x, y) => Math.abs(x.at[0] - at) - Math.abs(y.at[0] - at))[0];
    cuoi(ps[k]).forEach((v) => assert.deepEqual(v.map((x) => Math.abs(x) / 16), [1, 3])); // lời giải: mỗi cạnh đi 1 ô ngang, 3 ô dọc
    // lời giải các hình còn lại: hình 1 bình hành, cạnh ngang ngắn hơn cạnh xiên; hình 2 hai cạnh trên dài hơn hai cạnh dưới; hình 4 hình chữ nhật
    const s1 = cuoi(ps[0]); assert.ok(songSong(s1[0], s1[2]) && songSong(s1[1], s1[3]) && s1[0][1] === 0 && dai(s1[0]) < dai(s1[1]), "hình 1 là hình bình hành, cạnh ngang ngắn hơn cạnh xiên");
    const P2 = ps[1], tren = P2.reduce((a, v) => (v[1] < a[1] ? v : a)), duoi = P2.reduce((a, v) => (v[1] > a[1] ? v : a));
    assert.ok(P2.filter((v) => v !== tren && v !== duoi).every((v) => dai(sub(v, tren)) > dai(sub(v, duoi)) + 1), "hình 2: hai cạnh trên dài hơn hai cạnh dưới");
    const s4 = cuoi(ps[3]); assert.ok(s4.every((v, i) => vuongGoc(v, s4[(i + 1) % 4])) && dai(s4[0]) !== dai(s4[1]), "hình 4 là hình chữ nhật, không phải hình vuông");
    return lb.t;
  } },
  { has: "Cho hình bình hành MNPQ", right: (q) => {
    const p = tuGiac(q.svg, ["M", "N", "P", "Q"]), s = (x, y) => sub(p[y], p[x]), len = (x, y) => Math.hypot(...s(x, y));
    assert.ok(songSong(s("M", "N"), s("Q", "P")) && songSong(s("M", "Q"), s("N", "P")), "MNPQ phải là hình bình hành");
    return [songSong(s("M", "N"), s("Q", "P")), Math.abs(len("M", "Q") - len("N", "P")) < 1e-9, vuongGoc(s("Q", "M"), s("Q", "P")), [len("N", "P"), len("P", "Q"), len("Q", "M")].every((x) => Math.abs(x - len("M", "N")) < 1e-9)];
  } }
];

let n = 0;
const run = (id, qs, checks) => {
  assert.equal(qs.length, checks.length, id + ": số câu khác số kiểm tra");
  qs.forEach((q, i) => {
    const c = checks[i], at = id + "#" + (i + 1);
    assert.ok(q.q.includes(c.has), at + ": đề không có “" + c.has + "”");
    if (q.type === "essay") { assert.ok(c.essay, at + ": tự luận cần kiểm tra thang chấm"); c.essay(q); n++; return; }
    const want = c.right(q);
    const got = { fill: () => q.ans[0], tf: () => q.a, tf4: () => q.a, num: () => q.ans, match: () => q.r.slice(0, q.l.length), order: () => q.o }[q.type] || (() => q.o[0]);
    // so bằng JSON: câu hỏi nạp trong vm khác (tests/nap-de.js), mảng của nó không cùng nguyên mẫu với mảng ở đây
    assert.strictEqual(JSON.stringify(got()), JSON.stringify(want), at + ": đáp án " + JSON.stringify(got()) + ", tính được " + JSON.stringify(want));
    if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), at + ": nhiễu trùng đáp án đúng");
    if (c.more) c.more(q);
    n++;
  });
};
for (const [id, checks] of [["toan4-ck1-de1", de1], ["toan4-ck1-de2", de2], ["toan4-ck1-de3", de3]]) {
  const b = bank(id); assert.ok(b, "thiếu " + id); assert.equal(b.questions.length, 25);
  run(id, b.questions, checks);
}
const pool = bank(POOL), mine = pool.questions.filter((q) => q.src === POOL);
run(POOL, mine, own);

/* ---------- mức độ và ma trận ---------- */
assert.ok(pool.questions.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
// câu riêng nào cũng nằm trong một ô có số câu của ma trận (không có câu không bao giờ được rút)
mine.forEach((q, i) => assert.ok(M[q.topic] && M[q.topic][q.lv - 1] > 0, `${POOL}#${i + 1}: ô (${q.topic}, mức ${q.lv}) không có trong ma trận`));
const seen = new Set();
for (let k = 0; k < 300; k++) {
  const d = Quiz.draw(pool);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.lv === l).length), [10, 8, 7]);
  d.questions.forEach((q) => seen.add(Quiz.key(q)));
}
assert.ok(mine.every((q) => seen.has(Quiz.key(q))), "300 lần rút thử phải gặp đủ các câu riêng");
console.log(n, "câu đã tính lại (75 câu của 3 đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + pool.questions.length + " câu.");
console.log("MATH OK");
