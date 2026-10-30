// Kiểm tra ngân hàng KHTN 9 cuối năm của Phiên N9-ck2-khtn (data/banks/9-khtn.js: hai đề cố định và câu riêng của đề ngẫu nhiên
// khtn9-ck2-ngau-nhien), theo mẫu tests/khtn9-gk2.js, tests/khtn6-ck2.js. Số đề, số câu lấy từ danh mục (không ghi cứng); ma trận
// 10 – 8 – 7 như mọi kho lớp 9; số câu mỗi phân môn so với lời dặn (note) của đề.
// Câu có phép tính hoặc có hình được nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong kho, đúng đề ghi ở id); đáp án tính bằng
// code (so với ans, o[0] hoặc a): năng lượng điện, công suất điện (P = UI), điện năng tiết kiệm khi thay đèn, điện năng của pin mặt
// trời, tua-bin gió, công suất của nhà máy thuỷ điện (thế năng của nước, hiệu suất), số lần đổi chiều và tần số của dòng điện xoay
// chiều, phần chi phí khai thác trong giá xăng; tính theo phương trình hoá học (khối lượng mol từ nguyên tử khối đề cho, hệ số đọc từ
// phương trình), khối lượng thanh kim loại thay đổi khi đẩy kim loại khác ra khỏi dung dịch muối (dãy hoạt động hoá học), chọn kim
// loại làm sạch dung dịch muối, thành phần hợp kim, thạch cao trong xi măng, nhiệt toả ra khi đốt methane; số tế bào sau nhiều lần
// nguyên phân, số NST Y trong tinh trùng, số NST của người mắc hội chứng Turner. Hình đọc lại: đồ thị cường độ dòng điện xoay chiều
// theo thời gian (trục, số ghi ở các vạch, đường biểu diễn cắt trục thời gian đúng ở các vạch có số, cách đều nhau), một phần chu
// trình carbon (ô có chữ, mũi tên có số: mũi tên đi từ ô nào đến ô nào; mũi tên, số không đè lên ô khác), NST trước và sau đột biến
// (các đoạn có chữ, tâm động) rồi xác định dạng đột biến, dấu vết DNA của mẹ, con, ba người đàn ông (mỗi vạch của con phải có ở mẹ
// hoặc bố: đúng một người làm bố được). Mọi phương trình hoá học trong câu Hoá học phải cân bằng. Câu trả lời bằng số và câu có hình
// nào cũng phải có kiểm tra ở đây.
// Rồi: chữ (công thức hoá học viết bằng chữ số dưới dòng, tên chất như sách, dấu thanh kiểu cũ như sách “hoá”, “thuỷ”; số ngăn hàng
// nghìn bằng khoảng trắng, dấu phẩy thập phân), mức độ và ma trận (18 chủ đề theo thứ tự bài của sách: 12 bài phần sau giữa kì II và 6
// chủ đề ôn mang đúng chữ chủ đề của kho giữa kì II; hai đề cố định và câu riêng chia đúng ma trận), dạng câu theo khung Công văn 7991
// (mỗi phần 4 câu đúng/sai 4 ý không lặp kiểu Đ/S, 6 câu trả lời ngắn bằng số), đáp án đúng không dài hơn hẳn lựa chọn sai, là lựa chọn
// dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn và không là lựa chọn duy nhất có chữ của nhãn chủ đề, câu ôn
// không trùng câu cùng chủ đề của kho giữa kì II (đề bài, chuỗi 6 từ của đề bài, đáp án đúng; DO_GK2=1 in chuỗi 5 từ), rút thử nhiều lần
// (đúng ma trận, gặp đủ câu riêng; đã làm hết một đề cố định thì không rút lại câu của đề đó), đề bài không trùng, dò lộ đáp án giữa các
// câu rút được cùng lúc (số ở vị trí kết quả: không được có; chuỗi 3 từ của đáp án bằng chữ in ra với DO_LO=1 để xem tay, đã xem ghi ở
// DA_XEM). Có sách ở ../OnUp-Book (repo riêng tư) thì so mọi trường chữ với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp nguyên âm (không
// chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và với câu của mọi kho khác, cả câu riêng của các đề ngẫu nhiên khác (không chuỗi 8
// từ nào trùng; DO_KHO=1 in chuỗi 5 từ).
// Chạy: node tests/khtn9-ck2.js → in MATH OK.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz;
const pool = BANKS.find((b) => b.pool && /^khtn9-ck2-/.test(b.id));
assert.ok(pool, "thiếu đề ngẫu nhiên khtn9-ck2");
assert.equal(pool.pool.from.length, 2, "đề ngẫu nhiên lấy câu của hai đề cố định");
const S = { de1: pool.pool.from[0], de2: pool.pool.from[1], own: pool.id };
assert.deepEqual(BANKS.filter((b) => /^khtn9-ck2-/.test(b.id)).map((b) => b.id).sort(), Object.values(S).sort(), "kho gồm hai đề cố định và đề ngẫu nhiên");
const kho = pool.questions, mine = kho.filter((q) => q.src === S.own);
[S.de1, S.de2].forEach((id) => assert.equal(bank(id).questions.length, bank(id).n, id + ": số câu bằng n của danh mục"));
assert.equal(kho.length, mine.length + bank(S.de1).n + bank(S.de2).n, "kho = câu riêng + câu của hai đề cố định");
assert.equal(mine.length, pool.n, "câu riêng chia đúng ma trận nên có đúng n câu");
const gk2 = BANKS.find((b) => b.pool && /^khtn9-gk2-/.test(b.id));
assert.ok(gk2, "thiếu kho giữa kì II khtn9-gk2 để so phần ôn");
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- số ---------- */
const val = (s) => +String(s).replace(/\s/g, "").replace(/−/g, "-").replace(",", "."); // "7 500" → 7500, "4,4" → 4.4
const close = (x, y, e = 1e-9) => Math.abs(x - y) < e;
const tron = (x, k = 2) => Math.round(x * 10 ** k) / 10 ** k;
const vn = (x) => { const [a, b] = String(tron(x, 6)).split("."); return a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); }; // 7500 → "7 500", 0.15 → "0,15"
const SO = "([\\d ]*\\d(?:,\\d+)?)"; // một số viết như trong đề: "1 800", "0,25"

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const ends = (l) => [[num(l, "x1"), num(l, "y1")], [num(l, "x2"), num(l, "y2")]];
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const box = (r) => ({ x: num(r, "x"), y: num(r, "y"), w: num(r, "width"), h: num(r, "height") });
const trongHop = (p, b, e = 0) => p[0] >= b.x - e && p[0] <= b.x + b.w + e && p[1] >= b.y - e && p[1] <= b.y + b.h + e;
// khoảng cách từ điểm p đến đoạn thẳng [a, b]
const kcDoan = (p, [a, b]) => { const d = [b[0] - a[0], b[1] - a[1]], L = d[0] ** 2 + d[1] ** 2, t = Math.max(0, Math.min(1, ((p[0] - a[0]) * d[0] + (p[1] - a[1]) * d[1]) / L));
  return dist(p, [a[0] + t * d[0], a[1] + t * d[1]]); };
