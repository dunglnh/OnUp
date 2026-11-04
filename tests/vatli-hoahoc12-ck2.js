// Kiểm tra ngân hàng Vật lí 12 và Hoá học 12 cuối năm của Phiên N12-ck2-vatli-hoahoc (data/banks/12-vatli.js, data/banks/12-hoahoc.js:
// mỗi môn hai đề cố định và đề ngẫu nhiên lấy câu của hai đề đó, không có câu riêng), theo mẫu tests/vatli-hoahoc12-gk2.js. Số đề, số câu
// lấy từ danh mục (không ghi cứng).
// Câu có phép tính hoặc có hình nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong kho, đúng đề ghi ở id); số liệu đọc từ chữ của
// đề, đáp án tính bằng code (so với ans, o[0] hoặc các ý tính được của câu đúng/sai 4 ý; câu tự luận so với thang chấm và đáp số).
// Vật lí: ôn Bài 14–19 (lực từ F = BILsinα, cả dây gấp khúc; từ thông Φ = BScosα; suất điện động cảm ứng |e| = N · |ΔΦ|/Δt; giá trị hiệu
// dụng, giá trị tức thời của điện áp xoay chiều; chiều lực từ bằng tích có hướng theo các hướng Đông, Tây, Nam, Bắc), trọng tâm Bài 21–24:
// kí hiệu hạt nhân (số proton đúng nguyên tố, số khối), phản ứng hạt nhân bảo toàn số khối và điện tích (cả hạt X chưa biết), bán kính hạt
// nhân R = 1,2 · 10⁻¹⁵ · ∛A, khối lượng riêng của chất hạt nhân, độ hụt khối, năng lượng liên kết, năng lượng liên kết riêng, năng lượng toả
// ra của phản ứng, năng lượng nghỉ E₀ = m₀c², định luật phóng xạ (số hạt nhân còn lại, đã phân rã, độ phóng xạ sau một số chu kì; hằng số
// phóng xạ, H = λN), hệ số nhân neutron, khối lượng ²³⁵U phân hạch theo công suất; đồ thị số hạt nhân chưa phân rã theo thời gian đọc lại
// trên lưới (như tests/vatli-hoahoc12-gk2.js: gốc O, lưới đều, số ở trục đúng vạch, tên trục) rồi tính chu kì bán rã, kiểm tra đường biểu
// diễn là đường giảm theo hàm mũ.
// Hoá học: ôn Bài 18–22, 24 và Bài 25, 27–29: tính theo phương trình hoá học (nguyên tử khối đề cho, đúng bảng; hệ số đọc từ phương trình
// trong đề hoặc lời giải; thể tích mol khí 24,79 L/mol): khử hỗn hợp oxide, thu hồi đồng, làm mềm nước cứng, dolomite, nhiệt phân, chuẩn độ
// FeSO₄ bằng KMnO₄, tạo phức chất; số oxi hoá trong hợp chất; cấu hình electron của kim loại chuyển tiếp dãy thứ nhất (bảng theo sách) và
// của ion (nhường electron 4s trước); phức chất: nguyên tử trung tâm, điện tích, số lượng phối tử, dạng hình học theo số phối tử (Bảng 28.1),
// phản ứng thế phối tử; xu hướng của nhóm IIA, độ tan của muối, màu kết tủa theo bảng ghi ở đây (như sách). Mọi phương trình hoá học trong
// câu Hoá học cân bằng cả nguyên tố và điện tích (cả phương trình tạo phức chất, thế phối tử, phản ứng chuẩn độ, bán phản ứng có electron).
// Câu trả lời bằng số, câu có hình, câu tự luận nào cũng phải có kiểm tra ở đây.
// Rồi: chữ (như tests/vatli-hoahoc12-gk2.js; năm viết liền; mũi tên trong câu Vật lí chỉ ở phương trình phản ứng hạt nhân), lời dặn của đề
// (phạm vi, số câu mỗi phần theo ma trận, trường học khác phạm vi, câu về đề chung của Sở), môn, lịch thi và phạm vi của ck2-l12, mức độ và
// ma trận 10 – 8 – 7 (chủ đề theo tên bài và thứ tự của sách, đối chiếu mục lục trong README của cuốn ở OnUp-Book; bài tập, ôn tập không có
// chủ đề riêng; hai đề cố định chia đúng ma trận; phần trọng tâm nhiều câu hơn phần ôn), dạng câu theo khung Công văn 7991, đáp án đúng không
// dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba và không dưới một phần sáu số câu nhiều lựa chọn,
// không là lựa chọn duy nhất có chữ của nhãn chủ đề, rút thử nhiều lần, đề bài không trùng câu khác trong file. So với kho giữa kì II cùng
// môn: chủ đề ôn đúng chữ chủ đề của kho đó, chủ đề mới không trùng chủ đề của kho giữa kì II, cuối kì I; câu ôn không trùng đề bài, chuỗi 6
// từ của đề bài, đáp án câu cùng chủ đề của kho đó. So với kho cuối kì I, giữa kì II cùng môn: đề bài không gần trùng (cặp hai âm tiết
// chung); đề bài không có chuỗi 6 từ nào trùng câu của kho cuối kì I. Dò lộ đáp án giữa mọi cặp câu rút được cùng lúc và với lời dặn (đã xem
// ghi ở DA_XEM), giữa câu cùng chủ đề của kho này và kho giữa kì II (đề “Ôn chủ đề” rút chung; đã xem ghi ở DA_XEM_CHU_DE). Có sách ở
// ../OnUp-Book thì so mọi trường chữ với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp nguyên âm (không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi
// 6 từ) và với câu của mọi kho khác, cả kho cuối kì I, giữa kì II và câu riêng của các đề ngẫu nhiên (không chuỗi 8 từ nào trùng; DO_KHO=1
// in chuỗi 6 từ).
// Chạy: node tests/vatli-hoahoc12-ck2.js → in MATH OK.
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
   PHAN: các phần của lời dặn (số câu mỗi phần tính từ ma trận); BAI: chủ đề theo tên bài của sách; ON: các bài ôn (chủ đề đúng chữ kho giữa
   kì II); TAM: các bài trọng tâm; KHONG: bài tập, ôn tập trong phạm vi (không có chủ đề riêng); PHAM_VI: phạm vi của môn ghi ở ck2-l12;
   SAU: câu lời dặn nhắc trường học khác phạm vi. */
const SO = "Từ năm học 2026–2027 Sở GD&ĐT ra đề chung cuối kì một số môn lớp 12; xem thông báo của Sở về môn và cấu trúc đề.";
const MON = [
  { ma: "vatli", ten: "Vật lí", sach: "vat-li-12", ki: "vl",
    PHAN: [["Bài 14–19 (ôn từ trường, cảm ứng điện từ)", 14, 19], ["Bài 21–24 (cấu trúc hạt nhân, phản ứng hạt nhân, phóng xạ, công nghiệp hạt nhân)", 21, 24]],
    DAU: "Phạm vi cuối năm học: Chương III Từ trường (Bài 14–20) và Chương IV Vật lí hạt nhân (Bài 21–25), trọng tâm Chương IV.",
    PHAM_VI: "Vật lí: Bài 14–25 (từ trường, vật lí hạt nhân), trọng tâm Bài 21–24.",
    SAU: ["Trường chỉ kiểm tra Chương IV thì bỏ qua các câu Bài 14–19", "trường kiểm tra cả học kì I thì phụ huynh đối chiếu với đề cương của trường"],
    TU: 14, DEN: 25, ON: [14, 19], TAM: [21, 24], KHONG: [20, 25],
    BAI: [["Từ trường", 14], ["Lực từ tác dụng lên dây dẫn mang dòng điện. Cảm ứng từ", 15], ["Từ thông. Hiện tượng cảm ứng điện từ", 16],
      ["Máy phát điện xoay chiều", 17], ["Ứng dụng hiện tượng cảm ứng điện từ", 18], ["Điện từ trường. Mô hình sóng điện từ", 19],
      ["Cấu trúc hạt nhân", 21], ["Phản ứng hạt nhân và năng lượng liên kết", 22], ["Hiện tượng phóng xạ", 23], ["Công nghiệp hạt nhân", 24]] },
  { ma: "hoahoc", ten: "Hóa học", sach: "hoa-hoc-12", ki: "hh",
    PHAN: [["Chương 6 Đại cương về kim loại (Bài 18–22) và Bài 24 Nguyên tố nhóm IA (ôn)", 18, 24], ["Bài 25 Nguyên tố nhóm IIA", 25, 25],
      ["Chương 8 Sơ lược về dãy kim loại chuyển tiếp thứ nhất và phức chất (Bài 27–29)", 27, 29]],
    DAU: "Phạm vi cuối năm học: Chương 6–8 (Bài 18–30), trọng tâm Chương 8.",
    PHAM_VI: "Hóa học: Chương 6–8 (Bài 18–30), trọng tâm Bài 27–29.",
    SAU: ["Trường kiểm tra cả Bài 15–16 (pin điện, điện phân) thì ôn thêm các đề giữa kì II và phụ huynh đối chiếu với đề cương của trường"],
    TU: 18, DEN: 30, ON: [18, 24], TAM: [27, 29], KHONG: [23, 26, 30],
    BAI: [["Cấu tạo và liên kết trong tinh thể kim loại", 18], ["Tính chất vật lí và tính chất hoá học của kim loại", 19],
      ["Kim loại trong tự nhiên và phương pháp tách kim loại", 20], ["Hợp kim", 21], ["Sự ăn mòn kim loại", 22], ["Nguyên tố nhóm IA", 24],
      ["Nguyên tố nhóm IIA", 25], ["Đại cương về kim loại chuyển tiếp dãy thứ nhất", 27], ["Sơ lược về phức chất", 28],
      ["Một số tính chất và ứng dụng của phức chất", 29]] }
];
const ten = new Map();
MON.forEach((m) => {
  const pool = BANKS.find((b) => b.pool && b.id === m.ma + "12-ck2-ngau-nhien");
  assert.ok(pool, "thiếu đề ngẫu nhiên " + m.ma + "12-ck2-ngau-nhien");
  m.pool = pool; m.DE = pool.pool.from; m.M = pool.pool.matrix; m.kho = pool.questions; m.file = pool.file;
  assert.equal(m.file, "12-" + m.ma + ".js", "file câu hỏi theo mã môn");
  assert.equal(m.DE.length, 2, m.ma + ": đề ngẫu nhiên lấy câu của hai đề cố định");
  assert.deepEqual(BANKS.filter((b) => b.id.startsWith(m.ma + "12-ck2-")).map((b) => b.id).sort(), [...m.DE, pool.id].sort(), m.ma + ": kho gồm hai đề cố định và đề ngẫu nhiên");
  assert.equal(m.kho.filter((q) => q.src === pool.id).length, 0, m.ma + ": đề ngẫu nhiên không có câu riêng");
  assert.ok(pool.title === m.ten + " 12 · Cuối năm · Đề ngẫu nhiên" && pool.grade === 12 && pool.subject === m.ten && pool.minutes === 45, m.ma + ": tên, khối, môn, số phút của đề ngẫu nhiên");
  m.DE.forEach((id, k) => {
    const b = bank(id);
    assert.ok(b.file === m.file && b.subject === m.ten && b.grade === 12 && b.minutes === pool.minutes && b.n === pool.n, id + ": cùng file, môn, khối, số phút, số câu với đề ngẫu nhiên");
    assert.equal(b.title, m.ten + " 12 · Cuối năm · Đề " + (k + 1), id + ": tên đề");
    assert.equal(b.questions.length, b.n, id + ": số câu bằng n của danh mục");
    m.kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, m.ki + (k + 1) + "#" + (i + 1)));
  });
  assert.equal(m.kho.length, sum(m.DE.map((id) => bank(id).n)), m.ma + ": kho = câu của hai đề cố định");
  // kho giữa kì II (câu ôn: cùng chủ đề) và cuối kì I cùng môn (để so: đề bài không gần trùng)
  ["gk2", "ck1"].forEach((k) => {
    const p = BANKS.find((b) => b.pool && b.id === m.ma + "12-" + k + "-ngau-nhien");
    assert.ok(p && p.file === m.file, m.ma + ": có kho " + k + " cùng file");
    m[k] = p.questions; m[k + "M"] = p.pool.matrix;
    p.questions.forEach((q) => { const i = p.pool.from.indexOf(q.src), b = bank(q.src); ten.set(q, k + "-" + m.ki + (i < 0 ? "r" : i + 1) + "#" + (b.questions.findIndex((x) => x.q === q.q) + 1)); });
  });
  m.CHU_DE = m.BAI.map((b) => b[0]);
  m.ON_T = m.BAI.filter((b) => b[1] >= m.ON[0] && b[1] <= m.ON[1]).map((b) => b[0]);
});
const [VL, HH] = MON;
// môn đúng chữ của lịch thi (MON_THPT), sáu mã đề gắn vào kì thi cuối năm lớp 12, phạm vi của kì thi ghi đúng số bài
{
  const lich = fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8");
  const mon = /const MON_THPT = \[([^\]]*)\]/.exec(lich);
  MON.forEach((m) => assert.ok(mon && mon[1].includes('"' + m.ten + '"'), "môn " + m.ten + " có trong MON_THPT"));
  const c = vm.createContext({ window: {} }); vm.runInContext(lich, c);
  const ev = c.window.ONTAP_SEED_EVENTS.find((e) => e.id === "ck2-l12");
  assert.ok(ev && ev.grades.includes(12) && ev.subjects.includes("Vật lí") && ev.subjects.includes("Hóa học"), "có kì thi ck2-l12 với hai môn");
  MON.forEach((m) => {
    [...m.DE, m.pool.id].forEach((id) => assert.ok(ev.banks.includes(id), id + " gắn vào ck2-l12"));
    assert.ok(ev.scope.includes(m.PHAM_VI), "phạm vi của ck2-l12 ghi “" + m.PHAM_VI + "”");
  });
}

