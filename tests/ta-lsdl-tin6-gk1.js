// Tính lại đáp án và kiểm tra ma trận ba ngân hàng lớp 6 giữa kì I của Phiên N25b: Tiếng Anh (data/banks/6-ta.js), Lịch sử và
// Địa lí (6-lsdl.js), Tin học (6-tin.js). Mỗi ngân hàng = đề 1 có sẵn (Tiếng Anh có lv từ Phiên TA1; hai môn kia chỉ thêm lv ở
// N25b) + Đề 2 + đề ngẫu nhiên; chỉ đề ngẫu nhiên Tiếng Anh có câu riêng (28 câu, hai đoạn đọc), theo mẫu tests/lsdl-tin6-ck1.js.
// Câu có phép tính được nhận ra bằng một đoạn chữ của đề (has, đúng một câu trong ba kho, đúng đề ghi ở id); kiểm tra đề có đúng
// số liệu rồi so đáp án với kết quả tính bằng code: điền khuyết ans[0], trả lời bằng số ans, trắc nghiệm o[0], đúng/sai a. Lịch sử
// và Địa lí: thế kỉ, số thập kỉ trong một thế kỉ (Phiên DS2), khoảng cách thời gian (cả từ năm TCN đến năm CN), tỉ lệ bản đồ (từ
// bản đồ ra thực tế và ngược lại), giờ khu vực (cả khi sang ngày hôm sau), số khu vực giờ. Tin học: số bit của một dãy, đổi đơn vị
// dung lượng (1 KB = 1 024 byte…), so sánh đơn vị,
// chỗ trống trên điện thoại. Câu trả lời bằng số và câu điền có đáp án là số nào trong ba kho cũng phải có kiểm tra ở đây.
// Cuối cùng kiểm tra mức độ và ma trận: mọi câu có lv; đề 1 có mức độ như đã ghi (Tiếng Anh 12 – 10 – 3, Lịch sử và Địa lí
// 14 – 8 – 3, Tin học 14 – 10 – 1); ma trận 10 Biết, 8 Hiểu, 7 Vận dụng, đúng chữ và thứ tự chủ đề của đề 1, số câu từng chủ đề
// như đề 1; Đề 2 chia đúng theo ma trận; ô nào cũng đủ câu (Tiếng Anh: gấp đôi, vì có câu riêng); câu riêng của Tiếng Anh ở ô có
// rút câu; mỗi đoạn đọc của kho Tiếng Anh có 4 câu Reading mức 1-2-2-3 (đúng ô [1, 2, 1]); mỗi kho có ít nhất 3 câu đúng/sai 4 ý,
// không có câu tự luận; rút thử nhiều lần ra đúng ma trận, Reading lấy trọn một đoạn, gặp đủ các câu riêng và đủ bốn đoạn đọc;
// học sinh đã làm hết đề 1 vẫn rút được 25 câu chưa làm.
// Chạy: node tests/ta-lsdl-tin6-gk1.js → in MATH OK.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz;
const ma = (m, lv1) => ({ de1: m + "6-gk1-de1", de2: m + "6-gk1-de2", pool: m + "6-gk1-ngau-nhien", lv1 });
const A = ma("ta", [12, 10, 3]), L = ma("lsdl", [14, 8, 3]), T = ma("tin", [14, 10, 1]);

/* ---------- số ---------- */
const close = (x, y) => Math.abs(x - y) < 1e-9;
const laMa = (n) => [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]].reduce((s, [v, c]) => { while (n >= v) { s += c; n -= v; } return s; }, "");
const theKi = (nam) => Math.ceil(nam / 100); // năm Công nguyên → thế kỉ (thế kỉ XIII: năm 1201 đến năm 1300)
const DON_VI = { bit: 1 / 8, byte: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3, TB: 1024 ** 4 }; // theo byte
const num = (s) => +String(s).replace(/\s/g, "").replace(",", "."); // "1 024" → 1024, "1,5" → 1.5
const lonNhat = (arr, f) => arr.reduce((a, b) => (f(b) > f(a) ? b : a));

