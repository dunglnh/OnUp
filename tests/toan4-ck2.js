// Tính lại đáp án ngân hàng Toán 4 cuối năm (data/banks/4-toan.js): hai đề cố định toan4-ck2-de1, toan4-ck2-de2 và các câu riêng
// của đề ngẫu nhiên toan4-ck2-ngau-nhien (Phiên N13; cả năm, trọng tâm học kì II, Bài 38–73). Mỗi câu: kiểm tra đề có đúng số liệu
// (has) rồi so đáp án với kết quả tính bằng code: trắc nghiệm o[0], điền khuyết ans[0], đúng/sai a, đúng/sai 4 ý a (4 ý), trả lời
// bằng số ans, nối cột r[i] của từng ô l[i], sắp xếp thứ tự o; tự luận: các số trong thang chấm và đáp án gợi ý. Phân số tính bằng
// số hữu tỉ chính xác; cộng, trừ hai phân số khác mẫu số chỉ khi một mẫu số chia hết cho mẫu số kia (như sách lớp 4); đáp án phân
// số ở dạng tối giản; các lựa chọn phân số của một câu trắc nghiệm không bằng nhau (trừ câu rút gọn: phân số bằng mà chưa tối giản
// là lựa chọn sai). Câu có hình: đọc biểu đồ cột (trục số, số ở đỉnh cột, tên cột), băng chia phần tô màu (số phần, số phần tô màu),
// toạ độ trên lưới ô vuông (cạnh song song, vuông góc, bằng nhau của tứ giác, hình thoi; đường thẳng qua hai điểm của lưới) rồi mới
// tính. Cuối cùng kiểm tra mức độ và ma trận (mỗi ô có 4 câu: một câu ở mỗi đề cố định, hai câu riêng; rút thử nhiều lần ra đúng
// 10 Biết, 8 Hiểu, 7 Vận dụng, nhiều nhất 3 câu tự luận; đã làm hết một đề cố định thì không gặp lại câu của đề đó), đáp án đúng của
// câu trắc nghiệm không dài hơn hẳn lựa chọn sai, đề bài không trùng câu nào khác trong data/banks/4-toan.js và dò lộ đáp án giữa các
// câu rút được cùng lúc (Rút ra N5, N24, N8, N18).
// Chạy: node tests/toan4-ck2.js → in MATH OK. DO_LO=1 in thêm đáp án bằng chữ có ở câu rút được cùng lúc (để người làm xem).
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan4-ck2-ngau-nhien";

const fmt = (n) => { assert.ok(Number.isInteger(n), "không phải số nguyên: " + n); return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " "); };
const val = (s) => +String(s).replace(/\s/g, "");
const div = (a, b) => { assert.equal(a % b, 0, a + " : " + b + " có dư"); return a / b; };
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- số hữu tỉ chính xác: { n, d } với d > 0, tối giản ---------- */
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const F = (n, d) => { d = d === undefined ? 1 : d; assert.ok(Number.isInteger(n) && Number.isInteger(d) && d !== 0, `phân số lạ ${n}/${d}`); if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return { n: n / g, d: d / g }; };
const P = (s) => { const m = /^(\d[\d ]*?)(?:\/(\d+))?$/.exec(String(s).trim()); assert.ok(m, "phân số lạ: " + s); return F(val(m[1]), m[2] ? +m[2] : 1); };
const add = (a, b) => F(a.n * b.d + b.n * a.d, a.d * b.d);
const sub = (a, b) => F(a.n * b.d - b.n * a.d, a.d * b.d);
const mul = (a, b) => F(a.n * b.n, a.d * b.d);
const dv = (a, b) => F(a.n * b.d, a.d * b.n);
const cmp = (a, b) => Math.sign(a.n * b.d - b.n * a.d);
const str = (a) => (a.d === 1 ? String(a.n) : a.n + "/" + a.d);
const toi = (s) => str(P(s)); // dạng tối giản
const isMin = (s) => { const [a, b] = s.split("/").map(Number); return gcd(a, b) === 1; };
const mau = (s) => +String(s).split("/")[1] || 1;
// phép cộng, trừ phân số của lớp 4: cùng mẫu số, hoặc một mẫu số chia hết cho mẫu số kia (số tự nhiên coi như mẫu số 1)
const lop4 = (x, y) => { const a = mau(x), b = mau(y); assert.ok(a % b === 0 || b % a === 0, `${x} và ${y}: hai mẫu số không có mẫu số nào chia hết cho mẫu số kia`); };
// "a/b + c/d", "a/b × n", "n − a/b"… (một phép tính) → giá trị
const ev2 = (e) => {
  const m = /^(\d+(?:\/\d+)?) ([+−×:]) (\d+(?:\/\d+)?)$/.exec(e.trim()); assert.ok(m, "phép tính lạ: " + e);
  if ("+−".includes(m[2])) lop4(m[1], m[3]);
  return { "+": add, "−": sub, "×": mul, ":": dv }[m[2]](P(m[1]), P(m[3]));
};
// mệnh đề "… = …" của câu đúng/sai 4 ý
const dung = (s) => { const [l, r] = s.split(" = "); return cmp(ev2(l), P(r)) === 0; };

/* ---------- đọc số kiểu sách Việt Nam (như tests/toan4-ck1.js) ---------- */
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
// "6 triệu, 3 chục nghìn, 4 trăm và 5 đơn vị"
const gom = (n) => { const s = String(n), w = [...s].map((c, i) => [+c, s.length - 1 - i]).filter(([c]) => c).map(([c, h]) => c + " " + HANG[h]); return w.slice(0, -1).join(", ") + " và " + w[w.length - 1]; };
const giaTri = (n, d) => { const s = String(n), i = s.indexOf(String(d)); assert.ok(i >= 0 && s.lastIndexOf(String(d)) === i, `chữ số ${d} phải có đúng một lần trong ${n}`); return d * 10 ** (s.length - 1 - i); };

