// Kiểm tra ngân hàng Vật lí 12 và Hoá học 12 cuối kì I của Phiên N12-ck1-vatli-hoahoc (data/banks/12-vatli.js, data/banks/12-hoahoc.js:
// mỗi môn hai đề cố định và đề ngẫu nhiên lấy câu của hai đề đó, không có câu riêng), theo mẫu tests/khtn9-ck1.js, tests/khtn9-gk2.js,
// tests/toan12-ck1.js. Số đề, số câu lấy từ danh mục (không ghi cứng).
// Câu có phép tính hoặc có hình nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong kho, đúng đề ghi ở id); số liệu đọc từ chữ của
// đề, đáp án tính bằng code (so với ans, o[0] hoặc các ý tính được của câu đúng/sai 4 ý; câu tự luận so với thang chấm và đáp số).
// Vật lí: định luật I của nhiệt động lực học, động năng, thế năng chuyển thành nội năng, đổi nhiệt độ Celsius – Kelvin, nhiệt lượng theo
// nhiệt dung riêng, nhiệt nóng chảy riêng, nhiệt hoá hơi riêng, cân bằng nhiệt, định luật Boyle (cả bơm săm, bơm bóng), định luật
// Charles (cả nhiệt kế khí), phương trình Clapeyron, thể tích mol ở điều kiện tiêu chuẩn, động năng tịnh tiến trung bình của phân tử,
// p = μkT; đồ thị p–V, V–T, p–T trên lưới đọc lại bằng code (gốc O, lưới đều, số ở trục đúng vạch, tên trục, điểm A ở nút lưới có đường
// gióng xuống hai trục; đường đẳng nhiệt có pV không đổi, đường đẳng áp, đẳng tích là đường thẳng qua gốc có đoạn nét đứt gần gốc).
// Hoá học: tính theo phương trình hoá học (nguyên tử khối đề cho, đúng bảng; hệ số đọc từ phương trình trong đề hoặc lời giải), hiệu
// suất, nồng độ dung dịch, phản ứng với thuốc thử Tollens, thuỷ phân tinh bột, saccharose, peptide, xà phòng hoá chất béo, amine, amino
// acid với acid và base; thế điện cực chuẩn đúng bảng thế điện cực chuẩn của sách (Bài 15), so sánh tính oxi hoá – khử, phản ứng xảy ra
// hay không, sức điện động chuẩn của pin, số pin mắc nối tiếp, khối lượng điện cực; công thức cấu tạo trong hình đọc lại hoá trị từng
// nguyên tử, công thức phân tử và tên ester (tên gốc hydrocarbon + tên gốc acid như sách). Mọi phương trình hoá học trong câu Hoá học cân
// bằng cả nguyên tố và điện tích (cả phương trình thuỷ phân polymer có hệ số n). Câu trả lời bằng số, câu có hình, câu tự luận nào cũng
// phải có kiểm tra ở đây.
// Rồi: chữ (số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân; công thức viết bằng chữ số dưới dòng; tên chất như sách, không có
// tên kiểu cũ; dấu thanh kiểu sách “hoá”, “thuỷ”; đơn vị như sách: J/kg.K, °C), lời dặn của đề (phạm vi, số câu mỗi phần theo ma trận,
// bài học tiếp theo, câu về đề chung của Sở), môn và lịch thi, mức độ và ma trận 10 – 8 – 7 (chủ đề theo tên bài và thứ tự của sách, đối
// chiếu mục lục trong README của cuốn ở OnUp-Book; hai đề cố định chia đúng ma trận), dạng câu theo khung Công văn 7991 (mỗi kho ít nhất
// 6 câu đúng/sai 4 ý không lặp kiểu Đ/S, ít nhất 4 câu trả lời ngắn đáp án là số, 1–2 câu tự luận ở ô Vận dụng rút 1 câu), đáp án đúng
// không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn, không là lựa chọn
// duy nhất có chữ của nhãn chủ đề, rút thử nhiều lần (đúng ma trận; đã làm hết một đề cố định thì không rút lại câu của đề đó), đề bài
// không trùng, dò lộ đáp án giữa mọi cặp câu rút được cùng lúc (đề “Ôn chủ đề” rút chung cả chủ đề; số kèm đơn vị ở vị trí kết quả của
// câu kia: không được có; chuỗi 3 từ của đáp án bằng chữ in ra với DO_LO=1 để xem tay, đã xem ghi ở DA_XEM). Có sách ở ../OnUp-Book thì
// so mọi trường chữ với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp nguyên âm (không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và với
// câu của mọi kho khác, cả câu riêng của các đề ngẫu nhiên (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 6 từ).
// Chạy: node tests/vatli-hoahoc12-ck1.js → in MATH OK.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const qctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), qctx);
const Quiz = qctx.window.Quiz;
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- hai kho: số đề, số câu lấy từ danh mục ----------
   PHAN: các phần của lời dặn (số câu mỗi phần tính từ ma trận); BAI: chủ đề theo tên bài của sách (số bài để chia phần, đối chiếu mục
   lục); RUT_GON: tên bài rút gọn cho vừa nhãn trên câu và mã đề "Ôn chủ đề" (tối đa 80 kí tự). */
const MON = [
  { ma: "vatli", ten: "Vật lí", sach: "vat-li-12", ki: "vl",
    PHAN: [["Chương I Vật lí nhiệt (Bài 1–7)", 1, 7], ["Chương II Khí lí tưởng (Bài 8–13)", 8, 13]],
    sau: "Trường đã học thêm Bài 14–15 (Từ trường)",
    BAI: [["Cấu trúc của chất. Sự chuyển thể", 1], ["Nội năng. Định luật I của nhiệt động lực học", 2], ["Nhiệt độ. Thang nhiệt độ – nhiệt kế", 3],
      ["Nhiệt dung riêng", 4], ["Nhiệt nóng chảy riêng", 5], ["Nhiệt hoá hơi riêng", 6], ["Mô hình động học phân tử chất khí", 8], ["Định luật Boyle", 9],
      ["Định luật Charles", 10], ["Phương trình trạng thái của khí lí tưởng", 11], ["Áp suất khí. Động năng phân tử và nhiệt độ", 12]],
    RUT_GON: { "Áp suất khí. Động năng phân tử và nhiệt độ": "Áp suất khí theo mô hình động học phân tử. Quan hệ giữa động năng phân tử và nhiệt độ" } },
  { ma: "hoahoc", ten: "Hóa học", sach: "hoa-hoc-12", ki: "hh",
    PHAN: [["Chương 1 Ester – Lipid, Chương 2 Carbohydrate (Bài 1–7)", 1, 7], ["Chương 3 Hợp chất chứa nitrogen, Chương 4 Polymer (Bài 8–14)", 8, 14],
      ["Bài 15 Thế điện cực và nguồn điện hoá học", 15, 15]],
    sau: "Trường đã học thêm Bài 16 (Điện phân)",
    BAI: [["Ester – Lipid", 1], ["Xà phòng và chất giặt rửa", 2], ["Giới thiệu về carbohydrate. Glucose và fructose", 4], ["Saccharose và maltose", 5],
      ["Tinh bột và cellulose", 6], ["Amine", 8], ["Amino acid và peptide", 9], ["Protein và enzyme", 10], ["Đại cương về polymer", 12], ["Vật liệu polymer", 13],
      ["Thế điện cực và nguồn điện hoá học", 15]],
    RUT_GON: {} }
];
const ten = new Map(), monCua = new Map();
MON.forEach((m) => {
  const pool = BANKS.find((b) => b.pool && b.id === m.ma + "12-ck1-ngau-nhien");
  assert.ok(pool, "thiếu đề ngẫu nhiên " + m.ma + "12-ck1-ngau-nhien");
  m.pool = pool; m.DE = pool.pool.from; m.M = pool.pool.matrix; m.kho = pool.questions; m.file = pool.file;
  assert.equal(m.file, "12-" + m.ma + ".js", "file câu hỏi theo mã môn");
  assert.equal(m.DE.length, 2, m.ma + ": đề ngẫu nhiên lấy câu của hai đề cố định");
  assert.deepEqual(BANKS.filter((b) => b.id.startsWith(m.ma + "12-ck1-")).map((b) => b.id).sort(), [...m.DE, pool.id].sort(), m.ma + ": kho gồm hai đề cố định và đề ngẫu nhiên");
  assert.equal(m.kho.filter((q) => q.src === pool.id).length, 0, m.ma + ": đề ngẫu nhiên không có câu riêng");
  m.DE.forEach((id, k) => {
    const b = bank(id);
    assert.ok(b.file === m.file && b.subject === m.ten && b.grade === 12 && b.minutes === pool.minutes && b.n === pool.n, id + ": cùng file, môn, khối, số phút, số câu với đề ngẫu nhiên");
    assert.equal(b.questions.length, b.n, id + ": số câu bằng n của danh mục");
    m.kho.filter((q) => q.src === id).forEach((q, i) => { ten.set(q, m.ki + (k + 1) + "#" + (i + 1)); monCua.set(q, m); });
  });
  assert.equal(m.kho.length, sum(m.DE.map((id) => bank(id).n)), m.ma + ": kho = câu của hai đề cố định");
});
const [VL, HH] = MON;
// môn đúng chữ của lịch thi (MON_THPT), sáu mã đề gắn vào kì thi cuối kì I lớp 12, phạm vi của kì thi ghi đúng số bài
{
  const lich = fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8");
  const mon = /const MON_THPT = \[([^\]]*)\]/.exec(lich);
  MON.forEach((m) => assert.ok(mon && mon[1].includes('"' + m.ten + '"'), "môn " + m.ten + " có trong MON_THPT"));
  const c = vm.createContext({ window: {} }); vm.runInContext(lich, c);
  const ev = c.window.ONTAP_SEED_EVENTS.find((e) => e.id === "ck1-l12");
  assert.ok(ev && ev.grades.includes(12), "có kì thi ck1-l12");
  MON.forEach((m) => {
    [...m.DE, m.pool.id].forEach((id) => assert.ok(ev.banks.includes(id), id + " gắn vào ck1-l12"));
    const cuoi = m.PHAN[m.PHAN.length - 1][2];
    assert.ok(ev.scope.includes(m.ten + ": Bài 1–" + cuoi), "phạm vi của ck1-l12 ghi " + m.ten + ": Bài 1–" + cuoi);
  });
}

/* ---------- số ----------
   Số trong đề: hàng nghìn ngăn bằng khoảng trắng, dấu phẩy thập phân, luỹ thừa của 10 viết “2,26 · 10⁶”. */
