// Tính lại đáp án ngân hàng Toán 5 cuối năm (data/banks/5-toan.js): hai đề cố định toan5-ck2-de1, toan5-ck2-de2 và các câu riêng của đề
// ngẫu nhiên toan5-ck2-ngau-nhien (Phiên N5-ck2-toan; cả năm, trọng tâm Toán 5 tập hai Bài 56–67, ôn Bài 36–55 và học kì I). Mỗi câu khớp
// đúng một mục của CHECKS (chữ has nằm trong đề bài) rồi so đáp án với kết quả tính bằng code: trắc nghiệm o[0], điền khuyết ans[0] (số so
// theo giá trị, chữ so chữ), đúng/sai a, đúng/sai 4 ý a (từng ý tính lại), trả lời bằng số ans kèm đơn vị, nối cột r của từng ô l, sắp xếp
// o. Số tính bằng số hữu tỉ chính xác: số đo thời gian đổi ra giây (1 ngày = 24 giờ, 1 giờ = 60 phút, 1 phút = 60 giây) rồi cộng, trừ, nhân,
// chia, viết lại “2 giờ 30 phút” (phút, giây dưới 60), giờ trong ngày theo 24 giờ (quá 24 giờ là hôm sau); số ngày của từng tháng, năm nhuận
// theo bảng; vận tốc v = s : t đổi ra m/giây rồi ra km/giờ, m/phút, m/giây; quãng đường s = v × t, thời gian t = s : v; hai xe (hai người) đi
// ngược chiều, cùng chiều tính quãng đường từng xe rồi cộng, trừ; dãy số liệu đọc từ đề bài rồi đếm, phân loại; tỉ số của số lần lặp lại
// một sự kiện viết a/b (b là tổng số lần, không rút gọn); phần ôn: chia số thập phân, diện tích hình thang, chu vi, diện tích hình tròn
// (π lấy 3,14), tỉ số, tỉ số phần trăm, giá trị phần trăm, tổng – tỉ, đổi đơn vị đo thể tích, diện tích xung quanh, toàn phần, thể tích
// hình hộp chữ nhật. Câu có hình: đọc lại biểu đồ hình quạt tròn (mỗi phần một hình quạt, phần đầu bắt đầu ở đỉnh, các phần nối tiếp nhau
// đủ một vòng; góc ở tâm khớp số phần trăm ghi trong phần, các phần cộng lại 100%, phần ghi “?” là phần còn lại; mỗi phần một ô chú giải),
// mặt đồng hồ (12 số đúng chỗ, kim phút dài và mảnh, kim giờ ngắn và đậm, kim giờ chỉ đúng chỗ theo số phút), sơ đồ quãng đường (đường
// thẳng, tên điểm dưới vạch, mũi tên đi ra từ điểm xuất phát và vận tốc trên mũi tên, đường ghi số đo; vị trí các điểm đúng tỉ lệ với quãng
// đường từng xe đi); tên hình (title) nói rõ hình vẽ gì; chữ trong hình cỡ từ 13, nằm trọn trong khung, không đè nhau. Rồi kiểm tra như
// tests/toan5-gk2.js: ma trận (mỗi ô rút 1 câu và có 4 câu: một câu ở mỗi đề cố định, hai câu riêng; phần trọng tâm Chủ đề 10, 11 nhiều câu
// hơn phần ôn; chủ đề ôn mang đúng chữ chủ đề của kho giữa kì II, cuối kì I; rút thử ra đúng 10 Biết, 8 Hiểu, 7 Vận dụng; đã làm hết một
// đề cố định thì không gặp lại câu của đề đó), đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không
// quá một phần ba số câu nhiều lựa chọn, không lặp chữ của nhãn chủ đề, đúng/sai 4 ý không lặp kiểu Đ/S, không có số âm, số thập phân viết
// dấu phẩy, số từ bốn chữ số ngăn hàng nghìn bằng khoảng trắng, vận tốc viết km/giờ, m/phút, m/giây, đề không ghi sẵn công thức, đề bài không
// trùng câu nào trong data/banks/5-toan.js, câu ôn không trùng đề bài, chuỗi 6 từ của đề bài, đáp án câu cùng chủ đề của kho giữa kì II, cuối
// kì I, không gần trùng câu của data/banks/4-toan.js và các kho Toán 5 khác (cặp hai âm tiết chung), dò lộ đáp án giữa mọi cặp câu của kho,
// lời dặn và câu cùng chủ đề của kho giữa kì II, cuối kì I (đề “Ôn chủ đề” rút chung) và, nếu có ../OnUp-Book, so mọi trường chữ với chữ OCR
// của mọi cuốn (không chuỗi 8 từ nào trùng), so số liệu của đề với từng trang Toán 5 hai tập (không trang nào có từ ba số liệu riêng của một
// câu), so với câu của mọi kho khác (không chuỗi 8 từ nào trùng). Số đề, số câu lấy từ danh mục.
// Chạy: node tests/toan5-ck2.js → in MATH OK. DO_LO=1 in đáp án bằng chữ có ở câu khác; DO_SACH=1 in chuỗi 6 từ trùng sách và các
// trang có số liệu chung; DO_KHO=1 in chuỗi 6 từ trùng kho khác, câu gần trùng; DO_ON=1 in chuỗi 5 từ của câu ôn có ở câu cùng chủ đề
// của kho giữa kì II, cuối kì I (để người làm xem).
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan5-ck2-ngau-nhien";
// chủ đề theo thứ tự của ma trận: [chữ chủ đề, phần]. Phần ôn mang đúng chữ chủ đề của kho cuối kì I (toan5-ck1-*) và giữa kì II
// (toan5-gk2-*); phần trọng tâm theo tên bài của Chủ đề 10 (Bài 56–62) và Chủ đề 11 (Bài 63–67) của Toán 5 tập hai.
const PHAN = [["Chia số thập phân", "ck1"], ["Hình thang", "ck1"], ["Hình tròn", "ck1"], ["Tỉ số, tỉ số phần trăm", "gk2"],
  ["Tìm giá trị phần trăm của một số", "gk2"], ["Tìm hai số khi biết tổng và tỉ số", "gk2"], ["Mét khối", "gk2"],
  ["Diện tích xung quanh, toàn phần của hình hộp chữ nhật", "gk2"], ["Thể tích của hình hộp chữ nhật", "gk2"],
  ["Các đơn vị đo thời gian", "cd10"], ["Cộng, trừ số đo thời gian", "cd10"], ["Nhân, chia số đo thời gian với một số", "cd10"],
  ["Vận tốc", "cd10"], ["Quãng đường, thời gian của một chuyển động đều", "cd10"], ["Thu thập, phân loại, sắp xếp các số liệu", "cd11"],
  ["Biểu đồ hình quạt tròn", "cd11"], ["Tỉ số của số lần lặp lại một sự kiện", "cd11"]];
const CHU_DE = PHAN.map((p) => p[0]);
const phanCua = (t) => (PHAN.find((p) => p[0] === t) || [])[1];

/* ---------- số: hữu tỉ chính xác { n, d } (d > 0, tối giản) ---------- */
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const F = (n, d) => { d = d === undefined ? 1 : d; assert.ok(Number.isInteger(n) && Number.isInteger(d) && d !== 0, `phân số lạ ${n}/${d}`); if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return { n: n / g, d: d / g }; };
const add = (a, b) => F(a.n * b.d + b.n * a.d, a.d * b.d);
const sub = (a, b) => F(a.n * b.d - b.n * a.d, a.d * b.d);
const mul = (a, b) => F(a.n * b.n, a.d * b.d);
const div = (a, b) => { assert.ok(b.n !== 0, "chia cho 0"); return F(a.n * b.d, a.d * b.n); };
const cmp = (a, b) => Math.sign(a.n * b.d - b.n * a.d);
const eq = (a, b) => cmp(a, b) === 0;
const toNum = (a) => a.n / a.d;
const thou = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
// đọc số viết như trong đề: "3,75", "1 080", "2 500 000", "3/4"
const fr = (s) => {
  s = String(s).trim().replace(/\s+/g, " ");
  let m = /^(\d+)\/(\d+)$/.exec(s);
  if (m) return F(+m[1], +m[2]);
  m = /^(\d{1,3}(?: \d{3})+|\d+)(?:,(\d+))?$/.exec(s);
  if (m) { const ip = m[1].replace(/ /g, ""), fp = m[2] || ""; return F(+(ip + fp), 10 ** fp.length); }
  throw new Error("không đọc được số: " + s);
};
const R = (x) => (x && typeof x === "object" ? x : fr(String(x).replace(".", ",")));
// số thập phân viết kiểu sách ("2 040 000", "3,92")
const fmtDec = (a) => {
  let d = a.d, e2 = 0, e5 = 0; while (d % 2 === 0) { d /= 2; e2++; } while (d % 5 === 0) { d /= 5; e5++; }
  assert.equal(d, 1, "không viết được thành số thập phân hữu hạn: " + a.n + "/" + a.d);
  const p = Math.max(e2, e5), s = String(Math.abs(a.n) * (10 ** p / a.d)).padStart(p + 1, "0");
  assert.ok(a.n >= 0, "không có số âm");
  return thou(s.slice(0, s.length - p)) + (p ? "," + s.slice(s.length - p) : "");
};
const nguyen = (a) => { assert.equal(a.d, 1, "cần số tự nhiên: " + a.n + "/" + a.d); return a.n; };
const ghi = (a, u) => fmtDec(R(a)) + (u ? " " + u : "");

/* ---------- biểu thức: + − × : ( ), số thập phân "3,75", số "1 080", phân số "2/5" ---------- */
const ev = (src) => {
  const s = String(src).replace(/[−–]/g, "-"), T = [];
  const re = /(\d{1,3}(?: \d{3})+(?:,\d+)?|\d+(?:,\d+)?)(?:\/(\d+))?|([-+×:()])/y;
  let i = 0;
  while (i < s.length) {
    if (s[i] === " ") { i++; continue; }
    re.lastIndex = i; const m = re.exec(s); assert.ok(m, "biểu thức lạ: " + src + " (ở “" + s.slice(i) + "”)");
    if (m[1]) T.push(m[2] ? div(fr(m[1]), F(+m[2])) : fr(m[1])); else T.push(m[3]);
    i = re.lastIndex;
  }
  let k = 0;
  const so = () => { const t = T[k++]; if (t === "(") { const v = tong(); assert.equal(T[k++], ")", "thiếu ngoặc: " + src); return v; } assert.ok(t && typeof t === "object", "biểu thức lạ: " + src); return t; };
  const tich = () => { let v = so(); while (T[k] === "×" || T[k] === ":") v = T[k++] === "×" ? mul(v, so()) : div(v, so()); return v; };
  const tong = () => { let v = tich(); while (T[k] === "+" || T[k] === "-") v = T[k++] === "+" ? add(v, tich()) : sub(v, tich()); return v; };
  const v = tong(); assert.equal(k, T.length, "biểu thức thừa: " + src); return v;
};

/* ---------- đơn vị đo: độ dài, diện tích, thể tích (gấp 1 000), dung tích (1 l = 1 dm³) ---------- */
const DV = {}, LOAI = {};
["km", "hm", "dam", "m", "dm", "cm", "mm"].forEach((u, i) => { DV[u] = F(10 ** (6 - i)); LOAI[u] = "dài"; });
Object.assign(DV, { "km²": F(1e12), ha: F(1e10), "m²": F(1e6), "dm²": F(1e4), "cm²": F(100), "mm²": F(1) });
["km²", "ha", "m²", "dm²", "cm²", "mm²"].forEach((u) => (LOAI[u] = "rộng"));
Object.assign(DV, { "m³": F(1e6), "dm³": F(1000), "cm³": F(1), l: F(1000), ml: F(1) });
["m³", "dm³", "cm³", "l", "ml"].forEach((u) => (LOAI[u] = "khối"));
const DV_RE = "km²|m²|dm²|cm²|mm²|m³|dm³|cm³|ha|km|hm|dam|mm|cm|dm|m|ml|l";
// "3 dm³ 40 cm³", "2,4 m³", "1 800 m" → số đo theo đơn vị u
const doi = (s, u) => {
  const P = [...String(s).matchAll(new RegExp("(\\d[\\d ]*(?:,\\d+)?)\\s*(" + DV_RE + ")(?![\\p{L}²³/])", "gu"))];
  assert.ok(P.length && P.map((m) => m.index + m[0].length).pop() === String(s).trim().length && P[0].index === 0, "số đo lạ: " + s);
  P.forEach((m) => assert.equal(LOAI[m[2]], LOAI[u], "khác loại đơn vị: " + s + " → " + u));
  return div(P.reduce((t, m) => add(t, mul(fr(m[1].trim()), DV[m[2]])), F(0)), DV[u]);
};
const tuMet = (x, u) => div(mul(x, DV.m), DV[u]); // x mét → đơn vị độ dài u

