// Tính lại đáp án ngân hàng Toán 6 giữa kì II (data/banks/6-toan.js): hai đề cố định toan6-gk2-de1, toan6-gk2-de2 và các câu
// riêng của đề ngẫu nhiên toan6-gk2-ngau-nhien (Phiên N8). Mỗi câu: kiểm tra đề có đúng số liệu (has) rồi so đáp án với kết quả
// tính bằng code: trắc nghiệm o[0], điền khuyết ans[0], đúng/sai a, đúng/sai 4 ý a (4 ý), trả lời bằng số ans, nối cột r[i] của
// từng ô l[i], sắp xếp thứ tự o; tự luận: các số trong thang chấm và đáp án gợi ý. Phân số và số thập phân tính bằng số hữu tỉ
// chính xác (tử, mẫu nguyên), không dùng số thực; làm tròn theo quy tắc của sách (chữ số bên phải ≥ 5 thì tăng, số âm làm tròn
// số đối rồi đặt dấu); các mệnh đề "… = …", "… < …" trong câu đúng/sai 4 ý được tính lại bằng bộ đọc biểu thức. Câu có hình: đọc
// toạ độ trong hình (điểm thuộc đường thẳng, ba điểm thẳng hàng, điểm nằm giữa, hai tia đối nhau, hai đường thẳng cắt nhau, độ dài
// đoạn thẳng theo tỉ lệ hoặc theo lưới ô vuông, phần tô màu của hình chia phần) rồi mới tính. Cuối cùng kiểm tra mức độ và ma trận:
// mọi câu có lv, mỗi ô (chủ đề, mức) có ít nhất gấp đôi số câu ô đó rút và ngoài mỗi đề cố định vẫn đủ số câu ô đó rút, rút thử
// nhiều lần ra đúng 10 Biết, 8 Hiểu, 7 Vận dụng, nhiều nhất 2 câu tự luận.
// Chạy: node tests/toan6-gk2.js → in MATH OK.
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan6-gk2-ngau-nhien";

/* ---------- số hữu tỉ chính xác: { n, d } với d > 0, tối giản ---------- */
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const F = (n, d) => { d = d === undefined ? 1 : d; assert.ok(Number.isInteger(n) && Number.isInteger(d) && d !== 0, `phân số lạ ${n}/${d}`); if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return { n: n / g, d: d / g }; };
const add = (a, b) => F(a.n * b.d + b.n * a.d, a.d * b.d);
const neg = (a) => F(-a.n, a.d);
const sub = (a, b) => add(a, neg(b));
const mul = (a, b) => F(a.n * b.n, a.d * b.d);
const inv = (a) => F(a.d, a.n);
const div = (a, b) => mul(a, inv(b));
const cmp = (a, b) => a.n * b.d - b.n * a.d;
const eq = (a, b) => cmp(a, b) === 0;
const abs = (a) => F(Math.abs(a.n), a.d);
const sum = (xs) => xs.reduce((s, x) => add(s, x), F(0));
const toNum = (a) => a.n / a.d;
const isInt = (a) => a.d === 1;
// đọc một số viết như trong đề: "−3/7", "6/−10", "2 3/5" (hỗn số), "3", "1 800", "2,35", "−0,27"
const fr = (s) => {
  s = String(s).trim().replace(/[−–]/g, "-").replace(/\s+/g, " ");
  let m = /^(-?)(\d+) (\d+)\/(\d+)$/.exec(s);
  if (m) { const v = F(+m[2] * +m[4] + +m[3], +m[4]); return m[1] ? neg(v) : v; }
  m = /^(-?\d+)\/(-?\d+)$/.exec(s);
  if (m) return F(+m[1], +m[2]);
  m = /^(-?)(\d{1,3}(?: \d{3})+|\d+)(?:,(\d+))?$/.exec(s);
  if (m) { const ip = m[2].replace(/ /g, ""), fp = m[3] || ""; const v = F(+(ip + fp), 10 ** fp.length); return m[1] ? neg(v) : v; }
  throw new Error("không đọc được số: " + s);
};
const thou = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const fmtInt = (a) => { assert.ok(isInt(a), "không phải số nguyên: " + a.n + "/" + a.d); return (a.n < 0 ? "−" : "") + thou(String(Math.abs(a.n))); };
// phân số viết như trong đề, dấu "−" Unicode ("−3/2"); fmtAns: dạng ans của câu trả lời bằng số ("-3/2", dấu trừ ASCII)
const fmtF = (a) => (isInt(a) ? fmtInt(a) : (a.n < 0 ? "−" : "") + Math.abs(a.n) + "/" + a.d);
const fmtAns = (a) => (isInt(a) ? String(a.n) : a.n + "/" + a.d);
const mixed = (a) => { assert.ok(a.n > 0 && !isInt(a) && a.n > a.d, "cần phân số dương lớn hơn 1"); const q = Math.floor(a.n / a.d); return `${q} ${a.n - q * a.d}/${a.d}`; };
// số thập phân viết kiểu Việt Nam ("−2,35", "2 695,5", "108 000"); k: số chữ số sau dấu phẩy (không ghi thì vừa đủ)
const fmtDec = (a, k) => {
  let e = 0; let d = a.d; while (d % 2 === 0) { d /= 2; e++; } let e5 = 0; while (d % 5 === 0) { d /= 5; e5++; }
  assert.equal(d, 1, "không viết được thành số thập phân hữu hạn: " + a.n + "/" + a.d);
  const places = k === undefined ? Math.max(e, e5) : k;
  assert.ok(places >= Math.max(e, e5), "cần nhiều chữ số thập phân hơn: " + a.n + "/" + a.d);
  const scaled = Math.abs(a.n) * (10 ** places / a.d);
  assert.ok(Number.isInteger(scaled));
  const s = String(scaled).padStart(places + 1, "0");
  const ip = thou(s.slice(0, s.length - places)), fp = s.slice(s.length - places);
  return (a.n < 0 ? "−" : "") + ip + (places ? "," + fp : "");
};
// làm tròn đến hàng 10^(−k) (k = 1: phần mười; k = −2: hàng trăm) theo quy tắc của sách: chữ số bên phải ≥ 5 thì tăng; số âm thì làm tròn số đối rồi đặt dấu "−"
const roundTo = (a, k) => {
  const p = k >= 0 ? F(10 ** k) : F(1, 10 ** -k);
  const t = mul(abs(a), p), r = Math.floor(toNum(add(t, F(1, 2))));
  assert.ok(t.d <= 1e9);
  const v = div(F(r), p);
  return a.n < 0 ? neg(v) : v;
};
const pct = (a, b) => fmtDec(mul(div(a, b), F(100))) + "%";
const C2 = (n) => (n * (n - 1)) / 2;
/* bộ đọc biểu thức viết như trong đề: số (phân số a/b, số thập phân, số ngăn hàng nghìn), + − · : và ngoặc, chữ cái thay bằng số (vars);
   "/" là phân số, ưu tiên cao nhất ("−8/−20" là (−8)/(−20)); tính bằng số hữu tỉ chính xác */
