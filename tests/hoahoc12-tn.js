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
// chủ đề của các đề thi thử và ba kho Hoá học 12 (đề “Ôn chủ đề” rút chung; số trong khoảng tol của đáp án cũng tính; đáp án bằng chữ
// đã xem ghi ở DA_XEM; câu đúng/sai 4 ý không dò được bằng code, phiên tự đọc). Có ../OnUp-Book thì so mọi
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
const supN = (k) => [...String(k)].map((c) => (c === "-" ? "⁻" : SUP[+c])).join(""), subN = (k) => [...String(k)].map((c) => SUB[+c]).join("");
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
const vmDe = (q) => { const m = new RegExp("(?:thể tích mol khí (?:ở điều kiện chuẩn là )?(" + NUM + ") L\\/mol|một mol khí chiếm (" + NUM + ") L|thể tích của một mol khí là (" + NUM + ") L)", "u").exec(q.q);
  assert.ok(m && val(m[1] || m[2] || m[3]) === VM && /điều kiện chuẩn/.test(q.q), "thể tích mol khí ở điều kiện chuẩn"); return VM; };
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
const PHUC_RE = new RegExp(PHUC + "[²³⁴]?[⁺⁻]?", "gu");
const docPhuc = (t) => {
  const m = /^\[([A-Z][a-z]?)((?:[A-Z][a-z]?[₀-₉]*|\([A-Za-z₀-₉]+\)[₀-₉]*)+)\]([²³⁴]?)([⁺⁻]?)$/u.exec(t); assert.ok(m, "không đọc được phức chất " + t);
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
  // Phiên N12-tn-hoahoc, Đề 4
  // Bài 1: isoamyl acetate có mùi chuối chín (dầu chuối); Bài 5: maltose dùng sản xuất bia; Bài 6: glucose chưa dùng đến được chuyển thành glycogen dự trữ trong gan, cơ
  dauChuoi: "Isoamyl acetate", maltose: "sản xuất bia", glycogen: "Glycogen",
  // Bài 10: protein với nitric acid tạo sản phẩm rắn màu vàng; Bài 13: cao su lưu hoá có cầu nối disulfide, tạo mạng không gian
  protNitric: "có kết tủa màu vàng", luuHoa: "giữa các mạch polymer có cầu nối –S–S–, tạo cấu trúc mạng không gian",
  // Hoá học 10, Bài 21: NaClO trong nước Javel tẩy màu, khử trùng; Hoá học 11, Bài 11: tách hai chất lỏng không tan vào nhau bằng phễu chiết;
  // Hoá học 11, Bài 5: muối ammonium tác dụng với base giải phóng NH₃
  javel: "NaClO", pheuChiet: "Phễu chiết", damVoi: "muối ammonium tác dụng với vôi giải phóng khí NH₃, làm mất đạm",
  // Bài 16: cryolite hạ nhiệt độ nóng chảy khi điện phân Al₂O₃; Bài 24: soda làm mềm nước; Bài 25: CO₂ dư hoà tan CaCO₃; Bài 19, 27: chromium cứng nhất
  // (Bài 19: kim loại kiềm mềm nhất, cắt được bằng dao; câu kim loại mềm chọn lựa chọn thuộc nhóm IA)
  cryolite: "hạ nhiệt độ nóng chảy của hỗn hợp, tiết kiệm năng lượng", soda: "làm mềm nước cứng", voiTrong: "có kết tủa trắng, rồi kết tủa tan dần đến hết", cungNhat: "Chromium (Cr)",
  // Bài 1: omega-3 là acid béo không no, vitamin A, D, E, K tan trong chất béo, chất béo cho nhiều năng lượng hơn tinh bột, cộng hydrogen vào dầu thực vật
  chatBeo4: [false, true, false, true],
  // Phiên N12-tn-hoahoc-b, Đề 5
  // Bài 2: xà phòng sản xuất bằng cách đun chất béo với dung dịch kiềm (NaOH, KOH)
  nauKiem: "dung dịch NaOH hoặc KOH",
  // Bài 4: trong môi trường kiềm, glucose và fructose chuyển hoá qua lại; Bài 5: saccharose gồm một gốc α-glucose và một gốc β-fructose;
  // Bài 6: enzyme amylase trong nước bọt thuỷ phân tinh bột
  fruTollens: "trong môi trường kiềm, fructose chuyển hoá một phần thành glucose", saccharose: "một gốc α-glucose và một gốc β-fructose",
  amylase: "enzyme amylase trong nước bọt thuỷ phân một phần tinh bột",
  // Bài 8: aniline tác dụng với nước bromine tạo kết tủa trắng 2,4,6-tribromoaniline
  anilineBr: "có kết tủa trắng",
  // Hoá học 11, Bài 15: LPG chứa propane và butane; Hoá học 11, Bài 24: formic acid có trong nọc kiến
  lpg: "propane và butane", nocKien: "formic acid",
  // Bài 16: tinh chế đồng bằng điện phân với anode bằng đồng thô (anode tan)
  anodeTan: "Cu của anode bị oxi hoá, anode mòn dần",
  // Bài 6: thuỷ phân hoàn toàn cellulose chỉ thu được glucose; cellulose không tan trong nước, kể cả khi đun nóng
  celluloseGlucose: true, celluloseTan: false,
  // Bài 12, 13: nylon-6,6 tổng hợp bằng phản ứng trùng ngưng hexamethylenediamine với adipic acid, có tách nước; monomer trùng ngưng cần hai
  // nhóm chức có khả năng phản ứng (liên kết đôi C=C là điều kiện của trùng hợp); polymer có phân tử khối trung bình
  nylon66: [true, true, false, false],
  // Bài 25: nhiệt phân CaCO₃ là phản ứng thu nhiệt
  nungDaVoiToaNhiet: false,
  // Phiên N12-tn-hoahoc-b, Đề 6
  // Bài 2: ion Ca²⁺, Mg²⁺ của nước cứng tạo với anion của acid béo muối khó tan, xà phòng mất tác dụng; Bài 6: cellulose làm giấy lấy từ gỗ, tre, nứa
  nuocCungXP: "Ca²⁺, Mg²⁺ kết hợp với anion acid béo thành muối khó tan", giay: "gỗ, tre, nứa",
  // Bài 12, 13: capron (nylon-6) có mắt xích –NH–(CH₂)₅–CO–; cao su tự nhiên lấy từ mủ cây cao su
  capron: "capron", muCaoSu: "mủ cây cao su",
  // Hoá học 11, Bài 20: phenol tác dụng với nước bromine tạo kết tủa trắng 2,4,6-tribromophenol
  phenolBr: "có kết tủa trắng",
  // Bài 24: từ Li đến Cs, bán kính nguyên tử tăng, tính khử tăng; Bài 21: hợp kim thường cứng hơn kim loại thành phần (ví dụ hợp kim Au – Cu)
  kNa: "potassium nhường electron dễ hơn sodium", hopKimCung: true,
  // Phiên N12-tn-hoahoc-b, Đề 7
  // Bài 4: glucose và fructose là đồng phân; Bài 6: cơ thể người không có enzyme thuỷ phân cellulose; Bài 13: nhựa vá săm là dung dịch
  // cao su trong dung môi hữu cơ
  dongPhan: "đồng phân của nhau", khongEnzyme: "người không có enzyme thuỷ phân cellulose",
  // Bài 12: poly(vinyl acetate) tác dụng với dung dịch NaOH (phản ứng giữ nguyên mạch) tạo poly(vinyl alcohol) và CH₃COONa
  pvaNaOH: "CH₃COONa",
  vaSam: "dung dịch cao su trong dung môi hữu cơ",
  // Hoá học 11, Bài 4: liên kết ba trong phân tử N₂ rất bền; Bài 16: điện phân dung dịch muối của kim loại mạnh với gốc oxoacid thực chất là
  // điện phân nước; Bài 27: Cu(OH)₂ màu xanh lam
  n2: "liên kết ba trong phân tử N₂ rất bền", dienPhanNuoc: "chỉ có nước bị điện phân", cuOH2: "xanh lam",
  // Bài 1: chất béo (triester) với methanol tạo ba methyl ester và glycerol (alcohol đa chức); Bài 13: chất dẻo, ô nhiễm, tái chế
  biodiesel: [false, true, false, true], chatDeo: [false, false, true, true],
  // Phiên N12-tn-hoahoc-b, Đề 8
  // Bài 1: lipid gồm chất béo, sáp, steroid, phospholipid; Bài 2: nước quả bồ kết,
  // bồ hòn có tác dụng giặt rửa; Bài 4: đun nóng glucose với Cu(OH)₂ trong môi trường kiềm tạo Cu₂O màu đỏ gạch; Bài 8: ở 0 – 5 °C aniline
  // tác dụng với nitrous acid tạo muối diazonium; Bài 10: protein đông tụ bởi nhiệt, acid, kiềm, muối
  boKet: "tẩy rửa được các vết bẩn bám trên tóc, vải", cu2o: "đỏ gạch", diazonium: "muối diazonium",
  dongTuAcid: "protein bị đông tụ do acid trong nước chanh",
  // Bài 13: keo dán poly(urea-formaldehyde) là chất kết dính trong gỗ ván ép; Hoá học 11, Bài 16: đèn xì oxygen – acetylene dùng để hàn, cắt kim loại
  keoUF: "dán các tấm gỗ mỏng thành ván ép", denXi: "Acetylene",
  // Bài 21: hợp kim có nhiều tính chất hoá học tương tự kim loại thành phần, tính chất vật lí thường khác nhiều; Bài 25: Be, Mg có cấu trúc lục
  // phương, Ca, Sr lập phương tâm mặt, Ba lập phương tâm khối; Bài 29: chlorophyll (chất diệp lục) là phức chất của Mg²⁺
  hopKimSoSanh: "có tính chất hoá học tương tự, còn tính chất vật lí có thể khác nhiều", iiaCauTruc: "chúng có kiểu cấu trúc tinh thể khác nhau", chlorophyll: "Mg²⁺",
  // Hoá học 11, Bài 24 và Hoá học 12, Bài 1: phản ứng ester hoá cần H₂SO₄ đặc (xúc tác, hút nước), là phản ứng thuận nghịch; NaOH thuỷ phân ester
  esterHoa: [false, true, true, true],
};
// môi trường của một số chất dùng trong nhà (giấm chứa acetic acid; nước vôi, nước xà phòng có môi trường base)
const TINH_ACID = { "Giấm ăn": "acid", "Đường kính": "trung tính", "Nước vôi": "base", "Nước xà phòng": "base" };
// số đồng phân cấu tạo của amine no, đơn chức, mạch hở CₙH₂ₙ₊₃N
const DP_AMINE = { 1: 1, 2: 2, 3: 4, 4: 8 };
// chất có liên kết C=C nên tham gia được phản ứng trùng hợp (Bài 12)
const LIEN_KET_BOI = { Propane: false, Ethylene: true, Styrene: true, "Vinyl chloride": true };
// màu ngọn lửa của ion kim loại (Bài 24, 25)
const MAU_LUA = { Li: "đỏ tía", Na: "vàng", K: "tím nhạt", Ca: "đỏ cam", Sr: "đỏ son", Ba: "lục" };
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
// tên ester RCOOR′: tên gốc R′ (của alcohol) rồi tên gốc acid; công thức viết phần gốc acid trước
const GOC_ACID = { formate: "HCOO", acetate: "CH₃COO", propanoate: "C₂H₅COO", butanoate: "C₃H₇COO", benzoate: "C₆H₅COO" };
const GOC_R = { methyl: "CH₃", ethyl: "C₂H₅", propyl: "CH₂CH₂CH₃", butyl: "CH₂CH₂CH₂CH₃", benzyl: "CH₂C₆H₅", phenyl: "C₆H₅" };
const congThucEster = (ten) => { const [r, a] = ten.toLowerCase().split(" "); assert.ok(GOC_R[r] && GOC_ACID[a], "chưa đọc được tên ester " + ten); return GOC_ACID[a] + GOC_R[r]; };
// nguồn gốc của một số loại sợi (Bài 13): sợi lấy trực tiếp từ thiên nhiên, chế biến hoá học từ polymer thiên nhiên, tổng hợp
const NGUON_SOI = { "Sợi bông": "thiên nhiên", "Sợi visco": "bán tổng hợp", "Sợi nylon-6,6": "tổng hợp", "Sợi nitron": "tổng hợp" };
// mạch polymer (Bài 12): amylopectin mạch phân nhánh; cao su tổng hợp từ các diene (Bài 13)
const MACH = { Amylopectin: "phân nhánh", Amylose: "không phân nhánh", "Poly(methyl methacrylate)": "không phân nhánh", Polypropylene: "không phân nhánh" };
const CAO_SU = { "CH₂=CCl–CH=CH₂": "cao su chloroprene", "CH₂=CH–CH=CH₂": "cao su buna", "CH₂=C(CH₃)–CH=CH₂": "cao su isoprene", "CH₂=CHCl": "PVC" };
// kim loại tác dụng với nước ở nhiệt độ thường (Bài 19, 24, 25)
// muối sodium của acid béo trong chất béo (Bài 1): tên chất béo là “tri” + phần sau của tên
const MUOI_BEO = { palmitin: "C₁₅H₃₁COONa", stearin: "C₁₇H₃₅COONa", olein: "C₁₇H₃₃COONa", linolein: "C₁₇H₃₁COONa" };
// kí hiệu nhận dạng sáu polymer nhiệt dẻo tái chế được (Bài 12, Hình 12.1)
const TAI_CHE = { 1: "Poly(ethylene terephthalate)", 2: "HDPE", 3: "Poly(vinyl chloride)", 4: "LDPE", 5: "Polypropylene", 6: "Polystyrene" };
// một số quặng kim loại thông dụng (Bài 20, Bảng 20.1)
const QUANG_CT = { bauxite: "Al₂O₃·2H₂O", hematite: "Fe₂O₃", pyrite: "FeS₂", chalcopyrite: "CuFeS₂", "zinc blende": "ZnS" };
// nhiệt độ nóng chảy (°C) của kim loại nhóm IIA, Be → Ba (Bài 25, Bảng 25.2)
const NC_IIA = { Be: 1287, Mg: 650, Ca: 842, Sr: 777, Ba: 727 };
const TAC_NUOC = { Li: true, Na: true, K: true, Ca: true, Sr: true, Ba: true, Be: false, Mg: false, Al: false, Zn: false, Fe: false, Ni: false, Cu: false, Ag: false, Au: false, Pt: false };

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
    { has: "Để biết lọ nào chứa glucose, có thể dùng thuốc thử nào sau đây?", right: (q) => tra(q, BAI_HOC.gluFru, true) },
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
  "hoahoc12-tn-de4": [
    { has: "Ester nào sau đây có mùi chuối chín", right: (q) => { coX(q, "CH₃COOCH₂CH₂CH(CH₃)₂"); assert.equal(KL("CH₃COOCH₂CH₂CH(CH₃)₂"), 130); return BAI_HOC.dauChuoi; } },
    { has: "đường mạch nha) được dùng chủ yếu làm nguyên liệu để", right: () => BAI_HOC.maltose },
    { has: "glucose chưa dùng đến có thể được chuyển thành chất nào", right: () => BAI_HOC.glycogen },
    { has: "Mùi tanh của cá chủ yếu do một số amine", right: (q) => tra(q, TINH_ACID, "acid") },
    { has: "nitrogen về khối lượng. Ứng với X", right: (q) => { const nt = ntDe(q), [p] = so(q.q, "chứa #% nitrogen"), ct = (k) => "C" + subN(k) + "H" + subN(2 * k + 3) + "N";
      const n = Object.keys(DP_AMINE).map(Number).filter((k) => Math.abs((100 * nt.N) / KL(ct(k), nt) - p) < 0.005); assert.equal(n.length, 1, "đúng một amine khớp phần trăm nitrogen");
      coX(q, ct(n[0])); return String(DP_AMINE[n[0]]); } },
    { has: "Chất nào sau đây là một dipeptide?", right: (q) => motCai(q, (o) => { const p = o.split("–CO–NH–");
      return p.length === 2 && /^H₂N–(?:CH₂|CH\(CH₃\))$/.test(p[0]) && /^(?:CH₂|CH\(CH₃\))–COOH$/.test(p[1]); }) },
    { has: "dung dịch HNO₃ đặc vào ống nghiệm đựng dung dịch lòng trắng trứng", right: () => BAI_HOC.protNitric },
    { has: "không trùng hợp được thành polymer?", right: (q) => tra(q, LIEN_KET_BOI, false) },
    { has: "cao su lưu hoá bền hơn, đàn hồi tốt hơn", right: () => BAI_HOC.luuHoa },
    { has: "Chất có tác dụng tẩy màu, khử trùng trong nước Javel là", right: () => { assert.equal(oxh("NaClO", "Cl"), 1); return BAI_HOC.javel; } },
    { has: "tách riêng lớp dầu ăn ra khỏi nước?", right: () => BAI_HOC.pheuChiet },
    { has: "Không nên bón phân đạm ammonium", right: (q) => { coX(q, "2NH₄NO₃ + Ca(OH)₂ → Ca(NO₃)₂ + 2NH₃ + 2H₂O"); return BAI_HOC.damVoi; } },
    { has: "Mục đích chính của việc dùng cryolite là", right: () => BAI_HOC.cryolite },
    { has: "dùng dao cắt được dễ dàng; để ngoài không khí", right: (q) => motCai(q, (o) => NHOM[kiHieu(o)] === "IA") },
    { has: "Soda (Na₂CO₃) được dùng trong xử lí nước", right: (q) => { coX(q, "Ca²⁺ + CO₃²⁻ → CaCO₃"); return BAI_HOC.soda; } },
    { has: "Sục từ từ khí CO₂ đến dư vào ống nghiệm đựng nước vôi trong", right: (q) => { coX(q, "CO₂ + Ca(OH)₂ → CaCO₃ + H₂O", "CaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂"); return BAI_HOC.voiTrong; } },
    { has: "cứng nhất, có thể dùng để cắt kính?", right: (q) => { q.o.forEach((o) => assert.ok(CH[kiHieu(o)], "lựa chọn là kim loại chuyển tiếp dãy thứ nhất: " + o)); return BAI_HOC.cungNhat; } },
    { has: "Cặp ion nào sau đây có cùng cấu hình electron [Ar]3d⁵?", right: (q) => { const z = Object.fromEntries([...q.q.matchAll(/([A-Z][a-z]?) \(Z = (\d+)\)/g)].map((m) => [m[1], +m[2]]));
      Object.entries(z).forEach(([k, v]) => assert.equal(Z_NT[k], v, "số hiệu nguyên tử của " + k));
      const ion = (t) => { const m = /^([A-Z][a-z]?)([²³])⁺$/u.exec(t); assert.ok(m && z[m[1]], "không đọc được ion " + t); return ionCH(CH[m[1]], SUP.indexOf(m[2])); };
      coX(q, "Mn²⁺: [Ar]3d⁵", "Fe³⁺: [Ar]3d⁵"); return motCai(q, (o) => o.split(" và ").every((t) => ion(t) === "[Ar]3d⁵")); } },
    { has: "Mỗi ý sau về chất béo và acid béo đúng hay sai?", right: () => BAI_HOC.chatBeo4 },
    // ý b, d: điều kiện của ăn mòn điện hoá (Bài 22), cách chống ăn mòn bằng cách ngăn kim loại tiếp xúc với môi trường
    { has: "một đoạn dây điện bằng nhôm được nối trực tiếp", right: (q) => { const e = e0De(q.q); assert.ok(canBang("Al → Al³⁺ + 3e"));
      return [e.Cu < e.Al, true, e.Al < e.Cu && /Al → Al³⁺ \+ 3e/.test(q.o[2]), true]; } },
    { has: "nhận biết ba dung dịch bão hoà mất nhãn: KCl, CaCl₂, BaCl₂", right: (q) => [MAU_LUA.Ba === "lục" && /BaCl₂\.$/.test(q.o[0]), MAU_LUA.Ca === "tím nhạt",
      !/ion Cl⁻ gây ra/.test(q.o[2]), MAU_LUA.Ba === "lục" && /Ba\(NO₃\)₂/.test(q.o[3])] },
    { has: "Dung dịch CoCl₂ loãng có màu hồng đỏ", right: (q) => { const a = docPhuc("[Co(H₂O)₆]²⁺"), b = docPhuc("[Co(NH₃)₆]²⁺"), pt = "[Co(H₂O)₆]²⁺ + 6NH₃ → [Co(NH₃)₆]²⁺ + 6H₂O";
      coX(q, pt); assert.ok(canBang(pt)); const [n0] = so(q.o[3], "hết # mol ion"), [nNH3] = so(q.o[3], "ít nhất # mol NH₃");
      return [a.tam === 2 && a.n === 6 && /6 phối tử H₂O bao quanh nguyên tử trung tâm Co²⁺/.test(q.o[0]), a.M === b.M && a.tam === b.tam && a.n === b.n, HINH[b.n].includes("tứ diện"), n0 * heSo(pt, "NH₃") <= nNH3]; } },
    { has: "Cho 8,9 g alanine", right: (q) => { const nt = ntDe(q), [m] = so(q.q, "Cho # g alanine"), pt = ptCua(q, "CH₃CH(NH₂)COOH", "CH₃CH(NH₂)COONa");
      return molTheoPT(pt, "CH₃CH(NH₂)COOH", m / KL("CH₃CH(NH₂)COOH", nt), "CH₃CH(NH₂)COONa") * KL("CH₃CH(NH₂)COONa", nt); } },
    { has: "có bao nhiêu phân tử đóng vai trò chất khử?", right: (q) => { const pt = boTrangThai(q.q).match(PT)[0]; assert.ok(canBang(pt)); assert.equal(heSo(pt, "HCl"), 16);
      assert.ok(soOxh("HCl", "Cl") === -1 && soOxh("Cl₂", "Cl") === 0 && soOxh("KCl", "Cl") === -1); return heSo(pt, "Cl₂") * congThuc("Cl₂").Cl; } },
    { has: "Trùng hợp 4,2 tấn propylene", right: (q) => { const [m] = so(q.q, "Trùng hợp # tấn propylene"), [h] = so(q.q, "hiệu suất #%"); return (m * h) / 100; } },
    { has: "Một pin Galvani gồm hai điện cực chuẩn", right: (q) => { const e = e0De(q.q); return e.Ag - e.Fe; } },
    { has: "Nhúng một lá sắt nặng 10 g vào dung dịch CuSO₄", right: (q) => { const nt = ntDe(q), [m1] = so(q.q, "lá sắt nặng # g"), [m2] = so(q.q, "thấy nặng # g"), pt = ptCua(q, "Fe", "Cu");
      assert.equal(heSo(pt, "Fe"), heSo(pt, "Cu")); return ((m2 - m1) / (nt.Cu - nt.Fe)) * nt.Cu; } },
    { has: "Nung 1 tấn đá vôi", right: (q) => { const nt = ntDe(q), [m0] = so(q.q, "Nung # tấn đá vôi"), [p] = so(q.q, "chứa #% CaCO₃"), [m1] = so(q.q, "thu được # tấn chất rắn"), pt = ptCua(q, "CaCO₃", "CO₂");
      const caco3 = molTheoPT(pt, "CO₂", (m0 - m1) / KL("CO₂", nt), "CaCO₃") * KL("CaCO₃", nt); return (caco3 / ((m0 * p) / 100)) * 100; } },
  ],
  "hoahoc12-tn-de5": [
    { has: "Công thức cấu tạo thu gọn của benzyl acetate là", right: (q) => { const ten_ = /của (\p{L}+ \p{L}+) là$/u.exec(q.q)[1]; return motCai(q, (o) => o === congThucEster(ten_)); } },
    { has: "oxygen chiếm 27,59% về khối lượng", right: (q) => { const nt = ntDe(q), [p] = so(q.q, "oxygen chiếm #% về khối lượng");
      return motCai(q, (o) => { const c = congThuc(o); assert.ok(c.O === 2 && c.H === 2 * c.C, "ester no, đơn chức, mạch hở: " + o); return Math.abs((100 * c.O * nt.O) / KL(o, nt) - p) < 0.005; }); } },
    { has: "nguyên liệu chính để nấu xà phòng là chất béo và", right: (q) => { const p = "(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃"; coX(q, p); assert.ok(canBang(p)); return BAI_HOC.nauKiem; } },
    { has: "Phân tử fructose không có nhóm –CHO", right: () => BAI_HOC.fruTollens },
    { has: "Phân tử saccharose (đường mía) được tạo thành từ", right: () => BAI_HOC.saccharose },
    { has: "Nhai kĩ một miếng cơm trắng", right: () => BAI_HOC.amylase },
    { has: "dung dịch aniline (C₆H₅NH₂) trong một ống nghiệm", right: (q) => { const p = "C₆H₅NH₂ + 3Br₂ → C₆H₂Br₃NH₂ + 3HBr"; coX(q, p); assert.ok(canBang(p)); return BAI_HOC.anilineBr; } },
    { has: "Nhúng mẩu giấy quỳ tím vào dung dịch glutamic acid", right: (q) => { const [nh, co] = AA["Glutamic acid"];
      assert.ok(co === 2 && /hai nhóm carboxyl/.test(q.q) && nh === 1 && /một nhóm amino/.test(q.q), "đề ghi đúng số nhóm của glutamic acid"); return nh > co ? "hoá xanh" : nh < co ? "hoá hồng" : "không đổi màu"; } },
    { has: "polymer có mạch phân nhánh là", right: (q) => tra(q, MACH, "phân nhánh") },
    { has: "Cao su chloroprene có độ bền cao", right: (q) => tra(q, CAO_SU, "cao su chloroprene") },
    { has: "Hạt nhân của nguyên tử này có bao nhiêu neutron?", right: (q) => { const [A] = so(q.q, "có số khối #"), [Z] = so(q.q, "Z = #"); assert.equal(Z, Z_NT.Na); return String(A - Z); } },
    { has: "Khí dầu mỏ hoá lỏng (LPG)", right: () => BAI_HOC.lpg },
    { has: "có trong nọc kiến", right: () => BAI_HOC.nocKien },
    { has: "pin có sức điện động chuẩn 0,780 V", right: (q) => { const e = e0De(q.q), [E] = so(q.q, "sức điện động chuẩn # V");
      q.o.forEach((o) => assert.ok(e[kiHieu(o)] < e.Cu, "đề cho E° của kim loại ở lựa chọn, nhỏ hơn E° của đồng: " + o)); return motCai(q, (o) => gan(e[kiHieu(o)], e.Cu - E, 1e-6)); } },
    { has: "Để có đồng rất tinh khiết làm dây dẫn điện", right: (q) => { ["Cu → Cu²⁺ + 2e", "Cu²⁺ + 2e → Cu"].forEach((p) => { coX(q, p); assert.ok(canBang(p)); }); return BAI_HOC.anodeTan; } },
    { has: "Không cần đun nóng, kim loại nào sau đây tác dụng được với nước", right: (q) => { coX(q, "Ca + 2H₂O → Ca(OH)₂ + H₂"); return tra(q, Object.fromEntries(q.o.map((o) => [o, TAC_NUOC[kiHieu(o)]])), true); } },
    { has: "cung cấp nguyên tố potassium cho cây trồng", right: (q) => motCai(q, (o) => !!congThuc(o).K) },
    { has: "Phức chất X được tạo thành từ ion Co³⁺", right: (q) => { const nCl = soChu(q.q, "trung tâm),", "phối tử Cl⁻"), nN = soChu(q.q, "và", "phối tử NH₃");
      return motCai(q, (o) => { const p = docPhuc(o), k = (f) => (p.L.find((l) => l.f === f) || { k: 0 }).k; return p.M === "Co" && p.tam === 3 && k("Cl") === nCl && k("NH₃") === nN; }); } },
    { has: "Ethanol nhiên liệu có thể được làm từ mùn cưa", right: (q) => { const nt = ntDe(q), [p] = so(q.q, "chứa #% cellulose"), [m] = so(q.o[2], "Từ # tấn mùn cưa"), [h] = so(q.o[2], "hiệu suất #%"), [kq] = so(q.o[2], "khoảng # kg");
      const pt = "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂"; coX(q, pt); assert.ok(canBang(pt));
      const et = ((m * 1000 * p) / 100 / KL("C₆H₁₀O₅", nt)) * heSo(pt, "C₂H₅OH") * KL("C₂H₅OH", nt) * h / 100;
      return [BAI_HOC.celluloseGlucose, tach(pt)[1].some((s) => s.ten === "CO₂"), Math.abs(et - kq) < 0.5, BAI_HOC.celluloseTan]; } },
    { has: "Nylon-6,6 là polymer được dùng để dệt vải", right: () => BAI_HOC.nylon66 },
    { has: "điện phân dung dịch CuSO₄ với hai điện cực bằng than chì", right: (q) => { const [ca, an] = dienPhanDD("CuSO₄"), pt = "2CuSO₄ + 2H₂O → 2Cu + O₂ + 2H₂SO₄"; coX(q, pt); assert.ok(canBang(pt));
      return [ca === "Cu", an === "khí Cl₂", tach(pt)[1].some((s) => s.ten === "H₂SO₄"), ca !== "Cu"]; } },
    { has: "Nung 10 g CaCO₃ đến khối lượng không đổi", right: (q) => { const nt = ntDe(q), vm = vmDe(q), [m] = so(q.q, "Nung # g CaCO₃"), n0 = m / KL("CaCO₃", nt), [mX] = so(q.o[1], "khối lượng # g"), [V] = so(q.o[2], "chiếm thể tích # L"), [mKT] = so(q.o[3], "thu được # g kết tủa");
      ["CaCO₃ → CaO + CO₂", "Ca(OH)₂ + CO₂ → CaCO₃ + H₂O"].forEach((p) => { coX(q, p); assert.ok(canBang(p)); });
      return [BAI_HOC.nungDaVoiToaNhiet, gan(mX, n0 * KL("CaO", nt)), gan(V, n0 * vm), gan(mKT, n0 * KL("CaCO₃", nt))]; } },
    { has: "Có thể thu được tối đa bao nhiêu triester (chất béo) khác nhau", right: (q) => { const k = new Set(q.q.match(/(?:palmitic|stearic|oleic|linoleic) acid/g)).size; return (k * k * (k + 1)) / 2; } },
    { has: "thì tốc độ phản ứng tăng gấp đôi", right: (q) => { const [d] = so(q.q, "tăng nhiệt độ thêm # °C"), [t1, t2] = so(q.q, "từ # °C lên # °C"); return 2 ** ((t2 - t1) / d); } },
    { has: "Có bao nhiêu amine bậc một có cùng công thức phân tử", right: (q) => { const f = /công thức phân tử ([A-Z][A-Za-z₀-₉]+)\?/.exec(q.q)[1], c = congThuc(f);
      assert.ok(c.N === 1 && c.H === 2 * c.C + 3, "amine no, đơn chức, mạch hở"); return ALKYL[c.C]; } },
    { has: "có bao nhiêu kim loại tan được trong dung dịch HCl loãng", right: (q) => { const ds = /Trong các kim loại (.+?), có bao nhiêu/.exec(q.q)[1].split(", ");
      ds.forEach((k) => assert.ok(k in E0_SACH, "chưa có E° của " + k)); return ds.filter((k) => E0_SACH[k] < 0).length; } },
    { has: "Cho 8 g bột hợp kim của đồng với kẽm", right: (q) => { const nt = ntDe(q), vm = vmDe(q), [m] = so(q.q, "Cho # g bột hợp kim"), [V] = so(q.q, "thu được # L khí H₂"), pt = ptCua(q, "Zn", "H₂");
      return (molTheoPT(pt, "H₂", V / vm, "Zn") * nt.Zn) / m * 100; } },
    { has: "Cho 2,74 g barium vào nước dư", right: (q) => { const nt = ntDe(q), [m] = so(q.q, "Cho # g barium"), [C] = so(q.q, "dung dịch HCl # M"), p1 = ptCua(q, "Ba", "Ba(OH)₂"), p2 = ptCua(q, "Ba(OH)₂", "HCl");
      return (molTheoPT(p2, "Ba(OH)₂", molTheoPT(p1, "Ba", m / nt.Ba, "Ba(OH)₂"), "HCl") / C) * 1000; } },
  ],
  "hoahoc12-tn-de6": [
    { has: "Ester có công thức cấu tạo CH₃COOCH₂CH₂CH₃ có tên gọi là", right: (q) => { const f = /công thức cấu tạo ([A-Z][A-Za-z₀-₉]+) có tên/.exec(q.q)[1]; return motCai(q, (o) => congThucEster(o) === f); } },
    { has: "Dùng xà phòng giặt quần áo bằng nước giếng khoan", right: (q) => { const p = "2C₁₇H₃₅COO⁻ + Ca²⁺ → (C₁₇H₃₅COO)₂Ca"; coX(q, p); assert.ok(canBang(p)); return BAI_HOC.nuocCungXP; } },
    { has: "Cellulose dùng để làm giấy viết", right: () => BAI_HOC.giay },
    { has: "Điện phân nóng chảy hoàn toàn 11,7 g NaCl", right: (q) => { const nt = ntDe(q), vm = vmDe(q), [m] = so(q.q, "hoàn toàn # g NaCl"), pt = ptCua(q, "NaCl", "Cl₂");
      const V = molTheoPT(pt, "NaCl", m / KL("NaCl", nt), "Cl₂") * vm; return motCai(q, (o) => gan(so(o, "# L")[0], V, 1e-3)); } },
    { has: "Đun 17,1 g saccharose với dung dịch acid loãng", right: (q) => { const nt = ntDe(q), [m] = so(q.q, "Đun # g saccharose"), pt = "C₁₂H₂₂O₁₁ + H₂O → 2C₆H₁₂O₆"; coX(q, pt); assert.ok(canBang(pt));
      const mAg = molTheoPT(pt, "C₁₂H₂₂O₁₁", m / KL("C₁₂H₂₂O₁₁", nt), "C₆H₁₂O₆") * 2 * nt.Ag; return motCai(q, (o) => gan(so(o, "# g")[0], mAg)); } },
    { has: "Cho 5,9 g một amine bậc một X", right: (q) => { const nt = ntDe(q), [m] = so(q.q, "Cho # g một amine"), [V] = so(q.q, "với # mL"), [C] = so(q.q, "HCl # M"), M = m / ((V / 1000) * C);
      coX(q, "C₃H₇NH₂ + HCl → C₃H₇NH₃Cl"); return motCai(q, (o) => gan(KL(o, nt), M, 1e-6)); } },
    { has: "có bao nhiêu liên kết peptide?", right: (q) => { const p = /pentapeptide ((?:Gly|Ala|Val)(?:-(?:Gly|Ala|Val))+)/.exec(q.q)[1].split("-"); assert.equal(p.length, 5); return String(p.length - 1); } },
    { has: "Polymer X có mạch được tạo thành từ các mắt xích –NH–(CH₂)₅–CO–", right: () => { assert.equal(congThuc("NH(CH₂)₅CO").C, 6); return BAI_HOC.capron; } },
    { has: "Cao su tự nhiên, dùng làm lốp xe", right: () => BAI_HOC.muCaoSu },
    { has: "liên kết giữa các nguyên tử không bị phân cực?", right: (q) => motCai(q, (o) => Object.keys(congThuc(o)).length === 1) },
    { has: "Trong lò nung vôi xảy ra cân bằng", right: (q) => { const pt = boTrangThai(q.q).match(PT)[0], thu = /ΔrH°298 > 0/.test(q.q); assert.ok(canBang(pt));
      const khi = tach(pt)[1].some((s) => s.ten === "CO₂"), huong = (o) => (/^Nâng nhiệt độ/.test(o) ? (thu ? 1 : -1) : /^Hạ nhiệt độ/.test(o) ? (thu ? -1 : 1) : /giữ khí CO₂/.test(o) ? (khi ? -1 : 1) : /^Nghiền nhỏ/.test(o) ? 0 : NaN);
      q.o.forEach((o) => assert.ok(!isNaN(huong(o)), "chưa đọc được thay đổi: " + o)); return motCai(q, (o) => huong(o) === 1); } },
    { has: "Nhỏ nước bromine vào dung dịch phenol", right: (q) => { const p = "C₆H₅OH + 3Br₂ → C₆H₂Br₃OH + 3HBr"; coX(q, p); assert.ok(canBang(p)); return BAI_HOC.phenolBr; } },
    { has: "kim loại dễ nhường electron nhất là", right: (q) => { const e = e0De(q.q), mn = Math.min(...Object.values(e)); assert.equal(Object.keys(e).length, 4); return motCai(q, (o) => gan(e[kiHieu(o)], mn)); } },
    { has: "Cho hỗn hợp bột Zn và Cu vào lượng dư dung dịch AgNO₃", right: (q) => { ["Zn + 2Ag⁺ → Zn²⁺ + 2Ag", "Cu + 2Ag⁺ → Cu²⁺ + 2Ag"].forEach((p) => { coX(q, p); assert.ok(canBang(p)); });
      const ran = new Set(["Zn", "Cu"].filter((k) => E0_SACH[k] > E0_SACH.Ag).concat(["Ag"]));
      return motCai(q, (o) => { const s = o.replace(/^chỉ có /, "").split(/, | và /); return s.length === ran.size && s.every((x) => ran.has(x)); }); } },
    { has: "Mẩu potassium phản ứng mãnh liệt hơn", right: (q) => { assert.ok(E0_SACH.K < E0_SACH.Na); coX(q, "2K + 2H₂O → 2KOH + H₂"); return BAI_HOC.kNa; } },
    { has: "Để pháo hoa có màu đỏ son", right: (q) => motCai(q, (o) => MAU_LUA[kiHieu(o)] === "đỏ son") },
    { has: "Sắt tạo được hai muối chloride là FeCl₂ và FeCl₃", right: () => "+" + oxh("FeCl₂", "Fe") + " và +" + oxh("FeCl₃", "Fe") },
    { has: "Có bao nhiêu phức chất mà nguyên tử trung tâm có điện tích +2?", right: (q) => { const ds = phucTrong(q.q); assert.equal(ds.length, 5); return String(ds.filter((p) => docPhuc(p).tam === 2).length); } },
    { has: "Tripeptide X có trình tự Val-Gly-Val", right: (q) => { const TEN = { Gly: "Glycine", Ala: "Alanine", Val: "Valine" }, p = /trình tự ((?:Gly|Ala|Val)(?:-(?:Gly|Ala|Val))+)/.exec(q.q)[1].split("-");
      const dem = (a) => p.filter((x) => x === a).length, trungTinh = p.every((a) => AA[TEN[a]][0] === AA[TEN[a]][1]);
      return [new Set(p).size === 2, dem("Val") === 2 && dem("Gly") === 1, !trungTinh, p[1] === "Gly"]; } },
    { has: "Một pin Galvani được lắp từ điện cực chì chuẩn", right: (q) => { const e = e0De(q.q), [v] = so(q.o[2], "khoảng # V"); coX(q, "Pb → Pb²⁺ + 2e"); assert.ok(canBang("Pb → Pb²⁺ + 2e") && canBang("Cu²⁺ + 2e → Cu"));
      return [e.Pb > e.Cu, e.Cu > e.Pb && /Cu²⁺ \+ 2e → Cu/.test(q.o[1]), Math.abs(e.Cu - e.Pb - v) < 0.005, e.Cu < e.Pb]; } },
    { has: "Đồ trang sức bằng “vàng 18K”", right: (q) => { const [p] = so(q.q, "vàng chiếm #%"), [m, mv] = so(q.o[2], "nặng # g chứa khoảng # g vàng");
      return [BAI_HOC.hopKimCung, true, Math.abs((m * p) / 100 - mv) < 0.005, E0_SACH.Cu < 0]; } },
    { has: "cho một mẩu calcium vào cốc (1) và một mẩu magnesium vào cốc (2)", right: (q) => { const nt = ntDe(q), vm = vmDe(q), [m, V] = so(q.o[3], "nặng # g và phản ứng hết thì thu được # L"), p = "Ca + 2H₂O → Ca(OH)₂ + H₂";
      coX(q, p); assert.ok(canBang(p)); return [TAC_NUOC.Mg, TAC_NUOC.Ca, TAC_NUOC.Ca, gan(V, molTheoPT(p, "Ca", m / nt.Ca, "H₂") * vm)]; } },
    { has: "Từ 1 tấn mỡ động vật chứa 89% tristearin", right: (q) => { const nt = ntDe(q), [m] = so(q.q, "Từ # tấn mỡ"), [p] = so(q.q, "chứa #% tristearin"), [k] = so(q.q, "chứa #% sodium stearate");
      const f = "(C₁₇H₃₅COO)₃C₃H₅", s = "C₁₇H₃₅COONa", pt = ptCua(q, f, s); return (molTheoPT(pt, f, (m * p) / 100 / KL(f, nt), s) * KL(s, nt)) / (k / 100); } },
    { has: "Cho năng lượng liên kết (kJ/mol): C–H 418", right: (q) => { const [a] = so(q.q, "C–H #"), [b] = so(q.q, "Cl–Cl #"), [c] = so(q.q, "C–Cl #"), [d] = so(q.q, "H–Cl #"), pt = boTrangThai(q.q).match(PT)[0];
      assert.ok(canBang(pt) && pt === "CH₄ + Cl₂ → CH₃Cl + HCl"); return a + b - (c + d); } },
    { has: "Trong tế bào, glucose bị oxi hoá hoàn toàn", right: (q) => { const nt = ntDe(q), vm = vmDe(q), [m] = so(q.q, "hoàn toàn # g glucose"), pt = ptCua(q, "C₆H₁₂O₆", "O₂");
      return molTheoPT(pt, "C₆H₁₂O₆", m / KL("C₆H₁₂O₆", nt), "O₂") * vm; } },
    { has: "Một lò luyện gang dùng 10 tấn quặng sắt", right: (q) => { const nt = ntDe(q), [m] = so(q.q, "dùng # tấn quặng"), [p] = so(q.q, "có #% khối lượng là Fe₂O₃"), [h] = so(q.q, "đạt hiệu suất #%"), pt = ptCua(q, "Fe₂O₃", "Fe");
      return (molTheoPT(pt, "Fe₂O₃", (m * p) / 100 / KL("Fe₂O₃", nt), "Fe") * nt.Fe * h) / 100; } },
    { has: "Hoà tan hoàn toàn 6,2 g Na₂O vào nước", right: (q) => { const nt = ntDe(q), [m] = so(q.q, "hoàn toàn # g Na₂O"), [V] = so(q.q, "thu được # mL"), pt = ptCua(q, "Na₂O", "NaOH");
      return molTheoPT(pt, "Na₂O", m / KL("Na₂O", nt), "NaOH") / (V / 1000); } },
    { has: "nguyên tử manganese có số oxi hoá", right: () => oxh("MnO₂", "Mn") },
  ],
  "hoahoc12-tn-de7": [
    { has: "acid nào có gốc hydrocarbon no?", right: (q) => motCai(q, (o) => { const m = /^C([₀-₉]+)H([₀-₉]+)COOH$/.exec(o); assert.ok(m, "acid béo: " + o); return subV(m[2]) === 2 * subV(m[1]) + 1; }) },
    { has: "cần vừa đủ 0,35 mol O₂", right: (q) => { const [n] = so(q.q, "hoàn toàn # mol ester"), [o2] = so(q.q, "vừa đủ # mol O₂");
      return motCai(q, (o) => { const c = congThuc(o); assert.ok(c.O === 2 && c.H === 2 * c.C, "ester no, đơn chức, mạch hở: " + o); return gan((n * (2 * c.C + c.H / 2 - c.O)) / 2, o2); }); } },
    { has: "Glucose và fructose đều có công thức phân tử C₆H₁₂O₆", right: () => BAI_HOC.dongPhan },
    { has: "Trâu, bò tiêu hoá được cellulose", right: () => BAI_HOC.khongEnzyme },
    { has: "chất có nguyên tử nitrogen liên kết với ba gốc hydrocarbon", right: (q) => motCai(q, (o) => !/NH/.test(o)) },
    { has: "Thuỷ phân hoàn toàn dipeptide Ala-Val", right: (q) => { const TEN = { Gly: "glycine", Ala: "alanine", Val: "valine" }, p = /dipeptide ((?:Gly|Ala|Val)-(?:Gly|Ala|Val))/.exec(q.q)[1].split("-"); return TEN[p[0]] + " và " + TEN[p[1]]; } },
    { has: "Đun nóng poly(vinyl acetate) với dung dịch NaOH dư", right: () => { const mx = congThuc("C₄H₆O₂"), sp = [congThuc("C₂H₄O"), congThuc("C₂H₃O₂Na")];
      // mắt xích –CH₂–CH(OCOCH₃)– cộng NaOH bằng mắt xích –CH₂–CH(OH)– cộng muối
      ["C", "H", "O", "Na"].forEach((e) => assert.equal((mx[e] || 0) + (e === "Na" || e === "O" ? 1 : 0) + (e === "H" ? 1 : 0), sp.reduce((a, c) => a + (c[e] || 0), 0), "bảo toàn " + e));
      return BAI_HOC.pvaNaOH; } },
    { has: "Nhựa vá săm", right: () => BAI_HOC.vaSam },
    { has: "Đơn chất halogen nào sau đây có khả năng oxi hoá lớn nhất?", right: (q) => { const z = (o) => Z_NT[/\(([A-Z][a-z]?)₂\)$/.exec(o)[1]]; q.o.forEach((o) => assert.ok(z(o), "halogen: " + o)); return motCai(q, (o) => z(o) === Math.min(...q.o.map(z))); } },
    { has: "Nitrogen chiếm khoảng 78% thể tích không khí", right: () => BAI_HOC.n2 },
    { has: "có công thức đơn giản nhất là CH₂O", right: (q) => { const [M] = so(q.q, "phân tử khối bằng #"), k = M / KL("CH₂O"); return motCai(q, (o) => { const c = congThuc(o); return c.C === k && c.H === 2 * k && c.O === k; }); } },
    { has: "Ghép điện cực nhôm chuẩn với điện cực bạc chuẩn", right: (q) => { const e = e0De(q.q); return motCai(q, (o) => gan(so(o, "# V")[0], e.Ag - e.Al, 1e-9)); } },
    { has: "Điện phân dung dịch Na₂SO₄ với hai điện cực trơ", right: (q) => { const [ca, an] = dienPhanDD("Na₂SO₄"); assert.ok(ca === "khí H₂" && an === "khí O₂"); coX(q, "2H₂O → 2H₂ + O₂"); return BAI_HOC.dienPhanNuoc; } },
    { has: "magnesium dạng bột vào cốc chứa 100 mL dung dịch AgNO₃", right: (q) => { const nt = ntDe(q), [m] = so(q.q, "Thả # g magnesium"), [V] = so(q.q, "chứa # mL"), [C] = so(q.q, "AgNO₃ # M"), pt = ptCua(q, "Mg", "Ag");
      const nMg = m / nt.Mg, pu = Math.min(nMg, ((V / 1000) * C) / heSo(pt, "AgNO₃")), mR = pu * heSo(pt, "Ag") * nt.Ag + (nMg - pu) * nt.Mg; return motCai(q, (o) => gan(so(o, "# g")[0], mR, 1e-9)); } },
    { has: "Ion Na⁺ có cấu hình electron giống với nguyên tử của khí hiếm", right: (q) => motCai(q, (o) => Z_NT[kiHieu(o)] === Z_NT.Na - 1) },
    { has: "có bao nhiêu electron ở lớp ngoài cùng?", right: () => { ["Mg", "Ca", "Ba"].forEach((k) => assert.equal(NHOM[k], "IIA")); return String(LA_MA.indexOf("II")); } },
    { has: "Chất rắn tạo thành có màu", right: (q) => { coX(q, "CuSO₄ + 2NaOH → Cu(OH)₂ + Na₂SO₄"); return BAI_HOC.cuOH2; } },
    { has: "Phức chất [CrCl₂(H₂O)₄]⁺ được tạo thành từ các phối tử", right: (q) => { const p = docPhuc(/\[CrCl₂\(H₂O\)₄\]⁺/.exec(q.q)[0]); return ionTen(p.M, p.tam); } },
    { has: "chế biến thành nhiên liệu biodiesel", right: () => { assert.equal(congThuc("C₃H₅(OH)₃").O, 3); return BAI_HOC.biodiesel; } },
    { has: "Chất dẻo như PE, PP, PVC được dùng rất rộng rãi", right: () => BAI_HOC.chatDeo },
    { has: "dẫn luồng khí H₂ dư đi qua ống sứ đựng 8 g bột CuO", right: (q) => { const nt = ntDe(q), [m] = so(q.q, "đựng # g bột CuO"), [d] = so(q.o[2], "giảm # g"), pt = "CuO + H₂ → Cu + H₂O";
      coX(q, pt); assert.ok(canBang(pt)); return [true, false, gan((m / KL("CuO", nt)) * nt.O, d), tach(pt)[1].some((s) => s.ten === "CO₂")]; } },
    { has: "Hoà tan 10,6 g Na₂CO₃ vào nước, thu được 400 mL dung dịch X", right: (q) => { const nt = ntDe(q), [m] = so(q.q, "Hoà tan # g Na₂CO₃"), [V] = so(q.q, "thu được # mL"), [C] = so(q.o[1], "là # M"), pt = "Na₂CO₃ + 2HCl → 2NaCl + CO₂ + H₂O";
      coX(q, pt); assert.ok(canBang(pt) && canBang("Na₂CO₃ → Na₂O + CO₂")); return [false, gan(C, m / KL("Na₂CO₃", nt) / (V / 1000)), tach(pt)[1].some((s) => s.ten === "CO₂"), false]; } },
    { has: "Đun nóng 10,2 g ethyl propanoate", right: (q) => { const nt = ntDe(q), f = /\(([A-Z][A-Za-z₀-₉]+)\)/.exec(q.q)[1], [m] = so(q.q, "Đun nóng # g"), pt = ptCua(q, f, "NaOH");
      return molTheoPT(pt, f, m / KL(f, nt), muoiEster(f)) * KL(muoiEster(f), nt); } },
    { has: "tổng số hạt proton, neutron và electron là 82", right: (q) => { const [T] = so(q.q, "electron là #,"), [d] = so(q.q, "hơn số neutron # hạt"), Z = (T + d) / 4, N = (T - d) / 2; return Z + N; } },
    { has: "Lên men m gam glucose với hiệu suất 75%", right: (q) => { const nt = ntDe(q), [h] = so(q.q, "hiệu suất #%"), [mk] = so(q.q, "thu được # g kết tủa"), p1 = ptCua(q, "C₆H₁₂O₆", "CO₂"), p2 = ptCua(q, "CO₂", "CaCO₃");
      return (molTheoPT(p1, "CO₂", molTheoPT(p2, "CaCO₃", mk / KL("CaCO₃", nt), "CO₂"), "C₆H₁₂O₆") / (h / 100)) * KL("C₆H₁₂O₆", nt); } },
    { has: "Một loại thép không gỉ chứa 18% chromium", right: (q) => { const [p] = so(q.q, "chứa #% chromium"), [m] = so(q.q, "nặng # kg"); return (m * 1000 * p) / 100; } },
    { has: "hỗn hợp gồm Mg và MgO", right: (q) => { const nt = ntDe(q), vm = vmDe(q), [m] = so(q.q, "Hoà tan # g hỗn hợp"), [V] = so(q.q, "có # L khí H₂"), pt = ptCua(q, "Mg", "H₂");
      coX(q, "MgO + 2HCl → MgCl₂ + H₂O"); return ((molTheoPT(pt, "H₂", V / vm, "Mg") * nt.Mg) / m) * 100; } },
    { has: "Trong 15,2 g Cr₂O₃ có bao nhiêu gam chromium?", right: (q) => { const nt = ntDe(q), [m] = so(q.q, "Trong # g Cr₂O₃"); return (m * congThuc("Cr₂O₃").Cr * nt.Cr) / KL("Cr₂O₃", nt); } },
  ],
  "hoahoc12-tn-de8": [
    { has: "Chất nào sau đây không thuộc loại lipid?", right: (q) => { const LIPID = { "Chất béo": true, "Sáp ong": true, Phospholipid: true, Steroid: true, Saccharose: false };
      q.o.forEach((o) => assert.ok(o in LIPID, "chưa biết " + o)); return motCai(q, (o) => !LIPID[o]); } },
    { has: "thu được glycerol và 83,4 g muối sodium", right: (q) => { const nt = ntDe(q), [n] = so(q.q, "Đun # mol chất béo"), [m] = so(q.q, "và # g muối"), M = m / (3 * n);
      const ten = Object.keys(MUOI_BEO).filter((k) => gan(KL(MUOI_BEO[k], nt), M)); assert.equal(ten.length, 1, "muối của acid béo có M = " + M); return "tri" + ten[0]; } },
    { has: "nước quả bồ kết, quả bồ hòn", right: () => BAI_HOC.boKet },
    { has: "Cho dung dịch glucose vào Cu(OH)₂ mới điều chế", right: () => BAI_HOC.cu2o },
    { has: "aniline phản ứng với nitrous acid (HONO) tạo thành", right: (q) => { coX(q, "C₆H₅NH₂ + HONO + HCl → C₆H₅N₂Cl + 2H₂O"); return BAI_HOC.diazonium; } },
    { has: "Vắt nước chanh vào cốc sữa đậu nành", right: () => BAI_HOC.dongTuAcid },
    { has: "kí hiệu tái chế số 1 kèm chữ PET", right: (q) => { const [k] = so(q.q, "tái chế số # kèm"); return TAI_CHE[k]; } },
    { has: "Keo dán poly(urea-formaldehyde)", right: () => BAI_HOC.keoUF },
    // carbon hoá trị IV liên kết với hai nguyên tử oxygen hoá trị II: mỗi liên kết C–O dùng chung 4 : 2 = 2 cặp electron
    { has: "Trong phân tử CO₂, nguyên tử carbon liên kết với mỗi nguyên tử oxygen", right: () => { const HT = { C: 4, O: 2 }; assert.equal(HT.C / 2, HT.O); return ["", "một liên kết đơn", "một liên kết đôi", "một liên kết ba"][HT.C / 2]; } },
    // biểu thức hằng số cân bằng: bỏ chất rắn, chất lỏng; số mũ bằng hệ số trong phương trình
    { has: "được biểu diễn bằng biểu thức nào sau đây?", right: (q) => { const MU = { 2: "²", 3: "³", 4: "⁴" }, pt = /cân bằng hoá học: ([^.]+)\. /.exec(q.q)[1];
      const [tr, sp] = pt.split(" ⇌ ").map((v) => v.split(" + ").map((s) => /^(\d*)(.+)\((s|l|g|aq)\)$/.exec(s)).filter((m) => m[3] === "g" || m[3] === "aq"));
      const ve = (ds) => ds.map((m) => "[" + m[2] + "]" + (m[1] ? MU[m[1]] : "")).join(" · "); assert.ok(canBang(pt.replace(/\((s|l|g|aq)\)/g, "")));
      return "KC = " + ve(sp) + " / " + (tr.length > 1 ? "(" + ve(tr) + ")" : ve(tr)); } },
    { has: "đèn xì để hàn, cắt kim loại", right: () => BAI_HOC.denXi },
    { has: "ứng với cặp oxi hoá – khử được kí hiệu là", right: (q) => { const m = /Quá trình (\S+) \+ \d*e ⇌ (\S+) /.exec(q.q); assert.ok(canBang(m[0].replace("Quá trình ", "").trim())); return m[1] + "/" + m[2]; } },
    { has: "khử được ion H⁺ trong dung dịch HCl thành khí H₂", right: (q) => { const e = e0De(q.q); return motCai(q, (o) => e[kiHieu(o)] < 0); } },
    { has: "Quặng chalcopyrite", right: (q) => { const f = QUANG_CT[/Quặng (\w+)/.exec(q.q)[1]]; assert.ok(congThuc(f).Cu === 1, "quặng chứa đồng"); return f; } },
    { has: "so với các kim loại thành phần, hợp kim", right: () => BAI_HOC.hopKimSoSanh },
    { has: "các kim loại thuộc nhóm IIA có nhiệt độ nóng chảy", right: () => { const t = Object.values(NC_IIA), tang = t.every((v, i) => !i || v > t[i - 1]), giam = t.every((v, i) => !i || v < t[i - 1]);
      assert.ok(!tang && !giam, "nhiệt độ nóng chảy biến đổi không đều"); ["Be", "Mg", "Ca", "Sr", "Ba"].forEach((k) => assert.equal(NHOM[k], "IIA")); return BAI_HOC.iiaCauTruc; } },
    // ion Mⁿ⁺ của kim loại chuyển tiếp dãy thứ nhất: nguyên tử nhường electron 4s trước, Z = 18 + số electron 3d + n
    { has: "Ion M²⁺ ứng với cấu hình [Ar]3d²", right: (q) => { const m = /Ion M([²³⁴]?)⁺ ứng với cấu hình \[Ar\]3d([¹²³⁴⁵⁶⁷⁸⁹]+)/.exec(q.q), Z = 18 + supV(m[2]) + (m[1] ? supV(m[1]) : 1);
      assert.ok(Z >= 21 && Z <= 29, "dãy kim loại chuyển tiếp thứ nhất"); return motCai(q, (o) => +o === Z); } },
    { has: "chất diệp lục (chlorophyll)", right: () => BAI_HOC.chlorophyll },
    { has: "khoảng 2 mL ethanol, 2 mL acetic acid và vài giọt H₂SO₄ đặc", right: () => BAI_HOC.esterHoa },
    { has: "điện phân dung dịch NaCl bão hoà trong cốc với hai điện cực than chì", right: (q) => { const [ca, an] = dienPhanDD("NaCl");
      coX(q, "2H₂O + 2e → H₂ + 2OH⁻", "2Cl⁻ → Cl₂ + 2e", "Cl₂ + 2NaOH → NaCl + NaClO + H₂O"); return [ca === "khí H₂", an === "khí O₂", false, true]; } },
    { has: "trộn bột nhôm với bột lưu huỳnh", right: (q) => { const nt = ntDe(q), pt = "2Al + 3S → Al₂S₃", tiLe = /khối lượng lưu huỳnh gấp đôi khối lượng nhôm/.test(q.q) ? 2 : NaN;
      coX(q, pt, "Al → Al³⁺ + 3e", "S + 2e → S²⁻"); const canS = (molTheoPT(pt, "Al", 1 / nt.Al, "S") * nt.S);
      return [false, tach(pt)[1].some((s) => s.ten === "Al₂S₃") && q.o[1].includes("Al₂S₃"), canS > tiLe, false]; } },
    { has: "Cho 2,3 g sodium vào 100 mL dung dịch CuSO₄", right: (q) => { const nt = ntDe(q), vm = vmDe(q), [m] = so(q.q, "Cho # g sodium"), [V] = so(q.q, "vào # mL"), [C] = so(q.q, "CuSO₄ # M"), [vh] = so(q.o[1], "là # L"), [mk] = so(q.o[2], "là # g");
      const p1 = "2Na + 2H₂O → 2NaOH + H₂", p2 = "CuSO₄ + 2NaOH → Cu(OH)₂ + Na₂SO₄"; coX(q, p1, p2);
      const nNa = m / nt.Na, nOH = molTheoPT(p1, "Na", nNa, "NaOH"), pu = Math.min((V / 1000) * C, nOH / heSo(p2, "NaOH"));
      return [false, gan(vh, molTheoPT(p1, "Na", nNa, "H₂") * vm), gan(mk, pu * KL("Cu(OH)₂", nt)), nOH - pu * heSo(p2, "NaOH") > 1e-9]; } },
    { has: "Tetrapeptide Ala-Val-Gly-Gly", right: (q) => { const M = { Gly: so(q.q, "glycine #")[0], Ala: so(q.q, "alanine #")[0], Val: so(q.q, "valine #")[0] }, [nuoc] = so(q.q, "nước #"), seq = /Tetrapeptide ((?:\w+-)+\w+)/.exec(q.q)[1].split("-");
      assert.equal(seq.length, 4); return seq.reduce((s, a) => s + M[a], 0) - (seq.length - 1) * nuoc; } },
    // mắt xích nylon-6,6 = adipic acid + hexamethylenediamine − 2 phân tử nước
    { has: "Trùng ngưng adipic acid", right: (q) => { const nt = ntDe(q), [m] = so(q.q, "Dùng # kg adipic acid"), [h] = so(q.q, "chỉ #% lượng adipic acid");
      const mx = KL("C₆H₁₀O₄", nt) + KL("C₆H₁₆N₂", nt) - 2 * KL("H₂O", nt); assert.ok(gan(mx, KL("C₁₂H₂₂N₂O₂", nt))); return (m / KL("C₆H₁₀O₄", nt)) * mx * (h / 100); } },
    { has: "Đốt cháy hoàn toàn 1 mol methane toả ra", right: (q) => { const nt = ntDe(q), [Q] = so(q.q, "toả ra # kJ"), [mn] = so(q.q, "đun # kg nước"), [t1, t2] = so(q.q, "từ # °C đến # °C"), [h] = so(q.q, "chỉ #% nhiệt"), [c] = so(q.q, "cần # J");
      return ((mn * 1000 * c * (t2 - t1)) / 1000 / (h / 100) / Q) * KL("CH₄", nt); } },
    { has: "dây magnesium trong không khí, thu được magnesium oxide", right: (q) => { const nt = ntDe(q), [m] = so(q.q, "hoàn toàn # g dây"), pt = ptCua(q, "Mg", "MgO"); return molTheoPT(pt, "Mg", m / nt.Mg, "MgO") * KL("MgO", nt); } },
    { has: "Vỏ trứng gà có thành phần chính là calcium carbonate", right: (q) => { const nt = ntDe(q), vm = vmDe(q), [m] = so(q.q, "Cho # g bột vỏ trứng"), [V] = so(q.q, "thu được # L khí CO₂"), pt = ptCua(q, "CaCO₃", "CO₂");
      return (molTheoPT(pt, "CO₂", V / vm, "CaCO₃") * KL("CaCO₃", nt) * 100) / m; } },
    { has: "Một mẫu nước giếng nhiễm sắt chứa ion Fe³⁺", right: (q) => { const nt = ntDe(q), [C] = so(q.q, "nồng độ # mol/L"), [V] = so(q.q, "Xử lí # L nước"), pt = ptCua(q, "Fe³⁺", "Fe(OH)₃");
      return molTheoPT(pt, "Fe³⁺", C * V, "Fe(OH)₃") * KL("Fe(OH)₃", nt); } },
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
      // biểu thức hằng số cân bằng (như KC = [CO]² / [CO₂]) ghi nồng độ trong ngoặc vuông, không phải phức chất
      phucTrong(s.replace(/KC = [^.;]*/gu, "")).forEach((p) => { const x = docPhuc(p); kt(x.tam >= 0 && x.tam <= 4, at + ": điện tích của nguyên tử trung tâm trong " + p); });
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
  "thể tích mol khí ở điều kiện chuẩn", "một mol khí chiếm", "thể tích của một mol khí là", "ở điều kiện chuẩn", "nguyên tử khối", "có bao nhiêu", "đề thi thử theo cấu trúc đề thi tốt nghiệp thpt từ năm 2025",
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
    "một mol khí chiếm", "thể tích của một mol khí là"];
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
    // câu trả lời ngắn có tol: số ở câu khác nằm trong khoảng sai số (như 1,561 với đáp án 1,56) cũng là lộ đáp án
    if (q.type === "num") soDa = [{ v: q.ans, u: q.unit || "", t: q.tol || 0 }];
    else if (q.type === "mc") { const x = soDV.exec(q.o[0]); if (x) soDa = [{ v: val(x[1]), u: x[2] || "" }]; else { const c3 = cum3(q.o[0]), sai = q.o.slice(1).map((o) => " " + tuCua(o).join(" ") + " ");
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
  "tn-de3#2 → tn-de1#3: fructose", "tn-de3#4 → ck1-de2#10: aniline", "tn-de3#5 → ck1-de2#14: gly ala",
  // Đề 4: “Ca(OH)₂” ở câu sục CO₂ vào nước vôi trong chỉ là tên chất, không nói vôi sống kết hợp với hơi nước; “chromium (Cr)” ở câu số oxi
  // hoá của chromium (kho) và là lựa chọn sai ở câu dây dẫn điện (Đề 3), không nói chromium cứng nhất; câu dây nhôm nối dây đồng dùng thuật
  // ngữ ăn mòn điện hoá của bài, không nói đồng sinh ra bám vào viên kẽm trong dung dịch HCl có CuSO₄.
  "tn-de4#16 → tn-de1#17: ca oh ₂", "tn-de3#18 → tn-de4#17: chromium cr", "ck2-de1#15 → tn-de4#17: chromium cr",
  "tn-de4#20 → ck2-de2#7: bị ăn mòn", "tn-de4#20 → ck2-de2#7: ăn mòn điện", "tn-de4#20 → ck2-de2#7: mòn điện hoá",
  // Đã xem tay (Phiên N12-tn-hoahoc-b). Đề 5: câu fructose với thuốc thử Tollens không nói fructose có bị thuỷ phân hay không; “Ca(OH)₂” ở câu nung
  // CaCO₃ chỉ là dung dịch hấp thụ khí CO₂, không nói vôi sống kết hợp với hơi nước; câu aniline với nước bromine không nói quỳ tím.
  "tn-de5#4 → tn-de1#3: fructose", "tn-de5#22 → tn-de1#17: ca oh ₂", "tn-de5#7 → ck1-de2#10: aniline",
  // Đề 6: “Ca(OH)₂” ở câu calcium tác dụng với nước không nói vôi sống kết hợp với hơi nước; câu so tính khử của bốn kim loại có lựa chọn
  // “Sắt (Fe)”, câu 14 Đề 5 tự cho thế điện cực chuẩn của bốn kim loại; câu thí nghiệm nấu xà phòng (Đề 1) nói muối của acid béo tách ra
  // khi thêm NaCl bão hoà, không nói ion Ca²⁺, Mg²⁺; “+2 và +3” là lựa chọn sai của câu số oxi hoá của chromium; “Fe₂O₃” ở câu luyện gang
  // không nói quặng hematite.
  "tn-de6#22 → tn-de1#17: ca oh ₂", "tn-de6#12 → tn-de5#14: sắt fe", "tn-de1#19 → tn-de6#2: acid béo thành", "ck2-de1#15 → tn-de6#17: +2 và +3",
  "tn-de6#26 → gk2-de2#14: fe₂o₃",
  // Đề 7: câu glucose và fructose là đồng phân không nói fructose có bị thuỷ phân hay không; câu cao su lưu hoá (Đề 4) nói cao su lưu hoá
  // khó tan trong dung môi hơn, không nói nhựa vá săm làm bằng gì; “xanh lam” là lựa chọn sai của câu màu kết tủa Fe(OH)₃ ở kho, không nói
  // màu của Cu(OH)₂; “ion Cr³⁺” là lựa chọn sai của câu [Cr(CO)₆] ở kho, không cho biết điện tích của ion trung tâm trong [CrCl₂(H₂O)₄]⁺.
  "tn-de7#3 → tn-de1#3: fructose", "tn-de4#9 → tn-de7#8: trong dung môi", "ck2-de2#16 → tn-de7#17: xanh lam", "ck2-de2#19 → tn-de7#18: cr³⁺",
  // Đề 8: câu lòng trắng trứng (Đề 2) nói protein đông tụ khi đun nóng, không nói protein đông tụ bởi acid của nước chanh; “acetylene và
  // hydrogen” là lựa chọn sai của câu thành phần khí LPG (Đề 5), không nói acetylene dùng trong đèn xì; câu aniline với nitrous acid không nói
  // aniline có làm quỳ tím đổi màu hay không.
  "tn-de2#20 → tn-de8#6: bị đông tụ", "tn-de5#12 → tn-de8#11: acetylene", "tn-de8#5 → ck1-de2#10: aniline"];
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
  const p = docPhuc("[CoCl(NH₃)₅]²⁺"); assert.ok(p.M === "Co" && p.n === 6 && p.tam === 3); assert.equal(docPhuc("[Fe(CN)₆]⁴⁻").tam, 2); assert.deepEqual(phucTrong("ion [Fe(CN)₆]⁴⁻."), ["[Fe(CN)₆]⁴⁻"]);
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
  // đáp án có tol: số chưa làm tròn ở câu khác (1,239 với đáp án 1,24) cũng là lộ đáp án; số ngoài khoảng sai số thì không
  const qPin = tim("Một pin Galvani gồm hai điện cực chuẩn"); ten.set(qPin, "thử");
  assert.deepEqual(thu([qPin, ghi(khac, "Pin này có E°pin = 1,239 (V).")]), ["1,24 V"]);
  assert.deepEqual(thu([qPin, ghi(khac, "Pin này có E°pin = 1,25 (V).")]), []);
}
DE.forEach((b) => console.log(`${b.id}: ${b.questions.length} câu (${b.questions.filter((q) => q.type === "mc").length} nhiều lựa chọn, ${b.questions.filter((q) => q.type === "tf4").length} đúng/sai 4 ý, ${b.questions.filter((q) => q.type === "num").length} trả lời ngắn), ` +
  `${Object.keys(b.passages || {}).length} đoạn thông tin; đáp án đúng dài nhất hoặc ngắn nhất ở ${b._le}/18 câu nhiều lựa chọn.`));
console.log(n + " câu đã tính lại hoặc so với bảng (" + soPT + " phương trình hoá học).");
console.log("MATH OK");