/* ---------- hình phẳng, hình khối, tỉ số, phần trăm (ôn) ---------- */
const PI = fr("3,14");
const dtThang = (a, b, h) => div(mul(add(R(a), R(b)), R(h)), F(2));
const Str = (r) => mul(mul(PI, R(r)), R(r)); // diện tích hình tròn bán kính r
const Cv = (r) => mul(mul(PI, R(r)), F(2)); // chu vi hình tròn bán kính r
const phanTram = (a, b) => mul(div(R(a), R(b)), F(100)); // tỉ số phần trăm của a và b (số trước kí hiệu %)
const giaTri = (n, p) => div(mul(R(n), R(p)), F(100)); // p% của n
const tongTi = (t, m, n) => { const mot = div(R(t), F(m + n)); return [mul(mot, F(m)), mul(mot, F(n))]; }; // tổng t, tỉ số m : n
const Sxq = (a, b, c) => mul(mul(add(R(a), R(b)), F(2)), R(c));
const Stp = (a, b, c) => add(Sxq(a, b, c), mul(mul(R(a), R(b)), F(2)));
const V = (a, b, c) => mul(mul(R(a), R(b)), R(c));

/* ---------- số đo thời gian (Bài 56–58): đổi ra giây ---------- */
const TGU = { "tuần lễ": 604800, "ngày": 86400, "giờ": 3600, "phút": 60, "giây": 1 };
// "2 giờ 15 phút", "1,5 giờ", "3 phút 18 giây", "366 ngày" → số giây (hữu tỉ)
const giay = (s) => {
  s = String(s).trim();
  const P = [...s.matchAll(/(\d[\d ]*(?:,\d+)?)\s*(tuần lễ|ngày|giờ|phút|giây)(?!\p{L})/gu)];
  assert.ok(P.length && P.map((m) => m[0]).join(" ") === s, "số đo thời gian lạ: " + s);
  return P.reduce((t, m) => add(t, mul(fr(m[1].trim()), F(TGU[m[2]]))), F(0));
};
// số giây → “2 giờ 30 phút”, “10 phút 20 giây” (phút, giây dưới 60; bỏ phần bằng 0)
const tg = (sec) => { const n = nguyen(sec), h = Math.floor(n / 3600), m = Math.floor((n % 3600) / 60), s_ = n % 60, p = [];
  if (h) p.push(h + " giờ"); if (m) p.push(m + " phút"); if (s_) p.push(s_ + " giây"); return p.join(" ") || "0 giây"; };
// thời điểm trong ngày (số giây từ 0 giờ; quá 24 giờ là hôm sau) → “21 giờ 5 phút”
const luc = (sec) => tg(F(nguyen(sec) % 86400));
// số ngày của từng tháng (năm nhuận: tháng Hai 29 ngày, cả năm 366 ngày)
const SO_NGAY = { "Một": 31, "Hai": [28, 29], "Ba": 31, "Tư": 30, "Năm": 31, "Sáu": 30, "Bảy": 31, "Tám": 31, "Chín": 30, "Mười": 31, "Mười một": 30, "Mười hai": 31 };
assert.equal(Object.values(SO_NGAY).reduce((s, v) => s + [].concat(v)[0], 0), 365, "năm không nhuận có 365 ngày");

/* ---------- vận tốc, quãng đường, thời gian (Bài 59–62) ---------- */
const VTU = { "km/giờ": F(1000, 3600), "m/phút": F(1, 60), "m/giây": F(1) }; // 1 đơn vị = … m/giây
const vt = (s) => { const m = /^(\d[\d ]*(?:,\d+)?) (km\/giờ|m\/phút|m\/giây)$/.exec(String(s).trim()); assert.ok(m, "vận tốc lạ: " + s); return mul(fr(m[1]), VTU[m[2]]); };
const doiVT = (v, u) => div(v, VTU[u]); // v (m/giây) → đơn vị u
const vanToc = (s, t, u) => doiVT(div(doi(s, "m"), giay(t)), u); // v = s : t
const qd = (v, sec, u) => tuMet(mul(vt(v), sec), u); // s = v × t (t tính bằng giây)
const quangDuong = (v, t, u) => qd(v, giay(t), u);
const thoiGian = (s, v) => div(doi(s, "m"), vt(v)); // t = s : v (giây)