/* ---------- số ----------
   Số trong đề: hàng nghìn ngăn bằng khoảng trắng, dấu phẩy thập phân, luỹ thừa của 10 viết “3 · 10⁸”. */
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
const gan = (a, b, e = 1e-9) => a === b || Math.abs(a - b) <= e * Math.max(Math.abs(a), Math.abs(b));
// số viết kiểu Việt Nam: 7500 → "7 500", 0.15 → "0,15"; vnf giữ đủ d chữ số thập phân (4 → "4,0"); sci: 1.8e14 → "1,8 · 10¹⁴"
const vn = (x, d = 6) => { const r = Math.round(x * 10 ** d) / 10 ** d, [a, b] = String(Math.abs(r)).split("."); return (r < 0 ? "−" : "") + a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); };
const vnf = (x, d) => { const [a, b] = Math.abs(x).toFixed(d).split("."); return (x < 0 ? "−" : "") + a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); };
const supN = (k) => [...String(k)].map((c) => (c === "-" ? "⁻" : SUP[+c])).join("");
const supV = (s) => +[...s].map((c) => SUP.indexOf(c)).join(""), subV = (s) => +[...s].map((c) => SUB.indexOf(c)).join("");
const sci = (x, d) => { let e = Math.floor(Math.log10(Math.abs(x))), m = x / 10 ** e; if (Math.abs(+m.toFixed(d)) >= 10) { m /= 10; e++; } return vnf(m, d) + " · 10" + supN(e); };
const coX = (q, ...cum) => cum.forEach((c) => assert.ok(q.x.includes(c), "lời giải cần có “" + c + "”"));
const coThang = (q, ...cum) => { const r = q.rubric.map((c) => c.c).join(" | "); cum.forEach((c) => assert.ok(r.includes(c), "thang chấm cần có “" + c + "”")); };
const dapSo = (q) => { const m = /^Đáp số: (.+)$/m.exec(q.x); assert.ok(m, "gợi ý ghi đáp số"); return m[1]; };
const lamTron = (x, k) => Math.round(x * 10 ** k + 1e-9 * Math.sign(x)) / 10 ** k;

/* ---------- vectơ: Đông (x), Bắc (y), hướng lên trên (z) ---------- */
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dai = (a) => Math.hypot(...a);
const cungHuong = (a, b) => dai(a) > 1e-9 && dai(b) > 1e-9 && gan((a[0] * b[0] + a[1] * b[1] + a[2] * b[2]) / (dai(a) * dai(b)), 1, 1e-6);
const HUONG = { Đông: [1, 0, 0], Tây: [-1, 0, 0], Bắc: [0, 1, 0], Nam: [0, -1, 0], "lên trên": [0, 0, 1], "xuống dưới": [0, 0, -1] };
const tenHuong = (v) => { const h = Object.keys(HUONG).filter((k) => cungHuong(v, HUONG[k])); assert.equal(h.length, 1, "hướng không theo một trong các hướng chính: " + v); return h[0]; };

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">");
  return Object.assign(a, { t: m[2], at: [+a.x, +a.y], b: a["font-weight"] === "bold" || a["font-weight"] === "700", fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start" }); });
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
// mọi chữ trong hình cỡ từ 13, nằm trọn trong khung, không đè lên nhau (ước bề rộng chữ như tests/toan12-ck1.js)
const hopChu = (t) => { const w = (t.b ? 0.62 : 0.55) * t.fs * [...t.t].length, x0 = t.anchor === "middle" ? t.at[0] - w / 2 : t.anchor === "end" ? t.at[0] - w : t.at[0];
  return [x0, t.at[1] - 0.75 * t.fs, x0 + w, t.at[1] + 0.25 * t.fs]; };
const khung = (svg) => /viewBox="([^"]+)"/.exec(svg)[1].split(/\s+/).map(Number);
const chuHinh = (svg, at) => {
  const v = khung(svg), T = texts(svg);
  T.forEach((t) => { const h = hopChu(t); assert.ok(t.fs >= 13, at + ": chữ “" + t.t + "” nhỏ hơn cỡ 13"); assert.ok(h[0] >= 0 && h[2] <= v[2] && h[1] >= 0 && h[3] <= v[3], at + ": chữ “" + t.t + "” tràn khỏi khung hình"); });
  T.forEach((t, i) => T.slice(i + 1).forEach((u) => { const a = hopChu(t), b = hopChu(u); assert.ok(!(a[0] < b[2] - 1 && b[0] < a[2] - 1 && a[1] < b[3] - 1 && b[1] < a[3] - 1), at + ": chữ “" + t.t + "” đè lên chữ “" + u.t + "”"); }));
};
/* Đồ thị trên lưới (như tests/vatli-hoahoc12-gk2.js): hai trục màu ink nét 1,5 cắt nhau ở gốc O (chữ O cạnh gốc), trục ngang đi từ gốc sang
   phải, trục đứng đi lên, đầu trục có mũi tên; đường lưới màu line cách đều theo từng chiều, tính từ trục, mỗi vạch có một số; số ở trục
   ngang ngay dưới một vạch dọc, số ở trục đứng ngay trái một vạch ngang, giá trị tỉ lệ với khoảng cách tới gốc; tên trục dạng “N (10¹⁸)”,
   “t (ngày)” gần đầu mỗi trục (tên trục ngang đặt dưới hàng số khi đầu trục không đủ chỗ); đường biểu diễn là một đường gấp khúc màu acc
   nét 2,5 nằm trong lưới. Trả về tên hai trục và các điểm của đường biểu diễn (theo giá trị). */
const docLuoi = (svg, at) => {
  const L = tags(svg, "line"), T = texts(svg), sx = (v) => v.map(Number).sort((a, b) => a - b);
  const doc = sx(L.filter((l) => l.stroke === "line" && l.x1 === l.x2).map((l) => l.x1)), ngang = sx(L.filter((l) => l.stroke === "line" && l.y1 === l.y2).map((l) => l.y1));
  const truc = L.filter((l) => l.stroke === "ink" && l["stroke-width"] === "1.5"), tx = truc.filter((l) => l.y1 === l.y2), ty = truc.filter((l) => l.x1 === l.x2);
  assert.ok(tx.length === 1 && ty.length === 1 && truc.length === 2, at + ": một trục ngang, một trục đứng");
  const O = [+ty[0].x1, +tx[0].y1], X2 = +tx[0].x2, Y2 = +ty[0].y2;
  assert.ok(+tx[0].x1 === O[0] && X2 > O[0] && +ty[0].y1 >= O[1] && Y2 < O[1], at + ": trục ngang đi từ gốc O sang phải, trục đứng đi lên");
  const dau = tags(svg, "polygon").filter((p) => p.fill === "ink").map((p) => pts(p.points)[0]);
  assert.ok(dau.some((p) => p[1] === O[1] && p[0] > X2) && dau.some((p) => p[0] === O[0] && p[1] < Y2), at + ": đầu hai trục có mũi tên");
  assert.ok(T.some((t) => t.t === "O" && dist(t.at, O) < 26), at + ": chữ O ở gốc");
  const bx = doc[0] - O[0], tren = ngang.filter((y) => y < O[1]).reverse(), duoi = ngang.filter((y) => y > O[1]), by = O[1] - tren[0];
  doc.forEach((x, i) => assert.ok(Math.abs(x - O[0] - (i + 1) * bx) < 0.06, at + ": lưới đều theo chiều ngang"));
  tren.forEach((y, j) => assert.ok(Math.abs(O[1] - y - (j + 1) * by) < 0.06, at + ": lưới đều theo chiều đứng"));
  assert.ok(!duoi.length && !ngang.includes(O[1]), at + ": không có vạch lưới dưới trục ngang hay trùng trục ngang");
  const top = tren[tren.length - 1], phai = doc[doc.length - 1];
  L.filter((l) => l.stroke === "line").forEach((l) => assert.ok(l.x1 === l.x2 ? +l.y1 === top && +l.y2 === O[1] : +l.x1 === O[0] && +l.x2 === phai, at + ": vạch lưới đi hết phần đồ thị"));
  const SO_ = /^[−-]?\d+(?:,\d+)?$/, soX = T.filter((t) => SO_.test(t.t) && t.anchor === "middle"), soY = T.filter((t) => SO_.test(t.t) && t.anchor === "end");
  assert.ok(soX.length + soY.length === T.filter((t) => SO_.test(t.t)).length, at + ": số ở trục ngang căn giữa, ở trục đứng căn phải");
  doc.forEach((x) => assert.equal(soX.filter((t) => Math.abs(t.at[0] - x) < 0.06).length, 1, at + ": mỗi vạch dọc có một số"));
  ngang.forEach((y) => assert.equal(soY.filter((t) => Math.abs(t.at[1] - 5 - y) < 0.06).length, 1, at + ": mỗi vạch ngang có một số"));
  soX.forEach((t) => assert.ok(doc.some((x) => Math.abs(x - t.at[0]) < 0.06) && t.at[1] > O[1] + 10, at + ": số " + t.t + " ở trục ngang dưới một vạch dọc"));
  soY.forEach((t) => assert.ok(ngang.some((y) => Math.abs(y - (t.at[1] - 5)) < 0.06) && t.at[0] < O[0], at + ": số " + t.t + " ở trục đứng trái một vạch ngang"));
  const kx = val(soX[0].t) / (soX[0].at[0] - O[0]), ky = val(soY[0].t) / (O[1] - (soY[0].at[1] - 5));
  soX.forEach((t) => assert.ok(gan(val(t.t), kx * (t.at[0] - O[0]), 1e-6), at + ": số ở trục ngang tỉ lệ với khoảng cách tới gốc"));
  soY.forEach((t) => assert.ok(gan(val(t.t), ky * (O[1] - (t.at[1] - 5)), 1e-6), at + ": số ở trục đứng tỉ lệ với khoảng cách tới gốc"));
  const V = (p) => [(p[0] - O[0]) * kx, (O[1] - p[1]) * ky];
  const tenTruc = T.filter((t) => /^[N] \(10[⁰¹²³⁴⁵⁶⁷⁸⁹]+\)$|^t \((?:ngày|giờ|năm|s)\)$/u.test(t.t));
  assert.equal(tenTruc.length, 2, at + ": tên hai trục");
  const tenX = tenTruc.filter((t) => /^t /.test(t.t) && dist(t.at, [X2, O[1]]) < 45), tenY = tenTruc.filter((t) => /^N /.test(t.t) && dist(t.at, [O[0], Y2]) < 30);
  assert.ok(tenX.length === 1 && tenY.length === 1, at + ": tên trục ở đầu mỗi trục");
  const pl = tags(svg, "polyline").filter((p) => p.stroke === "acc" && p["stroke-width"] === "2.5");
  assert.ok(pl.length === 1 && tags(svg, "polyline").length === 1, at + ": một đường biểu diễn");
  const diemPl = pts(pl[0].points);
  diemPl.forEach((p) => assert.ok(p[0] >= O[0] - 0.06 && p[0] <= phai + 0.06 && p[1] >= top - 0.06 && p[1] <= O[1] + 0.06, at + ": đường biểu diễn nằm trong lưới"));
  diemPl.slice(1).forEach((p, i) => assert.ok(p[0] > diemPl[i][0], at + ": đường biểu diễn đi theo thời gian"));
  chuHinh(svg, at);
  return { x: tenX[0].t, y: tenY[0].t, net: diemPl.map(V) };
};
// giá trị của đường gấp khúc tại hoành độ t (nội suy tuyến tính); thời điểm đường gấp khúc (đi xuống) có giá trị y
const tai = (net, t) => { for (let i = 1; i < net.length; i++) { const [a, b] = [net[i - 1], net[i]]; if (t >= a[0] - 1e-9 && t <= b[0] + 1e-9) return a[1] + ((b[1] - a[1]) * (t - a[0])) / (b[0] - a[0]); } assert.fail("không có giá trị tại " + t); };
const luc = (net, y) => { for (let i = 1; i < net.length; i++) { const [a, b] = [net[i - 1], net[i]]; if ((y - a[1]) * (y - b[1]) <= 0 && a[1] !== b[1]) return a[0] + ((b[0] - a[0]) * (y - a[1])) / (b[1] - a[1]); } assert.fail("đường biểu diễn không có giá trị " + y); };

/* ---------- hạt nhân: kí hiệu ᴬ_ZX (số khối viết chữ số trên dòng, số proton viết chữ số dưới dòng), phản ứng hạt nhân ---------- */
const Z_NT = { n: 0, H: 1, He: 2, C: 6, O: 8, F: 9, Ne: 10, Mg: 12, Al: 13, P: 15, Fe: 26, Sr: 38, I: 53, Cs: 55, Ra: 88, U: 92, Pu: 94 };
const HN = "[⁰¹²³⁴⁵⁶⁷⁸⁹]+[₀₁₂₃₄₅₆₇₈₉]*(?:[A-Z][a-z]?|n)(?![\\p{L}])";
const hatNhan = (t) => {
  const m = /^([⁰¹²³⁴⁵⁶⁷⁸⁹]+)([₀₁₂₃₄₅₆₇₈₉]*)([A-Z][a-z]?|n)$/u.exec(t); assert.ok(m, "không đọc được hạt nhân " + t);
  assert.ok(m[3] in Z_NT, "thiếu số proton của " + m[3]); const A = supV(m[1]), Z = Z_NT[m[3]];
  if (m[2]) assert.equal(subV(m[2]), Z, "số proton của " + t + " đúng nguyên tố"); assert.ok(A >= Z && A > 0 && (m[3] !== "n" || A === 1), "số khối của " + t);
  return { A, Z, k: m[3] }; };
const PTHN = new RegExp(`(?:${HN}|X)(?: \\+ (?:${HN}|X))* → (?:${HN}|X)(?: \\+ (?:${HN}|X))*`, "gu");
// tổng số khối, tổng điện tích hai vế; có hạt X chưa biết thì trả về X (bảo toàn số khối và điện tích)
const phanUng = (pt) => {
  const ve = pt.split(" → ").map((v) => v.split(" + ")), X = ve.flat().filter((t) => t === "X").length;
  assert.ok(X <= 1, "phản ứng có nhiều nhất một hạt X: " + pt);
  const tong = (v) => v.filter((t) => t !== "X").map(hatNhan).reduce((s, h) => [s[0] + h.A, s[1] + h.Z], [0, 0]);
  const [a, b] = ve.map(tong);
  if (!X) { assert.ok(a[0] === b[0] && a[1] === b[1], "phản ứng hạt nhân bảo toàn số khối và điện tích: " + pt); return null; }
  const trai = ve[0].includes("X"), x = trai ? [b[0] - a[0], b[1] - a[1]] : [a[0] - b[0], a[1] - b[1]];
  assert.ok(x[0] > 0 && x[1] >= 0 && x[0] >= x[1], "hạt X có số khối, điện tích hợp lí: " + pt); return { A: x[0], Z: x[1] };
};
// tên hạt đi kèm kí hiệu trong lựa chọn: “hạt alpha (⁴₂He)”
const TEN_HAT = { alpha: [4, 2], proton: [1, 1], neutron: [1, 0], deuterium: [2, 1], tritium: [3, 1] };
// năng lượng liên kết riêng đề cho “⁵⁶Fe khoảng 8,8 MeV/nucleon”
const lkRieng = (s) => Object.fromEntries([...s.matchAll(new RegExp(`(${HN}) khoảng (${NUM}) MeV\\/nucleon`, "gu"))].map((x) => [x[1], { A: hatNhan(x[1]).A, e: val(x[2]) }]));

