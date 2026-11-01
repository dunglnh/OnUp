// Tính lại đáp án và kiểm tra ma trận hai ngân hàng lớp 9 giữa kì I của Phiên N9-gk1-lsdl-gdcd: Lịch sử và Địa lí (data/banks/9-lsdl.js)
// và GDCD (9-gdcd.js), theo mẫu tests/lsdl-gdcd9-ck1.js, tests/lsdl-gdcd9-ck2.js. Mỗi ngân hàng = các đề cố định trong from của đề ngẫu
// nhiên (cùng chia theo ma trận) + đề ngẫu nhiên không có câu riêng; số câu, số đề lấy từ danh mục. Câu có phép tính, có hình, câu sắp
// xếp được nhận ra bằng một đoạn chữ của đề (has, đúng một câu trong hai kho, đúng đề ghi ở id); so đáp án với kết quả tính bằng code:
// điền ans[0], trả lời bằng số ans, trắc nghiệm o[0], đúng/sai 4 ý a, sắp xếp o. Lịch sử và Địa lí: trình tự các sự kiện của ba câu sắp
// xếp (bảng ngày tháng theo sách, Bài 4, 7, 8), số năm kỉ niệm, tỉ lệ người dân tộc thiểu số, tỉ lệ tăng dân số, tỉ lệ lao động đã qua đào
// tạo, tỉ lệ rừng sản xuất trong rừng trồng mới, thu nhập bình quân của hai tỉnh (gấp mấy lần, tăng nhanh hơn, chênh lệch); ba hình đọc lại bằng code: biểu đồ
// cột sản lượng cà phê (gấp mấy lần), biểu đồ cột ghép số trâu và bò (mỗi ý đúng/sai xét lại bằng số đọc từ hình), biểu đồ tròn cơ cấu giá
// trị sản xuất công nghiệp (góc từng phần khớp số phần trăm ghi trong phần; nhận xét đúng, các nhận xét sai xét lại bằng số đọc từ hình).
// Câu trả lời bằng số, câu điền có đáp án là số, câu có hình, câu sắp xếp nào trong hai kho cũng phải có kiểm tra ở đây.
// Rồi kiểm tra mức độ và ma trận: mọi câu có lv; ma trận 40% Biết, 32% Hiểu, 28% Vận dụng (10 – 8 – 7 với đề 25 câu), chủ đề theo thứ
// tự bài như các đề; đề nào cũng chia đúng theo ma trận, nên ô nào cũng có số câu gấp số đề lần số câu ô đó rút; số câu Lịch sử, Địa lí
// của mỗi đề ghi đúng ở note; chữ chủ đề nào cũng có ở kho cuối kì I cùng môn (đề “Ôn chủ đề” rút chung); mỗi kho có ít nhất 4 câu
// đúng/sai 4 ý (kiểu Đ/S không lặp quá một phần ba), không có câu tự luận; đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N22),
// là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn (Rút ra N9-ck1-tin-congnghe); đáp án không lặp chữ của
// nhãn chủ đề (trừ khi mọi lựa chọn cùng có chữ đó); GDCD: câu tình huống (có nhân vật, việc làm cụ thể) từ một nửa kho; câu không trùng
// đề bài, đáp án câu cùng chủ đề của các kho cũ (kho cuối kì I, giữa kì II, cuối năm); mọi câu không gần trùng câu nào của các kho cũ cùng
// môn, cả kho cuối kì I (cặp hai âm tiết chung, như tests/lsdl-gdcd9-ck2.js); rút thử nhiều lần ra đúng ma trận, không ghi chú, gặp đủ
// câu của kho; học sinh đã làm hết một đề cố định thì đề ngẫu nhiên không rút lại câu của đề đó.
// Cuối cùng: đề bài không trùng câu nào khác trong file; dò lộ đáp án (bộ dò của tests/lsdl-gdcd9-ck2.js) giữa mọi cặp câu của kho (đề
// “Ôn chủ đề” rút chung cả chủ đề, đề ngẫu nhiên rút chung các chủ đề) và giữa câu cùng chủ đề của kho này với các kho cũ: đáp án là số
// ở vị trí kết quả, cặp nối, ngày tháng của câu về thứ tự thời gian (cả ngày tháng của các câu về trình tự thời gian ở kho cuối kì I,
// bảng NGAY_CU), đáp án bằng chữ (DO_LO=1 in ra, danh sách đã xem ở DA_XEM); bộ dò tự thử với câu cố ý lộ; có OnUp-Book thì so mọi trường
// chữ với chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm, tên riêng, tên chỉ tiêu thống kê, tên nhóm hoạt động cộng đồng nhiều chữ tính là
// một từ, bỏ qua câu thành ngữ, khẩu hiệu, tên văn kiện ghi đúng như sách; không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và với câu
// của mọi kho khác (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 5 từ).
// Chạy: node tests/lsdl-gdcd9-gk1.js → in MATH OK.
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
// cu: đề ngẫu nhiên của kho cuối kì I cùng môn (chữ chủ đề của kho này lấy theo kho đó)
const L = { pool: "lsdl9-gk1-ngau-nhien", cu: "lsdl9-ck1-ngau-nhien" }, G = { pool: "gdcd9-gk1-ngau-nhien", cu: "gdcd9-ck1-ngau-nhien" };
[L, G].forEach((s) => {
  const p = bank(s.pool); assert.ok(p && p.pool, "thiếu đề ngẫu nhiên " + s.pool);
  s.from = p.pool.from; s.de1 = s.from[0]; s.de2 = s.from[1]; s.file = p.file;
  assert.ok(s.from.length >= 2 && s.from.every((id) => bank(id) && bank(id).file === p.file), s.pool + ": from là các đề cố định cùng file");
  assert.ok(bank(s.cu) && bank(s.cu).file === p.file, s.pool + ": kho cuối kì I cùng file");
});

