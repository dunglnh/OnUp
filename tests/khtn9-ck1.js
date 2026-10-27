// Kiểm tra ngân hàng KHTN 9 cuối kì I của Phiên N9-ck1-khtn (data/banks/9-khtn.js: hai đề cố định và câu riêng của đề ngẫu nhiên
// khtn9-ck1-ngau-nhien), theo mẫu tests/khtn6-ck2.js. Số đề, số câu lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7 như mọi kho
// lớp 9; số câu mỗi phân môn so với lời dặn (note) của đề.
// Câu có phép tính hoặc có hình được nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong kho, đúng đề ghi ở id); đáp án tính bằng
// code (so với ans, o[0] hoặc a): động năng, thế năng, cơ năng, công suất; chiết suất (từ tốc độ ánh sáng, từ góc tới và góc khúc xạ);
// ảnh qua thấu kính hội tụ (tam giác đồng dạng như sách, không dùng công thức thấu kính); tính theo phương trình hoá học (khối lượng
// mol từ nguyên tử khối đề cho, hệ số đọc từ phương trình trong lời giải), độ cồn; sơ đồ lai, đếm nucleotide, mạch bổ sung, phiên mã,
// dịch mã (bảng mã di truyền chuẩn). Hình đọc lại: đường truyền tia sáng khi khúc xạ (đúng một tia đúng định luật khúc xạ với chiết
// suất của nước), qua lăng kính (chiết suất tính ở hai mặt bên khớp nhau, tia ló lệch về đáy, tia lệch nhiều hơn là tia tím), kí hiệu
// thấu kính (đầu mũi tên hướng ra hay hướng vào), vật trước thấu kính hội tụ trên lưới ô vuông (đếm ô ra d, f, h; ảnh nằm trong lưới),
// công thức cấu tạo (hoá trị từng nguyên tử, công thức phân tử), khung tổ hợp giao tử (ô nào cũng đúng tổ hợp). Mọi phương trình hoá
// học trong câu Hoá học phải cân bằng. Câu trả lời bằng số và câu có hình nào cũng phải có kiểm tra ở đây.
// Rồi: chữ (công thức hoá học viết bằng chữ số dưới dòng, tên chất như sách, không có tên chất kiểu cũ, dấu thanh kiểu cũ như sách “hoá”,
// “thuỷ”; số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân), mức độ và ma trận (24 chủ đề theo thứ tự bài của sách; hai đề cố
// định và câu riêng chia đúng ma trận), dạng câu theo khung Công văn 7991 (đúng/sai 4 ý không lặp kiểu Đ/S, trả lời ngắn bằng số), đáp
// án đúng không dài hơn hẳn lựa chọn sai, rút thử nhiều lần (đúng ma trận, gặp đủ câu riêng; đã làm hết một đề cố định thì không rút lại
// câu của đề đó), đề bài không trùng, dò lộ đáp án giữa các câu rút được cùng lúc (số ở vị trí kết quả: không được có; chuỗi 3 từ của
// đáp án bằng chữ in ra với DO_LO=1 để xem tay, đã xem ghi ở DA_XEM). Có sách ở ../OnUp-Book (repo riêng tư) thì so mọi trường chữ với
// chữ OCR của mọi cuốn sau khi bỏ dấu, gộp nguyên âm (không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và với câu của mọi kho khác
// (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 5 từ).
// Chạy: node tests/khtn9-ck1.js → in MATH OK.
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
const pool = BANKS.find((b) => b.pool && /^khtn9-ck1-/.test(b.id));
assert.ok(pool, "thiếu đề ngẫu nhiên khtn9-ck1");
assert.equal(pool.pool.from.length, 2, "đề ngẫu nhiên lấy câu của hai đề cố định");
const S = { de1: pool.pool.from[0], de2: pool.pool.from[1], own: pool.id };
assert.deepEqual(BANKS.filter((b) => /^khtn9-ck1-/.test(b.id)).map((b) => b.id).sort(), Object.values(S).sort(), "kho gồm hai đề cố định và đề ngẫu nhiên");
const kho = pool.questions, mine = kho.filter((q) => q.src === S.own);
[S.de1, S.de2].forEach((id) => assert.equal(bank(id).questions.length, bank(id).n, id + ": số câu bằng n của danh mục"));
assert.equal(kho.length, mine.length + bank(S.de1).n + bank(S.de2).n, "kho = câu riêng + câu của hai đề cố định");
assert.equal(mine.length, pool.n, "câu riêng chia đúng ma trận nên có đúng n câu");
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
const same = (p, q) => close(p[0], q[0], 1e-6) && close(p[1], q[1], 1e-6);
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const huong = (a, b) => { const L = dist(a, b); return [(b[0] - a[0]) / L, (b[1] - a[1]) / L]; };
const cheo = (u, v) => u[0] * v[1] - u[1] * v[0];
// góc (độ) giữa một tia có hướng u và đường thẳng có hướng n (pháp tuyến)
const gocVoi = (u, n) => Math.acos(Math.min(1, Math.abs(u[0] * n[0] + u[1] * n[1]))) / RAD;
// mũi tên tam giác: điểm đầu tiên là đỉnh; mũi tên nằm trên đoạn [a, b] và chỉ theo chiều a → b
const chiTheo = (dau, a, b) => { const u = huong(a, b), [ngon, b1, b2] = dau, giua = [(b1[0] + b2[0]) / 2, (b1[1] + b2[1]) / 2];
  return Math.abs(cheo(u, [ngon[0] - a[0], ngon[1] - a[1]])) < 1 && (ngon[0] - giua[0]) * u[0] + (ngon[1] - giua[1]) * u[1] > 0; };

/* Khúc xạ: mặt phân cách là đoạn nằm ngang màu ink nét 2, pháp tuyến là đường nét đứt thẳng đứng cắt mặt phân cách tại I; các tia màu
   bad: một tia tới đi đến I từ phía trên, các tia còn lại đi từ I xuống dưới; mỗi tia có một mũi tên chỉ chiều truyền; chữ S ở đầu tia
   tới, số ở cuối mỗi tia đi xuống; tên môi trường ghi ở hai phía. Trả về góc tới, góc của từng tia đi xuống với pháp tuyến và phía của
   tia so với pháp tuyến. */
