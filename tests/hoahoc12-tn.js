// Kiểm tra các đề Hoá học thi thử tốt nghiệp THPT (data/banks/12-hoahoc.js, hoahoc12-tn-de<N>; Phiên N12-tn-hoahoc: Đề 1–4; phiên sau
// thêm đề thì mở rộng script này: thêm các mục kiểm tra của đề mới vào RIENG). Đề tính điểm theo khung đề tốt nghiệp THPT từ năm 2025
// (Quyết định 764/QĐ-BGDĐT; docs/KE-HOACH-NOI-DUNG.md, mục 2 và mục 7, khối “Phiên N12-tn-hoahoc”). Số đề, số câu lấy từ danh mục.
// Khung: danh mục (tên, khối 12, môn Hóa học, file, 50 phút, pts 10, gắn vào tn-thpt-2027); Phần I 18 câu nhiều lựa chọn pt 0,25, Phần II
// 4 câu đúng/sai 4 ý pt 1, Phần III 6 câu trả lời ngắn pt 0,25 (đúng tên part, đúng thứ tự), Quiz.grade điểm tối đa 4,5 – 4 – 1,5; đáp án
// Phần III là số, không quá 4 kí tự (dấu trừ, dấu phẩy tính một kí tự), câu dặn làm tròn có tol bằng nửa đơn vị làm tròn và lời giải ghi
// “≈ …”; mức độ như đề tham khảo năm 2025 (Biết và Hiểu khoảng 80% số ý: Phần I 11 Biết, 5 Hiểu, 2 Vận dụng; Phần II bốn câu ghi mức 1, 2,
// 2, 3; Phần III 1 Biết, 3 Hiểu, 2 Vận dụng); phạm vi như đề tham khảo năm 2025: mỗi đề 2 câu lớp 10 (một ở Phần I, một ở Phần III), 2 câu
// lớp 11 (Phần I), 24 câu lớp 12 đủ tám chương; câu lớp 12 mang đúng chữ chủ đề của ba kho Hoá học 12 (cuối kì I, giữa kì II, cuối năm), câu
// lớp 10, 11 ghi “Lớp 10 · ”, “Lớp 11 · ” và tên chương của sách (đối chiếu mục lục trong README của cuốn ở OnUp-Book); trong mỗi phần, câu lớp
// 12 theo thứ tự chương; Phần II có ít nhất một câu về thí nghiệm; đoạn thông tin dùng chung chỉ ở Phần I, nhiều nhất một cặp câu liền nhau;
// lời dặn ghi đúng số câu, số điểm, số câu mỗi lớp tính từ dữ liệu.
// Mỗi câu khớp đúng một mục kiểm tra của đề đó (theo chữ has trong đề bài), mục đó đọc số liệu trong đề bài hoặc đoạn thông tin rồi tính lại
// đáp án bằng code (nguyên tử khối đề cho phải đúng bảng; hệ số đọc từ phương trình trong đề hoặc lời giải; thể tích mol khí 24,79 L/mol;
// thế điện cực chuẩn đúng Bảng 15.1 của sách), hoặc so với bảng ghi trong script (câu khái niệm, câu đếm chất theo tính chất). Mọi phương
// trình hoá học cân bằng cả nguyên tố và điện tích (kí hiệu trạng thái (s), (l), (g), (aq) bỏ qua khi đọc); mũi tên chỉ ở phương trình; phức
// chất đọc được (phối tử có trong bảng điện tích).
// Rồi: chữ (số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân, chữ số dưới dòng, dấu thanh kiểu sách “hoá”, “thuỷ”, tên chất như
// sách); kiểu Đ/S không lặp trong một đề, mỗi kiểu nhiều nhất ba lần trong các đề thi thử; đáp án đúng không dài hơn hẳn lựa chọn sai và là
// lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba và không dưới một phần sáu số câu nhiều lựa chọn của đề, không là lựa chọn duy nhất
// có chữ của nhãn chủ đề, ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có; lời giải không nhắc vị trí của phương án.
// So với ba kho Hoá học 12 và giữa các đề thi thử: đề bài không trùng câu nào trong file, không gần trùng (chuỗi 6 từ; cặp hai âm tiết
// chung), đáp án không trùng câu cùng chủ đề. Dò lộ đáp án giữa mọi câu của một đề (đoạn thông tin cùng hiện) và với lời dặn, giữa câu cùng
// chủ đề của các đề thi thử và ba kho Hoá học 12 (đề “Ôn chủ đề” rút chung; đáp án bằng chữ đã xem ghi ở DA_XEM). Có ../OnUp-Book thì so mọi
// trường chữ (cả đoạn thông tin, lời dặn) với chữ OCR của mọi cuốn (không chuỗi 8 từ nào trùng) và với câu của mọi kho khác, cả giữa các đề
// thi thử với nhau. Bộ đọc phương trình, phức chất, bộ dò lộ tự thử với phương trình, câu cố ý viết sai.
// Chạy: node tests/hoahoc12-tn.js → in MATH OK. DO_LO=1: in đáp án bằng chữ có ở câu khác; DO_SACH=1: in chuỗi 6 từ trùng chữ của sách;
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

/* ---------- số (như tests/vatli12-tn.js): hàng nghìn ngăn bằng khoảng trắng, dấu phẩy thập phân, luỹ thừa của 10 viết “3 · 10⁸” ---------- */
const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹", SUB = "₀₁₂₃₄₅₆₇₈₉";
const NUM = "[−-]?\\d{1,3}(?: \\d{3})*(?:,\\d+)?(?: · 10⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)?";
const val = (s) => {
  const m = /^([−-]?\d{1,3}(?: \d{3})*(?:,\d+)?)(?: · 10(⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+))?$/.exec(String(s).trim());
  assert.ok(m, "không đọc được số “" + s + "”");
  const e = m[2] ? +[...m[2]].map((c) => (c === "⁻" ? "-" : SUP.indexOf(c))).join("") : 0;
  return +m[1].replace(/ /g, "").replace("−", "-").replace(",", ".") * 10 ** e;
};
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
const R = (mau) => new RegExp(mau.split("#").map(escRe).join("(" + NUM + ")"), "u");
const so = (s, mau) => { const m = R(mau).exec(s); assert.ok(m, "không thấy “" + mau + "” trong: " + String(s).slice(0, 90)); return m.slice(1).map(val); };
const gan = (a, b, e = 1e-9) => a === b || Math.abs(a - b) <= e * Math.max(Math.abs(a), Math.abs(b));
const vn = (x, d = 6) => { const r = Math.round(x * 10 ** d) / 10 ** d, [a, b] = String(Math.abs(r)).split("."); return (r < 0 ? "−" : "") + a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); };
const vnf = (x, d) => { const [a, b] = Math.abs(x).toFixed(d).split("."); return (x < 0 ? "−" : "") + a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); };
const supN = (k) => [...String(k)].map((c) => (c === "-" ? "⁻" : SUP[+c])).join("");
const supV = (s) => +[...s].map((c) => SUP.indexOf(c)).join(""), subV = (s) => +[...s].map((c) => SUB.indexOf(c)).join("");
const lamTron = (x, k) => Math.round(x * 10 ** k + 1e-9 * Math.sign(x)) / 10 ** k;
const coX = (q, ...cum) => cum.forEach((c) => assert.ok(q.x.includes(c), "lời giải cần có “" + c + "”"));
// số viết bằng chữ trong đề (“nhai hai viên”)
const SO_CHU = { một: 1, hai: 2, ba: 3, bốn: 4, năm: 5, sáu: 6, bảy: 7, tám: 8, chín: 9, mười: 10 };
const soChu = (s, truoc, sau) => { const m = new RegExp(escRe(truoc) + " (\\p{L}+) " + escRe(sau), "u").exec(s); assert.ok(m && m[1] in SO_CHU, "không thấy “" + truoc + " … " + sau + "”"); return SO_CHU[m[1]]; };
// chọn đúng một lựa chọn thoả điều kiện
const motCai = (q, f, at = "") => { const c = q.o.filter(f); assert.equal(c.length, 1, at + "cần đúng một lựa chọn thoả điều kiện, có " + c.length + ": " + c.join(" | ")); return c[0]; };
// bảng tra: mọi lựa chọn phải có trong bảng, đúng một lựa chọn có giá trị cần tìm
const tra = (q, bang, can) => { q.o.forEach((o) => assert.ok(o in bang, "lựa chọn chưa có trong bảng: " + o)); return motCai(q, (o) => bang[o] === can); };
// câu đúng/sai 4 ý theo bảng: mọi ý phải có trong bảng
const traY = (q, bang) => q.o.map((o) => { assert.ok(o in bang, "ý chưa có trong bảng: " + o); return bang[o]; });

/* ---------- hoá học (như tests/vatli-hoahoc12-ck2.js): công thức (chữ số dưới dòng, nước kết tinh “·”, phức chất trong ngoặc vuông),
   khối lượng mol, phương trình (cả ion, electron, hệ số n) ---------- */
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
// nguyên tử khối (làm tròn như các đề thi): đề cho phải đúng bảng
const NTK = { H: 1, Li: 7, C: 12, N: 14, O: 16, F: 19, Na: 23, Mg: 24, Al: 27, Si: 28, P: 31, S: 32, Cl: 35.5, K: 39, Ca: 40, Cr: 52, Mn: 55, Fe: 56, Co: 59, Ni: 59, Cu: 64, Zn: 65, Br: 80, Ag: 108, Sn: 119, Ba: 137, Pb: 207 };
const KL = (f, nt = NTK) => Object.entries(congThuc(f)).reduce((s, [e, c]) => { assert.ok(e in nt, "thiếu nguyên tử khối của " + e + " (" + f + ")"); return s + nt[e] * c; }, 0);
// chất trong phương trình: hệ số, công thức, điện tích; "e" là electron (điện tích −1); phức chất “[Ag(NH₃)₂]⁺”, muối “K₂[Ni(CN)₄]”
const PHUC = "\\[[A-Z][a-z]?(?:[A-Z][a-z]?[₀-₉]*|\\([A-Za-z₀-₉]+\\)[₀-₉]*)+\\]";
const THAN = `(?:[A-Z]|\\([A-Z][A-Za-z₀-₉]*\\)[₀-₉ₙ]+|${PHUC})(?:[A-Za-z₀-₉ₙ]|\\([A-Za-z₀-₉]+\\)[₀-₉ₙ]*|${PHUC})*`;
const LOAI = `(?:\\d*e(?![\\p{L}\\p{N}₀-₉])|(?:\\d+n?|n)?${THAN}(?:[²³]?[⁺⁻])?)`;
const PT = new RegExp(`(?<![\\p{L}\\p{N}₀-₉])${LOAI}(?: \\+ ${LOAI})* (?:→|⇌) ${LOAI}(?: \\+ ${LOAI})*`, "gu");
// kí hiệu trạng thái “(s)”, “(l)”, “(g)”, “(aq)” viết ngay sau công thức: bỏ đi trước khi đọc phương trình
const boTrangThai = (s) => String(s).replace(/(?<=[A-Za-z₀-₉)\]⁺⁻])\((?:s|l|g|aq)\)/g, "");
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
const ptTrong = (q) => [...new Set(boTrangThai([q.q, q.x].concat(q.o || []).join(" | ")).match(PT) || [])];
const ptCua = (q, x, y) => { const p = ptTrong(q).filter((s) => [x, y].every((c) => tach(s).flat().some((v) => v.ten === c)));
  assert.equal(p.length, 1, "đề hoặc lời giải có đúng một phương trình chứa " + x + " và " + y + ": " + p.join("; ")); return p[0]; };
