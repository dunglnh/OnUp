// Tính lại đáp án ngân hàng Toán 9 cuối kì I (data/banks/9-toan.js): hai đề cố định toan9-ck1-de1, toan9-ck1-de2 và các câu riêng
// của đề ngẫu nhiên toan9-ck1-ngau-nhien (Phiên N9-ck1-toan; Toán 9 tập một, Bài 1–17). Mỗi câu: kiểm tra đề có đúng số liệu (has)
// rồi so đáp án với kết quả tính bằng code: trắc nghiệm o[0], điền khuyết ans[0], đúng/sai a, đúng/sai 4 ý a (4 ý), trả lời bằng số
// ans (và tol), nối cột r[i] của từng ô l[i], sắp xếp thứ tự o; tự luận: các bước trong thang chấm và đáp án gợi ý.
// Số hữu tỉ tính chính xác ({n, d}); biểu thức có căn bậc hai, căn bậc ba, π, tỉ số lượng giác tính bằng số thực và so theo giá trị.
// Hệ hai phương trình bậc nhất hai ẩn giải lại bằng định thức (số hữu tỉ), bất phương trình bậc nhất một ẩn giải lại từ hai vế,
// phương trình quy về phương trình bậc nhất một ẩn tìm nghiệm bằng cách thử mọi số hữu tỉ có mẫu nhỏ (bỏ giá trị làm mẫu bằng 0).
// Câu có hình: đọc toạ độ trong hình (điểm có nhãn, đoạn thẳng, đường tròn, độ dài và số đo góc ghi trong hình), kiểm tra hình
// đúng tỉ lệ (các độ dài ghi trong hình tỉ lệ với độ dài vẽ, góc vẽ bằng số đo ghi, góc vuông có kí hiệu, tiếp tuyến vuông góc với
// bán kính, vị trí của hai đường tròn đúng như đề) rồi mới tính. Cuối cùng kiểm tra mức độ và ma trận (mỗi ô có ít nhất gấp đôi số
// câu ô đó rút, ngoài mỗi đề cố định vẫn đủ; rút thử nhiều lần ra đúng 10 Biết, 8 Hiểu, 7 Vận dụng; đã làm hết một đề cố định thì
// không gặp lại câu của đề đó), đáp án đúng của câu trắc nghiệm không dài hơn hẳn lựa chọn sai, dò lộ đáp án giữa các câu rút được
// cùng lúc (Rút ra N5, N24, N8) và, nếu có ../OnUp-Book, so chữ của câu với chữ OCR của sách (không chuỗi 8 từ nào trùng).
// Chạy: node tests/toan9-ck1.js → in MATH OK. DO_LO=1: in đáp án bằng chữ có ở câu rút được cùng lúc; DO_SACH=1: in chuỗi 6 từ
// và biểu thức trùng chữ OCR của sách để xem tay.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan9-ck1-ngau-nhien";

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
   ngoặc ngay sau), |…| (giá trị tuyệt đối), π, sin cos tan cot của số đo độ ("sin 30°"), nhân ngầm ("2√3", "3x", "(√3 + 1)(√3 − 1)");
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
    m = /^(sin|cos|tan|cot)\b/.exec(rest);
    if (m) { toks.push({ t: "f", v: m[1] }); i += m[0].length; continue; }
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
    if (t.t === "f") { const a = atom(); assert.equal((next() || {}).t, "°", "tỉ số lượng giác cần số đo độ trong " + src); return TRIG[t.v](toNum(a)); }
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
const duongTron = (svg) => circles(svg).filter((c) => c.r > 8 && c.fill === "none");
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
// vị trí tương đối của (O; R) và (O′; r), R ≥ r, OO′ = d (bảng tổng kết Bài 17)
const viTri = (R, r, d) => (d === R + r ? "tiếp xúc ngoài" : d === R - r ? "tiếp xúc trong" : d > R + r ? "ở ngoài nhau" : d < R - r ? "(o) đựng (o′)" : "cắt nhau");
const gonVT = (s) => s.toLowerCase().replace(/^hai đường tròn /, "");
// hình: các điểm có nhãn nằm trên đường tròn tâm O (đúng một đường tròn trong hình có tâm ở O)
const trenDT = (svg, names) => { const D = diem(svg), C = duongTron(svg).filter((c) => dist(c.c, D.O) < 0.6); assert.equal(C.length, 1, "hình cần một đường tròn tâm O"); names.forEach((n) => assert.ok(Math.abs(dist(D[n], D.O) - C[0].r) < 0.6, n + " phải nằm trên đường tròn")); return C[0]; };
const giaTri = (s) => ev(s.replace(/ (?:cm²|cm|m²|m)$/, "").replace(/ \(cm\)$/, ""));
const tamGiacVuong = (q, V, ten) => { const D = diem(q.svg); assert.deepEqual(Object.keys(D).sort(), ten.split("").sort(), "nhãn đỉnh"); assert.deepEqual(gocVuong(q.svg), [V], "góc vuông ở " + V); return D; };
const soTrongDe = (q, re) => { const m = re.exec(q.q); assert.ok(m, "đề thiếu " + re); return m.slice(1).map((s) => fr(s)); };

