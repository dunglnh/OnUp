// Tính lại đáp án ngân hàng Toán 6 cuối năm (data/banks/6-toan.js): hai đề cố định toan6-ck2-de1, toan6-ck2-de2 và các câu riêng
// của đề ngẫu nhiên toan6-ck2-ngau-nhien (Phiên N18; học kì II, Bài 23–43). Mỗi câu: kiểm tra đề có đúng số liệu (has) rồi so đáp án
// với kết quả tính bằng code: trắc nghiệm o[0], điền khuyết ans[0], đúng/sai a, đúng/sai 4 ý a (4 ý), trả lời bằng số ans, nối cột
// r[i] của từng ô l[i], sắp xếp thứ tự o; tự luận: các bước trong thang chấm và đáp án gợi ý. Phân số và số thập phân tính bằng số
// hữu tỉ chính xác (như tests/toan6-gk2.js); làm tròn theo quy tắc của sách; tỉ số phần trăm; mệnh đề "… < …" của câu đúng/sai 4 ý
// tính lại bằng bộ đọc biểu thức. Câu có hình: đọc toạ độ trong hình (điểm thuộc đường thẳng, ba điểm thẳng hàng, hai đường thẳng
// cắt nhau, điểm nằm giữa, độ dài theo tỉ lệ hoặc lưới ô vuông, trung điểm; số đo góc trên thước đo góc, điểm trong của góc, số tia
// chung gốc; số biểu tượng của biểu đồ tranh, chiều cao cột của biểu đồ cột, biểu đồ cột kép theo trục số) rồi mới tính; xác suất
// thực nghiệm = số lần sự kiện xảy ra : tổng số lần; góc giữa hai kim đồng hồ theo số khoảng giữa hai vạch số (mỗi khoảng 30°).
// Cuối cùng kiểm tra mức độ và ma trận (mỗi ô có ít nhất gấp đôi số câu ô đó rút, ngoài mỗi đề cố định vẫn đủ; rút thử nhiều lần
// ra đúng 10 Biết, 8 Hiểu, 7 Vận dụng, nhiều nhất 2 câu tự luận; đã làm hết một đề cố định thì không gặp lại câu của đề đó), đề bài
// không trùng câu nào khác trong data/banks/6-toan.js và dò lộ đáp án giữa các câu rút được cùng lúc (Rút ra N5, N24, N8).
// Chạy: node tests/toan6-ck2.js → in MATH OK.
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan6-ck2-ngau-nhien";

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
const tiLe = (xs) => { // các độ dài tỉ lệ với nhau: trả về đơn vị (pixel của 1 cm) nếu xs[i].px / xs[i].cm bằng nhau
  const u = xs[0].px / xs[0].cm; xs.forEach((x) => assert.ok(close(x.px / x.cm, u, 1e-6), "độ dài trong hình phải đúng tỉ lệ")); return u;
};
const oLuoi = (svg) => {
  const xs = [...new Set(lines(svg).filter((l) => l.stroke === "line" && l.a[0] === l.b[0]).map((l) => l.a[0]))].sort((a, b) => a - b);
  const d = new Set(xs.slice(1).map((x, i) => x - xs[i])); assert.equal(d.size, 1, "lưới ô vuông đều"); return [...d][0];
};
const near = (p, q, e) => dist(p, q) <= (e || 0.6);
const circles = (svg) => [...svg.matchAll(/<circle [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { c: [+a.cx, +a.cy], r: +a.r, fill: a.fill }; });
const huong = (p, o) => Math.round(Math.atan2(o[1] - p[1], p[0] - o[0]) * 180 / Math.PI); // góc (độ) của điểm p nhìn từ o, ngược chiều kim đồng hồ
const loaiGoc = (d) => (d < 90 ? "Góc nhọn" : d === 90 ? "Góc vuông" : d < 180 ? "Góc tù" : "Góc bẹt");
const kim = (h) => 30 * Math.min(h % 12, 12 - (h % 12)); // góc giữa hai kim lúc h giờ đúng: số khoảng giữa hai vạch số, mỗi khoảng 30°
/* Thước đo góc (như tests/toan4-gk1.js): tâm ngay trên nhãn đỉnh, cạnh thứ nhất đi qua vạch 0, các vạch chia cách nhau 10°, các số của
   thang đặt đúng hướng; trả về số đo của góc theo cạnh kia. */
const thuocDo = (svg, [o, a, b]) => {
  const O = (([x, y]) => [x, y - 24])(nhan(svg, o)), L = lines(svg).filter((l) => near(l.a, O));
  assert.equal(L.length, 2, "hai cạnh của góc");
  const A = L.find((l) => huong(l.b, O) === 0), B = L.find((l) => l !== A);
  assert.ok(A && dist(A.b, nhan(svg, a)) < 20 && dist(B.b, nhan(svg, b)) < 20, `cạnh ${o}${a} đi qua vạch 0, nhãn ${b} ở đầu cạnh kia`);
  const vach = lines(svg).filter((l) => l.stroke === "acc").map((l) => huong(l.a, O)).sort((p, q) => p - q);
  assert.deepEqual(vach, Array.from({ length: 19 }, (_, i) => i * 10), "19 vạch chia, mỗi vạch 10°");
  texts(svg).filter((t) => /^\d+$/.test(t.t)).forEach((t) => assert.ok(Math.abs(huong(t.at, O) - +t.t) <= 6, `số ${t.t} của thang đặt sai chỗ`));
  const d = huong(B.b, O); assert.equal(d % 10, 0, "cạnh kia đi qua một vạch chia"); return d;
};
// các tia chung gốc O vẽ bằng đoạn thẳng: đoạn có một đầu ở O là một tia, đoạn có O nằm giữa là hai tia đối nhau
const tiaGoc = (svg, O) => lines(svg).filter((l) => l.w === 2).flatMap((l) => (near(l.a, O) ? [subv(l.b, O)] : near(l.b, O) ? [subv(l.a, O)] : thuoc(O, l) && namGiua(O, l.a, l.b) ? [subv(l.a, O), subv(l.b, O)] : []));
const trongGoc = (p, O, u, v) => { const w = subv(p, O); return cross(u, w) * cross(u, v) > 0 && cross(v, w) * cross(v, u) > 0; }; // p là điểm trong của góc tạo bởi hai tia hướng u, v
/* Biểu đồ tranh: mỗi hàng một tên (chữ ở bên trái) và các biểu tượng hình tròn cách đều cùng một hàng; chú thích “= k <đơn vị>” cạnh
   một biểu tượng → { k, don, hang: [[tên, số biểu tượng]] } */
const tranh = (svg) => {
  const C = circles(svg).filter((c) => c.r === 10), T = texts(svg), cu = T.filter((t) => /^= \d+ /.test(t.t));
  assert.equal(cu.length, 1, "một chú thích"); const [, k, don] = /^= (\d+) (.+)$/.exec(cu[0].t);
  const ys = [...new Set(C.map((c) => c.c[1]))].sort((a, b) => a - b), yCu = ys.find((y) => Math.abs(y - (cu[0].at[1] - 5)) < 1);
  assert.equal(C.filter((c) => c.c[1] === yCu).length, 1, "chú thích có đúng một biểu tượng"); assert.equal(new Set(C.map((c) => c.fill)).size, 1, "biểu tượng cùng một kiểu");
  const hang = ys.filter((y) => y !== yCu).map((y) => {
    const xs = C.filter((c) => c.c[1] === y).map((c) => c.c[0]).sort((a, b) => a - b); xs.slice(1).forEach((x, i) => assert.ok(close(x - xs[i], xs[1] - xs[0]), "biểu tượng cách đều"));
    const ten = T.filter((t) => Math.abs(t.at[1] - 5 - y) < 1 && t.at[0] < xs[0]); assert.equal(ten.length, 1, "mỗi hàng một tên");
    return [ten[0].t, xs.length];
  });
  return { k: +k, don, hang };
};
/* Biểu đồ cột, biểu đồ cột kép: trục dọc là các số bên trái (cách đều, từ 0), cột là rect tô acc-soft (dãy thứ nhất) hoặc sun-soft (dãy
   thứ hai), đứng trên trục ngang, chiều cao đúng vạch, số ở đỉnh cột bằng chiều cao; tên ở dưới (biểu đồ cột: dưới từng cột; cột kép:
   dưới giữa hai cột của nhóm, chú thích hai dãy ở ô vuông nhỏ trên cùng) → [[tên, giá trị]] hoặc [[tên, [giá trị 1, giá trị 2]]] */
const cotDo = (svg) => {
  const T = texts(svg), R = rects(svg).filter((r) => r.w >= 20);
  const truc = T.filter((t) => /^\d+$/.test(t.t) && t.at[0] < 50).map((t) => ({ v: +t.t, y: t.at[1] - 5 })).sort((a, b) => a.v - b.v);
  assert.ok(truc.length >= 3 && truc[0].v === 0, "trục số bắt đầu từ 0, ít nhất 3 vạch");
  const base = truc[0].y, per = (base - truc[truc.length - 1].y) / truc[truc.length - 1].v;
  truc.forEach((t) => assert.ok(Math.abs(base - t.v * per - t.y) < 0.6, "vạch " + t.v + " không cách đều"));
  const doc = R.map((r) => {
    assert.ok(Math.abs(r.y + r.h - base) < 0.6, "cột đứng trên trục ngang"); const v = r.h / per, cx = r.x + r.w / 2;
    assert.ok(Math.abs(v - Math.round(v)) < 1e-6, "chiều cao cột không đúng vạch: " + v);
    const dinh = T.filter((t) => /^\d+$/.test(t.t) && Math.abs(t.at[0] - cx) < 1 && t.at[1] < r.y && t.at[1] > r.y - 12);
    assert.equal(dinh.length, 1, "mỗi cột một số ở đỉnh"); assert.equal(+dinh[0].t, Math.round(v), "số ở đỉnh cột khác chiều cao cột");
    return { x: r.x, cx, w: r.w, v: Math.round(v), fill: r.fill };
  }).sort((a, b) => a.x - b.x);
  const ten = (cx) => { const t = T.filter((t) => Math.abs(t.at[0] - cx) < 1 && t.at[1] > base); assert.equal(t.length, 1, "mỗi cột, mỗi nhóm một tên"); return t[0].t; };
  if (doc.every((c) => c.fill === "acc-soft")) return doc.map((c) => [ten(c.cx), c.v]);
  const nho = rects(svg).filter((r) => r.w < 20); assert.deepEqual(nho.map((r) => r.fill), ["acc-soft", "sun-soft"], "chú thích hai dãy");
  const out = [];
  for (let i = 0; i < doc.length; i += 2) {
    const [a, b] = [doc[i], doc[i + 1]]; assert.ok(a.fill === "acc-soft" && b.fill === "sun-soft" && close(a.x + a.w, b.x), "mỗi nhóm hai cột liền nhau");
    out.push([ten(a.x + a.w), [a.v, b.v]]);
  }
  return out;
};
const keys = (svg) => { const nho = rects(svg).filter((r) => r.w < 20); return nho.map((r) => texts(svg).find((t) => Math.abs(t.at[0] - (r.x + r.w + 4)) < 1 && Math.abs(t.at[1] - (r.y + 12)) < 1).t); };
const bang = (q, re) => [...q.q.matchAll(re)].map((m) => [m[1], +m[2]]); // các cặp (tên, số) trong đề
const soLieu = (q) => { const m = /lần lượt ứng với (.+?) (?:lượt|quyển|học sinh|sản phẩm)/.exec(q.q); assert.ok(m, "không thấy dãy số liệu"); return m[1].split("; ").map((s) => toNum(fr(s))); };
const xs = (q, re) => { const m = re.exec(q.q); assert.ok(m, "đề thiếu " + re); return m.slice(1).map((s) => toNum(fr(s))); };
const essayCheck = (q, rb, xx) => { const r = q.rubric.map((c) => c.c).join(" | "); rb.forEach((s) => assert.ok(r.includes(s), "thang chấm thiếu " + s)); xx.forEach((s) => assert.ok(q.x.includes(s), "gợi ý thiếu " + s)); };
const theo = (q, re, f) => { const m = q.o.filter((o) => { const k = re.exec(o); return k && f(k); }); assert.equal(m.length, 1, "cần đúng một lựa chọn đúng"); return m[0]; };

/* ---------- kiểm tra từng câu ----------
   right(q): đáp án tính bằng code (so với o[0], ans[0], a, ans, r của từng ô trái, o); more(q): kiểm tra thêm; essay(q): tự luận. */
const de1 = [
  { has: "bằng phân số 4/−6", right: (q) => { const m = q.o.filter((o) => eq(fr(o), fr("4/−6"))); assert.equal(m.length, 1); return m[0]; } },
  { has: "Trong các phân số 5/8; 4/5; 7/12; 2/3, phân số lớn nhất", right: (q) => list(q, /các phân số (.+?), phân số/).sort((a, b) => cmp(fr(b), fr(a)))[0], more: (q) => assert.ok(["75/120", "96/120", "70/120", "80/120"].every((s) => q.x.includes(s))) },
  { has: "Tính: −2/9 + 7/9", right: () => fmtAns(ev("−2/9 + 7/9")) },
  { has: "Tính: (−3/4) · 8/15", right: () => fmtAns(ev("(−3/4) · 8/15")), more: (q) => assert.ok(q.x.includes("−24/60")) },
  { has: "Sách giáo khoa chiếm 2/5 tổng số sách, truyện chiếm 3/8 tổng số sách, còn lại là 270 cuốn", essay: (q) => {
    const p = ev("1 − 2/5 − 3/8"), tong = div(F(270), p), tr = mul(tong, fr("3/8"));
    essayCheck(q, [`1 − 2/5 − 3/8 = ${fmtF(p)}`, `270 : ${fmtF(p)} = ${fmtInt(tong)} (cuốn)`, `${fmtInt(tong)} · 3/8 = ${fmtInt(tr)} (cuốn)`],
      [`= ${fmtF(p)} (tổng số sách)`, `270 · 40/9 = ${fmtInt(tong)} (cuốn)`, `Đáp số: a) ${fmtInt(tong)} cuốn; b) ${fmtInt(tr)} cuốn`]);
  } },
  { has: "Số thập phân −3,07 viết dưới dạng phân số thập phân", right: (q) => { const m = q.o.filter((o) => /^−?\d+\/10+$/.test(o) && eq(fr(o), fr("−3,07"))); assert.equal(m.length, 1); return m[0]; } },
  { has: "Tính: 2,4 · (−1,5) + 0,6", right: () => toNum(ev("2,4 · (−1,5) + 0,6")), more: (q) => assert.ok(q.x.includes("= −3,6")) },
  { has: "Làm tròn số 47,862 đến hàng phần mười", right: () => fmtDec(roundTo(fr("47,862"), 1), 1) },
  { has: "Tỉ số phần trăm của 21 và 60", right: () => pct(F(21), F(60)) },
  { has: "máy tính với giá 8 000 000 đồng. Cửa hàng muốn bán lãi 15%", right: () => toNum(ev("8 000 000 · (100 + 15)/100")), more: (q) => assert.ok(q.x.includes("= 1 200 000") && q.x.includes("= 9 200 000")) },
  { has: "Quan sát hình vẽ rồi cho biết mỗi ý sau đúng hay sai.", right: (q) => {
    assert.deepEqual(q.o, ["P ∉ a", "Q ∈ a", "Đường thẳng a đi qua hai điểm M và P", "Ba điểm M, N, Q thẳng hàng"]);
    const L = duongThang(q.svg), p = diem(q.svg, ["M", "N", "P", "Q"]); assert.ok(dist(nhan(q.svg, "a"), L.b) < 20, "nhãn a ở đầu đường thẳng");
    return [!thuoc(p.P, L), thuoc(p.Q, L), thuoc(p.M, L) && thuoc(p.P, L), thangHang(p.M, p.N, p.Q)];
  } },
  { has: "hai đường thẳng m, n và ba điểm A, B, O", right: (q) => {
    assert.deepEqual(q.o, ["Hai đường thẳng m và n cắt nhau tại O", "Điểm A thuộc cả hai đường thẳng m và n", "Ba điểm A, O, B thẳng hàng", "O ∈ n"]);
    const L = lines(q.svg).filter((l) => l.w === 2); assert.equal(L.length, 2, "hai đường thẳng");
    const ten = (n) => L.slice().sort((u, v) => Math.min(dist(u.a, nhan(q.svg, n)), dist(u.b, nhan(q.svg, n))) - Math.min(dist(v.a, nhan(q.svg, n)), dist(v.b, nhan(q.svg, n))))[0];
    const m = ten("m"), n = ten("n"), p = diem(q.svg, ["A", "B", "O"]); assert.notEqual(m, n);
    return [thuoc(p.O, m) && thuoc(p.O, n), thuoc(p.A, m) && thuoc(p.A, n), thangHang(p.A, p.O, p.B), thuoc(p.O, n)];
  }, more: (q) => { const p = diem(q.svg, ["A", "B"]), L = lines(q.svg).filter((l) => l.w === 2); assert.ok(L.filter((l) => thuoc(p.A, l)).length === 1 && L.filter((l) => thuoc(p.B, l)).length === 1, "A, B mỗi điểm trên đúng một đường thẳng"); } },
  { has: "Biết CD = 11 cm. Độ dài đoạn thẳng CI", right: () => fmtDec(div(F(11), F(2))) + " cm" },
  { has: "AT = 600 m, AC = 2 km và bưu điện nằm ở trung điểm của đoạn đường từ trường đến chợ", right: () => 600 + (2000 - 600) / 2, more: (q) => assert.ok(q.x.includes("2 000 − 600 = 1 400 (m)") && q.x.includes("TC : 2 = 700 (m)") && q.x.includes("600 + 700 = 1 300 (m)")) },
  { has: "Thước đo góc cho biết góc xOy", right: (q) => thuocDo(q.svg, ["O", "x", "y"]) + "°", more: (q) => assert.equal(loaiGoc(thuocDo(q.svg, ["O", "x", "y"])), "Góc tù") },
  { has: "hai cạnh kề nhau của một tờ giấy hình chữ nhật", right: () => loaiGoc(90) },
  { has: "Cho góc xOy = 50°, góc mAn = 90°, góc pBq = 140° và góc uCv = 180°", right: (q) => {
    const g = Object.fromEntries([...q.q.matchAll(/góc (\w+) = (\d+)°/g)].map((m) => [m[1], +m[2]]));
    assert.deepEqual(q.o, ["Góc xOy là góc nhọn", "Góc pBq lớn hơn góc mAn", "Góc uCv là góc tù", "Góc mAn nhỏ hơn góc xOy"]);
    return [loaiGoc(g.xOy) === "Góc nhọn", g.pBq > g.mAn, loaiGoc(g.uCv) === "Góc tù", g.mAn < g.xOy];
  } },
  { has: "quạt giấy khi mở ra có 6 nan quạt chung một đầu O", right: () => C2(6), more: (q) => assert.ok(q.x.includes("6 · 5 : 2 = 15")) },
  { has: "Dãy dữ liệu nào dưới đây là dãy số liệu", right: (q) => { const m = q.o.filter((o) => o.split(": ")[1].split("; ").every((v) => /^\d+$/.test(v))); assert.equal(m.length, 1); return m[0]; } },
  { has: "mỗi biểu tượng ứng với 10 học sinh. Hàng của khối 6 có 9 biểu tượng, hàng của khối 9 có 2", right: () => (9 - 2) * 10, more: (q) => assert.ok(q.x.includes("= 90") && q.x.includes("= 20")) },
  { has: "môn thể thao yêu thích nhất của các học sinh lớp 6A", right: (q) => { const d = cotDo(q.svg); assert.deepEqual(d.map((c) => c[0]), ["Bóng đá", "Cầu lông", "Bơi", "Cờ vua"]); return fmtInt(sum(d.map((c) => F(c[1])))) + " học sinh"; },
    more: (q) => assert.ok(q.x.includes("12 + 9 + 6 + 8 = 35")) },
  { has: "số cây giống hai lớp 6A, 6B ươm được trong ba tháng", right: (q) => { const d = cotDo(q.svg); assert.deepEqual(keys(q.svg), ["6A", "6B"]); assert.deepEqual(d.map((c) => c[0]), ["Tháng 3", "Tháng 4", "Tháng 5"]);
    const a = d.reduce((s, c) => s + c[1][0], 0), b = d.reduce((s, c) => s + c[1][1], 0); assert.ok(q.x.includes(`= ${a} (cây)`) && q.x.includes(`= ${b} (cây)`)); return a - b; } },
  { has: "3 viên bi xanh, 2 viên bi đỏ và 1 viên bi trắng", right: (q) => String(new Set([...q.q.matchAll(/\d+ viên bi (\S+)/g)].map((m) => m[1])).size) },
  { has: "tung một đồng xu 40 lần, thấy có 22 lần", right: () => fmtAns(F(22, 40)) },
  { has: "bắn 40 phát đạn vào bia thì có 31 phát trúng bia", right: () => toNum(mul(F(40 - 31, 40), F(100))), more: (q) => assert.equal(q.unit, "%") }
];
// sự kiện khi gieo xúc xắc được v chấm
const suKien = (s, v) => { let m;
  if (/số chẵn$/.test(s)) return v % 2 === 0; if (/số lẻ$/.test(s)) return v % 2 === 1;
  if ((m = /lớn hơn (\d+)$/.exec(s))) return v > +m[1]; if ((m = /là (\d+) hoặc (\d+)$/.exec(s))) return v === +m[1] || v === +m[2];
  throw new Error("sự kiện lạ: " + s); };
const de2 = [
  { has: "3/5 = ___/45", right: () => { assert.equal(45 % 5, 0); return fmtAns(mul(fr("3/5"), F(45))); } },
  { has: "Sắp xếp các phân số sau theo thứ tự từ bé đến lớn", right: (q) => q.o.slice().sort((a, b) => cmp(fr(a), fr(b))), more: (q) => assert.equal(new Set(q.o.map((o) => toNum(fr(o)))).size, 4) },
  { has: "3/10 − 5/6", right: () => fmtF(ev("3/10 − 5/6")), more: (q) => q.o.slice(1).forEach((o) => assert.ok(!eq(fr(o), ev("3/10 − 5/6")), "nhiễu " + o)) },
  { has: "5/6 : (−10/9)", right: () => fmtF(ev("5/6 : (−10/9)")), more: (q) => q.o.slice(1).forEach((o) => assert.ok(!eq(fr(o), ev("5/6 : (−10/9)")), "nhiễu " + o)) },
  { has: "bao gạo 24 kg. Tuần thứ nhất cả nhà ăn hết 1/3 bao gạo, tuần thứ hai ăn hết 3/4", right: () => { const con = ev("24 − 24 · 1/3"); return toNum(sub(con, mul(con, fr("3/4")))); }, more: (q) => assert.ok(q.x.includes("= 8 (kg)") && q.x.includes("= 16 (kg)") && q.x.includes("= 12 (kg)")) },
  { has: "Số đối của số thập phân −4,25", right: () => fmtDec(neg(fr("−4,25"))) },
  { has: "(6,3 − 9,1) : 0,7", right: () => fmtDec(ev("(6,3 − 9,1) : 0,7")), more: (q) => q.o.slice(1).forEach((o) => assert.ok(!eq(fr(o), ev("(6,3 − 9,1) : 0,7")))) },
  { has: "Làm tròn số 3 509,4 đến hàng trăm", right: () => fmtAns(roundTo(fr("3 509,4"), -2)), more: (q) => assert.ok(q.ans.includes("3 500")) },
  { has: "tỉ số của 1,5 m và 90 cm", right: () => fmtAns(div(mul(fr("1,5"), F(100)), F(90))), more: (q) => assert.ok(q.x.includes("1,5 m = 150 cm")) },
  { has: "36 học sinh đạt giải trong kì thi học sinh giỏi, chiếm 4,5%", right: () => toNum(div(F(36), div(fr("4,5"), F(100)))) },
  { has: "Hai tia Ox và Oy là", right: () => { const x = [-1, 0], O = [0, 0], y = [1, 0]; assert.ok(doiNhau(O, x, y)); return "Hai tia đối nhau"; } },
  { has: "bốn cây cột A, B, C, D; ba cột A, B, C đứng thẳng hàng, còn cột D không thẳng hàng", right: () => String(C2(4) - C2(3) + 1), more: (q) => assert.equal(q.o[1], String(C2(4)), "nhiễu: quên ba điểm thẳng hàng") },
  { has: "EF = 11 cm, EK = 4 cm. Độ dài đoạn thẳng KF", right: (q) => {
    const p = diem(q.svg, ["E", "K", "F"]); assert.ok(namGiua(p.K, p.E, p.F), "K nằm giữa E và F");
    const u = tiLe([{ px: dist(p.E, p.K), cm: 4 }, { px: dist(p.E, p.F), cm: 11 }]);
    assert.ok(dist(nhan(q.svg, "4 cm"), [(p.E[0] + p.K[0]) / 2, p.E[1]]) < 24, "nhãn 4 cm trên đoạn EK"); return String(dist(p.K, p.F) / u);
  } },
  { has: "AB = 10 cm. Lấy hai điểm C, D thuộc đoạn thẳng AB sao cho AC = BD = 3 cm", essay: (q) => {
    const A = 0, B = 10, C = A + 3, D = B - 3, M = (A + B) / 2; assert.ok(A < C && C < M && M < D && D < B, "thứ tự A, C, M, D, B");
    essayCheck(q, [`CD = AB − AC − BD = 10 − 3 − 3 = ${D - C} (cm)`, `AM = MB = AB : 2 = ${M - A} (cm)`, `CM = AM − AC = 5 − 3 = ${M - C} (cm)`, `MD = MB − BD = 5 − 3 = ${D - M} (cm)`, `MC = MD = ${M - C} cm`],
      [`CD = AB − AC − BD = 10 − 3 − 3 = ${D - C} (cm)`, `CM = AM − AC = 5 − 3 = ${M - C} (cm)`, `MD = MB − BD = 5 − 3 = ${D - M} (cm)`, "M là trung điểm của đoạn thẳng CD", `Đáp số: a) ${D - C} cm; b) có`]);
    assert.equal(M - C, D - M);
  } },
  { has: "Cách gọi tên nào dưới đây đúng với góc trong hình", right: (q) => {
    const p = diem(q.svg, ["O", "A", "B"]), u = tiaGoc(q.svg, p.O); assert.equal(u.length, 2, "góc có hai cạnh chung gốc O");
    ["A", "B"].forEach((n) => assert.equal(u.filter((v) => Math.abs(cross(v, subv(p[n], p.O))) < 1e-6 && dot(v, subv(p[n], p.O)) > 0).length, 1, "điểm " + n + " nằm trên một cạnh"));
    return theo(q, /^Góc (\w)(\w)(\w)$/, (k) => k[2] === "O" && [k[1], k[3]].sort().join("") === "AB");
  } },
  { has: "Nối mỗi số đo góc ở cột trái với loại góc", right: (q) => q.l.map((l) => loaiGoc(parseInt(l, 10))) },
  { has: "Lúc 4 giờ, góc tạo bởi kim giờ và kim phút", right: () => kim(4) + "°", more: (q) => assert.ok(q.x.includes("180° : 6 = 30°") && q.x.includes("4 · 30° = 120°")) },
  { has: "tia Ox đi qua vạch 30 và tia Oy đi qua vạch 115", right: (q) => { const [a, b] = xs(q, /vạch (\d+) và tia Oy đi qua vạch (\d+)/); return b - a + "°"; } },
  { has: "số cây ba lớp 6A, 6B, 6C trồng được trong dịp Tết trồng cây. Lớp 6B", right: (q) => { const t = tranh(q.svg); assert.deepEqual(t.hang.map((h) => h[0]), ["6A", "6B", "6C"]); assert.equal(t.don, "cây");
    return t.hang[1][1] * t.k + " cây"; }, more: (q) => assert.equal(q.o[1], tranh(q.svg).hang[1][1] + " cây", "nhiễu: số biểu tượng") },
  { has: "thứ Hai 12 ổ, thứ Ba 18 ổ, thứ Tư 24 ổ", right: () => gcd(gcd(12, 18), 24) + " ổ" },
  { has: "số học sinh nam và số học sinh nữ thích đọc sách ở ba lớp", right: (q) => {
    const d = Object.fromEntries(cotDo(q.svg)); assert.deepEqual(keys(q.svg), ["Nam", "Nữ"]);
    assert.deepEqual(q.o, ["Lớp 6A có 20 học sinh thích đọc sách", "Ở lớp 6B, số học sinh nam thích đọc sách nhiều hơn số học sinh nữ", "Lớp 6C có số học sinh nữ thích đọc sách nhiều nhất trong ba lớp", "Tổng số học sinh nam thích đọc sách của ba lớp là 26"]);
    const nuMax = Object.entries(d).sort((a, b) => b[1][1] - a[1][1])[0][0];
    return [d["6A"][0] + d["6A"][1] === 20, d["6B"][0] > d["6B"][1], nuMax === "6C", d["6A"][0] + d["6B"][0] + d["6C"][0] === 26];
  } },
  { has: "lượt khách tham quan một bảo tàng trong bốn tháng", right: (q) => { const v = soLieu(q); return toNum(mul(div(F(v[3] - v[0]), F(v[0])), F(100))); }, more: (q) => assert.equal(q.unit, "%") },
  { has: "thấy mặt 4 chấm xuất hiện", right: (q) => { const m = q.o.filter((o) => suKien(o, 4)); assert.equal(m.length, 1); return m[0]; } },
  { has: "50 lần thì có 18 lần lấy được viên bi đỏ", right: () => fmtF(F(18, 50)) },
  { has: "Tung hai đồng xu cùng lúc 60 lần", right: () => { assert.equal(14 + 31 + 15, 60); return fmtF(F(31 + 15, 60)); }, more: (q) => assert.ok(q.x.includes("31 + 15 = 46")) }
];
const own = [
  { has: "Rút gọn phân số −15/25", right: () => fmtF(fr("−15/25")), more: () => assert.equal(gcd(15, 25), 5) },
  { has: "Hai phân số 2/7 và 6/21 bằng nhau", right: () => eq(fr("2/7"), fr("6/21")) },
  { has: "So sánh hai số 2 3/4 và 13/5", right: () => { const c = cmp(fr("2 3/4"), fr("13/5")); return "2 3/4 " + (c > 0 ? ">" : c < 0 ? "<" : "=") + " 13/5"; } },
  { has: "Mỗi so sánh phân số sau đúng hay sai?", right: (q) => q.o.map((s) => stmt(s)) },
  { has: "Tính: 5/6 + (−1/4)", right: () => fmtAns(ev("5/6 + (−1/4)")) },
  { has: "Số đối của phân số −8/11", right: () => fmtF(neg(fr("−8/11"))) },
  { has: "Nối mỗi phép nhân, phép chia phân số", right: (q) => q.l.map((e) => { const m = q.r.filter((r) => eq(fr(r), ev(e))); assert.equal(m.length, 1, e); return m[0]; }),
    more: (q) => q.r.slice(q.l.length).forEach((r) => assert.ok(!q.l.some((e) => eq(ev(e), fr(r))))) },
  { has: "Tìm x, biết x · 3/7 = 6/5", right: () => fmtAns(ev("6/5 : 3/7")) },
  { has: "Ngày thứ nhất Lan đọc được 1/4 số trang", essay: (q) => {
    const p1 = ev("1 − 1/4"), p2 = mul(fr("3/5"), p1), p3 = sub(p1, p2), T = div(F(54), p3); assert.ok(isInt(T));
    essayCheck(q, [`1 − 1/4 = ${fmtF(p1)}`, `3/5 · 3/4 = ${fmtF(p2)}`, `3/4 − 9/20 = ${fmtF(p3)}`, `54 : ${fmtF(p3)} = ${fmtInt(T)} (trang)`],
      [`3/4 − 9/20 = 15/20 − 9/20 = 6/20 = ${fmtF(p3)}`, `54 · 10/3 = ${fmtInt(T)} (trang)`, `Đáp số: ${fmtInt(T)} trang`]);
  } },
  { has: "đã đi được 3/7 quãng đường thì còn cách nơi đến 12 km", right: () => fmtInt(div(F(12), sub(F(1), fr("3/7")))) + " km", more: (q) => assert.equal(q.o[1], fmtInt(ev("12 : 3/7")) + " km", "nhiễu: chia nhầm cho 3/7") },
  { has: "Mỗi khẳng định sau về số thập phân đúng hay sai?", right: (q) => q.o.map((s) => stmt(s)) },
  { has: "Xếp các số thập phân âm sau theo thứ tự tăng dần", right: (q) => q.o.slice().sort((a, b) => cmp(fr(a), fr(b))) },
  { has: "Nối mỗi biểu thức ở cột trái với giá trị của nó", right: (q) => q.l.map((e) => { const m = q.r.filter((r) => eq(fr(r), ev(e))); assert.equal(m.length, 1, e); return m[0]; }),
    more: (q) => q.r.slice(q.l.length).forEach((r) => assert.ok(!q.l.some((e) => eq(ev(e), fr(r))))) },
  { has: "Một chai dầu ăn chứa 0,75 l", right: () => fmtDec(mul(F(12), fr("0,75"))) + " l" },
  { has: "Làm tròn số −6,248 đến hàng phần trăm", right: () => fmtDec(roundTo(fr("−6,248"), 2), 2) },
  { has: "Ước lượng tích 19,6 · 4,9", right: () => fmtAns(mul(roundTo(fr("19,6"), 0), roundTo(fr("4,9"), 0))) },
  { has: "Một lớp có 40 học sinh, trong đó có 16 học sinh nữ", right: (q) => {
    assert.deepEqual(q.o, ["Tỉ số của số học sinh nữ và số học sinh cả lớp là 2/5", "Số học sinh nữ chiếm 40% số học sinh cả lớp", "Số học sinh nam chiếm 60% số học sinh cả lớp", "Tỉ số của số học sinh nam và số học sinh nữ là 2/3"]);
    return [eq(F(16, 40), fr("2/5")), pct(F(16), F(40)) === "40%", pct(F(24), F(40)) === "60%", eq(F(24, 16), fr("2/3"))];
  } },
  { has: "quyển sách giá 60 000 đồng được giảm giá 15%", right: () => fmtInt(ev("60 000 · 15/100")) + " đồng", more: (q) => assert.equal(q.o[1], fmtInt(ev("60 000 − 60 000 · 15/100")) + " đồng", "nhiễu: giá sau khi giảm") },
  { has: "chiều dài 25 m, chiều rộng 16 m. Người ta dùng 15%", right: () => fmtInt(ev("25 · 16 · 15/100")) + " m²", more: (q) => assert.equal(q.o[3], fmtInt(ev("25 · 16")) + " m²", "nhiễu: cả diện tích") },
  { has: "Số học sinh thích bóng đá chiếm 40%", right: () => toNum(ev("45 · 40/100 · 1/3")), more: (q) => assert.ok(q.x.includes("= 18 (học sinh)")) },
  { has: "đóng hai chiếc đinh vào hai chỗ khác nhau", right: () => "Đúng một đường thẳng" },
  { has: "kéo dài mãi về cả hai phía thì hai vạch vẫn không gặp nhau", right: () => "Song song" }, // không có điểm chung: song song (cắt nhau: đúng một, trùng nhau: vô số)
  { has: "bốn điểm M, N, P, Q theo thứ tự đó. Tia nào dưới đây trùng với tia NQ", right: (q) => {
    const X = { M: 0, N: 1, P: 2, Q: 3 }, cung = (a, b, c, d) => a === c && Math.sign(X[b] - X[a]) === Math.sign(X[d] - X[c]);
    return theo(q, /^Tia (\w)(\w)$/, (k) => cung(k[1], k[2], "N", "Q"));
  } },
  { has: "sao cho O nằm giữa A và B, điểm A thuộc tia Ox", right: (q) => {
    const A = -1, O = 0, B = 1, x = Math.sign(A - O), y = -x; // A thuộc tia Ox; Oy là tia đối của Ox
    assert.deepEqual(q.o, ["Điểm B thuộc tia Oy", "Hai tia OA và OB là hai tia đối nhau", "Tia AO trùng với tia AB", "Hai tia OA và Oy trùng nhau"]);
    return [Math.sign(B - O) === y, namGiua([O, 0], [A, 0], [B, 0]), Math.sign(O - A) === Math.sign(B - A), Math.sign(A - O) === y];
  } },
  { has: "Sắp xếp các đoạn thẳng sau theo độ dài từ ngắn đến dài", right: (q) => { const DV = { m: 1000, dm: 100, cm: 10, mm: 1 }, mm = (s) => { const m = /= (.+) (m|dm|cm|mm)$/.exec(s); return toNum(mul(fr(m[1]), F(DV[m[2]]))); };
    const o = q.o.slice().sort((a, b) => mm(a) - mm(b)); assert.equal(new Set(q.o.map(mm)).size, 4); return o; } },
  { has: "Điểm nào là trung điểm của đoạn thẳng AB", right: (q) => {
    const c = oLuoi(q.svg), p = diem(q.svg, ["A", "B", "C", "D", "E"]), s = lines(q.svg).filter((l) => l.w === 3);
    assert.equal(s.length, 1); assert.ok(near(s[0].a, p.A) && near(s[0].b, p.B), "đoạn thẳng AB"); assert.equal(dist(p.A, p.B) / c, 6, "AB dài 6 ô");
    const m = ["C", "D", "E"].filter((n) => namGiua(p[n], p.A, p.B) && close(dist(p[n], p.A), dist(p[n], p.B))); assert.equal(m.length, 1); return "Điểm " + m[0];
  } },
  { has: "thanh gỗ thẳng AB dài 160 cm. Bác thợ mộc đánh dấu điểm M là trung điểm của AB", essay: (q) => {
    const AM = 160 / 2, NM = AM - 22, NI = NM / 2, AI = 22 + NI; assert.ok(22 < AM, "N nằm giữa A và M");
    essayCheck(q, [`AM = AB : 2 = 160 : 2 = ${AM} (cm)`, `NM = AM − AN = ${AM} − 22 = ${NM} (cm)`, `NI = NM : 2 = ${NM} : 2 = ${NI} (cm)`, `AI = AN + NI = 22 + ${NI} = ${AI} (cm)`],
      [`AM = AB : 2 = 160 : 2 = ${AM} (cm)`, `NM = AM − AN = ${AM} − 22 = ${NM} (cm)`, `AI = AN + NI = 22 + ${NI} = ${AI} (cm)`, `Đáp số: a) AM = ${AM} cm, NM = ${NM} cm; b) AI = ${AI} cm`]);
  } },
  { has: "quãng đường thẳng AB dài 20 km có ba điểm dừng xe buýt: điểm C ở trung điểm của AB, điểm D ở trung điểm của đoạn CB, điểm E ở trung điểm của đoạn DB", right: () => fmtDec(sub(F(20), F(20, 8))) + " km" },
  { has: "Trong các số đo 45°; 90°; 125°; 180°", right: (q) => theo(q, /^(\d+)°$/, (k) => loaiGoc(+k[1]) === "Góc tù") },
  { has: "Thước đo góc cho biết góc mAn", right: (q) => thuocDo(q.svg, ["A", "m", "n"]) + "°" },
  { has: "Lúc 10 giờ, kim giờ và kim phút", right: () => loaiGoc(kim(10)) === "Góc nhọn" },
  { has: "Điểm nào nằm trong góc xOy", right: (q) => {
    const p = diem(q.svg, ["O", "M", "N", "P"]), u = tiaGoc(q.svg, p.O); assert.equal(u.length, 2);
    const ux = u.find((v) => dist(nhan(q.svg, "x"), [p.O[0] + v[0], p.O[1] + v[1]]) < 20), uy = u.find((v) => v !== ux);
    assert.ok(ux && dist(nhan(q.svg, "y"), [p.O[0] + uy[0], p.O[1] + uy[1]]) < 20, "nhãn x, y ở đầu hai cạnh");
    assert.ok(Math.abs(cross(uy, subv(p.P, p.O))) < 1e-6, "P nằm trên cạnh Oy");
    return theo(q, /^Điểm (\w)$/, (k) => k[1] !== "O" && trongGoc(p[k[1]], p.O, ux, uy));
  } },
  { has: "tia Ox đi qua vạch 0 thì tia Oy đi qua vạch 75", right: () => `Góc xOy là ${loaiGoc(75).toLowerCase()} có số đo 75°` },
  { has: "Mỗi ý sau về góc tạo bởi kim giờ và kim phút", right: (q) => q.o.map((s) => { const m = /^Lúc (\d+) giờ, (?:hai kim tạo thành (góc \S+)|góc tạo bởi hai kim bằng (\d+)°)$/.exec(s); assert.ok(m, "ý lạ: " + s);
    return m[2] ? loaiGoc(kim(+m[1])).toLowerCase() === m[2] : kim(+m[1]) === +m[3]; }) },
  { has: "đường thẳng xy đi qua điểm O và hai tia Oz, Ot", right: (q) => { const p = diem(q.svg, ["O"]), u = tiaGoc(q.svg, p.O); assert.equal(u.length, 4, "bốn tia chung gốc O");
    ["x", "y", "z", "t"].forEach((n) => assert.equal(u.filter((v) => dist(nhan(q.svg, n), [p.O[0] + v[0], p.O[1] + v[1]]) < 20).length, 1, "nhãn " + n + " ở đầu một tia"));
    return C2(u.length); } },
  { has: "Ngọn hải đăng O chiếu ra bốn luồng sáng thẳng", right: () => String(C2(4)) },
  { has: "số học sinh vắng mặt của lớp 6C (lớp có 32 học sinh)", right: (q) => theo(q, /^(\d+)$/, (k) => +k[1] > 32) },
  { has: "số lượt mượn sách của thư viện trường trong bốn ngày", right: (q) => { const b = bang(q, /(thứ \S+) (\d+) lượt/g).sort((a, c) => c[1] - a[1]); return b[0][0][0].toUpperCase() + b[0][0].slice(1); } },
  { has: "mỗi biểu tượng ứng với 5 cây. Lan cần vẽ", right: () => String(bang({ q: "Tổ 1: 15 cây, Tổ 2: 20 cây, Tổ 3: 20 cây, Tổ 4: 10 cây" }, /(Tổ \d): (\d+) cây/g).reduce((s, c) => s + c[1] / 5, 0)),
    more: (q) => assert.ok(q.q.includes("Tổ 1: 15 cây, Tổ 2: 20 cây, Tổ 3: 20 cây, Tổ 4: 10 cây")) },
  { has: "cách đến trường của các học sinh lớp 6D (mỗi bạn chỉ đến trường bằng một cách)", right: (q) => {
    const t = tranh(q.svg), d = Object.fromEntries(t.hang.map(([n, c]) => [n, c * t.k])); assert.equal(t.don, "bạn"); const ca = Object.values(d).reduce((s, v) => s + v, 0);
    assert.deepEqual(Object.keys(d), ["Đi bộ", "Xe đạp", "Xe buýt", "Bố mẹ đưa"]);
    return [ca === 40, d["Xe đạp"] === 2 * d["Đi bộ"], pct(F(d["Xe buýt"]), F(ca)) === "15%", d["Đi bộ"] - d["Bố mẹ đưa"] === 4];
  } },
  { has: "Số sản phẩm thủ công bốn tổ", right: (q) => { const v = soLieu(q); return fmtDec(div(F(v.reduce((s, x) => s + x, 0)), F(v.length))) + " sản phẩm"; } },
  { has: "câu lạc bộ cờ vua của một trường trong bốn năm học", right: (q) => { const v = soLieu(q), d = v.slice(1).map((x, i) => x - v[i]); assert.equal(new Set(d).size, 1); assert.notEqual(v[3], 2 * v[0]);
    return `Số học sinh tăng đều, mỗi năm thêm ${d[0]} học sinh`; } },
  { has: "Biểu đồ cột cho biết số sách một thư viện cho mượn trong năm tháng đầu năm", right: (q) => { const d = cotDo(q.svg), v = d.map((c) => c[1]); assert.deepEqual(d.map((c) => c[0]), ["1", "2", "3", "4", "5"]); assert.ok(texts(q.svg).some((t) => t.t === "(Tháng)"), "chú thích trục ngang"); const tang = v.slice(1).every((x, i) => x > v[i]);
    assert.deepEqual(q.o, ["Tháng 4 thư viện cho mượn nhiều sách nhất", "Số sách cho mượn tăng dần từ tháng 1 đến tháng 5", "Tổng số sách cho mượn trong năm tháng là 700 quyển", "Số sách cho mượn tháng 4 gấp đôi tháng 3"]);
    return [v.indexOf(Math.max(...v)) === 3, tang, v.reduce((s, x) => s + x, 0) === 700, v[3] === 2 * v[2]]; } },
  { has: "nhiệt độ cao nhất và nhiệt độ thấp nhất trong một ngày đo được ở ba trạm khí tượng A, B, C", right: (q) => { const d = cotDo(q.svg); assert.deepEqual(keys(q.svg), ["Cao nhất", "Thấp nhất"]);
    const t = d.map(([n, [cao, thap]]) => [n, cao - thap]).sort((a, b) => b[1] - a[1]); assert.equal(t.length, 3); assert.ok(t[0][1] > t[1][1]); return t[0][0]; } },
  { has: "Khi tung một đồng xu, có hai kết quả có thể", right: () => true },
  { has: "bốn tấm thẻ ghi các số 2; 4; 6; 8", right: (q) => { const the = [2, 4, 6, 8], f = { "Rút được thẻ ghi số chẵn": (v) => v % 2 === 0, "Rút được thẻ ghi số 5": (v) => v === 5, "Rút được thẻ ghi số lớn hơn 5": (v) => v > 5 };
    return q.l.map((l) => { const k = the.filter(f[l]).length; return k === the.length ? "Chắc chắn xảy ra" : k === 0 ? "Không bao giờ xảy ra" : "Có thể xảy ra"; }); } },
  { has: "gieo một con xúc xắc 30 lần và ghi lại kết quả", right: (q) => {
    const L = Object.fromEntries([...q.q.matchAll(/mặt (\d) chấm (\d+) lần/g)].map((m) => [+m[1], +m[2]])), n = Object.values(L).reduce((s, v) => s + v, 0); assert.equal(n, 30);
    assert.deepEqual(q.o, ["Xác suất thực nghiệm của sự kiện “Gieo được mặt 5 chấm” là 7/30", "Xác suất thực nghiệm của sự kiện “Gieo được mặt có số chấm chẵn” là 1/2", "Sự kiện “Gieo được mặt 4 chấm” xảy ra ít lần nhất", "Xác suất thực nghiệm của sự kiện “Gieo được mặt 1 chấm” là 4/26"]);
    const min = Math.min(...Object.values(L)); assert.equal(Object.values(L).filter((v) => v === min).length, 1);
    return [eq(F(L[5], n), fr("7/30")), eq(F(L[2] + L[4] + L[6], n), fr("1/2")), L[4] === min, eq(F(L[1], n), fr("4/26"))];
  } },
  { has: "theo dõi thời tiết trong 24 ngày và thấy có 15 ngày trời nắng", right: () => fmtAns(F(24 - 15, 24)) },
  { has: "Tâm làm như vậy 72 lần", right: () => toNum(ev("72 · 4/9")) },
  { has: "dây chuyền A có 6 sản phẩm bị lỗi trong 200 sản phẩm được kiểm tra, dây chuyền B có 5 sản phẩm bị lỗi trong 120", right: () => { const c = cmp(F(6, 200), F(5, 120)); return c < 0 ? "Dây chuyền B" : c > 0 ? "Dây chuyền A" : "Hai dây chuyền bằng nhau"; },
    more: (q) => assert.ok(q.x.includes("= 18/600") && q.x.includes("= 25/600")) }
];

let n = 0;
const run = (id, qs, checks) => {
  assert.equal(qs.length, checks.length, id + ": số câu khác số kiểm tra");
  qs.forEach((q, i) => {
    const c = checks[i], at = id + "#" + (i + 1);
    assert.ok(q.q.includes(c.has), at + ": đề không có “" + c.has + "”");
    if (q.type === "essay") {
      assert.ok(c.essay, at + ": tự luận cần kiểm tra thang chấm"); c.essay(q);
      assert.ok(q.rubric.every((r) => r.p > 0 && Number.isInteger(r.p * 4)) && q.rubric.reduce((s, r) => s + r.p, 0) === 2, at + ": thang chấm 2 điểm, mỗi ý chia hết cho 0,25");
      assert.ok(/^Đáp số: .+$/m.test(q.x), at + ": gợi ý ghi đáp số"); n++; return;
    }
    const want = c.right(q);
    const got = { fill: () => q.ans[0], tf: () => q.a, tf4: () => q.a, num: () => q.ans, match: () => q.r.slice(0, q.l.length), order: () => q.o }[q.type] || (() => q.o[0]);
    // so bằng JSON: câu hỏi nạp trong vm khác (tests/nap-de.js), mảng của nó không cùng nguyên mẫu với mảng ở đây
    assert.strictEqual(JSON.stringify(got()), JSON.stringify(want), at + ": đáp án " + JSON.stringify(got()) + ", tính được " + JSON.stringify(want));
    if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), at + ": nhiễu trùng đáp án đúng");
    // các lựa chọn đều là số (phân số, số thập phân, kèm đơn vị) thì không có hai lựa chọn bằng nhau về giá trị (−2/4 và −1/2)
    const soLC = q.type === "mc" ? q.o.map((o) => { try { return fr(o.replace(/ (?:[^\d\s]\S*)$/, "")); } catch (e) { return null; } }) : [];
    if (soLC.length && soLC.every(Boolean)) soLC.forEach((a, k) => soLC.slice(k + 1).forEach((b) => assert.ok(!eq(a, b), at + ": hai lựa chọn bằng nhau về giá trị")));
    if (q.type === "tf4") assert.ok(want.includes(true) && want.includes(false), at + ": đúng/sai 4 ý nên có cả ý đúng và ý sai");
    if (c.more) c.more(q);
    n++;
  });
};
for (const [id, checks] of [["toan6-ck2-de1", de1], ["toan6-ck2-de2", de2]]) {
  const b = bank(id); assert.ok(b, "thiếu " + id); assert.equal(b.questions.length, 25);
  run(id, b.questions, checks);
}
const pool = bank(POOL), mine = pool.questions.filter((q) => q.src === POOL);
run(POOL, mine, own);
// tự thử vài bộ đọc với giá trị biết trước
assert.ok(eq(ev("−8/−20"), F(2, 5)) && stmt("−5/7 < −4/7") && !stmt("7/9 < 7/10") && stmt("3,40 = 3,4"));
assert.equal(fmtDec(roundTo(fr("−6,248"), 2), 2), "−6,25"); assert.equal(fmtAns(roundTo(fr("3 509,4"), -2)), "3500");
assert.deepEqual([1, 2, 3, 4, 5, 6, 9].map(kim), [30, 60, 90, 120, 150, 180, 90]);
assert.deepEqual([35, 90, 145, 180].map(loaiGoc), ["Góc nhọn", "Góc vuông", "Góc tù", "Góc bẹt"]);
assert.ok(trongGoc([2, -1], [0, 0], [1, 0], [0, -1]) && !trongGoc([-1, -1], [0, 0], [1, 0], [0, -1]) && !trongGoc([0, -2], [0, 0], [1, 0], [0, -1]));

