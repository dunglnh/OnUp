// Kiểm tra các đề Sinh học thi thử tốt nghiệp THPT (data/banks/12-sinhhoc.js, sinhhoc12-tn-de<N>; Phiên N12-tn-sinhhoc: Đề 1–4; phiên sau
// thêm đề thì mở rộng script này: thêm các mục kiểm tra của đề mới vào RIENG). Đề tính điểm theo khung đề tốt nghiệp THPT từ năm 2025
// (Quyết định 764/QĐ-BGDĐT; docs/KE-HOACH-NOI-DUNG.md, mục 2 và mục 7, khối “Phiên N12-tn-sinhhoc”). Số đề, số câu lấy từ danh mục.
// Khung: danh mục (tên, khối 12, môn Sinh học, file, 50 phút, pts 10, gắn vào tn-thpt-2027); Phần I 18 câu nhiều lựa chọn pt 0,25, Phần II
// 4 câu đúng/sai 4 ý pt 1, Phần III 6 câu trả lời ngắn pt 0,25 (đúng tên part, đúng thứ tự), Quiz.grade điểm tối đa 4,5 – 4 – 1,5; đáp án
// Phần III là số, không quá 4 kí tự (dấu trừ, dấu phẩy tính một kí tự), câu dặn làm tròn có tol bằng nửa đơn vị làm tròn và lời giải ghi
// “≈ …”; mức độ như đề tham khảo năm 2025 (Biết 40%, Hiểu 35%, Vận dụng 25% số lệnh hỏi): Phần I 12 Biết, 5 Hiểu, 1 Vận dụng; Phần II bốn
// câu ghi mức 1, 2, 3, 3; Phần III 2 Biết, 3 Hiểu, 1 Vận dụng; phạm vi như đề tham khảo năm 2025 và đề chính thức năm 2026: mỗi đề 6 trong
// 40 lệnh hỏi thuộc Sinh học 11 (một câu ở Phần II, phần còn lại ở Phần I hoặc Phần III), không có câu Sinh học 10, còn lại thuộc Sinh học
// 12 đủ tám chương; câu lớp 12 mang đúng chữ chủ đề của ba kho Sinh học 12 (cuối kì I, giữa kì II, cuối năm), câu lớp 11 ghi “Lớp 11 · ” và
// tên chương của sách (đối chiếu mục lục trong README của cuốn ở OnUp-Book); trong mỗi phần, câu lớp 12 theo thứ tự bài; Phần II có câu
// về thí nghiệm, bảng số liệu, phép lai hoặc phả hệ; đoạn thông tin dùng chung (nếu có) chỉ ở Phần I, nhiều nhất một cặp câu liền nhau;
// lời dặn ghi đúng số câu, số điểm, số câu mỗi lớp tính từ dữ liệu.
// Mỗi câu khớp đúng một mục kiểm tra của đề đó (theo chữ has trong đề bài), mục đó đọc số liệu trong đề bài hoặc đoạn thông tin rồi tính lại
// đáp án bằng code (phép lai các cặp gene phân li độc lập, gene trên NST X, liên kết và hoán vị gene, Hardy – Weinberg, bảng mã di truyền
// chuẩn, số NST, năng lượng qua các bậc dinh dưỡng; phân số chính xác), đọc lại hình (phả hệ: thử cả bốn kiểu di truyền, xác suất tính bằng
// cách liệt kê mọi cách gán kiểu gene khớp phả hệ), hoặc so với bảng ghi trong script (câu khái niệm theo bài của sách).
// Rồi: chữ (số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân, dấu thanh kiểu sách “hoá”, “thuỷ”, thuật ngữ như sách in năm 2026:
// gene, allele, nitrogen…); kiểu Đ/S không lặp trong một đề, mỗi kiểu nhiều nhất ba lần trong các đề thi thử; đáp án đúng không dài hơn hẳn
// lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba và không dưới một phần sáu số câu nhiều lựa chọn của đề, không
// là lựa chọn duy nhất có chữ của nhãn chủ đề, ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có; lời giải không nhắc
// vị trí của phương án. So với ba kho Sinh học 12 và giữa các đề thi thử: đề bài không trùng câu nào trong file, không gần trùng (chuỗi 6
// từ; cặp hai âm tiết chung), đáp án không trùng câu cùng chủ đề. Dò lộ đáp án giữa mọi câu của một đề (đoạn thông tin cùng hiện) và với lời
// dặn, giữa câu cùng chủ đề của các đề thi thử và ba kho Sinh học 12 (đề “Ôn chủ đề” rút chung; số, cả phân số, trong khoảng tol của đáp án
// cũng tính; đáp án bằng chữ đã xem ghi ở DA_XEM; câu đúng/sai 4 ý không dò được bằng code, phiên tự đọc). Có ../OnUp-Book thì so mọi trường
// chữ (cả đoạn thông tin, lời dặn) với chữ OCR của mọi cuốn (không chuỗi 8 từ nào trùng) và với câu của mọi kho khác, cả giữa các đề thi
// thử với nhau. Bộ đọc phả hệ, bộ tính xác suất trên phả hệ, bộ dò lộ tự thử với hình, câu cố ý viết sai.
// Chạy: node tests/sinhhoc12-tn.js → in MATH OK. DO_LO=1: in đáp án bằng chữ có ở câu khác; DO_SACH=1: in chuỗi 6 từ trùng chữ của sách;
// DO_KHO=1: in chuỗi 6 từ trùng câu của kho khác.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, EVENTS = ctx.window.ONTAP_SEED_EVENTS;
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- số: hàng nghìn ngăn bằng khoảng trắng, dấu phẩy thập phân; tỉ lệ viết phân số “a/b” ---------- */
const NUM = "[−-]?\\d{1,3}(?: \\d{3})*(?:,\\d+)?";
const val = (s) => { const m = /^[−-]?\d{1,3}(?: \d{3})*(?:,\d+)?$/.exec(String(s).trim()); assert.ok(m, "không đọc được số “" + s + "”"); return +String(s).trim().replace(/ /g, "").replace("−", "-").replace(",", "."); };
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
// mẫu chữ có # ở chỗ số: so(s, "có # nucleotide") → [số]
const R = (mau) => new RegExp(mau.split("#").map(escRe).join("(" + NUM + ")"), "u");
const so = (s, mau) => { const m = R(mau).exec(s); assert.ok(m, "không thấy “" + mau + "” trong: " + String(s).slice(0, 90)); return m.slice(1).map(val); };
const gan = (a, b, e = 1e-9) => a === b || Math.abs(a - b) <= e * Math.max(Math.abs(a), Math.abs(b));
const vn = (x, d = 6) => { const r = Math.round(x * 10 ** d) / 10 ** d, [a, b] = String(Math.abs(r)).split("."); return (r < 0 ? "−" : "") + a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); };
const vnf = (x, d) => { const [a, b] = Math.abs(x).toFixed(d).split("."); return (x < 0 ? "−" : "") + a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); };
const lamTron = (x, k) => Math.round(x * 10 ** k + 1e-9 * Math.sign(x)) / 10 ** k;
const coX = (q, ...cum) => cum.forEach((c) => assert.ok(q.x.includes(c), "lời giải cần có “" + c + "”"));
// phân số chính xác { n, d }
const ucln = (a, b) => (b ? ucln(b, a % b) : Math.abs(a));
const F = (n, d = 1) => { assert.ok(Number.isInteger(n) && Number.isInteger(d) && d !== 0, "phân số " + n + "/" + d); if (d < 0) { n = -n; d = -d; } const g = ucln(n, d) || 1; return { n: n / g, d: d / g }; };
const fCong = (a, b) => F(a.n * b.d + b.n * a.d, a.d * b.d), fNhan = (a, b) => F(a.n * b.n, a.d * b.d), fTru = (a, b) => fCong(a, F(-b.n, b.d)), fChia = (a, b) => F(a.n * b.d, a.d * b.n);
const fChu = (f) => f.n + "/" + f.d, fSo = (f) => f.n / f.d, fBang = (a, b) => a.n === b.n && a.d === b.d;
const docPS = (s) => { const m = /^(\d+)\/(\d+)$/.exec(String(s).trim()); assert.ok(m, "không đọc được phân số “" + s + "”"); return F(+m[1], +m[2]); };
const SO_CHU = { một: 1, hai: 2, ba: 3, bốn: 4, năm: 5, sáu: 6, bảy: 7, tám: 8, chín: 9, mười: 10 };
const motCai = (q, f, at = "") => { const c = q.o.filter(f); assert.equal(c.length, 1, at + "cần đúng một lựa chọn thoả điều kiện, có " + c.length + ": " + c.join(" | ")); return c[0]; };
// ý của câu đúng/sai 4 ý có chữ “…”: trả lời bằng bảng tên ý → đúng/sai
const yCo = (q, has) => { const i = q.o.findIndex((o) => o.includes(has)); assert.ok(i >= 0, "không thấy ý có “" + has + "”"); return i; };
const traY = (q, bang) => { const r = q.o.map(() => undefined); Object.entries(bang).forEach(([has, v]) => { const i = yCo(q, has); assert.equal(r[i], undefined, "hai mục cùng khớp ý " + (i + 1)); r[i] = v; });
  assert.ok(r.every((v) => typeof v === "boolean"), "mọi ý đều có trong bảng"); return r; };
// phần trăm ghi trong chữ “… chiếm 25%.” → số
const phanTram = (s) => { const m = new RegExp("(" + NUM + ")%").exec(s); assert.ok(m, "không thấy phần trăm trong “" + s + "”"); return val(m[1]); };
const psTrong = (s) => { const m = /(\d+)\/(\d+)/.exec(s); assert.ok(m, "không thấy phân số trong “" + s + "”"); return F(+m[1], +m[2]); };

/* ---------- di truyền ---------- */
// bảng mã di truyền chuẩn (codon trên mRNA, đọc 5' → 3'); "*" là bộ ba kết thúc
const MA = (() => {
  const b = "UCAG", aa = "FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG", m = {};
  let k = 0; for (const x of b) for (const y of b) for (const z of b) m[x + y + z] = aa[k++];
  return m;
})();
const TEN_AA = { methionine: "M", alanine: "A", phenylalanine: "F", arginine: "R", histidine: "H", tryptophan: "W", lysine: "K", proline: "P", serine: "S", glycine: "G", valine: "V",
  "glutamic acid": "E", "aspartic acid": "D", tyrosine: "Y", cysteine: "C", leucine: "L", isoleucine: "I", threonine: "T", asparagine: "N", glutamine: "Q" };
// đoạn mRNA ghi “5'–AUG GCA …–3'” → mảng codon
const docMRNA = (s) => { const m = /5'–([AUGC ]+)–3'/.exec(s); assert.ok(m, "không thấy đoạn mRNA 5'–…–3'"); const c = m[1].trim().split(" "); c.forEach((x) => assert.ok(x in MA, "codon " + x)); return c; };
const dich = (codon) => { const out = []; for (const c of codon) { if (MA[c] === "*") return out; out.push(MA[c]); } assert.fail("mRNA không có codon kết thúc"); };
// bảng codon cho trong đề “AUG – methionine; GCA – alanine; …; UAG – kết thúc” phải đúng bảng mã chuẩn
const bangDe = (s) => { const r = {}; [...s.matchAll(/((?:[AUGC]{3}(?:, )?)+) – ([a-z ]+?|kết thúc)(?=;|\. )/g)].forEach((m) => m[1].split(", ").forEach((c) => {
  const aa = m[2] === "kết thúc" ? "*" : TEN_AA[m[2]]; assert.ok(aa, "chưa có amino acid " + m[2]); assert.equal(MA[c], aa, "codon " + c + " trong đề mã hoá " + m[2] + " khác bảng chuẩn"); r[c] = aa; })); return r; };
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
const soTroi = (g) => [...g].filter((c) => c === c.toUpperCase()).length;
// số loại giao tử của kiểu gene các cặp phân li độc lập
const soGiaoTu = (g) => capGene(g).reduce((s, [x, y]) => s * (x === y ? 1 : 2), 1);
// giao tử của cơ thể dị hợp hai cặp gene liên kết "AB/ab" hoặc "Ab/aB" với tần số hoán vị f (0–1)
const giaoTu = (kg, f) => { const [x, y] = kg.split("/"), r = {}; r[x] = (1 - f) / 2; r[y] = (1 - f) / 2; r[x[0] + y[1]] = f / 2; r[y[0] + x[1]] = f / 2; return r; };
// tự thụ phấn khi hai giới cùng tần số hoán vị: tỉ lệ kiểu hình theo giao tử
const tuThuLK = (gt) => { const k = Object.entries(gt), r = { AB: 0, Ab: 0, aB: 0, ab: 0 };
  k.forEach(([x, p]) => k.forEach(([y, s]) => { const A = x[0] === "A" || y[0] === "A", B = x[1] === "B" || y[1] === "B"; r[(A ? "A" : "a") + (B ? "B" : "b")] += p * s; })); return r; };
// gene trên vùng không tương đồng của X: kiểu gene cái "XᴰXᵈ" → ["D","d"], đực "XᵈY" → ["d"]
const MU = { "ᴰ": "D", "ᵈ": "d", "ᴴ": "H", "ʰ": "h", "ᴬ": "A", "ᵃ": "a" };
const kgX = (s) => { const m = /^X(.)(?:X(.)|Y)$/u.exec(s); assert.ok(m && MU[m[1]] && (!m[2] || MU[m[2]]), "kiểu gene trên X: " + s); return m[2] ? [MU[m[1]], MU[m[2]]].sort() : [MU[m[1]]]; };
// nhóm máu ABO: kiểu gene → nhóm máu
const NHOM_MAU = { "IᴬIᴬ": "A", "IᴬIᴼ": "A", "IᴮIᴮ": "B", "IᴮIᴼ": "B", "IᴬIᴮ": "AB", "IᴼIᴼ": "O" };
const allele3 = (g) => [g.slice(0, 2), g.slice(2)];
const conMau = (b, m) => { const r = {}; allele3(b).forEach((x) => allele3(m).forEach((y) => { const k = Object.keys(NHOM_MAU).find((z) => allele3(z).sort().join() === [x, y].sort().join()); r[k] = fCong(r[k] || F(0), F(1, 4)); })); return r; };

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">");
  return Object.assign(a, { t: m[2], at: [+a.x, +a.y], b: a["font-weight"] === "bold" || a["font-weight"] === "700", fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start" }); });
// mọi chữ trong hình cỡ từ 13, nằm trọn trong khung, không đè lên nhau (ước bề rộng chữ như tests/sinhhoc-ktpl12-ck1.js)
const hopChu = (t) => { const w = (t.b ? 0.62 : 0.55) * t.fs * [...t.t].length, x0 = t.anchor === "middle" ? t.at[0] - w / 2 : t.anchor === "end" ? t.at[0] - w : t.at[0];
  return [x0, t.at[1] - 0.75 * t.fs, x0 + w, t.at[1] + 0.25 * t.fs]; };
const chuHinh = (svg, at) => {
  const v = /viewBox="([^"]+)"/.exec(svg)[1].split(/\s+/).map(Number), T = texts(svg);
  T.forEach((t) => { const h = hopChu(t); assert.ok(t.fs >= 13, at + ": chữ “" + t.t + "” nhỏ hơn cỡ 13"); assert.ok(h[0] >= 0 && h[2] <= v[2] && h[1] >= 0 && h[3] <= v[3], at + ": chữ “" + t.t + "” tràn khỏi khung hình"); });
  T.forEach((t, i) => T.slice(i + 1).forEach((u) => { const a = hopChu(t), b = hopChu(u); assert.ok(!(a[0] < b[2] - 1 && b[0] < a[2] - 1 && a[1] < b[3] - 1 && b[1] < a[3] - 1), at + ": chữ “" + t.t + "” đè lên chữ “" + u.t + "”"); }));
};
const daDoc = new Set();
/* Phả hệ (như tests/sinhhoc-ktpl12-ck1.js): nam là hình vuông cạnh 24, nữ là hình tròn bán kính 12; người bệnh tô ink, người lành tô surface;
   số thứ tự ngay dưới mỗi người; đoạn ngang nối mép hai người cùng hàng là cặp vợ chồng; từ giữa đoạn đó một đoạn dọc xuống đường anh chị em
   (đoạn ngang), từ đường này mỗi đoạn dọc xuống chạm đỉnh một người con. Hai gia đình có thể có đường anh chị em cùng độ cao: đoạn xuống con
   của một gia đình là đoạn dọc có đầu trên nằm trên đường anh chị em của gia đình đó. Mọi đoạn thẳng của hình phải thuộc một trong các vai trò. */
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
    assert.ok(s, at + ": có đường anh chị em ngay dưới cặp vợ chồng"); assert.ok(!s.dung, at + ": hai cặp vợ chồng chung một đường anh chị em"); s.dung = true;
    const s0 = Math.min(s.x1, s.x2), s1 = Math.max(s.x1, s.x2), ve = doc.filter((v) => v !== d && Math.min(v.y1, v.y2) === yS && v.x1 >= s0 && v.x1 <= s1);
    assert.ok(ve.length >= 1 && [s0, s1].every((x) => ve.some((v) => v.x1 === x)), at + ": hai đầu đường anh chị em là hai người con");
    const bo = a.gioi === "nam" ? a : b, me = a.gioi === "nam" ? b : a;
    ve.forEach((v) => { const c = nguoi.find((n) => n.cx === v.x1 && n.cy - n.r === Math.max(v.y1, v.y2)); assert.ok(c, at + ": đoạn dọc phải chạm đỉnh một người con"); v.dung = true;
      assert.ok(!con.has(c.so), at + ": mỗi người có một cặp bố mẹ"); con.set(c.so, { bo, me }); });
  });
  assert.ok(L.every((l) => l.dung), at + ": đoạn thẳng không thuộc cặp vợ chồng, đường anh chị em hay đoạn xuống con");
  chuHinh(svg, at); daDoc.add(svg);
  return { nguoi, con, so: (k) => nguoi.find((n) => n.so === k) };
};
// kiểu di truyền: nơi gene nằm, allele gây bệnh trội hay lặn
const KIEU_DT = { "lặn, NST thường": ["thuong", false], "trội, NST thường": ["thuong", true], "lặn, NST X": ["X", false], "trội, NST X": ["X", true] };
const kgCo = (noi, laTroi, n) => (noi === "X" && n.gioi === "nam" ? [["A"], ["a"]] : [["A", "A"], ["A", "a"], ["a", "a"]]).filter((g) => (laTroi ? g.includes("A") : !g.includes("A")) === n.benh);
// xác suất con có kiểu gene c khi bố mẹ có kiểu gene b, m (con nam ở kiểu NST X: chỉ nhận X của mẹ; đã biết giới tính của con)
const pCon = (noi, c, b, m, gioi) => {
  if (noi === "X" && gioi === "nam") return F(m.filter((x) => x === c[0]).length, 2);
  const tu = noi === "X" ? [b[0]] : b;
  let k = 0; tu.forEach((x) => m.forEach((y) => { if ([x, y].sort().join("") === [...c].sort().join("")) k++; })); return F(k, tu.length * m.length);
};
// mọi cách gán kiểu gene khớp phả hệ theo một kiểu di truyền, trọng số = tiên nghiệm (người không có bố mẹ trong hình) × xác suất truyền allele
const ganPhaHe = (ph, kieu, tien = () => F(1)) => {
  const [noi, laTroi] = KIEU_DT[kieu], ds = [...ph.nguoi].sort((a, b) => a.so - b.so), ra = [], g = new Map();
  const di = (i, w) => {
    if (!w.n) return;
    if (i === ds.length) { ra.push({ g: new Map(g), w }); return; }
    const n = ds[i], cha = ph.con.get(n.so);
    kgCo(noi, laTroi, n).forEach((k) => { g.set(n.so, k);
      const p = cha ? pCon(noi, k, g.get(cha.bo.so), g.get(cha.me.so), n.gioi) : tien(k, n);
      di(i + 1, fNhan(w, p)); g.delete(n.so); });
  };
  // bố mẹ luôn có số nhỏ hơn con, nên khi xét đến con thì kiểu gene của bố mẹ đã gán
  ph.con.forEach(({ bo, me }, c) => assert.ok(bo.so < c && me.so < c, "bố mẹ đánh số trước con"));
  di(0, F(1)); assert.ok(ra.length, "phả hệ không khớp kiểu di truyền " + kieu);
  const tong = ra.reduce((s, x) => fCong(s, x.w), F(0));
  return { noi, laTroi, ra: ra.map((x) => ({ g: x.g, p: fChia(x.w, tong) })) };
};
// các kiểu di truyền khớp với phả hệ
const kieuDiTruyen = (ph) => Object.keys(KIEU_DT).filter((k) => { try { ganPhaHe(ph, k); return true; } catch (e) { return false; } });
const xs = (G, dk) => G.ra.filter((x) => dk(x.g)).reduce((s, x) => fCong(s, x.p), F(0));
// xác suất cặp vợ chồng a, b sinh một con (chưa biết giới tính) mắc bệnh
const conBenh = (G, ph, a, b) => G.ra.reduce((s, x) => {
  const bo = ph.so(a).gioi === "nam" ? x.g.get(a) : x.g.get(b), me = ph.so(a).gioi === "nam" ? x.g.get(b) : x.g.get(a);
  const p = ["nam", "nữ"].reduce((t, gioi) => fCong(t, fNhan(F(1, 2), kgCo(G.noi, G.laTroi, { gioi, benh: true }).reduce((u, k) => fCong(u, pCon(G.noi, k, bo, me, gioi)), F(0)))), F(0));
  return fCong(s, fNhan(x.p, p)); }, F(0));
