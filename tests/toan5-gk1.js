// Tính lại đáp án ngân hàng Toán 5 giữa kì I (data/banks/5-toan.js): hai đề cố định toan5-gk1-de1, toan5-gk1-de2 và các câu riêng
// của đề ngẫu nhiên toan5-gk1-ngau-nhien (Phiên N5-gk1-toan; Toán 5 tập một, Bài 1–18). Mỗi câu khớp đúng một mục của CHECKS (chữ has
// nằm trong đề bài) rồi so đáp án với kết quả tính bằng code: trắc nghiệm o[0], điền khuyết ans[0] (số so theo giá trị, phân số và chữ
// so chữ), đúng/sai a, đúng/sai 4 ý a (từng ý tính lại), trả lời bằng số ans, nối cột r của từng ô l, sắp xếp o. Phân số, số thập
// phân tính bằng số hữu tỉ chính xác; số tự nhiên: cấu tạo số theo hàng và lớp, giá trị của chữ số, số chẵn, số lẻ, làm tròn đến một
// hàng (chữ số ngay sau hàng làm tròn từ 5 trở lên thì làm tròn lên), thứ tự thực hiện phép tính, trung bình cộng, tổng – hiệu, phép
// chia có dư; phân số tối giản, quy đồng mẫu số, so sánh phân số, phép tính với phân số (cộng, trừ ở Bài 5 chỉ khi hai mẫu số bằng nhau
// hay mẫu số này chia hết cho mẫu số kia; ở Bài 6 khi không mẫu số nào chia hết cho mẫu số kia), phân số thập phân, hỗn số (chỉ đổi
// qua lại với phân số thập phân), đọc số thập phân, hàng của số thập phân, so sánh, làm tròn số thập phân (đến số tự nhiên gần nhất,
// hàng phần mười, hàng phần trăm), đổi đơn vị đo độ dài, khối lượng, dung tích, thời gian, diện tích (1 ha = 10 000 m², 1 km² = 100 ha).
// Câu có hình: đọc lại tia số (số ở hai vạch đầu cuối, số phần bằng nhau, điểm ở đúng một vạch), hình chia phần tô màu (các phần bằng
// nhau, đếm phần tô màu), hình tứ giác (cặp cạnh song song), góc (đo góc từ toạ độ: nhọn, vuông, tù, bẹt), hình vuông, hình chữ nhật
// (số đo ghi trong hình thuộc cạnh gần nó nhất, đúng tỉ lệ, khớp đề), bảng đơn vị đo diện tích (thứ tự từ lớn đến bé, ô còn thiếu);
// chữ trong hình cỡ từ 13, nằm trọn trong khung, không đè nhau; phần tô của hình chia phần fill="acc" fill-opacity="0.6" (L51).
// Rồi kiểm tra như tests/toan5-ck1.js: ma trận (mỗi ô rút 1 câu và có 4
// câu: một câu ở mỗi đề cố định, hai câu riêng; Chủ đề 1 13 câu, Chủ đề 2 9, Chủ đề 3 3; rút thử ra đúng 10 Biết, 8 Hiểu, 7 Vận dụng;
// đã làm hết một đề cố định thì không gặp lại câu của đề đó), chữ chủ đề của bài đã có ở kho cuối kì I đúng chữ của kho đó, chủ đề ôn
// tập mới không có ở đề Toán 5 khác, đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một
// phần ba số câu nhiều lựa chọn, không lặp chữ của nhãn chủ đề, đúng/sai 4 ý không lặp kiểu Đ/S, không có số âm, số thập phân viết dấu
// phẩy, chưa có phép tính với số thập phân (Chủ đề 4), không có đơn vị dam², hm², đề bài không trùng câu nào trong data/banks/5-toan.js,
// không gần trùng câu của data/banks/4-toan.js (cặp hai âm tiết chung), dò lộ đáp án giữa mọi cặp câu của kho và lời dặn của đề (Rút ra
// N5, N24, N8, RS9); với kho cuối kì I (đề “Ôn chủ đề” rút chung câu cùng chủ đề, như tests/toan9-gk1.js): đáp án không trùng câu cùng
// chủ đề, đề bài không gần trùng câu cùng chủ đề, dò lộ đáp án giữa câu cùng chủ đề của hai kho; nếu có ../OnUp-Book, so mọi trường chữ
// với chữ OCR của mọi cuốn (không chuỗi 8 từ nào trùng), so số liệu của đề với từng trang Toán 5 tập một (không trang nào có từ ba số
// liệu riêng của một câu) và so với câu của mọi kho khác, cả các đề Toán 5 khác (không chuỗi 8 từ nào trùng). Số đề, số câu lấy từ danh
// mục.
// Chạy: node tests/toan5-gk1.js → in MATH OK. DO_LO=1 in đáp án bằng chữ có ở câu khác của kho và ở câu cùng chủ đề của kho cuối kì I;
// DO_SACH=1 in chuỗi 6 từ trùng sách và các trang có số liệu chung; DO_KHO=1 in chuỗi 6 từ trùng kho khác (để người làm xem).
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan5-gk1-ngau-nhien";

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
// đọc số viết như trong đề: "3,75", "1 080", "35 000", "3/4", hỗn số "2 3/4"
const fr = (s) => {
  s = String(s).trim().replace(/\s+/g, " ");
  let m = /^(\d+) (\d+)\/(\d+)$/.exec(s);
  if (m && !(m[2].length === 3 && m[1].length <= 3)) return add(F(+m[1]), F(+m[2], +m[3]));
  m = /^(\d+)\/(\d+)$/.exec(s);
  if (m) return F(+m[1], +m[2]);
  m = /^(\d{1,3}(?: \d{3})+|\d+)(?:,(\d+))?$/.exec(s);
  if (m) { const ip = m[1].replace(/ /g, ""), fp = m[2] || ""; return F(+(ip + fp), 10 ** fp.length); }
  throw new Error("không đọc được số: " + s);
};
// số thập phân viết kiểu sách ("2 695,5"); k: số chữ số sau dấu phẩy (mặc định vừa đủ)
const fmtDec = (a, k) => {
  let d = a.d, e2 = 0, e5 = 0; while (d % 2 === 0) { d /= 2; e2++; } while (d % 5 === 0) { d /= 5; e5++; }
  assert.equal(d, 1, "không viết được thành số thập phân hữu hạn: " + a.n + "/" + a.d);
  const p = k === undefined ? Math.max(e2, e5) : k;
  assert.ok(p >= Math.max(e2, e5), "số chữ số sau dấu phẩy không đủ");
  const s = String(Math.abs(a.n) * (10 ** p / a.d)).padStart(p + 1, "0");
  return (a.n < 0 ? "−" : "") + thou(s.slice(0, s.length - p)) + (p ? "," + s.slice(s.length - p) : "");
};
const str = (a) => (a.d === 1 ? String(a.n) : a.n + "/" + a.d);
// làm tròn số không âm đến k chữ số sau dấu phẩy theo quy tắc của sách (Bài 13)
const lamTron = (a, k) => { const p = 10 ** k; return F(Math.floor((2 * a.n * p + a.d) / (2 * a.d)), p); };
const HANG_LT = { "số tự nhiên gần nhất": 0, "hàng phần mười": 1, "hàng phần trăm": 2 };

/* ---------- biểu thức: + − × : ( ), số thập phân "3,75", số "1 080", phân số "2/5" (gạch phân số làm trước ×, :) ---------- */
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
// mệnh đề "a × b = c" của câu đúng/sai: hai vế bằng nhau?
const dungPT = (s) => { const [l, r] = s.split(" = "); return eq(ev(l), ev(r)); };

/* ---------- đơn vị đo: độ dài, khối lượng (gấp 10), diện tích (gấp 100; ha), dung tích (l, ml) ---------- */
const DV = {}, LOAI = {};
[["km", "hm", "dam", "m", "dm", "cm", "mm"], ["tấn", "tạ", "yến", "kg", "hg", "dag", "g"]].forEach((d, j) => d.forEach((u, i) => { DV[u] = F(10 ** (6 - i)); LOAI[u] = ["dài", "nặng"][j]; }));
["km²", "m²", "dm²", "cm²", "mm²"].forEach((u) => (LOAI[u] = "rộng"));
Object.assign(DV, { "km²": F(1e12), "m²": F(1e6), "dm²": F(1e4), "cm²": F(100), "mm²": F(1), ha: F(1e10), l: F(1000), ml: F(1) });
LOAI.ha = "rộng"; LOAI.l = LOAI.ml = "chứa";
const DV_RE = "km²|m²|dm²|cm²|mm²|ha|km|hm|dam|mm|cm|dm|m|tấn|tạ|yến|kg|hg|dag|g|ml|l";
// "3 m 25 cm", "4,5 ha", "2 km² 15 ha" → số đo theo đơn vị u
const doi = (s, u) => {
  const P = [...String(s).matchAll(new RegExp("(\\d[\\d ]*(?:,\\d+)?)\\s*(" + DV_RE + ")(?![\\p{L}²])", "gu"))];
  assert.ok(P.length && P.map((m) => m.index + m[0].length).pop() === String(s).trim().length && P[0].index === 0, "số đo lạ: " + s);
  P.forEach((m) => assert.equal(LOAI[m[2]], LOAI[u], "khác loại đơn vị: " + s + " → " + u));
  return div(P.reduce((t, m) => add(t, mul(fr(m[1].trim()), DV[m[2]])), F(0)), DV[u]);
};
// "0,8 m" → [số, đơn vị]
const soDV = (s) => { const m = new RegExp("^(\\d[\\d ]*(?:,\\d+)?) (" + DV_RE + ")$", "u").exec(s); assert.ok(m, "số đo lạ: " + s); return [fr(m[1]), m[2]]; };

/* ---------- đọc số, hỗn số (như sách: “một và một phần tư”, “chín phẩy mười bảy”, “không phẩy không bốn”) ---------- */
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
const docTP = (s) => { const [ip, fp] = s.split(","), z = /^0*/.exec(fp)[0].length; return docN(+ip.replace(/ /g, "")) + " phẩy " + Array(z).fill("không ").join("") + (fp.slice(z) ? docN(+fp.slice(z)) : ""); };
const docHonSo = (s) => { const [a, p] = s.split(" "), [b, c] = p.split("/").map(Number); return docN(+a) + " và " + docN(b) + " phần " + docN(c); };
const MAU_TP = [10, 100, 1000];
// hỗn số → phân số thập phân (Bài 7: chỉ mẫu số 10, 100, 1 000) và ngược lại; không rút gọn
const honSoThanhPS = (s) => { const m = /^(\d+) (\d+)\/(\d+)$/.exec(s); assert.ok(m && MAU_TP.includes(+m[3]) && +m[2] < +m[3], "hỗn số lạ (chỉ đổi hỗn số có phần phân số thập phân): " + s); return (+m[1] * +m[3] + +m[2]) + "/" + m[3]; };
const psThanhHonSo = (s) => { const [a, b] = s.split("/").map(Number); assert.ok(MAU_TP.includes(b) && a > b, "phân số lạ: " + s); return Math.floor(a / b) + " " + (a % b) + "/" + b; };

