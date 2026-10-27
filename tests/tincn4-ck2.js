// Kiểm tra ngân hàng Tin học và Công nghệ 4 cuối năm của Phiên N17 (data/banks/4-tincn.js, tincn4-ck2-*), theo mẫu tests/khoahoc4-ck2.js.
// Kho = Đề 1 + Đề 2 (25 câu mỗi đề, chia đúng ma trận, không có câu riêng); mỗi ô (chủ đề, mức) có đúng 2 câu, một ở mỗi đề. Câu có
// hình, có phép tính, câu xoá chữ, câu gõ chữ hoa và câu sắp xếp các lệnh được nhận ra bằng một đoạn chữ của đề (has, đúng một câu
// trong kho, đúng đề ghi ở id) và tính lại đáp án bằng code: điền khuyết ans[0], trả lời bằng số ans, trắc nghiệm o[0], sắp xếp o.
// Hình đọc lại từ chuỗi SVG: khối lệnh Scratch (docKhoi: mỗi lệnh một hình chữ nhật bo góc tô theo màu nhóm lệnh, xếp liền nhau từ
// trên xuống; lệnh “Khi bấm vào” có lá cờ xanh), rồi chạy thử (chayKhoi: đặt bút, nhấc bút, di chuyển, đợi, nói); thanh thẳng của bộ
// lắp ghép (docThanh: các lỗ tròn cách đều nằm trong thanh). Câu sắp xếp các lệnh: chỉ một thứ tự (trong mọi cách xếp) vẽ đúng đoạn
// thẳng rồi đi tiếp không vẽ như đề bài.
// Rồi kiểm tra mức độ, ma trận (10 Biết, 8 Hiểu, 7 Vận dụng; 13 câu Tin học, 12 câu Công nghệ), kiểu Đ/S của câu đúng/sai 4 ý không
// lặp, đáp án đúng không dài hơn hẳn lựa chọn sai, nối cột không có hai ô phải trùng nhau, đề bài không trùng câu nào khác trong file,
// rút thử nhiều lần (đúng ma trận, gặp đủ 50 câu; đã làm hết một đề cố định thì rút toàn câu của đề kia) và dò lộ đáp án giữa các câu
// rút được cùng lúc (khác ô; bộ dò theo tests/khoahoc4-ck2.js): số ở vị trí kết quả, cặp nối có cả hai vế, chuỗi của câu sắp xếp;
// đáp án bằng chữ có ở câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM.
// Có sách ở ../OnUp-Book (repo riêng tư, mục 4 của docs/KE-HOACH-NOI-DUNG.md) thì so mọi trường chữ của câu với chữ OCR của Tin học 4,
// Công nghệ 4 (và Tin học 5, Công nghệ 5 nếu có) sau khi bỏ dấu, gộp nguyên âm: không có chuỗi 8 từ liền nhau trùng sách; DO_SACH=1
// in cả chuỗi 6 từ để xem tay. So thêm với mọi câu của các kho khác (Rút ra N21): không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 5 từ.
// Chạy: node tests/tincn4-ck2.js → in MATH OK.
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
const S = { de1: "tincn4-ck2-de1", de2: "tincn4-ck2-de2", pool: "tincn4-ck2-ngau-nhien" };

/* ---------- số ---------- */
const close = (x, y) => Math.abs(x - y) < 1e-9;
const sum = (a) => a.reduce((s, v) => s + v, 0);
const val = (s) => +String(s).replace(/\s/g, "").replace(",", "."); // “3 000” → 3000
const vn = (x) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, " "); // 8000 → “8 000”

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const trongHop = (x, y, r, pad = 0) => x >= num(r, "x") - pad && x <= num(r, "x") + num(r, "width") + pad && y >= num(r, "y") - pad && y <= num(r, "y") + num(r, "height") + pad;
const rongChu = (t) => [...t].length * 7.7; // ước bề rộng chữ cỡ 14 (như tests/tin-congnghe6-ck2.js)
const daDoc = new Set(); // hình đã đọc lại bằng code

/* Khối lệnh Scratch: mỗi lệnh một rect bo góc (rx 6) cao 28, xếp liền nhau từ trên xuống ở x = 10 (cách nhau 3), chữ cỡ 14 nằm trong
   rect; màu tô theo nhóm lệnh như màu của Scratch trong sách (Sự kiện vàng, Chuyển động xanh dương, Điều khiển cam, Hiển thị tím, Bút
   vẽ xanh lá). Lệnh “Khi bấm vào” có lá cờ: một line và một polygon tô ok, nằm trong rect, bên phải chữ. Trả về chữ của các lệnh. */
