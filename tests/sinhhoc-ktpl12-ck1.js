// Kiểm tra ngân hàng Sinh học 12 và GDKT&PL 12 cuối kì I của Phiên N12-ck1-sinhhoc-ktpl (data/banks/12-sinhhoc.js, data/banks/12-ktpl.js:
// mỗi môn hai đề cố định và đề ngẫu nhiên lấy câu của hai đề đó, không có câu riêng), theo mẫu tests/vatli-hoahoc12-ck1.js (phần chung),
// tests/khtn9-gk2.js (phần Sinh học), tests/lsdl-gdcd9-ck1.js (phần GDCD). Số đề, số câu lấy từ danh mục (không ghi cứng).
// Câu có phép tính hoặc có hình nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong kho, đúng đề ghi ở id); số liệu đọc từ chữ
// của đề, đáp án tính bằng code (so với ans, o[0] hoặc các ý tính được của câu đúng/sai 4 ý; câu tự luận so với thang chấm và đáp số).
// Sinh học: phiên mã (mạch khuôn 3' → 5', mRNA bổ sung, ngược chiều), dịch mã theo bảng mã di truyền chuẩn (bộ ba kết thúc, số amino
// acid, số liên kết peptide, số nucleotide của mRNA), bộ ba đối mã; phép lai các cặp gene phân li độc lập (đếm kiểu gene, kiểu hình,
// tỉ lệ bằng phân số chính xác), trội không hoàn toàn, tương tác bổ sung theo con đường chuyển hoá, tương tác cộng gộp, phép lai phân
// tích; gene trên NST X (máu khó đông, mèo lông pha hai màu), giao tử khi hoán vị gene (dị hợp tử đều, dị hợp tử chéo), tần số hoán
// vị từ kết quả lai phân tích; số NST của thể lệch bội, đa bội, giao tử khi một cặp NST không phân li ở giảm phân I; tần số allele,
// Hardy – Weinberg, tự thụ phấn qua nhiều thế hệ. Đọc lại hình: phả hệ (hình vuông nam, hình tròn nữ, tô đậm là người bệnh, đoạn vợ
// chồng, đường anh chị em) rồi thử cả bốn kiểu di truyền (lặn, trội; NST thường, NST X), chỉ một kiểu khớp; bản đồ di truyền (vị trí
// đúng tỉ lệ, vạch dưới tên gene); hai NST trước và sau đột biến (ô có chữ, tâm động), nhận ra chuyển đoạn giữa hai NST.
// GDKT&PL: tốc độ tăng trưởng GDP, GNI bình quân đầu người từ GDP và chênh lệch thu nhập với nhân tố nước ngoài, cơ cấu ngành kinh tế,
// hệ số Gini, ngân sách gia đình (tỉ lệ phân chia, số tháng tiết kiệm), số tiền trong bài gợi ý của hai câu tự luận.
// Rồi: chữ (số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân; thuật ngữ như sách in năm 2026: gene, allele, DNA, RNA, Mendel,
// Hardy – Weinberg, không tên kiểu cũ; dấu thanh kiểu sách “hoá”, “thuỷ”; GDKT&PL: chỉ số thu nhập trong HDI tính bằng GNI/người, Sở Nội
// vụ, Luật Bảo hiểm xã hội năm 2024), lời dặn của đề (phạm vi, số câu mỗi phần theo ma trận, bài học tiếp theo, câu về đề chung của Sở),
// môn và lịch thi, mức độ và ma trận 10 – 8 – 7 (chủ đề theo tên bài và thứ tự của sách, đối chiếu mục lục trong README của cuốn ở
// OnUp-Book; hai đề cố định chia đúng ma trận), dạng câu theo khung Công văn 7991 (mỗi kho ít nhất 6 câu đúng/sai 4 ý không lặp kiểu Đ/S,
// Sinh học ít nhất 4 câu trả lời ngắn đáp án là số, 1–2 câu tự luận ở ô Vận dụng rút 1 câu), GDKT&PL câu tình huống là chính, đáp án
// đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn, không là lựa
// chọn duy nhất có chữ của nhãn chủ đề, rút thử nhiều lần (đúng ma trận; đã làm hết một đề cố định thì không rút lại câu của đề đó), đề
// bài không trùng, dò lộ đáp án giữa mọi cặp câu rút được cùng lúc (đề “Ôn chủ đề” rút chung cả chủ đề; số ở vị trí kết quả của câu
// kia: không được có; chuỗi 3 từ của đáp án bằng chữ in ra với DO_LO=1 để xem tay, đã xem ghi ở DA_XEM). Có sách ở ../OnUp-Book thì so
// mọi trường chữ với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp nguyên âm (không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và với
// câu của mọi kho khác, cả câu riêng của các đề ngẫu nhiên (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 6 từ).
// Chạy: node tests/sinhhoc-ktpl12-ck1.js → in MATH OK.
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
   lục); RUT_GON: tên bài rút gọn cho vừa mã đề "Ôn chủ đề" (tối đa 80 kí tự); CHUONG: tên chương in hoa trong mục lục của cuốn. */
const MON = [
  { ma: "sinhhoc", ten: "Sinh học", sach: "sinh-hoc-12", ki: "sh", pham: "Sinh học: Bài 1–18",
    PHAN: [["Chương 1 Di truyền phân tử (Bài 1–6)", 1, 6], ["Chương 2 Di truyền nhiễm sắc thể (Bài 7–14)", 7, 14],
      ["Chương 3 Mở rộng học thuyết di truyền nhiễm sắc thể (Bài 15–17)", 15, 17], ["Chương 4 Di truyền quần thể (Bài 18)", 18, 18]],
    sau: "Trường đã học sang Phần năm Tiến hoá (Bài 19)",
    BAI: [["DNA và cơ chế tái bản DNA", 1], ["Gene, hệ gene và quá trình truyền đạt thông tin di truyền", 2], ["Điều hoà biểu hiện gene", 3],
      ["Đột biến gene", 4], ["Công nghệ gene", 5], ["Cấu trúc và chức năng của nhiễm sắc thể", 7], ["Học thuyết di truyền Mendel", 8],
      ["Mở rộng học thuyết Mendel", 9], ["Di truyền giới tính và di truyền liên kết với giới tính", 10], ["Liên kết gene và hoán vị gene", 11],
      ["Đột biến nhiễm sắc thể", 12], ["Di truyền học người và di truyền y học", 13], ["Di truyền gene ngoài nhân", 15],
      ["Tương tác giữa kiểu gene với môi trường, thành tựu chọn giống", 16], ["Di truyền học quần thể", 18]],
    RUT_GON: { "Tương tác giữa kiểu gene với môi trường, thành tựu chọn giống": "Tương tác giữa kiểu gene với môi trường và thành tựu chọn giống" } },
  { ma: "ktpl", ten: "GDKT&PL", sach: "giao-duc-kinh-te-va-phap-luat-12", ki: "kt", pham: "GDKT&PL: Bài 1–7",
    PHAN: [["Bài 1–3 (Tăng trưởng và phát triển kinh tế; Hội nhập kinh tế quốc tế; Bảo hiểm)", 1, 3],
      ["Bài 4–7 (An sinh xã hội; Lập kế hoạch kinh doanh; Trách nhiệm xã hội của doanh nghiệp; Quản lí thu, chi trong gia đình)", 4, 7]],
    sau: "Trường đã học sang Phần hai Giáo dục pháp luật (Bài 8)",
    BAI: [["Tăng trưởng và phát triển kinh tế", 1], ["Hội nhập kinh tế quốc tế", 2], ["Bảo hiểm", 3], ["An sinh xã hội", 4],
      ["Lập kế hoạch kinh doanh", 5], ["Trách nhiệm xã hội của doanh nghiệp", 6], ["Quản lí thu, chi trong gia đình", 7]],
    RUT_GON: {} }
];
const ten = new Map();
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
    assert.equal(b.title, m.ten + " 12 · Cuối kì I · Đề " + (k + 1), id + ": tên đề");
    assert.equal(b.questions.length, b.n, id + ": số câu bằng n của danh mục");
    m.kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, m.ki + (k + 1) + "#" + (i + 1)));
  });
  assert.equal(m.kho.length, sum(m.DE.map((id) => bank(id).n)), m.ma + ": kho = câu của hai đề cố định");
});
const [SH, KT] = MON;
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
    assert.ok(ev.scope.includes(m.pham + "."), "phạm vi của ck1-l12 ghi " + m.pham);
    assert.equal(m.PHAN[m.PHAN.length - 1][2], +/–(\d+)$/.exec(m.pham)[1], m.ma + ": phần cuối của lời dặn đến đúng bài cuối của phạm vi");
  });
}

/* ---------- số ----------
   Số trong đề: hàng nghìn ngăn bằng khoảng trắng, dấu phẩy thập phân. Tỉ lệ viết phân số "a/b" (đáp án câu trả lời ngắn, lựa chọn). */
