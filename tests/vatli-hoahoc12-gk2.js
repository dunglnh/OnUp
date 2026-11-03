// Kiểm tra ngân hàng Vật lí 12 và Hoá học 12 giữa kì II của Phiên N12-gk2-vatli-hoahoc (data/banks/12-vatli.js, data/banks/12-hoahoc.js:
// mỗi môn hai đề cố định và đề ngẫu nhiên lấy câu của hai đề đó, không có câu riêng), theo mẫu tests/vatli-hoahoc12-ck1.js. Số đề, số câu
// lấy từ danh mục (không ghi cứng).
// Câu có phép tính hoặc có hình nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong kho, đúng đề ghi ở id); số liệu đọc từ chữ của
// đề, đáp án tính bằng code (so với ans, o[0] hoặc các ý tính được của câu đúng/sai 4 ý; câu tự luận so với thang chấm và đáp số).
// Vật lí (Bài 14–19): lực từ F = BILsinα (cả khi chỉ một phần dây nằm trong từ trường, khi tăng dòng điện, thanh treo cân bằng), suất
// điện động cảm ứng |e| = N · |ΔΦ|/Δt (đổi chiều từ trường, kéo khung ra khỏi từ trường, cảm ứng từ tăng đều), cường độ dòng điện cảm
// ứng, từ thông có đổi hay không khi vòng dây chuyển động, biến dạng; máy phát điện xoay chiều (ω, f, E₀ = NBSω), giá trị hiệu dụng,
// tần số, chu kì từ biểu thức i = I₀cos(ωt + φ), máy biến áp U₂/U₁ = N₂/N₁, bước sóng λ = v/f; cực Bắc của ống dây theo chiều dòng điện
// (quy tắc nắm bàn tay phải, tính bằng tích có hướng). Hình đọc lại bằng code: dây vuông góc với mặt phẳng hình (⊗, ⊙), chấm tròn là
// đường sức từ hướng ra, dây trong mặt phẳng hình có mũi tên chỉ chiều dòng điện, hai cực nam châm (chữ N, S trong hình chữ nhật), điểm
// có tên; cảm ứng từ quanh dây thẳng và lực từ F = I L × B tính bằng tích có hướng rồi so với hướng ghi trong đáp án; đường sức từ giữa
// hai cực song song, cách đều, cùng chiều từ N sang S; đồ thị từ thông, suất điện động theo thời gian trên lưới (gốc O, lưới đều, số ở
// trục đúng vạch và tỉ lệ với khoảng cách tới gốc, kể cả số âm, số thập phân; tên trục; đồ thị suất điện động là đường hình sin).
// Hoá học (Bài 16, 18–22, 24): thứ tự điện phân ở anode, cathode theo sách (Bài 16), tính theo phương trình hoá học (nguyên tử khối đề
// cho, đúng bảng; hệ số đọc từ phương trình trong đề hoặc lời giải): điện phân nóng chảy, điện phân dung dịch, kim loại với acid, với
// dung dịch muối (ion có tính oxi hoá mạnh hơn phản ứng trước), với chlorine, lưu huỳnh, nhiệt luyện, thành phần hợp kim, gang thành
// thép, gỉ sắt, sodium với nước, quá trình Solvay; thế điện cực chuẩn đúng bảng của sách (Bài 15), kim loại nào khử được nước, ion H⁺,
// ion kim loại, kim loại bảo vệ thép theo phương pháp điện hoá. Không có câu tính theo định luật Faraday (sách in năm 2026 không dạy).
// Mọi phương trình hoá học trong câu Hoá học cân bằng cả nguyên tố và điện tích (cả bán phản ứng có electron, công thức có nước kết
// tinh). Câu trả lời bằng số, câu có hình, câu tự luận nào cũng phải có kiểm tra ở đây.
// Rồi: chữ (số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân; công thức viết bằng chữ số dưới dòng; tên chất, tên nhà khoa học
// như sách; dấu thanh kiểu sách “hoá”, “thuỷ”), lời dặn của đề (phạm vi, số câu mỗi phần theo ma trận, bài học tiếp theo; không có câu về
// đề chung của Sở), môn, lịch thi và phạm vi của gk2-l12, mức độ và ma trận 10 – 8 – 7 (chủ đề theo tên bài và thứ tự của sách, đối chiếu
// mục lục trong README của cuốn ở OnUp-Book; hai đề cố định chia đúng ma trận), dạng câu theo khung Công văn 7991 (mỗi kho ít nhất 6 câu
// đúng/sai 4 ý không lặp kiểu Đ/S, ít nhất 4 câu trả lời ngắn đáp án là số, 1–2 câu tự luận ở ô Vận dụng rút 1 câu), đáp án đúng không
// dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba và không dưới một phần sáu số câu nhiều lựa
// chọn, không là lựa chọn duy nhất có chữ của nhãn chủ đề, rút thử nhiều lần (đúng ma trận; đã làm hết một đề cố định thì không rút lại câu của đề đó), đề bài không
// trùng, dò lộ đáp án giữa mọi cặp câu rút được cùng lúc (như tests/vatli-hoahoc12-ck1.js; đã xem ghi ở DA_XEM). So với kho cuối kì I
// cùng môn: không chủ đề nào trùng (không có câu ôn), đề bài không gần trùng (cặp hai âm tiết chung, chuỗi 6 từ chung). Có sách ở
// ../OnUp-Book thì so mọi trường chữ với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp nguyên âm (không chuỗi 8 từ nào trùng; DO_SACH=1 in
// chuỗi 6 từ) và với câu của mọi kho khác, cả kho cuối kì I và câu riêng của các đề ngẫu nhiên (không chuỗi 8 từ nào trùng; DO_KHO=1 in
// chuỗi 6 từ).
// Chạy: node tests/vatli-hoahoc12-gk2.js → in MATH OK.
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
   lục); PHAM_VI: phạm vi của môn ghi ở gk2-l12; SAU: câu lời dặn nhắc trường học khác phạm vi. */
const MON = [
  { ma: "vatli", ten: "Vật lí", sach: "vat-li-12", ki: "vl",
    PHAN: [["Bài 14–15 (từ trường, lực từ)", 14, 15], ["Bài 16–19 (cảm ứng điện từ, máy phát điện xoay chiều, ứng dụng, sóng điện từ)", 16, 19]],
    DAU: "Phạm vi giữa học kì II: Chương III Từ trường (Bài 14–20).", PHAM_VI: "Vật lí: Bài 14–20 (từ trường).",
    SAU: ["Trường đã học sang Chương IV (Vật lí hạt nhân) trước khi kiểm tra thì phụ huynh đối chiếu với đề cương của trường."],
    BAI: [["Từ trường", 14], ["Lực từ tác dụng lên dây dẫn mang dòng điện. Cảm ứng từ", 15], ["Từ thông. Hiện tượng cảm ứng điện từ", 16],
      ["Máy phát điện xoay chiều", 17], ["Ứng dụng hiện tượng cảm ứng điện từ", 18], ["Điện từ trường. Mô hình sóng điện từ", 19]] },
  { ma: "hoahoc", ten: "Hóa học", sach: "hoa-hoc-12", ki: "hh",
    PHAN: [["Bài 16 Điện phân", 16, 16], ["Chương 6 Đại cương về kim loại (Bài 18–23)", 18, 23], ["Bài 24 Nguyên tố nhóm IA", 24, 24]],
    DAU: "Phạm vi giữa học kì II:", PHAM_VI: "Hóa học: Bài 16, Bài 18–24 (",
    SAU: ["Trường đã kiểm tra Bài 16 ở cuối học kì I thì bỏ qua các câu Bài 16", "trường mới học đến hết Chương 6 thì bỏ qua các câu Bài 24",
      "trường đã học thêm Bài 25 (Nguyên tố nhóm IIA) thì phụ huynh đối chiếu với đề cương của trường"],
    BAI: [["Điện phân", 16], ["Cấu tạo và liên kết trong tinh thể kim loại", 18], ["Tính chất vật lí và tính chất hoá học của kim loại", 19],
      ["Kim loại trong tự nhiên và phương pháp tách kim loại", 20], ["Hợp kim", 21], ["Sự ăn mòn kim loại", 22], ["Nguyên tố nhóm IA", 24]] }
];
const ten = new Map(), monCua = new Map();
MON.forEach((m) => {
  const pool = BANKS.find((b) => b.pool && b.id === m.ma + "12-gk2-ngau-nhien");
  assert.ok(pool, "thiếu đề ngẫu nhiên " + m.ma + "12-gk2-ngau-nhien");
  m.pool = pool; m.DE = pool.pool.from; m.M = pool.pool.matrix; m.kho = pool.questions; m.file = pool.file;
  assert.equal(m.file, "12-" + m.ma + ".js", "file câu hỏi theo mã môn");
  assert.equal(m.DE.length, 2, m.ma + ": đề ngẫu nhiên lấy câu của hai đề cố định");
  assert.deepEqual(BANKS.filter((b) => b.id.startsWith(m.ma + "12-gk2-")).map((b) => b.id).sort(), [...m.DE, pool.id].sort(), m.ma + ": kho gồm hai đề cố định và đề ngẫu nhiên");
  assert.equal(m.kho.filter((q) => q.src === pool.id).length, 0, m.ma + ": đề ngẫu nhiên không có câu riêng");
  assert.ok(pool.title === m.ten + " 12 · Giữa kì II · Đề ngẫu nhiên" && pool.grade === 12 && pool.subject === m.ten, m.ma + ": tên, khối, môn của đề ngẫu nhiên");
  m.DE.forEach((id, k) => {
    const b = bank(id);
    assert.ok(b.file === m.file && b.subject === m.ten && b.grade === 12 && b.minutes === pool.minutes && b.n === pool.n, id + ": cùng file, môn, khối, số phút, số câu với đề ngẫu nhiên");
    assert.equal(b.title, m.ten + " 12 · Giữa kì II · Đề " + (k + 1), id + ": tên đề");
    assert.equal(b.questions.length, b.n, id + ": số câu bằng n của danh mục");
    m.kho.filter((q) => q.src === id).forEach((q, i) => { ten.set(q, m.ki + (k + 1) + "#" + (i + 1)); monCua.set(q, m); });
  });
  assert.equal(m.kho.length, sum(m.DE.map((id) => bank(id).n)), m.ma + ": kho = câu của hai đề cố định");
  // kho cuối kì I cùng môn (để so: không có câu ôn, đề bài không gần trùng)
  const ck1 = BANKS.find((b) => b.pool && b.id === m.ma + "12-ck1-ngau-nhien");
  assert.ok(ck1 && ck1.file === m.file, m.ma + ": có kho cuối kì I cùng file");
  m.ck1 = ck1.questions;
  m.ck1.forEach((q) => ten.set(q, "ck1-" + m.ki + (ck1.pool.from.indexOf(q.src) + 1) + "#" + (bank(q.src).questions.indexOf(bank(q.src).questions.find((p) => p.q === q.q)) + 1)));
});
const [VL, HH] = MON;
// môn đúng chữ của lịch thi (MON_THPT), sáu mã đề gắn vào kì thi giữa kì II lớp 12, phạm vi của kì thi ghi đúng số bài
{
  const lich = fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8");
  const mon = /const MON_THPT = \[([^\]]*)\]/.exec(lich);
  MON.forEach((m) => assert.ok(mon && mon[1].includes('"' + m.ten + '"'), "môn " + m.ten + " có trong MON_THPT"));
  const c = vm.createContext({ window: {} }); vm.runInContext(lich, c);
  const ev = c.window.ONTAP_SEED_EVENTS.find((e) => e.id === "gk2-l12");
  assert.ok(ev && ev.grades.includes(12), "có kì thi gk2-l12");
  MON.forEach((m) => {
    [...m.DE, m.pool.id].forEach((id) => assert.ok(ev.banks.includes(id), id + " gắn vào gk2-l12"));
    assert.ok(ev.scope.includes(m.PHAM_VI), "phạm vi của gk2-l12 ghi “" + m.PHAM_VI + "”");
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
// số viết kiểu Việt Nam: 7500 → "7 500", 0.15 → "0,15"; vnf giữ đủ d chữ số thập phân (4 → "4,0")
const vn = (x, d = 6) => { const r = Math.round(x * 10 ** d) / 10 ** d, [a, b] = String(Math.abs(r)).split("."); return (r < 0 ? "−" : "") + a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); };
const vnf = (x, d) => { const [a, b] = Math.abs(x).toFixed(d).split("."); return (x < 0 ? "−" : "") + a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); };
const coX = (q, ...cum) => cum.forEach((c) => assert.ok(q.x.includes(c), "lời giải cần có “" + c + "”"));
const coThang = (q, ...cum) => { const r = q.rubric.map((c) => c.c).join(" | "); cum.forEach((c) => assert.ok(r.includes(c), "thang chấm cần có “" + c + "”")); };
const dapSo = (q) => { const m = /^Đáp số: (.+)$/m.exec(q.x); assert.ok(m, "gợi ý ghi đáp số"); return m[1]; };