/* ---------- hình SVG ---------- */
const nums = (s) => s.trim().split(/[\s,]+/).map(Number);
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const pts2 = (s) => { const v = nums(s), p = []; for (let i = 0; i < v.length; i += 2) p.push([v[i], v[i + 1]]); return p; };
const LINES = (svg) => [...svg.matchAll(/<line [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { a: [+a.x1, +a.y1], b: [+a.x2, +a.y2], dash: !!a["stroke-dasharray"] }; });
const POLYS = (svg) => [...svg.matchAll(/<polygon [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { p: pts2(a.points), fill: a.fill || "none" }; });
const CIRCLES = (svg) => [...svg.matchAll(/<circle [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { c: [+a.cx, +a.cy], r: +a.r, fill: a.fill || "none" }; });
const RECTS = (svg) => [...svg.matchAll(/<rect [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { x: +a.x, y: +a.y, w: +a.width, h: +a.height, fill: a.fill || "none", op: a["fill-opacity"] }; });
const TEXTS = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { at: [+a.x, +a.y], t: m[2], fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start", b: a["font-weight"] === "700" }; });
const rong = (t) => (t.b ? 0.62 : 0.55) * t.fs * [...t.t].length; // ước bề rộng chữ (Noto Sans)
const hopChu = (t) => { const w = rong(t), x0 = t.anchor === "middle" ? t.at[0] - w / 2 : t.anchor === "end" ? t.at[0] - w : t.at[0]; return [x0, t.at[1] - 0.75 * t.fs, x0 + w, t.at[1] + 0.25 * t.fs]; };
const tamChu = (t) => { const h = hopChu(t); return [(h[0] + h[2]) / 2, (h[1] + h[3]) / 2]; };
const vsub = (p, q) => [p[0] - q[0], p[1] - q[1]];
const dot = (u, v) => u[0] * v[0] + u[1] * v[1];
const cross = (u, v) => u[0] * v[1] - u[1] * v[0];
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const gan = (x, y, e) => Math.abs(x - y) <= (e === undefined ? 1e-6 : e) * Math.max(1, Math.abs(x), Math.abs(y));
const songSong = (u, v) => Math.abs(cross(u, v)) <= 1e-3 * Math.hypot(...u) * Math.hypot(...v);
const vuong = (u, v) => Math.abs(dot(u, v)) <= 1e-3 * Math.hypot(...u) * Math.hypot(...v);
const segDist = (p, a, b) => { const ab = vsub(b, a), t = Math.max(0, Math.min(1, dot(vsub(p, a), ab) / dot(ab, ab))); return dist(p, [a[0] + t * ab[0], a[1] + t * ab[1]]); };
const cung = (P, Q) => dist(P, Q) < 0.5;
// điểm có nhãn: nhãn (chữ in hoa) gần điểm của nó nhất trong các đỉnh đa giác, đầu đoạn thẳng, chấm tròn nhỏ; mỗi nhãn một điểm
const diem = (svg, names) => {
  const C = [];
  POLYS(svg).forEach((g) => C.push(...g.p)); LINES(svg).forEach((l) => C.push(l.a, l.b)); CIRCLES(svg).filter((c) => c.r <= 5).forEach((c) => C.push(c.c));
  const U = []; C.forEach((p) => { if (!U.some((q) => cung(p, q))) U.push(p); });
  const T = TEXTS(svg), o = {};
  names.forEach((n) => {
    const t = T.filter((x) => x.t === n); assert.equal(t.length, 1, "hình cần đúng một nhãn " + n);
    const c = tamChu(t[0]), g = U.map((p) => [p, dist(p, c)]).sort((a, b) => a[1] - b[1]);
    assert.ok(g[0][1] <= 24, `nhãn ${n} xa điểm của nó (${g[0][1].toFixed(1)} px)`);
    assert.ok(g.length < 2 || g[1][1] - g[0][1] >= 4, `nhãn ${n} gần hai điểm`);
    o[n] = g[0][0];
  });
  assert.equal(new Set(Object.values(o).map(String)).size, names.length, "mỗi nhãn một điểm");
  return o;
};
// đa giác có đúng các đỉnh đã cho (theo thứ tự vòng quanh, bắt đầu ở đâu cũng được)
const daGiac = (svg, P, names, fill) => {
  const G = POLYS(svg).filter((g) => g.p.length === names.length && names.every((n) => g.p.some((q) => cung(q, P[n]))));
  assert.equal(G.length, 1, "cần đúng một đa giác " + names.join("")); const g = G[0];
  if (fill) assert.equal(g.fill, fill, "đa giác " + names.join("") + " tô màu " + fill);
  const k = names.map((n) => g.p.findIndex((q) => cung(q, P[n])));
  assert.ok(k.every((v, i) => !i || v === (k[i - 1] + 1) % k.length) || k.every((v, i) => !i || v === (k[i - 1] + k.length - 1) % k.length), "nhãn theo thứ tự đỉnh của " + names.join(""));
  return g;
};
// có nét vẽ nối P với Q: cạnh đa giác hoặc đoạn thẳng (nét đứt nếu dash = true)
const coNet = (svg, P, Q, dash) => {
  const L = LINES(svg).filter((l) => (cung(l.a, P) && cung(l.b, Q)) || (cung(l.a, Q) && cung(l.b, P)));
  if (dash !== undefined) return L.some((l) => l.dash === dash);
  return L.length > 0 || POLYS(svg).some((g) => g.p.some((p, i) => { const q = g.p[(i + 1) % g.p.length]; return (cung(p, P) && cung(q, Q)) || (cung(p, Q) && cung(q, P)); }));
};
// (cách ít nhất 5 px); mọi số đo cùng một tỉ lệ (hình vẽ đúng tỉ lệ) → { so: { AB: số đo theo đơn vị ghi }, u: đơn vị, k: px cho 1 đơn vị }
const SO_DO = /^(\d+(?:,\d+)?) (mm|cm|dm|m|km)$/;
const soDo = (svg, segs) => {
  const so = {}, k = []; let u;
  TEXTS(svg).filter((t) => SO_DO.test(t.t)).forEach((t) => {
    const m = SO_DO.exec(t.t), c = tamChu(t);
    const near = Object.keys(segs).map((n) => [n, segDist(c, ...segs[n])]).sort((a, b) => a[1] - b[1]);
    assert.ok(near[0][1] <= 30, `nhãn “${t.t}” xa đoạn thẳng của nó`);
    assert.ok(near.length < 2 || near[1][1] - near[0][1] >= 5, `nhãn “${t.t}” gần cả ${near[0][0]} lẫn ${near[1][0]}`);
    const n = near[0][0]; assert.ok(!(n in so), "hai nhãn cùng ghi đoạn " + n);
    assert.ok(!u || u === m[2], "các số đo trong hình cùng một đơn vị"); u = m[2];
    so[n] = fr(m[1]); k.push(dist(...segs[n]) / toNum(so[n]));
  });
  assert.ok(k.length, "hình không có số đo");
  k.forEach((x) => assert.ok(gan(x, k[0], 0.005), `hình vẽ đúng tỉ lệ (${k.map((x) => x.toFixed(3)).join("; ")} px một ${u})`));
  return { so, u, k: k[0] };
};
// mọi chữ trong hình cỡ từ 13 trở lên, nằm trọn trong khung, không đè lên nhau
const chuHinh = (svg, ten) => {
  const v = nums(/viewBox="([^"]+)"/.exec(svg)[1]), T = TEXTS(svg);
  T.forEach((t) => { const h = hopChu(t); assert.ok(t.fs >= 13, ten + ": chữ “" + t.t + "” nhỏ hơn cỡ 13"); assert.ok(h[0] >= 0 && h[2] <= v[2] && h[1] >= 0 && h[3] <= v[3], ten + ": chữ “" + t.t + "” tràn khỏi khung hình"); });
  T.forEach((t, i) => T.slice(i + 1).forEach((u) => { const a = hopChu(t), b = hopChu(u); assert.ok(!(a[0] < b[2] - 1 && b[0] < a[2] - 1 && a[1] < b[3] - 1 && b[1] < a[3] - 1), ten + ": chữ “" + t.t + "” đè lên chữ “" + u.t + "”"); }));
};
const hinhDaDoc = new Set();
const doc = (q) => { assert.ok(q.svg, "câu cần hình"); hinhDaDoc.add(q.svg); return q.svg; };


/* ---------- số tự nhiên: hàng, cấu tạo số, làm tròn ---------- */
const HANG_TN = ["đơn vị", "chục", "trăm", "nghìn", "chục nghìn", "trăm nghìn", "triệu", "chục triệu", "trăm triệu"];
const soTN = (s) => +String(s).replace(/ /g, "");
// chữ số c (có đúng một lần trong số s) ở hàng thứ mấy kể từ hàng đơn vị
const hangCua = (s, c) => { const d = String(soTN(s)), i = d.indexOf(c); assert.ok(i >= 0 && d.lastIndexOf(c) === i, `chữ số ${c} có đúng một lần trong ${s}`); return d.length - 1 - i; };
// "7 triệu, 4 trăm nghìn, 5 nghìn và 6 đơn vị" → 7 405 006
const ghepSo = (s) => { let t = 0, k = 0; for (const m of s.matchAll(/(\d+) (chục triệu|trăm nghìn|chục nghìn|triệu|nghìn|trăm|chục|đơn vị)/g)) { t += +m[1] * 10 ** HANG_TN.indexOf(m[2]); k++; } assert.ok(k >= 2, "cấu tạo số lạ: " + s); return t; };
// làm tròn số tự nhiên n đến hàng p (10, 100, 1 000, …): chữ số ngay sau hàng làm tròn từ 5 trở lên thì làm tròn lên
const lamTronTN = (n, p) => Math.floor((n + p / 2) / p) * p;
const hoanVi = (a) => (a.length <= 1 ? [a] : a.flatMap((x, i) => hoanVi(a.slice(0, i).concat(a.slice(i + 1))).map((p) => [x].concat(p))));
const MAU_DOC = { 10: "mười", 100: "trăm", 1000: "nghìn" };
const toiGian = (s) => { const [a, b] = s.split("/").map(Number); return gcd(a, b) === 1; };
// danh sách số trong đề bài: "các phân số 6/14; 9/21; 8/15; 12/18, phân số…" → ["6/14", "9/21", "8/15", "12/18"]
const dsSau = (q, re) => { const m = re.exec(q.q); assert.ok(m, "đề bài lạ: " + q.q); return m[1].split("; "); };
const cungLuaChon = (q, ds) => assert.deepEqual(q.o.slice().sort(), ds.slice().sort(), "lựa chọn là các số đã cho");

/* ---------- đọc hình ---------- */
// tia số: số a, b ghi dưới hai vạch dài, giữa chúng k − 1 vạch ngắn cách đều; một điểm (chấm tô acc, nhãn ten ngay trên) ở đúng một vạch
// giữa hai số → thứ tự m của vạch đó kể từ vạch a
function tiaSoDoc(q, a, b, k, ten) {
  const svg = doc(q), L = LINES(svg), truc = L.filter((l) => l.a[1] === l.b[1]).sort((u, v) => Math.abs(v.b[0] - v.a[0]) - Math.abs(u.b[0] - u.a[0]))[0], y = truc.a[1];
  const vach = L.filter((l) => l.a[0] === l.b[0] && Math.min(l.a[1], l.b[1]) < y && Math.max(l.a[1], l.b[1]) > y).map((l) => ({ x: l.a[0], dai: Math.abs(l.b[1] - l.a[1]) })).sort((u, v) => u.x - v.x);
  const T = TEXTS(svg), so = (s) => { const t = T.filter((x) => x.t === s); assert.equal(t.length, 1, "tia số cần đúng một số " + s); const v = vach.filter((w) => Math.abs(w.x - t[0].at[0]) < 1); assert.equal(v.length, 1, "số " + s + " ghi dưới một vạch"); return v[0]; };
  const va = so(String(a)), vb = so(String(b)), giua = vach.filter((v) => v.x > va.x && v.x < vb.x);
  assert.equal(giua.length, k - 1, k + " phần bằng nhau"); [va].concat(giua, [vb]).forEach((v, i) => assert.ok(gan(v.x, va.x + i * (vb.x - va.x) / k, 1e-9), "các vạch cách đều"));
  assert.ok(va.dai > giua[0].dai && vb.dai > giua[0].dai, "vạch có số dài hơn");
  const P = CIRCLES(svg).filter((c) => c.fill === "acc"); assert.equal(P.length, 1, "một điểm trên tia số"); assert.equal(P[0].c[1], y, "điểm nằm trên tia số");
  const nh = T.filter((t) => t.t === ten); assert.equal(nh.length, 1, "một nhãn " + ten); assert.ok(Math.abs(nh[0].at[0] - P[0].c[0]) < 1 && nh[0].at[1] < y, "nhãn " + ten + " ngay trên điểm");
  const m = (P[0].c[0] - va.x) / (vb.x - va.x) * k; assert.ok(gan(m, Math.round(m), 1e-9) && m > 0 && m < k, "điểm ở đúng một vạch giữa hai số");
  return Math.round(m);
}
// hình chia phần: các hình chữ nhật bằng nhau ghép khít thành một hình chữ nhật (thẳng lưới, không chồng nhau), các phần tô cùng một màu
function oToMau(q) {
  const R = RECTS(doc(q)); assert.ok(R.length >= 2, "hình chia phần");
  assert.ok(R.every((r) => r.w === R[0].w && r.h === R[0].h), "các phần bằng nhau");
  const x0 = Math.min(...R.map((r) => r.x)), y0 = Math.min(...R.map((r) => r.y)), x1 = Math.max(...R.map((r) => r.x + r.w)), y1 = Math.max(...R.map((r) => r.y + r.h));
  assert.equal(new Set(R.map((r) => r.x + "," + r.y)).size, R.length, "các phần không chồng nhau");
  R.forEach((r) => assert.ok(Number.isInteger((r.x - x0) / r.w) && Number.isInteger((r.y - y0) / r.h), "các phần thẳng lưới"));
  assert.ok(gan((x1 - x0) * (y1 - y0), R.length * R[0].w * R[0].h, 1e-9), "các phần ghép khít thành một hình chữ nhật");
  const to = R.filter((r) => r.fill !== "none"); assert.equal(new Set(to.map((r) => r.fill)).size, 1, "các phần tô cùng một màu");
  return { tong: R.length, to: to.length };
}
// một hình chữ nhật (hay hình vuông) có số đo ghi bên cạnh (cạnh dưới là chiều dài, cạnh phải là chiều rộng), đúng tỉ lệ
function hcn(q) {
  const svg = doc(q), R = RECTS(svg); assert.equal(R.length, 1, "một hình chữ nhật"); const r = R[0];
  const g = [[r.x, r.y], [r.x + r.w, r.y], [r.x + r.w, r.y + r.h], [r.x, r.y + r.h]];
  const { so, u, k } = soDo(svg, { tren: [g[0], g[1]], phai: [g[1], g[2]], duoi: [g[3], g[2]], trai: [g[0], g[3]] });
  assert.ok(so.duoi, "số đo ghi ở cạnh dưới");
  return { dai: so.duoi, rong: so.phai || F(Math.round(r.h / k * 1000), 1000), u, vuong: r.w === r.h, ghiRong: !!so.phai, r, k };
}
// góc đỉnh O, cạnh OA, OB (độ)
const doGoc = (O, A, B) => { const u = vsub(A, O), v = vsub(B, O); return Math.acos(dot(u, v) / Math.hypot(...u) / Math.hypot(...v)) * 180 / Math.PI; };
// bảng đơn vị đo diện tích: các ô liền nhau, mỗi ô một chữ, theo thứ tự từ lớn đến bé, đúng một ô ghi “?” → đơn vị của ô đó
const BANG_DT = ["km²", "ha", "m²", "dm²", "cm²", "mm²"];
function bangDV(q) {
  const svg = doc(q), R = RECTS(svg).sort((a, b) => a.x - b.x), T = TEXTS(svg).sort((a, b) => a.at[0] - b.at[0]);
  assert.equal(R.length, T.length, "mỗi ô một chữ");
  R.forEach((r, i) => { assert.ok(!i || gan(R[i - 1].x + R[i - 1].w, r.x), "các ô liền nhau"); assert.ok(r.y === R[0].y && r.h === R[0].h, "các ô cùng một hàng");
    const t = T[i]; assert.ok(t.at[0] > r.x && t.at[0] < r.x + r.w && t.at[1] > r.y && t.at[1] < r.y + r.h, "chữ “" + t.t + "” nằm trong ô"); });
  const ds = T.map((t) => t.t), i = ds.indexOf("?"); assert.ok(i >= 0 && ds.indexOf("?", i + 1) < 0, "đúng một ô còn thiếu");
  const j = BANG_DT.indexOf(ds[i ? 0 : 1]) - (i ? 0 : 1); assert.ok(j >= 0, "bảng bắt đầu bằng một đơn vị đo diện tích");
  ds.forEach((d, k) => { if (k !== i) assert.equal(d, BANG_DT[j + k], "bảng theo thứ tự từ lớn đến bé"); });
  return BANG_DT[j + i];
}

/* ---------- kiểm tra từng câu: has (chữ có trong đề bài), right(q) (đáp án tính bằng code) ---------- */
// mệnh đề trong ý của câu đúng/sai 4 ý: số đầu tiên sau cụm chữ
const soSau = (s, cum) => { const m = new RegExp(cum + "\\s*(\\d[\\d ]*(?:,\\d+)?(?:\\/\\d+)?)").exec(s); assert.ok(m, `ý “${s}” cần số sau “${cum}”`); return fr(m[1].trim()); };
const motLuaChon = (q, f) => { const m = q.o.filter(f); assert.equal(m.length, 1, "cần đúng một lựa chọn thoả: " + m.join(" | ")); return m[0]; };
// các ý so sánh “<tên> cao nhất trong ba bạn.”, “<tên> thấp hơn <tên>.”, “<tên> cao hơn <tên>.”
const yChieuCao = (o, h) => {
  let m = /^(\p{Lu}\p{Ll}*) cao nhất trong ba bạn\.$/u.exec(o); if (m) return Object.values(h).every((v) => cmp(h[m[1]], v) >= 0);
  m = /^(\p{Lu}\p{Ll}*) (thấp|cao) hơn (\p{Lu}\p{Ll}*)\.$/u.exec(o); assert.ok(m && m[1] in h && m[3] in h, "ý lạ: " + o);
  return m[2] === "cao" ? cmp(h[m[1]], h[m[3]]) > 0 : cmp(h[m[1]], h[m[3]]) < 0;
};
const CHECKS = [
  /* Ôn tập số tự nhiên */
  { has: "Số gồm 7 triệu, 4 trăm nghìn, 5 nghìn và 6 đơn vị viết là", right: (q) => fmtDec(F(ghepSo(/Số gồm (.+) viết là/.exec(q.q)[1]))) },
  { has: "6 208 075 = 6 000 000 + 200 000 + … + 70 + 5", right: (q) => {
    const [l, r] = /chỗ chấm: (.+)$/.exec(q.q)[1].split(" = "), p = r.split(" + "); assert.equal(p.filter((x) => x === "…").length, 1);
    const thieu = sub(fr(l), p.filter((x) => x !== "…").reduce((t, x) => add(t, fr(x)), F(0)));
    assert.ok(thieu.d === 1 && /^[1-9]0*$/.test(String(thieu.n)), "phần còn thiếu là giá trị của một chữ số"); return fmtDec(thieu); } },
  { has: "Giá trị của chữ số 9 trong số 59 360 412 là", right: () => fmtDec(F(9 * 10 ** hangCua("59 360 412", "9"))) },
  { has: "Trong các số 3 457; 2 016; 5 090; 7 384, số lẻ là", right: (q) => { cungLuaChon(q, dsSau(q, /các số (.+), số lẻ là/)); return motLuaChon(q, (o) => soTN(o) % 2 === 1); } },
  { has: "Xét số 12 045 380", right: (q) => { const s = /Xét số ([\d ]+)\./.exec(q.q)[1], n = soTN(s);
    return q.o.map((o) => { let m = /^Chữ số (\d) thuộc hàng (.+)\.$/.exec(o); if (m) return HANG_TN[hangCua(s, m[1])] === m[2];
      m = /^Số đó là số (lẻ|chẵn)\.$/.exec(o); if (m) return (n % 2 === 1) === (m[1] === "lẻ");
      m = /^Làm tròn số đó đến hàng (.+) được ([\d ]+)\.$/.exec(o); if (m) return lamTronTN(n, 10 ** HANG_TN.indexOf(m[1])) === soTN(m[2]);
      m = /^Số đó có (\S+) chữ số\.$/.exec(o); assert.ok(m, "ý lạ: " + o); return String(n).length === SO.indexOf(m[1]); }); } },
  { has: "Làm tròn số 4 862 370 đến hàng trăm nghìn", right: () => fmtDec(F(lamTronTN(soTN("4 862 370"), 1e5))) },
  { has: "Dùng cả năm chữ số 0; 3; 5; 7; 8, mỗi chữ số dùng một lần, viết số lẻ bé nhất có năm chữ số", right: (q) => {
    const d = /chữ số ([\d; ]+), mỗi/.exec(q.q)[1].split("; ").map(Number); assert.equal(d.length, 5);
    return fmtDec(F(Math.min(...hoanVi(d).filter((p) => p[0] !== 0 && p[4] % 2 === 1).map((p) => +p.join(""))))); } },
  { has: "Sắp xếp các số 128 409; 130 214; 128 940; 129 870 theo thứ tự từ lớn đến bé", right: (q) => { const s = dsSau(q, /các số (.+) theo thứ tự/); cungLuaChon(q, s); return s.sort((a, b) => soTN(b) - soTN(a)); } },
  /* Ôn tập các phép tính với số tự nhiên */
  { has: "Giá trị của biểu thức 2 450 + 1 380 : 15 là", right: () => ev("2 450 + 1 380 : 15") },
  { has: "Tính bằng cách thuận tiện: 4 × 63 × 25", right: () => ev("4 × 63 × 25") },
  { has: "Trung bình cộng của ba số 1 245; 2 380 và 3 005 là", right: () => { const v = div(ev("1 245 + 2 380 + 3 005"), F(3)); assert.equal(v.d, 1); return v; } },
  { has: "Tính giá trị của biểu thức: (5 400 − 1 680) : 12", right: () => ev("(5 400 − 1 680) : 12") },
  { has: "Hai đội trồng rừng trồng được tất cả 1 250 cây. Đội Một trồng được ít hơn đội Hai 150 cây", right: () => div(add(F(1250), F(150)), F(2)) },
  { has: "ngày thứ nhất dệt được 1 260 m vải, ngày thứ hai dệt được 1 485 m vải, ngày thứ ba dệt được 1 335 m vải", right: () => { const v = div(ev("1 260 + 1 485 + 1 335"), F(3)); assert.equal(v.d, 1); return v; } },
  { has: "Mẹ mua 3 kg thịt, mỗi ki-lô-gam giá 125 000 đồng, và 2 kg cá, mỗi ki-lô-gam giá 85 000 đồng", right: (q) => {
    const tra = ev("125 000 × 3 + 85 000 × 2");
    assert.deepEqual(q.o.slice(1, 3), [fmtDec(tra) + " đồng", fmtDec(ev("600 000 − (125 000 + 85 000)")) + " đồng"], "nhiễu: số tiền phải trả, quên nhân số ki-lô-gam");
    return fmtDec(sub(F(600000), tra)) + " đồng"; } },
  { has: "Người ta xếp 1 345 quyển vở vào các thùng, mỗi thùng chứa được 30 quyển", right: () => { assert.ok(1345 % 30, "phép chia có dư"); return F(Math.floor(1345 / 30) + 1); } },
  /* Ôn tập phân số */
  { has: "Trong các phân số 6/14; 9/21; 8/15; 12/18, phân số tối giản là", right: (q) => { cungLuaChon(q, dsSau(q, /các phân số (.+), phân số tối giản/)); return motLuaChon(q, toiGian); } },
  { has: "Khi quy đồng mẫu số 3/4 và 5/6 với mẫu số chung là 12", right: (q) => {
    const m = /ta được 3\/4 = (\d+)\/12 và 5\/6 = ___/.exec(q.q); assert.ok(m && eq(F(+m[1], 12), fr("3/4")), "phân số đã quy đồng sẵn trong đề đúng");
    const t = mul(fr("5/6"), F(12)); assert.equal(t.d, 1); return t.n + "/12"; } },
  { has: "Hình dưới đây được chia thành các phần bằng nhau. Phần đã tô màu chiếm bao nhiêu phần của hình?", right: (q) => { const { tong, to } = oToMau(q); return to + "/" + tong; } },
  { has: "Sắp xếp các phân số 7/10; 3/5; 4/5; 13/20 theo thứ tự từ bé đến lớn", right: (q) => { const s = dsSau(q, /các phân số (.+) theo thứ tự/); cungLuaChon(q, s); return s.sort((a, b) => cmp(fr(a), fr(b))); } },
  { has: "Phân số 7/5 lớn hơn 1", right: () => cmp(fr("7/5"), F(1)) > 0 },
  { has: "Trong các phân số 7/9; 4/9; 11/9; 5/9, phân số bé nhất là", right: (q) => { const s = dsSau(q, /các phân số (.+), phân số bé nhất/); cungLuaChon(q, s); return s.reduce((a, b) => (cmp(fr(b), fr(a)) < 0 ? b : a)); } },
  { has: "Rút gọn phân số 28/49 thành phân số tối giản", right: (q) => { const v = fr("28/49");
    q.o.slice(1).forEach((o) => assert.ok(!eq(fr(o), v) || !toiGian(o), "lựa chọn sai là phân số tối giản bằng đáp án: " + o)); assert.ok(toiGian(str(v))); return str(v); } },
  { has: "Nối mỗi phân số ở cột trái với phân số bằng nó ở cột phải", right: (q) => noiBang(q, fr) },
  /* Phân số thập phân */
  { has: "đoạn từ vạch 0 đến vạch 1 gồm 10 phần bằng nhau. Điểm M ứng với phân số thập phân nào?", right: (q) => tiaSoDoc(q, 0, 1, 10, "M") + "/10" },
  { has: "Trong các phân số 3/10; 10/3; 7/50; 21/100, có bao nhiêu phân số thập phân?", right: (q) => {
    assert.deepEqual(q.o.slice().sort(), ["1", "2", "3", "4"]); return String(dsSau(q, /các phân số (.+), có bao nhiêu/).filter((s) => MAU_TP.includes(+s.split("/")[1])).length); } },
  { has: "Phân số 100/7 là phân số thập phân", right: () => MAU_TP.includes(7) },
  { has: "Phân số thập phân 72/100 đọc là", right: () => docN(72) + " phần " + MAU_DOC[100] },
  /* Ôn tập các phép tính với phân số (cộng, trừ như lớp 4: cùng mẫu số hay mẫu số này chia hết cho mẫu số kia) */
  { has: "Tính: 5/6 × 3/10", right: () => ev("5/6 × 3/10") },
  { has: "Tính: 5/8 : 5/12", right: () => ev("5/8 : 5/12") },
  { has: "Giá trị của biểu thức 7/20 + 1/2 × 1/5 là", right: (q) => {
    assert.deepEqual(q.o.slice(1), [str(ev("(7/20 + 1/2) × 1/5")), str(ev("1/2 × 1/5")), str(ev("7/20 + 1/2"))], "nhiễu: cộng trước rồi nhân, chỉ làm phép nhân, quên phép nhân");
    return str(ev("7/20 + 1/2 × 1/5")); } },
  { has: "1/3 : 2 = 1/6", right: () => dungPT("1/3 : 2 = 1/6") },
  { has: "Một téc nước chứa 1 500 l. Người ta dùng 2/5 số nước để tưới rau và 1/4 số nước", right: () => sub(sub(F(1500), mul(F(1500), fr("2/5"))), mul(F(1500), fr("1/4"))) },
  { has: "Một tấm bìa hình chữ nhật dài 4/5 m. Chiều rộng tấm bìa bằng 3/4 chiều dài", right: (q) => {
    const d = fr("4/5"), r = mul(d, fr("3/4"));
    assert.deepEqual(q.o.slice(1), [r, add(d, r), mul(add(d, r), F(2))].map((v) => str(v) + " m²"), "nhiễu: chiều rộng, tổng hai cạnh, chu vi");
    return str(mul(d, r)) + " m²"; } },
  { has: "Một cửa hàng nhập về 360 kg đường và đã bán được 5/12 số đường đó", right: () => sub(F(360), mul(F(360), fr("5/12"))) },
  { has: "Một tấm vải dài 15 m được cắt thành các mảnh bằng nhau, mỗi mảnh dài 3/4 m", right: (q) => { const dai = F(15), m = fr("3/4");
    return [eq(soSau(q.o[0], "tất cả"), div(dai, m)), eq(soSau(q.o[1], "dài"), mul(m, F(100))),
      eq(soSau(q.o[2], "cắt được"), div(dai, fr(/dài (\d+\/\d+) m/.exec(q.o[2])[1]))), eq(soSau(q.o[3], "còn lại dài"), sub(dai, mul(F(+/cắt (\d+) mảnh/.exec(q.o[3])[1]), m)))]; } },
  /* Cộng, trừ phân số (Bài 6: hai mẫu số không chia hết cho nhau) */
  { has: "Bạn Nga tập đàn 3/4 giờ, bạn Lan tập ít hơn Nga 1/6 giờ", right: () => { khacMau("3/4", "1/6"); const nga = fr("3/4"); return add(nga, sub(nga, fr("1/6"))); } },
  { has: "Một chai chứa 5/6 l nước mắm. Mẹ đã dùng 3/8 l", right: (q) => { khacMau("5/6", "3/8");
    assert.equal(q.o[1], str(add(fr("5/6"), fr("3/8"))) + " l", "nhiễu: cộng thay vì trừ"); return str(sub(fr("5/6"), fr("3/8"))) + " l"; } },
  { has: "Lấy phân số đó cộng với 2/5 thì được 5/6", right: () => { khacMau("5/6", "2/5"); return sub(fr("5/6"), fr("2/5")); } },
  { has: "Hùng sơn được 2/7 bức tường, Quân sơn được 2/5 bức tường", right: (q) => { khacMau("2/7", "2/5"); const h = fr("2/7"), qn = fr("2/5"), t = sub(F(1), add(h, qn));
    assert.equal(q.o[3], "Tuấn sơn được ít hơn Quân.");
    return [eq(soSau(q.o[0], "sơn được"), add(h, qn)), eq(soSau(q.o[1], "sơn được"), t), eq(soSau(q.o[2], "Hùng"), sub(qn, h)), cmp(t, qn) < 0]; } },
  /* Hỗn số */
  { has: "Điểm N trên tia số dưới đây ứng với hỗn số nào?", right: (q) => "2 " + tiaSoDoc(q, 2, 3, 5, "N") + "/5" },
  { has: "Sắp xếp các số 2 1/10; 2 3/10; 1 9/10; 2 9/100 theo thứ tự từ bé đến lớn", right: (q) => { const s = dsSau(q, /các số (.+) theo thứ tự/); cungLuaChon(q, s); return s.sort((a, b) => cmp(fr(a), fr(b))); } },
  { has: "Hỗn số “năm và bảy phần mười” viết là", right: (q) => { const s = "5 7/10"; assert.equal(docHonSo(s), /“(.+)”/.exec(q.q)[1]); return s; } },
  { has: "Nối mỗi hỗn số ở cột trái với phân số thập phân bằng nó ở cột phải", right: (q) => {
    q.l.forEach(honSoThanhPS); q.r.forEach((r) => assert.ok(MAU_TP.includes(+r.split("/")[1]), "ô phải là phân số thập phân: " + r)); return noiBang(q, fr); } },
  { has: "Trong hỗn số 3 2/5, số 2 là phần nguyên", right: () => "3 2/5".split(" ")[0] === "2" },
  { has: "Số nào dưới đây là hỗn số?", right: (q) => motLuaChon(q, (s) => { const m = /^(\d+) (\d+)\/(\d+)$/.exec(s); return !!m && +m[2] < +m[3]; }) },
  { has: "Viết 47 : 10 dưới dạng hỗn số, ta được", right: () => { assert.ok(eq(fr(psThanhHonSo("47/10")), ev("47 : 10"))); return psThanhHonSo("47/10"); } },
  { has: "Một bình chứa 2 3/10 l nước", right: () => mul(fr("2 3/10"), F(1000)) },
  /* Ôn tập hình học và đo lường */
  { has: "Hình tứ giác ABCD dưới đây có một cặp cạnh song song", right: (q) => {
    const svg = doc(q), P = diem(svg, ["A", "B", "C", "D"]); daGiac(svg, P, ["A", "B", "C", "D"], "none");
    const canh = (s) => vsub(P[s[1]], P[s[0]]), C = ["AB", "BC", "CD", "DA"];
    assert.equal(C.filter((x, i) => C.slice(i + 1).some((y) => songSong(canh(x), canh(y)))).length, 1, "hình tứ giác có đúng một cặp cạnh song song");
    return motLuaChon(q, (o) => { const [x, y] = o.split(" và "); return songSong(canh(x), canh(y)); }); } },
  { has: "2/5 thế kỉ = ___ năm", right: () => mul(fr("2/5"), F(100)) },
  { has: "Bạn Nam vẽ góc đỉnh O, cạnh OM, ON", right: (q) => {
    const svg = doc(q), P = diem(svg, ["O", "M", "N"]); assert.ok(coNet(svg, P.O, P.M) && coNet(svg, P.O, P.N), "có cạnh OM, ON");
    const d = doGoc(P.O, P.M, P.N); assert.ok(d > 15 && Math.abs(d - 90) > 15 && Math.abs(d - 180) > 15, "góc nhìn rõ loại: " + d.toFixed(1) + "°");
    assert.deepEqual(q.o.slice().sort(), ["góc bẹt", "góc nhọn", "góc tù", "góc vuông"]); return d < 90 ? "góc nhọn" : d < 180 ? "góc tù" : "góc bẹt"; } },
  { has: "1/4 giờ = ___ phút", right: () => mul(fr("1/4"), F(60)) },
  /* Số thập phân */
  { has: "Số thập phân 14,075 đọc là", right: (q) => { const d = docTP("14,075"); q.o.slice(1).forEach((o) => assert.notEqual(o, d)); return d; } },
  { has: "Trên tia số dưới đây, số thập phân nào ứng với điểm K?", right: (q) => fmtDec(F(tiaSoDoc(q, 0, "0,1", 10, "K"), 100)) },
  { has: "Nối mỗi số thập phân ở cột trái với cách đọc của nó ở cột phải", right: (q) => {
    q.r.slice(q.l.length).forEach((r) => assert.ok(!q.l.some((l) => docTP(l) === r), "ô thừa là cách đọc của một ô trái: " + r)); return q.l.map(docTP); } },
  { has: "Số gồm 6 đơn vị, 12 phần trăm và 5 phần nghìn viết là", right: () => ev("6 + 12/100 + 5/1000") },
  { has: "Số thập phân nào dưới đây có chữ số 7 ở hàng phần trăm?", right: (q) => motLuaChon(q, (o) => [...o].filter((c) => c === "7").length === 1 && (o.split(",")[1] || "")[1] === "7") },
  { has: "Số thập phân bằng phân số 63/1000 viết là", right: () => fr("63/1000") },
  { has: "Phân số 3/5 viết thành số thập phân là", right: () => fmtDec(fr("3/5")) },
  { has: "Số thập phân 2,05 viết dưới dạng phân số thập phân là", right: (q) => motLuaChon(q, (o) => MAU_TP.includes(+o.split("/")[1]) && eq(fr(o), fr("2,05"))) },
  /* So sánh số thập phân */
  { has: "Số bé nhất trong các số 0,73; 0,703; 0,8; 0,71 là", right: (q) => { const s = dsSau(q, /các số (.+) là/); cungLuaChon(q, s); return s.reduce((a, b) => (cmp(fr(b), fr(a)) < 0 ? b : a)); } },
  { has: "Chiều cao của bốn cây giống sau một tuần trồng", right: (q) => {
    const c = [...q.q.matchAll(/cây ([A-D]) ([\d,]+) cm/g)].map((m) => ["Cây " + m[1], fr(m[2])]); assert.equal(c.length, 4); cungLuaChon(q, c.map((x) => x[0]));
    return c.reduce((a, b) => (cmp(b[1], a[1]) > 0 ? b : a))[0]; } },
  { has: "Trong các số 5,1; 5,009; 5,08; 4,99, số nào lớn hơn 5,09?", right: (q) => motLuaChon(q, (o) => cmp(fr(o), fr("5,09")) > 0) },
  { has: "Số thập phân lớn nhất có hai chữ số ở phần thập phân và bé hơn 4,3", right: () => sub(fr("4,3"), F(1, 100)) },
  { has: "Hai số 12,50 và 12,500 bằng nhau", right: () => eq(fr("12,50"), fr("12,500")) },
  { has: "Số 6,25 lớn hơn số nào dưới đây?", right: (q) => motLuaChon(q, (o) => cmp(fr("6,25"), fr(o)) > 0) },
  { has: "lớn hơn 6,7 và bé hơn 6,8. Hà có thể đã nghĩ ra số nào?", right: (q) => motLuaChon(q, (o) => cmp(fr(o), fr("6,7")) > 0 && cmp(fr(o), fr("6,8")) < 0) },
  { has: "Ba bạn Thảo, Vy, Khoa đo chiều cao", right: (q) => {
    const h = Object.fromEntries([...q.q.matchAll(/(\p{Lu}\p{Ll}*) cao ([\d,]+) m/gu)].map((m) => [m[1], fr(m[2])])); assert.deepEqual(Object.keys(h), ["Thảo", "Vy", "Khoa"]);
    return q.o.map((o) => yChieuCao(o, h)); } },
  /* Viết số đo dưới dạng số thập phân */
  { has: "4 dm = ___ m", right: () => doi("4 dm", "m") },
  { has: "65 g = … kg", right: () => fmtDec(doi("65 g", "kg")) },
  { has: "1 kg viết dưới dạng số thập phân với đơn vị tấn là", right: (q) => { const v = doi("1 kg", "tấn"); q.o.slice(1).forEach((o) => assert.ok(!eq(soDV(o)[0], v), "lựa chọn sai bằng đáp án: " + o)); return fmtDec(v) + " tấn"; } },
  { has: "125 ml = ___ l", right: () => doi("125 ml", "l") },
  { has: "3 m² 5 dm² = ___ m²", right: () => doi("3 m² 5 dm²", "m²") },
  { has: "4 km 35 m = … km", right: () => fmtDec(doi("4 km 35 m", "km")) },
  { has: "Nối mỗi khối lượng ở cột trái với số ki-lô-gam bằng nó ở cột phải", right: (q) => noiSoDo(q) },
  { has: "Một con đường dài 2 km 350 m", right: () => doi("2 km 350 m", "km") },
  { has: "Một viên gạch men hình vuông cạnh 4 dm", right: (q) => { const h = hcn(q); assert.ok(h.vuong && h.u === "dm" && eq(h.dai, F(4)), "hình vuông cạnh 4 dm như đề");
    return div(mul(h.dai, h.dai), F(100)); } },
  { has: "Sắp xếp các khối lượng 1,2 kg; 1 kg 25 g; 1 250 g; 1,02 kg theo thứ tự từ bé đến lớn", right: (q) => { const s = dsSau(q, /khối lượng (.+) theo thứ tự/); cungLuaChon(q, s); return s.sort((a, b) => cmp(doi(a, "g"), doi(b, "g"))); } },
  { has: "Quả dưa hấu nặng 3 kg 500 g, quả bưởi nặng 1,25 kg, quả na nặng 0,4 kg", right: (q) => {
    const k = {}; [...q.q.matchAll(/[Qq]uả (dưa hấu|bưởi|na) nặng (\d+(?:,\d+)? kg(?: \d+ g)?|\d+ g)/g)].forEach((m) => (k[m[1]] = doi(m[2], "g"))); assert.deepEqual(Object.keys(k), ["dưa hấu", "bưởi", "na"]);
    return q.o.map((o) => { let m = /^Quả (dưa hấu|bưởi|na) nặng hơn quả (dưa hấu|bưởi|na)\.$/.exec(o); if (m) return cmp(k[m[1]], k[m[2]]) > 0;
      m = /^Quả (dưa hấu|bưởi|na) nặng (.+)\.$/.exec(o); assert.ok(m, "ý lạ: " + o); return eq(doi(m[2], "g"), k[m[1]]); }); } },
  { has: "Ba sợi dây A, B, C dài lần lượt là 1,5 m; 1 m 45 cm; 148 cm", right: (q) => {
    const s = /là (.+)\. Sợi/.exec(q.q)[1].split("; ").map((x) => doi(x, "cm")), i = s.reduce((a, v, k) => (cmp(v, s[a]) > 0 ? k : a), 0);
    assert.equal(s.filter((v) => eq(v, s[i])).length, 1); cungLuaChon(q, ["A", "B", "C"].map((c) => "Sợi dây " + c)); return "Sợi dây " + "ABC"[i]; } },
  /* Làm tròn số thập phân */
  { has: "Làm tròn số 15,38 đến hàng phần mười", right: () => lamTronDe("15,38", "hàng phần mười") },
  { has: "Làm tròn số 0,847 đến hàng phần trăm", right: () => lamTron(fr("0,847"), 2) },
  { has: "Làm tròn số 6,5 đến số tự nhiên gần nhất, ta được 6", right: () => eq(lamTron(fr("6,5"), 0), F(6)) },
  { has: "Nối mỗi số ở cột trái với số làm tròn đến hàng phần mười của nó ở cột phải", right: (q) => {
    const v = q.l.map((l) => lamTronDe(l, "hàng phần mười")); q.r.slice(q.l.length).forEach((r) => assert.ok(!v.includes(r), "ô thừa là số làm tròn của một ô trái: " + r)); return v; } },
  { has: "Trong các số dưới đây, số nào làm tròn đến hàng phần mười được 3,7?", right: (q) => motLuaChon(q, (o) => lamTronDe(o, "hàng phần mười") === "3,7") },
  { has: "Bạn Bình làm tròn số 9,836", right: (q) => { const s = fr("9,836"), xa = (x) => { const v = sub(s, fr(x)); return F(Math.abs(v.n), v.d); };
    return q.o.map((o) => { let m = /^Làm tròn đến (số tự nhiên gần nhất|hàng phần mười|hàng phần trăm), Bình được ([\d,]+)\.$/.exec(o);
      if (m) return eq(fr(m[2]), lamTron(s, HANG_LT[m[1]]));
      m = /^Số 9,836 gần ([\d,]+) hơn gần ([\d,]+)\.$/.exec(o); assert.ok(m, "ý lạ: " + o); return cmp(xa(m[1]), xa(m[2])) < 0; }); } },
  { has: "Bác sĩ đo được Hùng cao 1,456 m", right: () => mul(lamTron(fr("1,456"), 2), F(100)) },
  { has: "để khi làm tròn số 7,?4 đến số tự nhiên gần nhất thì được 8", right: () => String([...Array(10).keys()].find((d) => eq(lamTron(fr("7," + d + "4"), 0), F(8)))) },
  /* Đơn vị đo diện tích */
  { has: "Diện tích của một phòng học khoảng", right: (q) => {
    const s = q.o.map(soDV); assert.ok(s.every(([v, u]) => eq(v, s[0][0]) && LOAI[u] === "rộng") && new Set(s.map((x) => x[1])).size === 4, "các lựa chọn cùng số, khác đơn vị đo diện tích");
    return motLuaChon(q, (o) => { const m2 = doi(o, "m²"); return cmp(m2, F(40)) >= 0 && cmp(m2, F(100)) <= 0; }); } }, // phòng học khoảng 40–100 m²
  { has: "7 ha = ___ m²", right: () => doi("7 ha", "m²") },
  { has: "Đơn vị nào dưới đây thích hợp nhất để đo diện tích một tỉnh?", right: (q) => { assert.ok(q.o.every((o) => LOAI[o] === "rộng")); return q.o.reduce((a, b) => (cmp(DV[b], DV[a]) > 0 ? b : a)); } },
  { has: "Bảng dưới đây ghi một số đơn vị đo diện tích theo thứ tự từ lớn đến bé, còn thiếu một đơn vị", right: (q) => { assert.ok(q.o.every((o) => BANG_DT.includes(o))); return bangDV(q); } },
  { has: "45 000 m² = … ha", right: () => fmtDec(doi("45 000 m²", "ha")) },
  { has: "Một hòn đảo có diện tích 2 700 ha", right: () => doi("2 700 ha", "km²") },
  { has: "Nối mỗi số đo ở cột trái với số mét vuông bằng nó ở cột phải", right: (q) => noiSoDo(q) },
  { has: "4 300 dm² = ___ m²", right: () => doi("4 300 dm²", "m²") },
  { has: "Một cánh đồng hình chữ nhật có chiều dài 600 m, chiều rộng 350 m", right: (q) => {
    const h = hcn(q); assert.ok(h.u === "m" && h.ghiRong && eq(h.dai, F(600)) && eq(h.rong, F(350)), "số đo trong hình khớp đề"); return div(mul(h.dai, h.rong), F(10000)); } },
  { has: "Một trang trại có diện tích 5 ha, được chia thành các phần bằng nhau như hình dưới đây", right: (q) => {
    const { tong, to } = oToMau(q), s = doi("5 ha", "m²");
    assert.deepEqual(q.o.slice(1).map((o) => doi(o, "m²")).map(str), [mul(s, F(tong - to, tong)), mul(s, F(to, tong * 10)), mul(s, F(to * 10, tong))].map(str), "nhiễu: phần không tô, chia nhầm 10");
    return fmtDec(mul(s, F(to, tong))) + " m²"; } },
  { has: "Một bãi đỗ xe hình chữ nhật có chiều dài 60 m, chiều rộng 45 m", right: (q) => {
    const h = hcn(q); assert.ok(h.u === "m" && h.ghiRong && eq(h.dai, F(60)) && eq(h.rong, F(45)), "số đo trong hình khớp đề"); const S = mul(h.dai, h.rong);
    return q.o.map((o) => { let m = /lớn hơn (.+)\.$/.exec(o); if (m) return cmp(S, doi(m[1], "m²")) > 0;
      m = / (?:là|bằng) (.+)\.$/.exec(o); assert.ok(m, "ý lạ: " + o); return eq(doi(m[1], "m²"), S); }); } },
  { has: "Một hồ nuôi cá có diện tích 4 ha", right: () => div(doi("4 ha", "m²"), F(800)) }
];
// cộng, trừ hai phân số khác mẫu số (Bài 6): không mẫu số nào chia hết cho mẫu số kia
function khacMau(a, b) { const x = +a.split("/")[1], y = +b.split("/")[1]; assert.ok(x % y && y % x, `${a} và ${b} phải khác mẫu số, không mẫu số nào chia hết cho mẫu số kia`); }
// làm tròn theo lời của đề → chữ của đáp án (giữ đủ chữ số đến hàng làm tròn)
function lamTronDe(s, hang) { const k = HANG_LT[hang]; assert.ok(k !== undefined, "hàng làm tròn lạ: " + hang); return fmtDec(lamTron(fr(s), k), k); }
// câu nối số đo: mỗi ô trái bằng đúng một ô phải (cùng loại đơn vị), ô thừa không bằng ô trái nào
function noiSoDo(q) {
  const P = q.r.map(soDV), loai = (s) => LOAI[new RegExp("(" + DV_RE + ")$", "u").exec(s.trim())[1]], bang = (l, [v, u]) => LOAI[u] === loai(l) && eq(doi(l, u), v);
  return q.l.map((l) => { const m = q.r.filter((r, i) => bang(l, P[i])); assert.equal(m.length, 1, "ô " + l + " bằng đúng một ô phải: " + m); assert.ok(!q.r.slice(q.l.length).includes(m[0]), "ô thừa bằng ô " + l); return m[0]; });
}
// câu nối theo giá trị (phân số, hỗn số): mỗi ô trái bằng đúng một ô phải, ô thừa không bằng ô trái nào
function noiBang(q, f) {
  return q.l.map((l) => { const m = q.r.filter((r) => eq(f(r), f(l))); assert.equal(m.length, 1, "ô " + l + " bằng đúng một ô phải: " + m); assert.ok(!q.r.slice(q.l.length).includes(m[0]), "ô thừa bằng ô " + l); return m[0]; });
}

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
      if (typeof q.ans === "string") {
        assert.ok(/^\d+\/\d+$/.test(q.ans) && str(fr(q.ans)) === q.ans && fr(q.ans).d > 1, "đáp án phân số viết tối giản: " + q.ans);
        assert.ok(eq(fr(q.ans), want), "đáp án " + q.ans + ", tính được " + str(want)); assert.ok(/Viết kết quả dưới dạng phân số\./.test(q.q), "đề dặn viết kết quả dưới dạng phân số");
        assert.ok(!new RegExp("(^|[^\\d/])" + q.ans.replace("/", "\\/") + "(?![\\d/])").test(q.q), "đáp án " + q.ans + " có sẵn trong đề");
      } else assert.ok(Math.abs(q.ans - toNum(want)) < 1e-9, "đáp án " + q.ans + ", tính được " + fmtDec(want));
      assert.ok(q.tol === undefined, "đáp án tính chính xác, không cần sai số");
    } else if (q.type === "fill") {
      assert.equal(q.ans.length, 1, "câu điền một đáp án");
      if (want && typeof want === "object") assert.ok(/^\d[\d ]*(,\d+)?$/.test(q.ans[0]) && eq(fr(q.ans[0]), want), "đáp án " + q.ans[0] + ", tính được " + fmtDec(want));
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
  } catch (e) { throw new Error(at + ": " + e.message + "\n" + String(e.stack || "").split("\n").slice(1, 3).join("\n")); }
  n++;
});
// số đề, số câu lấy từ danh mục: đề cố định là các đề trong from của đề ngẫu nhiên, mọi đề cố định giữa kì I của file đều ở đó
const pool = bank(POOL), DE = pool.pool.from, mine = pool.questions.filter((q) => q.src === POOL);
assert.deepEqual(BANKS.filter((b) => b.file === "5-toan.js" && /^toan5-gk1-de\d+$/.test(b.id)).map((b) => b.id), DE, "đề cố định giữa kì I nào cũng phải ở from của " + POOL);
for (const id of DE) { const b = bank(id); assert.ok(b, "thiếu " + id); assert.equal(b.questions.length, b.n); run(id, b.questions); }
run(POOL, mine);
assert.equal(dung.size, CHECKS.length, "có mục kiểm tra không khớp câu nào: " + CHECKS.filter((c) => !dung.has(c.has)).map((c) => c.has).join(" | "));
// hình nào cũng được đọc lại; chữ trong hình vừa khung, không đè nhau
const hinh = pool.questions.filter((q) => q.svg);
assert.equal(hinh.filter((q) => hinhDaDoc.has(q.svg)).length, hinh.length, "hình nào cũng được đọc lại");
hinh.forEach((q) => chuHinh(q.svg, q.q.slice(0, 40)));
// phần tô của hình chia phần (L51, PO chốt 26/11/2026): trong một hình, các ô cùng cỡ mà có ô tô, có ô không tô thì ô tô dùng
// fill="acc" fill-opacity="0.6" (tương phản từ 3:1 với nền ở cả sáng và tối), không dùng acc-soft, ok-soft (1,2:1)
const KHONG_TO = ["none", "surface", "bg"];
const phanTo = (svg, ten) => { const nhom = {}; RECTS(svg).forEach((r) => (nhom[r.w + "x" + r.h] = (nhom[r.w + "x" + r.h] || []).concat([r])));
  Object.values(nhom).forEach((R) => { const to = R.filter((r) => !KHONG_TO.includes(r.fill)); if (to.length && to.length < R.length) to.forEach((r) => assert.ok(r.fill === "acc" && r.op === "0.6",
    ten + ": phần tô của hình chia phần dùng fill=\"acc\" fill-opacity=\"0.6\" (L51), đang là " + r.fill + (r.op ? " " + r.op : ""))); }); };
hinh.forEach((q) => phanTo(q.svg, q.q.slice(0, 40)));

/* ---------- chữ, số như sách (Toán 5 tập một in năm 2026, Bài 1–18) ---------- */
const kho = pool.questions;
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null || typeof q.ans === "number" ? [] : [].concat(q.ans), q.l || [], q.r || []).map(String);
kho.forEach((q) => {
  const at = q.src + ": " + q.q.slice(0, 50), T = chu(q).concat(q.svg ? TEXTS(q.svg).map((t) => t.t) : []);
  T.forEach((s) => {
    assert.ok(!/\d\.\d/.test(s), at + ": số thập phân viết dấu phẩy, không dấu chấm: " + s);
    assert.ok(!/(^|[\s(])[−-]\d/.test(s), at + ": không có số âm (lớp 5 chưa học): " + s);
    assert.ok(!/dam²|hm²|dam2|hm2/.test(s), at + ": sách in năm 2026 không dạy dam², hm²: " + s);
    assert.ok(!/\b\d{4,}\b/.test(s.replace(/\d+\/\d+/g, "").replace(/,\d+/g, "")), at + ": số từ bốn chữ số ngăn hàng nghìn bằng khoảng trắng: " + s);
    // Bài 1–18 chưa có phép tính với số thập phân (Chủ đề 4: Bài 19–24); đổi đơn vị đi qua phân số thập phân như Bài 12, 16
    assert.ok(!/\d,\d+ [+−×:] \d|\d [+−×:] \d+,\d/.test(s), at + ": chưa có phép tính với số thập phân (Chủ đề 4): " + s);
  });
  // hỗn số chỉ đổi qua lại với phân số thập phân (Bài 7): mọi “hỗn số = phân số” trong câu có mẫu số 10, 100, 1 000
  if (q.topic === "Hỗn số") T.forEach((s) => [...s.matchAll(/(\d+ \d+\/(\d+)) = (\d+\/(\d+))/g)].forEach((m) => assert.ok(MAU_TP.includes(+m[2]) && m[2] === m[4], at + ": chỉ đổi hỗn số có phần phân số thập phân: " + m[0])));
  // Bài 5 ôn phép cộng, trừ phân số của lớp 4: hai mẫu số bằng nhau hay mẫu số này chia hết cho mẫu số kia (Bài 6 mới dạy trường hợp còn lại)
  if (q.topic === "Ôn tập các phép tính với phân số") T.forEach((s) => [...s.matchAll(/(?<![\d,])\d+\/(\d+) [+−] \d+\/(\d+)/g)].forEach((m) => assert.ok(+m[1] % +m[2] === 0 || +m[2] % +m[1] === 0, at + ": cộng, trừ phân số như lớp 4: " + m[0])));
});

/* ---------- mức độ và ma trận ---------- */
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M), CHU_DE = Object.keys(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => cells.reduce((s, v) => s + v[k], 0)), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(CHU_DE.length, 13, "13 chủ đề");
const nhomCD = (ts) => ts.reduce((s, t) => s + M[t].reduce((a, b) => a + b, 0), 0);
assert.deepEqual([nhomCD(CHU_DE.slice(0, 8)), nhomCD(CHU_DE.slice(8, 12)), nhomCD(CHU_DE.slice(12))], [13, 9, 3],
  "Chủ đề 1 (ôn tập và bổ sung) 13 câu, Chủ đề 2 (số thập phân) 9, Chủ đề 3 (đơn vị đo diện tích) 3");
