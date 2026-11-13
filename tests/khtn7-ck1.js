// Kiểm tra ngân hàng KHTN 7 cuối kì I của Phiên N7-ck1-khtn (data/banks/7-khtn.js: hai đề cố định khtn7-ck1-de1, khtn7-ck1-de2 và các
// câu riêng của đề ngẫu nhiên khtn7-ck1-ngau-nhien; Khoa học tự nhiên 7, Bài 1–17), theo mẫu tests/khtn9-ck1.js, tests/toan7-ck1.js. Số
// đề, số câu lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7 như mọi kho lớp 7; số câu mỗi phần (Bài 1, Chương I, II, Chương III–V)
// so với lời dặn (note) của đề.
// Câu có phép tính hoặc có hình được nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong kho, đúng đề ghi ở id); đáp án tính bằng
// code (so với ans, o[0] hoặc a): số hạt trong nguyên tử, khối lượng nguyên tử (số proton cộng số neutron, khớp Bảng 3.1 của sách), vị
// trí trong bảng tuần hoàn (chu kì là số lớp electron, nhóm A là số electron lớp ngoài cùng), kí hiệu và tên nguyên tố, đơn chất và hợp
// chất (đếm nguyên tố trong công thức), khối lượng phân tử, hoá trị và công thức theo quy tắc hoá trị, phần trăm khối lượng (khối lượng
// nguyên tử đề cho khớp sách); tốc độ, quãng đường, thời gian (đổi đơn vị), quy tắc “3 giây”; tần số; góc tới, góc phản xạ; ảnh qua
// gương phẳng. Hình đọc lại: mô hình sắp xếp electron (đếm electron từng lớp, điện tích hạt nhân), ô nguyên tố (khớp Bảng 3.1), đồ thị
// quãng đường – thời gian (đọc số trên hai trục; điểm gãy của đồ thị ở nút lưới), đường biểu diễn dao động (số dao động, biên độ), tia
// sáng tới gương phẳng (góc với pháp tuyến, mũi tên chỉ chiều truyền, cung và số đo góc ghi trong góc), chùm sáng (song song, hội tụ,
// phân kì), ảnh qua gương phẳng trên lưới ô vuông; chữ trong hình cỡ từ 13, nằm trong khung, không đè nhau. Câu trả lời bằng số và câu
// có hình nào cũng phải có kiểm tra ở đây.
// Rồi: chữ (công thức hoá học viết bằng chữ số dưới dòng, tên nguyên tố, tên chất như sách in năm 2026, khối lượng nguyên tử tính bằng
// amu, không “nguyên tử khối”, dấu thanh kiểu cũ như sách “hoá”, “thuỷ”; số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân), mức
// độ và ma trận (17 chủ đề theo tên bài trong mục lục của sách, Bài 11 ghi gọn; hai đề cố định và câu riêng chia đúng ma trận, mỗi ô rút
// 1 câu), dạng câu theo khung Công văn 7991 (mỗi phần ít nhất 4 câu đúng/sai 4 ý, không lặp kiểu Đ/S; trả lời ngắn bằng số), đáp án đúng
// không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba (và không dưới một phần sáu) số câu nhiều
// lựa chọn của mỗi phần, không lặp chữ của nhãn chủ đề, rút thử nhiều lần (đúng ma trận, gặp đủ câu riêng; đã làm hết một đề cố định thì
// không rút lại câu của đề đó), đề bài không trùng câu nào trong data/banks/7-khtn.js, không gần trùng câu của data/banks/6-khtn.js (cặp
// từ liền nhau chung), dò lộ đáp án giữa mọi cặp câu của kho và lời dặn (đề “Ôn chủ đề” rút chung mọi câu của một chủ đề, đề ngẫu nhiên
// rút chung câu của mọi chủ đề khác) và, nếu có ../OnUp-Book, so mọi trường chữ, cả chữ trong hình và lời dặn, với chữ OCR của mọi cuốn
// (không chuỗi 8 từ nào trùng), so số liệu của từng câu với từng trang KHTN 7 (không trang nào có từ ba số hiếm của một câu), so với câu
// của mọi kho khác (không chuỗi 8 từ nào trùng). DA_XEM ghi cả dòng dò lộ của tests/soat-nhap.js đã xem tay. Mô tả script: tests/README.md,
// mục 3, “Lớp 7”.
// Chạy: node tests/khtn7-ck1.js → in MATH OK. DO_LO=1 in đáp án bằng chữ có ở câu khác; DO_SACH=1 in chuỗi 6 từ trùng sách và các trang
// có số liệu chung; DO_KHO=1 in chuỗi 6 từ trùng kho khác, câu gần trùng kho KHTN 6 (để người làm xem).
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
const pool = BANKS.find((b) => b.pool && /^khtn7-ck1-/.test(b.id));
assert.ok(pool, "thiếu đề ngẫu nhiên khtn7-ck1");
assert.equal(pool.pool.from.length, 2, "đề ngẫu nhiên lấy câu của hai đề cố định");
const S = { de1: pool.pool.from[0], de2: pool.pool.from[1], own: pool.id };
assert.deepEqual(BANKS.filter((b) => /^khtn7-ck1-/.test(b.id)).map((b) => b.id).sort(), Object.values(S).sort(), "kho gồm hai đề cố định và đề ngẫu nhiên");
const kho = pool.questions, mine = kho.filter((q) => q.src === S.own), cauCua = (id) => kho.filter((q) => q.src === id);
[S.de1, S.de2].forEach((id) => assert.equal(bank(id).questions.length, bank(id).n, id + ": số câu bằng n của danh mục"));
assert.equal(kho.length, mine.length + bank(S.de1).n + bank(S.de2).n, "kho = câu riêng + câu của hai đề cố định");
assert.equal(mine.length, pool.n, "câu riêng chia đúng ma trận nên có đúng n câu");
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- số ---------- */
const val = (s) => +String(s).replace(/\s/g, "").replace(/−/g, "-").replace(",", "."); // "1 200" → 1200, "4,5" → 4.5
const close = (x, y, e = 1e-9) => Math.abs(x - y) < e;
const tron = (x, k = 2) => Math.round(x * 10 ** k) / 10 ** k;
const vn = (x) => { const [a, b] = String(tron(x, 6)).split("."); return a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); }; // 1500 → "1 500", 0.25 → "0,25"
const RAD = Math.PI / 180;

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">");
  return { x: +a.x, y: +a.y, t: m[2], b: a["font-weight"] === "700", fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start", fill: a.fill || "" }; });
const num = (a, k) => +a[k];
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const ends = (l) => [[num(l, "x1"), num(l, "y1")], [num(l, "x2"), num(l, "y2")]];
const same = (p, q, e = 1e-6) => close(p[0], q[0], e) && close(p[1], q[1], e);
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const huong = (a, b) => { const L = dist(a, b); return [(b[0] - a[0]) / L, (b[1] - a[1]) / L]; };
const cheo = (u, v) => u[0] * v[1] - u[1] * v[0];
// góc (độ) giữa một tia có hướng u và đường thẳng có hướng n (pháp tuyến)
const gocVoi = (u, n) => Math.acos(Math.min(1, Math.abs(u[0] * n[0] + u[1] * n[1]))) / RAD;
// mũi tên tam giác: điểm đầu tiên là đỉnh; mũi tên nằm trên đoạn [a, b] và chỉ theo chiều a → b
const chiTheo = (dau, a, b) => { const u = huong(a, b), [ngon, b1, b2] = dau, giua = [(b1[0] + b2[0]) / 2, (b1[1] + b2[1]) / 2];
  return Math.abs(cheo(u, [ngon[0] - a[0], ngon[1] - a[1]])) < 1 && (ngon[0] - giua[0]) * u[0] + (ngon[1] - giua[1]) * u[1] > 0; };
// ước khung chữ (Noto Sans; chữ đậm rộng hơn), như tests/toan7-ck1.js
const rong = (t) => (t.b ? 0.62 : 0.55) * t.fs * [...t.t].length;
const hopChu = (t) => { const w = rong(t), x0 = t.anchor === "middle" ? t.x - w / 2 : t.anchor === "end" ? t.x - w : t.x; return [x0, t.y - 0.75 * t.fs, x0 + w, t.y + 0.25 * t.fs]; };
const tamChu = (t) => { const h = hopChu(t); return [(h[0] + h[2]) / 2, (h[1] + h[3]) / 2]; };
// mọi chữ trong hình cỡ từ 13 trở lên, nằm trọn trong khung, không đè lên nhau
const chuHinh = (svg, ten) => {
  const v = /viewBox="([^"]+)"/.exec(svg)[1].trim().split(/[\s,]+/).map(Number), T = texts(svg);
  T.forEach((t) => { const h = hopChu(t); assert.ok(t.fs >= 13, ten + ": chữ “" + t.t + "” nhỏ hơn cỡ 13"); assert.ok(h[0] >= v[0] && h[2] <= v[0] + v[2] && h[1] >= v[1] && h[3] <= v[1] + v[3], ten + ": chữ “" + t.t + "” tràn khỏi khung hình"); });
  T.forEach((t, i) => T.slice(i + 1).forEach((u) => { const a = hopChu(t), b = hopChu(u); assert.ok(!(a[0] < b[2] - 1 && b[0] < a[2] - 1 && a[1] < b[3] - 1 && b[1] < a[3] - 1), ten + ": chữ “" + t.t + "” đè lên chữ “" + u.t + "”"); }));
};
// chữ gần điểm p nhất trong các chữ khớp re
const ganNhat = (T, p, re) => { const ds = T.filter((t) => re.test(t.t)); assert.ok(ds.length, "thiếu chữ " + re); return ds.reduce((x, t) => (dist(tamChu(t), p) < dist(tamChu(x), p) ? t : x)).t; };

/* Mô hình sắp xếp electron (như hình của sách): các lớp electron là đường tròn đồng tâm không tô (muted), hạt nhân là hình tròn tô sun-soft
   ở tâm (có thể ghi “+Z”), electron là chấm tròn tô acc nằm trên một lớp. Trả về số electron từng lớp (từ trong ra) và điện tích hạt
   nhân ghi trong hình (không ghi: null). */
const docNguyenTu = (svg) => {
  const C = tags(svg, "circle"), lop = C.filter((c) => c.fill === "none"), nhan = C.filter((c) => c.fill === "sun-soft"), e = C.filter((c) => c.fill === "acc");
  assert.equal(nhan.length, 1, "một hạt nhân");
  const O = [num(nhan[0], "cx"), num(nhan[0], "cy")], tam = (c) => [num(c, "cx"), num(c, "cy")];
  assert.ok(lop.length >= 1 && lop.every((c) => same(tam(c), O)), "các lớp electron đồng tâm với hạt nhân");
  const R = lop.map((c) => num(c, "r")).sort((a, b) => a - b);
  assert.ok(R[0] > num(nhan[0], "r") + 8 && R.every((r, i) => !i || r > R[i - 1] + 12), "các lớp cách nhau, lớp trong cùng nằm ngoài hạt nhân");
  const dem = R.map(() => 0);
  e.forEach((c) => { const k = R.findIndex((r) => Math.abs(r - dist(tam(c), O)) < 1); assert.ok(k >= 0, "electron nằm trên một lớp"); dem[k]++; });
  e.forEach((c, i) => e.slice(i + 1).forEach((d) => assert.ok(dist(tam(c), tam(d)) > 2 * num(c, "r") + 2, "hai electron vẽ chồng lên nhau")));
  assert.ok(dem.every((k) => k > 0), "lớp nào cũng có electron");
  const T = texts(svg).filter((t) => dist([t.x, t.y - 5], O) < num(nhan[0], "r"));
  if (T.length) assert.ok(T.length === 1 && /^\+\d+$/.test(T[0].t), "hạt nhân ghi +Z");
  return { lop: dem, Z: T.length ? +T[0].t.slice(1) : null };
};
/* Ô nguyên tố (như ô mẫu của sách): khung chữ nhật; số hiệu nguyên tử ở góc trên bên trái, kí hiệu hoá học chữ to ở giữa, rồi tên nguyên
   tố, khối lượng nguyên tử. */