const NHOM = [[/^Khi bấm vào$/, "sun-soft"], [/^di chuyển \d+ bước$/, "acc-soft"], [/^đợi \d+ giây$/, "bad-soft"], [/^nói “.+”$/, "moc-soft"],
  [/^(xoá tất cả|đặt bút|nhấc bút)$/, "ok-soft"]];
const docKhoi = (svg) => {
  daDoc.add(svg);
  const R = tags(svg, "rect").sort((a, b) => num(a, "y") - num(b, "y")), T = texts(svg), co = tags(svg, "polygon"), can = tags(svg, "line");
  assert.equal(T.length, R.length, "mỗi lệnh một dòng chữ");
  const ra = R.map((r, i) => {
    assert.ok(num(r, "x") === 10 && num(r, "height") === 28 && r.rx === "6", "lệnh là hình chữ nhật bo góc ở x = 10, cao 28");
    if (i) assert.equal(num(r, "y"), num(R[i - 1], "y") + 31, "các lệnh xếp liền nhau thành một khối");
    const c = T.filter((t) => trongHop(+t.x, +t.y - 5, r));
    assert.equal(c.length, 1, "mỗi lệnh một dòng chữ"); const t = c[0].t;
    const g = NHOM.find(([re]) => re.test(t)); assert.ok(g, "lệnh lạ: " + t); assert.equal(r.fill, g[1], "màu của lệnh “" + t + "”");
    const coCo = co.filter((p) => pts(p.points).every(([x, y]) => trongHop(x, y, r)));
    if (t === "Khi bấm vào") {
      assert.ok(i === 0, "lệnh Khi bấm vào đứng đầu khối");
      assert.ok(coCo.length === 1 && coCo[0].fill === "ok", "lệnh Khi bấm vào có lá cờ xanh");
      const x0 = Math.min(...pts(coCo[0].points).map((p) => p[0])), cot = can.filter((l) => l.stroke === "ok" && close(num(l, "x1"), x0) && close(num(l, "x2"), x0) && trongHop(x0, num(l, "y1"), r) && trongHop(x0, num(l, "y2"), r));
      assert.equal(cot.length, 1, "lá cờ có cán"); assert.ok(+c[0].x + rongChu(t) <= x0 && Math.max(...pts(coCo[0].points).map((p) => p[0])) <= num(r, "x") + num(r, "width") - 4, "lá cờ ở bên phải chữ, trong lệnh");
    } else { assert.equal(coCo.length, 0, "chỉ lệnh Khi bấm vào có lá cờ"); assert.ok(rongChu(t) + 10 <= num(r, "width"), `chữ “${t}” rộng quá lệnh`); }
    assert.ok(num(r, "x") + num(r, "width") <= 316, "lệnh nằm trong khung");
    return t;
  });
  assert.equal(co.length, 1, "hình chỉ có một lá cờ"); assert.equal(can.length, 1, "hình chỉ có một cán cờ");
  assert.equal(ra[0], "Khi bấm vào", "khối lệnh bắt đầu bằng Khi bấm vào");
  return ra;
};
/* Chạy khối lệnh (nhân vật đi theo một đường thẳng): trả về các việc nhân vật làm lần lượt và tổng số bước có nét vẽ. */
const chayKhoi = (list) => {
  let but = false, ve = 0, m; const viec = [];
  list.forEach((t) => {
    if (/^Khi bấm vào/.test(t)) return;
    if (t === "đặt bút") but = true; else if (t === "nhấc bút") but = false; else if (t === "xoá tất cả") viec.push("xoá nét vẽ");
    else if ((m = /^di chuyển (\d+) bước$/.exec(t))) { viec.push((but ? "vẽ " : "đi ") + m[1]); if (but) ve += +m[1]; }
    else if ((m = /^đợi (\d+) giây$/.exec(t))) viec.push("đứng yên " + m[1]);
    else if ((m = /^nói “(.+)”$/.exec(t))) viec.push("nói " + m[1]);
    else assert.fail("lệnh chưa chạy được: " + t);
  });
  return { viec, ve };
};
/* Thanh thẳng của bộ lắp ghép: một rect bo tròn hai đầu (rx bằng nửa chiều cao), các lỗ là circle cùng cỡ, cùng hàng, cách đều nhau,
   nằm trọn trong thanh. Trả về số lỗ. */
