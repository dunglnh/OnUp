// Tính lại đáp án và kiểm tra ma trận hai ngân hàng lớp 6 giữa kì II của Phiên N12: Lịch sử và Địa lí (data/banks/6-lsdl.js) và
// GDCD (6-gdcd.js). Mỗi ngân hàng = Đề 1 + Đề 2 (25 câu mỗi đề, cùng chia theo ma trận) + đề ngẫu nhiên không có câu riêng.
// Câu có phép tính hoặc có hình được nhận ra bằng một đoạn chữ của đề (has, đúng một câu trong hai kho, đúng đề ghi ở id); so đáp
// án với kết quả tính bằng code: điền khuyết ans[0], trả lời bằng số ans, trắc nghiệm o[0]. Lịch sử và Địa lí: số năm (từ năm TCN
// đến năm Công nguyên: cộng hai số năm, như các ngân hàng trước), nhiệt độ trung bình ngày, năm, tổng lượng mưa năm (đọc số liệu
// trong đề); câu có hình đọc lại hình: biểu đồ nhiệt độ, lượng mưa (cột lượng mưa đọc theo trục trái, chấm của đường nhiệt độ đọc
// theo trục phải, tháng theo chữ số dưới trục; tháng nóng nhất, mưa nhiều nhất, các tháng mưa từ 100 mm, biên độ nhiệt) và sơ đồ
// vòng tuần hoàn lớn của nước (mũi tên đi từ vùng nào tới vùng nào: biển, đất liền, mây trên biển, mây trên đất liền; số trong
// vòng tròn đặt cạnh mũi tên nào). GDCD: số tuần để dành đủ tiền. Câu trả lời bằng số và câu điền có đáp án là số nào trong hai kho
// cũng phải có kiểm tra ở đây; câu có hình nào cũng phải được đọc lại hình (docBieuDo, docVongTuanHoan).
// Cuối cùng kiểm tra mức độ và ma trận: mọi câu có lv; ma trận 10 Biết, 8 Hiểu, 7 Vận dụng, chủ đề theo thứ tự bài như hai đề; cả
// hai đề chia đúng theo ma trận (nên ô nào cũng có gấp đôi số câu ô đó rút); mỗi kho có ít nhất 3 câu đúng/sai 4 ý, không có câu
// tự luận; rút thử nhiều lần ra đúng ma trận, không ghi chú; học sinh đã làm hết một đề cố định thì đề ngẫu nhiên rút đúng 25 câu
// của đề kia.
// Chạy: node tests/lsdl-gdcd6-gk2.js → in MATH OK.
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
const L = ma("lsdl"), G = ma("gdcd");

/* ---------- số ---------- */
const close = (x, y) => Math.abs(x - y) < 1e-9;
const sum = (a) => a.reduce((s, v) => s + v, 0);
const soSau = (s, mark) => { const i = s.indexOf(mark); assert.ok(i >= 0, "thiếu “" + mark + "”"); return s.slice(i + mark.length).split(".")[0].split(",").map((t) => +t.trim()); };

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const daDoc = new Set(); // hình đã đọc lại bằng code

/* Biểu đồ nhiệt độ, lượng mưa: đường lưới nằm ngang (nét màu line); số ở đầu trái mỗi đường lưới (text-anchor="end") là lượng
   mưa (mm), số ở đầu phải là nhiệt độ (°C); chữ số 1–12 dưới đáy là tháng. Cột lượng mưa: hình chữ nhật tô acc-soft đứng trên
   đường đáy; nhiệt độ: chấm tròn màu bad trong vùng vẽ, nối bằng một đường gấp khúc màu bad. Trả về {mua, nhiet} theo tháng 1–12. */