CHU_DE.forEach((t) => assert.ok(("chu-de:5:toan:" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
assert.deepEqual([...new Set(kho.map((q) => q.topic))].sort(), CHU_DE.slice().sort(), "chủ đề của kho đúng chữ của ma trận");
// chữ chủ đề như kho cuối kì I (đề “Ôn chủ đề” rút chung câu cùng chữ chủ đề): bài đã có ở kho đó dùng đúng chữ của kho đó; bài ôn tập của
// Chủ đề 1 (Bài 1, 2, 3, 5, 8) mang tên bài, chưa có ở đề Toán 5 nào khác
const CK1 = bank("toan5-ck1-ngau-nhien"), CK1_CD = Object.keys(CK1.pool.matrix);
const ON_TAP = ["Ôn tập số tự nhiên", "Ôn tập các phép tính với số tự nhiên", "Ôn tập phân số", "Ôn tập các phép tính với phân số", "Ôn tập hình học và đo lường"];
{ const khac = new Set(BANKS.filter((b) => b.file === "5-toan.js" && !DE.concat(POOL).includes(b.id)).flatMap((b) => b.questions.map((q) => q.topic)));
  CHU_DE.forEach((t) => assert.ok(CK1_CD.includes(t) || (ON_TAP.includes(t) && !khac.has(t)), "chủ đề phải đúng chữ của kho cuối kì I hoặc là bài ôn tập chưa có ở đề Toán 5 khác: " + t));
  assert.deepEqual(CHU_DE.filter((t) => CK1_CD.includes(t)), ["Phân số thập phân", "Cộng, trừ phân số", "Hỗn số", "Số thập phân", "So sánh số thập phân", "Viết số đo dưới dạng số thập phân", "Làm tròn số thập phân", "Đơn vị đo diện tích"], "các bài có ở kho cuối kì I"); }
// mỗi ô rút 1 câu và có đúng 4 câu: một câu ở mỗi đề cố định, hai câu riêng; ô không rút thì không có câu
Object.entries(M).forEach(([t, v]) => v.forEach((k, i) => {
  const have = kho.filter((q) => q.topic === t && q.lv === i + 1);
  assert.ok(k <= 1, `ô (${t}, mức ${i + 1}) rút ${k} câu: mỗi ô rút nhiều nhất 1 câu`);
  if (!k) { assert.equal(have.length, 0, `ô (${t}, mức ${i + 1}) không rút mà kho có ${have.length} câu`); return; }
  assert.deepEqual(DE.concat(POOL).map((s) => have.filter((q) => q.src === s).length), [1, 1, 2], `ô (${t}, mức ${i + 1})`);
}));
const dem = (f) => kho.filter(f).length;
assert.equal(dem((q) => q.type === "essay"), 0, "không có câu tự luận");
assert.ok(dem((q) => q.type === "tf4") >= 5 && dem((q) => q.type === "num") >= 15 && dem((q) => q.type === "fill") >= 15 && dem((q) => q.type === "match") >= 5 && dem((q) => q.type === "order") >= 3 && dem((q) => q.type === "tf") >= 4, "kho đủ dạng câu của tiểu học");
assert.ok(hinh.length >= 10, "kho có ít nhất 10 câu có hình");
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
   kia”. Đáp án là số (từ 10), số thập phân, phân số, hỗn số chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”, “bằng”, “được”);
   cặp nối: câu kia có cả hai vế; đáp án bằng chữ có ở câu kia thì chỉ in ra khi chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi
   ở DA_XEM. ---------- */
const val = (s) => +String(s).replace(/\s/g, "");
const KQ = "(?:=|(?:^|[\\s(])(?:là|bằng|được))\\s+";
const SAU = "(?!\\d|,\\d|\\/|°|%| \\d{3}(?!\\d)|\\s*[·+−×:](?:\\s|\\d|\\())"; // số đứng ngay trước một phép tính là thừa số, số hạng; không cắt số ngăn hàng nghìn (“45 000”)
const soKQ = (s) => [...String(s).matchAll(new RegExp(KQ + "(\\d{1,3}(?: \\d{3})*)" + SAU, "gu"))].map((m) => val(m[1]));
const kqLa = (s, a) => new RegExp(KQ + a.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + SAU, "u").test(s);
const ten = new Map();
DE.forEach((id) => bank(id).questions.forEach((q, i) => ten.set(q.q, id.replace("toan5-gk1-", "") + "#" + (i + 1))));
mine.forEach((q, i) => ten.set(q.q, "own#" + (i + 1)));
const LOI_DAN = [...new Set(DE.concat(POOL).map((id) => bank(id).note))].map((note, i) => ({ q: note, x: "", note: true, ten: "note" + (i + 1) }));
// đáp án của một câu theo từng loại: số (so ở vị trí kết quả), số thập phân, phân số, hỗn số (so ở vị trí kết quả), chữ, cặp nối
const phanDapAn = (q) => {
  const so = [], kq = [], cum = [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
  const them = (a) => { a = String(a);
    const m = /^(\d{1,3}(?: \d{3})*)(?: (\S+))?$/.exec(a);
    if (m && !/^\d\/\d/.test(m[2] || "")) so.push(val(m[1]));
    else if (/^\d[\d ,/]*(?: [^\d\s]+)?$/.test(a)) kq.push(a.replace(/ [^\d\s]+$/, ""));
    else if (a.length >= 2) cum.push(a); };
  if (q.type === "num") them(typeof q.ans === "number" ? fmtDec(F(Math.round(q.ans * 1000), 1000)) : q.ans);
  else if (q.type === "fill") them(q.ans[0]); else if (q.type === "mc") them(q.o[0]);
  return { so, kq, cum, cap };
};
// cungCap(p, q): chỉ xét cặp (câu kia p, câu q) thoả điều kiện (dò với kho cuối kì I: một câu của mỗi kho)
const doLo = (qs, name, notes, cungCap) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    const { so, kq, cum, cap } = phanDapAn(q);
    qs.concat(notes || []).forEach((p) => {
      if (p === q || (cungCap && !cungCap(p, q))) return;
      const C = p.note ? [p.q] : chu(p).concat(p.svg ? TEXTS(p.svg).map((t) => t.t) : []), T = C.map((s) => s.toLowerCase()), at = `${name(p)} lộ đáp án ${name(q)}: `;
      so.filter((x) => x >= 10 && C.flatMap(soKQ).includes(x)).forEach((x) => lo.push(at + x));
      kq.filter((a) => C.some((s) => kqLa(s, a))).forEach((a) => lo.push(at + a));
      cap.filter(([l, r]) => T.some((t) => t.includes(l.toLowerCase()) && t.includes(r.toLowerCase()))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      cum.filter((s) => { const re = new RegExp("(?<![\\p{L}\\p{N}])" + s.toLowerCase().replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + "(?![\\p{L}\\p{N}])", "u"); return T.some((t) => re.test(t)); }).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const tenCau = (q) => (q.note ? q.ten : ten.get(q.q));
const { lo: loDA, chuLo } = doLo(kho, tenCau, LOI_DAN);
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu khác của kho (xem tay):\n" + chuLo.join("\n"));
const DA_XEM = [
  // đáp án là tên đơn vị (đơn vị thích hợp để đo diện tích một tỉnh: km²; ô còn thiếu của bảng đơn vị: ha): câu kia chỉ dùng đơn vị đó trong
  // số đo, không nói đơn vị nào thích hợp hay thứ tự trong bảng
  "own#46 lộ đáp án own#45: km²",
  "own#47 lộ đáp án own#45: km²",
  "de1#23 lộ đáp án own#45: km²",
  "de2#24 lộ đáp án own#45: km²",
  "own#47 lộ đáp án own#46: ha",
  "own#49 lộ đáp án own#46: ha",
  "own#50 lộ đáp án own#46: ha",
  "de1#23 lộ đáp án own#46: ha",
  "de1#24 lộ đáp án own#46: ha",
  "de1#25 lộ đáp án own#46: ha",
  "de2#23 lộ đáp án own#46: ha",
  "de2#24 lộ đáp án own#46: ha",
  "de2#25 lộ đáp án own#46: ha",
  // dòng của tests/soat-nhap.js (dò lộ chặt hơn: cả số dưới 10, chữ số rời trong phân số, hỗn số, tên đơn vị) đã xem tay: thừa số, số đo,
  // phân số của câu khác, không lộ đáp án; câu cuối kì I nói “1 ha”, “mm²” trong đổi đơn vị, không nói đáp án của câu kia
  "toan5-gk1-de1#8 → toan5-gk1-de1#7: 3 10",
  "toan5-gk1-de1#12 → toan5-gk1-de1#7: 3 10",
  "toan5-gk1-de2#10 → toan5-gk1-de2#5: 3 8",
  "toan5-gk1-de2#10 → toan5-gk1-de2#13: 40",
  "toan5-gk1-ngau-nhien#18 → toan5-gk1-ngau-nhien#8: 45",
  "toan5-gk1-ngau-nhien#23 → toan5-gk1-ngau-nhien#11: 4 7",
  "toan5-gk1-ngau-nhien#18 → toan5-gk1-ngau-nhien#26: 15",
  "toan5-gk1-ngau-nhien#15 → toan5-gk1-ngau-nhien#44: 5",
  "toan5-gk1-ngau-nhien#17 → toan5-gk1-ngau-nhien#44: 5",
  "toan5-gk1-ngau-nhien#19 → toan5-gk1-ngau-nhien#44: 5",
  "toan5-gk1-ngau-nhien#20 → toan5-gk1-ngau-nhien#44: 5",
  "toan5-gk1-ngau-nhien#46 → toan5-gk1-ngau-nhien#45: km²",
  "toan5-gk1-ngau-nhien#47 → toan5-gk1-ngau-nhien#45: km²",
  "toan5-gk1-ngau-nhien#47 → toan5-gk1-ngau-nhien#46: ha",
  "toan5-gk1-ngau-nhien#49 → toan5-gk1-ngau-nhien#46: ha",
  "toan5-gk1-ngau-nhien#50 → toan5-gk1-ngau-nhien#46: ha",
  "toan5-gk1-de2#7 → toan5-gk1-de1#7: 3 10",
  "toan5-gk1-de2#14 → toan5-ck1-de2#5: 6",
  "toan5-gk1-ngau-nhien#49 → toan5-gk1-de2#24: 27",
  "toan5-gk1-de2#8 → toan5-gk1-ngau-nhien#15: 5 8",
  "toan5-gk1-ngau-nhien#29 → toan5-ck1-de2#5: 6",
  "toan5-ck1-de1#11 → toan5-gk1-ngau-nhien#45: km²",
  "toan5-ck1-de2#12 → toan5-gk1-ngau-nhien#45: km²",
  "toan5-ck1-ngau-nhien#22 → toan5-gk1-ngau-nhien#45: km²",
  "toan5-ck1-ngau-nhien#23 → toan5-gk1-ngau-nhien#45: km²",
  "toan5-gk1-de1#23 → toan5-gk1-ngau-nhien#45: km²",
  "toan5-gk1-de2#24 → toan5-gk1-ngau-nhien#45: km²",
  "toan5-ck1-de1#11 → toan5-gk1-ngau-nhien#46: ha",
  "toan5-ck1-de1#12 → toan5-gk1-ngau-nhien#46: ha",
  "toan5-ck1-de2#11 → toan5-gk1-ngau-nhien#46: ha",
  "toan5-gk1-ngau-nhien#46 → toan5-ck1-de2#11: mm²",
  "toan5-ck1-de2#12 → toan5-gk1-ngau-nhien#46: ha",
  "toan5-ck1-ngau-nhien#22 → toan5-gk1-ngau-nhien#46: ha",
  "toan5-ck1-ngau-nhien#23 → toan5-gk1-ngau-nhien#46: ha",
  "toan5-ck1-ngau-nhien#24 → toan5-gk1-ngau-nhien#46: ha",
  "toan5-gk1-de1#23 → toan5-gk1-ngau-nhien#46: ha",
  "toan5-gk1-de1#24 → toan5-gk1-ngau-nhien#46: ha",
  "toan5-gk1-de1#25 → toan5-gk1-ngau-nhien#46: ha",
  "toan5-gk1-de2#23 → toan5-gk1-ngau-nhien#46: ha",
  "toan5-gk1-de2#24 → toan5-gk1-ngau-nhien#46: ha",
  "toan5-gk1-de2#25 → toan5-gk1-ngau-nhien#46: ha",
  "toan5-gk1-ngau-nhien#49 → toan5-ck1-ngau-nhien#22: 1 ha",
];
assert.deepEqual(chuLo.filter((s_) => !DA_XEM.includes(s_)), [], "đáp án bằng chữ có ở câu khác của kho đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loDA, [], "lộ đáp án:\n" + loDA.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “bằng 2 542”, “là 3,05 m²”, cả hai vế một cặp nối; số đứng trước phép tính không tính
{ const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const khac = tim("Phân số 7/5 lớn hơn 1"), thuLo = (qs) => doLo(qs, (q) => q.q.slice(0, 10).replace(/:/g, "")).lo.map((s) => s.replace(/^.*? lộ đáp án [^:]*: /, ""));
  assert.deepEqual(thuLo([tim("Giá trị của biểu thức 2 450 + 1 380 : 15"), gia(khac, "Ví dụ: tổng bằng 2 542.")]), ["2542"]);
  assert.deepEqual(thuLo([tim("Giá trị của biểu thức 2 450 + 1 380 : 15"), gia(khac, "Ví dụ 2 542 × 2 = 5 084.")]), []);
  assert.deepEqual(thuLo([tim("3 m² 5 dm² = ___ m²"), gia(khac, "Diện tích là 3,05 m².")]), ["3,05"]);
  assert.deepEqual(thuLo([tim("3 m² 5 dm² = ___ m²"), gia(khac, "Ta có 3,05 m².")]), []);
  assert.deepEqual(thuLo([tim("Nối mỗi hỗn số ở cột trái"), gia(khac, "Ví dụ 1 7/100 = 107/100.")]), ["1 7/100 → 107/100"]); }
// bộ đọc hình bắt được hình vẽ sai: điểm lệch khỏi vạch, số đo không đúng tỉ lệ, cạnh không song song, chữ nhỏ quá
{ const tim = (has) => CHECKS.find((c) => q0(c.has)), q0 = (has) => kho.some((q) => q.q.includes(has) && q.svg), cau = (has) => kho.find((q) => q.q.includes(has));
  const ts = cau("đoạn từ vạch 0 đến vạch 1 gồm 10 phần bằng nhau"), cd = cau("Một cánh đồng hình chữ nhật"), tg = cau("Hình tứ giác ABCD dưới đây"), ps = cau("Phần đã tô màu chiếm bao nhiêu phần");
  const chk = (q) => CHECKS.find((c) => q.q.includes(c.has));
  assert.throws(() => chk(ts).right(Object.assign({}, ts, { svg: ts.svg.replace(/cx="(\d+)"/, (m, x) => `cx="${+x + 6}"`) })), /vạch|nhãn/);
  assert.throws(() => chk(cd).right(Object.assign({}, cd, { svg: cd.svg.replace(">350 m<", ">300 m<") })), /tỉ lệ|khớp/);
  assert.throws(() => chk(tg).right(Object.assign({}, tg, { svg: tg.svg.replace("220,50", "236,62") })), /song song|nhãn/);
  assert.throws(() => chk(ps).right(Object.assign({}, ps, { svg: ps.svg.replace('width="50" height="40"', 'width="54" height="40"') })), /bằng nhau/);
  assert.throws(() => chuHinh(ts.svg.replace(/<text x="(\d+)" y="40"/, '<text x="$1" y="40" font-size="12"'), "thử"), /cỡ 13/);
  assert.throws(() => phanTo(ps.svg.replace(/fill="acc" fill-opacity="0.6"/g, 'fill="acc-soft"'), "thử"), /L51/);
  void tim; }

/* ---------- câu của kho cuối kì I cùng chủ đề (đề “Ôn chủ đề” rút chung): không trùng đáp án, đề bài không gần trùng, không lộ đáp án ----------
   Đề “Ôn chủ đề” (Phiên UX14) rút 10 câu của một chủ đề từ mọi đề Toán 5 có sẵn, nên câu của kho này rút được cùng câu cùng chủ đề của
   kho cuối kì I. Đáp án (lựa chọn đúng, đáp án điền, đáp án số) không trùng đáp án câu cùng chủ đề của kho đó; dò lộ như trên giữa mọi cặp
   câu cùng chủ đề của hai kho (một câu của mỗi kho); chỗ đã xem ghi ở DA_XEM_CHU_DE (như tests/toan9-gk1.js). */
const kho1 = CK1.questions.filter((q) => CK1_CD.includes(q.topic) && CHU_DE.includes(q.topic));
CK1.pool.from.forEach((id) => bank(id).questions.forEach((q, i) => ten.set(q.q, "ck1-" + id.replace("toan5-ck1-", "") + "#" + (i + 1))));
CK1.questions.filter((q) => q.src === CK1.id).forEach((q, i) => ten.set(q.q, "ck1-own#" + (i + 1)));
{ const dapAn = (q) => { const d = q.type === "mc" ? q.o[0] : q.type === "fill" ? q.ans[0] : q.type === "num" ? (typeof q.ans === "number" ? fmtDec(F(Math.round(q.ans * 1000), 1000)) : q.ans) : null; return d == null ? null : String(d).replace(/\s+/g, " ").trim(); };
  const trung = kho.flatMap((q) => { const d = dapAn(q); return d == null ? [] : kho1.filter((p) => p.topic === q.topic && dapAn(p) === d).map((p) => `${ten.get(q.q)} ~ ${ten.get(p.q)}: ${d}`); });
  assert.deepEqual(trung, [], "đáp án trùng câu cùng chủ đề của kho cuối kì I"); }
const laCK1 = (q) => /^ck1-/.test(ten.get(q.q));
const loCD = CHU_DE.flatMap((t) => { const r = doLo(kho.concat(kho1).filter((q) => q.topic === t), (q) => ten.get(q.q), null, (p, q) => laCK1(p) !== laCK1(q)); return r.lo.concat(r.chuLo); });
if (process.env.DO_LO) console.log("Đáp án có ở câu cùng chủ đề của kho cuối kì I (xem tay):\n" + loCD.join("\n"));
// Đã xem tay: câu đổi đơn vị của kho cuối kì I có tên đơn vị km², ha (đề bài không nói đơn vị nào hợp với diện tích một tỉnh, không cho
// thứ tự km², ha, m² của bảng đơn vị); mm² chỉ là lựa chọn sai của câu bảng đơn vị, bảng không có mm² nên không cho biết mm² bé nhất.
const DA_XEM_CHU_DE = [
  "ck1-own#22 lộ đáp án own#45: km²",
  "ck1-own#23 lộ đáp án own#45: km²",
  "ck1-de1#11 lộ đáp án own#45: km²",
  "ck1-de2#12 lộ đáp án own#45: km²",
  "ck1-own#22 lộ đáp án own#46: ha",
  "ck1-own#23 lộ đáp án own#46: ha",
  "ck1-own#24 lộ đáp án own#46: ha",
  "ck1-de1#11 lộ đáp án own#46: ha",
  "ck1-de1#12 lộ đáp án own#46: ha",
  "ck1-de2#11 lộ đáp án own#46: ha",
  "ck1-de2#12 lộ đáp án own#46: ha",
  "own#46 lộ đáp án ck1-de2#11: mm²",
];
assert.deepEqual(loCD, DA_XEM_CHU_DE, "đáp án có ở câu cùng chủ đề của kho cuối kì I đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM_CHU_DE");

/* ---------- không gần trùng câu của kho Toán lớp 4 và câu cùng chủ đề của kho Toán 5 cuối kì I (lời giao việc; Rút ra N25, như
   tests/toan9-gk1.js): đề bài cùng lựa chọn, ô nối, ô sắp xếp có từ 4 cặp từ liền nhau chung với một câu kia và số cặp chung từ một nửa
   số cặp của câu ít cặp hơn thì báo. Cặp từ tính cả số (cùng một dạng bài với số khác không phải là gần trùng); bỏ cách hỏi chung của
   đề Toán (CUM), cặp của nhãn chủ đề và cặp có ở từ 3% số câu đem so. ---------- */
{
  const CUM = ["tính bằng cách thuận tiện", "viết kết quả dưới dạng phân số", "nối mỗi số đo ở cột trái với số đo bằng nó ở cột phải", "nối mỗi", "ở cột trái với", "bằng nó ở cột phải", "ở cột phải",
    "theo thứ tự từ bé đến lớn", "theo thứ tự từ lớn đến bé", "sắp xếp các số", "sắp xếp các phân số", "số thích hợp thay cho dấu", "có bao nhiêu số", "hết bao nhiêu tiền", "chỉ phần đã tô màu", "được chia thành",
    "phần bằng nhau", "mỗi ý sau đúng hay sai", "như hình vẽ", "như thế", "lớn hơn", "bé hơn", "kết quả của phép", "giá trị của biểu thức", "viết số thập phân thích hợp vào chỗ trống",
    "viết số thích hợp vào chỗ trống", "số thập phân thích hợp điền vào chỗ chấm", "số thích hợp điền vào chỗ chấm", "trên tia số dưới đây", "làm tròn số", "đến hàng phần mười",
    "đến hàng phần trăm", "đến số tự nhiên gần nhất", "ta được số", "viết dưới dạng"];
  // số thập phân giữ nguyên một từ ("6,1" không tách thành 6 và 1)
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.slice().sort((a, b) => b.length - a.length).forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/(\d),(?=\d)/g, "$1_").replace(/[^\p{L}\p{N}\s|_]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|") && c.split(" ").some((x) => x.length >= 2)); };
  const cauCua = (file) => BANKS.filter((b) => b.file === file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id));
  const lop4 = cauCua("4-toan.js"), ca = lop4.concat(kho, kho1), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !nhan.has(c) && (df[c] || 0) < 0.03 * ca.length)); };
  const ganTrung = (P) => kho.flatMap((q) => { const c = capAm(q); return P.filter(([p]) => p !== q).map(([p, d]) => { const chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q.q)} ~ ${ten.get(p.q) || p.q.slice(0, 50)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  const g4 = ganTrung(lop4.map((p) => [p, capAm(p)])), g1 = ganTrung(kho1.map((p) => [p, capAm(p)])).filter((s) => { const [a, b] = s.split(": ")[0].split(" ~ "); return kho.find((q) => ten.get(q.q) === a).topic === kho1.find((p) => ten.get(p.q) === b).topic; });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho Toán 4, kho Toán 5 cuối kì I:\n" + g4.concat(g1).join("\n"));
  assert.deepEqual(g4, [], "đề bài gần trùng câu của kho Toán 4");
  assert.deepEqual(g1, [], "đề bài gần trùng câu cùng chủ đề của kho Toán 5 cuối kì I");
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (bỏ dấu, gộp nguyên âm), nếu có ----------
   Chuỗi 8 từ liền nhau của mọi trường chữ (đề bài, lựa chọn, lời giải, chữ trong hình) không có trong sách; cụm từ chung của môn (tên bài,
   tên chủ đề, cách hỏi chuẩn) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ. Số liệu: số riêng của một câu (số thập
   phân, số từ 11 trở lên, trừ 100, 1 000, 10 000; không tính số trong phân số, hỗn số) không có từ ba số cùng ở một trang của Toán 5 tập
   một (dò bối cảnh, số liệu của bài tập, ví dụ trong sách; DO_SACH=1 in các trang có từ hai số chung để xem). */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần (các vòng lặp lồng nhau gọi lại trên cùng chữ; kết quả như cũ)
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
// tra nhanh chuỗi k từ: băm mọi chuỗi k từ của chữ đã chuẩn hoá (một lần cho mỗi chữ, mỗi k), chỉ so thật (includes) khi băm có;
// kết quả như sach.includes(" " + c + " "), ds.filter((o) => o.s.includes(" " + c + " ")) mà không quét lại cả chữ cho mỗi chuỗi
const traChu = (() => {
  const bam = (w, k) => {
    const A = new Uint32Array(w.length), B = new Uint32Array(w.length), n = Math.max(0, w.length - k + 1), H = new Float64Array(n);
    for (let i = 0; i < w.length; i++) { let a = 0x811c9dc5, b = 0x1b873593; const t = w[i]; for (let j = 0; j < t.length; j++) { const x = t.charCodeAt(j); a = Math.imul(a ^ x, 0x01000193); b = Math.imul(b ^ x, 0x5bd1e995); } A[i] = a; B[i] = b; }
    for (let i = 0; i < n; i++) { let a = 0x9e3779b9, b = 0x85ebca6b; for (let j = i; j < i + k; j++) { a = Math.imul(a ^ A[j], 0x01000193); b = Math.imul(b ^ B[j], 0x5bd1e995); } H[i] = (a >>> 0) * 2097152 + (b >>> 11); }
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
const khongDau = nhoChuoi((s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim());
// cụm chung: chữ chủ đề, tên bài, tên chủ đề của sách (Bài 1–18), cách hỏi và cách giải chuẩn của đề Toán
const TU_CHUNG = ["Ôn tập số tự nhiên", "Ôn tập các phép tính với số tự nhiên", "Ôn tập phân số", "Phân số thập phân", "Ôn tập các phép tính với phân số", "Cộng, trừ phân số", "Hỗn số",
  "Ôn tập hình học và đo lường", "Số thập phân", "So sánh số thập phân", "Viết số đo dưới dạng số thập phân", "Làm tròn số thập phân", "Đơn vị đo diện tích",
  "ôn tập và bổ sung", "cộng, trừ hai phân số khác mẫu số", "khái niệm số thập phân", "so sánh các số thập phân", "viết số đo đại lượng dưới dạng số thập phân",
  "một số đơn vị đo diện tích", "các đơn vị đo diện tích", "ki-lô-mét vuông", "héc-ta", "mỗi ý sau đúng hay sai", "viết số thập phân thích hợp vào chỗ trống",
  "viết số thích hợp vào chỗ trống", "số thập phân thích hợp điền vào chỗ chấm", "số thích hợp điền vào chỗ chấm", "thích hợp điền vào chỗ chấm", "theo thứ tự từ bé đến lớn",
  "theo thứ tự từ lớn đến bé", "viết kết quả dưới dạng phân số", "giá trị của biểu thức", "tính bằng cách thuận tiện", "trung bình cộng", "nhân cả tử số và mẫu số với",
  "quy đồng mẫu số với mẫu số chung", "quy đồng mẫu số", "mẫu số chung", "phân số tối giản", "làm tròn số", "đến hàng phần mười", "đến hàng phần trăm",
  "đến số tự nhiên gần nhất", "nên làm tròn lên", "nên làm tròn xuống", "không bé hơn 5", "bé hơn 5", "ở cột trái với", "ở cột phải", "là ô thừa", "phần nguyên",
  "phần thập phân", "phần phân số", "hàng phần mười", "hàng phần trăm", "hàng phần nghìn", "như hình vẽ", "hình chữ nhật", "hình vuông", "trên tia số dưới đây",
  "chữ số hàng đơn vị", "số tự nhiên", "bao nhiêu mét vuông", "bao nhiêu héc-ta", "bao nhiêu ki-lô-gam", "bao nhiêu ki-lô-mét", "bao nhiêu mét"]
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const chuCau = (q) => chu(q).concat(q.svg ? [TEXTS(q.svg).map((t) => t.t).join(" ")] : []);
if (SACH.length) {
  assert.ok(SACH.some((f) => /toan-5-tap-1/.test(f)), "OnUp-Book có Toán 5 tập một");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.map((q) => q).concat(LOI_DAN).flatMap((q) => (q.note ? [q.q] : chuCau(q)).flatMap((s) => chuoi(s, k).filter((c) => traChu.co(sach, c)).map((c) => `${tenCau(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  // số liệu riêng của từng câu so với từng trang của Toán 5 tập một (bỏ trang mục lục: số trang trùng ngẫu nhiên, như tests/toan5-ck2.js)
  const trang = fs.readFileSync(SACH.find((f) => /toan-5-tap-1/.test(f)), "utf8").split(/(?==== page-\d+ · )/)
    .filter((p) => !/MỤC LỤC/.test(p) && (p.match(/\bB\S{0,2}i \d+\./gu) || []).length < 3).map((p) => ({ ten: (/trang in (\d+)/.exec(p) || [])[1], so: new Set((p.match(/\d+(?:[ .]\d{3})*(?:,\d+)?/g) || []).map((x) => x.replace(/[ .](?=\d{3})/g, ""))) }));
  const soRieng = (q) => [...new Set((chuCau(q).join(" ").replace(/\d+ \d+\/\d+|\d+\/\d+/g, " ").match(/\d{1,3}(?: \d{3})+(?:,\d+)?|\d+(?:,\d+)?/g) || []).map((x) => x.replace(/ /g, "")).filter((x) => /,/.test(x) || (+x > 10 && ![100, 1000, 10000].includes(+x))))];
  const soChung = kho.flatMap((q) => { const s = soRieng(q); return trang.map((p) => [p.ten, s.filter((x) => p.so.has(x))]).filter(([, c]) => c.length >= 2).map(([t, c]) => `${ten.get(q.q)} ~ trang ${t}: ${c.join("; ")} (câu có ${s.length} số)`); });
  if (process.env.DO_SACH) console.log("Trang sách có từ hai số liệu chung với một câu (xem tay):\n" + soChung.join("\n"));
  // đã xem tay (Phiên N5-gk1-toan): số chung trùng ngẫu nhiên với trang bài khác: trang 12 (chữ OCR lẫn số của bài tập quy đồng, so sánh
  // phân số khác hẳn), trang 104 (diện tích hình thang: 25 cm, 15 cm, 20 m), trang 83–86 (nhân, chia số thập phân với 0,1; 0,01; 0,001;
  // câu đổi 1 kg ra tấn chỉ có ba số đó)
  const SO_XEM = ["own#18 ~ trang 12: 20; 75; 25 (câu có 5 số)", "own#18 ~ trang 104: 15; 20; 25 (câu có 5 số)",
    "own#35 ~ trang 83: 0,001; 0,01; 0,1 (câu có 3 số)", "own#35 ~ trang 84: 0,001; 0,01; 0,1 (câu có 3 số)", "own#35 ~ trang 85: 0,001; 0,01; 0,1 (câu có 3 số)",
    "own#35 ~ trang 86: 0,001; 0,01; 0,1 (câu có 3 số)", "de2#6 ~ trang 12: 20; 12; 16 (câu có 5 số)", "de2#6 ~ trang 104: 20; 12; 14 (câu có 5 số)"];
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
console.log(n, "câu đã tính lại hoặc đọc lại hình (" + DE.map((id) => bank(id).questions.length).join(" + ") + " câu của " + DE.length + " đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + kho.length + " câu, " + hinh.length + " hình, ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề; đáp án đúng dài nhất ở " + daiNhat + ", ngắn nhất ở " + nganNhat + " trên " + mcs.length + " câu nhiều lựa chọn; " + kho1.length + " câu cùng chủ đề của kho cuối kì I đã so.");
console.log("MATH OK");
