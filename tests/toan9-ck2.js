// Tính lại đáp án ngân hàng Toán 9 cuối năm (data/banks/9-toan.js): hai đề cố định toan9-ck2-de1, toan9-ck2-de2 và các câu riêng
// của đề ngẫu nhiên toan9-ck2-ngau-nhien (Phiên N9-ck2-toan; Toán 9 tập hai, Bài 18–32, trọng tâm Bài 22–26 và Bài 31–32). Mỗi câu:
// kiểm tra đề có đúng số liệu (has) rồi so đáp án với kết quả tính bằng code: trắc nghiệm o[0], điền khuyết ans[0], đúng/sai 4 ý a,
// trả lời bằng số ans (và tol), nối cột r[i] của từng ô l[i], sắp xếp thứ tự o; tự luận: các bước trong thang chấm và đáp án gợi ý.
// Số hữu tỉ tính chính xác ({n, d}); căn bậc hai không khai được, π tính bằng số thực. Bộ đọc biểu thức, phương trình bậc hai, định lí
// Viète, phương trình có ẩn ở mẫu, hình có đường tròn chép từ tests/toan9-gk2.js. Thống kê: tần số, tần số tương đối, nhóm [a; b) tính
// lại từ dãy dữ liệu trong đề, từ bảng (đường kẻ, chữ giữa ô, vừa ô), biểu đồ cột và đoạn thẳng (trục số, số ở đỉnh cột, ở trên điểm),
// biểu đồ hình quạt tròn (góc ở tâm khớp số phần trăm, phần bị mờ), biểu đồ cột ghép nhóm (cột kề nhau, đầu mút ở mép cột) trong hình.
// Xác suất: liệt kê lại không gian mẫu (tích các tập, lấy lần lượt không trả lại, chọn không kể thứ tự) rồi đếm kết quả thuận lợi; tấm
// bìa quay đọc số trong từng hình quạt bằng nhau. Hình khối: diện tích xung quanh, thể tích hình trụ, hình nón, hình cầu, làm tròn theo
// quy tắc của sách (tol bằng nửa đơn vị làm tròn); hình trụ, hình nón đọc số đo ghi trong hình, đúng tỉ lệ với hình vẽ. Hình ôn tập:
// bốn parabol trên lưới ô vuông (số ghi trên trục không bị đường cong đè), lục giác đều (chiều các đỉnh, phép quay), lát gạch
// bằng đa giác đều, góc nội tiếp, tứ giác nội tiếp, hai đường cao (góc ghi trong hình bằng góc vẽ, góc hỏi đo lại trên hình). Chữ
// trong hình từ cỡ 13 và nằm trọn trong khung hình.
// Cuối cùng kiểm tra mức độ và ma trận (mỗi ô có ít nhất gấp đôi số câu ô đó rút, ngoài mỗi đề cố định vẫn đủ; chủ đề ôn đúng chữ của
// kho giữa kì II; rút thử nhiều lần ra đúng 10 Biết, 8 Hiểu, 7 Vận dụng; đã làm hết một đề cố định thì không gặp lại câu của đề đó),
// đáp án đúng của câu trắc nghiệm không dài hơn hẳn lựa chọn sai và không hay là lựa chọn dài nhất, ngắn nhất, câu đúng/sai 4 ý không
// lặp kiểu Đ/S, đáp án không lặp chữ của nhãn chủ đề, đề bài không trùng câu nào của data/banks/9-toan.js (cả kho giữa kì II), dò lộ
// đáp án giữa các câu rút được cùng lúc (Rút ra N5, N24, N8) và, nếu có ../OnUp-Book, so chữ của câu với chữ OCR của Toán 9 tập hai,
// tập một (không chuỗi 8 từ nào trùng); so với câu của mọi kho khác.
// Chạy: node tests/toan9-ck2.js → in MATH OK. DO_LO=1: in đáp án bằng chữ có ở câu rút được cùng lúc; DO_SACH=1: in chuỗi 6 từ
// và biểu thức trùng chữ OCR của sách để xem tay; DO_KHO=1: in chuỗi 6 từ trùng câu của kho khác.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan9-ck2-ngau-nhien";

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

/* ---------- chữ, khung hình ---------- */
const texts2 = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { at: [+a.x, +a.y], t: m[2], b: a["font-weight"] === "700", fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start", fill: a.fill || "" }; });
const rong = (t) => (t.b ? 0.62 : 0.55) * t.fs * [...t.t].length; // ước bề rộng dòng chữ (Noto Sans, chữ đậm rộng hơn)
const rects = (svg) => [...svg.matchAll(/<rect [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { x: +a.x, y: +a.y, w: +a.width, h: +a.height, fill: a.fill || "none" }; });
const polylines = (svg) => [...svg.matchAll(/<polyline [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { p: nums(a.points), stroke: a.stroke || "", w: +(a["stroke-width"] || 1) }; });
const soChu = (s) => toNum(fr(String(s).replace(/%$/, "")));
// mọi chữ trong hình cỡ từ 13 trở lên, nằm trọn trong khung hình (viewBox)
const chuTrongKhung = (svg, ten) => {
  const v = nums(/viewBox="([^"]+)"/.exec(svg)[1]);
  texts2(svg).forEach((t) => {
    assert.ok(t.fs >= 13, ten + ": chữ “" + t.t + "” nhỏ hơn cỡ 13");
    const w = rong(t), x0 = t.anchor === "middle" ? t.at[0] - w / 2 : t.anchor === "end" ? t.at[0] - w : t.at[0];
    assert.ok(x0 >= 0 && x0 + w <= v[2] && t.at[1] - 0.75 * t.fs >= 0 && t.at[1] + 0.25 * t.fs <= v[3], ten + ": chữ “" + t.t + "” tràn khỏi khung hình");
  });
};

/* ---------- bảng ----------
   Đường kẻ ngang, dọc (cả viền), mỗi ô nhiều nhất một chữ đặt giữa ô và vừa ô. Trả về [[chữ từng ô theo hàng, "" là ô trống]]. */
const docBang = (svg, ten) => {
  const L = lines(svg), ngang = L.filter((l) => l.a[1] === l.b[1]), doc = L.filter((l) => l.a[0] === l.b[0]);
  assert.equal(ngang.length + doc.length, L.length, ten + ": bảng chỉ có đường kẻ ngang, dọc");
  const ys = [...new Set(ngang.map((l) => l.a[1]))].sort((a, b) => a - b), xs = [...new Set(doc.map((l) => l.a[0]))].sort((a, b) => a - b);
  assert.ok(ys.length === ngang.length && xs.length === doc.length, ten + ": không kẻ trùng đường");
  ngang.forEach((l) => assert.ok(Math.min(l.a[0], l.b[0]) === xs[0] && Math.max(l.a[0], l.b[0]) === xs[xs.length - 1], ten + ": đường ngang kẻ hết bề rộng bảng"));
  doc.forEach((l) => assert.ok(Math.min(l.a[1], l.b[1]) === ys[0] && Math.max(l.a[1], l.b[1]) === ys[ys.length - 1], ten + ": đường dọc kẻ hết chiều cao bảng"));
  const o = Array.from({ length: ys.length - 1 }, () => Array(xs.length - 1).fill(""));
  texts2(svg).forEach((t) => {
    const c = xs.findIndex((v, i) => i && Math.abs(t.at[0] - (v + xs[i - 1]) / 2) < 0.6) - 1, r = ys.findIndex((v, i) => i && t.at[1] > ys[i - 1] + 0.7 * t.fs && t.at[1] < v) - 1;
    assert.ok(t.anchor === "middle" && c >= 0 && r >= 0 && o[r][c] === "", ten + ": chữ “" + t.t + "” phải nằm giữa một ô, mỗi ô một chữ");
    assert.ok(rong(t) <= xs[c + 1] - xs[c] - 4, ten + ": chữ “" + t.t + "” không vừa ô");
    o[r][c] = t.t;
  });
  return o;
};
// bảng kẻ dọc (hàng đầu là tên cột): [[nhóm, tần số]] của các hàng sau hàng đầu
const hangSau = (b) => b.slice(1).map((r) => [r[0], r[1]]);

/* ---------- biểu đồ ----------
   Trục đứng: số ghi bên trái (căn phải), cách đều từ 0, có đường lưới màu line ở mỗi vạch. Biểu đồ cột: cột tô acc-soft đứng trên trục
   ngang, số ở đỉnh cột (chữ đậm) bằng chiều cao cột, tên ở dưới. Biểu đồ đoạn thẳng: điểm tô acc nối liên tiếp bằng đường gấp khúc,
   số ghi ngay trên điểm bằng độ cao điểm, giá trị ở dưới trục. Biểu đồ cột ghép nhóm: cột kề nhau rộng bằng nhau, đầu mút của các
   nhóm ghi dưới trục ngang đúng ở mép cột, số phần trăm ở đỉnh cột. Biểu đồ hình quạt tròn: mỗi phần là một hình quạt
   (path "M tâm L đầu cung A r r 0 cờ 1 cuối cung Z") tô màu theo chú giải, số phần trăm (hoặc "?" khi bị mờ) ghi trong hình quạt,
   góc ở tâm khớp số phần trăm, các phần nối tiếp nhau đủ một vòng. */
const trucDung = (svg, ten) => {
  const so = texts2(svg).filter((t) => t.anchor === "end" && /^\d+(?:,\d+)?$/.test(t.t)).map((t) => ({ v: soChu(t.t), y: t.at[1] - 5 })).sort((a, b) => a.v - b.v);
  assert.ok(so.length >= 3 && so[0].v === 0, ten + ": trục đứng bắt đầu từ 0, ít nhất 3 vạch");
  const bot = so[0].y, per = (bot - so[so.length - 1].y) / so[so.length - 1].v;
  so.forEach((s) => assert.ok(Math.abs(bot - s.v * per - s.y) < 0.6, ten + ": vạch " + s.v + " không cách đều"));
  const luoi = lines(svg).filter((l) => l.stroke === "line" && l.a[1] === l.b[1]).map((l) => l.a[1]);
  so.slice(1).forEach((s) => assert.ok(luoi.some((y) => Math.abs(y - s.y) < 0.6), ten + ": thiếu đường lưới ở vạch " + s.v));
  return { bot, val: (y) => (bot - y) / per, khop: (y, v) => Math.abs(bot - v * per - y) < 0.15 }; // khop: điểm ở độ cao y đúng giá trị v (sai lệch dưới 0,15 px)
};
const soDinh = (T, cx, y, ten) => {
  const d = T.filter((t) => t.b && Math.abs(t.at[0] - cx) < 0.6 && t.at[1] < y && t.at[1] > y - 16);
  assert.equal(d.length, 1, ten + ": mỗi cột, mỗi điểm một số ghi ngay trên"); return d[0];
};
const tenDuoi = (T, cx, bot, ten) => {
  const d = T.filter((t) => !t.b && Math.abs(t.at[0] - cx) < 0.6 && t.at[1] > bot && t.at[1] < bot + 30);
  assert.equal(d.length, 1, ten + ": mỗi cột, mỗi điểm một tên ghi dưới trục"); return d[0].t;
};
const docCot = (svg, ten) => {
  const tr = trucDung(svg, ten), T = texts2(svg);
  return rects(svg).filter((r) => r.fill === "acc-soft").sort((a, b) => a.x - b.x).map((r) => {
    assert.ok(Math.abs(r.y + r.h - tr.bot) < 0.6, ten + ": cột đứng trên trục ngang");
    const cx = r.x + r.w / 2, d = soDinh(T, cx, r.y, ten);
    assert.ok(tr.khop(r.y, soChu(d.t)), ten + ": số ở đỉnh cột " + d.t + " khác chiều cao cột");
    return [tenDuoi(T, cx, tr.bot, ten), soChu(d.t)];
  });
};
const docDoanThang = (svg, ten) => {
  const tr = trucDung(svg, ten), T = texts2(svg);
  const P = circles(svg).filter((c) => c.fill === "acc").map((c) => c.c).sort((a, b) => a[0] - b[0]);
  const pl = polylines(svg).filter((p) => p.stroke === "acc"); assert.equal(pl.length, 1, ten + ": một đường gấp khúc");
  const q = []; for (let i = 0; i < pl[0].p.length; i += 2) q.push([pl[0].p[i], pl[0].p[i + 1]]);
  assert.ok(q.length === P.length && q.every((p, i) => dist(p, P[i]) < 0.15), ten + ": đường gấp khúc nối lần lượt các điểm");
  return P.map((p) => {
    const d = soDinh(T, p[0], p[1], ten);
    assert.ok(tr.khop(p[1], soChu(d.t)), ten + ": số ghi " + d.t + " khác độ cao của điểm");
    return [tenDuoi(T, p[0], tr.bot, ten), soChu(d.t)];
  });
};
const docCotGhep = (svg, ten) => {
  const tr = trucDung(svg, ten), T = texts2(svg), R = rects(svg).filter((r) => r.fill === "acc-soft").sort((a, b) => a.x - b.x);
  R.slice(1).forEach((r, i) => assert.ok(Math.abs(R[i].x + R[i].w - r.x) < 0.15 && Math.abs(r.w - R[0].w) < 0.15, ten + ": các cột kề nhau, rộng bằng nhau"));
  const moc = R.map((r) => r.x).concat(R[R.length - 1].x + R[R.length - 1].w).map((x) => soChu(tenDuoi(T, x, tr.bot, ten)));
  moc.slice(1).forEach((m, i) => assert.ok(Math.abs(m - moc[i] - (moc[1] - moc[0])) < 1e-9, ten + ": các nhóm dài bằng nhau"));
  const f = R.map((r) => {
    assert.ok(Math.abs(r.y + r.h - tr.bot) < 0.6, ten + ": cột đứng trên trục ngang");
    const d = soDinh(T, r.x + r.w / 2, r.y, ten); assert.ok(/%$/.test(d.t) && tr.khop(r.y, soChu(d.t)), ten + ": số ở đỉnh cột khác chiều cao cột");
    return soChu(d.t);
  });
  assert.equal(f.reduce((s, v) => s + v, 0), 100, ten + ": các tần số tương đối cộng lại 100%");
  return { moc, f, nhom: f.map((v, i) => ["[" + fmtDec(F(moc[i] * 10, 10)) + "; " + fmtDec(F(moc[i + 1] * 10, 10)) + ")", v]) };
};
const docQuat = (svg, ten) => {
  const T = texts2(svg);
  const chuGiai = rects(svg).filter((r) => r.w === 16).map((r) => {
    const t = T.filter((t) => Math.abs(t.at[0] - (r.x + 24)) < 0.6 && Math.abs(t.at[1] - (r.y + 13)) < 0.6);
    assert.equal(t.length, 1, ten + ": mỗi ô chú giải một tên"); return { fill: r.fill, ten: t[0].t };
  });
  assert.equal(new Set(chuGiai.map((c) => c.fill)).size, chuGiai.length, ten + ": mỗi ô chú giải một màu");
  const gocDo = (cx, cy, x, y) => (Math.atan2(y - cy, x - cx) * 180) / Math.PI, lech = (a, b) => (((a - b) % 360) + 360) % 360;
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
    const c = chuGiai.find((g) => g.fill === m[2]); assert.ok(c, ten + ": màu của hình quạt có trong chú giải");
    const nhan = T.filter((t) => /^(?:\d+(?:,\d+)?%|\?)$/.test(t.t) && Math.hypot(t.at[0] - cx, t.at[1] - 5 - cy) < r && lech(gocDo(cx, cy, t.at[0], t.at[1] - 5), a0) < d);
    assert.equal(nhan.length, 1, ten + ": mỗi hình quạt một số phần trăm ở trong");
    const p = nhan[0].t === "?" ? null : soChu(nhan[0].t);
    if (p !== null) assert.ok(Math.abs(d / 3.6 - p) < 0.15, ten + ": hình quạt “" + c.ten + "” có góc " + d.toFixed(1) + "°, không khớp " + p + "%");
    return { ten: c.ten, p, d };
  });
  assert.ok(Math.abs(tong - 360) < 0.5, ten + ": các hình quạt đủ một vòng tròn");
  const biet = out.filter((o) => o.p !== null).reduce((s, o) => s + o.p, 0), mo = out.filter((o) => o.p === null);
  assert.ok(mo.length <= 1 && (mo.length ? Math.abs(mo[0].d / 3.6 - (100 - biet)) < 0.15 : Math.abs(biet - 100) < 1e-9), ten + ": các phần cộng lại 100%");
  assert.deepEqual(out.map((o) => o.ten).sort(), chuGiai.map((c) => c.ten).sort(), ten + ": mỗi phần một ô chú giải");
  return out;
};
const phanTram = (qt, ten) => { const o = qt.find((x) => x.ten === ten); assert.ok(o, "biểu đồ không có phần " + ten); return o.p; };

