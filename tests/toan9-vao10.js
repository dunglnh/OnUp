// Kiểm tra các đề Toán thi thử vào 10 (data/banks/9-toan.js, toan9-vao10-de<N>; Phiên N9-vao10-toan, các phiên N9-vao10-toan-b,
// -c thêm đề rồi mở rộng script này). Đề tính điểm (Phiên K5), khung theo đề minh hoạ tuyển sinh lớp 10 của TP.HCM năm 2026
// (docs/KE-HOACH-NOI-DUNG.md, mục 7, “Khung đề Toán”). Số đề, số câu lấy từ danh mục (không ghi cứng).
// Kiểm tra từng đề: danh mục (tên, khối, môn, file, 120 phút, pts 10, gắn vào vao10-2027); 7 bài đúng tên (part), đúng thứ tự, điểm từng
// bài 1,5 – 1 – 1,5 – 1 – 1 – 1 – 3, Bài 6 một câu, Bài 7 ba ý a, b, c mỗi ý 1 điểm, các bài khác ghi ý a), b), c) theo thứ tự; mọi câu là
// tự luận, thang chấm (ý 0,25 hoặc bội của 0,5 để có mức “Một phần”, tổng bằng pt), chủ đề là tên bài của sách có trong kho Toán 9, mức
// độ; đề bài chung của mỗi bài nhiều ý ở passages (“Bài N (… điểm)”), mọi ý của bài dùng đoạn đó; câu hỏi tính toán có dòng “Đáp số:”;
// note (câu chung về khung TP.HCM, số ý, số điểm tự chấm, các bài có hình tính từ dữ liệu); Quiz.grade (điểm tối đa từng phần).
// Tính lại đáp án bằng code (số hữu tỉ chính xác; căn, π so theo giá trị; làm tròn theo quy tắc của sách): Bài 1 bảng giá trị, hình dạng
// đồ thị, điểm thuộc (P) thoả điều kiện đọc từ đề (thử mọi hoành độ hữu tỉ mẫu nhỏ), đáp án không có sẵn trong bảng giá trị của ý a;
// Bài 2 Δ, Δ′ hoặc a · c, giá trị biểu thức của hai nghiệm (thay hai nghiệm thật vào biểu thức đọc từ đề), điều kiện của tham số m (thử
// nhiều giá trị của m); Bài 3 bảng tần số đọc lại từ hình (bảng, biểu đồ cột, biểu đồ hình quạt tròn) hoặc dãy số liệu trong đề, tần số
// tương đối, số đo cung, nhóm [a; b), xác suất đếm lại trên không gian mẫu liệt kê bằng code (cả danh sách Ω ghi trong lời giải); Đề 5–7
// (Phiên N9-vao10-toan-b) thêm biểu đồ tần số dạng đoạn thẳng, biểu đồ tần số tương đối ghép nhóm dạng cột và dạng đoạn thẳng (giá trị
// đại diện), gieo hai con xúc xắc, chọn hai trong năm bạn (không kể thứ tự), gieo đồng xu ba lần; Đề 8–10 (Phiên N9-vao10-toan-c) thêm
// biểu đồ tần số tương đối dạng cột, bảng tần số ghép nhóm, biểu đồ cột kép (hai lớp sĩ số khác nhau: so sánh theo tần số tương đối), tấm
// bìa quay (hình của ý c: các hình quạt bằng nhau, mỗi hình quạt một số) rồi gieo xúc xắc, oẳn tù tì, chọn ngẫu nhiên phương án hai câu trắc
// nghiệm; Bài 1 thêm hai điều kiện (cách đều hai trục toạ độ, tung độ nhỏ hơn hoành độ N đơn vị);
// Bài 4 công thức đọc từ đề rồi giải lại phương trình, bất phương trình (Đề 9: diện tích theo cạnh, điều kiện của ẩn loại một nghiệm);
// Bài 5 thể tích, diện tích, độ dài cung, hình đọc lại đúng tỉ lệ với số đo trong đề (cả hình vành khuyên, hình cầu, vật ghép từ hình trụ và
// nửa hình cầu; Đề 8–10: lều ghép từ hình trụ và hình nón, hai thanh ray là hai cung cùng tâm, băng chuyền hai trục lăn); Bài 6 giải lại hệ,
// phương trình có ẩn ở mẫu, phương trình bậc hai, bất phương trình, bài hai bước (hệ rồi bất phương trình có giảm giá; số liệu đọc từ
// đề); Bài 7 điểm có nhãn, đường tròn,
// đoạn thẳng đọc từ hình: điều kiện của đề (tiếp tuyến, trung điểm, vuông góc, thẳng hàng, điểm trên cung), các điều phải chứng minh
// (bốn điểm cùng thuộc một đường tròn, vuông góc, hệ thức) kiểm lại trên toạ độ, độ dài, góc, diện tích của ý c tính lại từ toạ độ
// (theo tỉ lệ của số liệu trong đề) và từ công thức. Chữ trong hình từ cỡ 13, nằm trọn trong khung hình. Không dùng điều sách Toán 9 in
// năm 2026 không dạy (KHONG_DAY: góc tạo bởi tia tiếp tuyến và dây cung, đường kính vuông góc với dây, định lí đảo của tứ giác nội tiếp…).
// Rồi: dò lộ đáp án giữa các câu của một đề (mọi câu cùng ra): kết quả của một ý không có ở đề bài, thang chấm, lời giải của ý đứng
// trước, ở đề bài của ý khác và ở đề bài chung (passages); DO_LO=1 in ra để xem tay, danh sách đã xem ở DA_XEM. Đề bài không trùng câu
// nào của data/banks/9-toan.js; không chuỗi 8 từ nào trùng câu của kho khác và giữa các đề thi thử với nhau (trừ cụm chung của khung đề,
// thang chấm ở CUM_CHUNG); có ../OnUp-Book thì so mọi trường chữ với chữ OCR của Toán 6–9 (không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi
// 6 từ). Bộ đọc hình, bộ dò lộ tự thử với hình, câu cố ý viết sai.
// Chạy: node tests/toan9-vao10.js → in MATH OK.
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
const so = (b) => +/de(\d+)$/.exec(b.id)[1];

/* ---------- số: hữu tỉ chính xác { n, d }; số thực (number) khi có căn không khai được, π (như tests/toan9-ck2.js) ---------- */
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const F = (n, d) => { d = d === undefined ? 1 : d; assert.ok(Number.isInteger(n) && Number.isInteger(d) && d !== 0, `phân số lạ ${n}/${d}`); if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return { n: n / g, d: d / g }; };
const isR = (v) => typeof v === "object";
const toNum = (v) => (isR(v) ? v.n / v.d : v);
const both = (a, b, fr_, fl) => (isR(a) && isR(b) ? fr_(a, b) : fl(toNum(a), toNum(b)));
const add = (a, b) => both(a, b, (a, b) => F(a.n * b.d + b.n * a.d, a.d * b.d), (x, y) => x + y);
const neg = (a) => (isR(a) ? F(-a.n, a.d) : -a);
const sub = (a, b) => add(a, neg(b));
const mul = (a, b) => both(a, b, (a, b) => F(a.n * b.n, a.d * b.d), (x, y) => x * y);
const div = (a, b) => { assert.ok(toNum(b) !== 0, "chia cho 0"); return both(a, b, (a, b) => F(a.n * b.d, a.d * b.n), (x, y) => x / y); };
const pw = (a, k) => { let v = F(1); for (let i = 0; i < k; i++) v = mul(v, a); return v; };
const isqrt = (n) => { if (n < 0) return null; const r = Math.round(Math.sqrt(n)); return r * r === n ? r : null; };
const sqrt = (a) => { assert.ok(toNum(a) >= 0, "căn bậc hai của số âm"); if (isR(a)) { const p = isqrt(a.n), q = isqrt(a.d); if (p !== null && q !== null) return F(p, q); } return Math.sqrt(toNum(a)); };
const cmp = (a, b) => (isR(a) && isR(b) ? a.n * b.d - b.n * a.d : Math.abs(toNum(a) - toNum(b)) <= 1e-9 * Math.max(1, Math.abs(toNum(a))) ? 0 : toNum(a) - toNum(b));
const eq = (a, b) => cmp(a, b) === 0;
const isInt = (a) => isR(a) && a.d === 1;
const RAD = Math.PI / 180;
// đọc một số viết như trong đề: "−3/7", "3", "1 800", "2,35"
const fr = (s) => {
  s = String(s).trim().replace(/[−–]/g, "-").replace(/\s+/g, " ");
  let m = /^(-?\d+)\/(-?\d+)$/.exec(s);
  if (m) return F(+m[1], +m[2]);
  m = /^(-?)(\d{1,3}(?: \d{3})+|\d+)(?:,(\d+))?$/.exec(s);
  if (m) { const ip = m[2].replace(/ /g, ""), fp = m[3] || ""; const v = F(+(ip + fp), 10 ** fp.length); return m[1] ? neg(v) : v; }
  throw new Error("không đọc được số: " + s);
};
const thou = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
// số thập phân viết kiểu Việt Nam ("−2,35", "1 357"); k: số chữ số sau dấu phẩy (không ghi thì vừa đủ)
const fmt = (a, k) => {
  if (!isR(a)) { assert.ok(k !== undefined, "số thực cần ghi số chữ số"); a = F(Math.round(a * 10 ** k), 10 ** k); }
  let e2 = 0, d = a.d; while (d % 2 === 0) { d /= 2; e2++; } let e5 = 0; while (d % 5 === 0) { d /= 5; e5++; }
  assert.equal(d, 1, "không viết được thành số thập phân hữu hạn: " + a.n + "/" + a.d);
  const places = k === undefined ? Math.max(e2, e5) : Math.max(k, Math.max(e2, e5));
  const s = String(Math.abs(a.n) * (10 ** places / a.d)).padStart(places + 1, "0");
  return (a.n < 0 ? "−" : "") + thou(s.slice(0, s.length - places)) + (places ? "," + s.slice(s.length - places) : "");
};
const fmtF = (a) => (isInt(a) ? fmt(a) : (a.n < 0 ? "−" : "") + Math.abs(a.n) + "/" + a.d);
// làm tròn số thực x đến k chữ số sau dấu phẩy theo quy tắc của sách; số ở sát ranh giới làm tròn thì báo lỗi
const lamTron = (x, k) => {
  const p = 10 ** k, t = Math.abs(toNum(x)) * p;
  assert.ok(Math.abs(t - Math.floor(t) - 0.5) > 1e-4, "số ở sát ranh giới làm tròn: " + toNum(x));
  return fmt(F(Math.sign(toNum(x)) * Math.floor(t + 0.5 + 1e-9), p), k);
};

/* ---------- bộ đọc biểu thức (như tests/toan9-ck2.js): số, + − · × : / và ngoặc, ² ³ hoặc ^, căn √, π, nhân ngầm; chữ cái lấy giá trị
   trong vars ---------- */
function ev(src, vars) {
  const s = String(src).replace(/[−–]/g, "-").replace(/[×]/g, "·").replace(/ /g, " ");
  const toks = []; let i = 0;
  const SUP = { "²": 2, "³": 3 };
  while (i < s.length) {
    const c = s[i], rest = s.slice(i);
    if (c === " ") { i++; continue; }
    const m = /^\d{1,3}(?: \d{3})+(?:,\d+)?(?![\d])/.exec(rest) || /^\d+(?:,\d+)?/.exec(rest);
    if (m) { toks.push({ t: "n", v: fr(m[0]) }); i += m[0].length; continue; }
    if (SUP[c]) { toks.push({ t: "^" }, { t: "n", v: F(SUP[c]) }); i++; continue; }
    if ("+-·:/()^√π".includes(c)) { toks.push({ t: c }); i++; continue; }
    if (/[a-zA-Z]/.test(c)) { assert.ok(vars && vars[c] !== undefined, "biến lạ " + c + " trong " + src); toks.push({ t: "n", v: vars[c] }); i++; continue; }
    throw new Error("kí tự lạ “" + c + "” trong " + src);
  }
  let p = 0;
  const peek = () => toks[p], next = () => toks[p++];
  const startsAtom = (t) => t && (t.t === "n" || t.t === "(" || t.t === "√" || t.t === "π");
  const atom = () => {
    const t = next(); assert.ok(t, "thiếu số trong " + src);
    if (t.t === "n") return t.v;
    if (t.t === "π") return Math.PI;
    if (t.t === "(") { const v = expr(); assert.equal((next() || {}).t, ")", "thiếu ngoặc đóng trong " + src); return v; }
    if (t.t === "√") return sqrt(power());
    throw new Error("không hiểu " + src);
  };
  const power = () => { const v = atom(); if (peek() && peek().t === "^") { next(); const k = unary(); assert.ok(isInt(k) && k.n >= 0, "số mũ phải là số tự nhiên"); return pw(v, k.n); } return v; };
  const unary = () => { const t = peek(); if (t && t.t === "-") { next(); return neg(unary()); } if (t && t.t === "+") { next(); return unary(); } return power(); };
  const term = () => {
    let v = unary();
    for (;;) {
      const t = peek();
      if (t && (t.t === "·" || t.t === ":" || t.t === "/")) { next(); const w = unary(); v = t.t === "·" ? mul(v, w) : div(v, w); }
      else if (startsAtom(t)) v = mul(v, power());
      else return v;
    }
  };
  const expr = () => { let v = term(); while (peek() && (peek().t === "+" || peek().t === "-")) { const op = next().t, w = term(); v = op === "+" ? add(v, w) : sub(v, w); } return v; };
  const v = expr();
  assert.equal(p, toks.length, "thừa kí tự trong " + src);
  return v;
}
// phương trình bậc hai "… = …" theo ẩn x (vars cho các chữ khác) → { a, b, c } của vế trái trừ vế phải (thử thêm bốn giá trị)
const bac2 = (s, vars) => {
  const [L, R] = s.split(" = "); assert.ok(R !== undefined, "không phải phương trình: " + s);
  const f = (x) => { const v = Object.assign({}, vars, { x: F(x) }); return sub(ev(L, v), ev(R, v)); };
  const c = f(0), p1 = f(1), m1 = f(-1), a = div(sub(add(p1, m1), mul(F(2), c)), F(2)), b = div(sub(p1, m1), F(2));
  [2, -3, 5, 7].forEach((x) => assert.ok(eq(f(x), add(add(mul(a, F(x * x)), mul(b, F(x))), c)), "không phải phương trình bậc hai: " + s));
  assert.ok(toNum(a) !== 0, "hệ số a bằng 0: " + s);
  return { a, b, c };
};
const delta = (e) => sub(mul(e.b, e.b), mul(F(4), mul(e.a, e.c)));
const deltaPhay = (e) => { const b1 = div(e.b, F(2)); return sub(mul(b1, b1), mul(e.a, e.c)); };
// hai nghiệm thực (số thực), tăng dần; vô nghiệm thì mảng rỗng
const nghiemThuc = (e) => { const d = toNum(delta(e)); if (d < 0) return []; const a = toNum(e.a), b = toNum(e.b); return [(-b - Math.sqrt(d)) / (2 * a), (-b + Math.sqrt(d)) / (2 * a)].sort((u, v) => u - v); };
// phương trình một ẩn x có thể có ẩn ở mẫu: mọi nghiệm hữu tỉ p/q với |p| ≤ 400, q ≤ 6 (giá trị làm mẫu bằng 0 thì bỏ)
const nghiem = (s) => {
  const [L, R] = s.split(" = "), out = [];
  for (let q = 1; q <= 6; q++) for (let p = -400; p <= 400; p++) {
    if (gcd(p, q) !== 1) continue;
    let v; try { v = sub(ev(L, { x: F(p, q) }), ev(R, { x: F(p, q) })); } catch (e) { if (/chia cho 0/.test(e.message)) continue; throw e; }
    if (toNum(v) === 0) out.push(F(p, q));
  }
  return out;
};

