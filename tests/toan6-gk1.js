// Tính lại đáp án ngân hàng Toán 6 giữa kì I (data/banks/6-toan.js): hai đề cố định toan6-gk1-de1 (chỉ Chương I–II),
// toan6-gk1-de2 và các câu riêng của đề ngẫu nhiên toan6-gk1-ngau-nhien (Phiên N24). Mỗi câu: kiểm tra đề có đúng số liệu (has)
// rồi so đáp án với kết quả tính bằng code: trắc nghiệm o[0], điền khuyết ans[0], đúng/sai a, đúng/sai 4 ý a (4 ý), trả lời bằng
// số ans, nối cột r[i] của từng ô l[i], sắp xếp thứ tự o; tự luận: các số trong thang chấm và đáp án gợi ý. Câu có hình: đọc toạ
// độ, chữ trong hình (tia số, trục số, nhiệt kế, bảng, phân tích ra thừa số nguyên tố theo cột dọc) rồi mới tính.
// Cuối cùng kiểm tra mức độ và ma trận: mọi câu có lv; Đề 1 chỉ có bốn chủ đề của Chương I–II, không có số âm; Đề 2 chia đúng
// theo ma trận; mỗi ô (chủ đề, mức) có ít nhất gấp đôi số câu ô đó rút; rút thử nhiều lần ra đúng 10 Biết, 8 Hiểu, 7 Vận dụng,
// nhiều nhất 2 câu tự luận.
// Chạy: node tests/toan6-gk1.js → in MATH OK.
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan6-gk1-ngau-nhien", DE1 = "toan6-gk1-de1", DE2 = "toan6-gk1-de2";

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
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { at: [+a.x, +a.y], t: m[2], bold: a["font-weight"] === "700" }; });
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
// phân tích ra thừa số nguyên tố theo cột dọc: cột trái (số bị chia) và cột phải (thừa số nguyên tố) hai bên một đường dọc
const cotDoc = (svg) => {
  const v = lines(svg).filter((l) => l.a[0] === l.b[0]); assert.equal(v.length, 1, "một đường kẻ dọc"); const xm = v[0].a[0], T = texts(svg);
  const col = (f) => T.filter((t) => f(t.at[0])).sort((a, b) => a.at[1] - b.at[1]), L = col((x) => x < xm), R = col((x) => x > xm);
  assert.equal(L.length, R.length + 1); R.forEach((t, i) => assert.equal(t.at[1], L[i].at[1], "thừa số đứng cùng hàng với số bị chia"));
  const l = L.map((t) => +t.t), r = R.map((t) => +t.t);
  r.forEach((p, i) => { assert.ok(isPrime(p), p + " phải là số nguyên tố"); assert.equal(l[i + 1], div(l[i], p)); });
  assert.equal(l[l.length - 1], 1, "cột trái kết thúc bằng 1"); assert.deepEqual(r, r.slice().sort((a, b) => a - b), "thừa số xếp từ bé đến lớn");
  return { n: l[0], primes: r };
};

/* ---------- kiểm tra từng câu ----------
   right(q): đáp án tính bằng code (so với o[0], ans[0], a, ans, r của từng ô trái, o); more(q): kiểm tra thêm (nhiễu, bước giải, hình). */
const has = (q, list) => list.forEach((s) => assert.ok(q.x.includes(s), "lời giải thiếu " + s));
const de1 = [
  { has: "Tập hợp các chữ số của số 2 026", right: () => "{" + [...new Set("2026".split(""))].sort().join("; ") + "}" },
  { has: "Số 0 thuộc tập hợp ℕ*", right: () => range(1, 100).includes(0) },
  { has: "Số 27 được viết bằng số La Mã", right: () => toRoman(27), more: (q) => { assert.deepEqual(q.o.slice(2), [toRoman(17), toRoman(28)]); assert.ok(!range(1, 30).some((k) => toRoman(k) === q.o[1]), q.o[1] + " không phải số La Mã đúng"); } },
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
  { has: "BCNN(9, 36) = 36", right: () => lcm(9, 36) === 36 },
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
  { has: "phân tích số 126 ra thừa số nguyên tố theo cột dọc", right: (q) => { const c = cotDoc(q.svg); assert.equal(c.n, 126); assert.equal(c.primes.reduce((a, p) => a * p, 1), 126); return "126 = " + factor(126); },
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
  { has: "các bội nhỏ hơn 40 của 6 và của 9", right: (q) => {
    const rows = bang(q.svg).map((r) => [r[0], r.slice(1).map(Number)]); assert.deepEqual(rows.map((r) => r[0]), ["B(6)", "B(9)"]);
    rows.forEach(([lab, v]) => { const k = +/\d+/.exec(lab)[0]; assert.deepEqual(v, range(0, 39).filter((n) => n % k === 0), lab + " ghi đủ các bội nhỏ hơn 40"); });
    const chung = rows[0][1].filter((n) => rows[1][1].includes(n) && n > 0); assert.equal(Math.min(...chung), lcm(6, 9)); return String(Math.min(...chung));
  }, more: (q) => has(q, ["0; 18; 36", "ƯCLN(6, 9)"]) },
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
for (const [id, checks] of [[DE1, de1], [DE2, de2]]) {
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
console.log(n, "câu đã tính lại (50 câu của 2 đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + pool.questions.length + " câu; trung bình " + (essays / 400).toFixed(2) + " câu tự luận mỗi lần rút.");
console.log("MATH OK");
