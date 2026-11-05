// Kiểm tra các đề Toán thi thử tốt nghiệp THPT (data/banks/12-toan.js, toan12-tn-de<N>; Phiên N12-tn-toan, các phiên N12-tn-toan-b, -c thêm
// đề rồi mở rộng script này: thêm các mục kiểm tra của đề mới vào RIENG). Đề tính điểm (Phiên K5), khung đề tốt nghiệp THPT từ năm 2025
// (Quyết định 764/QĐ-BGDĐT). Số đề, số câu lấy từ danh mục (không ghi cứng).
// Khung: danh mục (tên, khối 12, môn Toán, file, 90 phút, pts 10, gắn vào tn-thpt-2027); Phần I 12 câu nhiều lựa chọn pt 0,25, Phần II 4 câu
// đúng/sai 4 ý pt 1, Phần III 6 câu trả lời ngắn pt 0,5 (đúng tên part, đúng thứ tự), Quiz.grade điểm tối đa 3 – 4 – 3; đáp án Phần III là số,
// không quá 4 kí tự (dấu trừ, dấu phẩy tính một kí tự), câu dặn làm tròn có tol bằng nửa đơn vị làm tròn và lời giải ghi “≈ …”; mức độ (Phần I
// Biết, Hiểu; Phần II Hiểu, mỗi câu gồm ý từ Biết đến Vận dụng; Phần III Vận dụng); phạm vi (mỗi đề 22 ý Toán 12, 11 ý Toán 11, 1 ý Toán 10
// theo ma trận đề tham khảo năm 2025, mỗi câu Phần II tính 4 ý; chủ đề lớp 12 đúng chữ chủ đề của các kho Toán 12, chủ đề lớp 10, 11 là
// “Lớp 10 · ”, “Lớp 11 · ” và tên chương trong mục lục ở README của sách ở OnUp-Book); lời dặn ghi đúng số câu, số điểm, số ý lớp 12.
// Mỗi câu khớp đúng một mục kiểm (theo chữ has trong đề bài), mục đó đọc số liệu trong đề rồi tính lại đáp án bằng code: trắc nghiệm o[0] (đúng
// một lựa chọn đúng), đúng/sai 4 ý a (từng ý tính lại), trả lời ngắn ans. Bộ đọc chép từ tests/toan12-ck2.js (số hữu tỉ, hàm số, tích phân, toạ
// độ, mặt phẳng, đường thẳng, mặt cầu, xác suất, mặt cầu trong hệ trục Oxyz, sơ đồ hình cây) và tests/toan12-ck1.js (đa thức, phân thức: đạo
// hàm, cực trị, giá trị lớn nhất, nhỏ nhất, tiệm cận; bảng biến thiên, đồ thị trên lưới ô vuông, bảng tần số ghép nhóm, tứ phân vị, phương sai;
// bộ đọc phân thức đổi tên hs → rf). Thêm: họ nghiệm của phương trình lượng giác so với nghiệm tìm bằng số trên [−20; 20], tập nghiệm, tập xác
// định ghi bằng khoảng, đoạn, hợp so trên lưới điểm dày, chỉnh hợp, tổ hợp, đếm trên không gian mẫu liệt kê, hình không gian không có trục (điểm
// có nhãn khớp một phép chiếu song song của toạ độ cho trước; cạnh khuất nét đứt đúng là các cạnh mà hai mặt chứa nó cùng quay lưng về người
// xem; đường cao, đường chéo đáy nét đứt), góc, khoảng cách tính bằng toạ độ, giá trị lớn nhất, nhỏ nhất của bài toán thực tế tìm bằng số.
// Rồi: kiểu Đ/S không lặp trong một đề, mỗi kiểu nhiều nhất hai lần trong các đề thi thử; đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa
// chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn của đề, không lặp chữ của nhãn chủ đề; đề bài không trùng, không gần
// trùng (chuỗi 6 từ) câu của các kho Toán 12 và của đề thi thử khác, đáp án không trùng câu cùng chủ đề; dò lộ đáp án giữa mọi câu của một đề,
// với lời dặn, và giữa câu cùng chủ đề của các đề thi thử và các kho Toán 12 (đề “Ôn chủ đề” rút chung); có ../OnUp-Book thì so mọi trường chữ
// với chữ OCR của mọi cuốn (không chuỗi 8 từ nào trùng; đa thức sau “y =”, “f(x) =” không là hàm của ví dụ, bài tập trong sách Toán 10–12, số mũ
// khớp kí tự bất kì) và với câu của mọi kho khác, cả giữa các đề thi thử. Bộ đọc hình, bộ dò lộ tự thử với hình, câu cố ý viết sai.
// Chạy: node tests/toan12-tn.js → in MATH OK. DO_LO=1: in đáp án bằng chữ có ở câu khác; DO_SACH=1: in chuỗi 6 từ trùng chữ OCR của sách;
// DO_KHO=1: in chuỗi 8 từ trùng câu của kho khác.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);

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

/* ---------- chép từ tests/toan12-ck1.js: đa thức và phân thức hữu tỉ (bộ đọc rf, đổi tên từ hs), bảng biến thiên, đồ thị trên lưới, bảng tần
   số ghép nhóm, mệnh đề về hàm số và mẫu số liệu ---------- */
const pw = (a, k) => { assert.ok(Number.isInteger(k) && k >= 0, "số mũ lạ " + k); let v = F(1); for (let i = 0; i < k; i++) v = mul(v, a); return v; };
const isInt = (a) => isR(a) && a.d === 1;
const frVC = (s) => (s === "−∞" ? -Infinity : s === "+∞" ? Infinity : fr(s));
/* ---------- đa thức (mảng hệ số hữu tỉ, chỉ số = bậc) và phân thức hữu tỉ { P, Q } ---------- */
const Z = () => F(0);
const pTrim = (p) => { p = p.slice(); while (p.length && p[p.length - 1].n === 0) p.pop(); return p; };
const pAdd = (p, q) => pTrim(Array.from({ length: Math.max(p.length, q.length) }, (_, i) => add(p[i] || Z(), q[i] || Z())));
const pScale = (p, c) => pTrim(p.map((a) => mul(a, c)));
const pSub = (p, q) => pAdd(p, pScale(q, F(-1)));
const pMul = (p, q) => { if (!p.length || !q.length) return []; const r = Array.from({ length: p.length + q.length - 1 }, Z); p.forEach((a, i) => q.forEach((b, j) => { r[i + j] = add(r[i + j], mul(a, b)); })); return pTrim(r); };
const pEval = (p, x) => p.reduceRight((s, a) => add(mul(s, x), a), Z());
const pEvalF = (p, x) => p.reduceRight((s, a) => s * x + toNum(a), 0);
const pDer = (p) => pTrim(p.slice(1).map((a, i) => mul(a, F(i + 1))));
const pDivmod = (p, q) => {
  q = pTrim(q); assert.ok(q.length, "chia cho đa thức 0");
  let r = pTrim(p), k = [];
  while (r.length >= q.length) { const t = Array(r.length - q.length).fill(null).map(Z).concat([div(r[r.length - 1], q[q.length - 1])]); k = pAdd(k, t); r = pSub(r, pMul(t, q)); }
  return { k, r };
};
const pGcd = (p, q) => { p = pTrim(p); q = pTrim(q); while (q.length) { const r = pDivmod(p, q).r; p = q; q = r; } return p.length ? pScale(p, div(F(1), p[p.length - 1])) : p; };
const RF = (P, Q) => {
  Q = pTrim(Q || [F(1)]); P = pTrim(P); assert.ok(Q.length, "mẫu bằng 0");
  const g = pGcd(P, Q); if (g.length > 1) { P = pDivmod(P, g).k; Q = pDivmod(Q, g).k; }
  const c = div(F(1), Q[Q.length - 1]); return { P: pScale(P, c), Q: pScale(Q, c) };
};
const rfAdd = (a, b) => RF(pAdd(pMul(a.P, b.Q), pMul(b.P, a.Q)), pMul(a.Q, b.Q));
const rfNeg = (a) => RF(pScale(a.P, F(-1)), a.Q);
const rfSub = (a, b) => rfAdd(a, rfNeg(b));
const rfMul = (a, b) => RF(pMul(a.P, b.P), pMul(a.Q, b.Q));
const rfDiv = (a, b) => { assert.ok(b.P.length, "chia cho 0"); return RF(pMul(a.P, b.Q), pMul(a.Q, b.P)); };
const rfPow = (a, k) => { let v = RF([F(1)]); for (let i = 0; i < k; i++) v = rfMul(v, a); return v; };
const rfEq = (a, b) => !rfSub(a, b).P.length;
// đọc hàm số viết như trong đề: số, biến (mặc định x), chữ khác lấy giá trị trong vars, + − · /, ngoặc, ² ³ ⁴, nhân ngầm ("3x²", "x(48 − 2x)²")
function rf(src, bien, vars) {
  bien = bien || "x"; vars = vars || {};
  const s = String(src).replace(/[−–]/g, "-");
  const toks = []; let i = 0; const SUP = { "²": 2, "³": 3, "⁴": 4 };
  while (i < s.length) {
    const c = s[i], rest = s.slice(i);
    if (c === " ") { i++; continue; }
    const m = /^\d{1,3}(?: \d{3})+(?:,\d+)?(?![\d])/.exec(rest) || /^\d+(?:,\d+)?/.exec(rest);
    if (m) { toks.push({ t: "n", v: RF([fr(m[0])]) }); i += m[0].length; continue; }
    if (SUP[c]) { toks.push({ t: "^", k: SUP[c] }); i++; continue; }
    if ("+-·/()".includes(c)) { toks.push({ t: c }); i++; continue; }
    if (c === bien) { toks.push({ t: "n", v: RF([F(0), F(1)]) }); i++; continue; }
    if (vars[c] !== undefined) { toks.push({ t: "n", v: RF([vars[c]]) }); i++; continue; }
    throw new Error("kí tự lạ “" + c + "” trong " + src);
  }
  let p = 0; const peek = () => toks[p], next = () => toks[p++];
  const atom = () => { const t = next(); assert.ok(t, "thiếu số trong " + src); if (t.t === "n") return t.v; if (t.t === "(") { const v = expr(); assert.equal((next() || {}).t, ")", "thiếu ngoặc đóng trong " + src); return v; } throw new Error("không hiểu " + src); };
  const power = () => { let v = atom(); while (peek() && peek().t === "^") v = rfPow(v, next().k); return v; };
  const unary = () => { const t = peek(); if (t && t.t === "-") { next(); return rfNeg(unary()); } if (t && t.t === "+") { next(); return unary(); } return power(); };
  const term = () => { let v = unary(); for (;;) { const t = peek(); if (t && (t.t === "·" || t.t === "/")) { next(); const w = unary(); v = t.t === "·" ? rfMul(v, w) : rfDiv(v, w); } else if (t && (t.t === "n" || t.t === "(")) v = rfMul(v, power()); else return v; } };
  const expr = () => { let v = term(); while (peek() && (peek().t === "+" || peek().t === "-")) { const op = next().t, w = term(); v = op === "+" ? rfAdd(v, w) : rfSub(v, w); } return v; };
  const v = expr(); assert.equal(p, toks.length, "thừa kí tự trong " + src); return v;
}
const rfDer = (f) => RF(pSub(pMul(pDer(f.P), f.Q), pMul(f.P, pDer(f.Q))), pMul(f.Q, f.Q));
const rfEval = (f, x) => { const q = pEval(f.Q, x); assert.ok(q.n !== 0, "hàm số không xác định tại " + toNum(x)); return div(pEval(f.P, x), q); };
const rfEvalF = (f, x) => pEvalF(f.P, x) / pEvalF(f.Q, x);
const deg = (p) => pTrim(p).length - 1;
// nghiệm thực phân biệt của đa thức, đều phải là số hữu tỉ (câu được soạn với nghiệm hữu tỉ); đa thức còn lại không có nghiệm thực
const divisors = (n) => { n = Math.abs(n); const r = []; for (let i = 1; i * i <= n; i++) if (n % i === 0) { r.push(i); if (i * i !== n) r.push(n / i); } return r; };
const nghiemP = (p) => nghiem0(p, true);
const nghiem0 = (p, chiHuuTi) => {
  p = pTrim(p); const out = [];
  for (;;) {
    if (p.length <= 1) break;
    if (p[0].n === 0) { if (!out.some((r) => eq(r, F(0)))) out.push(F(0)); p = p.slice(1); continue; }
    const L = p.reduce((l, a) => (l * a.d) / gcd(l, a.d), 1), c = p.map((a) => a.n * (L / a.d));
    let found = null;
    for (const s of divisors(c[0])) { for (const t of divisors(c[c.length - 1])) for (const sg of [1, -1]) { const r = F(sg * s, t); if (pEval(p, r).n === 0) { found = r; break; } } if (found) break; }
    if (!found) break;
    if (!out.some((r) => eq(r, found))) out.push(found);
    p = pDivmod(p, [neg(found), F(1)]).k;
  }
  // phần còn lại: không được có nghiệm thực (đổi dấu hoặc chạm 0)
  if (chiHuuTi && p.length > 1) {
    assert.ok(deg(p) % 2 === 0, "đa thức có nghiệm vô tỉ");
    const B = 1 + Math.max(...p.slice(0, -1).map((a) => Math.abs(toNum(a) / toNum(p[p.length - 1])))), s0 = Math.sign(pEvalF(p, 0));
    for (let x = -B; x <= B; x += B / 2000) assert.ok(Math.sign(pEvalF(p, x)) === s0 && Math.abs(pEvalF(p, x)) > 1e-9, "đa thức có nghiệm vô tỉ");
  }
  return out.sort((a, b) => cmp(a, b));
};
// số nghiệm thực phân biệt (cả nghiệm vô tỉ): nghiệm hữu tỉ, rồi đếm số lần đổi dấu của phần còn lại (nghiệm đơn)
const demNghiem = (p) => {
  p = pTrim(p); let k = 0;
  for (const r of nghiem0(p)) { k++; while (pEval(p, r).n === 0) p = pDivmod(p, [neg(r), F(1)]).k; }
  if (p.length > 1) {
    const B = 1 + Math.max(...p.slice(0, -1).map((a) => Math.abs(toNum(a) / toNum(p[p.length - 1])))), h = B / 4000;
    let prev = pEvalF(p, -B);
    for (let x = -B + h; x <= B + 1e-12; x += h) { const v = pEvalF(p, x); assert.ok(Math.abs(v) > 1e-12, "nghiệm vô tỉ trùng điểm lấy mẫu"); if (Math.sign(v) !== Math.sign(prev)) k++; prev = v; }
  }
  return k;
};
const lo = (f) => nghiemP(f.Q); // chỗ hàm số không xác định
const diemTH = (f) => { const d = rfDer(f), h = lo(f); return nghiemP(d.P).filter((x) => !h.some((y) => eq(x, y))); };
const giua = (a, b) => (a === -Infinity && b === Infinity ? F(0) : a === -Infinity ? sub(b, F(1)) : b === Infinity ? add(a, F(1)) : div(add(a, b), F(2)));
const dau = (f, x) => Math.sign(toNum(pEval(f.P, x))) * Math.sign(toNum(pEval(f.Q, x)));
// các khoảng đơn điệu: [{ a, b, s }] với s là dấu của đạo hàm
const bienThien = (f) => {
  const d = rfDer(f), mocs = [...lo(f), ...diemTH(f)].sort((a, b) => cmp(a, b)), ks = [-Infinity, ...mocs, Infinity];
  return ks.slice(1).map((b, i) => ({ a: ks[i], b, s: dau(d, giua(ks[i], b)) }));
};
const cucTri = (f) => {
  const k = bienThien(f), h = lo(f);
  return diemTH(f).map((x) => { const L = k.find((i) => i.b !== Infinity && eq(i.b, x)), R = k.find((i) => i.a !== -Infinity && eq(i.a, x)); return { x, loai: L.s > 0 && R.s < 0 ? "CĐ" : L.s < 0 && R.s > 0 ? "CT" : "", y: rfEval(f, x) }; }).filter((c) => c.loai && !h.some((y) => eq(y, c.x)));
};
const motCucTri = (f, loai) => { const c = cucTri(f).filter((c) => c.loai === loai); assert.equal(c.length, 1, "cần đúng một điểm " + loai); return c[0]; };
// hàm số đồng biến (s = 1) hay nghịch biến (s = −1) trên khoảng (a; b): đạo hàm cùng dấu s trên mọi khoảng con, không có chỗ không xác định
const donDieuTren = (f, a, b, s) => !lo(f).some((x) => (a === -Infinity || cmp(x, a) > 0) && (b === Infinity || cmp(x, b) < 0)) && bienThien(f).every((k) => {
  const lap = (a === -Infinity || k.b === Infinity || cmp(k.b, a) > 0) && (b === Infinity || k.a === -Infinity || cmp(k.a, b) < 0);
  return !lap || k.s === s;
});
const gtTrenDoan = (f, a, b) => {
  assert.ok(!lo(f).some((x) => cmp(x, a) >= 0 && cmp(x, b) <= 0), "hàm số không liên tục trên đoạn");
  const xs = [a, b, ...diemTH(f).filter((x) => cmp(x, a) > 0 && cmp(x, b) < 0)], ys = xs.map((x) => rfEval(f, x));
  return { max: ys.reduce((m, y) => (cmp(y, m) > 0 ? y : m)), min: ys.reduce((m, y) => (cmp(y, m) < 0 ? y : m)) };
};
const tiemCan = (f) => {
  const dP = deg(f.P), dQ = deg(f.Q), lc = (p) => p[p.length - 1];
  const r = { dung: lo(f), ngang: null, xien: null };
  if (dP < dQ) r.ngang = F(0); else if (dP === dQ) r.ngang = div(lc(f.P), lc(f.Q));
  else if (dP === dQ + 1) { const k = pDivmod(f.P, f.Q).k; r.xien = { m: k[1], c: k[0] || F(0) }; }
  return r;
};
// giới hạn khi x → ±∞ (s = ±1): số hữu tỉ hoặc ±Infinity
const gioiHanVC = (f, s) => {
  const t = tiemCan(f); if (t.ngang) return t.ngang;
  const dP = deg(f.P), dQ = deg(f.Q), lc = toNum(f.P[f.P.length - 1]) / toNum(f.Q[f.Q.length - 1]);
  return Math.sign(lc) * (s < 0 && (dP - dQ) % 2 ? -1 : 1) * Infinity;
};
// giới hạn một bên tại chỗ không xác định x0 (s = −1: bên trái, 1: bên phải)
const gioiHanLo = (f, x0, s) => dau(f, add(x0, F(s, 1000))) * Infinity;