/* ---------- số ---------- */
const close = (x, y) => Math.abs(x - y) < 1e-9;
const sum = (a) => a.reduce((s, v) => s + v, 0);
const val = (s) => +String(s).replace(/\s/g, "").replace(",", "."); // “2 400 000” → 2400000, “2,5” → 2.5
const vn = (x) => { const [n, d] = String(x).split("."); return n.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : ""); }; // 2400000 → “2 400 000”
const nam = (s) => [...s.matchAll(/năm (\d{1,4})(?!\d| \d)/gi)].map((m) => +m[1]); // các năm ghi trong đề, theo thứ tự
const tuDon = (s) => new Set(String(s).toLowerCase().split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 1)); // các tiếng của một ô (như tests/lsdl4-ck2.js)
const lech = (a, b) => Math.abs(((((a - b) % 360) + 540) % 360) - 180); // độ lệch giữa hai góc (độ)

/* ---------- hình (bộ đọc của tests/lsdl-gdcd9-ck1.js) ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const ngang = (l) => num(l, "y1") === num(l, "y2");
const daDoc = new Set(); // hình đã đọc lại bằng code
// trục số: các số đặt ngay cạnh vạch (chân chữ thấp hơn vạch 5 đơn vị), cách đều theo giá trị; trả về hàm đổi toạ độ y ra giá trị
const trucSo = (nhan, vach, ten) => {
  assert.ok(nhan.length >= 3, ten + ": cần ít nhất 3 số trên trục");
  nhan.forEach((n) => assert.ok(vach.some((y) => close(y, n.y - 5)), `${ten}: số ${n.v} phải đặt ngay cạnh một vạch`));
  const s = [...nhan].sort((a, b) => a.v - b.v), k = (s[0].y - s[1].y) / (s[1].v - s[0].v);
  assert.ok(k > 0, ten + ": số lớn ở trên");
  s.forEach((n) => assert.ok(Math.abs(n.y - 5 - (s[0].y - 5 - k * (n.v - s[0].v))) < 1e-6, `${ten}: số ${n.v} không đặt đúng vạch`));
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
    assert.ok(Math.abs(num(r, "y") + num(r, "height") - day) < 1e-6, "cột đứng trên đường đáy");
    const cx = num(r, "x") + num(r, "width") / 2, v = Math.round(giaTri(num(r, "y")) * 1000) / 1000;
    const dinh = tx.filter((t) => t["text-anchor"] === "middle" && Math.abs(+t.x - cx) < 1e-6 && +t.y < day);
    assert.equal(dinh.length, 1, "mỗi cột một số ở đỉnh"); assert.ok(Math.abs(+dinh[0].y - (num(r, "y") - 6)) < 1e-6, "số ghi ngay trên đỉnh cột");
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

/* ---------- trình tự thời gian (bảng ngày tháng theo sách: Bài 4 tr. 19–20, Bài 7 tr. 31–32, Bài 8 tr. 36–37) ----------
   Mỗi sự kiện: [chữ nhận ra trong ô, ngày dạng YYYY-MM-DD hay YYYY-MM để so, cách ghi ngày trong lời giải]. */
const SU_KIEN = [
  ["Anh, Pháp tuyên chiến với Đức", "1939-09-03", "3/9/1939"], ["Quân Đức đánh chiếm nước Pháp", "1940-04", "7/1940"],
  ["uy hiếp Thủ đô Mát-xcơ-va", "1941-10", "10/1941"], ["công phá Béc-lin", "1945-04-16", "16/4/1945"],
  ["nông dân Hưng Nguyên", "1930-09-12", "12/9/1930"], ["xe lửa Trường Thi", "1937-07", "7/1937"],
  ["Mặt trận Nhân dân phản đế Đông Dương", "1936-07", "7/1936"], ["khu Đấu Xảo", "1938-05-01", "1/5/1938"],
  ["Nhật đảo chính Pháp", "1945-03-09", "9/3/1945"], ["Nhật – Pháp bắn nhau và hành động của chúng ta", "1945-03-12", "12/3/1945"],
  ["Hội nghị Quân sự cách mạng Bắc Kì", "1945-04-15", "15/4/1945"], ["từ Pác Bó về Tân Trào", "1945-05", "5/1945"]
];
const suKien = (s) => { const m = SU_KIEN.filter(([k]) => s.toLowerCase().includes(k.toLowerCase())); assert.equal(m.length, 1, "không nhận ra đúng một sự kiện: " + s); return m[0]; };
const thuTu = (q) => {
  const sk = q.o.map(suKien); sk.forEach(([, , ghi]) => assert.ok(q.x.includes(ghi), "lời giải ghi ngày " + ghi));
  assert.equal(new Set(sk.map((s) => s[1])).size, sk.length, "các sự kiện khác ngày nhau");
  return [...q.o].sort((a, b) => (suKien(a)[1] < suKien(b)[1] ? -1 : 1));
};
// ngày tháng của các câu về trình tự thời gian ở kho cuối kì I (Bài 4: ý “A trước khi B” của câu đúng/sai 4 ý; Bài 8: câu sắp xếp các
// sự kiện tháng Tám năm 1945): câu cùng chủ đề của kho này không ghi những ngày đó (đề “Ôn chủ đề” rút chung)
const NGAY_CU = {
  "Chiến tranh thế giới thứ hai": ["1/9/1939", "22/6/1941", "12/1941", "1/1942", "2/1943", "6/1944", "9/5/1945", "6/8/1945"],
  "Cách mạng tháng Tám năm 1945": ["13/8/1945", "16 – 17/8", "19/8", "24/8"]
};

