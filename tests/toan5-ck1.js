// Tính lại đáp án ngân hàng Toán 5 cuối kì I (data/banks/5-toan.js): hai đề cố định toan5-ck1-de1, toan5-ck1-de2 và các câu riêng
// của đề ngẫu nhiên toan5-ck1-ngau-nhien (Phiên N5-ck1-toan; Toán 5 tập một, Bài 1–35). Mỗi câu khớp đúng một mục của CHECKS (chữ has
// nằm trong đề bài) rồi so đáp án với kết quả tính bằng code: trắc nghiệm o[0], điền khuyết ans[0] (số so theo giá trị, phân số và chữ
// so chữ), đúng/sai a, đúng/sai 4 ý a (từng ý tính lại), trả lời bằng số ans, nối cột r của từng ô l, sắp xếp o. Phân số, số thập
// phân tính bằng số hữu tỉ chính xác; làm tròn theo quy tắc của sách (chữ số ngay sau hàng làm tròn từ 5 trở lên thì làm tròn lên);
// π lấy 3,14; đổi đơn vị đo độ dài, khối lượng (gấp 10), diện tích (gấp 100; 1 ha = 10 000 m², 1 km² = 100 ha), dung tích (1 l =
// 1 000 ml). Câu có hình: đọc lại hình tam giác, đường cao (vuông góc với đáy, chân đường cao trên đáy hoặc trên đường kéo dài của đáy,
// kí hiệu góc vuông, nét đứt), hình thang, hình thang vuông, hình ghép, hình tròn (tâm, bán kính, đường kính), nửa hình tròn, tia số,
// hình chia phần tô màu; số đo ghi trong hình thuộc đoạn thẳng gần nó nhất, mọi số đo cùng một tỉ lệ (hình vẽ đúng tỉ lệ), số liệu
// trong đề khớp hình; chữ trong hình cỡ từ 13, nằm trọn trong khung, không đè nhau. Rồi kiểm tra như các script lớp 4 cuối năm: ma
// trận (mỗi ô rút 1 câu và có 4 câu: một câu ở mỗi đề cố định, hai câu riêng; rút thử ra đúng 10 Biết, 8 Hiểu, 7 Vận dụng; đã làm hết
// một đề cố định thì không gặp lại câu của đề đó), đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở
// không quá một phần ba số câu nhiều lựa chọn, không lặp chữ của nhãn chủ đề, đúng/sai 4 ý không lặp kiểu Đ/S, không có số âm, số
// thập phân viết dấu phẩy, đề không ghi sẵn 3,14 hay công thức, hỗn số chỉ đổi qua lại với phân số thập phân, không có đơn vị dam²,
// hm² (sách in năm 2026 không dạy), đề bài không trùng câu nào trong data/banks/5-toan.js, không gần trùng câu của data/banks/4-toan.js
// (cặp hai âm tiết chung), dò lộ đáp án giữa mọi cặp câu của kho (đề “Ôn chủ đề” rút chung mọi câu của một chủ đề, đề ngẫu nhiên rút
// chung câu của các chủ đề khác; cả lời dặn của đề) (Rút ra N5, N24, N8, RS9) và, nếu có ../OnUp-Book, so mọi trường chữ với chữ OCR của
// mọi cuốn (không chuỗi 8 từ nào trùng), so số liệu của đề với từng trang Toán 5 tập một (không trang nào có từ ba số liệu riêng của
// một câu), so với câu của mọi kho khác (không chuỗi 8 từ nào trùng). Số đề, số câu lấy từ danh mục.
// Chạy: node tests/toan5-ck1.js → in MATH OK. DO_LO=1 in đáp án bằng chữ có ở câu khác; DO_SACH=1 in chuỗi 6 từ trùng sách và các
// trang có số liệu chung; DO_KHO=1 in chuỗi 6 từ trùng kho khác (để người làm xem).
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "toan5-ck1-ngau-nhien";

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
const PI = F(314, 100);

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
const HANG = ["phần mười", "phần trăm", "phần nghìn"];
// chữ số c (có đúng một lần trong phần thập phân của s) ở hàng nào, giá trị bao nhiêu
const viTri = (s, c) => { const fp = s.split(",")[1], i = fp.indexOf(c); assert.ok(i >= 0 && fp.lastIndexOf(c) === i && !s.split(",")[0].includes(c), `chữ số ${c} phải có đúng một lần, ở phần thập phân của ${s}`); return i; };