/* ---------- bảng biến thiên, bảng xét dấu ----------
   Ba đường kẻ dọc suốt bảng (viền trái, viền phải, đường ngăn cột tên); hàng x ghi các giá trị tăng dần; hàng dấu: "0" ngay dưới giá trị
   của x, "‖" là hai nét dọc ở hàng dấu và hàng giá trị, mỗi khoảng đúng một dấu "+" hoặc "−" ở giữa khoảng; hàng giá trị (bảng biến
   thiên): mỗi giá trị của x một giá trị của hàm số ngay dưới (chỗ "‖" hai giá trị hai bên), mỗi khoảng đúng một mũi tên (đường chéo,
   đầu nhọn ở cuối), mũi tên đi lên khi đạo hàm dương; giá trị ở đầu mũi tên đi lên nằm ở trên, ở cuối nằm ở dưới, và ngược lại. */
const docBBT = (svg, ten) => {
  const L = lines(svg), T = texts(svg), G = polygons(svg);
  const ngang = L.filter((l) => l.a[1] === l.b[1]), doc = L.filter((l) => l.a[0] === l.b[0]), cheo = L.filter((l) => l.a[0] !== l.b[0] && l.a[1] !== l.b[1]);
  const ys = [...new Set(ngang.map((l) => l.a[1]))].sort((a, b) => a - b);
  assert.ok(ys.length === 3 || ys.length === 4, ten + ": bảng cần 2 hoặc 3 hàng");
  const top = ys[0], bot = ys[ys.length - 1];
  const suot = doc.filter((l) => Math.min(l.a[1], l.b[1]) === top && Math.max(l.a[1], l.b[1]) === bot).map((l) => l.a[0]).sort((a, b) => a - b);
  assert.equal(suot.length, 3, ten + ": cần viền trái, viền phải và đường ngăn cột tên");
  const LW = suot[1];
  const nv = doc.filter((l) => Math.min(l.a[1], l.b[1]) === ys[1] && Math.max(l.a[1], l.b[1]) === bot).map((l) => l.a[0]).sort((a, b) => a - b);
  assert.equal(nv.length % 2, 0, ten + ": vạch ‖ phải gồm hai nét");
  const gaps = []; for (let i = 0; i < nv.length; i += 2) { assert.ok(Math.abs(nv[i + 1] - nv[i] - 4) < 0.3, ten + ": hai nét của ‖ cách nhau 4"); gaps.push((nv[i] + nv[i + 1]) / 2); }
  const hang = (t) => ys.findIndex((y, i) => i && t.at[1] > ys[i - 1] && t.at[1] < y) - 1;
  const tenHang = T.filter((t) => t.at[0] < LW).sort((a, b) => a.at[1] - b.at[1]).map((t) => t.t);
  assert.deepEqual(tenHang, ys.length === 4 ? ["x", "f′(x)", "f(x)"] : ["x", "f′(x)"], ten + ": tên các hàng");
  const pts = T.filter((t) => t.at[0] > LW && hang(t) === 0).sort((a, b) => a.at[0] - b.at[0]).map((t) => ({ X: t.at[0], t: t.t, x: frVC(t.t) }));
  pts.forEach((p, i) => i && assert.ok(toNum(p.x) > toNum(pts[i - 1].x), ten + ": các giá trị của x phải tăng dần"));
  const dT = T.filter((t) => t.at[0] > LW && hang(t) === 1);
  const mark = pts.map((p) => { const z = dT.filter((t) => t.t === "0" && Math.abs(t.at[0] - p.X) < 0.6).length, g = gaps.filter((x) => Math.abs(x - p.X) < 0.6).length; assert.ok(z + g <= 1, ten + ": một điểm chỉ có một dấu"); return z ? "0" : g ? "‖" : ""; });
  assert.equal(gaps.length, mark.filter((m) => m === "‖").length, ten + ": vạch ‖ phải ở đúng một giá trị của x");
  const sg = pts.slice(1).map((p, i) => { const s = dT.filter((t) => (t.t === "+" || t.t === "−") && t.at[0] > pts[i].X && t.at[0] < p.X); assert.equal(s.length, 1, ten + ": mỗi khoảng một dấu"); assert.ok(Math.abs(s[0].at[0] - (pts[i].X + p.X) / 2) < 0.6, ten + ": dấu ở giữa khoảng"); return s[0].t === "+" ? 1 : -1; });
  assert.equal(dT.length, mark.filter((m) => m === "0").length + sg.length, ten + ": hàng dấu có chữ lạ");
  assert.ok(mark[0] === "" && mark[mark.length - 1] === "", ten + ": hai đầu bảng không có dấu");
  const r = { pts, mark, sg };
  if (ys.length === 4) {
    const vT = T.filter((t) => t.at[0] > LW && hang(t) === 2), giua_ = (ys[2] + ys[3]) / 2, tren = (t) => t.at[1] < giua_;
    const val = pts.map((p, i) => {
      if (mark[i] === "‖") { const l = vT.filter((t) => t.anchor === "end" && Math.abs(t.at[0] - (p.X - 7)) < 0.6), rr = vT.filter((t) => t.anchor === "start" && Math.abs(t.at[0] - (p.X + 7)) < 0.6); assert.ok(l.length === 1 && rr.length === 1, ten + ": chỗ ‖ cần hai giá trị hai bên"); return [l[0], rr[0]]; }
      const v = vT.filter((t) => t.anchor === "middle" && Math.abs(t.at[0] - p.X) < 0.6); assert.equal(v.length, 1, ten + ": mỗi giá trị của x một giá trị của hàm số"); return [v[0], v[0]];
    });
    assert.equal(vT.length, val.reduce((s, v) => s + (v[0] === v[1] ? 1 : 2), 0), ten + ": hàng giá trị có chữ lạ");
    sg.forEach((s, i) => {
      const ar = cheo.filter((l) => l.a[0] > pts[i].X - 8 && l.b[0] < pts[i + 1].X + 8 && l.a[0] > val[i][1].at[0] - 1);
      assert.equal(ar.length, 1, ten + ": mỗi khoảng một mũi tên");
      const tip = G.map((g) => g[0]).filter((q) => dist(q, ar[0].b) < 12 && q[0] > ar[0].b[0]);
      assert.equal(tip.length, 1, ten + ": mũi tên cần đầu nhọn ở cuối");
      const len = Math.hypot(...subv(tip[0], ar[0].a)), up = tip[0][1] < ar[0].a[1];
      assert.ok(Math.abs(cross(subv(ar[0].b, ar[0].a), subv(tip[0], ar[0].a))) / len < 0.5, ten + ": đầu mũi tên lệch");
      assert.equal(up, s > 0, ten + ": chiều mũi tên phải khớp dấu của đạo hàm");
      assert.ok(tren(val[i][1]) === !up && tren(val[i + 1][0]) === up, ten + ": giá trị ở đầu, cuối mũi tên đặt sai hàng");
    });
    r.val = val.map((v) => v.map((t) => t.t));
  }
  return r;
};
const nhanX = (x) => (x === -Infinity ? "−∞" : x === Infinity ? "+∞" : fmtSo(x));
const fmtSo = (x) => (isInt(x) ? (x.n < 0 ? "−" : "") + Math.abs(x.n) : (x.n < 0 ? "−" : "") + Math.abs(x.n) + "/" + x.d);
const khopGT = (s, v) => (v === Infinity || v === -Infinity ? s === nhanX(v) : !/∞/.test(s) && eq(fr(s), v));
// bảng biến thiên khớp hàm số f (trên ℝ, hoặc trên đoạn [a; b])
const khopBBT = (b, f, ten, doan) => {
  const d = rfDer(f), h = lo(f);
  let moc = [...h.map((x) => ({ x, k: "‖" })), ...diemTH(f).map((x) => ({ x, k: "0" }))].sort((u, v) => cmp(u.x, v.x));
  if (doan) moc = [{ x: doan[0], k: "" }, ...moc.filter((m) => cmp(m.x, doan[0]) > 0 && cmp(m.x, doan[1]) < 0), { x: doan[1], k: "" }];
  else moc = [{ x: -Infinity, k: "" }, ...moc, { x: Infinity, k: "" }];
  assert.deepEqual(b.pts.map((p) => p.t), moc.map((m) => nhanX(m.x)), ten + ": hàng x không khớp hàm số");
  assert.deepEqual(b.mark, moc.map((m) => m.k), ten + ": dấu 0, ‖ không khớp hàm số");
  b.sg.forEach((s, i) => assert.equal(s, dau(d, giua(moc[i].x, moc[i + 1].x)), ten + ": dấu của đạo hàm trên khoảng thứ " + (i + 1)));
  if (b.val) moc.forEach((m, i) => {
    const [l, r] = b.val[i];
    if (m.x === -Infinity || m.x === Infinity) assert.ok(khopGT(l, gioiHanVC(f, m.x > 0 ? 1 : -1)), ten + ": giới hạn tại " + nhanX(m.x));
    else if (m.k === "‖") assert.ok(khopGT(l, gioiHanLo(f, m.x, -1)) && khopGT(r, gioiHanLo(f, m.x, 1)), ten + ": giới hạn hai bên tại " + nhanX(m.x));
    else assert.ok(khopGT(l, rfEval(f, m.x)), ten + ": giá trị tại x = " + nhanX(m.x));
  });
};
// bảng xét dấu khớp đạo hàm g (cho dưới dạng phân thức)
const khopDau = (b, g, ten) => {
  const z = nghiemP(g.P), moc = [-Infinity, ...z, Infinity];
  assert.deepEqual(b.pts.map((p) => p.t), moc.map(nhanX), ten + ": hàng x không khớp đạo hàm");
  assert.deepEqual(b.mark, moc.map((x, i) => (i && i < moc.length - 1 ? "0" : "")), ten + ": dấu 0 không khớp đạo hàm");
  b.sg.forEach((s, i) => assert.equal(s, dau(g, giua(moc[i], moc[i + 1])), ten + ": dấu trên khoảng thứ " + (i + 1)));
};
// các khoảng đọc từ bảng: [{ a, b, s }], chỗ ‖ ghi ở lo
const khoangBang = (b) => ({ k: b.sg.map((s, i) => ({ a: b.pts[i].x, b: b.pts[i + 1].x, s })), lo: b.pts.filter((p, i) => b.mark[i] === "‖").map((p) => p.x) });
const donDieuBang = (b, a, c, s) => { const { k, lo: l } = khoangBang(b); const lt = (u, v) => toNum(u) < toNum(v); return !l.some((x) => lt(a, x) && lt(x, c)) && k.every((i) => !(lt(i.a, c) && lt(a, i.b)) || i.s === s); };

/* ---------- đồ thị trên lưới ô vuông ----------
   Lưới: các đoạn màu line nét 1 cách đều u (px một đơn vị); trục: hai đoạn nét 1,5 nằm trên đường lưới; số ghi trên trục hoành ở
   đúng cột (số âm lệch trái 3 px; khi bị che thì dời 8 px hoặc lên trên trục), số trên trục tung ở đúng hàng (bên trái hoặc bên phải
   trục, có thể dời 9 px); đường cong: polyline màu acc; đường nét đứt: tiệm cận; chấm tròn: điểm đánh dấu. Trả về toạ độ toán học. */
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
  const tcd = [], tcn = [], tcx = [];
  L.filter((l) => l.dash).forEach((l) => { const a = toM(l.a), b = toM(l.b); if (Math.abs(a[0] - b[0]) < 1e-6) tcd.push(a[0]); else if (Math.abs(a[1] - b[1]) < 1e-6) tcn.push(a[1]); else { const m = (b[1] - a[1]) / (b[0] - a[0]); tcx.push([m, a[1] - m * a[0]]); } });
  const cong = polylines(svg).filter((p) => p.stroke === "acc");
  assert.ok(cong.length >= 1, ten + ": không có đường cong");
  // số ghi trên trục không bị đường cong, đường nét đứt đè
  so.forEach((t) => { const [x0, y0, x1, y1] = hopChu(t), trong = (z) => z[0] > x0 + 0.5 && z[0] < x1 - 0.5 && z[1] > y0 + 0.5 && z[1] < y1 - 0.5;
    cong.forEach((p) => p.p.forEach((q, i) => { if (i) for (let k = 0; k <= 10; k++) assert.ok(!trong([p.p[i - 1][0] + (q[0] - p.p[i - 1][0]) * k / 10, p.p[i - 1][1] + (q[1] - p.p[i - 1][1]) * k / 10]), ten + ": đường cong đè lên số " + t.t); }));
    L.filter((l) => l.dash).forEach((l) => { for (let k = 0; k <= 60; k++) assert.ok(!trong([l.a[0] + (l.b[0] - l.a[0]) * k / 60, l.a[1] + (l.b[1] - l.a[1]) * k / 60]), ten + ": đường nét đứt đè lên số " + t.t); }); });
  return { u, xr, yr, curves: cong.map((p) => p.p.map(toM)), tcd, tcn, tcx, dots: circles(svg).filter((c) => c.r <= 4).map((c) => toM(c.c)) };
};
// mọi điểm của đường cong thuộc đồ thị hàm số f (sai lệch dưới 0,02 đơn vị) và đồ thị được vẽ đủ trong khung (trên đoạn doan nếu có)
const khopDoThi = (g, f, doan) => {
  const fF = (x) => rfEvalF(f, x), d = 0.15 / g.u; // toạ độ trong hình làm tròn 0,1 px: ở chỗ dốc, so cả hai điểm cách x một chút
  if (!g.curves.every((c) => c.every(([x, y]) => Math.abs(fF(x) - y) < 0.02 || (fF(x - d) - y) * (fF(x + d) - y) <= 0))) return false;
  const [a, b] = doan ? doan.map(toNum) : g.xr;
  for (let x = a; x <= b + 1e-9; x += 0.05) {
    const y = fF(x); if (!Number.isFinite(y) || y < g.yr[0] + 0.05 || y > g.yr[1] - 0.05) continue;
    if (!g.curves.some((c) => c.some((p, i) => i && Math.min(p[0], c[i - 1][0]) - 1e-9 <= x && x <= Math.max(p[0], c[i - 1][0]) + 1e-9))) return false;
  }
  return true;
};
// đường nét đứt đúng các tiệm cận của f (trong khung)
const khopTiemCan = (g, f, ten) => {
  const t = tiemCan(f), xs = t.dung.map(toNum).filter((x) => x > g.xr[0] && x < g.xr[1]);
  assert.deepEqual(g.tcd.map((x) => Math.round(x * 1000) / 1000).sort(), xs.sort(), ten + ": tiệm cận đứng vẽ sai");
  assert.deepEqual(g.tcn.map((y) => Math.round(y * 1000) / 1000), t.ngang ? [toNum(t.ngang)] : [], ten + ": tiệm cận ngang vẽ sai");
  assert.deepEqual(g.tcx.map(([m, c]) => [Math.round(m * 1000) / 1000, Math.round(c * 1000) / 1000]), t.xien ? [[toNum(t.xien.m), toNum(t.xien.c)]] : [], ten + ": tiệm cận xiên vẽ sai");
};
// đa thức bậc ba khớp đường cong nhất (bình phương tối thiểu), để thấy hình xác định đúng một hàm bậc ba
const bacBa = (g) => {
  const P = g.curves.flat(), A = [0, 1, 2, 3].map((i) => [0, 1, 2, 3].map((j) => P.reduce((s, [x]) => s + x ** (i + j), 0))), y = [0, 1, 2, 3].map((i) => P.reduce((s, [x, yy]) => s + yy * x ** i, 0));
  for (let i = 0; i < 4; i++) { for (let k = i + 1; k < 4; k++) { const r = A[k][i] / A[i][i]; for (let j = i; j < 4; j++) A[k][j] -= r * A[i][j]; y[k] -= r * y[i]; } }
  const c = [0, 0, 0, 0]; for (let i = 3; i >= 0; i--) { let s = y[i]; for (let j = i + 1; j < 4; j++) s -= A[i][j] * c[j]; c[i] = s / A[i][i]; }
  return c;
};


