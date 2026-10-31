// Kiểm tra ngân hàng KHTN 9 giữa kì I của Phiên N9-gk1-khtn (data/banks/9-khtn.js: hai đề cố định và câu riêng của đề ngẫu nhiên
// khtn9-gk1-ngau-nhien), theo mẫu tests/khtn9-ck1.js, tests/khtn9-ck2.js. Số đề, số câu lấy từ danh mục (không ghi cứng); ma trận
// 10 – 8 – 7 như mọi kho lớp 9; số câu Bài 1 và mỗi phân môn so với lời dặn (note) của đề.
// Câu có phép tính hoặc có hình được nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong kho, đúng đề ghi ở id); đáp án tính bằng
// code (so với ans, o[0] hoặc a): động năng (đổi km/h ra m/s), thế năng (gốc thế năng không ở mặt đất), so sánh động năng, thế năng,
// cơ năng (tốc độ khi chạm đất, độ cao lớn nhất, đọc biểu đồ cột), công, công suất, tốc độ ánh sáng từ chiết suất; tính theo phương
// trình hoá học (khối lượng mol từ nguyên tử khối đề cho, hệ số đọc từ phương trình trong lời giải), tìm công thức alkane từ số mol
// CO₂ và nước, nhiệt toả ra, hiệu suất trùng hợp, công thức chung của alkene; sơ đồ lai (liệt kê mọi tổ hợp giao tử), đếm nucleotide
// theo chiều dài, theo phần trăm, liên kết hydrogen. Hình đọc lại: số đo góc giữa tia sáng và mặt phân cách (cung tròn, số ghi cạnh
// cung khớp góc vẽ; tia khúc xạ đúng định luật khúc xạ với chiết suất của thuỷ tinh), công thức cấu tạo (hoá trị từng nguyên tử; công
// thức thu gọn của các lựa chọn đọc lại thành đồ thị, chỉ lựa chọn đúng khớp hình), mạch carbon (vòng, nhánh), biểu đồ cột năng lượng
// (trục số, đỉnh cột trên vạch lưới, chú thích màu), khung tổ hợp giao tử (ô nào cũng đúng tổ hợp). Mọi phương trình hoá học trong câu
// Hoá học phải cân bằng. Câu trả lời bằng số và câu có hình nào cũng phải có kiểm tra ở đây.
// Rồi: chữ (công thức hoá học viết bằng chữ số dưới dòng, tên chất như sách, dấu thanh kiểu cũ như sách “hoá”, “thuỷ”; số ngăn hàng
// nghìn bằng khoảng trắng, dấu phẩy thập phân), mức độ và ma trận (12 chủ đề theo thứ tự bài của sách; 11 chủ đề đúng chữ chủ đề của kho
// cuối kì I; hai đề cố định và câu riêng chia đúng ma trận), dạng câu theo khung Công văn 7991 (mỗi phần 4 câu đúng/sai 4 ý không lặp
// kiểu Đ/S, 6 câu trả lời ngắn bằng số), đáp án đúng không dài hơn hẳn lựa chọn sai, là lựa chọn dài nhất hay ngắn nhất ở không quá
// một phần ba số câu nhiều lựa chọn, không là lựa chọn duy nhất có chữ của nhãn chủ đề; lời dặn, lịch thi (ba đề gắn vào gk1-l9, phạm vi
// KHTN khớp lời dặn, không có câu về đề chung của Sở); rút thử nhiều lần (đúng ma trận, gặp đủ câu riêng; đã làm hết một đề cố định thì
// không rút lại câu của đề đó); đề bài không trùng câu nào trong data/banks/9-khtn.js, không gần trùng câu của kho cuối kì I (cặp hai âm
// tiết chung), đáp án không trùng câu cùng chủ đề của kho đó; dò lộ đáp án giữa các câu rút được cùng lúc và giữa mọi câu cùng chủ đề
// của kho này với kho cuối kì I (đề “Ôn chủ đề” rút chung; số ở vị trí kết quả: không được có; chuỗi 3 từ của đáp án bằng chữ in ra với
// DO_LO=1 để xem tay, đã xem ghi ở DA_XEM, DA_XEM_CHU_DE). Có sách ở ../OnUp-Book (repo riêng tư) thì so mọi trường chữ với chữ OCR của
// mọi cuốn sau khi bỏ dấu, gộp nguyên âm (không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và với câu của mọi kho khác, cả câu riêng
// của các đề ngẫu nhiên (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 5 từ).
// Chạy: node tests/khtn9-gk1.js → in MATH OK.
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
const pool = BANKS.find((b) => b.pool && /^khtn9-gk1-/.test(b.id));
assert.ok(pool, "thiếu đề ngẫu nhiên khtn9-gk1");
assert.equal(pool.pool.from.length, 2, "đề ngẫu nhiên lấy câu của hai đề cố định");
const S = { de1: pool.pool.from[0], de2: pool.pool.from[1], own: pool.id };
assert.deepEqual(BANKS.filter((b) => /^khtn9-gk1-/.test(b.id)).map((b) => b.id).sort(), Object.values(S).sort(), "kho gồm hai đề cố định và đề ngẫu nhiên");
const kho = pool.questions, mine = kho.filter((q) => q.src === S.own);
[S.de1, S.de2].forEach((id) => assert.equal(bank(id).questions.length, bank(id).n, id + ": số câu bằng n của danh mục"));
assert.equal(kho.length, mine.length + bank(S.de1).n + bank(S.de2).n, "kho = câu riêng + câu của hai đề cố định");
assert.equal(mine.length, pool.n, "câu riêng chia đúng ma trận nên có đúng n câu");
// kho cuối kì I cùng môn: đề “Ôn chủ đề” rút chung câu cùng chủ đề của hai kho
const ck1 = BANKS.find((b) => b.pool && /^khtn9-ck1-/.test(b.id));
assert.ok(ck1, "thiếu kho cuối kì I khtn9-ck1 để so");
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- số ---------- */
const val = (s) => +String(s).replace(/\s/g, "").replace(/−/g, "-").replace(",", "."); // "7 500" → 7500, "4,4" → 4.4
const close = (x, y, e = 1e-9) => Math.abs(x - y) < e;
const tron = (x, k = 2) => Math.round(x * 10 ** k) / 10 ** k;
const vn = (x) => { const [a, b] = String(tron(x, 6)).split("."); return a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); }; // 7500 → "7 500", 0.15 → "0,15"
const RAD = Math.PI / 180;

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const ends = (l) => [[num(l, "x1"), num(l, "y1")], [num(l, "x2"), num(l, "y2")]];
const same = (p, q, e = 1e-6) => close(p[0], q[0], e) && close(p[1], q[1], e);
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const huong = (a, b) => { const L = dist(a, b); return [(b[0] - a[0]) / L, (b[1] - a[1]) / L]; };
const cheo = (u, v) => u[0] * v[1] - u[1] * v[0];
const goc2 = (u, v) => Math.acos(Math.max(-1, Math.min(1, u[0] * v[0] + u[1] * v[1]))) / RAD; // góc (độ) giữa hai hướng
// mũi tên tam giác: điểm đầu tiên là đỉnh; mũi tên nằm trên đoạn [a, b] và chỉ theo chiều a → b
const chiTheo = (dau, a, b) => { const u = huong(a, b), [ngon, b1, b2] = dau, giua = [(b1[0] + b2[0]) / 2, (b1[1] + b2[1]) / 2];
  return Math.abs(cheo(u, [ngon[0] - a[0], ngon[1] - a[1]])) < 1 && (ngon[0] - giua[0]) * u[0] + (ngon[1] - giua[1]) * u[1] > 0; };
const tamChu = (t) => [+t.x, +t.y - 5]; // tâm của chữ cỡ 15 (y là đường chân chữ)

/* Số đo góc ở chỗ khúc xạ: mặt phân cách là đoạn nằm ngang màu ink nét 2; pháp tuyến là đường nét đứt thẳng đứng cắt mặt phân cách tại
   I; tia tới (màu bad) đi đến I từ phía trên, tia khúc xạ đi từ I xuống dưới, mỗi tia một mũi tên chỉ chiều truyền; mỗi cung (polyline
   màu ink, mọi điểm cách đều I) nối hướng của mặt phân cách với hướng của một tia; số đo “50°” ghi ở ngoài cung, gần điểm giữa cung,
   phải bằng góc vẽ (sai lệch dưới 0,5°). Trả về góc tới, góc khúc xạ (đo với pháp tuyến) và số đo ghi cạnh mỗi tia. */
