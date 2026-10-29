// Tính lại đáp án và kiểm tra ma trận hai ngân hàng lớp 9 giữa kì II của Phiên N9-gk2-lsdl-gdcd: Lịch sử và Địa lí (data/banks/9-lsdl.js)
// và GDCD (9-gdcd.js), theo mẫu tests/lsdl-gdcd9-ck1.js. Mỗi ngân hàng = các đề cố định trong from của đề ngẫu nhiên (cùng chia theo ma
// trận) + đề ngẫu nhiên không có câu riêng; số câu, số đề lấy từ danh mục. Câu có phép tính, có hình, câu sắp xếp được nhận ra bằng một
// đoạn chữ của đề (has, đúng một câu trong hai kho, đúng đề ghi ở id); so đáp án với kết quả tính bằng code: điền ans[0], trả lời bằng số
// ans, trắc nghiệm o[0], đúng/sai 4 ý a, sắp xếp o. Lịch sử và Địa lí: số năm (đọc hai năm trong đề), trình tự các sự kiện (ý “A trước
// khi B” của câu đúng/sai 4 ý, câu sắp xếp; bảng ngày tháng theo sách, Bài 13–17), bình quân lương thực theo đầu người, tỉ lệ che phủ
// rừng, chi tiêu trung bình mỗi lượt khách, GRDP bình quân đầu người; năm hình đọc lại bằng code: hai sơ đồ vị trí tiếp giáp (hướng của
// từng ô so với ô giữa, mũi tên chỉ hướng bắc; nơi tiếp giáp theo sách), hai biểu đồ cột (trục số bên trái, số ở đỉnh cột, năm dưới
// cột), một biểu đồ tròn (góc của từng phần khớp số phần trăm ghi trong phần, chú giải, năm dưới mỗi hình). GDCD: câu chia việc của
// Bài 6, ba câu tính tiền của Bài 8, thứ tự các bước của câu sắp xếp. Câu trả lời bằng số, câu điền có đáp án là số, câu có hình, câu
// sắp xếp nào trong hai kho cũng phải có kiểm tra ở đây.
// Rồi kiểm tra mức độ và ma trận: mọi câu có lv; ma trận 40% Biết, 32% Hiểu, 28% Vận dụng (10 – 8 – 7 với đề 25 câu), chủ đề theo thứ
// tự bài như các đề; đề nào cũng chia đúng theo ma trận, nên ô nào cũng có số câu gấp số đề lần số câu ô đó rút; số câu Lịch sử, Địa lí
// của mỗi đề ghi đúng ở note; mỗi kho có ít nhất 4 câu đúng/sai 4 ý (kiểu Đ/S không lặp quá một phần ba), không có câu tự luận; đáp án
// đúng không dài hơn hẳn các lựa chọn sai (Rút ra N22), là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa
// chọn (Rút ra N9-ck1-tin-congnghe); đáp án không lặp chữ của nhãn chủ đề (trừ khi mọi lựa chọn cùng có chữ đó); câu ôn học kì I (chủ
// đề của kho cuối kì I) không hỏi lại đề bài của kho đó; rút thử nhiều lần ra đúng ma trận, không ghi chú, gặp đủ câu của kho; học sinh
// đã làm hết một đề cố định thì đề ngẫu nhiên không rút lại câu của đề đó. Cuối cùng: đề bài không trùng câu nào khác trong file; dò lộ
// đáp án giữa các câu rút được cùng lúc (bộ dò của tests/lsdl-gdcd9-ck1.js, thêm ngày tháng của câu về thứ tự thời gian; tự thử với câu
// cố ý lộ; DO_LO=1 in đáp án bằng chữ có ở câu kia, danh sách đã xem ở DA_XEM); có OnUp-Book thì so mọi trường chữ với chữ OCR của mọi
// cuốn (bỏ dấu, gộp nguyên âm, tên riêng nhiều chữ tính là một từ; không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và với câu của
// mọi kho khác (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 5 từ).
// Chạy: node tests/lsdl-gdcd9-gk2.js → in MATH OK.
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
const L = { pool: "lsdl9-gk2-ngau-nhien", cu: "lsdl9-ck1-ngau-nhien" }, G = { pool: "gdcd9-gk2-ngau-nhien", cu: "gdcd9-ck1-ngau-nhien" };
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
const lech = (a, b) => Math.abs(((((a - b) % 360) + 540) % 360) - 180); // độ lệch giữa hai góc (độ)

/* ---------- hình (bộ đọc của tests/lsdl-gdcd9-ck1.js) ---------- */
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