// đoạn thẳng [a, b] có đi vào bên trong hình chữ nhật b (bỏ 1 đơn vị ở mép) không: lấy mẫu dọc đoạn
const catHop = ([a, b], hop) => { for (let k = 1; k < 100; k++) { const t = k / 100, p = [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
  if (p[0] > hop.x + 1 && p[0] < hop.x + hop.w - 1 && p[1] > hop.y + 1 && p[1] < hop.y + hop.h - 1) return true; } return false; };
// bề rộng ước lượng của một dòng chữ cỡ 15 (chữ thường khoảng 0,55 cỡ chữ)
const rongChu = (t, co = 15) => [...t].length * 0.56 * co;

/* Đồ thị cường độ dòng điện xoay chiều theo thời gian: trục thời gian nằm ngang, trục cường độ thẳng đứng (màu ink, nét 1,5) cắt nhau ở
   gốc O; số ghi thời gian (ms) ở hàng dưới cùng, mỗi số ngay dưới một vạch lưới dọc nét đứt màu line; số 0 ở cạnh gốc; đường biểu
   diễn là polyline màu acc. Trả về các thời điểm đường biểu diễn cắt trục thời gian (dòng điện đổi chiều). */
const docXoayChieu = (svg) => {
  const LN = tags(svg, "line"), TX = texts(svg), truc = LN.filter((l) => l.stroke === "ink" && l["stroke-width"] === "1.5").map(ends);
  assert.equal(truc.length, 2, "hai trục");
  const ngang = truc.find(([p, q]) => p[1] === q[1]), dung = truc.find(([p, q]) => p[0] === q[0]);
  const O = [dung[0][0], ngang[0][1]];
  assert.ok(close(Math.min(ngang[0][0], ngang[1][0]), O[0]) && O[1] > Math.min(dung[0][1], dung[1][1]) && O[1] < Math.max(dung[0][1], dung[1][1]), "trục thời gian đi từ gốc, trục cường độ có cả phần dương và âm");
  assert.ok(TX.some((t) => t.t === "0" && t["text-anchor"] === "end" && Math.abs(+t.x - O[0]) < 12 && Math.abs(+t.y - 5 - O[1]) < 3), "số 0 ở gốc");
  assert.ok(TX.some((t) => t.t === "t (ms)") && TX.some((t) => t.t === "i"), "tên hai trục: i, t (ms)");
  const so = TX.filter((t) => /^\d+$/.test(t.t) && t.t !== "0").map((t) => ({ x: +t.x, y: +t.y, v: +t.t }));
  assert.ok(so.length >= 3 && so.every((t) => t.y === so[0].y && t.y > O[1]), "số ghi thời gian cùng một hàng, dưới trục");
  const k = so.map((t) => (t.x - O[0]) / t.v); assert.ok(k.every((c) => close(c, k[0], 1e-9)), "số ghi thời gian cách đều, bắt đầu từ 0 ở gốc");
  const luoi = LN.filter((l) => l.stroke === "line").map(ends);
  so.forEach((t) => assert.ok(luoi.some(([p, q]) => p[0] === t.x && q[0] === t.x), "vạch lưới dọc ở mốc " + t.v + " ms"));
  const pl = tags(svg, "polyline"); assert.equal(pl.length, 1, "một đường biểu diễn"); assert.equal(pl[0].stroke, "acc");
  const P = pts(pl[0].points);
  assert.ok(close(P[0][0], O[0]) && close(P[0][1], O[1]), "đường biểu diễn bắt đầu ở gốc O");
  // thời điểm cắt trục thời gian (đổi dấu của cường độ dòng điện)
  const cat = [];
  for (let i = 1; i < P.length; i++) { const a = P[i - 1][1] - O[1], b = P[i][1] - O[1];
    if (b === 0 && i < P.length - 1) cat.push(P[i][0]); else if (a * b < 0) cat.push(P[i - 1][0] + ((P[i][0] - P[i - 1][0]) * a) / (a - b)); }
  const t = [...new Set(cat.map((x) => tron((x - O[0]) / k[0], 6)))];
  assert.ok(t.length >= 2, "đường biểu diễn đổi chiều nhiều lần");
  const nua = t.map((x, i) => x - (i ? t[i - 1] : 0)); assert.ok(nua.every((d) => close(d, nua[0], 1e-6)), "dòng điện đổi chiều sau những khoảng thời gian bằng nhau");
  t.forEach((x) => assert.ok(so.some((s) => close(s.v, x, 1e-6)), "đường biểu diễn cắt trục đúng ở mốc có ghi số: " + x + " ms"));
  // đường biểu diễn lên trên rồi xuống dưới trục, không chạm số ghi thời gian
  assert.ok(P.some((p) => p[1] < O[1] - 20) && P.some((p) => p[1] > O[1] + 20), "có cả phần dương và phần âm");
  assert.ok(P.every((p) => p[1] < so[0].y - 15), "đường biểu diễn không đè lên hàng số ghi thời gian");
  return { doiChieu: t, nuaChuKi: nua[0] };
};

/* Một phần chu trình carbon: mỗi ô là hình chữ nhật bo góc (fill surface) có một dòng chữ ở giữa; mỗi mũi tên là một đoạn thẳng màu
   ink nét 2 và một tam giác tô ink ở đầu (điểm đầu tiên là mũi); số của mũi tên “(1)”… đậm, ghi cạnh thân mũi tên. Trả về các mũi tên
   { so, tu, den } (tên ô ở gốc, ở mũi). */
const docChuTrinh = (svg) => {
  const TX = texts(svg), o = tags(svg, "rect").map((r) => Object.assign(box(r), { r }));
  assert.ok(o.every((b) => b.r.fill === "surface" && b.r.rx), "ô là hình chữ nhật bo góc");
  o.forEach((b) => { const c = TX.filter((t) => trongHop([+t.x, +t.y - 5], b)); assert.equal(c.length, 1, "mỗi ô một dòng chữ"); b.ten = c[0].t;
    assert.ok(rongChu(b.ten) <= b.w - 6, "chữ vừa ô: " + b.ten); assert.ok(close(+c[0].x, b.x + b.w / 2), "chữ giữa ô: " + b.ten); });
  const than = tags(svg, "line").map(ends), mui = tags(svg, "polygon").map((p) => pts(p.points));
  assert.equal(than.length, mui.length, "mỗi mũi tên một thân, một đầu");
  const oCua = (p) => { const c = o.filter((b) => trongHop(p, b, 0.5) && !trongHop(p, { x: b.x + 1, y: b.y + 1, w: b.w - 2, h: b.h - 2 }));
    assert.equal(c.length, 1, "đầu mũi tên nằm trên cạnh của đúng một ô: " + p); return c[0]; };
  const SOM = TX.filter((t) => /^\(\d\)$/.test(t.t)).map((t) => ({ t: t.t, p: [+t.x, +t.y - 5] }));
  assert.equal(SOM.length, than.length, "mỗi mũi tên một số");
  const mt = than.map(([a, b]) => {
    const m = mui.find((g) => dist(g[0], b) < 12 && dist(g[0], b) > 5); assert.ok(m, "đầu mũi tên ở cuối thân");
    const tu = oCua(a), den = oCua(m[0]);
    assert.notEqual(tu, den, "mũi tên nối hai ô khác nhau");
    o.filter((b) => b !== tu && b !== den).forEach((b) => assert.ok(!catHop([a, m[0]], b), "mũi tên đi qua ô " + b.ten));
    return { a, b: m[0], tu: tu.ten, den: den.ten };
  });
  // số gán cho mũi tên gần nhất; số không đè lên thân mũi tên nào và không nằm trong ô nào
  SOM.forEach((s) => { const d = mt.map((m) => kcDoan(s.p, [m.a, m.b])), i = d.indexOf(Math.min(...d));
    assert.ok(d[i] > 9 && d[i] < 30 && d.filter((x, j) => j !== i).every((x) => x > d[i] + 8), "số " + s.t + " ở cạnh đúng một mũi tên, không đè lên thân");
    assert.ok(o.every((b) => !trongHop(s.p, b, 8)), "số " + s.t + " không nằm trong ô"); assert.ok(!mt[i].so, "hai số cạnh một mũi tên"); mt[i].so = s.t; });
  return mt;
};

/* NST trước và sau đột biến: mỗi đoạn là một ô chữ nhật có một chữ cái ở giữa; tâm động là chấm tròn tô ink bán kính 7; mỗi NST nằm
   trên một hàng, ngay dưới nhãn “Trước đột biến” / “Sau đột biến” (như tests/khtn9-gk2.js). */
const docNST = (svg) => {
  const TX = texts(svg), o = tags(svg, "rect").map((r) => ({ x: +r.x, y: +r.y, w: +r.width, h: +r.height })), tam = tags(svg, "circle").filter((c) => +c.r === 7 && c.fill === "ink");
  const chuO = (r) => { const c = TX.filter((t) => close(+t.x, r.x + r.w / 2, 1e-6) && +t.y > r.y && +t.y < r.y + r.h); assert.equal(c.length, 1, "mỗi ô một chữ"); return c[0].t; };
  const hang = (nhan) => { const t = TX.find((x) => x.t === nhan); assert.ok(t, "nhãn " + nhan); const y = +t.y;
    const ds = o.filter((r) => r.y > y && r.y - y < 20).map((r) => ({ x: r.x, c: chuO(r) })).concat(tam.filter((c) => +c.cy > y && +c.cy - y < 30).map((c) => ({ x: +c.cx, c: "•" })));
    assert.ok(Math.max(...ds.map((d) => d.x)) + 30 <= 320, "NST nằm trong khung hình");
    return ds.sort((a, b) => a.x - b.x).map((d) => d.c).join(""); };
  return { truoc: hang("Trước đột biến"), sau: hang("Sau đột biến") };
};
// dạng đột biến cấu trúc NST: so chuỗi các đoạn trước và sau; trả về cả đoạn bị mất, lặp, đảo
const dangDotBien = (a, b) => {
  const bo = (s, i, k) => s.slice(0, i) + s.slice(i + k);
  for (let i = 0; i < a.length; i++) for (let k = 1; i + k <= a.length; k++) {
    const d = a.slice(i, i + k);
    if (!d.includes("•") && bo(a, i, k) === b) return { dang: "Mất đoạn", doan: d };
    if (!d.includes("•") && a.slice(0, i + k) + d + a.slice(i + k) === b) return { dang: "Lặp đoạn", doan: d };
    if (k > 1 && a.slice(0, i) + [...d].reverse().join("") + a.slice(i + k) === b) return { dang: "Đảo đoạn", doan: d };
  }
  return [...b].some((c) => !a.includes(c)) ? { dang: "Chuyển đoạn" } : null;
};

/* Dấu vết DNA: mỗi người một cột (tên ở trên, khung cột màu line), mỗi vạch là một hình chữ nhật tô ink cao 6. Trả về tên → các vị
   trí vạch (toạ độ y). */
const docADN = (svg) => {
  const TX = texts(svg), R = tags(svg, "rect").map((r) => Object.assign(box(r), { r }));
  const cot = R.filter((b) => b.r.stroke === "line"), vach = R.filter((b) => b.r.fill === "ink");
  assert.ok(vach.every((v) => v.h === 6), "vạch cao 6");
  const ten = {};
  cot.forEach((c) => { const n = TX.filter((t) => close(+t.x, c.x + c.w / 2) && +t.y < c.y); assert.equal(n.length, 1, "mỗi cột một tên ở trên");
    assert.ok(rongChu(n[0].t) <= c.w + 16, "tên cột không đè cột bên cạnh");
    const v = vach.filter((b) => b.x > c.x && b.x + b.w < c.x + c.w && b.y > c.y && b.y + b.h < c.y + c.h).map((b) => b.y);
    assert.equal(new Set(v).size, v.length, "vạch trong một cột không trùng nhau"); ten[n[0].t] = new Set(v); });
  assert.equal(sum(Object.values(ten).map((s) => s.size)), vach.length, "vạch nào cũng nằm trong một cột");
  // hai vạch khác vị trí thì cách nhau đủ xa để nhìn ra (≥ 12)
  const y = [...new Set(vach.map((b) => b.y))].sort((a, b) => a - b); y.forEach((v, i) => assert.ok(!i || v - y[i - 1] >= 12, "hai vị trí vạch quá gần: " + v));
  return ten;
};

/* ---------- hoá học: công thức (chữ số dưới dòng), khối lượng mol, phương trình ---------- */
const SUB = "₀₁₂₃₄₅₆₇₈₉";
const sub2n = (s) => [...s].map((c) => SUB.indexOf(c)).join("");
// "Al₂(SO₄)₃" → { Al: 2, S: 3, O: 12 }
const congThuc = (f) => {
  let i = 0;
  const doc = () => {
    const out = {};
    while (i < f.length && f[i] !== ")") {
      let part;
      if (f[i] === "(") { i++; part = doc(); assert.equal(f[i], ")", "thiếu ) trong " + f); i++; }
      else { const m = /^[A-Z][a-z]?/.exec(f.slice(i)); assert.ok(m, "không đọc được công thức " + f); i += m[0].length; part = { [m[0]]: 1 }; }
      let k = ""; while (i < f.length && SUB.includes(f[i])) k += f[i++];
      const n = k ? +sub2n(k) : 1;
      Object.entries(part).forEach(([e, c]) => (out[e] = (out[e] || 0) + c * n));
    }
    return out;
  };
  const r = doc(); assert.equal(i, f.length, "thừa chữ trong công thức " + f); return r;
};
const NTK = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, Si: 28, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 64, Zn: 65, Ag: 108 };
const KL = (f, nt = NTK) => Object.entries(congThuc(f)).reduce((s, [e, c]) => { assert.ok(e in nt, "thiếu nguyên tử khối của " + e); return s + nt[e] * c; }, 0);
const VE = /\d*\(?[A-Z][A-Za-z₀-₉()]*/.source, PT = new RegExp(`${VE}(?: \\+ ${VE})* (?:→|⇌) ${VE}(?: \\+ ${VE})*`, "g");
const ve = (s) => s.split(" + ").map((t) => { const m = /^(\d*)(\S+)$/.exec(t.trim()); return { k: m[1] ? +m[1] : 1, f: m[2] }; });
const tach = (pt) => pt.split(/ (?:→|⇌) /).map(ve);
const canBang = (pt) => { const dem = (v) => { const o = {}; v.forEach(({ k, f }) => Object.entries(congThuc(f)).forEach(([e, c]) => (o[e] = (o[e] || 0) + k * c))); return o; };
  const [a, b] = tach(pt).map(dem); return [...new Set([...Object.keys(a), ...Object.keys(b)])].every((e) => a[e] === b[e]); };
const heSo = (pt, f) => { const c = tach(pt).flat().filter((v) => v.f === f); assert.equal(c.length, 1, f + " có đúng một lần trong " + pt); return c[0].k; };
const molTheoPT = (pt, x, nx, y) => (nx * heSo(pt, y)) / heSo(pt, x);
const ptTrong = (s, x, y) => { const p = (s.match(PT) || []).filter((t) => tach(t).flat().some((v) => v.f === x) && tach(t).flat().some((v) => v.f === y));
  assert.equal(p.length, 1, "có đúng một phương trình chứa " + x + " và " + y); return p[0]; };
// nguyên tử khối đề cho: “(Cho Ca = 40, …)”; phải đúng bảng nguyên tử khối
const ntDe = (q) => { const m = /\(Cho ([^)]*)\)/.exec(q.q); assert.ok(m, "đề cho nguyên tử khối"); const nt = {};
  [...m[1].matchAll(/([A-Z][a-z]?) = ([\d,]+)/g)].forEach((k) => { nt[k[1]] = val(k[2]); assert.equal(nt[k[1]], NTK[k[1]], "nguyên tử khối của " + k[1]); }); return nt; };
