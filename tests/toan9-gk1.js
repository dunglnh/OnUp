// Tính lại đáp án ngân hàng Toán 9 giữa kì I (data/banks/9-toan.js): hai đề cố định toan9-gk1-de1, toan9-gk1-de2 và các câu riêng
// của đề ngẫu nhiên toan9-gk1-ngau-nhien (Phiên N9-gk1-toan; Toán 9 tập một, Bài 1–6 và Bài 11–12). Mỗi câu: kiểm tra đề có đúng số
// liệu (has) rồi so đáp án với kết quả tính bằng code: trắc nghiệm o[0], điền khuyết ans[0], đúng/sai 4 ý a (4 ý), trả lời bằng số
// ans (và tol, lời giải ghi đúng đáp số), nối cột r[i] của từng ô l[i], sắp xếp thứ tự o; tự luận: các bước trong thang chấm và đáp án
// gợi ý. Số hữu tỉ tính chính xác ({n, d}); biểu thức có căn bậc hai, tỉ số lượng giác (cả "sin² 30°") tính bằng số thực và so theo giá
// trị. Hệ hai phương trình bậc nhất hai ẩn giải lại bằng định thức (số hữu tỉ; hai vế có thể có ngoặc, tích có hạng tử xy triệt tiêu),
// bất phương trình bậc nhất một ẩn giải lại từ hai vế, phương trình tích và phương trình chứa ẩn ở mẫu tìm nghiệm bằng cách thử mọi số
// hữu tỉ có mẫu nhỏ (bỏ giá trị làm mẫu bằng 0), mệnh đề về bất đẳng thức thử với nhiều bộ số. Câu có hình: đọc toạ độ trong hình (điểm có
// nhãn, đoạn thẳng, kí hiệu góc vuông, độ dài và số đo góc ghi trong hình), kiểm tra hình đúng tỉ lệ (độ dài ghi trong hình tỉ lệ với độ dài
// vẽ, góc vẽ bằng số đo ghi, góc vuông có kí hiệu ở đúng đỉnh) rồi mới tính. Cuối cùng kiểm tra mức độ và ma trận (mỗi ô có ít nhất gấp
// đôi số câu ô đó rút, ngoài mỗi đề cố định vẫn đủ; rút thử nhiều lần ra đúng 10 Biết, 8 Hiểu, 7 Vận dụng; đã làm hết một đề cố định thì
// không gặp lại câu của đề đó), chữ chủ đề như kho cuối kì I, đáp án đúng của câu trắc nghiệm không dài hơn hẳn lựa chọn sai và không hay
// là lựa chọn dài nhất, ngắn nhất, câu đúng/sai 4 ý không lặp kiểu Đ/S, đáp án không lặp chữ của nhãn chủ đề, dò lộ đáp án giữa các câu
// rút được cùng lúc (Rút ra N5, N24, N8) và giữa câu cùng chủ đề của kho này với kho cuối kì I (đề “Ôn chủ đề” rút chung), đáp án không
// trùng câu cùng chủ đề của kho cuối kì I, đề bài không gần trùng câu của kho cuối kì I (cặp hai âm tiết chung), nếu có ../OnUp-Book
// thì so chữ của câu với chữ OCR của Toán 9 tập một (không chuỗi 8 từ nào trùng), so với câu của mọi kho khác (không chuỗi 8 từ nào
// trùng). Số câu, số đề lấy từ danh mục (data/banks/index.js).
// Chạy: node tests/toan9-gk1.js → in MATH OK. DO_LO=1: in đáp án bằng chữ có ở câu rút được cùng lúc và ở câu cùng chủ đề của kho cuối
// kì I; DO_SACH=1: in chuỗi 6 từ và biểu thức trùng chữ OCR của sách để xem tay; DO_KHO=1: in chuỗi 6 từ trùng câu của kho khác.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan9-gk1-ngau-nhien";

/* ---------- số: hữu tỉ chính xác { n, d } (d > 0, tối giản); số thực (number) khi có căn không khai được, π, tỉ số lượng giác ---------- */
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const F = (n, d) => { d = d === undefined ? 1 : d; assert.ok(Number.isInteger(n) && Number.isInteger(d) && d !== 0, `phân số lạ ${n}/${d}`); if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return { n: n / g, d: d / g }; };
const isR = (v) => typeof v === "object";
const toNum = (v) => (isR(v) ? v.n / v.d : v);
const both = (a, b, fr, fl) => (isR(a) && isR(b) ? fr(a, b) : fl(toNum(a), toNum(b)));
const add = (a, b) => both(a, b, (a, b) => F(a.n * b.d + b.n * a.d, a.d * b.d), (x, y) => x + y);
const neg = (a) => (isR(a) ? F(-a.n, a.d) : -a);
const sub = (a, b) => add(a, neg(b));
const mul = (a, b) => both(a, b, (a, b) => F(a.n * b.n, a.d * b.d), (x, y) => x * y);
const div = (a, b) => { assert.ok(toNum(b) !== 0, "chia cho 0"); return both(a, b, (a, b) => F(a.n * b.d, a.d * b.n), (x, y) => x / y); };
const pw = (a, k) => { assert.ok(Number.isInteger(k) && k >= 0, "số mũ lạ " + k); let v = F(1); for (let i = 0; i < k; i++) v = mul(v, a); return v; };
const isqrt = (n) => { if (n < 0) return null; const r = Math.round(Math.sqrt(n)); return r * r === n ? r : null; };
const icbrt = (n) => { const r = Math.round(Math.cbrt(n)); return r * r * r === n ? r : null; };
const sqrt = (a) => { assert.ok(toNum(a) >= 0, "căn bậc hai của số âm"); if (isR(a)) { const p = isqrt(a.n), q = isqrt(a.d); if (p !== null && q !== null) return F(p, q); } return Math.sqrt(toNum(a)); };
const cbrt = (a) => { if (isR(a)) { const p = icbrt(a.n), q = icbrt(a.d); if (p !== null && q !== null) return F(p, q); } return Math.cbrt(toNum(a)); };
const RAD = Math.PI / 180;
const TRIG = { sin: (d) => Math.sin(d * RAD), cos: (d) => Math.cos(d * RAD), tan: (d) => Math.tan(d * RAD), cot: (d) => 1 / Math.tan(d * RAD) };
const cmp = (a, b) => (isR(a) && isR(b) ? a.n * b.d - b.n * a.d : Math.abs(toNum(a) - toNum(b)) <= 1e-9 * Math.max(1, Math.abs(toNum(a))) ? 0 : toNum(a) - toNum(b));
const eq = (a, b) => cmp(a, b) === 0;
const isInt = (a) => isR(a) && a.d === 1;
// đọc một số viết như trong đề: "−3/7", "3", "1 800", "2,35", "−0,27"
const fr = (s) => {
  s = String(s).trim().replace(/[−–]/g, "-").replace(/\s+/g, " ");
  let m = /^(-?\d+)\/(-?\d+)$/.exec(s);
  if (m) return F(+m[1], +m[2]);
  m = /^(-?)(\d{1,3}(?: \d{3})+|\d+)(?:,(\d+))?$/.exec(s);
  if (m) { const ip = m[2].replace(/ /g, ""), fp = m[3] || ""; const v = F(+(ip + fp), 10 ** fp.length); return m[1] ? neg(v) : v; }
  throw new Error("không đọc được số: " + s);
};
const thou = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const fmtInt = (a) => { assert.ok(isInt(a), "không phải số nguyên: " + JSON.stringify(a)); return (a.n < 0 ? "−" : "") + thou(String(Math.abs(a.n))); };
// phân số viết như trong đề, dấu "−" Unicode ("−3/2"); fmtAns: dạng ans của câu trả lời bằng số ("-3/2", dấu trừ ASCII; số nguyên, số thập phân là number)
const fmtF = (a) => (isInt(a) ? fmtInt(a) : (a.n < 0 ? "−" : "") + Math.abs(a.n) + "/" + a.d);
const fmtAns = (a) => { if (isInt(a)) return a.n; let d = a.d; while (d % 2 === 0) d /= 2; while (d % 5 === 0) d /= 5; return d === 1 ? a.n / a.d : a.n + "/" + a.d; };
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
// làm tròn số thực x đến k chữ số sau dấu phẩy (k = 0: đến hàng đơn vị), theo quy tắc của sách (chữ số bỏ đi ≥ 5 thì tăng); trả về number
// số thực (có căn, π, tỉ số lượng giác) mà chữ số bỏ đi gần đúng bằng 5 thì đề không nên hỏi làm tròn (máy tính khác nhau cho kết quả khác)
const lamTron = (x, k) => {
  const p = 10 ** k, t = Math.abs(toNum(x)) * p;
  if (!isR(x)) assert.ok(Math.abs(t - Math.floor(t) - 0.5) > 1e-4, "số ở sát ranh giới làm tròn: " + toNum(x));
  return Math.sign(toNum(x)) * Math.floor(t + 0.5 + 1e-9) / p;
};

/* ---------- bộ đọc biểu thức viết như trong đề ----------
   số (số thập phân có dấu phẩy, số ngăn hàng nghìn), + − · × : / và ngoặc, lũy thừa ² ³ ⁴ hoặc ^, căn √ và ∛ (áp vào số, chữ, π hoặc
   ngoặc ngay sau), |…| (giá trị tuyệt đối), π, sin cos tan cot của số đo độ ("sin 30°", bình phương viết "sin² 30°"), nhân ngầm ("2√3",
   "3x", "(√3 + 1)(√3 − 1)");
   chữ cái lấy giá trị trong vars. "/" và ":" cùng mức với "·". Kết quả là số hữu tỉ chính xác khi được. */
