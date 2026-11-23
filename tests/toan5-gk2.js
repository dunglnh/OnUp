// Tính lại đáp án ngân hàng Toán 5 giữa kì II (data/banks/5-toan.js): hai đề cố định toan5-gk2-de1, toan5-gk2-de2 và các câu riêng
// của đề ngẫu nhiên toan5-gk2-ngau-nhien (Phiên N5-gk2-toan; Toán 5 tập hai, Bài 36–55). Mỗi câu khớp đúng một mục của CHECKS (chữ has
// nằm trong đề bài) rồi so đáp án với kết quả tính bằng code: trắc nghiệm o[0], điền khuyết ans[0] (số so theo giá trị, chữ so chữ),
// đúng/sai a, đúng/sai 4 ý a (từng ý tính lại), trả lời bằng số ans, nối cột r của từng ô l, sắp xếp o. Số tính bằng số hữu tỉ chính
// xác: tỉ số, tỉ số phần trăm (thương nhân 100), giá trị phần trăm (số nhân tỉ số rồi chia 100), tỉ lệ bản đồ hai chiều (độ dài thật =
// độ dài trên bản đồ × mẫu số của tỉ lệ), bài toán tìm hai số khi biết tổng (hiệu) và tỉ số, máy tính cầm tay (dãy phím “a × b % =”,
// “a ÷ b % =”), đổi đơn vị đo thể tích (1 m³ = 1 000 dm³, 1 dm³ = 1 000 cm³; đổi sang lít chỉ khi đề ghi 1 l = 1 dm³), diện tích xung
// quanh, toàn phần, thể tích của hình hộp chữ nhật, hình lập phương. Câu có hình: đọc lại sơ đồ đoạn thẳng của bài toán tổng – tỉ, hiệu –
// tỉ (các phần bằng nhau ở cả hai hàng, ngoặc tổng ôm hai hàng, ngoặc hiệu ôm đúng phần hơn), hình hộp chữ nhật, hình lập phương (3 cạnh
// khuất nét đứt chung một đỉnh, cạnh chiều rộng vẽ xiên 3 : 4 bằng nửa độ dài theo tỉ lệ, số đo thuộc cạnh gần nó nhất, đúng tỉ lệ),
// hình xếp từ hình lập phương nhỏ (đọc chiều cao từng cột từ mặt trên, vẽ lại rồi so với hình; mặt trên của mọi cột nhìn thấy được, các
// hàng như nhau; đếm hình lập phương nhỏ), hình khai triển của hình lập phương (gấp lại bằng cách lăn hình lập phương trên các ô: gấp được
// khi sáu ô là sáu mặt khác nhau; mặt đối diện), hình khai triển của hình hộp chữ nhật (hình chữ thập: cột giữa bốn hình chữ nhật, hai bên
// hình thứ hai), phím máy tính cầm tay; tên hình (title) ghi đúng số liệu của hình; chữ trong hình cỡ từ 13, nằm trọn trong khung, không
// đè nhau. Rồi kiểm tra như tests/toan5-ck1.js: ma trận (mỗi ô rút 1 câu và có 4 câu: một câu ở mỗi đề cố định, hai câu riêng; rút thử
// ra đúng 10 Biết, 8 Hiểu, 7 Vận dụng; đã làm hết một đề cố định thì không gặp lại câu của đề đó), đáp án đúng không dài hơn hẳn lựa chọn
// sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn, không lặp chữ của nhãn chủ đề, đúng/sai 4 ý
// không lặp kiểu Đ/S, không có số âm, số thập phân viết dấu phẩy, tỉ số và tỉ lệ viết “a : b”, tỉ số phần trăm viết liền kí hiệu %
// (trừ dãy phím “… % =”), đơn vị thể tích viết cm³, dm³, m³, dấu ÷ chỉ ở câu máy tính cầm tay, đề không ghi sẵn công thức, đề bài không
// trùng câu nào trong data/banks/5-toan.js, không gần trùng câu của data/banks/4-toan.js và kho Toán 5 cuối kì I (cặp hai âm tiết
// chung), dò lộ đáp án giữa mọi cặp câu của kho và lời dặn của đề (cả đáp án là tỉ số phần trăm) và, nếu có ../OnUp-Book, so mọi trường
// chữ với chữ OCR của mọi cuốn (không chuỗi 8 từ nào trùng), so số liệu của đề với từng trang Toán 5 tập hai (không trang nào có từ ba
// số liệu riêng của một câu), so với câu của mọi kho khác, cả kho Toán 5 cuối kì I (không chuỗi 8 từ nào trùng). Số đề, số câu lấy từ
// danh mục.
// Chạy: node tests/toan5-gk2.js → in MATH OK. DO_LO=1 in đáp án bằng chữ có ở câu khác; DO_SACH=1 in chuỗi 6 từ trùng sách và các
// trang có số liệu chung; DO_KHO=1 in chuỗi 6 từ trùng kho khác (để người làm xem).
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan5-gk2-ngau-nhien";
// chủ đề theo tên bài của Toán 5 tập hai (Chủ đề 7: 7 chủ đề đầu; Chủ đề 8: 3 chủ đề tiếp; Chủ đề 9: 5 chủ đề cuối), đúng thứ tự của ma trận
const CHU_DE = ["Tỉ số, tỉ số phần trăm", "Tỉ lệ bản đồ", "Tìm hai số khi biết tổng và tỉ số", "Tìm hai số khi biết hiệu và tỉ số",
  "Tìm tỉ số phần trăm của hai số", "Tìm giá trị phần trăm của một số", "Máy tính cầm tay", "Thể tích của một hình",
  "Xăng-ti-mét khối, đề-xi-mét khối", "Mét khối", "Hình khai triển", "Diện tích xung quanh, toàn phần của hình hộp chữ nhật",
  "Diện tích xung quanh, toàn phần của hình lập phương", "Thể tích của hình hộp chữ nhật", "Thể tích của hình lập phương"];

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
const str = (a) => (a.d === 1 ? String(a.n) : a.n + "/" + a.d);
const nguyen = (a) => { assert.equal(a.d, 1, "cần số tự nhiên: " + str(a)); return a.n; };

