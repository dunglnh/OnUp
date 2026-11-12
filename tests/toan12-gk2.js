// Tính lại đáp án ngân hàng Toán 12 giữa kì II (data/banks/12-toan.js): hai đề cố định toan12-gk2-de1, toan12-gk2-de2 và các câu
// riêng của đề ngẫu nhiên toan12-gk2-ngau-nhien (Phiên N12-gk2-toan; Toán 12 tập hai, Bài 11–15). Mỗi câu khớp đúng một mục kiểm tra
// (theo chữ has trong đề bài), mục đó đọc số liệu, hàm số trong đề rồi tính lại đáp án: trắc nghiệm o[0] (đúng một lựa chọn thoả),
// đúng/sai 4 ý a (từng ý tính lại), trả lời bằng số ans; tự luận: các số trong thang chấm, lời giải gợi ý.
// Hàm số: bộ đọc biểu thức viết như trong đề (x³ − 2cos x + 3, 2ˣ/ln 2, e²ˣ, √(3x), |x² − 1|, ln 3x, 1/cos² x…). Nguyên hàm: kiểm tra
// bằng đạo hàm lại (đạo hàm số của hàm trong lựa chọn bằng hàm dưới dấu nguyên hàm tại nhiều điểm; lựa chọn sai phải lệch). Tích phân:
// tính bằng code từ biểu thức trong đề (Gauss – Legendre thích nghi, chia đoạn ở nghiệm khi có giá trị tuyệt đối), so với tích phân
// tính từ một nguyên hàm khi đề cho; diện tích, thể tích (công thức trong lựa chọn tính ra số, đúng một công thức bằng giá trị đúng).
// Toạ độ: số hữu tỉ chính xác; vectơ pháp tuyến, chỉ phương, tích có hướng, phương trình mặt phẳng (tổng quát, đoạn chắn), đường thẳng
// (tham số, chính tắc), khoảng cách từ điểm đến mặt phẳng, vị trí tương đối của hai mặt phẳng, hai đường thẳng.
// Hình: diện tích trên lưới ô vuông (lưới, trục, số ghi trên trục như tests/toan12-ck1.js; đường cong thuộc đồ thị hàm số; phần tô màu
// có đỉnh trên đồ thị hoặc trục hoành, khớp cận tích phân, diện tích đo trên hình bằng diện tích tính ra), khối tròn xoay (đường sinh,
// đường đối xứng nét đứt, elip ở hai đầu có bán trục bằng f tại đầu mút), hệ trục Oxyz (điểm có nhãn khớp một phép chiếu song song với
// toạ độ; trục, đầu mũi tên, chữ x, y, z; hình hộp đủ cạnh, cạnh khuất nét đứt; mặt phẳng tô màu đúng ba đỉnh). Cuối cùng: mức độ, ma
// trận (hai đề cố định và câu riêng đều chia đúng ma trận; rút thử, đã làm hết một đề cố định thì không gặp lại câu của đề đó), câu tự
// luận chỉ ở ô Vận dụng rút 1 câu, đúng/sai 4 ý không lặp kiểu Đ/S, đáp án đúng không dài hơn hẳn lựa chọn sai và không hay là lựa chọn
// dài nhất hay ngắn nhất, không lặp chữ của nhãn chủ đề, chữ trong hình vừa khung và không đè nhau, dò lộ đáp án giữa mọi cặp câu (đề
// “Ôn chủ đề” rút chung cả chủ đề) và với lời dặn, đề bài không gần trùng câu của kho cuối kì I cùng file, và nếu có ../OnUp-Book thì so
// mọi trường chữ với chữ OCR của mọi cuốn (không chuỗi 8 từ nào trùng; đa thức trong đề không là hàm của ví dụ, bài tập trong sách Toán
// 12) và với câu của mọi kho khác.
// Chạy: node tests/toan12-gk2.js → in MATH OK. DO_LO=1: in đáp án bằng chữ có ở câu rút được cùng lúc; DO_SACH=1: in chuỗi 6 từ trùng
// chữ OCR của sách; DO_KHO=1: chuỗi 6 từ trùng câu của kho khác.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan12-gk2-ngau-nhien";

/* ---------- số hữu tỉ chính xác { n, d } (như tests/toan12-ck1.js); số thực khi có căn, π, e, ln ---------- */
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const F = (n, d) => { d = d === undefined ? 1 : d; assert.ok(Number.isInteger(n) && Number.isInteger(d) && d !== 0, `phân số lạ ${n}/${d}`); if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return { n: n / g, d: d / g }; };
const isR = (v) => typeof v === "object";
const toNum = (v) => (isR(v) ? v.n / v.d : v);
const both = (a, b, fr_, fl) => (isR(a) && isR(b) ? fr_(a, b) : fl(toNum(a), toNum(b)));
const add = (a, b) => both(a, b, (a, b) => F(a.n * b.d + b.n * a.d, a.d * b.d), (x, y) => x + y);
const neg = (a) => (isR(a) ? F(-a.n, a.d) : -a);
const sub = (a, b) => add(a, neg(b));
const mul = (a, b) => both(a, b, (a, b) => F(a.n * b.n, a.d * b.d), (x, y) => x * y);
const div = (a, b) => { assert.ok(toNum(b) !== 0, "chia cho 0"); return both(a, b, (a, b) => F(a.n * b.d, a.d * b.n), (x, y) => x / y); };
const isqrt = (n) => { if (n < 0) return null; const r = Math.round(Math.sqrt(n)); return r * r === n ? r : null; };
const sqrt = (a) => { assert.ok(toNum(a) >= 0, "căn bậc hai của số âm"); if (isR(a)) { const p = isqrt(a.n), q = isqrt(a.d); if (p !== null && q !== null) return F(p, q); } return Math.sqrt(toNum(a)); };
const cmp = (a, b) => (isR(a) && isR(b) ? a.n * b.d - b.n * a.d : Math.abs(toNum(a) - toNum(b)) <= 1e-9 * Math.max(1, Math.abs(toNum(a))) ? 0 : toNum(a) - toNum(b));
const eq = (a, b) => cmp(a, b) === 0;
const gan = (a, b) => Math.abs(toNum(a) - toNum(b)) <= 1e-9 * Math.max(1, Math.abs(toNum(a)), Math.abs(toNum(b)));
// đọc một số viết như trong đề: "−3/7", "3", "1 800", "2,35"
const fr = (s) => {
  s = String(s).trim().replace(/[−–]/g, "-").replace(/\s+/g, " ");
  let m = /^(-?\d+)\/(-?\d+)$/.exec(s);
  if (m) return F(+m[1], +m[2]);
  m = /^(-?)(\d{1,3}(?: \d{3})+|\d+)(?:,(\d+))?$/.exec(s);
  if (m) { const ip = m[2].replace(/ /g, ""), fp = m[3] || ""; const v = F(+(ip + fp), 10 ** fp.length); return m[1] ? neg(v) : v; }
  throw new Error("không đọc được số: " + s);
};
const thou = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
// làm tròn x đến k chữ số sau dấu phẩy theo quy tắc của sách (chữ số bỏ đi ≥ 5 thì tăng); số ở sát ranh giới làm tròn thì báo lỗi
const lamTron = (x, k) => {
  const p = 10 ** k, t = Math.abs(toNum(x)) * p;
  if (!isR(x)) assert.ok(Math.abs(t - Math.floor(t) - 0.5) > 1e-4, "số ở sát ranh giới làm tròn: " + toNum(x));
  return Math.sign(toNum(x)) * Math.floor(t + 0.5 + 1e-9) / p;
};
const fmtDec = (x, k) => { const v = lamTron(x, k), s = Math.abs(v).toFixed(k).split("."); return (v < 0 ? "−" : "") + thou(s[0]) + (s[1] ? "," + s[1] : ""); };

/* ---------- bộ đọc hàm số một biến viết như trong đề ----------
   Phép toán + − · / và nhân ngầm (2x, 3cos x, x√x, (9/14)√(…)); số mũ viết bằng chữ nhỏ trên dòng (x³, e²ˣ, 2ˣ, (ln 2)², cos² x);
   √ áp cho số hoặc nhóm đứng ngay sau; |…|; hàm sin, cos, tan, cot, ln áp cho nhóm trong ngoặc hoặc tích ngay sau (ln 3x = ln(3x));
   biến x hoặc t; hằng π, e. Trả về hàm số (số thực → số thực). */
