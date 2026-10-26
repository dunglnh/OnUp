// Kiểm tra ngân hàng Khoa học 4 cuối năm của Phiên N16 (data/banks/4-khoahoc.js, khoahoc4-ck2-*), theo mẫu tests/lsdl-gdcd6-ck2.js.
// Kho = Đề 1 + Đề 2 (25 câu mỗi đề, chia đúng ma trận) + 25 câu riêng của đề ngẫu nhiên; mỗi ô (chủ đề, mức) có đúng 3 câu: một ở
// mỗi đề cố định, một câu riêng. Câu có hình, có phép tính hoặc có chuỗi thức ăn được nhận ra bằng một đoạn chữ của đề (has, đúng
// một câu trong kho, đúng đề ghi ở id) và tính lại đáp án bằng code: điền khuyết ans[0], trả lời bằng số ans, trắc nghiệm o[0], sắp
// xếp o. Hình đọc lại từ chuỗi SVG: cây nấm mũ (số nào chỉ vào mũ, thân, chân nấm), tháp dinh dưỡng sáu tầng ghi chữ (tầng dưới cùng
// rộng nhất), sơ đồ chuỗi thức ăn (ô có chữ hoặc số, mũi tên là đoạn thẳng và đầu mũi tên tam giác; mũi tên chỉ từ thức ăn đến con
// vật ăn nó), rồi đếm số chuỗi thức ăn của sơ đồ nhiều nhánh. Câu chuỗi thức ăn bằng chữ: đọc các quan hệ “A ăn B”, “A bắt B”, “A săn
// B”, “A hút mật B” trong đề, xếp thành chuỗi, so với đáp án; ý đúng/sai (“A là thức ăn của B”, số chuỗi có một sinh vật, số sinh vật
// của mỗi chuỗi) tính lại theo các quan hệ đó. Câu chọn chuỗi “đúng với thực tế”: chỉ lựa chọn đúng có mọi mắt xích nằm trong bảng
// quan hệ thức ăn AN (ghi theo lời giải của câu).
// Rồi kiểm tra mức độ, ma trận (10 Biết, 8 Hiểu, 7 Vận dụng), kiểu Đ/S của câu đúng/sai 4 ý không lặp quá một phần ba, đáp án đúng
// không dài hơn hẳn lựa chọn sai, đề bài không trùng câu nào khác trong file, rút thử nhiều lần (đúng ma trận, gặp đủ 75 câu; đã làm
// hết một đề cố định thì không rút lại câu của đề đó, đã làm hết cả hai đề thì rút đúng 25 câu riêng) và dò lộ đáp án giữa các câu
// rút được cùng lúc (khác ô; bộ dò theo tests/lsdl-gdcd6-ck2.js): số ở vị trí kết quả, cặp nối có cả hai vế, chuỗi của câu sắp xếp;
// đáp án bằng chữ có ở câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM.
// Có sách ở ../OnUp-Book/lop-4/khoa-hoc-4/chu.txt (repo riêng tư, mục 4 của docs/KE-HOACH-NOI-DUNG.md) thì so mọi trường chữ của
// câu với chữ OCR của sách sau khi bỏ dấu, gộp nguyên âm (chữ OCR của cuốn này hay sai dấu, sai nguyên âm): không có chuỗi 8 từ
// liền nhau trùng sách; DO_SACH=1 in cả chuỗi 6 từ để xem tay. Không có sách thì bỏ qua bước này.
// Chạy: node tests/khoahoc4-ck2.js → in MATH OK.
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
const S = { de1: "khoahoc4-ck2-de1", de2: "khoahoc4-ck2-de2", pool: "khoahoc4-ck2-ngau-nhien" };

/* ---------- số ---------- */
const close = (x, y) => Math.abs(x - y) < 1e-9;
const sum = (a) => a.reduce((s, v) => s + v, 0);
const val = (s) => +String(s).replace(/\s/g, "").replace(",", "."); // “1 300” → 1300
const vn = (x) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, " "); // 120000 → “120 000”

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const daDoc = new Set(); // hình đã đọc lại bằng code
const trongHop = (x, y, r, pad = 0) => x >= num(r, "x") - pad && x <= num(r, "x") + num(r, "width") + pad && y >= num(r, "y") - pad && y <= num(r, "y") + num(r, "height") + pad;

