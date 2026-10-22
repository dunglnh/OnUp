// Tính lại đáp án ngân hàng Toán 4 giữa kì I (data/banks/4-toan.js): hai đề cố định toan4-gk1-de1, toan4-gk1-de2 và các câu
// riêng của đề ngẫu nhiên toan4-gk1-ngau-nhien (Phiên N23). Mỗi câu: kiểm tra đề có đúng số liệu (has) rồi so đáp án với kết quả
// tính bằng code: trắc nghiệm o[0], điền khuyết ans[0], đúng/sai a, đúng/sai 4 ý a (4 ý), trả lời bằng số ans, nối cột r[i] của
// từng ô l[i], sắp xếp thứ tự o; tự luận: các số trong thang chấm và đáp án gợi ý. Câu có hình: đọc toạ độ, chữ trong hình (thước
// đo góc, các góc, mặt đồng hồ, tứ giác, ba điểm thẳng hàng, tia số, bảng hàng và lớp) rồi mới tính.
// Phạm vi Bài 1–19: phép tính chỉ trong phạm vi 100 000 (Bài 2), nhân, chia với số có một chữ số.
// Cuối cùng kiểm tra mức độ và ma trận: mọi câu có lv; hai đề cố định chia đúng theo ma trận; câu riêng ở ô nào cũng ít nhất gấp
// đôi số câu ô đó rút (đã làm hai đề cố định vẫn gặp toàn câu mới); câu tự luận chỉ ở ô Vận dụng của “Giải bài toán có ba bước
// tính”; rút thử nhiều lần ra đúng 10 Biết, 8 Hiểu, 7 Vận dụng, đúng ma trận, nhiều nhất 2 câu tự luận.
// Chạy: node tests/toan4-gk1.js → in MATH OK.
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan4-gk1-ngau-nhien", DE1 = "toan4-gk1-de1", DE2 = "toan4-gk1-de2";

/* ---------- số ---------- */
const fmt = (n) => { assert.ok(Number.isInteger(n), "không phải số nguyên: " + n); return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " "); };
const val = (s) => +String(s).replace(/\s/g, "");
const div = (a, b) => { assert.equal(a % b, 0, a + " : " + b + " có dư"); return a / b; };
const round = (n, p) => Math.round(n / p) * p;
const sum = (a) => a.reduce((s, v) => s + v, 0);
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
// giá trị biểu thức viết như trong đề ("50 + b : 4", "(a + b) × 3", "70 000 − (20 000 + 15 000)"), thay chữ bằng số
const ev = (e, vars) => {
  let s = String(e).replace(/(\d) (?=\d{3}\b)/g, "$1").replace(/×/g, "*").replace(/:/g, "/").replace(/−/g, "-");
  Object.entries(vars || {}).forEach(([k, v]) => (s = s.replace(new RegExp("\\b" + k + "\\b", "g"), "(" + v + ")")));
  assert.ok(/^[\d\s+\-*/().]+$/.test(s), "biểu thức lạ: " + e);
  return Function("return " + s)();
};
// đọc số kiểu sách Việt Nam: linh, mốt, tư, lăm; lớp không đứng đầu đọc đủ "không trăm" (như tests/toan4-ck1.js)
const SO = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
function doc(n) {
  const groups = [];
  for (let x = n; x > 0; x = Math.floor(x / 1000)) groups.unshift(x % 1000);
  const LOPDOC = ["", " nghìn", " triệu"];
  return groups.map((g, i) => {
    if (!g && i) return "";
    const h = Math.floor(g / 100), t = Math.floor(g / 10) % 10, u = g % 10, full = i > 0 || h > 0, w = [];
    if (full) w.push(SO[h] + " trăm");
    if (t === 0 && u) w.push(full ? "linh " + SO[u] : SO[u]);
    if (t === 1) w.push("mười" + (u === 5 ? " lăm" : u ? " " + SO[u] : ""));
    if (t >= 2) w.push(SO[t] + " mươi" + (u === 1 ? " mốt" : u === 4 ? " tư" : u === 5 ? " lăm" : u ? " " + SO[u] : ""));
    return w.join(" ") + LOPDOC[groups.length - 1 - i];
  }).filter(Boolean).join(" ");
}
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const HANG = ["đơn vị", "chục", "trăm", "nghìn", "chục nghìn", "trăm nghìn", "triệu", "chục triệu", "trăm triệu"];
const LOP = ["đơn vị", "nghìn", "triệu"];
const hangOf = (n, d) => { const s = String(n), i = s.indexOf(String(d)); assert.ok(i >= 0 && s.lastIndexOf(String(d)) === i, `chữ số ${d} phải có đúng một lần trong ${n}`); return s.length - 1 - i; };
const distinct = (n) => new Set(String(n)).size === String(n).length;
/* Lượt nhớ khi đặt tính (cộng, trừ; nhân với số có một chữ số): các hàng có nhớ sang hàng bên trái (trừ: mượn ở hàng bên trái).
   Bài 2 ôn tập các phép tính trong phạm vi 100 000 (chương trình lớp 3): có nhớ không quá hai lượt và không liên tiếp. */