/* ---------- hoá học: công thức (chữ số dưới dòng, nước kết tinh “·”, phức chất trong ngoặc vuông), khối lượng mol, phương trình ---------- */
// "Fe₂(SO₄)₃" → { Fe: 2, S: 3, O: 12 }; "[Cu(NH₃)₄(H₂O)₂]" → { Cu: 1, N: 4, H: 16, O: 2 }; "MgCO₃·CaCO₃" cộng phần sau dấu “·”
const congThuc1 = (f, n = 1) => {
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
const congThuc = (f, n = 1) => { const o = {}; f.split("·").forEach((p) => { const m = /^(\d*)(.+)$/.exec(p); Object.entries(congThuc1(m[2], n)).forEach(([e, c]) => (o[e] = (o[e] || 0) + (m[1] ? +m[1] : 1) * c)); }); return o; };
const NTK = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Cl: 35.5, K: 39, Ca: 40, Cr: 52, Mn: 55, Fe: 56, Co: 59, Ni: 59, Cu: 64, Zn: 65, Ag: 108, Ba: 137, Pt: 195 };
const KL = (f, nt = NTK) => Object.entries(congThuc(f)).reduce((s, [e, c]) => { assert.ok(e in nt, "thiếu nguyên tử khối của " + e + " (" + f + ")"); return s + nt[e] * c; }, 0);
// chất trong phương trình: hệ số, công thức, điện tích; "e" là electron (điện tích −1); phức chất “[Ag(NH₃)₂]⁺”, muối “K₂[Ni(CN)₄]”
const PHUC = "\\[[A-Z][a-z]?(?:[A-Z][a-z]?[₀-₉]*|\\([A-Za-z₀-₉]+\\)[₀-₉]*)+\\]";
const THAN = `(?:[A-Z]|\\([A-Z][A-Za-z₀-₉]*\\)[₀-₉ₙ]+|${PHUC})(?:[A-Za-z₀-₉ₙ]|\\([A-Za-z₀-₉]+\\)[₀-₉ₙ]*|${PHUC})*`;
const LOAI = `(?:\\d*e(?![\\p{L}\\p{N}₀-₉])|(?:\\d+n?|n)?${THAN}(?:[²³]?[⁺⁻])?)`;
const PT = new RegExp(`(?<![\\p{L}\\p{N}₀-₉])${LOAI}(?: \\+ ${LOAI})* (?:→|⇌) ${LOAI}(?: \\+ ${LOAI})*`, "gu");
const loai = (t) => { const m = /^(\d*)(n?)(.+?)([²³]?)([⁺⁻]?)$/u.exec(t.trim()); assert.ok(m, "không đọc được chất " + t);
  if (m[3] === "e" && !m[2]) return { k: m[1] ? +m[1] : 1, n: false, f: "", e: true, ten: "e", q: -1 };
  return { k: m[1] ? +m[1] : 1, n: !!m[2], f: m[3], ten: m[3] + m[4] + m[5], q: m[5] ? (m[5] === "⁺" ? 1 : -1) * (m[4] ? SUP.indexOf(m[4]) : 1) : 0 }; };
const tach = (pt) => pt.split(/ (?:→|⇌) /).map((v) => v.split(" + ").map(loai));
const canBang = (pt) => [2, 5].every((n) => {
  const [a, b] = tach(pt).map((v) => { const o = {}; let q = 0; v.forEach((s) => { const k = s.k * (s.n ? n : 1); if (!s.e) Object.entries(congThuc(s.f, n)).forEach(([e, c]) => (o[e] = (o[e] || 0) + k * c)); q += k * s.q; }); return { o, q }; });
  return a.q === b.q && [...new Set([...Object.keys(a.o), ...Object.keys(b.o)])].every((e) => a.o[e] === b.o[e]);
});
// hệ số của chất (tên kèm điện tích) trong phương trình; tính số mol chất y từ số mol chất x
const heSo = (pt, ten_) => { const c = tach(pt).flat().filter((v) => v.ten === ten_); assert.equal(c.length, 1, ten_ + " có đúng một lần trong " + pt); return c[0].k; };
const molTheoPT = (pt, x, nx, y) => (nx * heSo(pt, y)) / heSo(pt, x);
const ptTrong = (q) => [...new Set([q.q, q.x].concat(q.o || [], (q.rubric || []).map((c) => c.c)).join(" | ").match(PT) || [])];
const ptCua = (q, x, y) => { const p = ptTrong(q).filter((s) => [x, y].every((c) => tach(s).flat().some((v) => v.ten === c)));
  assert.equal(p.length, 1, "đề hoặc lời giải có đúng một phương trình chứa " + x + " và " + y + ": " + p.join("; ")); return p[0]; };
// sản phẩm (vế phải) của phương trình, trừ chất có trong danh sách bỏ
const sanPham = (pt, bo = []) => tach(pt)[1].map((s) => s.ten).filter((t) => !bo.includes(t));
// nguyên tử khối đề cho: “(Cho H = 1, C = 12, O = 16.)”; phải đúng bảng nguyên tử khối
const ntDe = (q) => { const m = /\(Cho ([^)]*)\.\)/.exec(q.q); assert.ok(m, "đề cho nguyên tử khối"); const nt = {};
  [...m[1].matchAll(/([A-Z][a-z]?) = (\d+(?:,\d+)?)/g)].forEach((k) => { nt[k[1]] = val(k[2]); assert.equal(nt[k[1]], NTK[k[1]], "nguyên tử khối của " + k[1]); }); return nt; };
// thể tích mol khí ở điều kiện chuẩn đề cho (24,79 L/mol)
const VM = 24.79;
const vmDe = (q) => { const m = new RegExp("(?:thể tích mol khí (?:ở điều kiện chuẩn là )?(" + NUM + ") L\\/mol|ở điều kiện chuẩn, mỗi mol khí chiếm thể tích (" + NUM + ") L)", "u").exec(q.q);
  assert.ok(m && val(m[1] || m[2]) === VM, "thể tích mol khí ở điều kiện chuẩn"); return VM; };
// thế điện cực chuẩn (V) theo Bảng 15.1 của sách, nếu câu nào ghi
const E0_SACH = { Li: -3.04, K: -2.924, Ca: -2.84, Na: -2.713, Mg: -2.356, Al: -1.676, Zn: -0.762, Fe: -0.44, Ni: -0.257, Sn: -0.137, Pb: -0.126, H: 0, Cu: 0.34, Ag: 0.799, Hg: 0.853 };
const e0De = (s) => [...s.matchAll(new RegExp("E°\\(([A-Z][a-z]?)[²³]?⁺\\/([A-Z][a-z]?)\\) = ([−+]?\\d+,\\d+) V", "gu"))].forEach((m) => {
  assert.equal(m[1], m[2], "cặp oxi hoá – khử của cùng một kim loại"); assert.ok(gan(val(m[3].replace("+", "")), E0_SACH[m[1]]), "E° của " + m[1] + " đúng bảng của sách"); });
// số oxi hoá của một nguyên tố trong hợp chất (trung hoà điện), các nguyên tố khác có số oxi hoá cố định (S trong gốc sulfate +6)
const OXH = { H: 1, Na: 1, K: 1, O: -2, S: 6, Cl: -1 };
const oxh = (f, el) => { const c = congThuc(f); assert.ok(c[el], el + " có trong " + f);
  return -sum(Object.entries(c).filter(([e]) => e !== el).map(([e, k]) => { assert.ok(e in OXH, "chưa có số oxi hoá cố định của " + e); return OXH[e] * k; })) / c[el]; };
// cấu hình electron của nguyên tử kim loại chuyển tiếp dãy thứ nhất (bảng ở Bài 27); ion nhường electron 4s trước rồi mới đến 3d
const CH = { Sc: "[Ar]3d¹4s²", Ti: "[Ar]3d²4s²", V: "[Ar]3d³4s²", Cr: "[Ar]3d⁵4s¹", Mn: "[Ar]3d⁵4s²", Fe: "[Ar]3d⁶4s²", Co: "[Ar]3d⁷4s²", Ni: "[Ar]3d⁸4s²", Cu: "[Ar]3d¹⁰4s¹" };
const Z_KL = { Sc: 21, Ti: 22, V: 23, Cr: 24, Mn: 25, Fe: 26, Co: 27, Ni: 28, Cu: 29 };
const docCH = (s) => { const m = /^\[Ar\]3d([⁰¹²³⁴⁵⁶⁷⁸⁹]+)(?:4s([⁰¹²³⁴⁵⁶⁷⁸⁹]+))?$/u.exec(s); assert.ok(m, "không đọc được cấu hình electron " + s); return { d: supV(m[1]), s: m[2] ? supV(m[2]) : 0 }; };
const vietCH = (c) => "[Ar]3d" + supN(c.d) + (c.s ? "4s" + supN(c.s) : "");
const ionCH = (ch, k) => { const c = docCH(ch), bot = Math.min(k, c.s); return vietCH({ d: c.d - (k - bot), s: c.s - bot }); };
Object.entries(CH).forEach(([k, s]) => { const c = docCH(s); assert.equal(18 + c.d + c.s, Z_KL[k], "cấu hình electron của " + k + " đủ số electron"); });
// phức chất: nguyên tử trung tâm, các phối tử, số lượng phối tử, điện tích, điện tích của nguyên tử trung tâm (điện tích phối tử theo bảng)
const DIEN_PT = { CN: -1, Cl: -1, OH: -1, "NH₃": 0, "H₂O": 0, CO: 0 };
const PHUC_RE = new RegExp(PHUC + "[²³]?[⁺⁻]?", "gu");
const docPhuc = (t) => {
  const m = /^\[([A-Z][a-z]?)((?:[A-Z][a-z]?[₀-₉]*|\([A-Za-z₀-₉]+\)[₀-₉]*)+)\]([²³]?)([⁺⁻]?)$/u.exec(t); assert.ok(m, "không đọc được phức chất " + t);
  const L = [...m[2].matchAll(/\(([A-Za-z₀-₉]+)\)([₀-₉]*)|([A-Z][a-z]?)([₀-₉]*)/gu)].map((x) => ({ f: x[1] || x[3], k: x[2] || x[4] ? subV(x[2] || x[4]) : 1 }));
  L.forEach((l) => assert.ok(l.f in DIEN_PT, "chưa có điện tích của phối tử " + l.f));
  const q = m[4] ? (m[4] === "⁺" ? 1 : -1) * (m[3] ? SUP.indexOf(m[3]) : 1) : 0;
  return { M: m[1], L, n: sum(L.map((l) => l.k)), q, tam: q - sum(L.map((l) => l.k * DIEN_PT[l.f])) };
};
const ionTen = (k, q) => k + (q === 0 ? "" : (Math.abs(q) > 1 ? SUP[Math.abs(q)] : "") + (q > 0 ? "⁺" : "⁻"));
// công thức tổng quát [MLₙ] (M là nguyên tử trung tâm, L là phối tử) không phải một phức chất cụ thể
const phucTrong = (s) => [...new Set(String(s).match(PHUC_RE) || [])].filter((t) => !/^\[ML[₀-₉]*\]$/u.test(t));
// dạng hình học phổ biến của phức chất [MLₙ] (Bảng 28.1)
const HINH = { 4: ["tứ diện", "vuông phẳng"], 6: ["bát diện"] };
// nhóm IIA (Bài 25): từ Be đến Ba bán kính nguyên tử tăng, tính khử tăng, mức độ phản ứng với nước tăng, độ tan của hydroxide tăng, độ bền
// nhiệt của muối carbonate tăng; số oxi hoá đặc trưng +2
const IIA = ["Be", "Mg", "Ca", "Sr", "Ba"];
const XU_HUONG = [[/độ tan trong nước của các hydroxide/i, "tăng"], [/mức độ phản ứng với nước/i, "tăng"], [/tính khử của các kim loại/i, "tăng"]];
const xuHuong = (s) => { const r = XU_HUONG.filter(([re]) => re.test(s)); assert.equal(r.length, 1, "ý không có trong bảng xu hướng: " + s);
  const m = /(tăng|giảm) dần từ (?:([A-Z][a-z]?)|[A-Z][a-z]?\(OH\)₂) đến (?:([A-Z][a-z]?)|[A-Z][a-z]?\(OH\)₂)/.exec(s), tu = /từ ([A-Z][a-z]?)/.exec(s)[1], den = /đến ([A-Z][a-z]?)/.exec(s)[1];
  assert.ok(m && IIA.indexOf(tu) < IIA.indexOf(den), "ý ghi chiều từ trên xuống: " + s); return m[1] === r[0][1]; };
// độ tan (bảng tính tan) và màu kết tủa như sách
const TAN = { "BaSO₄": false, "Ba(NO₃)₂": true, "MgSO₄": true, "CaCl₂": true };
const MAU_KT = { "Fe(OH)₃": "nâu đỏ", "Cu(OH)₂": "xanh nhạt", "Zn(OH)₂": "trắng" };
// kí hiệu kim loại trong lựa chọn: “Titanium (Ti)”
const kiHieu = (o) => { const m = /\(([A-Z][a-z]?)\)$/.exec(o); assert.ok(m, "lựa chọn ghi kí hiệu kim loại: " + o); return m[1]; };

/* ---------- các câu cần tính ----------
   id: đề chứa câu (vl1, vl2, hh1, hh2: đề 1, đề 2 của môn); has: đoạn chữ của đề; right(q): đáp án tính bằng code (câu đúng/sai 4 ý:
   mảng, null ở ý không tính được); essay(q): câu tự luận so với thang chấm và đáp số. */