/* Cây nấm mũ: mũ là path “M x0 y0 Q … Z” (vòm, đáy thẳng ở y0), thân là rect, chân là ellipse; mỗi số ghi trong một vòng tròn, đường
   chỉ (line) nối từ một điểm trên bộ phận đến vòng tròn. Trả về { "1": "Mũ nấm", … } theo điểm đầu của đường chỉ. */
const docNam = (svg) => {
  daDoc.add(svg);
  const mu = tags(svg, "path"), than = tags(svg, "rect"), chan = tags(svg, "ellipse"), vong = tags(svg, "circle"), so = texts(svg);
  assert.ok(mu.length === 1 && than.length === 1 && chan.length === 1 && vong.length === 3, "cây nấm: một mũ, một thân, một chân, ba số");
  const p = mu[0].d.match(/-?\d+(\.\d+)?/g).map(Number), xs = p.filter((v, i) => i % 2 === 0), ys = p.filter((v, i) => i % 2 === 1);
  const day = ys[0], dinh = Math.min(...ys), t = than[0], c = chan[0];
  assert.ok(close(num(t, "y"), day), "thân nấm nối ngay dưới mũ nấm");
  assert.ok(num(c, "cy") > num(t, "y") + num(t, "height") / 2, "chân nấm ở dưới thân nấm");
  const boPhan = (x, y) => {
    if (((x - num(c, "cx")) / num(c, "rx")) ** 2 + ((y - num(c, "cy")) / num(c, "ry")) ** 2 <= 1.05 && y > num(t, "y") + num(t, "height") - 4) return "Chân nấm";
    if (trongHop(x, y, t, 0.5)) return "Thân nấm";
    if (y > dinh && y < day && x > Math.min(...xs) && x < Math.max(...xs)) return "Mũ nấm";
    return null;
  };
  const ket = {};
  tags(svg, "line").filter((l) => l.stroke === "ink").forEach((l) => {
    const v = vong.find((o) => close(num(o, "cy"), num(l, "y2")) && Math.abs(num(o, "cx") - num(o, "r") - num(l, "x2")) < 2);
    if (!v) return;
    const s = so.find((x) => close(+x.x, num(v, "cx")) && Math.abs(+x.y - num(v, "cy")) < 8);
    const b = boPhan(num(l, "x1"), num(l, "y1"));
    assert.ok(s && b, "đường chỉ của mỗi số chạm vào một bộ phận");
    ket[s.t] = b;
  });
  assert.deepEqual(ket, { 1: "Mũ nấm", 2: "Thân nấm", 3: "Chân nấm" }, "số 1, 2, 3 chỉ mũ, thân, chân nấm từ trên xuống");
  return ket;
};
/* Tháp dinh dưỡng: các tầng là rect xếp chồng, tầng dưới rộng hơn tầng trên, chữ ghi giữa tầng. Trả về chữ từ trên xuống. */
const docThap = (svg) => {
  daDoc.add(svg);
  const t = tags(svg, "rect").sort((a, b) => num(a, "y") - num(b, "y")), so = texts(svg);
  assert.equal(t.length, 6, "tháp có sáu tầng");
  t.forEach((r, i) => {
    assert.ok(close(num(r, "x") + num(r, "width") / 2, 160), "tầng ở giữa hình");
    if (i) { assert.ok(num(r, "width") > num(t[i - 1], "width"), "tầng dưới rộng hơn tầng trên"); assert.ok(num(r, "y") >= num(t[i - 1], "y") + num(t[i - 1], "height"), "các tầng không chồng lên nhau"); }
  });
  return t.map((r) => { const c = so.filter((x) => trongHop(+x.x, +x.y - 5, r)); assert.equal(c.length, 1, "mỗi tầng một chữ"); return c[0].t; });
};
/* Sơ đồ chuỗi thức ăn: ô là rect có chữ ở giữa; mũi tên là line (điểm đầu ở gốc) và polygon tam giác (đỉnh đầu tiên là mũi nhọn).
   Gốc mũi tên nằm sát một ô (thức ăn), mũi nhọn nằm sát một ô khác (con vật ăn nó). Trả về các cặp [thức ăn, con vật ăn nó]. */