/* ---------- hình (như tests/toan9-ck2.js) ---------- */
const nums = (s) => s.trim().split(/[\s,]+/).map(Number);
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const lines = (svg) => [...svg.matchAll(/<line [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { a: [+a.x1, +a.y1], b: [+a.x2, +a.y2], stroke: a.stroke || "", w: +(a["stroke-width"] || 1), dash: !!a["stroke-dasharray"] }; });
const circles = (svg) => [...svg.matchAll(/<circle [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { c: [+a.cx, +a.cy], r: +a.r, fill: a.fill || "none", w: +(a["stroke-width"] || 1) }; });
const ellipses = (svg) => [...svg.matchAll(/<ellipse [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { c: [+a.cx, +a.cy], rx: +a.rx, ry: +a.ry }; });
const rects = (svg) => [...svg.matchAll(/<rect [^>]*>/g)].map((m) => { const a = attrs(m[0]); return { x: +a.x, y: +a.y, w: +a.width, h: +a.height, fill: a.fill || "none" }; });
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { at: [+a.x, +a.y], t: m[2], b: a["font-weight"] === "700", fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start", fill: a.fill || "" }; });
const subv = (p, q) => [p[0] - q[0], p[1] - q[1]];
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const dot = (u, v) => u[0] * v[0] + u[1] * v[1];
const cross = (u, v) => u[0] * v[1] - u[1] * v[0];
const goc = (o, a, b) => Math.acos(Math.max(-1, Math.min(1, dot(subv(a, o), subv(b, o)) / (dist(a, o) * dist(b, o))))) / RAD;
const dDoan = (p, a, b) => { const ab = subv(b, a), t = Math.max(0, Math.min(1, dot(subv(p, a), ab) / dot(ab, ab))); return dist(p, [a[0] + t * ab[0], a[1] + t * ab[1]]); };
const dThang = (p, a, b) => Math.abs(cross(subv(b, a), subv(p, a))) / dist(a, b);
const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
// điểm có nhãn: chấm tròn nhỏ (r ≤ 4) và chữ đậm một chữ cái hoa cạnh chấm (cách dưới 30)
const diem = (svg) => {
  const ch = circles(svg).filter((c) => c.r <= 4), o = {};
  texts(svg).filter((t) => t.b && /^[A-Z]$/.test(t.t)).forEach((t) => {
    const p = ch.slice().sort((u, v) => dist(u.c, t.at) - dist(v.c, t.at))[0];
    assert.ok(p && dist(p.c, t.at) < 30, "nhãn " + t.t + " phải đặt cạnh một điểm");
    assert.ok(!o[t.t], "hai nhãn " + t.t); o[t.t] = p.c;
  });
  assert.equal(new Set(Object.values(o).map(String)).size, Object.keys(o).length, "mỗi điểm một nhãn");
  assert.equal(Object.keys(o).length, ch.length, "điểm nào cũng có nhãn");
  return o;
};
const doan = (svg) => lines(svg).filter((l) => l.w >= 2 && !l.dash);
const coDoan = (svg, P, Q) => doan(svg).some((l) => dDoan(P, l.a, l.b) < 0.6 && dDoan(Q, l.a, l.b) < 0.6);
const duongTron = (svg) => circles(svg).filter((c) => c.r > 8);
const tren = (C, P) => Math.abs(dist(P, C.c) - C.r) < 0.6; // P nằm trên đường tròn C
const thang = (P, Q, R) => dThang(R, P, Q) < 0.6; // R thuộc đường thẳng PQ
const giua = (P, Q, R) => thang(P, Q, R) && dist(P, R) < dist(P, Q) && dist(Q, R) < dist(P, Q); // R nằm giữa P và Q
const vuong = (u, v) => Math.abs(dot(u, v)) / (Math.hypot(...u) * Math.hypot(...v)) < 0.004; // hai vectơ vuông góc (lệch dưới 0,25°)
// bốn điểm cùng thuộc một đường tròn: điểm thứ tư cách tâm đường tròn qua ba điểm đầu một khoảng bằng bán kính
const tamNgoai = (A, B, C) => {
  const d = 2 * (A[0] * (B[1] - C[1]) + B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1])), a2 = A[0] ** 2 + A[1] ** 2, b2 = B[0] ** 2 + B[1] ** 2, c2 = C[0] ** 2 + C[1] ** 2;
  return [(a2 * (B[1] - C[1]) + b2 * (C[1] - A[1]) + c2 * (A[1] - B[1])) / d, (a2 * (C[0] - B[0]) + b2 * (A[0] - C[0]) + c2 * (B[0] - A[0])) / d];
};
const cungTron = (A, B, C, D) => { const I = tamNgoai(A, B, C); return Math.abs(dist(I, D) - dist(I, A)) < 0.01 * dist(I, A); };
// mọi chữ trong hình cỡ từ 13 trở lên, nằm trọn trong khung hình (viewBox)
const rong = (t) => (t.b ? 0.62 : 0.55) * t.fs * [...t.t].length;
const chuTrongKhung = (svg, ten) => {
  const v = nums(/viewBox="([^"]+)"/.exec(svg)[1]);
  texts(svg).forEach((t) => {
    assert.ok(t.fs >= 13, ten + ": chữ “" + t.t + "” nhỏ hơn cỡ 13");
    const w = rong(t), x0 = t.anchor === "middle" ? t.at[0] - w / 2 : t.anchor === "end" ? t.at[0] - w : t.at[0];
    assert.ok(x0 >= 0 && x0 + w <= v[2] && t.at[1] - 0.75 * t.fs >= 0 && t.at[1] + 0.25 * t.fs <= v[3], ten + ": chữ “" + t.t + "” tràn khỏi khung hình");
  });
};
// bảng kẻ dọc (như docBang của tests/toan9-ck2.js): đường kẻ ngang, dọc hết bảng, mỗi ô nhiều nhất một chữ giữa ô, vừa ô
const docBang = (svg, ten) => {
  const L = lines(svg), ngang = L.filter((l) => l.a[1] === l.b[1]), doc = L.filter((l) => l.a[0] === l.b[0]);
  assert.equal(ngang.length + doc.length, L.length, ten + ": bảng chỉ có đường kẻ ngang, dọc");
  const ys = [...new Set(ngang.map((l) => l.a[1]))].sort((a, b) => a - b), xs = [...new Set(doc.map((l) => l.a[0]))].sort((a, b) => a - b);
  ngang.forEach((l) => assert.ok(Math.min(l.a[0], l.b[0]) === xs[0] && Math.max(l.a[0], l.b[0]) === xs[xs.length - 1], ten + ": đường ngang kẻ hết bề rộng bảng"));
  doc.forEach((l) => assert.ok(Math.min(l.a[1], l.b[1]) === ys[0] && Math.max(l.a[1], l.b[1]) === ys[ys.length - 1], ten + ": đường dọc kẻ hết chiều cao bảng"));
  const o = Array.from({ length: ys.length - 1 }, () => Array(xs.length - 1).fill(""));
  texts(svg).forEach((t) => {
    const c = xs.findIndex((v, i) => i && Math.abs(t.at[0] - (v + xs[i - 1]) / 2) < 0.6) - 1, r = ys.findIndex((v, i) => i && t.at[1] > ys[i - 1] + 0.7 * t.fs && t.at[1] < v) - 1;
    assert.ok(t.anchor === "middle" && c >= 0 && r >= 0 && o[r][c] === "", ten + ": chữ “" + t.t + "” phải nằm giữa một ô, mỗi ô một chữ");
    assert.ok(rong(t) <= xs[c + 1] - xs[c] - 4, ten + ": chữ “" + t.t + "” không vừa ô");
    o[r][c] = t.t;
  });
  return o;
};
// biểu đồ cột (như docCot): trục đứng số ghi bên trái (căn phải) cách đều từ 0, đường lưới; cột acc-soft trên trục ngang, số ở đỉnh cột
// (chữ đậm) bằng chiều cao cột, tên dưới trục
const docCot = (svg, ten) => {
  const T = texts(svg), vach = T.filter((t) => t.anchor === "end" && /^\d+$/.test(t.t)).map((t) => ({ v: +t.t, y: t.at[1] - 5 })).sort((a, b) => a.v - b.v);
  assert.ok(vach.length >= 3 && vach[0].v === 0, ten + ": trục đứng bắt đầu từ 0, ít nhất 3 vạch");
  const bot = vach[0].y, per = (bot - vach[vach.length - 1].y) / vach[vach.length - 1].v;
  vach.forEach((s) => assert.ok(Math.abs(bot - s.v * per - s.y) < 0.6, ten + ": vạch " + s.v + " không cách đều"));
  const luoi = lines(svg).filter((l) => l.stroke === "line" && l.a[1] === l.b[1]).map((l) => l.a[1]);
  vach.slice(1).forEach((s) => assert.ok(luoi.some((y) => Math.abs(y - s.y) < 0.6), ten + ": thiếu đường lưới ở vạch " + s.v));
  return rects(svg).filter((r) => r.fill === "acc-soft").sort((a, b) => a.x - b.x).map((r) => {
    assert.ok(Math.abs(r.y + r.h - bot) < 0.6, ten + ": cột đứng trên trục ngang");
    const cx = r.x + r.w / 2, dinh = T.filter((t) => t.b && Math.abs(t.at[0] - cx) < 0.6 && t.at[1] < r.y && t.at[1] > r.y - 16);
    assert.equal(dinh.length, 1, ten + ": mỗi cột một số ghi ngay trên");
    assert.ok(Math.abs(bot - +dinh[0].t * per - r.y) < 0.15, ten + ": số ở đỉnh cột " + dinh[0].t + " khác chiều cao cột");
    const duoi = T.filter((t) => !t.b && Math.abs(t.at[0] - cx) < 0.6 && t.at[1] > bot && t.at[1] < bot + 30);
    assert.equal(duoi.length, 1, ten + ": mỗi cột một tên ghi dưới trục");
    return [duoi[0].t, +dinh[0].t];
  });
};
// biểu đồ hình quạt tròn (như docQuat): mỗi phần là một hình quạt tô màu theo chú giải, số phần trăm ghi trong hình quạt, góc ở tâm
// khớp số phần trăm, các phần nối tiếp nhau đủ một vòng
const docQuat = (svg, ten) => {
  const T = texts(svg);
  const chuGiai = rects(svg).filter((r) => r.w === 16).map((r) => {
    const t = T.filter((t) => Math.abs(t.at[0] - (r.x + 24)) < 0.6 && Math.abs(t.at[1] - (r.y + 13)) < 0.6);
    assert.equal(t.length, 1, ten + ": mỗi ô chú giải một tên"); return { fill: r.fill, ten: t[0].t };
  });
  assert.equal(new Set(chuGiai.map((c) => c.fill)).size, chuGiai.length, ten + ": mỗi ô chú giải một màu");
  const gocDo = (cx, cy, x, y) => (Math.atan2(y - cy, x - cx) * 180) / Math.PI, lech = (a, b) => (((a - b) % 360) + 360) % 360;
  let cuoi = null, tong = 0;
  const out = [...svg.matchAll(/<path d="([^"]+)" fill="([^"]+)"[^>]*>/g)].map((m) => {
    const k = /^M ([\d.]+) ([\d.]+) L ([\d.]+) ([\d.]+) A ([\d.]+) ([\d.]+) 0 ([01]) 1 ([\d.]+) ([\d.]+) Z$/.exec(m[1]);
    assert.ok(k, ten + ": phần của biểu đồ hình quạt tròn là một hình quạt");
    const [cx, cy, x0, y0, r, r2, lon, x1, y1] = k.slice(1).map(Number);
    assert.ok(r === r2 && Math.abs(Math.hypot(x0 - cx, y0 - cy) - r) < 0.15 && Math.abs(Math.hypot(x1 - cx, y1 - cy) - r) < 0.15, ten + ": hai đầu cung nằm trên đường tròn");
    const a0 = gocDo(cx, cy, x0, y0), d = lech(gocDo(cx, cy, x1, y1), a0);
    assert.equal(lon, d > 180 ? 1 : 0, ten + ": cờ cung lớn khớp số đo của hình quạt");
    if (cuoi) assert.ok(Math.hypot(cuoi[0] - x0, cuoi[1] - y0) < 0.15, ten + ": các hình quạt nối tiếp nhau");
    cuoi = [x1, y1]; tong += d;
    const c = chuGiai.find((g) => g.fill === m[2]); assert.ok(c, ten + ": màu của hình quạt có trong chú giải");
    const nhan = T.filter((t) => /^\d+(?:,\d+)?%$/.test(t.t) && Math.hypot(t.at[0] - cx, t.at[1] - 5 - cy) < r && lech(gocDo(cx, cy, t.at[0], t.at[1] - 5), a0) < d);
    assert.equal(nhan.length, 1, ten + ": mỗi hình quạt một số phần trăm ở trong");
    const p = toNum(fr(nhan[0].t.replace("%", "")));
    assert.ok(Math.abs(d / 3.6 - p) < 0.15, ten + ": hình quạt “" + c.ten + "” có góc " + d.toFixed(1) + "°, không khớp " + p + "%");
    return [c.ten, p];
  });
  assert.ok(Math.abs(tong - 360) < 0.5, ten + ": các hình quạt đủ một vòng tròn");
  assert.equal(out.reduce((s, o) => s + o[1], 0), 100, ten + ": các phần cộng lại 100%");
  assert.deepEqual(out.map((o) => o[0]).sort(), chuGiai.map((c) => c.ten).sort(), ten + ": mỗi phần một ô chú giải");
  return out;
};
// trục đứng của biểu đồ (như docCot): số ghi bên trái (căn phải, có hoặc cùng không có dấu %) cách đều từ 0, đường lưới ở mỗi vạch khác 0
const trucDung = (svg, ten) => {
  const vach = texts(svg).filter((t) => t.anchor === "end" && !t.b && /^\d+%?$/.test(t.t)).map((t) => ({ v: +t.t.replace("%", ""), y: t.at[1] - 5, pct: t.t.endsWith("%") })).sort((a, b) => a.v - b.v);
  assert.ok(vach.length >= 3 && vach[0].v === 0, ten + ": trục đứng bắt đầu từ 0, ít nhất 3 vạch");
  assert.equal(new Set(vach.map((s) => s.pct)).size, 1, ten + ": các vạch cùng ghi hoặc cùng không ghi %");
  const bot = vach[0].y, per = (bot - vach[vach.length - 1].y) / vach[vach.length - 1].v;
  vach.forEach((s) => assert.ok(Math.abs(bot - s.v * per - s.y) < 0.6, ten + ": vạch " + s.v + " không cách đều"));
  const luoi = lines(svg).filter((l) => l.stroke === "line" && l.a[1] === l.b[1]).map((l) => l.a[1]);
  vach.slice(1).forEach((s) => assert.ok(luoi.some((y) => Math.abs(y - s.y) < 0.6), ten + ": thiếu đường lưới ở vạch " + s.v));
  return { bot, per, pct: vach[0].pct };
};
// tâm khung chữ (để tìm chữ gần một điểm)
const tamChu = (t) => { const w = rong(t); return [t.anchor === "middle" ? t.at[0] : t.anchor === "end" ? t.at[0] - w / 2 : t.at[0] + w / 2, t.at[1] - 0.25 * t.fs]; };
// biểu đồ dạng đoạn thẳng (biểu đồ tần số dạng đoạn thẳng; biểu đồ tần số tương đối ghép nhóm dạng đoạn thẳng, Bài 22, 24 của Toán 9):
// một đường gấp khúc màu acc, mỗi đỉnh có chấm tròn; số ghi cạnh đỉnh (chữ đậm gần đỉnh nhất, mỗi đỉnh một số) bằng tung độ của đỉnh
// đọc theo trục đứng; giá trị (hoặc giá trị đại diện của nhóm) ghi dưới trục ngang, thẳng đỉnh → [[giá trị, số], …]
const docDuong = (svg, ten) => {
  const { bot, per, pct } = trucDung(svg, ten), T = texts(svg);
  const pl = [...svg.matchAll(/<polyline points="([^"]+)" fill="none" stroke="acc"[^>]*>/g)]; assert.equal(pl.length, 1, ten + ": một đường gấp khúc");
  const dinh = pl[0][1].trim().split(/\s+/).map((p) => p.split(",").map(Number));
  assert.ok(dinh.length >= 3 && dinh.every((p, i) => !i || p[0] > dinh[i - 1][0]), ten + ": các đỉnh xếp từ trái sang phải");
  const cham = circles(svg).filter((c) => c.r <= 4), dam = T.filter((t) => t.b), dung = new Set();
  return dinh.map((p) => {
    assert.ok(cham.some((c) => dist(c.c, p) < 0.15), ten + ": đỉnh nào cũng có chấm tròn");
    const so = dam.slice().sort((u, v) => dist(tamChu(u), p) - dist(tamChu(v), p))[0];
    assert.ok(so && dist(tamChu(so), p) < 30 && !dung.has(so), ten + ": mỗi đỉnh một số ghi ngay cạnh"); dung.add(so);
    assert.ok(new RegExp(pct ? "^\\d+%$" : "^\\d+$").test(so.t), ten + ": số ghi ở đỉnh cùng đơn vị với trục đứng");
    assert.ok(Math.abs(bot - +so.t.replace("%", "") * per - p[1]) < 0.15, ten + ": số ghi ở đỉnh " + so.t + " khác tung độ của đỉnh");
    const duoi = T.filter((t) => !t.b && t.anchor === "middle" && Math.abs(t.at[0] - p[0]) < 0.6 && t.at[1] > bot && t.at[1] < bot + 30);
    assert.equal(duoi.length, 1, ten + ": mỗi đỉnh một giá trị ghi dưới trục ngang");
    return [duoi[0].t, +so.t.replace("%", "")];
  });
};
// biểu đồ tần số tương đối ghép nhóm dạng cột (Bài 24): trục đứng phần trăm; các cột acc-soft liền nhau, cùng bề rộng, đứng trên trục
// ngang; số phần trăm ở đỉnh cột (chữ đậm) bằng chiều cao cột; đầu mút các nhóm ghi dưới trục, thẳng cạnh cột → [[a, b, phần trăm], …]
const docHist = (svg, ten) => {
  const { bot, per, pct } = trucDung(svg, ten), T = texts(svg);
  assert.ok(pct, ten + ": trục đứng ghi tần số tương đối (%)");
  const cot = rects(svg).filter((r) => r.fill === "acc-soft").sort((a, b) => a.x - b.x);
  assert.ok(cot.length >= 3, ten + ": ít nhất ba cột");
  const ds = cot.map((r, i) => {
    assert.ok(Math.abs(r.y + r.h - bot) < 0.6, ten + ": cột đứng trên trục ngang");
    if (i) assert.ok(Math.abs(r.x - cot[i - 1].x - cot[i - 1].w) < 0.15 && Math.abs(r.w - cot[0].w) < 0.15, ten + ": các cột liền nhau, cùng bề rộng");
    const dinh = T.filter((t) => t.b && Math.abs(t.at[0] - (r.x + r.w / 2)) < 0.6 && t.at[1] < r.y && t.at[1] > r.y - 16);
    assert.ok(dinh.length === 1 && /^\d+%$/.test(dinh[0].t), ten + ": mỗi cột một số phần trăm ghi ngay trên");
    const p = +dinh[0].t.replace("%", "");
    assert.ok(Math.abs(bot - p * per - r.y) < 0.15, ten + ": số ở đỉnh cột " + dinh[0].t + " khác chiều cao cột");
    return p;
  });
  const mut = [cot[0].x].concat(cot.map((r) => r.x + r.w)).map((x) => {
    const t = T.filter((t) => !t.b && t.anchor === "middle" && Math.abs(t.at[0] - x) < 0.6 && t.at[1] > bot && t.at[1] < bot + 30);
    assert.ok(t.length === 1 && /^\d+$/.test(t[0].t), ten + ": mỗi cạnh cột một đầu mút ghi dưới trục"); return +t[0].t;
  });
  assert.ok(mut.every((v, i) => !i || v - mut[i - 1] === mut[1] - mut[0]) && mut[1] > mut[0], ten + ": các nhóm cùng độ dài, nối tiếp nhau");
  return ds.map((p, i) => [mut[i], mut[i + 1], p]);
};
// biểu đồ tần số tương đối dạng cột (Bài 22, Phiên N9-vao10-toan-c): trục đứng phần trăm; các cột acc-soft cách nhau, cùng bề rộng, đứng
// trên trục ngang; số phần trăm ở đỉnh cột (chữ đậm) bằng chiều cao cột; giá trị ghi dưới trục, thẳng giữa cột → [[giá trị, phần trăm], …]
const docCotTL = (svg, ten) => {
  const { bot, per, pct } = trucDung(svg, ten), T = texts(svg);
  assert.ok(pct, ten + ": trục đứng ghi tần số tương đối (%)");
  const cot = rects(svg).filter((r) => r.fill === "acc-soft").sort((a, b) => a.x - b.x);
  assert.ok(cot.length >= 3, ten + ": ít nhất ba cột");
  return cot.map((r, i) => {
    assert.ok(Math.abs(r.y + r.h - bot) < 0.6, ten + ": cột đứng trên trục ngang");
    if (i) assert.ok(r.x - cot[i - 1].x - cot[i - 1].w > 4 && Math.abs(r.w - cot[0].w) < 0.15, ten + ": các cột cách nhau, cùng bề rộng");
    const cx = r.x + r.w / 2, dinh = T.filter((t) => t.b && Math.abs(t.at[0] - cx) < 0.6 && t.at[1] < r.y && t.at[1] > r.y - 16);
    assert.ok(dinh.length === 1 && /^\d+%$/.test(dinh[0].t), ten + ": mỗi cột một số phần trăm ghi ngay trên");
    const p = +dinh[0].t.replace("%", "");
    assert.ok(Math.abs(bot - p * per - r.y) < 0.15, ten + ": số ở đỉnh cột " + dinh[0].t + " khác chiều cao cột");
    const duoi = T.filter((t) => !t.b && t.anchor === "middle" && Math.abs(t.at[0] - cx) < 0.6 && t.at[1] > bot && t.at[1] < bot + 30);
    assert.equal(duoi.length, 1, ten + ": mỗi cột một giá trị ghi dưới trục");
    return [duoi[0].t, p];
  });
};
// biểu đồ cột kép (Phiên N9-vao10-toan-c): trục đứng ghi số; mỗi tên dưới trục ngang một cặp cột sát nhau, cùng bề rộng, màu theo thứ tự
// hai ô chú giải (ô vuông cạnh 16, tên ghi bên phải); số ở đỉnh cột (chữ đậm) bằng chiều cao cột → { nhom: [tên, …], cot: { chú giải: [số, …] } }
const docCotKep = (svg, ten) => {
  const { bot, per, pct } = trucDung(svg, ten), T = texts(svg);
  assert.ok(!pct, ten + ": trục đứng ghi tần số");
  const vuong16 = (r) => r.w === 16 && r.h === 16;
  const chuGiai = rects(svg).filter(vuong16).sort((a, b) => a.x - b.x).map((r) => {
    const t = T.filter((t) => Math.abs(t.at[0] - (r.x + 24)) < 0.6 && Math.abs(t.at[1] - (r.y + 13)) < 0.6);
    assert.equal(t.length, 1, ten + ": mỗi ô chú giải một tên"); return { fill: r.fill, ten: t[0].t };
  });
  assert.ok(chuGiai.length === 2 && chuGiai[0].fill !== chuGiai[1].fill, ten + ": hai ô chú giải, hai màu");
  const cot = rects(svg).filter((r) => !vuong16(r)).sort((a, b) => a.x - b.x), nhom = [], kq = { [chuGiai[0].ten]: [], [chuGiai[1].ten]: [] };
  assert.ok(cot.length >= 4 && cot.length % 2 === 0, ten + ": các cột đi theo cặp");
  for (let i = 0; i < cot.length; i += 2) {
    const u = cot[i], v = cot[i + 1];
    assert.ok(u.fill === chuGiai[0].fill && v.fill === chuGiai[1].fill, ten + ": mỗi cặp cột theo thứ tự màu của chú giải");
    assert.ok(Math.abs(u.w - v.w) < 0.15 && v.x - u.x - u.w > 0 && v.x - u.x - u.w < 12, ten + ": hai cột của một cặp sát nhau, cùng bề rộng");
    if (i) assert.ok(u.x - cot[i - 1].x - cot[i - 1].w > 20, ten + ": các cặp cột cách xa nhau");
    [u, v].forEach((r, j) => {
      assert.ok(Math.abs(r.y + r.h - bot) < 0.6, ten + ": cột đứng trên trục ngang");
      const cx = r.x + r.w / 2, dinh = T.filter((t) => t.b && Math.abs(t.at[0] - cx) < 0.6 && t.at[1] < r.y && t.at[1] > r.y - 16);
      assert.ok(dinh.length === 1 && /^\d+$/.test(dinh[0].t), ten + ": mỗi cột một số ghi ngay trên");
      assert.ok(Math.abs(bot - +dinh[0].t * per - r.y) < 0.15, ten + ": số ở đỉnh cột " + dinh[0].t + " khác chiều cao cột");
      kq[chuGiai[j].ten].push(+dinh[0].t);
    });
    const g = (u.x + v.x + v.w) / 2, duoi = T.filter((t) => !t.b && t.anchor === "middle" && Math.abs(t.at[0] - g) < 0.6 && t.at[1] > bot && t.at[1] < bot + 30);
    assert.equal(duoi.length, 1, ten + ": mỗi cặp cột một tên ghi dưới trục"); nhom.push(duoi[0].t);
  }
  return { nhom, cot: kq };
};
// tấm bìa quay (Phiên N9-vao10-toan-c): một đường tròn chia thành các hình quạt bằng nhau, nối tiếp nhau đủ một vòng (mỗi hình quạt một path
// “M tâm L đầu cung A r r 0 cờ 1 cuối cung Z”, tâm và bán kính của đường tròn), mỗi hình quạt đúng một số (chữ đậm) nằm trong → [số, …]
const docBia = (svg, ten) => {
  const C = duongTron(svg); assert.equal(C.length, 1, ten + ": một đường tròn"); const c = C[0];
  const qs = [...svg.matchAll(/<path d="M ([\d.]+) ([\d.]+) L ([\d.]+) ([\d.]+) A ([\d.]+) ([\d.]+) 0 ([01]) 1 ([\d.]+) ([\d.]+) Z"/g)].map((m) => m.slice(1).map(Number));
  assert.ok(qs.length >= 2, ten + ": ít nhất hai hình quạt");
  const gocDo = (x, y) => (Math.atan2(y - c.c[1], x - c.c[0]) * 180) / Math.PI, lech = (a, b) => (((a - b) % 360) + 360) % 360, dam = texts(svg).filter((t) => t.b);
  let cuoi = null, tong = 0;
  const so = qs.map(([cx, cy, x0, y0, rx, ry, lon, x1, y1]) => {
    assert.ok(dist([cx, cy], c.c) < 0.15 && rx === c.r && ry === c.r, ten + ": hình quạt có tâm và bán kính của tấm bìa");
    assert.ok(Math.abs(dist([x0, y0], c.c) - c.r) < 0.15 && Math.abs(dist([x1, y1], c.c) - c.r) < 0.15, ten + ": hai đầu cung nằm trên đường tròn");
    const a0 = gocDo(x0, y0), d = lech(gocDo(x1, y1), a0);
    assert.equal(lon, d > 180 ? 1 : 0, ten + ": cờ cung lớn khớp số đo của hình quạt");
    assert.ok(Math.abs(d - 360 / qs.length) < 0.2, ten + ": các hình quạt bằng nhau");
    if (cuoi) assert.ok(dist(cuoi, [x0, y0]) < 0.15, ten + ": các hình quạt nối tiếp nhau");
    cuoi = [x1, y1]; tong += d;
    const nhan = dam.filter((t) => { const p = tamChu(t); return dist(p, c.c) < c.r && lech(gocDo(p[0], p[1]), a0) < d; });
    assert.equal(nhan.length, 1, ten + ": mỗi hình quạt đúng một số ở trong");
    return nhan[0].t;
  });
  assert.ok(Math.abs(tong - 360) < 0.5, ten + ": các hình quạt đủ một vòng tròn");
  return so;
};
// diện tích đa giác theo toạ độ (công thức dây giày)
const dtDaGiac = (...P) => Math.abs(P.reduce((s, p, i) => s + cross(p, P[(i + 1) % P.length]), 0)) / 2;

/* ---------- khung đề (docs/KE-HOACH-NOI-DUNG.md, mục 7, “Khung đề Toán”) ---------- */
const BAI = [["Bài 1. Hàm số y = ax²", 1.5], ["Bài 2. Phương trình bậc hai", 1], ["Bài 3. Thống kê và xác suất", 1.5], ["Bài 4. Lập biểu thức", 1],
  ["Bài 5. Đo lường thực tế", 1], ["Bài 6. Toán thực tế", 1], ["Bài 7. Hình học phẳng", 3]];
const NOTE0 = "Đề thi thử theo cấu trúc đề tuyển sinh lớp 10 của TP.HCM năm 2026. Tỉnh, thành khác có thể ra đề khác: xem thông báo của Sở.";
const diemVN = (x) => String(x).replace(".", ",");
// chủ đề: tên bài của sách Toán 8–9 có trong kho Toán 9 (đề “Ôn chủ đề” không rút câu tự luận, nhưng chủ đề vẫn gom “chủ đề hay sai”)
const CHU_DE = new Set(BANKS.filter((b) => b.file === "9-toan.js" && !/-vao10-/.test(b.id)).flatMap((b) => b.questions.map((q) => q.topic)));
const DE = BANKS.filter((b) => /^toan9-vao10-de\d+$/.test(b.id)).sort((a, b) => so(a) - so(b));
assert.ok(DE.length >= 4, "có ít nhất bốn đề Toán thi thử vào 10");
DE.forEach((b, i) => assert.equal(so(b), i + 1, "số đề liền nhau từ Đề 1: " + b.id));
const ev10 = EVENTS.find((e) => e.id === "vao10-2027");
assert.ok(ev10 && ev10.grades.join() === "9" && ev10.subjects.includes("Toán"), "kì thi vao10-2027 của khối 9 có môn Toán");
const ten = new Map(), deOf = new Map();
DE.forEach((b) => b.questions.forEach((q, i) => { ten.set(q, "de" + so(b) + "#" + (i + 1)); deOf.set(q, b); }));
const ALL = DE.flatMap((b) => b.questions);
const chuCau = (q) => [q.q, q.x].concat(q.rubric.map((r) => r.c));
const thangChu = (q) => q.rubric.map((r) => r.c).join(" | ");
const co = (q, ...ss) => { const t = chuCau(q).join(" | "); ss.forEach((s) => assert.ok(t.includes(s), `${ten.get(q)}: thiếu «${s}» (đề bài, thang chấm hoặc lời giải)`)); };
const coThang = (q, ...ss) => ss.forEach((s) => assert.ok(thangChu(q).includes(s), `${ten.get(q)}: thang chấm thiếu «${s}»`));
const coGiai = (q, ...ss) => ss.forEach((s) => assert.ok(q.x.includes(s), `${ten.get(q)}: lời giải thiếu «${s}»`));
const dapSo = (q) => { const m = /(?:^|\n)Đáp số: (.+)\.$/.exec(q.x); assert.ok(m, ten.get(q) + ": lời giải cần dòng cuối “Đáp số: ….”"); return m[1]; };
const tinhToan = (q) => /Tính|Tìm|Hỏi|bao nhiêu|ước lượng/.test(q.q) && !/Lập bảng|Vẽ|Chứng minh|Chứng tỏ/.test(q.q); // câu hỏi một kết quả (không phải lập bảng, vẽ, chứng minh)

DE.forEach((b) => {
  const N = so(b), at = b.id;
  assert.equal(b.title, `Toán 9 · Thi thử vào 10 · Đề ${N}`, at + ": tên đề");
  assert.ok(b.grade === 9 && b.subject === "Toán" && b.file === "9-toan.js" && b.minutes === 120 && b.pts === 10 && !b.pool, at + ": khối 9, môn Toán, file 9-toan.js, 120 phút, pts 10, không có pool");
  assert.equal(b.n, b.questions.length, at + ": n bằng số câu trong file");
  assert.ok(ev10.banks.includes(b.id), at + ": gắn vào vao10-2027");
  // bảy bài đúng tên, đúng thứ tự, đúng điểm; ý a), b), c) theo thứ tự
  const nhom = BAI.map(([p]) => b.questions.filter((q) => q.part === p));
  assert.equal(nhom.reduce((s, g) => s + g.length, 0), b.questions.length, at + ": mọi câu thuộc một trong bảy bài");
  assert.deepEqual([...new Set(b.questions.map((q) => q.part))], BAI.map(([p]) => p), at + ": bảy bài đúng thứ tự");
  nhom.forEach((g, k) => {
    const [p, d] = BAI[k], s = Math.round(g.reduce((t, q) => t + q.pt, 0) * 100) / 100;
    assert.equal(s, d, `${at}: ${p} có ${s} điểm, cần ${d}`);
    if (k === 5) { assert.equal(g.length, 1, at + ": Bài 6 là một câu"); assert.ok(!g[0].p && !/^[a-c]\) /.test(g[0].q), at + ": Bài 6 không chia ý, không dùng đoạn đề chung"); return; }
    assert.ok(g.length >= 2, `${at}: ${p} có ít nhất hai ý`);
    g.forEach((q, i) => assert.ok(q.q.startsWith("abc"[i] + ") "), `${ten.get(q)}: ý thứ ${i + 1} của ${p} phải bắt đầu bằng “${"abc"[i]}) ”`));
    if (k === 6) assert.deepEqual(g.map((q) => q.pt), [1, 1, 1], at + ": Bài 7 ba ý, mỗi ý 1 điểm");
    const ps = b.passages && b.passages["bai" + (k + 1)];
    assert.ok(ps && ps.title === `Bài ${k + 1} (${diemVN(d)} điểm)` && ps.text, `${at}: đề bài chung của Bài ${k + 1} ở passages.bai${k + 1}, tên “Bài ${k + 1} (${diemVN(d)} điểm)”`);
    g.forEach((q) => assert.equal(q.p, "bai" + (k + 1), `${ten.get(q)}: dùng đoạn bai${k + 1}`));
  });
  assert.deepEqual(Object.keys(b.passages).sort(), nhom.map((g, k) => (k === 5 ? null : "bai" + (k + 1))).filter(Boolean).sort(), at + ": passages chỉ gồm đề bài chung của các bài nhiều ý");
  b.questions.forEach((q) => {
    const t = ten.get(q);
    assert.equal(q.type, "essay", t + ": câu tự luận tự chấm (mặc định PO chọn)");
    assert.ok(CHU_DE.has(q.topic), t + ": chủ đề “" + q.topic + "” không có trong kho Toán 9");
    assert.ok([1, 2, 3].includes(q.lv), t + ": mức độ 1, 2 hoặc 3");
    assert.ok(q.rubric.length >= 1 && q.rubric.every((r) => r.p === 0.25 || (Number.isInteger(r.p * 2) && r.p > 0)), t + ": ý chấm 0,25 hoặc bội của 0,5 (có mức “Một phần”)");
    assert.ok(!/^Gợi ý/.test(q.x), t + ": lời giải không mở đầu bằng “Gợi ý” (app tự ghi)");
    if (tinhToan(q)) dapSo(q);
  });
  // note: câu chung, số ý, số điểm tự chấm, các bài có hình (tính từ dữ liệu)
  assert.ok(b.note.startsWith(NOTE0), at + ": note mở đầu bằng câu chung về khung TP.HCM");
  assert.ok(b.note.includes(`cả ${b.questions.length} ý (${diemVN(b.pts)} điểm) bạn tự chấm`) && b.note.includes("120 phút") && b.note.includes("7 bài tự luận"), at + ": note ghi số ý, số điểm tự chấm, 7 bài, 120 phút");
  const coHinh = Object.entries(b.passages).filter(([, ps]) => ps.svg).map(([k]) => "Bài " + k.slice(3));
  const m = /hình ((?:Bài \d(?:, )?)+) ở ngay trên đề bài/.exec(b.note);
  assert.ok(m && m[1].split(", ").join() === coHinh.join(), at + ": note ghi đúng các bài có hình: " + coHinh.join(", "));
  // Quiz.grade: đề toàn tự luận, điểm tối đa từng phần đúng như khung
  const G = Quiz.grade(b.questions, b.questions.map(() => null));
  assert.ok(G.max === 10 && G.auto === 0 && G.got === 0, at + ": Quiz.grade: tối đa 10, không có phần chấm tự động");
  assert.deepEqual(G.parts.map((p) => [p.part, p.max]), BAI, at + ": Quiz.grade: điểm tối đa từng phần");
});

/* ---------- chỉ dùng điều sách có dạy ----------
   Sách Toán 9 in năm 2026 (Bài 14, 27, 29) không có: góc tạo bởi tia tiếp tuyến và dây cung; đường kính vuông góc với dây (đi qua trung
   điểm của dây) và ngược lại; góc có đỉnh ở bên trong, bên ngoài đường tròn; phương tích; cung chứa góc; định lí đảo của tứ giác nội tiếp
   (Bài 29 chỉ có: tứ giác nội tiếp thì tổng hai góc đối bằng 180°). Lời giải chứng minh bốn điểm cùng thuộc một đường tròn bằng hai tam
   giác vuông chung cạnh huyền (như sách làm ở Bài 29), trung điểm của dây bằng tam giác cân (lớp 7). Có OnUp-Book thì kiểm tra lại
   các cụm này không có trong chữ OCR của Toán 9. */
