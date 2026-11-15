// Tính lại đáp án và kiểm tra ma trận hai ngân hàng lớp 7 cuối kì I của Phiên N7-ck1-lsdl-gdcd: Lịch sử và Địa lí (data/banks/7-lsdl.js)
// và GDCD (7-gdcd.js), theo mẫu tests/lsdl-gdcd9-ck1.js, tests/lsdl-gdcd9-gk1.js. Mỗi ngân hàng = hai đề cố định trong from của đề ngẫu
// nhiên (cùng chia theo ma trận) + đề ngẫu nhiên không có câu riêng; số câu, số đề lấy từ danh mục. Câu có phép tính, có hình, câu sắp
// xếp, câu nối được nhận ra bằng một đoạn chữ của đề (has, đúng một câu trong hai kho, đúng đề ghi ở id); so đáp án với kết quả tính bằng
// code: điền ans[0], trả lời bằng số ans, trắc nghiệm o[0], đúng/sai 4 ý a, sắp xếp o, nối cột r (theo l). Lịch sử và Địa lí: số năm (đọc
// các năm trong đề, so với năm của sách), trình tự các chuyến đi của phát kiến địa lí (câu sắp xếp; bảng năm theo sách SU_KIEN), tỉ lệ
// dân đô thị, mật độ dân số, khu vực của từng nước theo bảng của sách (KHU_VUC), tên bộ luật theo sách; bốn hình đọc lại bằng code: trục
// thời gian (vạch đặt theo tỉ lệ năm, năm trên vạch, nhãn dưới vạch; mốc được hỏi khớp năm của sự kiện theo SU_KIEN), hai sơ đồ vị trí
// tiếp giáp của châu lục (hướng của từng ô so với ô giữa, mũi tên chỉ hướng bắc, nơi tiếp giáp theo sách ở TIEP_GIAP), biểu đồ tròn dân
// số theo nhóm tuổi (góc của từng phần khớp số phần trăm ghi trong phần; mỗi ý đúng/sai xét lại bằng số đọc từ hình); chữ trong hình từ
// cỡ 13, trong khung, không đè nhau. GDCD: câu tục ngữ về chữ tín. Câu trả lời bằng số, câu điền có đáp án là số, câu có hình, câu sắp
// xếp, câu nối nào trong hai kho cũng phải có kiểm tra ở đây.
// Rồi kiểm tra mức độ và ma trận: mọi câu có lv; ma trận 40% Biết, 32% Hiểu, 28% Vận dụng (10 – 8 – 7 với đề 25 câu), chủ đề theo thứ
// tự bài như các đề; đề nào cũng chia đúng theo ma trận, nên ô nào cũng có gấp đôi số câu ô đó rút; số câu Lịch sử, Địa lí của mỗi đề
// ghi đúng ở note; mỗi kho có ít nhất 4 câu đúng/sai 4 ý (kiểu Đ/S không lặp quá một phần ba), không có câu tự luận; câu nối có một ô
// thừa, cặp nối không có chữ chung; đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N22), là lựa chọn dài nhất hay ngắn nhất ở
// không quá một phần ba số câu nhiều lựa chọn (Rút ra N9-ck1-tin-congnghe); đáp án không lặp chữ của nhãn chủ đề (trừ khi mọi lựa chọn
// cùng có chữ đó); GDCD: câu tình huống (có nhân vật, việc làm cụ thể) từ một nửa kho; chữ như sách in năm 2026 (không “huyện”, “63
// tỉnh”, tên tỉnh đã nhập năm 2025); mọi câu không gần trùng câu nào của các kho cùng môn đã có, cả 6-lsdl.js, 6-gdcd.js (cặp hai âm tiết
// chung, như tests/lsdl-gdcd9-gk1.js); rút thử nhiều lần ra đúng ma trận, không ghi chú, gặp đủ câu của kho; học sinh đã làm hết một đề
// cố định thì đề ngẫu nhiên không rút lại câu của đề đó.
// Cuối cùng: đề bài không trùng câu nào khác trong file; dò lộ đáp án (bộ dò của tests/lsdl-gdcd9-gk1.js) giữa mọi cặp câu của kho (đề
// “Ôn chủ đề” rút chung cả chủ đề, đề ngẫu nhiên rút chung các chủ đề): đáp án là số ở vị trí kết quả, cặp nối, năm của câu về thứ tự
// thời gian, năm của mốc được hỏi trên trục thời gian, đáp án bằng chữ (DO_LO=1 in ra, danh sách đã xem ở DA_XEM); bộ dò tự thử với câu
// cố ý lộ; có OnUp-Book thì so mọi trường chữ với chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm, tên riêng nhiều chữ tính là một từ, bỏ qua
// câu tục ngữ, tên văn bản luật ghi đúng như sách; không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và với câu của mọi kho khác
// (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 5 từ).
// Chạy: node tests/lsdl-gdcd7-ck1.js → in MATH OK.
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
const L = { pool: "lsdl7-ck1-ngau-nhien" }, G = { pool: "gdcd7-ck1-ngau-nhien" };
[L, G].forEach((s) => {
  const p = bank(s.pool); assert.ok(p && p.pool, "thiếu đề ngẫu nhiên " + s.pool);
  s.from = p.pool.from; s.de1 = s.from[0]; s.de2 = s.from[1]; s.file = p.file;
  assert.ok(s.from.length === 2 && s.from.every((id) => bank(id) && bank(id).file === p.file), s.pool + ": from là hai đề cố định cùng file");
});