const docBieuDo = (svg) => {
  daDoc.add(svg);
  const lu = tags(svg, "line").filter((l) => l.stroke === "line");
  assert.ok(lu.length >= 5 && lu.every((l) => num(l, "y1") === num(l, "y2")), "đường lưới nằm ngang");
  const x0 = Math.min(...lu.map((l) => num(l, "x1"))), x1 = Math.max(...lu.map((l) => num(l, "x2"))), ys = lu.map((l) => num(l, "y1")).sort((a, b) => a - b);
  const day = ys[ys.length - 1], dinh = ys[0], tx = texts(svg);
  // trục: số đặt ngay cạnh đầu một đường lưới (chân chữ thấp hơn đường lưới 5 đơn vị)
  const truc = (side) => tx.filter((t) => /^\d+$/.test(t.t) && (side === "trai" ? t["text-anchor"] === "end" && +t.x < x0 : +t.x > x1)).map((t) => {
    const y = ys.find((g) => close(g, +t.y - 5));
    assert.ok(y !== undefined, `số ${t.t} ở trục ${side} phải đặt ngay cạnh một đường lưới`);
    return { v: +t.t, y };
  });
  const thang = (lb) => {
    assert.equal(lb.length, ys.length, "đường lưới nào cũng có số ở hai trục");
    lb.sort((a, b) => b.y - a.y);
    assert.ok(lb[0].v === 0 && lb[0].y === day, "số 0 ở đường đáy");
    const k = (lb[0].y - lb[1].y) / (lb[1].v - lb[0].v);
    lb.forEach((l) => assert.ok(close(l.y, day - k * l.v), `số ${l.v} không đặt đúng vạch`));
    return (y) => (day - y) / k;
  };
  const muaTheoY = thang(truc("trai")), nhietTheoY = thang(truc("phai"));
  const thangX = tx.filter((t) => /^\d+$/.test(t.t) && t["text-anchor"] === "middle" && +t.y > day).map((t) => ({ m: +t.t, x: +t.x }));
  assert.deepEqual(thangX.map((t) => t.m), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], "chữ số tháng 1–12 dưới đáy");
  const thangCua = (x) => { const g = thangX.filter((t) => Math.abs(t.x - x) < 1); assert.equal(g.length, 1, "cột, chấm phải đứng thẳng trên chữ số tháng"); return g[0].m; };
  const mua = Array(12).fill(null), nhiet = Array(12).fill(null);
  tags(svg, "rect").filter((r) => r.fill === "acc-soft" && num(r, "y") + num(r, "height") === day).forEach((r) => {
    const m = thangCua(num(r, "x") + num(r, "width") / 2);
    assert.equal(mua[m - 1], null, "mỗi tháng một cột"); mua[m - 1] = Math.round(muaTheoY(num(r, "y")) * 1000) / 1000;
  });
  const cham = tags(svg, "circle").filter((c) => c.fill === "bad" && num(c, "cy") >= dinh && num(c, "cy") <= day);
  cham.forEach((c) => { const m = thangCua(num(c, "cx")); assert.equal(nhiet[m - 1], null, "mỗi tháng một chấm"); nhiet[m - 1] = Math.round(nhietTheoY(num(c, "cy")) * 1000) / 1000; });
  assert.ok(mua.every((v) => v !== null) && nhiet.every((v) => v !== null), "đủ 12 cột và 12 chấm");
  const duong = tags(svg, "polyline").filter((p) => p.stroke === "bad");
  assert.equal(duong.length, 1, "một đường nhiệt độ");
  assert.deepEqual(pts(duong[0].points), cham.map((c) => [num(c, "cx"), num(c, "cy")]), "đường nhiệt độ nối đúng các chấm");
  assert.ok(texts(svg).some((t) => t.t === "Lượng mưa (mm)") && texts(svg).some((t) => t.t === "Nhiệt độ (°C)"), "chú giải ghi đơn vị");
  return { mua, nhiet };
};
const viTriLon = (a) => { const m = Math.max(...a), i = a.indexOf(m); assert.equal(a.lastIndexOf(m), i, "giá trị lớn nhất chỉ ở một tháng"); return i + 1; };
const viTriNho = (a) => { const m = Math.min(...a), i = a.indexOf(m); assert.equal(a.lastIndexOf(m), i, "giá trị nhỏ nhất chỉ ở một tháng"); return i + 1; };

/* Sơ đồ vòng tuần hoàn lớn của nước: biển là hình chữ nhật tô acc-soft, đất liền là đa giác tô ok-soft, mây là hình bầu dục tô
   surface; mỗi vùng có chữ tên vùng ở bên trong. Mũi tên là đường kẻ cộng tam giác tô ink (đỉnh xa điểm đầu đường kẻ nhất là mũi);
   số của mũi tên ghi trong vòng tròn nhỏ (r = 11) đặt gần mũi tên đó nhất. Trả về {số: "vùng đầu→vùng cuối"}. */