const docONguyenTo = (svg) => {
  const r = tags(svg, "rect"); assert.equal(r.length, 1, "một ô nguyên tố");
  const [x, y, w, h] = ["x", "y", "width", "height"].map((k) => num(r[0], k)), T = texts(svg).sort((a, b) => a.y - b.y);
  assert.equal(T.length, 4, "ô ghi số hiệu, kí hiệu, tên, khối lượng nguyên tử");
  T.forEach((t) => { const b = hopChu(t); assert.ok(b[0] >= x && b[2] <= x + w && b[1] >= y && b[3] <= y + h, "chữ “" + t.t + "” nằm trong ô"); });
  const [z, kh, ten, kl] = T;
  assert.ok(z.anchor === "start" && z.x < x + w / 3, "số hiệu nguyên tử ở góc trên bên trái");
  assert.ok(kh.fs > Math.max(z.fs, ten.fs, kl.fs) && [kh, ten, kl].every((t) => t.anchor === "middle" && close(t.x, x + w / 2, 1)), "kí hiệu chữ to ở giữa ô, tên và khối lượng ở dưới");
  assert.ok(/^\d+$/.test(z.t) && /^[A-Z][a-z]?$/.test(kh.t) && /^[a-z]+$/.test(ten.t) && /^\d+(,\d+)?$/.test(kl.t), "chữ trong ô đúng dạng");
  return { Z: +z.t, kh: kh.t, ten: ten.t, kl: val(kl.t) };
};
/* Đồ thị quãng đường – thời gian: trục ngang (thời gian) và trục đứng (quãng đường) màu ink, chung gốc O; lưới màu line; số ghi dưới trục
   ngang và bên trái trục đứng; tên trục “t (đơn vị)”, “s (đơn vị)”. Mỗi đường là một polyline nét 3, có thể ghi tên (chữ đậm cùng màu).
   Đổi toạ độ hình sang giá trị theo các số ghi trên trục (phải cách đều); mọi điểm gãy của đồ thị nằm ở nút lưới (học sinh đọc được),
   đồ thị bắt đầu từ O, đi sang phải, quãng đường không giảm. Trả về đơn vị và các đường [{ ten, p: [[t, s], …] }]. */
const docDoThi = (svg) => {
  const L = tags(svg, "line"), T = texts(svg), truc = L.filter((l) => l.stroke === "ink");
  const ngang = truc.filter((l) => l.y1 === l.y2), dung = truc.filter((l) => l.x1 === l.x2);
  assert.ok(truc.length === 2 && ngang.length === 1 && dung.length === 1, "một trục ngang, một trục đứng");
  const O = [num(ngang[0], "x1"), num(ngang[0], "y1")];
  assert.ok(same(O, [num(dung[0], "x1"), num(dung[0], "y1")]), "hai trục chung gốc O");
  const so = /^\d[\d ]*(,\d+)?$/, sx = T.filter((t) => t.anchor === "middle" && t.y > O[1] && so.test(t.t)), sy = T.filter((t) => t.anchor === "end" && t.x < O[0] && so.test(t.t));
  // toạ độ trong hình làm tròn đến 0,1: so trong khoảng EPS điểm ảnh; giá trị đọc được làm tròn về bội của nửa khoảng cách hai số ghi liền nhau
  const EPS = 0.2;
  const thang = (ds, k) => { // giá trị = a + b · toạ độ; các số ghi cách đều
    assert.ok(ds.length >= 3, "trục có từ 3 số");
    const p = ds.map((t) => [k(t), val(t.t)]).sort((u, v) => u[1] - v[1]), z = p[p.length - 1], b = (z[1] - p[0][1]) / (z[0] - p[0][0]), a = p[0][1] - b * p[0][0];
    const buoc = Math.min(...p.slice(1).map(([, v], i) => v - p[i][1]));
    p.forEach(([x, v], i) => assert.ok(Math.abs((v - a) / b - x) < EPS && (!i || close(v - p[i - 1][1], buoc, 1e-9)), "số ghi trên trục không cách đều"));
    return (x) => tron(Math.round((a + b * x) / (buoc / 2)) * (buoc / 2), 6);
  };
  const tOf = thang(sx, (t) => t.x), sOf = thang(sy, (t) => t.y - 5);
  assert.ok(tOf(O[0]) === 0 && sOf(O[1]) === 0, "gốc O ứng với t = 0, s = 0");
  const tx = T.find((t) => /^t \(.+\)$/.test(t.t)), ty = T.find((t) => /^s \(.+\)$/.test(t.t));
  assert.ok(tx && ty, "ghi tên hai trục t (…), s (…)");
  // nút lưới: giao của đường lưới dọc (hay trục đứng) với đường lưới ngang (hay trục ngang)
  const luoi = L.filter((l) => l.stroke === "line"), doc = [O[0], ...luoi.filter((l) => l.x1 === l.x2).map((l) => num(l, "x1"))], ngangL = [O[1], ...luoi.filter((l) => l.y1 === l.y2).map((l) => num(l, "y1"))];
  const duong = tags(svg, "polyline").filter((p) => p["stroke-width"] === "3").map((p) => {
    const Q = pts(p.points), P = Q.map(([x, y]) => [tOf(x), sOf(y)]);
    Q.forEach(([x, y], i) => assert.ok(doc.some((u) => Math.abs(u - x) < EPS) && ngangL.some((v) => Math.abs(v - y) < EPS), `điểm (${P[i][0]}; ${P[i][1]}) của đồ thị không ở nút lưới`));
    assert.ok(same(P[0], [0, 0]), "đồ thị bắt đầu từ O");
    for (let i = 1; i < P.length; i++) assert.ok(P[i][0] > P[i - 1][0] && P[i][1] >= P[i - 1][1], "đồ thị đi sang phải, quãng đường không giảm");
    const nhan = T.filter((t) => t.b && t.fill === p.stroke && /^[A-Z]$/.test(t.t));
    return { ten: nhan.length === 1 ? nhan[0].t : null, p: P };
  });
  assert.ok(duong.length >= 1, "có đồ thị");
  if (duong.length > 1) assert.equal(new Set(duong.map((d) => d.ten).filter(Boolean)).size, duong.length, "mỗi đường ghi một tên riêng");
  return { dvT: /\((.+)\)/.exec(tx.t)[1], dvS: /\((.+)\)/.exec(ty.t)[1], duong };
};
// quãng đường ở thời điểm t (nội suy trên từng đoạn); thời điểm đầu tiên đạt quãng đường s; các đoạn và tốc độ trên từng đoạn
const sTai = (d, t) => { for (let i = 1; i < d.p.length; i++) { const [a, b] = [d.p[i - 1], d.p[i]]; if (t >= a[0] - 1e-9 && t <= b[0] + 1e-9) return a[1] + ((b[1] - a[1]) * (t - a[0])) / (b[0] - a[0]); } return assert.fail("thời điểm " + t + " ở ngoài đồ thị"); };
const tKhi = (d, s) => { for (let i = 1; i < d.p.length; i++) { const [a, b] = [d.p[i - 1], d.p[i]]; if (b[1] > a[1] && s >= a[1] - 1e-9 && s <= b[1] + 1e-9) return a[0] + ((b[0] - a[0]) * (s - a[1])) / (b[1] - a[1]); } return assert.fail("quãng đường " + s + " ở ngoài đồ thị"); };
const doan = (d) => d.p.slice(1).map((b, i) => ({ t0: d.p[i][0], t1: b[0], s0: d.p[i][1], s1: b[1], v: tron((b[1] - d.p[i][1]) / (b[0] - d.p[i][0]), 6) }));
/* Đường biểu diễn dao động (như màn hình máy dao động kí): mỗi âm một khung chữ nhật, các khung cùng bề rộng (cùng một khoảng thời gian),
   tên âm ghi bên trái; đường dao động là polyline trong khung. Đếm số dao động (số đỉnh), biên độ (độ lệch lớn nhất so với đường giữa). */
const docDaoDong = (svg) => {
  const K = tags(svg, "rect"), P = tags(svg, "polyline").map((l) => pts(l.points)), T = texts(svg);
  assert.ok(K.length >= 2 && P.length === K.length, "mỗi âm một khung, một đường");
  assert.equal(new Set(K.map((k) => k.width)).size, 1, "các khung cùng bề rộng (cùng khoảng thời gian)");
  return K.map((k) => {
    const [x, y, w, h] = ["x", "y", "width", "height"].map((c) => num(k, c)), yc = y + h / 2;
    const p = P.filter((q) => q.every(([a, b]) => a >= x && a <= x + w && b >= y && b <= y + h));
    assert.equal(p.length, 1, "một đường dao động trong khung");
    assert.ok(p[0][0][0] - x < 10 && x + w - p[0][p[0].length - 1][0] < 10, "đường dao động vẽ hết bề rộng khung");
    const v = p[0].map(([, b]) => yc - b), A = Math.max(...v.map(Math.abs));
    let n = 0; for (let i = 1; i + 1 < v.length; i++) if (v[i] > v[i - 1] && v[i] >= v[i + 1] && v[i] > A / 2) n++;
    const ten = T.filter((t) => t.x < x && t.y > y && t.y < y + h);
    assert.equal(ten.length, 1, "tên âm ghi bên trái khung");
    return { ten: ten[0].t, n, A };
  });
};
/* Phản xạ trên gương phẳng: gương là đoạn nằm ngang màu ink nét 3 (mặt sau có vạch chéo), pháp tuyến là đường nét đứt thẳng đứng chạm
   gương tại I, chữ N ở đầu; tia sáng màu bad: tia tới SI đi đến I từ phía trước gương, các tia khác đi ra từ I; mỗi tia một mũi tên chỉ
   chiều truyền; chữ S ở đầu tia tới, chữ (R hay số) ở cuối mỗi tia đi ra. Cung (path) tâm I đánh dấu góc, số đo ghi trong góc, gần cung.
   Trả về góc tới, góc của từng tia đi ra với pháp tuyến và phía của tia (cùng phía tia tới: −1), các góc được đánh dấu. */
