// Tính lại đáp án ngân hàng Toán 8 cuối kì I (data/banks/8-toan.js): hai đề cố định toan8-ck1-de1, toan8-ck1-de2 và các câu riêng
// của đề ngẫu nhiên toan8-ck1-ngau-nhien (Phiên N8-ck1-toan; Toán 8 tập một, Bài 1–20). Mỗi câu khớp đúng một mục của CHECKS (chữ has
// nằm trong đề bài hoặc một lựa chọn) rồi so đáp án với kết quả tính bằng code: trắc nghiệm o[0], điền khuyết ans[0], đúng/sai 4 ý a (từng ý
// tính lại), trả lời bằng số ans, nối cột r của từng ô l, sắp xếp o; tự luận: mọi đẳng thức trong thang chấm và đáp án gợi ý tính lại,
// điều phải chứng minh thử bằng số trên nhiều hình ngẫu nhiên.
// Đa thức nhiều biến tính chính xác (hệ số hữu tỉ): đọc biểu thức viết như sách (x², 3x²y, 2x(x + 1), (x − 1)(x + 2), “·”, chia cho
// đơn thức “: 4x²y”), thu gọn, bậc, hệ số, giá trị tại một điểm, cộng, trừ, nhân, chia đa thức cho đơn thức (chỉ khi chia hết), so hai
// biểu thức bằng nhau (hằng đẳng thức, phân tích thành nhân tử nhân lại bằng đa thức đề cho); đơn thức, đơn thức thu gọn, đồng dạng đọc
// theo cách viết. Câu có hình: đọc toạ độ trong hình (điểm có nhãn, đoạn thẳng, số đo góc ghi trong góc có cung, dấu “?”, độ dài ghi cạnh
// đoạn thẳng, kí hiệu góc vuông, vạch đánh dấu đoạn thẳng bằng nhau, mũi tên đánh dấu hai đoạn thẳng song song), kiểm tra hình đúng tỉ lệ
// (góc vẽ bằng số đo ghi, độ dài ghi tỉ lệ với độ dài vẽ, hình là tứ giác, hình thang cân, hình bình hành, hình chữ nhật, hình thoi đúng
// như đề; đường song song, trung điểm, tia phân giác vẽ đúng) rồi mới tính: góc của tứ giác, tỉ số Thalès, đường trung bình, tính chất
// đường phân giác; biểu đồ cột, cột kép, đoạn thẳng, hình quạt tròn đọc lại từ hình (số ở đỉnh cột, điểm khớp trục; góc ở tâm khớp số
// phần trăm). Rồi kiểm tra như script Toán 7 cuối kì I: ma trận (mỗi ô rút 1 câu và có 4 câu: một câu ở mỗi đề cố định, hai câu riêng;
// rút thử ra đúng 10 Biết, 8 Hiểu, 7 Vận dụng; đã làm hết một đề cố định thì không gặp lại câu của đề đó), câu tự luận chỉ ở hai ô Vận
// dụng (phân tích đa thức thành nhân tử, chứng minh tứ giác là hình bình hành), đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn
// dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn, không lặp chữ của nhãn chủ đề, đúng/sai 4 ý không lặp kiểu Đ/S,
// đề bài không trùng câu nào trong data/banks/8-toan.js, không gần trùng câu của data/banks/7-toan.js, 9-toan.js (cặp từ liền nhau chung),
// dò lộ đáp án giữa mọi cặp câu của kho và lời dặn (Rút ra N5, N24, N8, RS9) và, nếu có ../OnUp-Book, so mọi trường chữ, cả chữ trong
// hình và lời dặn, với chữ OCR của mọi cuốn (không chuỗi 8 từ nào trùng), so số liệu của từng câu với từng trang Toán 8 tập một (không
// trang nào có từ ba số hiếm của một câu), so với câu của mọi kho khác (không chuỗi 8 từ nào trùng). Số đề, số câu lấy từ danh mục.
// DA_XEM ghi cả dòng dò lộ của tests/soat-nhap.js đã xem tay (số nhỏ trùng ngẫu nhiên). Mô tả script: tests/README.md, mục 3, “Lớp 8”.
// Chạy: node tests/toan8-ck1.js → in MATH OK. DO_LO=1 in đáp án bằng chữ có ở câu khác; DO_SACH=1 in chuỗi 6 từ trùng sách và các
// trang có số liệu chung; DO_KHO=1 in chuỗi 6 từ trùng kho khác, câu gần trùng kho Toán 7, Toán 9 (để người làm xem).
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan8-ck1-ngau-nhien";

/* ---------- số: hữu tỉ chính xác { n, d } (d > 0, tối giản) ---------- */
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const F = (n, d) => { d = d === undefined ? 1 : d; assert.ok(Number.isInteger(n) && Number.isInteger(d) && d !== 0, `phân số lạ ${n}/${d}`); if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return { n: n / g, d: d / g }; };
const isR = (v) => typeof v === "object";
const toNum = (v) => (isR(v) ? v.n / v.d : v);
const add = (a, b) => F(a.n * b.d + b.n * a.d, a.d * b.d);
const neg = (a) => F(-a.n, a.d);
const sub = (a, b) => add(a, neg(b));
const mul = (a, b) => F(a.n * b.n, a.d * b.d);
const div = (a, b) => { assert.ok(b.n !== 0, "chia cho 0"); return F(a.n * b.d, a.d * b.n); };
const pw = (a, k) => { assert.ok(Number.isInteger(k) && k >= 0, "số mũ lạ " + k); let v = F(1); for (let i = 0; i < k; i++) v = mul(v, a); return v; };
const cmp = (a, b) => Math.sign(a.n * b.d - b.n * a.d);
const eq = (a, b) => cmp(a, b) === 0;
const isInt = (a) => isR(a) && a.d === 1;
const thou = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
// đọc một số viết như trong đề: "−3/7", "3", "1 800", "2,35", "−0,27"
const fr = (s) => {
  s = String(s).trim().replace(/[−–]/g, "-").replace(/\s+/g, " ");
  let m = /^(-?\d+)\/(-?\d+)$/.exec(s);
  if (m) return F(+m[1], +m[2]);
  m = /^(-?)(\d{1,3}(?: \d{3})+|\d+)(?:,(\d+))?$/.exec(s);
  if (m) { const ip = m[2].replace(/ /g, ""), fp = m[3] || ""; const v = F(+(ip + fp), 10 ** fp.length); return m[1] ? neg(v) : v; }
  throw new Error("không đọc được số: " + s);
};
const str = (a) => (a.d === 1 ? String(a.n) : a.n + "/" + a.d);
// số thập phân viết kiểu Việt Nam ("−2,35", "2 695,5")
const fmtDec = (a) => {
  let e = 0, d = a.d; while (d % 2 === 0) { d /= 2; e++; } let e5 = 0; while (d % 5 === 0) { d /= 5; e5++; }
  assert.equal(d, 1, "không viết được thành số thập phân hữu hạn: " + a.n + "/" + a.d);
  const places = Math.max(e, e5), s = String(Math.abs(a.n) * (10 ** places / a.d)).padStart(places + 1, "0");
  return (a.n < 0 ? "−" : "") + thou(s.slice(0, s.length - places)) + (places ? "," + s.slice(s.length - places) : "");
};

/* ---------- đa thức nhiều biến, hệ số hữu tỉ chính xác ----------
   Đa thức: Map khoá đơn thức ("x2.y1", biến xếp theo bảng chữ cái; "" là hằng số) → hệ số {n, d}, chỉ giữ hệ số khác 0 (luôn ở dạng thu
   gọn). P(chữ) đọc biểu thức viết như sách: số (dấu phẩy thập phân, số ngăn hàng nghìn), biến là một chữ cái thường, luỹ thừa bằng chữ số
   mũ (x², (x + 1)³), nhân viết liền (3x²y, 2x(x + 1), (x − 1)(x + 2)) hay bằng “·”, chia cho đơn thức bằng “:” (số chia là cả đơn thức viết
   liền: “: 4x²y”; phải chia hết), phân số giữa hai số ((1/2)x). Nhân viết liền gắn chặt hơn “·” và “:”, như cách đọc của sách. */
const SUP = { "⁰": 0, "¹": 1, "²": 2, "³": 3, "⁴": 4, "⁵": 5, "⁶": 6, "⁷": 7, "⁸": 8, "⁹": 9 };
const khoaDon = (m) => Object.keys(m).filter((v) => m[v]).sort().map((v) => v + m[v]).join(".");
const moKhoa = (k) => (k ? Object.fromEntries(k.split(".").map((t) => [t[0], +t.slice(1)])) : {});
const dt = (entries) => { const p = new Map(); for (const [k, c] of entries) { const v = p.has(k) ? add(p.get(k), c) : c; if (v.n) p.set(k, v); else p.delete(k); } return p; };
const hang = (c) => dt([["", c]]);
const pAdd = (a, b) => dt([...a, ...b]);
const pNeg = (a) => dt([...a].map(([k, c]) => [k, neg(c)]));
const pSub = (a, b) => pAdd(a, pNeg(b));
const nhanDon = (k1, k2) => { const m = moKhoa(k1), n = moKhoa(k2); for (const v in n) m[v] = (m[v] || 0) + n[v]; return khoaDon(m); };
const pMul = (a, b) => { const out = []; for (const [k1, c1] of a) for (const [k2, c2] of b) out.push([nhanDon(k1, k2), mul(c1, c2)]); return dt(out); };
const pPow = (a, k) => { assert.ok(Number.isInteger(k) && k >= 0, "số mũ lạ"); let v = hang(F(1)); for (let i = 0; i < k; i++) v = pMul(v, a); return v; };
const laDon = (a) => a.size === 1;
// đơn thức A (khoá k1) chia hết cho đơn thức B (khoá k2): mỗi biến của B là biến của A với số mũ không lớn hơn số mũ của nó trong A
const chiaHetDon = (k1, k2) => { const m = moKhoa(k1), n = moKhoa(k2); return Object.keys(n).every((v) => (m[v] || 0) >= n[v]); };
const pDivMono = (a, b) => {
  assert.ok(laDon(b), "chỉ chia đa thức cho đơn thức"); const [[kb, cb]] = [...b];
  return dt([...a].map(([k, c]) => { assert.ok(chiaHetDon(k, kb), "hạng tử không chia hết cho đơn thức"); const m = moKhoa(k), n = moKhoa(kb); for (const v in n) m[v] -= n[v]; return [khoaDon(m), div(c, cb)]; }));
};
const pEq = (a, b) => pSub(a, b).size === 0;
const bacDon = (k) => Object.values(moKhoa(k)).reduce((s, e) => s + e, 0);
const bac = (a) => { assert.ok(a.size > 0, "đa thức 0 không có bậc"); return Math.max(...[...a.keys()].map(bacDon)); };
const heSo = (a, k) => a.get(k) || F(0);
const giaTri = (a, vars) => { let s = F(0); for (const [k, c] of a) { let t = c; const m = moKhoa(k); for (const v in m) { assert.ok(vars[v] !== undefined, "thiếu giá trị của biến " + v); t = mul(t, pw(vars[v], m[v])); } s = add(s, t); } return s; };
function P(src) {
  const s = String(src).replace(/[−–]/g, "-").replace(/×/g, "·").replace(/ /g, " ");
  const toks = []; let i = 0;
  while (i < s.length) {
    const c = s[i], rest = s.slice(i);
    if (c === " ") { i++; continue; }
    let m = /^\d{1,3}(?: \d{3})+(?:,\d+)?(?!\d)/.exec(rest) || /^\d+(?:,\d+)?/.exec(rest);
    if (m) { toks.push({ t: "n", v: fr(m[0]) }); i += m[0].length; continue; }
    m = /^[⁰¹²³⁴⁵⁶⁷⁸⁹]+/.exec(rest);
    if (m) { toks.push({ t: "^", k: +[...m[0]].map((x) => SUP[x]).join("") }); i += m[0].length; continue; }
    if ("+-·:/()".includes(c)) { toks.push({ t: c }); i++; continue; }
    if (/[a-z]/.test(c)) { toks.push({ t: "v", v: c }); i++; continue; }
    throw new Error("kí tự lạ “" + c + "” trong " + src);
  }
  let p = 0;
  const peek = () => toks[p], next = () => toks[p++];
  const laAtom = (t) => t && (t.t === "n" || t.t === "v" || t.t === "(");
  const atom = () => {
    const t = next(); assert.ok(t, "thiếu số hạng trong " + src); let v;
    if (t.t === "n") v = hang(t.v);
    else if (t.t === "v") v = dt([[t.v + "1", F(1)]]);
    else if (t.t === "(") { v = expr(); assert.equal((next() || {}).t, ")", "thiếu ngoặc đóng trong " + src); }
    else throw new Error("không hiểu " + src);
    while (peek() && peek().t === "^") v = pPow(v, next().k);
    return v;
  };
  const lien = () => {
    let v = atom();
    for (;;) {
      const t = peek();
      if (t && t.t === "/") { next(); const w = atom(); assert.ok(laDon(v) && v.has("") && laDon(w) && w.has(""), "dấu / chỉ dùng giữa hai số: " + src); v = hang(div(v.get(""), w.get(""))); }
      else if (laAtom(t)) v = pMul(v, atom());
      else return v;
    }
  };
  const unary = () => { const t = peek(); if (t && t.t === "-") { next(); return pNeg(unary()); } if (t && t.t === "+") { next(); return unary(); } return lien(); };
  const term = () => { let v = unary(); while (peek() && (peek().t === "·" || peek().t === ":")) { const op = next().t, w = unary(); v = op === "·" ? pMul(v, w) : pDivMono(v, w); } return v; };
  const expr = () => { let v = term(); while (peek() && (peek().t === "+" || peek().t === "-")) { const op = next().t, w = term(); v = op === "+" ? pAdd(v, w) : pSub(v, w); } return v; };
  const v = expr();
  assert.equal(p, toks.length, "thừa kí tự trong " + src);
  return v;
}
// giá trị số của biểu thức không có biến ("86² − 14²", "40 · 10")
const so = (s) => { const p = P(s); assert.ok(p.size === 0 || (p.size === 1 && p.has("")), "biểu thức còn biến: " + s); return p.get("") || F(0); };
// một chuỗi có phải là đơn thức (viết như sách): một số, một biến hay tích các số và biến; không có phép cộng, phép trừ, chia cho biến
const laDonThuc = (s) => { const t = String(s).replace(/\s/g, "").replace(/^[−-]/, ""); return t !== "" && /^(\d+(,\d+)?|\(\d+\/\d+\))?([a-z][⁰¹²³⁴⁵⁶⁷⁸⁹]*)*(·[−-]?(\d+(,\d+)?|\(\d+\/\d+\)|\([−-]\d+(,\d+)?\))?([a-z][⁰¹²³⁴⁵⁶⁷⁸⁹]*)*)*$/.test(t); };
// đơn thức thu gọn: (dấu, hệ số) rồi mỗi biến xuất hiện một lần
const thuGon = (s) => { const t = String(s).replace(/\s/g, "").replace(/^[−-]/, ""); const m = /^(\d+(,\d+)?|\(\d+\/\d+\))?((?:[a-z][⁰¹²³⁴⁵⁶⁷⁸⁹]*)*)$/.exec(t); if (!m || t === "") return false; const vs = m[3].match(/[a-z]/g) || []; return new Set(vs).size === vs.length; };
// phần biến của một đơn thức (khoá) và đồng dạng: hệ số khác 0, cùng phần biến
const phanBien = (s) => { const p = P(s); assert.ok(laDon(p), "không phải đơn thức: " + s); return [...p.keys()][0]; };
const dongDang = (a, b) => phanBien(a) === phanBien(b);

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
// độ dài ghi trong hình (“6 cm”, “4,5 cm”, chữ thường cỡ 14): gắn với đoạn thẳng có vẽ (giữa hai điểm có nhãn) có trung điểm gần chữ
// nhất; trả về [{ P, Q, v, px, t }]. Các độ dài ghi trong một hình tỉ lệ với độ dài vẽ (sai lệch dưới 1 %).
const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
const doDai = (svg, H, ten) => {
  const ds = Object.keys(H.o).filter((k) => /^[A-Z]/.test(k)), cap = [];
  ds.forEach((P_, i) => ds.slice(i + 1).forEach((Q) => { if (H.coNet(H.o[P_], H.o[Q])) cap.push([P_, Q]); }));
  const out = H.T.filter((t) => !t.b && /^\d+(?:,\d+)? (?:cm|m|dm)$/.test(t.t)).map((t) => {
    const c = tamChu(t), k = cap.slice().sort((u, v) => dist(c, mid(H.o[u[0]], H.o[u[1]])) - dist(c, mid(H.o[v[0]], H.o[v[1]])))[0];
    assert.ok(k && dist(c, mid(H.o[k[0]], H.o[k[1]])) < 40, ten + ": độ dài " + t.t + " không đứng cạnh đoạn thẳng nào");
    return { P: k[0], Q: k[1], v: toNum(fr(t.t.replace(/ \D+$/, ""))), px: dist(H.o[k[0]], H.o[k[1]]), t: t.t };
  });
  if (out.length) { const k = out[0].px / out[0].v; out.forEach((d) => assert.ok(Math.abs(d.px / d.v - k) <= 0.01 * k, `${ten}: ${d.P}${d.Q} = ${d.t} không đúng tỉ lệ (vẽ ${d.px.toFixed(1)}, cần ${(d.v * k).toFixed(1)})`)); }
  return out;
};
const daiGhi = (D, ten) => (s) => { const d = D.find((x) => [x.P + x.Q, x.Q + x.P].includes(s)); assert.ok(d, ten + ": hình không ghi độ dài " + s); return d.v; };
// mũi tên đánh dấu song song trên đoạn PQ (polyline ba điểm, điểm giữa nằm trên đoạn)
const coMui = (svg, P_, Q) => polylines(svg).filter((p) => p.p.length === 6).some((p) => dDoan([p.p[2], p.p[3]], P_, Q) < 1.5);
const songSongDoan = (A, B, C, D) => Math.abs(cross(subv(B, A), subv(D, C))) <= 2e-3 * dist(A, B) * dist(C, D);
// hai đoạn thẳng AB, CD song song: vẽ song song và có mũi tên trên cả hai đoạn
const ssKH = (svg, H, s1, s2, ten) => { const [A, B] = H.tachTen(s1), [C, D] = H.tachTen(s2); assert.ok(songSongDoan(H.o[A], H.o[B], H.o[C], H.o[D]), ten + ": " + s1 + " không song song với " + s2); assert.ok(coMui(svg, H.o[A], H.o[B]) && coMui(svg, H.o[C], H.o[D]), ten + ": thiếu kí hiệu song song trên " + s1 + ", " + s2); };
const doanH = (H, s) => { const [A, B] = H.tachTen(s); assert.ok(H.o[A] && H.o[B] && H.coNet(H.o[A], H.o[B]), "hình không có đoạn " + s); return dist(H.o[A], H.o[B]); };
const bangNhau = (x, y) => Math.abs(x - y) <= 0.005 * Math.max(x, y);
// điểm M nằm trên đoạn AB (cách đoạn dưới 0,8 px) và là trung điểm của AB
const tren = (H, M, s) => { const [A, B] = H.tachTen(s); return dDoan(H.o[M], H.o[A], H.o[B]) < 0.8; };
const trungDiem = (H, M, s) => { const [A, B] = H.tachTen(s); return tren(H, M, s) && bangNhau(dist(H.o[A], H.o[M]), dist(H.o[M], H.o[B])); };
// tứ giác ABCD vẽ trong hình (bốn cạnh có nét), lồi; loại: tính từ toạ độ
function tuGiac(H, s, ten) {
  const v = H.tachTen(s), X = v.map((k) => H.o[k]);
  v.forEach((k, i) => assert.ok(H.coNet(X[i], X[(i + 1) % 4]), ten + ": thiếu cạnh " + k + v[(i + 1) % 4]));
  const z = X.map((p, i) => cross(subv(X[(i + 1) % 4], p), subv(X[(i + 2) % 4], X[(i + 1) % 4])));
  assert.ok(z.every((t) => t > 0) || z.every((t) => t < 0), ten + ": tứ giác " + s + " phải là tứ giác lồi");
  const canh = X.map((p, i) => dist(p, X[(i + 1) % 4])), goc4 = X.map((p, i) => goc(p, X[(i + 3) % 4], X[(i + 1) % 4]));
  const ss1 = songSongDoan(X[0], X[1], X[3], X[2]), ss2 = songSongDoan(X[1], X[2], X[0], X[3]);
  const hbh = ss1 && ss2, vuong = goc4.every((g) => Math.abs(g - 90) < 0.3), deu = canh.every((c) => bangNhau(c, canh[0]));
  const cheo = [dist(X[0], X[2]), dist(X[1], X[3])];
  return { v, X, canh, goc: goc4, hbh, hcn: hbh && vuong, thoi: hbh && deu, vuongT: hbh && vuong && deu, thang: ss1 || ss2, cheo,
    thangCan: (ss1 && !ss2 && bangNhau(cheo[0], cheo[1])) || (ss2 && !ss1 && bangNhau(cheo[0], cheo[1])) };
}
// số đo góc ghi trong hình và góc ? của một tứ giác, tam giác: { "A": 95, …, "?": "D" }
const gocTuGiac = (svg, H, ten) => {
  const G = gocGhi(svg, H, ten), S = gocSo(svg, H, ten), out = {};
  G.forEach((g_) => { assert.ok(!(g_.O in out), ten + ": hai số đo ở đỉnh " + g_.O); out[g_.O] = g_.v; });
  Object.keys(S).forEach((k) => { assert.ok(/\?$/.test(k), ten + ": số lạ ở góc " + k); out["?"] = k[0]; out["?h"] = S[k].h; });
  return out;
};