/* ---------- bảng kẻ ô (bảng tần số ghép nhóm) ----------
   Đường kẻ ngang, dọc (cả viền), kẻ hết bảng; mỗi ô nhiều nhất một chữ đặt giữa ô và vừa ô. Trả về [[chữ từng ô theo hàng]]. */
const docBang = (svg, ten) => {
  const L = lines(svg), ngang = L.filter((l) => l.a[1] === l.b[1]), doc = L.filter((l) => l.a[0] === l.b[0]);
  assert.equal(ngang.length + doc.length, L.length, ten + ": bảng chỉ có đường kẻ ngang, dọc");
  const ys = [...new Set(ngang.map((l) => l.a[1]))].sort((a, b) => a - b), xs = [...new Set(doc.map((l) => l.a[0]))].sort((a, b) => a - b);
  ngang.forEach((l) => assert.ok(Math.min(l.a[0], l.b[0]) === xs[0] && Math.max(l.a[0], l.b[0]) === xs[xs.length - 1], ten + ": đường ngang kẻ hết bề rộng bảng"));
  doc.forEach((l) => assert.ok(Math.min(l.a[1], l.b[1]) === ys[0] && Math.max(l.a[1], l.b[1]) === ys[ys.length - 1], ten + ": đường dọc kẻ hết chiều cao bảng"));
  const o = Array.from({ length: ys.length - 1 }, () => Array(xs.length - 1).fill(""));
  texts(svg).forEach((t) => {
    const c = xs.findIndex((v, i) => i && Math.abs(t.at[0] - (v + xs[i - 1]) / 2) < 0.6) - 1, r = ys.findIndex((v, i) => i && t.at[1] > ys[i - 1] + 0.7 * t.fs && t.at[1] < v) - 1;
    assert.ok(t.anchor === "middle" && c >= 0 && r >= 0 && o[r][c] === "", ten + ": chữ “" + t.t + "” phải nằm giữa một ô, mỗi ô một chữ");
    assert.ok(rong(t) <= xs[c + 1] - xs[c] - 4, ten + ": chữ “" + t.t + "” không vừa ô");
    o[r][c] = t.t;
  });
  return o;
};
// mẫu số liệu ghép nhóm từ bảng (cột 0: nhóm [a; b), cột k: tần số; "?" là tần số chưa biết)
const nhomAB = (s) => { const m = /^\[(.+); (.+)\)$/.exec(s); assert.ok(m, "nhóm lạ " + s); return [fr(m[1]), fr(m[2])]; };
const mauBang = (b, k) => {
  const M = b.slice(1).map((r) => { const [a, c] = nhomAB(r[0]); return { a, b: c, m: r[k] === "?" ? null : +r[k] }; });
  M.forEach((g, i) => i && assert.ok(eq(g.a, M[i - 1].b), "các nhóm phải nối tiếp nhau"));
  return M;
};
const coMau = (M) => M.reduce((s, g) => s + g.m, 0);
const khoangBT = (M) => { assert.ok(M[0].m > 0 && M[M.length - 1].m > 0, "nhóm đầu và nhóm cuối có tần số dương"); return sub(M[M.length - 1].b, M[0].a); };
const tuPhanVi = (M, r) => {
  const n = coMau(M), k = F(r * n, 4); let C = 0;
  for (let p = 0; p < M.length; p++) { if (cmp(F(C), k) < 0 && cmp(F(C + M[p].m), k) >= 0) return { p, Q: add(M[p].a, mul(div(sub(k, F(C)), F(M[p].m)), sub(M[p].b, M[p].a))) }; C += M[p].m; }
  throw new Error("không tìm được nhóm chứa tứ phân vị");
};
const daiDien = (g) => div(add(g.a, g.b), F(2));
const trungBinh = (M) => div(M.reduce((s, g) => add(s, mul(F(g.m), daiDien(g))), F(0)), F(coMau(M)));
const phuongSai = (M) => { const x = trungBinh(M); return div(M.reduce((s, g) => add(s, mul(F(g.m), pw(sub(daiDien(g), x), 2))), F(0)), F(coMau(M))); };

const khoang = (s) => { const m = /^\((.+); (.+)\)$/.exec(s); return m && [frVC(m[1].trim()), frVC(m[2].trim())]; };
const SO_CHU = { một: 1, hai: 2, ba: 3, bốn: 4 };
// mệnh đề về hàm số f (đúng/sai 4 ý)
const menhDeHam = (s, f) => {
  let m;
  if ((m = /^Đạo hàm của hàm số là y′ = (.+)$/.exec(s))) return rfEq(rf(m[1]), rfDer(f));
  if ((m = /^Phương trình y′ = 0 có đúng (\S+) nghiệm thuộc đoạn \[(.+); (.+)\]$/.exec(s))) return diemTH(f).filter((x) => cmp(x, fr(m[2])) >= 0 && cmp(x, fr(m[3])) <= 0).length === SO_CHU[m[1]];
  if ((m = /^Giá trị (lớn|nhỏ) nhất của hàm số trên đoạn \[(.+); (.+)\] bằng (.+)$/.exec(s))) { const g = gtTrenDoan(f, fr(m[2]), fr(m[3])); return eq(m[1] === "lớn" ? g.max : g.min, fr(m[4])); }
  if ((m = /^Hàm số (đồng|nghịch) biến trên khoảng (\(.+\))$/.exec(s))) { const [a, b] = khoang(m[2]); return donDieuTren(f, a, b, m[1] === "đồng" ? 1 : -1); }
  if ((m = /^Hàm số đạt cực (tiểu|đại) tại x = (.+)$/.exec(s))) return cucTri(f).some((c) => c.loai === (m[1] === "tiểu" ? "CT" : "CĐ") && eq(c.x, fr(m[2])));
  if ((m = /^Giá trị cực (đại|tiểu) của hàm số bằng (.+)$/.exec(s))) return eq(motCucTri(f, m[1] === "đại" ? "CĐ" : "CT").y, fr(m[2]));
  if ((m = /^Phương trình f\(x\) = (.+) có ba nghiệm phân biệt$/.exec(s))) { assert.equal(deg(f.Q), 0); return demNghiem(rfSub(f, RF([fr(m[1])])).P) === 3; }
  if ((m = /^Điểm \((.+); (.+)\) là tâm đối xứng của đồ thị$/.exec(s))) { assert.equal(deg(f.P), 3, "tâm đối xứng: hàm bậc ba"); const x0 = nghiemP(pDer(pDer(f.P)))[0]; return eq(x0, fr(m[1])) && eq(rfEval(f, x0), fr(m[2])); }
  if ((m = /^Đường thẳng x = (.+) là tiệm cận đứng của đồ thị hàm số$/.exec(s))) return tiemCan(f).dung.some((x) => eq(x, fr(m[1])));
  if (/^Đồ thị hàm số có tiệm cận ngang$/.test(s)) return !!tiemCan(f).ngang;
  if ((m = /^Đường thẳng y = (.+) là tiệm cận xiên của đồ thị hàm số$/.exec(s))) { const t = tiemCan(f).xien; return !!t && rfEq(rf(m[1]), RF([t.c, t.m])); }
  if ((m = /^Giao điểm của tiệm cận đứng và tiệm cận xiên là điểm \((.+); (.+)\)$/.exec(s))) { const t = tiemCan(f); assert.equal(t.dung.length, 1); const x = t.dung[0]; return eq(x, fr(m[1])) && eq(add(mul(t.xien.m, x), t.xien.c), fr(m[2])); }
  throw new Error("không đọc được mệnh đề: " + s);
};
// mệnh đề về mẫu số liệu ghép nhóm (đúng/sai 4 ý); M: mẫu, M2: mẫu thứ hai (nhóm B) nếu có
const DV = "(?: phút| giờ| giây| km\\/h)?";
const menhDeMau = (s, M, M2) => {
  let m;
  if ((m = new RegExp("^Khoảng biến thiên của mẫu số liệu ghép nhóm bằng (.+?)" + DV + "$").exec(s))) return eq(khoangBT(M), fr(m[1]));
  if ((m = /^Nhóm chứa tứ phân vị thứ (nhất|ba) là nhóm (\[.+\))$/.exec(s))) { const g = M[tuPhanVi(M, m[1] === "nhất" ? 1 : 3).p], [a, b] = nhomAB(m[2]); return eq(g.a, a) && eq(g.b, b); }
  if ((m = new RegExp("^Khoảng tứ phân vị của mẫu số liệu ghép nhóm bằng (.+?)" + DV + "$").exec(s))) return eq(sub(tuPhanVi(M, 3).Q, tuPhanVi(M, 1).Q), fr(m[1]));
  if ((m = new RegExp("^Khoảng tứ phân vị của mẫu số liệu ghép nhóm nhỏ hơn (.+?)" + DV + "$").exec(s))) return cmp(sub(tuPhanVi(M, 3).Q, tuPhanVi(M, 1).Q), fr(m[1])) < 0;
  if ((m = /^Cỡ mẫu n = (\d+)$/.exec(s))) return coMau(M) === +m[1];
  if ((m = new RegExp("^Tứ phân vị thứ nhất xấp xỉ (.+?)" + DV + " \\(làm tròn đến hàng phần trăm\\)$").exec(s))) return lamTron(tuPhanVi(M, 1).Q, 2) === toNum(fr(m[1]));
  if ((m = /^Giá trị đại diện của nhóm (\[.+\)) là (.+)$/.exec(s))) { const [a, b] = nhomAB(m[1]); assert.ok(M.some((g) => eq(g.a, a) && eq(g.b, b)), "nhóm không có trong bảng"); return eq(div(add(a, b), F(2)), fr(m[2])); }
  if ((m = new RegExp("^Số trung bình của mẫu số liệu ghép nhóm bằng (.+?)" + DV + "$").exec(s))) return eq(trungBinh(M), fr(m[1]));
  if ((m = /^Phương sai của mẫu số liệu ghép nhóm bằng (.+)$/.exec(s))) return eq(phuongSai(M), fr(m[1]));
  if ((m = new RegExp("^Độ lệch chuẩn của mẫu số liệu ghép nhóm lớn hơn (.+?)" + DV + "$").exec(s))) return toNum(phuongSai(M)) > toNum(fr(m[1])) ** 2;
  if (/^Số trung bình của nhóm A lớn hơn số trung bình của nhóm B$/.test(s)) return cmp(trungBinh(M), trungBinh(M2)) > 0;
  if ((m = /^Phương sai của nhóm A bằng (.+)$/.exec(s))) return eq(phuongSai(M), fr(m[1]));
  if ((m = new RegExp("^Độ lệch chuẩn của nhóm B nhỏ hơn (.+?)" + DV + "$").exec(s))) return toNum(phuongSai(M2)) < toNum(fr(m[1])) ** 2;
  if (/^Thời gian của nhóm A ít phân tán hơn thời gian của nhóm B$/.test(s)) return cmp(phuongSai(M), phuongSai(M2)) < 0;
  throw new Error("không đọc được mệnh đề: " + s);
};

/* ---------- bổ sung cho đề thi thử ---------- */
const nhom = (q, re) => { const m = re.exec(q.q); assert.ok(m, "đề thiếu " + re); return m.slice(1).map((s) => toNum(fr(s))); };
const ptO = (o) => /^\((.+); (.+)\)$/.exec(o); // điểm trên mặt phẳng (a; b)
const theoDung = (q, ok) => { const m = q.o.filter(ok); assert.equal(m.length, 1, "cần đúng một lựa chọn đúng, có " + m.length + ": " + JSON.stringify(q.o)); return m[0]; };
const chinhHop = (n, k) => { let r = 1; for (let i = 0; i < k; i++) r *= n - i; return r; };
const toHop = (n, k) => chinhHop(n, k) / chinhHop(k, k);
const SO_THU = { hai: 2, ba: 3, "tư": 4, "năm": 5, "sáu": 6, "bảy": 7, "tám": 8 };
const chiSo = (s) => +can(s, SUB);
// tập số thực ghi bằng khoảng, đoạn, hợp: "(1; 9)", "[−2; 2]", "(−∞; −2) ∪ (2; +∞)" → hàm kiểm tra x thuộc tập
const tapKhoang = (s) => { const ps = s.split(" ∪ ").map((p) => { const m = /^([[(])(.+); (.+)([\])])$/.exec(p.trim()); assert.ok(m, "khoảng lạ: " + p); return { a: toNum(frVC(m[2])), b: toNum(frVC(m[3])), l: m[1] === "[", r: m[4] === "]" }; });
  return (x) => ps.some((p) => (p.l ? x >= p.a : x > p.a) && (p.r ? x <= p.b : x < p.b)); };
const khopTap = (A, B) => { const xs = []; for (let k = -1200; k <= 1200; k++) xs.push(k / 40, k / 40 + 1e-7, k / 40 - 1e-7); return xs.every((x) => A(x) === B(x)); };
// họ nghiệm của phương trình lượng giác: "x = ±2π/3 + k2π (k ∈ ℤ)", "x = π/4 + k2π hoặc x = 3π/4 + k2π (k ∈ ℤ)" → các nghiệm trên [a; b]
const hoNghiem = (s, a = -20, b = 20) => { const t = s.replace(/ \(k ∈ ℤ\)$/, "");
  return t.split(" hoặc ").flatMap((p) => { const m = /^x = (±)?(.+?) \+ k(\d*)π$/.exec(p); assert.ok(m, "họ nghiệm lạ: " + p); const g0 = hang(m[2]), chu = (m[3] ? +m[3] : 1) * Math.PI, r = [];
    for (const g of m[1] ? [g0, -g0] : [g0]) for (let k = Math.ceil((a - g) / chu); g + k * chu <= b; k++) r.push(g + k * chu); return r; })
    .sort((x, y) => x - y).filter((x, i, A) => !i || Math.abs(x - A[i - 1]) > 1e-9); };
const cungTap = (A, B) => A.length === B.length && A.every((x, i) => Math.abs(x - B[i]) < 1e-6);
const nghiemLG = (g) => nghiem(g, -20, 20);
// cực trị số của hàm số thực trên đoạn (lưới dày rồi thu hẹp)
const cucSo = (f, a, b, lon = true) => { let x0 = a, v0 = f(a); const N = 20000; for (let k = 0; k <= N; k++) { const x = a + ((b - a) * k) / N, v = f(x); if (lon ? v > v0 : v < v0) { x0 = x; v0 = v; } }
  let l = Math.max(a, x0 - (b - a) / N), r = Math.min(b, x0 + (b - a) / N); for (let i = 0; i < 200; i++) { const m1 = l + (r - l) / 3, m2 = r - (r - l) / 3; if (lon ? f(m1) < f(m2) : f(m1) > f(m2)) l = m1; else r = m2; } const x = (l + r) / 2; return { x, v: f(x) }; };
const daoHamSo = (f, x) => { const h = 1e-6 * Math.max(1, Math.abs(x)); return (f(x + h) - f(x - h)) / (2 * h); };
const bangNhau = (f, g, xs) => xs.every((x) => Math.abs(f(x) - g(x)) <= 1e-6 * Math.max(1, Math.abs(f(x))));
const R3 = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, v.map((x) => F(x))]));
const nPhang = (P, a, b, c) => vCross(vSub(P[b], P[a]), vSub(P[c], P[a]));
const kcDiemMP = (M, P, a, b, c) => { const n = vn(nPhang(P, a, b, c)), w = vn(vSub(M, P[a])); return Math.abs(dotR(n, w)) / lenR(n); };
const kcCheo = (A, u, B, v) => { const n = crossR(vn(u), vn(v)); return Math.abs(dotR(vn(vSub(B, A)), n)) / lenR(n); };
const gocBa = (P, s) => { const [x, y, z] = s.match(/[A-Z]′?/g); return gocVec(vn(vSub(P[x], P[y])), vn(vSub(P[z], P[y]))); };