const docPhanXa = (svg) => {
  const L = tags(svg, "line"), T = texts(svg), guong = L.filter((l) => l.stroke === "ink" && l["stroke-width"] === "3");
  assert.ok(guong.length === 1 && guong[0].y1 === guong[0].y2, "một gương phẳng nằm ngang");
  const yG = num(guong[0], "y1"), phap = L.filter((l) => l["stroke-dasharray"]);
  assert.ok(phap.length === 1 && phap[0].x1 === phap[0].x2 && Math.max(num(phap[0], "y1"), num(phap[0], "y2")) === yG, "pháp tuyến là đường nét đứt thẳng đứng chạm gương");
  const I = [num(phap[0], "x1"), yG], tia = L.filter((l) => l.stroke === "bad").map(ends);
  assert.ok(num(guong[0], "x1") < I[0] - 40 && num(guong[0], "x2") > I[0] + 40, "I nằm trên gương");
  const den = tia.filter(([a, b]) => same(b, I) && a[1] < yG), di = tia.filter(([a, b]) => same(a, I) && b[1] < yG);
  assert.ok(den.length === 1 && di.length >= 1 && di.length + 1 === tia.length, "một tia tới đi đến I, các tia còn lại đi ra từ I, đều ở trước gương");
  const dau = tags(svg, "polygon").filter((p) => p.fill === "bad").map((p) => pts(p.points));
  assert.equal(dau.length, tia.length, "mỗi tia một mũi tên");
  tia.forEach(([a, b]) => assert.equal(dau.filter((d) => chiTheo(d, a, b)).length, 1, "mũi tên chỉ theo chiều truyền của tia"));
  assert.equal(ganNhat(T, den[0][0], /^[A-Z0-9]$/), "S", "chữ S ở đầu tia tới");
  assert.equal(ganNhat(T, [I[0], Math.min(num(phap[0], "y1"), num(phap[0], "y2"))], /^[A-Z]$/), "N", "chữ N ở đầu pháp tuyến");
  const benS = Math.sign(den[0][0][0] - I[0]), goc = (p) => ({ g: tron(gocVoi(huong(I, p), [0, 1]), 6), ben: Math.sign(p[0] - I[0]) === benS ? -1 : 1 });
  const ra = di.map(([, b]) => Object.assign(goc(b), { ten: ganNhat(T, b, /^[A-Z0-9]$/) }));
  assert.equal(new Set(ra.map((t) => t.ten).concat("S")).size, ra.length + 1, "mỗi tia ghi một tên riêng");
  const duoc = tia.flat().filter((p) => !same(p, I)).map((p) => huong(I, p)).concat([[1, 0], [-1, 0]]);
  const cung = [...svg.matchAll(/<path [^>]*d="M ([\d.]+) ([\d.]+) A ([\d.]+) [\d.]+ 0 0 0 ([\d.]+) ([\d.]+)"/g)].map((m) => {
    const A = [+m[1], +m[2]], B = [+m[4], +m[5]], r = +m[3];
    assert.ok(close(dist(A, I), r, 0.2) && close(dist(B, I), r, 0.2), "cung có tâm I");
    const tren = (P) => { const u = huong(I, P); assert.ok(duoc.some((v) => close(u[0], v[0], 0.01) && close(u[1], v[1], 0.01)), "đầu cung nằm trên một tia hay trên gương"); return u; };
    const u = tren(A), v = tren(B), deg = Math.acos(u[0] * v[0] + u[1] * v[1]) / RAD;
    const nhan = T.filter((t) => /°$/.test(t.t)).filter((t) => { const c = tamChu(t), w = huong(I, c), d = dist(c, I);
      return d > r - 4 && d < r + 40 && Math.acos(w[0] * u[0] + w[1] * u[1]) / RAD < deg && Math.acos(w[0] * v[0] + w[1] * v[1]) / RAD < deg; });
    assert.equal(nhan.length, 1, "số đo ghi trong góc, gần cung");
    return { deg: tron(deg, 6), so: val(nhan[0].t.replace("°", "")) };
  });
  assert.equal(cung.length, T.filter((t) => /°$/.test(t.t)).length, "số đo nào cũng có cung");
  return { i: goc(den[0][0]), ra, cung };
};
/* Ảnh qua gương phẳng trên lưới ô vuông: lưới màu line, gương là đường thẳng đứng màu ink nét 3 trên một đường lưới; vật AB là mũi tên nét
   liền màu acc (đuôi A, đầu B có mũi tên), chữ A, B ở hai đầu; các mũi tên để chọn nét đứt màu muted, ghi số ở đầu mũi tên. Trả về toạ độ
   theo ô (gốc ở góc dưới bên trái lưới) của gương, vật và các mũi tên. */
const docAnhLuoi = (svg) => {
  const L = tags(svg, "line"), T = texts(svg), luoi = L.filter((l) => l.stroke === "line");
  const xs = [...new Set(luoi.filter((l) => l.x1 === l.x2).map((l) => num(l, "x1")))].sort((a, b) => a - b), ys = [...new Set(luoi.filter((l) => l.y1 === l.y2).map((l) => num(l, "y1")))].sort((a, b) => a - b);
  const c = xs[1] - xs[0];
  xs.forEach((x, i) => assert.ok(close(x, xs[0] + i * c, 1e-6), "lưới cách đều")); ys.forEach((y, i) => assert.ok(close(y, ys[0] + i * c, 1e-6), "lưới ô vuông"));
  const U = (x) => tron((x - xs[0]) / c, 6), V = (y) => tron((ys[ys.length - 1] - y) / c, 6);
  const nut = (p) => { const q = [U(p[0]), V(p[1])]; assert.ok(Number.isInteger(q[0]) && Number.isInteger(q[1]), "đầu mũi tên ở nút lưới"); return q; };
  const g = L.filter((l) => l.stroke === "ink" && l["stroke-width"] === "3");
  assert.ok(g.length === 1 && g[0].x1 === g[0].x2 && Number.isInteger(U(num(g[0], "x1"))), "một gương thẳng đứng trên một đường lưới");
  const G = U(num(g[0], "x1"));
  const muiTen = (mau) => L.filter((l) => l.stroke === mau && l["stroke-width"] === "2.5").map((l) => {
    const [a, b] = ends(l), dau = tags(svg, "polygon").filter((p) => p.fill === mau).map((p) => pts(p.points)).filter((d) => same(d[0], b) && chiTheo(d, a, b));
    assert.equal(dau.length, 1, "mũi tên ở đầu B, chỉ theo chiều A → B");
    return { A: nut(a), B: nut(b), dash: !!l["stroke-dasharray"], pA: a, pB: b };
  });
  const vat = muiTen("acc");
  assert.ok(vat.length === 1 && !vat[0].dash, "một vật AB vẽ nét liền");
  assert.equal(ganNhat(T, vat[0].pA, /^[A-Z]$/), "A", "chữ A ở đuôi vật"); assert.equal(ganNhat(T, vat[0].pB, /^[A-Z]$/), "B", "chữ B ở đầu vật");
  const chon = muiTen("muted").map((m) => { assert.ok(m.dash, "mũi tên để chọn vẽ nét đứt"); return { so: ganNhat(T, m.pB, /^\d$/), A: m.A, B: m.B }; });
  assert.equal(new Set(chon.map((m) => m.so)).size, chon.length, "mỗi mũi tên một số");
  assert.ok(vat[0].A[0] < G && vat[0].B[0] < G && chon.every((m) => m.A[0] > G && m.B[0] > G), "vật ở trước gương, các mũi tên ở sau gương");
  return { G, A: vat[0].A, B: vat[0].B, chon };
};
/* Chùm sáng (quy ước của sách): mỗi chùm là hai đường thẳng giới hạn màu acc, mỗi đường một mũi tên chỉ chiều truyền; số thứ tự ghi dưới
   chùm. Loại chùm: song song (hai đường song song), hội tụ (hai đường gần lại nhau theo chiều truyền), phân kì (loe rộng ra). */
const docChum = (svg) => {
  const L = tags(svg, "line").filter((l) => l.stroke === "acc").map(ends), dau = tags(svg, "polygon").filter((p) => p.fill === "acc").map((p) => pts(p.points)), T = texts(svg);
  assert.equal(dau.length, L.length, "mỗi đường một mũi tên");
  const trenDoan = (m, a, b) => (chiTheo(m, a, b) || chiTheo(m, b, a)) && m[0][0] > Math.min(a[0], b[0]) && m[0][0] < Math.max(a[0], b[0]);
  const chieu = L.map(([a, b]) => { const d = dau.filter((m) => trenDoan(m, a, b)); assert.equal(d.length, 1, "mũi tên nằm trên đường"); return chiTheo(d[0], a, b) ? [a, b] : [b, a]; });
  const nhom = [];
  chieu.forEach((l) => { const g = nhom.find((n) => close(n[0][0][0], l[0][0], 0.5) && close(n[0][1][0], l[1][0], 0.5)); if (g) g.push(l); else nhom.push([l]); });
  return nhom.map((n) => {
    assert.equal(n.length, 2, "mỗi chùm hai đường giới hạn");
    const w0 = Math.abs(n[0][0][1] - n[1][0][1]), w1 = Math.abs(n[0][1][1] - n[1][1][1]), xm = (n[0][0][0] + n[0][1][0]) / 2;
    const so = T.filter((t) => /^\d$/.test(t.t) && Math.abs(t.x - xm) < 20);
    assert.equal(so.length, 1, "số thứ tự ghi dưới chùm");
    return { so: so[0].t, loai: Math.abs(w1 - w0) < 0.5 ? "song song" : w1 < w0 ? "hội tụ" : "phân kì" };
  });
};

/* ---------- hoá học: nguyên tố, hoá trị, công thức (chữ số dưới dòng), khối lượng phân tử ---------- */
const SUB = "₀₁₂₃₄₅₆₇₈₉", chiSo = (n) => (n > 1 ? String(n).split("").map((c) => SUB[+c]).join("") : "");
const sub2n = (s) => +[...s].map((c) => SUB.indexOf(c)).join("");
// "Ca(OH)₂" → { Ca: 1, O: 2, H: 2 }
const congThuc = (f) => {
  let i = 0;
  const doc = () => {
    const out = {};
    while (i < f.length && f[i] !== ")") {
      let part;
      if (f[i] === "(") { i++; part = doc(); assert.equal(f[i], ")", "thiếu ) trong " + f); i++; }
      else { const m = /^[A-Z][a-z]?/.exec(f.slice(i)); assert.ok(m, "không đọc được công thức " + f); i += m[0].length; part = { [m[0]]: 1 }; }
      let k = ""; while (i < f.length && SUB.includes(f[i])) k += f[i++];
      const n = k ? sub2n(k) : 1;
      Object.entries(part).forEach(([e, c]) => (out[e] = (out[e] || 0) + c * n));
    }
    return out;
  };
  const r = doc(); assert.equal(i, f.length, "thừa chữ trong công thức " + f); return r;
};
// 20 nguyên tố đầu theo Bảng 3.1 của sách (số hiệu, kí hiệu, tên, khối lượng nguyên tử amu) và vài nguyên tố khác sách dùng
const NGUYEN_TO = [
  [1, "H", "hydrogen", 1], [2, "He", "helium", 4], [3, "Li", "lithium", 7], [4, "Be", "beryllium", 9], [5, "B", "boron", 11], [6, "C", "carbon", 12],
  [7, "N", "nitrogen", 14], [8, "O", "oxygen", 16], [9, "F", "fluorine", 19], [10, "Ne", "neon", 20], [11, "Na", "sodium", 23], [12, "Mg", "magnesium", 24],
  [13, "Al", "aluminium", 27], [14, "Si", "silicon", 28], [15, "P", "phosphorus", 31], [16, "S", "sulfur", 32], [17, "Cl", "chlorine", 35.5], [18, "Ar", "argon", 40],
  [19, "K", "potassium", 39], [20, "Ca", "calcium", 40]].map(([Z, kh, ten, kl]) => ({ Z, kh, ten, kl }));