function ev(src, vars) {
  const s = String(src).replace(/[−–]/g, "-");
  const toks = []; let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === " ") { i++; continue; }
    let m = /^\d{1,3}(?: \d{3})+(?:,\d+)?(?![\d])/.exec(s.slice(i)) || /^\d+(?:,\d+)?/.exec(s.slice(i));
    if (m) { toks.push({ t: "n", v: fr(m[0]) }); i += m[0].length; continue; }
    if ("+-·:/()".includes(c)) { toks.push({ t: c }); i++; continue; }
    if (/[a-z]/.test(c)) { assert.ok(vars && vars[c] !== undefined, "biến lạ " + c + " trong " + src); toks.push({ t: "n", v: vars[c] }); i++; continue; }
    throw new Error("kí tự lạ “" + c + "” trong " + src);
  }
  let p = 0;
  const peek = () => toks[p], next = () => toks[p++];
  const atom = () => { const t = next(); assert.ok(t, "thiếu số trong " + src); if (t.t === "n") return t.v; if (t.t === "(") { const v = expr(); assert.equal(next().t, ")", "thiếu ngoặc đóng trong " + src); return v; } if (t.t === "-") return neg(atom()); throw new Error("không hiểu " + src); };
  const frac = () => { let v = atom(); while (peek() && peek().t === "/") { next(); v = div(v, atom()); } return v; };
  const term = () => { let v = frac(); while (peek() && (peek().t === "·" || peek().t === ":")) { const op = next().t, w = frac(); v = op === "·" ? mul(v, w) : div(v, w); } return v; };
  const expr = () => { let v = term(); while (peek() && (peek().t === "+" || peek().t === "-")) { const op = next().t, w = term(); v = op === "+" ? add(v, w) : sub(v, w); } return v; };
  const v = expr();
  assert.equal(p, toks.length, "thừa kí tự trong " + src);
  return v;
}
// mệnh đề "A = B", "A < B", "A > B" đúng hay sai
const stmt = (s, vars) => {
  const m = /^(.+?) (=|<|>) (.+)$/.exec(s); assert.ok(m, "mệnh đề lạ: " + s);
  const c = cmp(ev(m[1], vars), ev(m[3], vars));
  return m[2] === "=" ? c === 0 : m[2] === "<" ? c < 0 : c > 0;
};
const list = (q, re) => { const m = re.exec(q.q); assert.ok(m, "không thấy danh sách số trong: " + q.q); return m[1].split(";").map((x) => x.trim()); };

/* ---------- hình ---------- */
const nums = (s) => s.trim().split(/[\s,]+/).map(Number);
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const lines = (svg) => [...svg.matchAll(/<line [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { a: [+a.x1, +a.y1], b: [+a.x2, +a.y2], stroke: a.stroke || "", w: +(a["stroke-width"] || 1) }; });
const polys = (svg) => [...svg.matchAll(/<polygon [^>]*>/g)].map((m) => nums(attrs(m[0]).points));
const dots = (svg) => [...svg.matchAll(/<circle [^>]*>/g)].map((m) => { const a = attrs(m[0]); return [+a.cx, +a.cy]; });
const rects = (svg) => [...svg.matchAll(/<rect [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { x: +a.x, y: +a.y, w: +a.width, h: +a.height, fill: a.fill || "none" }; });
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { at: [+a.x, +a.y], t: m[2] }; });
const subv = (p, q) => [p[0] - q[0], p[1] - q[1]];
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const dot = (u, v) => u[0] * v[0] + u[1] * v[1];
const cross = (u, v) => u[0] * v[1] - u[1] * v[0];
const close = (x, y, e) => Math.abs(x - y) <= (e || 1e-6) * Math.max(1, Math.abs(x), Math.abs(y));
const nhan = (svg, name) => { const t = texts(svg).filter((x) => x.t === name); assert.equal(t.length, 1, "hình cần đúng một nhãn " + name); return t[0].at; };
const dinh = (pts, svg, name) => { const at = nhan(svg, name); const p = pts.slice().sort((p, q) => dist(p, at) - dist(q, at))[0]; assert.ok(dist(p, at) < 40, "nhãn " + name + " phải đặt cạnh điểm"); return p; };
const diem = (svg, names) => { const ps = dots(svg), o = {}; names.forEach((n) => (o[n] = dinh(ps, svg, n))); assert.equal(new Set(Object.values(o).map(String)).size, names.length, "mỗi nhãn một điểm"); return o; };
const thangHang = (p, q, r) => Math.abs(cross(subv(q, p), subv(r, p))) <= 1e-6 * dist(p, q) * dist(p, r);
const thuoc = (p, L) => Math.abs(cross(subv(L.b, L.a), subv(p, L.a))) <= 1e-6 * dist(L.a, L.b) * Math.max(1, dist(p, L.a)); // p thuộc đường thẳng L
const namGiua = (m, a, b) => thangHang(a, m, b) && dot(subv(a, m), subv(b, m)) < 0; // m nằm giữa a và b
const doiNhau = (o, a, b) => namGiua(o, a, b); // hai tia Oa, Ob đối nhau khi O nằm giữa a và b
const duongThang = (svg) => { const L = lines(svg).filter((l) => l.stroke !== "line" && l.w === 2); assert.equal(L.length, 1, "hình cần đúng một đường thẳng, tia hoặc đoạn thẳng"); return L[0]; };
const tia = (svg) => { // tia vẽ bằng một đoạn và đầu mũi tên (polygon); trả về gốc và hướng
  const L = duongThang(svg), mt = polys(svg); assert.equal(mt.length, 1, "tia cần một đầu mũi tên");
  const tip = [mt[0][0], mt[0][1]], goc = dist(L.a, tip) > dist(L.b, tip) ? L.a : L.b;
  assert.ok(thuoc(tip, L) && dist(tip, goc === L.a ? L.b : L.a) < 12, "đầu mũi tên ở cuối tia");
  return { goc, huong: subv(tip, goc), L };
};
const trenTia = (p, t) => thuoc(p, t.L) && dot(subv(p, t.goc), t.huong) > 0;
const tiLe = (xs) => { // các độ dài tỉ lệ với nhau: trả về đơn vị (pixel của 1 cm) nếu xs[i].px / xs[i].cm bằng nhau
  const u = xs[0].px / xs[0].cm; xs.forEach((x) => assert.ok(close(x.px / x.cm, u, 1e-6), "độ dài trong hình phải đúng tỉ lệ")); return u;
};
const oLuoi = (svg) => {
  const xs = [...new Set(lines(svg).filter((l) => l.stroke === "line" && l.a[0] === l.b[0]).map((l) => l.a[0]))].sort((a, b) => a - b);
  const d = new Set(xs.slice(1).map((x, i) => x - xs[i])); assert.equal(d.size, 1, "lưới ô vuông đều"); return [...d][0];
};
// hình chia phần tô màu: các rect của hình a (bên trái) và hình b (bên phải) → { a: {n, k}, b: {n, k} } (n phần, k phần tô màu)
const toMau = (svg) => {
  const R = rects(svg), mid = 160, out = {};
  [["a", (r) => r.x + r.w <= mid], ["b", (r) => r.x >= mid]].forEach(([name, f]) => {
    const rs = R.filter(f); assert.ok(rs.length >= 2, "hình " + name + " cần các phần");
    const w = rs[0].w, h = rs[0].h; rs.forEach((r) => assert.ok(r.w === w && r.h === h, "các phần của hình " + name + " bằng nhau"));
    const x0 = Math.min(...rs.map((r) => r.x)), y0 = Math.min(...rs.map((r) => r.y)), x1 = Math.max(...rs.map((r) => r.x + r.w)), y1 = Math.max(...rs.map((r) => r.y + r.h));
    assert.equal(rs.length * w * h, (x1 - x0) * (y1 - y0), "các phần của hình " + name + " phải ghép kín một hình chữ nhật");
    out[name] = { n: rs.length, k: rs.filter((r) => r.fill === "acc-soft").length, w: x1 - x0, h: y1 - y0 };
    rs.forEach((r) => assert.ok(["acc-soft", "none"].includes(r.fill), "phần tô màu dùng acc-soft"));
  });
  assert.ok(out.a.w === out.b.w && Math.abs(out.a.h - out.b.h) <= 1, "hai hình chữ nhật bằng nhau");
  return out;
};