/* ---------- đọc hình SVG ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp("<" + name + " [^>]*>", "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { x: +a.x, y: +a.y, t: m[2] }; });
// biểu đồ cột (như tests/toan4-gk2.js): trục số bên trái, mỗi cột một rect tô acc-soft, số ở đỉnh cột, tên cột ở dưới → [[tên, giá trị], …]
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
    assert.ok(Math.abs(v - Math.round(v)) < 0.02, "chiều cao cột không đúng số: " + v);
    const dinh = T.filter((t) => /^\d+$/.test(t.t) && Math.abs(t.x - cx) < 1 && t.y < r.y);
    assert.equal(dinh.length, 1, "mỗi cột một số ở đỉnh"); assert.equal(+dinh[0].t, Math.round(v), "số ở đỉnh cột khác chiều cao cột");
    const ten = T.filter((t) => Math.abs(t.x - cx) < 1 && t.y > base);
    assert.equal(ten.length, 1, "mỗi cột một tên"); assert.ok(r.w >= 30 && r.h >= 20, "cột quá nhỏ");
    return [ten[0].t, Math.round(v)];
  });
};
const chartOf = (q, want) => { const d = bieuDo(q.svg); assert.deepEqual(d.map((c) => c[0]), want, "tên cột"); return d; };
const argBy = (d, better) => d.reduce((x, y) => (better(y[1], x[1]) ? y : x))[0];
// băng chia phần tô màu: các rect liền nhau, bằng nhau, tô acc-soft hoặc không tô → { n, k }
const bang = (svg) => {
  const R = tags(svg, "rect").map((r) => ({ x: +r.x, y: +r.y, w: +r.width, h: +r.height, fill: r.fill })).sort((a, b) => a.x - b.x);
  assert.ok(R.length >= 2 && R.every((r) => r.y === R[0].y && r.w === R[0].w && r.h === R[0].h), "các phần phải bằng nhau, cùng một hàng");
  R.forEach((r, i) => { assert.ok(["acc-soft", "none"].includes(r.fill), "phần tô màu dùng acc-soft"); if (i) assert.equal(r.x, R[i - 1].x + R[0].w, "các phần phải liền nhau"); });
  return { n: R.length, k: R.filter((r) => r.fill === "acc-soft").length };
};
// lưới ô vuông: các đường kẻ stroke="line" dọc và ngang cách đều nhau, cùng cạnh ô → đổi toạ độ điểm ra số ô (số nguyên)
const luoi = (svg) => {
  const L = tags(svg, "line").filter((l) => l.stroke === "line");
  const xs = [...new Set(L.filter((l) => l.x1 === l.x2).map((l) => +l.x1))].sort((a, b) => a - b);
  const ys = [...new Set(L.filter((l) => l.y1 === l.y2).map((l) => +l.y1))].sort((a, b) => a - b);
  const c = xs[1] - xs[0];
  xs.forEach((x, i) => assert.equal(x, xs[0] + i * c, "đường kẻ dọc không cách đều")); ys.forEach((y, i) => assert.equal(y, ys[0] + i * c, "đường kẻ ngang không cách đều"));
  return ([x, y]) => { const p = [(x - xs[0]) / c, (y - ys[0]) / c]; assert.ok(p.every(Number.isInteger), "điểm không nằm ở nút lưới: " + [x, y]); return p; };
};
const nums = (s) => s.trim().split(/[\s,]+/).map(Number);
const vsub = (p, q) => [p[0] - q[0], p[1] - q[1]];
const cross = (u, v) => u[0] * v[1] - u[1] * v[0];
const dot = (u, v) => u[0] * v[0] + u[1] * v[1];
const len2 = (u) => dot(u, u);
const songSong = (u, v) => cross(u, v) === 0;
const vuongGoc = (u, v) => dot(u, v) === 0;
const nhan = (svg, name) => { const t = texts(svg).filter((x) => x.t === name); assert.equal(t.length, 1, "hình cần đúng một nhãn " + name); return [t[0].x, t[0].y]; };
const gan = (pts, at) => pts.slice().sort((p, q) => Math.hypot(p[0] - at[0], p[1] - at[1]) - Math.hypot(q[0] - at[0], q[1] - at[1]))[0];
// tứ giác trên lưới có nhãn → { A: [số ô ngang, số ô dọc], … }
const tuGiac = (svg, names) => {
  const ps = tags(svg, "polygon"); assert.equal(ps.length, 1, "hình cần đúng một tứ giác");
  const p = nums(ps[0].points).reduce((o, v, i) => (i % 2 ? o[o.length - 1].push(v) : o.push([v]), o), []); assert.equal(p.length, 4);
  const o = {}, at = luoi(svg); names.forEach((n) => (o[n] = at(gan(p, nhan(svg, n)))));
  assert.equal(new Set(Object.values(o).map(String)).size, 4, "mỗi nhãn một đỉnh");
  return o;
};
// các điểm (chấm tròn) có nhãn trên lưới → { A: [x, y], … } theo số ô
const diem = (svg, names) => {
  const c = tags(svg, "circle").map((a) => [+a.cx, +a.cy]), at = luoi(svg), o = {};
  names.forEach((n) => (o[n] = at(gan(c, nhan(svg, n)))));
  assert.equal(new Set(Object.values(o).map(String)).size, names.length, "mỗi nhãn một điểm");
  return o;
};

/* ---------- kiểm tra từng câu ----------
   right(q): đáp án tính bằng code (so với o[0], ans[0], a, ans, r của từng ô trái, o); more(q): kiểm tra thêm (nhiễu, bước giải);
   essay(q): kiểm tra thang chấm. */