/* Biểu đồ cột một dãy: đường lưới nằm ngang (nét màu line), số ở đầu trái mỗi đường lưới (text-anchor="end") là giá trị; cột là hình chữ
   nhật đứng trên đường đáy, số ghi ở đỉnh cột (giữa cột, cao hơn đỉnh 6 đơn vị), năm ghi dưới đáy (giữa cột). Trả về [{ nam, v }]. */
const docCot = (svg, donVi) => {
  daDoc.add(svg);
  const lu = tags(svg, "line").filter((l) => l.stroke === "line");
  assert.ok(lu.length >= 4 && lu.every(ngang), "đường lưới nằm ngang");
  const x0 = Math.min(...lu.map((l) => num(l, "x1"))), ys = lu.map((l) => num(l, "y1")), day = Math.max(...ys), tx = texts(svg);
  const giaTri = trucSo(tx.filter((t) => /^\d[\d ]*$/.test(t.t) && t["text-anchor"] === "end" && +t.x < x0).map((t) => ({ v: val(t.t), y: +t.y })), ys, "trục số");
  assert.equal(Math.round(giaTri(day)), 0, "số 0 ở đường đáy");
  assert.ok(tx.some((t) => t.t === donVi && !t["text-anchor"] && +t.y < Math.min(...ys)), "trục ghi đơn vị " + donVi);
  const namDuoi = tx.filter((t) => t["text-anchor"] === "middle" && +t.y > day && /^\d{4}$/.test(t.t));
  const cot = tags(svg, "rect").map((r) => {
    assert.ok(close(num(r, "y") + num(r, "height"), day), "cột đứng trên đường đáy");
    const cx = num(r, "x") + num(r, "width") / 2, v = Math.round(giaTri(num(r, "y")) * 1000) / 1000;
    const dinh = tx.filter((t) => t["text-anchor"] === "middle" && close(+t.x, cx) && +t.y < day);
    assert.equal(dinh.length, 1, "mỗi cột một số ở đỉnh"); assert.ok(close(+dinh[0].y, num(r, "y") - 6), "số ghi ngay trên đỉnh cột");
    assert.equal(val(dinh[0].t), v, `số ở đỉnh cột (${dinh[0].t}) khớp chiều cao cột (${v})`);
    const n = namDuoi.filter((t) => close(+t.x, cx));
    assert.equal(n.length, 1, "cột nào cũng có năm ở dưới");
    return { nam: +n[0].t, v };
  });
  assert.ok(cot.length >= 4 && new Set(cot.map((c) => c.nam)).size === cot.length, "ít nhất 4 cột, mỗi năm một cột");
  return cot.sort((a, b) => a.nam - b.nam);
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
    assert.ok(chu, "ô nào cũng có chữ"); return { chu, x, y, w, h, cx: x + w / 2, cy: y + h / 2 };
  });
  o.forEach((a, i) => o.slice(i + 1).forEach((b) => assert.ok(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y, `ô “${a.chu}” đè lên ô “${b.chu}”`)));
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
// nơi tiếp giáp của vùng theo hướng (sách tr. 176, 186, 195; hướng theo bản đồ tự nhiên của vùng, Hình 14.1, 16.1)
const TIEP_GIAP = {
  "Vùng Bắc Trung Bộ": { "bắc": "Trung du và miền núi phía Bắc", "đông bắc": "Đồng bằng sông Hồng", "tây": "Lào", "nam": "Duyên hải Nam Trung Bộ và Tây Nguyên", "đông": "Biển Đông" },
  "Vùng Duyên hải Nam Trung Bộ và Tây Nguyên": { "bắc": "Bắc Trung Bộ", "tây bắc": "Lào", "tây": "Cam-pu-chia", "tây nam": "Đông Nam Bộ", "đông": "Biển Đông" }
};
const viTriDung = (q) => {
  const { vung, huong } = docViTri(q.svg), T = TIEP_GIAP[vung]; assert.ok(T, "có bảng nơi tiếp giáp của " + vung);
  const o = {};
  Object.entries(huong).forEach(([h, chu]) => { assert.ok(T[h], `phía ${h} của ${vung} không có trong bảng`); if (/^\(\d\)$/.test(chu)) o[chu] = T[h]; else assert.equal(chu, T[h], `ô phía ${h}`); });
  assert.deepEqual(Object.keys(huong).sort(), Object.keys(T).sort(), vung + ": sơ đồ đủ các nơi tiếp giáp trong bảng");
  return { T, o };
};