const CHECKS = [
  /* ----- Vật lí, Đề 1 ----- */
  { id: "vl1", has: "góc giữa dây và vectơ cảm ứng từ là α", right: (q) => {
    // F = BILsinα
    const F = (I, a) => I * Math.sin((a * Math.PI) / 180);
    const [k1, k2] = so(q.o[1], "khi cường độ dòng điện tăng # lần thì lực từ tăng # lần");
    const c = /^Với cùng một dòng điện, lực từ có độ lớn lớn nhất khi α = (\d+)°\.$/.exec(q.o[2]); assert.ok(/^Khi α = 0 \(dây nằm dọc theo đường sức từ\), dây không chịu lực từ\.$/.test(q.o[0]) && c);
    const m = /^Đơn vị của cảm ứng từ là tesla \(T\), với 1 T = 1 (.+)\.$/.exec(q.o[3]); assert.ok(m);
    const goc = Array.from({ length: 181 }, (_, a) => a), max = goc.reduce((b, a) => (F(1, a) > F(1, b) + 1e-12 ? a : b), 0);
    return [Math.abs(F(1, 0)) < 1e-12, gan(F(k1, 30), k2 * F(1, 30)), max === +c[1], m[1] === "N/(A · m)"]; } },
  { id: "vl1", has: "Một dây dẫn thẳng dài 30 cm có dòng điện 4 A", right: (q) => {
    const [L1, I1, F1] = so(q.q, "dài # cm có dòng điện # A được đặt vuông góc với các đường sức của một từ trường đều thì chịu lực từ # N");
    const [L2, I2, a] = so(q.q, "khác dài # cm có dòng điện # A được đặt trong cùng từ trường đó sao cho góc giữa dây và các đường sức từ là #°");
    const B = F1 / (I1 * (L1 / 100)); coX(q, "= " + vn(B) + " (T)"); return B * I2 * (L2 / 100) * Math.sin((a * Math.PI) / 180); } },
  { id: "vl1", has: "Khung dây phẳng có 125 vòng dây", right: (q) => {
    const [N, S, B] = so(q.q, "có # vòng dây, diện tích mỗi vòng # cm², nằm trong từ trường đều B = # T"), [dt, g] = so(q.q, "Trong # s, người ta quay đều khung một góc #° quanh một cạnh của khung");
    // lúc đầu pháp tuyến cùng phương cảm ứng từ (Φ₁ = BS); quay góc g quanh một cạnh (nằm trong mặt phẳng khung) thì Φ₂ = BS · cos g
    assert.ok(/mặt phẳng khung vuông góc với các đường sức từ/.test(q.q), "lúc đầu từ thông bằng BS");
    const dPhi = B * S * 1e-4 * Math.abs(1 - Math.cos((g * Math.PI) / 180)); coX(q, "|ΔΦ| = 2BS = " + sci(dPhi, 1) + " Wb"); return (N * dPhi) / dt; } },
  { id: "vl1", has: "u = 120√2cos(100πt)", right: (q) => {
    const [U] = so(q.q, "u = #√2cos("), [Rr] = so(q.q, "điện trở không đổi # Ω"); return (U * U) / Rr; } },
  { id: "vl1", has: "gấp 1,5 lần bán kính hạt nhân", right: (q) => {
    const [r0] = so(q.q, "R = # · ∛A (m)"), [k] = so(q.q, "có bán kính gấp # lần bán kính hạt nhân "); assert.ok(gan(r0, 1.2e-15), "hằng số trong công thức bán kính như sách");
    const h = hatNhan(new RegExp("bán kính hạt nhân (" + HN + ")", "u").exec(q.q)[1]); return h.A * k ** 3; } },
  { id: "vl1", has: "⁵⁶Fe khoảng 8,8 MeV/nucleon", right: (q) => {
    const E = lkRieng(q.q), W = (t) => E[t].A * E[t].e, ks = Object.keys(E), benNhat = ks.reduce((a, b) => (E[b].e > E[a].e ? b : a));
    const [a1, a2] = [/^Trong ba hạt nhân trên, hạt nhân (\S+) bền vững nhất\.$/.exec(q.o[0]), /^Năng lượng liên kết của hạt nhân (\S+) lớn hơn năng lượng liên kết của hạt nhân (\S+)\.$/.exec(q.o[1])];
    assert.ok(a1 && a2 && /^Hạt nhân có năng lượng liên kết lớn hơn thì luôn bền vững hơn\.$/.test(q.o[2]));
    const d = /^Muốn tách hạt nhân (\S+) thành một proton và một neutron, cần cung cấp năng lượng tối thiểu khoảng (.+) MeV\.$/.exec(q.o[3]); assert.ok(d && hatNhan(d[1]).A === 2);
    // “lớn hơn thì luôn bền hơn” sai khi có cặp hạt nhân năng lượng liên kết lớn hơn mà năng lượng liên kết riêng nhỏ hơn
    const phanVD = ks.some((x) => ks.some((y) => W(x) > W(y) && E[x].e < E[y].e));
    return [a1[1] === benNhat, W(a2[1]) > W(a2[2]), !phanVD, gan(W(d[1]), val(d[2]), 1e-6)]; } },
  { id: "vl1", has: "¹⁹₉F + ¹₁H → ¹⁶₈O + X", right: (q) => {
    const X = phanUng(q.q.match(PTHN)[0]), dung = q.o.filter((o) => { const h = hatNhan(o); return h.A === X.A && h.Z === X.Z; });
    assert.equal(dung.length, 1); coX(q, "A = " + X.A, "Z = " + X.Z); return dung[0]; } },
  { id: "vl1", has: "²⁰₁₀Ne là 19,9870 amu", right: (q) => {
    const h = hatNhan(new RegExp("cho khối lượng hạt nhân (" + HN + ")", "iu").exec(q.q)[1]), [m] = so(q.q, "là # amu; khối lượng proton");
    const [mp, mn, u] = so(q.q, "khối lượng proton là # amu, của neutron là # amu; 1 amu = # MeV/c²"); assert.equal(u, 931.5);
    const dm = h.Z * mp + (h.A - h.Z) * mn - m; coX(q, "= " + vn(dm) + " (amu)"); return (dm * u) / h.A; } },
  { id: "vl1", has: "đồ thị biểu diễn số hạt nhân N chưa bị phân rã", right: (q) => {
    const g = docLuoi(q.svg, "đồ thị N–t"); assert.ok(g.x === "t (ngày)" && g.y === "N (10¹⁸)");
    const N0 = tai(g.net, 0), T = luc(g.net, N0 / 2);
    // đường biểu diễn là đường giảm theo hàm mũ: N = N₀ · 2^(−t/T) ở mọi điểm (toạ độ ghi đến 0,1)
    g.net.forEach(([t, N]) => assert.ok(Math.abs(N - N0 * 2 ** (-t / T)) < 0.02, "đường biểu diễn là đường giảm theo hàm mũ"));
    assert.ok(gan(T, Math.round(T), 1e-3) && gan(tai(g.net, 2 * T), N0 / 4, 1e-3), "chu kì bán rã đọc được ở vạch lưới");
    coX(q, "N₀ = " + vn(N0) + " · 10¹⁸", "t = " + vn(Math.round(T)) + " ngày, N = " + vn(N0 / 2) + " · 10¹⁸", "t = " + vn(2 * Math.round(T)) + " ngày, N = " + vn(N0 / 4) + " · 10¹⁸");
    return Math.round(T); } },
  { id: "vl1", has: "¹³¹I có chu kì bán rã 8 ngày", essay: (q) => {
    const [T] = so(q.q, "có chu kì bán rã # ngày"), [H0] = so(q.q, "độ phóng xạ của nó là # Bq"), [ln2] = so(q.q, "ln 2 ≈ #"), [t] = so(q.q, "Sau # ngày");
    const lam = ln2 / (T * 86400), N0 = H0 / lam, k = t / T, H = H0 / 2 ** k; assert.ok(Number.isInteger(k), "thời gian là số nguyên lần chu kì bán rã");
    coThang(q, "λ = ln 2/T = " + vn(ln2) + "/(" + vn(T) + " · 86 400 s) ≈ " + sci(lam, 1) + " s⁻¹", "N₀ = H₀/λ = " + sci(H0, 1) + "/(" + sci(lam, 1) + ") ≈ " + sci(N0, 1) + " hạt nhân",
      vn(t) + " ngày bằng " + vn(k) + " chu kì bán rã: H = H₀/2" + supN(k) + " = " + sci(H, 1) + " Bq");
    assert.equal(dapSo(q), "a) λ ≈ " + sci(lam, 1) + " s⁻¹; b) N₀ ≈ " + sci(N0, 1) + "; c) H = " + sci(H, 1) + " Bq."); } },
  { id: "vl1", has: "Một tàu phá băng chạy bằng năng lượng hạt nhân", right: (q) => {
    const [E1] = so(q.q, "toả ra năng lượng # MeV"), [P, H] = so(q.q, "công suất có ích # MW và hiệu suất #%"), [mev] = so(q.q, "1 MeV = # J"), [NA] = so(q.q, "Avogadro bằng # mol⁻¹");
    const [M] = so(q.q, "khối lượng mol của ²³⁵U là # g/mol"), [gio] = so(q.q, "trong một ngày đêm (# giờ)");
    const Etp = ((P * 1e6) / (H / 100)) * gio * 3600, soPH = Etp / (E1 * mev); coX(q, "P = " + vn(P) + "/" + vn(H / 100) + " = " + vn(P / (H / 100)) + " (MW)");
    return (soPH / NA) * M; } },
  /* ----- Vật lí, Đề 2 ----- */
  { id: "vl2", has: "có dòng điện chạy theo hướng từ Tây sang Đông", right: (q) => {
    const m = /theo hướng từ (Đông|Tây|Nam|Bắc) sang (Đông|Tây|Nam|Bắc)/.exec(q.q), b = /các đường sức từ thẳng đứng, hướng từ dưới (lên trên)/.exec(q.q); assert.ok(m && b);
    const I = HUONG[m[2]].map((v, i) => v - HUONG[m[1]][i]), F = cross(I, HUONG[b[1]]); return "Hướng " + tenHuong(F); } },
  { id: "vl2", has: "Tia phóng xạ α là dòng các hạt nào sau đây?", right: (q) => {
    // tên hạt khớp kí hiệu (“Hạt proton (¹₁H)”); hạt α là hạt nhân ⁴₂He
    q.o.forEach((o) => { const m = new RegExp("^Hạt (\\w+) \\((" + HN + ")\\)$", "u").exec(o); if (m) { const h = hatNhan(m[2]); assert.deepEqual(TEN_HAT[m[1]], [h.A, h.Z], "tên hạt khớp kí hiệu: " + o); } });
    return q.o.find((o) => { const m = new RegExp("^Hạt nhân (" + HN + ")$", "u").exec(o); return m && hatNhan(m[1]).A === TEN_HAT.alpha[0] && hatNhan(m[1]).Z === TEN_HAT.alpha[1]; }); } },
  { id: "vl2", has: "uốn thành hai đoạn thẳng MN và NP", right: (q) => {
    const [I, B] = so(q.q, "có dòng điện # A chạy qua, đặt trong một từ trường đều có cảm ứng từ # T"), [L1, L2] = so(q.q, "Đoạn MN dài # cm, vuông góc với các đường sức từ; đoạn NP dài # cm, song song với các đường sức từ");
    // MN vuông góc (sin 90° = 1), NP song song (sin 0 = 0): hai lực cùng phương nên độ lớn cộng lại
    return B * I * (L1 / 100) * 1 + B * I * (L2 / 100) * 0; } },
  { id: "vl2", has: "từ thông qua khung bằng 4 mWb", right: (q) => {
    const [P0] = so(q.q, "từ thông qua khung bằng # mWb"), [a] = so(q.q, "góc giữa mặt phẳng khung và các đường sức từ bằng #°"); assert.ok(/Khi mặt phẳng khung vuông góc với các đường sức từ/.test(q.q));
    // góc giữa pháp tuyến và cảm ứng từ bằng 90° trừ góc giữa mặt phẳng khung và đường sức
    return P0 * Math.cos(((90 - a) * Math.PI) / 180); } },
  { id: "vl2", has: "Cảm ứng từ giảm đều từ 0,4 T về 0", right: (q) => {
    const [N, S] = so(q.q, "gồm # vòng, mỗi vòng có diện tích # cm²"), [B] = so(q.q, "giảm đều từ # T về 0"), [e] = so(q.q, "có độ lớn # V");
    assert.ok(/mặt phẳng các vòng dây vuông góc với các đường sức từ/.test(q.q)); return (N * B * S * 1e-4) / e; } },
  { id: "vl2", has: "Tại thời điểm t = 1/300 s", right: (q) => {
    const [U, w] = so(q.q, "u = #√2cos(#πt)"), m = /t = 1\/(\d+) s/.exec(q.q); return U * Math.SQRT2 * Math.cos(w * Math.PI * (1 / +m[1])); } },
  { id: "vl2", has: "Xét hạt nhân ²³⁸₉₂U", right: (q) => {
    const h = hatNhan(new RegExp("Xét hạt nhân (" + HN + ")", "u").exec(q.q)[1]);
    const a = new RegExp("^Hạt nhân (" + HN + ") có (\\d+) proton và (\\d+) neutron\\.$", "u").exec(q.o[0]), b = new RegExp("^Hạt nhân (" + HN + ") có cùng số neutron với hạt nhân (" + HN + ")\\.$", "u").exec(q.o[1]);
    const c = new RegExp("bán kính hạt nhân (" + HN + ") gấp khoảng (" + NUM + ") lần bán kính hạt nhân (" + HN + ")\\.$", "u").exec(q.o[2]), d = new RegExp("^Hạt nhân (" + HN + ") mang điện tích ([−+])(\\d+)e\\.$", "u").exec(q.o[3]);
    assert.ok(a && b && c && d && /R = 1,2 · 10⁻¹⁵ · ∛A/.test(q.o[2]));
    const nn = (t) => { const x = hatNhan(t); return x.A - x.Z; }, [c1, c2] = [hatNhan(c[1]), hatNhan(c[3])];
    return [hatNhan(a[1]).Z === +a[2] && nn(a[1]) === +a[3], nn(b[1]) === nn(b[2]), lamTron(Math.cbrt(c1.A / c2.A), 1) === val(c[2]), (d[2] === "+" ? 1 : -1) * +d[3] === hatNhan(d[1]).Z && h.A === 238]; } },
  { id: "vl2", has: "Xét hạt nhân ²⁷₁₃Al", essay: (q) => {
    const [r0] = so(q.q, "R = # · ∛A (m)"), [u] = so(q.q, "1 amu ≈ # kg"), [rhoAl] = so(q.q, "Khối lượng riêng của nhôm là # kg/m³");
    const h = hatNhan(new RegExp("Xét hạt nhân (" + HN + ")", "u").exec(q.q)[1]), Rr = r0 * Math.cbrt(h.A), m = h.A * u, V = (4 / 3) * Math.PI * Rr ** 3, rho = m / V;
    coThang(q, "Z = " + h.Z + " proton; số neutron N = " + h.A + " − " + h.Z + " = " + (h.A - h.Z), "R = 1,2 · 10⁻¹⁵ · ∛" + h.A + " = " + sci(Rr, 1) + " m",
      "m ≈ " + h.A + " · " + sci(u, 2) + " ≈ " + sci(m, 2) + " kg", "V = (4/3)πR³ ≈ " + sci(V, 2) + " m³", "ρ = m/V ≈ " + sci(rho, 1) + " kg/m³",
      sci(rho, 1) + "/" + vn(rhoAl) + " ≈ " + sci(val(sci(rho, 1)) / rhoAl, 1) + " lần");
    assert.ok(sci(val(sci(rho, 1)) / rhoAl, 1) === sci(rho / rhoAl, 1), "tỉ số tính từ số đã làm tròn khớp số chính xác");
    assert.equal(dapSo(q), "a) " + h.Z + " proton, " + (h.A - h.Z) + " neutron; b) R = " + sci(Rr, 1) + " m; c) ρ ≈ " + sci(rho, 1) + " kg/m³; d) khoảng " + sci(rho / rhoAl, 1) + " lần."); } },
  { id: "vl2", has: "Năng lượng nghỉ của 2 g vật chất", right: (q) => {
    const [c] = so(q.q, "c = # m/s"), [m] = so(q.q, "Năng lượng nghỉ của # g"); return sci((m / 1000) * c * c, 1) + " J"; } },
  { id: "vl2", has: "²₁H + ³₁H → ⁴₂He + ¹₀n", right: (q) => {
    const pt = q.q.match(PTHN)[0]; phanUng(pt);
    const [mD, mT, mHe, mn, u] = so(q.q, "²₁H là # amu; ³₁H là # amu; ⁴₂He là # amu; khối lượng neutron là # amu; 1 amu = # MeV/c²");
    const dm = mD + mT - (mHe + mn); coX(q, "= " + vn(dm) + " (amu)"); return dm * u; } },
  { id: "vl2", has: "Đồng vị phóng xạ ³²P có chu kì bán rã 14 ngày", right: (q) => {
    const [T] = so(q.q, "có chu kì bán rã # ngày"), con = (t) => 2 ** (-t / T);
    const [ta] = so(q.o[0], "Sau # ngày, số hạt nhân ³²P còn lại bằng N₀/2"), [tb] = so(q.o[1], "Sau # ngày, số hạt nhân ³²P đã bị phân rã bằng N₀/2");
    const [tc, k] = so(q.o[2], "Sau # ngày, độ phóng xạ của mẫu giảm # lần"), [td] = so(q.o[3], "thì sau # ngày số hạt nhân còn lại bằng N₀");
    assert.ok(/^Nếu ban đầu mẫu có 2N₀ hạt nhân/.test(q.o[3]));
    return [gan(con(ta), 0.5), gan(1 - con(tb), 0.5), gan(1 / con(tc), k), gan(2 * con(td), 1)]; } },
  { id: "vl2", has: "Đồng vị ²²⁶Ra có chu kì bán rã 1 600 năm", right: (q) => {
    const [T, ngay] = so(q.q, "có chu kì bán rã # năm. Lấy 1 năm = # ngày"), [ln2] = so(q.q, "ln 2 ≈ #"), [NA] = so(q.q, "Avogadro bằng # mol⁻¹"), [M] = so(q.q, "khối lượng mol của ²²⁶Ra là # g/mol");
    const [m] = so(q.q, "Độ phóng xạ của # g ²²⁶Ra bằng a · 10¹⁰ Bq"), H = (ln2 / (T * ngay * 86400)) * ((m / M) * NA); return H / 1e10; } },
  { id: "vl2", has: "k = 1,05 phân hạch mới", right: (q) => { const [k] = so(q.q, "trung bình k = # phân hạch mới"), [n] = so(q.q, "Sau # lượt"); return k ** n; } },
  /* ----- Hoá học, Đề 1 ----- */
  { id: "hh1", has: "cho vào bình chứa khí chlorine dư", right: (q) => { const p = sanPham(ptCua(q, "Fe", "Cl₂")); assert.equal(p.length, 1); return p[0]; } },
  { id: "hh1", has: "Không thể điều chế sodium bằng cách cho kim loại potassium", right: (q) => {
    // kim loại kiềm tác dụng với nước trong dung dịch (phương trình trong lời giải) nên không khử được ion Na⁺
    const p = ptCua(q, "K", "H₂O"); assert.ok(sanPham(p).includes("KOH") && sanPham(p).includes("H₂")); return "potassium tác dụng với nước có trong dung dịch"; } },
  { id: "hh1", has: "khử hoàn toàn 24 g hỗn hợp CuO và Fe₂O₃", right: (q) => {
    const nt = ntDe(q), [m1] = so(q.q, "khử hoàn toàn # g hỗn hợp CuO và Fe₂O₃"), [m2] = so(q.q, "thu được # g hỗn hợp kim loại");
    // x mol CuO, y mol Fe₂O₃: khối lượng oxide và khối lượng kim loại
    const a1 = KL("CuO", nt), b1 = KL("Fe₂O₃", nt), a2 = molTheoPT(ptCua(q, "CuO", "Cu"), "CuO", 1, "Cu") * nt.Cu, b2 = molTheoPT(ptCua(q, "Fe₂O₃", "Fe"), "Fe₂O₃", 1, "Fe") * nt.Fe;
    const D = a1 * b2 - b1 * a2, x = (m1 * b2 - b1 * m2) / D, y = (a1 * m2 - m1 * a2) / D; assert.ok(x > 0 && y > 0);
    coX(q, "x = " + vn(x), "y = " + vn(y)); return x * a1; } },
  { id: "hh1", has: "Kim loại nhóm IIA nào sau đây KHÔNG phản ứng với nước", right: (q) => {
    // beryllium không tác dụng với nước kể cả khi đun nóng; Mg tác dụng khi đun nóng; Ca, Sr, Ba tác dụng ở nhiệt độ thường
    const khong = q.o.filter((o) => kiHieu(o) === "Be"); assert.ok(q.o.every((o) => IIA.includes(kiHieu(o)))); return khong[0]; } },
  { id: "hh1", has: "về các kim loại nhóm IIA từ magnesium đến barium", right: (q) => {
    assert.ok(/^Trong hợp chất, các nguyên tố này có số oxi hoá đặc trưng là \+2\.$/.test(q.o[0])); return [true, xuHuong(q.o[1]), xuHuong(q.o[2]), xuHuong(q.o[3])]; } },
  { id: "hh1", has: "Để làm mềm 25 L nước này", right: (q) => {
    const nt = ntDe(q), [c1, c2] = so(q.q, "các ion Ca²⁺ (# mol/L), Mg²⁺ (# mol/L)"), [V] = so(q.q, "Để làm mềm # L");
    const n = molTheoPT(ptCua(q, "Ca²⁺", "CO₃²⁻"), "Ca²⁺", c1 * V, "CO₃²⁻") + molTheoPT(ptCua(q, "Mg²⁺", "CO₃²⁻"), "Mg²⁺", c2 * V, "CO₃²⁻"); return n * KL("Na₂CO₃", nt); } },
  { id: "hh1", has: "Hoà tan hết 18,4 g quặng dolomite", right: (q) => {
    const nt = ntDe(q), Vm = vmDe(q), [m] = so(q.q, "Hoà tan hết # g quặng dolomite"), n = m / KL("MgCO₃·CaCO₃", nt);
    return (molTheoPT(ptCua(q, "MgCO₃", "CO₂"), "MgCO₃", n, "CO₂") + molTheoPT(ptCua(q, "CaCO₃", "CO₂"), "CaCO₃", n, "CO₂")) * Vm; } },
  { id: "hh1", has: "Các nguyên tố kim loại chuyển tiếp dãy thứ nhất thuộc chu kì 4", right: () => { const k = Object.keys(CH); return k[0] + " (Z = " + Z_KL[k[0]] + ") đến " + k[k.length - 1] + " (Z = " + Z_KL[k[k.length - 1]] + ")"; } },
  { id: "hh1", has: "Nguyên tử cobalt (Z = 27) có cấu hình electron", right: (q) => {
    const m = /^Nguyên tử cobalt \(Z = (\d+)\) có cấu hình electron (\S+)\. Cấu hình electron của ion Co([²³])⁺ là$/.exec(q.q); assert.ok(m && +m[1] === Z_KL.Co && m[2] === CH.Co);
    coX(q, "Co → Co²⁺ + 2e"); return ionCH(CH.Co, SUP.indexOf(m[3])); } },
  { id: "hh1", has: "Số oxi hoá của vanadium trong V₂O₅", right: () => oxh("V₂O₅", "V") },
  { id: "hh1", has: "kiểm tra lượng sắt trong một loại viên uống", essay: (q) => {
    const [vien, Vx] = so(q.q, "hoà tan # viên vào nước có thêm dung dịch H₂SO₄ loãng, được # mL dung dịch X"), [Vl, C, Vk] = so(q.q, "Lấy # mL dung dịch X đem chuẩn độ bằng dung dịch KMnO₄ # M thì dùng vừa hết # mL");
    const pt = ptCua(q, "FeSO₄", "KMnO₄"), nt = ntDe(q);
    // chất oxi hoá: số oxi hoá giảm; chất khử: số oxi hoá tăng
    assert.ok(oxh("MnSO₄", "Mn") < oxh("KMnO₄", "Mn") && oxh("Fe₂(SO₄)₃", "Fe") > oxh("FeSO₄", "Fe"), "Mn giảm số oxi hoá, Fe tăng số oxi hoá");
    const nK = (C * Vk) / 1000, nF = molTheoPT(pt, "KMnO₄", nK, "FeSO₄"), CF = nF / (Vl / 1000), tong = (CF * Vx) / 1000, moi = tong / vien, mg = moi * nt.Fe * 1000;
    coThang(q, "Chất oxi hoá là KMnO₄", "chất khử là FeSO₄", "n(KMnO₄) = " + vn(C) + " · " + vn(Vk / 1000) + " = " + sci(nK, 1) + " mol", "n(FeSO₄) = " + heSo(pt, "FeSO₄") / heSo(pt, "KMnO₄") + " · " + sci(nK, 1) + " = " + sci(nF, 1) + " mol",
      "nồng độ FeSO₄ = " + sci(nF, 1) + "/" + vnf(Vl / 1000, 3) + " = " + vn(CF) + " M", vn(CF) + " · " + vn(Vx / 1000) + " = " + sci(tong, 1) + " mol", "mỗi viên chứa " + sci(moi, 1) + " mol Fe", "≈ " + vn(mg / 1000) + " g = " + vn(mg) + " mg");
    assert.equal(dapSo(q), "a) Chất oxi hoá KMnO₄, chất khử FeSO₄; b) " + vn(CF) + " M; c) khoảng " + vn(mg) + " mg."); } },
  { id: "hh1", has: "Xét phức chất [Fe(CN)₆]³⁻", right: (q) => {
    const p = docPhuc("[Fe(CN)₆]³⁻"), ion = /^Nguyên tử trung tâm của phức chất là ion (\S+)\.$/.exec(q.o[0]), hinh = /^Phức chất có (\d+) phối tử nên thường có dạng hình học (.+)\.$/.exec(q.o[1]);
    const soPT = /^Phức chất này có (\d+) phối tử CN⁻\.$/.exec(q.o[3]); assert.ok(ion && hinh && soPT && /^Phức chất này không mang điện tích\.$/.test(q.o[2]) && /mỗi phối tử là một ion CN⁻/.test(q.q));
    return [ion[1] === ionTen(p.M, p.tam), +hinh[1] === p.n && HINH[p.n].includes(hinh[2]), p.q === 0, +soPT[1] === p.n]; } },
  { id: "hh1", has: "Phức chất [PtCl₄(NH₃)₂] không mang điện tích", right: () => { const p = docPhuc("[PtCl₄(NH₃)₂]"); assert.equal(p.q, 0); return p.tam; } },
  { id: "hh1", has: "Nhỏ từ từ dung dịch NH₃ vào ống nghiệm chứa dung dịch Cu(NO₃)₂", right: (q) => {
    const p = docPhuc(phucTrong(q.o[2])[0]), d = /^Trong phức chất tạo thành, nguyên tử trung tâm là ion (\S+)\.$/.exec(q.o[3]); assert.ok(d && p.M === "Cu");
    // màu của kết tủa ban đầu theo bảng như sách
    assert.ok(q.o[0].includes(MAU_KT["Cu(OH)₂"]), "kết tủa Cu(OH)₂ màu xanh nhạt");
    return [true, null, null, d[1] === ionTen(p.M, p.tam)]; } },
  { id: "hh1", has: "Hoà tan hết 2,87 g AgCl bằng dung dịch NH₃", right: (q) => {
    const nt = ntDe(q), [m] = so(q.q, "Hoà tan hết # g AgCl"), [C] = so(q.q, "dung dịch NH₃ # M"), pt = ptCua(q, "AgCl", "NH₃");
    return (molTheoPT(pt, "AgCl", m / KL("AgCl", nt), "NH₃") / C) * 1000; } },
  { id: "hh1", has: "vào 50 mL dung dịch ZnSO₄ 0,1 M", right: (q) => {
    const [C, V, c] = so(q.q, "Cho từ từ dung dịch NaOH # M vào # mL dung dịch ZnSO₄ # M"), nZn = (V / 1000) * c;
    const p1 = ptCua(q, "Zn²⁺", "Zn(OH)₂"), p2 = ptCua(q, "Zn(OH)₂", "[Zn(OH)₄]²⁻");
    const nOH = molTheoPT(p1, "Zn²⁺", nZn, "OH⁻") + molTheoPT(p2, "Zn(OH)₂", molTheoPT(p1, "Zn²⁺", nZn, "Zn(OH)₂"), "OH⁻");
    assert.ok(MAU_KT["Zn(OH)₂"] === "trắng" && /kết tủa trắng Zn\(OH\)₂/.test(q.q)); return (nOH / C) * 1000; } },
  /* ----- Hoá học, Đề 2 ----- */
  { id: "hh2", has: "Nguyên tử gallium (Z = 31) có 3 electron ở lớp ngoài cùng", right: (q) => {
    const [k] = so(q.q, "có # electron ở lớp ngoài cùng"); coX(q, "Ga → Ga³⁺ + 3e"); return ionTen("Ga", k); } },
  { id: "hh2", has: "Kim loại nặng nhất, tức là có khối lượng riêng lớn nhất", right: (q) => {
    // khối lượng riêng (g/cm³) như sách (osmium 22,6) và bảng số liệu thông dụng; lời giải ghi đúng các số đó
    const D = { Os: 22.6, Pb: 11.3, Cu: 9.0, Fe: 7.9 }, k = q.o.map(kiHieu); assert.ok(k.every((x) => x in D));
    k.forEach((x) => assert.ok(new RegExp("khoảng " + escRe(vnf(D[x], 1)) + " g/cm³").test(q.x), "lời giải ghi khối lượng riêng của " + x));
    return q.o[k.indexOf(k.reduce((a, b) => (D[b] > D[a] ? b : a)))]; } },
  { id: "hh2", has: "Cho bột sắt vào dung dịch HCl dư", right: (q) => sanPham(ptCua(q, "Fe", "HCl")).find((t) => /Fe/.test(t)) },
  { id: "hh2", has: "thu hồi đồng từ 500 L nước thải", right: (q) => {
    const nt = ntDe(q), [V, c] = so(q.q, "từ # L nước thải chứa CuSO₄ nồng độ # mol/L"); return molTheoPT(ptCua(q, "Fe", "CuSO₄"), "CuSO₄", V * c, "Cu") * nt.Cu; } },
  { id: "hh2", has: "Duralumin nhẹ mà cứng", right: (q) => { assert.ok(/trên 90% khối lượng/.test(q.q)); return q.o.find((o) => kiHieu(o) === "Al"); } },
  { id: "hh2", has: "Nhỏ thêm vài giọt dung dịch CuSO₄ vào thì khí thoát ra nhanh hơn hẳn", right: (q) => {
    const p = ptCua(q, "Zn", "Cu²⁺"); assert.ok(canBang(p) && E0_SACH.Zn < E0_SACH.Cu, "Zn khử được ion Cu²⁺"); return "Cu sinh ra bám vào Zn tạo pin điện, Zn bị ăn mòn điện hoá"; } },
  { id: "hh2", has: "Muối nào sau đây gần như không tan trong nước?", right: (q) => { const k = q.o.filter((o) => TAN[o] === false); assert.ok(q.o.every((o) => o in TAN) && k.length === 1); return k[0]; } },
  { id: "hh2", has: "về hợp chất của calcium, magnesium và barium", right: (q) => {
    // độ bền nhiệt của muối carbonate tăng dần từ Be đến Ba
    const a = /^Khi nung, (\w+)CO₃ bị phân huỷ ở nhiệt độ thấp hơn (\w+)CO₃\.$/.exec(q.o[0]); assert.ok(a);
    const b = ptCua(q, "CaCO₃", "CH₃COOH"), c = ptCua(q, "MgCO₃", "MgO"); assert.ok(sanPham(b).includes("CO₂") && sanPham(c).includes("CO₂"));
    return [IIA.indexOf(a[1]) < IIA.indexOf(a[2]), true, true, null]; } },
  { id: "hh2", has: "Nhiệt phân hoàn toàn 26,1 g Ba(NO₃)₂", right: (q) => {
    const nt = ntDe(q), [m] = so(q.q, "Nhiệt phân hoàn toàn # g Ba(NO₃)₂"), pt = ptCua(q, "Ba(NO₃)₂", "BaO"); return molTheoPT(pt, "Ba(NO₃)₂", m / KL("Ba(NO₃)₂", nt), "BaO") * KL("BaO", nt); } },
  { id: "hh2", has: "Một mẫu nước chứa Ca(HCO₃)₂ nồng độ", right: (q) => {
    const nt = ntDe(q), [c] = so(q.q, "Ca(HCO₃)₂ nồng độ # mol/L"), [V] = so(q.q, "Đun sôi # L"), pt = ptCua(q, "Ca(HCO₃)₂", "CaCO₃"); return molTheoPT(pt, "Ca(HCO₃)₂", c * V, "CaCO₃") * KL("CaCO₃", nt); } },
  { id: "hh2", has: "Cấu hình electron của nguyên tử chromium (Z = 24) là", right: (q) => { assert.ok(/\(Z = 24\)/.test(q.q) && Z_KL.Cr === 24); coX(q, "copper (" + CH.Cu + ")"); return CH.Cr; } },
  { id: "hh2", has: "Nhỏ dung dịch KOH vào dung dịch Fe₂(SO₄)₃", right: (q) => { const p = sanPham(ptCua(q, "Fe₂(SO₄)₃", "KOH")).filter((t) => t in MAU_KT); assert.equal(p.length, 1); return MAU_KT[p[0]]; } },
  { id: "hh2", has: "So sánh manganese (Mn, kim loại chuyển tiếp dãy thứ nhất) với sodium", right: (q) => {
    const [tMn, tNa] = so(q.x, "Mn nóng chảy ở khoảng # °C), còn Na nóng chảy ở khoảng # °C"), [dMn, dNa] = so(q.x, "Mn là kim loại nặng (khoảng # g/cm³), Na rất nhẹ (khoảng # g/cm³)");
    assert.ok(/^Nhiệt độ nóng chảy của Mn cao hơn nhiều so với của Na\.$/.test(q.o[0]) && /^Khối lượng riêng của Mn nhỏ hơn của Na\.$/.test(q.o[1]) && /phân lớp 4s và phân lớp 3d\.$/.test(q.o[3]));
    const c = docCH(CH.Mn); coX(q, "cấu hình electron của Mn là " + CH.Mn);
    return [tMn > 5 * tNa, dMn < dNa, null, c.d > 0 && c.s > 0]; } },
  { id: "hh2", has: "hoà tan lớp đồng trên bảng mạch điện tử", right: (q) => {
    const nt = ntDe(q), [m] = so(q.q, "Để hoà tan hết # g đồng"), pt = ptCua(q, "Cu", "FeCl₃"); return molTheoPT(pt, "Cu", m / nt.Cu, "FeCl₃") * KL("FeCl₃", nt); } },
  { id: "hh2", has: "Phức chất [Cr(CO)₆] không mang điện tích", right: () => {
    const p = docPhuc("[Cr(CO)₆]"); assert.ok(p.q === 0 && p.L.length === 1); return (p.tam === 0 ? "nguyên tử " : "ion ") + ionTen(p.M, p.tam) + " và " + (DIEN_PT[p.L[0].f] === 0 ? "phân tử " : "ion ") + p.L[0].f; } },
  { id: "hh2", has: "Ion Cr³⁺ liên kết với 6 phân tử NH₃ tạo thành phức chất X", essay: (q) => {
    const nt = ntDe(q), X = "[Cr(NH₃)₆]³⁺", px = docPhuc(X), Y = docPhuc("[Ni(CN)₄]²⁻"), muoi = "K₂[Ni(CN)₄]", M = KL(muoi, nt), pct = (nt.Ni / M) * 100;
    assert.ok(px.tam === 3 && px.n === 6 && Y.n === 4 && new RegExp(escRe(muoi)).test(q.q));
    coThang(q, "X là " + X + ", điện tích +" + px.q, "x + " + Y.n + " · (−1) = −2 nên Ni có số oxi hoá +" + Y.tam + "; Y có " + Y.n + " phối tử CN⁻", "dạng " + HINH[Y.n].join(" hoặc "),
      "M(" + muoi + ") = 2 · 39 + 59 + 4 · 26 = " + vn(M) + " g/mol", "= 59/" + vn(M) + " · 100% ≈ " + vnf(pct, 1) + "%");
    assert.equal(dapSo(q), "a) " + X + ", điện tích +" + px.q + "; b) Ni có số oxi hoá +" + Y.tam + ", " + Y.n + " phối tử; c) " + HINH[Y.n].join(" hoặc ") + "; d) khoảng " + vnf(pct, 1) + "%."); } },
  { id: "hh2", has: "Cho phản ứng [Ag(NH₃)₂]⁺ + 2CN⁻ → [Ag(CN)₂]⁻ + 2NH₃", right: (q) => {
    const pt = q.q.match(PT)[0], [tr, sau] = tach(pt).map((v) => v.filter((s) => /^\[/.test(s.f)).map((s) => docPhuc(s.ten)));
    assert.ok(tr.length === 1 && sau.length === 1 && canBang(pt)); const c = /^Phức chất (\S+) mang điện tích ([−+])(\d)\.$/.exec(q.o[2]); assert.ok(c);
    const thePT = tr[0].M === sau[0].M && tr[0].L.map((l) => l.f).join() !== sau[0].L.map((l) => l.f).join();
    return [thePT, tr[0].n === sau[0].n, docPhuc(c[1]).q === (c[2] === "+" ? 1 : -1) * +c[3], null]; } },
  { id: "hh2", has: "Để chuyển hết 0,015 mol ion Cu²⁺", right: (q) => {
    const [n] = so(q.q, "Để chuyển hết # mol ion Cu²⁺"), [C] = so(q.q, "dung dịch NH₃ # M"), pt = ptCua(q, "Cu²⁺", "NH₃"); return (molTheoPT(pt, "Cu²⁺", n, "NH₃") / C) * 1000; } },
  { id: "hh2", has: "Một liều thuốc tiêm chứa 30 mg cisplatin", right: (q) => {
    const nt = ntDe(q), [m] = so(q.q, "chứa # mg cisplatin"), f = /cisplatin (\[[^\]]+\])/.exec(q.q)[1], p = docPhuc(f); assert.ok(p.q === 0 && p.tam === 2, "cisplatin: Pt²⁺, không mang điện tích");
    return (m * nt.Pt) / KL(f, nt); } }
];