/* ---------- kiểm tra từng câu ----------
   right(q): đáp án tính bằng code (so với o[0], ans[0], a, ans, r của từng ô trái, o); more(q): kiểm tra thêm (nhiễu, bước giải, hình). */
const laPhanSo = (s) => { const m = /^(−?\d+)\/(−?\d+)$/.exec(s); return !!m && fr(m[2]).n !== 0; };
const de1 = [
  { has: "Cách viết nào dưới đây cho ta một phân số", right: (q) => { const m = q.o.filter(laPhanSo); assert.equal(m.length, 1); return m[0]; } },
  { has: "Rút gọn phân số 42/56", right: () => fmtAns(fr("42/56")), more: () => assert.equal(gcd(42, 56), 14) },
  { has: "Hỗn số 2 3/5", right: () => fmtF(fr("2 3/5")) },
  { has: "3/4; −5/6; 7/12; −1/3 theo thứ tự tăng dần", right: (q) => list(q, /các phân số (.+?) theo/).sort((a, b) => cmp(fr(a), fr(b))).join("; "), more: (q) => assert.ok(["9/12", "−10/12", "−4/12"].every((s) => q.x.includes(s))) },
  { has: "−3/7 + 5/7", right: () => fmtF(ev("−3/7 + 5/7")), more: (q) => q.o.slice(1).forEach((o) => assert.ok(!eq(fr(o), ev("−3/7 + 5/7")), "nhiễu " + o)) },
  { has: "5/6 − 3/4", right: () => fmtF(ev("5/6 − 3/4")), more: (q) => q.o.slice(1).forEach((o) => assert.ok(!eq(fr(o), ev("5/6 − 3/4")), "nhiễu " + o)) },
  { has: "Giờ thứ nhất vòi chảy được 1/4 bể, giờ thứ hai chảy được 3/8 bể", right: () => fmtF(ev("1 − (1/4 + 3/8)")) + " bể", more: (q) => assert.equal(q.o[1], fmtF(ev("1/4 + 3/8")) + " bể", "nhiễu là phần đã có nước") },
  { has: "Phân số nghịch đảo của −5/8", right: (q) => { const m = q.o.filter((o) => eq(mul(fr(o), fr("−5/8")), F(1))); assert.equal(m.length, 1); return m[0]; } },
  { has: "chiều dài 4/5 m, chiều rộng bằng 3/4 chiều dài", right: () => fmtAns(ev("4/5 · (4/5 · 3/4)")), more: (q) => { assert.ok(q.x.includes("= 3/5 (m)")); assert.equal(q.unit, "m²"); } },
  { has: "đội văn nghệ có 40 bạn, trong đó 3/8", right: () => fmtInt(ev("40 · 3/8")) + " bạn", more: (q) => assert.equal(q.o[1], fmtInt(ev("40 · 5/8")) + " bạn", "nhiễu: phần không biết chơi đàn") },
  { has: "đã bán 2/5 số gạo trong kho thì trong kho còn lại 180 kg", right: () => fmtInt(ev("180 : (1 − 2/5)")) + " kg",
    more: (q) => assert.deepEqual(q.o.slice(1), [ev("180 : 2/5"), ev("180 · 2/5"), ev("180 · 3/5")].map((v) => fmtInt(v) + " kg"), "nhiễu: chia nhầm cho 2/5, nhân với 2/5, nhân với 3/5") },
  { has: "−27/100 viết dưới dạng số thập phân", right: () => fmtDec(fr("−27/100")) },
  { has: "−3,25; 3,2; −3,5; 0,8 theo thứ tự giảm dần", right: (q) => list(q, /các số (.+?) theo/).sort((a, b) => cmp(fr(b), fr(a))).join("; ") },
  { has: "(−3,6) + 1,25", right: () => toNum(ev("(−3,6) + 1,25")) },
  { has: "2,5 kg táo giá 45 000 đồng", right: () => toNum(ev("300 000 − (2,5 · 45 000 + 1,2 · 120 000)")),
    more: (q) => ["= 112 500", "= 144 000", "= 256 500", "= 43 500"].forEach((s) => assert.ok(q.x.includes(s), "lời giải thiếu " + s)) },
  { has: "Làm tròn số 12,3471 đến hàng phần trăm", right: () => fmtDec(roundTo(fr("12,3471"), 2), 2), more: (q) => q.o.slice(1).forEach((o) => assert.notEqual(o, "12,35")) },
  { has: "49,7 · 19,8", right: () => fmtAns(mul(roundTo(fr("49,7"), -1), roundTo(fr("19,8"), -1))), more: (q) => assert.ok(q.x.includes("50 · 20 = 1 000")) },
  { has: "Tỉ số phần trăm của 12 và 40", right: () => pct(F(12), F(40)) },
  { has: "Giá vé xem phim ngày thường là 90 000 đồng", right: () => toNum(ev("90 000 · (100 + 20)/100")), more: (q) => assert.ok(q.x.includes("= 18 000") && q.x.includes("= 108 000")) },
  { has: "Quan sát hình vẽ. Mỗi ý sau đúng hay sai?", right: (q) => { // điểm thuộc đường thẳng, ba điểm thẳng hàng
    assert.deepEqual(q.o, ["A ∈ d", "C ∈ d", "Ba điểm A, B, D thẳng hàng", "Ba điểm A, B, C thẳng hàng"]);
    const L = duongThang(q.svg), p = diem(q.svg, ["A", "B", "C", "D"]);
    assert.ok(thuoc(p.B, L) && thuoc(p.D, L), "B, D nằm trên d"); assert.ok(dist(nhan(q.svg, "d"), L.b) < 20, "nhãn d ở đầu đường thẳng");
    return [thuoc(p.A, L), thuoc(p.C, L), thangHang(p.A, p.B, p.D), thangHang(p.A, p.B, p.C)];
  } },
  { has: "ba điểm M, O, N cùng nằm trên một đường thẳng. Hai tia nào", right: (q) => {
    const L = duongThang(q.svg), p = diem(q.svg, ["M", "O", "N"]); Object.values(p).forEach((x) => assert.ok(thuoc(x, L)));
    // hai tia đối nhau: cùng gốc và gốc nằm giữa hai điểm còn lại (nhiễu “Tia OM và tia MN” khác gốc nên không đối nhau)
    const doi = (s) => { const m = /^Tia (\w)(\w) và tia (\w)(\w)$/.exec(s); assert.ok(m, "tia lạ: " + s); return m[1] === m[3] && doiNhau(p[m[1]], p[m[2]], p[m[4]]); };
    const m = q.o.filter(doi); assert.equal(m.length, 1); return m[0];
  } },
  { has: "Cho 5 điểm phân biệt, trong đó không có ba điểm nào thẳng hàng", right: () => String(C2(5)), more: (q) => assert.ok(q.x.includes("5 · 4 : 2 = 10")) },
  { has: "AM = 3 cm, MB = 5 cm", right: () => String(3 + 5), more: (q) => {
    const p = diem(q.svg, ["A", "M", "B"]); assert.ok(namGiua(p.M, p.A, p.B), "M nằm giữa A và B");
    tiLe([{ px: dist(p.A, p.M), cm: 3 }, { px: dist(p.M, p.B), cm: 5 }]);
    assert.ok(dist(nhan(q.svg, "3 cm"), [(p.A[0] + p.M[0]) / 2, p.A[1]]) < 24 && dist(nhan(q.svg, "5 cm"), [(p.M[0] + p.B[0]) / 2, p.M[1]]) < 24, "nhãn độ dài đặt trên đúng đoạn");
  } },
  { has: "OA = 3 cm, OB = 6 cm (hình vẽ)", right: (q) => {
    assert.deepEqual(q.o, ["Điểm A nằm giữa hai điểm O và B", "AB = 3 cm", "A là trung điểm của đoạn thẳng OB", "Điểm O nằm giữa hai điểm A và B"]);
    const t = tia(q.svg), p = diem(q.svg, ["O", "A", "B"]); assert.ok(dist(p.O, t.goc) < 1e-9 && trenTia(p.A, t) && trenTia(p.B, t), "A, B trên tia Ox");
    const u = tiLe([{ px: dist(p.O, p.A), cm: 3 }, { px: dist(p.O, p.B), cm: 6 }]), AB = dist(p.A, p.B) / u;
    return [namGiua(p.A, p.O, p.B), close(AB, 3), namGiua(p.A, p.O, p.B) && close(dist(p.O, p.A), dist(p.A, p.B)), namGiua(p.O, p.A, p.B)];
  } },
  { has: "AB = 16 cm. Gọi M là trung điểm", right: () => 16 - 16 / 2 / 2, more: (q) => assert.ok(q.x.includes("MB = AB : 2 = 8") && q.x.includes("NB = MB : 2 = 4") && q.x.includes("16 − 4 = 12")) }
];
const de2 = [
  { has: "−3/5 và 6/−10 bằng nhau", right: () => eq(fr("−3/5"), fr("6/−10")), more: () => assert.equal(-3 * -10, 5 * 6) },
  { has: "−8/12 = x/−3", right: () => { const x = div(mul(fr("−8/12"), F(-3)), F(1)); assert.ok(isInt(x)); return "x = " + fmtInt(x); }, more: (q) => assert.ok(q.x.includes("(−8) · (−3) = 24") && q.x.includes("12 · 2 = 24")) },
  { has: "17/4 dưới dạng hỗn số", right: () => mixed(fr("17/4")) },
  { has: "So sánh phân số. Mỗi ý sau đúng hay sai?", right: (q) => { assert.deepEqual(q.o, ["−3/7 < −2/7", "5/8 > 7/12", "−4/9 > −1/2", "11/6 > 2"]); return q.o.map((s) => stmt(s)); } },
  { has: "Số đối của phân số −4/9", right: () => fmtF(neg(fr("−4/9"))) },
  { has: "2/3 + 1/4 − 5/12", right: () => fmtAns(ev("2/3 + 1/4 − 5/12")) },
  { has: "An góp 1/3 số tiền, Bình góp 2/5", right: () => fmtAns(ev("1 − (1/3 + 2/5)")), more: (q) => assert.ok(q.x.includes("= 11/15")) },
  { has: "−2/3 · 9/4", right: () => fmtAns(ev("−2/3 · 9/4")), more: (q) => assert.ok(q.x.includes("−18/12")) },
  { has: "15/2 m được cắt thành các mảnh, mỗi mảnh dài 3/4 m", right: () => toNum(ev("15/2 : 3/4")) },
  { has: "360 lít nước. Người ta đã dùng hết 5/8", right: () => fmtAns(ev("360 · 5/8")) },
  { has: "Ngày thứ nhất đọc được 1/4 cuốn sách, ngày thứ hai đọc được 2/5", right: () => toNum(ev("42 : (1 − 1/4 − 2/5)")), more: (q) => assert.ok(q.x.includes("= 7/20") && q.x.includes("42 · 20/7 = 120")) },
  { has: "Số đối của số thập phân −4,75", right: () => fmtDec(neg(fr("−4,75"))) },
  { has: "So sánh số thập phân. Mỗi ý sau đúng hay sai?", right: (q) => { assert.deepEqual(q.o, ["−0,5 < −0,45", "2,09 > 2,1", "−1,3 = −13/10", "0,125 = 1/8"]); return q.o.map((s) => stmt(s)); } },
  { has: "(−2,4) · 1,5", right: () => fmtDec(ev("(−2,4) · 1,5")), more: (q) => q.o.slice(1).forEach((o) => assert.ok(!eq(fr(o), ev("(−2,4) · 1,5")))) },
  { has: "42,5 km/h trong 1,2 giờ", right: () => toNum(ev("42,5 · 1,2 + 18,8")), more: (q) => assert.ok(q.x.includes("= 51 (km)")) },
  { has: "Làm tròn số 3 847 đến hàng trăm", right: () => fmtAns(roundTo(fr("3 847"), -2)) },
  { has: "Cho số 2 695,4728", right: (q) => { // mỗi ý: "Làm tròn đến hàng … được <số>"
    const HANG = { "phần mười": 1, "đơn vị": 0, "chục": -1, "phần trăm": 2 }, v = fr("2 695,4728");
    return q.o.map((s) => { const m = /^Làm tròn đến hàng (.+?) được (.+)$/.exec(s); assert.ok(m && HANG[m[1]] !== undefined, "ý lạ: " + s); const k = HANG[m[1]]; return fmtDec(roundTo(v, k), Math.max(k, 0)) === m[2]; });
  }, more: (q) => assert.ok(q.x.includes("được 2 695,47")) },
  { has: "45 học sinh, trong đó có 18 học sinh nữ", right: () => toNum(mul(div(F(18), F(45)), F(100))), more: (q) => assert.equal(q.unit, "%") },
  { has: "40 000 000 đồng với lãi suất 5%", right: () => fmtInt(ev("40 000 000 · (100 + 5)/100")) + " đồng", more: (q) => assert.equal(q.o[1], fmtInt(ev("40 000 000 · 5/100")) + " đồng", "nhiễu: chỉ tiền lãi") },
  { has: "đánh dấu hai điểm phân biệt M và N", right: () => "Chỉ một đường thẳng" },
  { has: "Khẳng định nào dưới đây đúng?", right: (q) => { // hai đường thẳng cắt nhau tại I
    assert.equal(q.o[0], "Hai đường thẳng a và b cắt nhau tại điểm I");
    const L = lines(q.svg).filter((l) => l.w === 2); assert.equal(L.length, 2, "hai đường thẳng");
    const I = diem(q.svg, ["I"]).I, [u, v] = L;
    assert.ok(Math.abs(cross(subv(u.b, u.a), subv(v.b, v.a))) > 1e-6, "a và b không song song");
    assert.ok(thuoc(I, u) && thuoc(I, v), "I nằm trên cả hai đường thẳng");
    [["a", u], ["b", v]].forEach(([n, l]) => assert.ok(Math.min(dist(nhan(q.svg, n), l.a), dist(nhan(q.svg, n), l.b)) < 12, "nhãn " + n + " ở đầu đường thẳng"));
    return q.o[0];
  } },
  { has: "Cho 4 đường thẳng đôi một cắt nhau", right: () => String(C2(4)), more: (q) => assert.ok(q.x.includes("4 · 3 : 2 = 6")) },
  { has: "trung điểm của đoạn thẳng AB và AB = 14 cm", right: () => String(14 / 2) },
  { has: "AB = 4 cm, AC = 9 cm (hình vẽ)", right: () => 9 - 4, more: (q) => {
    const t = tia(q.svg), p = diem(q.svg, ["A", "B", "C"]); assert.ok(dist(p.A, t.goc) < 1e-9 && trenTia(p.B, t) && trenTia(p.C, t));
    tiLe([{ px: dist(p.A, p.B), cm: 4 }, { px: dist(p.A, p.C), cm: 9 }]); assert.ok(namGiua(p.B, p.A, p.C));
  } },
  { has: "MN = 8 cm. Trên tia MN lấy điểm P sao cho MP = 4 cm", right: () => { const PN = 8 - 4, NQ = PN; return 8 + NQ + " cm"; }, more: (q) => assert.ok(q.x.includes("PN = MN − MP = 4") && q.x.includes("8 + 4 = 12")) }
];
// câu riêng của đề ngẫu nhiên
const own = [
  { has: "2/5; −6/15; 4/10; −8/−20", right: (q) => { assert.deepEqual(q.o, ["2/5 = 4/10", "−6/15 = −2/5", "−8/−20 = 2/5", "2/5 = −6/15"]); return q.o.map((s) => stmt(s)); } },
  { has: "Phân số nào dưới đây là phân số tối giản", right: (q) => { const m = q.o.filter((o) => { const f = fr(o); return gcd(+o.split("/")[0], +o.split("/")[1]) === 1 && f.d > 1; }); assert.equal(m.length, 1); return m[0]; } },
  { has: "3/8 = ___/40", right: () => { const v = mul(fr("3/8"), F(40)); assert.ok(isInt(v)); return String(v.n); } },
  { has: "Nối mỗi phân số ở cột trái với phân số bằng nó", right: (q) => q.l.map((l) => { const m = q.r.filter((r) => eq(fr(r), fr(l))); assert.equal(m.length, 1, l); return m[0]; }),
    more: (q) => q.r.slice(q.l.length).forEach((r) => assert.ok(!q.l.some((l) => eq(fr(l), fr(r))), "ô thừa " + r + " không bằng phân số nào")) },
  { has: "x/15 = −4/5", right: () => { const x = mul(fr("−4/5"), F(15)); assert.ok(isInt(x)); return x.n; } },
  { has: "So sánh phần tô màu của hai hình", right: (q) => {
    const t = toMau(q.svg); assert.deepEqual([t.a.n, t.a.k, t.b.n, t.b.k], [6, 4, 9, 6], "hình a 4/6, hình b 6/9 (lời giải)");
    const a = F(t.a.k, t.a.n), b = F(t.b.k, t.b.n), c = cmp(a, b);
    assert.ok(q.o[3].includes("một nửa") && !eq(a, F(1, 2)), "nhiễu: một nửa");
    return c === 0 ? q.o[0] : c > 0 ? q.o[1] : q.o[2];
  } },
  { has: "Quy đồng mẫu hai phân số 5/6 và −7/8 với mẫu chung 24", right: () => ["5/6", "−7/8"].map((s) => { const v = mul(fr(s), F(24)); assert.ok(isInt(v)); return fmtInt(v) + "/24"; }).join(" và ") },
  { has: "Hỗn số 3 2/7 bằng phân số 23/7", right: () => eq(fr("3 2/7"), fr("23/7")) },
  { has: "Sắp xếp các số sau theo thứ tự từ bé đến lớn", right: (q) => q.o.slice().sort((a, b) => cmp(fr(a), fr(b))), more: (q) => assert.equal(new Set(q.o.map((o) => toNum(fr(o)))).size, q.o.length) },
  { has: "−5/12 < x/12 < −3/12", right: () => { const m = []; for (let x = -20; x <= 20; x++) if (cmp(fr("−5/12"), F(x, 12)) < 0 && cmp(F(x, 12), fr("−3/12")) < 0) m.push(x); assert.equal(m.length, 1); return m[0]; } },
  { has: "Quan sát hai hình chữ nhật bằng nhau", right: (q) => {
    const t = toMau(q.svg); assert.deepEqual([t.a.n, t.a.k, t.b.n, t.b.k], [8, 5, 4, 3], "hình a 5/8, hình b 3/4 (lời giải)");
    const a = F(t.a.k, t.a.n), b = F(t.b.k, t.b.n), c = cmp(a, b);
    assert.ok(q.o[3].includes("nhỏ hơn một nửa") && cmp(a, F(1, 2)) > 0, "nhiễu: nhỏ hơn một nửa phải sai");
    return c < 0 ? q.o[0] : c > 0 ? q.o[1] : q.o[2];
  } },
  { has: "Mỗi phép tính với phân số sau đúng hay sai?", right: (q) => { assert.deepEqual(q.o, ["1/5 + 2/5 = 3/5", "−4/9 + 4/9 = 0", "3/7 − 5/7 = 2/7", "1/4 + 1/3 = 2/7"]); return q.o.map((s) => stmt(s)); }, more: (q) => assert.ok(q.x.includes("= −2/7") && q.x.includes("= 7/12")) },
  { has: "7/10 − 3/10", right: () => fmtF(ev("7/10 − 3/10")), more: (q) => q.o.slice(1).forEach((o) => assert.ok(!eq(fr(o), ev("7/10 − 3/10")))) },
  { has: "x − 2/5 = −1/10", right: () => fmtAns(ev("−1/10 + 2/5")) },
  { has: "Nối mỗi phép tính với phân số ở cột trái", right: (q) => q.l.map((e) => { const m = q.r.filter((r) => eq(fr(r), ev(e))); assert.equal(m.length, 1, e); return m[0]; }),
    more: (q) => q.r.slice(q.l.length).forEach((r) => assert.ok(!q.l.some((e) => eq(ev(e), fr(r))))) },
  { has: "3/8 + (−5/7) + 5/8 + (−2/7) + 2/9", right: () => fmtAns(ev("3/8 + (−5/7) + 5/8 + (−2/7) + 2/9")), more: () => { assert.ok(eq(ev("3/8 + 5/8"), F(1)) && eq(ev("−5/7 + (−2/7)"), F(-1))); } },
  { has: "trồng rau trên 3/8 mảnh vườn, trồng hoa trên 1/6", right: () => fmtAns(ev("1 − (3/8 + 1/6)")), more: (q) => assert.ok(q.x.includes("= 13/24")) },
  { has: "a = 3/4 và b = −2/5", right: (q) => { const vars = { a: fr("3/4"), b: fr("−2/5") }; assert.deepEqual(q.o.slice(0, 2).concat(q.o[3]), ["a · b = −3/10", "a : b = −15/8", "b · b = −4/25"]);
    assert.equal(q.o[2], "Phân số nghịch đảo của b là −5/2"); return [stmt(q.o[0], vars), stmt(q.o[1], vars), eq(mul(vars.b, fr("−5/2")), F(1)), stmt(q.o[3], vars)]; } },
  { has: "5/6 : 10/3", right: () => fmtF(ev("5/6 : 10/3")), more: (q) => q.o.slice(1).forEach((o) => assert.ok(!eq(fr(o), ev("5/6 : 10/3")))) },
  { has: "2/3 · x − 1/6 = 1/2", right: () => { const x = div(ev("1/2 + 1/6"), fr("2/3")); assert.ok(isInt(x)); return x.n; } },
  { has: "mỗi giờ đi được 9/2 km", right: () => fmtAns(ev("15/4 : 9/2")), more: (q) => assert.ok(q.x.includes("30/36")) },
  { has: "36 học sinh, trong đó 4/9 số học sinh là nữ", right: (q) => {
    const nu = ev("36 · 4/9"), nam = sub(F(36), nu);
    assert.deepEqual(q.o, ["Lớp có 16 học sinh nữ", "Lớp có 20 học sinh nam", "Số học sinh nam chiếm 5/9 số học sinh cả lớp", "Số học sinh nữ bằng 5/4 số học sinh nam"]);
    return [eq(nu, F(16)), eq(nam, F(20)), eq(div(nam, F(36)), fr("5/9")), eq(div(nu, nam), fr("5/4"))];
  }, more: (q) => assert.ok(q.x.includes("16/20 = 4/5")) },
  { has: "2/3 của số đó bằng 18", right: () => fmtAns(ev("18 : 2/3")) },
  { has: "Nối mỗi yêu cầu ở cột trái", right: (q) => q.l.map((l) => {
    let m = /^(\d+\/\d+) của (\d+)$/.exec(l); if (m) return fmtAns(mul(fr(m[1]), F(+m[2])));
    m = /^Số có (\d+\/\d+) bằng (\d+)$/.exec(l); assert.ok(m, l); return fmtAns(div(F(+m[2]), fr(m[1])));
  }), more: (q) => assert.ok(!["12", "18", "75", "32"].includes(q.r[4])) },
  { has: "đã bán được 3/7 số trứng mang đi thì còn lại 28 quả", right: () => toNum(ev("28 : (1 − 3/7)")), more: (q) => assert.ok(q.x.includes("28 · 7/4 = 49")) },
  { has: "chiều dài 30 m, chiều rộng bằng 3/5 chiều dài. Người ta dành 2/9", essay: (q) => {
    const rong = ev("30 · 3/5"), S = mul(F(30), rong), ao = mul(S, fr("2/9")), cay = sub(S, ao), rb = q.rubric.map((c) => c.c).join(" | ");
    [`30 · 3/5 = ${fmtInt(rong)} (m)`, `30 · ${fmtInt(rong)} = ${fmtInt(S)} (m²)`, `${fmtInt(S)} · 2/9 = ${fmtInt(ao)} (m²)`, `${fmtInt(S)} − ${fmtInt(ao)} = ${fmtInt(cay)} (m²)`].forEach((s) => { assert.ok(rb.includes(s), "thang chấm thiếu " + s); assert.ok(q.x.includes(s), "gợi ý thiếu " + s); });
    assert.ok(q.x.includes(`Đáp số: ${fmtInt(cay)} m²`));
  } },
  { has: "Tổ 1 trồng được 1/3 tổng số cây, tổ 2 trồng được 2/7 tổng số cây, tổ 3 trồng được 32 cây", essay: (q) => {
    const p3 = ev("1 − 1/3 − 2/7"), tong = div(F(32), p3), to1 = mul(tong, fr("1/3")), rb = q.rubric.map((c) => c.c).join(" | ");
    [`1 − 1/3 − 2/7 = ${fmtF(p3)}`, `32 : ${fmtF(p3)} = ${fmtInt(tong)} (cây)`, `${fmtInt(tong)} · 1/3 = ${fmtInt(to1)} (cây)`].forEach((s) => assert.ok(rb.includes(s), "thang chấm thiếu " + s));
    [`1 − 1/3 − 2/7 = 21/21 − 7/21 − 6/21 = ${fmtF(p3)}`, `32 · 21/8 = ${fmtInt(tong)} (cây)`, `${fmtInt(tong)} · 1/3 = ${fmtInt(to1)} (cây)`].forEach((s) => assert.ok(q.x.includes(s), "gợi ý thiếu " + s));
    assert.ok(q.x.includes(`Đáp số: ${fmtInt(tong)} cây; ${fmtInt(to1)} cây`));
  } },
  { has: "Nối mỗi phân số ở cột trái với số thập phân bằng nó", right: (q) => q.l.map((l) => { const m = q.r.filter((r) => eq(fr(r), fr(l))); assert.equal(m.length, 1, l); return m[0]; }),
    more: (q) => q.r.slice(q.l.length).forEach((r) => assert.ok(!q.l.some((l) => eq(fr(l), fr(r))))) },
  { has: "Số thập phân −12,5 viết dưới dạng phân số thập phân", right: (q) => { const m = q.o.filter((o) => /^−?\d+\/10+$/.test(o) && eq(fr(o), fr("−12,5"))); assert.equal(m.length, 1); return m[0]; } },
  { has: "Số thập phân 0,36 bằng phân số tối giản", right: (q) => { const m = q.o.filter((o) => eq(fr(o), fr("0,36"))); assert.equal(m.length, 1); assert.equal(gcd(...m[0].split("/").map(Number)), 1); return m[0]; } },
  { has: "Sắp xếp các số thập phân sau theo thứ tự từ bé đến lớn", right: (q) => q.o.slice().sort((a, b) => cmp(fr(a), fr(b))), more: (q) => assert.equal(new Set(q.o.map((o) => toNum(fr(o)))).size, q.o.length) },
  { has: "Mỗi phép tính với số thập phân sau đúng hay sai?", right: (q) => { assert.deepEqual(q.o, ["0,5 + 0,25 = 0,75", "(−1,2) − 0,8 = −2", "0,2 · 0,3 = 0,6", "4,5 : 0,5 = 9"]); return q.o.map((s) => stmt(s)); }, more: (q) => assert.ok(q.x.includes("= 0,06")) },
  { has: "Nối mỗi phép tính với số thập phân ở cột trái", right: (q) => q.l.map((e) => { const m = q.r.filter((r) => eq(fr(r), ev(e))); assert.equal(m.length, 1, e); return m[0]; }),
    more: (q) => q.r.slice(q.l.length).forEach((r) => assert.ok(!q.l.some((e) => eq(ev(e), fr(r))))) },
  { has: "2,7 · 3,5 + 2,7 · 6,5 − 7", right: () => fmtAns(ev("2,7 · 3,5 + 2,7 · 6,5 − 7")), more: () => assert.ok(eq(ev("3,5 + 6,5"), F(10))) },
  { has: "2,5 · x − 1,3 = 4,2", right: () => toNum(div(ev("4,2 + 1,3"), fr("2,5"))), more: (q) => assert.ok(q.x.includes("= 5,5")) },
  { has: "nhiệt độ ở một trạm khí tượng là −3,5 °C", right: () => fmtDec(ev("−3,5 + 8,2 − 7,3")) + " °C", more: (q) => { assert.ok(q.x.includes("= 4,7 (°C)")); q.o.slice(1).forEach((o) => assert.ok(!eq(fr(o.replace(" °C", "")), ev("−3,5 + 8,2 − 7,3")))); } },
  { has: "Làm tròn số −7,86 đến hàng phần mười", right: () => fmtDec(roundTo(fr("−7,86"), 1), 1) },
  { has: "làm tròn đến hàng đơn vị của nó", right: (q) => q.l.map((l) => fmtDec(roundTo(fr(l), 0), 0)), more: (q) => assert.ok(!q.l.some((l) => fmtDec(roundTo(fr(l), 0), 0) === q.r[4])) },
  { has: "Ước lượng tích 5,9 · 30,2", right: () => fmtAns(mul(roundTo(fr("5,9"), 0), roundTo(fr("30,2"), 0))) },
  { has: "làm tròn đến hàng phần mười thì được 8,4", right: (q) => { const m = q.o.filter((o) => fmtDec(roundTo(fr(o), 1), 1) === "8,4"); assert.equal(m.length, 1); return m[0]; } },
  { has: "cuộn dây dài 2 m, bạn Hà cắt ra một đoạn dài 40 cm", right: (q) => {
    assert.deepEqual(q.o, ["Tỉ số độ dài của đoạn dây cắt ra và cả cuộn dây là 40/2", "Tỉ số độ dài của đoạn dây cắt ra và cả cuộn dây là 1/5", "Đoạn dây cắt ra bằng 20% cuộn dây", "Phần dây còn lại dài 160 cm"]);
    const ts = F(40, 200); return [eq(ts, fr("40/2")), eq(ts, fr("1/5")), pct(F(40), F(200)) === "20%", 200 - 40 === 160];
  } },
  { has: "Nối mỗi cặp số ở cột trái với tỉ số phần trăm", right: (q) => q.l.map((l) => { const [a, b] = l.split(" và ").map(Number); return pct(F(a), F(b)); }), more: (q) => assert.ok(!q.l.some((l) => { const [a, b] = l.split(" và ").map(Number); return pct(F(a), F(b)) === q.r[4]; })) },
  { has: "Tỉ số của hai số a và b là 3/5. Biết b = 35", right: () => fmtAns(ev("35 · 3/5")) },
  { has: "sau khi giảm 20% là 2 400 000 đồng", right: () => toNum(ev("2 400 000 : (100 − 20)/100")), more: (q) => assert.ok(q.x.includes("= 3 000 000")) },
  { has: "giá 5 000 000 đồng và bán hết lô hàng đó được 5 600 000 đồng", right: () => pct(sub(F(5600000), F(5000000)), F(5000000)), more: (q) => assert.ok(q.x.includes("= 600 000")) },
  { has: "1 500 học sinh, trong đó 48% là học sinh nữ", right: () => { const nu = ev("1 500 · 48/100"), nam = sub(F(1500), nu); return toNum(sub(nam, nu)); }, more: (q) => assert.ok(q.x.includes("= 720") && q.x.includes("= 780")) },
  { has: "ba điểm P, Q, R cùng nằm trên một đường thẳng, điểm S không nằm trên", right: (q) => {
    assert.deepEqual(q.o, ["Điểm Q nằm giữa hai điểm P và R", "Hai tia QP và QR là hai tia đối nhau", "Hai điểm P và Q nằm cùng phía đối với điểm R", "Điểm S nằm giữa hai điểm P và R"]);
    const L = duongThang(q.svg), p = diem(q.svg, ["P", "Q", "R", "S"]); ["P", "Q", "R"].forEach((n) => assert.ok(thuoc(p[n], L))); assert.ok(!thuoc(p.S, L), "S nằm ngoài đường thẳng");
    const cungPhia = (a, b, o) => dot(subv(a, o), subv(b, o)) > 0;
    return [namGiua(p.Q, p.P, p.R), doiNhau(p.Q, p.P, p.R), cungPhia(p.P, p.Q, p.R), namGiua(p.S, p.P, p.R)];
  } },
  { has: "điểm B nằm giữa hai điểm A, C. Khẳng định nào dưới đây sai", right: (q) => { // dựng A, B, C trên trục số: A = 0, B = 1, C = 3
    const A = [0, 0], B = [1, 0], C = [3, 0], cungPhia = (a, b, o) => dot(subv(a, o), subv(b, o)) > 0;
    assert.deepEqual(q.o, ["Điểm A nằm giữa hai điểm B và C", "Hai tia BA và BC là hai tia đối nhau", "Tia AB còn được gọi là tia AC", "Hai điểm B và C nằm cùng phía đối với điểm A"]);
    const truth = [namGiua(A, B, C), doiNhau(B, A, C), cungPhia(B, C, A), cungPhia(B, C, A)];
    assert.equal(truth.filter((x) => !x).length, 1); return q.o[truth.indexOf(false)];
  } },
  { has: "Tia OM còn được gọi là tia nào", right: (q) => {
    const L = duongThang(q.svg), p = diem(q.svg, ["O", "M"]); assert.ok(thuoc(p.O, L) && thuoc(p.M, L));
    const x = nhan(q.svg, "x"), y = nhan(q.svg, "y"); assert.ok(dist(x, L.a) < 20 && dist(y, L.b) < 20, "nhãn x, y ở hai đầu đường thẳng");
    const veY = dot(subv(p.M, p.O), subv(L.b, p.O)) > 0; // M nằm về phía y so với O
    return "Tia O" + (veY ? "y" : "x");
  } },
  { has: "được tất cả 21 đường thẳng. Vậy n", right: () => { const m = []; for (let n = 2; n <= 50; n++) if (C2(n) === 21) m.push(n); assert.equal(m.length, 1); return String(m[0]); } },
  { has: "6 điểm phân biệt, trong đó có đúng 4 điểm thẳng hàng", right: () => String(C2(6) - C2(4) + 1), more: (q) => assert.ok(q.x.includes("6 · 5 : 2 = 15") && q.x.includes("4 · 3 : 2 = 6")) },
  { has: "Mỗi ô vuông trong hình có cạnh 1 cm. Nối mỗi đoạn thẳng", right: (q) => {
    const c = oLuoi(q.svg), seg = lines(q.svg).filter((l) => l.w === 3), p = diem(q.svg, ["A", "B", "C", "D", "E", "F"]);
    return q.l.map((name) => { const [u, v] = [p[name[0]], p[name[1]]]; const s = seg.find((l) => (dist(l.a, u) < 1e-9 && dist(l.b, v) < 1e-9) || (dist(l.a, v) < 1e-9 && dist(l.b, u) < 1e-9)); assert.ok(s, "thiếu đoạn " + name);
      assert.ok(u[0] % c === 20 % c && u[1] % c === 20 % c, "đầu mút trên giao điểm của lưới"); return dist(u, v) / c + " cm"; });
  }, more: (q) => assert.ok(!["4 cm", "2 cm", "5 cm"].includes(q.r[3])) },
  { has: "AB = 6 cm và M là trung điểm", right: (q) => { assert.deepEqual(q.o, ["AM = 3 cm", "Điểm M nằm giữa hai điểm A và B", "AM = AB", "MB = 3 cm"]); const AM = 6 / 2; return [AM === 3, true, AM === 6, 6 - AM === 3]; } },
  { has: "MN = 3 cm, NP = 4 cm, MP = 7 cm", right: (q) => { const d = { MN: 3, NP: 4, MP: 7 }, giua = [["N", d.MN + d.NP === d.MP], ["M", d.MN + d.MP === d.NP], ["P", d.MP + d.NP === d.MN]].filter((x) => x[1]); assert.equal(giua.length, 1); return "Điểm " + giua[0][0]; } },
  { has: "OA = 2 cm, OB = 5 cm, OC = 8 cm (hình vẽ)", right: (q) => {
    assert.deepEqual(q.o, ["AB = 3 cm", "BC = 3 cm", "B là trung điểm của đoạn thẳng AC", "A là trung điểm của đoạn thẳng OB"]);
    const t = tia(q.svg), p = diem(q.svg, ["O", "A", "B", "C"]); assert.ok(dist(p.O, t.goc) < 1e-9 && ["A", "B", "C"].every((n) => trenTia(p[n], t)));
    const u = tiLe([{ px: dist(p.O, p.A), cm: 2 }, { px: dist(p.O, p.B), cm: 5 }, { px: dist(p.O, p.C), cm: 8 }]), AB = dist(p.A, p.B) / u, BC = dist(p.B, p.C) / u;
    return [close(AB, 3), close(BC, 3), namGiua(p.B, p.A, p.C) && close(AB, BC), namGiua(p.A, p.O, p.B) && close(dist(p.O, p.A), dist(p.A, p.B))];
  } },
  { has: "AB = 10 cm. Lấy điểm C nằm giữa A và B sao cho AC = 3 cm", right: () => 3 + (10 - 3) / 2, more: (q) => assert.ok(q.x.includes("10 − 3 = 7") && q.x.includes("7 : 2 = 3,5") && q.x.includes("3 + 3,5 = 6,5")) },
  { has: "OM = 3 cm, ON = 7 cm. a) Tính độ dài đoạn thẳng MN", essay: (q) => {
    const MN = 7 - 3, rb = q.rubric.map((c) => c.c).join(" | ");
    assert.ok(3 < 7, "M nằm giữa O và N"); assert.ok(3 === 3, "OP = OM");
    ["MN = ON − OM = 7 − 3 = " + MN + " (cm)", "OP = OM = 3 cm"].forEach((s) => assert.ok(rb.includes(s), "thang chấm thiếu " + s));
    ["MN = 7 − 3 = " + MN + " (cm)", "OP = OM = 3 cm", "O là trung điểm của đoạn thẳng PM"].forEach((s) => assert.ok(q.x.includes(s), "gợi ý thiếu " + s));
    assert.equal(sum(q.rubric.map((c) => fr(String(c.p).replace(".", ",")))).n, 1, "thang chấm cộng lại bằng 1");
  } },
  { has: "AB = 14 cm. Điểm C nằm giữa hai điểm A và B sao cho AC = 6 cm", essay: (q) => {
    const CB = 14 - 6, MC = 6 / 2, CN = CB / 2, MN = MC + CN, rb = q.rubric.map((c) => c.c).join(" | ");
    [`CB = AB − AC = 14 − 6 = ${CB} (cm)`, `MC = AC : 2 = ${MC} (cm)`, `CN = CB : 2 = ${CN} (cm)`, `MN = MC + CN = ${MC} + ${CN} = ${MN} (cm)`].forEach((s) => assert.ok(rb.includes(s), "thang chấm thiếu " + s));
    [`CB = 14 − 6 = ${CB} (cm)`, `6 : 2 = ${MC} (cm)`, `${CB} : 2 = ${CN} (cm)`, `${MC} + ${CN} = ${MN} (cm)`].forEach((s) => assert.ok(q.x.includes(s), "gợi ý thiếu " + s));
  } }
];