const docGocKhucXa = (svg) => {
  const mat = tags(svg, "line").filter((l) => l.stroke === "ink" && l.y1 === l.y2);
  assert.equal(mat.length, 1, "đúng một mặt phân cách nằm ngang");
  const yM = num(mat[0], "y1"), phap = tags(svg, "line").filter((l) => l["stroke-dasharray"]);
  assert.ok(phap.length === 1 && phap[0].x1 === phap[0].x2 && num(phap[0], "y1") < yM && num(phap[0], "y2") > yM, "pháp tuyến là đường nét đứt thẳng đứng cắt mặt phân cách");
  const I = [num(phap[0], "x1"), yM], tia = tags(svg, "line").filter((l) => l.stroke === "bad").map(ends);
  const toi = tia.filter(([a, b]) => same(b, I) && a[1] < yM), kx = tia.filter(([a, b]) => same(a, I) && b[1] > yM);
  assert.ok(toi.length === 1 && kx.length === 1 && tia.length === 2, "một tia tới đi đến I từ phía trên, một tia khúc xạ đi từ I xuống dưới");
  const dau = tags(svg, "polygon").filter((p) => p.fill === "bad").map((p) => pts(p.points));
  assert.equal(dau.length, 2, "mỗi tia một mũi tên");
  [toi[0], kx[0]].forEach(([a, b]) => assert.equal(dau.filter((d) => chiTheo(d, a, b)).length, 1, "mũi tên chỉ theo chiều truyền của tia"));
  const uS = huong(I, toi[0][0]), uK = huong(I, kx[0][1]), T = texts(svg);
  const chu = (c) => T.filter((t) => t.t === c);
  assert.ok(chu("S").length === 1 && dist(tamChu(chu("S")[0]), toi[0][0]) < 16 && chu("K").length === 1 && dist(tamChu(chu("K")[0]), kx[0][1]) < 16 && chu("I").length === 1 && dist(tamChu(chu("I")[0]), I) < 16, "chữ S, I, K ghi cạnh điểm");
  const so = T.filter((t) => /^\d+°$/.test(t.t));
  const cung = tags(svg, "polyline").filter((p) => p.stroke === "ink").map((p) => pts(p.points));
  assert.equal(cung.length, 2, "hai cung đánh dấu góc");
  const ra = cung.map((c) => {
    const R = dist(c[0], I);
    assert.ok(c.every((p) => Math.abs(dist(p, I) - R) < 0.3), "cung tròn tâm I");
    const u0 = huong(I, c[0]), u1 = huong(I, c[c.length - 1]), mat0 = Math.abs(u0[1]) < 1e-3, mat1 = Math.abs(u1[1]) < 1e-3;
    assert.ok(mat0 !== mat1, "một đầu cung nằm trên mặt phân cách");
    const uTia = mat0 ? u1 : u0, uMat = mat0 ? u0 : u1, laTia = goc2(uTia, uS) < 0.5 ? "toi" : goc2(uTia, uK) < 0.5 ? "kx" : null;
    assert.ok(laTia, "đầu kia của cung nằm trên một tia");
    const ve = goc2(uTia, uMat), giua = c[Math.floor(c.length / 2)];
    const nhan = so.reduce((x, t) => (dist(tamChu(t), giua) < dist(tamChu(x), giua) ? t : x));
    assert.ok(dist(tamChu(nhan), I) > R && dist(tamChu(nhan), giua) < 22, "số đo ghi ở ngoài cung, gần giữa cung");
    assert.ok(Math.abs(parseInt(nhan.t, 10) - ve) < 0.5, "số đo ghi trong hình (" + nhan.t + ") bằng góc vẽ (" + ve.toFixed(2) + "°)");
    return { tia: laTia, so: parseInt(nhan.t, 10) };
  });
  assert.deepEqual(ra.map((x) => x.tia).sort(), ["kx", "toi"], "mỗi tia một cung");
  const nuoc = tags(svg, "rect").filter((r) => r.fill === "acc-soft");
  assert.ok(nuoc.length === 1 && num(nuoc[0], "y") === yM, "môi trường phía dưới tô màu, bắt đầu từ mặt phân cách");
  return { i: goc2(uS, [0, -1]), r: goc2(uK, [0, 1]), soToi: ra.find((x) => x.tia === "toi").so, soKx: ra.find((x) => x.tia === "kx").so,
    tren: T.filter((t) => +t.y < yM).map((t) => t.t), duoi: T.filter((t) => +t.y > yM).map((t) => t.t) };
};

/* Công thức cấu tạo: chữ in đậm là nguyên tử, đoạn thẳng màu ink là liên kết (nối hai nguyên tử gần hai đầu đoạn). Kiểm tra hoá trị từng
   nguyên tử; trả về đồ thị các nguyên tử khác H (nguyên tố, số H gắn vào, các liên kết) và công thức phân tử. */
const SUB = "₀₁₂₃₄₅₆₇₈₉", chiSo = (n) => (n > 1 ? String(n).split("").map((c) => SUB[+c]).join("") : "");
const HOA_TRI = { C: 4, H: 1, O: 2, N: 3, Cl: 1, Br: 1 };
const docCongThuc = (svg) => {
  const ng = texts(svg).filter((t) => /^[A-Z][a-z]?$/.test(t.t)).map((t) => ({ e: t.t, p: tamChu(t), lk: [] }));
  const gan = (p) => ng.reduce((x, y) => (dist(y.p, p) < dist(x.p, p) ? y : x));
  tags(svg, "line").filter((l) => l.stroke === "ink").map(ends).forEach(([a, b]) => {
    const u = gan(a), v = gan(b);
    assert.ok(u !== v && dist(u.p, a) < 20 && dist(v.p, b) < 20, "liên kết nối hai nguyên tử");
    u.lk.push(v); v.lk.push(u);
  });
  ng.forEach((x) => assert.equal(x.lk.length, HOA_TRI[x.e], "hoá trị của " + x.e));
  const dem = {}; ng.forEach((x) => (dem[x.e] = (dem[x.e] || 0) + 1));
  const nang = ng.filter((x) => x.e !== "H");
  const g = nang.map((x) => ({ e: x.e, h: x.lk.filter((y) => y.e === "H").length, k: x.lk.filter((y) => y.e !== "H").map((y) => nang.indexOf(y)) }));
  return { ct: ["C", "H", ...Object.keys(dem).filter((e) => e !== "C" && e !== "H").sort()].filter((e) => dem[e]).map((e) => e + chiSo(dem[e])).join(""), g };
};
// công thức cấu tạo thu gọn một mạch, liên kết đơn (“CH₃–CH₂–NH₂”, “CH₃–NH–CH₃”): mỗi nhóm là một nguyên tử khác H kèm số H; nhóm
// nào sai hoá trị thì công thức không đúng (trả về null)
const thuGon = (s) => {
  const nhom = s.split("–").map((t) => { const m = /^(Cl|Br|[CNO])(H([₀-₉]*))?$/.exec(t); assert.ok(m, "không đọc được nhóm " + t + " trong " + s); return { e: m[1], h: m[2] ? (m[3] ? +sub2n(m[3]) : 1) : 0 }; });
  const g = nhom.map((x, i) => ({ e: x.e, h: x.h, k: [i - 1, i + 1].filter((j) => j >= 0 && j < nhom.length) }));
  return g.every((x) => x.h + x.k.length === HOA_TRI[x.e]) ? g : null;
};
// hai đồ thị (nguyên tố, số H, liên kết) giống nhau sau khi đánh số lại các nguyên tử (thử mọi cách đánh số; phân tử nhỏ)
const hoanVi = (a) => (a.length <= 1 ? [a] : a.flatMap((x, i) => hoanVi(a.slice(0, i).concat(a.slice(i + 1))).map((r) => [x].concat(r))));
const giongNhau = (g1, g2) => g1.length === g2.length && hoanVi(g1.map((_, i) => i)).some((p) => g1.every((x, i) => {
  const y = g2[p[i]]; return x.e === y.e && x.h === y.h && x.k.length === y.k.length && x.k.every((j) => y.k.includes(p[j]));
}));

/* Mạch carbon: chữ C là nguyên tử carbon, đoạn thẳng màu ink là liên kết; mỗi mạch có nhãn “(1)”, “(2)”… ngay dưới. Mạch có số liên kết
   bằng số nguyên tử là mạch vòng; mạch hở có nguyên tử nối với từ ba nguyên tử khác là mạch phân nhánh. */
const docMach = (svg) => {
  const ng = texts(svg).filter((t) => t.t === "C").map((t, i) => ({ i, p: tamChu(t), lk: [] }));
  const gan = (p) => ng.reduce((x, y) => (dist(y.p, p) < dist(x.p, p) ? y : x));
  tags(svg, "line").filter((l) => l.stroke === "ink").map(ends).forEach(([a, b]) => {
    const u = gan(a), v = gan(b);
    assert.ok(u !== v && dist(u.p, a) < 16 && dist(v.p, b) < 16, "liên kết nối hai nguyên tử carbon");
    u.lk.push(v); v.lk.push(u);
  });
  ng.forEach((x) => assert.ok(x.lk.length >= 1 && x.lk.length <= 4, "hoá trị của C"));
  const thanh = []; const seen = new Set();
  ng.forEach((x) => { if (seen.has(x)) return; const c = [], st = [x]; seen.add(x); while (st.length) { const y = st.pop(); c.push(y); y.lk.forEach((z) => { if (!seen.has(z)) { seen.add(z); st.push(z); } }); } thanh.push(c); });
  const nhan = texts(svg).filter((t) => /^\(\d\)$/.test(t.t));
  assert.equal(nhan.length, thanh.length, "mỗi mạch một nhãn");
  return nhan.map((t) => {
    const c = thanh.reduce((x, y) => { const cx = (m) => sum(m.map((a) => a.p[0])) / m.length; return Math.abs(cx(y) - +t.x) < Math.abs(cx(x) - +t.x) ? y : x; });
    assert.ok(c.every((a) => a.p[1] < +t.y) && Math.abs(sum(c.map((a) => a.p[0])) / c.length - +t.x) < 20, "nhãn ngay dưới mạch");
    const lk = sum(c.map((a) => a.lk.length)) / 2, nhanh = Math.max(...c.map((a) => a.lk.length)) >= 3;
    return { nhan: t.t, loai: lk >= c.length ? "mạch vòng" : nhanh ? "mạch hở, phân nhánh" : "mạch hở, không phân nhánh" };
  });
};