function ev(src, vars) {
  const s = String(src).replace(/[−–]/g, "-").replace(/[×]/g, "·").replace(/ /g, " ");
  const toks = []; let i = 0;
  const SUP = { "²": 2, "³": 3, "⁴": 4 };
  while (i < s.length) {
    const c = s[i], rest = s.slice(i);
    if (c === " ") { i++; continue; }
    let m = /^\d{1,3}(?: \d{3})+(?:,\d+)?(?![\d])/.exec(rest) || /^\d+(?:,\d+)?/.exec(rest);
    if (m) { toks.push({ t: "n", v: fr(m[0]) }); i += m[0].length; continue; }
    m = /^(sin|cos|tan|cot)(²?)/.exec(rest);
    if (m) { toks.push({ t: "f", v: m[1], sq: m[2] === "²" }); i += m[0].length; continue; }
    if (SUP[c]) { toks.push({ t: "^" }, { t: "n", v: F(SUP[c]) }); i++; continue; }
    if ("+-·:/()^√∛|°π".includes(c)) { toks.push({ t: c }); i++; continue; }
    if (/[a-zA-Z]/.test(c)) { assert.ok(vars && vars[c] !== undefined, "biến lạ " + c + " trong " + src); toks.push({ t: "n", v: vars[c] }); i++; continue; }
    throw new Error("kí tự lạ “" + c + "” trong " + src);
  }
  let p = 0, inAbs = 0;
  const peek = () => toks[p], next = () => toks[p++];
  const startsAtom = (t) => t && (t.t === "n" || t.t === "(" || t.t === "√" || t.t === "∛" || t.t === "π" || t.t === "f" || (t.t === "|" && !inAbs));
  const atom = () => {
    const t = next(); assert.ok(t, "thiếu số trong " + src);
    if (t.t === "n") return t.v;
    if (t.t === "π") return Math.PI;
    if (t.t === "(") { const v = expr(); assert.equal((next() || {}).t, ")", "thiếu ngoặc đóng trong " + src); return v; }
    if (t.t === "|") { inAbs++; const v = expr(); inAbs--; assert.equal((next() || {}).t, "|", "thiếu | trong " + src); return toNum(v) < 0 ? neg(v) : v; }
    if (t.t === "√") return sqrt(power());
    if (t.t === "∛") return cbrt(power());
    if (t.t === "f") { const a = atom(); assert.equal((next() || {}).t, "°", "tỉ số lượng giác cần số đo độ trong " + src); const v = TRIG[t.v](toNum(a)); return t.sq ? v * v : v; }
    throw new Error("không hiểu " + src);
  };
  const power = () => { const v = atom(); if (peek() && peek().t === "^") { next(); const k = unary(); assert.ok(isInt(k), "số mũ phải là số nguyên"); return pw(v, k.n); } return v; };
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

/* ---------- phương trình, hệ phương trình, bất phương trình ---------- */
// "2x + 3y = 7" → { a, b, c } với ax + by = c (hai vế có thể có chữ, ngoặc)
const ptHai = (s, X, Y) => {
  X = X || "x"; Y = Y || "y";
  const [L, R] = s.split(" = "); assert.ok(R !== undefined, "không phải phương trình: " + s);
  const f = (x, y) => sub(ev(L, { [X]: x, [Y]: y }), ev(R, { [X]: x, [Y]: y }));
  const c0 = f(F(0), F(0)), a = sub(f(F(1), F(0)), c0), b = sub(f(F(0), F(1)), c0);
  assert.ok(eq(sub(f(F(2), F(3)), c0), add(mul(F(2), a), mul(F(3), b))), "phương trình không bậc nhất: " + s);
  return { a, b, c: neg(c0) };
};
// hệ "{2x + y = 5; 3x − y = 10}" → nghiệm duy nhất { x, y }, hoặc "vô nghiệm", "vô số nghiệm"
const giaiHe = (s, X, Y) => {
  const m = /\{(.+?); (.+?)\}/.exec(s); assert.ok(m, "không thấy hệ trong: " + s);
  const p = ptHai(m[1], X, Y), q = ptHai(m[2], X, Y);
  const D = sub(mul(p.a, q.b), mul(q.a, p.b)), Dx = sub(mul(p.c, q.b), mul(q.c, p.b)), Dy = sub(mul(p.a, q.c), mul(q.a, p.c));
  if (toNum(D) !== 0) return { x: div(Dx, D), y: div(Dy, D) };
  return toNum(Dx) === 0 && toNum(Dy) === 0 ? "vô số nghiệm" : "vô nghiệm";
};
const capSo = (v) => "(" + fmtF(v.x) + "; " + fmtF(v.y) + ")";
// phương trình một ẩn x (có thể có ẩn ở mẫu): mọi nghiệm hữu tỉ p/q với |p| ≤ 300, q ≤ 12 (giá trị làm mẫu bằng 0 thì bỏ)
const nghiem = (s, X) => {
  X = X || "x";
  const [L, R] = s.split(" = "); assert.ok(R !== undefined, "không phải phương trình: " + s);
  const out = [];
  for (let q = 1; q <= 12; q++) for (let p = -300; p <= 300; p++) {
    if (gcd(p, q) !== 1) continue;
    let v; try { v = sub(ev(L, { [X]: F(p, q) }), ev(R, { [X]: F(p, q) })); } catch (e) { if (/chia cho 0/.test(e.message)) continue; throw e; }
    if (toNum(v) === 0) out.push(F(p, q));
  }
  return out.sort((a, b) => toNum(a) - toNum(b));
};
// giá trị làm mẫu của phương trình bằng 0 (điều kiện xác định: x khác các số này), tìm trong cùng tập số như trên
const loaiTru = (s, X) => {
  X = X || "x"; const [L, R] = s.split(" = "), out = [];
  for (let q = 1; q <= 4; q++) for (let p = -60; p <= 60; p++) {
    if (gcd(p, q) !== 1) continue;
    try { ev(L, { [X]: F(p, q) }); ev(R, { [X]: F(p, q) }); } catch (e) { if (/chia cho 0/.test(e.message)) out.push(F(p, q)); else throw e; }
  }
  return out.sort((a, b) => toNum(a) - toNum(b));
};
// bất phương trình bậc nhất một ẩn "3x − 5 > 7" → nghiệm viết như sách: "x > 4", "x ≤ −3/2"
const giaiBpt = (s, X) => {
  X = X || "x";
  const m = /^(.+?) (<|>|≤|≥) (.+)$/.exec(s); assert.ok(m, "không phải bất phương trình: " + s);
  const f = (x) => sub(ev(m[1], { [X]: x }), ev(m[3], { [X]: x }));
  const b = f(F(0)), a = sub(f(F(1)), b);
  assert.ok(eq(f(F(5)), add(mul(F(5), a), b)) && toNum(a) !== 0, "bất phương trình không bậc nhất: " + s);
  const doi = { "<": ">", ">": "<", "≤": "≥", "≥": "≤" }, dau = toNum(a) > 0 ? m[2] : doi[m[2]];
  return X + " " + dau + " " + fmtF(div(neg(b), a));
};

/* ---------- hình ---------- */
const nums = (s) => s.trim().split(/[\s,]+/).map(Number);
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const lines = (svg) => [...svg.matchAll(/<line [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { a: [+a.x1, +a.y1], b: [+a.x2, +a.y2], stroke: a.stroke || "", w: +(a["stroke-width"] || 1), dash: !!a["stroke-dasharray"] }; });
const circles = (svg) => [...svg.matchAll(/<circle [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { c: [+a.cx, +a.cy], r: +a.r, fill: a.fill || "none", w: +(a["stroke-width"] || 1) }; });
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { at: [+a.x, +a.y], t: m[2], b: a["font-weight"] === "700" }; });
const subv = (p, q) => [p[0] - q[0], p[1] - q[1]];
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const dot = (u, v) => u[0] * v[0] + u[1] * v[1];
const cross = (u, v) => u[0] * v[1] - u[1] * v[0];
const goc = (o, a, b) => Math.acos(Math.max(-1, Math.min(1, dot(subv(a, o), subv(b, o)) / (dist(a, o) * dist(b, o))))) / RAD; // số đo góc aob (độ)
const dDoan = (p, a, b) => { const ab = subv(b, a), t = Math.max(0, Math.min(1, dot(subv(p, a), ab) / dot(ab, ab))); return dist(p, [a[0] + t * ab[0], a[1] + t * ab[1]]); };
const dThang = (p, a, b) => Math.abs(cross(subv(b, a), subv(p, a))) / dist(a, b); // khoảng cách từ p đến đường thẳng ab
// điểm có nhãn: chấm tròn nhỏ (r ≤ 4) và chữ đậm một chữ cái hoa (có thể có dấu phẩy trên ′) cạnh chấm
const diem = (svg) => {
  const ch = circles(svg).filter((c) => c.r <= 4), o = {};
  texts(svg).filter((t) => t.b && /^[A-Z]′?$/.test(t.t)).forEach((t) => {
    const p = ch.slice().sort((u, v) => dist(u.c, t.at) - dist(v.c, t.at))[0];
    assert.ok(p && dist(p.c, t.at) < 30, "nhãn " + t.t + " phải đặt cạnh một điểm");
    assert.ok(!o[t.t], "hai nhãn " + t.t); o[t.t] = p.c;
  });
  assert.equal(new Set(Object.values(o).map(String)).size, Object.keys(o).length, "mỗi điểm một nhãn");
  return o;
};
const doan = (svg) => lines(svg).filter((l) => l.w >= 2 && !l.dash);
const coDoan = (svg, P, Q) => doan(svg).some((l) => dDoan(P, l.a, l.b) < 0.6 && dDoan(Q, l.a, l.b) < 0.6);
// số đo ghi trong hình: "6 cm", "4,5 m", "35°"
const soDo = (svg) => texts(svg).filter((t) => !t.b && /^\d[\d ,]*(?: (?:cm|m|dm|km|mm))?$|^\d+°$/.test(t.t)).map((t) => ({ at: t.at, t: t.t, v: toNum(fr(t.t.replace(/ ?(?:cm|m|dm|km|mm|°)$/, ""))), goc: /°$/.test(t.t) }));
// độ dài ghi trong hình: mỗi số đo gắn với đoạn thẳng gần nhất (đo từ chữ đến trung điểm); trả về [{ P, Q, v, px }]
const doDai = (svg, ten) => {
  const D = diem(svg), cap = [];
  const ds = Object.keys(D); ds.forEach((P, i) => ds.slice(i + 1).forEach((Q) => { if (coDoan(svg, D[P], D[Q])) cap.push([P, Q]); }));
  return soDo(svg).filter((s) => !s.goc).map((s) => {
    const k = cap.slice().sort((u, v) => dist(s.at, mid(D[u[0]], D[u[1]])) - dist(s.at, mid(D[v[0]], D[v[1]])))[0];
    assert.ok(k, (ten || "") + ": số đo " + s.t + " không gắn với đoạn nào");
    return { P: k[0], Q: k[1], v: s.v, px: dist(D[k[0]], D[k[1]]), t: s.t };
  });
};
const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
// các độ dài ghi trong hình tỉ lệ với độ dài vẽ (sai lệch dưới 3 %): trả về số pixel của 1 đơn vị
const tiLe = (ds, ten) => { assert.ok(ds.length >= 1, (ten || "") + ": hình không ghi độ dài nào"); const k = ds[0].px / ds[0].v; ds.forEach((d) => assert.ok(Math.abs(d.px / d.v - k) <= 0.03 * k, `${ten || ""}: ${d.P}${d.Q} = ${d.t} không đúng tỉ lệ (vẽ ${d.px.toFixed(1)}, cần ${(d.v * k).toFixed(1)})`)); return k; };
// số đo góc ghi trong hình: mỗi số đo gắn với đỉnh gần nhất có hai đoạn thẳng đi qua, chữ nằm trong góc; góc vẽ phải bằng số đo (±1,5°)
const gocGhi = (svg, ten) => {
  const D = diem(svg), ks = Object.keys(D);
  return soDo(svg).filter((s) => s.goc).map((s) => {
    const O = ks.slice().sort((u, v) => dist(D[u], s.at) - dist(D[v], s.at))[0];
    const canh = ks.filter((K) => K !== O && coDoan(svg, D[O], D[K]));
    const hop = []; canh.forEach((A, i) => canh.slice(i + 1).forEach((B) => { const u = subv(D[A], D[O]), v = subv(D[B], D[O]), w = subv(s.at, D[O]); if (cross(u, w) * cross(u, v) > 0 && cross(v, w) * cross(v, u) > 0) hop.push([A, B]); }));
    hop.sort((x, y) => goc(D[O], D[x[0]], D[x[1]]) - goc(D[O], D[y[0]], D[y[1]]));
    assert.ok(hop.length, `${ten || ""}: số đo ${s.t} không nằm trong góc nào ở đỉnh ${O}`);
    const [A, B] = hop[0], g = goc(D[O], D[A], D[B]);
    assert.ok(Math.abs(g - s.v) <= 1.5, `${ten || ""}: góc ${A}${O}${B} ghi ${s.t} mà vẽ ${g.toFixed(1)}°`);
    return { O, A, B, v: s.v };
  });
};
// kí hiệu góc vuông: đường gấp khúc ba điểm (polyline) sát đỉnh; trả về tên đỉnh, góc ở đỉnh đó phải vuông (±0,5°)
const gocVuong = (svg, ten) => {
  const D = diem(svg);
  return [...svg.matchAll(/<polyline [^>]*>/g)].map((m) => nums(attrs(m[0]).points)).filter((p) => p.length === 6).map((p) => {
    const c = [p[2], p[3]], O = Object.keys(D).sort((u, v) => dist(D[u], c) - dist(D[v], c))[0];
    const canh = Object.keys(D).filter((K) => K !== O && coDoan(svg, D[O], D[K]));
    const a = [p[0], p[1]], b = [p[4], p[5]];
    const A = canh.find((K) => dThang(a, D[O], D[K]) < 0.6), B = canh.find((K) => K !== A && dThang(b, D[O], D[K]) < 0.6);
    assert.ok(A && B, `${ten || ""}: kí hiệu góc vuông ở ${O} không nằm trên hai cạnh`);
    assert.ok(Math.abs(goc(D[O], D[A], D[B]) - 90) <= 0.5, `${ten || ""}: góc ${A}${O}${B} có kí hiệu vuông mà vẽ ${goc(D[O], D[A], D[B]).toFixed(1)}°`);
    return O;
  });
};

/* ---------- lựa chọn, thang chấm ---------- */
const essayCheck = (q, rb, xx) => { const r = q.rubric.map((c) => c.c).join(" | "); rb.forEach((s) => assert.ok(r.includes(s), "thang chấm thiếu " + s)); xx.forEach((s) => assert.ok(q.x.includes(s), "gợi ý thiếu " + s)); };
// lựa chọn duy nhất thoả f (đọc từng lựa chọn bằng re)
const theo = (q, re, f) => { const m = q.o.filter((o) => { const k = re.exec(o); return k && f(k); }); assert.equal(m.length, 1, "cần đúng một lựa chọn đúng: " + JSON.stringify(q.o)); return m[0]; };
// lựa chọn duy nhất có giá trị bằng v (lựa chọn là biểu thức)
const bang = (q, v, vars) => theo(q, /^(.+)$/, (k) => eq(ev(k[1], vars), v));
const so = (s) => toNum(fr(s));
const xs = (q, re) => { const m = re.exec(q.q); assert.ok(m, "đề thiếu " + re); return m.slice(1).map((s) => fr(s)); };

/* ---------- kiểm tra từng câu ----------
   right(q): đáp án tính bằng code (so với o[0], ans[0], a, ans, r của từng ô trái, o); more(q): kiểm tra thêm; essay(q): tự luận. */
// cặp số "(4; −2)" → { x, y }
const cap = (s) => { const m = /^\((.+); (.+)\)$/.exec(s.trim()); assert.ok(m, "không phải cặp số: " + s); return { x: fr(m[1]), y: fr(m[2]) }; };
const laNghiem = (p, s) => { const e = ptHai(s); return eq(add(mul(e.a, p.x), mul(e.b, p.y)), e.c); };
const laPtHai = (s) => { try { const e = ptHai(s); return toNum(e.a) !== 0 || toNum(e.b) !== 0; } catch (e) { return false; } };
const cs = (s) => s.split("").sort().join("");
// tỉ số lượng giác của góc V trong tam giác vuông tại R (đỉnh còn lại W) có tử là cạnh tu, mẫu là cạnh mau
const tenTiSo = (R, V, W, tu, mau) => {
  const doi = cs(R + W), ke = cs(R + V), huyen = cs(V + W), T = { sin: [doi, huyen], cos: [ke, huyen], tan: [doi, ke], cot: [ke, doi] };
  const k = Object.keys(T).filter((n) => T[n][0] === cs(tu) && T[n][1] === cs(mau)); assert.equal(k.length, 1, "tỉ số lạ " + tu + "/" + mau); return k[0] + " " + V;
};
const doDo = (rad) => rad / RAD;
const giaTri = (s) => ev(s.replace(/ (?:cm²|cm|m²|m)$/, "").replace(/ \(cm\)$/, ""));
const tamGiacVuong = (q, V, ten) => { const D = diem(q.svg); assert.deepEqual(Object.keys(D).sort(), ten.split("").sort(), "nhãn đỉnh"); assert.deepEqual(gocVuong(q.svg), [V], "góc vuông ở " + V); return D; };
const soTrongDe = (q, re) => { const m = re.exec(q.q); assert.ok(m, "đề thiếu " + re); return m.slice(1).map((s) => fr(s)); };

/* ---------- thêm cho kho giữa kì I ---------- */
// bất phương trình bậc nhất một ẩn x dạng ax + b … 0 (hai vế có thể có chữ, ngoặc), a ≠ 0
const laBpt = (s) => { try { const m = /^(.+?) (<|>|≤|≥) (.+)$/.exec(s); const f = (x) => sub(ev(m[1], { x }), ev(m[3], { x })); const b = f(F(0)), a = sub(f(F(1)), b);
  return toNum(a) !== 0 && [2, 5, -3].every((t) => eq(f(F(t)), add(mul(F(t), a), b))); } catch (e) { return false; } };
// hai bất phương trình một ẩn tương đương: cùng dấu so sánh và hiệu hai vế tỉ lệ với nhau theo một số dương
const cungBpt = (s, t) => { const p = /^(.+?) (<|>|≤|≥) (.+)$/.exec(s), q = /^(.+?) (<|>|≤|≥) (.+)$/.exec(t); if (!p || !q || p[2] !== q[2]) return false;
  const f = (m, x) => toNum(sub(ev(m[1], { x: F(x) }), ev(m[3], { x: F(x) }))); const k = f(q, 7) / f(p, 7); return k > 0 && [-4, 0, 1, 3].every((x) => Math.abs(f(q, x) - k * f(p, x)) < 1e-9); };
// tập nghiệm "x = 5 và x = −2/3" so với danh sách nghiệm
const cacNghiem = (s) => [...s.matchAll(/x = (−?\d+(?:\/\d+)?)/g)].map((m) => fmtF(fr(m[1]))).sort().join();
// mệnh đề có α: đúng với mọi góc nhọn đã thử
const moiGoc = (s) => [5, 10, 25, 40, 45, 60, 70, 85].every((a) => stmt(s.replace(/α/g, a + "°")));
// hệ thức "XY = ZW · fn V" trong tam giác vuông tại R: đúng khi XY và ZW đúng là tử, mẫu của tỉ số lượng giác của góc V
const heThuc = (R, s) => { const m = /^([A-Z]{2}) = ([A-Z]{2}) · (sin|cos|tan|cot) ([A-Z])$/.exec(s); assert.ok(m, "hệ thức lạ: " + s);
  const V = m[4], Wv = [...new Set((m[1] + m[2]).split(""))].find((c) => c !== R && c !== V); assert.ok(Wv, "thiếu đỉnh trong " + s);
  try { return tenTiSo(R, V, Wv, m[1], m[2]) === m[3] + " " + V; } catch (e) { return false; } };
// độ dài làm tròn viết kiểu Việt Nam
const vn1 = (x) => fmtDec(F(Math.round(x * 10), 10), 1);
const doc = (q, R, ten, lens, angles) => { tamGiacVuong(q, R, ten); const ds = doDai(q.svg, ten);
  assert.deepEqual(ds.map((d) => cs(d.P + d.Q) + "=" + d.v).sort(), lens.slice().sort(), ten + ": độ dài ghi trong hình");
  if (ds.length) tiLe(ds, ten); const g = gocGhi(q.svg, ten); assert.deepEqual(g.map((x) => x.O + x.v), angles || [], ten + ": góc ghi trong hình"); hinhDaDoc.add(q.q); };
const hinhDaDoc = new Set();

const CHECKS = [
  /* ----- Bài 1 ----- */
  { has: "Xét các hệ phương trình trong từng ý dưới đây", right: (q) => q.o.map((s) => { const m = /^Hệ \{(.+?); (.+?)\} là hệ hai phương trình bậc nhất hai ẩn$/.exec(s); assert.ok(m, s); return laPtHai(m[1]) && laPtHai(m[2]); }) },
  { has: "Phương trình nào dưới đây nhận cặp số (4; −3) làm một nghiệm?", right: (q) => theo(q, /^(.+)$/, (k) => laNghiem({ x: F(4), y: F(-3) }, k[1])) },
  { has: "Biết cặp số (−1; m) là một nghiệm của phương trình 5x + 2y = 9", right: () => { const e = ptHai("5x + 2y = 9"); return div(sub(e.c, mul(e.a, F(-1))), e.b); } },
  { has: "Cho phương trình 3x − 2y = 6. Mỗi ý sau đúng hay sai?", right: (q) => q.o.map((s) => { let m;
    if ((m = /^Hệ số của y trong phương trình là (.+)$/.exec(s))) return eq(ptHai("3x − 2y = 6").b, fr(m[1]));
    if ((m = /^Cặp số (\(.+\)) là một nghiệm của phương trình$/.exec(s))) return laNghiem(cap(m[1]), "3x − 2y = 6");
    if ((m = /^Điểm (\(.+\)) thuộc đường thẳng (.+)$/.exec(s))) return laNghiem(cap(m[1]), m[2]);
    assert.fail("ý lạ: " + s); }) },
  { has: "là một nghiệm của hệ hai phương trình bậc nhất hai ẩn khi", right: () => "mọi phương trình của hệ đều được khẳng định đúng khi thay x = x₀, y = y₀" },
  { has: "Phương trình 0x − 2y = 8 có nghiệm tổng quát là", right: (q) => theo(q, /^\((.+); (.+)\) với ([xy]) ∈ ℝ tuỳ ý$/, (k) => [-3, 0, 2, 7].every((t) => { const v = { [k[3]]: F(t) }; return laNghiem({ x: ev(k[1], v), y: ev(k[2], v) }, "0x − 2y = 8"); })) },
  { has: "Trong các cặp số dưới đây, cặp nào là nghiệm của hệ phương trình {2x + y = 7; x − y = −1}?", right: (q) => theo(q, /^(\(.+\))$/, (k) => laNghiem(cap(k[1]), "2x + y = 7") && laNghiem(cap(k[1]), "x − y = −1")),
    more: (q) => { const c = (s) => [laNghiem(cap(s), "2x + y = 7"), laNghiem(cap(s), "x − y = −1")].join(); assert.deepEqual(["(3; 1)", "(1; 2)", "(3; 2)"].map(c), ["true,false", "false,true", "false,false"], "lời giải về ba cặp còn lại"); } },
  { has: "hộp bút chì màu loại nhỏ giá 25 000 đồng/hộp", right: (q) => { const [a, b, t] = soTrongDe(q, /giá (\d+ \d{3}) đồng\/hộp .*?giá (\d+ \d{3}) đồng\/hộp, thu được tất cả (\d+ \d{3}) đồng/); return `${fmtInt(a)}x + ${fmtInt(b)}y = ${fmtInt(t)}`; } },
  { has: "các nghiệm của phương trình 0x + y = 5 được biểu diễn bởi", right: () => { const e = ptHai("0x + y = 5"); assert.ok(toNum(e.a) === 0 && toNum(e.b) !== 0); return `đường thẳng y = ${fmtF(div(e.c, e.b))}, song song với trục Ox`; } },
  { has: "Hệ phương trình {x + 2y = 4; 3x − y = 5} có một nghiệm duy nhất", right: () => "giao điểm của hai đường thẳng x + 2y = 4 và 3x − y = 5",
    more: () => { const g = giaiHe("{x + 2y = 4; 3x − y = 5}"); assert.ok(typeof g === "object" && toNum(g.x) !== 0 && toNum(g.y) !== 0, "nghiệm không nằm trên trục toạ độ");
      assert.ok(laNghiem({ x: F(4), y: F(0) }, "x + 2y = 4") && laNghiem({ x: F(0), y: F(-5) }, "3x − y = 5") && !(eq(g.x, F(2)) && eq(g.y, fr("−2,5"))), "trung điểm không phải nghiệm"); } },
  { has: "Đường thẳng ax + 3y = 1 đi qua điểm M(2; −3). Tìm a.", right: () => div(sub(F(1), mul(F(3), F(-3))), F(2)) },
  { has: "Cho phương trình x − 2y = 4 (1). Mỗi ý sau đúng hay sai?", right: (q) => q.o.map((s) => { let m; const thoa = (x, y) => laNghiem({ x, y }, "x − 2y = 4");
    if ((m = /^Từ \(1\) suy ra x = (.+)$/.exec(s))) return [-2, 0, 1, 5].every((y) => thoa(ev(m[1], { y: F(y) }), F(y)));
    if ((m = /^Nghiệm tổng quát của \(1\) là \((.+); y\) với y ∈ ℝ tuỳ ý$/.exec(s))) return [-2, 0, 1, 5].every((y) => thoa(ev(m[1], { y: F(y) }), F(y)));
    if ((m = /^Cặp số (\(.+\)) là một nghiệm của \(1\)$/.exec(s))) { const p = cap(m[1]); return thoa(p.x, p.y); }
    if ((m = /^Đường thẳng x − 2y = 4 cắt trục tung tại điểm (\(.+\))$/.exec(s))) { const p = cap(m[1]); return eq(p.x, F(0)) && thoa(p.x, p.y); }
    assert.fail("ý lạ: " + s); }) },
  /* ----- Bài 2 ----- */
  { has: "Khi giải hệ phương trình {x + 3y = 4; 2x − 5y = −3} bằng phương pháp thế", right: (q) => {
    assert.ok([0, 1, 4].every((y) => eq(add(ev("4 − 3y", { y: F(y) }), mul(F(3), F(y))), F(4))), "x = 4 − 3y lấy từ phương trình thứ nhất");
    return theo(q, /^(.+) = (.+)$/, (k) => { try { return [0, 1, 2, 5].every((y) => { const v = { y: F(y) }; return eq(sub(ev(k[1], v), ev(k[2], v)), sub(ev("2x − 5y", { x: ev("4 − 3y", v), y: F(y) }), F(-3))); }); } catch (e) { return false; } }); } },
  { has: "Hai phương trình của hệ {6x + 5y = 27; 6x − 2y = 6} có cùng hệ số của x", right: (q) => { const m = /\{(.+?); (.+?)\}/.exec(q.q), p = ptHai(m[1]), r = ptHai(m[2]);
    assert.equal(toNum(sub(p.a, r.a)), 0, "trừ từng vế phải khử x"); return fmtF(sub(p.b, r.b)) + "y = " + fmtF(sub(p.c, r.c)); } },
  { has: "{2x + 3y = 5; 4x − y = 3} bằng phương pháp cộng đại số, muốn hai hệ số của y là hai số đối nhau", right: (q) => { const m = /\{(.+?); (.+?)\}/.exec(q.q), p = ptHai(m[1]), r = ptHai(m[2]);
    return theo(q, /^(.+)$/, (k) => eq(mul(fr(k[1]), r.b), neg(p.b))); } },
  { has: "{x − 2y + 3 = 0; 5x + y = 4} bằng máy tính cầm tay", right: () => { const e = ptHai("x − 2y + 3 = 0"); return [e.a, e.b, e.c].map(fmtF).join("; "); } },
  { has: "Hệ phương trình {0,3x + 0,2y = 1; 0,5x − 0,4y = 2,4} có nghiệm là", right: (q) => capSo(giaiHe(q.q)),
    more: () => { const c = (s) => [laNghiem(cap(s), "0,3x + 0,2y = 1"), laNghiem(cap(s), "0,5x − 0,4y = 2,4")].join(); assert.deepEqual(["(0; 5)", "(8; 4)", "(1; 4)"].map(c), ["true,false", "false,true", "false,false"], "lời giải về các cặp còn lại"); } },
  { has: "Xếp các bước sau theo đúng thứ tự để giải hệ phương trình {3x + 2y = 4; 5x − 2y = 12}", right: (q) => { const m = /\{(.+?); (.+?)\}/.exec(q.q), p = ptHai(m[1]), r = ptHai(m[2]), g = giaiHe(q.q);
    const a = add(p.a, r.a), c = add(p.c, r.c); assert.equal(toNum(add(p.b, r.b)), 0, "cộng từng vế phải khử y"); assert.ok(eq(div(c, a), g.x));
    return [`Cộng từng vế hai phương trình, được ${fmtF(a)}x = ${fmtF(c)}`, `Giải phương trình một ẩn vừa có, được x = ${fmtF(g.x)}`, `Thay x = ${fmtF(g.x)} vào phương trình ${m[1]}, tính được y = ${fmtF(g.y)}`, `Kết luận: hệ có nghiệm ${capSo(g)}`]; } },
  { has: "Hệ phương trình {2x − 6y = 10; −x + 3y = −5}", right: (q) => { const g = giaiHe(q.q); assert.equal(g, "vô số nghiệm"); return "có vô số nghiệm"; },
    more: (q) => assert.ok([0, 1, -2].every((y) => laNghiem({ x: ev("3y + 5", { y: F(y) }), y: F(y) }, "2x − 6y = 10") && laNghiem({ x: ev("3y + 5", { y: F(y) }), y: F(y) }, "−x + 3y = −5")), "nghiệm (3y + 5; y)") },
  { has: "Hệ phương trình {2(x + 1) − 3y = 5; x + 2(y − 1) = 3} có nghiệm duy nhất", right: (q) => { const g = giaiHe(q.q); return mul(g.x, g.y); } },
  { has: "Tìm m để hệ phương trình {x + 2y = 3; 2x + my = 5} vô nghiệm.", right: () => { const ms = []; for (let d = 1; d <= 4; d++) for (let n = -40; n <= 40; n++) { if (gcd(n, d) !== 1) continue; if (giaiHe(`{x + 2y = 3; 2x + (${fmtF(F(n, d))})y = 5}`) === "vô nghiệm") ms.push(F(n, d)); }
    assert.equal(ms.length, 1); return ms[0]; } },
  { has: "{(x + 1)(y − 2) = xy − 6; (x − 3)(y + 1) = xy − 6}", right: (q) => { const g = giaiHe(q.q); return add(g.x, g.y); } },
  { has: "Ba đường thẳng 2x + y = 9, x − 3y = 1 và mx − 2y = 10 cùng đi qua một điểm", right: () => { const g = giaiHe("{2x + y = 9; x − 3y = 1}"); return div(add(F(10), mul(F(2), g.y)), g.x); } },
  { has: "Đặt u = 1/x, v = 1/y để giải hệ phương trình {1/x + 2/y = −3/4; 3/x − 1/y = 5/4}", right: () => { const g = giaiHe("{u + 2v = −3/4; 3u − v = 5/4}", "u", "v"), x = div(F(1), g.x), y = div(F(1), g.y);
    assert.ok(stmt("1/x + 2/y = −3/4", { x, y }) && stmt("3/x − 1/y = 5/4", { x, y })); return mul(x, y); } },
  /* ----- Bài 3 ----- */
  { has: "Một nhà xe dùng xe 4 chỗ và xe 7 chỗ", right: (q) => { const [k, n] = soTrongDe(q, /chở (\d+) khách, tổng cộng (\d+) xe/); const he = `{x + y = ${fmtInt(n)}; 4x + 7y = ${fmtInt(k)}}`, g = giaiHe(he);
    assert.ok(isInt(g.x) && isInt(g.y) && g.x.n > 0 && g.y.n > 0, "số xe nguyên dương"); return he; } },
  { has: "đóng 230 kg gạo vào các túi loại 5 kg và loại 2 kg, được tất cả 58 túi", right: () => { const he = "{x + y = 58; 5x + 2y = 230}", g = giaiHe(he); assert.ok(isInt(g.x) && isInt(g.y) && g.x.n > 0 && g.y.n > 0); return he; } },
  { has: "Ở một giải bóng đá, mỗi trận thắng được 3 điểm, mỗi trận hoà được 1 điểm", right: (q) => { const g = giaiHe("{x + y = 13; 3x + y = 31}"); assert.ok(isInt(g.x) && isInt(g.y) && g.y.n > 0);
    return q.o.map((s) => { let m; if ((m = /^Tổng số điểm của đội là (.+)$/.exec(s))) return eq(ev(m[1], g), F(31)) && eq(ev(m[1], { x: F(1), y: F(0) }), F(3));
      if ((m = /^Đội đã thắng (\d+) trận$/.exec(s))) return eq(g.x, fr(m[1])); if (/^Số trận hoà nhiều hơn số trận thắng$/.test(s)) return toNum(g.y) > toNum(g.x); return stmt(s, g); }); } },
  { has: "Giá niêm yết của một áo sơ mi và một quần âu tổng cộng là 750 000 đồng", right: () => { const g = giaiHe("{x + y = 750 000; 0,8x + 0,9y = 630 000}");
    return ["Gọi x, y (đồng) lần lượt là giá niêm yết của áo sơ mi và quần âu (x > 0, y > 0)", "Từ tổng giá niêm yết và số tiền phải trả, lập hệ {x + y = 750 000; 0,8x + 0,9y = 630 000}",
      `Giải hệ, tìm được x = ${fmtInt(g.x)} và y = ${fmtInt(g.y)}`, `Thấy x, y thoả mãn điều kiện; kết luận: áo giá ${fmtInt(g.x)} đồng, quần giá ${fmtInt(g.y)} đồng`]; } },
  { has: "Đường từ nhà Quân đến nhà bà gồm một đoạn lên dốc và một đoạn xuống dốc", essay: (q) => { assert.ok(eq(F(70, 60), fr("7/6")) && eq(F(90, 60), fr("3/2")));
    const g = giaiHe("{x/12 + y/20 = 7/6; x/20 + y/12 = 3/2}"), h = giaiHe("{5x + 3y = 70; 3x + 5y = 90}"); assert.ok(eq(g.x, h.x) && eq(g.y, h.y));
    essayCheck(q, ["x/12 + y/20 = 7/6", "x/20 + y/12 = 3/2", "{5x + 3y = 70; 3x + 5y = 90}", `x = ${fmtF(g.x)}, y = ${fmtF(g.y)}`], [`Đáp số: đoạn lên dốc ${fmtF(g.x)} km, đoạn xuống dốc ${fmtF(g.y)} km`]); } },
  { has: "Treo vật 3 kg thì lò xo dài 32 cm, treo vật 7 kg thì lò xo dài 40 cm", right: () => giaiHe("{a + 3b = 32; a + 7b = 40}", "a", "b").x },
  { has: "hai đội tình nguyện trồng được tổng cộng 540 cây xanh", essay: (q) => { const g = giaiHe("{x + y = 540; (2/5)x = (1/2)y}"), h = giaiHe("{x + y = 540; 4x − 5y = 0}"); assert.ok(eq(g.x, h.x) && eq(g.y, h.y));
    essayCheck(q, ["x + y = 540", "(2/5)x = (1/2)y", "4x − 5y = 0", `x = ${fmtF(g.x)}, y = ${fmtF(g.y)}`], [`Đáp số: đội thứ nhất ${fmtF(g.x)} cây, đội thứ hai ${fmtF(g.y)} cây`]); } },
  { has: "đi qua một cột điện bên đường hết 8 giây", right: (q) => { const g = giaiHe("{x = 8y; x + 360 = 26y}"); assert.ok(q.x.includes("{x − 8y = 0; x − 26y = −360}")); return g.x; } },
  /* ----- Bài 4 ----- */
  { has: "Phương trình (4x − 12)(x + 9) = 0 có nghiệm dương là x = ___", right: () => { const r = nghiem("(4x − 12)(x + 9) = 0").filter((v) => toNum(v) > 0); assert.equal(r.length, 1); return fmtF(r[0]); } },
  { has: "Điều kiện xác định của phương trình 3/(x + 4) + x/(2x − 6) = 1 là", right: () => loaiTru("3/(x + 4) + x/(2x − 6) = 1").map((v) => "x ≠ " + fmtF(v)).join(" và ") },
  { has: "giá trị nào dưới đây bị loại ngay vì không thoả mãn điều kiện xác định?", right: (q) => { const lt = loaiTru("(x + 2)/(x − 11) = 3/(x + 1)"); assert.deepEqual(lt.map(fmtF), ["−1", "11"]); return theo(q, /^x = (.+)$/, (k) => lt.some((v) => eq(v, fr(k[1])))); } },
  { has: "Phương trình (x − 5)(3x + 2) = 0 có các nghiệm là", right: (q) => { const r = nghiem("(x − 5)(3x + 2) = 0").map(fmtF).sort().join(); return theo(q, /^(.+)$/, (k) => cacNghiem(k[1]) === r); } },
  { has: "Tính tổng các nghiệm của phương trình (x − 4)² = 14(x − 4).", right: () => nghiem("(x − 4)² = 14(x − 4)").reduce((s, v) => add(s, v), F(0)) },
  { has: "Các nghiệm của phương trình 4x² − 25 = 0 là", right: (q) => { const r = nghiem("4x² − 25 = 0").map(fmtF).sort().join(); return theo(q, /^(.+)$/, (k) => cacNghiem(k[1]) === r); } },
  { has: "Tìm nghiệm của phương trình 3/(x − 2) = 5/(x + 2).", right: () => { const r = nghiem("3/(x − 2) = 5/(x + 2)"); assert.equal(r.length, 1); return r[0]; } },
  { has: "Xét phương trình (x + 3)/x = (x − 4)/(x − 2). Mỗi ý sau đúng hay sai?", right: (q) => { const s = "(x + 3)/x = (x − 4)/(x − 2)", [L, R] = s.split(" = "), r = nghiem(s), lt = loaiTru(s);
    assert.ok(r.length === 1 && eq(r[0], fr("6/5")) && q.x.includes("x = 6/5"), "nghiệm 6/5");
    return q.o.map((it) => { let m;
      if ((m = /^x = (.+) thoả mãn điều kiện xác định của phương trình$/.exec(it))) return !lt.some((v) => eq(v, fr(m[1])));
      if (/^Phương trình có hai nghiệm$/.test(it)) return r.length === 2;
      if ((m = /^Mẫu chung của hai vế là (.+)$/.exec(it))) return [3, 5, -4].every((x) => { const v = { x: F(x) }; return eq(ev(m[1], v), mul(ev("x", v), ev("x − 2", v))); });
      if ((m = /^Sau khi khử mẫu và thu gọn, ta được (.+)$/.exec(it))) { const [kL, kR] = m[1].split(" = "); const f = (x) => sub(ev(kL, { x: F(x) }), ev(kR, { x: F(x) })), g = (x) => { const v = { x: F(x) }; return mul(sub(ev(L, v), ev(R, v)), ev("x(x − 2)", v)); };
        const k = div(f(1), g(1)); return toNum(k) !== 0 && [3, 5, -4, 7].every((x) => eq(f(x), mul(k, g(x)))); }
      assert.fail("ý lạ: " + it); }); } },
  { has: "Tìm nghiệm của phương trình (x − 2)/(x − 1) − 4/x = −1/(x² − x).", right: () => { const s = "(x − 2)/(x − 1) − 4/x = −1/(x² − x)", r = nghiem(s);
    assert.deepEqual(loaiTru(s).map(fmtF), ["0", "1"]); assert.ok(eq(ev("x(x − 2) − 4(x − 1)", { x: F(1) }), F(-1)), "x = 1 là nghiệm của phương trình đã khử mẫu (bị loại)"); assert.equal(r.length, 1); return r[0]; } },
  { has: "đã thi đấu 25 trận và thắng 14 trận", right: () => { assert.ok(eq(fr("3/4"), F(75, 100))); const r = nghiem("(14 + x)/(25 + x) = 3/4"); assert.equal(r.length, 1); return r[0]; } },
  { has: "Tìm nghiệm của phương trình (x − 4)/(x + 2) + 1/x = 2/(x² + 2x).", right: () => { const s = "(x − 4)/(x + 2) + 1/x = 2/(x² + 2x)", r = nghiem(s);
    assert.deepEqual(loaiTru(s).map(fmtF), ["−2", "0"]); assert.ok(eq(ev("x(x − 4) + (x + 2)", { x: F(0) }), F(2)), "x = 0 là nghiệm của phương trình đã khử mẫu (bị loại)"); assert.equal(r.length, 1); return r[0]; } },
  { has: "Trong cùng một khoảng thời gian, An chạy được 800 m còn Bình chạy được 640 m", right: () => { const r = nghiem("800/(v + 0,8) = 640/v", "v").filter((v) => toNum(v) > 0); assert.equal(r.length, 1); return r[0]; } },
  /* ----- Bài 5 ----- */
  { has: "hành lí xách tay của mỗi hành khách không được nặng quá 7 kg", right: () => "m ≤ 7" },
  { has: "Hai bất đẳng thức nào dưới đây là hai bất đẳng thức cùng chiều?", right: (q) => theo(q, /^(.+) và (.+)$/, (k) => { const d = (s) => (/[<≤]/.test(s) ? "<" : ">"); return d(k[1]) === d(k[2]); }),
    more: (q) => q.o.forEach((o) => o.split(" và ").forEach((s) => assert.ok(stmt(s), "bất đẳng thức sai: " + s))) },
  { has: "Cho a < b và b < 7. Từ đó ta chắc chắn có", right: (q) => theo(q, /^(.+)$/, (k) => [[1, 2], [-5, 6], [6, 6.5], [0, 3]].every(([a, b]) => stmt(k[1], { a: fr(String(a).replace(".", ",")), b: fr(String(b).replace(".", ",")) }))) },
  { has: "Số thực x thoả mãn đồng thời hai bất đẳng thức x ≥ 2,5 và x ≤ 2,5", right: () => "x = 2,5" },
  { has: "Khẳng định nào dưới đây đúng?", exact: true, right: (q) => theo(q, /^(.+)$/, (k) => stmt(k[1])) },
  { has: "độ ẩm không khí trong phòng ngủ nên ở mức từ 40% đến 60%", right: () => "40 ≤ h ≤ 60" },
  { has: "điểm biểu diễn số m nằm bên trái điểm biểu diễn số n", right: () => "m < n" },
  { has: "Ghép mỗi câu ở cột trái với bất đẳng thức có cùng nghĩa ở cột phải.", right: (q) => q.l.map((s) => { const m = /^x (không )?(lớn|nhỏ) hơn (\d+)$/.exec(s); assert.ok(m, s); return "x " + { lớn: m[1] ? "≤" : ">", nhỏ: m[1] ? "≥" : "<" }[m[2]] + " " + m[3]; }) },
  { has: "Cho số thực a thoả mãn a ≥ 3. Mỗi ý sau đúng hay sai?", right: (q) => q.o.map((s) => (/^a có thể bằng (\d+)$/.test(s) ? stmt(/(\d+)$/.exec(s)[1] + " ≥ 3") : ["3", "3,5", "4", "7", "100"].every((a) => stmt(s, { a: fr(a) })))) },
  { has: "Cho m > n. Khẳng định nào dưới đây đúng?", right: (q) => theo(q, /^(.+)$/, (k) => [[2, 1], [-1, -3], [0, -1], [10, 4]].every(([m, n]) => stmt(k[1], { m: F(m), n: F(n) }))) },
  { has: "Cho hai số x, y thoả mãn −4x + 1 > −4y + 1", right: (q) => { const S2 = [[1, 2], [-3, 0], [5, 7], [-2, -1]]; assert.ok(S2.every(([x, y]) => stmt("−4x + 1 > −4y + 1", { x: F(x), y: F(y) })));
    return theo(q, /^(.+)$/, (k) => S2.every(([x, y]) => stmt(k[1], { x: F(x), y: F(y) }))); } },
  { has: "Khẳng định nào dưới đây đúng với mọi số thực x?", right: (q) => theo(q, /^(.+)$/, (k) => ["−5", "−1", "0", "0,5", "1", "2", "3", "10"].every((x) => stmt(k[1], { x: fr(x) }))) },
  /* ----- Bài 6 ----- */
  { has: "Bất phương trình nào dưới đây là bất phương trình bậc nhất một ẩn?", right: (q) => theo(q, /^(.+)$/, (k) => laBpt(k[1])) },
  { has: "Bất phương trình nào dưới đây nhận x = 3 làm một nghiệm?", right: (q) => theo(q, /^(.+)$/, (k) => stmt(k[1], { x: F(3) })) },
  { has: "nếu nhân (hoặc chia) cả hai vế với cùng một số âm thì", right: () => "phải đổi chiều bất phương trình", more: () => assert.equal(giaiBpt("−2x < 6"), "x > −3") },
  { has: "Cho bất phương trình 5x − 3 ≥ 2x + 9. Mỗi ý sau đúng hay sai?", right: (q) => q.o.map((s) => { let m;
    if ((m = /^x = (.+) thoả mãn bất phương trình$/.exec(s))) return stmt("5x − 3 ≥ 2x + 9", { x: fr(m[1]) });
    if ((m = /^Vế trái của bất phương trình là (.+)$/.exec(s))) return m[1] === "5x − 3"; assert.fail("ý lạ: " + s); }) },
  { has: "Nghiệm của bất phương trình 9 − 3x ≥ 2x − 11 là", right: () => giaiBpt("9 − 3x ≥ 2x − 11") },
  { has: "Có bao nhiêu số nguyên dương x thoả mãn bất phương trình 3(x + 2) ≤ x + 16?", right: () => { const g = giaiBpt("3(x + 2) ≤ x + 16"); assert.ok(g.startsWith("x ≤ ")); return Math.floor(toNum(fr(g.slice(4)))); } },
  { has: "Nghiệm của bất phương trình (x − 1)/2 ≥ (x + 2)/3 là", right: () => giaiBpt("(x − 1)/2 ≥ (x + 2)/3") },
  { has: "Khi giải bất phương trình −2x + 11 > 3 − 6x, mỗi ý sau đúng hay sai?", right: (q) => { const s = "−2x + 11 > 3 − 6x", g = giaiBpt(s);
    return q.o.map((it) => { let m; if ((m = /^(?:Chuyển vế|Thu gọn), ta được (.+)$/.exec(it))) return cungBpt(s, m[1]);
      if ((m = /^Bất phương trình có nghiệm (.+)$/.exec(it))) return m[1] === g; if ((m = /^x = (.+) thoả mãn bất phương trình$/.exec(it))) return stmt(s, { x: fr(m[1]) });
      assert.fail("ý lạ: " + it); }); } },
  { has: "Một tiệm bánh mỗi ngày phải trả 2 400 000 đồng", right: (q) => { const [c, a, b] = soTrongDe(q, /trả (\d+ \d{3} \d{3}) đồng.*?tốn (\d+ \d{3}) đồng.*?giá (\d+ \d{3}) đồng/);
    const g = giaiBpt(`${fmtInt(b)}x > ${fmtInt(c)} + ${fmtInt(a)}x`); assert.ok(g.startsWith("x > ")); return Math.floor(toNum(fr(g.slice(4)))) + 1; } },
  { has: "Một khu chung cư tính tiền nước như sau", right: () => { assert.ok(eq(mul(F(10), F(8000)), F(80000))); const g = giaiBpt("80 000 + 12 000(x − 10) ≤ 260 000"); assert.ok(g.startsWith("x ≤ ")); return Math.floor(toNum(fr(g.slice(4)))); } },
  { has: "Bạn Ngọc đang có 150 000 đồng và mỗi tuần để dành thêm 35 000 đồng", right: () => { const g = giaiBpt("150 000 + 35 000x ≥ 1 400 000"); assert.ok(g.startsWith("x ≥ ")); return Math.ceil(toNum(fr(g.slice(4)))); } },
  { has: "Một ấm nước đang ở 22 °C", right: () => { const g = giaiBpt("22 + 9x > 90"); assert.ok(g.startsWith("x > ")); return Math.floor(toNum(fr(g.slice(4)))) + 1; } },
  /* ----- Bài 11 ----- */
  { has: "Trong tam giác IKL vuông tại I ở hình vẽ, đẳng thức nào dưới đây đúng?", right: (q) => { doc(q, "I", "IKL", []);
    return theo(q, /^(sin|cos|tan|cot) ([KL]) = ([A-Z]{2})\/([A-Z]{2})$/, (k) => { try { return tenTiSo("I", k[2], k[2] === "K" ? "L" : "K", k[3], k[4]) === k[1] + " " + k[2]; } catch (e) { return false; } }); } },
  { has: "Giá trị của tan 60° là", right: (q) => bang(q, ev("tan 60°")) },
  { has: "Cho α và β là hai góc nhọn phụ nhau (α + β = 90°)", right: (q) => theo(q, /^(sin|cos|tan|cot) α = (sin|cos|tan|cot) β$/, (k) => [10, 20, 35, 50, 73].every((a) => Math.abs(TRIG[k[1]](a) - TRIG[k[2]](90 - a)) < 1e-9)) },
  { has: "Các ý dưới đây nói về giá trị tỉ số lượng giác.", right: (q) => q.o.map((s) => (/^Với mọi góc nhọn α, (.+)$/.test(s) ? Array.from({ length: 89 }, (_, i) => i + 1).every((a) => stmt(/, (.+)$/.exec(s)[1].replace(/α/g, a + "°"))) : stmt(s))) },
  { has: "Cho tam giác BEF vuông tại B (hình vẽ). Cạnh đối của góc E là", right: (q) => { doc(q, "B", "BEF", []); return theo(q, /^([A-Z]{2})$/, (k) => cs(k[1]) === cs("BF")); } },
  { has: "tìm số đo góc nhọn α biết tan α = 2,5", right: () => lamTron(doDo(Math.atan(2.5)), 0) },
  { has: "Cho tam giác HPQ vuông tại H. Nối mỗi tỉ số lượng giác của góc P", right: (q) => q.l.map((l) => { const fn = l.split(" ")[0], m = q.r.filter((r) => { const [a, b] = r.split("/"); try { return tenTiSo("H", "P", "Q", a, b) === fn + " P"; } catch (e) { return false; } });
    assert.equal(m.length, 1, "ô " + l); return m[0]; }) },
  { has: "Với mọi góc nhọn α, khẳng định nào dưới đây đúng?", right: (q) => theo(q, /^(.+)$/, (k) => moiGoc(k[1])) },
  { has: "Cho tam giác HMN vuông tại H có HN = 40 cm, MN = 41 cm (hình vẽ)", right: (q) => { doc(q, "H", "HMN", ["HN=40", "MN=41"]); const HM = sqrt(F(41 * 41 - 40 * 40)); assert.ok(isInt(HM)); return div(HM, F(40)); } },
  { has: "Cho góc nhọn α có cos α = 12/37. Giá trị của tan α là", right: (q) => { const doi = sqrt(F(37 * 37 - 12 * 12)); assert.ok(isInt(doi)); return theo(q, /^(.+)$/, (k) => eq(fr(k[1]), div(doi, F(12)))); } },
  { has: "Biểu thức B = 10 sin² 30° + 6 cos² 60° có giá trị bằng bao nhiêu?", right: () => ev("10 sin² 30° + 6 cos² 60°") },
  { has: "Cho tam giác PST vuông tại P có PS = 33 cm, PT = 56 cm (hình vẽ)", right: (q) => { doc(q, "P", "PST", ["PS=33", "PT=56"]); const L = { PS: F(33), PT: F(56) }; L.ST = sqrt(add(mul(L.PS, L.PS), mul(L.PT, L.PT))); assert.ok(isInt(L.ST));
    const tiSo = (fn, V) => { const W = V === "S" ? "T" : "S", doi = L[cs("P" + W)], ke = L[cs("P" + V)]; return { sin: div(doi, L.ST), cos: div(ke, L.ST), tan: div(doi, ke), cot: div(ke, doi) }[fn]; };
    return q.o.map((s) => { let m = /^ST = (\d+) cm$/.exec(s); if (m) return eq(L.ST, F(+m[1])); m = /^(sin|cos|tan|cot) ([ST]) = (\d+\/\d+)$/.exec(s); assert.ok(m, s); return eq(tiSo(m[1], m[2]), fr(m[3])); }); } },
  { has: "ghi độ dốc 12%", right: () => lamTron(doDo(Math.atan(12 / 100)), 0) },
  { has: "Cho góc nhọn α có tan α = 2. Biểu thức A", right: () => { const a = Math.atan(2); return (Math.sin(a) + Math.cos(a)) / (Math.sin(a) - Math.cos(a)); } },
  { has: "C = 3 sin² 25° + 3 sin² 65° − cos² 40° − cos² 50°", right: () => ev("3 sin² 25° + 3 sin² 65° − cos² 40° − cos² 50°") },
  { has: "Cho tam giác MNP cân tại M có MN = MP = 53 cm và NP = 56 cm", right: () => { const NH = div(F(56), F(2)), MH = sqrt(sub(F(53 * 53), mul(NH, NH))); assert.ok(isInt(MH), "đường cao là số nguyên"); return div(NH, F(53)); } },
  /* ----- Bài 12 ----- */
  { has: "Trong tam giác DMN vuông tại D ở hình vẽ, hệ thức nào dưới đây đúng?", right: (q) => { doc(q, "D", "DMN", []); return theo(q, /^(.+)$/, (k) => heThuc("D", k[1])); } },
  { has: "Cho tam giác EGH vuông tại E có GH = 34 cm, góc G = 30° (hình vẽ)", right: (q) => { doc(q, "E", "EGH", ["GH=34"], ["G30"]); return theo(q, /^(.+) cm$/, (k) => eq(ev(k[1]), ev("34 · sin 30°"))); } },
  { has: "Cho tam giác LST vuông tại L. Khẳng định nào dưới đây đúng?", right: (q) => theo(q, /^(.+)$/, (k) => heThuc("L", k[1])) },
  { has: "Trong hình vẽ, tam giác OBC vuông tại O, BC = 16 cm và góc OBC bằng 60°", right: (q) => { doc(q, "O", "OBC", ["BC=16"], ["B60"]); return ev("16 · cos 60°"); } },
  { has: "Tam giác GHK trong hình vẽ vuông tại G, có GH = 11 cm và góc GHK bằng 38°", right: (q) => { doc(q, "G", "GHK", ["GH=11"], ["H38"]); return lamTron(11 * Math.tan(38 * RAD), 1); } },
  { has: "Tam giác LMN vuông tại L có cạnh huyền MN = 13 cm và cạnh góc vuông LM = 7 cm (hình vẽ)", right: (q) => { doc(q, "L", "LMN", ["LM=7", "MN=13"]); return lamTron(doDo(Math.acos(7 / 13)), 0); } },
  { has: "Cho tam giác CDE vuông tại C có CD = 7 cm, CE = 9 cm (hình vẽ)", right: (q) => { doc(q, "C", "CDE", ["CD=7", "CE=9"]); const D = doDo(Math.atan(9 / 7)), E = 90 - D;
    return q.o.map((s) => { let m; if ((m = /^tan ([DE]) = (\d+)\/(\d+)$/.exec(s))) return eq(fr(m[2] + "/" + m[3]), m[1] === "D" ? F(9, 7) : F(7, 9));
      if ((m = /^DE ≈ (.+) cm$/.exec(s))) return lamTron(Math.sqrt(49 + 81), 1) === so(m[1]);
      if ((m = /^Góc ([DE]) ≈ (\d+)°$/.exec(s))) return lamTron(m[1] === "D" ? D : E, 0) === +m[2]; assert.fail("ý lạ: " + s); }); } },
  { has: "cạnh huyền dài 15 cm và một góc nhọn bằng 40°", right: (q) => theo(q, /^(.+) cm$/, (k) => so(k[1]) === lamTron(15 * Math.sin(40 * RAD), 1)),
    more: (q) => assert.deepEqual(q.o.slice(1).map((o) => so(o.replace(" cm", ""))), [lamTron(15 * Math.cos(40 * RAD), 1), lamTron(15 * Math.tan(40 * RAD), 1), lamTron(15 / Math.cos(40 * RAD), 1)], "nhiễu là 15 · cos 40°, 15 · tan 40°, 15 : cos 40°") },
  { has: "Cần của một chiếc cần cẩu dài 25 m", right: () => lamTron(25 * Math.sin(64 * RAD) + 2, 1) },
  { has: "Mỗi bậc của một cầu thang cao 16 cm và rộng 29 cm", right: () => lamTron(doDo(Math.atan(16 / 29)), 0) },
  { has: "Đỉnh một ngọn hải đăng cao 50 m so với mặt biển", essay: (q) => { const AH = 50 / Math.tan(9 * RAD), BH = 50 / Math.tan(14 * RAD), AB = lamTron(AH - BH, 0);
    assert.equal(lamTron(lamTron(AH, 1) - lamTron(BH, 1), 0), AB, "làm tròn từng bước vẫn ra cùng đáp số");
    essayCheck(q, [`AH = 50/tan 9° ≈ ${vn1(AH)} (m)`, `BH = 50/tan 14° ≈ ${vn1(BH)} (m)`, `AB = AH − BH ≈ ${AB} (m)`], [`Đáp số: khoảng ${AB} m`]); } },
  { has: "Một chiếc xe đi lên một con dốc thẳng nghiêng 6°", right: () => lamTron(500 * Math.sin(6 * RAD), 0) },
  { has: "Một ngọn đèn được treo ở độ cao 6 m so với mặt đường", right: () => lamTron(6 * Math.tan(70 * RAD), 1) },
  { has: "bạn Thảo đặt giác kế thẳng đứng cách gốc cây 18 m", right: () => lamTron(18 * Math.tan(33 * RAD) + 1.5, 1) },
  { has: "Thang của một xe cứu hoả dài 30 m", right: () => lamTron(doDo(Math.asin((25 - 2.5) / 30)), 0) },
  { has: "Một mảnh vườn hình chữ nhật có đường chéo dài 25 m", right: () => lamTron(25 * Math.cos(32 * RAD) * 25 * Math.sin(32 * RAD), 0) },
];

/* ---------- chạy kiểm tra: mỗi câu khớp đúng một mục của CHECKS (theo chữ has trong đề bài; exact: cả đề bài) ---------- */
let n = 0;
const dung = new Set();
// số viết như phần đáp án và lời giải: "8,6", "−3", "9/40", "2 400"
const hien = (a) => (typeof a === "string" ? a.replace(/-/g, "−") : fmtDec(F(Math.round(a * 1000), 1000)));
const run = (id, qs) => qs.forEach((q, i) => {
  const at = id + "#" + (i + 1), cs_ = CHECKS.filter((c) => (c.exact ? q.q === c.has : q.q.includes(c.has)));
  assert.equal(cs_.length, 1, at + ": cần đúng một mục kiểm tra cho “" + q.q.slice(0, 60) + "…”, có " + cs_.length);
  const c = cs_[0]; assert.ok(!dung.has(c.has), at + ": hai câu cùng khớp “" + c.has + "”"); dung.add(c.has);
  try {
    if (q.type === "essay") {
      assert.ok(c.essay, "tự luận cần kiểm tra thang chấm"); c.essay(q);
      assert.ok(q.rubric.every((r) => r.p > 0 && Number.isInteger(r.p * 4)) && q.rubric.reduce((s, r) => s + r.p, 0) === 2, "thang chấm 2 điểm, mỗi ý chia hết cho 0,25");
      assert.ok(/^Đáp số: .+$/m.test(q.x), "gợi ý ghi đáp số"); n++; return;
    }
    const want = c.right(q);
    if (q.type === "num") {
      // trả lời bằng số: so theo giá trị; câu làm tròn có sai số tol nửa đơn vị làm tròn; lời giải ghi đúng đáp số
      const a = typeof q.ans === "number" ? q.ans : toNum(fr(q.ans));
      assert.ok(Math.abs(a - toNum(want)) <= 1e-9 * Math.max(1, Math.abs(a)), "đáp án " + q.ans + ", tính được " + toNum(want));
      if (typeof q.ans === "string") { const f = fr(q.ans); assert.ok(q.ans === f.n + "/" + f.d && f.d > 1, "đáp án phân số phải tối giản: " + q.ans); }
      if (/làm tròn/.test(q.q)) assert.ok(q.tol && Math.abs(q.tol - 0.5 * 10 ** -((String(a).split(".")[1] || "").length)) < 1e-12, "câu làm tròn cần tol bằng nửa đơn vị làm tròn");
      else assert.ok(q.tol === undefined, "câu không làm tròn không có tol");
      assert.ok(q.x.includes(hien(q.ans)), "lời giải không ghi đáp số " + hien(q.ans));
    } else {
      const got = { fill: () => q.ans[0], tf: () => q.a, tf4: () => q.a, match: () => q.r.slice(0, q.l.length), order: () => q.o }[q.type] || (() => q.o[0]);
      // so bằng JSON: câu hỏi nạp trong vm khác (tests/nap-de.js), mảng của nó không cùng nguyên mẫu với mảng ở đây
      assert.strictEqual(JSON.stringify(got()), JSON.stringify(want), "đáp án " + JSON.stringify(got()) + ", tính được " + JSON.stringify(want));
    }
    if (q.type === "mc") {
      assert.ok(!q.o.slice(1).includes(want), "nhiễu trùng đáp án đúng");
      // đáp án đúng không dài hơn hẳn lựa chọn sai dài nhất (Rút ra N2, N22): không quá 1,2 lần và quá 8 kí tự
      const dai = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(!(q.o[0].length > 1.2 * dai && q.o[0].length - dai > 8), "đáp án đúng dài hơn hẳn lựa chọn sai");
    }
    if (q.type === "tf4") assert.ok(want.includes(true) && want.includes(false), "đúng/sai 4 ý nên có cả ý đúng và ý sai");
    if (q.svg) assert.ok(hinhDaDoc.has(q.q), "câu có hình nhưng chưa đọc lại hình");
    if (c.more) c.more(q);
  } catch (e) { e.message = at + ": " + e.message; throw e; }
  n++;
});
// số câu, số đề lấy từ danh mục (data/banks/index.js)
assert.ok(bank(POOL) && bank(POOL).pool, "thiếu " + POOL);
for (const id of bank(POOL).pool.from) { const b = bank(id); assert.ok(b, "thiếu " + id); assert.equal(b.questions.length, b.n, id + ": số câu khác n của danh mục"); run(id, b.questions); }
const pool = bank(POOL), mine = pool.questions.filter((q) => q.src === POOL);
run(POOL, mine);
assert.equal(dung.size, CHECKS.length, "có mục kiểm tra không khớp câu nào: " + CHECKS.filter((c) => !dung.has(c.has)).map((c) => c.has).join(" | "));
// tự thử vài bộ đọc với giá trị biết trước
assert.ok(eq(ev("sin² 30° + cos² 30°"), F(1)) && eq(ev("4 sin² 45°"), F(2)) && eq(ev("tan 45° · cot 45°"), F(1)) && stmt("sin 30° = cos 60°") && !stmt("tan 30° = √3"));
assert.equal(capSo(giaiHe("{3x + 2y = 7; x − y = 4}")), "(3; −1)"); assert.equal(giaiHe("{x + y = 4; 2x + 2y = 8}"), "vô số nghiệm"); assert.equal(giaiHe("{x + y = 4; x + y = 7}"), "vô nghiệm");
assert.deepEqual(nghiem("(2x − 3)(x + 4) = 0").map(fmtF), ["−4", "3/2"]); assert.deepEqual(nghiem("x/(x − 2) + 3/(x + 2) = 1").map(fmtF), ["2/5"]); assert.deepEqual(loaiTru("x/(x − 2) + 3/(x + 2) = 1").map(fmtF), ["−2", "2"]);
assert.deepEqual([giaiBpt("3x − 5 > 7"), giaiBpt("−2x + 3 ≤ 9"), giaiBpt("(x − 1)/2 ≥ (2x + 1)/3")], ["x > 4", "x ≥ −3", "x ≤ −5"]);
assert.ok(laBpt("3x − 1 < 2x") && !laBpt("x² > 1") && !laBpt("0x + 2 > 0") && !laBpt("1/x < 2") && cungBpt("2x − 6 > 0", "x > 3") && !cungBpt("2x − 6 > 0", "x < 3") && !cungBpt("2x − 6 > 0", "x > 4"));
assert.ok(heThuc("A", "AB = BC · cos B") && heThuc("A", "AC = AB · tan B") && !heThuc("A", "AB = BC · sin B") && !heThuc("A", "AC = AB · cot B"));
assert.deepEqual([lamTron(8.4025, 1), lamTron(F(-47, 20), 1), lamTron(F(47, 20), 1)], [8.4, -2.4, 2.4]); assert.throws(() => lamTron(2.35, 1), /ranh giới/);
assert.equal(tenTiSo("A", "B", "C", "AC", "BC"), "sin B"); assert.equal(tenTiSo("A", "B", "C", "AB", "AC"), "cot B");
// bộ đọc hình bắt được hình vẽ sai tỉ lệ, góc vẽ sai số đo, góc vuông đặt sai đỉnh
{ const de1 = bank("toan9-gk1-de1").questions, h = de1.find((q) => q.svg && /HMN/.test(q.q)).svg, k = de1.find((q) => q.svg && /GHK/.test(q.q)).svg;
  assert.throws(() => tiLe(doDai(h.replace(">41 cm<", ">45 cm<"), "thử"), "thử"), /không đúng tỉ lệ/);
  assert.throws(() => gocGhi(k.replace(">38°<", ">45°<"), "thử"), /ghi 45° mà vẽ/);
  assert.throws(() => tamGiacVuong({ svg: h }, "M", "HMN"), /góc vuông ở M/); }

/* ---------- mức độ và ma trận ---------- */
assert.ok(pool.questions.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M), CHU_DE = Object.keys(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => cells.reduce((s, v) => s + v[k], 0)), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(CHU_DE.length, 8, "8 chủ đề, mỗi bài một chủ đề");
const nhom = (ts) => ts.reduce((s, t) => s + M[t].reduce((a, b) => a + b, 0), 0);
assert.deepEqual([nhom(CHU_DE.slice(0, 3)), nhom(CHU_DE.slice(3, 6)), nhom(CHU_DE.slice(6))], [8, 9, 8], "Chương I 8 câu, Chương II 9 câu, Chương IV 8 câu");
// chữ chủ đề đúng như kho cuối kì I (cùng tên bài)
const CK1 = Object.keys(bank("toan9-ck1-ngau-nhien").pool.matrix);
CHU_DE.forEach((t) => assert.ok(CK1.includes(t), "chủ đề “" + t + "” khác chữ của kho cuối kì I"));
// hai đề cố định chia đúng ma trận, theo thứ tự chủ đề của ma trận
pool.pool.from.forEach((id) => {
  const qs = bank(id).questions;
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => qs.filter((q) => q.topic === t && q.lv === l).length), v, id + " không đúng ma trận ở chủ đề " + t));
  assert.deepEqual([...new Set(qs.map((q) => q.topic))], CHU_DE, id + ": câu xếp theo thứ tự chủ đề của ma trận");
});
// mỗi ô có ít nhất gấp đôi số câu ô đó rút; ngoài mỗi đề cố định vẫn đủ; câu riêng ở ô nào cũng ít nhất bằng số câu ô đó rút; câu riêng nào cũng ở ô có rút
Object.entries(M).forEach(([t, v]) => v.forEach((k, i) => {
  const have = pool.questions.filter((q) => q.topic === t && q.lv === i + 1);
  assert.ok(have.length >= 2 * k, `ô (${t}, mức ${i + 1}) rút ${k} câu mà kho chỉ có ${have.length}`);
  pool.pool.from.forEach((id) => assert.ok(have.filter((q) => q.src !== id).length >= k, `ô (${t}, mức ${i + 1}) ngoài ${id} chỉ còn ${have.filter((q) => q.src !== id).length} câu`));
  assert.ok(mine.filter((q) => q.topic === t && q.lv === i + 1).length >= k, `ô (${t}, mức ${i + 1}): câu riêng ít hơn số câu ô rút`);
}));
mine.forEach((q, i) => assert.ok(M[q.topic] && M[q.topic][q.lv - 1] > 0, `${POOL}#${i + 1}: ô (${q.topic}, mức ${q.lv}) không có trong ma trận`));
// câu tự luận chỉ ở ô Vận dụng, ô đó còn câu khác dạng; số câu tự luận nhiều nhất của một lần rút: mỗi ô góp tối đa min(số câu tự luận, số câu ô rút)
const oTuLuan = [...new Set(pool.questions.filter((q) => q.type === "essay").map((q) => q.topic + "|" + q.lv))];
const tuLuanMax = oTuLuan.reduce((s, k) => { const [t, lv] = k.split("|"); assert.ok(+lv === 3 && pool.questions.some((q) => q.topic === t && q.lv === 3 && q.type !== "essay"), "câu tự luận ở " + k);
  return s + Math.min(M[t][2], pool.questions.filter((q) => q.topic === t && q.lv === 3 && q.type === "essay").length); }, 0);