let n = 0;
const run = (id, qs, checks) => {
  assert.equal(qs.length, checks.length, id + ": số câu khác số kiểm tra");
  qs.forEach((q, i) => {
    const c = checks[i], at = id + "#" + (i + 1);
    assert.ok(q.q.includes(c.has), at + ": đề không có “" + c.has + "”");
    if (q.type === "essay") { assert.ok(c.essay, at + ": tự luận cần kiểm tra thang chấm"); c.essay(q); n++; return; }
    const want = c.right(q);
    const got = { fill: () => q.ans[0], tf: () => q.a, tf4: () => q.a, num: () => q.ans, match: () => q.r.slice(0, q.l.length), order: () => q.o }[q.type] || (() => q.o[0]);
    // so bằng JSON: câu hỏi nạp trong vm khác (tests/nap-de.js), mảng của nó không cùng nguyên mẫu với mảng ở đây
    assert.strictEqual(JSON.stringify(got()), JSON.stringify(want), at + ": đáp án " + JSON.stringify(got()) + ", tính được " + JSON.stringify(want));
    if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), at + ": nhiễu trùng đáp án đúng");
    if (q.type === "tf4") assert.ok(want.includes(true) && want.includes(false), at + ": đúng/sai 4 ý nên có cả ý đúng và ý sai");
    if (c.more) c.more(q);
    n++;
  });
};
for (const [id, checks] of [["toan6-gk2-de1", de1], ["toan6-gk2-de2", de2]]) {
  const b = bank(id); assert.ok(b, "thiếu " + id); assert.equal(b.questions.length, 25);
  run(id, b.questions, checks);
}
const pool = bank(POOL), mine = pool.questions.filter((q) => q.src === POOL);
run(POOL, mine, own);
// tự thử bộ đọc biểu thức và làm tròn với vài giá trị biết trước
assert.ok(eq(ev("−8/−20"), F(2, 5)) && eq(ev("(−1,2) − 0,8"), F(-2)) && eq(ev("1 800/8"), F(225)) && eq(ev("2 400 000 : (100 − 20)/100"), F(3000000)));
assert.throws(() => ev("2 3/4 · 4"), "hỗn số không đọc bằng ev (chỉ fr)");
assert.ok(stmt("1/2 + 1/3 = 5/6") && !stmt("1/2 + 1/3 = 2/5") && stmt("−0,5 < −0,45") && !stmt("2,09 > 2,1"));
assert.equal(fmtDec(roundTo(fr("24,037"), 1), 1), "24,0"); assert.equal(fmtDec(roundTo(fr("2 156,8"), -1)), "2 160"); assert.equal(fmtDec(roundTo(fr("−7,86"), 1), 1), "−7,9"); assert.equal(mixed(fr("23/5")), "4 3/5");

