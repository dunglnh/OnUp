// Tính lại đáp án ngân hàng KHTN 6 cuối năm (data/banks/6-khtn.js): hai đề cố định khtn6-ck2-de1, khtn6-ck2-de2 và các câu riêng
// của đề ngẫu nhiên khtn6-ck2-ngau-nhien (Phiên N21), theo mẫu tests/khtn6-ck1.js, tests/khtn6-gk2.js. Câu có phép tính hoặc có hình
// được nhận ra bằng một đoạn chữ của đề (has, đúng một câu trong kho, đúng đề ghi ở src); so đáp án với kết quả tính bằng code: trả
// lời bằng số ans, trắc nghiệm o[0], sắp xếp o, đúng/sai 4 ý a. Câu có hình đọc lại hình: mũi tên lực (gốc là chấm tròn, ngọn là đỉnh
// tam giác, độ dài so với đoạn tỉ xích có ghi số niutơn, các vạch chia trên mũi tên cách đều nhau), lò xo cạnh thước (số trên thước,
// đầu dưới của lò xo, số quả nặng treo vào), sơ đồ năng lượng của máy xay (mũi tên vào, ra và số jun ghi bên cạnh), hình dạng Mặt
// Trăng (nửa nào tô màu sáng), Mặt Trời và tám hành tinh (số ghi trên từng hành tinh theo khoảng cách đến Mặt Trời). Câu trả lời bằng
// số và câu có hình nào trong kho cũng phải có kiểm tra ở đây.
// Rồi kiểm tra mức độ và ma trận như tests/khtn6-gk2.js: mọi câu có lv, 12 chủ đề đúng thứ tự bài trong sách, cả hai đề cố định và
// 25 câu riêng chia đúng ma trận (ô nào cũng có gấp ba số câu ô đó rút), rút thử nhiều lần ra đúng 10 Biết, 8 Hiểu, 7 Vận dụng và gặp
// đủ các câu riêng; học sinh đã làm hết Đề 1 hoặc Đề 2 vẫn rút được 25 câu chưa làm. Cuối cùng: đề bài không trùng câu nào khác trong
// data/banks/6-khtn.js và dò lộ đáp án giữa các câu rút được cùng lúc (Rút ra N5; bộ dò theo tests/toan6-ck2.js): đáp án bằng số ở
// vị trí kết quả của câu kia, cặp nối có cả hai vế ở câu kia, thứ tự của câu sắp xếp có ở câu kia; đáp án bằng chữ có ở câu kia thì
// in ra khi chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM.
// Chạy: node tests/khtn6-ck2.js → in MATH OK.
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "khtn6-ck2-ngau-nhien", DE1 = "khtn6-ck2-de1", DE2 = "khtn6-ck2-de2";

/* ---------- số ---------- */
const val = (s) => +String(s).replace(/\s/g, "").replace(/−/g, "-").replace(",", "."); // "4 343,5" → 4343.5
const close = (x, y) => Math.abs(x - y) < 1e-9;

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const ends = (l) => [[num(l, "x1"), num(l, "y1")], [num(l, "x2"), num(l, "y2")]];
const same = (p, q) => close(p[0], q[0]) && close(p[1], q[1]);
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);

/* Mũi tên lực: đoạn tỉ xích là đoạn nằm ngang màu ink, ghi “<số> N” bên cạnh; mỗi mũi tên gồm chấm tròn ở gốc, thân là đoạn thẳng nét
   3 màu bad, đầu là tam giác màu bad (điểm đầu tiên là ngọn), vạch chia là các đoạn ngắn nét 1,5 cắt ngang thân. Trả về giá trị của
   đoạn tỉ xích và từng mũi tên: chữ ghi gần gốc, hướng, số khoảng chia, độ lớn lực. */