const luotNho = (a, b, op) => {
  const A = String(a).split("").reverse().map(Number), B = String(b).split("").reverse().map(Number), out = [];
  let c = 0;
  if (op === "×") { A.forEach((d, i) => { c = Math.floor((d * b + c) / 10); if (c && i < A.length - 1) out.push(i); }); return out; }
  for (let i = 0; i < Math.max(A.length, B.length); i++) {
    const v = op === "+" ? (A[i] || 0) + (B[i] || 0) + c : (A[i] || 0) - (B[i] || 0) - c;
    c = op === "+" ? +(v >= 10) : +(v < 0); if (c) out.push(i);
  }
  return out;
};
const nhoOK = (a, b, op) => { const l = luotNho(a, b, op); assert.ok(l.length <= 2 && l.every((v, k) => !k || v - l[k - 1] > 1), `${fmt(a)} ${op} ${b} có nhớ ở các hàng ${l} (không quá hai lượt, không liên tiếp)`); };
/* ---------- góc, đơn vị đo ---------- */
const loai = (d) => (d < 90 ? "Góc nhọn" : d === 90 ? "Góc vuông" : d < 180 ? "Góc tù" : "Góc bẹt");
const kim = (h, m) => { const a = Math.abs(30 * h - 5.5 * m) % 360; return Math.min(a, 360 - a); }; // góc giữa hai kim đồng hồ lúc h giờ m phút
const theKi = (y) => Math.ceil(y / 100);
const LA_MA = (n) => [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]].reduce((s, [v, r]) => { while (n >= v) { s += r; n -= v; } return s; }, "");
const KG = { kg: 1, yến: 10, tạ: 100, tấn: 1000 }, MM2 = { "mm²": 1, "cm²": 100, "dm²": 10000, "m²": 1000000 }, GIAY = { giây: 1, phút: 60 };
// số đo nhiều đơn vị ("2 tấn 50 kg", "1 dm² 60 cm²", "1 phút 40 giây") → số đơn vị nhỏ nhất của bảng U
const soDo = (s, U) => {
  const parts = [...String(s).matchAll(/(\d+(?: \d{3})*) ([^\d\s]+)/g)];
  assert.ok(parts.length && parts.map((m) => m[0]).join(" ") === String(s).trim(), "số đo lạ: " + s);
  return sum(parts.map((m) => { assert.ok(m[2] in U, "đơn vị lạ: " + m[2]); return val(m[1]) * U[m[2]]; }));
};
/* ---------- đọc hình SVG ---------- */
const nums = (s) => s.trim().split(/[\s,]+/).map(Number);
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const lines = (svg) => [...svg.matchAll(/<line [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { a: [+a.x1, +a.y1], b: [+a.x2, +a.y2] }; });
const polys = (svg) => [...svg.matchAll(/<polygon [^>]*>/g)].map((m) => { const p = nums(attrs(m[0]).points); return p.reduce((o, v, i) => (i % 2 ? o[o.length - 1].push(v) : o.push([v]), o), []); });
const circles = (svg) => [...svg.matchAll(/<circle [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { c: [+a.cx, +a.cy], r: +a.r }; });
const dots = (svg) => circles(svg).filter((x) => x.r <= 6).map((x) => x.c);
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { at: [+a.x, +a.y], t: m[2] }; });
const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const near = (p, q, e) => dist(p, q) <= (e || 0.6);
const dot = (u, v) => u[0] * v[0] + u[1] * v[1];
const cross = (u, v) => u[0] * v[1] - u[1] * v[0];
const deg = (u, v) => Math.round(Math.acos(dot(u, v) / Math.hypot(...u) / Math.hypot(...v)) * 180 / Math.PI * 10) / 10; // góc giữa hai vectơ
const huong = (p, o) => Math.round(Math.atan2(o[1] - p[1], p[0] - o[0]) * 180 / Math.PI); // góc (độ) của điểm p nhìn từ o, chiều ngược kim đồng hồ
const nhan = (svg, name) => { const t = texts(svg).filter((x) => x.t === name); assert.equal(t.length, 1, "hình cần đúng một nhãn " + name); return t[0].at; };
const dinh = (pts, svg, name) => { const at = nhan(svg, name); return pts.slice().sort((p, q) => dist(p, at) - dist(q, at))[0]; }; // điểm gần nhãn nhất
/* Số đo góc có đỉnh là chấm gần nhãn name nhất: hai đoạn thẳng có một đầu ở đỉnh là hai cạnh của góc; không có thì đỉnh phải nằm
   giữa một đoạn thẳng (góc bẹt). */
const gocTai = (svg, name) => {
  const v = dinh(dots(svg), svg, name), L = lines(svg);
  const rays = L.filter((l) => near(l.a, v) || near(l.b, v)).map((l) => (near(l.a, v) ? sub(l.b, l.a) : sub(l.a, l.b)));
  if (rays.length) { assert.equal(rays.length, 2, "góc đỉnh " + name + " cần đúng hai cạnh"); return deg(rays[0], rays[1]); }
  const qua = L.filter((l) => Math.abs(cross(sub(l.b, l.a), sub(v, l.a))) < 1e-6 * dist(l.a, l.b) && dot(sub(v, l.a), sub(v, l.b)) < 0);
  assert.equal(qua.length, 1, "góc bẹt đỉnh " + name + " nằm giữa một đường thẳng"); return 180;
};
/* Thước đo góc (như tests/toan4-ck1.js): tâm O ngay trên nhãn O, cạnh thứ nhất đi qua vạch 0, các số của thang đặt đúng hướng;
   trả về số đo của góc (độ) và tên hai cạnh theo nhãn ở đầu mỗi cạnh. */
const thuoc = (svg, [o, a, b]) => {
  const O = (([x, y]) => [x, y - 24])(nhan(svg, o)), L = lines(svg).filter((l) => near(l.a, O));
  assert.equal(L.length, 2, "hai cạnh của góc");
  const A = L.find((l) => huong(l.b, O) === 0), B = L.find((l) => l !== A);
  assert.ok(A && dist(A.b, nhan(svg, a)) < 20 && dist(B.b, nhan(svg, b)) < 20, `cạnh ${o}${a} đi qua vạch 0, nhãn ${b} ở đầu cạnh kia`);
  texts(svg).filter((t) => /^\d+$/.test(t.t)).forEach((t) => assert.ok(Math.abs(huong(t.at, O) - +t.t) <= 6, `vạch ${t.t} đặt sai chỗ`)); // thang số tăng ngược chiều kim đồng hồ
  const d = huong(B.b, O); assert.equal(d % 10, 0, "cạnh kia phải đi qua một vạch chia (mỗi vạch 10°)"); return d;
};
/* Mặt đồng hồ: vòng tròn lớn; hai kim là hai đoạn thẳng từ tâm (kim phút dài hơn, chỉ số 12); giờ đọc từ hướng kim giờ. Tên đồng
   hồ là chữ cái gần tâm nhất. */