/* ---------- chạy kiểm tra ---------- */
let n = 0;
const daKiem = new Set();
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
  const tim = (has) => MON.flatMap((m) => m.kho).find((q) => q.q.includes(has)), cauNt = tim("đồ thị biểu diễn số hạt nhân N chưa bị phân rã"), nt = cauNt.svg;
  const rNt = CHECKS.find((c) => c.has.startsWith("đồ thị biểu diễn số hạt nhân")).right;
  assert.throws(() => docLuoi(nt.replace(">8<", ">9<"), "thử"), /tỉ lệ/);
  assert.throws(() => docLuoi(nt.replace('x1="133" y1="40" x2="133" y2="200"', 'x1="135" y1="40" x2="135" y2="200"'), "thử"), /lưới đều/);
  assert.throws(() => docLuoi(nt.replace(">t (ngày)<", ">t (giây)<"), "thử"), /tên hai trục/);
  // đường biểu diễn lệch khỏi hàm mũ, chu kì bán rã khác: bộ kiểm tra báo
  const lech = nt.replace(/(<polyline points="(?:\S+ ){4})([\d.]+),([\d.]+)/, (s, a, x, y) => a + x + "," + (+y - 6));
  assert.throws(() => rNt(Object.assign({}, cauNt, { svg: lech })), /hàm mũ/);
  const g = docLuoi(nt, "thử"); assert.ok(gan(tai(g.net, 0), 16) && gan(luc(g.net, 8), 3, 1e-3) && gan(tai(g.net, 6), 4, 1e-3));
  // hạt nhân, phản ứng hạt nhân
  assert.deepEqual(phanUng("¹⁹₉F + ¹₁H → ¹⁶₈O + X"), { A: 4, Z: 2 }); assert.equal(phanUng("²₁H + ³₁H → ⁴₂He + ¹₀n"), null);
  assert.throws(() => phanUng("²₁H + ²₁H → ⁴₂He + ¹₀n"), /bảo toàn/); assert.throws(() => hatNhan("²³⁸₉₀U"), /số proton/); assert.throws(() => hatNhan("²₀n"), /số khối/);
  assert.deepEqual("Cho phản ứng ²₁H + ³₁H → ⁴₂He + ¹₀n. Hạt".match(PTHN), ["²₁H + ³₁H → ⁴₂He + ¹₀n"]);
  // phương trình: cân bằng cả electron, phức chất, phương trình chuẩn độ
  assert.ok(canBang("Co → Co²⁺ + 2e") && canBang("AgCl + 2NH₃ → [Ag(NH₃)₂]⁺ + Cl⁻") && canBang("Zn(OH)₂ + 2OH⁻ → [Zn(OH)₄]²⁻") && canBang("Cu²⁺ + 4NH₃ + 2H₂O → [Cu(NH₃)₄(H₂O)₂]²⁺"));
  assert.ok(canBang("10FeSO₄ + 2KMnO₄ + 8H₂SO₄ → 5Fe₂(SO₄)₃ + K₂SO₄ + 2MnSO₄ + 8H₂O") && !canBang("10FeSO₄ + 2KMnO₄ + 8H₂SO₄ → 5Fe₂(SO₄)₃ + K₂SO₄ + 2MnSO₄ + 4H₂O"));
  assert.ok(!canBang("Zn(OH)₂ + 2OH⁻ → [Zn(OH)₄]⁻") && !canBang("Cu²⁺ + 2NH₃ + 2H₂O → [Cu(NH₃)₄(H₂O)₂]²⁺") && !canBang("Co → Co²⁺ + e"));
  assert.deepEqual("Thêm AgCl + 2NH₃ → [Ag(NH₃)₂]⁺ + Cl⁻ rồi Zn(OH)₂ + 2OH⁻ → [Zn(OH)₄]²⁻.".match(PT), ["AgCl + 2NH₃ → [Ag(NH₃)₂]⁺ + Cl⁻", "Zn(OH)₂ + 2OH⁻ → [Zn(OH)₄]²⁻"]);
  assert.ok(KL("MgCO₃·CaCO₃") === 184 && KL("K₂[Ni(CN)₄]") === 241 && KL("[PtCl₂(NH₃)₂]") === 300 && KL("Ba(NO₃)₂") === 261);
  // phức chất, số oxi hoá, cấu hình electron của ion
  const p = docPhuc("[Cu(NH₃)₄(H₂O)₂]²⁺"); assert.ok(p.M === "Cu" && p.n === 6 && p.tam === 2 && docPhuc("[Fe(CN)₆]³⁻").tam === 3 && docPhuc("[PtCl₄(NH₃)₂]").tam === 4);
  assert.throws(() => docPhuc("[Fe(SCN)₆]³⁻"), /phối tử SCN/);
  assert.ok(oxh("V₂O₅", "V") === 5 && oxh("KMnO₄", "Mn") === 7 && oxh("Fe₂(SO₄)₃", "Fe") === 3);
  assert.ok(ionCH(CH.Fe, 3) === "[Ar]3d⁵" && ionCH(CH.Cu, 2) === "[Ar]3d⁹" && ionCH(CH.Co, 2) === "[Ar]3d⁷" && ionCH(CH.Mn, 2) === "[Ar]3d⁵");
  assert.ok(xuHuong("Độ tan trong nước của các hydroxide tăng dần từ Mg(OH)₂ đến Ba(OH)₂.") && !xuHuong("Tính khử của các kim loại giảm dần từ Mg đến Ba."));
  assert.ok(val("1 600") === 1600 && gan(val("4,0 · 10⁸"), 4e8) && gan(val("1,66 · 10⁻²⁷"), 1.66e-27) && sci(1.8e14, 1) === "1,8 · 10¹⁴" && sci(3.99e14, 1) === "4,0 · 10¹⁴" && sci(9.96e-3, 1) === "1,0 · 10⁻²");
}

/* ---------- chữ ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.unit || [], (q.rubric || []).map((c) => c.c)).map(String);
MON.forEach((m) => m.kho.forEach((q) => {
  const at = ten.get(q) + ": " + q.q.slice(0, 50);
  chu(q).forEach((s) => {
    // số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân (năm viết liền: “năm 1939”)
    assert.ok(!/(?<![,\d])\d{4,}/.test(s.replace(/năm (\d{4})/g, "năm")) && !/\d\.\d/.test(s), at + ": số viết sai cách: " + s);
    // công thức, kí hiệu viết bằng chữ số dưới dòng (H₂SO₄, U₂), không viết H2SO4, U2
    assert.ok(!/(?:^|[^\p{L}])(?:[A-Z][a-z]?)+\d/u.test(s), at + ": công thức cần chữ số dưới dòng: " + s);
    // dấu thanh kiểu sách (hoá, thuỷ, toả, hoà, tuỳ); tên chất, thuật ngữ như sách
    assert.ok(!/(?<![\p{L}])(?:hóa|hòa|thủy|tỏa|hủy|tùy|khỏe|lũy)(?![\p{L}])/iu.test(s), at + ": dấu thanh kiểu mới: " + s);
    assert.ok(!/(?<![\p{L}])(?:axit|bazơ|clo|clorua|natri|kali|liti|magie|nhôm oxit|sắt oxit|brom|iot|hiđro|hidro|cacbon|nitơ|oxi(?! hoá)|sunfat|sunfua|nitrat|amoniac|sođa|crom|coban|niken|mangan|vanađi|titan|bari|canxi|kẽm blend|xút ăn da|oxy hoá|số phối trí|nơtron|prôtôn|êlectron|urani|phốt pho|hạt nhân nguyên tử khối)(?![\p{L}])/iu.test(s), at + ": tên chất, thuật ngữ khác sách: " + s);
    assert.ok(!/Len-?xơ|[FP]h?a-?ra-?đây|Rơ-?dơ-?pho|Anh-?xtanh|Ốt-?tô|Mác-?xoen|Bếch-?cơ-?ren/u.test(s), at + ": tên nhà khoa học viết như sách (Rutherford, Einstein, Otto Hahn): " + s);
    // độ C viết °C, cách số một khoảng trắng
    assert.ok(!/\d°C|\d ?oC\b/.test(s), at + ": đơn vị viết khác sách: " + s);
  });
  if (q.type === "num" && q.unit) assert.ok(q.unit.length <= 5, at + ": đơn vị ngắn");
}));
// mọi phương trình hoá học trong câu Hoá học cân bằng; mũi tên trong câu Hoá học chỉ dùng trong phương trình
let soPT = 0, soPTHN = 0;
HH.kho.forEach((q) => chu(q).forEach((s) => {
  (s.match(PT) || []).forEach((pt) => { assert.ok(canBang(pt), ten.get(q) + ": phương trình chưa cân bằng: " + pt); soPT++; });
  assert.ok(!/→|⇌/.test(s.replace(PT, "")), ten.get(q) + ": mũi tên ngoài phương trình: " + s);
  e0De(s);
  // phức chất nào cũng đọc được (phối tử có trong bảng), nguyên tử trung tâm mang điện tích dương hoặc bằng 0
  phucTrong(s).forEach((t) => { const p = docPhuc(t); assert.ok(p.tam >= 0 && p.tam <= 4, ten.get(q) + ": điện tích của nguyên tử trung tâm trong " + t); });
}));
assert.ok(soPT > 0, "có phương trình hoá học");
// Vật lí: mũi tên chỉ ở phương trình phản ứng hạt nhân (bảo toàn số khối và điện tích); kí hiệu hạt nhân nào cũng đúng số proton của nguyên tố
VL.kho.forEach((q) => chu(q).forEach((s) => {
  (s.match(PTHN) || []).forEach((pt) => { phanUng(pt); soPTHN++; });
  assert.ok(!/→|⇌/.test(s.replace(PTHN, "")), ten.get(q) + ": mũi tên ngoài phương trình phản ứng hạt nhân: " + s);
  (s.match(new RegExp(HN, "gu")) || []).forEach((t) => hatNhan(t));
}));
assert.ok(soPTHN > 0, "có phương trình phản ứng hạt nhân");

/* ---------- lời dặn, mức độ, ma trận ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
MON.forEach((m) => {
  const M = m.M, cells = Object.values(M), CHU_DE = m.CHU_DE, soBai = Object.fromEntries(m.BAI);
  assert.ok(m.kho.every((q) => [1, 2, 3].includes(q.lv)), m.ma + ": câu nào cũng cần lv");
  assert.ok(cells.every(Array.isArray), m.ma + ": ma trận ghi theo [Biết, Hiểu, Vận dụng]");
  assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], m.ma + ": ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
  assert.equal(sum(cells.map(sum)), m.pool.n, m.ma + ": tổng ma trận bằng n");
  assert.deepEqual(Object.keys(M), CHU_DE, m.ma + ": chủ đề theo tên bài, thứ tự bài của sách");
  CHU_DE.forEach((t) => assert.ok(("chu-de:12:" + m.ma + ":" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
  // mọi bài trong phạm vi có chủ đề, trừ bài tập, ôn tập
  for (let b = m.TU; b <= m.DEN; b++) assert.ok(m.KHONG.includes(b) !== m.BAI.some((x) => x[1] === b), m.ma + ": Bài " + b + " có chủ đề riêng khi không là bài tập, ôn tập");
  // chủ đề ôn đúng chữ chủ đề của kho giữa kì II; chủ đề mới không trùng chủ đề của kho giữa kì II, cuối kì I
  CHU_DE.forEach((t) => { const on = m.ON_T.includes(t); assert.equal(!!m.gk2M[t], on, m.ma + ": chủ đề " + t + (on ? " phải đúng chữ chủ đề của kho giữa kì II" : " trùng chủ đề của kho giữa kì II")); assert.ok(!m.ck1M[t], m.ma + ": chủ đề trùng kho cuối kì I: " + t); });
  // phần trọng tâm nhiều câu hơn phần ôn
  const dem_ = ([tu, den]) => sum(CHU_DE.filter((t) => soBai[t] >= tu && soBai[t] <= den).map((t) => sum(M[t])));
  assert.ok(dem_(m.TAM) > dem_(m.ON), m.ma + ": phần trọng tâm (" + dem_(m.TAM) + " câu) nhiều hơn phần ôn (" + dem_(m.ON) + " câu)");
  m.DE.forEach((id) => {
    const qs = m.kho.filter((q) => q.src === id);
    assert.deepEqual([...new Set(qs.map((q) => q.topic))], CHU_DE, id + ": đủ chủ đề, đúng thứ tự");
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => qs.filter((q) => q.topic === t && q.lv === l).length), v, id + " đúng ma trận ở chủ đề " + t));
    // lời dặn: sách, phạm vi, số câu mỗi phần (tính từ ma trận), trường học khác phạm vi, câu về đề chung của Sở
    const note = bank(id).note;
    assert.ok(note.startsWith("Sách Kết nối tri thức, " + (m.ma === "hoahoc" ? "Hoá học" : m.ten) + " 12. " + m.DAU), id + ": lời dặn mở đầu bằng sách, phạm vi");
    m.PHAN.forEach(([p, tu, den]) => { const k = dem_([tu, den]); assert.ok(note.includes(p + " " + k + " câu"), id + ": lời dặn ghi “" + p + " " + k + " câu”"); });
    assert.equal(sum(m.PHAN.map(([, tu, den]) => dem_([tu, den]))), m.pool.n, m.ma + ": các phần của lời dặn phủ hết ma trận");
    m.SAU.forEach((s) => assert.ok(note.includes(s), id + ": lời dặn có “" + s + "”"));
    assert.ok(note.endsWith("Một số câu cần máy tính cầm tay. Có lời giải từng câu. " + SO), id + ": lời dặn kết thúc bằng câu về đề chung của Sở");
  });
  // chủ đề đúng tên bài trong mục lục (README của cuốn ở OnUp-Book); bài không có chủ đề riêng là bài tập, ôn tập
  const readme = path.join(BOOK, "lop-12", m.sach, "README.md");
  if (fs.existsSync(readme)) {
    const ml = Object.fromEntries([...fs.readFileSync(readme, "utf8").matchAll(/Bài (\d+)\. ([^|]+?) \|/g)].map((x) => [+x[1], x[2].trim()]));
    m.BAI.forEach(([t, b]) => assert.equal(t, ml[b], m.ma + ": tên Bài " + b + " theo mục lục"));
    m.KHONG.forEach((b) => assert.ok(/^(?:Bài tập|Ôn tập)/.test(ml[b]), m.ma + ": Bài " + b + " (" + ml[b] + ") không có chủ đề riêng"));
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
    assert.ok(q.o.length === 4 && q.o[0].length <= Math.max(1.2 * L, L + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q) + " " + q.q.slice(0, 50));
    assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + q.q.slice(0, 50));
    const c = chuThuong(q.topic), tu = c.length === 1 ? c : c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số)( |$)/u.test(w));
    tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); assert.ok(!(co[0] && !co.slice(1).some(Boolean)), `chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề: ${ten.get(q)} ${q.q.slice(0, 60)}`); });
    const dau = q.o.map((o) => o.split(" ")[0]);
    assert.ok(!(dau.slice(1).every((d) => d === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1), "ba lựa chọn sai cùng mở đầu bằng “" + dau[1] + "”: " + ten.get(q) + " " + q.q.slice(0, 50));
  });
  // đáp án đúng là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba và không dưới một phần sáu số câu nhiều lựa chọn
  const le = mc.filter((q) => { const L = q.o.map((o) => o.length); return L[0] > Math.max(...L.slice(1)) || L[0] < Math.min(...L.slice(1)); });
  assert.ok(le.length * 3 <= mc.length && le.length * 6 >= mc.length, `${m.ma}: đáp án đúng dài nhất hoặc ngắn nhất ở ${le.length}/${mc.length} câu: ` + le.map((q) => ten.get(q)).join(", "));
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
  const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ""), deBai = BANKS.filter((b) => b.file === m.file && !b.pool).flatMap((b) => b.questions).map((q) => ({ q, k: goc(q.q) }));
  m.kho.forEach((q) => { const cung = deBai.filter((e) => e.k === goc(q.q)); assert.equal(cung.length, 1, "đề bài trùng câu khác trong " + m.file + ": " + ten.get(q)); });
});

/* ---------- so với kho giữa kì II, cuối kì I cùng môn ----------
   Đề bài không gần trùng: cặp hai âm tiết liền nhau (Rút ra N25; như tests/khtn9-gk1.js): đề bài cùng các lựa chọn có từ 4 cặp chung với một
   câu của kho kia và số cặp chung từ một nửa số cặp của câu ít cặp hơn thì báo. Không tính cặp có số hay chữ đơn, cặp của nhãn chủ đề, cụm
   chung của đề (CUM) và cặp có ở từ 3% số câu của file. */
const khongDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const TU_CHUNG = [...VL.BAI, ...HH.BAI].map((b) => b[0]).concat(["mỗi ý sau đúng hay sai", "làm tròn kết quả đến chữ số thập phân thứ hai", "làm tròn kết quả đến chữ số thập phân thứ nhất",
  "ở điều kiện chuẩn", "thể tích mol khí ở điều kiện chuẩn là", "viết phương trình hoá học của phản ứng", "sau khi các phản ứng xảy ra hoàn toàn", "trình bày lời giải",
  "vuông góc với các đường sức từ", "song song với các đường sức từ", "hợp với các đường sức từ một góc", "các đường sức của một từ trường đều", "lực từ tác dụng lên đoạn dây",
  "số avogadro bằng", "khối lượng mol của", "lấy ln 2", "kim loại chuyển tiếp dãy thứ nhất", "nguyên tử trung tâm", "phức chất không mang điện tích", "mỗi phối tử",
  // cách hỏi, cách cho số liệu chung của môn (không phải nội dung riêng của một câu)
  "có độ lớn bằng bao nhiêu", "suất điện động cảm ứng", "mỗi vòng có diện tích", "từ trường đều có các đường sức từ", "điện áp giữa hai đầu một đoạn mạch có biểu thức",
  "kim loại nào sau đây", "phản ứng xảy ra hoàn toàn",
  // tên chương của sách, thuật ngữ của bài (như sách)
  "đại cương về kim loại", "sơ lược về dãy kim loại chuyển tiếp thứ nhất và phức chất", "nguyên tố nhóm ia và nhóm iia", "vật lí hạt nhân",
  "năng lượng liên kết riêng", "chu kì bán rã", "phản ứng phân hạch dây chuyền", "đơn vị khối lượng nguyên tử", "cặp electron chưa liên kết", "orbital trống",
  "phản ứng thế phối tử", "tốc độ ánh sáng trong chân không", "từ trường đều có cảm ứng từ"])
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
{
  const CUM = ["mỗi ý sau đúng hay sai", "nhận xét nào sau đây đúng", "làm tròn kết quả đến chữ số thập phân thứ hai", "thể tích mol khí", "điều kiện chuẩn", "trình bày lời giải"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => c.split(" ").every((x) => /\p{L}{2}/u.test(x))); };
  const gan_ = [], trungOn = [];
  MON.forEach((m) => {
    const ca = BANKS.filter((b) => b.file === m.file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)), df = {};
    ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
    const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nhan.has(c) && df[c] < 0.03 * ca.length)); };
    m.kho.forEach((q) => { const c = capAm(q); m.ck1.concat(m.gk2).forEach((p) => { const d = capAm(p), chung = [...c].filter((x) => d.has(x)); if (chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size)) gan_.push(`${ten.get(q)} ~ ${ten.get(p)}: ${chung.join(", ")}`); }); });
    // câu ôn không trùng câu cùng chủ đề của kho giữa kì II: đề bài, chuỗi 6 từ của đề bài, đáp án
    m.kho.filter((q) => m.ON_T.includes(q.topic)).forEach((q) => m.gk2.filter((p) => p.topic === q.topic).forEach((p) => {
      const at = ten.get(q) + " ~ " + ten.get(p) + ": ";
      if (gocChu(q.q) === gocChu(p.q)) trungOn.push(at + "đề bài trùng");
      const c6 = chuoi(q.q, 6).filter((c) => (" " + khongDau(p.q) + " ").includes(" " + c + " "));
      if (c6.length) trungOn.push(at + "chuỗi 6 từ của đề bài: " + c6.join(" | "));
      if (q.type === "mc" && p.type === "mc" && gocChu(q.o[0]) === gocChu(p.o[0])) trungOn.push(at + "đáp án trùng");
      if (q.type === "num" && p.type === "num" && gan(q.ans, p.ans) && (q.unit || "") === (p.unit || "")) trungOn.push(at + "đáp án số trùng");
    }));
  });
  assert.deepEqual(gan_, [], "đề bài gần trùng câu của kho cuối kì I, giữa kì II");
  assert.deepEqual(trungOn, [], "câu ôn trùng câu cùng chủ đề của kho giữa kì II");
}

