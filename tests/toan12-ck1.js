// Tính lại đáp án ngân hàng Toán 12 cuối kì I (data/banks/12-toan.js): hai đề cố định toan12-ck1-de1, toan12-ck1-de2 và các câu
// riêng của đề ngẫu nhiên toan12-ck1-ngau-nhien (Phiên N12-ck1-toan; Toán 12 tập một, Bài 1–10). Mỗi câu khớp đúng một mục kiểm tra
// (theo chữ has trong đề bài), mục đó đọc số liệu, biểu thức trong đề rồi tính lại đáp án: trắc nghiệm o[0] (đúng một lựa chọn thoả),
// đúng/sai 4 ý a (từng ý tính lại), trả lời bằng số ans; tự luận: các bước trong thang chấm, đáp án gợi ý.
// Hàm số: đọc biểu thức trong đề thành phân thức hữu tỉ với hệ số hữu tỉ chính xác ({n, d}), tính đạo hàm, điểm tới hạn (nghiệm hữu
// tỉ), khoảng đơn điệu, cực trị, giá trị lớn nhất, nhỏ nhất trên đoạn, tiệm cận đứng, ngang, xiên, giới hạn. Hình: bảng biến thiên,
// bảng xét dấu (đọc hàng x, hàng dấu, giá trị, chiều mũi tên; khớp với hàm số hoặc đạo hàm ẩn sau hình), đồ thị trên lưới ô vuông (lưới
// đều, trục trên đường lưới, số ghi trên trục đúng chỗ và không bị đường cong đè, đường cong thuộc đồ thị hàm số và vẽ đủ, đường nét
// đứt đúng các tiệm cận), hình hộp, hình lập phương, tứ diện (điểm có nhãn, đủ cạnh, cạnh khuất nét đứt, các vectơ cạnh song song bằng
// nhau trên hình), hình trong hệ trục Oxyz (đỉnh nằm trên trục), bảng tần số ghép nhóm (đường kẻ, chữ giữa ô, vừa ô). Mẫu số liệu ghép
// nhóm: khoảng biến thiên, tứ phân vị (công thức của sách), phương sai chia cho n, độ lệch chuẩn. Vectơ: toạ độ hữu tỉ, tích vô hướng,
// góc. Cuối cùng: mức độ, ma trận (hai đề cố định và câu riêng đều chia đúng ma trận; rút thử, đã làm hết một đề cố định thì không gặp
// lại câu của đề đó), câu tự luận chỉ ở ô Vận dụng rút 1 câu, đúng/sai 4 ý không lặp kiểu Đ/S, đáp án đúng không dài hơn hẳn lựa chọn
// sai và không hay là lựa chọn dài nhất hay ngắn nhất, không lặp chữ của nhãn chủ đề, chữ trong hình vừa khung và không đè nhau, dò lộ
// đáp án giữa các câu rút được cùng lúc (Rút ra N5, N24, N8) và, nếu có ../OnUp-Book, so mọi trường chữ với chữ OCR của mọi cuốn
// (không chuỗi 8 từ nào trùng; đa thức trong đề không là hàm của ví dụ, bài tập trong sách Toán 12) và với câu của mọi kho khác.
// Chạy: node tests/toan12-ck1.js → in MATH OK. DO_LO=1: in đáp án bằng chữ có ở câu rút được cùng lúc; DO_SACH=1: in chuỗi 6 từ
// trùng chữ OCR của sách; DO_KHO=1: chuỗi 6 từ trùng câu của kho khác.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan12-ck1-ngau-nhien";

/* ---------- số: hữu tỉ chính xác { n, d } (d > 0, tối giản); số thực (number) khi có căn không khai được ---------- */
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
const pw = (a, k) => { assert.ok(Number.isInteger(k) && k >= 0, "số mũ lạ " + k); let v = F(1); for (let i = 0; i < k; i++) v = mul(v, a); return v; };
const isqrt = (n) => { if (n < 0) return null; const r = Math.round(Math.sqrt(n)); return r * r === n ? r : null; };
const sqrt = (a) => { assert.ok(toNum(a) >= 0, "căn bậc hai của số âm"); if (isR(a)) { const p = isqrt(a.n), q = isqrt(a.d); if (p !== null && q !== null) return F(p, q); } return Math.sqrt(toNum(a)); };
const cmp = (a, b) => (isR(a) && isR(b) ? a.n * b.d - b.n * a.d : Math.abs(toNum(a) - toNum(b)) <= 1e-9 * Math.max(1, Math.abs(toNum(a))) ? 0 : toNum(a) - toNum(b));
const eq = (a, b) => cmp(a, b) === 0;
const isInt = (a) => isR(a) && a.d === 1;
// đọc một số viết như trong đề: "−3/7", "3", "1 800", "2,35"
const fr = (s) => {
  s = String(s).trim().replace(/[−–]/g, "-").replace(/\s+/g, " ");
  let m = /^(-?\d+)\/(-?\d+)$/.exec(s);
  if (m) return F(+m[1], +m[2]);
  m = /^(-?)(\d{1,3}(?: \d{3})+|\d+)(?:,(\d+))?$/.exec(s);
  if (m) { const ip = m[2].replace(/ /g, ""), fp = m[3] || ""; const v = F(+(ip + fp), 10 ** fp.length); return m[1] ? neg(v) : v; }
  throw new Error("không đọc được số: " + s);
};
// "−∞", "+∞" hoặc số
const frVC = (s) => (s === "−∞" ? -Infinity : s === "+∞" ? Infinity : fr(s));
const thou = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
// số thập phân viết kiểu Việt Nam ("−2,35", "2 695,5")
const fmtDec = (a, k) => {
  if (!isR(a)) { assert.ok(k !== undefined, "số thực cần ghi số chữ số"); a = F(Math.round(a * 10 ** k), 10 ** k); }
  let e = 0, d = a.d; while (d % 2 === 0) { d /= 2; e++; } let e5 = 0; while (d % 5 === 0) { d /= 5; e5++; }
  assert.equal(d, 1, "không viết được thành số thập phân hữu hạn: " + a.n + "/" + a.d);
  const places = k === undefined ? Math.max(e, e5) : k;
  const s = String(Math.abs(a.n) * (10 ** places / a.d)).padStart(places + 1, "0");
  return (a.n < 0 ? "−" : "") + thou(s.slice(0, s.length - places)) + (places ? "," + s.slice(s.length - places) : "");
};
// làm tròn x đến k chữ số sau dấu phẩy theo quy tắc của sách (chữ số bỏ đi ≥ 5 thì tăng); số ở sát ranh giới làm tròn thì báo lỗi
const lamTron = (x, k) => {
  const p = 10 ** k, t = Math.abs(toNum(x)) * p;
  if (!isR(x)) assert.ok(Math.abs(t - Math.floor(t) - 0.5) > 1e-4, "số ở sát ranh giới làm tròn: " + toNum(x));
  return Math.sign(toNum(x)) * Math.floor(t + 0.5 + 1e-9) / p;
};