const docThanh = (svg) => {
  daDoc.add(svg);
  const R = tags(svg, "rect"), L = tags(svg, "circle");
  assert.equal(R.length, 1, "hình có một thanh"); const r = R[0];
  assert.equal(num(r, "rx") * 2, num(r, "height"), "thanh bo tròn hai đầu");
  assert.ok(L.length >= 2 && L.every((c) => c.r === L[0].r && c.cy === L[0].cy), "các lỗ cùng cỡ, cùng một hàng");
  const xs = L.map((c) => num(c, "cx")).sort((a, b) => a - b), buoc = xs[1] - xs[0];
  xs.forEach((x, i) => { if (i) assert.ok(close(x - xs[i - 1], buoc), "các lỗ cách đều nhau"); });
  L.forEach((c) => assert.ok(trongHop(num(c, "cx") - num(c, "r"), num(c, "cy") - num(c, "r"), r) && trongHop(num(c, "cx") + num(c, "r"), num(c, "cy") + num(c, "r"), r), "lỗ nằm trong thanh"));
  assert.ok(close(xs[0] - num(r, "x"), num(r, "x") + num(r, "width") - xs[xs.length - 1]), "hai đầu thanh cách lỗ ngoài cùng bằng nhau");
  return L.length;
};
const hoanVi = (a) => (a.length <= 1 ? [a] : a.flatMap((x, i) => hoanVi(a.slice(0, i).concat(a.slice(i + 1))).map((p) => [x].concat(p))));
const SO_CHU = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mười", "mười một"];

