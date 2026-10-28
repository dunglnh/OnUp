// Tính lại đáp án và kiểm tra ma trận hai ngân hàng lớp 9 cuối kì I của Phiên N9-ck1-lsdl-gdcd: Lịch sử và Địa lí (data/banks/9-lsdl.js)
// và GDCD (9-gdcd.js), theo mẫu tests/lsdl-gdcd6-ck2.js. Mỗi ngân hàng = các đề cố định trong from của đề ngẫu nhiên (cùng chia theo ma
// trận) + đề ngẫu nhiên không có câu riêng; số câu, số đề lấy từ danh mục. Câu có phép tính, có hình, câu sắp xếp được nhận ra bằng một
// đoạn chữ của đề (has, đúng một câu trong hai kho, đúng đề ghi ở id); so đáp án với kết quả tính bằng code: điền ans[0], trả lời bằng số
// ans, trắc nghiệm o[0], đúng/sai 4 ý a, sắp xếp o. Lịch sử và Địa lí: số năm (đọc các năm trong đề), thế kỉ của một năm trong ý đúng/sai,
// trình tự các sự kiện (ý “A trước khi B” của câu đúng/sai 4 ý, câu sắp xếp; bảng ngày tháng theo sách), tỉ số giới tính, cơ cấu dân số
// vàng, già hoá dân số (ngưỡng của sách), tỉ lệ dân thành thị, mật độ dân số, năng suất lúa, tỉ trọng, mức giảm phần trăm; bốn hình đọc
// lại bằng code: biểu đồ tròn (góc của từng phần khớp số phần trăm ghi trong phần, chú giải, năm dưới mỗi hình), biểu đồ cột và cột ghép
// (trục số bên trái, số ở đỉnh cột, năm dưới cột, chú giải), sơ đồ vị trí tiếp giáp (hướng của từng ô so với ô giữa, mũi tên chỉ hướng
// bắc). GDCD: hai câu tính thời gian. Câu trả lời bằng số, câu điền có đáp án là số, câu có hình, câu sắp xếp nào trong hai kho cũng
// phải có kiểm tra ở đây.
// Rồi kiểm tra mức độ và ma trận: mọi câu có lv; ma trận 40% Biết, 32% Hiểu, 28% Vận dụng (10 – 8 – 7 với đề 25 câu), chủ đề theo thứ
// tự bài như các đề; đề nào cũng chia đúng theo ma trận, nên ô nào cũng có số câu gấp số đề lần số câu ô đó rút; số câu Lịch sử, Địa lí
// của mỗi đề ghi đúng ở note; mỗi kho có ít nhất 4 câu đúng/sai 4 ý (kiểu Đ/S không lặp quá một phần ba), không có câu tự luận; đáp án
// đúng không dài hơn hẳn các lựa chọn sai (Rút ra N22), là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa
// chọn (Rút ra N9-ck1-tin-congnghe); đáp án không lặp chữ của nhãn chủ đề (trừ khi mọi lựa chọn cùng có chữ đó); rút
// thử nhiều lần ra đúng ma trận, không ghi chú, gặp đủ câu của kho; học sinh đã làm hết một đề cố định thì đề ngẫu nhiên không rút lại
// câu của đề đó. Cuối cùng: đề bài không trùng câu nào khác trong file; dò lộ đáp án giữa các câu rút được cùng lúc (bộ dò của
// tests/lsdl-gdcd6-ck2.js, tự thử với câu cố ý lộ; DO_LO=1 in đáp án bằng chữ có ở câu kia, danh sách đã xem ở DA_XEM); có OnUp-Book
// thì so mọi trường chữ với chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm; không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và với
// câu của mọi kho khác (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 5 từ).
// Chạy: node tests/lsdl-gdcd9-ck1.js → in MATH OK.
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
const L = { pool: "lsdl9-ck1-ngau-nhien" }, G = { pool: "gdcd9-ck1-ngau-nhien" };
[L, G].forEach((s) => {
  const p = bank(s.pool); assert.ok(p && p.pool, "thiếu đề ngẫu nhiên " + s.pool);
  s.from = p.pool.from; s.de1 = s.from[0]; s.de2 = s.from[1]; s.file = p.file;
  assert.ok(s.from.length >= 2 && s.from.every((id) => bank(id) && bank(id).file === p.file), s.pool + ": from là các đề cố định cùng file");
});

/* ---------- số ---------- */
const close = (x, y) => Math.abs(x - y) < 1e-9;
const sum = (a) => a.reduce((s, v) => s + v, 0);
const val = (s) => +String(s).replace(/\s/g, "").replace(",", "."); // “2 400 000” → 2400000, “2,5” → 2.5
const vn = (x) => { const [n, d] = String(x).split("."); return n.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : ""); }; // 2400000 → “2 400 000”
const nam = (s) => [...s.matchAll(/năm (\d{1,4})(?!\d| \d)/gi)].map((m) => +m[1]); // các năm ghi trong đề, theo thứ tự
const LA_MA = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"];
const theKi = (y) => LA_MA[Math.floor((y - 1) / 100)]; // năm sau Công nguyên: 1–100 thế kỉ I, 101–200 thế kỉ II…
const lech = (a, b) => Math.abs(((((a - b) % 360) + 540) % 360) - 180); // độ lệch giữa hai góc (độ)

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const ngang = (l) => num(l, "y1") === num(l, "y2");
const daDoc = new Set(); // hình đã đọc lại bằng code
// trục số: các số đặt ngay cạnh vạch (chân chữ thấp hơn vạch 5 đơn vị), cách đều theo giá trị; trả về hàm đổi toạ độ y ra giá trị
const trucSo = (nhan, vach, ten) => {
  assert.ok(nhan.length >= 3, ten + ": cần ít nhất 3 số trên trục");
  nhan.forEach((n) => assert.ok(vach.some((y) => close(y, n.y - 5)), `${ten}: số ${n.v} phải đặt ngay cạnh một vạch`));
  const s = [...nhan].sort((a, b) => a.v - b.v), k = (s[0].y - s[1].y) / (s[1].v - s[0].v);
  assert.ok(k > 0, ten + ": số lớn ở trên");
  s.forEach((n) => assert.ok(close(n.y - 5, s[0].y - 5 - k * (n.v - s[0].v)), `${ten}: số ${n.v} không đặt đúng vạch`));
  return (y) => s[0].v + (s[0].y - 5 - y) / k;
};
// chú giải: ô màu nhỏ, chữ cùng hàng ngay bên phải (chân chữ thấp hơn mép trên ô 13 đơn vị)
const chuGiaiCua = (svg, o) => o.map((r) => {
  const t = texts(svg).filter((x) => close(+x.y, num(r, "y") + 13) && +x.x > num(r, "x") + num(r, "width") && +x.x < num(r, "x") + num(r, "width") + 12);
  assert.equal(t.length, 1, "ô chú giải nào cũng có chữ"); return { fill: r.fill, ten: t[0].t };
});