const docKhucXa = (svg) => {
  const mat = tags(svg, "line").filter((l) => l.stroke === "ink" && l.y1 === l.y2);
  assert.equal(mat.length, 1, "đúng một mặt phân cách nằm ngang");
  const yM = num(mat[0], "y1"), phap = tags(svg, "line").filter((l) => l["stroke-dasharray"]);
  assert.ok(phap.length === 1 && phap[0].x1 === phap[0].x2 && num(phap[0], "y1") < yM && num(phap[0], "y2") > yM, "pháp tuyến là đường nét đứt thẳng đứng cắt mặt phân cách");
  const I = [num(phap[0], "x1"), yM], tia = tags(svg, "line").filter((l) => l.stroke === "bad").map(ends);
  const den = tia.filter(([a, b]) => same(b, I) && a[1] < yM), di = tia.filter(([a, b]) => same(a, I) && b[1] > yM);
  assert.ok(den.length === 1 && di.length + 1 === tia.length, "một tia tới đi đến I từ phía trên, các tia còn lại đi từ I xuống dưới");
  const dau = tags(svg, "polygon").filter((p) => p.fill === "bad").map((p) => pts(p.points));
  assert.equal(dau.length, tia.length, "mỗi tia một mũi tên");
  tia.forEach(([a, b]) => assert.equal(dau.filter((d) => chiTheo(d, a, b)).length, 1, "mũi tên chỉ theo chiều truyền của tia"));
  const T = texts(svg), gan = (p, re) => T.filter((t) => re.test(t.t)).reduce((x, t) => (dist([+t.x, +t.y - 5], p) < dist([+x.x, +x.y - 5], p) ? t : x)).t;
  assert.equal(gan(den[0][0], /^[A-Z]$/), "S", "chữ S ở đầu tia tới");
  const goc = (p) => ({ g: gocVoi(huong(I, p), [0, 1]), ben: Math.sign(p[0] - I[0]) });
  const ra = di.map(([, b]) => Object.assign(goc(b), { so: gan(b, /^\d$/) }));
  assert.equal(new Set(ra.map((t) => t.so)).size, ra.length, "mỗi tia đi xuống ghi một số riêng");
  const nuoc = tags(svg, "rect").filter((r) => r.fill === "acc-soft");
  assert.ok(nuoc.length === 1 && num(nuoc[0], "y") === yM, "môi trường phía dưới tô màu, bắt đầu từ mặt phân cách");
  return { i: goc(den[0][0]), ra, tren: T.filter((t) => +t.y < yM).map((t) => t.t), duoi: T.filter((t) => +t.y > yM).map((t) => t.t) };
};
/* Lăng kính: tam giác tô acc-soft, đỉnh A ở trên (có chữ A), đáy ở dưới; tia tới (nét 2,5) đi đến mặt bên bên trái tại I; các tia trong
   lăng kính (nét 1,5) đi từ I tới mặt bên bên phải; mỗi tia ló (nét 2,5) đi từ cuối một tia trong lăng kính ra ngoài, ghi số ở cuối.
   Chiết suất của từng tia tính theo định luật khúc xạ ở mặt vào và ở mặt ra (chiết suất của không khí bằng 1); góc lệch D là góc giữa
   tia tới và tia ló. */
const docLangKinh = (svg) => {
  const lk = tags(svg, "polygon").filter((p) => p.fill === "acc-soft");
  assert.equal(lk.length, 1, "một lăng kính");
  const [A, ...day] = pts(lk[0].points).sort((p, q) => p[1] - q[1]), [B, C] = day.sort((p, q) => p[0] - q[0]);
  assert.ok(close(B[1], C[1], 1e-6) && A[1] < B[1], "đỉnh ở trên, đáy nằm ngang ở dưới");
  assert.ok(texts(svg).some((t) => t.t === "A" && dist([+t.x, +t.y], A) < 12), "đỉnh ghi chữ A");
  const tren = (p, a, b) => Math.abs(cheo(huong(a, b), [p[0] - a[0], p[1] - a[1]])) < 0.6 && dist(a, p) + dist(p, b) < dist(a, b) + 1;
  const L = tags(svg, "line").filter((l) => l.stroke === "ink").map((l) => ({ w: l["stroke-width"], e: ends(l) }));
  const ngoai = L.filter((l) => l.w === "2.5"), trong = L.filter((l) => l.w === "1.5");
  const toi = ngoai.filter((l) => tren(l.e[1], A, B));
  assert.equal(toi.length, 1, "một tia tới mặt bên AB");
  const I = toi[0].e[1], u0 = huong(...toi[0].e);
  const nAB = (() => { const f = huong(A, B); return [-f[1], f[0]]; })(), nAC = (() => { const f = huong(A, C); return [-f[1], f[0]]; })();
  const dau = tags(svg, "polygon").filter((p) => p.fill === "ink").map((p) => pts(p.points));
  const T = texts(svg).filter((t) => /^\d$/.test(t.t)), M = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2];
  const ra = trong.map((l) => {
    assert.ok(same(l.e[0], I) && tren(l.e[1], A, C), "tia trong lăng kính đi từ I tới mặt bên AC");
    const J = l.e[1], lo = ngoai.filter((m) => same(m.e[0], J));
    assert.equal(lo.length, 1, "mỗi tia trong lăng kính có một tia ló");
    const u1 = huong(I, J), u2 = huong(...lo[0].e);
    const n1 = Math.sin(gocVoi(u0, nAB) * RAD) / Math.sin(gocVoi(u1, nAB) * RAD), n2 = Math.sin(gocVoi(u2, nAC) * RAD) / Math.sin(gocVoi(u1, nAC) * RAD);
    assert.ok(Math.abs(n1 - n2) < 0.01 && n1 > 1.3 && n1 < 1.8, "chiết suất ở mặt vào (" + n1.toFixed(3) + ") và mặt ra (" + n2.toFixed(3) + ") khớp nhau");
    assert.ok(Math.sign(cheo(u0, u2)) === Math.sign(cheo(u0, [M[0] - I[0], M[1] - I[1]])), "tia ló lệch về phía đáy so với tia tới");
    assert.equal(dau.filter((d) => chiTheo(d, ...lo[0].e)).length, 1, "tia ló có mũi tên chỉ ra ngoài");
    const so = T.reduce((x, t) => (dist([+t.x, +t.y - 5], lo[0].e[1]) < dist([+x.x, +x.y - 5], lo[0].e[1]) ? t : x)).t;
    return { so, n: n1, D: Math.acos(u0[0] * u2[0] + u0[1] * u2[1]) / RAD };
  });
  assert.equal(dau.filter((d) => chiTheo(d, ...toi[0].e)).length, 1, "tia tới có mũi tên chỉ vào lăng kính");
  assert.equal(new Set(ra.map((t) => t.so)).size, ra.length, "mỗi tia ló ghi một số riêng");
  return ra;
};
/* Kí hiệu thấu kính: đoạn thẳng đứng màu ink nét 2,5, hai đầu là hai tam giác màu ink (điểm đầu tiên là đỉnh); tên “(a)”, “(b)” ghi
   ngay dưới. Đỉnh xa tâm đoạn hơn đáy tam giác: mũi tên hướng ra ngoài (thấu kính hội tụ), ngược lại: hướng vào trong (phân kì). */