/* ---------- hình không gian không có trục: điểm có nhãn khớp một phép chiếu song song của toạ độ cho trước (sai lệch dưới 0,5 px); cạnh vẽ đủ;
   cạnh khuất (nét đứt) đúng là các cạnh mà cả hai mặt chứa nó đều quay lưng về người xem (hướng nhìn là nhân của phép chiếu, chọn chiều thấy
   mặt trên của hình); các đoạn trong (đường cao, đường chéo đáy) vẽ nét đứt ---------- */
const kiemKhoi = (svg, toaDo, faces, edges, trong, ten) => {
  const D = diem(svg, ten), ks = Object.keys(toaDo);
  assert.deepEqual(Object.keys(D).sort(), ks.slice().sort(), ten + ": nhãn các điểm");
  const A = ks.map((k) => [1, ...toaDo[k].map(toNum)]), cx = giai4(A, ks.map((k) => D[k][0])), cy = giai4(A, ks.map((k) => D[k][1]));
  const chieu = (v) => [cx[0] + cx[1] * v[0] + cx[2] * v[1] + cx[3] * v[2], cy[0] + cy[1] * v[0] + cy[2] * v[1] + cy[3] * v[2]];
  ks.forEach((k) => assert.ok(dist(chieu(toaDo[k].map(toNum)), D[k]) < 0.5, ten + ": điểm " + k + " không khớp toạ độ"));
  let w = crossR([cx[1], cx[2], cx[3]], [cy[1], cy[2], cy[3]]); if (w[2] < 0) w = w.map((t) => -t);
  const dinh = [...new Set(faces.flat())], tam = [0, 1, 2].map((i) => dinh.reduce((s, k) => s + toNum(toaDo[k][i]), 0) / dinh.length);
  const thay = faces.map((f) => { let n = vn(vCross(vSub(toaDo[f[1]], toaDo[f[0]]), vSub(toaDo[f[2]], toaDo[f[0]]))); const ra = vn(toaDo[f[0]]).map((t, i) => t - tam[i]); if (dotR(n, ra) < 0) n = n.map((t) => -t); return dotR(n, w) > 1e-9; });
  const ke = (f, a, b) => { const i = f.indexOf(a), j = f.indexOf(b); return i >= 0 && j >= 0 && (Math.abs(i - j) === 1 || Math.abs(i - j) === f.length - 1); };
  const khuat = edges.filter(([a, b]) => { const fs = faces.map((f, i) => i).filter((i) => ke(faces[i], a, b)); assert.equal(fs.length, 2, ten + ": cạnh " + a + b); return fs.every((i) => !thay[i]); }).map((e) => e.slice().sort().join("-"));
  const ce = canhHinh(svg, D), ten2 = (e) => e.slice().sort().join("-");
  assert.deepEqual([...ce.thay, ...ce.khuat].sort(), [...edges, ...trong].map(ten2).sort(), ten + ": các cạnh, đoạn vẽ trong hình");
  assert.deepEqual(ce.khuat.sort(), [...khuat, ...trong.map(ten2)].sort(), ten + ": cạnh khuất phải vẽ nét đứt, cạnh thấy vẽ nét liền");
  return D;
};
const CHOP4 = { f: [["A", "B", "C", "D"], ["S", "A", "B"], ["S", "B", "C"], ["S", "C", "D"], ["S", "D", "A"]], e: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["S", "A"], ["S", "B"], ["S", "C"], ["S", "D"]] };
const HOP8 = { f: [["A", "B", "C", "D"], ["A′", "B′", "C′", "D′"], ["A", "B", "B′", "A′"], ["B", "C", "C′", "B′"], ["C", "D", "D′", "C′"], ["D", "A", "A′", "D′"]],
  e: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["A′", "B′"], ["B′", "C′"], ["C′", "D′"], ["D′", "A′"], ["A", "A′"], ["B", "B′"], ["C", "C′"], ["D", "D′"]] };
const hopCanh = (s) => R3({ A: [0, 0, 0], B: [s, 0, 0], C: [s, s, 0], D: [0, s, 0], "A′": [0, 0, s], "B′": [s, 0, s], "C′": [s, s, s], "D′": [0, s, s] });
// mệnh đề về hàm số phân thức f (bổ sung cho menhDeHam)
const menhHam = (f) => (s) => {
  let m;
  if ((m = /^Đạo hàm của hàm số là f′\(x\) = (.+)$/.exec(s))) return rfEq(rf(m[1]), rfDer(f));
  if ((m = /^Trên đoạn \[(.+); (.+)\], giá trị (lớn|nhỏ) nhất của hàm số bằng (.+)$/.exec(s))) { const g = gtTrenDoan(f, fr(m[1]), fr(m[2])); return eq(m[3] === "lớn" ? g.max : g.min, fr(m[4])); }
  if ((m = /^Hiệu giữa giá trị cực tiểu và giá trị cực đại của hàm số bằng (.+)$/.exec(s))) return eq(sub(motCucTri(f, "CT").y, motCucTri(f, "CĐ").y), fr(m[1]));
  return menhDeHam(s, f);
};
const BIEN_SO = (s) => s.replace(/[−–]/g, "-");

/* ---------- kiểm tra từng câu (RIENG: các mục kiểm tra của từng đề; phiên thêm đề thì thêm một khoá mới): mỗi câu khớp đúng một mục của
   đề đó (chữ has dài nhất nằm trong đề bài), mục đó tính lại đáp án ---------- */