const chacChan = (G, ph) => ph.nguoi.filter((n) => new Set(G.ra.map((x) => x.g.get(n.so).join(""))).size === 1).length;
// xác suất cặp vợ chồng a, b sinh một con có giới tính gioi và tình trạng bệnh benh (Phiên N12-tn-sinhhoc-b)
const conGioi = (G, ph, a, b, gioi, benh) => G.ra.reduce((s, x) => {
  const bo = ph.so(a).gioi === "nam" ? x.g.get(a) : x.g.get(b), me = ph.so(a).gioi === "nam" ? x.g.get(b) : x.g.get(a);
  const p = kgCo(G.noi, G.laTroi, { gioi, benh }).reduce((u, k) => fCong(u, pCon(G.noi, k, bo, me, gioi)), F(0));
  return fCong(s, fNhan(x.p, fNhan(F(1, 2), p))); }, F(0));
// tỉ lệ kiểu hình của đời con viết như “3 tím : 4 vàng : 1 trắng” (số nguyên tối giản, theo thứ tự thuTu); ten(g) là kiểu hình của kiểu gene g
const tiSoKH = (m, ten, thuTu) => {
  const t = {}; m.forEach((p, g) => { const k = ten(g); assert.ok(thuTu.includes(k), "kiểu hình lạ " + k); t[k] = fCong(t[k] || F(0), p); });
  const D = thuTu.reduce((l, k) => { const d = (t[k] || F(0)).d; return (l * d) / ucln(l, d); }, 1), c = thuTu.map((k) => ((t[k] || F(0)).n * D) / (t[k] || F(0)).d);
  const g = c.reduce((a, b) => ucln(a, b)); return thuTu.map((k, i) => c[i] / g + " " + k).join(" : ");
};
// tự thụ phấn qua n thế hệ từ thành phần x AA : y Aa : z aa
const tuThu = (x, y, z, n) => { const h = y / 2 ** n; return { AA: x + (y - h) / 2, Aa: h, aa: z + (y - h) / 2 }; };

/* ---------- bảng ghi trong script (theo sách Sinh học 11, 12 Kết nối tri thức in năm 2026; câu khái niệm so với bảng) ---------- */
const BO_SUNG_DNA = { A: "T", T: "A", G: "C", C: "G" }, LK_H = { A: 2, T: 2, G: 3, C: 3 };
const GIOI_TINH = { gà: { trống: "ZZ", mái: "ZW" }, người: { nam: "XY", nữ: "XX" }, "châu chấu": { đực: "XO", cái: "XX" } };
const HOI_CHUNG = { Turner: "XO", Klinefelter: "XXY", "ba X": "XXX" };
const MOI_TRUONG = { "Giun đũa sống trong ruột người": "môi trường sinh vật" };
const HORMONE = { "đóng khí khổng": "abscisic acid" };
const BAI_HOC = {
  // Bài 2: mã di truyền dùng chung cho hầu hết sinh vật là mã vạn năng; Bài 3: tế bào chuyên hoá đóng, mở các nhóm gene khác nhau
  vanNang: "là mã vạn năng", chuyenHoa: "mỗi loại tế bào đóng, mở những nhóm gene khác nhau",
  phienMaNguoc: "phiên mã ngược", intron: "vi khuẩn không có cơ chế cắt bỏ intron khỏi mRNA của gene người",
  // Bài 7: đầu mút bảo vệ NST; Bài 8: phân li độc lập khi hai cặp gene ở hai cặp NST tương đồng khác nhau; Bài 12: lặp đoạn, thể tam bội bất thụ
  dauMut: "Bảo vệ NST, giúp các NST không dính vào nhau", bienDiToHop: "biến dị tổ hợp", lapDoan: "Lặp đoạn",
  tamBoi: "giảm phân bị rối loạn nên hầu hết giao tử không thụ tinh được",
  // Bài 15: bất dục đực tế bào chất trong tạo giống lai; Bài 16: các bước tạo giống bằng lai hữu tính; Bài 18: vốn gene
  batDuc: "không phải tốn công rút bỏ cờ (hoa đực) ở các cây mẹ", taoGiong: "tạo các dòng thuần chủng có đặc tính khác nhau", vonGene: "vốn gene của quần thể",
  // Bài 20–22
  darwin: "các quần thể sinh vật ngày càng thích nghi với môi trường sống", tienHoaNho: "làm cấu trúc di truyền của quần thể biến đổi",
  kieuHinh: "kiểu hình của sinh vật", phatSinh: "quan hệ họ hàng giữa chúng càng gần",
  miller: "Chất hữu cơ đơn giản có thể tạo thành từ chất vô cơ nhờ năng lượng tự nhiên",
  // Bài 23–34
  doAm: "lượng mưa, độ ẩm", dongDeu: "Phân bố đồng đều, do cạnh tranh giành chỗ làm tổ",
  toiDa: "số cá thể lớn nhất mà môi trường còn cung cấp đủ điều kiện sống cho quần thể", oSinhThai: "ổ sinh thái của loài", dacTrung: "loài đặc trưng",
  carbon: "Quang hợp của thực vật, tảo và vi khuẩn lam", tuyetChung: "mất và chia cắt nơi sống do hoạt động của con người",
  danSo: "giúp dân số không tăng vượt khả năng đáp ứng của tài nguyên thiên nhiên",
  // Sinh học 11: synapse hoá học (Bài 17); trao đổi khí ở chim (Bài 9); nhân giống vô tính (Bài 25)
  synapse: "chất dẫn truyền thần kinh do màng trước giải phóng vào khe synapse", chim: "không khí giàu oxygen đi qua phổi một chiều cả khi hít vào và thở ra",
  chietGhep: "giữ được các đặc tính tốt của cây mẹ và sớm cho quả",
  // câu đúng/sai 4 ý về khái niệm: chữ của ý → đúng/sai
  quangHop: { "hấp thụ mạnh nhất ánh sáng màu xanh lục": false, "Pha sáng diễn ra trên màng thylakoid": true, "Chu trình Calvin cố định CO₂": true, "Thực vật CAM mở khí khổng vào ban ngày": false },
  phanXa: { "phản xạ không điều kiện, có từ khi sinh ra": true, "Cơ ở cánh tay là bộ phận đáp ứng": true, "Dây thần kinh vận động dẫn xung thần kinh từ thụ thể": false, "khi dây thần kinh cảm giác ở cánh tay bị tổn thương": false },
  // Đề 3. Bài 1: ligase nối các đoạn Okazaki; Bài 2: promoter ở vùng điều hoà; Bài 10: gene trên Y (di truyền thẳng); Bài 12: colchicine ngăn tạo
  // thoi phân bào; Bài 13: bệnh phenylketonuria giảm nhẹ bằng chế độ ăn; Bài 15: gene ti thể di truyền theo mẹ; Bài 16: ưu thế lai; Bài 20: Darwin
  // (hươu cao cổ); Bài 32: chu trình nước; Bài 33: phục hồi hệ sinh thái; Bài 35: sử dụng bền vững nguồn nước; Sinh học 11: mao mạch (Bài 10),
  // thụ tinh kép (Bài 25), hormone thực vật (Bài 20)
  ligase: "ligase", vungDieuHoa: "vùng điều hoà", nstY: "chỉ có ở nam, truyền từ bố cho mọi con trai", colchicine: "làm thoi phân bào không hình thành được",
  pku: "cho trẻ ăn theo chế độ kiêng phù hợp từ nhỏ", tiThe: "đều mắc bệnh, cả con trai và con gái", uuTheLai: "có năng suất, sức sống vượt trội các dòng bố mẹ",
  darwinHuou: "những con có cổ dài sẵn có trong đàn được chọn lọc giữ lại qua nhiều đời", bocHoi: "bốc hơi",
  phucHoi: "Trồng lại cây ngập mặn ở bãi bồi ven biển từng bị phá", nhoGiot: "Tưới nhỏ giọt vào vùng rễ của từng cây", maoMach: "mao mạch",
  thuTinhKep: "nhân tam bội (3n), về sau phát triển thành nội nhũ",
  hormone: { "Cytokinin ức chế sự phân chia tế bào": false, "Ethylene làm chậm quá trình chín": false, "Gibberellin kích thích thân, lóng kéo dài": true, "Auxin được tổng hợp nhiều ở đỉnh chồi": true },
  // Đề 4. Bài 1: nhiều điểm khởi đầu tái bản; Bài 2: phiên mã trong nhân; Bài 4: đột biến gene tạo allele mới; Bài 5: lúa vàng (cây chuyển gene);
  // Bài 7: thành phần của NST; Bài 8: Mendel tạo dòng thuần bằng tự thụ phấn; Bài 9: tính trạng số lượng; Bài 12: thể tứ bội; Bài 16: giống và cách
  // nuôi dưỡng; Bài 22: giả thuyết nội cộng sinh; Bài 26: quan hệ sinh vật ăn sinh vật; Bài 29: dòng vật chất, dòng năng lượng; Bài 31: hoang mạc;
  // Bài 35: giảm khí thải nhà kính; Sinh học 11: hướng nước (Bài 15), hấp thụ ở ruột non (Bài 8), sinh sản ở động vật (Bài 26–27)
  nhieuDiem: "rút ngắn thời gian tái bản toàn bộ phân tử DNA", phienMaNhan: "nhân tế bào", alleleMoi: "làm xuất hiện các allele mới",
  luaVang: "chuyển gene từ loài khác vào cây lúa", thanhPhanNST: "DNA và protein histone", dongThuan: "cho từng giống tự thụ phấn qua nhiều thế hệ",
  soLuong: "do nhiều gene cùng quy định và dễ thay đổi theo môi trường", tuBoi: "tế bào to, cơ quan sinh dưỡng lớn, sinh trưởng mạnh",
  nuoiDuong: "kết hợp giống tốt với cách nuôi dưỡng, chăm sóc phù hợp", noiCongSinh: "vi khuẩn hiếu khí được tế bào nhân thực sơ khai thực bào",
  anSinhVat: "sinh vật này ăn sinh vật khác", dongVatChat: "vật chất được sử dụng lại theo chu trình, năng lượng truyền một chiều", hoangMac: "hoang mạc",
  xeBuyt: "Đi xe buýt hoặc xe đạp thay cho xe máy cá nhân", huongNuoc: "hướng nước", ruotNon: "ruột non",
  sinhSan: { "Thuỷ tức có thể sinh sản vô tính bằng cách nảy chồi": true, "Ếch đồng thụ tinh trong": false, "sự thụ tinh thường diễn ra ở ống dẫn trứng": true, "Sinh sản vô tính tạo ra các cá thể con đa dạng": false }
};
// bệnh, hội chứng do đột biến gene, đột biến cấu trúc hay số lượng NST (Bài 12, 13)
const NGUYEN_NHAN = { "Hội chứng tiếng mèo kêu": "cấu trúc NST", "Hội chứng Down": "số lượng NST", "Hội chứng Turner": "số lượng NST", "Bệnh hồng cầu hình liềm": "gene",
  "Bệnh bạch tạng": "gene", "Người có bộ NST giới tính XXY": "số lượng NST" };