const CHECKS = [
  { id: S.de1, has: "Ngay sau khi đi 50 bước, chú mèo làm gì?", right: (q) => {
    const k = docKhoi(q.svg), v = chayKhoi(k).viec, i = v.indexOf("đi 50");
    assert.ok(i >= 0 && i + 2 < v.length, "khối lệnh có lệnh di chuyển 50 bước và hai lệnh sau nó");
    assert.ok(q.o.includes("Đi tiếp " + v[i + 2].replace("đi ", "") + " bước"), "một lựa chọn sai là việc làm sau đó nữa");
    assert.ok(q.o.some((o) => o.startsWith("Nói “" + v[v.length - 1].replace("nói ", ""))), "một lựa chọn sai là lời nói ở cuối khối");
    const m = /^đứng yên (\d+)$/.exec(v[i + 1]); assert.ok(m, "ngay sau đó là lệnh đợi"); return "Đứng yên " + m[1] + " giây"; } },
  { id: S.de1, has: "Nét vẽ mèo để lại trên sân khấu dài tất cả bao nhiêu bước?", right: (q) => {
    const k = docKhoi(q.svg), r = chayKhoi(k), ve = r.viec.filter((v) => /^vẽ /.test(v)).map((v) => +v.slice(3)), di = r.viec.filter((v) => /^đi /.test(v));
    assert.ok(ve.length === 2 && di.length >= 1, "có hai đoạn vẽ và ít nhất một đoạn đi không vẽ");
    assert.ok(q.x.includes(`${ve[0]} + ${ve[1]} = ${r.ve}`), "lời giải cộng hai đoạn vẽ");
    di.forEach((d) => assert.ok(q.x.includes(d.slice(3) + " bước nhưng không vẽ"), "lời giải nói đoạn đi không vẽ"));
    return r.ve; } },
  { id: S.de2, has: "Sắp xếp các lệnh để khi nháy lá cờ xanh, chú mèo vẽ một đoạn thẳng", right: (q) => {
    const m = /dài (\d+) bước rồi đi tiếp (\d+) bước mà không vẽ/.exec(q.q), muon = ["vẽ " + m[1], "đi " + m[2]];
    const dung = (p) => /^Khi bấm vào/.test(p[0]) && JSON.stringify(chayKhoi(p).viec) === JSON.stringify(muon);
    const cach = hoanVi(q.o).filter(dung);
    assert.equal(cach.length, 1, "chỉ một thứ tự lệnh vẽ đúng như đề bài"); return cach[0]; } },
  { id: S.de1, has: "Đó là chi tiết nào?", right: (q) => {
    const n = docThanh(q.svg); assert.ok(q.o.slice(1).every((o) => !o.includes(" " + n + " ")), "lựa chọn sai không có số lỗ đúng");
    assert.ok(q.x.includes("đếm được " + n + " lỗ")); return `Thanh thẳng ${n} lỗ`; } },
  { id: S.de1, has: "Lan cần bao nhiêu tiền để mua giấy?", right: (q) => {
    const c = +/làm (\d+) chiếc/.exec(q.q)[1], bia = val(/giấy bìa màu giá ([\d ]+) đồng/.exec(q.q)[1]), m = /(\d+) tờ giấy màu thủ công để trang trí, mỗi tờ ([\d ]+) đồng/.exec(q.q);
    const mot = bia + m[1] * val(m[2]);
    assert.ok(q.x.includes(`${vn(bia)} + ${m[1]} × ${vn(val(m[2]))} = ${vn(mot)} đồng`) && q.x.includes(`${c} × ${vn(mot)} = ${vn(c * mot)} đồng`), "lời giải tính từng chiếc rồi cả hai chiếc");
    return c * mot; } },
  { id: S.de2, has: "Tú cần tất cả bao nhiêu vòng hãm?", right: (q) => {
    const m = /có (\d+) trục, mỗi trục lắp (\d+) bánh xe, mỗi bánh xe có (\d+) vòng hãm/.exec(q.q), t = +/nên lắp (\d+) trục như thế/.exec(q.q)[1];
    const moi = m[2] * m[3]; assert.ok(q.x.includes(`${m[2]} × ${m[3]} = ${moi}`) && q.x.includes(`${t} × ${moi} = ${t * moi}`));
    return t * moi; } },
  { id: S.de1, has: "Nhấn phím nào một lần để xoá đúng chữ e thừa?", right: (q) => { // “mèeo”, con trỏ giữa chữ e thừa và chữ o
    const go = /“(.+?)”/.exec(q.q)[1], dung = "con mèo", i = go.indexOf("eo") + 1; // vị trí con trỏ: ngay trước chữ o
    const kq = { Backspace: go.slice(0, i - 1) + go.slice(i), Delete: go.slice(0, i) + go.slice(i + 1) };
    assert.equal(kq.Delete === dung, false, "Delete không cho chữ đúng");
    return Object.keys(kq).find((k) => kq[k] === dung); } },
  { id: S.de1, has: "Bạn muốn gõ chữ hoa A. Cách gõ nào đúng?", right: (q) => { // phím do tay trái gõ thì tay phải giữ Shift, và ngược lại
    const tay = /ngón (\S+) tay (trái|phải) gõ phím A/.exec(q.q), kia = tay[2] === "trái" ? "phải" : "trái";
    return `Ngón út tay ${kia} giữ Shift bên ${kia}, ngón ${tay[1]} tay ${tay[2]} gõ A`; } },
  { id: S.de1, has: "nó cứ nghiêng hẳn về bên cánh trái", right: (q) => { // bên nghiêng là bên nặng hơn: thêm đất nặn ở cánh bên kia
    assert.ok(q.x.includes("bên trái nặng hơn")); return "Gắn thêm một chút đất nặn vào đầu cánh phải"; } }
];

const p = bank(S.pool), d1 = bank(S.de1), d2 = bank(S.de2);
assert.ok(p && d1 && d2, "thiếu đề");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "from là Đề 1 và Đề 2");
assert.ok(d1.minutes === 35 && d2.minutes === 35 && p.minutes === 35, "35 phút");
assert.equal(d1.questions.length, 25); assert.equal(d2.questions.length, 25);
const kho = p.questions;
assert.equal(kho.length, 50, "kho 50 câu của hai đề, không có câu riêng");
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
// câu trả lời bằng số, câu có hình, câu sắp xếp các lệnh Scratch nào cũng phải có kiểm tra ở trên
kho.filter((q) => q.type === "num" || q.svg || (q.type === "order" && q.o.some((o) => /^(đặt bút|nhấc bút|di chuyển)/.test(o)))).forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + q.q.slice(0, 60)));
assert.equal(kho.filter((q) => q.svg).length, 3, "ba câu có hình (hai khối lệnh Scratch, một thanh thẳng)");
kho.filter((q) => q.svg).forEach((q) => { const r = Quiz.svg(q.svg); assert.ok(r && !(r.problems || []).length, "bộ lọc hình bỏ bớt: " + q.q.slice(0, 40)); });

