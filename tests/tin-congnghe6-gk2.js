// Tính lại đáp án và kiểm tra ma trận hai ngân hàng lớp 6 giữa kì II của Phiên N12b: Tin học (data/banks/6-tin.js) và Công nghệ
// (6-congnghe.js). Mỗi ngân hàng = Đề 1 + Đề 2 (25 câu mỗi đề, cùng chia theo ma trận) + đề ngẫu nhiên không có câu riêng.
// Câu có phép tính hoặc có hình được nhận ra bằng một đoạn chữ của đề (has, đúng một câu trong hai kho, đúng đề ghi ở id); so đáp
// án với kết quả tính bằng code: trả lời bằng số ans, trắc nghiệm o[0]. Tin học: số hàng của thời khóa biểu (số tiết + hàng tiêu
// đề); câu có hình đọc lại hình: sơ đồ tư duy (chủ đề chính là hình bầu dục tô sun-soft ở giữa, chữ ở trong; chủ đề nhánh là hình
// chữ nhật tô acc-soft, mỗi nhánh nối với tâm chủ đề chính bằng một đường kẻ, chữ nằm trong hình chữ nhật; chi tiết là chữ màu
// muted đặt ngay dưới nhánh) và bảng (đường kẻ ngang, dọc cách đều nhau; số hàng = số đường ngang − 1, số cột = số đường dọc − 1;
// chữ của mỗi ô nằm đúng giữa ô). Công nghệ: điện áp định mức đọc từ nhãn ghi trong đề (số đứng trước “V”). Câu trả lời bằng số
// và câu có hình nào trong hai kho cũng phải có kiểm tra ở đây; câu có hình nào cũng phải được đọc lại hình (docSoDo, docBang).
// Cuối cùng kiểm tra mức độ và ma trận: mọi câu có lv; ma trận 10 Biết, 8 Hiểu, 7 Vận dụng, chủ đề theo thứ tự bài như hai đề; cả
// hai đề chia đúng theo ma trận (nên ô nào cũng có gấp đôi số câu ô đó rút); mỗi kho có ít nhất 3 câu đúng/sai 4 ý, không có câu
// tự luận; rút thử nhiều lần ra đúng ma trận, không ghi chú; học sinh đã làm hết một đề cố định thì đề ngẫu nhiên rút đúng 25 câu
// của đề kia. Ngoài ra: câu Bài 9 (An toàn thông tin trên Internet) của kho giữa kì II không trùng chữ câu hỏi với câu cùng chủ
// đề ở kho cuối kì I (tests/kiem-tra-de.js đã so trùng mọi đề; ở đây so thêm theo bộ từ của câu hỏi).
// Chạy: node tests/tin-congnghe6-gk2.js → in MATH OK.
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
const ma = (m) => ({ de1: m + "6-gk2-de1", de2: m + "6-gk2-de2", pool: m + "6-gk2-ngau-nhien" });
const T = ma("tin"), C = ma("congnghe");

const close = (x, y) => Math.abs(x - y) < 1e-9;
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const daDoc = new Set(); // hình đã đọc lại bằng code
const trongRect = (p, r) => p[0] >= num(r, "x") && p[0] <= num(r, "x") + num(r, "width") && p[1] >= num(r, "y") && p[1] <= num(r, "y") + num(r, "height");