const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹", SUB = "₀₁₂₃₄₅₆₇₈₉";
const NUM = "[−-]?\\d{1,3}(?: \\d{3})*(?:,\\d+)?(?: · 10⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)?";
const val = (s) => {
  const m = /^([−-]?\d{1,3}(?: \d{3})*(?:,\d+)?)(?: · 10(⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+))?$/.exec(String(s).trim());
  assert.ok(m, "không đọc được số “" + s + "”");
  const e = m[2] ? +[...m[2]].map((c) => (c === "⁻" ? "-" : SUP.indexOf(c))).join("") : 0;
  return +m[1].replace(/ /g, "").replace("−", "-").replace(",", ".") * 10 ** e;
};
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
// mẫu chữ có # ở chỗ số: so("Cho # g", s) → [số]
const R = (mau) => new RegExp(mau.split("#").map(escRe).join("(" + NUM + ")"), "u");
const so = (s, mau) => { const m = R(mau).exec(s); assert.ok(m, "không thấy “" + mau + "” trong: " + String(s).slice(0, 80)); return m.slice(1).map(val); };
const gan = (a, b, e = 1e-9) => a === b || Math.abs(a - b) <= e * Math.max(Math.abs(a), Math.abs(b)); // sai số tương đối (cả số rất nhỏ như 6,21 · 10⁻²¹)
// số viết kiểu Việt Nam: 7500 → "7 500", 0.15 → "0,15"; vnf giữ đủ d chữ số thập phân (4 → "4,0")
const vn = (x, d = 6) => { const r = Math.round(x * 10 ** d) / 10 ** d, [a, b] = String(Math.abs(r)).split("."); return (r < 0 ? "−" : "") + a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); };
const vnf = (x, d) => { const [a, b] = Math.abs(x).toFixed(d).split("."); return (x < 0 ? "−" : "") + a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); };
const supS = (n) => (n < 0 ? "⁻" : "") + String(Math.abs(n)).split("").map((c) => SUP[+c]).join("");
const sci = (x, d) => { let e = Math.floor(Math.log10(Math.abs(x))), m = +(x / 10 ** e).toFixed(d); if (Math.abs(m) >= 10) { m /= 10; e++; } return vnf(m, d) + " · 10" + supS(e); };
// số ghi trong chữ (làm tròn đến chữ số cuối đã ghi) khớp giá trị tính được
const khopSo = (chu, x) => {
  const m = /^([−-]?[\d ]+)(?:,(\d+))?(?: · 10(⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+))?$/.exec(chu.trim()), e = m[3] ? val("1 · 10" + m[3]) : 1;
  return Math.abs(val(chu) - x) <= (0.5 * e) / 10 ** (m[2] ? m[2].length : 0) + 1e-12 * Math.abs(x);
};
const coX = (q, ...cum) => cum.forEach((c) => assert.ok(q.x.includes(c), "lời giải cần có “" + c + "”"));
const coThang = (q, ...cum) => { const r = q.rubric.map((c) => c.c).join(" | "); cum.forEach((c) => assert.ok(r.includes(c), "thang chấm cần có “" + c + "”")); };
const dapSo = (q) => { const m = /^Đáp số: (.+)$/m.exec(q.x); assert.ok(m, "gợi ý ghi đáp số"); return m[1]; };

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">");
  return Object.assign(a, { t: m[2], at: [+a.x, +a.y], b: a["font-weight"] === "bold" || a["font-weight"] === "700", fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start" }); });
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const ends = (l) => [[+l.x1, +l.y1], [+l.x2, +l.y2]];
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const same = (p, q) => dist(p, q) < 0.06;
// mọi chữ trong hình cỡ từ 13, nằm trọn trong khung, không đè lên nhau (ước bề rộng chữ như tests/toan12-ck1.js)
const hopChu = (t) => { const w = (t.b ? 0.62 : 0.55) * t.fs * [...t.t].length, x0 = t.anchor === "middle" ? t.at[0] - w / 2 : t.anchor === "end" ? t.at[0] - w : t.at[0];
  return [x0, t.at[1] - 0.75 * t.fs, x0 + w, t.at[1] + 0.25 * t.fs]; };
const chuHinh = (svg, at) => {
  const v = /viewBox="([^"]+)"/.exec(svg)[1].split(/\s+/).map(Number), T = texts(svg);
  T.forEach((t) => { const h = hopChu(t); assert.ok(t.fs >= 13, at + ": chữ “" + t.t + "” nhỏ hơn cỡ 13"); assert.ok(h[0] >= 0 && h[2] <= v[2] && h[1] >= 0 && h[3] <= v[3], at + ": chữ “" + t.t + "” tràn khỏi khung hình"); });
  T.forEach((t, i) => T.slice(i + 1).forEach((u) => { const a = hopChu(t), b = hopChu(u); assert.ok(!(a[0] < b[2] - 1 && b[0] < a[2] - 1 && a[1] < b[3] - 1 && b[1] < a[3] - 1), at + ": chữ “" + t.t + "” đè lên chữ “" + u.t + "”"); }));
};
/* Đồ thị trên lưới: hai trục màu ink nét 1,5 gặp nhau ở gốc O (chữ O cạnh gốc), đầu trục có mũi tên; đường lưới màu line cách đều theo
   từng chiều, bắt đầu từ trục; số ở trục ngang ngay dưới một đường lưới dọc, số ở trục đứng ngay trái một đường lưới ngang, giá trị tỉ lệ
   với khoảng cách tới gốc; tên trục dạng “V (L)”; đường biểu diễn màu acc nét 2,5 (polyline hoặc đoạn thẳng; đoạn nét đứt màu acc nối
   gốc với đầu đoạn thẳng); điểm A là chấm tròn màu bad ở một nút lưới, có hai đường gióng nét đứt màu muted xuống hai trục, chữ A đậm cạnh
   chấm. Trả về tên hai trục, toạ độ của A, các điểm của đường biểu diễn (theo giá trị) và đoạn nét đứt. */
const docDoThi = (svg, at) => {
  const L = tags(svg, "line"), T = texts(svg), sx = (v) => v.map(Number).sort((a, b) => a - b);
  const doc = sx(L.filter((l) => l.stroke === "line" && l.x1 === l.x2).map((l) => l.x1)), ngang = sx(L.filter((l) => l.stroke === "line" && l.y1 === l.y2).map((l) => l.y1));
  const truc = L.filter((l) => l.stroke === "ink" && l["stroke-width"] === "1.5"), tx = truc.filter((l) => l.y1 === l.y2), ty = truc.filter((l) => l.x1 === l.x2);
  assert.ok(tx.length === 1 && ty.length === 1, at + ": một trục ngang, một trục đứng");
  const O = [+ty[0].x1, +tx[0].y1];
  assert.ok(+tx[0].x1 === O[0] && +ty[0].y1 === O[1] && +tx[0].x2 > O[0] && +ty[0].y2 < O[1], at + ": hai trục đi từ gốc O sang phải, lên trên");
  const dau = tags(svg, "polygon").filter((p) => p.fill === "ink").map((p) => pts(p.points)[0]);
  assert.ok(dau.some((p) => p[1] === O[1] && p[0] > +tx[0].x2) && dau.some((p) => p[0] === O[0] && p[1] < +ty[0].y2), at + ": đầu hai trục có mũi tên");
  assert.ok(T.some((t) => t.t === "O" && dist(t.at, O) < 22), at + ": chữ O ở gốc");
  const bx = doc[0] - O[0], by = O[1] - ngang[ngang.length - 1];
  doc.forEach((x, i) => assert.ok(Math.abs(x - O[0] - (i + 1) * bx) < 0.06, at + ": lưới đều theo chiều ngang"));
  ngang.slice().reverse().forEach((y, j) => assert.ok(Math.abs(O[1] - y - (j + 1) * by) < 0.06, at + ": lưới đều theo chiều đứng"));
  const soX = T.filter((t) => /^\d+$/.test(t.t) && t.at[1] > O[1]), soY = T.filter((t) => /^\d+$/.test(t.t) && t.at[0] < O[0]);
  assert.ok(soX.length >= 3 && soY.length >= 3, at + ": trục có số");
  soX.forEach((t) => assert.ok(doc.some((x) => Math.abs(x - t.at[0]) < 0.06) && t.anchor === "middle", at + ": số " + t.t + " ở trục ngang đúng một vạch lưới"));
  soY.forEach((t) => assert.ok(ngang.some((y) => Math.abs(y - (t.at[1] - 5)) < 0.06) && t.anchor === "end", at + ": số " + t.t + " ở trục đứng đúng một vạch lưới"));
  const kx = +soX[0].t / (soX[0].at[0] - O[0]), ky = +soY[0].t / (O[1] - (soY[0].at[1] - 5));
  soX.forEach((t) => assert.ok(gan(+t.t, kx * (t.at[0] - O[0]), 1e-6), at + ": số ở trục ngang tỉ lệ với khoảng cách tới gốc"));
  soY.forEach((t) => assert.ok(gan(+t.t, ky * (O[1] - (t.at[1] - 5)), 1e-6), at + ": số ở trục đứng tỉ lệ với khoảng cách tới gốc"));
  const V = (p) => [(p[0] - O[0]) * kx, (O[1] - p[1]) * ky];
  const tenTruc = T.filter((t) => /^[pVT] \((?:kPa|L|K)\)$/.test(t.t));
  const tenX = tenTruc.filter((t) => t.at[1] > O[1]), tenY = tenTruc.filter((t) => t.at[1] < O[1]);
  assert.ok(tenX.length === 1 && tenY.length === 1 && tenTruc.length === 2, at + ": tên hai trục");
  const pl = tags(svg, "polyline").filter((p) => p.stroke === "acc"), lien = L.filter((l) => l.stroke === "acc" && !l["stroke-dasharray"]), dut = L.filter((l) => l.stroke === "acc" && l["stroke-dasharray"]);
  assert.equal(pl.length + lien.length, 1, at + ": một đường biểu diễn");
  const net = (pl.length ? pts(pl[0].points) : ends(lien[0])).map(V);
  const cham = tags(svg, "circle").filter((c) => c.fill === "bad");
  assert.equal(cham.length, 1, at + ": một điểm A");
  const a = [+cham[0].cx, +cham[0].cy];
  assert.ok(doc.some((x) => Math.abs(x - a[0]) < 0.06) && ngang.some((y) => Math.abs(y - a[1]) < 0.06), at + ": A ở một nút lưới");
  const gio = L.filter((l) => l.stroke === "muted" && l["stroke-dasharray"]).map(ends);
  assert.ok(gio.some(([p, q]) => same(p, a) && same(q, [a[0], O[1]])) && gio.some(([p, q]) => same(p, a) && same(q, [O[0], a[1]])), at + ": hai đường gióng từ A xuống hai trục");
  assert.ok(T.some((t) => t.t === "A" && t.b && dist(t.at, a) < 20), at + ": chữ A đậm cạnh điểm A");
  chuHinh(svg, at);
  return { x: tenX[0].t, y: tenY[0].t, A: V(a), net, dut: dut.map(ends).map((e) => e.map(V)) };
};
// đường đẳng nhiệt: mọi điểm của đường có tích x·y bằng của A (sai số do làm tròn toạ độ của hình)
const dangNhiet = (g, at) => { const k = g.A[0] * g.A[1]; g.net.forEach((p) => assert.ok(gan(p[0] * p[1], k, 0.01), at + ": đường đẳng nhiệt có pV không đổi"));
  assert.ok(g.net.some((p) => gan(p[0], g.A[0], 1e-6) && gan(p[1], g.A[1], 1e-6)), at + ": A nằm trên đường"); assert.equal(g.dut.length, 0); };
// đường thẳng qua gốc toạ độ: đoạn liền có hai đầu cùng tỉ số y/x với A; đoạn nét đứt nối gốc với đầu đoạn liền
const quaGoc = (g, at) => { const k = g.A[1] / g.A[0]; g.net.forEach((p) => assert.ok(gan(p[1] / p[0], k, 1e-3), at + ": đường thẳng đi qua gốc toạ độ"));
  assert.ok(g.dut.length === 1 && same(g.dut[0][0], [0, 0]) && g.net.some((p) => same(p, g.dut[0][1])), at + ": đoạn nét đứt nối gốc với đầu đường liền");
  const [P, Q] = g.net; assert.ok(Math.min(P[0], Q[0]) < g.A[0] && g.A[0] < Math.max(P[0], Q[0]), at + ": A nằm trên đoạn liền"); };