/* ---------- dò lộ đáp án giữa hai câu rút được cùng lúc ----------
   Đề ngẫu nhiên rút một câu mỗi ô (một số ô rút 2), đề “Ôn chủ đề” rút chung mọi câu của một chủ đề (trừ tự luận), nên xét mọi cặp câu
   cùng môn, trừ cặp có câu tự luận nằm cùng một ô rút 1 câu; lời dặn (note) hiện ở màn mở đề nên cũng xét (Rút ra RS9). Đề “Ôn chủ đề” của
   các chủ đề ôn rút chung câu của kho này và kho giữa kì II, nên xét thêm mọi cặp câu cùng chủ đề của hai kho (trừ tự luận). Đáp án là số
   (trả lời ngắn, lựa chọn đúng dạng “1,8 · 10¹⁴ J”; từ hai chữ số, hoặc số thập phân, hoặc có luỹ thừa của 10) tìm ở vị trí kết quả của câu
   kia (ngay sau “=”, “≈”, “là”, “bằng”, “được”; không tính số đứng trước một phép tính, nguyên tử khối trong “(Cho …)”, số hiệu nguyên tử
   “Z = 21”) cùng đơn vị: không
   được có. Đáp án bằng chữ tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy cả đáp án); chuỗi có trong đề bài, lựa
   chọn, lời giải của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM, DA_XEM_CHU_DE. */
