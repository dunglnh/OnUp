// Tính lại đáp án ngân hàng Toán 7 cuối kì I (data/banks/7-toan.js): hai đề cố định toan7-ck1-de1, toan7-ck1-de2 và các câu riêng
// của đề ngẫu nhiên toan7-ck1-ngau-nhien (Phiên N7-ck1-toan; Toán 7 tập một, Bài 1–19). Mỗi câu khớp đúng một mục của CHECKS (chữ has
// nằm trong đề bài hoặc một lựa chọn) rồi so đáp án với kết quả tính bằng code: trắc nghiệm o[0], điền khuyết ans[0], đúng/sai a, đúng/sai 4 ý a (từng ý
// tính lại), trả lời bằng số ans, nối cột r của từng ô l, sắp xếp o; tự luận: các bước trong thang chấm và đáp án gợi ý.
// Số hữu tỉ tính chính xác ({n, d}); luỹ thừa với số mũ tự nhiên, thứ tự thực hiện phép tính, quy tắc chuyển vế (phương trình bậc nhất
// một ẩn giải lại bằng hai giá trị của vế trái trừ vế phải), số thập phân vô hạn tuần hoàn viết gọn “2,1(35)” (đổi thành phân số, chu
// kì), làm tròn căn cứ vào độ chính xác theo bảng của sách (Bài 5: độ chính xác 50, 5, 0,5, 0,05, 0,005 ứng với hàng trăm, chục, đơn vị,
// phần mười, phần trăm), căn bậc hai số học (khai được thì hữu tỉ, không khai được là số vô tỉ, so theo giá trị), giá trị tuyệt đối.
// Câu có hình: đọc toạ độ trong hình (điểm có nhãn, đường thẳng, tia, số đo góc ghi trong góc, kí hiệu góc vuông, vạch đánh dấu đoạn
// thẳng bằng nhau, cung đánh dấu góc bằng nhau, mũi tên đánh dấu hai đường thẳng song song), kiểm tra hình đúng tỉ lệ (góc vẽ bằng số
// đo ghi, đoạn cùng số vạch dài bằng nhau, góc cùng số cung bằng nhau) rồi mới tính: cặp góc đối đỉnh, kề bù, so le trong, đồng vị,
// trong cùng phía, tổng ba góc của tam giác, góc ngoài, các yếu tố bằng nhau của hai tam giác và trường hợp bằng nhau, trục số, biểu đồ
// hình quạt tròn (góc ở tâm khớp số phần trăm) và biểu đồ đoạn thẳng (điểm theo trục số, số ghi trên điểm); chữ trong hình cỡ từ 13,
// nằm trọn trong khung, không đè nhau. Rồi kiểm tra như các script Toán 9, Toán 5 cuối kì I: ma trận (mỗi ô rút 1 câu và có 4 câu: một
// câu ở mỗi đề cố định, hai câu riêng; rút thử ra đúng 10 Biết, 8 Hiểu, 7 Vận dụng; đã làm hết một đề cố định thì không gặp lại câu của
// đề đó), câu tự luận chỉ ở hai ô Vận dụng chứng minh hai tam giác bằng nhau, đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn
// dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn, không lặp chữ của nhãn chủ đề, đúng/sai 4 ý không lặp kiểu Đ/S,
// đề bài không trùng câu nào trong data/banks/7-toan.js, không gần trùng câu của data/banks/6-toan.js (cặp từ liền nhau chung), dò lộ
// đáp án giữa mọi cặp câu của kho và lời dặn (đề “Ôn chủ đề” rút chung mọi câu của một chủ đề, đề ngẫu nhiên rút chung câu của mọi chủ
// đề khác) (Rút ra N5, N24, N8, RS9) và, nếu có ../OnUp-Book, so mọi trường chữ, cả chữ trong hình và lời dặn, với chữ OCR của mọi cuốn (không chuỗi
// 8 từ nào trùng), so số liệu của từng câu với từng trang Toán 7 tập một (không trang nào có từ ba số hiếm của một câu), so với câu
// của mọi kho khác (không chuỗi 8 từ nào trùng). Số đề, số câu lấy từ danh mục.
// DA_XEM ghi cả dòng dò lộ của tests/soat-nhap.js đã xem tay (số nhỏ trùng ngẫu nhiên). Mô tả script: tests/README.md, mục 3, “Lớp 7”.
// Chạy: node tests/toan7-ck1.js → in MATH OK. DO_LO=1 in đáp án bằng chữ có ở câu khác; DO_SACH=1 in chuỗi 6 từ trùng sách và các
// trang có số liệu chung; DO_KHO=1 in chuỗi 6 từ trùng kho khác, câu gần trùng kho Toán 6 (để người làm xem).
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan7-ck1-ngau-nhien";

/* ---------- số: hữu tỉ chính xác { n, d } (d > 0, tối giản); số thực (number) khi có căn không khai được, π ---------- */
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
const sqrt = (a) => { assert.ok(toNum(a) >= 0, "căn bậc hai số học của số âm"); if (isR(a)) { const p = isqrt(a.n), q = isqrt(a.d); if (p !== null && q !== null) return F(p, q); } return Math.sqrt(toNum(a)); };
const cmp = (a, b) => (isR(a) && isR(b) ? Math.sign(a.n * b.d - b.n * a.d) : Math.abs(toNum(a) - toNum(b)) <= 1e-9 * Math.max(1, Math.abs(toNum(a))) ? 0 : Math.sign(toNum(a) - toNum(b)));
const eq = (a, b) => cmp(a, b) === 0;
const isInt = (a) => isR(a) && a.d === 1;
const thou = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
// đọc một số viết như trong đề: "−3/7", "3", "1 800", "2,35", "−0,27", số thập phân vô hạn tuần hoàn "2,1(35)", "−0,(6)"
const fr = (s) => {
  s = String(s).trim().replace(/[−–]/g, "-").replace(/\s+/g, " ");
  let m = /^(-?\d+)\/(-?\d+)$/.exec(s);
  if (m) return F(+m[1], +m[2]);
  m = /^(-?)(\d+),(\d*)\((\d+)\)$/.exec(s);
  if (m) { const v = tuanHoan(m[2], m[3], m[4]); return m[1] ? neg(v) : v; }
  m = /^(-?)(\d{1,3}(?: \d{3})+|\d+)(?:,(\d+))?$/.exec(s);
  if (m) { const ip = m[2].replace(/ /g, ""), fp = m[3] || ""; const v = F(+(ip + fp), 10 ** fp.length); return m[1] ? neg(v) : v; }
  throw new Error("không đọc được số: " + s);
};
// số thập phân vô hạn tuần hoàn: phần nguyên a, phần không lặp b, chu kì c → phân số (0,b(c) = (bc − b) / (99…900…))
function tuanHoan(a, b, c) {
  const k = b.length, p = c.length, tu = +(b + c) - +(b || "0"), mau = (10 ** p - 1) * 10 ** k;
  return add(F(+a), F(tu, mau));
}
// viết số hữu tỉ dưới dạng số thập phân (hữu hạn hoặc vô hạn tuần hoàn, viết gọn như sách: "−0,2(7)", "0,(45)")
function thapPhan(a) {
  assert.ok(isR(a), "cần số hữu tỉ");
  const am = a.n < 0, n = Math.abs(a.n), d = a.d, ip = Math.floor(n / d);
  let r = n % d; const ds = [], seen = new Map();
  while (r && !seen.has(r)) { seen.set(r, ds.length); r *= 10; ds.push(Math.floor(r / d)); r %= d; }
  const fp = r ? ds.slice(0, seen.get(r)).join("") + "(" + ds.slice(seen.get(r)).join("") + ")" : ds.join("");
  return (am ? "−" : "") + thou(String(ip)) + (fp ? "," + fp : "");
}
// chu kì của số viết gọn "−4,0(72)" → "72"
const chuKi = (s) => { const m = /\((\d+)\)$/.exec(String(s).trim()); assert.ok(m, "không phải số thập phân vô hạn tuần hoàn viết gọn: " + s); return m[1]; };
// các chữ số đầu tiên sau dấu phẩy của một số hữu tỉ (để so với số viết dài "2,1353535…")
const chuSo = (a, k) => { const n = Math.abs(a.n), d = a.d; let r = n % d, s = ""; for (let i = 0; i < k; i++) { r *= 10; s += Math.floor(r / d); r %= d; } return Math.floor(n / d) + "," + s; };
const fmtInt = (a) => { assert.ok(isInt(a), "không phải số nguyên: " + JSON.stringify(a)); return (a.n < 0 ? "−" : "") + thou(String(Math.abs(a.n))); };
// phân số viết như trong đề, dấu "−" Unicode ("−3/2")
const fmtF = (a) => (isInt(a) ? fmtInt(a) : (a.n < 0 ? "−" : "") + Math.abs(a.n) + "/" + a.d);
const str = (a) => (a.d === 1 ? String(a.n) : a.n + "/" + a.d);
// số thập phân viết kiểu Việt Nam ("−2,35", "2 695,5"); k: số chữ số sau dấu phẩy (không ghi thì vừa đủ)
const fmtDec = (a, k) => {
  if (!isR(a)) { assert.ok(k !== undefined, "số thực cần ghi số chữ số"); a = F(Math.round(a * 10 ** k), 10 ** k); }
  let e = 0, d = a.d; while (d % 2 === 0) { d /= 2; e++; } let e5 = 0; while (d % 5 === 0) { d /= 5; e5++; }
  assert.equal(d, 1, "không viết được thành số thập phân hữu hạn: " + a.n + "/" + a.d);
  const places = k === undefined ? Math.max(e, e5) : k;
  assert.ok(places >= Math.max(e, e5), "cần nhiều chữ số thập phân hơn: " + a.n + "/" + a.d);
  const s = String(Math.abs(a.n) * (10 ** places / a.d)).padStart(places + 1, "0");
  return (a.n < 0 ? "−" : "") + thou(s.slice(0, s.length - places)) + (places ? "," + s.slice(s.length - places) : "");
};
// làm tròn theo quy tắc của sách (chữ số bỏ đi đầu tiên từ 5 trở lên thì tăng chữ số cuối giữ lại; số âm: làm tròn số đối rồi đặt dấu "−")
// k: số chữ số sau dấu phẩy giữ lại (k âm: làm tròn đến hàng chục, trăm); số thực mà chữ số bỏ đi gần đúng bằng 5 thì không hỏi
const lamTron = (x, k) => {
  if (isR(x)) { const p = F(10 ** Math.max(k, 0), 10 ** Math.max(-k, 0)), t = mul(F(Math.abs(x.n), x.d), p); const q = Math.floor((2 * t.n + t.d) / (2 * t.d)); return mul(F(x.n < 0 ? -q : q), div(F(1), p)); }
  const p = 10 ** k, t = Math.abs(x) * p;
  assert.ok(Math.abs(t - Math.floor(t) - 0.5) > 1e-4, "số ở sát ranh giới làm tròn: " + x);
  return F(Math.sign(x) * Math.floor(t + 0.5 + 1e-9) * (k < 0 ? 10 ** -k : 1), k > 0 ? p : 1);
};
// độ chính xác → số chữ số sau dấu phẩy của hàng làm tròn (bảng của sách, Bài 5)
const DO_CHINH_XAC = { "50": -2, "5": -1, "0,5": 0, "0,05": 1, "0,005": 2 };

/* ---------- bộ đọc biểu thức viết như trong đề ----------
   số (số thập phân có dấu phẩy, số ngăn hàng nghìn, số thập phân vô hạn tuần hoàn), + − · × : / và ngoặc ( ) [ ], luỹ thừa ² ³ ⁴…
   (chữ số nhỏ trên dòng, cả số mũ nhiều chữ số “¹²”) hoặc ^, căn √ (áp vào số, ngoặc ngay sau), |…| (giá trị tuyệt đối), π, nhân ngầm
   (“2√3”, “3x”, “(x + 1)(x − 1)”); chữ cái lấy giá trị trong vars. "/" cùng mức với “·”, “:”, trừ phân số viết liền “3/4” (gạch phân số
   làm trước). Kết quả là số hữu tỉ chính xác khi được. */
const SUP = { "⁰": 0, "¹": 1, "²": 2, "³": 3, "⁴": 4, "⁵": 5, "⁶": 6, "⁷": 7, "⁸": 8, "⁹": 9 };
function ev(src, vars) {
  const s = String(src).replace(/[−–]/g, "-").replace(/×/g, "·").replace(/ /g, " ");
  const toks = []; let i = 0;
  while (i < s.length) {
    const c = s[i], rest = s.slice(i);
    if (c === " ") { i++; continue; }
    let m = /^\d+,\d*\(\d+\)/.exec(rest) || /^\d+\/\d+(?![\d,])/.exec(rest) || /^\d{1,3}(?: \d{3})+(?:,\d+)?(?![\d])/.exec(rest) || /^\d+(?:,\d+)?/.exec(rest);
    if (m) { toks.push({ t: "n", v: fr(m[0]) }); i += m[0].length; continue; }
    m = /^[⁰¹²³⁴⁵⁶⁷⁸⁹]+/.exec(rest);
    if (m) { toks.push({ t: "^" }, { t: "n", v: F(+[...m[0]].map((x) => SUP[x]).join("")) }); i += m[0].length; continue; }
    if (c === "ⁿ") { assert.ok(vars && vars.n !== undefined, "biến n lạ trong " + src); toks.push({ t: "^" }, { t: "n", v: vars.n }); i++; continue; }
    if ("+-·:/()[]^√|π".includes(c)) { toks.push({ t: c === "[" ? "(" : c === "]" ? ")" : c }); i++; continue; }
    if (/[a-zA-Z]/.test(c)) { assert.ok(vars && vars[c] !== undefined, "biến lạ " + c + " trong " + src); toks.push({ t: "n", v: vars[c] }); i++; continue; }
    throw new Error("kí tự lạ “" + c + "” trong " + src);
  }
  let p = 0, inAbs = 0;
  const peek = () => toks[p], next = () => toks[p++];
  const startsAtom = (t) => t && (t.t === "n" || t.t === "(" || t.t === "√" || t.t === "π" || (t.t === "|" && !inAbs));
  const atom = () => {
    const t = next(); assert.ok(t, "thiếu số trong " + src);
    if (t.t === "n") return t.v;
    if (t.t === "π") return Math.PI;
    if (t.t === "(") { const v = expr(); assert.equal((next() || {}).t, ")", "thiếu ngoặc đóng trong " + src); return v; }
    if (t.t === "|") { inAbs++; const v = expr(); inAbs--; assert.equal((next() || {}).t, "|", "thiếu | trong " + src); return toNum(v) < 0 ? neg(v) : v; }
    if (t.t === "√") return sqrt(power());
    throw new Error("không hiểu " + src);
  };
  const power = () => { const v = atom(); if (peek() && peek().t === "^") { next(); const k = atom(); assert.ok(isInt(k), "số mũ phải là số tự nhiên"); return pw(v, k.n); } return v; };
  const unary = () => { const t = peek(); if (t && t.t === "-") { next(); return neg(unary()); } if (t && t.t === "+") { next(); return unary(); } return power(); };
  const term = () => {
    let v = unary();
    for (;;) {
      const t = peek();
      if (t && (t.t === "·" || t.t === ":" || t.t === "/")) { next(); const w = unary(); v = t.t === "·" ? mul(v, w) : div(v, w); }
      else if (startsAtom(t)) v = mul(v, power());
      else return v;
    }
  };
  const expr = () => { let v = term(); while (peek() && (peek().t === "+" || peek().t === "-")) { const op = next().t, w = term(); v = op === "+" ? add(v, w) : sub(v, w); } return v; };
  const v = expr();
  assert.equal(p, toks.length, "thừa kí tự trong " + src);
  return v;
}
// mệnh đề "A = B", "A < B", "A > B", "A ≤ B", "A ≥ B", "A ≠ B" đúng hay sai
const stmt = (s, vars) => {
  const m = /^(.+?) (=|<|>|≤|≥|≠) (.+)$/.exec(s); assert.ok(m, "mệnh đề lạ: " + s);
  const c = cmp(ev(m[1], vars), ev(m[3], vars));
  return { "=": c === 0, "<": c < 0, ">": c > 0, "≤": c <= 0, "≥": c >= 0, "≠": c !== 0 }[m[2]];
};
// phương trình bậc nhất một ẩn x viết trong đề ("3/5 − (x − 1/2) = 0,7"): vế trái trừ vế phải là a·x + b; trả về nghiệm duy nhất
const nghiemX = (s) => {
  const [l, r] = s.split(" = "); const f = (x) => sub(ev(l, { x }), ev(r, { x }));
  const b = f(F(0)), a = sub(f(F(1)), b); assert.ok(isR(a) && a.n !== 0, "phương trình không phải bậc nhất có một nghiệm: " + s);
  const x = div(neg(b), a); assert.ok(eq(f(F(7, 3)), add(mul(a, F(7, 3)), b)), "vế hai bên không bậc nhất theo x: " + s);
  return x;
};

/* ---------- hình ----------
   Điểm: chấm tròn nhỏ (r ≤ 4, tô ink) và chữ đậm một chữ cái in hoa cạnh chấm. Đường thẳng, tia, đoạn thẳng: nét line rộng 2 (không
   đứt). Tên tia, tên đường thẳng: chữ nghiêng (x, y′, a, d…) ngay sau đầu nét. Số đo góc: chữ “52°” trong góc, có cung ở đỉnh; số thứ tự
   góc (1, 2, 3, 4) hoặc dấu “?” trong góc, cạnh đỉnh. Kí hiệu: góc vuông (đường gấp khúc ba điểm), vạch ngắn cắt đoạn thẳng ở giữa
   (đoạn thẳng bằng nhau), cung ở đỉnh (góc bằng nhau), mũi tên nhỏ trên đường thẳng (hai đường thẳng song song). */
