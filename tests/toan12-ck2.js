// Tính lại đáp án ngân hàng Toán 12 cuối năm (data/banks/12-toan.js): hai đề cố định toan12-ck2-de1, toan12-ck2-de2 và các câu riêng
// của đề ngẫu nhiên toan12-ck2-ngau-nhien (Phiên N12-ck2-toan; Toán 12 tập hai, Bài 11–19, trọng tâm Bài 16–19). Theo mẫu
// tests/toan12-gk2.js (bộ đọc số hữu tỉ, hàm số, tích phân, toạ độ, hình Oxyz chép từ đó). Mỗi câu khớp đúng một mục kiểm (theo chữ has
// trong đề bài), mục đó đọc số liệu trong đề rồi tính lại đáp án: trắc nghiệm o[0] (đúng một lựa chọn đúng), đúng/sai 4 ý a (từng ý tính
// lại), trả lời bằng số ans; tự luận: các số trong thang chấm, lời giải gợi ý.
// Góc: góc giữa hai đường thẳng, giữa đường thẳng và mặt phẳng, giữa hai mặt phẳng tính bằng số thực từ vectơ chỉ phương, pháp tuyến;
// câu hỏi công thức (sin φ = |cos(u, n)|, cos((P), (Q)) = |cos(n, n′)|) thử với nhiều cặp vectơ ngẫu nhiên, góc tính theo định nghĩa
// (góc giữa đường thẳng và hình chiếu của nó trên mặt phẳng; góc giữa hai đường thẳng nằm trong hai mặt phẳng, vuông góc với giao tuyến).
// Mặt cầu: bộ đọc phương trình bậc hai của x, y, z ((x − a)² + … = R², x² + y² + z² − 2ax − … + d = 0) → tâm, bán kính, hoặc không phải
// mặt cầu (hệ số của x², y², z² khác nhau, có tích xy, a² + b² + c² − d ≤ 0); điểm nằm trong, nằm ngoài, thuộc mặt cầu; mặt cầu qua bốn điểm.
// Xác suất: không gian mẫu liệt kê bằng code (bóng, thẻ, xúc xắc, đồng xu, chuyển bi giữa hai hộp) hoặc mô hình bốn biến cố sơ cấp AB,
// AB̄, ĀB, ĀB̄ bằng phân số chính xác (công thức nhân, xác suất toàn phần, Bayes); câu chọn công thức thử với nhiều mô hình ngẫu nhiên.
// Hình: mặt cầu trong hệ trục Oxyz (trục, đầu mũi tên, chữ x, y, z; vạch chia có số cho đơn vị từng trục; tâm đường tròn là hình chiếu
// của I ghi trên hình, bán kính bằng R ghi trên hình nhân đơn vị trục Oy, Oz; đoạn bán kính; đường gióng nét đứt nối các điểm chỉ khác
// nhau một toạ độ), hình chóp, cột và dây, tháp và cáp (điểm có nhãn khớp một phép chiếu song song như tests/toan12-gk2.js; cạnh thấy,
// cạnh khuất; cung đánh dấu góc có tâm ở đỉnh góc, hai đầu nằm trên hai cạnh của góc), sơ đồ hình cây (gốc, hai tầng nút A, Ā, B, B̄;
// mỗi nhánh một xác suất; các nhánh cùng gốc cộng lại bằng 1, nhiều nhất một dấu “?” thay một xác suất). Mức độ và ma trận (9 chủ đề:
// 8 câu ôn Bài 11–15 mang đúng chữ chủ đề của kho giữa kì II, 17 câu Bài 16–19; hai đề cố định và câu riêng đều chia đúng ma trận; rút
// thử, đã làm hết một đề cố định thì không gặp lại câu của đề đó), câu tự luận chỉ ở ô Vận dụng rút 1 câu, đúng/sai 4 ý không lặp kiểu
// Đ/S, đáp án đúng không dài hơn hẳn lựa chọn sai và không hay là lựa chọn dài nhất hay ngắn nhất, không lặp chữ của nhãn chủ đề, chữ
// trong hình vừa khung và không đè nhau, dò lộ đáp án giữa mọi cặp câu (đề “Ôn chủ đề” rút chung cả chủ đề) và với lời dặn, giữa câu
// cùng chủ đề của kho này với kho giữa kì II (DA_XEM_CHU_DE), câu ôn không trùng đề bài, chuỗi 6 từ của đề bài, đáp án câu cùng chủ
// đề của kho giữa kì II, đề bài không gần trùng câu của kho cuối kì I, giữa kì II cùng file, và nếu có OnUp-Book thì so mọi trường chữ
// với chữ OCR của mọi cuốn (không chuỗi 8 từ nào trùng; đa thức trong đề không là hàm của ví dụ, bài tập trong sách Toán 12) và với câu
// của mọi kho khác.
// Chạy: node tests/toan12-ck2.js → in MATH OK. DO_LO=1: in đáp án bằng chữ có ở câu rút được cùng lúc; DO_SACH=1: in chuỗi 6 từ trùng
// chữ OCR của sách; DO_KHO=1: chuỗi 6 từ trùng câu của kho khác; DO_GK2=1: chuỗi 5 từ của đề bài câu ôn có ở câu cùng chủ đề của kho
// giữa kì II.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan12-ck2-ngau-nhien";

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
// mệnh đề về tích phân của f
const menhDeTP = (f) => (s) => {
  let m;
  if ((m = /^∫([₀-₉]+)([⁰¹²³⁴⁵⁶⁷⁸⁹]+) f\(x\)dx = ∫([₀-₉]+)([⁰¹²³⁴⁵⁶⁷⁸⁹]+) \|f\(x\)\|dx$/.exec(s))) { const a = toNum(fr(can(m[1], SUB))), b = toNum(fr(can(m[2], SUPD))); assert.ok(m[1] === m[3] && m[2] === m[4], "hai cận khác nhau"); return gan(tp(f, a, b), tpAbs(f, a, b)); }
  if ((m = /^∫([₀-₉₋]+)([⁰¹²³⁴⁵⁶⁷⁸⁹]+) f\(x\)dx = (.+)$/.exec(s))) return gan(tp(f, toNum(fr(can(m[1], SUB))), toNum(fr(can(m[2], SUPD)))), toNum(fr(m[3])));
  if ((m = /^Tích phân từ (.+) đến (.+) của hàm số \|f\(x\)\| bằng (.+)$/.exec(s))) return gan(tpAbs(f, hang(m[1]), hang(m[2])), toNum(fr(m[3])));
  throw new Error("mệnh đề lạ: " + s);
};
const O3 = [F(0), F(0), F(0)];
// "∫ₐᵇ (…)dx" trong đề → giá trị; "Tích phân từ a đến b của hàm số f(x) = …"
const tpDe = (q) => { const m = /∫([₀-₉]+)([⁰¹²³⁴⁵⁶⁷⁸⁹]+) \((.+)\)dx/.exec(q.q); assert.ok(m, "đề thiếu tích phân"); const g = hs(m[3]); return tp(g, toNum(fr(can(m[1], SUB))), toNum(fr(can(m[2], SUPD))), nghiemSo(g, toNum(fr(can(m[1], SUB))), toNum(fr(can(m[2], SUPD))))); };
const tpChu = (q) => { const m = /Tích phân từ (.+) đến (.+) của hàm số f\(x\) = (.+) bằng$/.exec(q.q); assert.ok(m, "đề thiếu tích phân"); return tp(hs(m[3]), hang(m[1]), hang(m[2])); };
const ptDe = (q, ten) => diemTrongChu(q.q, ten);
const PT = /^(.+ = .+)$/;

/* ---------- nghiệm của hàm số trên đoạn: dò đổi dấu (lưới lệch khỏi số nguyên), chia đôi ---------- */
const nghiem = (g, a, b, n = 20000) => {
  const r = [], h = (b - a) / n, l0 = a + h * Math.PI / 10;
  let x0 = l0, y0 = g(x0);
  for (let k = 1; k <= n; k++) {
    const x1 = l0 + h * k, y1 = g(x1);
    if (y0 === 0) r.push(x0); else if (y0 * y1 < 0) { let p = x0, q = x1; for (let i = 0; i < 80; i++) { const m = (p + q) / 2; if (g(p) * g(m) <= 0) q = m; else p = m; } r.push((p + q) / 2); }
    x0 = x1; y0 = y1;
  }
  return r;
};