/* ---------- các câu cần tính ----------
   id: đề chứa câu; has: đoạn chữ của đề; right(q): đáp án tính bằng code (so với ans[0], ans hoặc o[0]); more(q): kiểm tra thêm. */
const CHECKS = [
  // Lịch sử và Địa lí: đề 1 (N25b chỉ thêm lv; Phiên DS2 dò với sách in năm 2026, thay câu đúng/sai về Công lịch)
  { id: L.de1, has: "Năm 938 thuộc thế kỉ nào", right: () => "Thế kỉ " + laMa(theKi(938)) },
  { id: L.de1, has: "Khởi nghĩa Hai Bà Trưng nổ ra năm 40. Tính đến năm 2026", right: () => String(2026 - 40) },
  { id: L.de1, has: "Một thế kỉ gồm", right: (q) => { const [, n] = /^Một thế kỉ gồm (\d+) thập kỉ\.$/.exec(q.q); return 100 / 10 === +n; } }, // thế kỉ 100 năm, thập kỉ 10 năm
  { id: L.de1, has: "tỉ lệ 1 : 200 000, khoảng cách giữa hai điểm đo được 3 cm", right: () => String((3 * 200000) / 100000) }, // cm → km: chia 100 000
  { id: L.de1, has: "Khi ở khu vực giờ số 0 là 8 giờ sáng thì ở Việt Nam", right: (q) => { assert.ok(q.q.includes("khu vực giờ số 7")); return String(8 + 7); } },
  // Lịch sử và Địa lí: Đề 2
  { id: L.de2, has: "Năm 1288 thuộc thế kỉ nào", right: () => "Thế kỉ " + laMa(theKi(1288)), more: (q) => assert.ok(q.x.includes("từ năm 1201 đến năm 1300")) },
  { id: L.de2, has: "chế tạo vào khoảng năm 500 TCN. Tính đến năm 2026", right: (q) => { assert.equal(q.unit, "năm"); return 500 + 2026; } }, // từ năm TCN đến năm CN: cộng hai số năm
  { id: L.de2, has: "Hai thành phố cách nhau 120 km. Trên bản đồ tỉ lệ 1 : 2 000 000", right: (q) => { assert.equal(q.unit, "cm"); return (120 * 100000) / 2000000; } },
  { id: L.de2, has: "được chia thành bao nhiêu khu vực giờ", right: () => "24 khu vực" },
  { id: L.de2, has: "bắt đầu lúc 20 giờ (giờ Luân Đôn)", right: (q) => { assert.ok(q.q.includes("khu vực giờ số 7") && q.q.includes("khu vực giờ số 0") && q.unit === "giờ" && q.x.includes("sáng hôm sau")); return (20 + 7) % 24; } },
  // Tin học: đề 1 (giữ nguyên, chỉ thêm lv)
  { id: T.de1, has: "Mỗi bit chỉ nhận một trong hai giá trị: 0 hoặc", right: () => "1" },
  { id: T.de1, has: "1 GB = ___ MB", right: () => String(DON_VI.GB / DON_VI.MB) },
  { id: T.de1, has: "USB của Hà còn trống 2 GB", right: (q) => { const n = (2 * DON_VI.GB) / (4 * DON_VI.MB); assert.equal(n, 512); return lonNhat(q.o, (o) => -Math.abs(num(o.replace(/[^\d ]/g, "")) - n)); } },
  // Tin học: Đề 2
  { id: T.de2, has: "Dãy bit 11001010 gồm bao nhiêu bit", right: (q) => { assert.equal(q.unit, "bit"); return /Dãy bit ([01]+) /.exec(q.q)[1].length; } },
  { id: T.de2, has: "Phát biểu nào sau đây đúng?", right: (q) => { const ok = q.o.filter((o) => { const m = /^1 (\w+) lớn hơn 1 (\w+)$/.exec(o); return m && DON_VI[m[1]] > DON_VI[m[2]]; }); assert.equal(ok.length, 1, "đúng một phát biểu đúng"); return ok[0]; } },
  { id: T.de2, has: "dung lượng 4 096 byte", right: (q) => { assert.equal(q.unit, "KB"); return 4096 / DON_VI.KB; } },
  { id: T.de2, has: "còn trống 1 GB. Mai muốn chép 6 đoạn phim, mỗi đoạn 200 MB", right: (q) => { const need = 6 * 200, free = DON_VI.GB / DON_VI.MB; assert.ok(need > free && q.o[0].includes("1 200 MB") && q.o[0].includes("1 024 MB") && q.x.includes("6 × 200 = 1 200")); return q.o[0]; } }
];

