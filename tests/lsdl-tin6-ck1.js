// Tính lại đáp án và kiểm tra ma trận bốn ngân hàng lớp 6 cuối kì I của Phiên N6: Lịch sử và Địa lí (data/banks/6-lsdl.js),
// GDCD (6-gdcd.js), Tin học (6-tin.js), Công nghệ (6-congnghe.js). Mỗi ngân hàng = đề 1 có sẵn + Đề 2 + đề ngẫu nhiên; chỉ đề
// ngẫu nhiên Lịch sử và Địa lí có câu riêng (Địa lí Bài 10–15).
// Câu có phép tính được nhận ra bằng một đoạn chữ của đề (has, đúng một câu trong kho, đúng đề ghi ở id); kiểm tra đề có đúng số
// liệu rồi so đáp án với kết quả tính bằng code: điền khuyết ans[0], trả lời bằng số ans, trắc nghiệm o[0]. Lịch sử và Địa lí:
// thế kỉ, khoảng cách thời gian, chữ số La Mã, tỉ lệ bản đồ, giờ khu vực, độ cao tương đối, phân loại núi theo độ cao; câu có lược đồ địa hình
// đọc toạ độ trong hình (đường đồng mức là hình elip, số ghi độ cao đặt ở đỉnh elip; điểm nằm trên đường nào; sườn nào các đường
// sát nhau hơn). Tin học: đổi đơn vị dung lượng (1 KB = 1 024 byte…), so sánh dung lượng. Công nghệ: tiền đi chợ, lượng thịt.
// Câu trả lời bằng số và câu điền có đáp án là số nào trong bốn kho cũng phải có kiểm tra ở đây.
// Cuối cùng kiểm tra mức độ và ma trận: mọi câu có lv; ma trận 10 Biết, 8 Hiểu, 7 Vận dụng, đúng chữ chủ đề của kho; Đề 2 chia
// đúng theo ma trận; ô nào cũng đủ câu (6 chủ đề mới của Lịch sử và Địa lí: gấp đôi); câu riêng chỉ ở chủ đề mới, ô có rút câu;
// mỗi kho có ít nhất 3 câu đúng/sai 4 ý, không có câu tự luận; rút thử nhiều lần ra đúng ma trận và gặp đủ các câu riêng.
// Chạy: node tests/lsdl-tin6-ck1.js → in MATH OK.
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
const ma = (m) => ({ de1: m + "6-ck1-de1", de2: m + "6-ck1-de2", pool: m + "6-ck1-ngau-nhien" });
const L = ma("lsdl"), G = ma("gdcd"), T = ma("tin"), C = ma("congnghe");
// chủ đề mới của Địa lí Bài 10–15 (đề 1 chưa có): câu ở Đề 2 và câu riêng của đề ngẫu nhiên
const MOI = ["Cấu tạo của Trái Đất", "Nội sinh và ngoại sinh", "Núi lửa và động đất", "Địa hình và khoáng sản", "Lược đồ địa hình, lát cắt", "Lớp vỏ khí, khí áp và gió"];

/* ---------- số ---------- */
const close = (x, y) => Math.abs(x - y) < 1e-9;
const laMa = (n) => [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]].reduce((s, [v, c]) => { while (n >= v) { s += c; n -= v; } return s; }, "");
const tuLaMa = (s) => [...s].reduce((t, c, i) => { const v = { I: 1, V: 5, X: 10 }[c], w = { I: 1, V: 5, X: 10 }[s[i + 1]] || 0; return t + (v < w ? -v : v); }, 0);
const theKi = (nam) => Math.ceil(nam / 100); // năm Công nguyên, hoặc số của năm TCN → thế kỉ (thế kỉ II TCN: năm 200 TCN đến 101 TCN)
const loaiNui = (h) => (h < 1000 ? "Núi thấp" : h < 2000 ? "Núi trung bình" : "Núi cao"); // độ cao tuyệt đối từ 500 m trở lên
const DON_VI = { bit: 1 / 8, Bit: 1 / 8, byte: 1, Byte: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3, TB: 1024 ** 4 }; // theo byte
const dungLuong = (s) => { const m = /(\d+(?:,\d+)?)\s*(byte|KB|MB|GB|TB)\b/.exec(s); assert.ok(m, "không đọc được dung lượng: " + s); return +m[1].replace(",", ".") * DON_VI[m[2]]; };
const lonNhat = (arr, f) => arr.reduce((a, b) => (f(b) > f(a) ? b : a));

