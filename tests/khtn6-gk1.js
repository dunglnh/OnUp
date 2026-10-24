// Tính lại đáp án ngân hàng KHTN 6 giữa kì I (data/banks/6-khtn.js): hai đề cố định khtn6-gk1-de1, khtn6-gk1-de2 và các câu
// riêng của đề ngẫu nhiên khtn6-gk1-ngau-nhien (Phiên N25), theo mẫu tests/khtn6-ck1.js. Câu có phép tính hoặc có hình được nhận ra
// bằng một đoạn chữ của đề (has, đúng một câu trong kho, đúng đề ghi ở src); kiểm tra đề có đúng số liệu rồi so đáp án với kết quả
// tính bằng code: trả lời bằng số ans, trắc nghiệm o[0]. Câu có hình đọc toạ độ trong hình: thước (hai đầu vật so với các vạch có
// số, số khoảng chia trong 1 cm; vật không cần đặt ở vạch 0), nhiệt kế (đầu cột chất lỏng so với các vạch có số, số khoảng chia giữa
// hai số), kính lúp (đường kẻ từ mỗi số dừng ở mặt kính, vành kính hay tay cầm), sơ đồ chuyển thể (mũi tên đánh số đi từ ô thể nào
// sang ô thể nào), biểu đồ cột (chiều cao cột tỉ lệ với phần trăm ghi trên cột, cột nào ghi số mấy). Câu trả lời bằng số và câu điền
// có đáp án là số nào trong kho cũng phải có kiểm tra ở đây.
// Cuối cùng kiểm tra mức độ và ma trận: mọi câu có lv, mỗi ô (chủ đề, mức) có ít nhất gấp đôi số câu ô đó rút, câu riêng nằm ở ô
// có rút câu, cả hai đề cố định chia đúng ma trận, rút thử nhiều lần ra đúng 10 Biết, 8 Hiểu, 7 Vận dụng, đúng ma trận từng chủ đề
// và gặp đủ các câu riêng; học sinh đã làm hết Đề 1 vẫn rút được 25 câu toàn câu chưa làm.
// Chạy: node tests/khtn6-gk1.js → in MATH OK.
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "khtn6-gk1-ngau-nhien", DE1 = "khtn6-gk1-de1", DE2 = "khtn6-gk1-de2";

/* ---------- số ---------- */
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

/* Thước: vật là hình chữ nhật nằm trên thước (y nhỏ hơn mép trên của thước); hai đầu đều ngang một vạch chia, độ dài = hiệu hai
   số đọc trên thang (vật không cần đặt ở vạch 0). */