assert.equal(tuLuanMax, 2, "mỗi lần rút nhiều nhất 2 câu tự luận");
const dem = (f) => pool.questions.filter(f).length;
assert.ok(dem((q) => q.type === "essay") >= 2 && dem((q) => q.type === "essay") <= 3, "kho có 2–3 câu tự luận");
assert.ok(pool.pool.from.every((id) => bank(id).questions.some((q) => q.svg)), "đề cố định nào cũng có câu có hình");
assert.equal(hinhDaDoc.size, dem((q) => q.svg), "hình nào cũng được đọc lại");
assert.ok(dem((q) => q.type === "num") >= 20 && dem((q) => q.type === "match") >= 2 && dem((q) => q.type === "order") >= 2 && dem((q) => q.type === "fill") >= 1, "kho có đủ trả lời bằng số, nối cột, sắp xếp, điền");
// đúng/sai 4 ý: ít nhất 4 câu trong kho, mỗi đề cố định có ít nhất 2 câu, kiểu Đ/S không lặp (Rút ra N9-ck1-khtn)
{ const tf4 = pool.questions.filter((q) => q.type === "tf4"), kieu = {};
  assert.ok(tf4.length >= 4 && pool.pool.from.every((id) => bank(id).questions.filter((q) => q.type === "tf4").length >= 2), "đúng/sai 4 ý: ít nhất 4 câu, mỗi đề cố định ít nhất 2");
  tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; });
  assert.equal(Math.max(...Object.values(kieu)), 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu)); }