const KHAC = [["Fe", "iron", 56], ["Cu", "copper", 64], ["Zn", "zinc", 65], ["Ag", "silver", 108], ["Ba", "barium", 137]].map(([kh, ten, kl]) => ({ kh, ten, kl }));
const NT = Object.fromEntries(NGUYEN_TO.concat(KHAC).map((e) => [e.kh, e]));
const KLNT = Object.fromEntries(NGUYEN_TO.concat(KHAC).map((e) => [e.kh, e.kl]));
// tên tiếng Việt sách dùng cùng tên IUPAC (Bảng 3.1, Bảng 7.2)
const TEN_VIET = { natri: "Na", nhôm: "Al", "lưu huỳnh": "S", kali: "K", sắt: "Fe", đồng: "Cu", kẽm: "Zn", bạc: "Ag" };
const khCua = (ten) => { const e = Object.values(NT).find((x) => x.ten === ten); const kh = e ? e.kh : TEN_VIET[ten]; assert.ok(kh, "không biết nguyên tố " + ten); return kh; };
const KL = (f) => Object.entries(congThuc(f)).reduce((s, [e, c]) => { assert.ok(e in KLNT, "thiếu khối lượng nguyên tử của " + e); return s + KLNT[e] * c; }, 0);
// số electron từng lớp của nguyên tử có số hiệu Z ≤ 20 (lớp thứ nhất tối đa 2, lớp thứ hai và thứ ba tối đa 8, như mô hình của sách)
const VO = (Z) => { assert.ok(Z >= 1 && Z <= 20, "chỉ xét 20 nguyên tố đầu"); const r = []; let z = Z; [2, 8, 8, 2].forEach((c) => { if (z > 0) { r.push(Math.min(c, z)); z -= c; } }); return r; };
// vị trí trong bảng tuần hoàn: chu kì = số lớp electron; nhóm A = số electron lớp ngoài cùng (helium: nhóm VIIIA)
const LA_MA = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
const viTri = (Z) => { const v = VO(Z), ng = v[v.length - 1]; return { chuKi: v.length, nhom: LA_MA[Z === 2 ? 8 : ng] + "A" }; };
const timTheoViTri = (ck, nhom) => { const e = NGUYEN_TO.filter((x) => { const v = viTri(x.Z); return v.chuKi === ck && v.nhom === nhom; }); assert.equal(e.length, 1, `một nguyên tố ở chu kì ${ck}, nhóm ${nhom}`); return e[0]; };
const KIM_LOAI = ["Li", "Be", "Na", "Mg", "Al", "K", "Ca", "Fe", "Cu", "Zn", "Ag", "Ba"], KHI_HIEM = ["He", "Ne", "Ar"];
const loaiCua = (kh) => (KHI_HIEM.includes(kh) ? "khí hiếm" : KIM_LOAI.includes(kh) ? "kim loại" : "phi kim");
// hoá trị (Bảng 7.2 của sách và nhóm nguyên tử); công thức AxBy theo quy tắc hoá trị: x · a = y · b, x, y tối giản
const NHOM = { OH: "OH", NO3: "NO₃", SO4: "SO₄", CO3: "CO₃", PO4: "PO₄" };
const ucln = (a, b) => (b ? ucln(b, a % b) : a);
const lapCT = (A, a, B, b) => { const g = ucln(a, b), x = b / g, y = a / g, viet = (e, k) => (NHOM[e] ? (k > 1 ? "(" + NHOM[e] + ")" + chiSo(k) : NHOM[e]) : e + chiSo(k)); return viet(A, x) + viet(B, y); };
// hoá trị của nguyên tố A trong hợp chất hai nguyên tố khi biết hoá trị b của nguyên tố kia (B): a = (số nguyên tử B) · b / (số nguyên tử A)
const hoaTriTrong = (f, A, B, b) => { const c = congThuc(f); assert.deepEqual(Object.keys(c).sort(), [A, B].sort(), f + " gồm " + A + " và " + B); return (c[B] * b) / c[A]; };
const phanTram = (f, e) => (100 * KLNT[e] * congThuc(f)[e]) / KL(f);
const soNguyenTo = (o) => { const m = /\(([A-Z][A-Za-z₀-₉()]*)\)$/.exec(o); assert.ok(m, "lựa chọn ghi công thức trong ngoặc: " + o); return Object.keys(congThuc(m[1])).length; };
// khối lượng nguyên tử đề cho (“(Khối lượng nguyên tử: N 14, H 1, O 16 amu.)”) đúng như sách
const klDeCho = (q) => {
  const m = /\(Khối lượng nguyên tử: ([^)]*) amu\.\)/.exec(q.q); assert.ok(m, "đề cho khối lượng nguyên tử");
  const k = Object.fromEntries(m[1].split(", ").map((p) => { const [e, v] = p.split(" "); assert.ok(close(val(v), KLNT[e]), "khối lượng nguyên tử của " + e + " như sách: " + v); return [e, val(v)]; }));
  return k;
};

/* ---------- các câu cần tính ----------
   id: đề chứa câu (de1, de2, own); has: đoạn chữ của đề; right(q): đáp án tính bằng code. */