const dongHo = (svg) => circles(svg).filter((x) => x.r >= 20).map(({ c }) => {
  const hands = lines(svg).filter((l) => near(l.a, c)).map((l) => ({ v: sub(l.b, l.a), len: dist(l.a, l.b) })).sort((p, q) => q.len - p.len);
  assert.equal(hands.length, 2, "mỗi đồng hồ có hai kim");
  const [m, h] = hands; assert.ok(m.len > h.len + 5, "kim phút dài hơn kim giờ");
  assert.ok(Math.abs(m.v[0]) < 1e-9 && m.v[1] < 0, "kim phút chỉ số 12");
  let a = Math.atan2(h.v[0], -h.v[1]) * 180 / Math.PI; if (a < 0) a += 360;
  const gio = Math.round(a / 30) % 12 || 12; assert.ok(Math.abs(a - 30 * (gio % 12)) < 0.5, "kim giờ chỉ đúng một số");
  const ten = texts(svg).filter((t) => /^[A-Z]$/.test(t.t)).sort((p, q) => dist(p.at, c) - dist(q.at, c))[0].t;
  assert.equal(deg(m.v, h.v), kim(gio, 0), "góc giữa hai kim lúc " + gio + " giờ");
  return { ten, gio, goc: kim(gio, 0) };
});
const tuGiac = (svg, names) => { // đa giác 4 đỉnh có nhãn → {A: [x, y], …}
  const ps = polys(svg); assert.equal(ps.length, 1, "hình cần đúng một tứ giác"); assert.equal(ps[0].length, 4);
  const o = {}; names.forEach((n) => (o[n] = dinh(ps[0], svg, n)));
  assert.equal(new Set(Object.values(o).map(String)).size, 4, "mỗi nhãn một đỉnh");
  return o;
};
/* Tia số (hoặc một phần tia số) nằm ngang: vạch dọc cách đều; hai nhãn số đặt đúng hai vạch → giá trị của điểm có nhãn chữ. */
const tiaSo = (svg) => {
  const ticks = lines(svg).filter((l) => l.a[0] === l.b[0]).map((l) => l.a[0]).sort((a, b) => a - b);
  ticks.slice(1).forEach((t, i) => assert.equal(t - ticks[i], ticks[1] - ticks[0], "các vạch cách đều"));
  const labs = texts(svg).filter((t) => /^\d[\d ]*$/.test(t.t)).map((t) => ({ x: t.at[0], v: val(t.t) }));
  assert.equal(labs.length, 2, "hai nhãn số"); assert.ok(labs.every((l) => ticks.includes(l.x)), "nhãn số đặt đúng vạch");
  const [l0, l1] = labs, kc = ticks[1] - ticks[0];
  assert.equal(((l1.v - l0.v) * kc) % (l1.x - l0.x), 0, "mỗi khoảng ứng với một số tự nhiên");
  return { buoc: ((l1.v - l0.v) * kc) / (l1.x - l0.x), at: (name) => { const p = dinh(dots(svg), svg, name); assert.ok(ticks.includes(p[0]), "điểm " + name + " nằm trên một vạch"); return l0.v + ((p[0] - l0.x) * (l1.v - l0.v)) / (l1.x - l0.x); } };
};
/* Bảng hàng và lớp: hàng chữ số ở dưới; tên hàng (một hoặc hai dòng) đứng thẳng cột trên mỗi chữ số; tên lớp đứng giữa ba cột của lớp. */
const HANG_BANG = { "Trăm nghìn": 100000, "Chục nghìn": 10000, "Nghìn": 1000, "Trăm": 100, "Chục": 10, "Đơn vị": 1 };
const bangSo = (svg) => {
  const T = texts(svg), so = T.filter((t) => /^\d$/.test(t.t)).sort((p, q) => p.at[0] - q.at[0]);
  const cot = so.map((d) => ({ x: d.at[0], d: +d.t, ten: T.filter((t) => Math.abs(t.at[0] - d.at[0]) < 1 && t.at[1] < d.at[1] && !/^Lớp /.test(t.t)).sort((p, q) => p.at[1] - q.at[1]).map((t) => t.t).join(" ") }));
  cot.forEach((c) => assert.ok(c.ten in HANG_BANG, "cột chưa có tên hàng: " + c.ten));
  assert.deepEqual(cot.map((c) => HANG_BANG[c.ten]), cot.map((c) => HANG_BANG[c.ten]).sort((a, b) => b - a), "các hàng xếp từ cao đến thấp");
  [["Lớp nghìn", (v) => v >= 1000], ["Lớp đơn vị", (v) => v < 1000]].forEach(([ten, f]) => {
    const cs = cot.filter((c) => f(HANG_BANG[c.ten])); assert.equal(cs.length, 3);
    assert.ok(Math.abs(nhan(svg, ten)[0] - sum(cs.map((c) => c.x)) / 3) < 1, ten + " đứng giữa ba cột của lớp");
  });
  return sum(cot.map((c) => c.d * HANG_BANG[c.ten]));
};

/* ---------- kiểm tra từng câu ----------
   right(q): đáp án tính bằng code (so với o[0], ans[0], a, ans, r của từng ô trái, o); more(q): kiểm tra thêm (nhiễu, bước giải, hình). */