const trongDaGiac = (p, poly) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) c = !c; } return c; };
const segDist = (p, a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy))); return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy); };
const docVongTuanHoan = (svg) => {
  daDoc.add(svg);
  const tx = texts(svg), [bien] = tags(svg, "rect").filter((r) => r.fill === "acc-soft"), [dat] = tags(svg, "polygon").filter((p) => p.fill === "ok-soft");
  assert.ok(bien && dat, "có biển và đất liền");
  const dl = pts(dat.points), inBien = (p) => p[0] >= num(bien, "x") && p[0] <= num(bien, "x") + num(bien, "width") && p[1] >= num(bien, "y") && p[1] <= num(bien, "y") + num(bien, "height");
  const may = tags(svg, "ellipse").filter((e) => e.fill === "surface"), inMay = (p, e) => ((p[0] - num(e, "cx")) / num(e, "rx")) ** 2 + ((p[1] - num(e, "cy")) / num(e, "ry")) ** 2 <= 1;
  assert.equal(may.length, 2, "hai đám mây");
  const chu = (t) => tx.filter((x) => x.t === t).map((x) => [+x.x, +x.y - 5]);
  assert.ok(chu("Biển").length === 1 && inBien(chu("Biển")[0]) && chu("Đất liền").length === 1 && trongDaGiac(chu("Đất liền")[0], dl), "tên biển, đất liền nằm trong vùng");
  may.forEach((e) => assert.ok(chu("Mây").some((p) => inMay(p, e)), "chữ Mây nằm trong đám mây"));
  const tenMay = (e) => (num(e, "cx") <= num(bien, "x") + num(bien, "width") ? "Mây trên biển" : "Mây trên đất liền");
  assert.deepEqual(may.map(tenMay).sort(), ["Mây trên biển", "Mây trên đất liền"], "một đám mây trên biển, một đám mây trên đất liền");
  const vung = (p) => { const m = may.find((e) => inMay(p, e)); return m ? tenMay(m) : inBien(p) ? "Biển" : trongDaGiac(p, dl) ? "Đất liền" : "?"; };
  const dauMui = tags(svg, "polygon").filter((p) => p.fill === "ink");
  const muiTen = tags(svg, "line").filter((l) => !l.stroke).map((l) => {
    const a = [num(l, "x1"), num(l, "y1")], b = [num(l, "x2"), num(l, "y2")];
    const h = dauMui.filter((p) => { const v = pts(p.points); return Math.hypot((v[1][0] + v[2][0]) / 2 - b[0], (v[1][1] + v[2][1]) / 2 - b[1]) < 0.2; });
    assert.equal(h.length, 1, "mỗi đường kẻ một đầu mũi tên ở cuối");
    const mui = pts(h[0].points).reduce((m, p) => (Math.hypot(p[0] - a[0], p[1] - a[1]) > Math.hypot(m[0] - a[0], m[1] - a[1]) ? p : m));
    return { a, mui, tu: vung(a), den: vung(mui) };
  });
  assert.equal(muiTen.length, 4, "bốn mũi tên");
  const out = {};
  tags(svg, "circle").filter((c) => c.fill === "surface" && num(c, "r") === 11).forEach((c) => {
    const p = [num(c, "cx"), num(c, "cy")], t = tx.filter((x) => /^\d$/.test(x.t) && close(+x.x, p[0]) && close(+x.y, p[1] + 5));
    assert.equal(t.length, 1, "mỗi vòng tròn ghi một số");
    const d = muiTen.map((m) => segDist(p, m.a, m.mui)).sort((x, y) => x - y), m = muiTen.find((x) => close(segDist(p, x.a, x.mui), d[0]));
    assert.ok(d[0] < 25 && d[1] - d[0] > 10, "số " + t[0].t + " phải đặt gần đúng một mũi tên");
    out[t[0].t] = m.tu + "→" + m.den;
  });
  assert.deepEqual(Object.keys(out).sort(), ["1", "2", "3", "4"], "bốn số 1–4");
  return out;
};
// bốn quá trình của vòng tuần hoàn lớn: lựa chọn trong câu hỏi và chữ trong lời giải ("số k là …")
const QUA_TRINH = {
  "Biển→Mây trên biển": { o: "Nước biển bốc hơi, bay lên cao ngưng tụ thành mây", x: "là nước biển bốc hơi" },
  "Mây trên biển→Mây trên đất liền": { o: "Gió đưa mây từ biển vào đất liền", x: "là gió đưa mây vào đất liền" },
  "Mây trên đất liền→Đất liền": { o: "Mây gặp lạnh, mưa rơi xuống đất liền", x: "mây gặp lạnh, gây mưa" },
  "Đất liền→Biển": { o: "Nước theo sông, suối, dòng chảy ngầm đổ ra biển", x: "là nước theo sông, suối, dòng chảy ngầm trở về biển" }
};