/* ---------- mức độ và ma trận ---------- */
const M = p.pool.matrix, cells = Object.values(M);
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
const phan = (pre) => sum(Object.keys(M).filter((t) => t.startsWith(pre)).map((t) => sum(M[t])));
assert.deepEqual([phan("Tin học · "), phan("Công nghệ · ")], [13, 12], "13 câu Tin học, 12 câu Công nghệ như đề cuối kì I");
assert.ok(Object.keys(M).every((t) => /^(Tin học|Công nghệ) · /.test(t)), "chủ đề có tiền tố Tin học · hoặc Công nghệ ·");
assert.ok(Object.keys(M).filter((t) => t.startsWith("Công nghệ · ")).every((t) => sum(M[t]) === 2), "mỗi bài Công nghệ 2 câu");
[d1.questions, d2.questions].forEach((d, i) => {
  assert.deepEqual([...new Set(d.map((q) => q.topic))], Object.keys(M), `Đề ${i + 1} đủ chủ đề, theo thứ tự của ma trận`);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `Đề ${i + 1} đúng ma trận ở chủ đề ${t}`));
});
Object.entries(M).forEach(([t, v]) => [1, 2, 3].forEach((l) => {
  const o = kho.filter((q) => q.topic === t && q.lv === l);
  assert.deepEqual(o.map((q) => q.src).sort(), v[l - 1] ? [S.de1, S.de2] : [], `ô (${t}, mức ${l}): một câu ở mỗi đề`);
}));
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 3 && !kho.some((q) => q.type === "essay"), "ít nhất 3 câu đúng/sai 4 ý, không có câu tự luận");
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.ok(Math.max(...Object.values(kieu)) === 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
["match", "order", "fill", "num", "tf", "tf4"].forEach((t) => assert.ok(kho.some((q) => q.type === t), "kho có câu dạng " + t));
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2; ngưỡng như tests/lsdl-gdcd6-ck2.js)
kho.filter((q) => q.type === "mc").forEach((q) => { const m = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + q.q.slice(0, 60)); });
// nối cột: mỗi ô bên phải chỉ một ô bên trái (không có ô phải trùng nhau); câu sắp xếp có ít nhất 4 ô
kho.filter((q) => q.type === "match").forEach((q) => assert.equal(new Set(q.r).size, q.r.length));
kho.filter((q) => q.type === "order").forEach((q) => assert.ok(q.o.length >= 4 && new Set(q.o).size === q.o.length, "câu sắp xếp có ít nhất 4 ô khác nhau"));
// chữ của sách: Scratch “lá cờ xanh”, Word “bảng chọn File”, “dải lệnh”; không dùng tên nhân vật của sách Tin học 4 (An, Minh, Khoa)
kho.forEach((q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || []).forEach((s) => assert.ok(!/\b(An|Minh|Khoa)\b/u.test(s.replace(/[“”]/g, " ")) || /Minh hoạ/.test(s), "tên nhân vật của sách: " + s)));
const seen = new Set();
for (let k = 0; k < 400; k++) {
  const d = Quiz.draw(p);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, 25);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d.questions, t, l)), v, `rút đúng ma trận ở chủ đề ${t}`));
  d.questions.forEach((q) => seen.add(Quiz.key(q)));
}
assert.equal(seen.size, 50, "400 lần rút thử phải gặp đủ 50 câu của kho");
// học sinh đã làm hết một đề cố định (đúng cả) thì đề ngẫu nhiên rút toàn câu của đề kia (Rút ra N12)
[[S.de1, S.de2], [S.de2, S.de1]].forEach(([lam, con]) => {
  const hist = (q) => (q.src === lam ? { done: 1, wrong: 0 } : null);
  for (let k = 0; k < 30; k++) {
    const d = Quiz.draw(p, hist);
    assert.equal(d.notes.length, 0); assert.equal(d.questions.length, 25);
    assert.ok(d.questions.every((q) => q.src === con), `đã làm hết ${lam} thì rút toàn câu của ${con}`);
  }
});