const has = (q, list) => list.forEach((s) => assert.ok(q.x.includes(s), "lời giải thiếu " + s));
const motDung = (q, f) => { const m = q.o.filter(f); assert.equal(m.length, 1, "cần đúng một lựa chọn đúng: " + JSON.stringify(m)); return m[0]; };
const thua = (q, f) => q.r.slice(q.l.length).forEach((x) => assert.ok(!q.l.some((l) => f(l) === x), "ô thừa " + x + " lại nối được")); // ô thừa của câu nối cột
// so sánh viết như "4 070 600 > 4 007 600", "7 000 000 = 70 trăm nghìn"
const giaTri = (s) => { const m = /^(\d+(?: \d{3})*) trăm nghìn$/.exec(s); return m ? val(m[1]) * 100000 : val(s); };
const soSanh = (s) => { const [a, op, b] = s.split(/ ([<>=]) /); return { ">": giaTri(a) > giaTri(b), "<": giaTri(a) < giaTri(b), "=": giaTri(a) === giaTri(b) }[op]; };
const de1 = [
  { has: "Số 45 207 đọc là", right: () => cap(doc(45207)), more: (q) => assert.deepEqual(q.o.slice(1), [45270, 450207, 45027].map((n) => cap(doc(n)))) }, // nhiễu: đọc số khác vị trí chữ số
  { has: "3 trăm nghìn, 5 chục nghìn, 9 trăm và 4 đơn vị", right: () => fmt(300000 + 50000 + 900 + 4) },
  { has: "Chữ số 3 trong số 2 365 104", right: () => { const h = hangOf(2365104, 3); return cap(`hàng ${HANG[h]}, lớp ${LOP[Math.floor(h / 3)]}`); } },
  { has: "Mỗi ý so sánh sau đúng hay sai", right: (q) => q.o.map(soSanh), more: () => assert.equal(10 * 100000, 1000000) },
  { has: "theo thứ tự từ lớn đến bé", right: (q) => q.o.slice().sort((a, b) => val(b) - val(a)) },
  { has: "từ 99 990 đến 100 010", right: () => range(99990, 100010).length, more: (q) => has(q, [`${range(99990, 99999).length} + ${range(100000, 100010).length} = 21`]) },
  { has: "Làm tròn số 5 732 940", right: () => fmt(round(5732940, 100000)) },
  { has: "Làm tròn số 3 980 500", right: () => round(3980500, 100000) === 3900000, more: (q) => has(q, [fmt(round(3980500, 100000))]) },
  { has: "Số nào dưới đây là số lẻ", right: (q) => motDung(q, (o) => val(o) % 2 === 1) },
  { has: "đánh số chẵn liên tiếp: 2, 4, 6, …, 48", right: () => range(2, 48).filter((n) => n % 2 === 0).length },
  { has: "b = 36, giá trị của biểu thức 50 + b : 4", right: () => fmt(ev("50 + b : 4", { b: 36 })) },
  { has: "a = 12 và b = 4, nối", right: (q) => q.l.map((e) => fmt(ev(e, { a: 12, b: 4 }))), more: (q) => thua(q, (e) => fmt(ev(e, { a: 12, b: 4 }))) },
  { has: "P = 64 cm, a = 15 cm, b = 20 cm", right: () => { const c = 64 - 15 - 20; assert.equal(ev("a + b + c", { a: 15, b: 20, c }), 64); return c; } },
  { has: "45 638 + 23 517", right: () => fmt(45638 + 23517) },
  { has: "? − 26 450 = 48 320", right: () => fmt(48320 + 26450), more: (q) => { assert.equal(q.o[1], fmt(48320 - 26450)); nhoOK(48320, 26450, "+"); } }, // nhiễu: nhầm phép tính
  { has: "12 104 × 6", right: () => fmt(12104 * 6) },
  { has: "18 450 kg đường", right: () => div(18450 - 450, 5) },
  { has: "4 thùng sách, mỗi thùng có 120 quyển", right: () => div(120 * 4 - 30, 6) },
  { has: "3 đàn gà, mỗi đàn 48 con", right: () => fmt(48 * 3 - 36 + 25) + " con", more: (q) => assert.deepEqual(q.o.slice(1), [48 * 3 - 36 - 25, 48 * 3 + 36 - 25, 48 - 36 + 25].map((n) => fmt(n) + " con")) }, // nhiễu: trừ cả hai số, cộng nhầm, quên nhân
  { has: "Thước đo góc cho biết góc đỉnh O, cạnh OM, ON", right: (q) => thuoc(q.svg, ["O", "M", "N"]) + "°", more: (q) => assert.equal(loai(thuoc(q.svg, ["O", "M", "N"])), "Góc nhọn") },
  { has: "Lúc 9 giờ", right: () => loai(kim(9, 0)) === "Góc vuông" },
  { has: "Lúc 10 giờ", right: () => fmt(kim(10, 0)), more: (q) => { assert.equal(kim(1, 0), 30); assert.ok(q.q.includes("Lúc 1 giờ, kim giờ và kim phút của đồng hồ tạo thành góc 30°")); } },
  { has: "5 tấn = ___ kg", right: () => fmt(soDo("5 tấn", KG)) },
  { has: "2 tấn 50 kg = ? kg", right: () => fmt(soDo("2 tấn 50 kg", KG)) + " kg" },
  { has: "con voi cân nặng 3 tấn 2 tạ", right: () => soDo("3 tấn 2 tạ", KG) - soDo("9 tạ", KG) }
];
const de2 = [
  { has: "Sáu triệu không trăm bốn mươi nghìn năm trăm", right: (q) => { const n = 6040500; assert.equal(cap(doc(n)), /“(.+)”/.exec(q.q)[1]); return fmt(n); } },
  { has: "Lớp triệu gồm các hàng", right: (q) => HANG.slice(6, 9).map((h) => "hàng " + h).join(", ") === /gồm các hàng: (.+)\.$/.exec(q.q)[1] },
  { has: "Trong số 58 096 241, chữ số 9", right: () => fmt(9 * 10 ** hangOf(58096241, 9)) },
  { has: "có chữ số 5 ở hàng chục nghìn", right: (q) => motDung(q, (o) => hangOf(val(o), 5) === 4) },
  { has: "Cho số 30 708 045", right: (q) => { const n = 30708045;
    assert.deepEqual(q.o.slice(0, 3), ["Số này có tám chữ số.", "Chữ số 7 có giá trị là 70 000.", "Lớp đơn vị của số này gồm các chữ số 0; 4; 5."]);
    return [String(n).length === 8, 7 * 10 ** hangOf(n, 7) === 70000, String(n % 1000).padStart(3, "0").split("").join("; ") === "0; 4; 5", q.o[3] === "Số này đọc là: " + cap(doc(n)) + "."]; } },
  { has: "Nam viết chữ số 5 rồi viết tiếp năm chữ số 0", right: () => div(+("5" + "0".repeat(5)), +("5" + "0".repeat(4))) },
  { has: "Làm tròn số 864 315", right: () => fmt(round(864315, 100000)) },
  { has: "2 345 800 chiếc bút", right: () => fmt(round(2345800, 100000)) + " chiếc bút" },
  { has: "Mọi số có chữ số tận cùng là 0 đều là số chẵn", right: () => range(0, 5000).filter((n) => n % 10 === 0).every((n) => n % 2 === 0) },
  { has: "Số chẵn liền sau của số 1 999", right: () => fmt(range(2000, 2010).find((n) => n % 2 === 0)) },
  { has: "biểu thức chứa ba chữ", right: (q) => motDung(q, (o) => new Set(o.match(/[a-z]/g) || []).size === 3) },
  { has: "a − b × c là 45", right: () => ev("a − b × c", { a: 20, b: 5, c: 3 }) === 45, more: () => assert.equal(ev("(a − b) × c", { a: 20, b: 5, c: 3 }), 45) },
  { has: "a = 8 000 và b = 5 000, mua 3 quyển vở và 2 chiếc bút", right: () => ev("a × 3 + b × 2", { a: 8000, b: 5000 }) },
  { has: "82 740 − 37 425", right: () => fmt(82740 - 37425) },
  { has: "64 000 − ? = 13 500", right: () => fmt(64000 - 13500), more: (q) => { assert.equal(q.o[1], fmt(64000 + 13500)); nhoOK(64000, 13500, "−"); } },
  { has: "63 045 : 9", right: () => fmt(div(63045, 9)), more: (q) => q.o.slice(1).forEach((o) => assert.notEqual(val(o) * 9, 63045)) },
  { has: "4 xe tải, mỗi xe chở 12 400 kg", right: () => div(12400 * 4, 8) },
  { has: "2 130 kg gạo nếp", right: () => fmt(2130 + 2130 * 3 - 5800) },
  { has: "Lớp 4A có 32 học sinh", right: () => (32 + (32 - 2)) * 4 },
  { has: "Quan sát hình. Góc nào là góc nhọn", right: (q) => {
    const d = ["M", "N", "P", "Q"].map((n) => [n, gocTai(q.svg, n)]);
    assert.deepEqual(d.map(([, x]) => loai(x)), ["Góc tù", "Góc vuông", "Góc nhọn", "Góc bẹt"], "lời giải: M tù, N vuông, P nhọn, Q bẹt");
    return "Góc đỉnh " + d.find(([, x]) => loai(x) === "Góc nhọn")[0];
  } },
  { has: "89°, 91°, 90°, 179°", right: (q) => /có số đo (.+), có bao nhiêu góc tù/.exec(q.q)[1].split(", ").map((s) => parseInt(s, 10)).filter((d) => loai(d) === "Góc tù").length + " góc" },
  { has: "quay mặt về hướng Bắc", right: () => { const H = { Bắc: 0, Đông: 90, Nam: 180, Tây: 270 }; return (H.Nam - H.Bắc) + "°"; } }, // quay sang phải: theo chiều kim đồng hồ
  { has: "Nối mỗi số đo ở cột trái với số đo bằng nó", right: (q) => q.l.map((l) => { const m = q.r.filter((r) => soDo(r, MM2) === soDo(l, MM2)); assert.equal(m.length, 1); return m[0]; }), more: (q) => q.r.slice(q.l.length).forEach((x) => assert.ok(!q.l.some((l) => soDo(l, MM2) === soDo(x, MM2)), "ô thừa " + x + " lại nối được")) },
  { has: "khoảng thời gian sau theo thứ tự từ ngắn đến dài", right: (q) => { assert.equal(new Set(q.o.map((o) => soDo(o, GIAY))).size, 4); return q.o.slice().sort((a, b) => soDo(a, GIAY) - soDo(b, GIAY)); } },
  { has: "4 tấm gỗ hình vuông, mỗi tấm có cạnh 5 dm", right: () => { assert.equal(Math.sqrt(4) * 5, 10, "4 tấm ghép thành hình vuông cạnh 10 dm"); return div(5 * 5 * 4 * MM2["dm²"], MM2["m²"]); } }
];
// câu riêng của đề ngẫu nhiên
const own = [
  { has: "Bảng dưới đây ghi các chữ số của một số theo hàng và lớp", right: (q) => fmt(bangSo(q.svg)), more: (q) => has(q, [doc(bangSo(q.svg))]) },
  { has: "Quan sát tia số. Điểm A", right: (q) => fmt(tiaSo(q.svg).at("A")),
    more: (q) => { const t = tiaSo(q.svg), a = t.at("A"); assert.deepEqual(q.o.slice(1).map(val), [a / 10, a * 10, a + t.buoc]); } }, // nhiễu: sai hàng, vạch liền sau
  { has: "Số tự nhiên nào cũng có số liền sau", right: () => range(0, 100000).every((n) => n + 1 > n) },
  { has: "Số 9 080 700 viết thành tổng", right: () => String(9080700).split("").map((d, i, s) => +d * 10 ** (s.length - 1 - i)).filter(Boolean).map(fmt).join(" + "),
    more: (q) => q.o.slice(1).forEach((o) => assert.notEqual(sum(o.split(" + ").map(val)), 9080700)) },
  { has: "Số bé nhất có sáu chữ số là", right: () => fmt(range(1, 999999).find((n) => String(n).length === 6)) },
  { has: "Số nào dưới đây là số tròn triệu", right: (q) => motDung(q, (o) => val(o) >= 1000000 && val(o) % 1000000 === 0) },
  { has: "Sắp xếp các số sau theo thứ tự từ bé đến lớn", right: (q) => q.o.slice().sort((a, b) => val(a) - val(b)) },
  { has: "Chữ số 4 trong số nào dưới đây có giá trị lớn nhất", right: (q) => { const g = (o) => 4 * 10 ** hangOf(val(o), 4); assert.equal(new Set(q.o.map(g)).size, 4); return q.o.slice().sort((a, b) => g(b) - g(a))[0]; } },
  { has: "Quan sát một phần của tia số. Điểm P", right: (q) => fmt(tiaSo(q.svg).at("P")), more: (q) => has(q, ["mỗi khoảng là " + fmt(tiaSo(q.svg).buoc)]) },
  { has: "Hai số 4 999 999 và 5 000 000", right: () => 4999999 + 1 === 5000000 },
  { has: "Số lẻ lớn nhất có sáu chữ số khác nhau", right: () => { for (let n = 999999; ; n--) if (n % 2 && distinct(n)) return fmt(n); }, more: (q) => { assert.equal(range(100000, 999999).filter(distinct).reduce((a, b) => Math.max(a, b)), 987654); has(q, ["987 654"]); } },
  { has: "Hà đếm thêm 100 000, bắt đầu từ 350 000", right: (q) => { const day = range(0, 9).map((k) => 350000 + k * 100000); assert.ok(q.q.includes(day.slice(0, 3).map(fmt).join("; "))); return day[9]; } },
  { has: "ta xét chữ số ở hàng chục nghìn", right: () => range(0, 2000).map((k) => k * 4999 + 7).every((n) => round(n, 100000) === Math.floor(n / 100000) * 100000 + (Math.floor(n / 10000) % 10 >= 5 ? 100000 : 0)) },
  { has: "Làm tròn số 6 049 999", right: () => fmt(round(6049999, 100000)) },
  { has: "khi làm tròn đến hàng trăm nghìn thì được 400 000", right: (q) => motDung(q, (o) => round(val(o), 100000) === 400000) },
  { has: "Nối mỗi số ở cột trái với số làm tròn", right: (q) => q.l.map((l) => fmt(round(val(l), 100000))), more: (q) => thua(q, (l) => fmt(round(val(l), 100000))) },
  { has: "Số lẻ bé nhất có ba chữ số", right: () => fmt(range(100, 999).find((n) => n % 2)) },
  { has: "Hai số lẻ liên tiếp hơn kém nhau", right: () => { const le = range(0, 500).filter((n) => n % 2), d = new Set(le.slice(1).map((v, i) => v - le[i])); assert.equal(d.size, 1); return [...d][0] + " đơn vị"; } },
  { has: "Mỗi ý sau về số chẵn, số lẻ", right: () => { const E = range(0, 300).filter((n) => n % 2 === 0), O = range(0, 300).filter((n) => n % 2);
    return [O.every((n) => (n + 1) % 2 === 0), E.every((a) => E.every((b) => (a + b) % 2 === 1)), 45678 % 2 === 0, range(1, 10).filter((n) => n % 2).length === 5]; } },
  { has: "quyển truyện có 60 trang", right: () => range(1, 60).filter((n) => n % 2).length + " trang" },
  { has: "a = 6, b = 7 và c = 5", right: () => fmt(ev("a × b × c", { a: 6, b: 7, c: 5 })) },
  { has: "m = 1 500, giá trị của biểu thức 8 000 − m × 3", right: () => fmt(ev("8 000 − m × 3", { m: 1500 })) },
  { has: "a = 6 và b = 9, biểu thức nào", right: (q) => motDung(q, (o) => ev(o, { a: 6, b: 9 }) === 54) },
  { has: "a = 26 m, b = 18 m", right: () => ev("(a + b) × 2", { a: 26, b: 18 }) },
  { has: "Chu vi P của hình vuông có cạnh a là P = a × 4", right: () => { const P = (a) => ev("a × 4", { a });
    return [P(9) === 36, P(9) === 13, range(1, 50).every((a) => P(a + 2) - P(a) === 8), div(100, 4) === 20]; }, more: () => assert.equal(9 + 4, 13) },
  { has: "Bạn An có a viên bi", right: (q) => { assert.ok(q.q.includes("nhiều hơn bạn An 15 viên bi") && q.q.includes("a = 28")); return ev("a + (a + 15)", { a: 28 }); } },
  { has: "Tính nhẩm: 60 000 − 25 000 + 5 000", right: () => fmt(ev("60 000 − 25 000 + 5 000")), more: (q) => assert.equal(q.o[1], fmt(ev("60 000 − (25 000 + 5 000)"))) },
  { has: "93 516 − 8 409", right: () => fmt(93516 - 8409) },
  { has: "70 000 − (20 000 + 15 000) là 65 000", right: () => ev("70 000 − (20 000 + 15 000)") === 65000, more: () => assert.equal(ev("70 000 − 20 000 + 15 000"), 65000) },
  { has: "Biết 45 320 + 23 180 = 68 500", right: (q) => { assert.equal(45320 + 23180, 68500); return q.o.map((o) => { const [a, b] = o.split(" = "); return ev(a) === ev(b); }); } },
  { has: "21 360 : 4", right: () => fmt(div(21360, 4)) },
  { has: "25 607 : 5 có số dư", right: () => String(25607 % 5), more: (q) => has(q, [`25 607 : 5 = ${fmt(Math.floor(25607 / 5))} (dư ${25607 % 5})`]) },
  { has: "số chia là 8, thương là 9 041 và số dư là 3", right: () => { const n = 9041 * 8 + 3; assert.equal(Math.floor(n / 8), 9041); assert.equal(n % 8, 3); return fmt(n); }, more: (q) => { assert.equal(q.o[1], fmt(9041 * 8)); nhoOK(9041, 8, "×"); } },
  { has: "Có 31 250 quyển vở", right: () => Math.ceil(31250 / 6), more: (q) => has(q, [`31 250 : 6 = ${fmt(Math.floor(31250 / 6))} (dư ${31250 % 6})`]) },
  { has: "Một xưởng may ngày thứ nhất may được 1 450 chiếc áo", essay: (q) => {
    const hai = 1450 * 2, ba = hai - 500, tong = 1450 + hai + ba, rb = q.rubric.map((c) => c.c).join(" | ");
    [`1 450 × 2 = ${fmt(hai)}`, `${fmt(hai)} − 500 = ${fmt(ba)}`, `1 450 + ${fmt(hai)} + ${fmt(ba)} = ${fmt(tong)}`].forEach((s) => { assert.ok(rb.includes(s), "thang chấm thiếu " + s); assert.ok(q.x.includes(s), "gợi ý thiếu " + s); });
    assert.ok(q.x.includes(`Đáp số: ${fmt(tong)} chiếc áo`));
  } },
  { has: "Bác Tư thu hoạch được 5 sọt cà chua", essay: (q) => {
    const tong = 24 * 5, ban = tong - 30, tui = div(ban, 6), rb = q.rubric.map((c) => c.c).join(" | ");
    [`24 × 5 = ${tong}`, `${tong} − 30 = ${ban}`, `${ban} : 6 = ${tui}`].forEach((s) => { assert.ok(rb.includes(s), "thang chấm thiếu " + s); assert.ok(q.x.includes(s), "gợi ý thiếu " + s); });
    assert.ok(q.x.includes(`Đáp số: ${tui} túi`));
  } },
  { has: "Một bể đang chứa 1 500 l nước", essay: (q) => {
    const vao = 25 * 8, co = 1500 + vao, con = co - 650, rb = q.rubric.map((c) => c.c).join(" | ");
    [`25 × 8 = ${vao}`, `1 500 + ${vao} = ${fmt(co)}`, `${fmt(co)} − 650 = ${fmt(con)}`].forEach((s) => { assert.ok(rb.includes(s), "thang chấm thiếu " + s); assert.ok(q.x.includes(s), "gợi ý thiếu " + s); });
    assert.ok(q.x.includes(`Đáp số: ${fmt(con)} l`));
  } },
  { has: "6 hàng cây cam, mỗi hàng 14 cây", right: () => { const cam = 14 * 6; return cam + div(cam, 2); } },
  { has: "ngày thứ nhất đi được 245 km", right: () => { const hai = 245 - 32; return fmt(245 + hai + hai) + " km"; },
    more: (q) => assert.deepEqual(q.o.slice(1), [245 + (245 - 32), 245 + 2 * (245 + 32), 245 * 3 - 32].map((n) => fmt(n) + " km")) }, // nhiễu: quên ngày thứ ba, cộng 32, trừ một lần
  { has: "Góc có số đo 100° là góc nhọn", right: () => loai(100) === "Góc nhọn" },
  { has: "Nối mỗi số đo góc với tên gọi", right: (q) => q.l.map((l) => loai(parseInt(l, 10))) },
  { has: "Quan sát bốn đồng hồ", right: (q) => {
    const D = dongHo(q.svg); assert.equal(D.length, 4);
    assert.deepEqual(D.map((d) => loai(d.goc)).sort(), ["Góc bẹt", "Góc nhọn", "Góc tù", "Góc vuông"], "bốn đồng hồ bốn loại góc");
    D.forEach((d) => assert.ok(q.x.includes(`Đồng hồ ${d.ten} chỉ ${d.gio} giờ`), "lời giải đọc đúng giờ của đồng hồ " + d.ten));
    return "Đồng hồ " + D.find((d) => loai(d.goc) === "Góc tù").ten;
  } },
  { has: "Quan sát các góc của tứ giác ABCD", right: (q) => {
    const p = tuGiac(q.svg, ["A", "B", "C", "D"]), goc = (x, y, z) => deg(sub(p[x], p[y]), sub(p[z], p[y])), G = { A: goc("D", "A", "B"), B: goc("A", "B", "C"), C: goc("B", "C", "D"), D: goc("C", "D", "A") };
    assert.equal(Math.round(sum(Object.values(G))), 360, "tổng bốn góc của tứ giác"); Object.values(G).forEach((g) => assert.ok(Math.abs(g - 90) >= 20, "góc nhìn rõ là nhọn hay tù: " + g));
    return [loai(G.A) === "Góc nhọn", loai(G.C) === "Góc tù", Object.values(G).some((g) => g === 90), G.D < G.B];
  } },
  { has: "Góc đỉnh O, cạnh OC, OD lớn hơn góc vuông", right: (q) => thuoc(q.svg, ["O", "C", "D"]) - 90, more: (q) => has(q, ["vạch " + thuoc(q.svg, ["O", "C", "D"])]) },
  { has: "ba điểm M, O, N cùng nằm trên một đường thẳng", right: (q) => {
    const P = dots(q.svg), [M, O, N, Pt] = ["M", "O", "N", "P"].map((n) => dinh(P, q.svg, n));
    assert.ok(Math.abs(cross(sub(N, M), sub(O, M))) < 1e-6 && dot(sub(M, O), sub(N, O)) < 0, "M, O, N thẳng hàng, O ở giữa");
    const mop = deg(sub(M, O), sub(Pt, O)); assert.ok(q.q.includes(`cạnh OM, OP có số đo ${mop}°`) && texts(q.svg).some((t) => t.t === mop + "°"), "số đo góc MOP ghi trong đề và trong hình");
    return deg(sub(Pt, O), sub(N, O));
  } },
  { has: "1 tạ bằng bao nhiêu yến", right: () => fmt(div(KG.tạ, KG.yến)) + " yến" },
  { has: "7 dm² = ___ cm²", right: () => fmt(div(soDo("7 dm²", MM2), MM2["cm²"])) },
  { has: "Nối mỗi năm ở cột trái với thế kỉ", right: (q) => q.l.map((l) => "Thế kỉ " + LA_MA(theKi(+l.replace("Năm ", "")))), more: (q) => thua(q, (l) => "Thế kỉ " + LA_MA(theKi(+l.replace("Năm ", "")))) },
  { has: "Sắp xếp các số đo diện tích", right: (q) => { assert.equal(new Set(q.o.map((o) => soDo(o, MM2))).size, 4); return q.o.slice().sort((a, b) => soDo(a, MM2) - soDo(b, MM2)); } },
  { has: "ông nội của Lan tròn 75 tuổi", right: () => "Thế kỉ " + LA_MA(theKi(2026 - 75)) },
  { has: "3 tạ gạo nếp và 1 tấn 5 tạ gạo tẻ", right: () => div(soDo("3 tạ", KG) + soDo("1 tấn 5 tạ", KG), 6) }
];