/* Sơ đồ tư duy: trả về { chinh: chữ của chủ đề chính, nhanh: [chữ của từng chủ đề nhánh], chiTiet: số chi tiết }. */
const docSoDo = (svg) => {
  daDoc.add(svg);
  const vb = attrs(svg.slice(0, svg.indexOf(">") + 1)).viewBox.split(" ").map(Number);
  const tx = texts(svg), [el] = tags(svg, "ellipse").filter((e) => e.fill === "sun-soft");
  assert.ok(el && tags(svg, "ellipse").length === 1, "đúng một hình bầu dục (chủ đề chính) tô sun-soft");
  assert.ok(close(num(el, "cx"), vb[2] / 2) && close(num(el, "cy"), vb[3] / 2), "chủ đề chính ở giữa hình");
  const chuTrongEl = tx.filter((t) => ((+t.x - num(el, "cx")) / num(el, "rx")) ** 2 + ((+t.y - 5 - num(el, "cy")) / num(el, "ry")) ** 2 <= 1);
  assert.equal(chuTrongEl.length, 1, "một dòng chữ trong chủ đề chính");
  const rects = tags(svg, "rect");
  assert.ok(rects.length >= 2 && rects.every((r) => r.fill === "acc-soft"), "chủ đề nhánh là hình chữ nhật tô acc-soft");
  const lines = tags(svg, "line");
  assert.equal(lines.length, rects.length, "mỗi chủ đề nhánh một đường nối");
  const nhanh = rects.map((r) => {
    const tam = [num(r, "x") + num(r, "width") / 2, num(r, "y") + num(r, "height") / 2];
    const noi = lines.filter((l) => close(num(l, "x1"), num(el, "cx")) && close(num(l, "y1"), num(el, "cy")) && close(num(l, "x2"), tam[0]) && close(num(l, "y2"), tam[1]));
    assert.equal(noi.length, 1, "đường nối đi từ tâm chủ đề chính đến tâm nhánh");
    const chu = tx.filter((t) => trongRect([+t.x, +t.y - 5], r));
    assert.equal(chu.length, 1, "một dòng chữ trong mỗi nhánh");
    return chu[0].t;
  });
  const chiTiet = tx.filter((t) => t.fill === "muted");
  chiTiet.forEach((t) => assert.ok(rects.some((r) => Math.abs(+t.x - (num(r, "x") + num(r, "width") / 2)) < 1 && +t.y > num(r, "y") + num(r, "height") && +t.y < num(r, "y") + num(r, "height") + 24), "chi tiết đặt ngay dưới một nhánh: " + t.t));
  assert.equal(tx.length, 1 + nhanh.length + chiTiet.length, "mọi chữ là chủ đề chính, nhánh hoặc chi tiết");
  tx.forEach((t) => assert.ok(+t["font-size"] >= 13, "chữ trong hình từ 13 trở lên"));
  return { chinh: chuTrongEl[0].t, nhanh, chiTiet: chiTiet.length };
};

/* Bảng: trả về { hang, cot, o: [[chữ từng ô theo hàng]] }. */
const docBang = (svg) => {
  daDoc.add(svg);
  const lines = tags(svg, "line"), ngang = lines.filter((l) => num(l, "y1") === num(l, "y2")), doc = lines.filter((l) => num(l, "x1") === num(l, "x2"));
  assert.equal(ngang.length + doc.length, lines.length, "mọi đường kẻ nằm ngang hoặc thẳng đứng");
  const ys = [...new Set(ngang.map((l) => num(l, "y1")))].sort((a, b) => a - b), xs = [...new Set(doc.map((l) => num(l, "x1")))].sort((a, b) => a - b);
  assert.equal(ys.length, ngang.length); assert.equal(xs.length, doc.length);
  ngang.forEach((l) => assert.ok(num(l, "x1") === xs[0] && num(l, "x2") === xs[xs.length - 1], "đường ngang kẻ hết bề rộng bảng"));
  doc.forEach((l) => assert.ok(num(l, "y1") === ys[0] && num(l, "y2") === ys[ys.length - 1], "đường dọc kẻ hết chiều cao bảng"));
  const dy = ys[1] - ys[0], dx = xs[1] - xs[0];
  ys.forEach((y, i) => i && assert.equal(y - ys[i - 1], dy, "các hàng cao bằng nhau"));
  xs.forEach((x, i) => i && assert.equal(x - xs[i - 1], dx, "các cột rộng bằng nhau"));
  const o = Array.from({ length: ys.length - 1 }, () => Array(xs.length - 1).fill(null));
  texts(svg).forEach((t) => {
    const c = xs.findIndex((x, i) => i && close(+t.x, (x + xs[i - 1]) / 2)) - 1, r = ys.findIndex((y, i) => i && close(+t.y - 5, (y + ys[i - 1]) / 2)) - 1;
    assert.ok(c >= 0 && r >= 0 && o[r][c] === null, "chữ đặt đúng giữa một ô, mỗi ô một chữ: " + t.t);
    o[r][c] = t.t;
  });
  assert.ok(o.every((h) => h.every((v) => v !== null)), "ô nào cũng có chữ");
  return { hang: ys.length - 1, cot: xs.length - 1, o };
};