const DON_VI = "(?:MeV\\/nucleon|MeV|eV|rad\\/s|m\\/s²|m\\/s|MHz|Hz|mWb|Wb|MW|W|Bq|ngày|năm|kg\\/m³|g\\/cm³|g\\/mol|mol\\/L|cm²|cm|m³|mL|mg|ms|mol|kg|kJ|tấn|vòng|lần|lít|amu|L|T|N|V|A|Ω|J|M|g|s|m|%)";
const soDV = new RegExp("^(" + NUM + ")(?: ?\\(?(" + DON_VI + ")\\)?)?$", "u");
// “10⁵” (luỹ thừa viết liền) không phải số 10
const KQ = new RegExp("(?:=|≈|(?:^|[\\s(])(?:là|bằng|được))\\s+(" + NUM + ")(?![\\d,⁰¹²³⁴⁵⁶⁷⁸⁹])(?!\\s*[·+−:×/](?:\\s|\\d|\\())(?: ?\\(?(" + DON_VI + ")(?![\\p{L}]))?", "gu");
const kqSo = (s) => [...String(s).replace(/\(Cho [^)]*\)/g, " ").replace(/(?<![\p{L}])Z = \d+/gu, " ").matchAll(KQ)].map((x) => ({ v: val(x[1]), u: x[2] || "" }));
const tuCua = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum3 = (s) => { const w = tuCua(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
// chuỗi 3 từ chung của môn (thuật ngữ, cách nói của bài học) không làm lộ đáp án nào: bỏ qua khi là một phần của đáp án dài hơn
const CUM_CHUNG = new Set(["các đường sức", "đường sức từ", "với các đường", "song song với", "vuông góc với", "cảm ứng từ", "từ trường đều", "của dòng điện",
  "dòng điện chạy", "suất điện động", "điện động cảm", "động cảm ứng", "từ thông qua", "cuộn sơ cấp", "cuộn thứ cấp", "của hạt nhân", "hạt nhân nằm",
  "phản ứng hạt", "ứng hạt nhân", "phân hạch dây", "hạch dây chuyền", "năng lượng liên", "lượng liên kết", "liên kết riêng", "tia phóng xạ", "chất phóng xạ",
  "độ phóng xạ", "chu kì bán", "kì bán rã", "hệ số nhân", "số nhân neutron", "lò phản ứng", "của kim loại", "ion kim loại", "kim loại thành", "nguyên tử kim",
  "tử kim loại", "kim loại trong", "tác dụng với", "ở nhiệt độ", "nhiệt độ thường", "nhiệt độ cao", "của phức chất", "phức chất có", "nguyên tử trung", "tử trung tâm",
  "phối tử nh₃", "có trong dung", "trong dung dịch", "dung dịch nh₃", "kim loại chuyển", "loại chuyển tiếp", "chuyển tiếp dãy", "tiếp dãy thứ", "dãy thứ nhất",
  "ion cu²⁺", "trong tự nhiên", "của nước cứng", "khối lượng của", "của nguyên tử", "thông qua mỗi", "qua mỗi vòng", "hoạt động hoá", "động hoá học",
  "bị ăn mòn", "ăn mòn điện", "mòn điện hoá", "dung dịch chất", "dịch chất điện", "chất điện li", "tạo thành phức", "thành phức chất", "dòng điện cảm",
  "điện cảm ứng", "điện chạy qua", "mặt phẳng khung", "đoạn dây dẫn", "xuất hiện trong", "của nam châm", "cách đều nhau"]);
const NOTES = MON.flatMap((m) => [...new Set(m.DE.map((id) => bank(id).note))].map((s, i) => { const o = { q: m.ki + "-note" + (i + 1), x: s, topic: "note", type: "note", lv: 0 }; ten.set(o, o.q); return o; }));
const doLo = (qs, M, tenCau, them = [], cap = () => true) => {
  const lo = [], chuLo = [], cungLuc = (p, q) => p !== q && (p.type === "note" || p.topic !== q.topic || (p.type !== "essay" && q.type !== "essay") || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2);
  const chuP = (p) => (p.type === "note" ? [p.x] : chu(p));
  qs.forEach((q) => {
    let soDa = [], C = [];
    if (q.type === "num") soDa = [{ v: q.ans, u: q.unit || "" }];
    else if (q.type === "mc") { const x = soDV.exec(q.o[0]); if (x) soDa = [{ v: val(x[1]), u: x[2] || "" }]; else { const c3 = cum3(q.o[0]); C = [...new Set(c3.length > 1 ? c3.filter((c) => !CUM_CHUNG.has(c)) : c3)]; } }
    soDa = soDa.filter((d) => Math.abs(d.v) >= 10 || !Number.isInteger(d.v));
    qs.concat(them).forEach((p) => {
      if (!cungLuc(p, q) || !cap(p, q)) return;
      const at = `${tenCau(p)} → ${tenCau(q)}: `, T = " " + chuP(p).map((s) => tuCua(s).join(" ")).join(" | ") + " ";
      soDa.filter((d) => chuP(p).flatMap(kqSo).some((y) => gan(y.v, d.v) && (!y.u || !d.u || y.u === d.u || (y.u + d.u).replace("lít", "L") === "LL"))).forEach((d) => lo.push(at + vn(d.v) + " " + d.u));
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
const lo = [], chuLo = [], loCD = [], chuLoCD = [];
MON.forEach((m) => {
  const r = doLo(m.kho, m.M, (q) => ten.get(q), NOTES.filter((o) => o.q.startsWith(m.ki))); lo.push(...r.lo); chuLo.push(...r.chuLo);
  // cùng chủ đề với kho giữa kì II (đề “Ôn chủ đề”, không có câu tự luận): chỉ xét cặp một câu của kho này, một câu của kho kia
  const cuaKhoNay = (q) => m.kho.includes(q), on = m.kho.filter((q) => m.ON_T.includes(q.topic)).concat(m.gk2.filter((q) => m.ON_T.includes(q.topic))).filter((q) => q.type !== "essay");
  const r2 = doLo(on, Object.assign({}, m.gk2M, m.M), (q) => ten.get(q), [], (p, q) => p.topic === q.topic && cuaKhoNay(p) !== cuaKhoNay(q)); loCD.push(...r2.lo); chuLoCD.push(...r2.chuLo);
});
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuLo.join("\n") + "\nĐáp án bằng chữ có ở câu cùng chủ đề của kho giữa kì II (xem tay):\n" + chuLoCD.join("\n"));
// đã xem (Phiên N12-ck2-vatli-hoahoc): chữ chung, câu kia không nói tới điều câu này hỏi. “một quả cầu”: hai câu coi hạt nhân là quả cầu,
// không nói về lực từ; “cuộn thứ cấp”: câu máy biến áp nhắc cả hai cuộn, không nói cuộn dây trong điện thoại đóng vai trò gì; “⁴₂He”: phản ứng
// tổng hợp và câu tia α có ⁴₂He nhưng không cho số khối, điện tích của hạt X; “k = 1”: câu k = 1,05 không nói thanh điều khiển dùng để làm gì;
// “sóng vô tuyến”: lựa chọn sai của câu hỏi sóng nào không phải sóng điện từ, không nói bước sóng; “phóng xạ vào”: đặt mẫu chất phóng xạ vào lò nung; “FeCl₃”, “FeCl₂”: lựa chọn sai, dung dịch FeCl₃ hoà tan đồng, không nói sắt tác dụng với
// chlorine hay HCl tạo muối nào; “dụng với nước”: câu nhóm IIA nói beryllium, magnesium, calcium, barium, không nói potassium.
const DA_XEM = ["vl1#12 → vl1#1: một quả cầu", "vl2#12 → vl1#1: một quả cầu", "vl2#7 → vl1#7: cuộn thứ cấp", "vl2#17 → vl1#16: ⁴₂he", "vl2#18 → vl1#16: ⁴₂he",
  "vl2#25 → vl1#23: k = 1", "vl1#8 → vl2#8: sóng vô tuyến", "vl1#20 → vl2#23: phóng xạ vào", "hh2#3 → hh1#3: fecl₃", "hh2#18 → hh1#3: fecl₃", "hh1#9 → hh1#4: dụng với nước", "hh1#3 → hh2#3: fecl₂"];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n"));
// đã xem: “cuộn thứ cấp”: hai câu máy biến áp của kho giữa kì II, không nói về sạc không dây; “ăn mòn nhanh”, “sắt hoạt động”, “hoá học
// mạnh hơn”: hai câu ống gang, ống thép của kho giữa kì II nói kim loại hoạt động hoá học mạnh hơn bị ăn mòn (cùng nguyên tắc của bài), không
// nói về sắt tráng thiếc; “Fe₂O₃”: chất trong hỗn hợp oxide bị khử, không nói tên quặng.
const DA_XEM_CHU_DE = ["gk2-vl1#21 → vl1#7: cuộn thứ cấp", "gk2-vl1#22 → vl1#7: cuộn thứ cấp", "gk2-hh1#20 → hh1#7: ăn mòn nhanh", "gk2-hh1#20 → hh1#7: sắt hoạt động",
  "gk2-hh1#21 → hh1#7: ăn mòn nhanh", "gk2-hh1#21 → hh1#7: hoá học mạnh", "gk2-hh1#21 → hh1#7: học mạnh hơn", "hh1#5 → gk2-hh2#14: fe₂o₃"];
assert.deepEqual(chuLoCD, DA_XEM_CHU_DE, "đáp án bằng chữ có ở câu cùng chủ đề của kho giữa kì II đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM_CHU_DE");
assert.deepEqual(loCD, [], "lộ đáp án giữa câu cùng chủ đề của hai kho:\n" + loCD.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “≈ 168,6 g”, “= 1,8 · 10¹⁴ J”, “là 16,25 g”, cụm của đáp án bằng chữ; nguyên tử khối đề cho không tính
{
  const tim = (has) => MON.flatMap((m) => m.kho).find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thuLo = (qs) => { const r = doLo(qs, Object.assign({}, VL.M, HH.M), (q) => q.q.slice(0, 12)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  const khac = tim("Sóng nào sau đây KHÔNG phải là sóng điện từ?"), khacH = tim("Muối nào sau đây gần như không tan trong nước?");
  assert.deepEqual(thuLo([tim("Một tàu phá băng chạy bằng năng lượng hạt nhân"), gia(khac, "Ví dụ m ≈ 168,6 g.")]), ["168,6 g"]);
  assert.deepEqual(thuLo([tim("Một tàu phá băng chạy bằng năng lượng hạt nhân"), gia(khac, "Ví dụ m ≈ 168,6 V.")]), []);
  assert.deepEqual(thuLo([tim("Năng lượng nghỉ của 2 g vật chất"), gia(khac, "Khi đó E = 1,8 · 10¹⁴ J.")]), ["180 000 000 000 000 J"]);
  assert.deepEqual(thuLo([tim("hoà tan lớp đồng trên bảng mạch điện tử"), gia(khacH, "Khối lượng là 16,25 g.")]), ["16,25 g"]);
  assert.deepEqual(thuLo([tim("Hoà tan hết 2,87 g AgCl bằng dung dịch NH₃"), Object.assign({}, khacH, { q: khacH.q + " (Cho Ca = 40.)" })]), []);
  assert.ok(thuLo([tim("Không thể điều chế sodium bằng cách cho kim loại potassium"), gia(khacH, "Vì potassium tác dụng với nước có trong dung dịch.")]).length > 0);
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ----------
   Cụm từ chung của môn (tên bài, cách nói chuẩn khi cho số liệu) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ. */
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const tatCa = MON.flatMap((m) => m.kho), chuMoi = (q) => (q.type === "note" ? [q.x] : chu(q));
if (SACH.length) {
  MON.forEach((m) => assert.ok(SACH.some((f) => f.includes(m.sach)), "OnUp-Book có " + m.sach));
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => tatCa.concat(NOTES).flatMap((q) => chuMoi(q).flatMap((s) => chuoi(s, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách và mục lục.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả kho cuối kì I, giữa kì II cùng file và câu
   riêng của các đề ngẫu nhiên; với kho cuối kì I cùng môn: đề bài không có chuỗi 6 từ nào trùng (Rút ra N9-gk1-toan) ---------- */
{
  const cua = (b, q) => ({ id: b.id, s: " " + chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " });
  const ngoai = (b) => !MON.some((m) => m.DE.includes(b.id) || m.pool === b);
  const khac = BANKS.filter((b) => !b.pool && ngoai(b)).flatMap((b) => b.questions.map((q) => cua(b, q)))
    .concat(BANKS.filter((b) => b.pool && ngoai(b)).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cua(b, q))));
  const bao = (k) => tatCa.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
  const gan6 = MON.flatMap((m) => { const ck1 = m.ck1.map((q) => " " + khongDau(q.q) + " "); return m.kho.flatMap((q) => chuoi(q.q, 6).filter((c) => ck1.some((s) => s.includes(" " + c + " "))).map((c) => ten.get(q) + ": " + c)); });
  assert.deepEqual([...new Set(gan6)], [], "đề bài có chuỗi 6 từ trùng câu của kho cuối kì I");
}
MON.forEach((m) => console.log(`${m.ten} 12 cuối năm: kho ${m.kho.length} câu (${m.DE.length} đề cố định, ${m.pool.n} câu mỗi đề), ma trận 10 – 8 – 7 trên ${Object.keys(m.M).length} chủ đề (${m.ON_T.length} chủ đề ôn); ` +
  `${m.kho.filter((q) => q.type === "tf4").length} câu đúng/sai 4 ý, ${m.kho.filter((q) => q.type === "num").length} câu trả lời ngắn, ${m.kho.filter((q) => q.type === "essay").length} câu tự luận, ${m.kho.filter((q) => q.svg).length} hình; đáp án đúng dài nhất hoặc ngắn nhất ở ${m.le} câu nhiều lựa chọn.`));
console.log(n + " câu đã tính lại hoặc đọc lại hình (" + soPT + " phương trình hoá học cân bằng, " + soPTHN + " phương trình phản ứng hạt nhân).");
console.log("MATH OK");