/* ---------- góc trong không gian (số thực) ---------- */
const R2D = 180 / Math.PI;
const vn = (v) => v.map(toNum);
const dotR = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const lenR = (a) => Math.sqrt(dotR(a, a));
const crossR = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const gocVec = (a, b) => Math.acos(Math.max(-1, Math.min(1, dotR(a, b) / (lenR(a) * lenR(b))))) * R2D; // góc giữa hai vectơ, 0°–180°
const gocDT = (a, b) => { const g = gocVec(a, b); return Math.min(g, 180 - g); };                        // góc giữa hai đường thẳng
// góc giữa đường thẳng (vectơ chỉ phương u) và mặt phẳng (pháp tuyến n) theo định nghĩa: góc giữa đường thẳng và hình chiếu của nó
const gocDTMP = (u, n) => { const k = dotR(u, n) / dotR(n, n), w = u.map((x, i) => x - k * n[i]); return lenR(w) < 1e-12 * lenR(u) ? 90 : gocDT(u, w); };
// góc giữa hai mặt phẳng theo định nghĩa: góc giữa hai đường thẳng nằm trong hai mặt phẳng, cùng vuông góc với giao tuyến
const gocMP = (n, m) => { const w = crossR(n, m); if (lenR(w) < 1e-12 * lenR(n) * lenR(m)) return 0; return gocDT(crossR(w, n), crossR(w, m)); };
// đối tượng: { u } đường thẳng, { n } mặt phẳng
const gocGiua = (X, Y) => {
  if (X.u && Y.u) return gocDT(vn(X.u), vn(Y.u));
  if (X.n && Y.n) return gocMP(vn(X.n), vn(Y.n));
  const d = X.u ? X : Y, p = X.u ? Y : X; return gocDTMP(vn(d.u), vn(p.n));
};
const vecTrongChu = (s, ten) => { const m = new RegExp("(?:^|[^A-Za-z])" + ten + " = (\\([^()]+\\))").exec(s); assert.ok(m, "không thấy vectơ " + ten); return bo3(m[1]); };
const goiTen = (ctx, s) => { s = s.replace(/^(?:đường thẳng|mặt phẳng) /, ""); assert.ok(ctx[s], "không biết đối tượng " + s); return ctx[s]; };
// mệnh đề về góc; ctx: { tên: { u } | { n } }
const menhDeGoc = (ctx) => (s) => {
  let m;
  if ((m = /^(sin|cos)\((.+), (.+)\) = (.+)$/.exec(s))) { const g = gocGiua(goiTen(ctx, m[2]), goiTen(ctx, m[3])) / R2D; return gan(m[1] === "sin" ? Math.sin(g) : Math.cos(g), hang(m[4])); }
  if ((m = /^Góc giữa (?:hai đường thẳng )?(.+) và (.+) (nhỏ hơn|lớn hơn|bằng) (\d+)°$/.exec(s))) {
    const g = gocGiua(goiTen(ctx, m[1]), goiTen(ctx, m[2])), v = +m[4];
    if (m[3] === "bằng") return Math.abs(g - v) < 1e-9;
    assert.ok(Math.abs(g - v) > 0.5, "góc sát ngưỡng: " + s); return m[3] === "nhỏ hơn" ? g < v : g > v;
  }
  if ((m = /^Hai đường thẳng (.+?) và (.+?) (không )?vuông góc với nhau$/.exec(s))) { const vg = Math.abs(gocGiua(goiTen(ctx, m[1]), goiTen(ctx, m[2])) - 90) < 1e-9; return m[3] ? !vg : vg; }
  throw new Error("mệnh đề lạ: " + s);
};
// số giả ngẫu nhiên cố định (để lần chạy nào cũng thử cùng các bộ số)
let hat = 20261104;
const ngau = () => { hat = (hat * 1103515245 + 12345) % 2147483648; return hat / 2147483648; };
const nguyen = (a, b) => a + Math.floor(ngau() * (b - a + 1));
const vecNN = () => { for (;;) { const v = [nguyen(-5, 5), nguyen(-5, 5), nguyen(-5, 5)]; if (lenR(v) > 0) return v; } };
// giá trị của một vế trong câu chọn công thức góc
const veGoc = (s, g) => {
  let m;
  if ((m = /^(sin|cos) (φ)$/.exec(s)) || (m = /^(sin|cos)\(\((P)\), \(Q\)\)$/.exec(s))) return m[1] === "sin" ? Math.sin(g.goc / R2D) : Math.cos(g.goc / R2D);
  if (s === "φ" || s === "((P), (Q))") return g.goc;
  if ((m = /^(\|)?(sin|cos)\((u, n|n, n′)\)\|?$/.exec(s))) { const v = (m[2] === "sin" ? Math.sin : Math.cos)(gocVec(g.a, g.b) / R2D); return m[1] ? Math.abs(v) : v; }
  if (s === "(u, n)" || s === "(n, n′)") return gocVec(g.a, g.b);
  throw new Error("vế lạ: " + s);
};
// công thức "trái = phải" đúng với mọi cặp vectơ thử; loai: "đt-mp" (u, n) hoặc "mp-mp" (n, n′)
const dungMoiCap = (trai, phai, loai) => {
  for (let k = 0; k < 60; k++) {
    const a = vecNN(), b = vecNN(), g = { a, b, goc: loai === "đt-mp" ? gocDTMP(a, b) : gocMP(a, b) };
    if (!gan(veGoc(trai, g), veGoc(phai, g))) return false;
  }
  return true;
};

/* ---------- mặt cầu: phương trình bậc hai của x, y, z ---------- */
const pt2 = (s) => {
  const Q = { x2: F(0), y2: F(0), z2: F(0), x: F(0), y: F(0), z: F(0), c: F(0), xy: F(0), yz: F(0), xz: F(0) };
  const ve = s.split(" = "); assert.equal(ve.length, 2, "không phải phương trình: " + s);
  const them = (side, dau) => {
    const t = side.trim().replace(/-/g, "−"), terms = []; let cur = "", sg = "+", sau = 0;
    for (let i = 0; i < t.length; i++) {
      const ch = t[i]; if (ch === "(") sau++; if (ch === ")") sau--;
      if (sau === 0 && (ch === "+" || ch === "−") && t[i - 1] === " " && t[i + 1] === " ") { terms.push([sg, cur.trim()]); sg = ch; cur = ""; i++; continue; }
      cur += ch;
    }
    terms.push([sg, cur.trim()]);
    terms.forEach(([g0, tt0]) => {
      let k = dau * (g0 === "−" ? -1 : 1), tt = tt0, m; if (tt.startsWith("−")) { k = -k; tt = tt.slice(1); }
      const K = F(k), hs_ = (x) => (x ? fr(x) : F(1));
      if ((m = /^\(([xyz]) ([+−]) (\d+(?:,\d+)?)\)²$/.exec(tt))) { const a = m[2] === "−" ? fr(m[3]) : neg(fr(m[3])); Q[m[1] + "2"] = add(Q[m[1] + "2"], K); Q[m[1]] = add(Q[m[1]], mul(K, mul(F(-2), a))); Q.c = add(Q.c, mul(K, mul(a, a))); }
      else if ((m = /^(\d+(?:,\d+)?)?([xyz])²$/.exec(tt))) Q[m[2] + "2"] = add(Q[m[2] + "2"], mul(K, hs_(m[1])));
      else if ((m = /^(\d+(?:,\d+)?)?([xyz])([xyz])$/.exec(tt))) { const key = [m[2], m[3]].sort().join(""); Q[key] = add(Q[key], mul(K, hs_(m[1]))); }
      else if ((m = /^(\d+(?:,\d+)?)?([xyz])$/.exec(tt))) Q[m[2]] = add(Q[m[2]], mul(K, hs_(m[1])));
      else if ((m = /^(\d+(?:,\d+)?)$/.exec(tt))) Q.c = add(Q.c, mul(K, fr(m[1])));
      else throw new Error("hạng tử lạ “" + tt0 + "” trong " + s);
    });
  };
  them(ve[0], 1); them(ve[1], -1);
  return Q;
};
// → { I, R2 } hoặc null nếu không phải phương trình mặt cầu
const cau = (s) => {
  const Q = pt2(s);
  if (!(eq(Q.x2, Q.y2) && eq(Q.y2, Q.z2) && !eq(Q.x2, F(0)) && ["xy", "yz", "xz"].every((k) => eq(Q[k], F(0))))) return null;
  const k = Q.x2, I = ["x", "y", "z"].map((v) => div(Q[v], mul(F(-2), k))), R2 = sub(vDot(I, I), div(Q.c, k));
  return cmp(R2, F(0)) > 0 ? { I, R2 } : null;
};
const viTriCau = (c, M) => cmp(vDot(vSub(M, c.I), vSub(M, c.I)), c.R2); // < 0 nằm trong, 0 thuộc, > 0 nằm ngoài
const menhDeCau = (c, pts = {}) => (s) => {
  let m;
  if ((m = /^\(S\) có bán kính (?:R = |bằng )(.+)$/.exec(s))) { const v = fr(m[1]); return eq(mul(v, v), c.R2); }
  if ((m = /^\(S\) có tâm I(\(.+\))$/.exec(s))) return vEq(bo3(m[1]), c.I);
  if ((m = /^\(S\) có phương trình (.+)$/.exec(s))) { const d = cau(m[1]); return !!d && vEq(d.I, c.I) && eq(d.R2, c.R2); }
  if ((m = /^(?:Gốc toạ độ O|Điểm [A-Z]′?(\(.+\))) (nằm trong|nằm ngoài|thuộc) \(S\)$/.exec(s))) { const k = Math.sign(viTriCau(c, m[1] ? bo3(m[1]) : O3)); return k === { "nằm trong": -1, "nằm ngoài": 1, "thuộc": 0 }[m[2]]; }
  if ((m = /^Đoạn thẳng ([A-Z])([A-Z])′ với [A-Z]′(\(.+\)) là một đường kính của \(S\)$/.exec(s))) { const A = pts[m[1]], A2 = bo3(m[3]); assert.ok(A && m[1] === m[2], "không biết điểm " + m[1]); return vEq(A.map((x, i) => div(add(x, A2[i]), F(2))), c.I) && viTriCau(c, A) === 0; }
  throw new Error("mệnh đề lạ: " + s);
};

/* ---------- xác suất: bốn biến cố sơ cấp AB, AB̄, ĀB, ĀB̄ (khoá "11", "10", "01", "00"), xác suất là phân số ---------- */
const AN = "Ā", BN = "B̄";
const SO_CAP = { A: ["11", "10"], [AN]: ["01", "00"], B: ["11", "01"], [BN]: ["10", "00"] };
const tapSK = (s) => { const t = s.match(/Ā|A|B̄|B/g); assert.ok(t && t.join("") === s, "biến cố lạ: " + s); return t.map((x) => SO_CAP[x]).reduce((a, b) => a.filter((k) => b.includes(k))); };
const xacSuat = (mo, s) => {
  const [e, f] = s.split(" | "), P = (set) => set.reduce((acc, k) => add(acc, mo[k]), F(0));
  if (f === undefined) return P(tapSK(e));
  const tf = tapSK(f); return div(P(tapSK(e).filter((k) => tf.includes(k))), P(tf));
};
const hopLe = (mo) => { Object.values(mo).forEach((p) => assert.ok(cmp(p, F(0)) >= 0, "xác suất âm")); assert.ok(eq(Object.values(mo).reduce(add, F(0)), F(1)), "tổng xác suất khác 1"); return mo; };
const moHinh = (c) => hopLe({ "11": mul(c.A, c.BA), "10": mul(c.A, sub(F(1), c.BA)), "01": mul(sub(F(1), c.A), c.BAc), "00": mul(sub(F(1), c.A), sub(F(1), c.BAc)) });
const moHinh2 = (A, B, AB) => hopLe({ "11": AB, "10": sub(A, AB), "01": sub(B, AB), "00": add(sub(sub(F(1), A), B), AB) });
// các giá trị P(X) = v ghi trong đề bài
const docP = (s) => { const r = {}; for (const m of s.matchAll(/P\(([^()]+)\) = (\d+(?:,\d+)?)/g)) r[m[1]] = fr(m[2]); return r; };
const menhDeP = (mo) => (s) => {
  let m;
  if ((m = /^P\((.+)\) = (.+)$/.exec(s))) return eq(xacSuat(mo, m[1]), fr(m[2]));
  if ((m = /^A và B (không )?độc lập$/.exec(s))) { const dl = eq(xacSuat(mo, "AB"), mul(xacSuat(mo, "A"), xacSuat(mo, "B"))); return m[1] ? !dl : dl; }
  throw new Error("mệnh đề lạ: " + s);
};
// biểu thức có các P(…): thay từng P(…) bằng giá trị rồi tính bằng bộ đọc biểu thức
const bieuThucP = (mo, s) => hang(s.replace(/P\(([^()]+)\)/g, (x, e) => "(" + toNum(xacSuat(mo, e)).toFixed(14).replace(".", ",") + ")"));
// công thức đúng với mọi mô hình thử (P(A), P(B | A), P(B | Ā) lấy ngẫu nhiên trong (0; 1))
const dungMoiMoHinh = (f) => { for (let k = 0; k < 60; k++) { const c = { A: F(nguyen(5, 95), 100), BA: F(nguyen(5, 95), 100), BAc: F(nguyen(5, 95), 100) }; if (!f(moHinh(c))) return false; } return true; };