// nguyên tử khối đề cho: “(Cho H = 1, C = 12, O = 16.)” hoặc “(Cho H = 1, C = 12; làm tròn …)”; phải đúng bảng nguyên tử khối
const ntDe = (q) => { const m = /\(Cho ([^;)]*)[;.]/.exec(q.q); assert.ok(m, "đề cho nguyên tử khối"); const nt = {};
  [...m[1].matchAll(/([A-Z][a-z]?) = (\d+(?:,\d+)?)/g)].forEach((k) => { nt[k[1]] = val(k[2]); assert.equal(nt[k[1]], NTK[k[1]], "nguyên tử khối của " + k[1]); }); return nt; };
// thể tích mol khí ở điều kiện chuẩn đề cho (24,79 L/mol)
const VM = 24.79;
const vmDe = (q) => { const m = new RegExp("(?:thể tích mol khí (?:ở điều kiện chuẩn là )?(" + NUM + ") L\\/mol|ở điều kiện chuẩn, mỗi mol khí chiếm thể tích (" + NUM + ") L)", "u").exec(q.q);
  assert.ok(m && val(m[1] || m[2]) === VM, "thể tích mol khí ở điều kiện chuẩn"); return VM; };
// thế điện cực chuẩn (V) theo Bảng 15.1 của sách; đề, đoạn thông tin ghi E° nào cũng phải đúng bảng
const E0_SACH = { Li: -3.04, K: -2.924, Ca: -2.84, Na: -2.713, Mg: -2.356, Al: -1.676, Zn: -0.762, Fe: -0.44, Ni: -0.257, Sn: -0.137, Pb: -0.126, H: 0, Cu: 0.34, Ag: 0.799, Hg: 0.853, Au: 1.52 };
const E0_RE = new RegExp("E°\\(([A-Z][a-z]?)[²³]?⁺\\/([A-Z][a-z]?)\\) = ([−+]?\\d+,\\d+) V", "gu");
const e0De = (s) => Object.fromEntries([...String(s).matchAll(E0_RE)].map((m) => {
  assert.equal(m[1], m[2], "cặp oxi hoá – khử của cùng một kim loại"); const v = val(m[3].replace("+", "")); assert.ok(gan(v, E0_SACH[m[1]]), "E° của " + m[1] + " đúng bảng của sách"); return [m[1], v]; }));
const ION = { Li: "Li⁺", Na: "Na⁺", K: "K⁺", Mg: "Mg²⁺", Ca: "Ca²⁺", Ba: "Ba²⁺", Al: "Al³⁺", Zn: "Zn²⁺", Fe: "Fe²⁺", Ni: "Ni²⁺", Sn: "Sn²⁺", Pb: "Pb²⁺", Cu: "Cu²⁺", Ag: "Ag⁺", Hg: "Hg²⁺" };
// kí hiệu kim loại trong lựa chọn: “Titanium (Ti)”
const kiHieu = (o) => { const m = /\(([A-Z][a-z]?)\)$/.exec(o); assert.ok(m, "lựa chọn ghi kí hiệu kim loại: " + o); return m[1]; };
// số oxi hoá của một nguyên tố trong hợp chất (trung hoà điện hoặc ion), các nguyên tố khác có số oxi hoá cố định
const OXH = { H: 1, Li: 1, Na: 1, K: 1, O: -2, Cl: -1, F: -1 };
const oxh = (f, el, q = 0) => { const c = congThuc(f); assert.ok(c[el], el + " có trong " + f);
  return (q - sum(Object.entries(c).filter(([e]) => e !== el).map(([e, k]) => { assert.ok(e in OXH, "chưa có số oxi hoá cố định của " + e); return OXH[e] * k; }))) / c[el]; };
// cấu hình electron của nguyên tử kim loại chuyển tiếp dãy thứ nhất (bảng ở Bài 27); ion nhường electron 4s trước rồi mới đến 3d
const CH = { Sc: "[Ar]3d¹4s²", Ti: "[Ar]3d²4s²", V: "[Ar]3d³4s²", Cr: "[Ar]3d⁵4s¹", Mn: "[Ar]3d⁵4s²", Fe: "[Ar]3d⁶4s²", Co: "[Ar]3d⁷4s²", Ni: "[Ar]3d⁸4s²", Cu: "[Ar]3d¹⁰4s¹" };
const Z_NT = { H: 1, He: 2, Li: 3, Be: 4, B: 5, C: 6, N: 7, O: 8, F: 9, Ne: 10, Na: 11, Mg: 12, Al: 13, Si: 14, P: 15, S: 16, Cl: 17, Ar: 18, K: 19, Ca: 20,
  Sc: 21, Ti: 22, V: 23, Cr: 24, Mn: 25, Fe: 26, Co: 27, Ni: 28, Cu: 29, Zn: 30, Ga: 31, Ge: 32, As: 33, Se: 34, Br: 35, Kr: 36, Rb: 37, Sr: 38, Ag: 47, Sn: 50, I: 53, Ba: 56 };