const docKiHieu = (svg) => {
  const dau = tags(svg, "polygon").filter((p) => p.fill === "ink").map((p) => pts(p.points)), T = texts(svg).filter((t) => /^\([a-z]\)$/.test(t.t));
  const tk = tags(svg, "line").filter((l) => l.stroke === "ink" && l["stroke-width"] === "2.5" && l.x1 === l.x2).map(ends);
  assert.equal(dau.length, 2 * tk.length, "mỗi thấu kính hai đầu mũi tên");
  return tk.map(([a, b]) => {
    const x = a[0], giua = (a[1] + b[1]) / 2, cua = dau.filter((d) => close(d[0][0], x, 1e-6));
    assert.equal(cua.length, 2, "mỗi thấu kính hai đầu mũi tên");
    const ra = cua.map(([ngon, b1, b2]) => Math.abs(ngon[1] - giua) > Math.abs((b1[1] + b2[1]) / 2 - giua));
    assert.ok(ra[0] === ra[1], "hai đầu mũi tên cùng hướng ra hoặc cùng hướng vào");
    const ten = T.filter((t) => close(+t.x, x, 1e-6));
    assert.equal(ten.length, 1, "mỗi thấu kính một tên");
    return { ten: ten[0].t, loai: ra[0] ? "hội tụ" : "phân kì" };
  });
};
/* Lưới ô vuông: đường lưới màu line cách đều; trục chính màu ink nét 1,5 nằm trên một đường lưới; thấu kính là đoạn thẳng đứng màu ink
   nét 2,5 có hai đầu mũi tên; F là chấm tròn màu ink trên trục chính (chữ F ngay dưới); vật AB là đoạn thẳng đứng màu acc từ trục
   chính lên, B là đỉnh mũi tên màu acc. Trả về số ô: d (từ vật đến thấu kính), f (OF), h (AB), và số ô từ thấu kính đến mép lưới phía
   bên kia, từ trục chính đến mép dưới (chỗ để dựng ảnh thật). */
const docLuoi = (svg) => {
  const L = tags(svg, "line"), doc = L.filter((l) => l.stroke === "line" && l.x1 === l.x2).map((l) => num(l, "x1")).sort((a, b) => a - b);
  const ngang = L.filter((l) => l.stroke === "line" && l.y1 === l.y2).map((l) => num(l, "y1")).sort((a, b) => a - b), px = doc[1] - doc[0];
  [doc, ngang].forEach((v) => v.forEach((x, i) => i && assert.ok(close(x - v[i - 1], px), "lưới ô vuông đều")));
  const truc = L.filter((l) => l.stroke === "ink" && l["stroke-width"] === "1.5" && l.y1 === l.y2);
  assert.ok(truc.length === 1 && ngang.includes(num(truc[0], "y1")), "trục chính nằm trên một đường lưới");
  const yT = num(truc[0], "y1"), tk = L.filter((l) => l.stroke === "ink" && l["stroke-width"] === "2.5" && l.x1 === l.x2);
  assert.ok(tk.length === 1 && doc.includes(num(tk[0], "x1")), "thấu kính nằm trên một đường lưới");
  const xO = num(tk[0], "x1"), dau = tags(svg, "polygon").filter((p) => p.fill === "ink").map((p) => pts(p.points));
  assert.ok(dau.length === 2 && dau.every(([ngon, b1, b2]) => close(ngon[0], xO) && Math.abs(ngon[1] - yT) > Math.abs((b1[1] + b2[1]) / 2 - yT)), "kí hiệu thấu kính hội tụ: hai đầu mũi tên hướng ra ngoài");
  const F = tags(svg, "circle").filter((c) => c.fill === "ink");
  assert.ok(F.length === 1 && close(num(F[0], "cy"), yT) && doc.includes(num(F[0], "cx")), "F nằm trên trục chính, ở một nút lưới");
  const xF = num(F[0], "cx"), vat = L.filter((l) => l.stroke === "acc"), nguon = tags(svg, "polygon").filter((p) => p.fill === "acc").map((p) => pts(p.points)[0]);
  assert.ok(vat.length === 1 && vat[0].x1 === vat[0].x2 && close(num(vat[0], "y1"), yT), "vật AB vuông góc với trục chính, A trên trục chính");
  const xA = num(vat[0], "x1"), B = nguon[0];
  assert.ok(nguon.length === 1 && close(B[0], xA) && B[1] < yT && ngang.includes(B[1]), "B là đỉnh mũi tên, ở một nút lưới phía trên trục chính");
  const T = texts(svg), chu = (c) => T.filter((t) => t.t === c);
  assert.ok(chu("F").length === 1 && close(+chu("F")[0].x, xF) && chu("A").length === 1 && close(+chu("A")[0].x, xA), "chữ F, A ghi ngay dưới điểm");
  assert.ok(chu("O").length === 1 && Math.abs(+chu("O")[0].x - xO) < 10 && chu("B").length === 1 && dist([+chu("B")[0].x, +chu("B")[0].y], B) < 10, "chữ O, B ghi cạnh điểm");
  assert.ok(Math.sign(xF - xO) === -Math.sign(xA - xO), "F (tiêu điểm của chùm tia ló) ở phía bên kia thấu kính so với vật");
  const bia = Math.sign(xF - xO) > 0 ? doc[doc.length - 1] : doc[0];
  return { d: Math.abs(xA - xO) / px, f: Math.abs(xF - xO) / px, h: (yT - B[1]) / px, ben: Math.abs(bia - xO) / px, duoi: (ngang[ngang.length - 1] - yT) / px };
};
/* Ảnh thật qua thấu kính hội tụ (vật ngoài khoảng tiêu cự): hai cặp tam giác đồng dạng như sách (Bài 10): A'B'/AB = OA'/OA và
   A'B'/OI = FA'/OF với OI = AB, nên OA'/d = (OA' − f)/f. Ảnh ảo (vật trong khoảng tiêu cự): OA'/d = (OA' + f)/f. */
const anh = (d, f, h) => { const da = d > f ? (d * f) / (d - f) : (d * f) / (f - d); return { da, ha: (h * da) / d, that: d > f }; };
/* Công thức cấu tạo: chữ in đậm là nguyên tử, đoạn thẳng màu ink là liên kết (nối hai nguyên tử gần hai đầu đoạn; liên kết đôi là hai
   đoạn song song). Kiểm tra hoá trị từng nguyên tử, trả về công thức phân tử (C, H trước, nguyên tố khác theo bảng chữ cái). */
const SUB = "₀₁₂₃₄₅₆₇₈₉", chiSo = (n) => (n > 1 ? String(n).split("").map((c) => SUB[+c]).join("") : "");
const HOA_TRI = { C: 4, H: 1, O: 2, N: 3, Cl: 1, Br: 1 };
const docCongThuc = (svg) => {
  const ng = texts(svg).filter((t) => /^[A-Z][a-z]?$/.test(t.t)).map((t) => ({ e: t.t, p: [+t.x, +t.y - 5], lk: 0 }));
  const gan = (p) => ng.reduce((x, y) => (dist(y.p, p) < dist(x.p, p) ? y : x));
  tags(svg, "line").filter((l) => l.stroke === "ink").map(ends).forEach(([a, b]) => {
    const u = gan(a), v = gan(b);
    assert.ok(u !== v && dist(u.p, a) < 20 && dist(v.p, b) < 20, "liên kết nối hai nguyên tử");
    u.lk++; v.lk++;
  });
  ng.forEach((x) => assert.equal(x.lk, HOA_TRI[x.e], "hoá trị của " + x.e));
  const dem = {}; ng.forEach((x) => (dem[x.e] = (dem[x.e] || 0) + 1));
  return ["C", "H", ...Object.keys(dem).filter((e) => e !== "C" && e !== "H").sort()].filter((e) => dem[e]).map((e) => e + chiSo(dem[e])).join("");
};
/* Khung tổ hợp giao tử: giao tử là chữ trong hình tròn, ở hàng trên (của một cây) và cột trái (của cây kia); ô tổ hợp là hình chữ nhật
   tô bg, chữ trong ô phải đúng tổ hợp của giao tử ở cột và hàng của ô (allele trội viết trước). */
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
    assert.ok(cot.length === 1 && hang.length === 1 && t.length === 1, "mỗi ô ở đúng một cột, một hàng, ghi một tổ hợp");
    assert.equal(t[0].t, ghep(cot[0].g, hang[0].g), "ô ghi đúng tổ hợp của giao tử ở cột và hàng của ô");
    return t[0].t;
  });
  const tieuDe = /<title>([^<]*)<\/title>/.exec(svg);
  return { tren: tren.map((g) => g.g), trai: trai.map((g) => g.g), con, tieuDe: tieuDe ? tieuDe[1] : "" };
};