/* ---------- trình tự thời gian (bảng ngày tháng theo sách: Bài 14 tr. 67–72, Bài 16 tr. 80–84, Bài 17 tr. 90–91) ----------
   Mỗi sự kiện: [chữ nhận ra trong ý, ngày dạng YYYY-MM-DD hay YYYY-MM để so, cách ghi ngày trong lời giải]. Sự kiện kéo dài nhiều năm
   so theo năm bắt đầu. */
const SU_KIEN = [
  ["chiếm trái phép Sở Tài chính", "1946-06-25", "25/6/1946"], ["Chỉ thị Toàn dân kháng chiến", "1946-12-12", "12/12/1946"],
  ["phố Hàng Bún", "1946-12-17", "17/12/1946"], ["Lời kêu gọi toàn quốc kháng chiến", "1946-12-19", "19/12/1946"],
  ["Kháng chiến nhất định thắng lợi", "1947-09", "9/1947"], ["Hội nghị Văn hoá toàn quốc lần thứ hai", "1948", "1948"],
  ["đặt quan hệ ngoại giao", "1950-01", "đầu năm 1950"],
  ["hoàn thành cải cách ruộng đất", "1956", "năm 1956"], ["cải tạo quan hệ sản xuất", "1958", "1958 – 1960"],
  ["Hội nghị Trung ương 15", "1959-01", "năm 1959"], ["Đoàn 559", "1959-05-19", "19/5/1959"], ["Mỏ Cày", "1960-01-17", "17/1/1960"],
  ["Đại hội đại biểu toàn quốc lần thứ III", "1960-09", "9/1960"], ["kế hoạch 5 năm lần thứ nhất", "1961", "1961"],
  ["Ấp Bắc", "1963-01-02", "2/1/1963"], ["An Lão, Ba Gia, Đồng Xoài", "1964", "1964 – 1965"],
  ["Buôn Ma Thuột", "1975-03-10", "10/3/1975"], ["cố đô Huế", "1975-03-26", "26/3"], ["Đà Nẵng", "1975-03-29", "29/3"], ["Dinh Độc Lập", "1975-04-30", "30/4"]
];
const suKien = (s) => { const m = SU_KIEN.filter(([k]) => s.toLowerCase().includes(k.toLowerCase())); assert.equal(m.length, 1, "không nhận ra đúng một sự kiện: " + s); return m[0]; };
const thuTu = (q) => {
  const sk = q.o.map(suKien); sk.forEach(([, , ghi]) => assert.ok(q.x.includes(ghi), "lời giải ghi ngày " + ghi));
  assert.equal(new Set(sk.map((s) => s[1])).size, sk.length, "các sự kiện khác ngày nhau");
  return [...q.o].sort((a, b) => (suKien(a)[1] < suKien(b)[1] ? -1 : 1));
};

/* ---------- các câu cần tính ----------
   id: đề chứa câu; has: đoạn chữ của đề; right(q): đáp án tính bằng code (so với ans[0], ans, o[0], a hoặc o). */