const NUM = "[−-]?\\d{1,3}(?: \\d{3})*(?:,\\d+)?";
const val = (s) => { const m = /^[−-]?\d{1,3}(?: \d{3})*(?:,\d+)?$/.exec(String(s).trim()); assert.ok(m, "không đọc được số “" + s + "”"); return +String(s).trim().replace(/ /g, "").replace("−", "-").replace(",", "."); };
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
// mẫu chữ có # ở chỗ số: so("Cho # g", s) → [số]
const R = (mau) => new RegExp(mau.split("#").map(escRe).join("(" + NUM + ")"), "u");
const so = (s, mau) => { const m = R(mau).exec(s); assert.ok(m, "không thấy “" + mau + "” trong: " + String(s).slice(0, 80)); return m.slice(1).map(val); };
const gan = (a, b, e = 1e-9) => a === b || Math.abs(a - b) <= e * Math.max(Math.abs(a), Math.abs(b));
// số viết kiểu Việt Nam: 7500 → "7 500", 0.15 → "0,15"
const vn = (x, d = 6) => { const r = Math.round(x * 10 ** d) / 10 ** d, [a, b] = String(Math.abs(r)).split("."); return (r < 0 ? "−" : "") + a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); };
const coX = (q, ...cum) => cum.forEach((c) => assert.ok(q.x.includes(c), "lời giải cần có “" + c + "”"));
const coThang = (q, ...cum) => { const r = q.rubric.map((c) => c.c).join(" | "); cum.forEach((c) => assert.ok(r.includes(c), "thang chấm cần có “" + c + "”")); };
const dapSo = (q) => { const m = /^Đáp số: (.+)\.$/m.exec(q.x); assert.ok(m, "gợi ý ghi đáp số, kết thúc bằng dấu chấm"); return m[1]; };
// phân số chính xác { n, d }
const ucln = (a, b) => (b ? ucln(b, a % b) : Math.abs(a));
const F = (n, d = 1) => { assert.ok(Number.isInteger(n) && Number.isInteger(d) && d !== 0, "phân số " + n + "/" + d); if (d < 0) { n = -n; d = -d; } const g = ucln(n, d) || 1; return { n: n / g, d: d / g }; };
const fCong = (a, b) => F(a.n * b.d + b.n * a.d, a.d * b.d), fNhan = (a, b) => F(a.n * b.n, a.d * b.d), fTru = (a, b) => fCong(a, F(-b.n, b.d));
const fChu = (f) => f.n + "/" + f.d, fSo = (f) => f.n / f.d;
const docPS = (s) => { const m = /^(\d+)\/(\d+)$/.exec(String(s).trim()); assert.ok(m, "không đọc được phân số “" + s + "”"); return F(+m[1], +m[2]); };

/* ---------- di truyền ---------- */
// bảng mã di truyền chuẩn (codon trên mRNA, đọc 5' → 3'); "*" là bộ ba kết thúc
const MA = (() => {
  const b = "UCAG", aa = "FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG", m = {};
  let k = 0; for (const x of b) for (const y of b) for (const z of b) m[x + y + z] = aa[k++];
  return m;
})();
const TEN_AA = { methionine: "M", proline: "P", "glutamic acid": "E", alanine: "A", tryptophan: "W", "aspartic acid": "D", serine: "S", tyrosine: "Y" };
const BO_SUNG_DNA_RNA = { A: "U", T: "A", G: "C", C: "G" }, BO_SUNG_RNA = { A: "U", U: "A", G: "C", C: "G" };
// mạch khuôn viết 3' → 5' (trái sang phải) → mRNA 5' → 3' (trái sang phải)
const phienMa = (khuon) => [...khuon].map((c) => (c === " " ? " " : BO_SUNG_DNA_RNA[c])).join("");
const dichMa = (mrna) => { const cd = mrna.split(" "), out = []; for (const c of cd) { assert.ok(c in MA, "codon " + c); if (MA[c] === "*") break; out.push(MA[c]); } return out; };
// kiểu gene các cặp gene phân li độc lập "AaBbDd" → [["A","a"], …]
const capGene = (g) => { const r = []; for (let i = 0; i < g.length; i += 2) { assert.equal(g[i].toLowerCase(), g[i + 1].toLowerCase(), "cặp allele " + g); r.push([g[i], g[i + 1]]); } return r; };
// đời con của phép lai: Map(kiểu gene → tỉ lệ), mỗi cặp gene viết allele trội trước ("Aa")
const lai = (p1, p2) => {
  const a = capGene(p1), b = capGene(p2); assert.equal(a.length, b.length, "hai bên cùng số cặp gene");
  let kq = [{ g: "", p: F(1) }];
  a.forEach((cap, i) => { const tiep = []; kq.forEach((o) => cap.forEach((x) => b[i].forEach((y) => tiep.push({ g: o.g + [x, y].sort().join(""), p: fNhan(o.p, F(1, 4)) })))); kq = tiep; });
  const m = new Map(); kq.forEach((o) => m.set(o.g, m.has(o.g) ? fCong(m.get(o.g), o.p) : o.p)); return m;
};
const tiLe = (m, dk) => [...m].filter(([g]) => dk(g)).reduce((s, [, p]) => fCong(s, p), F(0));
const troi = (g, chu) => g.includes(chu.toUpperCase()); // có allele trội của gene đó (trội hoàn toàn)
// gene trên NST X: XᴴXʰ → ["H","h"], XᴴY → ["H"]
const MU = { "ᴴ": "H", "ʰ": "h", "ᴰ": "D", "ᵈ": "d" };
const kgX = (s) => { const m = /^X(.)(?:X(.)|Y)$/u.exec(s); assert.ok(m && MU[m[1]] && (!m[2] || MU[m[2]]), "kiểu gene trên X: " + s); return m[2] ? [MU[m[1]], MU[m[2]]] : [MU[m[1]]]; };
// đời con của mẹ (2 allele) × bố (1 allele trên X): [{ gioi, kg, p }]
const laiX = (me, bo) => me.flatMap((a) => [{ gioi: "cái", kg: [a, bo[0]].sort(), p: F(1, 4) }, { gioi: "đực", kg: [a], p: F(1, 4) }]);
// giao tử của cơ thể dị hợp hai cặp gene liên kết "AB/ab" hoặc "Ab/aB" với tần số hoán vị f (phần trăm)
const giaoTu = (kg, f) => { const [x, y] = kg.split("/"), t = f / 100, r = {};
  r[x] = (1 - t) / 2; r[y] = (1 - t) / 2; r[x[0] + y[1]] = t / 2; r[y[0] + x[1]] = t / 2; return r; };

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">");
  return Object.assign(a, { t: m[2], at: [+a.x, +a.y], b: a["font-weight"] === "bold" || a["font-weight"] === "700", fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start" }); });
// mọi chữ trong hình cỡ từ 13, nằm trọn trong khung, không đè lên nhau (ước bề rộng chữ như tests/toan12-ck1.js)
const hopChu = (t) => { const w = (t.b ? 0.62 : 0.55) * t.fs * [...t.t].length, x0 = t.anchor === "middle" ? t.at[0] - w / 2 : t.anchor === "end" ? t.at[0] - w : t.at[0];
  return [x0, t.at[1] - 0.75 * t.fs, x0 + w, t.at[1] + 0.25 * t.fs]; };
const chuHinh = (svg, at) => {
  const v = /viewBox="([^"]+)"/.exec(svg)[1].split(/\s+/).map(Number), T = texts(svg);
  T.forEach((t) => { const h = hopChu(t); assert.ok(t.fs >= 13, at + ": chữ “" + t.t + "” nhỏ hơn cỡ 13"); assert.ok(h[0] >= 0 && h[2] <= v[2] && h[1] >= 0 && h[3] <= v[3], at + ": chữ “" + t.t + "” tràn khỏi khung hình"); });
  T.forEach((t, i) => T.slice(i + 1).forEach((u) => { const a = hopChu(t), b = hopChu(u); assert.ok(!(a[0] < b[2] - 1 && b[0] < a[2] - 1 && a[1] < b[3] - 1 && b[1] < a[3] - 1), at + ": chữ “" + t.t + "” đè lên chữ “" + u.t + "”"); }));
};
const daDoc = new Set();
/* Phả hệ: nam là hình vuông (rect), nữ là hình tròn bán kính 12; người bệnh tô ink, người lành tô surface; số thứ tự ngay dưới mỗi
   người; đoạn ngang nối mép hai người cùng hàng là cặp vợ chồng; từ giữa đoạn đó một đoạn dọc xuống đường anh chị em (đoạn ngang), từ
   đường này mỗi đoạn dọc xuống chạm đỉnh một người con. Mọi đoạn thẳng của hình phải thuộc một trong các vai trò đó. */