const RIENG = {
  "toan12-tn-de1": [
    { has: "Điểm cực đại của đồ thị hàm số đã cho là", right: (q) => { const b = doc(q, docBBT, "BBT Đề 1"); khopBBT(b, rf("x⁴ − 8x² + 3"), "BBT Đề 1");
      const i = b.mark.findIndex((m, k) => m === "0" && b.sg[k - 1] > 0 && b.sg[k] < 0); assert.ok(i > 0, "bảng không có cực đại");
      return theo(q, /^\((.+); (.+)\)$/, (k) => eq(fr(k[1]), b.pts[i].x) && eq(fr(k[2]), fr(b.val[i][0]))); } },
    { has: "Đường tiệm cận đứng của đồ thị hàm số y = (2x − 3)/(x + 4)", right: (q) => { const t = tiemCan(rf(/y = (.+) là đường thẳng$/.exec(q.q)[1])); assert.equal(t.dung.length, 1);
      return theo(q, /^([xy]) = (.+)$/, (k) => k[1] === "x" && eq(fr(k[2]), t.dung[0])); } },
    { has: "∫(6x² + cos x)dx bằng", right: (q) => { const f = hamDe(q, /^∫\((.+)\)dx bằng$/); return theo(q, /^(.+) \+ C$/, (k) => laNH(hs(k[1]), f)); } },
    { has: "∫₁⁴ (1/x)dx bằng", right: (q) => theoSo(q, tpDe(q)) },
    { has: "mặt phẳng (P): 2x − 3z + 5 = 0 có một vectơ pháp tuyến là", right: (q) => { const P = mpTrongChu(q.q, "P"); return theo(q, /^n = (\(.+\))$/, (k) => cungPhuong(bo3(k[1]), nMP(P))); } },
    { has: "Chiều dài (cm) của 40 con cá giống", right: (q) => { const M = mauBang(doc(q, docBang, "bảng Đề 1"), 1); assert.equal(coMau(M), so(q, /của (\d+) con cá/));
      const d = sub(tuPhanVi(M, 3).Q, tuPhanVi(M, 1).Q); return theo(q, /^(.+) cm$/, (k) => eq(fr(k[1]), d)); } },
    { has: "bất phương trình log₂(x − 1) < 3", right: (q) => { const [c, k] = nhom(q, /log₂\(x − (\d+)\) < (\d+)/); const p = (x) => x > c && Math.log2(x - c) < k; return theo(q, /^(.+)$/, (m) => khopTap(tapKhoang(m[1]), p)); } },
    { has: "Phương trình 2cos x + 1 = 0 có các nghiệm là", right: (q) => { const r = nghiemLG((x) => 2 * Math.cos(x) + 1); return theo(q, /^(.+)$/, (k) => cungTap(hoNghiem(k[1]), r)); } },
    { has: "Cho cấp số cộng (uₙ) có u₁ = 3 và công sai d = 4", right: (q) => { const [u1, d] = nhom(q, /u₁ = (\d+) và công sai d = (\d+)/), n = chiSo(/Số hạng u([₀-₉]+)/.exec(q.q)[1]); return theoSo(q, u1 + (n - 1) * d); } },
    { has: "Đường thẳng BD vuông góc với mặt phẳng nào dưới đây?", right: (q) => { const P = R3({ A: [0, 0, 0], B: [4, 0, 0], C: [4, 4, 0], D: [0, 4, 0], S: [0, 0, 5] });
      doc(q, kiemKhoi, P, CHOP4.f, CHOP4.e, [], "hình chóp Đề 1"); const BD = vSub(P.D, P.B);
      return theo(q, /^\(([A-Z])([A-Z])([A-Z])\)$/, (k) => cungPhuong(nPhang(P, k[1], k[2], k[3]), BD)); } },
    { has: "Đạo hàm của hàm số y = ln(2x + 1) là", right: (q) => { const f = hamDe(q, /y = (.+) là$/), xs = [-0.3, 0.1, 0.4, 1, 2.5, 7]; return theo(q, /^y′ = (.+)$/, (k) => { const g = hs(k[1]); return xs.every((x) => Math.abs(daoHamSo(f, x) - g(x)) < 1e-6 * Math.max(1, Math.abs(g(x)))); }); } },
    { has: "Một câu lạc bộ có 12 thành viên", right: (q) => { const [n] = nhom(q, /có (\d+) thành viên/), [k] = nhom(q, /chọn (\d+) người giữ/); return theoSo(q, chinhHop(n, k)); } },
    { has: "Cho hàm số f(x) = −x³ + 6x² − 9x + 5. Mỗi ý", right: (q) => tfTheo(q, menhHam(rf(/f\(x\) = (.+)\. Mỗi ý/.exec(q.q)[1]))) },
    { has: "Một cửa hàng nhập xoài từ hai trang trại", right: (q) => { const c = doc(q, docCay, "sơ đồ Đề 1"); assert.ok(!c.hoi);
      const [a, b2] = nhom(q, /: (\d+)% số xoài của trang trại thứ nhất, (\d+)% của trang trại thứ hai/), [p1, p2] = nhom(q, /trang trại thứ nhất là (\d+)%, của trang trại thứ hai là (\d+)%/);
      assert.ok(eq(c.A, F(a, 100)) && a + b2 === 100 && eq(c.BA, F(p1, 100)) && eq(c.BAc, F(p2, 100)), "sơ đồ hình cây khớp đề bài"); const mo = moHinh(c);
      return q.o.map((s) => { let m; if ((m = /^P\((.+)\) = (.+)$/.exec(s))) return eq(xacSuat(mo, m[1]), fr(m[2]));
        if ((m = /^Biết quả xoài đã chọn là loại một, xác suất quả đó của trang trại thứ nhất lớn hơn (.+)$/.exec(s))) return cmp(xacSuat(mo, "A | B"), fr(m[1])) > 0; throw new Error("mệnh đề lạ: " + s); }); } },
    { has: "Một flycam xuất phát từ điểm A(0; 0; 10)", right: (q) => { const A = diemTrongChu(q.q, "A"), u = bo3(/vectơ u = (\(.+?\))/.exec(q.q)[1]), d0 = { P: A, u };
      return q.o.map((s) => { let m;
        if ((m = /^Đường bay của flycam có phương trình tham số (\{.+\})$/.exec(s))) return trungDT(dt(m[1]), d0);
        if ((m = /^Flycam bay qua điểm M(\(.+\))$/.exec(s))) return thuocDT(d0, bo3(m[1]));
        if ((m = /^Góc giữa đường bay và mặt đất lớn hơn (\d+)°$/.exec(s))) return gocDTMP(vn(u), [0, 0, 1]) > +m[1];
        if ((m = /^Khoảng cách ngắn nhất từ flycam đến điểm P(\(.+\)) bằng (\d+) m$/.exec(s))) { const P = vn(bo3(m[1])), a = vn(A), uu = vn(u), t = Math.max(0, dotR(P.map((x, i) => x - a[i]), uu) / dotR(uu, uu)), H = a.map((x, i) => x + t * uu[i]); return Math.abs(lenR(P.map((x, i) => x - H[i])) - +m[2]) < 1e-9; }
        throw new Error("mệnh đề lạ: " + s); }); } },
    { has: "Hai bạn Mai và Lan độc lập với nhau", right: (q) => { const [a, b] = nhom(q, /Mai giải được là (0,\d+), xác suất Lan giải được là (0,\d+)/).map((x) => fr(String(x).replace(".", ",")));
      const ca = mul(a, b), khong = mul(sub(F(1), a), sub(F(1), b)), mot = add(mul(a, sub(F(1), b)), mul(sub(F(1), a), b));
      return q.o.map((s) => { let m; if (/xung khắc$/.test(s)) return eq(ca, F(0));
        if ((m = /^Xác suất cả hai bạn đều giải được bài toán là (.+)$/.exec(s))) return eq(ca, fr(m[1]));
        if ((m = /^Xác suất có ít nhất một bạn giải được bài toán là (.+)$/.exec(s))) return eq(sub(F(1), khong), fr(m[1]));
        if ((m = /^Xác suất có đúng một bạn giải được bài toán là (.+)$/.exec(s))) return eq(mot, fr(m[1])); throw new Error("mệnh đề lạ: " + s); }); } },
    { has: "Tính khoảng cách từ điểm A đến mặt phẳng (SBC)", right: (q) => { const [h] = nhom(q, /SA = (\d+);/), [a] = nhom(q, /cạnh bằng (\d+)\./);
      const P = { A: [0, 0, 0], B: [a, 0, 0], C: [a / 2, (a * Math.sqrt(3)) / 2, 0], S: [0, 0, h] }, n = crossR(P.B.map((x, i) => x - P.S[i]), P.C.map((x, i) => x - P.S[i]));
      return Math.abs(dotR(n, P.A.map((x, i) => x - P.S[i]))) / lenR(n); } },
    { has: "Một khung cửa sổ được ghép từ một hình chữ nhật", right: (q) => { const [L] = nhom(q, /nửa đường tròn\) là (\d+) m/); return cucSo((r) => 2 * r * ((L - 2 * r - Math.PI * r) / 2) + (Math.PI * r * r) / 2, 0, L / (2 + Math.PI)).v; } },
    { has: "một tia laser được chiếu dọc theo đường thẳng d", right: (q) => { const d = dt(/d: (.+) tới một tấm kính/.exec(q.q)[1]), P = mpTrongChu(q.q, "P"); return gocDTMP(vn(d.u), vn(nMP(P))); } },
    { has: "Một ứng viên dự tuyển vào một công ty", right: (q) => { const p = [...q.q.matchAll(/là (0,\d+)/g)].map((m) => toNum(fr(m[1]))); assert.equal(p.length, 3); return p[0] * p[1] * p[2]; } },
    { has: "Một tấm biển quảng cáo có dạng hình phẳng", right: (q) => { const f = hamDe(q, /parabol y = (.+) và đường thẳng/), g = hamDe(q, /đường thẳng y = (.+?) \(đơn vị/), h = (x) => g(x) - f(x), r = nghiem(h, -10, 10);
      assert.equal(r.length, 2); return (tpAbs(h, r[0], r[1]) * toNum(fr(/là (\d{1,3}(?: \d{3})*) đồng/.exec(q.q)[1]))) / 1e6; } },
    { has: "Số lượt tải một ứng dụng học tập", right: (q) => { const a = toNum(fr(/tháng đầu tiên là (\d{1,3}(?: \d{3})*) lượt/.exec(q.q)[1])), [r] = nhom(q, /tăng (\d+,\d+)%/), b = toNum(fr(/vượt (\d{1,3}(?: \d{3})*) lượt/.exec(q.q)[1]));
      let n = 1; while (a * (1 + r / 100) ** (n - 1) <= b) n++; return n; } },
  ],
  "toan12-tn-de2": [
    { has: "hình vẽ là đồ thị của hàm số y = f′(x). Hàm số f đạt cực tiểu", right: (q) => { const g = doc(q, docDoThi, "đồ thị f′ Đề 2"), fp = rf("x³ − 3x + 2"); assert.ok(khopDoThi(g, fp), "đồ thị f′ không khớp hàm số");
      const z = nghiemP(fp.P); z.forEach((x) => assert.ok(toNum(x) > g.xr[0] && toNum(x) < g.xr[1], "nghiệm của f′ phải nằm trong hình"));
      const ct = z.filter((x) => dau(fp, sub(x, F(1, 1000))) < 0 && dau(fp, add(x, F(1, 1000))) > 0); assert.equal(ct.length, 1, "f′ đổi dấu từ âm sang dương ở đúng một điểm");
      return theo(q, /^x = (.+)$/, (k) => eq(fr(k[1]), ct[0])); } },
    { has: "Giá trị nhỏ nhất của hàm số y = (x² + 8)/(x − 1) trên đoạn [2; 5]", right: (q) => { const f = rf(/y = (.+) trên đoạn/.exec(q.q)[1]), [a, b] = nhom(q, /đoạn \[(\d+); (\d+)\]/); const g = gtTrenDoan(f, F(a), F(b)); return theo(q, /^(.+)$/, (k) => eq(fr(k[1]), g.min)); } },
    { has: "∫(5 − 4sin x)dx bằng", right: (q) => { const f = hamDe(q, /^∫\((.+)\)dx bằng$/); return theo(q, /^(.+) \+ C$/, (k) => laNH(hs(k[1]), f)); } },
    { has: "Tích phân ∫₁³ [2x + f(x)]dx có giá trị bằng", right: (q) => { const [v] = nhom(q, /∫₁³ f\(x\)dx = (\d+)\./); return theoSo(q, tp((x) => 2 * x, 1, 3) + v); } },
    { has: "điểm M có hình chiếu vuông góc trên mặt phẳng (Oxy)", right: (q) => { const P = bo3(/mặt phẳng \(Oxy\) là điểm (\(.+?\))/.exec(q.q)[1]), Z = bo3(/trục Oz là điểm (\(.+?\))/.exec(q.q)[1]);
      assert.ok(eq(P[2], F(0)) && eq(Z[0], F(0)) && eq(Z[1], F(0))); return theo(q, /^(\(.+\))$/, (k) => vEq(bo3(k[1]), [P[0], P[1], Z[2]])); } },
    { has: "Quãng đường (km) đi bộ trong một tuần của 20 người", right: (q) => { const M = mauBang(doc(q, docBang, "bảng Đề 2"), 1); assert.equal(coMau(M), so(q, /của (\d+) người/));
      const s = Math.sqrt(toNum(phuongSai(M))), kc = q.o.map((o) => Math.abs(toNum(fr(o)) - s)), mn = Math.min(...kc); assert.ok(mn < 0.005 && kc.filter((d) => d - mn < 0.02).length === 1); return q.o[kc.indexOf(mn)]; } },
    { has: "Nghiệm của phương trình 3ˣ⁻² = 27 là", right: (q) => theo(q, /^x = (.+)$/, (k) => Math.abs(3 ** (toNum(fr(k[1])) - 2) - 27) < 1e-9) },
    { has: "Tập giá trị của hàm số y = 3sin x + 1 là", right: (q) => { const f = hamDe(q, /y = (.+) là$/), lo_ = cucSo(f, 0, 2 * Math.PI, false).v, hi = cucSo(f, 0, 2 * Math.PI).v;
      return theo(q, /^\[(.+); (.+)\]$/, (k) => Math.abs(toNum(fr(k[1])) - lo_) < 1e-9 && Math.abs(toNum(fr(k[2])) - hi) < 1e-9); } },
    { has: "Một cấp số nhân có số hạng đầu bằng 2 và công bội bằng 3", right: (q) => { const [u1, r] = nhom(q, /số hạng đầu bằng (\d+) và công bội bằng (\d+)/), n = SO_THU[/Số hạng thứ (\S+) của/.exec(q.q)[1]]; return theoSo(q, u1 * r ** (n - 1)); } },
    { has: "Góc giữa hai đường thẳng AC và A′D bằng", right: (q) => { const P = hopCanh(4); doc(q, kiemKhoi, P, HOP8.f, HOP8.e, [], "hình lập phương Đề 2"); const g = gocDT(vn(vSub(P.C, P.A)), vn(vSub(P.D, P["A′"])));
      return theo(q, /^(\d+)°$/, (k) => Math.abs(+k[1] - g) < 1e-9); } },
    { has: "Cho A, B là hai biến cố độc lập, P(A) = 0,3 và P(B) = 0,6. Xác suất của biến cố A ∪ B", right: (q) => { const p = docP(q.q); return theoSo(q, toNum(sub(add(p.A, p.B), mul(p.A, p.B)))); } },
    { has: "đường thẳng đi qua điểm A(1; 2) và có vectơ pháp tuyến n = (3; −1)", right: (q) => { const A = /A\((.+?); (.+?)\)/.exec(q.q).slice(1).map(fr), n = /n = \((.+?); (.+?)\)/.exec(q.q).slice(1).map(fr);
      return theo(q, /^(.+) = 0$/, (k) => { const L = bacNhat(k[1]); return eq(mul(L.x, n[1]), mul(L.y, n[0])) && eq(add(add(mul(L.x, A[0]), mul(L.y, A[1])), L.c), F(0)); }); } },
    { has: "Cho hàm số y = (x² − x + 4)/(x − 1). Mỗi ý", right: (q) => tfTheo(q, menhHam(rf(/y = (.+)\. Mỗi ý/.exec(q.q)[1]))) },
    { has: "Một robot giao hàng chuyển động thẳng", right: (q) => { const v = hs(/v\(t\) = x′\(t\) = (.+) \(m\/s\)/.exec(q.q)[1]), [x0] = nhom(q, /x\(0\) = (\d+)/), [a, b] = nhom(q, /với (\d+) ≤ t ≤ (\d+)/), X = (t) => x0 + tp(v, 0, t);
      return q.o.map((s) => { let m;
        if ((m = /^Vận tốc của robot tại thời điểm t = (\d+) là (\d+) m\/s$/.exec(s))) return Math.abs(v(+m[1]) - +m[2]) < 1e-9;
        if ((m = /^x\(t\) = (.+)$/.exec(s))) { const g = hs(m[1]); return bangNhau(g, X, [0, 0.7, 1.5, 2.2, 3.1, 4]); }
        if ((m = /^Vận tốc của robot lớn nhất tại thời điểm t = (\d+)$/.exec(s))) return Math.abs(cucSo(v, a, b).x - +m[1]) < 1e-6;
        if ((m = /^Sau (\d+) giây, robot cách cổng (\d+) m$/.exec(s))) return Math.abs(X(+m[1]) - +m[2]) < 1e-9;
        throw new Error("mệnh đề lạ: " + s); }); } },
    { has: "Một quả pháo hoa nổ tại điểm I(2; −1; 6)", right: (q) => { const I = diemTrongChu(q.q, "I"), [R] = nhom(q, /bán kính (\d+) \(hình vẽ\)/), h = doc(q, docCau, "mặt cầu Đề 2");
      assert.ok(vEq(I, h.I.map((x) => F(x))) && h.R === R, "hình khớp đề bài"); const c = { I, R2: F(R * R) };
      return q.o.map((s) => { let m;
        if ((m = /^Mặt cầu \(S\) có phương trình (.+)$/.exec(s))) { const e = cau(m[1]); return !!e && vEq(e.I, c.I) && eq(e.R2, c.R2); }
        if ((m = /^Điểm A(\(.+\)) nằm bên trong mặt cầu \(S\)$/.exec(s))) return viTriCau(c, bo3(m[1])) < 0;
        if (/^Mặt cầu \(S\) cắt mặt đất theo một đường tròn$/.test(s)) return Math.abs(toNum(I[2])) < R;
        if ((m = /^Điểm thấp nhất của mặt cầu \(S\) cách mặt đất (\d+) đơn vị$/.exec(s))) return toNum(I[2]) - R === +m[1];
        throw new Error("mệnh đề lạ: " + s); }); } },
    { has: "Cho hình lăng trụ đứng ABC.A′B′C′ có đáy ABC là tam giác vuông tại B", right: (q) => { const [ab, bc, h] = nhom(q, /AB = (\d+), BC = (\d+) và AA′ = (\d+)/);
      const P = R3({ B: [0, 0, 0], A: [ab, 0, 0], C: [0, bc, 0], "B′": [0, 0, h], "A′": [ab, 0, h], "C′": [0, bc, h] });
      doc(q, kiemKhoi, P, [["A", "B", "C"], ["A′", "B′", "C′"], ["A", "B", "B′", "A′"], ["B", "C", "C′", "B′"], ["C", "A", "A′", "C′"]], [["A", "B"], ["B", "C"], ["C", "A"], ["A′", "B′"], ["B′", "C′"], ["C′", "A′"], ["A", "A′"], ["B", "B′"], ["C", "C′"]], [], "lăng trụ Đề 2");
      return q.o.map((s) => { let m;
        if (/^Đường thẳng BC vuông góc với mặt phẳng \(ABB′A′\)$/.test(s)) return cungPhuong(vSub(P.C, P.B), nPhang(P, "A", "B", "B′"));
        if ((m = /^Góc giữa đường thẳng A′C và mặt phẳng \(ABC\) bằng (\d+)°$/.exec(s))) return Math.abs(gocDTMP(vn(vSub(P.C, P["A′"])), vn(nPhang(P, "A", "B", "C"))) - +m[1]) < 1e-9;
        if ((m = /^Khoảng cách từ điểm C đến mặt phẳng \(ABB′A′\) bằng (\d+)$/.exec(s))) return Math.abs(kcDiemMP(P.C, P, "A", "B", "B′") - +m[1]) < 1e-9;
        if ((m = /^Khoảng cách giữa hai đường thẳng AA′ và BC bằng (\d+)$/.exec(s))) return Math.abs(kcCheo(P.A, vSub(P["A′"], P.A), P.B, vSub(P.C, P.B)) - +m[1]) < 1e-9;
        throw new Error("mệnh đề lạ: " + s); }); } },
    { has: "cường độ ánh sáng là I(x) = I₀ · 0,96ˣ", right: (q) => { const [a] = nhom(q, /I₀ · (0,\d+)ˣ/), [p] = nhom(q, /còn bằng (\d+)%/); return Math.log(p / 100) / Math.log(a); } },
    { has: "xẻ một khúc gỗ hình trụ có đường kính 40 cm", right: (q) => { const [D] = nhom(q, /đường kính (\d+) cm thành/); return cucSo((w) => w * (D * D - w * w), 0, D).x; } },
    { has: "mặt của một sườn dốc thuộc mặt phẳng (P)", right: (q) => toNum(kcMP(diemTrongChu(q.q, "A"), mpTrongChu(q.q, "P"))) },
    { has: "Một hãng xe công nghệ có 65% số chuyến đi", right: (q) => { const [xm, ot] = nhom(q, /có (\d+)% số chuyến đi do xe máy thực hiện và (\d+)% do ô tô/), [a, b] = nhom(q, /là (\d+)% với xe máy và (\d+)% với ô tô/);
      assert.equal(xm + ot, 100); const s5 = (ot * b) / 1e4 + (xm * a) / 1e4; return (ot * b) / 1e4 / s5; } },
    { has: "Mở vòi xả nước của một bể chứa", right: (q) => { const r = hs(/r\(t\) = (.+) \(lít\/phút\)/.exec(q.q)[1]), [a, b] = nhom(q, /(\d+) ≤ t ≤ (\d+)/); return tp(r, a, b); } },
    { has: "Một hệ thống báo cháy gồm ba cảm biến", right: (q) => { const p = /lần lượt là (0,\d+); (0,\d+) và (0,\d+)/.exec(q.q).slice(1).map((s) => toNum(fr(s))); let s = 0;
      for (let m = 0; m < 8; m++) { const on = [0, 1, 2].map((i) => (m >> i) & 1); if (on.reduce((a, b) => a + b) === 2) s += on.reduce((t, o, i) => t * (o ? p[i] : 1 - p[i]), 1); } return s; } },
  ],
  "toan12-tn-de3": [
    { has: "Hàm số đã cho nghịch biến trên khoảng nào dưới đây?", right: (q) => { const b = doc(q, docBBT, "BBT Đề 3"); khopBBT(b, rf("(x² + 3)/(x + 1)"), "BBT Đề 3");
      return theo(q, /^\((.+); (.+)\)$/, (k) => donDieuBang(b, frVC(k[1]), frVC(k[2]), -1) && b.pts.some((p) => khopGT(k[1], p.x)) && b.pts.some((p) => khopGT(k[2], p.x))); } },
    { has: "Hai đường tiệm cận đó cắt nhau tại điểm", right: (q) => { const g = doc(q, docDoThi, "đồ thị Đề 3"), f = rf("(−x + 3)/(x − 2)"); assert.ok(khopDoThi(g, f), "đồ thị không khớp hàm số"); khopTiemCan(g, f, "đồ thị Đề 3");
      assert.ok(g.tcd.length === 1 && g.tcn.length === 1); return theo(q, /^\((.+); (.+)\)$/, (k) => Math.abs(toNum(fr(k[1])) - g.tcd[0]) < 1e-9 && Math.abs(toNum(fr(k[2])) - g.tcn[0]) < 1e-9); } },
    { has: "f(x) = 2x + eˣ trên ℝ và F(0) = 3. Khi đó F(x) bằng", right: (q) => { const f = hamDe(q, /f\(x\) = (.+) trên ℝ/), [v] = nhom(q, /F\(0\) = (\d+)/); return theo(q, /^(.+)$/, (k) => { const G = hs(k[1]); return laNH(G, f) && Math.abs(G(0) - v) < 1e-12; }); } },
    { has: "Khi tam giác OAB quay một vòng quanh trục Ox", right: (q) => { const [a] = nhom(q, /A\((\d+); 0\)/), [b1, b2] = nhom(q, /B\((\d+); (\d+)\)/); assert.equal(a, b1); return theoSo(q, Math.PI * tp((x) => ((b2 / b1) * x) ** 2, 0, a)); } },
    { has: "mặt cầu có tâm I(2; 0; −1) và đi qua gốc toạ độ O có phương trình là", right: (q) => { const I = diemTrongChu(q.q, "I"); return theoDung(q, (o) => { let c = null; try { c = cau(o); } catch (e) { c = null; } return !!c && vEq(c.I, I) && eq(c.R2, vDot(I, I)); }); } },
    { has: "Giá trị của m để vectơ a vuông góc với vectơ b là", right: (q) => { const a = bo3(/a = (\(.+?\))/.exec(q.q)[1]), b = /b = \((.+?); (.+?); m\)/.exec(q.q).slice(1).map(fr); return theo(q, /^m = (.+)$/, (k) => eq(vDot(a, [b[0], b[1], fr(k[1])]), F(0))); } },
    { has: "Tập xác định của hàm số y = log₃(4 − x²) là", right: (q) => { const [c] = nhom(q, /log₃\((\d+) − x²\)/); return theo(q, /^(.+)$/, (k) => khopTap(tapKhoang(k[1]), (x) => c - x * x > 0)); } },
    { has: "Phương trình tan x = √3 có các nghiệm là", right: (q) => { const r = nghiemLG((x) => Math.sin(x) - Math.sqrt(3) * Math.cos(x)); return theo(q, /^(.+)$/, (k) => cungTap(hoNghiem(k[1]), r)); } },
    { has: "Một cấp số cộng có số hạng thứ hai bằng 5 và số hạng thứ sáu bằng 17", right: (q) => { const [a, b] = nhom(q, /thứ hai bằng (\d+) và số hạng thứ sáu bằng (\d+)/); return theoSo(q, (b - a) / 4); } },
    { has: "Đường thẳng nào dưới đây vuông góc với mặt phẳng (SAB)?", right: (q) => { const P = R3({ A: [0, 0, 0], B: [4, 0, 0], C: [4, 3, 0], S: [0, 0, 4] });
      doc(q, kiemKhoi, P, [["A", "B", "C"], ["S", "A", "B"], ["S", "B", "C"], ["S", "C", "A"]], [["A", "B"], ["B", "C"], ["C", "A"], ["S", "A"], ["S", "B"], ["S", "C"]], [], "hình chóp Đề 3");
      return theo(q, /^([A-Z])([A-Z])$/, (k) => cungPhuong(vSub(P[k[2]], P[k[1]]), nPhang(P, "S", "A", "B"))); } },
    { has: "Cho hàm số y = x³ − 3x + 7. Giá trị của y″(1) bằng", right: (q) => { const f = rf(/y = (.+)\. Giá trị/.exec(q.q)[1]); return theoSo(q, toNum(rfEval(rfDer(rfDer(f)), F(1)))); } },
    { has: "Một đội văn nghệ có 7 bạn nữ và 5 bạn nam", right: (q) => { const [nu, nam] = nhom(q, /có (\d+) bạn nữ và (\d+) bạn nam/); return theoSo(q, (nu * nam) / toHop(nu + nam, 2)); } },
    { has: "Cho hàm số f(x) = x − 2sin x xét trên đoạn [0; π]", right: (q) => { const f = hamDe(q, /f\(x\) = (.+) xét trên/), fp = (x) => daoHamSo(f, x), z = nghiem(fp, 0, Math.PI);
      return q.o.map((s) => { let m;
        if ((m = /^Đạo hàm của hàm số là f′\(x\) = (.+)$/.exec(s))) return bangNhau(hs(m[1]), fp, [0.2, 0.9, 1.7, 2.6, 3]);
        if ((m = /^Trên đoạn \[0; π\], phương trình f′\(x\) = 0 có đúng một nghiệm là x = (.+)$/.exec(s))) return z.length === 1 && Math.abs(z[0] - hang(m[1])) < 1e-6;
        if ((m = /^f\((.+)\) = (.+)$/.exec(s))) return Math.abs(f(hang(m[1])) - hang(m[2])) < 1e-12;
        if ((m = /^Giá trị nhỏ nhất của hàm số trên đoạn \[0; π\] nhỏ hơn (.+)$/.exec(s))) return cucSo(f, 0, Math.PI, false).v < toNum(fr(m[1]));
        throw new Error("mệnh đề lạ: " + s); }); } },
    { has: "Chọn ngẫu nhiên một số trong 90 số tự nhiên từ 10 đến 99", right: (q) => { const [ba] = nhom(q, /“Số đó là bội của (\d+)”/), [lon] = nhom(q, /“Số đó lớn hơn (\d+)”/), [n0, tu, den] = nhom(q, /trong (\d+) số tự nhiên từ (\d+) đến (\d+)\./);
      assert.equal(n0, den - tu + 1, "số các số tự nhiên từ " + tu + " đến " + den); const om = Array.from({ length: n0 }, (_, i) => i + tu), A = (x) => x % ba === 0, B = (x) => x > lon, n = (f) => om.filter(f).length;
      const P = { A: F(n(A), 90), B: F(n(B), 90), "A | B": F(n((x) => A(x) && B(x)), n(B)), "B | A": F(n((x) => A(x) && B(x)), n(A)) };
      return q.o.map((s) => { const m = /^P\((.+)\) = (.+)$/.exec(s); assert.ok(m && P[m[1]], "mệnh đề lạ: " + s); return eq(P[m[1]], fr(m[2])); }); } },
    { has: "một bức tường nằm trên mặt phẳng (Q): x + y − 6 = 0", right: (q) => { const Q = mpTrongChu(q.q, "Q"), Pv = mp(/\(P\): (.+ = 0)\. Mỗi ý/.exec(q.q)[1]);
      return q.o.map((s) => { let m;
        if ((m = /^Vectơ n = (\(.+\)) là một vectơ pháp tuyến của \(Q\)$/.exec(s))) return cungPhuong(bo3(m[1]), nMP(Q));
        if (/^Mặt phẳng \(Q\) vuông góc với mặt sàn \(Oxy\)$/.test(s)) return vgMP(Q, mp("z = 0"));
        if ((m = /^Gốc toạ độ O cách bức tường (.+) m$/.exec(s))) return gan(kcMP(O3, Q), hang(m[1]));
        if ((m = /^Góc giữa tấm ván và bức tường bằng (\d+)°$/.exec(s))) return Math.abs(gocMP(vn(nMP(Pv)), vn(nMP(Q))) - +m[1]) < 1e-9;
        throw new Error("mệnh đề lạ: " + s); }); } },
    { has: "Giá trị còn lại của một chiếc máy sau t năm sử dụng", right: (q) => { const [V0, a] = nhom(q, /V\(t\) = (\d+) · (0,\d+)ᵗ/), V = (t) => V0 * a ** t;
      return q.o.map((s) => { let m;
        if ((m = /^Giá trị của chiếc máy lúc mới mua là (\d+) triệu đồng$/.exec(s))) return V(0) === +m[1];
        if ((m = /^Sau (\d+) năm, giá trị còn lại của chiếc máy là (.+) triệu đồng$/.exec(s))) return Math.abs(V(+m[1]) - toNum(fr(m[2]))) < 1e-9;
        if ((m = /^Mỗi năm giá trị của chiếc máy giảm (\d+)% so với năm trước$/.exec(s))) return Math.abs(1 - a - +m[1] / 100) < 1e-12;
        if ((m = /^Giá trị còn lại của chiếc máy lần đầu nhỏ hơn một nửa giá lúc mua là sau (\d+) năm$/.exec(s))) { let n = 0; while (V(n) >= V0 / 2) n++; return n === +m[1]; }
        throw new Error("mệnh đề lạ: " + s); }); } },
    { has: "Cho hình chóp tứ giác đều S.ABCD có cạnh đáy bằng 4 và chiều cao SO = 3", right: (q) => { const [a, h] = nhom(q, /cạnh đáy bằng (\d+) và chiều cao SO = (\d+)/);
      const P = R3({ A: [0, 0, 0], B: [a, 0, 0], C: [a, a, 0], D: [0, a, 0], S: [a / 2, a / 2, h], O: [a / 2, a / 2, 0] });
      doc(q, kiemKhoi, P, CHOP4.f, CHOP4.e, [["S", "O"], ["A", "C"], ["B", "D"]], "hình chóp đều Đề 3"); return gocMP(vn(nPhang(P, "S", "C", "D")), [0, 0, 1]); } },
    { has: "Lúc 7 giờ, tàu A ở cách tàu B 50 km về phía đông", right: (q) => { const [d0] = nhom(q, /cách tàu B (\d+) km/), [va] = nhom(q, /phía tây với vận tốc (\d+) km\/h/), [vb] = nhom(q, /phía nam với vận tốc (\d+) km\/h/);
      return cucSo((t) => Math.hypot(d0 - va * t, vb * t), 0, d0 / va, false).v; } },
    { has: "hai thiết bị bay không người lái chuyển động thẳng đều", right: (q) => { const M = /M\((.+?); (.+?); (.+?)\)/.exec(q.q).slice(1).map(hs), N = /N\((.+?); (.+?); (.+?)\)/.exec(q.q).slice(1).map(hs);
      return cucSo((t) => Math.hypot(...[0, 1, 2].map((i) => M[i](t) - N[i](t))), 0, 20, false).v; } },
    { has: "Trong một bài kiểm tra trắc nghiệm, mỗi câu có bốn phương án", right: (q) => { const [p] = nhom(q, /biết đáp án của (\d+)% số câu/); const a = p / 100; return a / (a + (1 - a) / 4); } },
    { has: "Phần lòng của một chậu cây cảnh có dạng khối tròn xoay", right: (q) => { const f = hamDe(q, /hàm số y = (.+) trên đoạn/), [a, b] = nhom(q, /trên đoạn \[(\d+); (\d+)\]/); return Math.PI * tp((x) => f(x) ** 2, a, b); } },
    { has: "Một bạn tập bơi: buổi đầu tiên bạn bơi 200 m", right: (q) => { const [u1] = nhom(q, /buổi đầu tiên bạn bơi (\d+) m/), [d] = nhom(q, /nhiều hơn buổi liền trước (\d+) m/), [n] = nhom(q, /trong (\d+) buổi tập/); return (n * (2 * u1 + (n - 1) * d)) / 2 / 1000; } },
  ],
  "toan12-tn-de4": [
    { has: "Hình vẽ là đồ thị của một trong bốn hàm số dưới đây", right: (q) => { const g = doc(q, docDoThi, "đồ thị Đề 4"); return theo(q, /^y = (.+)$/, (k) => khopDoThi(g, rf(k[1]))); } },
    { has: "Điểm cực đại của đồ thị hàm số y = −x³ + 3x + 4 là", right: (q) => { const c = motCucTri(rf(/y = (.+) là$/.exec(q.q)[1]), "CĐ"); return theo(q, /^\((.+); (.+)\)$/, (k) => eq(fr(k[1]), c.x) && eq(fr(k[2]), c.y)); } },
    { has: "∫₁² (3x² − 1/x²)dx bằng", right: (q) => theoSo(q, tpDe(q)) },
    { has: "Trên khoảng (0; +∞), ∫(3eˣ − 1/x)dx bằng", right: (q) => { const f = hamDe(q, /∫\((.+)\)dx bằng$/); return theo(q, /^(.+) \+ C$/, (k) => laNH(hs(k[1]), f, DUONG)); } },
    { has: "Trong tứ diện ABCD, điểm I là trung điểm của cạnh", right: (q) => { const [, a1, a2, b1, b2] = /điểm I là trung điểm của cạnh ([A-D])([A-D]), điểm K là trung điểm của cạnh ([A-D])([A-D])\./.exec(q.q);
      return theo(q, /^vectơ IK = (.+)$/, (k) => { for (let t = 0; t < 30; t++) {
        const P = {}; ["A", "B", "C", "D"].forEach((c) => (P[c] = [ngau() * 10 - 5, ngau() * 10 - 5, ngau() * 10 - 5])); const I = P[a1].map((x, i) => (x + P[a2][i]) / 2), K = P[b1].map((x, i) => (x + P[b2][i]) / 2);
        for (let i = 0; i < 3; i++) { const e = k[1].replace(/vectơ ([A-Z])([A-Z])/g, (_, a, b) => "(" + (P[b][i] - P[a][i]).toFixed(12).replace("-", "−").replace(".", ",") + ")"); if (Math.abs(hang(e) - (K[i] - I[i])) > 1e-8) return false; } }
      return true; }); } },
    { has: "Thời gian chờ (phút) tại một quầy thu ngân của 30 khách hàng", right: (q) => { const M = mauBang(doc(q, docBang, "bảng Đề 4"), 1); assert.equal(coMau(M), so(q, /của (\d+) khách hàng/)); const Q3 = tuPhanVi(M, 3).Q; return theo(q, /^(.+)$/, (k) => eq(fr(k[1]), Q3)); } },
    { has: "Giá trị của biểu thức log₃ 54 − log₃ 2 bằng", right: (q) => { const [a, b] = nhom(q, /log₃ (\d+) − log₃ (\d+)/), v = Math.log(a / b) / Math.log(3); return theoDung(q, (o) => { const m = /^log₃ (\d+)$/.exec(o); return Math.abs((m ? Math.log(+m[1]) / Math.log(3) : hang(o)) - v) < 1e-12; }); } },
    { has: "Phương trình √2sin x − 1 = 0 có các nghiệm là", right: (q) => { const r = nghiemLG((x) => Math.SQRT2 * Math.sin(x) - 1); return theo(q, /^(.+)$/, (k) => cungTap(hoNghiem(k[1]), r)); } },
    { has: "Cho cấp số nhân (uₙ) có u₁ = 5 và u₂ = −10", right: (q) => { const u1 = toNum(fr(/u₁ = (\S+) và/.exec(q.q)[1])), u2 = toNum(fr(/u₂ = (\S+)\./.exec(q.q)[1])), n = chiSo(/Giá trị của u([₀-₉]+)/.exec(q.q)[1]); return theoSo(q, u1 * (u2 / u1) ** (n - 1)); } },
    { has: "Góc giữa đường thẳng SC và mặt phẳng (ABCD) là góc nào dưới đây?", right: (q) => { const P = R3({ A: [0, 0, 0], B: [5, 0, 0], C: [5, 3, 0], D: [0, 3, 0], S: [0, 0, 4] });
      doc(q, kiemKhoi, P, CHOP4.f, CHOP4.e, [], "hình chóp Đề 4"); const g = gocDTMP(vn(vSub(P.C, P.S)), [0, 0, 1]); return theo(q, /^Góc ([A-Z]{3})$/, (k) => Math.abs(gocBa(P, k[1]) - g) < 1e-9); } },
    { has: "đạt giải trong cuộc thi vẽ là 0,2 và trong cuộc thi hát là 0,3", right: (q) => { const [a, b] = nhom(q, /cuộc thi vẽ là (0,\d+) và trong cuộc thi hát là (0,\d+)/); return theoSo(q, (1 - a) * (1 - b)); } },
    { has: "đường tròn (C): (x − 2)² + (y + 1)² = 9 có tâm I và bán kính R là", right: (q) => { const [a, b, r2] = nhom(q, /\(x − (\d+)\)² \+ \(y \+ (\d+)\)² = (\d+)/); return theo(q, /^I\((.+); (.+)\), R = (.+)$/, (k) => toNum(fr(k[1])) === a && toNum(fr(k[2])) === -b && toNum(fr(k[3])) ** 2 === r2); } },
    { has: "nhiệt độ ngoài trời sau t giờ kể từ 6 giờ sáng", right: (q) => { const T = hs(/T\(t\) = (.+) \(°C\)/.exec(q.q)[1]), [a, b] = nhom(q, /với (\d+) ≤ t ≤ (\d+) /), Tp = (t) => daoHamSo(T, t);
      return q.o.map((s) => { let m;
        if ((m = /^Nhiệt độ lúc 6 giờ sáng là (\d+) °C$/.exec(s))) return Math.abs(T(0) - +m[1]) < 1e-12;
        if ((m = /^T′\(t\) = (.+)$/.exec(s))) return bangNhau(hs(m[1]), Tp, [0.5, 2, 4.4, 7, 9.5, 11.5]);
        if ((m = /^Trong khoảng thời gian đó, nhiệt độ cao nhất đạt được lúc (\d+) giờ$/.exec(s))) return Math.abs(cucSo(T, a, b).x + 6 - +m[1]) < 1e-4;
        if ((m = /^Nhiệt độ tăng nhanh nhất lúc (\d+) giờ$/.exec(s))) return Math.abs(cucSo(Tp, a, b).x + 6 - +m[1]) < 1e-4;
        throw new Error("mệnh đề lạ: " + s); }); } },
    { has: "Cho hình phẳng (H) giới hạn bởi đồ thị hàm số y = √(2x)", right: (q) => { const f = hamDe(q, /y = (.+), trục hoành/), [b] = nhom(q, /đường thẳng x = (\d+)\./), S = tp(f, 0, b);
      return q.o.map((s) => { let m;
        if ((m = /^Diện tích của \(H\) bằng (.+)$/.exec(s))) return gan(S, hang(m[1]));
        if ((m = /có thể tích bằng (.+)$/.exec(s))) return gan(Math.PI * tp((x) => f(x) ** 2, 0, b), hang(m[1]));
        if ((m = /^Đường thẳng x = (\d+) chia \(H\) thành hai phần có diện tích bằng nhau$/.exec(s))) return Math.abs(tp(f, 0, +m[1]) - S / 2) < 1e-9;
        if ((m = /^Đường thẳng x = a chia \(H\) thành hai phần có diện tích bằng nhau khi a ≈ (.+)$/.exec(s))) { let l = 0, r = b; for (let i = 0; i < 100; i++) { const c = (l + r) / 2; if (tp(f, 0, c) < S / 2) l = c; else r = c; } return lamTron(l, 2) === toNum(fr(m[1])); }
        throw new Error("mệnh đề lạ: " + s); }); } },
    { has: "trục của hai đường hầm thẳng là hai đường thẳng d₁", right: (q) => { const d1 = dt(/d₁: (\{.+?\}) và/.exec(q.q)[1]), d2 = dt(/d₂: (\{.+?\})\. Mỗi ý/.exec(q.q)[1]);
      return q.o.map((s) => { let m;
        if ((m = /^Vectơ u = (\(.+\)) là một vectơ chỉ phương của d₁$/.exec(s))) return cungPhuong(bo3(m[1]), d1.u);
        if (/^Đường thẳng d₁ song song với mặt phẳng \(Oxy\)$/.test(s)) return eq(d1.u[2], F(0)) && !eq(d1.P[2], F(0));
        if (/^Hai đường thẳng d₁ và d₂ cắt nhau$/.test(s)) return viTri(d1, d2) === "Cắt nhau";
        if ((m = /^Góc giữa hai đường thẳng d₁ và d₂ nhỏ hơn (\d+)°$/.exec(s))) return gocDT(vn(d1.u), vn(d2.u)) < +m[1];
        throw new Error("mệnh đề lạ: " + s); }); } },
    { has: "Một chất điểm chuyển động thẳng với phương trình s(t)", right: (q) => { const sF = hs(/s\(t\) = (.+) \(m\)/.exec(q.q)[1]), v = (t) => daoHamSo(sF, t), a = (t) => daoHamSo(v, t);
      return q.o.map((s) => { let m;
        if ((m = /^Vận tốc của chất điểm tại thời điểm t = (\d+) là (\d+) m\/s$/.exec(s))) return Math.abs(v(+m[1]) - +m[2]) < 1e-5;
        if ((m = /^Chất điểm có vận tốc bằng 0 tại hai thời điểm t = (\d+) và t = (\d+)$/.exec(s))) { const z = nghiem(v, 0, 50); return z.length === 2 && Math.abs(z[0] - +m[1]) < 1e-6 && Math.abs(z[1] - +m[2]) < 1e-6; }
        if ((m = /^Gia tốc của chất điểm tại thời điểm t = (\d+) bằng 0$/.exec(s))) return Math.abs(a(+m[1])) < 1e-3;
        if ((m = /^Quãng đường chất điểm đi được trong (\d+) giây đầu là (\d+) m$/.exec(s))) return Math.abs(tpAbs(v, 0, +m[1]) - +m[2]) < 1e-6;
        throw new Error("mệnh đề lạ: " + s); }); } },
    { has: "Tính khoảng cách giữa hai đường thẳng A′B và B′C", right: (q) => { const [s] = nhom(q, /có cạnh bằng (\d+) \(hình vẽ\)/), P = hopCanh(s); doc(q, kiemKhoi, P, HOP8.f, HOP8.e, [], "hình lập phương Đề 4");
      return kcCheo(P["A′"], vSub(P.B, P["A′"]), P["B′"], vSub(P.C, P["B′"])); } },
    { has: "Chi phí nhiên liệu mỗi giờ của một con tàu", right: (q) => { const [v0] = nhom(q, /vận tốc (\d+) km\/h thì/), [c0] = nhom(q, /chi phí nhiên liệu là (\d+) nghìn/), [k0] = nhom(q, /còn tốn (\d+) nghìn/), k = c0 / v0 ** 3;
      const c = cucSo((v) => (k * v ** 3 + k0) / v, 1, 100, false).x, z = nghiem((v) => 2 * k * v - k0 / (v * v), 1, 100);
      assert.equal(z.length, 1, "chi phí mỗi giờ: đạo hàm có đúng một nghiệm"); assert.ok(Math.abs(z[0] - c) < 1e-4, "chi phí mỗi giờ: nghiệm của đạo hàm là chỗ nhỏ nhất"); return z[0]; } },
    { has: "mặt ngoài của một khối cầu bằng thạch cao", right: (q) => { const c = cau(/\(S\): (.+ = \d+)\. Người ta/.exec(q.q)[1]), P = mpTrongChu(q.q, "P"); return Math.sqrt(toNum(c.R2) - toNum(kcMP(c.I, P)) ** 2); } },
    { has: "Một tổng đài chăm sóc khách hàng thống kê 1 000 cuộc gọi", right: (q) => { const [hc, hc1] = nhom(q, /(\d+) cuộc gọi trong giờ hành chính, trong đó (\d+) cuộc/), [ng, ng1] = nhom(q, /(\d+) cuộc gọi ngoài giờ hành chính, trong đó (\d+) cuộc/);
      assert.equal(hc + ng, toNum(fr(/thống kê (\d{1,3}(?: \d{3})*) cuộc gọi/.exec(q.q)[1]))); return ng1 / (hc1 + ng1); } },
    { has: "Một tấm ốp tường trang trí có dạng hình phẳng", right: (q) => { const f = hamDe(q, /đồ thị hàm số y = (.+), trục hoành/), [a, b] = [...q.q.matchAll(/x = (\d+)/g)].map((m) => +m[1]); return tp(f, a, b); } },
    { has: "Một mẫu kim loại được nung nóng rồi để nguội", right: (q) => { const T = hs(/T\(t\) = (.+) \(°C\)/.exec(q.q)[1]), [m] = nhom(q, /xuống dưới (\d+) °C/); let t = 0; while (T(t) >= m) t++; return t; } },
  ],
};