let n = 0;
const run = (id, qs, checks) => {
  assert.equal(qs.length, checks.length, id + ": số câu khác số kiểm tra");
  qs.forEach((q, i) => {
    const c = checks[i], at = id + "#" + (i + 1);
    assert.ok(q.q.includes(c.has), at + ": đề không có “" + c.has + "”");
    try {
      if (q.type === "essay") { assert.ok(c.essay, "tự luận cần kiểm tra thang chấm"); c.essay(q); n++; return; }
      const want = c.right(q);
      const got = { fill: () => q.ans[0], tf: () => q.a, tf4: () => q.a, num: () => q.ans, match: () => q.r.slice(0, q.l.length), order: () => q.o }[q.type] || (() => q.o[0]);
      // so bằng JSON: câu hỏi nạp trong vm khác (tests/nap-de.js), mảng của nó không cùng nguyên mẫu với mảng ở đây
      assert.strictEqual(JSON.stringify(got()), JSON.stringify(want), "đáp án " + JSON.stringify(got()) + ", tính được " + JSON.stringify(want));
      if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), "nhiễu trùng đáp án đúng");
      if (c.more) c.more(q);
    } catch (e) { e.message = at + ": " + e.message; throw e; }
    n++;
  });
};
for (const [id, checks] of [[DE1, de1], [DE2, de2]]) {
  const b = bank(id); assert.ok(b, "thiếu " + id); assert.equal(b.questions.length, 25);
  run(id, b.questions, checks);
}
const pool = bank(POOL), mine = pool.questions.filter((q) => q.src === POOL);
run(POOL, mine, own);