/* ---------- hình: lược đồ địa hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const trong = (e, x, y) => ((x - e.cx) / e.rx) ** 2 + ((y - e.cy) / e.ry) ** 2; // < 1: bên trong elip, = 1: nằm trên đường
// các đường đồng mức, từ thấp đến cao: số ghi độ cao đặt ở đỉnh elip; đường cao hơn nằm hẳn trong đường thấp hơn, cách đều 100 m
const dongMuc = (svg) => {
  const es = tags(svg, "ellipse").map((e) => ({ cx: +e.cx, cy: +e.cy, rx: +e.rx, ry: +e.ry }));
  texts(svg).filter((t) => /^\d+$/.test(t.t)).forEach((t) => {
    const e = es.filter((e) => Math.hypot(e.cx - t.x, e.cy - e.ry - (t.y - 5)) < 3);
    assert.equal(e.length, 1, "số " + t.t + " cần đặt ở đỉnh đúng một đường đồng mức");
    e[0].h = +t.t;
  });
  assert.ok(es.length >= 3 && es.every((e) => e.h), "đường đồng mức nào cũng cần ghi độ cao");
  es.sort((a, b) => a.h - b.h);
  es.slice(1).forEach((e, i) => {
    assert.equal(e.h - es[i].h, 100, "các đường đồng mức cách đều 100 m");
    for (let k = 0; k < 360; k++) {
      const a = (k * Math.PI) / 180;
      assert.ok(trong(es[i], e.cx + e.rx * Math.cos(a), e.cy + e.ry * Math.sin(a)) < 1, `đường ${e.h} phải nằm trong đường ${es[i].h}`);
    }
  });
  return es;
};
// độ cao của điểm tên chu: chấm tròn màu acc gần chữ đó nhất, nằm trên đúng một đường đồng mức
const doCao = (svg, chu) => {
  const es = dongMuc(svg), t = texts(svg).find((x) => x.t === chu);
  assert.ok(t, "thiếu điểm " + chu);
  const p = tags(svg, "circle").filter((c) => c.fill === "acc").reduce((a, c) => (Math.hypot(c.cx - t.x, c.cy - t.y) < Math.hypot(a.cx - t.x, a.cy - t.y) ? c : a));
  assert.ok(Math.hypot(p.cx - t.x, p.cy - t.y) < 25, "chữ " + chu + " cần đặt sát điểm");
  const on = es.filter((e) => Math.abs(trong(e, +p.cx, +p.cy) - 1) < 0.01);
  assert.equal(on.length, 1, "điểm " + chu + " cần nằm trên đúng một đường đồng mức");
  return on[0].h;
};
// sườn dốc hơn: các elip cùng cy; đo khoảng cách giữa hai đường liền nhau ở mép trái (tây) và mép phải (đông). Mũi tên chỉ hướng
// bắc hướng lên trên nên bên trái là phía tây.
const suonDoc = (svg) => {
  const es = dongMuc(svg), gap = (xs) => xs.slice(1).map((x, i) => Math.abs(x - xs[i]));
  assert.ok(es.every((e) => e.cy === es[0].cy), "các đường đồng mức có tâm cùng độ cao");
  const tay = gap(es.map((e) => e.cx - e.rx)), dong = gap(es.map((e) => e.cx + e.rx));
  const ln = tags(svg, "line")[0], tip = tags(svg, "polygon")[0].points.trim().split(/\s+/).map((p) => p.split(",").map(Number)).reduce((a, p) => (p[1] < a[1] ? p : a));
  assert.ok(+ln.x1 === +ln.x2 && tip[0] === +ln.x1 && tip[1] < Math.min(+ln.y1, +ln.y2) && texts(svg).some((x) => x.t === "Bắc"), "mũi tên chỉ hướng bắc lên trên");
  assert.ok(Math.max(...tay) < Math.min(...dong), "các đường đồng mức ở một sườn phải sát nhau hơn hẳn sườn kia");
  return "phía tây";
};

/* ---------- các câu cần tính ----------
   id: đề chứa câu; has: đoạn chữ của đề; right(q): đáp án tính bằng code (so với ans[0], ans hoặc o[0]); more(q): kiểm tra thêm. */