// sinh vật đẳng nhiệt (chim, thú) và biến nhiệt (cá, lưỡng cư, bò sát) theo Bài 23; sinh vật sản xuất trong hệ sinh thái nước ngọt (Bài 27)
const NHIET = { "chim bồ câu": "đẳng nhiệt", "cá chép": "biến nhiệt", "ếch đồng": "biến nhiệt", "thằn lằn bóng": "biến nhiệt" };
const SAN_XUAT = { "tảo lục": true, "rong đuôi chó": true, "cá mè trắng": false, "tôm càng": false, "vi khuẩn": false, "nấm sống trên xác": false, "ốc vặn": false, "ấu trùng chuồn chuồn": false };
/* Bảng của Đề 5–8 (Phiên N12-tn-sinhhoc-b; khoá riêng, không dùng chung BAI_HOC để khoá mới không đè khoá cũ). */
const BAI_HOC_2 = {
  // Đề 5. Bài 1: DNA polymerase kéo dài mạch mới theo chiều 5' → 3'; Bài 3: proto-oncogene hoạt động quá mức gây ung thư; Bài 5: động vật chuyển
  // gene tiêm gene vào trứng vừa thụ tinh; Bài 7: quan sát NST ở kì giữa; Bài 10: gene lặn trên X biểu hiện ở nam nhiều hơn; Bài 13: bệnh hồng cầu
  // hình liềm do đột biến gene; Bài 15: DNA ti thể nhiều bản sao, di truyền theo dòng mẹ; Bài 19: cơ quan tương tự; Bài 21:
  // chọn lọc loại allele trội nhanh hơn allele lặn; Bài 24: tăng trưởng theo tiềm năng sinh học; Bài 26: phân tầng theo nhu cầu ánh sáng; Bài 34:
  // khai thác tài nguyên có khả năng tái tạo; Sinh học 11: thyroxine (Bài 22), hô hấp trong bảo quản nông sản (Bài 6), các hình thức học tập (Bài 18)
  chieu53: "5' → 3'", oncogene: "tế bào phân chia không kiểm soát, có thể dẫn đến ung thư", trungThuTinh: "Trứng vừa thụ tinh, khi hai nhân chưa hoà nhập",
  kiGiua: "NST co xoắn tối đa nên có hình dạng rõ nhất", namX: "nam có một bản sao của gene nên allele lặn luôn được biểu hiện",
  hongCau: "đột biến điểm làm đổi một amino acid của chuỗi β-globin", dnaTiThe: "Có nhiều bản sao trong mỗi tế bào và chỉ do mẹ truyền cho con",
  alleleLanAn: "allele lặn ở thể dị hợp không biểu hiện nên không bị loại",
  chuJ: "nguồn sống dồi dào, không có kẻ thù hay dịch bệnh", phanTang: "mỗi nhóm loài cây ưa một mức ánh sáng khác nhau", khaiThacCa: "Không đánh bắt vào mùa cá đẻ, không bắt cá nhỏ",
  thyroxine: "Thyroxine", baoQuan: "làm giảm cường độ hô hấp của hạt, hạn chế hao hụt chất hữu cơ",
  hocTap: { "lâu dần không bay đi nữa: đây là quen nhờn": true, "diễn ra được ở mọi lứa tuổi của vịt": false, "đây là điều kiện hoá đáp ứng": false, "phải học từ bố mẹ mới có": false },
  // Đề 6. Bài 2: rRNA cùng protein tạo ribosome; Bài 4: thể đột biến; Bài 5: insulin nhờ vi khuẩn chuyển gene; Bài 7: vùng nguyên nhiễm sắc chứa gene
  // đang hoạt động; Bài 8: Mendel dùng xác suất thống kê; Bài 10: gene SRY trên NST Y; Bài 12: đa bội khác nguồn; Bài 13: tư vấn di truyền; Bài 16: giống
  // là kiểu gene, năng suất là kiểu hình; Bài 22: chi Homo; Bài 24: phân bố ngẫu nhiên; Bài 28: sinh vật phân giải; Bài 30: nguyên nhân bên trong của diễn thế;
  // Bài 34: phân loại rác; Sinh học 11: ứng động không sinh trưởng (Bài 15), nuôi cấy mô (Bài 25), tuần hoàn ở người (Bài 10)
  rRNA: "rRNA", theDotBien: "thể đột biến", insulin: "Nuôi vi khuẩn đã được chuyển gene insulin của người", nguyenNhiemSac: "chứa các gene đang hoạt động",
  mendelMoi: "phân tích số liệu bằng toán xác suất thống kê", sry: "NST Y mang gene SRY", khacNguon: "Đa bội khác nguồn",
  tuVan: "đến cơ sở tư vấn di truyền để được đánh giá nguy cơ cho con", giong: "Giống cây trồng",
  homo: "não lớn hơn và đã biết dùng công cụ bằng đá", ngauNhien: "môi trường đồng nhất, không có tranh giành hay tụ họp rõ rệt",
  phanGiai: "Trả lại chất khoáng cho đất, nước để thực vật dùng lại", dienTheTrong: "tác động qua lại giữa các loài cùng sống, nhất là cạnh tranh khác loài",
  rac: "Phân loại rác tại nguồn để tái chế, tái sử dụng", trinhNu: "ứng động không sinh trưởng", nuoiCayMo: "tạo nhanh số lượng lớn cây con đồng nhất, sạch bệnh",
  notSan: { "lấy chất dinh dưỡng của cây và làm cây yếu đi": false, "chuyển N₂ của không khí": true, "chỉ cây đậu tương được lợi": false },
  tuanHoan: { "Máu trong mọi động mạch đều giàu oxygen": false, "Tim người gồm ba ngăn": false, "tâm thất trái bơm lên phổi": false, "nhờ có tính tự động": true },
  // Đề 7. Bài 2: polyribosome; Bài 4: lai các dòng đột biến lặn để biết hai đột biến thuộc một hay hai gene; Bài 5: sinh vật biến đổi
  // gene; Bài 15: lục lạp chia ngẫu nhiên, không đều khi phân bào (cây lá khảm); Bài 19: hoá thạch dạng trung gian; Bài 20: Darwin chưa biết cơ chế di
  // truyền và biến dị; Bài 22: sinh vật lên cạn ở đại Paleozoic (bảng các đại địa chất); Bài 26: phân bố theo chiều ngang; Bài 29: diễn thế trên đất
  // còn mùn, hạt nhanh hơn trên đá trơ; Bài 31: rừng nhiệt đới đa dạng nhất; Bài 33: Sách Đỏ; Bài 34: năng lượng tái tạo; Sinh học 11: hướng sáng
  // do auxin dồn về phía khuất sáng (Bài 15), bài tiết của thận (Bài 13)
  polyribosome: "tạo được nhiều phân tử protein cùng loại trong thời gian ngắn", haiGene: "đột biến ở hai dòng thuộc hai gene khác nhau", bienDoiGene: "Cây bông mang gene kháng sâu lấy từ vi khuẩn",
  khamLa: "hai loại lục lạp được chia ngẫu nhiên, không đều khi phân bào", archaeopteryx: "Chim được tiến hoá từ một nhóm bò sát",
  darwinChua: "Nguyên nhân phát sinh biến dị và cơ chế di truyền biến dị", lenCan: "Đại Paleozoic (Cổ sinh)", chieuNgang: "sự phân bố theo chiều ngang",
  dienTheNhanh: "đất còn mùn, còn hạt và mầm của cây cũ", rungMua: "Rừng nhiệt đới", sachDo: "Xác định những loài cần ưu tiên bảo vệ và mức độ nguy cấp của chúng",
  taiTao: "Lắp tấm pin mặt trời trên mái nhà để lấy điện", huongSang: "auxin tập trung nhiều ở phía khuất sáng, tế bào phía đó dãn dài nhanh hơn",
  than: { "Thận lọc máu tạo nước tiểu": true, "Nước tiểu được tạo thành ở gan": false, "lượng nước tiểu thải ra tăng lên": false, "thường chứa nhiều glucose": false }
};
// vai trò trong hệ sinh thái (Bài 27) và kiểu phát triển của động vật (Sinh học 11, Bài 20) của Đề 7
const VAI_HST = { "châu chấu": "tiêu thụ", "ếch đồng": "tiêu thụ", "rắn ráo": "tiêu thụ", "chuột đồng": "tiêu thụ", "cây lúa": "sản xuất", "cỏ gấu": "sản xuất", "nấm mốc": "phân giải", "vi khuẩn hoại sinh": "phân giải" };
const BIEN_THAI = { "Bướm cải": "hoàn toàn", "Châu chấu": "không hoàn toàn", "Gián": "không hoàn toàn", "Mèo": "không qua biến thái" };
// cơ quan tương đồng, tương tự (Bài 19): khoai lang là rễ, khoai tây là thân; tay người, cánh dơi là chi trước; gai xương rồng, tua cuốn đậu Hà Lan là lá
const CO_QUAN = { "Củ khoai lang và củ khoai tây": "tương tự", "Tay người và cánh dơi": "tương đồng", "Gai xương rồng và tua cuốn của đậu Hà Lan": "tương đồng", "Xương cụt ở người và đuôi của mèo": "tương đồng" };
// nhân tố vô sinh (Bài 23): yếu tố vật lí, hoá học của môi trường
const VO_SINH = { "Hàm lượng oxygen hoà tan trong nước ao": true, "Tảo lục làm thức ăn cho cá": false, "Vi khuẩn gây bệnh xuất huyết ở cá": false, "Những con cá rô phi khác cùng ao": false };

/* ---------- các mục kiểm tra của từng đề (RIENG; phiên thêm đề thì thêm một khoá mới) ----------
   has: đoạn chữ của đề bài; right(q, d): đáp án tính bằng code, d là chữ của đoạn thông tin dùng chung (rỗng nếu câu không có): câu nhiều
   lựa chọn trả về lựa chọn đúng, câu đúng/sai 4 ý trả về mảng 4 ý, câu trả lời ngắn trả về số chưa làm tròn. */