const CHECKS = [
  /* ----- Bài 1 ----- */
  { has: "Hệ thức nào dưới đây là phương trình bậc nhất hai ẩn?", right: (q) => { const m = q.o.filter(laPtHai); assert.equal(m.length, 1); return m[0]; } },
  { has: "một nghiệm của phương trình 3x − 2y = 8?", right: (q) => theo(q, /^(\(.+\))$/, (k) => laNghiem(cap(k[1]), "3x − 2y = 8")) },
  { has: "Cho hệ phương trình {x + 2y = 6; 3x − y = 11}", right: (q) => q.o.map((s) => { const m = /^Cặp số (\(.+?\)) là một nghiệm của (hệ|phương trình (.+))$/.exec(s); assert.ok(m, s); const p = cap(m[1]); return m[2] === "hệ" ? laNghiem(p, "x + 2y = 6") && laNghiem(p, "3x − y = 11") : laNghiem(p, m[3]); }) },
  { has: "Viết phương trình 4x − y = 9 dưới dạng ax + by = c", right: () => { const e = ptHai("4x − y = 9"); return [e.a, e.b, e.c].map(fmtF).join("; "); } },
  /* ----- Bài 2 ----- */
  { has: "Khi giải hệ phương trình {2x + y = 9; 3x − y = 11} bằng phương pháp cộng đại số", right: (q) => { const m = /\{(.+?); (.+?)\}/.exec(q.q), p = ptHai(m[1]), r = ptHai(m[2]); const a = add(p.a, r.a), b = add(p.b, r.b), c = add(p.c, r.c); assert.equal(toNum(b), 0, "cộng từng vế phải khử y"); return fmtF(a) + "x = " + fmtF(c); } },
  { has: "từ phương trình x − 4y = 5, biểu diễn x theo y ta được", right: (q) => theo(q, /^x = (.+)$/, (k) => [0, 1, 2, 5].every((y) => laNghiem({ x: ev(k[1], { y: F(y) }), y: F(y) }, "x − 4y = 5"))) },
  { has: "Hệ phương trình nào dưới đây vô nghiệm?", right: (q) => theo(q, /^(\{.+\})$/, (k) => giaiHe(k[1]) === "vô nghiệm"),
    // lời giải ghi đúng số nghiệm của ba hệ còn lại
    more: (q) => q.o.slice(1).forEach((o) => { const g = giaiHe(o); assert.ok(q.x.includes(o + (typeof g === "string" ? " có " + g : " có nghiệm " + capSo(g))), "lời giải về hệ " + o); }) },
  { has: "Dùng máy tính cầm tay, tìm nghiệm (x; y) của hệ phương trình {7x + 3y = 9; 2x − 5y = 26}", right: (q) => giaiHe(q.q).y },
  { has: "Nghiệm của hệ phương trình {3x + 2y = 8; x − y = 6} là", right: (q) => capSo(giaiHe(q.q)), more: (q) => q.o.slice(1).forEach((o) => { const p = cap(o); assert.ok(!(laNghiem(p, "3x + 2y = 8") && laNghiem(p, "x − y = 6")), "nhiễu " + o); }) },
  { has: "Giải hệ phương trình {2x − 3y = 4; x + 2y = 9} bằng phương pháp thế", right: (q) => {
    const g = giaiHe(q.q), f = (y) => sub(ev("2(9 − 2y) − 3y", { y }), F(4)), A = sub(f(F(1)), f(F(0))), B = f(F(0));
    const [a, b, c, d] = q.o;
    return [/x = 9 − 2y$/.test(a) && [0, 1, 4].every((y) => laNghiem({ x: ev("9 − 2y", { y: F(y) }), y: F(y) }, "x + 2y = 9")),
      b.endsWith(fmtF(A) + "y = " + fmtF(neg(B))), c.endsWith(capSo(g)), stmt(d.replace(/^.*thoả mãn /, ""), { x: g.x, y: g.y })];
  } },
  { has: "Biết (x; y) là nghiệm của hệ phương trình {5x + 3y = 9; 2x − 3y = 12}. Tính x − y.", right: (q) => { const g = giaiHe(q.q); return sub(g.x, g.y); } },
  { has: "Nối mỗi hệ phương trình ở cột trái với nghiệm của nó ở cột phải.", right: (q) => q.l.map((s) => capSo(giaiHe(s))), more: (q) => q.r.slice(q.l.length).forEach((o) => q.l.forEach((s) => assert.notEqual(capSo(giaiHe(s)), o, "ô thừa " + o))) },
  /* ----- Bài 3 ----- */
  { has: "Một nhóm 30 người đi xem kịch", right: (q) => { const [n, a, b, t] = soTrongDe(q, /Một nhóm (\d+) người .*?giá (\d+ \d{3}) đồng\/vé .*?giá (\d+ \d{3}) đồng\/vé, hết tất cả (\d+ \d{3} \d{3}) đồng/);
    const he = `{x + y = ${fmtInt(n)}; ${fmtInt(a)}x + ${fmtInt(b)}y = ${fmtInt(t)}}`, g = giaiHe(he); assert.ok(isInt(g.x) && isInt(g.y) && g.x.n > 0 && g.y.n > 0, "số vé phải nguyên dương"); return he; } },
  { has: "Hai lớp 9A và 9B có tổng cộng 84 học sinh", right: (q) => { const g = giaiHe("{x + y = 84; x − 3 = y + 3}");
    return ["Gọi số học sinh lớp 9A, 9B lần lượt là x, y (x, y là số nguyên dương)", "Lập hệ phương trình {x + y = 84; x − 3 = y + 3}", `Giải hệ phương trình được x = ${fmtInt(g.x)}, y = ${fmtInt(g.y)}`, `Đối chiếu điều kiện rồi trả lời: lớp 9A có ${fmtInt(g.x)} học sinh, lớp 9B có ${fmtInt(g.y)} học sinh`]; } },
  { has: "Một mảnh vườn hình chữ nhật có chu vi 64 m, chiều dài hơn chiều rộng 6 m", right: () => { const he = "{2(x + y) = 64; x − y = 6}", g = giaiHe(he); assert.ok(toNum(g.x) > toNum(g.y) && toNum(g.y) > 0); return he; } },
  { has: "Một trang trại nuôi gà và vịt, tổng cộng 600 con", right: (q) => { const g = giaiHe("{x + y = 600; x − 2y = 30}"); return q.o.map((s) => (/con vịt$/.test(s) ? eq(g.y, fr(/có (\d+) con vịt/.exec(s)[1])) : stmt(s, { x: g.x, y: g.y }))); } },
  { has: "Một ca nô đi xuôi dòng một khúc sông dài 96 km hết 3 giờ", essay: (q) => { const v1 = 96 / 3, v2 = 96 / 4, g = giaiHe(`{x + y = ${v1}; x − y = ${v2}}`);
    essayCheck(q, [`96 : 3 = ${v1}`, `96 : 4 = ${v2}`, `{x + y = ${v1}; x − y = ${v2}}`, `x = ${fmtF(g.x)}, y = ${fmtF(g.y)}`], [`Đáp số: vận tốc riêng của ca nô ${fmtF(g.x)} km/h, vận tốc dòng nước ${fmtF(g.y)} km/h`]); } },
  { has: "Mua 3 kg táo và 2 kg cam hết 195 000 đồng; mua 2 kg táo và 3 kg cam hết 180 000 đồng", right: (q) => { const g = giaiHe("{3x + 2y = 195 000; 2x + 3y = 180 000}"); assert.ok(q.x.includes("{3x + 2y = 195 000; 2x + 3y = 180 000}")); return g.x; } },
  { has: "Nếu đi với vận tốc 50 km/h thì đến B muộn hơn dự định 1 giờ", right: (q) => { const p = ptHai("s = 50(t + 1)", "s", "t"), r = ptHai("s = 60(t − 0,5)", "s", "t");
    const D = sub(mul(p.a, r.b), mul(r.a, p.b)), s = div(sub(mul(p.c, r.b), mul(r.c, p.b)), D); assert.ok(q.x.includes("{s − 50t = 50; s − 60t = −30}")); return s; } },
  { has: "Một phòng học có một số bàn", right: (q) => { const g = giaiHe("{x = 2(y + 4); x = 3(y − 4)}"); assert.ok(q.x.includes("{x − 2y = 8; x − 3y = −12}")); return g.x; } },
  /* ----- Bài 4 ----- */
  { has: "Tìm nghiệm của phương trình (x + 1)/(x − 3) + (x + 3)/(x − 1) = 2.", right: () => { const s = "(x + 1)/(x − 3) + (x + 3)/(x − 1) = 2", r = nghiem(s);
    assert.deepEqual(loaiTru(s).map(fmtF), ["1", "3"]); assert.equal(r.length, 1); return r[0]; } },
  { has: "Các nghiệm của phương trình x² − 6x + 9 = 4x − 12 là", right: (q) => { const r = nghiem("x² − 6x + 9 = 4x − 12").map(fmtF).sort().join(); return theo(q, /^(.+)$/, (k) => [...k[1].matchAll(/x = (−?\d+)/g)].map((m) => m[1]).sort().join() === r); } },
  { has: "Một phân số có tử số nhỏ hơn mẫu số 5 đơn vị", right: () => { const r = nghiem("(x + 4)/(x + 9) = 7/8"); assert.equal(r.length, 1); return r[0]; } },
  { has: "Cho phương trình (x + 1)/(x − 1) − (x − 1)/(x + 1) = 4/(x² − 1).", right: (q) => { const s = "(x + 1)/(x − 1) − (x − 1)/(x + 1) = 4/(x² − 1)", [L, R] = s.split(" = "), lt = loaiTru(s), r = nghiem(s);
    // ý b: (vế trái − vế phải) nhân mẫu chung x² − 1 bằng (vế trái − vế phải) của phương trình đã khử mẫu, ở mọi x thoả mãn ĐKXĐ
    const [kL, kR] = /ta được (.+)$/.exec(q.o[1])[1].split(" = ");
    const khu = [0, 2, 3, 5, -4].every((x) => { const v = { x: F(x) }; return eq(mul(sub(ev(L, v), ev(R, v)), ev("x² − 1", v)), sub(ev(kL, v), ev(kR, v))); });
    return [lt.map(fmtF).join() === "−1,1" && q.o[0].endsWith("x ≠ 1 và x ≠ −1"), khu, r.some((v) => eq(v, F(1))), r.length === 0]; } },
  /* ----- Bài 5 ----- */
  { has: "Cho a < b. Khẳng định nào dưới đây đúng?", right: (q) => theo(q, /^(.+)$/, (k) => [[1, 4], [-3, 2], [-7, -5]].every(([a, b]) => stmt(k[1], { a: F(a), b: F(b) }))) },
  { has: "Mỗi khẳng định sau về bất đẳng thức đúng hay sai?", right: (q) => { assert.equal(q.o[2], "Nếu m > 2,5 và 2,5 > n thì m > n");
    return [stmt(q.o[0]), [7, 8, 10].every((x) => !(x >= 7) || x > 7), [[3, 1], [2.6, -4], [100, 2.4]].every(([m, n]) => !(m > 2.5 && 2.5 > n) || m > n), stmt("4 · (−2) > 1 · (−2)")]; } },
  { has: "trẻ em được chơi tàu lượn khi có chiều cao h (m) từ 1,2 m trở lên", right: () => "h ≥ 1,2" },
  { has: "Sắp xếp các số sau theo thứ tự tăng dần.", right: (q) => q.o.slice().sort((a, b) => toNum(ev(a)) - toNum(ev(b))) },
  /* ----- Bài 6 ----- */
  { has: "Giải bất phương trình 3x − 7 > 8, ta được nghiệm là x > ___", right: () => { const g = giaiBpt("3x − 7 > 8"); assert.ok(g.startsWith("x > ")); return g.slice(4); } },
  { has: "Tìm số nguyên x lớn nhất thoả mãn bất phương trình 5 − 2x ≥ −9.", right: () => { const g = giaiBpt("5 − 2x ≥ −9"); assert.ok(g.startsWith("x ≤ ")); return Math.floor(toNum(fr(g.slice(4)))); } },
  { has: "Cho bất phương trình −4x + 6 ≤ 2x − 12.", right: (q) => { const g = giaiBpt("−4x + 6 ≤ 2x − 12"), thoa = (x) => stmt("−4x + 6 ≤ 2x − 12", { x: F(x) });
    const cong = [0, 1, 3].every((x) => eq(add(ev("−4x + 6", { x: F(x) }), ev("−2x − 6", { x: F(x) })), ev("−6x", { x: F(x) })) && eq(add(ev("2x − 12", { x: F(x) }), ev("−2x − 6", { x: F(x) })), F(-18)));
    return [cong && q.o[0].endsWith("−6x ≤ −18"), q.o[1].endsWith(g), thoa(4), thoa(0)]; } },
  { has: "Bất phương trình nào dưới đây có nghiệm là x < −4?", right: (q) => theo(q, /^(.+)$/, (k) => giaiBpt(k[1]) === "x < −4"),
    more: (q) => q.o.slice(1).forEach((o) => assert.ok(q.x.includes(o + " có nghiệm " + giaiBpt(o)), "lời giải về " + o)) },
  { has: "Một bể đang chứa 320 lít nước", right: () => { const g = giaiBpt("320 + 17x ≤ 1 200"); assert.ok(g.startsWith("x ≤ ")); return Math.floor(toNum(fr(g.slice(4)))); } },
  { has: "Câu lạc bộ bơi A thu phí 240 000 đồng mỗi tháng", right: () => { const g = giaiBpt("240 000 + 15 000x < 35 000x"); assert.equal(g, "x > 12"); return 13; } },
  { has: "Tìm số nguyên x nhỏ nhất thoả mãn bất phương trình (x + 7)/2 − (x − 1)/3 > 1.", right: () => { const g = giaiBpt("(x + 7)/2 − (x − 1)/3 > 1"); assert.ok(g.startsWith("x > ")); return Math.floor(toNum(fr(g.slice(4)))) + 1; } },
  { has: "Một hình chữ nhật có chiều dài 12 cm và chiều rộng x cm", right: () => { const g = giaiBpt("2(12 + x) ≤ 40"); assert.ok(g.startsWith("x ≤ ")); return "0 < " + g; } },
  /* ----- Bài 7 ----- */
  { has: "Khẳng định nào dưới đây về căn bậc hai của 0,36 là đúng?", right: (q) => theo(q, /^(.+)$/, (k) => { const t = k[1]; let m;
    if ((m = /^(−?\d+(?:,\d+)?) là một căn bậc hai của (\d+(?:,\d+)?)$/.exec(t))) return eq(mul(fr(m[1]), fr(m[1])), fr(m[2]));
    if ((m = /^Căn bậc hai số học của (\d+(?:,\d+)?) là (−?\d+(?:,\d+)?)$/.exec(t))) return eq(sqrt(fr(m[1])), fr(m[2]));
    if ((m = /^Số (\d+(?:,\d+)?) chỉ có một căn bậc hai là /.exec(t))) return toNum(fr(m[1])) === 0;
    assert.fail("khẳng định lạ: " + t); }) },
  { has: "Căn thức √(12 − 3x) xác định khi", right: () => giaiBpt("12 − 3x ≥ 0") },
  { has: "Mỗi khẳng định sau về căn bậc hai đúng hay sai?", right: (q) => [stmt(q.o[0]), stmt(q.o[1]), toNum(fr(/^Số (\S+) không/.exec(q.o[2])[1])) < 0, stmt(q.o[3])] },
  { has: "Với x < 0, biểu thức √(x²) bằng", right: (q) => theo(q, /^(.+)$/, (k) => [-3, -0.5, -12].every((x) => { try { return eq(ev(k[1], { x: fr(String(x).replace(".", ",")) }), ev("√(x²)", { x: fr(String(x).replace(".", ",")) })); } catch (e) { return false; } })) },
  /* ----- Bài 8 ----- */
  { has: "√2 · √32 = ___", right: (q) => { assert.ok(eq(fr(q.ans[0]), ev("√2 · √32"))); return q.ans[0]; } },
  { has: "√72 : √2 = ___", right: (q) => { assert.ok(eq(fr(q.ans[0]), ev("√72 : √2"))); return q.ans[0]; } },
  { has: "Mỗi đẳng thức sau đúng hay sai?", right: (q) => q.o.map((s) => stmt(s)) },
  { has: "Tính √0,5 · √18.", right: () => ev("√0,5 · √18") },
  /* ----- Bài 9 ----- */
  { has: "Đưa thừa số ra ngoài dấu căn, √98 viết được thành", right: (q) => bang(q, ev("√98")), more: (q) => assert.ok(/^\d+√\d+$/.test(q.o[0]) && isqrt(+q.o[0].split("√")[1]) === null) },
  { has: "Trục căn thức ở mẫu của biểu thức 10/√5", right: (q) => bang(q, ev("10/√5")), more: (q) => assert.ok(!/\/√/.test(q.o[0])) },
  { has: "Mỗi đẳng thức, bất đẳng thức sau đúng hay sai?", right: (q) => q.o.map((s) => stmt(s)) },
  { has: "Không dùng máy tính, sắp xếp các số sau theo thứ tự tăng dần.", right: (q) => q.o.slice().sort((a, b) => toNum(ev(a)) - toNum(ev(b))) },
  { has: "Hai miếng gỗ hình vuông có diện tích lần lượt là 180 cm² và 245 cm²", right: () => div(add(mul(F(4), ev("√180")), mul(F(4), ev("√245"))), ev("√5")) },
  { has: "Cho biểu thức P = √x/(√x − 4) − 8√x/(x − 16)", essay: (q) => {
    [0, 1, 4, 9, 25, 0.25, 7].forEach((x) => { const v = { x: fr(String(x).replace(".", ",")) }; assert.ok(eq(ev("√x/(√x − 4) − 8√x/(x − 16)", v), ev("√x/(√x + 4)", v)), "rút gọn sai ở x = " + x); });
    const [x] = soTrongDe(q, /khi x = (\d+)\.$/), r = fmtF(sqrt(x)), p = fmtF(ev("√x/(√x + 4)", { x }));
    essayCheck(q, ["x − 16 = (√x − 4)(√x + 4)", "x − 4√x = √x(√x − 4)", "P = √x/(√x + 4)", `Thay √${fmtF(x)} = ${r}, tính đúng P = ${r}/(${r} + 4) = ${p}`], [`Đáp số: a) P = √x/(√x + 4); b) P = ${p}`]); } },
  { has: "Tính giá trị của biểu thức A = 6/(3 − √3) − √3.", right: () => ev("6/(3 − √3) − √3") },
  { has: "Với x > 0, x ≠ 4, biểu thức (x − 4)/(√x − 2) − (x − 2√x)/√x bằng", right: (q) => theo(q, /^(.+)$/, (k) => [9, 25, 2.25, 1, 0.25].every((x) => { const v = { x: fr(String(x).replace(".", ",")) }; return eq(ev(k[1], v), ev("(x − 4)/(√x − 2) − (x − 2√x)/√x", v)); })) },
  /* ----- Bài 10 ----- */
  { has: "∛(−0,027) bằng", right: (q) => bang(q, cbrt(fr("−0,027"))) },
  { has: "Dùng máy tính cầm tay, tính ∛70", right: () => lamTron(cbrt(F(70)), 2) },
  { has: "Mỗi khẳng định sau về căn bậc ba đúng hay sai?", right: () => [eq(cbrt(F(-8)), F(-2)), [-3, 3].filter((x) => x ** 3 === 27).length === 2, stmt("(∛5)³ = 5"), [-2, 3].every((x) => eq(cbrt(F(x ** 3)), F(Math.abs(x))))] },
  { has: "Một hộp quà hình lập phương có thể tích 6 859 cm³", right: () => cbrt(F(6859)) },
  /* ----- Bài 11 ----- */
  { has: "Cho tam giác DEF vuông tại D (hình vẽ). Tỉ số DF/EF", right: (q) => { tamGiacVuong(q, "D", "DEF"); return tenTiSo("D", "F", "E", "DF", "EF"); } },
  { has: "Hai góc 18° và 72° là hai góc phụ nhau", right: (q) => theo(q, /^(.+)$/, (k) => stmt(k[1])) },
  { has: "Nối mỗi tỉ số lượng giác ở cột trái với giá trị của nó ở cột phải.", right: (q) => q.l.map((l) => { const m = q.r.filter((r) => eq(ev(l), ev(r))); assert.equal(m.length, 1, "ô " + l); return m[0]; }) },
  { has: "Dùng máy tính cầm tay, tính cot 50°", right: () => lamTron(ev("cot 50°"), 2) },
  { has: "Cho tam giác PQR vuông tại P có PQ = 7 cm, PR = 24 cm (hình vẽ)", right: (q) => { tamGiacVuong(q, "P", "PQR"); const ds = doDai(q.svg, "PQR"); tiLe(ds, "PQR");
    assert.deepEqual(ds.map((d) => cs(d.P + d.Q) + "=" + d.v).sort(), ["PQ=7", "PR=24"]); const QR = sqrt(F(7 * 7 + 24 * 24)); return div(F(24), QR); } },
  { has: "Cho tam giác HIK vuông tại H có HI = 20 cm, HK = 21 cm (hình vẽ)", right: (q) => { tamGiacVuong(q, "H", "HIK"); const ds = doDai(q.svg, "HIK"); tiLe(ds, "HIK");
    assert.deepEqual(ds.map((d) => cs(d.P + d.Q) + "=" + d.v).sort(), ["HI=20", "HK=21"]);
    const L = { HI: F(20), HK: F(21) }; L.IK = sqrt(add(mul(L.HI, L.HI), mul(L.HK, L.HK)));
    // giá trị tỉ số lượng giác của góc V tính từ độ dài các cạnh của tam giác vuông tại H
    const tiSo = (fn, V) => { const W = V === "I" ? "K" : "I", doi = L[cs("H" + W)], ke = L[cs("H" + V)], huyen = L.IK; return { sin: div(doi, huyen), cos: div(ke, huyen), tan: div(doi, ke), cot: div(ke, doi) }[fn]; };
    return q.o.map((s) => { let m = /^IK = (\d+) cm$/.exec(s); if (m) return eq(L.IK, F(+m[1])); m = /^(sin|cos|tan|cot) ([IK]) = (\d+\/\d+)$/.exec(s); assert.ok(m, s); return eq(tiSo(m[1], m[2]), fr(m[3])); }); } },
  { has: "Tính giá trị của biểu thức A = 6 sin 30° · cos 60° − 2 tan 45°.", right: () => ev("6 sin 30° · cos 60° − 2 tan 45°") },
  { has: "Cho góc nhọn α có sin α = 0,6. Giá trị của cos α là", right: (q) => { const h = F(5), doi = mul(fr("0,6"), h), ke = sqrt(sub(mul(h, h), mul(doi, doi))); return theo(q, /^(.+)$/, (k) => eq(fr(k[1]), div(ke, h))); } },
  /* ----- Bài 12 ----- */
  { has: "Cho tam giác KLM vuông tại K có LM = 12 cm, góc M = 52° (hình vẽ)", right: (q) => { tamGiacVuong(q, "K", "KLM"); const ds = doDai(q.svg, "KLM"), g = gocGhi(q.svg, "KLM");
    assert.deepEqual(ds.map((d) => cs(d.P + d.Q) + "=" + d.v), ["LM=12"]); assert.deepEqual(g.map((x) => x.O + cs(x.A + x.B) + x.v), ["MKL52"]);
    return lamTron(12 * Math.cos(52 * RAD), 1); } },
  { has: "Cho tam giác EFG vuông tại E có FG = 10 cm, góc F = 56°. Độ dài cạnh EF bằng", right: (q) => theo(q, /^(.+)$/, (k) => eq(giaTri(k[1]), 10 * Math.cos(56 * RAD))) },
  { has: "Cho tam giác RST vuông tại R có RS = 6 cm, RT = 11 cm. Tính số đo góc S", right: () => lamTron(doDo(Math.atan(11 / 6)), 0) },
  { has: "Cho tam giác UVW vuông tại U có VW = 20 cm, góc V = 36°", right: () => { const uw = 20 * Math.sin(36 * RAD), uv = 20 * Math.cos(36 * RAD); return [90 - 36 === 54, lamTron(uw, 1) === 11.8, lamTron(uv, 1) === 14.5, uw < uv]; } },
  { has: "Một con diều bay ở cuối sợi dây dài 60 m", right: () => lamTron(60 * Math.sin(47 * RAD), 0) },
  { has: "Một thang cuốn dài 11 m", right: () => lamTron(doDo(Math.asin(6 / 11)), 0) },
  { has: "Máng trượt của một cầu trượt nghiêng 32°", right: () => lamTron(2.4 / Math.sin(32 * RAD), 1) },
  { has: "Một cột cờ được giữ bằng một sợi dây néo", right: () => lamTron(8 / Math.cos(63 * RAD), 1) },
  /* ----- Bài 13 ----- */
  { has: "Cho đường tròn (O; 2,5 cm) và bốn điểm M, N, P, Q", right: (q) => { const R = 2.5, d = [...q.q.matchAll(/O([MNPQ]) = (\d+(?:,\d+)?) cm/g)].map((m) => [m[1], so(m[2])]); assert.equal(d.length, 4);
    const ngoai = d.filter((x) => x[1] > R); assert.equal(ngoai.length, 1); return "Điểm " + ngoai[0][0]; } },
  { has: "Đường tròn có bao nhiêu trục đối xứng?", right: () => "Vô số" },
  { has: "Cho đường tròn (O; 3 cm). Mỗi ý sau đúng hay sai?", right: () => [3 === 3, 3.5 < 3, true, false] },
  { has: "Cho đoạn thẳng EF = 15 cm. Tính bán kính", right: () => F(15, 2) },
  /* ----- Bài 14 ----- */
  { has: "Cho hai điểm A, B trên đường tròn (O) sao cho góc AOB = 64° (hình vẽ)", right: (q) => { trenDT(q.svg, ["A", "B"]); const g = gocGhi(q.svg, "cung 64°"); assert.deepEqual(g.map((x) => x.O + cs(x.A + x.B) + x.v), ["OAB64"]); return 360 - g[0].v; } },
  { has: "Cho đường tròn (O; 8 cm). Một dây của đường tròn này không thể có độ dài nào", right: (q) => theo(q, /^(\d+) cm$/, (k) => +k[1] > 2 * 8) },
  { has: "Trên đường tròn (O) lấy ba điểm A, B, C sao cho góc AOB = 50°, góc BOC = 80°", right: (q) => { trenDT(q.svg, ["A", "B", "C"]); const D = diem(q.svg), g = gocGhi(q.svg, "ba điểm");
    assert.deepEqual(g.map((x) => x.O + cs(x.A + x.B) + x.v), ["OAB50", "OBC80"]); assert.ok(Math.abs(goc(D.O, D.A, D.C) - 130) < 1.5, "tia OB nằm giữa hai tia OA, OC");
    return [50 === 50, 80 === 100, 360 - 50 === 310, 50 + 80 === 150]; } },
  { has: "Trên đường tròn (O; R) lấy hai điểm A, B sao cho dây AB = R", right: () => lamTron(2 * doDo(Math.asin(0.5)), 6) },
  /* ----- Bài 15 ----- */
  { has: "Một đường tròn có đường kính 12 cm. Tính độ dài cung 75°", right: () => lamTron(Math.PI * (12 / 2) * 75 / 180, 1) },
  { has: "Một hình quạt tròn có bán kính 10 cm, góc ở tâm 54°", right: (q) => { const ds = doDai(q.svg, "quạt"), g = gocGhi(q.svg, "quạt"), D = diem(q.svg);
    assert.deepEqual(ds.map((d) => cs(d.P + d.Q) + "=" + d.v), ["AO=10"]); assert.deepEqual(g.map((x) => x.O + x.v), ["O54"]); assert.ok(Math.abs(dist(D.O, D.A) - dist(D.O, D.B)) < 0.6, "OA = OB");
    const r = +/A (\d+(?:\.\d+)?) /.exec(q.svg)[1]; assert.ok(Math.abs(r - dist(D.O, D.A)) < 0.6, "cung tròn có bán kính OA"); return lamTron(Math.PI * 100 * 54 / 360, 1); } },
  { has: "Hình vành khuyên nằm giữa hai đường tròn cùng tâm O, có đường kính 14 cm và 8 cm", right: (q) => theo(q, /^(.+)$/, (k) => eq(giaTri(k[1]), Math.PI * ((14 / 2) ** 2 - (8 / 2) ** 2))) },
  { has: "Một đường tròn có chu vi 42 cm. Tính độ dài cung 120°", right: () => mul(F(42), F(120, 360)) },
  { has: "Lưỡi gạt nước của một ô tô", right: () => lamTron(120 / 360 * Math.PI * (50 * 50 - 15 * 15), 0) },
  { has: "Một vườn hoa có dạng hình quạt tròn bán kính 6 m, góc ở tâm 110°", right: () => lamTron(12 + Math.PI * 6 * 110 / 180, 1) },
  { has: "Một con lắc có dây dài 80 cm", right: () => lamTron(Math.PI * 80 * 30 / 180, 1) },
  { has: "Một bồn hoa có dạng hình vành khuyên", right: () => lamTron(Math.PI * (4 * 4 - 3 * 3) * 0.4, 1) },
  /* ----- Bài 16 ----- */
  { has: "Cho đường tròn (O; 6 cm) và đường thẳng a cách O một khoảng 5,5 cm", right: () => (5.5 < 6 ? "2" : 5.5 === 6 ? "1" : "0") },
  { has: "Cho đường tròn (O; 4 cm) và đường thẳng a cách O một khoảng 6 cm", right: () => (6 < 4 ? "Cắt nhau" : 6 === 4 ? "Tiếp xúc nhau" : "Không giao nhau") },
  { has: "Cho đường tròn (O; 5 cm) và ba đường thẳng m, n, p", right: (q) => { const [m, n, p] = soTrongDe(q, /cách O một khoảng (\d+) cm, (\d+) cm, (\d+) cm/).map(toNum), R = 5; return [m < R, n === R, p === R, m > R]; } },
  { has: "Đường tròn (O; R) và đường thẳng a có đúng hai điểm chung", right: () => "d < R" },
  { has: "Cho đường tròn (O; 3 cm) và điểm M sao cho OM = 5 cm", essay: (q) => { const ma = sqrt(F(25 - 9)); essayCheck(q, ["ΔOAM = ΔOBM (c.c.c)", "MA² = OM² − OA² = 25 − 9 = 16, MA = " + fmtF(ma) + " cm"], ["Đáp số: b) MA = " + fmtF(ma) + " cm"]); } },
  { has: "Từ một điểm M nằm ngoài đường tròn (O), kẻ hai tiếp tuyến MA, MB", right: (q) => { const [om, ma] = soTrongDe(q, /OM = (\d+) cm, MA = (\d+) cm/), oa = sqrt(sub(mul(om, om), mul(ma, ma))); return add(mul(F(2), oa), mul(F(2), ma)); } },
  { has: "góc AMB = 70° (hình vẽ). Tính độ dài đoạn thẳng MA", right: (q) => { const C = trenDT(q.svg, ["A", "B"]), D = diem(q.svg); assert.deepEqual(gocVuong(q.svg).sort(), ["A", "B"]); const g = gocGhi(q.svg, "tiếp tuyến");
    assert.deepEqual(g.map((x) => x.O + cs(x.A + x.B) + x.v), ["MAB70"]); const ds = doDai(q.svg, "tiếp tuyến"); assert.deepEqual(ds.map((d) => cs(d.P + d.Q) + "=" + d.v), ["AO=5"]);
    const k = C.r / 5, ma = 5 / Math.tan(g[0].v / 2 * RAD); assert.ok(Math.abs(dist(D.M, D.A) / k - ma) < 0.05 && Math.abs(dist(D.M, D.B) / k - ma) < 0.05, "MA, MB vẽ đúng tỉ lệ");
    return lamTron(ma, 1); } },
  { has: "Coi mặt cắt của Trái Đất qua tâm là một đường tròn bán kính 6 400 km", right: () => lamTron(Math.sqrt(6400.1 ** 2 - 6400 ** 2), 0) },
  /* ----- Bài 17 ----- */
  { has: "Cho hai đường tròn (O; 7 cm) và (O′; 3 cm) có OO′ = 10 cm", right: (q) => theo(q, /^(.+)$/, (k) => gonVT(k[1]) === viTri(7, 3, 10)) },
  { has: "Cho hai đường tròn (O; 6 cm) và (O′; 2 cm) có OO′ = 3 cm", right: (q) => theo(q, /^(.+)$/, (k) => gonVT(k[1]) === viTri(6, 2, 3)) },
  { has: "Nối mỗi độ dài của đoạn nối tâm OO′", right: (q) => q.l.map((l) => { const d = +/= (\d+) cm/.exec(l)[1], m = q.r.filter((r) => gonVT(r) === viTri(5, 3, d)); assert.equal(m.length, 1, l); return m[0]; }),
    more: (q) => q.r.slice(q.l.length).forEach((r) => assert.ok(q.l.every((l) => gonVT(r) !== viTri(5, 3, +/= (\d+) cm/.exec(l)[1])), "ô thừa " + r)) },
  { has: "Hai đường tròn (O; R) và (O′; 4 cm) tiếp xúc trong (hình vẽ)", right: (q) => { const D = diem(q.svg), C = duongTron(q.svg); assert.equal(C.length, 2);
    const lon = C.find((c) => dist(c.c, D.O) < 0.6), nho = C.find((c) => dist(c.c, D["O′"]) < 0.6); assert.ok(lon && nho && lon.r > nho.r, "hai tâm O, O′");
    const oo = dist(D.O, D["O′"]); assert.ok(Math.abs(oo - (lon.r - nho.r)) < 0.6, "hai đường tròn tiếp xúc trong");
    const ds = doDai(q.svg, "tiếp xúc trong"); assert.deepEqual(ds.map((d) => d.v), [3]); const k = oo / 3; assert.ok(Math.abs(nho.r / k - 4) < 0.05, "bán kính (O′) đúng tỉ lệ 4 cm");
    const R = 4 + 3; assert.ok(Math.abs(lon.r / k - R) < 0.05, "bán kính (O) đúng tỉ lệ"); return R; } }
];