/* ---------- các câu cần tính ----------
   id: đề chứa câu; has: đoạn chữ của đề; right(q): đáp án tính bằng code (so với ans hoặc o[0]); more(q): kiểm tra thêm. */
const CHECKS = [
  { id: T.de1, has: "Trong sơ đồ tư duy ở hình, chủ đề chính là", right: (q) => {
    const s = docSoDo(q.svg);
    assert.deepEqual(s.nhanh, ["Vai trò", "Cấu tạo", "Kiểu nhà"]); assert.equal(s.chiTiet, 3);
    assert.ok(q.o.includes(s.nhanh[0]) && q.o.includes(s.nhanh[2]) && q.x.includes("“" + s.chinh + "”"), "lựa chọn sai là chủ đề nhánh, lời giải nêu chủ đề chính");
    return s.chinh; } },
  { id: T.de1, has: "mỗi ngày 5 tiết. Hàng đầu ghi tên các ngày", right: (q) => {
    const tiet = +q.q.match(/mỗi ngày (\d+) tiết/)[1]; assert.equal(q.unit, "hàng"); assert.ok(q.x.includes(`${tiet} + 1 = ${tiet + 1} hàng`));
    return tiet + 1; } },
  { id: T.de2, has: "Sơ đồ tư duy ở hình có bao nhiêu chủ đề nhánh", right: (q) => {
    const s = docSoDo(q.svg);
    assert.equal(s.chinh, "Vườn rau"); assert.equal(s.chiTiet, s.nhanh.length, "mỗi nhánh một dòng chi tiết");
    assert.ok(q.x.includes(s.nhanh.join(", ")) && q.x.includes(`${s.nhanh.length} chủ đề nhánh`), "lời giải kể tên các nhánh");
    return s.nhanh.length; } },
  { id: T.de2, has: "Bảng ở hình có bao nhiêu hàng và bao nhiêu cột", right: (q) => {
    const b = docBang(q.svg);
    assert.deepEqual(b.o[0], ["Họ tên", "Tổ", "Điểm"], "hàng đầu là tiêu đề");
    assert.ok(q.x.includes(`${b.hang} hàng`) && q.x.includes(`${b.cot} cột`) && q.x.includes(b.o.slice(1).map((h) => h[0]).join(", ")), "lời giải ghi đúng số hàng, số cột, tên các bạn");
    assert.ok(q.o.includes(`${b.cot} hàng, ${b.hang} cột`), "có lựa chọn sai đảo hàng với cột");
    return `${b.hang} hàng, ${b.cot} cột`; } },
  { id: C.de1, has: "Điện áp định mức của quạt là bao nhiêu vôn", right: (q) => {
    const m = q.q.match(/ghi: (\d+) V – (\d+) W/); assert.ok(m, "nhãn ghi “<số> V – <số> W”"); assert.equal(q.unit, "V");
    assert.ok(q.x.includes(`${m[1]} V`) && q.x.includes(`${m[2]} W là công suất`)); return +m[1]; } }
];