const KHO = {}; // mã pool → câu trong kho (câu riêng + hai đề, mỗi câu ghi src)
[A, L, T].forEach((s) => {
  const p = bank(s.pool), d1 = bank(s.de1), d2 = bank(s.de2);
  assert.ok(p && d1 && d2, "thiếu đề của " + s.pool);
  assert.deepEqual(p.pool.from, [s.de1, s.de2], s.pool + ": from là đề 1 và Đề 2");
  assert.ok(d1.minutes === d2.minutes && d2.minutes === p.minutes, s.pool + ": cùng số phút với đề 1");
  assert.equal(d1.questions.length, 25); assert.equal(d2.questions.length, 25);
  KHO[s.pool] = p.questions;
});
const kho = Object.values(KHO).flat();
assert.equal(KHO[A.pool].length, 78, "kho Tiếng Anh 78 câu (28 câu riêng)");
[L, T].forEach((s) => assert.equal(KHO[s.pool].length, 50, s.pool + ": 50 câu, không có câu riêng"));
let n = 0;
const checked = new Set();
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.q.includes(c.has));
  assert.equal(m.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${m.length}`);
  const q = m[0], at = c.id + ": " + c.has;
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  const want = c.right(q), got = q.type === "fill" ? q.ans[0] : q.type === "num" ? q.ans : q.type === "tf" ? q.a : q.o[0];
  assert.ok(typeof want === "number" ? typeof got === "number" && close(got, want) : got === want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), at + ": nhiễu trùng đáp án đúng");
  if (c.more) c.more(q);
  checked.add(q); n++;
});
// câu trả lời bằng số và câu điền có đáp án là số nào cũng phải được tính lại ở trên
kho.filter((q) => q.type === "num" || (q.type === "fill" && /^[\d\s,.−-]+$/.test(q.ans[0]))).forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));

/* ---------- mức độ và ma trận ---------- */
const sum = (a) => a.reduce((s, v) => s + v, 0), dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
[A, L, T].forEach((s) => {
  const p = bank(s.pool), M = p.pool.matrix, cells = Object.values(M), K = KHO[s.pool], d1 = bank(s.de1).questions, d2 = bank(s.de2).questions, mine = K.filter((q) => q.src === s.pool);
  assert.ok(K.every((q) => [1, 2, 3].includes(q.lv)), s.pool + ": câu nào trong kho cũng cần lv");
  assert.deepEqual([1, 2, 3].map((l) => d1.filter((q) => q.lv === l).length), s.lv1, s.de1 + ": mức độ của đề 1 như đã ghi ở data/banks/index.js");
  assert.ok(cells.every(Array.isArray), s.pool + ": ma trận ghi theo [Biết, Hiểu, Vận dụng]");
  assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], s.pool + ": ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
  assert.deepEqual(Object.keys(M), [...new Set(d1.map((q) => q.topic))], s.pool + ": ma trận đủ các chủ đề của đề 1, đúng chữ và thứ tự");
  assert.deepEqual(Object.keys(M), [...new Set(d2.map((q) => q.topic))], s.de2 + ": đủ chủ đề của đề 1, đúng thứ tự");
  Object.entries(M).forEach(([t, v]) => {
    assert.equal(d1.filter((q) => q.topic === t).length, sum(v), `${s.pool}: số câu của chủ đề ${t} như đề 1`);
    assert.deepEqual([1, 2, 3].map((l) => dem(d2, t, l)), v, `${s.de2} đúng ma trận ở chủ đề ${t}`);
    v.forEach((k, i) => assert.ok(dem(K, t, i + 1) >= (mine.length ? 2 : 1) * k, `${s.pool}: ô (${t}, mức ${i + 1}) rút ${k} câu mà kho có ${dem(K, t, i + 1)}`));
  });
  mine.forEach((q) => assert.ok(M[q.topic] && M[q.topic][q.lv - 1] > 0, `${s.pool}: câu riêng ở ô (${q.topic}, mức ${q.lv}) không rút câu: ${q.q.slice(0, 50)}`));
  assert.ok(K.filter((q) => q.type === "tf4").length >= 3 && !K.some((q) => q.type === "essay"), s.pool + ": ít nhất 3 câu đúng/sai 4 ý, không có câu tự luận");
  // đoạn đọc (chỉ Tiếng Anh): mỗi đoạn 4 câu Reading mức 1-2-2-3, câu Reading nào cũng thuộc một đoạn của kho
  const P = p.passages || {}, byP = {};
  K.filter((q) => q.p).forEach((q) => { assert.ok(P[q.p], `${s.pool}: đoạn ${q.p} không có trong kho`); assert.equal(q.topic, "Reading"); (byP[q.p] = byP[q.p] || []).push(q); });
  if (s === A) {
    assert.deepEqual(Object.keys(byP).sort(), ["duc", "hoa", "linh", "quang"], "kho Tiếng Anh có bốn đoạn đọc");
    Object.entries(byP).forEach(([k, qs]) => assert.deepEqual(qs.map((q) => q.lv).sort(), [1, 2, 2, 3], "đoạn " + k + " 4 câu mức 1-2-2-3"));
    assert.ok(K.filter((q) => q.topic === "Reading").every((q) => q.p), "câu Reading nào cũng có đoạn đọc");
  }
  const seen = new Set(), seenP = new Set();
  for (let k = 0; k < 300; k++) {
    const d = Quiz.draw(p);
    assert.equal(d.notes.length, 0, s.pool + ": rút thử có ghi chú: " + d.notes.join("; "));
    assert.equal(d.questions.length, 25);
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d.questions, t, l)), v, `${s.pool}: rút đúng ma trận ở chủ đề ${t}`));
    if (s === A) { const ps = new Set(d.questions.filter((q) => q.topic === "Reading").map((q) => q.p)); assert.equal(ps.size, 1, "Reading lấy trọn một đoạn"); ps.forEach((x) => seenP.add(x)); }
    d.questions.forEach((q) => seen.add(Quiz.key(q)));
  }
  assert.ok(mine.every((q) => seen.has(Quiz.key(q))), s.pool + ": 300 lần rút thử phải gặp đủ các câu riêng");
  if (s === A) assert.equal(seenP.size, 4, "300 lần rút thử phải gặp đủ bốn đoạn đọc");
  // học sinh đã làm hết đề 1 (đúng cả) vẫn rút được 25 câu chưa làm
  const hist = (q) => (q.src === s.de1 ? { done: 1, wrong: 0 } : null); // lịch sử câu như PoolHist
  for (let k = 0; k < 50; k++) {
    const d = Quiz.draw(p, hist);
    assert.equal(d.notes.length, 0); assert.equal(d.questions.length, 25);
    assert.ok(d.questions.every((q) => q.src !== s.de1), s.pool + ": đã làm hết đề 1 thì không rút lại câu của đề 1");
  }
});
console.log(n, "câu đã tính lại (câu có phép tính của ba ngân hàng); kho " + kho.length + " câu, 3 ma trận 10 – 8 – 7.");
console.log("MATH OK");