const docMuiTen = (svg) => {
  const ghi = texts(svg).filter((t) => /^\d+ N$/.test(t.t));
  assert.equal(ghi.length, 1, "cần đúng một đoạn tỉ xích ghi số niutơn");
  const tiXich = tags(svg, "line").filter((l) => l.stroke === "ink" && num(l, "y1") === num(l, "y2") && Math.abs(num(l, "x2") - num(l, "x1")) >= 20);
  assert.equal(tiXich.length, 1, "cần đúng một đoạn tỉ xích");
  const u = Math.abs(num(tiXich[0], "x2") - num(tiXich[0], "x1")), N = parseInt(ghi[0].t);
  const goc = tags(svg, "circle").filter((c) => c.fill === "bad").map((c) => [num(c, "cx"), num(c, "cy")]);
  const dau = tags(svg, "polygon").filter((p) => p.fill === "bad").map((p) => pts(p.points));
  const than = tags(svg, "line").filter((l) => l.stroke === "bad" && l["stroke-width"] === "3").map(ends);
  const vach = tags(svg, "line").filter((l) => l.stroke === "bad" && l["stroke-width"] === "1.5").map(ends).map(([a, b]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]);
  assert.ok(goc.length === dau.length && goc.length === than.length, "mỗi mũi tên có đúng một gốc, một thân, một đầu");
  const chu = texts(svg).filter((t) => /^[a-z]$/.test(t.t)).map((t) => ({ t: t.t, p: [+t.x, +t.y - 5] }));
  let dungVach = 0;
  const ra = dau.map(([ngon, b1, b2]) => {
    const giua = [(b1[0] + b2[0]) / 2, (b1[1] + b2[1]) / 2], t = than.find(([a, b]) => same(a, giua) || same(b, giua));
    assert.ok(t, "mũi tên thiếu thân");
    const g = same(t[0], giua) ? t[1] : t[0];
    assert.ok(goc.some((c) => same(c, g)), "gốc mũi tên cần chấm tròn");
    const dx = ngon[0] - g[0], dy = ngon[1] - g[1], len = Math.abs(dx) + Math.abs(dy);
    assert.ok(dx === 0 || dy === 0, "mũi tên nằm ngang hoặc thẳng đứng");
    assert.ok(len % u === 0, "mũi tên dài một số nguyên lần đoạn tỉ xích");
    const tren = vach.filter((m) => (dy === 0 ? close(m[1], g[1]) && (m[0] - g[0]) * Math.sign(dx) > 0 && (m[0] - g[0]) * Math.sign(dx) < len : close(m[0], g[0]) && (m[1] - g[1]) * Math.sign(dy) > 0 && (m[1] - g[1]) * Math.sign(dy) < len));
    tren.forEach((m) => assert.ok(close(dist(m, g) % u, 0), "vạch chia cách gốc một số nguyên lần đoạn tỉ xích"));
    assert.equal(tren.length, len / u - 1, "mỗi khoảng chia trên mũi tên dài bằng đoạn tỉ xích");
    dungVach += tren.length;
    const nhan = chu.length ? chu.reduce((a, c) => (dist(c.p, g) < dist(a.p, g) ? c : a)).t : null;
    return { nhan, huong: dx > 0 ? "phải" : dx < 0 ? "trái" : dy > 0 ? "xuống" : "lên", khoang: len / u, luc: (len / u) * N };
  });
  assert.equal(dungVach, vach.length, "vạch chia nào cũng nằm trên một mũi tên");
  if (chu.length) assert.deepEqual(ra.map((m) => m.nhan).sort(), chu.map((c) => c.t).sort(), "mỗi chữ ghi gần gốc của đúng một mũi tên");
  return { N, ra };
};
/* Lò xo cạnh thước: các số trên thước ứng với vạch ngắn gần nhất; lò xo là đường gấp khúc màu acc treo từ vạch 0; quả nặng là hình chữ
   nhật có chữ “50 g” treo dưới đầu lò xo; đường nét đứt nối đầu dưới lò xo với thước. Trả về độ dài (cm) và số quả nặng của từng lò xo. */
const docLoXo = (svg) => {
  const vachThuoc = tags(svg, "line").filter((l) => !l["stroke-dasharray"] && num(l, "y1") === num(l, "y2") && Math.abs(num(l, "x2") - num(l, "x1")) <= 14).map((l) => num(l, "y1"));
  const so = texts(svg).filter((t) => /^\d+$/.test(t.t)).map((t) => {
    const y = vachThuoc.find((v) => Math.abs(v - (+t.y - 5)) < 0.5);
    assert.ok(y != null, "số " + t.t + " trên thước cần nằm ngang một vạch");
    return { v: +t.t, y };
  }).sort((a, b) => a.v - b.v);
  assert.ok(so.length >= 3 && so[0].v === 0, "thước cần các số từ 0");
  const k = (so[1].y - so[0].y) / (so[1].v - so[0].v), y0 = so[0].y;
  so.forEach((s) => assert.ok(close(s.y, y0 + k * s.v), "số " + s.v + " không đặt đúng vạch"));
  vachThuoc.forEach((y) => assert.ok(Number.isInteger(Math.round(((y - y0) / k) * 1e6) / 1e6), "mỗi vạch thước ứng với một số xentimét"));
  const netDut = tags(svg, "line").filter((l) => l["stroke-dasharray"]).map((l) => num(l, "y1"));
  const qua = tags(svg, "rect").filter((r) => r.fill === "bg"), chu50 = texts(svg).filter((t) => t.t === "50 g");
  assert.equal(qua.length, chu50.length, "quả nặng nào cũng ghi 50 g");
  return tags(svg, "polyline").filter((p) => p.stroke === "acc").map((p) => {
    const P = pts(p.points), tren = Math.min(...P.map((q) => q[1])), duoi = Math.max(...P.map((q) => q[1])), x = P[0][0];
    assert.ok(close(tren, y0), "lò xo treo ngang vạch 0");
    assert.ok(netDut.some((y) => close(y, duoi)), "đầu dưới lò xo có đường nét đứt nối sang thước");
    const len = (duoi - y0) / k;
    assert.ok(Number.isInteger(len), "đầu dưới lò xo ngang một vạch xentimét");
    const treo = qua.filter((r) => num(r, "x") < x && num(r, "x") + num(r, "width") > x && num(r, "y") >= duoi).sort((a, b) => num(a, "y") - num(b, "y"));
    if (treo.length) assert.ok(close(num(treo[0], "y"), duoi), "quả nặng đầu tiên móc ngay đầu dưới lò xo");
    return { x, len, qua: treo.length };
  }).sort((a, b) => a.x - b.x);
};
/* Sơ đồ năng lượng: hộp ở giữa, các mũi tên màu ink (đầu tam giác); mũi tên có ngọn chạm hộp là năng lượng vào, còn lại là ra. Mỗi
   mũi tên có chữ ghi bên cạnh: “Tên” và dòng “<số> J” ngay dưới, hoặc một dòng “Tên: <số> J”, “Tên: ?”. */