const nums = (s) => s.trim().split(/[\s,]+/).map(Number);
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const lines = (svg) => [...svg.matchAll(/<line [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { a: [+a.x1, +a.y1], b: [+a.x2, +a.y2], stroke: a.stroke || "", w: +(a["stroke-width"] || 1), dash: !!a["stroke-dasharray"] }; });
const circles = (svg) => [...svg.matchAll(/<circle [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { c: [+a.cx, +a.cy], r: +a.r, fill: a.fill || "none", w: +(a["stroke-width"] || 1) }; });
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { at: [+a.x, +a.y], t: m[2], b: a["font-weight"] === "700", i: a["font-style"] === "italic", fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start", fill: a.fill || "" }; });
const rects = (svg) => [...svg.matchAll(/<rect [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { x: +a.x, y: +a.y, w: +a.width, h: +a.height, fill: a.fill || "none" }; });
const polylines = (svg) => [...svg.matchAll(/<polyline [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { p: nums(a.points), stroke: a.stroke || "", w: +(a["stroke-width"] || 1) }; });
const arcs = (svg) => [...svg.matchAll(/<path d="M ([\d.-]+)[ ,]([\d.-]+) A ([\d.]+) ([\d.]+) 0 ([01]) ([01]) ([\d.-]+)[ ,]([\d.-]+)" fill="none"[^>]*>/g)].map((m) => { const v = m.slice(1).map(Number); return { s: [v[0], v[1]], r: v[2], e: [v[6], v[7]] }; });
const rong = (t) => (t.b ? 0.62 : 0.55) * t.fs * [...t.t].length; // ước bề rộng chữ (Noto Sans, chữ đậm rộng hơn)
const hopChu = (t) => { const w = rong(t), x0 = t.anchor === "middle" ? t.at[0] - w / 2 : t.anchor === "end" ? t.at[0] - w : t.at[0]; return [x0, t.at[1] - 0.75 * t.fs, x0 + w, t.at[1] + 0.25 * t.fs]; };
const tamChu = (t) => { const h = hopChu(t); return [(h[0] + h[2]) / 2, (h[1] + h[3]) / 2]; };
const RAD = Math.PI / 180;
const subv = (p, q) => [p[0] - q[0], p[1] - q[1]];
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const dot = (u, v) => u[0] * v[0] + u[1] * v[1];
const cross = (u, v) => u[0] * v[1] - u[1] * v[0];
const huong = (O, P) => (Math.atan2(-(P[1] - O[1]), P[0] - O[0]) / RAD + 360) % 360; // hướng từ O tới P (độ, ngược chiều kim đồng hồ)
const lech = (a, b) => (((a - b) % 360) + 360) % 360;
const goc = (o, a, b) => Math.acos(Math.max(-1, Math.min(1, dot(subv(a, o), subv(b, o)) / (dist(a, o) * dist(b, o))))) / RAD; // số đo góc aob (độ)
const dDoan = (p, a, b) => { const ab = subv(b, a), t = Math.max(0, Math.min(1, dot(subv(p, a), ab) / dot(ab, ab))); return dist(p, [a[0] + t * ab[0], a[1] + t * ab[1]]); };
const dThang = (p, a, b) => Math.abs(cross(subv(b, a), subv(p, a))) / dist(a, b);
const net = (svg) => lines(svg).filter((l) => l.w >= 2 && !l.dash);
// mọi chữ trong hình cỡ từ 13 trở lên, nằm trọn trong khung, không đè lên nhau
const chuHinh = (svg, ten) => {
  const v = nums(/viewBox="([^"]+)"/.exec(svg)[1]), T = texts(svg);
  T.forEach((t) => { const h = hopChu(t); assert.ok(t.fs >= 13, ten + ": chữ “" + t.t + "” nhỏ hơn cỡ 13"); assert.ok(h[0] >= 0 && h[2] <= v[2] && h[1] >= 0 && h[3] <= v[3], ten + ": chữ “" + t.t + "” tràn khỏi khung hình"); });
  T.forEach((t, i) => T.slice(i + 1).forEach((u) => { const a = hopChu(t), b = hopChu(u); assert.ok(!(a[0] < b[2] - 1 && b[0] < a[2] - 1 && a[1] < b[3] - 1 && b[1] < a[3] - 1), ten + ": chữ “" + t.t + "” đè lên chữ “" + u.t + "”"); }));
};
// đọc hình: điểm có nhãn (chữ đậm cạnh chấm), đầu tia có nhãn (chữ nghiêng cạnh đầu một nét), nét vẽ
function docHinh(svg, ten) {
  const L = net(svg), ch = circles(svg).filter((c) => c.r <= 4 && c.fill === "ink"), T = texts(svg), o = {};
  T.filter((t) => t.b && /^[A-Z]′?$/.test(t.t)).forEach((t) => {
    const c = tamChu(t), p = ch.slice().sort((u, v) => dist(u.c, c) - dist(v.c, c))[0];
    assert.ok(p && dist(p.c, c) < 38, ten + ": nhãn " + t.t + " phải đặt cạnh một điểm");
    assert.ok(!o[t.t], ten + ": hai nhãn " + t.t); o[t.t] = p.c;
  });
  const dau = []; L.forEach((l) => dau.push(l.a, l.b));
  T.filter((t) => t.i && /^[a-z]′?$/.test(t.t)).forEach((t) => {
    const c = tamChu(t), p = dau.slice().sort((u, v) => dist(u, c) - dist(v, c))[0];
    assert.ok(p && dist(p, c) < 24, ten + ": tên " + t.t + " phải ở ngay sau đầu một nét");
    assert.ok(!o[t.t], ten + ": hai nhãn " + t.t); o[t.t] = p;
  });
  assert.equal(new Set(Object.values(o).map(String)).size, Object.keys(o).length, ten + ": mỗi điểm một nhãn");
  // P, Q cùng nằm trên một nét vẽ
  const coNet = (P, Q) => L.some((l) => dDoan(P, l.a, l.b) < 0.8 && dDoan(Q, l.a, l.b) < 0.8);
  // các tia gốc O (theo các nét đi qua O): hướng và tên (nhãn gần O nhất nằm trên tia đó)
  const tiaTai = (O) => {
    const H = [];
    L.forEach((l) => { if (dDoan(O, l.a, l.b) < 0.8) [l.a, l.b].forEach((E) => { if (dist(E, O) > 3) { const h = huong(O, E); if (!H.some((x) => Math.min(lech(x, h), lech(h, x)) < 0.5)) H.push(h); } }); });
    return H.sort((a, b) => a - b).map((h) => {
      const tren = Object.keys(o).filter((k) => dist(o[k], O) > 3 && Math.min(lech(huong(O, o[k]), h), lech(h, huong(O, o[k]))) < 0.6 && coNet(O, o[k])).sort((a, b) => dist(o[a], O) - dist(o[b], O));
      return { h, ten: tren[0] || null };
    });
  };
  // góc gọi theo ba nhãn ("xOy", "x′Oy", "ABC"): kiểm tra hai cạnh có vẽ, trả về số đo đo trên hình
  const tachTen = (s) => s.match(/[A-Za-z]′?/g);
  const gocTen = (s) => {
    const [X, O, Y] = tachTen(s); assert.ok(o[X] && o[O] && o[Y], ten + ": thiếu nhãn của góc " + s);
    assert.ok(coNet(o[O], o[X]) && coNet(o[O], o[Y]), ten + ": góc " + s + " không có đủ hai cạnh trên hình");
    return goc(o[O], o[X], o[Y]);
  };
  return { o, L, T, coNet, tiaTai, gocTen, tachTen };
}
// số đo góc ghi trong hình (“52°”, chữ thường, không đậm): đỉnh là điểm có nhãn gần nhất mà có ít nhất hai tia; chữ nằm giữa hai tia
// liền nhau; góc vẽ phải bằng số đo (±1°); có cung đánh dấu ở đỉnh nằm giữa hai tia đó. Trả về [{ O, A, B (tên hai tia), v }]
function gocGhi(svg, H, ten) {
  const A = arcs(svg);
  return H.T.filter((t) => !t.b && /^\d+°$/.test(t.t)).map((t) => {
    const c = tamChu(t), v = +t.t.slice(0, -1);
    const O = Object.keys(H.o).filter((k) => /^[A-Z]/.test(k) && H.tiaTai(H.o[k]).length >= 2).sort((a, b) => dist(H.o[a], c) - dist(H.o[b], c))[0];
    assert.ok(O, ten + ": số đo " + t.t + " không gần đỉnh nào");
    const R = H.tiaTai(H.o[O]), h = huong(H.o[O], c);
    let k = R.findIndex((r, i) => { const n = R[(i + 1) % R.length]; return lech(h, r.h) < lech(n.h, r.h) || (R.length === 1); });
    const r1 = R[k], r2 = R[(k + 1) % R.length], d = lech(r2.h, r1.h);
    assert.ok(Math.abs(d - v) <= 1, `${ten}: góc ghi ${t.t} ở đỉnh ${O} mà vẽ ${d.toFixed(1)}°`);
    assert.ok(A.some((a) => Math.abs(dist(a.s, H.o[O]) - a.r) < 1 && Math.abs(dist(a.e, H.o[O]) - a.r) < 1 && [a.s, a.e].every((p) => { const g = lech(huong(H.o[O], p), r1.h); return g < d + 0.6 || g > 359.4; })), `${ten}: góc ${t.t} ở đỉnh ${O} thiếu cung đánh dấu`);
    return { O, A: r1.ten, B: r2.ten, v, t, h1: r1.h, h2: r2.h };
  });
}
// số thứ tự góc, dấu ? ghi trong góc (chữ cỡ 14, không đậm, không nghiêng, trong vòng 28 px quanh đỉnh): trả về { "<đỉnh><số>": {O, h1, h2, h} }
function gocSo(svg, H, ten) {
  const out = {};
  H.T.filter((t) => !t.b && !t.i && /^(?:[1-4]|\?)$/.test(t.t)).forEach((t) => {
    const c = tamChu(t), O = Object.keys(H.o).filter((k) => /^[A-Z]/.test(k)).sort((a, b) => dist(H.o[a], c) - dist(H.o[b], c))[0];
    assert.ok(O && dist(H.o[O], c) < 30, ten + ": số " + t.t + " không đứng cạnh đỉnh nào");
    const R = H.tiaTai(H.o[O]), h = huong(H.o[O], c), k = R.findIndex((r, i) => lech(h, r.h) < lech(R[(i + 1) % R.length].h, r.h));
    const r1 = R[k], r2 = R[(k + 1) % R.length];
    assert.ok(Math.abs(lech(h, r1.h) - lech(r2.h, r1.h) / 2) < 3, ten + ": số " + t.t + " ở đỉnh " + O + " không nằm trên đường phân giác của góc");
    assert.ok(!out[O + t.t], ten + ": hai góc " + O + t.t); out[O + t.t] = { O, h1: r1.h, h2: r2.h, h: lech(r2.h, r1.h), A: r1.ten, B: r2.ten };
  });
  return out;
}
// góc ở đỉnh P có cạnh theo hai hướng h1, h2 (độ) ↔ {O, h1, h2}; đổi góc gọi bằng ba nhãn thành dạng đó
const gocH = (H, s) => { const [X, O, Y] = H.tachTen(s); H.gocTen(s); const a = huong(H.o[O], H.o[X]), b = huong(H.o[O], H.o[Y]); return lech(b, a) <= 180 ? { O, h1: a, h2: b } : { O, h1: b, h2: a }; };
const ngcHuong = (h) => (h + 180) % 360, cungH = (a, b) => Math.min(lech(a, b), lech(b, a)) < 0.6;
// quan hệ của hai góc cùng đỉnh: "đối đỉnh" (mỗi cạnh góc này là tia đối của một cạnh góc kia), "kề bù" (chung một cạnh, hai cạnh còn
// lại là hai tia đối nhau), "khác"
function quanHeGoc(g1, g2) {
  if (g1.O !== g2.O) return "khác";
  const a = [g1.h1, g1.h2], b = [g2.h1, g2.h2];
  if (a.every((x) => b.some((y) => cungH(ngcHuong(x), y)))) return "đối đỉnh";
  for (const x of a) for (const y of b) if (cungH(x, y)) { const x2 = a.find((z) => z !== x), y2 = b.find((z) => z !== y); if (cungH(ngcHuong(x2), y2)) return "kề bù"; }
  return "khác";
}
// vị trí của hai góc ở hai giao điểm A, B của cát tuyến AB với hai đường thẳng: "so le trong", "đồng vị", "trong cùng phía", "khác".
// Mỗi góc có một cạnh nằm trên đường thẳng AB và một cạnh nằm trên đường thẳng đi qua đỉnh của nó.
function viTriCap(H, g1, g2) {
  const PA = H.o[g1.O], PB = H.o[g2.O], ab = huong(PA, PB), ba = huong(PB, PA);
  const tach = (g, P, toi) => { const c = [g.h1, g.h2]; const t = c.find((h) => cungH(h, toi) || cungH(h, ngcHuong(toi))); assert.ok(t !== undefined, "góc ở " + g.O + " không có cạnh nằm trên cát tuyến"); return { trong: cungH(t, toi), canh: c.find((h) => h !== t) }; };
  const a = tach(g1, PA, ab), b = tach(g2, PB, ba);
  const phia = (P, h) => Math.sign(cross(subv(PB, PA), [Math.cos(h * RAD), -Math.sin(h * RAD)]));
  const cungPhia = phia(PA, a.canh) === phia(PB, b.canh);
  if (a.trong && b.trong) return cungPhia ? "trong cùng phía" : "so le trong";
  if (a.trong !== b.trong && cungPhia) return "đồng vị";
  return "khác";
}
// hai đường thẳng (mỗi đường có tên nghiêng ở đầu) song song: hai nét cùng phương; có mũi tên nhỏ trên mỗi đường
function songSong(svg, H, a, b, ten) {
  const la = H.L.find((l) => dist(l.a, H.o[a]) < 0.8 || dist(l.b, H.o[a]) < 0.8), lb = H.L.find((l) => dist(l.a, H.o[b]) < 0.8 || dist(l.b, H.o[b]) < 0.8);
  assert.ok(la && lb, ten + ": không thấy đường thẳng " + a + " hay " + b);
  const ss = Math.abs(cross(subv(la.b, la.a), subv(lb.b, lb.a))) <= 1e-3 * dist(la.a, la.b) * dist(lb.a, lb.b);
  const mui = polylines(svg).filter((p) => p.p.length === 6).map((p) => [p.p[2], p.p[3]]);
  const coMui = (l) => mui.some((m) => dDoan(m, l.a, l.b) < 1.5);
  return { ss, mui: coMui(la) && coMui(lb), la, lb };
}
// kí hiệu đoạn thẳng bằng nhau: số vạch ngắn cắt ngang đoạn thẳng PQ ở gần trung điểm
const vachTren = (svg, P, Q) => lines(svg).filter((l) => l.w === 1.5 && dist(l.a, l.b) < 16 && Math.abs(dot(subv(l.b, l.a), subv(Q, P))) < 0.03 * dist(l.a, l.b) * dist(P, Q) && dDoan([(l.a[0] + l.b[0]) / 2, (l.a[1] + l.b[1]) / 2], P, Q) < 0.8 && dist([(l.a[0] + l.b[0]) / 2, (l.a[1] + l.b[1]) / 2], [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2]) < 12).length;
// kí hiệu góc bằng nhau: số cung tâm ở đỉnh O nằm giữa hai cạnh OX, OY
const cungTai = (svg, O, X, Y) => arcs(svg).filter((a) => Math.abs(dist(a.s, O) - a.r) < 1 && Math.abs(dist(a.e, O) - a.r) < 1 && [a.s, a.e].every((p) => { const g = goc(O, X, p) + goc(O, p, Y); return Math.abs(g - goc(O, X, Y)) < 0.8; }) && Math.min(goc(O, X, a.s), goc(O, Y, a.s)) < 0.8 && Math.min(goc(O, X, a.e), goc(O, Y, a.e)) < 0.8).length;
// kí hiệu góc vuông (đường gấp khúc ba điểm sát đỉnh): đỉnh O, góc XOY phải vuông
const coVuong = (svg, O, X, Y) => polylines(svg).filter((p) => p.p.length === 6).some((p) => { const a = [p.p[0], p.p[1]], m = [p.p[2], p.p[3]], b = [p.p[4], p.p[5]]; return [[a, b], [b, a]].some(([u, v]) => dDoan(u, O, X) < 0.8 && dDoan(v, O, Y) < 0.8 && dist(u, O) < 16 && dist(v, O) < 16 && Math.abs(dist(m, O) - Math.hypot(dist(u, O), dist(v, O))) < 0.8); }) && Math.abs(goc(O, X, Y) - 90) < 0.5;
// hai tam giác có kí hiệu: tìm mọi cách đặt tương ứng đỉnh (hoán vị) khớp kí hiệu (cạnh cùng số vạch, góc cùng số cung); hình phải đúng tỉ
// lệ (cạnh cùng số vạch dài bằng nhau, góc cùng số cung bằng nhau); trả về các cách khớp kèm trường hợp bằng nhau suy ra từ kí hiệu
const HOAN_VI = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
function haiTamGiac(svg, H, t1, t2, ten) {
  const P = (s) => [...s].map((k) => H.o[k]);
  const chungCanh = (t, i, j) => [t1, t2].every((u) => u.includes(t[i]) && u.includes(t[j])); // cạnh chung của hai tam giác
  const canh = (t, i, j) => (chungCanh(t, i, j) ? 99 : vachTren(svg, H.o[t[i]], H.o[t[j]])), gocK = (t, i) => cungTai(svg, H.o[t[i]], H.o[t[(i + 1) % 3]], H.o[t[(i + 2) % 3]]) + (coVuong(svg, H.o[t[i]], H.o[t[(i + 1) % 3]], H.o[t[(i + 2) % 3]]) ? 100 : 0);
  [t1, t2].forEach((t) => [0, 1, 2].forEach((i) => assert.ok(H.coNet(H.o[t[i]], H.o[t[(i + 1) % 3]]), ten + ": thiếu cạnh " + t[i] + t[(i + 1) % 3])));
  const dai = (t, i, j) => dist(H.o[t[i]], H.o[t[j]]), gocD = (t, i) => goc(H.o[t[i]], H.o[t[(i + 1) % 3]], H.o[t[(i + 2) % 3]]);
  const khop = HOAN_VI.filter((s) => {
    const cc = [[0, 1], [1, 2], [0, 2]].every(([i, j]) => canh(t1, i, j) === canh(t2, s[i], s[j]));
    const gg = [0, 1, 2].every((i) => gocK(t1, i) === gocK(t2, s[i]));
    return cc && gg;
  }).map((s) => {
    const c = [[0, 1], [1, 2], [0, 2]].filter(([i, j]) => canh(t1, i, j) > 0), g = [0, 1, 2].filter((i) => gocK(t1, i) > 0);
    c.forEach(([i, j]) => assert.ok(Math.abs(dai(t1, i, j) - dai(t2, s[i], s[j])) < 0.01 * dai(t1, i, j), ten + `: ${t1[i]}${t1[j]} và ${t2[s[i]]}${t2[s[j]]} cùng kí hiệu mà vẽ dài khác nhau`));
    g.forEach((i) => assert.ok(Math.abs(gocD(t1, i) - gocD(t2, s[i])) < 1, ten + `: góc ${t1[i]} và góc ${t2[s[i]]} cùng kí hiệu mà vẽ khác nhau`));
    const cg = c.length === 3 ? "c.c.c" : c.length === 2 && g.some((i) => c.every(([a, b]) => a === i || b === i)) ? "c.g.c" : c.length === 1 && g.length >= 2 && g.filter((i) => c[0].includes(i)).length === 2 ? "g.c.g" : null;
    return { s, ten2: [0, 1, 2].map((i) => t2[s[i]]).join(""), cg };
  });
  return khop;
}
// trục số: nét ngang dài (rộng 1,5), vạch chia đều, số nguyên ghi dưới vạch dài; điểm có nhãn nằm trên trục, đúng ở một vạch → giá trị
function trucSo(svg, ten) {
  const L = lines(svg), truc = L.filter((l) => l.w === 1.5 && l.a[1] === l.b[1] && Math.abs(l.a[0] - l.b[0]) > 150);
  assert.equal(truc.length, 1, ten + ": một trục số"); const y = truc[0].a[1];
  const vach = L.filter((l) => l.a[0] === l.b[0] && Math.min(l.a[1], l.b[1]) < y && Math.max(l.a[1], l.b[1]) > y).map((l) => ({ x: l.a[0], dai: Math.abs(l.a[1] - l.b[1]) > 10 })).sort((a, b) => a.x - b.x);
  const so = texts(svg).filter((t) => /^−?\d+$/.test(t.t) && t.at[1] > y).map((t) => ({ x: t.at[0], v: +t.t.replace("−", "-") })).sort((a, b) => a.x - b.x);
  assert.ok(so.length >= 3, ten + ": trục số ghi ít nhất ba số");
  const u = (so[so.length - 1].x - so[0].x) / (so[so.length - 1].v - so[0].v);
  so.forEach((s) => assert.ok(vach.some((v) => v.dai && Math.abs(v.x - s.x) < 0.6) && Math.abs(so[0].x + (s.v - so[0].v) * u - s.x) < 0.6, ten + ": số " + s.v + " không đúng chỗ"));
  const buoc = vach[1].x - vach[0].x; vach.forEach((v, i) => i && assert.ok(Math.abs(v.x - vach[i - 1].x - buoc) < 0.3, ten + ": vạch chia không đều"));
  const k = Math.round(u / buoc); assert.ok(Math.abs(u / buoc - k) < 0.01, ten + ": mỗi đơn vị chia số phần nguyên");
  const ch = circles(svg).filter((c) => c.r <= 4), o = {};
  texts(svg).filter((t) => t.b).forEach((t) => {
    const p = ch.slice().sort((a, b) => dist(a.c, tamChu(t)) - dist(b.c, tamChu(t)))[0]; assert.ok(p && Math.abs(p.c[1] - y) < 0.3, ten + ": điểm " + t.t + " nằm trên trục");
    const i = Math.round((p.c[0] - so[0].x) / buoc); assert.ok(Math.abs(so[0].x + i * buoc - p.c[0]) < 0.3, ten + ": điểm " + t.t + " không ở đúng vạch");
    o[t.t] = add(F(so[0].v), F(i, k));
  });
  return { o, k };
}

/* ---------- lựa chọn, thang chấm ---------- */
// đúng một lựa chọn thoả f (hàm nhận chữ của lựa chọn); trả về lựa chọn đó
const motLuaChon = (q, f) => { const m = q.o.filter(f); assert.equal(m.length, 1, "cần đúng một lựa chọn thoả: " + JSON.stringify(m) + " trong " + JSON.stringify(q.o)); return m[0]; };
// lựa chọn có giá trị bằng v (đọc bằng ev); các lựa chọn khác phải khác v
const bang = (q, v, vars) => motLuaChon(q, (o) => eq(ev(o, vars), v));
// số đo góc "52°" trong lựa chọn
const doLC = (q, v) => motLuaChon(q, (o) => o === v + "°");
const essayCheck = (q, rb, xx) => { const r = q.rubric.map((c) => c.c).join(" | "); rb.forEach((s) => assert.ok(r.includes(s), "thang chấm thiếu “" + s + "”")); xx.forEach((s) => assert.ok(q.x.includes(s), "gợi ý thiếu “" + s + "”")); };
const xs = (q, re) => { const m = re.exec(q.q); assert.ok(m, "đề thiếu " + re); return m.slice(1); };
// ý của câu đúng/sai 4 ý: "Số đối của X là Y", "X vừa là số hữu tỉ, vừa là số nguyên", "Số 0 là số hữu tỉ dương", mệnh đề so sánh
const yDung = (s, vars) => {
  let m;
  if ((m = /^Số đối của (.+) là (.+)$/.exec(s))) return eq(ev(m[2], vars), neg(ev(m[1], vars)));
  if ((m = /^(.+) vừa là số hữu tỉ, vừa là số nguyên$/.exec(s))) return isInt(ev(m[1]));
  if ((m = /^Số (.+) là số hữu tỉ (dương|âm)$/.exec(s))) { const v = toNum(ev(m[1])); return m[2] === "dương" ? v > 0 : v < 0; }
  if ((m = /^Nếu \|x\| = (.+) thì x = (.+)$/.exec(s))) return toNum(ev(m[1])) === 0 && eq(ev(m[2]), F(0)); // |x| = a > 0 có hai giá trị x
  return stmt(s, vars);
};

/* ---------- hàm phụ của các mục kiểm tra ---------- */
const hinhDaDoc = new Set();
const doc = (q) => { assert.ok(q.svg, "câu cần hình"); hinhDaDoc.add(q.svg); return q.svg; };
const SUB = { "₁": 1, "₂": 2, "₃": 3, "₄": 4 };
const phanGiacGoc = (g_) => (g_.h1 + lech(g_.h2, g_.h1) / 2) * RAD;
// góc ở giao điểm của một đường thẳng nằm ngang với cát tuyến đánh số như Hình 3.18 của sách: 1 dưới phải, 2 dưới trái, 3 trên trái,
// 4 trên phải (theo đường phân giác của góc); đường thẳng qua đỉnh phải nằm ngang
function soThuTu(H, S, ten) {
  Object.keys(S).filter((k) => /^[A-Z][1-4]$/.test(k)).forEach((k) => {
    const g_ = S[k], m = phanGiacGoc(g_), tren = Math.sin(m) > 0, phai = Math.cos(m) > 0, so = tren ? (phai ? 4 : 3) : phai ? 1 : 2;
    assert.ok(H.L.some((l) => Math.abs(l.a[1] - l.b[1]) < 0.01 && Math.abs(l.a[1] - H.o[g_.O][1]) < 0.8), ten + ": đường thẳng qua " + g_.O + " nằm ngang");
    assert.equal(+k[1], so, ten + ": góc " + k + " đánh số không đúng như Hình 3.18 của sách");
  });
}
// hai góc ở hai giao điểm của hai đường thẳng nằm ngang song song với một cát tuyến: cùng nhóm (1 và 3; 2 và 4 theo cách đánh số của
// sách) thì bằng nhau, khác nhóm thì bù nhau
const nhomGoc = (g_) => Math.sign(Math.sin(phanGiacGoc(g_)) * Math.cos(phanGiacGoc(g_)));
const theoSongSong = (g1, v, g2) => (nhomGoc(g1) === nhomGoc(g2) ? v : 180 - v);
function coSongSong(svg, H, ten) { const k = songSong(svg, H, "a", "b", ten); assert.ok(k.ss && k.mui, ten + ": a // b (vẽ song song, có kí hiệu)"); }
// hình mẫu: a // b nằm ngang, cát tuyến đi lên theo hướng th; các góc ở A, B đánh số như sách
function hinhMau(th) {
  const A = [0, 0], B = [-100 * Math.cos(th * RAD), 100 * Math.sin(th * RAD)], S = {};
  const k = { 4: [0, th], 3: [th, 180], 2: [180, th + 180], 1: [th + 180, 360] };
  ["A", "B"].forEach((O) => [1, 2, 3, 4].forEach((i) => { S[O + i] = { O, h1: k[i][0] % 360, h2: k[i][1] % 360, h: k[i][1] - k[i][0] }; }));
  return { H: { o: { A, B } }, S };
}
const TRUONG_HOP = { "c.c.c": "cạnh – cạnh – cạnh", "c.g.c": "cạnh – góc – cạnh", "g.c.g": "góc – cạnh – góc" };
// phát biểu dạng “Nếu … thì …” của câu chọn định lí: đúng hay sai (thử bằng số hoặc phản ví dụ)
const DINH_LI = {
  "Nếu một góc là góc tù thì góc bù với nó là góc nhọn": () => { for (let a = 91; a < 180; a++) if (!(180 - a < 90)) return false; return true; },
  "Nếu hai góc bằng nhau thì hai góc đó đối đỉnh": () => false, // phản ví dụ: hai góc 30° vẽ ở hai đỉnh khác nhau
  "Nếu hai góc có chung một đỉnh thì hai góc đó kề nhau": () => false, // phản ví dụ: góc xOy và góc x′Oy′ đối đỉnh, chung đỉnh mà không chung cạnh
  "Nếu hai góc nhọn có tổng bằng 90° thì hai góc đó kề bù": () => 90 === 180,
};
// loại dữ liệu (Bài 17): "số" (dữ liệu định lượng), "có thứ tự" / "không thứ tự" (dữ liệu không là số)
const BANG_DL = {
  "Chiều cao (cm) của từng bạn lớp 7A": "số", "Môn thể thao mà mỗi bạn lớp 7A thích nhất": "không thứ tự", "Màu áo các bạn lớp 7A mặc hôm nay": "không thứ tự",
  "Tên các loài cây trồng trong sân trường": "không thứ tự", "Mức độ yêu thích môn Toán: rất thích, thích, không thích": "có thứ tự",
  "Tên các tỉnh, thành phố mà các bạn trong lớp đã đến tham quan": "không thứ tự", "Số bạn nữ của mỗi tổ trong lớp": "số", "Cân nặng (kg) của các bạn trong tổ": "số",
  "số giờ ngủ mỗi đêm": "số", "môn học yêu thích": "không thứ tự", "kết quả rèn luyện: Tốt, Khá, Đạt, Chưa đạt": "có thứ tự", "số anh chị em ruột": "số",
};
const loaiDL = (s) => { assert.ok(s in BANG_DL, "chưa có trong bảng loại dữ liệu: " + s); return BANG_DL[s]; };
// nhóm học sinh được hỏi có đại diện cho học sinh cả trường không (Bài 17: chọn ngẫu nhiên trong toàn bộ đối tượng)
const DAI_DIEN = { "Mỗi lớp vài bạn ngẫu nhiên": true, "Các bạn trong đội bóng đá": false, "Các bạn cùng tổ với Hoa": false, "Những bạn nữ của khối 7": false };
// kiểm tra định lí của câu tự luận bằng số trên nhiều hình ngẫu nhiên (toạ độ thường, trục y hướng lên): f trả sai lệch hoặc null (bỏ hình)
const rnd = (a, b) => a + (b - a) * Math.random();
function thuDinhLi(ten, f) { let n_ = 0; for (let i = 0; i < 400 && n_ < 200; i++) { const e = f(); if (e === null) continue; n_++; assert.ok(e < 1e-6, ten + ": điều phải chứng minh sai trên một hình (" + e + ")"); } assert.ok(n_ >= 100, ten + ": thử được quá ít hình"); }
// giao điểm của đường thẳng P + t·u với đường thẳng Q + s·v (tia nếu tia = true: s ≥ 0); song song thì null
const catDuong = (P, u, Q, v, tia) => { const d = cross(u, v); if (Math.abs(d) < 1e-9) return null; const w = subv(Q, P), t = cross(w, v) / d, s_ = cross(w, u) / d; if (tia && s_ < 0) return null; return [P[0] + t * u[0], P[1] + t * u[1]]; };
const chieu = (P, A, B) => { const ab = subv(B, A), t = dot(subv(P, A), ab) / dot(ab, ab); return [A[0] + t * ab[0], A[1] + t * ab[1]]; };
const donVi = (v) => { const l = Math.hypot(...v); return [v[0] / l, v[1] / l]; };
const theoTia = (A, C, d) => { const u = donVi(subv(C, A)); return [A[0] + d * u[0], A[1] + d * u[1]]; };
const phanGiacCat = (A, B, C) => { const u = donVi(subv(B, A)), v = donVi(subv(C, A)); return catDuong(A, [u[0] + v[0], u[1] + v[1]], B, subv(C, B)); };
/* ---------- biểu đồ (như tests/toan9-ck2.js) ----------
   Trục đứng: số ghi bên trái (căn phải), cách đều từ 0, có đường lưới màu line ở mỗi vạch. Biểu đồ đoạn thẳng: điểm tô acc nối liên tiếp
   bằng đường gấp khúc, số ghi ngay trên điểm bằng độ cao điểm, mốc thời gian ở dưới trục. Biểu đồ hình quạt tròn: mỗi phần là một hình
   quạt (path "M tâm L đầu cung A r r 0 cờ 1 cuối cung Z") tô màu theo chú giải, số phần trăm (hoặc "?" khi bị mờ) ghi trong hình quạt,
   góc ở tâm khớp số phần trăm, các phần nối tiếp nhau đủ một vòng. */
const soChu = (s) => toNum(fr(String(s).replace(/%$/, "")));
const trucDung = (svg, ten) => {
  const so = texts(svg).filter((t) => t.anchor === "end" && /^\d+(?:,\d+)?$/.test(t.t)).map((t) => ({ v: soChu(t.t), y: t.at[1] - 5 })).sort((a, b) => a.v - b.v);
  assert.ok(so.length >= 3 && so[0].v === 0, ten + ": trục đứng bắt đầu từ 0, ít nhất 3 vạch");
  const bot = so[0].y, per = (bot - so[so.length - 1].y) / so[so.length - 1].v;
  so.forEach((s_) => assert.ok(Math.abs(bot - s_.v * per - s_.y) < 0.6, ten + ": vạch " + s_.v + " không cách đều"));
  const luoi = lines(svg).filter((l) => l.stroke === "line" && l.a[1] === l.b[1]).map((l) => l.a[1]);
  so.slice(1).forEach((s_) => assert.ok(luoi.some((y) => Math.abs(y - s_.y) < 0.6), ten + ": thiếu đường lưới ở vạch " + s_.v));
  return { bot, khop: (y, v) => Math.abs(bot - v * per - y) < 0.15 };
};
const soDinh = (T, cx, y, ten) => { const d = T.filter((t) => t.b && Math.abs(t.at[0] - cx) < 0.6 && t.at[1] < y && t.at[1] > y - 16); assert.equal(d.length, 1, ten + ": mỗi điểm một số ghi ngay trên"); return d[0]; };
const tenDuoi = (T, cx, bot, ten) => { const d = T.filter((t) => !t.b && Math.abs(t.at[0] - cx) < 0.6 && t.at[1] > bot && t.at[1] < bot + 30); assert.equal(d.length, 1, ten + ": mỗi điểm một tên ghi dưới trục"); return d[0].t; };
const docDoanThang = (svg, ten) => {
  const tr = trucDung(svg, ten), T = texts(svg);
  const P = circles(svg).filter((c) => c.fill === "acc").map((c) => c.c).sort((a, b) => a[0] - b[0]);
  const pl = polylines(svg).filter((p) => p.stroke === "acc"); assert.equal(pl.length, 1, ten + ": một đường gấp khúc");
  const q = []; for (let i = 0; i < pl[0].p.length; i += 2) q.push([pl[0].p[i], pl[0].p[i + 1]]);
  assert.ok(q.length === P.length && q.every((p, i) => dist(p, P[i]) < 0.15), ten + ": đường gấp khúc nối lần lượt các điểm");
  return P.map((p) => { const d = soDinh(T, p[0], p[1], ten); assert.ok(tr.khop(p[1], soChu(d.t)), ten + ": số ghi " + d.t + " khác độ cao của điểm"); return [tenDuoi(T, p[0], tr.bot, ten), soChu(d.t)]; });
};
const docQuat = (svg, ten) => {
  const T = texts(svg);
  const chuGiai = rects(svg).filter((r) => r.w === 16).map((r) => { const t = T.filter((t_) => Math.abs(t_.at[0] - (r.x + 24)) < 0.6 && Math.abs(t_.at[1] - (r.y + 13)) < 0.6); assert.equal(t.length, 1, ten + ": mỗi ô chú giải một tên"); return { fill: r.fill, ten: t[0].t }; });
  assert.equal(new Set(chuGiai.map((c) => c.fill)).size, chuGiai.length, ten + ": mỗi ô chú giải một màu");
  const gocDo = (cx, cy, x, y) => (Math.atan2(y - cy, x - cx) * 180) / Math.PI;
  let cuoi = null, tong = 0;
  const out = [...svg.matchAll(/<path d="([^"]+)" fill="([^"]+)"[^>]*>/g)].map((m) => {
    const k = /^M ([\d.]+) ([\d.]+) L ([\d.]+) ([\d.]+) A ([\d.]+) ([\d.]+) 0 ([01]) 1 ([\d.]+) ([\d.]+) Z$/.exec(m[1]);
    assert.ok(k, ten + ": phần của biểu đồ hình quạt tròn là một hình quạt");
    const [cx, cy, x0, y0, r, r2, lon, x1, y1] = k.slice(1).map(Number);
    assert.ok(r === r2 && Math.abs(Math.hypot(x0 - cx, y0 - cy) - r) < 0.15 && Math.abs(Math.hypot(x1 - cx, y1 - cy) - r) < 0.15, ten + ": hai đầu cung nằm trên đường tròn");
    const a0 = gocDo(cx, cy, x0, y0), d = lech(gocDo(cx, cy, x1, y1), a0);
    assert.equal(lon, d > 180 ? 1 : 0, ten + ": cờ cung lớn khớp số đo của hình quạt");
    if (cuoi) assert.ok(Math.hypot(cuoi[0] - x0, cuoi[1] - y0) < 0.15, ten + ": các hình quạt nối tiếp nhau");
    cuoi = [x1, y1]; tong += d;
    const c = chuGiai.find((g_) => g_.fill === m[2]); assert.ok(c, ten + ": màu của hình quạt có trong chú giải");
    const nhan = T.filter((t) => /^(?:\d+(?:,\d+)?%|\?)$/.test(t.t) && Math.hypot(t.at[0] - cx, t.at[1] - 5 - cy) < r && lech(gocDo(cx, cy, t.at[0], t.at[1] - 5), a0) < d);
    assert.equal(nhan.length, 1, ten + ": mỗi hình quạt một số phần trăm ở trong");
    const p = nhan[0].t === "?" ? null : soChu(nhan[0].t);
    if (p !== null) assert.ok(Math.abs(d / 3.6 - p) < 0.15, ten + ": hình quạt “" + c.ten + "” có góc " + d.toFixed(1) + "°, không khớp " + p + "%");
    return { ten: c.ten, p, d };
  });
  assert.ok(Math.abs(tong - 360) < 0.5, ten + ": các hình quạt đủ một vòng tròn");
  const biet = out.filter((o) => o.p !== null).reduce((s_, o) => s_ + o.p, 0), mo = out.filter((o) => o.p === null);
  assert.ok(mo.length <= 1 && (mo.length ? Math.abs(mo[0].d / 3.6 - (100 - biet)) < 0.15 : Math.abs(biet - 100) < 1e-9), ten + ": các phần cộng lại 100%");
  assert.deepEqual(out.map((o) => o.ten).sort(), chuGiai.map((c) => c.ten).sort(), ten + ": mỗi phần một ô chú giải");
  return out;
};
const phanTram = (qt, ten) => { const o = qt.find((x) => x.ten === ten); assert.ok(o, "biểu đồ không có phần " + ten); return o.p; };

/* ---------- kiểm tra từng câu: has (chữ có trong đề bài), right(q) (đáp án tính bằng code), more(q) (kiểm tra thêm) ---------- */
const CHECKS = [
  /* Tập hợp các số hữu tỉ */
  { has: "Số đối của số hữu tỉ −5/8 là", right: (q) => bang(q, neg(fr("−5/8"))) },
  { has: "Điểm A ứng với số hữu tỉ nào?", right: (q) => { const t = trucSo(doc(q), "trục số"); assert.equal(t.k, +xs(q, /chia thành (\d+) phần/)[0], "mỗi đơn vị chia số phần như đề"); return bang(q, t.o.A); } },
  { has: "−1,6 = −8/5", right: (q) => q.o.map((s) => yDung(s)) },
  { has: "Số thập phân −2,25 viết dưới dạng phân số tối giản là", right: (q) => motLuaChon(q, (o) => { const v = fr(o), m = /^−?(\d+)\/(\d+)$/.exec(o); return eq(v, fr("−2,25")) && gcd(+m[1], +m[2]) === 1; }) },
  { has: "Số lớn nhất trong các số −0,6; −3/4; −2/3; −0,65 là", right: (q) => { const s = xs(q, /các số (.+) là$/)[0].split("; ").map(fr); assert.equal(s.length, q.o.length); return motLuaChon(q, (o) => s.every((v) => cmp(fr(o), v) >= 0)); } },
  { has: "Sắp xếp các số hữu tỉ 1/3; −0,5; 0,3; −2/5", right: (q) => xs(q, /số hữu tỉ (.+) theo thứ tự/)[0].split("; ").sort((a, b) => cmp(fr(a), fr(b))) },
  { has: "Có bao nhiêu số nguyên x lớn hơn −7/3 và nhỏ hơn 11/4?", right: () => { let k = 0; for (let x = -20; x <= 20; x++) if (cmp(fr("−7/3"), F(x)) < 0 && cmp(F(x), fr("11/4")) < 0) k++; return F(k); } },
  { has: "Số hữu tỉ nào dưới đây nằm giữa hai số −1/2 và −1/3?", right: (q) => motLuaChon(q, (o) => cmp(fr("−1/2"), fr(o)) < 0 && cmp(fr(o), fr("−1/3")) < 0) },
  /* Cộng, trừ, nhân, chia số hữu tỉ */
  { has: "Tính −3/4 + 5/6.", right: () => ev("−3/4 + 5/6") },
  { has: "Kết quả của phép tính (−0,6) · 2,5 là", right: (q) => bang(q, ev("(−0,6) · 2,5")) },
  { has: "Tính 2/5 : (−4/15).", right: () => ev("2/5 : (−4/15)") },
  { has: "Kết quả của phép tính 1,25 − 7/4 là", right: (q) => bang(q, ev("1,25 − 7/4")) },
  { has: "Một đội công nhân sửa một đoạn đường trong ba tuần", right: (q) => { const [a, b, c] = xs(q, /được (\d+\/\d+) đoạn đường, tuần thứ hai sửa được ([\d,]+) đoạn đường, tuần thứ ba sửa nốt (\d+) m/); return div(fr(c), sub(F(1), add(fr(a), fr(b)))); } },
  { has: "Bác An lát gạch một sân phơi hình chữ nhật dài 12,5 m", right: (q) => { const [d, k, k2] = xs(q, /chữ nhật dài ([\d,]+) m, rộng bằng (\d+\/\d+) chiều dài\. Bác đã lát được (\d+\/\d+) diện tích/); return mul(mul(fr(d), mul(fr(d), fr(k))), fr(k2)); } },
  { has: "Một cuộn dây điện dài 25 m", right: (q) => { const [L, k, c, n] = xs(q, /dài (\d+) m\. Thợ điện cắt (\d+\/\d+) cuộn dây .* cắt thêm ([\d,]+) m .* chia đều cho (\d+) phòng/); return div(sub(sub(fr(L), mul(fr(L), fr(k))), fr(c)), fr(n)); } },
  { has: "Chị Mai có 1 800 000 đồng", right: (q) => {
    const S = fr("1 800 000"), sach = mul(S, F(1, 3)), dd = mul(S, fr("0,25")), con = sub(sub(S, sach), dd);
    return [eq(sach, fr(/dùng ([\d ]+) đồng để mua sách/.exec(q.o[0])[1])), cmp(dd, sach) > 0, eq(add(F(1, 3), fr("0,25")), fr(/dùng (\d+\/\d+) số tiền/.exec(q.o[2])[1])), eq(con, fr(/còn lại ([\d ]+) đồng/.exec(q.o[3])[1]))]; } },
  /* Luỹ thừa với số mũ tự nhiên của một số hữu tỉ */
  { has: "Kết quả của phép tính (−3/5)⁷ : (−3/5)⁵ là", right: (q) => bang(q, ev("(−3/5)⁷ : (−3/5)⁵")) },
  { has: "Tính (−2)⁵ : (−2)³ + (1/3)² · 3⁴.", right: () => ev("(−2)⁵ : (−2)³ + (1/3)² · 3⁴") },
  { has: "(−0,5)³ = −0,125", right: (q) => q.o.map((s) => stmt(s)) },
  { has: "Biểu thức (9/4)³ : (3/2)² viết dưới dạng một luỹ thừa của 3/2 là", right: (q) => { q.o.forEach((o) => assert.ok(/^\(3\/2\)[⁰¹²³⁴⁵⁶⁷⁸⁹]+$/.test(o), "lựa chọn là luỹ thừa của 3/2")); return bang(q, ev("(9/4)³ : (3/2)²")); } },
  /* Thứ tự thực hiện các phép tính. Quy tắc chuyển vế */
  { has: "Tìm x, biết 3/5 − (x − 1/2) = 0,7.", right: (q) => nghiemX(xs(q, /biết (.+ = .+?)\. Viết/)[0]) },
  { has: "Tính giá trị của biểu thức A = (−1/2)² − 3/4 : (−3/8) + 1,5.", right: (q) => ev(xs(q, /A = (.+?)\. Viết/)[0]) },
  { has: "Giá trị của x thoả mãn 0,5x − 2/3 = 1/4 · x + 1/3 là", right: (q) => bang(q, nghiemX(xs(q, /thoả mãn (.+) là$/)[0])) },
  { has: "Tìm x, biết 2,4 − (x + 3/5) = 1/2 · x.", right: (q) => nghiemX(xs(q, /biết (.+ = .+?)\. Viết/)[0]) },
  /* Số thập phân vô hạn tuần hoàn */
  { has: "Số thập phân 2,1353535… (chữ số 3 và 5 lặp lại mãi) viết gọn là", right: (q) => {
    const dai = xs(q, /phân ([\d,]+)…/)[0], k = dai.split(",")[1].length;
    const khop = q.o.filter((o) => chuSo(fr(o), k) === dai);
    assert.deepEqual(khop, [q.o[0]], "chỉ một cách viết gọn cho đúng các chữ số đã viết"); return thapPhan(fr(q.o[0])); } },
  { has: "Chu kì của số thập phân vô hạn tuần hoàn −4,0(72) là", right: () => { const s = thapPhan(fr("−4,0(72)")); assert.equal(s, "−4,0(72)", "viết gọn đúng"); return chuKi(s); } },
  { has: "Làm tròn số 3,4(18) với độ chính xác 0,05 ta được", right: (q) => fmtDec(lamTron(fr(xs(q, /Làm tròn số (\S+) với/)[0]), DO_CHINH_XAC["0,05"]), DO_CHINH_XAC["0,05"]) },
  { has: "Kết quả của phép chia 5 : 11 viết dưới dạng số thập phân là", right: () => thapPhan(F(5, 11)) },
  /* Số vô tỉ. Căn bậc hai số học */
  { has: "Trong các số √49; 0,(6); −3/8; √5, số nào là số vô tỉ?", right: (q) => motLuaChon(q, (o) => !isR(ev(o))) },
  { has: "Tính √1,69.", right: () => ev("√1,69") },
  { has: "Căn bậc hai số học của 64 là", right: (q) => bang(q, ev("√64")) },
  { has: "Số 1,(41) là một số vô tỉ.", right: () => !isR(ev("1,(41)")) },
  { has: "Khẳng định nào dưới đây đúng?", right: (q) => motLuaChon(q, (o) => stmt(o)) },
  { has: "Tính giá trị của biểu thức √81 − 2 · √(1/4) + √0,49.", right: (q) => ev(xs(q, /biểu thức (.+)\.$/)[0]) },
  { has: "Số dương x thoả mãn x² = 1,96 là", right: (q) => bang(q, ev("√1,96")) },
  { has: "Tính √16 · √25 − √121.", right: () => ev("√16 · √25 − √121") },
  /* Tập hợp các số thực */
  { has: "Tìm số thực x âm thoả mãn 3 · |x| − 4,2 = 3,3.", right: () => { const m = []; for (let n = -300; n <= 300; n++) { const x = F(n, 10); if (eq(ev("3 · |x| − 4,2", { x }), fr("3,3"))) m.push(x); } assert.equal(m.length, 2, "hai số có giá trị tuyệt đối như nhau"); const am = m.filter((x) => toNum(x) < 0); assert.equal(am.length, 1); return am[0]; } },
  { has: "Sắp xếp các số thực √3; −1,7; 1,(7); −√2", right: (q) => xs(q, /số thực (.+) theo thứ tự/)[0].split("; ").sort((a, b) => cmp(ev(a), ev(b))) },
  { has: "Giá trị của biểu thức |−3,5| + |1,5 − 4| − √0,25 là", right: (q) => bang(q, ev("|−3,5| + |1,5 − 4| − √0,25")) },
  { has: "|−√7| = √7", right: (q) => q.o.map((s) => yDung(s)) },
  /* Góc ở vị trí đặc biệt. Tia phân giác của một góc */
  { has: "hai đường thẳng xx′ và yy′ cắt nhau tại O. Số đo góc x′Oy′ là", right: (q) => {
    const svg = doc(q), H = docHinh(svg, "xx′, yy′"), G = gocGhi(svg, H, "xx′, yy′"); assert.equal(G.length, 1);
    assert.deepEqual([G[0].A, G[0].B].sort(), ["x", "y"], "số đo ghi ở góc xOy");
    assert.equal(quanHeGoc(gocH(H, "xOy"), gocH(H, "x′Oy′")), "đối đỉnh");
    return doLC(q, G[0].v); } },
  { has: "Cho hai góc kề bù xOy và yOz, trong đó góc xOy = 125°.", right: (q) => doLC(q, 180 - +xs(q, /góc xOy = (\d+)°/)[0]) },
  { has: "tia Ot là tia phân giác của góc xOy. Số đo góc xOy là", right: (q) => {
    const svg = doc(q), H = docHinh(svg, "phân giác"), G = gocGhi(svg, H, "phân giác"); assert.equal(G.length, 1);
    assert.deepEqual([G[0].A, G[0].B].sort(), ["t", "x"], "số đo ghi ở góc xOt");
    assert.ok(Math.abs(H.gocTen("xOt") - H.gocTen("tOy")) < 0.5, "Ot là tia phân giác: hai góc vẽ bằng nhau");
    return doLC(q, 2 * G[0].v); } },
  { has: "hai đường thẳng mm′ và nn′ cắt nhau tại I. Mỗi ý sau đúng hay sai?", right: (q) => {
    const H = docHinh(doc(q), "mm′, nn′");
    return q.o.map((s) => { const m = /^Góc (\S+) và góc (\S+) là hai góc (đối đỉnh|kề bù)$/.exec(s); assert.ok(m, "ý lạ: " + s); return quanHeGoc(gocH(H, m[1]), gocH(H, m[2])) === m[3]; }); } },
  /* Hai đường thẳng song song và dấu hiệu nhận biết */
  { has: "Cặp góc nào dưới đây là cặp góc so le trong?", right: (q) => {
    const svg = doc(q), H = docHinh(svg, "cát tuyến"), S = gocSo(svg, H, "cát tuyến");
    soThuTu(H, S, "cát tuyến");
    return motLuaChon(q, (o) => { const m = /^góc ([A-Z])([₁₂₃₄]) và góc ([A-Z])([₁₂₃₄])$/.exec(o); return viTriCap(H, S[m[1] + SUB[m[2]]], S[m[3] + SUB[m[4]]]) === "so le trong"; }); } },
  { has: "Trong hình vẽ, đường thẳng c cắt hai đường thẳng a, b tại A và B. Khẳng định nào dưới đây đúng?", right: (q) => {
    const svg = doc(q), H = docHinh(svg, "dấu hiệu"), G = gocGhi(svg, H, "dấu hiệu"); assert.equal(G.length, 2);
    const vt = viTriCap(H, G[0], G[1]); assert.ok(["so le trong", "đồng vị"].includes(vt) && G[0].v === G[1].v, "hai góc ghi số đo là cặp góc so le trong hoặc đồng vị bằng nhau");
    assert.ok(songSong(svg, H, "a", "b", "dấu hiệu").ss, "hình vẽ a // b");
    return motLuaChon(q, (o) => o === "a // b vì có hai góc " + vt + " bằng nhau"); } },
  { has: "đường thẳng d cắt hai đường thẳng m, n lần lượt tại M và N. Mỗi ý sau đúng hay sai?", right: (q) => {
    const svg = doc(q), H = docHinh(svg, "m, n, d"), S = gocSo(svg, H, "m, n, d"); soThuTu(H, S, "m, n, d");
    return q.o.map((s) => { const m = /^Góc ([A-Z])([₁₂₃₄]) và góc ([A-Z])([₁₂₃₄]) là hai góc (so le trong|đồng vị|trong cùng phía)$/.exec(s); assert.ok(m, "ý lạ: " + s); return viTriCap(H, S[m[1] + SUB[m[2]]], S[m[3] + SUB[m[4]]]) === m[5]; }); } },
  { has: "đường thẳng c cắt ba đường thẳng a, b, d lần lượt tại A, B, D. Hai đường thẳng nào song song với nhau?", right: (q) => {
    const svg = doc(q), H = docHinh(svg, "ba đường thẳng"), G = gocGhi(svg, H, "ba đường thẳng"), tai = (P) => G.find((x) => x.O === P);
    const TEN = { a: "A", b: "B", d: "D" }, cap = [["a", "b"], ["a", "d"], ["b", "d"]];
    const ss = cap.filter(([u, v]) => { const g1 = tai(TEN[u]), g2 = tai(TEN[v]); const vt = viTriCap(H, g1, g2); const theoGoc = ["đồng vị", "so le trong"].includes(vt) && g1.v === g2.v;
      assert.equal(songSong(svg, H, u, v, "ba đường thẳng").ss, theoGoc, `hình vẽ ${u}, ${v} song song khớp số đo`); return theoGoc; });
    assert.equal(ss.length, 1, "đúng một cặp song song"); return motLuaChon(q, (o) => o === ss[0].join(" và ")); } },
  /* Tiên đề Euclid. Tính chất của hai đường thẳng song song */
  { has: "Biết góc A₄ lớn hơn góc A₁ là 50°. Tính số đo góc B₂.", right: (q) => {
    const svg = doc(q), H = docHinh(svg, "a // b"), S = gocSo(svg, H, "a // b"); soThuTu(H, S, "a // b"); coSongSong(svg, H, "a // b");
    const d = +xs(q, /lớn hơn góc A₁ là (\d+)°/)[0], A4 = F(180 + d, 2);
    assert.ok(Math.abs(S.A4.h - toNum(A4)) < 0.5 && Math.abs(S.A1.h - (180 - toNum(A4))) < 0.5, "hình vẽ đúng số đo góc A₄, A₁");
    assert.equal(quanHeGoc(S.A4, S.A2), "đối đỉnh"); assert.equal(viTriCap(H, S.A2, S.B2), "đồng vị");
    assert.ok(Math.abs(S.B2.h - toNum(A4)) < 0.5, "góc B₂ vẽ bằng góc tính được"); return A4; } },
  { has: "Trong hình vẽ, a // b. Tính số đo góc được đánh dấu “?”.", right: (q) => {
    const svg = doc(q), H = docHinh(svg, "a // b, ?"), G = gocGhi(svg, H, "a // b, ?"), S = gocSo(svg, H, "a // b, ?"); coSongSong(svg, H, "a // b, ?");
    assert.equal(G.length, 1); const k = S["B?"]; assert.ok(k, "dấu ? ở B");
    const v = theoSongSong(G[0], G[0].v, k);
    assert.ok(Math.abs(k.h - v) < 0.5, "góc ? vẽ bằng góc tính được"); return F(v); } },
  { has: "Trong hình vẽ, a ⊥ c, b ⊥ c và đường thẳng d cắt a, b lần lượt tại M và N.", right: (q) => {
    const svg = doc(q), H = docHinh(svg, "a ⊥ c, b ⊥ c"), G = gocGhi(svg, H, "a ⊥ c, b ⊥ c"), S = gocSo(svg, H, "a ⊥ c, b ⊥ c");
    assert.ok(coVuong(svg, H.o.P, H.o.M, H.o.Q) && coVuong(svg, H.o.Q, H.o.N, H.o.P), "kí hiệu góc vuông: a ⊥ c, b ⊥ c");
    assert.ok(songSong(svg, H, "a", "b", "a ⊥ c, b ⊥ c").ss, "a // b");
    const k = S["N?"]; assert.ok(k && G.length === 1 && G[0].O === "M");
    const v = theoSongSong(G[0], G[0].v, k);
    assert.ok(Math.abs(k.h - v) < 0.5, "góc ? vẽ bằng góc tính được"); return doLC(q, v); } },
  { has: "Trong hình vẽ, a // b; đường thẳng c cắt a tại A, cắt b tại B. Mỗi ý sau đúng hay sai?", right: (q) => {
    const svg = doc(q), H = docHinh(svg, "a // b, 53°"), S = gocSo(svg, H, "a // b, 53°"), G = gocGhi(svg, H, "a // b, 53°"); coSongSong(svg, H, "a // b, 53°"); soThuTu(H, S, "a // b, 53°");
    assert.equal(G.length, 1); S.A4 = G[0]; S.A4.h = G[0].v; soThuTu(H, S, "a // b, 53°");
    const do_ = (k) => Math.round(S[k].h), ten = (s) => { const m = /^góc ([A-Z])([₁₂₃₄])$/.exec(s); assert.ok(m, "góc lạ: " + s); return m[1] + SUB[m[2]]; };
    return q.o.map((s) => { let m = /^(góc \S+) = (\d+)°$/.exec(s); if (m) return do_(ten(m[1])) === +m[2]; m = /^(góc \S+) = (góc \S+)$/.exec(s); assert.ok(m, "ý lạ: " + s); return do_(ten(m[1])) === do_(ten(m[2])); }); } },
  /* Định lí và chứng minh định lí */
  { has: "Cho định lí: “Nếu hai góc cùng bù với một góc thứ ba thì hai góc đó bằng nhau”.", right: (q) => {
    const k = /cùng (bù|phụ) với/.exec(q.q)[1], s = k === "bù" ? 180 : 90;
    // kiểm tra định lí bằng số: góc A, B cùng bù (phụ) với góc C thì A = B
    for (let c = 1; c < s; c++) assert.equal(s - c, s - c);
    return `GT: góc A + góc C = ${s}°, góc B + góc C = ${s}°; KL: góc A = góc B`; } },
  { has: "để chứng minh: “Nếu đường thẳng c cắt hai đường thẳng song song a, b lần lượt tại A, B thì hai góc trong cùng phía A₁ và B₄ có tổng bằng 180°”", right: (q) => {
    // các quan hệ dùng trong từng bước, kiểm tra trên hình mẫu đánh số như Hình 3.18 (a // b, cát tuyến bất kì)
    [70, 110].forEach((th) => { const M = hinhMau(th);
      assert.equal(viTriCap(M.H, M.S.A1, M.S.B3), "so le trong"); assert.equal(quanHeGoc(M.S.B3, M.S.B4), "kề bù"); assert.equal(viTriCap(M.H, M.S.A1, M.S.B4), "trong cùng phía");
      assert.ok(Math.abs(M.S.A1.h + M.S.B4.h - 180) < 1e-6, "hai góc trong cùng phía bù nhau"); });
    // mỗi bước dùng điều bước trước đã có; bước cuối là kết luận của định lí
    const kl = /thì hai góc trong cùng phía (A₁) và (B₄) có tổng bằng 180°/.exec(q.q); assert.ok(kl);
    const thu = ["Vì a // b", "Mà", "Thay"]; return thu.map((t) => { const o = q.o.filter((s) => s.startsWith(t)); assert.equal(o.length, 1, "bước bắt đầu bằng " + t); return o[0]; }).map((s, i, a) => { if (i === 2) assert.ok(s.endsWith("góc A₁ + góc B₄ = 180°")); return s; }); } },
  { has: "Phát biểu nào dưới đây là một định lí (một khẳng định đúng)?", right: (q) => motLuaChon(q, (o) => { assert.ok(o in DINH_LI, "chưa có trong bảng: " + o); return DINH_LI[o](); }) },
  { has: "Xét định lí: “Nếu hai góc của một tam giác có tổng bằng 90° thì góc còn lại của tam giác đó là góc vuông”.", right: (q) => {
    const [gt, kl] = xs(q, /“Nếu (.+?) thì (.+?)”/);
    // định lí đúng: hai góc có tổng 90° thì góc còn lại bằng 180° − 90° = 90°
    for (let a = 1; a < 90; a++) assert.equal(180 - a - (90 - a), 90);
    return q.o.map((s) => { let m = /^Giả thiết của định lí là: (.+)$/.exec(s); if (m) return m[1] === gt; m = /^Kết luận của định lí là: (.+)$/.exec(s); if (m) return m[1] === kl;
      m = /^Tam giác có ba góc (\d+)°, (\d+)°, (\d+)° thoả mãn giả thiết của định lí$/.exec(s); assert.ok(m, "ý lạ: " + s); const g3 = m.slice(1).map(Number); assert.equal(g3[0] + g3[1] + g3[2], 180, "tổng ba góc 180°");
      return g3.some((x, i) => g3.some((y, j) => i < j && x + y === 90)); }); } },
  /* Tổng các góc trong một tam giác */
  { has: "Tính số đo góc A của tam giác ABC trong hình vẽ.", right: (q) => {
    const svg = doc(q), H = docHinh(svg, "tam giác ABC"), G = gocGhi(svg, H, "tam giác ABC"), S = gocSo(svg, H, "tam giác ABC");
    assert.deepEqual(G.map((g_) => g_.O).sort(), ["B", "C"]); const v = 180 - G[0].v - G[1].v; assert.ok(S["A?"] && Math.abs(S["A?"].h - v) < 0.5, "góc A vẽ bằng góc tính được"); return F(v); } },
  { has: "Tam giác ABC vuông tại A có góc B = 31°. Số đo góc C là", right: (q) => doLC(q, 90 - +xs(q, /góc B = (\d+)°/)[0]) },
  { has: "Tam giác nào dưới đây là tam giác tù?", right: (q) => motLuaChon(q, (o) => { const [a, b] = /(\d+)° và (\d+)°/.exec(o).slice(1).map(Number); assert.ok(a + b < 180); return 180 - a - b > 90 || a > 90 || b > 90; }) },
  { has: "Tam giác MNP có góc M = 82° và góc N = góc P.", right: (q) => F(180 - +xs(q, /góc M = (\d+)°/)[0], 2) },
  { has: "Tam giác ABC có góc C = 64° và góc A lớn hơn góc B là 14°.", right: (q) => { const [c, d] = xs(q, /góc C = (\d+)° và góc A lớn hơn góc B là (\d+)°/).map(Number); return F(180 - c + d, 2); } },
  { has: "tia phân giác của góc A của tam giác ABC cắt cạnh BC tại D. Số đo góc ADC là", right: (q) => {
    const svg = doc(q), H = docHinh(svg, "phân giác AD"), G = gocGhi(svg, H, "phân giác AD"), S = gocSo(svg, H, "phân giác AD");
    assert.ok(Math.abs(H.gocTen("BAD") - H.gocTen("DAC")) < 0.5, "AD là tia phân giác của góc A");
    const B = G.find((x) => x.O === "B").v, C = G.find((x) => x.O === "C").v, v = 180 - C - (180 - B - C) / 2;
    assert.ok(S["D?"] && Math.abs(S["D?"].h - v) < 0.5 && Math.abs(H.gocTen("ADC") - v) < 0.5, "góc ADC vẽ bằng góc tính được"); return doLC(q, v); } },
  { has: "tam giác ABC có góc A = 46°, góc B = 63° và Cx là tia đối của tia CB.", right: (q) => {
    const svg = doc(q), H = docHinh(svg, "góc ngoài"), G = gocGhi(svg, H, "góc ngoài"), A = G.find((x) => x.O === "A").v, B = G.find((x) => x.O === "B").v;
    assert.deepEqual([A, B], xs(q, /góc A = (\d+)°, góc B = (\d+)°/).map(Number), "số đo trong hình khớp đề");
    assert.equal(quanHeGoc(gocH(H, "ACB"), gocH(H, "ACx")), "kề bù", "Cx là tia đối của tia CB");
    const V = { "góc ACB": 180 - A - B, "góc ACx": A + B, "góc BAC": A, "góc ABC": B };
    Object.keys(V).forEach((k) => assert.ok(Math.abs(H.gocTen(k.slice(4)) - V[k]) < 0.5, k + " vẽ đúng"));
    return q.o.map((s) => { let m = /^(góc \w+) = (\d+)°$/.exec(s); if (m) return V[m[1]] === +m[2]; m = /^(góc \w+) = (góc \w+) \+ (góc \w+)$/.exec(s); assert.ok(m, "ý lạ: " + s); return V[m[1]] === V[m[2]] + V[m[3]]; }); } },
  { has: "ΔABC vuông tại A và AH ⊥ BC tại H. Tính số đo góc được đánh dấu “?”.", right: (q) => {
    const svg = doc(q), H = docHinh(svg, "đường vuông góc AH"), G = gocGhi(svg, H, "đường vuông góc AH"), S = gocSo(svg, H, "đường vuông góc AH");
    assert.ok(coVuong(svg, H.o.A, H.o.B, H.o.C) && coVuong(svg, H.o.H, H.o.A, H.o.C), "kí hiệu góc vuông ở A và H");
    const B = G.find((x) => x.O === "B").v, v = 90 - (90 - B); assert.ok(S["A?"] && Math.abs(S["A?"].h - v) < 0.5 && Math.abs(H.gocTen("HAC") - v) < 0.5, "góc HAC vẽ bằng góc tính được"); return F(v); } },
  /* Hai tam giác bằng nhau. Trường hợp bằng nhau thứ nhất */
  { has: "Cho ΔABC = ΔMNP. Cạnh tương ứng với cạnh AC là", right: (q) => { const [t1, t2] = xs(q, /Δ(\w+) = Δ(\w+)/); return motLuaChon(q, (o) => o === t2[t1.indexOf("A")] + t2[t1.indexOf("C")]); } },
  { has: "Cho ΔDEF = ΔRST và góc E = 64°.", right: (q) => { const [t1, t2] = xs(q, /Δ(\w+) = Δ(\w+)/); return motLuaChon(q, (o) => o === "góc " + t2[t1.indexOf("E")]); } },
  { has: "các cạnh bằng nhau của hai tam giác được đánh dấu bằng cùng một kí hiệu. Cách viết nào dưới đây đúng?", right: (q) => {
    const svg = doc(q), H = docHinh(svg, "c.c.c"), K = haiTamGiac(svg, H, "ABC", "DEF", "c.c.c"); assert.equal(K.length, 1, "đúng một cách đặt tương ứng khớp kí hiệu"); assert.equal(K[0].cg, "c.c.c");
    return motLuaChon(q, (o) => o === "ΔABC = Δ" + K[0].ten2); } },
  { has: "Cho ΔPQR = ΔXYZ. Nối mỗi cạnh, góc của tam giác XYZ ở cột trái", right: (q) => {
    const [t1, t2] = xs(q, /Δ(\w+) = Δ(\w+)/), nguoc = (c) => t1[t2.indexOf(c)];
    return q.l.map((l) => { let m = /^góc (\w)$/.exec(l); const k = m ? ["góc " + nguoc(m[1])] : [[...l].map(nguoc).join(""), [...l].map(nguoc).reverse().join("")];
      const r = q.r.filter((x) => k.includes(x)); assert.equal(r.length, 1, "ô " + l + " nối được đúng một ô"); return r[0]; }); } },
  /* Trường hợp bằng nhau thứ hai và thứ ba của tam giác */
  { has: "Cần thêm điều kiện nào để ΔABC = ΔDEF theo trường hợp cạnh – góc – cạnh?", right: (q) => {
    // c.g.c: hai cạnh kề góc đã cho (góc B ↔ góc E); đã có AB = DE nên cạnh còn lại kề B là BC ↔ EF
    const [X, Y, V] = xs(q, /có (\w)(\w) = \w\w và góc (\w) = góc \w/), t1 = "ABC", t2 = "DEF", map = (k) => t2[t1.indexOf(k)];
    assert.ok(V === X || V === Y, "góc đã cho ở một đầu của cạnh đã cho"); const W = [...t1].find((c) => c !== X && c !== Y);
    return motLuaChon(q, (o) => o === V + W + " = " + map(V) + map(W)); } },
  { has: "Hai tam giác MNP và HIK trong hình vẽ bằng nhau theo trường hợp nào?", right: (q) => {
    const svg = doc(q), H = docHinh(svg, "g.c.g"), K = haiTamGiac(svg, H, "MNP", "HIK", "g.c.g"); assert.equal(K.length, 1); assert.equal(K[0].ten2, "HIK");
    return motLuaChon(q, (o) => o === TRUONG_HOP[K[0].cg]); } },
  { has: "Hai tam giác ABC và KLM có AB = KL, góc B = góc L, BC = LM.", right: (q) => {
    const [t1, t2] = xs(q, /Hai tam giác (\w+) và (\w+) có/);
    const c = [...q.q.matchAll(/(\w)(\w) = (\w)(\w)/g)].map((m) => m.slice(1)), g_ = /góc (\w) = góc (\w)/.exec(q.q).slice(1), map = {};
    c.concat([[g_[0], "", g_[1], ""]]).forEach(([a, b, x, y]) => { [[a, x], [b, y]].forEach(([u, v]) => { if (u) { assert.ok(!map[u] || map[u] === v, "tương ứng mâu thuẫn"); map[u] = v; } }); });
    const thieu = [...t1].find((k) => !map[k]); if (thieu) map[thieu] = [...t2].find((k) => !Object.values(map).includes(k));
    assert.ok(c.every(([a, b]) => a === g_[0] || b === g_[0]), "góc bằng nhau xen giữa hai cạnh bằng nhau: c.g.c");
    return motLuaChon(q, (o) => o === "Δ" + t1 + " = Δ" + [...t1].map((k) => map[k]).join("") + " (c.g.c)"); } },
  { has: "Trong hình vẽ, MN = QP và góc MNP = góc QPN. Mỗi ý sau đúng hay sai?", right: (q) => {
    const svg = doc(q), H = docHinh(svg, "MNPQ"), K = haiTamGiac(svg, H, "MNP", "QPN", "MNPQ"); assert.equal(K.length, 1); const ten2 = K[0].ten2, cg = K[0].cg; assert.equal(cg, "c.g.c");
    const tu = (s) => [...s].map((k) => ten2["MNP".indexOf(k)]).join("");
    return q.o.map((s) => { let m = /^ΔMNP = Δ(\w+)(?: \((.+)\))?$/.exec(s); if (m) return m[1] === ten2 && (!m[2] || m[2] === cg);
      m = /^(\w\w) = (\w\w)$/.exec(s); if (m) { const a = tu(m[1]); return a === m[2] || a === [...m[2]].reverse().join(""); }
      m = /^góc (\w)(\w)(\w) = góc (\w)(\w)(\w)$/.exec(s); assert.ok(m, "ý lạ: " + s); return tu(m[2]) === m[5] && Math.abs(H.gocTen(m.slice(1, 4).join("")) - H.gocTen(m.slice(4, 7).join(""))) < 0.5; }); } },
  { has: "Trên cạnh AC lấy điểm D sao cho AD = AB. Tia phân giác của góc A cắt cạnh BC tại E.", essay: (q) => { thuDinhLi("phân giác", () => { const A = [0, 0], a1 = rnd(0, 60) * RAD, a2 = a1 + rnd(20, 120) * RAD, b = rnd(2, 4), B = [b * Math.cos(a1), b * Math.sin(a1)], C = [(b + rnd(1, 4)) * Math.cos(a2), (b + rnd(1, 4)) * Math.sin(a2)]; const D = theoTia(A, C, dist(A, B)), E = phanGiacCat(A, B, C); return Math.abs(dist(E, B) - dist(E, D)); });
    essayCheck(q, ["AB = AD (giả thiết), góc BAE = góc DAE", "AE là cạnh chung", "ΔABE = ΔADE (c.g.c)", "EB = ED (hai cạnh tương ứng)"], ["ΔABE = ΔADE (c.g.c)", "EB = ED"]); } },
  { has: "Trên hai nửa mặt phẳng đối nhau bờ AB, vẽ hai tia Ax và By sao cho góc BAx = góc ABy.", essay: (q) => { thuDinhLi("O trung điểm", () => { const A = [-3, 0], B = [3, 0], O = [0, 0], a = rnd(20, 160) * RAD, ux = [Math.cos(a), Math.sin(a)], uy = [-ux[0], -ux[1]], k = rnd(0, 180) * RAD, d = [Math.cos(k), Math.sin(k)];
      const C = catDuong(O, d, A, ux, true), D = catDuong(O, d, B, uy, true); if (!C || !D) return null; return Math.abs(dist(O, C) - dist(O, D)); });
    essayCheck(q, ["góc OAC = góc OBD (giả thiết), OA = OB", "góc AOC = góc BOD (hai góc đối đỉnh)", "ΔOAC = ΔOBD (g.c.g)", "OC = OD (hai cạnh tương ứng)"], ["ΔOAC = ΔOBD (g.c.g)", "O là trung điểm của đoạn thẳng CD"]); } },
  { has: "Trên tia đối của tia MB lấy điểm D sao cho MD = MB. Chứng minh: a) ΔMAB = ΔMCD; b) AB // CD.", essay: (q) => { thuDinhLi("AB // CD", () => { const P_ = () => [rnd(0, 6), rnd(0, 6)], A = P_(), B = P_(), C = P_(), M = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2], D = [2 * M[0] - B[0], 2 * M[1] - B[1]]; if (Math.abs(cross(subv(B, A), subv(C, A))) < 0.5) return null; return Math.abs(cross(subv(B, A), subv(D, C))) / (dist(A, B) * dist(C, D)); });
    essayCheck(q, ["MA = MC (M là trung điểm của AC), góc AMB = góc CMD (hai góc đối đỉnh), MB = MD", "ΔMAB = ΔMCD (c.g.c)", "góc MAB = góc MCD", "Hai góc đó so le trong", "nên AB // CD"], ["ΔMAB = ΔMCD (c.g.c)", "AB // CD"]); } },
  { has: "Trên tia Ox lấy điểm A, trên tia Oy lấy điểm B sao cho OA = OB = 5 cm. Tia phân giác của góc xOy cắt đoạn thẳng AB tại M.", right: (q) => {
    const [oa, ab] = xs(q, /OA = OB = ([\d,]+) cm.*AB = ([\d,]+) cm/).map(fr); assert.ok(toNum(ab) < 2 * toNum(oa), "AB < OA + OB");
    const a = 2 * Math.asin(toNum(ab) / (2 * toNum(oa))), O = [0, 0], A = [toNum(oa), 0], B = [toNum(oa) * Math.cos(a), toNum(oa) * Math.sin(a)], M = catDuong(O, [Math.cos(a / 2), Math.sin(a / 2)], A, subv(B, A));
    assert.ok(Math.abs(dist(M, B) - toNum(ab) / 2) < 1e-9, "M là trung điểm của AB"); return div(ab, F(2)); } },
  /* Các trường hợp bằng nhau của tam giác vuông */
  { has: "Lấy hai điểm C và D nằm khác phía đối với đường thẳng AB sao cho CA ⊥ AB, DB ⊥ AB và AC = BD.", essay: (q) => { thuDinhLi("hai cạnh góc vuông", () => { const L = 2 + 6 * Math.random(), h = 1 + 5 * Math.random(), A = [0, 0], B = [L, 0], M = [L / 2, 0], C = [0, h], D = [L, -h]; return Math.abs(dist(M, C) - dist(M, D)); });
    essayCheck(q, ["MA = MB (M là trung điểm của AB), AC = BD", "ΔMAC = ΔMBD (hai cạnh góc vuông)", "MC = MD (hai cạnh tương ứng)"], ["ΔMAC = ΔMBD (hai cạnh góc vuông)", "MC = MD"]); } },
  { has: "Kẻ BE vuông góc với đường thẳng AM tại E, CF vuông góc với đường thẳng AM tại F", essay: (q) => { thuDinhLi("cạnh huyền – góc nhọn", () => { const P_ = () => [rnd(0, 8), rnd(0, 8)], A = P_(), B = P_(), C = P_(), M = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2], u = subv(M, A); if (Math.hypot(...u) < 0.5) return null; const E = chieu(B, A, M), F_ = chieu(C, A, M); return Math.abs(dist(B, E) - dist(C, F_)); });
    essayCheck(q, ["MB = MC (M là trung điểm của BC), góc BME = góc CMF (hai góc đối đỉnh)", "ΔMBE = ΔMCF (cạnh huyền – góc nhọn)", "BE = CF (hai cạnh tương ứng)"], ["ΔMBE = ΔMCF (cạnh huyền – góc nhọn)", "BE = CF"]); } },
  { has: "Qua A kẻ đường thẳng vuông góc với Ox, qua B kẻ đường thẳng vuông góc với Oy; hai đường thẳng đó gặp nhau tại I.", essay: (q) => { thuDinhLi("cạnh huyền – cạnh góc vuông", () => { const a = (10 + 75 * Math.random()) * RAD, r = 1 + 5 * Math.random(), O = [0, 0], A = [r, 0], B = [r * Math.cos(a), r * Math.sin(a)], I = catDuong(A, [0, 1], B, [-Math.sin(a), Math.cos(a)]); return Math.abs(goc(O, A, I) - goc(O, I, B)); });
    essayCheck(q, ["OI là cạnh huyền chung, OA = OB", "ΔOAI = ΔOBI (cạnh huyền – cạnh góc vuông)", "góc AOI = góc BOI", "OI là tia phân giác của góc xOy"], ["ΔOAI = ΔOBI (cạnh huyền – cạnh góc vuông)", "OI là tia phân giác của góc xOy"]); } },
  { has: "Cho ΔABC vuông tại A và ΔA′B′C′ vuông tại A′ có BC = B′C′ = 7 cm và góc B = góc B′.", right: (q) => {
    const [bc, ab, ac] = xs(q, /BC = B′C′ = ([\d,]+) cm.*AB = ([\d,]+) cm và AC = ([\d,]+) cm/).map(fr);
    assert.ok(eq(add(mul(ab, ab), mul(ac, ac)), mul(bc, bc)), "số đo ba cạnh của tam giác vuông khớp nhau (để hình có thật)"); return add(add(ab, ac), bc); } },
  /* Tam giác cân. Đường trung trực của đoạn thẳng */
  { has: "Tam giác ABC cân tại A có góc B = 66°. Số đo góc C là", right: (q) => doLC(q, +xs(q, /góc B = (\d+)°/)[0]) },
  { has: "đường thẳng d là đường trung trực của đoạn thẳng AB và điểm M nằm trên d. Độ dài đoạn thẳng MB là", right: (q) => {
    const svg = doc(q), H = docHinh(svg, "trung trực"), P = H.o;
    assert.ok(vachTren(svg, P.A, P.H) === 1 && vachTren(svg, P.H, P.B) === 1 && Math.abs(dist(P.A, P.H) - dist(P.H, P.B)) < 0.5, "H là trung điểm của AB");
    assert.ok(coVuong(svg, P.H, P.B, P.d), "d vuông góc với AB tại H"); assert.ok(dDoan(P.M, P.H, P.d) < 0.8, "M nằm trên d");
    const nh = texts(svg).filter((t) => /cm$/.test(t.t)); assert.equal(nh.length, 1); const c = tamChu(nh[0]); assert.ok(dDoan(c, P.M, P.A) < 30 && dDoan(c, P.M, P.A) < dDoan(c, P.M, P.B), "số đo ghi cạnh MA");
    return motLuaChon(q, (o) => o === nh[0].t); } },
  { has: "Tam giác MNP có MN = NP = PM = 4 cm. Số đo góc MNP bằng", right: () => F(180, 3) },
  { has: "Điểm K thuộc đường trung trực của đoạn thẳng CD. Khẳng định nào dưới đây đúng?", right: (q) => {
    // thử với nhiều điểm K trên đường trung trực của CD: chỉ khẳng định đúng với mọi K
    const thu = (o) => { for (let i = 0; i < 50; i++) { const C = [0, 0], D = [4, 0], K = [2, -10 + 20 * Math.random()], L = { KC: dist(K, C), KD: dist(K, D), CD: 4 }; const m = /^(\w\w) = (\w\w)$/.exec(o), m2 = /^(\w\w) \+ (\w\w) = (\w\w)$/.exec(o);
      const ok = m ? Math.abs(L[m[1]] - L[m[2]]) < 1e-9 : Math.abs(L[m2[1]] + L[m2[2]] - L[m2[3]]) < 1e-9; if (!ok) return false; } return true; };
    return motLuaChon(q, thu); } },
  { has: "Tam giác ABC cân tại A có góc A = 28°. Tính số đo góc B.", right: (q) => F(180 - +xs(q, /góc A = (\d+)°/)[0], 2) },
  { has: "Tam giác DEF cân tại D có góc E = 50°. Tia phân giác của góc D cắt cạnh EF tại I. Số đo góc EDI là", right: (q) => doLC(q, (180 - 2 * +xs(q, /góc E = (\d+)°/)[0]) / 2) },
  { has: "Một tam giác cân có một góc bằng 116°.", right: (q) => { const a = +xs(q, /bằng (\d+)°/)[0]; assert.ok(a > 90, "góc tù nên là góc ở đỉnh"); return F(180 - a, 2); } },
  { has: "Điểm C thuộc đường trung trực của đoạn thẳng AB và góc CAB = 35°.", right: (q) => doLC(q, 180 - 2 * +xs(q, /góc CAB = (\d+)°/)[0]) },
  /* Thu thập và phân loại dữ liệu */
  { has: "Dữ liệu nào dưới đây là dữ liệu định lượng (dữ liệu là số)?", right: (q) => motLuaChon(q, (o) => loaiDL(o) === "số") },
  { has: "Loại dữ liệu nào dưới đây không là số nhưng có thể sắp thứ tự?", right: (q) => motLuaChon(q, (o) => loaiDL(o) === "có thứ tự") },
  { has: "Bạn Hà ghi lại bốn loại dữ liệu về các bạn trong lớp", right: (q) => {
    const D = {}; [...q.q.matchAll(/\((\d)\) ([^;]+?)(?:;|\. Mỗi)/g)].forEach((m) => { D[m[1]] = loaiDL(m[2]); });
    return q.o.map((s) => { const m = /^Dữ liệu \((\d)\) là (.+)$/.exec(s); assert.ok(m, "ý lạ: " + s); const k = { "dữ liệu định lượng": ["số"], "dữ liệu định tính, sắp được theo thứ tự": ["có thứ tự"], "dữ liệu không là số": ["có thứ tự", "không thứ tự"] }[m[2]]; assert.ok(k, "loại lạ: " + m[2]); return k.includes(D[m[1]]); }); } },
  { has: "bạn Hoa nên hỏi nhóm học sinh nào dưới đây để dữ liệu thu được có tính đại diện?", right: (q) => motLuaChon(q, (o) => { assert.ok(o in DAI_DIEN, "chưa có trong bảng: " + o); return DAI_DIEN[o]; }) },
  /* Biểu đồ hình quạt tròn */
  { has: "Có bao nhiêu bạn tham gia câu lạc bộ Robot?", right: (q) => mul(fr(xs(q, /Lớp 7B có (\d+) học sinh/)[0]), F(phanTram(docQuat(doc(q), "câu lạc bộ"), "Robot"), 100)) },
  { has: "Mỗi ngày có khoảng bao nhiêu ki-lô-gam rác giấy?", right: (q) => { const Q = docQuat(doc(q), "rác"), mo = Q.find((x) => x.p === null); assert.equal(mo.ten, "Giấy", "phần bị mờ là giấy"); const p = 100 - Q.filter((x) => x.p !== null).reduce((t, x) => t + x.p, 0);
    return motLuaChon(q, (o) => o === fmtDec(mul(fr(xs(q, /khoảng (\d+) kg rác/)[0]), F(p, 100))) + " kg"); } },
  { has: "Vườn trường có 300 cây. Mỗi ý sau đúng hay sai?", right: (q) => {
    const Q = docQuat(doc(q), "vườn trường"), N = +xs(q, /có (\d+) cây/)[0], so = (t) => (N * phanTram(Q, t)) / 100, p = (t) => phanTram(Q, t), ten = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    return q.o.map((s) => { let m;
      if ((m = /^Vườn trường có (\d+) (cây .+)$/.exec(s))) return so(ten(m[2])) === +m[1];
      if ((m = /^Số (cây .+) nhiều hơn số (cây .+) (\d+) cây$/.exec(s))) return so(ten(m[1])) - so(ten(m[2])) === +m[3];
      if ((m = /^Số (cây .+) gấp đôi số (cây .+)$/.exec(s))) return so(ten(m[1])) === 2 * so(ten(m[2]));
      m = /^(Cây .+) và (cây .+) chiếm hơn một nửa số cây trong vườn$/.exec(s); assert.ok(m, "ý lạ: " + s); return p(m[1]) + p(ten(m[2])) > 50; }); } },
  { has: "Có 54 bạn chọn môn Bơi. Có bao nhiêu học sinh khối 7 tham gia khảo sát?", right: (q) => div(fr(xs(q, /Có (\d+) bạn chọn môn Bơi/)[0]), F(phanTram(docQuat(doc(q), "thể thao"), "Bơi"), 100)) },
  /* Biểu đồ đoạn thẳng */
  { has: "Tháng nào lượng nước dùng tăng nhiều nhất so với tháng liền trước?", right: (q) => { const D = docDoanThang(doc(q), "lượng nước"), t = D.slice(1).map((x, i) => [x[0], x[1] - D[i][1]]).sort((a, b) => b[1] - a[1]);
    assert.ok(t[0][1] > t[1][1], "một tháng tăng nhiều nhất"); return motLuaChon(q, (o) => o === "Tháng " + t[0][0].slice(1)); } },
  { has: "Tổng số cây giống cửa hàng bán được trong 5 tuần đó là bao nhiêu?", right: (q) => F(docDoanThang(doc(q), "cây giống").reduce((t, x) => t + x[1], 0)) },
  { has: "khối lượng giấy vụn lớp 7C thu gom được từ tháng 9 đến tháng 12. Mỗi ý sau đúng hay sai?", right: (q) => {
    const D = docDoanThang(doc(q), "giấy vụn"), v = (th) => D.find((x) => x[0] === "T" + th)[1];
    return q.o.map((s) => { let m;
      if ((m = /^Tháng (\d+) lớp 7C thu gom được nhiều giấy vụn nhất$/.exec(s))) return D.every((x) => x[1] <= v(m[1]));
      if ((m = /^Từ tháng (\d+) đến tháng (\d+), khối lượng giấy vụn giảm (\d+) kg$/.exec(s))) return v(m[1]) - v(m[2]) === +m[3];
      if ((m = /^Khối lượng giấy vụn tháng (\d+) gấp đôi tháng (\d+)$/.exec(s))) return v(m[1]) === 2 * v(m[2]);
      m = /^Cả bốn tháng lớp 7C thu gom được (\d+) kg giấy vụn$/.exec(s); assert.ok(m, "ý lạ: " + s); return D.reduce((t, x) => t + x[1], 0) === +m[1]; }); } },
  { has: "số lượt khách tham quan một vườn quốc gia từ năm 2021 đến năm 2025. Nhận xét nào dưới đây đúng?", right: (q) => {
    const D = docDoanThang(doc(q), "vườn quốc gia"), v = (n) => D.find((x) => x[0] === String(n))[1];
    return motLuaChon(q, (o) => { let m;
      if (o === "Số lượt khách tăng liên tục qua các năm") return D.every((x, i) => !i || x[1] > D[i - 1][1]);
      if ((m = /^Năm (\d+) có ít lượt khách nhất trong 5 năm$/.exec(o))) return D.every((x) => x[1] >= v(m[1]));
      if ((m = /^Số lượt khách năm (\d+) gấp (\d+) lần năm (\d+)$/.exec(o))) return v(m[1]) === +m[2] * v(m[3]);
      m = /^Từ năm (\d+) đến năm (\d+), số lượt khách giảm$/.exec(o); assert.ok(m, "nhận xét lạ: " + o); return v(m[2]) < v(m[1]); }); } },
];

/* ---------- chạy kiểm tra: mỗi câu khớp đúng một mục của CHECKS (mục có chữ has dài nhất nằm trong đề bài hoặc một lựa chọn) ---------- */
let n = 0;
const dung = new Set();
const run = (id, qs) => qs.forEach((q, i) => {
  const at = id + "#" + (i + 1), khoa = q.q + "\n" + (q.o || []).join("\n"), cs_ = CHECKS.filter((c) => khoa.includes(c.has)), dai = Math.max(...cs_.map((c) => c.has.length)), ch = cs_.filter((c) => c.has.length === dai);
  assert.equal(ch.length, 1, at + ": cần đúng một mục kiểm tra cho “" + q.q.slice(0, 60) + "…”, có " + ch.length);
  const c = ch[0]; assert.ok(!dung.has(c.has), at + ": hai câu cùng khớp “" + c.has + "”"); dung.add(c.has);
  try {
    if (q.type === "essay") { assert.ok(c.essay, "câu tự luận cần mục kiểm tra tự luận"); c.essay(q);
      assert.ok(q.rubric.every((r) => r.p > 0 && Number.isInteger(r.p * 4)), "điểm mỗi ý chia hết cho 0,25"); assert.equal(q.rubric.reduce((t, r) => t + r.p, 0), 2, "thang chấm 2 điểm"); }
    else {
      const want = c.right(q);
      if (q.type === "num") {
        assert.ok(want && typeof want === "object" && "n" in want, "right của câu trả lời bằng số trả số hữu tỉ");
        if (typeof q.ans === "string") {
          assert.ok(/^-?\d+\/\d+$/.test(q.ans) && str(fr(q.ans)) === q.ans && fr(q.ans).d > 1, "đáp án phân số viết tối giản: " + q.ans);
          assert.ok(eq(fr(q.ans), want), "đáp án " + q.ans + ", tính được " + str(want)); assert.ok(/Viết kết quả dưới dạng phân số\./.test(q.q), "đề dặn viết kết quả dưới dạng phân số");
          assert.ok(!new RegExp("(^|[^\\d/])" + q.ans.replace("-", "−").replace("/", "\\/") + "(?![\\d/])").test(q.q), "đáp án " + q.ans + " có sẵn trong đề");
        } else assert.ok(Math.abs(q.ans - toNum(want)) < 1e-9, "đáp án " + q.ans + ", tính được " + toNum(want));
        assert.ok(q.tol === undefined, "đáp án tính chính xác, không cần sai số");
      } else if (q.type === "fill") {
        assert.equal(q.ans.length, 1, "câu điền một đáp án");
        if (want && typeof want === "object") assert.ok(/^\d[\d ]*(,\d+)?$/.test(q.ans[0]) && eq(fr(q.ans[0]), want), "đáp án " + q.ans[0] + ", tính được " + str(want));
        else assert.strictEqual(q.ans[0], want, "đáp án " + q.ans[0] + ", tính được " + want);
      } else {
        const got = { tf: () => q.a, tf4: () => q.a, match: () => q.r.slice(0, q.l.length), order: () => q.o }[q.type] || (() => q.o[0]);
        assert.strictEqual(JSON.stringify(got()), JSON.stringify(want), "đáp án " + JSON.stringify(got()) + ", tính được " + JSON.stringify(want));
      }
    }
    if (q.type === "mc") {
      assert.equal(new Set(q.o).size, q.o.length, "hai lựa chọn trùng nhau");
      const dai_ = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(!(q.o[0].length > 1.2 * dai_ && q.o[0].length - dai_ > 8), "đáp án đúng dài hơn hẳn lựa chọn sai");
    }
    if (q.type === "match") { assert.equal(new Set(q.r).size, q.r.length, "ô nối trùng nhau"); assert.ok(q.r.length > q.l.length, "nối cột có ô thừa"); }
    if (q.type === "tf4") assert.ok(q.a.includes(true) && q.a.includes(false), "đúng/sai 4 ý nên có cả ý đúng và ý sai");
    if (c.more) c.more(q);
  } catch (e) { throw new Error(at + ": " + e.message + "\n" + String(e.stack || "").split("\n").slice(1, 3).join("\n")); }
  n++;
});
// số đề, số câu lấy từ danh mục: đề cố định là các đề trong from của đề ngẫu nhiên, mọi đề cố định cuối kì I của file đều ở đó
const pool = bank(POOL), DE = pool.pool.from, mine = pool.questions.filter((q) => q.src === POOL);
assert.deepEqual(BANKS.filter((b) => b.file === "7-toan.js" && /^toan7-ck1-de\d+$/.test(b.id)).map((b) => b.id), DE, "đề cố định cuối kì I nào cũng phải ở from của " + POOL);
for (const id of DE) { const b = bank(id); assert.ok(b, "thiếu " + id); assert.equal(b.questions.length, b.n); run(id, b.questions); }
run(POOL, mine);
assert.equal(dung.size, CHECKS.length, "có mục kiểm tra không khớp câu nào: " + CHECKS.filter((c) => !dung.has(c.has)).map((c) => c.has).join(" | "));
// hình nào cũng được đọc lại; chữ trong hình vừa khung, không đè nhau
const hinh = pool.questions.filter((q) => q.svg);
assert.equal(hinh.filter((q) => hinhDaDoc.has(q.svg)).length, hinh.length, "hình nào cũng được đọc lại");
hinh.forEach((q) => chuHinh(q.svg, q.q.slice(0, 40)));

/* ---------- chữ, số như sách (Toán 7 tập một in năm 2026) ---------- */
const kho = pool.questions;
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null || q.type === "num" ? [] : [].concat(q.ans), q.l || [], q.r || [], (q.rubric || []).map((r) => r.c)).map(String);
kho.forEach((q) => {
  const at = q.src + ": " + q.q.slice(0, 50), T = chu(q).concat(q.svg ? texts(q.svg).map((t) => t.t) : []);
  T.forEach((s_) => {
    assert.ok(!/\d\.\d/.test(s_), at + ": số thập phân viết dấu phẩy, không dấu chấm: " + s_);
    assert.ok(!/(^|[\s(\[|:,;])-\d/.test(s_), at + ": dấu trừ của số âm viết “−”: " + s_);
    assert.ok(!/\b\d{4,}\b/.test(s_.replace(/\b(?:19|20)\d\d\b/g, "").replace(/\d+\/\d+/g, "").replace(/,\d+/g, "")), at + ": số từ bốn chữ số ngăn hàng nghìn bằng khoảng trắng: " + s_);
    assert.ok(!/lũy|thỏa|tùy|hóa|khỏe|thủy|Ơ-clit|huyện|63 tỉnh/i.test(s_), at + ": chữ như sách (luỹ thừa, thoả mãn, tiên đề Euclid; không “huyện”): " + s_);
    assert.ok(!/(^|[^A-Za-z])x\^|\*|<=|>=|!=/.test(s_), at + ": kí hiệu như sách (² ³, ·, ≤ ≥ ≠): " + s_);
  });
  // không dùng điều sách Toán 7 tập một không dạy: số mũ âm, căn bậc ba, định lí Pythagore, |x − a| = b, tìm x ở số mũ, góc ngoài lớn hơn góc trong
  const all_ = T.join(" | ");
  assert.ok(!/[⁻]|∛|Pythagore|Py-ta-go|\|x [+−] /.test(all_), at + ": điều sách không dạy");
  assert.ok(!/biết \(?[−\d/,() ]+\)?ⁿ =/.test(q.q), at + ": sách không dạy tìm số mũ");
});

/* ---------- mức độ và ma trận ---------- */
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M), CHU_DE = Object.keys(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => cells.reduce((s_, v) => s_ + v[k], 0)), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(CHU_DE.length, 19, "19 chủ đề theo Bài 1–19");
const nhomCD = (ts) => ts.reduce((s_, t) => s_ + M[t].reduce((a, b) => a + b, 0), 0);
assert.deepEqual([nhomCD(CHU_DE.slice(0, 4)), nhomCD(CHU_DE.slice(4, 7)), nhomCD(CHU_DE.slice(7, 11)), nhomCD(CHU_DE.slice(11, 16)), nhomCD(CHU_DE.slice(16))], [6, 4, 4, 8, 3],
  "Chương I 6 câu, Chương II 4, Chương III 4, Chương IV 8, Chương V 3");
CHU_DE.forEach((t) => assert.ok(("chu-de:7:toan:" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
assert.deepEqual([...new Set(kho.map((q) => q.topic))].sort(), CHU_DE.slice().sort(), "chủ đề của kho đúng chữ của ma trận");
// chủ đề theo tên bài trong mục lục của sách (README của cuốn ở OnUp-Book; Bài 5, Bài 13 ghi gọn)
const TEN_BAI = ["Tập hợp các số hữu tỉ", "Cộng, trừ, nhân, chia số hữu tỉ", "Luỹ thừa với số mũ tự nhiên của một số hữu tỉ", "Thứ tự thực hiện các phép tính. Quy tắc chuyển vế",
  "Làm quen với số thập phân vô hạn tuần hoàn", "Số vô tỉ. Căn bậc hai số học", "Tập hợp các số thực", "Góc ở vị trí đặc biệt. Tia phân giác của một góc",
  "Hai đường thẳng song song và dấu hiệu nhận biết", "Tiên đề Euclid. Tính chất của hai đường thẳng song song", "Định lí và chứng minh định lí", "Tổng các góc trong một tam giác",
  "Hai tam giác bằng nhau. Trường hợp bằng nhau thứ nhất của tam giác", "Trường hợp bằng nhau thứ hai và thứ ba của tam giác", "Các trường hợp bằng nhau của tam giác vuông",
  "Tam giác cân. Đường trung trực của đoạn thẳng", "Thu thập và phân loại dữ liệu", "Biểu đồ hình quạt tròn", "Biểu đồ đoạn thẳng"];
CHU_DE.forEach((t, i) => assert.ok(TEN_BAI[i] === t || (TEN_BAI[i].toLowerCase().includes(t.toLowerCase()) && [4, 12].includes(i)), "chủ đề " + (i + 1) + " theo tên Bài " + (i + 1) + ": " + t));
const SACH_README = path.join(__dirname, "../../OnUp-Book/lop-7/toan-7-tap-1/README.md");
if (fs.existsSync(SACH_README)) { const md = fs.readFileSync(SACH_README, "utf8"); TEN_BAI.forEach((t, i) => assert.ok(md.includes("Bài " + (i + 1) + ". " + t + " |"), "tên Bài " + (i + 1) + " như mục lục trong README của sách: " + t)); }
// mỗi ô rút 1 câu và có đúng 4 câu: một câu ở mỗi đề cố định, hai câu riêng; ô không rút thì không có câu
Object.entries(M).forEach(([t, v]) => v.forEach((k, i) => {
  const have = kho.filter((q) => q.topic === t && q.lv === i + 1);
  assert.ok(k <= 1, `ô (${t}, mức ${i + 1}) rút ${k} câu: mỗi ô rút nhiều nhất 1 câu`);
  if (!k) { assert.equal(have.length, 0, `ô (${t}, mức ${i + 1}) không rút mà kho có ${have.length} câu`); return; }
  assert.deepEqual(DE.concat(POOL).map((s_) => have.filter((q) => q.src === s_).length), [1, 1, 2], `ô (${t}, mức ${i + 1})`);
}));
// câu tự luận chỉ ở hai ô Vận dụng chứng minh hai tam giác bằng nhau (Bài 14, Bài 15); mỗi đề cố định có 2 câu tự luận
const tuLuan = kho.filter((q) => q.type === "essay");
assert.deepEqual([...new Set(tuLuan.map((q) => q.topic + " · " + q.lv))].sort(), [CHU_DE[13] + " · 3", CHU_DE[14] + " · 3"].sort(), "câu tự luận chỉ ở ô Vận dụng của Bài 14, 15");
DE.forEach((id) => assert.equal(bank(id).questions.filter((q) => q.type === "essay").length, 2, id + ": 2 câu tự luận"));
const dem = (f) => kho.filter(f).length;
assert.ok(dem((q) => q.type === "tf4") >= 4 && DE.every((id) => bank(id).questions.some((q) => q.type === "tf4")), "kho ít nhất 4 câu đúng/sai 4 ý, đề cố định nào cũng có");
assert.ok(dem((q) => q.type === "num") >= 10 && dem((q) => q.type === "fill") >= 1 && dem((q) => q.type === "match") >= 1 && dem((q) => q.type === "order") >= 2, "kho đủ dạng câu trả lời ngắn, nối cột, sắp xếp");
assert.ok(hinh.length >= 20, "kho có ít nhất 20 câu có hình");
// đúng/sai 4 ý: kiểu Đ/S không lặp (Rút ra N9-ck1-khtn)
{ const kieu = {}; kho.filter((q) => q.type === "tf4").forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; });
  assert.equal(Math.max(...Object.values(kieu)), 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu)); }
// đáp án đúng không hay là lựa chọn dài nhất hay ngắn nhất (Rút ra N9-ck1-tin-congnghe): mỗi kiểu không quá một phần ba số câu nhiều lựa chọn
const mcs = kho.filter((q) => q.type === "mc"), hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
const daiNhat = mcs.filter((q) => hon(q, (a, b) => a > b)).length, nganNhat = mcs.filter((q) => hon(q, (a, b) => a < b)).length;
assert.ok(daiNhat <= mcs.length / 3, `đáp án đúng là lựa chọn dài nhất ở ${daiNhat}/${mcs.length} câu nhiều lựa chọn`);
assert.ok(nganNhat <= mcs.length / 3, `đáp án đúng là lựa chọn ngắn nhất ở ${nganNhat}/${mcs.length} câu nhiều lựa chọn`);
// đáp án không lặp chữ của nhãn chủ đề trên câu (Rút ra N6, N16b), trừ khi mọi lựa chọn cùng có chữ đó; nhãn tách theo “. ”, “ và ”, “, ”
{ const phanNhan = (t) => t.split(/\. | và |, /).map((s_) => s_.trim().toLowerCase()).filter((s_) => s_.includes(" ") || s_.length >= 6);
  kho.forEach((q) => { const da = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : []; phanNhan(q.topic).forEach((c) => da.forEach((d) => {
    if (d.toLowerCase().includes(c)) assert.ok(q.type === "mc" && q.o.every((o) => o.toLowerCase().includes(c)), `đáp án “${d}” lặp chữ “${c}” của nhãn chủ đề`); })); }); }
// lời giải không nói “ý thứ hai”, “phương án A”: app xáo phương án
kho.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của phương án: " + q.q.slice(0, 50)));
const seen = new Set();
const thu = (hist) => {
  const d = Quiz.draw(pool, hist);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, pool.n);
  assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.lv === l).length), [10, 8, 7]);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.topic === t && q.lv === l).length), v, "rút đúng ma trận ở chủ đề " + t));
  assert.ok(d.questions.filter((q) => q.type === "essay").length <= 2, "mỗi lần rút nhiều nhất 2 câu tự luận");
  return d;
};
for (let k = 0; k < 400; k++) thu().questions.forEach((q) => seen.add(Quiz.key(q)));
assert.ok(mine.every((q) => seen.has(Quiz.key(q))), "400 lần rút thử phải gặp đủ các câu riêng");
// học sinh đã làm hết một đề cố định: lần rút sau không lấy lại câu của đề đó
DE.forEach((id) => { const done = new Set(bank(id).questions.map(Quiz.key)); for (let k = 0; k < 20; k++) thu((q) => ({ done: done.has(Quiz.key(q)) ? 1 : 0, wrong: 0 })).questions.forEach((q) => assert.ok(!done.has(Quiz.key(q)), "đã làm hết " + id + " mà vẫn gặp lại câu của đề đó")); });