const KIM_LOAI = new Set(["Li", "Be", "Na", "Mg", "Al", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Rb", "Sr", "Ag", "Sn", "Ba"]);
const docCH = (s) => { const m = /^\[Ar\]3d([⁰¹²³⁴⁵⁶⁷⁸⁹]+)(?:4s([⁰¹²³⁴⁵⁶⁷⁸⁹]+))?$/u.exec(s); assert.ok(m, "không đọc được cấu hình electron " + s); return { d: supV(m[1]), s: m[2] ? supV(m[2]) : 0 }; };
const vietCH = (c) => "[Ar]3d" + supN(c.d) + (c.s ? "4s" + supN(c.s) : "");
const ionCH = (ch, k) => { const c = docCH(ch), bot = Math.min(k, c.s); return vietCH({ d: c.d - (k - bot), s: c.s - bot }); };
Object.entries(CH).forEach(([k, s]) => { const c = docCH(s); assert.equal(18 + c.d + c.s, Z_NT[k], "cấu hình electron của " + k + " đủ số electron"); });
// phức chất: nguyên tử trung tâm, các phối tử, số lượng phối tử, điện tích, điện tích của nguyên tử trung tâm (điện tích phối tử theo bảng)
const DIEN_PT = { CN: -1, Cl: -1, F: -1, OH: -1, "NH₃": 0, "H₂O": 0, CO: 0 };
const PHUC_RE = new RegExp(PHUC + "[²³]?[⁺⁻]?", "gu");
const docPhuc = (t) => {
  const m = /^\[([A-Z][a-z]?)((?:[A-Z][a-z]?[₀-₉]*|\([A-Za-z₀-₉]+\)[₀-₉]*)+)\]([²³]?)([⁺⁻]?)$/u.exec(t); assert.ok(m, "không đọc được phức chất " + t);
  const L = [...m[2].matchAll(/\(([A-Za-z₀-₉]+)\)([₀-₉]*)|([A-Z][a-z]?)([₀-₉]*)/gu)].map((x) => ({ f: x[1] || x[3], k: x[2] || x[4] ? subV(x[2] || x[4]) : 1 }));
  L.forEach((l) => assert.ok(l.f in DIEN_PT, "chưa có điện tích của phối tử " + l.f));
  const q = m[4] ? (m[4] === "⁺" ? 1 : -1) * (m[3] ? SUP.indexOf(m[3]) : 1) : 0;
  return { M: m[1], L, n: sum(L.map((l) => l.k)), q, tam: q - sum(L.map((l) => l.k * DIEN_PT[l.f])) };
};
const ionTen = (k, q) => k + (q === 0 ? "" : (Math.abs(q) > 1 ? SUP[Math.abs(q)] : "") + (q > 0 ? "⁺" : "⁻"));
const phucTrong = (s) => [...new Set(String(s).match(PHUC_RE) || [])].filter((t) => !/^\[ML[₀-₉]*\]$/u.test(t));
// dạng hình học phổ biến của phức chất [MLₙ] (Bảng 28.1)
const HINH = { 4: ["tứ diện", "vuông phẳng"], 6: ["bát diện"] };
// ester RCOOR′ viết “HCOOC₂H₅”: muối sodium của gốc acid
const muoiEster = (f) => { const i = f.indexOf("COO"); assert.ok(i >= 0 && /^(H|C[₀-₉]*H[₀-₉]+)$/.test(f.slice(0, i)), "không đọc được ester " + f); return f.slice(0, i) + "COONa"; };
// số đồng phân cấu tạo của gốc alkyl CₖH₂ₖ₊₁– (k = 1…5); k = 0 là nguyên tử H
const ALKYL = [1, 1, 1, 2, 4, 8];
// amino acid: [số nhóm –NH₂, số nhóm –COOH] (Bài 9)
const AA = { Glycine: [1, 1], Alanine: [1, 1], Valine: [1, 1], Lysine: [2, 1], "Glutamic acid": [1, 2] };
// carbohydrate (Bài 4–6): loại, có bị thuỷ phân không
const CARB = { Glucose: "mono", Fructose: "mono", Saccharose: "di", Maltose: "di", "Tinh bột": "poly", Cellulose: "poly" };
// monomer của polymer (Bài 12, 13)
const MONOMER = { "CH₂=CHCl": "PVC", "CH₂=CH₂": "PE", "CH₂=CH–CH₃": "PP", "CH₂=CCl₂": "PVDC", "C₆H₅–CH=CH₂": "PS" };
const DONG_TRUNG_HOP = { styrene: "buna-S", acrylonitrile: "buna-N", isoprene: "cao su isoprene", "vinyl chloride": "PVC" };
// kim loại bị oxygen oxi hoá khi đun nóng (Bài 19: trừ vàng, bạc, platinum…)
const OXI_O2 = { Mg: true, Al: true, Fe: true, Cu: true, Zn: true, Na: true, Au: false, Ag: false, Pt: false };
// phương pháp tách kim loại thường dùng trong công nghiệp (Bài 20)
const TACH_KL = { Na: "điện phân nóng chảy muối chloride", K: "điện phân nóng chảy muối chloride", Mg: "điện phân nóng chảy muối chloride", Ca: "điện phân nóng chảy muối chloride",
  Al: "điện phân nóng chảy oxide", Fe: "nhiệt luyện", Zn: "nhiệt luyện", Cu: "nhiệt luyện", Ag: "thuỷ luyện", Au: "thuỷ luyện" };

/* ---------- bảng ghi trong script (theo sách Hoá học 10, 11, 12 Kết nối tri thức in năm 2026; câu khái niệm so với bảng) ---------- */
const BAI_HOC = {
  // Bài 6 (Hoá học 12): mạch cellulose không phân nhánh, xếp song song, liên kết hydrogen với nhau thành sợi
  soiBong: "các mạch cellulose xếp song song, liên kết hydrogen chặt với nhau",
  // Bài 8: dung dịch amine có tính base, tạo kết tủa Fe(OH)₃ màu nâu đỏ với muối iron(III)
  amineFe: "xuất hiện kết tủa màu nâu đỏ",
  // Hoá học 10, Bài 19: nồng độ chất phản ứng tăng thì tốc độ phản ứng tăng
  thoiKhi: "nồng độ oxygen",
  // Hoá học 11, Bài 8: pha loãng sulfuric acid đặc bằng cách rót từ từ acid vào nước
  phaLoang: "Rót từ từ acid vào nước, vừa rót vừa khuấy",
  // Hoá học 11, Bài 20: glycerol (polyalcohol có các nhóm –OH liền kề) hoà tan Cu(OH)₂
  glycerol: { "Cu(OH)₂": true, "quỳ tím": false, "dung dịch NaCl": false, "dung dịch HCl loãng": false },
  // Bài 25: CaO kết hợp với nước tạo Ca(OH)₂ (vôi sống hút ẩm)
  voiSong: "CaO kết hợp với hơi nước, tạo thành Ca(OH)₂",
  // Bài 29: hemoglobin chứa phức chất của Fe²⁺
  hemoglobin: "Fe²⁺",
  // Bài 2: thí nghiệm xà phòng hoá chất béo (xà phòng tách ra khi thêm dung dịch NaCl bão hoà; hydrocarbon không bị xà phòng hoá)
  xaPhongTN: [true, false, true, false],
  // Bài 22: sắt bị gỉ khi có đồng thời nước và oxygen
  giSat: [true, false, true, true],
  // Bài 12: polyethylene bền với nước, khó phân huỷ
  pe: [true, true, null, false],
  // Phiên N12-tn-hoahoc, Đề 2
  // Bài 4: nước bromine oxi hoá nhóm –CHO của glucose; fructose không phản ứng; Cu(OH)₂, thuốc thử Tollens cho hiện tượng như nhau
  gluFru: { "Nước bromine": true, "Cu(OH)₂ ở nhiệt độ thường": false, "Thuốc thử Tollens": false, "Quỳ tím": false },
  // Bài 6: tinh bột được tạo thành nhờ quá trình quang hợp
  taoTinhBot: "quang hợp",
  // Bài 13: nhóm amide của polyamide bị thuỷ phân trong môi trường kiềm, acid
  nylon: "các nhóm amide –CO–NH– trong mạch dễ bị thuỷ phân, làm sợi kém bền",
  // Bài 15: acquy là pin sạc (pin thứ cấp)
  acquy: "Pin sạc, nạp điện lại để dùng nhiều lần",
  // Bài 19: sắt đẩy đồng ra khỏi dung dịch muối
  dinhSat: "có lớp đồng màu đỏ bám trên đinh, dung dịch nhạt màu xanh",
  // Bài 25: vôi dùng khử chua đất; Bài 24: NaHCO₃ bị nhiệt phân giải phóng CO₂
  voiRuong: "khử chua, giảm độ acid của đất", botNo: "NaHCO₃ bị nhiệt phân, giải phóng khí CO₂",
  // Bài 6: thuỷ phân tinh bột, thử glucose bằng thuốc thử Tollens; Bài 10: protein đông tụ, phản ứng màu biuret, enzyme bị biến tính
  hoTinhBot: [true, true, false, true], longTrang: [true, false, true, false],
  // Bài 25: nước cứng, tính cứng tạm thời, vĩnh cửu
  nuocCung: [false, true, false, true],
  // Phiên N12-tn-hoahoc, Đề 3
  // Bài 6: trong nước nóng, tinh bột tạo dung dịch keo nhớt (hồ tinh bột), dùng làm chất làm đặc
  supSanh: "trong nước nóng, tinh bột tạo thành dung dịch keo nhớt",
  // Bài 4: sản xuất glucose từ tinh bột; Bài 10: enzyme protease xúc tác thuỷ phân protein; Bài 12: polymer không có nhiệt độ nóng chảy xác định
  protease: "xúc tác thuỷ phân protein trong vết bẩn thành chất dễ tan", sanXuatGlucose: "thuỷ phân tinh bột nhờ xúc tác acid hoặc enzyme", polyNongChay: "nóng chảy trong một khoảng nhiệt độ khá rộng",
  // Hoá học 11, Bài 7: SO₂ bị oxi hoá thành SO₃, tạo H₂SO₄ trong nước mưa; Bài 24: liên kết hydrogen giữa các phân tử carboxylic acid bền hơn
  muaAcid: "SO₂ bị oxi hoá thành SO₃, rồi kết hợp với nước tạo H₂SO₄", soiAcid: "liên kết hydrogen giữa các phân tử acid bền hơn",
  // Bài 15: thế điện cực chuẩn đo so với điện cực hydrogen chuẩn (quy ước bằng 0); Bài 21: điều chế hợp kim; Bài 27: đồng làm dây dẫn điện
  dienCucMoc: "điện cực hydrogen chuẩn", hopKim: "Nung chảy hỗn hợp các thành phần rồi để nguội", dayDien: "Đồng (Cu)",
  // Bài 4, 13: các ý về glucose, về vật liệu polymer
  glucoseTF: [true, false, false, true], vatLieu3: [true, true, false, true],
};
// amine ở thể khí ở điều kiện thường (Bảng 8.1)
const AMINE_KHI = { Methylamine: true, Ethylamine: true, Dimethylamine: true, Trimethylamine: true, Aniline: false, Propylamine: false, Isopropylamine: false, Butylamine: false };
// mắt xích của một số polymer (Bài 12)
const MAT_XICH = { polystyrene: "C₈H₈", polyethylene: "C₂H₄", polypropylene: "C₃H₆", "polybuta-1,3-diene": "C₄H₆" };
// vật liệu có khả năng kết dính (keo dán, Bài 13)
const KET_DINH = { "Keo dán epoxy": true, "Tơ nitron": false, "Cao su buna": false, "Nhựa polyethylene": false };
// quặng (Bài 20): kim loại được sản xuất chủ yếu từ quặng đó
const QUANG = { Bauxite: "Al", Hematite: "Fe", Magnetite: "Fe", Dolomite: "Mg, Ca" };
const NHOM = { Li: "IA", Na: "IA", K: "IA", Be: "IIA", Mg: "IIA", Ca: "IIA", Sr: "IIA", Ba: "IIA", Al: "IIIA" };
// sản phẩm điện phân dung dịch muối với điện cực trơ (Bài 16): cathode: ion kim loại sau nhôm bị khử, ion của kim loại mạnh thì nước bị khử;
// anode: Cl⁻, Br⁻, I⁻ bị oxi hoá, gốc oxoacid (SO₄²⁻, NO₃⁻) thì nước bị oxi hoá
const dienPhanDD = (muoi) => { const c = congThuc(muoi), kl = Object.keys(c).find((e) => KIM_LOAI.has(e)), goc = Object.keys(c).find((e) => !KIM_LOAI.has(e));
  return [E0_SACH[kl] > E0_SACH.Al ? kl : "khí H₂", ["Cl", "Br", "I"].includes(goc) && Object.keys(c).length === 2 ? "khí " + goc + "₂" : "khí O₂"]; };
// polymer có nguồn gốc thiên nhiên hay tổng hợp (Bài 12)
const NGUON_POLY = { Cellulose: "thiên nhiên", "Tinh bột": "thiên nhiên", Polyethylene: "tổng hợp", Polypropylene: "tổng hợp", "Poly(vinyl chloride)": "tổng hợp", Polystyrene: "tổng hợp" };
// hydrocarbon không no làm mất màu nước bromine (Hoá học 11, Bài 16)
const MAT_MAU_BR = { Ethylene: true, Acetylene: true, Methane: false, Ethane: false, "Carbon dioxide": false };
// alcohol R′OH tạo ra khi thuỷ phân ester RCOOR′
const ruouEster = (f) => { const i = f.indexOf("COO"); assert.ok(i >= 0, "không đọc được ester " + f); return f.slice(i + 3) + "OH"; };
// số oxi hoá của nguyên tố el trong chất f: đơn chất là 0
const soOxh = (f, el) => (Object.keys(congThuc(f)).length === 1 ? 0 : oxh(f, el));
// cấu hình electron “1s²2s²2p⁶3s²3p¹”: số electron, chu kì, số electron lớp ngoài cùng (nhóm A khi electron cuối điền vào phân lớp s, p)
const docCHe = (s) => { const pl = [...s.matchAll(/(\d)([spdf])([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g)].map((m) => ({ n: +m[1], l: m[2], e: supV(m[3]) }));
  const n = Math.max(...pl.map((p) => p.n)); return { e: sum(pl.map((p) => p.e)), chuKi: n, ngoai: sum(pl.filter((p) => p.n === n).map((p) => p.e)), cuoi: pl[pl.length - 1].l }; };
const LA_MA = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

/* ---------- các mục kiểm tra của từng đề (RIENG; phiên thêm đề thì thêm một khoá mới) ----------
   has: đoạn chữ của đề bài; right(q, d): đáp án tính bằng code, d là chữ của đoạn thông tin dùng chung (rỗng nếu câu không có): câu nhiều
   lựa chọn trả về lựa chọn đúng, câu đúng/sai 4 ý trả về mảng 4 ý, câu trả lời ngắn trả về số chưa làm tròn. */
const RIENG = {
  "hoahoc12-tn-de1": [
    { has: "Đun nóng ethyl formate", right: (q) => { const f = /\(([^)]+)\)/.exec(q.q)[1], pt = ptCua(q, f, "NaOH"); assert.ok(canBang(pt));
      return muoiEster(f); } },
    { has: "có thể là thành phần chính của một bánh xà phòng", right: (q) => motCai(q, (o) => { const m = /^C([₀-₉]+)H[₀-₉]+COO(?:Na|K)$/.exec(o); return !!m && subV(m[1]) >= 11; }) },
    { has: "Chất nào không bị thuỷ phân?", right: (q) => tra(q, CARB, "mono") },
    { has: "vậy mà áo bông giặt nhiều lần vẫn không bị nước hoà tan", right: () => BAI_HOC.soiBong },
    { has: "Nhỏ từ từ dung dịch ethylamine vào dung dịch Fe(NO₃)₃", right: (q) => { const pt = ptCua(q, "C₂H₅NH₂", "Fe(NO₃)₃"); assert.ok(tach(pt)[1].some((s) => s.f === "Fe(OH)₃")); return BAI_HOC.amineFe; } },
    { has: "amino acid nào sau đây làm quỳ tím chuyển sang màu xanh", right: (q) => motCai(q, (o) => { assert.ok(o in AA, "chưa có amino acid " + o); return AA[o][0] > AA[o][1]; }) },
    { has: "Poly(vinyl chloride) (PVC)", right: (q) => tra(q, MONOMER, "PVC") },
    { has: "Cao su buna-S", right: (q) => tra(q, DONG_TRUNG_HOP, "buna-S") },
    { has: "Khi nhóm lò than", right: () => BAI_HOC.thoiKhi },
    { has: "pha loãng dung dịch sulfuric acid đặc", right: () => BAI_HOC.phaLoang },
    { has: "một ống đựng dung dịch glycerol", right: (q) => tra(q, BAI_HOC.glycerol, true) },
    { has: "Khi pin Galvani Zn – Cu hoạt động", right: (q) => {
      const [a, b] = /pin Galvani ([A-Z][a-z]?) – ([A-Z][a-z]?)/.exec(q.q).slice(1), e = e0De(q.x);
      assert.ok(gan(e[a], E0_SACH[a]) && gan(e[b], E0_SACH[b]), "lời giải ghi E° của hai cặp");
      const an = E0_SACH[a] < E0_SACH[b] ? a : b; assert.ok(/điện cực kẽm/.test(q.q) && an === "Zn", "hỏi điện cực là anode");
      return an + " bị oxi hoá thành ion " + ION[an]; } },
    { has: "Pin nào sau đây có sức điện động chuẩn nhỏ nhất?", right: (q, d) => {
      const e = e0De(d); assert.equal(Object.keys(e).length, 4, "đoạn thông tin cho bốn cặp");
      const sdd = (o) => { const [x, y] = /^Pin ([A-Z][a-z]?) – ([A-Z][a-z]?)$/.exec(o).slice(1); assert.ok(e[x] < e[y], "tên pin ghi anode trước: " + o); return e[y] - e[x]; };
      const v = q.o.map(sdd), m = Math.min(...v); assert.equal(v.filter((x) => gan(x, m)).length, 1); return q.o[v.findIndex((x) => gan(x, m))]; } },
    { has: "Cho bột sắt (lấy dư) vào dung dịch chứa đồng thời Cu(NO₃)₂ và AgNO₃", right: (q, d) => {
      const e = e0De(d), kl = ["Cu", "Ag"].filter((m) => e[m] > e.Fe), ran = new Set(["Fe", ...kl]);
      ["Fe + 2Ag⁺ → Fe²⁺ + 2Ag", "Fe + Cu²⁺ → Fe²⁺ + Cu"].forEach((p) => { coX(q, p); assert.ok(canBang(p)); });
      return motCai(q, (o) => { const s = o.split(/, | và /); return s.length === ran.size && s.every((x) => ran.has(x)); }); } },
    { has: "Kim loại nào không bị oxygen oxi hoá?", right: (q) => { ["2Mg + O₂ → 2MgO", "4Al + 3O₂ → 2Al₂O₃", "3Fe + 2O₂ → Fe₃O₄"].forEach((p) => coX(q, p)); return tra(q, Object.fromEntries(q.o.map((o) => [o, OXI_O2[kiHieu(o)]])), false); } },
    { has: "khi điện phân nóng chảy muối chloride của nó", right: (q) => motCai(q, (o) => TACH_KL[kiHieu(o)] === "điện phân nóng chảy muối chloride") },
    { has: "gói nhỏ đựng vôi sống (CaO)", right: (q) => { coX(q, "CaO + H₂O → Ca(OH)₂"); return BAI_HOC.voiSong; } },
    { has: "Hemoglobin, chất giúp máu vận chuyển oxygen", right: () => BAI_HOC.hemoglobin },
    { has: "Mỗi ý sau về PE đúng hay sai?", right: (q) => { const [M] = so(q.o[2], "phân tử khối trung bình #"), [k] = so(q.o[2], "của mẫu là #");
      const a = BAI_HOC.pe.slice(); a[2] = gan(M / KL("C₂H₄"), k); return a; } },
    { has: "cho vào bát sứ một ít mỡ lợn", right: () => BAI_HOC.xaPhongTN },
    { has: "Để tìm hiểu điều kiện gỉ sắt", right: () => BAI_HOC.giSat },
    { has: "Muối [Co(NH₃)₆]Cl₃ tan trong nước", right: (q) => {
      const p = docPhuc("[Co(NH₃)₆]³⁺"), moi = docPhuc(/\[CoCl\(NH₃\)₅\][²³]?[⁺⁻]/.exec(q.o[2])[0]), [nM] = so(q.o[3], "Hoà tan # mol"), [nCl] = so(q.o[3], "thu được # mol ion Cl⁻");
      return [/ion (Co[²³]?⁺)/.exec(q.o[0])[1] === ionTen(p.M, p.tam), p.n === 6 && HINH[p.n].includes("bát diện") && q.o[1].includes("bát diện"),
        moi.n === p.n && moi.tam === p.tam, gan(nCl, 3 * nM)]; } },
    { has: "một trong hai sản phẩm là formic acid", right: (q) => { const c = congThuc(/phân tử ([A-Z][A-Za-z₀-₉]+)/.exec(q.q)[1]);
      assert.ok(c.O === 2 && c.H === 2 * c.C, "ester no, đơn chức"); return ALKYL[c.C - 1]; } },
    { has: "Biến thiên enthalpy chuẩn của phản ứng C₂H₂(g) + 2H₂(g) → C₂H₆(g)", right: (q) => { const [a] = so(q.q, "C₂H₂(g) +# kJ/mol"), [c] = so(q.q, "C₂H₆(g) # kJ/mol");
      const pt = ptTrong(q).find((p) => p.includes("C₂H₆")); assert.ok(pt && heSo(pt, "H₂") === 2); return c - (a + 2 * 0); } },
    { has: "để sản xuất cellulose trinitrate", right: (q) => { const nt = ntDe(q), [m] = so(q.q, "Cho # tấn cellulose"), [h] = so(q.q, "hiệu suất #%");
      return (m * KL("C₆H₇O₂(ONO₂)₃", nt)) / KL("C₆H₁₀O₅", nt) * h / 100; } },
    { has: "Có bao nhiêu tripeptide mà mỗi phân tử chứa đúng một gốc", right: (q) => { const k = (q.q.match(/một gốc/g) || []).length; let f = 1; for (let i = 2; i <= k; i++) f *= i; return f; } },
    { has: "Có bao nhiêu nguyên tố kim loại trong các nguyên tố trên?", right: (q) => { const ds = [...q.q.matchAll(/([A-Z][a-z]?) \(Z = (\d+)\)/g)];
      ds.forEach((m) => assert.equal(+m[2], Z_NT[m[1]], "số hiệu nguyên tử của " + m[1])); return ds.filter((m) => KIM_LOAI.has(m[1])).length; } },
    { has: "Một loại viên nhai chữa ợ chua", right: (q) => { const nt = ntDe(q), [m] = so(q.q, "chứa # g NaHCO₃"), k = soChu(q.q, "nhai", "viên"), [C] = so(q.q, "HCl nồng độ # M");
      const pt = ptCua(q, "NaHCO₃", "HCl"); return (molTheoPT(pt, "NaHCO₃", (k * m) / KL("NaHCO₃", nt), "HCl") / C) * 1000; } },
  ],
  "hoahoc12-tn-de2": [
    { has: "một trong các sản phẩm thu được là methanol", right: (q) => { coX(q, "CH₃COOCH₃ + H₂O ⇌ CH₃COOH + CH₃OH"); return motCai(q, (o) => ruouEster(o) === "CH₃OH"); } },
    { has: "Xà phòng hoá hoàn toàn 0,1 mol ester X", right: (q) => { const nt = ntDe(q), [nX] = so(q.q, "hoàn toàn # mol ester X"), [m] = so(q.q, "thu được # g muối khan"), ct = congThuc(/phân tử ([A-Z][A-Za-z₀-₉]+)/.exec(q.q)[1]);
      q.o.forEach((o) => assert.deepEqual(congThuc(o), ct, "lựa chọn đúng công thức phân tử: " + o)); return motCai(q, (o) => gan(KL(muoiEster(o), nt), m / nX)); } },
    { has: "Thuốc thử nào sau đây phân biệt được hai dung dịch đó?", right: (q) => tra(q, BAI_HOC.gluFru, true) },
    { has: "tinh bột được tạo ra từ khí carbon dioxide và nước", right: () => BAI_HOC.taoTinhBot },
    { has: "Cho ethylamine tác dụng với nitrous acid", right: (q) => { const pt = ptCua(q, "C₂H₅NH₂", "HONO"), sp = tach(pt)[1].map((s) => s.ten); assert.ok(sp.includes("N₂"), "có khí nitrogen");
      return motCai(q, (o) => o === "C₂H₅NH₂".replace("NH₂", "OH") && sp.includes(o)); } },
    { has: "Thuỷ phân hoàn toàn 1 mol pentapeptide X", right: (q) => {
      const TEN = { glycine: "Gly", alanine: "Ala", valine: "Val" }, kho = [];
      [...q.q.matchAll(/(\d) mol (glycine|alanine|valine)/g)].forEach((m) => { for (let i = 0; i < +m[1]; i++) kho.push(TEN[m[2]]); });
      assert.equal(kho.length, 5, "pentapeptide có 5 gốc"); const doan = [...q.q.matchAll(/(?:Gly|Ala|Val)(?:-(?:Gly|Ala|Val))+/g)].map((m) => m[0]);
      const hv = (a) => (a.length <= 1 ? [a] : a.flatMap((x, i) => hv(a.slice(0, i).concat(a.slice(i + 1))).map((r) => [x].concat(r))));
      const hop = [...new Set(hv(kho).map((a) => a.join("-")))].filter((s) => doan.every((d) => ("-" + s + "-").includes("-" + d + "-")));
      assert.equal(hop.length, 1, "chỉ một trình tự khớp các đoạn: " + hop.join(", ")); q.o.forEach((o) => assert.deepEqual(o.split("-").sort(), kho.slice().sort(), "lựa chọn đủ 5 gốc: " + o)); return hop[0]; } },
    { has: "Chất nào sau đây là polymer thiên nhiên?", right: (q) => tra(q, NGUON_POLY, "thiên nhiên") },
    { has: "Quần áo may bằng vải nylon-6,6", right: () => BAI_HOC.nylon },
    { has: "Phản ứng nhiệt nhôm", right: (q) => { const pt = boTrangThai(q.q).match(PT)[0], [tg, sp] = tach(pt).map((v) => v.map((s) => s.f));
      return motCai(q, (o) => tg.includes(o) && Object.keys(congThuc(o)).filter((e) => e !== "O").some((e) => { const s = sp.find((f) => congThuc(f)[e]); return soOxh(s, e) > soOxh(o, e); })); } },
    { has: "là cơ sở của quá trình sản xuất ammonia", right: (q) => { const pt = boTrangThai(q.q).match(PT)[0], [tg, sp] = tach(pt), dn = sum(sp.map((s) => s.k)) - sum(tg.map((s) => s.k)), toa = /ΔrH°298 < 0/.test(q.q);
      const huong = (o) => (/xúc tác/.test(o) ? 0 : /áp suất/.test(o) ? (/^Tăng/.test(o) ? -Math.sign(dn) : Math.sign(dn)) : /nhiệt độ/.test(o) ? (/^Tăng/.test(o) ? (toa ? -1 : 1) : (toa ? 1 : -1)) : NaN);
      q.o.forEach((o) => assert.ok(!isNaN(huong(o)), "chưa đọc được thay đổi: " + o)); return motCai(q, (o) => huong(o) === 1); } },
    { has: "Khí nào làm nước bromine mất màu?", right: (q) => tra(q, MAT_MAU_BR, true) },
    { has: "Acquy chì lắp trên xe máy", right: () => BAI_HOC.acquy },
    { has: "Điện phân NaCl nóng chảy với các điện cực trơ. Quá trình xảy ra ở cathode là", right: (q) => motCai(q, (o) => { const [l, r] = tach(o); return l.some((s) => s.e) && l.some((s) => s.q > 0) && r.some((s) => s.ten === "Na"); }) },
    { has: "Nguyên tử aluminium (Z = 13) có cấu hình electron", right: (q) => { const c = docCHe(/cấu hình electron ([0-9spdf⁰¹²³⁴⁵⁶⁷⁸⁹]+)/.exec(q.q)[1]); assert.equal(c.e, 13); assert.ok("sp".includes(c.cuoi));
      return "chu kì " + c.chuKi + ", nhóm " + LA_MA[c.ngoai] + "A"; } },
    { has: "Thả một chiếc đinh sắt đã cạo sạch gỉ", right: (q) => { const e = e0De(q.x); assert.ok(e.Fe < e.Cu); coX(q, "Fe + CuSO₄ → FeSO₄ + Cu"); return BAI_HOC.dinhSat; } },
    { has: "Nông dân thường rải vôi", right: () => BAI_HOC.voiRuong },
    { has: "Bột nở (thành phần chính là NaHCO₃)", right: (q) => { coX(q, "2NaHCO₃ → Na₂CO₃ + CO₂ + H₂O"); return BAI_HOC.botNo; } },
    { has: "Số oxi hoá của manganese trong KMnO₄ là", right: () => "+" + oxh("KMnO₄", "Mn") },
    { has: "Để tìm hiểu sự thuỷ phân tinh bột", right: () => BAI_HOC.hoTinhBot },
    { has: "Mỗi ý sau về lòng trắng trứng", right: () => BAI_HOC.longTrang },
    { has: "Lắp một pin Galvani: lá kẽm nhúng trong dung dịch ZnSO₄ 1 M", right: (q) => { const e = e0De(q.q), [v] = so(q.o[2], "khoảng # V");
      return [e.Zn < e.Cu && /từ lá kẽm sang lá đồng/.test(q.o[0]), /lá đồng nhẹ đi/.test(q.o[1]) ? false : null, Math.abs(e.Cu - e.Zn - v) < 0.01, e.Ag - e.Zn > e.Cu - e.Zn && /tăng lên/.test(q.o[3])]; } },
    { has: "Mỗi ý sau về nước cứng đúng hay sai?", right: () => BAI_HOC.nuocCung },
    { has: "glucose lên men rượu", right: (q) => { const nt = ntDe(q), [m] = so(q.q, "Cho # g glucose"), [h] = so(q.q, "hiệu suất #%"), pt = ptCua(q, "C₆H₁₂O₆", "C₂H₅OH");
      return molTheoPT(pt, "C₆H₁₂O₆", m / KL("C₆H₁₂O₆", nt), "C₂H₅OH") * h / 100 * KL("C₂H₅OH", nt); } },
    { has: "magnesium có ba đồng vị", right: (q) => { const [p24] = so(q.q, "²⁴Mg chiếm #%"), [p25] = so(q.q, "²⁵Mg chiếm #%"); assert.ok(/còn lại là ²⁶Mg/.test(q.q));
      return (24 * p24 + 25 * p25 + 26 * (100 - p24 - p25)) / 100; } },
    { has: "Hệ số polymer hoá trung bình của mẫu PVC này", right: (q) => { const [M] = so(q.q, "phân tử khối trung bình là #"); return M / KL("C₂H₃Cl", ntDe(q)); } },
    { has: "Hoà tan hoàn toàn 5,4 g bột nhôm", right: (q) => { const nt = ntDe(q), vm = vmDe(q), [m] = so(q.q, "hoàn toàn # g bột nhôm"), pt = ptCua(q, "Al", "H₂");
      return molTheoPT(pt, "Al", m / nt.Al, "H₂") * vm; } },
    { has: "quặng magnetite có", right: (q) => { const nt = ntDe(q), [p] = so(q.q, "có #% khối lượng là Fe₃O₄"); assert.ok(/Với mỗi tấn quặng/.test(q.q));
      return ((1000 * p) / 100 / KL("Fe₃O₄", nt)) * congThuc("Fe₃O₄").Fe * nt.Fe; } },
    { has: "Ion phức này có bao nhiêu phối tử?", right: (q) => docPhuc(/\[Ag\(NH₃\)₂\]⁺/.exec(q.q)[0]).n },
  ],
  "hoahoc12-tn-de3": [
    { has: "Công thức nào sau đây là công thức của một chất béo?", right: (q) => motCai(q, (o) => { const m = /^\(C([₀-₉]+)H[₀-₉]+COO\)₃C₃H₅$/.exec(o); return !!m && subV(m[1]) >= 11; }) },
    { has: "glucose được sản xuất chủ yếu bằng cách", right: () => BAI_HOC.sanXuatGlucose },
    { has: "Một lúc sau súp sánh lại vì", right: () => BAI_HOC.supSanh },
    { has: "amine nào sau đây là chất khí?", right: (q) => tra(q, AMINE_KHI, true) },
    { has: "Thuỷ phân hoàn toàn tetrapeptide Ala-Gly-Ala-Val", right: (q) => { const p = /tetrapeptide ((?:Gly|Ala|Val)(?:-(?:Gly|Ala|Val)){3})/.exec(q.q)[1]; return String(new Set(p.split("-")).size); } },
    { has: "bột giặt có chứa enzyme protease", right: () => BAI_HOC.protease },
    { has: "Khi được đun nóng, phần lớn các polymer", right: () => BAI_HOC.polyNongChay },
    { has: "thu được số mol CO₂ gấp đôi số mol H₂O", right: (q) => { coX(q, "C₈H₈ + 10O₂ → 8CO₂ + 4H₂O"); return motCai(q, (o) => { assert.ok(o in MAT_XICH, "chưa có mắt xích của " + o); const c = congThuc(MAT_XICH[o]); return c.C === 2 * (c.H / 2); }); } },
    { has: "gắn chặt hai bề mặt gỗ, kim loại hay sứ", right: (q) => tra(q, KET_DINH, true) },
    { has: "được tạo thành nhờ liên kết ion?", right: (q) => motCai(q, (o) => Object.keys(congThuc(o)).some((e) => KIM_LOAI.has(e))) },
    { has: "là một nguyên nhân gây mưa acid", right: (q) => { coX(q, "2SO₂ + O₂ → 2SO₃", "SO₃ + H₂O → H₂SO₄"); return BAI_HOC.muaAcid; } },
    { has: "Acetic acid (CH₃COOH, phân tử khối 60) sôi ở 118 °C", right: (q) => { assert.equal(KL("CH₃COOH"), KL("C₃H₇OH")); return BAI_HOC.soiAcid; } },
    { has: "Điện cực làm mốc đó là", right: (q) => { assert.ok(/quy ước bằng 0/.test(q.q)); return BAI_HOC.dienCucMoc; } },
    { has: "Điện phân dung dịch CuCl₂ với hai điện cực trơ", right: (q) => { coX(q, "CuCl₂ → Cu + Cl₂"); const [ca, an] = dienPhanDD("CuCl₂"); return ca + " và " + an; } },
    { has: "nên được dùng làm pháo sáng?", right: (q) => { coX(q, "2Mg + O₂ → 2MgO"); return tra(q, Object.fromEntries(q.o.map((o) => [o, NHOM[kiHieu(o)] || "khác"])), "IIA"); } },
    { has: "Hợp kim thường được chế tạo bằng cách nào sau đây?", right: () => BAI_HOC.hopKim },
    { has: "Dẫn từ từ 2,479 L khí CO₂ vào 150 mL dung dịch NaOH 1 M", right: (q) => { const vm = vmDe(q), [v] = so(q.q, "Dẫn từ từ # L khí CO₂"), [V] = so(q.q, "vào # mL"), [C] = so(q.q, "NaOH # M");
      const r = (V / 1000) * C / (v / vm); return r >= 2 ? (r > 2 ? "Na₂CO₃ và NaOH" : "chỉ có Na₂CO₃") : r > 1 ? "Na₂CO₃ và NaHCO₃" : "chỉ có NaHCO₃"; } },
    { has: "làm lõi dây dẫn điện trong nhà?", right: (q) => { assert.ok(q.o.every((o) => CH[kiHieu(o)]), "lựa chọn là kim loại chuyển tiếp dãy thứ nhất"); return BAI_HOC.dayDien; } },
    { has: "Mỗi ý sau về glucose đúng hay sai?", right: (q) => { coX(q, "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂"); return BAI_HOC.glucoseTF; } },
    { has: "Mỗi ý sau về một số vật liệu polymer đúng hay sai?", right: () => BAI_HOC.vatLieu3 },
    { has: "Tiến hành ba thí nghiệm ở điều kiện thường: (1) cho lá kẽm", right: (q) => { const e = e0De(q.q);
      return [e.Zn < e.Pb && /chì bám lên lá kẽm/.test(q.o[0]), e.Cu < e.Ag && /màu xanh/.test(q.o[1]), e.Ag < e.Cu, e.Pb > e.Cu && /Pb²⁺ có tính oxi hoá mạnh hơn ion Cu²⁺/.test(q.o[3])]; } },
    { has: "thì dung dịch chuyển dần sang màu vàng lục", right: (q) => { const a = docPhuc("[Cu(H₂O)₆]²⁺"), b = docPhuc("[CuCl₄]²⁻"), pt = boTrangThai(q.o[0]).match(PT)[0], [tg, sp] = tach(pt);
      assert.ok(canBang(pt)); const [ct] = so(q.o[1], "mang điện tích +#");
      return [a.M === b.M && a.tam === b.tam, ct === b.tam, b.n < a.n, sp.some((s) => s.ten === "H₂O") && tg.some((s) => s.ten === "[Cu(H₂O)₆]²⁺")]; } },
    { has: "Một mẫu chất béo có 80% khối lượng là tristearin", right: (q) => { const nt = ntDe(q), [p] = so(q.q, "có #% khối lượng là tristearin"), pt = ptCua(q, "(C₁₇H₃₅COO)₃C₃H₅", "C₃H₅(OH)₃");
      return molTheoPT(pt, "(C₁₇H₃₅COO)₃C₃H₅", (1000 * p) / 100 / KL("(C₁₇H₃₅COO)₃C₃H₅", nt), "C₃H₅(OH)₃") * KL("C₃H₅(OH)₃", nt); } },
    { has: "Xét phản ứng Mg + 2HCl → MgCl₂ + H₂ trong dung dịch", right: (q) => { const [c1, c2] = so(q.q, "giảm từ # M xuống # M"), [t] = so(q.q, "Sau # phút"), pt = boTrangThai(q.q).match(PT)[0];
      return (c1 - c2) / t / heSo(pt, "HCl"); } },
    { has: "Cho 9 g ethylamine (C₂H₅NH₂) tác dụng vừa đủ", right: (q) => { const nt = ntDe(q), [m] = so(q.q, "Cho # g ethylamine"), pt = ptCua(q, "C₂H₅NH₂", "C₂H₅NH₃Cl");
      return molTheoPT(pt, "C₂H₅NH₂", m / KL("C₂H₅NH₂", nt), "C₂H₅NH₃Cl") * KL("C₂H₅NH₃Cl", nt); } },
    { has: "Magnesium được sản xuất bằng cách điện phân MgCl₂ nóng chảy", right: (q) => { const nt = ntDe(q), [m] = so(q.q, "Từ # tấn MgCl₂"), [h] = so(q.q, "hiệu suất #%"), pt = ptCua(q, "MgCl₂", "Mg");
      return molTheoPT(pt, "MgCl₂", m / KL("MgCl₂", nt), "Mg") * nt.Mg * h / 100; } },
    { has: "Có bao nhiêu kim loại thuộc nhóm IIA?", right: (q) => { const ds = /kim loại: ([^.]+)\./.exec(q.q)[1].split(", "); ds.forEach((k) => assert.ok(k in NHOM, "chưa có nhóm của " + k)); return ds.filter((k) => NHOM[k] === "IIA").length; } },
    { has: "Ion Cu²⁺ có bao nhiêu electron ở phân lớp 3d?", right: (q) => { const [d, s] = so(q.q, "có # electron ở phân lớp 3d và # electron ở phân lớp 4s"), c = docCH(CH.Cu); assert.ok(d === c.d && s === c.s); coX(q, ionCH(CH.Cu, 2)); return docCH(ionCH(CH.Cu, 2)).d; } },
  ],
};

/* ---------- đề và danh mục: số đề, số câu lấy từ danh mục ---------- */
const soDe = (id) => +/de(\d+)$/.exec(id)[1];
const DE = BANKS.filter((b) => /^hoahoc12-tn-de\d+$/.test(b.id)).sort((a, b) => soDe(a.id) - soDe(b.id));
assert.ok(DE.length >= 1, "chưa có đề Hoá học thi thử tốt nghiệp nào trong danh mục");
DE.forEach((b, i) => assert.equal(b.id, "hoahoc12-tn-de" + (i + 1), "mã đề phải liên tiếp từ hoahoc12-tn-de1"));
const TN = EVENTS.find((e) => e.id === "tn-thpt-2027");
const P1 = "Phần I. Trắc nghiệm nhiều lựa chọn", P2 = "Phần II. Trắc nghiệm đúng sai", P3 = "Phần III. Trả lời ngắn";
const KHUNG = [[P1, "mc", 18, 0.25], [P2, "tf4", 4, 1], [P3, "num", 6, 0.25]];
// chủ đề lớp 12: đúng chữ chủ đề của ba kho Hoá học 12 (cuối kì I, giữa kì II, cuối năm); chương theo thứ tự bài của sách
const KHO = BANKS.filter((b) => b.file === "12-hoahoc.js" && b.pool), CD12 = new Set(KHO.flatMap((b) => Object.keys(b.pool.matrix)));
const CHUONG = [["Ester – Lipid", ["Ester – Lipid", "Xà phòng và chất giặt rửa"]],
  ["Carbohydrate", ["Giới thiệu về carbohydrate. Glucose và fructose", "Saccharose và maltose", "Tinh bột và cellulose"]],
  ["Hợp chất chứa nitrogen", ["Amine", "Amino acid và peptide", "Protein và enzyme"]],
  ["Polymer", ["Đại cương về polymer", "Vật liệu polymer"]],
  ["Pin điện và điện phân", ["Thế điện cực và nguồn điện hoá học", "Điện phân"]],
  ["Đại cương về kim loại", ["Cấu tạo và liên kết trong tinh thể kim loại", "Tính chất vật lí và tính chất hoá học của kim loại", "Kim loại trong tự nhiên và phương pháp tách kim loại", "Hợp kim", "Sự ăn mòn kim loại"]],
  ["Nguyên tố nhóm IA và nhóm IIA", ["Nguyên tố nhóm IA", "Nguyên tố nhóm IIA"]],
  ["Kim loại chuyển tiếp dãy thứ nhất và phức chất", ["Đại cương về kim loại chuyển tiếp dãy thứ nhất", "Sơ lược về phức chất", "Một số tính chất và ứng dụng của phức chất"]]];
const chuong = (t) => CHUONG.findIndex(([, ts]) => ts.includes(t));
assert.deepEqual([...CD12].sort(), CHUONG.flatMap(([, ts]) => ts).sort(), "chủ đề của ba kho Hoá học 12 đúng tám chương");
// câu lớp 10, 11: “Lớp 10 · ”, “Lớp 11 · ” và tên chương trong mục lục của sách (README của cuốn ở OnUp-Book)
const CHUONG_10 = ["Cấu tạo nguyên tử", "Bảng tuần hoàn các nguyên tố hoá học và định luật tuần hoàn", "Liên kết hoá học", "Phản ứng oxi hoá – khử", "Năng lượng hoá học", "Tốc độ phản ứng", "Nguyên tố nhóm halogen"];
const CHUONG_11 = ["Cân bằng hoá học", "Nitrogen – Sulfur", "Đại cương về hoá học hữu cơ", "Hydrocarbon", "Dẫn xuất halogen – Alcohol – Phenol", "Hợp chất carbonyl – Carboxylic acid"];
const lop = (t) => (CD12.has(t) ? 12 : /^Lớp 10 · /.test(t) && CHUONG_10.includes(t.slice(9)) ? 10 : /^Lớp 11 · /.test(t) && CHUONG_11.includes(t.slice(9)) ? 11 : 0);
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
  assert.deepEqual([b.title, b.grade, b.subject, b.minutes, b.pts, b.file, !!b.pool], ["Hóa học 12 · Thi thử tốt nghiệp · Đề " + soDe(b.id), 12, "Hóa học", 50, 10, "12-hoahoc.js", false], at + ": danh mục");
  assert.ok(TN && TN.banks.includes(b.id) && TN.grades.includes(12) && TN.subjects.includes("Hóa học"), at + ": phải gắn vào tn-thpt-2027");
  let k = 0;
  KHUNG.forEach(([part, type, so_, pt]) => { const ph = qs.slice(k, k + so_); k += so_;
    assert.ok(ph.length === so_ && ph.every((q) => q.part === part && q.type === type && q.pt === pt), at + ": " + part + " gồm " + so_ + " câu " + type + ", mỗi câu " + pt + " điểm"); });
  assert.equal(k, qs.length, at + ": đề có đúng 28 câu theo khung 18 – 4 – 6");
  const G = Quiz.grade(qs, qs.map(() => null));
  assert.ok(G.max === 10 && G.got === 0, at + ": Quiz.grade: tối đa 10 điểm");
  assert.deepEqual(G.parts.map((p) => [p.part, p.max]), [[P1, 4.5], [P2, 4], [P3, 1.5]], at + ": điểm tối đa từng phần 4,5 – 4 – 1,5");
  const dem = (a, c, f) => qs.slice(a, c).filter(f).length;
  // mức độ như đề tham khảo năm 2025 (Biết và Hiểu khoảng 80% số ý)
  assert.deepEqual([1, 2, 3].map((l) => dem(0, 18, (q) => q.lv === l)), [11, 5, 2], at + ": Phần I 11 Biết, 5 Hiểu, 2 Vận dụng");
  assert.deepEqual(qs.slice(18, 22).map((q) => q.lv).sort(), [1, 2, 2, 3], at + ": Phần II bốn câu ghi mức 1, 2, 2, 3");
  assert.deepEqual([1, 2, 3].map((l) => dem(22, 28, (q) => q.lv === l)), [1, 3, 2], at + ": Phần III 1 Biết, 3 Hiểu, 2 Vận dụng");
  // phạm vi: chủ đề lớp 12 đúng chữ của ba kho, lớp 10, 11 theo tên chương; 2 câu lớp 10 (Phần I, Phần III), 2 câu lớp 11 (Phần I)
  qs.forEach((q, i) => assert.ok(lop(q.topic), at + "#" + (i + 1) + ": chủ đề lạ “" + q.topic + "”"));
  assert.deepEqual([[0, 18], [18, 22], [22, 28]].map(([a, c]) => [10, 11].map((l) => dem(a, c, (q) => lop(q.topic) === l))), [[1, 2], [0, 0], [1, 0]], at + ": câu lớp 10, 11 ở từng phần");
  // đủ tám chương của Hoá học 12; trong mỗi phần, câu lớp 12 theo thứ tự chương
  assert.deepEqual([...new Set(qs.filter((q) => lop(q.topic) === 12).map((q) => chuong(q.topic)))].sort(), [0, 1, 2, 3, 4, 5, 6, 7], at + ": đủ tám chương của Hoá học 12");
  [[0, 18], [18, 22], [22, 28]].forEach(([a, c]) => { const ch = qs.slice(a, c).filter((q) => lop(q.topic) === 12).map((q) => chuong(q.topic));
    ch.forEach((v, i) => i && assert.ok(v >= ch[i - 1], at + ": câu lớp 12 theo thứ tự chương trong từng phần")); });
  // Phần II có ít nhất một câu về thí nghiệm (dụng cụ, cách làm, hiện tượng)
  assert.ok(qs.slice(18, 22).some((q) => /thí nghiệm|ống nghiệm|bát sứ|đèn cồn|vôn kế|cầu muối/.test(q.q)), at + ": Phần II có câu về thí nghiệm");
  // đoạn thông tin dùng chung: chỉ ở Phần I, nhiều nhất một cặp câu liền nhau
  const ps = Object.keys(b.passages || {});
  ps.forEach((p) => { const idx = qs.map((q, i) => (q.p === p ? i : -1)).filter((i) => i >= 0); assert.ok(idx.length === 2 && idx[1] === idx[0] + 1 && idx[1] < 18, at + ": đoạn " + p + " dùng cho đúng hai câu liền nhau ở Phần I");
    assert.ok(b.passages[p].title && b.passages[p].text && !/câu \d/i.test(b.passages[p].title + b.passages[p].text), at + ": đoạn " + p + " có tên, có chữ, không ghi số câu (đề “Ôn chủ đề” rút câu với số khác)"); });
  assert.ok(ps.length <= 1 && qs.every((q) => !q.p || ps.includes(q.p)), at + ": nhiều nhất một đoạn thông tin dùng chung");
  // lời dặn: số câu, số điểm, số câu mỗi lớp tính từ dữ liệu
  const c12 = dem(0, 28, (q) => lop(q.topic) === 12), c11 = dem(0, 28, (q) => lop(q.topic) === 11), c10 = dem(0, 28, (q) => lop(q.topic) === 10);
  ["Quyết định 764/QĐ-BGDĐT", "thí điểm thi trên máy tính", `đề có ${c12} câu Hoá học 12, ${c11} câu Hoá học 11 và ${c10} câu Hoá học 10`,
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
  qs.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x + " " + (q.o || []).join(" ")), at + ": nhắc vị trí của phương án: " + q.q.slice(0, 50)));
});
assert.ok(Object.values(KIEU).every((c) => c <= 3), "một kiểu Đ/S dùng quá ba lần trong các đề thi thử: " + JSON.stringify(KIEU));
// câu nhiều lựa chọn: đáp án đúng không là lựa chọn duy nhất có chữ của nhãn chủ đề; ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có
{
  const chuThuong = (s) => String(s).normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean), loi = [];
  DE.forEach((b) => b.questions.forEach((q, i) => {
    if (q.type !== "mc") return;
    const at = b.id + "#" + (i + 1), c = chuThuong(q.topic.replace(/^Lớp 1[01] · /, "")), tu = c.length === 1 ? c : c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số|lên)( |$)/u.test(w));
    tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); if (co[0] && !co.slice(1).some(Boolean)) loi.push(`${at}: chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề`); });
    const dau = q.o.map((o) => o.split(" ")[0]);
    if (dau.slice(1).every((d) => d === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1) loi.push(at + ": ba lựa chọn sai cùng mở đầu bằng “" + dau[1] + "”");
  }));
  assert.deepEqual(loi, [], "câu nhiều lựa chọn có gợi ý từ chữ của lựa chọn");
}