/* ---------- mức độ và ma trận ---------- */
assert.ok(pool.questions.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => F(v[k]))).n), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
// hai đề cố định chia đúng ma trận
pool.pool.from.forEach((id) => Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => bank(id).questions.filter((q) => q.topic === t && q.lv === l).length), v, id + " không đúng ma trận ở chủ đề " + t)));
// mỗi ô có ít nhất gấp đôi số câu ô đó rút; ngoài mỗi đề cố định vẫn đủ số câu ô rút; câu riêng nào cũng nằm trong một ô có số câu của ma trận
Object.entries(M).forEach(([t, v]) => v.forEach((k, i) => {
  const have = pool.questions.filter((q) => q.topic === t && q.lv === i + 1);
  assert.ok(have.length >= 2 * k, `ô (${t}, mức ${i + 1}) rút ${k} câu mà kho chỉ có ${have.length}`);
  pool.pool.from.forEach((id) => assert.ok(have.filter((q) => q.src !== id).length >= k, `ô (${t}, mức ${i + 1}) ngoài ${id} chỉ còn ${have.filter((q) => q.src !== id).length} câu`));
}));
mine.forEach((q, i) => assert.ok(M[q.topic] && M[q.topic][q.lv - 1] > 0, `${POOL}#${i + 1}: ô (${q.topic}, mức ${q.lv}) không có trong ma trận`));
// câu tự luận chỉ ở các ô Vận dụng rút 1 câu, nhiều nhất hai ô: mỗi lần rút nhiều nhất 2 câu tự luận
const oTuLuan = [...new Set(pool.questions.filter((q) => q.type === "essay").map((q) => q.topic + "|" + q.lv))];
assert.ok(oTuLuan.length <= 2 && oTuLuan.every((k) => { const [t, lv] = k.split("|"); return +lv === 3 && M[t][2] === 1 && pool.questions.some((q) => q.topic === t && q.lv === 3 && q.type !== "essay"); }), "câu tự luận: " + oTuLuan);
assert.equal(pool.questions.filter((q) => q.svg).length, 12, "kho có 12 câu có hình");
const seen = new Set();
let essays = 0;
const thu = (hist) => {
  const d = Quiz.draw(pool, hist);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, 25);
  assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.lv === l).length), [10, 8, 7]);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.topic === t && q.lv === l).length), v, "rút đúng ma trận ở chủ đề " + t));
  const e = d.questions.filter((q) => q.type === "essay").length; assert.ok(e <= 2, "một lần rút có " + e + " câu tự luận");
  return d;
};
for (let k = 0; k < 400; k++) { const d = thu(); essays += d.questions.filter((q) => q.type === "essay").length; d.questions.forEach((q) => seen.add(Quiz.key(q))); }
assert.ok(mine.every((q) => seen.has(Quiz.key(q))), "400 lần rút thử phải gặp đủ các câu riêng");
// học sinh đã làm hết một đề cố định: lần rút sau không lấy lại câu của đề đó
pool.pool.from.forEach((id) => { const done = new Set(bank(id).questions.map(Quiz.key)); for (let k = 0; k < 20; k++) thu((q) => ({ done: done.has(Quiz.key(q)) ? 1 : 0, wrong: 0 })).questions.forEach((q) => assert.ok(!done.has(Quiz.key(q)), "đã làm hết " + id + " mà vẫn gặp lại câu của đề đó")); });
console.log(n, "câu đã tính lại (50 câu của 2 đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + pool.questions.length + " câu; trung bình " + (essays / 400).toFixed(2) + " câu tự luận mỗi lần rút.");
console.log("MATH OK");