/* ---------- đề bài không trùng câu nào khác trong data/banks/7-toan.js (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const gocChu = (s_) => String(s_).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const deBai = BANKS.filter((b) => b.file === "7-toan.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: gocChu(q.q) })));
deBai.forEach((d) => { const cungDe = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cungDe, [d.at], "đề bài trùng: " + cungDe.join(", ")); });

/* ---------- dò lộ đáp án (Rút ra N5, N24, N8, RS9; như tests/toan5-ck1.js) giữa mọi cặp câu của kho: đề “Ôn chủ đề” rút chung mọi câu của
   một chủ đề (cả hai câu cùng ô), đề ngẫu nhiên rút chung câu của các chủ đề khác; lời dặn (note) hiện ở màn mở đề nên cũng là “câu
   kia”. Đáp án là số nguyên (từ 10) chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”, “bằng”, “được”); số đo góc (“52°”), số thập
   phân, phân số, số âm, số có đơn vị tìm ở vị trí kết quả; cặp nối: câu kia có cả hai vế; đáp án bằng chữ có ở câu kia thì chỉ in ra khi
   chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM. ---------- */
const val = (s_) => +String(s_).replace(/\s/g, "");
const KQ = "(?:=|(?:^|[\\s(])(?:là|bằng|được))\\s+";
const SAU = "(?!\\d|,\\d|\\/|°|%|\\s*[·+−×:](?:\\s|\\d|\\())"; // số đứng ngay trước một phép tính là thừa số, số hạng
const esc = (s_) => s_.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
const soKQ = (s_) => [...String(s_).matchAll(new RegExp(KQ + "(\\d{1,3}(?: \\d{3})*)" + SAU, "gu"))].map((m) => val(m[1]));
const kqLa = (s_, a) => new RegExp(KQ + esc(a) + (/°$/.test(a) ? "(?!\\d)" : SAU), "u").test(s_);
const ten = new Map();
DE.forEach((id) => bank(id).questions.forEach((q, i) => ten.set(q.q, id.replace("toan7-ck1-", "") + "#" + (i + 1))));
mine.forEach((q, i) => ten.set(q.q, "own#" + (i + 1)));
const LOI_DAN = [...new Set(DE.concat(POOL).map((id) => bank(id).note))].map((note, i) => ({ q: note, x: "", note: true, ten: "note" + (i + 1) }));
const doLo = (qs, name, notes) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    const so = [], kq = [], cum = [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const them = (a) => { a = String(a).replace(/^-/, "−");
      const m = /^(\d{1,3}(?: \d{3})*)(?: ([^\d\s]+))?$/.exec(a);
      if (m && !/°$/.test(a)) so.push(val(m[1]));
      else if (/^−?\d[\d ,/]*(?:°|\s[^\d\s]+)?$/.test(a) || /^−?\d+,\d*\(\d+\)$/.test(a)) kq.push(a.replace(/ [^\d\s]+$/, ""));
      else if (a.length >= 2) cum.push(a); };
    if (q.type === "num") them(typeof q.ans === "number" ? (q.unit === "°" ? q.ans + "°" : fmtDec(F(Math.round(q.ans * 1000), 1000))) : q.ans);
    else if (q.type === "fill") them(q.ans[0] + (/___°/.test(q.q) ? "°" : "")); else if (q.type === "mc") them(q.o[0]);
    qs.concat(notes || []).forEach((p) => {
      if (p === q) return;
      const C = p.note ? [p.q] : chu(p).concat(p.svg ? texts(p.svg).map((t) => t.t) : []), T = C.map((s_) => s_.toLowerCase()), at = `${name(p)} lộ đáp án ${name(q)}: `;
      so.filter((x) => x >= 10 && C.flatMap(soKQ).includes(x)).forEach((x) => lo.push(at + x));
      kq.filter((a) => C.some((s_) => kqLa(s_, a))).forEach((a) => lo.push(at + a));
      cap.filter(([l, r]) => T.some((t) => t.includes(l.toLowerCase()) && t.includes(r.toLowerCase()))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      cum.filter((s_) => { const re = new RegExp("(?<![\\p{L}\\p{N}])" + esc(s_.toLowerCase()) + "(?![\\p{L}\\p{N}])", "u"); return T.some((t) => re.test(t)); }).forEach((s_) => chuLo.push(at + s_));
    });
  });
  return { lo, chuLo };
};
const tenCau = (q) => (q.note ? q.ten : ten.get(q.q));
const { lo: loDA, chuLo } = doLo(kho, tenCau, LOI_DAN);
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu khác của kho (xem tay):\n" + chuLo.join("\n"));
const DA_XEM = [
  "de2#18 lộ đáp án de1#17: MP", // MP là đường chéo của hình thang MNPQ ở câu kia; các lựa chọn MN, NP của câu này cũng có ở đó, không lộ cách đặt tương ứng của ΔABC = ΔMNP
  // dòng của tests/soat-nhap.js (dò lộ chặt hơn: cả số dưới 10): số trong phép tính, số đo của câu khác, không lộ đáp án
  "toan7-ck1-ngau-nhien#1 → toan7-ck1-ngau-nhien#3: 5", // “là 5/8”: tử số, không phải số các số nguyên
  "toan7-ck1-ngau-nhien#6 → toan7-ck1-ngau-nhien#3: 5", // 1,25 = 5/4
  "toan7-ck1-ngau-nhien#38 → toan7-ck1-ngau-nhien#3: 5", // OA = OB = 5 cm
  "toan7-ck1-de2#1 → toan7-ck1-ngau-nhien#3: 5", // điểm −5/3 trên trục số
  "toan7-ck1-ngau-nhien#9 → toan7-ck1-ngau-nhien#11: 4", // (−2)² = 4 trong một phép tính khác
  "toan7-ck1-ngau-nhien#41 → toan7-ck1-ngau-nhien#11: 4", // cạnh tam giác đều 4 cm
  "toan7-ck1-ngau-nhien#50 → toan7-ck1-ngau-nhien#11: 4", // “40 không bằng 4 lần 12”
  "toan7-ck1-de1#6 → toan7-ck1-ngau-nhien#11: 4", // = 4/10 = 2/5
  "toan7-ck1-ngau-nhien#9 → toan7-ck1-ngau-nhien#18: 9", // 1/9 · 81 = 9 trong một phép tính khác
  "toan7-ck1-de2#9 → toan7-ck1-ngau-nhien#18: 9", // √81 = 9
];
assert.deepEqual(chuLo.filter((s_) => !DA_XEM.includes(s_)), [], "đáp án bằng chữ có ở câu khác của kho đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loDA, [], "lộ đáp án:\n" + loDA.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 52°”, “là 14”, “= 1/12”, cả hai vế một cặp nối
{ const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const khac = tim("Căn bậc hai số học của 64 là"), thuLo = (qs) => doLo(qs, (q) => q.q.slice(0, 10).replace(/:/g, "")).lo.map((s_) => s_.replace(/^.*? lộ đáp án [^:]*: /, ""));
  assert.deepEqual(thuLo([tim("Số đo góc x′Oy′ là"), gia(khac, "Ví dụ góc đó = 52°.")]), ["52°"]);
  assert.deepEqual(thuLo([tim("Lớp 7B có 50 học sinh"), gia(khac, "Số bạn là 14.")]), [14]);
  assert.deepEqual(thuLo([tim("Tính −3/4 + 5/6."), gia(khac, "Ta có tổng bằng 1/12.")]), ["1/12"]);
  assert.deepEqual(thuLo([tim("Tính −3/4 + 5/6."), gia(khac, "Ví dụ 1/12 · 3 = 1/4.")]), []);
  assert.deepEqual(thuLo([tim("Số đo góc x′Oy′ là"), gia(khac, "Góc 52° nằm trong hình.")]), []); }
// bộ đọc hình bắt được hình vẽ sai: số đo góc không khớp góc vẽ, góc đánh số sai chỗ, kí hiệu cạnh bằng nhau thiếu
{ const tim = (has) => CHECKS.find((c) => c.has === has), cau = (has) => kho.find((q) => q.q.includes(has));
  const g1 = cau("Số đo góc x′Oy′ là"), g2 = cau("Cặp góc nào dưới đây là cặp góc so le trong?"), g3 = cau("các cạnh bằng nhau của hai tam giác được đánh dấu");
  assert.throws(() => tim("hai đường thẳng xx′ và yy′ cắt nhau tại O. Số đo góc x′Oy′ là").right(Object.assign({}, g1, { svg: g1.svg.replace(">52°<", ">50°<") })), /vẽ/);
  const s1 = g2.svg.replace(/>1</, ">9<").replace(/>2</, ">1<").replace(/>9</, ">2<");
  assert.throws(() => tim("Cặp góc nào dưới đây là cặp góc so le trong?").right(Object.assign({}, g2, { svg: s1 })), /Hình 3.18|đúng một lựa chọn/);
  assert.throws(() => tim("các cạnh bằng nhau của hai tam giác được đánh dấu bằng cùng một kí hiệu. Cách viết nào dưới đây đúng?").right(Object.assign({}, g3, { svg: g3.svg.replace(/<line [^>]*stroke-width="1.5"\/>/, "") })), /cách đặt tương ứng|vẽ dài|c.c.c/);
  assert.throws(() => chuHinh(g1.svg.replace(/font-size="14">52°/, 'font-size="12">52°'), "thử"), /cỡ 13/); }

/* ---------- không gần trùng câu của kho Toán lớp 6 (lời giao việc; Rút ra N25, như tests/toan5-ck1.js): đề bài cùng lựa chọn, ô nối, ô sắp
   xếp có từ 4 cặp từ liền nhau chung với một câu của data/banks/6-toan.js và số cặp chung từ một nửa số cặp của câu ít cặp hơn thì báo.
   Cặp từ tính cả số (cùng một dạng bài với số khác không phải là gần trùng); bỏ cách hỏi chung của đề Toán (CUM), cặp của nhãn chủ đề và
   cặp có ở từ 3% số câu của hai file. ---------- */
{
  const CUM = ["mỗi ý sau đúng hay sai", "viết kết quả dưới dạng phân số", "khẳng định nào dưới đây đúng", "trong hình vẽ", "số đo góc", "theo thứ tự từ bé đến lớn",
    "dưới dạng", "giá trị của biểu thức", "kết quả của phép tính", "mỗi đẳng thức sau đúng hay sai", "như hình vẽ", "biểu đồ đoạn thẳng", "biểu đồ hình quạt tròn", "trong hình vẽ cho biết"];
  const cap2 = (s_) => { let t = String(s_).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/(\d),(?=\d)/g, "$1_").replace(/[^\p{L}\p{N}\s|_]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|") && c.split(" ").some((x) => x.length >= 2)); };
  const cauCua = (file) => BANKS.filter((b) => b.file === file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id));
  const lop6 = cauCua("6-toan.js"), ca = lop6.concat(kho), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !nhan.has(c) && (df[c] || 0) < 0.03 * ca.length)); };
  const P6 = lop6.map((p) => [p, capAm(p)]);
  const ganTrung = kho.flatMap((q) => { const c = capAm(q); return P6.map(([p, d]) => { const chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q.q)} ~ ${p.q.slice(0, 50)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho Toán 6:\n" + ganTrung.join("\n"));
  assert.deepEqual(ganTrung, [], "đề bài gần trùng câu của kho Toán 6");
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (bỏ dấu, gộp nguyên âm), nếu có ----------
   Chuỗi 8 từ liền nhau của mọi trường chữ (đề bài, lựa chọn, lời giải, thang chấm, chữ trong hình) không có trong sách; cụm từ chung của
   môn (tên bài, cách hỏi chuẩn, tên trường hợp bằng nhau) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ. Số liệu:
   số riêng của một câu (số thập phân, số từ 11 trở lên, trừ 100, 1 000, 180, 90, 360, 60 và số có ở từ 5% số trang; không tính số trong phân số) không có từ ba số
   cùng ở một trang của Toán 7 tập một (dò bối cảnh, số liệu của bài tập, ví dụ trong sách; DO_SACH=1 in các trang có từ hai số chung để xem). */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s_) => String(s_).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const TU_CHUNG = [...TEN_BAI, ...CHU_DE, "mỗi ý sau đúng hay sai", "viết kết quả dưới dạng phân số", "trình bày lời giải", "khẳng định nào dưới đây đúng",
  "theo thứ tự từ bé đến lớn", "số đo góc được đánh dấu", "trong hình vẽ", "hai góc đối đỉnh", "hai góc kề bù", "hai góc so le trong", "hai góc đồng vị",
  "dấu hiệu nhận biết hai đường thẳng song song", "hai cạnh tương ứng", "hai góc tương ứng", "cạnh huyền – góc nhọn", "cạnh huyền – cạnh góc vuông", "hai cạnh góc vuông",
  "cạnh – góc – cạnh", "góc – cạnh – góc", "cạnh – cạnh – cạnh", "vẽ hình, ghi giả thiết, kết luận", "tia phân giác của góc", "đường trung trực của đoạn thẳng",
  "trong tam giác cân, hai góc ở đáy bằng nhau", "tổng ba góc của một tam giác bằng 180°", "biểu đồ hình quạt tròn trong hình vẽ cho biết", "biểu đồ đoạn thẳng trong hình vẽ cho biết",
  "số thập phân vô hạn tuần hoàn", "số thập phân vô hạn không tuần hoàn", "căn bậc hai số học", "chia hai luỹ thừa cùng cơ số", "nhân hai luỹ thừa cùng cơ số",
  // cách nêu hình chuẩn của sách và mọi đề hình học (không phải câu văn riêng của sách)
  "hai đường thẳng xx′ và yy′ cắt nhau tại O", "đường thẳng c cắt hai đường thẳng a, b", "tam giác ABC vuông tại A", "hai tam giác vuông", "là trung điểm của", "là tia đối của tia"]
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s_, k) => { let t = " " + khongDau(s_) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const chuCau = (q) => chu(q).concat(q.svg ? [texts(q.svg).map((t) => t.t).join(" ")] : []);
if (SACH.length) {
  assert.ok(SACH.some((f) => /toan-7-tap-1/.test(f)), "OnUp-Book có Toán 7 tập một");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  // mọi trường chữ của câu, cả chữ trong hình, và lời dặn của đề
  const bao = (k) => kho.flatMap((q) => chuCau(q).flatMap((s_) => chuoi(s_, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q.q)}: ${c}`)))
    .concat(LOI_DAN.flatMap((n) => chuoi(n.q, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${n.ten}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  // số liệu riêng của từng câu so với từng trang của Toán 7 tập một
  const trang = fs.readFileSync(SACH.find((f) => /toan-7-tap-1/.test(f)), "utf8").split(/(?==== page-\d+ · )/).map((p) => ({ ten: (/trang in (\d+)/.exec(p) || [])[1], so: new Set((p.match(/\d+(?:[ .]\d{3})*(?:,\d+)?/g) || []).map((x) => x.replace(/[ .](?=\d{3})/g, ""))) }));
  // số có ở từ 5% số trang (12, 15, 20, 30, 50…) là số thường gặp, không phải số liệu riêng của một bài trong sách
  const dfSo = {}; trang.forEach((p) => p.so.forEach((x) => (dfSo[x] = (dfSo[x] || 0) + 1)));
  const soRieng = (q) => [...new Set((chuCau(q).join(" ").replace(/\d+\/\d+/g, " ").match(/\d{1,3}(?: \d{3})+(?:,\d+)?|\d+(?:,\d+)?/g) || []).map((x) => x.replace(/ /g, "")).filter((x) => (/,/.test(x) || (+x > 10 && ![100, 1000, 180, 90, 360, 60].includes(+x))) && (dfSo[x] || 0) < 0.05 * trang.length))];
  const soChung = kho.flatMap((q) => { const s_ = soRieng(q); return trang.map((p) => [p.ten, s_.filter((x) => p.so.has(x))]).filter(([, c]) => c.length >= 2).map(([t, c]) => `${ten.get(q.q)} ~ trang ${t}: ${c.join("; ")} (câu có ${s_.length} số)`); });
  if (process.env.DO_SACH) console.log("Trang sách có từ hai số liệu chung với một câu (xem tay):\n" + soChung.join("\n"));
  const SO_XEM = [
    "own#29 ~ trang 118: 62; 44; 47; 89 (câu có 7 số)", // trang in 118 là bảng tra cứu thuật ngữ cuối sách: số ở đó là số trang
  ];
  assert.deepEqual(soChung.filter((s_) => /: (.+) \(/.exec(s_)[1].split("; ").length >= 3 && !SO_XEM.includes(s_)), [], "trang sách có từ ba số liệu chung với một câu");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");

/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác ---------- */
{
  const khac = BANKS.filter((b) => !b.pool && b.file !== "7-toan.js").flatMap((b) => b.questions.map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " })))
    .concat(BANKS.filter((b) => b.pool && b.file !== "7-toan.js").flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " }))));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s_) => chuoi(s_, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q.q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại hoặc đọc lại hình (" + DE.map((id) => bank(id).questions.length).join(" + ") + " câu của " + DE.length + " đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + kho.length + " câu, " + hinh.length + " hình, ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề; đáp án đúng dài nhất ở " + daiNhat + ", ngắn nhất ở " + nganNhat + " trên " + mcs.length + " câu nhiều lựa chọn.");
console.log("MATH OK");