const rubricNums = (q) => q.rubric.map((r) => [...r.c.matchAll(/\d[\d ]*\d|\d/g)].map((m) => val(m[0])));
const essayOK = (q, lines, total) => { assert.equal(sum(q.rubric.map((r) => r.p)), total, "thang chấm phải đủ " + total + " điểm"); q.rubric.forEach((r) => assert.equal((r.p * 100) % 25, 0, "điểm mỗi ý chia hết cho 0,25")); assert.ok(q.x.split("\n").length >= lines, "đáp án gợi ý đủ các bước"); };
const soTrongDe = (q) => /:\s*(.+?)\.\s*S/.exec(q.q)[1].split(/;\s*/).map(val);
// lá thăm rút được, ghi lại theo thứ tự: trả về [số lần A (chữ), số lần B, số lần C]
const thamA = (q) => { const k = /ghi được: ([ABC](?:, [ABC])*)\./.exec(q.q)[1].split(", "); const d = (c) => k.filter((x) => x === c).length; return [String(d("A")), d("B"), d("C")]; };
const day = (q) => /dãy số liệu: ([\d, kg]+?)\.(?:\s|$)/.exec(q.q)[1].split(/,\s*/).map((s) => val(s.replace(" kg", "")));
const quyDong = (fs, m) => fs.map((f) => { const p = P(f); return p.n * div(m, p.d) + "/" + m; });
const MOT = (s) => { const t = s.split(" và "); return t.slice(0, -1).join(", ") + (t.length > 1 ? " và " : "") + t[t.length - 1]; };