const docPhaHe = (svg, at) => {
  const nguoi = tags(svg, "rect").map((r) => ({ gioi: "nam", cx: +r.x + +r.width / 2, cy: +r.y + +r.height / 2, r: +r.width / 2, benh: r.fill === "ink", ok: +r.width === +r.height && ["ink", "surface"].includes(r.fill) }))
    .concat(tags(svg, "circle").map((c) => ({ gioi: "nữ", cx: +c.cx, cy: +c.cy, r: +c.r, benh: c.fill === "ink", ok: ["ink", "surface"].includes(c.fill) })));
  assert.ok(nguoi.every((n) => n.ok && n.r === 12), at + ": mỗi người là hình vuông cạnh 24 hoặc hình tròn bán kính 12, tô ink (bệnh) hoặc surface");
  const T = texts(svg);
  nguoi.forEach((n) => { const s = T.filter((t) => /^\d+$/.test(t.t) && Math.abs(t.at[0] - n.cx) < 0.5 && t.at[1] > n.cy + n.r && t.at[1] <= n.cy + n.r + 20 && t.anchor === "middle");
    assert.equal(s.length, 1, at + ": mỗi người có đúng một số thứ tự ngay bên dưới"); n.so = +s[0].t; });
  assert.deepEqual(nguoi.map((n) => n.so).sort((a, b) => a - b), nguoi.map((_, i) => i + 1), at + ": số thứ tự 1, 2, 3…");
  const L = tags(svg, "line").map((l) => ({ x1: +l.x1, y1: +l.y1, x2: +l.x2, y2: +l.y2, dung: false }));
  assert.ok(L.every((l) => l.x1 === l.x2 || l.y1 === l.y2), at + ": đoạn thẳng chỉ nằm ngang hoặc dọc");
  const ngang = L.filter((l) => l.y1 === l.y2), doc = L.filter((l) => l.x1 === l.x2 && l.y1 !== l.y2);
  const con = new Map();
  ngang.forEach((l) => {
    const xa = Math.min(l.x1, l.x2), xb = Math.max(l.x1, l.x2);
    const a = nguoi.find((n) => n.cy === l.y1 && n.cx + n.r === xa), b = nguoi.find((n) => n.cy === l.y1 && n.cx - n.r === xb);
    if (!a || !b) return; // không phải đoạn vợ chồng
    l.dung = true; assert.ok(a.gioi !== b.gioi, at + ": vợ chồng gồm một nam và một nữ");
    const xm = (xa + xb) / 2, d = doc.find((v) => v.x1 === xm && Math.min(v.y1, v.y2) === l.y1);
    if (!d) return; // cặp vợ chồng chưa có con trong hình
    d.dung = true;
    const yS = Math.max(d.y1, d.y2), s = ngang.find((h) => h.y1 === yS && Math.min(h.x1, h.x2) <= xm && Math.max(h.x1, h.x2) >= xm);
    assert.ok(s, at + ": có đường anh chị em ngay dưới cặp vợ chồng"); s.dung = true;
    const ve = doc.filter((v) => v !== d && Math.min(v.y1, v.y2) === yS);
    assert.ok(ve.length >= 1 && ve.every((v) => v.x1 >= Math.min(s.x1, s.x2) && v.x1 <= Math.max(s.x1, s.x2)), at + ": các đoạn xuống con nằm trên đường anh chị em");
    assert.ok([Math.min(s.x1, s.x2), Math.max(s.x1, s.x2)].every((x) => ve.some((v) => v.x1 === x)), at + ": hai đầu đường anh chị em là hai người con");
    const bo = a.gioi === "nam" ? a : b, me = a.gioi === "nam" ? b : a;
    ve.forEach((v) => { const c = nguoi.find((n) => n.cx === v.x1 && n.cy - n.r === Math.max(v.y1, v.y2)); assert.ok(c, at + ": đoạn dọc phải chạm đỉnh một người con"); v.dung = true;
      assert.ok(!con.has(c.so), at + ": mỗi người có một cặp bố mẹ"); con.set(c.so, { bo, me }); });
  });
  assert.ok(L.every((l) => l.dung), at + ": đoạn thẳng không thuộc cặp vợ chồng, đường anh chị em hay đoạn xuống con");
  chuHinh(svg, at); daDoc.add(svg);
  return { nguoi, con, so: (k) => nguoi.find((n) => n.so === k) };
};
// các kiểu di truyền khớp với phả hệ: thử mọi cách gán kiểu gene cho từng người theo kiểu hình của họ
const kieuDiTruyen = (ph) => {
  const KIEU = { "lặn, NST thường": ["thuong", false], "trội, NST thường": ["thuong", true], "lặn, NST X": ["X", false], "trội, NST X": ["X", true] };
  return Object.keys(KIEU).filter((k) => {
    const [noi, laTroi] = KIEU[k];
    const kg = (n) => (noi === "X" && n.gioi === "nam" ? [["A"], ["a"]] : [["A", "A"], ["A", "a"], ["a", "a"]])
      .filter((g) => (laTroi ? g.includes("A") : !g.includes("A")) === n.benh);
    const ds = ph.nguoi, gan_ = new Map();
    const hopLe = () => [...ph.con].every(([s, { bo, me }]) => {
      const c = gan_.get(s), b = gan_.get(bo.so), m = gan_.get(me.so); if (!c || !b || !m) return true;
      if (noi === "thuong") return b.some((x) => m.some((y) => [x, y].sort().join("") === [...c].sort().join("")));
      return ph.so(s).gioi === "nam" ? m.includes(c[0]) : m.some((y) => [b[0], y].sort().join("") === [...c].sort().join(""));
    });
    const thu = (i) => { if (i === ds.length) return true; return kg(ds[i]).some((g) => { gan_.set(ds[i].so, g); const ok = hopLe() && thu(i + 1); gan_.delete(ds[i].so); return ok; }); };
    return thu(0);
  });
};
/* Bản đồ di truyền: NST là đoạn ngang dày; mỗi gene một vạch dọc cắt NST, tên gene (chữ in hoa, đậm) ngay trên vạch, vị trí (đơn vị
   bản đồ) ngay dưới vạch; vị trí phải đúng tỉ lệ (hoành độ = x₀ + k · vị trí). */
const docBanDo = (svg, at) => {
  const T = texts(svg), gene = T.filter((t) => /^[A-Z]$/.test(t.t)), soVT = T.filter((t) => /^\d+$/.test(t.t)), L = tags(svg, "line");
  const nst = L.filter((l) => l.y1 === l.y2 && +l["stroke-width"] >= 4); assert.equal(nst.length, 1, at + ": một NST");
  const y = +nst[0].y1, x0 = Math.min(+nst[0].x1, +nst[0].x2), x1 = Math.max(+nst[0].x1, +nst[0].x2);
  const vach = L.filter((l) => l.x1 === l.x2 && Math.min(+l.y1, +l.y2) < y && Math.max(+l.y1, +l.y2) > y).map((l) => +l.x1);
  assert.equal(vach.length, gene.length, at + ": mỗi gene một vạch");
  const vt = {};
  gene.forEach((g) => {
    assert.ok(g.b && g.anchor === "middle" && g.at[1] < y && vach.includes(g.at[0]) && g.at[0] > x0 && g.at[0] < x1, at + ": tên gene " + g.t + " ngay trên vạch, trong đoạn NST");
    const s = soVT.filter((n) => n.at[0] === g.at[0] && n.at[1] > y && n.anchor === "middle"); assert.equal(s.length, 1, at + ": vị trí ngay dưới gene " + g.t);
    vt[g.t] = { v: +s[0].t, x: g.at[0] };
  });
  const ds = Object.values(vt).sort((a, b) => a.v - b.v), k = (ds[ds.length - 1].x - ds[0].x) / (ds[ds.length - 1].v - ds[0].v);
  ds.forEach((d) => assert.ok(Math.abs(ds[0].x + k * (d.v - ds[0].v) - d.x) < 0.5, at + ": vị trí " + d.v + " không đúng tỉ lệ"));
  chuHinh(svg, at); daDoc.add(svg);
  return Object.fromEntries(Object.entries(vt).map(([g, d]) => [g, d.v]));
};
/* Hai NST trước và sau đột biến: dưới nhãn “Trước đột biến” và “Sau đột biến” mỗi NST một hàng, đầu hàng ghi “NST 1”, “NST 2”; mỗi đoạn
   là một ô chữ nhật có một chữ cái ở giữa; tâm động là chấm tròn tô ink bán kính 7 trên cùng hàng. */
const docHaiNST = (svg, at) => {
  const T = texts(svg), o = tags(svg, "rect").map((r) => ({ x: +r.x, y: +r.y, w: +r.width, h: +r.height })), tam = tags(svg, "circle").filter((c) => +c.r === 7 && c.fill === "ink");
  const chuO = (r) => { const c = T.filter((t) => t.at[0] === r.x + r.w / 2 && t.at[1] > r.y && t.at[1] < r.y + r.h); assert.equal(c.length, 1, at + ": mỗi ô một chữ"); return c[0].t; };
  const nhan = (s) => { const t = T.find((x) => x.t === s); assert.ok(t, at + ": nhãn " + s); return t.at[1]; };
  const yT = nhan("Trước đột biến"), yS = nhan("Sau đột biến");
  const hang = T.filter((t) => /^NST \d$/.test(t.t)).map((t) => {
    const y = t.at[1] - 16, ds = o.filter((r) => r.y === y).map((r) => ({ x: r.x, c: chuO(r) })).concat(tam.filter((c) => +c.cy === y + 11).map((c) => ({ x: +c.cx, c: "•" })));
    assert.equal(ds.filter((d) => d.c === "•").length, 1, at + ": mỗi NST một tâm động");
    return { y, ten: t.t, s: ds.sort((a, b) => a.x - b.x).map((d) => d.c).join("") };
  });
  assert.equal(o.length + tam.length, sum(hang.map((h) => h.s.length)), at + ": mọi ô, tâm động đều thuộc một hàng NST");
  const lay = (a, b) => hang.filter((h) => h.y > a && h.y < b).sort((p, q) => p.y - q.y);
  const truoc = lay(yT, yS), sau = lay(yS, Infinity);
  assert.deepEqual(truoc.map((h) => h.ten), ["NST 1", "NST 2"]); assert.deepEqual(sau.map((h) => h.ten), ["NST 1", "NST 2"]);
  chuHinh(svg, at); daDoc.add(svg);
  return { truoc: truoc.map((h) => h.s), sau: sau.map((h) => h.s) };
};
// dạng đột biến cấu trúc giữa hai NST không tương đồng: chuyển đoạn khi hai đoạn đầu mút (không chứa tâm động) đổi chỗ cho nhau
const chuyenDoan = ([a, b], [a2, b2]) => {
  for (let i = a.indexOf("•") + 1; i < a.length; i++) for (let j = b.indexOf("•") + 1; j < b.length; j++)
    if (a2 === a.slice(0, i) + b.slice(j) && b2 === b.slice(0, j) + a.slice(i)) return true;
  return false;
};