const so = (q, re) => { const m = re.exec(q.q); assert.ok(m, "đề thiếu số liệu: " + re); return m.slice(1).map(val); };
const coX = (q, ...cum) => cum.forEach((c) => assert.ok(q.x.includes(c), "lời giải cần có “" + c + "”"));
const CHECKS = [
  /* ----- Bài 2, 3, 4: nguyên tử, nguyên tố, bảng tuần hoàn ----- */
  { id: "de1", has: "tổng số các hạt proton, neutron, electron bằng", right: (q) => {
    const [tong, hon] = so(q, /bằng (\d+); số neutron hơn số proton (\d+) hạt/), p = (tong - hon) / 3, nn = p + hon;
    assert.ok(Number.isInteger(p), "số proton nguyên"); coX(q, `3p = ${3 * p}`, `${p} + ${nn} = ${p + nn}`);
    assert.equal(p + nn, NGUYEN_TO[p - 1].kl, "khối lượng nguyên tử khớp Bảng 3.1"); return p + nn; } },
  { id: "de2", has: "mô tả cách các electron được sắp xếp thành các lớp trong nguyên tử X", right: (q) => {
    const h = docNguyenTu(q.svg), Z = sum(h.lop), [A] = so(q, /xấp xỉ (\d+) amu/);
    assert.equal(h.Z, null, "hạt nhân không ghi điện tích (đề nói vậy)"); assert.deepEqual(h.lop, VO(Z), "các lớp electron xếp như mô hình của sách");
    coX(q, `${h.lop.join(", ")}`, `${A} − ${Z} = ${A - Z}`); assert.equal(A, NGUYEN_TO[Z - 1].kl, "khối lượng nguyên tử khớp Bảng 3.1"); return A - Z; } },
  { id: "own", has: "Vỏ nguyên tử Y gồm hai lớp electron", right: (q) => {
    const [k2, nn] = so(q, /lớp thứ hai chứa (\d+) electron; hạt nhân nguyên tử Y có (\d+) neutron/), Z = 2 + k2;
    assert.deepEqual(VO(Z), [2, k2], "lớp thứ nhất đã đủ 2 electron"); coX(q, `2 + ${k2} = ${Z}`, `${Z} + ${nn} = ${Z + nn}`);
    assert.equal(Z + nn, NGUYEN_TO[Z - 1].kl, "khối lượng nguyên tử khớp Bảng 3.1"); return Z + nn; } },
  { id: "de1", has: "Kí hiệu hoá học của nguyên tố neon", right: (q) => NT[khCua(/nguyên tố (\w+) là$/.exec(q.q)[1])].kh },
  { id: "de2", has: "có kí hiệu là F có tên gọi là", right: (q) => NT[/kí hiệu là (\w+) có tên/.exec(q.q)[1]].ten },
  { id: "de1", has: "Hình bên là ô nguyên tố magnesium", right: (q) => {
    const h = docONguyenTo(q.svg), e = NT[h.kh];
    assert.deepEqual([h.Z, h.ten, h.kl], [e.Z, e.ten, e.kl], "ô nguyên tố khớp Bảng 3.1"); assert.ok(q.q.includes(h.ten), "đề gọi đúng tên nguyên tố trong ô");
    const dung = (o) => { let m;
      if ((m = /có (\d+) (?:electron|proton)$/.exec(o))) return +m[1] === h.Z;
      if ((m = /^Khối lượng nguyên tử \w+ là (\d+) amu$/.exec(o))) return +m[1] === h.kl;
      if ((m = /^Số hiệu nguyên tử của \w+ là (\d+)$/.exec(o))) return +m[1] === h.Z;
      return assert.fail("không đọc được lựa chọn: " + o); };
    const d = q.o.filter(dung); assert.equal(d.length, 1, "đúng một lựa chọn đúng"); return d[0]; } },
  { id: "de1", has: "Nguyên tố này ở vị trí nào trong bảng tuần hoàn", right: (q) => {
    const h = docNguyenTu(q.svg), Z = sum(h.lop), v = viTri(Z);
    assert.equal(h.Z, Z, "điện tích hạt nhân ghi trong hình bằng số electron"); assert.deepEqual(h.lop, VO(Z), "các lớp electron xếp như mô hình của sách");
    coX(q, `(${h.lop.join(", ")})`, `chu kì ${v.chuKi}`, `nhóm ${v.nhom}`); return `Ô số ${Z}, chu kì ${v.chuKi}, nhóm ${v.nhom}`; } },
  { id: "de2", has: "Nguyên tố R ở chu kì", right: (q) => {
    const [, ck, nh] = /chu kì (\d), nhóm (\w+) của bảng tuần hoàn/.exec(q.q), e = timTheoViTri(+ck, nh); coX(q, `= ${e.Z}`, e.ten); return e.Z; } },
  { id: "de2", has: "Nguyên tử helium (số hiệu nguyên tử 2)", right: (q) => {
    assert.deepEqual([VO(2), viTri(2).nhom], [[2], "VIIIA"], "helium có một lớp 2 electron, ở nhóm VIIIA"); assert.ok(KHI_HIEM.includes("He"));
    return "Lớp electron duy nhất của helium đã đủ electron, bền vững như ở các khí hiếm"; } },
  { id: "own", has: "Hình bên là một ô nguyên tố trong bảng tuần hoàn. Nhận xét nào", right: (q) => {
    const h = docONguyenTo(q.svg), e = NT[h.kh], v = viTri(h.Z);
    assert.deepEqual([h.Z, h.ten, h.kl], [e.Z, e.ten, e.kl], "ô nguyên tố khớp Bảng 3.1"); coX(q, `chu kì ${v.chuKi}`, `nhóm ${v.nhom}`);
    const d = q.o.filter((o) => { const m = /^Là (khí hiếm|kim loại|phi kim), ở chu kì (\d)$/.exec(o); assert.ok(m, "không đọc được lựa chọn: " + o); return m[1] === loaiCua(h.kh) && +m[2] === v.chuKi; });
    assert.equal(d.length, 1, "đúng một lựa chọn đúng"); return d[0]; } },
  { id: "own", has: "Một nguyên tố thuộc chu kì", right: (q) => {
    const [, ck, nh] = /chu kì (\d), nhóm (\w+) của bảng tuần hoàn/.exec(q.q), e = timTheoViTri(+ck, nh), [nn] = so(q, /có (\d+) neutron/);
    assert.equal(e.Z + nn, e.kl, "khối lượng nguyên tử khớp Bảng 3.1"); coX(q, `${e.Z} + ${nn} = ${e.Z + nn}`, e.ten); return e.Z + nn; } },
  /* ----- Bài 5, 6, 7: phân tử, liên kết, hoá trị ----- */
  { id: "de1", has: "Chất nào sau đây là đơn chất?", right: (q) => { const d = q.o.filter((o) => soNguyenTo(o) === 1); assert.equal(d.length, 1, "đúng một đơn chất"); return d[0]; } },
  { id: "de2", has: "Chất nào sau đây là hợp chất?", right: (q) => { const d = q.o.filter((o) => soNguyenTo(o) >= 2); assert.equal(d.length, 1, "đúng một hợp chất"); return d[0]; } },
  { id: "de1", has: "Phân tử của một oxide gồm", right: (q) => {
    const [x, y, M] = so(q, /gồm (\d+) nguyên tử của nguyên tố R và (\d+) nguyên tử oxygen; khối lượng phân tử của oxide này là (\d+) amu/), R = (M - y * klDeCho(q).O) / x;
    assert.ok(NGUYEN_TO.some((e) => e.kl === R), "R là một nguyên tố trong Bảng 3.1"); coX(q, `R = ${R}`); return R; } },
  { id: "de2", has: "Tính khối lượng phân tử của calcium hydroxide", right: (q) => {
    const f = /, ([A-Z][^\s.]*)\. \(/.exec(q.q)[1], k = klDeCho(q);
    Object.keys(congThuc(f)).forEach((e) => assert.ok(e in k, "đề cho khối lượng nguyên tử của " + e)); coX(q, `= ${KL(f)} (amu)`); return KL(f); } },
  { id: "own", has: "gồm 1 nguyên tử carbon và một số nguyên tử chlorine", right: (q) => {
    const [M] = so(q, /khối lượng phân tử của X là (\d+) amu/), k = klDeCho(q), n = (M - k.C) / k.Cl;
    assert.ok(Number.isInteger(n), "số nguyên tử chlorine nguyên"); coX(q, "CCl" + chiSo(n)); return n; } },
  { id: "own", has: "Mỗi ý sau về phân tử, đơn chất, hợp chất đúng hay sai?", right: (q) => {
    const [a, b, c, d] = q.o, f = (s, re) => { const m = re.exec(s); assert.ok(m, "thứ tự các ý"); return m[1]; };
    const fa = f(a, /^Khí ozone \((\S+)\) là hợp chất/), fb = f(b, /carbon monoxide \((\S+)\) gồm một nguyên tử carbon liên kết với một nguyên tử oxygen/), fc = f(c, /chlorine \((\S+)\) được tạo nên từ hai nguyên tử chlorine/);
    assert.ok(/khí hiếm đều ở thể khí/.test(d), "thứ tự các ý");
    return [Object.keys(congThuc(fa)).length >= 2, JSON.stringify(congThuc(fb)) === JSON.stringify({ C: 1, O: 1 }), congThuc(fc).Cl === 2, KHI_HIEM.length === 3]; } },
  { id: "de1", has: "Khi calcium (Ca, số hiệu nguyên tử 20) cháy trong oxygen", right: (q) => {
    const [a, b, c, d] = q.o, ca = VO(20), o = VO(8), [, k] = /nhường (\d) electron/.exec(a);
    assert.ok(/^Nguyên tử O nhường 2 electron/.test(b) && /hút nhau, tạo thành liên kết ion/.test(c) && /CaO là chất khí/.test(d), "thứ tự các ý");
    coX(q, `(${ca.join(", ")})`, `(${o.join(", ")})`);
    // Ca là kim loại, nhường hết electron lớp ngoài cùng; O là phi kim (6 electron lớp ngoài cùng) nhận thêm electron; hợp chất ion ở thể rắn
    return [+k === ca[ca.length - 1] && a.includes("Ca²⁺"), o[o.length - 1] < 4, loaiCua("Ca") === "kim loại" && loaiCua("O") === "phi kim", false]; } },
  { id: "de2", has: "Trong phân tử hydrogen sulfide (H₂S)", right: (q) => {
    const s = VO(16), thieu = 8 - s[s.length - 1];
    assert.ok(q.q.includes(`có ${s[s.length - 1]} electron ở lớp ngoài cùng`), "đề nói đúng số electron lớp ngoài cùng của S"); assert.equal(thieu, congThuc("H₂S").H, "S cần thêm đúng số electron bằng số nguyên tử H");
    return "S dùng chung với mỗi nguyên tử H một cặp electron"; } },
  { id: "own", has: "Chất X ở nhiệt độ phòng là chất rắn", right: (q) => {
    const ion = q.o.filter((o) => { const m = /\(([A-Z][A-Za-z₀-₉]*)\)$/.exec(o);
      if (!m) { assert.ok(/\((saccharose|paraffin)\)$/.test(o), "chất cộng hoá trị sách nhắc tới: " + o); return false; }
      const e = Object.keys(congThuc(m[1])); return e.some((x) => KIM_LOAI.includes(x)) && e.some((x) => !KIM_LOAI.includes(x)); });
    assert.equal(ion.length, 1, "đúng một hợp chất ion (kim loại với phi kim)"); return ion[0]; } },
  { id: "de1", has: "Hợp chất gồm magnesium (hoá trị II) và nhóm phosphate", right: (q) => {
    const [, a, b] = /magnesium \(hoá trị (\w+)\) và nhóm phosphate \(PO₄, hoá trị (\w+)\)/.exec(q.q); coX(q, `x · ${a} = y · ${b}`); return lapCT("Mg", LA_MA.indexOf(a), "PO4", LA_MA.indexOf(b)); } },
  { id: "de1", has: "Tính phần trăm khối lượng của nguyên tố nitrogen trong hợp chất NH₄NO₃", right: (q) => {
    klDeCho(q); const f = "NH₄NO₃"; coX(q, `= ${KL(f)} (amu)`); return phanTram(f, "N"); } },
  { id: "de2", has: "Mỗi ý sau về hoá trị và công thức hoá học đúng hay sai?", right: (q) => q.o.map((s) => {
    let m;
    if ((m = /^Trong hợp chất (\S+), (\w+) có hoá trị (\w+)\.$/.exec(s))) { const A = khCua(m[2]), B = Object.keys(congThuc(m[1])).find((e) => e !== A); assert.equal(NT[B] && ["H", "O"].includes(B), true, "nguyên tố kia có một hoá trị (H, O)"); return hoaTriTrong(m[1], A, B, B === "H" ? 1 : 2) === LA_MA.indexOf(m[3]); }
    if ((m = /^Hợp chất tạo nên từ (\S+) \(hoá trị (\w+)\) và nhóm \w+ \((\S+), hoá trị (\w+)\) có công thức là (\S+)\.$/.exec(s))) return lapCT(khCua(m[1]), LA_MA.indexOf(m[2]), [...m[3]].map((c) => (SUB.includes(c) ? SUB.indexOf(c) : c)).join(""), LA_MA.indexOf(m[4])) === m[5];
    if ((m = /^Trong hợp chất (\S+) \((\w+) có hoá trị (\w+)\), (\w+) có hoá trị (\w+)\.$/.exec(s))) return hoaTriTrong(m[1], khCua(m[4]), khCua(m[2]), LA_MA.indexOf(m[3])) === LA_MA.indexOf(m[5]);
    return assert.fail("không đọc được ý: " + s); }) },
  { id: "de2", has: "Một oxide của lưu huỳnh có khối lượng phân tử", right: (q) => {
    const [M, p] = so(q, /khối lượng phân tử (\d+) amu, trong đó lưu huỳnh chiếm (\d+)% khối lượng/), k = klDeCho(q), nS = (M * p) / 100 / k.S, nO = (M - nS * k.S) / k.O;
    assert.ok(Number.isInteger(nS) && Number.isInteger(nO), "số nguyên tử nguyên"); coX(q, "S" + chiSo(nS) + "O" + chiSo(nO)); return nO; } },
  { id: "own", has: "Hoá trị của nitrogen trong hợp chất NO₂", right: (q) => { coX(q, "= IV"); return LA_MA[hoaTriTrong("NO₂", "N", "O", 2)]; } },
  { id: "own", has: "sắt (iron) có hoá trị", right: (q) => {
    klDeCho(q); const [, ht] = /có hoá trị (\w+)\./.exec(q.q), f = lapCT("Fe", LA_MA.indexOf(ht), "O", 2); coX(q, f, `= ${KL(f)} (amu)`); return phanTram(f, "Fe"); } },
  /* ----- Bài 8–11: tốc độ ----- */
  { id: "de1", has: "Bạn Hoa đạp xe trên đường ven hồ", right: (q) => {
    const [s, t] = so(q, /quãng đường ([\d,]+) km hết (\d+) min/); coX(q, `${t} min = ${vn(t / 60)} h`); return s / (t / 60); } },
  { id: "de2", has: "Một đoàn tàu chạy với tốc độ không đổi", right: (q) => {
    const [v, t] = so(q, /tốc độ không đổi (\d+) km\/h\. Trong (\d+) s/), ms = (v * 1000) / 3600; coX(q, `= ${vn(ms)} m/s`); return ms * t; } },
  { id: "own", has: "Bạn Nam chạy bộ quanh công viên", right: (q) => {
    const [v, s] = so(q, /tốc độ không đổi ([\d,]+) m\/s\. Thời gian Nam chạy hết một vòng đường dài ([\d ]+) m/); coX(q, `= ${vn(s / v)} (s)`); return s / v / 60; } },
  { id: "de2", has: "Một ca nô chạy trên sông với tốc độ", right: (q) => `Trong mỗi giây, ca nô đi được ${vn(so(q, /tốc độ (\d+) m\/s/)[0])} m` },
  { id: "de1", has: "đồ thị quãng đường – thời gian của bạn Hà", right: (q) => {
    const g = docDoThi(q.svg), nghi = doan(g.duong[0]).filter((d) => d.v === 0);
    assert.ok(g.duong.length === 1 && g.dvT === "h" && nghi.length === 1, "một đồ thị, đơn vị giờ, một đoạn nằm ngang"); coX(q, `vẫn là ${vn(nghi[0].s0)} ${g.dvS}`);
    return `Từ ${vn(nghi[0].t0)} h đến ${vn(nghi[0].t1)} h`; } },
  { id: "de1", has: "đồ thị quãng đường – thời gian của một xe tải", right: (q) => {
    const g = docDoThi(q.svg), d = g.duong[0], [t3, t1, t4] = so(q, /sau thời điểm (\d+) h xe chạy tiếp với tốc độ bằng tốc độ trong (\d+) h đầu thì tính từ lúc khởi hành, đến thời điểm (\d+) h/);
    assert.ok(g.dvT === "h" && g.dvS === "km" && d.p[d.p.length - 1][0] === t3, "đồ thị vẽ đến thời điểm " + t3 + " h");
    const v1 = sTai(d, t1) / t1; coX(q, `${vn(v1)} km/h`, `${vn(sTai(d, t3))} + ${vn(v1 * (t4 - t3))} = ${vn(sTai(d, t3) + v1 * (t4 - t3))}`); return sTai(d, t3) + v1 * (t4 - t3); } },
  { id: "de2", has: "hai bạn A và B chạy trên đường đua", right: (q) => {
    const g = docDoThi(q.svg), A = g.duong.find((d) => d.ten === "A"), B = g.duong.find((d) => d.ten === "B"), [a, b, c, d] = q.o, L = so(q, /đường đua ([\d ]+) m/)[0];
    assert.ok(A && B && g.dvT === "s" && g.dvS === "m", "hai đường A, B; t (s), s (m)"); let m;
    m = /^Trong (\d+) s đầu, bạn B chạy nhanh hơn bạn A\.$/.exec(a); assert.ok(m, "ý a"); const ra = sTai(B, +m[1]) > sTai(A, +m[1]);
    m = /^Bạn A chạy với tốc độ không đổi (\d+) m\/s\.$/.exec(b); assert.ok(m, "ý b"); const rb = doan(A).every((x) => close(x.v, +m[1]));
    assert.ok(/^Bạn B về đích trước bạn A\.$/.test(c), "ý c"); const rc = tKhi(B, L) < tKhi(A, L) - 1e-9;
    m = /^Từ giây thứ (\d+) đến giây thứ (\d+), bạn B chạy được (\d+) m\.$/.exec(d); assert.ok(m, "ý d"); const rd = close(sTai(B, +m[2]) - sTai(B, +m[1]), +m[3]);
    return [ra, rb, rc, rd]; } },
  { id: "de2", has: "đồ thị quãng đường – thời gian của bạn Long", right: (q) => {
    const g = docDoThi(q.svg), ds = doan(g.duong[0]), [S2] = so(q, /hết quãng đường ([\d ]+) m trong/);
    assert.ok(ds.length === 1 && g.dvT === "min" && g.dvS === "m", "tốc độ không đổi; t (min), s (m)"); coX(q, `= ${vn(ds[0].v)} (m)`); return S2 / ds[0].v; } },
  { id: "own", has: "đồ thị quãng đường – thời gian của hai xe A và B", right: (q) => {
    const g = docDoThi(q.svg), v = ["A", "B"].map((t) => { const ds = doan(g.duong.find((d) => d.ten === t)); assert.equal(ds.length, 1, "xe " + t + " chạy đều"); return ds[0].v; });
    assert.ok(g.dvT === "h" && g.dvS === "km" && v[0] > v[1], "km/h; xe A nhanh hơn"); coX(q, `= ${vn(v[0])} (km/h)`, `= ${vn(v[1])} (km/h)`); return `Xe A nhanh hơn xe B ${vn(v[0] - v[1])} km/h`; } },
  { id: "own", has: "đồ thị quãng đường – thời gian của một chiếc thuyền máy", right: (q) => {
    const g = docDoThi(q.svg), ds = doan(g.duong[0]), k = ds.findIndex((x) => x.v === 0), [S2] = so(q, /đi hết (\d+) km/);
    assert.ok(k >= 0 && k + 1 < ds.length && g.dvT === "h" && g.dvS === "km", "có đoạn nghỉ, rồi đoạn đi tiếp"); coX(q, `= ${vn(ds[k + 1].v)} (km/h)`); return S2 / ds[k + 1].v; } },
  { id: "de2", has: "Theo quy tắc “3 giây”", right: (q) => {
    const [k, v] = so(q, /nhân với (\d+) s\. Một ô tô chạy với tốc độ (\d+) km\/h/), ms = (v * 1000) / 3600; coX(q, `= ${vn(ms)} m/s`); return `${vn(ms * k)} m`; } },
  /* ----- Bài 12–14: âm thanh ----- */
  { id: "de1", has: "đường biểu diễn dao động của hai âm A và B", right: (q) => {
    const h = docDaoDong(q.svg), A = h.find((x) => x.ten === "Âm A"), B = h.find((x) => x.ten === "Âm B");
    assert.ok(A && B && close(A.A, B.A, 0.5), "hai đường cao như nhau (câu hỏi độ cao, không hỏi độ to)"); assert.notEqual(A.n, B.n);
    coX(q, `âm B có ${B.n} dao động`, `âm A chỉ có ${A.n} dao động`); return B.n > A.n ? "Âm B cao hơn âm A" : "Âm A cao hơn âm B"; } },
  { id: "de2", has: "Màng của một chiếc loa thực hiện", right: (q) => { const [N, t] = so(q, /thực hiện (\d+) dao động trong ([\d,]+) s/); coX(q, `= ${vn(N / t)} (Hz)`); return N / t; } },
  { id: "own", has: "Nguồn âm A thực hiện", right: (q) => {
    const [N, t, fB] = so(q, /thực hiện ([\d ]+) dao động trong (\d+) s; nguồn âm B dao động với tần số (\d+) Hz/), fA = N / t; coX(q, `= ${vn(fA)} (Hz)`);
    return fA > fB ? "Nguồn A phát ra âm cao hơn nguồn B" : fA < fB ? "Nguồn B phát ra âm cao hơn nguồn A" : "Hai nguồn phát ra âm cao như nhau"; } },
  /* ----- Bài 15–17: ánh sáng ----- */
  { id: "de2", has: "Hình bên vẽ ba chùm sáng", right: (q) => {
    const h = docChum(q.svg), so_ = (l) => h.find((c) => c.loai === l).so;
    assert.deepEqual(h.map((c) => c.loai).sort(), ["hội tụ", "phân kì", "song song"], "đủ ba loại chùm sáng");
    coX(q, `đó là chùm ${so_("hội tụ")}`, `Chùm ${so_("phân kì")} có các tia loe rộng ra (chùm sáng phân kì)`, `chùm ${so_("song song")} có hai đường giới hạn song song`); return "Chùm " + so_("hội tụ"); } },
  { id: "de1", has: "tia tới hợp với mặt gương một góc", right: (q) => {
    const h = docPhanXa(q.svg), [g] = so(q, /hợp với mặt gương một góc (\d+)°/);
    assert.ok(close(90 - h.i.g, g, 0.1), "hình vẽ góc giữa tia tới và mặt gương bằng " + g + "°");
    assert.deepEqual(h.cung.map((c) => [tron(c.deg, 1), c.so]), [[g, g]], "cung đánh dấu góc giữa tia tới và mặt gương, ghi đúng số đo");
    assert.ok(h.ra.length === 1 && h.ra[0].ben === 1 && close(h.ra[0].g, h.i.g, 0.1), "tia phản xạ vẽ đúng định luật phản xạ");
    coX(q, `= ${90 - g}°`); return `${90 - g}°`; } },
  { id: "de2", has: "Tia nào có thể là tia phản xạ của tia SI", right: (q) => {
    const h = docPhanXa(q.svg), dung = h.ra.filter((t) => t.ben === 1 && close(t.g, h.i.g, 0.1));
    assert.equal(dung.length, 1, "đúng một tia đúng định luật phản xạ");
    h.ra.filter((t) => t !== dung[0]).forEach((t) => assert.ok(t.ben === -1 ? q.x.includes(`Tia ${t.ten} ở cùng phía với tia tới`) : Math.abs(t.g - h.i.g) > 10 && q.x.includes(`Tia ${t.ten} ở phía bên kia nhưng hợp với pháp tuyến một góc ${t.g > h.i.g ? "lớn" : "nhỏ"} hơn góc tới`), "lời giải nói vì sao tia " + t.ten + " sai"));
    assert.deepEqual(q.o.slice().sort(), h.ra.map((t) => "Tia " + t.ten).concat("Không tia nào").sort(), "lựa chọn là các tia trong hình"); return "Tia " + dung[0].ten; } },
  { id: "own", has: "góc giữa tia sáng tới gương và tia phản xạ là", right: (q) => { const [g] = so(q, /tia phản xạ là (\d+)°/); coX(q, `2i = ${g}°`); return g / 2; } },
  { id: "de1", has: "Bạn Lan đứng trước một gương phẳng lớn", right: (q) => {
    const [d, b] = so(q, /cách gương ([\d,]+) m\. Sau đó Lan bước lại gần gương thêm ([\d,]+) m/); coX(q, `= ${vn(d - b)} (m)`); return 2 * (d - b); } },
  { id: "de2", has: "Mũi tên nào là ảnh của vật AB", right: (q) => {
    const h = docAnhLuoi(q.svg), anh = (p) => [2 * h.G - p[0], p[1]], d = h.chon.filter((m) => same(m.A, anh(h.A)) && same(m.B, anh(h.B)));
    assert.equal(d.length, 1, "đúng một mũi tên là ảnh của AB"); coX(q, `A cách gương ${h.G - h.A[0]} ô`, `B cách gương ${h.G - h.B[0]} ô`);
    assert.deepEqual(q.o.slice().sort(), h.chon.map((m) => "Mũi tên " + m.so).concat("Không mũi tên nào").sort(), "lựa chọn là các mũi tên trong hình"); return "Mũi tên " + d[0].so; } },
  { id: "own", has: "Một cột cờ cao", right: (q) => {
    const [h, c] = so(q, /cao (\d+) m dựng thẳng đứng trên bờ hồ, chân cột cao hơn mặt nước ([\d,]+) m/); coX(q, `= ${vn(h + c)} (m)`); return 2 * (h + c); } },
];

let n = 0;
const daKiem = new Set();
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.q.includes(c.has));
  assert.equal(m.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${m.length}`);
  const q = m[0], at = c.id + ": " + c.has;
  assert.equal(q.src, S[c.id], at + ": câu nằm ở đề " + q.src);
  try {
    const want = c.right(q), got = q.type === "num" ? q.ans : q.type === "tf4" ? q.a : q.o[0];
    if (q.type === "num") assert.ok(close(got, want, 1e-9), "đáp án " + got + ", tính được " + want);
    else assert.strictEqual(JSON.stringify(got), JSON.stringify(want), "đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
    if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), "lựa chọn sai trùng đáp án đúng");
  } catch (e) { e.message = at + ": " + e.message; throw e; }
  assert.ok(!daKiem.has(q), at + ": câu đã có mục kiểm tra khác");
  daKiem.add(q); n++;
});
// câu trả lời bằng số và câu có hình nào cũng phải được tính lại, đọc lại ở trên; hình qua bộ lọc của app, chữ trong hình vừa khung
kho.filter((q) => q.svg || q.type === "num").forEach((q) => assert.ok(daKiem.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
const hinh = kho.filter((q) => q.svg);
hinh.forEach((q) => { assert.deepEqual(Quiz.svg(q.svg).problems, [], "hình bị lọc: " + q.q.slice(0, 50)); chuHinh(q.svg, q.q.slice(0, 40)); });
// bộ đọc hình bắt được hình vẽ sai: electron thiếu, đồ thị không ở nút lưới, tia phản xạ lệch, ảnh không đối xứng
{
  const cau = (has) => kho.find((q) => q.q.includes(has)), tim = (has) => CHECKS.find((c) => c.has === has), sua = (q, svg) => Object.assign({}, q, { svg });
  const k = cau("Nguyên tố này ở vị trí nào trong bảng tuần hoàn");
  assert.throws(() => tim("Nguyên tố này ở vị trí nào trong bảng tuần hoàn").right(sua(k, k.svg.replace(/<circle [^>]*fill="acc"[^>]*\/>/, ""))), /điện tích hạt nhân|mô hình/);
  const ha = cau("đồ thị quãng đường – thời gian của bạn Hà");
  assert.throws(() => docDoThi(ha.svg.replace(/(<polyline points="[\d.]+,[\d.]+ )([\d.]+),/, (m0, a, x) => a + (+x + 7) + ",")), /nút lưới/);
  const px = cau("Tia nào có thể là tia phản xạ của tia SI");
  assert.throws(() => tim("Tia nào có thể là tia phản xạ của tia SI").right(sua(px, px.svg.replace(/>2</, ">9<").replace(/>3</, ">2<").replace(/>9</, ">3<"))), /lời giải|định luật/);
  const ab = cau("Mũi tên nào là ảnh của vật AB");
  assert.throws(() => tim("Mũi tên nào là ảnh của vật AB").right(sua(ab, ab.svg.replace(/>2</, ">7<"))), /lựa chọn|đúng một/);
  assert.throws(() => chuHinh(k.svg.replace('font-size="14"', 'font-size="12"'), "thử"), /cỡ 13/);
}

/* ---------- chữ (sách Khoa học tự nhiên 7 in năm 2026) ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.unit || []).map(String);
const chuCau = (q) => chu(q).concat(q.svg ? [texts(q.svg).map((t) => t.t).join(" ")] : []);
kho.forEach((q) => {
  const at = q.src + ": " + q.q.slice(0, 50);
  chuCau(q).forEach((s) => {
    // công thức hoá học viết bằng chữ số dưới dòng (CO₂, Ca(OH)₂), không viết CO2
    assert.ok(!/(?:^|[^A-Za-z])(?:[A-Z][a-z]?|\))+\d/.test(s), at + ": công thức cần chữ số dưới dòng: " + s);
    // tên nguyên tố, chất và thuật ngữ như sách (oxygen, hydrogen, carbon, chlorine…; khối lượng nguyên tử tính bằng amu)
    assert.ok(!/(?<![\p{L}])(?:oxi|hiđro|hidro|cacbon|nitơ|clo|canxi|magie|photpho|silic|flo|heli|agon|liti|beri|nguyên tử khối|phân tử khối|đvC|axit|sucrose)(?![\p{L}])/iu.test(s), at + ": tên chất, thuật ngữ khác sách: " + s);
    // dấu thanh kiểu cũ như sách (hoá, thuỷ, tuỳ, hoà…)
    assert.ok(!/(?<![\p{L}])(?:hóa|hòa|thủy|tỏa|hủy|tùy|khỏe|họa|lũy|thỏa)(?![\p{L}])/iu.test(s), at + ": dấu thanh kiểu mới: " + s);
    // số ngăn hàng nghìn bằng khoảng trắng (trừ năm), dấu phẩy thập phân
    assert.ok(!/\d{4,}/.test(s.replace(/\b(?:19|20)\d\d\b/g, "")) && !/\d\.\d/.test(s), at + ": số viết sai cách: " + s);
    // điều sách không dạy (đề-xi-ben, hạ âm), đơn vị hành chính cũ
    assert.ok(!/(?<![\p{L}])(?:dB|đề-xi-ben|hạ âm|huyện|63 tỉnh)(?![\p{L}])/u.test(s), at + ": điều sách không dạy hay đơn vị hành chính cũ: " + s);
  });
});

/* ---------- mức độ, ma trận, phần ---------- */
// 17 chủ đề theo thứ tự bài của sách: [chữ chủ đề, số bài]; tên bài như mục lục (README của cuốn ở OnUp-Book), Bài 11 ghi gọn
const CHU_DE = [["Phương pháp và kĩ năng học tập môn Khoa học tự nhiên", 1], ["Nguyên tử", 2], ["Nguyên tố hoá học", 3],
  ["Sơ lược về bảng tuần hoàn các nguyên tố hoá học", 4], ["Phân tử – Đơn chất – Hợp chất", 5], ["Giới thiệu về liên kết hoá học", 6],
  ["Hoá trị và công thức hoá học", 7], ["Tốc độ chuyển động", 8], ["Đo tốc độ", 9], ["Đồ thị quãng đường – thời gian", 10],
  ["Ảnh hưởng của tốc độ trong an toàn giao thông", 11], ["Sóng âm", 12], ["Độ to và độ cao của âm", 13], ["Phản xạ âm, chống ô nhiễm tiếng ồn", 14],
  ["Năng lượng ánh sáng. Tia sáng, vùng tối", 15], ["Sự phản xạ ánh sáng", 16], ["Ảnh của vật qua gương phẳng", 17]];
const TEN_BAI = ["Phương pháp và kĩ năng học tập môn Khoa học tự nhiên", "Nguyên tử", "Nguyên tố hoá học", "Sơ lược về bảng tuần hoàn các nguyên tố hoá học",
  "Phân tử – Đơn chất – Hợp chất", "Giới thiệu về liên kết hoá học", "Hoá trị và công thức hoá học", "Tốc độ chuyển động", "Đo tốc độ", "Đồ thị quãng đường – thời gian",
  "Thảo luận về ảnh hưởng của tốc độ trong an toàn giao thông", "Sóng âm", "Độ to và độ cao của âm", "Phản xạ âm, chống ô nhiễm tiếng ồn",
  "Năng lượng ánh sáng. Tia sáng, vùng tối", "Sự phản xạ ánh sáng", "Ảnh của vật qua gương phẳng"];
CHU_DE.forEach(([t, b], i) => assert.ok(b === i + 1 && (TEN_BAI[i] === t || (i === 10 && TEN_BAI[i].toLowerCase().endsWith(t.toLowerCase()))), "chủ đề " + (i + 1) + " theo tên Bài " + (i + 1) + ": " + t));
const SACH_README = path.join(__dirname, "../../OnUp-Book/lop-7/khoa-hoc-tu-nhien-7/README.md");
if (fs.existsSync(SACH_README)) { const md = fs.readFileSync(SACH_README, "utf8"); TEN_BAI.forEach((t, i) => assert.ok(md.includes("Bài " + (i + 1) + ". " + t + " |"), "tên Bài " + (i + 1) + " như mục lục trong README của sách: " + t)); }
CHU_DE.forEach(([t]) => assert.ok(("chu-de:7:khtn:" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const M = pool.pool.matrix, cells = Object.values(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), pool.n, "tổng ma trận bằng n");
assert.ok(cells.every((v) => v.every((k) => k <= 1)), "mỗi ô rút nhiều nhất 1 câu");
assert.deepEqual(Object.keys(M), CHU_DE.map((c) => c[0]), "chủ đề theo thứ tự bài của sách");
// hai đề cố định và câu riêng đều chia đúng ma trận, nên ô nào cũng có gấp ba số câu ô đó rút
[S.de1, S.de2, S.own].forEach((id) => {
  assert.deepEqual([...new Set(cauCua(id).map((q) => q.topic))], Object.keys(M), id + ": đủ chủ đề, đúng thứ tự");
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => cauCua(id).filter((q) => q.topic === t && q.lv === l).length), v, id + " đúng ma trận ở chủ đề " + t));
});
// số câu mỗi phần đúng như lời dặn của đề; lớp 7 không có đề chung của Sở
const PHAN = [["Bài 1", 1, 1], ["Chương I, II", 2, 7], ["Chương III–V", 8, 17]];
const theoPhan = PHAN.map(([ten, a, b]) => [ten, a, b, sum(CHU_DE.filter(([, k]) => k >= a && k <= b).map(([t]) => sum(M[t])))]);
[S.de1, S.de2].forEach((id) => theoPhan.forEach(([ten, a, b, k]) => assert.ok(new RegExp(`${ten} \\(${a === b ? "" : `Bài ${a}–${b}: `}[^)]*\\) ${k} câu`).test(bank(id).note), id + ": lời dặn ghi " + ten + " " + k + " câu")));
assert.ok(bank(S.own).note.includes("mỗi lần rút " + theoPhan.map(([ten, , , k]) => k + " câu " + ten).join(", ")), "lời dặn của đề ngẫu nhiên ghi số câu mỗi phần");
assert.ok(bank(S.own).note.includes(theoPhan.map(([ten, a, b]) => ten + (a === b ? "" : ` (Bài ${a}–${b})`)).join(", ")), "lời dặn của đề ngẫu nhiên ghi phạm vi từng phần");
[S.de1, S.de2, S.own].forEach((id) => assert.ok(!/Sở|Thông tư/.test(bank(id).note), id + ": lời dặn không nói tới đề chung của Sở (không có ở lớp 7)"));

/* ---------- dạng câu ---------- */
assert.ok(kho.every((q) => ["mc", "tf4", "num"].includes(q.type)), "chỉ dùng nhiều lựa chọn, đúng/sai 4 ý, trả lời ngắn bằng số (khung Công văn 7991), không có tự luận");
[S.de1, S.de2, S.own].forEach((id) => {
  assert.ok(cauCua(id).filter((q) => q.type === "tf4").length >= 4, id + ": ít nhất 4 câu đúng/sai 4 ý");
  assert.ok(cauCua(id).filter((q) => q.type === "num").length >= 3, id + ": cần câu trả lời bằng số");
});
const kieu = {};
kho.filter((q) => q.type === "tf4").forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.equal(Math.max(...Object.values(kieu)), 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
// lời giải không nói “ý thứ hai”, “phương án A”: app xáo phương án (ý của câu đúng/sai giữ thứ tự a, b, c, d)
kho.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của phương án: " + q.q.slice(0, 50)));
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2); các lựa chọn không trùng nhau
kho.filter((q) => q.type === "mc").forEach((q) => {
  const m = Math.max(...q.o.slice(1).map((o) => o.length));
  assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + q.q.slice(0, 50));
  assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + q.q.slice(0, 50));
});
// đáp án đúng là lựa chọn dài nhất hay ngắn nhất (Rút ra N9-ck1-tin-congnghe, N12-gk2-vatli-hoahoc): mỗi kiểu không quá một phần ba, cả hai
// không dưới một phần sáu số câu nhiều lựa chọn của mỗi phần (học sinh không loại được hai đầu mà đoán)
const daiNgan = [S.de1, S.de2, S.own].map((id) => {
  const mcs = cauCua(id).filter((q) => q.type === "mc" && new Set(q.o.map((o) => o.length)).size > 1), hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
  const dai = mcs.filter((q) => hon(q, (a, b) => a > b)).length, ngan = mcs.filter((q) => hon(q, (a, b) => a < b)).length;
  assert.ok(dai * 3 <= mcs.length && ngan * 3 <= mcs.length, `${id}: đáp án đúng dài nhất ở ${dai}, ngắn nhất ở ${ngan} trên ${mcs.length} câu nhiều lựa chọn`);
  assert.ok((dai + ngan) * 6 >= mcs.length, `${id}: đáp án đúng dài nhất hay ngắn nhất ở ${dai + ngan}/${mcs.length} câu nhiều lựa chọn, cần từ một phần sáu`);
  return `${dai} + ${ngan}/${mcs.length}`;
});
// đáp án không lặp chữ của nhãn chủ đề trên câu (Rút ra N6, N16b), trừ khi mọi lựa chọn cùng có chữ đó; nhãn tách theo “. ”, “ và ”, “, ”
{ const phanNhan = (t) => t.split(/\. | và |, /).map((s) => s.trim().toLowerCase()).filter((s) => s.includes(" ") || s.length >= 6);
  kho.filter((q) => q.type === "mc").forEach((q) => phanNhan(q.topic).forEach((c) => { if (q.o[0].toLowerCase().includes(c)) assert.ok(q.o.every((o) => o.toLowerCase().includes(c)), `đáp án “${q.o[0]}” lặp chữ “${c}” của nhãn chủ đề`); })); }

/* ---------- rút thử ---------- */
const thu = (hist) => {
  const d = Quiz.draw(pool, hist);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, pool.n);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.topic === t && q.lv === l).length), v, "rút đúng ma trận ở chủ đề " + t));
  return d;
};
const seen = new Set();
for (let k = 0; k < 400; k++) thu().questions.forEach((q) => seen.add(Quiz.key(q)));
assert.ok(mine.every((q) => seen.has(Quiz.key(q))), "400 lần rút thử phải gặp đủ các câu riêng");
// học sinh đã làm hết một đề cố định: lần rút sau không lấy lại câu của đề đó
pool.pool.from.forEach((id) => { const done = new Set(bank(id).questions.map(Quiz.key)); for (let k = 0; k < 30; k++) thu((q) => ({ done: done.has(Quiz.key(q)) ? 1 : 0, wrong: 0 })).questions.forEach((q) => assert.ok(!done.has(Quiz.key(q)), "đã làm hết " + id + " mà vẫn gặp lại câu của đề đó")); });

/* ---------- đề bài không trùng câu nào khác trong data/banks/7-khtn.js (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
{
  const deBai = BANKS.filter((b) => b.file === "7-khtn.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: gocChu(q.q) })));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
}

/* ---------- dò lộ đáp án (Rút ra N5, N24, N8, RS9; như tests/toan7-ck1.js) giữa mọi cặp câu của kho: đề “Ôn chủ đề” rút chung mọi câu
   của một chủ đề, đề ngẫu nhiên rút chung câu của các chủ đề khác; lời dặn (note) hiện ở màn mở đề nên cũng là “câu kia”. Đáp án là số
   nguyên (từ 10) chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”, “bằng”, “được”); số thập phân, số đo góc tìm ở vị trí kết quả;
   đáp án bằng chữ có ở câu kia (cả chữ trong hình) thì chỉ in ra khi chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM. ---------- */
const KQ = "(?:=|(?:^|[\\s(])(?:là|bằng|được))\\s+";
const SAU = "(?!\\d|,\\d|\\/|°|%|\\s*[·+−×:](?:\\s|\\d|\\())"; // số đứng ngay trước một phép tính là thừa số, số hạng
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
const soKQ = (s) => [...String(s).matchAll(new RegExp(KQ + "(\\d{1,3}(?: \\d{3})*)" + SAU, "gu"))].map((m) => val(m[1]));
const kqLa = (s, a) => new RegExp(KQ + esc(a) + (/°$/.test(a) ? "(?!\\d)" : SAU), "u").test(s);
const ten = new Map();
[S.de1, S.de2].forEach((id) => cauCua(id).forEach((q, i) => ten.set(q, id.replace("khtn7-ck1-", "") + "#" + (i + 1))));
mine.forEach((q, i) => ten.set(q, "own#" + (i + 1)));
const LOI_DAN = [...new Set([S.de1, S.de2, S.own].map((id) => bank(id).note))].map((note, i) => ({ q: note, x: "", note: true, ten: "note" + (i + 1) }));
const doLo = (qs, name, notes) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    const so_ = [], kq = [], cum = [];
    const them = (a) => { a = String(a);
      const m = /^(\d{1,3}(?: \d{3})*)(?: ([^\d\s]+))?$/.exec(a);
      if (m && !/°$/.test(a)) so_.push(val(m[1]));
      else if (/^−?\d[\d ,/]*(?:°|\s[^\d\s]+)?$/.test(a)) kq.push(a.replace(/ [^\d\s]+$/, ""));
      else if (a.length >= 2) cum.push(a); };
    if (q.type === "num") them(q.unit === "°" ? q.ans + "°" : vn(q.ans)); else if (q.type === "mc") them(q.o[0]);
    qs.concat(notes || []).forEach((p) => {
      if (p === q) return;
      const C = p.note ? [p.q] : chuCau(p), T = C.map((s) => s.toLowerCase()), at = `${name(p)} lộ đáp án ${name(q)}: `;
      so_.filter((x) => x >= 10 && C.flatMap(soKQ).includes(x)).forEach((x) => lo.push(at + x));
      kq.filter((a) => C.some((s) => kqLa(s, a))).forEach((a) => lo.push(at + a));
      cum.filter((s) => { const re = new RegExp("(?<![\\p{L}\\p{N}])" + esc(s.toLowerCase()) + "(?![\\p{L}\\p{N}])", "u"); return T.some((t) => re.test(t)); }).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const tenCau = (q) => (q.note ? q.ten : ten.get(q));
const { lo: loDA, chuLo } = doLo(kho, tenCau, LOI_DAN);
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu khác của kho (xem tay):\n" + chuLo.join("\n"));
const DA_XEM = [
  // dòng của tests/soat-nhap.js (dò lộ theo chuỗi 3 từ): câu kia nói chu kì 3 của nguyên tố khác (phosphorus, lựa chọn sai của câu potassium),
  // không nói gì về nguyên tố của câu này (argon)
  "khtn7-ck1-de1#7 → khtn7-ck1-ngau-nhien#6: chu kì 3",
  "khtn7-ck1-de2#7 → khtn7-ck1-ngau-nhien#6: chu kì 3",
];
assert.deepEqual(chuLo.filter((s) => !DA_XEM.includes(s)), [], "đáp án bằng chữ có ở câu khác của kho đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loDA, [], "lộ đáp án:\n" + loDA.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 165”, “là 2,2”, cả đáp án bằng chữ
{ const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x }), khac = tim("Chất nào sau đây là đơn chất?");
  const thuLo = (qs) => { const r = doLo(qs, (q) => q.q.slice(0, 10).replace(/:/g, "")); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*? lộ đáp án [^:]*: /, "")); };
  assert.deepEqual(thuLo([tim("đồ thị quãng đường – thời gian của một xe tải"), gia(khac, "Ví dụ tổng = 165 km.")]), [165]);
  assert.deepEqual(thuLo([tim("Bạn Lan đứng trước một gương phẳng lớn"), gia(khac, "Khoảng cách là 2,2 m.")]), ["2,2"]);
  assert.deepEqual(thuLo([tim("Dụng cụ gắn trên xe máy"), gia(khac, "Xe có tốc kế.")]), ["tốc kế"]);
  assert.deepEqual(thuLo([tim("đồ thị quãng đường – thời gian của một xe tải"), gia(khac, "Ví dụ 165 · 2 = 330.")]), []); }

/* ---------- không gần trùng câu của kho KHTN 6 (lời giao việc; Rút ra N25, như tests/toan7-ck1.js): đề bài cùng lựa chọn có từ 4 cặp từ
   liền nhau chung với một câu của data/banks/6-khtn.js và số cặp chung từ một nửa số cặp của câu ít cặp hơn thì báo. Cặp từ tính cả số;
   bỏ cách hỏi chung của đề KHTN (CUM), cặp của nhãn chủ đề và cặp có ở từ 3% số câu của hai file. ---------- */
{
  const CUM = ["mỗi ý sau đúng hay sai", "hình bên", "nhận xét nào sau đây đúng", "phát biểu nào sau đây đúng", "nào sau đây", "trong các", "chất nào sau đây là",
    "đúng hay sai", "khối lượng nguyên tử", "khối lượng phân tử"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/(\d),(?=\d)/g, "$1_").replace(/[^\p{L}\p{N}\s|_]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|") && c.split(" ").some((x) => x.length >= 2)); };
  const cauFile = (file) => BANKS.filter((b) => b.file === file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id));
  const lop6 = cauFile("6-khtn.js"), ca = lop6.concat(kho), df = {};
  assert.ok(lop6.length > 0, "có kho KHTN 6 để so");
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nhan.has(c) && (df[c] || 0) < 0.03 * ca.length)); };
  const P6 = lop6.map((p) => [p, capAm(p)]);
  const ganTrung = kho.flatMap((q) => { const c = capAm(q); return P6.map(([p, d]) => { const chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${p.q.slice(0, 50)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho KHTN 6:\n" + ganTrung.join("\n"));
  assert.deepEqual(ganTrung, [], "đề bài gần trùng câu của kho KHTN 6");
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (bỏ dấu, gộp nguyên âm), nếu có ----------
   Chuỗi 8 từ liền nhau của mọi trường chữ (đề bài, lựa chọn, lời giải, chữ trong hình) và lời dặn không có trong sách; cụm từ chung của môn
   (tên bài, cách hỏi chung, tên các bước của phương pháp tìm hiểu tự nhiên, tên dụng cụ đo) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ
   có chữ. Số liệu: số riêng của một câu (số thập phân, số lớn hơn 40, trừ 100, 1 000, 3 600, 60, 90, 180, 360 và số có ở từ 5% số trang)
   không có từ ba số cùng ở một trang của KHTN 7 (dò bối cảnh, số liệu của bài tập, ví dụ trong sách; DO_SACH=1 in các trang có từ hai số
   chung để xem). */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần (các vòng lặp lồng nhau gọi lại trên cùng chữ; kết quả như cũ)
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
// tra nhanh chuỗi k từ: băm mọi chuỗi k từ của chữ đã chuẩn hoá (một lần cho mỗi chữ, mỗi k), chỉ so thật (includes) khi băm có;
// kết quả như sach.includes(" " + c + " "), ds.filter((o) => o.s.includes(" " + c + " ")) mà không quét lại cả chữ cho mỗi chuỗi
const traChu = (() => {
  const bam = (w, k) => {
    const A = new Uint32Array(w.length), B = new Uint32Array(w.length), n = Math.max(0, w.length - k + 1), H = new Float64Array(n);
    for (let i = 0; i < w.length; i++) { let a = 0x811c9dc5, b = 0x1b873593; const t = w[i]; for (let j = 0; j < t.length; j++) { const x = t.charCodeAt(j); a = Math.imul(a ^ x, 0x01000193); b = Math.imul(b ^ x, 0x5bd1e995); } A[i] = a; B[i] = b; }
    for (let i = 0; i < n; i++) { let a = 0x9e3779b9, b = 0x85ebca6b; for (let j = i; j < i + k; j++) { a = Math.imul(a ^ A[j], 0x01000193); b = Math.imul(b ^ B[j], 0x5bd1e995); } H[i] = (a >>> 0) * 2097152 + (b >>> 11); }
    return H;
  };
  const co = (H, h) => { let l = 0, r = H.length - 1; while (l <= r) { const m = (l + r) >> 1; if (H[m] === h) return true; if (H[m] < h) l = m + 1; else r = m - 1; } return false; };
  const chuMot = new Map(), chuDs = new WeakMap();
  const bang = (m, k, tao) => { if (!m.has(k)) m.set(k, tao().sort()); return m.get(k); };
  return {
    co: (s, c) => { const w = c.split(" "); if (!chuMot.has(s)) chuMot.set(s, new Map()); return co(bang(chuMot.get(s), w.length, () => bam(s.split(" "), w.length)), bam(w, w.length)[0]) && s.includes(" " + c + " "); },
    loc: (ds, c) => {
      const w = c.split(" "), k = w.length;
      if (!chuDs.has(ds)) chuDs.set(ds, new Map());
      const H = bang(chuDs.get(ds), k, () => { const hs = ds.map((o) => bam(o.s.split(" "), k)), ra = new Float64Array(hs.reduce((a, h) => a + h.length, 0)); let i = 0; hs.forEach((h) => { ra.set(h, i); i += h.length; }); return ra; });
      return co(H, bam(w, k)[0]) ? ds.filter((o) => o.s.includes(" " + c + " ")) : [];
    },
  };
})();
const khongDau = nhoChuoi((s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim());
const TU_CHUNG = [...TEN_BAI, ...CHU_DE.map((c) => c[0]), "mỗi ý sau đúng hay sai", "nào sau đây", "đề xuất vấn đề cần tìm hiểu", "đưa ra dự đoán khoa học để giải quyết vấn đề", "lập kế hoạch kiểm tra dự đoán",
  "thực hiện kế hoạch kiểm tra dự đoán", "đồng hồ đo thời gian hiện số", "cổng quang điện", "bảng tuần hoàn các nguyên tố hoá học", "đồ thị quãng đường – thời gian"]
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
if (SACH.length) {
  assert.ok(SACH.some((f) => /khoa-hoc-tu-nhien-7/.test(f)), "OnUp-Book có Khoa học tự nhiên 7");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => chuCau(q).flatMap((s) => chuoi(s, k).filter((c) => traChu.co(sach, c)).map((c) => `${ten.get(q)}: ${c}`)))
    .concat(LOI_DAN.flatMap((d) => chuoi(d.q, k).filter((c) => traChu.co(sach, c)).map((c) => `${d.ten}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  // số liệu riêng của từng câu so với từng trang của KHTN 7
  const trang = fs.readFileSync(SACH.find((f) => /khoa-hoc-tu-nhien-7/.test(f)), "utf8").split(/(?==== page-\d+ · )/).map((p) => ({ ten: (/trang in (\d+)/.exec(p) || [])[1], so: new Set((p.match(/\d+(?:[ .]\d{3})*(?:,\d+)?/g) || []).map((x) => x.replace(/[ .](?=\d{3})/g, ""))) }));
  const dfSo = {}; trang.forEach((p) => p.so.forEach((x) => (dfSo[x] = (dfSo[x] || 0) + 1)));
  const soRieng = (q) => [...new Set((chuCau(q).join(" ").match(/\d{1,3}(?: \d{3})+(?:,\d+)?|\d+(?:,\d+)?/g) || []).map((x) => x.replace(/ /g, "")).filter((x) => (/,/.test(x) || (+x > 40 && ![100, 1000, 3600, 60, 90, 180, 360].includes(+x))) && (dfSo[x] || 0) < 0.05 * trang.length))];
  const soChung = kho.flatMap((q) => { const s = soRieng(q); return trang.map((p) => [p.ten, s.filter((x) => p.so.has(x))]).filter(([, c]) => c.length >= 2).map(([t, c]) => `${ten.get(q)} ~ trang ${t}: ${c.join("; ")} (câu có ${s.length} số)`); });
  if (process.env.DO_SACH) console.log("Trang sách có từ hai số liệu chung với một câu (xem tay):\n" + soChung.join("\n"));
  const SO_XEM = [
    "de1#17 ~ trang 47: 45; 120; 0,5 (câu có 8 số)", // số trên trục đồ thị xe tải; trang 47 là bài tập đi xe đạp (6 h 45 min, 0,5 h) và tốc độ của báo gê-pa (120 km/h)
  ];
  assert.deepEqual(soChung.filter((s) => /: (.+) \(/.exec(s)[1].split("; ").length >= 3 && !SO_XEM.includes(s)), [], "trang sách có từ ba số liệu chung với một câu");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");

/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác ---------- */
{
  const khac = BANKS.filter((b) => !b.pool && b.file !== "7-khtn.js").flatMap((b) => b.questions.map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " })))
    .concat(BANKS.filter((b) => b.pool && b.file !== "7-khtn.js").flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " }))));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại hoặc đọc lại hình (" + [S.de1, S.de2].map((id) => bank(id).questions.length).join(" + ") + " câu của 2 đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + kho.length + " câu, " + hinh.length + " hình, ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề: " + theoPhan.map(([t, , , k]) => t + " " + k).join(", ") + "; đáp án đúng dài nhất + ngắn nhất ở " + daiNgan.join(", ") + " câu nhiều lựa chọn.");
console.log("MATH OK");
