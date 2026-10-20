// Tính lại đáp án ngân hàng KHTN 6 cuối kì I (data/banks/6-khtn.js): hai đề cố định khtn6-ck1-de1, khtn6-ck1-de2 và các câu
// riêng của đề ngẫu nhiên khtn6-ck1-ngau-nhien (Phiên N5). Câu có phép tính hoặc có hình được nhận ra bằng một đoạn chữ của đề
// (has, đúng một câu trong kho, đúng đề ghi ở src); kiểm tra đề có đúng số liệu rồi so đáp án với kết quả tính bằng code: điền
// khuyết ans[0], trả lời bằng số ans, trắc nghiệm o[0]. Câu có hình đọc toạ độ trong hình: thước (đầu bút chì so với các vạch có
// số, số khoảng chia trong 1 cm), nhiệt kế (đầu cột chất lỏng so với các vạch có số, số khoảng chia giữa hai số), tế bào (đường kẻ
// từ mỗi số dừng ở bộ phận nào). Câu trả lời bằng số và câu điền có đáp án là số nào trong kho cũng phải có kiểm tra ở đây.
// Cuối cùng kiểm tra mức độ và ma trận: mọi câu có lv, mỗi ô (chủ đề, mức) có ít nhất gấp đôi số câu ô đó rút, câu riêng nằm ở ô
// có rút câu, rút thử nhiều lần ra đúng 10 Biết, 8 Hiểu, 7 Vận dụng, đúng ma trận từng chủ đề và gặp đủ các câu riêng.
// Chạy: node tests/khtn6-ck1.js → in MATH OK.
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "khtn6-ck1-ngau-nhien", DE1 = "khtn6-ck1-de1", DE2 = "khtn6-ck1-de2";

/* ---------- số ---------- */
const val = (s) => +String(s).replace(/\s/g, "").replace(/−/g, "-").replace(",", "."); // "1 465" → 1465, "−39" → -39, "1,5" → 1.5
const close = (x, y) => Math.abs(x - y) < 1e-9;

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
// các số ghi dưới vạch: {giá trị, x}; kiểm tra cách đều và trả về [x của số 0, số px cho 1 đơn vị]
const thang = (svg) => {
  const lb = texts(svg).filter((t) => /^\d+$/.test(t.t)).map((t) => ({ v: +t.t, x: +t.x })).sort((a, b) => a.v - b.v);
  assert.ok(lb.length >= 3 && lb[0].v === 0, "thang chia cần các số từ 0");
  const k = (lb[1].x - lb[0].x) / (lb[1].v - lb[0].v);
  lb.forEach((l) => assert.ok(close(l.x, lb[0].x + k * l.v), `số ${l.v} không đặt đúng vạch`));
  return { x0: lb[0].x, k, lb };
};
// các vạch chia: đường kẻ dọc mọc từ cạnh y; trả về các toạ độ x đã sắp xếp
const vach = (svg, y) => tags(svg, "line").filter((l) => num(l, "x1") === num(l, "x2") && num(l, "y1") === y).map((l) => +l.x1).sort((a, b) => a - b);

/* Thước: bút chì là các hình nằm trên thước (y nhỏ hơn mép trên của thước); một đầu ngang vạch 0, độ dài = đầu kia đọc trên thang. */
const docThuoc = (svg) => {
  const rects = tags(svg, "rect"), thuoc = rects.reduce((a, r) => (num(r, "width") > num(a, "width") ? r : a)), top = num(thuoc, "y");
  const { x0, k, lb } = thang(svg), ticks = vach(svg, top);
  const xs = [];
  rects.filter((r) => r !== thuoc && num(r, "y") + num(r, "height") <= top).forEach((r) => xs.push(num(r, "x"), num(r, "x") + num(r, "width")));
  tags(svg, "polygon").forEach((p) => p.points.trim().split(/\s+/).forEach((pt) => { const [x, yy] = pt.split(",").map(Number); assert.ok(yy < top, "bút chì phải nằm trên thước"); xs.push(x); }));
  const a = Math.min(...xs), b = Math.max(...xs);
  assert.ok(close(a, x0), "một đầu bút chì phải ngang vạch 0");
  assert.ok(ticks.some((t) => close(t, b)), "đầu kia của bút chì phải ngang một vạch chia");
  const perCm = ticks.filter((t) => t > lb[0].x && t <= lb[1].x).length; // số khoảng chia trong 1 cm
  return { len: (b - x0) / k, perCm };
};
/* Nhiệt kế: cột chất lỏng là hình chữ nhật mảnh màu bad; nhiệt độ = đầu cột đọc trên thang. */
const docNhietKe = (svg) => {
  const cot = tags(svg, "rect").filter((r) => r.fill === "bad");
  assert.equal(cot.length, 1, "nhiệt kế cần đúng một cột chất lỏng");
  const { x0, k, lb } = thang(svg), ticks = vach(svg, Math.max(...tags(svg, "line").map((l) => num(l, "y1")).filter((y) => y)));
  const end = num(cot[0], "x") + num(cot[0], "width");
  assert.ok(ticks.some((t) => close(t, end)), "đầu cột chất lỏng phải ngang một vạch chia");
  const khoang = ticks.filter((t) => t > lb[0].x && t <= lb[1].x).length; // số khoảng chia giữa hai số liền nhau
  return { t: (end - x0) / k, khoang, buoc: (lb[1].v - lb[0].v) / khoang };
};
/* Tế bào: khung ngoài là thành tế bào, khung trong là màng; nhân là hình tròn lớn, lục lạp là các hình bầu dục; mỗi số trong
   một vòng tròn nhỏ, đường kẻ từ vòng tròn đó dừng ở bộ phận được đánh số. */