/* ---------- các câu cần tính ----------
   id: sh1, sh2 (Sinh học Đề 1, 2), kt1, kt2 (GDKT&PL Đề 1, 2); has: đoạn chữ có trong đúng một câu. right(q) trả đáp án tính được
   (số, phân số "a/b", lựa chọn đúng, hoặc mảng 4 ý của câu đúng/sai, null ở ý không tính bằng code); essay(q) kiểm tra câu tự luận. */
const y = (o, re) => { const m = re.exec(o); assert.ok(m, "không đọc được ý “" + o + "”"); return m; };
const CHECKS = [
  // ---- Sinh học, Đề 1 ----
  { id: "sh1", has: "3'–TAC GGA CTT ATT–5'", right: (q) => {
    const khuon = /3'–([ACGT ]+)–5'/.exec(q.q)[1], mrna = phienMa(khuon), aa = dichMa(mrna), cd = mrna.split(" ");
    [...q.q.matchAll(/([AUGC]{3}) – ([a-z ]+) \(([A-Z][a-z]{2})\)/g)].forEach((m) => assert.equal(MA[m[1]], TEN_AA[m[2]], "bảng mã đề cho: " + m[1]));
    [...q.q.matchAll(/([AUGC]{3}) – bộ ba kết thúc/g)].forEach((m) => assert.equal(MA[m[1]], "*", m[1] + " là bộ ba kết thúc"));
    const [a, b, c, d] = q.o;
    const ma = y(a, /trình tự 5'–([AUGC ]+)–3'\.$/)[1], sl = +y(b, /gồm (\d+) amino acid\.$/)[1], ac = y(c, /amino acid thứ (hai) của chuỗi có bộ ba đối mã \(anticodon\) là 3'–([AUGC]{3})–5'\.$/)[2];
    coX(q, "Met – Pro – Glu", "3'–GGA–5'");
    return [ma === mrna, sl === aa.length, [...cd[1]].map((x) => BO_SUNG_RNA[x]).join("") === ac, !/theo chiều 3' → 5'/.test(d)]; } },
  { id: "sh1", has: "gồm 1 503 nucleotide", right: (q) => {
    const [n] = so(q.q, "gồm # nucleotide"), [r] = so(q.q, "Có # ribosome"); assert.equal(n % 3, 0);
    const aa = n / 3 - 1; coX(q, vn(n / 3), vn(aa), vn(aa - 1), vn((aa - 1) * r)); return (aa - 1) * r; } },
  { id: "sh1", has: "allele A quy định quả tròn", right: (q) => {
    const m = lai("AaBb", "AaBb"), [a, b, c, d] = q.o;
    const soKG = +y(a, /có (\d+) loại kiểu gene\.$/)[1], tl1 = y(b, /chiếm tỉ lệ (\d+\/\d+)\.$/)[1], tl2 = y(c, /chiếm tỉ lệ (\d+\/\d+)\.$/)[1], kg = +y(d, /có (\d+) loại kiểu gene\.$/)[1];
    assert.ok(/quả dài, hoa vàng/.test(b) && /dị hợp về cả hai cặp gene/.test(c) && /quả tròn, hoa trắng/.test(d), "thứ tự các ý");
    return [soKG === m.size, fChu(tiLe(m, (g) => !troi(g, "a") && troi(g, "b"))) === tl1, fChu(tiLe(m, (g) => g === "AaBb")) === tl2,
      [...m.keys()].filter((g) => troi(g, "a") && !troi(g, "b")).length === kg]; } },
  { id: "sh1", has: "Cho cây X (lá xẻ, hoa kép)", essay: (q) => {
    // phép lai phân tích ra 4 kiểu hình ngang nhau: chỉ DdEe trong các kiểu gene lá xẻ, hoa kép
    const kh = (m) => { const r = new Map(); m.forEach((p, g) => { const k = (troi(g, "d") ? "D" : "d") + (troi(g, "e") ? "E" : "e"); r.set(k, r.has(k) ? fCong(r.get(k), p) : p); }); return r; };
    const X = ["DDEE", "DDEe", "DdEE", "DdEe"].filter((g) => { const r = kh(lai(g, "ddee")); return r.size === 4 && [...r.values()].every((p) => fChu(p) === "1/4"); });
    assert.deepEqual(X, ["DdEe"]);
    // câu b: X lai với cây có kiểu gene cho trong đề, tỉ lệ kiểu hình hỏi trong đề (lá xẻ D–, lá nguyên dd; hoa kép E–, hoa đơn ee)
    const [, ban, la, hoa] = /b\) Cho cây X lai với cây có kiểu gene (\w+)\. Theo lí thuyết, cây (lá xẻ|lá nguyên), (hoa kép|hoa đơn) chiếm/.exec(q.q);
    const tl = fChu(tiLe(lai("DdEe", ban), (g) => troi(g, "d") === (la === "lá xẻ") && troi(g, "e") === (hoa === "hoa kép")));
    assert.equal(dapSo(q), "a) DdEe; b) " + tl); coThang(q, "ddee", "DdEe", " = " + tl); coX(q, " = " + tl + "."); } },
  { id: "sh1", has: "sắc tố tím được tạo ra qua hai phản ứng nối tiếp", right: (q) => {
    assert.ok(q.q.includes("Cho cây AaBb tự thụ phấn") && q.q.includes("cây hoa trắng")); return fChu(fTru(F(1), tiLe(lai("AaBb", "AaBb"), (g) => troi(g, "a") && troi(g, "b")))); } },
  { id: "sh1", has: "bệnh máu khó đông", right: (q) => {
    // vợ không bệnh, bố vợ bệnh (Xʰ Y) nên vợ nhận Xʰ: XᴴXʰ; chồng không bệnh: XᴴY
    assert.ok(/Một cặp vợ chồng đều không mắc bệnh; bố của người vợ mắc bệnh này/.test(q.q)); coX(q, "XᴴXʰ", "XᴴY");
    const p = laiX(kgX("XᴴXʰ"), kgX("XᴴY")).filter((c) => c.gioi === "đực" && c.kg[0] === "h").reduce((s, c) => fCong(s, c.p), F(0));
    return fChu(p); } },
  { id: "sh1", has: "Một cơ thể có kiểu gene AB/ab", right: (q) => { const [f] = so(q.q, "với tần số #%"); return vn(giaoTu("AB/ab", f).Ab * 100) + "%"; } },
  { id: "sh1", has: "lai với cây lá hẹp, hạt dài, đời con gồm", right: (q) => {
    assert.ok(/allele m quy định lá hẹp/.test(q.q) && /allele n quy định hạt dài/.test(q.q), "cây lá hẹp, hạt dài là mmnn: phép lai phân tích");
    const sl = [...q.q.matchAll(/(\d+) cây lá (rộng|hẹp), hạt (tròn|dài)/g)].map((m) => ({ n: +m[1], k: m[2] + m[3] }));
    assert.equal(sl.length, 4); const tong = sum(sl.map((s) => s.n)), nho = [...sl].sort((a, b) => a.n - b.n).slice(0, 2);
    // nhóm ít là tái tổ hợp: hai kiểu hình đối nhau của hai nhóm nhiều (bố mẹ) được xếp chéo
    assert.ok(nho.some((s) => s.k === "rộngdài") && nho.some((s) => s.k === "hẹptròn"), "kiểu tái tổ hợp");
    return (sum(nho.map((s) => s.n)) / tong) * 100; } },
  { id: "sh1", has: "bộ NST 2n = 20", right: (q) => {
    const [n2] = so(q.q, "bộ NST 2n = #"), n = n2 / 2, SO = { ba: 2 * n + 1, một: 2 * n - 1, không: 2 * n - 2, "tam bội": 3 * n, "tứ bội": 4 * n };
    return q.o.map((o) => { let m = /^Tế bào sinh dưỡng của thể (ba|một|không|tam bội|tứ bội) có (\d+) NST\.$/.exec(o); if (m) return SO[m[1]] === +m[2];
      m = y(o, /^Tế bào sinh dưỡng của thể (một|ba) (ít|nhiều) hơn tế bào sinh dưỡng của thể (không|một) (\d+) NST\.$/);
      const h = SO[m[1]] - SO[m[3]]; return m[2] === "ít" ? -h === +m[4] : h === +m[4]; }); } },
  { id: "sh1", has: "Sơ đồ phả hệ ở hình bên", right: (q) => {
    const ph = docPhaHe(q.svg, "phả hệ"), kieu = kieuDiTruyen(ph);
    assert.equal(kieu.length, 1, "chỉ một kiểu di truyền khớp với phả hệ: " + kieu);
    // lời giải nói đúng người bệnh có bố mẹ lành
    const benh = ph.nguoi.filter((n) => n.benh); assert.equal(benh.length, 1);
    const { bo, me } = ph.con.get(benh[0].so); assert.ok(!bo.benh && !me.benh && benh[0].gioi === "nữ");
    coX(q, "Người số " + benh[0].so + " mắc bệnh", "(" + bo.so + " và " + me.so + ")", "bố số " + bo.so);
    return { "lặn, NST thường": "allele lặn nằm trên NST thường quy định", "trội, NST thường": "allele trội nằm trên NST thường quy định",
      "lặn, NST X": "allele lặn nằm trên vùng không tương đồng của NST X quy định", "trội, NST X": "allele trội nằm trên vùng không tương đồng của NST X quy định" }[kieu[0]]; } },
  { id: "sh1", has: "Một quần thể thực vật gồm", right: (q) => {
    const [aa, ab, bb] = so(q.q, "gồm # cây có kiểu gene AA, # cây có kiểu gene Aa và # cây có kiểu gene aa"), tong = aa + ab + bb;
    coX(q, vn(tong), vn(2 * tong)); return vn((ab + 2 * bb) / (2 * tong)); } },
  { id: "sh1", has: "tỉ lệ người mắc bệnh là 1/2 500", right: (q) => {
    const d = val(/là 1\/([\d ]+)\./.exec(q.q)[1]), qa = Math.sqrt(1 / d); assert.ok(Number.isInteger(1 / qa + 1e-9 - ((1 / qa + 1e-9) % 1)));
    coX(q, "q = 1/" + Math.round(1 / qa) + " = " + vn(qa), "p = 1 − " + vn(qa) + " = " + vn(1 - qa)); return 2 * qa * (1 - qa) * 100; } },
  // ---- Sinh học, Đề 2 ----
  { id: "sh2", has: "quá trình dịch mã dừng lại", right: (q) => { const kt = q.o.filter((c) => MA[c] === "*"); assert.equal(kt.length, 1, "đúng một bộ ba kết thúc");
    assert.ok(q.o.every((c) => c in MA)); coX(q, "UGG mã hoá tryptophan", "GAU mã hoá aspartic acid"); assert.ok(MA.UGG === "W" && MA.GAU === "D" && MA.AUG === "M"); return kt[0]; } },
  { id: "sh2", has: "codon 5'–GCA–3' mã hoá alanine", right: (q) => {
    assert.equal(MA.GCA, "A");
    // đưa mỗi lựa chọn về cách viết 3' → 5'; bộ ba đối mã đúng là bổ sung từng nucleotide với codon viết 5' → 3'
    const ve35 = (s) => { const m = y(s, /^(3'|5')–([A-Z]{3})–(3'|5')$/); return m[1] === "3'" ? m[2] : [...m[2]].reverse().join(""); };
    const dung = [..."GCA"].map((c) => BO_SUNG_RNA[c]).join(""), hop = q.o.filter((s) => ve35(s) === dung);
    assert.equal(hop.length, 1, "chỉ một lựa chọn là bộ ba đối mã đúng"); return hop[0]; } },
  { id: "sh2", has: "gồm 248 amino acid", right: (q) => { const [a] = so(q.q, "gồm # amino acid"); coX(q, vn(a + 1), vn(a + 2)); return (a + 2) * 3; } },
  { id: "sh2", has: "20 cừu con đều lông trắng", right: (q) => {
    // nếu cừu đực là Bb thì mỗi con có 1/2 khả năng lông đen; 20 con đều trắng gần như không thể xảy ra
    const [k] = so(q.q, "sinh được # cừu con"); assert.ok(0.5 ** k < 1e-5); return "BB"; } },
  { id: "sh2", has: "AaBbDd × AaBbdd", right: (q) => { const m = lai("AaBbDd", "AaBbdd"); return fChu(tiLe(m, (g) => troi(g, "a") && troi(g, "b") && troi(g, "d"))); } },
  { id: "sh2", has: "kiểu gene RR cho hoa đỏ", right: (q) => {
    const m = lai("Rr", "Rr"), MAU = { RR: "đỏ", Rr: "hồng", rr: "trắng" }, k = ["RR", "Rr", "rr"].map((g) => m.get(g)), mau = k.map((p) => p.n * (4 / p.d));
    return mau.map((s, i) => s + " " + MAU[["RR", "Rr", "rr"][i]]).join(" : "); } },
  { id: "sh2", has: "tương tác cộng gộp: cây aabb cao 100 cm", right: (q) => {
    const [h0, d, h] = [...so(q.q, "cây aabb cao # cm, mỗi allele trội có trong kiểu gene làm cây cao thêm # cm"), ...so(q.q, "cây cao # cm chiếm")];
    const k = (h - h0) / d; assert.ok(Number.isInteger(k)); coX(q, "(" + h + " − " + h0 + ") : " + d + " = " + k);
    return fChu(tiLe(lai("AaBb", "AaBb"), (g) => [...g].filter((c) => c === c.toUpperCase()).length === k)); } },
  { id: "sh2", has: "Ở mèo, allele D quy định lông đen", right: (q) => {
    const con = laiX(kgX("XᴰXᵈ"), kgX("XᴰY")), mau = (c) => (c.kg.length === 2 && c.kg[0] !== c.kg[1] ? "pha" : c.kg[0] === "D" ? "đen" : "vàng");
    const tl = (f) => fChu(con.filter(f).reduce((s, c) => fCong(s, c.p), F(0)));
    const [a, b, c, d] = q.o;
    return [tl((x) => x.gioi === "cái" && mau(x) === "vàng") === y(a, /^Mèo cái lông vàng chiếm tỉ lệ (\d+\/\d+)\.$/)[1],
      /^Tất cả mèo con lông vàng đều là mèo đực\.$/.test(b) && con.filter((x) => mau(x) === "vàng").every((x) => x.gioi === "đực"),
      tl((x) => mau(x) === "pha") === y(c, /^Mèo lông pha hai màu chiếm tỉ lệ (\d+\/\d+)\.$/)[1],
      tl((x) => x.gioi === "đực" && mau(x) === "đen") === y(d, /^Mèo đực lông đen chiếm tỉ lệ (\d+\/\d+)\.$/)[1]]; } },
  { id: "sh2", has: "một đoạn bản đồ di truyền", right: (q) => { const vt = docBanDo(q.svg, "bản đồ"), [g1, g2] = /giữa gene ([A-Z]) và gene ([A-Z]) là/.exec(q.q).slice(1);
    coX(q, vt[g2] + " − " + vt[g1] + " = " + Math.abs(vt[g2] - vt[g1])); return Math.abs(vt[g2] - vt[g1]) + "%"; } },
  { id: "sh2", has: "kiểu gene Ab/aB tự thụ phấn", right: (q) => { const [f] = so(q.q, "cùng tần số #%"), ab = giaoTu("Ab/aB", f).ab; coX(q, vn(ab)); return ab * ab * 100; } },
  { id: "sh2", has: "hai NST không tương đồng trước đột biến", right: (q) => { const h = docHaiNST(q.svg, "chuyển đoạn"); assert.ok(chuyenDoan(h.truoc, h.sau), "hình là chuyển đoạn giữa hai NST");
    coX(q, "Đoạn D – E của NST 1", "đoạn P – Q của NST 2"); assert.ok(h.truoc[0].endsWith("DE") && h.truoc[1].endsWith("PQ") && h.sau[0].endsWith("PQ") && h.sau[1].endsWith("DE")); return "chuyển đoạn giữa hai NST"; } },
  { id: "sh2", has: "Một loài có bộ NST 2n = 8. Trong giảm phân", right: (q) => {
    const [n2] = so(q.q, "bộ NST 2n = #"), n = n2 / 2; assert.ok(/không phân li ở giảm phân I, giảm phân II diễn ra bình thường/.test(q.q));
    return "2 tinh trùng có " + (n + 1) + " NST và 2 tinh trùng có " + (n - 1) + " NST"; } },
  { id: "sh2", has: "0,3 AA : 0,4 Aa : 0,3 aa", right: (q) => {
    const [AA, Aa, aa] = so(q.q, "là # AA : # Aa : # aa"), p = AA + Aa / 2;
    let g = [AA, Aa, aa]; for (let k = 0; k < 2; k++) g = [g[0] + g[1] / 4, g[1] / 2, g[2] + g[1] / 4];
    const [a, b, c, d] = q.o;
    return [/giảm xuống/.test(a) ? gan(g[0] + g[1] / 2, p) === false : null, /đang ở trạng thái cân bằng Hardy – Weinberg/.test(b) ? gan(AA, p * p) && gan(Aa, 2 * p * (1 - p)) : null,
      gan(val(y(c, /^Tần số allele A ở thế hệ xuất phát là ([\d,]+)\.$/)[1]), p), gan(val(y(d, /kiểu gene Aa chiếm tỉ lệ ([\d,]+)\.$/)[1]), g[1])]; } },
  { id: "sh2", has: "có 16% số con lông trắng", essay: (q) => {
    const [t] = so(q.q, "có #% số con lông trắng"), qb = Math.sqrt(t / 100), pB = 1 - qb, ps = F(Math.round(2 * pB * qb * 100), Math.round((pB * pB + 2 * pB * qb) * 100));
    coThang(q, "q = " + vn(qb), "p = 1 − " + vn(qb) + " = " + vn(pB), vn(pB * pB), vn(2 * pB * qb), vn(pB * pB + 2 * pB * qb), fChu(ps));
    assert.equal(dapSo(q), "a) p(B) = " + vn(pB) + "; q(b) = " + vn(qb) + "; b) " + fChu(ps)); } },
  { id: "sh2", has: "đếm được 47 NST, trong đó có ba NST số 21", right: (q) => { assert.equal(46 + 1, 47); return [true, null, null, false]; } },
  // ---- GDKT&PL ----
  { id: "kt1", has: "GDP của quốc gia H năm 2023 là 450 tỉ USD", right: (q) => {
    const [a] = so(q.q, "năm 2023 là # tỉ USD"), [b] = so(q.q, "là # tỉ USD. Tốc độ"); coX(q, "(" + b + " − " + a + ") : " + a); return ((b - a) / a) * 100; } },
  { id: "kt1", has: "hệ số Gini tăng từ 0,35 lên 0,45", right: (q) => {
    const [g0, g1] = so(q.q, "hệ số Gini tăng từ # lên #"); assert.ok(/Khoảng cách thu nhập giữa người giàu và người nghèo ở K thu hẹp lại\./.test(q.o[2]));
    assert.ok(/tỉ trọng nông nghiệp trong GDP gần như không đổi/.test(q.q) && /chuyển dịch theo hướng tích cực/.test(q.o[1]));
    return [null, false, !(g1 > g0), null]; } },
  { id: "kt1", has: "Gia đình chị Mai có bốn người", essay: (q) => {
    // bài gợi ý: tỉ lệ cộng lại 100%, số tiền mỗi phần đúng với thu nhập, khoản để dành cho mục tiêu đủ sau 24 tháng
    const [thu] = so(q.q, "khoảng # triệu đồng mỗi tháng"), ts = [...q.x.matchAll(/(\d+)% \((\d+) triệu đồng\)/g)].map((m) => [+m[1], +m[2]]);
    assert.equal(ts.length, 3); assert.equal(sum(ts.map((t) => t[0])), 100); ts.forEach(([pt, tien]) => assert.ok(gan((pt / 100) * thu, tien), pt + "% của " + thu));
    const [muc] = so(q.x, "sau 24 tháng có khoảng # triệu đồng"), [rieng] = so(q.x, "dành riêng # triệu đồng mỗi tháng"), [duoc] = so(q.x, "sau 24 tháng được # triệu đồng");
    assert.ok(gan(rieng * 24, duoc) && duoc >= muc && rieng <= ts[2][1], "khoản để dành đủ cho mục tiêu"); assert.ok(/hai năm/.test(q.q)); } },
  { id: "kt2", has: "quốc gia P có GDP là 420 tỉ USD", right: (q) => {
    const [gdp] = so(q.q, "GDP là # tỉ USD"), [cl] = so(q.q, "là # tỉ USD; dân số"), [ds] = so(q.q, "dân số trung bình là # triệu người");
    coX(q, vn(gdp + cl) + " (tỉ USD)"); return ((gdp + cl) * 1e9) / (ds * 1e6); } },
  { id: "kt2", has: "cơ cấu GDP của tỉnh K", right: (q) => {
    const [n0, c0, d0] = so(q.q, "gồm nông nghiệp #%, công nghiệp #%, dịch vụ #%"), [n1, c1, d1] = so(q.q, "năm 2025 là nông nghiệp #%, công nghiệp #%, dịch vụ #%");
    assert.equal(n0 + c0 + d0, 100); assert.equal(n1 + c1 + d1, 100); assert.ok(/Giá trị sản xuất của cả ba ngành đều tăng/.test(q.q));
    const [, b, c] = q.o;
    return [n1 < n0 && c1 > c0 && d1 > d0, n0 - n1 === +y(b, /giảm (\d+) điểm phần trăm\.$/)[1],
      (([u, v]) => u === c0 + d0 && v === c1 + d1)(so(c, "tăng từ #% lên #%")), null]; } },
  { id: "kt2", has: "Vợ chồng anh Dũng chia thu nhập hằng tháng", right: (q) => {
    const [a, b, c] = so(q.q, "như sau: #% cho chi thiết yếu, #% cho chi không thiết yếu, #% cho tiết kiệm"); assert.equal(a + b + c, 100);
    const [thu, tk] = so(q.o[2], "là # triệu đồng thì khoản tiết kiệm, dự phòng là # triệu đồng"); return [null, null, gan((c / 100) * thu, tk), null]; } },
  { id: "kt2", has: "Gia đình chị Mến có thu nhập 24 triệu đồng", right: (q) => {
    const [thu] = so(q.q, "có thu nhập # triệu đồng"), [a, b] = so(q.q, "dành #% thu nhập cho chi thiết yếu, #% cho chi không thiết yếu"), [can] = so(q.q, "Để có # triệu đồng");
    const tk = ((100 - a - b) / 100) * thu; coX(q, "100% − " + a + "% − " + b + "% = " + (100 - a - b) + "%", "= " + vn(tk) + " (triệu đồng)"); return Math.ceil(can / tk - 1e-9); } }
];
// GDKT&PL Đề 2, mục tiêu vượt khả năng phục vụ của tiệm: số lượt khách đặt ra lớn hơn số lượt 4 máy phục vụ được
CHECKS.push({ id: "kt2", has: "Chị Hà định mở tiệm giặt sấy", right: (q) => {
  const [may] = so(q.q, "với # máy giặt"), [muc] = so(q.q, "tháng đầu tiên phục vụ # lượt khách"), [toiDa] = so(q.q, "phục vụ được khoảng # lượt mỗi tháng");
  assert.ok(may === 4 && muc > 2 * toiDa && /chạy liên tục cả ngày/.test(q.q), "mục tiêu vượt xa khả năng phục vụ");
  return "Đặt lại mục tiêu cho vừa với số máy của tiệm và nhu cầu thực tế của khách."; } });

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
        if (typeof q.ans === "string") { assert.equal(fChu(docPS(q.ans)), q.ans, "phân số tối giản"); assert.equal(q.ans, want, "đáp án " + q.ans + ", tính được " + want); }
        else { assert.ok(gan(q.ans, want), "đáp án " + q.ans + ", tính được " + want); assert.ok(Math.abs(q.ans * 100 - Math.round(q.ans * 100)) < 1e-9, "đáp án quá hai chữ số thập phân"); }
        assert.ok(q.tol === undefined, "đáp án chính xác, không cần sai số");
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
MON.forEach((m) => m.kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + ten.get(q))));
// bảng mã di truyền đề cho ở mọi câu Sinh học đúng bảng chuẩn
SH.kho.forEach((q) => [...[q.q, q.x].concat(q.o || []).join(" ").matchAll(/\b([AUGC]{3}) – ([a-z ]+) \(([A-Z][a-z]{2})\)/g)].forEach((m) => assert.equal(MA[m[1]], TEN_AA[m[2]], "bảng mã: " + m[0])));
// bộ đọc, bộ tính bắt được hình, phép lai cố ý viết sai
{
  const hinh = (has) => SH.kho.find((q) => q.q.includes(has)).svg;
  const ph = hinh("Sơ đồ phả hệ ở hình bên"), bd = hinh("một đoạn bản đồ di truyền"), cd = hinh("hai NST không tương đồng trước đột biến");
  // tô đậm thêm bố số 1: phả hệ hợp với cả trội trên NST thường, trội trên NST X (con trai số 7 của mẹ bệnh lành nên không là lặn trên X)
  assert.deepEqual(kieuDiTruyen(docPhaHe(ph.replace('<rect x="58" y="24" width="24" height="24" fill="surface"', '<rect x="58" y="24" width="24" height="24" fill="ink"'), "thử")), ["lặn, NST thường", "trội, NST thường", "trội, NST X"]);
  assert.throws(() => docPhaHe(ph.replace('<line x1="180" y1="110" x2="180" y2="154"', '<line x1="181" y1="110" x2="181" y2="154"'), "thử"), /đoạn dọc|đoạn thẳng|anh chị em/);
  assert.throws(() => docBanDo(bd.replace('<text x="216" y="90" text-anchor="middle">31</text>', '<text x="216" y="90" text-anchor="middle">35</text>'), "thử"), /tỉ lệ/);
  // đổi chỗ hai đoạn đầu mút là chuyển đoạn; mất đoạn, đảo đoạn, đổi hai đoạn không cùng là đầu mút thì không
  assert.ok(chuyenDoan(docHaiNST(cd, "thử").truoc, ["AB•CDQ", "MN•OPE"]) && !chuyenDoan(["AB•CDE", "MN•OPQ"], ["AB•CPQ", "MN•OPE"]) && !chuyenDoan(["AB•CDE", "MN•OPQ"], ["AB•EDC", "MN•OPQ"]));
  assert.throws(() => docHaiNST(cd.replace(/<circle [^>]*>/, ""), "thử"), /tâm động/);
  assert.equal(fChu(tiLe(lai("AaBb", "AaBb"), (g) => troi(g, "a") && troi(g, "b"))), "9/16"); assert.equal(lai("AaBbDd", "AaBbDd").size, 27);
  assert.deepEqual(giaoTu("Ab/aB", 20), { Ab: 0.4, aB: 0.4, AB: 0.1, ab: 0.1 }); assert.deepEqual(phienMa("TAC GGA"), "AUG CCU"); assert.deepEqual(dichMa("AUG UGA GGG"), ["M"]);
}