/* ---------- các câu cần tính ----------
   id: đề chứa câu; has: đoạn chữ của đề; right(q): đáp án tính bằng code (so với ans[0], ans, o[0], a hoặc o). */
const so = (re, s) => { const m = re.exec(s); assert.ok(m, "không đọc được số liệu: " + re); return m.slice(1).map(val); };
const luat = (q, LUAT) => q.o.map((o) => { const l = LUAT.map(([re, f]) => [re.exec(o), f]).filter(([m]) => m); assert.equal(l.length, 1, "ý nào cũng có luật: " + o); return l[0][1](l[0][0]); });
const CHECKS = [
  // Lịch sử và Địa lí: Đề 1
  { id: L.de1, has: "trục thời gian về Chiến tranh thế giới thứ hai", right: thuTu },
  { id: L.de1, has: "trong những tháng đầu năm 1945", right: thuTu },
  { id: L.de1, has: "Người dân tộc thiểu số chiếm bao nhiêu phần trăm", right: (q) => {
    const [d, t] = so(/có ([\d ]+) người, trong đó ([\d ]+) người là người dân tộc thiểu số/, q.q), v = (t / d) * 100;
    assert.ok(Number.isInteger(v) && q.unit === "%" && q.x.includes(`${vn(t)} : ${vn(d)} × 100 = ${v}`), "lời giải ghi phép tính"); return v; } },
  { id: L.de1, has: "Thu nhập bình quân mỗi người một tháng ở hai tỉnh A và B", right: (q) => {
    const T = {}; [...q.q.matchAll(/tỉnh ([AB]) năm (\d{4}) là ([\d ]+), năm (\d{4}) là ([\d ]+)/g)].forEach((m) => { T[m[1]] = { [m[2]]: val(m[3]), [m[4]]: val(m[5]) }; });
    assert.deepEqual(Object.keys(T).sort(), ["A", "B"], "đề ghi thu nhập hai năm của hai tỉnh");
    const gap = (t, a, b) => T[t][b] / T[t][a];
    ["A", "B"].forEach((t) => { const [a, b] = Object.keys(T[t]).sort(), g = gap(t, a, b); assert.ok(q.x.includes(`${vn(T[t][b])} : ${vn(T[t][a])} = ${vn(Math.round(g * 1000) / 1000)}`), "lời giải ghi phép chia của tỉnh " + t); });
    const chenh = (n) => Math.abs(T.A[n] - T.B[n]);
    Object.keys(T.A).forEach((n) => assert.ok(q.x.includes(`= ${vn(chenh(n))} (nghìn đồng)`), "lời giải ghi chênh lệch năm " + n));
    return luat(q, [
      [/^Năm (\d{4}), thu nhập bình quân của tỉnh ([AB]) gấp ([\d,]+) lần năm (\d{4})\.$/, (m) => close(T[m[2]][m[1]] / T[m[2]][m[4]], val(m[3]))],
      [/^Từ năm (\d{4}) đến năm (\d{4}), thu nhập bình quân của tỉnh ([AB]) tăng nhanh hơn tỉnh ([AB])\.$/, (m) => gap(m[3], m[1], m[2]) > gap(m[4], m[1], m[2])],
      [/^Năm (\d{4}), thu nhập bình quân của tỉnh ([AB]) cao hơn tỉnh ([AB]) ([\d ]+) nghìn đồng\.$/, (m) => T[m[2]][m[1]] - T[m[3]][m[1]] === val(m[4])],
      [/^Năm (\d{4}), chênh lệch thu nhập bình quân giữa hai tỉnh lớn hơn năm (\d{4})\.$/, (m) => chenh(m[1]) > chenh(m[2])]
    ]); } },
  { id: L.de1, has: "khối lượng cà phê nhân thu hoạch", right: (q) => {
    const c = docCot(q.svg, "Nghìn tấn"), [b, a] = nam(q.q), v = (y) => { const x = c.find((z) => z.nam === y); assert.ok(x, "biểu đồ có năm " + y); return x.v; };
    assert.ok(a < b && q.unit === "lần", "đề hỏi năm sau gấp mấy lần năm trước");
    const g = Math.round((v(b) / v(a)) * 1000) / 1000;
    assert.ok(q.x.includes(`${v(b)} : ${v(a)} = ${vn(g)}`) && c.every((x, i) => !i || x.v > c[i - 1].v), "lời giải ghi phép chia; sản lượng tăng dần"); return g; } },
  { id: L.de1, has: "diện tích rừng trồng mới của tỉnh X", right: (q) => {
    const [t, s] = so(/trồng mới ([\d,]+) nghìn ha rừng, trong đó ([\d,]+) nghìn ha là rừng sản xuất/, q.q), v = Math.round((s / t) * 100 * 1000) / 1000;
    assert.ok(Number.isInteger(v) && q.unit === "%" && q.x.includes(`${vn(s)} : ${vn(t)} × 100 = ${v}`), "lời giải ghi phép tính"); return v; } },
  { id: L.de1, has: "trong giá trị sản xuất công nghiệp ở tỉnh Q", right: (q) => {
    const c = docTron(q.svg), [a, b] = Object.keys(c).sort(), K = "Khai khoáng", C = "Chế biến, chế tạo";
    assert.deepEqual(nam(q.q), [+a, +b], "đề hỏi từ năm đầu đến năm cuối của biểu đồ");
    assert.ok(c[b][C] > c[a][C] && c[b][K] < c[a][K], "chế biến, chế tạo tăng; khai khoáng giảm");
    const lon = Object.entries(c[b]).sort((x, y) => y[1] - x[1])[0][0];
    assert.ok(lon !== K && q.o.includes(`Năm ${b}, khai khoáng vẫn là nhóm có tỉ trọng lớn nhất`), "lựa chọn sai: khai khoáng lớn nhất");
    assert.ok(q.o.includes("Tỉ trọng của cả ba nhóm ngành đều tăng lên rất nhanh") && Object.keys(c[a]).some((k) => c[b][k] <= c[a][k]), "lựa chọn sai: cả ba nhóm cùng tăng");
    assert.ok(q.o.includes("Tỉ trọng khai khoáng tăng; tỉ trọng chế biến, chế tạo giảm"), "lựa chọn sai: đảo chiều");
    Object.keys(c[a]).forEach((k) => assert.ok(q.x.includes(`từ ${c[a][k]}% ${c[b][k] < c[a][k] ? "xuống" : "lên"} ${c[b][k]}%`), "lời giải ghi đúng số của " + k));
    assert.ok(q.x.includes(`Năm ${b}, chế biến, chế tạo có tỉ trọng lớn nhất`) && lon === C);
    return "Tỉ trọng chế biến, chế tạo tăng; tỉ trọng khai khoáng giảm"; } },
  // Lịch sử và Địa lí: Đề 2
  { id: L.de2, has: "trong những năm 1930 – 1938", right: thuTu },
  { id: L.de2, has: "in thành cuốn sách", right: () => "Đường Kách mệnh" }, // sách tr. 24, 27: Đường Kách mệnh (1927)
  { id: L.de2, has: "kỉ niệm tròn bao nhiêu năm", right: (q) => {
    const y = [...q.q.matchAll(/(?:^|\s)\d{1,2}\/\d{1,2}\/(\d{4})/g)].map((m) => +m[1]); assert.equal(y.length, 2, "đề ghi hai ngày");
    assert.ok(q.unit === "năm" && q.x.includes(`${y[1]} − ${y[0]} = ${y[1] - y[0]}`), "lời giải ghi phép trừ"); return y[1] - y[0]; } },
  { id: L.de2, has: "Tỉ lệ tăng dân số của tỉnh Q", right: (q) => {
    const [a, b] = so(/có ([\d ]+) người; đến năm \d{4}, số dân của tỉnh là ([\d ]+) người/, q.q), t = b - a, v = Math.round((t / a) * 100 * 1000) / 1000;
    assert.ok(q.unit === "%" && q.x.includes(`${vn(b)} − ${vn(a)} = ${vn(t)}`) && q.x.includes(`${vn(t)} : ${vn(a)} × 100 = ${vn(v)}`), "lời giải ghi phép tính"); return v; } },
  { id: L.de2, has: "Tỉ lệ lao động đã qua đào tạo của tỉnh Y", right: (q) => {
    const [l, d] = so(/là (\d+) nghìn người, trong đó (\d+) nghìn người đã qua đào tạo/, q.q), v = (d / l) * 100;
    assert.ok(Number.isInteger(v) && q.unit === "%" && q.x.includes(`${d} : ${l} × 100 = ${v}`), "lời giải ghi phép tính"); return v; } },
  { id: L.de2, has: "số lượng trâu và bò của tỉnh M", right: (q) => {
    const c = docCot(q.svg, "Nghìn con"), n = Object.keys(c).map(Number).sort((a, b) => a - b), so1 = (y, k) => { assert.ok(c[y], "biểu đồ có năm " + y); return c[y][k]; };
    const ten = { "trâu": "Trâu", "bò": "Bò" };
    assert.ok(q.x.includes(n.map((y) => so1(y, "Trâu")).join(" → ")), "lời giải ghi số trâu các năm");
    return luat(q, [
      [/^Từ năm (\d{4}) đến năm (\d{4}), số lượng (trâu|bò) của tỉnh M giảm liên tục\.$/, (m) => { const d = n.filter((y) => y >= +m[1] && y <= +m[2]); return d.length >= 3 && d.every((y, i) => !i || so1(y, ten[m[3]]) < so1(d[i - 1], ten[m[3]])); }],
      [/^Năm (\d{4}), số bò nhiều hơn số trâu (\d+) nghìn con\.$/, (m) => { assert.ok(q.x.includes(`${so1(+m[1], "Bò")} − ${so1(+m[1], "Trâu")} = `), "lời giải ghi phép trừ"); return so1(+m[1], "Bò") - so1(+m[1], "Trâu") === +m[2]; }],
      [/^Năm (\d{4}), tỉnh M nuôi nhiều trâu hơn bò\.$/, (m) => so1(+m[1], "Trâu") > so1(+m[1], "Bò")],
      [/^Từ năm (\d{4}) đến năm (\d{4}), số lượng bò tăng thêm (\d+) nghìn con\.$/, (m) => { const t = so1(+m[2], "Bò") - so1(+m[1], "Bò"); assert.ok(q.x.includes(`${so1(+m[2], "Bò")} − ${so1(+m[1], "Bò")} = ${t}`), "lời giải ghi phép trừ"); return t === +m[3]; }]
    ]); } },
  // GDCD
  { id: G.de1, has: "Chín bỏ làm ___", right: () => "mười" }
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
// câu trả lời bằng số, câu điền có đáp án là số, câu có hình, câu sắp xếp nào cũng phải được tính lại ở trên
kho.filter((q) => q.type === "num" || q.svg || q.type === "order" || (q.type === "fill" && /^[\d\s,.−-]+$/.test(q.ans[0]))).forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + q.q.slice(0, 60)));
assert.ok(KHO[L.pool].filter((q) => q.svg).length >= 3 && L.from.every((id) => KHO[L.pool].some((q) => q.src === id && q.svg)), "Lịch sử và Địa lí: vài câu có hình, đề nào cũng có");
// câu đúng/sai 4 ý có ý “A trước khi B” thì phải là câu về trình tự thời gian, so được với bảng (kho này không có câu như vậy)
kho.filter((q) => q.type === "tf4").forEach((q) => q.o.forEach((o) => assert.ok(!/ trước khi /.test(o), "ý “A trước khi B” chưa có kiểm tra: " + o)));