const CHECKS = [
  // Lịch sử và Địa lí
  { id: L.de1, has: "Năm 2026 thuộc thế kỉ nào", right: () => "Thế kỉ " + laMa(theKi(2026)) },
  { id: L.de1, has: "Từ năm 1010 đến năm 2026", right: () => String(2026 - 1010) },
  { id: L.de1, has: "tỉ lệ 1 : 100 000, đoạn thẳng dài 5 cm", right: () => String((5 * 100000) / 100000) }, // cm → km: chia 100 000
  { id: L.de1, has: "Trái Đất tự quay một vòng quanh trục hết khoảng", right: () => "24" },
  { id: L.de2, has: "Năm 179 TCN thuộc thế kỉ nào", right: () => "Thế kỉ " + laMa(theKi(179)) + " TCN", more: (q) => assert.ok(q.x.includes("từ năm 200 TCN đến năm 101 TCN")) },
  { id: L.de2, has: "Từ năm 500 TCN đến năm 100 TCN", right: () => 500 - 100 },
  { id: L.de2, has: "kim giờ chỉ đúng số IX, kim phút chỉ số XII", right: () => tuLaMa("IX") },
  { id: L.de2, has: "tỉ lệ 1 : 500 000, quãng đường", right: (q) => { assert.ok(q.q.includes("dài 6 cm") && q.unit === "km"); return (6 * 500000) / 100000; } },
  { id: L.de2, has: "Hệ Mặt Trời gồm Mặt Trời và ___ hành tinh", right: () => "8" },
  { id: L.de2, has: "Hà Nội ở khu vực giờ số 7, Tô-ky-ô (Nhật Bản) ở khu vực giờ số 9", right: (q) => { assert.ok(q.q.includes("là 8 giờ sáng")); return 8 + (9 - 7); } },
  { id: L.de2, has: "Đỉnh núi X cao 1 500 m", right: (q) => { assert.ok(q.q.includes("độ cao 400 m")); return 1500 - 400; } },
  { id: L.de2, has: "Điểm A cao hơn điểm B bao nhiêu mét", right: (q) => { const [a, b] = [doCao(q.svg, "A"), doCao(q.svg, "B")]; assert.ok(q.x.includes(`đồng mức ${a} m`) && q.x.includes(`đồng mức ${b} m`)); return a - b; } },
  { id: L.pool, has: "độ cao tuyệt đối là 1 600 m", right: () => loaiNui(1600) },
  { id: L.pool, has: "sườn nào của ngọn núi dốc hơn", right: (q) => { assert.ok(q.o[0].startsWith("Sườn " + suonDoc(q.svg) + ", vì các đường đồng mức ở đó gần nhau hơn")); return q.o[0]; } },
  // Tin học
  { id: T.de1, has: "1 byte = ___ bit", right: () => String(DON_VI.byte / DON_VI.bit) },
  { id: T.de1, has: "đơn vị nào lớn nhất", right: (q) => lonNhat(q.o, (o) => DON_VI[/\((\w+)\)/.exec(o)[1]]) },
  { id: T.de1, has: "Một thẻ nhớ 8 GB", right: (q) => { const n = (8 * DON_VI.GB) / (4 * DON_VI.MB); assert.equal(n, 2048); return lonNhat(q.o, (o) => -Math.abs(+o.replace(/\D/g, "") - n)); } },
  { id: T.de2, has: "Đơn vị nhỏ nhất dùng để đo dung lượng", right: (q) => lonNhat(q.o, (o) => -DON_VI[(/\((\w+)\)/.exec(o) || [0, o])[1]]) },
  { id: T.de2, has: "Thiết bị lưu trữ nào sau đây có dung lượng lớn nhất", right: (q) => lonNhat(q.o, dungLuong) },
  { id: T.de2, has: "Một tệp bài hát có dung lượng 1,5 MB", right: (q) => { assert.equal(q.unit, "KB"); return (1.5 * DON_VI.MB) / DON_VI.KB; } },
  { id: T.de2, has: "Ổ đĩa của máy tính còn trống 4 GB", right: (q) => { assert.ok(q.q.includes("512 MB")); return Math.floor((4 * DON_VI.GB) / (512 * DON_VI.MB)); } },
  // Công nghệ
  { id: C.de1, has: "0,5 kg thịt giá 130 000 đồng/kg", right: () => String(0.5 * 130000 + 10000 + 4 * 4000) },
  { id: C.de2, has: "Mẹ đưa An 100 000 đồng đi chợ", right: () => 100000 - (0.2 * 250000 + 2 * 6000 + 1 * 20000) },
  { id: C.de2, has: "nấu món thịt kho cho 6 người", right: () => 0.15 * 6 }
];