/* Dãy hoạt động hoá học (Bài 19): kim loại mạnh hơn (trừ K, Na, Ca tác dụng với nước) đẩy được kim loại yếu hơn ra khỏi dung dịch muối. */
const DAY = ["K", "Na", "Ca", "Mg", "Al", "Zn", "Fe", "Pb", "H", "Cu", "Ag", "Au"];
const TEN_KL = { "kẽm": "Zn", "sắt": "Fe", "đồng": "Cu", "bạc": "Ag", "nhôm": "Al", "magnesium": "Mg" };
const kl = (ten) => { const k = TEN_KL[ten.toLowerCase()]; assert.ok(k, "tên kim loại lạ: " + ten); return k; };
const manhHon = (a, b) => DAY.indexOf(a) < DAY.indexOf(b);
const klMuoi = (f) => { const m = /^[A-Z][a-z]?/.exec(f); assert.ok(m && DAY.includes(m[0]), "muối của kim loại trong dãy: " + f); return m[0]; };
const phanUng = (M, X) => !["K", "Na", "Ca"].includes(M) && manhHon(M, klMuoi(X));

/* ---------- sinh học: bộ NST lưỡng bội của các loài dùng trong đề (đối chiếu sách, tài liệu sinh học phổ thông) ---------- */
const BO_NST = { "người": 46, "lợn": 38 };