const KHONG_DAY = [
  [/góc tạo bởi (?:tia )?tiếp tuyến|tiếp tuyến và dây/i, "góc tạo bởi tia tiếp tuyến và dây cung"],
  [/vuông góc với (?:một )?dây|đường kính đi qua trung điểm/i, "đường kính và dây"],
  [/đỉnh ở (?:bên )?(?:trong|ngoài) (?:một )?đường tròn/i, "góc có đỉnh ở bên trong, bên ngoài đường tròn"],
  [/phương tích/i, "phương tích"],
  [/cùng nhìn|cung chứa góc/i, "cung chứa góc"],
  [/180°[^.\n]*nên (?:tứ giác \S+ )?nội tiếp|nội tiếp được/i, "định lí đảo của tứ giác nội tiếp"],
];
const sachKhongDay = (t) => KHONG_DAY.filter(([re]) => re.test(t)).map(([, ten_]) => ten_);
DE.forEach((b) => {
  Object.entries(b.passages).forEach(([k, ps]) => sachKhongDay(ps.text).forEach((s) => assert.fail(`${b.id}: đề bài chung ${k} dùng ${s} (sách Toán 9 không dạy)`)));
  b.questions.forEach((q) => chuCau(q).forEach((t) => sachKhongDay(t).forEach((s) => assert.fail(`${ten.get(q)}: dùng ${s} (sách Toán 9 không dạy)`))));
});
assert.deepEqual(sachKhongDay("Đường kính AB vuông góc với dây CD tại H nên H là trung điểm của CD."), ["đường kính và dây"], "thử: bắt được định lí đường kính vuông góc với dây");
assert.deepEqual(sachKhongDay("Vì góc AHK + góc AMK = 180° nên tứ giác AHKM nội tiếp."), ["định lí đảo của tứ giác nội tiếp"], "thử: bắt được định lí đảo của tứ giác nội tiếp");
assert.deepEqual(sachKhongDay("Dây CD vuông góc với AB tại H. Tứ giác ABCD nội tiếp nên góc A + góc C = 180°."), [], "thử: câu dùng điều sách có dạy không bị bắt");

/* ---------- tính lại đáp án ---------- */
let soCau = 0;
const daKiem = new Set(), hinhDaDoc = new Set();
const cau = (b, k, i) => { const q = b.questions.filter((x) => x.part === BAI[k - 1][0])[i || 0]; assert.ok(q, `${b.id}: thiếu ý ${i || 0} của Bài ${k}`); daKiem.add(q); return q; };
const doanDe = (b, k) => b.passages["bai" + k];
const hinh = (b, k) => { const s = doanDe(b, k).svg; assert.ok(s, `${b.id}: Bài ${k} cần hình`); chuTrongKhung(s, `${b.id} Bài ${k}`); hinhDaDoc.add(s); return s; };
const docPhai = (q, re) => { const m = re.exec(q.q); assert.ok(m, `${ten.get(q)}: đề bài thiếu ${re}`); return m; };
const docDoan = (b, k, re) => { const m = re.exec(doanDe(b, k).text); assert.ok(m, `${b.id}: đề bài chung của Bài ${k} thiếu ${re}`); return m; };
const diemTrongDS = (s) => [...s.matchAll(/\((−?\d+(?:,\d+)?); (−?\d+(?:,\d+)?)\)/g)].map((m) => [fr(m[1]), fr(m[2])]);
const cungDiem = (u, v) => u.length === v.length && u.every((p) => v.some((r) => eq(p[0], r[0]) && eq(p[1], r[1])));

/* Bài 1: (P) y = ax² đọc từ đề bài chung; ý a: bảng giá trị (ở thang chấm và lời giải), hình dạng; ý b: điểm thuộc (P) thoả điều kiện */
const DIEU_KIEN = [
  [/có tung độ gấp (đôi|ba|bốn) hoành độ/, (m) => (x, y) => eq(y, mul(F({ đôi: 2, ba: 3, bốn: 4 }[m[1]]), x))],
  [/có hoành độ và tung độ là hai số đối nhau/, () => (x, y) => eq(y, neg(x))],
  [/có tung độ bằng hoành độ/, () => (x, y) => eq(y, x)],
  [/cách trục hoành (\d+) đơn vị/, (m) => (x, y) => eq(toNum(y) < 0 ? neg(y) : y, F(+m[1]))],
  [/cách trục tung (\d+) đơn vị/, (m) => (x) => eq(toNum(x) < 0 ? neg(x) : x, F(+m[1]))],
  [/có tung độ bằng (−?\d+)/, (m) => (x, y) => eq(y, fr(m[1]))],
  [/có tổng hoành độ và tung độ bằng (−?\d+)/, (m) => (x, y) => eq(add(x, y), fr(m[1]))],
  [/có tung độ lớn hơn hoành độ (\d+) đơn vị/, (m) => (x, y) => eq(y, add(x, F(+m[1])))],
  [/có tung độ nhỏ hơn hoành độ (\d+) đơn vị/, (m) => (x, y) => eq(y, sub(x, F(+m[1])))],
  [/cách đều hai trục toạ độ/, () => (x, y) => eq(toNum(y) < 0 ? neg(y) : y, toNum(x) < 0 ? neg(x) : x)],
  [/giao điểm của \(P\) và đường thẳng \(d\): y = (.+?) bằng phép tính/, (m) => (x, y) => eq(y, ev(m[1], { x }))]
];
const bai1 = (b) => {
  // hệ số a ghi trước x² (“y = x²”, “y = −x²” là a = 1, a = −1)
  const m = docDoan(b, 1, /^Cho hàm số y = (−?(?:\d+(?:,\d+)?)?)x² có đồ thị là parabol \(P\)\.$/), aChu = { "": "1", "−": "−1" }[m[1]] || m[1], a = fr(aChu), qa = cau(b, 1, 0), qb = cau(b, 1, 1);
  assert.ok(qa.q.includes(`y = ${m[1]}x²`), ten.get(qa) + ": ý a nhắc lại hàm số");
  // bảng giá trị: “x = …; …; … thì y = …” ở thang chấm, “x: …” và “y = …x²: …” ở lời giải
  const r = /x = ((?:−?\d+; )+−?\d+) thì y = ((?:−?\d+(?:,\d+)?; )+−?\d+(?:,\d+)?)/.exec(thangChu(qa)); assert.ok(r, ten.get(qa) + ": thang chấm ghi bảng giá trị");
  const xs = r[1].split("; ").map(fr), ys = r[2].split("; ").map(fr);
  assert.ok(xs.length >= 5 && xs.length === ys.length, ten.get(qa) + ": bảng có ít nhất 5 điểm");
  xs.forEach((x, i) => assert.ok(eq(ys[i], mul(a, mul(x, x))), `${ten.get(qa)}: bảng giá trị sai ở x = ${fmtF(x)}`));
  coGiai(qa, "x: " + r[1], `y = ${m[1]}x²: ` + r[2], ...xs.map((x, i) => (eq(x, F(0)) ? "O(0; 0)" : `(${fmtF(x)}; ${fmt(ys[i])})`)));
  const tren = toNum(a) > 0;
  coThang(qa, tren ? "nằm phía trên trục hoành" : "nằm phía dưới trục hoành", "đỉnh O", "trục đối xứng");
  coGiai(qa, tren ? "nằm phía trên trục hoành" : "nằm phía dưới trục hoành", tren ? "điểm thấp nhất" : "điểm cao nhất", `a = ${aChu} ${tren ? ">" : "<"} 0`);
  // ý b: thử mọi hoành độ hữu tỉ p/q, |p| ≤ 400, q ≤ 4
  const dk = DIEU_KIEN.filter(([re]) => re.test(qb.q)); assert.equal(dk.length, 1, ten.get(qb) + ": cần đúng một điều kiện đọc được");
  const f = dk[0][1](dk[0][0].exec(qb.q)), khacO = /khác gốc toạ độ O/.test(qb.q), dung = [];
  for (let q = 1; q <= 4; q++) for (let p = -400; p <= 400; p++) { if (gcd(p, q) !== 1) continue; const x = F(p, q), y = mul(a, mul(x, x)); if (f(x, y) && !(khacO && p === 0)) dung.push([x, y]); }
  assert.ok(dung.length >= 1 && dung.length <= 2, ten.get(qb) + ": có một hoặc hai điểm thoả điều kiện");
  assert.ok(cungDiem(diemTrongDS(dapSo(qb)), dung), `${ten.get(qb)}: đáp số ${dapSo(qb)}, tính được ${dung.map((p) => `(${fmtF(p[0])}; ${fmtF(p[1])})`).join(", ")}`);
  // không lộ: điểm của đáp số không có trong bảng giá trị của ý a
  dung.forEach((p) => assert.ok(!xs.some((x, i) => eq(x, p[0]) && eq(ys[i], p[1])), `${ten.get(qb)}: điểm (${fmtF(p[0])}; ${fmtF(p[1])}) có sẵn trong bảng giá trị của ý a`));
};

/* Bài 2: phương trình đọc từ đề bài chung (có thể có tham số m) */
const bai2 = (b) => {
  const m = docDoan(b, 2, /^Cho phương trình (.+ = 0)(, với m là tham số)?\.$/), pt = m[1], thamSo = !!m[2], qa = cau(b, 2, 0), qb = cau(b, 2, 1);
  [qa, qb].forEach((q) => assert.ok(q.q.includes(pt), ten.get(q) + ": ý nhắc lại phương trình"));
  if (!thamSo) {
    const e = bac2(pt), d = delta(e), d1 = deltaPhay(e);
    assert.ok(toNum(d) > 0, b.id + ": phương trình phải có hai nghiệm phân biệt");
    const chuoiTinh = (ten_, v) => new RegExp(`${ten_} = [^\\n]*?= ${fmt(v)}(?![\\d,])|${ten_} = ${fmt(v)}(?![\\d,])`).test(qa.x); // “Δ′ = b′² − ac = … = 5”
    const dung = [["Δ", d], ["Δ′", d1]].filter(([t, v]) => chuoiTinh(t, v));
    const ac = toNum(mul(e.a, e.c)) < 0 && new RegExp(`a · c = [^\\n]*?= ${fmt(mul(e.a, e.c))} < 0`).test(qa.x);
    assert.ok(dung.length || ac, ten.get(qa) + ": lời giải tính đúng Δ, Δ′ hoặc chỉ ra a · c < 0");
    assert.ok(/hai nghiệm phân biệt/.test(qa.x), ten.get(qa) + ": kết luận hai nghiệm phân biệt");
    // ý b: biểu thức của hai nghiệm, thay hai nghiệm thật vào
    const bt = docPhai(qb, /biểu thức ([A-Z]) = (.+)\.$/), [x1, x2] = nghiemThuc(e);
    const v = toNum(ev(bt[2].replace(/x₁/g, "p").replace(/x₂/g, "q"), { p: x1, q: x2 }));
    const ds = new RegExp(`^${bt[1]} = (−?\\d+(?:/\\d+)?)$`).exec(dapSo(qb)); assert.ok(ds, ten.get(qb) + ": đáp số dạng “" + bt[1] + " = …”");
    assert.ok(Math.abs(toNum(fr(ds[1])) - v) < 1e-9, `${ten.get(qb)}: đáp số ${ds[1]}, tính được ${v}`);
    coThang(qb, `x₁ + x₂ = ${fmtF(div(neg(e.b), e.a))}`, `x₁x₂ = ${fmtF(div(e.c, e.a))}`);
  } else {
    // ý a: điều kiện của m để có hai nghiệm phân biệt, thử m = −20; −19,5; …; 20
    const ds = /^m (<|>|≤|≥) (−?\d+)$/.exec(dapSo(qa)); assert.ok(ds, ten.get(qa) + ": đáp số dạng “m < …”");
    const nguong = toNum(fr(ds[2])), thoa = (x) => ({ "<": x < nguong, ">": x > nguong, "≤": x <= nguong, "≥": x >= nguong }[ds[1]]);
    for (let k = -40; k <= 40; k++) { const mm = F(k, 2); assert.equal(toNum(delta(bac2(pt, { m: mm }))) > 0, thoa(toNum(mm)), `${ten.get(qa)}: điều kiện sai ở m = ${fmtF(mm)}`); }
    // ý b: giá trị của m (hữu tỉ, mẫu ≤ 4) để có hai nghiệm phân biệt thoả hệ thức
    const ht = docPhai(qb, /thoả mãn (.+) = (−?\d+)\.$/), dung = [];
    for (let q = 1; q <= 4; q++) for (let p = -200; p <= 200; p++) {
      if (gcd(p, q) !== 1) continue;
      const e = bac2(pt, { m: F(p, q) }); if (toNum(delta(e)) <= 0) continue;
      const [x1, x2] = nghiemThuc(e); if (Math.abs(toNum(ev(ht[1].replace(/x₁/g, "p").replace(/x₂/g, "q"), { p: x1, q: x2 })) - toNum(fr(ht[2]))) < 1e-9) dung.push(F(p, q));
    }
    assert.equal(dung.length, 1, ten.get(qb) + ": có đúng một giá trị của m");
    assert.equal(dapSo(qb), `m = ${fmtF(dung[0])}`.replace(/\.$/, ""), ten.get(qb) + ": đáp số m");
  }
};

/* Bài 3, 4, 5, 6, 7: đọc số liệu từ đề (đề bài chung, đề bài của ý, hình) rồi tính lại; mỗi đề một hàm */
const phanTram = (a) => fmt(mul(a, F(100))) + "%";
const xs3 = (q, k) => { const s = dapSo(q), m = /(\d+)\/(\d+)(?: = (\d+)\/(\d+))?/.exec(s); assert.ok(m, ten.get(q) + ": đáp số ghi xác suất dạng phân số"); return [F(+m[1], +m[2]), m[3] ? F(+m[3], +m[4]) : null, k]; };
const xacSuat = (q, om, f) => {
  const fav = om.filter(f), [p1, p2] = xs3(q), want = F(fav.length, om.length);
  assert.ok(eq(p1, want) && (!p2 || (eq(p2, want) && p2.n === want.n && p2.d === want.d)), `${ten.get(q)}: xác suất ${fmtF(p1)}, tính được ${fav.length}/${om.length}`);
  assert.ok(new RegExp(`${om.length} kết quả`).test(q.x), ten.get(q) + `: lời giải nêu ${om.length} kết quả có thể`);
  return fav.length;
};
// Ω ghi trong lời giải: “Ω = {(…); (…)}” → danh sách cặp
const omGhi = (q) => { const m = /Ω = \{(.+?)\}/.exec(q.x); assert.ok(m, ten.get(q) + ": lời giải liệt kê Ω"); return m[1].split("; ").map((s) => s.replace(/^\(|\)$/g, "").split(", ")); };
const cungCap = (u, v) => JSON.stringify(u.map(String).sort()) === JSON.stringify(v.map(String).sort());
const xepNhom = (ds, nhom) => nhom.map(([a, c]) => ds.filter((x) => x >= a && x < c).length);
const tron = (v, k) => lamTron(v, k);