/* ---------- mức độ và ma trận ---------- */
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
// chữ của nhãn chủ đề (bỏ phần trong ngoặc, chữ “Vùng ”), tách theo “ và ”, “, ”
const phanNhan = (t) => t.replace(/\s*\([^)]*\)$/, "").replace(/^Vùng /, "").split(/ và |, /).map((s) => s.trim().toLowerCase()).filter((s) => s.includes(" ") || s.length >= 6);
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const CHUNG = new Set(["nào dưới", "dưới đây", "đây là", "là một", "mỗi ý", "ý sau", "sau đúng", "đúng hay", "hay sai", "ở hình", "nào sau", "sau đây"]);
const cap2 = (s) => { const w = String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x); };
const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !CHUNG.has(c) && !nhan.has(c))); };
// câu của các kho cũ cùng file (cuối kì I, giữa kì II, cuối năm): đề “Ôn chủ đề” rút chung với câu cùng chủ đề của kho này
const cuCung = (s) => { const cua = new Set(s.from.concat(s.pool)); return BANKS.filter((b) => b.file === s.file && b.grade === bank(s.pool).grade && !cua.has(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => Object.assign({ at: b.id + "#" + (i + 1) }, q))); };
const daAn = (q) => (q.type === "mc" ? q.o[0] : q.type === "fill" ? q.ans[0] : q.type === "num" ? String(q.ans) : null);
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
  // chữ chủ đề như kho cuối kì I cùng môn (đề “Ôn chủ đề” rút chung câu cùng chủ đề)
  Object.keys(M).forEach((t) => assert.ok(bank(s.cu).questions.some((q) => q.topic === t), `${s.pool}: chủ đề “${t}” không có ở kho cuối kì I`));
  const tf4 = K.filter((q) => q.type === "tf4"), kieu = {};
  assert.ok(tf4.length >= 4 && !K.some((q) => q.type === "essay"), s.pool + ": ít nhất 4 câu đúng/sai 4 ý, không có câu tự luận");
  tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
  assert.ok(Math.max(...Object.values(kieu)) <= Math.ceil(tf4.length / 3), s.pool + ": kiểu Đ/S của các câu đúng/sai 4 ý lặp nhiều quá: " + JSON.stringify(kieu));
  // nối cột (như tests/lsdl4-ck2.js): có một ô thừa, ô bên phải không trùng nhau, cặp nối không có chữ chung (không nối được nhờ chữ trùng,
  // như “Lào → … của người Lào”, “nhà tình nghĩa → Đền ơn đáp nghĩa”)
  K.filter((q) => q.type === "match").forEach((q) => {
    assert.ok(new Set(q.r).size === q.r.length && q.r.length === q.l.length + 1, "nối cột có một ô thừa, ô bên phải không trùng nhau: " + q.q.slice(0, 60));
    q.l.forEach((l, i) => { const chung = [...tuDon(l)].filter((w) => tuDon(q.r[i]).has(w)); assert.deepEqual(chung, [], `cặp nối “${l} → ${q.r[i]}” có chữ trùng`); });
  });
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
  // câu cùng chủ đề của các kho cũ cùng file: không trùng đề bài, đáp án (đề “Ôn chủ đề” rút chung)
  {
    const cu = cuCung(s);
    K.forEach((q) => cu.filter((c) => c.topic === q.topic).forEach((c) => {
      assert.notEqual(goc(q.q), goc(c.q), `${q.src}: đề bài trùng câu ${c.at}`);
      const a = daAn(q), b2 = daAn(c);
      if (a !== null && b2 !== null) assert.notEqual(goc(a), goc(b2), `${q.src} trùng đáp án “${a}” với ${c.at}`);
    }));
  }
  // không gần trùng câu của các kho cũ cùng môn, cả kho cuối kì I (Rút ra N25; như tests/lsdl-gdcd9-ck2.js): đề bài cùng các lựa chọn,
  // ô nối, ô sắp xếp có từ một nửa số cặp hai âm tiết liền nhau (tính trên câu ít cặp hơn, bỏ các cặp có ở mọi câu như “nào dưới đây” và
  // cặp của nhãn chủ đề) chung với một câu cũ thì báo
  {
    const cua = new Set(s.from.concat(s.pool));
    const cu = BANKS.filter((b) => !cua.has(b.id) && b.subject === p.subject).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), c: capAm(q) })));
    assert.ok(cu.some((e) => e.at.startsWith(s.cu.replace(/ngau-nhien$/, ""))), s.pool + ": có kho cũ cùng môn để so, cả kho cuối kì I");
    K.forEach((q) => { const c = capAm(q); cu.forEach((e) => {
      const chung = [...c].filter((x) => e.c.has(x)).length;
      assert.ok(chung / Math.min(c.size, e.c.size) < 0.5, `gần trùng câu của kho cũ ${e.at}: ${q.src} “${q.q.slice(0, 50)}”`);
    }); });
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
// Lịch sử và Địa lí: số câu Lịch sử, Địa lí của mỗi đề ghi đúng ở note (chủ đề Lịch sử đứng trước “Dân tộc và dân số”)
{
  const T = Object.keys(bank(L.pool).pool.matrix), dau = T.indexOf("Dân tộc và dân số"); assert.ok(dau > 0);
  L.from.forEach((id) => { const d = bank(id), ls = d.questions.filter((q) => T.indexOf(q.topic) < dau).length; assert.ok(d.note.includes(`${ls} câu Lịch sử, ${d.n - ls} câu Địa lí`), id + ": note ghi số câu Lịch sử, Địa lí"); });
}
// GDCD: câu tình huống là chính (Rút ra N9-ck1-lsdl-gdcd): đề bài (câu nối: cả cột trái; câu đúng/sai 4 ý: cả các ý) kể việc làm, lời nói
// của một người cụ thể (tên riêng, “Anh”, “Chị”, “Bố”…, “Nhóm”, “Chi đoàn”, “Một bạn”, “Một cửa hàng”, “Trên mạng”) hay của một cộng
// đồng cụ thể (“Một xã”, “Làng của”, “Đoàn phường”); từ một nửa kho
{
  const AI = "Anh|Chị|Bố|Mẹ|Ông|Bà|Nhóm|Chi đoàn|Đoàn phường|Một bạn|Một cửa hàng|Gia đình|Làng của|Trên mạng|Thanh niên xã";
  const TEN = "Huy|Quang|Hà|Vinh|Châu|Hào|Tín|Yến|Nhân|Thu|Cường|Lụa|Phương|Hiền|Thịnh|Hậu|Bích|Sinh|Kiên|Hương|Duyên|Như|Khoa|Mai|Tuấn Anh|Minh Khôi|Thanh|Hưng|Bảo Ngọc|Hạ|Tâm Anh|Lâm|Long|Trung|Đức|Minh Anh|Toản|Tùng|Ly|Khang|Nguyên|Thắng|Lực|Tiến|Vĩ";
  const RE = new RegExp(`(?<!\\p{L})(?:${AI}|${TEN})(?!\\p{L})`, "u");
  const tinhHuong = (q) => RE.test(q.q + (q.type === "match" ? " " + q.l.join(" ") : "") + (q.type === "tf4" ? " " + q.o.join(" ") : ""));
  assert.ok(tinhHuong({ q: "Bạn thân của Hiền kể chuyện riêng." }) && tinhHuong({ q: "Mỗi ý sau đúng hay sai?", type: "tf4", o: ["Chị Như vào đội tình nguyện."] }) && !tinhHuong({ q: "Khoan dung có nghĩa là gì?" }) && !tinhHuong({ q: "Hoạt động nào thuộc nhóm phòng, chống tệ nạn xã hội?" }), "tự thử câu tình huống");
  const K = KHO[G.pool], th = K.filter(tinhHuong).length;
  assert.ok(th * 2 >= K.length, `GDCD: câu tình huống mới có ${th}/${K.length}`);
  console.log(`GDCD: ${th}/${K.length} câu tình huống.`);
}

