// Tính lại đáp án ngân hàng Toán 4 giữa kì II (data/banks/4-toan.js): hai đề cố định toan4-gk2-de1, toan4-gk2-de2 (Phiên 14)
// và các câu riêng của đề ngẫu nhiên toan4-gk2-ngau-nhien (Phiên N7). Mỗi câu: kiểm tra đề có đúng số liệu (has) rồi so đáp án
// với kết quả tính bằng code: trắc nghiệm o[0], điền khuyết ans[0], đúng/sai a, đúng/sai 4 ý a (4 ý), trả lời bằng số ans, nối cột
// r[i] của từng ô l[i], sắp xếp thứ tự o; tự luận: các số trong thang chấm và đáp án gợi ý. Câu có hình đọc lại hình: biểu đồ cột
// (chiều cao cột theo trục số, số ghi ở đỉnh cột, tên cột), hình chữ nhật chia phần tô màu (số phần, số phần tô màu).
// Cuối cùng kiểm tra mức độ và ma trận: mọi câu có lv; ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó rút và ngoài mỗi
// đề cố định vẫn đủ số câu ô rút; câu tự luận chỉ ở ô Vận dụng rút 1 câu; rút thử nhiều lần ra đúng 10 Biết, 8 Hiểu, 7 Vận dụng,
// đúng ma trận, nhiều nhất 3 câu tự luận; đã làm hết một đề cố định thì không gặp lại câu của đề đó.
// Chạy: node tests/toan4-gk2.js → in MATH OK.
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan4-gk2-ngau-nhien";

const fmt = (n) => { assert.ok(Number.isInteger(n), "không phải số nguyên: " + n); return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " "); };
const val = (s) => +String(s).replace(/\s/g, "");
const div = (a, b) => { assert.equal(a % b, 0, a + " : " + b + " có dư"); return a / b; };
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const fr = (s) => s.split("/").map(Number);
const eqF = (x, y) => { const [a, b] = fr(x), [c, d] = fr(y); return a * d === b * c; };
const cmpF = (x, y) => { const [a, b] = fr(x), [c, d] = fr(y); return Math.sign(a * d - c * b); };
const reduced = (s) => { const [a, b] = fr(s); const g = gcd(a, b); return a / g + "/" + b / g; };
const isMin = (s) => { const [a, b] = fr(s); return gcd(a, b) === 1; };
const sum = (a) => a.reduce((s, v) => s + v, 0);
const roundTo = (n, p) => Math.round(n / p) * p;
// "47 × 20", "47 + 20" → giá trị
const calc = (e) => { const m = /^(\d+) ([×+]) (\d+)$/.exec(e); return m[2] === "×" ? +m[1] * +m[3] : +m[1] + +m[3]; };
// giá trị biểu thức viết như trong đề ("(4 × 9) × 5", "7 × 12 + 7 × 8", "80 000 : 100")
const ev = (e) => {
  const s = String(e).replace(/(\d) (?=\d{3}\b)/g, "$1").replace(/×/g, "*").replace(/:/g, "/").replace(/−/g, "-");
  assert.ok(/^[\d\s+\-*/().]+$/.test(s), "biểu thức lạ: " + e);
  return Function("return " + s)();
};
// đọc số liệu biểu đồ tả bằng lời: [[nhãn, số], …]
const chart = (q, re) => [...q.matchAll(re)].map((m) => [m[1], +m[2]]);
const argBy = (d, better) => d.reduce((x, y) => (better(y[1], x[1]) ? y : x))[0];
const SO = { một: 1, hai: 2, ba: 3, bốn: 4, năm: 5, sáu: 6, bảy: 7, tám: 8, chín: 9, mười: 10 };
const docPS = (s) => { const m = /^(\S+) phần (\S+)$/.exec(s.toLowerCase()); return SO[m[1]] + "/" + SO[m[2]]; };