/* ---------- mức độ và ma trận ---------- */
assert.ok(pool.questions.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => F(v[k]))).n), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
// chủ đề Bài 23–35 đúng chữ của kho giữa kì II (kết quả cũ, “chủ đề hay sai” gộp theo chữ chủ đề)
const gk2 = Object.keys(bank("toan6-gk2-ngau-nhien").pool.matrix);
assert.deepEqual(Object.keys(M).slice(0, 11), gk2, "11 chủ đề đầu đúng chữ, đúng thứ tự của toan6-gk2-ngau-nhien");
assert.deepEqual(Object.keys(M).slice(11), ["Góc, số đo góc", "Dữ liệu, biểu đồ tranh", "Biểu đồ cột, biểu đồ cột kép", "Xác suất thực nghiệm"]);
const nhom = (ts) => ts.reduce((s, t) => s + M[t].reduce((a, b) => a + b, 0), 0);
assert.deepEqual([nhom(gk2.slice(0, 5)), nhom(gk2.slice(5, 9)), nhom(gk2.slice(9).concat("Góc, số đo góc")), nhom(Object.keys(M).slice(12))], [5, 5, 8, 7], "phân số 5, số thập phân 5, hình học 8, dữ liệu và xác suất 7");
// hai đề cố định chia đúng ma trận
pool.pool.from.forEach((id) => Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => bank(id).questions.filter((q) => q.topic === t && q.lv === l).length), v, id + " không đúng ma trận ở chủ đề " + t)));
// mỗi ô có ít nhất gấp đôi số câu ô đó rút; ngoài mỗi đề cố định vẫn đủ số câu ô rút; câu riêng nào cũng nằm trong một ô có số câu của ma trận
Object.entries(M).forEach(([t, v]) => v.forEach((k, i) => {
  const have = pool.questions.filter((q) => q.topic === t && q.lv === i + 1);
  assert.ok(have.length >= 2 * k, `ô (${t}, mức ${i + 1}) rút ${k} câu mà kho chỉ có ${have.length}`);
  pool.pool.from.forEach((id) => assert.ok(have.filter((q) => q.src !== id).length >= k, `ô (${t}, mức ${i + 1}) ngoài ${id} chỉ còn ${have.filter((q) => q.src !== id).length} câu`));
  assert.ok(mine.filter((q) => q.topic === t && q.lv === i + 1).length >= k, `ô (${t}, mức ${i + 1}): câu riêng ít hơn số câu ô rút`);
}));
mine.forEach((q, i) => assert.ok(M[q.topic] && M[q.topic][q.lv - 1] > 0, `${POOL}#${i + 1}: ô (${q.topic}, mức ${q.lv}) không có trong ma trận`));
// câu tự luận chỉ ở các ô Vận dụng rút 1 câu, nhiều nhất hai ô: mỗi lần rút nhiều nhất 2 câu tự luận
const oTuLuan = [...new Set(pool.questions.filter((q) => q.type === "essay").map((q) => q.topic + "|" + q.lv))];
assert.ok(oTuLuan.length <= 2 && oTuLuan.every((k) => { const [t, lv] = k.split("|"); return +lv === 3 && M[t][2] === 1 && pool.questions.some((q) => q.topic === t && q.lv === 3 && q.type !== "essay"); }), "câu tự luận: " + oTuLuan);
const dem = (f) => pool.questions.filter(f).length;
assert.deepEqual([dem((q) => q.type === "essay"), dem((q) => q.svg), dem((q) => q.type === "tf4"), dem((q) => q.type === "num")], [4, 16, 12, 20], "kho: 4 tự luận, 16 câu có hình, 12 đúng/sai 4 ý, 20 trả lời bằng số");
assert.ok(dem((q) => q.type === "match") >= 3 && dem((q) => q.type === "order") >= 3, "kho có nối cột, sắp xếp");
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