/* ---------- các câu cần tính ----------
   id: đề chứa câu (de1, de2, own); has: đoạn chữ của đề; right(q): đáp án tính bằng code. */
const so = (q, re) => { const m = re.exec(q.q); assert.ok(m, "đề thiếu số liệu: " + re); return m.slice(1).map(val); };
const coX = (q, ...cum) => cum.forEach((c) => assert.ok(q.x.includes(c), "lời giải cần có “" + c + "”"));
const CHECKS = [
  /* ----- Vật lí ----- */
  { id: "de1", has: "tiết kiệm được bao nhiêu oát giờ", right: (q) => {
    const [U1, P1, U2, P2] = so(q, new RegExp(`bóng đèn sợi đốt ${SO} V – ${SO} W hoặc một bóng đèn LED ${SO} V – ${SO} W`)), [h, U] = so(q, new RegExp(`bật ${SO} giờ ở hiệu điện thế ${SO} V`));
    assert.ok(U === U1 && U === U2, "hai đèn dùng đúng hiệu điện thế ghi trên đèn"); coX(q, `${vn(P1)} − ${vn(P2)} = ${vn(P1 - P2)} (Wh)`); return (P1 - P2) * h; } },
  { id: "de1", has: "Trong 2 phút, dòng điện này đổi chiều", right: (q) => {
    const [f] = so(q, new RegExp(`tần số ${SO} Hz`)), [p] = so(q, new RegExp(`Trong ${SO} phút`)); coX(q, `2 · ${vn(f)} = ${vn(2 * f)} lần`); return 2 * f * p * 60; } },
  { id: "de1", has: "tấm pin mặt trời, mỗi tấm", right: (q) => {
    const [n, P] = so(q, new RegExp(`lắp ${SO} tấm pin mặt trời, mỗi tấm cho công suất điện ${SO} W`)), [h] = so(q, new RegExp(`mỗi ngày có ${SO} giờ nắng`)); return (n * P * h) / 1000; } },
  { id: "de2", has: "Hai bóng đèn sợi đốt Đ₁ ghi", right: (q) => {
    const [U1, P1, U2, P2, U] = so(q, new RegExp(`Đ₁ ghi ${SO} V – ${SO} W và Đ₂ ghi ${SO} V – ${SO} W cùng được mắc song song vào mạng điện ${SO} V`));
    assert.ok(U === U1 && U === U2 && P1 !== P2, "hai đèn dùng đúng hiệu điện thế định mức, công suất khác nhau");
    assert.ok(!close(P1 / U, P2 / U), "cường độ dòng điện qua hai đèn khác nhau (I = P : U)");
    const [lon, nho] = P2 > P1 ? ["Đ₂", "Đ₁"] : ["Đ₁", "Đ₂"]; return `${lon} có công suất lớn hơn nên sáng hơn ${nho}`; } },
  { id: "de2", has: "Trong 1 s, dòng điện này đổi chiều bao nhiêu lần", right: (q) => {
    const d = docXoayChieu(q.svg); coX(q, `cứ ${vn(d.nuaChuKi)} ms dòng điện đổi chiều một lần`, ...d.doiChieu.slice(0, 3).map((t) => vn(t) + " ms")); return 1000 / d.nuaChuKi; } },
  { id: "de2", has: "nhà máy thuỷ điện nhỏ chảy từ độ cao", right: (q) => {
    const [m, h] = so(q, new RegExp(`Mỗi giây có ${SO} kg nước của một nhà máy thuỷ điện nhỏ chảy từ độ cao ${SO} m`)), [H] = so(q, new RegExp(`Chỉ ${SO}% thế năng`)), [g] = so(q, new RegExp(`1 kg nước là ${SO} N`));
    const W = m * g * h; coX(q, `= ${vn(m * g)} (N)`, `= ${vn(W)} (J)`); return (W * H) / 100 / 1000; } },
  { id: "own", has: "Công suất điện của máy hút bụi", right: (q) => { const [t, W] = so(q, new RegExp(`liên tục trong ${SO} giờ thì tiêu thụ ${SO} kWh`)); coX(q, `${vn(W)} : ${vn(t)} = ${vn(W / t)} (kW)`); return (W / t) * 1000; } },
  { id: "own", has: "Tần số của dòng điện này là bao nhiêu héc", right: (q) => { const [n, t] = so(q, new RegExp(`đổi chiều ${SO} lần trong ${SO} s`)); coX(q, `${vn(n)} : ${vn(t)} = ${vn(n / t)} (lần)`); return n / t / 2; } },
  { id: "own", has: "Một tua-bin gió có công suất", right: (q) => { const [P] = so(q, new RegExp(`công suất ${SO} MW \\(1 MW = 1 000 kW\\)`)), [h] = so(q, new RegExp(`trong ${SO} giờ`)); return P * 1000 * h; } },
  /* ----- Hoá học ----- */
  { id: "de1", has: "Ngâm một chiếc đinh sắt sạch trong dung dịch copper(II) sulfate", right: (q) => {
    const pt = ptTrong(q.x, "Fe", "Cu"); assert.ok(canBang(pt) && phanUng("Fe", "CuSO₄"), "sắt đẩy được đồng ra khỏi dung dịch CuSO₄");
    const tan = heSo(pt, "Fe") * NTK.Fe, bam = heSo(pt, "Cu") * NTK.Cu; assert.ok(bam > tan, "khối lượng đồng bám vào lớn hơn khối lượng sắt tan ra");
    return `Tăng, vì cứ ${tan} g sắt tan ra thì có ${bam} g đồng bám lên đinh`; } },
  { id: "de1", has: "Đồng thau là hợp kim của đồng và kẽm", right: (q) => { const [p] = so(q, new RegExp(`có ${SO}% khối lượng là đồng`)), [m] = so(q, new RegExp(`luyện được ${SO} kg`)); return (m * (100 - p)) / 100; } },
  { id: "de1", has: "Nung 1 tấn đá vôi chứa", right: (q) => {
    const nt = ntDe(q), [p] = so(q, new RegExp(`chứa ${SO}% calcium carbonate`)), pt = ptTrong(q.q, "CaCO₃", "CaO"), m = (1000 * p) / 100;
    coX(q, `= ${vn(m)} (kg)`); return molTheoPT(pt, "CaCO₃", m / KL("CaCO₃", nt), "CaO") * KL("CaO", nt); } },
  { id: "de2", has: "Nhúng một sợi dây đồng vào dung dịch chứa", right: (q) => {
    const nt = ntDe(q), [m] = so(q, new RegExp(`chứa ${SO} g silver nitrate`)), pt = ptTrong(q.x, "Cu", "AgNO₃"), n = m / KL("AgNO₃", nt);
    assert.ok(phanUng("Cu", "AgNO₃"), "đồng đẩy được bạc"); assert.ok(/làm tròn kết quả đến chữ số thập phân thứ hai/.test(q.q) && q.tol, "làm tròn, có sai số tol");
    const tang = molTheoPT(pt, "AgNO₃", n, "Ag") * KL("Ag", nt) - molTheoPT(pt, "AgNO₃", n, "Cu") * KL("Cu", nt); return tron(tang); } },
  { id: "de2", has: "Cần bao nhiêu kilôgam SiO₂", right: (q) => {
    const nt = ntDe(q), [m] = so(q, new RegExp(`tạo ra ${SO} kg sodium silicate`)), pt = ptTrong(q.q, "SiO₂", "Na₂SiO₃");
    coX(q, `= ${vn(KL("Na₂SiO₃", nt))} (g/mol)`, `= ${vn(KL("SiO₂", nt))} (g/mol)`); return molTheoPT(pt, "Na₂SiO₃", (m * 1000) / KL("Na₂SiO₃", nt), "SiO₂") * KL("SiO₂", nt) / 1000; } },
  { id: "de2", has: "Một lò nung đốt cháy hoàn toàn", right: (q) => { const [qq] = so(q, new RegExp(`1 g khí methane toả ra khoảng ${SO} kJ`)), [m] = so(q, new RegExp(`hoàn toàn ${SO} kg methane`)); return m * 1000 * qq; } },
  { id: "own", has: "Dung dịch zinc sulfate (ZnSO₄) có lẫn", right: (q) => {
    // lấy dư kim loại M: CuSO₄ hết nếu M đẩy được đồng; dung dịch còn lại chỉ có ZnSO₄ khi M không tạo muối mới và không làm mất ZnSO₄
    const sach = q.o.filter((o) => { const M = kl(o); if (!phanUng(M, "CuSO₄")) return false; return M === "Zn" || (!phanUng(M, "ZnSO₄") && M !== "Zn" && false); });
    assert.equal(sach.length, 1, "đúng một kim loại làm sạch được dung dịch"); assert.ok(phanUng("Fe", "CuSO₄") && !phanUng("Fe", "ZnSO₄"), "sắt đẩy được đồng nhưng tạo muối sắt");
    const pt = ptTrong(q.x, "Zn", "CuSO₄"); assert.ok(canBang(pt)); return sach[0]; } },
  { id: "own", has: "Khối sắt nặng hơn khối lưu huỳnh", right: (q) => {
    const [dS, dFe] = so(q, new RegExp(`lưu huỳnh có khối lượng riêng khoảng ${SO} g/cm³, sắt có khối lượng riêng khoảng ${SO} g/cm³`)), [V] = so(q, new RegExp(`cùng thể tích ${SO} cm³`));
    assert.ok(dS < dFe, "phi kim có khối lượng riêng nhỏ hơn kim loại"); coX(q, `${vn(dFe)} · ${vn(V)} = ${vn(dFe * V)} (g)`, `${vn(dS)} · ${vn(V)} = ${vn(dS * V)} (g)`); return tron((dFe - dS) * V, 6); } },
  { id: "de2", has: "Phần trăm khối lượng của silicon trong SiO₂", right: (q) => {
    const nt = ntDe(q); assert.ok(/làm tròn kết quả đến chữ số thập phân thứ hai/.test(q.q) && q.tol, "làm tròn, có sai số tol"); coX(q, `= ${vn(KL("SiO₂", nt))} (g/mol)`);
    return tron((nt.Si / KL("SiO₂", nt)) * 100); } },
  { id: "own", has: "clanhke với thạch cao", right: (q) => { const [c] = so(q, new RegExp(`nghiền ${SO} kg clanhke`)), [p] = so(q, new RegExp(`thạch cao chiếm ${SO}% khối lượng`)), xm = (c * 100) / (100 - p);
    coX(q, `= ${vn(xm)} (kg)`); return xm - c; } },
  { id: "de1", has: "Mũi tên nào ứng với sự quang hợp", right: (q) => {
    const mt = docChuTrinh(q.svg), ten = (s) => mt.find((m) => m.so === s);
    const qh = mt.filter((m) => m.tu === "Khí quyển (CO₂)" && m.den === "Cây xanh"); assert.equal(qh.length, 1, "đúng một mũi tên từ khí quyển đến cây xanh");
    // lời giải gọi đúng các mũi tên còn lại
    [["(2)", "Cây xanh", "Khí quyển (CO₂)", "hô hấp của cây"], ["(3)", "Động vật", "Khí quyển (CO₂)", "hô hấp của động vật"], ["(4)", "Xe, nhà máy", "Khí quyển (CO₂)", "đốt nhiên liệu"]].forEach(([s, a, b, c]) => {
      assert.ok(ten(s) && ten(s).tu === a && ten(s).den === b, "mũi tên " + s + " đi từ " + a + " đến " + b); coX(q, s, c); });
    assert.ok(q.o.every((o) => mt.some((m) => m.so === o)), "lựa chọn là số của mũi tên trong hình"); return qh[0].so; } },
  /* ----- Sinh học ----- */
  { id: "de1", has: "giờ mỗi tế bào lại nguyên phân một lần", right: (q) => {
    const [p] = so(q, new RegExp(`cứ ${SO} giờ`)), [n0] = so(q, new RegExp(`Ban đầu bình có ${SO} tế bào`)), [d] = so(q, new RegExp(`Sau ${SO} ngày`)), k = (d * 24) / p;
    assert.ok(Number.isInteger(k)); coX(q, `= ${k} lần`); return n0 * 2 ** k; } },
  { id: "de1", has: "hàng dưới là chính NST đó sau đột biến", right: (q) => {
    const n = docNST(q.svg), d = dangDotBien(n.truoc, n.sau); assert.ok(d && (n.truoc.match(/•/g) || []).length === 1, "đọc được NST");
    assert.equal(d.dang, "Lặp đoạn"); const doan = [...d.doan].join(", "); coX(q, "đoạn " + doan + " xuất hiện hai lần");
    return `Đây là lặp đoạn, số bản sao các gene trên đoạn ${doan} tăng lên`; } },
  { id: "de1", has: "so sánh dấu vết DNA của một người mẹ", right: (q) => {
    const t = docADN(q.svg), me = t["Mẹ"], con = t["Con"], bo = [...con].filter((y) => !me.has(y));
    assert.ok(bo.length >= 2 && [...con].some((y) => me.has(y)), "con có vạch của mẹ và vạch của bố");
    const ung = Object.keys(t).filter((k) => /^Ông /.test(k)), duoc = ung.filter((k) => bo.every((y) => t[k].has(y)));
    assert.equal(ung.length, 3); assert.equal(duoc.length, 1, "đúng một người có thể là bố");
    // lời giải: số vạch thiếu của từng người còn lại
    ung.filter((k) => k !== duoc[0]).forEach((k) => { const thieu = bo.filter((y) => !t[k].has(y)).length, c = `${k} thiếu ${["", "một", "hai", "ba"][thieu]} vạch`;
      assert.ok(q.x.toLowerCase().includes(c.toLowerCase()), "lời giải cần có “" + c + "”"); });
    return duoc[0]; } },
  { id: "own", has: "một tế bào da nguyên phân liên tiếp", right: (q) => {
    const [n2] = so(q, /lợn \(2n = (\d+)\)/), [k] = so(q, /nguyên phân liên tiếp (\d+) lần/); assert.equal(n2, BO_NST["lợn"]);
    const np = 2 ** k * n2, gp = 4 * (n2 / 2); coX(q, `= ${vn(np)} (NST)`, `4 · ${n2 / 2} = ${vn(gp)} (NST)`); return np - gp; } }
];