/* ---------- đọc hình SVG ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp("<" + name + " [^>]*>", "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { x: +a.x, y: +a.y, t: m[2] }; });
// biểu đồ cột: trục dọc là các số ở bên trái, mỗi cột một rect tô acc-soft, số ở đỉnh cột và tên cột ở dưới → [[tên, giá trị], …]
const bieuDo = (svg) => {
  const T = texts(svg), bars = tags(svg, "rect").filter((r) => r.fill === "acc-soft").map((r) => ({ x: +r.x, y: +r.y, w: +r.width, h: +r.height }));
  const truc = T.filter((t) => /^\d+$/.test(t.t) && t.x < 50).map((t) => ({ v: +t.t, y: t.y - 5 })).sort((a, b) => a.v - b.v);
  assert.ok(truc.length >= 3 && truc[0].v === 0, "trục số bắt đầu từ 0, có ít nhất 3 vạch");
  const base = truc[0].y, per = (base - truc[truc.length - 1].y) / truc[truc.length - 1].v;
  truc.forEach((t) => assert.ok(Math.abs(base - t.v * per - t.y) < 0.6, "vạch " + t.v + " không cách đều"));
  assert.ok(bars.length >= 3, "ít nhất 3 cột");
  return bars.sort((a, b) => a.x - b.x).map((r) => {
    assert.ok(Math.abs(r.y + r.h - base) < 0.6, "cột phải đứng trên trục ngang");
    const cx = r.x + r.w / 2, v = r.h / per;
    assert.ok(Math.abs(v - Math.round(v)) < 0.02, "chiều cao cột không đúng vạch: " + v);
    const dinh = T.filter((t) => /^\d+$/.test(t.t) && Math.abs(t.x - cx) < 1 && t.y < r.y);
    assert.equal(dinh.length, 1, "mỗi cột một số ở đỉnh"); assert.equal(+dinh[0].t, Math.round(v), "số ở đỉnh cột khác chiều cao cột");
    const ten = T.filter((t) => Math.abs(t.x - cx) < 1 && t.y > base);
    assert.equal(ten.length, 1, "mỗi cột một tên"); assert.ok(r.w >= 30 && r.h >= 20, "cột quá nhỏ");
    return [ten[0].t, Math.round(v)];
  });
};
// hình chữ nhật chia phần tô màu: mỗi hàng rect là một hình → [{n, k}] (n phần bằng nhau, k phần tô acc-soft), từ trên xuống
const toMau = (svg) => {
  const R = tags(svg, "rect").map((r) => ({ x: +r.x, y: +r.y, w: +r.width, h: +r.height, fill: r.fill }));
  const rows = [...new Set(R.map((r) => r.y))].sort((a, b) => a - b).map((y) => R.filter((r) => r.y === y).sort((a, b) => a.x - b.x));
  const out = rows.map((rs) => {
    assert.ok(rs.length >= 2, "hình cần ít nhất 2 phần");
    rs.forEach((r, i) => { assert.ok(r.w === rs[0].w && r.h === rs[0].h, "các phần phải bằng nhau"); assert.ok(["acc-soft", "none"].includes(r.fill), "phần tô màu dùng acc-soft"); if (i) assert.equal(r.x, rs[i - 1].x + rs[0].w, "các phần phải liền nhau"); });
    return { n: rs.length, k: rs.filter((r) => r.fill === "acc-soft").length, w: rs.length * rs[0].w, x: rs[0].x };
  });
  out.forEach((s) => assert.ok(s.w === out[0].w && s.x === out[0].x, "các hình chữ nhật phải bằng nhau và thẳng hàng"));
  return out;
};
const ss = (k) => (k > 0 ? ">" : k < 0 ? "<" : "=");

// right(q): đáp án đúng tính bằng code; more(q): kiểm tra thêm (nhiễu, bước giải); essay(q): kiểm tra thang chấm.
const de1 = [
  { has: "21 436 × 4", right: () => fmt(21436 * 4) },
  { has: "57 168 : 6", right: () => fmt(div(57168, 6)) },
  { has: "4 975 : 8", right: () => String(4975 % 8), more: (q) => { assert.equal(621 * 8 + 7, 4975); q.o.forEach((o) => assert.ok(+o < 8)); } },
  { has: "25 × 17 × 4", right: () => fmt(25 * 17 * 4), more: () => assert.equal(25 * 4 * 17, 100 * 17) },
  { has: "(a × b) × c = a × (b × c)", right: () => true, more: () => { const [a, b, c] = [3, 7, 11]; assert.equal(a * b * c, a * (b * c)); } },
  { has: "36 × 58 + 36 × 42", right: () => fmt(36 * 58 + 36 * 42), more: () => assert.equal(36 * (58 + 42), 3600) },
  { has: "386 × 100", right: () => fmt(386 * 100) },
  { has: "72 000 : 1 000 = 720", right: () => 72000 / 1000 === 720 },
  { has: "327 × 46", right: () => fmt(327 * 46), more: () => { assert.equal(327 * 6, 1962); assert.equal(327 * 4, 1308); assert.equal(1962 + 13080, 327 * 46); } },
  { has: "8 645 : 35", right: () => fmt(div(8645, 35)), more: () => { assert.equal(86 - 2 * 35, 16); assert.equal(164 - 4 * 35, 24); assert.equal(245, 7 * 35); } },
  { has: "45 thùng hàng", right: () => Math.ceil(1000 / 45) + " chuyến", more: (q) => { assert.ok(q.q.includes("1 000 thùng")); assert.equal(Math.floor(1000 / 45), 22); assert.equal(1000 % 45, 10); } },
  { has: "49 000 đồng", right: () => "Khoảng " + fmt(roundTo(49000, 10000) * 6) + " đồng", more: (q) => { assert.ok(q.q.includes("6 hộp")); assert.equal(49000 * 6, 294000); } },
  { has: "36, 42 và 51", right: () => fmt(div(36 + 42 + 51, 3)) },
  { has: "120 kg, 135 kg và 150 kg", right: () => fmt(div(120 + 135 + 150, 3)) },
  { has: "6 thùng sữa như nhau có tất cả 144 hộp. 9 thùng", right: () => fmt(div(144, 6) * 9) },
  { has: "Mua 4 quyển vở hết 36 000 đồng. Mua 7 quyển", right: () => fmt(div(36000, 4) * 7) + " đồng" },
  { has: "132 cm, 128 cm, 135 cm, 130 cm, 125 cm", right: () => fmt(Math.max(132, 128, 135, 130, 125) - Math.min(132, 128, 135, 130, 125)) },
  { has: "nhiều cây nhất", right: (q) => "Lớp " + argBy(chart(q.q, /lớp (4[A-D]) chỉ (\d+) cây/g), (a, b) => a > b) },
  { has: "Lớp 4B trồng nhiều hơn lớp 4C", right: (q) => { const d = Object.fromEntries(chart(q.q, /lớp (4[A-D]) chỉ (\d+) cây/g)); return fmt(d["4B"] - d["4C"]); } },
  { has: "20 lần. Mặt sấp xuất hiện 11 lần", right: () => fmt(20 - 11) },
  { has: "chia thành 8 phần bằng nhau. Mẹ đã cắt 3 phần", right: () => "3/8", more: (q) => assert.ok(q.o.includes((8 - 3) + "/8")) },
  { has: "phép chia 5 : 9", right: () => "5/9" },
  { has: "Rút gọn phân số 18/24", right: () => reduced("18/24"), more: (q) => q.o.slice(1).forEach((o) => assert.ok(!(eqF(o, "18/24") && isMin(o)))) },
  { has: "2/3 và 5/6 (lấy mẫu số chung là 6)", right: () => (2 * div(6, 3)) + "/6 và 5/6" },
  { has: "3/4 … 5/8", right: () => [">", "=", "<"][1 - cmpF("3/4", "5/8")] }
];
const de2 = [
  { has: "13 708 × 7", right: () => fmt(13708 * 7) },
  { has: "40 236 : 4", right: () => fmt(div(40236, 4)) },
  { has: "2 345 quyển sách xếp đều vào 7 tủ", right: () => fmt(div(2345, 7)) },
  { has: "2 × 89 × 50", right: () => fmt(2 * 89 * 50) },
  { has: "47 × 12 + 47 × 8", right: (q) => { const m = q.o.filter((o) => calc(o) === 47 * 12 + 47 * 8); assert.equal(m.length, 1); return m[0]; } },
  { has: "254 × 1 000", right: () => fmt(254 * 1000) },
  { has: "30 học sinh, trong đó có 17 bạn nữ", right: () => "17/30", more: (q) => assert.ok(q.o.includes((30 - 17) + "/30")) },
  { has: "1 245 × 32", right: () => fmt(1245 * 32), more: () => { assert.equal(1245 * 2, 2490); assert.equal(1245 * 3, 3735); assert.equal(2490 + 37350, 1245 * 32); } },
  { has: "24 cái bánh. 35 hộp", right: () => fmt(24 * 35) + " cái bánh", more: (q) => { assert.ok(q.o.includes(fmt(24 * 5 + 24 * 3) + " cái bánh")); assert.ok(q.o.includes(fmt(24 * 30) + " cái bánh")); } },
  { has: "6 732 : 18", right: () => fmt(div(6732, 18)), more: () => { assert.equal(67 - 3 * 18, 13); assert.equal(133 - 7 * 18, 7); assert.equal(72, 4 * 18); } },
  { has: "2 000 : 64", right: () => "Thương " + Math.floor(2000 / 64) + ", dư " + (2000 % 64), more: () => { assert.equal(31 * 64, 1984); assert.equal(200 - 3 * 64, 8); } },
  { has: "198, 205, 211 và 189", right: () => "Khoảng " + fmt(sum([198, 205, 211, 189].map((n) => roundTo(n, 100)))) + " học sinh", more: () => assert.equal(sum([198, 205, 211, 189]), 803) },
  { has: "25, 40, 33 và 50", right: () => fmt(div(25 + 40 + 33 + 50, 4)) },
  { has: "Trung bình cộng của hai số là 45. Một trong hai số là 38", right: () => fmt(45 * 2 - 38) },
  { has: "5 bao gạo như nhau cân nặng 250 kg. 8 bao", right: () => fmt(div(250, 5) * 8) },
  { has: "3 giờ được 132 km", right: () => fmt(div(132, 3) * 5) + " km", more: (q) => assert.ok(q.q.includes("trong 5 giờ")) },
  { has: "4, 7, 5, 9, 5", right: () => fmt(sum([4, 7, 5, 9, 5])) },
  { has: "ít sữa nhất", right: (q) => "Thứ " + argBy(chart(q.q, /Thứ (\S+) (\d+) lít/g), (a, b) => a < b) },
  { has: "Cả bốn ngày cửa hàng bán được", right: (q) => fmt(sum(chart(q.q, /Thứ (\S+) (\d+) lít/g).map((d) => d[1]))) },
  { has: "làm như vậy 15 lần, có 9 lần lấy được bi đỏ", right: () => fmt(15 - 9) + " lần" },
  { has: "Phân số 9/7 bé hơn 1", right: () => cmpF("9/7", "1/1") < 0 },
  { has: "3/5 = ___/20", right: () => fmt(3 * div(20, 5)) },
  { has: "phân số tối giản", right: (q) => { const m = q.o.filter(isMin); assert.equal(m.length, 1); return m[0]; } },
  { has: "3/4 và 7/12, lấy mẫu số chung là 12", right: () => fmt(3 * div(12, 4)) },
  { has: "1/2; 3/4; 5/8", right: () => ["1/2", "3/4", "5/8"].reduce((x, y) => (cmpF(y, x) > 0 ? y : x)), more: () => { assert.equal(div(8, 2) * 1, 4); assert.equal(div(8, 4) * 3, 6); } }
];
// Phiên N7: câu riêng của đề ngẫu nhiên, theo thứ tự trong file
const rubricNums = (q) => q.rubric.map((r) => [...r.c.matchAll(/\d[\d ]*\d|\d/g)].map((m) => val(m[0])));
const essayOK = (q, lines, total) => { assert.equal(sum(q.rubric.map((r) => r.p)), total, "thang chấm phải đủ " + total + " điểm"); q.rubric.forEach((r) => assert.equal((r.p * 100) % 25, 0, "điểm mỗi ý chia hết cho 0,25")); assert.ok(q.x.split("\n").length >= lines, "đáp án gợi ý đủ các bước"); };
const chartOf = (q, want) => { const d = bieuDo(q.svg); assert.deepEqual(d.map((c) => c[0]), want, "tên cột"); return d; };
const own = [
  { has: "32 015 × 3", right: () => fmt(32015 * 3) },
  { has: "2 406 × 5", right: () => fmt(2406 * 5), more: (q) => assert.equal(new Set(q.o).size, 4) },
  { has: "1 423 × 24", right: () => [1423 * 4 === 5692, false, 1423 * 24 === 1423 * 20 + 1423 * 4, 1423 * 24 === val("34 152")], more: (q) => { assert.ok(q.o[1].includes("viết thẳng cột")); assert.equal(1423 * 2, 2846); assert.equal(5692 + 28460, 1423 * 24); } },
  { has: "25 thùng bút, mỗi thùng có 136 chiếc", right: () => 136 * 25 - 1850, more: (q) => assert.ok(q.q.includes("1 850 chiếc")) },
  { has: "850 000 đồng. Trường mua 24 bộ", right: () => 850000 * 24 - 15000000, more: (q) => assert.ok(q.q.includes("15 000 000 đồng")) },
  { has: "chiều rộng 36 m, chiều dài gấp 3 lần chiều rộng", right: () => fmt(36 * 3 * 36) + " m²", more: (q) => { assert.ok(q.o.includes(fmt((36 * 3 + 36) * 2) + " m²")); assert.ok(q.o.includes(fmt(36 * 36) + " m²")); } },
  { has: "7 236 : 9", right: () => String(div(7236, 9)) },
  { has: "3 876 : 51", right: () => String(div(3876, 51)), more: () => { assert.equal(387 - 7 * 51, 30); assert.equal(306, 6 * 51); } },
  { has: "9 450 : 25", right: () => [9450 % 25 === 0 && 9450 / 25 === 378, 9450 % 25 !== 0, 378 * 25 === 9450, 9450 / 25 < 9450 / 50], more: () => { assert.equal(94 - 3 * 25, 19); assert.equal(195 - 7 * 25, 20); assert.equal(200, 8 * 25); assert.equal(9450 / 50, 189); } },
  { has: "1 000 : 32", right: () => String(1000 % 32), more: (q) => { q.o.forEach((o) => assert.ok(+o < 32)); assert.equal(Math.floor(1000 / 32), 31); assert.equal(31 * 32, 992); } },
  { has: "2 450 bao xi măng", right: () => Math.ceil(2450 / 36), more: () => { assert.equal(Math.floor(2450 / 36), 68); assert.equal(2450 % 36, 2); assert.equal(36 * 68, 2448); } },
  { has: "1 728 quả trứng xếp đều vào 48 khay", essay: (q) => { const [a, b] = rubricNums(q); assert.deepEqual(a, [1728, 48, 36]); assert.equal(div(1728, 48), 36); assert.deepEqual(b, [36, 15, 540]); assert.equal(36 * 15, 540); assert.ok(q.q.includes("15 khay")); essayOK(q, 3, 2); assert.ok(q.x.includes("Đáp số: 540 quả trứng")); } },
  { has: "Nối mỗi biểu thức ở cột trái với biểu thức có giá trị bằng nó", right: (q) => q.l.map((l) => { const m = q.r.filter((r) => ev(r) === ev(l)); assert.equal(m.length, 1, "mỗi biểu thức trái bằng đúng một biểu thức phải: " + l); return m[0]; }), more: (q) => assert.ok(!q.l.some((l) => ev(l) === ev("7 × 12 × 8"))) },
  { has: "giá trị bằng 45 × 6", right: (q) => { const m = q.o.filter((o) => ev(o) === 45 * 6); assert.equal(m.length, 1); return m[0]; } },
  { has: "(3 × 5) × 20 và 3 × (5 × 20)", right: () => ev("(3 × 5) × 20") === ev("3 × (5 × 20)"), more: () => assert.equal(ev("(3 × 5) × 20"), 300) },
  { has: "125 × 9 × 8", right: () => 125 * 9 * 8, more: () => assert.equal(125 * 8, 1000) },
  { has: "36 thùng nước ngọt, buổi chiều bán được 64 thùng", right: () => (36 + 64) * 12, more: () => assert.equal(12 * 36 + 12 * 64, 12 * (36 + 64)) },
  { has: "Biết 125 × 12 = 1 500", right: () => [12 * 125 === 1500, 125 * 24 === 3000, 125 * 13 === 1500 + 13, 125 * 12 * 8 === 12000], more: () => assert.equal(125 * 13, 1625) },
  { has: "Nối mỗi phép tính ở cột trái với kết quả", right: (q) => q.l.map((l) => fmt(ev(l))), more: (q) => q.r.slice(q.l.length).forEach((x) => assert.ok(!q.l.some((l) => ev(l) === val(x)), "ô thừa " + x + " trùng kết quả")) },
  { has: "50 400 : 100", right: () => fmt(div(50400, 100)) },
  { has: "Số 12 nhân với số nào thì được 12 000", right: () => fmt(div(12000, 12)) },
  { has: "3 980 kg gạo tẻ và 2 015 kg gạo nếp", right: () => "Khoảng " + fmt(roundTo(3980, 1000) + roundTo(2015, 1000)) + " kg", more: () => assert.equal(3980 + 2015, 5995) },
  { has: "Dùng cách làm tròn số rồi tính", right: () => [41 * 19 < 1000, 8120 / 40 > 200, 298 + 503 > 900, 5020 - 1980 < 3000], more: () => { assert.equal(41 * 19, 779); assert.equal(8120 / 40, 203); assert.equal(298 + 503, 801); assert.equal(5020 - 1980, 3040); } },
  { has: "48 và 64", right: () => div(48 + 64, 2) },
  { has: "12, 15, 9 và 20", right: () => div(12 + 15 + 9 + 20, 4) + " nhãn vở", more: (q) => assert.ok(q.o.includes(sum([12, 15, 9, 20]) + " nhãn vở")) },
  { has: "Trung bình cộng của ba số là 150. Hai số đầu là 120 và 135", right: () => 150 * 3 - 120 - 135, more: () => assert.equal((120 + 135 + 195) / 3, 150) },
  { has: "3 ngày đầu mỗi ngày sửa được 45 m đường, 2 ngày sau mỗi ngày sửa được 50 m", essay: (q) => { const r = rubricNums(q); assert.deepEqual(r.slice(0, 3), [[3, 45, 3, 135], [2, 50, 2, 100], [135, 100, 5, 47]]); assert.equal(div(45 * 3 + 50 * 2, 3 + 2), 47); essayOK(q, 4, 2); assert.ok(q.x.includes("Đáp số: 47 m")); } },
  { has: "Mua 3 kg cam hết 75 000 đồng. Hỏi mua 5 kg", right: () => div(75000, 3) * 5 },
  { has: "20 l dầu đựng đều trong 4 can. Hỏi 35 l", right: () => div(35, div(20, 4)) },
  { has: "5 ngày làm được 325 sản phẩm. Hỏi trong 8 ngày", essay: (q) => { const r = rubricNums(q); assert.deepEqual(r.slice(0, 2), [[1, 325, 5, 65], [8, 65, 8, 520]]); assert.equal(div(325, 5) * 8, 520); essayOK(q, 3, 2); assert.ok(q.x.includes("Đáp số: 520 sản phẩm")); } },
  { has: "câu lạc bộ cờ vua. Khối nào có nhiều học sinh tham gia nhất", right: (q) => argBy(chartOf(q, ["Khối 1", "Khối 2", "Khối 3", "Khối 4"]), (a, b) => a > b), more: (q) => assert.deepEqual(bieuDo(q.svg).map((c) => c[1]), [12, 18, 15, 21]) },
  { has: "câu lạc bộ cờ vua. Cả bốn khối có tất cả", right: (q) => sum(chartOf(q, ["Khối 1", "Khối 2", "Khối 3", "Khối 4"]).map((c) => c[1])), more: (q) => assert.equal(q.svg, mine[30].svg, "cùng hình với câu trước") },
  { has: "số ngày mưa của bốn tháng. Tháng có ít ngày mưa nhất", right: (q) => argBy(chartOf(q, ["Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9"]), (a, b) => a < b).replace("Tháng ", ""), more: (q) => assert.deepEqual(bieuDo(q.svg).map((c) => c[1]), [14, 18, 20, 12]) },
  { has: "số ngày mưa của bốn tháng. Trung bình mỗi tháng", right: (q) => div(sum(chartOf(q, ["Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9"]).map((c) => c[1])), 4), more: (q) => assert.equal(q.svg, mine[32].svg, "cùng hình với câu trước") },
  { has: "số quyển sách bốn tổ quyên góp", right: (q) => { const d = Object.fromEntries(chartOf(q, ["Tổ 1", "Tổ 2", "Tổ 3", "Tổ 4"])), v = Object.values(d); return [d["Tổ 2"] === Math.max(...v), d["Tổ 4"] === 25, d["Tổ 1"] > d["Tổ 3"], sum(v) === 150]; }, more: (q) => assert.deepEqual(bieuDo(q.svg).map((c) => c[1]), [35, 50, 40, 25]) },
  { has: "số bạn chọn mỗi loại quả yêu thích", right: (q) => chartOf(q, ["Xoài", "Cam", "Chuối", "Nho"]).sort((a, b) => a[1] - b[1]).map((c) => c[0]), more: (q) => assert.equal(new Set(bieuDo(q.svg).map((c) => c[1])).size, 4, "số bạn chọn phải khác nhau để sắp xếp được") },
  { has: "giấy vụn bốn lớp thu được. Mỗi ki-lô-gam giấy vụn bán được 3 000 đồng", right: (q) => { const d = Object.fromEntries(chartOf(q, ["4A", "4B", "4C", "4D"])); return fmt(d["4B"] * 3000) + " đồng"; }, more: (q) => { const d = bieuDo(q.svg); assert.ok(q.o.includes(fmt(sum(d.map((c) => c[1])) * 3000) + " đồng")); assert.deepEqual(d.map((c) => c[1]), [45, 60, 35, 40]); } },
  { has: "xúc xắc 25 lần", right: () => (25 - 4) + " lần", more: (q) => assert.ok(q.q.includes("xuất hiện 4 lần")) },
  { has: "12 lần, bảng kiểm đếm cho biết bóng xanh xuất hiện 7 lần", right: () => [true, 12 - 7 === 5, 7 > 12 - 7, false], more: (q) => { assert.ok(q.o[1].includes("5 lần")); assert.ok(q.o[3].includes("bóng vàng") && !q.q.includes("bóng vàng")); } },
  { has: "quay vòng quay 30 lần", right: () => String(30 - 13), more: (q) => assert.ok(q.q.includes("màu vàng 13 lần")) },
  { has: "Phân số chỉ phần đã tô màu của hình chữ nhật", right: (q) => { const t = toMau(q.svg); assert.equal(t.length, 1); return t[0].k + "/" + t[0].n; }, more: (q) => { const [t] = toMau(q.svg); assert.deepEqual([t.n, t.k], [6, 5]); assert.ok(q.o.includes((t.n - t.k) + "/" + t.n)); } },
  { has: "Nối mỗi cách đọc ở cột trái với phân số", right: (q) => q.l.map(docPS), more: (q) => assert.ok(!q.l.map(docPS).includes(q.r[4])) },
  { has: "Cho phân số 7/10", right: (q) => { const m = /phép chia (\d+) : (\d+)/.exec(q.o[2]); return [true, q.o[1].includes("bảy phần mười"), m[1] + "/" + m[2] === "7/10", true]; }, more: (q) => { assert.ok(/10 : 7/.test(q.o[2])); assert.ok(q.o[0].includes("Tử số là 7, mẫu số là 10")); assert.ok(q.o[3].includes("10 phần") && q.o[3].includes("7 phần")); } },
  { has: "Nhìn vào phần tô màu của hai hình", right: (q) => { const [a, b] = toMau(q.svg), A = a.k + "/" + a.n, B = b.k + "/" + b.n; return A + " " + ss(cmpF(A, B)) + " " + B; }, more: (q) => { const [a, b] = toMau(q.svg); assert.deepEqual([a.n, a.k, b.n, b.k], [3, 2, 6, 4]); } },
  { has: "24/32 = 3/___", right: () => String(div(32, div(24, 3))), more: () => assert.ok(eqF("24/32", "3/4")) },
  { has: "Cho phân số 4/9", right: (q) => [eqF("4/9", "8/18"), eqF("4/9", "12/27"), eqF("4/9", "4/18"), eqF("4/9", "20/45") && 4 * 5 === 20 && 9 * 5 === 45], more: (q) => { assert.ok(q.o[3].includes("20/45")); assert.ok(q.o[0].includes("8/18") && q.o[1].includes("12/27") && q.o[2].includes("4/18")); } },
  { has: "Rút gọn phân số 40/64", right: () => reduced("40/64"), more: () => assert.equal(gcd(40, 64), 8) },
  { has: "Rút gọn phân số 36/54", right: () => reduced("36/54"), more: (q) => { assert.equal(gcd(36, 54), 18); q.o.slice(1).forEach((o) => assert.ok(!(eqF(o, "36/54") && isMin(o)))); } },
  { has: "Nối mỗi phân số ở cột trái với phân số tối giản", right: (q) => q.l.map(reduced), more: (q) => { assert.ok(!q.l.some((l) => eqF(l, q.r[4]))); q.r.forEach((r) => assert.ok(isMin(r))); } },
  { has: "5/6 và 7/18, lấy mẫu số chung là 18", right: () => fmt(5 * div(18, 6)) },
  { has: "2/5 và 3/10 (lấy mẫu số chung là 10)", right: () => (2 * div(10, 5)) + "/10 và 3/10" },
  { has: "quy đồng mẫu số hai phân số 2/3 và 7/9", right: () => [9 % 3 === 0, eqF("2/3", "6/9") && 2 * 3 === 6 && 3 * 3 === 9, true, false], more: (q) => { assert.ok(q.o[2].includes("6/9 và 7/9")); assert.ok(q.o[3].includes("7/9 với 3")); } },
  { has: "chia thành 10 phần bằng nhau và tô màu như hình vẽ. So sánh", right: (q) => { const [a, b] = toMau(q.svg), A = a.k + "/" + a.n, B = b.k + "/" + b.n; return A + " " + ss(cmpF(A, B)) + " " + B; }, more: (q) => { const [a, b] = toMau(q.svg); assert.deepEqual([a.n, a.k, b.n, b.k], [10, 7, 10, 4]); } },
  { has: "Sắp xếp các phân số sau theo thứ tự từ bé đến lớn", right: (q) => q.o.slice().sort(cmpF), more: (q) => assert.ok(q.o.every((o) => fr(o)[1] === 9)) },
  { has: "cho Lan 3/5 cái bánh thứ nhất và cho Huy 7/10 cái bánh thứ hai", right: () => (cmpF("3/5", "7/10") < 0 ? "Huy" : "Lan"), more: () => assert.equal(3 * div(10, 5), 6) },
  { has: "5/6, 11/12 và 2/3", right: () => [cmpF("5/6", "2/3") > 0, ["5/6", "2/3"].every((f) => cmpF("11/12", f) > 0), cmpF("2/3", "5/6") < 0, cmpF("11/12", "5/6") < 0], more: () => { assert.equal(5 * div(12, 6), 10); assert.equal(2 * div(12, 3), 8); } }
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
    if (q.type === "mc" && /^\d+\/\d+$/.test(want)) q.o.slice(1).forEach((o) => assert.ok(!eqF(o, want) || c.has.includes("Rút gọn"), at + ": nhiễu " + o + " bằng đáp án"));
    if (q.type === "tf4") assert.ok(q.a.includes(true) && q.a.includes(false), at + ": đúng/sai 4 ý cần có cả ý đúng và ý sai");
    if (c.more) c.more(q);
    n++;
  });
};
for (const [id, checks] of [["toan4-gk2-de1", de1], ["toan4-gk2-de2", de2]]) {
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
assert.equal(Object.keys(M).length, 14, "14 chủ đề như hai đề cố định");
assert.deepEqual([...new Set(pool.questions.map((q) => q.topic))].sort(), Object.keys(M).sort(), "chủ đề của kho đúng chữ của ma trận");
// mỗi ô có ít nhất gấp đôi số câu ô đó rút; ngoài mỗi đề cố định vẫn đủ số câu ô rút; câu riêng nào cũng nằm trong một ô có số câu của ma trận
Object.entries(M).forEach(([t, v]) => v.forEach((k, i) => {
  const have = pool.questions.filter((q) => q.topic === t && q.lv === i + 1);
  assert.ok(have.length >= 2 * k, `ô (${t}, mức ${i + 1}) rút ${k} câu mà kho chỉ có ${have.length}`);
  pool.pool.from.forEach((id) => assert.ok(have.filter((q) => q.src !== id).length >= k, `ô (${t}, mức ${i + 1}) ngoài ${id} chỉ còn ${have.filter((q) => q.src !== id).length} câu`));
}));
mine.forEach((q, i) => assert.ok(M[q.topic] && M[q.topic][q.lv - 1] > 0, `${POOL}#${i + 1}: ô (${q.topic}, mức ${q.lv}) không có trong ma trận`));
// câu tự luận chỉ ở các ô Vận dụng rút 1 câu có cả câu chấm tự động, nhiều nhất ba ô: mỗi lần rút nhiều nhất 3 câu tự luận
const oTuLuan = [...new Set(pool.questions.filter((q) => q.type === "essay").map((q) => q.topic + "|" + q.lv))];
assert.ok(oTuLuan.length === 3 && oTuLuan.every((k) => { const [t, lv] = k.split("|"); return +lv === 3 && M[t][2] === 1 && pool.questions.some((q) => q.topic === t && q.lv === 3 && q.type !== "essay"); }), "câu tự luận: " + oTuLuan);
assert.equal(pool.questions.filter((q) => q.svg).length, 10, "kho có 10 câu có hình");
const seen = new Set();
let essays = 0;
const thu = (hist) => {
  const d = Quiz.draw(pool, hist);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, 25);
  assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.lv === l).length), [10, 8, 7]);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.topic === t && q.lv === l).length), v, "rút đúng ma trận ở chủ đề " + t));
  const e = d.questions.filter((q) => q.type === "essay").length; assert.ok(e <= 3, "một lần rút có " + e + " câu tự luận");
  return d;
};
for (let k = 0; k < 400; k++) { const d = thu(); essays += d.questions.filter((q) => q.type === "essay").length; d.questions.forEach((q) => seen.add(Quiz.key(q))); }
assert.ok(mine.every((q) => seen.has(Quiz.key(q))), "400 lần rút thử phải gặp đủ các câu riêng");
// học sinh đã làm hết một đề cố định: lần rút sau không lấy lại câu của đề đó
pool.pool.from.forEach((id) => { const done = new Set(bank(id).questions.map(Quiz.key)); for (let k = 0; k < 20; k++) thu((q) => ({ done: done.has(Quiz.key(q)) ? 1 : 0, wrong: 0 })).questions.forEach((q) => assert.ok(!done.has(Quiz.key(q)), "đã làm hết " + id + " mà vẫn gặp lại câu của đề đó")); });
console.log(n, "câu đã tính lại (50 câu của 2 đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + pool.questions.length + " câu; trung bình " + (essays / 400).toFixed(2) + " câu tự luận mỗi lần rút.");
console.log("MATH OK");
