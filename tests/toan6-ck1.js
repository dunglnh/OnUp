// Tính lại đáp án ngân hàng Toán 6 cuối kì I (data/banks/6-toan.js): hai đề cố định toan6-ck1-de1, toan6-ck1-de2 và các câu
// riêng của đề ngẫu nhiên toan6-ck1-ngau-nhien (Phiên N4). Mỗi câu: kiểm tra đề có đúng số liệu (has) rồi so đáp án với kết quả
// tính bằng code: trắc nghiệm o[0], điền khuyết ans[0], đúng/sai a, đúng/sai 4 ý a (4 ý), trả lời bằng số ans, nối cột r[i] của
// từng ô l[i], sắp xếp thứ tự o; tự luận: các số trong thang chấm và đáp án gợi ý. Câu có hình: đọc toạ độ trong hình (trục số,
// tứ giác trên lưới ô vuông, cạnh song song, vuông góc, bằng nhau, diện tích, chu vi, trục và tâm đối xứng) rồi mới tính.
// Cuối cùng kiểm tra mức độ và ma trận: mọi câu có lv, mỗi ô (chủ đề, mức) có ít nhất gấp đôi số câu ô đó rút, rút thử nhiều lần
// ra đúng 10 Biết, 8 Hiểu, 7 Vận dụng, nhiều nhất 2 câu tự luận.
// Chạy: node tests/toan6-ck1.js → in MATH OK.
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan6-ck1-ngau-nhien";

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
const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹", sup = (n) => String(n).split("").map((d) => SUP[+d]).join("");
// phân tích ra thừa số nguyên tố, viết như trong đề: "2³ · 3 · 5"
const factor = (n) => { const f = []; for (let p = 2; n > 1; p++) { let k = 0; while (n % p === 0) { n /= p; k++; } if (k) f.push(p + (k > 1 ? sup(k) : "")); } return f.join(" · "); };
// giá trị biểu thức viết như trong đề: "2 000 − [5³ · 2³ − 4 · (3² + 2⁴)]", "(−42) : (−7)"; chữ cái thay bằng số (vars)
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
const nums = (s) => s.trim().split(/[\s,]+/).map(Number);
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const lines = (svg) => [...svg.matchAll(/<line [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { a: [+a.x1, +a.y1], b: [+a.x2, +a.y2], stroke: a.stroke || "", dash: !!a["stroke-dasharray"] }; });
const polys = (svg) => [...svg.matchAll(/<polygon [^>]*>/g)].map((m) => { const a = attrs(m[0]); if (a.fill === "ink") return null; const p = nums(a.points); return p.reduce((o, v, i) => (i % 2 ? o[o.length - 1].push(v) : o.push([v]), o), []); }).filter(Boolean); // bỏ đầu mũi tên tô đặc
const dots = (svg) => [...svg.matchAll(/<circle [^>]*>/g)].map((m) => { const a = attrs(m[0]); return [+a.cx, +a.cy]; });
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { at: [+a.x, +a.y], t: m[2] }; });
const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
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
const nhan = (svg, name) => { const t = texts(svg).filter((x) => x.t === name); assert.equal(t.length, 1, "hình cần đúng một nhãn " + name); return t[0].at; };
const dinh = (pts, svg, name) => { const at = nhan(svg, name); return pts.slice().sort((p, q) => dist(p, at) - dist(q, at))[0]; }; // đỉnh gần nhãn nhất
const tuGiac = (svg, names) => { // đa giác duy nhất trong hình, đỉnh có tên → {A: [x, y], …} (thứ tự đỉnh như trong hình)
  const ps = polys(svg); assert.equal(ps.length, 1, "hình cần đúng một đa giác"); assert.equal(ps[0].length, names.length);
  const o = {}; names.forEach((n) => (o[n] = dinh(ps[0], svg, n)));
  assert.equal(new Set(Object.values(o).map(String)).size, names.length, "mỗi nhãn một đỉnh");
  names.forEach((n, i) => assert.deepEqual(o[n], ps[0][i], "đỉnh " + n + " phải đứng thứ " + (i + 1) + " trong polygon"));
  return o;
};
const trenLuoi = (P, c) => P.forEach(([x, y]) => assert.ok(x % c === 0 && y % c === 0, `đỉnh (${x}, ${y}) phải nằm trên giao điểm của lưới (ô ${c})`));
const oLuoi = (svg) => { // cạnh ô của lưới: khoảng cách giữa hai đường kẻ dọc liền nhau (màu line)
  const xs = [...new Set(lines(svg).filter((l) => l.stroke === "line" && l.a[0] === l.b[0]).map((l) => l.a[0]))].sort((a, b) => a - b);
  const d = new Set(xs.slice(1).map((x, i) => x - xs[i])); assert.equal(d.size, 1, "lưới ô vuông đều"); return [...d][0];
};
// đối xứng: phép biến hình T biến đa giác P thành chính nó (các đỉnh theo cùng thứ tự vòng, xuôi hoặc ngược)
const trungDinh = (P, Q) => P.length === Q.length && [Q, Q.slice().reverse()].some((R) => range(0, P.length - 1).some((k) => P.every((p, i) => dist(p, R[(i + k) % R.length]) < 1e-6)));
const tam = (P) => [sum(P.map((p) => p[0])) / P.length, sum(P.map((p) => p[1])) / P.length];
const doiXung = (P, c, u) => P.map((p) => { const n = Math.hypot(...u), e = [u[0] / n, u[1] / n], d = sub(p, c), t = dot(d, e); return [c[0] + 2 * t * e[0] - d[0], c[1] + 2 * t * e[1] - d[1]]; });
// các trục đối xứng: trục đi qua tâm các đỉnh, theo hướng tới một đỉnh hoặc vuông góc với đoạn nối hai đỉnh (đủ mọi khả năng)
const truc = (P) => {
  const c = tam(P), cand = P.map((p) => sub(p, c)).concat(...P.map((p, i) => P.slice(i + 1).map((q) => { const v = sub(q, p); return [-v[1], v[0]]; }))).filter((u) => Math.hypot(...u) > 1e-9);
  const ok = cand.filter((u) => trungDinh(P, doiXung(P, c, u))), goc0 = ok.map((u) => ((Math.round(Math.atan2(u[1], u[0]) * 180 / Math.PI * 1000) / 1000) % 180 + 180) % 180);
  return [...new Set(goc0)].sort((a, b) => a - b);
};
const coTam = (P, o) => { o = o || tam(P); return trungDinh(P, P.map((p) => [2 * o[0] - p[0], 2 * o[1] - p[1]])); };
const tenHinh = (svg, P) => { const at = tam(P)[0]; return texts(svg).filter((t) => /^Hình \d$/.test(t.t)).sort((x, y) => Math.abs(x.at[0] - at) - Math.abs(y.at[0] - at))[0].t; };
// hình thang cân: đúng một cặp cạnh đối song song, hai cạnh còn lại bằng nhau
const thangCan = (P) => { const s = sides(P), ss = [songSong(s[0], s[2]), songSong(s[1], s[3])]; if (P.length !== 4 || ss[0] === ss[1]) return false; const [p, q] = ss[0] ? [s[1], s[3]] : [s[0], s[2]]; return close(Math.hypot(...p), Math.hypot(...q)); };
const doiCanh = (P) => { const s = sides(P); return [songSong(s[0], s[2]), songSong(s[1], s[3])].filter(Boolean).length; }; // số cặp cạnh đối song song