/* ---------- biểu thức: + − × : ( ), số thập phân "3,75", số "1 080", phân số "2/5" (gạch phân số làm trước ×, :) ---------- */
const ev = (src) => {
  const s = String(src).replace(/[−–]/g, "-").replace(/÷/g, ":"), T = [];
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

/* ---------- đơn vị đo: độ dài (gấp 10), khối lượng (gấp 10), diện tích, thể tích (gấp 1 000), dung tích (1 l = 1 dm³) ---------- */
const DV = {}, LOAI = {};
[["km", "hm", "dam", "m", "dm", "cm", "mm"], ["tấn", "tạ", "yến", "kg", "hg", "dag", "g"]].forEach((d, j) => d.forEach((u, i) => { DV[u] = F(10 ** (6 - i)); LOAI[u] = ["dài", "nặng"][j]; }));
Object.assign(DV, { "km²": F(1e12), ha: F(1e10), "m²": F(1e6), "dm²": F(1e4), "cm²": F(100), "mm²": F(1) });
["km²", "ha", "m²", "dm²", "cm²", "mm²"].forEach((u) => (LOAI[u] = "rộng"));
Object.assign(DV, { "m³": F(1e6), "dm³": F(1000), "cm³": F(1), l: F(1000), ml: F(1) });
["m³", "dm³", "cm³", "l", "ml"].forEach((u) => (LOAI[u] = "khối"));
const DV_RE = "km²|m²|dm²|cm²|mm²|m³|dm³|cm³|ha|km|hm|dam|mm|cm|dm|m|tấn|tạ|yến|kg|hg|dag|g|ml|l";
// "3 dm³ 40 cm³", "2,4 m³" → số đo theo đơn vị u
const doi = (s, u) => {
  const P = [...String(s).matchAll(new RegExp("(\\d[\\d ]*(?:,\\d+)?)\\s*(" + DV_RE + ")(?![\\p{L}²³])", "gu"))];
  assert.ok(P.length && P.map((m) => m.index + m[0].length).pop() === String(s).trim().length && P[0].index === 0, "số đo lạ: " + s);
  P.forEach((m) => assert.equal(LOAI[m[2]], LOAI[u], "khác loại đơn vị: " + s + " → " + u));
  return div(P.reduce((t, m) => add(t, mul(fr(m[1].trim()), DV[m[2]])), F(0)), DV[u]);
};
const soDV = (s) => { const m = new RegExp("^(\\d[\\d ]*(?:,\\d+)?) (" + DV_RE + ")$", "u").exec(s); assert.ok(m, "số đo lạ: " + s); return [fr(m[1]), m[2]]; };
const ghi = (a, u) => fmtDec(a) + (u ? " " + u : "");

/* ---------- đọc số (như sách: “sáu trăm linh tám”, “hai mươi lăm phẩy không tám”) ---------- */
const SO = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
function docN(n) {
  if (n === 0) return "không";
  const groups = [];
  for (let x = n; x > 0; x = Math.floor(x / 1000)) groups.unshift(x % 1000);
  const LOP = ["", " nghìn", " triệu"];
  return groups.map((g, i) => {
    if (!g && i) return "";
    const h = Math.floor(g / 100), t = Math.floor(g / 10) % 10, u = g % 10, full = i > 0 || h > 0, w = [];
    if (full) w.push(SO[h] + " trăm");
    if (t === 0 && u) w.push(full ? "linh " + SO[u] : SO[u]);
    if (t === 1) w.push("mười" + (u === 5 ? " lăm" : u ? " " + SO[u] : ""));
    if (t >= 2) w.push(SO[t] + " mươi" + (u === 1 ? " mốt" : u === 4 ? " tư" : u === 5 ? " lăm" : u ? " " + SO[u] : ""));
    return w.join(" ") + LOP[groups.length - 1 - i];
  }).filter(Boolean).join(" ");
}
const docTP = (s) => { const [ip, fp] = s.split(","); if (!fp) return docN(+ip.replace(/ /g, "")); const z = /^0*/.exec(fp)[0].length; return docN(+ip.replace(/ /g, "")) + " phẩy " + Array(z).fill("không ").join("") + (fp.slice(z) ? docN(+fp.slice(z)) : ""); };
const TEN_DV = { "m³": "mét khối", "dm³": "đề-xi-mét khối", "cm³": "xăng-ti-mét khối" };
const docSoDo = (s) => { const [v, u] = soDV(s); assert.ok(TEN_DV[u], "đơn vị lạ: " + u); return docTP(fmtDec(v)) + " " + TEN_DV[u]; };

/* ---------- tỉ số, tỉ số phần trăm, tỉ lệ bản đồ, tổng – tỉ, hiệu – tỉ, hình khối ---------- */
const phanTram = (a, b) => mul(div(R(a), R(b)), F(100)); // tỉ số phần trăm của a và b (số trước kí hiệu %)
const giaTri = (n, p) => div(mul(R(n), R(p)), F(100)); // p% của n
// tổng t, hai số theo tỉ số m : n → [số ứng với m phần, số ứng với n phần]
const tongTi = (t, m, n) => { const mot = div(R(t), F(m + n)); return [mul(mot, F(m)), mul(mot, F(n))]; };
// hiệu h, hai số theo tỉ số m : n (m < n) → [số bé, số lớn]
const hieuTi = (h, m, n) => { assert.ok(m < n, "hiệu – tỉ: m < n"); const mot = div(R(h), F(n - m)); return [mul(mot, F(m)), mul(mot, F(n))]; };
const Sxq = (a, b, c) => mul(mul(add(R(a), R(b)), F(2)), R(c));
const Sday = (a, b) => mul(R(a), R(b));
const Stp = (a, b, c) => add(Sxq(a, b, c), mul(Sday(a, b), F(2)));
const V = (a, b, c) => mul(mul(R(a), R(b)), R(c));
// phím máy tính cầm tay (Bài 42) và việc của từng phím
const PHIM = { "ON/C": "bật máy", OFF: "tắt máy", CE: "xoá số vừa nhập", "%": "tính phần trăm", "÷": "chia", "×": "nhân", "+": "cộng", "−": "trừ", "=": "hiện kết quả" };
// dãy phím (từng phím là một chữ số hay một dấu): “a × b % =” là b% của a, “a ÷ b % =” là tỉ số phần trăm của a và b, “a … b =” như phép tính
const tinhPhim = (keys) => {
  keys.forEach((k) => assert.ok(/^\d$/.test(k) || k in PHIM, "phím lạ: " + k));
  const s = keys.join("");
  let m = /^(\d+)([×÷])(\d+)%=$/.exec(s);
  if (m) return m[2] === "×" ? giaTri(F(+m[1]), F(+m[3])) : phanTram(F(+m[1]), F(+m[3]));
  m = /^(\d+)([+−×÷])(\d+)=$/.exec(s);
  if (m) return { "+": add, "−": sub, "×": mul, "÷": div }[m[2]](F(+m[1]), F(+m[3]));
  throw new Error("dãy phím lạ: " + keys.join(" "));
};
// “18 ÷ 75 % =” → ["1", "8", "÷", "7", "5", "%", "="]
const tachPhim = (s) => s.split(" ").flatMap((t) => (/^\d+$/.test(t) ? [...t] : [t]));

/* ---------- hình SVG ---------- */
const nums = (s) => s.trim().split(/[\s,]+/).map(Number);
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const pts2 = (s) => { const v = nums(s), p = []; for (let i = 0; i < v.length; i += 2) p.push([v[i], v[i + 1]]); return p; };
const LINES = (svg) => [...svg.matchAll(/<line [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { a: [+a.x1, +a.y1], b: [+a.x2, +a.y2], dash: !!a["stroke-dasharray"] }; });
const POLYS = (svg) => [...svg.matchAll(/<polygon [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { p: pts2(a.points), fill: a.fill || "none" }; });
const MARKS = (svg) => [...svg.matchAll(/<polyline [^>]*>/g)].map((m) => pts2(attrs(m[0]).points));
const RECTS = (svg) => [...svg.matchAll(/<rect [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { x: +a.x, y: +a.y, w: +a.width, h: +a.height, fill: a.fill || "none" }; });
const TEXTS = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { at: [+a.x, +a.y], t: m[2], fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start", b: a["font-weight"] === "700" }; });
const TITLE = (svg) => (/<title>([^<]*)<\/title>/.exec(svg) || [])[1] || "";
const rong = (t) => (t.b ? 0.62 : 0.55) * t.fs * [...t.t].length; // ước bề rộng chữ (Noto Sans)
const hopChu = (t) => { const w = rong(t), x0 = t.anchor === "middle" ? t.at[0] - w / 2 : t.anchor === "end" ? t.at[0] - w : t.at[0]; return [x0, t.at[1] - 0.75 * t.fs, x0 + w, t.at[1] + 0.25 * t.fs]; };
const tamChu = (t) => { const h = hopChu(t); return [(h[0] + h[2]) / 2, (h[1] + h[3]) / 2]; };
const vsub = (p, q) => [p[0] - q[0], p[1] - q[1]];
const dot = (u, v) => u[0] * v[0] + u[1] * v[1];
const cross = (u, v) => u[0] * v[1] - u[1] * v[0];
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const gan = (x, y, e) => Math.abs(x - y) <= (e === undefined ? 1e-6 : e) * Math.max(1, Math.abs(x), Math.abs(y));
const cung = (P, Q) => dist(P, Q) < 0.5;
const segDist = (p, a, b) => { const ab = vsub(b, a), t = Math.max(0, Math.min(1, dot(vsub(p, a), ab) / dot(ab, ab))); return dist(p, [a[0] + t * ab[0], a[1] + t * ab[1]]); };
// điểm nằm hẳn trong đa giác lồi (không tính trên cạnh)
const trongDaGiac = (p, g) => { const s = g.map((a, i) => cross(vsub(g[(i + 1) % g.length], a), vsub(p, a))); return s.every((x) => x > 1e-6) || s.every((x) => x < -1e-6); };
// mọi chữ trong hình cỡ từ 13 trở lên, nằm trọn trong khung, không đè lên nhau
const chuHinh = (svg, ten) => {
  const v = nums(/viewBox="([^"]+)"/.exec(svg)[1]), T = TEXTS(svg);
  T.forEach((t) => { const h = hopChu(t); assert.ok(t.fs >= 13, ten + ": chữ “" + t.t + "” nhỏ hơn cỡ 13"); assert.ok(h[0] >= 0 && h[2] <= v[2] && h[1] >= 0 && h[3] <= v[3], ten + ": chữ “" + t.t + "” tràn khỏi khung hình"); });
  T.forEach((t, i) => T.slice(i + 1).forEach((u) => { const a = hopChu(t), b = hopChu(u); assert.ok(!(a[0] < b[2] - 1 && b[0] < a[2] - 1 && a[1] < b[3] - 1 && b[1] < a[3] - 1), ten + ": chữ “" + t.t + "” đè lên chữ “" + u.t + "”"); }));
  assert.ok(TITLE(svg).length >= 12, ten + ": hình cần tên (title) nói rõ hình vẽ gì");
};
const hinhDaDoc = new Set();
const doc = (q) => { assert.ok(q.svg, "câu cần hình"); hinhDaDoc.add(q.svg); return q.svg; };

// sơ đồ đoạn thẳng hai hàng (nhãn “…:” bên trái mỗi hàng; mỗi hàng chia các phần bằng nhau bằng vạch) với ngoặc tổng (bên phải, ôm hai
// hàng, số liệu bên phải ngoặc) hoặc ngoặc hiệu (dưới phần hàng dưới dài hơn hàng trên, nét đứt từ cuối hàng trên xuống, số liệu dưới
// ngoặc) → { rows: [{ label, n }], tong | hieu: chữ của số liệu }
const docSoDoDoan = (q) => {
  const svg = doc(q), L = LINES(svg), T = TEXTS(svg), tt = TITLE(svg);
  const nhan = T.filter((t) => /:$/.test(t.t)).sort((a, b) => a.at[1] - b.at[1]);
  assert.equal(nhan.length, 2, "sơ đồ có hai hàng, mỗi hàng một nhãn");
  const rows = nhan.map((t) => {
    const cy = tamChu(t)[1], bar = L.filter((l) => !l.dash && l.a[1] === l.b[1] && Math.abs(l.a[1] - cy) <= 6);
    assert.equal(bar.length, 1, "nhãn “" + t.t + "” đứng ngang một đoạn thẳng");
    const y = bar[0].a[1], x0 = Math.min(bar[0].a[0], bar[0].b[0]), x1 = Math.max(bar[0].a[0], bar[0].b[0]);
    assert.ok(hopChu(t)[2] <= x0 - 4, "nhãn “" + t.t + "” ở bên trái đoạn thẳng");
    const v = L.filter((l) => !l.dash && l.a[0] === l.b[0] && Math.min(l.a[1], l.b[1]) < y && Math.max(l.a[1], l.b[1]) > y && l.a[0] >= x0 - 0.05 && l.a[0] <= x1 + 0.05).map((l) => l.a[0]).sort((a, b) => a - b);
    assert.ok(v.length >= 2 && Math.abs(v[0] - x0) <= 0.05 && Math.abs(v[v.length - 1] - x1) <= 0.05, "hai đầu đoạn thẳng có vạch");
    const n = v.length - 1, u = (x1 - x0) / n;
    v.forEach((x, i) => assert.ok(Math.abs(x - x0 - i * u) <= 0.11, "các phần của hàng “" + t.t + "” bằng nhau"));
    assert.ok(tt.toLowerCase().includes(t.t.replace(/:$/, "").toLowerCase()) && tt.includes(n + " phần"), "tên hình ghi hàng “" + t.t + "” gồm " + n + " phần");
    return { label: t.t.replace(/:$/, ""), y, x0, x1, n, u };
  });
  const [r0, r1] = rows;
  assert.ok(Math.abs(r0.x0 - r1.x0) <= 0.05 && Math.abs(r0.u - r1.u) <= 0.05, "hai hàng cùng điểm đầu, mỗi phần dài như nhau");
  const o = { rows: rows.map((r) => ({ label: r.label, n: r.n })) };
  const so = T.filter((t) => !nhan.includes(t));
  assert.equal(so.length, 1, "sơ đồ ghi đúng một số liệu (tổng hoặc hiệu)");
  const s = so[0], c = tamChu(s), M = MARKS(svg);
  const ngoac = M.filter((m) => m.length === 4 && Math.abs(m[1][0] - m[2][0]) <= 0.05 && m[0][0] < m[1][0] && m[3][0] < m[2][0]);
  const duoi = M.filter((m) => m.length === 4 && Math.abs(m[1][1] - m[2][1]) <= 0.05 && m[0][1] < m[1][1] && m[3][1] < m[2][1]);
  assert.equal(ngoac.length + duoi.length, 1, "sơ đồ có đúng một ngoặc (tổng hoặc hiệu)");
  if (ngoac.length) {
    const g = ngoac[0], xr = g[1][0];
    assert.ok(Math.abs(g[1][1] - (r0.y - 9)) <= 0.11 && Math.abs(g[2][1] - (r1.y + 9)) <= 0.11, "ngoặc tổng ôm cả hai hàng");
    assert.ok(xr >= Math.max(r0.x1, r1.x1) + 4, "ngoặc tổng ở bên phải hai hàng");
    assert.ok(hopChu(s)[0] >= xr + 4 && c[1] > r0.y && c[1] < r1.y, "tổng ghi bên phải ngoặc, giữa hai hàng");
    o.tong = s.t;
  } else {
    const g = duoi[0];
    assert.ok(r1.n > r0.n, "sơ đồ hiệu: hàng dưới dài hơn hàng trên");
    assert.ok(Math.abs(g[0][0] - r0.x1) <= 0.11 && Math.abs(g[3][0] - r1.x1) <= 0.11 && g[1][1] >= r1.y + 6, "ngoặc hiệu ôm đúng phần hơn của hàng dưới, ở dưới hàng đó");
    const dut = L.filter((l) => l.dash && Math.abs(l.a[0] - l.b[0]) <= 0.05 && Math.abs(l.a[0] - r0.x1) <= 0.11 && Math.min(l.a[1], l.b[1]) <= r0.y + 0.11 && Math.max(l.a[1], l.b[1]) >= r1.y - 0.11);
    assert.equal(dut.length, 1, "nét đứt từ cuối hàng trên xuống hàng dưới");
    assert.ok(Math.abs(c[0] - (r0.x1 + r1.x1) / 2) <= 1 && c[1] > g[1][1], "hiệu ghi dưới ngoặc hiệu, ở giữa");
    o.hieu = s.t;
  }
  assert.ok(tt.includes(s.t), "tên hình ghi số liệu " + s.t);
  return o;
};

// hình hộp chữ nhật, hình lập phương: 9 cạnh nhìn thấy nét liền, 3 cạnh khuất nét đứt chung đỉnh A' (một nằm ngang, một thẳng đứng, một
// xiên); mặt trước ABCD là hình chữ nhật; cạnh chiều rộng vẽ xiên lên bên phải (3 : 4), dài bằng nửa độ dài theo tỉ lệ; số đo thuộc cạnh
// gần nó nhất (AB: chiều dài, AD: chiều cao, BB': chiều rộng), đúng tỉ lệ; hình lập phương chỉ ghi một số đo
// → { dai, rong, cao, u, lapPhuong }
const docHop = (q) => {
  const svg = doc(q), L = LINES(svg), T = TEXTS(svg), tt = TITLE(svg);
  const dut = L.filter((l) => l.dash), lien = L.filter((l) => !l.dash);
  assert.equal(lien.length, 9, "hình hộp có 9 cạnh nhìn thấy vẽ nét liền"); assert.equal(dut.length, 3, "hình hộp có 3 cạnh khuất vẽ nét đứt");
  const A2s = [dut[0].a, dut[0].b].filter((p) => dut.every((l) => cung(l.a, p) || cung(l.b, p)));
  assert.equal(A2s.length, 1, "3 cạnh khuất chung một đỉnh"); const A2 = A2s[0];
  const khac = (l) => (cung(l.a, A2) ? l.b : l.a);
  const ngang = dut.filter((l) => Math.abs(l.a[1] - l.b[1]) <= 0.05), dung = dut.filter((l) => Math.abs(l.a[0] - l.b[0]) <= 0.05), xien = dut.filter((l) => !ngang.includes(l) && !dung.includes(l));
  assert.ok(ngang.length === 1 && dung.length === 1 && xien.length === 1, "cạnh khuất: một nằm ngang, một thẳng đứng, một xiên");
  const A = khac(xien[0]), B2 = khac(ngang[0]), D2 = khac(dung[0]), v = vsub(A2, A);
  const B = vsub(B2, v), D = vsub(D2, v), C = [B[0] + D[0] - A[0], B[1] + D[1] - A[1]], C2 = [C[0] + v[0], C[1] + v[1]];
  assert.ok(B[0] > A[0] && D[1] < A[1] && Math.abs(B[1] - A[1]) <= 0.15 && Math.abs(D[0] - A[0]) <= 0.15, "mặt trước là hình chữ nhật, A ở góc dưới bên trái");
  assert.ok(v[0] > 0 && v[1] < 0 && Math.abs(-v[1] / v[0] - 0.75) < 0.02, "cạnh chiều rộng vẽ xiên lên bên phải (3 : 4)");
  [[A, B], [B, C], [C, D], [D, A], [D, D2], [C, C2], [B, B2], [D2, C2], [C2, B2]].forEach(([P, Q]) => assert.ok(lien.some((l) => (cung(l.a, P) && cung(l.b, Q)) || (cung(l.a, Q) && cung(l.b, P))), "thiếu một cạnh nhìn thấy của hình hộp"));
  const canh = { AB: [A, B], BC: [B, C], CD: [C, D], DA: [D, A], DD2: [D, D2], CC2: [C, C2], BB2: [B, B2], D2C2: [D2, C2], C2B2: [C2, B2], AA2: [A, A2], A2B2: [A2, B2], A2D2: [A2, D2] };
  const ten = { AB: "dai", DA: "cao", BB2: "rong" }, so = {};
  let u;
  T.forEach((t) => {
    const m = /^(\d+(?:,\d+)?) (mm|cm|dm|m)$/.exec(t.t); assert.ok(m, "chữ lạ trong hình hộp: " + t.t);
    const c = tamChu(t), near = Object.keys(canh).map((k) => [k, segDist(c, ...canh[k])]).sort((a, b) => a[1] - b[1]);
    assert.ok(near[0][1] <= 30 && near[1][1] - near[0][1] >= 3, `số đo “${t.t}” cần gần hẳn một cạnh (${near[0][0]} ${near[0][1].toFixed(1)}, ${near[1][0]} ${near[1][1].toFixed(1)})`);
    const k = ten[near[0][0]]; assert.ok(k, `số đo “${t.t}” ghi ở cạnh ${near[0][0]}, không phải chiều dài, chiều rộng hay chiều cao`);
    assert.ok(!(k in so), "hai số đo cùng một cạnh"); assert.ok(!u || u === m[2], "các số đo cùng đơn vị"); u = m[2]; so[k] = fr(m[1]);
  });
  const W = dist(A, B), H = dist(A, D), Dp = dist(B, B2), ks = [];
  if (so.dai) ks.push(W / toNum(so.dai)); if (so.cao) ks.push(H / toNum(so.cao)); if (so.rong) ks.push((2 * Dp) / toNum(so.rong));
  assert.ok(ks.length, "hình hộp không có số đo");
  ks.forEach((x) => assert.ok(gan(x, ks[0], 0.01), `hình vẽ đúng tỉ lệ (${ks.map((x) => x.toFixed(2)).join("; ")} px một ${u})`));
  const lp = gan(W, H, 0.01) && gan(2 * Dp, W, 0.01);
  if (Object.keys(so).length < 3) { assert.ok(lp && Object.keys(so).length === 1, "chỉ hình lập phương mới ghi một số đo"); so.rong = so.cao = so.dai; }
  assert.ok(lp ? tt.includes("lập phương") : tt.includes("hộp chữ nhật"), "tên hình đúng loại hình");
  [so.dai, so.rong, so.cao].forEach((x) => assert.ok(tt.includes(ghi(x, u)), "tên hình ghi số đo " + ghi(x, u)));
  return Object.assign(so, { u, lapPhuong: lp });
};

// hình xếp từ hình lập phương nhỏ (cạnh 25, chiều sâu vẽ xiên 12,5; −10; mặt trước tô acc-soft, mặt trên sun-soft, mặt phải line): mỗi
// hình là một nhóm đa giác rời nhau theo chiều ngang. Đọc chiều cao từng cột (cột a, hàng b) từ mặt trên của nó, vẽ lại cả hình theo
// thứ tự vẽ (hàng sau trước, trái sang phải, dưới lên trên) rồi so với hình; mặt trên của mọi cột không bị mặt vẽ sau che ở tâm (đếm được
// mọi cột); các hàng như nhau → [{ ten, cot: chiều cao từng cột, sau: số hàng, so: số hình lập phương nhỏ }]
const docKhoi = (q) => {
  const svg = doc(q), P = POLYS(svg), T = TEXTS(svg), k = 25, ex = 12.5, ey = 10;
  assert.ok(P.length && P.every((g) => g.p.length === 4 && ["acc-soft", "sun-soft", "line"].includes(g.fill)), "hình xếp chỉ gồm các mặt của hình lập phương nhỏ");
  const base = Math.max(...P.flatMap((g) => g.p.map((p) => p[1])));
  const kh = P.map((g, i) => ({ i, x0: Math.min(...g.p.map((p) => p[0])), x1: Math.max(...g.p.map((p) => p[0])) })).sort((a, b) => a.x0 - b.x0), nhom = [];
  kh.forEach((h) => { const g = nhom[nhom.length - 1]; if (g && h.x0 <= g.x1 + 1) { g.x1 = Math.max(g.x1, h.x1); g.ds.push(h.i); } else nhom.push({ x0: h.x0, x1: h.x1, ds: [h.i] }); });
  return nhom.map((g) => {
    const X0 = g.x0, H = {}, da = g.ds.slice().sort((x, y) => x - y).map((i) => P[i]);
    da.filter((f) => f.fill === "sun-soft").forEach((f) => {
      const [x, y] = f.p[0];
      const bs = [0, 1, 2, 3, 4].filter((b) => { const c1 = (base - y - ey * b) / k, a = (x - X0 - ex * b) / k; return Math.abs(c1 - Math.round(c1)) < 0.01 && Math.abs(a - Math.round(a)) < 0.01 && c1 >= 0.99 && a >= -0.01; });
      assert.equal(bs.length, 1, "đọc được vị trí mặt trên");
      const b = bs[0], a = Math.round((x - X0 - ex * b) / k), c1 = Math.round((base - y - ey * b) / k), key = a + "," + b;
      H[key] = Math.max(H[key] || 0, c1);
    });
    const ks = Object.keys(H).map((s) => s.split(",").map(Number)), na = Math.max(...ks.map((x) => x[0])) + 1, nb = Math.max(...ks.map((x) => x[1])) + 1;
    const h = (a, b) => H[a + "," + b] || 0, co = (a, b, c) => a >= 0 && b >= 0 && c >= 0 && c < h(a, b);
    const Pt = (a, b, c) => [X0 + a * k + b * ex, base - c * k - b * ey], ve = [];
    for (let b = nb - 1; b >= 0; b--) for (let a = 0; a < na; a++) for (let c = 0; c < h(a, b); c++) {
      if (!co(a, b - 1, c)) ve.push({ p: [Pt(a, b, c), Pt(a + 1, b, c), Pt(a + 1, b, c + 1), Pt(a, b, c + 1)], fill: "acc-soft" });
      if (!co(a, b, c + 1)) ve.push({ p: [Pt(a, b, c + 1), Pt(a + 1, b, c + 1), Pt(a + 1, b + 1, c + 1), Pt(a, b + 1, c + 1)], fill: "sun-soft", top: true });
      if (!co(a + 1, b, c)) ve.push({ p: [Pt(a + 1, b, c), Pt(a + 1, b + 1, c), Pt(a + 1, b + 1, c + 1), Pt(a + 1, b, c + 1)], fill: "line" });
    }
    assert.equal(da.length, ve.length, "hình vẽ khớp hình xếp đọc được");
    da.forEach((f, i) => { assert.equal(f.fill, ve[i].fill, "hình vẽ khớp hình xếp đọc được"); f.p.forEach((p, j) => assert.ok(dist(p, ve[i].p[j]) < 0.15, "hình vẽ khớp hình xếp đọc được")); });
    ve.forEach((f, i) => { if (!f.top) return; const c = [f.p.reduce((s, p) => s + p[0], 0) / 4, f.p.reduce((s, p) => s + p[1], 0) / 4];
      assert.ok(ve.slice(i + 1).every((e) => !trongDaGiac(c, e.p)), "mặt trên của một cột bị che: không đếm được"); });
    const cot = [...Array(na).keys()].map((a) => h(a, 0));
    for (let a = 0; a < na; a++) for (let b = 0; b < nb; b++) assert.equal(h(a, b), cot[a], "các hàng của hình xếp như nhau");
    assert.ok(cot.every((x) => x >= 1), "không có cột trống");
    const ten = T.filter((t) => t.at[0] >= g.x0 && t.at[0] <= g.x1 && t.at[1] > base);
    assert.ok(ten.length <= 1);
    return { ten: ten.length ? ten[0].t : "", cot, sau: nb, so: cot.reduce((s, x) => s + x, 0) * nb };
  });
};

// gấp hình khai triển của hình lập phương: lăn hình lập phương trên các ô (mặt chạm ô là mặt dán ở ô đó); gấp được khi sáu ô là sáu mặt
// khác nhau → mặt (0..5) của từng ô, hai mặt đối diện là 0-1, 2-3, 4-5; không gấp được → null
function gap(o) {
  const key = (p) => p[0] + "," + p[1], idx = new Map(o.map((p, i) => [key(p), i]));
  const face = Array(o.length).fill(null); face[0] = { D: 0, U: 1, N: 2, S: 3, E: 4, W: 5 };
  const roll = (s, d) => d === "E" ? { D: s.E, E: s.U, U: s.W, W: s.D, N: s.N, S: s.S } : d === "W" ? { D: s.W, W: s.U, U: s.E, E: s.D, N: s.N, S: s.S }
    : d === "N" ? { D: s.N, N: s.U, U: s.S, S: s.D, E: s.E, W: s.W } : { D: s.S, S: s.U, U: s.N, N: s.D, E: s.E, W: s.W };
  const st = [0];
  while (st.length) { const i = st.pop(); const [x, y] = o[i];
    for (const [dx, dy, d] of [[1, 0, "E"], [-1, 0, "W"], [0, -1, "N"], [0, 1, "S"]]) { const j = idx.get(key([x + dx, y + dy])); if (j !== undefined && !face[j]) { face[j] = roll(face[i], d); st.push(j); } } }
  if (face.some((f) => !f)) return null;
  const D = face.map((f) => f.D); return new Set(D).size === 6 ? D : null;
}
// hình khai triển (các ô vuông bằng nhau; ô chung cạnh thuộc cùng một tấm) → [{ o: [[cột, hàng]], chu: [chữ trong ô], to: chỉ số ô tô màu, ten }]
const docLuoi = (q) => {
  const svg = doc(q), Rs = RECTS(svg), T = TEXTS(svg), s = Rs[0].w;
  assert.ok(Rs.every((r) => gan(r.w, s) && gan(r.h, s)), "các ô vuông bằng nhau");
  const ke = (r, t) => (Math.abs(Math.abs(r.x - t.x) - s) <= 0.05 && Math.abs(r.y - t.y) <= 0.05) || (Math.abs(Math.abs(r.y - t.y) - s) <= 0.05 && Math.abs(r.x - t.x) <= 0.05);
  const nhom = [], da = new Set();
  Rs.forEach((r, i) => { if (da.has(i)) return; const g = [i]; da.add(i); for (let k = 0; k < g.length; k++) Rs.forEach((t, j) => { if (!da.has(j) && ke(Rs[g[k]], t)) { da.add(j); g.push(j); } }); nhom.push(g.sort((a, b) => a - b)); });
  const dung = new Set();
  const ra = nhom.map((g) => {
    assert.equal(g.length, 6, "tấm bìa gồm 6 ô vuông");
    const x0 = Math.min(...g.map((i) => Rs[i].x)), y0 = Math.min(...g.map((i) => Rs[i].y)), x1 = Math.max(...g.map((i) => Rs[i].x)) + s, y1 = Math.max(...g.map((i) => Rs[i].y)) + s;
    const o = g.map((i) => [Math.round((Rs[i].x - x0) / s), Math.round((Rs[i].y - y0) / s)]);
    g.forEach((i, j) => assert.ok(Math.abs(Rs[i].x - x0 - o[j][0] * s) <= 0.05 && Math.abs(Rs[i].y - y0 - o[j][1] * s) <= 0.05, "ô nằm đúng lưới"));
    const chu = g.map((i) => { const t = T.filter((t) => { const c = tamChu(t); return c[0] > Rs[i].x && c[0] < Rs[i].x + s && c[1] > Rs[i].y && c[1] < Rs[i].y + s; }); assert.ok(t.length <= 1, "mỗi ô nhiều nhất một chữ"); t.forEach((x) => dung.add(x)); return t.length ? t[0].t : ""; });
    const to = g.filter((i) => Rs[i].fill !== "none");
    assert.ok(to.length <= 1 && to.every((i) => Rs[i].fill === "acc-soft"), "nhiều nhất một ô tô màu");
    const ten = T.filter((t) => { const c = tamChu(t); return c[0] > x0 && c[0] < x1 && c[1] > y1 && c[1] < y1 + 40; });
    assert.ok(ten.length <= 1); ten.forEach((x) => dung.add(x));
    const ch = chu.filter(Boolean); assert.equal(new Set(ch).size, ch.length, "chữ trong các ô không trùng nhau");
    return { o, chu, to: to.length ? g.indexOf(to[0]) : -1, ten: ten.length ? ten[0].t : "" };
  });
  assert.equal(dung.size, T.length, "chữ nào trong hình cũng thuộc một ô hay một tấm");
  return ra;
};
// mặt đối diện với ô thứ i của tấm bìa (tấm phải gấp được)
const doiDien = (net, i) => { const D = gap(net.o); assert.ok(D, "tấm bìa này không gấp được hình lập phương"); assert.ok(i >= 0); return D.indexOf(D[i] ^ 1); };
// hình khai triển của hình hộp chữ nhật kiểu chữ thập: cột giữa 4 hình chữ nhật cùng chiều rộng a xếp liền nhau, cao b, c, b, c; hai hình
// b × c hai bên hình thứ hai → { a, b, c } (px); không đúng kiểu đó thì báo
const docLuoiHop = (q) => {
  const svg = doc(q), Rs = RECTS(svg);
  assert.equal(Rs.length, 6, "tấm bìa gồm 6 hình chữ nhật");
  const cot = Rs.filter((r) => Rs.filter((t) => Math.abs(t.x - r.x) <= 0.05 && Math.abs(t.w - r.w) <= 0.05).length === 4).sort((a, b) => a.y - b.y);
  assert.equal(cot.length, 4, "cột giữa gồm 4 hình chữ nhật cùng chiều rộng");
  cot.slice(1).forEach((r, i) => assert.ok(Math.abs(r.y - cot[i].y - cot[i].h) <= 0.05, "các hình của cột giữa xếp liền nhau"));
  const a = cot[0].w, b = cot[0].h, c = cot[1].h;
  assert.ok(Math.abs(cot[2].h - b) <= 0.05 && Math.abs(cot[3].h - c) <= 0.05, "cột giữa cao b, c, b, c");
  const ben = Rs.filter((r) => !cot.includes(r));
  assert.ok(ben.length === 2 && ben.every((r) => Math.abs(r.w - b) <= 0.05 && Math.abs(r.h - c) <= 0.05 && Math.abs(r.y - cot[1].y) <= 0.05), "hai hình hai bên là b × c, ngang hình thứ hai của cột");
  assert.ok(ben.some((r) => Math.abs(r.x + r.w - cot[1].x) <= 0.05) && ben.some((r) => Math.abs(r.x - cot[1].x - a) <= 0.05), "hai hình hai bên sát hình thứ hai của cột");
  return { a, b, c };
};
// phím máy tính cầm tay bấm lần lượt từ trái sang phải: mỗi phím một hình chữ nhật có một chữ ở trong
const docPhim = (q) => {
  const svg = doc(q), Rs = RECTS(svg).sort((a, b) => a.x - b.x), T = TEXTS(svg);
  assert.equal(Rs.length, T.length, "mỗi phím một chữ");
  return Rs.map((r) => { const t = T.filter((t) => { const c = tamChu(t); return c[0] > r.x && c[0] < r.x + r.w && c[1] > r.y && c[1] < r.y + r.h; }); assert.equal(t.length, 1, "mỗi phím một chữ"); return t[0].t; });
};
const motLuaChon = (q, f) => { const m = q.o.filter(f); assert.equal(m.length, 1, "cần đúng một lựa chọn thoả: " + m.join(" | ")); return m[0]; };
// số đầu tiên sau cụm chữ trong ý của câu đúng/sai 4 ý
const soSau = (s, cum) => { const m = new RegExp(cum + "\\s*(\\d[\\d ]*(?:,\\d+)?)").exec(s); assert.ok(m, `ý “${s}” cần số sau “${cum}”`); return fr(m[1].trim()); };
const ti = (a, b) => a + " : " + b;

/* ---------- kiểm tra từng câu: has (chữ có trong đề bài), right(q) (đáp án tính bằng code), more(q) (kiểm tra thêm) ---------- */
const CHECKS = [
  /* Tỉ số, tỉ số phần trăm (Bài 36) */
  { has: "Trong vườn nhà bác Tư có 5 cây bưởi và 8 cây cam. Tỉ số của số cây bưởi và số cây cam là", right: (q) => { assert.ok(q.o.includes(ti(5, 5 + 8)), "nhiễu: tỉ số với tổng số cây"); return ti(5, 8); } },
  { has: "Viết tỉ số 21 : 25 dưới dạng tỉ số phần trăm.", right: () => phanTram(21, 25) },
  { has: "Tỉ số phần trăm 27% viết dưới dạng phân số là", right: (q) => { q.o.slice(1).forEach((o) => assert.ok(!eq(fr(o), F(27, 100)), "lựa chọn sai bằng 27%: " + o)); return "27/100"; } },
  { has: "tỉ số phần trăm của số học sinh đi xe buýt và số học sinh của trường là 15%. Tỉ số đó cho biết", right: () => `Cứ 100 học sinh của trường thì có ${15} học sinh đi xe buýt` },
  { has: "Tỉ số phần trăm 45% đọc là", right: (q) => { q.o.slice(1).forEach((o) => assert.notEqual(o, docN(45) + " phần trăm")); return docN(45) + " phần trăm"; } },
  { has: "Trong bể cá nhà Lâm có 15 con cá vàng và 17 con cá chép. Tỉ số của số cá vàng và số cá chép là 15 : 32.", right: () => ti(15, 17) === "15 : 32" },
  { has: "Câu lạc bộ thể thao của trường có 50 bạn, trong đó 20 bạn học bơi, 12 bạn học cầu lông, số bạn còn lại học cờ vua.", right: (q) => {
    const boi = 20, cauLong = 12, ca = 50, coVua = ca - boi - cauLong;
    return [q.o[0].endsWith(ti(boi, ca) + "."), q.o[1].endsWith(ti(cauLong, boi) + "."), eq(soSau(q.o[2], "Có"), F(coVua)), eq(soSau(q.o[3], "là"), phanTram(coVua, ca))]; } },
  { has: "Nối mỗi tỉ số ở cột trái với tỉ số phần trăm bằng nó ở cột phải.", right: (q) => {
    const P = q.r.map((r) => { assert.ok(/^\d+%$/.test(r)); return F(+r.slice(0, -1)); });
    return q.l.map((l) => { const [a, b] = l.split(" : ").map(Number), m = q.r.filter((r, i) => eq(P[i], phanTram(a, b))); assert.equal(m.length, 1, "ô " + l + " bằng đúng một ô phải"); return m[0]; }); },
    more: (q) => q.r.slice(q.l.length).forEach((r) => assert.ok(q.l.every((l) => !eq(F(+r.slice(0, -1)), phanTram(...l.split(" : ").map(Number)))), "ô thừa bằng một ô trái")) },
  /* Tỉ lệ bản đồ (Bài 37) */
  { has: "Bản đồ một khu phố có tỉ lệ 1 : 5 000. Đoạn thẳng dài 1 cm trên bản đồ này ứng với độ dài bao nhiêu trên thực tế?", right: (q) => motLuaChon(q, (o) => eq(doi(o, "cm"), mul(F(1), fr("5 000")))) },
  { has: "Quãng đường từ nhà Lan đến công viên dài 3,4 km. Trên bản đồ tỉ lệ 1 : 40 000,", right: () => div(doi("3,4 km", "cm"), fr("40 000")) },
  { has: "Trên một bản đồ có ghi tỉ lệ 1 : 20 000. Tỉ lệ đó cho biết", right: (q) => {
    assert.ok(!eq(doi("20 000 m", "cm"), mul(F(1), fr("20 000"))), "nhiễu “20 000 m” phải sai");
    return `Hình trên bản đồ được vẽ thu nhỏ ${thou("20000")} lần so với thực tế`; } },
  { has: "Trên bản đồ tỉ lệ 1 : 2 500 000, đoạn thẳng nối hai thành phố dài 7 cm.", right: () => doi(ghi(mul(F(7), fr("2 500 000")), "cm"), "km") },
  { has: "Trên bản đồ tỉ lệ 1 : 8 000, độ dài 1 cm ứng với ___ m trên thực tế.", right: () => doi(ghi(mul(F(1), fr("8 000")), "cm"), "m") },
  { has: "Trên bản đồ tỉ lệ 1 : 100 000, đoạn thẳng dài 1 cm ứng với 1 km ngoài thực tế.", right: () => eq(doi(ghi(mul(F(1), fr("100 000")), "cm"), "km"), F(1)) },
  { has: "Trên bản đồ tỉ lệ 1 : 400, mảnh vườn nhà bác Ba là một hình chữ nhật dài 8 cm, rộng 5 cm. Diện tích thật", right: () => {
    const dai = doi(ghi(mul(F(8), F(400)), "cm"), "m"), rg = doi(ghi(mul(F(5), F(400)), "cm"), "m"); return ghi(mul(dai, rg), "m²"); } },
  { has: "Bạn Nam vẽ sân trường lên giấy theo tỉ lệ 1 : 200. Chiều dài thật của sân trường là 46 m.", right: () => div(doi("46 m", "cm"), F(200)) },
  /* Tìm hai số khi biết tổng và tỉ số (Bài 38) */
  { has: "Theo sơ đồ dưới đây, số thứ nhất là", right: (q) => { const s = docSoDoDoan(q); assert.deepEqual(s.rows.map((r) => r.label), ["Số thứ nhất", "Số thứ hai"]); return ghi(tongTi(s.tong, s.rows[0].n, s.rows[1].n)[0]); } },
  { has: "có dạng hình chữ nhật với chu vi 48 cm, chiều rộng bằng 3/5 chiều dài. Tính diện tích tấm bìa đó.", right: () => { const [rg, dai] = tongTi(div(F(48), F(2)), 3, 5); return mul(dai, rg); } },
  { has: "Tổng của hai số là 150. Số bé bằng 2/3 số lớn. Tìm số lớn.", right: () => tongTi(150, 2, 3)[1] },
  { has: "Hai tổ trồng được tất cả 198 cây. Số cây của tổ Một bằng 4/7 số cây của tổ Hai. Tổ Hai trồng được nhiều hơn tổ Một bao nhiêu cây?", right: () => { const [mot, hai] = tongTi(198, 4, 7); return sub(hai, mot); } },
  { has: "Theo sơ đồ dưới đây, số bút chì là ___ chiếc.", right: (q) => { const s = docSoDoDoan(q); assert.deepEqual(s.rows.map((r) => r.label), ["Bút chì", "Bút màu"]); const [t, dv] = s.tong.split(" "); assert.equal(dv, "chiếc"); return tongTi(t, s.rows[0].n, s.rows[1].n)[0]; } },
  { has: "Hai thùng chứa tất cả 99 l dầu. Số dầu ở thùng thứ nhất bằng 2/9 số dầu ở thùng thứ hai. Thùng thứ hai chứa bao nhiêu lít dầu?", right: () => ghi(tongTi(99, 2, 9)[1], "l") },
  { has: "Hai bao gạo cân nặng tất cả 101,5 kg. Bao thứ nhất cân nặng bằng 3/4 bao thứ hai. Hỏi bao thứ hai", right: () => tongTi("101,5", 3, 4)[1] },
  { has: "Tổng số tuổi của bố và con là 42 tuổi. Tuổi con bằng 1/5 tuổi bố. Hỏi 4 năm nữa bố bao nhiêu tuổi?", right: () => ghi(add(tongTi(42, 1, 5)[1], F(4)), "tuổi") },
  /* Tìm hai số khi biết hiệu và tỉ số (Bài 39) */
  { has: "Theo sơ đồ dưới đây, số lớn là bao nhiêu?", right: (q) => { const s = docSoDoDoan(q); assert.deepEqual(s.rows.map((r) => r.label), ["Số bé", "Số lớn"]); return hieuTi(s.hieu, s.rows[0].n, s.rows[1].n)[1]; } },
  { has: "Năm nay ông hơn cháu 56 tuổi, tuổi cháu bằng 1/8 tuổi ông. Hỏi 3 năm nữa ông bao nhiêu tuổi?", right: () => ghi(add(hieuTi(56, 1, 8)[1], F(3)), "tuổi") },
  { has: "Hiệu của hai số là 36. Số bé bằng 5/9 số lớn. Số bé là", right: () => ghi(hieuTi(36, 5, 9)[0]) },
  { has: "Một bức tranh hình chữ nhật có chiều rộng bằng 4/7 chiều dài và ngắn hơn chiều dài 18 cm. Chu vi bức tranh đó là", right: () => { const [rg, dai] = hieuTi(18, 4, 7); return ghi(mul(add(dai, rg), F(2)), "cm"); } },
  { has: "Hiệu của hai số là 44. Số bé bằng 3/7 số lớn. Số lớn là ___.", right: () => hieuTi(44, 3, 7)[1] },
  { has: "Theo sơ đồ dưới đây, thùng B chứa bao nhiêu lít nước?", right: (q) => { const s = docSoDoDoan(q); assert.deepEqual(s.rows.map((r) => r.label), ["Thùng A", "Thùng B"]); const [h, dv] = s.hieu.split(" "); assert.equal(dv, "l"); return ghi(hieuTi(h, s.rows[0].n, s.rows[1].n)[1], "l"); } },
  { has: "Can thứ nhất đựng nhiều hơn can thứ hai 4,5 l nước mắm. Số nước mắm ở can thứ hai bằng 2/5 số nước mắm ở can thứ nhất.", right: () => hieuTi("4,5", 2, 5)[1] },
  { has: "Một trường tiểu học có số học sinh nữ ít hơn số học sinh nam 45 bạn, số học sinh nữ bằng 7/10 số học sinh nam.", right: (q) => {
    const [nu, nam] = hieuTi(45, 7, 10);
    return [eq(soSau(q.o[0], "là"), F(10 - 7)), eq(soSau(q.o[1], "có"), nu), eq(soSau(q.o[2], "có"), nam), eq(soSau(q.o[3], "tất cả"), add(nu, nam))]; } },
  /* Tìm tỉ số phần trăm của hai số (Bài 40) */
  { has: "Tìm tỉ số phần trăm của 33 và 60.", right: () => phanTram(33, 60) },
  { has: "Một cửa hàng nhập về 80 chiếc áo và đã bán được 52 chiếc. Số áo đã bán chiếm bao nhiêu phần trăm số áo nhập về?", right: () => ghi(phanTram(52, 80)) + "%" },
  { has: "Trong 250 g sữa chua có 11 g chất đạm. Tìm tỉ số phần trăm của lượng chất đạm và lượng sữa chua.", right: () => phanTram(11, 250) },
  { has: "Theo kế hoạch, một xưởng mộc phải đóng 250 chiếc ghế. Đến hết thời hạn, xưởng đã đóng được 270 chiếc ghế.", right: () => ghi(sub(phanTram(270, 250), F(100))) + "%" },
  /* Tìm giá trị phần trăm của một số (Bài 41) */
  { has: "35% của 360 là", right: () => ghi(giaTri(360, 35)) },
  { has: "Một chiếc xe đạp có giá 2 400 000 đồng. Nhân dịp khai trương, cửa hàng giảm giá 15%.", right: () => sub(fr("2 400 000"), giaTri(fr("2 400 000"), 15)) },
  { has: "Muốn tìm 15% của 240, ta có thể làm như sau", right: (q) => {
    assert.ok(eq(ev("240 × 15 : 100"), giaTri(240, 15)) && !eq(ev("240 : 15 × 100"), giaTri(240, 15)) && !eq(ev("240 × 100 : 15"), giaTri(240, 15)) && eq(ev("15 : 240 × 100"), phanTram(15, 240)));
    return "Lấy 240 nhân với 15 rồi chia cho 100"; } },
  { has: "Lớp 5B có 40 học sinh, trong đó số học sinh nam chiếm 35% số học sinh cả lớp. Lớp 5B có bao nhiêu học sinh nữ?", right: () => ghi(sub(F(40), giaTri(40, 35)), "bạn") },
  { has: "20% của 85 kg là ___ kg.", right: () => giaTri(85, 20) },
  { has: "Tìm 6% của 2 500 000 đồng.", right: () => giaTri(fr("2 500 000"), 6) },
  { has: "Năm ngoái, một trang trại thu hoạch được 12 500 kg cam. Năm nay trang trại thu hoạch được nhiều hơn năm ngoái 4%.", right: () => add(fr("12 500"), giaTri(fr("12 500"), 4)) },
  { has: "Một mảnh vườn có diện tích 450 m², trong đó 30% diện tích dùng để trồng rau, 20% diện tích dùng để trồng hoa", right: () => ghi(giaTri(450, 100 - 30 - 20), "m²") },
  /* Máy tính cầm tay (Bài 42) */
  { has: "Trên máy tính cầm tay, khi nhập sai một số, ta bấm phím nào để xoá số vừa nhập?", right: (q) => { q.o.forEach((o) => assert.ok(o in PHIM, "lựa chọn là một phím")); return Object.keys(PHIM).find((k) => PHIM[k] === "xoá số vừa nhập"); } },
  { has: "Bạn Hà bấm lần lượt các phím trên máy tính cầm tay như hình dưới đây. Màn hình hiện kết quả là bao nhiêu?", right: (q) => tinhPhim(docPhim(q)) },
  { has: "Để tính tỉ số phần trăm của 18 và 75 bằng máy tính cầm tay, ta bấm lần lượt các phím nào?", right: (q) => {
    const dung_ = `${18} ÷ ${75} % =`; assert.ok(eq(tinhPhim(tachPhim(dung_)), phanTram(18, 75)));
    q.o.slice(1).forEach((o) => { let v = null; try { v = tinhPhim(tachPhim(o)); } catch (e) { v = null; } assert.ok(!v || !eq(v, phanTram(18, 75)), "lựa chọn sai cho cùng kết quả: " + o); });
    return dung_; } },
  { has: "Bạn Tuấn bấm lần lượt các phím như hình dưới đây để tìm tỉ số phần trăm của hai số. Màn hình hiện số ___.", right: (q) => { const k = docPhim(q); assert.ok(k.includes("÷") && k.includes("%"), "dãy phím tìm tỉ số phần trăm"); return tinhPhim(k); } },
  /* Thể tích của một hình (Bài 45) */
  { has: "Người ta dùng các hình lập phương nhỏ như nhau xếp kín (không có chỗ trống) thành hình hộp chữ nhật dưới đây.", right: (q) => { const h = docKhoi(q); assert.equal(h.length, 1); assert.ok(h[0].cot.every((x) => x === h[0].cot[0]), "hình hộp chữ nhật"); return F(h[0].so); } },
  { has: "Hai hình A, B dưới đây gồm các hình lập phương nhỏ bằng nhau, xếp kín, không có chỗ trống. Mỗi ý sau đúng hay sai?", right: (q) => {
    const [A, B] = docKhoi(q); assert.deepEqual([A.ten, B.ten], ["Hình A", "Hình B"]);
    return [A.so === nguyen(soSau(q.o[0], "gồm")), B.so === nguyen(soSau(q.o[1], "gồm")), A.so > B.so, B.so + nguyen(soSau(q.o[3], "thêm")) === A.so]; },
    more: (q) => assert.ok(/thể tích lớn hơn/.test(q.o[2]) && /hai hình có thể tích bằng nhau/.test(q.o[3])) },
  { has: "Hình A và hình B dưới đây gồm các hình lập phương nhỏ như nhau. Câu nào dưới đây đúng?", right: (q) => {
    const [A, B] = docKhoi(q); assert.deepEqual([A.ten, B.ten], ["Hình A", "Hình B"]); assert.deepEqual(q.o.slice().sort(), ["Hình A có thể tích lớn hơn", "Hình B có thể tích lớn hơn", "Thể tích hai hình như nhau"].sort());
    return A.so === B.so ? "Thể tích hai hình như nhau" : A.so > B.so ? "Hình A có thể tích lớn hơn" : "Hình B có thể tích lớn hơn"; } },
  { has: "Hình P gồm 27 hình lập phương nhỏ như nhau. Người ta tách hình P thành hai hình M và N, hình M gồm 8 hình lập phương nhỏ như thế.", right: () => sub(F(27), F(8)) },
  { has: "Bạn Lan đặt một hộp bánh vào trong một thùng giấy và đóng nắp thùng lại được. Như vậy, thể tích hộp bánh bé hơn thể tích thùng giấy.", right: () => true },
  { has: "Bạn Khoa xếp kín các hình lập phương nhỏ như nhau thành hình dưới đây (không có chỗ trống). Hình đó gồm ___ hình lập phương nhỏ.", right: (q) => { const h = docKhoi(q); assert.equal(h.length, 1); return F(h[0].so); } },
  { has: "Bạn Minh có 24 hình lập phương nhỏ như nhau. Minh dùng một số hình đó xếp kín thành hình dưới đây", right: (q) => { const h = docKhoi(q); assert.equal(h.length, 1); return (24 - h[0].so) + " hình"; } },
  { has: "Hình A và hình B có thể tích bằng nhau. Hình A gồm 3 lớp, mỗi lớp có 14 hình lập phương nhỏ. Hình B gồm 2 lớp như nhau", right: () => div(mul(F(3), F(14)), F(2)) },
  /* Xăng-ti-mét khối, đề-xi-mét khối (Bài 46) */
  { has: "4,5 dm³ = ___ cm³", right: () => doi("4,5 dm³", "cm³") },
  { has: "Số đo “sáu trăm linh tám xăng-ti-mét khối” viết là", right: (q) => motLuaChon(q, (o) => docSoDo(o) === "sáu trăm linh tám xăng-ti-mét khối") },
  { has: "Số thích hợp điền vào chỗ chấm: 2 750 cm³ = … dm³", right: () => ghi(doi("2 750 cm³", "dm³")) },
  { has: "Nối mỗi số đo thể tích ở cột trái với số đo bằng nó ở cột phải.", right: (q) => {
    const P = q.r.map(soDV); return q.l.map((l) => { const m = q.r.filter((r, i) => eq(doi(l, P[i][1]), P[i][0])); assert.equal(m.length, 1, "ô " + l + " bằng đúng một ô phải: " + m); return m[0]; }); },
    more: (q) => q.r.slice(q.l.length).forEach((r) => assert.ok(q.l.every((l) => !eq(doi(l, "cm³"), doi(r, "cm³"))), "ô thừa bằng một ô trái")) },
  /* Mét khối (Bài 47) */
  { has: "Số đo “mười bốn phẩy không sáu mét khối” viết là", right: (q) => motLuaChon(q, (o) => { try { return docSoDo(o) === "mười bốn phẩy không sáu mét khối"; } catch (e) { return false; } }) },
  { has: "Một bể chứa 2,4 m³ nước. Người ta đã dùng hết 850 dm³ nước trong bể.", right: () => sub(doi("2,4 m³", "dm³"), F(850)) },
  { has: "7 m³ = ___ dm³", right: () => doi("7 m³", "dm³") },
  { has: "Số đo nào lớn nhất trong các số đo sau: 1,2 m³; 1 250 dm³; 1 205 000 cm³; 1,09 m³?", right: (q) => {
    const s = /sau: (.+)\?$/.exec(q.q)[1].split("; "); assert.deepEqual(s.slice().sort(), q.o.slice().sort(), "lựa chọn là các số đo đã cho");
    return s.reduce((a, b) => (cmp(doi(b, "cm³"), doi(a, "cm³")) > 0 ? b : a)); } },
  { has: "Số đo 302,5 m³ đọc là", right: (q) => { q.o.slice(1).forEach((o) => assert.notEqual(o, docSoDo("302,5 m³"))); return docSoDo("302,5 m³"); } },
  { has: "0,5 m³ = 500 dm³", right: () => eq(doi("0,5 m³", "dm³"), F(500)) },
  { has: "Sắp xếp các số đo sau theo thứ tự từ bé đến lớn.", right: (q) => q.o.slice().sort((a, b) => cmp(doi(a, "cm³"), doi(b, "cm³"))),
    more: (q) => assert.equal(new Set(q.o.map((o) => str(doi(o, "cm³")))).size, q.o.length, "các số đo khác nhau") },
  { has: "Chuyến thứ nhất, xe chở được 2,5 m³ cát. Chuyến thứ hai, xe chở được 1 750 dm³ cát.", right: () => add(doi("2,5 m³", "m³"), doi("1 750 dm³", "m³")) },
  /* Hình khai triển (Bài 49) */
  { has: "Hình khai triển của hình trụ gồm", right: () => "một hình chữ nhật và hai hình tròn" },
  { has: "Bạn An gấp tấm bìa dưới đây thành một hình lập phương. Mặt ghi số 2 nằm đối diện với mặt nào?", right: (q) => { const [t] = docLuoi(q); assert.equal(docLuoi(q).length, 1); return "Mặt ghi số " + t.chu[doiDien(t, t.chu.indexOf("2"))]; } },
  { has: "Tấm bìa nào dưới đây gấp được thành một hình lập phương?", right: (q) => { const ts = docLuoi(q); assert.equal(ts.length, 4); assert.deepEqual(ts.map((t) => t.ten).sort(), q.o.slice().sort(), "lựa chọn là tên các tấm"); return motLuaChon({ o: ts.map((t) => t.ten) }, (n) => gap(ts.find((t) => t.ten === n).o) !== null); } },
  { has: "Khi gấp tấm bìa dưới đây thành hình lập phương, mặt tô màu nằm đối diện với mặt nào?", right: (q) => { const ts = docLuoi(q); assert.equal(ts.length, 1); const t = ts[0]; assert.ok(t.to >= 0 && t.chu[t.to] === "", "ô tô màu không ghi số"); return "Mặt ghi số " + t.chu[doiDien(t, t.to)]; } },
  { has: "Tấm bìa dưới đây gấp được thành một hình hộp chữ nhật.", right: (q) => { const d = docLuoiHop(q); assert.ok(d.a !== d.b && d.b !== d.c && d.a !== d.c, "ba kích thước khác nhau"); return true; } },
  { has: "Tấm bìa dưới đây gấp được thành một hình lập phương.", right: (q) => { const ts = docLuoi(q); assert.equal(ts.length, 1); return gap(ts[0].o) !== null; } },
  { has: "Tấm bìa dưới đây là hình khai triển của một hình lập phương. Gấp lại thì mỗi ý sau đúng hay sai?", right: (q) => {
    const ts = docLuoi(q); assert.equal(ts.length, 1); const t = ts[0];
    return q.o.map((o) => { const m = /^Mặt (\p{Lu}) đối diện với mặt (\p{Lu})\.$/u.exec(o); assert.ok(m, "ý lạ: " + o); return t.chu[doiDien(t, t.chu.indexOf(m[1]))] === m[2]; }); } },
  { has: "Gấp tấm bìa dưới đây thành một hình lập phương thì mặt nào nằm đối diện với mặt ghi số 6?", right: (q) => { const ts = docLuoi(q); assert.equal(ts.length, 1); const t = ts[0]; return "Mặt ghi số " + t.chu[doiDien(t, t.chu.indexOf("6"))]; } },
  /* Diện tích xung quanh, diện tích toàn phần của hình hộp chữ nhật (Bài 50) */
  { has: "Tính diện tích xung quanh của hình hộp chữ nhật dưới đây.", right: (q) => { const h = docHop(q); assert.ok(!h.lapPhuong); assert.equal(q.unit, h.u + "²"); return Sxq(h.dai, h.rong, h.cao); } },
  { has: "Người ta làm một chiếc thùng không có nắp dạng hình hộp chữ nhật bằng tôn, có chiều dài 60 cm, chiều rộng 45 cm và chiều cao 40 cm.", right: () => add(Sxq(60, 45, 40), Sday(60, 45)) },
  { has: "Cho hình hộp chữ nhật như hình dưới đây. Mỗi ý sau đúng hay sai?", right: (q) => {
    const h = docHop(q); assert.ok(!h.lapPhuong);
    return [eq(soSau(q.o[0], "là"), mul(add(h.dai, h.rong), F(2))), eq(soSau(q.o[1], "là"), Sxq(h.dai, h.rong, h.cao)), eq(soSau(q.o[2], "là"), Sday(h.dai, h.rong)), eq(soSau(q.o[3], "là"), Stp(h.dai, h.rong, h.cao))]; },
    more: (q) => assert.ok(/^Chu vi mặt đáy/.test(q.o[0]) && /^Diện tích xung quanh/.test(q.o[1]) && /^Diện tích một mặt đáy/.test(q.o[2]) && /^Diện tích toàn phần/.test(q.o[3])) },
  { has: "Người ta quét sơn các bức tường xung quanh và trần của một căn phòng dạng hình hộp chữ nhật có chiều dài 6 m, chiều rộng 4,5 m, chiều cao 3,5 m. Biết diện tích các cửa là 5,5 m².", right: () => sub(add(Sxq(6, "4,5", "3,5"), Sday(6, "4,5")), fr("5,5")) },
  { has: "Một hình hộp chữ nhật có chu vi mặt đáy là 30 dm và chiều cao là 7 dm. Diện tích xung quanh", right: () => mul(F(30), F(7)) },
  { has: "Một hình hộp chữ nhật có chiều dài 1,2 m, chiều rộng 0,8 m và chiều cao 0,5 m. Diện tích toàn phần", right: () => ghi(Stp("1,2", "0,8", "0,5"), "m²") },
  { has: "Một hộp quà dạng hình hộp chữ nhật có chiều dài 24 cm, chiều rộng 16 cm và chiều cao 9 cm. Người ta dán giấy màu kín tất cả các mặt của hộp.", right: () => Stp(24, 16, 9) },
  { has: "Một hình hộp chữ nhật có diện tích xung quanh là 520 cm², chiều dài 12 cm và chiều rộng 8 cm. Chiều cao", right: () => ghi(div(F(520), mul(add(F(12), F(8)), F(2))), "cm") },
  /* Diện tích xung quanh, diện tích toàn phần của hình lập phương (Bài 51) */
  { has: "Tính diện tích xung quanh của hình lập phương dưới đây.", right: (q) => { const h = docHop(q); assert.ok(h.lapPhuong); assert.equal(q.unit, h.u + "²"); return mul(mul(h.dai, h.dai), F(4)); } },
  { has: "Một hình lập phương có cạnh 7 dm. Diện tích toàn phần của hình lập phương đó là ___ dm².", right: () => mul(mul(F(7), F(7)), F(6)) },
  { has: "Một hình lập phương có diện tích một mặt là 64 cm². Diện tích toàn phần", right: () => mul(F(64), F(6)) },
  { has: "Bạn Ngọc tính diện tích xung quanh của một hình lập phương có cạnh 8 cm. Phép tính nào dưới đây đúng?", right: (q) => motLuaChon(q, (o) => eq(ev(o), mul(mul(F(8), F(8)), F(4)))) },
  /* Thể tích của hình hộp chữ nhật (Bài 52) */
  { has: "Hình hộp chữ nhật có chiều dài 11 cm, chiều rộng 6 cm và chiều cao 3 cm thì có thể tích là ___ cm³.", right: () => V(11, 6, 3) },
  { has: "Một bể nước dạng hình hộp chữ nhật có chiều dài 2 m, chiều rộng 1,5 m và chiều cao 1,2 m. Hỏi khi đầy nước, bể chứa được bao nhiêu lít nước?", right: () => doi(ghi(V(2, "1,5", "1,2"), "m³"), "l") },
  { has: "Tính thể tích của hình hộp chữ nhật dưới đây.", right: (q) => { const h = docHop(q); assert.ok(!h.lapPhuong); return ghi(V(h.dai, h.rong, h.cao), h.u + "³"); } },
  { has: "Một bể kính dạng hình hộp chữ nhật có đáy dài 50 cm, rộng 30 cm, đang chứa nước. Bạn Nam thả chìm hoàn toàn một quả cầu sắt vào bể thì mực nước dâng lên thêm 2,5 cm", right: () => ghi(V(50, 30, "2,5"), "cm³") },
  { has: "Hình hộp chữ nhật dưới đây có thể tích bằng bao nhiêu xăng-ti-mét khối?", right: (q) => { const h = docHop(q); assert.ok(!h.lapPhuong); assert.equal(h.u, "cm"); return V(h.dai, h.rong, h.cao); } },
  { has: "Một hộp sữa dạng hình hộp chữ nhật dài 6 cm, rộng 4 cm, cao 10 cm. Hộp sữa đó có thể tích là", right: () => ghi(V(6, 4, 10), "cm³") },
  { has: "Một thùng hàng dạng hình hộp chữ nhật có chiều dài 10 dm, chiều rộng 8 dm và chiều cao 6 dm. Người ta xếp vào thùng các hộp bánh dạng hình lập phương cạnh 2 dm.", right: () => F([10, 8, 6].map((x) => nguyen(div(F(x), F(2)))).reduce((a, b) => a * b, 1)) },
  { has: "Thùng xe của một chiếc xe chở đất có dạng hình hộp chữ nhật với chiều dài 3,2 m, chiều rộng 2 m, chiều cao 0,5 m. Mỗi chuyến xe chở đầy thùng. Hỏi sau 3 chuyến", right: () => ghi(mul(V("3,2", 2, "0,5"), F(3)), "m³") },
  /* Thể tích của hình lập phương (Bài 53) */
  { has: "Bạn Mai có một chiếc hộp dạng hình lập phương cạnh 3 dm. Mai muốn xếp đầy hộp bằng các khối nhựa dạng hình lập phương cạnh 5 cm.", right: () => { const n_ = nguyen(div(doi("3 dm", "cm"), F(5))); return F(n_ * n_ * n_); } },
  { has: "Hình lập phương A có cạnh 5 cm. Hình lập phương B có cạnh gấp 2 lần cạnh của hình lập phương A. Thể tích hình lập phương B gấp mấy lần", right: () => nguyen(div(V(10, 10, 10), V(5, 5, 5))) + " lần" },
  { has: "Một thùng tôn dạng hình lập phương cạnh 0,8 m đang chứa đầy nước. Người ta đã dùng 112 l nước trong thùng.", right: () => sub(doi(ghi(V("0,8", "0,8", "0,8"), "m³"), "l"), F(112)) },
  { has: "Một hình lập phương có diện tích toàn phần là 726 cm². Thể tích của hình lập phương đó là", right: () => { const mat = div(F(726), F(6)), a = Math.round(Math.sqrt(toNum(mat))); assert.ok(eq(F(a * a), mat), "diện tích một mặt là số chính phương"); return ghi(V(a, a, a), "cm³"); } },
];

/* ---------- chạy kiểm tra: mỗi câu khớp đúng một mục của CHECKS (mục có chữ has dài nhất nằm trong đề bài) ---------- */
let n = 0;
const dung = new Set();
const run = (id, qs) => qs.forEach((q, i) => {
  const at = id + "#" + (i + 1), cs_ = CHECKS.filter((c) => q.q.includes(c.has)), dai = Math.max(...cs_.map((c) => c.has.length)), ch = cs_.filter((c) => c.has.length === dai);
  assert.equal(ch.length, 1, at + ": cần đúng một mục kiểm tra cho “" + q.q.slice(0, 60) + "…”, có " + ch.length);
  const c = ch[0]; assert.ok(!dung.has(c.has), at + ": hai câu cùng khớp “" + c.has + "”"); dung.add(c.has);
  try {
    const want = c.right(q);
    if (q.type === "num") {
      assert.ok(want && typeof want === "object" && "n" in want, "right của câu trả lời bằng số trả số hữu tỉ");
      assert.ok(typeof q.ans === "number" && Math.abs(q.ans - toNum(want)) < 1e-9, "đáp án " + q.ans + ", tính được " + fmtDec(want));
      assert.ok(q.tol === undefined, "đáp án tính chính xác, không cần sai số");
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
    }
    if (q.type === "match") { assert.equal(new Set(q.r).size, q.r.length, "ô nối trùng nhau"); assert.ok(q.r.length > q.l.length, "nối cột có ô thừa"); }
    if (q.type === "tf4") assert.ok(q.a.includes(true) && q.a.includes(false), "đúng/sai 4 ý nên có cả ý đúng và ý sai");
    if (c.more) c.more(q);
  } catch (e) { throw new Error(at + ": " + e.message + "\n" + String(e.stack || "").split("\n").slice(1, 3).join("\n")); }
  n++;
});
// số đề, số câu lấy từ danh mục: đề cố định là các đề trong from của đề ngẫu nhiên, mọi đề cố định giữa kì II của file đều ở đó
const pool = bank(POOL), DE = pool.pool.from, mine = pool.questions.filter((q) => q.src === POOL);
assert.deepEqual(BANKS.filter((b) => b.file === "5-toan.js" && /^toan5-gk2-de\d+$/.test(b.id)).map((b) => b.id), DE, "đề cố định giữa kì II nào cũng phải ở from của " + POOL);
for (const id of DE) { const b = bank(id); assert.ok(b, "thiếu " + id); assert.equal(b.questions.length, b.n); run(id, b.questions); }
run(POOL, mine);
assert.equal(dung.size, CHECKS.length, "có mục kiểm tra không khớp câu nào: " + CHECKS.filter((c) => !dung.has(c.has)).map((c) => c.has).join(" | "));
// hình nào cũng được đọc lại; chữ trong hình vừa khung, không đè nhau
const hinh = pool.questions.filter((q) => q.svg);
assert.equal(hinh.filter((q) => hinhDaDoc.has(q.svg)).length, hinh.length, "hình nào cũng được đọc lại");
hinh.forEach((q) => chuHinh(q.svg, q.q.slice(0, 40)));

/* ---------- chữ, số như sách (Toán 5 tập hai in năm 2026) ---------- */
const kho = pool.questions;
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null || typeof q.ans === "number" ? [] : [].concat(q.ans), q.l || [], q.r || []).map(String);
kho.forEach((q) => {
  const at = q.src + ": " + q.q.slice(0, 50), T = chu(q).concat(q.svg ? TEXTS(q.svg).map((t) => t.t) : []);
  T.forEach((s) => {
    assert.ok(!/\d\.\d/.test(s), at + ": số thập phân viết dấu phẩy, không dấu chấm: " + s);
    assert.ok(!/(^|[\s(])[−-]\d/.test(s), at + ": không có số âm (lớp 5 chưa học): " + s);
    assert.ok(!/\b\d{4,}\b/.test(s.replace(/\d+\/\d+/g, "").replace(/,\d+/g, "")), at + ": số từ bốn chữ số ngăn hàng nghìn bằng khoảng trắng: " + s);
    assert.ok(!/\d:\d|\d :\d/.test(s), at + ": tỉ số, tỉ lệ viết “a : b” có khoảng trắng hai bên: " + s);
    assert.ok(!/\d %(?! =)/.test(s), at + ": tỉ số phần trăm viết liền kí hiệu % (trừ dãy phím “… % =”): " + s);
    assert.ok(!/\b[cdm]?m3\b|\b[cdm]?m2\b/.test(s), at + ": đơn vị viết m³, m² như sách: " + s);
    assert.ok(!/dam²|hm²|dam³|hm³/.test(s), at + ": sách in năm 2026 không dạy dam², hm², dam³, hm³: " + s);
    assert.ok(!/÷/.test(s) || q.topic === "Máy tính cầm tay", at + ": dấu ÷ chỉ dùng cho phím máy tính cầm tay, phép chia viết dấu “:”: " + s);
  });
  // đề không ghi sẵn công thức (câu hỏi chính là công thức đó)
  assert.ok(!/× 4\b|× 6\b|nhân với chiều cao|nhân với 4\b|nhân với 6\b|chia cho 100/.test(q.q) || /Muốn tìm/.test(q.q), at + ": đề ghi sẵn công thức");
  // đổi giữa lít và đơn vị đo thể tích chỉ khi đề ghi 1 l = 1 dm³ (câu có hình hộp, hình lập phương và hỏi, cho số đo bằng lít)
  if (/hình hộp chữ nhật|hình lập phương/.test(q.q) && /\d l(?!\p{L})|lít/u.test(q.q)) assert.ok(/1 l = 1 dm³|1 dm³ = 1 l/.test(q.q), at + ": đề cần ghi 1 l = 1 dm³");
});

/* ---------- mức độ và ma trận ---------- */
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M);
assert.deepEqual(Object.keys(M), CHU_DE, "ma trận đúng 15 chủ đề của CHU_DE, đúng thứ tự");
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => cells.reduce((s, v) => s + v[k], 0)), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
const nhomCD = (ts) => ts.reduce((s, t) => s + M[t].reduce((a, b) => a + b, 0), 0);
assert.deepEqual([nhomCD(CHU_DE.slice(0, 7)), nhomCD(CHU_DE.slice(7, 10)), nhomCD(CHU_DE.slice(10))], [12, 5, 8],
  "Chủ đề 7 (tỉ số và các bài toán liên quan) 12 câu, Chủ đề 8 (thể tích, đơn vị đo thể tích) 5, Chủ đề 9 (diện tích, thể tích của hình khối) 8");
CHU_DE.forEach((t) => assert.ok(("chu-de:5:toan:" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
assert.deepEqual([...new Set(kho.map((q) => q.topic))].sort(), CHU_DE.slice().sort(), "chủ đề của kho đúng chữ của ma trận");
// chủ đề của giữa kì II không trùng chữ chủ đề của đề Toán 5 khác (đề “Ôn chủ đề” gộp câu cùng chữ chủ đề của mọi đề lớp 5)
{ const khac = new Set(BANKS.filter((b) => b.file === "5-toan.js" && !DE.concat(POOL).includes(b.id)).flatMap((b) => b.questions.map((q) => q.topic)));
  CHU_DE.forEach((t) => assert.ok(!khac.has(t), "chủ đề trùng chữ với đề Toán 5 khác: " + t)); }
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
assert.ok(hinh.length >= 15, "kho có ít nhất 15 câu có hình");
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
const seen = new Set();
const thu = (hist) => {
  const d = Quiz.draw(pool, hist);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, pool.n);
  assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.lv === l).length), [10, 8, 7]);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.topic === t && q.lv === l).length), v, "rút đúng ma trận ở chủ đề " + t));
  return d;
};
for (let k = 0; k < 400; k++) thu().questions.forEach((q) => seen.add(Quiz.key(q)));
assert.ok(mine.every((q) => seen.has(Quiz.key(q))), "400 lần rút thử phải gặp đủ các câu riêng");
// học sinh đã làm hết một đề cố định: lần rút sau không lấy lại câu của đề đó
DE.forEach((id) => { const done = new Set(bank(id).questions.map(Quiz.key)); for (let k = 0; k < 20; k++) thu((q) => ({ done: done.has(Quiz.key(q)) ? 1 : 0, wrong: 0 })).questions.forEach((q) => assert.ok(!done.has(Quiz.key(q)), "đã làm hết " + id + " mà vẫn gặp lại câu của đề đó")); });