/* ---------- số liệu thống kê (Bài 63–67) ---------- */
// dãy số liệu sau dấu hai chấm của đề bài: "là: 4; 6; 3; 5." → [số]
const dayCua = (q) => { const m = /: ((?:\d+(?:,\d+)?; )+\d+(?:,\d+)?)\./.exec(q.q); assert.ok(m, "đề bài cần một dãy số liệu ngăn bằng dấu chấm phẩy"); return m[1].split("; ").map(fr); };
// tỉ số của số lần lặp lại một sự kiện so với tổng số lần thực hiện, viết như sách (7/20, không rút gọn)
const ti = (a, b) => { assert.ok(Number.isInteger(a) && Number.isInteger(b) && a <= b, "tỉ số lạ"); return a + "/" + b; };
// số đầu tiên sau cụm chữ trong ý của câu đúng/sai 4 ý
const soSau = (s, cum) => { const m = new RegExp(cum + " (\\d+\\/\\d+|\\d[\\d ]*(?:,\\d+)?)").exec(s); assert.ok(m, "không thấy số sau “" + cum + "” trong “" + s + "”"); return /\//.test(m[1]) ? m[1] : fr(m[1]); };

/* ---------- hình SVG ---------- */
const nums = (s) => s.trim().split(/[\s,]+/).map(Number);
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const pts2 = (s) => { const v = nums(s), p = []; for (let i = 0; i < v.length; i += 2) p.push([v[i], v[i + 1]]); return p; };
const LINES = (svg) => [...svg.matchAll(/<line [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { a: [+a.x1, +a.y1], b: [+a.x2, +a.y2], w: +(a["stroke-width"] || 1), stroke: a.stroke || "ink" }; });
const POLYS = (svg) => [...svg.matchAll(/<polygon [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { p: pts2(a.points), fill: a.fill || "none" }; });
const RECTS = (svg) => [...svg.matchAll(/<rect [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { x: +a.x, y: +a.y, w: +a.width, h: +a.height, fill: a.fill || "none" }; });
const CIRCLES = (svg) => [...svg.matchAll(/<circle [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { c: [+a.cx, +a.cy], r: +a.r }; });
const TEXTS = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { at: [+a.x, +a.y], t: m[2], fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start", b: a["font-weight"] === "700" }; });
const TITLE = (svg) => (/<title>([^<]*)<\/title>/.exec(svg) || [])[1] || "";
const rong = (t) => (t.b ? 0.62 : 0.55) * t.fs * [...t.t].length; // ước bề rộng chữ (Noto Sans)
const hopChu = (t) => { const w = rong(t), x0 = t.anchor === "middle" ? t.at[0] - w / 2 : t.anchor === "end" ? t.at[0] - w : t.at[0]; return [x0, t.at[1] - 0.75 * t.fs, x0 + w, t.at[1] + 0.25 * t.fs]; };
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
// mọi chữ trong hình cỡ từ 13 trở lên, nằm trọn trong khung, không đè lên nhau
const chuHinh = (svg, ten) => {
  const v = nums(/viewBox="([^"]+)"/.exec(svg)[1]), T = TEXTS(svg);
  T.forEach((t) => { const h = hopChu(t); assert.ok(t.fs >= 13, ten + ": chữ “" + t.t + "” nhỏ hơn cỡ 13"); assert.ok(h[0] >= 0 && h[2] <= v[2] && h[1] >= 0 && h[3] <= v[3], ten + ": chữ “" + t.t + "” tràn khỏi khung hình"); });
  T.forEach((t, i) => T.slice(i + 1).forEach((u) => { const a = hopChu(t), b = hopChu(u); assert.ok(!(a[0] < b[2] - 1 && b[0] < a[2] - 1 && a[1] < b[3] - 1 && b[1] < a[3] - 1), ten + ": chữ “" + t.t + "” đè lên chữ “" + u.t + "”"); }));
  assert.ok(TITLE(svg).length >= 12, ten + ": hình cần tên (title) nói rõ hình vẽ gì");
};
const hinhDaDoc = new Set();
const doc = (q) => { assert.ok(q.svg, "câu cần hình"); hinhDaDoc.add(q.svg); return q.svg; };
const gocDo = (c, p) => { const a = (Math.atan2(p[1] - c[1], p[0] - c[0]) * 180) / Math.PI; return (a + 360) % 360; }; // từ trục ngang, theo chiều kim đồng hồ
const lech = (a, b) => (((a - b) % 360) + 360) % 360; // góc quay từ b đến a theo chiều kim đồng hồ
/* Biểu đồ hình quạt tròn (như tests/toan7-ck1.js): mỗi phần là một hình quạt (path "M tâm L đầu cung A r r 0 cờ 1 cuối cung Z"), phần đầu
   bắt đầu ở đỉnh, các phần nối tiếp nhau theo chiều kim đồng hồ đủ một vòng; số phần trăm (hoặc "?") ghi trong hình quạt; góc ở tâm khớp
   số phần trăm; các phần cộng lại 100%; mỗi phần một màu, một ô chú giải (ô vuông 16, tên ghi ngay bên phải) → [{ ten, p (null khi “?”), d }] */
const docQuat = (svg, ten = "biểu đồ") => {
  const T = TEXTS(svg);
  const chuGiai = RECTS(svg).filter((r) => r.w === 16).map((r) => { const t = T.filter((t_) => Math.abs(t_.at[0] - (r.x + 24)) < 0.6 && Math.abs(t_.at[1] - (r.y + 13)) < 0.6); assert.equal(t.length, 1, ten + ": mỗi ô chú giải một tên"); return { fill: r.fill, ten: t[0].t }; });
  assert.equal(new Set(chuGiai.map((c) => c.fill)).size, chuGiai.length, ten + ": mỗi ô chú giải một màu");
  assert.equal(new Set(chuGiai.map((c) => c.ten)).size, chuGiai.length, ten + ": mỗi ô chú giải một tên khác nhau");
  let cuoi = null, tong = 0;
  const out = [...svg.matchAll(/<path d="([^"]+)" fill="([^"]+)"[^>]*>/g)].map((m, i) => {
    const k = /^M ([\d.]+) ([\d.]+) L ([\d.]+) ([\d.]+) A ([\d.]+) ([\d.]+) 0 ([01]) 1 ([\d.]+) ([\d.]+) Z$/.exec(m[1]);
    assert.ok(k, ten + ": phần của biểu đồ hình quạt tròn là một hình quạt");
    const [cx, cy, x0, y0, r, r2, lon, x1, y1] = k.slice(1).map(Number), O = [cx, cy];
    assert.ok(r === r2 && Math.abs(dist([x0, y0], O) - r) < 0.15 && Math.abs(dist([x1, y1], O) - r) < 0.15, ten + ": hai đầu cung nằm trên đường tròn");
    if (i === 0) assert.ok(Math.abs(x0 - cx) < 0.15 && y0 < cy, ten + ": phần đầu bắt đầu ở đỉnh đường tròn");
    const a0 = gocDo(O, [x0, y0]), d = lech(gocDo(O, [x1, y1]), a0);
    assert.equal(lon, d > 180 ? 1 : 0, ten + ": cờ cung lớn khớp số đo của hình quạt");
    if (cuoi) assert.ok(dist(cuoi, [x0, y0]) < 0.15, ten + ": các hình quạt nối tiếp nhau");
    cuoi = [x1, y1]; tong += d;
    const c = chuGiai.find((g_) => g_.fill === m[2]); assert.ok(c, ten + ": màu của hình quạt có trong chú giải");
    const nhan = T.filter((t) => /^(?:\d+(?:,\d+)?%|\?)$/.test(t.t) && dist([t.at[0], t.at[1] - 5], O) < r && lech(gocDo(O, [t.at[0], t.at[1] - 5]), a0) < d);
    assert.equal(nhan.length, 1, ten + ": mỗi hình quạt một số phần trăm ở trong");
    const p = nhan[0].t === "?" ? null : toNum(fr(nhan[0].t.slice(0, -1)));
    if (p !== null) assert.ok(Math.abs(d / 3.6 - p) < 0.15, ten + ": hình quạt “" + c.ten + "” có góc " + d.toFixed(1) + "°, không khớp " + p + "%");
    return { ten: c.ten, p, d };
  });
  assert.ok(Math.abs(tong - 360) < 0.5, ten + ": các hình quạt đủ một vòng tròn");
  const biet = out.filter((o) => o.p !== null).reduce((s_, o) => s_ + o.p, 0), mo = out.filter((o) => o.p === null);
  assert.ok(mo.length <= 1 && (mo.length ? Math.abs(mo[0].d / 3.6 - (100 - biet)) < 0.15 : Math.abs(biet - 100) < 1e-9), ten + ": các phần cộng lại 100%");
  assert.deepEqual(out.map((o) => o.ten).sort(), chuGiai.map((c) => c.ten).sort(), ten + ": mỗi phần một ô chú giải");
  assert.equal(TEXTS(svg).filter((t) => /%|\?/.test(t.t)).length, out.length, ten + ": số phần trăm chỉ ghi trong hình quạt");
  return out;
};
const phan = (qt, ten) => { const o = qt.find((x) => x.ten === ten); assert.ok(o && o.p !== null, "biểu đồ không có phần ghi số của " + ten); return o.p; };
/* Mặt đồng hồ: một đường tròn lớn; số 1–12 đặt đúng chỗ (số k ở góc 30k độ tính từ số 12, theo chiều kim đồng hồ); hai kim là hai đoạn
   thẳng từ tâm: kim phút dài và mảnh, kim giờ ngắn và đậm; kim phút chỉ đúng một vạch phút, kim giờ lệch khỏi số giờ đúng phút : 2 độ
   → { gio (1–12), phut } */
const docDongHo = (svg) => {
  const C = CIRCLES(svg).filter((c) => c.r >= 40); assert.equal(C.length, 1, "mặt đồng hồ là một đường tròn lớn");
  const O = C[0].c, R_ = C[0].r, huong = (p) => (gocDo(O, p) + 90) % 360; // góc tính từ số 12
  for (let k = 1; k <= 12; k++) {
    const t = TEXTS(svg).filter((t_) => t_.t === String(k)); assert.equal(t.length, 1, "mặt đồng hồ có đúng một số " + k);
    const p = [t[0].at[0], t[0].at[1] - 5], dd = ((huong(p) - ((30 * k) % 360) + 540) % 360) - 180; assert.ok(Math.abs(dd) < 1.5 && Math.abs(dist(p, O) - (R_ - 15)) < 2, "số " + k + " đặt sai chỗ");
  }
  const kim = LINES(svg).filter((l) => dist(l.a, O) < 0.5).map((l) => ({ len: dist(l.a, l.b), w: l.w, goc: huong(l.b) })).sort((p, q) => q.len - p.len);
  assert.equal(kim.length, 2, "đồng hồ có hai kim");
  const [kp, kg] = kim; assert.ok(kp.len > kg.len + 8 && kp.w < kg.w, "kim phút dài và mảnh hơn kim giờ");
  const phut = Math.round(kp.goc / 6) % 60; assert.ok(Math.abs(kp.goc - 6 * Math.round(kp.goc / 6)) < 0.3, "kim phút chỉ đúng một vạch phút");
  const g = (kg.goc - phut / 2 + 360) % 360, gio = Math.round(g / 30) % 12 || 12;
  assert.ok(Math.abs(g - 30 * (gio % 12)) < 0.6 || Math.abs(g - 360) < 0.6, "kim giờ chỉ đúng chỗ của " + gio + " giờ " + phut + " phút");
  return { gio, phut };
};
/* Sơ đồ quãng đường: đường thẳng nằm ngang (nét ink 2); vạch ở các điểm cắt qua đường thẳng, tên điểm (chữ in hoa đậm) ngay dưới vạch;
   mũi tên (nét acc, đầu mũi tên là tam giác) đi ra từ điểm xuất phát, vận tốc ghi ngay trên mũi tên; đường ghi số đo dưới tên điểm, hai đầu
   ở hai vạch, chữ số đo ngay dưới → { X: { tên: hoành độ }, muiTen: [{ tu, huong, v }], so: [{ tu, den, chu }] } */
const docSoDo = (svg) => {
  const L = LINES(svg), T = TEXTS(svg);
  const truc = L.filter((l) => l.a[1] === l.b[1] && l.stroke === "ink" && l.w === 2).sort((p, q) => Math.abs(q.b[0] - q.a[0]) - Math.abs(p.b[0] - p.a[0]))[0];
  assert.ok(truc, "sơ đồ cần đường thẳng"); const Y = truc.a[1], X0 = Math.min(truc.a[0], truc.b[0]), X1 = Math.max(truc.a[0], truc.b[0]);
  const vach = L.filter((l) => l.a[0] === l.b[0] && Math.min(l.a[1], l.b[1]) < Y && Math.max(l.a[1], l.b[1]) > Y).map((l) => l.a[0]);
  const X = {};
  vach.forEach((x) => { const t = T.filter((t_) => t_.b && Math.abs(t_.at[0] - x) < 0.6 && t_.at[1] > Y && t_.at[1] < Y + 30); assert.equal(t.length, 1, "mỗi vạch một tên điểm ngay dưới"); assert.ok(/^[A-Z]$/.test(t[0].t) && !(t[0].t in X), "tên điểm là một chữ in hoa, không trùng"); X[t[0].t] = x; });
  assert.ok(vach.includes(X0) && vach.includes(X1), "hai đầu đường thẳng là hai điểm");
  const tenO = (x) => Object.keys(X).find((k) => Math.abs(X[k] - x) < 0.6);
  const muiTen = L.filter((l) => l.a[1] === l.b[1] && l.a[1] < Y && l.stroke === "acc").map((l) => {
    const huong = Math.sign(l.b[0] - l.a[0]), tip = POLYS(svg).filter((p) => Math.abs(p.p[0][1] - l.a[1]) < 0.01 && Math.abs(p.p[0][0] - (l.b[0] + huong * 8)) < 0.6);
    assert.equal(tip.length, 1, "mỗi mũi tên một đầu mũi tên"); const tu = tenO(l.a[0]); assert.ok(tu, "mũi tên đi ra từ một điểm");
    const lo = Math.min(l.a[0], tip[0].p[0][0]), hi = Math.max(l.a[0], tip[0].p[0][0]);
    const nhan = T.filter((t) => /\/(giờ|phút|giây)$/.test(t.t) && t.at[0] > lo && t.at[0] < hi && t.at[1] < l.a[1] && t.at[1] > l.a[1] - 20);
    assert.equal(nhan.length, 1, "mỗi mũi tên một vận tốc ghi ngay trên"); return { tu, huong, v: nhan[0].t };
  });
  const so = L.filter((l) => l.a[1] === l.b[1] && l.a[1] > Y + 30 && l.a[0] !== l.b[0]).map((l) => {
    const tu = tenO(Math.min(l.a[0], l.b[0])), den = tenO(Math.max(l.a[0], l.b[0])); assert.ok(tu && den, "đường ghi số đo đi từ điểm đến điểm");
    const nhan = T.filter((t) => Math.abs(t.at[0] - (l.a[0] + l.b[0]) / 2) < 0.6 && t.at[1] > l.a[1] && t.at[1] < l.a[1] + 25);
    assert.equal(nhan.length, 1, "mỗi đường ghi số đo một chữ ngay dưới"); return { tu, den, chu: nhan[0].t };
  });
  assert.equal(T.length, Object.keys(X).length + muiTen.length + so.length, "sơ đồ không có chữ thừa");
  return { X, muiTen, so };
};
// vị trí các điểm đúng tỉ lệ: đoạn (a, b) dài theo hình tỉ lệ với số đo thật s[a, b]
const tiLe = (sd, doan) => { const k = doan.map(([a, b, s]) => (sd.X[b] - sd.X[a]) / toNum(s)); k.forEach((x) => assert.ok(Math.abs(x / k[0] - 1) < 0.005, "các điểm trên sơ đồ không đúng tỉ lệ")); };
const muiTenTu = (sd, tu, huong, v) => { const m = sd.muiTen.filter((x) => x.tu === tu); assert.ok(m.length === 1 && m[0].huong === huong && m[0].v === v, "mũi tên từ " + tu + " cần hướng " + huong + ", vận tốc " + v); };

/* ---------- kiểm tra từng câu: has (chữ có trong đề bài), right(q) (đáp án tính bằng code), more(q) (kiểm tra thêm) ---------- */
const CHECKS = [
  /* Ôn học kì I: chia số thập phân, hình thang, hình tròn */
  { has: "Kết quả của phép chia 47,6 : 4 là:", right: () => ghi(ev("47,6 : 4")) },
  { has: "8,45 : 5 = ___", right: () => ev("8,45 : 5") },
  { has: "36,9 : 9 = 4,1", right: () => eq(ev("36,9 : 9"), fr("4,1")) },
  { has: "Thương của 13,3 và 0,7 là:", right: () => ghi(ev("13,3 : 0,7")) },
  { has: "Một hình thang có đáy lớn 15 cm, đáy bé 9 cm và chiều cao 8 cm.", right: () => ghi(dtThang(15, 9, 8), "cm²") },
  { has: "Một mảnh vườn hình thang có hai đáy dài 23 m và 17 m, chiều cao 14 m.", right: () => ghi(dtThang(23, 17, 14), "m²") },
  { has: "Hình thang có đáy lớn 6,4 dm, đáy bé 3,6 dm và chiều cao 4,5 dm thì có diện tích là ___ dm².", right: () => dtThang("6,4", "3,6", "4,5") },
  { has: "Một hình thang có hai đáy dài 10 m và 8 m, chiều cao 5 m. Hình thang đó có diện tích 90 m².", right: () => eq(dtThang(10, 8, 5), F(90)) },
  { has: "Một sân khấu hình tròn có đường kính 8 m. Người ta trải thảm kín mặt sân khấu, mỗi mét vuông thảm giá 120 000 đồng.", right: () => ghi(mul(Str(div(F(8), F(2))), fr("120 000")), "đồng") },
  { has: "Một hồ nước hình tròn có đường kính 20 m. Bao quanh hồ là một con đường rộng 2 m", right: () => { const r = div(F(20), F(2)); return ghi(sub(Str(add(r, F(2))), Str(r)), "m²"); } },
  { has: "có kim phút dài 9 cm. Trong 3 giờ, đầu kim phút đi được", right: () => ghi(mul(Cv(9), div(giay("3 giờ"), giay("1 giờ"))), "cm") },
  { has: "Hình tròn tâm O có bán kính 1 cm, hình tròn tâm I có bán kính 4 cm. Diện tích hình tròn tâm I bằng bao nhiêu lần", right: () => ghi(div(Str(4), Str(1)), "lần") },
  /* Ôn giữa kì II: tỉ số, phần trăm, tổng – tỉ, mét khối, hình hộp chữ nhật (chữ chủ đề như kho toan5-gk2-*) */
  { has: "Một hộp có 7 viên bi xanh và 9 viên bi đỏ. Tỉ số của số bi đỏ và số bi xanh là:", right: (q) => { assert.ok(q.o.includes("9 : 16") && q.o.includes("7 : 9"), "nhiễu: tỉ số với tổng số bi, tỉ số đảo"); return 9 + " : " + 7; } },
  { has: "Số thập phân 0,46 bằng bao nhiêu phần trăm?", right: () => ghi(mul(fr("0,46"), F(100)), "%") },
  { has: "Tỉ số phần trăm 60% bằng phân số 3/5.", right: () => eq(F(60, 100), F(3, 5)) },
  { has: "Tỉ số 11 : 20 bằng:", right: () => ghi(phanTram(11, 20)) + "%" },
  { has: "Một thư viện có 1 200 cuốn sách, trong đó 16% là truyện tranh.", right: () => ghi(giaTri("1 200", 16), "cuốn") },
  { has: "Một mảnh đất có diện tích 640 m², người ta dùng 45% diện tích để xây nhà.", right: (q) => { assert.ok(q.o.includes(ghi(sub(F(640), giaTri(640, 45)), "m²")), "nhiễu: phần đất còn lại"); return ghi(giaTri(640, 45), "m²"); } },
  { has: "Một đội trồng rừng được giao trồng 2 500 cây. Đến nay đội đã trồng được 68% số cây đó.", right: () => giaTri("2 500", 68) },
  { has: "Một vườn có 60 cây ăn quả, trong đó 35% là cây xoài. Vậy vườn có 21 cây xoài.", right: () => eq(giaTri(60, 35), F(21)) },
  { has: "Mẹ mua tất cả 56 quả cam và quýt, trong đó số quả cam bằng 3/4 số quả quýt. Mẹ biếu bà 10 quả quýt.", right: () => ghi(sub(tongTi(56, 3, 4)[1], F(10)), "quả") },
  { has: "Thu và Nga có tất cả 72 nhãn vở. Số nhãn vở của Thu bằng 5/7 số nhãn vở của Nga.", right: () => { const [thu, nga] = tongTi(72, 5, 7); return ghi(div(sub(nga, thu), F(2)), "nhãn vở"); } },
  { has: "Trung bình cộng của hai số là 49. Số thứ nhất bằng 3/4 số thứ hai. Tìm số thứ hai.", right: () => tongTi(mul(F(49), F(2)), 3, 4)[1] },
  { has: "Hai lớp 5A và 5B góp được tất cả 63 quyển sách cho thư viện. Số sách của lớp 5A bằng 4/5 số sách của lớp 5B. Sau đó, lớp 5A quyên góp thêm 9 quyển sách.", right: () => {
    const [a, b] = tongTi(63, 4, 5), a2 = add(a, F(9)); return cmp(a2, b) > 0 ? `Lớp 5A, nhiều hơn ${ghi(sub(a2, b))} quyển` : `Lớp 5B, nhiều hơn ${ghi(sub(b, a2))} quyển`; } },
  { has: "4 m³ 25 dm³ = ___ dm³", right: () => doi("4 m³ 25 dm³", "dm³") },
  { has: "1 m³ = ___ cm³", right: () => doi("1 m³", "cm³") },
  { has: "8 m³ 6 dm³ = 8,6 m³", right: () => eq(doi("8 m³ 6 dm³", "m³"), fr("8,6")) },
  { has: "Nối số đo ở cột trái với số đo có cùng giá trị ở cột phải.", right: (q) => q.l.map((l) => { const m = q.r.filter((r) => eq(doi(r, "dm³"), doi(l, "dm³"))); assert.equal(m.length, 1, "ô " + l + " bằng đúng một ô phải"); return m[0]; }),
    more: (q) => q.r.slice(q.l.length).forEach((r) => assert.ok(q.l.every((l) => !eq(doi(r, "dm³"), doi(l, "dm³"))), "ô thừa bằng một ô trái")) },
  { has: "Chiếc bể kính nuôi cá của nhà Khoa có dạng hình hộp chữ nhật dài 9 dm, rộng 5 dm, cao 4 dm. Tính diện tích xung quanh", right: () => ghi(Sxq(9, 5, 4), "dm²") },
  { has: "Một chiếc hộp giấy dạng hình hộp chữ nhật dài 8 cm, rộng 6 cm, cao 5 cm. Diện tích toàn phần", right: (q) => { assert.ok(q.o.includes(ghi(Sxq(8, 6, 5), "cm²")), "nhiễu: diện tích xung quanh"); return ghi(Stp(8, 6, 5), "cm²"); } },
  { has: "Một chiếc hộp đựng bút dạng hình hộp chữ nhật, mặt đáy là hình vuông cạnh 6 cm, chiều cao của hộp là 11 cm. Diện tích xung quanh", right: () => Sxq(6, 6, 11) },
  { has: "Phòng học của lớp 5A có dạng hình hộp chữ nhật dài 8 m, rộng 6 m, cao 3,5 m. Diện tích bốn bức tường xung quanh phòng học (tính cả các cửa) là 49 m².", right: () => eq(Sxq(8, 6, "3,5"), F(49)) },
  { has: "đáy bể dài 1,6 m, rộng 1 m. Trong bể đang có 1,28 m³ nước. Hỏi mực nước trong bể cao bao nhiêu mét?", right: () => ghi(div(fr("1,28"), mul(fr("1,6"), F(1))), "m") },
  { has: "Một khối gỗ dạng hình hộp chữ nhật dài 45 cm, rộng 24 cm, cao 18 cm. Người ta cắt đi một khối gỗ dạng hình lập phương cạnh 10 cm.", right: () => ghi(sub(V(45, 24, 18), V(10, 10, 10)), "cm³") },
  { has: "Một thùng chứa thóc dạng hình hộp chữ nhật dài 4 m, rộng 2,5 m, cao 1,2 m. Lượng thóc trong thùng chiếm 3/5 thể tích của thùng.", right: () => ghi(mul(V(4, "2,5", "1,2"), F(3, 5)), "m³") },
  { has: "Hộp A dạng hình hộp chữ nhật dài 12 cm, rộng 8 cm, cao 5 cm. Hộp B dạng hình hộp chữ nhật dài 10 cm, rộng 10 cm, cao 4 cm.", right: () => {
    const a = V(12, 8, 5), b = V(10, 10, 4); assert.notEqual(cmp(a, b), 0); return cmp(a, b) > 0 ? `Hộp A lớn hơn hộp B ${ghi(sub(a, b), "cm³")}` : `Hộp B lớn hơn hộp A ${ghi(sub(b, a), "cm³")}`; } },
  /* Các đơn vị đo thời gian (Bài 56) */
  { has: "Tháng Hai của năm nhuận có bao nhiêu ngày?", right: () => SO_NGAY["Hai"][1] + " ngày" },
  { has: "Tháng Mười một có 31 ngày.", right: () => SO_NGAY["Mười một"] === 31 },
  { has: "2 giờ 15 phút = ___ phút", right: () => div(giay("2 giờ 15 phút"), F(60)) },
  { has: "Mỗi khoảng thời gian ở cột trái bằng khoảng thời gian nào ở cột phải?", right: (q) => {
    const tri = (s) => (s === "1 năm nhuận" ? giay([].concat(SO_NGAY["Hai"])[1] - 28 + 365 + " ngày") : giay(s));
    return q.l.map((l) => { const m = q.r.filter((r) => eq(tri(r), tri(l))); assert.equal(m.length, 1, "ô " + l + " bằng đúng một ô phải"); return m[0]; }); },
    more: (q) => q.r.slice(q.l.length).forEach((r) => assert.ok(q.l.every((l) => l === "1 năm nhuận" ? r !== "366 ngày" : !eq(giay(r), giay(l))), "ô thừa bằng một ô trái")) },
  { has: "Điền số thập phân: 2 giờ 45 phút = ___ giờ", right: () => div(giay("2 giờ 45 phút"), giay("1 giờ")) },
  { has: "0,6 giờ bằng bao nhiêu phút?", right: () => tg(giay("0,6 giờ")) },
  { has: "Viết số đo 3 phút 18 giây dưới dạng số đo có đơn vị là phút.", right: () => ghi(div(giay("3 phút 18 giây"), giay("1 phút")), "phút") },
  { has: "Thời gian tự học ở nhà tối qua của bốn bạn:", right: (q) => {
    const ban = /bốn bạn: (.+)\. Sắp xếp/.exec(q.q)[1].split("; ").map((s) => { const m = /^(\S+) (.+)$/.exec(s); return [m[1], giay(m[2])]; });
    assert.deepEqual(ban.map((b) => b[0]).sort(), q.o.slice().sort(), "các ô là tên các bạn trong đề");
    return ban.sort((a, b) => cmp(a[1], b[1])).map((b) => b[0]); } },
  /* Cộng, trừ số đo thời gian (Bài 57) */
  { has: "3 giờ 45 phút + 2 giờ 30 phút = ?", right: () => tg(add(giay("3 giờ 45 phút"), giay("2 giờ 30 phút"))) },
  { has: "5 giờ 50 phút − 1 giờ 19 phút = 4 giờ ___ phút", right: () => { const d = sub(giay("5 giờ 50 phút"), giay("1 giờ 19 phút")); assert.ok(tg(d).startsWith("4 giờ "), "phần giờ ghi sẵn"); return div(sub(d, giay("4 giờ")), F(60)); } },
  { has: "3 phút 47 giây + 2 phút 38 giây = 6 phút 25 giây", right: () => eq(add(giay("3 phút 47 giây"), giay("2 phút 38 giây")), giay("6 phút 25 giây")) },
  { has: "10 giờ 6 phút − 7 giờ 49 phút = ?", right: () => tg(sub(giay("10 giờ 6 phút"), giay("7 giờ 49 phút"))) },
  { has: "Buổi tối, Thư bắt đầu học bài lúc đồng hồ chỉ như hình dưới đây. Thư học bài trong 1 giờ 25 phút.", right: (q) => {
    const d = docDongHo(doc(q)); assert.ok(d.gio >= 6 && d.gio < 12, "buổi tối: đồng hồ chỉ từ 6 giờ đến trước 12 giờ"); return luc(add(giay((d.gio + 12) + " giờ " + d.phut + " phút"), giay("1 giờ 25 phút"))); } },
  { has: "Buổi chiều, mẹ bắt đầu nấu cơm lúc đồng hồ chỉ như hình dưới đây. Mẹ nấu cơm hết 45 phút, sau đó cả nhà ăn cơm hết 35 phút.", right: (q) => {
    const d = docDongHo(doc(q)); assert.ok(d.gio >= 1 && d.gio < 7, "buổi chiều: đồng hồ chỉ từ 1 giờ đến trước 7 giờ"); return luc(add(add(giay((d.gio + 12) + " giờ " + d.phut + " phút"), giay("45 phút")), giay("35 phút"))); } },
  { has: "Một chuyến tàu khởi hành từ ga A lúc 21 giờ 40 phút và đến ga B lúc 5 giờ 15 phút sáng hôm sau.", right: () => ghi(div(sub(add(giay("5 giờ 15 phút"), giay("1 ngày")), giay("21 giờ 40 phút")), giay("1 phút")), "phút") },
  { has: "Một buổi hoà nhạc bắt đầu lúc 16 giờ 55 phút và kết thúc lúc 18 giờ 34 phút. Giữa buổi có 11 phút nghỉ giải lao.", right: () => ghi(div(sub(sub(giay("18 giờ 34 phút"), giay("16 giờ 55 phút")), giay("11 phút")), giay("1 phút")), "phút") },
  /* Nhân, chia số đo thời gian với một số (Bài 58) */
  { has: "2 phút 35 giây × 4 = ?", right: (q) => { q.o.forEach((o) => giay(o)); return tg(mul(giay("2 phút 35 giây"), F(4))); } },
  { has: "8 giờ 51 phút : 3 = 2 giờ ___ phút", right: () => { const d = div(giay("8 giờ 51 phút"), F(3)); assert.ok(tg(d).startsWith("2 giờ "), "phần giờ ghi sẵn"); return div(sub(d, giay("2 giờ")), F(60)); } },
  { has: "Mỗi ngày bạn Minh tập đàn 1 giờ 15 phút. Hỏi trong 6 ngày", right: () => ghi(div(mul(giay("1 giờ 15 phút"), F(6)), giay("1 giờ")), "giờ") },
  { has: "Một máy đóng gói được 6 thùng hàng trong 1 giờ 30 phút. Trung bình máy đóng gói một thùng hàng hết 25 phút.", right: () => eq(div(giay("1 giờ 30 phút"), F(6)), giay("25 phút")) },
  /* Vận tốc (Bài 59) */
  { has: "Một ô tô đi được 126 km trong 3 giờ. Vận tốc của ô tô đó là:", right: () => ghi(vanToc("126 km", "3 giờ", "km/giờ"), "km/giờ") },
  { has: "Một người đi xe đạp được 26 km trong 2 giờ. Vận tốc của người đó là ___ km/giờ.", right: () => vanToc("26 km", "2 giờ", "km/giờ") },
  { has: "Một chiếc ca nô đi được 72 km trong 3 giờ. Vận tốc của ca nô là 24 km/giờ.", right: () => eq(vanToc("72 km", "3 giờ", "km/giờ"), F(24)) },
  { has: "Một con báo chạy được 510 m trong 15 giây. Tính vận tốc của con báo theo đơn vị m/giây.", right: () => ghi(vanToc("510 m", "15 giây", "m/giây"), "m/giây") },
  { has: "Một người đi xe máy khởi hành từ A lúc 7 giờ 15 phút và đến B lúc 9 giờ 45 phút. Quãng đường AB dài 95 km.", right: () => ghi(doiVT(div(doi("95 km", "m"), sub(giay("9 giờ 45 phút"), giay("7 giờ 15 phút"))), "km/giờ"), "km/giờ") },
  { has: "Ba bạn cùng tập chạy. Tuấn chạy với vận tốc 4 m/giây, Hải chạy được 210 m trong 1 phút, Quân chạy được 15 km trong 1 giờ.", right: () => {
    const v = [["Tuấn", vt("4 m/giây")], ["Hải", div(doi("210 m", "m"), giay("1 phút"))], ["Quân", div(doi("15 km", "m"), giay("1 giờ"))]].sort((a, b) => cmp(b[1], a[1]));
    assert.ok(cmp(v[0][1], v[1][1]) > 0, "một bạn chạy nhanh nhất"); return v[0][0]; } },
  { has: "Quãng đường từ nhà Hoa đến trường dài 2,1 km. Hoa đi bộ từ nhà lúc 6 giờ 30 phút và đến trường lúc 7 giờ.", right: () => ghi(doiVT(div(doi("2,1 km", "m"), sub(giay("7 giờ"), giay("6 giờ 30 phút"))), "km/giờ"), "km/giờ") },
  { has: "Một vận động viên đạp xe được 4,8 km trong 9 phút.", right: () => ghi(vanToc("4,8 km", "9 phút", "km/giờ"), "km/giờ") },
  /* Quãng đường, thời gian của một chuyển động đều (Bài 60–62) */
  { has: "Một xe khách chạy đều với vận tốc 52 km/giờ. Sau 3 giờ, xe khách chạy được ___ km.", right: () => quangDuong("52 km/giờ", "3 giờ", "km") },
  { has: "Một con ong bay với vận tốc 8 m/giây. Trong 25 giây, con ong bay được", right: () => ghi(quangDuong("8 m/giây", "25 giây", "m"), "m") },
  { has: "Một người đi bộ với vận tốc 4,5 km/giờ. Trong 2 giờ, người đó đi được 9 km.", right: () => eq(quangDuong("4,5 km/giờ", "2 giờ", "km"), F(9)) },
  { has: "Một chiếc thuyền đi với vận tốc 12,5 km/giờ. Tính quãng đường thuyền đi được trong 5 giờ.", right: () => ghi(quangDuong("12,5 km/giờ", "5 giờ", "km"), "km") },
  { has: "Chú Hùng đạp xe với vận tốc 14 km/giờ trên quãng đường dài 21 km.", right: (q) => {
    const t = thoiGian("21 km", "14 km/giờ"); q.o.slice(1).forEach((o) => assert.ok(!eq(giay(o), t), "lựa chọn sai bằng thời gian đúng: " + o)); return ghi(div(t, giay("1 giờ")), "giờ"); } },
  { has: "Một xe máy đi với vận tốc 44 km/giờ. Hỏi trong 45 phút, xe máy đi được bao nhiêu ki-lô-mét?", right: () => ghi(quangDuong("44 km/giờ", "45 phút", "km"), "km") },
  { has: "Một vận động viên bơi với vận tốc 1,5 m/giây. Để bơi hết quãng đường 150 m", right: () => thoiGian("150 m", "1,5 m/giây") },
  { has: "Một tàu thuỷ đi với vận tốc 25 km/giờ. Tàu đi hết quãng đường 60 km trong bao lâu?", right: () => tg(thoiGian("60 km", "25 km/giờ")) },
  { has: "Hai ô tô khởi hành cùng một lúc: một xe đi từ A về phía B, một xe đi từ B về phía A. Sau 2 giờ, hai xe gặp nhau tại C (như sơ đồ). Xe đi từ A có vận tốc 46 km/giờ, xe đi từ B có vận tốc 39 km/giờ.", right: (q) => {
    const sd = docSoDo(doc(q)), AC = quangDuong("46 km/giờ", "2 giờ", "km"), CB = quangDuong("39 km/giờ", "2 giờ", "km");
    assert.deepEqual(Object.keys(sd.X).sort(), ["A", "B", "C"]); muiTenTu(sd, "A", 1, "46 km/giờ"); muiTenTu(sd, "B", -1, "39 km/giờ");
    tiLe(sd, [["A", "C", AC], ["C", "B", CB]]); assert.deepEqual(sd.so, [{ tu: "A", den: "B", chu: "? km" }]);
    return ghi(add(AC, CB), "km"); } },
  { has: "Lúc 8 giờ, Nam và Việt cùng đạp xe từ cổng trường, đi cùng chiều trên một con đường. Nam đi với vận tốc 16 km/giờ, Việt đi với vận tốc 12 km/giờ. Lúc 8 giờ 45 phút", right: () => {
    const t = sub(giay("8 giờ 45 phút"), giay("8 giờ")); return ghi(sub(qd("16 km/giờ", t, "km"), qd("12 km/giờ", t, "km")), "km"); } },
  { has: "Hưng và Thảo đứng ở hai đầu A và B của một con đường dài 1 800 m. Hai bạn cùng lúc đi bộ về phía nhau (như sơ đồ): Hưng đi với vận tốc 70 m/phút, Thảo đi với vận tốc 80 m/phút. Hỏi sau 6 phút", right: (q) => {
    const sd = docSoDo(doc(q)); assert.deepEqual(Object.keys(sd.X).sort(), ["A", "B"]); muiTenTu(sd, "A", 1, "70 m/phút"); muiTenTu(sd, "B", -1, "80 m/phút");
    assert.deepEqual(sd.so, [{ tu: "A", den: "B", chu: "1 800 m" }]); const t = giay("6 phút");
    return ghi(sub(sub(doi("1 800 m", "m"), qd("70 m/phút", t, "m")), qd("80 m/phút", t, "m")), "m"); } },
  { has: "Một ô tô khởi hành từ thành phố A lúc 6 giờ 50 phút với vận tốc 44 km/giờ để đi đến thành phố B. Quãng đường AB dài 110 km. Dọc đường, ô tô dừng nghỉ 15 phút.", right: () => luc(add(add(giay("6 giờ 50 phút"), thoiGian("110 km", "44 km/giờ")), giay("15 phút"))) },
  /* Thu thập, phân loại, sắp xếp các số liệu (Bài 63) */
  { has: "Số quyển sách mỗi bạn trong tổ Hai đọc được trong tháng Ba là:", right: (q) => ghi(F(dayCua(q).filter((x) => cmp(x, F(5)) >= 0).length), "bạn") },
  { has: "Chiều cao (đơn vị: cm) của 10 cây con trong vườn ươm là:", right: (q) => { const d = dayCua(q); assert.equal(d.length, 10); return d.filter((x) => cmp(x, F(30)) < 0).length + " cây"; } },
  { has: "Các bạn lớp 5A chọn món ăn yêu thích, kết quả ghi lại như sau:", right: (q) => F(/như sau: ([^.]+)\./.exec(q.q)[1].split(", ").filter((x) => x === "phở").length) },
  { has: "Số điểm của 8 bạn trong một trò chơi là:", right: (q) => {
    const d = dayCua(q).map(toNum), dem = {}; assert.equal(d.length, 8); d.forEach((x) => (dem[x] = (dem[x] || 0) + 1));
    const max = Math.max(...Object.values(dem)), moi = Object.keys(dem).filter((k) => dem[k] === max); return moi.length === 1 && moi[0] === "9"; } },
  /* Biểu đồ hình quạt tròn (Bài 64) */
  { has: "Số cây bàng bằng mấy phần trăm số cây trong vườn trường?", right: (q) => phan(docQuat(doc(q)), "Bàng") + "%" },
  { has: "Môn thể thao nào được ít học sinh chọn nhất?", right: (q) => { const qt = docQuat(doc(q)).slice().sort((a, b) => a.p - b.p); assert.ok(qt[0].p < qt[1].p, "một phần nhỏ nhất"); return qt[0].ten; } },
  { has: "Hoa cúc chiếm mấy phần trăm số bông hoa trong lẵng?", right: (q) => ghi(F(phan(docQuat(doc(q)), "Hoa cúc")), "%") },
  { has: "Số bạn chọn sữa bằng một nửa số bạn được hỏi.", right: (q) => eq(F(phan(docQuat(doc(q)), "Sữa"), 100), F(1, 2)) },
  { has: "Khối lớp 5 của một trường có 150 học sinh, mỗi bạn chọn một môn học yêu thích nhất.", right: (q) => ghi(giaTri(150, phan(docQuat(doc(q)), "Toán")), "bạn") },
  { has: "Trang trại nhà bác Thịnh nuôi 600 con gà, vịt và ngan.", right: (q) => ghi(giaTri(600, phan(docQuat(doc(q)), "Vịt")), "con") },
  { has: "Một cửa hàng nhập 2 400 kg trái cây.", right: (q) => giaTri("2 400", phan(docQuat(doc(q)), "Xoài")) },
  { has: "Một xưởng mộc làm được 800 sản phẩm gồm ghế, bàn và tủ.", right: (q) => {
    const qt = docQuat(doc(q)), so = (t) => giaTri(800, phan(qt, t));
    return [eq(so("Ghế"), soSau(q.o[0], "được")), cmp(so("Bàn"), so("Tủ")) < 0, eq(so("Ghế"), mul(so("Tủ"), F(2))), eq(add(so("Bàn"), so("Tủ")), so("Ghế"))]; } },
  { has: "Mảnh vườn nhà bác Khải có diện tích 1 200 m²", right: (q) => { const qt = docQuat(doc(q)); return ghi(sub(giaTri("1 200", phan(qt, "Rau")), giaTri("1 200", phan(qt, "Hoa"))), "m²"); } },
  { has: "Bốn lớp 5A, 5B, 5C, 5D trồng được tất cả 300 cây.", right: (q) => {
    const qt = docQuat(doc(q)), an = qt.filter((o) => o.p === null); assert.ok(an.length === 1 && an[0].ten === "Lớp 5C", "phần ghi “?” là của lớp 5C");
    return ghi(giaTri(300, qt.reduce((s, o) => (o.p === null ? s : sub(s, R(o.p))), F(100))), "cây"); } },
  { has: "Tuần trước, một cửa hàng bán được 480 kg gạo gồm gạo tẻ, gạo nếp và gạo lứt", right: (q) => ghi(mul(giaTri(480, phan(docQuat(doc(q)), "Gạo nếp")), fr("30 000")), "đồng") },
  { has: "Một trường tiểu học có 450 học sinh. Biểu đồ dưới đây cho biết tỉ số phần trăm số học sinh theo cách đến trường.", right: (q) => {
    const n = giaTri(450, phan(docQuat(doc(q)), "Xe buýt")); return Math.ceil(toNum(div(n, F(35)))) + " chuyến"; } },
  /* Tỉ số của số lần lặp lại một sự kiện (Bài 65) */
  { has: "Bạn Lan quay một vòng quay có ba phần màu đỏ, xanh, vàng 40 lần và thấy mũi tên chỉ vào phần màu đỏ 13 lần.", right: (q) => { assert.ok(q.o.includes(ti(40 - 13, 40)), "nhiễu: tỉ số của số lần không chỉ vào phần màu đỏ"); return ti(13, 40); } },
  { has: "Bạn Minh tung một đồng xu 50 lần, có 23 lần xuất hiện mặt sấp", right: () => ti(50 - 23, 50) },
  { has: "Bạn Tú tập bắn cung 25 lần, có 6 lần bắn trúng hồng tâm.", right: () => ti(6, 25) },
  { has: "Bạn Hà gieo một con xúc xắc nhiều lần, thấy mặt chẵn xuất hiện 14 lần, mặt lẻ xuất hiện 11 lần.", right: () => ti(11, 14 + 11) },
  { has: "Bạn Nam ném bóng vào rổ 20 lần, có 9 lần bóng vào rổ.", right: (q) => ti(9, 20) === /là (\d+\/\d+)\.$/.exec(q.q)[1] },
  { has: "Trong 15 ngày đầu của tháng Sáu, có 4 ngày trời mưa.", right: () => ti(4, 15) },
  { has: "Tháng Tư có 30 ngày. Ở một thành phố, tháng Tư năm nay có 18 ngày trời nắng", right: () => ti(SO_NGAY["Tư"] - 18, SO_NGAY["Tư"]) },
  { has: "Bạn Tâm gieo một con xúc xắc 20 lần và ghi lại:", right: (q) => {
    const dem = {}; [...q.q.matchAll(/mặt (\d) chấm (\d+) lần/g)].forEach((m) => (dem[m[1]] = +m[2]));
    assert.deepEqual(Object.keys(dem), ["1", "2", "3", "4", "5", "6"]); const n = Object.values(dem).reduce((a, b) => a + b, 0); assert.equal(n, 20);
    const max = Math.max(...Object.values(dem)), chan = dem[2] + dem[4] + dem[6];
    return [Object.keys(dem).filter((k) => dem[k] === max).join() === "4", soSau(q.o[1], "là") === ti(dem[2], n), dem[1] === dem[5] && dem[5] === dem[6], soSau(q.o[3], "là") === ti(chan, n)]; } },
];

/* ---------- chạy kiểm tra: mỗi câu khớp đúng một mục của CHECKS (mục có chữ has dài nhất nằm trong đề bài) ---------- */
let n = 0;
const dung = new Set();
const soCua = (q) => (typeof q.ans === "number" ? fmtDec(R(q.ans)) : String(q.ans)) + (q.unit ? " " + q.unit : "");
const run = (id, qs) => qs.forEach((q, i) => {
  const at = id + "#" + (i + 1), cs_ = CHECKS.filter((c) => q.q.includes(c.has)), dai = Math.max(...cs_.map((c) => c.has.length)), ch = cs_.filter((c) => c.has.length === dai);
  assert.equal(ch.length, 1, at + ": cần đúng một mục kiểm tra cho “" + q.q.slice(0, 60) + "…”, có " + ch.length);
  const c = ch[0]; assert.ok(!dung.has(c.has), at + ": hai câu cùng khớp “" + c.has + "”"); dung.add(c.has);
  try {
    const want = c.right(q);
    if (q.type === "num") {
      assert.ok(q.tol === undefined, "đáp án tính chính xác, không cần sai số");
      if (want && typeof want === "object") { assert.ok(typeof q.ans === "number" && !q.unit && Math.abs(q.ans - toNum(want)) < 1e-9, "đáp án " + soCua(q) + ", tính được " + fmtDec(want)); }
      else assert.strictEqual(soCua(q), want, "đáp án " + soCua(q) + ", tính được " + want);
      if (typeof q.ans === "string") assert.ok(/^\d+\/\d+$/.test(q.ans), "đáp án là số hoặc phân số a/b");
    } else if (q.type === "fill") {
      assert.equal(q.ans.length, 1, "câu điền một đáp án");
      if (want && typeof want === "object") assert.ok(/^\d[\d ]*(,\d+)?$/.test(q.ans[0]) && eq(fr(q.ans[0]), want) && q.ans[0] === fmtDec(want), "đáp án " + q.ans[0] + ", tính được " + fmtDec(want));
      else assert.strictEqual(q.ans[0], want, "đáp án " + q.ans[0] + ", tính được " + want);
    } else {
      const got = { tf: () => q.a, tf4: () => q.a, match: () => q.r.slice(0, q.l.length), order: () => q.o }[q.type] || (() => q.o[0]);
      assert.strictEqual(JSON.stringify(got()), JSON.stringify(want), "đáp án " + JSON.stringify(got()) + ", tính được " + JSON.stringify(want));
    }
    if (q.type === "mc") {
      assert.equal(new Set(q.o).size, q.o.length, "hai lựa chọn trùng nhau");
      const dai_ = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(!(q.o[0].length > 1.2 * dai_ && q.o[0].length - dai_ > 8), "đáp án đúng dài hơn hẳn lựa chọn sai");
      // lựa chọn là số đo thời gian thì viết gọn (phút, giây dưới 60) và khác giá trị đáp án đúng
      if (q.o.every((o) => /^\d+ (giờ|phút|giây)( \d+ (phút|giây))?$/.test(o))) q.o.forEach((o, k) => { assert.strictEqual(tg(giay(o)), o, "số đo thời gian chưa viết gọn: " + o); if (k) assert.ok(!eq(giay(o), giay(q.o[0])), "lựa chọn sai bằng đáp án: " + o); });
    }
    if (q.type === "match") { assert.equal(new Set(q.r).size, q.r.length, "ô nối trùng nhau"); assert.ok(q.r.length > q.l.length, "nối cột có ô thừa"); }
    if (q.type === "tf4") assert.ok(q.a.includes(true) && q.a.includes(false), "đúng/sai 4 ý nên có cả ý đúng và ý sai");
    if (c.more) c.more(q);
  } catch (e) { throw new Error(at + ": " + e.message + "\n" + String(e.stack || "").split("\n").slice(1, 3).join("\n")); }
  n++;
});
// số đề, số câu lấy từ danh mục: đề cố định là các đề trong from của đề ngẫu nhiên, mọi đề cố định cuối năm của file đều ở đó
const pool = bank(POOL), DE = pool.pool.from, mine = pool.questions.filter((q) => q.src === POOL);
assert.deepEqual(BANKS.filter((b) => b.file === "5-toan.js" && /^toan5-ck2-de\d+$/.test(b.id)).map((b) => b.id), DE, "đề cố định cuối năm nào cũng phải ở from của " + POOL);
for (const id of DE) { const b = bank(id); assert.ok(b, "thiếu " + id); assert.equal(b.questions.length, b.n); run(id, b.questions); }
run(POOL, mine);
assert.equal(dung.size, CHECKS.length, "có mục kiểm tra không khớp câu nào: " + CHECKS.filter((c) => !dung.has(c.has)).map((c) => c.has).join(" | "));
// hình nào cũng được đọc lại; chữ trong hình vừa khung, không đè nhau
const hinh = pool.questions.filter((q) => q.svg);
assert.equal(hinh.filter((q) => hinhDaDoc.has(q.svg)).length, hinh.length, "hình nào cũng được đọc lại");
hinh.forEach((q) => chuHinh(q.svg, q.q.slice(0, 40)));

/* ---------- chữ, số như sách (Toán 5 in năm 2026) ---------- */
const kho = pool.questions;
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null || typeof q.ans === "number" ? [] : [].concat(q.ans), q.l || [], q.r || []).map(String);
kho.forEach((q) => {
  const at = q.src + ": " + q.q.slice(0, 50), T = chu(q).concat(q.svg ? TEXTS(q.svg).map((t) => t.t) : []);
  T.forEach((s) => {
    assert.ok(!/\d\.\d/.test(s), at + ": số thập phân viết dấu phẩy, không dấu chấm: " + s);
    assert.ok(!/(^|[\s(])[−-]\d/.test(s), at + ": không có số âm (lớp 5 chưa học): " + s);
    assert.ok(!/\b\d{4,}\b/.test(s.replace(/\d+\/\d+/g, "").replace(/,\d+/g, "")), at + ": số từ bốn chữ số ngăn hàng nghìn bằng khoảng trắng: " + s);
    assert.ok(!/\d:\d|\d :\d|\d: \d/.test(s), at + ": tỉ số, phép chia viết “a : b” có khoảng trắng hai bên: " + s);
    assert.ok(!/\d %/.test(s), at + ": tỉ số phần trăm viết liền kí hiệu %: " + s);
    assert.ok(!/\b[cdkm]?m[23]\b/.test(s), at + ": đơn vị viết m³, m² như sách: " + s);
    assert.ok(!/km\/h(?!\p{L})|(?<!\p{L})m\/s(?!\p{L})|km\/g(?!iờ)|(?<!\p{L})giờ\/|\d ?h\d|\d ?[hp](?![\p{L}\d])/u.test(s), at + ": vận tốc viết km/giờ, m/phút, m/giây; số đo thời gian viết “giờ”, “phút”: " + s);
    assert.ok(!/÷/.test(s), at + ": phép chia viết dấu “:”: " + s);
  });
  // số đo thời gian trong đề bài, lựa chọn, đáp án viết gọn như sách: “x giờ y phút”, “x phút y giây” với y dưới 60 (lời giải được ghi bước trung gian)
  [q.q].concat(q.o || [], q.l || [], q.r || []).forEach((s) => [...String(s).matchAll(/\d+ (?:giờ|phút) (\d+) (phút|giây)/g)].forEach((m) => assert.ok(+m[1] < 60, at + ": số đo thời gian chưa viết gọn: " + m[0])));
  // đề không ghi sẵn công thức (câu hỏi chính là công thức đó)
  assert.ok(!/(?<!\p{L})[vst] = |chia cho thời gian|nhân với thời gian|chia cho vận tốc|3,14|nhân với chiều cao|chia cho 2(?!\d)|× 2(?![\d,])/u.test(q.q), at + ": đề ghi sẵn công thức");
  // tỉ số của số lần lặp lại viết a/b như sách (không “a : b”)
  if (q.topic === "Tỉ số của số lần lặp lại một sự kiện") chu(q).forEach((s) => assert.ok(!/\d : \d/.test(s), at + ": tỉ số của số lần lặp lại viết a/b như sách: " + s));
});

/* ---------- mức độ và ma trận ---------- */
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M);
assert.deepEqual(Object.keys(M), CHU_DE, "ma trận đúng 17 chủ đề của PHAN, đúng thứ tự");
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => cells.reduce((s, v) => s + v[k], 0)), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
const nhomCD = (p) => CHU_DE.filter((t) => phanCua(t) === p).reduce((s, t) => s + M[t].reduce((a, b) => a + b, 0), 0);
assert.deepEqual(["cd10", "cd11", "gk2", "ck1"].map(nhomCD), [10, 6, 6, 3],
  "Chủ đề 10 (số đo thời gian, vận tốc, chuyển động đều) 10 câu, Chủ đề 11 (thống kê và xác suất) 6, ôn giữa kì II 6, ôn học kì I 3");
assert.ok(nhomCD("cd10") + nhomCD("cd11") > nhomCD("gk2") + nhomCD("ck1"), "phần trọng tâm nhiều câu hơn phần ôn");
CHU_DE.forEach((t) => assert.ok(("chu-de:5:toan:" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
assert.deepEqual([...new Set(kho.map((q) => q.topic))].sort(), CHU_DE.slice().sort(), "chủ đề của kho đúng chữ của ma trận");
// chủ đề ôn mang đúng chữ chủ đề của kho cuối kì I, giữa kì II; chủ đề mới không trùng chữ chủ đề của đề Toán 5 khác (đề “Ôn chủ đề” gộp
// câu cùng chữ chủ đề của mọi đề lớp 5)
const khoCu = { ck1: bank("toan5-ck1-ngau-nhien"), gk2: bank("toan5-gk2-ngau-nhien") };
Object.entries(khoCu).forEach(([k, b]) => assert.ok(b && b.pool, "thiếu kho " + k));
{ const khac = new Set(BANKS.filter((b) => b.file === "5-toan.js" && !DE.concat(POOL).includes(b.id)).flatMap((b) => b.questions.map((q) => q.topic)));
  CHU_DE.forEach((t) => { const p = phanCua(t);
    if (khoCu[p]) assert.ok(t in khoCu[p].pool.matrix, "chủ đề ôn phải đúng chữ chủ đề của kho " + p + ": " + t);
    else assert.ok(!khac.has(t), "chủ đề mới trùng chữ với đề Toán 5 khác: " + t); }); }
// mỗi ô rút 1 câu và có đúng 4 câu: một câu ở mỗi đề cố định, hai câu riêng; ô không rút thì không có câu
Object.entries(M).forEach(([t, v]) => v.forEach((k, i) => {
  const have = kho.filter((q) => q.topic === t && q.lv === i + 1);
  assert.ok(k <= 1, `ô (${t}, mức ${i + 1}) rút ${k} câu: mỗi ô rút nhiều nhất 1 câu`);
  if (!k) { assert.equal(have.length, 0, `ô (${t}, mức ${i + 1}) không rút mà kho có ${have.length} câu`); return; }
  assert.deepEqual(DE.concat(POOL).map((s) => have.filter((q) => q.src === s).length), [1, 1, 2], `ô (${t}, mức ${i + 1})`);
}));
const dem = (f) => kho.filter(f).length;
assert.equal(dem((q) => q.type === "essay"), 0, "không có câu tự luận");
assert.ok(dem((q) => q.type === "tf4") >= 2 && dem((q) => q.type === "num") >= 10 && dem((q) => q.type === "fill") >= 8 && dem((q) => q.type === "match") >= 2 && dem((q) => q.type === "order") >= 1 && dem((q) => q.type === "tf") >= 3, "kho đủ dạng câu của tiểu học");
const loaiHinh = (s) => (/<path d="M/.test(s) ? "quạt" : /<circle [^>]*r="64"/.test(s) ? "đồng hồ" : "sơ đồ");
{ const c = {}; hinh.forEach((q) => { const l = loaiHinh(q.svg); c[l] = (c[l] || 0) + 1; });
  assert.ok(c["quạt"] >= 10 && c["đồng hồ"] >= 2 && c["sơ đồ"] >= 2, "kho có biểu đồ hình quạt tròn, mặt đồng hồ, sơ đồ quãng đường hai xe: " + JSON.stringify(c));
  hinh.forEach((q) => assert.ok(loaiHinh(q.svg) !== "quạt" || q.topic === "Biểu đồ hình quạt tròn", "biểu đồ hình quạt tròn chỉ ở chủ đề của nó")); }
// đúng/sai 4 ý: kiểu Đ/S không lặp (Rút ra N9-ck1-khtn)
{ const kieu = {}; kho.filter((q) => q.type === "tf4").forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; });
  assert.equal(Math.max(...Object.values(kieu)), 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu)); }
// đáp án đúng không hay là lựa chọn dài nhất hay ngắn nhất (Rút ra N9-ck1-tin-congnghe): mỗi kiểu không quá một phần ba số câu nhiều lựa chọn
const mcs = kho.filter((q) => q.type === "mc"), hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
const daiNhat = mcs.filter((q) => hon(q, (a, b) => a > b)).length, nganNhat = mcs.filter((q) => hon(q, (a, b) => a < b)).length;
assert.ok(daiNhat <= mcs.length / 3, `đáp án đúng là lựa chọn dài nhất ở ${daiNhat}/${mcs.length} câu nhiều lựa chọn`);
assert.ok(nganNhat <= mcs.length / 3, `đáp án đúng là lựa chọn ngắn nhất ở ${nganNhat}/${mcs.length} câu nhiều lựa chọn`);
// đáp án không lặp chữ của nhãn chủ đề trên câu (Rút ra N6, N16b), trừ khi mọi lựa chọn cùng có chữ đó
{ const phanNhan = (t) => t.replace(/\s*\([^)]*\)$/, "").split(/ và |, /).map((s) => s.trim().toLowerCase()).filter((s) => s.includes(" ") || s.length >= 6);
  kho.forEach((q) => { const da = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : []; phanNhan(q.topic).forEach((c) => da.forEach((d) => {
    if (d.toLowerCase().includes(c)) assert.ok(q.type === "mc" && q.o.every((o) => o.toLowerCase().includes(c)), `đáp án “${d}” lặp chữ “${c}” của nhãn chủ đề`); })); }); }
// lời giải không nói “ý thứ hai”, “phương án A”: app xáo phương án
kho.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của phương án: " + q.q.slice(0, 50)));
const thu = (hist) => {
  const d = Quiz.draw(pool, hist);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, pool.n);
  assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.lv === l).length), [10, 8, 7]);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.topic === t && q.lv === l).length), v, "rút đúng ma trận ở chủ đề " + t));
  return d;
};
const seen = new Set();
for (let k = 0; k < 400; k++) thu().questions.forEach((q) => seen.add(Quiz.key(q)));
assert.ok(mine.every((q) => seen.has(Quiz.key(q))), "400 lần rút thử phải gặp đủ các câu riêng");
// học sinh đã làm hết một đề cố định: lần rút sau không lấy lại câu của đề đó
DE.forEach((id) => { const done = new Set(bank(id).questions.map(Quiz.key)); for (let k = 0; k < 20; k++) thu((q) => ({ done: done.has(Quiz.key(q)) ? 1 : 0, wrong: 0 })).questions.forEach((q) => assert.ok(!done.has(Quiz.key(q)), "đã làm hết " + id + " mà vẫn gặp lại câu của đề đó")); });