const hieu = (q, unit) => { const y = nam(q.q); assert.equal(y.length, 2, "đề ghi đúng hai năm: " + q.q); assert.equal(q.unit, unit); assert.ok(q.x.includes(`${y[1]} − ${y[0]} = ${y[1] - y[0]}`), "lời giải ghi phép trừ"); return y[1] - y[0]; };
const so = (re, s) => { const m = re.exec(s); assert.ok(m, "không đọc được số liệu: " + re); return m.slice(1).map(val); };
// các bước quản lí thời gian theo sách (Bài 6, tr. 33–34): xác định việc và thời hạn → đặt ưu tiên → phân bổ thời gian → thực hiện kế hoạch
const BUOC_TG = [/^Ghi ra|^Liệt kê/, /^Xếp .* trước$/, /^Chia thời gian/, /^Mỗi buổi .*đúng phần đã chia$/];
const CHECKS = [
  // Lịch sử và Địa lí: Đề 1
  { id: L.de1, has: "những năm 1959 – 1965 theo thứ tự thời gian", right: thuTu },
  { id: L.de1, has: "Quân viễn chinh Mỹ đã trực tiếp tham chiến", right: (q) => hieu(q, "năm") },
  { id: L.de1, has: "Quan sát sơ đồ vị trí của vùng Bắc Trung Bộ", right: (q) => {
    const { T, o } = viTriDung(q);
    assert.ok(q.x.includes(`Phía tây của Bắc Trung Bộ là ${T["tây"]}, phía nam là vùng ${T["nam"]}`), "lời giải ghi đúng hướng");
    return Object.keys(o).sort().map((k) => `${k} ${k === "(2)" ? "vùng " : ""}${o[k]}`).join("; "); } },
  { id: L.de1, has: "Bình quân lương thực có hạt theo đầu người của tỉnh X", right: (q) => {
    const [d, t] = so(/có ([\d ]+) người, sản lượng lương thực có hạt đạt (\d+) nghìn tấn/, q.q), kg = t * 1e6, v = kg / d;
    assert.ok(Number.isInteger(v) && q.unit === "kg" && q.x.includes(`${t} nghìn tấn = ${vn(kg)} kg`) && q.x.includes(`${vn(kg)} : ${vn(d)} = ${v}`)); return v; } },
  { id: L.de1, has: "tỉ lệ che phủ rừng (diện tích rừng so với diện tích tự nhiên) của tỉnh L", right: (q) => {
    const c = docCot(q.svg, "km²"), cuoi = c[c.length - 1], [tn] = so(/Diện tích tự nhiên của tỉnh L là ([\d ]+) km²/, q.q), v = (cuoi.v / tn) * 100;
    assert.ok(nam(q.q).includes(cuoi.nam) && c.every((x, i) => !i || x.v < c[i - 1].v), "đề hỏi năm cuối; diện tích rừng giảm dần như lời giải");
    assert.ok(Number.isInteger(v) && q.unit === "%" && q.x.includes(`${vn(cuoi.v)} : ${vn(tn)} × 100 = ${v}`) && q.x.includes("giảm qua các năm")); return v; } },
  { id: L.de1, has: "cơ cấu kinh tế (GRDP) của tỉnh T", right: (q) => {
    const c = docTron(q.svg), [a, b] = Object.keys(c).sort(), N = "Nông, lâm nghiệp và thuỷ sản", C = "Công nghiệp và xây dựng", D = "Dịch vụ";
    assert.deepEqual(nam(q.q), [+a, +b], "đề ghi hai năm của biểu đồ");
    const lon = (y) => Object.entries(c[y]).sort((x, z) => z[1] - x[1])[0][0];
    const LUAT = [
      [new RegExp(`^Năm (\\d{4}), công nghiệp và xây dựng chiếm tỉ trọng lớn nhất trong cơ cấu kinh tế của tỉnh T\\.$`), (m) => lon(m[1]) === C],
      [/^Tỉ trọng nông, lâm nghiệp và thuỷ sản của tỉnh T năm (\d{4}) chỉ bằng một nửa năm (\d{4})\.$/, (m) => 2 * c[m[1]][N] === c[m[2]][N]],
      [/^Tỉ trọng dịch vụ của tỉnh T năm (\d{4}) thấp hơn năm (\d{4})\.$/, (m) => c[m[1]][D] < c[m[2]][D]],
      [/^Năm (\d{4}), dịch vụ là nhóm ngành chiếm tỉ trọng lớn nhất của tỉnh T\.$/, (m) => lon(m[1]) === D]
    ];
    [N, C, D].forEach((k) => assert.ok(q.x.includes(`${c[a][k]}%`) && q.x.includes(`${c[b][k]}%`), "lời giải ghi đúng số của " + k));
    return q.o.map((o) => { const l = LUAT.map(([re, f]) => [re.exec(o), f]).filter(([m]) => m); assert.equal(l.length, 1, "ý nào cũng có luật: " + o); return l[0][1](l[0][0]); }); } },
  // Lịch sử và Địa lí: Đề 2
  { id: L.de2, has: "lấy vĩ tuyến ___ làm giới tuyến quân sự tạm thời", right: () => "17" }, // sách tr. 78
  { id: L.de2, has: "Tổng tiến công và nổi dậy Xuân 1975 theo đúng trình tự thời gian", right: thuTu },
  { id: L.de2, has: "Trung bình mỗi lượt khách đã chi tiêu bao nhiêu triệu đồng", right: (q) => {
    const c = docCot(q.svg, "Triệu lượt"), cuoi = c[c.length - 1], [dt] = so(/doanh thu từ khách du lịch của tỉnh K đạt ([\d ]+) tỉ đồng/, q.q), v = dt / (cuoi.v * 1000);
    assert.ok(nam(q.q).includes(cuoi.nam) && q.unit === "triệu đồng" && q.x.includes(`đón ${vn(cuoi.v)} triệu lượt khách`));
    assert.ok(q.x.includes(`${vn(dt)} tỉ đồng = ${vn(dt * 1000)} triệu đồng`) && q.x.includes(`${vn(dt * 1000)} : ${vn(cuoi.v * 1e6)} = ${vn(v)}`)); return v; } },
  { id: L.de2, has: "Quan sát sơ đồ vị trí của vùng Duyên hải Nam Trung Bộ và Tây Nguyên", right: (q) => {
    const { T } = viTriDung(q), tay = Object.keys(T).filter((h) => /tây/.test(h) && !/Bộ$/.test(T[h])).map((h) => T[h]);
    assert.deepEqual(tay.sort(), ["Cam-pu-chia", "Lào"], "hai nước láng giềng ở phía tây");
    assert.equal(T["đông"], "Biển Đông");
    return "Vùng nằm giữa Lào, Cam-pu-chia ở phía tây và Biển Đông ở phía đông"; } },
  { id: L.de2, has: "GRDP bình quân đầu người của tỉnh P", right: (q) => {
    const [g, d] = so(/GRDP đạt (\d+) nghìn tỉ đồng, số dân là ([\d ]+) người/, q.q), tr = g * 1e6, v = tr / d;
    assert.ok(Number.isInteger(v) && q.unit === "triệu đồng" && q.x.includes(`= ${vn(tr)} triệu đồng`) && q.x.includes(`${vn(tr)} : ${vn(d)} = ${v}`)); return v; } },
  // GDCD: câu sắp xếp, câu chia việc (Bài 6), ba câu tính tiền (Bài 8)
  { id: G.de1, has: "Linh muốn sắp xếp thời gian ôn tập", right: (q) => {
    const bac = (o) => { const k = BUOC_TG.findIndex((re) => re.test(o)); assert.ok(k >= 0, "không nhận ra bước: " + o); return k; };
    assert.deepEqual(q.o.map(bac).sort(), [0, 1, 2, 3], "mỗi bước một ý");
    return [...q.o].sort((a, b) => bac(a) - bac(b)); } },
  { id: G.de1, has: "Tính theo mỗi 100 ml", right: (q) => {
    const [v1, g1, v2, g2] = so(/chai (\d+) ml giá ([\d ]+) đồng, chai (\d+) ml giá ([\d ]+) đồng/, q.q), d1 = (g1 / v1) * 100, d2 = (g2 / v2) * 100;
    assert.ok(v2 > v1 && d2 < d1 && q.unit === "đồng" && q.x.includes(`${vn(g1)} : ${v1} × 100 = ${vn(d1)}`) && q.x.includes(`${vn(g2)} : ${v2} × 100 = ${vn(d2)}`)); return d1 - d2; } },
  { id: G.de2, has: "Mỗi ngày nhóm cần làm bao nhiêu trang", right: (q) => {
    const [n] = so(/Còn (\d+) ngày/, q.q), [t] = so(/hoàn thành (\d+) trang/, q.q), [b] = so(/dành (\d+) ngày cuối/, q.q), v = t / (n - b);
    assert.ok(Number.isInteger(v) && q.unit === "trang" && q.x.includes(`${n} − ${b} = ${n - b}`) && q.x.includes(`${t} : ${n - b} = ${v}`)); return v; } },
  { id: G.de2, has: "số tiền bị tính thừa bao nhiêu đồng", right: (q) => {
    const [a, ga, b, gb] = so(/mua (\d+) hộp sữa, mỗi hộp ([\d ]+) đồng, và (\d+) gói bánh, mỗi gói ([\d ]+) đồng/, q.q), [tong] = so(/tổng cộng ([\d ]+) đồng/, q.q);
    const dung = a * ga + b * gb, v = tong - dung;
    assert.ok(v > 0 && v === gb && q.unit === "đồng" && q.x.includes(`= ${vn(dung)} (đồng)`) && q.x.includes(`${vn(tong)} − ${vn(dung)} = ${vn(v)}`) && q.x.includes("một gói bánh")); return v; } },
  { id: G.de2, has: "gói trả trước cả năm (12 tháng)", right: (q) => {
    const [th] = so(/cước internet ([\d ]+) đồng mỗi tháng/, q.q), [nam1] = so(/giá ([\d ]+) đồng, chất lượng/, q.q), v = th * 12 - nam1;
    assert.ok(v > 0 && q.unit === "đồng" && q.x.includes(`${vn(th)} × 12 = ${vn(th * 12)}`) && q.x.includes(`${vn(th * 12)} − ${vn(nam1)} = ${vn(v)}`)); return v; } }
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
  // câu ôn học kì I mang chữ chủ đề của kho cuối kì I: không trùng đề bài, đáp án câu nào của kho đó (Trùng ý giữa các kho, mục 3.3)
  {
    const cu = KHO[s.cu] = bank(s.cu).questions, goc = (x) => String(x).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
    const chung = Object.keys(M).filter((t) => cu.some((q) => q.topic === t));
    assert.ok(chung.length >= 1, s.pool + ": có câu ôn học kì I");
    K.filter((q) => chung.includes(q.topic)).forEach((q) => cu.filter((c) => c.topic === q.topic).forEach((c) => {
      assert.notEqual(goc(q.q), goc(c.q), "câu ôn trùng đề bài kho cuối kì I: " + q.q.slice(0, 60));
      if (q.type === "mc" && c.type === "mc") assert.notEqual(goc(q.o[0]), goc(c.o[0]), "câu ôn trùng đáp án kho cuối kì I: " + q.q.slice(0, 60));
    }));
  }
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
// Lịch sử và Địa lí: số câu Lịch sử, Địa lí của mỗi đề ghi đúng ở note (chủ đề Lịch sử đứng trước “Vùng Đồng bằng sông Hồng”)
{
  const T = Object.keys(bank(L.pool).pool.matrix), dau = T.indexOf("Vùng Đồng bằng sông Hồng"); assert.ok(dau > 0);
  L.from.forEach((id) => { const d = bank(id), ls = d.questions.filter((q) => T.indexOf(q.topic) < dau).length; assert.ok(d.note.includes(`${ls} câu Lịch sử, ${d.n - ls} câu Địa lí`), id + ": note ghi số câu Lịch sử, Địa lí"); });
}

/* ---------- đề bài không trùng câu nào khác trong file (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
[L, G].forEach((s) => {
  const deBai = BANKS.filter((b) => b.file === s.file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q) })));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
});

/* ---------- dò lộ đáp án (Rút ra N5; bộ dò của tests/lsdl-gdcd9-ck1.js) giữa hai câu rút được cùng lúc: khác ô (chủ đề, mức), hoặc
   cùng một ô rút từ 2 câu. Đáp án là số (từ hai chữ số, hoặc số thập phân) chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”,
   “bằng”, “được”); cặp nối: câu kia có cả hai vế; câu về thứ tự thời gian (sắp xếp, ý “A trước khi B”): câu kia không ghi ngày tháng
   nào của các sự kiện đó (cách ghi trong lời giải), cũng không có tên kèm năm của chúng (Rút ra N16b, DS10b). Đáp án bằng chữ (lựa
   chọn đúng của câu trắc nghiệm, đáp án câu điền) có ở câu kia thì chỉ in ra khi chạy với DO_LO=1 để người làm xem, danh sách đã
   xem ghi ở DA_XEM. ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || []).map(String);
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
// t có cụm s đứng thành từ riêng (“Na” không khớp “Nam”)
const coCum = (t, s) => { for (let i = t.indexOf(s); i >= 0; i = t.indexOf(s, i + 1)) if (!/[\p{L}\p{N}]/u.test(t[i - 1] || " ") && !/[\p{L}\p{N}]/u.test(t[i + s.length] || " ")) return true; return false; };
// ngày tháng của câu về thứ tự thời gian: cách ghi trong lời giải của mọi sự kiện có trong câu (bỏ cách ghi chỉ có năm như “1948”);
// câu sắp xếp các bước (GDCD) không có sự kiện nào trong bảng
const ngayCua = (q) => {
  const ds = q.type === "order" && q.o.every((o) => SU_KIEN.some(([k]) => o.toLowerCase().includes(k.toLowerCase()))) ? q.o
    : q.type === "tf4" ? q.o.flatMap((o) => { const m = /^(.+) trước khi (.+)\.$/.exec(o); return m ? [m[1], m[2]] : []; }) : [];
  return [...new Set(ds.map((d) => suKien(d)[2]).filter((g) => /\//.test(g)))];
};
const doLo = (qs, M, tenCau) => {
  const cungLuc = (p, q) => p.topic !== q.topic || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2;
  const lo = [], chuLo = [];
  qs.forEach((q, i) => {
    const so = (q.type === "num" && (q.ans >= 10 || !Number.isInteger(q.ans))) || (q.type === "fill" && /^\d{2,}$/.test(q.ans[0])) ? [val(q.type === "num" ? q.ans : q.ans[0])] : [];
    const cum = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? q.ans : [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const ngay = ngayCua(q);
    qs.forEach((p, j) => {
      if (j === i || !cungLuc(p, q)) return;
      const C = chu(p), T = C.map((s) => s.toLowerCase()), at = `${tenCau(p)} → ${tenCau(q)}: `;
      so.filter((x) => C.flatMap(soKQ).some((y) => close(x, y))).forEach((x) => lo.push(at + x));
      cap.filter(([l, r]) => T.some((t) => coCum(t, l.toLowerCase()) && coCum(t, r.toLowerCase()))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      ngay.filter((g) => C.some((t) => coCum(t, g))).forEach((g) => lo.push(at + "ngày " + g));
      cum.filter((s) => T.some((t) => coCum(t, s.toLowerCase()))).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const ten = new Map();
[L, G].forEach((s) => s.from.forEach((id) => KHO[s.pool].filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace(/9-gk2-/, "-") + "#" + (i + 1)))));
const loAll = [], chuAll = [];
[L, G].forEach((s) => { const r = doLo(KHO[s.pool], bank(s.pool).pool.matrix, (q) => ten.get(q)); loAll.push(...r.lo); chuAll.push(...r.chuLo); });
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuAll.join("\n"));
// đã xem (Phiên N9-gk2-lsdl-gdcd): “17” là phần ngày tháng (17/12/1946, 17/1/1960, “Tuần lễ vàng” 17 – 24/9/1945), không nói gì về vĩ
// tuyến 17 của câu điền
const DA_XEM = ["lsdl-de1#5 → lsdl-de2#6: 17", "lsdl-de1#9 → lsdl-de2#6: 17", "lsdl-de2#3 → lsdl-de2#6: 17"];
assert.deepEqual(chuAll, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loAll, [], "lộ đáp án:\n" + loAll.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 450”, ngày tháng của câu về thứ tự, lựa chọn đúng, đáp án câu điền
{
  const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thu = (qs) => { const M = new Proxy({}, { get: () => [1, 1, 1] }), r = doLo(qs, M, (q) => q.q.slice(0, 12)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  const khac = tim("Loại khoáng sản nào ở vùng Duyên hải"), khac2 = tim("Biết thích ứng với những thay đổi");
  assert.deepEqual(thu([tim("Bình quân lương thực có hạt theo đầu người"), gia(khac, "Ví dụ: 720 000 000 : 1 600 000 = 450.")]), ["450"]);
  assert.deepEqual(thu([tim("Tổng tiến công và nổi dậy Xuân 1975 theo đúng trình tự"), gia(khac, "Ngày 29/3, quân ta vào thành phố.")]), ["ngày 29/3"]);
  assert.deepEqual(thu([tim("hai cây công nghiệp lâu năm được trồng nhiều nhất"), gia(khac, "Vùng trồng nhiều cao su và điều.")]), ["Cao su và điều"]);
  assert.deepEqual(thu([tim("lấy vĩ tuyến ___"), gia(khac2, "Ranh giới ở vĩ tuyến 17 nằm trên sông.")]), ["17"]);
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book; và với câu của các kho khác ---------- */
// tên riêng nhiều chữ (vùng, tổ chức, sự kiện, văn bản, chiến dịch, địa danh, tên người) và tên bài: mỗi tên tính là một từ (như
// tests/lsdl-gdcd9-ck1.js)
const GOP = ["thanh pho ho chi minh", "trung du va mien nui phia bac", "duyen hai nam trung bo va tay nguyen", "dong bang song cuu long", "dong bang song hong",
  "bac trung bo", "dong nam bo", "ho chi minh", "vo nguyen giap", "truong chinh", "ngo dinh diem", "duong van minh",
  "viet nam dan chu cong hoa", "mat tran dan toc giai phong mien nam viet nam", "chinh phu cach mang lam thoi cong hoa mien nam viet nam",
  "dang cong san dong duong", "dang lao dong viet nam", "mat tran viet minh", "mat tran lien viet", "hoi viet nam cach mang thanh nien",
  "uy ban khoi nghia toan quoc", "khang chien chong my cuu nuoc", "khang chien chong thuc dan phap", "hoi nghi van hoa toan quoc lan thu hai",
  "dai hoi dai bieu toan quoc", "nha nhac cung dinh hue", "dan ca vi giam nghe tinh", "khu du tru sinh quyen the gioi", "di san van hoa phi vat the", "uy ban dan toc giai phong viet nam", "uy ban hanh chinh nam bo", "nha binh dan hoc vu", "trung hoa dan quoc",
  "quan giai phong", "quan doi sai gon", "chinh quyen sai gon", "ban thuong vu trung uong dang", "hoi nghi trung uong 15", "doan 559",
  "cach mang thang tam", "tong tuyen cu", "quoc hoi khoa i", "hiep dinh so bo", "hiep uoc hoa phap", "tam uoc", "hiep dinh gio ne vo",
  "hoi nghi gio ne vo", "hiep dinh pa ri", "ke hoach na va", "ke hoach ro ve", "chien tranh dac biet", "chien tranh cuc bo", "viet nam hoa chien tranh",
  "chien tranh lanh", "chien tranh the gioi thu hai", "tong tien cong va noi day", "chien dich ho chi minh", "chien dich viet bac", "chien dich bien gioi",
  "chien dich dien bien phu", "dien bien phu", "khang chien nhat dinh thang loi", "loi keu goi toan quoc khang chien", "tuan le vang", "quy doc lap",
  "lien hiep phap", "lien xo", "trung quoc", "cam pu chia", "dong duong", "tay nguyen", "nam bo", "bac bo", "trung bo", "mien bac", "mien nam",
  "buon ma thuot", "dinh doc lap", "tan son nhat", "long thanh", "can gio", "dau tieng", "tri an", "phong nha ke bang", "thanh nha ho", "co do hue",
  "hoi an", "my son", "hoang sa", "truong sa", "ly son", "phu quy", "viet bac", "dong khoi", "ap bac", "van tuong", "mo cay", "ben tre", "vinh long",
  "sai gon", "cho lon", "ha noi", "hai phong", "da nang", "khanh hoa", "lam dong", "dak lak", "gia lai", "quang ngai", "quang tri", "ha tinh",
  "nghe an", "thanh hoa", "ninh binh", "dong nai", "tay ninh", "an lao", "ba gia", "dong xoai", "phuoc long", "duong so 4", "song lo", "doan hung",
  "khe lau", "ban sao", "deo bong lau", "dong khe", "that khe", "hang bun", "nghi son", "vung ang", "chan may lang co", "dung quat", "chu lai",
  "nhon hoi", "van phong", "van don", "dinh vu cat hai", "nam can", "dinh an", "phu quoc", "ialy", "se san", "ke go", "cau hai", "ta dung", "bien ho",
  "hoa binh", "thac ba", "bien dong", "viet nam", "nong lam nghiep va thuy san", "cong nghiep va xay dung", "ti le che phu rung",
  "quan li thoi gian hieu qua", "thich ung voi thay doi", "tieu dung thong minh"
].sort((a, b) => b.length - a.length);
// câu tục ngữ, thành ngữ, khẩu hiệu, tên chiến thuật, lời văn bản hiệp định trích nguyên văn không tính là chép sách
const TRICH = ["Tìm Mỹ mà đánh, lùng nguỵ mà diệt", "Thi đua Ấp Bắc, giết giặc lập công", "Nhường cơm sẻ áo", "Ba sẵn sàng", "hoà để tiến", "phi Mỹ hoá",
  "dùng người Việt đánh người Việt", "trực thăng vận", "thiết xa vận", "ấp chiến lược", "trong danh dự", "Nước đến chân mới nhảy", "Nhập gia tuỳ tục",
  "Ăn quả nhớ kẻ trồng cây", "Uống nước nhớ nguồn", "Có công mài sắt, có ngày nên kim", "độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ",
  "độc lập, chủ quyền, thống nhất, toàn vẹn lãnh thổ"];
const khongDau = (s) => { let t = " " + TRICH.reduce((x, c) => x.split(c).join(" "), String(s).normalize("NFC")).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim() + " ";
  GOP.forEach((g) => { t = t.split(" " + g + " ").join(" " + g.replace(/ /g, "") + " "); }); return t.replace(/[aeiouy]+/g, "a").trim(); };
const tuCua = (s) => khongDau(s).split(" ").filter(Boolean);
const chuoi = (s, k) => { const w = tuCua(s), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
const truong = (q) => [q.q, q.x].concat(q.o || [], q.ans || [], q.l || [], q.r || []);
const boChuoi = (ds, k) => { const out = new Map(); ds.forEach(([id, s]) => { const w = tuCua(s); for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k).join(" "); if (!out.has(c)) out.set(c, new Set()); out.get(c).add(id); } }); return out; };
const khoMoi = KHO[L.pool].concat(KHO[G.pool]);
const bao = (bo, k) => [...new Set(khoMoi.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].filter((c) => bo.has(c)).map((c) => `${ten.get(q)} ~ ${[...bo.get(c)].join(", ")}: ${c}`)))];
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
console.log(n, "câu, ý đã tính lại hoặc đọc lại hình (hai ngân hàng); kho " + khoMoi.length + " câu, " + [L, G].map((s) => s.from.length + " đề cố định " + bank(s.pool).n + " câu").join(" và ") + ".");
console.log("MATH OK");