// đáp án đúng không hay là lựa chọn dài nhất hay ngắn nhất (Rút ra N9-ck1-tin-congnghe): mỗi kiểu không quá một phần ba số câu nhiều lựa chọn
{ const mc = pool.questions.filter((q) => q.type === "mc"), hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
  assert.ok(mc.filter((q) => hon(q, (a, b) => a > b)).length <= mc.length / 3, "đáp án đúng là lựa chọn dài nhất ở quá một phần ba số câu nhiều lựa chọn");
  assert.ok(mc.filter((q) => hon(q, (a, b) => a < b)).length <= mc.length / 3, "đáp án đúng là lựa chọn ngắn nhất ở quá một phần ba số câu nhiều lựa chọn"); }
// đáp án không lặp chữ của nhãn chủ đề trên câu (Rút ra N6, N16b), trừ khi mọi lựa chọn cùng có chữ đó
{ const phanNhan = (t) => t.replace(/\s*\([^)]*\)$/, "").split(/ và |, /).map((s) => s.trim().toLowerCase()).filter((s) => s.includes(" ") || s.length >= 6);
  pool.questions.forEach((q) => { const da = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? q.ans : []; phanNhan(q.topic).forEach((c) => da.forEach((d) => {
    if (d.toLowerCase().includes(c)) assert.ok(q.type === "mc" && q.o.every((o) => o.toLowerCase().includes(c)), `đáp án “${d}” lặp chữ “${c}” của nhãn chủ đề`); })); }); }