/* Biểu đồ cột (một hay hai dãy cột): đường lưới nằm ngang (nét màu line), số ở đầu trái mỗi đường lưới (text-anchor="end") là giá trị;
   cột là hình chữ nhật đứng trên đường đáy, số ghi ở đỉnh cột (giữa cột, cao hơn đỉnh 6 đơn vị), năm ghi dưới đáy (giữa cột, hay giữa
   nhóm cột khi có hai dãy); hai dãy cột thì chú giải là các ô màu dưới đáy. Trả về [{ nam, v }] (một dãy) hay { nam: { dãy: v } }. */
const docCot = (svg, donVi) => {
  daDoc.add(svg);
  const lu = tags(svg, "line").filter((l) => l.stroke === "line");
  assert.ok(lu.length >= 4 && lu.every(ngang), "đường lưới nằm ngang");
  const x0 = Math.min(...lu.map((l) => num(l, "x1"))), ys = lu.map((l) => num(l, "y1")), day = Math.max(...ys), tx = texts(svg);
  const giaTri = trucSo(tx.filter((t) => /^\d[\d ]*$/.test(t.t) && t["text-anchor"] === "end" && +t.x < x0).map((t) => ({ v: val(t.t), y: +t.y })), ys, "trục số");
  assert.equal(Math.round(giaTri(day)), 0, "số 0 ở đường đáy");
  assert.ok(tx.some((t) => t.t === donVi && !t["text-anchor"] && +t.y < Math.min(...ys)), "trục ghi đơn vị " + donVi);
  const hcn = tags(svg, "rect"), chuGiai = chuGiaiCua(svg, hcn.filter((r) => num(r, "y") > day));
  const namDuoi = tx.filter((t) => t["text-anchor"] === "middle" && +t.y > day && /^\d{4}$/.test(t.t));
  const cot = hcn.filter((r) => num(r, "y") <= day).map((r) => {
    assert.ok(close(num(r, "y") + num(r, "height"), day), "cột đứng trên đường đáy");
    const cx = num(r, "x") + num(r, "width") / 2, v = Math.round(giaTri(num(r, "y")) * 1000) / 1000;
    const dinh = tx.filter((t) => t["text-anchor"] === "middle" && close(+t.x, cx) && +t.y < day);
    assert.equal(dinh.length, 1, "mỗi cột một số ở đỉnh"); assert.ok(close(+dinh[0].y, num(r, "y") - 6), "số ghi ngay trên đỉnh cột");
    assert.equal(val(dinh[0].t), v, `số ở đỉnh cột (${dinh[0].t}) khớp chiều cao cột (${v})`);
    const n = [...namDuoi].sort((a, b) => Math.abs(+a.x - cx) - Math.abs(+b.x - cx))[0];
    assert.ok(n && Math.abs(+n.x - cx) < 30, "cột nào cũng có năm ở dưới");
    const d = chuGiai.find((c) => c.fill === r.fill);
    if (chuGiai.length) assert.ok(d, "màu cột có trong chú giải");
    return { nam: +n.t, v, day: d && d.ten };
  });
  if (!chuGiai.length) {
    assert.ok(cot.length >= 4 && new Set(cot.map((c) => c.nam)).size === cot.length, "biểu đồ một dãy: ít nhất 4 cột, mỗi năm một cột");
    return cot.sort((a, b) => a.nam - b.nam).map(({ nam, v }) => ({ nam, v }));
  }
  const out = {};
  cot.forEach((c) => { out[c.nam] = out[c.nam] || {}; assert.equal(out[c.nam][c.day], undefined, "mỗi năm một cột của mỗi dãy"); out[c.nam][c.day] = c.v; });
  Object.values(out).forEach((g) => assert.deepEqual(Object.keys(g).sort(), chuGiai.map((c) => c.ten).sort(), "năm nào cũng đủ các dãy cột"));
  return out;
};

/* Biểu đồ tròn: mỗi phần là một hình quạt (path “M tâm L đầu cung A r r 0 cờ 1 cuối cung Z”), tô màu theo chú giải; số phần trăm ghi
   trong hình quạt; các phần nối tiếp nhau, đủ một vòng; năm ghi dưới mỗi hình (“Năm 2015”). Trả về { năm: { nhóm: phần trăm } }. */