const RIENG = {
  "sinhhoc12-tn-de1": [
    { has: "nucleotide loại A ở mạch này luôn kết cặp", right: () => "Loại " + BO_SUNG_DNA.A + ", bằng " + LK_H.A + " liên kết hydrogen" },
    { has: "đều dùng chung một bảng mã di truyền", right: () => BAI_HOC.vanNang },
    { has: "thành 5'–UGA–3'", right: (q) => { const c = [...q.q.matchAll(/5'–([AUGC]{3})–3'/g)].map((m) => m[1]); assert.ok(c.length === 2 && MA[c[0]] === "W" && MA[c[1]] === "*", "codon đầu là tryptophan, codon sau là kết thúc");
      return motCai(q, (o) => /^ngắn hơn, vì dịch mã dừng/.test(o)); } },
    { has: "(vùng đầu mút)", right: () => BAI_HOC.dauMut },
    { has: "nhóm máu do một gene có ba allele", right: (q) => {
      // chồng nhóm máu A, vợ nhóm máu B, con đầu lòng nhóm máu O: chỉ cặp kiểu gene nào sinh được con O mới khớp; xác suất con thứ hai nhóm AB
      const ch = Object.keys(NHOM_MAU).filter((g) => NHOM_MAU[g] === "A"), vo = Object.keys(NHOM_MAU).filter((g) => NHOM_MAU[g] === "B");
      const cap = ch.flatMap((b) => vo.map((m) => [b, m])).filter(([b, m]) => (conMau(b, m)["IᴼIᴼ"] || F(0)).n > 0);
      assert.deepEqual(cap, [["IᴬIᴼ", "IᴮIᴼ"]]); return fChu(conMau(...cap[0])["IᴬIᴮ"]); } },
    { has: "Gà mái có cặp NST giới tính", right: () => GIOI_TINH.gà.mái },
    { has: "làm tăng số bản sao của một số gene trên NST", right: () => BAI_HOC.lapDoan },
    { has: "người ta thường bắt đầu bằng việc", right: () => BAI_HOC.taoGiong },
    { has: "đang ở trạng thái cân bằng di truyền theo định luật Hardy – Weinberg", right: (q) => motCai(q, (o) => {
      const [x, y, z] = so(o, "# AA : # Aa : # aa"); assert.ok(gan(x + y + z, 1), "tổng tần số kiểu gene bằng 1: " + o); const p = x + y / 2;
      return Math.abs(x - p * p) < 1e-9 && Math.abs(y - 2 * p * (1 - p)) < 1e-9; }) },
    { has: "Theo Darwin, kết quả của chọn lọc tự nhiên là", right: () => BAI_HOC.darwin },
    { has: "tiến hoá nhỏ là quá trình", right: () => BAI_HOC.tienHoaNho },
    { has: "Cây phát sinh chủng loại biểu diễn quan hệ họ hàng", right: () => BAI_HOC.phatSinh },
    { has: "Giun đũa sống trong ruột người", right: (q) => MOI_TRUONG[Object.keys(MOI_TRUONG).find((k) => q.q.includes(k))] },
    { has: "các tổ của một loài chim biển nằm cách nhau gần như đều đặn", right: () => BAI_HOC.dongDeu },
    { has: "Tổ hợp các giới hạn sinh thái của một loài", right: () => BAI_HOC.oSinhThai },
    { has: "nguyên nhân hàng đầu khiến nhiều loài sinh vật bị đe doạ tuyệt chủng", right: () => BAI_HOC.tuyetChung },
    { has: "Ở synapse hoá học giữa hai neuron", right: () => BAI_HOC.synapse },
    { has: "bằng cách chiết cành hoặc ghép cành", right: () => BAI_HOC.chietGhep },
    { has: "Cho cây hoa đỏ, quả tròn (P) giao phấn với cây hoa trắng, quả dài", right: (q) => {
      // cây P hoa đỏ, quả tròn lai với aabb cho bốn loại kiểu hình ngang nhau: thử mọi kiểu gene A_B_
      const kh = (g) => (troi(g, "a") ? "đỏ" : "trắng") + "-" + (troi(g, "b") ? "tròn" : "dài");
      const ung = ["AABB", "AABb", "AaBB", "AaBb"].filter((p) => { const m = lai(p, "aabb"), k = {}; m.forEach((v, g) => (k[kh(g)] = fCong(k[kh(g)] || F(0), v)));
        return Object.keys(k).length === 4 && Object.values(k).every((v) => fBang(v, F(1, 4))); });
      assert.deepEqual(ung, ["AaBb"]); const F1 = lai("AaBb", "aabb"), y = q.o;
      const dodai = tiLe(F1, (g) => troi(g, "a") && !troi(g, "b")), soKG = F1.size, F2 = lai("AaBb", "AaBb");
      assert.ok([...F1.keys()].filter((g) => troi(g, "a") && troi(g, "b")).every((g) => g === "AaBb"), "cây hoa đỏ, quả tròn F1 đều AaBb");
      return [/kiểu gene (\w+)\./.exec(y[0])[1] === ung[0], gan(phanTram(y[1]) / 100, fSo(dodai)), +/có (\d+) loại kiểu gene/.exec(y[2])[1] === soKG,
        fBang(psTrong(y[3]), tiLe(F2, (g) => !troi(g, "a") && !troi(g, "b")))]; } },
    { has: "phả hệ của một gia đình có người mắc bệnh M", right: (q) => {
      const ph = docPhaHe(q.svg, "phả hệ bệnh M"), k = kieuDiTruyen(ph); assert.deepEqual(k, ["lặn, NST thường"], "chỉ một kiểu di truyền khớp phả hệ");
      const G = ganPhaHe(ph, k[0]), G2 = ganPhaHe(ph, k[0], (g) => F(g.join("") === "AA" ? 3 : 1));
      const giong = xs(G, (g) => g.get(6).join("") === g.get(7).join("")), con = conBenh(G, ph, 6, 7);
      assert.ok(fBang(giong, xs(G2, (g) => g.get(6).join("") === g.get(7).join(""))) && fBang(con, conBenh(G2, ph, 6, 7)), "kết quả không phụ thuộc tiên nghiệm");
      const y = q.o; assert.ok(/allele trội quy định/.test(y[0]));
      return [k[0].startsWith("trội"), fBang(psTrong(y[1]), giong), +/của (\d+) người/.exec(y[2])[1] === chacChan(G, ph), fBang(psTrong(y[3]), con)]; } },
    { has: "quan hệ giữa hai loài cỏ X và Y", right: (q) => {
      const [xP, xR] = so(q.q, "loài X ở chậu P là # g, ở chậu R là # g"), [yQ, yR] = so(q.q, "loài Y ở chậu Q là # g, ở chậu R là # g");
      const [nP] = so(q.q, "gieo vào mỗi chậu # hạt"), [nX, nY] = so(q.q, "chậu R gieo # hạt loài X và # hạt loài Y"); assert.equal(nX + nY, nP, "ba chậu cùng số cây");
      const gX = (xP - xR) / xP, gY = (yQ - yR) / yQ, y = q.o;
      return [xR < xP && yR < yQ, gan(phanTram(y[1]) / 100, gY), gX > gY, nX * xR + nY * yR > nP * yQ]; } },
    { has: "Mỗi ý sau về quang hợp ở thực vật đúng hay sai?", right: (q) => traY(q, BAI_HOC.quangHop) },
    { has: "Một phân tử DNA mạch kép có", right: (q) => { const [N] = so(q.q, "có # nucleotide"), [A] = so(q.q, "loại A chiếm #%"); return (N * (50 - A)) / 100; } },
    { has: "chiều cao cây chịu ảnh hưởng của ba gene", right: (q) => { const [base] = so(q.q, "(aabbdd) cao # cm"), [buoc] = so(q.q, "thì cây cao hơn # cm"), [H] = so(q.q, "những cây cao # cm chiếm");
      const k = (H - base) / buoc; assert.ok(Number.isInteger(k)); coX(q, "C(6, " + k + ")"); return fSo(tiLe(lai("AaBbDd", "AaBbDd"), (g) => soTroi(g) === k)); } },
    { has: "dị hợp hai cặp gene lai phân tích", right: (q) => {
      const c = so(q.q, "gồm # cây thân cao, hoa đỏ; # cây thân cao, hoa trắng; # cây thân thấp, hoa đỏ; # cây thân thấp, hoa trắng"), s = [...c].sort((a, b) => a - b);
      assert.ok(s[0] === s[1] && s[2] === s[3] && s[1] < s[2], "hai lớp nhiều, hai lớp ít"); return ((s[0] + s[1]) / sum(c)) * 100; } },
    { has: "cải bắp tam bội", right: (q) => { const [n2] = so(q.q, "2n = #"); return (3 * n2) / 2; } },
    { has: "có 16% số cây hoa trắng", right: (q) => { const [t] = so(q.q, "có #% số cây hoa trắng"), qa = Math.sqrt(t / 100), p = 1 - qa; return (2 * p * qa) / (p * p + 2 * p * qa); } },
    { has: "Hiệu suất sinh thái của cá rô so với giáp xác", right: (q) => {
      // chuỗi tảo lục → giáp xác → cá rô (mỗi loài ăn loài đứng trước): hiệu suất giữa bậc cấp 3 và cấp 2
      const [, e2, e3] = so(q.q, "tảo lục tích luỹ # kcal; giáp xác ăn tảo lục tích luỹ # kcal; cá rô ăn giáp xác tích luỹ # kcal"); return (e3 / e2) * 100; } }
  ],
  "sinhhoc12-tn-de2": [
    { has: "tổng hợp DNA từ khuôn RNA", right: () => BAI_HOC.phienMaNguoc },
    { has: "Tế bào gan, tế bào cơ và tế bào thần kinh", right: () => BAI_HOC.chuyenHoa },
    { has: "hormone sinh trưởng của người", right: () => BAI_HOC.intron },
    { has: "Lai hai dòng chuột thuần chủng", right: () => BAI_HOC.bienDiToHop },
    { has: "số nhóm gene liên kết của loài này", right: (q) => { const [n2] = so(q.q, "2n = #"); return String(n2 / 2); } },
    { has: "Chuối nhà là thể tam bội", right: () => BAI_HOC.tamBoi },
    { has: "hội chứng Turner", right: (q) => motCai(q, (o) => o.startsWith(HOI_CHUNG.Turner + " ")) },
    { has: "dòng ngô bất dục đực", right: () => BAI_HOC.batDuc },
    { has: "Tập hợp tất cả các allele của mọi gene", right: () => BAI_HOC.vonGene },
    { has: "chọn lọc tự nhiên trực tiếp sàng lọc", right: () => BAI_HOC.kieuHinh },
    { has: "Miller và Urey", right: () => BAI_HOC.miller },
    { has: "sườn đón gió ẩm từ biển", right: () => BAI_HOC.doAm },
    { has: "Kích thước tối đa của một quần thể là", right: () => BAI_HOC.toiDa },
    { has: "loài cây X chỉ gặp trong quần xã rừng trên núi đá", right: () => BAI_HOC.dacTrung },
    { has: "Trong chu trình carbon, carbon từ môi trường vô sinh", right: () => BAI_HOC.carbon },
    { has: "chính sách dân số (mỗi gia đình có số con hợp lí)", right: () => BAI_HOC.danSo },
    { has: "Ở chim, hiệu quả trao đổi khí ở phổi", right: () => BAI_HOC.chim },
    { has: "làm khí khổng đóng lại", right: () => HORMONE["đóng khí khổng"] },
    { has: "Một đoạn mRNA ở vi khuẩn, tính từ codon mở đầu", right: (q) => {
      const c = docMRNA(q.q), bang = bangDe(q.q); c.forEach((x) => assert.ok(x in bang, "đề cho nghĩa của codon " + x)); const goc = dich(c), y = q.o;
      const ten = Object.fromEntries(Object.entries(TEN_AA).map(([k, v]) => [v, k]));
      const [soAA] = /gồm (\d+) amino acid/.exec(y[0]).slice(1).map(Number);
      const thay = (s) => { const m = /codon thứ (\p{L}+) ([AUGC]{3}) thành ([AUGC]{3})/u.exec(s); const i = { hai: 1, ba: 2, tư: 3, năm: 4, sáu: 5 }[m[1]]; assert.equal(c[i], m[2]); assert.ok(m[3] in bang, "đề cho nghĩa của " + m[3]);
        const moi = c.slice(); moi[i] = m[3]; return { i, moi: dich(moi) }; };
      const b = thay(y[1]), d = thay(y[2]), mat = c.slice(0, 1).concat(c.slice(2)), sau = dich(mat);
      assert.ok(/làm amino acid thứ tư đổi từ arginine thành histidine/.test(y[2]) && d.i === 3);
      return [soAA === goc.length, b.moi.join("") === goc.join(""), ten[goc[3]] === "arginine" && ten[d.moi[3]] === "histidine",
        /mất đúng codon thứ hai/.test(y[3]) && sau.slice(1).every((a, k) => a !== goc[k + 2])]; } },
    { has: "lông dài do allele D quy định", right: (q) => {
      // con cái lông dài × con đực lông ngắn (XᵈY), F1 có cả lông dài và lông ngắn ở hai giới: chỉ cái XᴰXᵈ khớp
      const cai = ["XᴰXᴰ", "XᴰXᵈ"].filter((g) => { const m = kgX(g); return m.includes("D") && m.includes("d"); }), y = q.o;
      assert.deepEqual(cai, ["XᴰXᵈ"]); const me = kgX(cai[0]);
      const F1d = me.map((x) => [x]), F1c = me.map((x) => [x, "d"].sort());
      const ngan = (g) => !g.includes("D");
      const trongDuc = F(F1d.filter(ngan).length, F1d.length), caiDai = F1c.every((g) => !ngan(g));
      // F2: giao tử của các con cái F1 và các con đực F1
      const gtCai = {}; F1c.forEach((g) => g.forEach((a) => (gtCai[a] = fCong(gtCai[a] || F(0), F(1, 2 * F1c.length)))));
      const gtDuc = { Y: F(1, 2) }; F1d.forEach((g) => (gtDuc[g[0]] = fCong(gtDuc[g[0]] || F(0), F(1, 2 * F1d.length))));
      const caiNgan = Object.entries(gtCai).reduce((s, [a, p]) => (a === "d" ? fCong(s, fNhan(p, gtDuc.d || F(0))) : s), F(0));
      return [/kiểu gene (X\S+)\./u.exec(y[0])[1] === cai[0], gan(phanTram(y[1]) / 100, fSo(trongDuc)), caiDai, fBang(psTrong(y[3]), caiNgan)]; } },
    { has: "cây thân không gai, quả chua chiếm", right: (q) => {
      const [t] = so(q.q, "cây thân không gai, quả chua chiếm #%"), ab = Math.sqrt(t / 100), f = 1 - 2 * ab, gt = giaoTu("AB/ab", f), kh = tuThuLK(gt), y = q.o;
      assert.ok(gan(kh.ab, t / 100) && f > 0 && f < 0.5, "giao tử ab là giao tử liên kết");
      return [/AB\/ab/.test(y[0]), gan(phanTram(y[1]) / 100, f), gan(phanTram(y[2]) / 100, kh.AB), gan(phanTram(y[3]) / 100, kh.Ab)]; } },
    { has: "chạm tay vào chiếc cốc nóng", right: (q) => traY(q, BAI_HOC.phanXa) },
    { has: "AaBbDDEe", right: (q) => soGiaoTu(/kiểu gene (\w+) \(/.exec(q.q)[1]) },
    { has: "trội ở đúng hai trong ba tính trạng", right: (q) => { const [, a, b] = /Lai cây (\w+) với cây (\w+)\./.exec(q.q).slice(0, 3);
      return fSo(tiLe(lai(a, b), (g) => ["a", "b", "d"].filter((x) => troi(g, x)).length === 2)); } },
    { has: "dạng thể ba (2n + 1)", right: (q) => so(q.q, "2n = #")[0] / 2 },
    { has: "số cây mang allele a", right: (q) => { const [qa] = so(q.q, "tần số allele a là #"); return 2 * (1 - qa) * qa + qa * qa; } },
    { has: "mật độ của quần thể hươu", right: (q) => { const [s, n] = so(q.q, "rộng # ha có # con hươu"); return n / s; } },
    { has: "ếch tích luỹ được bao nhiêu kcal", right: (q) => { const [e1] = so(q.q, "cỏ tích luỹ được # kcal"), [h21] = so(q.q, "Châu chấu ăn cỏ tích luỹ được #% năng lượng đó"), [h32] = so(q.q, "ếch ăn châu chấu tích luỹ được #% năng lượng");
      return (e1 * h21 * h32) / 10000; } }
  ],
  "sinhhoc12-tn-de3": [
    { has: "Enzyme nối các đoạn ngắn này thành mạch liền", right: () => BAI_HOC.ligase },
    { has: "trình tự promoter", right: () => BAI_HOC.vungDieuHoa },
    { has: "Gene đột biến dài bằng gene ban đầu", right: (q) => {
      // mỗi lựa chọn đổi chiều dài (số cặp) và số liên kết hydrogen bao nhiêu: A – T 2 liên kết, G – C 3 liên kết
      const [dH] = so(q.q, "có nhiều hơn # liên kết hydrogen"), H = { "A – T": LK_H.A, "G – C": LK_H.G };
      const tac = (o) => { let m = /^cặp (A – T|G – C) được thay bằng cặp (A – T|G – C)$/.exec(o); if (m) return [0, H[m[2]] - H[m[1]]];
        m = /^(thêm|mất) một cặp (A – T|G – C)$/.exec(o); assert.ok(m, "lựa chọn lạ: " + o); return m[1] === "thêm" ? [1, H[m[2]]] : [-1, -H[m[2]]]; };
      assert.ok(/dài bằng gene ban đầu/.test(q.q)); return motCai(q, (o) => { const [dl, dh] = tac(o); return dl === 0 && dh === dH; }); } },
    { has: "có bao nhiêu cặp NST thường", right: (q) => { const [n2] = so(q.q, "2n = #"); return n2 / 2 - 1 + " cặp"; } },
    { has: "do gene trên NST Y chi phối", right: () => BAI_HOC.nstY },
    { has: "bằng colchicine", right: () => BAI_HOC.colchicine },
    { has: "Phenylketonuria", right: () => BAI_HOC.pku },
    { has: "do gene đột biến trong ti thể", right: () => BAI_HOC.tiThe },
    { has: "được gọi là có ưu thế lai", right: () => BAI_HOC.uuTheLai },
    { has: "có 4% số cây mang kiểu gene aa", right: (q) => { const [t] = so(q.q, "có #% số cây mang kiểu gene aa"); return motCai(q, (o) => gan(val(o), 1 - Math.sqrt(t / 100), 1e-12)); } },
    { has: "hươu cao cổ có cổ dài", right: () => BAI_HOC.darwinHuou },
    { has: "nhiệt độ cơ thể của loài nào sau đây gần như không đổi", right: (q) => motCai(q, (o) => { const k = o.toLowerCase(); assert.ok(k in NHIET, "chưa có " + o); return NHIET[k] === "đẳng nhiệt"; }) },
    { has: "gồm toàn sinh vật sản xuất", right: (q) => motCai(q, (o) => o.split(" và ").every((x) => { const k = x.toLowerCase(); assert.ok(k in SAN_XUAT, "chưa có " + x); return SAN_XUAT[k]; })) },
    { has: "Trong chu trình nước", right: () => BAI_HOC.bocHoi },
    { has: "góp phần phục hồi một hệ sinh thái", right: () => BAI_HOC.phucHoi },
    { has: "cách tưới nào sau đây", right: () => BAI_HOC.nhoGiot },
    { has: "máu và các tế bào trong cơ thể trao đổi chất", right: () => BAI_HOC.maoMach },
    { has: "Trong thụ tinh kép ở thực vật hạt kín", right: () => BAI_HOC.thuTinhKep },
    { has: "phả hệ của một gia đình có người mắc bệnh N", right: (q) => {
      // đề cho kiểu di truyền (gene lặn trên X); phả hệ phải khớp kiểu đó
      const ph = docPhaHe(q.svg, "phả hệ bệnh N"); assert.ok(/allele lặn nằm trên vùng không tương đồng của NST X/.test(q.q) && kieuDiTruyen(ph).includes("lặn, NST X"), "phả hệ khớp gene lặn trên X");
      const G = ganPhaHe(ph, "lặn, NST X"), G2 = ganPhaHe(ph, "lặn, NST X", (g) => F(g.join("") === "AA" ? 3 : 1)), y = q.o;
      const mang = (H, k) => xs(H, (g) => g.get(k).includes("a"));
      // con gái mắc bệnh: con là nữ (1/2) nhận Xᵃ từ cả bố và mẹ; a là mẹ, b là bố
      const gaiBenh = (H, a, b) => H.ra.reduce((s, x) => fCong(s, fNhan(x.p, fNhan(F(1, 2), pCon("X", ["a", "a"], x.g.get(b), x.g.get(a), "nữ")))), F(0));
      const [k1] = /^Người số (\d+) chắc chắn mang allele gây bệnh\.$/.exec(y[0]).slice(1).map(Number), [k2] = /người số (\d+) mang allele/.exec(y[1]).slice(1).map(Number);
      const [m3, b3] = /^Cặp vợ chồng (\d+) – (\d+) sinh con đầu lòng là con gái mắc bệnh/.exec(y[3]).slice(1).map(Number);
      assert.ok(ph.so(m3).gioi === "nữ" && ph.so(b3).gioi === "nam", "vợ trước, chồng sau");
      [[mang(G, k1), mang(G2, k1)], [mang(G, k2), mang(G2, k2)], [gaiBenh(G, m3, b3), gaiBenh(G2, m3, b3)]].forEach(([u, v]) => assert.ok(fBang(u, v), "kết quả không phụ thuộc tiên nghiệm"));
      return [fBang(mang(G, k1), F(1)), fBang(psTrong(y[1]), mang(G, k2)), +/có (\d+) người đã biết chắc kiểu gene/.exec(y[2])[1] === chacChan(G, ph), fBang(psTrong(y[3]), gaiBenh(G, m3, b3))]; } },
    { has: "Thế hệ P của một quần thể cây trồng gồm", right: (q) => {
      const [AA, Aa, aa] = so(q.q, "gồm #% cây AA, #% cây Aa và #% cây aa").map((x) => x / 100), p = AA + Aa / 2, y = q.o;
      assert.ok(gan(AA + Aa + aa, 1) && /trạng thái cân bằng di truyền/.test(y[1]) && /giao phấn ngẫu nhiên/.test(y[2]) && /tự thụ phấn/.test(y[3]));
      return [gan(so(y[0], "là #")[0], p), gan(AA, p * p) && gan(Aa, 2 * p * (1 - p)), gan(phanTram(y[2]) / 100, 2 * p * (1 - p)), gan(phanTram(y[3]) / 100, Aa / 2)]; } },
    { has: "Một bãi bồi mới nổi giữa sông", right: (q) => {
      const R = [...q.q.matchAll(/năm thứ (\d+), [^;]*?có (\d+) loài, sinh khối ([\d,]+) tấn\/ha/g)].map((m) => ({ nam: +m[1], loai: +m[2], sk: val(m[3]) }));
      assert.equal(R.length, 4, "bốn lần khảo sát"); const y = q.o, lay = (k) => R.find((r) => r.nam === k);
      const toc = (a, b, k) => (lay(b)[k] - lay(a)[k]) / (b - a);
      const mb = /Từ năm thứ (\d+) đến năm thứ (\d+), số loài thực vật tăng gấp (\d+) lần/.exec(y[1]).slice(1).map(Number);
      const mc = /từ năm thứ (\d+) đến năm thứ (\d+) so với giai đoạn từ năm thứ (\d+) đến năm thứ (\d+)/.exec(y[2]).slice(1).map(Number);
      const md = /sinh khối tăng nhiều nhất ở giai đoạn từ năm thứ (\d+) đến năm thứ (\d+)/.exec(y[3]).slice(1).map(Number);
      const gd = R.slice(1).map((r, i) => [R[i].nam, r.nam]), max = gd.reduce((m, g) => (toc(...g, "sk") > toc(...m, "sk") ? g : m));
      return [/lúc đầu chưa có sinh vật/.test(q.q) && /^Đây là diễn thế nguyên sinh\.$/.test(y[0]), gan(lay(mb[1]).loai / lay(mb[0]).loai, mb[2]),
        /số loài tăng nhanh hơn/.test(y[2]) && toc(mc[0], mc[1], "loai") > toc(mc[2], mc[3], "loai"), max[0] === md[0] && max[1] === md[1]]; } },
    { has: "Mỗi ý sau về hormone thực vật đúng hay sai?", right: (q) => traY(q, BAI_HOC.hormone) },
    { has: "tái bản liên tiếp", right: (q) => { const [N] = so(q.q, "có # nucleotide"), [k] = so(q.q, "liên tiếp # lần"); return N * (2 ** k - 1); } },
    { has: "Bảng mã di truyền gồm 64 bộ ba", right: () => Object.values(MA).filter((a) => a !== "*").length },
    { has: "AaBbDd × AaBbdd", right: (q) => { const [, a, b] = /phép lai (\w+) × (\w+),/.exec(q.q); return lai(a, b).size; } },
    { has: "(thể ba kép, 2n + 1 + 1)", right: (q) => so(q.q, "2n = #")[0] + 2 },
    { has: "quần thể chim sẻ trên một hòn đảo", right: (q) => { const [N0] = so(q.q, "có # con. Trong năm"), [B] = so(q.q, "có # con non được sinh ra"), [D] = so(q.q, "# con bị chết"), [E] = so(q.q, "# con di cư khỏi đảo");
      assert.ok(/không có con nào nhập cư/.test(q.q)); return N0 + B - D - E; } },
    { has: "quần thể ốc ở một ao", right: (q) => { const [E] = so(q.q, "thu nhận # kcal"), [h, f] = so(q.q, "#% mất qua hô hấp, #% thải ra ngoài theo phân"), [c] = so(q.q, "tích luỹ được #% năng lượng tích luỹ ở ốc");
      return ((E * (100 - h - f)) / 100) * (c / 100); } }
  ],
  "sinhhoc12-tn-de4": [
    { has: "bắt đầu cùng lúc tại nhiều vị trí trên một phân tử DNA", right: () => BAI_HOC.nhieuDiem },
    { has: "quá trình phiên mã tổng hợp mRNA từ gene trên NST", right: () => BAI_HOC.phienMaNhan },
    { has: "nguồn nguyên liệu quan trọng của chọn giống và tiến hoá", right: () => BAI_HOC.alleleMoi },
    { has: "Giống “lúa vàng”", right: () => BAI_HOC.luaVang },
    { has: "NST được cấu tạo chủ yếu từ", right: () => BAI_HOC.thanhPhanNST },
    { has: "Mendel tạo các dòng đậu Hà Lan thuần chủng", right: () => BAI_HOC.dongThuan },
    { has: "Các tính trạng số lượng", right: () => BAI_HOC.soLuong },
    { has: "Ab/aB giao phấn với nhau", right: (q) => { const [f] = so(q.q, "với tần số #%"), gt = giaoTu("Ab/aB", f / 100);
      assert.ok(/đồng hợp lặn ab\/ab/.test(q.q)); return motCai(q, (o) => gan(phanTram(o) / 100, gt.ab * gt.ab)); } },
    { has: "cây tứ bội (4n)", right: () => BAI_HOC.tuBoi },
    { has: "do đột biến cấu trúc NST gây ra", right: (q) => motCai(q, (o) => { assert.ok(o in NGUYEN_NHAN, "chưa có " + o); return NGUYEN_NHAN[o] === "cấu trúc NST"; }) },
    { has: "Một giống lợn có khả năng tăng cân nhanh", right: () => BAI_HOC.nuoiDuong },
    { has: "giả thuyết nội cộng sinh", right: () => BAI_HOC.noiCongSinh },
    { has: "Cây nắp ấm", right: () => BAI_HOC.anSinhVat },
    { has: "dòng vật chất khác dòng năng lượng", right: () => BAI_HOC.dongVatChat },
    { has: "Khu sinh học trên cạn nào có lượng mưa rất thấp", right: () => BAI_HOC.hoangMac },
    { has: "giảm lượng khí thải gây hiệu ứng nhà kính", right: () => BAI_HOC.xeBuyt },
    { has: "về phía có nguồn nước trong đất", right: () => BAI_HOC.huongNuoc },
    { has: "phần lớn các chất dinh dưỡng được hấp thụ", right: () => BAI_HOC.ruotNon },
    { has: "Cho cây P có kiểu gene AaBb giao phấn với cây có kiểu gene Aabb", right: (q) => {
      const [, a, b] = /Cho cây P có kiểu gene (\w+) giao phấn với cây có kiểu gene (\w+)\./.exec(q.q), F1 = lai(a, b), y = q.o;
      assert.ok(/quả đỏ/.test(q.q) && /\(A: quả đỏ, a: quả vàng\)/.test(q.q) && /\(B: quả tròn, b: quả dài\)/.test(q.q));
      const doTron = (g) => troi(g, "a") && troi(g, "b"), pDT = tiLe(F1, doTron);
      return [+/có (\d+) loại kiểu gene/.exec(y[0])[1] === F1.size, gan(phanTram(y[1]) / 100, fSo(pDT)),
        fBang(psTrong(y[2]), fChia(tiLe(F1, (g) => g === "AaBb"), pDT)), gan(phanTram(y[3]) / 100, fSo(tiLe(F1, (g) => !troi(g, "a") && !troi(g, "b"))))]; } },
    { has: "phả hệ của một gia đình có người mắc bệnh H", right: (q) => {
      const ph = docPhaHe(q.svg, "phả hệ bệnh H"), k = kieuDiTruyen(ph); assert.deepEqual(k, ["trội, NST thường"], "chỉ một kiểu di truyền khớp phả hệ");
      const G = ganPhaHe(ph, k[0]), G2 = ganPhaHe(ph, k[0], (g) => F(g.join("") === "aa" ? 3 : 1)), y = q.o;
      const [s1, s2] = /^Người số (\d+) và người số (\d+) đều có kiểu gene dị hợp\.$/.exec(y[1]).slice(1).map(Number), [s3] = /người số (\d+) có kiểu gene đồng hợp/.exec(y[2]).slice(1).map(Number);
      const [c1, c2] = /con đầu lòng của cặp vợ chồng (\d+) – (\d+) không mắc bệnh/.exec(y[3]).slice(1).map(Number);
      const diHop = (H) => xs(H, (g) => g.get(s1).join("") === "Aa" && g.get(s2).join("") === "Aa"), dongHop = (H) => xs(H, (g) => g.get(s3).join("") === "AA");
      const lanh = (H) => fCong(F(1), fNhan(F(-1), conBenh(H, ph, c1, c2)));
      [[diHop(G), diHop(G2)], [dongHop(G), dongHop(G2)], [lanh(G), lanh(G2)]].forEach(([u, v]) => assert.ok(fBang(u, v), "kết quả không phụ thuộc tiên nghiệm"));
      return [/^Allele gây bệnh là allele trội và gene này nằm trên NST thường\.$/.test(y[0]), fBang(diHop(G), F(1)), fBang(psTrong(y[2]), dongHop(G)), fBang(psTrong(y[3]), lanh(G))]; } },
    { has: "Người ta thả 50 con thỏ lên một hòn đảo", right: (q) => {
      const N = [...q.q.matchAll(new RegExp("năm thứ (\\d+): (" + NUM + ") con", "gu"))].map((m) => ({ nam: +m[1], so: val(m[2]) })), y = q.o, lay = (k) => N.find((r) => r.nam === k).so;
      assert.deepEqual(N.map((r) => r.nam), [1, 2, 3, 4, 5, 6, 7, 8], "đủ tám năm");
      const tiSo = N.slice(1).map((r, i) => r.so / N[i].so);
      // a) chữ J: số thỏ năm sau luôn gấp nhiều lần năm trước; b) tỉ số các năm 1–4; c) số thỏ tăng thêm của hai khoảng; d) dao động quanh một giá trị
      const [b0, b1, bk] = /Từ năm thứ (\d+) đến năm thứ (\d+), sau mỗi năm số thỏ tăng hơn (\d+) lần/.exec(y[1]).slice(1).map(Number);
      const mc = /Từ đầu năm thứ (\d+) đến đầu năm thứ (\d+), số thỏ tăng thêm nhiều hơn so với từ đầu năm thứ (\d+) đến đầu năm thứ (\d+)/.exec(y[2]).slice(1).map(Number);
      const [d0] = /Từ năm thứ (\d+), số thỏ dao động quanh/.exec(y[3]).slice(1).map(Number), [dv] = so(y[3], "dao động quanh # con");
      return [/hình chữ J/.test(y[0]) && tiSo.every((r) => r > 1.5), N.filter((r) => r.nam > b0 && r.nam <= b1).every((r) => r.so / lay(r.nam - 1) > bk),
        lay(mc[1]) - lay(mc[0]) > lay(mc[3]) - lay(mc[2]), N.filter((r) => r.nam >= d0).every((r) => Math.abs(r.so - dv) <= 0.02 * dv)]; } },
    { has: "Mỗi ý sau về sinh sản ở động vật đúng hay sai?", right: (q) => traY(q, BAI_HOC.sinhSan) },
    { has: "Gene này có bao nhiêu liên kết hydrogen", right: (q) => { const [N] = so(q.q, "có # nucleotide"), [g] = so(q.q, "loại G chiếm #%"); const G = (N * g) / 100, A = N / 2 - G; return LK_H.A * A + LK_H.G * G; } },
    { has: "có bao nhiêu chromatid", right: (q) => 2 * so(q.q, "2n = #")[0] },
    { has: "tỉ lệ cây có kiểu gene aabbdd", right: (q) => { const [, a] = /Cho hai cây cùng có kiểu gene (\w+) giao phấn/.exec(q.q); return fSo(tiLe(lai(a, a), (g) => g === "aabbdd")) * 100; } },
    { has: "cây mang kiểu gene dị hợp Aa", right: (q) => { const [N] = so(q.q, "gồm # cây"), [qa] = so(q.q, "tần số allele a bằng #"); return 2 * (1 - qa) * qa * N; } },
    { has: "Độ phong phú của loài X", right: (q) => { const [T, x] = so(q.q, "đếm được # cá thể thực vật, trong đó loài cỏ X có # cá thể"); return (x / T) * 100; } },
    { has: "Trong chuỗi thức ăn cỏ → thỏ → cáo", right: (q) => { const [h21, h32] = so(q.q, "hiệu suất sinh thái của thỏ so với cỏ là #%, của cáo so với thỏ là #%"), [e3] = so(q.q, "cáo tích luỹ được # kcal");
      return e3 / (h32 / 100) / (h21 / 100); } }
  ],
  "sinhhoc12-tn-de5": [
    { has: "enzyme DNA polymerase kéo dài mạch mới theo chiều nào", right: () => BAI_HOC_2.chieu53 },
    { has: "(proto-oncogene)", right: () => BAI_HOC_2.oncogene },
    { has: "đưa gene cần chuyển vào loại tế bào nào", right: () => BAI_HOC_2.trungThuTinh },
    { has: "khi tế bào nguyên phân đến kì giữa, vì ở kì này", right: () => BAI_HOC_2.kiGiua },
    { has: "chỉ có allele trội A hoặc chỉ có allele trội B cho hoa vàng", right: (q) => {
      // A_B_ tím, A_bb và aaB_ vàng, aabb trắng: tỉ lệ kiểu hình tính từ phép lai ghi trong đề
      const [, a, b] = /Cho cây (\w+) giao phấn với cây (\w+)\./.exec(q.q);
      return tiSoKH(lai(a, b), (g) => (troi(g, "a") && troi(g, "b") ? "tím" : troi(g, "a") || troi(g, "b") ? "vàng" : "trắng"), ["tím", "vàng", "trắng"]); } },
    { has: "thường gặp ở nam nhiều hơn ở nữ", right: () => BAI_HOC_2.namX },
    { has: "loại giao tử mang cả hai allele trội A và B", right: (q) => { const [f] = so(q.q, "của chúng, là #%"), gt = giaoTu("Ab/aB", f / 100); assert.ok(/một chiếc chứa Ab, chiếc kia chứa aB/.test(q.q));
      return motCai(q, (o) => gan(phanTram(o) / 100, gt.AB)); } },
    { has: "Bệnh hồng cầu hình liềm ở người phát sinh do", right: () => BAI_HOC_2.hongCau },
    { has: "Trình tự DNA ti thể thường được dùng", right: () => BAI_HOC_2.dnaTiThe },
    { has: "tần số allele A ở giới đực là", right: (q) => { const [pd, pc] = so(q.q, "tần số allele A ở giới đực là #, ở giới cái là #");
      return motCai(q, (o) => gan(val(o), pd * (1 - pc) + (1 - pd) * pc)); } },
    { has: "có cùng chức năng nhưng khác nguồn gốc (cơ quan tương tự)", right: (q) => motCai(q, (o) => { assert.ok(o in CO_QUAN, "chưa có " + o); return CO_QUAN[o] === "tương tự"; }) },
    { has: "chọn lọc tự nhiên chống lại kiểu hình do allele trội quy định", right: () => BAI_HOC_2.alleleLanAn },
    { has: "nhân tố nào sau đây là nhân tố vô sinh", right: (q) => motCai(q, (o) => { assert.ok(o in VO_SINH, "chưa có " + o); return VO_SINH[o]; }) },
    { has: "(đường cong tăng trưởng hình chữ J)", right: () => BAI_HOC_2.chuJ },
    { has: "các loài cây xếp thành nhiều tầng", right: () => BAI_HOC_2.phanTang },
    { has: "khai thác nguồn cá tự nhiên ở một hồ lớn", right: () => BAI_HOC_2.khaiThacCa },
    { has: "duy trì tốc độ chuyển hoá bình thường", right: () => BAI_HOC_2.thyroxine },
    { has: "Để bảo quản thóc, ngô được lâu", right: () => BAI_HOC_2.baoQuan },
    { has: "thụ phấn cho cây AaBbDd bằng hạt phấn của cây aaBbdd", right: (q) => {
      const [, a, b] = /thụ phấn cho cây (\w+) bằng hạt phấn của cây (\w+)\./.exec(q.q), F1 = lai(a, b), y = q.o;
      assert.ok(/A \(cây cao\) – a \(cây lùn\); B \(hoa kép\) – b \(hoa đơn\); D \(lá có lông\) – d \(lá nhẵn\)/.test(q.q));
      const kh = (g) => ["a", "b", "d"].map((x) => troi(g, x)).join(), dongHop = (g) => capGene(g).every(([u, v]) => u === v);
      const thapKepNhan = (g) => !troi(g, "a") && troi(g, "b") && !troi(g, "d");
      const [kg, khs] = /có (\d+) loại kiểu gene và (\d+) loại kiểu hình/.exec(y[0]).slice(1).map(Number);
      return [kg === F1.size && khs === new Set([...F1.keys()].map(kh)).size, fBang(psTrong(y[1]), tiLe(F1, (g) => troi(g, "a") && troi(g, "b") && troi(g, "d"))),
        fBang(psTrong(y[2]), tiLe(F1, dongHop)), fBang(psTrong(y[3]), fChia(tiLe(F1, (g) => thapKepNhan(g) && !dongHop(g)), tiLe(F1, thapKepNhan)))]; } },
    { has: "phả hệ của một gia đình có người mắc bệnh P", right: (q) => {
      const ph = docPhaHe(q.svg, "phả hệ bệnh P"), k = kieuDiTruyen(ph); assert.deepEqual(k, ["lặn, NST thường"], "chỉ một kiểu di truyền khớp phả hệ");
      const G = ganPhaHe(ph, k[0]), G2 = ganPhaHe(ph, k[0], (g) => F(g.join("") === "AA" ? 3 : 1)), y = q.o;
      const [s7] = /^Xác suất người số (\d+) mang allele gây bệnh/.exec(y[2]).slice(1).map(Number), [c1, c2] = /cặp vợ chồng (\d+) – (\d+) sinh con trai đầu lòng không mắc bệnh/.exec(y[3]).slice(1).map(Number);
      const mang = (H) => xs(H, (g) => g.get(s7).includes("a")), traiLanh = (H) => conGioi(H, ph, c1, c2, "nam", false);
      [[mang(G), mang(G2)], [traiLanh(G), traiLanh(G2)]].forEach(([u, v]) => assert.ok(fBang(u, v), "kết quả không phụ thuộc tiên nghiệm"));
      return [/^Gene gây bệnh P nằm trên NST thường, allele gây bệnh là allele lặn\.$/.test(y[0]), +/có (\d+) người biết được kiểu gene chắc chắn/.exec(y[1])[1] === chacChan(G, ph),
        fBang(psTrong(y[2]), mang(G)), fBang(psTrong(y[3]), traiLanh(G))]; } },
    { has: "Người ta nuôi thử ba loài giáp xác P, Q, R", right: (q) => {
      const L = {}; [...q.q.matchAll(/loài (P|Q|R): giới hạn sinh thái (\d+)‰ – (\d+)‰, khoảng thuận lợi (\d+)‰ – (\d+)‰/g)].forEach((m) => (L[m[1]] = { a: +m[2], b: +m[3], c: +m[4], d: +m[5] }));
      assert.deepEqual(Object.keys(L), ["P", "Q", "R"]); Object.values(L).forEach((v) => assert.ok(v.a <= v.c && v.c < v.d && v.d <= v.b, "khoảng thuận lợi nằm trong giới hạn sinh thái"));
      const rong = (k) => L[k].b - L[k].a, song = (k, x) => x >= L[k].a && x <= L[k].b, tot = (k, x) => x >= L[k].c && x <= L[k].d, y = q.o;
      const [k0] = /^Loài (\w) có giới hạn sinh thái về độ mặn rộng nhất/.exec(y[0]).slice(1);
      const m1 = /từ (\d+)‰ đến (\d+)‰ trong năm, chỉ có loài (\w) sống được quanh năm/.exec(y[1]), m2 = /^Ở độ mặn (\d+)‰, cả loài (\w) và loài (\w) đều sinh trưởng, phát triển tốt nhất/.exec(y[2]);
      const m3 = /^Ở độ mặn (\d+)‰, loài (\w) đang ở khoảng thuận lợi/.exec(y[3]);
      return [Object.keys(L).every((k) => k === k0 || rong(k) < rong(k0)), Object.keys(L).filter((k) => song(k, +m1[1]) && song(k, +m1[2])).join() === m1[3],
        tot(m2[2], +m2[1]) && tot(m2[3], +m2[1]), tot(m3[2], +m3[1])]; } },
    { has: "Xét một số ví dụ về học tập ở động vật.", right: (q) => traY(q, BAI_HOC_2.hocTap) },
    { has: "Một gene ở vi khuẩn dài", right: (q) => { const [L] = so(q.q, "dài # nm"), [d] = so(q.q, "mỗi cặp nucleotide dài # nm"); return (2 * L) / d; } },
    { has: "trội cả bốn tính trạng", right: (q) => { const [, a, b] = /phép lai (\w+) × (\w+),/.exec(q.q);
      return fSo(tiLe(lai(a, b), (g) => ["a", "b", "d", "e"].every((x) => troi(g, x)))) * 100; } },
    { has: "Một cây thể ba (2n + 1) thuộc loài có bộ NST", right: (q) => 2 * (so(q.q, "2n = #")[0] + 1) },
    { has: "Nếu ruộng này chỉ tự thụ phấn qua", right: (q) => { const [x, y, z] = so(q.q, "ruộng có #% cây AA, #% cây Aa và #% cây aa"), [n] = so(q.q, "tự thụ phấn qua # thế hệ");
      assert.ok(gan(x + y + z, 100)); return tuThu(x, y, z, n).aa; } },
    { has: "quần thể cò trắng", right: (q) => { const [N] = so(q.q, "có # cá thể. Trong năm"), [B] = so(q.q, "có # cá thể con được sinh ra"); return (B / N) * 100; } },
    { has: "cây → sâu ăn lá → chim sâu → chim cắt", right: (q) => { const [h1] = so(q.q, "ở chim sâu bằng #%"), [h2] = so(q.q, "năng lượng bằng #% của chim sâu");
      assert.ok(/bằng bao nhiêu phần trăm năng lượng tích luỹ ở sâu ăn lá/.test(q.q)); return (h1 * h2) / 100; } }
  ],
  "sinhhoc12-tn-de6": [
    { has: "kết hợp với protein tạo nên ribosome", right: () => BAI_HOC_2.rRNA },
    { has: "đã biểu hiện kiểu hình khác thường. Sinh vật này được gọi là", right: () => BAI_HOC_2.theDotBien },
    { has: "Insulin dùng để chữa bệnh tiểu đường", right: () => BAI_HOC_2.insulin },
    { has: "(vùng nguyên nhiễm sắc)", right: () => BAI_HOC_2.nguyenNhiemSac },
    { has: "Một điểm mới trong cách nghiên cứu của Mendel", right: () => BAI_HOC_2.mendelMoi },
    { has: "một hợp tử phát triển thành nam", right: () => BAI_HOC_2.sry },
    { has: "hai lớp nhiều nhất, mỗi lớp chiếm", right: (q) => { const [k] = so(q.q, "mỗi lớp chiếm #%");
      assert.ok(/^Lai phân tích một cây F1 mang hai cặp gene dị hợp liên kết không hoàn toàn/.test(q.q)); return motCai(q, (o) => gan(phanTram(o), 100 - 2 * k)); } },
    { has: "bộ NST lưỡng bội của loài A và bộ NST lưỡng bội của loài B", right: () => BAI_HOC_2.khacNguon },
    { has: "người vợ có anh trai mắc một bệnh di truyền hiếm gặp", right: () => BAI_HOC_2.tuVan },
    { has: "nếu coi năng suất thu được là kiểu hình", right: () => BAI_HOC_2.giong },
    { has: "Một giống đậu tự thụ phấn nghiêm ngặt", right: (q) => {
      const [x, y] = so(q.q, "gồm #% cây hoa đỏ thuần chủng (AA) và #% cây hoa đỏ dị hợp (Aa)"), [n] = so(q.q, "Sau # thế hệ"); assert.ok(gan(x + y, 100));
      const t = tuThu(x, y, 0, n); return motCai(q, (o) => gan(phanTram(o), t.AA + t.Aa)); } },
    { has: "các loài thuộc chi Homo có đặc điểm nào", right: () => BAI_HOC_2.homo },
    { has: "Một quần thể sẽ có kiểu phân bố ngẫu nhiên khi", right: () => BAI_HOC_2.ngauNhien },
    { has: "sống nhờ phân giải xác sinh vật", right: () => BAI_HOC_2.phanGiai },
    { has: "Nguyên nhân bên trong gây ra diễn thế sinh thái", right: () => BAI_HOC_2.dienTheTrong },
    { has: "Việc làm nào sau đây của học sinh góp phần vào phát triển bền vững", right: () => BAI_HOC_2.rac },
    { has: "lá cây xấu hổ (trinh nữ)", right: () => BAI_HOC_2.trinhNu },
    { has: "Nuôi cấy mô tế bào thực vật được dùng nhiều", right: () => BAI_HOC_2.nuoiCayMo },
    { has: "màu lông hình thành qua một con đường chuyển hoá", right: (q) => {
      // aa: không có enzyme đầu tiên nên trắng; A_bb nâu; A_B_ đen
      assert.ok(/allele A mã hoá enzyme biến chất tiền thân không màu thành sắc tố nâu; allele B mã hoá enzyme biến sắc tố nâu thành sắc tố đen/.test(q.q));
      const ten = (g) => (troi(g, "a") ? (troi(g, "b") ? "lông đen" : "lông nâu") : "lông trắng"), K = ["lông đen", "lông nâu", "lông trắng"], F2 = lai("AaBb", "AaBb"), y = q.o;
      const tiSo = (s) => { const m = /(\d+) lông đen : (\d+) lông nâu : (\d+) lông trắng/.exec(s); return m[1] + " lông đen : " + m[2] + " lông nâu : " + m[3] + " lông trắng"; };
      const den = tiLe(F2, (g) => ten(g) === "lông đen");
      return [tiSo(y[0]) === tiSoKH(F2, ten, K), gan(phanTram(y[1]) / 100, fSo(tiLe(F2, (g) => ten(g) === "lông trắng"))),
        fBang(psTrong(y[2]), fChia(tiLe(F2, (g) => g === "AABB"), den)), /aabb/.test(y[3]) && tiSo(y[3]) === tiSoKH(lai("AaBb", "aabb"), ten, K)]; } },
    { has: "bệnh bạch tạng do allele lặn a quy định", right: (q) => {
      const [N, k] = so(q.q, "cứ # người thì có # người bị bạch tạng"), r = Math.sqrt(N / k); assert.ok(Number.isInteger(r) && /cân bằng di truyền/.test(q.q));
      const qa = F(1, r), pA = fTru(F(1), qa), Aa = fNhan(F(2), fNhan(pA, qa)), AA = fNhan(pA, pA), y = q.o;
      return [gan(so(y[0], "là #")[0], fSo(qa)), Math.abs(phanTram(y[1]) - fSo(Aa) * 100) < 0.05, fBang(psTrong(y[2]), fChia(Aa, fCong(AA, Aa))),
        /kết hôn với người có họ hàng gần thì số trẻ bị bạch tạng sinh ra có xu hướng tăng/.test(y[3])]; } },
    { has: "vi khuẩn sống trong nốt sần ở rễ cây đậu tương", right: (q) => {
      const [m1, m2] = so(q.q, "ở lô 1 nặng trung bình # g (khối lượng khô), ở lô 2 là # g"), y = q.o; assert.ok(/gấp hơn/.test(y[1])); const [k] = so(y[1], "gấp hơn # lần");
      const r = q.o.map(() => undefined); Object.entries(BAI_HOC_2.notSan).forEach(([has, v]) => (r[yCo(q, has)] = v)); r[1] = m2 / m1 > k;
      assert.ok(r.every((v) => typeof v === "boolean")); return r; } },
    { has: "Xét hệ tuần hoàn của người.", right: (q) => traY(q, BAI_HOC_2.tuanHoan) },
    { has: "được phiên mã 5 lần", right: (q) => so(q.q, "có # cặp nucleotide")[0] * so(q.q, "được phiên mã # lần")[0] },
    { has: "số loại giao tử nhiều nhất mà cơ thể đó", right: (q) => soGiaoTu(/kiểu gene (\w+),/.exec(q.q)[1]) },
    { has: "dạng thể một kép (2n − 1 − 1)", right: (q) => { const n = so(q.q, "2n = #")[0] / 2; return (n * (n - 1)) / 2; } },
    { has: "tỉ lệ cây dị hợp Aa trong quần thể", right: (q) => { const [x, y, z] = so(q.q, "có #% cây AA, #% cây Aa và #% cây aa");
      assert.ok(gan(x + y + z, 100)); const p = (x + y / 2) / 100; return 2 * p * (1 - p) * 100; } },
    { has: "quần thể gà rừng", right: (q) => { const [N, a] = so(q.q, "có # con trưởng thành, trong đó có # con trống"); return (N - a) / a; } },
    { has: "thực vật đồng hoá được", right: (q) => { const [E] = so(q.q, "đồng hoá được # kcal"), [h] = so(q.q, "#% số năng lượng này bị tiêu hao qua hô hấp"),
      [k] = so(q.q, "bằng #% năng lượng tích luỹ ở thực vật"); return ((E * (100 - h)) / 100) * (k / 100); } }
  ],
  "sinhhoc12-tn-de7": [
    { has: "nhiều ribosome cùng tham gia dịch mã (polyribosome)", right: () => BAI_HOC_2.polyribosome },
    { has: "Hai dòng đậu thuần chủng đều có hoa trắng", right: () => {
      assert.ok([...lai("aaBB", "AAbb").keys()].every((g) => troi(g, "a") && troi(g, "b")), "hai gene khác nhau: F1 có đủ allele bình thường của cả hai gene");
      assert.ok([...lai("aa", "aa").keys()].every((g) => !troi(g, "a")), "cùng một gene: F1 vẫn hỏng gene đó"); return BAI_HOC_2.haiGene; } },
    { has: "Sinh vật nào sau đây là sinh vật biến đổi gene", right: () => BAI_HOC_2.bienDoiGene },
    { has: "Một phụ nữ bị mù màu đỏ – lục lấy một người chồng nhìn màu bình thường", right: (q) => {
      const me = kgX("XᵃXᵃ"), traiBenh = F(me.filter((x) => x === "a").length, me.length), ten = { "đều bị": F(1), "đều nhìn màu bình thường": F(0), "một nửa": F(1, 2), "một phần tư": F(1, 4) };
      return motCai(q, (o) => { const k = Object.keys(ten).filter((x) => o.includes(x)); assert.equal(k.length, 1, "lựa chọn lạ " + o); return fBang(ten[k[0]], traiBenh); }); } },
    { has: "Một cây Ab/aB được lai phân tích", right: (q) => { const [f] = so(q.q, "với tần số #%"), gt = giaoTu("Ab/aB", f / 100);
      assert.ok(/tỉ lệ cây thân cao, hoa đỏ ở đời con là$/.test(q.q)); return motCai(q, (o) => gan(phanTram(o), gt.AB * 100)); } },
    { has: "trường hợp nào sau đây phát sinh do đột biến gene", right: (q) => motCai(q, (o) => { assert.ok(o in NGUYEN_NHAN, "chưa có " + o); return NGUYEN_NHAN[o] === "gene"; }) },
    { has: "các cành có lá khảm xanh – trắng", right: () => BAI_HOC_2.khamLa },
    { has: "Hoá thạch Archaeopteryx", right: () => BAI_HOC_2.archaeopteryx },
    { has: "Darwin chưa giải thích được điều nào", right: () => BAI_HOC_2.darwinChua },
    { has: "bắt đầu chuyển từ nước lên sống trên cạn ở đại nào", right: () => BAI_HOC_2.lenCan },
    { has: "phân bố thành từng vành đai từ vùng ven bờ ra vùng khơi xa", right: () => BAI_HOC_2.chieuNgang },
    { has: "đều là sinh vật tiêu thụ", right: (q) => motCai(q, (o) => o.split(", ").every((x) => { const k = x.toLowerCase(); assert.ok(k in VAI_HST, "chưa có " + x); return VAI_HST[k] === "tiêu thụ"; })) },
    { has: "Diễn thế trên đồi đất diễn ra nhanh hơn", right: () => BAI_HOC_2.dienTheNhanh },
    { has: "thường có nhiều loài sinh vật nhất", right: () => BAI_HOC_2.rungMua },
    { has: "vào Sách Đỏ Việt Nam có ý nghĩa", right: () => BAI_HOC_2.sachDo },
    { has: "tăng sử dụng năng lượng tái tạo", right: () => BAI_HOC_2.taiTao },
    { has: "phát triển qua biến thái hoàn toàn", right: (q) => motCai(q, (o) => { assert.ok(o in BIEN_THAI, "chưa có " + o); return BIEN_THAI[o] === "hoàn toàn"; }) },
    { has: "ngọn cây cong về phía cửa sổ", right: () => BAI_HOC_2.huongSang },
    { has: "kiểu gene AA cho hoa đỏ, Aa cho hoa hồng, aa cho hoa trắng", right: (q) => {
      // A, a trội không hoàn toàn (đỏ, hồng, trắng); B trội hoàn toàn
      assert.ok(/allele B \(thân cao\) trội hoàn toàn so với allele b \(thân thấp\)/.test(q.q) && /giao phấn hai cây có cùng kiểu gene AaBb/.test(q.q));
      const F1 = lai("AaBb", "AaBb"), mau = (g) => ({ AA: "đỏ", Aa: "hồng", aa: "trắng" })[g.slice(0, 2)], cao = (g) => troi(g, "b"), y = q.o;
      const [nKH] = so(y[0], "F1 có # loại kiểu hình"), kh = new Set([...F1.keys()].map((g) => mau(g) + cao(g)));
      return [nKH === kh.size, fBang(psTrong(y[1]), tiLe(F1, (g) => mau(g) === "đỏ" && cao(g))), fBang(psTrong(y[2]), tiLe(F1, (g) => mau(g) === "hồng" && !cao(g))),
        fBang(psTrong(y[3]), fChia(tiLe(F1, (g) => g === "AaBB"), tiLe(F1, (g) => mau(g) === "hồng" && cao(g))))]; } },
    { has: "phả hệ của một gia đình có người mắc bệnh K", right: (q) => {
      const ph = docPhaHe(q.svg, "phả hệ bệnh K"), k = kieuDiTruyen(ph); assert.deepEqual(k, ["trội, NST thường"], "chỉ một kiểu di truyền khớp phả hệ");
      const G = ganPhaHe(ph, k[0]), G2 = ganPhaHe(ph, k[0], (g) => F(g.join("") === "AA" ? 3 : 1)), y = q.o;
      const [n0] = so(y[1], "Trong # người của phả hệ"), [nc] = so(y[1], "có đúng # người biết được chắc chắn kiểu gene"), [s6] = so(y[2], "Người số # có xác suất");
      const [c1, c2] = /người số (\d+) lấy người số (\d+) thì xác suất con đầu lòng của họ không mắc bệnh/.exec(y[3]).slice(1).map(Number);
      const dongHop = (H) => xs(H, (g) => g.get(s6).join("") === "AA"), lanh = (H) => fTru(F(1), conBenh(H, ph, c1, c2));
      [[dongHop(G), dongHop(G2)], [lanh(G), lanh(G2)]].forEach(([u, v]) => assert.ok(fBang(u, v), "kết quả không phụ thuộc tiên nghiệm"));
      assert.equal(n0, ph.nguoi.length, "số người của phả hệ");
      return [/^Allele gây bệnh K là allele trội, gene này nằm trên NST thường\.$/.test(y[0]), nc === chacChan(G, ph), fBang(psTrong(y[2]), dongHop(G)), fBang(psTrong(y[3]), lanh(G))]; } },
    { has: "ảnh hưởng của ánh sáng, người ta trồng cây con của hai loài X và Y", right: (q) => {
      const muc = so(q.q, "ở ba mức chiếu sáng: #%, #% và #% ánh sáng tự nhiên"), X = so(q.q, "loài X: # g, # g, # g"), Y = so(q.q, "loài Y: # g, # g, # g"), y = q.o;
      const tot = (v) => muc[v.indexOf(Math.max(...v))], thap = muc.indexOf(Math.min(...muc));
      assert.ok(/^Loài X là cây ưa bóng\.$/.test(y[0]) && /^Loài Y sinh trưởng tốt nhất khi được chiếu sáng hoàn toàn \(100%\)\.$/.test(y[2]) && /^Nên chọn loài X để trồng dưới tán/.test(y[3]));
      const [m1] = so(y[1], "Ở mức #% ánh sáng"), [k] = so(y[1], "gấp hơn # lần"), i = muc.indexOf(m1); assert.ok(i >= 0 && /của loài Y gấp hơn \d+ lần loài X\.$/.test(y[1]));
      return [tot(X) !== 100, Y[i] / X[i] > k, tot(Y) === 100, X[thap] > Y[thap]]; } },
    { has: "Xét hoạt động bài tiết của thận ở người.", right: (q) => traY(q, BAI_HOC_2.than) },
    { has: "bao nhiêu phân tử không còn ¹⁵N", right: (q) => { const [k] = so(q.q, "phân đôi liên tiếp # lần"); return 2 ** k - 2; } },
    { has: "Ở phép lai AaBbDdEe × AaBbDdEe", right: (q) => { assert.ok(/số loại kiểu gene nhiều nhất ở đời con/.test(q.q)); return lai("AaBbDdEe", "AaBbDdEe").size; } },
    { has: "thể không (2n − 2)", right: (q) => so(q.q, "2n = #")[0] - 2 },
    { has: "thành phần kiểu gene 0,5 AA", right: (q) => { const [x, y, z] = so(q.q, "thành phần kiểu gene # AA : # Aa : # aa"), [N] = so(q.q, "F1 gồm # cây");
      assert.ok(gan(x + y + z, 1)); const p = x + y / 2; return 2 * p * (1 - p) * N; } },
    { has: "Một đàn cò có", right: (q) => { const [N] = so(q.q, "Một đàn cò có # con"), [s] = so(q.q, "tỉ lệ sinh là #%"), [m] = so(q.q, "tỉ lệ tử vong là #%"), [n] = so(q.q, "sau # năm");
      return N * (1 + (s - m) / 100) ** n; } },
    { has: "Năng lượng tích luỹ ở đại bàng chỉ bằng mấy phần trăm", right: (q) => { const e = so(q.q, "lần lượt là # kcal, # kcal, # kcal và # kcal"); return (e[3] / e[0]) * 100; } }
  ]
};

/* ---------- đề và danh mục: số đề, số câu lấy từ danh mục ---------- */
const soDe = (id) => +/de(\d+)$/.exec(id)[1];
const DE = BANKS.filter((b) => /^sinhhoc12-tn-de\d+$/.test(b.id)).sort((a, b) => soDe(a.id) - soDe(b.id));
assert.ok(DE.length >= 1, "chưa có đề Sinh học thi thử tốt nghiệp nào trong danh mục");
DE.forEach((b, i) => assert.equal(b.id, "sinhhoc12-tn-de" + (i + 1), "mã đề phải liên tiếp từ sinhhoc12-tn-de1"));
const TN = EVENTS.find((e) => e.id === "tn-thpt-2027");
const P1 = "Phần I. Trắc nghiệm nhiều lựa chọn", P2 = "Phần II. Trắc nghiệm đúng sai", P3 = "Phần III. Trả lời ngắn";
const KHUNG = [[P1, "mc", 18, 0.25], [P2, "tf4", 4, 1], [P3, "num", 6, 0.25]];
// chủ đề lớp 12: đúng chữ chủ đề của ba kho Sinh học 12 (cuối kì I, giữa kì II, cuối năm); thứ tự theo bài của sách, chương theo mục lục
const KHO = BANKS.filter((b) => b.file === "12-sinhhoc.js" && b.pool), CD12 = new Set(KHO.flatMap((b) => Object.keys(b.pool.matrix)));
const CHUONG = [["Di truyền phân tử", ["DNA và cơ chế tái bản DNA", "Gene, hệ gene và quá trình truyền đạt thông tin di truyền", "Điều hoà biểu hiện gene", "Đột biến gene", "Công nghệ gene"]],
  ["Di truyền nhiễm sắc thể", ["Cấu trúc và chức năng của nhiễm sắc thể", "Học thuyết di truyền Mendel", "Mở rộng học thuyết Mendel", "Di truyền giới tính và di truyền liên kết với giới tính",
    "Liên kết gene và hoán vị gene", "Đột biến nhiễm sắc thể", "Di truyền học người và di truyền y học"]],
  ["Mở rộng học thuyết di truyền nhiễm sắc thể", ["Di truyền gene ngoài nhân", "Tương tác giữa kiểu gene với môi trường, thành tựu chọn giống"]],
  ["Di truyền quần thể", ["Di truyền học quần thể"]],
  ["Bằng chứng và các học thuyết tiến hoá", ["Các bằng chứng tiến hoá", "Quan niệm của Darwin về chọn lọc tự nhiên và hình thành loài", "Học thuyết tiến hoá tổng hợp hiện đại", "Tiến hoá lớn và quá trình phát sinh chủng loại"]],
  ["Môi trường và sinh thái học quần thể", ["Môi trường và các nhân tố sinh thái", "Sinh thái học quần thể"]],
  ["Sinh thái học quần xã", ["Quần xã sinh vật", "Hệ sinh thái", "Trao đổi vật chất và chuyển hoá năng lượng trong hệ sinh thái", "Diễn thế sinh thái", "Sinh quyển, khu sinh học và chu trình sinh – địa – hoá"]],
  ["Sinh thái học phục hồi, bảo tồn và phát triển bền vững", ["Sinh thái học phục hồi và bảo tồn đa dạng sinh vật", "Phát triển bền vững"]]];
const BAI = CHUONG.flatMap(([, ts]) => ts), chuong = (t) => CHUONG.findIndex(([, ts]) => ts.includes(t));
assert.deepEqual([...CD12].sort(), [...BAI].sort(), "chủ đề của ba kho Sinh học 12 đúng các bài của tám chương");
// câu lớp 11: “Lớp 11 · ” và tên chương trong mục lục của Sinh học 11 (README của cuốn ở OnUp-Book); không có câu lớp 10
const CHUONG_11 = ["Trao đổi chất và chuyển hoá năng lượng ở sinh vật", "Cảm ứng ở sinh vật", "Sinh trưởng và phát triển ở sinh vật", "Sinh sản ở sinh vật",
  "Mối quan hệ giữa các quá trình sinh lí trong cơ thể sinh vật và một số ngành nghề liên quan đến sinh học cơ thể"];
const lop = (t) => (CD12.has(t) ? 12 : /^Lớp 11 · /.test(t) && CHUONG_11.includes(t.slice(9)) ? 11 : 0);
const soY = (q) => (q.type === "tf4" ? 4 : 1);
const dinhDang = (a) => (a < 0 ? "−" : "") + String(Math.abs(a)).replace(".", ",");
const dpOf = (b, q) => (q.p && b.passages && b.passages[q.p] ? b.passages[q.p].text : "");

/* ---------- chạy kiểm tra từng câu ---------- */
let n = 0;
const dung = new Set();
DE.forEach((b) => {
  const CK = RIENG[b.id]; assert.ok(CK, b.id + ": chưa có các mục kiểm tra của đề ở RIENG"); assert.equal(b.questions.length, b.n, b.id + ": số câu khác danh mục");
  b.questions.forEach((q, i) => {
    const at = b.id + "#" + (i + 1), cs_ = CK.filter((c) => q.q.includes(c.has)), dai_ = Math.max(...cs_.map((c) => c.has.length)), ch = cs_.filter((c) => c.has.length === dai_);
    assert.equal(ch.length, 1, at + ": cần đúng một mục kiểm tra cho “" + q.q.slice(0, 60) + "…”, có " + ch.length);
    const c = ch[0]; assert.ok(!dung.has(c), at + ": hai câu cùng khớp “" + c.has + "”"); dung.add(c);
    try {
      const want = c.right(q, dpOf(b, q));
      if (q.type === "num") {
        assert.equal(typeof q.ans, "number", "đáp án Phần III ghi bằng số");
        const lt = /[Ll]àm tròn kết quả đến hàng (đơn vị|phần mười|phần trăm)/.exec(q.q);
        if (lt) {
          const k = { "đơn vị": 0, "phần mười": 1, "phần trăm": 2 }[lt[1]];
          assert.ok(q.tol === 10 ** -k / 2, "tol phải bằng nửa đơn vị làm tròn: " + q.tol);
          assert.ok(Math.abs(q.ans - lamTron(want, k)) < 1e-9, "đáp án " + q.ans + ", tính được " + want + " ≈ " + lamTron(want, k));
          assert.ok(!gan(want, lamTron(want, k), 1e-12), "đáp án tính được đã tròn, không cần dặn làm tròn: " + want);
          assert.ok(Math.abs(want - lamTron(want, k)) < 10 ** -k / 2 - 1e-9, "giá trị đúng nằm ngay giữa hai số làm tròn: " + want);
          assert.ok(q.x.includes("≈ " + vnf(lamTron(want, k), k)), "lời giải ghi “≈ " + vnf(lamTron(want, k), k) + "”");
        } else {
          assert.ok(gan(q.ans, want, 1e-9), "đáp án " + q.ans + ", tính được " + want);
          assert.ok(q.tol === undefined, "đáp án tính chính xác, không cần sai số");
        }
        assert.ok([...dinhDang(q.ans)].length <= 4, "đáp án Phần III quá 4 kí tự: " + dinhDang(q.ans));
        assert.ok(!q.unit || q.unit.length <= 5, "đơn vị ngắn");
      } else {
        const got = q.type === "tf4" ? q.a : q.o[0];
        assert.strictEqual(JSON.stringify(got), JSON.stringify(want), "đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
      }
      if (q.type === "mc") {
        assert.ok(new Set(q.o).size === 4 && q.o.length === 4, "bốn lựa chọn khác nhau");
        const L = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(q.o[0].length <= Math.max(1.2 * L, L + 8), "đáp án đúng dài hơn hẳn lựa chọn sai");
      }
      if (q.type === "tf4") assert.ok(q.o.length === 4 && q.a.includes(true) && q.a.includes(false), "đúng/sai 4 ý có cả ý đúng và ý sai");
      if (q.svg) assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại");
    } catch (e) { throw new Error(at + ": " + e.message + "\n" + e.stack.split("\n").slice(1, 3).join("\n")); }
    n++;
  });
});
assert.deepEqual(Object.keys(RIENG).sort(), DE.map((b) => b.id).sort(), "RIENG có đúng các đề thi thử của danh mục");
assert.deepEqual(Object.entries(RIENG).flatMap(([id, ck]) => ck.filter((c) => !dung.has(c)).map((c) => id + ": " + c.has)), [], "có mục kiểm tra không khớp câu nào");

/* ---------- khung đề (Quyết định 764/QĐ-BGDĐT): danh mục, phần, điểm, mức độ, phạm vi, đoạn thông tin, lời dặn ---------- */
const KIEU = {};
DE.forEach((b) => {
  const at = b.id, qs = b.questions;
  assert.deepEqual([b.title, b.grade, b.subject, b.minutes, b.pts, b.file, !!b.pool], ["Sinh học 12 · Thi thử tốt nghiệp · Đề " + soDe(b.id), 12, "Sinh học", 50, 10, "12-sinhhoc.js", false], at + ": danh mục");
  assert.ok(TN && TN.banks.includes(b.id) && TN.grades.includes(12) && TN.subjects.includes("Sinh học"), at + ": phải gắn vào tn-thpt-2027");
  let k = 0;
  KHUNG.forEach(([part, type, so_, pt]) => { const ph = qs.slice(k, k + so_); k += so_;
    assert.ok(ph.length === so_ && ph.every((q) => q.part === part && q.type === type && q.pt === pt), at + ": " + part + " gồm " + so_ + " câu " + type + ", mỗi câu " + pt + " điểm"); });
  assert.equal(k, qs.length, at + ": đề có đúng 28 câu theo khung 18 – 4 – 6");
  const G = Quiz.grade(qs, qs.map(() => null));
  assert.ok(G.max === 10 && G.got === 0, at + ": Quiz.grade: tối đa 10 điểm");
  assert.deepEqual(G.parts.map((p) => [p.part, p.max]), [[P1, 4.5], [P2, 4], [P3, 1.5]], at + ": điểm tối đa từng phần 4,5 – 4 – 1,5");
  const dem = (a, c, f) => qs.slice(a, c).filter(f).length;
  // mức độ như đề tham khảo năm 2025 (Biết 40%, Hiểu 35%, Vận dụng 25% số lệnh hỏi)
  assert.deepEqual([1, 2, 3].map((l) => dem(0, 18, (q) => q.lv === l)), [12, 5, 1], at + ": Phần I 12 Biết, 5 Hiểu, 1 Vận dụng");
  assert.deepEqual(qs.slice(18, 22).map((q) => q.lv).sort(), [1, 2, 3, 3], at + ": Phần II bốn câu ghi mức 1, 2, 3, 3");
  assert.deepEqual([1, 2, 3].map((l) => dem(22, 28, (q) => q.lv === l)), [2, 3, 1], at + ": Phần III 2 Biết, 3 Hiểu, 1 Vận dụng");
  // phạm vi: chủ đề lớp 12 đúng chữ của ba kho, lớp 11 theo tên chương; 6 trong 40 lệnh hỏi thuộc lớp 11, đúng một câu lớp 11 ở Phần II
  qs.forEach((q, i) => assert.ok(lop(q.topic), at + "#" + (i + 1) + ": chủ đề lạ “" + q.topic + "”"));
  const lenh11 = sum(qs.filter((q) => lop(q.topic) === 11).map(soY));
  assert.equal(sum(qs.map(soY)), 40, at + ": đề có 40 lệnh hỏi"); assert.equal(lenh11, 6, at + ": 6 trong 40 lệnh hỏi thuộc lớp 11 (15%)");
  assert.equal(dem(18, 22, (q) => lop(q.topic) === 11), 1, at + ": Phần II có đúng một câu lớp 11");
  // đủ tám chương của Sinh học 12; trong mỗi phần, câu lớp 12 theo thứ tự bài
  assert.deepEqual([...new Set(qs.filter((q) => lop(q.topic) === 12).map((q) => chuong(q.topic)))].sort(), [0, 1, 2, 3, 4, 5, 6, 7], at + ": đủ tám chương của Sinh học 12");
  [[0, 18], [18, 22], [22, 28]].forEach(([a, c]) => { const ch = qs.slice(a, c).filter((q) => lop(q.topic) === 12).map((q) => BAI.indexOf(q.topic));
    ch.forEach((v, i) => i && assert.ok(v >= ch[i - 1], at + ": câu lớp 12 theo thứ tự bài trong từng phần")); });
  // Phần II có câu về thí nghiệm, bảng số liệu, phép lai hoặc phả hệ
  assert.ok(qs.slice(18, 22).filter((q) => /thí nghiệm|phả hệ|giao phấn|giao phối|lai phân tích|tự thụ phấn|gieo|đo|bảng/.test(q.q)).length >= 2, at + ": Phần II có câu về thí nghiệm, phép lai, phả hệ");
  // đoạn thông tin dùng chung: chỉ ở Phần I, nhiều nhất một cặp câu liền nhau
  const ps = Object.keys(b.passages || {});
  ps.forEach((p) => { const idx = qs.map((q, i) => (q.p === p ? i : -1)).filter((i) => i >= 0); assert.ok(idx.length === 2 && idx[1] === idx[0] + 1 && idx[1] < 18, at + ": đoạn " + p + " dùng cho đúng hai câu liền nhau ở Phần I");
    assert.ok(b.passages[p].title && b.passages[p].text && !/câu \d/i.test(b.passages[p].title + b.passages[p].text), at + ": đoạn " + p + " có tên, có chữ, không ghi số câu (đề “Ôn chủ đề” rút câu với số khác)"); });
  assert.ok(ps.length <= 1 && qs.every((q) => !q.p || ps.includes(q.p)), at + ": nhiều nhất một đoạn thông tin dùng chung");
  // lời dặn: số câu, số điểm, số câu mỗi lớp tính từ dữ liệu
  const c12 = dem(0, 28, (q) => lop(q.topic) === 12), c11 = dem(0, 28, (q) => lop(q.topic) === 11);
  ["Quyết định 764/QĐ-BGDĐT", "thí điểm thi trên máy tính", `đề có ${c12} câu Sinh học 12 và ${c11} câu Sinh học 11 (${lenh11} trong 40 lệnh hỏi)`, "không có câu lớp 10",
    `Đề có ${qs.length} câu, làm trong ${b.minutes} phút`, "Phần I gồm 18 câu nhiều lựa chọn (4,5 điểm, mỗi câu 0,25 điểm)", "Phần II gồm 4 câu đúng/sai, mỗi câu 4 ý (4 điểm)",
    "Phần III gồm 6 câu trả lời ngắn (1,5 điểm, mỗi câu 0,25 điểm)", "không quá 4 kí tự", "Đề không có câu tự chấm", "đề tham khảo năm 2025 và đề chính thức năm 2026"]
    .forEach((s) => assert.ok(b.note.includes(s), at + ": lời dặn thiếu “" + s + "”"));
  // đúng/sai 4 ý: trong một đề không lặp kiểu Đ/S
  const kieu = qs.filter((q) => q.type === "tf4").map((q) => q.a.map((a) => (a ? "Đ" : "S")).join(""));
  assert.equal(new Set(kieu).size, kieu.length, at + ": kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + kieu.join(", "));
  kieu.forEach((x) => (KIEU[x] = (KIEU[x] || 0) + 1));
  // đáp án đúng là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba và không dưới một phần sáu số câu nhiều lựa chọn của đề
  const mc = qs.filter((q) => q.type === "mc"), hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
  const dai2 = mc.filter((q) => hon(q, (a, c) => a > c)).length, ngan = mc.filter((q) => hon(q, (a, c) => a < c)).length;
  assert.ok(dai2 * 3 <= mc.length && ngan * 3 <= mc.length && (dai2 + ngan) * 6 >= mc.length, at + `: đáp án đúng dài nhất ở ${dai2}, ngắn nhất ở ${ngan} trong ${mc.length} câu`);
  b._le = dai2 + ngan;
  // lời giải không nhắc vị trí của phương án (app xáo phương án)
  qs.forEach((q) => assert.ok(!/(phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x + " " + (q.o || []).join(" ")), at + ": nhắc vị trí của phương án: " + q.q.slice(0, 50)));
});
assert.ok(Object.values(KIEU).every((c) => c <= 3), "một kiểu Đ/S dùng quá ba lần trong các đề thi thử: " + JSON.stringify(KIEU));
// câu nhiều lựa chọn: đáp án đúng không là lựa chọn duy nhất có chữ của nhãn chủ đề; ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có
{
  const chuThuong = (s) => String(s).normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean), loi = [];
  DE.forEach((b) => b.questions.forEach((q, i) => {
    if (q.type !== "mc") return;
    const at = b.id + "#" + (i + 1), c = chuThuong(q.topic.replace(/^Lớp 11 · /, "")), tu = c.length === 1 ? c : c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số|lên|giữa)( |$)/u.test(w));
    tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); if (co[0] && !co.slice(1).some(Boolean)) loi.push(`${at}: chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề`); });
    const dau = q.o.map((o) => o.split(" ")[0]);
    if (dau.slice(1).every((d) => d === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1) loi.push(at + ": ba lựa chọn sai cùng mở đầu bằng “" + dau[1] + "”");
  }));
  assert.deepEqual(loi, [], "câu nhiều lựa chọn có gợi ý từ chữ của lựa chọn");
}