/* ---------- chữ ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.unit || [], (q.rubric || []).map((c) => c.c)).map(String);
MON.forEach((m) => m.kho.forEach((q) => {
  const at = ten.get(q) + ": " + q.q.slice(0, 50);
  chu(q).forEach((s) => {
    // số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân (năm viết liền: 2025)
    assert.ok(!/(?<![,\d])\d{4,}/.test(s.replace(/\b(?:19|20)\d{2}\b/g, "")) && !/\d\.\d/.test(s), at + ": số viết sai cách: " + s);
    // dấu thanh kiểu sách (hoá, thuỷ, hoà, khoẻ, tuỳ)
    assert.ok(!/(?<![\p{L}])(?:hóa|hòa|thủy|tỏa|hủy|tùy|khỏe|lũy)(?![\p{L}])/iu.test(s), at + ": dấu thanh kiểu mới: " + s);
  });
  if (q.type === "num" && q.unit) assert.ok(q.unit.length <= 5, at + ": đơn vị ngắn");
}));
// Sinh học: thuật ngữ như sách in năm 2026 (gene, allele, DNA, RNA, Mendel, Morgan, Hardy – Weinberg, nucleotide, codon, protein…)
SH.kho.forEach((q) => chu(q).forEach((s) => {
  assert.ok(!/(?<![\p{L}])(?:gen|alen|ADN|ARN|mARN|tARN|rARN|axit amin|prôtêin|nuclêôtit|côđon|anticôđon|Menđen|Moocgan|Hacđi|Vanbec|ribôxôm|pôlipeptit|dị bội)(?![\p{L}])/iu.test(s), ten.get(q) + ": thuật ngữ khác sách: " + s);
  assert.ok(!/Hardy\s*[-—]\s*Weinberg|Hardy-Weinberg/.test(s), ten.get(q) + ": viết “Hardy – Weinberg”: " + s);
}));
// GDKT&PL: chữ theo sách in năm 2026
KT.kho.forEach((q) => chu(q).forEach((s) => {
  assert.ok(!/Lao động – Thương binh|Luật Bảo hiểm xã hội năm 2014|Phòng Đăng kí kinh doanh|cấp huyện|\bhuyện\b/.test(s), ten.get(q) + ": tên cơ quan, luật, đơn vị hành chính cũ: " + s);
  assert.ok(!/HDI[^.]*GDP\/người|thu nhập \(tính bằng GDP/.test(s), ten.get(q) + ": chỉ số thu nhập trong HDI tính bằng GNI/người: " + s);
}));
// GDKT&PL: câu tình huống là chính: đề bài kể việc của một người (anh K, chị Lan, bạn Tú, của Hưng…), một doanh nghiệp, địa phương,
// quốc gia có tên (Công ty dệt nhuộm H, tỉnh K, quốc gia M…), hoặc việc của hai nước có tên
const TINH_HUONG = [/(?:^|[\s(])(?:[Aa]nh|[Cc]hị|[Ôô]ng|[Bb]à|[Bb]ạn|[Cc]ụ) \p{Lu}/u, /(?:[Cc]ông ty|[Dd]oanh nghiệp|[Qq]uốc gia|[Tt]ỉnh|[Xx]ã|[Nn]ước)(?: \p{Ll}+)* [A-Z](?![\p{L}])/u,
  /(?:của|Nhóm) \p{Lu}\p{Ll}+/u, /Việt Nam và \p{Lu}/u, /^Gia đình (?:anh|chị|ông|bà) \p{Lu}/u, /^(?:Lan|Tú|Hưng|Minh) /u, /xã ven biển|vùng cao/u];
const soTH = KT.kho.filter((q) => TINH_HUONG.some((r) => r.test(q.q))).length;
assert.ok(soTH * 3 >= KT.kho.length * 2, "GDKT&PL: câu tình huống là chính (" + soTH + "/" + KT.kho.length + ")");

/* ---------- lời dặn, mức độ, ma trận ---------- */
const SO = "Từ năm học 2026–2027 Sở GD&ĐT ra đề chung cuối kì một số môn lớp 12; xem thông báo của Sở về môn và cấu trúc đề.";
const BOOK = path.join(__dirname, "../../OnUp-Book");
MON.forEach((m) => {
  const M = m.M, cells = Object.values(M), CHU_DE = m.BAI.map((b) => b[0]), soBai = Object.fromEntries(m.BAI);
  assert.ok(m.kho.every((q) => [1, 2, 3].includes(q.lv)), m.ma + ": câu nào cũng cần lv");
  assert.ok(cells.every(Array.isArray), m.ma + ": ma trận ghi theo [Biết, Hiểu, Vận dụng]");
  assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], m.ma + ": ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
  assert.equal(sum(cells.map(sum)), m.pool.n, m.ma + ": tổng ma trận bằng n");
  assert.ok(cells.every((v) => sum(v) >= 1), m.ma + ": chủ đề nào cũng có câu");
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
    assert.ok(note.includes(m.sau) && note.includes("đối chiếu với đề cương của trường") && note.endsWith(SO), id + ": lời dặn nhắc bài học tiếp theo, đề cương của trường và đề chung của Sở");
  });
  // chủ đề đúng tên bài trong mục lục (README của cuốn ở OnUp-Book); tên chương của lời dặn Sinh học đúng mục lục
  const readme = path.join(BOOK, "lop-12", m.sach, "README.md");
  if (fs.existsSync(readme)) {
    const md = fs.readFileSync(readme, "utf8"), ml = Object.fromEntries([...md.matchAll(/Bài (\d+)[.:] ([^|*·]+?) \|/g)].map((x) => [+x[1], x[2].trim()]));
    m.BAI.forEach(([t, b]) => assert.equal(m.RUT_GON[t] || t, ml[b], m.ma + ": tên Bài " + b + " theo mục lục"));
    m.PHAN.forEach(([p]) => { const c = /^Chương (\d+) (.+) \(Bài/.exec(p); if (c) assert.ok(md.includes("Chương " + c[1] + ". " + c[2].toUpperCase()), m.ma + ": tên chương " + c[1] + " theo mục lục"); });
  }
  // dạng câu theo khung Công văn 7991: nhiều lựa chọn, đúng/sai 4 ý, trả lời ngắn (số), tự luận tự chấm
  assert.ok(m.kho.every((q) => ["mc", "tf4", "num", "essay"].includes(q.type)), m.ma + ": dạng câu");
  const dem = (f) => m.kho.filter(f).length;
  assert.ok(dem((q) => q.type === "num") >= (m === SH ? 4 : 2), m.ma + ": số câu trả lời bằng số");
  assert.ok(dem((q) => q.type === "essay") >= 1 && dem((q) => q.type === "essay") <= 2, m.ma + ": 1–2 câu tự luận");
  m.DE.forEach((id) => { const qs = m.kho.filter((q) => q.src === id); assert.ok(qs.filter((q) => q.type === "tf4").length >= 3 && qs.filter((q) => q.type === "essay").length <= 1, id + ": đủ đúng/sai 4 ý, nhiều nhất một câu tự luận"); });
  const tf4 = m.kho.filter((q) => q.type === "tf4"), kieu = {};
  assert.ok(tf4.length >= 6, m.ma + ": ít nhất 6 câu đúng/sai 4 ý");
  tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(q.o.length === 4 && /Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
  assert.equal(Math.max(...Object.values(kieu)), 1, m.ma + ": kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
  tf4.forEach((q) => { const vt = q.a.map((a, i) => q.x.indexOf("abcd"[i] + ") " + (a ? "Đúng" : "Sai")));
    assert.ok(vt.every((v, i) => v >= 0 && (i === 0 || v > vt[i - 1])) && !/[a-d]\) (Đúng|Sai)[^.:;]/.test(q.x.replace(/[a-d]\) (Đúng|Sai)$/, "")), "lời giải câu đúng/sai ghi đúng từng ý, theo thứ tự: " + ten.get(q)); });
  // câu tự luận chỉ ở ô Vận dụng rút 1 câu, ô đó còn câu khác dạng: mỗi lần rút nhiều nhất 2 câu tự luận
  const oTL = [...new Set(m.kho.filter((q) => q.type === "essay").map((q) => q.topic + "|" + q.lv))];
  assert.ok(oTL.every((k) => { const [t, lv] = k.split("|"); return +lv === 3 && M[t][2] === 1 && m.kho.some((q) => q.topic === t && q.lv === 3 && q.type !== "essay"); }), m.ma + ": câu tự luận ở ô " + oTL);
  m.kho.filter((q) => q.type === "essay").forEach((q) => assert.ok(m === SH ? /^Trình bày lời giải\./.test(q.q) : /Em hãy/.test(q.q), "câu tự luận mở đầu bằng lời dặn: " + ten.get(q)));
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
  assert.ok(le.length * 3 <= mc.length, `${m.ma}: đáp án đúng dài nhất hoặc ngắn nhất ở ${le.length}/${mc.length} câu: ` + le.map((q) => ten.get(q)).join(", "));
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
   Đề ngẫu nhiên rút câu ở mọi ô, đề “Ôn chủ đề” rút chung mọi câu của một chủ đề (trừ tự luận), nên xét mọi cặp câu cùng môn, trừ cặp có
   câu tự luận nằm cùng một ô rút 1 câu. Đáp án là số (trả lời ngắn, lựa chọn đúng dạng “10%”, phân số; từ hai chữ số, hoặc số thập phân,
   hoặc phân số) tìm ở vị trí kết quả của câu kia (ngay sau “=”, “≈”, “là”, “bằng”, “được”; không tính số đứng trước một phép tính) cùng
   đơn vị: không được có. Đáp án bằng chữ tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy cả đáp án); chuỗi có trong
   đề bài, lựa chọn, lời giải của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM. */