const seen = new Set();
let essays = 0;
const thu = (hist) => {
  const d = Quiz.draw(pool, hist);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, pool.n);
  assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.lv === l).length), [10, 8, 7]);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.topic === t && q.lv === l).length), v, "rút đúng ma trận ở chủ đề " + t));
  assert.ok(d.questions.filter((q) => q.type === "essay").length <= 2);
  return d;
};
for (let k = 0; k < 400; k++) { const d = thu(); essays += d.questions.filter((q) => q.type === "essay").length; d.questions.forEach((q) => seen.add(Quiz.key(q))); }
assert.ok(mine.every((q) => seen.has(Quiz.key(q))), "400 lần rút thử phải gặp đủ các câu riêng");
// học sinh đã làm hết một đề cố định: lần rút sau không lấy lại câu của đề đó
pool.pool.from.forEach((id) => { const done = new Set(bank(id).questions.map(Quiz.key)); for (let k = 0; k < 20; k++) thu((q) => ({ done: done.has(Quiz.key(q)) ? 1 : 0, wrong: 0 })).questions.forEach((q) => assert.ok(!done.has(Quiz.key(q)), "đã làm hết " + id + " mà vẫn gặp lại câu của đề đó")); });

/* ---------- đề bài không trùng câu nào khác trong data/banks/9-toan.js (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const goc9 = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const deBai = BANKS.filter((b) => b.file === "9-toan.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc9(q.q) })));
deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });

/* ---------- dò lộ đáp án (Rút ra N5, N24, N8; như tests/toan9-ck1.js) giữa hai câu rút được cùng lúc: hai câu khác ô (chủ đề, mức), hoặc
   cùng một ô rút từ 2 câu (Biết của Bài 1, Bài 5, Bài 11; Vận dụng của Bài 12); hai câu cùng một đề cố định luôn rút được cùng lúc.
   Đáp án là số nguyên (từ 10), số thập phân, phân số, số âm, biểu thức có căn chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “≈”,
   “là”, “bằng”, “được”), đáp án có đơn vị ° tìm cả số kèm “°”; cặp nối: câu kia có cả hai vế. Đáp án bằng chữ (cặp số, bất đẳng thức,
   hệ phương trình…) có ở câu kia thì chỉ in ra khi chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM. ---------- */