/* Tấm bìa quay: đường tròn chia thành n hình quạt bằng nhau bởi n bán kính, mỗi hình quạt một số (chữ đậm), mũi tên ở tâm.
   Trả về các số theo chiều kim đồng hồ từ hình quạt đầu tiên. */
const docBia = (svg, ten) => {
  const C = duongTron(svg); assert.equal(C.length, 1, ten + ": một đường tròn");
  const { c, r } = C[0], g = (p) => (((Math.atan2(p[1] - c[1], p[0] - c[0]) * 180) / Math.PI) + 450) % 360; // 0° ở trên cùng, theo chiều kim đồng hồ
  const ban = lines(svg).filter((l) => dist(l.a, c) < 0.15 && Math.abs(dist(l.b, c) - r) < 0.15).map((l) => g(l.b)).sort((a, b) => a - b);
  const n = ban.length; assert.ok(n >= 3, ten + ": thiếu bán kính chia hình quạt");
  ban.forEach((a, i) => i && assert.ok(Math.abs(a - ban[i - 1] - 360 / n) < 0.2, ten + ": các hình quạt bằng nhau"));
  const so = texts2(svg).filter((t) => t.b && /^\d+$/.test(t.t)).map((t) => ({ t: t.t, k: Math.floor((g([t.at[0], t.at[1] - 6]) - ban[0] + 360) % 360 / (360 / n)) }));
  assert.ok(so.length === n && new Set(so.map((s) => s.k)).size === n, ten + ": mỗi hình quạt đúng một số");
  return so.sort((a, b) => a.k - b.k).map((s) => s.t);
};

/* Nhiều parabol y = ax² trên lưới ô vuông (trục, lưới, số trên trục như tests/toan9-gk2.js); mỗi đường cong màu acc có một nhãn chữ
   đậm màu acc đặt gần một đầu của nó (cách không quá 30 px, gần đầu đó hơn mọi đầu của đường khác). Trả về { nhãn: a } (a làm tròn
   đến phần trăm). */
const docParabol = (svg, ten) => {
  const L = lines(svg), truc = L.filter((l) => l.w === 1.5), ngang = truc.filter((l) => l.a[1] === l.b[1]), doc = truc.filter((l) => l.a[0] === l.b[0]);
  assert.ok(ngang.length === 1 && doc.length === 1, ten + ": cần đúng một trục hoành và một trục tung");
  const ox = doc[0].a[0], oy = ngang[0].a[1], luoi = L.filter((l) => l.stroke === "line" && l.w === 1);
  const gx = [...new Set(luoi.filter((l) => l.a[0] === l.b[0]).map((l) => l.a[0]))].sort((a, b) => a - b), gy = [...new Set(luoi.filter((l) => l.a[1] === l.b[1]).map((l) => l.a[1]))].sort((a, b) => a - b);
  const u = gx[1] - gx[0];
  gx.forEach((x, i) => i && assert.ok(Math.abs(x - gx[i - 1] - u) < 0.15, ten + ": lưới không đều"));
  gy.forEach((y, i) => i && assert.ok(Math.abs(y - gy[i - 1] - u) < 0.15, ten + ": lưới không phải ô vuông"));
  assert.ok(gx.some((x) => Math.abs(x - ox) < 0.15) && gy.some((y) => Math.abs(y - oy) < 0.15), ten + ": trục không nằm trên đường lưới");
  const so = texts2(svg).filter((t) => /^−?\d+$/.test(t.t)).map((t) => ({ at: t.at, v: +t.t.replace("−", "-") }));
  // số trên trục hoành ghi dưới trục, chỗ đường cong đi qua thì ghi trên trục (oy − 6)
  const tx = so.filter((t) => Math.abs(t.at[0] - (ox + t.v * u - (t.v < 0 ? 3 : 0))) < 0.6 && [oy + 16, oy - 6].some((y) => Math.abs(t.at[1] - y) < 0.6)), ty = so.filter((t) => Math.abs(t.at[1] - (oy - t.v * u + 4.5)) < 0.6);
  assert.ok(tx.length >= 4 && tx.length + ty.length === so.length, ten + ": số ghi trên trục không khớp lưới");
  const nhan = texts2(svg).filter((t) => t.b && t.fill === "acc"), cong = polylines(svg).filter((p) => p.stroke === "acc"), out = {};
  const diemCong = cong.flatMap((pl) => { const r = []; for (let i = 2; i < pl.p.length; i += 2) for (let k = 0; k <= 10; k++) r.push([pl.p[i - 2] + ((pl.p[i] - pl.p[i - 2]) * k) / 10, pl.p[i - 1] + ((pl.p[i + 1] - pl.p[i - 1]) * k) / 10]); return r; });
  const neo = new Map(texts2(svg).map((x) => [x.at.join(","), x.anchor]));
  so.forEach((t) => { const s = String(t.v).replace("-", "−"), w = s.length * 7.5 + 4, x0 = neo.get(t.at.join(",")) === "end" ? t.at[0] - w : t.at[0] - w / 2;
    assert.ok(!diemCong.some((q) => q[0] >= x0 && q[0] <= x0 + w && q[1] >= t.at[1] - 12 && q[1] <= t.at[1] + 3), ten + ": đường cong đi qua số " + s + " ghi trên trục"); });
  const dau = (pl) => [pl.p.slice(0, 2), pl.p.slice(-2)];
  cong.forEach((pl) => {
    const pts = []; for (let i = 0; i < pl.p.length; i += 2) pts.push([(pl.p[i] - ox) / u, (oy - pl.p[i + 1]) / u]);
    const xa = pts.filter((p) => Math.abs(p[0]) >= 1).map((p) => p[1] / (p[0] * p[0])), a = xa.reduce((s, v) => s + v, 0) / xa.length;
    pts.forEach((p) => assert.ok(Math.abs(p[1] - a * p[0] * p[0]) < 0.06, ten + ": đường cong không phải parabol y = ax²"));
    assert.ok(pts.some((p) => Math.abs(p[0]) < 1e-6 && Math.abs(p[1]) < 1e-6), ten + ": parabol phải đi qua gốc toạ độ");
    const gan = nhan.filter((t) => { const d = Math.min(...dau(pl).map((p) => dist(p, t.at))); return d < 30 && cong.every((k) => k === pl || Math.min(...dau(k).map((p) => dist(p, t.at))) > d); });
    assert.equal(gan.length, 1, ten + ": mỗi đường cong đúng một nhãn ở gần một đầu");
    assert.ok(!(gan[0].t in out), ten + ": hai đường cong cùng nhãn"); out[gan[0].t] = F(Math.round(a * 100), 100);
  });
  assert.equal(Object.keys(out).length, nhan.length, ten + ": nhãn thừa");
  return out;
};

/* Hình trụ: elip đáy trên tâm O′, A trên đường tròn đáy trên (O′A nằm ngang), B ngay dưới A, O ngay dưới O′; ghi "R = … cm",
   "h = … cm". Hình nón: đỉnh S, tâm đáy O ngay dưới S, A trên đường tròn đáy (OA nằm ngang); ghi hai trong ba "r = … cm", "h = … cm",
   "l = … cm". Số ghi phải đúng tỉ lệ với độ dài vẽ (sai lệch dưới 2 %). Trả về các số đo (số hữu tỉ). */
