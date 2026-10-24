// Tính lại đáp án ngân hàng Toán 6 giữa kì I (data/banks/6-toan.js): hai đề cố định toan6-gk1-de1 (chỉ Chương I–II),
// toan6-gk1-de2, các câu riêng của đề ngẫu nhiên toan6-gk1-ngau-nhien (Phiên N24) và hai đề cố định toan6-gk1-de3, toan6-gk1-de4
// cho trường dạy song song số và hình (Chương I, II, IV; Phiên N26). Mỗi câu: kiểm tra đề có đúng số liệu (has)
// rồi so đáp án với kết quả tính bằng code: trắc nghiệm o[0], điền khuyết ans[0], đúng/sai a, đúng/sai 4 ý a (4 ý), trả lời bằng
// số ans, nối cột r[i] của từng ô l[i], sắp xếp thứ tự o; tự luận: các số trong thang chấm và đáp án gợi ý. Câu có hình: đọc toạ
// độ, chữ trong hình (tia số, trục số, nhiệt kế, bảng, phân tích ra thừa số nguyên tố theo sơ đồ cột; Đề 3, Đề 4: hình chữ nhật,
// hình thang cân, hình bình hành, hình thoi ghi số đo, lục giác đều ghép từ sáu tam giác đều, tấm bìa cắt bốn góc, mặt trước
// ngôi nhà) rồi mới tính.
// Cuối cùng kiểm tra mức độ và ma trận: mọi câu có lv; Đề 1 chỉ có bốn chủ đề của Chương I–II, không có số âm; Đề 2 chia đúng
// theo ma trận; mỗi ô (chủ đề, mức) có ít nhất gấp đôi số câu ô đó rút; rút thử nhiều lần ra đúng 10 Biết, 8 Hiểu, 7 Vận dụng,
// nhiều nhất 2 câu tự luận. Đề 3, Đề 4: không nằm trong kho của đề ngẫu nhiên; số câu từng chủ đề 3 – 4 – 5 – 5 – 4 – 4,
// 10 – 8 – 7, ít nhất 10 câu trả lời bằng số hoặc điền khuyết, 3 câu tự luận Vận dụng, khoảng 4 câu có hình, không có số âm,
// đề bài không trùng câu nào trong data/banks/6-toan.js, không câu nào lộ đáp án của câu khác cùng đề.
// Chạy: node tests/toan6-gk1.js → in MATH OK.
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan6-gk1-ngau-nhien", DE1 = "toan6-gk1-de1", DE2 = "toan6-gk1-de2", DE3 = "toan6-gk1-de3", DE4 = "toan6-gk1-de4";

/* ---------- số ---------- */
const fmt = (n) => { assert.ok(Number.isInteger(n), "không phải số nguyên: " + n); return (n < 0 ? "−" : "") + String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " "); }; // số nguyên kiểu Việt Nam, dấu trừ "−"
const val = (s) => +String(s).replace(/\s/g, "").replace(/−/g, "-");
const div = (a, b) => { assert.equal(a % b, 0, a + " : " + b + " có dư"); return a / b; };
const sum = (a) => a.reduce((s, v) => s + v, 0);
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const gcd = (...a) => a.reduce((x, y) => { x = Math.abs(x); y = Math.abs(y); while (y) [x, y] = [y, x % y]; return x; });
const lcm = (...a) => a.reduce((x, y) => (x * y) / gcd(x, y));
const isPrime = (n) => n > 1 && range(2, Math.floor(Math.sqrt(n))).every((d) => n % d);
const divisors = (n) => range(1, n).filter((d) => n % d === 0);
const digitSum = (n) => sum(String(n).split("").map(Number));
const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹", sup = (n) => String(n).split("").map((d) => SUP[+d]).join("");
// phân tích ra thừa số nguyên tố, viết như trong đề: "2³ · 3 · 5"
const factor = (n) => { const f = []; for (let p = 2; n > 1; p++) { let k = 0; while (n % p === 0) { n /= p; k++; } if (k) f.push(p + (k > 1 ? sup(k) : "")); } return f.join(" · "); };
// giá trị biểu thức viết như trong đề: "150 − [(36 : 4 + 3) · 2²]", "(−3) · (−4)"; chữ cái thay bằng số (vars)
const ev = (e, vars) => {
  let s = String(e).replace(/(\d) (?=\d{3}\b)/g, "$1").replace(/·/g, "*").replace(/:/g, "/").replace(/−/g, "-").replace(/[[{]/g, "(").replace(/[\]}]/g, ")");
  s = s.replace(/([0-9)])([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, (m, b, p) => b + "**" + p.split("").map((c) => SUP.indexOf(c)).join(""));
  Object.entries(vars || {}).forEach(([k, v]) => (s = s.replace(new RegExp("\\b" + k + "\\b", "g"), "(" + v + ")")));
  assert.ok(/^[\d\s+\-*/().]+$/.test(s), "biểu thức lạ: " + e);
  return Function("return " + s)();
};
// hai vế của một đẳng thức "… = …"
const eq = (s) => { const [a, b] = s.split(" = "); return ev(a) === ev(b); };
const ROMAN = [["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]];
const toRoman = (n) => ROMAN.reduce((s, [r, v]) => { while (n >= v) { s += r; n -= v; } return s; }, "");
const fromRoman = (s) => { const n = range(1, 30).find((k) => toRoman(k) === s); assert.ok(n, "số La Mã từ 1 đến 30 (chương trình lớp 6): " + s); return n; };

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const lines = (svg) => [...svg.matchAll(/<line [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { a: [+a.x1, +a.y1], b: [+a.x2, +a.y2] }; });
const rects = (svg) => [...svg.matchAll(/<rect [^>]*>/g)].map((m) => attrs(m[0]));
const dots = (svg) => [...svg.matchAll(/<circle [^>]*>/g)].map((m) => { const a = attrs(m[0]); return [+a.cx, +a.cy]; });
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { at: [+a.x, +a.y], t: m[2], bold: a["font-weight"] === "700", anchor: a["text-anchor"] || "start" }; });
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const nhan = (svg, name) => { const t = texts(svg).filter((x) => x.t === name); assert.equal(t.length, 1, "hình cần đúng một nhãn " + name); return t[0].at; };
const dinh = (pts, svg, name) => { const at = nhan(svg, name); return pts.slice().sort((p, q) => dist(p, at) - dist(q, at))[0]; }; // điểm gần nhãn nhất
// trục số (tia số) nằm ngang: vạch dọc cách đều, nhãn "0" và nhãn của vạch kế bên phải (1 trên trục số, 5 trên tia số) → giá trị của điểm có nhãn
const truc = (svg, buoc) => {
  const ticks = lines(svg).filter((l) => l.a[0] === l.b[0]).map((l) => l.a[0]).sort((a, b) => a - b);
  const x0 = nhan(svg, "0")[0], u = nhan(svg, String(buoc))[0] - x0;
  assert.ok(ticks.includes(x0) && ticks.includes(x0 + u), "nhãn 0 và " + buoc + " đặt đúng hai vạch liền nhau");
  ticks.slice(1).forEach((t, i) => assert.equal(t - ticks[i], u, "các vạch cách đều"));
  return { ticks, at: (name) => { const p = dinh(dots(svg), svg, name); assert.ok(ticks.includes(p[0]), "điểm " + name + " nằm trên một vạch"); return (p[0] - x0) / u * buoc; } };
};
// nhiệt kế đứng: vạch ngang cách đều, nhãn số đặt ngay cạnh vạch (y của chữ = y của vạch + 5), mỗi vạch 1 °C; mực chất lỏng là
// cạnh trên của hình chữ nhật màu "bad"
const nhietKe = (svg) => {
  const L = lines(svg).filter((l) => l.a[1] === l.b[1]), x1 = Math.min(...L.map((l) => l.a[0])), ys = L.filter((l) => l.a[0] === x1).map((l) => l.a[1]).sort((a, b) => a - b);
  ys.slice(1).forEach((y, i) => assert.equal(y - ys[i], ys[1] - ys[0], "vạch chia đều"));
  const lab = texts(svg).filter((t) => /^−?\d+$/.test(t.t)).map((t) => ({ y: t.at[1] - 5, v: val(t.t) })).sort((a, b) => a.y - b.y);
  assert.ok(lab.length >= 2 && lab.every((t) => ys.includes(t.y)), "nhãn số đặt đúng vạch");
  const step = (lab[1].y - lab[0].y) / (lab[1].v - lab[0].v); // số px ứng với 1 °C (âm: lên trên là tăng)
  assert.equal(-step, ys[1] - ys[0], "mỗi vạch chia ứng với 1 °C");
  lab.forEach((t) => assert.equal(lab[0].v + (t.y - lab[0].y) / step, t.v, "nhãn " + t.v + " đúng thang chia"));
  const liq = rects(svg).filter((r) => r.fill === "bad"); assert.equal(liq.length, 1, "một cột chất lỏng");
  assert.ok(ys.includes(+liq[0].y), "mực chất lỏng dừng đúng một vạch");
  return lab[0].v + (+liq[0].y - lab[0].y) / step;
};
// bảng: các hàng từ trên xuống, mỗi hàng là các chữ theo thứ tự từ trái sang phải; bỏ hàng tiêu đề (chữ đậm ở mọi ô)
const bang = (svg) => {
  const rows = {};
  texts(svg).forEach((t) => (rows[t.at[1]] = rows[t.at[1]] || []).push(t));
  return Object.keys(rows).map(Number).sort((a, b) => a - b).map((y) => rows[y].sort((a, b) => a.at[0] - b.at[0])).filter((r) => !r.every((t) => t.bold)).map((r) => r.map((t) => t.t));
};
// phân tích ra thừa số nguyên tố theo sơ đồ cột (tên trong SGK Toán 6, Bài 10): cột trái (số bị chia) và cột phải (thừa số
// nguyên tố) hai bên một đường dọc
const soDoCot = (svg) => {
  const v = lines(svg).filter((l) => l.a[0] === l.b[0]); assert.equal(v.length, 1, "một đường kẻ dọc"); const xm = v[0].a[0], T = texts(svg);
  const col = (f) => T.filter((t) => f(t.at[0])).sort((a, b) => a.at[1] - b.at[1]), L = col((x) => x < xm), R = col((x) => x > xm);
  assert.equal(L.length, R.length + 1); R.forEach((t, i) => assert.equal(t.at[1], L[i].at[1], "thừa số đứng cùng hàng với số bị chia"));
  const l = L.map((t) => +t.t), r = R.map((t) => +t.t);
  r.forEach((p, i) => { assert.ok(isPrime(p), p + " phải là số nguyên tố"); assert.equal(l[i + 1], div(l[i], p)); });
  assert.equal(l[l.length - 1], 1, "cột trái kết thúc bằng 1"); assert.deepEqual(r, r.slice().sort((a, b) => a - b), "thừa số xếp từ bé đến lớn");
  return { n: l[0], primes: r };
};
/* hình phẳng của Đề 3, Đề 4 (Chương IV, Phiên N26) */
const nums = (s) => s.trim().split(/[\s,]+/).map(Number);
const polys = (svg) => [...svg.matchAll(/<polygon [^>]*>/g)].map((m) => nums(attrs(m[0]).points).reduce((o, v, i) => (i % 2 ? o[o.length - 1].push(v) : o.push([v]), o), []));
const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
const dot = (u, v) => u[0] * v[0] + u[1] * v[1];
const cross = (u, v) => u[0] * v[1] - u[1] * v[0];
const close = (x, y, e) => Math.abs(x - y) <= (e || 1e-6) * Math.max(1, Math.abs(x), Math.abs(y));
const songSong = (u, v) => Math.abs(cross(u, v)) <= 1e-3 * Math.hypot(...u) * Math.hypot(...v);
const vuongGoc = (u, v) => Math.abs(dot(u, v)) <= 1e-3 * Math.hypot(...u) * Math.hypot(...v);
const gocDo = (u, v) => Math.acos(dot(u, v) / Math.hypot(...u) / Math.hypot(...v)) * 180 / Math.PI;
const sides = (P) => P.map((p, i) => sub(P[(i + 1) % P.length], p));
const dienTich = (P) => Math.abs(sum(P.map((p, i) => cross(p, P[(i + 1) % P.length])))) / 2;
const chuVi = (P) => sum(sides(P).map((v) => Math.hypot(...v)));
const goc = (P) => P.map((p, i) => gocDo(sub(P[(i + P.length - 1) % P.length], p), sub(P[(i + 1) % P.length], p))); // góc trong của đa giác lồi
const segDist = (p, a, b) => { const ab = sub(b, a), t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / dot(ab, ab))); return dist(p, [a[0] + t * ab[0], a[1] + t * ab[1]]); };
const tuGiac = (svg, names) => { // đa giác duy nhất trong hình, đỉnh có tên → {A: [x, y], …} (thứ tự đỉnh như trong polygon)
  const ps = polys(svg); assert.equal(ps.length, 1, "hình cần đúng một đa giác"); assert.equal(ps[0].length, names.length);
  const o = {}; names.forEach((n, i) => { o[n] = dinh(ps[0], svg, n); assert.deepEqual(o[n], ps[0][i], "đỉnh " + n + " phải đứng thứ " + (i + 1) + " trong polygon"); });
  return o;
};
// số đo ghi trong hình ("13 cm"): mỗi nhãn thuộc đoạn thẳng gần nó nhất trong segs ({AB: [A, B], …}), gần hơn hẳn đoạn kế tiếp
// (cách ít nhất 5 px); các đoạn có nhãn cùng một tỉ lệ (hình vẽ đúng tỉ lệ) → { AB: 13, … }. Chữ cỡ 15: mỗi kí tự rộng khoảng 8 px.
const soDo = (svg, segs, unit) => {
  const out = {}, k = [];
  texts(svg).filter((t) => new RegExp("^\\d+ " + unit + "$").test(t.t)).forEach((t) => {
    const w = 8 * t.t.length, c = [t.at[0] + (t.anchor === "middle" ? 0 : t.anchor === "end" ? -w / 2 : w / 2), t.at[1] - 5];
    const near = Object.keys(segs).map((n) => [n, segDist(c, ...segs[n])]).sort((a, b) => a[1] - b[1]), name = near[0][0];
    assert.ok(near[1][1] - near[0][1] >= 5, `nhãn “${t.t}” gần cả ${near[0][0]} lẫn ${near[1][0]}`);
    assert.ok(!(name in out), "hai nhãn cùng ghi đoạn " + name); out[name] = parseInt(t.t, 10); k.push(dist(...segs[name]) / out[name]);
  });
  k.forEach((x) => assert.ok(close(x, k[0], 1e-3), `hình vẽ đúng tỉ lệ (${k.join("; ")} px một ${unit})`));
  return out;
};
// lục giác đều ghép từ sáu tam giác đều chung một đỉnh O: mỗi tam giác đều, sáu đỉnh ngoài tạo lục giác đều (sáu cạnh bằng nhau,
// sáu góc 120°, ba đường chéo chính đi qua O), mỗi cạnh của lục giác là cạnh của đúng một tam giác → { O, V (đỉnh ngoài theo
// vòng), s (độ dài cạnh, px) }
const lucGiac = (svg) => {
  const T = polys(svg); assert.equal(T.length, 6, "sáu tam giác"); T.forEach((t) => assert.equal(t.length, 3, "mỗi đa giác là một tam giác"));
  const key = (p) => p.join(","), cnt = {}; T.flat().forEach((p) => (cnt[key(p)] = (cnt[key(p)] || 0) + 1));
  const O = T[0].find((p) => cnt[key(p)] === 6); assert.ok(O, "sáu tam giác chung một đỉnh");
  const ang = (p) => Math.atan2(p[1] - O[1], p[0] - O[0]);
  const V = Object.keys(cnt).filter((k) => cnt[k] === 2).map((k) => k.split(",").map(Number)).sort((a, b) => ang(a) - ang(b));
  assert.equal(V.length, 6, "sáu đỉnh ngoài, mỗi đỉnh chung cho hai tam giác"); const s = dist(V[0], V[1]);
  T.forEach((t) => sides(t).forEach((v) => assert.ok(close(Math.hypot(...v), s, 1e-3), "tam giác đều, cạnh bằng cạnh lục giác")));
  sides(V).forEach((v) => assert.ok(close(Math.hypot(...v), s, 1e-3), "lục giác có sáu cạnh bằng nhau"));
  goc(V).forEach((g) => assert.ok(close(g, 120, 1e-3), "mỗi góc của lục giác đều bằng 120°"));
  [0, 1, 2].forEach((i) => assert.ok(segDist(O, V[i], V[i + 3]) < 0.01, "đường chéo chính đi qua O"));
  V.forEach((p, i) => assert.equal(T.filter((t) => [p, V[(i + 1) % 6]].every((q) => t.some((r) => dist(q, r) < 0.01))).length, 1, "cạnh lục giác là cạnh của đúng một tam giác"));
  return { O, V, s };
};
// đường cao vẽ nét đứt từ đỉnh P xuống cạnh XY: đầu kia là chân đường cao (nhãn H), nằm trên đoạn XY, vuông góc với XY
const duongCao = (svg, P, X, Y) => {
  const L = lines(svg); assert.equal(L.length, 1, "một đường cao"); const ends = [L[0].a, L[0].b];
  assert.deepEqual(dinh(ends, svg, "H"), ends.find((e) => dist(e, P) > 0.01), "nhãn H ở chân đường cao"); const H = ends.find((e) => dist(e, P) > 0.01);
  assert.ok(ends.some((e) => dist(e, P) < 0.01) && segDist(H, X, Y) < 0.01 && vuongGoc(sub(P, H), sub(Y, X)), "đường cao vuông góc với cạnh, chân nằm trên cạnh");
  return H;
};

