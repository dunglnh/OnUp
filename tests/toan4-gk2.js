// Tính lại đáp án hai đề Toán 4 giữa kì II (toan4-gk2-de1, toan4-gk2-de2 trong data/banks/4-toan.js).
// Mỗi câu: kiểm tra đề có đúng số liệu (has) rồi so đáp án đầu tiên với kết quả tính bằng code.
// Chạy: node tests/toan4-gk2.js → in MATH OK.
const assert = require("assert");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);

const fmt = (n) => { assert.ok(Number.isInteger(n), "không phải số nguyên: " + n); return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " "); };
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
// đọc số liệu biểu đồ tả bằng lời: [[nhãn, số], …]
const chart = (q, re) => [...q.matchAll(re)].map((m) => [m[1], +m[2]]);
const argBy = (d, better) => d.reduce((x, y) => (better(y[1], x[1]) ? y : x))[0];

// right(q): đáp án đúng tính bằng code; more(q): kiểm tra thêm (nhiễu, bước giải).
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

let n = 0;
for (const [id, checks] of [["toan4-gk2-de1", de1], ["toan4-gk2-de2", de2]]) {
  const b = bank(id); assert.ok(b, "thiếu " + id); assert.equal(b.questions.length, 25); assert.equal(checks.length, 25);
  b.questions.forEach((q, i) => {
    const c = checks[i], at = id + "#" + (i + 1);
    assert.ok(q.q.includes(c.has), at + ": đề không có “" + c.has + "”");
    const want = c.right(q), got = q.type === "fill" ? q.ans[0] : q.type === "tf" ? q.a : q.o[0];
    assert.strictEqual(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
    if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), at + ": nhiễu trùng đáp án đúng");
    if (q.type === "mc" && /\d\/\d/.test(want) && !/ /.test(want)) q.o.slice(1).forEach((o) => assert.ok(!eqF(o, want) || c.has.includes("Rút gọn"), at + ": nhiễu " + o + " bằng đáp án"));
    if (c.more) c.more(q);
    n++;
  });
}
console.log(n, "câu đã tính lại"); console.log("MATH OK");