/* ---------- đề và danh mục: số đề, số câu lấy từ danh mục ---------- */
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, EVENTS = ctx.window.ONTAP_SEED_EVENTS;
const soDe = (id) => +/de(\d+)$/.exec(id)[1];
const DE = BANKS.filter((b) => /^toan12-tn-de\d+$/.test(b.id)).sort((a, b) => soDe(a.id) - soDe(b.id));
assert.ok(DE.length >= 1, "chưa có đề thi thử tốt nghiệp Toán nào trong danh mục");
DE.forEach((b, i) => assert.equal(b.id, "toan12-tn-de" + (i + 1), "mã đề phải liên tiếp từ toan12-tn-de1"));
const TN = EVENTS.find((e) => e.id === "tn-thpt-2027");
const P1 = "Phần I. Trắc nghiệm nhiều lựa chọn", P2 = "Phần II. Trắc nghiệm đúng sai", P3 = "Phần III. Trả lời ngắn";
const KHUNG = [[P1, "mc", 12, 0.25], [P2, "tf4", 4, 1], [P3, "num", 6, 0.5]];
// chủ đề lớp 12: đúng chữ chủ đề của các kho Toán 12 (cuối kì I, giữa kì II, cuối năm); lớp 10, 11: “Lớp 10 · ”, “Lớp 11 · ” và tên chương của sách
const KHO12 = BANKS.filter((b) => b.file === "12-toan.js" && b.pool), CD12 = new Set(KHO12.flatMap((b) => Object.keys(b.pool.matrix)));
const BOOK = path.join(__dirname, "../../OnUp-Book");
const CHUONG = (() => { const r = new Set(); for (const [l, ts] of [["10", ["toan-10-tap-1", "toan-10-tap-2"]], ["11", ["toan-11-tap-1", "toan-11-tap-2"]]]) ts.forEach((t) => {
  const f = path.join(BOOK, "lop-" + l, t, "README.md"); if (fs.existsSync(f)) for (const m of fs.readFileSync(f, "utf8").matchAll(/\*\*Chương [IVX]+\. (.+?)\*\*/g)) r.add("Lớp " + l + " · " + m[1]); }); return r; })();