/* ---------- chữ ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.unit || [], (q.rubric || []).map((c) => c.c)).map(String);
let soPT = 0;
{
  const loi = [], kt = (ok, m) => ok || loi.push(m);
  DE.forEach((b) => {
    const doan = Object.values(b.passages || {}).flatMap((p) => [p.title, p.text]);
    b.questions.map((q) => [b.id + ": " + q.q.slice(0, 50), chu(q)]).concat([[b.id + ": đoạn thông tin, lời dặn", doan.concat(b.note)]]).forEach(([at, ss]) => ss.forEach((s) => {
      // số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân (năm viết liền)
      kt(!/(?<![,\d])\d{4,}/.test(s.replace(/[Nn]ăm (\d{4})/g, "năm").replace(/QĐ-BGDĐT/g, "")) && !/\d\.\d/.test(s), at + ": số viết sai cách: " + s.slice(0, 120));
      kt(!/(?:^|[^\p{L}])(?:[A-Z][a-z]?)+\d/u.test(s.replace(/\d+\/QĐ/g, "")), at + ": công thức cần chữ số dưới dòng: " + s.slice(0, 120));
      kt(!/(?<![\p{L}])(?:hóa|hòa|thủy|tỏa|hủy|tùy|khỏe|lũy)(?![\p{L}])/iu.test(s), at + ": dấu thanh kiểu mới: " + s.slice(0, 120));
      kt(!/(?<![\p{L}])(?:axit|bazơ|clo|clorua|natri|kali|liti|magie|brom|iot|hiđro|hidro|cacbon|nitơ|oxi(?! hoá)|sunfat|sunfua|nitrat|amoniac|sođa|crom|coban|niken|mangan|titan|bari|canxi|xút ăn da|oxy hoá|số phối trí|este|glixerol|anilin|glyxin|alanin|etanol|metanol|benzen|etilen|axetilen|xenlulozơ|saccarozơ|glucozơ|fructozơ|mantozơ|tinh bột hồ hoá)(?![\p{L}])/iu.test(s), at + ": tên chất, thuật ngữ khác sách: " + s.slice(0, 120));
      kt(!/\d°C|\d ?oC\b/.test(s), at + ": đơn vị viết khác sách: " + s.slice(0, 120));
      const t = boTrangThai(s);
      (t.match(PT) || []).forEach((pt) => { kt(canBang(pt), at + ": phương trình chưa cân bằng: " + pt); soPT++; });
      kt(!/→|⇌/.test(t.replace(PT, "")), at + ": mũi tên ngoài phương trình: " + s.slice(0, 120));
      e0De(s);
      phucTrong(s).forEach((p) => { const x = docPhuc(p); kt(x.tam >= 0 && x.tam <= 4, at + ": điện tích của nguyên tử trung tâm trong " + p); });
    }));
  });
  assert.deepEqual(loi, [], "chữ viết khác quy ước");
}
assert.ok(soPT > 0, "có phương trình hoá học");

/* ---------- so với ba kho Hoá học 12 và giữa các đề thi thử: đề bài không trùng, không gần trùng; đáp án không trùng câu cùng chủ đề ---------- */
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const khongDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const TU_CHUNG = [...CD12, ...CHUONG.map((c) => c[0]), ...CHUONG_10, ...CHUONG_11, "mỗi ý sau đúng hay sai", "làm tròn kết quả đến hàng phần trăm", "làm tròn kết quả đến hàng phần mười",
  "làm tròn kết quả đến hàng đơn vị", "hiện tượng quan sát được là", "bằng bao nhiêu", "là bao nhiêu", "nào sau đây", "sau khi các phản ứng xảy ra hoàn toàn", "sau khi phản ứng xảy ra hoàn toàn", "cho thế điện cực chuẩn", "thế điện cực chuẩn của",
  "thể tích mol khí ở điều kiện chuẩn", "ở điều kiện chuẩn, mỗi mol khí chiếm thể tích", "ở điều kiện chuẩn", "nguyên tử khối", "có bao nhiêu", "đề thi thử theo cấu trúc đề thi tốt nghiệp thpt từ năm 2025",
  "năm 2027 thí điểm thi trên máy tính ở nơi đủ điều kiện, đề như thi giấy"]
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
// công thức hoá học (từ có chữ số dưới dòng như “C₅H₁₀O₂”, “CH₃CH₂–”) không phải câu chữ: tách chuỗi ở đó (chữ OCR đọc công thức thành “ch ch ch”)
const boCT = (s) => String(s).split(/(\s+)/).map((w) => (/[₀-₉ₙ]/.test(w) ? " | " : w)).join("");
const chuoi = (s, k) => { let t = " " + khongDau(boCT(s)) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const ten = new Map();
DE.forEach((b) => b.questions.forEach((q, i) => ten.set(q, b.id.replace("hoahoc12-", "") + "#" + (i + 1))));
const KHO_Q = BANKS.filter((b) => b.file === "12-hoahoc.js" && !b.pool && !/^hoahoc12-tn-/.test(b.id)).flatMap((b) => b.questions.map((q, i) => { ten.set(q, b.id.replace("hoahoc12-", "") + "#" + (i + 1)); return Object.assign(q, { _de: b.id }); }));
const TNQ = DE.flatMap((b) => b.questions.map((q) => Object.assign(q, { _de: b.id, _d: dpOf(b, q) })));
{
  const ds = BANKS.filter((b) => b.file === "12-hoahoc.js" && !b.pool).flatMap((b) => b.questions.map((q) => ({ q, k: gocChu(q.q) })));
  TNQ.forEach((q) => assert.deepEqual(ds.filter((e) => e.k === gocChu(q.q)).map((e) => ten.get(e.q)), [ten.get(q)], "đề bài trùng câu khác trong 12-hoahoc.js"));
  // cặp hai âm tiết liền nhau (như tests/vatli12-tn.js): đề bài cùng các lựa chọn có từ 4 cặp chung với một câu của ba kho và số cặp chung từ một
  // nửa số cặp của câu ít cặp hơn thì báo; không tính cặp có số hay chữ đơn, cặp của nhãn chủ đề, cụm chung và cặp có ở từ 3% số câu của file.
  // Giữa các đề thi thử (cùng cách hỏi của đề tốt nghiệp) chỉ so chuỗi 6 từ.
  const CUM = ["mỗi ý sau đúng hay sai", "làm tròn kết quả đến hàng phần trăm", "làm tròn kết quả đến hàng phần mười", "làm tròn kết quả đến hàng đơn vị",
    "ở điều kiện chuẩn, mỗi mol khí chiếm thể tích"];
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
      if (!/^hoahoc12-tn-/.test(p._de) && chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size)) gan_.push(`${ten.get(q)} ~ ${ten.get(p)}: ${chung.join(", ")}`);
      const s = " " + khongDau(p.q) + " "; chuoi(q.q, 6).forEach((x) => { if (s.includes(" " + x + " ")) gan6.push(ten.get(q) + " ~ " + ten.get(p) + ": " + x); });
      if (p.topic !== q.topic) return;
      if (q.type === "mc" && p.type === "mc" && gocChu(q.o[0]) === gocChu(p.o[0])) trung.push(ten.get(q) + " ~ " + ten.get(p) + ": đáp án trùng câu cùng chủ đề");
      if (q.type === "num" && p.type === "num" && gan(q.ans, p.ans) && (q.unit || "") === (p.unit || "")) trung.push(ten.get(q) + " ~ " + ten.get(p) + ": đáp án số trùng câu cùng chủ đề");
    });
  });
  assert.deepEqual([...new Set(gan_)], [], "đề bài gần trùng (cặp hai âm tiết) câu khác");
  assert.deepEqual([...new Set(gan6)], [], "đề bài gần trùng (chuỗi 6 từ) câu khác");
  assert.deepEqual(trung, [], "đáp án trùng câu cùng chủ đề");
}