/* ---------- số ---------- */
const close = (x, y) => Math.abs(x - y) < 1e-9;
const sum = (a) => a.reduce((s, v) => s + v, 0);
const val = (s) => +String(s).replace(/\s/g, "").replace(",", "."); // “2 400 000” → 2400000, “2,5” → 2.5
const vn = (x) => { const [n, d] = String(x).split("."); return n.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : ""); }; // 2400000 → “2 400 000”
const nam = (s) => [...s.matchAll(/năm (\d{1,4})(?!\d| \d)/gi)].map((m) => +m[1]); // các năm ghi trong đề, theo thứ tự
const LA_MA = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"];
const theKi = (y) => LA_MA[Math.floor((y - 1) / 100)]; // năm sau Công nguyên: 1–100 thế kỉ I, 101–200 thế kỉ II…
const tuDon = (s) => new Set(String(s).toLowerCase().split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 1)); // các tiếng của một ô (như tests/lsdl4-ck2.js)
const lech = (a, b) => Math.abs(((((a - b) % 360) + 540) % 360) - 180); // độ lệch giữa hai góc (độ)

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const ngang = (l) => num(l, "y1") === num(l, "y2");
const daDoc = new Set(); // hình đã đọc lại bằng code
// bề rộng ước của một dòng chữ cỡ f (chữ thường ~0,55f, chữ hoa, số ~0,62f): để kiểm tra chữ không đè nhau, không ra ngoài khung
const rongChu = (t, f) => [...String(t)].reduce((s, c) => s + (/[A-ZĐ0-9ÂÊÔƠƯ(]/.test(c) ? 0.62 : /[ \-–.,:]/.test(c) ? 0.3 : 0.55) * f, 0);
const khung = (svg) => { const m = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg); assert.ok(m, "hình có viewBox"); return { w: +m[1], h: +m[2] }; };
// chữ trong hình từ cỡ 13 (chữ ≥ 13px ở 360px), nằm trong khung, hai dòng chữ không đè nhau
const chuTrongHinh = (svg, ten) => {
  const K = khung(svg), hop = texts(svg).map((t) => {
    const f = +(t["font-size"] || 15), w = rongChu(t.t, f), x = +t.x, a = t["text-anchor"];
    assert.ok(f >= 13, `${ten}: chữ “${t.t}” cỡ ${f}, dưới 13`);
    const x0 = a === "middle" ? x - w / 2 : a === "end" ? x - w : x;
    return { t: t.t, x0, x1: x0 + w, y0: +t.y - 0.8 * f, y1: +t.y + 0.2 * f };
  });
  hop.forEach((b) => assert.ok(b.x0 >= -0.5 && b.x1 <= K.w + 0.5 && b.y0 >= -0.5 && b.y1 <= K.h + 0.5, `${ten}: chữ “${b.t}” ra ngoài khung hình`));
  hop.forEach((b, i) => hop.slice(i + 1).forEach((c) => assert.ok(b.x1 <= c.x0 || c.x1 <= b.x0 || b.y1 <= c.y0 || c.y1 <= b.y0, `${ten}: chữ “${b.t}” đè lên “${c.t}”`)));
};
// chú giải: ô màu nhỏ, chữ cùng hàng ngay bên phải (chân chữ thấp hơn mép trên ô 13 đơn vị)
const chuGiaiCua = (svg, o) => o.map((r) => {
  const t = texts(svg).filter((x) => close(+x.y, num(r, "y") + 13) && +x.x > num(r, "x") + num(r, "width") && +x.x < num(r, "x") + num(r, "width") + 12);
  assert.equal(t.length, 1, "ô chú giải nào cũng có chữ"); return { fill: r.fill, ten: t[0].t };
});

/* Trục thời gian: một đường ngang (nét ink) có mũi tên ở đầu phải; mỗi mốc là một vạch đứng cắt đường ngang, năm ghi ngay trên vạch,
   nhãn ghi ngay dưới vạch (cùng x với vạch); khoảng cách giữa các vạch tỉ lệ với số năm. Trả về [{ nam, nhan }] theo thứ tự năm. */
const docTruc = (svg) => {
  daDoc.add(svg); chuTrongHinh(svg, "trục thời gian");
  const ln = tags(svg, "line"), duong = ln.filter(ngang);
  assert.equal(duong.length, 1, "trục thời gian: một đường ngang");
  const y = num(duong[0], "y1"), xMax = Math.max(num(duong[0], "x1"), num(duong[0], "x2")), tx = texts(svg);
  const tg = tags(svg, "polygon"); assert.equal(tg.length, 1, "trục thời gian: một mũi tên");
  const dinh = pts(tg[0].points).reduce((a, p) => (p[0] > a[0] ? p : a));
  assert.ok(close(dinh[1], y) && dinh[0] > xMax, "trục thời gian: mũi tên ở đầu phải, chỉ sang phải");
  const vach = ln.filter((l) => !ngang(l));
  assert.ok(vach.length >= 3 && vach.every((l) => num(l, "x1") === num(l, "x2") && Math.min(num(l, "y1"), num(l, "y2")) < y && Math.max(num(l, "y1"), num(l, "y2")) > y), "trục thời gian: ít nhất 3 vạch đứng cắt đường ngang");
  const moc = vach.map((l) => {
    const x = num(l, "x1"), tren = tx.filter((t) => close(+t.x, x) && +t.y < y), duoi = tx.filter((t) => close(+t.x, x) && +t.y > y);
    assert.ok(tren.length === 1 && /^\d{3,4}$/.test(tren[0].t) && duoi.length === 1, "trục thời gian: mỗi vạch một năm ở trên, một nhãn ở dưới");
    return { x, nam: +tren[0].t, nhan: duoi[0].t };
  }).sort((a, b) => a.nam - b.nam);
  assert.equal(tx.length, 2 * moc.length, "trục thời gian: không có chữ nào khác ngoài năm và nhãn của các mốc");
  const k = (moc[1].x - moc[0].x) / (moc[1].nam - moc[0].nam);
  assert.ok(k > 0, "trục thời gian: năm tăng từ trái sang phải");
  moc.forEach((m) => assert.ok(Math.abs(m.x - (moc[0].x + k * (m.nam - moc[0].nam))) < 0.15, `trục thời gian: vạch năm ${m.nam} không đặt đúng tỉ lệ`));
  return moc.map(({ nam, nhan }) => ({ nam, nhan }));
};

/* Sơ đồ vị trí tiếp giáp: các ô chữ nhật có chữ ở trong, không đè nhau; ô giữa (nền acc-soft) ghi tên châu lục (“Châu …”), mỗi ô khác ở
   một trong tám hướng so với ô giữa (lệch không quá 15°); mũi tên chỉ hướng bắc: đoạn thẳng đứng, đầu mũi tên ở trên, chữ B trên đầu mũi
   tên. Trả về { chau, huong }. */