const docSoDo = (svg) => {
  daDoc.add(svg);
  const o = tags(svg, "rect").map((r) => { const c = texts(svg).filter((x) => trongHop(+x.x, +x.y - 5, r)); assert.equal(c.length, 1, "mỗi ô một tên"); return Object.assign(r, { ten: c[0].t }); });
  const sat = (x, y) => { const g = o.filter((r) => trongHop(x, y, r, 4)); assert.equal(g.length, 1, `điểm (${x}, ${y}) phải sát đúng một ô`); return g[0].ten; };
  const line = tags(svg, "line"), tam = tags(svg, "polygon").map((p) => pts(p.points));
  assert.equal(line.length, tam.length, "mỗi mũi tên một đầu nhọn");
  return line.map((l) => {
    const d = tam.find((p) => Math.hypot(p[1][0] + p[2][0] - 2 * num(l, "x2"), p[1][1] + p[2][1] - 2 * num(l, "y2")) < 1); // đáy tam giác ở cuối line
    assert.ok(d, "đầu nhọn nằm ở cuối mũi tên");
    return [sat(num(l, "x1"), num(l, "y1")), sat(d[0][0], d[0][1])];
  });
};
const chuoiTu = (canh) => { // các chuỗi thức ăn đi hết sơ đồ: bắt đầu ở ô không ăn ai, kết thúc ở ô không bị ai ăn
  const dau = [...new Set(canh.map((c) => c[0]))].filter((x) => !canh.some((c) => c[1] === x)), ra = [];
  const di = (x, d) => { const tiep = canh.filter((c) => c[0] === x); if (!tiep.length) ra.push(d); tiep.forEach((c) => di(c[1], d.concat(c[1]))); };
  dau.forEach((x) => di(x, [x])); return ra;
};
/* Quan hệ thức ăn viết bằng chữ trong đề: “A ăn B”, “A bắt B”, “A săn B”, “A hút mật B”, “A và C đều ăn B” (A là con vật ăn, B là
   thức ăn). Trả về các cặp [thức ăn, con vật ăn nó]. */
const quanHe = (s) => [...s.matchAll(/([A-ZĐÀ-Ỹa-zđà-ỹ][^,.;:]*?)(?<!thức) (?:đều )?(?:ăn|bắt|săn|hút mật|lặn xuống bắt) ([^,.;:]+?)(?: để ăn)?(?=[,.;:]|$)/gu)]
  .flatMap((m) => m[1].replace(/^(Ở [^:]+: |còn )/u, "").split(" và ").map((a) => [m[2].trim().toLowerCase(), a.trim().toLowerCase()]));
const xepChuoi = (canh) => { const c = chuoiTu(canh); assert.equal(c.length, 1, "các quan hệ tạo thành đúng một chuỗi"); return c[0]; };
const laThucAn = (chuoi, a, b) => { const i = chuoi.indexOf(a.toLowerCase()), j = chuoi.indexOf(b.toLowerCase()); assert.ok(i >= 0 && j >= 0, `${a}, ${b} có trong chuỗi`); return j === i + 1; };
const tachMuiTen = (s) => s.split("→").map((x) => x.trim().toLowerCase());
const SO = ["", "một", "hai", "ba", "bốn", "năm", "sáu"];
/* Con vật ăn gì, ghi theo lời giải của các câu chọn chuỗi “đúng với thực tế” (chỉ quan hệ có thật; không có trong bảng là không ăn). */
const AN = { "tép": ["rong"], "cá rô": ["tép"], "cò": ["cá rô", "tép"], "khỉ": ["cây sung"], "trăn": ["khỉ"] };
const thucTe = (q) => { // chỉ lựa chọn đầu có mọi mắt xích trong AN; lời giải nêu từng mắt xích của chuỗi đúng
  const dung = (o) => { const c = tachMuiTen(o); return c.every((x, i) => !i || (AN[x] || []).includes(c[i - 1])); };
  assert.deepEqual(q.o.map(dung), [true, false, false, false], "chỉ lựa chọn đầu đúng với bảng quan hệ thức ăn");
  assert.ok(q.x.includes(q.o[0]), "lời giải ghi chuỗi đúng");
  return q.o[0]; };

