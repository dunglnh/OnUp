// Tính lại đáp án ngân hàng Toán 9 giữa kì II (data/banks/9-toan.js): hai đề cố định toan9-gk2-de1, toan9-gk2-de2 và các câu riêng
// của đề ngẫu nhiên toan9-gk2-ngau-nhien (Phiên N9-gk2-toan; Toán 9 tập hai, Bài 18–21 và Bài 27–30). Mỗi câu: kiểm tra đề có đúng
// số liệu (has) rồi so đáp án với kết quả tính bằng code: trắc nghiệm o[0], điền khuyết ans[0], đúng/sai 4 ý a, trả lời bằng số
// ans (và tol), nối cột r[i] của từng ô l[i], sắp xếp thứ tự o; tự luận: các bước trong thang chấm và đáp án gợi ý.
// Số hữu tỉ tính chính xác ({n, d}); căn bậc hai không khai được tính bằng số thực. Phương trình bậc hai đọc từ chữ của đề (hai vế
// có thể có ngoặc, bình phương), tính lại hệ số a, b, c, biệt thức Δ, các nghiệm, tổng và tích hai nghiệm (định lí Viète); phương
// trình có ẩn ở mẫu tìm nghiệm bằng cách thử mọi số hữu tỉ có mẫu nhỏ. Hình: parabol trên lưới ô vuông (gốc toạ độ, đơn vị của lưới,
// hệ số a đọc từ đường cong và từ các điểm được đánh dấu tại nút lưới, hai cách phải khớp), hình có đường tròn (điểm có nhãn nằm trên
// đường tròn, số đo góc ghi trong hình bằng góc vẽ, kí hiệu góc vuông, các góc mà câu hỏi hỏi đo lại trên hình phải bằng đáp án).
// Cuối cùng kiểm tra mức độ và ma trận (mỗi ô có ít nhất gấp đôi số câu ô đó rút, ngoài mỗi đề cố định vẫn đủ; rút thử nhiều lần ra
// đúng 10 Biết, 8 Hiểu, 7 Vận dụng; đã làm hết một đề cố định thì không gặp lại câu của đề đó), đáp án đúng của câu trắc nghiệm không
// dài hơn hẳn lựa chọn sai và không hay là lựa chọn dài nhất, ngắn nhất, câu đúng/sai 4 ý không lặp kiểu Đ/S, đáp án không lặp chữ
// của nhãn chủ đề, dò lộ đáp án giữa các câu rút được cùng lúc (Rút ra N5, N24, N8) và, nếu có ../OnUp-Book, so chữ của câu với
// chữ OCR của Toán 9 tập một, tập hai (không chuỗi 8 từ nào trùng); so với câu của mọi kho khác.
// Chạy: node tests/toan9-gk2.js → in MATH OK. DO_LO=1: in đáp án bằng chữ có ở câu rút được cùng lúc; DO_SACH=1: in chuỗi 6 từ
// và biểu thức trùng chữ OCR của sách để xem tay; DO_KHO=1: in chuỗi 6 từ trùng câu của kho khác.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan9-gk2-ngau-nhien";

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

/* ---------- phương trình bậc hai một ẩn ---------- */
// "ax² + bx + c = 0" (hai vế có thể có ngoặc, bình phương, số thập phân; ẩn mặc định là x) → { a, b, c } của vế trái trừ vế phải.
// Phải là phương trình bậc hai: vế trái trừ vế phải là đa thức bậc hai (thử thêm bốn giá trị), a ≠ 0; ẩn ở mẫu thì lỗi chia cho 0.
const bac2 = (s, X) => {
  X = X || "x";
  const [L, R] = s.split(" = "); assert.ok(R !== undefined, "không phải phương trình: " + s);
  const f = (x) => sub(ev(L, { [X]: F(x) }), ev(R, { [X]: F(x) }));
  const c = f(0), p = f(1), m = f(-1), a = div(sub(add(p, m), mul(F(2), c)), F(2)), b = div(sub(p, m), F(2));
  [2, -3, 5, 7].forEach((x) => assert.ok(eq(f(x), add(add(mul(a, F(x * x)), mul(b, F(x))), c)), "không phải phương trình bậc hai: " + s));
  assert.ok(toNum(a) !== 0, "hệ số a bằng 0: " + s);
  return { a, b, c };
};
const laBac2 = (s) => { try { bac2(s); return true; } catch (e) { return false; } };
const delta = (e) => sub(mul(e.b, e.b), mul(F(4), mul(e.a, e.c)));
const deltaPhay = (e) => { const b1 = div(e.b, F(2)); return sub(mul(b1, b1), mul(e.a, e.c)); };
// các nghiệm theo công thức nghiệm, tăng dần (nghiệm kép: một số; vô nghiệm: mảng rỗng)
const nghiem2 = (e) => {
  const d = delta(e); if (toNum(d) < 0) return [];
  const sd = sqrt(d), x1 = div(sub(neg(e.b), sd), mul(F(2), e.a)), x2 = div(add(neg(e.b), sd), mul(F(2), e.a));
  return eq(x1, x2) ? [x1] : [x1, x2].sort((u, v) => toNum(u) - toNum(v));
};
const tong = (e) => div(neg(e.b), e.a), tich = (e) => div(e.c, e.a); // định lí Viète
// "x = 7/2; x = −1/2", "x₁ = 3; x₂ = −5", "x = 5" → các số
const docNghiem = (s) => s.split("; ").map((p) => { const m = /^x[₁₂]? = (.+)$/.exec(p.trim()); assert.ok(m, "không đọc được nghiệm: " + s); return ev(m[1]); });
const cungTap = (u, v) => u.length === v.length && u.every((a) => v.some((b) => eq(a, b))) && v.every((b) => u.some((a) => eq(a, b)));

/* ---------- parabol trên lưới ô vuông ----------
   Trục hoành, trục tung: hai đoạn nét 1,5; lưới: các đoạn màu line nét 1, cách đều nhau u (px một đơn vị), trục nằm trên đường lưới;
   số ghi trên trục hoành ở đúng cột của nó (số âm lệch trái 3 px cho dấu trừ), số trên trục tung ở đúng hàng; đường parabol: polyline
   màu acc đi qua gốc toạ độ, mọi điểm thoả y = a·x² với cùng một a; điểm được đánh dấu (chấm có nhãn) nằm ở nút lưới, trên parabol.
   Trả về a (số hữu tỉ, tính từ điểm đánh dấu, phải khớp a đọc từ đường cong) và toạ độ các điểm đánh dấu. */
const parabol = (svg, ten) => {
  const L = lines(svg), truc = L.filter((l) => l.w === 1.5);
  const ngang = truc.filter((l) => l.a[1] === l.b[1]), doc = truc.filter((l) => l.a[0] === l.b[0]);
  assert.ok(ngang.length === 1 && doc.length === 1, ten + ": cần đúng một trục hoành và một trục tung");
  const ox = doc[0].a[0], oy = ngang[0].a[1];
  const luoi = L.filter((l) => l.stroke === "line" && l.w === 1);
  const gx = [...new Set(luoi.filter((l) => l.a[0] === l.b[0]).map((l) => l.a[0]))].sort((a, b) => a - b);
  const gy = [...new Set(luoi.filter((l) => l.a[1] === l.b[1]).map((l) => l.a[1]))].sort((a, b) => a - b);
  const u = gx[1] - gx[0];
  gx.forEach((x, i) => i && assert.ok(Math.abs(x - gx[i - 1] - u) < 0.15, ten + ": lưới không đều"));
  gy.forEach((y, i) => i && assert.ok(Math.abs(y - gy[i - 1] - u) < 0.15, ten + ": lưới không phải ô vuông"));
  assert.ok(gx.some((x) => Math.abs(x - ox) < 0.15) && gy.some((y) => Math.abs(y - oy) < 0.15), ten + ": trục không nằm trên đường lưới");
  const so = texts(svg).filter((t) => /^−?\d+$/.test(t.t)).map((t) => ({ at: t.at, v: +t.t.replace("−", "-") }));
  const tx = so.filter((t) => Math.abs(t.at[0] - (ox + t.v * u - (t.v < 0 ? 3 : 0))) < 0.6), ty = so.filter((t) => Math.abs(t.at[1] - (oy - t.v * u + 4.5)) < 0.6);
  assert.ok(tx.length >= 4 && tx.length + ty.length === so.length, ten + ": số ghi trên trục không khớp lưới");
  const pl = [...svg.matchAll(/<polyline [^>]*>/g)].map((m) => attrs(m[0])).filter((a) => a.stroke === "acc");
  assert.equal(pl.length, 1, ten + ": cần đúng một đường parabol");
  const ds = nums(pl[0].points), pts = [];
  for (let i = 0; i < ds.length; i += 2) pts.push([(ds[i] - ox) / u, (oy - ds[i + 1]) / u]);
  const xa = pts.filter((p) => Math.abs(p[0]) >= 1).map((p) => p[1] / (p[0] * p[0])), aCong = xa.reduce((s, v) => s + v, 0) / xa.length;
  pts.forEach((p) => assert.ok(Math.abs(p[1] - aCong * p[0] * p[0]) < 0.06, ten + ": đường cong không phải parabol y = ax²"));
  assert.ok(pts.some((p) => Math.abs(p[0]) < 1e-6 && Math.abs(p[1]) < 1e-6), ten + ": parabol phải đi qua gốc toạ độ");
  const D = diem(svg), P = {};
  Object.entries(D).forEach(([k, p]) => {
    const x = (p[0] - ox) / u, y = (oy - p[1]) / u;
    assert.ok(Math.abs(x - Math.round(x)) < 0.02 && Math.abs(y - Math.round(y)) < 0.02, ten + ": điểm " + k + " không nằm ở nút lưới");
    P[k] = [F(Math.round(x)), F(Math.round(y))];
  });
  const ks = Object.keys(P); assert.ok(ks.length >= 1 && toNum(P[ks[0]][0]) !== 0, ten + ": cần một điểm đánh dấu khác gốc toạ độ");
  const a = div(P[ks[0]][1], mul(P[ks[0]][0], P[ks[0]][0]));
  ks.forEach((k) => assert.ok(eq(P[k][1], mul(a, mul(P[k][0], P[k][0]))), ten + ": điểm " + k + " không thuộc parabol"));
  assert.ok(Math.abs(toNum(a) - aCong) < 0.01, ten + ": hệ số đọc từ điểm đánh dấu khác hệ số đọc từ đường cong");
  return { a, P };
};