const SUP = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "ˣ": "x", "ᵗ": "t", "⁻": "−", "⁺": "+" };
const FN = { sin: Math.sin, cos: Math.cos, tan: Math.tan, cot: (v) => 1 / Math.tan(v), ln: Math.log };
function hs(src) {
  const s = String(src).replace(/\s+/g, " ").trim().replace(/-/g, "−");
  let i = 0;
  const peek = () => { while (s[i] === " ") i++; return s[i]; };
  const fail = (m) => { throw new Error("không đọc được biểu thức “" + src + "”: " + m + " ở vị trí " + i); };
  const laFn = () => /^(sin|cos|tan|cot|ln)/.exec(s.slice(i));
  const batDau = () => { const c = peek(); return c !== undefined && /[0-9xtπe√(|sclt]/.test(c) && (/[0-9xtπe√(|]/.test(c) || laFn()); };
  const expr = () => { let v = term(); for (;;) { const c = peek(); if (c === "+") { i++; const a = v, b = term(); v = (x) => a(x) + b(x); } else if (c === "−") { i++; const a = v, b = term(); v = (x) => a(x) - b(x); } else return v; } };
  const term = () => { let v = unary(); for (;;) { const c = peek();
    if (c === "·" || c === "×") { i++; const a = v, b = unary(); v = (x) => a(x) * b(x); }
    else if (c === "/") { i++; const a = v, b = unary(); v = (x) => a(x) / b(x); }
    else if (c !== "|" && batDau()) { const a = v, b = unary(); v = (x) => a(x) * b(x); }
    else return v; } };
  const unary = () => { const c = peek(); if (c === "−") { i++; const a = unary(); return (x) => -a(x); } if (c === "+") { i++; return unary(); } return power(); };
  const mu = () => { let t = ""; while (s[i] && SUP[s[i]]) t += SUP[s[i++]]; return t ? hs(t) : null; };
  const power = () => { const b = primary(), e = mu(); return e ? (x) => Math.pow(b(x), e(x)) : b; };
  const nhom = () => { const c = peek(); if (c === "(") return primary(); let v = power(); while (peek() !== "|" && batDau() && !laFn()) { const a = v, b = power(); v = (x) => a(x) * b(x); } return v; };
  const primary = () => {
    const c = peek(), m = /^\d{1,3}(?: \d{3})+(?![\d,])|^\d+(?:,\d+)?/.exec(s.slice(i));
    if (m) { i += m[0].length; const v = +m[0].replace(/ /g, "").replace(",", "."); return () => v; }
    const f = laFn(); if (f) { i += f[1].length; const e = mu(), g = FN[f[1]], a = nhom(); return e ? (x) => Math.pow(g(a(x)), e(x)) : (x) => g(a(x)); }
    if (c === "x" || c === "t") { i++; return (x) => x; }
    if (c === "π") { i++; return () => Math.PI; }
    if (c === "e" && !/^e[a-z]/.test(s.slice(i))) { i++; return () => Math.E; }
    if (c === "(") { i++; const v = expr(); if (peek() !== ")") fail("thiếu )"); i++; return v; }
    if (c === "|") { i++; const v = expr(); if (peek() !== "|") fail("thiếu |"); i++; return (x) => Math.abs(v(x)); }
    if (c === "√") { i++; const v = power(); return (x) => Math.sqrt(v(x)); }
    return fail("kí tự lạ “" + (c || "") + "”");
  };
  const v = expr(); if (peek() !== undefined) fail("thừa “" + s.slice(i) + "”");
  return v;
}
const hang = (s) => hs(s)(0); // biểu thức không có biến: "3 − π", "2 + π", "7/5", "3√2"
const boC = (s) => s.replace(/\s*\+\s*C$/, "");
// F là một nguyên hàm của f trên các điểm xs: đạo hàm số của F bằng f (sai lệch tương đối dưới 1e-6)
const XS = [-2.6, -1.7, -0.9, -0.35, 0.3, 0.8, 1.3, 2.1, 2.9, 3.7];
const laNH = (Fh, f, xs = XS) => xs.every((x) => { const h = 1e-5 * Math.max(1, Math.abs(x)), d = (Fh(x + h) - Fh(x - h)) / (2 * h), y = f(x); return Number.isFinite(d) && Number.isFinite(y) && Math.abs(d - y) <= 1e-6 * Math.max(1, Math.abs(y)); });
const DUONG = [0.4, 0.75, 1.1, 1.6, 2.3, 3.1, 4.2, 5.5]; // điểm trên (0; +∞)
const GIUA = [-1.3, -0.9, -0.4, 0.2, 0.7, 1.2, 1.45];       // điểm trên (−π/2; π/2)
// tích phân xác định: Gauss – Legendre 10 điểm, chia đôi đến khi hai lần tính khớp nhau
const GLx = [0.1488743389816312, 0.4333953941292472, 0.6794095682990244, 0.8650633666889845, 0.9739065285171717];
const GLw = [0.2955242247147529, 0.2692667193099963, 0.2190863625159820, 0.1494513491505806, 0.0666713443086881];
const gl = (f, a, b) => { const c = (a + b) / 2, h = (b - a) / 2; let s = 0; for (let k = 0; k < 5; k++) s += GLw[k] * (f(c - h * GLx[k]) + f(c + h * GLx[k])); return s * h; };
const tpTN = (f, a, b, tot, d = 0) => { const c = (a + b) / 2, l = gl(f, a, c), r = gl(f, c, b); if (Math.abs(l + r - tot) < 1e-13 * Math.max(1, Math.abs(tot)) || d > 40) return l + r; return tpTN(f, a, c, l, d + 1) + tpTN(f, c, b, r, d + 1); };
// chia đoạn ở các chỗ hàm g (thường là biểu thức trong dấu giá trị tuyệt đối) đổi dấu
const nghiemSo = (g, a, b, n = 4000) => { const r = []; let x0 = a, y0 = g(a); for (let k = 1; k <= n; k++) { const x1 = a + (b - a) * k / n, y1 = g(x1); if (y0 === 0 && k > 1) r.push(x0); else if (y0 * y1 < 0) { let lo = x0, hi = x1; for (let j = 0; j < 80; j++) { const m = (lo + hi) / 2; if (g(lo) * g(m) <= 0) hi = m; else lo = m; } r.push((lo + hi) / 2); } x0 = x1; y0 = y1; } return r; };
const tp = (f, a, b, cat = []) => { if (a === b) return 0; if (a > b) return -tp(f, b, a, cat); const m = [a, ...cat.filter((x) => x > a && x < b).sort((p, q) => p - q), b]; let s = 0; for (let k = 1; k < m.length; k++) s += tpTN(f, m[k - 1], m[k], gl(f, m[k - 1], m[k])); return s; };
const tpAbs = (g, a, b) => tp((x) => Math.abs(g(x)), a, b, nghiemSo(g, a, b));
// cận viết bằng chữ nhỏ dưới, trên dòng: "∫₁³", "∫₀²⁰", "∫ₐᵇ"
const SUB = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9", "₋": "−" };
const SUPD = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "−" };
const can = (s, map) => [...s].map((c) => { assert.ok(map[c] !== undefined, "cận lạ: " + s); return map[c]; }).join("");
// công thức trong lựa chọn: "S = ∫₀² (x²/2 + 1)dx", "V = π∫₀¹ e²ˣdx", "S = |∫₀² (x² − 1)dx|", "V = 2π∫₀² (x + 1)dx" → giá trị
const congThuc = (s) => {
  const m = /^[SV] = (\|)?([0-9]*π?²?)∫([₀-₉₋]+)([⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+) ?(.+)d([xt])(\|)?$/.exec(s);
  assert.ok(m && !!m[1] === !!m[7], "không đọc được công thức: " + s);
  const k = m[2] === "" ? 1 : m[2] === "π" ? Math.PI : m[2] === "π²" ? Math.PI ** 2 : /^\d+π$/.test(m[2]) ? +m[2].slice(0, -1) * Math.PI : NaN;
  assert.ok(Number.isFinite(k), "hệ số lạ: " + s);
  const a = toNum(fr(can(m[3], SUB))), b = toNum(fr(can(m[4], SUPD))), g = hs(m[5]);
  const v = k * tp(g, a, b, nghiemSo(g, a, b));
  return m[1] ? Math.abs(v) : v;
};

/* ---------- toạ độ trong không gian: điểm, vectơ (hữu tỉ), mặt phẳng Ax + By + Cz + D = 0, đường thẳng {điểm, vectơ chỉ phương} ---------- */
const vSub = (a, b) => a.map((x, i) => sub(x, b[i]));
const vAdd = (a, b) => a.map((x, i) => add(x, b[i]));
const vScale = (a, k) => a.map((x) => mul(x, k));
const vDot = (a, b) => a.reduce((s, x, i) => add(s, mul(x, b[i])), F(0));
const vCross = (a, b) => [sub(mul(a[1], b[2]), mul(a[2], b[1])), sub(mul(a[2], b[0]), mul(a[0], b[2])), sub(mul(a[0], b[1]), mul(a[1], b[0]))];
const vLen = (a) => sqrt(vDot(a, a));
const vEq = (a, b) => a.every((x, i) => eq(x, b[i]));
const vKhong = (a) => a.every((x) => eq(x, F(0)));
const cungPhuong = (a, b) => vKhong(vCross(a, b)) && !vKhong(a) && !vKhong(b);
const bo3 = (s) => { const m = /^\((.+?); (.+?); (.+?)\)$/.exec(s.trim()); assert.ok(m, "không phải bộ ba số: " + s); return [fr(m[1]), fr(m[2]), fr(m[3])]; };
const diemTrongChu = (s, ten) => { const m = new RegExp("(?:^|[^A-Za-z′])" + ten.replace("′", "′") + "(\\([^()]+\\))").exec(s); assert.ok(m, "không thấy điểm " + ten + " trong “" + s.slice(0, 60) + "…”"); return bo3(m[1]); };
// biểu thức bậc nhất của x, y, z (và t, m nếu cần): "2x − y + 3z − 5", "x/4 + y/3 + z/2", "3 + 2t" → { x, y, z, t, m, c } hữu tỉ
const bacNhat = (s) => {
  const r = { x: F(0), y: F(0), z: F(0), t: F(0), s: F(0), m: F(0), c: F(0) };
  const t = s.replace(/\s+/g, "").replace(/-/g, "−"), re = /([+−]?)(\d+(?:,\d+)?(?:\/\d+)?)?([xyztsm])?(?:\/(\d+))?/gy;
  assert.ok(t.length, "biểu thức trống");
  let k = 0;
  while (k < t.length) {
    re.lastIndex = k; const m = re.exec(t); assert.ok(m && m[0].length && (m[2] || m[3]), "không đọc được biểu thức bậc nhất: " + s);
    if (k > 0) assert.ok(m[1], "thiếu dấu giữa các hạng tử: " + s);
    let v = m[2] ? fr(m[2]) : F(1); if (m[4]) v = div(v, F(+m[4])); if (m[1] === "−") v = neg(v);
    r[m[3] || "c"] = add(r[m[3] || "c"], v); k = re.lastIndex;
  }
  return r;
};
// mặt phẳng: "(P): 2x − y + 3z − 5 = 0", "x/4 + y/3 + z/2 = 1", "y = 0" → [A, B, C, D]
const mp = (s) => { const m = /^(?:\([A-Z]\): )?(.+) = (.+)$/.exec(s.trim()); assert.ok(m, "không phải phương trình mặt phẳng: " + s); const L = bacNhat(m[1]), R = bacNhat(m[2]);
  const v = [sub(L.x, R.x), sub(L.y, R.y), sub(L.z, R.z), sub(R.c, L.c)].map((x, i) => (i === 3 ? neg(x) : x)); assert.ok(!vKhong(v.slice(0, 3)), "mặt phẳng không có biến: " + s); return v; };
const mpTrongChu = (s, ten) => { const m = new RegExp("\\(" + ten + "\\): ([^,.]+? = 0)").exec(s); assert.ok(m, "không thấy mặt phẳng (" + ten + ")"); return mp(m[1]); };
const nMP = (P) => P.slice(0, 3);
const thayMP = (P, M) => add(vDot(nMP(P), M), P[3]);
const thuocMP = (P, M) => eq(thayMP(P, M), F(0));
const kcMP = (M, P) => div(isR(thayMP(P, M)) ? F(Math.abs(thayMP(P, M).n), thayMP(P, M).d) : Math.abs(thayMP(P, M)), vLen(nMP(P)));
const tiLe = (P, Q) => { const i = P.findIndex((x) => !eq(x, F(0))); return div(Q[i], P[i]); }; // Q = k · P nếu cùng phương
const ssMP = (P, Q) => cungPhuong(nMP(P), nMP(Q)) && !eq(Q[3], mul(tiLe(P, Q), P[3]));
const trungMP = (P, Q) => cungPhuong(nMP(P), nMP(Q)) && eq(Q[3], mul(tiLe(P, Q), P[3]));
const vgMP = (P, Q) => eq(vDot(nMP(P), nMP(Q)), F(0));
const mpQua3 = (A, B, C) => { const n = vCross(vSub(B, A), vSub(C, A)); assert.ok(!vKhong(n), "ba điểm thẳng hàng"); return [...n, neg(vDot(n, A))]; };
// đường thẳng: "{x = 2 + 3t; y = −1 − t; z = 4t}" hoặc "(x − 1)/2 = (y + 3)/(−1) = (z − 2)/5" → { P, u }
const dt = (s) => {
  s = s.trim();
  let m = /^\{x = (.+); y = (.+); z = (.+)\}$/.exec(s);
  if (m) { const v = m.slice(1).map(bacNhat), k = ["t", "s"].find((b) => v.some((e) => !eq(e[b], F(0)))); assert.ok(k, "đường thẳng không có tham số: " + s); return { P: v.map((e) => e.c), u: v.map((e) => e[k]) }; }
  m = /^(.+) = (.+) = (.+)$/.exec(s); assert.ok(m, "không phải phương trình đường thẳng: " + s);
  const doc = (p, b) => { const k = new RegExp("^\\(" + b + "( [+−] (\\d+))?\\)/(\\(−?\\d+\\)|\\d+)$|^" + b + "/(\\(−?\\d+\\)|\\d+)$").exec(p.trim()); assert.ok(k, "tỉ số lạ: " + p);
    const c = k[1] ? (k[1].trim()[0] === "+" ? neg(fr(k[2])) : fr(k[2])) : F(0), d = fr((k[3] || k[4]).replace(/[()]/g, "")); return { c, d }; };
  const v = [doc(m[1], "x"), doc(m[2], "y"), doc(m[3], "z")]; return { P: v.map((e) => e.c), u: v.map((e) => e.d) };
};
const thuocDT = (d, M) => cungPhuong(vSub(M, d.P), d.u) || vEq(M, d.P);
const trungDT = (d, e) => cungPhuong(d.u, e.u) && thuocDT(d, e.P);
const viTri = (d, e) => { if (cungPhuong(d.u, e.u)) return thuocDT(d, e.P) ? "Trùng nhau" : "Song song"; return eq(vDot(vSub(e.P, d.P), vCross(d.u, e.u)), F(0)) ? "Cắt nhau" : "Chéo nhau"; };

/* ---------- hình: phần tử SVG (như tests/toan12-ck1.js) ---------- */
const nums = (s) => s.trim().split(/[\s,]+/).map(Number);
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const lines = (svg) => [...svg.matchAll(/<line [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { a: [+a.x1, +a.y1], b: [+a.x2, +a.y2], stroke: a.stroke || "", w: +(a["stroke-width"] || 1), dash: !!a["stroke-dasharray"] }; });
const circles = (svg) => [...svg.matchAll(/<circle [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { c: [+a.cx, +a.cy], r: +a.r }; });
const ellipses = (svg) => [...svg.matchAll(/<ellipse [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { c: [+a.cx, +a.cy], rx: +a.rx, ry: +a.ry }; });
const pts2 = (s) => { const v = nums(s), p = []; for (let i = 0; i < v.length; i += 2) p.push([v[i], v[i + 1]]); return p; };
const polygons = (svg) => [...svg.matchAll(/<polygon [^>]*>/g)].map((m) => pts2(attrs(m[0]).points));
const toMau = (svg) => [...svg.matchAll(/<polygon [^>]*>/g)].map((m) => attrs(m[0])).filter((a) => a.fill === "acc-soft" || a.fill === "ok-soft").map((a) => ({ p: pts2(a.points), fill: a.fill }));
const polylines = (svg) => [...svg.matchAll(/<polyline [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { p: pts2(a.points), stroke: a.stroke || "", dash: !!a["stroke-dasharray"] }; });
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { at: [+a.x, +a.y], t: m[2].replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"), b: a["font-weight"] === "700", it: a["font-style"] === "italic", fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start" }; });
const rong = (t) => (t.b ? 0.62 : 0.55) * t.fs * [...t.t].length; // ước bề rộng chữ (Noto Sans; chữ đậm rộng hơn)
const hopChu = (t) => { const w = rong(t), x0 = t.anchor === "middle" ? t.at[0] - w / 2 : t.anchor === "end" ? t.at[0] - w : t.at[0]; return [x0, t.at[1] - 0.75 * t.fs, x0 + w, t.at[1] + 0.25 * t.fs]; };
const subv = (p, q) => [p[0] - q[0], p[1] - q[1]];
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const cross = (u, v) => u[0] * v[1] - u[1] * v[0];
const dienTich = (p) => Math.abs(p.reduce((s, q, i) => s + cross(q, p[(i + 1) % p.length]), 0)) / 2;
// mọi chữ trong hình cỡ từ 13 trở lên, nằm trọn trong khung, không đè lên nhau
const chuHinh = (svg, ten) => {
  const v = nums(/viewBox="([^"]+)"/.exec(svg)[1]), T = texts(svg);
  T.forEach((t) => { const h = hopChu(t); assert.ok(t.fs >= 13, ten + ": chữ “" + t.t + "” nhỏ hơn cỡ 13"); assert.ok(h[0] >= 0 && h[2] <= v[2] && h[1] >= 0 && h[3] <= v[3], ten + ": chữ “" + t.t + "” tràn khỏi khung hình"); });
  T.forEach((t, i) => T.slice(i + 1).forEach((u) => { const a = hopChu(t), b = hopChu(u); assert.ok(!(a[0] < b[2] - 1 && b[0] < a[2] - 1 && a[1] < b[3] - 1 && b[1] < a[3] - 1), ten + ": chữ “" + t.t + "” đè lên chữ “" + u.t + "”"); }));
};

/* ---------- đồ thị trên lưới ô vuông (như docDoThi của tests/toan12-ck1.js) ----------
   Lưới: các đoạn màu line nét 1 cách đều u; trục: hai đoạn nét 1,5 nằm trên đường lưới; số trên trục hoành ở đúng cột (số âm lệch trái
   3 px; có thể dời 8 px), số trên trục tung ở đúng hàng (bên trái hoặc bên phải trục, có thể dời 9 px); đường cong: polyline màu acc;
   phần tô màu: polygon màu acc-soft. Trả về toạ độ toán học. */
const docDoThi = (svg, ten) => {
  const L = lines(svg), luoi = L.filter((l) => l.stroke === "line" && l.w === 1);
  const gx = [...new Set(luoi.filter((l) => l.a[0] === l.b[0]).map((l) => l.a[0]))].sort((a, b) => a - b);
  const gy = [...new Set(luoi.filter((l) => l.a[1] === l.b[1]).map((l) => l.a[1]))].sort((a, b) => a - b);
  const u = gx[1] - gx[0];
  gx.forEach((x, i) => i && assert.ok(Math.abs(x - gx[i - 1] - u) < 0.15, ten + ": lưới không đều"));
  gy.forEach((y, i) => i && assert.ok(Math.abs(y - gy[i - 1] - u) < 0.15, ten + ": lưới không phải ô vuông"));
  const truc = L.filter((l) => l.w === 1.5 && !l.dash && !l.stroke), ngang = truc.filter((l) => l.a[1] === l.b[1]), doc = truc.filter((l) => l.a[0] === l.b[0]);
  assert.ok(ngang.length === 1 && doc.length === 1, ten + ": cần đúng một trục hoành và một trục tung");
  const X0 = doc[0].a[0], Y0 = ngang[0].a[1];
  assert.ok(gx.some((x) => Math.abs(x - X0) < 0.15) && gy.some((y) => Math.abs(y - Y0) < 0.15), ten + ": trục không nằm trên đường lưới");
  const toM = (p) => [(p[0] - X0) / u, (Y0 - p[1]) / u];
  const xr = [Math.round(toM([gx[0], 0])[0]), Math.round(toM([gx[gx.length - 1], 0])[0])], yr = [Math.round(toM([0, gy[gy.length - 1]])[1]), Math.round(toM([0, gy[0]])[1])];
  const so = texts(svg).filter((t) => /^−?\d+$/.test(t.t)), tx = [], ty = [];
  so.forEach((t) => {
    const v = +t.t.replace("−", "-");
    const okX = t.anchor === "middle" && [0, 8, -8].some((d) => Math.abs(t.at[0] - (X0 + v * u - (v < 0 ? 3 : 0) + d)) < 0.6) && [16, -6].some((d) => Math.abs(t.at[1] - (Y0 + d)) < 0.6);
    const okY = [0, 9, -9].some((d) => Math.abs(t.at[1] - (Y0 - v * u + 4.5 + d)) < 0.6) && ((t.anchor === "end" && Math.abs(t.at[0] - (X0 - 5)) < 0.6) || (t.anchor === "start" && Math.abs(t.at[0] - (X0 + 5)) < 0.6));
    assert.ok(okX || okY, ten + ": số " + t.t + " không đứng đúng chỗ trên trục");
    (okX ? tx : ty).push(v);
  });
  assert.ok(tx.length >= 3 && ty.length >= 3, ten + ": mỗi trục cần ghi ít nhất ba số");
  const cong = polylines(svg).filter((p) => p.stroke === "acc" && !p.dash);
  assert.ok(cong.length >= 1, ten + ": không có đường cong");
  // số ghi trên trục không bị đường cong đè
  so.forEach((t) => { const [x0, y0, x1, y1] = hopChu(t), trong = (z) => z[0] > x0 + 0.5 && z[0] < x1 - 0.5 && z[1] > y0 + 0.5 && z[1] < y1 - 0.5;
    cong.forEach((p) => p.p.forEach((q, i) => { if (i) for (let k = 0; k <= 10; k++) assert.ok(!trong([p.p[i - 1][0] + (q[0] - p.p[i - 1][0]) * k / 10, p.p[i - 1][1] + (q[1] - p.p[i - 1][1]) * k / 10]), ten + ": đường cong đè lên số " + t.t); })); });
  return { u, xr, yr, toM, curves: cong.map((p) => p.p.map(toM)), to: toMau(svg).map((g) => g.p.map(toM)) };
};
// mọi điểm của đường cong thuộc đồ thị hàm số f (sai lệch dưới 0,02 đơn vị) và đồ thị được vẽ đủ trong khung
const khopCong = (g, c, f) => {
  const d = 0.15 / g.u;
  if (!c.every(([x, y]) => Math.abs(f(x) - y) < 0.02 || (f(x - d) - y) * (f(x + d) - y) <= 0)) return false;
  for (let x = g.xr[0]; x <= g.xr[1] + 1e-9; x += 0.05) { const y = f(x); if (!Number.isFinite(y) || y < g.yr[0] + 0.05 || y > g.yr[1] - 0.05) continue;
    if (!c.some((p, i) => i && Math.min(p[0], c[i - 1][0]) - 1e-9 <= x && x <= Math.max(p[0], c[i - 1][0]) + 1e-9)) return false; }
  return true;
};
// mỗi hàm số trong fs có đúng một đường cong khớp, không thừa đường cong nào
const khopDoThi = (g, fs, ten) => { const dung = fs.map((f) => g.curves.filter((c) => khopCong(g, c, f)).length);
  assert.deepEqual(dung, fs.map(() => 1), ten + ": đường cong không khớp hàm số"); assert.equal(g.curves.length, fs.length, ten + ": thừa đường cong"); };
// phần tô màu: đỉnh nào cũng nằm trên một đồ thị trong fs hoặc trên trục hoành; trả về cận [a; b] (đọc trên hình) và diện tích đo được
const kiemTo = (g, fs, ten) => {
  assert.ok(g.to.length >= 1, ten + ": không có phần tô màu");
  g.to.forEach((p) => p.forEach(([x, y]) => assert.ok(Math.abs(y) < 0.01 || fs.some((f) => Math.abs(f(x) - y) < 0.01), ten + ": đỉnh (" + x.toFixed(2) + "; " + y.toFixed(2) + ") của phần tô màu không nằm trên đồ thị hay trục hoành")));
  const xs = g.to.flat().map((q) => q[0]), a = Math.round(Math.min(...xs) * 1000) / 1000, b = Math.round(Math.max(...xs) * 1000) / 1000;
  return { a, b, S: g.to.reduce((s, p) => s + dienTich(p), 0) };
};

/* ---------- khối tròn xoay: trục Ox, Oy (nét 1,5), số trên trục hoành cho đơn vị u, đường sinh y = f(x) (polyline acc), đường đối xứng
   y = −f(x) (polyline muted nét đứt), elip ở đầu mút (tâm trên trục Ox, bán trục ry = f(x)·u) ---------- */
const docKhoi = (svg, f, a, b, ten) => {
  const tr = lines(svg).filter((l) => l.w === 1.5 && !l.stroke), ox = tr.filter((l) => l.a[1] === l.b[1]), oy = tr.filter((l) => l.a[0] === l.b[0]);
  assert.ok(ox.length === 1 && oy.length === 1, ten + ": cần đúng một trục Ox, một trục Oy");
  const X0 = oy[0].a[0], Y0 = ox[0].a[1], so = texts(svg).filter((t) => /^−?\d+$/.test(t.t) && Math.abs(t.at[1] - (Y0 + 16)) < 0.6);
  assert.ok(so.length >= 2, ten + ": trục Ox cần ghi ít nhất hai số");
  const us = so.map((t) => { const v = +t.t.replace("−", "-"); return (t.at[0] + (v < 0 ? 3 : 0) - X0) / v; }), u = us[0];
  assert.ok(us.every((w) => Math.abs(w - u) < 0.05), ten + ": các số trên trục Ox không cách đều");
  const toM = (p) => [(p[0] - X0) / u, (Y0 - p[1]) / u], P = polylines(svg);
  const sinh = P.filter((p) => p.stroke === "acc" && !p.dash).map((p) => p.p.map(toM)), doiXung = P.filter((p) => p.stroke === "muted" && p.dash).map((p) => p.p.map(toM));
  assert.ok(sinh.length === 1 && doiXung.length === 1, ten + ": cần một đường sinh và một đường đối xứng nét đứt");
  // toạ độ trong hình làm tròn 0,1 px: ở chỗ dốc (gần x = 0 của y = √(3x)), so cả hai điểm cách x một chút
  const d = 0.15 / u, tren = (g, x, y) => Math.abs(g(x) - y) < 0.02 || (g(Math.max(a, x - d)) - y) * (g(Math.min(b, x + d)) - y) <= 0;
  sinh[0].forEach(([x, y]) => assert.ok(x >= a - 1e-3 && x <= b + 1e-3 && tren(f, x, y), ten + ": đường sinh lệch đồ thị tại x = " + x.toFixed(2)));
  doiXung[0].forEach(([x, y]) => assert.ok(x >= a - 1e-3 && x <= b + 1e-3 && tren((v) => -f(v), x, y), ten + ": đường đối xứng lệch tại x = " + x.toFixed(2)));
  [sinh[0], doiXung[0]].forEach((c) => assert.ok(Math.abs(c[0][0] - a) < 1e-3 && Math.abs(c[c.length - 1][0] - b) < 1e-3, ten + ": đường sinh phải đi từ x = " + a + " đến x = " + b));
  const E = ellipses(svg).map((e) => ({ x: toM(e.c)[0], y: toM(e.c)[1], ry: e.ry / u }));
  E.forEach((e) => assert.ok(Math.abs(e.y) < 1e-3 && [a, b].some((x) => Math.abs(e.x - x) < 1e-3) && Math.abs(e.ry - f(e.x)) < 0.02, ten + ": elip ở đầu mút không khớp"));
  toMau(svg).forEach((g) => g.p.map(toM).forEach(([x, y]) => assert.ok(Math.abs(y) < 0.01 || tren(f, x, y), ten + ": phần tô màu lệch đường sinh")));
  return { u, E };
};

/* ---------- hình trong hệ trục Oxyz ----------
   Điểm có nhãn: chấm tròn nhỏ (r ≤ 4) và chữ đậm một chữ cái hoa (có thể có dấu ′) cạnh chấm. Toạ độ của các điểm có nhãn phải khớp một
   phép chiếu song song: vị trí = O + x·ex + y·ey + z·ez (bình phương tối thiểu, sai lệch dưới 0,5 px). Trục: đoạn nét 1,2 nằm trên tia
   O + k·e (k ≥ 0), hướng ra ngoài, có đầu mũi tên và chữ x, y, z ở đầu trục. */
const diem = (svg, ten) => {
  const ch = circles(svg).filter((c) => c.r <= 4), o = {};
  texts(svg).filter((t) => t.b && /^[A-Z]′?$/.test(t.t)).forEach((t) => {
    const p = ch.slice().sort((u, v) => dist(u.c, t.at) - dist(v.c, t.at))[0];
    assert.ok(p && dist(p.c, t.at) < 30, ten + ": nhãn " + t.t + " phải đặt cạnh một điểm");
    assert.ok(!o[t.t], ten + ": hai nhãn " + t.t); o[t.t] = p.c;
  });
  assert.equal(new Set(Object.values(o).map(String)).size, Object.keys(o).length, ten + ": mỗi điểm một nhãn");
  return o;
};
const giai4 = (A, y) => { const n = A[0].length, M = A.map((r) => r.slice()), N = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => M.reduce((s, r) => s + r[i] * r[j], 0))), v = Array.from({ length: n }, (_, i) => M.reduce((s, r, k) => s + r[i] * y[k], 0));
  for (let i = 0; i < n; i++) { let p = i; for (let k = i + 1; k < n; k++) if (Math.abs(N[k][i]) > Math.abs(N[p][i])) p = k; [N[i], N[p]] = [N[p], N[i]]; [v[i], v[p]] = [v[p], v[i]]; assert.ok(Math.abs(N[i][i]) > 1e-9, "các điểm không đủ để xác định phép chiếu");
    for (let k = 0; k < n; k++) if (k !== i) { const r = N[k][i] / N[i][i]; for (let j = i; j < n; j++) N[k][j] -= r * N[i][j]; v[k] -= r * v[i]; } }
  return v.map((x, i) => x / N[i][i]); };
// them: các điểm không có nhãn mà biết toạ độ (chân cột…), [{ v: [x, y, z], p: [px, py] }]
const kiemChieu = (svg, toaDo, ten, them = []) => {
  const D = diem(svg, ten), ks = Object.keys(toaDo);
  assert.deepEqual(Object.keys(D).sort(), ks.slice().sort(), ten + ": nhãn các điểm");
  const A = ks.map((k) => [1, ...toaDo[k].map(toNum)]).concat(them.map((t) => [1, ...t.v.map(toNum)])), cx = giai4(A, ks.map((k) => D[k][0]).concat(them.map((t) => t.p[0]))), cy = giai4(A, ks.map((k) => D[k][1]).concat(them.map((t) => t.p[1])));
  const chieu = (v) => [cx[0] + cx[1] * v[0] + cx[2] * v[1] + cx[3] * v[2], cy[0] + cy[1] * v[0] + cy[2] * v[1] + cy[3] * v[2]];
  ks.forEach((k) => assert.ok(dist(chieu(toaDo[k].map(toNum)), D[k]) < 0.5, ten + ": điểm " + k + " không khớp toạ độ " + toaDo[k].map(toNum).join("; ")));
  them.forEach((t) => assert.ok(dist(chieu(t.v.map(toNum)), t.p) < 0.5, ten + ": điểm (" + t.v.map(toNum).join("; ") + ") không khớp hình"));
  const O = [cx[0], cy[0]], e = [[cx[1], cy[1]], [cx[2], cy[2]], [cx[3], cy[3]]];
  // trục: mỗi trục một đoạn nét 1,2 trên tia O + k·e, có đầu mũi tên và chữ ở đầu trục
  const tr = lines(svg).filter((l) => l.w === 1.2), T = texts(svg).filter((t) => t.it);
  ["x", "y", "z"].forEach((n, i) => {
    const tren = (p) => { const w = subv(p, O); return Math.abs(cross(e[i], w)) / Math.hypot(...e[i]) < 0.4 && w[0] * e[i][0] + w[1] * e[i][1] >= -0.4; };
    const l = tr.filter((l) => tren(l.a) && tren(l.b) && dist(l.b, O) > dist(l.a, O));
    assert.equal(l.length, 1, ten + ": cần đúng một trục O" + n + " nằm trên tia O" + n);
    const tip = polygons(svg).map((g) => g[0]).find((q) => dist(q, l[0].b) < 12 && dist(q, O) > dist(l[0].b, O));
    assert.ok(tip, ten + ": trục O" + n + " cần đầu mũi tên"); assert.ok(T.some((t) => t.t === n && dist(t.at, tip) < 22), ten + ": thiếu chữ " + n + " ở đầu trục");
  });
  return { D, chieu };
};
// các cạnh vẽ trong hình: { thay: ["A-B"…], khuat: […] }; cạnh nối đúng hai điểm có nhãn
const canhHinh = (svg, D) => {
  const r = { thay: [], khuat: [] };
  lines(svg).filter((l) => l.w >= 1.5 && l.w !== 1.2).forEach((l) => {
    const a = Object.keys(D).find((k) => dist(D[k], l.a) < 0.3), b = Object.keys(D).find((k) => dist(D[k], l.b) < 0.3);
    if (a && b) (l.dash ? r.khuat : r.thay).push([a, b].sort().join("-"));
  });
  return r;
};

/* ---------- lựa chọn, mệnh đề ---------- */
// mọi lựa chọn đúng dạng re; đúng một lựa chọn thoả f
const theo = (q, re, f) => { q.o.forEach((o) => assert.ok(re.test(o), "lựa chọn lạ: " + o)); const m = q.o.filter((o) => f(re.exec(o))); assert.equal(m.length, 1, "cần đúng một lựa chọn đúng, có " + m.length + (m.length ? ": " + m.join(" | ") : "")); return m[0]; };
const theoSo = (q, v) => theo(q, /^(.+)$/, (k) => gan(hang(k[1]), v));
const hamDe = (q, re) => { const m = re.exec(q.q); assert.ok(m, "đề thiếu " + re); return hs(m[1]); };
const so = (q, re) => { const m = re.exec(q.q); assert.ok(m, "đề thiếu " + re); return toNum(fr(m[1])); };
const essayCheck = (q, rb, xx) => { const r = q.rubric.map((c) => c.c).join(" | "); rb.forEach((s) => assert.ok(r.includes(s), "thang chấm thiếu " + s)); xx.forEach((s) => assert.ok(q.x.includes(s), "lời giải thiếu " + s)); };
const tfTheo = (q, f) => q.o.map((s) => f(s));
// mệnh đề về nguyên hàm của f
const menhDeNH = (f, xs = XS) => (s) => {
  let m;
  if ((m = /^∫f\(x\)dx = (.+) \+ C$/.exec(s))) return laNH(hs(m[1]), f, xs);
  if ((m = /^Hàm số F\(x\) = (.+) là một nguyên hàm của f\(x\)$/.exec(s))) return laNH(hs(m[1]), f, xs);
  if ((m = /^Nguyên hàm F\(x\) của f\(x\) thoả mãn F\((.+)\) = (.+) là F\(x\) = (.+)$/.exec(s))) { const G = hs(m[3]); return laNH(G, f, xs) && gan(G(hang(m[1])), hang(m[2])); }
  if ((m = /^Nguyên hàm F\(x\) của f\(x\) thoả mãn F\((.+)\) = (.+) có F\((.+)\) = (.+)$/.exec(s))) return gan(hang(m[2]) + tp(f, hang(m[1]), hang(m[3])), hang(m[4]));
  if ((m = /^Hai hàm số (.+) và (.+) đều là nguyên hàm của f\(x\)$/.exec(s))) return laNH(hs(m[1]), f, xs) && laNH(hs(m[2]), f, xs);
  throw new Error("mệnh đề lạ: " + s);
};
// mệnh đề về tích phân của f
const menhDeTP = (f) => (s) => {
  let m;
  if ((m = /^∫([₀-₉]+)([⁰¹²³⁴⁵⁶⁷⁸⁹]+) f\(x\)dx = ∫([₀-₉]+)([⁰¹²³⁴⁵⁶⁷⁸⁹]+) \|f\(x\)\|dx$/.exec(s))) { const a = toNum(fr(can(m[1], SUB))), b = toNum(fr(can(m[2], SUPD))); assert.ok(m[1] === m[3] && m[2] === m[4], "hai cận khác nhau"); return gan(tp(f, a, b), tpAbs(f, a, b)); }
  if ((m = /^∫([₀-₉]+)([⁰¹²³⁴⁵⁶⁷⁸⁹]+) f\(x\)dx = (.+)$/.exec(s))) return gan(tp(f, toNum(fr(can(m[1], SUB))), toNum(fr(can(m[2], SUPD)))), toNum(fr(m[3])));
  if ((m = /^Tích phân từ (.+) đến (.+) của hàm số \|f\(x\)\| bằng (.+)$/.exec(s))) return gan(tpAbs(f, hang(m[1]), hang(m[2])), toNum(fr(m[3])));
  throw new Error("mệnh đề lạ: " + s);
};
// mệnh đề về mặt phẳng; ctx: các mặt phẳng có tên { P, Q }
const O3 = [F(0), F(0), F(0)];
const menhDeMP = (ctx) => (s) => {
  let m;
  if ((m = /^Điểm [A-Z]′?(\(.+\)) thuộc \(([A-Z])\)$/.exec(s))) return thuocMP(ctx[m[2]], bo3(m[1]));
  if ((m = /^Vectơ n = (\(.+\)) là một vectơ pháp tuyến của \(([A-Z])\)$/.exec(s))) return cungPhuong(bo3(m[1]), nMP(ctx[m[2]]));
  if ((m = /^Khoảng cách từ gốc toạ độ O đến \(([A-Z])\) bằng (.+)$/.exec(s))) return eq(kcMP(O3, ctx[m[1]]), fr(m[2]));
  if ((m = /^Khoảng cách từ điểm [A-Z](\(.+\)) đến \(([A-Z])\) bằng (.+)$/.exec(s))) return eq(kcMP(bo3(m[1]), ctx[m[2]]), fr(m[3]));
  if ((m = /^Mặt phẳng \(([A-Z])\): (.+ = 0) song song với \(([A-Z])\)$/.exec(s))) return ssMP(ctx[m[3]], mp(m[2]));
  if ((m = /^Mặt phẳng \(([A-Z])\) vuông góc với mặt phẳng \(([A-Z])\)$/.exec(s))) return vgMP(ctx[m[1]], ctx[m[2]]);
  if ((m = /^Mặt phẳng đi qua gốc toạ độ và song song với \(([A-Z])\) có phương trình (.+ = 0)$/.exec(s))) { const R = mp(m[2]); return thuocMP(R, O3) && ssMP(ctx[m[1]], R); }
  throw new Error("mệnh đề lạ: " + s);
};
const menhDeDT = (d) => (s) => {
  let m;
  if ((m = /^Đường thẳng d đi qua điểm [A-Z](\(.+\))$/.exec(s))) return thuocDT(d, bo3(m[1]));
  if ((m = /^Vectơ u = (\(.+\)) là một vectơ chỉ phương của d$/.exec(s))) return cungPhuong(bo3(m[1]), d.u);
  if ((m = /^Điểm [A-Z](\(.+\)) thuộc d$/.exec(s))) return thuocDT(d, bo3(m[1]));
  if ((m = /^Đường thẳng d có phương trình chính tắc (.+)$/.exec(s))) return trungDT(d, dt(m[1]));
  throw new Error("mệnh đề lạ: " + s);
};
// "∫ₐᵇ (…)dx" trong đề → giá trị; "Tích phân từ a đến b của hàm số f(x) = …"
const tpDe = (q) => { const m = /∫([₀-₉]+)([⁰¹²³⁴⁵⁶⁷⁸⁹]+) \((.+)\)dx/.exec(q.q); assert.ok(m, "đề thiếu tích phân"); const g = hs(m[3]); return tp(g, toNum(fr(can(m[1], SUB))), toNum(fr(can(m[2], SUPD))), nghiemSo(g, toNum(fr(can(m[1], SUB))), toNum(fr(can(m[2], SUPD))))); };
const tpChu = (q) => { const m = /Tích phân từ (.+) đến (.+) của hàm số f\(x\) = (.+) bằng$/.exec(q.q); assert.ok(m, "đề thiếu tích phân"); return tp(hs(m[3]), hang(m[1]), hang(m[2])); };
const ptDe = (q, ten) => diemTrongChu(q.q, ten);
const PT = /^(.+ = .+)$/;

/* ---------- kiểm tra từng câu ---------- */
const hinhDaDoc = new Set();
const doc = (q, ham, ...a) => { hinhDaDoc.add(q.svg); return ham(q.svg, ...a); };
const CHECKS = [
  // Bài 11. Nguyên hàm
  { has: "là một nguyên hàm của hàm số f(x) = 4x³ − 6x trên ℝ?", right: (q) => { const f = hamDe(q, /f\(x\) = (.+) trên ℝ\?/); return theo(q, /^F\(x\) = (.+)$/, (k) => laNH(hs(k[1]), f)); } },
  { has: "∫(cos x + 2)dx bằng", right: (q) => { const f = hamDe(q, /^∫\((.+)\)dx bằng$/); return theo(q, /^(.+) \+ C$/, (k) => laNH(hs(k[1]), f)); } },
  { has: "Trên khoảng (0; +∞), ∫(3/x)dx bằng", right: (q) => { const f = hamDe(q, /∫\((.+)\)dx bằng$/); return theo(q, /^(.+) \+ C$/, (k) => laNH(hs(k[1]), f, DUONG)); } },
  { has: "∫(eˣ − 1)dx bằng", right: (q) => { const f = hamDe(q, /^∫\((.+)\)dx bằng$/); return theo(q, /^(.+) \+ C$/, (k) => laNH(hs(k[1]), f)); } },
  { has: "∫(2x + 1)²dx bằng", right: (q) => { const f = hamDe(q, /^∫(.+)dx bằng$/); return theo(q, /^(.+) \+ C$/, (k) => laNH(hs(k[1]), f)); } },
  { has: "Trên khoảng (−π/2; π/2), ∫(2/cos² x)dx bằng", right: (q) => { const f = hamDe(q, /∫\((.+)\)dx bằng$/); return theo(q, /^(.+) \+ C$/, (k) => laNH(hs(k[1]), f, GIUA)); } },
  { has: "họ nguyên hàm của hàm số f(x) = (x² − 9)/x là", right: (q) => { const f = hamDe(q, /f\(x\) = (.+) là$/); return theo(q, /^(.+) \+ C$/, (k) => laNH(hs(k[1]), f, DUONG)); } },
  { has: "Cho F(x) = x³ − 2x² + 7 là một nguyên hàm", right: (q) => { const G = hamDe(q, /F\(x\) = (.+) là một/), x = so(q, /Tính f\((\d+)\)/), h = 1e-4; return (-G(x + 2 * h) + 8 * G(x + h) - 8 * G(x - h) + G(x - 2 * h)) / (12 * h); } },
  { has: "và F(1) = 5. Tính F(2).", right: (q) => { const f = hamDe(q, /f\(x\) = (.+) trên ℝ và/); return so(q, /F\(1\) = (\d+)/) + tp(f, 1, 2); } },
  { has: "và F(0) = 4. Tính F(1) (làm tròn", right: (q) => { const f = hamDe(q, /f\(x\) = (.+) trên ℝ và/); return so(q, /F\(0\) = (\d+)/) + tp(f, 0, 1); } },
  { has: "Cho hàm số f(x) = 3x² + 2sin x. Mỗi ý sau đúng hay sai?", right: (q) => tfTheo(q, menhDeNH(hamDe(q, /f\(x\) = (.+)\. Mỗi/))) },
  { has: "Cho hàm số f(x) = 2ˣ + 6x². Mỗi ý sau đúng hay sai?", right: (q) => tfTheo(q, menhDeNH(hamDe(q, /f\(x\) = (.+)\. Mỗi/))) },
  { has: "mực nước dâng lên với tốc độ", right: (q) => so(q, /mực nước cao (\d+) cm/) + tp(hamDe(q, /h′\(t\) = (.+) \(cm\/phút\)/), 0, so(q, /sau (\d+) phút, mực/)) },
  { has: "Một cây giống cao", right: (q) => so(q, /cao (\d+) cm khi/) + tp(hamDe(q, /h′\(t\) = (.+) \(cm\/tuần\)/), 0, so(q, /sau (\d+) tuần\.$/)) },
  { has: "Vận tốc của vật tại thời điểm t = 4 là", right: (q) => { const v = so(q, /vận tốc của vật là (\d+) m\/s/) + tp(hamDe(q, /a\(t\) = (.+) \(m\/s²\)/), 0, so(q, /thời điểm t = (\d+) là$/)); return theo(q, /^(.+) m\/s$/, (k) => gan(hang(k[1]), v)); } },
  // Bài 12. Tích phân
  { has: "∫₁³ (2x + 1)dx bằng", right: (q) => theoSo(q, tpDe(q)) },
  { has: "Giá trị của ∫₀⁵ [2f(x) − g(x)]dx bằng", right: (q) => { const a = so(q, /∫₀⁵ f\(x\)dx = (\S+) và/), b = so(q, /∫₀⁵ g\(x\)dx = (\S+)\. Giá/), m = /\[(\d*)f\(x\) ([+−]) (\d*)g\(x\)\]/.exec(q.q); return theoSo(q, (+m[1] || 1) * a + (m[2] === "+" ? 1 : -1) * (+m[3] || 1) * b); } },
  { has: "Tích phân từ 0 đến π/2 của hàm số f(x) = 3cos x − 2 bằng", right: (q) => theoSo(q, tpChu(q)) },
  { has: "Tích phân từ 0 đến π của hàm số f(x) = sin x + 3 bằng", right: (q) => theoSo(q, tpChu(q)) },
  { has: "Cho hàm số f(x) = 3x² − 4x − 1. Mỗi ý sau đúng hay sai?", right: (q) => tfTheo(q, menhDeTP(hamDe(q, /f\(x\) = (.+)\. Mỗi/))) },
  { has: "Cho hàm số f(x) = 2x − 4. Mỗi ý sau đúng hay sai?", right: (q) => tfTheo(q, menhDeTP(hamDe(q, /f\(x\) = (.+)\. Mỗi/))) },
  { has: "Biết F(x) = x³ − 2x là một nguyên hàm", right: (q) => { const G = hamDe(q, /F\(x\) = (.+) là một/); return theoSo(q, G(2) - G(1)); } },
  { has: "Biết ∫₁³ f(x)dx = 5 và ∫₃⁷ f(x)dx = −2", right: (q) => theoSo(q, so(q, /∫₁³ f\(x\)dx = (\S+) và/) + so(q, /∫₃⁷ f\(x\)dx = (\S+)\. Giá/)) },
  { has: "Biết ∫₀³ f(x)dx = 7. Giá trị của ∫₀³ 5f(x)dx bằng", right: (q) => theoSo(q, so(q, /∫₀³ f\(x\)dx = (\d+)\./) * so(q, /∫₀³ (\d+)f\(x\)dx bằng/)) },
  { has: "Giá trị của ∫₁⁴ f′(x)dx bằng", right: (q) => theoSo(q, so(q, /f\(4\) = (\d+) và/) - so(q, /f\(1\) = (\d+),/)) },
  { has: "Tính ∫₁⁴ (3√x − 2)dx.", right: (q) => tpDe(q) },
  { has: "Tính ∫₀¹ (eˣ + 2)dx (làm tròn", right: (q) => tpDe(q) },
  { has: "Tính tổng quãng đường chất điểm đi được trong 4 giây đầu", right: (q) => tpAbs(hamDe(q, /v\(t\) = (.+) \(m\/s\)/), 0, so(q, /từ t = 0 đến t = (\d+)\)/)) },
  { has: "công suất phát điện của một hệ thống pin mặt trời", right: (q) => tp(hamDe(q, /P\(t\) = (.+) \(kW\)/), so(q, /^Từ (\d+) giờ/), so(q, /đến (\d+) giờ, công/)) },
  { has: "Một máy bơm bơm nước vào một bể chứa đang cạn.", essay: (q) => {
    const r = hamDe(q, /r\(t\) = (.+) \(lít\/phút\)/), t1 = so(q, /Trong (\d+) phút đầu/), V = so(q, /chứa được (.+) lít nước/), v0 = tp(r, 0, t1), v1 = Math.round(v0), toc = r(t1), con = V - v1, them = con / toc;
    assert.ok(Math.abs(v0 - v1) < 1e-9 && Number.isInteger(them) && v1 < V, "số liệu phải ra số tròn");
    essayCheck(q, [thou(String(v1)), "r(" + t1 + ") = " + toc, thou(String(con)) + " lít", them + " phút", t1 + " + " + them + " = " + (t1 + them) + " phút"], [thou(String(v1)), thou(String(con)), "Đáp số: " + (t1 + them) + " phút."]); } },
  // Bài 13. Ứng dụng hình học của tích phân
  { has: "Hình vẽ là đồ thị của hàm số y = x²/2 + 1. Diện tích S", right: (q) => { const f = hamDe(q, /hàm số y = (.+)\. Diện tích/), g = doc(q, docDoThi, "diện tích"); khopDoThi(g, [f], "diện tích");
    const t = kiemTo(g, [f], "diện tích"), S = tpAbs(f, t.a, t.b); assert.deepEqual([t.a, t.b], [0, 2], "cận đọc trên hình"); assert.ok(Math.abs(t.S - S) < 0.005 * S, "diện tích phần tô màu " + t.S + " khác " + S);
    return theo(q, /^(.+)$/, (k) => gan(congThuc(k[1]), S)); } },
  { has: "Hình vẽ là đồ thị của hai hàm số y = x² − 2x + 3 và y = x + 3.", right: (q) => { const m = /hai hàm số y = (.+) và y = (.+)\. Diện tích/.exec(q.q), f = hs(m[1]), h = hs(m[2]), g = doc(q, docDoThi, "hai đồ thị"); khopDoThi(g, [f, h], "hai đồ thị");
    const t = kiemTo(g, [f, h], "hai đồ thị"), d = (x) => h(x) - f(x), S = tpAbs(d, t.a, t.b); assert.deepEqual([t.a, t.b], [0, 3], "cận đọc trên hình"); assert.ok(Math.abs(d(t.a)) < 1e-12 && Math.abs(d(t.b)) < 1e-12, "cận phải là hoành độ giao điểm");
    assert.ok(Math.abs(t.S - S) < 0.005 * S, "diện tích phần tô màu " + t.S + " khác " + S); return theo(q, /^(.+)$/, (k) => gan(congThuc(k[1]), S)); } },
  { has: "Hình vẽ là đồ thị của hàm số y = x² − 1. Diện tích S", right: (q) => { const f = hamDe(q, /hàm số y = (.+)\. Diện tích/), g = doc(q, docDoThi, "diện tích hai phần"); khopDoThi(g, [f], "diện tích hai phần");
    const t = kiemTo(g, [f], "diện tích hai phần"), S = tpAbs(f, t.a, t.b); assert.deepEqual([t.a, t.b], [0, 2], "cận đọc trên hình"); assert.ok(g.to.length === 2, "hai phần tô màu: dưới và trên trục hoành");
    assert.ok(Math.abs(t.S - S) < 0.005 * S, "diện tích phần tô màu " + t.S + " khác " + S); return theo(q, /^(.+)$/, (k) => gan(congThuc(k[1]), S)); } },
  { has: "Thể tích V của khối tròn xoay tạo thành khi quay hình phẳng đó quanh trục Ox là", right: (q) => { const f = hamDe(q, /đồ thị hàm số y = (.+), trục hoành/), V = Math.PI * tp((x) => f(x) ** 2, so(q, /đường thẳng x = (\d+), x =/), so(q, /, x = (\d+)\. Thể/)); return theo(q, /^(.+)$/, (k) => gan(congThuc(k[1]), V)); } },
  { has: "thì được thiết diện có diện tích S(x) = 2x", right: (q) => theoSo(q, tp(hamDe(q, /S\(x\) = (.+)\. Thể tích/), so(q, /tại x = (\d+) và x =/), so(q, /và x = (\d+)\. Cắt/))) },
  { has: "cắt vật thể theo một hình tròn bán kính x + 1", right: (q) => { const r = hamDe(q, /bán kính (.+)\. Thể tích/), V = Math.PI * tp((x) => r(x) ** 2, so(q, /tại x = (\d+) và x =/), so(q, /và x = (\d+)\. Mọi/)); return theo(q, /^(.+)$/, (k) => gan(congThuc(k[1]), V)); } },
  { has: "giới hạn bởi đồ thị hàm số y = x² − 5x + 4 và trục hoành", right: (q) => { const f = hamDe(q, /hàm số y = (.+) và trục hoành/), r = nghiemSo(f, -10, 10); assert.equal(r.length, 2); return tpAbs(f, r[0], r[1]); } },
  { has: "giới hạn bởi đồ thị hàm số y = x³ − 4x và trục hoành", right: (q) => { const f = hamDe(q, /hàm số y = (.+) và trục hoành/), r = nghiemSo(f, -10, 10.1); assert.equal(r.length, 3); return theoSo(q, tpAbs(f, r[0], r[2])); } },
  { has: "giới hạn bởi đồ thị hàm số y = x² − 2x và đường thẳng y = 2x", right: (q) => { const m = /hàm số y = (.+) và đường thẳng y = (.+)\.$/.exec(q.q), f = hs(m[1]), h = hs(m[2]), d = (x) => h(x) - f(x), r = nghiemSo(d, -10, 10.1); assert.equal(r.length, 2); return tpAbs(d, r[0], r[1]); } },
  { has: "Mặt trước của một cổng chào", right: (q) => { const w = so(q, /chân cổng rộng (\d+) m/), h = so(q, /đỉnh parabol cao (\d+) m/), [a, b] = /lối đi hình chữ nhật rộng (\d+) m, cao (\d+) m/.exec(q.q).slice(1).map(Number);
    const p = (x) => h - (4 * h / (w * w)) * x * x; assert.ok(Math.abs(p(w / 2)) < 1e-12 && p(a / 2) >= b, "lối đi phải nằm trong cổng"); return tp(p, -w / 2, w / 2) - a * b; } },
  { has: "Phần đựng nước của một chiếc cốc thuỷ tinh", right: (q) => { const f = hamDe(q, /đồ thị hàm số y = (.+), trục Ox và/), b = so(q, /đường thẳng x = (\d+) \(/); doc(q, docKhoi, f, 0, b, "chiếc cốc"); return Math.PI * tp((x) => f(x) ** 2, 0, b); } },
  { has: "Một thùng gỗ có dạng khối tròn xoay", right: (q) => { const f = hamDe(q, /đồ thị hàm số y = (.+), trục Ox và/), a = so(q, /hai đường thẳng x = (\S+), x =/), b = so(q, /, x = (\d+) \(/); doc(q, docKhoi, f, a, b, "thùng gỗ"); return Math.PI * tp((x) => f(x) ** 2, a, b); } },
  { has: "Một hoạ tiết hình chiếc lá", right: (q) => { const m = /hai đường cong y = (.+) và y = (.+), với 0 ≤ x ≤ (\d+)/.exec(q.q), f = hs(m[1]), h = hs(m[2]), b = +m[3]; assert.ok(Math.abs(f(0) - h(0)) < 1e-12 && Math.abs(f(b) - h(b)) < 1e-12, "hai đường cong cắt nhau ở hai đầu"); return tpAbs((x) => h(x) - f(x), 0, b); } },
  { has: "Một quả bóng bầu dục", right: (q) => { const f = hamDe(q, /đường cong y = (.+) và trục Ox/), m = /với (\S+) ≤ x ≤ (\d+)/.exec(q.q); return Math.PI * tp((x) => f(x) ** 2, toNum(fr(m[1])), +m[2]); } },
  { has: "trục hoành và hai đường thẳng x = 0, x = a bằng 9", right: (q) => { const f = hamDe(q, /đồ thị hàm số y = (.+), trục hoành/), S = so(q, /x = a bằng (\d+)\./); return theo(q, /^a = (.+)$/, (k) => gan(tp(f, 0, hang(k[1])), S)); } },
  // Bài 14. Phương trình mặt phẳng
  { has: "mặt phẳng (P): 3x − 2y + z − 5 = 0 có một vectơ pháp tuyến là", right: (q) => { const P = mpTrongChu(q.q, "P"); return theo(q, /^n = (\(.+\))$/, (k) => cungPhuong(bo3(k[1]), nMP(P))); } },
  { has: "đi qua điểm M(1; −2; 3) và có vectơ pháp tuyến n = (2; 1; −1)", right: (q) => { const M = ptDe(q, "M"), n = bo3(/n = (\(.+?\))/.exec(q.q)[1]); return theo(q, PT, (k) => { const P = mp(k[1]); return thuocMP(P, M) && cungPhuong(nMP(P), n); }); } },
  { has: "mặt phẳng toạ độ (Oxz) có phương trình là", right: (q) => theo(q, PT, (k) => { const P = mp(k[1]); return [[0, 0, 0], [1, 0, 0], [0, 0, 1], [-2, 0, 5]].every((M) => thuocMP(P, M.map((v) => F(v)))); }) },
  { has: "Trong các điểm dưới đây, điểm nằm trên (P) là", right: (q) => { const P = mpTrongChu(q.q, "P"); return theo(q, /^[A-Z](\(.+\))$/, (k) => thuocMP(P, bo3(k[1]))); } },
  { has: "tích có hướng của hai vectơ u = (1; 2; −1) và v = (3; 0; 2) là", right: (q) => { const u = bo3(/u = (\(.+?\))/.exec(q.q)[1]), v = bo3(/v = (\(.+?\))/.exec(q.q)[1]); return theo(q, /^\[u, v\] = (\(.+\))$/, (k) => vEq(bo3(k[1]), vCross(u, v))); } },
  { has: "cho các điểm A(4; 0; 0), B(0; 3; 0), C(0; 0; 2) (hình vẽ)", right: (q) => { const A = ptDe(q, "A"), B = ptDe(q, "B"), C = ptDe(q, "C");
    const h = doc(q, kiemChieu, { O: O3, A, B, C }, "đoạn chắn"), tam = toMau(q.svg); assert.equal(tam.length, 1, "đoạn chắn: một tam giác tô màu");
    assert.ok(tam[0].p.length === 3 && [A, B, C].every((M) => tam[0].p.some((p) => dist(p, h.chieu(M.map(toNum))) < 0.3)), "đoạn chắn: tam giác tô màu phải là ABC");
    const ca = canhHinh(q.svg, h.D); assert.deepEqual(ca.khuat.sort(), ["A-O", "B-O", "C-O"], "đoạn chắn: OA, OB, OC khuất sau mặt phẳng (ABC)");
    return theo(q, PT, (k) => { const P = mp(k[1]); return [A, B, C].every((M) => thuocMP(P, M)); }); } },
  { has: "Trong không gian Oxyz, cho mặt phẳng (P): x − 2y + 2z − 6 = 0. Mỗi ý", right: (q) => tfTheo(q, menhDeMP({ P: mpTrongChu(q.q, "P") })) },
  { has: "cho hai mặt phẳng (P): x − 2y + 2z − 3 = 0 và (Q): 2x + 2y + z + 5 = 0. Mỗi ý", right: (q) => tfTheo(q, menhDeMP({ P: mpTrongChu(q.q, "P"), Q: mpTrongChu(q.q, "Q") })) },
  { has: "tính khoảng cách từ điểm M(3; 1; −2) đến mặt phẳng (P)", right: (q) => kcMP(ptDe(q, "M"), mpTrongChu(q.q.replace(/\.$/, ""), "P")) },
  { has: "Tính khoảng cách giữa (P) và (Q).", right: (q) => { const P = mpTrongChu(q.q, "P"), Q = mpTrongChu(q.q, "Q"); assert.ok(ssMP(P, Q), "(P) và (Q) phải song song"); const A = [div(neg(P[3]), P[0]), F(0), F(0)]; return kcMP(A, Q); } },
  { has: "và song song với mặt phẳng (Q): 2x − y + 2z + 5 = 0", right: (q) => { const M = ptDe(q, "M"), Q = mpTrongChu(q.q, "Q"); assert.ok(!thuocMP(Q, M)); return theo(q, PT, (k) => { const R = mp(k[1]); return thuocMP(R, M) && cungPhuong(nMP(R), nMP(Q)); }); } },
  { has: "để hai mặt phẳng (P): 2x + my − z + 1 = 0 và (Q)", right: (q) => { const P0 = mpTrongChu(q.q.replace("my", "0y"), "P"), Q = mpTrongChu(q.q, "Q"), e = [F(0), F(1), F(0)]; return div(neg(vDot(nMP(P0), nMP(Q))), vDot(e, nMP(Q))); } },
  { has: "Mái che của một nhà để xe", right: (q) => kcMP(ptDe(q, "M"), mpQua3(ptDe(q, "A"), ptDe(q, "B"), ptDe(q, "C"))) },
  { has: "và vuông góc với cả hai mặt phẳng (P): x + 2y − z + 1 = 0", right: (q) => { const M = ptDe(q, "M"), P = mpTrongChu(q.q, "P"), Q = mpTrongChu(q.q, "Q"), n = vCross(nMP(P), nMP(Q)); return theo(q, PT, (k) => { const R = mp(k[1]); return thuocMP(R, M) && cungPhuong(nMP(R), n); }); } },
  { has: "cho hình hộp chữ nhật OABC.O′A′B′C′", right: (q) => {
    const A = ptDe(q, "A"), C = ptDe(q, "C"), O1 = ptDe(q, "O′"), B = vAdd(A, C), A1 = vAdd(A, O1), B1 = vAdd(B, O1), C1 = vAdd(C, O1), D = { O: O3, A, B, C, "O′": O1, "A′": A1, "B′": B1, "C′": C1 };
    const h = doc(q, kiemChieu, D, "hình hộp"), ca = canhHinh(q.svg, h.D), all = [["O", "A"], ["A", "B"], ["B", "C"], ["C", "O"], ["O′", "A′"], ["A′", "B′"], ["B′", "C′"], ["C′", "O′"], ["O", "O′"], ["A", "A′"], ["B", "B′"], ["C", "C′"]].map((e) => e.sort().join("-"));
    assert.deepEqual([...ca.thay, ...ca.khuat].sort(), all.sort(), "hình hộp cần đủ 12 cạnh"); assert.deepEqual(ca.khuat.sort(), all.filter((e) => e.split("-").includes("O")).sort(), "cạnh khuất là ba cạnh đi ra từ O");
    const tam = toMau(q.svg); assert.ok(tam.length === 1 && [A, C, O1].every((M) => tam[0].p.some((p) => dist(p, h.chieu(M.map(toNum))) < 0.3)), "tam giác tô màu phải là ACO′");
    const P = mpQua3(A, C, O1), R = mpQua3(A1, C1, B);
    return tfTheo(q, (s) => { let m;
      if ((m = /^Vectơ n = (\(.+\)) là một vectơ pháp tuyến của mặt phẳng \(ACO′\)$/.exec(s))) return cungPhuong(bo3(m[1]), nMP(P));
      if (/^Điểm B′ thuộc mặt phẳng \(ACO′\)$/.test(s)) return thuocMP(P, B1);
      if ((m = /^Khoảng cách từ B′ đến mặt phẳng \(ACO′\) gấp (\d+) lần khoảng cách từ O đến mặt phẳng đó$/.exec(s))) return gan(toNum(kcMP(B1, P)) / toNum(kcMP(O3, P)), +m[1]);
      if (/^Mặt phẳng \(ACO′\) song song với mặt phẳng \(A′C′B\)$/.test(s)) return ssMP(P, R);
      throw new Error("mệnh đề lạ: " + s); }); } },
  { has: "Tìm số các giá trị nguyên của m để khoảng cách từ A đến (P) không lớn hơn 3.", right: (q) => { const A = ptDe(q, "A"), P0 = mpTrongChu(q.q.replace("+ m = 0", "= 0"), "P"); let n = 0;
    for (let m = -200; m <= 200; m++) { const P = [...nMP(P0), F(m)]; if (toNum(kcMP(A, P)) <= 3 + 1e-12) { assert.ok(Math.abs(m) < 200, "tập giá trị m không bị chặn"); n++; } } return n; } },
  { has: "Mặt phẳng trung trực của đoạn thẳng AB", right: (q) => { const A = ptDe(q, "A"), B = ptDe(q, "B"), I = vScale(vAdd(A, B), F(1, 2)), n = vSub(B, A), k = div(F(1), n[0]); const P = [...vScale(n, k), mul(neg(vDot(n, I)), k)]; return add(add(P[1], P[2]), P[3]); } },
  { has: "và vuông góc với mặt phẳng (Q): x + y + z − 4 = 0", right: (q) => { const A = ptDe(q, "A"), B = ptDe(q, "B"), Q = mpTrongChu(q.q, "Q"); return theo(q, PT, (k) => { const R = mp(k[1]); return thuocMP(R, A) && thuocMP(R, B) && vgMP(R, Q); }); } },
  // Bài 15. Phương trình đường thẳng trong không gian
  { has: "đường thẳng Δ: {x = 2 + 3t; y = −1 − t; z = 4t} có một vectơ chỉ phương là", right: (q) => { const d = dt(/Δ: (\{.+\}) có/.exec(q.q)[1]); return theo(q, /^u = (\(.+\))$/, (k) => cungPhuong(bo3(k[1]), d.u)); } },
  { has: "đi qua điểm nào dưới đây?", right: (q) => { const d = dt(/d: (.+) đi qua điểm nào/.exec(q.q)[1]); return theo(q, /^[A-Z](\(.+\))$/, (k) => thuocDT(d, bo3(k[1]))); } },
  { has: "điểm nào dưới đây thuộc đường thẳng d: {x = 1 − 2t; y = 3t; z = −2 + t}?", right: (q) => { const d = dt(/d: (\{.+\})\?/.exec(q.q)[1]); return theo(q, /^[A-Z](\(.+\))$/, (k) => thuocDT(d, bo3(k[1]))); } },
  { has: "phương trình tham số của đường thẳng đi qua điểm M(1; 0; −2)", right: (q) => { const d = { P: ptDe(q, "M"), u: bo3(/u = (\(.+?\))/.exec(q.q)[1]) }; return theo(q, /^(\{.+\})$/, (k) => trungDT(dt(k[1]), d)); } },
  { has: "đường thẳng đi qua hai điểm A(2; 1; −1) và B(4; −2; 2) có phương trình chính tắc là", right: (q) => { const A = ptDe(q, "A"), B = ptDe(q, "B"), d = { P: A, u: vSub(B, A) }; return theo(q, /^(.+ = .+ = .+)$/, (k) => trungDT(dt(k[1]), d)); } },
  { has: "vuông góc với mặt phẳng (P): 2x − y + 3z − 5 = 0 có một vectơ chỉ phương là", right: (q) => { const P = mpTrongChu(q.q, "P"); return theo(q, /^u = (\(.+\))$/, (k) => cungPhuong(bo3(k[1]), nMP(P))); } },
  { has: "cho đường thẳng d: {x = 2 − t; y = 1 + 2t; z = 3t}. Mỗi ý", right: (q) => tfTheo(q, menhDeDT(dt(/d: (\{.+\})\. Mỗi/.exec(q.q)[1]))) },
  { has: "Vị trí tương đối của d₁ và d₂ là", right: (q) => { const d1 = dt(/d₁: (\{.+?\}) và/.exec(q.q)[1]), d2 = dt(/d₂: (\{.+?\})\. Vị/.exec(q.q)[1]); return theo(q, /^(.+)$/, (k) => k[1] === viTri(d1, d2)); } },
  { has: "cắt mặt phẳng (Oxy) tại điểm M(a; b; 0). Tính a + b.", right: (q) => { const d = dt(/d: (\{.+\}) cắt/.exec(q.q)[1]), t = div(neg(d.P[2]), d.u[2]), M = vAdd(d.P, vScale(d.u, t)); return add(M[0], M[1]); } },
  { has: "Một sợi cáp được căng thẳng từ đỉnh cột", right: (q) => { const A = ptDe(q, "A"), M = ptDe(q, "M"), u = vSub(M, A), t = div(neg(A[2]), u[2]), B = vAdd(A, vScale(u, t)); assert.ok(toNum(t) > 1, "B phải ở sau M trên tia AM");
    // cột: đoạn nét 3 từ chân cột (x, y của A; z = 0) lên A; chân cột cùng các điểm có nhãn xác định phép chiếu (A, M, B thẳng hàng)
    const cot = lines(q.svg).filter((l) => l.w === 3); assert.equal(cot.length, 1, "sợi cáp: cần một cột");
    const chanCot = cot[0].a[1] > cot[0].b[1] ? cot[0].a : cot[0].b, dinhCot = chanCot === cot[0].a ? cot[0].b : cot[0].a;
    const h = doc(q, kiemChieu, { O: O3, A, M, B }, "sợi cáp", [{ v: [A[0], A[1], F(0)], p: chanCot }]);
    assert.ok(dist(dinhCot, h.D.A) < 0.3, "cột phải dựng từ (" + toNum(A[0]) + "; " + toNum(A[1]) + "; 0) lên A");
    const cap = lines(q.svg).filter((l) => l.stroke === "acc"); assert.ok(cap.length === 1 && dist(cap[0].a, h.D.A) < 0.3 && dist(cap[0].b, h.D.B) < 0.3, "sợi cáp vẽ từ A đến B");
    // mặt đất: hình bình hành có một đỉnh ở O, hai cạnh nằm trên Ox, Oy; điểm neo B nằm trong đó
    const nen = toMau(q.svg).filter((g) => g.fill === "ok-soft"), O = h.chieu([0, 0, 0]), ex = subv(h.chieu([1, 0, 0]), O), ey = subv(h.chieu([0, 1, 0]), O);
    assert.ok(nen.length === 1 && nen[0].p.length === 4, "sợi cáp: cần một hình bình hành tô màu cho mặt đất");
    const [p0, p1, p2, p3] = nen[0].p, ss = (w, e) => Math.abs(cross(w, e)) / Math.hypot(...e) < 0.4;
    assert.ok(dist(p0, O) < 0.3 && ss(subv(p1, O), ex) && ss(subv(p3, O), ey) && dist(p2, [p1[0] + p3[0] - O[0], p1[1] + p3[1] - O[1]]) < 0.3, "sợi cáp: mặt đất phải là hình bình hành trên hai trục Ox, Oy");
    const bx = giai4([[ex[0], ey[0]], [ex[1], ey[1]]], subv(h.D.B, O)), lx = giai4([[ex[0], ey[0]], [ex[1], ey[1]]], subv(p2, O));
    assert.ok(bx[0] > 0 && bx[1] > 0 && bx[0] < lx[0] && bx[1] < lx[1], "sợi cáp: điểm neo B phải nằm trên phần mặt đất vẽ trong hình");
    return vLen(vSub(B, A)); } },
  { has: "Một đường dây điện căng thẳng theo đường thẳng d", right: (q) => { const d = dt(/d: (\{.+\})\. Từ/.exec(q.q)[1]), A = ptDe(q, "A"), t = div(vDot(vSub(A, d.P), d.u), vDot(d.u, d.u)), H = vAdd(d.P, vScale(d.u, t)); return vLen(vSub(A, H)); } },
  { has: "Tia laser thứ nhất phát ra từ điểm A(1; 2; 0)", essay: (q) => {
    const A = ptDe(q, "A"), B = ptDe(q, "B"), C = ptDe(q, "C"), D = ptDe(q, "D"), u = vSub(B, A), v = vSub(D, C);
    assert.ok(!cungPhuong(u, v), "hai tia không cùng phương");
    // A + t·u = C + s·v: giải hai phương trình đầu có định thức khác 0, rồi thử phương trình còn lại
    const [i, j] = [[0, 1], [0, 2], [1, 2]].find(([i, j]) => !eq(sub(mul(u[i], neg(v[j])), mul(neg(v[i]), u[j])), F(0)));
    const det = sub(mul(u[i], neg(v[j])), mul(neg(v[i]), u[j])), ri = sub(C[i], A[i]), rj = sub(C[j], A[j]);
    const t = div(sub(mul(ri, neg(v[j])), mul(neg(v[i]), rj)), det), s = div(sub(mul(u[i], rj), mul(ri, u[j])), det), I = vAdd(A, vScale(u, t));
    assert.ok(vEq(I, vAdd(C, vScale(v, s))), "hai đường thẳng phải cắt nhau"); assert.ok(toNum(t) > 0 && toNum(s) > 0, "giao điểm phải nằm trên cả hai tia");
    const ts = (w) => "(" + w.map((x) => (toNum(x) < 0 ? "−" : "") + Math.abs(toNum(x))).join("; ") + ")";
    essayCheck(q, ["vectơ AB = " + ts(u), "vectơ CD = " + ts(v), "t = " + toNum(t), "s = " + toNum(s), "I" + ts(I)], ["I" + ts(I), "t = " + toNum(t), "s = " + toNum(s), "Đáp số: hai tia gặp nhau tại I" + ts(I) + "."]); } },
];

/* ---------- chạy kiểm tra: mỗi câu khớp đúng một mục của CHECKS (mục có chữ has dài nhất nằm trong đề bài) ---------- */
let n = 0;
const dung = new Set();
const run = (id, qs) => qs.forEach((q, i) => {
  const at = id + "#" + (i + 1), cs_ = CHECKS.filter((c) => q.q.includes(c.has)), dai = Math.max(...cs_.map((c) => c.has.length)), ch = cs_.filter((c) => c.has.length === dai);
  assert.equal(ch.length, 1, at + ": cần đúng một mục kiểm tra cho “" + q.q.slice(0, 60) + "…”, có " + ch.length);
  const c = ch[0]; assert.ok(!dung.has(c.has), at + ": hai câu cùng khớp “" + c.has + "”"); dung.add(c.has);
  try {
    if (q.type === "essay") {
      assert.ok(c.essay, "tự luận cần kiểm tra thang chấm"); c.essay(q);
      assert.ok(q.rubric.every((r) => r.p > 0 && Number.isInteger(r.p * 4)) && q.rubric.reduce((s, r) => s + r.p, 0) === 2, "thang chấm 2 điểm, mỗi ý chia hết cho 0,25");
      assert.ok(/^Đáp số: .+$/m.test(q.x), "gợi ý ghi đáp số"); n++; return;
    }
    assert.ok(c.right, "câu chấm tự động cần right");
    const want = c.right(q);
    if (q.type === "num") {
      const a = typeof q.ans === "number" ? q.ans : toNum(fr(q.ans));
      // câu dặn làm tròn: ans là số đã làm tròn theo quy tắc của sách, tol bằng nửa đơn vị làm tròn; câu khác: đáp án chính xác, không tol
      const lt = /\(.*làm tròn kết quả đến hàng (đơn vị|phần mười|phần trăm)\)/.exec(q.q);
      if (lt) {
        const k = { "đơn vị": 0, "phần mười": 1, "phần trăm": 2 }[lt[1]];
        assert.ok(q.tol === 10 ** -k / 2, "tol phải bằng nửa đơn vị làm tròn: " + q.tol);
        assert.ok(Math.abs(a - lamTron(want, k)) < 1e-9, "đáp án " + q.ans + ", tính được " + toNum(want) + " ≈ " + lamTron(want, k));
        assert.ok(Math.abs(a - toNum(want)) <= q.tol, "số chính xác nằm ngoài sai số");
        assert.ok(q.x.includes("≈ " + fmtDec(want, k)), "lời giải ghi “≈ " + fmtDec(want, k) + "”");
      } else {
        assert.ok(Math.abs(a - toNum(want)) <= 1e-9 * Math.max(1, Math.abs(a)), "đáp án " + q.ans + ", tính được " + toNum(want));
        assert.ok(q.tol === undefined, "đáp án tính chính xác, không cần sai số");
      }
      if (typeof q.ans === "string") { const f = fr(q.ans); assert.ok(q.ans === f.n + "/" + f.d && f.d > 1, "đáp án phân số phải tối giản: " + q.ans); }
      assert.ok(typeof q.ans === "string" || Math.abs(q.ans * 100 - Math.round(q.ans * 100)) < 1e-9, "đáp án quá hai chữ số thập phân");
    } else {
      const got = { tf4: () => q.a }[q.type] || (() => q.o[0]);
      assert.strictEqual(JSON.stringify(got()), JSON.stringify(want), "đáp án " + JSON.stringify(got()) + ", tính được " + JSON.stringify(want));
    }
    if (q.type === "mc") {
      assert.ok(!q.o.slice(1).includes(want), "nhiễu trùng đáp án đúng");
      const dai_ = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(!(q.o[0].length > 1.2 * dai_ && q.o[0].length - dai_ > 8), "đáp án đúng dài hơn hẳn lựa chọn sai");
    }
    if (q.type === "tf4") assert.ok(want.includes(true) && want.includes(false), "đúng/sai 4 ý nên có cả ý đúng và ý sai");
  } catch (e) { throw new Error(at + ": " + e.message + "\n" + e.stack.split("\n").slice(1, 3).join("\n")); }
  n++;
});
// số đề, số câu lấy từ danh mục: đề cố định là các đề trong from của đề ngẫu nhiên, mọi đề cố định giữa kì II của file đều ở đó
const pool = bank(POOL), DE = pool.pool.from, mine = pool.questions.filter((q) => q.src === POOL);
assert.deepEqual(BANKS.filter((b) => b.file === "12-toan.js" && /^toan12-gk2-de\d+$/.test(b.id)).map((b) => b.id), DE, "đề cố định giữa kì II nào cũng phải ở from của " + POOL);
for (const id of DE) { const b = bank(id); assert.ok(b, "thiếu " + id); assert.equal(b.questions.length, b.n); run(id, b.questions); }
run(POOL, mine);
assert.equal(dung.size, CHECKS.length, "có mục kiểm tra không khớp câu nào: " + CHECKS.filter((c) => !dung.has(c.has)).map((c) => c.has).join(" | "));
// hình nào cũng được đọc lại; chữ trong hình vừa khung, không đè nhau
const hinh = pool.questions.filter((q) => q.svg);
assert.equal(hinh.filter((q) => hinhDaDoc.has(q.svg)).length, hinh.length, "hình nào cũng được đọc lại");
hinh.forEach((q) => chuHinh(q.svg, q.q.slice(0, 40)));

/* ---------- tự thử các bộ đọc với giá trị biết trước và với câu, hình cố ý viết sai ---------- */
{
  const g = (s, x) => hs(s)(x);
  assert.ok(gan(g("x³ − 2cos x + 3", 2), 8 - 2 * Math.cos(2) + 3) && gan(g("2ˣ/ln 2 + x³", 3), 8 / Math.log(2) + 27) && gan(g("e²ˣ", 0.5), Math.E));
  assert.ok(gan(g("ln 3x", 2), Math.log(6)) && gan(g("1/cos² x", 0.3), 1 / Math.cos(0.3) ** 2) && gan(g("(9/14)√(196 − x²)", 0), 9) && gan(g("−0,25(t − 6)(t − 18)", 12), 9));
  assert.ok(gan(g("x√x", 4), 8) && gan(g("|x² − 1|", 0.5), 0.75) && gan(g("2ˣ · (ln 2)²", 1), 2 * Math.log(2) ** 2) && gan(g("4x³/3 + 2x² + x", 1), 13 / 3) && gan(g("x⁴/1 024", 4), 0.25));
  assert.ok(laNH(hs("x³ − 2cos x"), hs("3x² + 2sin x")) && !laNH(hs("x³ + 2cos x"), hs("3x² + 2sin x")) && !laNH(hs("(2x + 1)³/3"), hs("(2x + 1)²")) && laNH(hs("(2x + 1)³/6"), hs("(2x + 1)²")));
  assert.ok(gan(tp(hs("3x² − 2x"), 0, 3), 18) && gan(tp(hs("3x² − 6x"), 1, 3), 2) && gan(tpAbs(hs("x³ − x"), -1, 1), 0.5) && gan(congThuc("S = |∫₀² (x² − 1)dx|"), 2 / 3) && gan(congThuc("V = π∫₀¹ e²ˣdx"), Math.PI * (Math.E ** 2 - 1) / 2));
  assert.ok(gan(tpAbs(hs("3t² − 12t + 9"), 0, 4), 12) && gan(tp(hs("√(3x)"), 0, 3), 6));
  assert.deepEqual(mp("x/4 + y/3 + z/2 = 1").map(toNum), [0.25, 1 / 3, 0.5, -1]); assert.deepEqual(mp("y = 0").map(toNum), [0, 1, 0, 0]);
  const d = dt("(x − 1)/2 = (y + 3)/(−1) = z/5"); assert.deepEqual([d.P.map(toNum), d.u.map(toNum)], [[1, -3, 0], [2, -1, 5]]);
  assert.equal(viTri(dt("{x = 1 + 2t; y = 2 + t; z = 2t}"), dt("{x = 9 − s; y = s; z = s}")), "Cắt nhau"); assert.equal(viTri(dt("{x = t; y = 0; z = 0}"), dt("{x = 0; y = 1 + s; z = 1}")), "Chéo nhau");
  assert.ok(eq(kcMP(O3, mp("x − 2y + 2z − 6 = 0")), F(2)) && ssMP(mp("x − 2y + 2z − 6 = 0"), mp("2x − 4y + 4z + 1 = 0")) && !ssMP(mp("x − 2y + 2z − 6 = 0"), mp("2x − 4y + 4z − 12 = 0")));
  // bộ đọc hình bắt được hình vẽ sai
  const tim = (has) => pool.questions.find((q) => q.q.includes(has));
  const qA = tim("y = x²/2 + 1. Diện tích S"), gA = docDoThi(qA.svg.replace(/(<polygon points=")([\d.]+),([\d.]+) /, (m, a, x, y) => a + x + "," + (+y - 9) + " "), "thử");
  assert.throws(() => kiemTo(gA, [hs("x²/2 + 1")], "thử"), /không nằm trên đồ thị/);
  const qF = tim("Phần đựng nước của một chiếc cốc");
  assert.throws(() => docKhoi(qF.svg.replace(/ry="([\d.]+)"/, (m, r) => 'ry="' + (+r + 3) + '"'), hs("√(3x)"), 0, 6, "thử"), /elip/);
  assert.throws(() => docKhoi(qF.svg, hs("√(3.3x)".replace(".", ",")), 0, 6, "thử"), /đường sinh lệch/);
  const qH = tim("hình hộp chữ nhật OABC.O′A′B′C′"), D = diem(qH.svg, "thử");
  assert.throws(() => kiemChieu(qH.svg.replace(`cx="${D["B′"][0]}"`, `cx="${D["B′"][0] + 4}"`).replace(/(<text x=")([\d.]+)("[^>]*>B′<)/, (m, a, x, b) => a + (+x + 4) + b), { O: O3, A: [3, 0, 0], B: [3, 4, 0], C: [0, 4, 0], "O′": [0, 0, 2], "A′": [3, 0, 2], "B′": [3, 4, 2], "C′": [0, 4, 2] }.constructor === Object ? Object.fromEntries(Object.entries({ O: [0, 0, 0], A: [3, 0, 0], B: [3, 4, 0], C: [0, 4, 0], "O′": [0, 0, 2], "A′": [3, 0, 2], "B′": [3, 4, 2], "C′": [0, 4, 2] }).map(([k, v]) => [k, v.map((x) => F(x))])) : null, "thử"), /không khớp toạ độ/);
  const qE = tim("Một sợi cáp được căng thẳng từ đỉnh cột");
  const cotE = lines(qE.svg).find((l) => l.w === 3), chanE = cotE.a[1] > cotE.b[1] ? cotE.a : cotE.b;
  assert.throws(() => kiemChieu(qE.svg, { O: O3, A: [F(1), F(3), F(3)], M: [F(2), F(5), F(2)], B: [F(5), F(9), F(0)] }, "thử", [{ v: [F(1), F(3), F(0)], p: chanE }]), /không khớp|trục/);
}

/* ---------- mức độ và ma trận ---------- */
assert.ok(pool.questions.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M), CHU_DE = Object.keys(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => cells.reduce((s, v) => s + v[k], 0)), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.deepEqual(CHU_DE, ["Nguyên hàm", "Tích phân", "Ứng dụng hình học của tích phân", "Phương trình mặt phẳng", "Phương trình đường thẳng trong không gian"], "5 chủ đề theo tên Bài 11–15");
const nhomCD = (ts) => ts.reduce((s, t) => s + M[t].reduce((a, b) => a + b, 0), 0);
assert.deepEqual([nhomCD(CHU_DE.slice(0, 3)), nhomCD(CHU_DE.slice(3))], [15, 10], "Chương IV 15 câu, Chương V 10 câu");
CHU_DE.forEach((t) => assert.ok(("chu-de:12:toan:" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
// hai đề cố định và phần câu riêng đều chia đúng ma trận
[...pool.pool.from.map((id) => [id, bank(id).questions]), [POOL, mine]].forEach(([id, qs]) => Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => qs.filter((q) => q.topic === t && q.lv === l).length), v, id + " không đúng ma trận ở chủ đề " + t)));
assert.ok(pool.questions.every((q) => M[q.topic]), "mọi câu đều có chủ đề trong ma trận");
// chữ chủ đề không trùng chủ đề nào của kho cuối kì I cùng file (đề “Ôn chủ đề” của hai kì tách riêng)
{ const ck1 = bank("toan12-ck1-ngau-nhien"); assert.ok(ck1, "thiếu kho cuối kì I"); CHU_DE.forEach((t) => assert.ok(!ck1.pool.matrix[t], "chủ đề trùng kho cuối kì I: " + t)); }
// mỗi ô có ít nhất gấp đôi số câu ô đó rút; ngoài mỗi đề cố định vẫn đủ
Object.entries(M).forEach(([t, v]) => v.forEach((k, i) => {
  const have = pool.questions.filter((q) => q.topic === t && q.lv === i + 1);
  assert.ok(have.length >= 2 * k, `ô (${t}, mức ${i + 1}) rút ${k} câu mà kho chỉ có ${have.length}`);
  pool.pool.from.forEach((id) => assert.ok(have.filter((q) => q.src !== id).length >= k, `ô (${t}, mức ${i + 1}) ngoài ${id} chỉ còn ${have.filter((q) => q.src !== id).length} câu`));
}));
// câu tự luận chỉ ở các ô Vận dụng rút 1 câu, ô đó còn câu khác dạng: mỗi lần rút nhiều nhất 2 câu tự luận
const oTuLuan = [...new Set(pool.questions.filter((q) => q.type === "essay").map((q) => q.topic + "|" + q.lv))];
assert.ok(oTuLuan.length <= 2 && oTuLuan.every((k) => { const [t, lv] = k.split("|"); return +lv === 3 && M[t][2] === 1 && pool.questions.some((q) => q.topic === t && q.lv === 3 && q.type !== "essay"); }), "câu tự luận: " + oTuLuan);
const dem = (f) => pool.questions.filter(f).length;
assert.ok(dem((q) => q.type === "essay") >= 1 && dem((q) => q.type === "essay") <= 2, "kho: 1–2 câu tự luận");
assert.ok(dem((q) => q.type === "num") >= 4, "kho: ít nhất 4 câu trả lời bằng số");
pool.pool.from.forEach((id) => { const qs = bank(id).questions; assert.ok(qs.filter((q) => q.type === "tf4").length >= 3 && qs.filter((q) => q.type === "num").length >= 6 && qs.filter((q) => q.type === "essay").length <= 1, id + ": cần đủ đúng/sai 4 ý, trả lời ngắn, nhiều nhất một câu tự luận"); });
// hình: đủ ba loại lời giao việc yêu cầu (diện tích trên lưới, khối tròn xoay, hệ trục Oxyz có mặt phẳng, đường thẳng)
assert.ok(hinh.filter((q) => /<title>[Đđ]ồ thị/.test(q.svg) && q.svg.includes('fill="acc-soft"') && q.svg.includes('stroke="line"')).length >= 3, "ít nhất ba hình diện tích trên lưới");
assert.ok(hinh.filter((q) => q.svg.includes("<ellipse")).length >= 2, "ít nhất hai hình khối tròn xoay");
assert.ok(hinh.filter((q) => /Oxyz/.test(q.svg)).length >= 3, "ít nhất ba hình trong hệ trục Oxyz");
// đúng/sai 4 ý: ít nhất 6 câu trong kho, kiểu Đ/S không lặp (Rút ra N9-ck1-khtn)
{ const tf4 = pool.questions.filter((q) => q.type === "tf4"), kieu = {};
  assert.ok(tf4.length >= 6, "đúng/sai 4 ý: ít nhất 6 câu trong kho");
  tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; });
  assert.equal(Math.max(...Object.values(kieu)), 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu)); }
// đáp án đúng không hay là lựa chọn dài nhất hay ngắn nhất (Rút ra N9-ck1-tin-congnghe): mỗi kiểu không quá một phần ba số câu nhiều lựa chọn
{ const mc = pool.questions.filter((q) => q.type === "mc"), hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
  assert.ok(mc.filter((q) => hon(q, (a, b) => a > b)).length <= mc.length / 3, "đáp án đúng là lựa chọn dài nhất ở quá một phần ba số câu nhiều lựa chọn");
  assert.ok(mc.filter((q) => hon(q, (a, b) => a < b)).length <= mc.length / 3, "đáp án đúng là lựa chọn ngắn nhất ở quá một phần ba số câu nhiều lựa chọn"); }
// đáp án không lặp chữ của nhãn chủ đề trên câu (Rút ra N6, N16b), trừ khi mọi lựa chọn cùng có chữ đó
{ const phanNhan = (t) => t.replace(/\s*\([^)]*\)$/, "").split(/ và |, /).map((s) => s.trim().toLowerCase()).filter((s) => s.includes(" ") || s.length >= 6);
  pool.questions.forEach((q) => { const da = q.type === "mc" ? [q.o[0]] : []; phanNhan(q.topic).forEach((c) => da.forEach((d) => {
    if (d.toLowerCase().includes(c)) assert.ok(q.o.every((o) => o.toLowerCase().includes(c)), `đáp án “${d}” lặp chữ “${c}” của nhãn chủ đề`); })); }); }
// lời giải không nói “ý thứ hai”, “phương án A”: app xáo phương án
pool.questions.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b|hệ thứ (hai|ba|tư)/.test(q.x), "lời giải nhắc vị trí của phương án: " + q.q.slice(0, 50)));
const seen = new Set();
let essays = 0;
const thu = (hist) => {
  const d = Quiz.draw(pool, hist);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, pool.n);
  assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.lv === l).length), [0, 1, 2].map((k) => cells.reduce((s, v) => s + v[k], 0)));
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.topic === t && q.lv === l).length), v, "rút đúng ma trận ở chủ đề " + t));
  assert.ok(d.questions.filter((q) => q.type === "essay").length <= 2);
  return d;
};
for (let k = 0; k < 400; k++) { const d = thu(); essays += d.questions.filter((q) => q.type === "essay").length; d.questions.forEach((q) => seen.add(Quiz.key(q))); }
assert.ok(mine.every((q) => seen.has(Quiz.key(q))), "400 lần rút thử phải gặp đủ các câu riêng");
// học sinh đã làm hết một đề cố định: lần rút sau không lấy lại câu của đề đó
pool.pool.from.forEach((id) => { const done = new Set(bank(id).questions.map(Quiz.key)); for (let k = 0; k < 20; k++) thu((q) => ({ done: done.has(Quiz.key(q)) ? 1 : 0, wrong: 0 })).questions.forEach((q) => assert.ok(!done.has(Quiz.key(q)), "đã làm hết " + id + " mà vẫn gặp lại câu của đề đó")); });