const docTron = (svg) => {
  daDoc.add(svg);
  const tx = texts(svg), chuGiai = chuGiaiCua(svg, tags(svg, "rect"));
  assert.equal(new Set(chuGiai.map((c) => c.fill)).size, chuGiai.length, "mỗi ô chú giải một màu");
  const goc = (cx, cy, x, y) => (Math.atan2(y - cy, x - cx) * 180) / Math.PI, hinh = {};
  tags(svg, "path").forEach((p) => {
    const m = /^M ([\d.]+) ([\d.]+) L ([\d.]+) ([\d.]+) A ([\d.]+) ([\d.]+) 0 ([01]) 1 ([\d.]+) ([\d.]+) Z$/.exec(p.d);
    assert.ok(m, "phần của biểu đồ tròn là một hình quạt: " + p.d);
    const [cx, cy, x0, y0, r, r2, lon, x1, y1] = m.slice(1).map(Number);
    assert.ok(r === r2 && Math.abs(Math.hypot(x0 - cx, y0 - cy) - r) < 0.15 && Math.abs(Math.hypot(x1 - cx, y1 - cy) - r) < 0.15, "hai đầu cung nằm trên đường tròn");
    const a0 = goc(cx, cy, x0, y0), a1 = goc(cx, cy, x1, y1), d = (((a1 - a0) % 360) + 360) % 360;
    assert.equal(lon, d > 180 ? 1 : 0, "cờ cung lớn khớp số đo của phần");
    const c = chuGiai.find((g) => g.fill === p.fill); assert.ok(c, "màu của phần có trong chú giải");
    const nhan = tx.filter((t) => /^\d+%$/.test(t.t) && Math.hypot(+t.x - cx, +t.y - 5 - cy) < r && (((goc(cx, cy, +t.x, +t.y - 5) - a0) % 360) + 360) % 360 < d);
    assert.equal(nhan.length, 1, "mỗi phần một số phần trăm ở trong");
    const k = cx + "," + cy; (hinh[k] = hinh[k] || { cx, cy, r, phan: [] }).phan.push({ a0, a1, d, ten: c.ten, v: parseInt(nhan[0].t, 10) });
  });
  const out = {};
  Object.values(hinh).forEach((h) => {
    assert.ok(Math.abs(sum(h.phan.map((p) => p.d)) - 360) < 0.5, "các phần đủ một vòng tròn");
    h.phan.forEach((p, i) => {
      assert.ok(lech(h.phan[(i + 1) % h.phan.length].a0, p.a1) < 0.5, "các phần nối tiếp nhau");
      assert.ok(Math.abs(p.d / 3.6 - p.v) < 0.3, `phần “${p.ten}”: góc ${p.d.toFixed(1)}° khớp ${p.v}%`);
    });
    assert.equal(sum(h.phan.map((p) => p.v)), 100, "các phần cộng lại 100%");
    assert.deepEqual(h.phan.map((p) => p.ten).sort(), chuGiai.map((c) => c.ten).sort(), "mỗi hình đủ các nhóm của chú giải");
    const n = tx.filter((x) => /^Năm \d{4}$/.test(x.t) && close(+x.x, h.cx) && +x.y > h.cy + h.r);
    assert.equal(n.length, 1, "mỗi biểu đồ tròn một năm ở dưới");
    out[n[0].t.slice(4)] = Object.fromEntries(h.phan.map((p) => [p.ten, p.v]));
  });
  return out;
};

/* Sơ đồ vị trí tiếp giáp: các ô chữ nhật có chữ ở trong; ô giữa ghi tên vùng (“Vùng …”), mỗi ô khác ở một trong tám hướng so với ô
   giữa (lệch không quá 15°); mũi tên chỉ hướng bắc: đoạn thẳng đứng, đầu mũi tên ở trên, chữ B trên đầu mũi tên. Trả về { vung, huong }. */
const docViTri = (svg) => {
  daDoc.add(svg);
  const tx = texts(svg), o = tags(svg, "rect").map((r) => {
    const x = num(r, "x"), y = num(r, "y"), w = num(r, "width"), h = num(r, "height");
    const chu = tx.filter((t) => +t.x > x && +t.x < x + w && +t.y > y && +t.y < y + h).sort((a, b) => +a.y - +b.y).map((t) => t.t).join(" ");
    assert.ok(chu, "ô nào cũng có chữ"); return { chu, cx: x + w / 2, cy: y + h / 2 };
  });
  const giua = o.filter((v) => /^Vùng /.test(v.chu)); assert.equal(giua.length, 1, "một ô giữa ghi tên vùng");
  const ln = tags(svg, "line"), tg = tags(svg, "polygon"), B = tx.filter((t) => t.t === "B");
  assert.ok(ln.length === 1 && num(ln[0], "x1") === num(ln[0], "x2") && tg.length === 1 && B.length === 1, "một mũi tên chỉ hướng bắc");
  const dinh = pts(tg[0].points).reduce((a, p) => (p[1] < a[1] ? p : a));
  assert.ok(dinh[1] < Math.min(num(ln[0], "y1"), num(ln[0], "y2")) && close(dinh[0], num(ln[0], "x1")) && +B[0].y < dinh[1], "mũi tên chỉ lên trên là hướng bắc");
  const HUONG = ["đông", "đông bắc", "bắc", "tây bắc", "tây", "tây nam", "nam", "đông nam"], huong = {};
  o.filter((v) => v !== giua[0]).forEach((v) => {
    const g = (Math.atan2(giua[0].cy - v.cy, v.cx - giua[0].cx) * 180) / Math.PI, k = (((Math.round(g / 45) % 8) + 8) % 8);
    assert.ok(lech(g, k * 45) <= 15, `ô “${v.chu}” lệch hướng quá 15°`);
    assert.equal(huong[HUONG[k]], undefined, "mỗi hướng một ô"); huong[HUONG[k]] = v.chu;
  });
  return { vung: giua[0].chu, huong };
};
// nơi tiếp giáp của vùng theo hướng (sách tr. 158: vùng giáp Đồng bằng sông Hồng, Bắc Trung Bộ, Trung Quốc, Lào; hướng theo lược đồ vùng)
const TIEP_GIAP = { "Vùng Trung du và miền núi phía Bắc": { "bắc": "Trung Quốc", "tây": "Lào", "nam": "Bắc Trung Bộ", "đông nam": "Đồng bằng sông Hồng" } };

/* ---------- trình tự thời gian (bảng ngày tháng theo sách: Bài 4 tr. 18–20, Bài 8 tr. 38–40) ----------
   Mỗi sự kiện: [chữ nhận ra trong ý, ngày dạng YYYY-MM-DD hay YYYY-MM để so, cách ghi ngày trong lời giải]. */
const SU_KIEN = [
  ["Đức tấn công Ba Lan", "1939-09-01", "1/9/1939"], ["Đức tấn công Liên Xô", "1941-06-22", "22/6/1941"], ["Mỹ tham chiến", "1941-12", "12/1941"],
  ["Mặt trận Đồng minh chống phát xít", "1942-01", "1/1942"], ["Trận Xta-lin-grát kết thúc", "1943-02", "2/1943"],
  ["đổ bộ lên Noóc-măng-đi", "1944-06", "6/1944"], ["Đức kí văn bản đầu hàng", "1945-05-09", "9/5/1945"],
  ["ném bom nguyên tử xuống Hi-rô-si-ma", "1945-08-06", "6/8/1945"],
  ["Quân lệnh số 1", "1945-08-13", "13/8/1945"], ["Đại hội Quốc dân", "1945-08-16", "16 – 17/8"],
  ["Nhân dân Hà Nội khởi nghĩa", "1945-08-19", "19/8"], ["thắng lợi ở Sài Gòn", "1945-08-24", "24/8"]
];
const suKien = (s) => { const m = SU_KIEN.filter(([k]) => s.toLowerCase().includes(k.toLowerCase())); assert.equal(m.length, 1, "không nhận ra đúng một sự kiện: " + s); return m[0]; };