const docViTri = (svg) => {
  daDoc.add(svg); chuTrongHinh(svg, "sơ đồ vị trí");
  const tx = texts(svg), o = tags(svg, "rect").map((r) => {
    const x = num(r, "x"), y = num(r, "y"), w = num(r, "width"), h = num(r, "height");
    const chu = tx.filter((t) => +t.x > x && +t.x < x + w && +t.y > y && +t.y < y + h).sort((a, b) => +a.y - +b.y).map((t) => t.t).join(" ");
    assert.ok(chu, "ô nào cũng có chữ"); return { chu, fill: r.fill, x, y, w, h, cx: x + w / 2, cy: y + h / 2 };
  });
  o.forEach((a, i) => o.slice(i + 1).forEach((b) => assert.ok(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y, `ô “${a.chu}” đè lên ô “${b.chu}”`)));
  const giua = o.filter((v) => v.fill === "acc-soft"); assert.ok(giua.length === 1 && /^Châu \S+$/.test(giua[0].chu), "một ô giữa (nền acc-soft) ghi tên châu lục");
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
  return { chau: giua[0].chu, huong };
};

/* Biểu đồ tròn: mỗi phần là một hình quạt (path “M tâm L đầu cung A r r 0 cờ 1 cuối cung Z”), tô màu theo chú giải; số phần trăm ghi
   trong hình quạt; các phần nối tiếp nhau, đủ một vòng; năm ghi dưới mỗi hình (“Năm 2015”). Trả về { năm: { nhóm: phần trăm } }. */
const docTron = (svg) => {
  daDoc.add(svg); chuTrongHinh(svg, "biểu đồ tròn");
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

/* ---------- bảng theo sách (OnUp-Book lop-7/lich-su-dia-li-7; page-N là trang in N − 2) ---------- */
// trình tự thời gian: [chữ nhận ra trong ô, năm để so, cách ghi năm trong lời giải]. Phát kiến địa lí (tr. 15): B. Đi-a-xơ năm 1487,
// C. Cô-lôm-bô năm 1492, V. Ga-ma đến Ca-li-cút năm 1498, Ph. Ma-gien-lăng đi từ năm 1519. Thời Đinh – Tiền Lê (trục thời gian đầu
// chương tr. 44; tr. 48–50): nhà Đinh lập năm 968, Lê Hoàn lên ngôi năm 980, quân Tống sang xâm lược đầu năm 981, năm 1002 đổi đạo thành lộ,
// phủ, châu.
const SU_KIEN = [
  ["Đi-a-xơ", 1487, "1487"], ["Cô-lôm-bô", 1492, "1492"], ["Ga-ma", 1498, "1498"], ["Ma-gien-lăng", 1519, "1519"],
  ["Triều Đinh được thành lập", 968, "968"], ["Lê Hoàn được các quan trong triều tôn lên ngôi vua", 980, "980"],
  ["Quân Tống tràn sang xâm lược", 981, "981"], ["chia lại cả nước thành lộ, phủ, châu", 1002, "1002"]
];
const suKien = (s) => { const m = SU_KIEN.filter(([k]) => s.toLowerCase().includes(k.toLowerCase())); assert.equal(m.length, 1, "không nhận ra đúng một sự kiện: " + s); return m[0]; };
// nơi tiếp giáp theo hướng: châu Á tiếp giáp hai châu lục, ba đại dương (tr. 109; hướng theo bản đồ tự nhiên châu Á); châu Phi theo bản đồ
// tự nhiên châu Phi (hình 1 tr. 128): Địa Trung Hải ở phía bắc, Đại Tây Dương ở phía tây, Ấn Độ Dương ở phía đông nam, châu Á ở phía đông bắc
const TIEP_GIAP = {
  "Châu Phi": { "bắc": "Địa Trung Hải", "tây": "Đại Tây Dương", "đông bắc": "Châu Á", "đông nam": "Ấn Độ Dương" },
  "Châu Á": { "bắc": "Bắc Băng Dương", "đông": "Thái Bình Dương", "nam": "Ấn Độ Dương", "tây": "Châu Âu", "tây nam": "Châu Phi" }
};
// khu vực của từng nước theo bảng “Các khu vực của châu Á” (tr. 118; Bắc Á chỉ gồm các vùng Xi-bia của Nga); mỗi khu vực ghi vài nước
const KHU = ["Bắc Á", "Trung Á", "Tây Á", "Nam Á", "Đông Á", "Đông Nam Á"];
const KHU_VUC = Object.fromEntries([
  ["Trung Á", ["Ca-dắc-xtan", "U-dơ-bê-ki-xtan", "Tát-gi-ki-xtan", "Tuốc-mê-ni-xtan", "Cư-rơ-gư-xtan"]],
  ["Tây Á", ["A-rập Xê-út", "I-rắc", "Ca-ta", "Cô-oét", "Ô-man", "Y-ê-men", "Thổ Nhĩ Kỳ"]],
  ["Nam Á", ["Ấn Độ", "Pa-ki-xtan", "Áp-ga-ni-xtan", "Nê-pan", "Bu-tan", "Băng-la-đét", "Xri Lan-ca", "Man-đi-vơ", "I-ran"]],
  ["Đông Á", ["Mông Cổ", "Trung Quốc", "Triều Tiên", "Hàn Quốc", "Nhật Bản"]],
  ["Đông Nam Á", ["Việt Nam", "Lào", "Cam-pu-chia", "Thái Lan", "Ma-lai-xi-a", "Xin-ga-po", "Mi-an-ma", "In-đô-nê-xi-a", "Phi-lip-pin", "Bru-nây", "Đông Ti-mo"]]
].flatMap(([k, ds]) => ds.map((nc) => [nc, k])));

// thế kỉ ghi cạnh một sự kiện: [chữ nhận ra trong câu, năm theo sách]. Cải cách tôn giáo: năm 1517 M. Lu-thơ công bố luận cương (tr. 21)
const THE_KI = [["Cải cách tôn giáo", 1517]];

/* ---------- các câu cần tính ----------
   id: đề chứa câu; has: đoạn chữ của đề; right(q): đáp án tính bằng code (so với ans[0], ans, o[0], a, o hoặc r theo l). */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || []).map(String);