/* ---------- vectơ: x sang phải, y lên trên, z hướng ra phía người xem ---------- */
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const neg = (a) => a.map((v) => -v);
const dai = (a) => Math.hypot(...a);
const cungHuong = (a, b) => dai(a) > 1e-9 && dai(b) > 1e-9 && gan((a[0] * b[0] + a[1] * b[1] + a[2] * b[2]) / (dai(a) * dai(b)), 1, 1e-6);
// hướng ghi trong chữ: “hướng sang bên phải của hình”, đáp án “Phía bên phải”
const HUONG = [["sang bên phải", [1, 0, 0]], ["sang bên trái", [-1, 0, 0]], ["lên phía trên", [0, 1, 0]], ["xuống phía dưới", [0, -1, 0]]];
const huongCua = (s) => { const h = HUONG.filter(([t]) => s.includes(t)); assert.equal(h.length, 1, "câu nêu đúng một hướng: " + s); return h[0][1]; };
const PHIA = [["Phía bên phải", [1, 0, 0]], ["Phía bên trái", [-1, 0, 0]], ["Phía trên", [0, 1, 0]], ["Phía dưới", [0, -1, 0]]];
const tenPhia = (v) => { const h = PHIA.filter(([, w]) => cungHuong(v, w)); assert.equal(h.length, 1, "hướng không dọc theo hình: " + v); return h[0][0]; };

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">");
  return Object.assign(a, { t: m[2], at: [+a.x, +a.y], b: a["font-weight"] === "bold" || a["font-weight"] === "700", fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start" }); });
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const ends = (l) => [[+l.x1, +l.y1], [+l.x2, +l.y2]];
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const same = (p, q) => dist(p, q) < 0.06;
const denDoan = (p, a, b) => { const d = [b[0] - a[0], b[1] - a[1]], t = Math.max(0, Math.min(1, ((p[0] - a[0]) * d[0] + (p[1] - a[1]) * d[1]) / (d[0] ** 2 + d[1] ** 2))); return dist(p, [a[0] + t * d[0], a[1] + t * d[1]]); };
// mọi chữ trong hình cỡ từ 13, nằm trọn trong khung, không đè lên nhau (ước bề rộng chữ như tests/toan12-ck1.js)
const hopChu = (t) => { const w = (t.b ? 0.62 : 0.55) * t.fs * [...t.t].length, x0 = t.anchor === "middle" ? t.at[0] - w / 2 : t.anchor === "end" ? t.at[0] - w : t.at[0];
  return [x0, t.at[1] - 0.75 * t.fs, x0 + w, t.at[1] + 0.25 * t.fs]; };
const khung = (svg) => /viewBox="([^"]+)"/.exec(svg)[1].split(/\s+/).map(Number);
const chuHinh = (svg, at) => {
  const v = khung(svg), T = texts(svg);
  T.forEach((t) => { const h = hopChu(t); assert.ok(t.fs >= 13, at + ": chữ “" + t.t + "” nhỏ hơn cỡ 13"); assert.ok(h[0] >= 0 && h[2] <= v[2] && h[1] >= 0 && h[3] <= v[3], at + ": chữ “" + t.t + "” tràn khỏi khung hình"); });
  T.forEach((t, i) => T.slice(i + 1).forEach((u) => { const a = hopChu(t), b = hopChu(u); assert.ok(!(a[0] < b[2] - 1 && b[0] < a[2] - 1 && a[1] < b[3] - 1 && b[1] < a[3] - 1), at + ": chữ “" + t.t + "” đè lên chữ “" + u.t + "”"); }));
};
// mũi tên tam giác: đỉnh đối diện cạnh ngắn nhất là đầu mũi tên; trả về đầu, gốc (trung điểm cạnh đối diện) và hướng (x phải, y lên)
const muiTen = (q) => {
  const canh = [0, 1, 2].map((i) => dist(q[(i + 1) % 3], q[(i + 2) % 3])), i = canh.indexOf(Math.min(...canh));
  const goc = [(q[(i + 1) % 3][0] + q[(i + 2) % 3][0]) / 2, (q[(i + 1) % 3][1] + q[(i + 2) % 3][1]) / 2];
  return { dau: q[i], goc, v: [q[i][0] - goc[0], goc[1] - q[i][1], 0] };
};
/* Hình từ trường: dây vuông góc với mặt phẳng hình là vòng tròn bán kính từ 10, nền surface, viền ink, trong vòng có dấu × (hai đoạn ink
   cắt nhau ở tâm: dòng điện đi vào, ⊗) hoặc chấm tròn ink ở tâm (đi ra, ⊙); chấm tròn ink nhỏ (bán kính dưới 5) ngoài các vòng đó là
   đường sức từ hướng ra khỏi mặt phẳng hình (cách đều theo hàng, cột); đoạn thẳng ink nét 3 có mũi tên (tam giác ink nằm trên đoạn, chữ
   I đậm cạnh mũi tên) là dây dẫn trong mặt phẳng hình, chiều dòng điện theo mũi tên; hình chữ nhật có chữ N hoặc S đậm ở trong là cực
   nam châm; đoạn thẳng acc có mũi tên acc là đường sức từ; chấm tròn bad có chữ đậm cạnh là một điểm. */
const docTu = (svg, at) => {
  const C = tags(svg, "circle"), L = tags(svg, "line"), P = tags(svg, "polygon"), RC = tags(svg, "rect"), T = texts(svg);
  const vong = C.filter((c) => +c.r >= 10 && c.fill === "surface" && c.stroke === "ink"), tam = (c) => [+c.cx, +c.cy];
  const trongVong = (p) => vong.some((v) => dist(p, tam(v)) <= +v.r);
  const day = vong.map((v) => {
    const o = tam(v), x = L.filter((l) => l.stroke === "ink" && ends(l).every((e) => dist(e, o) < +v.r)), ch = C.filter((c) => c !== v && c.fill === "ink" && same(tam(c), o));
    assert.ok((x.length === 2 && ch.length === 0) || (x.length === 0 && ch.length === 1), at + ": dây vuông góc với mặt phẳng hình có dấu × hoặc chấm ở tâm");
    x.forEach((l) => { const [a, b] = ends(l); assert.ok(same([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], o), at + ": dấu × có tâm ở tâm vòng"); });
    if (x.length) { const [u, w] = x.map((l) => { const [a, b] = ends(l); return [b[0] - a[0], b[1] - a[1]]; }); assert.ok(Math.abs(u[0] * w[0] + u[1] * w[1]) < 1e-6, at + ": hai nét của dấu × vuông góc"); }
    return { p: o, z: x.length ? -1 : 1 };
  });
  const cham = C.filter((c) => c.fill === "ink" && +c.r < 5 && !trongVong(tam(c))).map(tam);
  if (cham.length) { // chấm đường sức cách đều theo hàng, cột
    const xs = [...new Set(cham.map((p) => p[0]))].sort((a, b) => a - b), ys = [...new Set(cham.map((p) => p[1]))].sort((a, b) => a - b);
    assert.equal(cham.length, xs.length * ys.length, at + ": chấm đường sức xếp thành lưới");
    const deu = (v) => v.slice(1).every((x, i) => gan(x - v[i], v[1] - v[0], 1e-6)); assert.ok(deu(ys), at + ": chấm đường sức cách đều theo cột");
  }
  const mui = P.filter((p) => p.fill === "ink").map((p) => pts(p.points)).filter((q) => q.length === 3);
  const dayPhang = L.filter((l) => l.stroke === "ink" && l["stroke-width"] === "3").map((l) => {
    const [a, b] = ends(l), m = mui.filter((q) => q.every((v) => denDoan(v, a, b) < 9));
    assert.equal(m.length, 1, at + ": dây trong mặt phẳng hình có một mũi tên");
    const t = muiTen(m[0]); assert.ok(denDoan(t.dau, a, b) < 0.06 && denDoan(t.goc, a, b) < 0.06, at + ": mũi tên nằm trên dây");
    assert.ok(T.some((x) => x.t === "I" && x.b && dist(x.at, t.goc) < 20), at + ": chữ I đậm cạnh mũi tên");
    assert.ok(cham.every((p) => denDoan(p, a, b) > 20), at + ": chấm đường sức không nằm trên dây");
    return { a, b, v: t.v };
  });
  const nam = RC.map((r) => { const x = +r.x, y = +r.y, w = +r.width, h = +r.height, t = T.filter((u) => /^[NS]$/.test(u.t) && u.b && u.at[0] > x && u.at[0] < x + w && u.at[1] > y && u.at[1] < y + h);
    return t.length === 1 ? { cuc: t[0].t, x, y, w, h, tam: [x + w / 2, y + h / 2] } : null; }).filter(Boolean);
  const diem = C.filter((c) => c.fill === "bad" && +c.r < 5).map((c) => { const t = T.filter((u) => u.b && /^[A-Z]$/.test(u.t) && dist(u.at, tam(c)) < 20);
    assert.equal(t.length, 1, at + ": điểm có một chữ đậm cạnh"); return { ten: t[0].t, p: tam(c) }; });
  const duong = L.filter((l) => l.stroke === "acc").map((l) => {
    const [a, b] = ends(l), m = P.filter((p) => p.fill === "acc").map((p) => pts(p.points)).filter((q) => q.length === 3 && q.every((v) => denDoan(v, a, b) < 6));
    assert.equal(m.length, 1, at + ": mỗi đường sức có một mũi tên"); const t = muiTen(m[0]);
    assert.ok(denDoan(t.dau, a, b) < 0.06 && denDoan(t.goc, a, b) < 0.06, at + ": mũi tên nằm trên đường sức"); return { a, b, v: t.v };
  });
  chuHinh(svg, at);
  return { day, cham, dayPhang, nam, diem, duong };
};
// cảm ứng từ giữa hai cực nam châm: từ cực N sang cực S
const tuNS = (h, at) => { const N = h.nam.find((x) => x.cuc === "N"), S = h.nam.find((x) => x.cuc === "S");
  assert.ok(h.nam.length === 2 && N && S, at + ": hai cực N, S"); assert.ok(N.y === S.y && N.h === S.h, at + ": hai cực đối diện nhau");
  return { N, S, B: [S.tam[0] - N.tam[0], N.tam[1] - S.tam[1], 0] }; };