let n = 0;
const daKiem = new Set();
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.q.includes(c.has));
  assert.equal(m.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${m.length}`);
  const q = m[0], at = c.id + ": " + c.has;
  assert.equal(q.src, S[c.id], at + ": câu nằm ở đề " + q.src);
  try {
    const want = c.right(q), got = q.type === "num" ? q.ans : q.type === "tf4" ? q.a : q.o[0];
    if (q.type === "num") assert.ok(close(got, want, 1e-9), "đáp án " + got + ", tính được " + want);
    else assert.strictEqual(JSON.stringify(got), JSON.stringify(want), "đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
    if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), "nhiễu trùng đáp án đúng");
  } catch (e) { e.message = at + ": " + e.message; throw e; }
  daKiem.add(q); n++;
});
// câu trả lời bằng số và câu có hình nào cũng phải được tính lại, đọc lại ở trên
kho.filter((q) => q.svg || q.type === "num").forEach((q) => assert.ok(daKiem.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
// bộ đọc hình tự thử với hình cố ý vẽ sai
{
  const hinh = (has) => kho.find((q) => q.q.includes(has)).svg;
  const xc = hinh("Trong 1 s, dòng điện này đổi chiều"), ct = hinh("ứng với sự quang hợp"), adn = hinh("dấu vết DNA"), nst = hinh("hàng dưới là chính NST đó sau đột biến");
  assert.throws(() => docXoayChieu(xc.replace(/<text x="160" y="182"[^>]*>40<\/text>/, '<text x="160" y="182" text-anchor="middle">45</text>')), /cách đều/, "số ghi thời gian sai thì báo");
  assert.throws(() => docXoayChieu(xc.replace(/<line x1="160" y1="26"[^>]*>/, "")), /vạch lưới/, "thiếu vạch lưới thì báo");
  assert.throws(() => docChuTrinh(ct.replace('<text x="116" y="64"', '<text x="100" y="74"')), /không đè lên thân/, "số đè lên thân mũi tên thì báo");
  assert.throws(() => docChuTrinh(ct.replace(/<line x1="204" y1="130" x2="[\d.]+" y2="[\d.]+"/, '<line x1="204" y1="130" x2="150" y2="210"')), /đầu mũi tên/, "thân không nối với đầu mũi tên thì báo");
  const t = docADN(adn); assert.ok(t["Ông B"].has(152) && !t["Ông A"].has(152));
  assert.throws(() => docADN(adn.replace(/(<rect x="\d+" y=")120(" width="32")/, "$1128$2")), /quá gần/, "hai vạch quá gần thì báo");
  assert.deepEqual(dangDotBien("ABC•DE", "ABBC•DE"), { dang: "Lặp đoạn", doan: "B" }); assert.equal(dangDotBien("ABCD•E", "ADCB•E").dang, "Đảo đoạn");
  assert.equal(dangDotBien(docNST(nst).truoc, "PQR•SU").dang, "Mất đoạn");
}
// bộ NST của các loài trong đề đúng như bảng
kho.forEach((q) => chu(q).forEach((s) => [...s.matchAll(/(người|lợn)(?: bình thường)? (?:\(2n = (\d+)\)|có 2n = (\d+))/g)].forEach((m) => assert.equal(+(m[2] || m[3]), BO_NST[m[1]], "bộ NST của " + m[1]))));

/* ---------- chữ ---------- */
function chu(q) { return [q.q, q.x].concat(q.o || [], q.unit || []).map(String); }
const PHAM_VI = { "Vật lí": "Bài 11–17", "Hoá học": "Bài 18–21 và Bài 33–35", "Sinh học": "Bài 42–51" };
// 18 chủ đề theo thứ tự bài của sách: [chữ chủ đề, bài, phân môn, ôn (phần giữa kì II)]
const CHU_DE = [["Năng lượng của dòng điện và công suất điện", 13, "Vật lí", true], ["Cảm ứng điện từ. Nguyên tắc tạo ra dòng điện xoay chiều", 14, "Vật lí"],
  ["Tác dụng của dòng điện xoay chiều", 15, "Vật lí"], ["Vòng năng lượng trên Trái Đất. Năng lượng hoá thạch", 16, "Vật lí"], ["Một số dạng năng lượng tái tạo", 17, "Vật lí"],
  ["Dãy hoạt động hoá học", 19, "Hoá học", true], ["Tách kim loại và việc sử dụng hợp kim", 20, "Hoá học", true],
  ["Sự khác nhau cơ bản giữa phi kim và kim loại", 21, "Hoá học", true],
  ["Hoá học vỏ Trái Đất và khai thác tài nguyên từ vỏ Trái Đất", 33, "Hoá học"], ["Khai thác đá vôi. Công nghiệp silicate", 34, "Hoá học"],
  ["Nhiên liệu hoá thạch. Chu trình carbon và sự ấm lên toàn cầu", 35, "Hoá học"], ["Nguyên phân và giảm phân", 43, "Sinh học", true],
  ["Đột biến nhiễm sắc thể", 46, "Sinh học", true], ["Di truyền học với con người", 47, "Sinh học"], ["Ứng dụng công nghệ di truyền vào đời sống", 48, "Sinh học"],
  ["Khái niệm tiến hoá và các hình thức chọn lọc", 49, "Sinh học"], ["Cơ chế tiến hoá", 50, "Sinh học"], ["Sự phát sinh và phát triển sự sống trên Trái Đất", 51, "Sinh học"]];
const monCua = (t) => CHU_DE.find((c) => c[0] === t)[2], onCua = (t) => !!CHU_DE.find((c) => c[0] === t)[3];
kho.forEach((q) => {
  const at = q.src + ": " + q.q.slice(0, 50);
  chu(q).forEach((s) => {
    // công thức hoá học viết bằng chữ số dưới dòng (CaCO₃, Đ₁), không viết CaCO3
    assert.ok(!/(?:^|[^A-Za-z])(?:[A-Z][a-z]?)+\d/.test(s.replace(/\d+(?:,\d+)? (?:mL|mol|g|L|kg|V|A|W|J|Ω|m)\b/g, "")), at + ": công thức cần chữ số dưới dòng: " + s);
    // tên chất như sách (calcium carbonate, silver nitrate, sodium silicate…), không dùng tên kiểu cũ
    assert.ok(!/(?<![\p{L}])(?:axit|oxi|oxit|hiđro|hidro|cacbon|clo|clorua|nitơ|photpho|silic|silicat|sunfat|sunfua|nitrat|cacbonat|magie|canxi|natri cacbonat|bazơ|hiđroxit|hidroxit|metan|etanol|đioxit|xenlulozơ)(?![\p{L}])/iu.test(s), at + ": tên chất, thuật ngữ khác sách: " + s);
    // dấu thanh kiểu cũ như sách (hoá, thuỷ, toả, huỷ, tuỳ, hoà, khoẻ, hoạ, luỹ)
    assert.ok(!/(?<![\p{L}])(?:hóa|hòa|thủy|tỏa|hủy|tùy|khỏe|họa|lũy)(?![\p{L}])/iu.test(s), at + ": dấu thanh kiểu mới: " + s);
    // số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân
    assert.ok(!/\d{4,}/.test(s) && !/\d\.\d/.test(s), at + ": số viết sai cách: " + s);
  });
});
// mọi phương trình hoá học trong câu Hoá học phải cân bằng; mũi tên trong câu Hoá học chỉ dùng trong phương trình
let soPT = 0;
kho.filter((q) => monCua(q.topic) === "Hoá học").forEach((q) => chu(q).forEach((s) => {
  (s.match(PT) || []).forEach((pt) => { assert.ok(canBang(pt), "phương trình chưa cân bằng: " + pt); soPT++; });
  assert.ok(!/→|⇌/.test(s.replace(PT, "")), "mũi tên ngoài phương trình: " + s);
}));
assert.ok(soPT > 0, "có phương trình hoá học");
assert.ok(canBang("Na₂CO₃ + SiO₂ → Na₂SiO₃ + CO₂") && canBang("Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag") && !canBang("Cu + AgNO₃ → Cu(NO₃)₂ + Ag") && !canBang("CaCO₃ → CaO + O₂"));
assert.equal(KL("Na₂SiO₃"), 122); assert.equal(KL("AgNO₃"), 170); assert.equal(KL("CaCO₃"), 100);
// câu Vật lí, Sinh học không có phương trình hoá học, mũi tên
kho.filter((q) => monCua(q.topic) !== "Hoá học").forEach((q) => chu(q).forEach((s) => assert.ok(!/→|⇌/.test(s), "mũi tên trong câu " + monCua(q.topic) + ": " + s)));

/* ---------- mức độ, ma trận, phân môn, phần ôn ---------- */
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const M = pool.pool.matrix, cells = Object.values(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), pool.n, "tổng ma trận bằng n");
assert.ok(cells.every((v) => v.every((k) => k <= 1)), "ô nào cũng rút nhiều nhất 1 câu");
assert.deepEqual(Object.keys(M), CHU_DE.map((c) => c[0]), "chủ đề theo thứ tự bài của sách");
[S.de1, S.de2, S.own].forEach((id) => assert.deepEqual([...new Set(kho.filter((q) => q.src === id).map((q) => q.topic))], Object.keys(M), id + ": đủ chủ đề, đúng thứ tự"));
[S.de1, S.de2, S.own].forEach((id) => Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => kho.filter((q) => q.src === id && q.topic === t && q.lv === l).length), v, id + " đúng ma trận ở chủ đề " + t)));
// phần ôn mang đúng chữ chủ đề của kho giữa kì II; phần sau giữa kì II (trọng tâm) chiếm phần lớn đề
const gk2M = gk2.pool.matrix;
CHU_DE.forEach(([t, , , on]) => assert.equal(t in gk2M, !!on, (on ? "chủ đề ôn phải có ở kho giữa kì II: " : "chủ đề mới không trùng chữ chủ đề của kho giữa kì II: ") + t));
const soOn = sum(Object.entries(M).filter(([t]) => onCua(t)).map(([, v]) => sum(v)));
assert.ok(soOn * 4 <= pool.n && soOn >= 3, "phần ôn khoảng một phần năm số câu, phần sau giữa kì II là trọng tâm: " + soOn + " câu ôn");
// số câu mỗi phân môn đúng như lời dặn của đề
const theoMon = Object.keys(PHAM_VI).map((m) => [m, sum(Object.entries(M).filter(([t]) => monCua(t) === m).map(([, v]) => sum(v)))]);
[S.de1, S.de2].forEach((id) => {
  theoMon.forEach(([m, k]) => assert.ok(new RegExp(`${m} ${PHAM_VI[m]} \\([^)]*\\) ${k} câu`).test(bank(id).note), id + ": lời dặn ghi " + m + " " + k + " câu"));
  assert.ok(bank(id).note.includes(`${pool.n - soOn} câu phần sau giữa kì II, ${soOn} câu ôn phần giữa kì II (Bài ${CHU_DE.filter((c) => c[3]).map((c) => c[1]).join(", ")})`), id + ": lời dặn ghi số câu ôn và các bài ôn");
});
assert.ok(bank(S.own).note.includes("mỗi lần rút " + theoMon.map(([m, k]) => k + " câu " + m).join(", ")), "lời dặn của đề ngẫu nhiên ghi số câu mỗi phân môn");
theoMon.forEach(([m]) => assert.ok(bank(S.own).note.includes(`${m} ${PHAM_VI[m]}`), "lời dặn của đề ngẫu nhiên ghi phạm vi " + m));
// đề cuối năm lớp 9: lời dặn nhắc đề chung của Sở (Thông tư 89/2026); phạm vi KHTN của kì thi khớp lời dặn
[S.de1, S.de2, S.own].forEach((id) => assert.ok(/Sở GD&ĐT ra đề chung cuối kì một số môn lớp 9/.test(bank(id).note), id + ": lời dặn nhắc đề chung của Sở"));
{
  const ctxL = vm.createContext({ window: {} }); vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ctxL);
  const e = ctxL.window.ONTAP_SEED_EVENTS.find((x) => x.id === "ck2-l9");
  assert.ok(Object.values(S).every((id) => e.banks.includes(id)), "ba đề gắn vào ck2-l9");
  assert.ok(e.scope.includes("KHTN: " + Object.keys(PHAM_VI).map((m) => `${m} ${PHAM_VI[m]}`).join(", ")), "phạm vi KHTN của ck2-l9 khớp lời dặn");
}

/* ---------- dạng câu ---------- */
assert.ok(kho.every((q) => ["mc", "tf4", "num"].includes(q.type)), "chỉ dùng dạng câu của khung Công văn 7991, không có tự luận");
[S.de1, S.de2, S.own].forEach((id) => {
  const qs = kho.filter((q) => q.src === id);
  assert.equal(qs.filter((q) => q.type === "tf4").length, 4, id + ": 4 câu đúng/sai 4 ý");
  assert.equal(qs.filter((q) => q.type === "num").length, 6, id + ": 6 câu trả lời bằng số");
});
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(q.o.length === 4 && /Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.ok(Math.max(...Object.values(kieu)) === 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
// lời giải không nói “ý thứ hai”, “phương án A”, “cách thứ hai”: app xáo phương án (ý của câu đúng/sai giữ thứ tự a, b, c, d)
kho.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn|cách|câu) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của phương án: " + q.q.slice(0, 50)));
// câu số không nguyên dặn làm tròn đến chữ số thập phân thứ hai (phần Đáp án của app ghi hai chữ số)
kho.filter((q) => q.type === "num" && !Number.isInteger(q.ans * 10)).forEach((q) => assert.ok(/làm tròn kết quả đến chữ số thập phân thứ hai/i.test(q.q), "dặn làm tròn: " + q.q.slice(0, 50)));
kho.filter((q) => q.type === "num").forEach((q) => assert.ok(q.unit && q.unit.length <= 6, "câu số có đơn vị ngắn: " + q.q.slice(0, 50)));
const chuThuong = (s) => String(s).normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean);
kho.filter((q) => q.type === "mc").forEach((q) => {
  // đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2); các lựa chọn không trùng nhau
  const m = Math.max(...q.o.slice(1).map((o) => o.length));
  assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + q.q.slice(0, 50));
  assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + q.q.slice(0, 50));
  // đáp án đúng không phải lựa chọn duy nhất có chữ của nhãn chủ đề (Rút ra N6)
  const c = chuThuong(q.topic), tu = c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số|từ)( |$)/u.test(w));
  tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); assert.ok(!(co[0] && !co.slice(1).some(Boolean)), `chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề: ${q.q.slice(0, 60)}`); });
  // ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có (Rút ra N22)
  const dau = q.o.map((o) => o.split(" ")[0]);
  assert.ok(!(q.o.length === 4 && dau.slice(1).every((d) => d === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1), "ba lựa chọn sai cùng mở đầu bằng “" + dau[1] + "”: " + q.q.slice(0, 50));
});
// đáp án đúng là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn (Rút ra N9-gk2-van); câu chọn số
// của mũi tên (các lựa chọn dài bằng nhau) không tính
{
  const mc4 = kho.filter((q) => q.type === "mc" && q.o.length === 4 && new Set(q.o.map((o) => o.length)).size > 1);
  const le = mc4.filter((q) => { const L = q.o.map((o) => o.length); return L[0] > Math.max(...L.slice(1)) || L[0] < Math.min(...L.slice(1)); });
  assert.ok(le.length * 3 <= mc4.length, `đáp án đúng dài nhất hoặc ngắn nhất ở ${le.length}/${mc4.length} câu`);
}

/* ---------- phần ôn không trùng câu cùng chủ đề của kho giữa kì II ---------- */
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const tuThuong = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const chuoiTu = (s, k) => { const w = tuThuong(s), r = []; for (let i = 0; i + k <= w.length; i++) r.push(w.slice(i, i + k).join(" ")); return r; };
{
  const cu = gk2.questions, baoGk2 = [];
  kho.filter((q) => onCua(q.topic)).forEach((q) => cu.filter((p) => p.topic === q.topic).forEach((p) => {
    const at = q.src + " ~ " + p.src + ": ";
    assert.notEqual(goc(q.q), goc(p.q), at + "đề bài trùng câu của kho giữa kì II");
    const c6 = chuoiTu(q.q, 6).filter((c) => (" " + tuThuong(p.q).join(" ") + " ").includes(" " + c + " "));
    assert.deepEqual(c6, [], at + "đề bài có chuỗi 6 từ trùng câu của kho giữa kì II: " + c6.join(" | "));
    if (q.type === "mc" && p.type === "mc") assert.notEqual(goc(q.o[0]), goc(p.o[0]), at + "đáp án trùng câu của kho giữa kì II");
    if (q.type === "num" && p.type === "num") assert.ok(!(close(q.ans, p.ans) && q.unit === p.unit), at + "đáp án số trùng câu của kho giữa kì II");
    chuoiTu(q.q, 5).filter((c) => (" " + tuThuong(p.q).join(" ") + " ").includes(" " + c + " ")).forEach((c) => baoGk2.push(at + c));
  }));
  if (process.env.DO_GK2) console.log("Chuỗi 5 từ của đề bài câu ôn có ở câu cùng chủ đề của kho giữa kì II (xem tay):\n" + [...new Set(baoGk2)].join("\n"));
}

/* ---------- rút thử ---------- */
const thu = (hist) => {
  const d = Quiz.draw(pool, hist);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, pool.n);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.topic === t && q.lv === l).length), v, "rút đúng ma trận ở chủ đề " + t));
  return d;
};
const seen = new Set();
for (let k = 0; k < 400; k++) thu().questions.forEach((q) => seen.add(Quiz.key(q)));
assert.ok(mine.every((q) => seen.has(Quiz.key(q))), "400 lần rút thử phải gặp đủ các câu riêng");
// học sinh đã làm hết một đề cố định: lần rút sau không lấy lại câu của đề đó
pool.pool.from.forEach((id) => { const done = new Set(bank(id).questions.map(Quiz.key)); for (let k = 0; k < 30; k++) thu((q) => ({ done: done.has(Quiz.key(q)) ? 1 : 0, wrong: 0 })).questions.forEach((q) => assert.ok(!done.has(Quiz.key(q)), "đã làm hết " + id + " mà vẫn gặp lại câu của đề đó")); });

/* ---------- đề bài không trùng câu nào khác trong data/banks/9-khtn.js (Rút ra N8) ---------- */
{
  const deBai = BANKS.filter((b) => b.file === "9-khtn.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q) })));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
}

/* ---------- dò lộ đáp án giữa hai câu rút được cùng lúc (khác ô (chủ đề, mức); ô nào cũng chỉ rút 1 câu) ----------
   Đáp án là số (từ hai chữ số, hoặc số thập phân) tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”, “bằng”, “được”): không được có.
   Đáp án bằng chữ (lựa chọn đúng) tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy cả đáp án, Rút ra N19); chuỗi
   có trong đề bài, lựa chọn, lời giải của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM. Đáp án là số của mũi
   tên trong hình (“(1)”) không dò bằng chữ. */
const ten = new Map();
[S.de1, S.de2, S.own].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, (id === S.own ? "own" : id.slice(-3)) + "#" + (i + 1))));
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
const cungLuc = (p, q) => p !== q && (p.topic !== q.topic || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2);
// cụm chung của môn, có ở nhiều câu: không tính là lộ đáp án
const CUM_CHUNG = ["dòng điện xoay chiều", "hiệu điện thế", "khí quyển co₂", "năng lượng mặt trời"];
const cum = (s) => { const w = tuThuong(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r.filter((c) => !CUM_CHUNG.includes(c)); };
const doLo = (qs, tenCau = (q) => ten.get(q)) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    const soDa = q.type === "num" && (q.ans >= 10 || !Number.isInteger(q.ans)) ? [q.ans] : [], C = q.type === "mc" && !/^\(\d\)$/.test(q.o[0]) ? [...new Set(cum(q.o[0]))] : [];
    qs.forEach((p) => {
      if (!cungLuc(p, q)) return;
      const at = `${tenCau(p)} → ${tenCau(q)}: `, T = " " + chu(p).map((s) => tuThuong(s).join(" ")).join(" | ") + " ";
      soDa.filter((x) => chu(p).flatMap(soKQ).some((y) => close(x, y))).forEach((x) => lo.push(at + x));
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
const { lo, chuLo } = doLo(kho);
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuLo.join("\n"));
// đã xem (Phiên N9-ck2-khtn): chữ chung hoặc chữ của lựa chọn sai, câu kia không nói tới điều câu này hỏi. “kẽm”: câu đồng thau
// (đồng và kẽm) không nói gì về kim loại làm sạch dung dịch ZnSO₄; “tua bin gió”: câu tính điện năng của tua-bin gió (câu này hỏi
// nhược điểm của điện gió); “oxygen”: ý sai “nung đá vôi tạo khí oxygen” và lựa chọn sai “lượng oxygen tăng gấp đôi” (câu này hỏi
// nguyên tố nhiều nhất trong vỏ Trái Đất); “có công suất”, “khối lượng lớn”, “ở nhiệt độ”: chữ chung (tua-bin có công suất 3 MW,
// chiếm phần trăm khối lượng lớn nhất, ở nhiệt độ thường).
const DA_XEM = [
  "de1#10 → own#9: kẽm", "own#8 → de1#7: tua bin gió", "own#15 → de1#12: oxygen", "own#17 → de1#12: oxygen", "own#8 → de2#1: có công suất",
  "de1#12 → de2#6: khối lượng lớn", "own#11 → de2#10: ở nhiệt độ", "own#15 → de2#10: ở nhiệt độ", "de2#11 → de2#10: ở nhiệt độ"
];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 750”, cụm của đáp án bằng chữ
{
  const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x }), khac = tim("Hội chứng Down ở người");
  const thuLo = (qs) => { const r = doLo(qs, (q) => q.q.slice(0, 12)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  assert.deepEqual(thuLo([tim("máy hút bụi"), gia(khac, "Ví dụ P = 750 W.")]), ["750"]);
  assert.deepEqual(thuLo([tim("thằn lằn"), tim("được hình thành như thế nào")]), []);
  assert.deepEqual(thuLo([tim("chủ yếu được tạo ra nhờ quá trình nào"), gia(khac, "Đó là chọn lọc nhân tạo.")]), ["chọn lọc nhân", "lọc nhân tạo"]);
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
// cụm từ chung của môn (lời dặn làm tròn) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ (bỏ qua chuỗi toàn kí
// hiệu, số)
const TU_CHUNG = ["làm tròn kết quả đến chữ số thập phân thứ hai"].map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
if (SACH.length) {
  assert.ok(SACH.some((f) => /khoa-hoc-tu-nhien-9/.test(f)), "OnUp-Book có Khoa học tự nhiên 9");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · trang in \d+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => chu(q).flatMap((s) => chuoi(s, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi từ liền nhau trùng câu của kho khác ---------- */
{
  // mọi câu của các kho khác: đề cố định và câu riêng của đề ngẫu nhiên (câu riêng ghi src là mã đề ngẫu nhiên)
  const khac = BANKS.filter((b) => !/^khtn9-ck2-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ id: b.id, s: " " + chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại hoặc đọc lại hình (" + soPT + " phương trình hoá học cân bằng); kho " + kho.length + " câu (" + mine.length + " câu riêng), ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề (" + soOn + " câu ôn): " + theoMon.map(([m, k]) => m + " " + k).join(", ") + ".");
console.log("MATH OK");