/* ---------- đề bài không trùng câu nào khác trong data/banks/5-toan.js (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const deBai = BANKS.filter((b) => b.file === "5-toan.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: gocChu(q.q) })));
deBai.forEach((d) => { const cungDe = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cungDe, [d.at], "đề bài trùng: " + cungDe.join(", ")); });

/* ---------- dò lộ đáp án (Rút ra N5, N24, N8, RS9; như tests/toan5-ck1.js) giữa mọi cặp câu của kho: đề “Ôn chủ đề” rút chung mọi câu của
   một chủ đề (cả hai câu cùng ô), đề ngẫu nhiên rút chung câu của các chủ đề khác; lời dặn (note) hiện ở màn mở đề nên cũng là “câu
   kia”. Đáp án là số (từ 10; cả tỉ số phần trăm “65%”), số thập phân, phân số chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”,
   “bằng”, “được”; số đứng ngay trước một phép tính là thừa số, số hạng; khác tests/toan5-ck1.js: số đứng trước “%” vẫn tính, vì đáp án
   của kho này hay là tỉ số phần trăm); cặp nối: câu kia có cả hai vế; đáp án bằng chữ có ở câu kia thì chỉ in ra khi chạy với DO_LO=1
   để người làm xem, danh sách đã xem ghi ở DA_XEM. ---------- */