/* ---------- chạy kiểm tra: mỗi câu khớp đúng một mục của CHECKS (theo chữ has trong đề bài) ---------- */
let n = 0;
const dung = new Set();
const run = (id, qs) => qs.forEach((q, i) => {
  const at = id + "#" + (i + 1), cs_ = CHECKS.filter((c) => q.q.includes(c.has));
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
      // trả lời bằng số: so theo giá trị; câu làm tròn có sai số tol thì số chưa làm tròn cũng nằm trong khoảng ans ± tol
      const a = typeof q.ans === "number" ? q.ans : toNum(fr(q.ans));
      assert.ok(Math.abs(a - toNum(want)) <= 1e-9 * Math.max(1, Math.abs(a)), "đáp án " + q.ans + ", tính được " + toNum(want));
      if (typeof q.ans === "string") { const f = fr(q.ans); assert.ok(q.ans === f.n + "/" + f.d && f.d > 1, "đáp án phân số phải tối giản: " + q.ans); }
      if (/làm tròn/.test(q.q) && q.tol) assert.ok(q.tol <= 0.5 * 10 ** -((String(a).split(".")[1] || "").length) + 1e-12, "tol lớn hơn nửa đơn vị làm tròn");
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
    if (c.more) c.more(q);
  } catch (e) { e.message = at + ": " + e.message; throw e; }
  n++;
});
for (const id of ["toan9-ck1-de1", "toan9-ck1-de2"]) { const b = bank(id); assert.ok(b, "thiếu " + id); assert.equal(b.questions.length, 25); run(id, b.questions); }
const pool = bank(POOL), mine = pool.questions.filter((q) => q.src === POOL);
run(POOL, mine);
assert.equal(dung.size, CHECKS.length, "có mục kiểm tra không khớp câu nào: " + CHECKS.filter((c) => !dung.has(c.has)).map((c) => c.has).join(" | "));
// tự thử vài bộ đọc với giá trị biết trước
assert.ok(eq(ev("2√3 · √12"), F(12)) && eq(ev("(√3 + 1)(√3 − 1)"), F(2)) && eq(ev("∛(−27) + ∛8"), F(-1)) && eq(ev("|1 − √2|"), Math.SQRT2 - 1));
assert.ok(eq(ev("sin 30° + cos 60°"), F(1)) && eq(ev("tan 45°"), F(1)) && eq(ev("1/(√5 − 2)"), Math.sqrt(5) + 2) && stmt("2√3 < 3√2") && !stmt("√(9 + 16) = √9 + √16"));
assert.equal(capSo(giaiHe("{3x + 2y = 7; x − y = 4}")), "(3; −1)"); assert.equal(giaiHe("{x + y = 4; 2x + 2y = 8}"), "vô số nghiệm"); assert.equal(giaiHe("{x + y = 4; x + y = 7}"), "vô nghiệm");
assert.deepEqual(nghiem("(2x − 3)(x + 4) = 0").map(fmtF), ["−4", "3/2"]); assert.deepEqual(nghiem("x/(x − 2) + 3/(x + 2) = 1").map(fmtF), ["2/5"]); assert.deepEqual(loaiTru("x/(x − 2) + 3/(x + 2) = 1").map(fmtF), ["−2", "2"]);
assert.deepEqual([giaiBpt("3x − 5 > 7"), giaiBpt("−2x + 3 ≤ 9"), giaiBpt("(x − 1)/2 ≥ (2x + 1)/3")], ["x > 4", "x ≥ −3", "x ≤ −5"]);
assert.deepEqual([lamTron(8.4025, 1), lamTron(F(-47, 20), 1), lamTron(F(47, 20), 1)], [8.4, -2.4, 2.4]); assert.throws(() => lamTron(2.35, 1), /ranh giới/);
assert.deepEqual([viTri(5, 3, 8), viTri(5, 3, 2), viTri(5, 3, 1), viTri(5, 3, 9), viTri(5, 3, 4)], ["tiếp xúc ngoài", "tiếp xúc trong", "(o) đựng (o′)", "ở ngoài nhau", "cắt nhau"]);
assert.equal(tenTiSo("A", "B", "C", "AC", "BC"), "sin B"); assert.equal(tenTiSo("A", "B", "C", "AB", "AC"), "cot B");
// bộ đọc hình bắt được hình vẽ sai tỉ lệ, góc vẽ sai số đo
{ const h = bank("toan9-ck1-de1").questions.find((q) => q.svg && /PQR/.test(q.q)).svg;
  assert.throws(() => tiLe(doDai(h.replace(">24 cm<", ">20 cm<"), "thử"), "thử"), /không đúng tỉ lệ/);
  const k = bank("toan9-ck1-de1").questions.find((q) => q.svg && /KLM/.test(q.q)).svg;
  assert.throws(() => gocGhi(k.replace(">52°<", ">45°<"), "thử"), /ghi 45° mà vẽ/); }