const CHECKS = [
  { id: S.de1, has: "Bộ phận được đánh số 2 là", right: (q) => { const k = docNam(q.svg); assert.ok(["Mũ nấm", "Chân nấm"].every((b) => q.o.includes(b)), "lựa chọn sai gồm hai bộ phận kia"); return k[2]; } },
  { id: S.de2, has: "Nhóm ngũ cốc, khoai củ nằm ở tầng nào", right: (q) => { const t = docThap(q.svg); assert.deepEqual(t, ["A", "B", "C", "D", "E", "F"], "chữ A ở trên cùng đến F ở dưới cùng"); assert.ok(q.x.includes("tầng dưới cùng"), "lời giải nói tầng dưới cùng"); return "Tầng " + t[t.length - 1]; } },
  { id: S.de1, has: "Chuỗi thức ăn nào dưới đây đúng với thực tế ở một cái ao", right: thucTe },
  { id: S.de1, has: "sinh vật ở ô số 2 là", right: (q) => {
    const ch = xepChuoi(docSoDo(q.svg)), qh = xepChuoi(quanHe(q.q.split(".")[0])); // sơ đồ: ô 1 → tên → ô 2; đề bài: chuỗi viết bằng chữ
    assert.equal(ch.length, qh.length, "sơ đồ và đề bài cùng số sinh vật");
    ch.forEach((x, i) => { if (!/^\d$/.test(x)) assert.equal(x.toLowerCase(), qh[i], "ô có tên đứng đúng chỗ trong chuỗi của đề bài"); });
    assert.ok(q.x.includes("ô số 2 là " + qh[ch.indexOf("2")]), "lời giải nói ô số 2");
    return qh[ch.indexOf("2")]; } },
  { id: S.de2, has: "viết được bao nhiêu chuỗi thức ăn bắt đầu từ cây dẻ", right: (q) => {
    const c = chuoiTu(docSoDo(q.svg)); assert.ok(c.every((x) => x[0] === "Cây dẻ"), "chuỗi nào cũng bắt đầu từ cây dẻ");
    c.forEach((x) => assert.ok(q.x.includes(x.join(" → ")), "lời giải liệt kê " + x.join(" → ")));
    return c.length; } },
  { id: S.de1, has: "Năng lượng: 120 kcal", right: (q) => { const k = +/(\d+) kcal/.exec(q.q)[1]; assert.ok(q.x.includes(`${k} × 1 000 = ${vn(k * 1000)}`)); return k * 1000; } },
  { id: S.de2, has: "Lan cần uống thêm ít nhất bao nhiêu", right: (q) => {
    const can = val(/ít nhất ([\d ]+) ml nước mỗi ngày/.exec(q.q)[1]), m = /đã uống (\d+) cốc nước, mỗi cốc (\d+) ml/.exec(q.q), da = m[1] * m[2];
    assert.ok(q.x.includes(`${m[1]} × ${m[2]} = ${vn(da)}`) && q.x.includes(`${vn(can)} − ${vn(da)} = ${vn(can - da)}`)); return can - da; } },
  { id: S.pool, has: "Bình cần hoạt động thêm ít nhất bao nhiêu phút", right: (q) => {
    const can = +/thể lực (\d+) phút mỗi ngày/.exec(q.q)[1], a = +/tập võ (\d+) phút/.exec(q.q)[1], b = +/nhảy dây (\d+) phút/.exec(q.q)[1];
    assert.ok(q.x.includes(`${a} + ${b} = ${a + b}`) && q.x.includes(`${can} − ${a + b} = ${can - a - b}`)); return can - a - b; } },
  { id: S.de1, has: "Hộp sữa chua trong tủ lạnh ghi", right: (q) => {
    const [d, m] = /ngày (\d+)\/(\d+)/.exec(q.q).slice(1).map(Number), [hd, hm] = /Hạn sử dụng: (\d+)\/(\d+)/.exec(q.q).slice(1).map(Number);
    assert.ok(m * 100 + d > hm * 100 + hd, "hôm nay đã qua hạn sử dụng"); assert.ok(q.o[1].includes(`quá hạn ${["", "một", "hai", "ba"][d - hd]} ngày`), "lựa chọn sai ghi đúng số ngày quá hạn");
    return "Không ăn, vì đã quá hạn sử dụng"; } },
  { id: S.de2, has: "Rong rêu → Ốc → Vịt, mũi tên từ ốc đến vịt", right: (q) => { const c = tachMuiTen(/: (.+?), mũi tên/.exec(q.q)[1]); assert.ok(laThucAn(c, "ốc", "vịt")); return "Ốc là thức ăn của vịt"; } },
  { id: S.pool, has: "Dế ăn lá cỏ, gà bắt dế để ăn", right: (q) => {
    const c = xepChuoi(quanHe(q.q.split(".")[0]).map(([a, b]) => [a.replace("lá cỏ", "cỏ"), b])); return c.map((x) => x[0].toUpperCase() + x.slice(1)).join(" → "); } },
  { id: S.pool, has: "Sắp xếp các sinh vật thành một chuỗi thức ăn", right: (q) => {
    const c = xepChuoi(quanHe(q.q.split(":")[1].split(". Sắp xếp")[0])); return c.map((x) => q.o.find((o) => o.toLowerCase() === x)); } },
  { id: S.de1, has: "Cây củ mài → ? → Hổ", right: (q) => { assert.ok(q.x.includes("Cây củ mài → Lợn rừng → Hổ")); return "Lợn rừng"; } },
  { id: S.de2, has: "Chuỗi thức ăn nào dưới đây đúng với thực tế ở một khu rừng", right: thucTe },
  { id: S.de2, has: "Nếu các tổ kiến vàng trong vườn bị phá hết", right: (q) => { // mất con vật ăn thịt: con mồi tăng, thức ăn của con mồi bị hại
    const ch = xepChuoi(docSoDo(q.svg)), i = ch.indexOf("Kiến vàng"); assert.ok(i >= 2, "kiến vàng ăn một con vật ăn lá cây");
    return `${ch[i - 1]} tăng lên, ${ch[i - 2].toLowerCase()} bị hại nhiều hơn`; } }
];