const ghiSo = (svg, k) => { const t = texts2(svg).filter((x) => new RegExp("^" + k + " = (\\S+) cm$").test(x.t)); assert.ok(t.length <= 1, "hai nhãn " + k); return t.length ? fr(/= (\S+) cm$/.exec(t[0].t)[1]) : null; };
const docTru = (svg, ten) => {
  const D = diem(svg), R = ghiSo(svg, "R"), h = ghiSo(svg, "h");
  const el = [...svg.matchAll(/<ellipse [^>]*>/g)].map((m) => attrs(m[0])); assert.equal(el.length, 1, ten + ": đáy trên là một elip");
  const c = [+el[0].cx, +el[0].cy], rx = +el[0].rx;
  assert.ok(dist(D["O′"], c) < 0.15 && Math.abs(D.A[1] - c[1]) < 0.15 && Math.abs(dist(D["O′"], D.A) - rx) < 0.15, ten + ": O′ là tâm đáy trên, O′A là một bán kính đáy");
  assert.ok(Math.abs(D.A[0] - D.B[0]) < 0.15 && Math.abs(D.O[0] - D["O′"][0]) < 0.15 && Math.abs(dist(D.O, D.B) - rx) < 0.15, ten + ": đường sinh AB và trục OO′ thẳng đứng, OB là bán kính đáy dưới");
  assert.ok(Math.abs(dist(D.A, D.B) - dist(D.O, D["O′"])) < 0.15 && coDoan(svg, D.A, D.B), ten + ": đường sinh AB bằng chiều cao OO′");
  const k = rx / toNum(R); assert.ok(Math.abs(dist(D.A, D.B) / toNum(h) - k) < 0.02 * k, ten + ": bán kính đáy và chiều cao không đúng tỉ lệ");
  return { R, h };
};
const docNon = (svg, ten) => {
  const D = diem(svg), r = ghiSo(svg, "r"), h = ghiSo(svg, "h"), l = ghiSo(svg, "l");
  assert.ok(Math.abs(D.S[0] - D.O[0]) < 0.15 && Math.abs(D.O[1] - D.A[1]) < 0.15 && coDoan(svg, D.S, D.A), ten + ": SO thẳng đứng, OA nằm ngang, SA là một đường sinh");
  const px = { r: dist(D.O, D.A), h: dist(D.S, D.O), l: dist(D.S, D.A) }, ghi = { r, h, l }, co = Object.keys(ghi).filter((k) => ghi[k]);
  assert.ok(co.length === 2, ten + ": ghi đúng hai trong ba số đo r, h, l");
  const k = px[co[0]] / toNum(ghi[co[0]]); assert.ok(Math.abs(px[co[1]] / toNum(ghi[co[1]]) - k) < 0.02 * k, ten + ": các số đo không đúng tỉ lệ");
  return ghi;
};
/* Lục giác đều, đa giác đều nội tiếp đường tròn tâm O: các đỉnh cách đều O, góc ở tâm giữa hai đỉnh liền nhau bằng nhau; trả về các đỉnh
   theo thứ tự trong polygon và chiều đi (ngược chiều kim đồng hồ: true) */
const docDaGiac = (svg, ten) => {
  const D = diem(svg), pg = [...svg.matchAll(/<polygon points="([^"]+)" fill="none"/g)].map((m) => nums(m[1]));
  assert.equal(pg.length, 1, ten + ": một đa giác"); const p = []; for (let i = 0; i < pg[0].length; i += 2) p.push([pg[0][i], pg[0][i + 1]]);
  const n = p.length, ten2 = p.map((x) => { const k = Object.keys(D).find((k) => dist(D[k], x) < 0.15); assert.ok(k, ten + ": đỉnh không có nhãn"); return k; });
  p.forEach((x) => assert.ok(Math.abs(dist(x, D.O) - dist(p[0], D.O)) < 0.15, ten + ": các đỉnh không cách đều tâm O"));
  const g = (x) => Math.atan2(-(x[1] - D.O[1]), x[0] - D.O[0]) / RAD;
  const buoc = p.map((x, i) => ((g(p[(i + 1) % n]) - g(x)) % 360 + 360) % 360);
  assert.ok(buoc.every((b) => Math.abs(b - 360 / n) < 0.3) || buoc.every((b) => Math.abs(360 - b - 360 / n) < 0.3), ten + ": các góc ở tâm không bằng nhau");
  return { ten: ten2, nguoc: Math.abs(buoc[0] - 360 / n) < 0.3, g: (k) => g(D[k]) };
};
// lát kín bằng đa giác: mỗi đa giác đều (cạnh bằng nhau, góc bằng nhau); trả về số cạnh (cùng một số cho mọi viên gạch)
const docLat = (svg, ten) => {
  const pg = [...svg.matchAll(/<polygon points="([^"]+)"/g)].map((m) => { const v = nums(m[1]), p = []; for (let i = 0; i < v.length; i += 2) p.push([v[i], v[i + 1]]); return p; });
  assert.ok(pg.length >= 3, ten + ": quá ít viên gạch");
  const n = pg[0].length;
  pg.forEach((p) => {
    assert.equal(p.length, n, ten + ": các viên gạch không cùng số cạnh");
    p.forEach((x, i) => { const y = p[(i + 1) % n], z = p[(i + 2) % n]; assert.ok(Math.abs(dist(x, y) - dist(p[0], p[1])) < 0.2, ten + ": cạnh không bằng nhau");
      assert.ok(Math.abs(goc(y, x, z) - (180 * (n - 2)) / n) < 0.5, ten + ": góc không bằng nhau"); });
  });
  return n;
};
// hình không có đường tròn: điểm có nhãn, góc ghi số đo, kí hiệu góc vuông
const hinhPhang = (q, ten) => ({ D: diem(q.svg), ghi: gocGhi(q.svg, ten), vuong: gocVuong(q.svg, ten) });
const thang = (P, Q, R) => dThang(R, P, Q) < 0.6; // R thuộc đường thẳng PQ

/* ---------- đếm không gian mẫu ---------- */
const nhanTap = (...ds) => ds.reduce((acc, d) => acc.flatMap((a) => d.map((x) => a.concat([x]))), [[]]); // tích các tập (lấy có thứ tự, có lặp)
const chinhHop = (d, k) => (k === 0 ? [[]] : d.flatMap((x, i) => chinhHop(d.filter((_, j) => j !== i), k - 1).map((r) => [x].concat(r)))); // lấy lần lượt k phần tử, không lặp
const toHop = (d, k) => (k === 0 ? [[]] : d.flatMap((x, i) => toHop(d.slice(i + 1), k - 1).map((r) => [x].concat(r)))); // chọn k phần tử, không kể thứ tự
const xacSuat = (om, f) => F(om.filter(f).length, om.length);
const laNT = (n) => n > 1 && Array.from({ length: n - 2 }, (_, i) => i + 2).every((d) => n % d);
const XX = nhanTap([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6]);
// "{SS; SN; NS; NN}" → tập chuỗi; "1/6" → phân số
const tap = (s) => { const m = /^Ω = \{(.+)\}$/.exec(s); assert.ok(m, "không đọc được tập: " + s); return m[1].split("; ").sort(); };
const cungTapChu = (u, v) => JSON.stringify(u.slice().sort()) === JSON.stringify(v.slice().sort());
const dsSo = (s) => s.split("; ").map((x) => toNum(fr(x)));
// số đo hình khối: Sxq, V của hình trụ, hình nón, hình cầu (bán kính, chiều cao là số hữu tỉ; kết quả là hệ số của π)
const PI = (k) => mul(k, Math.PI);
const lamTronDung = (q, x) => {
  // câu dặn làm tròn: tol đúng bằng nửa đơn vị làm tròn, ans là x làm tròn theo quy tắc của sách
  const k = /hàng đơn vị|đến mét/.test(q.q) ? 0 : /hàng phần mười|chữ số thập phân thứ nhất/.test(q.q) ? 1 : /hàng phần trăm|chữ số thập phân thứ hai/.test(q.q) ? 2 : null;
  assert.ok(k !== null, "không rõ làm tròn đến hàng nào");
  assert.ok(Math.abs(q.tol - 0.5 * 10 ** -k) < 1e-12, "tol phải bằng nửa đơn vị làm tròn: " + q.tol);
  return lamTron(x, k);
};

/* ---------- kiểm tra từng câu ----------
   right(q): đáp án tính bằng code (so với o[0], ans[0], a, ans, r của từng ô trái, o); more(q): kiểm tra thêm; essay(q): tự luận. */