/* ---------- các câu cần tính ----------
   id: đề chứa câu; has: đoạn chữ của đề; right(q): đáp án tính bằng code (so với ans[0], ans hoặc o[0]); more(q): kiểm tra thêm. */
const CHECKS = [
  // Lịch sử và Địa lí: Đề 1
  { id: L.de1, has: "Khoảng năm 208 TCN, Thục Phán lập ra nhà nước Âu Lạc. Tính đến năm 2026", right: (q) => { assert.equal(q.unit, "năm"); return 208 + 2026; }, more: (q) => assert.ok(q.x.includes("208 + 2026 = 2 234")) }, // từ năm TCN đến năm CN: cộng hai số năm
  { id: L.de1, has: "kéo dài từ năm 179 TCN đến năm 938", right: (q) => { assert.equal(q.unit, "năm"); return 179 + 938; }, more: (q) => assert.ok(q.x.includes("179 + 938 = 1 117") && q.x.includes("hơn một nghìn năm")) },
  { id: L.de1, has: "nhiệt kế đo nhiệt độ không khí được đặt trong lều khí tượng, cách mặt đất ___ m", right: () => "1,5" }, // số liệu của sách, không phải phép tính
  { id: L.de1, has: "Một trạm khí tượng đo nhiệt độ không khí trong ngày", right: (q) => {
    const m = [...q.q.matchAll(/lúc (\d+) giờ là (\d+) °C/g)];
    assert.deepEqual(m.map((x) => +x[1]), [1, 7, 13, 19], "đo lúc 1, 7, 13, 19 giờ như các trạm khí tượng ở Việt Nam");
    const t = m.map((x) => +x[2]); assert.equal(q.unit, "°C"); assert.ok(q.x.includes(`(${t.join(" + ")}) : 4 = ${sum(t)} : 4`));
    return sum(t) / 4; } },
  { id: L.de1, has: "tháng có nhiệt độ cao nhất và tháng có lượng mưa lớn nhất lần lượt là", right: (q) => {
    const { mua, nhiet } = docBieuDo(q.svg), t = viTriLon(nhiet), r = viTriLon(mua);
    assert.ok(q.x.includes(`tháng ${t} (${Math.max(...nhiet)} °C)`) && q.x.includes(`tháng ${r} (${Math.max(...mua)} mm)`), "lời giải ghi đúng số liệu đọc trên biểu đồ");
    assert.ok(Math.max(...nhiet) - [...nhiet].sort((a, b) => b - a)[1] >= 2 && Math.max(...mua) - [...mua].sort((a, b) => b - a)[1] >= 40, "đỉnh của đường, cột cao nhất nhìn rõ");
    return `Tháng ${t} và tháng ${r}`; } },
  { id: L.de1, has: "biên độ nhiệt năm) ở địa điểm C", right: (q) => {
    const { nhiet } = docBieuDo(q.svg), hi = Math.max(...nhiet), lo = Math.min(...nhiet), t = viTriLon(nhiet), c = viTriNho(nhiet);
    assert.ok(hi % 5 === 0 && lo % 5 === 0, "tháng nóng nhất, lạnh nhất nằm đúng trên đường lưới (đọc được chính xác)");
    assert.ok(q.tol === 1 && q.unit === "°C" && q.x.includes(`tháng ${t} (${hi} °C)`) && q.x.includes(`tháng ${c} (${lo} °C)`) && q.x.includes(`${hi} − ${lo} = ${hi - lo}`));
    return hi - lo; } },
  { id: L.de1, has: "Mũi tên số 3 thể hiện quá trình nào", right: (q) => {
    const so = docVongTuanHoan(q.svg);
    assert.deepEqual(Object.values(so).sort(), Object.keys(QUA_TRINH).sort(), "bốn mũi tên là bốn quá trình khác nhau");
    assert.deepEqual([...q.o].sort(), Object.values(QUA_TRINH).map((p) => p.o).sort(), "bốn lựa chọn là bốn quá trình");
    Object.entries(so).forEach(([k, v]) => assert.ok(k === "3" ? q.x.startsWith("Mũi tên số 3 đi từ đám mây trên đất liền xuống mặt đất: " + QUA_TRINH[v].x) : q.x.toLowerCase().includes(`số ${k} ${QUA_TRINH[v].x}`), "lời giải số " + k));
    return QUA_TRINH[so["3"]].o; } },
  // Lịch sử và Địa lí: Đề 2
  { id: L.de2, has: "Nhiệt độ trung bình các tháng (°C) ở một địa điểm", right: (q) => {
    const t = soSau(q.q, "lần lượt là:"); assert.equal(t.length, 12); assert.equal(q.unit, "°C");
    assert.ok(q.x.includes(`(${t.join(" + ")}) : 12 = ${sum(t)} : 12`)); return sum(t) / 12; } },
  { id: L.de2, has: "mùa mưa ở địa điểm B kéo dài từ tháng nào đến tháng nào", right: (q) => {
    const { mua } = docBieuDo(q.svg), mm = mua.map((v, i) => (v >= 100 ? i + 1 : 0)).filter(Boolean);
    assert.ok(mm.every((m, i) => !i || m === mm[i - 1] + 1), "các tháng mưa từ 100 mm liền nhau");
    assert.ok(mua.every((v) => Math.abs(v - 100) >= 20), "không cột nào sát vạch 100 mm (nhìn rõ cao hay thấp hơn)");
    assert.ok(q.x.includes(`từ tháng ${mm[0]} đến tháng ${mm[mm.length - 1]}`) && q.x.includes(`tháng ${viTriLon(mua)}`));
    return `Từ tháng ${mm[0]} đến tháng ${mm[mm.length - 1]}`; } },
  { id: L.de2, has: "Lượng mưa trung bình các tháng (mm) của địa điểm D", right: (q) => {
    const r = soSau(q.q, "lần lượt là:"); assert.equal(r.length, 12); assert.equal(q.unit, "mm");
    assert.ok(q.x.includes(`${r.join(" + ")} = 1 664`)); return sum(r); } },
  // GDCD: Đề 2
  { id: G.de2, has: "Mỗi tuần Duy để dành được 25 000 đồng", right: (q) => { assert.ok(q.q.includes("giá 150 000 đồng") && q.unit === "tuần"); return Math.ceil(150000 / 25000); } }
];