const KHO = {};
[T, C].forEach((s) => { KHO[s.pool] = bank(s.pool).questions; assert.equal(KHO[s.pool].length, 50, s.pool + ": kho 50 câu"); });
const kho = [...KHO[T.pool], ...KHO[C.pool]];
const checked = new Set();
let n = 0;
CHECKS.forEach((c) => {
  const hits = kho.filter((q) => (q.q || "").includes(c.has));
  assert.equal(hits.length, 1, "đoạn chữ phải ứng với đúng một câu: " + c.has);
  const q = hits[0];
  assert.equal(q.src, c.id, "câu ở đúng đề: " + c.has);
  const r = c.right(q), got = q.type === "num" ? q.ans : q.o[0];
  assert.deepEqual(got, r, `đáp án “${got}” khác kết quả tính “${r}”: ${q.q.slice(0, 70)}`);
  if (c.more) c.more(q);
  checked.add(q); n++;
});
kho.filter((q) => q.type === "num" || q.svg || (q.type === "fill" && /^[\d\s,.−-]+$/.test(q.ans[0]))).forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + q.q.slice(0, 60)));

/* ---------- Bài 9 không trùng với kho cuối kì I ---------- */
const tu = (s) => new Set(s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter((w) => w.length > 1));
const cu = ["tin6-ck1-de1", "tin6-ck1-de2"].flatMap((id) => bank(id).questions).filter((q) => q.topic === "An toàn thông tin trên Internet");
const moi = KHO[T.pool].filter((q) => q.topic === "An toàn thông tin trên Internet");
assert.ok(cu.length >= 6 && moi.length === 6);
moi.forEach((a) => cu.forEach((b) => {
  const A = tu(a.q + " " + (a.o || []).join(" ")), B = tu(b.q + " " + (b.o || []).join(" ")), chung = [...A].filter((w) => B.has(w)).length;
  assert.ok(chung / Math.min(A.size, B.size) < 0.5, "câu Bài 9 trùng nhiều chữ với kho cuối kì I: " + a.q.slice(0, 50));
}));

/* ---------- mức độ và ma trận ---------- */
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
[T, C].forEach((s) => {
  const p = bank(s.pool), M = p.pool.matrix, cells = Object.values(M), K = KHO[s.pool], d1 = bank(s.de1).questions, d2 = bank(s.de2).questions;
  assert.ok(K.every((q) => [1, 2, 3].includes(q.lv)), s.pool + ": câu nào trong kho cũng cần lv");
  assert.ok(cells.every(Array.isArray), s.pool + ": ma trận ghi theo [Biết, Hiểu, Vận dụng]");
  assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], s.pool + ": ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
  [d1, d2].forEach((d, i) => {
    assert.deepEqual([...new Set(d.map((q) => q.topic))], Object.keys(M), `${s.pool}: Đề ${i + 1} đủ chủ đề, theo thứ tự của ma trận`);
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `Đề ${i + 1} của ${s.pool} đúng ma trận ở chủ đề ${t}`));
  });
  assert.ok(K.filter((q) => q.type === "tf4").length >= 3 && !K.some((q) => q.type === "essay"), s.pool + ": ít nhất 3 câu đúng/sai 4 ý, không có câu tự luận");
  const seen = new Set();
  for (let k = 0; k < 300; k++) {
    const d = Quiz.draw(p);
    assert.equal(d.notes.length, 0, s.pool + ": rút thử có ghi chú: " + d.notes.join("; "));
    assert.equal(d.questions.length, 25);
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d.questions, t, l)), v, `${s.pool}: rút đúng ma trận ở chủ đề ${t}`));
    d.questions.forEach((q) => seen.add(Quiz.key(q)));
  }
  assert.equal(seen.size, 50, s.pool + ": 300 lần rút thử phải gặp đủ 50 câu của kho");
  [[s.de1, s.de2], [s.de2, s.de1]].forEach(([lam, con]) => {
    const hist = (q) => (q.src === lam ? { done: 1, wrong: 0 } : null);
    for (let k = 0; k < 30; k++) {
      const d = Quiz.draw(p, hist);
      assert.equal(d.notes.length, 0); assert.equal(d.questions.length, 25);
      assert.ok(d.questions.every((q) => q.src === con), `${s.pool}: đã làm hết ${lam} thì rút toàn câu của ${con}`);
    }
  });
});
console.log(n, "câu đã tính lại hoặc đọc lại hình (hai ngân hàng); kho " + kho.length + " câu, 2 ma trận 10 – 8 – 7.");
console.log("MATH OK");