const docThuoc = (svg) => {
  const rects = tags(svg, "rect"), thuoc = rects.reduce((a, r) => (num(r, "width") > num(a, "width") ? r : a)), top = num(thuoc, "y");
  const { x0, k, lb } = thang(svg), ticks = vach(svg, top);
  const vat = rects.filter((r) => r !== thuoc);
  assert.equal(vat.length, 1, "cần đúng một vật đặt trên thước");
  assert.ok(num(vat[0], "y") + num(vat[0], "height") <= top, "vật phải nằm trên thước");
  const a = num(vat[0], "x"), b = a + num(vat[0], "width");
  [a, b].forEach((x) => assert.ok(ticks.some((t) => close(t, x)), "hai đầu vật phải ngang một vạch chia"));
  const perCm = ticks.filter((t) => t > lb[0].x && t <= lb[1].x).length; // số khoảng chia trong 1 cm
  return { from: (a - x0) / k, to: (b - x0) / k, len: (b - a) / k, perCm };
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
/* Kính lúp: mặt kính là hình tròn lớn có vành (nét dày), tay cầm là hình chữ nhật; mỗi số trong một vòng tròn nhỏ, đường kẻ từ
   vòng tròn đó dừng ở bộ phận được đánh số: trong lòng hình tròn là mặt kính, trên vành là khung kính, trong hình chữ nhật là
   tay cầm. */
const docKinhLup = (svg) => {
  const tron = tags(svg, "circle"), [mat] = tron.filter((c) => num(c, "r") > 15), so = tron.filter((c) => num(c, "r") <= 15), tay = tags(svg, "rect");
  assert.ok(mat && tay.length === 1, "cần một mặt kính và một tay cầm");
  const vanh = num(mat, "stroke-width") / 2, lines = tags(svg, "line");
  const loai = (p) => {
    const d = Math.hypot(p[0] - num(mat, "cx"), p[1] - num(mat, "cy"));
    if (d < num(mat, "r") - vanh) return "Mặt kính";
    if (Math.abs(d - num(mat, "r")) <= vanh) return "Khung kính";
    const r = tay[0];
    if (p[0] >= num(r, "x") && p[0] <= num(r, "x") + num(r, "width") && p[1] >= num(r, "y") && p[1] <= num(r, "y") + num(r, "height")) return "Tay cầm";
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
/* Sơ đồ chuyển thể: ba ô chữ nhật ghi "Thể rắn", "Thể lỏng", "Thể khí"; mỗi mũi tên là một đường kẻ (đầu mũi tên là tam giác) đi
   từ cạnh ô này sang cạnh ô kia, số của mũi tên ghi ở giữa đường kẻ. Trả về {số: "rắn→lỏng"…}. */
const docSoDo = (svg) => {
  const rects = tags(svg, "rect"), tx = texts(svg);
  const boxes = rects.map((r) => { const t = tx.find((x) => +x.x > num(r, "x") && +x.x < num(r, "x") + num(r, "width") && +x.y > num(r, "y") && +x.y < num(r, "y") + num(r, "height")); assert.ok(t && /^Thể /.test(t.t), "mỗi ô cần ghi thể"); return { r, the: t.t.replace("Thể ", "") }; });
  assert.deepEqual(boxes.map((b) => b.the).sort(), ["khí", "lỏng", "rắn"], "ba ô rắn, lỏng, khí");
  const at = (p) => { const b = boxes.find(({ r }) => p[0] >= num(r, "x") - 8 && p[0] <= num(r, "x") + num(r, "width") + 8 && p[1] >= num(r, "y") && p[1] <= num(r, "y") + num(r, "height")); assert.ok(b, "đầu mũi tên phải chạm một ô"); return b.the; };
  const lines = tags(svg, "line").filter((l) => l.stroke === "ink"), out = {};
  tx.filter((t) => /^\d$/.test(t.t)).forEach((t) => {
    const near = lines.filter((x) => Math.abs((num(x, "x1") + num(x, "x2")) / 2 - +t.x) < 6).sort((a, b) => Math.abs(num(a, "y1") - +t.y) - Math.abs(num(b, "y1") - +t.y));
    const l = near[0];
    assert.ok(l && Math.abs(num(l, "y1") - +t.y) < 30, "số " + t.t + " cần đứng ngay cạnh giữa một mũi tên");
    const head = tags(svg, "polygon").find((p) => p.points.split(" ").some((pt) => { const [x, y] = pt.split(",").map(Number); return close(x, num(l, "x2")) && Math.abs(y - num(l, "y2")) <= 4; }));
    assert.ok(head, "mũi tên " + t.t + " cần có đầu mũi tên ở cuối đường kẻ");
    const tip = head.points.split(" ").map((pt) => pt.split(",").map(Number)).reduce((a, p) => (Math.abs(p[0] - num(l, "x1")) > Math.abs(a[0] - num(l, "x1")) ? p : a));
    out[t.t] = at([num(l, "x1"), num(l, "y1")]) + "→" + at(tip);
  });
  return out;
};
/* Biểu đồ cột: mỗi cột là hình chữ nhật, trên cột ghi "N%", dưới cột ghi "Cột k"; chiều cao tỉ lệ với phần trăm. */
const docBieuDo = (svg) => {
  const tx = texts(svg), cols = tags(svg, "rect").map((r) => {
    const in_ = (t) => +t.x > num(r, "x") && +t.x < num(r, "x") + num(r, "width");
    const p = tx.find((t) => in_(t) && /^\d+%$/.test(t.t)), n = tx.find((t) => in_(t) && /^Cột \d$/.test(t.t));
    assert.ok(p && n, "mỗi cột cần ghi phần trăm và số cột");
    return { pct: parseInt(p.t), n: +n.t.slice(4), h: num(r, "height") };
  });
  assert.equal(cols.reduce((s, c) => s + c.pct, 0), 100, "ba phần trăm cộng lại bằng 100");
  const k = cols[0].h / cols[0].pct;
  cols.forEach((c) => assert.ok(close(c.h, k * c.pct), "cột " + c.n + " không tỉ lệ với phần trăm"));
  return cols;
};

/* ---------- các câu cần tính ----------
   id: đề chứa câu; has: đoạn chữ của đề; right(q): đáp án tính bằng code (so với ans hoặc o[0]); more(q): kiểm tra thêm. */
const THE = { "rắn→lỏng": "Sự nóng chảy", "lỏng→rắn": "Sự đông đặc", "lỏng→khí": "Sự hoá hơi", "khí→lỏng": "Sự ngưng tụ" };
const KHI = { 78: "Nitrogen", 21: "Oxygen", 1: "Carbon dioxide" };
const CHECKS = [
  { id: DE1, has: "Bộ phận số 2 là", right: (q) => { const t = docKinhLup(q.svg); assert.deepEqual(Object.keys(t).sort(), ["1", "2", "3"]); assert.deepEqual(Object.values(t).sort(), ["Khung kính", "Mặt kính", "Tay cầm"]);
    Object.entries(t).forEach(([k, v]) => assert.ok(q.x.includes(`Số ${k} là ${v.toLowerCase()}`) || q.x.includes(`số ${k} là ${v.toLowerCase()}`), "lời giải số " + k)); return t["2"]; } },
  { id: DE1, has: "một đầu ngang vạch 0 như hình. Chiếc que", right: (q) => { const r = docThuoc(q.svg); assert.equal(r.from, 0); assert.equal(r.perCm, 5, "mỗi xentimét chia làm 5 khoảng"); assert.ok(q.x.includes("5 khoảng") && q.x.includes("0,2 cm")); return r.len; } },
  { id: DE1, has: "mỗi lượt hết 15 phút. Trong 5 ngày", right: () => (15 * 2 * 5) / 60 },
  { id: DE1, has: "nhiệt kế treo trong phòng học", right: (q) => { const r = docNhietKe(q.svg); assert.equal(r.buoc, 2, "mỗi khoảng chia 2 °C"); assert.ok(q.x.includes(r.khoang + " khoảng chia") && q.x.includes("2 °C")); return r.t; } },
  { id: DE1, has: "Mũi tên số 3 ứng với", right: (q) => { const d = docSoDo(q.svg); assert.deepEqual(Object.keys(d).sort(), ["1", "2", "3", "4"]); assert.deepEqual(Object.values(d).sort(), Object.keys(THE).sort(), "bốn mũi tên là bốn quá trình khác nhau");
    Object.entries(d).forEach(([k, v]) => { const [a, b] = v.split("→"); assert.ok(q.x.includes(`mũi tên ${k} từ thể ${a} sang thể ${b} là ${THE[v].toLowerCase()}`) || q.x.includes(`Mũi tên ${k} từ thể ${a} sang thể ${b} là ${THE[v].toLowerCase()}`), "lời giải mũi tên " + k); }); return THE[d["3"]]; } },
  { id: DE1, has: "Cột số 2 ứng với khí nào", right: (q) => { const cols = docBieuDo(q.svg); assert.deepEqual(cols.map((c) => c.pct).sort((a, b) => b - a), [78, 21, 1]);
    cols.forEach((c) => assert.ok(q.x.includes(`${c.pct}% ${KHI[c.pct].toLowerCase()} (cột ${c.n})`) || q.x.includes(`${c.pct}% là ${KHI[c.pct].toLowerCase()}, hơi nước và các khí khác (cột ${c.n})`), "lời giải cột " + c.n)); return KHI[cols.find((c) => c.n === 2).pct]; } },
  { id: DE2, has: "kính lúp phóng to 5 lần để quan sát một con kiến dài 4 mm", right: () => 4 * 5 },
  { id: DE2, has: "Một chiếc bút sáp đặt dọc theo thước", right: (q) => { const r = docThuoc(q.svg); assert.equal(r.perCm, 2, "mỗi xentimét chia làm 2 khoảng"); assert.ok(r.from > 0, "một đầu không ở vạch 0"); assert.ok(q.x.includes("2 khoảng") && q.x.includes(`${String(r.to).replace(".", ",")} − ${r.from} = `)); return r.len; } },
  { id: POOL, has: "tế bào lá cây dài 0,03 mm. Quan sát tế bào bằng kính hiển vi quang học phóng to 400 lần", right: () => Math.round(0.03 * 400 * 1000) / 1000 },
  { id: POOL, has: "Mỗi bước chân của Nam dài khoảng 50 cm, Nam đi hết 12 bước", right: (q) => { const m = q.q.match(/dài khoảng (\d+) cm, Nam đi hết (\d+) bước/); assert.ok(q.x.includes(`${m[2]} × 0,5 = `)); return (+m[1] * +m[2]) / 100; } },
  { id: POOL, has: "pha sữa cho em bé", right: (q) => { const r = docNhietKe(q.svg); assert.equal(r.buoc, 1, "mỗi khoảng chia 1 °C"); assert.ok(q.x.includes(r.khoang + " khoảng chia") && q.x.includes("1 °C")); return r.t; } },
  { id: POOL, has: "Nhiệt độ sôi của nước là 100 °C, của cồn (ethanol) là 78 °C", right: (q) => { const m = q.q.match(/nước là (\d+) °C, của cồn \(ethanol\) là (\d+) °C/); return +m[1] > +m[2] ? "Cồn, vì cồn có nhiệt độ sôi thấp hơn" : "Nước, vì nước có nhiệt độ sôi thấp hơn"; } },
  { id: POOL, has: "thang đo từ −10 °C đến 110 °C", right: (q) => { const ghd = +q.q.match(/đến (\d+) °C/)[1], hot = q.o.find((o) => { const m = o.match(/khoảng (\d+) °C/); return m && +m[1] > ghd; }); assert.ok(hot && q.x.includes(`Giới hạn đo của nhiệt kế là ${ghd} °C`)); return hot; } }
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
// câu trả lời bằng số và câu điền có đáp án là số nào cũng phải được tính lại ở trên; câu có hình nào cũng phải được đọc lại
kho.filter((q) => q.svg || q.type === "num" || (q.type === "fill" && /^[\d\s,.−-]+$/.test(q.ans[0]))).forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
assert.equal(kho.filter((q) => q.svg).length, 7, "7 câu có hình");

/* ---------- mức độ và ma trận ---------- */
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M), sum = (a) => a.reduce((s, v) => s + v, 0);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
const CK1 = Object.keys(bank("khtn6-ck1-ngau-nhien").pool.matrix);
assert.deepEqual(Object.keys(M), CK1.filter((t) => !/tế bào/i.test(t)), "9 chủ đề đúng chữ và thứ tự của khtn6-ck1, bỏ hai chủ đề về tế bào");
[DE1, DE2].forEach((id) => assert.deepEqual([...new Set(bank(id).questions.map((q) => q.topic))], Object.keys(M), id + ": đủ 9 chủ đề, đúng thứ tự"));
// mỗi ô có ít nhất gấp đôi số câu ô đó rút; câu nào trong kho cũng nằm ở một ô có số câu của ma trận
Object.entries(M).forEach(([t, v]) => v.forEach((k, i) => { const have = kho.filter((q) => q.topic === t && q.lv === i + 1).length; assert.ok(have >= 2 * k, `ô (${t}, mức ${i + 1}) rút ${k} câu mà kho chỉ có ${have}`); }));
kho.forEach((q) => assert.ok(M[q.topic] && M[q.topic][q.lv - 1] > 0, `${q.src}: ô (${q.topic}, mức ${q.lv}) không có trong ma trận: ${q.q.slice(0, 50)}`));
// cả hai đề cố định chia đúng theo ma trận
[DE1, DE2].forEach((id) => Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => bank(id).questions.filter((q) => q.topic === t && q.lv === l).length), v, id + " đúng ma trận ở chủ đề " + t)));
// ít nhất 2 câu đúng/sai 4 ý mỗi đề, không có câu tự luận
[DE1, DE2].forEach((id) => { assert.ok(bank(id).questions.filter((q) => q.type === "tf4").length >= 2, id + ": cần câu đúng/sai 4 ý"); assert.ok(!bank(id).questions.some((q) => q.type === "essay"), id + ": không có tự luận"); });
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
// học sinh đã làm hết Đề 1 (đúng cả) vẫn rút được 25 câu chưa làm
const hist = (q) => (q.src === DE1 ? { done: 1, wrong: 0 } : null); // lịch sử câu như PoolHist
for (let k = 0; k < 50; k++) {
  const d = Quiz.draw(pool, hist);
  assert.equal(d.notes.length, 0); assert.equal(d.questions.length, 25);
  assert.ok(d.questions.every((q) => q.src !== DE1), "đã làm hết Đề 1 thì không rút lại câu của Đề 1");
}
console.log(n, "câu đã tính lại (câu có phép tính, có hình của 2 đề cố định và " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + kho.length + " câu.");
console.log("MATH OK");