/* ---------- chữ ---------- */
const giaTri = (a) => (typeof a === "number" ? a : /^\d+\/\d+$/.test(String(a)) ? fSo(docPS(a)) : NaN);
const chu = (q) => [q.q, q.x].concat(q.o || [], q.unit || [], (q.rubric || []).map((c) => c.c)).map(String);
{
  const loi = [], kt = (ok, m) => ok || loi.push(m);
  DE.forEach((b) => {
    const doan = Object.values(b.passages || {}).flatMap((p) => [p.title, p.text]);
    b.questions.map((q) => [b.id + ": " + q.q.slice(0, 50), chu(q)]).concat([[b.id + ": đoạn thông tin, lời dặn", doan.concat(b.note)]]).forEach(([at, ss]) => ss.forEach((s) => {
      // số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân (năm viết liền)
      kt(!/(?<![,\d])\d{4,}/.test(s.replace(/[Nn]ăm (\d{4})/g, "năm").replace(/\d+\/QĐ-BGDĐT/g, "")) && !/\d\.\d/.test(s), at + ": số viết sai cách: " + s.slice(0, 120));
      kt(!/(?<![\p{L}])(?:hóa|hòa|thủy|tỏa|hủy|tùy|khỏe|lũy|thụy)(?![\p{L}])/iu.test(s), at + ": dấu thanh kiểu mới: " + s.slice(0, 120));
      kt(!/(?<![\p{L}])(?:gen|alen|nitơ|photpho|cacbon|ôxi|oxi(?! hoá)|hiđrô|hidro|prôtêin|ADN|ARN|mARN|tARN|axit|NADPH₂|côđon|anticôđon|ribôxôm|nuclêôtit|nucleotit|nuclêôxôm|crômatit|tâm động học|đột biến dịch khung)(?![\p{L}])/u.test(s), at + ": thuật ngữ khác sách in năm 2026: " + s.slice(0, 120));
      kt(!/\d°C|\d ?oC\b/.test(s), at + ": đơn vị viết khác sách: " + s.slice(0, 120));
    }));
  });
  assert.deepEqual(loi, [], "chữ viết khác quy ước");
}