/* ---------- hình có đường tròn ----------
   Một đường tròn; điểm O (nếu có) là tâm; các điểm ghi trong tren nằm trên đường tròn; số đo góc ghi trong hình đã khớp góc vẽ (gocGhi).
   doGoc(D, "ACB"): số đo góc ACB đo trên hình (đỉnh ở chữ giữa); ghiLa(h, "ACB"): số đo ghi trong hình ở góc đó. */
const cs = (s) => s.split("").sort().join("");
const tron = (q, tren, ten) => {
  const D = diem(q.svg), C = duongTron(q.svg);
  assert.equal(C.length, 1, ten + ": hình cần đúng một đường tròn");
  (tren || []).forEach((k) => assert.ok(D[k] && Math.abs(dist(D[k], C[0].c) - C[0].r) < 0.6, ten + ": " + k + " phải nằm trên đường tròn"));
  if (D.O) assert.ok(dist(D.O, C[0].c) < 0.6, ten + ": O phải là tâm của đường tròn");
  return { D, C: C[0], ghi: gocGhi(q.svg, ten) };
};
const doGoc = (D, s) => goc(D[s[1]], D[s[0]], D[s[2]]);
// hai tia chung gốc V trùng nhau (đi qua P và Q): cùng phương, cùng hướng (O nằm trên cạnh BC thì góc ABO cũng là góc ABC)
const cungTia = (D, V, P, Q) => { const u = subv(D[P], D[V]), v = subv(D[Q], D[V]); return Math.abs(cross(u, v)) / (Math.hypot(...u) * Math.hypot(...v)) < 0.01 && dot(u, v) > 0; };
const ghiLa = (h, s) => {
  const g = h.ghi.find((x) => x.O === s[1] && ((cungTia(h.D, s[1], x.A, s[0]) && cungTia(h.D, s[1], x.B, s[2])) || (cungTia(h.D, s[1], x.A, s[2]) && cungTia(h.D, s[1], x.B, s[0]))));
  assert.ok(g, "hình không ghi số đo góc " + s); return g.v;
};
const cungPhia = (P, Q, X, Y) => cross(subv(Q, P), subv(X, P)) * cross(subv(Q, P), subv(Y, P)) > 0; // X, Y cùng phía đối với đường thẳng PQ
// tâm đường tròn ngoại tiếp (giao điểm ba đường trung trực) và tâm đường tròn nội tiếp (giao điểm ba đường phân giác) của tam giác
const tamNgoai = (A, B, C) => {
  const d = 2 * (A[0] * (B[1] - C[1]) + B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1])), a2 = A[0] ** 2 + A[1] ** 2, b2 = B[0] ** 2 + B[1] ** 2, c2 = C[0] ** 2 + C[1] ** 2;
  return [(a2 * (B[1] - C[1]) + b2 * (C[1] - A[1]) + c2 * (A[1] - B[1])) / d, (a2 * (C[0] - B[0]) + b2 * (A[0] - C[0]) + c2 * (B[0] - A[0])) / d];
};
const tamNoi = (A, B, C) => { const a = dist(B, C), b = dist(C, A), c = dist(A, B), s = a + b + c; return [(a * A[0] + b * B[0] + c * C[0]) / s, (a * A[1] + b * B[1] + c * C[1]) / s]; };

/* ---------- kiểm tra từng câu ----------
   right(q): đáp án tính bằng code (so với o[0], ans[0], a, ans, r của từng ô trái, o); more(q): kiểm tra thêm; essay(q): tự luận. */
// mô tả đồ thị hàm số y = ax² (câu chọn khẳng định đúng)
const moTa = (a, s) => {
  let m;
  if (s === "Đồ thị nằm phía dưới trục hoành") return toNum(a) < 0;
  if (s === "Đồ thị nằm phía trên trục hoành") return toNum(a) > 0;
  if ((m = /^Đồ thị đi qua điểm \((.+); (.+)\)$/.exec(s))) return eq(mul(a, pw(fr(m[1]), 2)), fr(m[2]));
  throw new Error("khẳng định lạ: " + s);
};
// hàm số dạng y = ax² (a ≠ 0): y/x² không đổi, khác 0, tại vài giá trị x
const dangAx2 = (s) => { try { const v = [1, 2, -3].map((x) => div(ev(s, { x: F(x) }), F(x * x))); return toNum(v[0]) !== 0 && v.every((w) => eq(w, v[0])); } catch (e) { return false; } };
// lựa chọn là phương trình mô tả bài toán: phương trình duy nhất mà nghiệm thật của bài toán (tính từ câu chuyện) thoả mãn
const moTaBaiToan = (q, x) => theo(q, /^(.+) = (.+)$/, (k) => eq(ev(k[1], { x }), ev(k[2], { x })));