/* ---------- kiểm tra từng câu ----------
   right(q): đáp án tính bằng code (so với o[0], ans[0], a, ans, r của từng ô trái, o); more(q): kiểm tra thêm (nhiễu, bước giải, hình). */
const RECT = [[0, 0], [5, 0], [5, 3], [0, 3]];
const de1 = [
  { has: "A = {x ∈ ℕ | 5 < x ≤ 9}", right: () => "A = {" + range(0, 20).filter((x) => 5 < x && x <= 9).join("; ") + "}" },
  { has: "Số La Mã XVII", right: () => String(fromRoman("XVII")), more: (q) => assert.ok(q.x.includes("XVII = 10 + 5 + 1 + 1 = 17")) },
  { has: "50 · 37 · 2", right: () => String(ev("50 · 37 · 2")), more: () => assert.equal(50 * 2, 100) },
  { has: "46 · 73 + 46 · 27", right: () => String(ev("46 · 73 + 46 · 27")), more: () => assert.equal(73 + 27, 100) },
  { has: "3⁴ · 3⁵", right: () => "3" + sup(4 + 5), more: (q) => q.o.forEach((o, i) => assert.equal(ev(o) === ev("3⁴ · 3⁵"), i === 0, "lựa chọn " + o)) },
  { has: "4¹⁰ : 4² = 4⁵", right: () => eq("4¹⁰ : 4² = 4⁵"), more: () => assert.ok(eq("4¹⁰ : 4² = 4⁸")) },
  { has: "80 − 2 · (5 + 3²)", right: () => String(ev("80 − 2 · (5 + 3²)")) },
  { has: "3x − 15 = 42", right: () => String(range(0, 100).find((x) => 3 * x - 15 === 42)) },
  { has: "chia hết cho cả 2, 3 và 5", right: (q) => { const m = q.o.filter((o) => val(o) % 30 === 0); assert.equal(m.length, 1); return m[0]; } },
  { has: "Số 2 457 chia hết cho 9", right: () => 2457 % 9 === 0, more: () => assert.equal(2 + 4 + 5 + 7, 18) },
  { has: "37* chia hết cho cả 2 và 5", right: () => { const m = range(0, 9).filter((d) => (370 + d) % 10 === 0); assert.equal(m.length, 1); return String(m[0]); } },
  { has: "1; 15; 29; 51, số nào là số nguyên tố", right: () => { const m = [1, 15, 29, 51].filter(isPrime); assert.equal(m.length, 1); return String(m[0]); } },
  { has: "Phân tích số 120 ra thừa số nguyên tố", right: () => factor(120), more: (q) => q.o.forEach((o) => assert.equal(ev(o), 120, "lựa chọn " + o + " phải bằng 120")) },
  { has: "ƯCLN(48, 72)", right: () => String(gcd(48, 72)), more: (q) => assert.ok(q.x.includes("48 = " + factor(48)) && q.x.includes("72 = " + factor(72))) },
  { has: "cứ 10 ngày một lần và bón phân cho chậu hoa hồng cứ 15 ngày", right: () => String(lcm(10, 15)), more: (q) => assert.ok(q.x.includes(`BCNN = ${factor(lcm(10, 15))} = ${lcm(10, 15)}`)) },
  { has: "Số đối của −12", right: () => fmt(-(-12)) },
  { has: "−8 > −6", right: () => -8 > -6 },
  { has: "(−25) + 17 − (−8)", right: () => ev("(−25) + 17 − (−8)") },
  { has: "(135 − 49) − (135 + 51)", right: () => ev("(135 − 49) − (135 + 51)") },
  { has: "(−4) · 5 · (−3)", right: () => fmt(ev("(−4) · 5 · (−3)")) },
  { has: "(−72) : 8", right: () => div(-72, 8) },
  { has: "Với mọi hình chữ nhật ABCD", right: (q) => { // hình chữ nhật không vuông: A, B, C, D = RECT
    assert.deepEqual(q.o, ["Hai đường chéo AC và BD bằng nhau", "Bốn cạnh bằng nhau", "Hai đường chéo vuông góc với nhau", "Hai đường chéo cắt nhau tại trung điểm của mỗi cạnh"]);
    const [A, B, C, D] = RECT, s = sides(RECT), O = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2];
    const truth = [close(dist(A, C), dist(B, D)), s.every((v) => close(Math.hypot(...v), Math.hypot(...s[0]))), vuongGoc(sub(C, A), sub(D, B)), RECT.some((p, i) => dist(O, [(p[0] + RECT[(i + 1) % 4][0]) / 2, (p[1] + RECT[(i + 1) % 4][1]) / 2]) < 1e-9)];
    assert.equal(truth.filter(Boolean).length, 1); return q.o[truth.indexOf(true)];
  } },
  { has: "hai đáy dài 6 cm và 10 cm, chiều cao 4 cm", right: () => String(div((6 + 10) * 4, 2)) },
  { has: "Hình vuông có 4 trục đối xứng", right: () => truc([[0, 0], [4, 0], [4, 4], [0, 4]]).length === 4 },
  { has: "có tâm đối xứng nhưng không có trục đối xứng", right: (q) => { // chữ in hoa vẽ bằng các nét thẳng trong khung rộng 3, cao 4
    const NET = { Z: [[[0, 0], [3, 0]], [[3, 0], [0, 4]], [[0, 4], [3, 4]]], I: [[[0, 0], [3, 0]], [[1.5, 0], [1.5, 4]], [[0, 4], [3, 4]]], A: [[[0, 4], [1.5, 0]], [[1.5, 0], [3, 4]], [[0.75, 2], [2.25, 2]]], E: [[[0, 0], [0, 4]], [[0, 0], [3, 0]], [[0, 2], [2, 2]], [[0, 4], [3, 4]]] };
    const sym = (segs, T) => segs.every(([p, r]) => segs.some(([a, b]) => (dist(T(p), a) < 1e-9 && dist(T(r), b) < 1e-9) || (dist(T(p), b) < 1e-9 && dist(T(r), a) < 1e-9)));
    const c = [1.5, 2], axis = (segs) => range(0, 359).some((k) => { const u = [Math.cos(k * Math.PI / 360), Math.sin(k * Math.PI / 360)]; return sym(segs, (p) => doiXung([p], c, u)[0]); });
    const m = q.o.filter((ch) => sym(NET[ch], (p) => [2 * c[0] - p[0], 2 * c[1] - p[1]]) && !axis(NET[ch]));
    assert.equal(m.length, 1); assert.ok(axis(NET.I) && axis(NET.A) && axis(NET.E) && sym(NET.I, (p) => [3 - p[0], 4 - p[1]]), "I có cả trục và tâm, A, E có trục");
    return m[0];
  } }
];
const SHAPE = { "Hình chữ nhật": RECT, "Tam giác đều": [[0, 0], [2, 0], [1, Math.sqrt(3)]], "Hình thang cân": [[1, 0], [3, 0], [4, 2], [0, 2]], "Tam giác vuông": [[0, 0], [3, 0], [0, 2]] };
const de2 = [
  { has: "H = {x ∈ ℕ* | x ≤ 9}", right: () => String(range(1, 20).filter((x) => x <= 9).length) },
  { has: "XIX biểu diễn số 21", right: () => fromRoman("XIX") === 21, more: (q) => { assert.equal(toRoman(21), "XXI"); assert.ok(q.x.includes("XIX = 10 + 9 = 19") && !q.x.includes("−"), "lời giải không dùng quy tắc trừ"); } },
  { has: "4 052 817, chữ số 5", right: () => { const s = "4052817", i = s.indexOf("5"); return fmt(5 * 10 ** (s.length - 1 - i)); } },
  { has: "Hình nào dưới đây có tâm đối xứng", right: (q) => { const m = q.o.filter((n) => coTam(SHAPE[n])); assert.equal(m.length, 1); return m[0]; } },
  { has: "Tam giác đều có đúng 1 trục đối xứng", right: () => truc(SHAPE["Tam giác đều"]).length === 1, more: () => assert.equal(truc(SHAPE["Tam giác đều"]).length, 3) },
  { has: "2ⁿ = 64", right: () => String(range(0, 10).find((n) => 2 ** n === 64)) },
  { has: "4² + 3³", right: () => String(ev("4² + 3³")), more: (q) => q.o.slice(1).forEach((o) => assert.notEqual(val(o), ev("4² + 3³"))) },
  { has: "[(14 − 4) · 5 + 50] : 10", right: () => String(ev("[(14 − 4) · 5 + 50] : 10")) },
  { has: "18 − 6 : 3 là 4", right: () => ev("18 − 6 : 3") === 4, more: () => assert.equal(ev("18 − 6 : 3"), 16) },
  { has: "28 + 64 + 92 chia hết cho 4", right: () => (28 + 64 + 92) % 4 === 0, more: () => [28, 64, 92].forEach((v) => assert.equal(v % 4, 0)) },
  { has: "chia hết cho 3 nhưng không chia hết cho 9", right: (q) => { const m = q.o.filter((o) => val(o) % 3 === 0 && val(o) % 9 !== 0); assert.equal(m.length, 1); return m[0]; } },
  { has: "số nguyên tố nhỏ hơn 20", right: () => String(range(1, 19).filter(isPrime).length) },
  { has: "Số nào dưới đây là hợp số", right: (q) => { const m = q.o.filter((o) => !isPrime(val(o))); assert.equal(m.length, 1); return m[0]; }, more: () => assert.equal(7 * 13, 91) },
  { has: "BCNN(12, 18)", right: () => String(lcm(12, 18)) },
  { has: "36 cuốn truyện tranh và 24 cuốn truyện chữ", right: () => String(gcd(36, 24)), more: (q) => q.o.forEach((o) => assert.equal(36 % val(o) === 0 && 24 % val(o) === 0, val(o) !== 72, "lựa chọn " + o)) },
  { has: "8 và 15 là hai số nguyên tố cùng nhau", right: () => gcd(8, 15) === 1 },
  { has: "4; −7; 0; −2; 9 theo thứ tự giảm dần", right: () => [4, -7, 0, -2, 9].sort((a, b) => b - a).map(fmt).join("; ") },
  { has: "−2 °C, đến trưa nhiệt độ tăng thêm 7 °C", right: () => String(-2 + 7) },
  { has: "(−38) + (−62)", right: () => ev("(−38) + (−62)") },
  { has: "15 − (a − 7 + b)", right: (q) => { const t = [[1, 2], [5, -3], [-4, 10]], m = q.o.filter((o) => t.every(([a, b]) => ev(o, { a, b }) === ev("15 − (a − 7 + b)", { a, b }))); assert.equal(m.length, 1); return m[0]; } },
  { has: "(−7) · 4 − 6 · (−5)", right: () => ev("(−7) · 4 − 6 · (−5)") },
  { has: "Tất cả các ước của 14", right: () => divisors(14).map((d) => -d).reverse().concat(divisors(14)).map(fmt).join("; ") },
  { has: "Mỗi góc của hình lục giác đều", right: () => { const g = goc(range(0, 5).map((k) => [Math.cos(k * Math.PI / 3), Math.sin(k * Math.PI / 3)])); g.forEach((x) => assert.ok(close(x, 120, 1e-9))); return "120°"; } },
  { has: "chiều dài 14 m, chiều rộng 9 m. Chu vi", right: () => String((14 + 9) * 2) },
  { has: "cạnh đáy 12 cm, chiều cao tương ứng 5 cm", right: () => fmt(12 * 5) + " cm²" }
];
// câu riêng của đề ngẫu nhiên
const own = [
  { has: "Nối mỗi số La Mã", right: (q) => q.l.map((r) => String(fromRoman(r))), more: (q) => { q.r.slice(q.l.length).forEach((x) => assert.ok(!q.l.some((r) => fromRoman(r) === val(x)))); assert.ok(q.x.includes("XXIX = 10 + 10 + 9 = 29") && !q.x.includes("trừ"), "lời giải theo năm thành phần, không dùng quy tắc trừ"); } },
  { has: "A = {x ∈ ℕ | 2 ≤ x < 7}", right: (q) => { // đọc số trong từng ý
    const A = range(0, 20).filter((x) => 2 <= x && x < 7), set = (a) => "{" + a.join("; ") + "}", m = q.o.map((o) => /^A = (\{.*\})$|^(\d+) ∈ A$|^Tập hợp A có (\d+) phần tử$|^Tập hợp các số chẵn thuộc A là (\{.*\})$/.exec(o));
    assert.ok(m.every(Boolean) && m.every((x, i) => x[i + 1] !== undefined), "chữ các ý: " + q.o);
    return [set(A) === m[0][1], A.includes(+m[1][2]), A.length === +m[2][3], set(A.filter((x) => x % 2 === 0)) === m[3][4]];
  } },
  { has: "Sắp xếp các số sau theo thứ tự từ bé đến lớn", right: (q) => q.o.slice().sort((a, b) => val(a) - val(b)), more: (q) => assert.equal(new Set(q.o.map(val)).size, 4) },
  { has: "1 228 cuốn vở", right: () => Math.ceil(1228 / 22), more: () => { assert.equal(22 * 55, 1210); assert.equal(1228 - 1210, 18); } },
  { has: "đánh số trang cho một cuốn sổ dày 120 trang", right: () => String(sum(range(1, 120).map((p) => String(p).length))), more: () => assert.equal(9 + 90 * 2 + 21 * 3, 252) },
  { has: "Tổng S = 2 + 4 + 6 + … + 98 + 100", right: () => fmt(sum(range(1, 50).map((k) => 2 * k))), more: (q) => { q.o.slice(1).forEach((o) => assert.notEqual(val(o), 2550)); assert.equal(102 * 25, 2550); } },
  { has: "Viết gọn tích 7 · 7 · 7 · 7 · 7 · 7 ", right: () => "7" + sup(6), more: (q) => q.o.forEach((o, i) => assert.equal(ev(o) === 7 ** 6, i === 0, "lựa chọn " + o)) },
  { has: "Sắp xếp các lũy thừa sau", right: (q) => q.o.slice().sort((a, b) => ev(a) - ev(b)), more: (q) => assert.equal(new Set(q.o.map((o) => ev(o))).size, 4) },
  { has: "Mỗi đẳng thức sau về lũy thừa", right: (q) => q.o.map(eq), more: () => assert.equal(ev("3⁴"), 81) },
  { has: "5 · (x + 3) − 2³ = 47", right: () => { const m = range(0, 100).filter((x) => ev("5 · (x + 3) − 2³", { x }) === 47); assert.equal(m.length, 1); return String(m[0]); } },
  { has: "số vi khuẩn trong một ống nghiệm lại tăng gấp đôi", right: () => 5 * 2 ** (12 - 7) },
  { has: "Giá trị của biểu thức 2 000 − [5³ · 2³ − 4 · (3² + 2⁴)]", right: (q) => fmt(ev(/biểu thức (.+) là:/.exec(q.q)[1])), more: (q) => { assert.equal(ev("5³ · 2³ − 4 · (3² + 2⁴)"), 900); q.o.slice(1).forEach((o) => assert.notEqual(val(o), 1100)); } },
  { has: "chia hết cho 5 nhưng không chia hết cho 2", right: (q) => { const m = q.o.filter((o) => val(o) % 5 === 0 && val(o) % 2 !== 0); assert.equal(m.length, 1); return m[0]; } },
  { has: "số tự nhiên có ba chữ số chia hết cho 9", right: () => fmt(range(100, 999).filter((n) => n % 9 === 0).length), more: () => assert.equal((999 - 108) / 9 + 1, 100) },
  { has: "số 4*72 chia hết cho 3 nhưng không chia hết cho 9", right: () => range(0, 9).filter((d) => (4072 + 100 * d) % 3 === 0 && (4072 + 100 * d) % 9 !== 0).join("; ") },
  { has: "Cho A = 2 · 3 · 5 · 7 + 35", right: (q) => {
    const A = ev("2 · 3 · 5 · 7 + 35"); assert.equal(A, 245);
    return q.o.map((o) => { const m = /^A chia hết cho (\d+)$/.exec(o); return m ? A % +m[1] === 0 : o === "A là hợp số" ? A > 1 && !isPrime(A) : assert.fail(o); });
  } },
  { has: "42 quả bưởi", right: () => divisors(42).filter((d) => d > 1 && d < 42).length, more: (q) => assert.ok(q.x.includes("Ư(42) = {" + divisors(42).join("; ") + "}")) },
  { has: "tìm ƯCLN(44, 110) bằng cách phân tích", right: (q) => ["44 = ", "Thừa số nguyên tố chung", "ƯCLN("].map((k) => q.o.find((o) => o.startsWith(k))),
    more: (q) => { assert.ok(q.o.includes(`44 = ${factor(44)} và 110 = ${factor(110)}`) && q.o.includes(`ƯCLN(44, 110) = 2 · 11 = ${gcd(44, 110)}`), "chữ các dòng: " + q.o); } },
  { has: "bội chung của 6 và 14", right: (q) => { const m = q.o.filter((o) => val(o) % 6 === 0 && val(o) % 14 === 0); assert.equal(m.length, 1); return m[0]; } },
  { has: "Hai số nguyên tố khác nhau bao giờ cũng có ƯCLN bằng 1", right: () => { const p = range(2, 60).filter(isPrime); return p.every((a) => p.every((b) => a === b || gcd(a, b) === 1)); } },
  { has: "Nối mỗi cặp số ở cột trái với ƯCLN", right: (q) => q.l.map((s) => String(gcd(...s.split(" và ").map(Number)))), more: (q) => { assert.ok(!q.l.some((s) => gcd(...s.split(" và ").map(Number)) === 11)); assert.ok(66 % 11 === 0 && 99 % 11 === 0); } },
  { has: "Cho m = 2² · 3 · 5 và n = 2 · 3² · 7", right: (q) => { const m = ev("2² · 3 · 5"), n = ev("2 · 3² · 7"); return q.o.map((o) => { const [l, r] = o.split(" = "), v = ev(r); return /^ƯCLN/.test(l) ? gcd(m, n) === v : /^BCNN/.test(l) ? lcm(m, n) === v : l === "m" ? m === v : assert.fail(o); }); },
    more: (q) => assert.ok(q.x.includes(fmt(lcm(60, 126)))) },
  { has: "khoảng từ 200 đến 250", right: (q) => { const m = range(200, 250).filter((x) => x % 10 === 0 && x % 12 === 0 && x % 15 === 0); assert.equal(m.length, 1); assert.ok(q.x.includes(`BCNN(10, 12, 15) = ${factor(lcm(10, 12, 15))} = ${lcm(10, 12, 15)}`)); return m[0]; } },
  { has: "dài 60 m, rộng 36 m. Người ta trồng cây", right: () => div((60 + 36) * 2, gcd(60, 36)), more: (q) => assert.ok(q.x.includes("ƯCLN(60, 36) = " + factor(gcd(60, 36)) + " = 12")) },
  { has: "hàng 4, hàng 5 hay hàng 6 đều thừa 1 bạn", essay: (q) => {
    const m = range(101, 149).filter((x) => [4, 5, 6].every((k) => x % k === 1)); assert.deepEqual(m, [121]);
    const rb = q.rubric.map((c) => c.c).join(" | ");
    [`BCNN(4, 5, 6) = ${factor(lcm(4, 5, 6))} = ${lcm(4, 5, 6)}`, "120 + 1 = 121"].forEach((s) => { assert.ok(rb.includes(s), "thang chấm thiếu " + s); assert.ok(q.x.includes(s), "gợi ý thiếu " + s); });
    assert.ok(q.x.includes("99 < x − 1 < 149") && q.x.includes("Đáp số: 121 đội viên"));
  } },
  { has: "90 cây giống cà chua, 75 cây giống ớt và 45 cây giống cải", essay: (q) => {
    const g = gcd(90, 75, 45), rb = q.rubric.map((c) => c.c).join(" | ");
    [`90 = ${factor(90)}; 75 = ${factor(75)}; 45 = ${factor(45)}`, `ƯCLN(90, 75, 45) = ${factor(g)} = ${g}`].forEach((s) => { assert.ok(rb.includes(s), "thang chấm thiếu " + s); assert.ok(q.x.includes(s), "gợi ý thiếu " + s); });
    [`90 : ${g} = ${90 / g}`, `75 : ${g} = ${75 / g}`, `45 : ${g} = ${45 / g}`].forEach((s) => assert.ok(q.x.includes(s), "gợi ý thiếu " + s));
    assert.ok(rb.includes(`${90 / g} cây cà chua, ${75 / g} cây ớt, ${45 / g} cây cải`));
  } },
  { has: "Quan sát trục số. Điểm A", right: (q) => {
    const L = lines(q.svg), ticks = L.filter((l) => l.a[0] === l.b[0]).map((l) => l.a[0]).sort((a, b) => a - b), x0 = nhan(q.svg, "0")[0], u = nhan(q.svg, "1")[0] - x0;
    assert.ok(ticks.includes(x0) && ticks.includes(x0 + u), "nhãn 0 và 1 đặt đúng vạch"); ticks.slice(1).forEach((t, i) => assert.equal(t - ticks[i], u, "các vạch cách đều"));
    const at = (n) => { const p = dinh(dots(q.svg), q.svg, n); assert.ok(ticks.includes(p[0]), "điểm " + n + " nằm trên một vạch"); return (p[0] - x0) / u; };
    assert.equal(at("B"), 2); assert.ok(q.x.includes("biểu diễn số 2"));
    return fmt(at("A"));
  } },
  { has: "Sắp xếp các số nguyên sau theo thứ tự từ bé đến lớn", right: (q) => q.o.slice().sort((a, b) => val(a) - val(b)) },
  { has: "Mỗi phép tính sau đúng hay sai", right: (q) => q.o.map(eq), more: () => { assert.equal(ev("(−9) − 4"), -13); assert.equal(ev("(−6) − (−6)"), 0); } },
  { has: "kho đông lạnh là −18 °C", right: () => -18 + 3 * (12 - 8) },
  { has: "Tháng Một cửa hàng lỗ 150 triệu đồng", right: () => -150 + 60 - 35 },
  { has: "Tính một cách hợp lí: 2 026 − (318 + 2 026) + (318 − 45)", right: () => fmt(ev("2 026 − (318 + 2 026) + (318 − 45)")),
    more: (q) => { q.o.slice(1).forEach((o) => assert.notEqual(val(o), -45)); assert.equal(ev("2 026 − 318 + 2 026 + 318 − 45"), 4007); } },
  { has: "Nối mỗi phép tính ở cột trái với kết quả", right: (q) => q.l.map((e) => fmt(ev(e))), more: (q) => q.r.slice(q.l.length).forEach((x) => assert.ok(!q.l.some((e) => ev(e) === val(x)))) },
  { has: "Tích (−13) · (−6) là một số nguyên âm", right: () => ev("(−13) · (−6)") < 0, more: (q) => assert.ok(q.x.includes("= " + ev("(−13) · (−6)"))) },
  { has: "(−125) · 8 là", right: () => fmt(ev("(−125) · 8")) },
  { has: "Mỗi khẳng định sau về phép nhân, phép chia số nguyên", right: (q) => { const m = /^(−?\d+) là một bội của (\d+)$/.exec(q.o[2]); assert.ok(m && q.o[3] === "Mọi số nguyên khác 0 đều là ước của 0", "chữ các ý: " + q.o);
    return [eq(q.o[0]), eq(q.o[1]), val(m[1]) % +m[2] === 0, range(-20, 20).filter((a) => a).every((a) => 0 % a === 0)]; } },
  { has: "(−5) · x − 8 = 27", right: () => { const m = range(-100, 100).filter((x) => ev("(−5) · x − 8", { x }) === 27); assert.equal(m.length, 1); return m[0]; } },
  { has: "mỗi câu trả lời đúng được cộng 10 điểm", right: () => fmt(12 * 10 + 5 * -4 + 3 * 0) + " điểm", more: (q) => q.o.slice(1).forEach((o) => assert.notEqual(val(o.split(" ")[0]), 100)) },
  { has: "10 chia hết cho x − 2", right: () => range(-100, 100).filter((x) => x - 2 !== 0 && 10 % (x - 2) === 0).length,
    more: (q) => assert.ok(q.x.includes("x ∈ {" + range(-100, 100).filter((x) => x - 2 !== 0 && 10 % (x - 2) === 0).map(fmt).join("; ") + "}")) },
  { has: "máy bay đang bay ở độ cao 5 000 m", right: () => fmt(5000 + 7 * -400) + " m" },
  { has: "Hình nào là hình thang cân", right: (q) => {
    const c = oLuoi(q.svg), ps = polys(q.svg); assert.equal(ps.length, 4); ps.forEach((P) => trenLuoi(P, c));
    const m = ps.filter(thangCan); assert.equal(m.length, 1);
    const [h1, h2, , h4] = ps; // hình 1 thang vuông, hình 2 thang có hai cạnh bên khác nhau, hình 4 không có cạnh song song (lời giải)
    assert.ok(doiCanh(h1) === 1 && goc(h1).some((g) => close(g, 90)) && doiCanh(h2) === 1 && !thangCan(h2) && doiCanh(h4) === 0 && !songSong(sides(h4)[0], sides(h4)[1]) && !songSong(sides(h4)[1], sides(h4)[2]));
    sides(m[0]).filter((v) => v[1] !== 0).forEach((v) => assert.deepEqual(v.map((x) => Math.abs(x) / c), [1, 4])); // cạnh bên đi 1 ô ngang, 4 ô dọc
    return tenHinh(q.svg, m[0]);
  } },
  { has: "Quan sát hình thoi ABCD", right: (q) => {
    const p = tuGiac(q.svg, ["A", "B", "C", "D"]), c = oLuoi(q.svg), s = sides(Object.values(p)), d = lines(q.svg).filter((l) => l.dash);
    trenLuoi(Object.values(p), c); assert.equal(d.length, 2, "hai đường chéo");
    assert.ok(d.some((l) => dist(l.a, p.A) < 1e-9 && dist(l.b, p.C) < 1e-9) && d.some((l) => dist(l.a, p.B) < 1e-9 && dist(l.b, p.D) < 1e-9), "đường chéo AC, BD");
    assert.deepEqual([dist(p.A, p.C), dist(p.B, p.D)].map((x) => x / c), [8, 4]); // lời giải: 8 ô và 4 ô
    assert.ok(dist(nhan(q.svg, "O"), [(p.A[0] + p.C[0]) / 2, (p.A[1] + p.C[1]) / 2]) < 12, "nhãn O ở giao điểm hai đường chéo");
    assert.deepEqual(q.o, ["Bốn cạnh AB, BC, CD, DA bằng nhau.", "Hai đường chéo AC và BD vuông góc với nhau.", "Hai đường chéo AC và BD bằng nhau.", "Cạnh AB song song với cạnh CD."]);
    return [s.every((v) => close(Math.hypot(...v), Math.hypot(...s[0]))), vuongGoc(sub(p.C, p.A), sub(p.D, p.B)), close(dist(p.A, p.C), dist(p.B, p.D)), songSong(sub(p.B, p.A), sub(p.D, p.C))];
  } },
  { has: "Nối mỗi hình ở cột trái với một tính chất", right: (q) => {
    const P = { "Hình chữ nhật": RECT, "Hình thoi": [[0, 2], [3, 0], [6, 2], [3, 4]], "Hình thang cân": [[1, 0], [4, 0], [5, 3], [0, 3]], "Hình lục giác đều": range(0, 5).map((k) => [Math.cos(k * Math.PI / 3), Math.sin(k * Math.PI / 3)]) };
    const bang = (X) => sides(X).every((v) => close(Math.hypot(...v), Math.hypot(...sides(X)[0])));
    const T = { "Có bốn góc vuông": (X) => X.length === 4 && goc(X).every((g) => close(g, 90)), "Có bốn cạnh bằng nhau": (X) => X.length === 4 && bang(X),
      "Có hai cạnh bên bằng nhau và hai đường chéo bằng nhau": (X) => thangCan(X) && close(dist(X[0], X[2]), dist(X[1], X[3])), "Có sáu cạnh bằng nhau": (X) => X.length === 6 && bang(X),
      "Có ba góc bằng nhau, mỗi góc bằng 60°": (X) => X.length === 3 && goc(X).every((g) => close(g, 60)) };
    q.r.forEach((r) => assert.ok(T[r], "chưa có cách kiểm tra tính chất: " + r));
    return q.l.map((l) => { const m = q.r.filter((r) => T[r](P[l])); assert.equal(m.length, 1, l + ": " + m); return m[0]; });
  } },
  { has: "Quan sát hình lục giác đều ABCDEF", right: (q) => {
    const p = tuGiac(q.svg, ["A", "B", "C", "D", "E", "F"]), H = Object.values(p), s = sides(H);
    s.forEach((v) => assert.ok(close(Math.hypot(...v), Math.hypot(...s[0]), 2e-3), "sáu cạnh bằng nhau")); goc(H).forEach((g) => assert.ok(Math.abs(g - 120) < 0.2, "sáu góc 120°"));
    const D = ["AD", "BE", "CF"].map((k) => [p[k[0]], p[k[1]]]);
    D.forEach(([a, b]) => assert.ok(lines(q.svg).some((l) => (dist(l.a, a) < 1e-9 && dist(l.b, b) < 1e-9) || (dist(l.a, b) < 1e-9 && dist(l.b, a) < 1e-9)), "có đường chéo chính"));
    assert.ok(close(dist(p.A, p.D), 2 * dist(p.A, p.B), 2e-3) && songSong(sub(p.B, p.A), sub(p.D, p.E)), "AD = 2 · AB, AB song song với ED (lời giải)");
    assert.deepEqual(q.o, ["Ba đường chéo chính AD, BE, CF bằng nhau", "Đường chéo chính AD bằng cạnh AB", "Đường chéo chính AD vuông góc với đường chéo chính BE", "Cạnh AB song song với cạnh CD"]);
    const truth = [D.every(([a, b]) => close(dist(a, b), dist(...D[0]), 2e-3)), close(dist(p.A, p.D), dist(p.A, p.B), 2e-3), vuongGoc(sub(p.D, p.A), sub(p.E, p.B)), songSong(sub(p.B, p.A), sub(p.D, p.C))];
    assert.equal(truth.filter(Boolean).length, 1); return q.o[truth.indexOf(true)];
  } },
  { has: "Nối mỗi hình ở cột trái với chu vi", right: (q) => q.l.map((l) => {
    const n = [...l.matchAll(/(\d+) cm/g)].map((m) => +m[1]);
    const cv = /^Hình vuông|^Hình thoi/.test(l) ? 4 * n[0] : /^Hình chữ nhật|^Hình bình hành/.test(l) ? 2 * (n[0] + n[1]) : assert.fail(l);
    return cv + " cm";
  }), more: (q) => q.r.slice(q.l.length).forEach((x) => assert.ok(![20, 18, 16, 22].includes(val(x.split(" ")[0])))) },
  { has: "Diện tích hình được tô màu là", right: (q) => {
    const c = oLuoi(q.svg), ps = polys(q.svg); assert.equal(ps.length, 1); trenLuoi(ps[0], c); goc(ps[0]).forEach((g) => assert.ok(close(g, 90), "các cạnh theo đường kẻ của lưới"));
    assert.equal(chuVi(ps[0]) / c, 18); // lời giải: chu vi 18 cm, cũng là lựa chọn nhiễu
    return div(dienTich(ps[0]), c * c) + " cm²";
  } },
  { has: "chiều dài 9 cm, chiều rộng 4 cm thì có diện tích là 26 cm²", right: () => 9 * 4 === 26, more: () => assert.equal((9 + 4) * 2, 26) },
  { has: "Tính diện tích hình bình hành ABCD (DH là đường cao)", right: (q) => {
    const p = tuGiac(q.svg, ["A", "B", "C", "D"]), c = oLuoi(q.svg), H = dinh(lines(q.svg).filter((l) => l.dash).flatMap((l) => [l.a, l.b]), q.svg, "H");
    trenLuoi(Object.values(p), c); assert.ok(songSong(sub(p.B, p.A), sub(p.C, p.D)) && songSong(sub(p.D, p.A), sub(p.C, p.B)), "ABCD là hình bình hành");
    assert.ok(vuongGoc(sub(H, p.D), sub(p.B, p.A)) && Math.abs(cross(sub(p.B, p.A), sub(H, p.A))) < 1e-9, "DH vuông góc với AB, H nằm trên AB");
    assert.deepEqual([dist(p.A, p.B), dist(p.D, H)].map((x) => x / c), [7, 3]); // lời giải: đáy 7 ô, cao 3 ô
    return div(dienTich(Object.values(p)), c * c);
  } },
  { has: "Quan sát hình thang cân ABCD (đáy AB và đáy CD)", right: (q) => {
    const p = tuGiac(q.svg, ["A", "B", "C", "D"]), c = oLuoi(q.svg), X = Object.values(p); trenLuoi(X, c); assert.ok(thangCan(X) && songSong(sub(p.B, p.A), sub(p.C, p.D)), "ABCD là hình thang cân, đáy AB, CD");
    const AB = dist(p.A, p.B) / c, CD = dist(p.C, p.D) / c, h = Math.abs(p.C[1] - p.A[1]) / c, S = dienTich(X) / c / c;
    assert.equal(S, (AB + CD) * h / 2);
    const m = [/^Đáy AB dài (\d+) cm, đáy CD dài (\d+) cm\.$/, /^Chiều cao của hình thang là (\d+) cm\.$/, /^Diện tích hình thang ABCD là (\d+) cm²\.$/].map((re, i) => re.exec(q.o[i]));
    assert.ok(m.every(Boolean) && q.o[3] === "Cạnh bên AD bằng cạnh bên BC.", "chữ các ý: " + q.o);
    return [AB === +m[0][1] && CD === +m[0][2], h === +m[1][1], S === +m[2][1], close(dist(p.A, p.D), dist(p.B, p.C))];
  } },
  { has: "ốp kín bằng các viên gạch men hình vuông cạnh 20 cm", right: () => div(600, 20) * div(300, 20), more: () => assert.equal(600 * 300 / (20 * 20), 450) },
  { has: "chiều dài 34 m, chiều rộng ngắn hơn chiều dài 12 m", right: () => fmt(((34 + (34 - 12)) * 2 - 2) * 15000) + " đồng",
    more: (q) => assert.deepEqual(q.o.slice(1).map((o) => val(o.replace(" đồng", "")) / 15000), [112, 56, 108]) }, // nhiễu: quên trừ cửa, quên nhân 2, trừ cửa hai lần
  { has: "Một mảnh đất có hình dạng và kích thước như hình vẽ", right: (q) => {
    const ps = polys(q.svg); assert.equal(ps.length, 1); const P = ps[0], E = P.map((p, i) => [p, P[(i + 1) % P.length]]);
    goc(P).forEach((g) => assert.ok(close(g, 90), "các góc đều vuông"));
    const nhanM = texts(q.svg).filter((t) => / m$/.test(t.t)), k = new Set();
    nhanM.forEach((t) => { const e = E.slice().sort((x, y) => dist(t.at, [(x[0][0] + x[1][0]) / 2, (x[0][1] + x[1][1]) / 2]) - dist(t.at, [(y[0][0] + y[1][0]) / 2, (y[0][1] + y[1][1]) / 2]))[0]; k.add(dist(...e) / val(t.t.replace(" m", ""))); });
    assert.equal(k.size, 1, "mọi kích thước cùng một tỉ lệ"); const s = [...k][0];
    assert.equal(chuVi(P) / s, 36); // nhiễu "36 m²" là chu vi (m)
    return div(dienTich(P), s * s) + " m²";
  } },
  { has: "chiều dài 26 m, chiều rộng 18 m. Người ta làm một lối đi", essay: (q) => {
    const S = 26 * 18, l = 26 * 3, rau = S - l, kg = rau * 3, rb = q.rubric.map((c) => c.c).join(" | ");
    [`26 · 18 = ${S}`, `26 · 3 = ${l}`, `${S} − ${l} = ${rau}`, `${rau} · 3 = ${fmt(kg)}`].forEach((s) => { assert.ok(rb.includes(s), "thang chấm thiếu " + s); assert.ok(q.x.includes(s), "gợi ý thiếu " + s); });
  } },
  { has: "hình thang cân có đáy nhỏ 12 m, đáy lớn 20 m và chiều cao 10 m", essay: (q) => {
    const S = (12 + 20) * 10 / 2, V = 12 * 10, co = S - V, tien = co * 25000, rb = q.rubric.map((c) => c.c).join(" | ");
    assert.ok(20 > 12); // đáy nhỏ nằm giữa, hình chữ nhật trên đáy nhỏ cao bằng chiều cao nằm trọn trong hình thang cân
    [`(12 + 20) · 10 : 2 = ${S}`, `12 · 10 = ${V}`, `${S} − ${V} = ${co}`, `${co} · 25 000 = ${fmt(tien)}`].forEach((s) => { assert.ok(rb.includes(s), "thang chấm thiếu " + s); assert.ok(q.x.includes(s), "gợi ý thiếu " + s); });
  } },
  { has: "Hình nào có trục đối xứng?", right: (q) => {
    const c = oLuoi(q.svg), ps = polys(q.svg); assert.equal(ps.length, 4); ps.forEach((P) => trenLuoi(P, c));
    const m = ps.filter((P) => truc(P).length); assert.equal(m.length, 1); assert.deepEqual(truc(m[0]), [90], "trục thẳng đứng (lời giải)");
    const tg = ps.find((P) => P.length === 3), cv = sides(tg).map((v) => Math.hypot(...v)).sort((a, b) => a - b); assert.ok(goc(tg).some((g) => close(g, 90)) && cv[0] !== cv[1], "tam giác vuông, hai cạnh góc vuông khác nhau");
    return tenHinh(q.svg, m[0]);
  } },
  { has: "Hình chữ thập dưới đây được ghép từ năm ô vuông", right: (q) => {
    const ps = polys(q.svg); assert.equal(ps.length, 1); const P = ps[0], o = [...new Set(P.map((p) => p[0]))].sort((a, b) => a - b), u = o[1] - o[0];
    assert.equal(div(dienTich(P), u * u), 5, "năm ô vuông"); assert.deepEqual(truc(P), [0, 45, 90, 135]);
    return truc(P).length;
  } },
  { has: "O là giao điểm của hai đường chéo AC và BD. Mỗi ý", right: (q) => {
    const p = tuGiac(q.svg, ["A", "B", "C", "D"]), X = Object.values(p), O = dinh(dots(q.svg), q.svg, "O"), c = oLuoi(q.svg); trenLuoi(X, c);
    assert.ok(dist(O, [(p.A[0] + p.C[0]) / 2, (p.A[1] + p.C[1]) / 2]) < 1e-9 && dist(O, [(p.B[0] + p.D[0]) / 2, (p.B[1] + p.D[1]) / 2]) < 1e-9, "O là giao điểm hai đường chéo");
    assert.deepEqual(sub(O, p.A).map((x) => Math.abs(x) / c), [5, 2]); // lời giải: 5 ô ngang, 2 ô dọc
    assert.ok(!close(dist(p.A, p.B), dist(p.A, p.D)) && !goc(X).some((g) => close(g, 90)), "hai cạnh kề khác nhau, không có góc vuông");
    assert.deepEqual(q.o, ["O là tâm đối xứng của hình bình hành ABCD.", "OA = OC.", "Đường thẳng AC là trục đối xứng của hình bình hành ABCD.", "Hình bình hành ABCD có ít nhất một trục đối xứng."]);
    return [coTam(X, O), close(dist(O, p.A), dist(O, p.C)), trungDinh(X, doiXung(X, p.A, sub(p.C, p.A))), truc(X).length > 0];
  } },
  { has: "Hình nào có cả trục đối xứng và tâm đối xứng", right: (q) => {
    const c = oLuoi(q.svg), ps = polys(q.svg); assert.equal(ps.length, 4); ps.forEach((P) => trenLuoi(P, c));
    const m = ps.filter((P) => truc(P).length && coTam(P)); assert.equal(m.length, 1);
    const [, tg, bh, tc] = ps; // lời giải: tam giác cân, hình thang cân một trục thẳng đứng; hình bình hành chỉ có tâm
    assert.ok(JSON.stringify(truc(tg)) === "[90]" && !coTam(tg) && JSON.stringify(truc(tc)) === "[90]" && !coTam(tc) && thangCan(tc) && coTam(bh) && !truc(bh).length);
    assert.equal(truc(m[0]).length, 2, "hình thoi có hai trục (hai đường chéo)");
    return tenHinh(q.svg, m[0]);
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
for (const [id, checks] of [["toan6-ck1-de1", de1], ["toan6-ck1-de2", de2]]) {
  const b = bank(id); assert.ok(b, "thiếu " + id); assert.equal(b.questions.length, 25);
  run(id, b.questions, checks);
}
const pool = bank(POOL), mine = pool.questions.filter((q) => q.src === POOL);
run(POOL, mine, own);

/* ---------- mức độ và ma trận ---------- */
assert.ok(pool.questions.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
// mỗi ô có ít nhất gấp đôi số câu ô đó rút; câu riêng nào cũng nằm trong một ô có số câu của ma trận
Object.entries(M).forEach(([t, v]) => v.forEach((k, i) => { const have = pool.questions.filter((q) => q.topic === t && q.lv === i + 1).length; assert.ok(have >= 2 * k, `ô (${t}, mức ${i + 1}) rút ${k} câu mà kho chỉ có ${have}`); }));
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
  assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.lv === l).length), [10, 8, 7]);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.topic === t && q.lv === l).length), v, "rút đúng ma trận ở chủ đề " + t));
  const e = d.questions.filter((q) => q.type === "essay").length; assert.ok(e <= 2, "một lần rút có " + e + " câu tự luận"); essays += e;
  d.questions.forEach((q) => seen.add(Quiz.key(q)));
}
assert.ok(mine.every((q) => seen.has(Quiz.key(q))), "400 lần rút thử phải gặp đủ các câu riêng");
console.log(n, "câu đã tính lại (50 câu của 2 đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + pool.questions.length + " câu; trung bình " + (essays / 400).toFixed(2) + " câu tự luận mỗi lần rút.");
console.log("MATH OK");