/* ---------- so với ba kho Sinh học 12 và giữa các đề thi thử: đề bài không trùng, không gần trùng; đáp án không trùng câu cùng chủ đề ---------- */
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const khongDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const TU_CHUNG = [...CD12, ...CHUONG.map((c) => c[0]), ...CHUONG_11, "mỗi ý sau đúng hay sai", "làm tròn kết quả đến hàng phần trăm", "làm tròn kết quả đến hàng phần mười",
  "làm tròn kết quả đến hàng đơn vị", "theo lí thuyết", "thuyết tiến hoá tổng hợp hiện đại", "ở một loài thực vật", "ở một loài cây", "do một gene có hai allele quy định",
  "bộ nst lưỡng bội 2n", "trội hoàn toàn so với allele", "nằm trên hai cặp nst khác nhau", "nằm trên vùng không tương đồng của nst giới tính x",
  "nằm trên vùng không tương đồng của nst x", "đang ở trạng thái cân bằng di truyền", "là bao nhiêu", "bằng bao nhiêu", "nào sau đây", "có bao nhiêu", "chiếm tỉ lệ bao nhiêu",
  "đề thi thử theo cấu trúc đề thi tốt nghiệp thpt từ năm 2025",
  "hình bên là phả hệ của một gia đình có người mắc bệnh", "kí hiệu: nam là hình vuông, nữ là hình tròn, người mắc bệnh tô màu đậm", "biết không phát sinh đột biến mới",
  "một phân tử dna mạch kép", "năm 2027 thí điểm thi trên máy tính ở nơi đủ điều kiện, đề như thi giấy"]
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const ten = new Map();
DE.forEach((b) => b.questions.forEach((q, i) => ten.set(q, b.id.replace("sinhhoc12-", "") + "#" + (i + 1))));
const KHO_Q = BANKS.filter((b) => b.file === "12-sinhhoc.js" && !b.pool && !/^sinhhoc12-tn-/.test(b.id)).flatMap((b) => b.questions.map((q, i) => { ten.set(q, b.id.replace("sinhhoc12-", "") + "#" + (i + 1)); return Object.assign(q, { _de: b.id }); }));
const TNQ = DE.flatMap((b) => b.questions.map((q) => Object.assign(q, { _de: b.id, _d: dpOf(b, q) })));
{
  const ds = BANKS.filter((b) => b.file === "12-sinhhoc.js" && !b.pool).flatMap((b) => b.questions.map((q) => ({ q, k: gocChu(q.q) })));
  TNQ.forEach((q) => assert.deepEqual(ds.filter((e) => e.k === gocChu(q.q)).map((e) => ten.get(e.q)), [ten.get(q)], "đề bài trùng câu khác trong 12-sinhhoc.js"));
  // cặp hai âm tiết liền nhau (như tests/hoahoc12-tn.js): đề bài cùng các lựa chọn có từ 4 cặp chung với một câu của ba kho và số cặp chung từ một
  // nửa số cặp của câu ít cặp hơn thì báo; không tính cặp có số hay chữ đơn, cặp của nhãn chủ đề, cụm chung và cặp có ở từ 3% số câu của file.
  // Giữa các đề thi thử (cùng cách hỏi của đề tốt nghiệp) chỉ so chuỗi 6 từ.
  const CUM = ["mỗi ý sau đúng hay sai", "làm tròn kết quả đến hàng phần trăm", "làm tròn kết quả đến hàng phần mười", "làm tròn kết quả đến hàng đơn vị", "theo lí thuyết"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => c.split(" ").every((x) => /\p{L}{2}/u.test(x))); };
  const ca = KHO_Q.concat(TNQ), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nhan.has(c) && df[c] < 0.03 * ca.length)); };
  const gan_ = [], gan6 = [], trung = [];
  TNQ.forEach((q) => {
    const c = capAm(q);
    KHO_Q.concat(TNQ.filter((p) => p._de !== q._de)).forEach((p) => {
      const d = capAm(p), chung = [...c].filter((x) => d.has(x));
      if (!/^sinhhoc12-tn-/.test(p._de) && chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size)) gan_.push(`${ten.get(q)} ~ ${ten.get(p)}: ${chung.join(", ")}`);
      const s = " " + khongDau(p.q) + " "; chuoi(q.q, 6).forEach((x) => { if (s.includes(" " + x + " ")) gan6.push(ten.get(q) + " ~ " + ten.get(p) + ": " + x); });
      if (p.topic !== q.topic) return;
      if (q.type === "mc" && p.type === "mc" && gocChu(q.o[0]) === gocChu(p.o[0])) trung.push(ten.get(q) + " ~ " + ten.get(p) + ": đáp án trùng câu cùng chủ đề");
      if (q.type === "num" && p.type === "num" && gan(q.ans, giaTri(p.ans)) && (q.unit || "") === (p.unit || "")) trung.push(ten.get(q) + " ~ " + ten.get(p) + ": đáp án số trùng câu cùng chủ đề");
    });
  });
  assert.deepEqual([...new Set(gan_)], [], "đề bài gần trùng (cặp hai âm tiết) câu khác");
  assert.deepEqual([...new Set(gan6)], [], "đề bài gần trùng (chuỗi 6 từ) câu khác");
  assert.deepEqual(trung, [], "đáp án trùng câu cùng chủ đề");
}