/* ---------- kiểm tra từng câu ----------
   right(q): đáp án tính bằng code (so với o[0], ans[0], a, ans, r của từng ô trái, o); more(q): kiểm tra thêm (nhiễu, bước giải, hình). */
const has = (q, list) => list.forEach((s) => assert.ok(q.x.includes(s), "lời giải thiếu " + s));
const de1 = [
  { has: "Tập hợp các chữ số của số 2 026", right: () => "{" + [...new Set("2026".split(""))].sort().join("; ") + "}" },
  { has: "Số 0 thuộc tập hợp ℕ*", right: () => range(1, 100).includes(0) },
  { has: "Số 29 được viết bằng số La Mã", right: () => toRoman(29), more: (q) => { // nhiễu đều là số La Mã đúng: nhầm IX với IV, thiếu một X, kém 1
    assert.deepEqual(q.o.slice(1).map(fromRoman), [24, 19, 28]); has(q, q.o.slice(1).map((o) => o + " là " + fromRoman(o))); } },
  { has: "C = {x ∈ ℕ | 15 ≤ x ≤ 40}", right: () => String(range(0, 100).filter((x) => 15 <= x && x <= 40).length) },
  { has: "Sắp xếp các số La Mã sau", right: (q) => q.o.slice().sort((a, b) => fromRoman(a) - fromRoman(b)), more: (q) => assert.equal(new Set(q.o.map(fromRoman)).size, q.o.length) },
  { has: "5 thùng sữa, mỗi thùng 48 hộp", right: () => { const n = 5 * 48; return `${Math.floor(n / 18)} khay, thừa ${n % 18} hộp`; },
    more: (q) => { // nhiễu: sai số hộp (13 · 18 + 12, 14 · 18) hoặc số dư không nhỏ hơn số chia (12 · 18 + 24 = 240)
      assert.ok(13 * 18 + 12 !== 240 && 14 * 18 !== 240 && 12 * 18 + 24 === 240 && 24 >= 18); assert.equal(q.o.length, 4); } },
  { has: "1 080 học sinh tham gia trồng cây", right: () => div(1080 * 3, 45) },
  { has: "Số 10 000 viết dưới dạng lũy thừa của 10", right: () => "10" + sup(4), more: (q) => q.o.forEach((o, i) => assert.equal(ev(o) === 10000, i === 0, "lựa chọn " + o)) },
  { has: "chỉ có phép cộng và phép trừ, ta thực hiện", right: () => ev("20 − 5 + 3") === 18, more: () => assert.equal(20 - (5 + 3), 12) },
  { has: "3 · 2⁴ − 5²", right: () => String(ev("3 · 2⁴ − 5²")) },
  { has: "Mỗi đẳng thức sau đúng hay sai", right: (q) => q.o.map(eq), more: () => { assert.equal(ev("5⁰"), 1); assert.equal(ev("10² · 10³"), 10 ** 5); } },
  { has: "(2x − 3)³ = 125", right: () => { const m = range(0, 100).filter((x) => (2 * x - 3) ** 3 === 125); assert.equal(m.length, 1); return m[0]; } },
  { has: "3 kg táo giá 45 000 đồng", right: () => 500000 - (3 * 45000 + 2 * 120000), more: (q) => has(q, ["375 000"]) },
  { has: "Tập hợp các ước của 18", right: () => "{" + divisors(18).join("; ") + "}", more: (q) => q.o.slice(1).forEach((o) => assert.notEqual(o, "{" + divisors(18).join("; ") + "}")) },
  { has: "Số 0 và số 1 đều không phải là số nguyên tố", right: () => !isPrime(0) && !isPrime(1) },
  { has: "Nối mỗi số ở cột trái với dấu hiệu chia hết", right: (q) => {
    const T = { "Chữ số tận cùng là chữ số chẵn": (n) => (n % 10) % 2 === 0, "Chữ số tận cùng là 0 hoặc 5": (n) => [0, 5].includes(n % 10),
      "Tổng các chữ số chia hết cho 3": (n) => digitSum(n) % 3 === 0, "Tổng các chữ số chia hết cho 9": (n) => digitSum(n) % 9 === 0, "Chữ số tận cùng là 3 hoặc 9": (n) => [3, 9].includes(n % 10) };
    q.r.forEach((r) => assert.ok(T[r], "chưa có cách kiểm tra: " + r));
    // dấu hiệu chia hết cho d: đúng với mọi số tự nhiên đến 5 000 đúng khi số đó chia hết cho d
    return q.l.map((d) => { const m = q.r.filter((r) => range(0, 5000).every((n) => T[r](n) === (n % +d === 0))); assert.equal(m.length, 1, "dấu hiệu chia hết cho " + d); return m[0]; });
  } },
  { has: "Cho số 4 590", right: (q) => { const n = 4590;
    assert.deepEqual(q.o, ["4 590 chia hết cho cả 2 và 5.", "4 590 chia hết cho 9.", "4 590 là số nguyên tố.", "4 590 chia hết cho 45."]);
    return [n % 2 === 0 && n % 5 === 0, n % 9 === 0, isPrime(n), n % 45 === 0]; }, more: (q) => has(q, ["4 + 5 + 9 + 0 = 18", "4 590 : 45 = " + 4590 / 45]) },
  { has: "nhỏ nhất có ba chữ số chia hết cho cả 2, 3 và 5", right: () => String(range(100, 999).find((n) => n % 2 === 0 && n % 3 === 0 && n % 5 === 0)) },
  { has: "chia cho 6 thì dư 5", right: () => { const r = new Set(range(0, 100).map((k) => (6 * k + 5) % 3)); assert.equal(r.size, 1); return String([...r][0]); } },
  { has: "ước chung của 12 và 30", right: (q) => { const m = q.o.filter((o) => 12 % val(o) === 0 && 30 % val(o) === 0); assert.equal(m.length, 1); return m[0]; } },
  { has: "BCNN(14, 42) = 42", right: () => lcm(14, 42) === 42, more: (q) => has(q, ["42 = 14 · " + div(42, 14)]) },
  { has: "ƯCLN(66, 110)", right: () => String(gcd(66, 110)), more: (q) => has(q, ["66 = " + factor(66), "110 = " + factor(110)]) },
  { has: "BCNN(16, 20)", right: () => String(lcm(16, 20)), more: (q) => { has(q, ["16 = " + factor(16), "20 = " + factor(20)]); assert.deepEqual(q.o.slice(1).map(Number), [gcd(16, 20), 16 * 20, 2 * lcm(16, 20)]); } },
  { has: "dây thứ nhất cứ 15 giây nháy sáng", right: () => range(0, 5 * 60).filter((t) => t % 15 === 0 && t % 20 === 0).length, more: (q) => has(q, [`BCNN(15, 20) = ${factor(lcm(15, 20))} = ${lcm(15, 20)}`]) },
  { has: "tấm bìa hình chữ nhật dài 75 cm, rộng 45 cm", right: () => { const g = gcd(75, 45); return `Cạnh ${g} cm, cắt được ${(75 / g) * (45 / g)} mảnh`; },
    more: (q) => q.o.slice(1).forEach((o) => { // nhiễu: cạnh nhỏ hơn mà vẫn không thừa bìa (số mảnh đúng với cạnh đó), hoặc cộng số mảnh hai chiều
      const [c, k] = /^Cạnh (\d+) cm, cắt được (\d+) mảnh$/.exec(o).slice(1).map(Number);
      assert.ok(c === gcd(75, 45) ? k === 75 / c + 45 / c : 75 % c === 0 && 45 % c === 0 && k === (75 / c) * (45 / c) && c < gcd(75, 45), "lựa chọn " + o); }) }
];
const tapHop = (s) => { const m = /^\{x ∈ ℕ \| (\d+) (<|≤) x (<|≤) (\d+)\}$/.exec(s); assert.ok(m, "chữ tập hợp: " + s); return range(0, 100).filter((x) => (m[2] === "<" ? +m[1] < x : +m[1] <= x) && (m[3] === "<" ? x < +m[4] : x <= +m[4])).join(); };
const de2 = [
  { has: "lớn hơn 5 và không vượt quá 11", right: (q) => { const m = q.o.filter((o) => tapHop(o) === range(6, 11).join()); assert.equal(m.length, 1); return m[0]; } },
  { has: "Trong các số 3 089 201; 3 098 102; 3 089 210; 3 098 012", right: (q) => { assert.deepEqual(q.o.slice().sort(), /các số (.+), số lớn nhất/.exec(q.q)[1].split("; ").sort()); return q.o.slice().sort((a, b) => val(b) - val(a))[0]; } },
  { has: "Cho số 2 506 318", right: (q) => { const s = "2506318", gt = (d) => +d * 10 ** (s.length - 1 - s.indexOf(d)); // giá trị của chữ số d (d có một lần trong số)
    assert.deepEqual(q.o, ["Chữ số 5 có giá trị là 500 000.", "Chữ số 0 ở hàng chục nghìn.", "Số 2 506 318 có bảy chữ số.", "Chữ số 8 có giá trị là 80."]);
    return [gt("5") === 500000, s[s.length - 5] === "0", s.length === 7, gt("8") === 80]; } },
  { has: "15 thùng vở, mỗi thùng 120 quyển", right: () => String(div(15 * 120 - 1250, 10)) },
  { has: "Lũy thừa 7⁴ có cơ số và số mũ", right: () => "Cơ số 7, số mũ 4", more: (q) => assert.ok(ev("7⁴") === 7 ** 4 && new Set(q.o).size === 4) },
  { has: "các dấu ngoặc ( ), [ ], { }", right: () => "( ) → [ ] → { }" },
  { has: "150 − [(36 : 4 + 3) · 2²]", right: () => String(ev("150 − [(36 : 4 + 3) · 2²]")), more: (q) => has(q, ["12 · 2² = 12 · 4 = 48"]) },
  { has: "2 · 3ˣ − 7 = 155", right: () => { const m = range(0, 20).filter((x) => 2 * 3 ** x - 7 === 155); assert.equal(m.length, 1); return m[0]; } },
  { has: "Số nào dưới đây chia hết cho 9", right: (q) => { const m = q.o.filter((o) => val(o) % 9 === 0); assert.equal(m.length, 1); return m[0]; }, more: (q) => has(q, q.o.slice(1).map((o) => String(digitSum(val(o))))) },
  { has: "Mọi số nguyên tố đều là số lẻ", right: () => range(2, 1000).filter(isPrime).every((p) => p % 2 === 1) },
  { has: "Số 100 có tất cả", right: () => String(divisors(100).length), more: (q) => has(q, [divisors(100).join("; ")]) },
  { has: "7a5b chia hết cho cả 2, 5 và 9", right: () => {
    const m = []; range(0, 9).forEach((a) => range(0, 9).forEach((b) => { const n = 7050 + 100 * a + b; if (n % 2 === 0 && n % 5 === 0 && n % 9 === 0) m.push(`a = ${a}, b = ${b}`); }));
    assert.equal(m.length, 1); return m[0]; } },
  { has: "hai số nguyên tố cùng nhau", right: (q) => { const m = q.o.filter((o) => gcd(...o.split(" và ").map(Number)) === 1); assert.equal(m.length, 1); return m[0]; } },
  { has: "ƯCLN(88, 132)", right: () => String(gcd(88, 132)), more: (q) => has(q, ["88 = " + factor(88), "132 = " + factor(132)]) },
  { has: "Rút gọn phân số 32/48", right: () => { const g = gcd(32, 48); return `${32 / g}/${48 / g}`; },
    more: (q) => q.o.forEach((o, i) => { const [a, b] = o.split("/").map(Number); assert.equal(a * 48, b * 32, "lựa chọn " + o + " bằng 32/48"); assert.equal(gcd(a, b) === 1, i === 0, "chỉ đáp án đúng là phân số tối giản"); }) },
  { has: "từ 200 đến 250 quyển", right: () => { const m = range(200, 250).filter((x) => [8, 12, 18].every((k) => (x + 1) % k === 0 && x % k !== 0)); assert.equal(m.length, 1); return m[0]; },
    more: (q) => has(q, [`BCNN(8, 12, 18) = ${factor(lcm(8, 12, 18))} = ${lcm(8, 12, 18)}`]) },
  { has: "Nhiệt kế trong hình chỉ nhiệt độ bao nhiêu", right: (q) => nhietKe(q.svg) },
  { has: "Nối mỗi cách nói ở cột trái với số nguyên", right: (q) => q.l.map((l) => {
    let m;
    if ((m = /^Nhiệt độ (\d+) °C dưới 0 °C$/.exec(l))) return fmt(-m[1]) + " °C";
    if ((m = /^Độ cao (\d+) m dưới mực nước biển$/.exec(l))) return fmt(-m[1]) + " m";
    if ((m = /^Nợ ([\d ]+) đồng$/.exec(l))) return fmt(-val(m[1])) + " đồng";
    if ((m = /^Có ([\d ]+) đồng$/.exec(l))) return fmt(val(m[1])) + " đồng";
    return assert.fail(l);
  }) },
  { has: "theo thứ tự giảm dần", right: (q) => q.o.slice().sort((a, b) => val(b) - val(a)) },
  { has: "khinh khí cầu đang bay ở độ cao 1 250 m", right: () => fmt(1250 - -380) + " m", more: (q) => assert.equal(val(q.o[1].split(" m")[0]), 1250 - 380) },
  { has: "−7 ≤ x < 5", right: () => sum(range(-7, 4)) },
  { has: "Số nào dưới đây là ước của −15", right: (q) => { const m = q.o.filter((o) => -15 % val(o) === 0); assert.equal(m.length, 1); return m[0]; } },
  { has: "Mỗi phép tính sau đúng hay sai", right: (q) => { assert.equal(q.o[0], "(−3) · (−4) · (−5) = −60"); return q.o.map(eq); }, more: () => assert.equal(ev("(−48) : 6"), -8) },
  { has: "x : (−4) = 9", right: () => { const m = range(-200, 200).filter((x) => x % 4 === 0 && x / -4 === 9); assert.equal(m.length, 1); return m[0]; } },
  { has: "mỗi chiếc áo bán đúng giá thì lãi 30 000 đồng", right: () => 12 * 30000 + 9 * -10000 }
];
// câu riêng của đề ngẫu nhiên
const TINH_CHAT = { "Tính chất giao hoán của phép cộng": "a + b = b + a", "Tính chất kết hợp của phép nhân": "(a · b) · c = a · (b · c)",
  "Tính chất phân phối của phép nhân đối với phép cộng": "a · (b + c) = a · b + a · c", "Cộng với số 0": "a + 0 = a" };