/* ---------- các câu cần tính ----------
   id: đề chứa câu; has: đoạn chữ của đề; right(q): đáp án tính bằng code (so với ans[0], ans, o[0], a hoặc o). */
const hieu = (q, unit) => { const y = nam(q.q); assert.equal(y.length, 2, "đề ghi đúng hai năm: " + q.q); assert.equal(q.unit, unit); assert.ok(q.x.includes(`${y[1]} − ${y[0]} = ${y[1] - y[0]}`), "lời giải ghi phép trừ"); return y[1] - y[0]; };
const so = (re, s) => { const m = re.exec(s); assert.ok(m, "không đọc được số liệu: " + re); return m.slice(1).map(val); };
const CHECKS = [
  // Lịch sử và Địa lí: Đề 1
  { id: L.de1, has: "đến khi đề ra đường lối đó là bao nhiêu năm", right: (q) => hieu(q, "năm") },
  { id: L.de1, has: "Tỉ lệ các nhóm tuổi trong dân số tỉnh Y", right: (q) => {
    // ngưỡng của sách (tr. 118): cơ cấu dân số vàng khi cứ 1 người phụ thuộc có 2 người trong tuổi lao động; già hoá khi nhóm từ 65 tuổi
    // trở lên chiếm từ 7% đến dưới 14%, dân số già khi chiếm từ 14% đến dưới 21%
    const [n1, c1, l1, g1] = so(/năm (\d{4}), dưới 15 tuổi chiếm (\d+)%, từ 15 đến 64 tuổi chiếm (\d+)%, từ 65 tuổi trở lên chiếm (\d+)%/, q.q);
    const [n2, c2, l2, g2] = so(/năm (\d{4}), ba nhóm tuổi đó lần lượt chiếm (\d+)%, (\d+)%, (\d+)%/, q.q);
    const Y = { [n1]: { c: c1, l: l1, g: g1 }, [n2]: { c: c2, l: l2, g: g2 } };
    Object.values(Y).forEach((y) => assert.equal(y.c + y.l + y.g, 100, "ba nhóm tuổi cộng lại 100%"));
    const LUAT = [
      [/^Năm (\d{4}), tỉnh Y có cơ cấu dân số vàng\.$/, (m) => Y[m[1]].l >= 2 * (Y[m[1]].c + Y[m[1]].g)],
      [/^Năm (\d{4}), dân số tỉnh Y đã bước vào giai đoạn già hoá\.$/, (m) => Y[m[1]].g >= 7],
      [/^Năm (\d{4}), tỉnh Y đã có dân số già\.$/, (m) => Y[m[1]].g >= 14 && Y[m[1]].g < 21],
      [/^Từ năm (\d{4}) đến năm (\d{4}), tỉ lệ người từ 65 tuổi trở lên của tỉnh Y tăng gấp đôi\.$/, (m) => Y[m[2]].g === 2 * Y[m[1]].g]
    ];
    assert.ok(q.x.includes(`${c2}% + ${g2}% = ${c2 + g2}%`) && q.x.includes(`2 × ${c2 + g2}% = ${2 * (c2 + g2)}%`), "lời giải ghi phép tính");
    return q.o.map((o) => { const l = LUAT.map(([re, f]) => [re.exec(o), f]).filter(([m]) => m); assert.equal(l.length, 1, "ý nào cũng có luật: " + o); return l[0][1](l[0][0]); }); } },
  { id: L.de1, has: "Tỉ lệ dân thành thị của tỉnh Z", right: (q) => {
    const [d, t] = so(/có ([\d ]+) người, trong đó ([\d ]+) người sống ở thành thị/, q.q), v = (t / d) * 100;
    assert.ok(Number.isInteger(v) && q.unit === "%" && q.x.includes(`${vn(t)} : ${vn(d)} × 100 = ${v}`)); return v; } },
  { id: L.de1, has: "cơ cấu lao động có việc làm phân theo ngành kinh tế của tỉnh M", right: (q) => {
    const c = docTron(q.svg), [a, b] = Object.keys(c).sort(), N = "Nông, lâm nghiệp và thuỷ sản", C = "Công nghiệp và xây dựng", D = "Dịch vụ";
    assert.ok(c[b][N] < c[a][N] && c[b][C] > c[a][C] && c[b][D] > c[a][D], "nông, lâm nghiệp và thuỷ sản giảm; hai nhóm kia tăng");
    const lon = Object.entries(c[b]).sort((x, y) => y[1] - x[1])[0][0];
    assert.ok(lon !== C && q.o.includes(`Năm ${b}, công nghiệp và xây dựng là ngành có tỉ trọng lao động lớn nhất`), "lựa chọn sai: ngành lớn nhất năm sau");
    assert.ok(Object.keys(c[a]).every((k) => Math.abs(c[b][k] - c[a][k]) >= 5) && q.o.includes("Tỉ trọng lao động của cả ba nhóm ngành gần như không thay đổi"), "lựa chọn sai: cơ cấu không đổi");
    assert.ok(q.o.includes("Tỉ trọng nông, lâm nghiệp và thuỷ sản tăng; công nghiệp và xây dựng, dịch vụ giảm"), "lựa chọn sai: đảo chiều");
    [N, C, D].forEach((k) => assert.ok(q.x.includes(`từ ${c[a][k]}% ${c[b][k] < c[a][k] ? "xuống" : "lên"} ${c[b][k]}%`), "lời giải ghi đúng số của " + k));
    assert.ok(q.x.includes(`Năm ${b}, nông, lâm nghiệp và thuỷ sản vẫn có tỉ trọng lớn nhất`) && lon === N);
    return "Tỉ trọng nông, lâm nghiệp và thuỷ sản giảm; công nghiệp và xây dựng, dịch vụ tăng"; } },
  { id: L.de1, has: "Năng suất lúa trung bình của tỉnh H", right: (q) => {
    const [s, k] = so(/gieo trồng (\d+) nghìn ha lúa, thu hoạch được (\d+) nghìn tấn thóc/, q.q), t = k / s, v = Math.round(t * 10 * 1e9) / 1e9;
    assert.ok(Number.isInteger(v) && q.unit === "tạ/ha" && q.x.includes(`= ${vn(t)} tấn/ha`) && q.x.includes(`${vn(t)} × 10 = ${v}`)); return v; } },
  { id: L.de1, has: "vị trí tiếp giáp của vùng Trung du và miền núi phía Bắc", right: (q) => {
    const { vung, huong } = docViTri(q.svg), T = TIEP_GIAP[vung]; assert.ok(T, "có bảng nơi tiếp giáp của " + vung);
    const o = {};
    Object.entries(huong).forEach(([h, chu]) => { assert.ok(T[h], `phía ${h} của ${vung} không có trong bảng`); if (/^\(\d\)$/.test(chu)) o[chu] = T[h]; else assert.equal(chu, T[h], `ô phía ${h}`); });
    assert.ok(q.x.includes(`giáp ${T["bắc"]} ở phía bắc, giáp ${T["tây"]} ở phía tây`), "lời giải ghi đúng hướng");
    return Object.keys(o).sort().map((k) => `${k} ${o[k]}`).join(", "); } },
  { id: L.de1, has: "sản lượng lúa của tỉnh N giảm bao nhiêu phần trăm", right: (q) => {
    const c = docCot(q.svg, "Nghìn tấn"), a = c[0], b = c[c.length - 1], gi = a.v - b.v, v = (gi / a.v) * 100;
    assert.ok(nam(q.q).join() === `${a.nam},${b.nam}` && c.every((x, i) => !i || x.v < c[i - 1].v), "đề hỏi từ năm đầu đến năm cuối; sản lượng giảm dần");
    assert.ok(Number.isInteger(v) && q.unit === "%" && q.x.includes(`${a.v} − ${b.v} = ${gi}`) && q.x.includes(`${gi} : ${a.v} × 100 = ${v}`)); return v; } },
  // Lịch sử và Địa lí: Đề 2
  { id: L.de2, has: "những ngày tháng Tám năm 1945", right: (q) => {
    const sk = q.o.map(suKien); sk.forEach(([, , ghi]) => assert.ok(q.x.includes(ghi), "lời giải ghi ngày " + ghi));
    assert.ok(sk.every((s, i) => !i || s[1] > sk[i - 1][1]), "các sự kiện khác ngày nhau");
    return [...q.o].sort((a, b) => (suKien(a)[1] < suKien(b)[1] ? -1 : 1)); } },
  { id: L.de2, has: "khối quân sự Bắc Đại Tây Dương", right: () => "NATO" }, // sách tr. 42: Mỹ lập NATO năm 1949
  { id: L.de2, has: "số nam, số nữ của tỉnh X", right: (q) => {
    const c = docCot(q.svg, "Nghìn người"), y = nam(q.q).pop(), m = c[y]["Nam"], f = c[y]["Nữ"], v = (m / f) * 100;
    assert.ok(Number.isInteger(v) && q.unit === "nam/100 nữ" && q.x.includes(`${m} nghìn nam và ${f} nghìn nữ`) && q.x.includes(`${m} : ${f} × 100 = ${v}`)); return v; } },
  { id: L.de2, has: "Mật độ dân số của tỉnh T", right: (q) => {
    const [s] = so(/diện tích ([\d ]+) km²/, q.q), [d] = so(/tỉnh có ([\d ]+) người/, q.q), [t] = so(/tăng thêm ([\d ]+) người/, q.q), v = (d + t) / s;
    assert.ok(Number.isInteger(v) && q.unit === "người/km²" && q.x.includes(`${vn(d)} + ${vn(t)} = ${vn(d + t)}`) && q.x.includes(`${vn(d + t)} : ${vn(s)} = ${vn(v)}`)); return v; } },
  { id: L.de2, has: "Ngành chăn nuôi chiếm bao nhiêu phần trăm", right: (q) => {
    const [a, b] = so(/là (\d+) nghìn tỉ đồng, trong đó ngành chăn nuôi đạt (\d+) nghìn tỉ đồng/, q.q), v = (b / a) * 100;
    assert.ok(Number.isInteger(v) && q.unit === "%" && q.x.includes(`${b} : ${a} × 100 = ${v}`)); return v; } },
  // GDCD: hai câu tính thời gian (Bài 6), một câu tục ngữ
  { id: G.de1, has: "Vy còn bao nhiêu phút để đọc sách", right: (q) => {
    const [a, b] = so(/có từ (\d+) giờ đến (\d+) giờ/, q.q), [, viec] = /dự định: (.*?)\. Nếu/.exec(q.q), LAN = { "hai": 2, "ba": 3 };
    const phut = [...viec.matchAll(/(?:(hai|ba) lần, mỗi lần (\d+)|(\d+)) phút/g)].map((m) => (m[3] ? +m[3] : LAN[m[1]] * +m[2])), tong = sum(phut), v = (b - a) * 60 - tong;
    assert.ok(phut.length >= 3 && v > 0 && q.unit === "phút" && q.x.includes(`${(b - a) * 60} − ${tong} = ${v}`)); return v; } },
  { id: G.de2, has: "Vinh có thêm bao nhiêu giờ đọc sách", right: (q) => {
    const [a] = so(/dành (\d+) phút/, q.q), [d] = so(/sau (\d+) ngày/, q.q), v = ((a / 2) * d) / 60;
    assert.ok(q.q.includes("bớt một nửa") && Number.isInteger(v) && q.unit === "giờ" && q.x.includes(`${a} : 2 = ${a / 2}`) && q.x.includes(`= ${v} (giờ)`)); return v; } },
  { id: G.de2, has: "Việc hôm nay chớ để ngày ___", right: () => "mai" }
];