const docNangLuong = (svg) => {
  const hop = tags(svg, "rect")[0], X0 = num(hop, "x"), X1 = X0 + num(hop, "width"), Y0 = num(hop, "y"), Y1 = Y0 + num(hop, "height");
  const T = texts(svg).filter((t) => !(+t.x > X0 && +t.x < X1 && +t.y > Y0 && +t.y < Y1)); // bỏ chữ trong hộp
  const muc = [];
  T.forEach((t) => {
    const m = /^(.+?): (\d+ J|\?)$/.exec(t.t);
    if (m) return muc.push({ ten: m[1], gt: m[2] === "?" ? null : parseInt(m[2]), p: [+t.x, +t.y] });
    if (/^\d+ J$/.test(t.t)) return;
    const duoi = T.find((s) => s.x === t.x && +s.y === +t.y + 20 && /^\d+ J$/.test(s.t));
    assert.ok(duoi, "chữ “" + t.t + "” cần số jun ngay dưới");
    muc.push({ ten: t.t, gt: parseInt(duoi.t), p: [+t.x, +t.y] });
  });
  const dau = tags(svg, "polygon").map((p) => pts(p.points)[0]), cham = (q) => q[0] >= X0 - 0.5 && q[0] <= X1 + 0.5 && q[1] >= Y0 - 0.5 && q[1] <= Y1 + 0.5;
  const vao = dau.filter(cham), ra = dau.filter((q) => !cham(q));
  assert.equal(vao.length, 1, "đúng một mũi tên đi vào máy");
  assert.equal(muc.length, dau.length, "mỗi mũi tên có một chữ ghi");
  const gan = (q) => muc.reduce((a, c) => (dist(c.p, q) < dist(a.p, q) ? c : a));
  const mVao = muc.reduce((a, c) => (c.p[0] < a.p[0] ? c : a)); // chữ của mũi tên vào ở bên trái hộp
  assert.ok(mVao.p[0] < X0 && vao[0][0] <= X0 + 0.5, "mũi tên vào đi từ bên trái vào hộp");
  ra.forEach((q) => assert.ok(gan(q) !== mVao, "chữ ghi gần ngọn mũi tên ra không phải chữ của năng lượng vào"));
  return { vao: mVao, ra: muc.filter((m) => m !== mVao) };
};
/* Mặt Trăng: hai nửa hình tròn vẽ bằng path “M x,y A r,r 0 0 s x,y Z”; nửa tô màu sun là phần sáng. Trả về "phải" hoặc "trái". */
const docMatTrang = (svg) => {
  const nua = tags(svg, "path").map((p) => {
    const m = /^M([\d.]+),([\d.]+) A([\d.]+),([\d.]+) 0 0 ([01]) ([\d.]+),([\d.]+) Z$/.exec(p.d);
    assert.ok(m, "nửa hình tròn vẽ bằng một cung");
    const [x1, y1, , , s, x2, y2] = m.slice(1).map(Number);
    assert.ok(close(x1, x2), "hai đầu cung nằm trên một đường thẳng đứng");
    return { fill: p.fill, ben: (s === 1) === (y2 > y1) ? "phải" : "trái" };
  });
  const sang = nua.filter((n) => n.fill === "sun"), toi = nua.filter((n) => n.fill !== "sun");
  assert.ok(sang.length === 1 && toi.length === 1 && sang[0].ben !== toi[0].ben, "một nửa sáng, một nửa tối");
  return sang[0].ben;
};
/* Hệ Mặt Trời: Mặt Trời là hình tròn màu sun, hành tinh là hình tròn màu acc-soft, số ghi ngay trên từng hành tinh. Trả về các số
   theo thứ tự hành tinh từ gần đến xa Mặt Trời. */