const so = (re, s) => { const m = re.exec(s); assert.ok(m, "không đọc được số liệu: " + re); return m.slice(1).map(val); };
// sơ đồ vị trí tiếp giáp: ô ghi chữ khớp bảng TIEP_GIAP, hai ô đánh số; đáp án “(1) …, (2) …”; lời giải ghi đủ nơi tiếp giáp, hướng của ô đánh số
const viTri = (q, chau) => {
  const { chau: c, huong } = docViTri(q.svg), T = TIEP_GIAP[c], o = {}, x = q.x.toLowerCase();
  assert.equal(c, chau, "ô giữa của sơ đồ"); assert.ok(T, "có bảng nơi tiếp giáp của " + c);
  Object.entries(huong).forEach(([h, chu]) => { assert.ok(T[h], `phía ${h} của ${c} không có trong bảng`); if (/^\(\d\)$/.test(chu)) { o[chu] = T[h]; assert.ok(x.includes("phía " + h), "lời giải ghi hướng " + h); } else assert.equal(chu, T[h], `ô phía ${h}`); });
  assert.deepEqual(Object.keys(o).sort(), ["(1)", "(2)"], "hai ô đánh số (1), (2)");
  Object.values(T).forEach((t) => assert.ok(x.includes(t.toLowerCase()), "lời giải ghi " + t));
  return Object.keys(o).sort().map((k) => `${k} ${o[k]}`).join(", ");
};
let namHoi = null; // năm của mốc được hỏi trên trục thời gian (câu khác trong kho không ghi năm này)
const CHECKS = [
  // Lịch sử và Địa lí: Đề 1
  { id: L.de1, has: "Xếp các chuyến đi của những nhà thám hiểm", right: (q) => {
    const sk = q.o.map(suKien); sk.forEach(([, , ghi]) => assert.ok(q.x.includes(ghi), "lời giải ghi năm " + ghi));
    assert.equal(new Set(sk.map(([, y]) => y)).size, sk.length, "các chuyến đi khác năm");
    return [...q.o].sort((a, b) => suKien(a)[1] - suKien(b)[1]); } },
  { id: L.de1, has: "Từ khi Cam-pu-chia bước vào thời kì Ăng-co", right: (q) => {
    const y = nam(q.q); assert.deepEqual(y, [802, 1190], "năm theo sách (tr. 42–43): thời kì Ăng-co từ năm 802, năm 1190 Chăm-pa thành một tỉnh");
    assert.ok(q.unit === "năm" && q.x.includes(`${y[1]} − ${y[0]} = ${y[1] - y[0]}`), "lời giải ghi phép trừ"); return y[1] - y[0]; } },
  { id: L.de1, has: "Trên trục thời gian dưới đây, mốc (3) ứng với sự kiện nào", right: (q) => {
    const moc = docTruc(q.svg), sk = q.o.map(suKien), x = q.x.toLowerCase();
    assert.deepEqual(moc.map((m) => m.nhan), ["(1)", "(2)", "(3)"], "ba mốc (1), (2), (3) theo thứ tự năm");
    moc.forEach((m) => { assert.ok(x.includes(`mốc ${m.nhan} là năm ${m.nam}`), "lời giải ghi năm của mốc " + m.nhan); assert.ok(sk.some(([, y]) => y === m.nam), `mốc ${m.nhan} (năm ${m.nam}) là năm của một sự kiện trong các lựa chọn`); });
    sk.forEach(([, , ghi]) => assert.ok(q.x.includes("năm " + ghi), "lời giải ghi năm " + ghi));
    assert.equal(new Set(sk.map(([, y]) => y)).size, sk.length, "các sự kiện khác năm");
    namHoi = moc[2].nam; return q.o.find((o) => suKien(o)[1] === namHoi); } },
  { id: L.de1, has: "Tỉ lệ dân đô thị của Y", right: (q) => {
    const [d, t] = so(/có khoảng ([\d ]+) dân, trong đó khoảng ([\d ]+) người sống ở đô thị/, q.q), v = (t / d) * 100;
    assert.ok(Number.isInteger(v) && q.unit === "%" && q.x.includes(`${vn(t)} : ${vn(d)} × 100 = ${v}`), "lời giải ghi phép tính"); return v; } },
  { id: L.de1, has: "Tính mật độ dân số của quốc gia M", right: (q) => {
    const [s, d] = so(/rộng khoảng ([\d ]+) km² và có khoảng ([\d ]+) dân/, q.q), v = d / s;
    assert.ok(Number.isInteger(v) && q.unit === "người/km²" && q.x.includes(`${vn(d)} : ${vn(s)} = ${v}`), "lời giải ghi phép tính"); return v; } },
  { id: L.de1, has: "là châu Phi cùng các vùng biển, đại dương, châu lục kề bên", right: (q) => viTri(q, "Châu Phi") },
  // Lịch sử và Địa lí: Đề 2
  { id: L.de2, has: "Đại Việt có bộ luật ___", right: () => "Hình thư" }, // sách tr. 36: bộ luật Si-va-sa-xa-na (In-đô-nê-xi-a), Hình thư (Đại Việt)
  { id: L.de2, has: "Hai biểu đồ tròn dưới đây cho biết dân số của quốc gia X", right: (q) => {
    const c = docTron(q.svg), [a, b] = Object.keys(c).sort(), T = "0 – 14 tuổi", D = "15 – 64 tuổi", G1 = "65 tuổi trở lên";
    assert.deepEqual(nam(q.q), [+a, +b], "đề ghi năm của hai biểu đồ");
    [a, b].forEach((k) => assert.deepEqual(Object.keys(c[k]).sort(), [T, D, G1].sort(), "ba nhóm tuổi"));
    const LUAT = [
      [/^Năm (\d{4}), nhóm 65 tuổi trở lên của X chiếm tỉ lệ gấp đôi năm (\d{4})\.$/, (m) => c[m[1]][G1] === 2 * c[m[2]][G1]],
      [/^Năm (\d{4}), nhóm 0 – 14 tuổi chiếm tỉ lệ lớn hơn nhóm 65 tuổi trở lên\.$/, (m) => c[m[1]][T] > c[m[1]][G1]],
      [/^Dân số của X đang thay đổi theo hướng già đi\.$/, () => c[b][G1] > c[a][G1] && c[b][T] < c[a][T]],
      [/^Năm (\d{4}), nhóm 15 – 64 tuổi chiếm tỉ lệ cao hơn năm (\d{4})\.$/, (m) => c[m[1]][D] > c[m[2]][D]]
    ];
    assert.ok(q.x.includes(`${c[b][G1]}% = 2 × ${c[a][G1]}%`) && q.x.includes(`(${c[a][T]}% → ${c[b][T]}%)`) && q.x.includes(`(${c[a][G1]}% → ${c[b][G1]}%)`) && q.x.includes(`từ ${c[a][D]}% xuống ${c[b][D]}%`), "lời giải ghi đúng số đọc từ hình");
    return q.o.map((o) => { const l = LUAT.map(([re, f]) => [re.exec(o), f]).filter(([m]) => m); assert.equal(l.length, 1, "ý nào cũng có luật: " + o); return l[0][1](l[0][0]); }); } },
  { id: L.de2, has: "các châu lục, đại dương bao quanh châu Á", right: (q) => viTri(q, "Châu Á") },
  { id: L.de2, has: "Nối mỗi nước ở cột trái với khu vực của châu Á", right: (q) => {
    const thua = q.r[q.l.length]; assert.ok(KHU.includes(thua) && !q.l.some((nc) => KHU_VUC[nc] === thua), "ô thừa là một khu vực khác của châu Á");
    return q.l.map((nc) => { assert.ok(KHU_VUC[nc] && q.x.includes(`${nc} ở ${KHU_VUC[nc]}`), "bảng khu vực có " + nc + ", lời giải ghi khu vực"); return KHU_VUC[nc]; }); } },
  // GDCD: câu tục ngữ (Bài 4)
  { id: G.de2, has: "Câu tục ngữ nào dưới đây khuyên con người phải giữ chữ tín", right: () => "Một lần bất tín, vạn lần bất tin" }
];