const RIENG = {
  "toan9-vao10-de1": (b) => {
    /* Bài 3: bảng tần số đọc từ hình */
    const bang = docBang(hinh(b, 3), b.id + " Bài 3"); assert.deepEqual(bang[0], ["Số quyển sách", "Số bạn"]);
    const ds = bang.slice(1).map((r) => [+r[0], +r[1]]), n = ds.reduce((s, r) => s + r[1], 0), qa = cau(b, 3, 0), qb = cau(b, 3, 1), qc = cau(b, 3, 2);
    co(qa, `= ${n} (bạn)`, ...ds.map(([v, f]) => `${v} quyển: ${f}/${n} = ${phanTram(F(f, n))}`));
    coThang(qa, ds.map(([v, f]) => `${v} quyển ${phanTram(F(f, n))}`).join("; "));
    const cungDo = ds.map(([, f]) => mul(F(f, n), F(360))); assert.ok(cungDo.every(isInt), b.id + ": số đo cung là số nguyên độ");
    coThang(qb, cungDo.map((c) => fmt(c) + "°").join("; ")); coGiai(qb, ...ds.map(([v, f], i) => `${v} quyển: ${phanTram(F(f, n))} · 360° = ${fmt(cungDo[i])}°`));
    const kq = docPhai(qc, /đã đọc ít nhất (\d+) quyển sách/), lop = ds.flatMap(([v, f]) => Array(f).fill(v));
    xacSuat(qc, lop, (v) => v >= +kq[1]);
    /* Bài 4: phí giao hàng */
    const g = docDoan(b, 4, /(\d+) kg đầu tiên giá (\d+ \d{3}) đồng, mỗi ki-lô-gam tiếp theo giá (\d+ \d{3}) đồng/), k0 = +g[1], p0 = fr(g[2]), p1 = fr(g[3]);
    const T = (x) => add(p0, mul(p1, sub(F(x), F(k0)))), q4a = cau(b, 4, 0), q4b = cau(b, 4, 1);
    const ct = /T = ([\d ]+x [+−] [\d ]+) \(x ≥ (\d+)\)/.exec(thangChu(q4a)); assert.ok(ct && +ct[2] === k0, ten.get(q4a) + ": công thức thu gọn và điều kiện");
    [3, 4, 7, 20].forEach((x) => assert.ok(eq(ev(ct[1].replace(/(\d) (\d)/g, "$1$2").replace("x", "·x"), { x: F(x) }), T(x)), ten.get(q4a) + ": công thức sai ở x = " + x));
    const tra = fr(docPhai(q4b, /trả phí (\d+ \d{3}) đồng/)[1]); let x4 = null; for (let x = k0; x <= 200; x++) if (eq(T(x), tra)) x4 = x;
    assert.ok(x4 !== null && dapSo(q4b) === `kiện hàng nặng ${x4} kg`, ten.get(q4b) + ": đáp số " + dapSo(q4b) + ", tính được " + x4);
    /* Bài 5: ống cống hình trụ rỗng: hình đúng tỉ lệ; thể tích, khối lượng */
    const s5 = hinh(b, 5), d5 = docDoan(b, 5, /dài (\d+) m, đường kính ngoài (\d+(?:,\d+)?) m, đường kính trong (\d+(?:,\d+)?) m/), h = fr(d5[1]), dn = fr(d5[2]), dt = fr(d5[3]);
    const el = ellipses(s5).sort((u, v) => v.rx - u.rx); assert.equal(el.length, 2, b.id + " Bài 5: mặt trên là hai elip");
    assert.ok(dist(el[0].c, el[1].c) < 0.15 && Math.abs(el[1].rx / el[0].rx - toNum(div(dt, dn))) < 0.01, b.id + " Bài 5: hai elip cùng tâm, tỉ lệ đường kính trong : ngoài đúng");
    const canh = lines(s5).filter((l) => l.w >= 2 && l.a[0] === l.b[0]); assert.equal(canh.length, 2, b.id + " Bài 5: hai đường sinh thẳng đứng");
    canh.forEach((l) => assert.ok(Math.abs(Math.abs(l.b[1] - l.a[1]) / (2 * el[0].rx) - toNum(div(h, dn))) < 0.01 && Math.abs(Math.abs(l.a[0] - el[0].c[0]) - el[0].rx) < 0.15, b.id + " Bài 5: chiều dài ống đúng tỉ lệ"));
    ["1 m", "0,8 m", "2 m"].forEach((t) => assert.ok(texts(s5).some((x) => x.t === t), b.id + " Bài 5: hình ghi " + t));
    const kv = mul(sub(mul(div(dn, F(2)), div(dn, F(2))), mul(div(dt, F(2)), div(dt, F(2)))), h), V = toNum(kv) * Math.PI, q5a = cau(b, 5, 0), q5b = cau(b, 5, 1);
    co(q5a, `${fmt(kv)}π ≈ ${tron(V, 2)} (m³)`);
    const kl = docPhai(q5b, /nặng khoảng (\d+ \d{3}) kg/), tan = docPhai(q5b, /tối đa (\d+(?:,\d+)?) tấn/), M = V * toNum(fr(kl[1]));
    co(q5b, `${fmt(kv)}π · ${kl[1]} ≈ ${tron(M, 0)} (kg)`, `${tan[1]} tấn = ${fmt(mul(fr(tan[1]), F(1000)))} kg`);
    assert.ok(M < toNum(fr(tan[1])) * 1000 && /nâng được/.test(q5b.x) && !/không nâng được/.test(q5b.x), ten.get(q5b) + ": kết luận nâng được");
    /* Bài 6: hệ phương trình */
    const q6 = cau(b, 6), s6 = docPhai(q6, /thiệp nhỏ giá (\d+ \d{3}) đồng một tấm, thiệp lớn giá (\d+ \d{3}) đồng một tấm\. Lớp bán được tất cả (\d+) tấm thiệp và thu được ([\d ]+) đồng/);
    const [g1, g2, tong, tien] = s6.slice(1).map((s) => toNum(fr(s))); const y6 = (tien - g1 * tong) / (g2 - g1), x6 = tong - y6;
    assert.ok(Number.isInteger(x6) && Number.isInteger(y6) && x6 > 0 && y6 > 0, ten.get(q6) + ": nghiệm là số tự nhiên");
    assert.equal(dapSo(q6), `${x6} tấm thiệp nhỏ và ${y6} tấm thiệp lớn`, ten.get(q6) + ": đáp số");
    coThang(q6, `x = ${x6}, y = ${y6}`);
    /* Bài 7: hai tiếp tuyến AB, AC; H = OA ∩ BC */
    const s7 = hinh(b, 7), D = diem(s7), C0 = duongTron(s7); assert.equal(C0.length, 1, b.id + " Bài 7: một đường tròn");
    const Ct = C0[0]; assert.ok(dist(D.O, Ct.c) < 0.6 && tren(Ct, D.B) && tren(Ct, D.C) && !tren(Ct, D.A) && dist(D.A, D.O) > Ct.r, b.id + " Bài 7: O là tâm, B, C trên đường tròn, A ở ngoài");
    assert.ok(vuong(subv(D.A, D.B), subv(D.O, D.B)) && vuong(subv(D.A, D.C), subv(D.O, D.C)), b.id + " Bài 7: AB, AC là tiếp tuyến");
    assert.ok(thang(D.O, D.A, D.H) && thang(D.B, D.C, D.H), b.id + " Bài 7: H là giao điểm của OA và BC");
    ["AB", "AC", "OA", "BC"].forEach((s) => assert.ok(coDoan(s7, D[s[0]], D[s[1]]), b.id + " Bài 7: hình có đoạn " + s));
    const c7 = docPhai(cau(b, 7, 2), /Cho R = (\d+) cm và OA = (\d+) cm/), R = +c7[1], OA = +c7[2], k = Ct.r / R;
    assert.ok(Math.abs(dist(D.O, D.A) / k - OA) < 0.02, b.id + " Bài 7: hình đúng tỉ lệ OA : R");
    assert.ok(cungTron(D.A, D.B, D.O, D.C), b.id + " Bài 7a: A, B, O, C cùng thuộc một đường tròn");
    assert.ok(vuong(subv(D.A, D.O), subv(D.C, D.B)) && Math.abs(dist(D.O, D.H) * dist(D.O, D.A) - Ct.r * Ct.r) < 0.01 * Ct.r * Ct.r, b.id + " Bài 7b: OA ⊥ BC, OH · OA = R²");
    const gBOC = goc(D.O, D.B, D.C), dtHinh = (Math.abs(cross(subv(D.B, D.A), subv(D.O, D.A))) / 2 + Math.abs(cross(subv(D.C, D.A), subv(D.O, D.A))) / 2) / (k * k) - (Math.PI * R * R * gBOC) / 360;
    const gocDung = 2 * Math.acos(R / OA) / RAD, dtDung = 2 * (0.5 * R * Math.sqrt(OA * OA - R * R)) - (Math.PI * R * R * gocDung) / 360;
    assert.ok(Math.abs(gBOC - gocDung) < 0.5 && Math.abs(dtHinh - dtDung) < 0.05, b.id + " Bài 7c: góc, diện tích đo trên hình khớp tính toán");
    const q7c = cau(b, 7, 2); assert.equal(dapSo(q7c), `góc BOC = ${Math.round(gocDung)}°; diện tích khoảng ${tron(dtDung, 2)} cm²`, ten.get(q7c) + ": đáp số");
    co(q7c, `9√3 − 3π ≈ ${tron(dtDung, 2)}`); assert.ok(Math.abs(9 * Math.sqrt(3) - 3 * Math.PI - dtDung) < 1e-9, ten.get(q7c) + ": 9√3 − 3π đúng là diện tích");
    co(cau(b, 7, 0), "góc ABO = 90°", "đường tròn đường kính OA"); co(cau(b, 7, 1), "OB² = OH · OA", "đường trung trực");
  },
  "toan9-vao10-de2": (b) => {
    /* Bài 3: biểu đồ cột đọc từ hình */
    const ds = docCot(hinh(b, 3), b.id + " Bài 3"), n = ds.reduce((s, r) => s + r[1], 0), qa = cau(b, 3, 0), qb = cau(b, 3, 1), qc = cau(b, 3, 2);
    co(qa, `${ds.map((r) => r[1]).join(" + ")} = ${n}`, ...ds.map(([t, f]) => `${t} ${f}/${n} = ${phanTram(F(f, n))}`));
    const tong = +docPhai(qb, /dự kiến bán (\d+) bó hoa/)[1], uoc = ds.map(([t, f]) => [t, mul(F(f, n), F(tong))]);
    assert.ok(uoc.every((u) => isInt(u[1])), b.id + ": số bó ước lượng là số nguyên");
    coThang(qb, uoc.map(([t, v]) => `${t} ${fmt(v)} bó`).join("; ")); coGiai(qb, ...uoc.map(([t, v], i) => `${t}: ${phanTram(F(ds[i][1], n))} · ${tong} = ${fmt(v)} (bó)`));
    // rút lần lượt hai lá không trả lại: 2 lá Tặng thiệp (T₁, T₂), 1 lá G, 1 lá M
    const la = ["T₁", "T₂", "G", "M"], om = la.flatMap((u) => la.filter((v) => v !== u).map((v) => [u, v]));
    assert.ok(cungCap(omGhi(qc).map((p) => p.join()), om.map((p) => p.join())), ten.get(qc) + ": Ω liệt kê đủ, đúng");
    co(qc, "2 lá “Tặng thiệp”, 1 lá “Giảm giá 10%” và 1 lá “Chúc may mắn”");
    xacSuat(qc, om, (p) => p.some((x) => x[0] === "T"));
    /* Bài 4: pin điện thoại */
    const g = docDoan(b, 4, /pin (\d+)%\)\. Khi xem phim trực tuyến liên tục, cứ mỗi giờ lượng pin giảm (\d+(?:,\d+)?)%/), p0 = fr(g[1]), giam = fr(g[2]);
    const q4a = cau(b, 4, 0), q4b = cau(b, 4, 1), ct = /P = (\d+) − (\d+(?:,\d+)?)t \(0 ≤ t ≤ (\d+)\)/.exec(thangChu(q4a));
    assert.ok(ct && eq(fr(ct[1]), p0) && eq(fr(ct[2]), giam) && eq(fr(ct[3]), div(p0, giam)), ten.get(q4a) + ": công thức P = 100 − 12,5t và điều kiện của t");
    const con = fr(docPhai(q4b, /khi lượng pin còn (\d+)%/)[1]), t = div(sub(p0, con), giam), gio = Math.floor(toNum(t)), phut = toNum(mul(sub(t, F(gio)), F(60)));
    assert.ok(Number.isInteger(phut) && dapSo(q4b) === `sau ${gio} giờ ${phut} phút`, ten.get(q4b) + ": đáp số " + dapSo(q4b) + ", tính được " + fmt(t) + " giờ");
    co(q4b, `t = ${fmt(t)} (giờ)`);
    /* Bài 5: vòi tưới ở góc bãi cỏ: hình đúng tỉ lệ; diện tích hình quạt, phần còn lại, độ dài cung */
    const s5 = hinh(b, 5), d5 = docDoan(b, 5, /dài (\d+) m, rộng (\d+) m\. .* bán kính (\d+) m/), dai = +d5[1], rong5 = +d5[2], r = +d5[3];
    const R5 = rects(s5).filter((x) => x.fill === "none"); assert.equal(R5.length, 1, b.id + " Bài 5: bãi cỏ là một hình chữ nhật");
    const hc = R5[0], A = diem(s5).A; assert.ok(Math.abs(hc.w / hc.h - dai / rong5) < 0.01 && dist(A, [hc.x, hc.y + hc.h]) < 0.6, b.id + " Bài 5: hình chữ nhật đúng tỉ lệ, A ở một góc");
    const qd = /<path d="M ([\d.]+) ([\d.]+) L ([\d.]+) ([\d.]+) A ([\d.]+) ([\d.]+) 0 0 0 ([\d.]+) ([\d.]+) Z"/.exec(s5); assert.ok(qd, b.id + " Bài 5: vùng tưới là một hình quạt");
    const [cx, cy, x0, y0, rx, , x1, y1] = qd.slice(1).map(Number), kk = hc.h / rong5;
    assert.ok(dist([cx, cy], A) < 0.6 && Math.abs(rx / kk - r) < 0.02 && Math.abs(dist([x0, y0], A) - rx) < 0.6 && Math.abs(dist([x1, y1], A) - rx) < 0.6 && vuong(subv([x0, y0], A), subv([x1, y1], A)), b.id + " Bài 5: hình quạt tâm A, bán kính đúng tỉ lệ, góc 90°");
    const Sq = Math.PI * r * r / 4, q5a = cau(b, 5, 0), q5b = cau(b, 5, 1);
    co(q5a, `= ${r * r / 4}π ≈ ${tron(Sq, 1)} (m²)`, `${dai} · ${rong5} = ${dai * rong5} (m²)`, `${dai * rong5} − ${r * r / 4}π ≈ ${tron(dai * rong5 - Sq, 1)} (m²)`);
    co(q5b, `= ${r / 2}π ≈ ${tron(Math.PI * r / 2, 1)} (m)`);
    /* Bài 6: phương trình có ẩn ở mẫu */
    const q6 = cau(b, 6), s6 = docPhai(q6, /có (\d+) ghế .* bỏ bớt (\d+) dãy .* mỗi dãy phải xếp thêm (\d+) ghế/), [gh, bot, them] = s6.slice(1).map(Number);
    const ng = nghiem(`${gh}/(x − ${bot}) − ${gh}/x = ${them}`).filter((x) => isInt(x) && x.n > bot);
    assert.equal(ng.length, 1, ten.get(q6) + ": đúng một nghiệm là số tự nhiên lớn hơn " + bot);
    assert.equal(dapSo(q6), `${ng[0].n} dãy ghế`, ten.get(q6) + ": đáp số");
    const e6 = bac2("x² − 3x − 270 = 0"); assert.ok(nghiemThuc(e6).some((x) => Math.abs(x - ng[0].n) < 1e-9) && nghiem(`${gh}x − ${gh}(x − ${bot}) = ${them}x(x − ${bot})`).every((x) => nghiemThuc(e6).some((y) => Math.abs(y - toNum(x)) < 1e-9)), ten.get(q6) + ": phương trình bậc hai x² − 3x − 270 = 0 đúng");
    coGiai(q6, "x² − 3x − 270 = 0", `${gh / ng[0].n} ghế`, `${gh / (ng[0].n - bot)} ghế`);
    /* Bài 7: đường kính AB, tiếp tuyến Bx, C trên (O), AC cắt Bx tại D, E trung điểm BD */
    const s7 = hinh(b, 7), D = diem(s7), Ct = duongTron(s7)[0];
    assert.ok(duongTron(s7).length === 1 && dist(mid(D.A, D.B), Ct.c) < 0.6 && dist(D.O, Ct.c) < 0.6 && Math.abs(dist(D.A, D.B) - 2 * Ct.r) < 0.6 && tren(Ct, D.C), b.id + " Bài 7: AB là đường kính, C trên đường tròn");
    const tt = lines(s7).find((l) => thang(l.a, l.b, D.B) && thang(l.a, l.b, D.D) && dist(l.a, l.b) > 2 * Ct.r);
    assert.ok(tt && vuong(subv(l2(tt), [0, 0]), subv(D.B, D.A)), b.id + " Bài 7: Bx vuông góc với AB tại B");
    assert.ok(giua(D.A, D.D, D.C) && dist(D.E, mid(D.B, D.D)) < 0.6, b.id + " Bài 7: C nằm giữa A và D, E là trung điểm của BD");
    assert.ok(vuong(subv(D.C, D.B), subv(D.D, D.A)) && cungTron(D.O, D.B, D.E, D.C), b.id + " Bài 7a: BC ⊥ AD; O, B, E, C cùng thuộc một đường tròn");
    assert.ok(Math.abs(dist(D.A, D.C) * dist(D.A, D.D) - 4 * Ct.r * Ct.r) < 0.01 * 4 * Ct.r * Ct.r, b.id + " Bài 7b: AC · AD = 4R²");
    const c7 = docPhai(cau(b, 7, 2), /Cho R = (\d+) cm và góc BAC = (\d+)°/), R = +c7[1], gA = +c7[2], k = Ct.r / R;
    assert.ok(Math.abs(goc(D.A, D.B, D.C) - gA) < 0.5, b.id + " Bài 7c: góc BAC trên hình bằng " + gA + "°");
    const BD = dist(D.B, D.D) / k, cung = (Math.PI * R * 2 * gA) / 180;
    assert.ok(Math.abs(BD - 2 * R * Math.tan(gA * RAD)) < 0.02 && Math.abs(goc(D.O, D.B, D.C) - 2 * gA) < 0.5, b.id + " Bài 7c: BD, góc BOC đo trên hình khớp tính toán");
    const q7c = cau(b, 7, 2); assert.equal(dapSo(q7c), `BD ≈ ${tron(BD, 2)} cm; cung nhỏ BC dài khoảng ${tron(cung, 2)} cm`, ten.get(q7c) + ": đáp số");
    co(q7c, `2√3 ≈ ${tron(2 * Math.sqrt(3), 2)}`, `= π ≈ ${tron(Math.PI, 2)}`); assert.ok(Math.abs(2 * Math.sqrt(3) - BD) < 0.01 && Math.abs(Math.PI - cung) < 1e-9, ten.get(q7c) + ": 2√3, π đúng");
    co(cau(b, 7, 0), "góc ACB = 90°", "đường tròn đường kính OE"); co(cau(b, 7, 1), "AC · AD = AB²");
  },
  "toan9-vao10-de3": (b) => {
    /* Bài 3: dãy số liệu trong đề, nhóm [a; b) trong ý a */
    const ds = docDoan(b, 3, /như sau:\n([\d;\s]+)\.$/)[1].split(/[;\s]+/).filter(Boolean).map(Number), qa = cau(b, 3, 0), qb = cau(b, 3, 1), qc = cau(b, 3, 2);
    const soBan = +docDoan(b, 3, /của (\d+) bạn nam/)[1]; assert.equal(ds.length, soBan, b.id + ": dãy số liệu có đủ " + soBan + " số");
    const nhom = [...qa.q.matchAll(/\[(\d+); (\d+)\)/g)].map((m) => [+m[1], +m[2]]); assert.ok(nhom.length >= 3 && nhom.every((g, i) => !i || g[0] === nhom[i - 1][1]), ten.get(qa) + ": các nhóm nối tiếp nhau");
    assert.ok(ds.every((x) => x >= nhom[0][0] && x < nhom[nhom.length - 1][1]), ten.get(qa) + ": mọi số liệu thuộc một nhóm");
    // số liệu ở đầu mút nhóm (kiểm tra cách xếp [a; b)): lời giải nêu “v thuộc nhóm [v; c)”, v có trong dãy
    const mut = [...chuCau(qa).join(" ").matchAll(/(\d+) thuộc nhóm \[(\d+); (\d+)\)/g)].map((m) => m.slice(1).map(Number));
    assert.ok(mut.length && mut.every(([v, a]) => v === a && ds.includes(v) && nhom.some((g) => g[0] === a)), ten.get(qa) + ": lời giải nêu số liệu ở đầu mút nhóm, số đó có trong dãy");
    const ts = xepNhom(ds, nhom); coThang(qa, ts.join("; "));
    nhom.forEach(([a, c], i) => coGiai(qa, `[${a}; ${c}): ${ds.filter((x) => x >= a && x < c).join("; ")} → ${ts[i]} bạn.`));
    coThang(qb, ts.map((f) => phanTram(F(f, soBan))).join("; "));
    const nguong = +docPhai(qb, /bật xa từ (\d+) cm trở lên/)[1], tl = F(ds.filter((x) => x >= nguong).length, soBan);
    assert.equal(dapSo(qb), phanTram(tl), ten.get(qb) + ": đáp số");
    const nd = ["X", "C", "N"], om = nd.flatMap((u) => nd.map((v) => [u, v]));
    assert.ok(cungCap(omGhi(qc).map((p) => p.join()), om.map((p) => p.join())), ten.get(qc) + ": Ω liệt kê đủ, đúng");
    xacSuat(qc, om, (p) => p[0] !== p[1]);
    /* Bài 4: nhịp tim */
    const g = docDoan(b, 4, /bằng (\d+) trừ đi số tuổi; .* khoảng (\d+)% nhịp tim tối đa/), base = +g[1], tl4 = F(+g[2], 100), q4a = cau(b, 4, 0), q4b = cau(b, 4, 1);
    coThang(q4a, `H = ${fmt(tl4)}(${base} − a), tức là H = ${fmt(mul(tl4, F(base)))} − ${fmt(tl4)}a`);
    const nhip = fr(docPhai(q4b, /giữ nhịp tim (\d+) nhịp\/phút/)[1]), tuoi = sub(F(base), div(nhip, tl4));
    assert.ok(isInt(tuoi) && dapSo(q4b) === `chú Dũng ${fmt(tuoi)} tuổi`, ten.get(q4b) + ": đáp số " + dapSo(q4b) + ", tính được " + fmtF(tuoi));
    /* Bài 5: đống cát hình nón */
    const s5 = hinh(b, 5), D5 = diem(s5), d5 = docDoan(b, 5, /đường kính đáy (\d+) m, chiều cao (\d+(?:,\d+)?) m/), d = fr(d5[1]), h = fr(d5[2]), r = div(d, F(2));
    assert.ok(Math.abs(D5.S[0] - D5.O[0]) < 0.15 && Math.abs(D5.O[1] - D5.A[1]) < 0.15 && coDoan(s5, D5.S, D5.A), b.id + " Bài 5: SO thẳng đứng, OA nằm ngang, SA là một đường sinh");
    assert.ok(Math.abs(dist(D5.S, D5.O) / dist(D5.O, D5.A) - toNum(div(h, r)) < 0.01), b.id + " Bài 5: chiều cao và bán kính đáy đúng tỉ lệ");
    ["4 m", "1,5 m"].forEach((t) => assert.ok(texts(s5).some((x) => x.t === t), b.id + " Bài 5: hình ghi " + t));
    const kV = mul(F(1, 3), mul(mul(r, r), h)), l = sqrt(add(mul(r, r), mul(h, h))), kS = mul(r, l), q5a = cau(b, 5, 0), q5b = cau(b, 5, 1);
    assert.ok(isR(l), b.id + ": đường sinh là số hữu tỉ");
    co(q5a, `= ${fmt(kV)}π ≈ ${tron(toNum(kV) * Math.PI, 2)} (m³)`); co(q5b, `= ${fmt(l)} (m)`, `= ${fmt(kS)}π ≈ ${tron(toNum(kS) * Math.PI, 1)} (m²)`);
    /* Bài 6: bất phương trình */
    const q6 = cau(b, 6), s6 = docPhai(q6, /nhập về (\d+) chiếc áo khoác với giá (\d+ \d{3}) đồng một chiếc\. Cửa hàng bán một số áo với giá (\d+ \d{3}) đồng một chiếc, số áo còn lại bán giảm giá (\d+)% .* tiền lãi không dưới ([\d ]+) đồng/);
    const [sl, gv, gb, gg, lai] = s6.slice(1).map((s) => toNum(fr(s))), giaGiam = gb * (100 - gg) / 100, laiOf = (x) => gb * x + giaGiam * (sl - x) - sl * gv;
    let x6 = null; for (let x = 0; x <= sl; x++) if (laiOf(x) >= lai) { x6 = x; break; }
    assert.ok(x6 !== null && laiOf(x6 - 1) < lai && dapSo(q6) === `ít nhất ${x6} chiếc áo`, ten.get(q6) + ": đáp số " + dapSo(q6) + ", tính được " + x6);
    co(q6, `${thou(String(giaGiam))} (đồng)`, `${thou(String(sl * gv))} (đồng)`, `x = ${x6} thì lãi ${thou(String(laiOf(x6)))} đồng`, `x = ${x6 - 1} thì lãi ${thou(String(laiOf(x6 - 1)))} đồng`);
    /* Bài 7: đường kính AB, dây CD ⊥ AB tại H, M trên cung nhỏ AC, K = MB ∩ CD */
    const s7 = hinh(b, 7), D = diem(s7), Ct = duongTron(s7)[0];
    assert.ok(duongTron(s7).length === 1 && dist(D.O, Ct.c) < 0.6 && dist(mid(D.A, D.B), D.O) < 0.6 && Math.abs(dist(D.A, D.B) - 2 * Ct.r) < 0.6, b.id + " Bài 7: AB là đường kính");
    ["C", "D", "M"].forEach((k) => assert.ok(tren(Ct, D[k]), b.id + " Bài 7: " + k + " nằm trên đường tròn"));
    assert.ok(vuong(subv(D.C, D.D), subv(D.A, D.B)) && thang(D.C, D.D, D.H) && thang(D.A, D.B, D.H) && giua(D.O, D.B, D.H), b.id + " Bài 7: CD ⊥ AB tại H, H nằm giữa O và B");
    const gMd = (P) => (Math.atan2(-(P[1] - D.O[1]), P[0] - D.O[0]) / RAD + 360) % 360;
    assert.ok(gMd(D.M) > gMd(D.C) && gMd(D.M) < gMd(D.A), b.id + " Bài 7: M thuộc cung nhỏ AC");
    assert.ok(thang(D.M, D.B, D.K) && giua(D.C, D.H, D.K), b.id + " Bài 7: K là giao điểm của MB và CD (K nằm giữa C và H)");
    assert.ok(cungTron(D.A, D.H, D.K, D.M) && Math.abs(dist(D.B, D.K) * dist(D.B, D.M) - dist(D.B, D.H) * dist(D.B, D.A)) < 0.01 * dist(D.B, D.H) * dist(D.B, D.A), b.id + " Bài 7a, b: AHKM nội tiếp, BK · BM = BH · BA");
    const c7 = docPhai(cau(b, 7, 2), /Cho AB = (\d+) cm và BH = (\d+) cm/), AB = +c7[1], BH = +c7[2], k = dist(D.A, D.B) / AB;
    assert.ok(Math.abs(dist(D.B, D.H) / k - BH) < 0.02, b.id + " Bài 7: hình đúng tỉ lệ BH : AB");
    const CD = dist(D.C, D.D) / k, gCAD = goc(D.A, D.C, D.D), R = AB / 2, CH = Math.sqrt(R * R - (R - BH) ** 2), gDung = 2 * Math.atan(CH / (AB - BH)) / RAD;
    assert.ok(Math.abs(CD - 2 * CH) < 0.02 && Math.abs(gCAD - gDung) < 0.5, b.id + " Bài 7c: CD, góc CAD đo trên hình khớp tính toán");
    const q7c = cau(b, 7, 2); assert.equal(dapSo(q7c), `CD = ${fmt(F(Math.round(2 * CH)))} cm; góc CAD ≈ ${Math.round(gDung)}°`, ten.get(q7c) + ": đáp số");
    assert.ok(Number.isInteger(Math.round(CH * 1e9) / 1e9), b.id + ": CH là số nguyên");
    co(q7c, `góc CAH ≈ ${tron(gDung / 2, 1)}°`); assert.equal(Math.round(toNum(fr(tron(gDung / 2, 1))) * 2), Math.round(gDung), ten.get(q7c) + ": làm tròn góc CAH rồi nhân 2 vẫn ra cùng số độ");
    co(cau(b, 7, 0), "góc AMB = 90°", "đường tròn đường kính AK"); co(cau(b, 7, 1), "BH/BM = BK/BA");
  },
  "toan9-vao10-de4": (b) => {
    /* Bài 3: biểu đồ hình quạt tròn đọc từ hình */
    const qt = docQuat(hinh(b, 3), b.id + " Bài 3"), n = +docDoan(b, 3, /của (\d+) khách hàng/)[1], qa = cau(b, 3, 0), qb = cau(b, 3, 1), qc = cau(b, 3, 2);
    const ts = qt.map(([t, p]) => [t, n * p / 100]); assert.ok(ts.every((x) => Number.isInteger(x[1])), b.id + ": số khách hàng là số nguyên");
    coThang(qa, ts.map(([t, f]) => `${t} ${f}`).join("; ")); coGiai(qa, ...qt.map(([t, p], i) => `${t}: ${p}% · ${n} = ${ts[i][1]}`));
    coThang(qb, ts.map((x) => x[1]).join("; "));
    const om = [1, 2, 3, 4, 5, 6].flatMap((d) => ["S", "N"].map((c) => [String(d), c]));
    assert.ok(cungCap(omGhi(qc).map((p) => p.join()), om.map((p) => p.join())), ten.get(qc) + ": Ω liệt kê đủ, đúng");
    assert.ok(/số nguyên tố/.test(qc.q) && /mặt ngửa/.test(qc.q), ten.get(qc) + ": điều kiện số nguyên tố và mặt ngửa");
    xacSuat(qc, om, (p) => [2, 3, 5].includes(+p[0]) && p[1] === "N");
    /* Bài 4: lượng xăng trong bình */
    const g = docDoan(b, 4, /chứa được (\d+) lít\. Trung bình cứ đi (\d+) km thì xe tiêu thụ (\d+) lít xăng/), v0 = +g[1], tieu = F(+g[3], +g[2]), q4a = cau(b, 4, 0), q4b = cau(b, 4, 1);
    coThang(q4a, `V = ${v0} − ${fmt(tieu)}x (0 ≤ x ≤ ${fmt(div(F(v0), tieu))})`);
    const it = +docPhai(q4b, /ít hơn (\d+) lít/)[1], xmax = div(F(v0 - it), tieu);
    assert.ok(isInt(xmax) && dapSo(q4b) === `nhiều nhất ${fmt(xmax)} km`, ten.get(q4b) + ": đáp số " + dapSo(q4b) + ", tính được " + fmtF(xmax));
    coThang(q4b, `${v0} − ${fmt(tieu)}x ≥ ${it}`, `x ≤ ${fmt(xmax)}`);
    /* Bài 5: quả địa cầu */
    const s5 = hinh(b, 5), d = +docDoan(b, 5, /đường kính (\d+) cm/)[1], C5 = duongTron(s5); assert.equal(C5.length, 1, b.id + " Bài 5: một đường tròn");
    const dk = lines(s5).filter((l) => l.a[0] === l.b[0] && Math.abs(l.a[0] - C5[0].c[0]) < 0.15); assert.ok(dk.length === 1 && Math.abs(Math.abs(dk[0].b[1] - dk[0].a[1]) - 2 * C5[0].r) < 0.6, b.id + " Bài 5: đường kính vẽ qua tâm");
    assert.ok(texts(s5).some((x) => x.t === `${d} cm`), b.id + " Bài 5: hình ghi đường kính");
    const R = d / 2, kS = 4 * R * R, tl = +docPhai(cau(b, 5, 1), /chiếm khoảng (\d+)%/)[1], q5a = cau(b, 5, 0), q5b = cau(b, 5, 1);
    co(q5a, `= ${thou(String(kS))}π ≈ ${tron(kS * Math.PI, 0)} (cm²)`); co(q5b, `= ${thou(String(kS * tl / 100))}π ≈ ${tron(kS * tl / 100 * Math.PI, 0)} (cm²)`);
    /* Bài 6: hệ phương trình có phần trăm */
    const q6 = cau(b, 6), s6 = docPhai(q6, /trả tổng cộng ([\d ]+) đồng tiền điện và tiền nước\. .*tiền điện tăng (\d+)% và tiền nước tăng (\d+)%; tổng số tiền điện và tiền nước của tháng 6 là ([\d ]+) đồng/);
    const tong = fr(s6[1]), pd = F(100 + +s6[2], 100), pn = F(100 + +s6[3], 100), t6 = fr(s6[4]);
    const x = div(sub(t6, mul(pn, tong)), sub(pd, pn)), y = sub(tong, x);
    assert.ok(isInt(x) && isInt(y) && x.n > 0 && y.n > 0, ten.get(q6) + ": nghiệm là số nguyên dương");
    assert.equal(dapSo(q6), `tháng 5 nhà An trả ${fmt(x)} đồng tiền điện và ${fmt(y)} đồng tiền nước`, ten.get(q6) + ": đáp số");
    coThang(q6, `x = ${fmt(x)}, y = ${fmt(y)}`);
    /* Bài 7: tiếp tuyến AM, cát tuyến ABC, I trung điểm BC */
    const s7 = hinh(b, 7), D = diem(s7), Ct = duongTron(s7)[0];
    assert.ok(duongTron(s7).length === 1 && dist(D.O, Ct.c) < 0.6 && tren(Ct, D.M) && tren(Ct, D.B) && tren(Ct, D.C) && dist(D.A, D.O) > Ct.r, b.id + " Bài 7: O là tâm, M, B, C trên đường tròn, A ở ngoài");
    assert.ok(vuong(subv(D.A, D.M), subv(D.O, D.M)) && giua(D.A, D.C, D.B) && dist(D.I, mid(D.B, D.C)) < 0.6 && !thang(D.A, D.C, D.O), b.id + " Bài 7: AM là tiếp tuyến, B nằm giữa A và C, I là trung điểm của BC, cát tuyến không qua O");
    assert.ok(vuong(subv(D.I, D.O), subv(D.C, D.B)) && cungTron(D.A, D.M, D.O, D.I), b.id + " Bài 7a: OI ⊥ BC; A, M, I, O cùng thuộc một đường tròn");
    assert.ok(Math.abs(dist(D.A, D.M) ** 2 - dist(D.A, D.B) * dist(D.A, D.C)) < 0.01 * dist(D.A, D.M) ** 2, b.id + " Bài 7b: AM² = AB · AC");
    const c7 = docPhai(cau(b, 7, 2), /Cho R = (\d+) cm, OA = (\d+) cm và BC = (\d+) cm/), R7 = +c7[1], OA = +c7[2], BC = +c7[3], k = Ct.r / R7;
    assert.ok(Math.abs(dist(D.O, D.A) / k - OA) < 0.02 && Math.abs(dist(D.B, D.C) / k - BC) < 0.02, b.id + " Bài 7: hình đúng tỉ lệ OA, BC theo R");
    const AM = Math.sqrt(OA * OA - R7 * R7), AB = Math.sqrt(OA * OA - (R7 * R7 - BC * BC / 4)) - BC / 2;
    assert.ok(Math.abs(dist(D.A, D.M) / k - AM) < 0.02 && Math.abs(dist(D.A, D.B) / k - AB) < 0.02, b.id + " Bài 7c: AM, AB đo trên hình khớp tính toán");
    const q7c = cau(b, 7, 2); assert.ok(Number.isInteger(AM) && dapSo(q7c) === `AM = ${AM} cm; AB ≈ ${tron(AB, 2)} cm`, ten.get(q7c) + ": đáp số");
    const AI2 = OA * OA - (R7 * R7 - BC * BC / 4), can = canGon(AI2); assert.ok(Number.isInteger(AI2), b.id + ": AI² là số nguyên");
    co(q7c, `√(${OA}² − ${R7 * R7 - BC * BC / 4}) = √${AI2} = ${can} (cm)`, `${can} − ${BC / 2} ≈ ${tron(AB, 2)}`);
    co(cau(b, 7, 0), "góc AMO = 90°", "góc AIO = 90°", "đường tròn đường kính AO"); co(cau(b, 7, 1), "AB · AC = (AI − IB)(AI + IB) = AI² − IB²");
  },
  "toan9-vao10-de5": (b) => {
    /* Bài 3: biểu đồ tần số dạng đoạn thẳng đọc từ hình; tần số tương đối, cỡ bán chạy; gieo hai con xúc xắc */
    const ds = docDuong(hinh(b, 3), b.id + " Bài 3"), n = ds.reduce((s, r) => s + r[1], 0), qa = cau(b, 3, 0), qb = cau(b, 3, 1), qc = cau(b, 3, 2);
    assert.ok(ds.every(([c], i) => /^\d+$/.test(c) && (!i || +c === +ds[i - 1][0] + 1)), b.id + " Bài 3: các cỡ giày liên tiếp");
    co(qa, `${ds.map((r) => r[1]).join(" + ")} = ${n} (đôi)`, "Cỡ giày: " + ds.map((r) => r[0]).join("; "), "Số đôi giày (tần số): " + ds.map((r) => r[1]).join("; "));
    coThang(qa, ds.map(([c, f]) => `cỡ ${c}: ${f}`).join("; "));
    const tl = ds.map(([c, f]) => [c, F(f, n)]);
    coThang(qb, tl.map(([c, p]) => `cỡ ${c}: ${phanTram(p)}`).join("; ")); coGiai(qb, ...ds.map(([c, f]) => `cỡ ${c}: ${f}/${n} = ${phanTram(F(f, n))}`), "Tần số tương đối: " + tl.map((r) => phanTram(r[1])).join("; "));
    const ng = +docPhai(qb, /từ (\d+)% trở lên/)[1], chay = tl.filter(([, p]) => toNum(p) * 100 >= ng), tong = chay.reduce((s, r) => add(s, r[1]), F(0));
    assert.equal(dapSo(qb), `${chay.map(([c]) => "cỡ " + c).join(" và ")}, chiếm ${chay.map((r) => phanTram(r[1])).join(" + ")} = ${phanTram(tong)} số đôi giày đã bán`, ten.get(qb) + ": đáp số");
    // gieo hai con xúc xắc: hai số chấm hơn kém nhau đúng h; lời giải liệt kê đủ, đúng các kết quả thuận lợi
    const hk = +docPhai(qc, /gieo cùng lúc hai con xúc xắc đều cân đối và đồng chất; nếu số chấm của hai con xúc xắc hơn kém nhau đúng (\d+) thì/)[1];
    const om = [1, 2, 3, 4, 5, 6].flatMap((i) => [1, 2, 3, 4, 5, 6].map((j) => [i, j])), hon = ([i, j]) => Math.abs(i - j) === hk;
    const fav = xacSuat(qc, om, hon), ghi = new RegExp(`hơn kém nhau đúng ${hk} trong các kết quả: ((?:\\(\\d; \\d\\)(?:, )?)+), gồm (\\d+) kết quả`).exec(qc.x);
    assert.ok(ghi && +ghi[2] === fav && cungCap([...ghi[1].matchAll(/\((\d); (\d)\)/g)].map((m) => m[1] + "," + m[2]), om.filter(hon).map(String)), ten.get(qc) + ": lời giải liệt kê đủ, đúng các kết quả thuận lợi");
    /* Bài 4: áp suất theo độ sâu */
    const g = docDoan(b, 4, /áp suất là (\d+) atm; cứ xuống sâu thêm (\d+) m thì áp suất tăng thêm (\d+) atm/), p0 = F(+g[1]), k4 = F(+g[3], +g[2]), q4a = cau(b, 4, 0), q4b = cau(b, 4, 1);
    coThang(q4a, `p = ${fmt(p0)} + ${fmt(k4)}d (d ≥ 0)`);
    const chi = fr(docPhai(q4b, /chỉ (\d+(?:,\d+)?) atm/)[1]), d4 = div(sub(chi, p0), k4);
    assert.ok(isInt(d4) && toNum(d4) > 0 && dapSo(q4b) === `thợ lặn đang ở độ sâu ${fmt(d4)} m`, ten.get(q4b) + ": đáp số " + dapSo(q4b) + ", tính được " + fmtF(d4));
    coThang(q4b, `${fmt(p0)} + ${fmt(k4)}d = ${fmt(chi)}`); co(q4b, `${fmt(p0)} + ${fmt(k4)} · ${fmt(d4)} = ${fmt(chi)} (atm)`);
    /* Bài 5: lối đi hình vành khuyên quanh đài phun nước: hình đúng tỉ lệ; diện tích, chi phí */
    const s5 = hinh(b, 5), d5 = docDoan(b, 5, /bán kính (\d+(?:,\d+)?) m\. Người ta làm một lối đi rộng (\d+(?:,\d+)?) m/), r5 = fr(d5[1]), w5 = fr(d5[2]), R5 = add(r5, w5);
    const C5 = duongTron(s5).sort((u, v) => v.r - u.r), O5 = diem(s5).O; assert.equal(C5.length, 2, b.id + " Bài 5: hai đường tròn");
    assert.ok(C5.every((c) => dist(c.c, O5) < 0.15) && Math.abs(C5[1].r / C5[0].r - toNum(div(r5, R5))) < 0.005, b.id + " Bài 5: hai đường tròn cùng tâm O, tỉ lệ bán kính đúng");
    assert.ok(C5[0].fill === "sun-soft" && C5[1].fill === "acc-soft", b.id + " Bài 5: lối đi và đài phun nước tô hai màu");
    const L5 = lines(s5), bk = L5.find((l) => dist(l.a, O5) < 0.6 && Math.abs(dist(l.b, O5) - C5[1].r) < 0.6), br = L5.find((l) => Math.abs(dist(l.a, O5) - C5[1].r) < 0.6 && Math.abs(dist(l.b, O5) - C5[0].r) < 0.6);
    assert.ok(bk && br && thang(O5, br.b, bk.b) && thang(O5, br.b, br.a), b.id + " Bài 5: đoạn bán kính trong và đoạn bề rộng lối đi trên cùng một tia");
    [`${fmt(r5)} m`, `${fmt(w5)} m`].forEach((t) => assert.ok(texts(s5).some((x) => x.t === t), b.id + " Bài 5: hình ghi " + t));
    const viTri = (t) => dist(tamChu(texts(s5).find((x) => x.t === t)), O5);
    assert.ok(viTri("Đài phun nước") < C5[1].r && viTri("Lối đi") > C5[1].r && viTri("Lối đi") < C5[0].r, b.id + " Bài 5: chữ “Lối đi”, “Đài phun nước” đúng chỗ");
    const kS = sub(mul(R5, R5), mul(r5, r5)), S5 = toNum(kS) * Math.PI, q5a = cau(b, 5, 0), q5b = cau(b, 5, 1);
    co(q5a, `${fmt(r5)} + ${fmt(w5)} = ${fmt(R5)} (m)`, `π(${fmt(R5)}² − ${fmt(r5)}²) = π(${fmt(mul(R5, R5))} − ${fmt(mul(r5, r5))}) = ${fmt(kS)}π ≈ ${tron(S5, 2)} (m²)`);
    assert.equal(dapSo(q5a), `khoảng ${tron(S5, 2)} m²`, ten.get(q5a) + ": đáp số");
    const gia = fr(docPhai(q5b, /chi phí ([\d ]+) đồng cho mỗi mét vuông/)[1]), tien = S5 * toNum(gia), nghin = toNum(fr(lamTron(tien / 1000, 0))) * 1000;
    co(q5b, `${fmt(kS)}π · ${fmt(gia)} = ${fmt(mul(kS, gia))}π ≈ ${lamTron(tien, 0)} (đồng)`, `${tron(S5, 2)} m² thì được ${fmt(mul(fr(tron(S5, 2)), gia))} đồng`);
    assert.equal(dapSo(q5b), `khoảng ${fmt(F(nghin))} đồng`, ten.get(q5b) + ": đáp số");
    /* Bài 6: pha dung dịch nước muối: hệ phương trình */
    const q6 = cau(b, 6), s6 = docPhai(q6, /loại I có nồng độ muối (\d+)%, loại II có nồng độ muối (\d+)% .* pha được (\d+) g dung dịch nước muối có nồng độ (\d+)%/);
    const [c1, c2, m6, c6] = s6.slice(1).map(Number), y6 = div(F((c6 - c1) * m6), F(c2 - c1)), x6 = sub(F(m6), y6);
    assert.ok(isInt(x6) && isInt(y6) && x6.n > 0 && y6.n > 0, ten.get(q6) + ": nghiệm là số dương");
    assert.equal(dapSo(q6), `cần ${fmt(x6)} g dung dịch loại I và ${fmt(y6)} g dung dịch loại II`, ten.get(q6) + ": đáp số");
    coThang(q6, `{x + y = ${m6}; ${fmt(F(c1, 100))}x + ${fmt(F(c2, 100))}y = ${fmt(F(c6 * m6, 100))}}`, `x = ${fmt(x6)}, y = ${fmt(y6)}`);
    co(q6, `${c6}% · ${m6} = ${fmt(F(c6 * m6, 100))} (g)`);
    /* Bài 7: tam giác nhọn ABC nội tiếp (O), đường kính AD, đường cao AH, E là hình chiếu của B trên AD */
    const s7 = hinh(b, 7), D = diem(s7), C7 = duongTron(s7); assert.equal(C7.length, 1, b.id + " Bài 7: một đường tròn");
    const Ct = C7[0]; assert.ok(dist(D.O, Ct.c) < 0.6 && ["A", "B", "C", "D"].every((k) => tren(Ct, D[k])) && dist(mid(D.A, D.D), D.O) < 0.6, b.id + " Bài 7: A, B, C, D trên đường tròn tâm O, AD là đường kính");
    assert.ok([goc(D.A, D.B, D.C), goc(D.B, D.A, D.C), goc(D.C, D.A, D.B)].every((x) => x < 89.5) && dist(D.A, D.B) < dist(D.A, D.C), b.id + " Bài 7: tam giác ABC nhọn, AB < AC");
    assert.ok(giua(D.B, D.C, D.H) && vuong(subv(D.A, D.H), subv(D.C, D.B)), b.id + " Bài 7: AH là đường cao, H thuộc BC");
    assert.ok(giua(D.A, D.D, D.E) && vuong(subv(D.B, D.E), subv(D.D, D.A)), b.id + " Bài 7: E là chân đường vuông góc kẻ từ B đến AD");
    ["AB", "BC", "CA", "AD", "AH", "BE", "CD"].forEach((s) => assert.ok(coDoan(s7, D[s[0]], D[s[1]]), b.id + " Bài 7: hình có đoạn " + s));
    assert.ok(cungTron(D.A, D.B, D.H, D.E), b.id + " Bài 7a: A, B, H, E cùng thuộc một đường tròn");
    assert.ok(Math.abs(dist(D.A, D.B) * dist(D.A, D.C) - dist(D.A, D.H) * dist(D.A, D.D)) < 0.01 * dist(D.A, D.B) * dist(D.A, D.C), b.id + " Bài 7b: AB · AC = AH · AD");
    const q7c = cau(b, 7, 2), c7 = docPhai(q7c, /Cho AB = (\d+) cm, AC = (\d+) cm và AH = (\d+) cm/), [AB, AC, AH] = c7.slice(1).map(Number), k = dist(D.A, D.B) / AB;
    assert.ok(Math.abs(dist(D.A, D.C) / k - AC) < 0.02 && Math.abs(dist(D.A, D.H) / k - AH) < 0.02, b.id + " Bài 7: hình đúng tỉ lệ AB : AC : AH");
    const AD = F(AB * AC, AH), R = div(AD, F(2)), BH = sqrt(F(AB * AB - AH * AH)), HC = sqrt(F(AC * AC - AH * AH)), S = mul(F(AH, 2), add(BH, HC));
    assert.ok(isInt(BH) && isInt(HC) && isInt(S), b.id + " Bài 7c: BH, HC, diện tích là số nguyên");
    assert.ok(Math.abs(Ct.r / k - toNum(R)) < 0.02 && Math.abs(dtDaGiac(D.A, D.B, D.C) / (k * k) - toNum(S)) < 0.05, b.id + " Bài 7c: R, diện tích đo trên hình khớp tính toán");
    assert.equal(dapSo(q7c), `R = ${fmt(R)} cm; diện tích tam giác ABC là ${fmt(S)} cm²`, ten.get(q7c) + ": đáp số");
    co(q7c, `AD = AB · AC : AH = ${AB} · ${AC} : ${AH} = ${AB * AC} : ${AH} = ${fmt(AD)} (cm)`, `R = ${fmt(AD)} : 2 = ${fmt(R)} (cm)`, `= √${fmt(mul(BH, BH))} = ${fmt(BH)} (cm)`, `= √${fmt(mul(HC, HC))} = ${fmt(HC)} (cm)`, `= ${fmt(S)} (cm²)`);
    co(cau(b, 7, 0), "góc AHB = 90°", "góc AEB = 90°", "đường tròn đường kính AB"); co(cau(b, 7, 1), "góc ACD = 90°", "cùng chắn cung AC", "AB/AD = AH/AC");
  },
  "toan9-vao10-de6": (b) => {
    /* Bài 3: biểu đồ tần số tương đối ghép nhóm dạng cột; tần số ghép nhóm; chọn hai trong năm bạn */
    const hs = docHist(hinh(b, 3), b.id + " Bài 3"), qa = cau(b, 3, 0), qb = cau(b, 3, 1), qc = cau(b, 3, 2);
    assert.equal(hs.reduce((s, h) => s + h[2], 0), 100, b.id + " Bài 3: các tần số tương đối cộng lại 100%");
    coThang(qa, hs.map(([a, c]) => `[${a}; ${c})`).join(", "), hs.map((h) => h[2] + "%").join("; "));
    coGiai(qa, "Thời gian (phút): " + hs.map(([a, c]) => `[${a}; ${c})`).join("; "), "Tần số tương đối: " + hs.map((h) => h[2] + "%").join("; "));
    const n = +docPhai(qb, /Biết có (\d+) học sinh được hỏi/)[1], ts = hs.map((h) => (n * h[2]) / 100);
    assert.ok(ts.every(Number.isInteger), b.id + " Bài 3: tần số các nhóm là số nguyên");
    coThang(qb, hs.map((h, i) => `${h[2]}% · ${n} = ${ts[i]}`).join("; ")); coGiai(qb, "Số học sinh: " + ts.join("; "));
    const ng = +docPhai(qb, /mất từ (\d+) phút trở lên/)[1], chon = hs.map((h, i) => [h, ts[i]]).filter(([h]) => h[0] >= ng);
    assert.ok(hs.some((h) => h[0] === ng) && chon.length, ten.get(qb) + ": ngưỡng là đầu mút của một nhóm");
    const tong = chon.reduce((s, x) => s + x[1], 0); assert.equal(dapSo(qb), `${tong} bạn`, ten.get(qb) + ": đáp số");
    co(qb, `${chon.map((x) => x[1]).join(" + ")} = ${tong}`);
    // chọn ngẫu nhiên hai trong năm bạn (không kể thứ tự): hai lớp có số thứ tự liền nhau
    const L = ["L₁", "L₂", "L₃", "L₄", "L₅"], om = L.flatMap((u, i) => L.slice(i + 1).map((v) => [u, v]));
    assert.ok(/chọn ngẫu nhiên hai bạn trong năm bạn/.test(qc.q) && /số thứ tự liền nhau/.test(qc.q), ten.get(qc) + ": chọn hai trong năm bạn, hai lớp liền nhau");
    assert.ok(cungCap(omGhi(qc).map((p) => p.join()), om.map((p) => p.join())), ten.get(qc) + ": Ω liệt kê đủ, đúng (không kể thứ tự)");
    const lien = ([u, v]) => Math.abs(L.indexOf(u) - L.indexOf(v)) === 1; xacSuat(qc, om, lien);
    coGiai(qc, `Các kết quả thuận lợi cho E: ${om.filter(lien).map((p) => `(${p.join(", ")})`).join("; ")}, gồm ${om.filter(lien).length} kết quả.`);
    /* Bài 4: khí CO₂ của xe máy; số cây xanh cần trồng (bất phương trình) */
    const g = docDoan(b, 4, /khoảng (\d+) g khí CO₂ cho mỗi ki-lô-mét .* tổng cộng (\d+) km/), gk = +g[1], km = +g[2], ngay = F(gk * km, 1000), q4a = cau(b, 4, 0), q4b = cau(b, 4, 1);
    coThang(q4a, `${gk} · ${km} = ${fmt(F(gk * km))} (g) = ${fmt(ngay)} (kg)`, `y = ${fmt(ngay)}x`);
    const nd = +docPhai(q4b, /đi làm (\d+) ngày/)[1], hap = +docPhai(q4b, /hấp thụ khoảng (\d+) kg/)[1], nam = mul(ngay, F(nd)), cay = Math.ceil(toNum(nam) / hap);
    assert.ok(isInt(nam) && toNum(nam) % hap !== 0 && dapSo(q4b) === `ít nhất ${cay} cây xanh`, ten.get(q4b) + ": đáp số " + dapSo(q4b) + ", tính được " + cay);
    co(q4b, `${fmt(ngay)} · ${nd} = ${fmt(nam)} (kg)`, `${hap}n ≥ ${fmt(nam)}`, `n ≥ ${fmt(nam)}/${hap} = ${fmtF(F(nam.n, hap))} ≈ ${tron(toNum(nam) / hap, 1)}`, `${cay - 1} cây chỉ hấp thụ khoảng ${(cay - 1) * hap} kg`);
    /* Bài 5: bồn nước hình cầu: hình; thể tích, thời gian bơm */
    const s5 = hinh(b, 5), d5 = +docDoan(b, 5, /đường kính (\d+) m/)[1], C5 = duongTron(s5); assert.equal(C5.length, 1, b.id + " Bài 5: một hình cầu");
    const c5 = C5[0], dk = lines(s5).filter((l) => l.dash && l.a[1] === l.b[1] && Math.abs(l.a[1] - c5.c[1]) < 0.15 && Math.abs(Math.abs(l.b[0] - l.a[0]) - 2 * c5.r) < 0.6);
    assert.equal(dk.length, 1, b.id + " Bài 5: đường kính vẽ qua tâm");
    const kt = lines(s5).filter((l) => !l.dash && l.w === 1 && l.a[1] === l.b[1] && l.a[1] < c5.c[1] - c5.r && Math.abs(Math.abs(l.b[0] - l.a[0]) - 2 * c5.r) < 0.6);
    const nhan5 = texts(s5).find((t) => t.t === `${d5} m`); assert.ok(kt.length === 1 && nhan5 && nhan5.at[1] < kt[0].a[1] && Math.abs(nhan5.at[0] - c5.c[0]) < 0.6, b.id + " Bài 5: đường ghi kích thước đường kính và chữ “" + d5 + " m”");
    const R5 = F(d5, 2), kV = mul(F(4, 3), pw(R5, 3)), V5 = toNum(kV) * Math.PI, q5a = cau(b, 5, 0), q5b = cau(b, 5, 1);
    co(q5a, `R = ${d5} : 2 = ${fmt(R5)} (m)`, `= ${fmt(kV)}π ≈ ${tron(V5, 2)} (m³)`); assert.equal(dapSo(q5a), `khoảng ${tron(V5, 2)} m³`, ten.get(q5a) + ": đáp số");
    const luu = +docPhai(q5b, /mỗi giờ bơm được (\d+) m³/)[1], kGio = div(kV, F(luu)), kPhut = mul(kGio, F(60)), phut = toNum(fr(lamTron(toNum(kPhut) * Math.PI, 0)));
    co(q5b, `${fmt(kV)}π : ${luu} = ${fmt(kGio)}π (giờ)`, `${fmt(kGio)}π · 60 = ${fmt(kPhut)}π ≈ ${phut} (phút)`);
    assert.equal(dapSo(q5b), `khoảng ${Math.floor(phut / 60)} giờ ${phut % 60} phút`, ten.get(q5b) + ": đáp số");
    /* Bài 6: gửi tiết kiệm hai năm: phương trình bậc hai */
    const q6 = cau(b, 6), s6 = docPhai(q6, /gửi tiết kiệm ([\d ]+) đồng .* nhận được tổng cộng ([\d ]+) đồng/), A0 = fr(s6[1]), A2 = fr(s6[2]), tiSo = div(A2, A0), can = sqrt(tiSo);
    assert.ok(isR(can), ten.get(q6) + ": (1 + x)² có căn bậc hai là số hữu tỉ");
    const x6 = sub(can, F(1)); assert.ok(toNum(x6) > 0, ten.get(q6) + ": lãi suất dương");
    assert.equal(dapSo(q6), `lãi suất ${fmt(mul(x6, F(100)))}% mỗi năm`, ten.get(q6) + ": đáp số");
    coThang(q6, `${fmt(A0)}(1 + x)² = ${fmt(A2)}`, `(1 + x)² = ${fmt(tiSo)}`, `1 + x = ${fmt(can)}`, `x = ${fmt(x6)}`);
    const e6 = bac2(`x² + 2x − ${fmt(sub(tiSo, F(1)))} = 0`), ng6 = nghiemThuc(e6);
    assert.ok(Math.abs(ng6[1] - toNum(x6)) < 1e-9, ten.get(q6) + ": phương trình khai triển có nghiệm dương đúng");
    co(q6, `x² + 2x − ${fmt(sub(tiSo, F(1)))} = 0`, `x = ${fmt(x6)} hoặc x = ${fmt(F(Math.round(ng6[0] * 100), 100))}`, `${fmt(A0)} · ${fmt(can)} = ${fmt(mul(A0, can))}; ${fmt(mul(A0, can))} · ${fmt(can)} = ${fmt(A2)}`);
    /* Bài 7: đường kính AB, tiếp tuyến Ax, By, tiếp tuyến tại M cắt Ax, By tại C, D */
    const s7 = hinh(b, 7), D = diem(s7), C7 = duongTron(s7); assert.equal(C7.length, 1, b.id + " Bài 7: một đường tròn");
    const Ct = C7[0]; assert.ok(dist(D.O, Ct.c) < 0.6 && tren(Ct, D.A) && tren(Ct, D.B) && tren(Ct, D.M) && dist(mid(D.A, D.B), D.O) < 0.6, b.id + " Bài 7: AB là đường kính, M trên đường tròn");
    assert.ok(vuong(subv(D.C, D.A), subv(D.B, D.A)) && vuong(subv(D.D, D.B), subv(D.A, D.B)), b.id + " Bài 7: Ax, By là tiếp tuyến (vuông góc với AB tại A, B)");
    const phia = (P) => Math.sign(cross(subv(D.B, D.A), subv(P, D.A)));
    assert.ok(phia(D.C) === phia(D.D) && phia(D.D) === phia(D.M) && phia(D.M) !== 0, b.id + " Bài 7: C, D, M cùng một nửa mặt phẳng bờ AB");
    assert.ok(giua(D.C, D.D, D.M) && vuong(subv(D.M, D.O), subv(D.D, D.C)), b.id + " Bài 7: CD là tiếp tuyến tại M, M nằm giữa C và D");
    ["AB", "OC", "OD", "OM", "CD", "AC", "BD"].forEach((s) => assert.ok(coDoan(s7, D[s[0]], D[s[1]]), b.id + " Bài 7: hình có đoạn " + s));
    ["x", "y"].forEach((t) => assert.ok(texts(s7).some((x) => x.t === t), b.id + " Bài 7: hình ghi tên tia " + t));
    assert.ok(cungTron(D.A, D.C, D.M, D.O), b.id + " Bài 7a: A, C, M, O cùng thuộc một đường tròn");
    assert.ok(vuong(subv(D.C, D.O), subv(D.D, D.O)) && Math.abs(dist(D.A, D.C) * dist(D.B, D.D) - Ct.r * Ct.r) < 0.01 * Ct.r * Ct.r, b.id + " Bài 7b: góc COD = 90°, AC · BD = R²");
    const q7c = cau(b, 7, 2), c7 = docPhai(q7c, /Cho R = (\d+) cm và AC = (\d+) cm/), R7 = +c7[1], AC = +c7[2], k = Ct.r / R7, BD = F(R7 * R7, AC), S7 = mul(div(add(F(AC), BD), F(2)), F(2 * R7));
    assert.ok(Math.abs(dist(D.A, D.C) / k - AC) < 0.02 && Math.abs(dist(D.B, D.D) / k - toNum(BD)) < 0.02, b.id + " Bài 7: hình đúng tỉ lệ AC, BD theo R");
    assert.ok(isInt(BD) && isInt(S7) && Math.abs(dtDaGiac(D.A, D.B, D.D, D.C) / (k * k) - toNum(S7)) < 0.05, b.id + " Bài 7c: BD, diện tích đo trên hình khớp tính toán");
    assert.equal(dapSo(q7c), `BD = ${fmt(BD)} cm; diện tích tứ giác ABDC là ${fmt(S7)} cm²`, ten.get(q7c) + ": đáp số");
    co(q7c, `BD = R² : AC = ${R7}² : ${AC} = ${fmt(BD)} (cm)`, `AB = 2R = ${2 * R7} cm`, `(${AC} + ${fmt(BD)}) · ${2 * R7} : 2 = ${fmt(S7)} (cm²)`);
    co(cau(b, 7, 0), "góc CAO = 90°", "góc CMO = 90°", "đường tròn đường kính OC"); co(cau(b, 7, 1), "tia phân giác của góc AOM", "góc COD = 90°", "MC · MD = MO² = R²");
  },
  "toan9-vao10-de7": (b) => {
    /* Bài 3: biểu đồ tần số tương đối ghép nhóm dạng đoạn thẳng (giá trị đại diện); trứng to; gieo đồng xu ba lần */
    const nhom = [...doanDe(b, 3).text.matchAll(/\[(\d+); (\d+)\)/g)].map((m) => [+m[1], +m[2]]), qa = cau(b, 3, 0), qb = cau(b, 3, 1), qc = cau(b, 3, 2);
    assert.ok(nhom.length >= 3 && nhom.every((g, i) => !i || (g[0] === nhom[i - 1][1] && g[1] - g[0] === nhom[0][1] - nhom[0][0])), b.id + " Bài 3: các nhóm nối tiếp nhau, cùng độ dài");
    const ds = docDuong(hinh(b, 3), b.id + " Bài 3"), dd = nhom.map(([a, c]) => F(a + c, 2));
    assert.ok(ds.length === nhom.length && ds.every(([t], i) => eq(fr(t), dd[i])), b.id + " Bài 3: điểm trên trục ngang là giá trị đại diện của từng nhóm");
    assert.equal(ds.reduce((s, r) => s + r[1], 0), 100, b.id + " Bài 3: các tần số tương đối cộng lại 100%");
    coThang(qa, dd.map((v) => fmt(v)).join("; "), nhom.map(([a, c], i) => `[${a}; ${c}) ${ds[i][1]}%`).join("; "));
    coGiai(qa, nhom.map(([a, c], i) => `[${a}; ${c}): ${fmt(dd[i])}`).join("; "), "Tần số tương đối: " + ds.map((r) => r[1] + "%").join("; "));
    const ng = +docPhai(qb, /từ (\d+) g trở lên/)[1], N = fr(docPhai(qb, /có ([\d ]+) quả trứng gà/)[1]), chon = nhom.map((g, i) => [g, ds[i][1]]).filter(([g]) => g[0] >= ng);
    assert.ok(nhom.some((g) => g[0] === ng) && chon.length, ten.get(qb) + ": ngưỡng là đầu mút của một nhóm");
    const tlTo = chon.reduce((s, x) => s + x[1], 0), uoc = mul(N, F(tlTo, 100));
    assert.ok(isInt(uoc) && dapSo(qb) === `khoảng ${fmt(uoc)} quả trứng to`, ten.get(qb) + ": đáp số");
    co(qb, `${chon.map((x) => x[1] + "%").join(" + ")} = ${tlTo}%`, `${tlTo}% · ${fmt(N)} = ${fmt(uoc)} (quả)`);
    // gieo đồng xu ba lần: mặt ngửa xuất hiện đúng hai lần
    assert.ok(/gieo một đồng xu cân đối ba lần liên tiếp/.test(qc.q) && /mặt ngửa xuất hiện đúng hai lần/.test(qc.q), ten.get(qc) + ": gieo đồng xu ba lần, đúng hai lần mặt ngửa");
    const om = ["S", "N"].flatMap((u) => ["S", "N"].flatMap((v) => ["S", "N"].map((w) => u + v + w))), ghi = /Ω = \{([SN; ]+)\}/.exec(qc.x);
    assert.ok(ghi && cungCap(ghi[1].split("; "), om), ten.get(qc) + ": Ω liệt kê đủ, đúng");
    const hai = (s) => [...s].filter((c) => c === "N").length === 2, fav = xacSuat(qc, om, hai), thuan = /đúng hai lần ở các kết quả ([SN; ]+), gồm (\d+) kết quả/.exec(qc.x);
    assert.ok(thuan && +thuan[2] === fav && cungCap(thuan[1].split("; "), om.filter(hai)), ten.get(qc) + ": lời giải liệt kê đủ, đúng các kết quả thuận lợi");
    /* Bài 4: giá trung bình một chiếc áo (phương trình chứa ẩn ở mẫu) */
    const g = docDoan(b, 4, /phí làm khuôn in ([\d ]+) đồng .* và ([\d ]+) đồng cho mỗi chiếc áo/), K = fr(g[1]), a4 = fr(g[2]), q4a = cau(b, 4, 0), q4b = cau(b, 4, 1);
    coThang(q4a, `T = (${fmt(K)} + ${fmt(a4)}x)/x = ${fmt(a4)} + ${fmt(K)}/x`);
    const Tb = fr(docPhai(q4b, /giá trung bình của một chiếc áo là ([\d ]+) đồng/)[1]), x4 = div(K, sub(Tb, a4));
    assert.ok(isInt(x4) && x4.n > 0 && dapSo(q4b) === `${fmt(x4)} chiếc áo`, ten.get(q4b) + ": đáp số " + dapSo(q4b) + ", tính được " + fmtF(x4));
    assert.ok(eq(div(add(K, mul(a4, x4)), x4), Tb), ten.get(q4b) + ": thử lại đúng");
    coThang(q4b, `${fmt(a4)} + ${fmt(K)}/x = ${fmt(Tb)}`, `${fmt(K)}/x = ${fmt(sub(Tb, a4))}`, `x = ${fmt(x4)}`);
    co(q4b, `(${fmt(K)} + ${fmt(a4)} · ${fmt(x4)}) : ${fmt(x4)} = ${fmt(add(K, mul(a4, x4)))} : ${fmt(x4)} = ${fmt(Tb)} (đồng)`);
    /* Bài 5: kho chứa thóc: thân hình trụ, mái nửa hình cầu: hình đúng tỉ lệ; thể tích, diện tích cần sơn */
    const s5 = hinh(b, 5), d5 = docDoan(b, 5, /đường kính đáy (\d+) m, chiều cao (\d+) m và phần mái dạng nửa hình cầu có đường kính (\d+) m/).slice(1).map(Number);
    assert.equal(d5[0], d5[2], b.id + " Bài 5: mái và thân cùng đường kính");
    const mai = /<path d="M ([\d.]+) ([\d.]+) A ([\d.]+) ([\d.]+) 0 0 1 ([\d.]+) ([\d.]+)" fill="acc-soft"/.exec(s5); assert.ok(mai, b.id + " Bài 5: mái là một nửa đường tròn tô màu");
    const [mx0, my0, mrx, mry, mx1, my1] = mai.slice(1).map(Number);
    assert.ok(mrx === mry && my0 === my1 && Math.abs(mx1 - mx0 - 2 * mrx) < 0.15, b.id + " Bài 5: mái là nửa hình tròn có đường kính bằng bề ngang của thân");
    const than = lines(s5).filter((l) => l.w >= 2 && !l.dash && l.a[0] === l.b[0]).sort((u, v) => u.a[0] - v.a[0]);
    assert.ok(than.length === 2 && Math.abs(than[0].a[0] - mx0) < 0.15 && Math.abs(than[1].a[0] - mx1) < 0.15 && than.every((l) => Math.min(l.a[1], l.b[1]) === my0), b.id + " Bài 5: hai đường sinh của thân nối tiếp hai đầu của mái");
    const cao = Math.abs(than[0].b[1] - than[0].a[1]); assert.ok(Math.abs(cao / (2 * mrx) - d5[1] / d5[0]) < 0.01, b.id + " Bài 5: chiều cao và đường kính đúng tỉ lệ");
    [`${d5[0]} m`, `${d5[1]} m`].forEach((t) => assert.ok(texts(s5).some((x) => x.t === t), b.id + " Bài 5: hình ghi " + t));
    const r5 = d5[0] / 2, h5 = d5[1], q5a = cau(b, 5, 0), q5b = cau(b, 5, 1), kVt = r5 * r5 * h5, kVc = F(2 * r5 ** 3, 3), kV = add(F(kVt), kVc), V5 = toNum(kV) * Math.PI;
    co(q5a, `π · ${r5}² · ${h5} = ${kVt}π (m³)`, `(2/3) · π · ${r5}³ = ${kVc.n}π/${kVc.d} (m³)`, `${kVt}π + ${kVc.n}π/${kVc.d} = ${kV.n}π/${kV.d} ≈ ${tron(V5, 2)} (m³)`);
    assert.equal(dapSo(q5a), `khoảng ${tron(V5, 2)} m³`, ten.get(q5a) + ": đáp số");
    const kXq = 2 * r5 * h5, kMai = 2 * r5 * r5, S5 = (kXq + kMai) * Math.PI;
    co(q5b, `2 · π · ${r5} · ${h5} = ${kXq}π (m²)`, `2 · π · ${r5}² = ${kMai}π (m²)`, `${kXq}π + ${kMai}π = ${kXq + kMai}π ≈ ${tron(S5, 2)} (m²)`);
    assert.equal(dapSo(q5b), `khoảng ${tron(S5, 2)} m²`, ten.get(q5b) + ": đáp số");
    /* Bài 6: bể cá cảnh: thể tích nước (đổi ra lít), bất phương trình */
    const q6 = cau(b, 6), s6 = docPhai(q6, /lòng bể dài (\d+) cm, rộng (\d+) cm, cao (\d+) cm\. .* mặt nước cách miệng bể (\d+) cm\. .* cần ít nhất (\d+) lít nước/);
    const [bDai, bRong, bCao, bCach, lit] = s6.slice(1).map(Number), cm3 = bDai * bRong * (bCao - bCach), nuoc = F(cm3, 1000), x6 = Math.floor(toNum(nuoc) / lit);
    assert.ok(isInt(nuoc) && toNum(nuoc) % lit !== 0 && dapSo(q6) === `nhiều nhất ${x6} con cá`, ten.get(q6) + ": đáp số " + dapSo(q6) + ", tính được " + x6);
    coThang(q6, `${bDai} · ${bRong} · (${bCao} − ${bCach}) = ${fmt(F(cm3))} (cm³) = ${fmt(nuoc)} (lít)`, `${lit}x ≤ ${fmt(nuoc)}`, `x ≤ ${fmt(nuoc)}/${lit} ≈ ${tron(toNum(nuoc) / lit, 2)}`, `nhiều nhất ${x6} con cá`);
    co(q6, `${x6} con cần ít nhất ${x6 * lit} lít`, `${x6 + 1} con cần ít nhất ${(x6 + 1) * lit} lít`);
    /* Bài 7: tam giác ABC vuông tại A, đường tròn đường kính AC cắt BC tại D, tiếp tuyến tại D cắt AB tại E */
    const s7 = hinh(b, 7), D = diem(s7), C7 = duongTron(s7); assert.equal(C7.length, 1, b.id + " Bài 7: một đường tròn");
    const Ct = C7[0]; assert.ok(dist(D.O, Ct.c) < 0.6 && dist(mid(D.A, D.C), D.O) < 0.6 && tren(Ct, D.A) && tren(Ct, D.C) && tren(Ct, D.D), b.id + " Bài 7: đường tròn tâm O đường kính AC đi qua D");
    assert.ok(vuong(subv(D.B, D.A), subv(D.C, D.A)) && giua(D.B, D.C, D.D) && giua(D.A, D.B, D.E), b.id + " Bài 7: tam giác vuông tại A, D thuộc cạnh BC, E thuộc cạnh AB");
    assert.ok(vuong(subv(D.E, D.D), subv(D.O, D.D)), b.id + " Bài 7: ED là tiếp tuyến tại D");
    ["AB", "AC", "BC", "AD", "OD", "ED"].forEach((s) => assert.ok(coDoan(s7, D[s[0]], D[s[1]]), b.id + " Bài 7: hình có đoạn " + s));
    assert.ok(vuong(subv(D.D, D.A), subv(D.C, D.B)) && cungTron(D.A, D.E, D.D, D.O), b.id + " Bài 7a: AD ⊥ BC; A, E, D, O cùng thuộc một đường tròn");
    assert.ok(Math.abs(dist(D.E, D.A) - dist(D.E, D.B)) < 0.6 && Math.abs(dist(D.B, D.D) * dist(D.B, D.C) - 4 * dist(D.E, D.D) ** 2) < 0.01 * dist(D.B, D.D) * dist(D.B, D.C), b.id + " Bài 7b: E là trung điểm của AB, BD · BC = 4ED²");
    const q7c = cau(b, 7, 2), c7 = docPhai(q7c, /Cho AB = (\d+) cm và AC = (\d+) cm/), AB = +c7[1], AC = +c7[2], k = dist(D.A, D.C) / AC;
    assert.ok(Math.abs(dist(D.A, D.B) / k - AB) < 0.02, b.id + " Bài 7: hình đúng tỉ lệ AB : AC");
    const BC = sqrt(F(AB * AB + AC * AC)), AD = div(F(AB * AC), BC), S7 = F(AB * AC, 4);
    assert.ok(isInt(BC) && Math.abs(dist(D.A, D.D) / k - toNum(AD)) < 0.02 && Math.abs(dtDaGiac(D.A, D.E, D.D, D.O) / (k * k) - toNum(S7)) < 0.05, b.id + " Bài 7c: AD, diện tích đo trên hình khớp tính toán");
    assert.equal(dapSo(q7c), `AD = ${fmt(AD)} cm; diện tích tứ giác AEDO là ${fmt(S7)} cm²`, ten.get(q7c) + ": đáp số");
    co(q7c, `√(${AB}² + ${AC}²) = √${AB * AB + AC * AC} = ${fmt(BC)} (cm)`, `AD = AB · AC : BC = ${AB} · ${AC} : ${fmt(BC)} = ${fmt(AD)} (cm)`, `AE = AB : 2 = ${fmt(F(AB, 2))} (cm)`, `AO = AC : 2 = ${fmt(F(AC, 2))} (cm)`, `= ${fmt(S7)} (cm²)`);
    co(cau(b, 7, 0), "góc ADC = 90°", "góc EAO = 90°", "góc EDO = 90°", "đường tròn đường kính OE"); co(cau(b, 7, 1), "EA = ED", "EB = ED", "BD · BC = AB²");
  },
  "toan9-vao10-de8": (b) => {
    /* Bài 3: biểu đồ tần số tương đối dạng cột (giá trị không ghép nhóm); bảng tần số; ước lượng; oẳn tù tì */
    const ds = docCotTL(hinh(b, 3), b.id + " Bài 3"), qa = cau(b, 3, 0), qb = cau(b, 3, 1), qc = cau(b, 3, 2);
    assert.equal(ds.reduce((s, r) => s + r[1], 0), 100, b.id + " Bài 3: các tần số tương đối cộng lại 100%");
    assert.ok(ds.every(([v], i) => /^\d+$/.test(v) && (!i || +v === +ds[i - 1][0] + 1)), b.id + " Bài 3: các giá trị (số giờ) liên tiếp");
    coThang(qa, ds.map(([v, p]) => `${v} giờ: ${p}%`).join("; "));
    const n = +docPhai(qa, /đã khảo sát (\d+) học sinh/)[1], ts = ds.map(([, p]) => (n * p) / 100);
    assert.ok(ts.every(Number.isInteger), b.id + " Bài 3: tần số các giá trị là số nguyên");
    coThang(qa, ds.map(([, p], i) => `${p}% · ${n} = ${ts[i]}`).join("; "));
    coGiai(qa, "Thời gian (giờ): " + ds.map((r) => r[0]).join("; "), "Tần số tương đối: " + ds.map((r) => r[1] + "%").join("; "), "Số học sinh (tần số): " + ts.join("; "), `${ts.join(" + ")} = ${n}.`);
    const ng = +docPhai(qb, /dùng mạng xã hội từ (\d+) giờ mỗi ngày trở lên/)[1], N = fr(docPhai(qb, /Trường có ([\d ]+) học sinh/)[1]);
    const chon = ds.filter(([v]) => +v >= ng), tl = chon.reduce((s, r) => s + r[1], 0), uoc = mul(N, F(tl, 100));
    assert.ok(chon.length >= 2 && isInt(uoc) && dapSo(qb) === `khoảng ${fmt(uoc)} học sinh`, ten.get(qb) + ": đáp số " + dapSo(qb) + ", tính được " + fmt(uoc));
    co(qb, `${chon.map((r) => r[1] + "%").join(" + ")} = ${tl}%`, `${tl}% · ${fmt(N)} = ${fmt(uoc)} (học sinh)`);
    // oẳn tù tì: mỗi bạn chọn ngẫu nhiên kéo, búa, bao; biến cố “An không thua Bình” (An thắng hoặc hoà)
    assert.ok(/chơi oẳn tù tì/.test(qc.q) && /Kéo thắng bao, bao thắng búa, búa thắng kéo; hai bạn ra giống nhau thì hoà/.test(qc.q) && /“An không thua Bình”/.test(qc.q), ten.get(qc) + ": luật chơi và biến cố");
    const tay = ["kéo", "búa", "bao"], an = { kéo: "bao", bao: "búa", búa: "kéo" }, om = tay.flatMap((u) => tay.map((v) => [u, v]));
    assert.ok(cungCap(omGhi(qc).map((p) => p.join()), om.map((p) => p.join())), ten.get(qc) + ": Ω liệt kê đủ, đúng");
    const thang_ = ([u, v]) => an[u] === v, hoa = ([u, v]) => u === v, fav = xacSuat(qc, om, (p) => thang_(p) || hoa(p));
    const ghi = /An thắng ở các kết quả ((?:\([^()]+\)(?:, )?)+); hai bạn hoà ở các kết quả ((?:\([^()]+\)(?:, )?)+)\. Vậy có (\d+) kết quả thuận lợi/.exec(qc.x), cap = (s) => [...s.matchAll(/\(([^,()]+), ([^,()]+)\)/g)].map((m) => m[1] + "," + m[2]);
    assert.ok(ghi && +ghi[3] === fav && cungCap(cap(ghi[1]), om.filter(thang_).map(String)) && cungCap(cap(ghi[2]), om.filter(hoa).map(String)), ten.get(qc) + ": lời giải liệt kê đủ, đúng các kết quả An thắng, hoà");
    /* Bài 4: nhiệt độ không khí theo độ cao */
    const g = docDoan(b, 4, /cứ lên cao thêm (\d+) m thì nhiệt độ giảm (\d+,\d+)°C\. .* ở chân một ngọn núi là (\d+)°C/), buoc = +g[1], T0 = F(+g[3]), k4 = div(fr(g[2]), F(buoc)), q4a = cau(b, 4, 0), q4b = cau(b, 4, 1);
    coThang(q4a, `T = ${fmt(T0)} − ${fmt(k4)}h (h ≥ 0)`); co(q4a, `${g[2]} : ${buoc} = ${fmt(k4)} (°C)`);
    const do4 = fr(docPhai(q4b, /đo được nhiệt độ không khí là (\d+,\d+)°C/)[1]), h4 = div(sub(T0, do4), k4);
    assert.ok(isInt(h4) && h4.n > 0 && dapSo(q4b) === `trạm quan trắc cao hơn chân núi ${fmt(h4)} m`, ten.get(q4b) + ": đáp số " + dapSo(q4b) + ", tính được " + fmtF(h4));
    coThang(q4b, `${fmt(T0)} − ${fmt(k4)}h = ${fmt(do4)}`); co(q4b, `${fmt(T0)} − ${fmt(k4)} · ${fmt(h4)} = ${fmt(T0)} − ${fmt(mul(k4, h4))} = ${fmt(do4)} (°C)`);
    /* Bài 5: lều trại: thân hình trụ, mái hình nón: hình đúng tỉ lệ; diện tích vải, thể tích và số người */
    const s5 = hinh(b, 5), d5 = docDoan(b, 5, /phần thân dạng hình trụ cao (\d+,\d+) m với đáy là hình tròn đường kính (\d+) m, và phần mái dạng hình nón cao (\d+,\d+) m/), dk = F(+d5[2]), hT = fr(d5[1]), hN = fr(d5[3]);
    const L5 = lines(s5).filter((l) => l.w >= 2 && !l.dash), than = L5.filter((l) => l.a[0] === l.b[0]).sort((u, v) => u.a[0] - v.a[0]), mai = L5.filter((l) => l.a[0] !== l.b[0]);
    assert.ok(than.length === 2 && mai.length === 2 && dist(mai[0].a, mai[1].a) < 0.15, b.id + " Bài 5: hai đường sinh của thân, hai đường sinh của mái chung đỉnh");
    const S5 = mai[0].a, xl = than[0].a[0], xr = than[1].a[0], yT = Math.min(than[0].a[1], than[0].b[1]), yD = Math.max(than[0].a[1], than[0].b[1]);
    assert.ok(than.every((l) => Math.min(l.a[1], l.b[1]) === yT && Math.max(l.a[1], l.b[1]) === yD) && Math.abs(S5[0] - (xl + xr) / 2) < 0.15, b.id + " Bài 5: thân cân đối, đỉnh mái ở chính giữa");
    assert.ok([xl, xr].every((x) => mai.some((l) => Math.abs(l.b[0] - x) < 0.15 && Math.abs(l.b[1] - yT) < 0.15)), b.id + " Bài 5: hai đường sinh của mái nối hai đầu trên của thân");
    assert.ok(Math.abs((yD - yT) / (xr - xl) - toNum(div(hT, dk))) < 0.01 && Math.abs((yT - S5[1]) / (xr - xl) - toNum(div(hN, dk))) < 0.01, b.id + " Bài 5: chiều cao thân, chiều cao mái và đường kính đúng tỉ lệ");
    [`${fmt(dk)} m`, `${fmt(hT)} m`, `${fmt(hN)} m`].forEach((t) => assert.ok(texts(s5).some((x) => x.t === t), b.id + " Bài 5: hình ghi " + t));
    const r5 = div(dk, F(2)), l5 = sqrt(add(mul(r5, r5), mul(hN, hN))), q5a = cau(b, 5, 0), q5b = cau(b, 5, 1); assert.ok(isR(l5), b.id + ": đường sinh của mái là số hữu tỉ");
    const kXq = mul(F(2), mul(r5, hT)), kMai = mul(r5, l5), kVai = add(kXq, kMai);
    co(q5a, `√(${fmt(r5)}² + ${fmt(hN)}²) = √${fmt(add(mul(r5, r5), mul(hN, hN)))} = ${fmt(l5)} (m)`, `2 · π · ${fmt(r5)} · ${fmt(hT)} = ${fmt(kXq)}π (m²)`, `π · ${fmt(r5)} · ${fmt(l5)} = ${fmt(kMai)}π (m²)`, `${fmt(kXq)}π + ${fmt(kMai)}π = ${fmt(kVai)}π ≈ ${tron(toNum(kVai) * Math.PI, 2)} (m²)`);
    assert.equal(dapSo(q5a), `khoảng ${tron(toNum(kVai) * Math.PI, 2)} m²`, ten.get(q5a) + ": đáp số");
    const kVt = mul(mul(r5, r5), hT), kVn = mul(F(1, 3), mul(mul(r5, r5), hN)), kV = add(kVt, kVn), V5 = toNum(kV) * Math.PI;
    const moi = +docPhai(q5b, /cần ít nhất (\d+) m³ không khí/)[1], nguoi = Math.floor(V5 / moi);
    assert.ok(V5 / moi - nguoi > 0.05 && dapSo(q5b) === `nhiều nhất ${nguoi} người`, ten.get(q5b) + ": đáp số " + dapSo(q5b) + ", tính được " + nguoi);
    co(q5b, `π · ${fmt(r5)}² · ${fmt(hT)} = ${fmt(kVt)}π (m³)`, `(1/3) · π · ${fmt(r5)}² · ${fmt(hN)} = ${fmt(kVn)}π (m³)`, `${fmt(kVt)}π + ${fmt(kVn)}π = ${fmt(kV)}π ≈ ${tron(V5, 2)} (m³)`, `${moi}n ≤ ${fmt(kV)}π`, `${fmt(div(kV, F(moi)))}π ≈ ${tron(V5 / moi, 1)}`, `${nguoi} người cần ít nhất ${nguoi * moi} m³`, `${nguoi + 1} người cần ít nhất ${(nguoi + 1) * moi} m³`);
    /* Bài 6: giá bán và số cốc bán được: phương trình bậc hai, chọn nghiệm bán được nhiều cốc hơn */
    const q6 = cau(b, 6), s6 = docPhai(q6, /với giá ([\d ]+) đồng một cốc thì mỗi ngày bán được (\d+) cốc\. .* cứ giảm giá bán ([\d ]+) đồng mỗi cốc thì mỗi ngày bán thêm được (\d+) cốc\. .* mỗi ngày đạt ([\d ]+) đồng/);
    const [g0, c0, giam, them, dt] = s6.slice(1).map((s) => toNum(fr(s))), G = g0 / 1000, k6 = (them * 1000) / giam, D6 = dt / 1000;
    const coc = (x) => c0 + k6 * (G - x), ng6 = []; for (let x = 1; x <= G; x++) if (x * coc(x) === D6) ng6.push(x);
    assert.ok(ng6.length === 2 && Number.isInteger(k6), ten.get(q6) + ": hai mức giá (nghìn đồng, số nguyên) cho cùng doanh thu");
    const xBan = ng6.sort((u, v) => coc(v) - coc(u))[0], e6 = bac2(`x² − ${(c0 + k6 * G) / k6}x + ${D6 / k6} = 0`);
    assert.ok(nghiemThuc(e6).every((x) => ng6.includes(Math.round(x))), ten.get(q6) + ": phương trình rút gọn có đúng hai nghiệm đó");
    assert.equal(dapSo(q6), `${fmt(F(xBan * 1000))} đồng một cốc`, ten.get(q6) + ": đáp số");
    coThang(q6, `${c0} + ${k6}(${G} − x) = ${c0 + k6 * G} − ${k6}x`, `x(${c0 + k6 * G} − ${k6}x) = ${fmt(F(D6))}`, `x² − ${(c0 + k6 * G) / k6}x + ${D6 / k6} = 0`, `x = ${Math.max(...ng6)} hoặc x = ${Math.min(...ng6)}`);
    co(q6, ...ng6.map((x) => `${fmt(F(x * 1000))} · ${coc(x)} = ${fmt(F(dt))}`));
    /* Bài 7: tam giác ABC vuông tại A, đường tròn (I) nội tiếp tiếp xúc BC, CA, AB tại D, E, F */
    const s7 = hinh(b, 7), D = diem(s7), C7 = duongTron(s7); assert.equal(C7.length, 1, b.id + " Bài 7: một đường tròn");
    const Ct = C7[0]; assert.ok(dist(D.I, Ct.c) < 0.6 && vuong(subv(D.B, D.A), subv(D.C, D.A)), b.id + " Bài 7: I là tâm đường tròn, tam giác vuông tại A");
    assert.ok(giua(D.B, D.C, D.D) && giua(D.C, D.A, D.E) && giua(D.A, D.B, D.F), b.id + " Bài 7: D, E, F nằm trên các cạnh BC, CA, AB");
    [["D", "B", "C"], ["E", "C", "A"], ["F", "A", "B"]].forEach(([T, P, Q]) => assert.ok(tren(Ct, D[T]) && vuong(subv(D.I, D[T]), subv(D[Q], D[P])), `${b.id} Bài 7: (I) tiếp xúc với ${P}${Q} tại ${T}`));
    ["AB", "AC", "BC", "ID", "IE", "IF"].forEach((s) => assert.ok(coDoan(s7, D[s[0]], D[s[1]]), b.id + " Bài 7: hình có đoạn " + s));
    assert.ok(Math.abs(dist(D.A, D.E) - Ct.r) < 0.6 && Math.abs(dist(D.A, D.F) - Ct.r) < 0.6 && cungTron(D.B, D.D, D.I, D.F), b.id + " Bài 7a: AEIF là hình vuông; B, D, I, F cùng thuộc một đường tròn");
    assert.ok(Math.abs(dist(D.B, D.D) * dist(D.D, D.C) - (dist(D.A, D.B) * dist(D.A, D.C)) / 2) < 0.01 * dist(D.B, D.D) * dist(D.D, D.C), b.id + " Bài 7b: BD · DC = (1/2) · AB · AC");
    const q7c = cau(b, 7, 2), c7 = docPhai(q7c, /Cho AB = (\d+) cm và AC = (\d+) cm/), AB = +c7[1], AC = +c7[2], k = dist(D.A, D.B) / AB;
    assert.ok(Math.abs(dist(D.A, D.C) / k - AC) < 0.02, b.id + " Bài 7: hình đúng tỉ lệ AB : AC");
    const BC = sqrt(F(AB * AB + AC * AC)), r7 = div(sub(F(AB + AC), BC), F(2)), BD = sub(F(AB), r7), S7 = mul(BD, r7);
    assert.ok(isInt(BC) && isInt(r7) && Math.abs(Ct.r / k - toNum(r7)) < 0.02 && Math.abs(dist(D.B, D.D) / k - toNum(BD)) < 0.02 && Math.abs(dtDaGiac(D.B, D.D, D.I, D.F) / (k * k) - toNum(S7)) < 0.05, b.id + " Bài 7c: r, BD, diện tích đo trên hình khớp tính toán");
    assert.equal(dapSo(q7c), `bán kính r = ${fmt(r7)} cm; diện tích tứ giác BDIF là ${fmt(S7)} cm²`, ten.get(q7c) + ": đáp số");
    co(q7c, `√(${AB}² + ${AC}²) = √${AB * AB + AC * AC} = ${fmt(BC)} (cm)`, `r = (${AB} + ${AC} − ${fmt(BC)}) : 2 = ${fmt(r7)} (cm)`, `BF = AB − AF = ${AB} − ${fmt(r7)} = ${fmt(BD)} (cm)`, `${fmt(BD)} · ${fmt(r7)} = ${fmt(S7)} (cm²)`);
    co(cau(b, 7, 0), "góc AEI = góc AFI = 90°", "IE = IF", "góc BDI = 90°", "đường tròn đường kính BI"); co(cau(b, 7, 1), "BD = BF", "CD = CE", "(x + y)² = (x + r)² + (y + r)²", "xy = r(x + y) + r²");
  },
  "toan9-vao10-de9": (b) => {
    /* Bài 3: bảng tần số ghép nhóm (hình); tần số tương đối; ước lượng; quay tấm bìa (hình của ý c) rồi gieo xúc xắc */
    const bang = docBang(hinh(b, 3), b.id + " Bài 3"), qa = cau(b, 3, 0), qb = cau(b, 3, 1), qc = cau(b, 3, 2);
    assert.deepEqual(bang[0], ["Thời gian (phút)", "Số học sinh"], b.id + " Bài 3: hàng tên cột");
    const nhom = bang.slice(1).map((r) => { const m = /^\[(\d+); (\d+)\)$/.exec(r[0]); assert.ok(m && /^\d+$/.test(r[1]), b.id + " Bài 3: hàng “[a; b)” và tần số"); return [+m[1], +m[2], +r[1]]; });
    assert.ok(nhom.length >= 4 && nhom.every((g, i) => !i || (g[0] === nhom[i - 1][1] && g[1] - g[0] === nhom[0][1] - nhom[0][0])), b.id + " Bài 3: các nhóm nối tiếp nhau, cùng độ dài");
    const n = nhom.reduce((s, g) => s + g[2], 0); assert.equal(n, +docDoan(b, 3, /chọn ngẫu nhiên (\d+) học sinh/)[1], b.id + " Bài 3: tổng các tần số bằng số học sinh");
    const tl = nhom.map((g) => F(g[2], n));
    coThang(qa, nhom.map((g, i) => `${g[2]}/${n} = ${phanTram(tl[i])}`).join("; "), nhom.map(([a, c]) => `[${a}; ${c})`).join(", "));
    coGiai(qa, nhom.map((g, i) => `[${g[0]}; ${g[1]}): ${g[2]}/${n} = ${phanTram(tl[i])}`).join("; "), "Thời gian (phút): " + nhom.map(([a, c]) => `[${a}; ${c})`).join("; "), "Tần số tương đối: " + tl.map(phanTram).join("; "));
    const ng = +docPhai(qb, /từ (\d+) phút trở lên/)[1], N = +docPhai(qb, /Khối 9 của trường có (\d+) học sinh/)[1], chon = nhom.filter((g) => g[0] >= ng);
    assert.ok(nhom.some((g) => g[0] === ng) && chon.length >= 2, ten.get(qb) + ": ngưỡng là đầu mút của một nhóm");
    const tong = chon.reduce((s, g) => add(s, F(g[2], n)), F(0)), uoc = mul(tong, F(N));
    assert.ok(isInt(uoc) && dapSo(qb) === `khoảng ${fmt(uoc)} học sinh`, ten.get(qb) + ": đáp số " + dapSo(qb) + ", tính được " + fmt(uoc));
    co(qb, `${chon.map((g) => phanTram(F(g[2], n))).join(" + ")} = ${phanTram(tong)}`, `${phanTram(tong)} · ${N} = ${fmt(uoc)} (học sinh)`);
    // tấm bìa ba hình quạt bằng nhau (hình ở ý c) rồi gieo xúc xắc: tổng là số nguyên tố
    assert.ok(qc.svg, ten.get(qc) + ": ý c có hình tấm bìa"); chuTrongKhung(qc.svg, b.id + " Bài 3c"); hinhDaDoc.add(qc.svg);
    const so = docBia(qc.svg, b.id + " Bài 3c"), ghiSo = docPhai(qc, /chia thành (ba|bốn|năm|sáu) hình quạt bằng nhau ghi các số ((?:\d+, )+\d+)/);
    assert.ok(so.length === { ba: 3, bốn: 4, năm: 5, sáu: 6 }[ghiSo[1]] && cungCap(so, ghiSo[2].split(", ")), ten.get(qc) + ": số hình quạt, các số trên tấm bìa khớp đề bài");
    assert.ok(/gieo một con xúc xắc đồng chất, cân đối/.test(qc.q) && /cộng với số chấm của con xúc xắc ra một số nguyên tố/.test(qc.q), ten.get(qc) + ": gieo xúc xắc, tổng là số nguyên tố");
    const om = so.flatMap((a) => [1, 2, 3, 4, 5, 6].map((d) => [a, String(d)])), nt = (k) => k > 1 && [...Array(k).keys()].slice(2).every((d) => k % d), tongNT = ([a, d]) => nt(+a + +d);
    assert.ok(cungCap(omGhi(qc).map((p) => p.join()), om.map((p) => p.join())), ten.get(qc) + ": Ω liệt kê đủ, đúng");
    const fav = xacSuat(qc, om, tongNT), ghi = /Các kết quả thuận lợi: ((?:\(\d, \d\)(?:; )?)+), gồm (\d+) kết quả/.exec(qc.x);
    assert.ok(ghi && +ghi[2] === fav && cungCap([...ghi[1].matchAll(/\((\d), (\d)\)/g)].map((m) => m[1] + "," + m[2]), om.filter(tongNT).map(String)), ten.get(qc) + ": lời giải liệt kê đủ, đúng các kết quả thuận lợi");
    /* Bài 4: rào mảnh đất hình chữ nhật sát bức tường: biểu thức diện tích, điều kiện của ẩn, phương trình bậc hai */
    const g = docDoan(b, 4, /dùng (\d+) m lưới để rào .* sát một bức tường dài (\d+) m/), luoi = +g[1], tuong = +g[2], xMin = (luoi - tuong) / 2, xMax = luoi / 2, q4a = cau(b, 4, 0), q4b = cau(b, 4, 1);
    coThang(q4a, `${luoi} − 2x (m)`, `0 < ${luoi} − 2x ≤ ${tuong}, tức là ${xMin} ≤ x < ${xMax}`, `S = x(${luoi} − 2x) = ${luoi}x − 2x² (${xMin} ≤ x < ${xMax})`);
    const Sd = +docPhai(q4b, /diện tích (\d+) m²/)[1], ng4 = nghiem(`x(${luoi} − 2x) = ${Sd}`).map(toNum).sort((u, v) => u - v);
    const hop = ng4.filter((x) => x >= xMin && x < xMax);
    assert.ok(ng4.length === 2 && hop.length === 1 && ng4.every(Number.isInteger), ten.get(q4b) + ": hai nghiệm nguyên, đúng một nghiệm thoả mãn điều kiện");
    const x4 = hop[0], doc4 = luoi - 2 * x4, loai = ng4.find((x) => x !== x4);
    assert.equal(dapSo(q4b), `mảnh đất dài ${doc4} m (cạnh dọc bức tường) và rộng ${x4} m`, ten.get(q4b) + ": đáp số");
    co(q4b, `x² − ${luoi / 2}x + ${Sd / 2} = 0`, `x = ${ng4[1]} hoặc x = ${ng4[0]}`, `x = ${loai} không thoả mãn (khi đó cạnh dọc bức tường dài ${luoi} − ${2 * loai} = ${luoi - 2 * loai} m, dài hơn bức tường)`, `${x4} · ${doc4} = ${Sd} (m²)`);
    /* Bài 5: đoạn đường sắt cong: hai cung tròn cùng tâm O, góc ở tâm; độ dài ray trong, hiệu độ dài hai ray */
    const s5 = hinh(b, 5), D5 = diem(s5), d5 = docDoan(b, 5, /bán kính (\d+) m, với góc AOB = (\d+)°; .* cách thanh ray phía trong (\d+) m/), R5 = +d5[1], n5 = +d5[2], kc = +d5[3];
    const cung = [...s5.matchAll(/<path d="M ([\d.]+) ([\d.]+) A ([\d.]+) ([\d.]+) 0 0 1 ([\d.]+) ([\d.]+)" fill="none" stroke-width="2.5"\/>/g)].map((m) => m.slice(1).map(Number)).sort((u, v) => u[2] - v[2]);
    assert.equal(cung.length, 2, b.id + " Bài 5: hai thanh ray là hai cung tròn");
    cung.forEach(([x0, y0, r, r2, x1, y1]) => assert.ok(r === r2 && Math.abs(dist([x0, y0], D5.O) - r) < 0.15 && Math.abs(dist([x1, y1], D5.O) - r) < 0.15 && Math.abs(goc(D5.O, [x0, y0], [x1, y1]) - n5) < 0.2, b.id + " Bài 5: hai cung cùng tâm O, ứng với góc ở tâm " + n5 + "°"));
    assert.ok(dist(D5.A, [cung[0][0], cung[0][1]]) < 0.15 && dist(D5.B, [cung[0][4], cung[0][5]]) < 0.15 && cung[1][2] > cung[0][2], b.id + " Bài 5: A, B là hai đầu của thanh ray phía trong");
    [`${n5}°`, `${R5} m`, "Ray trong", "Ray ngoài"].forEach((t) => assert.ok(texts(s5).some((x) => x.t === t), b.id + " Bài 5: hình ghi " + t));
    const k1 = F(R5 * n5, 180), k2 = F((R5 + kc) * n5, 180), hieu = sub(k2, k1), q5a = cau(b, 5, 0), q5b = cau(b, 5, 1);
    co(q5a, `π · ${R5} · ${n5}/180 = ${fmt(k1)}π ≈ ${tron(toNum(k1) * Math.PI, 2)} (m)`); assert.equal(dapSo(q5a), `khoảng ${tron(toNum(k1) * Math.PI, 2)} m`, ten.get(q5a) + ": đáp số");
    co(q5b, `${R5} + ${kc} = ${R5 + kc} (m)`, `π · ${R5 + kc} · ${n5}/180 = ${fmt(k2)}π (m)`, `${fmt(k2)}π − ${fmt(k1)}π = ${fmt(hieu)}π (m) = ${fmt(mul(hieu, F(100)))}π (cm) ≈ ${tron(toNum(hieu) * 100 * Math.PI, 0)} (cm)`);
    assert.equal(dapSo(q5b), `khoảng ${tron(toNum(hieu) * 100 * Math.PI, 0)} cm`, ten.get(q5b) + ": đáp số");
    /* Bài 6: đi bộ rồi đạp xe đến trường: hệ phương trình */
    const q6 = cau(b, 6), s6 = docPhai(q6, /dài (\d+,\d+) km và Lan đi hết (\d+) phút\. Biết Lan đi bộ với vận tốc (\d+) km\/h và đạp xe với vận tốc (\d+) km\/h/);
    const S6 = fr(s6[1]), t6 = F(+s6[2], 60), v1 = F(+s6[3]), v2 = F(+s6[4]), x6 = div(sub(t6, div(S6, v2)), sub(div(F(1), v1), div(F(1), v2))), y6 = sub(S6, x6);
    assert.ok(toNum(x6) > 0 && toNum(y6) > 0, ten.get(q6) + ": nghiệm dương");
    assert.equal(dapSo(q6), `Lan đi bộ ${fmt(x6)} km và đạp xe ${fmt(y6)} km`, ten.get(q6) + ": đáp số");
    coThang(q6, `{x + y = ${fmt(S6)}; x/${fmt(v1)} + y/${fmt(v2)} = ${fmtF(t6)}}`, `x = ${fmt(x6)}, y = ${fmt(y6)}`);
    co(q6, `${fmt(x6)} : ${fmt(v1)} = ${fmt(div(x6, v1))} (giờ) = ${fmt(mul(div(x6, v1), F(60)))} phút`, `${fmt(y6)} : ${fmt(v2)} = ${fmt(div(y6, v2))} (giờ) = ${fmt(mul(div(y6, v2), F(60)))} phút`);
    /* Bài 7: tam giác ABC vuông tại A, đường cao AH, đường tròn (O) đường kính AH cắt AB, AC tại E, F */
    const s7 = hinh(b, 7), D = diem(s7), C7 = duongTron(s7); assert.equal(C7.length, 1, b.id + " Bài 7: một đường tròn");
    const Ct = C7[0]; assert.ok(dist(D.O, Ct.c) < 0.6 && dist(mid(D.A, D.H), D.O) < 0.6 && Math.abs(dist(D.A, D.H) - 2 * Ct.r) < 0.6, b.id + " Bài 7: đường tròn tâm O đường kính AH");
    assert.ok(vuong(subv(D.B, D.A), subv(D.C, D.A)) && dist(D.A, D.B) < dist(D.A, D.C) && giua(D.B, D.C, D.H) && vuong(subv(D.A, D.H), subv(D.C, D.B)), b.id + " Bài 7: tam giác vuông tại A (AB < AC), AH là đường cao");
    assert.ok(tren(Ct, D.E) && tren(Ct, D.F) && giua(D.A, D.B, D.E) && giua(D.A, D.C, D.F), b.id + " Bài 7: E, F là giao điểm của (O) với các cạnh AB, AC");
    ["AB", "AC", "BC", "AH", "EF", "HE", "HF"].forEach((s) => assert.ok(coDoan(s7, D[s[0]], D[s[1]]), b.id + " Bài 7: hình có đoạn " + s));
    assert.ok(vuong(subv(D.H, D.E), subv(D.B, D.A)) && vuong(subv(D.H, D.F), subv(D.C, D.A)) && thang(D.E, D.F, D.O) && Math.abs(dist(D.E, D.F) - dist(D.A, D.H)) < 0.6, b.id + " Bài 7a: AEHF là hình chữ nhật, EF là đường kính");
    assert.ok(Math.abs(goc(D.E, D.A, D.F) - goc(D.C, D.A, D.B)) < 0.5 && Math.abs(dist(D.A, D.E) * dist(D.A, D.B) - dist(D.A, D.F) * dist(D.A, D.C)) < 0.01 * dist(D.A, D.E) * dist(D.A, D.B), b.id + " Bài 7b: góc AEF = góc ACB, AE · AB = AF · AC");
    const q7c = cau(b, 7, 2), c7 = docPhai(q7c, /Cho AB = (\d+) cm và AC = (\d+) cm/), AB = +c7[1], AC = +c7[2], k = dist(D.A, D.B) / AB;
    assert.ok(Math.abs(dist(D.A, D.C) / k - AC) < 0.02, b.id + " Bài 7: hình đúng tỉ lệ AB : AC");
    const BC = sqrt(F(AB * AB + AC * AC)), AH = div(F(AB * AC), BC), AE = div(mul(AH, AH), F(AB)), AF = div(mul(AE, F(AB)), F(AC)), Sabc = F(AB * AC, 2), Saef = div(mul(AE, AF), F(2)), S7 = sub(Sabc, Saef);
    assert.ok(isInt(BC) && Math.abs(dist(D.A, D.E) / k - toNum(AE)) < 0.02 && Math.abs(dtDaGiac(D.B, D.E, D.F, D.C) / (k * k) - toNum(S7)) < 0.05, b.id + " Bài 7c: AE, diện tích đo trên hình khớp tính toán");
    assert.equal(dapSo(q7c), `AE = ${fmt(AE)} cm; diện tích tứ giác BEFC là ${fmt(S7)} cm²`, ten.get(q7c) + ": đáp số");
    co(q7c, `√(${AB}² + ${AC}²) = √${AB * AB + AC * AC} = ${fmt(BC)} (cm)`, `AH = AB · AC : BC = ${AB} · ${AC} : ${fmt(BC)} = ${fmt(AH)} (cm)`, `AE = AH² : AB = ${fmt(mul(AH, AH))} : ${AB} = ${fmt(AE)} (cm)`, `AF = AE · AB : AC = ${fmt(AE)} · ${AB} : ${AC} = ${fmt(AF)} (cm)`, `= ${fmt(Saef)} (cm²)`, `${fmt(Sabc)} − ${fmt(Saef)} = ${fmt(S7)} (cm²)`);
    co(cau(b, 7, 0), "góc AEH = 90°", "góc AFH = 90°", "EF đi qua O và EF = AH", "có chung trung điểm"); co(cau(b, 7, 1), "góc AEF = góc AHF", "góc AHF = góc ACB", "AE · AB = AF · AC");
  },
  "toan9-vao10-de10": (b) => {
    /* Bài 3: biểu đồ cột kép (hai lớp có sĩ số khác nhau); tần số tương đối; so sánh theo tỉ lệ; chọn ngẫu nhiên phương án hai câu trắc nghiệm */
    const kep = docCotKep(hinh(b, 3), b.id + " Bài 3"), qa = cau(b, 3, 0), qb = cau(b, 3, 1), qc = cau(b, 3, 2), lop = Object.keys(kep.cot);
    const si = docDoan(b, 3, /lớp (9[A-Z]) \((\d+) học sinh\) và lớp (9[A-Z]) \((\d+) học sinh\)/), siSo = { ["Lớp " + si[1]]: +si[2], ["Lớp " + si[3]]: +si[4] };
    assert.deepEqual(lop.sort(), Object.keys(siSo).sort(), b.id + " Bài 3: chú giải là hai lớp của đề bài");
    lop.forEach((l) => assert.equal(kep.cot[l].reduce((s, v) => s + v, 0), siSo[l], b.id + " Bài 3: tổng các cột của " + l + " bằng sĩ số"));
    const tlL = (l) => kep.cot[l].map((v) => F(v, siSo[l]));
    lop.forEach((l) => {
      coThang(qa, `${l.replace("Lớp", "lớp")}: ${kep.nhom.map((t, i) => `${t} ${phanTram(tlL(l)[i])}`).join(", ")}`);
      coGiai(qa, `${l}: ${kep.nhom.map((t, i) => `${t}: ${kep.cot[l][i]}/${siSo[l]} = ${phanTram(tlL(l)[i])}`).join("; ")}.`, `${l}: ${tlL(l).map(phanTram).join("; ")}`);
    });
    const [lA, lB] = ["Lớp " + si[1], "Lớp " + si[3]], iT = kep.nhom.indexOf("Tốt");
    assert.ok(iT >= 0 && kep.cot[lA][iT] > kep.cot[lB][iT] && cmp(tlL(lA)[iT], tlL(lB)[iT]) < 0, b.id + " Bài 3b: lớp nhiều bạn Tốt hơn lại có tỉ lệ Tốt thấp hơn (nhận xét của Minh sai)");
    assert.ok(/nhiều bạn xếp loại Tốt hơn/.test(qb.q) && /đúng hay sai/.test(qb.q), ten.get(qb) + ": nhận xét so sánh số bạn xếp loại Tốt");
    co(qb, `${phanTram(tlL(lA)[iT])} < ${phanTram(tlL(lB)[iT])}`, "nhận xét của Minh sai", "sĩ số khác nhau");
    // hai câu trắc nghiệm bốn phương án, chọn ngẫu nhiên: đúng ít nhất một câu
    const pa = ["A", "B", "C", "D"], dung = docPhai(qc, /phương án đúng của câu thứ nhất là ([A-D]) và của câu thứ hai là ([A-D])/), om = pa.flatMap((u) => pa.map((v) => [u, v]));
    assert.ok(/ít nhất một trong hai câu/.test(qc.q), ten.get(qc) + ": biến cố đúng ít nhất một câu");
    assert.ok(cungCap(omGhi(qc).map((p) => p.join()), om.map((p) => p.join())), ten.get(qc) + ": Ω liệt kê đủ, đúng");
    const it1 = ([u, v]) => u === dung[1] || v === dung[2], fav = xacSuat(qc, om, it1), ghi = /Các kết quả thuận lợi cho E: ((?:\([A-D], [A-D]\)(?:; )?)+), gồm (\d+) kết quả/.exec(qc.x);
    assert.ok(ghi && +ghi[2] === fav && cungCap([...ghi[1].matchAll(/\(([A-D]), ([A-D])\)/g)].map((m) => m[1] + "," + m[2]), om.filter(it1).map(String)), ten.get(qc) + ": lời giải liệt kê đủ, đúng các kết quả thuận lợi");
    /* Bài 4: bóng đèn LED và bóng đèn sợi đốt: tổng chi phí theo thời gian thắp sáng, bất phương trình */
    const den = [...doanDe(b, 4).text.matchAll(/công suất (\d+) W có giá ([\d ]+) đồng/g)].map((m) => [+m[1], toNum(fr(m[2]))]), giaDien = toNum(fr(docDoan(b, 4, /Giá điện là ([\d ]+) đồng mỗi kWh/)[1])), q4a = cau(b, 4, 0), q4b = cau(b, 4, 1);
    assert.equal(den.length, 2, b.id + " Bài 4: hai loại bóng đèn");
    const [[wL, pL], [wS, pS]] = den, aL = (wL * giaDien) / 1000, aS = (wS * giaDien) / 1000;
    assert.ok(Number.isInteger(aL) && Number.isInteger(aS) && pL > pS && aL < aS, b.id + " Bài 4: bóng LED đắt hơn nhưng tốn ít điện hơn");
    coThang(q4a, `L = ${thou(String(pL))} + ${aL}t và S = ${thou(String(pS))} + ${aS}t (t ≥ 0)`); co(q4a, `${fmt(F(wL, 1000))} · ${thou(String(giaDien))} = ${aL} (đồng)`, `${fmt(F(wS, 1000))} · ${thou(String(giaDien))} = ${aS} (đồng)`);
    const nguong = F(pL - pS, aS - aL), t4 = Math.floor(toNum(nguong)) + 1, L = (t) => pL + aL * t, S = (t) => pS + aS * t;
    assert.ok(!isInt(nguong) && L(t4) < S(t4) && L(t4 - 1) > S(t4 - 1) && dapSo(q4b) === `ít nhất ${t4} giờ`, ten.get(q4b) + ": đáp số " + dapSo(q4b) + ", tính được " + t4);
    coThang(q4b, `${aS - aL}t > ${thou(String(pL - pS))}`, `t ≥ ${t4}`); co(q4b, `t > ${thou(String(pL - pS))}/${aS - aL} ≈ ${tron(toNum(nguong), 1)}`, ...[t4 - 1, t4].map((t) => `t = ${t} thì L = ${thou(String(L(t)))} đồng, S = ${thou(String(S(t)))} đồng`));
    /* Bài 5: băng chuyền hai trục lăn cùng bán kính: hình đúng tỉ lệ; chiều dài tấm băng, thời gian kiện hàng đi từ trục này tới trục kia */
    const s5 = hinh(b, 5), d5 = docDoan(b, 5, /cùng bán kính (\d+) cm, tâm của hai trục lăn cách nhau (\d+) m/), r5 = +d5[1], kc5 = +d5[2] * 100, C5 = duongTron(s5).sort((u, v) => u.c[0] - v.c[0]);
    assert.ok(C5.length === 2 && C5[0].r === C5[1].r && Math.abs(C5[0].c[1] - C5[1].c[1]) < 0.15, b.id + " Bài 5: hai trục lăn cùng bán kính, tâm trên một đường ngang");
    const kk = C5[0].r / r5; assert.ok(Math.abs(dist(C5[0].c, C5[1].c) / kk - kc5) < 0.5, b.id + " Bài 5: khoảng cách hai tâm đúng tỉ lệ với bán kính");
    const bang5 = lines(s5).filter((l) => l.w >= 2 && l.a[1] === l.b[1]);
    assert.ok([-1, 1].every((s) => bang5.some((l) => Math.abs(l.a[1] - (C5[0].c[1] + s * C5[0].r)) < 0.15 && Math.abs(Math.min(l.a[0], l.b[0]) - C5[0].c[0]) < 0.15 && Math.abs(Math.max(l.a[0], l.b[0]) - C5[1].c[0]) < 0.15)), b.id + " Bài 5: hai đoạn thẳng của tấm băng tiếp xúc với hai trục lăn");
    const om5 = [...s5.matchAll(/<path d="M ([\d.]+) ([\d.]+) A ([\d.]+) ([\d.]+) 0 0 0 ([\d.]+) ([\d.]+)" fill="none"/g)].map((m) => m.slice(1).map(Number));
    assert.ok(om5.length === 2 && om5.every(([x0, y0, r, , x1, y1]) => Math.abs(r - C5[0].r) < 0.15 && C5.some((c) => Math.abs(dist([x0, y0], c.c) - r) < 0.15 && Math.abs(dist([x1, y1], c.c) - r) < 0.15 && Math.abs(dist([x0, y0], [x1, y1]) - 2 * r) < 0.15)), b.id + " Bài 5: tấm băng ôm nửa ngoài của mỗi trục lăn");
    [`${r5} cm`, `${kc5 / 100} m`].forEach((t) => assert.ok(texts(s5).some((x) => x.t === t), b.id + " Bài 5: hình ghi " + t));
    const q5a = cau(b, 5, 0), q5b = cau(b, 5, 1), dai = 2 * kc5 + 2 * Math.PI * r5;
    co(q5a, `2 · ${kc5} + ${2 * r5}π = ${2 * kc5} + ${2 * r5}π ≈ ${tron(dai, 2)} (cm)`, `2π · ${r5} = ${2 * r5}π (cm)`); assert.equal(dapSo(q5a), `khoảng ${tron(dai, 2)} cm`, ten.get(q5a) + ": đáp số");
    const vong = +docPhai(q5b, /quay đều (\d+) vòng mỗi phút/)[1], vGiay = F(vong * 2 * r5, 60), tg = kc5 / (toNum(vGiay) * Math.PI), ps = div(F(kc5), vGiay);
    co(q5b, `${vong} · ${2 * r5}π = ${vong * 2 * r5}π (cm)`, `${vong * 2 * r5}π : 60 = ${fmt(vGiay)}π (cm)`, `${kc5} : (${fmt(vGiay)}π) = ${ps.n}/(${ps.d}π) ≈ ${tron(tg, 2)} (giây)`);
    assert.equal(dapSo(q5b), `khoảng ${tron(tg, 2)} giây`, ten.get(q5b) + ": đáp số");
    /* Bài 6 (hai bước): hệ phương trình tìm giá, rồi bất phương trình có giảm giá */
    const q6 = cau(b, 6), s6 = docPhai(q6, /mua (\d+) gói hạt giống và (\d+) chậu trồng hết ([\d ]+) đồng; lần thứ hai, lớp mua (\d+) gói hạt giống và (\d+) chậu trồng cùng loại hết ([\d ]+) đồng\. .* giảm (\d+)% giá mỗi chậu cho người mua từ (\d+) chậu trở lên\. .* lớp có ([\d ]+) đồng, cần mua (\d+) gói hạt giống/);
    const [a1, b1, c1, a2, b2, c2, giam, tu, quy, goi] = s6.slice(1).map((s) => toNum(fr(s))), det = a1 * b2 - a2 * b1, xg = (c1 * b2 - c2 * b1) / det, yc = (a1 * c2 - a2 * c1) / det;
    assert.ok(Number.isInteger(xg) && Number.isInteger(yc) && xg > 0 && yc > 0, ten.get(q6) + ": giá là số nguyên dương");
    const conLai = quy - goi * xg, giaGiam = (yc * (100 - giam)) / 100, n6 = Math.floor(conLai / giaGiam);
    assert.ok(n6 >= tu && conLai % giaGiam !== 0 && n6 > Math.floor(conLai / yc), ten.get(q6) + ": mua được từ " + tu + " chậu nên được giảm giá, nhiều hơn khi không giảm");
    assert.equal(dapSo(q6), `nhiều nhất ${n6} chậu trồng`, ten.get(q6) + ": đáp số");
    coThang(q6, `{${a1}x + ${b1}y = ${thou(String(c1))}; ${a2}x + ${b2}y = ${thou(String(c2))}}`, `x = ${thou(String(xg))}, y = ${thou(String(yc))}`, `${thou(String(quy))} − ${goi} · ${thou(String(xg))} = ${thou(String(conLai))} (đồng)`, `${thou(String(giaGiam))}n ≤ ${thou(String(conLai))}`);
    co(q6, `${n6} · ${thou(String(giaGiam))} = ${thou(String(n6 * giaGiam))} ≤ ${thou(String(conLai))}`, `${n6 + 1} · ${thou(String(giaGiam))} = ${thou(String((n6 + 1) * giaGiam))} > ${thou(String(conLai))}`);
    /* Bài 7: tia phân giác của góc BAC cắt BC tại E, cắt (O) tại D; c) góc BAC = 120°, AB = 3, AC = 5, BC = 7 */
    const s7 = hinh(b, 7), D = diem(s7), C7 = duongTron(s7); assert.equal(C7.length, 1, b.id + " Bài 7: một đường tròn");
    const Ct = C7[0]; assert.ok(dist(D.O, Ct.c) < 0.6 && ["A", "B", "C", "D"].every((p) => tren(Ct, D[p])), b.id + " Bài 7: A, B, C, D nằm trên đường tròn tâm O");
    assert.ok(Math.abs(goc(D.A, D.B, D.D) - goc(D.A, D.D, D.C)) < 0.3 && giua(D.B, D.C, D.E) && giua(D.A, D.D, D.E), b.id + " Bài 7: AD là tia phân giác của góc BAC, E là giao điểm của AD và BC");
    ["AB", "AC", "BC", "AD", "BD", "CD"].forEach((s) => assert.ok(coDoan(s7, D[s[0]], D[s[1]]), b.id + " Bài 7: hình có đoạn " + s));
    assert.ok(Math.abs(dist(D.D, D.B) - dist(D.D, D.C)) < 0.6 && vuong(subv(D.D, D.O), subv(D.C, D.B)), b.id + " Bài 7a: DB = DC, OD ⊥ BC");
    assert.ok(Math.abs(dist(D.D, D.B) ** 2 - dist(D.D, D.E) * dist(D.D, D.A)) < 0.01 * dist(D.D, D.B) ** 2 && Math.abs(dist(D.E, D.A) * dist(D.E, D.D) - dist(D.E, D.B) * dist(D.E, D.C)) < 0.01 * dist(D.E, D.B) * dist(D.E, D.C), b.id + " Bài 7b: DB² = DE · DA, EA · ED = EB · EC");
    const q7c = cau(b, 7, 2), c7 = docPhai(q7c, /Cho góc BAC = (\d+)°, AB = (\d+) cm, AC = (\d+) cm và BC = (\d+) cm/), [gA, AB, AC, BC] = c7.slice(1).map(Number), k = dist(D.B, D.C) / BC;
    assert.ok(gA === 120 && AB * AB + AC * AC + AB * AC === BC * BC && Math.abs(goc(D.A, D.B, D.C) - gA) < 0.3, b.id + " Bài 7c: góc 120° khớp ba cạnh (BC² = AB² + AC² + AB · AC) và hình");
    assert.ok(Math.abs(dist(D.A, D.B) / k - AB) < 0.02 && Math.abs(dist(D.A, D.C) / k - AC) < 0.02 && Math.abs(goc(D.D, D.B, D.C) - 60) < 0.3, b.id + " Bài 7: hình đúng tỉ lệ; góc BDC = 60°");
    const EB = F(BC * AB, AB + AC), EC = F(BC * AC, AB + AC), tich = mul(EB, EC), DE2 = sub(F(BC * BC), tich), DE = sqrt(DE2), AD = div(F(BC * BC), DE);
    assert.ok(isR(DE) && isInt(AD) && Math.abs(dist(D.A, D.D) / k - toNum(AD)) < 0.02 && Math.abs(dist(D.D, D.E) / k - toNum(DE)) < 0.02, b.id + " Bài 7c: DE, AD đo trên hình khớp tính toán");
    assert.equal(dapSo(q7c), `AD = ${fmt(AD)} cm`, ten.get(q7c) + ": đáp số");
    co(q7c, `180° − ${gA}° = 60°`, `DB = BC = ${BC} cm`, `EB/EC = AB/AC = ${AB}/${AC}`, `EB = ${BC} · ${AB}/${AB + AC} = ${fmtF(EB)} (cm)`, `EC = ${BC} · ${AC}/${AB + AC} = ${fmtF(EC)} (cm)`, `EB · EC = (${fmtF(EB)}) · (${fmtF(EC)}) = ${fmtF(tich)}`,
      `DE² = ${BC * BC} − ${fmtF(tich)} = ${thou(String(DE2.n))}/${DE2.d}`, `DE = ${fmtF(DE)} (cm)`, `AD = DB² : DE = ${BC * BC} : (${fmtF(DE)}) = ${fmt(AD)} (cm)`);
    co(cau(b, 7, 0), "góc DBC = góc DAC", "góc DCB = góc DAB", "đường trung trực của đoạn thẳng BC"); co(cau(b, 7, 1), "DB² = DE · DA", "EA · ED = EB · EC", "hai góc đối đỉnh");
  }
};
// căn bậc hai rút gọn của số nguyên dương n: "2√5" (n = 20), "√5", "4" (n = 16)
const canGon = (n) => { let a = 1; for (let k = 2; k * k <= n; k++) while (n % (k * k) === 0) { n /= k * k; a *= k; } return n === 1 ? String(a) : (a > 1 ? a : "") + "√" + n; };
// đường thẳng dài (tiếp tuyến) → vectơ chỉ phương
const l2 = (l) => subv(l.b, l.a);