const docHanhTinh = (svg) => {
  const mt = tags(svg, "circle").filter((c) => c.fill === "sun");
  assert.equal(mt.length, 1, "đúng một Mặt Trời");
  const O = [num(mt[0], "cx"), num(mt[0], "cy")];
  const ht = tags(svg, "circle").filter((c) => c.fill === "acc-soft").map((c) => [num(c, "cx"), num(c, "cy")]).sort((a, b) => dist(a, O) - dist(b, O));
  assert.equal(ht.length, 8, "tám hành tinh");
  const so = texts(svg).filter((t) => /^\d$/.test(t.t));
  return ht.map((p) => {
    const t = so.filter((s) => close(+s.x, p[0]) && +s.y < p[1]);
    assert.equal(t.length, 1, "mỗi hành tinh có đúng một số ghi ngay trên");
    return +t[0].t;
  });
};
const HANH_TINH = ["Thuỷ tinh", "Kim tinh", "Trái Đất", "Hoả tinh", "Mộc tinh", "Thổ tinh", "Thiên Vương tinh", "Hải Vương tinh"];
// bảng khoảng cách (AU) và chu kì quay quanh Mặt Trời (ngày) của sách KHTN 6, Bài 54 (trang 188–189)
const BANG = { "Kim tinh": [0.72, 224.7], "Hoả tinh": [1.52, 687], "Mộc tinh": [5.2, 4343.5], "Thổ tinh": [9.54, 10767.5] };
const CHU_KI = { "Thuỷ tinh": 88, "Kim tinh": 224.7, "Trái Đất": 365.2, "Hoả tinh": 687, "Mộc tinh": 4343.5, "Thổ tinh": 10767.5, "Thiên Vương tinh": 30587, "Hải Vương tinh": 60162 };
const NAM = 365.25, tron1 = (x) => Math.round(x * 10) / 10, vn = (x) => String(x).replace(".", ","); // làm tròn một chữ số thập phân
const VONG_TRONG = HANH_TINH.slice(0, 4);
const PHA = ["Không nhìn thấy Mặt Trăng", "Thấy nửa bên phải của Mặt Trăng sáng", "Thấy cả mặt tròn của Mặt Trăng sáng", "Thấy nửa bên trái của Mặt Trăng sáng"];
// nửa phải sáng (bán nguyệt đầu tháng) khoảng một tuần sau ngày không Trăng, Trăng tròn khoảng hai tuần, nửa trái sáng khoảng ba
// tuần (Bài 53, Hình 53.2: 8, 16, 23 ngày); PHA theo thứ tự đó, mỗi pha cách pha trước khoảng một tuần
const TUAN = { phải: "Khoảng một tuần", trái: "Khoảng ba tuần" };

/* ---------- các câu cần tính ----------
   id: đề chứa câu; has: đoạn chữ của đề; right(q): đáp án tính bằng code (so với ans, o[0], o hoặc a). */