const KHO = {}; // mã pool → câu trong kho (câu của hai đề cố định, mỗi câu ghi src)
[L, G].forEach((s) => {
  const p = bank(s.pool), de = s.from.map(bank);
  assert.ok(de.every((d) => d.minutes === p.minutes && d.n === p.n && d.questions.length === d.n), s.pool + ": hai đề cùng số phút, số câu như danh mục");
  assert.equal(p.questions.length, sum(de.map((d) => d.n)), s.pool + ": kho là câu của hai đề cố định, không có câu riêng");
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
  const want = c.right(q), got = q.type === "fill" ? q.ans[0] : q.type === "num" ? q.ans : q.type === "tf4" ? q.a : q.type === "order" ? q.o : q.type === "match" ? q.r.slice(0, q.l.length) : q.o[0];
  if (typeof want === "number") assert.ok(typeof got === "number" && close(got, want), at + ": đáp án " + got + ", tính được " + want);
  else assert.deepEqual(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), at + ": nhiễu trùng đáp án đúng");
  checked.add(q); n++;
});
// câu trả lời bằng số, câu điền có đáp án là số, câu có hình, câu sắp xếp, câu nối nào cũng phải được tính lại ở trên
kho.filter((q) => q.type === "num" || q.svg || q.type === "order" || q.type === "match" || (q.type === "fill" && /^[\d\s,.−-]+$/.test(q.ans[0]))).forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + q.q.slice(0, 60)));
assert.ok(KHO[L.pool].filter((q) => q.svg).length >= 4 && L.from.every((id) => KHO[L.pool].filter((q) => q.src === id && q.svg).length >= 2), "Lịch sử và Địa lí: bốn câu có hình, đề nào cũng có hai câu");
// câu nối: một ô thừa, cặp nối không có chữ chung (không đoán được bằng chữ giống nhau)
kho.filter((q) => q.type === "match").forEach((q) => {
  assert.equal(q.r.length, q.l.length + 1, "câu nối có một ô thừa: " + q.q.slice(0, 50));
  q.l.forEach((l, i) => { const b = tuDon(q.r[i]); assert.ok(![...tuDon(l)].some((w) => b.has(w)), `cặp nối “${l}” – “${q.r[i]}” có chữ chung`); });
});

// thế kỉ: “năm 1190 thuộc thế kỉ XII” trong mọi trường chữ tính lại từ năm; câu nhắc một sự kiện ở THE_KI kèm “(đầu, giữa, cuối) thế kỉ …”
// thì thế kỉ tính lại từ năm của sách (đầu: năm 1–30 của thế kỉ, giữa: 31–70, cuối: 71–100); ý đúng/sai thì đáp án khớp (sự kiện ghi ở đề
// bài hay ở ý); kho Lịch sử và Địa lí có ít nhất một chỗ như vậy
{
  const KHUC = { "đầu": [1, 30], "giữa": [31, 70], "cuối": [71, 100] }, dung = (y, khuc, r) => theKi(y) === r && (!khuc || ((y - 1) % 100) + 1 >= KHUC[khuc][0] && ((y - 1) % 100) + 1 <= KHUC[khuc][1]);
  const cau = (s) => String(s).split(/(?<=[.;?!])\s+/), suKienKi = (s) => THE_KI.filter(([k]) => s.includes(k));
  let soKi = 0;
  KHO[L.pool].forEach((q) => {
    chu(q).forEach((t) => [...t.matchAll(/[Nn]ăm (\d{1,4}) thuộc thế kỉ ([IVX]+)\b/g)].forEach((m) => { assert.equal(m[2], theKi(+m[1]), `“${m[0]}”: năm ${m[1]} thuộc thế kỉ ${theKi(+m[1])}`); soKi++; }));
    const ki = (s, ngu) => { const m = /(?:(đầu|giữa|cuối) )?thế kỉ ([IVX]+)\b/.exec(s), e = suKienKi(ngu + " " + s); return m && e.length === 1 ? { ok: dung(e[0][1], m[1], m[2]), m, e: e[0] } : null; };
    [q.x].concat(q.type === "mc" ? [q.q, q.o[0]] : [q.q]).forEach((t) => cau(t).forEach((s) => { const k = ki(s, ""); if (k) { assert.ok(k.ok, `“${s}”: ${k.e[0]} năm ${k.e[1]}, thế kỉ ${theKi(k.e[1])}`); soKi++; } }));
    if (q.type === "tf4") q.o.forEach((o, i) => { const k = ki(o, q.q); if (k) { assert.equal(q.a[i], k.ok, `“${o}”: ${k.e[0]} năm ${k.e[1]}, thế kỉ ${theKi(k.e[1])}`); soKi++; } });
  });
  assert.ok(soKi >= 2, "Lịch sử và Địa lí: có câu, lời giải ghi thế kỉ để tính lại"); n += soKi;
}