/* Biểu đồ cột: số trên trục đứng (chữ căn phải, sát trục) cách đều; vạch lưới màu line ở mỗi nửa khoảng chia; cột là hình chữ nhật đặt
   trên trục ngang, tô màu theo chú thích (ô màu nhỏ, chữ ngay bên phải); tên vị trí (A, B, C) ghi dưới mỗi nhóm cột. Đỉnh cột nằm trên
   một vạch lưới. Trả về { A: { "Thế năng": 300, "Động năng": 50 }, … }. */
const docCot = (svg) => {
  const T = texts(svg), so = T.filter((t) => /^\d+$/.test(t.t) && t["text-anchor"] === "end").map((t) => ({ v: +t.t, y: +t.y - 5 })).sort((a, b) => a.v - b.v);
  assert.ok(so.length >= 3, "trục đứng có số");
  const k = (so[1].y - so[0].y) / (so[1].v - so[0].v), y0 = so[0].y - k * so[0].v; // y = y0 + k·v (k < 0)
  so.forEach((s) => assert.ok(Math.abs(s.y - (y0 + k * s.v)) < 0.2, "số trên trục cách đều"));
  const truc = tags(svg, "line").filter((l) => l.stroke === "ink" && l.y1 === l.y2);
  assert.ok(truc.length === 1 && Math.abs(num(truc[0], "y1") - y0) < 0.2, "trục ngang ở vạch 0");
  const luoi = tags(svg, "line").filter((l) => l.stroke === "line").map((l) => num(l, "y1"));
  const rect = tags(svg, "rect"), chuThich = rect.filter((r) => num(r, "width") === num(r, "height")), cot = rect.filter((r) => num(r, "width") !== num(r, "height"));
  const ten = {}; chuThich.forEach((r) => { const t = T.filter((t) => Math.abs(+t.y - 5 - (num(r, "y") + num(r, "height") / 2)) < 4 && +t.x > num(r, "x") && +t.x - num(r, "x") < 30); assert.equal(t.length, 1, "ô chú thích có chữ"); ten[r.fill] = t[0].t; });
  const viTri = T.filter((t) => /^[A-Z]$/.test(t.t) && +t.y > y0), ra = {};
  viTri.forEach((t) => (ra[t.t] = {}));
  cot.forEach((r) => {
    assert.ok(ten[r.fill], "màu cột có trong chú thích");
    const day = num(r, "y") + num(r, "height"), dinh = num(r, "y"), v = (dinh - y0) / k;
    assert.ok(Math.abs(day - y0) < 0.2, "cột đặt trên trục ngang");
    assert.ok(luoi.some((y) => Math.abs(y - dinh) < 0.2), "đỉnh cột nằm trên một vạch lưới");
    const cx = num(r, "x") + num(r, "width") / 2, vt = viTri.reduce((x, t) => (Math.abs(+t.x - cx) < Math.abs(+x.x - cx) ? t : x));
    const soCot = T.filter((t) => t["text-anchor"] === "middle" && /^\d+$/.test(t.t) && Math.abs(+t.x - cx) < 0.5 && dinh - +t.y > 0 && dinh - +t.y < 10);
    assert.ok(soCot.length === 1 && close(+soCot[0].t, tron(v, 6), 1e-6), "số ghi trên đỉnh cột khớp chiều cao cột");
    assert.ok(Math.abs(+vt.x - cx) < 30, "cột ở ngay trên tên vị trí");
    ra[vt.t][ten[r.fill]] = tron(v, 6);
  });
  return ra;
};

/* Khung tổ hợp giao tử (như tests/khtn9-ck1.js): giao tử là chữ trong hình tròn, ở hàng trên (của một cây) và cột trái (của cây kia);
   ô tổ hợp là hình chữ nhật tô bg, để trống hoặc ghi đúng tổ hợp. */
const ghep = (a, b) => [...a, ...b].sort((x, y) => (x.toLowerCase() === y.toLowerCase() ? (x < y ? -1 : 1) : x.toLowerCase() < y.toLowerCase() ? -1 : 1)).join("");
const docKhung = (svg) => {
  const T = texts(svg), gt = tags(svg, "circle").map((c) => { const p = [num(c, "cx"), num(c, "cy")], t = T.filter((t) => close(+t.x, p[0]) && close(+t.y - 5, p[1]));
    assert.equal(t.length, 1, "mỗi giao tử ghi một chữ"); return { p, g: t[0].t }; });
  const yTren = Math.min(...gt.map((g) => g.p[1])), xTrai = Math.min(...gt.map((g) => g.p[0]));
  const tren = gt.filter((g) => close(g.p[1], yTren)).sort((a, b) => a.p[0] - b.p[0]), trai = gt.filter((g) => close(g.p[0], xTrai)).sort((a, b) => a.p[1] - b.p[1]);
  assert.equal(tren.length + trai.length, gt.length, "giao tử chỉ ở hàng trên và cột trái");
  const o = tags(svg, "rect").filter((r) => r.fill === "bg");
  assert.equal(o.length, tren.length * trai.length, "đủ ô tổ hợp");
  const con = o.map((r) => {
    const x0 = num(r, "x"), y0 = num(r, "y"), x1 = x0 + num(r, "width"), y1 = y0 + num(r, "height");
    const cot = tren.filter((g) => g.p[0] > x0 && g.p[0] < x1), hang = trai.filter((g) => g.p[1] > y0 && g.p[1] < y1), t = T.filter((t) => +t.x > x0 && +t.x < x1 && +t.y > y0 && +t.y < y1);
    assert.ok(cot.length === 1 && hang.length === 1 && t.length <= 1, "mỗi ô ở đúng một cột, một hàng, ghi nhiều nhất một tổ hợp");
    if (t.length) assert.equal(t[0].t, ghep(cot[0].g, hang[0].g), "ô ghi đúng tổ hợp của giao tử ở cột và hàng của ô");
    return { k: ghep(cot[0].g, hang[0].g), trong: !t.length };
  });
  const tieuDe = /<title>([^<]*)<\/title>/.exec(svg);
  return { tren: tren.map((g) => g.g), trai: trai.map((g) => g.g), con: con.map((c) => c.k), trong: con.filter((c) => c.trong).length, tieuDe: tieuDe ? tieuDe[1] : "" };
};