/* ---------- bộ đọc biểu thức số (lựa chọn như "2√10", "√117", "9√2") ---------- */
function ev(src) {
  const s = String(src).replace(/[−–]/g, "-");
  const toks = []; let i = 0;
  while (i < s.length) {
    const c = s[i], rest = s.slice(i);
    if (c === " ") { i++; continue; }
    const m = /^\d{1,3}(?: \d{3})+(?:,\d+)?(?![\d])/.exec(rest) || /^\d+(?:,\d+)?/.exec(rest);
    if (m) { toks.push({ t: "n", v: fr(m[0]) }); i += m[0].length; continue; }
    if ("+-·/()√".includes(c)) { toks.push({ t: c }); i++; continue; }
    throw new Error("kí tự lạ “" + c + "” trong " + src);
  }
  let p = 0;
  const peek = () => toks[p], next = () => toks[p++];
  const atom = () => { const t = next(); assert.ok(t, "thiếu số trong " + src); if (t.t === "n") return t.v; if (t.t === "(") { const v = expr(); assert.equal((next() || {}).t, ")"); return v; } if (t.t === "√") return sqrt(atom()); throw new Error("không hiểu " + src); };
  const unary = () => { const t = peek(); if (t && t.t === "-") { next(); return neg(unary()); } return atom(); };
  const term = () => { let v = unary(); for (;;) { const t = peek(); if (t && (t.t === "·" || t.t === "/")) { next(); const w = unary(); v = t.t === "·" ? mul(v, w) : div(v, w); } else if (t && (t.t === "n" || t.t === "(" || t.t === "√")) v = mul(v, atom()); else return v; } };
  const expr = () => { let v = term(); while (peek() && (peek().t === "+" || peek().t === "-")) { const op = next().t, w = term(); v = op === "+" ? add(v, w) : sub(v, w); } return v; };
  const v = expr(); assert.equal(p, toks.length, "thừa kí tự trong " + src); return v;
}

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
function hs(src, bien, vars) {
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
const nghiem = (p) => nghiem0(p, true);
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
const lo = (f) => nghiem(f.Q); // chỗ hàm số không xác định
const diemTH = (f) => { const d = rfDer(f), h = lo(f); return nghiem(d.P).filter((x) => !h.some((y) => eq(x, y))); };
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

/* ---------- vectơ toạ độ ---------- */
const vSub = (a, b) => a.map((x, i) => sub(x, b[i]));
const vAdd = (a, b) => a.map((x, i) => add(x, b[i]));
const vScale = (a, k) => a.map((x) => mul(x, k));
const vDot = (a, b) => a.reduce((s, x, i) => add(s, mul(x, b[i])), F(0));
const vEq = (a, b) => a.every((x, i) => eq(x, b[i]));
const vLen = (a) => sqrt(vDot(a, a));
const gocDo = (a, b) => (Math.acos(Math.max(-1, Math.min(1, toNum(vDot(a, b)) / (toNum(vLen(a)) * toNum(vLen(b)))))) * 180) / Math.PI;
const toaDo = (s) => { const m = /^\((.+); (.+); (.+)\)$/.exec(s.trim()); assert.ok(m, "không phải toạ độ: " + s); return [fr(m[1]), fr(m[2]), fr(m[3])]; };
const ten2 = (s) => s.match(/[A-Z][′₁₂]?/g);

/* ---------- hình: phần tử SVG ---------- */
const nums = (s) => s.trim().split(/[\s,]+/).map(Number);
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const lines = (svg) => [...svg.matchAll(/<line [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { a: [+a.x1, +a.y1], b: [+a.x2, +a.y2], stroke: a.stroke || "", w: +(a["stroke-width"] || 1), dash: !!a["stroke-dasharray"] }; });
const circles = (svg) => [...svg.matchAll(/<circle [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { c: [+a.cx, +a.cy], r: +a.r }; });
const pts2 = (s) => { const v = nums(s), p = []; for (let i = 0; i < v.length; i += 2) p.push([v[i], v[i + 1]]); return p; };
const polygons = (svg) => [...svg.matchAll(/<polygon [^>]*>/g)].map((m) => pts2(attrs(m[0]).points));
const polylines = (svg) => [...svg.matchAll(/<polyline [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { p: pts2(a.points), stroke: a.stroke || "" }; });
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { at: [+a.x, +a.y], t: m[2].replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"), b: a["font-weight"] === "700", it: a["font-style"] === "italic", fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start" }; });
const rong = (t) => (t.b ? 0.62 : 0.55) * t.fs * [...t.t].length; // ước bề rộng chữ (Noto Sans; chữ đậm rộng hơn)
const hopChu = (t) => { const w = rong(t), x0 = t.anchor === "middle" ? t.at[0] - w / 2 : t.anchor === "end" ? t.at[0] - w : t.at[0]; return [x0, t.at[1] - 0.75 * t.fs, x0 + w, t.at[1] + 0.25 * t.fs]; };
const subv = (p, q) => [p[0] - q[0], p[1] - q[1]];
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const cross = (u, v) => u[0] * v[1] - u[1] * v[0];
// mọi chữ trong hình cỡ từ 13 trở lên, nằm trọn trong khung, không đè lên nhau
const chuHinh = (svg, ten) => {
  const v = nums(/viewBox="([^"]+)"/.exec(svg)[1]), T = texts(svg);
  T.forEach((t) => { const h = hopChu(t); assert.ok(t.fs >= 13, ten + ": chữ “" + t.t + "” nhỏ hơn cỡ 13"); assert.ok(h[0] >= 0 && h[2] <= v[2] && h[1] >= 0 && h[3] <= v[3], ten + ": chữ “" + t.t + "” tràn khỏi khung hình"); });
  T.forEach((t, i) => T.slice(i + 1).forEach((u) => { const a = hopChu(t), b = hopChu(u); assert.ok(!(a[0] < b[2] - 1 && b[0] < a[2] - 1 && a[1] < b[3] - 1 && b[1] < a[3] - 1), ten + ": chữ “" + t.t + "” đè lên chữ “" + u.t + "”"); }));
};

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
  const z = nghiem(g.P), moc = [-Infinity, ...z, Infinity];
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

/* ---------- hình không gian ---------- */
// điểm có nhãn: chấm tròn nhỏ (r ≤ 4) và chữ đậm một chữ cái hoa (có thể có dấu phẩy trên ′) cạnh chấm
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
// các cạnh vẽ trong hình: { thay: [["A","B"]…], khuat: […] }; cạnh nối đúng hai điểm có nhãn
const canhHinh = (svg, D, ten) => {
  const r = { thay: [], khuat: [] };
  lines(svg).filter((l) => l.w >= 1.5 && l.w !== 1.2).forEach((l) => {
    const a = Object.keys(D).find((k) => dist(D[k], l.a) < 0.3), b = Object.keys(D).find((k) => dist(D[k], l.b) < 0.3);
    if (!a || !b) return;
    (l.dash ? r.khuat : r.thay).push([a, b].sort().join("-"));
  });
  return r;
};
// hình hộp (đỉnh đáy dưới d[0..3] theo thứ tự, đáy trên d[4..7]); khuat: đỉnh khuất (ba cạnh nét đứt đi ra từ đỉnh đó)
const kiemHop = (svg, d, khuat, ten) => {
  const D = diem(svg, ten), v = (p, q) => subv(D[q], D[p]), bang_ = (a, b) => Math.abs(a[0] - b[0]) < 0.3 && Math.abs(a[1] - b[1]) < 0.3;
  assert.deepEqual(Object.keys(D).sort(), d.slice().sort(), ten + ": nhãn các đỉnh");
  const [A, B, C, Dd, A1, B1, C1, D1] = d;
  assert.ok(bang_(v(A, B), v(Dd, C)) && bang_(v(A, B), v(A1, B1)) && bang_(v(A, B), v(D1, C1)), ten + ": các cạnh song song với " + A + B + " không bằng nhau trên hình");
  assert.ok(bang_(v(A, Dd), v(B, C)) && bang_(v(A, Dd), v(A1, D1)) && bang_(v(A, Dd), v(B1, C1)), ten + ": các cạnh song song với " + A + Dd + " không bằng nhau trên hình");
  assert.ok(bang_(v(A, A1), v(B, B1)) && bang_(v(A, A1), v(C, C1)) && bang_(v(A, A1), v(Dd, D1)), ten + ": các cạnh bên không bằng nhau trên hình");
  const ca = canhHinh(svg, D, ten), all = [[A, B], [B, C], [C, Dd], [Dd, A], [A1, B1], [B1, C1], [C1, D1], [D1, A1], [A, A1], [B, B1], [C, C1], [Dd, D1]].map((e) => e.sort().join("-"));
  assert.deepEqual([...ca.thay, ...ca.khuat].sort(), all.sort(), ten + ": hình hộp cần đủ 12 cạnh");
  assert.deepEqual(ca.khuat.sort(), all.filter((e) => e.split("-").includes(khuat)).sort(), ten + ": cạnh khuất là ba cạnh đi ra từ " + khuat);
  return D;
};
// trục toạ độ: ba đoạn nét 1,2 có đầu mũi tên, chữ x, y, z ở đầu mũi tên; đỉnh trên trục: gốc, đỉnh và đầu mũi tên thẳng hàng, đỉnh ở giữa
const kiemTruc = (svg, D, O, X, Y, Z, ten) => {
  const tr = lines(svg).filter((l) => l.w === 1.2), T = texts(svg).filter((t) => t.it);
  [["x", X], ["y", Y], ["z", Z]].forEach(([n, P]) => {
    const l = tr.filter((l) => dist(l.a, D[P]) < 0.3); assert.equal(l.length, 1, ten + ": trục O" + n + " phải đi ra từ " + P);
    const tip = polygons(svg).map((g) => g[0]).find((q) => dist(q, l[0].b) < 12 && dist(q, D[P]) > dist(l[0].b, D[P]));
    assert.ok(tip, ten + ": trục O" + n + " cần đầu mũi tên");
    assert.ok(T.some((t) => t.t === n && dist(t.at, tip) < 22), ten + ": thiếu chữ " + n + " ở đầu trục");
    const u = subv(D[P], D[O]), w = subv(tip, D[O]);
    assert.ok(Math.abs(cross(u, w)) / Math.hypot(...w) < 0.4 && Math.hypot(...u) < Math.hypot(...w), ten + ": đỉnh " + P + " phải nằm trên tia O" + n);
  });
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

/* ---------- lựa chọn, mệnh đề ---------- */
// lựa chọn duy nhất thoả f (đọc từng lựa chọn bằng re)
const theo = (q, re, f) => { const m = q.o.filter((o) => { const k = re.exec(o); return k && f(k); }); assert.equal(m.length, 1, "cần đúng một lựa chọn đúng: " + JSON.stringify(q.o)); return m[0]; };
const khoang = (s) => { const m = /^\((.+); (.+)\)$/.exec(s); return m && [frVC(m[1].trim()), frVC(m[2].trim())]; };
const hamTrongDe = (q, re) => { const m = re.exec(q.q); assert.ok(m, "đề thiếu " + re); return hs(m[1]); };
const essayCheck = (q, rb, xx) => { const r = q.rubric.map((c) => c.c).join(" | "); rb.forEach((s) => assert.ok(r.includes(s), "thang chấm thiếu " + s)); xx.forEach((s) => assert.ok(q.x.includes(s), "gợi ý thiếu " + s)); };
const SO_CHU = { một: 1, hai: 2, ba: 3, bốn: 4 };
// mệnh đề về hàm số f (đúng/sai 4 ý)
const menhDeHam = (s, f) => {
  let m;
  if ((m = /^Đạo hàm của hàm số là y′ = (.+)$/.exec(s))) return rfEq(hs(m[1]), rfDer(f));
  if ((m = /^Phương trình y′ = 0 có đúng (\S+) nghiệm thuộc đoạn \[(.+); (.+)\]$/.exec(s))) return diemTH(f).filter((x) => cmp(x, fr(m[2])) >= 0 && cmp(x, fr(m[3])) <= 0).length === SO_CHU[m[1]];
  if ((m = /^Giá trị (lớn|nhỏ) nhất của hàm số trên đoạn \[(.+); (.+)\] bằng (.+)$/.exec(s))) { const g = gtTrenDoan(f, fr(m[2]), fr(m[3])); return eq(m[1] === "lớn" ? g.max : g.min, fr(m[4])); }
  if ((m = /^Hàm số (đồng|nghịch) biến trên khoảng (\(.+\))$/.exec(s))) { const [a, b] = khoang(m[2]); return donDieuTren(f, a, b, m[1] === "đồng" ? 1 : -1); }
  if ((m = /^Hàm số đạt cực (tiểu|đại) tại x = (.+)$/.exec(s))) return cucTri(f).some((c) => c.loai === (m[1] === "tiểu" ? "CT" : "CĐ") && eq(c.x, fr(m[2])));
  if ((m = /^Giá trị cực (đại|tiểu) của hàm số bằng (.+)$/.exec(s))) return eq(motCucTri(f, m[1] === "đại" ? "CĐ" : "CT").y, fr(m[2]));
  if ((m = /^Phương trình f\(x\) = (.+) có ba nghiệm phân biệt$/.exec(s))) { assert.equal(deg(f.Q), 0); return demNghiem(rfSub(f, RF([fr(m[1])])).P) === 3; }
  if ((m = /^Điểm \((.+); (.+)\) là tâm đối xứng của đồ thị$/.exec(s))) { assert.equal(deg(f.P), 3, "tâm đối xứng: hàm bậc ba"); const x0 = nghiem(pDer(pDer(f.P)))[0]; return eq(x0, fr(m[1])) && eq(rfEval(f, x0), fr(m[2])); }
  if ((m = /^Đường thẳng x = (.+) là tiệm cận đứng của đồ thị hàm số$/.exec(s))) return tiemCan(f).dung.some((x) => eq(x, fr(m[1])));
  if (/^Đồ thị hàm số có tiệm cận ngang$/.test(s)) return !!tiemCan(f).ngang;
  if ((m = /^Đường thẳng y = (.+) là tiệm cận xiên của đồ thị hàm số$/.exec(s))) { const t = tiemCan(f).xien; return !!t && rfEq(hs(m[1]), RF([t.c, t.m])); }
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
// hình hộp ABCD.A′B′C′D′ theo cơ sở afin AB = (1; 0; 0), AD = (0; 1; 0), AA′ = (0; 0; 1); hình lập phương cạnh s: toạ độ vuông góc
const HOP = (s) => { s = s || F(1); const o = { A: [F(0), F(0), F(0)], B: [s, F(0), F(0)], D: [F(0), s, F(0)], "A′": [F(0), F(0), s] }; o.C = vAdd(o.B, o.D); o["B′"] = vAdd(o.B, o["A′"]); o["D′"] = vAdd(o.D, o["A′"]); o["C′"] = vAdd(o.C, o["A′"]); return o; };
const vecTen = (P, s) => { const [a, b] = ten2(s); assert.ok(P[a] && P[b], "điểm lạ " + s); return vSub(P[b], P[a]); };
const menhDeVec = (s, P) => {
  let m;
  if ((m = /^Góc giữa hai vectơ (\S+) và (\S+) bằng (\d+)°$/.exec(s))) return Math.abs(gocDo(vecTen(P, m[1]), vecTen(P, m[2])) - +m[3]) < 1e-9;
  if ((m = /^vectơ (\S+) · vectơ (\S+) = (.+)$/.exec(s))) return eq(vDot(vecTen(P, m[1]), vecTen(P, m[2])), ev(m[3]));
  if ((m = /^Điểm (\S+) có toạ độ (\(.+\))$/.exec(s))) return vEq(P[m[1]], toaDo(m[2]));
  if ((m = /^Vectơ (\S+) có toạ độ (\(.+\))$/.exec(s))) return vEq(vecTen(P, m[1]), toaDo(m[2]));
  if ((m = /^Hình chiếu vuông góc của điểm (\S+) trên trục O([xyz]) là điểm (\S+)$/.exec(s))) { const k = "xyz".indexOf(m[2]), h = P[m[1]].map((v, i) => (i === k ? v : F(0))); return vEq(h, P[m[3]]); }
  throw new Error("không đọc được mệnh đề: " + s);
};
const tfTheo = (q, f) => q.o.map((s) => f(s));

/* ---------- kiểm tra từng câu ---------- */
const hinhDaDoc = new Set();
const doc = (q, ham, ...a) => { hinhDaDoc.add(q.svg); return ham(q.svg, ...a); };
const CHECKS = [
  // Bài 1. Tính đơn điệu và cực trị của hàm số
  { has: "bảng xét dấu của đạo hàm như hình vẽ. Hàm số y = f(x) nghịch biến", right: (q) => {
    const b = doc(q, docBBT, "bảng xét dấu"); khopDau(b, hs("−x(x + 3)(x − 2)"), "bảng xét dấu");
    return theo(q, /^(\(.+\))$/, (k) => { const [a, c] = khoang(k[1]); return donDieuBang(b, a, c, -1); }); } },
  { has: "Hàm số y = f(x) có bao nhiêu điểm cực trị?", right: (q) => {
    const b = doc(q, docBBT, "bảng xét dấu"); khopDau(b, hs("(x + 1)(x − 2)²(x − 4)"), "bảng xét dấu");
    const n = b.sg.slice(1).filter((s, i) => s !== b.sg[i] && b.mark[i + 1] !== "‖").length;
    return theo(q, /^(\d+)$/, (k) => +k[1] === n); } },
  { has: "Giá trị cực đại của hàm số đã cho bằng", right: (q) => {
    const b = doc(q, docBBT, "bảng biến thiên"), f = hs("(3x³ − 9x² − 27x + 49)/16"); khopBBT(b, f, "bảng biến thiên");
    return theo(q, /^(.+)$/, (k) => eq(fr(k[1]), motCucTri(f, "CĐ").y)); } },
  { has: "Giá trị cực tiểu của hàm số đã cho bằng", right: (q) => {
    const b = doc(q, docBBT, "bảng biến thiên"), f = hs("(x² + 3)/(x − 1)"); khopBBT(b, f, "bảng biến thiên");
    return theo(q, /^(.+)$/, (k) => eq(fr(k[1]), motCucTri(f, "CT").y)); } },
  { has: "Hàm số đã cho đồng biến trên khoảng nào dưới đây?", right: (q) => {
    const g = doc(q, docDoThi, "đồ thị"), f = hs("x³ − 3x + 1"); assert.ok(khopDoThi(g, f), "đồ thị không khớp hàm số");
    return theo(q, /^(\(.+\))$/, (k) => { const [a, c] = khoang(k[1]); return donDieuTren(f, a, c, 1); }); } },
  { has: "Hàm số đã cho đạt cực tiểu tại điểm nào dưới đây?", right: (q) => {
    const g = doc(q, docDoThi, "đồ thị"), f = hs("−x⁴ + 2x² + 2"); assert.ok(khopDoThi(g, f), "đồ thị không khớp hàm số");
    return theo(q, /^x = (.+)$/, (k) => eq(motCucTri(f, "CT").x, fr(k[1]))); } },
  { has: "Tìm giá trị cực đại của hàm số y = ", right: (q) => motCucTri(hamTrongDe(q, /y = (.+)\.$/), "CĐ").y },
  { has: "Cho hàm số y = 2x³ + 3x² − 12x − 1. Mỗi ý sau đúng hay sai?", right: (q) => tfTheo(q, (s) => menhDeHam(s, hamTrongDe(q, /y = (.+)\. Mỗi/))) },
  { has: "Hàm số y = (x² − 3x + 3)/(x − 2) nghịch biến trên khoảng nào dưới đây?", right: (q) => {
    const f = hamTrongDe(q, /Hàm số y = (.+) nghịch biến/); return theo(q, /^(\(.+\))$/, (k) => { const [a, c] = khoang(k[1]); return donDieuTren(f, a, c, -1); }); } },
  { has: "đồng biến trên ℝ?", right: (q) => {
    const src = /y = (.+) đồng biến/.exec(q.q)[1]; let n = 0;
    for (let m = -100; m <= 100; m++) { const d = rfDer(hs(src, "x", { m: F(m) })).P; assert.equal(deg(d), 2); if (toNum(d[2]) > 0 && toNum(sub(mul(d[1], d[1]), mul(F(4), mul(d[2], d[0])))) <= 0) { assert.ok(Math.abs(m) < 100, "tập giá trị m không bị chặn"); n++; } }
    return F(n); } },
  { has: "để hàm số y = (x + m)/(x + 4) đồng biến trên từng khoảng xác định", right: (q) => {
    const [, src, a, b] = /hàm số y = (.+) đồng biến/.exec(q.q).concat(/thuộc đoạn \[(.+); (.+)\]/.exec(q.q).slice(1)); let n = 0;
    for (let m = toNum(fr(a)); m <= toNum(fr(b)); m++) { const f = hs(src, "x", { m: F(m) }); if (deg(f.P) <= 0) continue; if (bienThien(f).every((k) => k.s > 0)) n++; }
    return F(n); } },
  { has: "Biết hàm số y = x³ + ax² + bx + 10 đạt cực trị tại x = −1 và x = 5", right: (q) => {
    const [x1, x2] = /tại x = (.+?) và x = (.+?)\./.exec(q.q).slice(1).map(fr);
    // y′ = 3x² + 2ax + b nhận x1, x2 làm nghiệm: 2a·x + b = −3x² tại hai điểm
    const a = div(sub(mul(F(-3), mul(x1, x1)), mul(F(-3), mul(x2, x2))), mul(F(2), sub(x1, x2))), b = sub(mul(F(-3), mul(x1, x1)), mul(F(2), mul(a, x1)));
    const f = hs("x³ + ax² + bx + 10", "x", { a, b }); assert.deepEqual(diemTH(f).map(toNum), [x1, x2].map(toNum));
    return motCucTri(f, "CT").y; } },
  // Bài 2. Giá trị lớn nhất và giá trị nhỏ nhất của hàm số
  { has: "liên tục trên đoạn [−2; 4] và có bảng biến thiên", right: (q) => {
    const b = doc(q, docBBT, "bảng biến thiên"); assert.deepEqual(b.pts.map((p) => p.t).filter((t, i, a) => !i || i === a.length - 1), ["−2", "4"]);
    const ys = b.val.flat().map(fr), max = ys.reduce((m, y) => (cmp(y, m) > 0 ? y : m));
    return theo(q, /^(.+)$/, (k) => eq(fr(k[1]), max)); } },
  { has: "liên tục trên đoạn [−1; 5] và có bảng biến thiên", right: (q) => {
    const b = doc(q, docBBT, "bảng biến thiên"); assert.deepEqual(b.pts.map((p) => p.t).filter((t, i, a) => !i || i === a.length - 1), ["−1", "5"]);
    const ys = b.val.flat().map(fr), max = ys.reduce((m, y) => (cmp(y, m) > 0 ? y : m));
    return theo(q, /^(.+)$/, (k) => eq(fr(k[1]), max)); } },
  { has: "trên đoạn [−1; 3]. Giá trị nhỏ nhất của hàm số trên đoạn [−1; 3] bằng", right: (q) => {
    const g = doc(q, docDoThi, "đồ thị"), f = hs("x³ − 3x²"); assert.ok(khopDoThi(g, f, [F(-1), F(3)]), "đồ thị không khớp hàm số");
    assert.deepEqual(g.dots.map((p) => p.map((v) => Math.round(v * 1000) / 1000)), [[-1, toNum(rfEval(f, F(-1)))], [3, toNum(rfEval(f, F(3)))]], "hai đầu mút đánh dấu");
    const c = g.curves.flat(); assert.ok(Math.abs(Math.min(...c.map((p) => p[0])) + 1) < 1e-6 && Math.abs(Math.max(...c.map((p) => p[0])) - 3) < 1e-6, "đồ thị vẽ đúng trên đoạn [−1; 3]");
    return theo(q, /^(.+)$/, (k) => eq(fr(k[1]), gtTrenDoan(f, F(-1), F(3)).min)); } },
  { has: "Cho hàm số y = x³ − 3x² − 45x + 20 xét trên đoạn [−4; 6]. Mỗi ý sau đúng hay sai?", right: (q) => tfTheo(q, (s) => menhDeHam(s, hamTrongDe(q, /y = (.+) xét trên/))) },
  { has: "Giá trị nhỏ nhất của hàm số y = x + 9/x trên đoạn [1; 4] bằng", right: (q) => {
    const m = /y = (.+) trên đoạn \[(.+); (.+)\]/.exec(q.q), g = gtTrenDoan(hs(m[1]), fr(m[2]), fr(m[3])); return theo(q, /^(.+)$/, (k) => eq(fr(k[1]), g.min)); } },
  { has: "Tìm giá trị lớn nhất của hàm số y = −x⁴ + 8x² + 1 trên đoạn", right: (q) => { const m = /y = (.+) trên đoạn \[(.+); (.+)\]/.exec(q.q); return gtTrenDoan(hs(m[1]), fr(m[2]), fr(m[3])).max; } },
  { has: "giá trị nhỏ nhất của hàm số y = x³ − 3x + m trên đoạn [0; 2] bằng 5", right: (q) => {
    const m = /y = (.+) \+ m trên đoạn \[(.+); (.+)\] bằng (.+)\.$/.exec(q.q); return sub(fr(m[4]), gtTrenDoan(hs(m[1]), fr(m[2]), fr(m[3])).min); } },
  { has: "Tìm giá trị lớn nhất của biểu thức P = x²y.", right: (q) => { const s = fr(/x \+ y = (\d+)/.exec(q.q)[1]); return gtTrenDoan(hs("x²(S − x)", "x", { S: s }), F(0), s).max; } },
  { has: "Tìm giá trị nhỏ nhất của hàm số y = sin³x + 3sin²x − 9sin x − 6.", right: (q) => {
    const src = /y = (.+)\.$/.exec(q.q)[1].replace(/sin³x/g, "t³").replace(/sin²x/g, "t²").replace(/sin x/g, "t"); return gtTrenDoan(hs(src, "t"), F(-1), F(1)).min; } },
  // Bài 3. Đường tiệm cận của đồ thị hàm số
  { has: "Tiệm cận đứng của đồ thị hàm số đã cho là đường thẳng", right: (q) => {
    const b = doc(q, docBBT, "bảng biến thiên"), f = hs("(2x + 7)/(x + 3)"); khopBBT(b, f, "bảng biến thiên");
    const { lo: l } = khoangBang(b); assert.equal(l.length, 1); return theo(q, /^x = (.+)$/, (k) => eq(fr(k[1]), l[0])); } },
  { has: "Tiệm cận xiên của đồ thị hàm số y = (x² − 3x + 4)/(x − 1) là đường thẳng", right: (q) => {
    const t = tiemCan(hamTrongDe(q, /y = (.+) là đường thẳng/)).xien; return theo(q, /^y = (.+)$/, (k) => rfEq(hs(k[1]), RF([t.c, t.m]))); } },
  { has: "Tiệm cận ngang của đồ thị hàm số y = (8x − 3)/(2x + 5) là đường thẳng", right: (q) => {
    const t = tiemCan(hamTrongDe(q, /y = (.+) là đường thẳng/)); return theo(q, /^y = (.+)$/, (k) => eq(fr(k[1]), t.ngang)); } },
  { has: "có tất cả bao nhiêu đường tiệm cận", right: (q) => { const t = tiemCan(hamTrongDe(q, /y = (.+) có tất cả/)); return F(t.dung.length + (t.ngang ? 1 : 0) + (t.xien ? 1 : 0)); } },
  { has: "Đường tiệm cận ngang của đồ thị hàm số là đường thẳng", right: (q) => {
    const g = doc(q, docDoThi, "đồ thị"), f = hs("(x + 3)/(x − 1)"); assert.ok(khopDoThi(g, f), "đồ thị không khớp hàm số"); khopTiemCan(g, f, "đồ thị");
    assert.equal(g.tcn.length, 1); return theo(q, /^y = (.+)$/, (k) => Math.abs(toNum(fr(k[1])) - g.tcn[0]) < 1e-6); } },
  { has: "Cho hàm số y = (2x² − 3x + 5)/(x + 1). Mỗi ý sau đúng hay sai?", right: (q) => tfTheo(q, (s) => menhDeHam(s, hamTrongDe(q, /y = (.+)\. Mỗi/))) },
  // Bài 4. Khảo sát sự biến thiên và vẽ đồ thị của hàm số
  { has: "Đường cong trong hình vẽ là đồ thị của hàm số nào dưới đây?", right: (q) => { const g = doc(q, docDoThi, "đồ thị"); assert.deepEqual(g.tcd.concat(g.tcn, g.tcx), [], "đồ thị hàm bậc ba không có tiệm cận"); return theo(q, /^y = (.+)$/, (k) => khopDoThi(g, hs(k[1]))); } },
  { has: "đồ thị của một hàm số phân thức, hai đường nét đứt là hai đường tiệm cận của đồ thị. Đó là hàm số nào", right: (q) => {
    const g = doc(q, docDoThi, "đồ thị"), r = theo(q, /^y = (.+)$/, (k) => khopDoThi(g, hs(k[1]))); khopTiemCan(g, hs(r.slice(4)), "đồ thị"); return r; } },
  { has: "các đường nét đứt là tiệm cận đứng và tiệm cận xiên của đồ thị. Hàm số đó là", right: (q) => {
    const g = doc(q, docDoThi, "đồ thị"), r = theo(q, /^y = (.+)$/, (k) => khopDoThi(g, hs(k[1]))); khopTiemCan(g, hs(r.slice(4)), "đồ thị"); return r; } },
  { has: "phương trình f(x) = m có ba nghiệm thực phân biệt", right: (q) => {
    const b = doc(q, docBBT, "bảng biến thiên"), f = hs("2x³/3 − x² − 4x + 8/3"); khopBBT(b, f, "bảng biến thiên");
    // đếm nghiệm của f(x) = m theo bảng: mỗi khoảng đơn điệu cho một nghiệm khi m nằm giữa hai giá trị ở hai đầu; m bằng giá trị tại một điểm thì điểm đó là nghiệm
    const v = (s) => (s === "+∞" ? Infinity : s === "−∞" ? -Infinity : toNum(fr(s)));
    let n = 0;
    for (let m = -100; m <= 100; m++) {
      let c = 0;
      b.sg.forEach((s, i) => { const a = v(b.val[i][1]), e = v(b.val[i + 1][0]); if (Math.min(a, e) < m && m < Math.max(a, e)) c++; });
      b.pts.forEach((p, i) => { if (b.mark[i] !== "‖" && Number.isFinite(toNum(p.x)) && v(b.val[i][0]) === m) c++; });
      if (c === 3) { assert.ok(Math.abs(m) < 100); n++; }
    }
    return F(n); } },
  { has: "Hình vẽ là đồ thị của hàm số bậc ba y = f(x). Mỗi ý sau đúng hay sai?", right: (q) => {
    const g = doc(q, docDoThi, "đồ thị"), f = hs("−x³ + 3x² + 1"); assert.ok(khopDoThi(g, f), "đồ thị không khớp hàm số");
    bacBa(g).forEach((c, i) => assert.ok(Math.abs(c - toNum(f.P[i] || F(0))) < 0.01, "đường cong không xác định đúng hàm bậc ba"));
    return tfTheo(q, (s) => menhDeHam(s, f)); } },
  { has: "Tính a + b + c.", right: (q) => {
    const g = doc(q, docDoThi, "đồ thị"); assert.ok(g.tcd.length === 1 && g.tcn.length === 1 && g.dots.length === 1 && Math.abs(g.dots[0][0]) < 1e-6, "hình cần hai tiệm cận và giao điểm với trục tung");
    const r = (v) => F(Math.round(v)), c = neg(r(g.tcd[0])), a = r(g.tcn[0]), b = mul(r(g.dots[0][1]), c);
    [g.tcd[0], g.tcn[0], g.dots[0][1]].forEach((v) => assert.ok(Math.abs(v - Math.round(v)) < 1e-6, "tiệm cận, điểm đánh dấu ở nút lưới"));
    const f = hs("(ax + b)/(x + c)", "x", { a, b, c }); assert.ok(khopDoThi(g, f), "đồ thị không khớp hàm số đọc được"); khopTiemCan(g, f, "đồ thị");
    return add(a, add(b, c)); } },
  // Bài 5. Ứng dụng đạo hàm để giải quyết vấn đề thực tiễn
  { has: "Nhiệt độ T (°C) của một cốc trà nóng", right: (q) => { const m = /T\(t\) = (.+) với t ≥ 0/.exec(q.q), t0 = fr(/tại thời điểm t = (\d+)/.exec(q.q)[1]); return rfEval(rfDer(hs(m[1], "t")), t0); } },
  { has: "Số vi khuẩn trong một mẻ nuôi cấy", right: (q) => {
    const m = /N\(t\) = (.+) \(0/.exec(q.q), t0 = fr(/thời điểm t = (\d+) giờ/.exec(q.q)[1]), v = rfEval(rfDer(hs(m[1], "t")), t0);
    return theo(q, /^(.+) con\/giờ$/, (k) => eq(fr(k[1]), v)); } },
  { has: "Nồng độ một loại thuốc trong máu", right: (q) => {
    // C′ đổi dấu đúng một lần trên (0; 20], từ dương sang âm: C lớn nhất tại điểm đó (nghiệm vô tỉ, tìm bằng chia đôi)
    const d = rfDer(hs(/C\(t\) = (.+) \(mg\/l\)/.exec(q.q)[1], "t")), g = (t) => rfEvalF(d, t);
    const doi = []; for (let k = 1; k < 2000; k++) if (Math.sign(g(k / 100)) !== Math.sign(g((k + 1) / 100))) doi.push(k / 100);
    assert.ok(doi.length === 1 && g(doi[0]) > 0, "C′ phải đổi dấu một lần, từ dương sang âm");
    let lo_ = doi[0], hi = doi[0] + 0.01; for (let k = 0; k < 60; k++) { const m = (lo_ + hi) / 2; if (g(m) > 0) lo_ = m; else hi = m; }
    assert.ok(/thì nồng độ thuốc trong máu lớn nhất/.test(q.q)); return (lo_ + hi) / 2; } },
  { has: "Mặt cắt ngang của một đường hầm có dạng parabol", essay: (q) => {
    const P = hamTrongDe(q, /phương trình y = (.+?)\. Người ta/), S = rfMul(hs("2x"), P);
    // nửa bề rộng của parabol trên mặt đường: P(x) > 0 với 0 < x < a; diện tích lớn nhất tại điểm tới hạn duy nhất trong khoảng đó
    const a = Math.sqrt(-toNum(P.P[0]) / toNum(P.P[2])), xs = diemTH(S).filter((x) => toNum(x) > 0 && toNum(x) < a); assert.equal(xs.length, 1);
    assert.ok(bienThien(S).every((k) => toNum(k.b) <= 0 || toNum(k.a) >= a || (toNum(k.b) <= toNum(xs[0]) ? k.s > 0 : k.s < 0)), "diện tích tăng rồi giảm");
    assert.ok(rfEq(rfDer(S), hs("18 − 9x²/2")) && rfEq(S, hs("18x − 3x³/2")), "đạo hàm, diện tích trong thang chấm");
    const w = mul(F(2), xs[0]), h = rfEval(P, xs[0]), A = mul(w, h), td = "rộng " + fmtSo(w) + " m, cao " + fmtSo(h) + " m";
    essayCheck(q, ["S(x) = 2x(9 − 3x²/4)", "S′(x) = 18 − 9x²/2", "x = " + fmtSo(xs[0]), td, fmtSo(A) + " m²"], [td, "diện tích lớn nhất " + fmtSo(A) + " m²"]); } },
  { has: "Bác An muốn rào một khu vườn", right: (q) => { const S = fr(/rộng (\d+) m²/.exec(q.q)[1]), L = hs("2x + S/x", "x", { S }); const x0 = diemTH(L).filter((x) => cmp(x, F(0)) > 0); assert.equal(x0.length, 1); assert.ok(bienThien(L).every((k) => toNum(k.a) < 0 || toNum(k.b) > toNum(x0[0]) || k.s < 0)); return rfEval(L, x0[0]); } },
  { has: "Một tiệm bánh bán bánh mì", right: (q) => {
    const [p0, n0, dn, c] = [/giá (\d+) nghìn/, /bán được (\d+) chiếc/, /bán ít đi (\d+) chiếc/, /mỗi chiếc bánh là (\d+) nghìn/].map((re) => fr(re.exec(q.q)[1]));
    const L = hs("(x − c)(n − d(x − p))", "x", { c, n: n0, d: dn, p: p0 }), x0 = diemTH(L); assert.equal(x0.length, 1); assert.ok(cmp(x0[0], p0) > 0 && motCucTri(L, "CĐ"));
    return x0[0]; } },
  // Bài 6. Vectơ trong không gian
  { has: "Vectơ nào dưới đây bằng vectơ AB?", right: (q) => { doc(q, kiemHop, ["A", "B", "C", "D", "A′", "B′", "C′", "D′"], "D", "hình hộp"); const P = HOP(); return theo(q, /^vectơ (.+)$/, (k) => vEq(vecTen(P, k[1]), vecTen(P, "AB"))); } },
  { has: "Tổng vectơ C′B′ + vectơ C′D′ + vectơ C′C bằng vectơ nào", right: (q) => {
    doc(q, kiemHop, ["A", "B", "C", "D", "A′", "B′", "C′", "D′"], "D", "hình hộp"); const P = HOP(), t = /Tổng (.+) bằng vectơ/.exec(q.q)[1].split(" + ").map((s) => vecTen(P, s.replace("vectơ ", ""))).reduce(vAdd);
    return theo(q, /^vectơ (.+)$/, (k) => vEq(vecTen(P, k[1]), t)); } },
  { has: "Tổng vectơ AB + vectơ BC + vectơ CD bằng vectơ nào", right: (q) => {
    const D = doc(q, diem, "tứ diện"); assert.deepEqual(Object.keys(D).sort(), ["A", "B", "C", "D"]);
    const ca = canhHinh(q.svg, D, "tứ diện"); assert.equal(ca.thay.length + ca.khuat.length, 6, "tứ diện cần đủ 6 cạnh"); assert.equal(ca.khuat.length, 1, "một cạnh khuất");
    const P = { A: [F(1), F(2), F(3)], B: [F(0), F(0), F(0)], C: [F(4), F(0), F(1)], D: [F(2), F(5), F(0)] }, t = /Tổng (.+) bằng vectơ/.exec(q.q)[1].split(" + ").map((s) => vecTen(P, s.replace("vectơ ", ""))).reduce(vAdd);
    return theo(q, /^vectơ (.+)$/, (k) => vEq(vecTen(P, k[1]), t)); } },
  { has: "Cho hình lập phương ABCD.A′B′C′D′ có cạnh bằng 2 (hình vẽ). Mỗi ý sau đúng hay sai?", right: (q) => {
    doc(q, kiemHop, ["A", "B", "C", "D", "A′", "B′", "C′", "D′"], "D", "hình lập phương"); const P = HOP(fr(/cạnh bằng (\d+)/.exec(q.q)[1])); return tfTheo(q, (s) => menhDeVec(s, P)); } },
  { has: "Cho tứ diện đều ABCD có cạnh bằng 4.", right: (q) => {
    const a = toNum(fr(/cạnh bằng (\d+)/.exec(q.q)[1])), P = { A: [0, 0, 0], B: [a, 0, 0], C: [a / 2, (a * Math.sqrt(3)) / 2, 0], D: [a / 2, (a * Math.sqrt(3)) / 6, a * Math.sqrt(2 / 3)] };
    Object.keys(P).forEach((u) => Object.keys(P).forEach((v) => u < v && assert.ok(Math.abs(Math.hypot(...P[u].map((x, i) => x - P[v][i])) - a) < 1e-9)));
    const [u, v] = /tích vô hướng vectơ (\S+) · vectơ (\S+)\./.exec(q.q).slice(1).map((s) => { const [p, r] = ten2(s); return P[r].map((x, i) => x - P[p][i]); });
    const d = u.reduce((s, x, i) => s + x * v[i], 0); assert.ok(Math.abs(d - Math.round(d)) < 1e-9); return F(Math.round(d)); } },
  { has: "Độ dài của vectơ AB + vectơ AD + vectơ AA′ bằng", right: (q) => {
    const [ab, ad, aa] = /AB = (\d+), AD = (\d+) và AA′ = (\d+)/.exec(q.q).slice(1).map(fr), P = { A: [F(0), F(0), F(0)], B: [ab, F(0), F(0)], D: [F(0), ad, F(0)], "A′": [F(0), F(0), aa] };
    const t = vAdd(vAdd(vecTen(P, "AB"), vecTen(P, "AD")), vecTen(P, "AA′")); return theo(q, /^(.+)$/, (k) => eq(ev(k[1]), vLen(t))); } },
  { has: "Ba lực có độ lớn lần lượt", right: (q) => { const f = /lần lượt (\d+) N, (\d+) N và (\d+) N/.exec(q.q).slice(1).map(fr); return vLen(f); } },
  { has: "Cho tứ diện OABC có OA, OB, OC đôi một vuông góc", right: (q) => {
    const a = fr(/= (\d+)\. Gọi M/.exec(q.q)[1]), P = { O: [F(0), F(0), F(0)], A: [a, F(0), F(0)], B: [F(0), a, F(0)], C: [F(0), F(0), a] }; P.M = vScale(vAdd(P.B, P.C), F(1, 2));
    return vDot(vecTen(P, "OA"), vecTen(P, "AM")); } },
  { has: "Tính tích vô hướng vectơ AB′ · vectơ BC′.", right: (q) => { const P = HOP(fr(/cạnh bằng (\d+)/.exec(q.q)[1])); return vDot(vecTen(P, "AB′"), vecTen(P, "BC′")); } },
  // Bài 7. Hệ trục toạ độ trong không gian
  { has: "Vectơ u thoả mãn u = 2i − 3k có toạ độ là", right: (q) => {
    const s = /u = (.+) có toạ độ/.exec(q.q)[1].replace(/\s/g, ""), c = { i: F(0), j: F(0), k: F(0) };
    [...s.matchAll(/([+\-−]?)(\d*)([ijk])/g)].forEach((m) => { c[m[3]] = mul(m[2] ? fr(m[2]) : F(1), m[1] === "−" || m[1] === "-" ? F(-1) : F(1)); });
    return theo(q, /^(\(.+\))$/, (k) => vEq(toaDo(k[1]), [c.i, c.j, c.k])); } },
  { has: "Toạ độ của điểm B′ là", right: (q) => {
    const D = doc(q, kiemHop, ["O", "A", "B", "C", "O′", "A′", "B′", "C′"], "O", "hình hộp chữ nhật"); kiemTruc(q.svg, D, "O", "A", "C", "O′", "hình hộp chữ nhật");
    const [a, c, h] = /OA = (\d+), OC = (\d+), OO′ = (\d+)/.exec(q.q).slice(1).map(fr); return theo(q, /^(\(.+\))$/, (k) => vEq(toaDo(k[1]), [a, c, h])); } },
  { has: "điểm nào dưới đây thuộc mặt phẳng (Oyz)?", right: (q) => theo(q, /^(\(.+\))$/, (k) => toaDo(k[1])[0].n === 0) },
  { has: "hình chiếu vuông góc của điểm M(−4; 1; 7) trên mặt phẳng (Oxz)", right: (q) => { const M = toaDo(/M(\(.+?\))/.exec(q.q)[1]); return theo(q, /^(\(.+\))$/, (k) => vEq(toaDo(k[1]), [M[0], F(0), M[2]])); } },
  { has: "đỉnh A trùng với gốc toạ độ O", right: (q) => {
    const D = doc(q, kiemHop, ["A", "B", "C", "D", "A′", "B′", "C′", "D′"], "A", "hình lập phương"); kiemTruc(q.svg, D, "A", "B", "D", "A′", "hình lập phương");
    const P = HOP(fr(/cạnh bằng (\d+)/.exec(q.q)[1])); return tfTheo(q, (s) => menhDeVec(s, P)); } },
  { has: "Toạ độ của vectơ A₁A₂ là", right: (q) => {
    const A = toaDo(/A(\(.+?\))/.exec(q.q)[1]), A1 = [A[0], F(0), F(0)], A2 = [F(0), A[1], A[2]]; assert.ok(/trên trục Ox và trên mặt phẳng \(Oyz\)/.test(q.q));
    return theo(q, /^(\(.+\))$/, (k) => vEq(toaDo(k[1]), vSub(A2, A1))); } },
  // Bài 8. Biểu thức toạ độ của các phép toán vectơ
  { has: "Toạ độ của vectơ 2a − b là", right: (q) => { const a = toaDo(/vectơ a = (\(.+?\))/.exec(q.q)[1]), b = toaDo(/vectơ b = (\(.+?\))/.exec(q.q)[1]); return theo(q, /^(\(.+\))$/, (k) => vEq(toaDo(k[1]), vSub(vScale(a, F(2)), b))); } },
  { has: "Toạ độ trung điểm I của đoạn thẳng AB là", right: (q) => { const A = toaDo(/A(\(.+?\))/.exec(q.q)[1]), B = toaDo(/B(\(.+?\))/.exec(q.q)[1]); return theo(q, /^(\(.+\))$/, (k) => vEq(toaDo(k[1]), vScale(vAdd(A, B), F(1, 2)))); } },
  { has: "Điểm nào dưới đây là trọng tâm của tam giác ABC?", right: (q) => { const [A, B, C] = ["A", "B", "C"].map((n) => toaDo(new RegExp(n + "(\\(.+?\\))").exec(q.q)[1])); return theo(q, /^(\(.+\))$/, (k) => vEq(toaDo(k[1]), vScale(vAdd(vAdd(A, B), C), F(1, 3)))); } },
  { has: "Tính số đo của góc BAC", right: (q) => { const [A, B, C] = ["A", "B", "C"].map((n) => toaDo(new RegExp(n + "(\\(.+?\\))").exec(q.q)[1])); const g = gocDo(vSub(B, A), vSub(C, A)); assert.ok(Math.abs(g - Math.round(g)) < 1e-9); return F(Math.round(g)); } },
  { has: "Điểm M thuộc trục Oz sao cho MA = MB", right: (q) => {
    const A = toaDo(/A(\(.+?\))/.exec(q.q)[1]), B = toaDo(/B(\(.+?\))/.exec(q.q)[1]);
    // MA² − MB² là hàm bậc nhất theo c: (A − B)·(A + B) − 2c(zA − zB) = 0 (khi M = (0; 0; c))
    const c = div(sub(vDot(A, A), vDot(B, B)), mul(F(2), sub(A[2], B[2]))), M = [F(0), F(0), c];
    assert.ok(eq(vDot(vSub(A, M), vSub(A, M)), vDot(vSub(B, M), vSub(B, M)))); return c; } },
  { has: "ABDC là hình chữ nhật", essay: (q) => {
    const [A, B, C] = ["A", "B", "C"].map((n) => toaDo(new RegExp(n + "(\\(.+?\\))").exec(q.q)[1])), ab = vSub(B, A), ac = vSub(C, A), D = vSub(vAdd(B, C), A);
    assert.ok(eq(vDot(ab, ac), F(0)), "tam giác vuông tại A"); const S = mul(vLen(ab), vLen(ac));
    assert.ok(Math.abs(toNum(S) - 9 * Math.SQRT2) < 1e-9, "diện tích 9√2");
    const td = (v) => "(" + v.map(fmtSo).join("; ") + ")";
    essayCheck(q, ["vectơ AB = " + td(ab), "vectơ AC = " + td(ac), "D" + td(D), "9√2"], ["D" + td(D), "diện tích 9√2"]); } },
  // Bài 9. Khoảng biến thiên và khoảng tứ phân vị
  { has: "Quãng đường đạp xe trong một tuần", right: (q) => { const M = mauBang(doc(q, docBang, "bảng"), 1); return theo(q, /^(\d+) km$/, (k) => eq(fr(k[1]), khoangBT(M))); } },
  { has: "Nhóm chứa tứ phân vị thứ nhất của mẫu số liệu ghép nhóm này là", right: (q) => {
    const M = mauBang(doc(q, docBang, "bảng"), 1); assert.equal(coMau(M), +/của (\d+) quả/.exec(q.q)[1], "cỡ mẫu ghi trong đề"); const g = M[tuPhanVi(M, 1).p];
    return theo(q, /^(\[.+\))$/, (k) => { const [a, b] = nhomAB(k[1]); return eq(a, g.a) && eq(b, g.b); }); } },
  { has: "Khoảng tứ phân vị của mẫu số liệu đó bằng", right: (q) => { const [a, b] = /Q₁ = (.+) và tứ phân vị thứ ba Q₃ = (.+)\. Khoảng/.exec(q.q).slice(1).map(fr); return theo(q, /^(.+)$/, (k) => eq(fr(k[1]), sub(b, a))); } },
  { has: "Thời gian tự học mỗi ngày của 40 học sinh", right: (q) => { const M = mauBang(doc(q, docBang, "bảng"), 1); assert.equal(coMau(M), 40); return tfTheo(q, (s) => menhDeMau(s, M)); } },
  { has: "Thời gian giao hàng (phút) của 40 đơn hàng", right: (q) => { const M = mauBang(doc(q, docBang, "bảng"), 1); assert.equal(coMau(M), 40); return sub(tuPhanVi(M, 3).Q, tuPhanVi(M, 1).Q); } },
  { has: "Tốc độ (km/h) của 40 xe máy", right: (q) => { const M = mauBang(doc(q, docBang, "bảng"), 1); assert.equal(coMau(M), 40); return tfTheo(q, (s) => menhDeMau(s, M)); } },
  // Bài 10. Phương sai và độ lệch chuẩn
  { has: "Phương sai của mẫu số liệu này có đơn vị là", right: (q) => { const u = /\(đơn vị: (\w+)\)/.exec(q.q)[1]; return theo(q, /^(.+)$/, (k) => k[1] === u + "²"); } },
  { has: "Một mẫu số liệu ghép nhóm có phương sai bằng 12,25", right: (q) => { const v = fr(/phương sai bằng (.+?)\./.exec(q.q)[1]); return theo(q, /^(.+)$/, (k) => eq(pw(fr(k[1]), 2), v)); } },
  { has: "độ lệch chuẩn về thời gian của đội A", right: (q) => {
    const [a, b] = /đội A là (.+?) phút, của đội B là (.+?) phút/.exec(q.q).slice(1).map(fr), hon = cmp(b, a) > 0 ? "B" : "A", kem = hon === "B" ? "A" : "B";
    return theo(q, /^(.+)$/, (k) => k[1] === `Thời gian của đội ${hon} phân tán hơn đội ${kem}`); } },
  { has: "Chiều cao (cm) của 20 cây giống", right: (q) => { const M = mauBang(doc(q, docBang, "bảng"), 1); assert.equal(coMau(M), 20); return phuongSai(M); } },
  { has: "Số giờ nắng mỗi ngày trong 20 ngày", right: (q) => { const M = mauBang(doc(q, docBang, "bảng"), 1); assert.equal(coMau(M), 20); return tfTheo(q, (s) => menhDeMau(s, M)); } },
  { has: "Thời gian chạy bộ mỗi buổi sáng của 20 người", right: (q) => { const M = mauBang(doc(q, docBang, "bảng"), 1); assert.equal(coMau(M), 20); return sqrt(phuongSai(M)); } },
  { has: "máy nào đóng gói ổn định hơn?", right: (q) => {
    const b = doc(q, docBang, "bảng"); assert.deepEqual(b[0].slice(1), ["Máy A", "Máy B"]); const A = mauBang(b, 1), B = mauBang(b, 2); assert.ok(coMau(A) === 20 && coMau(B) === 20);
    const n = cmp(phuongSai(A), phuongSai(B)) < 0 ? "A" : "B"; assert.ok(!eq(phuongSai(A), phuongSai(B)));
    return theo(q, /^Máy (A|B), vì độ lệch chuẩn của máy \1 (nhỏ|lớn) hơn$/, (k) => k[1] === n && k[2] === "nhỏ"); } },
  { has: "tần số của nhóm [9; 13) bị mờ", right: (q) => {
    const M = mauBang(doc(q, docBang, "bảng"), 1), x = fr(/số trung bình của mẫu số liệu ghép nhóm bằng (.+?) phút/.exec(q.q)[1]), k = M.findIndex((g) => g.m === null);
    // tìm tần số m: Σ m_i (x_i − x̄) = 0
    const s = M.reduce((t, g) => (g.m === null ? t : add(t, mul(F(g.m), sub(daiDien(g), x)))), F(0)), m = div(neg(s), sub(daiDien(M[k]), x));
    assert.ok(isInt(m) && m.n > 0, "tần số phải là số nguyên dương"); M[k].m = m.n; assert.ok(eq(trungBinh(M), x)); return phuongSai(M); } },
  { has: "bơi hết 50 m của hai nhóm học sinh A và B", right: (q) => {
    const b = doc(q, docBang, "bảng"); assert.deepEqual(b[0].slice(1), ["Nhóm A", "Nhóm B"]); const A = mauBang(b, 1), B = mauBang(b, 2); assert.ok(coMau(A) === 20 && coMau(B) === 20);
    return tfTheo(q, (s) => menhDeMau(s, A, B)); } },
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
      } else {
        assert.ok(Math.abs(a - toNum(want)) <= 1e-9 * Math.max(1, Math.abs(a)), "đáp án " + q.ans + ", tính được " + toNum(want));
        assert.ok(q.tol === undefined, "đáp án tính chính xác, không cần sai số");
      }
      if (typeof q.ans === "string") { const f = fr(q.ans); assert.ok(q.ans === f.n + "/" + f.d && f.d > 1, "đáp án phân số phải tối giản: " + q.ans); }
      assert.ok(typeof q.ans === "string" || Number.isInteger(q.ans * 100 + 1e-9 * Math.sign(q.ans)) || Math.abs(q.ans * 100 - Math.round(q.ans * 100)) < 1e-9, "đáp án quá hai chữ số thập phân");
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
// số đề, số câu lấy từ danh mục: đề cố định là các đề trong from của đề ngẫu nhiên, mọi đề cố định cuối kì I của file đều ở đó
const pool = bank(POOL), DE = pool.pool.from, mine = pool.questions.filter((q) => q.src === POOL);
assert.deepEqual(BANKS.filter((b) => b.file === "12-toan.js" && /^toan12-ck1-de\d+$/.test(b.id)).map((b) => b.id), DE, "đề cố định cuối kì I nào cũng phải ở from của " + POOL);
for (const id of DE) { const b = bank(id); assert.ok(b, "thiếu " + id); assert.equal(b.questions.length, b.n); run(id, b.questions); }
run(POOL, mine);
assert.equal(dung.size, CHECKS.length, "có mục kiểm tra không khớp câu nào: " + CHECKS.filter((c) => !dung.has(c.has)).map((c) => c.has).join(" | "));
// hình nào cũng được đọc lại; chữ trong hình vừa khung, không đè nhau
const hinh = pool.questions.filter((q) => q.svg);
assert.equal(hinh.filter((q) => hinhDaDoc.has(q.svg)).length, hinh.length, "hình nào cũng được đọc lại");
hinh.forEach((q) => chuHinh(q.svg, q.q.slice(0, 40)));

// tự thử vài bộ đọc với giá trị biết trước
{
  const f = hs("(x² + 3)/(x − 1)");
  assert.deepEqual(diemTH(f).map(toNum), [-1, 3]); assert.deepEqual(cucTri(f).map((c) => [c.loai, toNum(c.y)]), [["CĐ", -2], ["CT", 6]]);
  assert.deepEqual(tiemCan(hs("(2x² − 3x + 5)/(x + 1)")).xien && [toNum(tiemCan(hs("(2x² − 3x + 5)/(x + 1)")).xien.m), toNum(tiemCan(hs("(2x² − 3x + 5)/(x + 1)")).xien.c)], [2, -5]);
  assert.ok(rfEq(rfDer(hs("x(48 − 2x)²")), hs("(48 − 2x)(48 − 6x)")) && rfEq(hs("x − 1 + 1/(x − 1)"), hs("(x² − 2x + 2)/(x − 1)")));
  assert.equal(gioiHanVC(hs("−x³ + 3x² + 1"), -1), Infinity); assert.equal(gioiHanLo(hs("(2x + 7)/(x + 3)"), F(-3), -1), -Infinity);
  assert.throws(() => nghiem(hs("x² − 2").P), /vô tỉ/);
  const M = [{ a: F(0), b: F(5), m: 3 }, { a: F(5), b: F(10), m: 12 }, { a: F(10), b: F(15), m: 15 }, { a: F(15), b: F(20), m: 8 }];
  assert.ok(Math.abs(toNum(tuPhanVi(M, 1).Q) - 7.708) < 0.001 && eq(tuPhanVi(M, 3).Q, F(29, 2))); // ví dụ của sách (Bài 9): Q₁ ≈ 7,71; Q₃ = 14,5
  // bộ đọc hình bắt được hình vẽ sai
  const q1 = pool.questions.find((q) => /Giá trị cực tiểu của hàm số đã cho bằng/.test(q.q));
  assert.throws(() => khopBBT(docBBT(q1.svg.replace(">6<", ">5<"), "thử"), hs("(x² + 3)/(x − 1)"), "thử"), /giá trị tại x = 3/);
  const q2 = pool.questions.find((q) => /Đường tiệm cận ngang của đồ thị hàm số là/.test(q.q));
  assert.equal(khopDoThi(docDoThi(q2.svg, "thử"), hs("(x + 2)/(x − 1)")), false);
  const q3 = pool.questions.find((q) => /Vectơ nào dưới đây bằng vectơ AB/.test(q.q)), D = diem(q3.svg, "thử");
  assert.throws(() => kiemHop(q3.svg.replace(`cx="${D["C′"][0]}"`, `cx="${D["C′"][0] + 3}"`).replace(/(<text x=")([\d.]+)("[^>]*>C′<)/, (m, a, x, b) => a + (+x + 3) + b), ["A", "B", "C", "D", "A′", "B′", "C′", "D′"], "D", "thử"), /không bằng nhau/);
}

/* ---------- mức độ và ma trận ---------- */
assert.ok(pool.questions.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M), CHU_DE = Object.keys(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => cells.reduce((s, v) => s + v[k], 0)), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(CHU_DE.length, 10, "10 chủ đề, mỗi bài một chủ đề");
const nhomCD = (ts) => ts.reduce((s, t) => s + M[t].reduce((a, b) => a + b, 0), 0);
assert.deepEqual([nhomCD(CHU_DE.slice(0, 5)), nhomCD(CHU_DE.slice(5, 8)), nhomCD(CHU_DE.slice(8))], [13, 7, 5], "Chương I 13 câu, Chương II 7 câu, Chương III 5 câu");
CHU_DE.forEach((t) => assert.ok(("chu-de:12:toan:" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
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
pool.questions.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của phương án: " + q.q.slice(0, 50)));
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

/* ---------- dò lộ đáp án (Rút ra N5, N24, N8; như tests/toan9-ck1.js) giữa hai câu rút được cùng lúc. Đề ngẫu nhiên rút một câu mỗi
   ô (ô Biết của Bài 1 rút 2), đề "Ôn chủ đề" rút chung mọi câu của một chủ đề (trừ tự luận), nên xét mọi cặp câu của kho, trừ cặp
   có câu tự luận nằm cùng một ô rút 1 câu. Đáp án là số nguyên (từ 10), số thập phân, phân số, số âm chỉ tìm ở vị trí kết quả của câu kia (ngay
   sau “=”, “≈”, “là”, “bằng”, “được”); đáp án bằng chữ có ở câu kia thì chỉ in ra khi chạy với DO_LO=1 để người làm xem, danh sách
   đã xem ghi ở DA_XEM. ---------- */
const val = (s) => +String(s).replace(/\s/g, "");
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null ? [] : [].concat(q.ans), (q.rubric || []).map((c) => c.c)).map(String);
const KQ = "(?:=|≈|(?:^|[\\s(])(?:là|bằng|được))\\s+";
const SAU = "(?!\\d|,\\d|\\/|°|%|√|π|\\(|\\p{L}|[⁰¹²³⁴⁵⁶⁷⁸⁹]|\\s*[·+−:](?:\\s|\\d|\\())"; // số đứng trước chữ, ngoặc là hệ số, thừa số
const soKQ = (s) => [...String(s).matchAll(new RegExp(KQ + "(\\d{1,3}(?: \\d{3})*)" + SAU, "gu"))].map((m) => val(m[1]));
const kqLa = (s, a) => new RegExp(KQ + a.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + SAU, "u").test(s);
const cungLuc = (p, q) => p.topic !== q.topic || (p.type !== "essay" && q.type !== "essay") || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2;
const ten = new Map();
DE.forEach((id) => bank(id).questions.forEach((q, i) => ten.set(q.q, id.replace("toan12-ck1-", "") + "#" + (i + 1))));
mine.forEach((q, i) => ten.set(q.q, "own#" + (i + 1)));
const doLo = (qs, name) => {
  const lo_ = [], chuLo = [];
  qs.forEach((q) => {
    const so = [], kq = [], cum = [];
    const them = (a) => { a = String(a).replace(/-/g, "−");
      if (/^\d{1,3}(?: \d{3})*(?: [^\d\s]+)?$/.test(a) && !/°$/.test(a)) so.push(val(a.split(/ (?=[^\d\s])/)[0]));
      else if (/^−?\d[\d ,/]*(?: [^\d\s]+)?$/.test(a) || /^−?\d*√\d+$/.test(a)) kq.push(a.replace(/ [^\d\s]+$/, ""));
      else if (a.length >= 3) cum.push(a); };
    if (q.type === "essay") (/Đáp số: (.+)$/m.exec(q.x)[1].match(/\d{1,3}(?: \d{3})*/g) || []).forEach((x) => so.push(val(x)));
    else if (q.type === "num") them(typeof q.ans === "number" ? fmtDec(F(Math.round(q.ans * 1000), 1000)) : q.ans); else if (q.type === "mc") them(q.o[0]);
    qs.forEach((p) => {
      if (p === q || !cungLuc(p, q)) return;
      const C = chu(p), T = C.map((s) => s.toLowerCase()), at = `${name(p)} lộ đáp án ${name(q)}: `;
      so.filter((x) => x >= 10 && C.flatMap(soKQ).includes(x)).forEach((x) => lo_.push(at + x));
      kq.filter((a) => C.some((s) => kqLa(s, a))).forEach((a) => lo_.push(at + a));
      cum.filter((s) => { const re = new RegExp("(?<![\\p{L}\\p{N}])" + s.toLowerCase().replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + "(?![\\p{L}\\p{N}])", "u"); return T.some((t) => re.test(t)); }).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo: lo_, chuLo };
};
const { lo: loDA, chuLo } = doLo(pool.questions, (q) => ten.get(q.q));
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuLo.join("\n"));
// đã xem (Phiên N12-ck1-toan): "x = 0", "x = −3" là nghiệm của đạo hàm, điểm tới hạn của hàm số khác hoặc lựa chọn sai; "y = 1" là hàm hằng
// khi m = 4; "vectơ AD" là một số hạng của tổng ở câu hình hộp, không gợi ý tổng của câu tứ diện
const DA_XEM = ["own#6 lộ đáp án own#2: x = 0", "own#10 lộ đáp án own#2: x = 0", "de1#5 lộ đáp án own#2: x = 0", "de1#10 lộ đáp án own#2: x = 0", "de2#7 lộ đáp án own#2: x = 0",
  "de2#4 lộ đáp án own#8: y = 1", "own#15 lộ đáp án own#14: vectơ AD", "de1#14 lộ đáp án own#14: vectơ AD", "own#8 lộ đáp án de1#8: x = −3", "de1#6 lộ đáp án de1#8: x = −3", "de2#6 lộ đáp án de1#8: x = −3"];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loDA, [], "lộ đáp án:\n" + loDA.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai
{ const tim = (has) => pool.questions.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const khac = tim("điểm nào dưới đây thuộc mặt phẳng (Oyz)"), thuLo = (qs) => { const r = doLo(qs, (q) => q.q.slice(0, 10)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  assert.deepEqual(thuLo([tim("Tìm giá trị cực đại của hàm số y = "), gia(khac, "Ví dụ y(1) = 35.")]), [35]);
  assert.deepEqual(thuLo([tim("Nhiệt độ T (°C) của một cốc trà nóng"), gia(khac, "Tốc độ bằng −2,4 mỗi phút.")]), ["−2,4"]);
  assert.deepEqual(thuLo([tim("Tìm giá trị cực đại của hàm số y = "), gia(khac, "Có 35 điểm, x = 35x + 1.")]), []);
  assert.deepEqual(thuLo([tim("Tiệm cận xiên của đồ thị hàm số y = (x² − 3x + 4)/(x − 1)"), gia(khac, "Đường y = x − 2.")]), ["y = x − 2"]); }

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (bỏ dấu, gộp nguyên âm), nếu có ----------
   Chuỗi 8 từ liền nhau của mọi trường chữ (đề bài, lựa chọn, lời giải, thang chấm) không có trong sách; cụm từ chung của môn (tên bài,
   thuật ngữ, lời dặn) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ. */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const TU_CHUNG = [...CHU_DE, "ứng dụng đạo hàm để giải quyết một số vấn đề liên quan đến thực tiễn", "khảo sát sự biến thiên và vẽ đồ thị hàm số", "mẫu số liệu ghép nhóm",
  "tứ phân vị thứ nhất", "tứ phân vị thứ ba", "tốc độ thay đổi tức thời", "mỗi ý sau đúng hay sai", "tiệm cận đứng", "tiệm cận ngang", "tiệm cận xiên", "làm tròn đến hàng phần trăm",
  "làm tròn kết quả đến hàng phần trăm", "làm tròn kết quả đến hàng phần mười",
  // thuật ngữ, cách gọi chung của sách (tên hình, tên số đặc trưng, cách mở đầu của đề trong không gian toạ độ)
  "giá trị lớn nhất", "giá trị nhỏ nhất", "giá trị cực đại", "giá trị cực tiểu", "đạt cực đại tại", "đạt cực tiểu tại", "đồ thị của hàm số", "đồ thị hàm số",
  "liên tục trên đoạn", "trong không gian oxyz", "hình lập phương abcd a b c d", "hình hộp abcd a b c d", "hình hộp chữ nhật abcd a b c d", "hình hộp chữ nhật",
  "khoảng tứ phân vị", "khoảng biến thiên", "độ lệch chuẩn", "phương sai", "hình chiếu vuông góc", "trục tung", "trục hoành", "trung điểm của cạnh",
  "lần lượt thuộc các tia ox oy oz", "hai đường tiệm cận"]
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const kho = pool.questions;
if (SACH.length) {
  assert.ok(SACH.some((f) => /toan-12-tap-1/.test(f)), "OnUp-Book có Toán 12 tập một");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => chu(q).flatMap((s) => chuoi(s, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q.q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  const tr8 = [...new Set(bao(8))];
  if (process.env.DO_SACH) console.log("Chuỗi 8 từ trùng sách:\n" + tr8.join("\n"));
  assert.deepEqual(tr8, [], "chuỗi 8 từ trùng chữ của sách");
  // đa thức trong đề (sau “y =”, “f(x) =”) không là hàm của ví dụ, bài tập trong sách Toán 12: so chuỗi 8 từ không bắt được biểu thức.
  // Dò trong chữ OCR đã bỏ khoảng trắng; chữ OCR hay đọc sai số mũ (x³ thành x°) nên số mũ khớp một kí tự bất kì hoặc không có. Phân
  // thức viết hai dòng trong sách, chữ OCR không đọc lại được: xem ảnh trang bài tập.
  const toan = SACH.filter((f) => /toan-12/.test(f)).map((f) => fs.readFileSync(f, "utf8").replace(/\s+/g, "").replace(/[—–−]/g, "-")).join("|");
  const mauHam = (e) => new RegExp([...e.replace(/\s+/g, "").replace(/[−–]/g, "-")].map((c) => ("⁰¹²³⁴⁵⁶⁷⁸⁹".includes(c) ? ".?" : c.replace(/[.*+?^${}()|[\]\\/-]/g, "\\$&"))).join(""));
  assert.ok(mauHam("x³ − 3x² + 2").test(toan), "bộ dò hàm số của sách phải thấy y = x³ − 3x² + 2 (Luyện tập 1, Bài 4)");
  const hamSach = new Set();
  kho.forEach((q) => chu(q).forEach((s) => { for (const m of s.matchAll(/(?:y|f\(x\)) = ([^.,;:|]+?)(?=[.,;:|]| trên| có| với| và| là| khi| bằng| đạt|$)/g)) {
    const e = m[1].trim(); if (/\d/.test(e) && /[−+]/.test(e) && !/\//.test(e) && e.replace(/\s+/g, "").length >= 6 && mauHam(e).test(toan)) hamSach.add(ten.get(q.q) + ": y = " + e); } }));
  assert.deepEqual([...hamSach], [], "đa thức trùng hàm của ví dụ, bài tập trong sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác ---------- */
{
  const khac = BANKS.filter((b) => !b.pool && b.file !== "12-toan.js").flatMap((b) => b.questions.map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " })))
    .concat(BANKS.filter((b) => b.pool && b.file !== "12-toan.js").flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " }))));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q.q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  const tr8 = [...new Set(bao(8))];
  if (process.env.DO_KHO) console.log("Chuỗi 8 từ trùng kho khác:\n" + tr8.join("\n"));
  assert.deepEqual(tr8, [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại hoặc đọc lại hình (" + DE.map((id) => bank(id).questions.length).join(" + ") + " câu của " + DE.length + " đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + pool.questions.length + " câu, " + hinh.length + " hình, ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề; trung bình " + (essays / 400).toFixed(2) + " câu tự luận mỗi lần rút.");
console.log("MATH OK");