/* ---------- đề bài không trùng câu nào khác trong data/banks/5-toan.js (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const deBai = BANKS.filter((b) => b.file === "5-toan.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: gocChu(q.q) })));
deBai.forEach((d) => { const cungDe = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cungDe, [d.at], "đề bài trùng: " + cungDe.join(", ")); });

/* ---------- câu ôn không trùng câu cùng chủ đề của kho giữa kì II, cuối kì I (lời giao việc; như tests/khtn9-ck2.js): đề bài khác nhau,
   không chung chuỗi 6 từ liền nhau (tính cả số; tên hình, tên đại lượng nhiều chữ như “hình hộp chữ nhật” tính là một từ), đáp án khác
   nhau (lựa chọn đúng, đáp án điền, đáp án số kèm đơn vị) ---------- */
const ten = new Map();
DE.forEach((id) => bank(id).questions.forEach((q, i) => ten.set(q.q, id.replace("toan5-ck2-", "") + "#" + (i + 1))));
mine.forEach((q, i) => ten.set(q.q, "own#" + (i + 1)));
const onCung = (q) => { const b = khoCu[phanCua(q.topic)]; return b ? b.questions.filter((p) => p.topic === q.topic) : []; };
Object.values(khoCu).forEach((b) => { b.pool.from.forEach((id) => bank(id).questions.forEach((q, i) => ten.set(q.q, id.replace("toan5-", "") + "#" + (i + 1))));
  b.questions.filter((q) => q.src === b.id).forEach((q, i) => ten.set(q.q, b.id.replace("toan5-", "") + "#" + (i + 1))); });
{
  // tên hình, tên đại lượng nhiều chữ tính là một từ (như tên riêng của các script Lịch sử và Địa lí)
  const GOP = ["hình hộp chữ nhật", "hình lập phương", "diện tích xung quanh", "diện tích toàn phần", "hình tròn", "hình thang", "tỉ số phần trăm", "số thập phân"];
  const tuThuong = (s) => { let t = " " + String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").replace(/\s+/g, " ") + " ";
    GOP.forEach((g) => { t = t.split(" " + g + " ").join(" " + g.replace(/ /g, "_") + " "); }); return t.split(" ").filter(Boolean); };
  const chuoiTu = (s, k) => { const w = tuThuong(s), r = []; for (let i = 0; i + k <= w.length; i++) r.push(w.slice(i, i + k).join(" ")); return r; };
  const daAn = (q) => (q.type === "mc" ? gocChu(q.o[0]) : q.type === "fill" ? gocChu(q.ans[0]) : q.type === "num" ? gocChu(soCua(q)) : null);
  const bao5 = [];
  kho.filter((q) => onCung(q).length).forEach((q) => onCung(q).forEach((p) => {
    const at = ten.get(q.q) + " ~ " + ten.get(p.q) + ": ";
    assert.notEqual(gocChu(q.q), gocChu(p.q), at + "đề bài trùng câu ôn");
    const c6 = chuoiTu(q.q, 6).filter((c) => (" " + tuThuong(p.q).join(" ") + " ").includes(" " + c + " "));
    assert.deepEqual(c6, [], at + "đề bài có chuỗi 6 từ trùng câu cùng chủ đề của kho cũ: " + c6.join(" | "));
    if (daAn(q) && daAn(p)) assert.notEqual(daAn(q), daAn(p), at + "đáp án trùng câu cùng chủ đề của kho cũ");
    chuoiTu(q.q, 5).filter((c) => (" " + tuThuong(p.q).join(" ") + " ").includes(" " + c + " ")).forEach((c) => bao5.push(at + c));
  }));
  if (process.env.DO_ON) console.log("Chuỗi 5 từ của đề bài câu ôn có ở câu cùng chủ đề của kho cũ (xem tay):\n" + [...new Set(bao5)].join("\n"));
}

