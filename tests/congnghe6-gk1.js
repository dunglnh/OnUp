// Tính lại đáp án và kiểm tra ma trận ngân hàng Công nghệ 6 giữa kì I (data/banks/6-congnghe.js, Phiên N25): đề 1 có sẵn (chỉ thêm
// lv), Đề 2 và đề ngẫu nhiên congnghe6-gk1-ngau-nhien (không có câu riêng), theo mẫu tests/lsdl-tin6-ck1.js. Câu có phép tính (tiền
// gas tiết kiệm) nhận ra bằng một đoạn chữ của đề, tính lại bằng code; câu trả lời bằng số và câu điền có đáp án là số nào trong kho
// cũng phải có kiểm tra ở đây. Rồi kiểm tra: mọi câu có lv; ma trận 10 Biết, 8 Hiểu, 7 Vận dụng, đúng ba chủ đề của đề 1; Đề 2 chia
// đúng theo ma trận; ô nào cũng đủ câu; Đề 2 có ít nhất 3 câu đúng/sai 4 ý, không có câu tự luận; rút thử nhiều lần ra đúng ma trận;
// học sinh đã làm hết đề 1 vẫn rút được 25 câu chưa làm (Đề 2 đúng ma trận).
// Chạy: node tests/congnghe6-gk1.js → in MATH OK.
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
const DE1 = "congnghe6-gk1-de1", DE2 = "congnghe6-gk1-de2", POOL = "congnghe6-gk1-ngau-nhien";
const val = (s) => +String(s).replace(/\s/g, "").replace(",", ".");

const CHECKS = [
  { id: DE2, has: "2 bình gas, giá 400 000 đồng một bình", right: (q) => { const m = q.q.match(/hết (\d+) bình gas, giá ([\d ]+) đồng một bình.*còn dùng ([\d,]+) bình/); return (val(m[1]) - val(m[3])) * val(m[2]); } }
];

const pool = bank(POOL);
assert.ok(pool && bank(DE1) && bank(DE2), "thiếu đề");
assert.equal(bank(DE1).questions.length, 25); assert.equal(bank(DE2).questions.length, 25);
const kho = pool.questions;
assert.equal(kho.length, 50, "kho = hai đề cố định, không có câu riêng");
let n = 0;
const checked = new Set();
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.q.includes(c.has));
  assert.equal(m.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${m.length}`);
  const q = m[0], at = c.id + ": " + c.has;
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  const want = c.right(q), got = q.type === "fill" ? q.ans[0] : q.type === "num" ? q.ans : q.o[0];
  assert.strictEqual(JSON.stringify(got), JSON.stringify(want), at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  checked.add(q); n++;
});
kho.filter((q) => q.type === "num" || (q.type === "fill" && /^[\d\s,.−-]+$/.test(q.ans[0]))).forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));

/* ---------- mức độ và ma trận ---------- */
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const M = pool.pool.matrix, cells = Object.values(M), sum = (a) => a.reduce((s, v) => s + v, 0);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.deepEqual(Object.keys(M), [...new Set(bank(DE1).questions.map((q) => q.topic))], "ma trận đủ 3 chủ đề của đề 1, đúng chữ và thứ tự");
assert.deepEqual(Object.keys(M), [...new Set(bank(DE2).questions.map((q) => q.topic))], "Đề 2 đủ 3 chủ đề, đúng thứ tự");
// số câu từng chủ đề như đề 1; Đề 2 chia đúng theo ma trận; ô nào cũng đủ câu
Object.entries(M).forEach(([t, v]) => {
  assert.equal(bank(DE1).questions.filter((q) => q.topic === t).length, sum(v), "số câu của chủ đề " + t + " như đề 1");
  assert.deepEqual([1, 2, 3].map((l) => bank(DE2).questions.filter((q) => q.topic === t && q.lv === l).length), v, "Đề 2 đúng ma trận ở chủ đề " + t);
  v.forEach((k, i) => { const have = kho.filter((q) => q.topic === t && q.lv === i + 1).length; assert.ok(have >= k, `ô (${t}, mức ${i + 1}) rút ${k} câu mà kho chỉ có ${have}`); });
});
assert.deepEqual([1, 2, 3].map((l) => bank(DE1).questions.filter((q) => q.lv === l).length), [11, 11, 3], "đề 1: 11 Biết, 11 Hiểu, 3 Vận dụng (ghi ở data/banks/index.js)");
assert.ok(bank(DE2).questions.filter((q) => q.type === "tf4").length >= 3, "Đề 2 cần ít nhất 3 câu đúng/sai 4 ý");
assert.ok(!kho.some((q) => q.type === "essay"), "không có câu tự luận");
for (let k = 0; k < 200; k++) {
  const d = Quiz.draw(pool);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, 25);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.topic === t && q.lv === l).length), v, "rút đúng ma trận ở chủ đề " + t));
}
// học sinh đã làm hết đề 1 (đúng cả): lần rút sau toàn câu của Đề 2
const hist = (q) => (q.src === DE1 ? { done: 1, wrong: 0 } : null);
for (let k = 0; k < 50; k++) assert.ok(Quiz.draw(pool, hist).questions.every((q) => q.src === DE2), "đã làm đề 1 thì bộ rút toàn câu của Đề 2");
console.log(n, "câu đã tính lại; kho " + kho.length + " câu, ma trận 10 – 8 – 7.");
console.log("MATH OK");