/* ---------- hoá học: công thức (chữ số dưới dòng), khối lượng mol, phương trình ---------- */
const sub2n = (s) => [...s].map((c) => SUB.indexOf(c)).join("");
// "(CH₃COO)₂Mg" → { C: 4, H: 6, O: 4, Mg: 1 }; chữ R (gốc hiđrocacbon của chất béo) đếm như một nguyên tố
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
// tính theo phương trình: biết m (gam) hoặc n (mol) của chất x, tìm số mol của chất y
const heSo = (pt, f) => { const c = tach(pt).flat().filter((v) => v.f === f); assert.equal(c.length, 1, f + " có đúng một lần trong " + pt); return c[0].k; };
const molTheoPT = (pt, x, nx, y) => (nx * heSo(pt, y)) / heSo(pt, x);
const ptCua = (q, x, y) => { const p = (q.x.match(PT) || []).filter((s) => tach(s).flat().some((v) => v.f === x) && tach(s).flat().some((v) => v.f === y));
  assert.equal(p.length, 1, "lời giải có đúng một phương trình chứa " + x + " và " + y); return p[0]; };
// nguyên tử khối đề cho: “(Cho C = 12, H = 1, O = 16.)”; phải đúng bảng nguyên tử khối
const ntDe = (q) => { const m = /\(Cho ([^)]*)\)/.exec(q.q); assert.ok(m, "đề cho nguyên tử khối"); const nt = {};
  [...m[1].matchAll(/([A-Z][a-z]?) = ([\d,]+)/g)].forEach((k) => { nt[k[1]] = val(k[2]); assert.equal(nt[k[1]], NTK[k[1]], "nguyên tử khối của " + k[1]); }); return nt; };

/* ---------- sinh học: bảng mã di truyền chuẩn ---------- */
const BASE = "UCAG", AA = "FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG";
const MA = {}; [...BASE].forEach((a, i) => [...BASE].forEach((b, j) => [...BASE].forEach((c, k) => (MA[a + b + c] = AA[16 * i + 4 * j + k]))));
const TEN_AA = { M: ["methionine", "Met"], W: ["tryptophan", "Trp"], A: ["alanine", "Ala"], G: ["glycine", "Gly"], F: ["phenylalanine", "Phe"], L: ["leucine", "Leu"], S: ["serine", "Ser"], K: ["lysine", "Lys"], V: ["valine", "Val"] };
const BO_SUNG = { A: "T", T: "A", G: "C", C: "G" }, PHIEN_MA = { A: "U", T: "A", G: "C", C: "G" };
const chuoiNu = (s) => s.split(/[–-]/).filter((x) => /^[ATGCU]$/.test(x));

/* ---------- các câu cần tính ----------
   id: đề chứa câu (de1, de2, own); has: đoạn chữ của đề; right(q): đáp án tính bằng code. */