const p = bank(S.pool), d1 = bank(S.de1), d2 = bank(S.de2);
assert.ok(p && d1 && d2, "thiếu đề");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "from là Đề 1 và Đề 2");
assert.ok(d1.minutes === 35 && d2.minutes === 35 && p.minutes === 35, "35 phút");
assert.equal(d1.questions.length, 25); assert.equal(d2.questions.length, 25);
const kho = p.questions;
assert.equal(kho.length, 75, "kho 75 câu: 50 câu của hai đề, 25 câu riêng");
let n = 0;
const checked = new Set();
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.q.includes(c.has));
  assert.equal(m.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${m.length}`);
  const q = m[0], at = c.id + ": " + c.has;
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  const want = c.right(q), got = q.type === "fill" ? q.ans[0] : q.type === "num" ? q.ans : q.type === "order" ? q.o : q.o[0];
  if (Array.isArray(want)) assert.deepEqual(got, want, at + ": thứ tự " + JSON.stringify(got) + ", xếp được " + JSON.stringify(want));
  else assert.ok(typeof want === "number" ? typeof got === "number" && close(got, want) : got === want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), at + ": nhiễu trùng đáp án đúng");
  checked.add(q); n++;
});
// ý đúng/sai 4 ý về các quan hệ thức ăn trong đề: “A là thức ăn của B.”, “A có mặt trong N chuỗi thức ăn.”, “Mỗi chuỗi … đều có N
// sinh vật.”; chuỗi là mọi đường đi từ sinh vật không ăn ai đến sinh vật không bị ai ăn
kho.filter((q) => q.type === "tf4" && q.topic === "Chuỗi thức ăn").forEach((q) => {
  const canh = quanHe(q.q.split(". Mỗi ý")[0]), cs = chuoiTu(canh);
  assert.ok(canh.length >= 3 && cs.length >= 2, "đề bài có các quan hệ thức ăn tạo thành nhiều chuỗi");
  q.o.forEach((o, i) => {
    let m = /^(.+?) là thức ăn của (.+?)\.$/.exec(o), v;
    if (m) v = canh.some((c) => c[0] === m[1].toLowerCase() && c[1] === m[2].toLowerCase());
    else if ((m = /^(.+?) có mặt trong (\p{L}+) chuỗi thức ăn\.$/u.exec(o))) v = cs.filter((c) => c.includes(m[1].toLowerCase())).length === SO.indexOf(m[2]);
    else if ((m = /^Mỗi chuỗi thức ăn .* đều có (\p{L}+) sinh vật\.$/u.exec(o))) v = cs.every((c) => c.length === SO.indexOf(m[1]));
    assert.ok(v !== undefined, "đọc được ý: " + o); assert.equal(q.a[i], v, `“${o}” với các chuỗi ${cs.map((c) => c.join(" → ")).join("; ")}`); n++;
  });
  cs.forEach((c) => assert.ok(q.x.toLowerCase().includes(c.join(" → ").replace(/^hoa/, "cây hoa")), "lời giải ghi chuỗi " + c.join(" → ")));
  checked.add(q);
});
// câu trả lời bằng số, câu có hình, câu chuỗi thức ăn viết bằng mũi tên hay quan hệ ăn nào cũng phải có kiểm tra ở trên
kho.filter((q) => q.type === "num" || q.svg || (q.topic === "Chuỗi thức ăn" && /→| ăn | bắt /.test(q.q))).forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + q.q.slice(0, 60)));
assert.equal(kho.filter((q) => q.svg).length, 5, "năm câu có hình (cây nấm, tháp dinh dưỡng, ba sơ đồ chuỗi thức ăn)");

/* ---------- mức độ và ma trận ---------- */
const M = p.pool.matrix, cells = Object.values(M);
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.deepEqual(Object.keys(M).map((t) => sum(M[t])), [2, 2, 3, 3, 3, 2, 2, 2, 3, 3], "Nấm 7 câu, Con người và sức khoẻ 12, Sinh vật và môi trường 6");
[d1.questions, d2.questions].forEach((d, i) => {
  assert.deepEqual([...new Set(d.map((q) => q.topic))], Object.keys(M), `Đề ${i + 1} đủ chủ đề, theo thứ tự của ma trận`);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `Đề ${i + 1} đúng ma trận ở chủ đề ${t}`));
});
Object.entries(M).forEach(([t, v]) => [1, 2, 3].forEach((l) => {
  const o = kho.filter((q) => q.topic === t && q.lv === l);
  assert.deepEqual(o.map((q) => q.src).sort(), v[l - 1] ? [S.de1, S.de2, S.pool].sort() : [], `ô (${t}, mức ${l}): một câu ở mỗi đề, một câu riêng`);
}));
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 4 && !kho.some((q) => q.type === "essay"), "ít nhất 4 câu đúng/sai 4 ý, không có câu tự luận");
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.ok(Math.max(...Object.values(kieu)) <= Math.ceil(tf4.length / 3), "kiểu Đ/S của các câu đúng/sai 4 ý lặp nhiều quá: " + JSON.stringify(kieu));
["match", "order", "fill", "num", "tf", "tf4"].forEach((t) => assert.ok(kho.some((q) => q.type === t), "kho có câu dạng " + t));
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2; ngưỡng như tests/lsdl-gdcd6-ck2.js)
kho.filter((q) => q.type === "mc").forEach((q) => { const m = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + q.q.slice(0, 60)); });
// nối cột: mỗi ô bên phải chỉ một ô bên trái (không có ô phải trùng nhau), có ô thừa
kho.filter((q) => q.type === "match").forEach((q) => { assert.equal(new Set(q.r).size, q.r.length); assert.ok(q.r.length === q.l.length + 1, "nối cột có một ô thừa"); });
const seen = new Set();
for (let k = 0; k < 400; k++) {
  const d = Quiz.draw(p);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, 25);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d.questions, t, l)), v, `rút đúng ma trận ở chủ đề ${t}`));
  d.questions.forEach((q) => seen.add(Quiz.key(q)));
}
assert.equal(seen.size, 75, "400 lần rút thử phải gặp đủ 75 câu của kho");
// học sinh đã làm hết một đề cố định (đúng cả) thì đề ngẫu nhiên không rút lại câu của đề đó; làm hết cả hai đề thì rút đúng 25 câu riêng
[[S.de1], [S.de2], [S.de1, S.de2]].forEach((lam) => {
  const hist = (q) => (lam.includes(q.src) ? { done: 1, wrong: 0 } : null);
  for (let k = 0; k < 30; k++) {
    const d = Quiz.draw(p, hist);
    assert.equal(d.notes.length, 0); assert.equal(d.questions.length, 25);
    assert.ok(d.questions.every((q) => !lam.includes(q.src)), `đã làm hết ${lam.join(", ")} thì không rút lại câu của các đề đó`);
  }
});

/* ---------- đề bài không trùng câu nào khác trong file (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
{
  const deBai = BANKS.filter((b) => b.file === "4-khoahoc.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q) })));
  deBai.filter((d) => /-ck2-/.test(d.at)).forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
}

/* ---------- dò lộ đáp án (Rút ra N5) giữa hai câu rút được cùng lúc: khác ô (chủ đề, mức); mọi ô của kho này rút 1 câu, và mỗi đề
   cố định có một câu mỗi ô, nên hai câu cùng ô không bao giờ cùng một đề. Số (từ hai chữ số) chỉ tìm ở vị trí kết quả của câu kia;
   cặp nối: câu kia có cả hai vế; câu sắp xếp: câu kia có cả chuỗi (“A → B → C”). Lựa chọn đúng, đáp án điền có ở câu kia thì in ra
   với DO_LO=1, danh sách đã xem ở DA_XEM. ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || []).map(String);
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
const coCum = (t, s) => { for (let i = t.indexOf(s); i >= 0; i = t.indexOf(s, i + 1)) if (!/[\p{L}\p{N}]/u.test(t[i - 1] || " ") && !/[\p{L}\p{N}]/u.test(t[i + s.length] || " ")) return true; return false; };
const doLo = (qs, tenCau) => {
  const lo = [], chuLo = [];
  qs.forEach((q, i) => {
    const so = q.type === "num" && q.ans >= 10 ? [q.ans] : [];
    const cum = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? q.ans : [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const xep = q.type === "order" ? [q.o.join(" → ").toLowerCase()] : [];
    qs.forEach((p2, j) => {
      if (j === i || (p2.topic === q.topic && p2.lv === q.lv)) return;
      const C = chu(p2), T = C.map((s) => s.toLowerCase()), at = `${tenCau(p2)} → ${tenCau(q)}: `;
      so.filter((x) => C.flatMap(soKQ).some((y) => close(x, y))).forEach((x) => lo.push(at + x));
      cap.filter(([l, r]) => T.some((t) => coCum(t, l.toLowerCase()) && coCum(t, r.toLowerCase()))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      xep.filter((s) => T.some((t) => t.includes(s))).forEach((s) => lo.push(at + s));
      cum.filter((s) => T.some((t) => coCum(t, s.toLowerCase()))).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("khoahoc4-ck2-", "") + "#" + (i + 1))));
const r = doLo(kho, (q) => ten.get(q));
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + r.chuLo.join("\n"));
// đã xem (Phiên N16): các câu kia chỉ nhắc tên chất, tên bệnh, không cho biết điều câu này hỏi. “Chất đạm” ở các câu nước ngọt, canh
// ngao, xúc xích, hạt điều, bữa trưa của Phương không nói vai trò giúp cơ thể lớn lên, cao thêm; câu dấu hiệu béo phì và câu nối dấu
// hiệu chỉ có tên bệnh, câu của Khang hỏi theo thói quen ăn uống, vận động.
const DA_XEM = [
  "ngau-nhien#9 → de1#8: Chất đạm", "ngau-nhien#10 → de1#8: Chất đạm", "ngau-nhien#12 → de1#8: Chất đạm", "de2#9 → de1#8: Chất đạm", "de2#10 → de1#8: Chất đạm",
  "de1#14 → de1#15: Thừa cân béo phì", "de2#14 → de1#15: Thừa cân béo phì"
];
assert.deepEqual(r.chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(r.lo, [], "lộ đáp án:\n" + r.lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 300”, cả hai vế một cặp nối, cả chuỗi của câu sắp xếp, lựa chọn đúng
const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
const thu = (qs) => { const k = doLo(qs, (q) => q.q.slice(0, 12)); return k.lo.concat(k.chuLo).map((s) => s.replace(/^.*: /, "")); };
const khac = tim("Nơi nào dưới đây an toàn để tập bơi");
assert.deepEqual(thu([tim("Lan cần uống thêm"), gia(khac, "Ví dụ: 1 300 − 1 000 = 300.")]), ["300"]);
assert.deepEqual(thu([tim("Nối mỗi bệnh với dấu hiệu"), gia(khac, "Bạn suy dinh dưỡng thấp còi thường thấp và nhẹ cân hơn hẳn các bạn cùng tuổi.")]), ["Suy dinh dưỡng thấp còi → Thấp và nhẹ cân hơn hẳn các bạn cùng tuổi"]);
assert.deepEqual(thu([tim("Sắp xếp các sinh vật thành"), gia(khac, "Ví dụ: Tảo → Cá mè → Cá quả → Chim cốc.")]), ["tảo → cá mè → cá quả → chim cốc"]);
assert.deepEqual(thu([tim("Nhóm nào dưới đây gồm toàn nấm ăn"), gia(khac, "Nấm rơm, nấm sò, mộc nhĩ đều ăn được.")]), ["Nấm rơm, nấm sò, mộc nhĩ"]);

/* ---------- không chép sách: so với chữ OCR của Khoa học 4 (bỏ dấu), nếu có OnUp-Book ---------- */
const SACH = path.join(__dirname, "../../OnUp-Book/lop-4/khoa-hoc-4/chu.txt");
// bỏ dấu và gộp các nguyên âm (chữ OCR của cuốn này hay đọc nhầm nguyên âm: “chốt” thay cho “chất”)
const khongDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
if (fs.existsSync(SACH)) {
  const sach = " " + khongDau(fs.readFileSync(SACH, "utf8").replace(/=== page-\d+ · trang in \d+ ===/g, " ")) + " ";
  const trung = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k).join(" "); if (sach.includes(" " + c + " ")) ra.push(c); } return ra; };
  const bao = (k) => kho.flatMap((q) => chu(q).flatMap((s) => trung(s, k).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của sách Khoa học 4 (OnUp-Book).");
} else console.log("Không có ../OnUp-Book/lop-4/khoa-hoc-4/chu.txt: bỏ qua bước so với chữ của sách.");
console.log(n, "câu, ý đã tính lại hoặc đọc lại hình; kho " + kho.length + " câu, ma trận 10 – 8 – 7 trên " + Object.keys(M).length + " chủ đề.");
console.log("MATH OK");