/* ---------- mức độ và ma trận ---------- */
assert.ok(pool.questions.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M), CHU_DE = Object.keys(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => cells.reduce((s, v) => s + v[k], 0)), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(CHU_DE.length, 17, "17 chủ đề, mỗi bài một chủ đề");
const nhom = (ts) => ts.reduce((s, t) => s + M[t].reduce((a, b) => a + b, 0), 0);
assert.deepEqual([nhom(CHU_DE.slice(0, 10)), nhom(CHU_DE.slice(10))], [14, 11], "đại số (Bài 1–10) 14 câu, hình học (Bài 11–17) 11 câu");
// hai đề cố định chia đúng ma trận
pool.pool.from.forEach((id) => Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => bank(id).questions.filter((q) => q.topic === t && q.lv === l).length), v, id + " không đúng ma trận ở chủ đề " + t)));
// mỗi ô có ít nhất gấp đôi số câu ô đó rút; ngoài mỗi đề cố định vẫn đủ; câu riêng ở ô nào cũng ít nhất bằng số câu ô đó rút; câu riêng nào cũng ở ô có rút
Object.entries(M).forEach(([t, v]) => v.forEach((k, i) => {
  const have = pool.questions.filter((q) => q.topic === t && q.lv === i + 1);
  assert.ok(have.length >= 2 * k, `ô (${t}, mức ${i + 1}) rút ${k} câu mà kho chỉ có ${have.length}`);
  pool.pool.from.forEach((id) => assert.ok(have.filter((q) => q.src !== id).length >= k, `ô (${t}, mức ${i + 1}) ngoài ${id} chỉ còn ${have.filter((q) => q.src !== id).length} câu`));
  assert.ok(mine.filter((q) => q.topic === t && q.lv === i + 1).length >= k, `ô (${t}, mức ${i + 1}): câu riêng ít hơn số câu ô rút`);
}));
mine.forEach((q, i) => assert.ok(M[q.topic] && M[q.topic][q.lv - 1] > 0, `${POOL}#${i + 1}: ô (${q.topic}, mức ${q.lv}) không có trong ma trận`));
// câu tự luận chỉ ở các ô Vận dụng rút 1 câu (lập hệ, rút gọn, tiếp tuyến), ô đó còn câu khác dạng: mỗi lần rút nhiều nhất 3 câu tự luận
const oTuLuan = [...new Set(pool.questions.filter((q) => q.type === "essay").map((q) => q.topic + "|" + q.lv))];
assert.ok(oTuLuan.length <= 3 && oTuLuan.every((k) => { const [t, lv] = k.split("|"); return +lv === 3 && M[t][2] === 1 && pool.questions.some((q) => q.topic === t && q.lv === 3 && q.type !== "essay"); }), "câu tự luận: " + oTuLuan);
const dem = (f) => pool.questions.filter(f).length;
assert.deepEqual([dem((q) => q.type === "essay"), dem((q) => q.svg)], [3, 9], "kho: 3 tự luận, 9 câu có hình");
assert.ok(dem((q) => q.type === "tf4") >= 8 && dem((q) => q.type === "num") >= 20 && dem((q) => q.type === "match") >= 3 && dem((q) => q.type === "order") >= 3, "kho có đủ đúng/sai 4 ý, trả lời bằng số, nối cột, sắp xếp");
const seen = new Set();
let essays = 0;
const thu = (hist) => {
  const d = Quiz.draw(pool, hist);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, 25);
  assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.lv === l).length), [10, 8, 7]);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.topic === t && q.lv === l).length), v, "rút đúng ma trận ở chủ đề " + t));
  assert.ok(d.questions.filter((q) => q.type === "essay").length <= 3);
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