const KHO = {}; // mã pool → câu trong kho (câu riêng + hai đề, mỗi câu ghi src)
[L, G, T, C].forEach((s) => {
  const p = bank(s.pool), d1 = bank(s.de1), d2 = bank(s.de2);
  assert.ok(p && d1 && d2, "thiếu đề của " + s.pool);
  assert.deepEqual(p.pool.from, [s.de1, s.de2], s.pool + ": from là đề 1 và Đề 2");
  assert.ok(d1.minutes === d2.minutes && d2.minutes === p.minutes, s.pool + ": cùng số phút với đề 1");
  assert.equal(d1.questions.length, 25); assert.equal(d2.questions.length, 25);
  KHO[s.pool] = p.questions;
});
const kho = Object.values(KHO).flat();
assert.equal(KHO[L.pool].length, 60, "kho Lịch sử và Địa lí 60 câu (10 câu riêng)");
[G, T, C].forEach((s) => assert.equal(KHO[s.pool].length, 50, s.pool + ": 50 câu, không có câu riêng"));
let n = 0;
const checked = new Set();
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.q.includes(c.has));
  assert.equal(m.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${m.length}`);
  const q = m[0], at = c.id + ": " + c.has;
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  const want = c.right(q), got = q.type === "fill" ? q.ans[0] : q.type === "num" ? q.ans : q.o[0];
  assert.ok(typeof want === "number" ? typeof got === "number" && close(got, want) : got === want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), at + ": nhiễu trùng đáp án đúng");
  if (c.more) c.more(q);
  checked.add(q); n++;
});
// câu trả lời bằng số và câu điền có đáp án là số nào cũng phải được tính lại ở trên
kho.filter((q) => q.type === "num" || (q.type === "fill" && /^[\d\s,.−-]+$/.test(q.ans[0]))).forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));

/* ---------- mức độ và ma trận ---------- */
const sum = (a) => a.reduce((s, v) => s + v, 0), dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
[L, G, T, C].forEach((s) => {
  const p = bank(s.pool), M = p.pool.matrix, cells = Object.values(M), K = KHO[s.pool], d2 = bank(s.de2).questions, mine = K.filter((q) => q.src === s.pool);
  assert.ok(K.every((q) => [1, 2, 3].includes(q.lv)), s.pool + ": câu nào trong kho cũng cần lv");
  assert.ok(cells.every(Array.isArray), s.pool + ": ma trận ghi theo [Biết, Hiểu, Vận dụng]");
  assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], s.pool + ": ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
  assert.deepEqual(Object.keys(M).sort(), [...new Set(K.map((q) => q.topic))].sort(), s.pool + ": ma trận đủ các chủ đề của kho, đúng chữ");
  assert.ok(K.filter((q) => q.type === "tf4").length >= 3 && !K.some((q) => q.type === "essay"), s.pool + ": ít nhất 3 câu đúng/sai 4 ý, không có câu tự luận");
  // Đề 2 chia đúng theo ma trận (10 – 8 – 7, đủ chủ đề); ô nào cũng đủ câu
  Object.entries(M).forEach(([t, v]) => {
    assert.deepEqual([1, 2, 3].map((l) => dem(d2, t, l)), v, `${s.de2} đúng ma trận ở chủ đề ${t}`);
    v.forEach((k, i) => assert.ok(dem(K, t, i + 1) >= (MOI.includes(t) ? 2 * k : k), `${s.pool}: ô (${t}, mức ${i + 1}) rút ${k} câu mà kho có ${dem(K, t, i + 1)}`));
  });
  // câu riêng (chỉ Lịch sử và Địa lí): chủ đề mới, ô có rút câu; đề 1 không có chủ đề mới
  mine.forEach((q) => assert.ok(MOI.includes(q.topic) && M[q.topic][q.lv - 1] > 0, `${s.pool}: câu riêng ở ô (${q.topic}, mức ${q.lv}): ${q.q.slice(0, 50)}`));
  assert.ok(!bank(s.de1).questions.some((q) => MOI.includes(q.topic)), s.de1 + " không có chủ đề mới");
  const seen = new Set();
  for (let k = 0; k < 300; k++) {
    const d = Quiz.draw(p);
    assert.equal(d.notes.length, 0, s.pool + ": rút thử có ghi chú: " + d.notes.join("; "));
    assert.equal(d.questions.length, 25);
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d.questions, t, l)), v, `${s.pool}: rút đúng ma trận ở chủ đề ${t}`));
    d.questions.forEach((q) => seen.add(Quiz.key(q)));
  }
  assert.ok(mine.every((q) => seen.has(Quiz.key(q))), s.pool + ": 300 lần rút thử phải gặp đủ các câu riêng");
});
assert.equal(KHO[L.pool].filter((q) => q.src === L.pool).length, 10);
console.log(n, "câu đã tính lại (câu có phép tính, có hình của bốn ngân hàng); kho " + kho.length + " câu, 4 ma trận 10 – 8 – 7.");
console.log("MATH OK");