const docTeBao = (svg) => {
  const [ngoai, trong] = tags(svg, "rect").sort((a, b) => num(b, "width") - num(a, "width"));
  const tron = tags(svg, "circle"), nhan = tron.filter((c) => num(c, "r") > 15), so = tron.filter((c) => num(c, "r") <= 15);
  assert.equal(nhan.length, 1, "cần đúng một nhân");
  const N = nhan[0], la = tags(svg, "ellipse"), lines = tags(svg, "line");
  const inRect = (p, r) => p[0] >= num(r, "x") && p[0] <= num(r, "x") + num(r, "width") && p[1] >= num(r, "y") && p[1] <= num(r, "y") + num(r, "height");
  const onEdge = (p, r) => inRect(p, r) && [num(r, "x"), num(r, "x") + num(r, "width")].some((x) => close(p[0], x)) || inRect(p, r) && [num(r, "y"), num(r, "y") + num(r, "height")].some((y) => close(p[1], y));
  const loai = (p) => {
    if (Math.hypot(p[0] - num(N, "cx"), p[1] - num(N, "cy")) < num(N, "r")) return "Nhân tế bào";
    if (la.some((e) => ((p[0] - num(e, "cx")) / num(e, "rx")) ** 2 + ((p[1] - num(e, "cy")) / num(e, "ry")) ** 2 < 1)) return "Lục lạp";
    if (onEdge(p, trong)) return "Màng tế bào";
    if (inRect(p, ngoai) && !inRect(p, trong)) return "Thành tế bào";
    return "?";
  };
  const out = {};
  texts(svg).filter((t) => /^\d$/.test(t.t)).forEach((t) => {
    const c = so.find((s) => Math.hypot(num(s, "cx") - +t.x, num(s, "cy") - (+t.y - 5)) < 1);
    assert.ok(c, "số " + t.t + " cần nằm trong một vòng tròn nhỏ");
    const l = lines.filter((x) => Math.abs(Math.hypot(num(x, "x1") - num(c, "cx"), num(x, "y1") - num(c, "cy")) - num(c, "r")) < 0.5);
    assert.equal(l.length, 1, "số " + t.t + " cần đúng một đường kẻ");
    out[t.t] = loai([num(l[0], "x2"), num(l[0], "y2")]);
  });
  return out;
};

/* ---------- các câu cần tính ----------
   id: đề chứa câu; has: đoạn chữ của đề; right(q): đáp án tính bằng code (so với ans[0], ans hoặc o[0]); more(q): kiểm tra thêm. */