/* ---------- phạm vi Bài 1–19 ----------
   Câu về phép tính, giải toán: mọi số không quá 100 000 (Bài 2: các phép tính trong phạm vi 100 000). Cả kho: mỗi phép nhân có
   một thừa số có một chữ số, mỗi phép chia có số chia có một chữ số (nhân, chia với số có hai chữ số học ở học kì II). */
const SO_TRONG = (s) => [...String(s).matchAll(/\d+(?: \d{3})*/g)].map((m) => val(m[0]));
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans || [], q.l || [], q.r || [], (q.rubric || []).map((c) => c.c), [q.ans].filter((a) => typeof a === "number").map(String));
pool.questions.forEach((q, i) => {
  const at = `${q.src}: “${q.q.slice(0, 40)}”`;
  if (["Phép cộng, phép trừ", "Phép nhân, phép chia", "Giải bài toán có ba bước tính"].includes(q.topic)) chu(q).forEach((s) => SO_TRONG(s).forEach((v) => assert.ok(v <= 100000, `${at}: số ${fmt(v)} ngoài phạm vi 100 000`)));
  chu(q).forEach((s) => [...String(s).matchAll(/(\d+(?: \d{3})*) ([×:]) (\d+(?: \d{3})*)/g)].forEach(([, a, op, b]) =>
    assert.ok(op === "×" ? Math.min(val(a), val(b)) < 10 : val(b) < 10, `${at}: ${a} ${op} ${b} cần thừa số hoặc số chia có một chữ số`)));
  // phép tính đặt tính ở đề của câu cộng, trừ, nhân, chia (số có từ bốn chữ số): có nhớ không quá hai lượt, không liên tiếp
  if (["Phép cộng, phép trừ", "Phép nhân, phép chia"].includes(q.topic)) [...q.q.matchAll(/(\d+(?: \d{3})*) ([+−×]) (\d+(?: \d{3})*)/g)].forEach(([, a, op, b]) => {
    if (Math.max(val(a), val(b)) >= 1000) { try { nhoOK(val(a), val(b), op); } catch (e) { e.message = at + ": " + e.message; throw e; } }
  });
});