/* ---------- dò lộ đáp án (Rút ra N5, N24, N8, RS9; như tests/toan5-gk2.js) giữa mọi cặp câu của kho: đề “Ôn chủ đề” rút chung mọi câu của
   một chủ đề (cả câu cùng chủ đề của kho giữa kì II, cuối kì I), đề ngẫu nhiên rút chung câu của các chủ đề khác; lời dặn (note) hiện ở màn
   mở đề nên cũng là “câu kia”. Đáp án là số (từ 10; cả tỉ số phần trăm “65%”), số thập phân, phân số chỉ tìm ở vị trí kết quả của câu kia
   (ngay sau “=”, “là”, “bằng”, “được”; số đứng ngay trước một phép tính là thừa số, số hạng); số đo thời gian, vận tốc “x giờ y phút”,
   “38 km/giờ” và tỉ số “7/20” tìm như cụm chữ đứng riêng; cặp nối: câu kia có cả hai vế; đáp án bằng chữ có ở câu kia thì chỉ in ra khi
   chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM. Chỉ báo cặp có câu của kho này. ---------- */
const val = (s) => +String(s).replace(/\s/g, "");
const KQ = "(?:=|(?:^|[\\s(])(?:là|bằng|được))\\s+";
const SAU = "(?!\\d|,\\d|\\/|°|\\s*[·+−×:÷](?:\\s|\\d|\\())"; // số đứng ngay trước một phép tính là thừa số, số hạng
const soKQ = (s) => [...String(s).matchAll(new RegExp(KQ + "(\\d{1,3}(?: \\d{3})*)" + SAU, "gu"))].map((m) => val(m[1]));
const kqLa = (s, a) => new RegExp(KQ + a.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + SAU, "u").test(s);
const LOI_DAN = [...new Set(DE.concat(POOL).map((id) => bank(id).note))].map((note, i) => ({ q: note, x: "", note: true, ten: "note" + (i + 1) }));
// cụm có trong chữ, đứng riêng (không là phần cuối của số khác: “5 000 cm³” không có trong “925 000 cm³”)
const coCum = (t, s) => new RegExp("(?<![\\p{L}\\p{N},])" + s.toLowerCase().replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + "(?![\\p{L}\\p{N}])", "u").test(t);
const laKho = new Set(kho);
const doLo = (qs, name, notes, moi = laKho) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    const so = [], kq = [], cum = [], cumSo = [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const them = (a) => { a = String(a).replace(/%$/, "");
      if (/^\d+ (giờ|phút|giây)( \d+ (phút|giây))?$|^\d[\d ]*(,\d+)? (km|m)\/(giờ|phút|giây)$|^\d+\/\d+$/.test(a)) { cumSo.push(a); return; }
      const m = /^(\d{1,3}(?: \d{3})*)(?: (\S+))?$/.exec(a);
      if (m && !/^\d\/\d/.test(m[2] || "")) so.push(val(m[1]));
      else if (/^\d[\d ,/]*(?: [^\d\s]+)?$/.test(a)) kq.push(a.replace(/ [^\d\s]+$/, ""));
      else if (a.length >= 2) cum.push(a); };
    if (q.type === "num") them(typeof q.ans === "number" ? fmtDec(F(Math.round(q.ans * 1000), 1000)) : q.ans);
    else if (q.type === "fill") them(q.ans[0]); else if (q.type === "mc") them(q.o[0]);
    qs.concat(notes || []).forEach((p) => {
      if (p === q) return;
      if (p.note ? !moi.has(q) : !(moi.has(p) && moi.has(q)) && !((moi.has(p) || moi.has(q)) && p.topic === q.topic)) return; // câu của kho cũ chỉ đi cùng câu cùng chủ đề của kho này (đề “Ôn chủ đề”)
      const C = p.note ? [p.q] : chu(p).concat(p.svg ? TEXTS(p.svg).map((t) => t.t) : []), T = C.map((s) => s.toLowerCase()), at = `${name(p)} lộ đáp án ${name(q)}: `;
      so.filter((x) => x >= 10 && C.flatMap(soKQ).includes(x)).forEach((x) => lo.push(at + x));
      kq.filter((a) => C.some((s) => kqLa(s, a))).forEach((a) => lo.push(at + a));
      cumSo.filter((a) => T.some((t) => coCum(t, a))).forEach((a) => lo.push(at + a));
      cap.filter(([l, r]) => T.some((t) => coCum(t, l) && coCum(t, r))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      cum.filter((s) => T.some((t) => coCum(t, s))).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const tenCau = (q) => (q.note ? q.ten : ten.get(q.q));
const cuCung = [...new Set(kho.flatMap(onCung))];
const { lo: loDA, chuLo } = doLo(kho.concat(cuCung), tenCau, LOI_DAN);
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu khác của kho (xem tay):\n" + chuLo.join("\n"));
// đã xem: (chưa có dòng nào)
const DA_XEM = [];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu khác của kho đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loDA, [], "lộ đáp án:\n" + loDA.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 4 025”, “là 2,75”, “21 giờ 5 phút”, “27/50”, cả hai vế một cặp nối
{ const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const khac = tim("Tháng Hai của năm nhuận"), thuLo = (qs) => doLo(qs, (q) => q.q.slice(0, 10).replace(/:/g, ""), [], new Set(qs)).lo.map((s) => s.replace(/^.*? lộ đáp án [^:]*: /, ""));
  assert.deepEqual(thuLo([tim("4 m³ 25 dm³ = ___ dm³"), gia(khac, "Ví dụ: số đo đó = 4 025 dm³.")]), [4025]);
  assert.deepEqual(thuLo([tim("Điền số thập phân: 2 giờ 45 phút"), gia(khac, "Thời gian đó là 2,75 giờ.")]), ["2,75"]);
  assert.deepEqual(thuLo([tim("Buổi tối, Thư bắt đầu học bài"), gia(khac, "Lúc đó là 21 giờ 5 phút.")]), ["21 giờ 5 phút"]);
  assert.deepEqual(thuLo([tim("Bạn Minh tung một đồng xu 50 lần"), gia(khac, "Ví dụ tỉ số 27/50.")]), ["27/50"]);
  assert.deepEqual(thuLo([tim("Nối số đo ở cột trái"), gia(khac, "Ví dụ 1,5 m³ bằng 1 500 dm³.")]), ["1,5 m³ → 1 500 dm³"]);
  assert.deepEqual(thuLo([tim("Điền số thập phân: 2 giờ 45 phút"), gia(khac, "Ví dụ 2,75 × 2 = 5,5.")]), []); }
// bộ đọc hình bắt được hình vẽ sai: góc hình quạt không khớp số phần trăm, kim giờ lệch, điểm trên sơ đồ không đúng tỉ lệ, chữ nhỏ
{ const cau = (has) => kho.find((q) => q.q.includes(has)), sua = (svg, a, b) => { assert.ok(svg.includes(a), "thử: không thấy “" + a + "”"); return svg.replace(a, b); };
  const qt = cau("Số cây bàng bằng mấy phần trăm"), dh = cau("Buổi tối, Thư bắt đầu học bài"), sd = cau("Hai ô tô khởi hành cùng một lúc");
  assert.throws(() => docQuat(sua(qt.svg, ">17%<", ">19%<")), /không khớp|100%/);
  assert.throws(() => docQuat(sua(qt.svg, ">Sấu<", ">Phượng<")), /chú giải/);
  const kg = [...dh.svg.matchAll(/<line x1="160" y1="74" x2="([\d.]+)" y2="([\d.]+)" stroke="ink" stroke-width="4"\/>/g)][0];
  assert.throws(() => docDongHo(sua(dh.svg, kg[0], kg[0].replace(`x2="${kg[1]}"`, `x2="${+kg[1] - 3}"`))), /kim giờ/);
  const vc = /<line x1="([\d.]+)" y1="54" x2="\1" y2="66" stroke="ink" stroke-width="2"\/><text x="\1" y="84" text-anchor="middle" font-weight="700">C</.exec(sd.svg);
  assert.throws(() => CHECKS.find((c) => sd.q.includes(c.has) && c.has.startsWith("Hai ô tô")).right(Object.assign({}, sd, { svg: sd.svg.split(`"${vc[1]}"`).join(`"${+vc[1] + 8}"`) })), /tỉ lệ/);
  assert.throws(() => chuHinh(qt.svg.replace('font-size="15"', 'font-size="12"'), "thử"), /cỡ 13/);
  assert.equal(tg(giay("5 giờ 75 phút")), "6 giờ 15 phút"); assert.equal(luc(add(giay("21 giờ 35 phút"), giay("7 giờ 45 phút"))), "5 giờ 20 phút");
  assert.ok(eq(vanToc("15 km", "1 giờ", "m/phút"), F(250)) && eq(doiVT(vt("36 km/giờ"), "m/giây"), F(10))); }

/* ---------- không gần trùng câu của kho Toán lớp 4 và các kho Toán 5 khác (lời giao việc; Rút ra N25, như tests/toan5-gk2.js): đề bài
   cùng lựa chọn, ô nối, ô sắp xếp có từ 4 cặp từ liền nhau chung với một câu của data/banks/4-toan.js hay của đề Toán 5 khác và số cặp
   chung từ một nửa số cặp của câu ít cặp hơn thì báo. Cặp từ tính cả số; bỏ cách hỏi chung của đề Toán (CUM), cặp của nhãn chủ đề và cặp
   có ở từ 3% số câu đem so. ---------- */
const CUM = ["tính bằng cách thuận tiện", "theo thứ tự từ bé đến lớn", "theo thứ tự từ lớn đến bé", "số thích hợp điền vào chỗ chấm", "viết số thích hợp vào chỗ trống",
  "có bao nhiêu", "hết bao nhiêu tiền", "mỗi ý sau đúng hay sai", "như hình dưới đây", "như hình vẽ", "như sơ đồ", "như thế", "lớn hơn", "bé hơn", "dưới đây", "ở cột trái",
  "ở cột phải", "hãy nối cho đúng", "biểu đồ dưới đây cho biết tỉ số phần trăm", "biểu đồ hình quạt tròn", "tỉ số phần trăm", "tỉ số của số lần", "so với tổng số lần",
  "hình hộp chữ nhật", "hình lập phương", "diện tích xung quanh", "diện tích toàn phần", "thể tích", "chiều dài", "chiều rộng", "chiều cao", "đáy lớn", "đáy bé",
  "đường kính", "bán kính", "hình thang", "hình tròn", "vận tốc", "quãng đường", "lúc mấy giờ", "bao nhiêu phút", "bao nhiêu ki-lô-mét", "dãy số liệu"];
{
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/(\d),(?=\d)/g, "$1_").replace(/[^\p{L}\p{N}\s|_]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|") && c.split(" ").some((x) => x.length >= 2)); };
  const cauCua = (f) => BANKS.filter(f).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id));
  const so = cauCua((b) => b.file === "4-toan.js").concat(cauCua((b) => b.file === "5-toan.js" && !DE.concat(POOL).includes(b.id))), ca = so.concat(kho), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !nhan.has(c) && (df[c] || 0) < 0.03 * ca.length)); };
  const PS = so.map((p) => [p, capAm(p)]);
  const ganTrung = kho.flatMap((q) => { const c = capAm(q); return PS.map(([p, d]) => { const chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q.q)} ~ ${p.q.slice(0, 50)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho Toán 4, Toán 5 khác:\n" + ganTrung.join("\n"));
  assert.deepEqual(ganTrung, [], "đề bài gần trùng câu của kho Toán 4 hay Toán 5 khác");
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (bỏ dấu, gộp nguyên âm), nếu có ----------
   Chuỗi 8 từ liền nhau của mọi trường chữ (đề bài, lựa chọn, lời giải, chữ trong hình, lời dặn) không có trong sách; cụm từ chung của môn
   (tên bài, tên chủ đề, cách hỏi chuẩn) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ. Số liệu: số riêng của một câu
   (số thập phân, số từ 11 trở lên, trừ 100, 1 000, 10 000; không tính số trong phân số) không có từ ba số cùng ở một trang của Toán 5 tập
   một, tập hai (dò bối cảnh, số liệu của bài tập, ví dụ trong sách; DO_SACH=1 in các trang có từ hai số chung để xem). */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
// tra nhanh chuỗi k từ (như tests/toan5-gk2.js): băm mọi chuỗi k từ của chữ đã chuẩn hoá, chỉ so thật (includes) khi băm có
const traChu = (() => {
  const bam = (w, k) => {
    const A = new Uint32Array(w.length), B = new Uint32Array(w.length), n_ = Math.max(0, w.length - k + 1), H = new Float64Array(n_);
    for (let i = 0; i < w.length; i++) { let a = 0x811c9dc5, b = 0x1b873593; const t = w[i]; for (let j = 0; j < t.length; j++) { const x = t.charCodeAt(j); a = Math.imul(a ^ x, 0x01000193); b = Math.imul(b ^ x, 0x5bd1e995); } A[i] = a; B[i] = b; }
    for (let i = 0; i < n_; i++) { let a = 0x9e3779b9, b = 0x85ebca6b; for (let j = i; j < i + k; j++) { a = Math.imul(a ^ A[j], 0x01000193); b = Math.imul(b ^ B[j], 0x5bd1e995); } H[i] = (a >>> 0) * 2097152 + (b >>> 11); }
    return H;
  };
  const co = (H, h) => { let l = 0, r = H.length - 1; while (l <= r) { const m = (l + r) >> 1; if (H[m] === h) return true; if (H[m] < h) l = m + 1; else r = m - 1; } return false; };
  const chuMot = new Map(), chuDs = new WeakMap();
  const bang = (m, k, tao) => { if (!m.has(k)) m.set(k, tao().sort()); return m.get(k); };
  return {
    co: (s, c) => { const w = c.split(" "); if (!chuMot.has(s)) chuMot.set(s, new Map()); return co(bang(chuMot.get(s), w.length, () => bam(s.split(" "), w.length)), bam(w, w.length)[0]) && s.includes(" " + c + " "); },
    loc: (ds, c) => {
      const w = c.split(" "), k = w.length;
      if (!chuDs.has(ds)) chuDs.set(ds, new Map());
      const H = bang(chuDs.get(ds), k, () => { const hs = ds.map((o) => bam(o.s.split(" "), k)), ra = new Float64Array(hs.reduce((a, h) => a + h.length, 0)); let i = 0; hs.forEach((h) => { ra.set(h, i); i += h.length; }); return ra; });
      return co(H, bam(w, k)[0]) ? ds.filter((o) => o.s.includes(" " + c + " ")) : [];
    },
  };
})();
const khongDau = nhoChuoi((s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim());
const TU_CHUNG = [...CHU_DE, "mỗi ý sau đúng hay sai", "số thích hợp điền vào chỗ chấm", "viết số thích hợp vào chỗ trống", "điền số thập phân",
  "biểu đồ dưới đây cho biết tỉ số phần trăm", "biểu đồ hình quạt tròn", "tỉ số phần trăm", "chiếm bao nhiêu phần trăm", "bằng mấy phần trăm",
  "tỉ số của số lần", "so với tổng số lần", "số lần xuất hiện mặt", "xuất hiện mặt", "gieo một con xúc xắc", "tung một đồng xu", "mũi tên chỉ vào",
  "số đo thời gian", "giờ trong ngày", "lúc mấy giờ", "vận tốc", "quãng đường", "thời gian", "km/giờ", "m/phút", "m/giây", "khởi hành", "đi ngược chiều",
  "đi cùng chiều", "gặp nhau", "về phía nhau", "như sơ đồ", "dãy số liệu", "hình hộp chữ nhật", "hình lập phương", "diện tích xung quanh", "diện tích toàn phần",
  "diện tích một mặt đáy", "chu vi mặt đáy", "chiều dài", "chiều rộng", "chiều cao", "thể tích", "mét khối", "đề-xi-mét khối", "xăng-ti-mét khối",
  "tổng số phần bằng nhau", "đáy lớn", "đáy bé", "diện tích hình thang", "bán kính", "đường kính", "chu vi", "ở cột trái", "ở cột phải", "hãy nối cho đúng",
  "theo thứ tự từ bé đến lớn", "từ ít đến nhiều", "ý đã cho đúng", "ý đã cho sai", "như hình dưới đây", "đồng hồ chỉ như hình dưới đây"]
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const chuCau = (q) => chu(q).concat(q.svg ? [TEXTS(q.svg).map((t) => t.t).join(" ")] : []);
// số liệu của đề: đề bài, chữ trong hình, ô nối, ô sắp xếp (không tính lựa chọn của câu nhiều lựa chọn, đúng/sai 4 ý và lời giải)
const deCau = (q) => [q.q].concat(q.type === "order" ? q.o : [], q.l || [], q.r || [], q.svg ? TEXTS(q.svg).map((t) => t.t) : []).map(String);
if (SACH.length) {
  assert.ok(SACH.some((f) => /toan-5-tap-2/.test(f)) && SACH.some((f) => /toan-5-tap-1/.test(f)), "OnUp-Book có Toán 5 hai tập");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => chuCau(q).flatMap((s) => chuoi(s, k).filter((c) => traChu.co(sach, c)).map((c) => `${ten.get(q.q)}: ${c}`)))
    .concat(LOI_DAN.flatMap((l) => chuoi(l.q, k).filter((c) => traChu.co(sach, c)).map((c) => `${l.ten}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  // số liệu riêng của từng câu so với từng trang của Toán 5 hai tập
  const trang = SACH.filter((f) => /toan-5-tap-[12]/.test(f)).flatMap((f) => fs.readFileSync(f, "utf8").split(/(?==== page-\d+ · )/).filter((p) => !/MỤC LỤC/.test(p) && (p.match(/\bB\S{0,2}i \d+\./gu) || []).length < 3).map((p) => ({ ten: (/tap-(\d)/.exec(f)[1]) + "/" + (/trang in (\d+)/.exec(p) || [])[1], so: new Set((p.match(/\d+(?:[ .]\d{3})*(?:,\d+)?/g) || []).map((x) => x.replace(/[ .](?=\d{3})/g, ""))) })));
  const soRieng = (q) => [...new Set((deCau(q).join(" ").replace(/\d+\/\d+/g, " ").match(/\d{1,3}(?: \d{3})+(?:,\d+)?|\d+(?:,\d+)?/g) || []).map((x) => x.replace(/ /g, "")).filter((x) => /,/.test(x) || (+x > 10 && ![100, 1000, 10000].includes(+x))))];
  const soChung = kho.flatMap((q) => { const s = soRieng(q); return trang.map((p) => [p.ten, s.filter((x) => p.so.has(x))]).filter(([, c]) => c.length >= 2).map(([t, c]) => `${ten.get(q.q)} ~ trang ${t}: ${c.join("; ")} (câu có ${s.length} số)`); });
  if (process.env.DO_SACH) console.log("Trang sách có từ hai số liệu chung với một câu (xem tay):\n" + soChung.join("\n"));
  const SO_XEM = [];
  // báo khi trang có từ ba số liệu của câu và quá nửa số liệu của câu (câu dãy số liệu có nhiều số hai chữ số trùng ngẫu nhiên với trang bài tập)
  const nhieu = (s) => { const m = /: (.+) \(câu có (\d+) số\)$/.exec(s), k = m[1].split("; ").length; return k >= 3 && k * 2 > +m[2]; };
  assert.deepEqual(soChung.filter((s) => nhieu(s) && !SO_XEM.includes(s)), [], "trang sách có từ ba số liệu chung với một câu, quá nửa số liệu của câu");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");

/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả các đề Toán 5 khác cùng file ---------- */
{
  const cuaMinh = new Set(DE.concat(POOL));
  const khac = BANKS.filter((b) => !b.pool && !cuaMinh.has(b.id)).flatMap((b) => b.questions.map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " })))
    .concat(BANKS.filter((b) => b.pool && !cuaMinh.has(b.id)).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " }))));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q.q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại hoặc đọc lại hình (" + DE.map((id) => bank(id).questions.length).join(" + ") + " câu của " + DE.length + " đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + kho.length + " câu, " + hinh.length + " hình, ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề; đáp án đúng dài nhất ở " + daiNhat + ", ngắn nhất ở " + nganNhat + " trên " + mcs.length + " câu nhiều lựa chọn.");
console.log("MATH OK");