/* ---------- hoá học: công thức (chữ số dưới dòng), khối lượng mol, phương trình ---------- */
const sub2n = (s) => [...s].map((c) => SUB.indexOf(c)).join("");
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
const NTK = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 64, Zn: 65, Br: 80, Ag: 108 };
const KL = (f, nt = NTK) => Object.entries(congThuc(f)).reduce((s, [e, c]) => { assert.ok(e in nt, "thiếu nguyên tử khối của " + e); return s + nt[e] * c; }, 0);
const VE = /\d*\(?[A-Z][A-Za-z₀-₉()]*/.source, PT = new RegExp(`${VE}(?: \\+ ${VE})* (?:→|⇌) ${VE}(?: \\+ ${VE})*`, "g");
const ve = (s) => s.split(" + ").map((t) => { const m = /^(\d*)(\S+)$/.exec(t.trim()); return { k: m[1] ? +m[1] : 1, f: m[2] }; });
const tach = (pt) => pt.split(/ (?:→|⇌) /).map(ve);
const canBang = (pt) => { const dem = (v) => { const o = {}; v.forEach(({ k, f }) => Object.entries(congThuc(f)).forEach(([e, c]) => (o[e] = (o[e] || 0) + k * c))); return o; };
  const [a, b] = tach(pt).map(dem); return [...new Set([...Object.keys(a), ...Object.keys(b)])].every((e) => a[e] === b[e]); };
const heSo = (pt, f) => { const c = tach(pt).flat().filter((v) => v.f === f); assert.equal(c.length, 1, f + " có đúng một lần trong " + pt); return c[0].k; };
const molTheoPT = (pt, x, nx, y) => (nx * heSo(pt, y)) / heSo(pt, x);
const ptCua = (q, x, y) => { const p = (q.x.match(PT) || []).filter((s) => tach(s).flat().some((v) => v.f === x) && tach(s).flat().some((v) => v.f === y));
  assert.equal(p.length, 1, "lời giải có đúng một phương trình chứa " + x + " và " + y); return p[0]; };
// nguyên tử khối đề cho: “Cho C = 12, H = 1, O = 16.”; phải đúng bảng nguyên tử khối
const ntDe = (q) => { const m = /Cho ((?:[A-Z][a-z]? = \d+(?:,\d+)?(?:, )?)+)/.exec(q.q); assert.ok(m, "đề cho nguyên tử khối"); const nt = {};
  [...m[1].matchAll(/([A-Z][a-z]?) = (\d+(?:,\d+)?)/g)].forEach((k) => { nt[k[1]] = val(k[2]); assert.equal(nt[k[1]], NTK[k[1]], "nguyên tử khối của " + k[1]); }); return nt; };
// alkane CₙH₂ₙ₊₂ (n ≥ 1), alkene CₙH₂ₙ (n ≥ 2)
const laAlkane = (f) => { const c = congThuc(f); return Object.keys(c).every((e) => e === "C" || e === "H") && c.H === 2 * c.C + 2; };

/* ---------- sinh học: liệt kê mọi tổ hợp giao tử ---------- */
// giao tử của một kiểu gene viết theo từng cặp (“AaBb” → AB, Ab, aB, ab; mỗi giao tử nhận một allele của mỗi cặp)
const giaoTu = (kg) => { const cap = kg.match(/[A-Za-z]{2}/g); return cap.reduce((acc, c) => acc.flatMap((g) => [g + c[0], g + c[1]]), [""]); };
const doiCon = (p1, p2) => giaoTu(p1).flatMap((x) => giaoTu(p2).map((y) => ghep(x, y)));
const coTroi = (kg, a) => kg.includes(a.toUpperCase());

/* ---------- các câu cần tính ----------
   id: đề chứa câu (de1, de2, own); has: đoạn chữ của đề; right(q): đáp án tính bằng code. */
const so = (q, re) => { const m = re.exec(q.q); assert.ok(m, "đề thiếu số liệu: " + re); return m.slice(1).map(val); };
const coX = (q, ...cum) => cum.forEach((c) => assert.ok(q.x.includes(c), "lời giải cần có “" + c + "”"));
const CHECKS = [
  /* ----- Vật lí ----- */
  { id: "de1", has: "Xe A có khối lượng gấp đôi xe B", right: (q) => {
    // m_A = 2m_B, v_A = v_B/2
    const r = (0.5 * 2 * (0.5 ** 2)) / 0.5; assert.ok(close(r, 0.5)); coX(q, "½ · 2m · (v/2)² = ¼mv²"); return "Động năng của xe A bằng một nửa động năng của xe B"; } },
  { id: "de1", has: "Động năng của quả bóng là bao nhiêu jun", right: (q) => {
    const [m, v] = so(q, /khối lượng ([\d,]+) kg bay với tốc độ (\d+) km\/h/), vs = (v * 1000) / 3600, W = 0.5 * m * vs * vs;
    coX(q, `${v} km/h = ${vn(v * 1000)} m : ${vn(3600)} s = ${vn(vs)} m/s`, `½ · ${vn(m)} · ${vn(vs)}² = ${vn(W)} (J)`); return W; } },
  { id: "de2", has: "Một quả bưởi khối lượng", right: (q) => {
    const [m1, h1, m2, h2] = so(q, /bưởi khối lượng ([\d,]+) kg ở trên cành cao (\d+) m và một quả dừa khối lượng ([\d,]+) kg ở trên ngọn cây cao (\d+) m/);
    const W1 = 10 * m1 * h1, W2 = 10 * m2 * h2, [a, b, c, d] = q.o;
    const [Wa] = so({ q: a }, /quả bưởi là (\d+) J/), [k] = so({ q: c }, /gấp (\d+) lần/), [hd] = so({ q: d }, /tới độ cao (\d+) m/);
    assert.ok(/nhỏ hơn/.test(b) && /chỉ còn một nửa/.test(d), "thứ tự các ý");
    return [close(Wa, W1), W2 < W1, close(W2 / W1, k), close(10 * m2 * hd, W2 / 2)]; } },
  { id: "de2", has: "Một chậu cây cảnh có khối lượng", right: (q) => {
    const [m, h1, h0] = so(q, /khối lượng (\d+) kg đặt trên sàn ban công tầng ba, sàn này cao hơn mặt đất ([\d,]+) m\. Gốc thế năng được chọn tại mặt sàn tầng hai, sàn này cao hơn mặt đất ([\d,]+) m/);
    const h = h1 - h0; coX(q, `h = ${vn(h1)} − ${vn(h0)} = ${vn(h)} (m)`, `P = 10 · ${m} = ${vn(10 * m)} (N)`); return 10 * m * h; } },
  { id: "own", has: "Một viên đạn khối lượng", right: (q) => {
    const [m1, v1, m2, v2] = so(q, /viên đạn khối lượng (\d+) g bay với tốc độ (\d+) m\/s; một quả bóng khối lượng ([\d,]+) kg bay với tốc độ (\d+) m\/s/);
    const W1 = 0.5 * (m1 / 1000) * v1 * v1, W2 = 0.5 * m2 * v2 * v2; coX(q, `= ${vn(W1)} (J)`, `= ${vn(W2)} (J)`);
    assert.ok(m2 > m1 / 1000 && W1 > W2, "vật nhẹ hơn lại có động năng lớn hơn");
    return "Viên đạn có động năng lớn hơn quả bóng"; } },
  { id: "own", has: "Một quả mít treo trên cành cây", right: (q) => {
    const [h, W] = so(q, /cách mặt đất ([\d,]+) m\. Chọn gốc thế năng tại mặt đất thì thế năng trọng trường của quả mít là (\d+) J/);
    return vn(W / h / 10) + " kg"; } },
  { id: "de1", has: "Một vận động viên nhảy dù", right: (q) => {
    // tốc độ không đổi: Wđ không đổi; độ cao giảm: Wt giảm; cơ năng = Wđ + Wt giảm; tại gốc thế năng Wt = 0
    const [h1, h2] = so({ q: q.o[1] }, /Ở độ cao (\d+) m, thế năng nhỏ hơn ở độ cao (\d+) m/);
    assert.ok(q.q.includes("tốc độ không đổi") && /^Động năng không thay đổi/.test(q.o[0]) && /^Cơ năng không thay đổi/.test(q.o[2]) && /thế năng bằng 0/.test(q.o[3]), "thứ tự các ý");
    return [true, h1 < h2, false, true]; } },
  { id: "de1", has: "Một quả táo có khối lượng", right: (q) => {
    const [m, h] = so(q, /khối lượng ([\d,]+) kg rơi từ cành cây cao ([\d,]+) m/), W = 10 * m * h, v = Math.sqrt((2 * W) / m);
    coX(q, `Wt = Ph = 10 · ${vn(m)} · ${vn(h)} = ${vn(W)} (J)`, `v² = ${vn(v * v)}`); return v; } },
  { id: "de2", has: "một viên bi có khối lượng", right: (q) => {
    const [g, v] = so(q, /khối lượng (\d+) g được bắn lên theo phương thẳng đứng với tốc độ (\d+) m\/s/), m = g / 1000, W = 0.5 * m * v * v;
    coX(q, `Wđ = ½ · ${vn(m)} · ${v}² = ${vn(W)} (J)`, `P = 10 · ${vn(m)} = ${vn(10 * m)} (N)`); return W / (10 * m); } },
  { id: "own", has: "Một bạn trượt ván trên một đường trượt", right: (q) => {
    const B = docCot(q.svg); assert.deepEqual(Object.keys(B).sort(), ["A", "B", "C"], "ba vị trí A, B, C");
    assert.ok(B.A["Thế năng"] && B.A["Động năng"] && B.C["Thế năng"] && !B.C["Động năng"] && !B.B["Động năng"], "biểu đồ có thế năng tại A, B, C và động năng tại A");
    const W = B.A["Thế năng"] + B.A["Động năng"]; coX(q, `tại A thế năng ${B.A["Thế năng"]} J, động năng ${B.A["Động năng"]} J; tại C thế năng ${B.C["Thế năng"]} J`);
    return W - B.C["Thế năng"]; } },
  { id: "de2", has: "Đơn vị nào sau đây là đơn vị đo công suất", right: () => "Mã lực (HP)" },
  { id: "own", has: "1 MW bằng", right: () => vn(1e6) + " W" },
  { id: "de1", has: "Công suất của người đó là bao nhiêu oát", right: (q) => {
    const [F, s, t] = so(q, /trọng lượng (\d+) N từ đáy giếng lên miệng giếng, quãng đường kéo là (\d+) m, hết (\d+) s/);
    coX(q, `A = F · s = ${F} · ${s} = ${vn(F * s)} (J)`, `${vn(F * s)} : ${t} = ${vn((F * s) / t)} (W)`); return (F * s) / t; } },
  { id: "de2", has: "Động cơ của một thang máy", right: (q) => {
    const [m, s, t] = so(q, /khối lượng tổng cộng (\d+) kg\) đi lên đều được (\d+) m trong (\d+) s/), F = 10 * m;
    coX(q, `F = P = 10 · ${m} = ${vn(F)} (N)`, `A = F · s = ${vn(F)} · ${s} = ${vn(F * s)} (J)`); return (F * s) / t; } },
  { id: "own", has: "Bạn Hùng có khối lượng", right: (q) => {
    const k = /khối lượng (\d+) kg chạy lên cầu thang từ tầng (\S+) lên tầng (\S+) của một toà nhà, mỗi tầng cao ([\d,]+) m, hết (\d+) s/.exec(q.q);
    assert.ok(k, "đề thiếu số liệu");
    const SO = { "một": 1, "hai": 2, "ba": 3, "bốn": 4, "năm": 5 }, tang = SO[k[3]] - SO[k[2]], m = val(k[1]), h1 = val(k[4]), t = val(k[5]), h = tang * h1, A = 10 * m * h;
    coX(q, `h = ${tang} · ${vn(h1)} = ${vn(h)} (m)`, `A = ${vn(10 * m)} · ${vn(h)} = ${vn(A)} (J)`); return A / t; } },
  { id: "de1", has: "Tốc độ ánh sáng khi truyền trong loại thuỷ tinh này", right: (q) => {
    const [n, c] = so(q, /chiết suất ([\d,]+)\. Ánh sáng truyền trong chân không với tốc độ ([\d ]+) km\/s/); return vn(c / n) + " km/s"; } },
  { id: "de2", has: "Góc tới và góc khúc xạ lần lượt bằng", right: (q) => {
    assert.ok(q.q.includes("từ không khí vào thuỷ tinh"), "ánh sáng đi từ không khí vào thuỷ tinh");
    const h = docGocKhucXa(q.svg);
    assert.ok(h.tren.includes("Không khí") && h.duoi.includes("Thuỷ tinh"), "không khí ở trên, thuỷ tinh ở dưới");
    assert.ok(Math.abs(h.i - (90 - h.soToi)) < 0.5 && Math.abs(h.r - (90 - h.soKx)) < 0.5, "góc với pháp tuyến bằng 90° trừ số đo ghi trong hình");
    const n = Math.sin(h.i * RAD) / Math.sin(h.r * RAD);
    assert.ok(h.r < h.i && n > 1.45 && n < 1.6, "tia khúc xạ đúng định luật khúc xạ với chiết suất của thuỷ tinh (tính được " + n.toFixed(3) + ")");
    coX(q, `90° − ${h.soToi}° = ${90 - h.soToi}°`, `90° − ${h.soKx}° = ${90 - h.soKx}°`);
    return `${90 - h.soToi}° và ${90 - h.soKx}°`; } },
  /* ----- Hoá học ----- */
  { id: "de1", has: "Cho các chất có công thức: CH₄", right: (q) => {
    const ds = /công thức: ([^.]*)\./.exec(q.q)[1].split(", "), hc = ds.filter((f) => Object.keys(congThuc(f)).every((e) => e === "C" || e === "H"));
    const [a, b, c, d] = q.o, chu2 = { "hai": 2, "ba": 3, "bốn": 4, "năm": 5, "sáu": 6 };
    const [, ka] = /có (\S+) hydrocarbon/.exec(a), [, fb] = /^(\S+) là hydrocarbon/.exec(b), [, fc] = /^(\S+) là dẫn xuất/.exec(c), [, kd] = /chỉ có (\S+) hợp chất hữu cơ/.exec(d);
    const huuCo = ds.filter((f) => congThuc(f).C && !["CO", "CO₂"].includes(f) && !/CO₃/.test(f));
    return [chu2[ka] === hc.length, hc.includes(fb), ds.includes(fc) && !hc.includes(fc), chu2[kd] === huuCo.length]; } },
  { id: "de2", has: "Công thức phân tử C₃H₈O cho biết", right: (q) => {
    const c = congThuc("C₃H₈O"); return `Phân tử có ${c.C} nguyên tử C, ${c.H} nguyên tử H, ${c.O} nguyên tử O`; } },
  { id: "de2", has: "Cách viết thu gọn đúng của công thức này là", right: (q) => {
    const h = docCongThuc(q.svg), dung = q.o.filter((o) => { const g = thuGon(o); return g && giongNhau(g, h.g); });
    assert.equal(dung.length, 1, "đúng một công thức thu gọn khớp hình");
    assert.equal(h.ct, "C₂H₇N"); return dung[0]; } },
  { id: "own", has: "Hình bên chỉ vẽ mạch carbon", right: (q) => docMach(q.svg).map((m) => `${m.nhan} ${m.loai}`).join("; ") },
  { id: "de2", has: "Alkane có công thức cấu tạo thu gọn", right: (q) => {
    // tên alkane C1–C4 theo số nguyên tử carbon (Bảng 23.1 của sách)
    const g = thuGon(/thu gọn (\S+) có tên/.exec(q.q)[1]); assert.ok(g && g.every((x) => x.e === "C"), "mạch carbon chỉ có liên kết đơn");
    return { 1: "methane", 2: "ethane", 3: "propane", 4: "butane" }[g.length]; } },
  { id: "de1", has: "Đốt cháy hoàn toàn một alkane X trong oxygen", right: (q) => {
    const [nC, nH2O] = so(q, /thu được ([\d,]+) mol khí carbon dioxide và ([\d,]+) mol nước/);
    const dung = q.o.filter((f) => { const c = congThuc(f); return laAlkane(f) && close(c.C / c.H, nC / (2 * nH2O)); });
    assert.ok(q.o.every(laAlkane) && dung.length === 1, "các lựa chọn đều là alkane, đúng một chất có tỉ lệ C : H khớp");
    const pt = ptCua(q, dung[0], "CO₂"); assert.ok(close(heSo(pt, "CO₂") / heSo(pt, "H₂O"), nC / nH2O), "phương trình trong lời giải cho đúng tỉ lệ số mol CO₂ : H₂O");
    return dung[0]; } },
  { id: "de1", has: "Khối lượng bromine đã phản ứng", right: (q) => {
    const nt = ntDe(q), [m] = so(q, /có ([\d,]+) g ethylene đã phản ứng hết/), pt = ptCua(q, "C₂H₄", "Br₂");
    return tron(molTheoPT(pt, "C₂H₄", m / KL("C₂H₄", nt), "Br₂") * KL("Br₂", nt)); } },
  { id: "de2", has: "Một bếp gas du lịch dùng khí propane", right: (q) => {
    const nt = ntDe(q), [Q, m] = so(q, /1 mol propane toả ra khoảng ([\d ]+) kJ nhiệt\. Khi đốt cháy hết (\d+) g propane/), M = KL("C₃H₈", nt);
    coX(q, `${m} : ${M} = ${vn(m / M)} (mol)`); return (m / M) * Q; } },
  { id: "own", has: "Trong một tháng, một gia đình dùng hết", right: (q) => {
    const nt = ntDe(q), [kg] = so(q, /dùng hết ([\d,]+) kg khí propane/), pt = ptCua(q, "C₃H₈", "CO₂");
    return tron((molTheoPT(pt, "C₃H₈", (kg * 1000) / KL("C₃H₈", nt), "CO₂") * KL("CO₂", nt)) / 1000); } },
  { id: "de2", has: "Hiệu suất của quá trình trùng hợp là", right: (q) => {
    // trùng hợp không tạo ra chất nào khác: khối lượng polymer theo lí thuyết bằng khối lượng monomer
    const [m0, m1] = so(q, /Trùng hợp ([\d,]+) tấn ethylene thì thu được ([\d,]+) tấn polyethylene/); return vn(tron((m1 / m0) * 100)) + "%"; } },
  { id: "own", has: "Alkene X có mạch carbon gồm", right: (q) => {
    const n = { "hai": 2, "ba": 3, "bốn": 4, "năm": 5 }[/gồm (\S+) nguyên tử/.exec(q.q)[1]]; return "C" + chiSo(n) + "H" + chiSo(2 * n); } },
  { id: "own", has: "Dẫn 0,4 mol hỗn hợp khí gồm methane và ethylene", right: (q) => {
    const nt = ntDe(q), [n, dm] = so(q, /Dẫn ([\d,]+) mol hỗn hợp khí gồm methane và ethylene .* khối lượng bình tăng thêm ([\d,]+) g/), pt = ptCua(q, "C₂H₄", "Br₂");
    assert.equal(heSo(pt, "C₂H₄"), 1); const nE = dm / KL("C₂H₄", nt); return tron(((n - nE) / n) * 100); } },
  { id: "de2", has: "Mỗi ý sau về ethylene và polyethylene", right: (q) => {
    const pt = ptCua(q, "C₂H₄", "CO₂"), [a, b, c, d] = q.o, [kd] = so({ q: d }, /thu được (\d+) mol khí carbon dioxide/);
    assert.ok(/hơi nước và khí carbon dioxide/.test(a) && /–CH₂–CH₂–/.test(b) && /ethylic alcohol/.test(c) && /^Đốt cháy hoàn toàn 1 mol ethylene/.test(d), "thứ tự các ý");
    return [tach(pt)[1].map((v) => v.f).sort().join() === "CO₂,H₂O", true, true, molTheoPT(pt, "C₂H₄", 1, "CO₂") === kd]; } },
  /* ----- Sinh học ----- */
  { id: "de1", has: "thuần chủng về cả hai cặp gene", right: (q) => q.o.filter((kg) => kg.match(/[A-Za-z]{2}/g).every((c) => c[0] === c[1]))[0] },
  { id: "de1", has: "Cho một chuột đực lông đen X giao phối", right: (q) => {
    // chuột cái lông trắng aa; con toàn lông đen: X không thể là Aa (Aa × aa cho 1/2 aa)
    const X = ["AA", "Aa"].filter((kg) => doiCon(kg, "aa").every((k) => coTroi(k, "a")));
    assert.deepEqual(X, ["AA"]); const con = doiCon("AA", "aa");
    const [a, b, c, d] = q.o; assert.ok(/con có kiểu gene đồng hợp/.test(a) && /X có kiểu gene AA/.test(b) && /một loại giao tử/.test(c) && /kiểu gene aa/.test(d), "thứ tự các ý");
    return [con.every((k) => k[0] === k[1]), true, new Set(giaoTu("AA")).size === 1, true]; } },
  { id: "de1", has: "Lai cây AaBb với cây aabb", right: (q) => {
    const [N] = so(q, /thu được (\d+) cây con/), F = doiCon("AaBb", "aabb"), k = F.filter((g) => !coTroi(g, "a") && coTroi(g, "b")).length;
    assert.ok(/thân thấp, hạt tròn/.test(q.q)); return (N * k) / F.length; } },
  { id: "de2", has: "Cho cây có kiểu gene Aa tự thụ phấn", right: () => {
    const F = doiCon("Aa", "Aa"), d = (k) => F.filter((g) => g === k).length; return `${d("AA")} AA : ${d("Aa")} Aa : ${d("aa")} aa`; } },
  { id: "de2", has: "Khung tổ hợp giao tử ở hình bên", right: (q) => {
    const K = docKhung(q.svg), [N] = so(q, /Đời con có (\d+) cây/);
    assert.ok(/chưa điền/.test(q.q) && K.trong === K.con.length, "các ô của khung để trống, học sinh tự điền");
    assert.deepEqual([...new Set(giaoTu("Aabb"))].sort(), [...K.tren].sort(), "hàng trên là giao tử của cây Aabb");
    assert.deepEqual([...new Set(giaoTu("aaBb"))].sort(), [...K.trai].sort(), "cột trái là giao tử của cây aaBb");
    assert.ok(/hàng trên là hai loại giao tử Ab và ab của cây thân cao, hoa trắng; cột trái là hai loại giao tử aB và ab của cây thân thấp, hoa đỏ/.test(K.tieuDe), "chú thích của hình");
    const troi = K.con.filter((k) => coTroi(k, "a") || coTroi(k, "b")).length; coX(q, `${K.con.length} tổ hợp`);
    return (N * troi) / K.con.length; } },
  { id: "own", has: "Xét một cây có kiểu gene AaBB", right: (q) => {
    const G = giaoTu("AaBB"), loai = [...new Set(G)], [a, b, c, d] = q.o, chu2 = { "hai": 2, "ba": 3, "bốn": 4 };
    assert.ok(/tạo ra (\S+) loại giao tử/.test(a) && /thuần chủng/.test(b) && /Giao tử aB chiếm tỉ lệ 1\/2/.test(c) && /thân thấp, hoa đỏ/.test(d), "thứ tự các ý");
    return [chu2[/tạo ra (\S+) loại/.exec(a)[1]] === loai.length, ["Aa", "BB"].every((p) => p[0] === p[1]), close(G.filter((g) => g === "aB").length / G.length, 1 / 2), !coTroi("AaBB", "a") && coTroi("AaBB", "b")]; } },
  { id: "own", has: "Lai cây AaBb với cây Aabb", right: (q) => {
    const [N] = so(q, /thu được (\d+) cây con/), F = doiCon("AaBb", "Aabb"), k = F.filter((g) => !coTroi(g, "a") && !coTroi(g, "b")).length;
    assert.ok(/quả chua, vỏ dày/.test(q.q)); const l1 = new Set(giaoTu("AaBb")).size, l2 = new Set(giaoTu("Aabb")).size; coX(q, `${l1} · ${l2} = ${l1 * l2} kiểu tổ hợp`); return (N * k) / F.length; } },
  { id: "de2", has: "Ở cà chua", right: (q) => {
    const [a, b, c, d] = q.o; assert.ok(/Aa cho quả đỏ/.test(a) && /aa là cây thuần chủng/.test(b) && /chắc chắn có cùng kiểu gene/.test(c) && /đều là kiểu gene dị hợp/.test(d), "thứ tự các ý");
    const doCay = ["AA", "Aa"].filter((k) => coTroi(k, "a"));
    return [coTroi("Aa", "a"), "aa"[0] === "aa"[1], doCay.length === 1, ["AA", "aa"].every((k) => k[0] !== k[1])]; } },
  { id: "de1", has: "Một gene dài", right: (q) => {
    const [L] = so(q, /Một gene dài ([\d ]+) Å/); coX(q, "34 Å", "10 cặp nucleotide", `${vn(L)} : 3,4 = ${vn(L / 3.4)}`); return (2 * L) / 3.4; } },
  { id: "de2", has: "liên kết hydrogen", right: (q) => {
    const [A, G] = so(q, /có (\d+) nucleotide loại A và (\d+) nucleotide loại G/); coX(q, `2 · ${A} + 3 · ${G} = ${vn(2 * A + 3 * G)}`); return 2 * A + 3 * G; } },
  { id: "own", has: "nucleotide loại A chiếm", right: (q) => {
    const [N, pA] = so(q, /Một gene có ([\d ]+) nucleotide, trong đó nucleotide loại A chiếm (\d+)%/); return (N * (100 - 2 * pA)) / 2 / 100; } }
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
// bộ đọc hình bắt được hình cố ý vẽ sai: số đo ghi lệch góc vẽ, đỉnh cột không ở vạch lưới, công thức sai hoá trị
{
  const hinh = (has) => kho.find((q) => q.q.includes(has)).svg;
  assert.throws(() => docGocKhucXa(hinh("Góc tới và góc khúc xạ lần lượt bằng").replace(">50°<", ">55°<")), /bằng góc vẽ/);
  assert.throws(() => docCot(hinh("Một bạn trượt ván").replace(/height="19"/, 'height="23"')), /vạch lưới|trục ngang/);
  assert.throws(() => docCongThuc(hinh("Cách viết thu gọn đúng của công thức này là").replace(/<line [^>]*\/>/, "")), /hoá trị|liên kết/);
  assert.equal(thuGon("CH₃–CH₂–NH₃"), null); assert.equal(thuGon("CH₂–CH₃–NH₂"), null);
  assert.ok(giongNhau(thuGon("CH₃–CH₂–NH₂"), thuGon("NH₂–CH₂–CH₃")) && !giongNhau(thuGon("CH₃–CH₂–NH₂"), thuGon("CH₃–NH–CH₃")));
}

/* ---------- chữ ---------- */
function chu(q) { return [q.q, q.x].concat(q.o || [], q.unit || []).map(String); }
// 12 chủ đề theo thứ tự bài của sách: [chữ chủ đề, bài, phân môn]
const CHU_DE = [["Nhận biết một số dụng cụ, hoá chất", 1, "Bài 1"], ["Động năng. Thế năng", 2, "Vật lí"], ["Cơ năng", 3, "Vật lí"], ["Công và công suất", 4, "Vật lí"],
  ["Khúc xạ ánh sáng", 5, "Vật lí"], ["Giới thiệu về hợp chất hữu cơ", 22, "Hoá học"], ["Alkane", 23, "Hoá học"], ["Alkene", 24, "Hoá học"], ["Nguồn nhiên liệu", 25, "Hoá học"],
  ["Khái quát về di truyền học", 36, "Sinh học"], ["Các quy luật di truyền của Mendel", 37, "Sinh học"], ["Nucleic acid và gene", 38, "Sinh học"]];
const PHAM_VI = { "Vật lí": "Bài 2–5", "Hoá học": "Bài 22–25", "Sinh học": "Bài 36–38" };
const monCua = (t) => CHU_DE.find((c) => c[0] === t)[2];
kho.forEach((q) => {
  const at = q.src + ": " + q.q.slice(0, 50);
  chu(q).forEach((s) => {
    // công thức hoá học viết bằng chữ số dưới dòng (C₂H₄, F₁), không viết C2H4, F1
    assert.ok(!/(?:^|[^A-Za-z])(?:[A-Z][a-z]?)+\d/.test(s.replace(/\d+(?:,\d+)? (?:mL|mol|g|L|kg|W|J|m|N|MW|kW|HP)\b/g, "")), at + ": công thức cần chữ số dưới dòng: " + s);
    // tên chất như sách (ethylene, nước bromine, carbon dioxide…), không dùng tên kiểu cũ hay tên khác
    assert.ok(!/(?<![\p{L}])(?:etilen|metan|etan|propan|butan|axit|axetic|polietilen|polime|monome|brom|hiđro|hidro|cacbon|oxi|nitơ|clo|benzen|ethanol|ethene|propene|natri|canxi|đioxit|anken|ankan|xăng dầu hoả)(?![\p{L}])/iu.test(s), at + ": tên chất, thuật ngữ khác sách: " + s);
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
// bộ đọc phương trình bắt được phương trình chưa cân bằng
assert.ok(canBang("C₂H₄ + 3O₂ → 2CO₂ + 2H₂O") && canBang("2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O") && !canBang("C₂H₄ + 2O₂ → 2CO₂ + 2H₂O") && !canBang("C₃H₈ + 4O₂ → 3CO₂ + 4H₂O"));
assert.equal(KL("C₂H₄Br₂"), 188); assert.equal(KL("C₃H₈"), 44);
// câu Bài 1, Vật lí, Sinh học không có phương trình hoá học
kho.filter((q) => monCua(q.topic) !== "Hoá học").forEach((q) => chu(q).forEach((s) => assert.ok(!(s.match(PT) || []).length, "phương trình hoá học trong câu " + monCua(q.topic) + ": " + s)));

/* ---------- mức độ, ma trận, phân môn, lời dặn, lịch thi ---------- */
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const M = pool.pool.matrix, cells = Object.values(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), pool.n, "tổng ma trận bằng n");
assert.deepEqual(Object.keys(M), CHU_DE.map((c) => c[0]), "chủ đề theo thứ tự bài của sách");
[S.de1, S.de2, S.own].forEach((id) => assert.deepEqual([...new Set(kho.filter((q) => q.src === id).map((q) => q.topic))], Object.keys(M), id + ": đủ chủ đề, đúng thứ tự"));
// hai đề cố định và câu riêng đều chia đúng ma trận, nên ô nào cũng có gấp ba số câu ô đó rút
[S.de1, S.de2, S.own].forEach((id) => Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => kho.filter((q) => q.src === id && q.topic === t && q.lv === l).length), v, id + " đúng ma trận ở chủ đề " + t)));
// 11 chủ đề của các bài chung đúng chữ chủ đề của kho cuối kì I (đề “Ôn chủ đề” rút chung); Bài 1 chỉ có ở kho này
CHU_DE.forEach(([t, b]) => assert.equal(t in ck1.pool.matrix, b !== 1, (b !== 1 ? "chủ đề phải đúng chữ của kho cuối kì I: " : "chủ đề Bài 1 không có ở kho cuối kì I: ") + t));
// Bài 1 chỉ 2 câu, đều ở mức Biết (ô rút 2 câu); các ô khác rút nhiều nhất 1 câu
assert.deepEqual(M[CHU_DE[0][0]], [2, 0, 0], "Bài 1: 2 câu Biết");
assert.ok(Object.entries(M).filter(([t]) => t !== CHU_DE[0][0]).every(([, v]) => v.every((k) => k <= 1)), "các ô khác rút nhiều nhất 1 câu");
// số câu Bài 1 và mỗi phân môn đúng như lời dặn của đề
const theoMon = ["Vật lí", "Hoá học", "Sinh học"].map((m) => [m, sum(Object.entries(M).filter(([t]) => monCua(t) === m).map(([, v]) => sum(v)))]);
const soBai1 = sum(M[CHU_DE[0][0]]);
[S.de1, S.de2].forEach((id) => {
  assert.ok(new RegExp(`Bài 1 \\([^)]*\\) ${soBai1} câu`).test(bank(id).note), id + ": lời dặn ghi Bài 1 " + soBai1 + " câu");
  theoMon.forEach(([m, k]) => assert.ok(new RegExp(`${m} ${PHAM_VI[m]} \\([^)]*\\) ${k} câu`).test(bank(id).note), id + ": lời dặn ghi " + m + " " + k + " câu"));
});
assert.ok(bank(S.own).note.includes(`mỗi lần rút ${soBai1} câu Bài 1, ` + theoMon.map(([m, k]) => k + " câu " + m).join(", ")), "lời dặn của đề ngẫu nhiên ghi số câu mỗi phân môn");
theoMon.forEach(([m]) => assert.ok(bank(S.own).note.includes(`${m} ${PHAM_VI[m]}`), "lời dặn của đề ngẫu nhiên ghi phạm vi " + m));
// đề giữa kì: lời dặn nhắc đối chiếu đề cương của trường, không có câu về đề chung của Sở; ba đề gắn vào gk1-l9, phạm vi KHTN khớp lời dặn
[S.de1, S.de2, S.own].forEach((id) => assert.ok(/đối chiếu với đề cương của trường/.test(bank(id).note) && !/Sở GD&ĐT/.test(bank(id).note), id + ": lời dặn nhắc đề cương của trường, không nói đề chung của Sở"));
{
  const ctxL = vm.createContext({ window: {} }); vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ctxL);
  const e = ctxL.window.ONTAP_SEED_EVENTS.find((x) => x.id === "gk1-l9");
  assert.ok(Object.values(S).every((id) => e.banks.includes(id)), "ba đề gắn vào gk1-l9");
  assert.ok(e.scope.includes("KHTN: Bài 1, " + Object.keys(PHAM_VI).map((m) => `${m} ${PHAM_VI[m]}`).join(", ")), "phạm vi KHTN của gk1-l9 khớp lời dặn");
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
// lời giải không nói “ý thứ hai”, “phương án A”: app xáo phương án (ý của câu đúng/sai giữ thứ tự a, b, c, d)
kho.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn|cách|câu) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của phương án: " + q.q.slice(0, 50)));
// câu số không nguyên dặn làm tròn đến chữ số thập phân thứ hai (phần Đáp án của app ghi hai chữ số)
kho.filter((q) => q.type === "num" && !Number.isInteger(q.ans * 10)).forEach((q) => assert.ok(/làm tròn kết quả đến chữ số thập phân thứ hai/i.test(q.q), "dặn làm tròn: " + q.q.slice(0, 50)));
// đơn vị ngắn (một hàng với ô nhập ở 360px); câu đếm không ghi đơn vị thì đề bài nói rõ đếm gì
kho.filter((q) => q.type === "num").forEach((q) => assert.ok(q.unit ? q.unit.length <= 6 : /bao nhiêu (nucleotide|liên kết hydrogen)/.test(q.q), "câu số có đơn vị ngắn hoặc đề bài nói rõ đếm gì: " + q.q.slice(0, 50)));
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
// đáp án đúng là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn (Rút ra N9-gk2-van); câu có các lựa
// chọn dài bằng nhau không tính
{
  const mc4 = kho.filter((q) => q.type === "mc" && q.o.length === 4 && new Set(q.o.map((o) => o.length)).size > 1);
  const le = mc4.filter((q) => { const L = q.o.map((o) => o.length); return L[0] > Math.max(...L.slice(1)) || L[0] < Math.min(...L.slice(1)); });
  assert.ok(le.length * 3 <= mc4.length, `đáp án đúng dài nhất hoặc ngắn nhất ở ${le.length}/${mc4.length} câu`);
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
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
{
  const deBai = BANKS.filter((b) => b.file === "9-khtn.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q) })));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
}

/* ---------- so với kho cuối kì I cùng chủ đề (đề “Ôn chủ đề” rút chung) ---------- */
const kho1 = ck1.questions;
const ten = new Map();
[S.de1, S.de2, S.own].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, (id === S.own ? "own" : id.slice(-3)) + "#" + (i + 1))));
[...ck1.pool.from, ck1.id].forEach((id) => kho1.filter((q) => q.src === id).forEach((q, i) => ten.set(q, "ck1-" + (id === ck1.id ? "own" : id.slice(-3)) + "#" + (i + 1))));
{
  // đáp án không trùng đáp án câu cùng chủ đề của kho cuối kì I
  kho.forEach((q) => kho1.filter((p) => p.topic === q.topic).forEach((p) => {
    if (q.type === "mc" && p.type === "mc") assert.notEqual(goc(q.o[0]), goc(p.o[0]), `${ten.get(q)} trùng đáp án với ${ten.get(p)}`);
    if (q.type === "num" && p.type === "num") assert.ok(!(close(q.ans, p.ans) && q.unit === p.unit), `${ten.get(q)} trùng đáp án số với ${ten.get(p)}`);
  }));
  // gần trùng (Rút ra N25; như tests/toan9-gk1.js): đề bài cùng các lựa chọn có từ 4 cặp hai âm tiết liền nhau chung với một câu của kho
  // cuối kì I và số cặp chung từ một nửa số cặp của câu ít cặp hơn thì báo. Không tính cặp có số hay chữ đơn, cặp của nhãn chủ đề, cụm
  // chung của đề (CUM) và cặp có ở từ 3% số câu của data/banks/9-khtn.js.
  const CUM = ["mỗi ý sau đúng hay sai", "nhận xét nào sau đây đúng", "chọn gốc thế năng tại mặt đất", "bỏ qua sức cản của không khí", "theo lí thuyết"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => c.split(" ").every((x) => /\p{L}{2}/u.test(x))); };
  const deKhtn9 = BANKS.filter((b) => b.file === "9-khtn.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)), df = {};
  deKhtn9.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nhan.has(c) && df[c] < 0.03 * deKhtn9.length)); };
  const gan = kho.flatMap((q) => { const c = capAm(q); return kho1.map((p) => { const d = capAm(p), chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${ten.get(p)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  assert.deepEqual(gan, [], "đề bài gần trùng câu của kho cuối kì I");
}

/* ---------- dò lộ đáp án ----------
   Giữa hai câu rút được cùng lúc (khác ô (chủ đề, mức), hoặc cùng ô Bài 1 rút 2 câu), và giữa mọi câu cùng chủ đề của kho này với nhau và
   với kho cuối kì I (đề “Ôn chủ đề” rút chung cả chủ đề). Đáp án là số (từ hai chữ số, hoặc số thập phân) tìm ở vị trí kết quả của câu
   kia (ngay sau “=”, “là”, “bằng”, “được”): không được có. Đáp án bằng chữ (lựa chọn đúng) tách thành các chuỗi 3 từ liền nhau (đáp án từ
   3 từ trở xuống thì lấy cả đáp án, Rút ra N19); chuỗi có trong đề bài, lựa chọn, lời giải của câu kia thì in ra với DO_LO=1 để xem tay,
   danh sách đã xem ở DA_XEM, DA_XEM_CHU_DE. */
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
const tuThuong = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
// cụm chung của môn, có ở nhiều câu: không tính là lộ đáp án
const CUM_CHUNG = ["động năng của", "thế năng của", "của xe a", "có động năng", "thế năng trọng", "năng trọng trường", "tính trạng trội", "tính trạng lặn",
  "là tính trạng", "trạng trội là", "mang tính trạng", "các nguyên tử", "nguyên tử c", "nguyên tử h", "1 nguyên tử", "3 nguyên tử", "phân tử có", "góc khúc xạ"];
const cum = (s) => { const w = tuThuong(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r.filter((c) => !CUM_CHUNG.includes(c)); };
const doLo = (qs, cungLuc, tenCau = (q) => ten.get(q)) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    const soDa = q.type === "num" && (q.ans >= 10 || !Number.isInteger(q.ans)) ? [q.ans] : [], C = q.type === "mc" ? [...new Set(cum(q.o[0]))] : [];
    qs.forEach((p) => {
      if (p === q || !cungLuc(p, q)) return;
      const at = `${tenCau(p)} → ${tenCau(q)}: `, T = " " + chu(p).map((s) => tuThuong(s).join(" ")).join(" | ") + " ";
      soDa.filter((x) => chu(p).flatMap(soKQ).some((y) => close(x, y))).forEach((x) => lo.push(at + x));
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
const cungLuc = (p, q) => p.topic !== q.topic || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2;
const { lo, chuLo } = doLo(kho, cungLuc);
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuLo.join("\n"));
// đã xem (Phiên N9-gk1-khtn): chữ chung, chữ của lựa chọn sai, hoặc chữ hoa, thường bị gộp; câu kia không nói tới điều câu này hỏi.
// “động năng lớn”: câu nhảy sào (vận động viên chạy lấy đà có động năng lớn), câu này so động năng của viên đạn và quả bóng; “6 kg”:
// “39,6 kg” của câu propane (dấu phẩy thập phân tách số); “di truyền và”: chữ chung của câu chức năng DNA và câu đối tượng của di truyền
// học; “bị phân huỷ”, “khi gặp ánh”: nhựa PE khó bị phân huỷ, lựa chọn sai “tự bốc cháy khi gặp ánh nắng” (câu này hỏi KMnO₄); “không
// phản ứng”, “phản ứng với”: methane không phản ứng với nước bromine, ethylene phản ứng với bromine (câu này hỏi alkane với acid, base;
// các lựa chọn sai không nói tới bromine); “aabb”: kiểu gene aabb (lặn) của các câu lai, đáp án là AAbb (chữ hoa bị gộp); “góc tới và
// góc khúc xạ”: câu đọc số đo góc trong hình (câu này hỏi vòng tròn chia độ dùng để làm gì; mọi lựa chọn đều nói về góc tới, góc khúc xạ).
const DA_XEM = [
  "own#5 → own#3: động năng lớn", "own#14 → own#4: 6 kg", "de2#19 → own#24: di truyền và", "de1#15 → de1#2: bị phân huỷ", "de1#15 → de1#2: khi gặp ánh",
  "own#16 → de1#13: không phản ứng", "own#16 → de1#13: phản ứng với", "de1#16 → de1#13: phản ứng với", "de1#2 → de1#15: bị phân huỷ", "own#22 → de1#20: aabb",
  "own#23 → de1#20: aabb", "de1#23 → de1#20: aabb", "de2#23 → de1#20: aabb", "de2#10 → de2#9: góc tới và", "de2#10 → de2#9: tới và góc", "de2#10 → de2#9: và góc khúc",
  "own#24 → de2#19: di truyền và"
];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n"));
// đề “Ôn chủ đề”: mọi cặp câu cùng chủ đề, ít nhất một câu của kho này
const loCD = (() => { const r = doLo(kho.concat(kho1), (p, q) => p.topic === q.topic && (kho.includes(p) || kho.includes(q))); return { lo: r.lo, chuLo: r.chuLo }; })();
if (process.env.DO_LO) console.log("Đáp án có ở câu cùng chủ đề của kho này, kho cuối kì I (xem tay):\n" + loCD.chuLo.join("\n"));
// đã xem (Phiên N9-gk1-khtn), cặp câu cùng chủ đề: “năng lớn hơn”, “năng của xe”, “bằng một nửa”: chữ chung khi so thế năng, động năng;
// “thông tin di truyền”: câu kho cuối kì I (hai đoạn DNA khác trình tự) nói trình tự nucleotide mang thông tin di truyền, câu này hỏi
// chức năng của DNA và có lựa chọn sai cũng nói về thông tin di truyền (của mRNA); “công cơ học”: câu kho cuối kì I hỏi trường hợp có công
// cơ học (câu này hỏi kcal đo đại lượng nào); “000 km s”: số 300 000 km/s; “dầu hoả”: câu kho cuối kì I kể các sản phẩm chưng cất, không
// nói dầu hoả dùng cho động cơ phản lực; “góc tới và góc khúc xạ”: như DA_XEM; “liên kết đôi”, “một liên kết”: câu alkene có một liên
// kết đôi (câu kho cuối kì I hỏi vì sao ethylene tham gia phản ứng cộng: liên kết kém bền); “biến dị”: câu đối tượng của di truyền học
// có chữ biến dị nhưng không nói thế nào là biến dị (câu kho cuối kì I hỏi chó con khác nhau là hiện tượng gì).
const DA_XEM_CHU_DE = [
  "ck1-own#1 → own#3: năng lớn hơn", "ck1-de1#22 → own#24: thông tin di", "ck1-de1#22 → own#24: tin di truyền", "de2#3 → de1#3: bằng một nửa", "ck1-de1#2 → de1#3: năng của xe",
  "ck1-de2#4 → de1#7: công cơ học", "ck1-de2#5 → de1#10: 000 km s", "ck1-de1#13 → de1#17: dầu hoả", "de2#10 → de2#9: góc tới và", "de2#10 → de2#9: tới và góc",
  "de2#10 → de2#9: và góc khúc", "own#15 → ck1-de2#12: liên kết đôi", "own#15 → ck1-de2#12: chứa một liên", "own#15 → ck1-de2#12: một liên kết", "de2#19 → ck1-de2#20: biến dị"
];
assert.deepEqual(loCD.chuLo, DA_XEM_CHU_DE, "đáp án bằng chữ có ở câu cùng chủ đề đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM_CHU_DE");
assert.deepEqual(loCD.lo, [], "lộ đáp án giữa câu cùng chủ đề:\n" + loCD.lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 67,5”, “là 160”, cụm của đáp án bằng chữ
{
  const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x }), khac = tim("Trong tế bào, loại RNA nào");
  const thuLo = (qs) => { const r = doLo(qs, () => true, (q) => q.q.slice(0, 12)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  assert.deepEqual(thuLo([tim("Động năng của quả bóng là bao nhiêu jun"), gia(khac, "Ví dụ Wđ = 67,5 J.")]), ["67.5"]);
  assert.deepEqual(thuLo([tim("Bạn Hùng có khối lượng"), gia(khac, "Công suất là 160 W.")]), [160]);
  assert.deepEqual(thuLo([tim("Bạn Hùng có khối lượng"), gia(khac, "Có 160 người.")]), []);
  assert.deepEqual(thuLo([tim("động cơ phản lực của máy bay"), gia(khac, "Máy bay dùng dầu hoả.")]), ["dầu hoả"]);
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
  const khac = BANKS.filter((b) => !/^khtn9-gk1-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ id: b.id, s: " " + chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại hoặc đọc lại hình (" + soPT + " phương trình hoá học cân bằng); kho " + kho.length + " câu (" + mine.length + " câu riêng), ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề: Bài 1 " + soBai1 + ", " + theoMon.map(([m, k]) => m + " " + k).join(", ") + ".");
console.log("MATH OK");