/* ---------- dò lộ đáp án (như tests/vatli12-tn.js) ----------
   Đề cố định: mọi câu cùng hiện, đoạn thông tin cùng hiện, lời dặn hiện ở màn mở đề; đề “Ôn chủ đề” rút chung câu cùng chủ đề của các đề thi
   thử và ba kho Hoá học 12 (kèm đoạn thông tin của câu). Đáp án là số (trả lời ngắn, lựa chọn đúng dạng “5,35 tấn”; từ hai chữ số, hoặc số
   thập phân) tìm ở vị trí kết quả của câu kia (ngay sau “=”, “≈”, “là”, “bằng”, “được”; không tính số đứng trước một phép tính, nguyên tử khối
   trong “(Cho …)”, số hiệu nguyên tử “Z = 11”) cùng đơn vị: không được có. Đáp án bằng chữ tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ
   trở xuống thì lấy cả đáp án); chuỗi có trong đề bài, lựa chọn, lời giải, đoạn thông tin của câu kia thì in ra với DO_LO=1 để xem tay, danh
   sách đã xem ở DA_XEM. */
const DON_VI = "(?:kJ\\/mol|kJ|g\\/mol|mol\\/L|g\\/cm³|mL|mg|kg|tấn|mol|L|M|V|%|°C|K|g)";
const soDV = new RegExp("^(" + NUM + ")(?: ?\\(?(" + DON_VI + ")\\)?)?$", "u");
const KQ = new RegExp("(?:=|≈|(?:^|[\\s(])(?:là|bằng|được))\\s+(" + NUM + ")(?![\\d,⁰¹²³⁴⁵⁶⁷⁸⁹π√])(?!\\s*[·+−:×/](?:\\s|\\d|\\())(?: ?\\(?(" + DON_VI + ")(?![\\p{L}]))?", "gu");
const boSoCho = (s) => String(s).replace(/\(Cho [^)]*\)/g, " ").replace(/Z = \d+/g, " ");
const kqSo = (s) => [...boSoCho(s).matchAll(KQ)].map((x) => ({ v: val(x[1]), u: x[2] || "" }));
const tuCua = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum3 = (s) => { const w = tuCua(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
// chuỗi 3 từ chung của môn (thuật ngữ, cách nói của bài học) không làm lộ đáp án nào: bỏ qua khi là một phần của đáp án dài hơn
const CUM_CHUNG = new Set(["dung dịch naoh", "phản ứng xảy ra", "kết tủa màu", "liên kết hydrogen", "+ e →", "bị thuỷ phân", "tác dụng với", "trong dung dịch", "bị oxi hoá", "các phân tử", "hỗn hợp các"]);
const chuP = (p) => (p.type === "note" ? [p.x] : chu(p).concat(p._d ? [p._d] : []));
const NOTES = DE.map((b) => { const o = { q: b.id + "-note", x: [b.note].concat(Object.values(b.passages || {}).map((p) => p.title + ". " + p.text)).join(" | "), topic: "note", type: "note", _de: b.id }; ten.set(o, b.id.replace("hoahoc12-", "") + "-note"); return o; });
const doLo = (qs, them, cap) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    let soDa = [], C = [];
    if (q.type === "num") soDa = [{ v: q.ans, u: q.unit || "" }];
    else if (q.type === "mc") { const x = soDV.exec(q.o[0]); if (x) soDa = [{ v: val(x[1]), u: x[2] || "" }]; else { const c3 = cum3(q.o[0]), sai = q.o.slice(1).map((o) => " " + tuCua(o).join(" ") + " ");
      // chuỗi có ở từ hai lựa chọn sai thì không chỉ ra được lựa chọn đúng
      C = [...new Set(c3.length > 1 ? c3.filter((c) => !CUM_CHUNG.has(c)) : c3)].filter((c) => sai.filter((o) => o.includes(" " + c + " ")).length < 2); } }
    soDa = soDa.filter((d) => Math.abs(d.v) >= 10 || !Number.isInteger(d.v));
    qs.concat(them).forEach((p) => {
      if (p === q || !cap(p, q)) return;
      const at = `${ten.get(p)} → ${ten.get(q)}: `, T = " " + chuP(p).map((s) => tuCua(s).join(" ")).join(" | ") + " ";
      soDa.filter((d) => chuP(p).flatMap(kqSo).some((y) => gan(y.v, d.v) && (!y.u || !d.u || y.u === d.u))).forEach((d) => lo.push(at + vn(d.v) + " " + d.u));
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
// trong một đề (mọi câu cùng hiện) và với lời dặn, đoạn thông tin của đề
const r1 = doLo(TNQ, NOTES, (p, q) => p._de === q._de);
// cùng chủ đề (đề “Ôn chủ đề”): câu của đề thi thử với câu cùng chủ đề của đề thi thử khác và của ba kho (trừ câu tự luận)
const onCD = TNQ.concat(KHO_Q.filter((q) => q.type !== "essay" && TNQ.some((t) => t.topic === q.topic)));
const r2 = doLo(onCD, [], (p, q) => p.topic === q.topic && p._de !== q._de && (/^hoahoc12-tn-/.test(p._de) || /^hoahoc12-tn-/.test(q._de)));
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu khác (xem tay):\n" + [...r1.chuLo, ...r2.chuLo].join("\n"));
// Đã xem tay (Phiên N12-tn-hoahoc): chữ của đáp án có ở câu khác nhưng không chỉ ra đáp án.
// Đề 1: “Fe²⁺” trong cách ghi thế điện cực chuẩn (câu 13, 14, đoạn thông tin) không chỉ ra phức chất trong hemoglobin; “Đồng (Cu)”, “Bạc (Ag)”
// là lựa chọn sai của câu tách kim loại, của các câu kho; “Platinum (Pt)” là lựa chọn của câu nhiệt độ nóng chảy ở kho; “oxi hoá thành” trong
// lời giải câu kim loại tác dụng với oxygen là cách nói chung; câu kho về fructose (mạch hở, mật ong) không nói fructose không bị thuỷ phân; lời
// giải câu pin Ni – Ag của kho nêu cách xác định anode, không nêu quá trình ở điện cực kẽm; câu kho về tính chất của Zn, Cu, Ag với acid không
// nói phần sắt dư; các tripeptide chứa đoạn Gly-Ala không cho biết Gly-Ala có phản ứng màu biuret hay không.
const DA_XEM = [
  "tn-de1#13 → tn-de1#18: fe²⁺", "tn-de1#14 → tn-de1#18: fe²⁺", "tn-de1-note → tn-de1#18: fe²⁺",
  "ck1-de1#5 → tn-de1#3: fructose", "ck1-de2#5 → tn-de1#3: fructose", "gk2-de1#9 → tn-de1#14: cu và ag",
  "tn-de1#26 → ck1-de2#14: gly ala", "tn-de1#16 → gk2-de2#15: bạc ag", "tn-de1#15 → tn-de1#12: oxi hoá thành", "gk2-de2#7 → tn-de1#15: platinum pt",
  // Đề 2: CH₃COOC₂H₅ nhắc ở lời giải câu tên ester của kho (đồng phân) không cho biết phân tử khối muối; các trình tự Ala-Gly-Val, Gly-Val-Ala
  // ở lời giải câu đếm tripeptide (Đề 1) và Gly-Ala ở câu biuret của kho không chỉ ra trình tự của pentapeptide (các đoạn đã cho ở đề bài);
  // “+7” là lựa chọn sai của câu số oxi hoá của chromium; “nước bromine” ở câu ethylene không cho biết cách phân biệt glucose, fructose;
  // Ca(OH)₂ ở câu bón vôi không nói vôi sống kết hợp với nước; câu nhôm tác dụng với HCl không nói về phản ứng nhiệt nhôm; câu phân biệt
  // glucose, fructose không nói fructose có bị thuỷ phân hay không.
  "ck1-de1#1 → tn-de2#2: ch₃cooc₂h₅", "ck1-de2#14 → tn-de2#6: ala gly val", "tn-de1#26 → tn-de2#6: ala gly val", "tn-de1#26 → tn-de2#6: gly val ala",
  "tn-de2#6 → ck1-de2#14: gly ala", "ck2-de1#15 → tn-de2#18: +7", "tn-de2#11 → tn-de2#3: nước bromine", "tn-de2#16 → tn-de1#17: ca oh ₂",
  "tn-de2#26 → tn-de2#9: al", "tn-de2#3 → tn-de1#3: fructose",
  // Đề 3: polystyrene, magnesium, đồng, fructose, aniline chỉ là lựa chọn sai (hay nhắc trong lời giải) của câu kia, không nói tỉ lệ CO₂ : H₂O khi đốt
  // polystyrene, magnesium cháy sáng, đồng làm dây dẫn điện, fructose có bị thuỷ phân hay không, aniline có làm quỳ tím đổi màu hay không;
  // Gly-Ala trong tetrapeptide Ala-Gly-Ala-Val không cho biết dipeptide Gly-Ala có phản ứng màu biuret hay không.
  "ck1-de2#18 → tn-de3#8: polystyrene", "tn-de2#7 → tn-de3#8: polystyrene", "ck2-de1#9 → tn-de3#16: magnesium mg", "ck2-de2#15 → tn-de3#18: đồng cu",
  "tn-de3#2 → tn-de1#3: fructose", "tn-de3#4 → ck1-de2#10: aniline", "tn-de3#5 → ck1-de2#14: gly ala"];
assert.deepEqual([...r1.chuLo, ...r2.chuLo].sort(), [...DA_XEM].sort(), "đáp án bằng chữ có ở câu khác đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual([...r1.lo, ...r2.lo], [], "lộ đáp án:\n" + [...r1.lo, ...r2.lo].join("\n"));

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (nếu có) ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const truongChu = (q) => (q.type === "note" ? [q.x] : chu(q));
// tra nhanh: các chuỗi k từ của chữ đề thi thử (Map chuỗi → các nhãn), đi một lượt qua chữ nguồn đã chuẩn hoá; trả về Map chuỗi → các mã nguồn có chuỗi đó
const chuoiDe = (k, them) => { const m = new Map(); TNQ.concat(NOTES).forEach((q) => new Set(truongChu(q).concat(them && q._d ? [q._d] : []).flatMap((x) => chuoi(x, k))).forEach((c) => { if (!m.has(c)) m.set(c, []); m.get(c).push(q); })); return m; };
const timChuoi = (nguon, k, ds) => {
  const dau = new Set([...ds.keys()].map((c) => c.split(" ").slice(0, 2).join(" "))), ra = new Map();
  nguon.forEach(({ id, t }) => { const w = t.split(" "); for (let i = 0; i + k <= w.length; i++) { if (!dau.has(w[i] + " " + w[i + 1])) continue; const c = w.slice(i, i + k).join(" ");
    if (ds.has(c)) { if (!ra.has(c)) ra.set(c, new Set()); ra.get(c).add(id); } } });
  return ra;
};
if (SACH.length) {
  assert.ok(SACH.some((f) => /hoa-hoc-12/.test(f)), "OnUp-Book có Hoá học 12");
  // chủ đề đúng tên bài trong mục lục (README của Hoá học 12), tên chương lớp 10, 11 đúng mục lục (README của Hoá học 10, 11)
  const ml = (l, c) => { const f = path.join(BOOK, l, c, "README.md"); return fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null; };
  const r12 = ml("lop-12", "hoa-hoc-12"), r10 = ml("lop-10", "hoa-hoc-10"), r11 = ml("lop-11", "hoa-hoc-11");
  if (r12) { const bai = [...r12.matchAll(/Bài (\d+)\. ([^|]+?) \|/g)].map((x) => x[2].trim()); CD12.forEach((t) => assert.ok(bai.includes(t), "chủ đề đúng tên bài trong mục lục: " + t)); }
  const hoa = (s) => s.normalize("NFC").toLocaleUpperCase("vi");
  if (r10) { const ch = [...r10.matchAll(/\*\*Chương \d+\. ([^*]+)\*\*/g)].map((x) => hoa(x[1].trim())); CHUONG_10.forEach((t) => assert.ok(ch.includes(hoa(t)), "tên chương Hoá học 10: " + t)); }
  if (r11) { const ch = [...r11.matchAll(/\*\*Chương \d+\. ([^*]+)\*\*/g)].map((x) => hoa(x[1].trim())); CHUONG_11.forEach((t) => assert.ok(ch.includes(hoa(t)), "tên chương Hoá học 11: " + t)); }
  const sach = SACH.map((f) => ({ id: f, t: khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")) }));
  const bao = (k) => { const ds = chuoiDe(k), gap = timChuoi(sach, k, ds); return [...gap.keys()].flatMap((c) => ds.get(c).map((q) => `${ten.get(q)}: ${c}`)); };
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách và mục lục.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả ba kho Hoá học 12 và giữa các đề thi thử ---------- */
{
  const cua = (b, q) => ({ id: b.id, t: chu(q).concat(dpOf(b, q) ? [dpOf(b, q)] : []).map(khongDau).join(" | ") });
  const khac = BANKS.filter((b) => !b.pool).flatMap((b) => b.questions.map((q) => cua(b, q))).concat(BANKS.filter((b) => b.pool).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cua(b, q))));
  const bao = (k) => { const ds = chuoiDe(k, true), gap = timChuoi(khac, k, ds);
    return [...gap.keys()].flatMap((c) => ds.get(c).flatMap((q) => [...gap.get(c)].filter((id) => id !== q._de).map((id) => `${ten.get(q)} ~ ${id}: ${c}`))); };
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}

/* ---------- tự thử các bộ đọc với giá trị biết trước và với phương trình, phức chất, câu cố ý viết sai ---------- */
{
  const tim = (has) => TNQ.find((q) => q.q.includes(has));
  // phương trình: cân bằng cả nguyên tố và điện tích, có electron, kí hiệu trạng thái, hệ số n
  assert.ok(canBang("Fe + 2Ag⁺ → Fe²⁺ + 2Ag") && !canBang("Fe + Ag⁺ → Fe²⁺ + Ag") && !canBang("Fe + 2Ag⁺ → Fe³⁺ + 2Ag"));
  assert.ok(canBang("Cu²⁺ + 2e → Cu") && !canBang("Cu²⁺ + e → Cu") && canBang(boTrangThai("CaO(s) + H₂O(l) → Ca(OH)₂(s)")));
  assert.deepEqual(boTrangThai("2H₂(g) + O₂(g) → 2H₂O(l) và CaCO₃(s)").match(PT), ["2H₂ + O₂ → 2H₂O"]);
  assert.ok(canBang("[Co(NH₃)₆]Cl₃ → [Co(NH₃)₆]³⁺ + 3Cl⁻") && !canBang("[Co(NH₃)₆]Cl₃ → [Co(NH₃)₆]³⁺ + Cl⁻"));
  assert.equal(KL("C₆H₇O₂(ONO₂)₃"), 297); assert.equal(KL("C₆H₁₀O₅"), 162); assert.equal(KL("NaHCO₃"), 84);
  const p = docPhuc("[CoCl(NH₃)₅]²⁺"); assert.ok(p.M === "Co" && p.n === 6 && p.tam === 3);
  assert.throws(() => docPhuc("[Co(XY₃)₆]³⁺"), /phối tử/); assert.equal(muoiEster("CH₃COOC₂H₅"), "CH₃COONa"); assert.throws(() => muoiEster("C₂H₅OH"));
  assert.throws(() => e0De("E°(Zn²⁺/Zn) = −0,76 V"), /đúng bảng/);
  assert.equal(ionCH(CH.Fe, 3), "[Ar]3d⁵"); assert.equal(oxh("K₂Cr₂O₇", "Cr"), 6); assert.equal(oxh("MnO₄", "Mn", -1), 7);
  // bộ dò lộ bắt được câu cố ý viết sai: lời giải câu khác có “= 5,35 tấn”, “là 200 mL”; cụm chữ của đáp án bằng chữ
  const thu = (qs) => { const r = doLo(qs, [], () => true); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  const ghi = (q, x) => { const o = Object.assign({}, q, { x: q.x + " " + x }); ten.set(o, "thử-giả"); return o; };
  const khac = tim("Cho các nguyên tố: Na (Z = 11)"), qCel = tim("để sản xuất cellulose trinitrate"), qNa = tim("Một loại viên nhai chữa ợ chua"), qAn = tim("Nhỏ từ từ dung dịch ethylamine");
  [khac, qCel, qNa, qAn].forEach((q) => ten.set(q, "thử"));
  assert.deepEqual(thu([qCel, ghi(khac, "Ví dụ m = 5,35 tấn.")]), ["5,35 tấn"]);
  assert.deepEqual(thu([qCel, ghi(khac, "Ví dụ m = 5,35 kg.")]), []);
  assert.deepEqual(thu([qNa, ghi(khac, "Thể tích cần là 200 mL.")]), ["200 mL"]);
  assert.deepEqual(thu([qNa, ghi(khac, "(Cho Na = 200.) Z = 200.")]), []);
  assert.ok(thu([qAn, ghi(khac, "Khi đó xuất hiện kết tủa màu nâu đỏ.")]).length > 0);
}
DE.forEach((b) => console.log(`${b.id}: ${b.questions.length} câu (${b.questions.filter((q) => q.type === "mc").length} nhiều lựa chọn, ${b.questions.filter((q) => q.type === "tf4").length} đúng/sai 4 ý, ${b.questions.filter((q) => q.type === "num").length} trả lời ngắn), ` +
  `${Object.keys(b.passages || {}).length} đoạn thông tin; đáp án đúng dài nhất hoặc ngắn nhất ở ${b._le}/18 câu nhiều lựa chọn.`));
console.log(n + " câu đã tính lại hoặc so với bảng (" + soPT + " phương trình hoá học).");
console.log("MATH OK");