const KHO = {}; // mã pool → câu trong kho (câu của các đề cố định, mỗi câu ghi src)
[L, G].forEach((s) => {
  const p = bank(s.pool), de = s.from.map(bank);
  assert.ok(de.every((d) => d.minutes === p.minutes && d.n === p.n && d.questions.length === d.n), s.pool + ": các đề cùng số phút, số câu như danh mục");
  assert.equal(p.questions.length, sum(de.map((d) => d.n)), s.pool + ": kho là câu của các đề cố định, không có câu riêng");
  assert.ok(p.questions.every((q) => s.from.includes(q.src)), s.pool + ": câu nào cũng thuộc một đề cố định");
  KHO[s.pool] = p.questions;
});
const kho = Object.values(KHO).flat();
let n = 0;
const checked = new Set();
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.q.includes(c.has));
  assert.equal(m.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${m.length}`);
  const q = m[0], at = c.id + ": " + c.has;
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  const want = c.right(q), got = q.type === "fill" ? q.ans[0] : q.type === "num" ? q.ans : q.type === "tf4" ? q.a : q.type === "order" ? q.o : q.o[0];
  if (typeof want === "number") assert.ok(typeof got === "number" && close(got, want), at + ": đáp án " + got + ", tính được " + want);
  else assert.deepEqual(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), at + ": nhiễu trùng đáp án đúng");
  checked.add(q); n++;
});
// thế kỉ ghi trong ý đúng/sai (“… (năm 1957), một sự kiện của thế kỉ XX.”): tính lại từ năm
kho.filter((q) => q.type === "tf4").forEach((q) => q.o.forEach((o, i) => {
  const m = /\(năm (\d+)\).*thế kỉ ([IVX]+)\b/.exec(o); if (!m) return;
  assert.equal(q.a[i], theKi(+m[1]) === m[2], `“${o}”: năm ${m[1]} thuộc thế kỉ ${theKi(+m[1])}`); n++;
  assert.ok(q.x.includes(`năm ${m[1]} thuộc thế kỉ ${theKi(+m[1])} (từ năm ${Math.floor((+m[1] - 1) / 100) * 100 + 1} đến năm ${(Math.floor((+m[1] - 1) / 100) + 1) * 100})`), "lời giải nêu cách xác định thế kỉ");
}));
// ý đúng/sai “A trước khi B”: so ngày của hai sự kiện theo bảng; lời giải ghi ngày của cả hai
kho.filter((q) => q.type === "tf4").forEach((q) => q.o.forEach((o, i) => {
  const m = /^(.+) trước khi (.+)\.$/.exec(o); if (!m) return;
  const a = suKien(m[1]), b = suKien(m[2]);
  assert.equal(q.a[i], a[1] < b[1], `“${o}”: ${a[2]} và ${b[2]}`); assert.ok(q.x.includes(a[2]) && q.x.includes(b[2]), "lời giải ghi ngày " + a[2] + ", " + b[2]); n++;
  checked.add(q);
}));
// câu trả lời bằng số, câu điền có đáp án là số, câu có hình, câu sắp xếp nào cũng phải được tính lại ở trên
kho.filter((q) => q.type === "num" || q.svg || q.type === "order" || (q.type === "fill" && /^[\d\s,.−-]+$/.test(q.ans[0]))).forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + q.q.slice(0, 60)));
assert.ok(KHO[L.pool].filter((q) => q.svg).length >= 4 && L.from.every((id) => KHO[L.pool].some((q) => q.src === id && q.svg)), "Lịch sử và Địa lí: vài câu có hình, đề nào cũng có");

/* ---------- mức độ và ma trận ---------- */
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
// chữ của nhãn chủ đề (bỏ phần trong ngoặc, chữ “Vùng ”), tách theo “ và ”, “, ”
const phanNhan = (t) => t.replace(/\s*\([^)]*\)$/, "").replace(/^Vùng /, "").split(/ và |, /).map((s) => s.trim().toLowerCase()).filter((s) => s.includes(" ") || s.length >= 6);
[L, G].forEach((s) => {
  const p = bank(s.pool), M = p.pool.matrix, cells = Object.values(M), K = KHO[s.pool], N = p.n, de = s.from.map((id) => bank(id).questions);
  assert.ok(K.every((q) => [1, 2, 3].includes(q.lv)), s.pool + ": câu nào trong kho cũng cần lv");
  assert.ok(cells.every(Array.isArray), s.pool + ": ma trận ghi theo [Biết, Hiểu, Vận dụng]");
  const b = Math.round(0.4 * N), h = Math.round(0.32 * N);
  assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [b, h, N - b - h], s.pool + ": ma trận 40% Biết, 32% Hiểu, 28% Vận dụng");
  de.forEach((d, i) => {
    assert.deepEqual([...new Set(d.map((q) => q.topic))], Object.keys(M), `${s.pool}: Đề ${i + 1} đủ chủ đề, theo thứ tự của ma trận`);
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `Đề ${i + 1} của ${s.pool} đúng ma trận ở chủ đề ${t}`));
  });
  const tf4 = K.filter((q) => q.type === "tf4"), kieu = {};
  assert.ok(tf4.length >= 4 && !K.some((q) => q.type === "essay"), s.pool + ": ít nhất 4 câu đúng/sai 4 ý, không có câu tự luận");
  tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
  assert.ok(Math.max(...Object.values(kieu)) <= Math.ceil(tf4.length / 3), s.pool + ": kiểu Đ/S của các câu đúng/sai 4 ý lặp nhiều quá: " + JSON.stringify(kieu));
  // đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2, N22)
  K.filter((q) => q.type === "mc").forEach((q) => { const m = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + q.q.slice(0, 60)); });
  // đáp án đúng không hay là lựa chọn dài nhất hay ngắn nhất (Rút ra N9-ck1-tin-congnghe): mỗi kiểu không quá một phần ba số câu nhiều lựa chọn
  {
    const mc = K.filter((q) => q.type === "mc"), hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
    assert.ok(mc.filter((q) => hon(q, (a, b) => a > b)).length <= mc.length / 3, s.pool + ": đáp án đúng là lựa chọn dài nhất ở quá một phần ba số câu nhiều lựa chọn");
    assert.ok(mc.filter((q) => hon(q, (a, b) => a < b)).length <= mc.length / 3, s.pool + ": đáp án đúng là lựa chọn ngắn nhất ở quá một phần ba số câu nhiều lựa chọn");
  }
  // đáp án không lặp chữ của nhãn chủ đề trên câu (Rút ra N6, N16b), trừ khi mọi lựa chọn cùng có chữ đó
  K.forEach((q) => { const da = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? q.ans : []; phanNhan(q.topic).forEach((c) => da.forEach((d) => { if (d.toLowerCase().includes(c)) assert.ok(q.type === "mc" && q.o.every((o) => o.toLowerCase().includes(c)), `đáp án “${d}” lặp chữ “${c}” của nhãn chủ đề`); })); });
  const seen = new Set();
  for (let k = 0; k < 12 * K.length; k++) {
    const d = Quiz.draw(p);
    assert.equal(d.notes.length, 0, s.pool + ": rút thử có ghi chú: " + d.notes.join("; "));
    assert.equal(d.questions.length, N);
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d.questions, t, l)), v, `${s.pool}: rút đúng ma trận ở chủ đề ${t}`));
    d.questions.forEach((q) => seen.add(Quiz.key(q)));
  }
  assert.equal(seen.size, K.length, s.pool + ": rút thử nhiều lần phải gặp đủ câu của kho");
  // học sinh đã làm hết một đề cố định (đúng cả) thì đề ngẫu nhiên không rút lại câu của đề đó
  s.from.forEach((lam) => {
    const hist = (q) => (q.src === lam ? { done: 1, wrong: 0 } : null); // lịch sử câu như PoolHist
    for (let k = 0; k < 30; k++) {
      const d = Quiz.draw(p, hist);
      assert.equal(d.notes.length, 0); assert.equal(d.questions.length, N);
      assert.ok(d.questions.every((q) => q.src !== lam), `${s.pool}: đã làm hết ${lam} thì không rút lại câu của đề đó`);
    }
  });
});
// Lịch sử và Địa lí: số câu Lịch sử, Địa lí của mỗi đề ghi đúng ở note (chủ đề Lịch sử đứng trước “Dân tộc và dân số”)
{
  const T = Object.keys(bank(L.pool).pool.matrix), dau = T.indexOf("Dân tộc và dân số"); assert.ok(dau > 0);
  L.from.forEach((id) => { const d = bank(id), ls = d.questions.filter((q) => T.indexOf(q.topic) < dau).length; assert.ok(d.note.includes(`${ls} câu Lịch sử, ${d.n - ls} câu Địa lí`), id + ": note ghi số câu Lịch sử, Địa lí"); });
}

/* ---------- đề bài không trùng câu nào khác trong file (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
[L, G].forEach((s) => {
  const deBai = BANKS.filter((b) => b.file === s.file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q) })));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
});

/* ---------- dò lộ đáp án (Rút ra N5; bộ dò của tests/lsdl-gdcd6-ck2.js) giữa hai câu rút được cùng lúc: khác ô (chủ đề, mức), hoặc
   cùng một ô rút từ 2 câu. Đáp án là số (từ hai chữ số, hoặc số thập phân) chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”,
   “bằng”, “được”); cặp nối: câu kia có cả hai vế. Đáp án bằng chữ (lựa chọn đúng của câu trắc nghiệm, đáp án câu điền) có ở câu kia
   thì chỉ in ra khi chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM. ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || []).map(String);
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
// t có cụm s đứng thành từ riêng (“Na” không khớp “Nam”)
const coCum = (t, s) => { for (let i = t.indexOf(s); i >= 0; i = t.indexOf(s, i + 1)) if (!/[\p{L}\p{N}]/u.test(t[i - 1] || " ") && !/[\p{L}\p{N}]/u.test(t[i + s.length] || " ")) return true; return false; };
const doLo = (qs, M, tenCau) => {
  const cungLuc = (p, q) => p.topic !== q.topic || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2;
  const lo = [], chuLo = [];
  qs.forEach((q, i) => {
    const so = (q.type === "num" && (q.ans >= 10 || !Number.isInteger(q.ans))) || (q.type === "fill" && /^\d{2,}$/.test(q.ans[0])) ? [val(q.type === "num" ? q.ans : q.ans[0])] : [];
    const cum = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? q.ans : [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    qs.forEach((p, j) => {
      if (j === i || !cungLuc(p, q)) return;
      const C = chu(p), T = C.map((s) => s.toLowerCase()), at = `${tenCau(p)} → ${tenCau(q)}: `;
      so.filter((x) => C.flatMap(soKQ).some((y) => close(x, y))).forEach((x) => lo.push(at + x));
      cap.filter(([l, r]) => T.some((t) => coCum(t, l.toLowerCase()) && coCum(t, r.toLowerCase()))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      cum.filter((s) => T.some((t) => coCum(t, s.toLowerCase()))).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const ten = new Map();
[L, G].forEach((s) => s.from.forEach((id) => KHO[s.pool].filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace(/9-ck1-/, "-") + "#" + (i + 1)))));
const loAll = [], chuAll = [];
[L, G].forEach((s) => { const r = doLo(KHO[s.pool], bank(s.pool).pool.matrix, (q) => ten.get(q)); loAll.push(...r.lo); chuAll.push(...r.chuLo); });
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuAll.join("\n"));
// đã xem (Phiên N9-ck1-lsdl-gdcd): …
const DA_XEM = [];
assert.deepEqual(chuAll, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loAll, [], "lộ đáp án:\n" + loAll.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 29 (năm)”, “là 300 người/km²”, lựa chọn đúng, đáp án câu điền
{
  const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thu = (qs) => { const M = new Proxy({}, { get: () => [1, 1, 1] }), r = doLo(qs, M, (q) => q.q.slice(0, 12)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  const khac = tim("Tuyến đường sắt quan trọng nhất"), khac2 = tim("Biểu hiện nào sau đây thể hiện lòng khoan dung");
  assert.deepEqual(thu([tim("đến khi đề ra đường lối đó là bao nhiêu năm"), gia(khac, "Ví dụ: 1978 − 1949 = 29 (năm).")]), ["29"]);
  assert.deepEqual(thu([tim("Mật độ dân số của tỉnh T"), gia(khac, "Mật độ dân số của tỉnh là 300 người/km².")]), ["300"]);
  assert.deepEqual(thu([tim("các nước Tây Âu phục hồi kinh tế"), gia(khac, "Kế hoạch Mác-san giúp Tây Âu phục hồi.")]), ["Kế hoạch Mác-san"]);
  assert.deepEqual(thu([tim("Việc hôm nay chớ để ngày ___"), gia(khac2, "Đừng để đến ngày mai mới làm lành.")]), ["mai"]);
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book; và với câu của các kho khác ---------- */
// tên riêng nhiều chữ (vùng, tổ chức, sự kiện, chính sách, tên người) và tên ngành, tên bài: mỗi tên tính là một từ (như tests/lsdl4-ck2.js)
const GOP = ["thanh pho ho chi minh", "trung du va mien nui phia bac", "duyen hai nam trung bo va tay nguyen", "dong bang song cuu long", "dong bang song hong",
  "bac trung bo", "dong nam bo", "ho chi minh", "nguyen ai quoc", "ton duc thang", "phan boi chau", "phan chau trinh", "nguyen thai hoc", "nguyen an ninh",
  "dang cong san viet nam", "dang cong san dong duong", "dang cong san phap", "dang xa hoi phap", "quoc te cong san", "hoi viet nam cach mang thanh nien",
  "viet nam quoc dan dang", "tan viet cach mang dang", "dong duong cong san dang", "an nam cong san dang", "dong duong cong san lien doan",
  "hoi lien hiep thuoc dia", "mat tran nhan dan phan de dong duong", "mat tran dan chu dong duong", "mat tran nhan dan", "mat tran viet minh",
  "mat tran dong minh chong phat xit", "uy ban khoi nghia toan quoc", "dai hoi quoc dan", "cong dong kinh te chau au", "cong dong than thep chau au",
  "lien minh chau au", "hoi dong tuong tro kinh te", "khoi quan su bac dai tay duong", "hiep uoc vac sa va", "ke hoach mac san",
  "chinh sach kinh te moi", "chinh sach cong san thoi chien", "chinh sach lang gieng than thien", "chinh sach moi", "hiep uoc an ninh my nhat",
  "cong hoa nhan dan trung hoa", "lien bang xo viet", "chu nghia mac le nin", "chu nghia xa hoi", "chu nghia phat xit", "chien tranh the gioi thu hai",
  "chien tranh the gioi thu nhat", "chien tranh lanh", "cach mang thang tam", "tuyen ngon doc lap", "dai hoi tua", "hoi nghi vec xai", "tran chau cang",
  "xta lin grat", "nooc mang di", "hi ro si ma", "dong bac trung quoc", "dang quoc dai", "nong lam nghiep va thuy san", "cong nghiep va xay dung",
  "co cau dan so vang", "ti so gioi tinh", "mat do dan so", "von dau tu nuoc ngoai", "duong sat thong nhat", "song co li tuong", "hoat dong cong dong",
  "khach quan va cong bang", "bao ve hoa binh", "quan li thoi gian hieu qua", "to ru man", "ru do ven", "goc ba chop", "gan di", "hit le", "le nin",
  "mat xco va", "ba lan", "ha noi", "hai phong", "lao cai", "quang ninh", "nghe an", "ha tinh", "sai gon", "yen bai", "tan trao", "tuyen quang", "phu tho",
  "bac ninh", "thai nguyen", "ninh binh", "hung yen", "son la", "lai chau", "hoa binh", "dong duong", "trung quoc", "lien xo", "dong au", "tay au",
  "nhat ban", "viet nam", "my la tinh", "an do", "in do ne xi a", "i ta li a", "a pa tit", "hoang lien son", "ha long", "cat ba", "dong bac", "tay bac"
].sort((a, b) => b.length - a.length);
// câu tục ngữ trích nguyên văn không tính là chép sách
const TRICH = ["Đánh kẻ chạy đi, không ai đánh người chạy lại", "Ăn quả nhớ kẻ trồng cây", "Có công mài sắt, có ngày nên kim",
  "Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao", "Việc hôm nay chớ để ngày"];
const khongDau = (s) => { let t = " " + TRICH.reduce((x, c) => x.split(c).join(" "), String(s).normalize("NFC")).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim() + " ";
  GOP.forEach((g) => { t = t.split(" " + g + " ").join(" " + g.replace(/ /g, "") + " "); }); return t.replace(/[aeiouy]+/g, "a").trim(); };
const tuCua = (s) => khongDau(s).split(" ").filter(Boolean);
const chuoi = (s, k) => { const w = tuCua(s), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
const truong = (q) => [q.q, q.x].concat(q.o || [], q.ans || [], q.l || [], q.r || []);
const boChuoi = (ds, k) => { const out = new Map(); ds.forEach(([id, s]) => { const w = tuCua(s); for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k).join(" "); if (!out.has(c)) out.set(c, new Set()); out.get(c).add(id); } }); return out; };
const bao = (bo, k) => [...new Set(kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].filter((c) => bo.has(c)).map((c) => `${ten.get(q)} ~ ${[...bo.get(c)].join(", ")}: ${c}`)))];
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
if (SACH.length) {
  assert.ok(["lich-su-dia-li-9", "giao-duc-cong-dan-9"].every((c) => SACH.some((f) => f.includes(path.join("lop-9", c)))), "OnUp-Book có Lịch sử và Địa lí 9, Giáo dục công dân 9");
  const ds = SACH.map((f) => [path.basename(path.dirname(f)), fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")]);
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + bao(boChuoi(ds, 6), 6).join("\n"));
  assert.deepEqual(bao(boChuoi(ds, 8), 8), [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
{
  const cua = new Set(L.from.concat(G.from, [L.pool, G.pool]));
  const ds = BANKS.filter((b) => !cua.has(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => [b.id, truong(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).join(" | ")]));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + bao(boChuoi(ds, 5), 5).join("\n"));
  assert.deepEqual(bao(boChuoi(ds, 8), 8), [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu, ý đã tính lại hoặc đọc lại hình (hai ngân hàng); kho " + kho.length + " câu, " + [L, G].map((s) => s.from.length + " đề cố định " + bank(s.pool).n + " câu").join(" và ") + ".");
console.log("MATH OK");