/* ---------- biểu đồ (như tests/toan9-ck2.js) ----------
   Trục đứng: số ghi bên trái (căn phải), cách đều từ 0, có đường lưới màu line ở mỗi vạch. Biểu đồ cột: cột tô acc-soft đứng trên trục ngang,
   số đậm ở đỉnh cột khớp chiều cao, tên dưới trục. Biểu đồ cột kép: hai dãy cột tô acc-soft, sun-soft theo ô chú giải (ô 16 px, tên ngay bên
   phải), mỗi nhóm hai cột liền nhau. Biểu đồ đoạn thẳng: điểm tô acc nối liên tiếp bằng đường gấp khúc, số ghi ngay trên điểm bằng độ cao
   điểm, mốc thời gian ở dưới trục. Biểu đồ hình quạt tròn: mỗi phần là một hình quạt (path "M tâm L đầu cung A r r 0 cờ 1 cuối cung Z") tô
   màu theo chú giải, số phần trăm ghi trong hình quạt, góc ở tâm khớp số phần trăm, các phần nối tiếp nhau đủ một vòng. */
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
const docCot = (svg, ten) => {
  const tr = trucDung(svg, ten), T = texts(svg);
  return rects(svg).filter((r) => r.fill === "acc-soft").sort((a, b) => a.x - b.x).map((r) => {
    assert.ok(Math.abs(r.y + r.h - tr.bot) < 0.6, ten + ": cột đứng trên trục ngang");
    const cx = r.x + r.w / 2, d = soDinh(T, cx, r.y, ten);
    assert.ok(tr.khop(r.y, soChu(d.t)), ten + ": số ở đỉnh cột " + d.t + " khác chiều cao cột");
    return [tenDuoi(T, cx, tr.bot, ten), soChu(d.t)];
  });
};
const chuGiaiCua = (svg, ten) => { const T = texts(svg); return rects(svg).filter((r) => r.w === 16 && r.h === 16).map((r) => { const t = T.filter((t_) => Math.abs(t_.at[0] - (r.x + 24)) < 0.6 && Math.abs(t_.at[1] - (r.y + 13)) < 0.6); assert.equal(t.length, 1, ten + ": mỗi ô chú giải một tên"); return { fill: r.fill, ten: t[0].t }; }); };
// biểu đồ cột kép: { nhom: [tên dưới trục], day: { "<tên chú giải>": [số theo nhóm] } }
const docCotKep = (svg, ten) => {
  const tr = trucDung(svg, ten), T = texts(svg), cg = chuGiaiCua(svg, ten);
  assert.equal(cg.length, 2, ten + ": biểu đồ cột kép có hai ô chú giải");
  const R = rects(svg).filter((r) => r.h > 0 && r.w !== 16 && cg.some((g) => g.fill === r.fill)).sort((a, b) => a.x - b.x);
  assert.ok(R.length % 2 === 0, ten + ": mỗi nhóm hai cột");
  const nhom = [], day = { [cg[0].ten]: [], [cg[1].ten]: [] };
  for (let i = 0; i < R.length; i += 2) {
    const a = R[i], b = R[i + 1];
    assert.ok(a.fill === cg[0].fill && b.fill === cg[1].fill, ten + ": trong nhóm, cột của dãy thứ nhất đứng trước");
    assert.ok(Math.abs(a.x + a.w - b.x) < 0.15 && Math.abs(a.w - b.w) < 0.15, ten + ": hai cột của một nhóm liền nhau, rộng bằng nhau");
    nhom.push(tenDuoi(T, b.x, tr.bot, ten));
    [a, b].forEach((r, j) => { assert.ok(Math.abs(r.y + r.h - tr.bot) < 0.6, ten + ": cột đứng trên trục ngang"); const d = soDinh(T, r.x + r.w / 2, r.y, ten); assert.ok(tr.khop(r.y, soChu(d.t)), ten + ": số ở đỉnh cột " + d.t + " khác chiều cao cột"); day[cg[j].ten].push(soChu(d.t)); });
  }
  return { nhom, day };
};
/* ---------- lựa chọn, thang chấm ---------- */
// đúng một lựa chọn thoả f (hàm nhận chữ của lựa chọn); trả về lựa chọn đó
const motLuaChon = (q, f) => { const m = q.o.filter(f); assert.equal(m.length, 1, "cần đúng một lựa chọn thoả: " + JSON.stringify(m) + " trong " + JSON.stringify(q.o)); return m[0]; };
// số đo góc "52°", độ dài "7 cm" trong lựa chọn
const doLC = (q, v) => motLuaChon(q, (o) => o === fmtDec(isR(v) ? v : F(v)) + "°");
const daiLC = (q, v, dv) => motLuaChon(q, (o) => o === fmtDec(isR(v) ? v : F(v)) + " " + (dv || "cm"));
// lựa chọn bằng đa thức p (đọc bằng P); các lựa chọn khác phải khác p
const lcDT = (q, p) => motLuaChon(q, (o) => pEq(P(o), p));
const xs = (q, re) => { const m = re.exec(q.q); assert.ok(m, "đề thiếu " + re); return m.slice(1); };
// đẳng thức (chuỗi) "A = B = C" giữa các biểu thức đa thức: mọi vế bằng nhau
const dtDung = (s) => { const v = String(s).split(" = "); assert.ok(v.length >= 2, "không phải đẳng thức: " + s); const p0 = P(v[0]); return v.slice(1).every((x) => pEq(P(x), p0)); };
// tự luận: điểm mỗi ý chia hết cho 0,25, tổng 2 điểm; thang chấm có các chữ rb, gợi ý có các chữ xx; mọi đẳng thức sau dấu “: ” cuối
// của một ý thang chấm (ý có dấu “=”) và mọi đẳng thức của gợi ý ghi trong dấu « » đều đúng
const essayCheck = (q, rb, xx) => {
  const r = q.rubric.map((c) => c.c).join(" | "); rb.forEach((s) => assert.ok(r.includes(s), "thang chấm thiếu “" + s + "”")); xx.forEach((s) => assert.ok(q.x.includes(s), "gợi ý thiếu “" + s + "”"));
  q.rubric.forEach((c) => { const k = c.c.lastIndexOf(": "); if (k >= 0 && / = /.test(c.c.slice(k + 2)) && !/[A-Z]/.test(c.c.slice(k + 2))) assert.ok(dtDung(c.c.slice(k + 2).replace(/[.;]$/, "")), "thang chấm: đẳng thức sai “" + c.c + "”"); });
  [...q.x.matchAll(/«([^»]+)»/g)].forEach((m) => assert.ok(dtDung(m[1]), "gợi ý: đẳng thức sai «" + m[1] + "»"));
};
// ý của câu đúng/sai 4 ý về đa thức: đẳng thức, bậc, hệ số, đồng dạng, chia hết, giá trị
const yDT = (s, ctx) => {
  let m;
  if ((m = /^Đơn thức (.+) thu gọn là (.+)$/.exec(s))) return thuGon(m[2]) && pEq(P(m[1]), P(m[2]));
  if ((m = /^Hệ số của đơn thức (.+) là (.+)$/.exec(s))) { const p = P(m[1]); assert.ok(laDon(p) && thuGon(m[1]), "đơn thức thu gọn: " + m[1]); return eq([...p.values()][0], fr(m[2])); }
  if ((m = /^Hai đơn thức (.+) và (.+) đồng dạng$/.exec(s))) return dongDang(m[1], m[2]);
  if ((m = /^Đơn thức (\S+) có bậc là (\d+)$/.exec(s))) return bac(P(m[1])) === +m[2];
  if ((m = /^Đơn thức (.+) chia hết cho đơn thức (.+)$/.exec(s))) return chiaHetDon(phanBien(m[1]), phanBien(m[2]));
  if ((m = /^Đa thức (.+) chia hết cho đơn thức (.+)$/.exec(s))) { const kb = phanBien(m[2]); return [...P(m[1]).keys()].every((k) => chiaHetDon(k, kb)); }
  if ((m = /^(.+) có (\d+) hạng tử$/.exec(s))) { const t = ctx[m[1]]; assert.ok(t, "chưa biết đa thức " + m[1]); return t.split(/ [+−] /).length === +m[2]; }
  if ((m = /^Dạng thu gọn của (\w) là (.+)$/.exec(s))) return pEq(P(ctx[m[1]]), P(m[2]));
  if ((m = /^Bậc của (\w) là (\d+)$/.exec(s))) return bac(P(ctx[m[1]])) === +m[2];
  if ((m = /^Giá trị của (\w) tại (.+) là (.+)$/.exec(s))) { const vars = {}; m[2].split(", ").forEach((g) => { const k = /^(\w) = (.+)$/.exec(g); vars[k[1]] = fr(k[2]); }); return eq(giaTri(P(ctx[m[1]]), vars), fr(m[3])); }
  return dtDung(s);
};
/* ---------- hình học: thử bằng số trên nhiều hình ngẫu nhiên (toạ độ thường, trục y hướng lên) ---------- */
const rnd = (a, b) => a + (b - a) * Math.random();
function thuDinhLi(ten, f) { let n_ = 0; for (let i = 0; i < 400 && n_ < 200; i++) { const e = f(); if (e === null) continue; n_++; assert.ok(e < 1e-6, ten + ": điều phải chứng minh sai trên một hình (" + e + ")"); } assert.ok(n_ >= 100, ten + ": thử được quá ít hình"); }
const catDuong = (P_, u, Q, v) => { const d = cross(u, v); if (Math.abs(d) < 1e-9) return null; const w = subv(Q, P_), t = cross(w, v) / d; return [P_[0] + t * u[0], P_[1] + t * u[1]]; };
const cong = (p, q) => [p[0] + q[0], p[1] + q[1]];
const donVi = (v) => { const l = Math.hypot(...v); return [v[0] / l, v[1] / l]; };
const nhanV = (p, k) => [p[0] * k, p[1] * k];
const tamGiacNN = () => { const A = [rnd(-3, 3), rnd(2, 6)], B = [rnd(-6, -1), rnd(-2, 0)], C = [rnd(1, 6), rnd(-2, 0)]; return Math.abs(cross(subv(B, A), subv(C, A))) > 4 ? [A, B, C] : null; };
// tứ giác ABCD (theo thứ tự) là hình bình hành: vectơ AB = vectơ DC; trả về sai lệch
const lechHBH = (A, B, C, D) => dist(subv(B, A), subv(C, D));
// chuỗi là một tích: bỏ hết các cặp ngoặc thì không còn dấu “+”, “−” giữa các hạng tử, và có ít nhất một ngoặc
const laTich = (s) => { let t = String(s), u_; do { u_ = t; t = t.replace(/\([^()]*\)/g, "■"); } while (t !== u_); return /■/.test(t) && !/ [+−] /.test(t); };
const phanTich = (q) => { const s = xs(q, /Phân tích đa thức (.+) thành nhân tử/)[0], o = lcDT(q, P(s)); assert.ok(laTich(o), "đáp án là một tích: " + o); return o; };
// tự luận phân tích thành nhân tử: vế cuối của ý thang chấm cuối của mỗi câu a), b) là một tích bằng đa thức đề cho
const kiemPhanTich = (q) => {
  const de = Object.fromEntries([...q.q.matchAll(/([ab])\) ([^;]+?)(?:;|\.$)/g)].map((m) => [m[1], m[2]]));
  assert.deepEqual(Object.keys(de), ["a", "b"], "đề có hai câu a), b)");
  ["a", "b"].forEach((k) => { const r = q.rubric.filter((c) => c.c.startsWith(k + ")")), cuoi = r[r.length - 1].c.split(" = ").pop();
    assert.ok(laTich(cuoi), k + ": kết quả là một tích"); assert.ok(pEq(P(cuoi), P(de[k])), k + ": kết quả bằng đa thức đề cho"); });
};