const CHECKS = [
  /* ----- Bài 18. Hàm số y = ax² (a ≠ 0) ----- */
  { has: "Hàm số nào dưới đây có dạng y = ax² (a ≠ 0)?", right: (q) => theo(q, /^y = (.+)$/, (k) => dangAx2(k[1])) },
  { has: "Cho hàm số y = 1,5x². Tính giá trị của y khi x = −4.", right: () => ev("1,5x²", { x: F(-4) }) },
  { has: "Khẳng định nào dưới đây về đồ thị của hàm số y = −0,8x² là đúng?", right: (q) => theo(q, /^(.+)$/, (k) => moTa(fr("−0,8"), k[1])) },
  { has: "Điểm nào dưới đây thuộc đồ thị của hàm số y = −3x²?", right: (q) => theo(q, /^\((.+); (.+)\)$/, (k) => eq(ev("−3x²", { x: fr(k[1]) }), fr(k[2]))) },
  { has: "Đồ thị của hàm số y = 5x² có đỉnh là điểm nào dưới đây?", right: (q) => theo(q, /^\((.+); (.+)\)$/, (k) => eq(fr(k[1]), F(0)) && eq(fr(k[2]), F(0))),
    // lời giải: (1; 5) thuộc đồ thị, (0; 5) và (5; 0) không thuộc
    more: () => assert.ok(eq(ev("5x²", { x: F(1) }), F(5)) && !eq(ev("5x²", { x: F(0) }), F(5)) && !eq(ev("5x²", { x: F(5) }), F(0))) },
  { has: "Đồ thị của hàm số y = −1,5x² nhận đường thẳng nào dưới đây làm trục đối xứng?", right: () => "Trục tung Oy",
    more: () => [1, 2, 3].forEach((x) => assert.ok(eq(ev("−1,5x²", { x: F(x) }), ev("−1,5x²", { x: F(-x) })), "y(x) = y(−x)")) },
  { has: "hàm số y = (m − 3)x² có dạng y = ax² (a ≠ 0) khi nào?", right: () => { const m0 = F(3); assert.ok(eq(sub(m0, F(3)), F(0)), "a = m − 3 bằng 0 khi m = 3"); return "m ≠ " + fmtF(m0); } },
  { has: "Hàm số y = −0,3x² xác định với những giá trị nào của x?", right: () => "Mọi số thực x" },
  { has: "Đường cong trong hình là đồ thị của hàm số y = ax² (hình vẽ). Tìm hệ số a.", right: (q) => { const p = parabol(q.svg, "tìm hệ số a"); assert.deepEqual(Object.keys(p.P).sort(), ["A", "B"]); return p.a; } },
  { has: "đi qua điểm M(−2; −6). Hệ số a bằng", right: () => fmtF(div(F(-6), pw(F(-2), 2))) },
  { has: "Cho hàm số y = 0,4x². Điểm M trên đồ thị có tung độ bằng 10 và hoành độ dương. Tìm hoành độ của M.", right: () => sqrt(div(F(10), fr("0,4"))) },
  { has: "Đường cong (P) trong hình là đồ thị của hàm số y = ax² (hình vẽ). Mỗi ý sau đúng hay sai?",
    right: (q) => { const a = parabol(q.svg, "(P)").a; return q.o.map((s) => {
      let m;
      if ((m = /^Hệ số a = (.+)$/.exec(s))) return eq(a, fr(m[1]));
      if ((m = /^Điểm \((.+); (.+)\) thuộc \(P\)$/.exec(s)) || (m = /^Khi x = (.+) thì y = (.+)$/.exec(s))) return eq(mul(a, pw(fr(m[1]), 2)), fr(m[2]));
      throw new Error("ý lạ: " + s); }); } },
  { has: "Quãng đường viên bi lăn được sau t giây là s = 12t² (cm).", right: (q) => { assert.ok(q.q.includes("lăn được 75 cm?")); return sqrt(div(F(75), F(12))); } },
  // miệng mương rộng 4 m, sâu 1,6 m: điểm (2; 1,6) thuộc parabol; mặt nước ở độ cao 0,9 m
  { has: "Mặt cắt ngang của một con mương có dạng parabol y = ax²", right: () => { const a = div(fr("1,6"), pw(F(2), 2)); return mul(F(2), sqrt(div(fr("0,9"), a))); } },
  { has: "chiều dài gấp ba lần chiều rộng và có diện tích 243 m²", right: () => sqrt(div(F(243), F(3))) },
  { has: "Công suất P (W) của một điện trở 20 Ω", right: (q) => { const P = (I) => mul(F(20), pw(I, 2)); return q.o.map((s) => {
      let m;
      if ((m = /^Khi I = (\d+) A thì P = (\d+) W$/.exec(s))) return eq(P(F(+m[1])), F(+m[2]));
      if (s === "Khi cường độ dòng điện tăng gấp 2 lần thì công suất cũng tăng gấp 2 lần") return eq(div(P(F(6)), P(F(3))), F(2));
      if ((m = /^Khi P = (\d+) W thì I = (\d+) A$/.exec(s))) return eq(sqrt(div(F(+m[1]), F(20))), F(+m[2]));
      if (s === "P là hàm số của I có dạng y = ax² (a ≠ 0)") return [1, 2, 5].every((I) => eq(div(P(F(I)), F(I * I)), F(20)));
      throw new Error("ý lạ: " + s); }); } },

  /* ----- Bài 19. Phương trình bậc hai một ẩn ----- */
  { has: "Phương trình nào dưới đây là phương trình bậc hai một ẩn?", right: (q) => theo(q, /^(.+)$/, (k) => laBac2(k[1])) },
  { has: "Tính biệt thức Δ của phương trình 2x² + 5x − 4 = 0.", right: () => delta(bac2("2x² + 5x − 4 = 0")) },
  { has: "Phương trình (2x − 3)² = 16 có các nghiệm là", right: (q) => theo(q, /^(.+)$/, (k) => cungTap(docNghiem(k[1]), nghiem2(bac2("(2x − 3)² = 16")))) },
  { has: "Viết phương trình 4x² − 9 = x về dạng ax² + bx + c = 0", right: () => { const e = bac2("4x² − 9 = x"); return [e.a, e.b, e.c].map(fmtF).join("; "); } },
  { has: "Phương trình 2x² − 50 = 0 có các nghiệm là", right: (q) => theo(q, /^(.+)$/, (k) => cungTap(docNghiem(k[1]), nghiem2(bac2("2x² − 50 = 0")))) },
  // cộng (b/2)² vào hai vế: x² + bx + (b/2)² = (x + b/2)²
  { has: "Để giải phương trình x² − 12x = 5, ta cộng vào hai vế", right: () => { const e = bac2("x² − 12x = 5"), k = pw(div(e.b, F(2)), 2); assert.ok(eq(ev("(x − 6)²", { x: F(3) }), add(ev("x² − 12x", { x: F(3) }), k))); return k; },
    more: (q) => assert.ok(q.x.includes("(x − 6)² = 41") && eq(add(F(5), F(36)), F(41))) },
  { has: "Phương trình x² − 10x + 3 = 0 có hệ số b = 2b′. Tính Δ′ = b′² − ac.", right: () => deltaPhay(bac2("x² − 10x + 3 = 0")) },
  { has: "Nối mỗi phương trình ở cột trái với số nghiệm của nó ở cột phải.", right: (q) => q.l.map((s) => { const d = toNum(delta(bac2(s))); return d > 0 ? "Có hai nghiệm phân biệt" : d === 0 ? "Có nghiệm kép" : "Vô nghiệm"; }) },
  { has: "Cho phương trình 3x² − 7x − 6 = 0. Mỗi ý sau đúng hay sai?", right: (q) => {
      const e = bac2("3x² − 7x − 6 = 0"), r = nghiem2(e), la = (v) => r.some((x) => eq(x, v));
      return q.o.map((s) => {
        let m;
        if ((m = /^Biệt thức Δ = (.+)$/.exec(s))) return eq(delta(e), fr(m[1]));
        if (s === "Phương trình có nghiệm kép") return r.length === 1;
        if ((m = /^x = (.+) là một nghiệm của phương trình$/.exec(s)) || (m = /^Nghiệm còn lại của phương trình là x = (.+)$/.exec(s))) return la(ev(m[1]));
        throw new Error("ý lạ: " + s); }); } },
  { has: "Dùng máy tính cầm tay, tìm nghiệm dương của phương trình 2,4x² + 1,3x − 5 = 0", right: () => { const r = nghiem2(bac2("2,4x² + 1,3x − 5 = 0")).filter((x) => toNum(x) > 0); assert.equal(r.length, 1); return lamTron(r[0], 2); } },
  { has: "Nghiệm của phương trình x² + 2x − 15 = 0 là", right: (q) => theo(q, /^(.+)$/, (k) => cungTap(docNghiem(k[1]), nghiem2(bac2("x² + 2x − 15 = 0")))) },
  { has: "Khẳng định nào dưới đây về phương trình 16x² − 40x + 25 = 0 là đúng?", right: (q) => {
      const e = bac2("16x² − 40x + 25 = 0"), r = nghiem2(e), d = toNum(delta(e));
      return theo(q, /^Phương trình (.+)$/, (k) => {
        const m = /^có nghiệm kép x₁ = x₂ = (.+)$/.exec(k[1]);
        if (m) return d === 0 && eq(r[0], ev(m[1]));
        if (k[1] === "có hai nghiệm phân biệt") return d > 0;
        if (k[1] === "vô nghiệm") return d < 0;
        throw new Error("lựa chọn lạ: " + k[1]); }); } },
  { has: "Tìm nghiệm khác 0 của phương trình (2x − 1)² − 3(2x − 1) = 4.", right: () => { const r = nghiem2(bac2("(2x − 1)² − 3(2x − 1) = 4")).filter((x) => toNum(x) !== 0); assert.equal(r.length, 1); return r[0]; } },
  { has: "L = −x² + 60x − 500", right: (q) => { assert.ok(q.q.includes("lợi nhuận đúng bằng 300 nghìn đồng")); const r = nghiem2(bac2("−x² + 60x − 500 = 300")); assert.ok(r.length === 2 && r.every(isInt)); return r[0]; } },
  { has: "Một đa giác lồi n cạnh có n(n − 3)/2 đường chéo. Tìm n, biết đa giác đó có 44 đường chéo.", right: () => { const r = nghiem2(bac2("n(n − 3)/2 = 44", "n")).filter((x) => isInt(x) && x.n > 2); assert.equal(r.length, 1); return r[0]; } },
  { has: "Cho phương trình (ẩn x) x² − 10x + m = 0", right: (q) => {
      const e = (m) => bac2("x² − 10x + " + m + " = 0");
      return q.o.map((s) => {
        let k;
        if ((k = /^Với m = (\d+), phương trình có hai nghiệm x = (.+) và x = (.+)$/.exec(s))) return cungTap(nghiem2(e(k[1])), [ev(k[2]), ev(k[3])]);
        if ((k = /^Với m = (\d+), phương trình có nghiệm kép x = (.+)$/.exec(s))) { const r = nghiem2(e(k[1])); return r.length === 1 && eq(r[0], ev(k[2])); }
        if ((k = /^Với m = (\d+), phương trình có hai nghiệm phân biệt$/.exec(s))) return nghiem2(e(k[1])).length === 2;
        // Δ′ = 25 − m giảm khi m tăng: có nghiệm đúng khi m không vượt quá M
        if ((k = /^Phương trình có nghiệm khi và chỉ khi m ≤ (\d+)$/.exec(s))) { const M = +k[1]; return [M - 3, M - 1, M].every((m) => nghiem2(e(m)).length > 0) && [M + 1, M + 4].every((m) => !nghiem2(e(m)).length); }
        throw new Error("ý lạ: " + s); }); } },

  /* ----- Bài 20. Định lí Viète và ứng dụng ----- */
  { has: "Phương trình 4x² − 7x − 2 = 0 có hai nghiệm x₁, x₂. Tổng x₁ + x₂ bằng", right: () => { const e = bac2("4x² − 7x − 2 = 0"); assert.ok(toNum(delta(e)) > 0); return fmtF(tong(e)); } },
  { has: "tính tích hai nghiệm của phương trình 3x² + 10x − 21 = 0", right: () => { const e = bac2("3x² + 10x − 21 = 0"); assert.ok(toNum(delta(e)) > 0); return tich(e); } },
  { has: "Phương trình 5x² − 8x + 3 = 0 có hai nghiệm là", right: (q) => theo(q, /^(.+)$/, (k) => cungTap(docNghiem(k[1]), nghiem2(bac2("5x² − 8x + 3 = 0")))) },
  { has: "Hai số có tổng bằng 14 và tích bằng 33 là hai nghiệm của phương trình nào dưới đây?", right: (q) => theo(q, /^(.+)$/, (k) => { const e = bac2(k[1]); return toNum(delta(e)) >= 0 && eq(tong(e), F(14)) && eq(tich(e), F(33)); }) },
  { has: "Phương trình 7x² + 9x + 2 = 0 có một nghiệm là x₁ = −1. Nghiệm còn lại", right: () => { const r = nghiem2(bac2("7x² + 9x + 2 = 0")); assert.ok(r.some((x) => eq(x, F(-1)))); return "x₂ = " + fmtF(r.find((x) => !eq(x, F(-1)))); } },
  { has: "Phương trình 2x² − 13x + 15 = 0 có một nghiệm x₁ = 5.", right: () => { const e = bac2("2x² − 13x + 15 = 0"); assert.ok(nghiem2(e).some((x) => eq(x, F(5)))); return div(tich(e), F(5)); } },
  { has: "Phương trình bậc hai nào dưới đây có hai nghiệm là 4 và −9?", right: (q) => theo(q, /^(.+)$/, (k) => cungTap(nghiem2(bac2(k[1])), [F(4), F(-9)])) },
  { has: "Phương trình x² − 19x + 88 = 0 có hai nghiệm x₁, x₂. Khẳng định nào dưới đây đúng?", right: () => { const e = bac2("x² − 19x + 88 = 0"); assert.ok(toNum(delta(e)) > 0); return "x₁ + x₂ = " + fmtF(tong(e)) + " và x₁x₂ = " + fmtF(tich(e)); } },
  { has: "Phương trình x² + 5x − 2 = 0 có hai nghiệm x₁, x₂. Không giải phương trình, tính x₁² + x₂².", right: () => { const e = bac2("x² + 5x − 2 = 0"); assert.ok(toNum(delta(e)) > 0); return sub(pw(tong(e), 2), mul(F(2), tich(e))); } },
  { has: "Xét tổng và tích hai nghiệm (nếu có) của mỗi phương trình dưới đây.", right: (q) => q.o.map((s) => {
      const m = /^Phương trình (.+ = 0) có (tổng|tích) hai nghiệm bằng (.+)$/.exec(s); assert.ok(m, "ý lạ: " + s);
      const e = bac2(m[1]); if (toNum(delta(e)) < 0) return false;
      return eq(m[2] === "tổng" ? tong(e) : tich(e), ev(m[3])); }) },
  { has: "Nối mỗi điều kiện ở cột trái với hai số thoả mãn điều kiện đó ở cột phải.", right: (q) => q.l.map((s) => {
      const m = /^Tổng bằng (.+), tích bằng (.+)$/.exec(s), r = nghiem2({ a: F(1), b: neg(ev(m[1])), c: ev(m[2]) }); assert.equal(r.length, 2);
      const k = q.r.filter((t) => { const n = /^(.+) và (.+)$/.exec(t); return cungTap([ev(n[1]), ev(n[2])], r); }); assert.equal(k.length, 1, s); return k[0]; }) },
  { has: "Phương trình x² − 7x + 9 = 0 có hai nghiệm x₁, x₂. Không giải phương trình, tính 1/x₁ + 1/x₂.", right: () => { const e = bac2("x² − 7x + 9 = 0"); assert.ok(toNum(delta(e)) > 0 && toNum(tich(e)) !== 0); return div(tong(e), tich(e)); } },
  // nửa chu vi 23 cm, diện tích 120 cm²: chiều dài, chiều rộng là hai nghiệm của x² − 23x + 120 = 0
  { has: "Một tấm thiệp hình chữ nhật có chu vi 46 cm và diện tích 120 cm²", right: () => { const r = nghiem2({ a: F(1), b: F(-46 / 2), c: F(120) }); assert.equal(r.length, 2); return r[1]; } },
  { has: "Phương trình x² − 7x − 3 = 0 có hai nghiệm x₁, x₂. Không giải phương trình, tính x₁²x₂ + x₁x₂².", right: () => { const e = bac2("x² − 7x − 3 = 0"); assert.ok(toNum(delta(e)) > 0); return mul(tich(e), tong(e)); } },
  // x₁ + x₂ = 21 và x₁ = 2x₂
  { has: "Biết phương trình x² − 21x + m = 0", right: (q) => { assert.ok(q.q.includes("x₁ = 2x₂")); const x2 = div(F(21), F(3)), x1 = mul(F(2), x2), m = mul(x1, x2);
      assert.ok(cungTap(nghiem2(bac2("x² − 21x + " + fmtF(m) + " = 0")), [x1, x2])); return m; } },
  { has: "Cho phương trình x² − 7x + m = 0 (m là một số cho trước).", essay: (q) => {
      // Δ = 49 − 4m ≥ 0 khi m ≤ 49/4; x₁² + x₂² = 49 − 2m = 37 khi m = 6; thử lại với m = 6
      const m = div(sub(F(49), F(37)), F(2)); assert.ok(eq(m, F(6)) && toNum(m) <= 49 / 4);
      const r = nghiem2(bac2("x² − 7x + 6 = 0")); assert.ok(eq(add(pw(r[0], 2), pw(r[1], 2)), F(37)));
      essayCheck(q, ["Δ = 49 − 4m", "m ≤ 49/4", "x₁ + x₂ = 7, x₁x₂ = m", "49 − 2m", "m = 6"], ["m ≤ 49/4", "= 49 − 2m", "Đáp số: a) m ≤ 49/4; b) m = 6."]); } },

  /* ----- Bài 21. Giải bài toán bằng cách lập phương trình ----- */
  // dự định x chiếc mỗi ngày: 480/x ngày; thực tế x + 8 chiếc mỗi ngày: 480/(x + 8) ngày, ít hơn 2 ngày; nghiệm thật x = 40
  { has: "Một xưởng phải làm 480 chiếc đèn lồng trong một số ngày.", right: (q) => { const x = nghiem("480/x − 480/(x + 8) = 2").filter((v) => toNum(v) > 0); assert.deepEqual(x.map(fmtF), ["40"]); return moTaBaiToan(q, x[0]); } },
  // Bình x km/h đi 24 km; An x + 4 km/h, đến sớm hơn 18 phút = 3/10 giờ; nghiệm thật x = 16
  { has: "Hai bạn An và Bình cùng lúc đạp xe từ trường", right: (q) => { const x = nghiem("24/x − 24/(x + 4) = 3/10").filter((v) => toNum(v) > 0); assert.deepEqual(x.map(fmtF), ["16"]); return moTaBaiToan(q, x[0]); } },
  { has: "Bài toán: «Một sân chơi hình chữ nhật", right: (q) => q.o,
    more: (q) => { const r = nghiem("x(x + 9) = 190"); assert.deepEqual(r.map(fmtF), ["−19", "10"]); assert.ok(cungTap(nghiem2(bac2("x² + 9x − 190 = 0")), r));
      assert.ok(q.o[1].includes("x(x + 9) = 190") && q.o[2].includes("x₁ = 10, x₂ = −19") && q.o[3].includes("10 m")); } },
  // chiều cao x, cạnh đáy x + 4, diện tích 48: nghiệm thật x = 8
  { has: "Một tam giác có cạnh đáy dài hơn chiều cao tương ứng 4 cm", right: (q) => { const x = nghiem("x(x + 4)/2 = 48").filter((v) => toNum(v) > 0); assert.deepEqual(x.map(fmtF), ["8"]); return moTaBaiToan(q, x[0]); } },
  { has: "Một khung ảnh hình chữ nhật có chiều dài hơn chiều rộng 14 cm", essay: (q) => {
      const r = nghiem("x² + (x + 14)² = 70²"); assert.deepEqual(r.map(fmtF), ["−56", "42"]); assert.ok(cungTap(nghiem2(bac2("x² + 14x − 2 352 = 0")), r));
      essayCheck(q, ["x > 0", "x² + (x + 14)² = 70²", "x² + 14x − 2 352 = 0", "x₁ = 42, x₂ = −56", "chiều rộng 42 cm, chiều dài 56 cm"], ["= 4 900", "= 2 401 = 49²", "Đáp số: chiều rộng 42 cm, chiều dài 56 cm."]); } },
  { has: "Một nhóm bạn góp tiền đều nhau để mua một món quà giá 720 nghìn đồng.", right: () => { const r = nghiem("720/x − 720/(x + 2) = 30").filter((v) => isInt(v) && v.n > 0); assert.equal(r.length, 1); return r[0]; } },
  { has: "Tích của hai số tự nhiên liên tiếp bằng 756.", right: () => { const r = nghiem("n(n + 1) = 756", "n").filter((v) => isInt(v) && v.n >= 0); assert.equal(r.length, 1); return r[0]; } },
  // mỗi ván là một cặp kì thủ: số ván bằng số cặp n(n − 1)/2
  { has: "Có tất cả 78 ván đấu. Hỏi giải có bao nhiêu kì thủ?", right: () => { const r = nghiem("n(n − 1)/2 = 78", "n").filter((v) => isInt(v) && v.n >= 2); assert.equal(r.length, 1);
      let dem = 0; for (let i = 0; i < r[0].n; i++) for (let j = i + 1; j < r[0].n; j++) dem++; assert.equal(dem, 78); return r[0]; } },

  /* ----- Bài 27. Góc nội tiếp ----- */
  // góc nội tiếp: đỉnh nằm trên đường tròn, hai cạnh chứa hai dây cung (hai đầu kia cũng nằm trên đường tròn, đoạn được vẽ)
  { has: "hai dây EG và FH cắt nhau tại K. Góc nào dưới đây là góc nội tiếp của đường tròn (O)?", right: (q) => {
      const h = tron(q, ["E", "F", "G", "H"], "nhận biết góc nội tiếp"), { D, C } = h, tren = (k) => Math.abs(dist(D[k], C.c) - C.r) < 0.6;
      assert.ok(dThang(D.K, D.E, D.G) < 0.6 && dThang(D.K, D.F, D.H) < 0.6 && dist(D.K, C.c) < C.r - 5, "K là giao điểm của EG, FH, nằm trong đường tròn");
      return theo(q, /^Góc (\w)(\w)(\w)$/, (k) => [k[1], k[2], k[3]].every(tren) && coDoan(q.svg, D[k[2]], D[k[1]]) && coDoan(q.svg, D[k[2]], D[k[3]])); } },
  { has: "Góc nội tiếp MNP của đường tròn (O) chắn cung MP có số đo 104°.", right: () => div(F(104), F(2)) },
  { has: "Góc nội tiếp EGF của một đường tròn có số đo 41°.", right: () => String(2 * 41) },
  { has: "như hình vẽ, góc ADB = 38°. Tính số đo của góc ACB.", right: (q) => {
      const h = tron(q, ["A", "B", "C", "D"], "cùng chắn cung"), { D } = h; assert.equal(ghiLa(h, "ADB"), 38);
      assert.ok(cungPhia(D.A, D.B, D.C, D.D), "C, D cùng phía với AB"); const g = doGoc(D, "ACB"); assert.ok(Math.abs(g - 38) < 0.5, "góc ACB vẽ " + g); return F(38); } },
  { has: "sao cho góc AOB = 124°. Lấy điểm C trên cung lớn AB (hình vẽ). Số đo của góc ACB là", right: (q) => {
      const h = tron(q, ["A", "B", "C"], "góc ở tâm"), { D } = h; assert.equal(ghiLa(h, "AOB"), 124); assert.ok(cungPhia(D.A, D.B, D.C, D.O), "C trên cung lớn AB");
      const g = doGoc(D, "ACB"); assert.ok(Math.abs(g - 124 / 2) < 0.5); return Math.round(g) + "°"; } },
  { has: "có cạnh BC là đường kính và góc ABC = 34° (hình vẽ). Số đo của góc ACB là", right: (q) => {
      const h = tron(q, ["A", "B", "C"], "đường kính BC"), { D } = h; assert.ok(dist(mid(D.B, D.C), D.O) < 0.6, "O là trung điểm của BC"); assert.equal(ghiLa(h, "ABC"), 34);
      const g = doGoc(D, "ACB"); assert.ok(Math.abs(g - (180 - 90 - 34)) < 0.5); return Math.round(g) + "°"; } },
  { has: "dây AB sao cho góc OAB = 25°. Lấy điểm C trên cung lớn AB (hình vẽ).", right: (q) => {
      const h = tron(q, ["A", "B", "C"], "góc OAB"), { D } = h; assert.equal(ghiLa(h, "OAB"), 25); assert.ok(cungPhia(D.A, D.B, D.C, D.O), "C trên cung lớn AB");
      const g = doGoc(D, "ACB"), aob = 180 - 2 * 25; assert.ok(Math.abs(g - aob / 2) < 0.5); return F(aob / 2); } },
  { has: "AD là đường kính, góc ABC = 50° (hình vẽ). Mỗi ý sau đúng hay sai?", right: (q) => {
      const h = tron(q, ["A", "B", "C", "D"], "đường kính AD"), { D } = h; assert.ok(dist(mid(D.A, D.D), D.O) < 0.6, "O là trung điểm của AD"); assert.equal(ghiLa(h, "ABC"), 50);
      return q.o.map((s) => { const m = /^Góc (\w{3}) = (\d+)°$/.exec(s); assert.ok(m, "ý lạ: " + s); return Math.abs(doGoc(D, m[1]) - +m[2]) < 0.5; }); } },
  // nửa góc ở tâm AOB: sin = (AB/2) : R
  { has: "Cho đường tròn (O; 4 cm) và dây AB = 4√3 cm.", right: () => Math.round(Math.asin(toNum(ev("4√3")) / 2 / 4) / RAD) + "°" },
  { has: "có góc BAC = 70°, góc ABC = 60° (hình vẽ). Mỗi ý sau đúng hay sai?", right: (q) => {
      const h = tron(q, ["A", "B", "C"], "tam giác nội tiếp"), { D } = h; assert.equal(ghiLa(h, "BAC"), 70); assert.equal(ghiLa(h, "ABC"), 60);
      return q.o.map((s) => {
        let m;
        if ((m = /^Góc (\w{3}) = (\d+)°$/.exec(s))) return Math.abs(doGoc(D, m[1]) - +m[2]) < 0.5;
        if ((m = /^Cung nhỏ (\w)(\w) có số đo (\d+)°$/.exec(s))) return Math.abs(goc(D.O, D[m[1]], D[m[2]]) - +m[3]) < 0.5;
        throw new Error("ý lạ: " + s); }); } },
  // góc C = 46° nhọn nên C nằm trên cung lớn AB; cung nhỏ AB gấp đôi góc C
  { has: "có góc A = 64°, góc B = 70°. Tính số đo của cung nhỏ AB.", right: () => { const c = 180 - 64 - 70; assert.ok(c < 90); return F(2 * c); } },
  { has: "đường kính AB = 37 cm và điểm C nằm trên đường tròn sao cho AC = 12 cm", right: () => sqrt(F(37 * 37 - 12 * 12)) },

  /* ----- Bài 28. Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác ----- */
  { has: "Tâm của đường tròn ngoại tiếp tam giác DEF là", right: () => { const T3 = [[0, 0], [7, 1], [2, 5]], O = tamNgoai(...T3), I = tamNoi(...T3);
      assert.ok(T3.every((P) => Math.abs(dist(O, P) - dist(O, T3[0])) < 1e-9) && Math.abs(dist(I, T3[0]) - dist(I, T3[1])) > 0.1); return "giao điểm ba đường trung trực của tam giác"; } },
  { has: "Đường tròn ngoại tiếp tam giác ABC là đường tròn", right: () => "đi qua cả ba điểm A, B, C" },
  { has: "Tam giác ABC ngoại tiếp đường tròn (I). Khẳng định nào dưới đây đúng?", right: () => "Đường tròn (I) tiếp xúc với ba cạnh AB, BC, CA" },
  { has: "Đường tròn (I) nội tiếp tam giác ABC tiếp xúc với cạnh BC tại D.", right: () => "ID vuông góc với BC" },
  { has: "Tam giác ABC vuông tại A, hai cạnh góc vuông AB = 39 cm, AC = 80 cm.", right: () => fmtDec(div(sqrt(F(39 * 39 + 80 * 80)), F(2))) + " cm" },
  // tam giác đều cạnh a: tâm là trọng tâm, R = 2/3 đường trung tuyến = a√3/3; lựa chọn đọc bằng bộ đọc biểu thức ("9√3/2")
  { has: "Bán kính đường tròn ngoại tiếp tam giác đều cạnh 9 cm là", right: (q) => { const R = 2 / 3 * 9 * Math.sqrt(3) / 2; assert.ok(Math.abs(dist(tamNgoai([0, 0], [9, 0], [4.5, 4.5 * Math.sqrt(3)]), [0, 0]) - R) < 1e-9);
      return theo(q, /^(.+) cm$/, (k) => Math.abs(toNum(ev(k[1])) - R) < 1e-9); } },
  { has: "Tính bán kính đường tròn nội tiếp tam giác đều cạnh 10 cm", right: () => { const r = 10 * Math.sqrt(3) / 2 / 3, I = tamNoi([0, 0], [10, 0], [5, 5 * Math.sqrt(3)]); assert.ok(Math.abs(I[1] - r) < 1e-9); return lamTron(r, 2); } },
  // góc BIC không phụ thuộc góc B, góc C: thử với hai tam giác có góc A = 70°
  { has: "Cho tam giác ABC có góc BAC = 70° và I là tâm đường tròn nội tiếp tam giác.", right: () => {
      [[3, 5], [6, 2.5]].forEach(([b, c]) => { const A = [0, 0], B = [c, 0], C = [b * Math.cos(70 * RAD), b * Math.sin(70 * RAD)], I = tamNoi(A, B, C); assert.ok(Math.abs(goc(I, B, C) - (90 + 70 / 2)) < 1e-6); });
      return F(180 - (180 - 70) / 2); } },
  { has: "Ba ngôi nhà A, B, C nằm ở ba đỉnh của một tam giác vuông tại A với AB = 28 m, AC = 45 m.", right: () => div(sqrt(F(28 * 28 + 45 * 45)), F(2)) },
  // r = 2S : (chu vi)
  { has: "AB = 9 cm, AC = 40 cm, cạnh huyền BC = 41 cm. Tính bán kính đường tròn nội tiếp", right: () => { assert.equal(9 * 9 + 40 * 40, 41 * 41, "vuông tại A"); return div(F(9 * 40), F(9 + 40 + 41)); } },
  { has: "nội tiếp đường tròn bán kính 36,5 cm, cạnh AB = 48 cm", right: () => { const bc = mul(F(2), fr("36,5")); return sqrt(sub(mul(bc, bc), F(48 * 48))); } },
  { has: "Cho tam giác đều ABC cạnh 6√3 cm. Mỗi ý sau đúng hay sai?", right: (q) => {
      const a = toNum(ev("6√3")), h = a * Math.sqrt(3) / 2, A = [0, 0], B = [a, 0], C = [a / 2, h], O = tamNgoai(A, B, C), I = tamNoi(A, B, C);
      return q.o.map((s) => {
        let m;
        if ((m = /^Bán kính đường tròn (nội|ngoại) tiếp bằng (.+) cm$/.exec(s))) return Math.abs((m[1] === "nội" ? I[1] : dist(O, A)) - toNum(ev(m[2]))) < 1e-9;
        if ((m = /^Diện tích tam giác ABC bằng (.+) cm²$/.exec(s))) return Math.abs(a * h / 2 - toNum(ev(m[1]))) < 1e-9;
        if (s === "Tâm đường tròn ngoại tiếp tam giác là giao điểm ba đường trung tuyến") return dist(O, [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3]) < 1e-9;
        throw new Error("ý lạ: " + s); }); } },

  /* ----- Bài 29. Tứ giác nội tiếp ----- */
  { has: "Tứ giác ABCD nội tiếp đường tròn có góc A = 68°. Số đo của góc C là", right: () => 180 - 68 + "°" },
  { has: "Tứ giác MNPQ nội tiếp đường tròn có góc N = 105°.", right: () => { const t = "MNPQ"; assert.equal(180 - 105, 75); return "Góc " + t[(t.indexOf("N") + 2) % 4]; } },
  // thử với một tứ giác nội tiếp không đặc biệt: chỉ OA = OB = OC = OD luôn đúng
  { has: "Cho tứ giác ABCD nội tiếp (O). Khẳng định nào dưới đây chắc chắn đúng?", right: () => "OA = OB = OC = OD",
    more: () => { const P = [0, 40, 100, 250].map((d) => [Math.cos(d * RAD), Math.sin(d * RAD)]), [A, B, C, D] = P;
      assert.ok(Math.abs(dist(A, B) - dist(B, C)) > 0.1 && Math.abs(dist(A, C) - dist(B, D)) > 0.1 && Math.abs(dot(subv(C, A), subv(D, B))) > 0.1); } },
  { has: "điểm M nằm bên trong và điểm N nằm bên ngoài đường tròn. Tứ giác nào dưới đây nội tiếp đường tròn (O)?", right: (q) => {
      const h = tron(q, ["P", "Q", "R", "S"], "nhận biết tứ giác nội tiếp"), { D, C } = h, tren = (k) => Math.abs(dist(D[k], C.c) - C.r) < 0.6;
      assert.ok(dist(D.M, C.c) < C.r - 5 && dist(D.N, C.c) > C.r + 5, "M trong, N ngoài đường tròn");
      return theo(q, /^Tứ giác (\w{4})$/, (k) => k[1].split("").every(tren)); } },
  { has: "Cho tứ giác ABCD nội tiếp (O) có góc A = 80°, góc B = 110° (hình vẽ).", right: (q) => {
      const h = tron(q, ["A", "B", "C", "D"], "tứ giác nội tiếp"), { D } = h; assert.equal(ghiLa(h, "DAB"), 80); assert.equal(ghiLa(h, "ABC"), 110);
      const G = { A: doGoc(D, "DAB"), B: doGoc(D, "ABC"), C: doGoc(D, "BCD"), D: doGoc(D, "CDA") };
      return q.o.map((s) => {
        let m;
        if ((m = /^Góc (\w) = (\d+)°$/.exec(s))) return Math.abs(G[m[1]] - +m[2]) < 0.5;
        if ((m = /^Góc (\w) \+ góc (\w) = (\d+)°$/.exec(s))) return Math.abs(G[m[1]] + G[m[2]] - +m[3]) < 0.5;
        if (s === "Góc kề bù với góc BCD bằng góc BAD") return Math.abs(180 - G.C - G.A) < 0.5;
        throw new Error("ý lạ: " + s); }); } },
  { has: "có góc ABD = 40°, góc ADB = 55° (hình vẽ). Tính số đo của góc BCD.", right: (q) => {
      const h = tron(q, ["A", "B", "C", "D"], "tứ giác có đường chéo BD"), { D } = h; assert.equal(ghiLa(h, "ABD"), 40); assert.equal(ghiLa(h, "ADB"), 55);
      const bcd = 180 - (180 - 40 - 55); assert.ok(Math.abs(doGoc(D, "BCD") - bcd) < 0.5); return F(bcd); } },
  { has: "Hình chữ nhật có hai cạnh 8 cm và 15 cm nội tiếp một đường tròn.", right: () => fmtDec(div(sqrt(F(8 * 8 + 15 * 15)), F(2))) + " cm" },
  { has: "Tính bán kính đường tròn ngoại tiếp hình vuông cạnh 6 cm", right: () => lamTron(Math.hypot(6, 6) / 2, 2) },
  // MA, MB là tiếp tuyến: góc OAM = góc OBM = 90°, góc AOB = 180° − góc AMB
  { has: "vẽ hai tiếp tuyến MA, MB (A, B là tiếp điểm), góc AMB = 44°", right: (q) => {
      const h = tron(q, ["A", "B", "C"], "hai tiếp tuyến"), { D } = h; assert.equal(ghiLa(h, "AMB"), 44); assert.deepEqual(gocVuong(q.svg, "hai tiếp tuyến").sort(), ["A", "B"]);
      assert.ok(cungPhia(D.A, D.B, D.C, D.O), "C trên cung lớn AB"); const acb = (360 - 90 - 90 - 44) / 2; assert.ok(Math.abs(doGoc(D, "ACB") - acb) < 0.5); return F(acb); } },
  { has: "Lấy điểm E trên dây AC (E khác A, C), gọi D là chân đường vuông góc kẻ từ E đến AB", essay: (q) => {
      const h = tron(q, ["A", "B", "C"], "BCED"), { D } = h;
      assert.ok(dist(mid(D.A, D.B), D.O) < 0.6, "AB là đường kính"); assert.ok(dDoan(D.E, D.A, D.C) < 0.6, "E nằm trên dây AC");
      assert.ok(dDoan(D.D, D.A, D.B) < 0.6 && Math.abs(goc(D.D, D.E, D.B) - 90) < 0.5, "D là chân đường vuông góc kẻ từ E"); assert.deepEqual(gocVuong(q.svg, "BCED"), ["D"]);
      assert.equal(ghiLa(h, "ABC"), 58); assert.ok(Math.abs(goc(D.E, D.C, D.D) - (180 - 58)) < 0.5, "góc CED");
      essayCheck(q, ["góc ECB = 90°", "Góc EDB = 90°", "đường tròn đường kính EB", "góc CED + góc CBD = 180°", "góc CED = 122°"], ["góc CED = 180° − 58° = 122°", "Đáp số: b) góc CED = 122°."]); } },
  // hình vuông nội tiếp: đường chéo là đường kính
  { has: "Từ một tấm kính hình tròn đường kính 50 cm", right: () => lamTron(50 / Math.SQRT2, 2) },
  // góc A + góc C = 180°, góc A = 2 · góc C; góc B + góc D = 180°, góc B − góc D = 40°
  { has: "Tứ giác ABCD nội tiếp đường tròn có góc A gấp đôi góc C và góc B lớn hơn góc D 40°.", right: () => { const c = 180 / 3; assert.equal(2 * c + c, 180); return F((180 + 40) / 2); } },

  /* ----- Bài 30. Đa giác đều ----- */
  { has: "Đa giác nào dưới đây là đa giác đều?", right: () => "Hình vuông" },
  // quay điểm M thuận chiều 70° quanh O: ON = OM, góc MON = 70°
  { has: "Phép quay thuận chiều 70° tâm O biến điểm M thành điểm N", right: () => { const M = [3, 1], t = -70 * RAD, N = [M[0] * Math.cos(t) - M[1] * Math.sin(t), M[0] * Math.sin(t) + M[1] * Math.cos(t)];
      assert.ok(Math.abs(Math.hypot(...N) - Math.hypot(...M)) < 1e-9 && Math.abs(goc([0, 0], M, N) - 70) < 1e-9); return "ON = OM và góc MON = 70°"; } },
  { has: "Một ngũ giác lồi có năm cạnh bằng nhau. Cần thêm điều kiện nào dưới đây", right: () => "Năm góc của nó bằng nhau" },
  { has: "Cho ngũ giác đều ABCDE nội tiếp đường tròn (O). Phép quay ngược chiều nào", right: (q) => theo(q, /^Phép quay (\d+)°$/, (k) => +k[1] % (360 / 5) === 0) },
  // dựng đa giác đều 12 cạnh nội tiếp đường tròn rồi đo góc
  { has: "Tính số đo mỗi góc của một đa giác đều 12 cạnh.", right: () => { const n = 12, P = [...Array(n)].map((_, i) => [Math.cos(2 * Math.PI * i / n), Math.sin(2 * Math.PI * i / n)]);
      const g = goc(P[1], P[0], P[2]); assert.ok(Math.abs(g - (180 - 360 / n)) < 1e-9); return F(180 - 360 / n); } },
  { has: "người ta đánh dấu sáu điểm chia đường tròn mép đĩa thành sáu cung bằng nhau", right: () => { const R = 9, canh = 2 * R * Math.sin(Math.PI / 6); assert.ok(Math.abs(canh - R) < 1e-9); return F(6 * R); } },
  { has: "Kim phút của một chiếc đồng hồ quay từ vị trí chỉ số 12 đến vị trí chỉ số 4", right: () => F(4 * 360 / 12) },
  { has: "Cho lục giác đều ABCDEF nội tiếp đường tròn (O) (hình vẽ). Mỗi ý sau đúng hay sai?", right: (q) => {
      const ten = "ABCDEF", h = tron(q, ten.split(""), "lục giác đều"), { D, C } = h;
      ten.split("").forEach((p, i) => assert.ok(Math.abs(dist(D[p], D[ten[(i + 1) % 6]]) - C.r) < 0.6, "cạnh lục giác bằng bán kính"));
      // trục y của hình hướng xuống: cộng vào góc là quay thuận chiều kim đồng hồ
      const giu = (deg) => ten.split("").every((p) => { const t = Math.atan2(D[p][1] - C.c[1], D[p][0] - C.c[0]) + deg * RAD, P = [C.c[0] + C.r * Math.cos(t), C.c[1] + C.r * Math.sin(t)];
        return ten.split("").some((k) => dist(D[k], P) < 0.6); });
      return q.o.map((s) => {
        let m;
        if ((m = /^Phép quay thuận chiều (\d+)° tâm O giữ nguyên lục giác$/.exec(s))) return giu(+m[1]);
        if ((m = /^Mỗi góc của lục giác bằng (\d+)°$/.exec(s))) return Math.abs(doGoc(D, "FAB") - +m[1]) < 0.5;
        if (s === "Tam giác OAB là tam giác đều") return Math.abs(dist(D.O, D.A) - dist(D.A, D.B)) < 0.6 && Math.abs(dist(D.O, D.B) - dist(D.A, D.B)) < 0.6;
        throw new Error("ý lạ: " + s); }); } },
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
      if (/làm tròn/.test(q.q)) assert.ok(q.tol && q.tol <= 0.5 * 10 ** -(/chữ số thập phân thứ hai|hàng phần trăm/.test(q.q) ? 2 : 1) + 1e-12, "câu làm tròn cần tol, không lớn hơn nửa đơn vị làm tròn");
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
for (const id of ["toan9-gk2-de1", "toan9-gk2-de2"]) { const b = bank(id); assert.ok(b, "thiếu " + id); assert.equal(b.questions.length, 25); run(id, b.questions); }
const pool = bank(POOL), mine = pool.questions.filter((q) => q.src === POOL);
run(POOL, mine);
assert.equal(dung.size, CHECKS.length, "có mục kiểm tra không khớp câu nào: " + CHECKS.filter((c) => !dung.has(c.has)).map((c) => c.has).join(" | "));
// tự thử vài bộ đọc với giá trị biết trước
assert.ok(cungTap(nghiem2(bac2("x² − 5x + 6 = 0")), [F(2), F(3)]) && eq(delta(bac2("2x² − 3x + 1 = 0")), F(1)) && !nghiem2(bac2("x² + x + 1 = 0")).length);
assert.ok(eq(deltaPhay(bac2("x² − 6x + 5 = 0")), F(4)) && cungTap(nghiem2(bac2("x² − 4x + 4 = 0")), [F(2)]) && eq(tong(bac2("2x² − 7x + 3 = 0")), F(7, 2)) && eq(tich(bac2("2x² − 7x + 3 = 0")), F(3, 2)));
assert.ok(!laBac2("x³ − 1 = 0") && !laBac2("3x + 1 = 0") && !laBac2("1/x² = 4") && laBac2("(x − 1)² = 2x") && laBac2("0,5x² = 3"));
assert.deepEqual(docNghiem("x₁ = 3; x₂ = −5").map(fmtF), ["3", "−5"]); assert.ok(cungTap([F(1), F(2)], [F(2), F(1)]) && !cungTap([F(1)], [F(1), F(2)]));
assert.ok(dangAx2("−0,7x²") && !dangAx2("7/x") && !dangAx2("2x + 1") && !dangAx2("0x²"));
// bộ đọc hình bắt được hình vẽ sai: điểm đánh dấu không thuộc parabol, số đo góc ghi sai, điểm không nằm trên đường tròn
{ const de1 = bank("toan9-gk2-de1").questions, p = de1.find((q) => q.svg && /Tìm hệ số a/.test(q.q)).svg;
  assert.throws(() => parabol(p.replace('cy="96" r="3.5"', 'cy="74" r="3.5"'), "thử"), /không thuộc parabol/);
  assert.throws(() => parabol(p.replace(/stroke="acc" stroke-width="2.5"/, 'stroke="acc" stroke-width="2.5"').replace(/(<polyline points=")([\d.]+),([\d.]+)/, (m, a, x, y) => a + x + "," + (+y + 9)), "thử"), /không phải parabol/);
  const g = de1.find((q) => q.svg && /góc AOB = 124°/.test(q.q));
  assert.throws(() => tron(Object.assign({}, g, { svg: g.svg.replace(">124°<", ">130°<") }), ["A", "B", "C"], "thử"), /ghi 130° mà vẽ/);
  assert.throws(() => tron(Object.assign({}, g, { svg: g.svg.replace(/(<circle cx="[\d.]+" cy=")([\d.]+)(" r="3.5")/, (m, a, y, b) => a + (+y + 8) + b) }), ["A", "B", "C"], "thử"), /phải nằm trên đường tròn|phải là tâm/); }

/* ---------- mức độ và ma trận ---------- */
assert.ok(pool.questions.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M), CHU_DE = Object.keys(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => cells.reduce((s, v) => s + v[k], 0)), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(CHU_DE.length, 8, "8 chủ đề, mỗi bài một chủ đề");
const nhom = (ts) => ts.reduce((s, t) => s + M[t].reduce((a, b) => a + b, 0), 0);
assert.deepEqual([nhom(CHU_DE.slice(0, 4)), nhom(CHU_DE.slice(4))], [14, 11], "đại số (Bài 18–21) 14 câu, hình học (Bài 27–30) 11 câu");
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
// câu tự luận chỉ ở các ô Vận dụng rút 1 câu (Viète, lập phương trình, tứ giác nội tiếp), ô đó còn câu khác dạng: mỗi lần rút nhiều nhất 3 câu tự luận
const oTuLuan = [...new Set(pool.questions.filter((q) => q.type === "essay").map((q) => q.topic + "|" + q.lv))];
assert.ok(oTuLuan.length <= 3 && oTuLuan.every((k) => { const [t, lv] = k.split("|"); return +lv === 3 && M[t][2] === 1 && pool.questions.some((q) => q.topic === t && q.lv === 3 && q.type !== "essay"); }), "câu tự luận: " + oTuLuan);
const dem = (f) => pool.questions.filter(f).length;
assert.deepEqual([dem((q) => q.type === "essay"), dem((q) => q.svg), dem((q) => q.svg && /<polyline points="[^"]{200,}" fill="none" stroke="acc"/.test(q.svg))], [3, 15, 2], "kho: 3 tự luận, 15 câu có hình (2 hình parabol trên lưới)");
assert.ok(dem((q) => q.type === "num") >= 20 && dem((q) => q.type === "match") >= 2 && dem((q) => q.type === "order") >= 1 && dem((q) => q.type === "fill") >= 1, "kho có đủ trả lời bằng số, nối cột, sắp xếp, điền");
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

/* ---------- dò lộ đáp án (Rút ra N5, N24, N8; như tests/toan9-ck1.js) giữa hai câu rút được cùng lúc: hai câu khác ô (chủ đề, mức), hoặc
   cùng một ô rút từ 2 câu trở lên (ô Biết của Bài 18, 19, 20); hai câu cùng một đề cố định luôn khác ô hoặc cùng ô rút 2 câu.
   Đáp án là số nguyên (từ 10), số thập phân, phân số, số âm, biểu thức có căn chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”,
   “≈”, “là”, “bằng”, “được”); cặp nối: câu kia có cả hai vế. Đáp án bằng chữ (cặp số, phương trình, số đo góc…) có ở câu kia thì chỉ
   in ra khi chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM. ---------- */
const val = (s) => +String(s).replace(/\s/g, "");
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null ? [] : [].concat(q.ans), q.l || [], q.r || [], (q.rubric || []).map((c) => c.c)).map(String);
const KQ = "(?:=|≈|(?:^|[\\s(])(?:là|bằng|được))\\s+";
const SAU = "(?!\\d|,\\d|\\/|°|%|√|π|\\(|\\p{L}|[⁰¹²³⁴⁵⁶⁷⁸⁹]|\\s*[·+−:](?:\\s|\\d|\\())"; // số đứng trước chữ, π, ngoặc là hệ số, thừa số
const soKQ = (s) => [...String(s).matchAll(new RegExp(KQ + "(\\d{1,3}(?: \\d{3})*)" + SAU, "gu"))].map((m) => val(m[1]));
const kqLa = (s, a) => new RegExp(KQ + a.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + SAU, "u").test(s);
const cungLuc = (p, q) => p.topic !== q.topic || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2;
const ten = new Map();
BANKS.filter((b) => /^toan9-gk2-de\d$/.test(b.id)).forEach((b) => b.questions.forEach((q, i) => ten.set(q.q, b.id.replace("toan9-gk2-", "") + "#" + (i + 1))));
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
// đã xem (Phiên N9-gk2-toan): 60° ở các câu Bài 30 là góc của lục giác đều, hình thoi, phép quay, không gợi ý góc ACB của câu dây AB = 4√3 cm;
// hình vuông ở hai câu Bài 29 là hình vuông nội tiếp đường tròn, không nói hình vuông là đa giác đều
const DA_XEM = ["own#46 lộ đáp án de1#17: 60°", "own#48 lộ đáp án de1#17: 60°", "own#50 lộ đáp án de1#17: 60°", "de1#24 lộ đáp án de1#17: 60°",
  "de2#25 lộ đáp án de1#17: 60°", "own#44 lộ đáp án de1#24: Hình vuông", "own#45 lộ đáp án de1#24: Hình vuông"];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 57”, “là 5/2”, “≈ 2,89”, cả hai vế một cặp nối
{ const tim = (has) => pool.questions.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const khac = tim("Đa giác nào dưới đây là đa giác đều?"), thuLo = (qs) => { const r = doLo(qs, (q) => q.q.slice(0, 10)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  assert.deepEqual(thuLo([tim("Tính biệt thức Δ của phương trình 2x² + 5x − 4 = 0."), gia(khac, "Ví dụ Δ = 57.")]), [57]);
  assert.deepEqual(thuLo([tim("Tính biệt thức Δ của phương trình 2x² + 5x − 4 = 0."), gia(khac, "Ví dụ Δ = 57 + 3.")]), []);
  assert.deepEqual(thuLo([tim("Tìm nghiệm khác 0 của phương trình"), gia(khac, "Nghiệm là 5/2.")]), ["5/2"]);
  assert.deepEqual(thuLo([tim("Tính bán kính đường tròn nội tiếp tam giác đều cạnh 10 cm"), gia(khac, "Bán kính r ≈ 2,89 cm.")]), ["2,89"]);
  assert.deepEqual(thuLo([tim("Nối mỗi phương trình ở cột trái với số nghiệm"), gia(khac, "Phương trình x² + 10x + 25 = 0 có nghiệm kép.")]), ["x² + 10x + 25 = 0 → Có nghiệm kép"]); }

/* ---------- không chép sách: so với chữ OCR của Toán 9 tập hai, tập một (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ----------
   Chuỗi 8 từ liền nhau của đề bài, lựa chọn, lời giải, thang chấm không có trong sách; biểu thức có chữ x, căn, bình phương (bỏ khoảng
   trắng) trùng chữ OCR thì in ra với DO_SACH=1 để xem tay (danh sách đã xem ghi ở SACH_XEM). */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = ["lop-9/toan-9-tap-2", "lop-9/toan-9-tap-1"].map((c) => path.join(BOOK, c, "chu.txt")).filter((f) => fs.existsSync(f));
const khongDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
// cụm từ chung của môn (tên bài, tên định lí, tên phương pháp, thuật ngữ, lời dặn làm tròn) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ
const TU_CHUNG = ["giải bài toán bằng cách lập phương trình", "phương trình bậc hai một ẩn", "đường tròn ngoại tiếp và đường tròn nội tiếp", "đường tròn ngoại tiếp tam giác",
  "đường tròn nội tiếp tam giác", "góc nội tiếp chắn nửa đường tròn", "tổng số đo hai góc đối nhau", "tứ giác nội tiếp đường tròn", "theo định lí viète", "không giải phương trình",
  "làm tròn đến chữ số thập phân thứ nhất", "làm tròn đến chữ số thập phân thứ hai", "dùng máy tính cầm tay", "mỗi ý sau đúng hay sai", "trình bày lời giải",
  "phương trình có hai nghiệm phân biệt", "phương trình có nghiệm kép", "góc nội tiếp và góc ở tâm cùng chắn", "số đo của góc nội tiếp bằng nửa số đo của cung bị chắn",
  "đồ thị của hàm số", "nằm phía dưới trục hoành", "nằm phía trên trục hoành"].map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
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
  const bt = (s) => (String(s).match(/[0-9xn√(][0-9xn√()+−·:/²³,=<>≤≥ ]{5,}[0-9xn)²³]/g) || []).map(gon).filter((e) => e.length >= 7 && /\d/.test(e) && /[xn√]/.test(e) && /[=<>≤≥]/.test(e));
  const trung = [...new Set(kho.flatMap((q) => [q.q].concat(q.o || [], q.l || []).flatMap(bt).filter((e) => sachBt.includes(e)).map((e) => `${ten.get(q.q)}: ${e}`)))];
  if (process.env.DO_SACH) console.log("Biểu thức trùng chữ OCR của sách (xem tay):\n" + trung.join("\n"));
  const SACH_XEM = [];
  assert.deepEqual(trung, SACH_XEM, "biểu thức trùng chữ OCR của sách đã đổi: chạy DO_SACH=1, xem tay rồi sửa SACH_XEM");
  console.log("Đã so với chữ OCR của Toán 9 tập hai, tập một (OnUp-Book).");
} else console.log("Không có ../OnUp-Book/lop-9/toan-9-tap-2/chu.txt: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, kể cả kho Toán 9 cuối kì I ---------- */
{
  const khac = BANKS.filter((b) => !b.pool && !/^toan9-gk2-/.test(b.id)).flatMap((b) => b.questions.map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q.q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại hoặc đọc lại hình (50 câu của 2 đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + pool.questions.length + " câu, ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề; trung bình " + (essays / 400).toFixed(2) + " câu tự luận mỗi lần rút.");
console.log("MATH OK");