const lop = (t) => (CD12.has(t) ? 12 : /^Lớp 11 · /.test(t) ? 11 : /^Lớp 10 · /.test(t) ? 10 : 0);
const soY = (q) => (q.type === "tf4" ? 4 : 1);
const dinhDang = (a) => (a < 0 ? "−" : "") + String(Math.abs(a)).replace(".", ",");

/* ---------- chạy kiểm tra từng câu ---------- */
let n = 0;
const dung = new Set();
const run = (id, qs) => { const CK = RIENG[id]; assert.ok(CK, id + ": chưa có các mục kiểm tra của đề ở RIENG"); qs.forEach((q, i) => {
  const at = id + "#" + (i + 1), cs_ = CK.filter((c) => q.q.includes(c.has)), dai = Math.max(...cs_.map((c) => c.has.length)), ch = cs_.filter((c) => c.has.length === dai);
  assert.equal(ch.length, 1, at + ": cần đúng một mục kiểm tra cho “" + q.q.slice(0, 60) + "…”, có " + ch.length);
  const c = ch[0]; assert.ok(!dung.has(c), at + ": hai câu cùng khớp “" + c.has + "”"); dung.add(c);
  try {
    const want = c.right(q);
    if (q.type === "num") {
      assert.equal(typeof q.ans, "number", "đáp án Phần III ghi bằng số (đề thật không có ô phân số)");
      const lt = /\(.*làm tròn kết quả đến hàng (đơn vị|phần mười|phần trăm)\)/.exec(q.q);
      if (lt) {
        const k = { "đơn vị": 0, "phần mười": 1, "phần trăm": 2 }[lt[1]];
        assert.ok(q.tol === 10 ** -k / 2, "tol phải bằng nửa đơn vị làm tròn: " + q.tol);
        assert.ok(Math.abs(q.ans - lamTron(want, k)) < 1e-9, "đáp án " + q.ans + ", tính được " + toNum(want) + " ≈ " + lamTron(want, k));
        assert.ok(q.x.includes("≈ " + fmtDec(want, k)), "lời giải ghi “≈ " + fmtDec(want, k) + "”");
      } else {
        assert.ok(Math.abs(q.ans - toNum(want)) <= 1e-9 * Math.max(1, Math.abs(q.ans)), "đáp án " + q.ans + ", tính được " + toNum(want));
        assert.ok(q.tol === undefined, "đáp án tính chính xác, không cần sai số");
      }
      assert.ok([...dinhDang(q.ans)].length <= 4, "đáp án Phần III quá 4 kí tự: " + dinhDang(q.ans));
    } else {
      const got = q.type === "tf4" ? q.a : q.o[0];
      assert.strictEqual(JSON.stringify(got), JSON.stringify(want), "đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
    }
    if (q.type === "mc") {
      assert.ok(!q.o.slice(1).includes(q.o[0]) && new Set(q.o).size === 4, "bốn lựa chọn khác nhau");
      const dai_ = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(!(q.o[0].length > 1.2 * dai_ && q.o[0].length - dai_ > 8), "đáp án đúng dài hơn hẳn lựa chọn sai");
    }
    if (q.type === "tf4") assert.ok(q.a.includes(true) && q.a.includes(false), "đúng/sai 4 ý nên có cả ý đúng và ý sai");
  } catch (e) { throw new Error(at + ": " + e.message + "\n" + e.stack.split("\n").slice(1, 3).join("\n")); }
  n++;
}); };
DE.forEach((b) => { assert.equal(b.questions.length, b.n, b.id + ": số câu khác danh mục"); run(b.id, b.questions); });
assert.deepEqual(Object.keys(RIENG).sort(), DE.map((b) => b.id).sort(), "RIENG có đúng các đề thi thử của danh mục");
const thua = Object.entries(RIENG).flatMap(([id, ck]) => ck.filter((c) => !dung.has(c)).map((c) => id + ": " + c.has));
assert.deepEqual(thua, [], "có mục kiểm tra không khớp câu nào");
const hinh = DE.flatMap((b) => b.questions.filter((q) => q.svg));
assert.equal(hinh.filter((q) => hinhDaDoc.has(q.svg)).length, hinh.length, "hình nào cũng được đọc lại");
hinh.forEach((q) => chuHinh(q.svg, q.q.slice(0, 40)));

/* ---------- khung đề (Quyết định 764/QĐ-BGDĐT): danh mục, phần, điểm, mức độ, phạm vi lớp 10–12, lời dặn ---------- */
const KIEU = {};
DE.forEach((b) => {
  const at = b.id, qs = b.questions;
  assert.deepEqual([b.title, b.grade, b.subject, b.minutes, b.pts, b.file, !!b.pool], ["Toán 12 · Thi thử tốt nghiệp · Đề " + soDe(b.id), 12, "Toán", 90, 10, "12-toan.js", false], at + ": danh mục");
  assert.ok(TN && TN.banks.includes(b.id) && TN.grades.includes(12) && TN.subjects.includes("Toán"), at + ": phải gắn vào tn-thpt-2027");
  let k = 0;
  KHUNG.forEach(([part, type, so, pt]) => { const ph = qs.slice(k, k + so); k += so;
    assert.ok(ph.length === so && ph.every((q) => q.part === part && q.type === type && q.pt === pt), at + ": " + part + " gồm " + so + " câu " + type + ", mỗi câu " + pt + " điểm"); });
  assert.equal(k, qs.length, at + ": đề có đúng 22 câu theo khung 12 – 4 – 6");
  const G = Quiz.grade(qs, qs.map(() => null));
  assert.ok(G.max === 10 && G.got === 0, at + ": Quiz.grade: tối đa 10 điểm");
  assert.deepEqual(G.parts.map((p) => [p.part, p.max]), [[P1, 3], [P2, 4], [P3, 3]], at + ": điểm tối đa từng phần 3 – 4 – 3");
  // mức độ: Phần I Biết, Hiểu; Phần II mỗi câu gồm ý từ Biết đến Vận dụng (ghi Hiểu); Phần III Vận dụng
  assert.ok(qs.slice(0, 12).every((q) => [1, 2].includes(q.lv)) && [1, 2].every((l) => qs.slice(0, 12).filter((q) => q.lv === l).length >= 3), at + ": Phần I có cả câu Biết và câu Hiểu");
  assert.ok(qs.slice(12, 16).every((q) => q.lv === 2) && qs.slice(16).every((q) => q.lv === 3), at + ": Phần II mức Hiểu, Phần III mức Vận dụng");
  // phạm vi: chủ đề lớp 12 đúng chữ kho Toán 12; lớp 10, 11 theo tên chương của sách; số ý mỗi lớp (22 – 11 – 1, mỗi câu Phần II 4 ý)
  qs.forEach((q, i) => { assert.ok(lop(q.topic), at + "#" + (i + 1) + ": chủ đề lạ “" + q.topic + "”"); if (lop(q.topic) < 12 && CHUONG.size) assert.ok(CHUONG.has(q.topic), at + "#" + (i + 1) + ": chủ đề không đúng tên chương của sách: " + q.topic);
    assert.ok(("chu-de:12:toan:" + q.topic).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + q.topic); });
  const yLop = (l, a = 0, b = 22) => qs.slice(a, b).filter((q) => lop(q.topic) === l).reduce((s, q) => s + soY(q), 0);
  assert.deepEqual([12, 11, 10].map((l) => yLop(l)), [22, 11, 1], at + ": số ý lớp 12, 11, 10");
  assert.deepEqual([[12, 0, 12], [11, 0, 12], [10, 0, 12], [12, 12, 16], [11, 12, 16], [12, 16, 22], [11, 16, 22]].map(([l, a, c]) => yLop(l, a, c)), [6, 5, 1, 12, 4, 4, 2], at + ": phân bố lớp 12, 11, 10 trong từng phần");
  const y12 = yLop(12), yAll = qs.reduce((s, q) => s + soY(q), 0);
  ["Quyết định 764/QĐ-BGDĐT", "thí điểm thi trên máy tính", `${y12} trong ${yAll} ý`, `Đề có ${qs.length} câu, làm trong ${b.minutes} phút`, `Phần I gồm 12 câu nhiều lựa chọn (3 điểm`, `Phần II gồm 4 câu đúng/sai, mỗi câu 4 ý (4 điểm)`, `Phần III gồm 6 câu trả lời ngắn (3 điểm`, "không quá 4 kí tự", "Đề không có câu tự chấm"]
    .forEach((s) => assert.ok(b.note.includes(s), at + ": lời dặn thiếu “" + s + "”"));
  // đúng/sai 4 ý: trong một đề không lặp kiểu Đ/S
  const kieu = qs.filter((q) => q.type === "tf4").map((q) => q.a.map((a) => (a ? "Đ" : "S")).join(""));
  assert.equal(new Set(kieu).size, kieu.length, at + ": kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + kieu.join(", "));
  kieu.forEach((x) => (KIEU[x] = (KIEU[x] || 0) + 1));
  // đáp án đúng không hay là lựa chọn dài nhất hay ngắn nhất (mỗi kiểu không quá một phần ba số câu nhiều lựa chọn của đề)
  const mc = qs.filter((q) => q.type === "mc"), hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
  assert.ok(mc.filter((q) => hon(q, (a, c) => a > c)).length <= mc.length / 3, at + ": đáp án đúng là lựa chọn dài nhất ở quá một phần ba số câu");
  assert.ok(mc.filter((q) => hon(q, (a, c) => a < c)).length <= mc.length / 3, at + ": đáp án đúng là lựa chọn ngắn nhất ở quá một phần ba số câu");
  // lời giải không nói “phương án A”, “ý thứ hai”: app xáo phương án
  qs.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), at + ": lời giải nhắc vị trí của phương án: " + q.q.slice(0, 50)));
});
// kiểu Đ/S của cả các đề thi thử: mỗi kiểu nhiều nhất hai lần
assert.ok(Object.values(KIEU).every((c) => c <= 2), "một kiểu Đ/S dùng quá hai lần trong các đề thi thử: " + JSON.stringify(KIEU));
// đáp án không lặp chữ của nhãn chủ đề (trừ khi mọi lựa chọn cùng có chữ đó)
{ const phanNhan = (t) => t.replace(/^Lớp 1[01] · /, "").replace(/\s*\([^)]*\)$/, "").split(/ và |, |\. /).map((s) => s.trim().toLowerCase()).filter((s) => s.includes(" ") || s.length >= 6);
  DE.forEach((b) => b.questions.forEach((q, i) => { if (q.type !== "mc") return; phanNhan(q.topic).forEach((c) => { if (q.o[0].toLowerCase().includes(c)) assert.ok(q.o.every((o) => o.toLowerCase().includes(c)), `${b.id}#${i + 1}: đáp án “${q.o[0]}” lặp chữ “${c}” của nhãn chủ đề`); }); })); }