/* Đồ thị trên lưới: hai trục màu ink nét 1,5 cắt nhau ở gốc O (chữ O cạnh gốc), trục ngang đi từ gốc sang phải, trục đứng đi lên (kéo
   xuống dưới gốc khi đồ thị có giá trị âm), đầu trục có mũi tên; đường lưới màu line cách đều theo từng chiều, tính từ trục, mỗi vạch có
   một số; số ở trục ngang ngay dưới một vạch dọc (dưới cả phần đồ thị), số ở trục đứng ngay trái một vạch ngang, giá trị tỉ lệ với khoảng
   cách tới gốc (cả số âm, số thập phân); tên trục dạng “Φ (mWb)”, tên trục ngang ở đầu trục ngang, tên trục đứng ở đầu trục đứng; đường
   biểu diễn là một đường gấp khúc màu acc nét 2,5 nằm trong lưới. Trả về tên hai trục và các điểm của đường biểu diễn (theo giá trị). */
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
  duoi.forEach((y, j) => assert.ok(Math.abs(y - O[1] - (j + 1) * by) < 0.06, at + ": lưới đều theo chiều đứng (dưới trục)"));
  assert.ok(!ngang.includes(O[1]), at + ": không có vạch lưới trùng trục ngang");
  const top = tren[tren.length - 1], day_ = duoi.length ? duoi[duoi.length - 1] : O[1], phai = doc[doc.length - 1];
  L.filter((l) => l.stroke === "line").forEach((l) => assert.ok(l.x1 === l.x2 ? +l.y1 === top && +l.y2 === day_ : +l.x1 === O[0] && +l.x2 === phai, at + ": vạch lưới đi hết phần đồ thị"));
  const SO = /^[−-]?\d+(?:,\d+)?$/, soX = T.filter((t) => SO.test(t.t) && t.anchor === "middle"), soY = T.filter((t) => SO.test(t.t) && t.anchor === "end");
  assert.ok(soX.length + soY.length === T.filter((t) => SO.test(t.t)).length, at + ": số ở trục ngang căn giữa, ở trục đứng căn phải");
  doc.forEach((x) => assert.equal(soX.filter((t) => Math.abs(t.at[0] - x) < 0.06).length, 1, at + ": mỗi vạch dọc có một số"));
  ngang.forEach((y) => assert.equal(soY.filter((t) => Math.abs(t.at[1] - 5 - y) < 0.06).length, 1, at + ": mỗi vạch ngang có một số"));
  soX.forEach((t) => assert.ok(doc.some((x) => Math.abs(x - t.at[0]) < 0.06) && t.at[1] > day_ + 10, at + ": số " + t.t + " ở trục ngang dưới một vạch dọc"));
  soY.forEach((t) => assert.ok(ngang.some((y) => Math.abs(y - (t.at[1] - 5)) < 0.06) && t.at[0] < O[0], at + ": số " + t.t + " ở trục đứng trái một vạch ngang"));
  const kx = val(soX[0].t) / (soX[0].at[0] - O[0]), ky = val(soY[0].t) / (O[1] - (soY[0].at[1] - 5));
  soX.forEach((t) => assert.ok(gan(val(t.t), kx * (t.at[0] - O[0]), 1e-6), at + ": số ở trục ngang tỉ lệ với khoảng cách tới gốc"));
  soY.forEach((t) => assert.ok(gan(val(t.t), ky * (O[1] - (t.at[1] - 5)), 1e-6), at + ": số ở trục đứng tỉ lệ với khoảng cách tới gốc"));
  const V = (p) => [(p[0] - O[0]) * kx, (O[1] - p[1]) * ky];
  const tenTruc = T.filter((t) => /^[ΦetiuB] \((?:mWb|Wb|ms|s|V|A|T)\)$/u.test(t.t));
  assert.equal(tenTruc.length, 2, at + ": tên hai trục");
  const tenX = tenTruc.filter((t) => dist(t.at, [X2, O[1]]) < 30), tenY = tenTruc.filter((t) => dist(t.at, [O[0], Y2]) < 30);
  assert.ok(tenX.length === 1 && tenY.length === 1 && tenX[0] !== tenY[0], at + ": tên trục ở đầu mỗi trục");
  const pl = tags(svg, "polyline").filter((p) => p.stroke === "acc" && p["stroke-width"] === "2.5");
  assert.ok(pl.length === 1 && tags(svg, "polyline").length === 1, at + ": một đường biểu diễn");
  const diemPl = pts(pl[0].points);
  diemPl.forEach((p) => assert.ok(p[0] >= O[0] - 0.06 && p[0] <= phai + 0.06 && p[1] >= top - 0.06 && p[1] <= day_ + 0.06, at + ": đường biểu diễn nằm trong lưới"));
  diemPl.slice(1).forEach((p, i) => assert.ok(p[0] > diemPl[i][0], at + ": đường biểu diễn đi theo thời gian"));
  chuHinh(svg, at);
  return { x: tenX[0].t, y: tenY[0].t, net: diemPl.map(V) };
};
// giá trị của đường gấp khúc tại hoành độ t (nội suy tuyến tính)
const tai = (net, t) => { for (let i = 1; i < net.length; i++) { const [a, b] = [net[i - 1], net[i]]; if (t >= a[0] - 1e-9 && t <= b[0] + 1e-9) return a[1] + ((b[1] - a[1]) * (t - a[0])) / (b[0] - a[0]); } assert.fail("không có giá trị tại " + t); };

/* ---------- hoá học: công thức (chữ số dưới dòng, nước kết tinh “·”), khối lượng mol, phương trình (cả ion, electron) ---------- */
// "Fe₂(SO₄)₃" → { Fe: 2, S: 3, O: 12 }; "Fe₂O₃·H₂O" cộng phần sau dấu “·” (có thể có hệ số: "Al₂O₃·2H₂O")
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
const NTK = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 64, Zn: 65, Br: 80, Ag: 108, Sn: 119 };
const KL = (f, nt = NTK) => Object.entries(congThuc(f)).reduce((s, [e, c]) => { assert.ok(e in nt, "thiếu nguyên tử khối của " + e + " (" + f + ")"); return s + nt[e] * c; }, 0);
// chất trong phương trình: hệ số, công thức, điện tích; "e" là electron (điện tích −1)
// ngoặc trong công thức phải đủ cặp: “Cu(NO₃)₂”, “(C₆H₁₀O₅)ₙ”; phương trình đặt trong ngoặc “(Ag⁺ + e → Ag)” không lấy dấu ngoặc
const LOAI = "(?:\\d*e(?![\\p{L}\\p{N}₀-₉])|(?:\\d+n?|n)?(?:\\[[A-Z][a-z]?\\]|(?:[A-Z]|\\([A-Z][A-Za-z₀-₉]*\\)[₀-₉ₙ]+)(?:[A-Za-z₀-₉ₙ]|\\([A-Za-z₀-₉]+\\)[₀-₉ₙ]*)*)(?:[²³]?[⁺⁻])?)";
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
// nguyên tử khối đề cho: “(Cho H = 1, C = 12, O = 16.)”; phải đúng bảng nguyên tử khối
const ntDe = (q) => { const m = /\(Cho ([^)]*)\.\)/.exec(q.q); assert.ok(m, "đề cho nguyên tử khối"); const nt = {};
  [...m[1].matchAll(/([A-Z][a-z]?) = (\d+(?:,\d+)?)/g)].forEach((k) => { nt[k[1]] = val(k[2]); assert.equal(nt[k[1]], NTK[k[1]], "nguyên tử khối của " + k[1]); }); return nt; };
// thể tích mol khí ở điều kiện chuẩn đề cho (24,79 L/mol)
const VM = 24.79;
const vmDe = (q) => { const [v] = so(q.q, "thể tích mol khí # L/mol"); assert.equal(v, VM, "thể tích mol khí ở điều kiện chuẩn"); return v; };
// thế điện cực chuẩn (V) theo Bảng 15.1 của sách; đề ghi “E°(Zn²⁺/Zn) = −0,762 V”. Cặp 2H₂O/(H₂ + 2OH⁻) ở pH = 7: −0,414 V.
const E0_SACH = { Li: -3.04, K: -2.924, Ca: -2.84, Na: -2.713, Mg: -2.356, Al: -1.676, Zn: -0.762, Fe: -0.44, Ni: -0.257, Sn: -0.137, Pb: -0.126, H: 0, Cu: 0.34, Ag: 0.799, Hg: 0.853 };
const E_NUOC = -0.414;
const e0De = (s) => { const E = {}; [...s.matchAll(new RegExp("(?<![−+] )E°\\(([A-Z][a-z]?)[²³]?⁺\\/([A-Z][a-z]?)\\) = ([−+]?" + "\\d+,\\d+) V", "gu"))].forEach((m) => {
  assert.equal(m[1], m[2], "cặp oxi hoá – khử của cùng một kim loại"); E[m[1]] = val(m[3].replace("+", "")); assert.ok(gan(E[m[1]], E0_SACH[m[1]]), "E° của " + m[1] + " đúng bảng của sách"); }); return E; };
// phản ứng “X + Yⁿ⁺ → Xⁿ⁺ + Y” giữa kim loại và ion kim loại xảy ra khi E° của cặp Yⁿ⁺/Y lớn hơn của Xⁿ⁺/X
const xayRa = (pt, E) => { const [[x, y], [x2, y2]] = tach(pt); assert.ok(x.q === 0 && y.q > 0 && x2.f === x.f && x2.q > 0 && y2.f === y.f && y2.q === 0, "phản ứng kim loại với ion kim loại: " + pt);
  assert.ok(x.f in E && y.f in E, "có E° của " + x.f + ", " + y.f); return E[y.f] > E[x.f]; };
// thứ tự điện phân theo sách (Bài 16): tại anode I⁻ > Br⁻ > Cl⁻; tại cathode Au³⁺ > Ag⁺ > Hg²⁺ > Cu²⁺ > H⁺ > H₂O
const ANODE = ["I⁻", "Br⁻", "Cl⁻"], CATHODE = ["Au³⁺", "Ag⁺", "Hg²⁺", "Cu²⁺", "H⁺", "H₂O"];
const ionCua = (f) => ({ "AgNO₃": "Ag⁺", "Cu(NO₃)₂": "Cu²⁺", KCl: "Cl⁻", KBr: "Br⁻", KI: "I⁻" })[f];
// tên kim loại trong lựa chọn: “Thanh đồng (Cu)”, “Bạc (Ag)”
const kiHieu = (o) => { const m = /\(([A-Z][a-z]?)\)$/.exec(o); assert.ok(m, "lựa chọn ghi kí hiệu kim loại: " + o); return m[1]; };
// từ thông qua vòng dây (Φ = BScosα) có đổi khi làm việc ghi trong ý hay không (câu về điều kiện xuất hiện dòng điện cảm ứng)
const DOI_TU_THONG = [[/cho cảm ứng từ (?:giảm|tăng) dần/, true], [/Tịnh tiến vòng dây trong vùng từ trường đều, mặt phẳng vòng dây luôn vuông góc/, false],
  [/làm diện tích của nó (?:giảm|tăng)/, true], [/Quay vòng dây quanh trục đi qua tâm và vuông góc với mặt phẳng vòng dây/, false]];