const DAYS = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
const own = [
  { has: "Nối mỗi tính chất ở cột trái", right: (q) => q.l.map((l) => TINH_CHAT[l]),
    more: (q) => q.r.forEach((r) => { const [L, R] = r.split(" = "); range(0, 6).forEach((a) => range(0, 6).forEach((b) => range(0, 6).forEach((c) => assert.equal(ev(L, { a, b, c }), ev(R, { a, b, c }), "đẳng thức " + r)))); }) },
  { has: "Quan sát tia số. Điểm M", right: (q) => { const t = truc(q.svg, 5); assert.equal(t.ticks[0], nhan(q.svg, "0")[0], "tia số bắt đầu ở 0"); return String(t.at("M")); },
    more: (q) => { const k = truc(q.svg, 5).at("M") / 5; assert.deepEqual(q.o.slice(1).map(Number), [k, 5 * (k - 1), 5 * (k + 1)]); } }, // nhiễu: số vạch, vạch liền trước, liền sau
  { has: "x : 7 + 15 = 34", right: () => { const m = range(0, 1000).filter((x) => x % 7 === 0 && x / 7 + 15 === 34); assert.equal(m.length, 1); return String(m[0]); } },
  { has: "lớn nhất có bốn chữ số khác nhau", right: () => fmt(Math.max(...range(1000, 9999).filter((n) => new Set(String(n)).size === 4))) },
  { has: "Thực hiện phép chia 2 026 cho 9", right: (q) => { const t = Math.floor(2026 / 9), r = 2026 % 9;
    assert.deepEqual(q.o, ["Thương là 225, số dư là 1.", "2 026 = 9 · 225 + 1.", "Số dư lớn hơn số chia.", "Thêm 8 vào số bị chia thì được một số chia hết cho 9."]);
    return [t === 225 && r === 1, 9 * 225 + 1 === 2026, r > 9, (2026 + 8) % 9 === 0]; }, more: (q) => has(q, [`2 034 = 9 · ${2034 / 9}`]) },
  { has: "Ngày 1 tháng 1 năm 2027 là thứ Sáu", right: () => { assert.equal(DAYS[new Date(2027, 0, 1).getDay()], "Thứ Sáu"); assert.equal(new Date(2027, 1, 29).getDate(), 1, "tháng 2/2027 có 28 ngày"); return DAYS[new Date(2027, 2, 1).getDay()]; },
    more: (q) => { assert.equal((new Date(2027, 2, 1) - new Date(2027, 0, 1)) / 864e5, 59); has(q, ["59 = 7 · 8 + 3"]); } },
  { has: "Một bể chứa 2 400 lít nước", right: () => div(2400 - 1600, 35 - 15) },
  { has: "Tổng của ba số tự nhiên liên tiếp bằng 2 025", right: () => { const m = range(0, 2025).filter((a) => 3 * a + 3 === 2025); assert.equal(m.length, 1); return String(m[0] + 2); },
    more: (q) => assert.deepEqual(q.o.slice(1).map(Number).sort(), [674, 675, 677]) },
  { has: "Nối mỗi lũy thừa ở cột trái", right: (q) => q.l.map((e) => fmt(ev(e))), more: (q) => q.r.slice(q.l.length).forEach((x) => assert.ok(!q.l.some((e) => ev(e) === val(x)))) },
  { has: "Lập phương của 3", right: () => String(3 ** 3) },
  { has: "2 · 5² + 3 · 2³", right: () => String(ev("2 · 5² + 3 · 2³")) },
  { has: "Sắp xếp các lũy thừa sau", right: (q) => q.o.slice().sort((a, b) => ev(a) - ev(b)), more: (q) => assert.equal(new Set(q.o.map((o) => ev(o))).size, q.o.length) },
  { has: "Mỗi kết quả tính sau đúng hay sai", right: (q) => q.o.map(eq), more: () => { assert.equal(ev("20 − 2 · 3"), 14); assert.equal(ev("36 : 3 · 2"), 24); } },
  { has: "180 − 4 · (x + 3) = 10²", right: () => { const m = range(0, 100).filter((x) => ev("180 − 4 · (x + 3)", { x }) === ev("10²")); assert.equal(m.length, 1); return String(m[0]); } },
  { has: "2 · {150 − [(17 − 3²) · 5 + 10]}", right: (q) => fmt(ev(/biểu thức (.+) là:/.exec(q.q)[1])) },
  { has: "gấp đôi một tờ giấy", right: () => 2 ** 6 },
  { has: "phân tích số 126 ra thừa số nguyên tố theo sơ đồ cột", right: (q) => { const c = soDoCot(q.svg); assert.equal(c.n, 126); assert.equal(c.primes.reduce((a, p) => a * p, 1), 126); return "126 = " + factor(126); },
    more: (q) => q.o.slice(1).forEach((o) => { const [, r] = o.split(" = "), f = r.split(" · ").map((x) => ev(x)); assert.ok(ev(r) !== 126 || !f.every((x) => isPrime(x) || /\D/.test(x)), "lựa chọn " + o); assert.ok(ev(r) !== 126 || f.some((x) => !isPrime(x)), "lựa chọn " + o + " không được là một cách phân tích đúng"); }) },
  { has: "Nếu một số chia hết cho 9 thì số đó chia hết cho 3", right: () => range(0, 3000).filter((n) => n % 9 === 0).every((n) => n % 3 === 0), more: () => assert.ok(21 % 3 === 0 && 21 % 9 !== 0) },
  { has: "Tổng tất cả các ước của 28", right: () => String(sum(divisors(28))), more: (q) => has(q, [divisors(28).join("; ")]) },
  { has: "Mỗi khẳng định sau đúng hay sai", right: (q) => { const P = range(2, 200).filter(isPrime);
    assert.deepEqual(q.o, ["Số 51 là hợp số.", "Tổng của hai số nguyên tố bất kì luôn là một số chẵn.", "Số 1 là ước của mọi số tự nhiên.", "Tích của hai số nguyên tố là một hợp số."]);
    return [!isPrime(51), P.every((p) => P.every((r) => (p + r) % 2 === 0)), range(0, 1000).every((n) => n % 1 === 0), P.every((p) => P.every((r) => !isPrime(p * r)))]; } },
  { has: "Từ ba chữ số 0, 5, 7", right: () => String(range(100, 999).filter((n) => String(n).split("").sort().join("") === "057" && n % 5 === 0).length),
    more: (q) => has(q, range(100, 999).filter((n) => String(n).split("").sort().join("") === "057").join(", ").split(", ")) },
  { has: "Bạn Minh nghĩ một số có hai chữ số", right: () => { const m = range(10, 99).filter((n) => isPrime(n) && Math.floor(n / 10) + n % 10 === 10 && Math.floor(n / 10) > n % 10); assert.equal(m.length, 1); return String(m[0]); },
    more: (q) => { assert.ok(isPrime(37) && 3 + 7 === 10 && !isPrime(91) && 7 * 13 === 91); has(q, ["64, 73, 82, 91"]); } },
  { has: "Cho n là số tự nhiên khác 0", right: (q) => { const ok = (n) => (n + 4) % n === 0, all = range(1, 1000).filter(ok); assert.deepEqual(all, divisors(4));
    assert.deepEqual(q.o, ["Với n = 2 thì n + 4 chia hết cho n.", "Với n = 3 thì n + 4 chia hết cho n.", "Nếu n là ước của 4 thì n + 4 chia hết cho n.", "Có đúng 4 số n để n + 4 chia hết cho n."]);
    return [ok(2), ok(3), divisors(4).every(ok), all.length === 4]; } },
  { has: "Tích của hai số tự nhiên liên tiếp bằng 156", right: () => { const m = range(0, 156).filter((a) => a * (a + 1) === 156); assert.equal(m.length, 1); return String(2 * m[0] + 1); }, more: (q) => has(q, ["156 = " + factor(156)]) },
  { has: "Nếu số a chia hết cho số b", right: () => range(1, 60).every((b) => range(1, 12).every((k) => gcd(b * k, b) === b)), more: () => assert.ok(57 === 19 * 3 && gcd(57, 19) === 19) },
  { has: "các bội nhỏ hơn 70 của 10 và của 15", right: (q) => {
    const rows = bang(q.svg).map((r) => [r[0], r.slice(1).map(Number)]); assert.deepEqual(rows.map((r) => r[0]), ["B(10)", "B(15)"]);
    rows.forEach(([lab, v]) => { const k = +/\d+/.exec(lab)[0]; assert.deepEqual(v, range(0, 69).filter((n) => n % k === 0), lab + " ghi đủ các bội nhỏ hơn 70"); });
    const chung = rows[0][1].filter((n) => rows[1][1].includes(n) && n > 0); assert.equal(Math.min(...chung), lcm(10, 15)); return String(Math.min(...chung));
  }, more: (q) => { has(q, ["0; 30; 60", "ƯCLN(10, 15)"]); assert.deepEqual(q.o.slice(1).map(Number), [2 * lcm(10, 15), 0, gcd(10, 15)]); } }, // nhiễu: bội chung kế tiếp, số 0, ƯCLN
  { has: "quy đồng mẫu hai phân số 5/14 và 3/35, mẫu chung nhỏ nhất", right: () => String(lcm(14, 35)), more: (q) => { assert.ok(gcd(5, 14) === 1 && gcd(3, 35) === 1); has(q, [`5/14 = ${5 * 70 / 14}/70`, `3/35 = ${3 * 70 / 35}/70`]); } },
  { has: "ƯCLN(68, 102)", right: () => String(gcd(68, 102)), more: (q) => { has(q, ["68 = " + factor(68), "102 = " + factor(102)]); assert.equal(+q.o[3], lcm(68, 102)); } },
  { has: "ba con tàu cùng cập một cảng", right: () => lcm(9, 12, 15) + " ngày",
    more: (q) => { assert.deepEqual(q.o.slice(1).map((o) => val(o.replace(" ngày", ""))), [lcm(9, 12), lcm(12, 15), 9 * 12 * 15]); has(q, [`BCNN(9, 12, 15) = ${factor(lcm(9, 12, 15))} = ${lcm(9, 12, 15)}`]); } },
  { has: "52 bạn nam và 78 bạn nữ", right: (q) => { const g = gcd(52, 78), chia = (k) => 52 % k === 0 && 78 % k === 0;
    assert.deepEqual(q.o, ["Cô có thể chia thành 13 nhóm.", "Cô có thể chia thành 4 nhóm.", "Cô chia được nhiều nhất 26 nhóm.", "Khi chia được nhiều nhóm nhất, mỗi nhóm có 2 bạn nam và 3 bạn nữ."]);
    return [chia(13), chia(4), g === 26, 52 / g === 2 && 78 / g === 3]; } },
  { has: "150 bông hồng và 105 bông cúc", essay: (q) => {
    const g = gcd(150, 105), rb = q.rubric.map((c) => c.c).join(" | ");
    [`150 = ${factor(150)}; 105 = ${factor(105)}`, `ƯCLN(150, 105) = ${factor(g)} = ${g}`].forEach((s) => { assert.ok(rb.includes(s), "thang chấm thiếu " + s); assert.ok(q.x.includes(s), "gợi ý thiếu " + s); });
    [`150 : ${g} = ${150 / g}`, `105 : ${g} = ${105 / g}`].forEach((s) => assert.ok(q.x.includes(s), "gợi ý thiếu " + s));
    assert.ok(rb.includes(`${150 / g} bông hồng, ${105 / g} bông cúc`) && q.x.includes(`Đáp số: ${g} bó`));
  } },
  { has: "xe tuyến A cứ 8 phút", essay: (q) => {
    const k = lcm(8, 14), gio = (m) => `${Math.floor(m / 60)} giờ${m % 60 ? " " + (m % 60) + " phút" : ""}`, lan = range(0, 30).map((i) => 6 * 60 + i * k).filter((m) => m <= 8 * 60), rb = q.rubric.map((c) => c.c).join(" | ");
    [`BCNN(8, 14) = ${factor(k)} = ${k}`, gio(lan[1]), lan.map(gio).join("; "), lan.length + " lần"].forEach((s) => { assert.ok(rb.includes(s), "thang chấm thiếu " + s); assert.ok(q.x.includes(s), "gợi ý thiếu " + s); });
    assert.ok(q.x.includes(gio(lan[lan.length - 1] + k)) && lan[lan.length - 1] + k > 8 * 60, "lần sau đó đã quá 8 giờ");
  } },
  { has: "hàng 6, hàng 9 hay hàng 15 thì đều thừa 3 bạn", essay: (q) => {
    const m = range(250, 300).filter((x) => [6, 9, 15].every((k) => x % k === 3)); assert.deepEqual(m, [273]);
    const rb = q.rubric.map((c) => c.c).join(" | ");
    [`BCNN(6, 9, 15) = ${factor(lcm(6, 9, 15))} = ${lcm(6, 9, 15)}`, "270 + 3 = 273"].forEach((s) => { assert.ok(rb.includes(s), "thang chấm thiếu " + s); assert.ok(q.x.includes(s), "gợi ý thiếu " + s); });
    assert.ok(q.x.includes("247 ≤ x − 3 ≤ 297") && q.x.includes("Đáp số: 273 học sinh"));
  } },
  { has: "Hai điểm P và Q biểu diễn", right: (q) => { const t = truc(q.svg, 1); return `P biểu diễn ${fmt(t.at("P"))}, Q biểu diễn ${fmt(t.at("Q"))}`; } },
  { has: "Số 0 không phải là số nguyên dương", right: () => !(0 > 0) && !(0 < 0) },
  { has: "Hai số nào dưới đây là hai số đối nhau", right: (q) => { const m = q.o.filter((o) => { const [a, b] = o.split(" và ").map(val); return a + b === 0 && a !== b; }); assert.equal(m.length, 1); return m[0]; } },
  { has: "nhiệt độ lúc 6 giờ sáng ở một trạm khí tượng trên núi", right: (q) => {
    const T = Object.fromEntries(bang(q.svg).map(([d, t]) => { assert.ok(/ °C$/.test(t)); return [d, val(t.replace(" °C", ""))]; }));
    assert.deepEqual(Object.keys(T), ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu"]);
    assert.deepEqual(q.o, ["Thứ Tư là ngày lạnh nhất trong năm ngày.", "Có ba ngày nhiệt độ dưới 0 °C.", "Nhiệt độ ngày thứ Ba cao hơn ngày thứ Hai 1 °C.", "Nhiệt độ ngày thứ Sáu cao hơn ngày thứ Năm."]);
    const min = Math.min(...Object.values(T));
    return [Object.keys(T).filter((d) => T[d] === min).join() === "Thứ Tư", Object.values(T).filter((t) => t < 0).length === 3, T["Thứ Ba"] - T["Thứ Hai"] === 1, T["Thứ Sáu"] > T["Thứ Năm"]];
  }, more: (q) => { const T = Object.fromEntries(bang(q.svg).map(([d, t]) => [d, val(t.replace(" °C", ""))])); has(q, [`${fmt(T["Thứ Ba"])} − (${fmt(T["Thứ Hai"])}) = ${T["Thứ Ba"]} + ${-T["Thứ Hai"]} = ${T["Thứ Ba"] - T["Thứ Hai"]}`, Object.values(T).map(fmt).join("; ")]); } },
  { has: "47 − (52 − 18) − (18 + 47)", right: () => ev("47 − (52 − 18) − (18 + 47)"), more: (q) => assert.equal(ev("47 − 52 + 18 − 18 − 47"), q.ans) },
  { has: "−5 ≤ x ≤ 2", right: () => String(range(-5, 2).length) },
  { has: "số tiền lãi, lỗ của một cửa hàng trong bốn tháng", right: (q) => { const rows = bang(q.svg); assert.deepEqual(rows.map((r) => r[0]), ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4"]); return sum(rows.map((r) => val(r[1]))); },
    more: (q) => has(q, [bang(q.svg).map((r) => (val(r[1]) < 0 ? `(${r[1]})` : r[1])).join(" + ")]) },
  { has: "(−125) + 73 + (−75) + 127 − 50", right: (q) => fmt(ev(/hợp lí: (.+)\.$/.exec(q.q)[1])), more: (q) => q.o.slice(1).forEach((o) => assert.notEqual(val(o), -50)) },
  { has: "nhiệt độ ở một thành phố là −12 °C", right: () => -12 + 15 - 9 },
  { has: "Tích của một số nguyên dương và một số nguyên âm", right: () => range(1, 30).every((a) => range(1, 30).every((b) => a * -b < 0)) },
  { has: "Số nào dưới đây là bội của −6", right: (q) => { const m = q.o.filter((o) => val(o) % 6 === 0); assert.equal(m.length, 1); return m[0]; }, more: () => assert.equal(-6 % -3, -0) },
  { has: "Sắp xếp các tích sau", right: (q) => q.o.slice().sort((a, b) => ev(a) - ev(b)), more: (q) => assert.equal(new Set(q.o.map((o) => ev(o))).size, q.o.length) },
  { has: "(x − 3) · (x + 2) khi x = −4", right: () => ev("(x − 3) · (x + 2)", { x: -4 }) },
  { has: "bội của 7 lớn hơn −30 và nhỏ hơn 30", right: () => String(range(-29, 29).filter((n) => n % 7 === 0).length), more: (q) => has(q, [range(-29, 29).filter((n) => n % 7 === 0).map(fmt).join("; ")]) },
  { has: "chỉ nhiệt độ ở một trạm khí tượng lúc 20 giờ", right: (q) => { const t0 = nhietKe(q.svg); assert.ok(q.x.includes(`Nhiệt kế chỉ ${t0} °C`)); return t0 + (24 - 20) * -2; } },
  { has: "(−25) · 68 + 25 · (−32)", right: () => fmt(ev("(−25) · 68 + 25 · (−32)")), more: (q) => assert.equal(val(q.o[2]), ev("(−25) · 68 − 25 · (−32)")) },
  { has: "cuộc thi hiểu biết có 25 câu hỏi", essay: (q) => {
    const ha = 18 * 4 + 4 * -1 + 3 * 0, long = 19 * 4 + (25 - 19) * -1, rb = q.rubric.map((c) => c.c).join(" | ");
    assert.equal(18 + 4 + 3, 25);
    ["18 · 4 + 4 · (−1) + 3 · 0", `= ${ha} (điểm)`, `25 − 19 = 6`, `19 · 4 + 6 · (−1) = ${long}`, `${long} − ${ha} = ${long - ha}`].forEach((s) => assert.ok(rb.includes(s), "thang chấm thiếu " + s));
    [`= ${ha} (điểm)`, `= ${long} (điểm)`, `Hà ${ha} điểm, Long ${long} điểm`, `nhiều hơn ${long - ha} điểm`].forEach((s) => assert.ok(q.x.includes(s), "gợi ý thiếu " + s));
  } },
  { has: "Một thợ lặn bắt đầu lặn từ mặt nước biển", essay: (q) => {
    const a = 5 * -4, b = a + 3 * 2, rb = q.rubric.map((c) => c.c).join(" | ");
    [`5 · (−4) = ${fmt(a)}`, "3 · 2 = 6", `${fmt(a)} + 6 = ${fmt(b)}`].forEach((s) => { assert.ok(rb.includes(s), "thang chấm thiếu " + s); assert.ok(q.x.includes(s), "gợi ý thiếu " + s); });
    assert.ok(q.x.includes(`Đáp số: a) ${fmt(a)} m; b) ${fmt(b)} m.`));
  } }
];

/* Đề 3, Đề 4 (Phiên N26): Chương I, II, IV cho trường dạy song song số và hình */
const rb = (q) => q.rubric.map((c) => c.c).join(" | ");
const both = (q, list) => list.forEach((s) => { assert.ok(rb(q).includes(s), "thang chấm thiếu " + s); assert.ok(q.x.includes(s), "gợi ý thiếu " + s); });
const ABCD = (P) => ({ AB: [P.A, P.B], BC: [P.B, P.C], CD: [P.C, P.D], DA: [P.D, P.A] });
const de3 = [
  { has: "Cho tập hợp M = {2; 5; 8; 11}", right: (q) => { const M = [2, 5, 8, 11];
    const m = q.o.filter((o) => { const [, a, r] = /^(\d+) (∈|∉) M$/.exec(o); return M.includes(+a) === (r === "∈"); }); assert.equal(m.length, 1); return m[0]; } },
  { has: "lẻ lớn hơn 10 và nhỏ hơn 45", right: () => String(range(11, 44).filter((x) => x % 2).length), more: (q) => has(q, ["(43 − 11) : 2 + 1 = 16 + 1 = 17"]) },
  { has: "chia số tự nhiên cho 12, thương là 25", right: () => { const a = 12 * 25 + (12 - 1); assert.ok(Math.floor(a / 12) === 25 && a % 12 === 11); return a; }, more: (q) => has(q, ["12 · 25 + 11 = 300 + 11 = 311"]) },
  { has: "Bạn Hà tính bốn lũy thừa", right: (q) => q.o.map(eq), more: (q) => has(q, [`3³ = 3 · 3 · 3 = ${ev("3³")}`]) },
  { has: "Với biểu thức không có dấu ngoặc, có các phép cộng", right: () => "Lũy thừa → nhân và chia → cộng và trừ", more: (q) => has(q, [`20 − 3 · 2² = 20 − 3 · 4 = 20 − 12 = ${ev("20 − 3 · 2²")}`]) },
  { has: "4 · 3² − 60 : 2²", right: (q) => String(ev(q.q.replace(" = ___", ""))) },
  { has: "4 · 23 · 25 + 10² · 27", essay: (q) => {
    const a = ev("4 · 23 · 25 + 10² · 27"), x = range(4, 200).filter((x) => 3 * (x - 4) + 5 ** 2 === 70); assert.deepEqual(x, [19]);
    both(q, [`100 · (23 + 27) = 100 · 50 = ${fmt(a)}`, "70 − 25 = 45", "45 : 3 = 15", "15 + 4 = 19"]); assert.ok(q.x.includes(`Đáp số: a) ${fmt(a)}; b) x = ${x[0]}.`));
  } },
  { has: "Tập hợp các bội của 11 nhỏ hơn 60", right: () => "{" + range(0, 59).filter((n) => n % 11 === 0).join("; ") + "}" },
  { has: "Số nào dưới đây là số nguyên tố?", right: (q) => { const m = q.o.filter((o) => isPrime(+o)); assert.equal(m.length, 1); return m[0]; },
    more: (q) => has(q, q.o.slice(1).map((o) => { assert.ok(+o % 3 === 0 && digitSum(+o) % 3 === 0); return `${o} = 3 · ${+o / 3}`; })) },
  { has: "hai chữ số vừa chia hết cho 2, vừa chia hết cho 9", right: () => range(10, 99).filter((n) => n % 2 === 0 && n % 9 === 0).length,
    more: (q) => has(q, [range(10, 99).filter((n) => digitSum(n) % 9 === 0).join("; "), range(10, 99).filter((n) => n % 18 === 0).join("; ")]) },
  { has: "tổng nào dưới đây chia hết cho 6", right: (q) => { const m = q.o.filter((o) => sum(o.split(" + ").map(Number)) % 6 === 0); assert.equal(m.length, 1); return m[0]; },
    more: (q) => q.o.forEach((o, i) => assert.equal(o.split(" + ").filter((t) => +t % 6).length, i ? 1 : 0, "tổng " + o + ": tính chất chia hết của một tổng")) },
  { has: "Tổng của hai số nguyên tố bằng 31", right: () => { const p = range(2, 15).filter((p) => isPrime(p) && isPrime(31 - p)); assert.deepEqual(p, [2]); return p[0] * (31 - p[0]); } },
  { has: "Tập hợp các ước chung của 16 và 24", right: () => "{" + divisors(16).filter((d) => 24 % d === 0).join("; ") + "}",
    more: (q) => { has(q, [16, 24].map((k) => `Ư(${k}) = {${divisors(k).join("; ")}}`)); assert.equal(+q.o[3].replace(/[{}]/g, ""), gcd(16, 24)); } },
  { has: "BCNN(15, 36)", right: () => String(lcm(15, 36)), more: (q) => has(q, [`15 = ${factor(15)}; 36 = ${factor(36)}`, `BCNN(15, 36) = ${factor(lcm(15, 36))} = ${lcm(15, 36)}`]) },
  { has: "Phân số tối giản bằng phân số 45/60", right: () => { const g = gcd(45, 60); return `${45 / g}/${60 / g}`; }, more: (q) => has(q, [`ƯCLN(45, 60) = 3 · 5 = ${gcd(45, 60)}`]) },
  { has: "bánh thứ nhất có 18 răng, bánh thứ hai có 12 răng", right: () => { const k = range(1, 500).find((t) => t % 18 === 0 && t % 12 === 0); assert.equal(k, lcm(18, 12)); return k / 18; },
    more: (q) => has(q, [`BCNN(18, 12) = ${factor(lcm(18, 12))} = ${lcm(18, 12)}`, `${lcm(18, 12)} : 12 = ${lcm(18, 12) / 12} (vòng)`]) },
  { has: "ba cuộn ruy băng dài 84 cm, 126 cm và 210 cm", essay: (q) => {
    const L = [84, 126, 210], g = gcd(...L), k = L.map((l) => l / g);
    both(q, [L.map((l) => `${l} = ${factor(l)}`).join("; "), `ƯCLN(84, 126, 210) = ${factor(g)} = ${g}`]);
    assert.ok(rb(q).includes(L.map((l) => `${l} : ${g}`).join(" + ") + ` = ${k.join(" + ")} = ${sum(k)}`));
    assert.ok(q.x.includes(`${k.join(" + ")} = ${sum(k)} (đoạn)`) && q.x.includes(`Đáp số: a) ${g} cm; b) ${sum(k)} đoạn.`));
  } },
  { has: "đặc điểm về cạnh và góc", right: (q) => {
    // hình đều n cạnh: mỗi góc (n − 2) · 180° : n; chỉ hình thang có cạnh bên
    const F = { "Hình tam giác đều": { n: 3 }, "Hình vuông": { n: 4 }, "Hình lục giác đều": { n: 6 }, "Hình thang cân": { ben: true } }, SO = { Ba: 3, Bốn: 4, Năm: 5, Sáu: 6 };
    const holds = (r, f) => { let m;
      if ((m = /^(Ba|Bốn|Năm|Sáu) cạnh bằng nhau, (ba|bốn|năm|sáu) góc bằng nhau(?: và bằng (\d+)°)?$/.exec(r))) return f.n === SO[m[1]] && m[2] === m[1].toLowerCase() && (!m[3] || +m[3] === (f.n - 2) * 180 / f.n);
      if (r === "Hai cạnh bên bằng nhau, hai góc kề một đáy bằng nhau") return !!f.ben;
      return assert.fail("chưa có cách kiểm tra: " + r); };
    q.r.slice(q.l.length).forEach((r) => assert.ok(q.l.every((l) => !holds(r, F[l])), "ô thừa không đúng với hình nào: " + r));
    return q.l.map((l) => { const m = q.r.filter((r) => holds(r, F[l])); assert.equal(m.length, 1, l); return m[0]; });
  } },
  { has: "Hai đường chéo của mọi hình thoi luôn", right: (q) => {
    // hình thoi A(−p; 0), B(0; r), C(p; 0), D(0; −r) với nhiều cặp p, r: lựa chọn đúng với mọi hình thoi
    const T = { "vuông góc với nhau": (u, v) => vuongGoc(u, v), "bằng nhau": (u, v) => close(Math.hypot(...u), Math.hypot(...v)), "song song với nhau": (u, v) => songSong(u, v), "cắt nhau tại một đỉnh của hình thoi": () => false };
    const ok = q.o.filter((o) => { assert.ok(T[o], o); return range(1, 6).every((p) => range(1, 6).every((r) => T[o]([2 * p, 0], [0, -2 * r]))); }); assert.equal(ok.length, 1); return ok[0];
  } },
  { has: "Hình lục giác đều ABCDEF trong hình được chia thành sáu tam giác chung đỉnh O", right: (q) => {
    const { O, V, s } = lucGiac(q.svg), N = "ABCDEF".split(""), P = {}, segs = {};
    N.forEach((n) => (P[n] = dinh(V, q.svg, n)));
    N.forEach((n, i) => { const m = N[(i + 1) % 6]; assert.ok(close(dist(P[n], P[m]), s, 1e-3), `${n}${m} là cạnh của lục giác`); segs[n + m] = [P[n], P[m]]; segs["O" + n] = [O, P[n]]; });
    assert.deepEqual(dinh(V.concat([O]), q.svg, "O"), O, "nhãn O ở tâm");
    const m = soDo(q.svg, segs, "cm"); assert.deepEqual(Object.keys(m), ["AB"]); const k = s / m.AB, cm = (p, r) => dist(p, r) / k;
    assert.deepEqual(q.o, ["Tam giác OAB là tam giác đều.", "OA = 3 cm.", "Đường chéo chính AD dài 6 cm.", "Đường chéo chính BE ngắn hơn đường chéo chính AD."]);
    return [close(cm(O, P.A), cm(O, P.B), 1e-3) && close(cm(O, P.A), m.AB, 1e-3), close(cm(O, P.A), 3, 1e-3), close(cm(P.A, P.D), 6, 1e-3), cm(P.B, P.E) < cm(P.A, P.D) - 1e-3];
  } },
  { has: "xếp 5 hình lục giác đều thành một hàng", right: () => {
    // 5 lục giác đều (đỉnh ở trên) cạnh 1, tâm cách nhau √3 trên một hàng ngang: đếm các cạnh khác nhau (mỗi cạnh một que)
    const E = new Set(); range(0, 4).forEach((i) => { const c = [i * Math.sqrt(3), 0], v = range(0, 5).map((j) => [c[0] + Math.cos((30 + 60 * j) * Math.PI / 180), c[1] + Math.sin((30 + 60 * j) * Math.PI / 180)].map((x) => (Math.round(x * 1e6) + 0) / 1e6).join(";"));
      v.forEach((p, j) => E.add([p, v[(j + 1) % 6]].sort().join("|"))); });
    return E.size;
  }, more: (q) => has(q, ["6 − 1 = 5", "6 + 5 · 4 = 6 + 20 = 26"]) },
  { has: "Tính diện tích hình chữ nhật ABCD", right: (q) => {
    const P = tuGiac(q.svg, ["A", "B", "C", "D"]); goc([P.A, P.B, P.C, P.D]).forEach((g) => assert.ok(close(g, 90), "bốn góc vuông"));
    const m = soDo(q.svg, ABCD(P), "cm"); assert.deepEqual(Object.keys(m).sort(), ["AB", "BC"]);
    const k = dist(P.A, P.B) / m.AB; assert.ok(close(dienTich([P.A, P.B, P.C, P.D]) / k / k, m.AB * m.BC)); return m.AB * m.BC;
  }, more: (q) => has(q, ["AB = 13 cm", "BC = 4 cm", "13 · 4 = 52"]) },
  { has: "độ dài hai đường chéo là 11 cm và 6 cm", right: () => `${11 * 6 / 2} cm²`,
    more: (q) => assert.deepEqual(q.o.slice(1).map((o) => +o.replace(" cm²", "")), [11 * 6, 11 + 6, 2 * (11 + 6)]) }, // nhiễu: quên chia 2, tổng hai đường chéo, gấp đôi tổng
  { has: "Tính diện tích hình thang cân ABCD (đáy nhỏ AB, đáy lớn CD, đường cao AH)", right: (q) => {
    const P = tuGiac(q.svg, ["A", "B", "C", "D"]);
    assert.ok(songSong(sub(P.B, P.A), sub(P.C, P.D)) && dist(P.A, P.B) < dist(P.C, P.D), "AB song song với CD, AB là đáy nhỏ");
    assert.ok(close(dist(P.A, P.D), dist(P.B, P.C)) && !songSong(sub(P.D, P.A), sub(P.C, P.B)), "hình thang cân: hai cạnh bên bằng nhau, không song song");
    const H = duongCao(q.svg, P.A, P.D, P.C), m = soDo(q.svg, Object.assign(ABCD(P), { AH: [P.A, H] }), "cm");
    assert.deepEqual(Object.keys(m).sort(), ["AB", "AH", "CD"]);
    const k = dist(P.A, P.B) / m.AB, S = (m.AB + m.CD) * m.AH / 2; assert.ok(close(dienTich([P.A, P.B, P.C, P.D]) / k / k, S)); return S;
  }, more: (q) => has(q, ["AB = 7 cm, CD = 13 cm, AH = 6 cm", "(7 + 13) · 6 : 2 = 20 · 6 : 2 = 120 : 2 = 60"]) },
  { has: "tấm bìa hình chữ nhật dài 28 cm, rộng 20 cm", essay: (q) => {
    const [W, H, c] = [28, 20, 3], P = polys(q.svg); assert.ok(P.length === 1 && P[0].length === 12, "phần bìa còn lại là đa giác 12 đỉnh"); const pts = P[0];
    assert.ok(q.q.includes(`một hình vuông cạnh ${c} cm`));
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]), [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)], k = (x1 - x0) / W;
    assert.ok(close((y1 - y0) / k, H), "hình vẽ đúng tỉ lệ dài, rộng");
    const R = rects(q.svg).map((r) => [+r.x, +r.y, +r.width, +r.height]); assert.equal(R.length, 4, "bốn hình vuông bị cắt");
    R.forEach(([x, y, w, h]) => assert.ok(close(w / k, c) && close(h / k, c) && [x0, x1 - w].includes(x) && [y0, y1 - h].includes(y), "hình vuông cạnh 3 cm ở một góc"));
    assert.equal(new Set(R.map((r) => r[0] + "," + r[1])).size, 4, "mỗi góc một hình vuông");
    assert.deepEqual(texts(q.svg).map((t) => t.t).sort(), [`${W} cm`, `${H} cm`, `${c} cm`].sort());
    const S0 = W * H, cat = 4 * c * c, S = S0 - cat, C = 2 * (W + H);
    assert.ok(close(dienTich(pts) / k / k, S), "diện tích phần còn lại đọc từ hình"); assert.ok(close(chuVi(pts) / k, C), "chu vi phần còn lại bằng chu vi tấm bìa");
    both(q, [`${W} · ${H} = ${S0}`, `${S0} − ${cat} = ${S}`, `2 · (${W} + ${H}) = ${C}`]); assert.ok(rb(q).includes(`4 · (${c} · ${c}) = ${cat}`) && q.x.includes(`4 · ${c * c} = ${cat}`));
    assert.ok(q.x.includes(`Đáp số: a) ${S0} cm²; b) ${S} cm²; c) bằng nhau (cùng bằng ${C} cm).`));
  } }
];
// hình bình hành, hình chữ nhật mẫu (toạ độ) để tính các ý đúng/sai về cạnh, đường chéo
const PARA = range(1, 4).flatMap((a) => range(1, 3).map((h) => ({ A: [0, 0], B: [4 + a, 0], C: [4 + a + a, h + 1], D: [a, h + 1] })));
const DATE = (d, them) => { const t = new Date(2026, 10, d + them); return `Ngày ${t.getDate()} tháng ${t.getMonth() + 1}`; }; // tháng 11 có 30 ngày
const de4 = [
  { has: "Chương 27 của cuốn truyện", right: () => toRoman(27), more: (q) => { assert.deepEqual(q.o.slice(1).map(fromRoman), [23, 17, 22]); has(q, q.o.slice(1).map((o) => o + " là " + fromRoman(o))); } },
  { has: "(x − 25) · 6 = 132", right: () => { const m = range(25, 500).filter((x) => (x - 25) * 6 === 132); assert.equal(m.length, 1); return String(m[0]); }, more: (q) => has(q, ["132 : 6 = 22", "22 + 25 = 47"]) },
  { has: "cuốn sách dày 260 trang", right: () => { let con = 260, ngay = 0; while (con > 0) { con -= ngay < 4 ? 25 : 32; ngay++; } assert.equal(con, 0, "ngày cuối đọc vừa hết"); return ngay; },
    more: (q) => has(q, ["4 · 25 = 100", "260 − 100 = 160", "160 : 32 = 5", "4 + 5 = 9"]) },
  { has: "a⁰ bằng", right: () => String(range(1, 30).every((a) => a ** 0 === 1) ? 1 : 0), more: (q) => has(q, ["a⁰ = 1"]) },
  { has: "Để tính giá trị của biểu thức 50 − 4 · 3²", right: () => { assert.ok(ev("50 − 4 · 3²") === 50 - 4 * 9 && ev("50 − 4 · 3²") !== (50 - 4) * 9 && ev("50 − 4 · 3²") !== 50 - 12 ** 2); return "Tính 3²"; } },
  { has: "6 · [70 − (2 + 6)²] + 2³", right: (q) => String(ev(q.q.replace(" = ___", ""))), more: (q) => has(q, ["8² = 64", "70 − 64 = 6", "6 · 6 = 36", "36 + 8 = 44"]) },
  { has: "a) 2³ · 17 + 2³ · 83; b) 25 · 5 · 4 · 27 · 2", essay: (q) => {
    const a = ev("2³ · 17 + 2³ · 83"), b = ev("25 · 5 · 4 · 27 · 2");
    assert.ok(rb(q).includes("2³ · (17 + 83)") && rb(q).includes("(25 · 4) · (5 · 2) · 27")); both(q, [`8 · 100 = ${a}`, `100 · 10 · 27 = ${fmt(b)}`]);
    assert.ok(q.x.includes(`Đáp số: a) ${a}; b) ${fmt(b)}.`));
  } },
  { has: "Số nào dưới đây là ước của 52", right: (q) => { const m = q.o.filter((o) => 52 % +o === 0); assert.equal(m.length, 1); return m[0]; }, more: (q) => has(q, ["52 = 13 · 4", "104 = 52 · 2"]) },
  { has: "Nối mỗi số ở cột trái với nhận xét đúng", right: (q) => {
    const T = { "Số nguyên tố chẵn duy nhất": (n) => isPrime(n) && n % 2 === 0, "Số nguyên tố lẻ": (n) => isPrime(n) && n % 2 === 1, "Hợp số": (n) => n > 1 && !isPrime(n),
      "Không là số nguyên tố, cũng không là hợp số": (n) => n < 2, "Hợp số chẵn": (n) => n > 1 && !isPrime(n) && n % 2 === 0 };
    q.r.forEach((r) => assert.ok(T[r], "chưa có cách kiểm tra: " + r)); assert.deepEqual(range(0, 1000).filter(T["Số nguyên tố chẵn duy nhất"]), [2]);
    q.r.slice(q.l.length).forEach((r) => assert.ok(q.l.every((l) => !T[r](+l)), "ô thừa không đúng với số nào: " + r));
    return q.l.map((l) => { const m = q.r.filter((r) => T[r](+l)); assert.equal(m.length, 1, "số " + l); return m[0]; });
  }, more: (q) => has(q, ["21 = 3 · 7"]) },
  { has: "lớn hơn 21 và nhỏ hơn 79 chia hết cho 5", right: () => range(22, 78).filter((n) => n % 5 === 0).length, more: (q) => has(q, [range(22, 78).filter((n) => n % 5 === 0).join("; ")]) },
  { has: "phân tích số 264 ra thừa số nguyên tố", right: () => factor(264),
    more: (q) => q.o.slice(1).forEach((o) => { const f = o.split(" · ").map((x) => ev(x)); assert.ok(ev(o) === 264 && f.some((x) => !isPrime(x) && !/[²³]/.test(o.split(" · ")[f.indexOf(x)])), "lựa chọn " + o + " bằng 264 nhưng còn thừa số là hợp số"); }) },
  { has: "chữ số hàng chục gấp đôi chữ số hàng đơn vị", right: () => { const m = range(10, 99).filter((n) => Math.floor(n / 10) === 2 * (n % 10) && n % 9 === 0); assert.equal(m.length, 1); return m[0]; },
    more: (q) => has(q, [range(10, 99).filter((n) => Math.floor(n / 10) === 2 * (n % 10)).join("; ")]) },
  { has: "Các bội chung của 6 và 10 nhỏ hơn 100", right: () => range(0, 99).filter((n) => n % 6 === 0 && n % 10 === 0).join("; "),
    more: (q) => { assert.ok(16 % 6 && 96 % 10 && !(96 % 6)); has(q, [range(0, 99).filter((n) => n % 10 === 0).join("; ")]); } },
  { has: "ƯCLN(42, 98)", right: () => String(gcd(42, 98)), more: (q) => has(q, [`42 = ${factor(42)}; 98 = ${factor(98)}`, `ƯCLN(42, 98) = 2 · 7 = ${gcd(42, 98)}`]) },
  { has: "Mẫu chung nhỏ nhất của ba phân số 3/8, 5/12 và 7/30", right: () => String(lcm(8, 12, 30)),
    more: (q) => { [[3, 8], [5, 12], [7, 30]].forEach(([a, b]) => { assert.equal(gcd(a, b), 1, `${a}/${b} tối giản`); has(q, [`${a}/${b} = ${a * 120 / b}/120`]); }); has(q, [`BCNN(8, 12, 30) = ${factor(lcm(8, 12, 30))} = ${lcm(8, 12, 30)}`]); } },
  { has: "bạn An cứ 4 ngày đến tập một lần", right: () => DATE(1, lcm(4, 6, 9)),
    more: (q) => { assert.deepEqual(q.o.slice(1), ["Ngày 6 tháng 12", DATE(1, lcm(4, 6)), DATE(1, lcm(6, 9))]); assert.equal(new Date(2026, 10, 31).getDate(), 1); // nhiễu: coi tháng 11 có 31 ngày; BCNN của hai bạn
      has(q, [`BCNN(4, 6, 9) = ${factor(lcm(4, 6, 9))} = ${lcm(4, 6, 9)}`, `12 = BCNN(4, 6)`, `18 = BCNN(6, 9)`]); } },
  { has: "tấm bìa hình chữ nhật giống nhau, mỗi tấm dài 20 cm, rộng 12 cm", essay: (q) => {
    const c = lcm(20, 12), so = (c / 20) * (c / 12); assert.equal(so, (c * c) / (20 * 12));
    both(q, [`BCNN(20, 12) = ${factor(c)} = ${c}`, `60 : 20 = 3`, `60 : 12 = 5`, `3 · 5 = ${so}`]); assert.ok(rb(q).includes("20 = 2² · 5; 12 = 2² · 3") && q.x.includes(`Đáp số: a) ${c} cm; b) ${so} tấm.`));
  } },
  { has: "Cho hình bình hành ABCD có hai đường chéo AC và BD cắt nhau tại O", right: (q) => {
    assert.deepEqual(q.o, ["AB = CD và AD = BC.", "AB song song với CD.", "OA = OC và OB = OD.", "Hai đường chéo AC và BD luôn bằng nhau."]);
    const mid = (p, r) => [(p[0] + r[0]) / 2, (p[1] + r[1]) / 2];
    return [PARA.every((P) => close(dist(P.A, P.B), dist(P.C, P.D)) && close(dist(P.A, P.D), dist(P.B, P.C))), PARA.every((P) => songSong(sub(P.B, P.A), sub(P.C, P.D))),
      PARA.every((P) => dist(mid(P.A, P.C), mid(P.B, P.D)) < 1e-9), PARA.every((P) => close(dist(P.A, P.C), dist(P.B, P.D)))];
  } },
  { has: "Để vẽ tam giác đều ABC có cạnh 4 cm", right: () => { const t = [[0, 0], [4, 0], [2, 2 * Math.sqrt(3)]]; sides(t).forEach((v) => assert.ok(close(Math.hypot(...v), 4))); return Math.round(goc(t)[0]) + "°"; } },
  { has: "Cho hình chữ nhật ABCD có AB = 8 cm, BC = 5 cm", right: (q) => {
    const A = [0, 0], B = [8, 0], C = [8, 5], D = [0, 5];
    assert.deepEqual(q.o, ["CD = 8 cm và AD = 5 cm.", "Hai đường chéo AC và BD bằng nhau.", "Hai đường chéo AC và BD vuông góc với nhau.", "Góc ABC bằng 90°."]);
    return [dist(C, D) === 8 && dist(A, D) === 5, close(dist(A, C), dist(B, D)), vuongGoc(sub(C, A), sub(D, B)), close(goc([A, B, C, D])[1], 90)];
  } },
  { has: "Biết chu vi của hình lục giác đều là 48 cm", right: (q) => { lucGiac(q.svg); assert.equal(texts(q.svg).length, 0, "hình không ghi chữ"); return 3 * div(+/là (\d+) cm/.exec(q.q)[1], 6); }, more: (q) => has(q, ["48 : 6 = 8", "3 · 8 = 24"]) },
  { has: "Tính diện tích hình bình hành ABCD", right: (q) => {
    const P = tuGiac(q.svg, ["A", "B", "C", "D"]);
    assert.ok(songSong(sub(P.B, P.A), sub(P.C, P.D)) && songSong(sub(P.D, P.A), sub(P.C, P.B)) && !vuongGoc(sub(P.B, P.A), sub(P.D, P.A)), "hình bình hành (không phải hình chữ nhật)");
    const H = duongCao(q.svg, P.A, P.D, P.C), m = soDo(q.svg, Object.assign(ABCD(P), { AH: [P.A, H] }), "cm");
    assert.deepEqual(Object.keys(m).sort(), ["AH", "CD"]);
    const k = dist(P.C, P.D) / m.CD; assert.ok(close(dienTich([P.A, P.B, P.C, P.D]) / k / k, m.CD * m.AH)); return m.CD * m.AH;
  }, more: (q) => has(q, ["DC = 12 cm, AH = 7 cm", "12 · 7 = 84"]) },
  { has: "khung tranh có dạng hình thoi với chu vi 28 cm", right: () => div(28, 4) },
  { has: "viên gạch trang trí có dạng hình thoi ABCD", right: (q) => {
    const P = tuGiac(q.svg, ["A", "B", "C", "D"]); sides([P.A, P.B, P.C, P.D]).forEach((v) => assert.ok(close(Math.hypot(...v), dist(P.A, P.B)), "bốn cạnh bằng nhau"));
    const L = lines(q.svg); assert.equal(L.length, 2, "hai đường chéo");
    [[P.A, P.C], [P.B, P.D]].forEach(([p, r]) => assert.ok(L.some((l) => [l.a, l.b].every((e) => dist(e, p) < 0.01 || dist(e, r) < 0.01)), "vẽ đường chéo"));
    assert.ok(vuongGoc(sub(P.C, P.A), sub(P.D, P.B)), "hai đường chéo vuông góc");
    const m = soDo(q.svg, Object.assign(ABCD(P), { AC: [P.A, P.C], BD: [P.B, P.D] }), "cm"); assert.deepEqual(Object.keys(m).sort(), ["AC", "BD"]);
    const k = dist(P.A, P.C) / m.AC; assert.ok(close(dienTich([P.A, P.B, P.C, P.D]) / k / k, m.AC * m.BD / 2)); return m.AC * m.BD / 2;
  }, more: (q) => has(q, ["AC = 12 cm, BD = 9 cm", "12 · 9 : 2 = 108 : 2 = 54"]) },
  { has: "Mặt trước của một ngôi nhà nhỏ", essay: (q) => {
    // hình: tường (hình chữ nhật tô acc-soft), cửa (hình chữ nhật tô surface, sát chân tường), mái (hình thang cân nằm trên tường)
    const R = rects(q.svg), tuong = R.find((r) => r.fill === "acc-soft"), cua = R.find((r) => r.fill === "surface"), mai = polys(q.svg);
    assert.ok(R.length === 2 && tuong && cua && mai.length === 1 && mai[0].length === 4);
    const [tx, ty, tw, th] = ["x", "y", "width", "height"].map((a) => +tuong[a]), [cx, cy, cw, ch] = ["x", "y", "width", "height"].map((a) => +cua[a]), k = tw / 8;
    assert.ok(cx > tx && cx + cw < tx + tw && cy > ty && cy + ch === ty + th, "cửa nằm trong tường, sát chân tường");
    const M = mai[0].slice().sort((a, b) => a[1] - b[1] || a[0] - b[0]), [t1, t2, d1, d2] = M; // hai đỉnh trên, hai đỉnh dưới
    assert.ok(t1[1] === t2[1] && d1[1] === d2[1] && d1[1] === ty && close(dist(t1, d1), dist(t2, d2)), "mái là hình thang cân, đáy lớn nằm trên mép tường");
    const so = { tuongDai: tw / k, tuongCao: th / k, cuaRong: cw / k, cuaCao: ch / k, daiLon: (d2[0] - d1[0]) / k, daiNho: (t2[0] - t1[0]) / k, maiCao: (d1[1] - t1[1]) / k };
    assert.deepEqual(so, { tuongDai: 8, tuongCao: 4, cuaRong: 2, cuaCao: 3, daiLon: 10, daiNho: 6, maiCao: 2 }, "kích thước trong hình đúng tỉ lệ với đề");
    assert.deepEqual(texts(q.svg).map((t) => +t.t.replace(" m", "")).sort((a, b) => a - b), Object.values(so).sort((a, b) => a - b), "nhãn số đo trong hình");
    assert.ok(q.q.includes("dài 8 m, cao 4 m") && q.q.includes("rộng 2 m, cao 3 m") && q.q.includes("đáy lớn 10 m, đáy nhỏ 6 m, chiều cao 2 m") && q.q.includes("45 000 đồng"));
    const tuongS = 8 * 4, cuaS = 2 * 3, son = tuongS - cuaS, maiS = (10 + 6) * 2 / 2, tien = son * 45000;
    both(q, [`8 · 4 = ${tuongS}`, `2 · 3 = ${cuaS}`, `${tuongS} − ${cuaS} = ${son}`, `(10 + 6) · 2 : 2 = ${maiS}`, `${son} · 45 000 = ${fmt(tien)}`]);
    assert.ok(q.x.includes(`Đáp số: a) ${son} m²; b) ${maiS} m²; c) ${fmt(tien)} đồng.`));
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
    if (c.more) c.more(q);
    n++;
  });
};
for (const [id, checks] of [[DE1, de1], [DE2, de2], [DE3, de3], [DE4, de4]]) {
  const b = bank(id); assert.ok(b, "thiếu " + id); assert.equal(b.questions.length, 25);
  run(id, b.questions, checks);
}
const pool = bank(POOL), mine = pool.questions.filter((q) => q.src === POOL);
run(POOL, mine, own);