const dsTrongDe = (q, re) => { const m = re.exec(q.q); assert.ok(m, "đề thiếu " + re); return m[1].split("; "); };
const dem = (ds, v) => ds.filter((x) => x === v).length;
const CHECKS = [
  /* ----- ôn Bài 18. Hàm số y = ax² (a ≠ 0) ----- */
  { has: "Điểm M(3; −6) thuộc đồ thị của hàm số y = ax² (a ≠ 0). Điểm nào dưới đây cũng thuộc đồ thị", right: (q) => {
    const a = div(F(-6), F(9)); return theo(q, /^\((.+); (.+)\)$/, (k) => eq(mul(a, pw(fr(k[1]), 2)), fr(k[2]))); } },
  { has: "Bạn Lan lập bảng giá trị của hàm số y = −0,5x² như hình vẽ", right: (q) => {
    const b = docBang(q.svg, "bảng của Lan"); assert.deepEqual([b[0][0], b[1][0]], ["x", "y"]);
    const sai = b[0].slice(1).filter((x, i) => !eq(fr(b[1][i + 1]), ev("−0,5x²", { x: fr(x) })));
    assert.equal(sai.length, 1, "bảng của Lan phải sai đúng một ô"); return theo(q, /^x = (.+)$/, (k) => eq(fr(k[1]), fr(sai[0]))); } },
  { has: "Bốn đường cong (P₁), (P₂), (P₃), (P₄) trong hình vẽ là đồ thị của bốn hàm số", right: (q) => {
    const p = docParabol(q.svg, "bốn parabol"), he = ["2", "0,5", "−1", "−0,25"].map(fr);
    assert.ok(cungTap(Object.values(p), he), "bốn đường cong phải là đồ thị của bốn hàm số trong đề");
    const k = Object.keys(p).find((t) => eq(p[t], fr("0,5"))); return "Đường " + k; },
    more: (q) => assert.ok(q.x.includes("(P₁) đi qua (2; 8)")) },
  { has: "Nối mỗi hàm số ở cột trái với một điểm thuộc đồ thị của hàm số đó", right: (q) => {
    const thuoc = (f, p) => { const m = /^\((.+); (.+)\)$/.exec(p); return eq(ev(f.slice(4), { x: fr(m[1]) }), fr(m[2])); };
    q.r.slice(q.l.length).forEach((p) => assert.ok(q.l.every((f) => !thuoc(f, p)), "ô thừa " + p + " thuộc một đồ thị"));
    return q.l.map((f) => { const r = q.r.filter((p) => thuoc(f, p)); assert.equal(r.length, 1, f + " cần đúng một điểm"); return r[0]; }); } },
  /* ----- ôn Bài 19. Phương trình bậc hai một ẩn ----- */
  { has: "Phương trình 5x² − 20x = 0 có các nghiệm là", right: (q) => theo(q, /^(.+)$/, (k) => cungTap(docNghiem(k[1]), nghiem2(bac2("5x² − 20x = 0")))) },
  { has: "Tìm nghiệm dương của phương trình x(x + 1) = 3x + 15.", right: () => { const n = nghiem2(bac2("x(x + 1) = 3x + 15")).filter((x) => toNum(x) > 0); assert.equal(n.length, 1); return n[0]; },
    more: (q) => assert.ok(q.x.includes("x² − 2x − 15 = 0") && eq(deltaPhay(bac2("x² − 2x − 15 = 0")), F(16))) },
  { has: "Phương trình x² − 2x − 1 = 0 có nghiệm lớn hơn là", right: (q) => bang(q, Math.max(...nghiem2(bac2("x² − 2x − 1 = 0")).map(toNum))) },
  { has: "Cho phương trình 3x² + mx − 7 = 0 (m là một số cho trước). Phương trình này", right: (q) => {
    const ms = []; for (let t = -40; t <= 40; t++) ms.push(F(t, 4)); const D = (m) => delta(bac2("3x² + mx − 7 = 0".replace("m", "(" + fmtF(m) + ")")));
    const dung = { "luôn có hai nghiệm phân biệt": ms.every((m) => toNum(D(m)) > 0), "vô nghiệm khi m = 0": toNum(D(F(0))) < 0,
      "có nghiệm kép khi m = 0": toNum(D(F(0))) === 0, "chỉ có nghiệm khi m > 0": ms.every((m) => (toNum(D(m)) >= 0) === (toNum(m) > 0)) };
    return theo(q, /^(.+)$/, (k) => { assert.ok(k[1] in dung, "khẳng định lạ: " + k[1]); return dung[k[1]]; }); } },
  /* ----- ôn Bài 20. Định lí Viète và ứng dụng ----- */
  { has: "Phương trình 2x² − 6x − 5 = 0 có hai nghiệm x₁, x₂. Không giải phương trình, tính (x₁ + 1)(x₂ + 1).", right: () => {
    const e = bac2("2x² − 6x − 5 = 0"); assert.ok(toNum(delta(e)) > 0); return add(add(tich(e), tong(e)), F(1)); },
    more: (q) => assert.ok(q.x.includes("= 76") && eq(delta(bac2("2x² − 6x − 5 = 0")), F(76))) },
  { has: "Phương trình x² − 9x + 1 = 0 có hai nghiệm x₁, x₂. Phương trình nào dưới đây có hai nghiệm là 3x₁ và 3x₂?", right: (q) => {
    const n = nghiem2(bac2("x² − 9x + 1 = 0")).map((x) => mul(F(3), x)); assert.equal(n.length, 2);
    return theo(q, /^(.+)$/, (k) => cungTap(nghiem2(bac2(k[1])), n)); } },
  { has: "Phương trình x² − 5x + 2 = 0 có hai nghiệm x₁, x₂. Không giải phương trình, tính (x₁ − x₂)².", right: () => {
    const e = bac2("x² − 5x + 2 = 0"), n = nghiem2(e); assert.equal(n.length, 2); const v = sub(pw(tong(e), 2), mul(F(4), tich(e)));
    assert.ok(eq(v, pw(sub(n[1], n[0]), 2)), "tính trực tiếp từ hai nghiệm phải bằng"); return v; } },
  { has: "Biết phương trình x² + bx + c = 0 có hai nghiệm là −3 và 5. Tính b + c.", right: () => {
    const b = neg(add(F(-3), F(5))), c = mul(F(-3), F(5)); assert.ok(cungTap(nghiem2({ a: F(1), b, c }), [F(-3), F(5)])); return add(b, c); } },
  /* ----- ôn Bài 21. Giải bài toán bằng cách lập phương trình ----- */
  { has: "Một bể cạn sẽ đầy nước sau 4 giờ nếu mở đồng thời hai vòi", right: () => { const n = nghiem("1/x + 1/(x + 6) = 1/4").filter((x) => toNum(x) > 4); assert.equal(n.length, 1); return n[0]; },
    more: (q) => assert.ok(q.x.includes("x² − 2x − 24 = 0") && cungTap(nghiem2(bac2("x² − 2x − 24 = 0")), [F(6), F(-4)]) && q.q.includes("nhanh hơn vòi thứ hai 6 giờ")) },
  { has: "Từ một tấm bìa hình vuông, người ta cắt bỏ ở bốn góc bốn hình vuông nhỏ cạnh 4 cm", right: (q) => {
    assert.ok(q.q.includes("cạnh 4 cm") && q.q.includes("thể tích 400 cm³")); const n = nghiem("4(x − 8)² = 400").filter((x) => toNum(x) > 8); assert.equal(n.length, 1); return n[0]; } },
  { has: "Một bức tranh hình chữ nhật kích thước 30 cm × 20 cm được lồng trong một khung gỗ", right: (q) => {
    assert.ok(q.q.includes("là 1 064 cm²")); const n = nghiem("(30 + 2x)(20 + 2x) = 1 064").filter((x) => toNum(x) > 0); assert.equal(n.length, 1); return n[0]; },
    more: (q) => assert.ok(cungTap(nghiem2(bac2("x² + 25x − 116 = 0")), [F(4), F(-29)]) && q.x.includes("x² + 25x − 116 = 0")) },
  { has: "Một khu vườn hình chữ nhật dài 20 m, rộng 15 m. Dọc theo bốn cạnh", right: (q) => {
    assert.ok(q.q.includes("diện tích 204 m²")); const n = nghiem("(20 − 2x)(15 − 2x) = 204").filter((x) => toNum(x) > 0 && toNum(x) < 7.5); assert.equal(n.length, 1); return n[0]; },
    more: (q) => assert.ok(cungTap(nghiem2(bac2("2x² − 35x + 48 = 0")), [F(16), F(3, 2)]) && q.x.includes("2x² − 35x + 48 = 0")) },

  /* ----- Bài 22. Bảng tần số và biểu đồ tần số ----- */
  { has: "Bảng tần số trong hình vẽ cho biết số lần đến thư viện", right: (q) => {
    const b = docBang(q.svg, "bảng thư viện"), f = b[1].slice(1).map(Number), m = Math.max(...f); assert.equal(f.filter((x) => x === m).length, 1);
    return b[0][1 + f.indexOf(m)] + " lần"; } },
  { has: "Điểm kiểm tra môn Toán của 12 bạn trong một tổ là", right: (q) => { const d = dsTrongDe(q, /là: ([\d; ]+)\./); assert.equal(d.length, 12); return String(dem(d, "8")); } },
  { has: "Biểu đồ tần số dạng cột trong hình vẽ cho biết số giờ ngủ", right: (q) => { const c = docCot(q.svg, "giờ ngủ"); return F(c.find((x) => x[0] === "7 giờ")[1]); } },
  { has: "Bảng tần số của một mẫu dữ liệu cho ta biết", right: () => "mỗi giá trị xuất hiện bao nhiêu lần trong mẫu" },
  { has: "Số bàn thắng mà một đội bóng ghi được trong 12 trận đấu", right: (q) => {
    const d = dsTrongDe(q, /là: ([\d; ]+)\./).map(Number); assert.equal(d.length, 12);
    return q.o.map((s) => { let m;
      if ((m = /^Cỡ mẫu là (\d+)$/.exec(s))) return d.length === +m[1];
      if ((m = /^Giá trị (\d+) có tần số là (\d+)$/.exec(s))) return d.filter((x) => x === +m[1]).length === +m[2];
      if ((m = /^Có (\d+) trận đội bóng không ghi được bàn nào$/.exec(s))) return d.filter((x) => x === 0).length === +m[1];
      if ((m = /^Có (\d+) trận đội bóng ghi được từ (\d+) bàn trở lên$/.exec(s))) return d.filter((x) => x >= +m[2]).length === +m[1];
      throw new Error("ý lạ: " + s); }); } },
  { has: "Biểu đồ tần số dạng đoạn thẳng trong hình vẽ cho biết số giờ tập thể thao", right: (q) => {
    const d = docDoanThang(q.svg, "thể thao").map(([t, v]) => [+t, v]), tong = d.reduce((s, x) => s + x[1], 0), f = (g) => d.find((x) => x[0] === g)[1];
    return q.o.map((s) => { let m;
      if ((m = /^Có (\d+) bạn được hỏi$/.exec(s))) return tong === +m[1];
      if ((m = /^Giá trị (\d+) giờ có tần số lớn nhất$/.exec(s))) return d.every((x) => x[0] === +m[1] || x[1] < f(+m[1]));
      if ((m = /^Có (\d+) bạn tập thể thao từ (\d+) giờ trở lên mỗi tuần$/.exec(s))) return d.filter((x) => x[0] >= +m[2]).reduce((t, x) => t + x[1], 0) === +m[1];
      if ((m = /^Số bạn tập (\d+) giờ nhiều hơn số bạn tập (\d+) giờ$/.exec(s))) return f(+m[1]) > f(+m[2]);
      throw new Error("ý lạ: " + s); }); } },
  { has: "Bảng tần số trong hình vẽ ghi điểm kiểm tra của 30 học sinh, trong đó tần số của điểm 7 bị mờ", right: (q) => {
    const b = docBang(q.svg, "điểm bị mờ"), i = b[1].indexOf("?"); assert.ok(i > 0 && b[0][i] === "7");
    return F(30 - b[1].slice(1).filter((x) => x !== "?").reduce((s, x) => s + +x, 0)); } },
  { has: "Bạn Hà hỏi 16 bạn trong lớp về phương tiện đến trường", right: (q) => {
    const d = /ghi lại: (.+)\. Giá trị/.exec(q.q)[1].split(", "); assert.equal(d.length, 16);
    const loai = [...new Set(d)], f = loai.map((x) => dem(d, x)), m = Math.max(...f); assert.equal(f.filter((x) => x === m).length, 1);
    const k = loai[f.indexOf(m)]; return k[0].toUpperCase() + k.slice(1) + ", tần số " + m; } },
  /* ----- Bài 23. Bảng tần số tương đối và biểu đồ tần số tương đối ----- */
  { has: "Một mẫu dữ liệu có cỡ mẫu là 40, trong đó giá trị “Tốt” có tần số là 6.", right: (q) => theo(q, /^(\d+)%$/, (k) => eq(F(+k[1]), mul(F(6, 40), F(100)))) },
  { has: "Biểu đồ hình quạt tròn trong hình vẽ biểu diễn tỉ lệ các môn thể thao được yêu thích nhất", right: (q) => {
    const qt = docQuat(q.svg, "môn thể thao"), m = Math.min(...qt.map((x) => x.p)); assert.equal(qt.filter((x) => x.p === m).length, 1); return qt.find((x) => x.p === m).ten; } },
  { has: "Trong một mẫu dữ liệu, tần số tương đối của một giá trị là", right: () => "tỉ số giữa tần số của giá trị đó và cỡ mẫu" },
  { has: "hình quạt biểu diễn giá trị có tần số tương đối 25% có số đo cung là", right: (q) => theo(q, /^(\d+)°$/, (k) => eq(F(+k[1]), mul(F(360), F(25, 100)))) },
  { has: "Bảng tần số trong hình vẽ cho biết hoạt động yêu thích vào cuối tuần của 50 học sinh", right: (q) => {
    const h = hangSau(docBang(q.svg, "cuối tuần")); assert.equal(h.reduce((s, x) => s + +x[1], 0), 50);
    return mul(F(+h.find((x) => x[0] === "Đọc sách")[1], 50), F(100)); } },
  { has: "Lớp 9C có 40 bạn, trong đó 12 bạn chọn tham quan bảo tàng", right: () => mul(F(360), F(12, 40)) },
  { has: "Bảng tần số tương đối trong hình vẽ cho biết loại nước uống mà 80 khách hàng", right: (q) => {
    const h = hangSau(docBang(q.svg, "nước uống")).map(([t, p]) => [t, soChu(p)]); assert.equal(h.reduce((s, x) => s + x[1], 0), 100);
    const p = (t) => { const x = h.find((y) => y[0].toLowerCase() === t.toLowerCase()); assert.ok(x, "không có " + t); return x[1]; };
    return q.o.map((s) => { let m;
      if ((m = /^Có (\d+) khách hàng chọn (.+)$/.exec(s))) return (80 * p(m[2])) / 100 === +m[1];
      if ((m = /^Hình quạt biểu diễn (.+) có số đo cung là (\d+)°$/.exec(s))) return 3.6 * p(m[1]) === +m[2];
      if ((m = /^Số khách chọn (.+) nhiều hơn số khách chọn (.+)$/.exec(s))) return p(m[1]) > p(m[2]);
      throw new Error("ý lạ: " + s); }); } },
  { has: "Bạn Lan hỏi 40 bạn trong lớp về môn thể thao yêu thích nhất và muốn vẽ biểu đồ hình quạt tròn", right: (q) => {
    // mỗi việc dùng kết quả của việc trước: số bạn → tần số tương đối → số đo cung → hình quạt
    const can = [/^Đếm số bạn/, /^Chia số bạn .* cho 40 .*tần số tương đối$/, /^Nhân 360° với tần số tương đối .*số đo cung$/, /^Vẽ hình tròn, chia hình tròn theo các số đo cung đã tính/];
    return can.map((re) => { const o = q.o.filter((s) => re.test(s)); assert.equal(o.length, 1, "thiếu bước " + re); return o[0]; }); } },
  { has: "Biểu đồ hình quạt tròn trong hình vẽ cho biết tỉ lệ phương tiện chính dùng để đi làm của 250 hộ", right: (q) => mul(F(250), F(phanTram(docQuat(q.svg, "phương tiện"), "Xe máy điện"), 100)) },
  { has: "Khảo sát ngẫu nhiên 60 học sinh của một trường về môn thể thao muốn học thêm thì có 21 bạn chọn bơi", right: (q) => {
    assert.ok(q.q.includes("Trường có 900 học sinh")); const p = mul(F(21, 60), F(100)); assert.ok(q.x.includes("= " + fmtF(p) + "%")); return mul(F(900), F(21, 60)); } },
  { has: "tỉ lệ học sinh lớp 9 của một trường đăng kí các câu lạc bộ", right: (q) => {
    const qt = docQuat(q.svg, "câu lạc bộ"), co = qt.find((x) => x.ten === "Cờ vua"); assert.ok(co && co.p === null, "phần Cờ vua phải bị mờ");
    const p = F(100 - qt.filter((x) => x.p !== null).reduce((s, x) => s + x.p, 0)); assert.ok(q.q.includes("Có 140 học sinh đăng kí")); return mul(F(140), div(p, F(100))); } },
  { has: "Lớp 9A có 40 học sinh, trong đó 30% thích học bơi; lớp 9B có 36 học sinh, trong đó 25% thích học bơi", right: (q) => {
    const a = mul(F(40), F(30, 100)), b = mul(F(36), F(25, 100)); assert.ok(isInt(a) && isInt(b)); return lamTronDung(q, toNum(mul(div(add(a, b), F(76)), F(100)))); } },
  /* ----- Bài 24. Bảng tần số, tần số tương đối ghép nhóm và biểu đồ ----- */
  { has: "Trong bảng tần số ghép nhóm, nhóm số liệu [20; 25) gồm các số liệu x thoả mãn", right: (q) => {
    // nhóm [a; b) gồm số liệu lớn hơn hoặc bằng a và nhỏ hơn b: thử các số liệu 20; 22,5; 25
    const thu = (s, x) => { const m = /^(\d+) (≤|<) x (≤|<) (\d+)$/.exec(s); return (m[2] === "≤" ? +m[1] <= x : +m[1] < x) && (m[3] === "≤" ? x <= +m[4] : x < +m[4]); };
    return theo(q, /^(.+)$/, (k) => thu(k[1], 20) && thu(k[1], 22.5) && !thu(k[1], 25)); } },
  { has: "Tìm giá trị đại diện của nhóm [45; 50).", right: () => div(add(F(45), F(50)), F(2)) },
  { has: "Bảng tần số ghép nhóm trong hình vẽ cho biết thời gian (phút) đọc sách mỗi ngày", right: (q) => {
    const h = hangSau(docBang(q.svg, "đọc sách")), f = h.map((x) => +x[1]), m = Math.max(...f); assert.equal(f.filter((x) => x === m).length, 1); return h[f.indexOf(m)][0]; } },
  { has: "khối lượng (g) của các quả cam trong một thùng. Tần số tương đối của nhóm [200; 225) là", right: (q) => {
    const g = docCotGhep(q.svg, "quả cam"); return g.nhom.find((x) => x[0] === "[200; 225)")[1] + "%"; } },
  { has: "Thời gian (phút) chạy hết 1 500 m của 20 học sinh nam", right: (q) => {
    const d = /như sau: (.+)\. Lập bảng/.exec(q.q)[1].split("; ").map((s) => toNum(fr(s))); assert.equal(d.length, 20);
    const trong = (x, a, b) => a <= x && x < b, f = (a, b) => d.filter((x) => trong(x, a, b)).length;
    assert.equal(f(6, 7) + f(7, 8) + f(8, 9) + f(9, 10), 20, "mọi số liệu thuộc một nhóm");
    return q.o.map((s) => { let m;
      if ((m = /^Nhóm \[(\d+); (\d+)\) có tần số là (\d+)$/.exec(s))) return f(+m[1], +m[2]) === +m[3];
      if ((m = /^Tần số tương đối của nhóm \[(\d+); (\d+)\) là (\d+)%$/.exec(s))) return (100 * f(+m[1], +m[2])) / 20 === +m[3];
      if ((m = /^Có (\d+) bạn chạy hết từ (\d+) phút trở lên$/.exec(s))) return d.filter((x) => x >= +m[2]).length === +m[1];
      if ((m = /^Bạn chạy hết (\S+) phút được xếp vào nhóm \[(\d+); (\d+)\)$/.exec(s))) return trong(toNum(fr(m[1])), +m[2], +m[3]);
      throw new Error("ý lạ: " + s); }); } },
  { has: "tốc độ gõ bàn phím (số từ mỗi phút) của 80 học sinh", right: (q) => {
    const g = docCotGhep(q.svg, "gõ phím"), p = g.f.filter((v, i) => g.moc[i] >= 40).reduce((s, v) => s + v, 0); return mul(F(80), F(p, 100)); } },
  { has: "quãng đường (km) đi bộ mỗi ngày của 40 người", right: (q) => {
    const h = hangSau(docBang(q.svg, "đi bộ")), nhom = h.map(([g, f]) => { const m = /^\[(\d+); (\d+)\)$/.exec(g); return { a: +m[1], b: +m[2], f: +f }; });
    assert.equal(nhom.reduce((s, x) => s + x.f, 0), 40); return mul(F(nhom.filter((x) => x.b <= 4).reduce((s, x) => s + x.f, 0), 40), F(100)); } },
  { has: "số tiền (nghìn đồng) mua sách trong một học kì của 50 học sinh", right: (q) => {
    const nhom = hangSau(docBang(q.svg, "mua sách")).map(([g, f]) => { const m = /^\[(\d+); (\d+)\)$/.exec(g); return { g, a: +m[1], b: +m[2], f: +f }; });
    assert.equal(nhom.reduce((s, x) => s + x.f, 0), 50);
    const tu = (a) => nhom.filter((x) => x.a >= a).reduce((s, x) => s + x.f, 0), duoi = (a) => nhom.filter((x) => x.b <= a).reduce((s, x) => s + x.f, 0);
    return q.o.map((s) => { let m;
      if ((m = /^Tần số tương đối của nhóm (\[.+\)) là (\d+)%$/.exec(s))) return (100 * nhom.find((x) => x.g === m[1]).f) / 50 === +m[2];
      if ((m = /^Số học sinh mua sách dưới (\d+) nghìn đồng nhiều hơn số học sinh mua từ (\d+) nghìn đồng trở lên$/.exec(s))) return duoi(+m[1]) > tu(+m[2]);
      if ((m = /^Có (\d+) học sinh mua sách từ (\d+) nghìn đồng trở lên$/.exec(s))) return tu(+m[2]) === +m[1];
      if ((m = /^Trên biểu đồ tần số tương đối ghép nhóm dạng cột, cột của nhóm (\[.+\)) cao nhất$/.exec(s))) return nhom.every((x) => x.g === m[1] || x.f < nhom.find((y) => y.g === m[1]).f);
      throw new Error("ý lạ: " + s); }); } },
  /* ----- Bài 25. Phép thử ngẫu nhiên và không gian mẫu ----- */
  { has: "Gieo một đồng xu hai lần liên tiếp và quan sát mặt xuất hiện ở mỗi lần", right: (q) => {
    const om = nhanTap(["S", "N"], ["S", "N"]).map((x) => x.join("")); return theo(q, /^(.+)$/, (k) => cungTapChu(tap(k[1]), om)); } },
  { has: "Một quán có 4 loại bánh", right: (q) => {
    const banh = /loại bánh \((.+?)\)/.exec(q.q)[1].split(", "), uong = /loại đồ uống \((.+?)\)/.exec(q.q)[1].split(", "); assert.deepEqual([banh.length, uong.length], [4, 2]);
    const om = nhanTap(banh, uong); om.forEach(([b, u]) => assert.ok(q.x.includes("(" + b + ", " + u + ")"), "lời giải thiếu kết quả " + b + ", " + u)); return F(om.length); } },
  { has: "Hành động nào dưới đây là một phép thử ngẫu nhiên?", right: () => "Chọn ngẫu nhiên một ngày trong tuần để đi dã ngoại",
    more: (q) => { const nhuan = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; assert.ok(!nhuan(2027) && q.x.includes("có 28 ngày") && q.x.includes("tổng bằng 55") && 10 * 11 / 2 === 55); } },
  { has: "Gieo một đồng xu ba lần liên tiếp và ghi lại mặt xuất hiện ở mỗi lần", right: (q) => {
    const om = nhanTap(["S", "N"], ["S", "N"], ["S", "N"]).map((x) => x.join("")); om.forEach((s) => assert.ok(q.x.includes(s))); return String(om.length); } },
  { has: "Viết các chữ số 1; 4; 7 lên ba tấm thẻ", right: (q) => { const om = chinhHop(["1", "4", "7"], 2).map((x) => x.join("")); return theo(q, /^(.+)$/, (k) => cungTapChu(tap(k[1]), om)); } },
  { has: "Cô giáo chọn ngẫu nhiên hai bạn trong bốn bạn Hà, Khôi, Lan, Minh", right: (q) => {
    const om = toHop(["Hà", "Khôi", "Lan", "Minh"], 2); om.forEach((x) => assert.ok(q.x.includes("{" + x.join(", ") + "}"))); return F(om.length); } },
  { has: "Một hộp có ba viên bi màu đỏ, xanh, vàng, cùng khối lượng và kích thước. Bạn An lấy ngẫu nhiên", right: (q) => {
    const om = nhanTap(["đỏ", "xanh", "vàng"], ["đỏ", "xanh", "vàng"]).map((x) => "(" + x.join(", ") + ")");
    return q.o.map((s) => { let m;
      if ((m = /^(\(.+\)) là một kết quả có thể của phép thử$/.exec(s))) return om.includes(m[1]);
      if ((m = /^(\(.+\)) và (\(.+\)) là cùng một kết quả$/.exec(s))) return m[1] === m[2];
      if ((m = /^Không gian mẫu có (\d+) phần tử$/.exec(s))) return om.length === +m[1];
      if ((m = /^Có (\d+) kết quả mà hai viên bi lấy ra cùng màu$/.exec(s))) return om.filter((x) => { const [a, b] = x.slice(1, -1).split(", "); return a === b; }).length === +m[1];
      throw new Error("ý lạ: " + s); }); } },
  { has: "Nối mỗi phép thử ở cột trái với số phần tử của không gian mẫu ở cột phải.", right: (q) => {
    const n = { "Chọn ngẫu nhiên hai bạn trong ba bạn Hà, Khôi, Lan để trực nhật": toHop(["Hà", "Khôi", "Lan"], 2).length,
      "Rút lần lượt hai tấm thẻ, có trả lại, từ hộp có 3 tấm thẻ X, Y, Z": nhanTap(["X", "Y", "Z"], ["X", "Y", "Z"]).length,
      "Rút lần lượt hai tấm thẻ, không trả lại, từ hộp có 3 tấm thẻ X, Y, Z": chinhHop(["X", "Y", "Z"], 2).length };
    const r = q.l.map((l) => { assert.ok(l in n, "phép thử lạ " + l); return n[l] + " phần tử"; });
    q.r.slice(q.l.length).forEach((x) => assert.ok(!r.includes(x), "ô thừa trùng một đáp án")); return r; } },
  /* ----- Bài 26. Xác suất của biến cố liên quan tới phép thử ----- */
  { has: "Một hộp có 20 tấm thẻ được đánh số từ 1 đến 20.", right: (q) => bang(q, xacSuat(Array.from({ length: 20 }, (_, i) => i + 1), (x) => x % 6 === 0)) },
  { has: "Tấm bìa trong hình vẽ được chia thành tám hình quạt bằng nhau", right: (q) => {
    const so = docBia(q.svg, "tấm bìa").map(Number); assert.deepEqual(so.slice().sort((a, b) => a - b), [1, 2, 3, 4, 5, 6, 7, 8]);
    return theo(q, /^(.+)$/, (k) => cungTap(dsSo(k[1]).map((x) => F(x)), so.filter(laNT).map((x) => F(x)))); } },
  { has: "Chọn ngẫu nhiên một số tự nhiên có hai chữ số. Xác suất số được chọn chia hết cho 10 là", right: (q) => bang(q, xacSuat(Array.from({ length: 90 }, (_, i) => i + 10), (x) => x % 10 === 0)) },
  { has: "Một hộp có 7 quả bóng xanh và 9 quả bóng đỏ", right: () => xacSuat([..."XXXXXXXDDDDDDDDD"], (x) => x === "X") },
  { has: "Tính xác suất của biến cố “Tích số chấm xuất hiện trên hai con xúc xắc bằng 12”.", right: (q) => { XX.filter(([a, b]) => a * b === 12).forEach((c) => assert.ok(q.x.includes("(" + c.join(", ") + ")"))); return xacSuat(XX, ([a, b]) => a * b === 12); } },
  { has: "Có hai hộp: hộp I có 3 tấm thẻ ghi các số 1; 3; 5, hộp II có 2 tấm thẻ ghi các số 2; 4.", right: (q) => {
    const om = nhanTap([1, 3, 5], [2, 4]);
    return q.o.map((s) => { let m;
      if ((m = /^Không gian mẫu của phép thử có (\d+) phần tử$/.exec(s))) return om.length === +m[1];
      if ((m = /^Xác suất của biến cố “Tổng hai số lớn hơn (\d+)” là (.+)$/.exec(s))) return eq(xacSuat(om, ([a, b]) => a + b > +m[1]), fr(m[2]));
      if ((m = /^Xác suất của biến cố “Tích hai số là số lẻ” là (.+)$/.exec(s))) return eq(xacSuat(om, ([a, b]) => (a * b) % 2 === 1), fr(m[1]));
      if ((m = /^Xác suất của biến cố “Tổng hai số bằng (\d+)” là (.+)$/.exec(s))) return eq(xacSuat(om, ([a, b]) => a + b === +m[1]), fr(m[2]));
      throw new Error("ý lạ: " + s); }); } },
  { has: "Bạn Hùng có 3 chiếc áo (trắng, xanh, kẻ sọc) và 2 chiếc quần (đen, xám)", right: () => xacSuat(nhanTap(["trắng", "xanh", "kẻ sọc"], ["đen", "xám"]), ([a]) => a !== "xanh") },
  { has: "Gieo đồng thời hai con xúc xắc cân đối, đồng chất. Mỗi ý sau đúng hay sai?", right: (q) => q.o.map((s) => { let m;
    if ((m = /^Xác suất của biến cố “Tích số chấm là số lẻ” là (.+)$/.exec(s))) return eq(xacSuat(XX, ([a, b]) => (a * b) % 2 === 1), fr(m[1]));
    if ((m = /^Xác suất của biến cố “Tổng số chấm bằng (\d+)” là (.+)$/.exec(s))) return eq(xacSuat(XX, ([a, b]) => a + b === +m[1]), fr(m[2]));
    if ((m = /^Xác suất của biến cố “Tổng số chấm bằng (\d+)” bằng xác suất của biến cố “Tổng số chấm bằng (\d+)”$/.exec(s))) return eq(xacSuat(XX, ([a, b]) => a + b === +m[1]), xacSuat(XX, ([a, b]) => a + b === +m[2]));
    if ((m = /^Có (\d+) kết quả thuận lợi cho biến cố “Tổng số chấm bằng (\d+)”$/.exec(s))) return XX.filter(([a, b]) => a + b === +m[2]).length === +m[1];
    throw new Error("ý lạ: " + s); }) },
  { has: "Bạn Tú chọn ngẫu nhiên một số trong ba số 2; 3; 5, bạn Vy chọn ngẫu nhiên một số trong bốn số 1; 4; 6; 8.", right: () => xacSuat(nhanTap([2, 3, 5], [1, 4, 6, 8]), ([a, b]) => (a + b) % 2 === 1) },
  { has: "Ba tấm thẻ ghi các chữ cái H, O, A được bỏ vào một túi.", essay: (q) => {
    const om = chinhHop(["H", "O", "A"], 3).map((x) => x.join("")), ds = "{" + om.join("; ") + "}";
    assert.ok(cungTapChu(/Ω = \{(.+?)\}/.exec(q.x)[1].split("; "), om) && q.rubric[0].c.includes(ds), "không gian mẫu");
    const p1 = xacSuat(om, (x) => x === "HOA"), p2 = xacSuat(om, (x) => x[1] === "O");
    essayCheck(q, ["bằng " + fmtF(p1), "2/6 = " + fmtF(p2)], ["Đáp số: b) " + fmtF(p1) + "; c) " + fmtF(p2) + "."]); } },
  { has: "Tính xác suất của biến cố “Tổng số chấm xuất hiện trên hai con xúc xắc là một số nguyên tố”.", right: (q) => {
    const n = XX.filter(([a, b]) => laNT(a + b)).length; assert.ok(q.x.includes("tất cả " + n + " kết quả")); return xacSuat(XX, ([a, b]) => laNT(a + b)); } },
  { has: "Một hộp có 2 viên bi đỏ và 3 viên bi xanh có cùng kích thước và khối lượng. Lấy ngẫu nhiên lần lượt hai viên bi", right: (q) =>
    bang(q, xacSuat(chinhHop(["Đ1", "Đ2", "X1", "X2", "X3"], 2), ([a, b]) => a[0] === b[0])) },

  /* ----- ôn Bài 27. Góc nội tiếp ----- */
  { has: "Cho đường tròn (O), cung nhỏ AB có số đo 80°. Lấy điểm M trên cung nhỏ AB", right: (q) => {
    // dựng hình: A, B trên đường tròn đơn vị, cung nhỏ AB 80°, M trên cung nhỏ; đo góc AMB
    const P = (t) => [Math.cos(t * RAD), Math.sin(t * RAD)], g = goc(P(30), P(0), P(80)); return theo(q, /^(\d+)°$/, (k) => Math.abs(+k[1] - g) < 1e-6 && +k[1] === (360 - 80) / 2); } },
  { has: "Cho bốn điểm A, B, C, D theo thứ tự nằm trên đường tròn, hai dây AC và BD cắt nhau tại E", right: (q) => {
    const h = tron(q, ["A", "B", "C", "D"], "hai dây cắt nhau"), D = h.D; assert.ok(thang(D.A, D.C, D.E) && thang(D.B, D.D, D.E), "E là giao điểm của AC và BD");
    assert.deepEqual([ghiLa(h, "ADB"), ghiLa(h, "DAC")], [30, 50]); const v = ghiLa(h, "ADB") + ghiLa(h, "DAC");
    assert.ok(Math.abs(doGoc(D, "AEB") - v) < 0.5, "góc AEB đo trên hình khác đáp án"); return F(v); } },
  { has: "Đường tròn (O) có đường kính AB dài 30 cm. Lấy điểm C trên đường tròn sao cho góc CAB = 30°", right: (q) => {
    const h = tron(q, ["A", "B", "C"], "nửa đường tròn"), D = h.D; assert.ok(thang(D.A, D.B, D.O) && ghiLa(h, "CAB") === 30);
    const ds = doDai(q.svg, "nửa đường tròn"); assert.ok(ds.length === 1 && ds[0].v === 30 && cs(ds[0].P + ds[0].Q) === "AB", "số đo 30 cm ghi ở AB");
    const bc = mul(F(30), F(1, 2)); assert.ok(Math.abs(dist(D.B, D.C) / dist(D.A, D.B) - toNum(bc) / 30) < 0.01, "BC đo trên hình khác đáp án"); return bc; } },
  { has: "Cho đường tròn (O) và hai điểm M, N trên đường tròn sao cho góc MON = 100°", right: (q) => {
    // dựng hình: M, N trên đường tròn đơn vị, góc MON = 100°; P trên cung lớn, Q trên cung nhỏ; đo hai góc
    const P_ = (t) => [Math.cos(t * RAD), Math.sin(t * RAD)], M_ = P_(0), N_ = P_(100), gP = goc(P_(230), M_, N_), gQ = goc(P_(40), M_, N_);
    return theo(q, /^(\d+)° và (\d+)°$/, (k) => Math.abs(+k[1] - gP) < 1e-6 && Math.abs(+k[2] - gQ) < 1e-6); } },
  /* ----- ôn Bài 28. Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác ----- */
  { has: "Tam giác MNP vuông tại M. Tâm của đường tròn ngoại tiếp tam giác MNP là", right: () => {
    const M = [0, 0], N = [5, 0], P = [0, 3], O = tamNgoai(M, N, P); assert.ok(dist(O, mid(N, P)) < 1e-9); return "trung điểm của cạnh NP"; } },
  { has: "Đường tròn ngoại tiếp tam giác đều ABC có bán kính 6 cm. Bán kính đường tròn nội tiếp", right: (q) => {
    const a = 6 * Math.sqrt(3), A = [0, 0], B = [a, 0], C = [a / 2, (a * Math.sqrt(3)) / 2], I = tamNoi(A, B, C), O = tamNgoai(A, B, C);
    assert.ok(Math.abs(dist(O, A) - 6) < 1e-9); return theo(q, /^(.+) cm$/, (k) => Math.abs(toNum(ev(k[1])) - dThang(I, A, B)) < 1e-9); } },
  { has: "Tâm đường tròn nội tiếp của một tam giác là giao điểm của ba đường nào", right: () => {
    const A = [0, 0], B = [7, 0], C = [2, 5], I = tamNoi(A, B, C); assert.ok(Math.abs(dThang(I, A, B) - dThang(I, B, C)) < 1e-9 && Math.abs(dThang(I, B, C) - dThang(I, C, A)) < 1e-9);
    assert.ok(Math.abs(goc(A, B, I) - goc(A, I, C)) < 1e-9, "I nằm trên phân giác góc A"); return "Ba đường phân giác"; } },
  { has: "Ba đỉnh A, B, C của một tam giác cùng nằm trên đường tròn (O). Điều nào dưới đây luôn đúng", right: () => {
    // tam giác có góc tù: tâm O nằm ngoài tam giác, không cách đều ba cạnh
    const A = [0, 0], B = [10, 0], C = [2, 1], O = tamNgoai(A, B, C); assert.ok(cross(subv(B, A), subv(O, A)) * cross(subv(B, A), subv(C, A)) < 0, "O nằm ngoài tam giác tù");
    assert.ok(Math.abs(dThang(O, A, B) - dThang(O, B, C)) > 0.1); return "OA = OB = OC"; } },
  /* ----- ôn Bài 29. Tứ giác nội tiếp ----- */
  { has: "Tứ giác ABCD có bốn đỉnh nằm trên một đường tròn; hai tia AD và BC cắt nhau tại E", right: (q) => {
    const h = tron(q, ["A", "B", "C", "D"], "hai tia"), D = h.D;
    assert.ok(thang(D.A, D.D, D.E) && thang(D.B, D.C, D.E) && dist(D.A, D.E) > dist(D.A, D.D) && dist(D.B, D.E) > dist(D.B, D.C), "E trên tia AD sau D, trên tia BC sau C");
    const E = ghiLa(h, "AEB"), B = ghiLa(h, "ABC"); assert.deepEqual([E, B], [40, 65]); const v = 180 - E - (180 - (180 - B));
    assert.ok(Math.abs(doGoc(D, "DCE") - v) < 0.5, "góc DCE đo trên hình khác đáp án"); return F(v); } },
  { has: "Bốn đỉnh của tứ giác ABCD nằm trên đường tròn có đường kính AC", right: (q) => {
    const h = tron(q, ["A", "B", "C", "D"], "đường kính AC"), D = h.D; assert.ok(thang(D.A, D.C, h.C.c), "AC đi qua tâm đường tròn");
    const v = 180 - (ghiLa(h, "ACB") + ghiLa(h, "ACD")); assert.deepEqual([ghiLa(h, "ACB"), ghiLa(h, "ACD")], [25, 35]);
    assert.ok(Math.abs(doGoc(D, "BAD") - v) < 0.5, "góc BAD đo trên hình khác đáp án"); return F(v); } },
  { has: "Cho tam giác ABC có ba góc nhọn, hai đường cao BE và CF cắt nhau tại H", essay: (q) => {
    const h = hinhPhang(q, "hai đường cao BE, CF"), D = h.D;
    assert.ok(thang(D.A, D.C, D.E) && thang(D.A, D.B, D.F) && thang(D.B, D.E, D.H) && thang(D.C, D.F, D.H), "E thuộc AC, F thuộc AB, H là giao điểm của BE và CF");
    assert.deepEqual(h.vuong.slice().sort(), ["E", "F"]); assert.ok(Math.abs(doGoc(D, "BEC") - 90) < 0.5 && Math.abs(doGoc(D, "BFC") - 90) < 0.5);
    assert.ok(Math.abs(dist(mid(D.B, D.C), D.E) - dist(D.B, D.C) / 2) < 0.5 && Math.abs(dist(mid(D.B, D.C), D.F) - dist(D.B, D.C) / 2) < 0.5, "E, F trên đường tròn đường kính BC");
    const B = 65; assert.ok(q.q.includes("góc ABC = 65°") && Math.abs(doGoc(D, "ABC") - B) < 0.5 && h.ghi.length === 0, "góc ABC vẽ đúng 65°");
    assert.ok(Math.abs(doGoc(D, "AEF") - B) < 0.5, "góc AEF đo trên hình khác 65°");
    essayCheck(q, ["chung cạnh huyền BC", "góc CEF + góc FBC = 180°", "= góc ABC = " + B + "°"], ["Đáp số: b) góc AEF = " + B + "°."]); } },
  { has: "Cho tam giác ABC có ba góc nhọn, góc ABC = 60°, góc ACB = 70°; hai đường cao AD và BE cắt nhau tại H", right: (q) => {
    const h = hinhPhang(q, "hai đường cao AD, BE"), D = h.D; assert.ok(ghiLa(h, "ACB") === 70 && Math.abs(doGoc(D, "ABC") - 60) < 0.5, "góc ACB ghi 70°, góc ABC vẽ đúng 60°");
    assert.ok(thang(D.B, D.C, D.D) && thang(D.A, D.C, D.E) && thang(D.A, D.D, D.H) && thang(D.B, D.E, D.H) && Math.abs(doGoc(D, "ADC") - 90) < 0.5 && Math.abs(doGoc(D, "BEC") - 90) < 0.5);
    const tron4 = (P, Q, ds) => { const I = mid(D[P], D[Q]), r = dist(D[P], D[Q]) / 2; return ds.every((k) => Math.abs(dist(D[k], I) - r) < 0.5); };
    return q.o.map((s) => { let m;
      if ((m = /^Tứ giác ([A-Z]{4}) nội tiếp đường tròn đường kính ([A-Z])([A-Z])$/.exec(s))) return tron4(m[2], m[3], m[1].split(""));
      if ((m = /^Góc ([A-Z]{3}) = (\d+)°$/.exec(s))) { const v = { DHE: 180 - 70, CED: 60 }[m[1]]; assert.ok(v !== undefined && Math.abs(doGoc(D, m[1]) - v) < 0.5, "góc " + m[1]); return v === +m[2]; }
      throw new Error("ý lạ: " + s); }); } },
  /* ----- ôn Bài 30. Đa giác đều ----- */
  { has: "Cho lục giác đều ABCDEF tâm O, các đỉnh theo thứ tự ngược chiều kim đồng hồ", right: (q) => {
    const d = docDaGiac(q.svg, "lục giác đều"); assert.deepEqual(d.ten, ["A", "B", "C", "D", "E", "F"]); assert.ok(d.nguoc, "các đỉnh theo chiều ngược chiều kim đồng hồ");
    const dich = ((d.g("A") + 120) % 360 + 360) % 360, k = d.ten.find((t) => Math.abs(((d.g(t) - dich) % 360 + 540) % 360 - 180) < 0.3); return "Điểm " + k; } },
  { has: "Một đa giác đều có tâm là điểm O. Khẳng định nào dưới đây đúng?", right: () => {
    const P = [0, 1, 2, 3, 4].map((i) => [Math.cos((90 + 72 * i) * RAD), Math.sin((90 + 72 * i) * RAD)]), O = [0, 0];
    assert.ok(dThang(O, P[0], P[2]) > 0.1 && dist(O, mid(P[0], P[2])) > 0.1 && Math.abs(dist(O, P[0]) - dist(O, P[3])) < 1e-9); return "O cách đều tất cả các đỉnh của đa giác"; } },
  { has: "Hình vẽ là một phần sàn nhà được lát kín bằng các viên gạch", right: (q) => { const n = docLat(q.svg, "lát gạch"); assert.equal(n, 6); return "Lục giác đều"; } },
  { has: "Bát giác đều ABCDEFGH nội tiếp đường tròn tâm O. Số đo của góc AOB là", right: (q) => theo(q, /^(\d+)°$/, (k) => +k[1] === 360 / 8) },
  /* ----- Bài 31. Hình trụ và hình nón ----- */
  { has: "Hình trụ trong hình vẽ có bán kính đáy 3 cm và chiều cao 8 cm. Diện tích xung quanh", right: (q) => {
    const t = docTru(q.svg, "hình trụ 3 cm, 8 cm"); assert.ok(eq(t.R, F(3)) && eq(t.h, F(8))); return theo(q, /^(.+) cm²$/, (k) => eq(ev(k[1]), PI(mul(F(2), mul(t.R, t.h))))); } },
  { has: "Một hình nón có bán kính đáy 20 cm và chiều cao 21 cm. Độ dài đường sinh", right: (q) => theo(q, /^(.+) cm$/, (k) => eq(ev(k[1]), sqrt(add(pw(F(20), 2), pw(F(21), 2))))) },
  { has: "Hình nón trong hình vẽ có bán kính đáy 3 cm và chiều cao 10 cm. Thể tích", right: (q) => {
    const n = docNon(q.svg, "hình nón 3 cm, 10 cm"); assert.ok(eq(n.r, F(3)) && eq(n.h, F(10))); return theo(q, /^(.+) cm³$/, (k) => eq(ev(k[1]), PI(mul(F(1, 3), mul(pw(n.r, 2), n.h))))); } },
  { has: "Cắt rời hai đáy của một hình trụ, cắt mặt xung quanh theo một đường sinh rồi trải phẳng ra", right: () => "một hình chữ nhật" },
  { has: "Một hộp sữa có dạng hình trụ với đường kính đáy 6 cm và chiều cao 10 cm", right: (q) => lamTronDung(q, PI(mul(pw(F(3), 2), F(10)))) },
  { has: "Một chiếc nón lá có dạng hình nón với đường kính vành nón 48 cm và độ dài đường sinh 26 cm", right: (q) => lamTronDung(q, PI(mul(F(24), F(26)))) },
  { has: "Cho hình trụ có bán kính đáy 5 cm và chiều cao 7 cm (hình vẽ). Mỗi ý sau đúng hay sai?", right: (q) => {
    const t = docTru(q.svg, "hình trụ 5 cm, 7 cm"); assert.ok(eq(t.R, F(5)) && eq(t.h, F(7)));
    const day = pw(t.R, 2), xq = mul(F(2), mul(t.R, t.h)), v = mul(day, t.h), tp = add(xq, mul(F(2), day));
    return q.o.map((s) => { let m;
      if ((m = /^Diện tích một đáy là (\d+)π cm²$/.exec(s))) return eq(day, F(+m[1]));
      if ((m = /^Diện tích xung quanh là (\d+)π cm²$/.exec(s))) return eq(xq, F(+m[1]));
      if ((m = /^Thể tích là (\d+)π cm³$/.exec(s))) return eq(v, F(+m[1]));
      if ((m = /^Diện tích toàn phần \(diện tích xung quanh cộng diện tích hai đáy\) là (\d+)π cm²$/.exec(s))) return eq(tp, F(+m[1]));
      throw new Error("ý lạ: " + s); }); } },
  { has: "Hình nón trong hình vẽ có bán kính đáy 12 cm và đường sinh 20 cm", right: (q) => {
    const n = docNon(q.svg, "hình nón 12 cm, 20 cm"); assert.ok(eq(n.r, F(12)) && eq(n.l, F(20))); const h = sqrt(sub(pw(n.l, 2), pw(n.r, 2))); assert.ok(eq(h, F(16)));
    return lamTronDung(q, PI(mul(F(1, 3), mul(pw(n.r, 2), h)))); } },
  { has: "Một thùng phi dạng hình trụ có đường kính đáy 0,6 m và chiều cao 0,9 m chứa đầy dầu", essay: (q) => {
    const R = fr("0,3"), V = mul(pw(R, 2), fr("0,9")), lit = lamTron(PI(V) * 1000, 0), can = Math.ceil((PI(V) * 1000) / 20);
    assert.ok(eq(V, fr("0,081")) && lit === 254 && can === 13 && Math.floor(PI(V) * 1000 / 20) === 12);
    essayCheck(q, ["R = 0,3 m", "0,081π", "khoảng " + lit + " lít", lit + " : 20 = 12,7", "ít nhất " + can + " can"], ["Đáp số: a) khoảng " + lit + " lít; b) " + can + " can."]); } },
  { has: "Một con lăn đường dạng hình trụ có đường kính 1,2 m và chiều dài 2 m", right: (q) => lamTronDung(q, PI(mul(F(10), mul(F(2), mul(fr("0,6"), F(2)))))) },
  { has: "Một chiếc phễu dạng hình nón (đỉnh hướng xuống dưới) có bán kính miệng phễu 6 cm và chiều cao 8 cm", right: (q) => { assert.ok(q.q.includes("bán kính đáy 4 cm")); return div(mul(F(1, 3), mul(pw(F(6), 2), F(8))), pw(F(4), 2)); } },
  { has: "Một hình nón và một hình trụ có cùng bán kính đáy và có thể tích bằng nhau", right: (q) => theo(q, /^(.+) lần$/, (k) => eq(ev(k[1]), div(F(1), F(1, 3)))) },
  /* ----- Bài 32. Hình cầu ----- */
  { has: "Diện tích mặt cầu có bán kính 7 cm là", right: (q) => theo(q, /^(.+) cm²$/, (k) => eq(ev(k[1]), PI(mul(F(4), pw(F(7), 2))))) },
  { has: "Một mặt phẳng đi qua tâm của một hình cầu bán kính 10 cm cắt hình cầu đó", right: () => "hình tròn bán kính 10 cm" },
  { has: "Quay một nửa đường tròn một vòng quanh đường kính của nó thì ta được", right: () => "một mặt cầu" },
  { has: "Một quả bóng có dạng hình cầu với đường kính 16 cm", right: (q) => lamTronDung(q, PI(mul(F(4, 3), pw(F(8), 3)))) },
  { has: "Một khối gỗ hình lập phương cạnh 10 cm được tiện thành một quả cầu lớn nhất", right: (q) => lamTronDung(q, 1000 - PI(mul(F(4, 3), pw(F(5), 3)))) },
  { has: "Người ta mạ vàng mặt ngoài của 50 viên bi dạng hình cầu", right: (q) => lamTronDung(q, PI(mul(F(50), mul(F(4), pw(fr("0,6"), 2))))) },
  { has: "Một bể cá dạng hình hộp chữ nhật có đáy là hình chữ nhật kích thước 40 cm × 25 cm", right: (q) => lamTronDung(q, PI(mul(F(8), mul(F(4, 3), pw(F(3), 3)))) / (40 * 25)) },
  { has: "Hai quả cầu có bán kính lần lượt là R và 2R", right: (q) => theo(q, /^(.+) lần$/, (k) => eq(ev(k[1]), div(pw(F(2), 3), F(1)))) }
];