/* Công thức cấu tạo: chữ đậm là nguyên tử, đoạn thẳng màu ink là liên kết (nối hai nguyên tử gần hai đầu đoạn; liên kết đôi là hai đoạn
   song song). Kiểm tra hoá trị từng nguyên tử; trả về các nguyên tử kèm liên kết (bậc liên kết). */
const HOA_TRI = { C: 4, H: 1, O: 2, N: 3, Cl: 1 };
const docCauTao = (svg, at) => {
  const ng = texts(svg).filter((t) => /^[A-Z][a-z]?$/.test(t.t)).map((t) => ({ e: t.t, p: [+t.x, +t.y - 5] }));
  assert.ok(texts(svg).every((t) => t.b), at + ": nguyên tử viết chữ đậm");
  const gn = (p) => ng.reduce((x, y) => (dist(y.p, p) < dist(x.p, p) ? y : x)), bac = new Map();
  tags(svg, "line").filter((l) => l.stroke === "ink").map(ends).forEach(([a, b]) => {
    const u = gn(a), v = gn(b);
    assert.ok(u !== v && dist(u.p, a) < 20 && dist(v.p, b) < 20, at + ": liên kết nối hai nguyên tử");
    const k = [ng.indexOf(u), ng.indexOf(v)].sort((x, y) => x - y).join("-"); bac.set(k, (bac.get(k) || 0) + 1);
  });
  ng.forEach((x, i) => { x.lk = [...bac].map(([k, o]) => [k.split("-").map(Number), o]).filter(([k]) => k.includes(i)).map(([k, o]) => ({ j: k[0] === i ? k[1] : k[0], o }));
    assert.equal(sum(x.lk.map((l) => l.o)), HOA_TRI[x.e], at + ": hoá trị của " + x.e); });
  chuHinh(svg, at);
  return ng;
};
const congThucPT = (ng) => { const dem = {}; ng.forEach((x) => (dem[x.e] = (dem[x.e] || 0) + 1));
  return ["C", "H", ...Object.keys(dem).filter((e) => e !== "C" && e !== "H").sort()].filter((e) => dem[e]).map((e) => e + (dem[e] > 1 ? String(dem[e]).split("").map((c) => SUB[+c]).join("") : "")).join(""); };
// tên ester đơn chức RCOOR′ như sách: tên gốc R′ + tên gốc acid (tên thay thế, hoặc tên thông thường)
const GOC = ["", "methyl", "ethyl", "propyl", "butyl"], ACID = ["", "methanoate", "ethanoate", "propanoate", "butanoate"], ACID_TT = ["", "formate", "acetate", "propionate", "butyrate"];
const tenEster = (ng, at) => {
  const lan = (i, e, o) => ng[i].lk.filter((l) => ng[l.j].e === e && (o == null || l.o === o)).map((l) => l.j);
  const cC = ng.map((x, i) => i).filter((i) => ng[i].e === "C" && lan(i, "O", 2).length === 1 && lan(i, "O", 1).length === 1);
  assert.equal(cC.length, 1, at + ": một nhóm –COO–");
  const oE = lan(cC[0], "O", 1)[0], dem = (i, bo) => { const da = new Set([bo, i]), xet = [i]; while (xet.length) lan(xet.pop(), "C").forEach((j) => { if (!da.has(j)) { da.add(j); xet.push(j); } }); return [...da].filter((j) => j !== bo && ng[j].e === "C").length; };
  const nR = dem(lan(oE, "C").find((j) => j !== cC[0]), oE), nA = dem(cC[0], oE);
  return [GOC[nR] + " " + ACID[nA], GOC[nR] + " " + ACID_TT[nA]];
};

/* ---------- hoá học: công thức (chữ số dưới dòng), khối lượng mol, phương trình (cả ion, hệ số n) ---------- */
// "(C₆H₁₀O₅)ₙ" với n cho trước → { C: 6n, H: 10n, O: 5n }; "[H]" là một nguyên tử H
const congThuc = (f, n = 1) => {
  let i = 0;
  const doc = () => {
    const out = {};
    while (i < f.length && f[i] !== ")" && f[i] !== "]") {
      let part;
      if (f[i] === "(" || f[i] === "[") { const dong = f[i] === "(" ? ")" : "]"; i++; part = doc(); assert.equal(f[i], dong, "thiếu " + dong + " trong " + f); i++; }
      else { const m = /^[A-Z][a-z]?/.exec(f.slice(i)); assert.ok(m, "không đọc được công thức " + f); i += m[0].length; part = { [m[0]]: 1 }; }
      let k = ""; while (i < f.length && SUB.includes(f[i])) k += f[i++];
      let nhan = k ? +[...k].map((c) => SUB.indexOf(c)).join("") : 1;
      if (f[i] === "ₙ") { nhan *= n; i++; }
      Object.entries(part).forEach(([e, c]) => (out[e] = (out[e] || 0) + c * nhan));
    }
    return out;
  };
  const r = doc(); assert.equal(i, f.length, "thừa chữ trong công thức " + f); return r;
};
const NTK = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Ni: 59, Cu: 64, Zn: 65, Ag: 108, Sn: 119, Pb: 207 };
const KL = (f, nt = NTK) => Object.entries(congThuc(f)).reduce((s, [e, c]) => { assert.ok(e in nt, "thiếu nguyên tử khối của " + e + " (" + f + ")"); return s + nt[e] * c; }, 0);
const LOAI = "(?:\\d+n?|n)?(?:\\[[A-Z][a-z]?\\]|\\(?[A-Z][A-Za-z₀-₉ₙ()]*)(?:[²³]?[⁺⁻])?";
const PT = new RegExp(`${LOAI}(?: \\+ ${LOAI})* (?:→|⇌) ${LOAI}(?: \\+ ${LOAI})*`, "gu");
const loai = (t) => { const m = /^(\d*)(n?)(.+?)([²³]?)([⁺⁻]?)$/u.exec(t.trim()); assert.ok(m, "không đọc được chất " + t);
  return { k: m[1] ? +m[1] : 1, n: !!m[2], f: m[3], ten: m[3] + m[4] + m[5], q: m[5] ? (m[5] === "⁺" ? 1 : -1) * (m[4] ? SUP.indexOf(m[4]) : 1) : 0 }; };
const tach = (pt) => pt.split(/ (?:→|⇌) /).map((v) => v.split(" + ").map(loai));
const canBang = (pt) => [2, 5].every((n) => {
  const [a, b] = tach(pt).map((v) => { const o = {}; let q = 0; v.forEach((s) => { const k = s.k * (s.n ? n : 1); Object.entries(congThuc(s.f, n)).forEach(([e, c]) => (o[e] = (o[e] || 0) + k * c)); q += k * s.q; }); return { o, q }; });
  return a.q === b.q && [...new Set([...Object.keys(a.o), ...Object.keys(b.o)])].every((e) => a.o[e] === b.o[e]);
});
// hệ số của chất (tên kèm điện tích) trong phương trình; tính số mol chất y từ số mol chất x
const heSo = (pt, ten_) => { const c = tach(pt).flat().filter((v) => v.ten === ten_); assert.equal(c.length, 1, ten_ + " có đúng một lần trong " + pt); return c[0].k; };
const molTheoPT = (pt, x, nx, y) => (nx * heSo(pt, y)) / heSo(pt, x);
const ptCua = (q, x, y) => { const p = [...new Set((q.q + " | " + q.x).match(PT) || [])].filter((s) => [x, y].every((c) => tach(s).flat().some((v) => v.ten === c)));
  assert.equal(p.length, 1, "đề hoặc lời giải có đúng một phương trình chứa " + x + " và " + y); return p[0]; };
// nguyên tử khối đề cho: “(Cho H = 1, C = 12, O = 16.)”; phải đúng bảng nguyên tử khối
const ntDe = (q) => { const m = /\(Cho ([^)]*)\.\)/.exec(q.q); assert.ok(m, "đề cho nguyên tử khối"); const nt = {};
  [...m[1].matchAll(/([A-Z][a-z]?) = (\d+(?:,\d+)?)/g)].forEach((k) => { nt[k[1]] = val(k[2]); assert.equal(nt[k[1]], NTK[k[1]], "nguyên tử khối của " + k[1]); }); return nt; };
// thế điện cực chuẩn (V) theo bảng thế điện cực chuẩn ở Bài 15 của sách; đề ghi “E°(Ni²⁺/Ni) = −0,257 V”
const E0_SACH = { Mg: -2.356, Al: -1.676, Zn: -0.762, Fe: -0.44, Ni: -0.257, Sn: -0.137, Pb: -0.126, H: 0, Cu: 0.34, Ag: 0.799 };
const e0De = (s) => { const E = {}; [...s.matchAll(new RegExp("(?<![−+] )E°\\(([A-Z][a-z]?)[²³]?⁺\\/([A-Z][a-z]?)\\) = ([−+]?" + "\\d+,\\d+) V", "gu"))].forEach((m) => {
  assert.equal(m[1], m[2], "cặp oxi hoá – khử của cùng một kim loại"); E[m[1]] = val(m[3].replace("+", "")); assert.ok(gan(E[m[1]], E0_SACH[m[1]]), "E° của " + m[1] + " đúng bảng của sách"); }); return E; };
// phản ứng “X + Yⁿ⁺ → Xⁿ⁺ + Y” giữa kim loại và ion kim loại xảy ra khi E° của cặp Yⁿ⁺/Y lớn hơn của Xⁿ⁺/X
const xayRa = (pt, E) => { const [[x, y], [x2, y2]] = tach(pt); assert.ok(x.q === 0 && y.q > 0 && x2.f === x.f && x2.q > 0 && y2.f === y.f && y2.q === 0, "phản ứng kim loại với ion kim loại: " + pt);
  assert.ok(x.f in E && y.f in E, "đề cho E° của " + x.f + ", " + y.f); return E[y.f] > E[x.f]; };

/* ---------- các câu cần tính ----------
   id: đề chứa câu (vl1, vl2, hh1, hh2: đề 1, đề 2 của môn); has: đoạn chữ của đề; right(q): đáp án tính bằng code (câu đúng/sai 4 ý:
   mảng, null ở ý không tính được); essay(q): câu tự luận so với thang chấm và đáp số. */