/* ---------- mức độ và ma trận ---------- */
assert.ok(pool.questions.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M), TOPICS = Object.keys(M);
assert.deepEqual(pool.pool.from, [DE1, DE2]);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
const ck1 = bank("toan4-ck1-ngau-nhien").pool.matrix;
TOPICS.forEach((t) => assert.ok(t in ck1, `chủ đề “${t}” phải đúng chữ của toan4-ck1`));
const levels = (qs) => [1, 2, 3].map((l) => qs.filter((q) => q.lv === l).length);
// hai đề cố định chia đúng theo ma trận, câu theo thứ tự chủ đề của ma trận
[DE1, DE2].forEach((id) => {
  const d = bank(id).questions;
  TOPICS.forEach((t) => assert.deepEqual(levels(d.filter((q) => q.topic === t)), M[t], `${id} đúng ma trận ở chủ đề ${t}`));
  assert.deepEqual([...new Set(d.map((q) => q.topic))], TOPICS, id + " đủ chủ đề, theo thứ tự ma trận");
  assert.ok(!d.some((q) => q.type === "essay"), id + " không có câu tự luận (chỉ ở câu riêng của đề ngẫu nhiên)");
});
// câu riêng ở ô nào cũng ít nhất gấp đôi số câu ô đó rút, và chỉ ở ô có trong ma trận: đã làm hai đề cố định vẫn đủ câu mới
Object.entries(M).forEach(([t, v]) => v.forEach((k, i) => {
  const all = pool.questions.filter((q) => q.topic === t && q.lv === i + 1), riêng = all.filter((q) => q.src === POOL);
  assert.ok(all.length >= 2 * k && riêng.length >= 2 * k, `ô (${t}, mức ${i + 1}) rút ${k} câu mà kho có ${all.length}, câu riêng ${riêng.length}`);
}));
mine.forEach((q, i) => assert.ok(M[q.topic] && M[q.topic][q.lv - 1] > 0, `${POOL}#${i + 1}: ô (${q.topic}, mức ${q.lv}) không có trong ma trận`));
// câu tự luận chỉ ở ô Vận dụng của “Giải bài toán có ba bước tính” (rút 2 câu), xen với câu chấm tự động
const tuLuan = pool.questions.filter((q) => q.type === "essay"), oGiai = pool.questions.filter((q) => q.topic === "Giải bài toán có ba bước tính" && q.lv === 3);
assert.ok(tuLuan.length >= 2 && tuLuan.length <= 3 && tuLuan.every((q) => q.topic === "Giải bài toán có ba bước tính" && q.lv === 3), "2–3 câu tự luận, chỉ ở ô Vận dụng của Giải bài toán có ba bước tính");
assert.ok(oGiai.filter((q) => q.type !== "essay").length >= 2 * M["Giải bài toán có ba bước tính"][2], "ô có câu tự luận vẫn đủ câu chấm tự động");
const seen = new Set();
let essays = 0;
for (let k = 0; k < 400; k++) {
  const d = Quiz.draw(pool);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, 25);
  assert.deepEqual(levels(d.questions), [10, 8, 7]);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual(levels(d.questions.filter((q) => q.topic === t)), v, "rút đúng ma trận ở chủ đề " + t));
  const e = d.questions.filter((q) => q.type === "essay").length; assert.ok(e <= 2, "một lần rút có " + e + " câu tự luận"); essays += e;
  d.questions.forEach((q) => seen.add(Quiz.key(q)));
}
assert.ok(mine.every((q) => seen.has(Quiz.key(q))), "400 lần rút thử phải gặp đủ các câu riêng");
// học sinh đã làm hai đề cố định (đúng hết): lần rút sau chỉ lấy câu riêng (lịch sử câu như PoolHist: {done, wrong})
const hist = (q) => (q.src !== POOL ? { done: 1, wrong: 0 } : null);
for (let k = 0; k < 50; k++) assert.ok(Quiz.draw(pool, hist).questions.every((q) => q.src === POOL), "đã làm hai đề cố định thì bộ rút chỉ lấy câu riêng");
console.log(n, "câu đã tính lại (50 câu của 2 đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + pool.questions.length + " câu; trung bình " + (essays / 400).toFixed(2) + " câu tự luận mỗi lần rút.");
console.log("MATH OK");