const KHO = {}; // mã pool → câu trong kho (câu của hai đề, mỗi câu ghi src)
[L, G].forEach((s) => {
  const p = bank(s.pool), d1 = bank(s.de1), d2 = bank(s.de2);
  assert.ok(p && d1 && d2, "thiếu đề của " + s.pool);
  assert.deepEqual(p.pool.from, [s.de1, s.de2], s.pool + ": from là Đề 1 và Đề 2");
  assert.ok(d1.minutes === d2.minutes && d2.minutes === p.minutes, s.pool + ": cùng số phút");
  assert.equal(d1.questions.length, 25); assert.equal(d2.questions.length, 25);
  KHO[s.pool] = p.questions;
  assert.equal(p.questions.length, 50, s.pool + ": 50 câu, không có câu riêng");
});
const kho = Object.values(KHO).flat();
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
// câu trả lời bằng số, câu điền có đáp án là số và câu có hình nào cũng phải được tính lại ở trên
kho.filter((q) => q.type === "num" || q.svg || (q.type === "fill" && /^[\d\s,.−-]+$/.test(q.ans[0]))).forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + q.q.slice(0, 60)));

/* ---------- mức độ và ma trận ---------- */
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
[L, G].forEach((s) => {
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
  // học sinh đã làm hết một đề cố định (đúng cả) thì đề ngẫu nhiên rút đúng 25 câu của đề kia
  [[s.de1, s.de2], [s.de2, s.de1]].forEach(([lam, con]) => {
    const hist = (q) => (q.src === lam ? { done: 1, wrong: 0 } : null); // lịch sử câu như PoolHist
    for (let k = 0; k < 30; k++) {
      const d = Quiz.draw(p, hist);
      assert.equal(d.notes.length, 0); assert.equal(d.questions.length, 25);
      assert.ok(d.questions.every((q) => q.src === con), `${s.pool}: đã làm hết ${lam} thì rút toàn câu của ${con}`);
    }
  });
});
console.log(n, "câu đã tính lại hoặc đọc lại hình (hai ngân hàng); kho " + kho.length + " câu, 2 ma trận 10 – 8 – 7.");
console.log("MATH OK");