/* ---------- hình: mặt cầu trong hệ trục Oxyz ----------
   Trục: ba đoạn nét 1,2 đi ra từ O (chấm có nhãn đậm O), có đầu mũi tên và chữ x, y, z ở đầu trục. Mỗi trục một vạch chia (đoạn nét 1 dài
   không quá 8, nằm trên trục) kèm một số cỡ 13 ngay cạnh: đơn vị của trục = (vạch − O)/số. Đường tròn (r > 10) là hình biểu diễn mặt cầu:
   tâm là hình chiếu của I ghi ở chữ “I(a; b; c)” (có chấm ở tâm), bán kính bằng R ghi ở chữ “R = …” nhân đơn vị trục Oz (bằng đơn vị
   trục Oy); đoạn bán kính (nét màu acc) từ tâm tới đường tròn, chữ “R = …” cạnh trung điểm. Đường gióng nét đứt nối hai điểm trong
   { I, (a; b; 0), (a; 0; 0), (0; b; 0), (0; 0; c) } chỉ khác nhau một toạ độ. */
const docCau = (svg, ten) => {
  const T = texts(svg), cs = circles(svg), cham = cs.filter((c) => c.r <= 4), vong = cs.filter((c) => c.r > 10);
  assert.equal(vong.length, 1, ten + ": cần đúng một đường tròn biểu diễn mặt cầu");
  const tO = T.find((t) => t.b && t.t === "O"); assert.ok(tO, ten + ": thiếu nhãn O");
  const O = cham.slice().sort((p, q) => dist(p.c, tO.at) - dist(q.c, tO.at))[0].c; assert.ok(dist(O, tO.at) < 30, ten + ": nhãn O phải đặt cạnh gốc toạ độ");
  const truc = {};
  lines(svg).filter((l) => l.w === 1.2).forEach((l) => {
    assert.ok(dist(l.a, O) < 0.3, ten + ": trục phải đi ra từ O");
    const tip = polygons(svg).map((g) => g[0]).find((q) => dist(q, l.b) < 12 && dist(q, O) > dist(l.b, O)); assert.ok(tip, ten + ": trục cần đầu mũi tên");
    const t = T.find((t) => t.it && /^[xyz]$/.test(t.t) && dist(t.at, tip) < 22); assert.ok(t, ten + ": thiếu chữ ở đầu trục"); assert.ok(!truc[t.t], ten + ": hai trục O" + t.t); truc[t.t] = l;
  });
  assert.deepEqual(Object.keys(truc).sort(), ["x", "y", "z"], ten + ": cần ba trục Ox, Oy, Oz");
  const e = {}, soT = T.filter((t) => /^\d+$/.test(t.t));
  lines(svg).filter((l) => l.w === 1 && !l.dash && dist(l.a, l.b) <= 8).forEach((v) => {
    const m = [(v.a[0] + v.b[0]) / 2, (v.a[1] + v.b[1]) / 2];
    const ax = Object.keys(truc).find((n) => { const l = truc[n], d = subv(l.b, l.a), w = subv(m, l.a); return Math.abs(cross(d, w)) / Math.hypot(...d) < 0.3 && d[0] * w[0] + d[1] * w[1] > 0; });
    assert.ok(ax, ten + ": vạch chia phải nằm trên một trục");
    const so = soT.slice().sort((p, q) => dist(p.at, m) - dist(q.at, m))[0]; assert.ok(so && dist(so.at, m) < 20 && so.fs === 13, ten + ": vạch chia cần số cỡ 13 ngay cạnh");
    assert.ok(!e[ax], ten + ": mỗi trục một vạch chia"); e[ax] = [(m[0] - O[0]) / +so.t, (m[1] - O[1]) / +so.t];
  });
  assert.deepEqual(Object.keys(e).sort(), ["x", "y", "z"], ten + ": mỗi trục cần một vạch chia có số");
  assert.ok(Math.abs(Math.hypot(...e.y) - Math.hypot(...e.z)) < 0.05 && Math.abs(e.y[1]) < 0.05 && Math.abs(e.z[0]) < 0.05, ten + ": trục Oy nằm ngang, trục Oz thẳng đứng, cùng đơn vị");
  const chieu = (v) => [O[0] + v[0] * e.x[0] + v[1] * e.y[0] + v[2] * e.z[0], O[1] + v[0] * e.x[1] + v[1] * e.y[1] + v[2] * e.z[1]];
  const tI = T.find((t) => /^I\(/.test(t.t)); assert.ok(tI && tI.b, ten + ": thiếu chữ I(a; b; c)"); const I = bo3(tI.t.slice(1)).map(toNum);
  const c = vong[0]; assert.ok(dist(chieu(I), c.c) < 0.5, ten + ": tâm đường tròn không khớp toạ độ của I");
  assert.ok(cham.some((p) => dist(p.c, c.c) < 0.3) && dist(tI.at, c.c) < 40, ten + ": cần chấm ở tâm và chữ I(…) cạnh tâm");
  const tR = T.find((t) => /^R = /.test(t.t)); assert.ok(tR, ten + ": thiếu chữ R = …"); const R = toNum(fr(tR.t.slice(4)));
  assert.ok(Math.abs(c.r - R * Math.hypot(...e.z)) < 0.5, ten + ": bán kính đường tròn không khớp R ghi trên hình");
  const bk = lines(svg).filter((l) => l.stroke === "acc" && (dist(l.a, c.c) < 0.3 || dist(l.b, c.c) < 0.3)); assert.equal(bk.length, 1, ten + ": cần một đoạn bán kính");
  const ngoai = dist(bk[0].a, c.c) < 0.3 ? bk[0].b : bk[0].a; assert.ok(Math.abs(dist(ngoai, c.c) - c.r) < 0.5, ten + ": đoạn bán kính phải tới đường tròn");
  assert.ok(dist(tR.at, [(bk[0].a[0] + bk[0].b[0]) / 2, (bk[0].a[1] + bk[0].b[1]) / 2]) < 16, ten + ": chữ R = … phải cạnh đoạn bán kính");
  const G = [I, [I[0], I[1], 0], [I[0], 0, 0], [0, I[1], 0], [0, 0, I[2]]];
  lines(svg).filter((l) => l.dash).forEach((l) => {
    const a = G.findIndex((v) => dist(chieu(v), l.a) < 0.5), b = G.findIndex((v) => dist(chieu(v), l.b) < 0.5);
    assert.ok(a >= 0 && b >= 0 && G[a].filter((x, i) => x !== G[b][i]).length === 1, ten + ": đường gióng nét đứt không nối hai điểm chỉ khác nhau một toạ độ");
  });
  return { I, R };
};
/* ---------- hình: cung đánh dấu góc tại đỉnh V giữa hai tia V→a, V→b (D: các điểm có nhãn, từ kiemChieu) ---------- */
const cungGoc = (svg, D, V, a, b, ten) => {
  const ps = [...svg.matchAll(/<path d="M ([\d.]+) ([\d.]+) A ([\d.]+) ([\d.]+) 0 0 [01] ([\d.]+) ([\d.]+)"/g)].map((m) => ({ p: [+m[1], +m[2]], q: [+m[5], +m[6]], r: +m[3] }));
  const c = ps.filter((x) => Math.abs(dist(x.p, D[V]) - x.r) < 0.5 && Math.abs(dist(x.q, D[V]) - x.r) < 0.5);
  assert.equal(c.length, 1, ten + ": cần đúng một cung đánh dấu góc tại " + V);
  const tren = (P, Tn) => { const d = subv(D[Tn], D[V]), w = subv(P, D[V]); return Math.abs(cross(d, w)) / Math.hypot(...d) < 0.5 && d[0] * w[0] + d[1] * w[1] > 0; };
  assert.ok((tren(c[0].p, a) && tren(c[0].q, b)) || (tren(c[0].p, b) && tren(c[0].q, a)), ten + ": cung đánh dấu góc phải nằm giữa hai tia " + V + a + ", " + V + b);
};
/* ---------- hình: sơ đồ hình cây ----------
   Gốc là chấm duy nhất; nút là chữ A, Ā, B, B̄; mỗi nhánh là một đoạn thẳng từ gốc hoặc từ bên phải một nút (x + 11, y − 5) tới bên trái
   một nút (x − 11, y − 5); mỗi nhánh có đúng một xác suất (0,…, 1 hoặc ?) gần trung điểm hơn mọi nhánh khác. Tầng 1: A, Ā; tầng 2: B, B̄
   dưới mỗi nút A, Ā. Các nhánh cùng gốc cộng lại bằng 1; nhiều nhất một dấu ? (tính từ nhánh còn lại). */
const docCay = (svg, ten) => {
  const goc = circles(svg).filter((c) => c.r <= 4); assert.equal(goc.length, 1, ten + ": cần đúng một gốc");
  const T = texts(svg), nut = T.filter((t) => /^(A|Ā|B|B̄)$/.test(t.t)), soT = T.filter((t) => /^(0,\d+|1|\?)$/.test(t.t));
  assert.equal(nut.length, 6, ten + ": cần 6 nút"); assert.equal(soT.length, 6, ten + ": cần 6 xác suất trên nhánh");
  const trai = (t) => [t.at[0] - 11, t.at[1] - 5], phai = (t) => [t.at[0] + 11, t.at[1] - 5], giua = (l) => [(l.a[0] + l.b[0]) / 2, (l.a[1] + l.b[1]) / 2];
  const ls = lines(svg); assert.equal(ls.length, 6, ten + ": cần đúng 6 nhánh");
  const canh = ls.map((l) => {
    const [u, v] = [l.a, l.b].sort((p, q) => p[0] - q[0]);
    const cha = dist(u, goc[0].c) < 1 ? "gốc" : nut.find((t) => dist(phai(t), u) < 1), con = nut.find((t) => dist(trai(t), v) < 1);
    assert.ok(cha && con, ten + ": nhánh phải nối gốc hoặc một nút với một nút");
    const nh = soT.slice().sort((p, q) => dist(p.at, giua(l)) - dist(q.at, giua(l)))[0];
    assert.ok(dist(nh.at, giua(l)) < 22 && ls.every((k) => k === l || dist(nh.at, giua(k)) > dist(nh.at, giua(l))), ten + ": xác suất phải ghi cạnh trung điểm của nhánh");
    return { cha, con, p: nh.t, nh };
  });
  assert.equal(new Set(canh.map((c) => c.nh)).size, 6, ten + ": mỗi nhánh một xác suất");
  const ra = (cha) => canh.filter((c) => c.cha === cha), r = {};
  const tang = (cha, a, b, ka, kb) => {
    const cs = ra(cha); assert.deepEqual(cs.map((c) => c.con.t).sort(), [a, b].sort(), ten + ": nhánh từ " + (cha.t || cha) + " phải tới " + a + ", " + b);
    const pa = cs.find((c) => c.con.t === a).p, pb = cs.find((c) => c.con.t === b).p;
    assert.ok(!(pa === "?" && pb === "?"), ten + ": hai dấu ? cùng gốc");
    if (pa === "?") r.hoi = ka; if (pb === "?") r.hoi = kb;
    r[ka] = pa === "?" ? sub(F(1), fr(pb)) : fr(pa); r[kb] = pb === "?" ? sub(F(1), fr(pa)) : fr(pb);
    assert.ok(eq(add(r[ka], r[kb]), F(1)), ten + ": các nhánh cùng gốc " + (cha.t || cha) + " cộng lại phải bằng 1");
    return cs;
  };
  const t1 = tang("gốc", "A", AN, "A", "Ac");
  tang(t1.find((c) => c.con.t === "A").con, "B", BN, "BA", "BcA");
  tang(t1.find((c) => c.con.t === AN).con, "B", BN, "BAc", "BcAc");
  assert.equal(soT.filter((t) => t.t === "?").length, r.hoi ? 1 : 0, ten + ": nhiều nhất một dấu ?");
  return r;
};

/* ---------- kiểm tra từng câu ---------- */
const hinhDaDoc = new Set();
const doc = (q, ham, ...a) => { hinhDaDoc.add(q.svg); return ham(q.svg, ...a); };
const k3 = [F(0), F(0), F(1)];
const CHECKS = [
  // Bài 11. Nguyên hàm
  { has: "∫(5x⁴ + 2ˣ)dx bằng", right: (q) => { const f = hamDe(q, /^∫\((.+)\)dx bằng$/); return theo(q, /^(.+) \+ C$/, (k) => laNH(hs(k[1]), f)); } },
  { has: "Trên khoảng (0; +∞), ∫(1/x + 2x)dx bằng", right: (q) => { const f = hamDe(q, /∫\((.+)\)dx bằng$/); return theo(q, /^(.+) \+ C$/, (k) => laNH(hs(k[1]), f, DUONG)); } },
  { has: "Hàm số F(x) = e³ˣ/3 − 2cos x là một nguyên hàm", right: (q) => { const G = hamDe(q, /F\(x\) = (.+) là một nguyên hàm/); return theo(q, /^f\(x\) = (.+)$/, (k) => laNH(G, hs(k[1]))); } },
  // Bài 12. Tích phân
  { has: "∫₀² (3x² − 2x)dx bằng", right: (q) => theoSo(q, tpDe(q)) },
  { has: "Biết ∫₂⁵ f(x)dx = 6. Giá trị của ∫₅² f(x)dx bằng", right: (q) => theoSo(q, -so(q, /∫₂⁵ f\(x\)dx = (\d+)\./)) },
  { has: "Giá trị của ∫₁⁴ [f(x) − 2g(x) + 1]dx bằng", right: (q) => theoSo(q, so(q, /∫₁⁴ f\(x\)dx = (\d+)/) - 2 * so(q, /∫₁⁴ g\(x\)dx = (\d+)/) + (4 - 1)) },
  { has: "Tính ∫₀² (eˣ − x)dx", right: (q) => tpDe(q) },
  { has: "Cho hàm số f(x) = 4x³ − 3x². Mỗi ý", right: (q) => tfTheo(q, menhDeTP(hamDe(q, /f\(x\) = (.+)\. Mỗi ý/))) },
  { has: "Tính ∫₁³ (x² + x − 2)dx.", right: (q) => tpDe(q) },
  // Bài 13. Ứng dụng hình học của tích phân
  { has: "đồ thị hàm số y = 6x − 2x² và trục hoành", right: (q) => { const f = hamDe(q, /y = (.+) và trục hoành/), r = nghiem(f, -10, 10); assert.equal(r.length, 2); return tpAbs(f, r[0], r[1]); } },
  { has: "Một logo vẽ trên mặt phẳng toạ độ Oxy", right: (q) => { const f = hamDe(q, /parabol y = (.+) và y = /), g = hamDe(q, /và y = (.+)\. Chi phí/), h = (x) => f(x) - g(x), r = nghiem(h, -10, 10); assert.equal(r.length, 2); return tpAbs(h, r[0], r[1]) * so(q, /là (\d{1,3}(?: \d{3})*) đồng\/cm²/); } },
  { has: "Quay hình phẳng giới hạn bởi đồ thị hàm số y = √x", right: (q) => { const f = hamDe(q, /y = (.+), trục hoành/), [a, b] = [...q.q.matchAll(/x = (\d+)/g)].map((m) => +m[1]); return theoSo(q, Math.PI * tp((x) => f(x) ** 2, a, b)); } },
  { has: "Phần thân của một chiếc đèn ngủ bằng gỗ", right: (q) => { const f = hamDe(q, /đường thẳng y = (.+) và trục Ox/), [a, b] = [...q.q.matchAll(/x = (\d+)/g)].map((m) => +m[1]); return Math.PI * tp((x) => f(x) ** 2, a, b); } },
  { has: "Hai đồ thị y = x² và y = x + 6 giới hạn một hình phẳng", right: (q) => { const f = hamDe(q, /đồ thị y = (.+) và y = /), g = hamDe(q, /và y = (.+) giới hạn/), h = (x) => g(x) - f(x), r = nghiem(h, -10, 10); assert.equal(r.length, 2); return tpAbs(h, r[0], r[1]); } },
  { has: "Một con mương dẫn nước dài", right: (q) => { const f = hamDe(q, /parabol y = (.+) và đường thẳng/), c = so(q, /đường thẳng y = (\d+)/), h = (x) => c - f(x), r = nghiem(h, -10, 10); assert.equal(r.length, 2); return so(q, /dài (\d+) m/) * tpAbs(h, r[0], r[1]); } },
  // Bài 14. Phương trình mặt phẳng
  { has: "mặt phẳng nào dưới đây vuông góc với mặt phẳng (P): x + y + z − 1 = 0", right: (q) => { const P = mpTrongChu(q.q, "P"); return theo(q, PT, (k) => vgMP(mp(k[1]), P)); } },
  { has: "gốc toạ độ O cách mặt phẳng (P): 2x − 2y + z − 9 = 0 một khoảng bằng", right: (q) => theoSo(q, toNum(kcMP(O3, mpTrongChu(q.q, "P")))) },
  { has: "sao cho tam giác ABC nhận M làm trọng tâm", right: (q) => { const M = ptDe(q, "M"); return theo(q, PT, (k) => { const P = mp(k[1]); if (P.slice(0, 3).some((x) => eq(x, F(0)))) return false; return vEq([0, 1, 2].map((i) => div(neg(div(P[3], P[i])), F(3))), M); }); } },
  { has: "Tính khoảng cách từ D đến mặt phẳng (ABC)", right: (q) => { const [A, B, C, D] = ["A", "B", "C", "D"].map((t) => ptDe(q, t)); return toNum(kcMP(D, mpQua3(A, B, C))); } },
  { has: "song song với (Oxz) có phương trình là", right: (q) => { const A = ptDe(q, "A"); return theo(q, PT, (k) => { const P = mp(k[1]); return ssMP(mp("y = 0"), P) && thuocMP(P, A); }); } },
  { has: "cách A một khoảng bằng 2. Tính tổng các giá trị", right: (q) => { const A = ptDe(q, "A"), L = bacNhat(/\(Q\): (.+) \+ d = 0/.exec(q.q)[1]), n = [L.x, L.y, L.z], f = toNum(vDot(n, A)), k = so(q, /một khoảng bằng (\d+)/) * toNum(vLen(n)); return (-f + k) + (-f - k); } },
  // Bài 15. Phương trình đường thẳng trong không gian
  { has: "đường thẳng d: (x + 2)/3 = (y − 1)/(−2) = z/4 có một vectơ chỉ phương", right: (q) => { const d = dt(/d: (.+) có một/.exec(q.q)[1]); return theo(q, /^u = (\(.+\))$/, (k) => cungPhuong(bo3(k[1]), d.u)); } },
  { has: "đường thẳng đi qua hai điểm A(1; 2; 0) và B(3; −1; 4) có phương trình tham số", right: (q) => { const A = ptDe(q, "A"), B = ptDe(q, "B"); return theo(q, /^(\{.+\})$/, (k) => { const d = dt(k[1]); return thuocDT(d, A) && thuocDT(d, B); }); } },
  { has: "Điểm nào dưới đây không thuộc Δ?", right: (q) => { const d = dt(/Δ: (\{.+\})\./.exec(q.q)[1]); return theo(q, /^[A-Z](\(.+\))$/, (k) => !thuocDT(d, bo3(k[1]))); } },
  // Bài 16. Công thức tính góc trong không gian
  { has: "lần lượt có vectơ chỉ phương u₁ = (1; 1; 0) và u₂ = (1; 0; 1)", right: (q) => gocGiua({ u: vecTrongChu(q.q, "u₁") }, { u: vecTrongChu(q.q, "u₂") }) },
  { has: "Gọi φ là góc giữa Δ và (P). Khẳng định nào dưới đây đúng?", right: (q) => theo(q, /^(.+) = (.+)$/, (k) => dungMoiCap(k[1], k[2], "đt-mp")) },
  { has: "Biết u và n cùng phương. Góc giữa Δ và (P) bằng", right: (q) => { const g = new Set(); for (let k = 0; k < 20; k++) { const u = vecNN(), c = nguyen(1, 4) * (ngau() < 0.5 ? -1 : 1); g.add(Math.round(gocDTMP(u, u.map((x) => x * c)))); } assert.equal(g.size, 1); return theo(q, /^(\d+)°$/, (k) => +k[1] === [...g][0]); } },
  { has: "tính góc giữa mặt phẳng (P): x + z − 2 = 0 và mặt phẳng toạ độ (Oxy)", right: (q) => gocGiua({ n: nMP(mpTrongChu(q.q, "P")) }, { n: k3 }) },
  { has: "tính góc giữa hai mặt phẳng (P): x + 2y − 2z + 1 = 0 và (Q): 4x + 3z − 7 = 0", right: (q) => gocGiua({ n: nMP(mpTrongChu(q.q, "P")) }, { n: nMP(mpTrongChu(q.q, "Q")) }) },
  { has: "tính góc giữa đường thẳng Δ có vectơ chỉ phương u = (1; 1; 0) và mặt phẳng (P): x + z − 3 = 0", right: (q) => gocGiua({ u: vecTrongChu(q.q, "u") }, { n: nMP(mpTrongChu(q.q, "P")) }) },
  { has: "cho hai mặt phẳng (P), (Q) lần lượt có vectơ pháp tuyến n, n′. Khẳng định nào", right: (q) => theo(q, /^(.+) = (.+)$/, (k) => dungMoiCap(k[1], k[2], "mp-mp")) },
  { has: "cho đường thẳng d: (x − 1)/2 = y/(−1) = (z + 3)/2 và mặt phẳng (P): 2x + y + 2z − 5 = 0", right: (q) => {
    const d = dt(/d: (.+) và mặt phẳng/.exec(q.q)[1]), P = mpTrongChu(q.q, "P");
    return tfTheo(q, menhDeGoc({ d: { u: d.u }, "(P)": { n: nMP(P) }, Oz: { u: k3 }, "(Oxy)": { n: k3 } })); } },
  { has: "cho hình chóp S.OABC, với O là gốc toạ độ", right: (q) => {
    const A = ptDe(q, "A"), C = ptDe(q, "C"), S = ptDe(q, "S"), B = vAdd(A, C);
    assert.ok(eq(vDot(A, C), F(0)) && eq(vDot(A, A), vDot(C, C)) && eq(A[2], F(0)) && eq(C[2], F(0)) && eq(S[0], F(0)) && eq(S[1], F(0)), "đáy OABC là hình vuông trên (Oxy), S trên trục Oz");
    const { D } = doc(q, kiemChieu, { O: O3, A, B, C, S }, "hình chóp"), ce = canhHinh(q.svg, D);
    assert.deepEqual([ce.thay.sort(), ce.khuat], [["A-B", "A-S", "B-C", "B-S", "C-S"], []], "hình chóp: các cạnh vẽ trong hình");
    return tfTheo(q, menhDeGoc({ "(SAB)": { n: vCross(vSub(A, S), vSub(B, A)) }, "(OABC)": { n: k3 }, SB: { u: vSub(B, S) }, AC: { u: vSub(C, A) }, SA: { u: vSub(A, S) }, SC: { u: vSub(C, S) } })); } },
  { has: "một cột thẳng đứng có chân H(1; 1; 0) và đỉnh A(1; 1; 5)", right: (q) => {
    const [Hh, A, B] = ["H", "A", "B"].map((t) => ptDe(q, t)); assert.ok(eq(Hh[0], A[0]) && eq(Hh[1], A[1]) && eq(Hh[2], F(0)) && eq(B[2], F(0)), "cột thẳng đứng, chân cột và điểm neo trên mặt đất");
    const { D } = doc(q, kiemChieu, { O: O3, H: Hh, A, B }, "cột"), ce = canhHinh(q.svg, D);
    assert.deepEqual([ce.thay.sort(), ce.khuat], [["A-B", "A-H"], ["B-H"]], "cột: dây AB, cột AH, hình chiếu HB nét đứt"); cungGoc(q.svg, D, "B", "A", "H", "cột");
    return gocGiua({ u: vSub(B, A) }, { n: k3 }); } },
  { has: "Hai sợi cáp nối từ A tới hai điểm neo M(5; 0; 0) và N(0; 9; 0)", right: (q) => {
    const [A, M, N] = ["A", "M", "N"].map((t) => ptDe(q, t)), { D } = doc(q, kiemChieu, { O: O3, A, M, N }, "tháp"), ce = canhHinh(q.svg, D);
    assert.deepEqual([ce.thay.sort(), ce.khuat], [["A-M", "A-N", "A-O"], []], "tháp: tháp OA, hai sợi cáp AM, AN"); cungGoc(q.svg, D, "A", "M", "N", "tháp");
    return gocGiua({ u: vSub(M, A) }, { u: vSub(N, A) }); } },
  { has: "một tấm pin mặt trời hình chữ nhật ABCD được lắp nghiêng", essay: (q) => {
    const [A, B, C, D] = ["A", "B", "C", "D"].map((t) => ptDe(q, t));
    assert.ok(vEq(vAdd(B, vSub(D, A)), C) && eq(vDot(vSub(B, A), vSub(D, A)), F(0)), "ABCD là hình chữ nhật");
    const n = vCross(vSub(B, A), vSub(D, A)), dk = vDot(n, k3), cs = div(cmp(dk, F(0)) < 0 ? neg(dk) : dk, vLen(n)), g = gocGiua({ n }, { n: k3 }), so3 = (v) => v.map((x) => fmtDec(x, 1).replace(/,0$/, "")).join("; ");
    assert.ok(isR(cs), "côsin là số hữu tỉ");
    essayCheck(q, ["[AB, AD] = (" + so3(n) + ")", "= " + cs.n + "/" + cs.d, "≈ " + fmtDec(g, 1) + "°"], ["= (" + so3(n) + ")", "≈ " + fmtDec(g, 1) + "°", "Đáp số: khoảng " + fmtDec(g, 1) + "°."]); } },
  // Bài 17. Phương trình mặt cầu
  { has: "cho mặt cầu (S) như hình vẽ (toạ độ tâm I và bán kính R ghi trên hình). Phương trình của (S) là", right: (q) => { const { I, R } = doc(q, docCau, "mặt cầu 1"); return theo(q, PT, (k) => { const c = cau(k[1]); return !!c && vEq(c.I, I.map((x) => F(x))) && eq(c.R2, F(R * R)); }); } },
  { has: "mặt cầu (S): x² + y² + z² − 4x + 2y − 6z + 5 = 0 có tâm I và bán kính R là", right: (q) => { const c = cau(/\(S\): (.+ = 0) có tâm/.exec(q.q)[1]); return theo(q, /^I(\(.+\)), R = (.+)$/, (k) => vEq(bo3(k[1]), c.I) && eq(mul(fr(k[2]), fr(k[2])), c.R2)); } },
  { has: "cho mặt cầu (S): x² + y² + z² + 2x − 4y − 4 = 0. Mỗi ý", right: (q) => tfTheo(q, menhDeCau(cau(/\(S\): (.+ = 0)\./.exec(q.q)[1]))) },
  { has: "Mặt cầu đường kính AB có tâm I(a; b; c) và bán kính R. Tính a + b + c + R.", right: (q) => { const A = ptDe(q, "A"), B = ptDe(q, "B"), I = A.map((x, i) => div(add(x, B[i]), F(2))); return toNum(I.reduce(add, F(0))) + toNum(div(vLen(vSub(B, A)), F(2))); } },
  { has: "một bóng đèn đặt tại điểm L(4; 3; 4)", right: (q) => { const L = vn(ptDe(q, "L")), R = so(q, /cách nó không quá (\d+) m/); assert.equal(so(q, /bán kính (\d+)/), R); const h2 = R * R - L[1] ** 2 - L[2] ** 2; assert.ok(h2 > 0); return 2 * Math.sqrt(h2); } },
  { has: "mặt cầu có tâm I(1; −2; 0) và bán kính R = 3 có phương trình là", right: (q) => { const I = ptDe(q, "I"), R = so(q, /R = (\d+)/); return theo(q, PT, (k) => { const c = cau(k[1]); return !!c && vEq(c.I, I) && eq(c.R2, F(R * R)); }); } },
  { has: "Điểm nào dưới đây nằm trong mặt cầu (S)?", right: (q) => { const c = cau(/\(S\): (.+ = \d+)\./.exec(q.q)[1]); return theo(q, /^[A-Z](\(.+\))$/, (k) => viTriCau(c, bo3(k[1])) < 0); } },
  { has: "cho mặt cầu (S) có tâm I(2; −1; 1) và đi qua điểm A(0; 1; 2). Mỗi ý", right: (q) => { const I = ptDe(q, "I"), A = ptDe(q, "A"); return tfTheo(q, menhDeCau({ I, R2: vDot(vSub(A, I), vSub(A, I)) }, { A })); } },
  { has: "Tính tổng các giá trị của m để điểm M(m; 4; −1) thuộc (S).", right: (q) => { const c = cau(/\(S\): (.+ = \d+)\./.exec(q.q)[1]), m = /M\(m; (.+?); (.+?)\)/.exec(q.q), y = fr(m[1]), z = fr(m[2]);
    const con = sub(sub(c.R2, mul(sub(y, c.I[1]), sub(y, c.I[1]))), mul(sub(z, c.I[2]), sub(z, c.I[2]))); assert.ok(cmp(con, F(0)) > 0, "cần hai giá trị của m"); return toNum(mul(F(2), c.I[0])); } },
  { has: "mặt cầu (S) đi qua gốc toạ độ O và ba điểm A(2; 0; 0), B(0; 4; 0), C(0; 0; 6)", right: (q) => { const P = [O3, ptDe(q, "A"), ptDe(q, "B"), ptDe(q, "C")].map(vn), [a, b, c, d] = giai4(P.map((p) => [-2 * p[0], -2 * p[1], -2 * p[2], 1]), P.map((p) => -dotR(p, p))); return Math.sqrt(a * a + b * b + c * c - d); } },
  { has: "phương trình nào dưới đây là phương trình của một mặt cầu?", right: (q) => theo(q, PT, (k) => cau(k[1]) !== null) },
  { has: "Mặt cầu (S) chứa điểm nào dưới đây?", right: (q) => { const { I, R } = doc(q, docCau, "mặt cầu 2"); return theo(q, /^[A-Z](\(.+\))$/, (k) => { const M = vn(bo3(k[1])); return Math.abs(Math.hypot(M[0] - I[0], M[1] - I[1], M[2] - I[2]) - R) < 1e-9; }); } },
  { has: "cho phương trình x² + y² + z² − 6x + 2z + m = 0 (m là tham số)", right: (q) => {
    const e = /phương trình (.+ = 0) \(m là tham số\)/.exec(q.q)[1], voiM = (m) => cau(e.replace("+ m = 0", (m < 0 ? "− " : "+ ") + String(Math.abs(m)).replace(".", ",") + " = 0"));
    return tfTheo(q, (s) => {
      let m;
      if ((m = /^Khi phương trình là phương trình mặt cầu, tâm của mặt cầu là I(\(.+\))$/.exec(s))) return [-7, 0, 3.5].every((v) => vEq(voiM(v).I, bo3(m[1])));
      if ((m = /^Phương trình đã cho là phương trình của một mặt cầu khi và chỉ khi m < (\d+)$/.exec(s))) { const v = +m[1]; return [-30, -2, 0, v - 0.5, v - 0.01, v, v + 0.01, v + 3, 40].every((x) => (voiM(x) !== null) === (x < v)); }
      if ((m = /^Khi m = (\d+), mặt cầu có bán kính bằng (\d+)$/.exec(s))) return eq(voiM(+m[1]).R2, F(+m[2] * +m[2]));
      if ((m = /^Khi m = (\d+), gốc toạ độ O nằm (ngoài|trong) mặt cầu$/.exec(s))) { const k = viTriCau(voiM(+m[1]), O3); return m[2] === "ngoài" ? k > 0 : k < 0; }
      throw new Error("mệnh đề lạ: " + s);
    }); } },
  { has: "có tâm I nằm trên trục Ox; hai điểm A(1; 2; 2) và B(3; 0; 4) cùng thuộc (S)", right: (q) => { const A = ptDe(q, "A"), B = ptDe(q, "B"); return toNum(div(sub(vDot(B, B), vDot(A, A)), mul(F(2), sub(B[0], A[0])))); } },
  { has: "Tính khoảng cách lớn nhất từ một điểm thuộc (S) đến (P).", right: (q) => { const c = cau(/\(S\): (.+ = \d+) và mặt phẳng/.exec(q.q)[1]); return toNum(kcMP(c.I, mpTrongChu(q.q, "P"))) + Math.sqrt(toNum(c.R2)); } },
  // Bài 18. Xác suất có điều kiện
  { has: "P(B) = 0,4 và P(AB) = 0,26. Khi đó P(A | B) bằng", right: (q) => { const p = docP(q.q); return theoSo(q, toNum(div(p.AB, p.B))); } },
  { has: "Theo công thức nhân xác suất, P(AB) bằng", right: (q) => { const p = docP(q.q); return theoSo(q, toNum(mul(p.A, p["B | A"]))); } },
  { has: "Cho hai biến cố độc lập A và B với P(A) = 0,45 và P(B) = 0,6", right: (q) => { const p = docP(q.q), mo = moHinh2(p.A, p.B, mul(p.A, p.B)); return theoSo(q, toNum(xacSuat(mo, "A | B"))); } },
  { has: "P(A) = 0,5, P(B) = 0,6 và P(A | B) = 0,7. Khi đó P(B | A) bằng", right: (q) => { const p = docP(q.q), mo = moHinh2(p.A, p.B, mul(p.B, p["A | B"])); return theoSo(q, toNum(xacSuat(mo, "B | A"))); } },
  { has: "Lớp 12A có 40 học sinh gồm 20 nam và 20 nữ", right: (q) => {
    const n = so(q, /có (\d+) học sinh/), nam = so(q, /gồm (\d+) nam/), nu = so(q, /và (\d+) nữ;/), bn = so(q, /có (\d+) bạn nam/), bu = so(q, /và (\d+) bạn nữ biết bơi/); assert.equal(nam + nu, n);
    // A: biết bơi, B: nam
    return tfTheo(q, menhDeP(hopLe({ "11": F(bn, n), "10": F(bu, n), "01": F(nam - bn, n), "00": F(nu - bu, n) }))); } },
  { has: "P(A) = 0,25, P(B) = 0,6 và P(AB) = 0,15", right: (q) => { const p = docP(q.q); return tfTheo(q, menhDeP(moHinh2(p.A, p.B, p.AB))); } },
  { has: "Một hộp đựng 6 quả bóng xanh và 4 quả bóng đỏ", right: (q) => { const b = [...Array(so(q, /đựng (\d+) quả bóng xanh/)).fill("X"), ...Array(so(q, /và (\d+) quả bóng đỏ/)).fill("Đ")]; let nB = 0, nAB = 0;
    b.forEach((u, i) => b.forEach((v, j) => { if (i !== j && u === "X") { nB++; if (v === "Đ") nAB++; } })); return nAB / nB; } },
  { has: "Một cung thủ bắn hai mũi tên vào bia.", right: (q) => { const p = so(q, /mũi thứ nhất trúng bia là (0,\d+)/), a = so(q, /trúng thì xác suất mũi thứ hai trúng là (0,\d+)/), b = so(q, /trượt thì xác suất mũi thứ hai trúng là (0,\d+)/), hm = p * (1 - a), mh = (1 - p) * b; return hm / (hm + mh); } },
  { has: "Tung cùng lúc hai con xúc xắc cân đối.", right: (q) => { const t = so(q, /tổng số chấm của hai con bằng (\d+)/), m = so(q, /ra mặt (\d+) chấm/); let nB = 0, nAB = 0;
    for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) if (i === m || j === m) { nB++; if (i + j === t) nAB++; } return nAB / nB; } },
  { has: "Một khu dân cư có 200 hộ gia đình", right: (q) => { const n = so(q, /có (\d+) hộ gia đình/), oto = so(q, /trong đó (\d+) hộ có ô tô/), xd = so(q, /(\d+) hộ có xe máy điện/), ca = so(q, /và (\d+) hộ có cả/); assert.ok(ca <= Math.min(oto, xd) && oto + xd - ca <= n); return ca / oto; } },
  { has: "Một hộp có 3 thẻ đỏ và 5 thẻ xanh.", right: (q) => { const t = [...Array(so(q, /có (\d+) thẻ đỏ/)).fill("Đ"), ...Array(so(q, /và (\d+) thẻ xanh/)).fill("X")]; let nB = 0, nAB = 0;
    t.forEach((u, i) => t.forEach((v, j) => { if (i !== j && (u === "Đ" || v === "Đ")) { nB++; if (u === "Đ" && v === "Đ") nAB++; } })); return nAB / nB; } },
  { has: "Một cửa hàng thống kê 400 lượt mua hàng", essay: (q) => {
    const n = so(q, /thống kê (\d+) lượt/), nB = so(q, /có (\d+) lượt khách dùng thẻ/), nAB = so(q, /dùng thẻ thành viên, trong đó (\d+) lượt/), nBc = so(q, /; (\d+) lượt khách không dùng thẻ/), nABc = so(q, /không dùng thẻ, trong đó (\d+) lượt/);
    assert.equal(nB + nBc, n); const p1 = F(nAB, nB), p2 = F(nABc, nBc), k = toNum(div(p1, p2)), ps = (p) => p.n + "/" + p.d;
    essayCheck(q, [`n(B) = ${nB}, n(AB) = ${nAB}`, `P(A | B) = ${nAB}/${nB} = ${ps(p1)}`, `P(A | B̄) = ${nABc}/${nBc} = ${ps(p2)}`, `P(A | B) = ${k} · P(A | B̄)`, `gấp ${k} lần`], [`P(A | B) = ${nAB}/${nB} = ${ps(p1)}`, `P(A | B̄) = ${nABc}/${nBc} = ${ps(p2)}`, `Đáp số: ${ps(p1)} và ${ps(p2)}; gấp ${k} lần.`]); } },
  // Bài 19. Công thức xác suất toàn phần và công thức Bayes
  { has: "Theo công thức xác suất toàn phần, P(B) bằng", right: (q) => { const c = doc(q, docCay, "sơ đồ 1"); assert.ok(!c.hoi); return theoSo(q, toNum(xacSuat(moHinh(c), "B"))); } },
  { has: "với điều kiện A hoặc Ā. Mỗi ý sau đúng hay sai?", right: (q) => { const c = doc(q, docCay, "sơ đồ 2"); assert.ok(!c.hoi); return tfTheo(q, menhDeP(moHinh(c))); } },
  { has: "Một bộ lọc kiểm tra mọi thư điện tử gửi đến.", right: (q) => { const c = doc(q, docCay, "sơ đồ 3"); assert.equal(c.hoi, "BAc", "dấu ? ở nhánh B của Ā"); return toNum(xacSuat(moHinh(c), "A | B")); } },
  { has: "Cho hai biến cố A, B với 0 < P(A) < 1. Công thức xác suất toàn phần là", right: (q) => theo(q, /^P\(B\) = (.+)$/, (k) => dungMoiMoHinh((mo) => gan(bieuThucP(mo, k[1]), toNum(xacSuat(mo, "B"))))) },
  { has: "Theo công thức Bayes, P(A | B) bằng", right: (q) => theo(q, /^(.+)$/, (k) => dungMoiMoHinh((mo) => gan(bieuThucP(mo, k[1]), toNum(xacSuat(mo, "A | B"))))) },
  { has: "Một nhà máy có hai phân xưởng:", right: (q) => { const x = [...q.q.matchAll(/làm ra (\d+)% số sản phẩm, trong đó (\d+)% là sản phẩm lỗi/g)].map((m) => [+m[1] / 100, +m[2] / 100]); assert.equal(x.length, 2); assert.ok(gan(x[0][0] + x[1][0], 1)); return x[0][0] * x[0][1] + x[1][0] * x[1][1]; } },
  { has: "Một dây chuyền đóng gói có 4% sản phẩm bị lỗi.", right: (q) => { const p = so(q, /có (\d+)% sản phẩm bị lỗi/) / 100, a = so(q, /báo lỗi đúng với (\d+)%/) / 100, b = so(q, /báo lỗi nhầm với (\d+)%/) / 100; return p * a / (p * a + (1 - p) * b); } },
  { has: "Hộp thứ nhất đựng 3 bi đỏ, 1 bi xanh", right: (q) => {
    const m = /thứ nhất đựng (\d+) bi đỏ, (\d+) bi xanh; hộp thứ hai đựng (\d+) bi đỏ, (\d+) bi xanh/.exec(q.q).slice(1).map(Number);
    const h1 = [...Array(m[0]).fill("Đ"), ...Array(m[1]).fill("X")], h2 = [...Array(m[2]).fill("Đ"), ...Array(m[3]).fill("X")]; let n = 0, d = 0;
    h1.forEach((b) => [...h2, b].forEach((c) => { n++; if (c === "Đ") d++; })); return d / n; } },
  { has: "70% học sinh lớp 12 ôn tập đều đặn", right: (q) => { const p = so(q, /(\d+)% học sinh lớp 12/) / 100, a = so(q, /đều đặn là (0,\d+)/), b = so(q, /nhóm còn lại là (0,\d+)/); return p * a / (p * a + (1 - p) * b); } },
  { has: "Xác suất để một ngày trời mưa là 0,2.", right: (q) => { const p = so(q, /trời mưa là (0,\d+)/), a = so(q, /Bình mang ô khi đi học là (0,\d+)/), b = so(q, /xác suất đó là (0,\d+)/); return p * a + (1 - p) * b; } },
  { has: "Trong hộp có 3 đồng xu thường (cân đối)", right: (q) => { const t = so(q, /có (\d+) đồng xu thường/), s = so(q, /và (\d+) đồng xu có hai mặt/); let nB = 0, nAB = 0;
    for (let i = 0; i < t + s; i++) for (const mat of ["sấp", "ngửa"]) if ((i < t ? mat : "sấp") === "sấp") { nB++; if (i < t) nAB++; } return nAB / nB; } },
  { has: "Trong mùa cúm, 10% học sinh của một trường mắc cúm.", right: (q) => { const p = so(q, /(\d+)% học sinh của một trường/) / 100, a = so(q, /dương tính với (\d+)% người mắc cúm/) / 100, b = so(q, /và với (\d+)% người không mắc cúm/) / 100; return p * a / (p * a + (1 - p) * b); } },
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
// số đề, số câu lấy từ danh mục: đề cố định là các đề trong from của đề ngẫu nhiên, mọi đề cố định cuối năm của file đều ở đó
const pool = bank(POOL), DE = pool.pool.from, mine = pool.questions.filter((q) => q.src === POOL);
assert.deepEqual(BANKS.filter((b) => b.file === "12-toan.js" && /^toan12-ck2-de\d+$/.test(b.id)).map((b) => b.id), DE, "đề cố định cuối năm nào cũng phải ở from của " + POOL);
for (const id of DE) { const b = bank(id); assert.ok(b, "thiếu " + id); assert.equal(b.questions.length, b.n); run(id, b.questions); }
run(POOL, mine);
assert.equal(dung.size, CHECKS.length, "có mục kiểm tra không khớp câu nào: " + CHECKS.filter((c) => !dung.has(c.has)).map((c) => c.has).join(" | "));
// hình nào cũng được đọc lại; chữ trong hình vừa khung, không đè nhau
const hinh = pool.questions.filter((q) => q.svg);
assert.equal(hinh.filter((q) => hinhDaDoc.has(q.svg)).length, hinh.length, "hình nào cũng được đọc lại");
hinh.forEach((q) => chuHinh(q.svg, q.q.slice(0, 40)));

/* ---------- tự thử các bộ đọc với giá trị biết trước và với câu, hình cố ý viết sai ---------- */
{
  // góc: hai đường thẳng, đường thẳng và mặt phẳng, hai mặt phẳng; định nghĩa và công thức khớp nhau
  assert.ok(gan(gocDT([1, 1, 0], [1, 0, 1]), 60) && gan(gocDT([1, 0, 0], [-1, 1, 0]), 45) && gan(gocDTMP([1, 1, 0], [1, 0, 1]), 30) && gan(gocMP([1, 0, 1], [0, 0, 1]), 45) && gan(gocMP([1, 2, 2], [2, 1, -2]), 90));
  assert.ok(dungMoiCap("sin φ", "|cos(u, n)|", "đt-mp") && !dungMoiCap("cos φ", "|cos(u, n)|", "đt-mp") && dungMoiCap("cos((P), (Q))", "|cos(n, n′)|", "mp-mp") && !dungMoiCap("cos((P), (Q))", "cos(n, n′)", "mp-mp"));
  assert.ok(menhDeGoc({ d: { u: [F(0), F(0), F(1)] }, "(P)": { n: [F(0), F(0), F(1)] } })("Góc giữa d và (P) bằng 90°"));
  // mặt cầu
  const c1 = cau("x² + y² + z² − 4x + 2y − 6z + 5 = 0"); assert.ok(vEq(c1.I, [F(2), F(-1), F(3)]) && eq(c1.R2, F(9)));
  const c2 = cau("(x + 1)² + (y − 3)² + z² = 16"); assert.ok(vEq(c2.I, [F(-1), F(3), F(0)]) && eq(c2.R2, F(16)));
  assert.equal(cau("x² + y² + z² − 2x + 4z + 5 = 0"), null); assert.equal(cau("x² + y² + z² + 2xy − 1 = 0"), null); assert.equal(cau("2x² + y² + z² − 1 = 0"), null);
  assert.ok(cau("2x² + 2y² + 2z² − 4x − 6 = 0") && eq(cau("2x² + 2y² + 2z² − 4x − 6 = 0").R2, F(4)));
  // xác suất
  const mo = moHinh({ A: F(3, 10), BA: F(4, 5), BAc: F(2, 5) }); assert.ok(eq(xacSuat(mo, "B"), F(13, 25)) && eq(xacSuat(mo, "A | B"), F(6, 13)) && eq(xacSuat(mo, BN), F(12, 25)) && eq(xacSuat(mo, AN + "B"), F(7, 25)));
  assert.ok(gan(bieuThucP(mo, "P(A) · P(B | A)/P(B)"), 6 / 13) && !dungMoiMoHinh((m) => gan(bieuThucP(m, "P(B | A) + P(B | Ā)"), toNum(xacSuat(m, "B")))));
  assert.throws(() => moHinh2(F(1, 5), F(1, 2), F(3, 10)), /xác suất âm/);
  // bộ đọc hình bắt được hình vẽ sai
  const tim = (has) => pool.questions.find((q) => q.q.includes(has));
  const q1 = tim("cho mặt cầu (S) như hình vẽ");
  assert.throws(() => docCau(q1.svg.replace(">I(2; 3; 2)<", ">I(2; 3; 3)<"), "thử"), /tâm đường tròn không khớp/);
  assert.throws(() => docCau(q1.svg.replace(`r="${/r="(\d+)" fill="acc-soft"/.exec(q1.svg)[1]}" fill="acc-soft"`, 'r="66" fill="acc-soft"'), "thử"), /bán kính đường tròn không khớp/);
  assert.throws(() => docCau(q1.svg.replace(">R = 2<", ">R = 3<"), "thử"), /bán kính đường tròn không khớp/);
  const q3 = tim("Một bộ lọc kiểm tra mọi thư"), q2 = tim("với điều kiện A hoặc Ā. Mỗi ý sau đúng hay sai?");
  assert.throws(() => docCay(q3.svg.replace(">0,1</text>", ">0,2</text>"), "thử"), /cộng lại phải bằng 1/);
  assert.throws(() => docCay(q2.svg.replace(">0,7</text>", ">?</text>").replace(">0,3</text>", ">?</text>"), "thử"), /hai dấu \? cùng gốc/);
  const qC = tim("cho hình chóp S.OABC"), DC = diem(qC.svg, "thử");
  assert.throws(() => kiemChieu(qC.svg.replace(`cx="${DC.B[0]}" cy="${DC.B[1]}"`, `cx="${DC.B[0] + 6}" cy="${DC.B[1]}"`).replace(/(<text x=")([\d.]+)(" y="[\d.]+"[^>]*>B<)/, (m, a, x, b) => a + (+x + 6) + b), { O: O3, A: [F(2), F(0), F(0)], B: [F(2), F(2), F(0)], C: [F(0), F(2), F(0)], S: [F(0), F(0), F(2)] }, "thử"), /không khớp toạ độ/);
  const qT = tim("Hai sợi cáp nối từ A"), DT_ = diem(qT.svg, "thử");
  assert.throws(() => cungGoc(qT.svg, DT_, "A", "M", "O", "thử"), /cung đánh dấu góc phải nằm giữa hai tia/);
}

/* ---------- mức độ và ma trận ---------- */
assert.ok(pool.questions.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M), CHU_DE = Object.keys(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => cells.reduce((s, v) => s + v[k], 0)), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
const ON = ["Nguyên hàm", "Tích phân", "Ứng dụng hình học của tích phân", "Phương trình mặt phẳng", "Phương trình đường thẳng trong không gian"];
const MOI = ["Công thức tính góc trong không gian", "Phương trình mặt cầu", "Xác suất có điều kiện", "Công thức xác suất toàn phần và công thức Bayes"];
assert.deepEqual(CHU_DE, [...ON, ...MOI], "9 chủ đề theo tên Bài 11–19");
const nhomCD = (ts) => ts.reduce((s, t) => s + M[t].reduce((a, b) => a + b, 0), 0);
assert.deepEqual([nhomCD(ON), nhomCD(MOI), nhomCD(MOI.slice(0, 2)), nhomCD(MOI.slice(2))], [8, 17, 9, 8], "8 câu ôn Bài 11–15; 17 câu Bài 16–19 (góc, mặt cầu 9; xác suất 8)");
CHU_DE.forEach((t) => assert.ok(("chu-de:12:toan:" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
// phần ôn mang đúng chữ chủ đề của kho giữa kì II; chủ đề mới không trùng chủ đề nào của kho cuối kì I, giữa kì II
const gk2 = bank("toan12-gk2-ngau-nhien"), ck1 = bank("toan12-ck1-ngau-nhien"); assert.ok(gk2 && ck1, "thiếu kho giữa kì II hoặc cuối kì I");
ON.forEach((t) => assert.ok(gk2.pool.matrix[t], "chủ đề ôn phải đúng chữ chủ đề của kho giữa kì II: " + t));
MOI.forEach((t) => assert.ok(!gk2.pool.matrix[t] && !ck1.pool.matrix[t], "chủ đề mới trùng chủ đề của kho khác: " + t));
// lời dặn ghi đúng số câu của hai phần
DE.concat(POOL).forEach((id) => assert.ok(bank(id).note.includes(`${nhomCD(MOI)} câu phần sau giữa kì II (Bài 16–19`) && bank(id).note.includes(`${nhomCD(ON)} câu ôn Bài 11–15`), id + ": lời dặn ghi số câu hai phần"));
// hai đề cố định và phần câu riêng đều chia đúng ma trận
[...pool.pool.from.map((id) => [id, bank(id).questions]), [POOL, mine]].forEach(([id, qs]) => Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => qs.filter((q) => q.topic === t && q.lv === l).length), v, id + " không đúng ma trận ở chủ đề " + t)));
assert.ok(pool.questions.every((q) => M[q.topic]), "mọi câu đều có chủ đề trong ma trận");
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
// hình: đủ các loại lời giao việc yêu cầu (mặt cầu trong hệ trục Oxyz, góc giữa hai đường thẳng, đường thẳng và mặt phẳng, sơ đồ hình cây)
assert.ok(hinh.filter((q) => /<title>Mặt cầu \(S\) trong hệ trục Oxyz/.test(q.svg)).length >= 2, "ít nhất hai hình mặt cầu trong hệ trục Oxyz");
assert.ok(hinh.filter((q) => /Oxyz/.test(q.svg)).length >= 4, "ít nhất bốn hình trong hệ trục Oxyz");
assert.ok(hinh.filter((q) => /<path d="M [\d.]+ [\d.]+ A /.test(q.svg)).length >= 2, "ít nhất hai hình có cung đánh dấu góc");
assert.ok(hinh.filter((q) => /<title>Sơ đồ hình cây/.test(q.svg)).length >= 2, "ít nhất hai sơ đồ hình cây");
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

/* ---------- dò lộ đáp án (Rút ra N5, N24, N8; như tests/toan12-gk2.js) giữa hai câu rút được cùng lúc. Đề ngẫu nhiên rút một hoặc hai
   câu mỗi ô, đề “Ôn chủ đề” rút chung mọi câu của một chủ đề (trừ tự luận), nên xét mọi cặp câu của kho, trừ cặp có câu tự luận nằm
   cùng một ô rút 1 câu; lời dặn (note) hiện ở màn mở đề nên cũng xét (Rút ra RS9). Đề “Ôn chủ đề” của năm chủ đề ôn rút chung câu của
   kho này và kho giữa kì II, nên xét thêm mọi cặp câu cùng chủ đề của hai kho. Đáp án là số nguyên (từ 10), số thập phân, phân số, số
   âm chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “≈”, “là”, “bằng”, “được”); đáp án bằng chữ có ở câu kia thì chỉ in ra khi chạy
   với DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM, DA_XEM_CHU_DE. ---------- */
const val = (s) => +String(s).replace(/\s/g, "");
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null ? [] : [].concat(q.ans), (q.rubric || []).map((c) => c.c)).map(String);
const KQ = "(?:=|≈|(?:^|[\\s(])(?:là|bằng|được))\\s+";
const SAU = "(?!\\d|,\\d|\\/|°|%|√|π|\\(|\\p{L}|[⁰¹²³⁴⁵⁶⁷⁸⁹ˣ]|\\s*[·+−:](?:\\s|\\d|\\())"; // số đứng trước chữ, ngoặc là hệ số, thừa số
const soKQ = (s) => [...String(s).matchAll(new RegExp(KQ + "(\\d{1,3}(?: \\d{3})*)" + SAU, "gu"))].map((m) => val(m[1]));
const kqLa = (s, a) => new RegExp(KQ + a.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + SAU, "u").test(s);
const cungLuc = (p, q) => p.topic !== q.topic || (p.type !== "essay" && q.type !== "essay") || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2;
const ten = new Map();
DE.forEach((id) => bank(id).questions.forEach((q, i) => ten.set(q.q, id.replace("toan12-ck2-", "") + "#" + (i + 1))));
mine.forEach((q, i) => ten.set(q.q, "own#" + (i + 1)));
const gk2Q = gk2.questions.filter((q) => ON.includes(q.topic));
gk2Q.forEach((q) => ten.set(q.q, "gk2#" + (gk2.questions.indexOf(q) + 1)));
const NOTES = [...new Set([...DE, POOL].map((id) => bank(id).note))].map((s, i) => ({ q: "note" + i, x: s, topic: "note", type: "note", lv: 0 }));
NOTES.forEach((nt) => ten.set(nt.q, nt.q));
const doLo = (qs, name, them = [], cap = () => true) => {
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
      if (p === q || (p.type !== "note" && !cungLuc(p, q)) || !cap(p, q)) return;
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
const DA_XEM = [];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loDA, [], "lộ đáp án:\n" + loDA.join("\n"));
// cùng chủ đề với kho giữa kì II (đề “Ôn chủ đề”): chỉ xét cặp một câu của kho này, một câu của kho kia
const cuaKhoNay = (q) => pool.questions.includes(q);
const loCD = doLo(pool.questions.filter((q) => ON.includes(q.topic)).concat(gk2Q), (q) => ten.get(q.q), [], (p, q) => p.topic === q.topic && cuaKhoNay(p) !== cuaKhoNay(q));
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu cùng chủ đề của kho giữa kì II (xem tay):\n" + loCD.chuLo.join("\n"));
const DA_XEM_CHU_DE = [];
assert.deepEqual(loCD.chuLo, DA_XEM_CHU_DE, "đáp án bằng chữ có ở câu cùng chủ đề của kho giữa kì II đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM_CHU_DE");
assert.deepEqual(loCD.lo, [], "lộ đáp án giữa câu cùng chủ đề của hai kho:\n" + loCD.lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai
{ const tim = (has) => pool.questions.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const khac = tim("Tung cùng lúc hai con xúc xắc"), thuLo = (qs) => { const r = doLo(qs, (q) => q.q.slice(0, 10)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  assert.deepEqual(thuLo([tim("một bóng đèn đặt tại điểm L"), gia(khac, "Đoạn đó dài 24 m.")]), []);
  assert.deepEqual(thuLo([tim("một bóng đèn đặt tại điểm L"), gia(khac, "Độ dài bằng 24.")]), [24]);
  assert.deepEqual(thuLo([tim("Tính ∫₁³ (x² + x − 2)dx."), gia(khac, "Ta có S = 26/3.")]), ["26/3"]);
  assert.deepEqual(thuLo([tim("Một cung thủ bắn hai mũi tên"), gia(khac, "Kết quả ≈ 0,32.")]), ["0,32"]);
  assert.deepEqual(thuLo([tim("đường thẳng d: (x + 2)/3"), gia(khac, "Vectơ u = (3; −2; 4) đã biết.")]), ["u = (3; −2; 4)"]); }

/* ---------- câu ôn không trùng câu cùng chủ đề của kho giữa kì II: đề bài, chuỗi 6 từ của đề bài (bỏ cụm chung của môn), đáp án ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
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
  "đồ thị của hai hàm số", "đồ thị của hàm số", "đồ thị hàm số", "hình phẳng giới hạn bởi đồ thị hàm số", "sinh ra khi quay quanh trục ox",
  "mặt phẳng đi qua điểm", "đường thẳng đi qua hai điểm", "đường thẳng đi qua điểm", "vuông góc với mặt phẳng", "hình hộp chữ nhật",
  // cách nói chung của Bài 16–19 (tên công thức, cách gọi góc, mặt cầu, biến cố như sách)
  "công thức nhân xác suất", "công thức tính xác suất có điều kiện", "theo công thức bayes", "theo công thức xác suất toàn phần", "sơ đồ hình cây",
  "góc giữa hai đường thẳng", "góc giữa đường thẳng và mặt phẳng", "góc giữa hai mặt phẳng", "đơn vị độ", "khẳng định nào dưới đây đúng",
  // cách nêu bối cảnh chung của các bài toán thực tế trong hệ trục toạ độ
  "hệ trục oxyz đơn vị mét", "mặt đất là mặt phẳng oxy",
  "tâm và bán kính", "có tâm i và bán kính r", "là phương trình của một mặt cầu", "phương trình của một mặt cầu", "nằm trong mặt cầu", "nằm ngoài mặt cầu"]
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
{
  const baoGk2 = [], close = (a, b) => Math.abs((typeof a === "number" ? a : toNum(fr(a))) - (typeof b === "number" ? b : toNum(fr(b)))) < 1e-9;
  pool.questions.filter((q) => ON.includes(q.topic)).forEach((q) => gk2Q.filter((p) => p.topic === q.topic).forEach((p) => {
    const at = ten.get(q.q) + " ~ " + ten.get(p.q) + ": ";
    assert.notEqual(gocChu(q.q), gocChu(p.q), at + "đề bài trùng câu của kho giữa kì II");
    const c6 = chuoi(q.q, 6).filter((c) => (" " + khongDau(p.q) + " ").includes(" " + c + " "));
    assert.deepEqual(c6, [], at + "đề bài có chuỗi 6 từ trùng câu của kho giữa kì II: " + c6.join(" | "));
    if (q.type === "mc" && p.type === "mc") assert.notEqual(gocChu(q.o[0]), gocChu(p.o[0]), at + "đáp án trùng câu của kho giữa kì II");
    if (q.type === "num" && p.type === "num") assert.ok(!(close(q.ans, p.ans) && q.unit === p.unit), at + "đáp án số trùng câu của kho giữa kì II");
    chuoi(q.q, 5).filter((c) => (" " + khongDau(p.q) + " ").includes(" " + c + " ")).forEach((c) => baoGk2.push(at + c));
  }));
  if (process.env.DO_GK2) console.log("Chuỗi 5 từ của đề bài câu ôn có ở câu cùng chủ đề của kho giữa kì II (xem tay):\n" + [...new Set(baoGk2)].join("\n"));
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (bỏ dấu, gộp nguyên âm), nếu có ----------
   Chuỗi 8 từ liền nhau của mọi trường chữ (đề bài, lựa chọn, lời giải, thang chấm) không có trong sách; cụm từ chung của môn (tên bài,
   thuật ngữ, lời dặn) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ. */
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const kho = pool.questions.concat(NOTES);
if (SACH.length) {
  assert.ok(SACH.some((f) => /toan-12-tap-2/.test(f)), "OnUp-Book có Toán 12 tập hai");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => chu(q).flatMap((s) => chuoi(s, k).filter((c) => traChu.co(sach, c)).map((c) => `${ten.get(q.q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  const tr8 = [...new Set(bao(8))];
  if (process.env.DO_SACH) console.log("Chuỗi 8 từ trùng sách:\n" + tr8.join("\n"));
  assert.deepEqual(tr8, [], "chuỗi 8 từ trùng chữ của sách");
  // đa thức trong đề (sau “y =”, “f(x) =”, “F(x) =”) không là hàm của ví dụ, bài tập trong sách Toán 12 (như tests/toan12-gk2.js)
  const toan = SACH.filter((f) => /toan-12/.test(f)).map((f) => fs.readFileSync(f, "utf8").replace(/\s+/g, "").replace(/[—–−]/g, "-")).join("|");
  const mauHam = (e) => new RegExp([...e.replace(/\s+/g, "").replace(/[−–]/g, "-")].map((c) => ("⁰¹²³⁴⁵⁶⁷⁸⁹ˣ".includes(c) ? ".?" : c.replace(/[.*+?^${}()|[\]\\/-]/g, "\\$&"))).join(""));
  const hamSach = new Set();
  kho.forEach((q) => chu(q).forEach((s) => { for (const m of s.matchAll(/(?:y|f\(x\)|F\(x\)) = ([^.,;:|]+?)(?=[.,;:|]| trên| có| với| và| là| khi| bằng| đạt| \(|$)/g)) {
    const e = m[1].trim(); if (/\d/.test(e) && /[−+]/.test(e) && e.replace(/\s+/g, "").length >= 6 && mauHam(e).test(toan)) hamSach.add(ten.get(q.q) + ": " + e); } }));
  if (process.env.DO_SACH) console.log("Hàm số trùng sách:\n" + [...hamSach].join("\n"));
  assert.deepEqual([...hamSach], [], "hàm số trùng hàm của ví dụ, bài tập trong sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác (cả kho cuối kì I, giữa kì II cùng file); với
   kho cuối kì I, giữa kì II cùng file: đề bài không có chuỗi 6 từ nào trùng (Rút ra N9-gk1-toan) ---------- */
{
  const ngoai = (b) => !(b.file === "12-toan.js" && /^toan12-ck2-/.test(b.id));
  const khac = BANKS.filter((b) => !b.pool && ngoai(b)).flatMap((b) => b.questions.map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " })))
    .concat(BANKS.filter((b) => b.pool && ngoai(b)).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " }))));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q.q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  const tr8 = [...new Set(bao(8))];
  assert.deepEqual(tr8, [], "chuỗi 8 từ trùng câu của kho khác");
  const cu = BANKS.filter((b) => b.file === "12-toan.js" && /^toan12-(ck1|gk2)-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)).map((q) => " " + khongDau(q.q) + " ");
  const gan6 = [...new Set(pool.questions.flatMap((q) => chuoi(q.q, 6).filter((c) => cu.some((s) => s.includes(" " + c + " "))).map((c) => ten.get(q.q) + ": " + c)))];
  assert.deepEqual(gan6, [], "đề bài gần trùng câu của kho cuối kì I, giữa kì II");
}
console.log(n, "câu đã tính lại hoặc đọc lại hình (" + DE.map((id) => bank(id).questions.length).join(" + ") + " câu của " + DE.length + " đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + pool.questions.length + " câu, " + hinh.length + " hình, ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề; trung bình " + (essays / 400).toFixed(2) + " câu tự luận mỗi lần rút.");
console.log("MATH OK");