/* ---------- mức độ và ma trận ---------- */
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
// chữ của nhãn chủ đề (bỏ phần trong ngoặc), tách theo “ và ”, “, ”
const phanNhan = (t) => t.replace(/\s*\([^)]*\)$/, "").split(/ và |, /).map((s) => s.trim().toLowerCase()).filter((s) => s.includes(" ") || s.length >= 6);
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const CHUNG = new Set(["nào dưới", "dưới đây", "đây là", "là một", "mỗi ý", "ý sau", "sau đúng", "đúng hay", "hay sai", "ý nào", "nào đúng", "nào sai", "nào sau", "sau đây"]);
const cap2 = (s) => { const w = String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x); };
const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !CHUNG.has(c) && !nhan.has(c))); };
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
    assert.ok(mc.filter((q) => hon(q, (a, b2) => a > b2)).length <= mc.length / 3, s.pool + ": đáp án đúng là lựa chọn dài nhất ở quá một phần ba số câu nhiều lựa chọn");
    assert.ok(mc.filter((q) => hon(q, (a, b2) => a < b2)).length <= mc.length / 3, s.pool + ": đáp án đúng là lựa chọn ngắn nhất ở quá một phần ba số câu nhiều lựa chọn");
  }
  // đáp án không lặp chữ của nhãn chủ đề trên câu (Rút ra N6, N16b), trừ khi mọi lựa chọn cùng có chữ đó
  K.forEach((q) => { const da = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? q.ans : []; phanNhan(q.topic).forEach((c) => da.forEach((d) => { if (d.toLowerCase().includes(c)) assert.ok(q.type === "mc" && q.o.every((o) => o.toLowerCase().includes(c)), `đáp án “${d}” lặp chữ “${c}” của nhãn chủ đề`); })); });
  // không gần trùng câu của các kho cùng môn đã có, cả kho lớp 6 (6-lsdl.js, 6-gdcd.js; Rút ra N25, như tests/lsdl-gdcd9-gk1.js): đề bài
  // cùng các lựa chọn, ô nối, ô sắp xếp có từ một nửa số cặp hai âm tiết liền nhau (tính trên câu ít cặp hơn, bỏ các cặp có ở mọi câu như
  // “nào dưới đây” và cặp của nhãn chủ đề) chung với một câu cũ thì báo
  {
    const cua = new Set(s.from.concat(s.pool)), lop6 = { "7-lsdl.js": "6-lsdl.js", "7-gdcd.js": "6-gdcd.js" }[s.file];
    const cu = BANKS.filter((b2) => !cua.has(b2.id) && b2.subject === p.subject).flatMap((b2) => b2.questions.filter((q) => !b2.pool || q.src === b2.id).map((q, i) => ({ at: b2.id + "#" + (i + 1), f: b2.file, c: capAm(q) })));
    assert.ok(cu.some((e) => e.f === lop6), s.pool + ": có kho lớp 6 cùng môn để so");
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
// Lịch sử và Địa lí: số câu Lịch sử, Địa lí của mỗi đề ghi đúng ở note (chủ đề Lịch sử đứng trước “Vị trí địa lí, tự nhiên châu Âu”)
{
  const T = Object.keys(bank(L.pool).pool.matrix), dau = T.indexOf("Vị trí địa lí, tự nhiên châu Âu"); assert.ok(dau > 0);
  L.from.forEach((id) => { const d = bank(id), ls = d.questions.filter((q) => T.indexOf(q.topic) < dau).length; assert.ok(d.note.includes(`${ls} câu Lịch sử, ${d.n - ls} câu Địa lí`), id + ": note ghi số câu Lịch sử, Địa lí"); });
}
// GDCD: câu tình huống là chính (Rút ra N9-ck1-lsdl-gdcd): đề bài (câu đúng/sai 4 ý: cả các ý) kể việc làm, lời nói của một người cụ thể
// (tên riêng, “Bà”, “Bác”, “Ông”…, “Nhóm”, “Xã”, “Một số người”) hay của một nơi cụ thể (“Cửa hàng”, “Trường”, “Lớp”, “Đội bóng”); từ một nửa kho
{
  const AI = "Anh|Chị|Bố|Mẹ|Ông|Bà|Bác|Nhóm|Xã|Lớp|Trường|Gia đình|Cửa hàng|Đội bóng|Một số người|Một người|Một bạn";
  const TEN = "Nhật|Trúc|Gia Huy|Bích|Duy|Diễm|Trâm|Hải Đăng|Khôi|Uyên|Hoàng|Ngọc|Thịnh|Tư|Hưng|Thắng|Lâm|Quân|Hữu Phước|Minh Châu|Phương Anh|Toàn|Hà Vy|Tường|Nguyên|Thảo|Mỹ Duyên|Tài|Trung|Tùng|Sáu|Ngân|Phương Linh|Hạnh|Quang|Lộc|Khánh|Bảo Châu|Tú Anh|Nhật Minh|Bảo Long|Thu Hà|Trọng|Ánh";
  const RE = new RegExp(`(?<!\\p{L})(?:${AI}|${TEN})(?!\\p{L})`, "u");
  const tinhHuong = (q) => RE.test(q.q + (q.type === "tf4" ? " " + q.o.join(" ") : ""));
  assert.ok(tinhHuong({ q: "Bà của Nhật kể về làng." }) && tinhHuong({ q: "Mỗi ý sau đúng hay sai?", type: "tf4", o: ["Ngọc mượn truyện của bạn."] }) && !tinhHuong({ q: "Chữ tín là gì?" }) && !tinhHuong({ q: "Tình huống nào dưới đây thường khiến học sinh bị căng thẳng?" }), "tự thử câu tình huống");
  const K = KHO[G.pool], th = K.filter(tinhHuong).length;
  assert.ok(th * 2 >= K.length, `GDCD: câu tình huống mới có ${th}/${K.length}`);
  console.log(`GDCD: ${th}/${K.length} câu tình huống.`);
}
// chữ như sách in năm 2026: không “huyện”, “63 tỉnh”, tên tỉnh đã nhập năm 2025; dấu thanh kiểu sách (hoá, thuỷ, khoẻ); số ngăn hàng nghìn
// bằng khoảng trắng, dấu phẩy thập phân
const TINH_CU = ["Hà Giang", "Yên Bái", "Bắc Kạn", "Vĩnh Phúc", "Hoà Bình", "Bắc Giang", "Thái Bình", "Hải Dương", "Hà Nam", "Nam Định", "Quảng Bình",
  "Quảng Nam", "Kon Tum", "Bình Định", "Phú Yên", "Ninh Thuận", "Bình Thuận", "Đắk Nông", "Bà Rịa", "Bình Dương", "Bình Phước", "Long An", "Tiền Giang",
  "Bến Tre", "Trà Vinh", "Hậu Giang", "Sóc Trăng", "Bạc Liêu", "Kiên Giang", "Thừa Thiên"];
kho.forEach((q) => chu(q).concat(q.type === "fill" ? q.ans : []).forEach((s) => {
  const at = q.src + ": “" + s.slice(0, 60) + "”";
  assert.ok(!/(?<![\p{L}])(?:huyện|63 tỉnh|64 tỉnh)(?![\p{L}])/iu.test(s), at + ": đơn vị hành chính cũ");
  const s2 = s.replace(/Thái Bình Dương/g, "");
  TINH_CU.forEach((t) => assert.ok(!new RegExp(`(?<![\\p{L}])${t}(?![\\p{L}])`, "u").test(s2), at + ": tên tỉnh đã nhập “" + t + "”"));
  assert.ok(!/(?<![\p{L}])(?:hóa|hòa|thủy|thụy|tỏa|hủy|tùy|khỏe|lũy)(?![\p{L}])/iu.test(s), at + ": dấu thanh kiểu sách (hoá, thuỷ, khoẻ)");
  assert.ok(!/(?<![,\d])\d{5,}/.test(s) && !/\d\.\d/.test(s), at + ": số viết sai cách");
}));

/* ---------- đề bài không trùng câu nào khác trong file (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
[L, G].forEach((s) => {
  const deBai = BANKS.filter((b) => b.file === s.file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q) })));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
});

/* ---------- dò lộ đáp án (Rút ra N5; bộ dò của tests/lsdl-gdcd9-gk1.js) giữa mọi cặp câu của kho: đề “Ôn chủ đề” rút chung cả chủ đề
   (cả câu cùng ô), đề ngẫu nhiên rút chung các chủ đề. Đáp án là số (từ hai chữ số, hoặc số thập phân) chỉ tìm ở vị trí kết quả của câu
   kia (ngay sau “=”, “là”, “bằng”, “được”); cặp nối: câu kia có cả hai vế; câu về thứ tự thời gian (câu sắp xếp): câu kia không ghi năm
   nào của các sự kiện đó (cách ghi trong lời giải); câu trục thời gian: câu khác không ghi năm của mốc được hỏi. Đáp án bằng chữ (lựa chọn
   đúng của câu trắc nghiệm, đáp án câu điền) có ở câu kia thì chỉ in ra khi chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi ở
   DA_XEM. ---------- */
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
// t có cụm s đứng thành từ riêng (“Na” không khớp “Nam”)
const coCum = (t, s) => { for (let i = t.indexOf(s); i >= 0; i = t.indexOf(s, i + 1)) if (!/[\p{L}\p{N}]/u.test(t[i - 1] || " ") && !/[\p{L}\p{N}]/u.test(t[i + s.length] || " ")) return true; return false; };
// năm của câu về thứ tự thời gian: cách ghi trong lời giải của mọi sự kiện có trong câu sắp xếp
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
      ngay.filter((g) => C.some((t) => coCum(t, g))).forEach((g) => lo.push(at + "năm " + g));
      cum.filter((s) => T.some((t) => coCum(t, s.toLowerCase()))).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const ten = new Map();
[L, G].forEach((s) => s.from.forEach((id) => KHO[s.pool].filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace(/7-ck1-/, "-") + "#" + (i + 1)))));
const loAll = [], chuAll = [];
[L, G].forEach((s) => { const r = doLo(KHO[s.pool], (q) => ten.get(q), () => true); loAll.push(...r.lo); chuAll.push(...r.chuLo); });
// câu trục thời gian: năm của mốc được hỏi không có ở câu khác của kho
{
  assert.ok(namHoi, "đã đọc trục thời gian");
  const truc = kho.find((q) => q.q.includes("Trên trục thời gian dưới đây, mốc (3)"));
  KHO[L.pool].filter((q) => q !== truc && chu(q).some((t) => coCum(t, String(namHoi)))).forEach((q) => loAll.push(`${ten.get(q)} → ${ten.get(truc)}: năm ${namHoi}`));
}
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuAll.join("\n"));
// đã xem (Phiên N7-ck1-lsdl-gdcd): không có câu nào
const DA_XEM = [];
assert.deepEqual(chuAll, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loAll, [], "lộ đáp án:\n" + loAll.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 388”, “là 450 người/km²”, năm của câu về thứ tự, cặp nối, lựa chọn đúng,
// đáp án câu điền
{
  const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thu = (qs) => { const r = doLo(qs, (q) => q.q.slice(0, 12), () => true); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  const khac = tim("Đồng tiền chung của Liên minh châu Âu"), khac2 = tim("Chữ tín là gì");
  assert.ok(khac && khac2, "câu dùng để tự thử bộ dò");
  assert.deepEqual(thu([tim("Từ khi Cam-pu-chia bước vào thời kì Ăng-co"), gia(khac, "Ví dụ: 1190 − 802 = 388 (năm).")]), ["388"]);
  assert.deepEqual(thu([tim("Tính mật độ dân số của quốc gia M"), gia(khac, "Mật độ dân số của M là 450 người/km².")]), ["450"]);
  assert.deepEqual(thu([tim("Xếp các chuyến đi của những nhà thám hiểm"), gia(khac, "Năm 1492, C. Cô-lôm-bô đến châu Mỹ.")]), ["năm 1492"]);
  assert.deepEqual(thu([tim("Nối mỗi nước ở cột trái"), gia(khac, "Băng-la-đét là một nước ở Nam Á.")]), ["Băng-la-đét → Nam Á"]);
  assert.deepEqual(thu([tim("Đầu năm 981, quân Tống do ai làm tổng chỉ huy"), gia(khac, "Hầu Nhân Bảo bị giết tại trận.")]), ["Hầu Nhân Bảo"]);
  assert.deepEqual(thu([tim("Đại Việt có bộ luật ___"), gia(khac2, "Bộ Hình thư được ban hành dưới thời Lý.")]), ["Hình thư"]);
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book; và với câu của các kho khác ---------- */
// tên riêng nhiều chữ (người, nước, địa danh, triều đại, tôn giáo, tổ chức, di sản) như sách: mỗi tên tính là một từ (như tests/lsdl4-ck2.js)
const GOP = ["ngo quyen", "co loa", "hoa lu", "dinh bo linh", "dinh tien hoang", "dinh lien", "dinh toan", "le hoan", "le dai hanh", "dai co viet",
  "hau nhan bao", "luu hoang thao", "to dinh", "ma vien", "ngo xuong ngap", "kieu cong han", "van thang vuong", "tiet do su", "nam han", "phong chau",
  "me linh", "luy lau", "lan xang", "pha ngum", "cam pu chia", "ang co vat", "ang co thom", "ang co", "giay a vac man", "xiem riep", "phnom penh",
  "bien ho", "cham pa", "chao phray a", "me cong", "gup ta", "de li", "mo gon", "a co ba", "hin du", "hoi giao", "tho nhi ky", "si va sa xa na",
  "hinh thu", "co lom bo", "di a xo", "ga ma", "ma gien lang", "ca li cut", "li xbon", "hao vong", "thien chua giao", "tin lanh", "anh giao",
  "tan giao", "cuu giao", "phuc hung", "tay au", "lanh chua", "nong no", "trung quoc", "an do", "dong nam a", "nam a", "tay a", "dong a", "bac a",
  "trung a", "chau au", "chau a", "chau phi", "chau my", "u ran", "an po", "cac pat", "xcan di na vi", "da nuyp", "bac bang duong",
  "thai binh duong", "dai tay duong", "an do duong", "dia trung hai", "hi ma lay a", "xi bia", "cong go", "ke ni a", "tan da ni a", "xa ha ra",
  "mong co", "bang la det", "o man", "bru nay", "a rap", "ma lai", "lien minh chau au", "xuy e", "ma da ga xca", "viet nam", "ha noi", "phu tho",
  "bac ninh", "ninh binh", "van mieu quoc tu giam", "hoang thanh thang long", "kinh thanh hue", "chua mot cot", "ca tru", "hat xoan", "bai choi",
  "tho mau tam phu", "mua roi nuoc", "mua xoe", "di san van hoa", "luat di san van hoa"
].sort((a, b) => b.length - a.length);
// câu tục ngữ, tên văn bản luật trích nguyên văn không tính là chép sách
const TRICH = ["Một lần bất tín, vạn lần bất tin", "Ăn quả nhớ kẻ trồng cây", "Lá lành đùm lá rách", "Kiến tha lâu cũng đầy tổ", "Luật Di sản văn hoá năm 2024"];
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần (các vòng lặp lồng nhau gọi lại trên cùng chữ; kết quả như cũ)
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
const khongDau = nhoChuoi((s) => { let t = " " + TRICH.reduce((x, c) => x.split(c).join(" "), String(s).normalize("NFC")).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim() + " ";
  GOP.forEach((g) => { t = t.split(" " + g + " ").join(" " + g.replace(/ /g, "") + " "); }); return t.replace(/[aeiouy]+/g, "a").trim(); });
const tuCua = (s) => khongDau(s).split(" ").filter(Boolean);
const chuoi = (s, k) => { const w = tuCua(s), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
const truong = (q) => [q.q, q.x].concat(q.o || [], q.ans || [], q.l || [], q.r || []);
const boChuoi = (ds, k) => { const out = new Map(); ds.forEach(([id, s]) => { const w = tuCua(s); for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k).join(" "); if (!out.has(c)) out.set(c, new Set()); out.get(c).add(id); } }); return out; };
const bao = (bo, k) => [...new Set(kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].filter((c) => bo.has(c)).map((c) => `${ten.get(q)} ~ ${[...bo.get(c)].join(", ")}: ${c}`)))];
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
if (SACH.length) {
  assert.ok(["lich-su-dia-li-7", "giao-duc-cong-dan-7"].every((c) => SACH.some((f) => f.includes(path.join("lop-7", c)))), "OnUp-Book có Lịch sử và Địa lí 7, Giáo dục công dân 7");
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
console.log(n, "câu đã tính lại hoặc đọc lại hình (hai ngân hàng); kho " + kho.length + " câu, " + [L, G].map((s) => s.from.length + " đề cố định " + bank(s.pool).n + " câu").join(" và ") + ".");
console.log("MATH OK");