const doiTuThong = (s) => { const r = DOI_TU_THONG.filter(([re]) => re.test(s)); assert.equal(r.length, 1, "ý không có trong bảng: " + s); return r[0][1]; };

/* ---------- các câu cần tính ----------
   id: đề chứa câu (vl1, vl2, hh1, hh2: đề 1, đề 2 của môn); has: đoạn chữ của đề; right(q): đáp án tính bằng code (câu đúng/sai 4 ý:
   mảng, null ở ý không tính được); essay(q): câu tự luận so với thang chấm và đáp số. */
const CHECKS = [
  /* ----- Vật lí, Đề 1 ----- */
  { id: "vl1", has: "Đặt một kim nam châm nhỏ tại điểm A", right: (q) => {
    const h = docTu(q.svg, "dây ⊗ và điểm A"); assert.ok(h.day.length === 1 && h.diem.length === 1 && h.diem[0].ten === "A" && !h.cham.length && !h.dayPhang.length && !h.nam.length);
    const d = h.day[0]; assert.ok(/có chiều đi vào mặt phẳng hình \(kí hiệu ⊗\)/.test(q.q) && d.z === -1, "chiều dòng điện trong đề khớp kí hiệu trong hình");
    assert.ok(texts(q.svg).some((t) => t.t === "O" && dist(t.at, d.p) < 35), "chữ O cạnh dây");
    const r = [h.diem[0].p[0] - d.p[0], d.p[1] - h.diem[0].p[1], 0]; assert.ok(/tại điểm A ở phía trên O/.test(q.q) && tenPhia(r) === "Phía trên", "A ở phía trên O như đề ghi");
    // cảm ứng từ của dòng điện thẳng: chiều theo quy tắc nắm bàn tay phải, cùng chiều tích có hướng (chiều dòng điện) × (vị trí so với dây)
    return tenPhia(cross([0, 0, d.z], r)); } },
  { id: "vl1", has: "các chấm tròn biểu diễn đường sức từ", right: (q) => {
    const h = docTu(q.svg, "đoạn dây trong từ trường hướng ra"); assert.ok(h.cham.length >= 6 && h.dayPhang.length === 1 && !h.day.length && !h.nam.length);
    assert.ok(/có chiều hướng từ trong ra ngoài mặt phẳng hình/.test(q.q), "chấm tròn: đường sức hướng ra");
    const B = [0, 0, 1], I = h.dayPhang[0].v, F = cross(I, B);
    assert.ok(/^Lực từ tác dụng lên đoạn dây hướng/.test(q.o[0]) && /^Lực từ tác dụng lên đoạn dây có phương vuông góc với mặt phẳng hình/.test(q.o[1]) &&
      /^Nếu đổi chiều dòng điện và đồng thời đổi chiều từ trường thì lực từ đổi chiều/.test(q.o[2]) && /^Nếu chỉ đổi chiều dòng điện thì lực từ hướng/.test(q.o[3]));
    return [cungHuong(F, huongCua(q.o[0])), cungHuong(F, [0, 0, 1]) || cungHuong(F, [0, 0, -1]), cungHuong(cross(neg(I), neg(B)), neg(F)), cungHuong(cross(neg(I), B), huongCua(q.o[3]))]; } },
  { id: "vl1", has: "quay đoạn dây (vẫn nằm trọn trong từ trường)", right: (q) => {
    const [F1] = so(q.q, "lực từ tác dụng lên nó có độ lớn # N"), [a] = so(q.q, "hợp với các đường sức từ một góc #°"); assert.ok(/Khi đoạn dây vuông góc với các đường sức từ/.test(q.q));
    return (F1 * Math.sin((a * Math.PI) / 180)) / Math.sin(Math.PI / 2); } },
  { id: "vl1", has: "Một thanh đồng dài", right: (q) => {
    const [L, m] = so(q.q, "dài # cm, khối lượng # g"), [I] = so(q.q, "Cho dòng điện # A"), [g] = so(q.q, "g = # m/s²");
    assert.ok(/lực từ tác dụng lên thanh hướng thẳng đứng lên trên và lực căng của hai sợi dây đều bằng 0/.test(q.q) && /vuông góc với thanh/.test(q.q), "lực từ cân bằng trọng lực");
    coX(q, "BIL = mg"); return ((m / 1000) * g) / (I * (L / 100)); } },
  { id: "vl1", has: "Một vòng dây dẫn kín, phẳng đặt trong một từ trường đều", right: (q) => q.o.map(doiTuThong) },
  { id: "vl1", has: "Hình bên là đồ thị biểu diễn từ thông Φ qua mỗi vòng dây theo thời gian t", right: (q) => {
    const g = docLuoi(q.svg, "đồ thị Φ–t"); assert.ok(g.x === "t (s)" && g.y === "Φ (mWb)");
    const [N] = so(q.q, "gồm # vòng"), [t1, t2] = so(q.q, "Trong khoảng thời gian từ # s đến # s"), P1 = tai(g.net, t1), P2 = tai(g.net, t2);
    assert.ok(!g.net.some((p) => p[0] > t1 + 1e-9 && p[0] < t2 - 1e-9), "từ thông biến đổi đều trong khoảng thời gian đó");
    coX(q, "từ " + vn(t1) + " s đến " + vn(t2) + " s, từ thông qua mỗi vòng dây " + (P2 < P1 ? "giảm" : "tăng") + " đều từ " + vn(P1) + " mWb về " + vn(P2));
    return (N * Math.abs(P2 - P1)) / 1000 / (t2 - t1); } },
  { id: "vl1", has: "người ta đổi chiều từ trường nhưng giữ nguyên độ lớn của cảm ứng từ", right: (q) => {
    const [N, S, B] = so(q.q, "gồm # vòng, mỗi vòng có diện tích # cm², đặt trong một từ trường đều có cảm ứng từ # T"), [dt] = so(q.q, "Trong # s");
    assert.ok(/các đường sức từ vuông góc với mặt phẳng khung/.test(q.q)); return (N * 2 * B * S * 1e-4) / dt; } },
  { id: "vl1", has: "i = 4cos(100πt + π/3)", right: (q) => {
    const [I0, w] = so(q.q, "i = #cos(#πt"), Ieff = I0 / Math.SQRT2, f = (w * Math.PI) / (2 * Math.PI), T = 1 / f;
    const [fa] = so(q.o[0], "Tần số của dòng điện là # Hz"), [Ib] = so(q.o[1], "Cường độ dòng điện cực đại là # A"), [Ic] = so(q.o[2], "Cường độ dòng điện hiệu dụng là #√2 A"), [Td] = so(q.o[3], "Chu kì của dòng điện là # s");
    return [gan(fa, f), gan(Ib, I0), gan(Ic * Math.SQRT2, Ieff), gan(Td, T)]; } },
  { id: "vl1", has: "Một dòng điện xoay chiều có cường độ hiệu dụng", right: (q) => {
    // nhiệt lượng toả ra trên R như nhau thì dòng điện không đổi có cường độ bằng cường độ hiệu dụng
    const [I] = so(q.q, "có cường độ hiệu dụng # A"); assert.ok(/toả ra nhiệt lượng bằng nhiệt lượng/.test(q.q)); return vn(I) + " A"; } },
  { id: "vl1", has: "Một máy phát điện xoay chiều nhỏ có khung dây phẳng gồm", essay: (q) => {
    const [N, S, n] = so(q.q, "gồm # vòng, mỗi vòng có diện tích # cm², quay đều với tốc độ # vòng/phút"), [B] = so(q.q, "có cảm ứng từ # T"), [k] = so(q.q, "bằng #% suất điện động cực đại");
    const w = (2 * Math.PI * n) / 60, f = n / 60, E0 = N * B * S * 1e-4 * w, U0 = (k / 100) * E0, U = U0 / Math.SQRT2;
    coThang(q, "ω = 2π · " + vn(n) + "/60 = " + vn((2 * n) / 60) + "π ≈ " + vnf(w, 1) + " rad/s", "f = ω/(2π) = " + vn(f) + " Hz", "E₀ = NBSω = " + vn(N) + " · " + vn(B) + " · " + vn(S) + " · 10⁻⁴ · " + vn((2 * n) / 60) + "π",
      "≈ " + vnf(E0, 1) + " V", "U₀ = " + vn(k / 100) + " · E₀ ≈ " + vnf(U0, 1) + " V", "U = U₀/√2 ≈ " + vnf(U, 1) + " V");
    assert.equal(dapSo(q), "a) ω ≈ " + vnf(w, 1) + " rad/s, f = " + vn(f) + " Hz; b) E₀ ≈ " + vnf(E0, 1) + " V; c) U ≈ " + vnf(U, 1) + " V."); } },
  { id: "vl1", has: "u = 110√2cos(100πt)", right: (q) => {
    const [U0] = so(q.q, "u = #√2cos("), [N1, N2] = so(q.q, "Cuộn sơ cấp có # vòng, cuộn thứ cấp có # vòng"); assert.ok(/bỏ qua mọi hao phí/.test(q.q));
    return (U0 * Math.SQRT2) / Math.SQRT2 * (N2 / N1); } },
  { id: "vl1", has: "Một đài phát thanh phát sóng điện từ có tần số", right: (q) => { const [f] = so(q.q, "có tần số # MHz"), [c] = so(q.q, "trong không khí là # m/s"); return c / (f * 1e6); } },
  /* ----- Vật lí, Đề 2 ----- */
  { id: "vl2", has: "các đường sức từ ở khoảng giữa hai cực của một nam châm chữ U", right: (q) => {
    const h = docTu(q.svg, "đường sức giữa hai cực"), { N, S, B } = tuNS(h, "đường sức giữa hai cực"); assert.ok(h.duong.length >= 3 && !h.day.length && !h.dayPhang.length);
    const ys = h.duong.map((d) => d.a[1]).sort((a, b) => a - b);
    h.duong.forEach((d) => assert.ok(d.a[1] === d.b[1] && Math.min(d.a[0], d.b[0]) === N.x + N.w && Math.max(d.a[0], d.b[0]) === S.x, "đường sức nằm ngang, đi từ mặt cực N tới mặt cực S"));
    const deu = ys.slice(1).every((y, i) => gan(y - ys[i], ys[1] - ys[0], 1e-6)) && ys[0] > N.y && ys[ys.length - 1] < N.y + N.h && h.duong.every((d) => cungHuong(d.v, B));
    const ok = q.o.filter((o) => /^Gần đúng là từ trường đều vì các đường sức song song và cách đều nhau$/.test(o)); assert.equal(ok.length, 1);
    return deu ? ok[0] : null; } },
  { id: "vl2", has: "trục của ống dây theo hướng Đông – Tây", right: (q) => {
    // nhìn dọc trục thấy dòng điện chạy theo chiều kim đồng hồ: ở đỉnh vòng dây (vị trí “lên trên”) dòng điện đi sang tay phải người nhìn;
    // từ trường trong ống cùng chiều tích có hướng (vị trí) × (chiều dòng điện); đầu có đường sức đi ra là cực Bắc
    const m = /Đứng ở đầu phía (Đông|Tây) nhìn dọc theo trục vào ống dây, ta thấy dòng điện chạy trong các vòng dây theo (chiều kim đồng hồ|ngược chiều kim đồng hồ)/.exec(q.q); assert.ok(m);
    const HUONG_DL = { Đông: [1, 0, 0], Tây: [-1, 0, 0] }, len = [0, 0, 1], nhin = neg(HUONG_DL[m[1]]), phai = cross(nhin, len);
    const B = cross(len, m[2] === "chiều kim đồng hồ" ? phai : neg(phai)), bac = Object.keys(HUONG_DL).find((k) => cungHuong(HUONG_DL[k], B));
    return "Đầu phía " + bac + " của ống"; } },
  { id: "vl2", has: "nằm ở khoảng giữa hai cực của một nam châm", right: (q) => {
    const h = docTu(q.svg, "dây ⊗ giữa hai cực"), { N, S, B } = tuNS(h, "dây ⊗ giữa hai cực"); assert.ok(h.day.length === 1 && !h.cham.length && !h.dayPhang.length);
    const d = h.day[0]; assert.ok(d.p[0] > N.x + N.w && d.p[0] < S.x && d.p[1] > N.y && d.p[1] < N.y + N.h, "dây ở khoảng giữa hai cực");
    assert.ok(/có chiều đi vào mặt phẳng hình \(kí hiệu ⊗\)/.test(q.q) && d.z === -1, "chiều dòng điện trong đề khớp kí hiệu trong hình");
    const I = [0, 0, d.z], F = cross(I, B);
    assert.ok(/^Lực từ tác dụng lên dây dẫn hướng/.test(q.o[0]) && /^Nếu đổi chiều dòng điện thì lực từ hướng/.test(q.o[1]) && /^Lực từ có phương nằm ngang, song song với đường sức từ/.test(q.o[2]));
    const [k1, k2] = [/tăng cường độ dòng điện lên gấp (đôi|ba)/.exec(q.o[3]), /độ lớn lực từ tăng gấp (đôi|ba)/.exec(q.o[3])].map((x) => ({ đôi: 2, ba: 3 })[x[1]]);
    return [cungHuong(F, huongCua(q.o[0])), cungHuong(cross(neg(I), B), huongCua(q.o[1])), cungHuong(F, B) || cungHuong(F, neg(B)), gan(dai(cross(I.map((v) => k1 * v), B)), k2 * dai(F))]; } },
  { id: "vl2", has: "Khi tăng cường độ dòng điện trong dây thêm", right: (q) => {
    const [L] = so(q.q, "dài # cm"), [dI, dF] = so(q.q, "thêm # A thì lực từ tác dụng lên đoạn dây tăng thêm # N"); assert.ok(/vuông góc với các đường sức/.test(q.q));
    return dF / (dI * (L / 100)); } },
  { id: "vl2", has: "phần dây nằm trong vùng từ trường dài", right: (q) => {
    const [Lt, I, B] = so(q.q, "dài # cm có dòng điện # A đi xuyên qua một vùng có từ trường đều, cảm ứng từ # T"), [Lv] = so(q.q, "phần dây nằm trong vùng từ trường dài # cm");
    assert.ok(Lv < Lt && /dây vuông góc với các đường sức từ/.test(q.q)); coX(q, "không phải " + vn(Lt) + " cm"); return B * I * (Lv / 100); } },
  { id: "vl2", has: "từ thông qua mỗi vòng dây giảm đều từ", right: (q) => {
    const [N] = so(q.q, "gồm # vòng"), [dt, P] = so(q.q, "Trong # s, từ thông qua mỗi vòng dây giảm đều từ # mWb về 0"), e = (N * P) / 1000 / dt;
    const [eb] = so(q.o[1], "có độ lớn # V"), [dt2] = so(q.o[2], "về 0 chỉ trong # s"), e2 = (N * P) / 1000 / dt2;
    assert.ok(/^Trong .* trong cuộn dây có dòng điện cảm ứng\.$/.test(q.o[0]) && /giảm một nửa\.$/.test(q.o[2]) && /^Sau khi từ thông đã bằng 0 và giữ không đổi, trong cuộn dây vẫn còn dòng điện cảm ứng\.$/.test(q.o[3]));
    return [P !== 0, gan(eb, e), gan(e2, e / 2), false]; } },
  { id: "vl2", has: "hai đầu cuộn dây nối với nhau tạo thành mạch kín có tổng điện trở", right: (q) => {
    const [N, S, R] = so(q.q, "gồm # vòng, mỗi vòng có diện tích # cm², hai đầu cuộn dây nối với nhau tạo thành mạch kín có tổng điện trở # Ω"), [B1, B2, dt] = so(q.q, "tăng đều từ # T lên # T trong # s");
    assert.ok(/đường sức từ song song với trục cuộn dây/.test(q.q)); return (N * (B2 - B1) * S * 1e-4) / dt / R; } },
  { id: "vl2", has: "Kéo khung ra hẳn khỏi vùng có từ trường", right: (q) => {
    const [N, S, B] = so(q.q, "gồm # vòng, mỗi vòng có diện tích # cm², nằm trong một từ trường đều có cảm ứng từ # T"), [dt] = so(q.q, "từ trường trong # s");
    assert.ok(/mặt phẳng khung vuông góc với các đường sức từ/.test(q.q)); return (N * B * S * 1e-4) / dt; } },
  { id: "vl2", has: "Hình bên là đồ thị suất điện động e do máy tạo ra theo thời gian t", right: (q) => {
    const g = docLuoi(q.svg, "đồ thị e–t"); assert.ok(g.x === "t (ms)" && g.y === "e (V)" && /\(1 ms = 0,001 s\)/.test(q.q));
    const E0 = Math.max(...g.net.map((p) => p[1])), dinh = g.net.filter((p) => gan(p[1], E0, 1e-9)).map((p) => p[0]);
    assert.ok(gan(Math.min(...g.net.map((p) => p[1])), -E0, 1e-3) && dinh.length >= 2, "đồ thị có cực đại, cực tiểu đối nhau, ít nhất hai đỉnh");
    const T = dinh[1] - dinh[0], e0 = g.net[0][1], phi = Math.acos(Math.max(-1, Math.min(1, e0 / E0)));
    assert.ok(g.net[0][0] === 0, "đồ thị bắt đầu từ t = 0");
    assert.ok([phi, -phi].some((f) => g.net.every((p) => Math.abs(p[1] - E0 * Math.cos((2 * Math.PI * p[0]) / T + f)) < 0.02)), "đường biểu diễn là đường hình sin");
    const [Ta] = so(q.o[0], "Chu kì của suất điện động là # s"), [Eb] = so(q.o[1], "Suất điện động cực đại của máy là # V"), [fd] = so(q.o[3], "Tần số của suất điện động là # Hz");
    assert.ok(/^Tại thời điểm t = 0, suất điện động bằng 0\.$/.test(q.o[2]));
    coX(q, "T = " + vn(T) + " ms = " + vn(T / 1000) + " s");
    return [gan(Ta, T / 1000), gan(Eb, E0), Math.abs(e0) < 1e-9, gan(fd, 1000 / T)]; } },
  { id: "vl2", has: "Muốn suất điện động cực đại trong khung là", right: (q) => {
    const [N, S, B] = so(q.q, "gồm # vòng, mỗi vòng có diện tích # cm², quay đều quanh một trục vuông góc với các đường sức của một từ trường đều có cảm ứng từ # T"), [E0] = so(q.q, "cực đại trong khung là # V");
    return E0 / (N * B * S * 1e-4); } },
  { id: "vl2", has: "Một máy biến áp trong bộ sạc", essay: (q) => {
    const [N1, U1] = so(q.q, "cuộn sơ cấp # vòng nối với điện áp xoay chiều có giá trị hiệu dụng # V"), [N2] = so(q.q, "Cuộn thứ cấp có # vòng"), [Uc] = so(q.q, "cuộn thứ cấp là # V thì");
    const U2 = (U1 * N2) / N1, U02 = U2 * Math.SQRT2, N2c = (N1 * Uc) / U1, bot = N2 - N2c; assert.ok(Number.isInteger(N2c) && bot > 0, "số vòng cần có là số nguyên, phải bớt");
    coThang(q, "U₂/U₁ = N₂/N₁", "U₂ = " + vn(U1) + " · " + vn(N2) + "/" + vn(N1) + " = " + vn(U2) + " V", "U₀₂ = U₂√2 = " + vn(U2) + "√2 ≈ " + vnf(U02, 2) + " V", vn(N1) + " · " + vn(Uc) + "/" + vn(U1) + " = " + vn(N2c) + " vòng, phải bớt " + vn(bot) + " vòng");
    assert.equal(dapSo(q), "a) " + vn(U2) + " V; b) ≈ " + vnf(U02, 2) + " V; c) bớt " + vn(bot) + " vòng."); } },
  /* ----- Hoá học, Đề 1 ----- */
  { id: "hh1", has: "dung dịch chứa đồng thời AgNO₃ và Cu(NO₃)₂", right: (q) => {
    const ion = ["AgNO₃", "Cu(NO₃)₂"].map(ionCua).sort((a, b) => CATHODE.indexOf(a) - CATHODE.indexOf(b)), kl = ion.map((i) => i.replace(/[²³]?⁺$/, ""));
    assert.ok(CATHODE.indexOf("H₂O") > Math.max(...ion.map((i) => CATHODE.indexOf(i))), "nước bị khử sau cùng");
    return kl[0] + ", rồi đến " + kl[1] + ", sau cùng là khí H₂"; } },
  { id: "hh1", has: "người ta điện phân Al₂O₃ nóng chảy", right: (q) => {
    const nt = ntDe(q), [m, H] = so(q.q, "Điện phân # tấn Al₂O₃ với hiệu suất #%"), pt = ptCua(q, "Al₂O₃", "Al");
    return (molTheoPT(pt, "Al₂O₃", (m * 1e6) / KL("Al₂O₃", nt), "Al") * nt.Al) / 1e6 * (H / 100); } },
  { id: "hh1", has: "thế điện cực của cặp 2H₂O/(H₂ + 2OH⁻)", right: (q) => {
    const E = e0De(q.q), [Ew] = so(q.q, "2H₂O/(H₂ + 2OH⁻) là # V"); assert.ok(gan(Ew, E_NUOC), "thế điện cực của nước ở pH = 7 như sách");
    assert.ok(/^Potassium tác dụng mạnh với nước/.test(q.o[0]) && /^Kẽm tan trong dung dịch HCl/.test(q.o[1]) && /^Bạc tan trong dung dịch H₂SO₄ loãng/.test(q.o[2]) && /^Cả bốn kim loại K, Zn, Cu, Ag đều tan trong dung dịch HCl/.test(q.o[3]));
    return [E.K < Ew, E.Zn < 0, E.Ag < 0, ["K", "Zn", "Cu", "Ag"].every((k) => E[k] < 0)]; } },
  { id: "hh1", has: "Hỗn hợp X gồm Fe và Cu", right: (q) => {
    const nt = ntDe(q), Vm = vmDe(q), [m] = so(q.q, "có khối lượng # g"), [V] = so(q.q, "thu được # L khí H₂");
    const nFe = molTheoPT(ptCua(q, "Fe", "H₂"), "H₂", V / Vm, "Fe"), nCu = (m - nFe * nt.Fe) / nt.Cu; assert.ok(nCu > 0);
    return (molTheoPT(ptCua(q, "Fe", "SO₂"), "Fe", nFe, "SO₂") + molTheoPT(ptCua(q, "Cu", "SO₂"), "Cu", nCu, "SO₂")) * Vm; } },
  { id: "hh1", has: "bột Mg vào 100 mL dung dịch chứa CuSO₄", right: (q) => {
    // ion có tính oxi hoá mạnh hơn (E° lớn hơn) phản ứng trước; Mg còn dư thì nằm trong chất rắn
    const nt = ntDe(q), [mMg] = so(q.q, "Cho # g bột Mg"), [V, c1, c2] = so(q.q, "vào # mL dung dịch chứa CuSO₄ # M và FeSO₄ # M");
    let con = mMg / nt.Mg, ran = 0;
    [["Cu", c1], ["Fe", c2]].sort((a, b) => E0_SACH[b[0]] - E0_SACH[a[0]]).forEach(([k, c]) => {
      const pt = ptCua(q, k + "²⁺", k); assert.ok(xayRa(pt, E0_SACH), "Mg khử được " + k + "²⁺");
      const ion = (V / 1000) * c, dung = Math.min(con, molTheoPT(pt, k + "²⁺", ion, "Mg")); ran += molTheoPT(pt, "Mg", dung, k) * nt[k]; con -= dung; });
    coX(q, "dư " + vn(con) + " mol Mg"); return ran + con * nt.Mg; } },
  { id: "hh1", has: "Một cơ sở tái chế nấu chảy", essay: (q) => {
    const nt = ntDe(q), [m] = so(q.q, "nấu chảy # kg vỏ lon nhôm"), [p] = so(q.q, "nhôm chiếm #% khối lượng"), [ox] = so(q.q, "Trong lúc nấu chảy, #% lượng nhôm"), pt = ptCua(q, "Al", "Al₂O₃");
    const mAl = (m * p) / 100, mOx = (mAl * ox) / 100, mThu = mAl - mOx, mOxit = (molTheoPT(pt, "Al", mOx / nt.Al, "Al₂O₃") * KL("Al₂O₃", nt));
    coThang(q, pt, vn(m) + " · " + vn(p) + "% = " + vn(mAl) + " kg", vn(mAl) + " · " + vn(ox) + "% = " + vn(mOx) + " kg", vn(mAl) + " − " + vn(mOx) + " = " + vn(mThu) + " kg", "≈ " + vnf(mOxit, 1) + " kg");
    assert.equal(dapSo(q), "b) " + vn(mThu) + " kg; c) ≈ " + vnf(mOxit, 1) + " kg."); } },
  { id: "hh1", has: "Một mẫu hợp kim nhôm – đồng", right: (q) => {
    const nt = ntDe(q), Vm = vmDe(q), [m] = so(q.q, "nặng # g"), [V] = so(q.q, "thu được # L khí H₂"), nAl = molTheoPT(ptCua(q, "Al", "H₂"), "H₂", V / Vm, "Al");
    assert.ok(/Chỉ nhôm phản ứng với HCl/.test(q.x) && E0_SACH.Cu > 0 && E0_SACH.Al < 0, "đồng không phản ứng với HCl");
    return ((m - nAl * nt.Al) / m) * 100; } },
  { id: "hh1", has: "Một đường ống dẫn nước bằng thép chôn dưới đất ẩm", right: (q) => {
    // kim loại bảo vệ thép theo phương pháp điện hoá phải có E° nhỏ hơn của sắt; câu hỏi lựa chọn KHÔNG dùng được
    const E = e0De(q.q), sai = q.o.filter((o) => E[kiHieu(o)] > E.Fe); assert.ok(/KHÔNG dùng được/.test(q.q) && sai.length === 1); return sai[0]; } },
  { id: "hh1", has: "Cho 4,6 g sodium vào", right: (q) => {
    const nt = ntDe(q), [mNa, mW] = so(q.q, "Cho # g sodium vào # g nước"), pt = ptCua(q, "Na", "NaOH"), n = mNa / nt.Na;
    const mdd = mNa + mW - molTheoPT(pt, "Na", n, "H₂") * KL("H₂", nt); coX(q, vn(mdd) + " (g)"); return ((molTheoPT(pt, "Na", n, "NaOH") * KL("NaOH", nt)) / mdd) * 100; } },
  /* ----- Hoá học, Đề 2 ----- */
  { id: "hh2", has: "dung dịch chứa đồng thời KCl, KBr và KI", right: (q) => {
    const ion = ["KCl", "KBr", "KI"].map(ionCua).sort((a, b) => ANODE.indexOf(a) - ANODE.indexOf(b)); return ion.join(", rồi "); } },
  { id: "hh2", has: "Điện phân dung dịch KBr với hai điện cực trơ, có màng ngăn", right: (q) => {
    // Br⁻ có trong thứ tự điện phân tại anode nên bị oxi hoá; K⁺ không có trong thứ tự tại cathode (E° rất âm) nên nước bị khử, sinh OH⁻
    assert.ok(/^Ở anode thu được bromine\.$/.test(q.o[0]) && /^Ở cathode, ion K⁺ bị khử thành kim loại K\.$/.test(q.o[1]) && /có môi trường base\.$/.test(q.o[2]));
    const m = /^Phương trình điện phân là (.+)\.$/.exec(q.o[3]); assert.ok(m);
    const sp = tach(m[1])[1].map((s) => s.ten);
    return [ANODE.includes("Br⁻"), E0_SACH.K > E_NUOC, true, canBang(m[1]) && sp.includes("Br₂") && sp.includes("H₂") && sp.includes("KOH")]; } },
  { id: "hh2", has: "Điện phân dung dịch Cu(NO₃)₂ với hai điện cực trơ", right: (q) => {
    const nt = ntDe(q), Vm = vmDe(q), [dm] = so(q.q, "khối lượng cathode tăng # g"), pt = ptCua(q, "Cu", "O₂");
    assert.ok(/chưa có khí thoát ra ở cathode/.test(q.q)); return molTheoPT(pt, "Cu", dm / nt.Cu, "O₂") * Vm; } },
  { id: "hh2", has: "Đốt cháy hết 6,5 g kim loại M", right: (q) => {
    const nt = ntDe(q), [m1, m2] = so(q.q, "Đốt cháy hết # g kim loại M (hoá trị II) trong khí chlorine dư, thu được # g muối chloride"), pt = ptCua(q, "M", "Cl₂");
    const nM = molTheoPT(pt, "Cl₂", (m2 - m1) / KL("Cl₂", nt), "M"), M = m1 / nM; coX(q, "(M là kẽm)"); assert.equal(M, NTK.Zn); return M; } },
  { id: "hh2", has: "Nung nóng hỗn hợp gồm 5,6 g bột sắt", right: (q) => {
    const nt = ntDe(q), [mFe, mS] = so(q.q, "gồm # g bột sắt và # g bột lưu huỳnh"), pt = ptCua(q, "Fe", "FeS");
    return Math.min(molTheoPT(pt, "Fe", mFe / nt.Fe, "FeS"), molTheoPT(pt, "S", mS / nt.S, "FeS")) * KL("FeS", nt); } },
  { id: "hh2", has: "Thiếc được tách từ quặng cassiterite", right: (q) => {
    const nt = ntDe(q), [mq, p] = so(q.q, "Từ # tấn quặng chứa #% SnO₂"), [H] = so(q.q, "hiệu suất cả quá trình là #%"), pt = ptCua(q, "SnO₂", "Sn");
    return (molTheoPT(pt, "SnO₂", (mq * 1e6 * p) / 100 / KL("SnO₂", nt), "Sn") * nt.Sn) / 1000 * (H / 100); } },
  { id: "hh2", has: "Luyện 10 tấn gang", right: (q) => {
    const [m, c1] = so(q.q, "Luyện # tấn gang (coi chỉ gồm sắt và #% carbon"), [c2] = so(q.q, "thành thép chứa #% carbon"); assert.ok(/lượng sắt không đổi/.test(q.q));
    return (m * (1 - c1 / 100)) / (1 - c2 / 100); } },
  { id: "hh2", has: "Một thanh sắt nặng 1,12 kg", right: (q) => {
    const nt = ntDe(q), [m] = so(q.q, "nặng # kg"), f = /Coi gỉ sắt có công thức (\S+)\./.exec(q.q)[1], n = (m * 1000) / nt.Fe / congThuc(f).Fe;
    coX(q, "Khối lượng mol của " + f + " là"); return (n * KL(f, nt)) / 1000; } },
  { id: "hh2", has: "Trong quá trình Solvay", essay: (q) => {
    const nt = ntDe(q), Vm = vmDe(q), [mt] = so(q.q, "Từ # tấn NaCl"), [H] = so(q.q, "hiệu suất giai đoạn tạo NaHCO₃ là #%");
    const pt1 = ptCua(q, "NaCl", "NaHCO₃"), pt2 = ptCua(q, "NaHCO₃", "Na₂CO₃"), n1 = (mt * 1e6) / KL("NaCl", nt), nH = (molTheoPT(pt1, "NaCl", n1, "NaHCO₃") * H) / 100;
    const nS = molTheoPT(pt2, "NaHCO₃", nH, "Na₂CO₃"), mS = (nS * KL("Na₂CO₃", nt)) / 1000, nC = molTheoPT(pt2, "NaHCO₃", nH, "CO₂"), V = (nC * Vm) / 1000;
    coThang(q, pt1, pt2, "n(NaCl) = " + vn(n1) + " mol", vn(nH) + " mol", "n(Na₂CO₃) = " + vn(nS) + " mol, khối lượng soda " + vn(mS) + " kg", "n(CO₂) = " + vn(nC) + " mol, thể tích " + vn(nC * Vm) + " L ≈ " + vnf(V, 1) + " m³");
    assert.equal(dapSo(q), "b) " + vn(mS) + " kg; c) ≈ " + vnf(V, 1) + " m³."); } },
  { id: "hh2", has: "Kim loại nào sau đây KHÔNG dùng được để thu hồi đồng", right: (q) => {
    // thuỷ luyện: kim loại khử được Cu²⁺ phải có E° nhỏ hơn của đồng
    const sai = q.o.filter((o) => E0_SACH[kiHieu(o)] > E0_SACH.Cu); assert.equal(sai.length, 1); coX(q, "E°(Ag⁺/Ag) = +0,799 V"); return sai[0]; } }
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
  const tim = (has) => MON.flatMap((m) => m.kho).find((q) => q.q.includes(has)), hinh = (has) => tim(has).svg;
  const phi = hinh("đồ thị biểu diễn từ thông Φ"), et = hinh("đồ thị suất điện động e"), day = hinh("kim nam châm nhỏ tại điểm A"), luc = hinh("các chấm tròn biểu diễn"), U = hinh("nam châm chữ U"), NS = hinh("nằm ở khoảng giữa hai cực của một nam châm");
  assert.throws(() => docLuoi(phi.replace(">0,3<", ">0,35<"), "thử"), /tỉ lệ/);
  assert.throws(() => docLuoi(phi.replace('x1="170" y1="50" x2="170" y2="200"', 'x1="172" y1="50" x2="172" y2="200"'), "thử"), /lưới đều/);
  assert.throws(() => docLuoi(phi.replace(/(<polyline points=")/, "$1" + "40,200 "), "thử"), /nằm trong lưới|theo thời gian/);
  const g = docLuoi(phi, "thử"); assert.ok(gan(tai(g.net, 0.45), 2) && gan(tai(g.net, 0.3), 4));
  const lech = et.replace(/(<polyline points="(?:\S+ ){9})(\d+),([\d.]+)/, (s, a, x, y) => a + x + "," + (+y + 6));
  assert.throws(() => { const r = CHECKS.find((c) => c.has.startsWith("Hình bên là đồ thị suất điện động")).right; r(Object.assign({}, tim("đồ thị suất điện động e"), { svg: lech })); }, /hình sin/);
  const cauDay = tim("kim nam châm nhỏ tại điểm A"), rDay = CHECKS.find((c) => c.has === "Đặt một kim nam châm nhỏ tại điểm A").right;
  // đổi ⊗ thành ⊙ (bỏ dấu ×, thêm chấm ở tâm) thì cảm ứng từ tại A đổi chiều; chữ đề vẫn ghi ⊗ nên bộ kiểm tra báo
  const ra = day.replace(/<line [^>]*stroke-width="2"\/>/g, "").replace('<text x="138"', '<circle cx="120" cy="120" r="3" fill="ink" stroke="none"/><text x="138"');
  assert.equal(docTu(ra, "thử").day[0].z, 1); assert.throws(() => rDay(Object.assign({}, cauDay, { svg: ra })), /khớp kí hiệu/);
  assert.equal(tenPhia(cross([0, 0, 1], [0, 1, 0])), "Phía bên trái");
  // đổi chiều mũi tên trên dây trong mặt phẳng hình thì lực từ đổi chiều
  const nguoc = luc.replace('points="130,92 122,108 138,108"', 'points="130,128 122,112 138,112"'), h = docTu(nguoc, "thử");
  assert.ok(cungHuong(h.dayPhang[0].v, [0, -1, 0]) && tenPhia(cross(h.dayPhang[0].v, [0, 0, 1])) === "Phía bên trái");
  assert.throws(() => docTu(luc.replace('points="130,92 122,108 138,108"', 'points="160,92 152,108 168,108"'), "thử"), /một mũi tên|nằm trên dây/);
  // đổi chỗ N, S thì cảm ứng từ đổi chiều; đường sức cách không đều thì bộ kiểm tra báo
  const doi = NS.replace(">N<", ">X<").replace(">S<", ">N<").replace(">X<", ">S<"); assert.ok(cungHuong(tuNS(docTu(doi, "thử"), "thử").B, [-1, 0, 0]));
  const cauU = tim("nam châm chữ U"), rU = CHECKS.find((c) => c.has.includes("nam châm chữ U")).right;
  assert.equal(rU(Object.assign({}, cauU, { svg: U.replace(/y1="62.5" x2="210" y2="62.5"/, 'y1="58" x2="210" y2="58"').replace("146,62.5 136,58 136,67", "146,58 136,53.5 136,62.5") })), null);
  assert.throws(() => docTu(U.replace(/<polygon points="146,85[^>]*>/, ""), "thử"), /một mũi tên/);
  // phương trình: cân bằng cả electron, nước kết tinh
  assert.ok(canBang("Ag⁺ + e → Ag") && canBang("2H₂O → O₂ + 4H⁺ + 4e") && canBang("O₂ + 2H₂O + 4e → 4OH⁻") && canBang("2Fe + 6H₂SO₄ → Fe₂(SO₄)₃ + 3SO₂ + 6H₂O"));
  assert.ok(!canBang("Cu²⁺ + e → Cu") && !canBang("2H₂O → O₂ + 4H⁺ + 2e") && !canBang("Fe + 2H₂SO₄ → Fe₂(SO₄)₃ + 3SO₂ + 6H₂O") && !canBang("2Cu(NO₃)₂ + H₂O → 2Cu + O₂ + 4HNO₃"));
  assert.ok(KL("Fe₂O₃·H₂O") === 178 && KL("Al₂O₃·2H₂O") === 138 && KL("Fe₂(SO₄)₃") === 400);
  assert.ok(xayRa("Mg + Cu²⁺ → Mg²⁺ + Cu", E0_SACH) && !xayRa("Cu + Fe²⁺ → Cu²⁺ + Fe", E0_SACH));
  assert.deepEqual("Câu có Ag⁺ + e → Ag và Fe → Fe²⁺ + 2e.".match(PT), ["Ag⁺ + e → Ag", "Fe → Fe²⁺ + 2e"]);
  assert.ok(val("1 100") === 1100 && gan(val("3 · 10⁸"), 3e8) && gan(val("−0,414"), -0.414));
}

/* ---------- chữ ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.unit || [], (q.rubric || []).map((c) => c.c)).map(String);
MON.forEach((m) => m.kho.forEach((q) => {
  const at = ten.get(q) + ": " + q.q.slice(0, 50);
  chu(q).forEach((s) => {
    // số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân
    assert.ok(!/(?<![,\d])\d{4,}/.test(s) && !/\d\.\d/.test(s), at + ": số viết sai cách: " + s);
    // công thức, kí hiệu viết bằng chữ số dưới dòng (H₂SO₄, U₂), không viết H2SO4, U2
    assert.ok(!/(?:^|[^\p{L}])(?:[A-Z][a-z]?)+\d/u.test(s), at + ": công thức cần chữ số dưới dòng: " + s);
    // dấu thanh kiểu sách (hoá, thuỷ, toả, hoà, tuỳ); tên chất, thuật ngữ, tên nhà khoa học như sách
    assert.ok(!/(?<![\p{L}])(?:hóa|hòa|thủy|tỏa|hủy|tùy|khỏe|lũy)(?![\p{L}])/iu.test(s), at + ": dấu thanh kiểu mới: " + s);
    assert.ok(!/(?<![\p{L}])(?:axit|bazơ|clo|clorua|natri|kali|liti|magie|nhôm oxit|sắt oxit|brom|iot|hiđro|hidro|cacbon|nitơ|oxi(?! hoá)|lưu huỳnh đioxit|sunfat|sunfua|nitrat|amoniac|sođa|crom|vonfam|kẽm blend|xút ăn da|oxy hoá|ắc quy)(?![\p{L}])/iu.test(s), at + ": tên chất, thuật ngữ khác sách: " + s);
    assert.ok(!/Len-?xơ|[FP]h?a-?ra-?đây|Phu-?cô|Fu-?cô|Mác-?xoen|Mắc-?xoen|Ăm-?pe|Cu-?lông/u.test(s), at + ": tên nhà khoa học viết như sách (Lenz, Faraday, Foucault, Maxwell): " + s);
    // độ C viết °C, cách số một khoảng trắng
    assert.ok(!/\d°C|\d ?oC\b/.test(s), at + ": đơn vị viết khác sách: " + s);
  });
  if (q.type === "num" && q.unit) assert.ok(q.unit.length <= 5, at + ": đơn vị ngắn");
}));
// Hoá học: không có câu tính theo định luật Faraday (sách in năm 2026 không dạy): không nhắc Faraday, hằng số Faraday, cường độ dòng điện
// tính bằng ampe trong câu điện phân
HH.kho.forEach((q) => chu(q).forEach((s) => assert.ok(!/Faraday|96 ?(?:485|500)|\d (?:A|ampe)(?![\p{L}])/u.test(s), ten.get(q) + ": câu tính theo định luật Faraday: " + s)));
// mọi phương trình hoá học trong câu Hoá học cân bằng; mũi tên trong câu Hoá học chỉ dùng trong phương trình
let soPT = 0;
HH.kho.forEach((q) => chu(q).forEach((s) => {
  (s.match(PT) || []).forEach((pt) => { assert.ok(canBang(pt), ten.get(q) + ": phương trình chưa cân bằng: " + pt); soPT++; });
  assert.ok(!/→|⇌/.test(s.replace(PT, "")), ten.get(q) + ": mũi tên ngoài phương trình: " + s);
}));
assert.ok(soPT > 0, "có phương trình hoá học");
// E° ghi trong mọi câu Hoá học đúng bảng của sách (e0De tự kiểm tra)
HH.kho.forEach((q) => chu(q).forEach((s) => e0De(s)));
// Vật lí không có phương trình hoá học
VL.kho.forEach((q) => chu(q).forEach((s) => assert.ok(!/→|⇌/.test(s), ten.get(q) + ": mũi tên trong câu Vật lí: " + s)));

/* ---------- lời dặn, mức độ, ma trận ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
MON.forEach((m) => {
  const M = m.M, cells = Object.values(M), CHU_DE = m.BAI.map((b) => b[0]), soBai = Object.fromEntries(m.BAI);
  assert.ok(m.kho.every((q) => [1, 2, 3].includes(q.lv)), m.ma + ": câu nào cũng cần lv");
  assert.ok(cells.every(Array.isArray), m.ma + ": ma trận ghi theo [Biết, Hiểu, Vận dụng]");
  assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], m.ma + ": ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
  assert.equal(sum(cells.map(sum)), m.pool.n, m.ma + ": tổng ma trận bằng n");
  assert.deepEqual(Object.keys(M), CHU_DE, m.ma + ": chủ đề theo tên bài, thứ tự bài của sách");
  CHU_DE.forEach((t) => assert.ok(("chu-de:12:" + m.ma + ":" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
  // không chủ đề nào trùng kho cuối kì I: kho này không có câu ôn
  const cu = new Set(m.ck1.map((q) => q.topic)); CHU_DE.forEach((t) => assert.ok(!cu.has(t), m.ma + ": chủ đề trùng kho cuối kì I: " + t));
  m.DE.forEach((id) => {
    const qs = m.kho.filter((q) => q.src === id);
    assert.deepEqual([...new Set(qs.map((q) => q.topic))], CHU_DE, id + ": đủ chủ đề, đúng thứ tự");
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => qs.filter((q) => q.topic === t && q.lv === l).length), v, id + " đúng ma trận ở chủ đề " + t));
    // lời dặn: sách, phạm vi, số câu mỗi phần (tính từ ma trận), trường học khác phạm vi; không có câu về đề chung của Sở (chỉ cuối kì)
    const note = bank(id).note;
    assert.ok(note.startsWith("Sách Kết nối tri thức, " + (m.ma === "hoahoc" ? "Hoá học" : m.ten) + " 12. " + m.DAU), id + ": lời dặn mở đầu bằng sách, phạm vi");
    m.PHAN.forEach(([p, tu, den]) => { const k = sum(CHU_DE.filter((t) => soBai[t] >= tu && soBai[t] <= den).map((t) => sum(M[t]))); assert.ok(note.includes(p + " " + k + " câu"), id + ": lời dặn ghi “" + p + " " + k + " câu”"); });
    assert.equal(sum(m.PHAN.map(([, tu, den]) => sum(CHU_DE.filter((t) => soBai[t] >= tu && soBai[t] <= den).map((t) => sum(M[t]))))), m.pool.n, m.ma + ": các phần của lời dặn phủ hết ma trận");
    m.SAU.forEach((s) => assert.ok(note.includes(s), id + ": lời dặn có “" + s + "”"));
    assert.ok(!/Sở GD&ĐT|đề chung/.test(note), id + ": đề giữa kì không có câu về đề chung của Sở");
    assert.ok(note.endsWith("Một số câu cần máy tính cầm tay. Có lời giải từng câu."), id + ": lời dặn kết thúc như kho cuối kì I");
  });
  // chủ đề đúng tên bài trong mục lục (README của cuốn ở OnUp-Book)
  const readme = path.join(BOOK, "lop-12", m.sach, "README.md");
  if (fs.existsSync(readme)) {
    const ml = Object.fromEntries([...fs.readFileSync(readme, "utf8").matchAll(/Bài (\d+)\. ([^|]+?) \|/g)].map((x) => [+x[1], x[2].trim()]));
    m.BAI.forEach(([t, b]) => assert.equal(t, ml[b], m.ma + ": tên Bài " + b + " theo mục lục"));
    // các bài trong phạm vi mà không có chủ đề riêng là bài tập, ôn tập
    const pv = m.PHAN.flatMap(([, tu, den]) => Array.from({ length: den - tu + 1 }, (_, i) => tu + i)).filter((b) => !m.BAI.some((x) => x[1] === b));
    pv.forEach((b) => assert.ok(/^(?:Bài tập|Ôn tập)/.test(ml[b]), m.ma + ": Bài " + b + " (" + ml[b] + ") không có chủ đề riêng"));
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
  // và không dưới một phần sáu: đáp án đúng không bao giờ ở hai đầu thì học sinh loại được lựa chọn dài nhất, ngắn nhất mà đoán
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

/* ---------- so với kho cuối kì I cùng môn: đề bài không gần trùng ----------
   Cặp hai âm tiết liền nhau (Rút ra N25; như tests/khtn9-gk1.js): đề bài cùng các lựa chọn có từ 4 cặp chung với một câu của kho cuối kì I
   và số cặp chung từ một nửa số cặp của câu ít cặp hơn thì báo. Không tính cặp có số hay chữ đơn, cặp của nhãn chủ đề, cụm chung của đề
   (CUM) và cặp có ở từ 3% số câu của file. */
{
  const CUM = ["mỗi ý sau đúng hay sai", "nhận xét nào sau đây đúng", "làm tròn kết quả đến chữ số thập phân thứ hai", "thể tích mol khí", "điều kiện chuẩn", "trình bày lời giải"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => c.split(" ").every((x) => /\p{L}{2}/u.test(x))); };
  const gan_ = [];
  MON.forEach((m) => {
    const ca = BANKS.filter((b) => b.file === m.file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)), df = {};
    ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
    const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nhan.has(c) && df[c] < 0.03 * ca.length)); };
    m.kho.forEach((q) => { const c = capAm(q); m.ck1.forEach((p) => { const d = capAm(p), chung = [...c].filter((x) => d.has(x)); if (chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size)) gan_.push(`${ten.get(q)} ~ ${ten.get(p)}: ${chung.join(", ")}`); }); });
  });
  assert.deepEqual(gan_, [], "đề bài gần trùng câu của kho cuối kì I");
}

/* ---------- dò lộ đáp án giữa hai câu rút được cùng lúc ----------
   Đề ngẫu nhiên rút một câu mỗi ô (một số ô rút 2), đề “Ôn chủ đề” rút chung mọi câu của một chủ đề (trừ tự luận), nên xét mọi cặp câu
   cùng môn, trừ cặp có câu tự luận nằm cùng một ô rút 1 câu. Đáp án là số (trả lời ngắn, lựa chọn đúng dạng “4,86 tấn”; từ hai chữ số,
   hoặc số thập phân, hoặc có luỹ thừa của 10) tìm ở vị trí kết quả của câu kia (ngay sau “=”, “≈”, “là”, “bằng”, “được”; không tính số
   đứng trước một phép tính) cùng đơn vị: không được có. Đáp án bằng chữ tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì
   lấy cả đáp án); chuỗi có trong đề bài, lựa chọn, lời giải của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM. */
const DON_VI = "(?:rad\\/s|m\\/s²|m\\/s|MHz|Hz|mWb|Wb|cm²|cm|m³|mL|ms|mol|kg|kJ|tấn|vòng|lít|L|T|N|V|A|Ω|J|g|s|m|%)";
const soDV = new RegExp("^(" + NUM + ")(?: ?\\(?(" + DON_VI + ")\\)?)?$", "u");
// “10⁵” (luỹ thừa viết liền) không phải số 10
const KQ = new RegExp("(?:=|≈|(?:^|[\\s(])(?:là|bằng|được))\\s+(" + NUM + ")(?![\\d,⁰¹²³⁴⁵⁶⁷⁸⁹])(?!\\s*[·+−:×/](?:\\s|\\d|\\())(?: ?\\(?(" + DON_VI + ")(?![\\p{L}]))?", "gu");
const kqSo = (s) => [...String(s).matchAll(KQ)].map((x) => ({ v: val(x[1]), u: x[2] || "" }));
const tuCua = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum3 = (s) => { const w = tuCua(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
// chuỗi 3 từ chung của môn (thuật ngữ, cách nói của bài học) không làm lộ đáp án nào: bỏ qua khi là một phần của đáp án dài hơn
const CUM_CHUNG = new Set(["dòng điện cảm", "điện cảm ứng", "suất điện động", "điện động cảm", "động cảm ứng", "các đường sức", "đường sức từ", "với các đường",
  "cảm ứng từ", "của dòng điện", "dòng điện chạy", "điện chạy qua", "điện chạy trong", "từ trường đều", "từ trường trong", "một từ trường", "từ trường có",
  "ra từ trường", "sinh ra từ", "sinh ra dòng", "ra dòng điện", "điện từ trường", "đoạn dây dẫn", "từ thông qua", "thông qua cuộn", "qua cuộn dây",
  "các cuộn dây", "cuộn thứ cấp", "vuông góc với", "song song với", "trong mặt phẳng", "mặt phẳng khung", "có các đường", "cách đều nhau", "nam châm điện",
  "của nam châm", "dao động của", "của kim loại", "ion kim loại", "kim loại thành", "nguyên tử kim", "tử kim loại", "kim loại trong", "liên kết kim",
  "kết kim loại", "các electron hoá", "electron hoá trị", "trong tinh thể", "tinh thể kim loại", "tự do trong", "kim loại phản", "ở nhiệt độ", "nhiệt độ thường",
  "tác dụng với", "nhiệt độ cao", "bình điện phân", "phản ứng oxi", "ứng oxi hoá", "oxi hoá khử", "oxi hoá ở", "các phần tử", "sau cùng là", "sinh ra ở",
  "ra ở anode", "ở khu vực"]);
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
// đã xem (Phiên N12-gk2-vatli-hoahoc): chữ chung, câu kia không nói tới điều câu này hỏi. “dòng điện Foucault”: câu bếp từ nói dòng điện
// Foucault làm nóng đáy nồi, không nói về lõi máy biến áp ghép từ lá thép mỏng (câu đó có cả lựa chọn sai nhắc dòng điện Foucault);
// “electron tự do”: câu tính chất vật lí chung nói dẫn điện, tính dẻo, dẫn nhiệt, không nói ánh kim (câu ánh kim có cả lựa chọn sai nhắc
// electron tự do); “bạc (Ag)”: câu dẫn điện tốt nhất và câu thuỷ luyện, mỗi câu không nói điều câu kia hỏi; “Fe₂O₃”: lựa chọn sai của
// câu CO khử oxide, không nói tên quặng; “khu vực cathode”: câu điện phân KBr nói môi trường base ở cathode, không nói Cl₂ tác dụng với NaOH.
const DA_XEM = ["vl2#20 → vl1#20: dòng điện foucault", "hh2#9 → hh1#7: các electron tự", "hh2#9 → hh1#7: electron tự do", "hh2#15 → hh1#8: bạc ag",
  "hh1#15 → hh2#14: fe₂o₃", "hh1#8 → hh2#15: bạc ag", "hh2#2 → hh2#24: khu vực cathode"];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 0,28 T”, “là 4,86 tấn”, cụm của đáp án bằng chữ
{
  const tim = (has) => MON.flatMap((m) => m.kho).find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thuLo = (qs) => { const r = doLo(qs, Object.assign({}, VL.M, HH.M), (q) => q.q.slice(0, 12)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  const khac = tim("Qua mỗi điểm trong một từ trường"), khacH = tim("Kim loại nào sau đây thường gặp trong tự nhiên ở dạng đơn chất?");
  assert.deepEqual(thuLo([tim("Một thanh đồng dài"), gia(khac, "Ví dụ B = 0,28 T.")]), ["0,28 T"]);
  assert.deepEqual(thuLo([tim("Một thanh đồng dài"), gia(khac, "Ví dụ B = 0,28 V.")]), []);
  assert.deepEqual(thuLo([tim("người ta điện phân Al₂O₃ nóng chảy"), gia(khacH, "Lượng nhôm là 4,86 tấn.")]), ["4,86 tấn"]);
  assert.deepEqual(thuLo([tim("Có thể dùng dao cắt dễ dàng một mẩu sodium"), gia(khacH, "Vì liên kết kim loại trong tinh thể của chúng yếu.")]).length > 0, true);
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ----------
   Cụm từ chung của môn (tên bài, cách nói chuẩn khi cho số liệu) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ. */
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const TU_CHUNG = [...VL.BAI, ...HH.BAI].map((b) => b[0]).concat(["mỗi ý sau đúng hay sai", "làm tròn kết quả đến chữ số thập phân thứ hai", "cho thế điện cực chuẩn",
  "ở điều kiện chuẩn", "điều kiện chuẩn thể tích mol khí", "viết phương trình hoá học của phản ứng", "sau khi các phản ứng xảy ra hoàn toàn", "trình bày lời giải",
  "lực từ tác dụng lên đoạn dây dẫn mang dòng điện", "lực từ tác dụng lên đoạn dây", "suất điện động cảm ứng trong cuộn dây", "độ lớn của suất điện động cảm ứng",
  "một từ trường đều có cảm ứng từ", "các đường sức của một từ trường đều", "vuông góc với các đường sức", "vuông góc với mặt phẳng vòng dây",
  "cường độ hiệu dụng của dòng điện xoay chiều", "dựa trên hiện tượng cảm ứng điện từ", "điện áp hiệu dụng giữa hai đầu cuộn"])
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
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả kho cuối kì I cùng file và câu riêng của
   các đề ngẫu nhiên; với kho cuối kì I cùng môn: đề bài không có chuỗi 6 từ nào trùng (Rút ra N9-gk1-toan) ---------- */
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
MON.forEach((m) => console.log(`${m.ten} 12 giữa kì II: kho ${m.kho.length} câu (${m.DE.length} đề cố định, ${m.pool.n} câu mỗi đề), ma trận 10 – 8 – 7 trên ${Object.keys(m.M).length} chủ đề; ` +
  `${m.kho.filter((q) => q.type === "tf4").length} câu đúng/sai 4 ý, ${m.kho.filter((q) => q.type === "num").length} câu trả lời ngắn, ${m.kho.filter((q) => q.type === "essay").length} câu tự luận, ${m.kho.filter((q) => q.svg).length} hình; đáp án đúng dài nhất hoặc ngắn nhất ở ${m.le} câu nhiều lựa chọn.`));
console.log(n + " câu đã tính lại hoặc đọc lại hình (" + soPT + " phương trình hoá học cân bằng).");
console.log("MATH OK");