/* ---------- hình SVG ---------- */
const nums = (s) => s.trim().split(/[\s,]+/).map(Number);
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const pts2 = (s) => { const v = nums(s), p = []; for (let i = 0; i < v.length; i += 2) p.push([v[i], v[i + 1]]); return p; };
const LINES = (svg) => [...svg.matchAll(/<line [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { a: [+a.x1, +a.y1], b: [+a.x2, +a.y2], dash: !!a["stroke-dasharray"] }; });
const POLYS = (svg) => [...svg.matchAll(/<polygon [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { p: pts2(a.points), fill: a.fill || "none" }; });
const MARKS = (svg) => [...svg.matchAll(/<polyline [^>]*>/g)].map((m) => pts2(attrs(m[0]).points));
const CIRCLES = (svg) => [...svg.matchAll(/<circle [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { c: [+a.cx, +a.cy], r: +a.r, fill: a.fill || "none" }; });
const RECTS = (svg) => [...svg.matchAll(/<rect [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { x: +a.x, y: +a.y, w: +a.width, h: +a.height, fill: a.fill || "none" }; });
const PATHS = (svg) => [...svg.matchAll(/<path [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { d: a.d, fill: a.fill || "none" }; });
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
// P nằm trên đường thẳng AB / trên đoạn thẳng AB (không trùng hai đầu)
const thangHang = (P, A, B) => Math.abs(cross(vsub(B, A), vsub(P, A))) <= 1e-6 * dist(A, B) ** 2;
const trongDoan = (P, A, B) => thangHang(P, A, B) && dot(vsub(P, A), vsub(B, A)) > 0 && dot(vsub(P, B), vsub(A, B)) > 0;
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
// kí hiệu góc vuông ở đỉnh P, giữa tia PA và một trong các tia PB (B lấy trong danh sách): đường gấp khúc ba điểm P + s·u, P + s·u + s·v,
// P + s·v (s từ 6 đến 16 px)
const kiHieuVuong = (svg, P, A, ...Bs) => {
  const coKH = (B) => {
    const u = vsub(A, P), v = vsub(B, P), lu = Math.hypot(...u), lv = Math.hypot(...v);
    return lv > 0 && MARKS(svg).some((m) => m.length === 3 && [[0, 2], [2, 0]].some(([i, j]) => {
      const a = vsub(m[i], P), b = vsub(m[j], P), s = Math.hypot(...a);
      return s >= 6 && s <= 16 && gan(Math.hypot(...b), s, 0.02) && gan(cross(a, u), 0, 1e-3 * s * lu) && dot(a, u) > 0 && gan(cross(b, v), 0, 1e-3 * s * lv) && dot(b, v) > 0 && cung(m[1], [P[0] + a[0] + b[0], P[1] + a[1] + b[1]]);
    }));
  };
  assert.ok(Bs.some(coKH), "thiếu kí hiệu góc vuông ở điểm " + P);
};
// số đo ghi trong hình ("9 cm", "5,5 dm"): mỗi nhãn thuộc đoạn thẳng gần nó nhất trong segs ({AB: [A, B], …}), gần hơn hẳn đoạn kế tiếp
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

// đường cao ứng với đáy XY của hình tam giác (ba đỉnh tam): trong các lựa chọn (đoạn thẳng hai chữ cái), đúng một đoạn đi từ đỉnh đối
// diện với đáy, đầu kia nằm trên đường thẳng XY, vuông góc với XY, được vẽ trong hình và có kí hiệu góc vuông ở chân → đoạn đó
const duongCao = (q, tam, day) => {
  const svg = doc(q), names = [...new Set(tam.concat(...q.o.map((o) => [...o])))], P = diem(svg, names);
  daGiac(svg, P, tam);
  const [X, Y] = [...day], V = tam.find((n) => !day.includes(n)), XY = vsub(P[Y], P[X]);
  const la = q.o.filter((o) => {
    const [a, b] = [...o], F_ = a === V ? b : b === V ? a : null;
    if (!F_ || !thangHang(P[F_], P[X], P[Y]) || !vuong(vsub(P[V], P[F_]), XY) || !coNet(svg, P[V], P[F_])) return false;
    kiHieuVuong(svg, P[F_], P[V], ...[P[X], P[Y]].filter((Q) => !cung(Q, P[F_])));
    return true;
  });
  assert.equal(la.length, 1, "đúng một lựa chọn là đường cao ứng với đáy " + day + ": " + la);
  return { P, h: la[0], V };
};

/* ---------- kiểm tra từng câu: has (chữ có trong đề bài), right(q) (đáp án tính bằng code), more(q) (kiểm tra thêm) ---------- */
// mệnh đề trong ý của câu đúng/sai 4 ý: số đầu tiên sau cụm chữ
const soSau = (s, cum) => { const m = new RegExp(cum + "\\s*(\\d[\\d ]*(?:,\\d+)?(?:\\/\\d+)?)").exec(s); assert.ok(m, `ý “${s}” cần số sau “${cum}”`); return fr(m[1].trim()); };
const motLuaChon = (q, f) => { const m = q.o.filter(f); assert.equal(m.length, 1, "cần đúng một lựa chọn thoả: " + m.join(" | ")); return m[0]; };
const CHECKS = [
  /* Phân số thập phân */
  { has: "Phân số nào dưới đây là phân số thập phân?", right: (q) => motLuaChon(q, (o) => MAU_TP.includes(+o.split("/")[1])) },
  { has: "Phân số 4/5 viết thành phân số thập phân là", right: (q) => motLuaChon(q, (o) => MAU_TP.includes(+o.split("/")[1]) && eq(fr(o), fr("4/5"))) },
  { has: "Phân số thập phân “ba mươi bảy phần nghìn” viết là", right: () => { assert.equal(docN(37), "ba mươi bảy"); return "37/1000"; } },
  { has: "13/25 = …/100", right: () => fmtDec(mul(fr("13/25"), F(100))) },
  /* Hỗn số */
  { has: "Hỗn số 4 3/7 đọc là", right: (q) => { q.o.slice(1).forEach((o) => assert.notEqual(o, docHonSo("4 3/7"))); return docHonSo("4 3/7"); } },
  { has: "Hỗn số 6 5/9 có phần phân số là", right: () => "6 5/9".split(" ")[1] },
  { has: "Mỗi hình chữ nhật dưới đây là một đơn vị, được chia thành 4 phần bằng nhau. Hỗn số chỉ phần đã tô màu", right: (q) => {
    const R = RECTS(doc(q)).sort((a, b) => a.x - b.x), bars = [];
    R.forEach((r) => { const b = bars[bars.length - 1]; if (b && gan(b[b.length - 1].x + b[b.length - 1].w, r.x)) b.push(r); else bars.push([r]); });
    assert.equal(bars.length, 3, "ba hình chữ nhật"); assert.ok(bars.every((b) => b.length === 4 && b.every((r) => r.w === b[0].w && r.h === b[0].h && r.y === b[0].y)), "mỗi hình chia 4 phần bằng nhau");
    assert.ok(bars.every((b) => b[0].w === bars[0][0].w), "các hình bằng nhau");
    const to = bars.map((b) => b.filter((r) => r.fill === "acc-soft").length), du = to.filter((k) => k === 4).length, le = to.filter((k) => k > 0 && k < 4);
    assert.deepEqual(to, to.slice().sort((a, b) => b - a), "tô từ trái sang phải"); assert.equal(le.length, 1, "đúng một hình tô một phần");
    const b = bars[du]; assert.ok(b.slice(0, le[0]).every((r) => r.fill === "acc-soft"), "phần tô màu liền nhau từ trái");
    return du + " " + le[0] + "/4"; } },
  { has: "Hỗn số có phần nguyên là 7 và phần phân số là 2/9", right: () => "7 2/9" },
  { has: "Viết hỗn số dưới dạng phân số thập phân: 5 3/10 = ___", right: () => honSoThanhPS("5 3/10") },
  { has: "Phân số 207/100 viết thành hỗn số là", right: (q) => { q.o.slice(1).forEach((o) => assert.ok(!eq(fr(o), fr("207/100")), "lựa chọn sai bằng đáp án: " + o)); return psThanhHonSo("207/100"); } },
  { has: "Bạn Hà viết các hỗn số thành phân số thập phân như sau", right: (q) => q.o.map((s) => { const [l, r] = s.split(" = "); return honSoThanhPS(l) === r; }) },
  { has: "Viết 2 giờ 15 phút dưới dạng hỗn số", right: (q) => { q.o.slice(1).forEach((o) => assert.ok(!eq(fr(o.replace(" giờ", "")), add(F(2), F(15, 60))), "lựa chọn sai bằng đáp án: " + o)); return "2 " + str(F(15, 60)) + " giờ"; } },
  /* Cộng, trừ phân số (khác mẫu số: không mẫu số nào chia hết cho mẫu số kia, như Bài 6) */
  { has: "Giờ thứ nhất người đó đi được 2/7 quãng đường, giờ thứ hai đi được 1/3 quãng đường", right: () => { khacMau("2/7", "1/3"); return sub(F(1), add(fr("2/7"), fr("1/3"))); } },
  { has: "2/9 số bút là bút màu đỏ, 1/4 số bút là bút màu xanh", right: () => { khacMau("2/9", "1/4"); return sub(F(1), add(fr("2/9"), fr("1/4"))); } },
  { has: "Đội Một sửa được 3/10 quãng đường, đội Hai sửa được 4/7 quãng đường", right: (q) => { khacMau("4/7", "3/10");
    const d = sub(fr("4/7"), fr("3/10")); assert.deepEqual(q.o.slice(1).map((o) => str(fr(o))), [str(add(fr("4/7"), fr("3/10"))), str(sub(F(1), add(fr("4/7"), fr("3/10")))), "1/70"], "nhiễu: hai đội sửa được, phần còn lại, một phần bảy mươi"); return str(d); } },
  { has: "Bình có một sợi dây dài 7/8 m. Lần thứ nhất Bình cắt đi 1/4 m, lần thứ hai cắt đi 1/3 m", right: (q) => {
    const dai = fr("7/8"), c1 = fr("1/4"), c2 = fr("1/3"); khacMau("1/4", "1/3");
    return [eq(soSau(q.o[0], "còn"), sub(dai, c1)), eq(soSau(q.o[1], "cắt đi"), add(c1, c2)), eq(soSau(q.o[2], "còn"), sub(sub(dai, c1), c2)), /ngắn hơn/.test(q.o[3]) === cmp(c2, c1) < 0]; } },
  /* Số thập phân */
  { has: "Số thập phân gồm 5 đơn vị, 3 phần mười và 7 phần nghìn", right: () => fmtDec(ev("5 + 3/10 + 7/1000")) },
  { has: "Trong số thập phân 12,465, chữ số nào thuộc hàng phần trăm?", right: (q) => { const c = "12,465".split(",")[1][HANG.indexOf("phần trăm")]; assert.equal(HANG[viTri("12,465", c)], "phần trăm"); assert.deepEqual(q.o.slice().sort(), [..."12465"].filter((x) => x !== "2").sort(), "lựa chọn là các chữ số của số đó"); return c; } },
  { has: "Số thập phân “hai mươi phẩy không tám” viết là", right: () => { assert.equal(docTP("20,08"), "hai mươi phẩy không tám"); return fr("20,08"); } },
  { has: "Phân số thập phân 239/100 viết thành số thập phân là", right: () => fmtDec(fr("239/100")) },
  { has: "Xét số thập phân 305,26", right: (q) => [+"305,26".split(",")[0] === +soSau(q.o[0], "là").n, /thuộc hàng phần mười/.test(q.o[1]) && HANG[viTri("305,26", "2")] === "phần mười",
    eq(soSau(q.o[2], "giá trị là"), F(6, 10 ** (viTri("305,26", "6") + 1))), q.o[3] === "Số đó đọc là: " + docTP("305,26") + "."] },
  { has: "Viết 3 + 5/10 + 8/1000 thành số thập phân", right: () => fmtDec(ev("3 + 5/10 + 8/1000")) },
  { has: "Đoạn từ 3 đến 4 trên tia số dưới đây được chia thành 10 phần bằng nhau. Số thập phân ứng với điểm A", right: (q) => {
    const svg = doc(q), L = LINES(svg), truc = L.filter((l) => l.a[1] === l.b[1]).sort((a, b) => Math.abs(b.b[0] - b.a[0]) - Math.abs(a.b[0] - a.a[0]))[0], y = truc.a[1];
    const vach = L.filter((l) => l.a[0] === l.b[0] && Math.min(l.a[1], l.b[1]) < y && Math.max(l.a[1], l.b[1]) > y).map((l) => ({ x: l.a[0], dai: Math.abs(l.b[1] - l.a[1]) })).sort((a, b) => a.x - b.x);
    const T = TEXTS(svg), so = (s) => { const t = T.filter((x) => x.t === s); assert.equal(t.length, 1); const v = vach.filter((v) => Math.abs(v.x - t[0].at[0]) < 1); assert.equal(v.length, 1, "số " + s + " ghi dưới một vạch"); return v[0]; };
    const v3 = so("3"), v4 = so("4"), giua = vach.filter((v) => v.x > v3.x && v.x < v4.x);
    assert.equal(giua.length, 9, "10 phần bằng nhau"); [v3].concat(giua, [v4]).forEach((v, i) => assert.ok(gan(v.x, v3.x + i * (v4.x - v3.x) / 10, 1e-9), "các vạch cách đều"));
    assert.ok(v3.dai > giua[0].dai && v4.dai > giua[0].dai, "vạch có số dài hơn");
    const A = CIRCLES(svg).filter((c) => c.fill === "acc"); assert.equal(A.length, 1); assert.equal(A[0].c[1], y, "điểm A nằm trên tia số");
    const lA = T.find((t) => t.t === "A"); assert.ok(Math.abs(lA.at[0] - A[0].c[0]) < 1, "nhãn A ngay trên điểm A");
    const k = (A[0].c[0] - v3.x) / (v4.x - v3.x) * 10; assert.ok(gan(k, Math.round(k), 1e-9) && k > 0 && k < 10, "A ở đúng một vạch");
    return add(F(3), F(Math.round(k), 10)); } },
  { has: "Giá trị của chữ số 4 trong số 26,534 là", right: () => "4/" + 10 ** (viTri("26,534", "4") + 1) },
  /* So sánh số thập phân */
  { has: "Chọn dấu thích hợp: 18,5 … 18,49", right: () => [">", "=", "<"][1 - cmp(fr("18,5"), fr("18,49"))] },
  { has: "Số lớn nhất trong các số 4,07; 4,7; 4,069; 4,071", right: (q) => { const s = /các số (.+) là/.exec(q.q)[1].split("; "); assert.deepEqual(s.slice().sort(), q.o.slice().sort(), "lựa chọn là các số đã cho"); return s.reduce((a, b) => (cmp(fr(b), fr(a)) > 0 ? b : a)); } },
  { has: "Số thập phân nào dưới đây bằng 7,3?", right: (q) => motLuaChon(q, (o) => eq(fr(o), fr("7,3"))) },
  { has: "0,9 < 0,85", right: () => cmp(fr("0,9"), fr("0,85")) < 0 },
  { has: "Thời gian chạy của An là 10,25 giây", right: (q) => { const t = [...q.q.matchAll(/của (\p{Lu}\p{Ll}+) là ([\d,]+) giây/gu)].map((m) => [m[1], fr(m[2])]); assert.equal(t.length, 4); assert.deepEqual(t.map((x) => x[0]).sort(), q.o.slice().sort()); return t.reduce((a, b) => (cmp(b[1], a[1]) < 0 ? b : a))[0]; } },
  { has: "Thay dấu ? bằng một chữ số để có 6,4?8 > 6,478, biết chữ số đó bé hơn 9", right: () => { const c = [0, 1, 2, 3, 4, 5, 6, 7, 8].filter((d) => cmp(fr("6,4" + d + "8"), fr("6,478")) > 0); assert.equal(c.length, 1); return String(c[0]); } },
  { has: "Bốn bao gạo cân nặng lần lượt là 25,5 kg; 25,05 kg; 24,95 kg; 25,15 kg", right: (q) => { const s = /là (.+)\. Xếp/.exec(q.q)[1].split("; "); assert.deepEqual(s.slice().sort(), q.o.slice().sort()); return s.sort((a, b) => cmp(doi(a, "kg"), doi(b, "kg"))); } },
  { has: "Có bao nhiêu số tự nhiên lớn hơn 2,9 và bé hơn 6,1?", right: () => String([...Array(10).keys()].filter((k) => cmp(F(k), fr("2,9")) > 0 && cmp(F(k), fr("6,1")) < 0).length) },
  /* Viết số đo dưới dạng số thập phân */
  { has: "7 m 9 cm = ___ m", right: () => doi("7 m 9 cm", "m") },
  { has: "9 kg 40 g = ___ kg", right: () => doi("9 kg 40 g", "kg") },
  { has: "3 tấn 60 kg = … tấn", right: () => fmtDec(doi("3 tấn 60 kg", "tấn")) },
  { has: "Nối mỗi số đo ở cột trái với số đo bằng nó ở cột phải", right: (q) => noiSoDo(q) },
  /* Làm tròn số thập phân */
  { has: "Làm tròn số 27,46 đến hàng phần mười", right: () => lamTronDe("27,46", "hàng phần mười") },
  { has: "Làm tròn số 8,72 đến số tự nhiên gần nhất", right: () => lamTronDe("8,72", "số tự nhiên gần nhất") },
  { has: "Làm tròn số 3,264 đến hàng phần trăm", right: () => lamTron(fr("3,264"), 2) },
  { has: "Một sợi dây dài 4,175 m. Làm tròn số đo đó đến hàng phần trăm", right: () => lamTronDe("4,175", "hàng phần trăm") + " m" },
  /* Đơn vị đo diện tích */
  { has: "1 km² = … ha", right: () => fmtDec(doi("1 km²", "ha")) },
  { has: "Trong các đơn vị đo diện tích dưới đây, đơn vị nào bé nhất?", right: (q) => { assert.ok(q.o.every((o) => LOAI[o] === "rộng"), "lựa chọn là đơn vị đo diện tích"); return q.o.reduce((a, b) => (cmp(DV[b], DV[a]) < 0 ? b : a)); } },
  { has: "7 m² = ___ dm²", right: () => doi("7 m²", "dm²") },
  { has: "Một khu đất hình vuông có cạnh dài 100 m. Diện tích khu đất đó là", right: (q) => motLuaChon(q, (o) => eq(doi(o, "m²"), mul(F(100), F(100)))) },
  { has: "4 ha 30 m² = ___ m²", right: () => doi("4 ha 30 m²", "m²") },
  { has: "2 km² 15 ha = … ha", right: () => fmtDec(doi("2 km² 15 ha", "ha")) },
  { has: "Một khu rừng có diện tích 5,2 km²", right: () => doi("5,2 km²", "ha") },
  { has: "Nối mỗi số đo diện tích ở cột trái với số đo bằng nó ở cột phải", right: (q) => noiSoDo(q) },
  /* Cộng, trừ số thập phân */
  { has: "35,8 + 7,46 = ___", right: () => ev("35,8 + 7,46") },
  { has: "50,2 − 18,75 = ___", right: () => ev("50,2 − 18,75") },
  { has: "Kết quả của phép tính 26,07 + 13,9 là", right: (q) => { assert.equal(q.o[1], fmtDec(ev("26,07 + 1,39")), "nhiễu: đặt chữ số không thẳng hàng"); return fmtDec(ev("26,07 + 13,9")); } },
  { has: "Tính: 100 − 37,25", right: () => ev("100 − 37,25") },
  { has: "Tính bằng cách thuận tiện: 6,85 + 2,37 + 3,15 + 4,63", right: (q) => { assert.ok(q.x.includes("(6,85 + 3,15) + (2,37 + 4,63) = 10 + 7")); assert.ok(eq(ev("6,85 + 3,15"), F(10)) && eq(ev("2,37 + 4,63"), F(7))); return ev("6,85 + 2,37 + 3,15 + 4,63"); } },
  { has: "Quãng đường từ nhà Minh đến nhà bà dài 18,6 km. Minh đi xe đạp: giờ thứ nhất đi được 6,75 km, giờ thứ hai đi được 6,45 km", right: (q) => {
    const AB = fr("18,6"), g1 = fr("6,75"), g2 = fr("6,45"), con = sub(AB, add(g1, g2));
    return [eq(soSau(q.o[0], "đi được"), add(g1, g2)), eq(soSau(q.o[1], "giờ thứ hai"), sub(g1, g2)), eq(soSau(q.o[2], "phải đi"), con), /dài hơn/.test(q.o[3]) === cmp(con, g2) > 0]; } },
  { has: "Một hình tam giác có chu vi 24,6 cm. Cạnh thứ nhất dài 8,25 cm, cạnh thứ hai dài 9,1 cm", right: () => fmtDec(ev("24,6 − (8,25 + 9,1)")) + " cm" },
  { has: "Một can có 12,5 l dầu. Lần thứ nhất người ta lấy ra 3,75 l, lần thứ hai lấy ra nhiều hơn lần thứ nhất 1,2 l", right: () => ev("12,5 − (3,75 + (3,75 + 1,2))") },
  /* Nhân số thập phân */
  { has: "4,25 × 2,8 = ___", right: () => ev("4,25 × 2,8") },
  { has: "Một thùng có 24 hộp sữa, mỗi hộp nặng 0,35 kg", right: () => ev("0,35 × 24") },
  { has: "Mỗi phép nhân sau đúng hay sai?", right: (q) => q.o.map(dungPT) },
  { has: "Mỗi ki-lô-gam nho giá 85 000 đồng. Mẹ mua 2,4 kg nho", right: () => ev("85 000 × 2,4") },
  /* Chia số thập phân */
  { has: "9,52 : 2,8 = ___", right: () => ev("9,52 : 2,8") },
  { has: "21 : 0,6 = ?", right: () => fmtDec(ev("21 : 0,6")) },
  { has: "22,4 : 7 = ___", right: () => ev("22,4 : 7") },
  { has: "Tìm số thích hợp thay cho dấu ?: ? × 1,5 = 7,2", right: () => { const v = ev("7,2 : 1,5"); assert.ok(eq(mul(v, fr("1,5")), fr("7,2"))); return v; } },
  { has: "Cô Hoa pha được 13,5 l nước chanh và rót đều vào các cốc, mỗi cốc 0,3 l", right: () => ev("13,5 : 0,3") },
  { has: "2 giờ đầu đi được 70,4 km, 3 giờ sau đi được 101,6 km", right: () => ev("(70,4 + 101,6) : (2 + 3)") },
  { has: "Một cửa hàng có 3 thùng nước giặt, mỗi thùng chứa 25 l. Người ta rót hết số nước giặt đó vào các chai, mỗi chai 0,6 l", right: () => ev("25 × 3 : 0,6") },
  { has: "Mua 2,5 m dây ruy băng hết 17 500 đồng. Hỏi mua 6 m dây ruy băng", right: (q) => {
    assert.deepEqual(q.o.slice(1), [fmtDec(ev("17 500 : 2,5")) + " đồng", fmtDec(ev("17 500 × 2,5")) + " đồng", fmtDec(ev("17 500 × 6")) + " đồng"], "nhiễu: giá 1 m, nhân thay vì chia, quên chia");
    return fmtDec(ev("17 500 : 2,5 × 6")) + " đồng"; } },
  /* Nhân, chia với 10; 100; 1 000; 0,1; 0,01; 0,001 */
  { has: "3,457 × 100 = ___", right: () => ev("3,457 × 100") },
  { has: "52,8 : 10 = ___", right: () => ev("52,8 : 10") },
  { has: "1,46 × 0,1 = ?", right: () => fmtDec(ev("1,46 × 0,1")) },
  { has: "Nối mỗi phép tính ở cột trái với kết quả của nó ở cột phải", right: (q) => { const k = q.l.map((e) => fmtDec(ev(e))); q.r.slice(q.l.length).forEach((x) => assert.ok(!k.includes(x), "ô thừa là kết quả của một phép tính")); return k; } },
  /* Hình tam giác */
  { has: "Trong hình tam giác ABC dưới đây, đường cao ứng với đáy BC là", right: (q) => { const { P, h } = duongCao(q, ["A", "B", "C"], "BC"); assert.ok(trongDoan(P.H, P.B, P.C), "hình tam giác nhọn: chân đường cao nằm trên cạnh BC"); return h; } },
  { has: "Hình tam giác MNP dưới đây có góc N là góc tù. Đường cao ứng với đáy NP là", right: (q) => {
    const { P, h } = duongCao(q, ["M", "N", "P"], "NP");
    assert.ok(dot(vsub(P.M, P.N), vsub(P.P, P.N)) < 0, "góc N tù"); assert.ok(trongDoan(P.N, P.K, P.P), "chân đường cao K ở trên đường kéo dài của đáy, về phía N");
    assert.ok(coNet(q.svg, P.N, P.K, true), "đoạn kéo dài NK vẽ nét đứt"); return h; } },
  { has: "Hình tam giác PQR dưới đây có góc vuông ở đỉnh P. Đường cao ứng với đáy PQ là", right: (q) => { const { h } = duongCao(q, ["P", "Q", "R"], "PQ"); return h; } },
  { has: "Hình tam giác ABC có góc A là góc tù. Hình tam giác ABC là", right: () => "Hình tam giác tù" },
  { has: "Hình tam giác DEG có đáy EG = 15 cm, chiều cao DH = 8 cm. Điểm M nằm trên cạnh EG và MG = 6 cm", right: (q) => {
    const svg = doc(q), P = diem(svg, ["D", "E", "G", "H", "M"]);
    daGiac(svg, P, ["D", "E", "G"], "none"); daGiac(svg, P, ["D", "E", "M"], "acc-soft");
    assert.ok(trongDoan(P.H, P.E, P.G) && trongDoan(P.M, P.E, P.G), "H, M nằm trên cạnh EG"); assert.ok(vuong(vsub(P.D, P.H), vsub(P.G, P.E)), "DH vuông góc với EG");
    assert.ok(coNet(svg, P.D, P.H, true), "DH nét đứt"); kiHieuVuong(svg, P.H, P.D, P.E, P.G);
    const [eg, dh, mg] = /đáy EG = (\d+) cm, chiều cao DH = (\d+) cm.*MG = (\d+) cm/.exec(q.q).slice(1).map(Number), k = dist(P.E, P.G) / eg;
    assert.ok(gan(dist(P.D, P.H) / k, dh, 1e-3) && gan(dist(P.M, P.G) / k, mg, 1e-3), "hình đúng tỉ lệ với số liệu trong đề");
    return div(mul(F(eg - mg), F(dh)), F(2)); } },
  { has: "Một lá cờ đuôi nheo hình tam giác có diện tích 13,5 dm², cạnh đáy dài 4,5 dm", right: () => { const h = ev("13,5 × 2 : 4,5"); assert.ok(eq(div(mul(fr("4,5"), h), F(2)), fr("13,5"))); return h; } },
  { has: "Một mảnh đất hình tam giác có độ dài đáy là 24,5 m, chiều cao bằng 4/7 độ dài đáy", right: () => { const a = fr("24,5"), h = mul(a, fr("4/7")); return div(mul(a, h), F(2)); } },
  { has: "hai cạnh góc vuông dài 15 cm và 12 cm. Nam dán giấy màu kín cả hai mặt", right: () => mul(ev("15 × 12 : 2"), F(2)) },
  /* Hình thang */
  { has: "Tính diện tích hình thang ABCD (như hình vẽ).", right: (q) => {
    const svg = doc(q), P = diem(svg, ["A", "B", "C", "D", "K"]); daGiac(svg, P, ["A", "B", "C", "D"], "none");
    assert.ok(songSong(vsub(P.B, P.A), vsub(P.C, P.D)), "AB song song với DC"); assert.ok(!songSong(vsub(P.D, P.A), vsub(P.C, P.B)), "hai cạnh bên không song song");
    assert.ok(trongDoan(P.K, P.D, P.C) && vuong(vsub(P.B, P.K), vsub(P.C, P.D)) && coNet(svg, P.B, P.K, true), "BK là đường cao (nét đứt)"); kiHieuVuong(svg, P.K, P.B, P.D, P.C);
    const { so } = soDo(svg, { AB: [P.A, P.B], BC: [P.B, P.C], DC: [P.D, P.C], AD: [P.A, P.D], BK: [P.B, P.K] });
    assert.deepEqual(Object.keys(so).sort(), ["AB", "BK", "DC"]); return div(mul(add(so.AB, so.DC), so.BK), F(2)); } },
  { has: "Tính diện tích hình thang vuông EGHK (như hình vẽ).", right: (q) => {
    const svg = doc(q), P = diem(svg, ["E", "G", "H", "K"]); daGiac(svg, P, ["E", "G", "H", "K"], "none");
    const EG = vsub(P.G, P.E), KH = vsub(P.H, P.K), EK = vsub(P.K, P.E);
    assert.ok(songSong(EG, KH) && vuong(EK, EG) && vuong(EK, KH), "hình thang vuông: EK vuông góc với hai đáy"); kiHieuVuong(svg, P.E, P.G, P.K); kiHieuVuong(svg, P.K, P.E, P.H);
    const { so, u } = soDo(svg, { EG: [P.E, P.G], GH: [P.G, P.H], KH: [P.K, P.H], EK: [P.E, P.K] });
    assert.deepEqual(Object.keys(so).sort(), ["EG", "EK", "KH"]);
    const S = div(mul(add(so.EG, so.KH), so.EK), F(2));
    assert.deepEqual(q.o.slice(1), [mul(add(so.EG, so.KH), so.EK), div(mul(mul(so.EG, so.KH), so.EK), F(2)), add(add(so.EG, so.KH), so.EK)].map((v) => fmtDec(v) + " " + u + "²"), "nhiễu: quên chia 2, nhân hai đáy, cộng ba số");
    return fmtDec(S) + " " + u + "²"; } },
  { has: "Quan sát hình thang ABCD dưới đây. Mỗi ý sau đúng hay sai?", right: (q) => {
    const svg = doc(q), P = diem(svg, ["A", "B", "C", "D"]); daGiac(svg, P, ["A", "B", "C", "D"], "none");
    const AB = vsub(P.B, P.A), DC = vsub(P.C, P.D), AD = vsub(P.D, P.A), BC = vsub(P.C, P.B);
    kiHieuVuong(svg, P.A, P.B, P.D); kiHieuVuong(svg, P.D, P.A, P.C);
    const { so } = soDo(svg, { AB: [P.A, P.B], BC: [P.B, P.C], DC: [P.D, P.C], AD: [P.A, P.D] });
    assert.deepEqual(Object.keys(so).sort(), ["AB", "AD", "DC"]);
    return [songSong(AB, DC) && !songSong(AD, BC), vuong(AD, AB) && vuong(AD, DC), songSong(BC, AD), eq(soSau(q.o[3], "là"), div(mul(add(so.AB, so.DC), so.AD), F(2)))]; } },
  { has: "Một hình thang có tổng độ dài hai đáy là 15,6 m và chiều cao là 5 m", right: () => ev("15,6 × 5 : 2") },
  { has: "Hình thang ABCD gồm hình chữ nhật ABHD và hình tam giác BHC", right: (q) => {
    const svg = doc(q), P = diem(svg, ["A", "B", "C", "D", "H"]); daGiac(svg, P, ["A", "B", "C", "D"], "none"); daGiac(svg, P, ["B", "H", "C"], "acc-soft");
    assert.ok(trongDoan(P.H, P.D, P.C), "H nằm trên DC"); assert.ok(coNet(svg, P.B, P.H, false), "BH vẽ nét liền");
    assert.ok(vuong(vsub(P.B, P.A), vsub(P.D, P.A)) && vuong(vsub(P.C, P.D), vsub(P.A, P.D)) && vuong(vsub(P.B, P.H), vsub(P.D, P.H)), "ABHD là hình chữ nhật");
    kiHieuVuong(svg, P.A, P.B, P.D); kiHieuVuong(svg, P.D, P.A, P.C); kiHieuVuong(svg, P.H, P.D, P.B);
    const { so, k } = soDo(svg, { AB: [P.A, P.B], BH: [P.B, P.H], HC: [P.H, P.C], DH: [P.D, P.H], AD: [P.A, P.D], BC: [P.B, P.C] });
    assert.deepEqual(Object.keys(so).sort(), ["AB", "HC"]);
    const sBHC = fr(/diện tích hình tam giác BHC là ([\d,]+) cm²/.exec(q.q)[1]), bh = div(mul(sBHC, F(2)), so.HC);
    assert.ok(gan(dist(P.B, P.H) / k, toNum(bh), 1e-3), "chiều cao BH trong hình đúng tỉ lệ với diện tích đã cho");
    return div(mul(add(so.AB, add(so.AB, so.HC)), bh), F(2)); } },
  { has: "Một thửa đất hình thang có đáy lớn 32 m, đáy bé bằng 3/4 đáy lớn, chiều cao 18 m", right: () => { const be = mul(F(32), fr("3/4")); return mul(div(mul(add(F(32), be), F(18)), F(2)), fr("0,8")); } },
  { has: "Một hình thang có diện tích 52,5 cm², độ dài hai đáy là 9 cm và 6 cm", right: () => ev("52,5 × 2 : (9 + 6)") },
  { has: "miệng kênh rộng 2,8 m, đáy kênh rộng 1,6 m, kênh sâu 0,9 m", right: (q) => {
    assert.deepEqual(q.o.slice(1), [ev("(2,8 + 1,6) × 0,9"), ev("2,8 × 1,6 × 0,9 : 2"), ev("(2,8 − 1,6) × 0,9 : 2")].map((v) => fmtDec(v) + " m²"), "nhiễu: quên chia 2, nhân hai đáy, trừ hai đáy");
    return fmtDec(ev("(2,8 + 1,6) × 0,9 : 2")) + " m²"; } },
  /* Hình tròn (C = 3,14 × d; S = 3,14 × r × r) */
  { has: "Trong hình tròn tâm O dưới đây, đoạn thẳng nào là đường kính?", right: (q) => {
    const svg = doc(q), lon = CIRCLES(svg).filter((c) => c.r > 5); assert.equal(lon.length, 1);
    const P = diem(svg, ["O", "A", "G", "H", "D", "E"]); assert.ok(cung(P.O, lon[0].c), "O là tâm");
    const tren = (n) => Math.abs(dist(P[n], P.O) - lon[0].r) < 0.6;
    ["A", "G", "H", "D", "E"].forEach((n) => assert.ok(tren(n), n + " nằm trên đường tròn"));
    ["OA", "GH", "DE"].forEach((s) => assert.ok(coNet(svg, P[s[0]], P[s[1]]), "có đoạn thẳng " + s));
    const dk = q.o.filter((s) => tren(s[0]) && tren(s[1]) && trongDoan(P.O, P[s[0]], P[s[1]])); assert.equal(dk.length, 1, "đúng một đường kính");
    assert.ok(q.o.filter((s) => s.includes("O")).every((s) => tren(s.replace("O", ""))), "lựa chọn có O là bán kính"); return dk[0]; } },
  { has: "Một hình tròn có bán kính 3,5 cm. Đường kính của hình tròn đó là", right: () => fmtDec(mul(fr("3,5"), F(2))) + " cm" },
  { has: "Dụng cụ nào dưới đây dùng để vẽ đường tròn?", right: () => "com pa" },
  { has: "Hình tròn tâm O có hai bán kính OA và OB. Đoạn thẳng OA dài bằng đoạn thẳng OB.", right: () => true },
  { has: "Tính chu vi của hình tròn có đường kính 4,5 dm.", right: () => mul(PI, fr("4,5")) },
  { has: "Tính diện tích của hình tròn có bán kính 9 dm.", right: () => mul(PI, mul(F(9), F(9))) },
  { has: "Chu vi của hình tròn có bán kính 2,5 m là", right: (q) => {
    const r = fr("2,5"); assert.deepEqual(q.o.slice(1), [mul(PI, r), mul(PI, mul(r, r)), mul(r, F(2))].map((v) => fmtDec(v) + " m"), "nhiễu: quên nhân 2, diện tích, đường kính");
    return fmtDec(mul(mul(PI, r), F(2))) + " m"; } },
  { has: "Diện tích của hình tròn có đường kính 12 cm là", right: () => { const r = div(F(12), F(2)); return mul(PI, mul(r, r)); } },
  { has: "thước đo đường dạng bánh xe dọc theo mép sân trường. Bánh xe của thước có đường kính 0,4 m và quay được đúng 60 vòng", right: () => mul(mul(PI, fr("0,4")), F(60)) },
  { has: "Một hình chữ nhật dài 10 cm, rộng 5 cm. Bên trong có hai hình tròn bằng nhau", right: (q) => {
    const svg = doc(q), R = RECTS(svg); assert.equal(R.length, 1); const r = R[0]; assert.equal(r.fill, "acc-soft");
    const C = CIRCLES(svg); assert.equal(C.length, 2); assert.ok(C.every((c) => c.fill === "surface" && c.r === C[0].r), "hai hình tròn bằng nhau, không tô màu");
    const [c1, c2] = C.sort((a, b) => a.c[0] - b.c[0]);
    assert.ok(gan(dist(c1.c, c2.c), 2 * c1.r) && gan(c1.c[0] - c1.r, r.x) && gan(c2.c[0] + c2.r, r.x + r.w) && C.every((c) => gan(c.c[1] - c.r, r.y) && gan(c.c[1] + c.r, r.y + r.h)), "hai hình tròn chạm nhau và chạm các cạnh");
    const g = [[r.x, r.y], [r.x + r.w, r.y], [r.x + r.w, r.y + r.h], [r.x, r.y + r.h]];
    const { so, u, k } = soDo(svg, { tren: [g[0], g[1]], phai: [g[1], g[2]], duoi: [g[3], g[2]], trai: [g[0], g[3]] }); assert.equal(u, "cm");
    assert.deepEqual(Object.keys(so).sort(), ["duoi", "phai"]); assert.ok(gan(r.w / k, toNum(fr("10"))) && gan(r.h / k, toNum(fr("5"))), "kích thước trong hình khớp đề");
    const rr = F(Math.round(c1.r / k * 1000), 1000); assert.ok(gan(toNum(rr), c1.r / k, 1e-9));
    return sub(mul(so.duoi, so.phai), mul(F(2), mul(PI, mul(rr, rr)))); } },
  { has: "Một tấm biển gỗ gồm phần dưới là hình chữ nhật, phần trên là nửa hình tròn", right: (q) => {
    const svg = doc(q), R = RECTS(svg); assert.equal(R.length, 1); const r = R[0], Pa = PATHS(svg); assert.equal(Pa.length, 1);
    const m = /^M (\d+) (\d+) A (\d+) (\d+) 0 0 1 (\d+) (\d+) Z$/.exec(Pa[0].d); assert.ok(m, "nửa hình tròn vẽ bằng một cung");
    const [x1, y1, rx, ry, x2, y2] = m.slice(1).map(Number);
    assert.ok(x1 === r.x && x2 === r.x + r.w && y1 === r.y && y2 === r.y && rx === ry && 2 * rx === r.w, "nửa hình tròn có đường kính là cạnh trên của hình chữ nhật, nằm phía trên");
    const g = [[r.x, r.y], [r.x + r.w, r.y], [r.x + r.w, r.y + r.h], [r.x, r.y + r.h]];
    const { so, u } = soDo(svg, { tren: [g[0], g[1]], phai: [g[1], g[2]], duoi: [g[3], g[2]], trai: [g[0], g[3]] }); assert.equal(u, "m");
    assert.deepEqual(Object.keys(so).sort(), ["duoi", "phai"]); const bk = div(so.duoi, F(2));
    return add(mul(so.duoi, so.phai), div(mul(PI, mul(bk, bk)), F(2))); } },
  { has: "Một bồn hoa hình tròn có chu vi 47,1 m. Bán kính", right: (q) => {
    const d = div(fr("47,1"), PI); assert.deepEqual(q.o.slice(1), [d, div(fr("47,1"), F(2)), div(d, F(4))].map((v) => fmtDec(v) + " m"), "nhiễu: đường kính, nửa chu vi, nửa bán kính");
    return fmtDec(div(d, F(2))) + " m"; } }
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
    if (c.more) c.more(q);
  } catch (e) { throw new Error(at + ": " + e.message + "\n" + String(e.stack || "").split("\n").slice(1, 3).join("\n")); }
  n++;
});
// số đề, số câu lấy từ danh mục: đề cố định là các đề trong from của đề ngẫu nhiên, mọi đề cố định cuối kì I của file đều ở đó
const pool = bank(POOL), DE = pool.pool.from, mine = pool.questions.filter((q) => q.src === POOL);
assert.deepEqual(BANKS.filter((b) => b.file === "5-toan.js" && /^toan5-ck1-de\d+$/.test(b.id)).map((b) => b.id), DE, "đề cố định cuối kì I nào cũng phải ở from của " + POOL);
for (const id of DE) { const b = bank(id); assert.ok(b, "thiếu " + id); assert.equal(b.questions.length, b.n); run(id, b.questions); }
run(POOL, mine);
assert.equal(dung.size, CHECKS.length, "có mục kiểm tra không khớp câu nào: " + CHECKS.filter((c) => !dung.has(c.has)).map((c) => c.has).join(" | "));
// hình nào cũng được đọc lại; chữ trong hình vừa khung, không đè nhau
const hinh = pool.questions.filter((q) => q.svg);
assert.equal(hinh.filter((q) => hinhDaDoc.has(q.svg)).length, hinh.length, "hình nào cũng được đọc lại");
hinh.forEach((q) => chuHinh(q.svg, q.q.slice(0, 40)));

/* ---------- chữ, số như sách (Toán 5 tập một in năm 2026) ---------- */
const kho = pool.questions;
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null || typeof q.ans === "number" ? [] : [].concat(q.ans), q.l || [], q.r || []).map(String);
kho.forEach((q) => {
  const at = q.src + ": " + q.q.slice(0, 50), T = chu(q).concat(q.svg ? TEXTS(q.svg).map((t) => t.t) : []);
  T.forEach((s) => {
    assert.ok(!/\d\.\d/.test(s), at + ": số thập phân viết dấu phẩy, không dấu chấm: " + s);
    assert.ok(!/(^|[\s(])[−-]\d/.test(s), at + ": không có số âm (lớp 5 chưa học): " + s);
    assert.ok(!/dam²|hm²|dam2|hm2/.test(s), at + ": sách in năm 2026 không dạy dam², hm²: " + s);
    assert.ok(!/\b\d{4,}\b/.test(s.replace(/\d+\/\d+/g, "").replace(/,\d+/g, "")), at + ": số từ bốn chữ số ngăn hàng nghìn bằng khoảng trắng: " + s);
  });
  // đề không ghi sẵn 3,14 hay công thức tính chu vi, diện tích (Rút ra của lời giao việc: câu hỏi chính là công thức đó)
  assert.ok(!/3,14|× h\b|× \d+(?:,\d+)? : 2(?![\d,])/.test(q.q), at + ": đề ghi sẵn công thức hoặc 3,14");
  if (/hình tròn|bánh xe|bồn hoa/.test(q.q) && /chu vi|diện tích|mép sân/.test(q.q)) assert.ok(/3,14/.test(q.x), at + ": lời giải tính với 3,14 như sách");
  // hỗn số chỉ đổi qua lại với phân số thập phân (Bài 7): mọi “hỗn số = phân số” trong câu có mẫu số 10, 100, 1 000
  if (q.topic === "Hỗn số") T.forEach((s) => [...s.matchAll(/(\d+ \d+\/(\d+)) = (\d+\/(\d+))/g)].forEach((m) => assert.ok(MAU_TP.includes(+m[2]) && m[2] === m[4], at + ": chỉ đổi hỗn số có phần phân số thập phân: " + m[0])));
});

/* ---------- mức độ và ma trận ---------- */
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M), CHU_DE = Object.keys(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => cells.reduce((s, v) => s + v[k], 0)), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(CHU_DE.length, 15, "15 chủ đề");
const nhomCD = (ts) => ts.reduce((s, t) => s + M[t].reduce((a, b) => a + b, 0), 0);
assert.deepEqual([nhomCD(CHU_DE.slice(0, 3)), nhomCD(CHU_DE.slice(3, 7)), nhomCD(CHU_DE.slice(7, 8)), nhomCD(CHU_DE.slice(8, 12)), nhomCD(CHU_DE.slice(12))], [4, 6, 2, 6, 7],
  "Chủ đề 1 (ôn tập và bổ sung) 4 câu, Chủ đề 2 (số thập phân) 6, Chủ đề 3 (đơn vị đo diện tích) 2, Chủ đề 4 (phép tính) 6, Chủ đề 5 (hình phẳng) 7");
CHU_DE.forEach((t) => assert.ok(("chu-de:5:toan:" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
assert.deepEqual([...new Set(kho.map((q) => q.topic))].sort(), CHU_DE.slice().sort(), "chủ đề của kho đúng chữ của ma trận");
// mỗi ô rút 1 câu và có đúng 4 câu: một câu ở mỗi đề cố định, hai câu riêng; ô không rút thì không có câu
Object.entries(M).forEach(([t, v]) => v.forEach((k, i) => {
  const have = kho.filter((q) => q.topic === t && q.lv === i + 1);
  assert.ok(k <= 1, `ô (${t}, mức ${i + 1}) rút ${k} câu: mỗi ô rút nhiều nhất 1 câu`);
  if (!k) { assert.equal(have.length, 0, `ô (${t}, mức ${i + 1}) không rút mà kho có ${have.length} câu`); return; }
  assert.deepEqual(DE.concat(POOL).map((s) => have.filter((q) => q.src === s).length), [1, 1, 2], `ô (${t}, mức ${i + 1})`);
}));
const dem = (f) => kho.filter(f).length;
assert.equal(dem((q) => q.type === "essay"), 0, "không có câu tự luận");
assert.ok(dem((q) => q.type === "tf4") >= 2 && dem((q) => q.type === "num") >= 10 && dem((q) => q.type === "fill") >= 10 && dem((q) => q.type === "match") >= 2 && dem((q) => q.type === "order") >= 1 && dem((q) => q.type === "tf") >= 1, "kho đủ dạng câu của tiểu học");
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

/* ---------- dò lộ đáp án (Rút ra N5, N24, N8, RS9; như tests/toan12-ck1.js) giữa mọi cặp câu của kho: đề “Ôn chủ đề” rút chung mọi câu của
   một chủ đề (cả hai câu cùng ô), đề ngẫu nhiên rút chung câu của các chủ đề khác; lời dặn (note) hiện ở màn mở đề nên cũng là “câu
   kia”. Đáp án là số (từ 10), số thập phân, phân số, hỗn số chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”, “bằng”, “được”);
   cặp nối: câu kia có cả hai vế; câu chọn dấu: câu kia có mệnh đề so sánh đó; đáp án bằng chữ có ở câu kia thì chỉ in ra khi chạy
   với DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM. ---------- */
const val = (s) => +String(s).replace(/\s/g, "");
const KQ = "(?:=|(?:^|[\\s(])(?:là|bằng|được))\\s+";
const SAU = "(?!\\d|,\\d|\\/|°|%|\\s*[·+−×:](?:\\s|\\d|\\())"; // số đứng ngay trước một phép tính là thừa số, số hạng
const soKQ = (s) => [...String(s).matchAll(new RegExp(KQ + "(\\d{1,3}(?: \\d{3})*)" + SAU, "gu"))].map((m) => val(m[1]));
const kqLa = (s, a) => new RegExp(KQ + a.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + SAU, "u").test(s);
const ten = new Map();
DE.forEach((id) => bank(id).questions.forEach((q, i) => ten.set(q.q, id.replace("toan5-ck1-", "") + "#" + (i + 1))));
mine.forEach((q, i) => ten.set(q.q, "own#" + (i + 1)));
const LOI_DAN = [...new Set(DE.concat(POOL).map((id) => bank(id).note))].map((note, i) => ({ q: note, x: "", note: true, ten: "note" + (i + 1) }));
const doLo = (qs, name, notes) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    const so = [], kq = [], cum = [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const them = (a) => { a = String(a);
      const m = /^(\d{1,3}(?: \d{3})*)(?: (\S+))?$/.exec(a);
      if (m && !/^\d\/\d/.test(m[2] || "")) so.push(val(m[1]));
      else if (/^\d[\d ,/]*(?: [^\d\s]+)?$/.test(a)) kq.push(a.replace(/ [^\d\s]+$/, ""));
      else if (a.length >= 2) cum.push(a); };
    if (q.type === "num") them(typeof q.ans === "number" ? fmtDec(F(Math.round(q.ans * 1000), 1000)) : q.ans);
    else if (q.type === "fill") them(q.ans[0]); else if (q.type === "mc" && !/^[<>=]$/.test(q.o[0])) them(q.o[0]);
    const so2 = q.type === "mc" && /^[<>=]$/.test(q.o[0]) ? (([, a, b]) => [`${a} ${q.o[0]} ${b}`, `${b} ${{ ">": "<", "<": ">", "=": "=" }[q.o[0]]} ${a}`])(/(\S+) … (\S+)$/.exec(q.q)) : [];
    qs.concat(notes || []).forEach((p) => {
      if (p === q) return;
      const C = p.note ? [p.q] : chu(p).concat(p.svg ? TEXTS(p.svg).map((t) => t.t) : []), T = C.map((s) => s.toLowerCase()), at = `${name(p)} lộ đáp án ${name(q)}: `;
      so.filter((x) => x >= 10 && C.flatMap(soKQ).includes(x)).forEach((x) => lo.push(at + x));
      kq.filter((a) => C.some((s) => kqLa(s, a))).forEach((a) => lo.push(at + a));
      cap.filter(([l, r]) => T.some((t) => t.includes(l.toLowerCase()) && t.includes(r.toLowerCase()))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      so2.filter((s) => C.some((t) => t.includes(s))).forEach((s) => lo.push(at + s));
      cum.filter((s) => { const re = new RegExp("(?<![\\p{L}\\p{N}])" + s.toLowerCase().replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + "(?![\\p{L}\\p{N}])", "u"); return T.some((t) => re.test(t)); }).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const tenCau = (q) => (q.note ? q.ten : ten.get(q.q));
const { lo: loDA, chuLo } = doLo(kho, tenCau, LOI_DAN);
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu khác của kho (xem tay):\n" + chuLo.join("\n"));
const DA_XEM = [];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu khác của kho đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loDA, [], "lộ đáp án:\n" + loDA.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 43,26”, “là 1 260”, cả hai vế một cặp nối, mệnh đề so sánh
{ const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const khac = tim("Dụng cụ nào dưới đây dùng để vẽ đường tròn"), thuLo = (qs) => doLo(qs, (q) => q.q.slice(0, 10).replace(/:/g, "")).lo.map((s) => s.replace(/^.*? lộ đáp án [^:]*: /, ""));
  assert.deepEqual(thuLo([tim("35,8 + 7,46 = ___"), gia(khac, "Ví dụ: tổng bằng 43,26.")]), ["43,26"]);
  assert.deepEqual(thuLo([tim("Một hình thang có diện tích 52,5 cm²"), gia(khac, "Chiều cao là 7 cm.")]), []);
  assert.deepEqual(thuLo([tim("Một khu rừng có diện tích 5,2 km²"), gia(khac, "Diện tích là 520 ha.")]), [520]);
  assert.deepEqual(thuLo([tim("Nối mỗi phép tính ở cột trái"), gia(khac, "Ví dụ 0,63 : 10 = 0,063.")]), ["0,63 : 10 → 0,063"]);
  assert.deepEqual(thuLo([tim("Chọn dấu thích hợp: 18,5 … 18,49"), gia(khac, "Ta có 18,5 > 18,49.")]), ["18,5 > 18,49"]);
  assert.deepEqual(thuLo([tim("35,8 + 7,46 = ___"), gia(khac, "Ví dụ 43,26 × 2 = 86,52.")]), []); }
// bộ đọc hình bắt được hình vẽ sai: số đo không đúng tỉ lệ, chân đường cao lệch khỏi đáy, thiếu kí hiệu góc vuông
{ const tim = (has) => CHECKS.find((c) => c.has === has), cau = (has) => kho.find((q) => q.q.includes(has));
  const ht = cau("Tính diện tích hình thang ABCD (như hình vẽ)."), tg = cau("Trong hình tam giác ABC dưới đây");
  assert.throws(() => tim("Tính diện tích hình thang ABCD (như hình vẽ).").right(Object.assign({}, ht, { svg: ht.svg.replace(">9 cm<", ">10 cm<") })), /đúng tỉ lệ/);
  assert.throws(() => tim("Trong hình tam giác ABC dưới đây, đường cao ứng với đáy BC là").right(Object.assign({}, tg, { svg: tg.svg.replace('x2="120" y2="170"', 'x2="126" y2="170"') })), /đường cao|nhãn/);
  assert.throws(() => tim("Trong hình tam giác ABC dưới đây, đường cao ứng với đáy BC là").right(Object.assign({}, tg, { svg: tg.svg.replace(/<polyline [^>]*>/, "") })), /kí hiệu góc vuông/);
  assert.throws(() => chuHinh(tg.svg.replace('<text x="30" y="186"', '<text x="2" y="186" font-size="12"'), "thử"), /cỡ 13|tràn/); }

/* ---------- không gần trùng câu của kho Toán lớp 4 (lời giao việc; Rút ra N25, như tests/toan9-gk1.js): đề bài cùng lựa chọn, ô nối, ô sắp
   xếp có từ 4 cặp từ liền nhau chung với một câu của data/banks/4-toan.js và số cặp chung từ một nửa số cặp của câu ít cặp hơn thì báo.
   Cặp từ tính cả số (cùng một dạng bài với số khác không phải là gần trùng: “Tính bằng cách thuận tiện”); bỏ cách hỏi chung của đề Toán
   (CUM), cặp của nhãn chủ đề và cặp có ở từ 3% số câu của hai file. ---------- */
{
  const CUM = ["tính bằng cách thuận tiện", "viết kết quả dưới dạng phân số", "nối mỗi số đo ở cột trái với số đo bằng nó ở cột phải", "nối mỗi phép tính ở cột trái với kết quả của nó ở cột phải",
    "theo thứ tự từ bé đến lớn", "theo thứ tự từ lớn đến bé", "sắp xếp các số", "số thích hợp thay cho dấu", "có bao nhiêu số", "hết bao nhiêu tiền", "chỉ phần đã tô màu", "được chia thành",
    "phần bằng nhau", "mỗi ý sau đúng hay sai", "như hình vẽ", "như thế", "lớn hơn", "bé hơn", "kết quả của phép", "số lớn nhất trong các số"];
  // số thập phân giữ nguyên một từ ("6,1" không tách thành 6 và 1)
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/(\d),(?=\d)/g, "$1_").replace(/[^\p{L}\p{N}\s|_]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|") && c.split(" ").some((x) => x.length >= 2)); };
  const cauCua = (file) => BANKS.filter((b) => b.file === file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id));
  const lop4 = cauCua("4-toan.js"), ca = lop4.concat(kho), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !nhan.has(c) && (df[c] || 0) < 0.03 * ca.length)); };
  const P4 = lop4.map((p) => [p, capAm(p)]);
  const ganTrung = kho.flatMap((q) => { const c = capAm(q); return P4.map(([p, d]) => { const chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q.q)} ~ ${p.q.slice(0, 50)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho Toán 4:\n" + ganTrung.join("\n"));
  assert.deepEqual(ganTrung, [], "đề bài gần trùng câu của kho Toán 4");
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (bỏ dấu, gộp nguyên âm), nếu có ----------
   Chuỗi 8 từ liền nhau của mọi trường chữ (đề bài, lựa chọn, lời giải, chữ trong hình) không có trong sách; cụm từ chung của môn (tên bài,
   tên chủ đề, cách hỏi chuẩn) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ. Số liệu: số riêng của một câu (số thập
   phân, số từ 11 trở lên, trừ 100, 1 000, 10 000, 3,14; không tính số trong phân số, hỗn số) không có từ ba số cùng ở một trang của Toán 5 tập một (dò bối cảnh, số liệu của
   bài tập, ví dụ trong sách; DO_SACH=1 in các trang có từ hai số chung để xem). */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const TU_CHUNG = [...CHU_DE, "mỗi ý sau đúng hay sai", "viết số thập phân thích hợp vào chỗ trống", "viết số thích hợp vào chỗ trống", "số thích hợp điền vào chỗ chấm",
  "đường cao ứng với đáy", "hình tam giác", "hình thang vuông", "hình thang", "hình tròn", "hình chữ nhật", "chu vi hình tròn", "diện tích hình tròn", "diện tích hình thang",
  "diện tích hình tam giác", "làm tròn số", "đến hàng phần mười", "đến hàng phần trăm", "đến số tự nhiên gần nhất", "phân số thập phân", "số thập phân", "hỗn số",
  "phần nguyên", "phần thập phân", "phần phân số", "hàng phần mười", "hàng phần trăm", "hàng phần nghìn", "thẳng cột", "như hình vẽ", "viết kết quả dưới dạng phân số",
  "nhân cả tử số và mẫu số với", "quy đồng mẫu số với mẫu số chung", "nên làm tròn lên", "nên làm tròn xuống", "không bé hơn 5", "bé hơn 5", "ở cột trái với", "ở cột phải",
  "có bao nhiêu số tự nhiên", "bao nhiêu ki-lô-gam", "bao nhiêu ki-lô-mét", "bao nhiêu mét"]
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const chuCau = (q) => chu(q).concat(q.svg ? [TEXTS(q.svg).map((t) => t.t).join(" ")] : []);
if (SACH.length) {
  assert.ok(SACH.some((f) => /toan-5-tap-1/.test(f)), "OnUp-Book có Toán 5 tập một");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => chuCau(q).flatMap((s) => chuoi(s, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q.q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  // số liệu riêng của từng câu so với từng trang của Toán 5 tập một
  const trang = fs.readFileSync(SACH.find((f) => /toan-5-tap-1/.test(f)), "utf8").split(/(?==== page-\d+ · )/).map((p) => ({ ten: (/trang in (\d+)/.exec(p) || [])[1], so: new Set((p.match(/\d+(?:[ .]\d{3})*(?:,\d+)?/g) || []).map((x) => x.replace(/[ .](?=\d{3})/g, ""))) }));
  const soRieng = (q) => [...new Set((chuCau(q).join(" ").replace(/\d+ \d+\/\d+|\d+\/\d+/g, " ").match(/\d{1,3}(?: \d{3})+(?:,\d+)?|\d+(?:,\d+)?/g) || []).map((x) => x.replace(/ /g, "")).filter((x) => /,/.test(x) ? x !== "3,14" : +x > 10 && ![100, 1000, 10000].includes(+x)))];
  const soChung = kho.flatMap((q) => { const s = soRieng(q); return trang.map((p) => [p.ten, s.filter((x) => p.so.has(x))]).filter(([, c]) => c.length >= 2).map(([t, c]) => `${ten.get(q.q)} ~ trang ${t}: ${c.join("; ")} (câu có ${s.length} số)`); });
  if (process.env.DO_SACH) console.log("Trang sách có từ hai số liệu chung với một câu (xem tay):\n" + soChung.join("\n"));
  const SO_XEM = [];
  assert.deepEqual(soChung.filter((s) => /: (.+) \(/.exec(s)[1].split("; ").length >= 3 && !SO_XEM.includes(s)), [], "trang sách có từ ba số liệu chung với một câu");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");

/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác ---------- */
{
  const khac = BANKS.filter((b) => !b.pool && b.file !== "5-toan.js").flatMap((b) => b.questions.map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " })))
    .concat(BANKS.filter((b) => b.pool && b.file !== "5-toan.js").flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " }))));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q.q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại hoặc đọc lại hình (" + DE.map((id) => bank(id).questions.length).join(" + ") + " câu của " + DE.length + " đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + kho.length + " câu, " + hinh.length + " hình, ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề; đáp án đúng dài nhất ở " + daiNhat + ", ngắn nhất ở " + nganNhat + " trên " + mcs.length + " câu nhiều lựa chọn.");
console.log("MATH OK");