const so = (q, re) => { const m = re.exec(q.q); assert.ok(m, "đề thiếu số liệu: " + re); return m.slice(1).map(val); };
const coX = (q, ...cum) => cum.forEach((c) => assert.ok(q.x.includes(c), "lời giải cần có “" + c + "”"));
const CHECKS = [
  /* ----- Vật lí ----- */
  { id: "de1", has: "Động năng của xe máy và người", right: (q) => {
    const [m, v] = so(q, /tổng khối lượng (\d+) kg đang chạy với tốc độ (\d+) km\/h/), vs = (v * 1000) / 3600, W = 0.5 * m * vs * vs;
    coX(q, `${v} km/h = ${vn(v * 1000)} m : ${vn(3600)} s = ${vn(vs)} m/s`, `½ · ${m} · ${vn(vs)}² = ${vn(W)} (J)`); return W; } },
  { id: "de2", has: "bơm 30 kg nước lên bể chứa", right: (q) => {
    const [m, h] = so(q, /bơm (\d+) kg nước lên bể chứa trên đỉnh một tháp nước cao (\d+) m/), P = 10 * m;
    coX(q, `P = 10m = 10 · ${m} = ${vn(P)} (N)`, `Wt = Ph = ${vn(P)} · ${h} = ${vn(P * h)} (J)`); return P * h; } },
  { id: "own", has: "Tốc độ chạy của vận động viên", right: (q) => {
    const [m, W] = so(q, /khối lượng (\d+) kg đang chạy với động năng ([\d ]+) J/), v = Math.sqrt((2 * W) / m);
    coX(q, `2 · ${vn(W)} : ${m} = ${vn(v * v)}`); return v; } },
  { id: "de2", has: "thì động năng của vật bằng", right: (q) => {
    const [W] = so(q, /thế năng của vật là (\d+) J/); assert.ok(q.q.includes("độ cao h/2") && q.q.includes("Bỏ qua lực cản"), "rơi tới nửa độ cao, bỏ qua lực cản");
    return vn(W - W / 2) + " J"; } },
  { id: "de1", has: "Công suất của cần cẩu", right: (q) => {
    const [A, t] = so(q, /công ([\d ]+) J trong ([\d,]+) phút/); coX(q, `${vn(t)} phút = ${vn(t * 60)} s`, `${vn(A)} : ${vn(t * 60)} = ${vn(A / (t * 60))} (W)`);
    return A / (t * 60); } },
  { id: "own", has: "Máy bơm A thực hiện công", right: (q) => {
    const [A1, t1, A2, t2] = so(q, /Máy bơm A thực hiện công ([\d ]+) J trong (\d+) s; máy bơm B thực hiện công ([\d ]+) J trong (\d+) s/);
    const P1 = A1 / t1, P2 = A2 / t2; coX(q, `${vn(A1)} : ${t1} = ${vn(P1)} (W)`, `${vn(A2)} : ${t2} = ${vn(P2)} (W)`);
    assert.ok(A2 > A1 && P2 < P1, "máy thực hiện công lớn hơn lại có công suất nhỏ hơn (câu hỏi so sánh công suất, không so công)");
    return P1 > P2 ? "Máy A có công suất lớn hơn máy B" : "Máy B có công suất lớn hơn máy A"; } },
  { id: "de1", has: "Tia nào có thể là tia khúc xạ của tia SI", right: (q) => {
    assert.ok(q.q.includes("từ không khí tới mặt nước"), "ánh sáng đi từ không khí vào nước");
    const h = docKhucXa(q.svg), N = 1.333; // chiết suất của nước (Bảng 5.2 của sách)
    assert.ok(h.tren.includes("Không khí") && h.duoi.includes("Nước"), "không khí ở trên, nước ở dưới");
    const rDung = Math.asin(Math.sin(h.i.g * RAD) / N) / RAD, dung = h.ra.filter((t) => t.ben === -h.i.ben && Math.abs(t.g - rDung) < 1);
    assert.equal(dung.length, 1, "đúng một tia đúng định luật khúc xạ (góc tới " + h.i.g.toFixed(1) + "°)");
    h.ra.filter((t) => t !== dung[0]).forEach((t) => assert.ok(t.ben === h.i.ben ? new RegExp(`tia ${t.so} \\(cùng phía với tia tới\\)`).test(q.x) : t.g > h.i.g && q.x.includes(`Tia ${t.so} lệch xa pháp tuyến hơn tia tới`), "lời giải nói vì sao tia " + t.so + " sai"));
    assert.deepEqual(q.o.slice().sort(), h.ra.map((t) => "Tia " + t.so).concat("Không tia nào").sort(), "lựa chọn là các tia trong hình");
    return "Tia " + dung[0].so; } },
  { id: "de2", has: "Chiết suất của loại nhựa này", right: (q) => {
    const [v, c] = so(q, /nhựa trong suốt là ([\d ]+) km\/s\. Biết tốc độ ánh sáng trong chân không là ([\d ]+) km\/s/); coX(q, `n = ${vn(c)} : ${vn(v)} = ${vn(c / v)}`); return c / v; } },
  { id: "own", has: "Chiết suất của chất lỏng này", right: (q) => {
    const [i, r] = so(q, /với góc tới (\d+)° thì góc khúc xạ là (\d+)°/), n = Math.sin(i * RAD) / Math.sin(r * RAD);
    assert.ok(q.q.includes("Làm tròn kết quả đến chữ số thập phân thứ hai") && q.tol && Math.abs(q.ans - n) <= q.tol, "làm tròn hai chữ số, sai số tol");
    coX(q, `sin ${i}° : sin ${r}° ≈ ${vn(Math.sin(i * RAD).toFixed(3))} : ${Math.sin(r * RAD).toFixed(3).replace(".", ",")} ≈ ${vn(tron(n))}`); return tron(n); } },
  { id: "de2", has: "tia 1 và tia 2 là hai tia ở hai mép của dải màu", right: (q) => {
    const ra = docLangKinh(q.svg).sort((a, b) => a.n - b.n), [d, t] = [ra[0], ra[ra.length - 1]];
    assert.ok(ra.length === 2 && d.D < t.D, "tia có chiết suất lớn hơn lệch nhiều hơn");
    coX(q, `tia ${t.so} lệch về phía đáy nhiều hơn tia ${d.so}`); return `Tia ${d.so} màu đỏ, tia ${t.so} màu tím`; } },
  { id: "de1", has: "Kí hiệu của thấu kính hội tụ là hình nào", right: (q) => {
    const k = docKiHieu(q.svg), ht = k.filter((x) => x.loai === "hội tụ");
    assert.ok(k.length === 2 && ht.length === 1, "một kí hiệu thấu kính hội tụ, một kí hiệu thấu kính phân kì");
    coX(q, `như hình ${ht[0].ten}`); return "Hình " + ht[0].ten; } },
  { id: "de1", has: "Ảnh A'B' của vật AB cách thấu kính bao nhiêu", right: (q) => {
    const L = docLuoi(q.svg), [c] = so(q, /Mỗi ô vuông có cạnh (\d+) cm/), a = anh(L.d * c, L.f * c, L.h * c);
    assert.ok(a.that && a.da / c <= L.ben && a.ha / c <= L.duoi, "ảnh thật nằm trong lưới");
    coX(q, `OA = ${L.d} ô = ${L.d * c} cm`, `AB = ${L.h} ô = ${L.h * c} cm`, `OF = ${L.f} ô = ${L.f * c} cm`, `OA' = ${vn(a.da)} cm`); return a.da; } },
  { id: "de2", has: "Ảnh của con kiến qua kính lúp dài bao nhiêu", right: (q) => {
    const [h, f, d] = so(q, /con kiến dài (\d+) mm .* tiêu cự (\d+) cm, cách kính (\d+) cm/), a = anh(d, f, h);
    assert.ok(!a.that, "vật trong khoảng tiêu cự của kính lúp: ảnh ảo"); coX(q, `OA' = ${vn(a.da)} cm`, `A'B' = ${h} · ${vn(a.da)} : ${d} = ${vn(a.ha)} (mm)`); return a.ha; } },
  { id: "own", has: "Ảnh A'B' của vật AB cao bao nhiêu", right: (q) => {
    const L = docLuoi(q.svg), [c] = so(q, /Mỗi ô vuông có cạnh (\d+) cm/), a = anh(L.d * c, L.f * c, L.h * c);
    assert.ok(a.that && a.da / c <= L.ben && a.ha / c <= L.duoi, "ảnh thật nằm trong lưới");
    coX(q, `OA = ${L.d} ô = ${L.d * c} cm`, `AB = ${L.h} ô = ${L.h * c} cm`, `OF = ${L.f} ô = ${L.f * c} cm`, `OA' = ${vn(a.da)} cm`, `A'B' = ${L.h * c} · ${vn(a.da)} : ${L.d * c} = ${vn(a.ha)} (cm)`); return a.ha; } },
  /* ----- Hoá học ----- */
  { id: "de2", has: "Công thức phân tử của chất đó là", right: (q) => docCongThuc(q.svg) },
  { id: "own", has: "Dãy nào sau đây chỉ gồm các hợp chất hữu cơ", right: (q) => {
    // hợp chất hữu cơ: có carbon, trừ CO, CO₂ và muối carbonate
    const huuCo = (f) => !!congThuc(f).C && !["CO", "CO₂"].includes(f) && !/CO₃/.test(f), vo = (o) => o.split(", ").filter((f) => !huuCo(f)).length;
    const dung = q.o.filter((o) => vo(o) === 0); assert.equal(dung.length, 1, "đúng một dãy chỉ gồm chất hữu cơ");
    q.o.filter((o) => o !== dung[0]).forEach((o) => assert.equal(vo(o), 1, "mỗi dãy còn lại có một chất vô cơ: " + o)); return dung[0]; } },
  { id: "de1", has: "Đốt cháy hoàn toàn 4,4 g propane", right: (q) => {
    const nt = ntDe(q), [m] = so(q, /([\d,]+) g propane \(C₃H₈\)/), pt = ptCua(q, "C₃H₈", "H₂O");
    return tron(molTheoPT(pt, "C₃H₈", m / KL("C₃H₈", nt), "H₂O") * KL("H₂O", nt)); } },
  { id: "own", has: "cần dùng bao nhiêu mol khí oxygen", right: (q) => {
    const [n] = so(q, /([\d,]+) mol butane \(C₄H₁₀\)/); return vn(molTheoPT(ptCua(q, "C₄H₁₀", "O₂"), "C₄H₁₀", n, "O₂")) + " mol"; } },
  { id: "de1", has: "Độ cồn của dung dịch thu được", right: (q) => {
    const [V, D, Vt] = so(q, /pha loãng (\d+) mL cồn (\d+)° với nước cất, được (\d+) mL dung dịch/); coX(q, `${V} · ${D} : 100 = ${vn((V * D) / 100)} (mL)`); return (V * D) / Vt; } },
  { id: "own", has: "Cần lấy bao nhiêu mililít cồn", right: (q) => {
    const [D0, Vt, D] = so(q, /bao nhiêu mililít cồn (\d+)° rồi thêm nước cất cho đủ (\d+) mL để được dung dịch cồn (\d+)°/), V = (Vt * D) / 100;
    coX(q, `${Vt} · ${D} : 100 = ${vn(V)} (mL)`); return (V * 100) / D0; } },
  { id: "de2", has: "Đốt cháy hoàn toàn 9,2 g ethylic alcohol", right: (q) => {
    const nt = ntDe(q), [m] = so(q, /([\d,]+) g ethylic alcohol \(C₂H₅OH\)/), pt = ptCua(q, "C₂H₅OH", "CO₂");
    return tron(molTheoPT(pt, "C₂H₅OH", m / KL("C₂H₅OH", nt), "CO₂") * KL("CO₂", nt)); } },
  { id: "de1", has: "tác dụng vừa đủ với 25 g đá vôi", right: (q) => {
    const nt = ntDe(q), [m] = so(q, /vừa đủ với ([\d,]+) g đá vôi \(coi như CaCO₃ tinh khiết\)/), pt = ptCua(q, "CaCO₃", "CH₃COOH");
    return tron(molTheoPT(pt, "CaCO₃", m / KL("CaCO₃", nt), "CH₃COOH") * KL("CH₃COOH", nt)); } },
  { id: "de2", has: "giấm ăn chứa 4% acetic acid", right: (q) => {
    const nt = ntDe(q), [m, p] = so(q, /hết (\d+) g giấm ăn chứa (\d+)% acetic acid/), ma = (m * p) / 100, pt = ptCua(q, "CH₃COOH", "NaOH");
    coX(q, `${m} · ${p} : 100 = ${vn(ma)} (g)`); return vn(tron(molTheoPT(pt, "CH₃COOH", ma / KL("CH₃COOH", nt), "NaOH") * KL("NaOH", nt))) + " g"; } },
  { id: "own", has: "Cho 3,6 g magnesium (Mg)", right: (q) => {
    const nt = ntDe(q), [m] = so(q, /([\d,]+) g magnesium \(Mg\)/), [V0] = so(q, /1 mol khí có thể tích ([\d,]+) L/), pt = ptCua(q, "Mg", "H₂");
    const V = molTheoPT(pt, "Mg", m / KL("Mg", nt), "H₂") * V0;
    assert.ok(q.q.includes("làm tròn kết quả đến chữ số thập phân thứ hai") && q.tol && Math.abs(q.ans - V) <= q.tol, "làm tròn hai chữ số, sai số tol"); return tron(V); } },
  { id: "de1", has: "Monomer dùng để điều chế polymer này", right: (q) => {
    // mắt xích –CH₂–CH(X)– được tạo từ monomer CH₂=CH–X (liên kết đôi mở ra khi trùng hợp)
    const [, X] = /mắt xích là –CH₂–CH\(([^)]+)\)–\./.exec(q.q) || []; assert.ok(X, "đề ghi mắt xích"); return "CH₂=CH–" + X; } },
  /* ----- Sinh học ----- */
  { id: "de1", has: "lá nguyên (B) trội hoàn toàn so với lá chẻ (b)", right: (q) => {
    // P thuần chủng trội – trội × lặn – lặn; F₁ tự thụ phấn; liệt kê 16 tổ hợp của F₂
    const g1 = ["AB", "Ab", "aB", "ab"], F2 = g1.flatMap((x) => g1.map((y) => ghep(x, y))), kh = (k) => (k.includes("A") ? "quả đỏ" : "quả vàng") + ", " + (k.includes("B") ? "lá nguyên" : "lá chẻ");
    const loaiKH = new Set(F2.map(kh)).size, [N, c] = so({ q: q.o[3] }, /có ([\d ]+) cây thì có khoảng ([\d ]+) cây quả vàng, lá nguyên/);
    assert.equal(ghep("AB", "ab"), "AaBb"); coX(q, `${vn(N)} · 3 : 16 = ${vn(c)}`);
    const nhan = (s) => { const m = /F₂ có (\S+) loại kiểu hình/.exec(s); return { "bốn": 4, "chín": 9, "mười sáu": 16 }[m[1]]; };
    return [q.o[0] === "Mọi cây F₁ đều có quả đỏ, lá nguyên." && kh("AaBb") === "quả đỏ, lá nguyên", /bốn loại giao tử, mỗi loại chiếm 1\/4/.test(q.o[1]) && g1.length === 4,
      nhan(q.o[2]) === loaiKH, close(c, (N * F2.filter((k) => kh(k) === "quả vàng, lá nguyên").length) / F2.length)]; } },
  { id: "de2", has: "Hình bên là khung tổ hợp giao tử", right: (q) => {
    const K = docKhung(q.svg), [N] = so(q, /thu được (\d+) hạt ở đời con/), [, D, tim, d, vang] = /(\w) quy định hạt (\S+) trội hoàn toàn so với (\w) quy định hạt (\S+)\./.exec(q.q);
    const kh = (k) => (k.includes(D) ? tim : vang), kg = (g) => ghep(g[0], g[1]);
    assert.ok(new RegExp(`hàng trên là .* của cây hạt ${kh(kg(K.tren))}, cột trái là .* của cây hạt ${kh(kg(K.trai))}`).test(K.tieuDe) && kh(kg(K.tren)) !== kh(kg(K.trai)), "một cây hạt tím, một cây hạt vàng");
    assert.ok(d === D.toLowerCase(), "hai allele của một gene");
    const vangN = K.con.filter((k) => kh(k) === vang).length; coX(q, `${K.con.length} tổ hợp`, `${vn(N)} : ${K.con.length / vangN} = ${vn((N * vangN) / K.con.length)}`);
    return (N * vangN) / K.con.length; } },
  { id: "own", has: "Theo lí thuyết, F₂ có khoảng bao nhiêu cây quả dài", right: (q) => {
    const [N] = so(q, /F₂ gồm ([\d ]+) cây/), F2 = ["A", "a"].flatMap((x) => ["A", "a"].map((y) => ghep(x, y)));
    return (N * F2.filter((k) => !k.includes("A")).length) / F2.length; } },
  { id: "own", has: "Đoạn mạch bổ sung với nó có trình tự", right: (q) => {
    const [, s] = /có trình tự (–[ATGC–]+–)\./.exec(q.q); return "–" + chuoiNu(s).map((x) => BO_SUNG[x]).join("–") + "–"; } },
  { id: "de1", has: "Đoạn mRNA được phiên mã từ đoạn mạch này", right: (q) => {
    const [, s] = /mạch khuôn của gene có trình tự 3'–([ATGC–]+)–5'/.exec(q.q); return "5'–" + chuoiNu(s).map((x) => PHIEN_MA[x]).join("–") + "–3'"; } },
  { id: "de2", has: "tái bản một lần, môi trường tế bào cần cung cấp", right: (q) => {
    const [A, G] = so(q, /có (\d+) nucleotide loại A và (\d+) nucleotide loại G/); coX(q, `2 · ${A} + 2 · ${G} = ${vn(2 * A + 2 * G)}`); return 2 * A + 2 * G; } },
  { id: "own", has: "Mạch 2 được dùng làm khuôn để phiên mã", right: (q) => {
    const [, s] = /có mạch 1 là ([ATGC–]+) và mạch 2/.exec(q.q), m1 = chuoiNu(s), m2 = m1.map((x) => BO_SUNG[x]), mRNA = m2.map((x) => PHIEN_MA[x]);
    const tr = (o) => { const m = /có trình tự ([ATGCU–]+)\.$/.exec(o); return m ? chuoiNu(m[1]).join("") : null; };
    const [a, b, c, d] = q.o, nU = +(/có (\d+) nucleotide loại U\./.exec(d) || [])[1];
    assert.ok(/^Đoạn mRNA/.test(a) && /^Mạch 2/.test(b) && /mỗi phân tử DNA con gồm một mạch cũ và một mạch mới/.test(c), "thứ tự các ý");
    return [tr(a) === mRNA.join(""), tr(b) === m2.join(""), true, nU === mRNA.filter((x) => x === "U").length]; } },
  { id: "de1", has: "Cho biết một số codon và amino acid tương ứng", right: (q) => {
    const bang = {}; [...q.q.matchAll(/([AUGC]{3}) – (\p{L}+) \((\w+)\)/gu)].forEach((m) => { bang[m[1]] = m[3]; assert.deepEqual(TEN_AA[MA[m[1]]], [m[2], m[3]], "bảng mã đề cho đúng mã chuẩn: " + m[1]); });
    const ket = [...q.q.matchAll(/([AUGC]{3}) là codon kết thúc/g)].map((m) => m[1]); ket.forEach((c) => assert.equal(MA[c], "*", c + " là codon kết thúc"));
    const [, mRNA] = /5'-([AUGC ]+)-3'/.exec(q.q), out = [];
    for (const c of mRNA.split(" ")) { if (ket.includes(c)) break; assert.ok(bang[c], "codon " + c + " có trong bảng đề cho"); out.push(bang[c]); }
    return out.join(" – "); } },
  { id: "own", has: "Mỗi ý sau nói về mã di truyền và về dịch mã", right: (q) => {
    const [a, b, c, d] = q.o, soCodon = {}; Object.values(MA).forEach((x) => (soCodon[x] = (soCodon[x] || 0) + 1));
    assert.ok(/ba nucleotide/.test(a) && /^Phân tử mRNA trực tiếp vận chuyển amino acid/.test(d), "thứ tự các ý");
    const [, cb] = /^Codon ([AUGC]{3}) quy định một loại amino acid/.exec(b) || [];
    const ala = Object.keys(MA).filter((k) => MA[k] === "A"); coX(q, ala.join(", ") + " đều quy định alanine");
    return [Object.keys(MA).every((k) => k.length === 3), MA[cb] !== "*", Object.values(soCodon).every((k) => k === 1), false]; } }
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