/* ---------- mức độ và ma trận ---------- */
assert.ok(pool.questions.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M), TOPICS = Object.keys(M);
assert.deepEqual(pool.pool.from, [DE1, DE2]);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
const levels = (qs) => [1, 2, 3].map((l) => qs.filter((q) => q.lv === l).length);
// Đề 1: 25 câu của bốn chủ đề Chương I–II (lớp chưa học số nguyên), 10 – 8 – 7, không có số âm ở chữ nào của câu
const d1 = bank(DE1).questions, AM = /(^|[\s([{;])[-−]\d/;
assert.deepEqual([...new Set(d1.map((q) => q.topic))], TOPICS.slice(0, 4), "Đề 1 chỉ có bốn chủ đề đầu, theo thứ tự");
assert.deepEqual(levels(d1), [10, 8, 7], "Đề 1: 10 Biết, 8 Hiểu, 7 Vận dụng");
d1.forEach((q, i) => [q.q, q.x].concat(q.o || [], q.ans || [], q.l || [], q.r || []).forEach((s) => assert.ok(!AM.test(String(s)), `${DE1}#${i + 1}: có số âm: ${s}`)));
// Đề 2: chia đúng theo ma trận (mỗi chủ đề, mỗi mức đúng số câu ma trận rút), câu theo thứ tự chủ đề của ma trận
const d2 = bank(DE2).questions;
TOPICS.forEach((t) => assert.deepEqual(levels(d2.filter((q) => q.topic === t)), M[t], "Đề 2 đúng ma trận ở chủ đề " + t));
assert.deepEqual([...new Set(d2.map((q) => q.topic))], TOPICS, "Đề 2 đủ chủ đề, theo thứ tự ma trận");
// mỗi ô có ít nhất gấp đôi số câu ô đó rút; câu riêng nào cũng nằm trong một ô có số câu của ma trận; người đã làm Đề 1 vẫn có đủ câu khác ở mọi ô
Object.entries(M).forEach(([t, v]) => v.forEach((k, i) => {
  const all = pool.questions.filter((q) => q.topic === t && q.lv === i + 1);
  assert.ok(all.length >= 2 * k, `ô (${t}, mức ${i + 1}) rút ${k} câu mà kho chỉ có ${all.length}`);
  assert.ok(all.filter((q) => q.src !== DE1).length >= k, `ô (${t}, mức ${i + 1}): ngoài Đề 1 chỉ có ${all.filter((q) => q.src !== DE1).length} câu`);
}));
mine.forEach((q, i) => assert.ok(M[q.topic] && M[q.topic][q.lv - 1] > 0, `${POOL}#${i + 1}: ô (${q.topic}, mức ${q.lv}) không có trong ma trận`));
// câu tự luận chỉ ở các ô Vận dụng rút 1 câu, nhiều nhất hai ô: mỗi lần rút nhiều nhất 2 câu tự luận
const oTuLuan = [...new Set(pool.questions.filter((q) => q.type === "essay").map((q) => q.topic + "|" + q.lv))];
assert.ok(oTuLuan.length <= 2 && oTuLuan.every((k) => { const [t, lv] = k.split("|"); return +lv === 3 && M[t][2] === 1 && pool.questions.some((q) => q.topic === t && q.lv === 3 && q.type !== "essay"); }), "câu tự luận: " + oTuLuan);
const seen = new Set();
let essays = 0;
for (let k = 0; k < 400; k++) {
  const d = Quiz.draw(pool);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, 25);
  assert.deepEqual(levels(d.questions), [10, 8, 7]);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual(levels(d.questions.filter((q) => q.topic === t)), v, "rút đúng ma trận ở chủ đề " + t));
  const e = d.questions.filter((q) => q.type === "essay").length; assert.ok(e <= 2, "một lần rút có " + e + " câu tự luận"); essays += e;
  d.questions.forEach((q) => seen.add(Quiz.key(q)));
}
assert.ok(mine.every((q) => seen.has(Quiz.key(q))), "400 lần rút thử phải gặp đủ các câu riêng");
// học sinh đã làm Đề 1 (đúng hết): lần rút sau chỉ lấy câu của Đề 2 và câu riêng (lịch sử câu như PoolHist: {done, wrong})
const hist = (q) => (q.src === DE1 ? { done: 1, wrong: 0 } : null);
for (let k = 0; k < 50; k++) assert.ok(!Quiz.draw(pool, hist).questions.some((q) => q.src === DE1), "đã làm Đề 1 thì bộ rút không lấy lại câu của Đề 1");

/* ---------- Đề 3, Đề 4 (Phiên N26): Chương I, II, IV cho trường dạy song song số và hình ---------- */
const HINH = ["Hình phẳng", "Chu vi, diện tích"], CHU_DE = TOPICS.slice(0, 4).concat(HINH), SO_CAU = [3, 4, 5, 5, 4, 4];
HINH.forEach((t) => assert.ok(t in bank("toan6-ck1-ngau-nhien").pool.matrix, "chủ đề “" + t + "” đúng chữ của kho cuối kì I"));
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null ? [] : [].concat(q.ans), q.l || [], q.r || [], (q.rubric || []).map((c) => c.c)).map(String);
for (const id of [DE3, DE4]) {
  const b = bank(id), qs = b.questions;
  assert.ok(b.minutes === 60 && !pool.pool.from.includes(id), id + ": 60 phút, không nằm trong kho của đề ngẫu nhiên");
  assert.deepEqual(qs.map((q) => q.topic), CHU_DE.flatMap((t, i) => Array(SO_CAU[i]).fill(t)), id + ": số câu từng chủ đề 3 – 4 – 5 – 5 – 4 – 4, theo thứ tự");
  assert.deepEqual(levels(qs), [10, 8, 7], id + ": 10 Biết, 8 Hiểu, 7 Vận dụng");
  assert.ok(qs.filter((q) => ["num", "fill"].includes(q.type)).length >= 10, id + ": ít nhất 10 câu trả lời bằng số hoặc điền khuyết");
  const tl = qs.filter((q) => q.type === "essay");
  assert.deepEqual(tl.map((q) => q.topic), ["Lũy thừa, thứ tự thực hiện phép tính", "ƯCLN và BCNN", "Chu vi, diện tích"], id + ": ba câu tự luận (tính hợp lí, tìm x; ƯCLN, BCNN; chu vi, diện tích)");
  assert.ok(tl.every((q) => q.lv === 3 && q.rubric.every((c) => c.p > 0 && Number.isInteger(c.p * 4))) && tl[2].svg, id + ": tự luận mức Vận dụng, thang điểm, bài chu vi, diện tích có hình");
  assert.ok(qs.every((q) => ["num", "fill", "essay", "mc", "tf4", "match"].includes(q.type)), id + ": còn lại là trắc nghiệm, đúng/sai 4 ý, nối cột");
  const nh = qs.filter((q) => q.svg).length; assert.ok(nh >= 3 && nh <= 5, id + ": khoảng 4 câu có hình (" + nh + ")");
  qs.forEach((q, i) => chu(q).forEach((s) => assert.ok(!AM.test(s), `${id}#${i + 1}: có số âm: ${s}`)));
}
// đề bài không trùng câu nào khác trong data/banks/6-toan.js (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng
const goc6 = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const deBai = BANKS.filter((b) => b.file === "6-toan.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc6(q.q) })));
deBai.filter((d) => /^toan6-gk1-de[34]#/.test(d.at)).forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
/* dò lộ đáp án trong từng đề (Rút ra N5, N24, N8): đáp án của mỗi câu có trong đề bài, lựa chọn, lời giải, thang chấm của câu khác cùng
   đề không. Đáp án là số (từ hai chữ số) chỉ tìm ở vị trí kết quả: ngay sau “=”, “là”, “bằng”, “được” (không tính số đo góc, phân số,
   số thập phân); đáp án khác (lựa chọn đúng, đáp án điền, đáp số của câu tự luận) tìm cả chữ; cặp nối: câu khác có cả hai vế; biểu thức
   của đề (ƯCLN(…), BCNN(…), ƯC(…), phân số) có ở câu khác. */
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*)(?!\d|,\d|\/|°|[⁰¹²³⁴⁵⁶⁷⁸⁹]|\s*[·+−:](?:\s|\d|\())/gu)].map((m) => val(m[1])); // không tính số còn phép tính theo sau
const doLo = (id, qs) => {
  const lo = [];
  qs.forEach((q, i) => {
    const so = [], cum = [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const them = (a) => (/^\d{1,3}(?: \d{3})*(?: [^\d\s]+)?$/.test(String(a)) && !/°$/.test(String(a)) ? so.push(val(String(a).split(/ (?=[^\d\s])/)[0])) : cum.push(String(a)));
    if (q.type === "essay") (/Đáp số: (.+)$/m.exec(q.x)[1].match(/\d{1,3}(?: \d{3})*/g) || []).forEach((x) => so.push(val(x)));
    else if (q.type === "num") so.push(q.ans); else if (q.type === "fill") them(q.ans[0]); else if (q.type === "mc") them(q.o[0]);
    const bt = q.q.match(/(?:ƯCLN|BCNN|ƯC|BC)\([^)]*\)|\d+\/\d+/g) || [];
    qs.forEach((p, j) => {
      if (j === i) return; const kq = chu(p).flatMap(soKQ), T = chu(p).map((s) => s.toLowerCase()), co = (s) => T.some((t) => t.includes(s.toLowerCase())), at = `${id}#${j + 1} lộ đáp án câu ${i + 1}: `;
      so.filter((x) => x >= 10 && kq.includes(x)).forEach((x) => lo.push(at + x));
      cum.concat(bt).filter(co).forEach((s) => lo.push(at + s));
      cap.filter(([l, r]) => T.some((t) => t.includes(l.toLowerCase()) && t.includes(r.toLowerCase()))).forEach(([l, r]) => lo.push(at + l + " → " + r));
    });
  });
  return lo;
};
[DE3, DE4].forEach((id) => { const lo = doLo(id, bank(id).questions); assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n")); });
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 311”, có chữ “3/4”, có biểu thức BCNN(15, 36), có cả hai vế một cặp nối
const d3 = bank(DE3).questions, gia = (i, x) => Object.assign({}, d3[i], { x: d3[i].x + " " + x });
assert.deepEqual(doLo("thử", [d3[2], gia(5, "Ví dụ: 12 · 25 + 11 = 311.")]), ["thử#2 lộ đáp án câu 1: 311"]);
assert.deepEqual(doLo("thử", [d3[14], d3[13], gia(0, "45/60 = 3/4; BCNN(15, 36) lớn hơn 36.")]), ["thử#3 lộ đáp án câu 1: 3/4", "thử#3 lộ đáp án câu 1: 45/60", "thử#3 lộ đáp án câu 2: BCNN(15, 36)"]);
assert.deepEqual(doLo("thử", [d3[17], gia(0, "Hình vuông có bốn cạnh bằng nhau, bốn góc bằng nhau và bằng 90°.")]), ["thử#2 lộ đáp án câu 1: Hình vuông → Bốn cạnh bằng nhau, bốn góc bằng nhau và bằng 90°"]);
// bộ đọc số ở vị trí kết quả: lấy 21, 1 170 000, 35; bỏ số đo góc, phân số, số thập phân, lũy thừa, số còn phép tính theo sau
assert.deepEqual(soKQ("Ví dụ: 3 · 7 = 21; góc bằng 120°; 45/60 = 3/4; được 1 170 000 đồng; là 12,5; S = 10 · 7 : 2 = 35; được 10² · 27"), [21, 1170000, 35]);
console.log(n, "câu đã tính lại (100 câu của 4 đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho đề ngẫu nhiên " + pool.questions.length + " câu; trung bình " + (essays / 400).toFixed(2) + " câu tự luận mỗi lần rút.");
console.log("MATH OK");