/* ---------- dò lộ đáp án (Rút ra N5, N24, N8; như tests/toan6-ck2.js) giữa hai câu rút được cùng lúc: mọi ô của ma trận rút 1 câu,
   nên hai câu rút được cùng lúc khi khác ô (chủ đề, mức); hai câu cùng một đề cố định luôn khác ô. Đáp án là số nguyên (từ 10),
   số thập phân, phân số, số âm, biểu thức có căn chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “≈”, “là”, “bằng”, “được”);
   cặp nối: câu kia có cả hai vế. Đáp án bằng chữ (cặp số, bất đẳng thức, tên vị trí…) có ở câu kia thì chỉ in ra khi chạy với
   DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM. ---------- */
const val = (s) => +String(s).replace(/\s/g, "");
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null ? [] : [].concat(q.ans), q.l || [], q.r || [], (q.rubric || []).map((c) => c.c)).map(String);
const KQ = "(?:=|≈|(?:^|[\\s(])(?:là|bằng|được))\\s+";
const SAU = "(?!\\d|,\\d|\\/|°|%|√|π|\\(|\\p{L}|[⁰¹²³⁴⁵⁶⁷⁸⁹]|\\s*[·+−:](?:\\s|\\d|\\())"; // số đứng trước chữ, π, ngoặc là hệ số, thừa số
const soKQ = (s) => [...String(s).matchAll(new RegExp(KQ + "(\\d{1,3}(?: \\d{3})*)" + SAU, "gu"))].map((m) => val(m[1]));
const kqLa = (s, a) => new RegExp(KQ + a.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + SAU, "u").test(s);
const cungLuc = (p, q) => p.topic !== q.topic || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2;
const ten = new Map();
BANKS.filter((b) => b.file === "9-toan.js" && !b.pool).forEach((b) => b.questions.forEach((q, i) => ten.set(q.q, b.id.replace("toan9-ck1-", "") + "#" + (i + 1))));
mine.forEach((q, i) => ten.set(q.q, "own#" + (i + 1)));
const doLo = (qs, name) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    const so = [], kq = [], cum = [], cp = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const them = (a) => { a = String(a).replace(/-/g, "−");
      if (/^\d{1,3}(?: \d{3})*(?: [^\d\s]+)?$/.test(a) && !/°$/.test(a)) so.push(val(a.split(/ (?=[^\d\s])/)[0]));
      else if (/^−?\d[\d ,/]*(?: [^\d\s]+)?$/.test(a) || /^−?\d*√\d+$|^\d+π/.test(a)) kq.push(a.replace(/ [^\d\s]+$/, ""));
      else if (a.length >= 3) cum.push(a); };
    if (q.type === "essay") (/Đáp số: (.+)$/m.exec(q.x)[1].match(/\d{1,3}(?: \d{3})*/g) || []).forEach((x) => so.push(val(x)));
    else if (q.type === "num") them(typeof q.ans === "number" ? fmtDec(F(Math.round(q.ans * 1000), 1000)) : q.ans); else if (q.type === "fill") them(q.ans[0]); else if (q.type === "mc") them(q.o[0]);
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
const { lo, chuLo } = doLo(pool.questions, (q) => ten.get(q.q));
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuLo.join("\n"));
// đã xem (Phiên N9-ck1-toan): “vô số nghiệm” của hệ phương trình không gợi ý số trục đối xứng của đường tròn
const DA_XEM = ["own#3 lộ đáp án de2#19: Vô số"];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “≈ 7,4”, “= 2√3”, “là 296”, cả hai vế một cặp nối, cặp số nghiệm
{ const tim = (has) => pool.questions.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const khac = tim("Đường tròn có bao nhiêu trục đối xứng?"), thuLo = (qs) => { const r = doLo(qs, (q) => q.q.slice(0, 10)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  assert.deepEqual(thuLo([tim("Tính độ dài cạnh KM"), gia(khac, "Ví dụ KM ≈ 7,4 cm.")]), ["7,4"]);
  assert.deepEqual(thuLo([tim("Trục căn thức ở mẫu của biểu thức 10/√5"), gia(khac, "Ví dụ 10/√5 = 2√5.")]), ["2√5"]);
  assert.deepEqual(thuLo([tim("Tính số đo cung lớn AB"), gia(khac, "Số đo cung lớn là 296°.")]), []);
  assert.deepEqual(thuLo([tim("Tính số đo cung lớn AB"), gia(khac, "Kết quả là 296.")]), [296]);
  assert.deepEqual(thuLo([tim("Nối mỗi hệ phương trình ở cột trái"), gia(khac, "Hệ {x + y = 5; x − y = 1} có nghiệm (3; 2).")]), ["{x + y = 5; x − y = 1} → (3; 2)"]);
  assert.deepEqual(thuLo([tim("Hai miếng gỗ hình vuông"), gia(khac, "Ví dụ l = 52π/3, S = 52x, P = 52(x + 1).")]), []);
  assert.deepEqual(thuLo([tim("Nghiệm của hệ phương trình {3x + 2y = 8; x − y = 6} là"), gia(khac, "Cặp số (4; −2).")]), ["(4; −2)"]); }

/* ---------- không chép sách: so với chữ OCR của Toán 9 tập một (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ----------
   Chuỗi 8 từ liền nhau của đề bài, lựa chọn, lời giải, thang chấm không có trong sách; biểu thức có chữ x, y, căn (bỏ khoảng trắng)
   trùng chữ OCR thì in ra với DO_SACH=1 để xem tay (danh sách đã xem ghi ở SACH_XEM). */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = ["lop-9/toan-9-tap-1"].map((c) => path.join(BOOK, c, "chu.txt")).filter((f) => fs.existsSync(f));
const khongDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
// cụm từ chung của môn (tên bài, tên phương pháp, thuật ngữ, lời dặn làm tròn) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ
const TU_CHUNG = ["giải bài toán bằng cách lập hệ phương trình", "hệ hai phương trình bậc nhất hai ẩn", "phương trình bậc nhất hai ẩn", "giải hệ phương trình bằng phương pháp thế",
  "phương pháp cộng đại số", "vị trí tương đối của hai đường tròn", "vị trí tương đối của đường thẳng và đường tròn", "bất phương trình bậc nhất một ẩn",
  "làm tròn đến chữ số thập phân thứ nhất", "làm tròn đến chữ số thập phân thứ hai", "làm tròn đến hàng phần mười", "điều kiện xác định của phương trình",
  "hai đường tròn", "đường thẳng và đường tròn", "mỗi ý sau đúng hay sai", "theo thứ tự tăng dần",
  "đưa thừa số ra ngoài dấu căn", "đưa thừa số vào trong dấu căn", "tính chất của hai tiếp tuyến cắt nhau"].map((p) => " " + p.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim() + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const kho = pool.questions;
if (SACH.length) {
  const tho = SACH.map((f) => fs.readFileSync(f, "utf8").replace(/=== page-\d+ · trang in \d+ ===/g, " ")).join(" | ");
  const sach = " " + khongDau(tho) + " ";
  const bao = (k) => kho.flatMap((q) => chu(q).flatMap((s) => chuoi(s, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q.q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  // biểu thức: bỏ khoảng trắng, dấu trừ về "-", dấu nhân về "."
  const gon = (s) => s.replace(/[−–—]/g, "-").replace(/[·.]/g, ".").replace(/\s+/g, "");
  const sachBt = gon(tho);
  const bt = (s) => (String(s).match(/[0-9xy√∛(][0-9xy√∛()+−·:/²³,=<>≤≥ ]{5,}[0-9xy)²³]/g) || []).map(gon).filter((e) => e.length >= 7 && /\d/.test(e) && /[xy√∛]/.test(e) && /[=<>≤≥]/.test(e));
  const trung = [...new Set(kho.flatMap((q) => [q.q].concat(q.o || [], q.l || []).flatMap(bt).filter((e) => sachBt.includes(e)).map((e) => `${ten.get(q.q)}: ${e}`)))];
  if (process.env.DO_SACH) console.log("Biểu thức trùng chữ OCR của sách (xem tay):\n" + trung.join("\n"));
  const SACH_XEM = [];
  assert.deepEqual(trung, SACH_XEM, "biểu thức trùng chữ OCR của sách đã đổi: chạy DO_SACH=1, xem tay rồi sửa SACH_XEM");
  console.log("Đã so với chữ OCR của Toán 9 tập một (OnUp-Book).");
} else console.log("Không có ../OnUp-Book/lop-9/toan-9-tap-1/chu.txt: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác ---------- */
{
  const khac = BANKS.filter((b) => !b.pool && b.file !== "9-toan.js").flatMap((b) => b.questions.map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q.q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại hoặc đọc lại hình (50 câu của 2 đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + pool.questions.length + " câu, ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề; trung bình " + (essays / 400).toFixed(2) + " câu tự luận mỗi lần rút.");
console.log("MATH OK");