/* ---------- đề bài không trùng câu nào khác trong data/banks/12-toan.js (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const deBai = BANKS.filter((b) => b.file === "12-toan.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: gocChu(q.q) })));
deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });

/* ---------- dò lộ đáp án (Rút ra N5, N24, N8; như tests/toan12-ck1.js) giữa hai câu rút được cùng lúc. Đề ngẫu nhiên rút một hoặc hai
   câu mỗi ô, đề “Ôn chủ đề” rút chung mọi câu của một chủ đề (trừ tự luận), nên xét mọi cặp câu của kho, trừ cặp có câu tự luận nằm
   cùng một ô rút 1 câu; lời dặn (note) hiện ở màn mở đề nên cũng xét (Rút ra RS9). Đáp án là số nguyên (từ 10), số thập phân, phân số,
   số âm chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “≈”, “là”, “bằng”, “được”); đáp án bằng chữ có ở câu kia thì chỉ in ra
   khi chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM. ---------- */
const val = (s) => +String(s).replace(/\s/g, "");
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null ? [] : [].concat(q.ans), (q.rubric || []).map((c) => c.c)).map(String);
const KQ = "(?:=|≈|(?:^|[\\s(])(?:là|bằng|được))\\s+";
const SAU = "(?!\\d|,\\d|\\/|°|%|√|π|\\(|\\p{L}|[⁰¹²³⁴⁵⁶⁷⁸⁹ˣ]|\\s*[·+−:](?:\\s|\\d|\\())"; // số đứng trước chữ, ngoặc là hệ số, thừa số
const soKQ = (s) => [...String(s).matchAll(new RegExp(KQ + "(\\d{1,3}(?: \\d{3})*)" + SAU, "gu"))].map((m) => val(m[1]));
const kqLa = (s, a) => new RegExp(KQ + a.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + SAU, "u").test(s);
const cungLuc = (p, q) => p.topic !== q.topic || (p.type !== "essay" && q.type !== "essay") || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2;
const ten = new Map();
DE.forEach((id) => bank(id).questions.forEach((q, i) => ten.set(q.q, id.replace("toan12-gk2-", "") + "#" + (i + 1))));
mine.forEach((q, i) => ten.set(q.q, "own#" + (i + 1)));
const NOTES = [...new Set([...DE, POOL].map((id) => bank(id).note))].map((s, i) => ({ q: "note" + i, x: s, topic: "note", type: "note", lv: 0 }));
NOTES.forEach((nt) => ten.set(nt.q, nt.q));
const doLo = (qs, name, them = []) => {
  const lo_ = [], chuLo = [];
  qs.forEach((q) => {
    const so = [], kq = [], cum = [];
    const them_ = (a) => { a = String(a).replace(/-/g, "−");
      if (/^\d{1,3}(?: \d{3})*(?: [^\d\s]+)?$/.test(a) && !/°$/.test(a)) so.push(val(a.split(/ (?=[^\d\s])/)[0]));
      else if (/^−?\d[\d ,/]*(?: [^\d\s]+)?$/.test(a) || /^−?\d*√\d+$/.test(a)) kq.push(a.replace(/ [^\d\s]+$/, ""));
      else if (a.length >= 3) cum.push(a); };
    if (q.type === "essay") (/Đáp số: (.+)$/m.exec(q.x)[1].match(/\d{1,3}(?: \d{3})*/g) || []).forEach((x) => so.push(val(x)));
    else if (q.type === "num") them_(typeof q.ans === "number" ? fmtDec(q.ans, Math.max(0, (String(q.ans).split(".")[1] || "").length)) : q.ans); else if (q.type === "mc") them_(q.o[0]);
    qs.concat(them).forEach((p) => {
      if (p === q || (p.type !== "note" && !cungLuc(p, q))) return;
      const C = chu(p), T = C.map((s) => s.toLowerCase()), at = `${name(p)} lộ đáp án ${name(q)}: `;
      so.filter((x) => x >= 10 && C.flatMap(soKQ).includes(x)).forEach((x) => lo_.push(at + x));
      kq.filter((a) => C.some((s) => kqLa(s, a))).forEach((a) => lo_.push(at + a));
      cum.filter((s) => { const re = new RegExp("(?<![\\p{L}\\p{N}])" + s.toLowerCase().replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + "(?![\\p{L}\\p{N}])", "u"); return T.some((t) => re.test(t)); }).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo: lo_, chuLo };
};
const { lo: loDA, chuLo } = doLo(pool.questions, (q) => ten.get(q.q), NOTES);
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuLo.join("\n"));
// đã xem (Phiên N12-gk2-toan): “song song” ở các câu về hai mặt phẳng song song không cho biết vị trí của hai đường thẳng d₁, d₂
const DA_XEM = ["own#18 lộ đáp án own#24: Song song", "own#19 lộ đáp án own#24: Song song", "own#22 lộ đáp án own#24: Song song", "de1#18 lộ đáp án own#24: Song song",
  "de2#18 lộ đáp án own#24: Song song", "de2#20 lộ đáp án own#24: Song song"];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loDA, [], "lộ đáp án:\n" + loDA.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai
{ const tim = (has) => pool.questions.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const khac = tim("tích có hướng của hai vectơ u = (1; 2; −1)"), thuLo = (qs) => { const r = doLo(qs, (q) => q.q.slice(0, 10)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  assert.deepEqual(thuLo([tim("mực nước dâng lên với tốc độ"), gia(khac, "Ví dụ h(15) = 138.")]), [138]);
  assert.deepEqual(thuLo([tim("Tính diện tích hình phẳng giới hạn bởi đồ thị hàm số y = x² − 5x + 4"), gia(khac, "Diện tích bằng 9/2.")]), ["9/2"]);
  assert.deepEqual(thuLo([tim("mực nước dâng lên với tốc độ"), gia(khac, "Có 138 điểm, x = 138x + 1.")]), []);
  assert.deepEqual(thuLo([tim("Δ: {x = 2 + 3t; y = −1 − t; z = 4t} có một vectơ chỉ phương là"), gia(khac, "Vectơ u = (3; −1; 4) đã biết.")]), ["u = (3; −1; 4)"]); }

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (bỏ dấu, gộp nguyên âm), nếu có ----------
   Chuỗi 8 từ liền nhau của mọi trường chữ (đề bài, lựa chọn, lời giải, thang chấm) không có trong sách; cụm từ chung của môn (tên bài,
   thuật ngữ, lời dặn) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ. */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần (các vòng lặp lồng nhau gọi lại trên cùng chữ; kết quả như cũ)
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
// tra nhanh chuỗi k từ: băm mọi chuỗi k từ của chữ đã chuẩn hoá (một lần cho mỗi chữ, mỗi k), chỉ so thật (includes) khi băm có;
// kết quả như sach.includes(" " + c + " "), ds.filter((o) => o.s.includes(" " + c + " ")) mà không quét lại cả chữ cho mỗi chuỗi
const traChu = (() => {
  const bam = (w, k) => {
    const A = new Uint32Array(w.length), B = new Uint32Array(w.length), n = Math.max(0, w.length - k + 1), H = new Float64Array(n);
    for (let i = 0; i < w.length; i++) { let a = 0x811c9dc5, b = 0x1b873593; const t = w[i]; for (let j = 0; j < t.length; j++) { const x = t.charCodeAt(j); a = Math.imul(a ^ x, 0x01000193); b = Math.imul(b ^ x, 0x5bd1e995); } A[i] = a; B[i] = b; }
    for (let i = 0; i < n; i++) { let a = 0x9e3779b9, b = 0x85ebca6b; for (let j = i; j < i + k; j++) { a = Math.imul(a ^ A[j], 0x01000193); b = Math.imul(b ^ B[j], 0x5bd1e995); } H[i] = (a >>> 0) * 2097152 + (b >>> 11); }
    return H;
  };
  const co = (H, h) => { let l = 0, r = H.length - 1; while (l <= r) { const m = (l + r) >> 1; if (H[m] === h) return true; if (H[m] < h) l = m + 1; else r = m - 1; } return false; };
  const chuMot = new Map(), chuDs = new WeakMap();
  const bang = (m, k, tao) => { if (!m.has(k)) m.set(k, tao().sort()); return m.get(k); };
  return {
    co: (s, c) => { const w = c.split(" "); if (!chuMot.has(s)) chuMot.set(s, new Map()); return co(bang(chuMot.get(s), w.length, () => bam(s.split(" "), w.length)), bam(w, w.length)[0]) && s.includes(" " + c + " "); },
    loc: (ds, c) => {
      const w = c.split(" "), k = w.length;
      if (!chuDs.has(ds)) chuDs.set(ds, new Map());
      const H = bang(chuDs.get(ds), k, () => { const hs = ds.map((o) => bam(o.s.split(" "), k)), ra = new Float64Array(hs.reduce((a, h) => a + h.length, 0)); let i = 0; hs.forEach((h) => { ra.set(h, i); i += h.length; }); return ra; });
      return co(H, bam(w, k)[0]) ? ds.filter((o) => o.s.includes(" " + c + " ")) : [];
    },
  };
})();
const khongDau = nhoChuoi((s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim());
const TU_CHUNG = [...CHU_DE, "mỗi ý sau đúng hay sai", "trong không gian oxyz", "làm tròn kết quả đến hàng phần trăm", "làm tròn kết quả đến hàng phần mười", "làm tròn kết quả đến hàng đơn vị",
  "diện tích hình phẳng giới hạn bởi đồ thị hàm số", "trục hoành và hai đường thẳng", "khối tròn xoay", "vectơ pháp tuyến", "vectơ chỉ phương", "phương trình tham số", "phương trình chính tắc",
  "là một nguyên hàm của hàm số", "là một nguyên hàm của", "họ nguyên hàm của hàm số", "tích có hướng",
  // cách nói chung của sách khi nêu bài toán (tên bài, cách gọi hình, vật thể, mặt phẳng, đường thẳng)
  "công thức tính góc trong không gian", "đồ thị của hai hàm số", "đồ thị của hàm số", "đồ thị hàm số", "hình phẳng giới hạn bởi đồ thị hàm số", "sinh ra khi quay quanh trục ox",
  "mặt phẳng vuông góc với trục ox tại điểm có hoành độ x", "mặt phẳng vuông góc với trục ox tại", "mặt phẳng đi qua điểm", "đường thẳng đi qua hai điểm", "đường thẳng đi qua điểm", "vuông góc với cả hai mặt phẳng",
  "vuông góc với mặt phẳng", "mặt phẳng trung trực của đoạn thẳng", "hình hộp chữ nhật"]
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const kho = pool.questions.concat(NOTES);
if (SACH.length) {
  assert.ok(SACH.some((f) => /toan-12-tap-2/.test(f)), "OnUp-Book có Toán 12 tập hai");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => chu(q).flatMap((s) => chuoi(s, k).filter((c) => traChu.co(sach, c)).map((c) => `${ten.get(q.q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  const tr8 = [...new Set(bao(8))];
  if (process.env.DO_SACH) console.log("Chuỗi 8 từ trùng sách:\n" + tr8.join("\n"));
  assert.deepEqual(tr8, [], "chuỗi 8 từ trùng chữ của sách");
  // đa thức trong đề (sau “y =”, “f(x) =”, “F(x) =”) không là hàm của ví dụ, bài tập trong sách Toán 12: so chuỗi 8 từ không bắt được biểu
  // thức. Dò trong chữ OCR đã bỏ khoảng trắng; chữ OCR hay đọc sai số mũ (x³ thành x°, xˆ) nên số mũ khớp một kí tự bất kì hoặc không có.
  const toan = SACH.filter((f) => /toan-12/.test(f)).map((f) => fs.readFileSync(f, "utf8").replace(/\s+/g, "").replace(/[—–−]/g, "-")).join("|");
  const mauHam = (e) => new RegExp([...e.replace(/\s+/g, "").replace(/[−–]/g, "-")].map((c) => ("⁰¹²³⁴⁵⁶⁷⁸⁹ˣ".includes(c) ? ".?" : c.replace(/[.*+?^${}()|[\]\\/-]/g, "\\$&"))).join(""));
  const hamSach = new Set();
  kho.forEach((q) => chu(q).forEach((s) => { for (const m of s.matchAll(/(?:y|f\(x\)|F\(x\)|v\(t\)|h′\(t\)|a\(t\)) = ([^.,;:|]+?)(?=[.,;:|]| trên| có| với| và| là| khi| bằng| đạt| \(|$)/g)) {
    const e = m[1].trim(); if (/\d/.test(e) && /[−+]/.test(e) && e.replace(/\s+/g, "").length >= 6 && mauHam(e).test(toan)) hamSach.add(ten.get(q.q) + ": " + e); } }));
  if (process.env.DO_SACH) console.log("Hàm số trùng sách:\n" + [...hamSach].join("\n"));
  assert.deepEqual([...hamSach], [], "hàm số trùng hàm của ví dụ, bài tập trong sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác; với kho cuối kì I cùng file: đề bài
   không có chuỗi 6 từ nào trùng (Rút ra N9-gk1-toan) ---------- */
{
  const ngoai = (b) => !(b.file === "12-toan.js" && /^toan12-gk2-/.test(b.id));
  const khac = BANKS.filter((b) => !b.pool && ngoai(b)).flatMap((b) => b.questions.map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " })))
    .concat(BANKS.filter((b) => b.pool && ngoai(b)).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " }))));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q.q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  const tr8 = [...new Set(bao(8))];
  assert.deepEqual(tr8, [], "chuỗi 8 từ trùng câu của kho khác");
  const ck1 = BANKS.filter((b) => b.file === "12-toan.js" && /^toan12-ck1-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)).map((q) => " " + khongDau(q.q) + " ");
  const gan6 = [...new Set(pool.questions.flatMap((q) => chuoi(q.q, 6).filter((c) => ck1.some((s) => s.includes(" " + c + " "))).map((c) => ten.get(q.q) + ": " + c)))];
  assert.deepEqual(gan6, [], "đề bài gần trùng câu của kho cuối kì I");
}
console.log(n, "câu đã tính lại hoặc đọc lại hình (" + DE.map((id) => bank(id).questions.length).join(" + ") + " câu của " + DE.length + " đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + pool.questions.length + " câu, " + hinh.length + " hình, ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề; trung bình " + (essays / 400).toFixed(2) + " câu tự luận mỗi lần rút.");
console.log("MATH OK");