/* ---------- chữ ---------- */
const PHAN_MON = { "Vật lí": [2, 10], "Hoá học": [22, 32], "Sinh học": [36, 41] };
// 24 chủ đề theo thứ tự bài của sách (Bài 8 và Bài 9 chung chủ đề Thấu kính, Bài 29 và Bài 30 chung chủ đề Carbohydrate)
const CHU_DE = [["Động năng. Thế năng", 2], ["Cơ năng", 3], ["Công và công suất", 4], ["Khúc xạ ánh sáng", 5], ["Phản xạ toàn phần", 6], ["Lăng kính", 7],
  ["Thấu kính", 8], ["Kính lúp. Bài tập thấu kính", 10], ["Giới thiệu về hợp chất hữu cơ", 22], ["Alkane", 23], ["Alkene", 24], ["Nguồn nhiên liệu", 25],
  ["Ethylic alcohol", 26], ["Acetic acid", 27], ["Lipid", 28], ["Carbohydrate", 29], ["Protein", 31], ["Polymer", 32], ["Khái quát về di truyền học", 36],
  ["Các quy luật di truyền của Mendel", 37], ["Nucleic acid và gene", 38], ["Tái bản DNA và phiên mã tạo RNA", 39], ["Dịch mã và mối quan hệ từ gene đến tính trạng", 40], ["Đột biến gene", 41]];