const so = (q, re) => { const m = re.exec(q.q); assert.ok(m, "đề thiếu số liệu: " + re); return m.slice(1).map(val); };
const CHECKS = [
  { id: DE1, has: "Lực kéo F bằng bao nhiêu niutơn", right: (q) => {
    const { N, ra } = docMuiTen(q.svg);
    assert.equal(ra.length, 1); assert.ok(q.x.includes(`${ra[0].khoang} × ${N} = ${ra[0].luc}`), "lời giải ghi phép nhân");
    return ra[0].luc;
  } },
  { id: DE2, has: "Mũi tên nào biểu diễn đúng lực đó", right: (q) => {
    const [F, N] = so(q, /lực (\d+) N có phương nằm ngang, chiều từ phải sang trái.*ứng với (\d+) N/);
    const r = docMuiTen(q.svg);
    assert.equal(r.N, N, "số niutơn của đoạn tỉ xích ghi đúng trong đề");
    assert.deepEqual(q.o.map((o) => o.slice(-1)).sort(), r.ra.map((m) => m.nhan).sort(), "mỗi lựa chọn là một mũi tên trong hình");
    const dung = r.ra.filter((m) => m.huong === "trái" && m.luc === F);
    assert.equal(dung.length, 1, "đúng một mũi tên biểu diễn đúng lực");
    r.ra.filter((m) => m !== dung[0]).forEach((m) => assert.ok(q.x.includes("mũi tên " + m.nhan) || q.x.includes("Mũi tên " + m.nhan), "lời giải nói vì sao mũi tên " + m.nhan + " sai"));
    return "Mũi tên " + dung[0].nhan;
  } },
  { id: DE2, has: "Bạn Hà xách một xô nước", right: (q) => {
    // câu Hiểu: không tính độ dài mũi tên (phép tính đó thuộc ô Vận dụng)
    assert.ok(!/\d+ cm/.test(q.q + q.o.join(" ")), "câu Hiểu không cho tỉ xích bằng số");
    assert.ok(q.q.includes("chiều từ dưới lên") && q.o[1].includes("từ trên xuống"), "ý b nói ngược chiều lực xách");
    assert.ok(/lực lớn hơn .*mũi tên sẽ ngắn hơn/.test(q.o[3]), "ý d nói lực lớn hơn thì mũi tên ngắn hơn");
    return [q.o[0].includes("xô nước"), false, /Độ dài của mũi tên cho biết độ lớn/.test(q.o[2]), false];
  } },
  { id: DE1, has: "Treo một gói bột", right: (q) => {
    const [l0, m1, l1, m2] = so(q, /lò xo của cân dài ([\d,]+) cm; treo một túi đường (\d+) g thì lò xo dài ([\d,]+) cm\. Treo một gói bột (\d+) g/);
    const d1 = l1 - l0, d2 = (d1 * m2) / m1, l = Math.round((l0 + d2) * 1e6) / 1e6;
    assert.ok(q.x.includes(`${String(d1).replace(".", ",")} × ${m2 / m1} = ${String(d2).replace(".", ",")}`), "lời giải ghi độ dãn");
    return l;
  } },
  { id: DE2, has: "Túi muối có khối lượng bao nhiêu gam", right: (q) => {
    const [m1, d1, d2] = so(q, /quả cân (\d+) g vào một lò xo thì lò xo dãn ([\d,]+) cm.* lò xo dãn ([\d,]+) cm/);
    return Math.round((m1 * d2) / d1 * 1e6) / 1e6;
  } },
  { id: POOL, has: "Nếu chỉ treo một quả nặng 50 g thì lò xo dài", right: (q) => {
    const L = docLoXo(q.svg);
    assert.equal(L.length, 2); assert.deepEqual(L.map((l) => l.qua), [0, 2], "lò xo bên trái không treo vật, bên phải treo hai quả nặng");
    assert.ok(q.x.includes(`dài ${L[0].len} cm khi chưa treo vật`) && q.x.includes(`dài ${L[1].len} cm khi treo hai quả nặng`), "lời giải đọc đúng thước");
    return L[0].len + (L[1].len - L[0].len) / 2;
  } },
  { id: DE1, has: "Một thùng sách có trọng lượng", right: (q) => so(q, /trọng lượng (\d+) N/)[0] / 10 },
  { id: DE2, has: "bao xi măng", right: (q) => { const [n, m] = so(q, /chở (\d+) bao xi măng, mỗi bao có khối lượng (\d+) kg/); return n * m * 10; } },
  { id: POOL, has: "Một quả trứng gà có khối lượng khoảng", right: (q) => { const [m] = so(q, /khoảng (\d+) g\. Mười quả/); return Math.round(10 * m / 1000 * 10 * 1e6) / 1e6; } },
  { id: POOL, has: "Một cần cẩu kéo thùng hàng", right: (q) => { const [F, N] = so(q, /bằng lực ([\d ]+) N\. .*1 cm ứng với (\d+) N/); return F / N; } },
  { id: DE2, has: "Năng lượng 3,6 kJ", right: (q) => so(q, /Năng lượng ([\d,]+) kJ/)[0] * 1000 },
  { id: DE1, has: "Một chiếc máy khoan được cung cấp", right: (q) => {
    const [E, u] = so(q, /cung cấp (\d+) J năng lượng điện thì có (\d+) J chuyển hoá thành động năng/);
    assert.ok(q.x.includes(`${E} − ${u} = ${E - u}`), "lời giải ghi phép trừ");
    return E - u;
  } },
  { id: POOL, has: "một chiếc máy mài nhận", right: (q) => {
    const [E, u, t] = so(q, /Mỗi giây, một chiếc máy mài nhận (\d+) J năng lượng điện, trong đó (\d+) J chuyển hoá thành động năng.* Trong (\d+) giây/);
    const kq = (E - u) * t;
    assert.ok(q.x.includes(`${E} − ${u} = ${E - u}`) && q.x.includes(`${E - u} × ${t} = ${String(kq).replace(/\B(?=(\d{3})+$)/g, " ")}`), "lời giải ghi hai phép tính");
    return kq;
  } },
  { id: DE2, has: "năng lượng của một máy xay sinh tố", right: (q) => {
    const { vao, ra } = docNangLuong(q.svg);
    const hoi = ra.filter((m) => m.gt == null);
    assert.equal(hoi.length, 1, "đúng một phần năng lượng cần tìm"); assert.ok(/^Nhiệt/.test(hoi[0].ten) && q.q.includes("năng lượng nhiệt (dấu ?)"), "đề hỏi phần năng lượng nhiệt");
    const kq = vao.gt - ra.reduce((s, m) => s + (m.gt || 0), 0);
    assert.ok(q.x.includes(`${vao.gt} − ${ra.filter((m) => m.gt != null).map((m) => m.gt).join(" − ")} = ${kq}`), "lời giải ghi phép trừ");
    return kq;
  } },
  { id: DE1, has: "Hình bên là hình dạng Mặt Trăng", right: (q) => TUAN[docMatTrang(q.svg)] },
  { id: DE2, has: "Đêm rằm, bạn Mai thấy Mặt Trăng tròn", right: (q) => {
    assert.ok(q.q.includes("khoảng 1 tuần, 2 tuần, 3 tuần và 4 tuần sau đêm rằm"), "đề hỏi các pha cách nhau một tuần, từ sau Trăng tròn");
    const tron = PHA.indexOf("Thấy cả mặt tròn của Mặt Trăng sáng");
    return [1, 2, 3, 4].map((k) => PHA[(tron + k) % PHA.length]);
  } },
  { id: POOL, has: "hành tinh nào có nhiệt độ cao hơn", right: (q) => {
    const thuTu = docHanhTinh(q.svg);
    assert.deepEqual(thuTu, [1, 2, 3, 4, 5, 6, 7, 8], "số ghi trên hành tinh tăng dần theo khoảng cách đến Mặt Trời");
    const [a, b] = so(q, /Hành tinh số (\d) và hành tinh số (\d)/), gan = Math.min(a, b), xa = Math.max(a, b);
    // hành tinh gần Mặt Trời nóng hơn (Bài 54: vòng trong nhiệt độ cao, vòng ngoài nhiệt độ thấp)
    assert.ok(VONG_TRONG.includes(HANH_TINH[gan - 1]) && !VONG_TRONG.includes(HANH_TINH[xa - 1]), "một hành tinh vòng trong, một hành tinh vòng ngoài");
    assert.ok(q.x.includes(`số ${gan} (${HANH_TINH[gan - 1]}) là hành tinh vòng trong`) && q.x.includes(`số ${xa} (${HANH_TINH[xa - 1]}) là hành tinh vòng ngoài`), "lời giải gọi đúng tên hai hành tinh");
    return `Hành tinh số ${gan}, vì ở gần Mặt Trời hơn nên nhận được nhiều nhiệt hơn`;
  } },
  { id: DE2, has: "Sắp xếp các hành tinh sau theo thời gian quay", right: (q) => {
    // số trong lời giải: chu kì của bảng, ngày làm tròn đến đơn vị, năm làm tròn một chữ số thập phân (hoặc đến đơn vị khi trên 100 năm)
    q.o.forEach((h) => { const d = CHU_KI[h], y = d / NAM; assert.ok(q.x.includes(h) && q.x.includes(d < 1000 ? `${Math.round(d)} ngày` : `${vn(y > 100 ? Math.round(y) : tron1(y))} năm`), "lời giải ghi đúng chu kì của " + h); });
    return q.o.slice().sort((a, b) => CHU_KI[a] - CHU_KI[b]);
  } },
  { id: DE1, has: "thời gian quay một vòng quanh Mặt Trời (đã làm tròn)", right: (q) => {
    const B = {};
    [...q.q.matchAll(/(\S+ tinh) ([\d,]+) AU, ([\d,]+) năm/g)].forEach((m) => (B[m[1]] = [val(m[2]), val(m[3])]));
    assert.deepEqual(B, Object.fromEntries(Object.entries(BANG).map(([h, [au, d]]) => [h, [tron1(au), tron1(d / NAM)]])), "số liệu là bảng của sách, đổi ra năm, làm tròn");
    const ten = Object.keys(B).sort((a, b) => B[a][0] - B[b][0]);
    assert.ok(q.x.includes(`${vn(B["Mộc tinh"][1])} × 2 = ${vn(tron1(B["Mộc tinh"][1] * 2))}`), "lời giải ghi phép nhân");
    return [B["Mộc tinh"][0] < B["Hoả tinh"][0], ten.every((t, i) => !i || B[t][1] > B[ten[i - 1]][1]), B["Thổ tinh"][1] > 2 * B["Mộc tinh"][1], VONG_TRONG.includes("Thổ tinh")];
  } }
];