const de1 = [
  { has: "Số 6 030 405 gồm", right: () => gom(6030405) },
  { has: "bốn khu vui chơi", right: (q) => soTrongDe(q).sort((a, b) => a - b).map(fmt) },
  { has: "2 708 × 34", right: () => fmt(2708 * 34), more: (q) => { assert.ok(q.x.includes(fmt(2708 * 4)) && q.x.includes(fmt(2708 * 3)) && q.x.includes(fmt(2708 * 30))); } },
  { has: "9 516 : 26", right: () => fmt(div(9516, 26)), more: () => { assert.equal(95 - 3 * 26, 17); assert.equal(171 - 6 * 26, 15); assert.equal(156, 6 * 26); } },
  { has: "4 × 39 × 25 + 61 × 100", right: () => 4 * 39 * 25 + 61 * 100, more: () => assert.equal((39 + 61) * 100, 10000) },
  { has: "Trung bình cộng của hai số là 75. Số lớn hơn số bé 16", right: () => div(75 * 2 + 16, 2), more: (q) => { assert.equal((83 + 67) / 2, 75); assert.equal(83 - 67, 16); assert.ok(q.x.includes("số bé là 150 − 83 = 67")); } },
  { has: "6 phút in được 270 trang", right: () => div(630, div(270, 6)) },
  { has: "thanh sô-cô-la", right: (q) => { const b = bang(q.svg); assert.deepEqual([b.n, b.k], [9, 4]); return (b.n - b.k) + "/" + b.n; }, more: (q) => assert.ok(q.o.includes("4/9"), "lựa chọn phần đã ăn") },
  { has: "Rút gọn phân số 30/42", right: () => toi("30/42") },
  { has: "ba phân số 2/3, 5/6 và 7/12", right: () => MOT(quyDong(["2/3", "5/6", "7/12"], 12).join(" và ")) },
  { has: "7/12 … 5/12", right: () => [">", "=", "<"][1 - cmp(P("7/12"), P("5/12"))] },
  { has: "5/14 + 2/7", right: () => str(ev2("5/14 + 2/7")) },
  { has: "1/3 giờ để làm bài tập và 1/12 giờ", right: () => { const t = ev2("1/3 + 1/12"); return str(mul(t, F(60))) | 0; } },
  { has: "3/8 × 5/7", right: () => str(ev2("3/8 × 5/7")) },
  { has: "chiều dài 3/4 m, chiều rộng 2/5 m", right: () => str(ev2("3/4 × 2/5")) + " m²", more: (q) => { assert.ok(q.o.includes((3 + 2) + "/" + (4 + 5) + " m²") && q.o.includes(str(ev2("3/4 : 2/5")) + " m²"), "nhiễu: cộng tử với tử, mẫu với mẫu; phép chia"); } },
  { has: "đàn gà có 45 con", right: () => +str(mul(F(45), P("3/5"))) },
  { has: "360 quyển vở", right: () => +str(sub(sub(F(360), mul(F(360), P("1/6"))), mul(F(360), P("3/8")))) },
  { has: "Tuần nào lớp 4A thu gom được nhiều chai nhựa nhất", right: (q) => argBy(chartOf(q, ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"]), (a, b) => a > b) },
  { has: "Cả bốn tuần lớp 4A thu gom được bao nhiêu chai nhựa", right: (q) => sum(chartOf(q, ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"]).map((c) => c[1])) },
  { has: "3 tấm thẻ: thẻ số 1, thẻ số 2 và thẻ số 3", right: () => (24 - 9 - 8) + " lần" },
  { has: "6 tấn 5 tạ", right: () => String(6 * 10 + 5) },
  { has: "2 tấn 4 tạ khoai tây", right: () => { const kg = 2 * 1000 + 4 * 100; return kg - +str(mul(F(kg), P("5/8"))); } },
  { has: "Cạnh nào song song với cạnh EG", right: (q) => {
    const T = tuGiac(q.svg, ["E", "G", "H", "K"]), EG = vsub(T.G, T.E), canh = { "Cạnh KH": vsub(T.H, T.K), "Cạnh EK": vsub(T.K, T.E), "Cạnh GH": vsub(T.H, T.G) };
    const ss = Object.keys(canh).filter((k) => songSong(canh[k], EG)); assert.equal(ss.length, 1, "đúng một cạnh song song với EG");
    assert.ok(vuongGoc(canh["Cạnh EK"], EG), "lời giải: EK vuông góc với EG"); assert.ok(EG[1] === 0 && canh["Cạnh KH"][1] === 0 && canh["Cạnh EK"][0] === 0, "EG, KH nằm ngang, EK thẳng đứng");
    return ss[0]; } },
  { has: "hình thoi có cạnh dài 5/8 m", right: () => str(mul(P("5/8"), F(4))) },
  { has: "AB dài 12 cm, cạnh BC dài bằng 1/3 cạnh AB", right: () => String((12 + 12 / 3) * 2) }
];
const de2 = [
  { has: "Số “một tỉ” viết là", right: () => fmt(1e9) },
  { has: "7 777 777", right: () => fmt(div(7000000, 7000)) + " lần" },
  { has: "1 506 × 23", right: () => fmt(1506 * 23), more: (q) => assert.ok(q.o.includes(fmt(1506 * 3 + 1506 * 2)), "nhiễu: quên viết lùi tích riêng") },
  { has: "1 152 học sinh xếp đều thành 32 hàng", right: () => div(1152, 32), more: () => { assert.equal(115 - 3 * 32, 19); assert.equal(192, 6 * 32); } },
  { has: "125 chiếc áo", right: () => fmt(125 * 6 * 8) + " chiếc áo" },
  { has: "Tuổi trung bình của 5 bạn", right: () => div(9 * 5 + 33, 6) },
  { has: "6 xe tải như nhau", right: () => (400 - div(252, 6) * 9) + " thùng" },
  { has: "Trong phân số 5/12, mẫu số 12 cho biết", right: () => "Chiếc bánh được chia thành 12 phần bằng nhau" },
  { has: "rút gọn được thành phân số 2/5", right: (q) => { const m = q.o.filter((o) => toi(o) === "2/5"); assert.equal(m.length, 1); return m[0]; } },
  { has: "hai phân số 15/25 và 7/50", right: () => MOT(quyDong([toi("15/25"), "7/50"], 50).join(" và ")) },
  { has: "phân số nào lớn hơn 1", right: (q) => { const m = q.o.filter((o) => cmp(P(o), F(1)) > 0); assert.equal(m.length, 1); return m[0]; } },
  { has: "8/11 − 3/11", right: () => str(ev2("8/11 − 3/11")) },
  { has: "bình có 11/12 l nước", right: () => { lop4("11/12", "1/4"); return str(sub(sub(P("11/12"), P("1/4")), P("1/12"))) + " l"; } },
  { has: "Phân số đảo ngược của phân số 7/4", right: () => { const p = P("7/4"); return p.d + "/" + p.n; } },
  { has: "7/10 : 2", right: () => str(ev2("7/10 : 2")) },
  { has: "cuốn truyện có 120 trang", right: () => str(mul(F(120), P("3/4"))) + " trang" },
  { has: "vườn cây ăn quả có 36 cây", right: () => { const cam = +str(mul(F(36), P("4/9"))); return (36 - cam - cam) + " cây"; } },
  { has: "Số học sinh đi xe đạp là", right: (q) => String(chartOf(q, ["Đi bộ", "Xe đạp", "Xe máy", "Xe buýt"]).find((c) => c[0] === "Xe đạp")[1]) },
  { has: "đi xe máy nhiều hơn số học sinh đi bộ", right: (q) => { const d = Object.fromEntries(chartOf(q, ["Đi bộ", "Xe đạp", "Xe máy", "Xe buýt"])); return (d["Xe máy"] - d["Đi bộ"]) + " bạn"; } },
  { has: "mặt 7 chấm", right: () => false },
  { has: "1/4 giờ = ? phút", right: () => str(mul(F(60), P("1/4"))) + " phút" },
  { has: "bao xi măng nặng 50 kg", right: () => div(4 * 1000, 50) + " bao" },
  { has: "ô cửa sổ có dạng hình chữ nhật", right: () => "2 cặp" },
  { has: "Cho hình thoi MNPQ và hai đường chéo MP, NQ", right: (q) => {
    const T = tuGiac(q.svg, ["M", "N", "P", "Q"]), s = (a, b) => vsub(T[b], T[a]);
    assert.ok(["MN", "NP", "PQ", "QM"].every((k) => len2(s(k[0], k[1])) === len2(s("M", "N"))), "bốn cạnh bằng nhau: hình thoi");
    assert.ok(!vuongGoc(s("M", "N"), s("M", "Q")), "không phải hình vuông");
    // hai đường chéo vẽ nét đứt nối đúng hai cặp đỉnh đối nhau, nằm trên đường kẻ dọc, ngang của lưới (như lời giải)
    const at = luoi(q.svg), C = tags(q.svg, "line").filter((l) => l["stroke-dasharray"]).map((l) => [at([+l.x1, +l.y1]), at([+l.x2, +l.y2])].map(String).sort().join("|"));
    assert.deepEqual(C.sort(), [[T.M, T.P].map(String).sort().join("|"), [T.N, T.Q].map(String).sort().join("|")].sort(), "hai đường chéo MP, NQ");
    assert.ok(s("M", "P")[0] === 0 && s("N", "Q")[1] === 0, "MP thẳng đứng, NQ nằm ngang");
    return [vuongGoc(s("M", "Q"), s("M", "N")), songSong(s("M", "N"), s("Q", "P")), vuongGoc(s("M", "P"), s("N", "Q")), len2(s("N", "P")) === len2(s("P", "Q"))]; } },
  { has: "chu vi bằng chu vi của hình chữ nhật có chiều dài 9 cm", right: () => div((9 + 7) * 2, 4) + " cm" }
];
const own = [
  { has: "Số nào dưới đây có tám chữ số", right: (q) => { const m = q.o.filter((o) => String(val(o)).length === 8); assert.equal(m.length, 1); return m[0]; } },
  { has: "Số 70 080 000 đọc là", right: (q) => /đọc là: (.+)\.$/.exec(q.q)[1] === cap(doc(70080000)) },
  { has: "lớn hơn 6 800 000 và bé hơn 6 900 000", right: (q) => { const m = q.o.filter((o) => val(o) > 6800000 && val(o) < 6900000); assert.equal(m.length, 1); return m[0]; } },
  { has: "giá trị của chữ số 3 trong số đó", right: (q) => q.l.map((n) => fmt(giaTri(val(n), 3))), more: (q) => assert.ok(!q.l.some((n) => fmt(giaTri(val(n), 3)) === q.r[4]), "ô thừa không đúng với số nào") },
  { has: "405 × 27", right: () => 405 * 27 },
  { has: "4 096 × 25 = 102 400", right: () => 4096 * 25 === 102400, more: () => { assert.equal(4096 * 5, 20480); assert.equal(4096 * 2, 8192); } },
  { has: "Chia một số tự nhiên cho 34", right: () => 34 - 1, more: (q) => { assert.ok(q.x.includes("1 021 : 34 = 30 (dư 1)") && q.x.includes("1 053 : 34 = 30 (dư 33)")); assert.equal(34 * 30 + 1, 1021); assert.equal(34 * 30 + 33, 1053); } },
  { has: "4 368 : 52 có mấy chữ số", right: () => String(div(4368, 52)).length + " chữ số" },
  { has: "57 × 63 + 57 × 36 + 57", right: () => 57 * 63 + 57 * 36 + 57 },
  { has: "4 hộp dây điện, mỗi hộp có 7 cuộn", right: () => 25 * 7 * 4 },
  { has: "ngày thứ nhất bán 135 quyển", essay: (q) => {
    const d2 = 135 + 27, d3 = d2 - 18, tb = div(135 + d2 + d3, 3), r = rubricNums(q);
    assert.ok(q.q.includes("ít hơn ngày thứ hai 18 quyển"));
    assert.deepEqual(r.slice(0, 3), [[135, 27, d2], [d2, 18, d3], [135, d2, d3, 3, tb]]); essayOK(q, 4, 2); assert.ok(q.x.includes("Đáp số: " + tb + " quyển sách")); } },
  { has: "Ba thùng dầu có trung bình 40 l", right: () => div(40 * 3 - 6, 3) + " l" },
  { has: "36 kg gạo trong 4 ngày", essay: (q) => {
    const ngay = div(36, 4), kg = 2 * 100 + 7, r = rubricNums(q);
    assert.deepEqual(r.slice(0, 2), [[1, 36, 4, ngay], [2, 7, kg, kg, ngay, div(kg, ngay)]]); essayOK(q, 4, 2); assert.ok(q.x.includes("Đáp số: " + div(kg, ngay) + " ngày")); } },
  { has: "Nhóm của Hà có 6 bạn, trong một giờ cắt được 72 ngôi sao", right: () => div(72, 6) * (6 + 3), more: (q) => assert.ok(q.q.includes("thêm 3 bạn")) },
  { has: "ném vòng", right: (q) => day(q)[4] + " điểm" },
  { has: "quả dưa hấu", right: (q) => Math.max(...day(q)) === 6 },
  { has: "đi học muộn", right: (q) => { const d = day(q); return [d.length === 4, d[2] === 0, Math.min(...d) === d[0], sum(d) === 5]; } },
  { has: "Số trang sách Lan đọc trong 5 ngày", right: (q) => day(q).filter((v) => v > 12).length + " ngày" },
  { has: "tung một đồng xu 16 lần", right: (q) => {
    const kq = /kết quả: ([SN, ]+?) \(/.exec(q.q)[1].split(", "), S = kq.filter((c) => c === "S").length, N = kq.length - S;
    assert.equal(kq.length, 16); return [S === 10, N === 8, S > N, kq[1] === "N"]; } },
  { has: "3 lá thăm ghi chữ A, B, C", right: (q) => thamA(q)[0], more: (q) => { const [a, b, c] = thamA(q); assert.equal(+a + b + c, 12); assert.equal(b, c); assert.ok(q.x.includes("được " + a + " chữ A") && q.x.includes("mỗi lá xuất hiện " + b + " lần")); } },
  { has: "7 m dây ruy băng", right: () => str(F(7, 9)) },
  { has: "20 viên kẹo, trong đó có 9 viên vị dâu", right: () => [str(F(9, 20)) === "9/20", 20 - 9 === 11, str(F(20 - 9, 20)) === "11/9", cmp(F(9, 20), F(1)) < 0] },
  { has: "Bạn Minh rút gọn một số phân số", right: () => [toi("15/35") === "3/7", isMin("14/21"), toi("48/60") === "4/5" && isMin("4/5"), isMin("10/15")] },
  { has: "ném trúng 30 lần", right: () => toi("30/45") },
  { has: "có mẫu số là 24", right: (q) => quyDong(q.l, 24), more: (q) => assert.ok(!q.l.some((l) => cmp(P(l), P(q.r[4])) === 0), "ô thừa không bằng phân số nào") },
  { has: "3/5 và 7/10 thành hai phân số có cùng mẫu số là 20", right: () => MOT(quyDong(["3/5", "7/10"], 20).join(" và ")) },
  { has: "3/7 > 3/5", right: () => cmp(P("3/7"), P("3/5")) > 0 },
  { has: "theo thứ tự từ lớn đến bé", right: (q) => q.o.slice().sort((a, b) => cmp(P(b), P(a))) },
  { has: "4 − 9/5", right: () => str(ev2("4 − 9/5")) },
  { has: "Bạn Hà làm bốn phép tính với phân số", right: (q) => q.o.map((s) => { const [l, r] = s.split(" = "), m = /^(\S+) ([+−]) (\S+)$/.exec(l); lop4(m[1], m[3]); return dung(s); }) },
  { has: "tổ Một quét được 3/7 sân trường", right: () => { const hai = ev2("3/7 − 1/14"); return str(add(P("3/7"), hai)); } },
  { has: "hộp sữa 1 l", right: () => [cmp(P("1/3"), P("5/12")) < 0, str(ev2("1/3 + 5/12")) === "3/4", str(sub(F(1), ev2("1/3 + 5/12"))) === "1/4", str(ev2("5/12 − 1/3")) === "1/3"] },
  { has: "Tính rồi nối mỗi phép tính ở cột trái", right: (q) => q.l.map((e) => str(ev2(e))), more: (q) => assert.ok(!q.l.some((e) => str(ev2(e)) === q.r[4]), "ô thừa không là kết quả của phép tính nào") },
  { has: "3/5 × 2 = 6/10", right: () => dung("3/5 × 2 = 6/10") },
  { has: "gói bột giặt nặng 3/4 kg", right: () => +str(ev2("3/4 × 8")) },
  { has: "Xét các phép nhân, phép chia phân số", right: (q) => q.o.map(dung) },
  { has: "Nối mỗi ý ở cột trái với số thích hợp", right: (q) => q.l.map((s) => { const m = /^(\S+) của (\d+)$/.exec(s); return str(mul(F(+m[2]), P(m[1]))); }), more: (q) => assert.ok(!q.l.some((s) => { const m = /^(\S+) của (\d+)$/.exec(s); return str(mul(F(+m[2]), P(m[1]))) === q.r[4]; }), "ô thừa") },
  { has: "2/7 của 1 tuần lễ", right: () => str(mul(F(7), P("2/7"))) },
  { has: "480 chậu hoa", essay: (q) => {
    const ban = +str(mul(F(480), P("3/8"))), r = rubricNums(q);
    assert.deepEqual(r.slice(0, 2), [[480, 3, 8, ban], [480, ban, 480 - ban]]); essayOK(q, 3, 2); assert.ok(q.x.includes("Đáp số: " + (480 - ban) + " chậu hoa")); } },
  { has: "chiều dài 24 cm, chiều rộng bằng 3/4 chiều dài", right: () => 24 * +str(mul(F(24), P("3/4"))) },
  { has: "Đổi đơn vị đo: nối mỗi số đo", right: () => [(3 * 10 + 4) + " yến", str(mul(F(60), P("2/3"))) + " phút", (4 * 100 + 6) + " dm²", str(mul(F(60), P("3/4"))) + " giây"], more: (q) => assert.equal(q.r[4], "304 yến") },
  { has: "2/5 thế kỉ = 40 năm", right: () => str(mul(F(100), P("2/5"))) === "40" },
  { has: "tấm bìa hình vuông có cạnh 8 dm", right: () => div(8 * 10, 5) ** 2, more: () => assert.equal(div(80 * 80, 5 * 5), 256) },
  { has: "chạy nhanh 3 giây", right: () => { const g = 3 * 24; return Math.floor(g / 60) + " phút " + (g % 60) + " giây"; } },
  { has: "Hình vuông ABCD có cạnh AB vuông góc", right: () => "Cạnh AD và cạnh BC" },
  { has: "đường thẳng MN và các điểm A, B, C, D, E", right: (q) => {
    const D = diem(q.svg, ["M", "N", "A", "B", "C", "D", "E"]), MN = vsub(D.N, D.M);
    const L = tags(q.svg, "line").filter((l) => l.stroke === "acc"); assert.equal(L.length, 1, "một đường thẳng MN");
    const at = luoi(q.svg), a = at([+L[0].x1, +L[0].y1]), b = at([+L[0].x2, +L[0].y2]);
    ["M", "N"].forEach((k) => assert.equal(cross(vsub(b, a), vsub(D[k], a)), 0, k + " nằm trên đường thẳng vẽ"));
    assert.notEqual(cross(MN, vsub(D.A, D.M)), 0, "A không nằm trên MN");
    const ss = ["B", "C", "D", "E"].filter((k) => songSong(vsub(D[k], D.A), MN)); assert.equal(ss.length, 1);
    assert.ok(vsub(D.C, D.A)[1] === 0 && vuongGoc(vsub(D.E, D.A), MN) && !vuongGoc(vsub(D.D, D.A), MN), "lời giải: AC nằm ngang, AE vuông góc với MN");
    assert.deepEqual(MN, [4, -4], "lời giải: từ M đến N sang phải 4 ô, lên trên 4 ô");
    return "Điểm " + ss[0]; } },
  { has: "hai cạnh liền nhau dài 25 m và 18 m", right: () => (25 + 18) * 2 + " m" },
  { has: "MN dài 9 cm, cạnh NP dài 5 cm", right: () => 9 },
  { has: "khung cửa sổ hình thoi", right: () => 2 * 100 - 38 * 4 },
  { has: "chu vi 128 cm, cạnh dài hơn cạnh ngắn 6 cm", right: () => div(128 / 2 + 6, 2) }
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
    assert.strictEqual(JSON.stringify(got()), JSON.stringify(typeof want === "string" && q.type === "num" && !want.includes("/") ? +want : want), at + ": đáp án " + JSON.stringify(got()) + ", tính được " + JSON.stringify(want));
    if (q.type === "num" && typeof q.ans === "string") { assert.ok(/^\d+\/\d+$/.test(q.ans) && isMin(q.ans), at + ": đáp án phân số viết tối giản"); assert.ok(/Viết kết quả dưới dạng phân số\./.test(q.q), at + ": đề dặn viết kết quả dưới dạng phân số"); }
    if (q.type === "mc") assert.ok(!q.o.slice(1).includes(q.o[0]), at + ": nhiễu trùng đáp án đúng");
    // lựa chọn phân số không bằng nhau về giá trị (câu rút gọn: phân số bằng mà chưa tối giản vẫn là lựa chọn sai)
    if (q.type === "mc" && q.o.every((o) => /^\d+\/\d+$/.test(o))) {
      const v = q.o.map((o) => str(P(o))), rg = q.topic === "Rút gọn phân số";
      q.o.forEach((o, k) => q.o.forEach((p, j) => { if (j > k && v[j] === v[k]) assert.ok(rg && k === 0 && !isMin(p), at + ": hai lựa chọn bằng nhau " + o + ", " + p); }));
    }
    if (q.type === "tf4") assert.ok(q.a.includes(true) && q.a.includes(false), at + ": đúng/sai 4 ý cần có cả ý đúng và ý sai");
    if (c.more) c.more(q);
    n++;
  });
};
for (const [id, checks] of [["toan4-ck2-de1", de1], ["toan4-ck2-de2", de2]]) {
  const b = bank(id); assert.ok(b, "thiếu " + id); assert.equal(b.questions.length, 25);
  run(id, b.questions, checks);
}
const pool = bank(POOL), mine = pool.questions.filter((q) => q.src === POOL);
run(POOL, mine, own);

/* ---------- mọi phép cộng, trừ phân số viết trong đề, lựa chọn, lời giải đều thuộc trường hợp lớp 4 đã học ---------- */
pool.questions.forEach((q) => [q.q, q.x].concat(q.o || [], q.l || []).forEach((s) => [...String(s).matchAll(/(\d+\/\d+) [+−] (\d+\/\d+)/g)].forEach((m) => lop4(m[1], m[2]))));

/* ---------- mức độ và ma trận ---------- */
assert.ok(pool.questions.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(Object.keys(M).length, 18, "18 chủ đề");
assert.deepEqual([...new Set(pool.questions.map((q) => q.topic))].sort(), Object.keys(M).sort(), "chủ đề của kho đúng chữ của ma trận");
// mỗi ô rút 1 câu và có đúng 4 câu: một câu ở mỗi đề cố định, hai câu riêng
Object.entries(M).forEach(([t, v]) => v.forEach((k, i) => {
  const have = pool.questions.filter((q) => q.topic === t && q.lv === i + 1);
  assert.ok(k <= 1, `ô (${t}, mức ${i + 1}) rút ${k} câu: mỗi ô rút nhiều nhất 1 câu`);
  if (!k) { assert.equal(have.length, 0, `ô (${t}, mức ${i + 1}) không rút mà kho có ${have.length} câu`); return; }
  assert.deepEqual(["toan4-ck2-de1", "toan4-ck2-de2", POOL].map((s) => have.filter((q) => q.src === s).length), [1, 1, 2], `ô (${t}, mức ${i + 1})`);
}));
// câu tự luận chỉ ở các ô Vận dụng rút 1 câu có cả câu chấm tự động, đúng ba ô: mỗi lần rút nhiều nhất 3 câu tự luận
const oTuLuan = [...new Set(pool.questions.filter((q) => q.type === "essay").map((q) => q.topic + "|" + q.lv))];
assert.deepEqual(oTuLuan.sort(), ["Rút về đơn vị|3", "Số trung bình cộng|3", "Tìm phân số của một số|3"], "câu tự luận: " + oTuLuan);
assert.ok(oTuLuan.every((k) => { const [t, lv] = k.split("|"); return M[t][2] === 1 && pool.questions.some((q) => q.topic === t && q.lv === +lv && q.type !== "essay"); }));
assert.equal(pool.questions.filter((q) => q.svg).length, 8, "kho có 8 câu có hình");
const dem = (f) => pool.questions.filter(f).length;
assert.ok(dem((q) => q.type === "tf4") >= 6 && dem((q) => q.type === "num") >= 10 && dem((q) => q.type === "match") >= 3 && dem((q) => q.type === "order") >= 2, "kho đủ dạng câu");
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

/* ---------- đáp án đúng của câu trắc nghiệm không dài hơn hẳn lựa chọn sai (quá 1,2 lần và quá 8 kí tự; Rút ra N22) ---------- */
pool.questions.filter((q) => q.type === "mc").forEach((q) => {
  const dai = Math.max(...q.o.slice(1).map((o) => o.length));
  assert.ok(!(q.o[0].length > 1.2 * dai && q.o[0].length - dai > 8), "đáp án dài hơn hẳn lựa chọn sai: " + q.q);
});

/* ---------- đề bài không trùng câu nào khác trong data/banks/4-toan.js (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const deBai = BANKS.filter((b) => b.file === "4-toan.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q) })));
deBai.filter((d) => /^toan4-ck2-/.test(d.at)).forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });

/* ---------- dò lộ đáp án (Rút ra N5, N24, N8; bộ dò theo tests/toan6-ck2.js) giữa hai câu rút được cùng lúc: khác ô (chủ đề, mức).
   Phân số có ở nhiều đề bài, nên đáp án là số (từ hai chữ số), phân số, số kèm đơn vị chỉ tìm ở vị trí kết quả của câu kia (ngay sau
   “=”, “là”, “bằng”, “được”); cặp nối: câu kia có cả hai vế. Đáp án bằng chữ (“Tuần 3”, “Cạnh DC”…) có ở câu kia thì chỉ in ra khi
   chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM. ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null ? [] : [].concat(q.ans), q.l || [], q.r || [], (q.rubric || []).map((c) => c.c)).map(String);
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*)(?!\d|,\d|\/|°|%|[⁰¹²³⁴⁵⁶⁷⁸⁹]| \d|\s*[·+−×:](?:\s|\d|\())/gu)].map((m) => val(m[1]));
const kqLa = (s, a) => new RegExp("(?:=|(?:^|[\\s(])(?:là|bằng|được))\\s+" + a.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + "(?![\\d/,]|\\s*[·+−×:](?:\\s|\\d|\\())", "u").test(s);
const cungLuc = (p, q) => p.topic !== q.topic || p.lv !== q.lv;
const ten = (q, i) => (q.src === POOL ? "own#" + (i + 1) : q.src === pool.pool.from[0] ? "de1#" + (i - 49) : q.src === pool.pool.from[1] ? "de2#" + (i - 74) : q.src + "#" + (i + 1));
const doLo = (qs) => {
  const lo = [], chuLo = [];
  qs.forEach((q, i) => {
    const so = [], kq = [], cum = [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const them = (a) => (/^\d{1,3}(?: \d{3})*(?: [^\d\s]+)?$/.test(a) ? so.push(val(a.split(/ (?=[^\d\s])/)[0])) : /^\d+\/\d+(?: [^\d\s]+)?$/.test(a) ? kq.push(a.replace(/ .*$/, "")) : cum.push(a));
    if (q.type === "essay") (/Đáp số: (.+)$/m.exec(q.x)[1].match(/\d{1,3}(?: \d{3})*/g) || []).forEach((x) => so.push(val(x)));
    else if (q.type === "num") them(String(q.ans)); else if (q.type === "fill") them(String(q.ans[0])); else if (q.type === "mc" && !/^[<>=]$/.test(q.o[0])) them(q.o[0]);
    // câu chọn dấu “a/b … c/d”: lộ khi câu kia ghi mệnh đề so sánh đó (theo một trong hai chiều)
    const so2 = q.type === "mc" && /^[<>=]$/.test(q.o[0]) ? (([, a, b]) => [`${a} ${q.o[0]} ${b}`, `${b} ${{ ">": "<", "<": ">", "=": "=" }[q.o[0]]} ${a}`])(/(\S+) … (\S+)$/.exec(q.q)) : [];
    qs.forEach((p, j) => {
      if (j === i || !cungLuc(p, q)) return;
      const C = chu(p), T = C.map((s) => s.toLowerCase()), at = `${ten(p, j)} lộ đáp án ${ten(q, i)}: `;
      so.filter((x) => x >= 10 && C.flatMap(soKQ).includes(x)).forEach((x) => lo.push(at + x));
      kq.filter((a) => C.some((s) => kqLa(s, a))).forEach((a) => lo.push(at + a));
      cap.filter(([l, r]) => T.some((t) => t.includes(l.toLowerCase()) && t.includes(r.toLowerCase()))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      cum.filter((s) => T.some((t) => t.includes(s.toLowerCase()))).forEach((s) => chuLo.push(at + s));
      so2.filter((s) => C.some((t) => t.includes(s))).forEach((s) => lo.push(at + s));
    });
  });
  return { lo, chuLo };
};
// thứ tự trong kho: câu riêng trước, rồi hai đề cố định (Store._fillSeedFile)
assert.deepEqual(pool.questions.map((q) => q.src), Array(50).fill(POOL).concat(Array(25).fill("toan4-ck2-de1"), Array(25).fill("toan4-ck2-de2")), "thứ tự kho");
const { lo, chuLo } = doLo(pool.questions);
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuLo.join("\n"));
const DA_XEM = [];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 5/9”, “là 154”, cả hai vế một cặp nối
const gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x }), d1 = bank("toan4-ck2-de1").questions;
const thuLo = (qs) => doLo(qs.map((q) => Object.assign({ src: "thử" }, q))).lo.map((s) => s.replace(/^.*: /, ""));
assert.deepEqual(thuLo([d1[7], gia(d1[0], "Ví dụ: 1 − 4/9 = 5/9.")]), ["5/9"]);
assert.deepEqual(thuLo([d1[18], gia(d1[0], "Tổng số chai nhựa là 154 chai.")]), [154]);
assert.deepEqual(thuLo([mine[3], gia(d1[0], "Ví dụ: 3 062 145 có chữ số 3 với giá trị 3 000 000.")]), ["3 062 145 → 3 000 000"]);
console.log(n, "câu đã tính lại (50 câu của 2 đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + pool.questions.length + " câu; trung bình " + (essays / 400).toFixed(2) + " câu tự luận mỗi lần rút.");
console.log("MATH OK");