const monCua = (t) => { const b = CHU_DE.find((c) => c[0] === t)[1]; return Object.keys(PHAN_MON).find((k) => b >= PHAN_MON[k][0] && b <= PHAN_MON[k][1]); };
const chu = (q) => [q.q, q.x].concat(q.o || [], q.unit || []).map(String);
kho.forEach((q) => {
  const at = q.src + ": " + q.q.slice(0, 50);
  chu(q).forEach((s) => {
    // công thức hoá học viết bằng chữ số dưới dòng (C₂H₅OH, F₁), không viết C2H5OH, F1
    assert.ok(!/(?:^|[^A-Za-z])(?:[A-Z][a-z]?)+\d/.test(s.replace(/\d+(?:,\d+)? (?:mL|mol|g|L)\b/g, "")), at + ": công thức cần chữ số dưới dòng: " + s);
    // tên chất như sách (ethylic alcohol, acetic acid, saccharose, nước bromine…), không dùng tên kiểu cũ hay tên khác
    assert.ok(!/(?<![\p{L}])(?:etilen|metan|etan|axit|axetic|glucozơ|saccarozơ|xenlulozơ|fructozơ|polime|monome|brom|hiđro|hidro|cacbon|oxi|nitơ|clo|benzen|este|natri hiđroxit|ethanol|sucrose|ethene|propene|anticodon)(?![\p{L}])/iu.test(s), at + ": tên chất, thuật ngữ khác sách: " + s);
    // dấu thanh kiểu cũ như sách (hoá, thuỷ, toả, huỷ, tuỳ, hoà)
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
assert.ok(canBang("C₃H₈ + 5O₂ → 3CO₂ + 4H₂O") && canBang("(RCOO)₃C₃H₅ + 3NaOH → 3RCOONa + C₃H₅(OH)₃") && !canBang("C₂H₅OH + 2O₂ → 2CO₂ + 3H₂O") && !canBang("CH₃COOH + Mg → (CH₃COO)₂Mg + H₂"));
assert.equal(KL("(CH₃COO)₂Mg"), 142); assert.equal(KL("C₁₂H₂₂O₁₁"), 342);

/* ---------- mức độ, ma trận, phân môn ---------- */
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const M = pool.pool.matrix, cells = Object.values(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), pool.n, "tổng ma trận bằng n");
assert.deepEqual(Object.keys(M), CHU_DE.map((c) => c[0]), "chủ đề theo thứ tự bài của sách");
[S.de1, S.de2, S.own].forEach((id) => assert.deepEqual([...new Set(kho.filter((q) => q.src === id).map((q) => q.topic))], Object.keys(M), id + ": đủ chủ đề, đúng thứ tự"));
// hai đề cố định và câu riêng đều chia đúng ma trận, nên ô nào cũng có gấp ba số câu ô đó rút
[S.de1, S.de2, S.own].forEach((id) => Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => kho.filter((q) => q.src === id && q.topic === t && q.lv === l).length), v, id + " đúng ma trận ở chủ đề " + t)));
// số câu mỗi phân môn đúng như lời dặn của đề
const theoMon = Object.keys(PHAN_MON).map((m) => [m, sum(Object.entries(M).filter(([t]) => monCua(t) === m).map(([, v]) => sum(v)))]);
[S.de1, S.de2].forEach((id) => theoMon.forEach(([m, k]) => assert.ok(new RegExp(`${m} Bài ${PHAN_MON[m][0]}–${PHAN_MON[m][1]} \\([^)]*\\) ${k} câu`).test(bank(id).note), id + ": lời dặn ghi " + m + " " + k + " câu")));
assert.ok(bank(S.own).note.includes("mỗi lần rút " + theoMon.map(([m, k]) => k + " câu " + m).join(", ")), "lời dặn của đề ngẫu nhiên ghi số câu mỗi phân môn");
theoMon.forEach(([m]) => assert.ok(bank(S.own).note.includes(`${m} Bài ${PHAN_MON[m][0]}–${PHAN_MON[m][1]}`), "lời dặn của đề ngẫu nhiên ghi phạm vi " + m));