/* ---------- đề bài không trùng câu nào khác trong data/banks/6-toan.js (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const goc6 = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const deBai = BANKS.filter((b) => b.file === "6-toan.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc6(q.q) })));
deBai.filter((d) => /^toan6-ck2-/.test(d.at)).forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });

/* ---------- dò lộ đáp án (Rút ra N5, N24, N8; bộ dò theo tests/toan6-gk1.js) giữa hai câu rút được cùng lúc: khác ô (chủ đề, mức),
   hoặc cùng một ô rút từ 2 câu. Ngân hàng phân số có cùng một phân số ở nhiều đề bài, nên đáp án là số (từ hai chữ số), phân số, số
   thập phân, số kèm đơn vị chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”, “bằng”, “được”); cặp nối: câu kia có cả hai vế.
   Đáp án bằng chữ (“Điểm D”, “Góc vuông”…) có ở câu kia thì chỉ in ra khi chạy với DO_LO=1 để người làm xem (thường là chữ chung của
   hai câu về hai hình, hai bảng khác nhau), danh sách đã xem ghi ở DA_XEM. ---------- */
const val = (s) => +String(s).replace(/\s/g, "");
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null ? [] : [].concat(q.ans), q.l || [], q.r || [], (q.rubric || []).map((c) => c.c)).map(String);
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*)(?!\d|,\d|\/|°|%|[⁰¹²³⁴⁵⁶⁷⁸⁹]|\s*[·+−:](?:\s|\d|\())/gu)].map((m) => val(m[1]));
const kqLa = (s, a) => new RegExp("(?:=|(?:^|[\\s(])(?:là|bằng|được))\\s+" + a.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + "(?![\\d/,]|\\s*[·+−:](?:\\s|\\d|\\())", "u").test(s);
// số đo của góc vuông, góc bẹt là kiến thức chung: lời giải câu nào về góc cũng có thể nhắc, không tính là lộ cặp nối
const CHUNG = ["90° → Góc vuông", "180° → Góc bẹt"];
const cungLuc = (p, q) => p.topic !== q.topic || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2;
const doLo = (qs) => {
  const lo = [], chuLo = [];
  qs.forEach((q, i) => {
    const so = [], kq = [], cum = [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const them = (a) => (/^\d{1,3}(?: \d{3})*(?: [^\d\s]+)?$/.test(a) && !/°$/.test(a) ? so.push(val(a.split(/ (?=[^\d\s])/)[0])) : /^[−-]?\d[\d ,/]*%?(?: [^\d\s]+)?$/.test(a) ? kq.push(a.replace(/ .*$/, "").replace("-", "−")) : cum.push(a));
    if (q.type === "essay") (/Đáp số: (.+)$/m.exec(q.x)[1].match(/\d{1,3}(?: \d{3})*/g) || []).forEach((x) => so.push(val(x)));
    else if (q.type === "num") them(String(q.ans).replace(".", ",")); else if (q.type === "fill") them(String(q.ans[0])); else if (q.type === "mc") them(q.o[0]);
    qs.forEach((p, j) => {
      if (j === i || !cungLuc(p, q)) return;
      const C = chu(p), T = C.map((s) => s.toLowerCase()), at = `${p.src}#${p.src === POOL ? j + 1 : j + 1 - mine.length - (p.src === pool.pool.from[1] ? 25 : 0)} lộ đáp án ${q.src}#${q.src === POOL ? i + 1 : i + 1 - mine.length - (q.src === pool.pool.from[1] ? 25 : 0)}: `;
      so.filter((x) => x >= 10 && C.flatMap(soKQ).includes(x)).forEach((x) => lo.push(at + x));
      kq.filter((a) => C.some((s) => kqLa(s, a))).forEach((a) => lo.push(at + a));
      cap.filter(([l, r]) => !CHUNG.includes(l + " → " + r) && T.some((t) => t.includes(l.toLowerCase()) && t.includes(r.toLowerCase()))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      cum.filter((s) => T.some((t) => t.includes(s.toLowerCase()))).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const { lo, chuLo } = doLo(pool.questions);
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuLo.join("\n"));
// đã xem (Phiên N18): chữ chung của hai câu về hai hình, hai bảng khác nhau (“điểm D” của điểm dừng xe buýt, cột D và của lưới ô vuông,
// “điểm M” của thanh gỗ và của góc, “thứ tư” của năm học, tháng), kiến thức chung (góc vuông, hai tia đối nhau), số đo là lựa chọn sai của câu khác
const DA_XEM = ["own#28 → own#26: Điểm D", "de2#12 → own#26: Điểm D", "own#23 → own#32: Điểm M", "own#27 → own#32: Điểm M", "de1#11 → own#32: Điểm M",
  "de2#14 → own#32: Điểm M", "own#42 → own#38: Thứ Tư", "de2#20 → own#38: Thứ Tư", "de2#22 → own#38: Thứ Tư", "own#29 → de1#16: Góc vuông",
  "own#34 → de1#16: Góc vuông", "de2#16 → de1#16: Góc vuông", "own#24 → de2#11: Hai tia đối nhau", "de1#15 → de2#17: 120°"];
const gon = (s) => s.replace(/toan6-ck2-ngau-nhien/g, "own").replace(/toan6-ck2-(de\d)/g, "$1").replace(/ lộ đáp án /, " → ");
assert.deepEqual(chuLo.map(gon), DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= −2/5”, “là 35%”, “= 5,5 cm”, cả hai vế một cặp nối
const gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x }), d1 = bank("toan6-ck2-de1").questions, d2 = bank("toan6-ck2-de2").questions;
const thuLo = (qs) => doLo(qs.map((q) => Object.assign({ src: "thử" }, q))).lo.map((s) => s.replace(/^.*: /, ""));
assert.deepEqual(thuLo([d1[3], gia(d1[0], "Ví dụ: (−3/4) · 8/15 = −2/5.")]), ["−2/5"]);
assert.deepEqual(thuLo([d1[8], gia(d1[0], "Tỉ số là 35%.")]), ["35%"]);
assert.deepEqual(thuLo([d1[12], gia(d1[0], "Ví dụ CI = 5,5 cm.")]), ["5,5"]);
assert.deepEqual(thuLo([d2[15], gia(d1[0], "Góc 35° là góc nhọn.")]), ["35° → Góc nhọn"]);
assert.deepEqual(thuLo([d1[4], gia(d1[0], "Tổng số sách là 1 200 cuốn.")]), [1200]);
console.log(n, "câu đã tính lại (50 câu của 2 đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + pool.questions.length + " câu; trung bình " + (essays / 400).toFixed(2) + " câu tự luận mỗi lần rút.");
console.log("MATH OK");