/* ---------- so với các kho Toán 12 và giữa các đề thi thử: đề bài không trùng, không gần trùng; đáp án không trùng câu cùng chủ đề ---------- */
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const khongDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const TU_CHUNG = [...CD12, ...[...CHUONG].map((t) => t.replace(/^Lớp 1[01] · /, "")), "mỗi ý sau đúng hay sai", "trong không gian oxyz", "trong mặt phẳng toạ độ oxy",
  "làm tròn kết quả đến hàng phần trăm", "làm tròn kết quả đến hàng phần mười", "làm tròn kết quả đến hàng đơn vị", "đơn vị trên các trục", "trên khoảng nào dưới đây",
  "đồ thị của hàm số", "đồ thị hàm số", "bảng biến thiên như hình vẽ", "có bảng biến thiên", "cho hàm số y", "vectơ pháp tuyến", "vectơ chỉ phương", "phương trình tham số", "mặt phẳng toạ độ",
  "mẫu số liệu ghép nhóm", "khoảng tứ phân vị", "tứ phân vị thứ ba", "độ lệch chuẩn", "theo công thức xác suất toàn phần", "theo công thức bayes", "công thức nhân xác suất", "sơ đồ hình cây",
  "hình phẳng giới hạn bởi", "khối tròn xoay", "sinh ra khi quay quanh trục ox", "góc giữa đường thẳng và mặt phẳng", "góc giữa hai mặt phẳng", "góc giữa hai đường thẳng",
  "vuông góc với mặt phẳng", "khoảng cách từ điểm", "giá trị lớn nhất", "giá trị nhỏ nhất", "giá trị cực đại", "giá trị cực tiểu", "điểm cực đại của đồ thị", "tiệm cận đứng", "tiệm cận ngang", "tiệm cận xiên",
  "cấp số cộng", "cấp số nhân", "số hạng đầu", "công sai", "công bội", "hai biến cố độc lập", "biến cố xung khắc", "có các nghiệm là", "tập xác định của hàm số", "tập giá trị của hàm số",
  "hình chóp s abcd có đáy abcd là", "hình lập phương abcd a b c d", "hình lăng trụ đứng", "được cho trong bảng (hình vẽ)", "mặt đất là mặt phẳng (oxy)", "hình chóp s abc có sa vuông góc với mặt phẳng (abc)", "đạt cực tiểu tại điểm nào dưới đây", "đạt cực đại tại điểm nào dưới đây", "đường thẳng đi qua điểm", "mặt phẳng đi qua điểm", "đi qua gốc toạ độ", "sau t phút kể từ lúc", "sau t giây kể từ lúc", "sau t giờ kể từ lúc", "hình vẽ là đồ thị của", "khẳng định nào dưới đây đúng", "khẳng định nào dưới đây là đúng", "có tâm i và bán kính", "trục hoành và hai đường thẳng", "trục ox và hai đường thẳng", "hàm số đạt cực đại tại", "hàm số đạt cực tiểu tại", "giao điểm của đồ thị với", "tập nghiệm của bất phương trình",
  "đáy abc là tam giác vuông tại", "hình chóp tứ giác đều s abcd", "của chất điểm tại thời điểm", "khoảng cách giữa hai đường thẳng", "là hình chiếu vuông góc của", "giá trị đại diện của", "đổi dấu từ dương sang âm",
  "đổi dấu từ âm sang dương", "số tự nhiên có hai chữ số", "vuông góc với hai đường thẳng cắt nhau"]
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null ? [] : [].concat(q.ans), (q.rubric || []).map((c) => c.c)).map(String);
const ten = new Map();
DE.forEach((b) => b.questions.forEach((q, i) => ten.set(q, b.id.replace("toan12-", "") + "#" + (i + 1))));
const CAU12 = BANKS.filter((b) => b.file === "12-toan.js" && !/^toan12-tn-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => { ten.set(q, b.id.replace("toan12-", "") + "#" + (i + 1)); return q; }));
const TNQ = DE.flatMap((b) => b.questions.map((q) => Object.assign(q, { _de: b.id })));
{
  const ds = BANKS.filter((b) => b.file === "12-toan.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ at: ten.get(q), k: gocChu(q.q) })));
  ds.forEach((d) => { const cung = ds.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
  const close = (a, b) => Math.abs(toNum(typeof a === "number" ? a : fr(a)) - toNum(typeof b === "number" ? b : fr(b))) < 1e-9;
  TNQ.forEach((q) => {
    const khac = CAU12.concat(TNQ.filter((p) => p._de !== q._de)), gan6 = [];
    khac.forEach((p) => { const s = " " + khongDau(p.q) + " "; chuoi(q.q, 6).forEach((c) => { if (s.includes(" " + c + " ")) gan6.push(ten.get(p) + ": " + c); });
      if (p.topic !== q.topic) return;
      if (q.type === "mc" && p.type === "mc") assert.notEqual(gocChu(q.o[0]), gocChu(p.o[0]), ten.get(q) + " ~ " + ten.get(p) + ": đáp án trùng câu cùng chủ đề");
      if (q.type === "num" && p.type === "num") assert.ok(!(close(q.ans, p.ans) && q.unit === p.unit), ten.get(q) + " ~ " + ten.get(p) + ": đáp án số trùng câu cùng chủ đề"); });
    assert.deepEqual(gan6, [], ten.get(q) + ": đề bài gần trùng (chuỗi 6 từ) câu khác"); });
}

/* ---------- dò lộ đáp án (Rút ra N5, N24; như tests/toan12-ck2.js): giữa mọi câu của một đề (đề cố định, mọi câu cùng hiện) và với lời dặn; giữa
   câu cùng chủ đề của các đề thi thử và các kho Toán 12 (đề “Ôn chủ đề” rút chung, bỏ câu tự luận). Số nguyên (từ 10), số thập phân, phân số, số
   âm chỉ tìm ở vị trí kết quả; đáp án bằng chữ có ở câu kia thì chỉ in ra khi chạy với DO_LO=1, danh sách đã xem ghi ở DA_XEM ---------- */
const val = (s) => +String(s).replace(/\s/g, "");
const KQ = "(?:=|≈|(?:^|[\\s(])(?:là|bằng|được))\\s+";
const SAU = "(?!\\d|,\\d|\\/|°|%|√|π|\\(|\\p{L}|[⁰¹²³⁴⁵⁶⁷⁸⁹ˣ]|\\s*[·+−:](?:\\s|\\d|\\())";
const soKQ = (s) => [...String(s).matchAll(new RegExp(KQ + "(\\d{1,3}(?: \\d{3})*)" + SAU, "gu"))].map((m) => val(m[1]));
const kqLa = (s, a) => new RegExp(KQ + a.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + SAU, "u").test(s);
const NOTES = [...new Set(DE.map((b) => b.note))].map((s, i) => { const nt = { q: "note" + i, x: s, topic: "note", type: "note" }; ten.set(nt, nt.q); return nt; });
const doLo = (qs, them, cap) => {
  const lo_ = [], chuLo = [];
  qs.forEach((q) => {
    const so = [], kq = [], cum = [];
    const them_ = (a) => { a = String(a).replace(/-/g, "−");
      if (/^\d{1,3}(?: \d{3})*(?: [^\d\s]+)?$/.test(a) && !/°$/.test(a)) so.push(val(a.split(/ (?=[^\d\s])/)[0]));
      else if (/^−?\d[\d ,/]*(?: [^\d\s]+)?$/.test(a) || /^−?\d*√\d+$/.test(a)) kq.push(a.replace(/ [^\d\s]+$/, ""));
      else if (a.length >= 3) cum.push(a); };
    if (q.type === "num") them_(typeof q.ans === "number" ? fmtDec(q.ans, Math.max(0, (String(q.ans).split(".")[1] || "").length)) : q.ans); else if (q.type === "mc") them_(q.o[0]); else return;
    qs.concat(them).forEach((p) => {
      if (p === q || !cap(p, q)) return;
      const C = chu(p), T = C.map((s) => s.toLowerCase()), at = `${ten.get(p)} lộ đáp án ${ten.get(q)}: `;
      so.filter((x) => x >= 10 && C.flatMap(soKQ).includes(x)).forEach((x) => lo_.push(at + x));
      kq.filter((a) => C.some((s) => kqLa(s, a))).forEach((a) => lo_.push(at + a));
      cum.filter((s) => { const re = new RegExp("(?<![\\p{L}\\p{N}])" + s.toLowerCase().replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + "(?![\\p{L}\\p{N}])", "u"); return T.some((t) => re.test(t)); }).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo: lo_, chuLo };
};
// trong một đề (mọi câu cùng hiện) và với lời dặn
const r1 = doLo(TNQ, NOTES, (p, q) => p.type === "note" || p._de === q._de);
// cùng chủ đề (đề “Ôn chủ đề”): câu của đề thi thử với câu cùng chủ đề của đề thi thử khác và của các kho Toán 12 (trừ câu tự luận)
const r2 = doLo(TNQ.concat(CAU12.filter((q) => q.type !== "essay" && TNQ.some((t) => t.topic === q.topic))), [], (p, q) => p.topic === q.topic && (p._de || "kho") !== (q._de || "kho") && (p._de || q._de));
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu khác (xem tay):\n" + [...r1.chuLo, ...r2.chuLo].join("\n"));
// Đã xem (Phiên N12-tn-toan): mọi chỗ dưới đây là cùng chữ ở hai câu về hai hàm số, hai bài toán khác nhau (điểm cực trị, khoảng đơn điệu
// của hàm số khác; quy tắc ba điểm ở câu trung điểm của tứ diện; đường thẳng song song với mặt phẳng (Oxy)), không cho biết đáp án của câu kia.
const DA_XEM = [
  "ck1-de1#3 lộ đáp án tn-de2#1: x = −2",
  "ck1-de2#3 lộ đáp án tn-de2#1: x = −2",
  "ck1-de2#1 lộ đáp án tn-de3#1: (−1; 1)",
  "tn-de3#1 lộ đáp án ck1-de2#1: (1; +∞)",
  "tn-de1#1 lộ đáp án ck1-ngau-nhien#2: x = 0",
  "tn-de1#13 lộ đáp án ck1-ngau-nhien#2: x = 0",
  "tn-de2#1 lộ đáp án ck1-ngau-nhien#2: x = 0",
  "tn-de4#15 lộ đáp án gk2-ngau-nhien#24: Song song",
];
assert.deepEqual([...r1.chuLo, ...r2.chuLo], DA_XEM, "đáp án bằng chữ có ở câu khác đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual([...r1.lo, ...r2.lo], [], "lộ đáp án:\n" + [...r1.lo, ...r2.lo].join("\n"));

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (nếu có); đa thức trong đề không là hàm của ví dụ, bài tập trong sách Toán 10–12 ---------- */
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const kho = TNQ.concat(NOTES);
if (SACH.length) {
  assert.ok(SACH.some((f) => /toan-12-tap-2/.test(f)) && SACH.some((f) => /toan-11-tap-2/.test(f)), "OnUp-Book có Toán 11, Toán 12");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => chu(q).flatMap((s) => chuoi(s, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  const tr8 = [...new Set(bao(8))];
  assert.deepEqual(tr8, [], "chuỗi 8 từ trùng chữ của sách");
  const toan = SACH.filter((f) => /toan-1[0-2]/.test(f)).map((f) => fs.readFileSync(f, "utf8").replace(/\s+/g, "").replace(/[—–−]/g, "-")).join("|");
  const mauHam = (e) => new RegExp([...e.replace(/\s+/g, "").replace(/[−–]/g, "-")].map((c) => ("⁰¹²³⁴⁵⁶⁷⁸⁹ˣ".includes(c) ? ".?" : c.replace(/[.*+?^${}()|[\]\\/-]/g, "\\$&"))).join(""));
  const hamSach = new Set();
  kho.forEach((q) => chu(q).forEach((s) => { for (const m of s.matchAll(/(?:y|f\(x\)|F\(x\)|f′\(x\)|y′) = ([^.,;:|]+?)(?=[.,;:|]| trên| có| với| và| là| khi| bằng| đạt| xét| \(|$)/g)) {
    const e = m[1].trim(); if (/\d/.test(e) && /[−+]/.test(e) && e.replace(/\s+/g, "").length >= 6 && mauHam(e).test(toan)) hamSach.add(ten.get(q) + ": " + e); } }));
  if (process.env.DO_SACH) console.log("Hàm số trùng sách:\n" + [...hamSach].join("\n"));
  assert.deepEqual([...hamSach], [], "hàm số trùng hàm của ví dụ, bài tập trong sách Toán 10–12");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả giữa các đề thi thử với nhau ---------- */
{
  const khac = BANKS.filter((b) => !b.pool).flatMap((b) => b.questions.map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " })))
    .concat(BANKS.filter((b) => b.pool).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " }))));
  const tr8 = [...new Set(TNQ.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, 8)))].flatMap((c) => khac.filter((o) => o.id !== q._de && o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`))))];
  if (process.env.DO_KHO) console.log("Chuỗi 8 từ trùng câu của kho khác:\n" + tr8.join("\n"));
  assert.deepEqual(tr8, [], "chuỗi 8 từ trùng câu của kho khác");
}

/* ---------- tự thử các bộ đọc với giá trị biết trước và với hình, câu cố ý viết sai ---------- */
{
  const tim = (has) => TNQ.find((q) => q.q.includes(has));
  // họ nghiệm, tập số
  assert.ok(cungTap(hoNghiem("x = ±π/3 + k2π (k ∈ ℤ)"), nghiemLG((x) => 2 * Math.cos(x) - 1)) && !cungTap(hoNghiem("x = π/3 + k2π (k ∈ ℤ)"), nghiemLG((x) => 2 * Math.cos(x) - 1)));
  assert.ok(khopTap(tapKhoang("(−∞; −2) ∪ (2; +∞)"), (x) => x * x > 4) && !khopTap(tapKhoang("[−2; 2]"), (x) => x * x < 4));
  // hình không gian: dời một điểm, đổi nét một cạnh
  const qc = tim("Đường thẳng BD vuông góc với mặt phẳng nào"), P = R3({ A: [0, 0, 0], B: [4, 0, 0], C: [4, 4, 0], D: [0, 4, 0], S: [0, 0, 5] }), Dc = diem(qc.svg, "thử");
  assert.throws(() => kiemKhoi(qc.svg.replace(`cx="${Dc.C[0]}" cy="${Dc.C[1]}"`, `cx="${Dc.C[0] + 7}" cy="${Dc.C[1]}"`).replace(/(<text x=")([\d.]+)(" y="[\d.]+"[^>]*>C<)/, (m, a, x, b) => a + (+x + 7) + b), P, CHOP4.f, CHOP4.e, [], "thử"), /không khớp toạ độ/);
  const ls = lines(qc.svg).filter((l) => l.dash), l0 = ls[0], cu = `<line x1="${l0.a[0]}" y1="${l0.a[1]}" x2="${l0.b[0]}" y2="${l0.b[1]}" stroke-width="1.5" stroke-dasharray="5 4"/>`;
  assert.ok(qc.svg.includes(cu)); assert.throws(() => kiemKhoi(qc.svg.replace(cu, cu.replace(' stroke-width="1.5" stroke-dasharray="5 4"', ' stroke-width="2"')), P, CHOP4.f, CHOP4.e, [], "thử"), /cạnh khuất/);
  // bảng biến thiên, đồ thị, mặt cầu, sơ đồ hình cây vẽ sai
  const qb = tim("Điểm cực đại của đồ thị hàm số đã cho là");
  assert.throws(() => khopBBT(docBBT(qb.svg.replace(">3</text>", ">4</text>"), "thử"), rf("x⁴ − 8x² + 3"), "thử"), /giá trị tại x/);
  const qd = tim("Hai đường tiệm cận đó cắt nhau"), gd = docDoThi(qd.svg, "thử");
  assert.ok(!khopDoThi(gd, rf("(−x + 2)/(x − 2)")) && khopDoThi(gd, rf("(−x + 3)/(x − 2)")));
  const qs_ = tim("Một quả pháo hoa nổ tại điểm I"); assert.throws(() => docCau(qs_.svg.replace(">R = 5<", ">R = 4<"), "thử"), /bán kính đường tròn không khớp/);
  const qt = tim("Một cửa hàng nhập xoài"); assert.throws(() => docCay(qt.svg.replace(">0,8</text>", ">0,9</text>"), "thử"), /cộng lại phải bằng 1/);
  // bộ dò lộ bắt được chỗ lộ cố ý viết sai
  const gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x }), thuLo = (qs) => { const r = doLo(qs, [], () => true); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  const a1 = tim("Tính khoảng cách từ điểm A đến mặt phẳng (SBC)"), b1 = tim("Một ứng viên dự tuyển");
  assert.deepEqual(thuLo([a1, gia(b1, "Ta được AH ≈ 3,17.")]), ["3,17"]);
  assert.deepEqual(thuLo([a1, gia(b1, "Đoạn đó dài 3,17 m.")]), []);
  const c1 = tim("Một câu lạc bộ có 12 thành viên"); assert.deepEqual(thuLo([c1, gia(b1, "Số cách là 1 320.")]), [1320]);
}
console.log(n, "câu đã tính lại hoặc đọc lại hình (" + DE.map((b) => b.questions.length).join(" + ") + " câu của " + DE.length + " đề thi thử tốt nghiệp), " + hinh.length + " hình; kiểu Đ/S: " + JSON.stringify(KIEU));
console.log("MATH OK");