/* ---------- đề bài không trùng câu nào khác trong file (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
{
  const deBai = BANKS.filter((b) => b.file === "4-tincn.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q) })));
  deBai.filter((d) => /-ck2-/.test(d.at)).forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
}

/* ---------- dò lộ đáp án (Rút ra N5) giữa hai câu rút được cùng lúc: khác ô (chủ đề, mức); mọi ô của kho này rút 1 câu, và mỗi đề
   cố định có một câu mỗi ô, nên hai câu cùng ô không bao giờ cùng một đề. Số (từ hai chữ số) chỉ tìm ở vị trí kết quả của câu kia;
   cặp nối: câu kia có cả hai vế; câu sắp xếp: câu kia có cả chuỗi (“A → B → C”). Lựa chọn đúng, đáp án điền có ở câu kia thì in ra
   với DO_LO=1, danh sách đã xem ở DA_XEM. ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || []).map(String);
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,]| \d)/gu)].map((m) => val(m[1]));
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
      so.filter((x) => C.flatMap(soKQ).some((y) => close(x, y)) || C.some((s) => coCum(s, vn(x)))).forEach((x) => lo.push(at + x));
      cap.filter(([l, r]) => T.some((t) => coCum(t, l.toLowerCase()) && coCum(t, r.toLowerCase()))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      xep.filter((s) => T.some((t) => t.includes(s))).forEach((s) => lo.push(at + s));
      cum.filter((s) => T.some((t) => coCum(t, s.toLowerCase()))).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const ten = new Map();
[S.de1, S.de2].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("tincn4-ck2-", "") + "#" + (i + 1))));
const r = doLo(kho, (q) => ten.get(q));
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + r.chuLo.join("\n"));
// đã xem (Phiên N17): (chưa có)
const DA_XEM = [];
assert.deepEqual(r.chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(r.lo, [], "lộ đáp án:\n" + r.lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “là 110”, cả hai vế một cặp nối, cả chuỗi của câu sắp xếp, lựa chọn đúng
const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
const thu = (qs) => { const k = doLo(qs, (q) => q.q.slice(0, 12)); return k.lo.concat(k.chuLo).map((s) => s.replace(/^.*: /, "")); };
const khac = tim("Tò he là đồ chơi dân gian");
assert.deepEqual(thu([tim("Nét vẽ mèo để lại"), gia(khac, "Ví dụ: nét vẽ dài là 110 bước.")]), ["110"]);
assert.deepEqual(thu([tim("Nối mỗi chi tiết của bộ lắp ghép"), gia(khac, "Bánh xe thuộc nhóm chi tiết chuyển động.")]), ["Bánh xe → Nhóm chi tiết chuyển động"]);
assert.deepEqual(thu([tim("Sắp xếp các việc Thảo làm"), gia(khac, "Các bước: Gấp đôi tờ giấy bìa màu, kẻ các đường song song → cắt theo các đường kẻ rồi mở tờ giấy ra → dán hai mép tờ giấy lại thành lồng đèn → gắn quai xách lên phía trên lồng đèn.")]), ["gấp đôi tờ giấy bìa màu, kẻ các đường song song → cắt theo các đường kẻ rồi mở tờ giấy ra → dán hai mép tờ giấy lại thành lồng đèn → gắn quai xách lên phía trên lồng đèn"]);
assert.deepEqual(thu([tim("nhìn màu của một lệnh"), gia(khac, "Màu cho biết lệnh đó thuộc nhóm lệnh nào.")]), ["Lệnh đó thuộc nhóm lệnh nào"]);

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = ["lop-4/tin-hoc-4", "lop-4/cong-nghe-4", "lop-5/tin-hoc-5", "lop-5/cong-nghe-5"].map((c) => path.join(BOOK, c, "chu.txt")).filter((f) => fs.existsSync(f));
const khongDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
if (SACH.length) {
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · trang in \d+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => chu(q).flatMap((s) => chuoi(s, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.map((f) => path.basename(path.dirname(f))).join(", ") + " (OnUp-Book).");
} else console.log("Không có ../OnUp-Book/lop-4/tin-hoc-4/chu.txt: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi từ liền nhau trùng câu của kho khác ---------- */
{
  const khac = BANKS.filter((b) => !b.pool && !/^tincn4-ck2-/.test(b.id)).flatMap((b) => b.questions.map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại hoặc đọc lại hình; kho " + kho.length + " câu, ma trận 10 – 8 – 7 trên " + Object.keys(M).length + " chủ đề.");
console.log("MATH OK");