const val = (s) => +String(s).replace(/\s/g, "");
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null ? [] : [].concat(q.ans), q.l || [], q.r || [], (q.rubric || []).map((c) => c.c)).map(String);
const KQ = "(?:=|≈|(?:^|[\\s(])(?:là|bằng|được))\\s+";
const SAU = "(?!\\d|,\\d|\\/|°|%|√|π|\\(|\\p{L}|[⁰¹²³⁴⁵⁶⁷⁸⁹]|\\s*[·+−:](?:\\s|\\d|\\()|\\s\\d{3}(?!\\d)|\\s(?:sin|cos|tan|cot)\\b)"; // số đứng trước chữ, π, ngoặc, tỉ số lượng giác là hệ số, thừa số; số đứng trước nhóm ba chữ số là phần đầu của số lớn hơn ("25 000x")
const soKQ = (s) => [...String(s).matchAll(new RegExp(KQ + "(\\d{1,3}(?: \\d{3})*)" + SAU, "gu"))].map((m) => val(m[1]));
const kqLa = (s, a) => new RegExp(KQ + a.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + SAU, "u").test(s);
const ten = new Map();
BANKS.filter((b) => /^toan9-gk1-de\d$/.test(b.id)).forEach((b) => b.questions.forEach((q, i) => ten.set(q.q, b.id.replace("toan9-gk1-", "") + "#" + (i + 1))));
mine.forEach((q, i) => ten.set(q.q, "own#" + (i + 1)));
const doLo = (qs, name, cungLuc) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    const so = [], kq = [], cum = [], cp = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const them = (a) => { a = String(a).replace(/-/g, "−");
      if (/^\d{1,3}(?: \d{3})*(?: [^\d\s]+)?$/.test(a) && !/°$/.test(a)) so.push(val(a.split(/ (?=[^\d\s])/)[0]));
      else if (/^−?\d[\d ,/]*(?: [^\d\s]+)?$/.test(a) || /^−?\d*√\d+$|^\d+π/.test(a)) kq.push(a.replace(/ [^\d\s]+$/, ""));
      else if (a.length >= 3) cum.push(a); };
    if (q.type === "essay") (/Đáp số: (.+)$/m.exec(q.x)[1].match(/\d{1,3}(?: \d{3})*/g) || []).forEach((x) => so.push(val(x)));
    else if (q.type === "num") { const a = typeof q.ans === "number" ? fmtDec(F(Math.round(q.ans * 1000), 1000)) : q.ans; them(a); if (q.unit === "°") kq.push(a + "°"); }
    else if (q.type === "fill") them(q.ans[0]); else if (q.type === "mc") them(q.o[0]);
    qs.forEach((p) => {
      if (p === q || !cungLuc(p, q)) return;
      const C = chu(p), T = C.map((s) => s.toLowerCase()), at = `${name(p)} lộ đáp án ${name(q)}: `;
      so.filter((x) => x >= 10 && C.flatMap(soKQ).includes(x)).forEach((x) => lo.push(at + x));
      kq.filter((a) => C.some((s) => kqLa(s, a))).forEach((a) => lo.push(at + a));
      cp.filter(([l, r]) => T.some((t) => t.includes(l.toLowerCase()) && t.includes(r.toLowerCase()))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      cum.filter((s) => { const re = new RegExp("(?<![\\p{L}\\p{N}])" + s.toLowerCase().replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + "(?![\\p{L}\\p{N}])", "u"); return T.some((t) => re.test(t)); }).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const cungLuc = (p, q) => p.topic !== q.topic || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2;
const { lo, chuLo } = doLo(pool.questions, (q) => ten.get(q.q), cungLuc);
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuLo.join("\n"));
const DA_XEM = [];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “≈ 8,6”, “là 201”, “= 9/40”, “= 27°”, cả hai vế một cặp nối, cặp số nghiệm
{ const tim = (has) => pool.questions.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const khac = tim("Một ấm nước đang ở 22 °C"), thuLo = (qs) => { const r = doLo(qs, (q) => q.q.slice(0, 10), () => true); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  assert.deepEqual(thuLo([tim("góc GHK bằng 38°"), gia(khac, "Ví dụ GK ≈ 8,6 cm.")]), ["8,6"]);
  assert.deepEqual(thuLo([tim("Một tiệm bánh mỗi ngày"), gia(khac, "Số bánh là 201.")]), [201]);
  assert.deepEqual(thuLo([tim("Một tiệm bánh mỗi ngày"), gia(khac, "Ví dụ có 201 chiếc.")]), []);
  assert.deepEqual(thuLo([tim("HN = 40 cm, MN = 41 cm"), gia(khac, "Tỉ số = 9/40.")]), ["9/40"]);
  assert.deepEqual(thuLo([tim("cao 16 cm và rộng 29 cm"), gia(khac, "Góc nghiêng = 29°.")]), ["29°"]);
  assert.deepEqual(thuLo([tim("cao 16 cm và rộng 29 cm"), gia(khac, "Giá là 29 000x đồng, B = 29 sin 30°.")]), []);
  assert.deepEqual(thuLo([tim("Nối mỗi tỉ số lượng giác của góc P"), gia(khac, "Ta có sin P = HQ/PQ.")]), ["sin P → HQ/PQ"]);
  assert.deepEqual(thuLo([tim("{0,3x + 0,2y = 1; 0,5x − 0,4y = 2,4} có nghiệm là"), gia(khac, "Cặp số (4; −1).")]), ["(4; −1)"]); }

/* ---------- câu của kho cuối kì I cùng chủ đề (đề “Ôn chủ đề” rút chung): không trùng đáp án, không lộ đáp án của nhau ----------
   Đề “Ôn chủ đề” (Phiên UX14) rút 10 câu của một chủ đề từ mọi đề Toán 9 có sẵn, nên câu của kho này rút được cùng câu cùng chủ đề của
   kho cuối kì I (cả hai câu cùng ô). Đáp án (lựa chọn đúng, đáp án điền, đáp án số) không trùng đáp án câu cùng chủ đề của kho đó; dò lộ
   như trên giữa mọi cặp câu cùng chủ đề của hai kho; chỗ đã xem ghi ở DA_XEM_CHU_DE. */
const kho1 = bank("toan9-ck1-ngau-nhien").questions;
BANKS.filter((b) => /^toan9-ck1-de\d$/.test(b.id)).forEach((b) => b.questions.forEach((q, i) => ten.set(q.q, "ck1-" + b.id.slice(-3) + "#" + (i + 1))));
kho1.filter((q) => q.src === "toan9-ck1-ngau-nhien").forEach((q, i) => ten.set(q.q, "ck1-own#" + (i + 1)));
const daAn = (q) => (q.type === "mc" ? q.o[0] : q.type === "fill" ? q.ans[0] : q.type === "num" ? hien(q.ans) : null);
pool.questions.forEach((q) => { const a = daAn(q); if (a === null) return; kho1.filter((p) => p.topic === q.topic && daAn(p) === a && !(/^\d$/.test(a))).forEach((p) => assert.fail(`${ten.get(q.q)} trùng đáp án “${a}” với ${ten.get(p.q)}`)); });
const loCD = CHU_DE.flatMap((t) => { const r = doLo(pool.questions.concat(kho1).filter((q) => q.topic === t), (q) => ten.get(q.q), (p, q) => ten.get(p.q).startsWith("ck1") !== ten.get(q.q).startsWith("ck1")); return r.lo.concat(r.chuLo); });
if (process.env.DO_LO) console.log("Đáp án có ở câu cùng chủ đề của kho cuối kì I (xem tay):\n" + loCD.join("\n"));
// đã xem (Phiên N9-gk1-toan): lời giải câu “Hệ phương trình nào dưới đây vô nghiệm?” của kho cuối kì I ghi một hệ khác “có vô số nghiệm”
// (phương trình sau gấp đôi phương trình đầu): nêu cách nhận ra, không nói gì về hệ {2x − 6y = 10; −x + 3y = −5}
const DA_XEM_CHU_DE = ["ck1-own#3 lộ đáp án own#9: có vô số nghiệm"];
assert.deepEqual(loCD, DA_XEM_CHU_DE, "đáp án có ở câu cùng chủ đề của kho cuối kì I đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM_CHU_DE");

/* ---------- không chép sách: so với chữ OCR của Toán 9 tập một (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ----------
   Chuỗi 8 từ liền nhau của đề bài, lựa chọn, lời giải, thang chấm không có trong sách; biểu thức có chữ x, y, căn (bỏ khoảng trắng)
   trùng chữ OCR thì in ra với DO_SACH=1 để xem tay (danh sách đã xem ghi ở SACH_XEM). */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = ["lop-9/toan-9-tap-1"].map((c) => path.join(BOOK, c, "chu.txt")).filter((f) => fs.existsSync(f));
const khongDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
// cụm từ chung của môn (tên bài, tên phương pháp, thuật ngữ, lời dặn làm tròn) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ
const TU_CHUNG = ["giải bài toán bằng cách lập hệ phương trình", "hệ hai phương trình bậc nhất hai ẩn", "phương trình bậc nhất hai ẩn", "phương trình quy về phương trình bậc nhất một ẩn",
  "giải hệ phương trình bằng phương pháp thế", "phương pháp cộng đại số", "bất phương trình bậc nhất một ẩn", "điều kiện xác định của phương trình",
  "làm tròn đến chữ số thập phân thứ nhất", "làm tròn đến chữ số thập phân thứ hai", "làm tròn đến hàng phần mười", "dùng máy tính cầm tay",
  "mỗi ý sau đúng hay sai", "tính chất bắc cầu của bất đẳng thức", "tỉ số lượng giác của góc nhọn", "hai góc nhọn phụ nhau", "hệ thức giữa cạnh và góc trong tam giác vuông"].map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const kho = pool.questions;
if (SACH.length) {
  const tho = SACH.map((f) => fs.readFileSync(f, "utf8").replace(/=== page-\d+ · (?:trang in \d+|[^=]+) ===/g, " ")).join(" | ");
  const sach = " " + khongDau(tho) + " ";
  const bao = (k) => kho.flatMap((q) => chu(q).flatMap((s) => chuoi(s, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q.q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  // biểu thức: bỏ khoảng trắng, dấu trừ về "-", dấu nhân về "."; chữ OCR ghi x² thành x2, x°, x?
  const gon = (s) => s.replace(/[−–—]/g, "-").replace(/[·.]/g, ".").replace(/[²°?ˆ]/g, "2").replace(/\s+/g, "");
  const sachBt = gon(tho);
  const bt = (s) => (String(s).match(/[0-9xy√(][0-9xy√()+−·:/²³,=<>≤≥ ]{5,}[0-9xy)²³]/g) || []).map(gon).filter((e) => e.length >= 7 && /\d/.test(e) && /[xy√]/.test(e) && /[=<>≤≥]/.test(e));
  const trung = [...new Set(kho.flatMap((q) => [q.q].concat(q.o || [], q.l || []).flatMap(bt).filter((e) => sachBt.includes(e)).map((e) => `${ten.get(q.q)}: ${e}`)))];
  if (process.env.DO_SACH) console.log("Biểu thức trùng chữ OCR của sách (xem tay):\n" + trung.join("\n"));
  const SACH_XEM = [];
  assert.deepEqual(trung, SACH_XEM, "biểu thức trùng chữ OCR của sách đã đổi: chạy DO_SACH=1, xem tay rồi sửa SACH_XEM");
  console.log("Đã so với chữ OCR của Toán 9 tập một (OnUp-Book).");
} else console.log("Không có ../OnUp-Book/lop-9/toan-9-tap-1/chu.txt: bỏ qua bước so với chữ của sách.");

/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, kể cả các kho Toán 9 cuối kì I, giữa kì II,
   cuối năm; đề bài không gần trùng câu của kho cuối kì I (cặp hai âm tiết chung, xem dưới) ---------- */
{
  const khac = BANKS.filter((b) => !b.pool && !/^toan9-gk1-/.test(b.id)).flatMap((b) => b.questions.map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " })))
    .concat(BANKS.filter((b) => b.pool && b.id !== POOL).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " }))));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q.q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
  // gần trùng (Rút ra N25; như tests/tin-congnghe9-gk2.js): đề bài cùng lựa chọn, ô nối, ô sắp xếp có từ 4 cặp hai âm tiết liền nhau chung với
  // một câu của kho cuối kì I và số cặp chung từ một nửa số cặp của câu ít cặp hơn thì báo. Không tính tên phương pháp, cụm chung của đề Toán
  // (CUM), cặp có số hay chữ đơn (biến, tên điểm), cặp của nhãn chủ đề và cặp có ở từ 3% số câu của data/banks/9-toan.js.
  const CUM = ["phương pháp cộng đại số", "phương pháp thế", "máy tính cầm tay", "cột trái", "cột phải", "tính giá trị của biểu thức", "mỗi ý sau đúng hay sai"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => c.split(" ").every((x) => /\p{L}{2}/u.test(x))); };
  const deToan9 = BANKS.filter((b) => b.file === "9-toan.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)), df = {};
  deToan9.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !nhan.has(c) && df[c] < 0.03 * deToan9.length)); };
  const gan = kho.flatMap((q) => { const c = capAm(q); return kho1.map((p) => { const d = capAm(p), chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q.q)} ~ ${ten.get(p.q)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  assert.deepEqual(gan, [], "đề bài gần trùng câu của kho cuối kì I");
}
console.log(n, "câu đã tính lại hoặc đọc lại hình (" + pool.pool.from.reduce((s, id) => s + bank(id).questions.length, 0) + " câu của " + pool.pool.from.length + " đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên; " + hinhDaDoc.size + " hình); kho " + pool.questions.length + " câu, ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề; trung bình " + (essays / 400).toFixed(2) + " câu tự luận mỗi lần rút.");
console.log("MATH OK");