/* ---------- dạng câu ---------- */
assert.ok(kho.every((q) => ["mc", "tf4", "num", "fill"].includes(q.type)), "chỉ dùng dạng câu của khung Công văn 7991, không có tự luận");
[S.de1, S.de2].forEach((id) => {
  const qs = bank(id).questions;
  assert.ok(qs.filter((q) => q.type === "tf4").length >= 3, id + ": cần câu đúng/sai 4 ý");
  assert.ok(qs.filter((q) => q.type === "num").length >= 3, id + ": cần câu trả lời bằng số");
});
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 4, "mỗi kho ít nhất 4 câu đúng/sai 4 ý");
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.ok(Math.max(...Object.values(kieu)) === 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
// lời giải không nói “ý thứ hai”, “phương án A”: app xáo phương án (ý của câu đúng/sai giữ thứ tự a, b, c, d)
kho.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của phương án: " + q.q.slice(0, 50)));
// câu số dùng máy tính cầm tay dặn làm tròn đến chữ số thập phân thứ hai (phần Đáp án của app ghi hai chữ số)
kho.filter((q) => q.type === "num" && !Number.isInteger(q.ans * 10)).forEach((q) => assert.ok(/làm tròn kết quả đến chữ số thập phân thứ hai/i.test(q.q), "dặn làm tròn: " + q.q.slice(0, 50)));
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2); các lựa chọn không trùng nhau
kho.filter((q) => q.type === "mc").forEach((q) => {
  const m = Math.max(...q.o.slice(1).map((o) => o.length));
  assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + q.q.slice(0, 50));
  assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + q.q.slice(0, 50));
});

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

/* ---------- dò lộ đáp án giữa hai câu rút được cùng lúc (khác ô (chủ đề, mức), hoặc cùng một ô rút từ 2 câu) ----------
   Đáp án là số (từ hai chữ số, hoặc số thập phân) tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”, “bằng”, “được”): không được có.
   Đáp án bằng chữ (lựa chọn đúng) tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy cả đáp án, Rút ra N19); chuỗi
   có trong đề bài, lựa chọn, lời giải của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM. */
const ten = new Map();
[S.de1, S.de2, S.own].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, (id === S.own ? "own" : id.slice(-3)) + "#" + (i + 1))));
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
const cungLuc = (p, q) => p !== q && (p.topic !== q.topic || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2);
const tu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum = (s) => { const w = tu(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const doLo = (qs, tenCau = (q) => ten.get(q)) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    const soDa = q.type === "num" && (q.ans >= 10 || !Number.isInteger(q.ans)) ? [q.ans] : [], C = q.type === "mc" ? [...new Set(cum(q.o[0]))] : [];
    qs.forEach((p) => {
      if (!cungLuc(p, q)) return;
      const at = `${tenCau(p)} → ${tenCau(q)}: `, T = " " + chu(p).map((s) => tu(s).join(" ")).join(" | ") + " ";
      soDa.filter((x) => chu(p).flatMap(soKQ).some((y) => close(x, y))).forEach((x) => lo.push(at + x));
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
const { lo, chuLo } = doLo(kho);
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuLo.join("\n"));
// đã xem (Phiên N9-ck1-khtn): chữ chung, câu kia không nói tới điều câu này hỏi. “suất lớn hơn”: “chiết suất lớn hơn” của câu phản xạ
// toàn phần (câu này so công suất hai máy bơm); “cách thấu kính”: câu lưới ô vuông hỏi ảnh cách thấu kính bao xa (câu này hỏi vị trí vật,
// ảnh khi đo tiêu cự bằng phương pháp Silbermann); “a c g”: ba chữ cái cuối của mạch 1 trong câu đúng/sai về phiên mã; “tia 1”: tên tia
// trong hình lăng kính; “tan trong nước”, “không tan trong”: nói về ethane, ethylene và về đường (câu này hỏi về chất béo); “khi đun
// nóng”: phản ứng tráng bạc; “có màu đỏ”: quả cà chua, ngọn lửa đèn dầu (câu này hỏi màu hoa khi gene hỏng).
const DA_XEM = [
  "de1#6 → own#4: suất lớn hơn", "de2#6 → own#4: suất lớn hơn", "de1#9 → own#8: cách thấu kính", "own#23 → own#22: a c g", "de2#7 → de1#5: tia 1",
  "de2#12 → de2#16: tan trong nước", "de2#17 → de2#16: không tan trong", "de2#17 → de2#16: tan trong nước", "own#17 → de2#18: khi đun nóng",
  "own#7 → de2#24: có màu đỏ", "de2#11 → de2#24: có màu đỏ"
];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 7 500”, “là 1,6”, cụm của đáp án bằng chữ
{
  const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x }), khac = tim("Trường hợp nào sau đây là đột biến gene");
  const thuLo = (qs) => { const r = doLo(qs, (q) => q.q.slice(0, 12)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  assert.deepEqual(thuLo([tim("Động năng của xe máy và người"), gia(khac, "Ví dụ Wđ = 7 500 J.")]), ["7500"]);
  assert.deepEqual(thuLo([tim("Chiết suất của loại nhựa này"), gia(khac, "Chiết suất là 1,6.")]), ["1.6"]);
  assert.deepEqual(thuLo([tim("Khi khoan vào một mỏ dầu"), gia(khac, "Lớp trên cùng là khí mỏ dầu.")]), ["khí mỏ dầu"]);
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
// cụm từ chung của môn (tên bài, cách nói chuẩn của đề bài tập, lời dặn làm tròn) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít
// nhất 5 từ có chữ (bỏ qua chuỗi toàn kí hiệu nucleotide, số)
const TU_CHUNG = ["làm tròn kết quả đến chữ số thập phân thứ hai", "đặt vuông góc với trục chính của"].map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
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
  const khac = BANKS.filter((b) => !b.pool && !/^khtn9-ck1-/.test(b.id)).flatMap((b) => b.questions.map((q) => ({ id: b.id, s: " " + chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại hoặc đọc lại hình (" + soPT + " phương trình hoá học cân bằng); kho " + kho.length + " câu (" + mine.length + " câu riêng), ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề: " + theoMon.map(([m, k]) => m + " " + k).join(", ") + ".");
console.log("MATH OK");