/* ---------- đề bài không trùng câu nào khác trong file (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
[L, G].forEach((s) => {
  const deBai = BANKS.filter((b) => b.file === s.file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q) })));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
});

/* ---------- dò lộ đáp án (Rút ra N5; bộ dò của tests/lsdl-gdcd9-ck2.js) giữa mọi cặp câu của kho: đề “Ôn chủ đề” rút chung cả chủ đề
   (cả câu cùng ô), đề ngẫu nhiên rút chung các chủ đề; và giữa câu cùng chủ đề của kho này với các kho cũ cùng file. Đáp án là số (từ
   hai chữ số, hoặc số thập phân) chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”, “bằng”, “được”); cặp nối: câu kia có cả hai
   vế; câu về thứ tự thời gian (câu sắp xếp): câu kia không ghi ngày tháng nào của các sự kiện đó (cách ghi trong lời giải); câu cùng chủ
   đề với câu về trình tự thời gian của kho cuối kì I không ghi ngày tháng của câu đó (NGAY_CU). Đáp án bằng chữ (lựa chọn đúng của câu
   trắc nghiệm, đáp án câu điền) có ở câu kia thì chỉ in ra khi chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM. ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || []).map(String);
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
// t có cụm s đứng thành từ riêng (“Na” không khớp “Nam”)
const coCum = (t, s) => { for (let i = t.indexOf(s); i >= 0; i = t.indexOf(s, i + 1)) if (!/[\p{L}\p{N}]/u.test(t[i - 1] || " ") && !/[\p{L}\p{N}]/u.test(t[i + s.length] || " ")) return true; return false; };
// ngày tháng của câu về thứ tự thời gian: cách ghi trong lời giải của mọi sự kiện có trong câu sắp xếp
const ngayCua = (q) => (q.type === "order" && q.o.every((o) => SU_KIEN.some(([k]) => o.toLowerCase().includes(k.toLowerCase()))) ? [...new Set(q.o.map((d) => suKien(d)[2]))] : []);
const doLo = (qs, tenCau, cungLuc) => {
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
[L, G].forEach((s) => s.from.forEach((id) => KHO[s.pool].filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace(/9-gk1-/, "-") + "#" + (i + 1)))));
const loAll = [], chuAll = [];
[L, G].forEach((s) => {
  // mọi cặp câu của kho
  const r = doLo(KHO[s.pool], (q) => ten.get(q), () => true); loAll.push(...r.lo); chuAll.push(...r.chuLo);
  // câu cùng chủ đề của kho này với các kho cũ cùng file (chỉ cặp khác kho)
  const cu = cuCung(s);
  cu.forEach((c) => ten.set(c, c.at.replace(/9-(ck1|gk2|ck2)-/, "-$1-")));
  Object.keys(bank(s.pool).pool.matrix).forEach((t) => {
    const qs = KHO[s.pool].filter((q) => q.topic === t).concat(cu.filter((c) => c.topic === t));
    const r2 = doLo(qs, (q) => ten.get(q), (p, q) => KHO[s.pool].includes(p) !== KHO[s.pool].includes(q)); loAll.push(...r2.lo); chuAll.push(...r2.chuLo);
  });
});
// ngày tháng của các câu về trình tự thời gian ở kho cuối kì I: có thật trong lời giải của câu đó, và không có ở câu cùng chủ đề của kho này
Object.entries(NGAY_CU).forEach(([t, ds]) => {
  const goc1 = bank(L.cu).questions.filter((q) => q.topic === t && (q.type === "order" || (q.type === "tf4" && /trình tự/.test(q.q))));
  assert.equal(goc1.length, 1, "kho cuối kì I có một câu về trình tự thời gian ở chủ đề " + t);
  ds.forEach((g) => assert.ok(goc1[0].x.includes(g), `lời giải câu về trình tự của kho cuối kì I ghi ${g}`));
  KHO[L.pool].filter((q) => q.topic === t).forEach((q) => ds.filter((g) => chu(q).some((s) => coCum(s, g))).forEach((g) => loAll.push(`${ten.get(q)}: ngày ${g} của câu về trình tự thời gian ở kho cuối kì I`)));
});
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuAll.join("\n"));
// đã xem (Phiên N9-gk1-lsdl-gdcd): …
const DA_XEM = [];
assert.deepEqual(chuAll, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loAll, [], "lộ đáp án:\n" + loAll.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 45”, ngày tháng của câu về thứ tự, lựa chọn đúng, cặp nối
{
  const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thu = (qs) => { const r = doLo(qs, (q) => q.q.slice(0, 12), () => true); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  const khac = tim("Ngành lâm nghiệp của nước ta gồm những hoạt động nào"), khac2 = tim("Khoan dung có nghĩa là gì");
  assert.deepEqual(thu([tim("diện tích rừng trồng mới của tỉnh X"), gia(khac, "Ví dụ: 15,2 : 16 × 100 = 95.")]), ["95"]);
  assert.deepEqual(thu([tim("trong những năm 1930 – 1938"), gia(khac, "Ngày 12/9/1930, nông dân biểu tình.")]), ["ngày 12/9/1930"]);
  assert.deepEqual(thu([tim("đã tạo nên bước ngoặt của Chiến tranh thế giới thứ hai"), gia(khac, "Thắng lợi ở thành phố Xta-lin-grát là bước ngoặt.")]), ["Thắng lợi ở thành phố Xta-lin-grát"]);
  assert.deepEqual(thu([tim("Nối mỗi nước ở cột trái"), gia(khac, "Mông Cổ: phong trào giải phóng dân tộc (1921 – 1924), lập nước cộng hoà nhân dân.")]), ["Mông Cổ → Phong trào giải phóng dân tộc (1921 – 1924), lập nước cộng hoà nhân dân"]);
  assert.deepEqual(thu([tim("Chín bỏ làm ___"), gia(khac2, "Đừng chấp nhặt, chín cũng tính là mười.")]), ["mười"]);
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book; và với câu của các kho khác ---------- */
// tên riêng nhiều chữ (vùng, tổ chức, sự kiện, chính sách, văn kiện, tên người, địa danh), tên ngành, tên chỉ tiêu thống kê, tên bài và
// tên nhóm hoạt động cộng đồng như sách: mỗi tên tính là một từ (mọi tên của tests/lsdl-gdcd9-ck1.js; thêm tên của Bài 1–8 phần Lịch sử,
// Địa lí và Bài 1–3 GDCD)
const GOP = ["thanh pho ho chi minh", "trung du va mien nui phia bac", "duyen hai nam trung bo va tay nguyen", "dong bang song cuu long", "dong bang song hong",
  "bac trung bo", "dong nam bo", "chu tich ho chi minh", "lanh tu ho chi minh", "ho chi minh", "nguyen ai quoc", "phan chau trinh", "phan boi chau",
  "doan thanh nien cong san ho chi minh", "dieu le doan", "dang cong san viet nam", "dang cong san dong duong", "quoc te cong san", "dang bon se vich",
  "hoi viet nam cach mang thanh nien", "viet nam quoc dan dang", "tan viet cach mang dang", "tam tam xa", "mat tran nhan dan phan de dong duong",
  "mat tran dan chu dong duong", "mat tran nhan dan", "mat tran viet minh", "mat tran dong minh chong phat xit", "vien dan bieu trung ki", "vien dan bieu bac ki",
  "ban chap hanh trung uong", "ban thuong vu trung uong", "hoi nghi quan su cach mang bac ki", "viet nam giai phong quan", "uy ban khoi nghia toan quoc",
  "dai hoi quoc dan", "viet nam dan chu cong hoa", "tuyen ngon doc lap", "quang truong ba dinh", "cach mang thang tam", "cach mang thang muoi nga",
  "cach mang thang muoi", "chien tranh the gioi thu hai", "chien tranh the gioi thu nhat", "chinh sach kinh te moi", "chinh sach moi", "kinh te chi huy",
  "cong nghiep hoa xa hoi chu nghia", "cong nghiep hoa hien dai hoa", "chu nghia xa hoi", "chu nghia phat xit", "phong trao ngu tu", "dong bac trung quoc",
  "hong quan lien xo", "lien xo", "xta lin grat", "mat xco va", "bec lin", "hi ro si ma", "na ga sa ki", "ru do ven", "le nin", "mec lanh", "sa dien",
  "quang chau", "bac kinh", "trung quoc", "mong co", "tho nhi ky", "in do ne xi a", "ong keo", "com ma dam", "gia va", "xu ma to ra", "dong duong",
  "nhat ban", "i ta li a", "hung ga ri", "viet nam", "ha noi", "nghe an", "hung nguyen", "dau xao", "pac bo", "tan trao", "tuyen quang", "yen bai", "lao cai",
  "bac ki", "trung ki", "nam ki", "bac trung ki", "duong kach menh", "son la", "lai chau", "ialy", "gia rai", "e de", "ba na", "kho me", "viet gap", "global gap",
  "hoa ky", "o xtray li a", "nong lam nghiep va thuy san", "nong nghiep lam nghiep va thuy san", "cong nghiep va xay dung", "che bien che tao",
  "san xuat che bien thuc pham", "song co li tuong", "hoat dong cong dong", "thanh nien tinh nguyen", "hoi chu thap do", "doi thieu nien tien phong",
  "ti le lao dong da qua dao tao", "gin giu va phat huy truyen thong van hoa dan toc",
  // của tests/lsdl-gdcd9-ck1.js
  "ton duc thang", "nguyen thai hoc", "nguyen an ninh", "dang cong san phap", "dang xa hoi phap", "dong duong cong san dang", "an nam cong san dang",
  "dong duong cong san lien doan", "hoi lien hiep thuoc dia", "cong dong kinh te chau au", "cong dong than thep chau au", "lien minh chau au",
  "hoi dong tuong tro kinh te", "khoi quan su bac dai tay duong", "hiep uoc vac sa va", "ke hoach mac san", "chinh sach cong san thoi chien",
  "chinh sach lang gieng than thien", "hiep uoc an ninh my nhat", "cong hoa nhan dan trung hoa", "lien bang xo viet", "chu nghia mac le nin",
  "chien tranh lanh", "dai hoi tua", "hoi nghi vec xai", "tran chau cang", "nooc mang di", "dang quoc dai", "co cau dan so vang", "ti so gioi tinh",
  "mat do dan so", "von dau tu nuoc ngoai", "duong sat thong nhat", "khach quan va cong bang", "bao ve hoa binh", "quan li thoi gian hieu qua",
  "to ru man", "goc ba chop", "gan di", "hit le", "ba lan", "hai phong", "quang ninh", "ha tinh", "sai gon", "phu tho", "bac ninh", "thai nguyen",
  "ninh binh", "hung yen", "hoa binh", "dong au", "tay au", "my la tinh", "an do", "a pa tit", "hoang lien son", "ha long", "cat ba", "dong bac", "tay bac"
].sort((a, b) => b.length - a.length);
// câu thành ngữ, tục ngữ, khẩu hiệu, lời dặn, tên văn kiện, chỉ thị, sách ghi đúng như gốc: không tính là chép sách
const TRICH = ["Đâu cần thanh niên có, việc gì khó thanh niên làm", "Lá lành đùm lá rách, lá rách ít đùm lá rách nhiều", "Uống nước nhớ nguồn, ăn quả nhớ kẻ trồng cây",
  "Bầu ơi thương lấy bí cùng, tuy rằng khác giống nhưng chung một giàn", "Chín bỏ làm", "khép lại quá khứ, hướng tới tương lai", "Tương thân tương ái",
  "Ăn cháo đá bát", "Đứng núi này trông núi nọ", "Nước đổ lá khoai", "Sơ thảo lần thứ nhất những Luận cương về vấn đề dân tộc và vấn đề thuộc địa",
  "Nhật – Pháp bắn nhau và hành động của chúng ta", "Kinh tế chỉ huy"];
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