const R_KHI = 8.31; // hằng số khí lí tưởng (J/mol.K), như sách
const CHECKS = [
  /* ----- Vật lí, Đề 1 ----- */
  { id: "vl1", has: "Khí trong xi lanh của một động cơ nhận nhiệt lượng", right: (q) => {
    const [Qk, Ad] = so(q.q, "nhận nhiệt lượng # kJ từ nhiên liệu cháy, đồng thời giãn nở và thực hiện công # J"), Q = Qk * 1000, A = -Ad, dU = A + Q;
    coX(q, "ΔU = A + Q = " + vn(A) + " + " + vn(Q) + " = " + vn(dU) + " (J)");
    const [qa] = so(q.o[0], "Q = +# J"), [aa] = so(q.o[1], "A = +# J"), [du] = so(q.o[2], "tăng # J"), [Q2, A2, giam] = so(q.o[3], "nhận nhiệt lượng # kJ nhưng thực hiện công # kJ thì nội năng của khí giảm # kJ");
    return [gan(qa, Q), gan(aa, A), gan(du, dU), gan(-giam, Q2 - A2)]; } },
  { id: "vl1", has: "Một viên đạn chì khối lượng", right: (q) => {
    const [m, v] = so(q.q, "khối lượng # g bay với tốc độ # m/s"), [pc] = so(q.q, "Coi #% động năng"), W = 0.5 * (m / 1000) * v * v;
    coX(q, "= " + vn(W) + " (J)"); return (pc / 100) * W; } },
  { id: "vl1", has: "Nitrogen lỏng dùng để bảo quản mẫu tế bào", right: (q) => { const [t] = so(q.q, "nhiệt độ khoảng # °C"); return vn(t + 273) + " K"; } },
  { id: "vl1", has: "Một quả cầu nhôm khối lượng", right: (q) => {
    const [m1, t1, m2, t2] = so(q.q, "khối lượng # kg được nung nóng tới # °C rồi thả vào một cốc cách nhiệt chứa # kg nước ở # °C");
    const [c1, c2] = so(q.q, "nhiệt dung riêng của nhôm và của nước lần lượt là # J/kg.K và # J/kg.K"), t = (m1 * c1 * t1 + m2 * c2 * t2) / (m1 * c1 + m2 * c2);
    coX(q, "t = " + vn(t) + " (°C)"); return t; } },
  { id: "vl1", has: "Cần cung cấp nhiệt lượng bao nhiêu để làm nóng chảy hoàn toàn", right: (q) => {
    const [m] = so(q.q, "hoàn toàn # kg nước đá ở 0 °C"), [lam] = so(q.q, "nhiệt nóng chảy riêng của nước đá là # J/kg"); return vn((lam * m) / 1000) + " kJ"; } },
  { id: "vl1", has: "Dẫn 0,1 kg hơi nước ở 100 °C", essay: (q) => {
    const [m1] = so(q.q, "Dẫn # kg hơi nước ở 100 °C"), [m2, t2] = so(q.q, "chứa # kg nước ở # °C"), [c] = so(q.q, "nhiệt dung riêng của nước là # J/kg.K"), [L] = so(q.q, "nhiệt hoá hơi riêng của nước ở 100 °C là # J/kg");
    const t = (L * m1 + m1 * c * 100 + m2 * c * t2) / (m1 * c + m2 * c);
    coThang(q, vn(L * m1) + " J", vn(m1 * c) + "(100 − t)", vn(m2 * c) + "(t − " + vn(t2) + ")", "t ≈ " + vnf(t, 1) + " °C"); assert.equal(dapSo(q), "t ≈ " + vnf(t, 1) + " °C."); } },
  { id: "vl1", has: "Một xi lanh có đầu ra được bịt kín chứa", right: (q) => {
    const [V1, p1] = so(q.q, "chứa # mL không khí ở áp suất # kPa"), [V2] = so(q.q, "thể tích khí còn # mL"); return vn((p1 * V1) / V2) + " kPa"; } },
  { id: "vl1", has: "Một săm xe đạp có thể tích", right: (q) => {
    const [V, p] = so(q.q, "có thể tích # L (coi như không đổi), lúc đầu chứa không khí ở áp suất # kPa"), [dv, p0] = so(q.q, "Mỗi lần bơm đưa vào săm # cm³ không khí ở áp suất # kPa"), [N] = so(q.q, "Sau # lần bơm");
    assert.equal(p0, p, "khí bơm vào cùng áp suất với khí lúc đầu"); return (p * (V + (N * dv) / 1000)) / V; } },
  { id: "vl1", has: "Giữ áp suất không đổi và nung nóng khí đến", right: (q) => {
    const [V1, t1] = so(q.q, "có thể tích # L ở # °C"), [t2] = so(q.q, "nung nóng khí đến # °C"); return vnf((V1 * (t2 + 273)) / (t1 + 273), 1) + " L"; } },
  { id: "vl1", has: "Không khí trong một căn phòng có khe hở", right: (q) => {
    const [t1] = so(q.q, "đang ở # °C"), [t2] = so(q.q, "không khí trong phòng ở # °C"); coX(q, vn(t1 + 273) + " : " + vn(t2 + 273)); return (1 - (t1 + 273) / (t2 + 273)) * 100; } },
  { id: "vl1", has: "Đồ thị bên biểu diễn sự thay đổi áp suất p theo nhiệt độ tuyệt đối T", right: (q) => {
    const g = docDoThi(q.svg, "đồ thị p–T"); assert.ok(g.x === "T (K)" && g.y === "p (kPa)"); quaGoc(g, "đồ thị p–T");
    assert.ok(/bình kín có dung tích/.test(q.q), "thể tích không đổi"); const [V] = so(q.q, "dung tích # L"), [R_] = so(q.q, "R = # J/mol.K"); assert.equal(R_, R_KHI);
    coX(q, "T = " + vn(g.A[0]) + " K, p = " + vn(g.A[1]) + " kPa"); return (g.A[1] * 1000 * (V / 1000)) / (R_ * g.A[0]); } },
  { id: "vl1", has: "Một bình kín chứa khí lí tưởng ở 27 °C. Cho k", right: (q) => {
    const [k] = so(q.q, "k = # J/K"), E = (t) => 1.5 * k * (t + 273), [ta, Ea] = so(q.o[0], "Ở # °C, Ēđ = # J"), [tb] = so(q.o[1], "tăng lên # °C thì Ēđ tăng gấp đôi");
    const [tc, tc0] = so(q.o[2], "Ở # °C, Ēđ gấp đôi giá trị ở # °C"), [td] = so(q.o[3], "Ở # °C"), Ed = /Ēđ = (.+) J\.$/.exec(q.o[3])[1], [t0] = so(q.q, "khí lí tưởng ở # °C");
    assert.ok(ta === t0 && tc0 === t0, "các ý so với nhiệt độ của đề");
    return [khopSo(/Ēđ = (.+) J\.$/.exec(q.o[0])[1], E(ta)), gan(E(tb), 2 * E(t0)), gan(E(tc), 2 * E(t0)), khopSo(Ed, E(td))]; } },
  { id: "vl1", has: "Số phân tử khí trong mỗi mét khối của bình là x · 10²⁵", right: (q) => {
    const [t, p] = so(q.q, "khí lí tưởng ở # °C, áp suất # Pa"), [k] = so(q.q, "k = # J/K"), e = val("1 · 10" + /là x · 10(⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)\./u.exec(q.q)[1]); return p / (k * (t + 273)) / e; } },
  /* ----- Vật lí, Đề 2 ----- */
  { id: "vl2", has: "Một búa máy khối lượng", right: (q) => {
    const [m, h] = so(q.q, "khối lượng # kg rơi từ độ cao # m"), [pc] = so(q.q, "Mỗi lần đập, #% thế năng"), [g] = so(q.q, "g = # m/s²"), [N] = so(q.q, "Sau # lần đập");
    coX(q, "Wt = mgh = " + vn(m) + " · " + vn(g) + " · " + vn(h) + " = " + vn(m * g * h) + " (J)"); return vn((N * (pc / 100) * m * g * h) / 1000) + " kJ"; } },
  { id: "vl2", has: "Một quả trứng vừa luộc chín có nhiệt độ", right: (q) => {
    const [t1, t2] = so(q.q, "có nhiệt độ # °C được thả vào bát nước ở # °C"), [Tb] = so(q.o[1], "quả trứng là # K"), [dt, dT] = so(q.o[3], "nguội đi # °C thì theo thang Kelvin, nhiệt độ của nó giảm # K");
    assert.ok(/^Nhiệt năng truyền từ nước trong bát sang quả trứng/.test(q.o[0]));
    return [t2 > t1, gan(Tb, t1 + 273), null, gan(dT, dt)]; } },
  { id: "vl2", has: "Một bình nóng lạnh có công suất", right: (q) => {
    const [P, V, t1, t2] = so(q.q, "công suất # W đun # lít nước từ # °C lên # °C"), [H] = so(q.q, "Hiệu suất của bình là #%"), [c] = so(q.q, "nhiệt dung riêng của nước là # J/kg.K"), [rho] = so(q.q, "coi mỗi lít nước có khối lượng # kg");
    const Qn = rho * V * c * (t2 - t1); coX(q, "= " + vn(Qn) + " (J)"); return Qn / ((H / 100) * P) / 60; } },
  { id: "vl2", has: "Để làm nóng chảy hoàn toàn 0,6 kg một kim loại", right: (q) => {
    const [m] = so(q.q, "hoàn toàn # kg một kim loại"), [Qk] = so(q.q, "cần nhiệt lượng # kJ"); return sci((Qk * 1000) / m, 1) + " J/kg"; } },
  { id: "vl2", has: "chuyển hết thành hơi nước ở 100 °C", right: (q) => {
    const [m] = so(q.q, "để # kg nước đá ở 0 °C"), [lam] = so(q.q, "nhiệt nóng chảy riêng của nước đá là # J/kg"), [c] = so(q.q, "nhiệt dung riêng của nước là # J/kg.K"), [L] = so(q.q, "nhiệt hoá hơi riêng của nước ở 100 °C là # J/kg");
    const Q = m * (lam + c * 100 + L); coX(q, vn(Q) + " J"); return Q / 1000; } },
  { id: "vl2", has: "Đồ thị bên biểu diễn sự thay đổi áp suất p theo thể tích V", right: (q) => {
    const g = docDoThi(q.svg, "đồ thị p–V"); assert.ok(g.x === "V (L)" && g.y === "p (kPa)"); dangNhiet(g, "đồ thị p–V"); assert.ok(/nhiệt độ không đổi/.test(q.q));
    const [V2] = so(q.q, "Khi thể tích của lượng khí là # L"); coX(q, "V₁ = " + vn(g.A[0]) + " L, p₁ = " + vn(g.A[1]) + " kPa"); return (g.A[0] * g.A[1]) / V2; } },
  { id: "vl2", has: "Một bình thép dung tích", right: (q) => {
    const [V, p] = so(q.q, "dung tích # L chứa khí heli ở áp suất # atm"), [Vb, pb] = so(q.q, "có thể tích # L, áp suất khí trong bóng là # atm"), [pc] = so(q.q, "giảm còn # atm thì không bơm thêm được");
    assert.equal(pc, pb); const N = ((V * p) / pb - V) / Vb; coX(q, vn(N) + " quả"); return Math.floor(N); } },
  { id: "vl2", has: "Đồ thị bên biểu diễn sự thay đổi thể tích V theo nhiệt độ tuyệt đối T", right: (q) => {
    const g = docDoThi(q.svg, "đồ thị V–T"); assert.ok(g.x === "T (K)" && g.y === "V (L)"); quaGoc(g, "đồ thị V–T"); assert.ok(/áp suất không đổi/.test(q.q));
    const [V2] = so(q.q, "Khi thể tích của lượng khí là # L"); coX(q, "T₁ = " + vn(g.A[0]) + " K, V₁ = " + vn(g.A[1]) + " L"); return (g.A[0] * V2) / g.A[1]; } },
  { id: "vl2", has: "Một nhiệt kế khí đơn giản", right: (q) => {
    const [t, V] = so(q.q, "Ở # °C, lượng khí bị nhốt có thể tích # cm³"), [S] = so(q.q, "Tiết diện trong của ống là # cm²"), [dt] = so(q.q, "tăng thêm # °C");
    const dV = (V * dt) / (t + 273); coX(q, "ΔV = " + vn(dV) + " cm³"); return dV / S; } },
  { id: "vl2", has: "1 mol của bất kì chất khí nào cũng có thể tích khoảng", right: (q) => {
    const [T, p] = so(q.q, "nhiệt độ # K, áp suất # Pa"); return vnf(((R_KHI * T) / p) * 1000, 1) + " lít"; } },
  { id: "vl2", has: "Một lốp ô tô có thể tích bên trong", essay: (q) => {
    const [V, t1, p1] = so(q.q, "thể tích bên trong # L (coi như không đổi) được bơm không khí ở # °C đến áp suất # Pa"), [R_] = so(q.q, "R = # J/mol.K"), [t2] = so(q.q, "nóng lên tới # °C"), [p3] = so(q.q, "chỉ còn # Pa");
    assert.equal(R_, R_KHI); const T1 = t1 + 273, T2 = t2 + 273, n = (p1 * V) / 1000 / (R_ * T1), p2 = (p1 * T2) / T1, n3 = (p3 * V) / 1000 / (R_ * T2);
    const xa = +vnf(n, 2).replace(",", ".") - +vnf(n3, 2).replace(",", ".");
    coThang(q, "T₁ = " + vn(t1) + " + 273 = " + vn(T1) + " K", "≈ " + vnf(n, 2) + " mol", "T₂ = " + vn(T2) + " K", "p₂ = " + sci(p2, 1) + " Pa", "n′ ≈ " + vnf(n3, 2) + " mol", "khoảng " + vnf(xa, 2) + " mol");
    assert.ok(Math.abs(xa - (n - n3)) < 0.005, "số mol phải xả"); assert.equal(dapSo(q), "a) n ≈ " + vnf(n, 2) + " mol; b) p₂ = " + sci(p2, 1) + " Pa; c) xả khoảng " + vnf(xa, 2) + " mol."); } },
  { id: "vl2", has: "Khí lí tưởng chứa trong một bình kín, thể tích bình không đổi, được đun nóng từ", right: (q) => {
    const [T1, T2] = so(q.q, "đun nóng từ # K lên # K"), [k] = so(q.q, "k = # J/K"), [ka] = so(q.o[0], "tăng # lần"), [kb] = so(q.o[1], "tăng # lần"), [Tc] = so(q.o[2], "Ở # K"), Ec = /khoảng (.+) J\.$/.exec(q.o[2])[1];
    assert.ok(/^Động năng tịnh tiến trung bình/.test(q.o[0]) && /^Áp suất/.test(q.o[1]) && /^Động năng của từng phân tử/.test(q.o[3]));
    return [gan(ka, T2 / T1), gan(kb, T2 / T1), Tc === T2 && khopSo(Ec, 1.5 * k * Tc), null]; } },
  { id: "vl2", has: "Hai bình có cùng dung tích chứa khí lí tưởng", right: (q) => {
    const [t1, N2, t2] = so(q.q, "Bình 1 chứa N phân tử khí ở # °C; bình 2 chứa #N phân tử khí ở # °C"); return (N2 * (t2 + 273)) / (t1 + 273); } },
  /* ----- Hoá học, Đề 1 ----- */
  { id: "hh1", has: "Công thức cấu tạo của một ester được vẽ ở hình bên", right: (q) => {
    const ng = docCauTao(q.svg, "công thức cấu tạo"), [ten_, tenTT] = tenEster(ng, "công thức cấu tạo");
    assert.equal(congThucPT(ng), "C₄H₈O₂"); assert.ok(!q.o.slice(1).some((o) => o === ten_ || o === tenTT), "lựa chọn sai không là tên khác của chất trong hình");
    coX(q, ten_ + " (" + tenTT + ")"); return ten_; } },
  { id: "hh1", has: "Mỗi ý sau về ester và chất béo đúng hay sai?", right: (q) => {
    // ý a so nhiệt độ sôi của hai chất có cùng phân tử khối: kiểm tra phân tử khối ghi trong ý (ethyl acetate, pentan-1-ol)
    const [Me, Ma] = so(q.o[0], "Ethyl acetate (phân tử khối #) sôi ở nhiệt độ thấp hơn pentan-1-ol (phân tử khối #)");
    assert.ok(Me === KL("CH₃COOC₂H₅") && Ma === KL("C₅H₁₁OH"), "phân tử khối ghi trong ý a"); return [null, null, null, null]; } },
  { id: "hh1", has: "Đun nóng 15 g acetic acid với 14,8 g butan-1-ol", right: (q) => {
    const nt = ntDe(q), [ma, mb, me] = so(q.q, "Đun nóng # g acetic acid với # g butan-1-ol (xúc tác H₂SO₄ đặc), thu được # g butyl acetate"), pt = ptCua(q, "CH₃COOH", "CH₃COOC₄H₉");
    const ne = Math.min(molTheoPT(pt, "CH₃COOH", ma / KL("CH₃COOH", nt), "CH₃COOC₄H₉"), molTheoPT(pt, "C₄H₉OH", mb / KL("C₄H₉OH", nt), "CH₃COOC₄H₉"));
    coX(q, vn(ne * KL("CH₃COOC₄H₉", nt)) + " (g)"); return (me / (ne * KL("CH₃COOC₄H₉", nt))) * 100; } },
  { id: "hh1", has: "Cho 180 g dung dịch glucose 5%", right: (q) => {
    // mỗi nhóm aldehyde khử ion bạc của thuốc thử Tollens thành 2 nguyên tử Ag
    const nt = ntDe(q), [m, c] = so(q.q, "Cho # g dung dịch glucose #%"), [k] = so(q.x, "khử ion bạc thành # nguyên tử Ag"); assert.equal(k, 2);
    return ((k * (m * c)) / 100 / KL("C₆H₁₂O₆", nt)) * nt.Ag; } },
  { id: "hh1", has: "Một nhà máy sản xuất ethanol từ ngô hạt", essay: (q) => {
    const nt = ntDe(q), [pc] = so(q.q, "chứa #% tinh bột"), [H] = so(q.q, "hiệu suất của cả quá trình là #%"), [m] = so(q.q, "Từ # kg ngô hạt");
    const ptLM = ptCua(q, "C₆H₁₂O₆", "C₂H₅OH"), mTB = (m * pc) / 100, nX = (mTB * 1000) / KL("C₆H₁₀O₅", nt), nE = molTheoPT(ptLM, "C₆H₁₂O₆", nX, "C₂H₅OH") * (H / 100), nCO2 = molTheoPT(ptLM, "C₂H₅OH", nE, "CO₂");
    assert.ok(canBang("(C₆H₁₀O₅)ₙ + nH₂O → nC₆H₁₂O₆") && q.x.includes("(C₆H₁₀O₅)ₙ + nH₂O → nC₆H₁₂O₆"), "phương trình thuỷ phân tinh bột");
    const mE = (nE * KL("C₂H₅OH", nt)) / 1000, mC = (nCO2 * KL("CO₂", nt)) / 1000;
    coThang(q, vn(mTB) + " kg", vn(nX) + " (mol)", vn(nE) + " (mol) ethanol, tức " + vn(mE) + " kg", vn(mC) + " kg"); assert.equal(dapSo(q), "b) " + vn(mE) + " kg; c) " + vn(mC) + " kg."); } },
  { id: "hh1", has: "Để trung hoà vừa hết 50 g dung dịch methylamine", right: (q) => {
    const nt = ntDe(q), [m, c] = so(q.q, "vừa hết # g dung dịch methylamine #%"), [CM] = so(q.q, "dung dịch HCl # M"), pt = ptCua(q, "CH₃NH₂", "HCl");
    return (molTheoPT(pt, "CH₃NH₂", (m * c) / 100 / KL("CH₃NH₂", nt), "HCl") / CM) * 1000; } },
  { id: "hh1", has: "Cho 7,5 g glycine (H₂NCH₂COOH) vào", right: (q) => {
    const nt = ntDe(q), [m] = so(q.q, "Cho # g glycine"), [V, CM] = so(q.q, "vào # mL dung dịch HCl # M"), [CB] = so(q.q, "dung dịch NaOH # M");
    const nG = m / KL("H₂NCH₂COOH", nt), nH = (V / 1000) * CM, p1 = ptCua(q, "H₂NCH₂COOH", "ClH₃NCH₂COOH"), nM = molTheoPT(p1, "H₂NCH₂COOH", Math.min(nG, nH), "ClH₃NCH₂COOH");
    const p2 = ptCua(q, "ClH₃NCH₂COOH", "NaOH"), p3 = [...new Set(q.x.match(PT))].find((s) => /^HCl \+ NaOH →/.test(s));
    assert.ok(p3, "lời giải có phản ứng của HCl dư với NaOH"); const nB = molTheoPT(p2, "ClH₃NCH₂COOH", nM, "NaOH") + molTheoPT(p3, "HCl", nH - nM, "NaOH");
    return (nB / CB) * 1000; } },
  { id: "hh1", has: "Cho thế điện cực chuẩn: E°(Mg²⁺/Mg) = −2,356 V; E°(Ni²⁺/Ni)", right: (q) => {
    const E = e0De(q.q), [a, b, c, d] = q.o, ion = (s) => s.replace(/[²³⁺]/g, "");
    const ma = /^Trong ba ion (\S+), (\S+), (\S+), ion (\S+) có tính oxi hoá mạnh nhất\.$/.exec(a), kh = (s) => /^Kim loại (\w+) khử được ion (\w+)[²³]?⁺ trong dung dịch thành (\w+)\.$/.exec(s), md = /^Kim loại (\w+) tác dụng được với dung dịch acid \(ion H⁺\)/.exec(d);
    assert.ok(ma && kh(b) && kh(c) && md, "dạng các ý");
    const manh = [ma[1], ma[2], ma[3]].map(ion).reduce((x, y) => (E[y] > E[x] ? y : x)), viet = (m) => m[2] === m[3] && E[m[1]] < E[m[2]];
    return [ion(ma[4]) === manh, viet(kh(b)), viet(kh(c)), E[md[1]] < E0_SACH.H]; } },
  { id: "hh1", has: "Sau một thời gian pin hoạt động, khối lượng điện cực Ag tăng", right: (q) => {
    const nt = ntDe(q), E = e0De(q.q), [mAg] = so(q.q, "khối lượng điện cực Ag tăng # g"), an = Object.keys(E).reduce((x, y) => (E[y] < E[x] ? y : x));
    coX(q, an + " có thế điện cực chuẩn nhỏ hơn nên là anode"); const pt = ptCua(q, an, "Ag"); assert.ok(xayRa(pt, E), "phản ứng trong pin xảy ra");
    return molTheoPT(pt, "Ag", mAg / nt.Ag, an) * nt[an]; } },
  { id: "hh1", has: "Mắc nối tiếp các pin Galvani Pb – Ag giống nhau", right: (q) => {
    const E = e0De(q.q), [U] = so(q.q, "hiệu điện thế ít nhất # V"), e = E.Ag - E.Pb, N = Math.ceil(U / e - 1e-9);
    coX(q, "= " + vnf(e, 3) + " (V)", vn((N - 1) * e) + " (V)", vn(N * e) + " (V)"); return N; } },
  /* ----- Hoá học, Đề 2 ----- */
  { id: "hh2", has: "Một loại dầu thực vật chứa 88,4% triolein", essay: (q) => {
    const nt = ntDe(q), [pc] = so(q.q, "chứa #% triolein"), [mk] = so(q.q, "Đun # kg dầu này"), [px] = so(q.q, "sodium oleate chiếm #% khối lượng xà phòng bánh");
    const pt = ptCua(q, "(C₁₇H₃₃COO)₃C₃H₅", "C₁₇H₃₃COONa"), mT = (mk * 1000 * pc) / 100, nT = mT / KL("(C₁₇H₃₃COO)₃C₃H₅", nt);
    const mG = molTheoPT(pt, "(C₁₇H₃₃COO)₃C₃H₅", nT, "C₃H₅(OH)₃") * KL("C₃H₅(OH)₃", nt), mO = molTheoPT(pt, "(C₁₇H₃₃COO)₃C₃H₅", nT, "C₁₇H₃₃COONa") * KL("C₁₇H₃₃COONa", nt), mX = mO / (px / 100);
    coThang(q, vn(mT) + " g", vn(mG) + " (g)", vn(mO) + " (g)", vn(mX) + " (g)", vn(mX / 1000) + " kg"); assert.equal(dapSo(q), "b) " + vn(mG) + " g glycerol, " + vn(mO) + " g sodium oleate; c) " + vn(mX / 1000) + " kg."); } },
  { id: "hh2", has: "Nồng độ glucose trong máu của một người lúc đói là", right: (q) => {
    const nt = ntDe(q), [c] = so(q.q, "lúc đói là # mmol/L"), [V] = so(q.q, "có # lít máu"); return ((c * V) / 1000) * KL("C₆H₁₂O₆", nt); } },
  { id: "hh2", has: "Thuỷ phân hoàn toàn 34,2 g saccharose trong môi trường acid", right: (q) => {
    // saccharose + nước → một phân tử glucose và một phân tử fructose (cùng công thức C₆H₁₂O₆)
    const nt = ntDe(q), [m] = so(q.q, "Thuỷ phân hoàn toàn # g saccharose"), pt = [...new Set(q.x.match(PT))].find((s) => /^C₁₂H₂₂O₁₁ \+ H₂O → /.test(s));
    assert.ok(pt && tach(pt)[1].length === 2 && tach(pt)[1].every((v) => v.ten === "C₆H₁₂O₆" && v.k === 1), "phương trình thuỷ phân saccharose");
    return vn((m / KL("C₁₂H₂₂O₁₁", nt)) * KL("C₆H₁₂O₆", nt)) + " g"; } },
  { id: "hh2", has: "Thuỷ phân tinh bột có trong 1 kg gạo", right: (q) => {
    const nt = ntDe(q), [m, pc] = so(q.q, "có trong # kg gạo (chứa #% tinh bột"), [H] = so(q.q, "hiệu suất #%");
    assert.ok(canBang("(C₆H₁₀O₅)ₙ + nH₂O → nC₆H₁₂O₆") && q.x.includes("(C₆H₁₀O₅)ₙ + nH₂O → nC₆H₁₂O₆"));
    return ((m * 1000 * pc) / 100 / KL("C₆H₁₀O₅", nt)) * (H / 100) * KL("C₆H₁₂O₆", nt); } },
  { id: "hh2", has: "Khử 24,6 g nitrobenzene", right: (q) => {
    const nt = ntDe(q), [m] = so(q.q, "Khử # g nitrobenzene"), [H] = so(q.q, "hiệu suất #%"), pt = ptCua(q, "C₆H₅NO₂", "C₆H₅NH₂");
    return molTheoPT(pt, "C₆H₅NO₂", m / KL("C₆H₅NO₂", nt), "C₆H₅NH₂") * (H / 100) * KL("C₆H₅NH₂", nt); } },
  { id: "hh2", has: "Thuỷ phân hoàn toàn 20,3 g tripeptide Gly-Ala-Gly", right: (q) => {
    const nt = ntDe(q), [m] = so(q.q, "Thuỷ phân hoàn toàn # g tripeptide"), P = "H₂NCH₂CONHCH(CH₃)CONHCH₂COOH", G = "H₂NCH₂COOH", A = "H₂NCH(CH₃)COOH";
    assert.equal(KL(P, nt), 2 * KL(G, nt) + KL(A, nt) - 2 * KL("H₂O", nt), "công thức của Gly-Ala-Gly"); coX(q, "phân tử khối " + vn(KL(P, nt)));
    const pt = ptCua(q, P, "H₂NCH₂COONa"), n = m / KL(P, nt);
    return molTheoPT(pt, P, n, "H₂NCH₂COONa") * KL("H₂NCH₂COONa", nt) + molTheoPT(pt, P, n, "H₂NCH(CH₃)COONa") * KL("H₂NCH(CH₃)COONa", nt); } },
  { id: "hh2", has: "Ở điều kiện chuẩn, phản ứng nào sau đây xảy ra?", right: (q) => {
    const E = e0De(q.q), co = q.o.filter((o) => xayRa(o, E)); assert.equal(co.length, 1, "đúng một phản ứng xảy ra"); return co[0]; } },
  { id: "hh2", has: "Không dùng bảng thế điện cực chuẩn, hãy tính sức điện động chuẩn", right: (q) => {
    const [e1, e2] = so(q.q, "Mg²⁺/Mg và Ni²⁺/Ni có sức điện động # V; pin tạo bởi hai cặp Ni²⁺/Ni và Cu²⁺/Cu có sức điện động # V");
    assert.ok(gan(e1, E0_SACH.Ni - E0_SACH.Mg) && gan(e2, E0_SACH.Cu - E0_SACH.Ni), "số liệu của đề khớp bảng thế điện cực chuẩn của sách"); coX(q, "= " + vn(e1 + e2) + " V"); return e1 + e2; } },
  { id: "hh2", has: "Một pin nhiên liệu hydrogen – oxygen hoạt động theo phản ứng", right: (q) => {
    const nt = ntDe(q), [r] = so(q.q, "mỗi phút tiêu thụ # g khí hydrogen"), [h] = so(q.q, "Sau # giờ hoạt động"), pt = ptCua(q, "H₂", "H₂O");
    return (molTheoPT(pt, "H₂", (r * 60 * h) / KL("H₂", nt), "H₂O") * KL("H₂O", nt)) / 1000; } }
];