/* ---------- dò lộ đáp án (như tests/hoahoc12-tn.js) ----------
   Đề cố định: mọi câu cùng hiện, đoạn thông tin cùng hiện, lời dặn hiện ở màn mở đề; đề “Ôn chủ đề” rút chung câu cùng chủ đề của các đề thi
   thử và ba kho Sinh học 12 (kèm đoạn thông tin của câu). Đáp án là số (trả lời ngắn, lựa chọn đúng là số hay phân số; từ hai chữ số, hoặc
   số thập phân, phân số) tìm ở vị trí kết quả của câu kia (ngay sau “=”, “≈”, “là”, “bằng”, “được”, “chiếm”; không tính số đứng trước một phép
   tính) cùng đơn vị: không được có. Đáp án bằng chữ tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy cả đáp án); chuỗi
   có trong đề bài, lựa chọn, lời giải, đoạn thông tin của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM. */
const DON_VI = "(?:kcal|cm|NST|cá thể|%|g)";
const SO_DA = "(?:\\d+\\/\\d+|" + NUM + ")";
const valDA = (s) => (/\//.test(s) ? fSo(docPS(s)) : val(s));
const soDV = new RegExp("^(" + SO_DA + ")(?: ?\\(?(" + DON_VI + ")\\)?)?$", "u");
const KQ = new RegExp("(?:=|≈|(?:^|[\\s(])(?:là|bằng|được|chiếm))\\s+(" + SO_DA + ")(?![\\d,/])(?!\\s*[·+−:×](?:\\s|\\d|\\())(?: ?\\(?(" + DON_VI + ")(?![\\p{L}]))?", "gu");
const kqSo = (s) => [...String(s).matchAll(KQ)].map((x) => ({ v: valDA(x[1]), u: x[2] || "" }));
const tuCua = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum3 = (s) => { const w = tuCua(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
// chuỗi 3 từ chung của môn (thuật ngữ, cách nói của bài học) không làm lộ đáp án nào: bỏ qua khi là một phần của đáp án dài hơn
const CUM_CHUNG = new Set(["tần số allele", "của quần thể", "thành phần kiểu", "phần kiểu gene", "kiểu gene của", "nst giới tính", "của môi trường", "nguồn sống của", "sống của môi", "những con có", "được thay bằng", "phân tử dna", "tế bào nhân", "bào nhân thực",
  "của con người", "trong quần thể", "của sinh vật", "của thực vật", "nst tương đồng", "môi trường sống", "với môi trường", "sinh thái của", "kiểu hình của", "chất hữu cơ",
  "phù hợp với", "quần thể có", "giới tính x", "nhân tố sinh", "tố sinh thái", "cho quần thể", "để quần thể", "và môi trường"]);
const chuP = (p) => (p.type === "note" ? [p.x] : chu(p).concat(p._d ? [p._d] : []));
const NOTES = DE.map((b) => { const o = { q: b.id + "-note", x: [b.note].concat(Object.values(b.passages || {}).map((p) => p.title + ". " + p.text)).join(" | "), topic: "note", type: "note", _de: b.id }; ten.set(o, b.id.replace("sinhhoc12-", "") + "-note"); return o; });
const doLo = (qs, them, cap) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    let soDa = [], C = [];
    // câu trả lời ngắn có tol: số ở câu khác nằm trong khoảng sai số (như 7/16 với đáp án 0,44) cũng là lộ đáp án
    if (q.type === "num") soDa = [{ v: giaTri(q.ans), u: q.unit || "", t: q.tol || 0 }];
    else if (q.type === "mc") { const x = soDV.exec(q.o[0]); if (x) soDa = [{ v: valDA(x[1]), u: x[2] || "" }]; else { const c3 = cum3(q.o[0]), sai = q.o.slice(1).map((o) => " " + tuCua(o).join(" ") + " ");
      // chuỗi có ở từ hai lựa chọn sai thì không chỉ ra được lựa chọn đúng
      C = [...new Set(c3.length > 1 ? c3.filter((c) => !CUM_CHUNG.has(c)) : c3)].filter((c) => sai.filter((o) => o.includes(" " + c + " ")).length < 2); } }
    soDa = soDa.filter((d) => Math.abs(d.v) >= 10 || !Number.isInteger(d.v));
    qs.concat(them).forEach((p) => {
      if (p === q || !cap(p, q)) return;
      const at = `${ten.get(p)} → ${ten.get(q)}: `, T = " " + chuP(p).map((s) => tuCua(s).join(" ")).join(" | ") + " ";
      soDa.filter((d) => chuP(p).flatMap(kqSo).some((y) => (gan(y.v, d.v) || (d.t && Math.abs(y.v - d.v) <= d.t + 1e-12)) && (!y.u || !d.u || y.u === d.u))).forEach((d) => lo.push(at + vn(d.v) + " " + d.u));
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
// trong một đề (mọi câu cùng hiện) và với lời dặn, đoạn thông tin của đề
const r1 = doLo(TNQ, NOTES, (p, q) => p._de === q._de);
// cùng chủ đề (đề “Ôn chủ đề”): câu của đề thi thử với câu cùng chủ đề của đề thi thử khác và của ba kho (trừ câu tự luận)
const onCD = TNQ.concat(KHO_Q.filter((q) => q.type !== "essay" && TNQ.some((t) => t.topic === q.topic)));
const r2 = doLo(onCD, [], (p, q) => p.topic === q.topic && p._de !== q._de && (/^sinhhoc12-tn-/.test(p._de) || /^sinhhoc12-tn-/.test(q._de)));
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu khác (xem tay):\n" + [...r1.chuLo, ...r2.chuLo].join("\n"));
// Đã xem tay (Phiên N12-tn-sinhhoc): chữ của đáp án có ở câu khác nhưng không chỉ ra đáp án.
// Đề 1: “lặp đoạn”, “đảo đoạn” là lựa chọn sai của các câu đột biến cấu trúc NST (kho và Đề 1), các câu đó không tả lặp đoạn; “một cặp
// nucleotide” ở câu đột biến thay thế không nói đột biến mất một cặp làm đổi mọi bộ ba phía sau; “ổ sinh thái” ở lời giải câu hai loài chim
// chích (kho) chỉ dùng tên, không nói ổ sinh thái là gì; “phân bố theo nhóm”, “hỗ trợ nhau” là lựa chọn sai của câu tổ chim biển, không nói
// cây sim mọc thành đám vì sao, quần thể dưới kích thước tối thiểu suy vong vì sao.
// Đề 2: “không có cơ (hoành)”, “đủ điều kiện” (lời dặn), “bộ phận đáp ứng của” trùng chữ tình cờ; “loài đặc trưng”, “loài chủ chốt”, “loài
// ưu thế” là lựa chọn sai của câu kia; “chất hữu cơ đơn giản từ các chất vô cơ” là lựa chọn sai của câu tiến hoá tiền sinh học (kho), không
// nói thí nghiệm Miller – Urey ủng hộ điều gì; “có thể tạo” trùng chữ tình cờ; “chọn lọc tự nhiên” ở đề bài câu chọn lọc tác động lên kiểu
// hình không nói học thuyết tổng hợp kết nối những gì; lựa chọn sai “số cá thể ít nhất mà quần thể cần có…” (kích thước tối thiểu) không
// nói vì sao quần thể dưới kích thước đó dễ suy vong.
// Đề 3: “mất một cặp”, “một cặp nucleotide” ở lựa chọn sai, lời giải câu liên kết hydrogen không nói dạng đột biến nào làm lệch khung đọc.
// Đề 4: “tự thụ phấn” ở lựa chọn sai của câu lai phân tích, đề bài câu AaBb tự thụ phấn (kho) và một ý của câu phép lai (Đề 1) không nói Mendel
// tạo dòng thuần bằng cách nào; ý “Allele gây bệnh là allele trội và gene này nằm trên NST thường” của câu phả hệ không nói kiểu di truyền của phả hệ ở câu kia.
const DA_XEM = [
  "tn-de3#3 → ck1-de1#6: mất một cặp", "tn-de3#3 → ck1-de1#6: một cặp nucleotide",
  "ck1-de1#10 → tn-de4#6: tự thụ phấn", "ck1-de1#9 → tn-de4#6: tự thụ phấn", "tn-de1#19 → tn-de4#6: tự thụ phấn", "tn-de4#20 → ck1-de1#21: nằm trên nst",
  "tn-de4#20 → ck1-de1#21: trên nst thường",
  "ck1-de1#18 → tn-de1#7: lặp đoạn", "ck1-de2#18 → tn-de1#7: lặp đoạn", "tn-de1#7 → ck1-de1#18: đảo đoạn", "tn-de1#3 → ck1-de1#6: một cặp nucleotide",
  "ck2-de2#8 → tn-de1#15: ổ sinh thái",
  "tn-de1#14 → gk2-de1#22: phân bố theo", "tn-de1#14 → gk2-de1#22: bố theo nhóm", "tn-de1#14 → gk2-de2#21: hỗ trợ nhau",
  "tn-de2#17 → tn-de2#3: không có cơ", "tn-de2-note → tn-de2#13: đủ điều kiện", "tn-de2#22 → tn-de2#16: đáp ứng của",
  "ck2-de1#6 → tn-de2#14: loài đặc trưng", "tn-de2#14 → ck2-de1#6: loài chủ chốt", "tn-de2#14 → ck2-de2#6: loài ưu thế",
  "gk2-de2#13 → tn-de2#11: hữu cơ đơn", "gk2-de2#13 → tn-de2#11: cơ đơn giản", "gk2-de2#13 → tn-de2#11: chất vô cơ", "gk2-de1#15 → tn-de2#11: có thể tạo",
  "tn-de2#10 → gk2-de1#7: chọn lọc tự", "tn-de2#10 → gk2-de1#7: lọc tự nhiên", "tn-de2#13 → gk2-de2#21: cá thể ít",
  "tn-de5#20 → ck1-de1#21: nằm trên nst", "tn-de5#20 → ck1-de1#21: trên nst thường", "tn-de5#12 → gk2-de1#7: chọn lọc tự", "tn-de5#12 → gk2-de1#7: lọc tự nhiên",
  "ck1-de2#20 → tn-de6#9: tư vấn di", "ck1-de2#20 → tn-de6#9: vấn di truyền",
  "gk2-de1#14 → tn-de7#10: đại paleozoic cổ", "gk2-de1#14 → tn-de7#10: paleozoic cổ sinh", "tn-de7#10 → gk2-de1#14: đại mesozoic trung", "tn-de7#10 → gk2-de1#14: mesozoic trung sinh",
  "tn-de7#20 → ck1-de1#21: nằm trên nst", "tn-de7#20 → ck1-de1#21: trên nst thường"];
assert.deepEqual([...r1.chuLo, ...r2.chuLo].sort(), [...DA_XEM].sort(), "đáp án bằng chữ có ở câu khác đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual([...r1.lo, ...r2.lo], [], "lộ đáp án:\n" + [...r1.lo, ...r2.lo].join("\n"));

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (nếu có) ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const truongChu = (q) => (q.type === "note" ? [q.x] : chu(q));
// tra nhanh: các chuỗi k từ của chữ đề thi thử (Map chuỗi → các câu), đi một lượt qua chữ nguồn đã chuẩn hoá; trả về Map chuỗi → các mã nguồn có chuỗi đó
const chuoiDe = (k, them) => { const m = new Map(); TNQ.concat(NOTES).forEach((q) => new Set(truongChu(q).concat(them && q._d ? [q._d] : []).flatMap((x) => chuoi(x, k))).forEach((c) => { if (!m.has(c)) m.set(c, []); m.get(c).push(q); })); return m; };
const timChuoi = (nguon, k, ds) => {
  const dau = new Set([...ds.keys()].map((c) => c.split(" ").slice(0, 2).join(" "))), ra = new Map();
  nguon.forEach(({ id, t }) => { const w = t.split(" "); for (let i = 0; i + k <= w.length; i++) { if (!dau.has(w[i] + " " + w[i + 1])) continue; const c = w.slice(i, i + k).join(" ");
    if (ds.has(c)) { if (!ra.has(c)) ra.set(c, new Set()); ra.get(c).add(id); } } });
  return ra;
};
if (SACH.length) {
  assert.ok(SACH.some((f) => /sinh-hoc-12/.test(f)), "OnUp-Book có Sinh học 12");
  // chủ đề đúng tên bài trong mục lục (README của Sinh học 12; tên Bài 16 rút gọn như các kho), tên chương lớp 11 đúng mục lục (README của Sinh học 11)
  const ml = (l, c) => { const f = path.join(BOOK, l, c, "README.md"); return fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null; };
  const r12 = ml("lop-12", "sinh-hoc-12"), r11 = ml("lop-11", "sinh-hoc-11");
  const hoa = (s) => s.normalize("NFC").toLocaleUpperCase("vi");
  if (r12) { const bai = [...r12.matchAll(/Bài (\d+)\. ([^|·]+?) \|/g)].map((x) => x[2].trim()).concat([...r12.matchAll(/· Bài (\d+)\. ([^|]+?) \|/g)].map((x) => x[2].trim()));
    BAI.forEach((t) => assert.ok(bai.includes(t) || bai.includes(t.replace(", thành tựu", " và thành tựu")), "chủ đề đúng tên bài trong mục lục: " + t));
    const ch = [...r12.matchAll(/\*\*Chương \d+\. ([^*]+)\*\*/g)].map((x) => hoa(x[1].trim())); CHUONG.forEach(([t]) => assert.ok(ch.includes(hoa(t)), "tên chương Sinh học 12: " + t)); }
  if (r11) { const ch = [...r11.matchAll(/\*\*Chương \d+\. ([^*]+)\*\*/g)].map((x) => hoa(x[1].trim())); CHUONG_11.forEach((t) => assert.ok(ch.includes(hoa(t)), "tên chương Sinh học 11: " + t)); }
  const sach = SACH.map((f) => ({ id: f, t: khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")) }));
  const bao = (k) => { const ds = chuoiDe(k), gap = timChuoi(sach, k, ds); return [...gap.keys()].flatMap((c) => ds.get(c).map((q) => `${ten.get(q)}: ${c}`)); };
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách và mục lục.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả ba kho Sinh học 12 và giữa các đề thi thử ---------- */
{
  const cua = (b, q) => ({ id: b.id, t: chu(q).concat(dpOf(b, q) ? [dpOf(b, q)] : []).map(khongDau).join(" | ") });
  const khac = BANKS.filter((b) => !b.pool).flatMap((b) => b.questions.map((q) => cua(b, q))).concat(BANKS.filter((b) => b.pool).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cua(b, q))));
  const bao = (k) => { const ds = chuoiDe(k, true), gap = timChuoi(khac, k, ds);
    return [...gap.keys()].flatMap((c) => ds.get(c).flatMap((q) => [...gap.get(c)].filter((id) => id !== q._de).map((id) => `${ten.get(q)} ~ ${id}: ${c}`))); };
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}

/* ---------- tự thử các bộ đọc với giá trị biết trước và với hình, câu cố ý viết sai ---------- */
{
  const tim = (has) => TNQ.find((q) => q.q.includes(has));
  // phép lai, giao tử, bảng mã
  assert.ok(fBang(tiLe(lai("Aa", "Aa"), (g) => g === "aa"), F(1, 4)) && soGiaoTu("AaBbDD") === 4 && dich(["AUG", "UUU", "UAA"]).join("") === "MF");
  assert.throws(() => bangDe("AUG – methionine; GCA – lysine; UAG – kết thúc. "), /khác bảng chuẩn/);
  const gt = giaoTu("AB/ab", 0.2); assert.ok(gan(gt.Ab, 0.1) && gan(gt.AB, 0.4));
  // phả hệ: hình đúng đọc được; xoá một đoạn xuống con, đổi một người thành người bệnh thì bộ đọc, bộ tìm kiểu di truyền báo
  const qPH = tim("phả hệ của một gia đình có người mắc bệnh M"), svg = qPH.svg;
  assert.throws(() => docPhaHe(svg.replace('<line x1="130" y1="80" x2="130" y2="98" stroke="ink" stroke-width="1.5"/>', ""), "thử"), /hai đầu đường anh chị em|đoạn thẳng không thuộc/);
  const ph2 = docPhaHe(svg.replace('<rect x="28" y="24" width="24" height="24" fill="surface"', '<rect x="28" y="24" width="24" height="24" fill="ink"'), "thử");
  assert.ok(kieuDiTruyen(ph2).includes("lặn, NST X"), "bố số 1 bệnh thì gene lặn trên X cũng khớp phả hệ");
  // xác suất trên phả hệ: Aa × Aa sinh con lành → 2/3 Aa
  const ph = docPhaHe(svg, "thử"), G = ganPhaHe(ph, "lặn, NST thường");
  assert.ok(fBang(xs(G, (g) => g.get(6).join("") === "Aa"), F(2, 3)) && chacChan(G, ph) === 6);
  // bộ dò lộ bắt được câu cố ý viết sai: lời giải câu khác có “= 480”, “chiếm 0,19”, “= 7/16”
  const thu = (qs) => { const r = doLo(qs, [], () => true); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  const ghi = (q, x) => { const o = Object.assign({}, q, { x: q.x + " " + x }); ten.set(o, "thử-giả"); return o; };
  const khac = tim("Gà mái có cặp NST giới tính"), qG = tim("Một phân tử DNA mạch kép có"), qA = tim("số cây mang allele a"), qT = tim("trội ở đúng hai trong ba tính trạng"), qNM = tim("nhóm máu do một gene có ba allele");
  [khac, qG, qA, qT, qNM].forEach((q) => ten.set(q, "thử"));
  assert.deepEqual(thu([qG, ghi(khac, "Số nucleotide loại G = 480.")]), ["480 "]);
  assert.deepEqual(thu([qA, ghi(khac, "Cây mang allele a chiếm 0,19.")]), ["0,19 "]);
  assert.deepEqual(thu([qT, ghi(khac, "Tỉ lệ đó = 7/16.")]), ["0,44 "]);
  assert.deepEqual(thu([qT, ghi(khac, "Tỉ lệ đó = 7/32.")]), []);
  assert.deepEqual(thu([qNM, ghi(khac, "Xác suất sinh con nhóm máu AB là 1/4.")]), ["0,25 "]);
  assert.ok(thu([khac, ghi(qG, "Gà mái có cặp NST giới tính ZW.")]).length > 0);
}
DE.forEach((b) => console.log(`${b.id}: ${b.questions.length} câu (${b.questions.filter((q) => q.type === "mc").length} nhiều lựa chọn, ${b.questions.filter((q) => q.type === "tf4").length} đúng/sai 4 ý, ${b.questions.filter((q) => q.type === "num").length} trả lời ngắn), ` +
  `${b.questions.filter((q) => lop(q.topic) === 11).length} câu lớp 11, ${Object.keys(b.passages || {}).length} đoạn thông tin; đáp án đúng dài nhất hoặc ngắn nhất ở ${b._le}/18 câu nhiều lựa chọn.`));
console.log(n + " câu đã tính lại hoặc so với bảng (" + daDoc.size + " hình đã đọc lại).");
console.log("MATH OK");