const val = (s) => +String(s).replace(/\s/g, "");
const KQ = "(?:=|(?:^|[\\s(])(?:là|bằng|được))\\s+";
const SAU = "(?!\\d|,\\d|\\/|°|\\s*[·+−×:÷](?:\\s|\\d|\\())"; // số đứng ngay trước một phép tính là thừa số, số hạng
const soKQ = (s) => [...String(s).matchAll(new RegExp(KQ + "(\\d{1,3}(?: \\d{3})*)" + SAU, "gu"))].map((m) => val(m[1]));
const kqLa = (s, a) => new RegExp(KQ + a.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + SAU, "u").test(s);
const ten = new Map();
DE.forEach((id) => bank(id).questions.forEach((q, i) => ten.set(q.q, id.replace("toan5-gk2-", "") + "#" + (i + 1))));
mine.forEach((q, i) => ten.set(q.q, "own#" + (i + 1)));
const LOI_DAN = [...new Set(DE.concat(POOL).map((id) => bank(id).note))].map((note, i) => ({ q: note, x: "", note: true, ten: "note" + (i + 1) }));
// cụm có trong chữ, đứng riêng (không là phần cuối của số khác: “5 000 cm³” không có trong “925 000 cm³”)
const coCum = (t, s) => new RegExp("(?<![\\p{L}\\p{N},])" + s.toLowerCase().replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + "(?![\\p{L}\\p{N}])", "u").test(t);
const doLo = (qs, name, notes) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    const so = [], kq = [], cum = [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const them = (a) => { a = String(a).replace(/%$/, "");
      const m = /^(\d{1,3}(?: \d{3})*)(?: (\S+))?$/.exec(a);
      if (m && !/^\d\/\d/.test(m[2] || "")) so.push(val(m[1]));
      else if (/^\d[\d ,/]*(?: [^\d\s]+)?$/.test(a)) kq.push(a.replace(/ [^\d\s]+$/, ""));
      else if (a.length >= 2) cum.push(a); };
    if (q.type === "num") them(fmtDec(F(Math.round(q.ans * 1000), 1000)));
    else if (q.type === "fill") them(q.ans[0]); else if (q.type === "mc") them(q.o[0]);
    qs.concat(notes || []).forEach((p) => {
      if (p === q) return;
      const C = p.note ? [p.q] : chu(p).concat(p.svg ? TEXTS(p.svg).map((t) => t.t) : []), T = C.map((s) => s.toLowerCase()), at = `${name(p)} lộ đáp án ${name(q)}: `;
      so.filter((x) => x >= 10 && C.flatMap(soKQ).includes(x)).forEach((x) => lo.push(at + x));
      kq.filter((a) => C.some((s) => kqLa(s, a))).forEach((a) => lo.push(at + a));
      cap.filter(([l, r]) => T.some((t) => coCum(t, l) && coCum(t, r))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      cum.filter((s) => { const re = new RegExp("(?<![\\p{L}\\p{N}])" + s.toLowerCase().replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + "(?![\\p{L}\\p{N}])", "u"); return T.some((t) => re.test(t)); }).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const tenCau = (q) => (q.note ? q.ten : ten.get(q.q));
const { lo: loDA, chuLo } = doLo(kho, tenCau, LOI_DAN);
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu khác của kho (xem tay):\n" + chuLo.join("\n"));
// đã xem: ba câu mặt đối diện của ba tấm bìa khác nhau cùng có lựa chọn “Mặt ghi số …”; lựa chọn của câu này không cho biết đáp án của câu kia
const DA_XEM = [
  "de1#19 lộ đáp án own#38: Mặt ghi số 2", "de2#19 lộ đáp án own#38: Mặt ghi số 2", "own#38 lộ đáp án de1#19: Mặt ghi số 5",
  "de2#19 lộ đáp án de1#19: Mặt ghi số 5", "own#38 lộ đáp án de2#19: Mặt ghi số 4", "de1#19 lộ đáp án de2#19: Mặt ghi số 4",
];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu khác của kho đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loDA, [], "lộ đáp án:\n" + loDA.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “bằng 4 500 cm³”, “là 55%”, “= 2,75”, cả hai vế một cặp nối
{ const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const khac = tim("Hình khai triển của hình trụ gồm"), thuLo = (qs) => doLo(qs, (q) => q.q.slice(0, 10).replace(/:/g, "")).lo.map((s) => s.replace(/^.*? lộ đáp án [^:]*: /, ""));
  assert.deepEqual(thuLo([tim("4,5 dm³ = ___ cm³"), gia(khac, "Ví dụ: thể tích bằng 4 500 cm³.")]), [4500]);
  assert.deepEqual(thuLo([tim("Tìm tỉ số phần trăm của 33 và 60."), gia(khac, "Tỉ số đó là 55%.")]), [55]);
  assert.deepEqual(thuLo([tim("Số thích hợp điền vào chỗ chấm: 2 750 cm³"), gia(khac, "Ví dụ 2 750 cm³ = 2,75 dm³.")]), ["2,75"]);
  assert.deepEqual(thuLo([tim("Nối mỗi tỉ số ở cột trái"), gia(khac, "Ví dụ 3 : 4 thành 75%.")]), ["3 : 4 → 75%"]);
  assert.deepEqual(thuLo([tim("Tìm tỉ số phần trăm của 33 và 60."), gia(khac, "Ví dụ 55 × 2 = 110.")]), []); }
// bộ đọc hình bắt được hình vẽ sai: số đo không đúng tỉ lệ, sơ đồ có phần không bằng nhau, hình xếp không khớp, tấm bìa không gấp được
{ const tim = (has) => CHECKS.find((c) => c.has === has), cau = (has) => kho.find((q) => q.q.includes(has)), sua = (q, a, b) => { assert.ok(q.svg.includes(a), "thử: không thấy “" + a + "”"); return Object.assign({}, q, { svg: q.svg.replace(a, b) }); };
  const hop = cau("Tính diện tích xung quanh của hình hộp chữ nhật dưới đây."), sd = cau("Theo sơ đồ dưới đây, số thứ nhất là"), kh = cau("Bạn Khoa xếp kín"), lu = cau("Bạn An gấp tấm bìa");
  assert.throws(() => tim("Tính diện tích xung quanh của hình hộp chữ nhật dưới đây.").right(sua(hop, ">9 cm<", ">10 cm<")), /đúng tỉ lệ/);
  assert.throws(() => tim("Tính diện tích xung quanh của hình hộp chữ nhật dưới đây.").right(sua(hop, ' stroke-dasharray="5 4"', "")), /nét đứt|nét liền/);
  const vach = [...sd.svg.matchAll(/<line x1="([\d.]+)" y1="31" x2="\1" y2="45" stroke="ink" stroke-width="1.5"\/>/g)][1][0], x_ = +/x1="([\d.]+)"/.exec(vach)[1]; // vạch thứ hai của hàng trên
  assert.throws(() => tim("Theo sơ đồ dưới đây, số thứ nhất là").right(sua(sd, vach, vach.split(`"${x_}"`).join(`"${x_ - 6}"`))), /bằng nhau/);
  const mat = /<polygon points="[^"]+" fill="sun-soft"[^>]*>/.exec(kh.svg)[0];
  assert.throws(() => tim("Bạn Khoa xếp kín các hình lập phương nhỏ như nhau thành hình dưới đây (không có chỗ trống). Hình đó gồm ___ hình lập phương nhỏ.").right(sua(kh, mat, "")), /khớp|vị trí/);
  const o6 = /<rect x="([\d.]+)" y="([\d.]+)"[^>]*>(?=<text[^>]*>6<)/.exec(lu.svg);
  assert.throws(() => tim("Bạn An gấp tấm bìa dưới đây thành một hình lập phương. Mặt ghi số 2 nằm đối diện với mặt nào?").right(sua(lu, `<rect x="${o6[1]}" y="${o6[2]}"`, `<rect x="${o6[1]}" y="${+o6[2] - 36}"`)), /lưới|gấp|chung|chữ/);
  assert.throws(() => chuHinh(hop.svg.replace(/<text /, '<text font-size="12" '), "thử"), /cỡ 13/);
  // gấp hình khai triển: hai tấm quen thuộc gấp được, tấm 2 × 3 và tấm có 4 ô hàng trên cùng hai ô dưới hai đầu không gấp được
  assert.ok(gap([[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]]) && gap([[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]]));
  assert.ok(!gap([[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]]) && !gap([[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [3, 1]]));
  assert.equal(doiDien({ o: [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]] }, 0), 5, "hình chữ thập: ô trên đối diện ô dưới");
  assert.equal(doiDien({ o: [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]] }, 1), 3, "hình chữ thập: hai ô cách một ô ở hàng giữa đối diện nhau"); }

/* ---------- không gần trùng câu của kho Toán lớp 4 và kho Toán 5 cuối kì I (lời giao việc; Rút ra N25, như tests/toan5-ck1.js): đề bài cùng
   lựa chọn, ô nối, ô sắp xếp có từ 4 cặp từ liền nhau chung với một câu của data/banks/4-toan.js hay của đề Toán 5 cuối kì I và số cặp
   chung từ một nửa số cặp của câu ít cặp hơn thì báo. Cặp từ tính cả số; bỏ cách hỏi chung của đề Toán (CUM), cặp của nhãn chủ đề và cặp
   có ở từ 3% số câu đem so. ---------- */
const CUM = ["tính bằng cách thuận tiện", "nối mỗi số đo thể tích ở cột trái với số đo bằng nó ở cột phải", "nối mỗi tỉ số ở cột trái với tỉ số phần trăm bằng nó ở cột phải",
  "theo thứ tự từ bé đến lớn", "theo thứ tự từ lớn đến bé", "sắp xếp các số đo sau", "số thích hợp điền vào chỗ chấm", "có bao nhiêu", "hết bao nhiêu tiền", "phần bằng nhau",
  "mỗi ý sau đúng hay sai", "như hình dưới đây", "như thế", "lớn hơn", "bé hơn", "dưới đây", "hình lập phương nhỏ", "hình hộp chữ nhật", "hình lập phương", "tấm bìa",
  "diện tích xung quanh", "diện tích toàn phần", "thể tích", "chiều dài", "chiều rộng", "chiều cao", "tỉ số phần trăm", "tỉ số của", "trên bản đồ tỉ lệ", "máy tính cầm tay"];
{
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/(\d),(?=\d)/g, "$1_").replace(/[^\p{L}\p{N}\s|_]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|") && c.split(" ").some((x) => x.length >= 2)); };
  const cauCua = (f) => BANKS.filter(f).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id));
  const so = cauCua((b) => b.file === "4-toan.js").concat(cauCua((b) => b.file === "5-toan.js" && /^toan5-ck1-/.test(b.id))), ca = so.concat(kho), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !nhan.has(c) && (df[c] || 0) < 0.03 * ca.length)); };
  const PS = so.map((p) => [p, capAm(p)]);
  const ganTrung = kho.flatMap((q) => { const c = capAm(q); return PS.map(([p, d]) => { const chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q.q)} ~ ${p.q.slice(0, 50)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho Toán 4, Toán 5 cuối kì I:\n" + ganTrung.join("\n"));
  assert.deepEqual(ganTrung, [], "đề bài gần trùng câu của kho Toán 4 hay Toán 5 cuối kì I");
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (bỏ dấu, gộp nguyên âm), nếu có ----------
   Chuỗi 8 từ liền nhau của mọi trường chữ (đề bài, lựa chọn, lời giải, chữ trong hình) không có trong sách; cụm từ chung của môn (tên bài,
   tên chủ đề, cách hỏi chuẩn) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ. Số liệu: số riêng của một câu (số thập
   phân, số từ 11 trở lên, trừ 100, 1 000, 10 000; không tính số trong phân số) không có từ ba số cùng ở một trang của Toán 5 tập hai (dò bối
   cảnh, số liệu của bài tập, ví dụ trong sách; DO_SACH=1 in các trang có từ hai số chung để xem). */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
// tra nhanh chuỗi k từ (như tests/toan5-ck1.js): băm mọi chuỗi k từ của chữ đã chuẩn hoá, chỉ so thật (includes) khi băm có
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
const TU_CHUNG = [...CHU_DE, "mỗi ý sau đúng hay sai", "số thích hợp điền vào chỗ chấm", "viết số thích hợp vào chỗ trống", "theo thứ tự từ bé đến lớn",
  "các hình lập phương nhỏ như nhau", "hình lập phương nhỏ", "hình lập phương", "hình hộp chữ nhật", "xếp kín, không có chỗ trống", "không có chỗ trống",
  "hình khai triển của hình lập phương", "gấp được thành một hình lập phương", "tấm bìa dưới đây", "đối diện với mặt", "mặt ghi số", "mặt tô màu",
  "diện tích xung quanh", "diện tích toàn phần", "diện tích một mặt", "diện tích hai đáy", "diện tích mặt đáy", "chu vi mặt đáy", "chiều dài", "chiều rộng",
  "chiều cao", "thể tích", "xăng-ti-mét khối", "đề-xi-mét khối", "mét khối", "tỉ số phần trăm", "tỉ lệ bản đồ", "trên bản đồ tỉ lệ", "trên thực tế",
  "tổng số phần bằng nhau", "hiệu số phần bằng nhau", "giá trị một phần", "theo sơ đồ dưới đây", "máy tính cầm tay", "bấm lần lượt các phím", "màn hình hiện",
  "ở cột trái với", "ở cột phải", "bao nhiêu xăng-ti-mét", "bao nhiêu lít nước", "1 l = 1 dm³", "1 dm³ = 1 l", "1 000 cm³", "1 000 dm³", "như hình dưới đây"]
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const chuCau = (q) => chu(q).concat(q.svg ? [TEXTS(q.svg).map((t) => t.t).join(" ")] : []);
// số liệu của đề: đề bài, chữ trong hình, ô nối, ô sắp xếp (không tính lựa chọn của câu nhiều lựa chọn, đúng/sai 4 ý: kết quả tính từ số liệu
// của đề, và lời giải)
const deCau = (q) => [q.q].concat(q.type === "order" ? q.o : [], q.l || [], q.r || [], q.svg ? TEXTS(q.svg).map((t) => t.t) : []).map(String);
if (SACH.length) {
  assert.ok(SACH.some((f) => /toan-5-tap-2/.test(f)), "OnUp-Book có Toán 5 tập hai");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => chuCau(q).flatMap((s) => chuoi(s, k).filter((c) => traChu.co(sach, c)).map((c) => `${ten.get(q.q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  // số liệu riêng của từng câu so với từng trang của Toán 5 tập hai
  const trang = fs.readFileSync(SACH.find((f) => /toan-5-tap-2/.test(f)), "utf8").split(/(?==== page-\d+ · )/).filter((p) => !/MỤC LỤC/.test(p)).map((p) => ({ ten: (/trang in (\d+)/.exec(p) || [])[1], so: new Set((p.match(/\d+(?:[ .]\d{3})*(?:,\d+)?/g) || []).map((x) => x.replace(/[ .](?=\d{3})/g, ""))) }));
  const soRieng = (q) => [...new Set((deCau(q).join(" ").replace(/\d+\/\d+/g, " ").match(/\d{1,3}(?: \d{3})+(?:,\d+)?|\d+(?:,\d+)?/g) || []).map((x) => x.replace(/ /g, "")).filter((x) => /,/.test(x) || (+x > 10 && ![100, 1000, 10000].includes(+x))))];
  const soChung = kho.flatMap((q) => { const s = soRieng(q); return trang.map((p) => [p.ten, s.filter((x) => p.so.has(x))]).filter(([, c]) => c.length >= 2).map(([t, c]) => `${ten.get(q.q)} ~ trang ${t}: ${c.join("; ")} (câu có ${s.length} số)`); });
  if (process.env.DO_SACH) console.log("Trang sách có từ hai số liệu chung với một câu (xem tay):\n" + soChung.join("\n"));
  // đã xem tay (Phiên N5-gk2-toan): số chung là số tròn của bài khác hẳn: trang 14 (36 chiếc ti vi 75 inch, mảnh đất rộng thêm 20 m), trang 69
  // và 130 (cộng, trừ số đo thời gian; ôn tập phép tính), trang 93 (biểu đồ hình quạt: 40 học sinh mượn sách, 45%, 60%)
  const SO_XEM = ["own#4 ~ trang 14: 75; 20; 36 (câu có 5 số)", "own#4 ~ trang 69: 25; 20; 70 (câu có 5 số)", "own#4 ~ trang 130: 25; 75; 36 (câu có 5 số)",
    "de1#21 ~ trang 93: 60; 45; 40 (câu có 3 số)"];
  assert.deepEqual(soChung.filter((s) => /: (.+) \(/.exec(s)[1].split("; ").length >= 3 && !SO_XEM.includes(s)), [], "trang sách có từ ba số liệu chung với một câu");
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