/* ---------- chạy kiểm tra ---------- */
let n = 0;
const daKiem = new Set(), lamTron = (x, k) => Math.round(x * 10 ** k + 1e-9 * Math.sign(x)) / 10 ** k;
CHECKS.forEach((c) => {
  const m = MON.find((x) => c.id.startsWith(x.ki)), cau = m.kho.filter((q) => q.q.includes(c.has));
  assert.equal(cau.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${cau.length}`);
  const q = cau[0], at = ten.get(q) + ": " + c.has;
  try {
    assert.equal(q.src, m.DE[+c.id.slice(2) - 1], "câu nằm ở đề " + q.src);
    if (q.type === "essay") {
      assert.ok(c.essay, "tự luận cần kiểm tra thang chấm"); c.essay(q);
      assert.ok(q.rubric.every((r) => r.p > 0 && Number.isInteger(r.p * 4)) && sum(q.rubric.map((r) => r.p)) === 2, "thang chấm 2 điểm, mỗi ý chia hết cho 0,25");
    } else {
      assert.ok(c.right, "câu chấm tự động cần right"); const want = c.right(q);
      if (q.type === "num") {
        // câu dặn làm tròn: ans là số đã làm tròn, tol bằng nửa đơn vị làm tròn; câu khác: đáp án chính xác, không tol
        const lt = /Làm tròn kết quả đến chữ số thập phân thứ (nhất|hai)\./.exec(q.q);
        if (lt) { const k = lt[1] === "nhất" ? 1 : 2; assert.ok(gan(q.ans, lamTron(want, k)) && q.tol === 10 ** -k / 2, "đáp án " + q.ans + " (tol " + q.tol + "), tính được " + want); }
        else { assert.ok(gan(q.ans, want), "đáp án " + q.ans + ", tính được " + want); assert.ok(q.tol === undefined, "đáp án chính xác, không cần sai số"); }
        assert.ok(Math.abs(q.ans * 100 - Math.round(q.ans * 100)) < 1e-9, "đáp án quá hai chữ số thập phân");
      } else if (q.type === "tf4") {
        assert.ok(Array.isArray(want) && want.length === 4, "câu đúng/sai 4 ý: right trả mảng 4 ý");
        want.forEach((w, i) => w === null || assert.strictEqual(q.a[i], w, "ý " + "abcd"[i] + ": đáp án " + q.a[i] + ", tính được " + w));
      } else {
        assert.strictEqual(q.o[0], want, "đáp án " + q.o[0] + ", tính được " + want); assert.ok(!q.o.slice(1).includes(want), "nhiễu trùng đáp án đúng");
      }
    }
  } catch (e) { throw new Error(at + ": " + e.message + "\n" + e.stack.split("\n").slice(1, 3).join("\n")); }
  daKiem.add(q); n++;
});
// câu trả lời bằng số, câu có hình, câu tự luận nào cũng phải được tính lại, đọc lại ở trên
MON.forEach((m) => m.kho.filter((q) => q.svg || q.type === "num" || q.type === "essay").forEach((q) => assert.ok(daKiem.has(q), "chưa có kiểm tra cho câu " + ten.get(q) + ": " + q.q.slice(0, 60))));
// bộ đọc bắt được hình, phương trình, số cố ý viết sai
{
  const hinh = (has) => MON.flatMap((m) => m.kho).find((q) => q.q.includes(has)).svg;
  const pV = hinh("áp suất p theo thể tích V"), VT = hinh("thể tích V theo nhiệt độ tuyệt đối T"), es = hinh("Công thức cấu tạo của một ester");
  assert.throws(() => dangNhiet(docDoThi(pV.replace(/(<polyline points=")([\d.]+),([\d.]+)/, (s, a, x, y) => a + x + "," + (+y + 6)), "thử"), "thử"), /pV không đổi/);
  assert.throws(() => docDoThi(pV.replace('<circle cx="106"', '<circle cx="109"'), "thử"), /nút lưới/);
  assert.throws(() => docDoThi(pV.replace(">300<", ">350<"), "thử"), /tỉ lệ/);
  assert.throws(() => quaGoc(docDoThi(VT.replace(/stroke-dasharray="5 4"\/>/, 'stroke-dasharray="5 4" x="1"/>').replace(/<line x1="([\d.]+)" y1="([\d.]+)" x2="([\d.]+)" y2="([\d.]+)" stroke="acc" stroke-width="2.5"\/>/, (s, a, b, c, d) => `<line x1="${a}" y1="${b}" x2="${c}" y2="${+d + 10}" stroke="acc" stroke-width="2.5"/>`), "thử"), "thử"), /qua gốc|nét đứt/);
  assert.throws(() => docCauTao(es.replace(/<line x1="156.5"[^>]*>/, ""), "thử"), /hoá trị/);
  assert.deepEqual(tenEster(docCauTao(es, "thử"), "thử"), ["methyl propanoate", "methyl propionate"]);
  assert.ok(canBang("C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂") && canBang("Ni + 2Ag⁺ → Ni²⁺ + 2Ag") && canBang("(C₆H₁₀O₅)ₙ + nH₂O → nC₆H₁₂O₆") && canBang("C₆H₅NO₂ + 6[H] → C₆H₅NH₂ + 2H₂O"));
  assert.ok(!canBang("Ni + Ag⁺ → Ni²⁺ + Ag") && !canBang("(C₆H₁₀O₅)ₙ + H₂O → nC₆H₁₂O₆") && !canBang("C₂H₅OH + 2O₂ → 2CO₂ + 3H₂O"));
  assert.equal(KL("(C₁₇H₃₃COO)₃C₃H₅"), 884); assert.equal(KL("H₂NCH₂CONHCH(CH₃)CONHCH₂COOH"), 203);
  assert.ok(xayRa("Zn + Cu²⁺ → Zn²⁺ + Cu", E0_SACH) && !xayRa("Cu + Zn²⁺ → Cu²⁺ + Zn", E0_SACH));
  assert.ok(khopSo("6,21 · 10⁻²¹", 6.21e-21) && khopSo("9,3 · 10⁻²¹", 9.315e-21) && !khopSo("4,76 · 10⁻²¹", 5.175e-21) && val("1 500") === 1500 && gan(val("3,34 · 10⁵"), 334000));
}

/* ---------- chữ ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.unit || [], (q.rubric || []).map((c) => c.c)).map(String);
MON.forEach((m) => m.kho.forEach((q) => {
  const at = ten.get(q) + ": " + q.q.slice(0, 50);
  chu(q).forEach((s) => {
    // số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân
    assert.ok(!/(?<![,\d])\d{4,}/.test(s) && !/\d\.\d/.test(s), at + ": số viết sai cách: " + s);
    // công thức, kí hiệu viết bằng chữ số dưới dòng (C₂H₅OH, p₁), không viết C2H5OH, p1
    assert.ok(!/(?:^|[^\p{L}])(?:[A-Z][a-z]?)+\d/u.test(s), at + ": công thức cần chữ số dưới dòng: " + s);
    // dấu thanh kiểu sách (hoá, thuỷ, toả, hoà); tên chất, thuật ngữ như sách
    assert.ok(!/(?<![\p{L}])(?:hóa|hòa|thủy|tỏa|hủy|tùy|khỏe|lũy)(?![\p{L}])/iu.test(s), at + ": dấu thanh kiểu mới: " + s);
    assert.ok(!/(?<![\p{L}])(?:axit|este|etyl|metyl|glucozơ|fructozơ|saccarozơ|mantozơ|xenlulozơ|polime|monome|amin|anilin|peptit|nilon|brom|hiđro|hidro|cacbon|nitơ|clo|natri|kali|oxy hoá|ắc quy|sucrose)(?![\p{L}])/iu.test(s), at + ": tên chất, thuật ngữ khác sách: " + s);
    // như sách: thang Kelvin, đơn vị kenvin (K)
    assert.ok(!/thang Kenvin|(?<![\p{L}])kelvin(?![\p{L}])/u.test(s), at + ": viết như sách: thang Kelvin, đơn vị kenvin: " + s);
    // đơn vị như sách: J/kg.K; độ C viết °C, cách số một khoảng trắng
    assert.ok(!/J\/\(kg|J\/kgK|\d°C|\d ?oC\b/.test(s), at + ": đơn vị viết khác sách: " + s);
  });
  if (q.type === "num" && q.unit) assert.ok(q.unit.length <= 4, at + ": đơn vị ngắn");
}));
// mọi phương trình hoá học trong câu Hoá học cân bằng; mũi tên trong câu Hoá học chỉ dùng trong phương trình
let soPT = 0;
HH.kho.forEach((q) => chu(q).forEach((s) => {
  (s.match(PT) || []).forEach((pt) => { assert.ok(canBang(pt), ten.get(q) + ": phương trình chưa cân bằng: " + pt); soPT++; });
  assert.ok(!/→|⇌/.test(s.replace(PT, "")), ten.get(q) + ": mũi tên ngoài phương trình: " + s);
}));
assert.ok(soPT > 0, "có phương trình hoá học");
// E° ghi trong mọi câu Hoá học đúng bảng của sách (e0De tự kiểm tra)
HH.kho.forEach((q) => chu(q).forEach((s) => e0De(s)));

/* ---------- lời dặn, mức độ, ma trận ---------- */
const SO = "Từ năm học 2026–2027 Sở GD&ĐT ra đề chung cuối kì một số môn lớp 12; xem thông báo của Sở về môn và cấu trúc đề.";
const BOOK = path.join(__dirname, "../../OnUp-Book");
MON.forEach((m) => {
  const M = m.M, cells = Object.values(M), CHU_DE = m.BAI.map((b) => b[0]), soBai = Object.fromEntries(m.BAI);
  assert.ok(m.kho.every((q) => [1, 2, 3].includes(q.lv)), m.ma + ": câu nào cũng cần lv");
  assert.ok(cells.every(Array.isArray), m.ma + ": ma trận ghi theo [Biết, Hiểu, Vận dụng]");
  assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], m.ma + ": ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
  assert.equal(sum(cells.map(sum)), m.pool.n, m.ma + ": tổng ma trận bằng n");
  assert.deepEqual(Object.keys(M), CHU_DE, m.ma + ": chủ đề theo tên bài, thứ tự bài của sách");
  CHU_DE.forEach((t) => assert.ok(("chu-de:12:" + m.ma + ":" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
  m.DE.forEach((id) => {
    const qs = m.kho.filter((q) => q.src === id);
    assert.deepEqual([...new Set(qs.map((q) => q.topic))], CHU_DE, id + ": đủ chủ đề, đúng thứ tự");
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => qs.filter((q) => q.topic === t && q.lv === l).length), v, id + " đúng ma trận ở chủ đề " + t));
    // lời dặn: phạm vi, số câu mỗi phần (tính từ ma trận), bài học tiếp theo, câu về đề chung của Sở
    const note = bank(id).note;
    m.PHAN.forEach(([p, tu, den]) => { const k = sum(CHU_DE.filter((t) => soBai[t] >= tu && soBai[t] <= den).map((t) => sum(M[t]))); assert.ok(note.includes(p + " " + k + " câu"), id + ": lời dặn ghi “" + p + " " + k + " câu”"); });
    assert.equal(sum(m.PHAN.map(([, tu, den]) => sum(CHU_DE.filter((t) => soBai[t] >= tu && soBai[t] <= den).map((t) => sum(M[t]))))), m.pool.n, m.ma + ": các phần của lời dặn phủ hết ma trận");
    assert.ok(note.includes(m.sau) && note.endsWith(SO), id + ": lời dặn nhắc bài học tiếp theo và đề chung của Sở");
  });
  // chủ đề đúng tên bài trong mục lục (README của cuốn ở OnUp-Book)
  const readme = path.join(BOOK, "lop-12", m.sach, "README.md");
  if (fs.existsSync(readme)) {
    const ml = Object.fromEntries([...fs.readFileSync(readme, "utf8").matchAll(/Bài (\d+)\. ([^|]+?) \|/g)].map((x) => [+x[1], x[2].trim()]));
    m.BAI.forEach(([t, b]) => assert.equal(m.RUT_GON[t] || t, ml[b], m.ma + ": tên Bài " + b + " theo mục lục"));
  }
  // dạng câu theo khung Công văn 7991: nhiều lựa chọn, đúng/sai 4 ý, trả lời ngắn (số), tự luận tự chấm
  assert.ok(m.kho.every((q) => ["mc", "tf4", "num", "essay"].includes(q.type)), m.ma + ": dạng câu");
  const dem = (f) => m.kho.filter(f).length;
  assert.ok(dem((q) => q.type === "num") >= 4, m.ma + ": ít nhất 4 câu trả lời bằng số");
  assert.ok(dem((q) => q.type === "essay") >= 1 && dem((q) => q.type === "essay") <= 2, m.ma + ": 1–2 câu tự luận");
  m.DE.forEach((id) => { const qs = m.kho.filter((q) => q.src === id); assert.ok(qs.filter((q) => q.type === "tf4").length >= 3 && qs.filter((q) => q.type === "num").length >= 4 && qs.filter((q) => q.type === "essay").length <= 1, id + ": đủ đúng/sai 4 ý, trả lời ngắn, nhiều nhất một câu tự luận"); });
  const tf4 = m.kho.filter((q) => q.type === "tf4"), kieu = {};
  assert.ok(tf4.length >= 6, m.ma + ": ít nhất 6 câu đúng/sai 4 ý");
  tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(q.o.length === 4 && /Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
  assert.equal(Math.max(...Object.values(kieu)), 1, m.ma + ": kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
  // câu tự luận chỉ ở ô Vận dụng rút 1 câu, ô đó còn câu khác dạng: mỗi lần rút nhiều nhất 2 câu tự luận
  const oTL = [...new Set(m.kho.filter((q) => q.type === "essay").map((q) => q.topic + "|" + q.lv))];
  assert.ok(oTL.every((k) => { const [t, lv] = k.split("|"); return +lv === 3 && M[t][2] === 1 && m.kho.some((q) => q.topic === t && q.lv === 3 && q.type !== "essay"); }), m.ma + ": câu tự luận ở ô " + oTL);
  m.kho.filter((q) => q.type === "essay").forEach((q) => assert.ok(/^Trình bày lời giải\./.test(q.q), "câu tự luận mở đầu bằng lời dặn"));
  // lời giải không nói “ý thứ hai”, “phương án A”: app xáo phương án
  m.kho.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của phương án: " + q.q.slice(0, 50)));
  // câu nhiều lựa chọn: đáp án đúng không dài hơn hẳn lựa chọn sai, các lựa chọn không trùng nhau, đáp án đúng không là lựa chọn duy nhất có
  // chữ của nhãn chủ đề, ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có
  const chuThuong = (s) => String(s).normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean), mc = m.kho.filter((q) => q.type === "mc");
  mc.forEach((q) => {
    const L = Math.max(...q.o.slice(1).map((o) => o.length));
    assert.ok(q.o.length === 4 && q.o[0].length <= Math.max(1.2 * L, L + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + q.q.slice(0, 50));
    assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + q.q.slice(0, 50));
    const c = chuThuong(q.topic), tu = c.length === 1 ? c : c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số)( |$)/u.test(w));
    tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); assert.ok(!(co[0] && !co.slice(1).some(Boolean)), `chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề: ${q.q.slice(0, 60)}`); });
    const dau = q.o.map((o) => o.split(" ")[0]);
    assert.ok(!(dau.slice(1).every((d) => d === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1), "ba lựa chọn sai cùng mở đầu bằng “" + dau[1] + "”: " + q.q.slice(0, 50));
  });
  // đáp án đúng là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn
  const le = mc.filter((q) => { const L = q.o.map((o) => o.length); return L[0] > Math.max(...L.slice(1)) || L[0] < Math.min(...L.slice(1)); });
  assert.ok(le.length * 3 <= mc.length, `${m.ma}: đáp án đúng dài nhất hoặc ngắn nhất ở ${le.length}/${mc.length} câu`);
  m.le = le.length + "/" + mc.length;

  /* ---------- rút thử ---------- */
  const thu = (hist) => {
    const d = Quiz.draw(m.pool, hist);
    assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
    assert.equal(d.questions.length, m.pool.n);
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.topic === t && q.lv === l).length), v, "rút đúng ma trận ở chủ đề " + t));
    assert.ok(d.questions.filter((q) => q.type === "essay").length <= 2);
    return d;
  };
  const seen = new Set();
  for (let k = 0; k < 300; k++) thu().questions.forEach((q) => seen.add(Quiz.key(q)));
  assert.equal(seen.size, m.kho.length, m.ma + ": 300 lần rút thử phải gặp đủ các câu của kho");
  m.DE.forEach((id) => { const done = new Set(m.kho.filter((q) => q.src === id).map(Quiz.key)); for (let k = 0; k < 20; k++) thu((q) => ({ done: done.has(Quiz.key(q)) ? 1 : 0, wrong: 0 })).questions.forEach((q) => assert.ok(!done.has(Quiz.key(q)), "đã làm hết " + id + " mà vẫn gặp lại câu của đề đó")); });
  // đề bài không trùng câu nào khác trong file (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng
  const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ""), deBai = m.kho.map((q) => ({ at: ten.get(q), k: goc(q.q) }));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
});

/* ---------- dò lộ đáp án giữa hai câu rút được cùng lúc ----------
   Đề ngẫu nhiên rút một câu mỗi ô (ô Biết của Mô hình động học phân tử chất khí, ô Vận dụng của Thế điện cực rút 2), đề “Ôn chủ đề” rút
   chung mọi câu của một chủ đề (trừ tự luận), nên xét mọi cặp câu cùng môn, trừ cặp có câu tự luận nằm cùng một ô rút 1 câu. Đáp án là
   số (trả lời ngắn, lựa chọn đúng dạng “835 kJ”; từ hai chữ số, hoặc số thập phân, hoặc có luỹ thừa của 10) tìm ở vị trí kết quả của câu
   kia (ngay sau “=”, “≈”, “là”, “bằng”, “được”; không tính số đứng trước một phép tính) cùng đơn vị: không được có. Đáp án bằng chữ tách thành các chuỗi 3 từ liền nhau
   (đáp án từ 3 từ trở xuống thì lấy cả đáp án); chuỗi có trong đề bài, lựa chọn, lời giải của câu kia thì in ra với DO_LO=1 để xem tay,
   danh sách đã xem ở DA_XEM. */
const DON_VI = "(?:J\\/kg\\.K|J\\/kg|J\\/K|kJ|J|kPa|Pa|atm|°C|K|mL|L|lít|cm³|cm|mol|kg|g|%|phút|s|V|W|quả|pin)";
const soDV = new RegExp("^(" + NUM + ")(?: ?\\(?(" + DON_VI + ")\\)?)?$", "u");
// số đứng trước dấu nhân, cộng, trừ, chia là thừa số, số hạng của phép tính, không phải kết quả
const KQ = new RegExp("(?:=|≈|(?:^|[\\s(])(?:là|bằng|được))\\s+(" + NUM + ")(?![\\d,])(?!\\s*[·+−:×](?:\\s|\\d|\\())(?: ?\\(?(" + DON_VI + ")(?![\\p{L}]))?", "gu");
const kqSo = (s) => [...String(s).matchAll(KQ)].map((x) => ({ v: val(x[1]), u: x[2] || "" }));
const tuCua = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum3 = (s) => { const w = tuCua(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
// chuỗi 3 từ chung của môn (thuật ngữ, cách nói của bài học) không làm lộ đáp án nào: bỏ qua khi là một phần của đáp án dài hơn
const CUM_CHUNG = new Set(["phân tử khí", "của phân tử", "các phân tử", "giữa các phân", "tử khí và", "tử khí chuyển", "khí chuyển động", "chuyển động hỗn",
  "động hỗn loạn", "chuyển động nhanh", "va chạm vào", "nội năng của", "nên nội năng", "thể tích của", "số mol khí", "trung bình của", "ở nhiệt độ", "nhiệt độ cao",
  "tan trong nước", "dễ tan trong", "là chất lỏng", "là chất rắn", "của chất lỏng", "có liên kết", "lực liên kết", "liên kết giữa"]);
const doLo = (qs, M, tenCau) => {
  const lo = [], chuLo = [], cungLuc = (p, q) => p !== q && (p.topic !== q.topic || (p.type !== "essay" && q.type !== "essay") || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2);
  qs.forEach((q) => {
    let soDa = [], C = [];
    if (q.type === "num") soDa = [{ v: q.ans, u: q.unit || "" }];
    else if (q.type === "mc") { const x = soDV.exec(q.o[0]); if (x) soDa = [{ v: val(x[1]), u: x[2] || "" }]; else { const c3 = cum3(q.o[0]); C = [...new Set(c3.length > 1 ? c3.filter((c) => !CUM_CHUNG.has(c)) : c3)]; } }
    soDa = soDa.filter((d) => Math.abs(d.v) >= 10 || !Number.isInteger(d.v));
    qs.forEach((p) => {
      if (!cungLuc(p, q)) return;
      const at = `${tenCau(p)} → ${tenCau(q)}: `, T = " " + chu(p).map((s) => tuCua(s).join(" ")).join(" | ") + " ";
      soDa.filter((d) => chu(p).flatMap(kqSo).some((y) => gan(y.v, d.v) && (!y.u || !d.u || y.u === d.u || (y.u + d.u).replace("lít", "L") === "LL"))).forEach((d) => lo.push(at + vn(d.v) + " " + d.u));
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
const lo = [], chuLo = [];
MON.forEach((m) => { const r = doLo(m.kho, m.M, (q) => ten.get(q)); lo.push(...r.lo); chuLo.push(...r.chuLo); });
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuLo.join("\n"));
// đã xem (Phiên N12-ck1-vatli-hoahoc): chữ chung, câu kia không nói tới điều câu này hỏi. “thể rắn”: lời giải câu đẳng áp (sự chuyển thể là
// thay đổi thể rắn, lỏng, khí), câu so thể khí với thể lỏng, thể rắn không tả cách sắp xếp, dao động của phân tử ở thể rắn; “liên kết hydrogen”: câu kia so ester với alcohol, không nói về
// amine; “tăng mạch”, “giữ nguyên mạch”: hai câu phân loại phản ứng của polymer có cùng bốn lựa chọn, lời giải câu này không nói phản
// ứng của câu kia thuộc loại nào; “trung hoà về điện”: lựa chọn sai của câu điện di glycine (câu này hỏi tác dụng của cầu muối); “gốc acid
// béo”: câu kia nói dầu ăn bị ôi do gốc không no bị oxi hoá, không so mỡ bò với dầu; “aniline”: câu kia không nói dung dịch aniline có đổi
// màu quỳ tím hay không; “gly ala”: tripeptide Gly-Ala-Gly của câu tính khối lượng muối, không nói phản ứng màu biuret.
const DA_XEM = ["vl1#18 → vl1#1: thể rắn", "vl2#13 → vl1#1: thể rắn", "hh1#2 → hh1#11: liên kết hydrogen", "hh2#19 → hh1#19: phản ứng tăng",
  "hh2#19 → hh1#19: ứng tăng mạch", "hh2#19 → hh1#19: tăng mạch polymer", "hh1#14 → hh1#22: trung hoà về", "hh1#14 → hh1#22: hoà về điện",
  "hh1#2 → hh2#2: gốc acid béo", "hh2#11 → hh2#10: aniline", "hh2#12 → hh2#10: aniline", "hh2#15 → hh2#14: gly ala", "hh1#19 → hh2#19: phản ứng giữ",
  "hh1#19 → hh2#19: ứng giữ nguyên", "hh1#19 → hh2#19: giữ nguyên mạch", "hh1#19 → hh2#19: nguyên mạch polymer"];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 540 J”, “là 10,8 g”, cụm của đáp án bằng chữ
{
  const tim = (has) => MON.flatMap((m) => m.kho).find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thuLo = (qs) => { const r = doLo(qs, Object.assign({}, VL.M, HH.M), (q) => q.q.slice(0, 12)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  const khac = tim("Dụng cụ nào sau đây dùng để đo áp suất"), khacH = tim("Thực phẩm nào sau đây chứa nhiều fructose nhất?");
  assert.deepEqual(thuLo([tim("Một viên đạn chì khối lượng"), gia(khac, "Ví dụ ΔU = 540 J.")]), ["540 J"]);
  assert.deepEqual(thuLo([tim("Một viên đạn chì khối lượng"), gia(khac, "Ví dụ ΔU = 540 kPa.")]), []);
  assert.deepEqual(thuLo([tim("Cho 180 g dung dịch glucose 5%"), gia(khacH, "Lượng bạc là 10,8 g.")]), ["10,8 g"]);
  assert.deepEqual(thuLo([tim("Phân tử cellulose được cấu tạo từ"), gia(khacH, "Cellulose có các đơn vị β-glucose.")]), ["các đơn vị", "đơn vị β", "vị β glucose"]);
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ----------
   Cụm từ chung của môn (tên bài, cách nói chuẩn khi cho số liệu, hằng số của sách) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít
   nhất 5 từ có chữ. */
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const TU_CHUNG = [...VL.BAI, ...HH.BAI].map((b) => b[0]).concat(Object.values(VL.RUT_GON), ["mỗi ý sau đúng hay sai", "làm tròn kết quả đến chữ số thập phân thứ hai",
  "nhiệt dung riêng của nước là", "nhiệt nóng chảy riêng của nước đá là", "nhiệt hoá hơi riêng của nước ở 100 °C là", "bỏ qua sự trao đổi nhiệt với", "ở áp suất tiêu chuẩn",
  "động năng tịnh tiến trung bình của phân tử khí", "cho thế điện cực chuẩn", "ở điều kiện chuẩn", "viết phương trình hoá học của phản ứng"])
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const tatCa = MON.flatMap((m) => m.kho);
if (SACH.length) {
  MON.forEach((m) => assert.ok(SACH.some((f) => f.includes(m.sach)), "OnUp-Book có " + m.sach));
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => tatCa.flatMap((q) => chu(q).flatMap((s) => chuoi(s, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách và mục lục.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả câu riêng của các đề ngẫu nhiên ---------- */
{
  const cua = (b, q) => ({ id: b.id, s: " " + chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " });
  const khac = BANKS.filter((b) => !b.pool && !MON.some((m) => m.file === b.file)).flatMap((b) => b.questions.map((q) => cua(b, q)))
    .concat(BANKS.filter((b) => b.pool && !MON.some((m) => m.file === b.file)).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cua(b, q))));
  const bao = (k) => tatCa.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
MON.forEach((m) => console.log(`${m.ten} 12: kho ${m.kho.length} câu (${m.DE.length} đề cố định, ${m.pool.n} câu mỗi đề), ma trận 10 – 8 – 7 trên ${Object.keys(m.M).length} chủ đề; ` +
  `${m.kho.filter((q) => q.type === "tf4").length} câu đúng/sai 4 ý, ${m.kho.filter((q) => q.type === "num").length} câu trả lời ngắn, ${m.kho.filter((q) => q.type === "essay").length} câu tự luận; đáp án đúng dài nhất hoặc ngắn nhất ở ${m.le} câu nhiều lựa chọn.`));
console.log(n + " câu đã tính lại hoặc đọc lại hình (" + soPT + " phương trình hoá học cân bằng).");
console.log("MATH OK");