DE.forEach((b) => {
  try { bai1(b); bai2(b); } catch (e) { e.message = b.id + ": " + e.message; throw e; }
  assert.ok(RIENG[b.id], b.id + ": chưa có hàm kiểm tra Bài 3–7 trong RIENG");
  try { RIENG[b.id](b); } catch (e) { e.message = b.id + ": " + e.message; throw e; }
  b.questions.forEach((q) => assert.ok(daKiem.has(q), ten.get(q) + ": câu chưa được kiểm tra"));
  soCau += b.questions.length;
});
assert.equal(Object.keys(RIENG).length, DE.length, "RIENG có hàm cho đề không còn trong danh mục");

/* ---------- dò lộ đáp án trong một đề (mọi câu cùng ra) ----------
   Kết quả của mỗi ý (sau “Đáp số:”): điểm (a; b), phân số, số thập phân, số kèm đơn vị, số đo góc, và số nguyên từ 10 ở vị trí kết quả
   (ngay sau “=”, “≈”, “là”, “bằng”, “được”). Kết quả không được có ở: đề bài chung, đề bài của ý khác, thang chấm và lời giải của ý đứng
   trước (ý sau dùng lại kết quả của ý trước là bình thường). */
const KQ = "(?:=|≈|(?:^|[\\s(])(?:là|bằng|được))\\s+";
const ketQua = (q) => {
  if (!/(?:^|\n)Đáp số: /.test(q.x)) return [];
  const s = dapSo(q), out = new Set();
  diemTrongDS(s).forEach((p) => out.add(`(${fmtF(p[0])}; ${fmtF(p[1])})`));
  (s.match(/−?\d+\/\d+|−?\d+,\d+|\d+°|\d{1,3}(?: \d{3})+/g) || []).forEach((x) => out.add(x));
  for (const m of s.matchAll(/(?:^|[\s(])(\d{2,})(%|°)?(?![\d,/])/g)) out.add(m[2] ? m[1] + m[2] : "#" + m[1]);
  return [...out];
};
const coKQ = (t, a) => (a[0] === "#" ? new RegExp(KQ + a.slice(1) + "(?![\\d,/%°])", "u").test(t) : new RegExp("(?<![\\d,])" + a.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + "(?![\\d/]|,\\d)", "u").test(t));
const doLo = (b, qs) => {
  const lo = [];
  qs.forEach((q, i) => ketQua(q).forEach((a) => {
    Object.values(b.passages).forEach((ps) => { if (coKQ(ps.text, a)) lo.push(`${ten.get(q) || "?"}: đề bài chung có ${a}`); });
    qs.forEach((p, j) => {
      if (p === q) return;
      const noi = j < i ? chuCau(p) : [p.q];
      if (noi.some((t) => coKQ(t, a))) lo.push(`${ten.get(p) || "?"} lộ đáp án ${ten.get(q) || "?"}: ${a}`);
    });
  }));
  return lo;
};
const lo = DE.flatMap((b) => doLo(b, b.questions));
if (process.env.DO_LO) console.log("Kết quả có ở câu khác (xem tay):\n" + lo.join("\n"));
// đã xem (Phiên N9-vao10-toan): (để trống khi không có chỗ nào)
const DA_XEM = [];
assert.deepEqual(lo, DA_XEM, "lộ đáp án trong một đề:\n" + lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải ý a có điểm của ý b; đề bài chung có kết quả của ý c; đề bài ý sau có kết quả ý trước
{
  const b = DE[0], qs = b.questions.map((q) => Object.assign({}, q)), gia = Object.assign({}, b, { passages: Object.assign({}, b.passages) });
  qs.forEach((q, i) => ten.set(q, "thử#" + (i + 1)));
  const iA = qs.findIndex((q) => q.part === BAI[0][0]), dsB = ketQua(qs[iA + 1]);
  assert.ok(dsB.length, "thử: ý b của Bài 1 có kết quả");
  qs[iA].x += " Chẳng hạn điểm " + dsB[0] + ".";
  assert.ok(doLo(gia, qs).some((s) => s.includes(dsB[0])), "bộ dò phải bắt được kết quả của ý b có ở lời giải ý a");
  const qs2 = b.questions.map((q) => Object.assign({}, q)); qs2.forEach((q, i) => ten.set(q, "thử2#" + (i + 1)));
  const q7c = qs2[qs2.length - 1], kq7 = ketQua(q7c).find((a) => a[0] !== "#");
  gia.passages.bai7 = Object.assign({}, b.passages.bai7, { text: b.passages.bai7.text + " Biết diện tích khoảng " + kq7 + "." });
  assert.ok(doLo(gia, qs2).some((s) => s.includes("đề bài chung")), "bộ dò phải bắt được kết quả có ở đề bài chung");
  DE.forEach((d) => d.questions.forEach((q, i) => ten.set(q, "de" + so(d) + "#" + (i + 1))));
}

/* ---------- đề bài không trùng câu nào khác trong data/banks/9-toan.js (so sau khi bỏ dấu câu, khoảng trắng) ---------- */
const goc9 = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}−]+/gu, ""); // giữ dấu trừ: “y = 0,25x²” khác “y = −0,25x²”
const deBai = BANKS.filter((b) => b.file === "9-toan.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc9(q.q) })));
deBai.filter((d) => /vao10/.test(d.at)).forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });

/* ---------- không chép sách, không trùng ý: chuỗi 8 từ liền nhau (bỏ dấu, gộp nguyên âm) ----------
   CUM_CHUNG: cụm chung của khung đề, thang chấm, lời giải (thay bằng dấu ngăn trước khi so); chuỗi so phải có ít nhất 5 từ có chữ. */
const khongDau = (s) => String(s).normalize("NFC").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const CUM_CHUNG = ["đề thi thử theo cấu trúc đề tuyển sinh lớp 10 của tp hcm năm 2026", "tỉnh thành khác có thể ra đề khác xem thông báo của sở",
  "lập đúng bảng giá trị với ít nhất 5 điểm", "vẽ đúng parabol đi qua các điểm đó", "nhận trục oy làm trục đối xứng", "có trục toạ độ gốc o đơn vị trên trục",
  "trên mặt phẳng toạ độ oxy đánh dấu các điểm", "rồi nối chúng bằng một đường cong trơn", "đồ thị p là một parabol có đỉnh là gốc toạ độ o",
  "nằm phía trên trục hoành", "nằm phía dưới trục hoành", "là điểm thấp nhất của đồ thị", "là điểm cao nhất của đồ thị", "có đồ thị là parabol p",
  "không giải phương trình tính giá trị của biểu thức", "gọi x₁ x₂ là hai nghiệm của phương trình", "vậy phương trình có hai nghiệm phân biệt",
  "kết luận phương trình có hai nghiệm phân biệt", "viết đúng định lí viète", "theo định lí viète", "chứng tỏ phương trình", "có hai nghiệm phân biệt",
  "tiếp tuyến vuông góc với bán kính tại tiếp điểm", "góc nội tiếp chắn nửa đường tròn", "cùng nằm trên đường tròn đường kính", "cùng thuộc đường tròn đường kính",
  "cùng thuộc một đường tròn", "có chung cạnh huyền", "tính chất của hai tiếp tuyến cắt nhau", "tính chất hai tiếp tuyến cắt nhau", "đối chiếu điều kiện và trả lời",
  "thoả mãn điều kiện", "kết quả đồng khả năng", "kết quả thuận lợi cho", "mỗi kết quả là một cặp", "chọn ngẫu nhiên", "tần số tương đối", "bảng tần số",
  "làm tròn đến hàng phần trăm của", "làm tròn đến hàng phần mười của", "làm tròn đến hàng đơn vị của", "làm tròn đến độ", "diện tích xung quanh của hình nón",
  "vẽ đồ thị p của hàm số", "tìm toạ độ các điểm thuộc p", "là đường trung trực của đoạn thẳng", "trung tuyến ứng với cạnh huyền", "áp dụng định lí pythagore cho tam giác", "hình đúng tỉ lệ", "hình vẽ", "đáp số"].map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; CUM_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const truong = (b) => b.questions.map((q) => ({ q, s: chuCau(q).concat(q.p && b.questions.find((x) => x.p === q.p) === q ? [b.passages[q.p].text] : []) }));