/* ---------- hàm phụ của các mục kiểm tra ---------- */
const hinhDaDoc = new Set();
const doc = (q) => { assert.ok(q.svg, "câu cần hình"); hinhDaDoc.add(q.svg); return q.svg; };
// loại dữ liệu (Bài 18, chữ của sách): số liệu “rời rạc”, “liên tục”; dữ liệu không là số “có thể sắp thứ tự”, “không thể sắp thứ tự”
const BANG_DL = {
  "Thời gian (phút) đi từ nhà đến trường": "liên tục", "Số bạn thân của mỗi bạn": "rời rạc", "Số lần được khen trong tháng": "rời rạc", "Môn học mỗi bạn yêu thích nhất": "không thể sắp thứ tự",
  "Số lần đi bơi trong tháng trước": "rời rạc", "Chiều dài bàn chân (cm)": "liên tục", "Mức độ thích đọc sách": "có thể sắp thứ tự", "Tên con vật nuôi trong nhà": "không thể sắp thứ tự",
};
const loaiDL = (s) => { assert.ok(s in BANG_DL, "chưa có trong bảng loại dữ liệu: " + s); return BANG_DL[s]; };
// chọn biểu đồ (Bài 19): thay đổi theo thời gian → đoạn thẳng; so sánh hai tập dữ liệu → cột kép; tỉ lệ các phần trong tổng thể → quạt tròn
const CHON_BD = { "một đại lượng thay đổi theo thời gian": "Biểu đồ đoạn thẳng", "so sánh hai tập dữ liệu": "Biểu đồ cột kép", "tỉ lệ các phần trong tổng thể": "Biểu đồ hình quạt tròn" };
// phát biểu về tứ giác gọi theo tên (MNPQ): hai đỉnh đối nhau, hai đường chéo, hai cạnh đối nhau, hai góc đối nhau (đỉnh cách nhau 2 vị trí)
const yTen = (s, ten) => {
  const vt = (k) => { const i = ten.indexOf(k); assert.ok(i >= 0, "đỉnh lạ " + k); return i; }, doi = (a, b) => Math.abs(vt(a) - vt(b)) === 2, canh = (c) => [1, 3].includes(Math.abs(vt(c[0]) - vt(c[1])));
  let m;
  if ((m = /^(\w) và (\w) là hai đỉnh đối nhau$/.exec(s))) return doi(m[1], m[2]);
  if ((m = /^(\w\w) và (\w\w) là hai đường chéo của tứ giác$/.exec(s))) return doi(...m[1]) && doi(...m[2]);
  if ((m = /^(\w\w) và (\w\w) là hai cạnh đối nhau$/.exec(s))) return canh(m[1]) && canh(m[2]) && ![...m[1]].some((x) => m[2].includes(x));
  if ((m = /^Góc (\w) và góc (\w) là hai góc đối nhau$/.exec(s))) return doi(m[1], m[2]);
  throw new Error("ý lạ: " + s);
};
// phát biểu về hình (toạ độ X; tứ giác tên tg cho góc gọi một chữ): độ dài, tỉ số, song song, vuông góc, góc, tam giác đều; sai lệch dưới 0,5 %
const yHinh = (s, X, tg) => {
  const d = (k) => { assert.ok(X[k[0]] && X[k[1]], "thiếu điểm của " + k); return dist(X[k[0]], X[k[1]]); }, gl = (k) => goc(X[k[1]], X[k[0]], X[k[2]]);
  const gocMot = (k) => { const i = tg.indexOf(k); return goc(X[k], X[tg[(i + 3) % 4]], X[tg[(i + 1) % 4]]); }, bn = (a, b) => Math.abs(a - b) <= 0.005 * Math.max(Math.abs(a), Math.abs(b), 1e-9);
  let m;
  if ((m = /^(\w\w)\/(\w\w) = (\w\w)\/(\w\w)$/.exec(s))) return bn(d(m[1]) / d(m[2]), d(m[3]) / d(m[4]));
  if ((m = /^(\w\w) = (\w\w)\/2$/.exec(s))) return bn(d(m[1]), d(m[2]) / 2);
  if ((m = /^(\w\w) = 2(\w\w)$/.exec(s))) return bn(d(m[1]), 2 * d(m[2]));
  if ((m = /^(\w\w) = (\w\w)$/.exec(s))) return bn(d(m[1]), d(m[2]));
  if ((m = /^(\w\w) \/\/ (\w\w)$/.exec(s))) return songSongDoan(X[m[1][0]], X[m[1][1]], X[m[2][0]], X[m[2][1]]);
  if ((m = /^(\w\w) ⊥ (\w\w)$/.exec(s))) return Math.abs(dot(subv(X[m[1][1]], X[m[1][0]]), subv(X[m[2][1]], X[m[2][0]]))) <= 2e-3 * d(m[1]) * d(m[2]);
  if ((m = /^Góc (\w{3}) = góc (\w{3})$/.exec(s))) return Math.abs(gl(m[1]) - gl(m[2])) < 0.3;
  if ((m = /^Góc (\w) = góc (\w)$/.exec(s))) return Math.abs(gocMot(m[1]) - gocMot(m[2])) < 0.3;
  if ((m = /^Góc (\w) \+ góc (\w) = (\d+)°$/.exec(s))) return Math.abs(gocMot(m[1]) + gocMot(m[2]) - +m[3]) < 0.3;
  if ((m = /^Tam giác (\w{3}) là tam giác đều$/.exec(s))) return bn(d(m[1][0] + m[1][1]), d(m[1][1] + m[1][2])) && bn(d(m[1][1] + m[1][2]), d(m[1][0] + m[1][2]));
  throw new Error("ý lạ: " + s);
};
// câu đúng/sai 4 ý không có hình: đánh giá mỗi ý trên 200 hình ngẫu nhiên của họ hình đề cho; ý nào cũng phải cùng một kết quả trên mọi hình
const theoMau = (q, tao, tg) => { const kq = q.o.map(() => new Set()); for (let i = 0; i < 200; i++) { const X = tao(); q.o.forEach((s, k) => kq[k].add(yHinh(s, X, tg))); }
  return kq.map((k, i) => { assert.equal(k.size, 1, "ý “" + q.o[i] + "” lúc đúng lúc sai tuỳ hình"); return [...k][0]; }); };
// M, N là trung điểm của AB, AC: nằm đúng chỗ, có vạch đánh dấu (một vạch trên AM, MB; hai vạch trên AN, NC)
const trungBinhKH = (svg, H, ten) => { assert.ok(trungDiem(H, "M", "AB") && trungDiem(H, "N", "AC"), ten + ": M, N là trung điểm của AB, AC");
  assert.deepEqual([["A", "M"], ["M", "B"], ["A", "N"], ["N", "C"]].map(([a, b]) => vachTren(svg, H.o[a], H.o[b])), [1, 1, 2, 2], ten + ": kí hiệu đoạn bằng nhau"); assert.ok(H.coNet(H.o.M, H.o.N), ten + ": có đoạn MN"); };
// điều kiện để tứ giác (hay hình thang, hình bình hành) là hình cần nhận biết: đúng thì thử bằng số trên nhiều hình thoả điều kiện, dựng theo
// điều kiện (đều là hình đó); sai thì có một phản ví dụ thoả điều kiện mà không là hình đó (hình thang cân, cái diều, hình thoi không vuông…)
const laHBH = (X) => lechHBH(X.M || X.A, X.N || X.B, X.P || X.C, X.Q || X.D) < 1e-6;
const DK_HBH = { // tứ giác MNPQ, hai đường chéo MP, NQ cắt nhau tại O
  "OM = OP và ON = OQ": () => { for (let i = 0; i < 100; i++) { const a = rnd(0, 180), b = a + rnd(20, 160), r1 = rnd(1, 5), r2 = rnd(1, 5), u_ = [Math.cos(a * RAD), Math.sin(a * RAD)], v = [Math.cos(b * RAD), Math.sin(b * RAD)];
    if (!laHBH({ M: nhanV(u_, r1), N: nhanV(v, r2), P: nhanV(u_, -r1), Q: nhanV(v, -r2) })) return false; } return true; },
  "MP = NQ": () => { const X = { M: [-2, 2], N: [2, 2], P: [3, 0], Q: [-3, 0] }; assert.ok(yHinh("MP = NQ", X)); return laHBH(X); }, // hình thang cân
  "OM = ON và OP = OQ": () => { const X = { M: [-2, 2], N: [2, 2], P: [3, 0], Q: [-3, 0] }; X.O = catDuong(X.M, subv(X.P, X.M), X.N, subv(X.Q, X.N)); assert.ok(yHinh("OM = ON", X) && yHinh("OP = OQ", X)); return laHBH(X); },
  "MP ⊥ NQ": () => { const X = { M: [0, 3], N: [2, 0], P: [0, -1], Q: [-2, 0] }; assert.ok(yHinh("MP ⊥ NQ", X)); return laHBH(X); }, // cái diều
};
const laHCN = (X) => laHBH(X) && Math.abs(goc(X.A, X.B, X.D) - 90) < 1e-6;
const THOI = { A: [0, 0], B: [4, 0], C: [6, 2 * Math.sqrt(3)], D: [2, 2 * Math.sqrt(3)] }; // hình thoi cạnh 4, góc A = 60°
const DK_HCN = { // hình bình hành ABCD
  "AB ⊥ AD": () => { for (let i = 0; i < 100; i++) { const a = rnd(1, 6), d = rnd(1, 6), t = rnd(0, 360) * RAD, R = (p) => [p[0] * Math.cos(t) - p[1] * Math.sin(t), p[0] * Math.sin(t) + p[1] * Math.cos(t)];
    const X = { A: [0, 0], B: R([a, 0]), C: R([a, d]), D: R([0, d]) }; if (!laHCN(X)) return false; } return true; },
  "AB = AD": () => { assert.ok(laHBH(THOI) && yHinh("AB = AD", THOI)); return laHCN(THOI); },
  "AC ⊥ BD": () => { assert.ok(yHinh("AC ⊥ BD", THOI)); return laHCN(THOI); },
  "AC là tia phân giác của góc A": () => { assert.ok(Math.abs(goc(THOI.A, THOI.B, THOI.C) - goc(THOI.A, THOI.C, THOI.D)) < 1e-6); return laHCN(THOI); },
};
const laThangCan = (X) => Math.abs(goc(X.H, X.E, X.G) - goc(X.G, X.F, X.H)) < 1e-6; // hình thang EFGH (EF // GH): hai góc kề đáy GH bằng nhau
const HBH_XIEN = { E: [1, 2], F: [4, 2], G: [3, 0], H: [0, 0] }; // hình bình hành không có góc vuông
const DK_THC = { // hình thang EFGH (EF // GH), GH nằm ngang
  "EG = FH": () => { for (let i = 0; i < 200; i++) { const d = rnd(2, 5), a = rnd(0.5, d - 0.3), h = rnd(1, 4), s_ = rnd(-1, 1), X = { E: [-a + s_, h], F: [a + s_, h], G: [d, 0], H: [-d, 0] };
    const Y = Object.assign({}, X, { E: [-a, h], F: [a, h] }); // s = 0: hình thang cân
    if ((Math.abs(dist(X.E, X.G) - dist(X.F, X.H)) < 1e-9) !== laThangCan(X) || Math.abs(dist(Y.E, Y.G) - dist(Y.F, Y.H)) > 1e-9 || !laThangCan(Y)) return false; } return true; }, // dịch đáy EF đi s: hai đường chéo bằng nhau khi và chỉ khi cân
  "EH = FG": () => { assert.ok(yHinh("EH = FG", HBH_XIEN) && yHinh("EF // GH", HBH_XIEN)); return laThangCan(HBH_XIEN); },
  "EF = GH": () => { assert.ok(yHinh("EF = GH", HBH_XIEN)); return laThangCan(HBH_XIEN); },
  "EG ⊥ FH": () => { const h = Math.sqrt(8), X = { E: [0, h], F: [2, h], G: [4, 0], H: [0, 0] }; assert.ok(yHinh("EG ⊥ FH", X) && yHinh("EF // GH", X)); return laThangCan(X); },
};
// câu dùng để tự thử bộ dò lộ đáp án (s_g.js): lời giải câu khác có “= 75°”, “bằng 1 920”, “là 5,5”, cả hai vế một cặp nối; hệ số, thừa số không tính
const TU_THU = { khac: "Biết x + y = 7 và xy = 10. Tính x² + y².", lo: [
  ["Tính số đo góc D của tứ giác ABCD trong hình vẽ.", "Ví dụ góc đó = 75°.", ["75°"]],
  ["Tính giá trị của biểu thức x² + 10x + 25 − y² tại x = 47, y = 28.", "Giá trị bằng 1 920.", [1920]],
  ["Tính giá trị của biểu thức x² + 10x + 25 − y² tại x = 47, y = 28.", "Ta có 1 920x là một đơn thức.", []],
  ["Tính độ dài đoạn thẳng MN.", "Độ dài là 5,5 cm.", ["5,5"]],
  ["Nối mỗi phép tính ở cột trái với kết quả của nó ở cột phải.", "(x² + 3x) − (x² − 3x) = 6x.", ["(x² + 3x) − (x² − 3x) → 6x"]],
] };