const pool = bank(POOL);
assert.ok(pool && bank(DE1) && bank(DE2), "thiếu đề");
assert.equal(bank(DE1).questions.length, 25); assert.equal(bank(DE2).questions.length, 25);
const kho = pool.questions, mine = kho.filter((q) => q.src === POOL);
assert.equal(mine.length, 25, "25 câu riêng");
let n = 0;
const checked = new Set();
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.q.includes(c.has));
  assert.equal(m.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${m.length}`);
  const q = m[0], at = c.id + ": " + c.has;
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  const want = c.right(q), got = q.type === "num" ? q.ans : q.type === "order" ? q.o : q.type === "tf4" ? q.a : q.o[0];
  assert.strictEqual(JSON.stringify(got), JSON.stringify(want), at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), at + ": nhiễu trùng đáp án đúng");
  checked.add(q); n++;
});
// câu trả lời bằng số, câu điền có đáp án là số và câu có hình nào cũng phải được tính lại ở trên
kho.filter((q) => q.svg || q.type === "num" || (q.type === "fill" && /^[\d\s,.−-]+$/.test(q.ans[0]))).forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
assert.equal(kho.filter((q) => q.svg).length, 6, "6 câu có hình");

/* ---------- mức độ và ma trận ---------- */
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M), sum = (a) => a.reduce((s, v) => s + v, 0);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
const CHU_DE = ["Lực và biểu diễn lực", "Biến dạng của lò xo", "Trọng lượng, lực hấp dẫn", "Lực ma sát, lực cản của nước", "Năng lượng và các dạng năng lượng",
  "Chuyển hoá năng lượng, năng lượng hao phí", "Năng lượng tái tạo, tiết kiệm năng lượng", "Mặt Trời, Mặt Trăng", "Hệ Mặt Trời, Ngân Hà", "Thực vật", "Động vật", "Đa dạng sinh học"];
assert.deepEqual(Object.keys(M), CHU_DE, "12 chủ đề theo thứ tự bài trong sách (Bài 40–55, rồi phần ôn Bài 34–39)");
[DE1, DE2, POOL].forEach((id) => assert.deepEqual([...new Set(kho.filter((q) => q.src === id).map((q) => q.topic))], CHU_DE, id + ": đủ 12 chủ đề, đúng thứ tự"));
// phần ôn dùng đúng chữ chủ đề của kho giữa kì II
const gk2 = new Set(bank("khtn6-gk2-ngau-nhien").questions.map((q) => q.topic));
["Thực vật", "Động vật", "Đa dạng sinh học"].forEach((t) => assert.ok(gk2.has(t), "chủ đề ôn “" + t + "” có ở kho giữa kì II"));
// hai đề cố định và 25 câu riêng đều chia đúng ma trận, nên ô nào cũng có gấp ba số câu ô đó rút; câu nào cũng ở ô có rút câu
[DE1, DE2, POOL].forEach((id) => Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => kho.filter((q) => q.src === id && q.topic === t && q.lv === l).length), v, id + " đúng ma trận ở chủ đề " + t)));
kho.forEach((q) => assert.ok(M[q.topic] && M[q.topic][q.lv - 1] > 0, `${q.src}: ô (${q.topic}, mức ${q.lv}) không có trong ma trận: ${q.q.slice(0, 50)}`));
// dạng câu theo khung Công văn 7991: mỗi đề cố định có ít nhất 3 câu đúng/sai 4 ý, 3 câu trả lời bằng số; không có tự luận
[DE1, DE2].forEach((id) => {
  const qs = bank(id).questions;
  assert.ok(qs.filter((q) => q.type === "tf4").length >= 3, id + ": cần câu đúng/sai 4 ý");
  assert.ok(qs.filter((q) => q.type === "num").length >= 3, id + ": cần câu trả lời bằng số");
});
assert.ok(!kho.some((q) => q.type === "essay"), "không có câu tự luận");
const dem = (f) => kho.filter(f).length;
assert.ok(dem((q) => q.type === "match") >= 3 && dem((q) => q.type === "order") >= 3, "kho có nối cột, sắp xếp");
const seen = new Set();
const thu = (hist) => {
  const d = Quiz.draw(pool, hist);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, 25);
  assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.lv === l).length), [10, 8, 7]);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.topic === t && q.lv === l).length), v, "rút đúng ma trận ở chủ đề " + t));
  return d;
};
for (let k = 0; k < 400; k++) thu().questions.forEach((q) => seen.add(Quiz.key(q)));
assert.ok(mine.every((q) => seen.has(Quiz.key(q))), "400 lần rút thử phải gặp đủ các câu riêng");
// học sinh đã làm hết một đề cố định: lần rút sau không lấy lại câu của đề đó
pool.pool.from.forEach((id) => { const done = new Set(bank(id).questions.map(Quiz.key)); for (let k = 0; k < 30; k++) thu((q) => ({ done: done.has(Quiz.key(q)) ? 1 : 0, wrong: 0 })).questions.forEach((q) => assert.ok(!done.has(Quiz.key(q)), "đã làm hết " + id + " mà vẫn gặp lại câu của đề đó")); });

/* ---------- đề bài không trùng câu nào khác trong data/banks/6-khtn.js (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const deBai = BANKS.filter((b) => b.file === "6-khtn.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q) })));
deBai.filter((d) => /^khtn6-ck2-/.test(d.at)).forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });

/* ---------- dò lộ đáp án (Rút ra N5; bộ dò theo tests/toan6-ck2.js) giữa hai câu rút được cùng lúc: khác ô (chủ đề, mức), hoặc
   cùng một ô rút từ 2 câu (kho này không có ô nào rút 2 câu). Đáp án là số (từ hai chữ số, hoặc số thập phân) chỉ tìm ở vị trí kết quả
   của câu kia (ngay sau “=”, “là”, “bằng”, “được”); cặp nối: câu kia có cả hai vế; câu sắp xếp: câu kia có đủ các ô theo đúng thứ tự.
   Đáp án bằng chữ có ở câu kia thì chỉ in ra khi chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM. ---------- */
const ten = new Map();
[POOL, DE1, DE2].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, (id === POOL ? "own" : id.slice(-3)) + "#" + (i + 1))));
const chu = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || []).map(String);
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
const cungLuc = (p, q) => p.topic !== q.topic || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2;
// t có cụm s đứng thành từ riêng (“mũi tên c” không khớp “mũi tên chỉ”)
const coCum = (t, s) => { for (let i = t.indexOf(s); i >= 0; i = t.indexOf(s, i + 1)) if (!/[\p{L}\p{N}]/u.test(t[i - 1] || " ") && !/[\p{L}\p{N}]/u.test(t[i + s.length] || " ")) return true; return false; };
const theoThuTu = (s, o) => { let i = 0; return o.every((x) => { const j = s.toLowerCase().indexOf(x.toLowerCase(), i); if (j < 0) return false; i = j + x.length; return true; }); };
const doLo = (qs, tenCau = (q) => ten.get(q)) => {
  const lo = [], chuLo = [];
  qs.forEach((q, i) => {
    const so = q.type === "num" && (q.ans >= 10 || !Number.isInteger(q.ans)) ? [q.ans] : [];
    const cum = q.type === "mc" ? [q.o[0]] : [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    qs.forEach((p, j) => {
      if (j === i || !cungLuc(p, q)) return;
      const C = chu(p), T = C.map((s) => s.toLowerCase()), at = `${tenCau(p)} → ${tenCau(q)}: `;
      so.filter((x) => C.flatMap(soKQ).some((y) => close(x, y))).forEach((x) => lo.push(at + x));
      cap.filter(([l, r]) => T.some((t) => coCum(t, l.toLowerCase()) && coCum(t, r.toLowerCase()))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      if (q.type === "order" && C.some((s) => theoThuTu(s, q.o))) lo.push(at + "thứ tự " + q.o.join(", "));
      cum.filter((s) => T.some((t) => coCum(t, s.toLowerCase()))).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const { lo, chuLo } = doLo(kho);
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuLo.join("\n"));
// đã xem (Phiên N21): “khoảng cách” là chữ trong đề của câu về khoảng cách từ các hành tinh đến Mặt Trời (đo bằng AU); câu đó không
// nói năm ánh sáng đo gì
const DA_XEM = ["de1#20 → own#19: Khoảng cách"];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 30 (N)”, “là 16,5 cm”, đủ thứ tự hành tinh, cả hai vế một cặp nối
const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
const thuLo = (qs) => doLo(qs, (q) => q.q.slice(0, 12)).lo.map((s) => s.replace(/^.*: /, ""));
const khac = tim("Con trâu kéo cày");
assert.deepEqual(thuLo([tim("Lực kéo F bằng bao nhiêu niutơn"), gia(khac, "Ví dụ F = 30 (N).")]), ["30"]);
assert.deepEqual(thuLo([tim("Treo một gói bột"), gia(khac, "Lò xo dài là 16,5 cm.")]), ["16.5"]);
assert.deepEqual(thuLo([tim("Sắp xếp các hành tinh sau"), gia(khac, "Kim tinh gần hơn Hoả tinh, rồi đến Thổ tinh, xa nhất là Hải Vương tinh.")]), ["thứ tự Kim tinh, Hoả tinh, Thổ tinh, Hải Vương tinh"]);
assert.deepEqual(thuLo([tim("Nối mỗi động vật với lớp"), gia(khac, "Tắc kè thuộc lớp Bò sát.")]), ["Tắc kè → Bò sát"]);
console.log(n, "câu đã tính lại (câu có phép tính, có hình của 2 đề cố định và " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + kho.length + " câu.");
console.log("MATH OK");