const CHECKS = [
  { id: DE1, has: "vật kính 40x và thị kính 10x", right: () => String(40 * 10) },
  { id: DE1, has: "1,5 m = ___ cm", right: () => String(Math.round(1.5 * 100)) },
  { id: DE1, has: "nặng 2,5 kg", right: () => String(Math.round(2.5 * 1000)), more: (q) => assert.ok(q.ans.includes("2 500")) },
  { id: DE1, has: "25 °C = ___ °F", right: () => String(25 * 1.8 + 32) },
  { id: DE1, has: "sau 3 lần phân chia liên tiếp", right: () => String(2 ** 3) },
  { id: DE2, has: "Đặt chiếc bút chì dọc theo thước", right: (q) => { const r = docThuoc(q.svg); assert.equal(r.perCm, 2, "mỗi xentimét chia làm 2 khoảng"); assert.ok(q.x.includes("2 khoảng") && q.x.includes("0,5 cm")); return r.len; } },
  { id: DE2, has: "1 quả cân 500 g, 2 quả cân 200 g và 1 quả cân 50 g", right: (q) => [...q.q.matchAll(/(\d+) quả cân (\d+) g/g)].reduce((s, m) => s + m[1] * m[2], 0) },
  { id: DE2, has: "Có 4 tế bào, mỗi tế bào phân chia liên tiếp 3 lần", right: () => 4 * 2 ** 3 },
  { id: POOL, has: "vật kính 10x và thị kính 15x", right: () => 10 * 15 },
  { id: POOL, has: "xếp chồng 100 tờ giấy", right: (q) => { assert.ok(q.q.includes("bề dày 1 cm") && q.unit === "mm"); return (1 * 10) / 100; } },
  { id: POOL, has: "là 95 °F", right: () => (95 - 32) / 1.8 },
  { id: POOL, has: "nhiệt kế đang đo nhiệt độ của một cốc nước", right: (q) => { const r = docNhietKe(q.svg); assert.equal(r.buoc, 2, "mỗi khoảng chia 2 °C"); assert.ok(q.x.includes(r.khoang + " khoảng chia") && q.x.includes("2 °C")); return r.t; } },
  { id: POOL, has: "tạo ra 32 tế bào con", right: () => { let n = 0; while (2 ** n < 32) n++; assert.equal(2 ** n, 32); return n; } },
  { id: POOL, has: "Ở nhiệt độ phòng (25 °C), chất nào ở thể khí?", right: (q) => { // thể của mỗi chất ở 25 °C từ nhiệt độ nóng chảy, nhiệt độ sôi
    const the = {};
    [...q.q.matchAll(/chất (\w): ([−\d ]+) °C và ([−\d ]+) °C/g)].forEach((m) => { const [nc, s] = [val(m[2]), val(m[3])]; assert.ok(nc < s); the[m[1]] = 25 < nc ? "rắn" : 25 < s ? "lỏng" : "khí"; });
    assert.deepEqual(the, { X: "lỏng", Y: "khí", Z: "rắn" }); // lời giải ghi X lỏng, Z rắn
    assert.ok(q.x.includes("Chất X ở thể lỏng") && q.x.includes("chất Z ở thể rắn"));
    const khi = Object.keys(the).filter((k) => the[k] === "khí"); assert.equal(khi.length, 1); return "Chất " + khi[0];
  } },
  { id: POOL, has: "Bộ phận số 3 là", right: (q) => { // mọi số trong hình đều là một lựa chọn; lời giải ghi đúng từng số
    const t = docTeBao(q.svg);
    assert.deepEqual(Object.values(t).slice().sort(), q.o.slice().sort(), "các lựa chọn là các bộ phận được đánh số");
    Object.entries(t).forEach(([k, v]) => assert.ok(q.x.includes(`Số ${k} là ${v.toLowerCase()}`) || q.x.includes(`số ${k} là ${v.toLowerCase()}`), "lời giải số " + k));
    return t["3"];
  } }
];

const pool = bank(POOL);
assert.ok(pool && bank(DE1) && bank(DE2), "thiếu đề");
assert.equal(bank(DE1).questions.length, 25); assert.equal(bank(DE2).questions.length, 25);
const kho = pool.questions, mine = kho.filter((q) => q.src === POOL);
let n = 0;
const checked = new Set();
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.q.includes(c.has));
  assert.equal(m.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${m.length}`);
  const q = m[0], at = c.id + ": " + c.has;
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  const want = c.right(q), got = q.type === "fill" ? q.ans[0] : q.type === "num" ? q.ans : q.o[0];
  assert.strictEqual(JSON.stringify(got), JSON.stringify(want), at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), at + ": nhiễu trùng đáp án đúng");
  if (c.more) c.more(q);
  checked.add(q); n++;
});
// câu trả lời bằng số và câu điền có đáp án là số nào cũng phải được tính lại ở trên
kho.filter((q) => q.type === "num" || (q.type === "fill" && /^[\d\s,.−-]+$/.test(q.ans[0]))).forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));

/* ---------- mức độ và ma trận ---------- */
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M), sum = (a) => a.reduce((s, v) => s + v, 0);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.deepEqual(Object.keys(M).sort(), [...new Set(bank(DE1).questions.map((q) => q.topic))].sort(), "ma trận đủ các chủ đề của đề 1, đúng chữ");
// mỗi ô có ít nhất gấp đôi số câu ô đó rút; câu nào trong kho cũng nằm ở một ô có số câu của ma trận
Object.entries(M).forEach(([t, v]) => v.forEach((k, i) => { const have = kho.filter((q) => q.topic === t && q.lv === i + 1).length; assert.ok(have >= 2 * k, `ô (${t}, mức ${i + 1}) rút ${k} câu mà kho chỉ có ${have}`); }));
kho.forEach((q) => assert.ok(M[q.topic] && M[q.topic][q.lv - 1] > 0, `${q.src}: ô (${q.topic}, mức ${q.lv}) không có trong ma trận: ${q.q.slice(0, 50)}`));
// Đề 2 chia đúng theo ma trận
Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => bank(DE2).questions.filter((q) => q.topic === t && q.lv === l).length), v, "Đề 2 đúng ma trận ở chủ đề " + t));
const seen = new Set();
for (let k = 0; k < 400; k++) {
  const d = Quiz.draw(pool);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, 25);
  assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.lv === l).length), [10, 8, 7]);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.topic === t && q.lv === l).length), v, "rút đúng ma trận ở chủ đề " + t));
  d.questions.forEach((q) => seen.add(Quiz.key(q)));
}
assert.ok(mine.every((q) => seen.has(Quiz.key(q))), "400 lần rút thử phải gặp đủ các câu riêng");
console.log(n, "câu đã tính lại (câu có phép tính, có hình của 2 đề cố định và " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + kho.length + " câu.");
console.log("MATH OK");