/* ---------- kiểm tra từng câu: has (chữ có trong đề bài hay một lựa chọn), right(q) (đáp án tính bằng code), more(q) (kiểm tra thêm), essay(q) ---------- */
const CHECKS = [
  /* Đơn thức */
  { has: "Biểu thức nào dưới đây là đơn thức?", right: (q) => motLuaChon(q, laDonThuc) },
  { has: "Bậc của đơn thức −4x³y²z là", right: (q) => { const s = xs(q, /Bậc của đơn thức (\S+) là/)[0]; assert.ok(thuGon(s)); return motLuaChon(q, (o) => o === String(bac(P(s)))); } },
  { has: "Mỗi ý sau về đơn thức đúng hay sai?", right: (q) => q.o.map((s) => yDT(s, {})) },
  { has: "theo thứ tự bậc từ nhỏ đến lớn", right: (q) => { const ds = xs(q, /các đơn thức (.+) theo thứ tự/)[0].split("; "); ds.forEach((d) => assert.ok(thuGon(d), "đơn thức thu gọn: " + d));
    const b = ds.map((d) => bac(P(d))); assert.equal(new Set(b).size, b.length, "các bậc khác nhau"); return ds.slice().sort((x, y) => bac(P(x)) - bac(P(y))); } },
  /* Đa thức */
  { has: "Bậc của đa thức M = 3x²y − 5xy³ + 2x²y + 5xy³ + x² là", right: (q) => { const s = xs(q, /M = (.+) là$/)[0]; const chuaGon = Math.max(...s.split(/ [+−] /).map((t) => bac(P(t))));
    assert.ok(chuaGon > bac(P(s)), "bậc trước khi thu gọn khác bậc của đa thức"); return motLuaChon(q, (o) => o === String(bac(P(s)))); } },
  { has: "Tính giá trị của đa thức P = x²y − 2xy + 3y² tại x = −1, y = 2.", right: (q) => { const [s, x, y] = xs(q, /P = (.+) tại x = (\S+), y = (\S+)\.$/); return giaTri(P(s), { x: fr(x), y: fr(y) }); } },
  { has: "Cho đa thức A = 4x³ − 2xy + x³ − 5 + 3xy. Mỗi ý sau đúng hay sai?", right: (q) => { const A = xs(q, /A = (.+)\. Mỗi ý/)[0]; return q.o.map((s) => yDT(s, { A })); } },
  { has: "Thu gọn đa thức B = 2x²y − xy² + 3 − x²y + 4xy² − 7 ta được", right: (q) => lcDT(q, P(xs(q, /B = (.+) ta được/)[0])) },
  /* Phép cộng và phép trừ đa thức */
  { has: "Cho A = 2x² − 3xy + y² và B = x² + xy − 4y². Đa thức A + B là", right: (q) => { const [a, b] = xs(q, /A = (.+) và B = (.+)\. Đa thức/); return lcDT(q, pAdd(P(a), P(b))); } },
  { has: "Cho M = 4x²y − 3xy + 2 và N = x²y + 2xy − 5. Đa thức M − N là", right: (q) => { const [a, b] = xs(q, /M = (.+) và N = (.+)\. Đa thức/); assert.ok(q.o.some((o) => pEq(P(o), pAdd(P(a), P(b)))), "có lựa chọn M + N");
    return lcDT(q, pSub(P(a), P(b))); } },
  { has: "Nối mỗi phép tính ở cột trái với kết quả của nó ở cột phải.", right: (q) => q.l.map((l) => { const m = q.r.filter((r) => pEq(P(l), P(r))); assert.equal(m.length, 1, "đúng một ô bên phải bằng " + l); return m[0]; }) },
  { has: "Thu gọn hiệu (6xy² − 3xy + 2) − (2xy² − 7xy).", right: (q) => heSo(P(xs(q, /Thu gọn hiệu (.+)\. Hệ số/)[0]), "x1.y1") },
  /* Phép nhân đa thức */
  { has: "Kết quả của phép nhân 2x(3x² − 4x + 1) là", right: (q) => lcDT(q, P(xs(q, /phép nhân (.+) là$/)[0])) },
  { has: "Tích (x − 3)(x + 5) bằng", right: (q) => lcDT(q, P(xs(q, /Tích (.+) bằng$/)[0])) },
  { has: "Kết quả của phép nhân (−3xy)(x² − 2y) là", right: (q) => lcDT(q, P(xs(q, /phép nhân (.+) là$/)[0])) },
  { has: "Thu gọn tích (3x + 1)(x − 4).", right: (q) => heSo(P(xs(q, /Thu gọn tích (.+)\. Hệ số/)[0]), "x1") },
  { has: "Cho biểu thức A = (x + 2)(x − 3) − x(x − 1). Giá trị của A không phụ thuộc", right: (q) => { const p = P(xs(q, /A = (.+?)\. Giá trị/)[0]); assert.ok(p.size <= 1 && !([...p.keys()][0] || ""), "A là hằng số"); return heSo(p, ""); } },
  { has: "Một thùng chứa hàng hình hộp chữ nhật", right: (q) => { const [a, b, c] = xs(q, /dài (.+) dm, rộng (.+) dm, cao (.+) dm\./); return lcDT(q, pMul(pMul(P(a), P(b)), P(c))); } },
  { has: "Cho biểu thức B = (2x − 1)(x + 3) − 2x(x + 2). Tính giá trị của B tại x = −14.", right: (q) => { const [s, x] = xs(q, /B = (.+)\. Tính giá trị của B tại x = (\S+)\.$/); return giaTri(P(s), { x: fr(x) }); },
    more: (q) => assert.ok(q.x.includes("x − 3") && pEq(P(xs(q, /B = (.+)\. Tính/)[0]), P("x − 3")), "lời giải thu gọn đúng") },
  { has: "Cho hai đa thức P = (x − 1)(x + 4) và Q = x(x + 3).", right: (q) => { const [p_, q_] = xs(q, /P = (.+) và Q = (.+)\. Mỗi ý/).map(P), d = pSub(p_, q_);
    return q.o.map((s) => { let m;
      if ((m = /^P = (.+)$/.exec(s))) return pEq(p_, P(m[1]));
      if ((m = /^P − Q = (.+)$/.exec(s))) return pEq(d, P(m[1]));
      if (/^Với mọi giá trị của x, P nhỏ hơn Q$/.test(s)) { assert.ok(d.size === 1 && d.has(""), "P − Q là hằng số"); return d.get("").n < 0; }
      if ((m = /^Tại x = (\S+), P = (\S+)$/.exec(s))) return eq(giaTri(p_, { x: fr(m[1]) }), fr(m[2]));
      throw new Error("ý lạ: " + s); }); } },
  /* Phép chia đa thức cho đơn thức */
  { has: "Kết quả của phép chia (18x⁴y² − 12x³y³) : 6x³y là", right: (q) => lcDT(q, P(xs(q, /phép chia (.+) là$/)[0])) },
  { has: "Đơn thức nào dưới đây chia hết cho đơn thức 3x²y?", right: (q) => { const b = phanBien(xs(q, /cho đơn thức (\S+)\?/)[0]); return motLuaChon(q, (o) => chiaHetDon(phanBien(o), b)); } },
  { has: "Mỗi ý sau về phép chia đúng hay sai?", right: (q) => q.o.map((s) => { if (/ : /.test(s)) { const [l, r] = s.split(" = "); let p_; try { p_ = P(l); } catch (e) { return false; } return pEq(p_, P(r)); } return yDT(s, {}); }) },
  { has: "Cho P = (10x⁴y − 15x³y² + 5x²y) : 5x²y.", right: (q) => { const [s, x, y] = xs(q, /P = (.+)\. Tính giá trị của P tại x = (\S+), y = (\S+)\.$/); return giaTri(P(s), { x: fr(x), y: fr(y) }); } },
  /* Hiệu hai bình phương. Bình phương của một tổng hay một hiệu */
  { has: "Khai triển (x + 3)² ta được", right: (q) => lcDT(q, P(xs(q, /Khai triển (.+) ta được/)[0])) },
  { has: "Đa thức 4x² − 25 viết thành tích là", right: (q) => lcDT(q, P(xs(q, /Đa thức (.+) viết thành tích/)[0])) },
  { has: "Nối mỗi biểu thức ở cột trái với biểu thức bằng nó ở cột phải.", right: (q) => q.l.map((l) => { const m = q.r.filter((r) => pEq(P(l), P(r))); assert.equal(m.length, 1, "đúng một ô bên phải bằng " + l); return m[0]; }) },
  { has: "Biểu thức (2x − y)² bằng", right: (q) => lcDT(q, P(xs(q, /Biểu thức (.+) bằng$/)[0])) },
  { has: "Tính nhanh: 86² − 14².", right: (q) => { const [a, b] = xs(q, /(\d+)² − (\d+)²/).map(Number); assert.equal((a - b) * (a + b), (a + b === 100 ? 100 : a + b) * (a - b)); assert.equal(a + b, 100, "tổng tròn trăm để tính nhanh"); return so(xs(q, /Tính nhanh: (.+)\.$/)[0]); } },
  { has: "Tính giá trị của biểu thức x² − 10x + 25 tại x = 105.", right: (q) => { const [s, x] = xs(q, /biểu thức (.+) tại x = (\S+)\.$/); assert.ok(pEq(P(s), P("(x − 5)²"))); return giaTri(P(s), { x: fr(x) }); } },
  { has: "Bạn Hà viết bốn đẳng thức dưới đây. Mỗi đẳng thức đúng hay sai?", right: (q) => q.o.map(dtDung) },
  { has: "Biết x + y = 7 và xy = 10. Tính x² + y².", right: (q) => { const [s, p_] = xs(q, /x \+ y = (\d+) và xy = (\d+)/).map(Number);
    // thử bằng hai số thực có tổng s, tích p: x² + y² = s² − 2p
    const d = Math.sqrt(s * s - 4 * p_), x = (s + d) / 2, y = (s - d) / 2; assert.ok(Math.abs(x * x + y * y - (s * s - 2 * p_)) < 1e-9); return F(s * s - 2 * p_); } },
  /* Lập phương của một tổng. Lập phương của một hiệu */
  { has: "Khai triển (x + 4)³ ta được", right: (q) => lcDT(q, P(xs(q, /Khai triển (.+) ta được/)[0])) },
  { has: "Viết đa thức 125x³ + 75x² + 15x + 1 dưới dạng lập phương", right: (q) => lcDT(q, P(xs(q, /Viết đa thức (.+) dưới dạng/)[0])) },
  { has: "Biểu thức (x − 5)³ bằng", right: (q) => lcDT(q, P(xs(q, /Biểu thức (.+) bằng$/)[0])) },
  { has: "Điền vào chỗ trống: (y − 2)³ = y³ − 6y² + ___ − 8.", right: (q) => { const [l, a, b] = xs(q, /: (.+) = (.+) \+ ___ (.+)\.$/); const can = pSub(P(l), P(a + " " + b)); assert.ok(laDon(can)); return motLuaChon({ o: q.ans }, (o) => pEq(P(o), can)); } },
  /* Tổng và hiệu hai lập phương */
  { has: "Biểu thức (x − 2)(x² + 2x + 4) − (x³ + 5) có cùng một giá trị với mọi x.", right: (q) => { const p = P(xs(q, /Biểu thức (.+) có cùng/)[0]); assert.ok(p.size <= 1 && !([...p.keys()][0] || ""), "là hằng số"); return heSo(p, ""); } },
  { has: "Đa thức 27x³ − 1 viết thành tích là", right: (q) => lcDT(q, P(xs(q, /Đa thức (.+) viết thành tích/)[0])) },
  { has: "Tính giá trị của biểu thức (x + 5)(x² − 5x + 25) − x(x² − 2) tại x = −66.", right: (q) => { const [s, x] = xs(q, /biểu thức (.+) tại x = (\S+)\.$/); return giaTri(P(s), { x: fr(x) }); } },
  { has: "Mỗi đẳng thức sau về tổng và hiệu hai lập phương đúng hay sai?", right: (q) => q.o.map(dtDung) },
  /* Phân tích đa thức thành nhân tử */
  { has: "Phân tích đa thức 3x²y − 6xy² thành nhân tử ta được", right: (q) => phanTich(q) },
  { has: "Phân tích đa thức x² − 2xy + y² − 36 thành nhân tử ta được", right: (q) => phanTich(q) },
  { has: "Tính nhanh giá trị của biểu thức x² + xy − 5x − 5y tại x = 15, y = 25.", right: (q) => { const [s, x, y] = xs(q, /biểu thức (.+) tại x = (\S+), y = (\S+)\.$/);
    assert.ok(pEq(P(s), P("(x + y)(x − 5)")), "phân tích được (x + y)(x − 5)"); return giaTri(P(s), { x: fr(x), y: fr(y) }); } },
  { has: "Sắp xếp các bước để phân tích đa thức 3x³ − 27x thành nhân tử.", right: (q) => { const s = xs(q, /phân tích đa thức (.+) thành nhân tử/)[0];
    const b1 = q.o.find((o) => o.startsWith("Đặt nhân tử chung")), b2 = q.o.find((o) => o.startsWith("Viết")), b3 = q.o.find((o) => o.startsWith("Dùng hằng đẳng thức"));
    assert.ok(dtDung(b1.split(": ")[1]) && b1.includes(s), "bước 1 đúng"); assert.ok(dtDung(b3.split(": ")[1]) && pEq(P(b3.split(" = ")[1]), P(s)), "bước 3 đúng");
    assert.ok(b3.includes(b2.split(" hiệu hai bình phương ")[1]), "bước 3 dùng kết quả bước 2"); return [b1, b2, b3]; } },
  { has: "a) 5x³ − 20x; b) y² − x² + 12x − 36.", essay: (q) => { essayCheck(q, ["5x(x − 2)(x + 2)", "(y − x + 6)(y + x − 6)"], ["5x(x − 2)(x + 2)"]); kiemPhanTich(q); } },
  { has: "a) 3x(x − 2) − 5(2 − x); b) x³ + 27 + x(x + 3).", essay: (q) => { essayCheck(q, ["(x − 2)(3x + 5)", "(x + 3)(x² − 2x + 9)"], ["(x + 3)(x² − 2x + 9)"]); kiemPhanTich(q); } },
  { has: "a) x² + 3x − xy − 3y; b) 9x² + 6x + 1 − 16y².", essay: (q) => { essayCheck(q, ["(x + 3)(x − y)", "(3x + 1 − 4y)(3x + 1 + 4y)"], ["(x + 3)(x − y)"]); kiemPhanTich(q); } },
  { has: "Tính giá trị của biểu thức x² + 10x + 25 − y² tại x = 47, y = 28.", right: (q) => { const [s, x, y] = xs(q, /biểu thức (.+) tại x = (\S+), y = (\S+)\.$/);
    assert.ok(pEq(P(s), P("(x + 5 − y)(x + 5 + y)"))); return giaTri(P(s), { x: fr(x), y: fr(y) }); } },
  /* Tứ giác */
  { has: "Tính số đo góc D của tứ giác ABCD trong hình vẽ.", right: (q) => { const svg = doc(q), H = docHinh(svg, "tứ giác"), t = tuGiac(H, "ABCD", "tứ giác"), g = gocTuGiac(svg, H, "tứ giác");
    assert.deepEqual([Object.keys(g).filter((k) => /^[A-Z]$/.test(k)).sort(), g["?"]], [["A", "B", "C"], "D"], "số đo ở A, B, C; dấu ? ở D");
    const v = 360 - g.A - g.B - g.C; assert.ok(Math.abs(t.goc[3] - v) < 0.5, "góc D vẽ bằng góc tính được"); return F(v); } },
  { has: "Tứ giác MNPQ có góc M = 70°, góc N = 125°, góc P = 50°. Số đo góc Q là", right: (q) => doLC(q, 360 - xs(q, /góc M = (\d+)°, góc N = (\d+)°, góc P = (\d+)°/).reduce((s_, x) => s_ + +x, 0)) },
  { has: "Cho tứ giác MNPQ như hình vẽ. Mỗi ý sau đúng hay sai?", right: (q) => { const svg = doc(q), H = docHinh(svg, "MNPQ"); tuGiac(H, "MNPQ", "MNPQ"); return q.o.map((s) => yTen(s, "MNPQ")); } },
  { has: "Tứ giác PQRS có góc P = 54° và ba góc Q, R, S bằng nhau.", right: (q) => div(F(360 - +xs(q, /góc P = (\d+)°/)[0]), F(3)) },
  /* Hình thang cân */
  { has: "Cho hình thang cân MNPQ có hai đáy MN và PQ. Mỗi ý sau đúng hay sai?", right: (q) => theoMau(q, () => { const a = rnd(0.5, 3), b = rnd(3.5, 6), h = rnd(1, 5); return { M: [-a, h], N: [a, h], P: [b, 0], Q: [-b, 0] }; }, "MNPQ") },
  { has: "trong hình vẽ có góc D = 68°. Số đo góc được đánh dấu “?” là", right: (q) => { const svg = doc(q), H = docHinh(svg, "thang cân"), t = tuGiac(H, "ABCD", "thang cân"), g = gocTuGiac(svg, H, "thang cân");
    assert.ok(t.thangCan, "hình thang cân"); ssKH(svg, H, "AB", "DC", "thang cân"); assert.equal(g.D, +xs(q, /góc D = (\d+)°/)[0]); assert.equal(g["?"], "C");
    assert.ok(Math.abs(t.goc[2] - g.D) < 0.5, "góc C vẽ bằng góc D"); return doLC(q, g.D); } },
  { has: "Hình thang EFGH (EF // GH) cần có thêm điều kiện nào dưới đây thì là hình thang cân?", right: (q) => motLuaChon(q, (o) => { assert.ok(o in DK_THC, "chưa có trong bảng: " + o); return DK_THC[o](); }) },
  { has: "ABCD là hình thang cân (AB // CD) có góc A = 116°. Tính số đo góc C.", right: (q) => { const svg = doc(q), H = docHinh(svg, "thang cân 2"), t = tuGiac(H, "ABCD", "thang cân 2"), g = gocTuGiac(svg, H, "thang cân 2");
    assert.ok(t.thangCan, "hình thang cân"); ssKH(svg, H, "AB", "DC", "thang cân 2"); assert.equal(g.A, +xs(q, /góc A = (\d+)°/)[0]); assert.equal(g["?"], "C");
    const v = 180 - g.A; assert.ok(Math.abs(t.goc[2] - v) < 0.5, "góc C vẽ bằng góc tính được"); return F(v); } },
  /* Hình bình hành */
  { has: "Cho hình bình hành ABCD có AB = 7 cm và BC = 4 cm. Độ dài cạnh CD là", right: (q) => daiLC(q, F(+xs(q, /AB = (\d+) cm/)[0])) },
  { has: "Điều kiện nào dưới đây cho biết MNPQ là hình bình hành?", right: (q) => motLuaChon(q, (o) => { assert.ok(o in DK_HBH, "chưa có trong bảng: " + o); return DK_HBH[o](); }) },
  { has: "ABCD là hình bình hành có góc A = 58°. Tính số đo góc B.", right: (q) => { const svg = doc(q), H = docHinh(svg, "bình hành"), t = tuGiac(H, "ABCD", "bình hành"), g = gocTuGiac(svg, H, "bình hành");
    assert.ok(t.hbh && !t.hcn, "hình bình hành"); assert.equal(g.A, +xs(q, /góc A = (\d+)°/)[0]); assert.equal(g["?"], "B");
    const v = 180 - g.A; assert.ok(Math.abs(t.goc[1] - v) < 0.5, "góc B vẽ bằng góc tính được"); return F(v); } },
  { has: "Cho hình bình hành ABCD, hai đường chéo cắt nhau tại O như hình vẽ.", right: (q) => { const svg = doc(q), H = docHinh(svg, "bình hành O"), t = tuGiac(H, "ABCD", "bình hành O");
    assert.ok(t.hbh && !t.hcn && !t.thoi, "hình bình hành không phải hình chữ nhật, hình thoi"); assert.ok(trungDiem(H, "O", "AC") && trungDiem(H, "O", "BD"), "O là giao điểm hai đường chéo");
    return q.o.map((s) => yHinh(s, H.o, "ABCD")); } },
  { has: "Cho tứ giác ABCD có ΔABC = ΔCDA. Chứng minh tứ giác ABCD là hình bình hành.", essay: (q) => {
    essayCheck(q, ["AB = CD", "BC = DA", "các cạnh đối bằng nhau"], ["AB = CD, BC = DA"]);
    // tứ giác (lồi) ABCD: B, D khác phía đối với AC; ΔABC = ΔCDA (AB = CD, BC = DA): D là ảnh của B qua phép đối xứng tâm là trung điểm của AC, tìm lại bằng giao hai đường tròn
    thuDinhLi("ABCD hình bình hành", () => { const T_ = tamGiacNN(); if (!T_) return null; const [A, B, C] = T_, r1 = dist(A, B), r2 = dist(B, C), d = dist(C, A);
      const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, r1 * r1 - a * a)), u_ = donVi(subv(A, C)), P0 = cong(C, nhanV(u_, a)), nn = [-u_[1], u_[0]];
      const D = [cong(P0, nhanV(nn, h)), cong(P0, nhanV(nn, -h))].find((X) => Math.sign(cross(subv(C, A), subv(X, A))) !== Math.sign(cross(subv(C, A), subv(B, A))));
      assert.ok(Math.abs(dist(C, D) - r1) < 1e-9 && Math.abs(dist(D, A) - r2) < 1e-9, "dựng đúng ΔCDA = ΔABC"); return lechHBH(A, B, C, D); }); } },
  { has: "Cho tứ giác ABCD có AB // CD và góc A = góc C. Chứng minh tứ giác ABCD là hình bình hành.", essay: (q) => {
    essayCheck(q, ["góc A + góc D = 180°", "góc B = góc D", "các góc đối bằng nhau"], ["góc B = góc D"]);
    // hình thang ABCD (AB // CD nằm ngang) có góc A = góc C: dò mọi vị trí của C trên đường thẳng CD, chỗ nào góc C = góc A thì ABCD là hình bình hành
    thuDinhLi("AB // CD, góc A = góc C", () => { const D = [0, 0], A = [rnd(-2, 2), rnd(2, 5)], B = [A[0] + rnd(2, 6), A[1]], gA = goc(A, B, D);
      const f = (x) => goc([x, 0], B, D) - gA; let e = 0, n_ = 0; for (let x = 0.05; x < 15; x += 0.01) { if (f(x) * f(x + 0.01) <= 0) { let a = x, b = x + 0.01; for (let k = 0; k < 60; k++) { const m = (a + b) / 2; if (f(a) * f(m) <= 0) b = m; else a = m; } n_++; e = Math.max(e, lechHBH(A, B, [a, 0], D)); } }
      return n_ ? e : null; }); } },
  { has: "Trên đường chéo AC lấy hai điểm E và F sao cho AE = CF", essay: (q) => {
    essayCheck(q, ["OA = OC và OB = OD", "OE = OF", "hai đường chéo BD và EF cắt nhau tại O"], ["OE = OA − AE = OC − CF = OF"]);
    thuDinhLi("BEDF hình bình hành", () => { const A = [0, 0], B = [rnd(3, 6), 0], D = [rnd(-2, 2), rnd(2, 5)], C = cong(B, D), t = rnd(0.05, 0.45), E = cong(A, nhanV(subv(C, A), t)), F_ = cong(C, nhanV(subv(A, C), t)); return lechHBH(B, E, D, F_); }); } },
  { has: "Hình bình hành ABCD có chu vi 46 cm và AB − BC = 5 cm. Tính độ dài cạnh AB.", right: (q) => { const [p, h] = xs(q, /chu vi (\d+) cm và AB − BC = (\d+) cm/).map(Number); return div(F(p / 2 + h), F(2)); } },
  /* Hình chữ nhật */
  { has: "Hình bình hành ABCD có thêm điều kiện nào dưới đây thì là hình chữ nhật?", right: (q) => motLuaChon(q, (o) => { assert.ok(o in DK_HCN, "chưa có trong bảng: " + o); return DK_HCN[o](); }) },
  { has: "Cho hình chữ nhật ABCD, hai đường chéo cắt nhau tại O như hình vẽ.", right: (q) => { const svg = doc(q), H = docHinh(svg, "chữ nhật O"), t = tuGiac(H, "ABCD", "chữ nhật O");
    assert.ok(t.hcn && !t.vuongT, "hình chữ nhật không phải hình vuông"); ["ABD", "BCA", "CDB", "DAC"].forEach((k) => assert.ok(coVuong(svg, H.o[k[0]], H.o[k[1]], H.o[k[2]]), "kí hiệu góc vuông ở " + k[0]));
    assert.ok(trungDiem(H, "O", "AC") && trungDiem(H, "O", "BD"), "O là giao điểm hai đường chéo"); return q.o.map((s) => yHinh(s, H.o, "ABCD")); } },
  { has: "Hình vẽ cho tam giác ABC có góc A vuông, M là trung điểm của BC", right: (q) => { const svg = doc(q), H = docHinh(svg, "trung tuyến"), d = doDai(svg, H, "trung tuyến");
    assert.ok(coVuong(svg, H.o.A, H.o.B, H.o.C), "góc A vuông"); assert.ok(trungDiem(H, "M", "BC") && vachTren(svg, H.o.B, H.o.M) === 1 && vachTren(svg, H.o.M, H.o.C) === 1, "M là trung điểm của BC, có kí hiệu");
    const bc = daiGhi(d, "trung tuyến")("BC"); assert.equal(bc, +xs(q, /BC = (\d+) cm/)[0]); assert.ok(bangNhau(doanH(H, "AM"), doanH(H, "BC") / 2), "AM vẽ bằng nửa BC"); return div(F(bc), F(2)); } },
  { has: "ABCD là hình chữ nhật, hai đường chéo cắt nhau tại O và góc AOB = 50°. Tính số đo góc OAB.", right: (q) => { const svg = doc(q), H = docHinh(svg, "chữ nhật 50°"), t = tuGiac(H, "ABCD", "chữ nhật 50°"), g = gocTuGiac(svg, H, "chữ nhật 50°");
    assert.ok(t.hcn, "hình chữ nhật"); assert.ok(trungDiem(H, "O", "AC") && trungDiem(H, "O", "BD"), "O là giao điểm hai đường chéo"); assert.equal(g.O, +xs(q, /góc AOB = (\d+)°/)[0]); assert.equal(g["?"], "A");
    assert.ok(Math.abs(H.gocTen("AOB") - g.O) < 0.5); const v = F(180 - g.O, 2); assert.ok(Math.abs(H.gocTen("OAB") - toNum(v)) < 0.5, "góc OAB vẽ bằng góc tính được"); return v; } },
  /* Hình thoi và hình vuông */
  { has: "ABCD là hình thoi có góc A = 70°, hai đường chéo cắt nhau tại O. Tính số đo góc ABO.", right: (q) => { const svg = doc(q), H = docHinh(svg, "thoi"), t = tuGiac(H, "ABCD", "thoi"), g = gocTuGiac(svg, H, "thoi");
    assert.ok(t.thoi && !t.vuongT, "hình thoi"); assert.ok(trungDiem(H, "O", "AC") && trungDiem(H, "O", "BD"), "O là giao điểm hai đường chéo"); assert.equal(g["?"], "B");
    const gA = +xs(q, /góc A = (\d+)°/)[0]; assert.ok(Math.abs(H.gocTen("DAB") - gA) < 0.5, "góc A vẽ đúng số đo"); const v = F(180 - gA, 2); assert.ok(Math.abs(H.gocTen("ABO") - toNum(v)) < 0.5, "góc ABO vẽ bằng góc tính được"); return v; } },
  { has: "Cho hình thoi ABCD có góc A = 60° và cạnh AB = 5 cm. Tính độ dài đường chéo BD.", right: (q) => { const [g_, c] = xs(q, /góc A = (\d+)° và cạnh AB = (\d+) cm/).map(Number);
    const A = [0, 0], B = [c, 0], D = nhanV([Math.cos(g_ * RAD), Math.sin(g_ * RAD)], c), bd = dist(B, D); assert.ok(Math.abs(bd - Math.round(bd)) < 1e-9, "BD tròn"); return F(Math.round(bd)); } },
  { has: "Cho góc vuông xOy và điểm M nằm trên tia phân giác của góc đó.", right: (q) => { const oa = +xs(q, /OA = (\d+) cm/)[0], O = [0, 0], M = nhanV([1, 1], oa), A = [M[0], 0], B_ = [0, M[1]];
    assert.ok(Math.abs(dist(O, A) - oa) < 1e-9 && Math.abs(dist(A, M) - oa) < 1e-9 && Math.abs(dist(M, B_) - oa) < 1e-9, "OAMB là hình vuông cạnh OA"); return F(Math.round(dist(O, A) + dist(A, M) + dist(M, B_) + dist(B_, O))); } },
  { has: "Hình vuông ABCD có chu vi 24 cm, hai đường chéo cắt nhau tại O. Tính diện tích tam giác AOB.", right: (q) => { const c = +xs(q, /chu vi (\d+) cm/)[0] / 4, A = [0, 0], B = [c, 0], C = [c, c], O = mid(A, C);
    return F(Math.round(Math.abs(cross(subv(B, A), subv(O, A))) / 2 * 100), 100); } },
  /* Định lí Thalès trong tam giác */
  { has: "Trong hình vẽ, MN // BC (M thuộc AB, N thuộc AC). Khẳng định nào dưới đây đúng?", right: (q) => { const svg = doc(q), H = docHinh(svg, "Thalès"); ssKH(svg, H, "MN", "BC", "Thalès");
    assert.ok(tren(H, "M", "AB") && tren(H, "N", "AC"), "M thuộc AB, N thuộc AC"); return motLuaChon(q, (o) => yHinh(o, H.o)); } },
  { has: "Trong hình vẽ, MN // BC, AM = 3 cm, MB = 2 cm và AN = 4,5 cm. Tính độ dài đoạn thẳng NC.", right: (q) => { const svg = doc(q), H = docHinh(svg, "Thalès 2"), d = daiGhi(doDai(svg, H, "Thalès 2"), "Thalès 2"); ssKH(svg, H, "MN", "BC", "Thalès 2");
    assert.ok(tren(H, "M", "AB") && tren(H, "N", "AC"), "M thuộc AB, N thuộc AC"); const v = mul(fr(fmtDec(F(Math.round(d("AN") * 10), 10))), div(fr(String(d("MB"))), fr(String(d("AM")))));
    assert.ok(bangNhau(doanH(H, "NC") / doanH(H, "AN"), toNum(v) / d("AN")), "NC vẽ đúng tỉ lệ"); return v; } },
  { has: "Đoạn thẳng AB dài 6 cm, đoạn thẳng CD dài 8 cm. Tỉ số AB/CD bằng", right: (q) => { const [a, b] = xs(q, /AB dài (\d+) cm, đoạn thẳng CD dài (\d+) cm/).map(Number); return motLuaChon(q, (o) => eq(fr(o), F(a, b))); } },
  { has: "Trong hình vẽ, DE // BC (D thuộc AB, E thuộc AC). Mỗi ý sau đúng hay sai?", right: (q) => { const svg = doc(q), H = docHinh(svg, "Thalès 3"); ssKH(svg, H, "DE", "BC", "Thalès 3");
    assert.ok(tren(H, "D", "AB") && tren(H, "E", "AC"), "D thuộc AB, E thuộc AC"); return q.o.map((s) => yHinh(s, H.o)); } },
  { has: "Cho tam giác ABC có AB = 9 cm, AC = 12 cm. Điểm M thuộc cạnh AB với AM = 6 cm.", right: (q) => { const [ab, ac, am] = xs(q, /AB = (\d+) cm, AC = (\d+) cm\. .* AM = (\d+) cm/).map(Number); return sub(F(ac), mul(F(ac), F(am, ab))); } },
  { has: "Đoạn thẳng EC phải dài bao nhiêu xăng-ti-mét để DE // BC?", right: (q) => { const [ad, db, ae] = xs(q, /AD = (\S+) cm, DB = (\S+) cm và AE = (\S+) cm/).map(fr); return div(mul(ae, db), ad); } },
  { has: "Một đường thẳng song song với hai đáy cắt các cạnh bên AD, BC lần lượt tại M và N.", right: (q) => { const [am, md, bn] = xs(q, /AM = (\S+) cm, MD = (\S+) cm và BN = (\S+) cm/).map(fr);
    // thử bằng số: hình thang bất kì, đường thẳng song song với đáy qua M chia BC theo đúng tỉ số AM : MD
    thuDinhLi("Thalès trong hình thang", () => { const D = [0, 0], C = [rnd(5, 9), 0], A = [rnd(-1, 3), rnd(2, 5)], B = [A[0] + rnd(1, 4), A[1]], t = toNum(am) / toNum(add(am, md)), M = cong(A, nhanV(subv(D, A), t)), N = catDuong(M, [1, 0], B, subv(C, B));
      return Math.abs(dist(B, N) / dist(N, C) - toNum(am) / toNum(md)); });
    return div(mul(bn, md), am); } },
  { has: "Từ ngã ba A có hai con đường thẳng AB và AC.", right: (q) => { const [am, mb, an] = xs(q, /AM = (\d+) m, MB = (\d+) m và AN = (\d+) m/).map(Number); return F(an * mb, am); } },
  /* Đường trung bình của tam giác */
  { has: "Qua M vẽ đường thẳng song song với BC, cắt cạnh AC tại N. Độ dài đoạn thẳng AN là", right: (q) => {
    thuDinhLi("qua trung điểm, song song", () => { const T_ = tamGiacNN(); if (!T_) return null; const [A, B, C] = T_, M = mid(A, B), N = catDuong(M, subv(C, B), A, subv(C, A)); return dist(N, mid(A, C)); });
    return daiLC(q, F(+xs(q, /AC = (\d+) cm/)[0], 2)); } },
  { has: "Trong hình vẽ, M, N lần lượt là trung điểm của các cạnh AB, AC của tam giác ABC và BC = 11 cm.", right: (q) => { const svg = doc(q), H = docHinh(svg, "trung bình"), d = daiGhi(doDai(svg, H, "trung bình"), "trung bình");
    trungBinhKH(svg, H, "trung bình"); const bc = d("BC"); assert.equal(bc, +xs(q, /BC = (\d+) cm/)[0]); assert.ok(bangNhau(doanH(H, "MN"), doanH(H, "BC") / 2)); return F(bc, 2); } },
  { has: "tam giác ABC có góc B = 72°, M và N lần lượt là trung điểm của AB, AC. Tính số đo góc AMN.", right: (q) => { const svg = doc(q), H = docHinh(svg, "trung bình góc"), g = gocTuGiac(svg, H, "trung bình góc");
    trungBinhKH(svg, H, "trung bình góc"); assert.equal(g.B, +xs(q, /góc B = (\d+)°/)[0]); assert.equal(g["?"], "M"); assert.ok(Math.abs(H.gocTen("AMN") - g.B) < 0.5, "góc AMN vẽ bằng góc B"); return F(g.B); } },
  { has: "Trong hình vẽ, M là trung điểm của AB, N là trung điểm của AC. Mỗi ý sau đúng hay sai?", right: (q) => { const svg = doc(q), H = docHinh(svg, "trung bình 3"); trungBinhKH(svg, H, "trung bình 3"); return q.o.map((s) => yHinh(s, H.o)); } },
  /* Tính chất đường phân giác của tam giác */
  { has: "Cho tam giác ABC có AB = 9 cm, AC = 15 cm. Tia phân giác của góc A cắt cạnh BC tại D, biết BD = 6 cm.", right: (q) => { const [ab, ac, bd] = xs(q, /AB = (\d+) cm, AC = (\d+) cm\. .* BD = (\d+) cm/).map(Number); return add(F(bd), F(bd * ac, ab)); } },
  { has: "tam giác ABC có AB = 6 cm, AC = 9 cm, BC = 10 cm và AD là tia phân giác của góc A (D thuộc BC).", right: (q) => { const svg = doc(q), H = docHinh(svg, "phân giác"), D_ = doDai(svg, H, "phân giác"), d = daiGhi(D_, "phân giác");
    const [ab, ac, bc] = xs(q, /AB = (\d+) cm, AC = (\d+) cm, BC = (\d+) cm/).map(Number); assert.deepEqual([d("AB"), d("AC")], [ab, ac]);
    const k = D_[0].px / D_[0].v; assert.ok(Math.abs(doanH(H, "BC") / bc - k) < 0.01 * k, "BC vẽ đúng tỉ lệ"); assert.ok(tren(H, "D", "BC"), "D thuộc BC");
    assert.ok(Math.abs(H.gocTen("BAD") - H.gocTen("DAC")) < 0.5 && cungTai(svg, H.o.A, H.o.B, H.o.D) === 1 && cungTai(svg, H.o.A, H.o.D, H.o.C) === 1, "AD là tia phân giác, có kí hiệu hai góc bằng nhau");
    const v = F(bc * ab, ab + ac); assert.ok(bangNhau(doanH(H, "BD") / doanH(H, "BC"), toNum(v) / bc), "BD vẽ đúng tỉ lệ"); return v; } },
  { has: "Cho tam giác ABC có AB = 12 cm, AC = 20 cm, BC = 28 cm.", right: (q) => { const [ab, ac, bc] = xs(q, /AB = (\d+) cm, AC = (\d+) cm, BC = (\d+) cm/).map(Number); assert.ok(ab + ac > bc && ab + bc > ac && ac + bc > ab, "ba cạnh của một tam giác"); return F(bc * ab, ab + ac); } },
  { has: "Biết DB : DC = 2 : 5 và AB + AC = 28 cm. Tính độ dài cạnh AB.", right: (q) => { const [m, n, s_] = xs(q, /DB : DC = (\d+) : (\d+) và AB \+ AC = (\d+) cm/).map(Number); return F(s_ * m, m + n); } },
  /* Thu thập và phân loại dữ liệu */
  { has: "Dãy dữ liệu nào là số liệu liên tục?", right: (q) => motLuaChon(q, (o) => loaiDL(o) === "liên tục") },
  { has: "Bạn Phong thu thập dữ liệu theo cách nào?", right: (q) => { assert.ok(/thả một viên đá lạnh vào cốc nước ấm, rồi cứ 2 phút lại đo nhiệt độ/.test(q.q), "Phong tự làm và đo"); return motLuaChon(q, (o) => o === "Trực tiếp, bằng cách làm thí nghiệm"); } },
  { has: "Bạn Quân hỏi năm bạn trong nhóm rồi ghi lại các dãy dữ liệu dưới đây.", right: (q) => q.o.map((s) => {
    const m = /^(.+?): (.+)\. Đây là (số liệu rời rạc|số liệu liên tục|dữ liệu có thể sắp thứ tự|dữ liệu không thể sắp thứ tự)$/.exec(s); assert.ok(m, "ý lạ: " + s);
    const l = loaiDL(m[1]); if (/số liệu/.test(m[3])) m[2].split("; ").forEach((x) => fr(x)); return l === m[3].replace(/^(số liệu|dữ liệu) /, ""); }) },
  { has: "“Hôm qua bạn xem ti vi bao nhiêu giờ?”", right: (q) => { const ds = xs(q, /ghi lại các câu trả lời: ([\d,; ]+)\./)[0].split("; ").map((x) => toNum(fr(x))); const sai = ds.filter((x) => x > 24 || x < 0);
    assert.equal(sai.length, 1, "đúng một giá trị không hợp lí (một ngày có 24 giờ)"); return motLuaChon(q, (o) => toNum(fr(o)) === sai[0]); } },
  /* Biểu diễn dữ liệu bằng bảng, biểu đồ */
  { has: "Để thấy mực nước thay đổi thế nào theo thời gian, nên dùng biểu đồ nào?", right: (q) => motLuaChon(q, (o) => o === CHON_BD["một đại lượng thay đổi theo thời gian"]) },
  { has: "tỉ lệ học sinh lớp 8B chọn môn thể thao yêu thích nhất", right: (q) => { const qt = docQuat(doc(q), "quạt 8B"); assert.equal(qt.reduce((s_, o) => s_ + o.p, 0), 100);
    const tong = +xs(q, /Lớp 8B có (\d+) học sinh/)[0]; return mul(F(tong), F(phanTram(qt, "Cầu lông"), 100)); } },
  { has: "Nếu biểu diễn dữ liệu này bằng biểu đồ hình quạt tròn thì phần “Mĩ thuật” ghi bao nhiêu phần trăm?", right: (q) => { const tong = +xs(q, /Lớp 8C có (\d+) học sinh/)[0];
    const clb = Object.fromEntries([...q.q.matchAll(/(Bóng đá|Cờ vua|Mĩ thuật|Âm nhạc) (\d+) bạn/g)].map((m) => [m[1], +m[2]])); assert.equal(Object.values(clb).reduce((a, b) => a + b, 0), tong, "các câu lạc bộ cộng lại đủ số học sinh");
    return mul(F(clb["Mĩ thuật"], tong), F(100)); } },
  { has: "số học sinh nam, nữ của bốn lớp khối 8 đăng kí tham gia câu lạc bộ đọc sách", right: (q) => { const k = docCotKep(doc(q), "cột kép đọc sách"); assert.deepEqual(k.nhom, ["8A", "8B", "8C", "8D"]);
    return F(k.day["Nữ"].reduce((a, b) => a + b, 0)); } },
  /* Phân tích số liệu thống kê dựa vào biểu đồ */
  { has: "số lượt khách đến một bảo tàng (nghìn lượt) trong các năm từ 2019 đến 2023", right: (q) => { const d = Object.fromEntries(docDoanThang(doc(q), "bảo tàng")); assert.deepEqual(Object.keys(d), ["2019", "2020", "2021", "2022", "2023"]);
    return mul(div(F(d["2023"] - d["2022"]), F(d["2022"])), F(100)); } },
  { has: "Một biểu đồ cột có gốc của trục đứng là 70", right: (q) => { const [g, a, b] = xs(q, /gốc của trục đứng là (\d+) .*trường A có (\d+) học sinh, trường B có (\d+) học sinh/).map(Number);
    const cao = div(F(b - g), F(a - g)), so_ = div(F(b), F(a)); assert.equal(+xs(q, /gấp (\d+) lần trường A/)[0], toNum(cao), "Hùng lấy tỉ lệ chiều cao cột");
    return motLuaChon(q, (o) => o === `Hùng sai: cột B cao gấp ${fmtDec(cao)} lần cột A nhưng ${b} chỉ gấp ${fmtDec(so_)} lần ${a}`); } },
  { has: "số sản phẩm hai cửa hàng A, B bán được trong bốn tuần của tháng 11", right: (q) => { const k = docCotKep(doc(q), "cột kép cửa hàng"), A = k.day["Cửa hàng A"], B = k.day["Cửa hàng B"], tong = (v) => v.reduce((x, y) => x + y, 0);
    assert.deepEqual(k.nhom, ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"]);
    return q.o.map((s) => { let m;
      if (/^Số sản phẩm cửa hàng A bán được tăng dần qua bốn tuần$/.test(s)) return A.every((v, i) => !i || v > A[i - 1]);
      if ((m = /^Ở tuần (\d), cửa hàng B bán được nhiều sản phẩm hơn cửa hàng A$/.exec(s))) return B[m[1] - 1] > A[m[1] - 1];
      if (/^Tính cả bốn tuần, cửa hàng B bán được nhiều sản phẩm hơn cửa hàng A$/.test(s)) return tong(B) > tong(A);
      if ((m = /^Tuần 4, cửa hàng A bán được ít hơn tuần 1 là (\d+) sản phẩm$/.exec(s))) return A[0] - A[3] === +m[1];
      throw new Error("ý lạ: " + s); }); } },
  { has: "Bạn Lan nói: “Năm nay số học sinh đi xe đạp ít hơn năm trước.”", right: (q) => { const [n1, p1, n2, p2] = xs(q, /trường X có (\d+) học sinh, trong đó (\d+)% .* trường có (\d+) học sinh, trong đó (\d+)%/).map(Number);
    const d = (n2 * p2 - n1 * p1) / 100; assert.ok(d > 0 && p2 < p1, "tỉ lệ giảm mà số bạn tăng"); return motLuaChon(q, (o) => o === `Lan nói sai: số bạn đi xe đạp tăng thêm ${d} bạn`); } },
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
assert.deepEqual(BANKS.filter((b) => b.file === "8-toan.js" && /^toan8-ck1-de\d+$/.test(b.id)).map((b) => b.id), DE, "đề cố định cuối kì I nào cũng phải ở from của " + POOL);
for (const id of DE) { const b = bank(id); assert.ok(b, "thiếu " + id); assert.equal(b.questions.length, b.n); run(id, b.questions); }
run(POOL, mine);
assert.equal(dung.size, CHECKS.length, "có mục kiểm tra không khớp câu nào: " + CHECKS.filter((c) => !dung.has(c.has)).map((c) => c.has).join(" | "));
// hình nào cũng được đọc lại; chữ trong hình vừa khung, không đè nhau
const hinh = pool.questions.filter((q) => q.svg);
assert.equal(hinh.filter((q) => hinhDaDoc.has(q.svg)).length, hinh.length, "hình nào cũng được đọc lại: " + hinh.filter((q) => !hinhDaDoc.has(q.svg)).map((q) => q.q.slice(0, 40)).join(" | "));
hinh.forEach((q) => chuHinh(q.svg, q.q.slice(0, 40)));

/* ---------- chữ, số như sách (Toán 8 tập một in năm 2026) ---------- */
const kho = pool.questions;
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null || q.type === "num" ? [] : [].concat(q.ans), q.l || [], q.r || [], (q.rubric || []).map((r) => r.c)).map(String);
// mọi chuỗi chữ của câu (cả chữ trong hình) và lời dặn của đề (LOI_DAN, kiểm tra ở dưới)
const nhuSach = (at, T) => {
  T.forEach((s_) => {
    assert.ok(!/\d\.\d/.test(s_), at + ": số thập phân viết dấu phẩy, không dấu chấm: " + s_);
    assert.ok(!/(^|[\s(\[|:,;=])-\d/.test(s_) && !/ - /.test(s_), at + ": dấu trừ viết “−”: " + s_);
    assert.ok(!/\b\d{4,}\b/.test(s_.replace(/\b(?:19|20)\d\d\b/g, "").replace(/\d+\/\d+/g, "").replace(/,\d+/g, "")), at + ": số từ bốn chữ số ngăn hàng nghìn bằng khoảng trắng: " + s_);
    assert.ok(!/lũy|thỏa|tùy|hóa|khỏe|thủy|Thales\b|Ta-lét|huyện|63 tỉnh|Tổng cục Thống kê/i.test(s_), at + ": chữ như sách (luỹ thừa, thoả mãn, Thalès; không “huyện”): " + s_);
    assert.ok(!/(^|[^A-Za-z])[a-z]\^|\*|<=|>=|!=|\b[a-z]2\b/.test(s_), at + ": kí hiệu như sách (² ³, ·, ≤ ≥ ≠): " + s_);
  });
  // không dùng điều Toán 8 tập một chưa dạy: phân thức, phương trình, định lí Pythagore, tam giác đồng dạng, xác suất, chia đa thức cho đa thức
  const all_ = T.join(" | ");
  assert.ok(!/phân thức|phương trình|Pythagore|Py-ta-go|tam giác đồng dạng|đồng dạng với tam giác|xác suất|hàm số|chia đa thức cho đa thức/i.test(all_), at + ": điều sách Toán 8 tập một chưa dạy");
};
kho.forEach((q) => nhuSach(q.src + ": " + q.q.slice(0, 50), chu(q).concat(q.svg ? texts(q.svg).map((t) => t.t) : [])));

/* ---------- mức độ và ma trận ---------- */
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M), CHU_DE = Object.keys(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => cells.reduce((s_, v) => s_ + v[k], 0)), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(CHU_DE.length, 20, "20 chủ đề theo Bài 1–20");
const nhomCD = (ts) => ts.reduce((s_, t) => s_ + M[t].reduce((a, b) => a + b, 0), 0);
assert.deepEqual([nhomCD(CHU_DE.slice(0, 5)), nhomCD(CHU_DE.slice(5, 9)), nhomCD(CHU_DE.slice(9, 14)), nhomCD(CHU_DE.slice(14, 17)), nhomCD(CHU_DE.slice(17))], [6, 6, 6, 4, 3],
  "Chương I 6 câu, Chương II 6, Chương III 6, Chương IV 4, Chương V 3");
CHU_DE.forEach((t) => assert.ok(("chu-de:8:toan:" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
assert.deepEqual([...new Set(kho.map((q) => q.topic))].sort(), CHU_DE.slice().sort(), "chủ đề của kho đúng chữ của ma trận");
// chủ đề theo tên bài trong mục lục của sách (README của cuốn ở OnUp-Book)
const TEN_BAI = ["Đơn thức", "Đa thức", "Phép cộng và phép trừ đa thức", "Phép nhân đa thức", "Phép chia đa thức cho đơn thức",
  "Hiệu hai bình phương. Bình phương của một tổng hay một hiệu", "Lập phương của một tổng. Lập phương của một hiệu", "Tổng và hiệu hai lập phương",
  "Phân tích đa thức thành nhân tử", "Tứ giác", "Hình thang cân", "Hình bình hành", "Hình chữ nhật", "Hình thoi và hình vuông",
  "Định lí Thalès trong tam giác", "Đường trung bình của tam giác", "Tính chất đường phân giác của tam giác", "Thu thập và phân loại dữ liệu",
  "Biểu diễn dữ liệu bằng bảng, biểu đồ", "Phân tích số liệu thống kê dựa vào biểu đồ"];
assert.deepEqual(CHU_DE, TEN_BAI, "chủ đề theo tên Bài 1–20, đúng thứ tự");
const SACH_README = path.join(__dirname, "../../OnUp-Book/lop-8/toan-8-tap-1/README.md");
if (fs.existsSync(SACH_README)) { const md = fs.readFileSync(SACH_README, "utf8"); TEN_BAI.forEach((t, i) => assert.ok(md.includes("Bài " + (i + 1) + ". " + t + " |"), "tên Bài " + (i + 1) + " như mục lục trong README của sách: " + t)); }
// mỗi ô rút 1 câu và có đúng 4 câu: một câu ở mỗi đề cố định, hai câu riêng; ô không rút thì không có câu
Object.entries(M).forEach(([t, v]) => v.forEach((k, i) => {
  const have = kho.filter((q) => q.topic === t && q.lv === i + 1);
  assert.ok(k <= 1, `ô (${t}, mức ${i + 1}) rút ${k} câu: mỗi ô rút nhiều nhất 1 câu`);
  if (!k) { assert.equal(have.length, 0, `ô (${t}, mức ${i + 1}) không rút mà kho có ${have.length} câu`); return; }
  assert.deepEqual(DE.concat(POOL).map((s_) => have.filter((q) => q.src === s_).length), [1, 1, 2], `ô (${t}, mức ${i + 1})`);
}));
// câu tự luận chỉ ở hai ô Vận dụng: phân tích đa thức thành nhân tử (Bài 9), chứng minh tứ giác là hình bình hành (Bài 12); mỗi đề cố định 2 câu
const tuLuan = kho.filter((q) => q.type === "essay");
assert.deepEqual([...new Set(tuLuan.map((q) => q.topic + " · " + q.lv))].sort(), [CHU_DE[8] + " · 3", CHU_DE[11] + " · 3"].sort(), "câu tự luận chỉ ở ô Vận dụng của Bài 9, 12");
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

/* ---------- đề bài không trùng câu nào khác trong data/banks/8-toan.js (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const gocChu = (s_) => String(s_).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const deBai = BANKS.filter((b) => b.file === "8-toan.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: gocChu(q.q) })));
deBai.forEach((d) => { const cungDe = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cungDe, [d.at], "đề bài trùng: " + cungDe.join(", ")); });

/* ---------- dò lộ đáp án (Rút ra N5, N24, N8, RS9; như tests/toan7-ck1.js) giữa mọi cặp câu của kho: đề “Ôn chủ đề” rút chung mọi câu của
   một chủ đề (cả hai câu cùng ô), đề ngẫu nhiên rút chung câu của các chủ đề khác; lời dặn (note) hiện ở màn mở đề nên cũng là “câu
   kia”. Đáp án là số nguyên (từ 10) chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”, “bằng”, “được”); số đo góc (“52°”), số thập
   phân, phân số, số âm, số có đơn vị tìm ở vị trí kết quả; cặp nối: câu kia có cả hai vế; đáp án bằng chữ (cả đa thức) có ở câu kia thì chỉ
   in ra khi chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM. ---------- */
const val = (s_) => +String(s_).replace(/\s/g, "");
const KQ = "(?:=|(?:^|[\\s(])(?:là|bằng|được))\\s+";
const SAU = "(?!\\d|,\\d|\\/|°|%|[a-z⁰¹²³⁴⁵⁶⁷⁸⁹(]|\\s*[·+−×:](?:\\s|\\d|\\())"; // số đứng ngay trước một phép tính, một biến là thừa số, hệ số
const esc = (s_) => s_.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
const soKQ = (s_) => [...String(s_).matchAll(new RegExp(KQ + "(\\d{1,3}(?: \\d{3})*)" + SAU, "gu"))].map((m) => val(m[1]));
const kqLa = (s_, a) => new RegExp(KQ + esc(a) + (/°$/.test(a) ? "(?!\\d)" : SAU), "u").test(s_);
const ten = new Map();
DE.forEach((id) => bank(id).questions.forEach((q, i) => ten.set(q.q, id.replace("toan8-ck1-", "") + "#" + (i + 1))));
mine.forEach((q, i) => ten.set(q.q, "own#" + (i + 1)));
const LOI_DAN = [...new Set(DE.concat(POOL).map((id) => bank(id).note))].map((note, i) => ({ q: note, x: "", note: true, ten: "note" + (i + 1) }));
LOI_DAN.forEach((d) => nhuSach(d.ten, [d.q]));
const doLo = (qs, name, notes) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    const so_ = [], kq = [], cum = [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const them = (a) => { a = String(a).replace(/^-/, "−");
      const m = /^(\d{1,3}(?: \d{3})*)(?: ([^\d\s]+))?$/.exec(a);
      if (m && !/°$/.test(a)) so_.push(val(m[1]));
      else if (/^−?\d[\d ,/]*(?:°|\s[^\d\s]+)?$/.test(a)) kq.push(a.replace(/ [^\d\s]+$/, ""));
      else if (a.length >= 2) cum.push(a); };
    if (q.type === "num") them(typeof q.ans === "number" ? (q.unit === "°" ? q.ans + "°" : fmtDec(F(Math.round(q.ans * 1000), 1000))) : q.ans);
    else if (q.type === "fill") them(q.ans[0] + (/___°/.test(q.q) ? "°" : "")); else if (q.type === "mc") them(q.o[0]);
    qs.concat(notes || []).forEach((p) => {
      if (p === q) return;
      const C = p.note ? [p.q] : chu(p).concat(p.svg ? texts(p.svg).map((t) => t.t) : []), T = C.map((s_) => s_.toLowerCase()), at = `${name(p)} lộ đáp án ${name(q)}: `;
      so_.filter((x) => x >= 10 && C.flatMap(soKQ).includes(x)).forEach((x) => lo.push(at + x));
      kq.filter((a) => C.some((s_) => kqLa(s_, a))).forEach((a) => lo.push(at + a));
      cap.filter(([l, r]) => T.some((t) => t.includes(l.toLowerCase()) && t.includes(r.toLowerCase()))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      cum.filter((s_) => { const re = new RegExp("(?<![\\p{L}\\p{N}⁰¹²³⁴⁵⁶⁷⁸⁹])" + esc(s_.toLowerCase()) + "(?![\\p{L}\\p{N}⁰¹²³⁴⁵⁶⁷⁸⁹])", "u"); return T.some((t) => re.test(t)); }).forEach((s_) => chuLo.push(at + s_));
    });
  });
  return { lo, chuLo };
};
const tenCau = (q) => (q.note ? q.ten : ten.get(q.q));
const { lo: loDA, chuLo } = doLo(kho, tenCau, LOI_DAN);
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu khác của kho (xem tay):\n" + chuLo.join("\n"));
const DA_XEM = [
  // dòng của tests/soat-nhap.js (dò lộ chặt hơn: cả số dưới 10): hệ số, số mũ, độ dài cho sẵn của câu khác, số trong phép tính của lời giải; không lộ đáp án
  "toan8-ck1-de1#3 → toan8-ck1-de1#2: 3",
  "toan8-ck1-de1#6 → toan8-ck1-de1#2: 3",
  "toan8-ck1-de1#11 → toan8-ck1-de1#2: 3",
  "toan8-ck1-de1#20 → toan8-ck1-de1#2: 3",
  "toan8-ck1-de1#22 → toan8-ck1-de1#2: 3",
  "toan8-ck1-de1#15 → toan8-ck1-de1#20: 4",
  "toan8-ck1-de2#22 → toan8-ck1-de2#1: 6",
  "toan8-ck1-de2#22 → toan8-ck1-de2#18: 5",
  "toan8-ck1-de2#3 → toan8-ck1-de2#19: 3",
  "toan8-ck1-de2#12 → toan8-ck1-de2#19: 3",
  "toan8-ck1-de2#3 → toan8-ck1-de2#22: 4",
  "toan8-ck1-de2#20 → toan8-ck1-de2#22: 4",
  "toan8-ck1-de2#25 → toan8-ck1-de2#22: 4",
  "toan8-ck1-de2#22 → toan8-ck1-de2#24: 9",
  "toan8-ck1-ngau-nhien#2 → toan8-ck1-ngau-nhien#6: 4",
  "toan8-ck1-ngau-nhien#3 → toan8-ck1-ngau-nhien#6: 4",
  "toan8-ck1-ngau-nhien#5 → toan8-ck1-ngau-nhien#6: 4",
  "toan8-ck1-ngau-nhien#10 → toan8-ck1-ngau-nhien#6: 4",
  "toan8-ck1-ngau-nhien#14 → toan8-ck1-ngau-nhien#6: 4",
  "toan8-ck1-ngau-nhien#15 → toan8-ck1-ngau-nhien#6: 4",
  "toan8-ck1-ngau-nhien#35 → toan8-ck1-ngau-nhien#6: 4",
  "toan8-ck1-ngau-nhien#15 → toan8-ck1-ngau-nhien#39: 7",
  "toan8-ck1-ngau-nhien#16 → toan8-ck1-ngau-nhien#39: 7",
  "toan8-ck1-ngau-nhien#44 → toan8-ck1-ngau-nhien#39: 7",
  "toan8-ck1-ngau-nhien#12 → toan8-ck1-ngau-nhien#44: 8",
  "toan8-ck1-ngau-nhien#35 → toan8-ck1-ngau-nhien#44: 8",
  "toan8-ck1-ngau-nhien#43 → toan8-ck1-ngau-nhien#44: 8",
  "toan8-ck1-de2#20 → toan8-ck1-de1#20: 4",
  "toan8-ck1-ngau-nhien#2 → toan8-ck1-de2#1: 6",
  "toan8-ck1-de1#20 → toan8-ck1-de2#19: 3",
  "toan8-ck1-ngau-nhien#37 → toan8-ck1-de2#19: 3",
  "toan8-ck1-ngau-nhien#39 → toan8-ck1-de2#19: 3",
  "toan8-ck1-de2#3 → toan8-ck1-ngau-nhien#6: 4",
  "toan8-ck1-de2#20 → toan8-ck1-ngau-nhien#39: 7",
  "toan8-ck1-de1#18 → toan8-ck1-de1#25: 35", // góc OAB = 35° trong lời giải câu hình thoi; câu kia hỏi phần trăm lượt khách tăng
  "toan8-ck1-ngau-nhien#24 → toan8-ck1-ngau-nhien#47: 24", // (47 + 5 − 28) = 24 trong lời giải; câu kia hỏi phần trăm của biểu đồ hình quạt
];
assert.deepEqual(chuLo.filter((s_) => !DA_XEM.includes(s_)), [], "đáp án bằng chữ có ở câu khác của kho đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loDA, [], "lộ đáp án:\n" + loDA.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 75°”, “bằng 1 960”, “là 5,5”, cả hai vế một cặp nối; không bắt hệ số, thừa số
{ const tim = (has) => { const q = kho.find((q_) => q_.q.includes(has)); assert.ok(q, "bộ dò tự thử: không thấy câu “" + has + "”"); return q; }, gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const khac = tim(TU_THU.khac), thuLo = (qs) => doLo(qs, (q) => q.q.slice(0, 10).replace(/:/g, "")).lo.map((s_) => s_.replace(/^.*? lộ đáp án [^:]*: /, ""));
  TU_THU.lo.forEach(([has, x, want]) => assert.deepEqual(thuLo([tim(has), gia(khac, x)]), want, "bộ dò tự thử: " + x)); }

/* ---------- không gần trùng câu của kho Toán lớp 7, lớp 9 (lời giao việc; Rút ra N25, như tests/toan7-ck1.js): đề bài cùng lựa chọn, ô nối,
   ô sắp xếp có từ 4 cặp từ liền nhau chung với một câu của data/banks/7-toan.js, 9-toan.js và số cặp chung từ một nửa số cặp của câu ít cặp
   hơn thì báo. Cặp từ tính cả số (cùng một dạng bài với số khác không phải là gần trùng); bỏ cách hỏi chung của đề Toán (CUM), cặp của nhãn
   chủ đề và cặp có ở từ 3% số câu của ba file. ---------- */
{
  const CUM = ["mỗi ý sau đúng hay sai", "viết kết quả dưới dạng phân số", "khẳng định nào dưới đây đúng", "trong hình vẽ", "số đo góc", "như hình vẽ", "biểu đồ đoạn thẳng",
    "biểu đồ hình quạt tròn", "biểu đồ cột kép", "biểu đồ cột", "trong hình vẽ cho biết", "kết quả của phép", "giá trị của biểu thức", "phân tích đa thức", "thành nhân tử", "tia phân giác của góc",
    "nối mỗi", "ở cột trái với", "của nó ở cột phải", "ở cột phải", "mỗi đẳng thức sau", "đúng hay sai", "cắt cạnh bc tại d"];
  const cap2 = (s_) => { let t = String(s_).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/(\d),(?=\d)/g, "$1_").replace(/[^\p{L}\p{N}\s|_⁰¹²³⁴⁵⁶⁷⁸⁹]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|") && c.split(" ").some((x) => x.length >= 2)); };
  const cauCua = (file) => BANKS.filter((b) => b.file === file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id));
  const khac = cauCua("7-toan.js").concat(cauCua("9-toan.js")), ca = khac.concat(kho), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !nhan.has(c) && (df[c] || 0) < 0.03 * ca.length)); };
  const PK = khac.map((p) => [p, capAm(p)]);
  const ganTrung = kho.flatMap((q) => { const c = capAm(q); return PK.map(([p, d]) => { const chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q.q)} ~ ${p.q.slice(0, 50)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho Toán 7, Toán 9:\n" + ganTrung.join("\n"));
  assert.deepEqual(ganTrung, [], "đề bài gần trùng câu của kho Toán 7, Toán 9");
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (bỏ dấu, gộp nguyên âm), nếu có ----------
   Chuỗi 8 từ liền nhau của mọi trường chữ (đề bài, lựa chọn, lời giải, thang chấm, chữ trong hình) không có trong sách; cụm từ chung của
   môn (tên bài, cách hỏi chuẩn, tên hằng đẳng thức, cách nêu hình) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ. Số
   liệu: số riêng của một câu (số thập phân, số từ 11 trở lên, trừ 100, 1 000, 180, 90, 360, 60 và số có ở từ 5% số trang; không tính số
   trong phân số) không có từ ba số cùng ở một trang của Toán 8 tập một (dò bối cảnh, số liệu của bài tập, ví dụ trong sách; DO_SACH=1 in
   các trang có từ hai số chung để xem). */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
// tra nhanh chuỗi k từ (chép từ tests/khtn7-ck1.js): băm mọi chuỗi k từ của chữ đã chuẩn hoá, chỉ so thật (includes) khi băm có
const traChu = (() => {
  const bam = (w, k) => {
    const A = new Uint32Array(w.length), B = new Uint32Array(w.length), n_ = Math.max(0, w.length - k + 1), H = new Float64Array(n_);
    for (let i = 0; i < w.length; i++) { let a = 0x811c9dc5, b = 0x1b873593; const t = w[i]; for (let j = 0; j < t.length; j++) { const x = t.charCodeAt(j); a = Math.imul(a ^ x, 0x01000193); b = Math.imul(b ^ x, 0x5bd1e995); } A[i] = a; B[i] = b; }
    for (let i = 0; i < n_; i++) { let a = 0x9e3779b9, b = 0x85ebca6b; for (let j = i; j < i + k; j++) { a = Math.imul(a ^ A[j], 0x01000193); b = Math.imul(b ^ B[j], 0x5bd1e995); } H[i] = (a >>> 0) * 2097152 + (b >>> 11); }
    return H;
  };
  const co = (H, h) => { let l = 0, r = H.length - 1; while (l <= r) { const m = (l + r) >> 1; if (H[m] === h) return true; if (H[m] < h) l = m + 1; else r = m - 1; } return false; };
  const chuMot = new Map(), chuDs = new WeakMap();
  const bang_ = (m, k, tao) => { if (!m.has(k)) m.set(k, tao().sort()); return m.get(k); };
  return {
    co: (s, c) => { const w = c.split(" "); if (!chuMot.has(s)) chuMot.set(s, new Map()); return co(bang_(chuMot.get(s), w.length, () => bam(s.split(" "), w.length)), bam(w, w.length)[0]) && s.includes(" " + c + " "); },
    loc: (ds, c) => {
      const w = c.split(" "), k = w.length;
      if (!chuDs.has(ds)) chuDs.set(ds, new Map());
      const H = bang_(chuDs.get(ds), k, () => { const hs = ds.map((o) => bam(o.s.split(" "), k)), ra = new Float64Array(hs.reduce((a, h) => a + h.length, 0)); let i = 0; hs.forEach((h) => { ra.set(h, i); i += h.length; }); return ra; });
      return co(H, bam(w, k)[0]) ? ds.filter((o) => o.s.includes(" " + c + " ")) : [];
    },
  };
})();
const khongDau = nhoChuoi((s_) => String(s_).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim());
const TU_CHUNG = [...TEN_BAI, "mỗi ý sau đúng hay sai", "viết kết quả dưới dạng phân số", "khẳng định nào dưới đây đúng", "trong hình vẽ",
  "phân tích đa thức thành nhân tử", "phân tích các đa thức sau thành nhân tử", "đặt nhân tử chung", "nhóm hạng tử", "sử dụng hằng đẳng thức",
  "bình phương của một tổng", "bình phương của một hiệu", "hiệu hai bình phương", "lập phương của một tổng", "lập phương của một hiệu", "tổng hai lập phương", "hiệu hai lập phương",
  "đơn thức thu gọn", "đa thức thu gọn", "hai đơn thức đồng dạng", "hạng tử đồng dạng", "giá trị của đa thức", "giá trị của biểu thức", "không phụ thuộc vào giá trị của biến",
  "tổng các góc của một tứ giác bằng 360°", "hai đường chéo cắt nhau tại trung điểm của mỗi đường", "hai cạnh đối song song", "hai cạnh đối bằng nhau", "hai góc kề một đáy bằng nhau",
  "định lí thalès đảo", "theo định lí thalès", "đường trung bình của tam giác", "tia phân giác của góc", "số liệu rời rạc", "số liệu liên tục", "có thể sắp thứ tự", "không thể sắp thứ tự",
  "biểu đồ cột kép", "biểu đồ đoạn thẳng", "biểu đồ hình quạt tròn", "biểu đồ tranh", "gốc của trục đứng", "hằng đẳng thức đáng nhớ và ứng dụng", "dữ liệu và biểu đồ",
  "cắt nhau tại trung điểm của mỗi đường", "cắt nhau tại trung điểm mỗi đường", "tỉ số của hai đoạn thẳng", "nối mỗi phép tính ở cột trái với kết quả của nó ở cột phải",
  "nối mỗi biểu thức ở cột trái với biểu thức bằng nó ở cột phải", "tính giá trị của biểu thức", "nhận xét nào dưới đây đúng",
  "tính độ dài đoạn thẳng", "tính độ dài cạnh", "tính số đo góc", "cho tam giác abc có", "trong hình vẽ, tam giác abc có", "tia phân giác của góc a cắt cạnh bc tại d",
  "theo tính chất đường phân giác", "có thêm điều kiện nào dưới đây thì là", "hai đường chéo cắt nhau tại o như hình vẽ", "trong hình vẽ, abcd là hình",
  // cách nêu hình chuẩn của sách và mọi đề hình học (không phải câu văn riêng của sách)
  "hai đường chéo cắt nhau tại o", "tam giác abc vuông tại a", "là trung điểm của", "lần lượt là trung điểm của", "cắt cạnh bc tại d"]
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s_, k) => { let t = " " + khongDau(s_) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const chuCau = (q) => chu(q).concat(q.svg ? [texts(q.svg).map((t) => t.t).join(" ")] : []);
if (SACH.length) {
  assert.ok(SACH.some((f) => /toan-8-tap-1/.test(f)), "OnUp-Book có Toán 8 tập một");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  // mọi trường chữ của câu, cả chữ trong hình, và lời dặn của đề
  const bao = (k) => kho.flatMap((q) => chuCau(q).flatMap((s_) => chuoi(s_, k).filter((c) => traChu.co(sach, c)).map((c) => `${ten.get(q.q)}: ${c}`)))
    .concat(LOI_DAN.flatMap((d) => chuoi(d.q, k).filter((c) => traChu.co(sach, c)).map((c) => `${d.ten}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  // số liệu riêng của từng câu so với từng trang của Toán 8 tập một
  const trang = fs.readFileSync(SACH.find((f) => /toan-8-tap-1/.test(f)), "utf8").split(/(?==== page-\d+ · )/).map((p) => ({ ten: (/trang in (\d+)/.exec(p) || [])[1], so: new Set((p.match(/\d+(?:[ .]\d{3})*(?:,\d+)?/g) || []).map((x) => x.replace(/[ .](?=\d{3})/g, ""))) }));
  // số có ở từ 5% số trang là số thường gặp, không phải số liệu riêng của một bài trong sách
  const dfSo = {}; trang.forEach((p) => p.so.forEach((x) => (dfSo[x] = (dfSo[x] || 0) + 1)));
  const soRieng = (q) => [...new Set((chuCau(q).join(" ").replace(/\d+\/\d+/g, " ").match(/\d{1,3}(?: \d{3})+(?:,\d+)?|\d+(?:,\d+)?/g) || []).map((x) => x.replace(/ /g, "")).filter((x) => (/,/.test(x) || (+x > 10 && ![100, 1000, 180, 90, 360, 60].includes(+x))) && (dfSo[x] || 0) < 0.05 * trang.length))];
  const soChung = kho.flatMap((q) => { const s_ = soRieng(q); return trang.map((p) => [p.ten, s_.filter((x) => p.so.has(x))]).filter(([, c]) => c.length >= 2).map(([t, c]) => `${ten.get(q.q)} ~ trang ${t}: ${c.join("; ")} (câu có ${s_.length} số)`); });
  if (process.env.DO_SACH) console.log("Trang sách có từ hai số liệu chung với một câu (xem tay):\n" + soChung.join("\n"));
  const SO_XEM = [
  ];
  assert.deepEqual(soChung.filter((s_) => /: (.+) \(/.exec(s_)[1].split("; ").length >= 3 && !SO_XEM.includes(s_)), [], "trang sách có từ ba số liệu chung với một câu");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");

/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác ---------- */
{
  const khac = BANKS.filter((b) => !b.pool && b.file !== "8-toan.js").flatMap((b) => b.questions.map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " })))
    .concat(BANKS.filter((b) => b.pool && b.file !== "8-toan.js").flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " }))));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s_) => chuoi(s_, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q.q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại hoặc đọc lại hình (" + DE.map((id) => bank(id).questions.length).join(" + ") + " câu của " + DE.length + " đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + kho.length + " câu, " + hinh.length + " hình, ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề; đáp án đúng dài nhất ở " + daiNhat + ", ngắn nhất ở " + nganNhat + " trên " + mcs.length + " câu nhiều lựa chọn.");
console.log("MATH OK");