/* ---------- chạy kiểm tra: mỗi câu khớp đúng một mục của CHECKS (theo chữ has trong đề bài) ---------- */
let n = 0;
const dung = new Set(), hinhDaDoc = new Set();
const run = (id, qs) => qs.forEach((q, i) => {
  const at = id + "#" + (i + 1), cs_ = CHECKS.filter((c) => q.q.includes(c.has));
  assert.equal(cs_.length, 1, at + ": cần đúng một mục kiểm tra cho “" + q.q.slice(0, 60) + "…”, có " + cs_.length);
  const c = cs_[0]; assert.ok(!dung.has(c.has), at + ": hai câu cùng khớp “" + c.has + "”"); dung.add(c.has);
  try {
    if (q.svg) { chuTrongKhung(q.svg, at); hinhDaDoc.add(q.svg); }
    if (q.type === "essay") {
      assert.ok(c.essay, "tự luận cần kiểm tra thang chấm"); c.essay(q);
      assert.ok(q.rubric.every((r) => r.p > 0 && Number.isInteger(r.p * 4)) && q.rubric.reduce((s, r) => s + r.p, 0) === 2, "thang chấm 2 điểm, mỗi ý chia hết cho 0,25");
      assert.ok(/^Đáp số: .+$/m.test(q.x), "gợi ý ghi đáp số"); n++; return;
    }
    const want = c.right(q);
    if (q.type === "num") {
      // trả lời bằng số: so theo giá trị; câu dặn làm tròn có sai số tol bằng nửa đơn vị làm tròn (kiểm tra trong lamTronDung)
      const a = typeof q.ans === "number" ? q.ans : toNum(fr(q.ans));
      assert.ok(Math.abs(a - toNum(want)) <= 1e-9 * Math.max(1, Math.abs(a)), "đáp án " + q.ans + ", tính được " + toNum(want));
      if (typeof q.ans === "string") { const f = fr(q.ans); assert.ok(q.ans === f.n + "/" + f.d && f.d > 1, "đáp án phân số phải tối giản: " + q.ans); }
      assert.equal(/làm tròn/.test(q.q), q.tol !== undefined, "chỉ câu dặn làm tròn mới có tol");
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
for (const id of ["toan9-ck2-de1", "toan9-ck2-de2"]) { const b = bank(id); assert.ok(b, "thiếu " + id); assert.equal(b.questions.length, 25); run(id, b.questions); }
const pool = bank(POOL), mine = pool.questions.filter((q) => q.src === POOL);
run(POOL, mine);
assert.equal(dung.size, CHECKS.length, "có mục kiểm tra không khớp câu nào: " + CHECKS.filter((c) => !dung.has(c.has)).map((c) => c.has).join(" | "));

/* ---------- bộ đọc tự thử: hình cố ý vẽ sai thì báo lỗi ---------- */
{
  const tim = (has) => pool.questions.find((q) => q.q.includes(has)).svg;
  const quat = tim("tỉ lệ phương tiện chính dùng để đi làm"), cot = tim("số giờ ngủ"), ghep = tim("tốc độ gõ bàn phím"), tru = tim("bán kính đáy 3 cm và chiều cao 8 cm"), bia = tim("tám hình quạt bằng nhau");
  assert.throws(() => docQuat(quat.replace(">18%<", ">20%<"), "thử"), /không khớp 20%|cộng lại 100%/);
  assert.throws(() => docCot(cot.replace(/>14</, ">15<"), "thử"), /khác chiều cao cột/);
  assert.throws(() => docCotGhep(ghep.replace(">40%<", ">45%<"), "thử"), /khác chiều cao cột|cộng lại 100%/);
  assert.throws(() => docTru(tru.replace("h = 8 cm", "h = 9 cm"), "thử"), /không đúng tỉ lệ/);
  assert.throws(() => docBia(bia.replace(/>8</, ">5<").replace(/(<line x1="160" y1="100" x2=")([\d.]+)/, (m, a, x) => a + (+x + 9)), "thử"), /bằng nhau|đúng một số/);
  const bang = tim("tần số của điểm 7 bị mờ");
  assert.throws(() => docBang(bang.replace(/x1="(\d+)" y1="6"/, 'x1="$1" y1="7"'), "thử"), /hết|ngang, dọc|trùng/);
  const par = tim("Bốn đường cong (P₁)");
  assert.throws(() => docParabol(par.replace(/(<polyline points=")([\d.]+),([\d.]+)/, (m, a, x, y) => a + x + "," + (+y + 9)), "thử"), /không phải parabol/);
  // số 2 trên trục hoành ghi trên trục vì (P₄) đi qua chỗ dưới trục; chuyển xuống dưới trục thì bị đường cong đè
  assert.throws(() => docParabol(par.replace(/(<text x="[\d.]+" y=")([\d.]+)(" text-anchor="middle" font-size="13">2<)/, (m, a, y, c) => a + (+y + 22) + c), "thử"), /đường cong đi qua số 2/);
  assert.throws(() => chuTrongKhung('<svg viewBox="0 0 320 100" width="320"><text x="300" y="50" font-size="15">Chữ dài tràn ra</text></svg>', "thử"), /tràn khỏi khung/);
}

/* ---------- mức độ và ma trận ---------- */
assert.ok(pool.questions.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M), CHU_DE = Object.keys(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => cells.reduce((s, v) => s + v[k], 0)), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(CHU_DE.length, 15, "15 chủ đề, mỗi bài một chủ đề");
const nhom = (ts) => ts.reduce((s, t) => s + M[t].reduce((a, b) => a + b, 0), 0);
assert.deepEqual([nhom(CHU_DE.slice(0, 4)), nhom(CHU_DE.slice(4, 9)), nhom(CHU_DE.slice(9, 13)), nhom(CHU_DE.slice(13))], [4, 12, 4, 5],
  "ôn Bài 18–21: 4 câu; Bài 22–26: 12 câu; ôn Bài 27–30: 4 câu; Bài 31–32: 5 câu");
// chữ chủ đề ôn tập đúng như kho giữa kì II
const GK2 = Object.keys(bank("toan9-gk2-ngau-nhien").pool.matrix);
CHU_DE.slice(0, 4).concat(CHU_DE.slice(9, 13)).forEach((t) => assert.ok(GK2.includes(t), "chủ đề ôn “" + t + "” khác chữ của kho giữa kì II"));
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
// câu tự luận chỉ ở các ô Vận dụng rút 1 câu (xác suất, tứ giác nội tiếp, hình trụ và hình nón), ô đó còn câu khác dạng: mỗi lần rút nhiều nhất 3 câu tự luận
const oTuLuan = [...new Set(pool.questions.filter((q) => q.type === "essay").map((q) => q.topic + "|" + q.lv))];
assert.ok(oTuLuan.length <= 3 && oTuLuan.every((k) => { const [t, lv] = k.split("|"); return +lv === 3 && M[t][2] === 1 && pool.questions.some((q) => q.topic === t && q.lv === 3 && q.type !== "essay"); }), "câu tự luận: " + oTuLuan);
const demC = (f) => pool.questions.filter(f).length;
assert.deepEqual([demC((q) => q.type === "essay"), demC((q) => q.svg)], [3, 29], "kho: 3 tự luận, 29 câu có hình");
assert.equal(hinhDaDoc.size, 29, "hình nào cũng được đọc lại");
assert.ok(demC((q) => q.type === "num") >= 20 && demC((q) => q.type === "match") >= 2 && demC((q) => q.type === "order") >= 1 && demC((q) => q.type === "fill") >= 1, "kho có đủ trả lời bằng số, nối cột, sắp xếp, điền");
// xác suất ghi phân số tối giản (câu trả lời bằng số của Bài 26 có ans "a/b" hoặc 0, 1)
pool.questions.filter((q) => q.topic === "Xác suất của biến cố liên quan tới phép thử" && q.type === "num").forEach((q) => assert.ok(typeof q.ans === "string" && /^\d+\/\d+$/.test(q.ans), "xác suất ghi phân số: " + q.q.slice(0, 40)));
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

/* ---------- đề bài không trùng câu nào khác trong data/banks/9-toan.js (cả kho giữa kì II; Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const goc9 = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const deBai = BANKS.filter((b) => b.file === "9-toan.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc9(q.q) })));
deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });

/* ---------- dò lộ đáp án (Rút ra N5, N24, N8; như tests/toan9-gk2.js) giữa hai câu rút được cùng lúc: hai câu khác ô (chủ đề, mức);
   ô nào cũng rút 1 câu nên hai câu cùng ô không bao giờ cùng lần rút, hai câu cùng một đề cố định luôn khác ô.
   Đáp án là số nguyên (từ 10), số thập phân, phân số, số âm, biểu thức có căn hay π chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”,
   “≈”, “là”, “bằng”, “được”); cặp nối: câu kia có cả hai vế. Đáp án bằng chữ (tập, khoảng, số đo góc, phần trăm…) có ở câu kia thì chỉ
   in ra khi chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM. ---------- */
const val = (s) => +String(s).replace(/\s/g, "");
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null ? [] : [].concat(q.ans), q.l || [], q.r || [], (q.rubric || []).map((c) => c.c)).map(String);
const KQ = "(?:=|≈|(?:^|[\\s(])(?:là|bằng|được))\\s+";
const SAU = "(?!\\d|,\\d|\\/|°|%|√|π|\\(|\\p{L}|[⁰¹²³⁴⁵⁶⁷⁸⁹]|\\s*[·+−:](?:\\s|\\d|\\())"; // số đứng trước chữ, π, ngoặc là hệ số, thừa số
const soKQ = (s) => [...String(s).matchAll(new RegExp(KQ + "(\\d{1,3}(?: \\d{3})*)" + SAU, "gu"))].map((m) => val(m[1]));
const kqLa = (s, a) => new RegExp(KQ + a.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + SAU, "u").test(s);
const cungLuc = (p, q) => p.topic !== q.topic || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2;
const ten = new Map();
BANKS.filter((b) => /^toan9-ck2-de\d$/.test(b.id)).forEach((b) => b.questions.forEach((q, i) => ten.set(q.q, b.id.replace("toan9-ck2-", "") + "#" + (i + 1))));
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
    else if (q.type === "num") { const a = typeof q.ans === "number" ? fmtDec(F(Math.round(q.ans * 1000), 1000)) : q.ans; them(a); if (q.unit === "%" || q.unit === "°") kq.push(a + q.unit); }
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
const { lo, chuLo } = doLo(pool.questions, (q) => ten.get(q.q));
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuLo.join("\n"));
// đã xem (Phiên N9-ck2-toan): 90° ở câu góc nội tiếp chắn nửa đường tròn, hai đường cao là góc vuông, không gợi ý số đo cung của hình
// quạt 25%; 40%, 15% ở các biểu đồ khác (Cờ vua, gõ phím) và lựa chọn sai là số liệu của biểu đồ, bảng khác; 45° là lựa chọn sai;
// “điểm C”, “x = 4” trùng chữ ngẫu nhiên (điểm C của nửa đường tròn, nghiệm x = 4 của phương trình khác)
const DA_XEM = ["own#33 lộ đáp án own#14: 90°", "own#37 lộ đáp án own#14: 90°", "own#38 lộ đáp án own#14: 90°", "own#17 lộ đáp án own#20: 40%",
  "de1#7 lộ đáp án own#20: 40%", "de2#11 lộ đáp án own#20: 40%", "own#14 lộ đáp án own#40: 45°", "own#17 lộ đáp án de1#7: 15%", "own#20 lộ đáp án de1#7: 15%",
  "de2#11 lộ đáp án de1#7: 15%", "own#33 lộ đáp án de1#20: Điểm C", "own#7 lộ đáp án de2#1: x = 4", "de1#2 lộ đáp án de2#1: x = 4"];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 45”, “là 3/2”, “≈ 27,6”, “bằng 48π”, cả hai vế một cặp nối
{ const tim = (has) => pool.questions.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const khac = tim("Bát giác đều ABCDEFGH"), thuLo = (qs) => { const r = doLo(qs, (q) => q.q.slice(0, 10)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  assert.deepEqual(thuLo([tim("Có bao nhiêu hộ dùng xe máy điện?"), gia(khac, "Ví dụ có 45.")]), []);
  assert.deepEqual(thuLo([tim("Có bao nhiêu hộ dùng xe máy điện?"), gia(khac, "Số hộ là 45.")]), [45]);
  assert.deepEqual(thuLo([tim("Không giải phương trình, tính (x₁ + 1)(x₂ + 1)."), gia(khac, "Tích bằng 3/2.")]), ["3/2"]);
  assert.deepEqual(thuLo([tim("Gộp hai lớp lại, tần số tương đối"), gia(khac, "Tỉ lệ ≈ 27,6%.")]), ["27,6%"]);
  assert.deepEqual(thuLo([tim("Gộp hai lớp lại, tần số tương đối"), gia(khac, "Tỉ lệ ≈ 27,6 phần trăm.")]), ["27,6"]);
  assert.deepEqual(thuLo([tim("Hình trụ trong hình vẽ có bán kính đáy 3 cm và chiều cao 8 cm."), gia(khac, "Diện tích bằng 48π cm².")]), ["48π"]);
  assert.deepEqual(thuLo([tim("Nối mỗi hàm số ở cột trái"), gia(khac, "Hàm số y = 3x² có đồ thị đi qua (−2; 12).")]), ["y = 3x² → (−2; 12)"]); }

/* ---------- không chép sách: so với chữ OCR của Toán 9 tập hai, tập một (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ----------
   Chuỗi 8 từ liền nhau của đề bài, lựa chọn, lời giải, thang chấm không có trong sách; biểu thức có chữ x, căn, bình phương (bỏ khoảng
   trắng) trùng chữ OCR thì in ra với DO_SACH=1 để xem tay (danh sách đã xem ghi ở SACH_XEM). */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = ["lop-9/toan-9-tap-2", "lop-9/toan-9-tap-1"].map((c) => path.join(BOOK, c, "chu.txt")).filter((f) => fs.existsSync(f));
const khongDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
// cụm từ chung của môn (tên bài, tên định lí, thuật ngữ, lời dặn làm tròn) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ
const TU_CHUNG = ["giải bài toán bằng cách lập phương trình", "phương trình bậc hai một ẩn", "đường tròn ngoại tiếp và đường tròn nội tiếp", "đường tròn ngoại tiếp tam giác",
  "đường tròn nội tiếp tam giác", "góc nội tiếp chắn nửa đường tròn", "tứ giác nội tiếp đường tròn", "theo định lí viète", "không giải phương trình",
  "làm tròn đến chữ số thập phân thứ nhất", "làm tròn đến chữ số thập phân thứ hai", "dùng máy tính cầm tay", "mỗi ý sau đúng hay sai", "trình bày lời giải",
  "đồ thị của hàm số", "nằm phía dưới trục hoành", "nằm phía trên trục hoành",
  "bảng tần số tương đối ghép nhóm", "bảng tần số ghép nhóm", "bảng tần số tương đối", "biểu đồ tần số tương đối ghép nhóm dạng cột", "biểu đồ tần số tương đối ghép nhóm dạng đoạn thẳng",
  "biểu đồ tần số dạng đoạn thẳng", "biểu đồ tần số dạng cột", "biểu đồ hình quạt tròn", "tần số tương đối", "không gian mẫu của phép thử", "kết quả thuận lợi cho biến cố",
  "gieo đồng thời hai con xúc xắc cân đối đồng chất", "có cùng kích thước và khối lượng", "làm tròn đến hàng đơn vị của", "làm tròn đến hàng phần mười",
  "diện tích xung quanh của hình trụ", "diện tích xung quanh của hình nón", "thể tích của hình trụ", "thể tích của hình nón", "diện tích mặt cầu", "thể tích hình cầu",
  "số chấm xuất hiện trên hai con xúc xắc", "số phần tử của không gian mẫu", "không gian mẫu", "theo thứ tự ngược chiều kim đồng hồ", "bảng giá trị của hàm số"].map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
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
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, kể cả kho Toán 9 giữa kì II, cuối kì I ---------- */
{
  const khac = BANKS.filter((b) => !b.pool && !/^toan9-ck2-/.test(b.id)).flatMap((b) => b.questions.map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " })))
    .concat(BANKS.filter((b) => b.pool && b.id !== POOL).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " }))));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q.q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại hoặc đọc lại hình (50 câu của 2 đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên; " + hinhDaDoc.size + " hình); kho " + pool.questions.length + " câu, ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề; trung bình " + (essays / 400).toFixed(2) + " câu tự luận mỗi lần rút.");
console.log("MATH OK");