// giữa các đề thi thử với nhau: đề bài chung, đề bài (thang chấm, lời giải theo khung chung thì được giống nhau)
{
  const cua = (b) => Object.values(b.passages).map((ps) => ps.text).concat(b.questions.map((q) => q.q));
  const bao = DE.flatMap((b, i) => DE.slice(i + 1).flatMap((c) => { const set = new Set(cua(c).flatMap((s) => chuoi(s, 8))); return [...new Set(cua(b).flatMap((s) => chuoi(s, 8)))].filter((x) => set.has(x)).map((x) => `${b.id} ~ ${c.id}: ${x}`); }));
  assert.deepEqual(bao, [], "đề bài các đề thi thử trùng chuỗi 8 từ:\n" + bao.join("\n"));
}
// với câu của mọi kho khác (cả kho Toán 9)
{
  const khac = BANKS.filter((b) => !/^toan9-vao10-/.test(b.id) && (!b.pool || true)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ id: b.id, s: " " + [q.q, q.x].concat(q.o || [], q.l || [], q.r || [], (q.rubric || []).map((r) => r.c)).map((x) => khongDau(String(x))).join(" | ") + " " })));
  const bao = (k) => DE.flatMap((b) => truong(b).flatMap(({ q, s }) => [...new Set(s.flatMap((x) => chuoi(x, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`))));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
// với chữ OCR của sách Toán 6–9 (nếu có OnUp-Book)
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = ["lop-6/toan-6-tap-1", "lop-6/toan-6-tap-2", "lop-7/toan-7-tap-1", "lop-7/toan-7-tap-2", "lop-8/toan-8-tap-1", "lop-8/toan-8-tap-2", "lop-9/toan-9-tap-1", "lop-9/toan-9-tap-2"].map((c) => path.join(BOOK, c, "chu.txt")).filter((f) => fs.existsSync(f));
if (SACH.length) {
  assert.ok(SACH.some((f) => /toan-9-tap-2/.test(f)), "OnUp-Book có Toán 9 tập hai");
  // các điều KHONG_DAY đúng là không có trong sách Toán 9
  const sach9 = SACH.filter((f) => /toan-9-/.test(f)).map((f) => fs.readFileSync(f, "utf8").normalize("NFC")).join("\n");
  KHONG_DAY.forEach(([re, ten_]) => assert.ok(!re.test(sach9), `KHONG_DAY: “${ten_}” có trong chữ OCR của sách Toán 9, xem lại danh sách`));
  const sach = " " + khongDau(SACH.map((f) => fs.readFileSync(f, "utf8").replace(/=== page-\d+ · (?:trang in \d+|[^=]+) ===/g, " ")).join(" | ")) + " ";
  const bao = (k) => DE.flatMap((b) => truong(b).flatMap(({ q, s }) => [...new Set(s.flatMap((x) => chuoi(x, k)))].filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách Toán 6–9 (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");

const soHinh = hinhDaDoc.size;
/* ---------- bộ đọc tự thử: hình, câu cố ý viết sai thì báo lỗi ---------- */
{
  const d1 = DE.find((b) => b.id === "toan9-vao10-de1"), d2 = DE.find((b) => b.id === "toan9-vao10-de2"), d4 = DE.find((b) => b.id === "toan9-vao10-de4");
  const sua = (b, k, f) => Object.assign({}, b, { passages: Object.assign({}, b.passages, { ["bai" + k]: Object.assign({}, b.passages["bai" + k], { svg: f(b.passages["bai" + k].svg) }) }) });
  const chay = (b) => { daKiem.clear(); RIENG[b.id](b); };
  // bảng: đổi một tần số thì đáp án không khớp
  assert.throws(() => chay(sua(d1, 3, (s) => s.replace(/>13</, ">12<"))), /thiếu|xác suất|thập phân/);
  // Bài 7: kéo B lệch khỏi đường tròn thì AB không còn là tiếp tuyến
  assert.throws(() => chay(sua(d1, 7, (s) => s.replace(/(<circle cx=")([\d.]+)(" cy="42.45" r="3.5")/, (m, a, x, c) => a + (+x + 6) + c))), /tiếp tuyến|nhãn|đường tròn/);
  // biểu đồ cột: số ở đỉnh cột khác chiều cao cột
  assert.throws(() => chay(sua(d2, 3, (s) => s.replace(/>54</, ">55<"))), /khác chiều cao cột/);
  // biểu đồ hình quạt: số phần trăm khác góc
  assert.throws(() => chay(sua(d4, 3, (s) => s.replace(">20%<", ">25%<"))), /không khớp|100%/);
  // chữ tràn khỏi khung hình
  assert.throws(() => chuTrongKhung('<svg viewBox="0 0 320 100" width="320"><text x="300" y="50" font-size="15">Chữ dài tràn ra</text></svg>', "thử"), /tràn khỏi khung/);
  // Đề 5–7 (Phiên N9-vao10-toan-b): biểu đồ đoạn thẳng, biểu đồ cột ghép nhóm, hình vành khuyên, hình Bài 7 cố ý vẽ sai
  const d5 = DE.find((b) => b.id === "toan9-vao10-de5"), d6 = DE.find((b) => b.id === "toan9-vao10-de6"), d7 = DE.find((b) => b.id === "toan9-vao10-de7");
  assert.throws(() => chay(sua(d5, 3, (s) => s.replace('fill="acc">12<', 'fill="acc">13<'))), /khác tung độ/);
  assert.throws(() => chay(sua(d7, 3, (s) => s.replace(">57,5<", ">57<"))), /giá trị đại diện/);
  assert.throws(() => chay(sua(d6, 3, (s) => s.replace('fill="acc">35%<', 'fill="acc">30%<'))), /khác chiều cao cột/);
  assert.throws(() => chay(sua(d6, 3, (s) => s.replace(/(<rect x="112" y="[\d.]+" width=")46/, "$150"))), /liền nhau/);
  assert.throws(() => chay(sua(d5, 5, (s) => s.replace('r="61.6" fill="acc-soft"', 'r="66" fill="acc-soft"'))), /tỉ lệ bán kính|bán kính trong/);
  assert.throws(() => chay(sua(d7, 5, (s) => s.replace(/(<line x1="116" y1="96" x2="116" y2=")206/, "$1196"))), /đường sinh|tỉ lệ/);
  assert.throws(() => chay(sua(d7, 7, (s) => s.replace('cx="115.12" cy="77.84"', 'cx="119.12" cy="77.84"'))), /đi qua D|tiếp tuyến|vuông/);
  assert.throws(() => chay(sua(d6, 7, (s) => s.replace('cx="232" cy="84"', 'cx="232" cy="90"'))), /tiếp tuyến|tỉ lệ|R²/);
  const qb6 = d6.questions[1], hong6 = Object.assign({}, d6, { questions: d6.questions.map((q) => (q === qb6 ? Object.assign({}, q, { x: q.x.replace(/Đáp số: .*$/, "Đáp số: hai giao điểm (3; −9) và (−4; 16).") }) : q)) });
  hong6.questions.forEach((q, i) => ten.set(q, "thử6#" + (i + 1)));
  assert.throws(() => bai1(hong6), /đáp số/);
  // Đề 8–10 (Phiên N9-vao10-toan-c): biểu đồ tần số tương đối dạng cột, lều, đường tròn nội tiếp, tấm bìa (hình của ý c), đường ray cong,
  // đường tròn đường kính AH, biểu đồ cột kép, băng chuyền, tia phân giác cố ý vẽ sai; Bài 1 với hai điều kiện mới, đáp số sai
  const d8 = DE.find((b) => b.id === "toan9-vao10-de8"), d9 = DE.find((b) => b.id === "toan9-vao10-de9"), d10 = DE.find((b) => b.id === "toan9-vao10-de10");
  const suaY = (b, i, f) => Object.assign({}, b, { questions: b.questions.map((q, j) => (j === i ? Object.assign({}, q, { svg: f(q.svg) }) : q)) });
  assert.throws(() => chay(sua(d8, 3, (s) => s.replace('fill="acc">35%<', 'fill="acc">30%<'))), /khác chiều cao cột/);
  assert.throws(() => chay(sua(d8, 5, (s) => s.replace('<line x1="70" y1="95.5" x2="70" y2="167.5"', '<line x1="70" y1="95.5" x2="70" y2="175"'))), /cân đối|tỉ lệ/);
  assert.throws(() => chay(sua(d8, 7, (s) => s.replace('<circle cx="151.38" cy="132.55"', '<circle cx="155.38" cy="132.55"'))), /tiếp xúc|nằm trên|nhãn/);
  assert.throws(() => chay(suaY(d9, d9.questions.findIndex((q) => q.svg), (s) => s.replace("A 72 72 0 0 1 222.35 132 Z", "A 72 72 0 0 1 230 120 Z"))), /đường tròn|bằng nhau|nối tiếp/);
  assert.throws(() => chay(sua(d9, 5, (s) => s.replace("A 220 220 0 0 1 243.25 167.81", "A 220 220 0 0 1 239.39 159.02"))), /góc ở tâm|hai đầu/);
  assert.throws(() => chay(sua(d9, 7, (s) => s.replace('<circle cx="67.4" cy="162.8"', '<circle cx="70.4" cy="162.8"'))), /giao điểm|chữ nhật|đường kính|nhãn/);
  assert.throws(() => chay(sua(d10, 3, (s) => s.replace('fill="ink">20<', 'fill="ink">21<'))), /khác chiều cao cột/);
  assert.throws(() => chay(sua(d10, 5, (s) => s.replace('<circle cx="280" cy="96" r="18"', '<circle cx="280" cy="96" r="20"'))), /cùng bán kính/);
  assert.throws(() => chay(sua(d10, 7, (s) => s.replace('<circle cx="160" cy="273.87"', '<circle cx="165" cy="273.87"'))), /nằm trên đường tròn|phân giác|nhãn/);
  [[d8, "Đáp số: hai điểm (0,5; −0,5) và (−0,5; 0,5)."], [d10, "Đáp số: hai điểm (2,5; −2,5) và (5; −10)."]].forEach(([d, ds], k) => {
    const qx = d.questions[1], h = Object.assign({}, d, { questions: d.questions.map((q) => (q === qx ? Object.assign({}, q, { x: q.x.replace(/Đáp số: .*$/, ds) }) : q)) });
    h.questions.forEach((q, i) => ten.set(q, `thử${k}#` + (i + 1)));
    assert.throws(() => bai1(h), /đáp số/);
  });
  // Bài 1: đáp số sai thì báo
  const qb = d1.questions[1], hong = Object.assign({}, d1, { questions: d1.questions.map((q) => (q === qb ? Object.assign({}, q, { x: q.x.replace(/Đáp số: .*$/, "Đáp số: M(8; 15).") }) : q)) });
  hong.questions.forEach((q, i) => ten.set(q, "thử#" + (i + 1)));
  assert.throws(() => bai1(hong), /đáp số/);
}

console.log(soCau + " câu tự luận của " + DE.length + " đề đã tính lại đáp án, đọc lại " + soHinh + " hình.");
console.log("MATH OK");