const DON_VI = "(?:triệu đồng|nghìn đồng|tỉ USD|USD|tháng|cm|NST|%)";
const SO_DA = "(?:\\d+\\/\\d+|" + NUM + ")";
const soDV = new RegExp("^(" + SO_DA + ")(?: ?(" + DON_VI + "))?$", "u");
const giaTri = (s) => (/\//.test(s) ? fSo(docPS(s)) : val(s));
const KQ = new RegExp("(?:=|≈|(?:^|[\\s(])(?:là|bằng|được))\\s+(" + SO_DA + ")(?![\\d,/])(?!\\s*[·+−:×](?:\\s|\\d|\\())(?: ?(" + DON_VI + ")(?![\\p{L}]))?", "gu");
const kqSo = (s) => [...String(s).matchAll(KQ)].map((x) => ({ v: giaTri(x[1]), u: x[2] || "" }));
const tuCua = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum3 = (s) => { const w = tuCua(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
// chuỗi 3 từ chung của môn (thuật ngữ, cách nói của bài học) không làm lộ đáp án nào: bỏ qua khi là một phần của đáp án dài hơn
const CUM_CHUNG = new Set(["vào tế bào", "tế bào nhận", "mang gene chuyển", "của tế bào", "nst của tế", "bộ nst của", "của gene đó", "của môi trường",
  "mang tính trạng", "nst giới tính", "tinh trùng có", "nối các đoạn", "mức phản ứng", "uy tín của", "của hiệp định", "trên thị trường", "bảo hiểm xã",
  "hiểm xã hội", "hưởng trợ cấp", "và cộng đồng", "khoản tiết kiệm", "một doanh nghiệp", "với thu nhập", "bất bình đẳng", "kinh tế phát", "tế phát triển",
  "rủi ro và", "cách xử lí", "người tiêu dùng", "các khoản chi", "khoản chi chưa"]);
const doLo = (qs, M, tenCau) => {
  const lo = [], chuLo = [], cungLuc = (p, q) => p !== q && (p.topic !== q.topic || (p.type !== "essay" && q.type !== "essay") || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2);
  qs.forEach((q) => {
    let soDa = [], C = [];
    if (q.type === "num") soDa = [{ v: typeof q.ans === "string" ? giaTri(q.ans) : q.ans, u: q.unit || "" }];
    else if (q.type === "mc") { const x = soDV.exec(q.o[0]); if (x) soDa = [{ v: giaTri(x[1]), u: x[2] || "" }]; else { const c3 = cum3(q.o[0]); C = [...new Set(c3.length > 1 ? c3.filter((c) => !CUM_CHUNG.has(c)) : c3)]; } }
    soDa = soDa.filter((d) => Math.abs(d.v) >= 10 || !Number.isInteger(d.v));
    qs.forEach((p) => {
      if (!cungLuc(p, q)) return;
      const at = `${tenCau(p)} → ${tenCau(q)}: `, T = " " + chu(p).map((s) => tuCua(s).join(" ")).join(" | ") + " ";
      soDa.filter((d) => chu(p).flatMap(kqSo).some((yy) => gan(yy.v, d.v) && (!yy.u || !d.u || yy.u === d.u))).forEach((d) => lo.push(at + vn(d.v) + " " + d.u));
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
const lo = [], chuLo = [];
MON.forEach((m) => { const r = doLo(m.kho, m.M, (q) => ten.get(q)); lo.push(...r.lo); chuLo.push(...r.chuLo); });
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuLo.join("\n"));
// đã xem (Phiên N12-ck1-sinhhoc-ktpl): chữ chung, câu kia không nói tới điều câu này hỏi. “đảo đoạn”, “chính sách trợ giúp xã hội”, “chính
// sách bảo đảm các dịch vụ xã hội cơ bản”, “kế hoạch nhân sự”, “kế hoạch tiếp thị, bán hàng”, “trách nhiệm pháp lí”, “trách nhiệm kinh tế”,
// “ý tưởng kinh doanh” (ở câu bước sau cùng): chỉ là lựa chọn sai của câu kia, câu kia không cho biết lựa chọn đó ứng với điều câu này hỏi;
// “allele lặn nằm trên NST thường quy định”: câu Hardy – Weinberg, câu về lông thỏ cho sẵn cách di truyền của một bệnh, một tính trạng
// khác, câu hội chứng Down nói ý sai về NST X; câu phả hệ phải đọc hình mới biết; “BB”: chữ thường bb là kiểu gene đồng hợp lặn ở lời
// giải câu khác, không nói cừu đực có kiểu gene gì.
const DA_XEM = [
  "sh2#18 → sh1#18: đảo đoạn", "sh1#25 → sh1#21: nằm trên nst", "sh1#25 → sh1#21: trên nst thường", "sh1#25 → sh1#21: nst thường quy",
  "sh1#25 → sh1#21: thường quy định", "sh2#21 → sh1#21: allele lặn nằm", "sh2#21 → sh1#21: lặn nằm trên", "sh2#21 → sh1#21: nằm trên nst",
  "sh2#25 → sh1#21: nằm trên nst", "sh2#25 → sh1#21: trên nst thường", "sh1#10 → sh2#10: bb", "sh2#11 → sh2#10: bb", "sh2#25 → sh2#10: bb",
  "kt2#10 → kt1#10: chính sách trợ", "kt2#10 → kt1#10: sách trợ giúp", "kt2#10 → kt1#10: trợ giúp xã", "kt2#10 → kt1#10: giúp xã hội",
  "kt2#14 → kt1#14: kế hoạch nhân", "kt2#14 → kt1#14: hoạch nhân sự", "kt2#16 → kt1#14: kế hoạch nhân", "kt2#16 → kt1#14: hoạch nhân sự",
  "kt2#18 → kt1#18: trách nhiệm pháp", "kt2#18 → kt1#18: nhiệm pháp lí", "kt1#10 → kt2#10: chính sách bảo", "kt1#10 → kt2#10: sách bảo đảm",
  "kt1#10 → kt2#10: dịch vụ xã", "kt1#10 → kt2#10: vụ xã hội", "kt1#10 → kt2#10: xã hội cơ", "kt1#10 → kt2#10: hội cơ bản",
  "kt2#15 → kt2#14: ý tưởng kinh", "kt2#15 → kt2#14: tưởng kinh doanh",
  "kt1#14 → kt2#16: kế hoạch tiếp", "kt1#14 → kt2#16: hoạch tiếp thị", "kt1#14 → kt2#16: tiếp thị bán", "kt1#14 → kt2#16: thị bán hàng",
  "kt1#18 → kt2#18: trách nhiệm kinh", "kt1#18 → kt2#18: nhiệm kinh tế"
];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 18%”, “là 4 500 USD”, cụm của đáp án bằng chữ
{
  const tim = (has) => MON.flatMap((m) => m.kho).find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thuLo = (qs) => { const r = doLo(qs, Object.assign({}, SH.M, KT.M), (q) => q.q.slice(0, 12)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  const khac = tim("Vị trí xác định mà mỗi gene chiếm giữ"), khacK = tim("Hoạt động nào sau đây thuộc thương mại quốc tế?");
  assert.deepEqual(thuLo([tim("lai với cây lá hẹp, hạt dài"), gia(khac, "Tần số = 18%.")]), ["18 %"]);
  assert.deepEqual(thuLo([tim("lai với cây lá hẹp, hạt dài"), gia(khac, "Có 18 cây.")]), []);
  assert.deepEqual(thuLo([tim("quốc gia P có GDP là 420 tỉ USD"), gia(khacK, "GNI/người là 4 500 USD.")]), ["4 500 USD"]);
  assert.deepEqual(thuLo([tim("sắc tố tím được tạo ra"), gia(khac, "Tỉ lệ hoa trắng là 7/16.")]), ["0,4375 "]);
  assert.deepEqual(thuLo([tim("Ở châu chấu, con cái có cặp NST giới tính XX"), gia(khac, "Con đực một NST giới tính X.")]), ["một nst giới", "giới tính x"]);
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ----------
   Cụm từ chung của môn (tên bài, cách nói chuẩn của đề) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ. */
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const TU_CHUNG = [...SH.BAI, ...KT.BAI].map((b) => b[0]).concat(Object.values(SH.RUT_GON), ["mỗi ý sau đúng hay sai", "theo lí thuyết", "viết kết quả dưới dạng phân số",
  "trội hoàn toàn so với allele", "nằm trên hai cặp NST khác nhau", "ở trạng thái cân bằng Hardy – Weinberg",
  // tên loại bảo hiểm, nhóm chính sách an sinh xã hội, đại lượng trong công thức GNI như sách
  "bảo hiểm trách nhiệm dân sự của chủ xe cơ giới", "chính sách bảo đảm các dịch vụ xã hội cơ bản", "chính sách trợ giúp xã hội", "chênh lệch thu nhập với nhân tố nước ngoài"])
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const tatCa = MON.flatMap((m) => m.kho);
if (SACH.length) {
  MON.forEach((m) => assert.ok(SACH.some((f) => f.includes(m.sach)), "OnUp-Book có " + m.sach));
  const sach = new Set(), them = (t, k) => { const w = t.split(" ").filter(Boolean); for (let i = 0; i + k <= w.length; i++) sach.add(k + ":" + w.slice(i, i + k).join(" ")); };
  SACH.forEach((f) => { const t = khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")); them(t, 8); if (process.env.DO_SACH) them(t, 6); });
  const bao = (k) => tatCa.flatMap((q) => chu(q).flatMap((s) => chuoi(s, k).filter((c) => sach.has(k + ":" + c)).map((c) => `${ten.get(q)}: ${c}`)));
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
console.log("GDKT&PL 12: " + soTH + "/" + KT.kho.length + " câu tình huống.");
console.log(n + " câu đã tính lại hoặc đọc lại hình.");
console.log("MATH OK");
