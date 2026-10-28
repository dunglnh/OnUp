// Kiểm tra ngân hàng KHTN 9 giữa kì II của Phiên N9-gk2-khtn (data/banks/9-khtn.js: hai đề cố định và câu riêng của đề ngẫu nhiên
// khtn9-gk2-ngau-nhien), theo mẫu tests/khtn9-ck1.js. Số đề, số câu lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7 như mọi kho
// lớp 9; số câu mỗi phân môn so với lời dặn (note) của đề.
// Câu có phép tính hoặc có hình được nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong kho, đúng đề ghi ở id); đáp án tính bằng
// code (so với ans, o[0] hoặc a): điện trở theo định luật Ohm, theo chiều dài, tiết diện, điện trở suất; năng lượng điện, công suất điện,
// kWh; tính theo phương trình hoá học (khối lượng mol từ nguyên tử khối đề cho, hệ số đọc từ phương trình trong lời giải), hiệu suất;
// dãy hoạt động hoá học (kim loại nào đẩy được kim loại nào, kim loại nào tác dụng với dung dịch HCl; thứ tự suy ra từ thí nghiệm; chọn
// dung dịch làm sạch kim loại, chọn cặp thí nghiệm chứng minh thứ tự); số NST, số chromatid, số tế bào qua nguyên phân, giảm phân (bộ
// NST của từng loài so với bảng ở dưới), giao tử và tỉ lệ kiểu hình khi lai phân tích hai cặp gene liên kết, dạng đột biến số lượng.
// Hình đọc lại: sơ đồ mạch điện (dây nối, nguồn điện, điện trở, ampe kế, vôn kế, bóng đèn, chỗ nối có chấm tròn) rồi giải lại mạch bằng
// phương pháp điện thế nút, lấy số chỉ của từng ampe kế, vôn kế; đồ thị cường độ dòng điện theo hiệu điện thế (trục, nhãn, đường thẳng
// qua gốc); NST trước và sau đột biến (các đoạn có chữ, tâm động) rồi xác định dạng đột biến cấu trúc. Mọi phương trình hoá học trong
// câu Hoá học phải cân bằng. Câu trả lời bằng số và câu có hình nào cũng phải có kiểm tra ở đây.
// Rồi: chữ (công thức hoá học viết bằng chữ số dưới dòng, tên chất như sách, không có tên chất kiểu cũ, dấu thanh kiểu cũ như sách “hoá”,
// “thuỷ”; số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân), mức độ và ma trận (12 chủ đề theo thứ tự bài của sách; hai đề cố
// định và câu riêng chia đúng ma trận), dạng câu theo khung Công văn 7991 (đúng/sai 4 ý không lặp kiểu Đ/S, trả lời ngắn bằng số), đáp
// án đúng không dài hơn hẳn lựa chọn sai và không là lựa chọn duy nhất có chữ của nhãn chủ đề, rút thử nhiều lần (đúng ma trận, gặp đủ
// câu riêng; đã làm hết một đề cố định thì không rút lại câu của đề đó), đề bài không trùng, dò lộ đáp án giữa các câu rút được cùng lúc
// (số ở vị trí kết quả: không được có; chuỗi 3 từ của đáp án bằng chữ in ra với DO_LO=1 để xem tay, đã xem ghi ở DA_XEM). Có sách ở
// ../OnUp-Book (repo riêng tư) thì so mọi trường chữ với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp nguyên âm (không chuỗi 8 từ nào trùng;
// DO_SACH=1 in chuỗi 6 từ) và với câu của mọi kho khác (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 5 từ).
// Chạy: node tests/khtn9-gk2.js → in MATH OK.
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
const pool = BANKS.find((b) => b.pool && /^khtn9-gk2-/.test(b.id));
assert.ok(pool, "thiếu đề ngẫu nhiên khtn9-gk2");
assert.equal(pool.pool.from.length, 2, "đề ngẫu nhiên lấy câu của hai đề cố định");
const S = { de1: pool.pool.from[0], de2: pool.pool.from[1], own: pool.id };
assert.deepEqual(BANKS.filter((b) => /^khtn9-gk2-/.test(b.id)).map((b) => b.id).sort(), Object.values(S).sort(), "kho gồm hai đề cố định và đề ngẫu nhiên");
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
const SO = "([\\d ]*\\d(?:,\\d+)?)"; // một số viết như trong đề: "1 800", "0,25"
const MU = { "⁻": "-", "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9" };
const khoa = (s) => { const m = /^([\d,]+) · 10([⁻⁰-⁹¹²³]+)$/.exec(s.trim()); assert.ok(m, "số viết dạng a · 10ⁿ: " + s); return val(m[1]) * 10 ** +[...m[2]].map((c) => MU[c]).join(""); }; // "1,1 · 10⁻⁶" → 1.1e-6

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const ends = (l) => [[num(l, "x1"), num(l, "y1")], [num(l, "x2"), num(l, "y2")]];
const same = (p, q) => close(p[0], q[0], 1e-6) && close(p[1], q[1], 1e-6);
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const key = (p) => p[0] + "," + p[1];
// điểm p nằm hẳn bên trong đoạn [a, b] (không trùng hai đầu)
const trong = (p, [a, b]) => Math.abs((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) < 1e-6 && Math.min(a[0], b[0]) <= p[0] && p[0] <= Math.max(a[0], b[0]) &&
  Math.min(a[1], b[1]) <= p[1] && p[1] <= Math.max(a[1], b[1]) && !same(p, a) && !same(p, b);

/* Sơ đồ mạch điện: dây nối là đoạn thẳng màu ink nét 2, nằm ngang hoặc thẳng đứng; nguồn điện là hai bản thẳng đứng, bản dài nét 2,5 (cực
   dương) và bản ngắn nét 5 (cực âm), dây nối vào giữa mỗi bản; điện trở là hình chữ nhật, nhãn R₁, R₂… ngay phía trên; ampe kế, vôn kế
   là vòng tròn bán kính 13 có chữ A, A₁…, V ở giữa; bóng đèn là vòng tròn bán kính 13 có dấu nhân (path), nhãn Đ₁, Đ₂ ngay phía trên;
   chỗ nối của từ ba nhánh trở lên có chấm tròn đậm (bán kính 3,5). Hai đầu của mỗi phần tử là chỗ dây nối chạm vào nó. */
const docMach = (svg) => {
  const LN = tags(svg, "line"), TX = texts(svg), CI = tags(svg, "circle"), PA = tags(svg, "path");
  assert.ok(LN.every((l) => l.stroke === "ink" && ["2", "2.5", "5"].includes(l["stroke-width"])), "mọi đoạn thẳng là dây nối hoặc bản của nguồn điện");
  const day = LN.filter((l) => l["stroke-width"] === "2").map(ends);
  day.forEach(([p, q]) => assert.ok(!same(p, q) && (p[0] === q[0] || p[1] === q[1]), "dây nối nằm ngang hoặc thẳng đứng"));
  const ban = (w) => LN.filter((l) => l["stroke-width"] === w).map(ends);
  const [duong, am] = [ban("2.5"), ban("5")];
  assert.ok(duong.length === 1 && am.length === 1, "mạch có đúng một nguồn điện");
  [duong[0], am[0]].forEach(([p, q]) => assert.equal(p[0], q[0], "bản của nguồn điện thẳng đứng"));
  assert.ok(dist(...duong[0]) > dist(...am[0]), "bản dương dài hơn bản âm");
  const giua = ([p, q]) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const pt = [{ loai: "nguon", dau: [giua(duong[0]), giua(am[0])] }];
  assert.ok(TX.some((t) => t.t === "+" && dist([+t.x, +t.y], pt[0].dau[0]) < 20) && TX.some((t) => t.t === "−" && dist([+t.x, +t.y], pt[0].dau[1]) < 20), "dấu + ở bản dài, dấu − ở bản ngắn");
  tags(svg, "rect").forEach((r) => {
    const [x, y, w, h] = ["x", "y", "width", "height"].map((k) => num(r, k));
    pt.push({ loai: "R", tam: [x + w / 2, y + h / 2], dau: w > h ? [[x, y + h / 2], [x + w, y + h / 2]] : [[x + w / 2, y], [x + w / 2, y + h]] });
  });
  const dauDay = day.flat();
  CI.filter((c) => +c.r === 13).forEach((c) => {
    const tam = [+c.cx, +c.cy], chu = TX.filter((t) => dist([+t.x, +t.y - 5], tam) < 6);
    const dau = dauDay.filter((p) => close(dist(p, tam), 13, 1e-6));
    assert.equal(dau.length, 2, "đồng hồ, bóng đèn có đúng hai đầu nối dây");
    if (chu.length) { assert.equal(chu.length, 1); assert.ok(/^[AV][₁₂₃]?$/.test(chu[0].t), "chữ trong đồng hồ: " + chu[0].t); pt.push({ loai: chu[0].t[0], nhan: chu[0].t, tam, dau }); }
    else {
      const nhan = PA.filter((p) => { const xy = (p.d.match(/-?[\d.]+/g) || []).map(Number); return xy.length === 8 && xy.every((v, k) => Math.abs(v - tam[k % 2]) < 13); });
      assert.equal(nhan.length, 1, "vòng tròn không có chữ là bóng đèn (có dấu nhân bên trong)"); pt.push({ loai: "D", tam, dau });
    }
  });
  pt.filter((p) => p.loai === "R" || p.loai === "D").forEach((p) => {
    const n = TX.filter((t) => Math.abs(+t.x - p.tam[0]) < 1e-6 && +t.y < p.tam[1] && p.tam[1] - +t.y < 25);
    assert.equal(n.length, 1, "mỗi điện trở, bóng đèn có một nhãn ngay phía trên"); p.nhan = n[0].t;
    assert.ok(new RegExp(`^${p.loai === "R" ? "R" : "Đ"}[₁₂₃]$`).test(p.nhan), "nhãn " + p.nhan);
  });
  assert.equal(new Set(pt.filter((p) => p.nhan).map((p) => p.nhan)).size, pt.filter((p) => p.nhan).length, "nhãn không trùng nhau");
  // nút: gộp các điểm trùng nhau; hai đầu một dây nối là một nút; đầu dây chạm giữa dây khác cũng nối vào dây đó
  const cha = {}, goc = (k) => (cha[k] === undefined || cha[k] === k ? (cha[k] = k) : (cha[k] = goc(cha[k]))), noi = (a, b) => (cha[goc(key(a))] = goc(key(b)));
  day.forEach(([p, q]) => noi(p, q));
  dauDay.forEach((p) => day.forEach((d) => { if (trong(p, d)) noi(p, d[0]); }));
  const dauPT = pt.flatMap((p) => p.dau);
  dauPT.forEach((p) => assert.ok(dauDay.some((q) => same(p, q)), "đầu phần tử nào cũng có dây nối"));
  dauDay.forEach((p) => assert.ok(dauDay.filter((q) => same(p, q)).length >= 2 || dauPT.some((q) => same(p, q)) || day.some((d) => trong(p, d)), "dây nối không bỏ lửng: " + key(p)));
  // chấm tròn đậm đúng ở chỗ nối của từ ba nhánh trở lên
  const bac = (p) => dauDay.filter((q) => same(p, q)).length + dauPT.filter((q) => same(p, q)).length + day.filter((d) => trong(p, d)).length * 2;
  const cham = CI.filter((c) => +c.r === 3.5).map((c) => [+c.cx, +c.cy]);
  [...new Set(dauDay.map(key))].map((k) => k.split(",").map(Number)).forEach((p) => assert.equal(cham.some((c) => same(c, p)), bac(p) >= 3, "chấm tròn ở chỗ nối ba nhánh: " + key(p)));
  pt.forEach((p) => { p.nut = p.dau.map((d) => goc(key(d))); assert.notEqual(p.nut[0], p.nut[1], "phần tử " + (p.nhan || p.loai) + " bị nối tắt"); });
  return pt;
};
/* Giải mạch bằng phương pháp điện thế nút: nguồn điện và ampe kế (điện trở không đáng kể) là các nguồn hiệu điện thế (ampe kế là nguồn
   0 V), vôn kế coi như hở mạch. gt: { U, "R₁": 12, "Đ₁": 7… }; bo: nhãn các phần tử tháo ra. Trả về số chỉ của ampe kế, vôn kế, cường
   độ dòng điện và hiệu điện thế của từng điện trở, bóng đèn, cường độ dòng điện qua nguồn và điện trở tương đương của mạch ngoài. */
const giaiMach = (pt, gt, bo = []) => {
  const ds = pt.filter((p) => !bo.includes(p.nhan)), nguon = ds.find((p) => p.loai === "nguon");
  const nut = [...new Set(ds.flatMap((p) => p.nut))].filter((k) => k !== nguon.nut[1]), so = (k) => nut.indexOf(k); // cực âm là mốc 0 V
  const nguonV = ds.filter((p) => p.loai === "nguon" || p.loai === "A"), N = nut.length, M = N + nguonV.length;
  const A = Array.from({ length: M }, () => new Array(M).fill(0)), b = new Array(M).fill(0);
  nut.forEach((k, i) => (A[i][i] += 1e-12)); // tránh nút treo khi hở mạch
  ds.filter((p) => p.loai === "R" || p.loai === "D").forEach((p) => {
    assert.ok(gt[p.nhan] > 0, "thiếu giá trị của " + p.nhan); const g = 1 / gt[p.nhan], [i, j] = p.nut.map(so);
    if (i >= 0) A[i][i] += g; if (j >= 0) A[j][j] += g; if (i >= 0 && j >= 0) { A[i][j] -= g; A[j][i] -= g; }
  });
  nguonV.forEach((p, k) => { const [i, j] = p.nut.map(so), r = N + k;
    if (i >= 0) { A[i][r] += 1; A[r][i] += 1; } if (j >= 0) { A[j][r] -= 1; A[r][j] -= 1; } b[r] = p.loai === "nguon" ? gt.U : 0; });
  for (let c = 0; c < M; c++) { // khử Gauss, chọn phần tử trụ lớn nhất
    let r = c; for (let k = c + 1; k < M; k++) if (Math.abs(A[k][c]) > Math.abs(A[r][c])) r = k;
    [A[c], A[r]] = [A[r], A[c]]; [b[c], b[r]] = [b[r], b[c]]; assert.ok(Math.abs(A[c][c]) > 1e-15, "mạch không giải được");
    for (let k = 0; k < M; k++) if (k !== c) { const f = A[k][c] / A[c][c]; if (f) { for (let j = c; j < M; j++) A[k][j] -= f * A[c][j]; b[k] -= f * b[c]; } }
  }
  const x = b.map((v, i) => v / A[i][i]), V = (k) => (so(k) < 0 ? 0 : x[so(k)]), kq = { I: {}, U: {}, so: {} };
  ds.forEach((p) => { const u = Math.abs(V(p.nut[0]) - V(p.nut[1]));
    if (p.loai === "R" || p.loai === "D") { kq.U[p.nhan] = u; kq.I[p.nhan] = u / gt[p.nhan]; }
    if (p.loai === "V") kq.so[p.nhan] = u;
    if (p.loai === "A") kq.so[p.nhan] = Math.abs(x[N + nguonV.indexOf(p)]); });
  kq.Inguon = Math.abs(x[N + nguonV.indexOf(nguon)]); kq.Rtd = gt.U / kq.Inguon;
  return kq;
};
// giá trị đề cho: “R₁ = 12 Ω”, “hiệu điện thế 9 V”
const dienTroDe = (q) => Object.fromEntries([...q.q.matchAll(new RegExp(`(R[₁₂₃]) = ${SO} Ω`, "g"))].map((m) => [m[1], val(m[2])]));
const ktMach = (pt, R) => assert.deepEqual(pt.filter((p) => p.loai === "R").map((p) => p.nhan).sort(), Object.keys(R).sort(), "điện trở trong hình đúng như đề cho");

/* Đồ thị I theo U: trục hoành, trục tung màu ink nét 1,5 cắt nhau ở gốc; nhãn số dưới trục hoành (U, vôn) và bên trái trục tung (I, ampe,
   text-anchor end); đường đồ thị màu acc; chấm tròn màu acc đánh dấu một điểm đọc được trên lưới. */
const docDoThi = (svg) => {
  const LN = tags(svg, "line"), TX = texts(svg), truc = LN.filter((l) => l.stroke === "ink" && l["stroke-width"] === "1.5").map(ends);
  assert.equal(truc.length, 2, "hai trục");
  const ngang = truc.find(([p, q]) => p[1] === q[1]), dung = truc.find(([p, q]) => p[0] === q[0]), O = [dung[0][0], ngang[0][1]];
  assert.ok(same(ngang[0], O) && same(dung[0], O), "hai trục bắt đầu từ gốc O");
  const so = TX.filter((t) => /^\d+(,\d+)?$/.test(t.t)).map((t) => ({ x: +t.x, y: +t.y, v: val(t.t), cuoi: t["text-anchor"] === "end" }));
  const nhanU = so.filter((t) => !t.cuoi && t.y > O[1]), nhanI = so.filter((t) => t.cuoi && t.x < O[0]);
  assert.ok(nhanU.length >= 4 && nhanI.length >= 4 && nhanU.length + nhanI.length === so.length, "mọi số là nhãn của một trục");
  const kU = nhanU.map((t) => t.v / (t.x - O[0])), kI = nhanI.map((t) => t.v / (O[1] - (t.y - 5)));
  assert.ok(kU.every((k) => close(k, kU[0], 1e-9)) && kI.every((k) => close(k, kI[0], 1e-9)), "nhãn trục cách đều, bắt đầu từ 0 ở gốc");
  assert.ok(TX.some((t) => t.t === "U (V)") && TX.some((t) => t.t === "I (A)"), "tên trục U (V), I (A)");
  const ds = LN.filter((l) => l.stroke === "acc").map(ends); assert.equal(ds.length, 1, "một đường đồ thị");
  const [a, c] = ds[0], doc = (p) => [(p[0] - O[0]) * kU[0], (O[1] - p[1]) * kI[0]];
  assert.ok(same(a, O), "đường đồ thị đi qua gốc toạ độ");
  const [U, I] = doc(c), cham = tags(svg, "circle").filter((k) => k.fill === "acc").map((k) => doc([+k.cx, +k.cy]));
  assert.equal(cham.length, 1, "một điểm đánh dấu");
  const [u, i] = cham[0]; assert.ok(close(u * I, i * U, 1e-9), "điểm đánh dấu nằm trên đường đồ thị");
  assert.ok(nhanU.some((t) => close(t.v, u, 1e-9)) && nhanI.some((t) => close(t.v, i, 1e-9)), "điểm đánh dấu ở chỗ hai đường lưới có nhãn cắt nhau");
  return { R: U / I, diem: [u, i] };
};

/* NST trước và sau đột biến: mỗi đoạn là một ô chữ nhật có một chữ cái ở giữa; tâm động là chấm tròn tô ink bán kính 7; mỗi NST nằm
   trên một hàng, ngay dưới nhãn “Trước đột biến” / “Sau đột biến”. */
const docNST = (svg) => {
  const TX = texts(svg), o = tags(svg, "rect").map((r) => ({ x: +r.x, y: +r.y, w: +r.width, h: +r.height })), tam = tags(svg, "circle").filter((c) => +c.r === 7 && c.fill === "ink");
  const chuO = (r) => { const c = TX.filter((t) => close(+t.x, r.x + r.w / 2, 1e-6) && +t.y > r.y && +t.y < r.y + r.h); assert.equal(c.length, 1, "mỗi ô một chữ"); return c[0].t; };
  const hang = (nhan) => { const t = TX.find((x) => x.t === nhan); assert.ok(t, "nhãn " + nhan); const y = +t.y;
    const ds = o.filter((r) => r.y > y && r.y - y < 20).map((r) => ({ x: r.x, c: chuO(r) })).concat(tam.filter((c) => +c.cy > y && +c.cy - y < 30).map((c) => ({ x: +c.cx, c: "•" })));
    return ds.sort((a, b) => a.x - b.x).map((d) => d.c).join(""); };
  return { truoc: hang("Trước đột biến"), sau: hang("Sau đột biến") };
};
// dạng đột biến cấu trúc NST: so chuỗi các đoạn trước và sau
const dangDotBien = (a, b) => {
  const bo = (s, i, k) => s.slice(0, i) + s.slice(i + k);
  for (let i = 0; i < a.length; i++) for (let k = 1; i + k <= a.length; k++) {
    if (!a.slice(i, i + k).includes("•") && bo(a, i, k) === b) return "Mất đoạn";
    if (!a.slice(i, i + k).includes("•") && a.slice(0, i + k) + a.slice(i, i + k) + a.slice(i + k) === b) return "Lặp đoạn";
    if (k > 1 && a.slice(0, i) + [...a.slice(i, i + k)].reverse().join("") + a.slice(i + k) === b) return "Đảo đoạn";
  }
  return [...b].some((c) => !a.includes(c)) ? "Chuyển đoạn" : null;
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
const NTK = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 64, Zn: 65, Ag: 108 };
const KL = (f, nt = NTK) => Object.entries(congThuc(f)).reduce((s, [e, c]) => { assert.ok(e in nt, "thiếu nguyên tử khối của " + e); return s + nt[e] * c; }, 0);
const VE = /\d*\(?[A-Z][A-Za-z₀-₉()]*/.source, PT = new RegExp(`${VE}(?: \\+ ${VE})* (?:→|⇌) ${VE}(?: \\+ ${VE})*`, "g");
const ve = (s) => s.split(" + ").map((t) => { const m = /^(\d*)(\S+)$/.exec(t.trim()); return { k: m[1] ? +m[1] : 1, f: m[2] }; });
const tach = (pt) => pt.split(/ (?:→|⇌) /).map(ve);
const canBang = (pt) => { const dem = (v) => { const o = {}; v.forEach(({ k, f }) => Object.entries(congThuc(f)).forEach(([e, c]) => (o[e] = (o[e] || 0) + k * c))); return o; };
  const [a, b] = tach(pt).map(dem); return [...new Set([...Object.keys(a), ...Object.keys(b)])].every((e) => a[e] === b[e]); };
// tính theo phương trình: biết số mol của chất x, tìm số mol của chất y
const heSo = (pt, f) => { const c = tach(pt).flat().filter((v) => v.f === f); assert.equal(c.length, 1, f + " có đúng một lần trong " + pt); return c[0].k; };
const molTheoPT = (pt, x, nx, y) => (nx * heSo(pt, y)) / heSo(pt, x);
const ptTrong = (s, x, y) => { const p = (s.match(PT) || []).filter((t) => tach(t).flat().some((v) => v.f === x) && tach(t).flat().some((v) => v.f === y));
  assert.equal(p.length, 1, "có đúng một phương trình chứa " + x + " và " + y); return p[0]; };
const ptCua = (q, x, y) => ptTrong(q.x, x, y);
// nguyên tử khối đề cho: “(Cho Al = 27; …)”; phải đúng bảng nguyên tử khối
const ntDe = (q) => { const m = /\(Cho ([^)]*)\)/.exec(q.q); assert.ok(m, "đề cho nguyên tử khối"); const nt = {};
  [...m[1].matchAll(/([A-Z][a-z]?) = ([\d,]+)/g)].forEach((k) => { nt[k[1]] = val(k[2]); assert.equal(nt[k[1]], NTK[k[1]], "nguyên tử khối của " + k[1]); }); return nt; };
const V0 = (q) => { const [v] = so(q, /1 mol khí có thể tích ([\d,]+) L/); assert.equal(v, 24.79, "thể tích 1 mol khí ở điều kiện chuẩn"); return v; };
/* Dãy hoạt động hoá học (Bài 19): kim loại đứng trước mạnh hơn; kim loại đứng trước H đẩy được hydrogen ra khỏi dung dịch HCl,
   H₂SO₄ loãng; kim loại mạnh hơn (trừ K, Na, Ca tác dụng với nước) đẩy được kim loại yếu hơn ra khỏi dung dịch muối. */
const DAY = ["K", "Na", "Ca", "Mg", "Al", "Zn", "Fe", "Pb", "H", "Cu", "Ag", "Au"];
const TEN_KL = { kali: "K", natri: "Na", calcium: "Ca", magnesium: "Mg", "nhôm": "Al", "kẽm": "Zn", "sắt": "Fe", "chì": "Pb", hydrogen: "H", "đồng": "Cu", "bạc": "Ag", "vàng": "Au" };
const kl = (ten) => { const k = TEN_KL[ten.toLowerCase()]; assert.ok(k, "tên kim loại lạ: " + ten); return k; };
const manhHon = (a, b) => DAY.indexOf(a) < DAY.indexOf(b);
const klMuoi = (f) => { const m = /^[A-Z][a-z]?/.exec(f); assert.ok(m && DAY.includes(m[0]), "muối của kim loại trong dãy: " + f); return m[0]; };
// kim loại M có phản ứng với dung dịch X (“HCl” hoặc công thức muối) không
const phanUng = (M, X) => (X === "HCl" ? manhHon(M, "H") : !["K", "Na", "Ca"].includes(M) && manhHon(M, klMuoi(X)));

/* ---------- sinh học: bộ NST lưỡng bội của các loài dùng trong đề (đối chiếu sách, tài liệu sinh học phổ thông) ---------- */
const BO_NST = { "người": 46, "mèo": 38, "cây hành": 16, "thỏ": 44, "đậu tương": 40, "ếch": 26, "cà rốt": 18, "bò": 60, "ngựa": 64 };

/* ---------- các câu cần tính ----------
   id: đề chứa câu (de1, de2, own); has: đoạn chữ của đề; right(q): đáp án tính bằng code. */
const so = (q, re) => { const m = re.exec(q.q); assert.ok(m, "đề thiếu số liệu: " + re); return m.slice(1).map(val); };
const coX = (q, ...cum) => cum.forEach((c) => assert.ok(q.x.includes(c), "lời giải cần có “" + c + "”"));
const rho = (q) => { const m = /(\S+) có điện trở suất ([^Ω]+) Ωm/.exec(q.q); assert.ok(m, "đề cho điện trở suất"); m[1] = m[1].toLowerCase();
  const RHO = { nicrom: 110e-8, constantan: 50e-8, "đồng": 1.7e-8 }; // Bảng 11.3 của sách
  const v = khoa(m[2]); assert.ok(close(v, RHO[m[1]], 1e-15), "điện trở suất của " + m[1] + " đúng như sách"); return v; };
const CHECKS = [
  /* ----- Vật lí ----- */
  { id: "de1", has: "Điện trở của vật dẫn này là bao nhiêu ôm", right: (q) => {
    const [U, I] = so(q, new RegExp(`hiệu điện thế ${SO} V vào hai đầu một vật dẫn thì dòng điện qua vật dẫn có cường độ ${SO} A`)); coX(q, `${vn(U)} : ${vn(I)} = ${vn(U / I)} (Ω)`); return U / I; } },
  { id: "de1", has: "dòng điện qua dây nung có cường độ bao nhiêu ampe", right: (q) => {
    const [l, S] = so(q, new RegExp(`dài ${SO} m, tiết diện ${SO} mm²`)), [U] = so(q, new RegExp(`hiệu điện thế ${SO} V`)), R = (rho(q) * l) / (S * 1e-6);
    coX(q, `= ${vn(R)} (Ω)`, `${vn(U)} : ${vn(R)} = ${vn(U / R)} (A)`); return U / R; } },
  { id: "de1", has: "mắc nối tiếp với một ampe kế vào nguồn điện", right: (q) => {
    const pt = docMach(q.svg), R = dienTroDe(q); ktMach(pt, R);
    const g = Object.assign({ U: 9 }, R), k = giaiMach(pt, g), cac = Object.keys(R);
    assert.ok(cac.every((r) => close(k.I[r], k.Inguon, 1e-9)) && close(k.so.A, k.Inguon, 1e-9), "mạch nối tiếp: cùng một dòng điện qua mọi phần tử");
    const [a, b, c, d] = q.o, [rt] = so({ q: a }, new RegExp(`là ${SO} Ω`)), kho = giaiMach(pt, g, ["R₂"]);
    assert.ok(/^Cường độ dòng điện chạy qua R₁ lớn hơn/.test(b) && /cộng với hiệu điện thế giữa hai đầu R₂ thì bằng hiệu điện thế giữa hai đầu cả đoạn mạch/.test(c) && /tháo bỏ R₂/.test(d), "thứ tự các ý");
    return [close(rt, k.Rtd, 1e-9), k.I["R₁"] > k.I["R₂"] + 1e-9, close(sum(cac.map((r) => k.U[r])), g.U, 1e-9), kho.I["R₁"] > 1e-6]; } },
  { id: "de1", has: "R₂ = 8 Ω mắc song song, nối với một ampe kế", right: (q) => {
    const pt = docMach(q.svg), R = dienTroDe(q); ktMach(pt, R); const [U] = so(q, new RegExp(`hiệu điện thế ${SO} V`)), k = giaiMach(pt, Object.assign({ U }, R));
    assert.ok(Object.keys(R).every((r) => close(k.U[r], U, 1e-9)), "mạch song song: mọi điện trở có cùng hiệu điện thế"); coX(q, `= ${vn(k.so.A)} (A)`); return k.so.A; } },
  { id: "de1", has: "năng lượng điện mà dây nung tiêu thụ là bao nhiêu jun", right: (q) => {
    const [R] = so(q, new RegExp(`điện trở ${SO} Ω`)), [U] = so(q, new RegExp(`là ${SO} V`)), [p] = so(q, new RegExp(`Trong ${SO} phút`));
    coX(q, `${vn(U)} : ${vn(R)} = ${vn(U / R)} (A)`, `${p} phút = ${vn(p * 60)} s`); return U * (U / R) * p * 60; } },
  { id: "de2", has: "Hệ thức nào sau đây đúng", right: (q) => {
    const [S1, S2] = so(q, new RegExp(`tiết diện ${SO} mm², dây thứ hai có tiết diện ${SO} mm²`)); assert.ok(/cùng chiều dài/.test(q.q) && /bằng nhôm/.test(q.q), "cùng chất, cùng chiều dài");
    const k = S2 / S1; assert.ok(Number.isInteger(k) && k > 1); return `R₁ = ${k}R₂`; } },
  { id: "de2", has: "Cần dùng bao nhiêu mét dây constantan", right: (q) => {
    const [S, R] = so(q, new RegExp(`tiết diện ${SO} mm² để làm một điện trở ${SO} Ω`)); return (R * S * 1e-6) / rho(q); } },
  { id: "de2", has: "Ampe kế A₂ chỉ bao nhiêu ampe", right: (q) => {
    const pt = docMach(q.svg), [I, I1] = so(q, new RegExp(`Ampe kế A chỉ ${SO} A, ampe kế A₁ chỉ ${SO} A`));
    assert.deepEqual(pt.filter((p) => p.loai === "D").map((p) => p.nhan).sort(), ["Đ₁", "Đ₂"], "hai bóng đèn");
    // điện trở bóng đèn bất kì: A đo dòng điện mạch chính, A₁, A₂ đo dòng điện qua Đ₁, Đ₂ và A = A₁ + A₂
    [[3, 5], [7.3, 11.9], [20, 4]].forEach(([d1, d2]) => { const k = giaiMach(pt, { U: 6, "Đ₁": d1, "Đ₂": d2 });
      assert.ok(close(k.so.A, k.Inguon, 1e-9) && close(k.so["A₁"], k.I["Đ₁"], 1e-9) && close(k.so["A₂"], k.I["Đ₂"], 1e-9) && close(k.so.A, k.so["A₁"] + k.so["A₂"], 1e-9), "vị trí ba ampe kế"); });
    coX(q, `${vn(I)} − ${vn(I1)} = ${vn(I - I1)} (A)`); return I - I1; } },
  { id: "de2", has: "vôn kế (điện trở rất lớn) mắc vào hai đầu R₂ chỉ", right: (q) => {
    const pt = docMach(q.svg), R = dienTroDe(q); ktMach(pt, R); const [v] = so(q, new RegExp(`hai đầu R₂ chỉ ${SO} V`));
    const k = giaiMach(pt, Object.assign({ U: 1 }, R)); assert.ok(close(k.so.V, k.U["R₂"], 1e-9), "vôn kế mắc vào hai đầu R₂"); return v / k.so.V; } },
  { id: "de2", has: "Năng lượng điện mà ấm tiêu thụ là bao nhiêu jun", right: (q) => {
    const [U, P, U2, p] = so(q, new RegExp(`có ghi ${SO} V – ${SO} W được dùng với hiệu điện thế ${SO} V để đun nước trong ${SO} phút`));
    assert.equal(U, U2, "dùng đúng hiệu điện thế định mức"); coX(q, `${p} phút = ${vn(p * 60)} s`); return P * p * 60; } },
  { id: "own", has: "Trị số này bằng bao nhiêu ôm", right: (q) => { const [k] = so(q, new RegExp(`trị số ${SO} kΩ`)); return vn(k * 1000) + " Ω"; } },
  { id: "own", has: "Điện trở của dây dẫn này là bao nhiêu ôm", right: (q) => {
    const d = docDoThi(q.svg); coX(q, `U = ${vn(d.diem[0])} V thì I = ${vn(d.diem[1])} A`, `${vn(d.diem[0])} : ${vn(d.diem[1])} = ${vn(d.R)} (Ω)`); return d.R; } },
  { id: "own", has: "hiệu điện thế giữa hai đầu cuộn dây là", right: (q) => {
    const [l, S] = so(q, new RegExp(`dài ${SO} m, tiết diện ${SO} mm²`)), [I] = so(q, new RegExp(`dòng điện ${SO} A`)), R = (rho(q) * l) / (S * 1e-6);
    assert.ok(q.o.includes(vn(R) + " V"), "một lựa chọn sai là số đo điện trở (quên nhân với cường độ dòng điện)"); return vn(I * R) + " V"; } },
  { id: "own", has: "ba điện trở R₁ = 18 Ω", right: (q) => {
    const pt = docMach(q.svg), R = dienTroDe(q); ktMach(pt, R); const [U] = so(q, new RegExp(`hiệu điện thế ${SO} V`)), k = giaiMach(pt, Object.assign({ U }, R));
    const [a, b, c, d] = q.o, [ia] = so({ q: a }, new RegExp(`chỉ ${SO} A`)), [rc] = so({ q: c }, new RegExp(`^Rtđ có giá trị ${SO} Ω`));
    assert.ok(/^Rtđ lớn hơn R₃/.test(b) && /R₃ lớn nhất/.test(d) && /Gọi Rtđ là điện trở tương đương của ba điện trở/.test(q.q), "thứ tự các ý");
    return [close(ia, k.so.A, 1e-9), k.Rtd > R["R₃"], close(rc, k.Rtd, 1e-9), Object.keys(R).every((r) => k.I["R₃"] >= k.I[r] - 1e-12)]; } },
  { id: "own", has: "nồi cơm điện tiêu thụ bao nhiêu kilôoát giờ", right: (q) => {
    const [U, I] = so(q, new RegExp(`hiệu điện thế ${SO} V thì cường độ dòng điện chạy qua nồi là ${SO} A`)), [h] = so(q, new RegExp(`dùng ${SO} giờ`)), [n] = so(q, new RegExp(`Trong ${SO} ngày`));
    const W = (U * I * h * n) / 1000; assert.ok(close(q.ans, tron(W), 1e-9) && q.tol, "làm tròn hai chữ số, có sai số tol"); return tron(W); } },
  /* ----- Hoá học ----- */
  { id: "de1", has: "Cho 5,4 g nhôm (Al)", right: (q) => {
    const nt = ntDe(q), [m] = so(q, /([\d,]+) g nhôm/), pt = ptCua(q, "Al", "H₂"), V = molTheoPT(pt, "Al", m / KL("Al", nt), "H₂") * V0(q);
    assert.ok(/làm tròn kết quả đến chữ số thập phân thứ hai/.test(q.q) && q.tol && Math.abs(q.ans - V) <= q.tol, "làm tròn hai chữ số, sai số tol"); return tron(V); } },
  { id: "de1", has: "xếp từ kim loại hoạt động hoá học mạnh nhất đến yếu nhất", right: (q) => {
    const giam = (o) => { const d = o.split(", "); return d.every((x, i) => i === 0 || manhHon(d[i - 1], x)); };
    const dung = q.o.filter(giam); assert.equal(dung.length, 1, "đúng một dãy giảm dần"); return dung[0]; } },
  { id: "de1", has: "cặp nào phản ứng được với nhau", right: (q) => {
    const co = q.o.filter((o) => { const m = /^(\S+) và dung dịch .* \(([^)]+)\)$/.exec(o); assert.ok(m, "lựa chọn dạng “kim loại và dung dịch muối (công thức)”"); return phanUng(kl(m[1]), m[2]); });
    assert.equal(co.length, 1, "đúng một cặp phản ứng"); return co[0]; } },
  { id: "de1", has: "Một mẫu bột bạc có lẫn một ít bột đồng và bột kẽm", right: (q) => {
    // ngâm trong lượng dư dung dịch X: kim loại phản ứng tan hết, kim loại của muối sinh ra; còn lại đúng bạc mới là bạc tinh khiết
    const ok = q.o.filter((o) => { const X = /^Dung dịch (\S+)$/.exec(o)[1], tan = ["Ag", "Cu", "Zn"].filter((M) => phanUng(M, X));
      const con = ["Ag", "Cu", "Zn"].filter((M) => !tan.includes(M)).concat(X === "HCl" || !tan.length ? [] : [klMuoi(X)]);
      return !tan.includes("Ag") && [...new Set(con)].join() === "Ag"; });
    assert.equal(ok.length, 1, "đúng một dung dịch làm sạch được bạc"); return ok[0]; } },
  { id: "de1", has: "quặng hematite chứa 80%", right: (q) => {
    const nt = ntDe(q), [p] = so(q, /chứa ([\d,]+)% iron\(III\) oxide/), [m] = so(q, /trong ([\d ]+) kg quặng/), pt = ptCua(q, "Fe₂O₃", "Fe");
    coX(q, `${vn(m)} · ${vn(p)} : 100 = ${vn((m * p) / 100)} (kg)`); return molTheoPT(pt, "Fe₂O₃", (m * p) / 100 / KL("Fe₂O₃", nt), "Fe") * KL("Fe", nt); } },
  { id: "de2", has: "Cho 13 g kẽm (Zn)", right: (q) => {
    const nt = ntDe(q), [m] = so(q, /([\d,]+) g kẽm/), pt = ptCua(q, "Zn", "ZnCl₂"); coX(q, `${vn(KL("ZnCl₂", nt))} (g/mol)`);
    return tron(molTheoPT(pt, "Zn", m / KL("Zn", nt), "ZnCl₂") * KL("ZnCl₂", nt)); } },
  { id: "de2", has: "Xét vị trí của các kim loại trong dãy hoạt động hoá học", right: (q) => q.o.map((o) => {
    const m = /^(\S+) đứng (sau|trước) (\S+) trong dãy/.exec(o);
    if (m) { const [a, b] = [kl(m[1]), kl(m[3])]; return m[2] === "trước" ? manhHon(a, b) : manhHon(b, a); }
    const y = /^(\S+) là kim loại hoạt động hoá học yếu nhất/.exec(o); assert.ok(y, "ý lạ: " + o); return kl(y[1]) === DAY[DAY.length - 1]; }) },
  { id: "de2", has: "Có ba kim loại X, Y, Z", right: (q) => {
    // thử mọi cách xếp X, Y, Z và H: X trước H; Y, Z sau H; Y trước Z
    const hv = (a) => a.flatMap((x, i) => hv(a.filter((_, j) => j !== i)).map((r) => [x, ...r])).concat(a.length ? [] : [[]]);
    const ok = hv(["X", "Y", "Z", "H"]).filter((d) => d.indexOf("X") < d.indexOf("H") && d.indexOf("Y") > d.indexOf("H") && d.indexOf("Z") > d.indexOf("H") && d.indexOf("Y") < d.indexOf("Z"));
    const thu = [...new Set(ok.map((d) => d.filter((x) => x !== "H").join(", ")))]; assert.equal(thu.length, 1, "thứ tự suy ra được duy nhất"); return thu[0]; } },
  { id: "de2", has: "Cho 10 g hỗn hợp bột đồng và bột sắt", right: (q) => {
    const nt = ntDe(q), [m] = so(q, /Cho ([\d,]+) g hỗn hợp/), [V] = so(q, /được ([\d,]+) L khí hydrogen/), pt = ptCua(q, "Fe", "H₂");
    assert.ok(!phanUng("Cu", "HCl") && phanUng("Fe", "HCl"), "chỉ sắt tác dụng với dung dịch HCl"); return tron(m - molTheoPT(pt, "H₂", V / V0(q), "Fe") * KL("Fe", nt)); } },
  { id: "de2", has: "Từ 97 kg ZnS tinh khiết", right: (q) => {
    const nt = ntDe(q), [m] = so(q, /Từ ([\d,]+) kg ZnS/), p1 = ptTrong(q.q, "ZnS", "ZnO"), p2 = ptTrong(q.q, "ZnO", "Zn");
    assert.ok(q.o.includes(vn((m / KL("ZnS", nt)) * KL("ZnO")) + " kg"), "một lựa chọn sai là khối lượng ZnO");
    return vn(molTheoPT(p2, "ZnO", molTheoPT(p1, "ZnS", m / KL("ZnS", nt), "ZnO"), "Zn") * KL("Zn", nt)) + " kg"; } },
  { id: "own", has: "Sắt tác dụng với lưu huỳnh khi được đun nóng", right: (q) => {
    // kim loại + lưu huỳnh → muối sulfide; sắt có hoá trị II trong sản phẩm này
    const pt = ptCua(q, "Fe", "FeS"); assert.deepEqual(congThuc("FeS"), { Fe: 1, S: 1 }); assert.ok(canBang(pt)); return "Iron(II) sulfide (FeS)"; } },
  { id: "own", has: "Phương trình hoá học nào sau đây viết đúng", right: (q) => {
    // kim loại đứng trước H tác dụng với dung dịch HCl tạo muối chloride (sắt tạo FeCl₂) và khí hydrogen; kim loại mạnh hơn đẩy kim
    // loại yếu hơn ra khỏi dung dịch muối
    const MUOI = { Mg: "MgCl₂", Al: "AlCl₃", Zn: "ZnCl₂", Fe: "FeCl₂" };
    const dung = q.o.filter((o) => { assert.ok(canBang(o), "phương trình cân bằng: " + o); const [tr, sp] = tach(o);
      const M = tr.find((v) => Object.keys(congThuc(v.f)).length === 1 && DAY.includes(v.f)).f, X = tr.find((v) => v.f !== M).f;
      if (X === "HCl") return phanUng(M, X) && sp.some((v) => v.f === MUOI[M]) && sp.some((v) => v.f === "H₂");
      return phanUng(M, X) && sp.some((v) => v.f === klMuoi(X)); });
    assert.equal(dung.length, 1, "đúng một phương trình viết đúng"); return dung[0]; } },
  { id: "own", has: "Đốt cháy hoàn toàn 4,8 g magnesium", right: (q) => {
    const nt = ntDe(q), [m] = so(q, /([\d,]+) g magnesium/), pt = ptCua(q, "Mg", "MgO"); return molTheoPT(pt, "Mg", m / KL("Mg", nt), "MgO") * KL("MgO", nt); } },
  { id: "own", has: "Ngâm một lá kẽm, một lá đồng và một lá bạc", right: (q) => {
    const X = /dung dịch iron\(II\) chloride \((\S+)\)/.exec(q.q)[1], la = ["Zn", "Cu", "Ag"], [a, b, c, d] = q.o;
    assert.ok(/^Chỉ ở ống nghiệm có lá kẽm xảy ra phản ứng/.test(a) && /^Lá đồng đẩy được sắt/.test(b) && /^Lá bạc tan dần/.test(c) && /dung dịch HCl thì cả ba lá kim loại đều tan/.test(d), "thứ tự các ý");
    return [la.filter((M) => phanUng(M, X)).join() === "Zn", phanUng("Cu", X), phanUng("Ag", X), la.every((M) => phanUng(M, "HCl"))]; } },
  { id: "own", has: "Để chứng minh kẽm hoạt động hoá học mạnh hơn sắt và sắt mạnh hơn bạc", right: (q) => {
    // mỗi thí nghiệm “nhúng M vào dung dịch X” cho biết M mạnh hơn hay yếu hơn kim loại của X (hoặc H); hai điều cần chứng minh phải
    // suy ra được (bắc cầu) từ kết quả hai thí nghiệm
    const suyRa = (o) => { const cap = o.split("; ").map((t) => { const m = /^[Nn]húng (\S+) vào dung dịch (\S+)$/.exec(t); assert.ok(m, "thí nghiệm lạ: " + t);
      const M = kl(m[1]), N = m[2] === "HCl" ? "H" : klMuoi(m[2]); return phanUng(M, m[2]) ? [M, N] : [N, M]; });
      const co = (a, b, da = []) => cap.some(([x, y]) => x === a && (y === b || (!da.includes(y) && co(y, b, [...da, y])))); return co("Zn", "Fe") && co("Fe", "Ag"); };
    const dung = q.o.filter(suyRa); assert.equal(dung.length, 1, "đúng một cặp thí nghiệm chứng minh được"); return dung[0]; } },
  { id: "own", has: "Hiệu suất của quá trình", right: (q) => {
    const nt = ntDe(q), [m, mt] = so(q, /hoàn toàn ([\d,]+) tấn iron\(III\) oxide \(Fe₂O₃\) bằng carbon monoxide, thực tế thu được ([\d,]+) tấn sắt/), pt = ptCua(q, "Fe₂O₃", "Fe");
    const lt = molTheoPT(pt, "Fe₂O₃", m / KL("Fe₂O₃", nt), "Fe") * KL("Fe", nt); coX(q, `= ${vn(lt)} (tấn)`); return tron((mt / lt) * 100, 6); } },
  /* ----- Sinh học ----- */
  { id: "de1", has: "Tế bào trứng bình thường của mèo", right: (q) => { const [n2] = so(q, /của mèo có (\d+) NST/); return String(n2 / 2); } },
  { id: "de1", has: "nguyên phân liên tiếp 3 lần; các tế bào con tạo ra đều trở thành tế bào sinh tinh", right: (q) => {
    const [n2] = so(q, /\(2n = (\d+)\)/), [k] = so(q, /nguyên phân liên tiếp (\d+) lần/), con = 2 ** k;
    const [a, b, c, d] = [/có (\d+) tế bào con\.$/, /tất cả (\d+) tinh trùng\.$/, /^Mỗi tinh trùng tạo ra có (\d+) NST\.$/, /^Tổng số NST trong tất cả các tinh trùng tạo ra là ([\d ]+)\.$/].map((re, i) => { const m = re.exec(q.o[i]); assert.ok(m, "thứ tự các ý"); return val(m[1]); });
    return [a === con, b === con * 4, c === n2 / 2, d === con * 4 * (n2 / 2)]; } },
  { id: "de1", has: "Cho cây F₁ lai phân tích", right: (q) => {
    // F₁: A, B trên một NST, a, b trên NST kia, liên kết: giao tử AB, ab; cây lặn: ab
    const [, cao, thap] = /allele A quy định (thân \S+) trội hoàn toàn so với allele a quy định (thân \S+);/.exec(q.q), [, kep, don] = /allele B quy định (hoa \S+) trội hoàn toàn so với allele b quy định (hoa \S+)\./.exec(q.q);
    assert.ok(/allele A và B nằm trên cùng một NST, allele a và b nằm trên NST còn lại/.test(q.q), "vị trí các allele trên NST của F₁");
    const con = ["AB", "ab"].map((g) => (g[0] === "A" ? cao : thap) + ", " + (g[1] === "B" ? kep : don));
    return con.map((k) => "1 " + k).join(" : "); } },
  { id: "de1", has: "mô tả một NST trước và sau khi bị đột biến", right: (q) => {
    const n = docNST(q.svg), d = dangDotBien(n.truoc, n.sau); assert.ok(d && (n.truoc.match(/•/g) || []).length === 1, "đọc được NST");
    const thieu = [...n.truoc].filter((c) => !n.sau.includes(c)); coX(q, "thiếu đoạn " + thieu.join(", ")); return d; } },
  { id: "de2", has: "có các NST đã nhân đôi, ở trạng thái kép", right: (q) => { const [n2] = so(q, /\(2n = (\d+)\)/); return String(2 * n2); } },
  { id: "de2", has: "nguyên phân liên tiếp 4 lần", right: (q) => { const [n2] = so(q, /\(2n = (\d+)\)/), [k] = so(q, /liên tiếp (\d+) lần/); return String(2 ** k * n2); } },
  { id: "de2", has: "Một cây cà rốt có 19 NST", right: (q) => {
    const [n2] = so(q, /có 2n = (\d+)\./), [c] = so(q, /có (\d+) NST trong mỗi tế bào/); assert.ok(/một cặp gồm ba chiếc, các cặp còn lại đều có hai chiếc/.test(q.q));
    return c - n2 === 1 ? "Đột biến lệch bội" : null; } },
  { id: "own", has: "Tinh trùng bình thường của bò có 30 NST", right: (q) => { const [n] = so(q, /có (\d+) NST/); return 2 * n; } },
  { id: "own", has: "tế bào sinh tinh của ngựa", right: (q) => { const [t, n2] = so(q, /Có (\d+) tế bào sinh tinh của ngựa \(2n = (\d+)\)/); coX(q, `${t} · 4 = ${4 * t}`); return t * 4 * (n2 / 2); } },
  { id: "own", has: "Một loài thực vật có bộ NST 2n = 12", right: (q) => {
    const [n2] = so(q, /2n = (\d+)\./), [c, k] = so(q, /có (\d+) NST trong mỗi tế bào sinh dưỡng, mỗi nhóm NST tương đồng đều có (\d+) chiếc/);
    assert.equal(c, (n2 / 2) * k, "số NST khớp với số chiếc mỗi nhóm"); return `thể ${["", "đơn", "", "tam", "tứ"][k]} bội (${k}n)`; } }
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
// bộ đọc hình, bộ giải mạch tự thử: mạch song song hai điện trở bằng nhau, dạng đột biến
assert.equal(dangDotBien("ABC•DE", "ABBC•DE"), "Lặp đoạn"); assert.equal(dangDotBien("ABCD•E", "ADCB•E"), "Đảo đoạn"); assert.equal(dangDotBien("ABC•DE", "ABC•DXY"), "Chuyển đoạn");
{
  const q = kho.find((x) => x.q.includes("R₂ = 8 Ω mắc song song, nối với một ampe kế")), pt = docMach(q.svg), k = giaiMach(pt, { U: 10, "R₁": 20, "R₂": 20 });
  assert.ok(close(k.Rtd, 10, 1e-9) && close(k.so.A, 1, 1e-9), "bộ giải mạch: hai điện trở 20 Ω mắc song song tương đương 10 Ω");
  assert.throws(() => docMach(q.svg.replace(/<circle cx="40" cy="100"[^>]*>/, "")), /chấm tròn/, "thiếu chấm tròn ở chỗ nối thì báo");
  assert.throws(() => docMach(q.svg.replace('x2="138" y2="100"', 'x2="130" y2="100"')), /có dây nối|bỏ lửng/, "dây nối hở thì báo");
}
// bộ NST của các loài trong đề đúng như bảng
kho.forEach((q) => chu(q).forEach((s) => [...s.matchAll(/(người|mèo|cây hành|thỏ|đậu tương|ếch|cà rốt|bò|ngựa)(?: bình thường)? (?:\(2n = (\d+)\)|có 2n = (\d+))/g)].forEach((m) => assert.equal(+(m[2] || m[3]), BO_NST[m[1]], "bộ NST của " + m[1]))));

/* ---------- chữ ---------- */
function chu(q) { return [q.q, q.x].concat(q.o || [], q.unit || []).map(String); }
const PHAN_MON = { "Vật lí": [11, 13], "Hoá học": [18, 21], "Sinh học": [42, 46] };
// 12 chủ đề theo thứ tự bài của sách (tên bài theo mục lục sách in năm 2026)
const CHU_DE = [["Điện trở. Định luật Ohm", 11], ["Đoạn mạch nối tiếp, song song", 12], ["Năng lượng của dòng điện và công suất điện", 13],
  ["Tính chất chung của kim loại", 18], ["Dãy hoạt động hoá học", 19], ["Tách kim loại và việc sử dụng hợp kim", 20], ["Sự khác nhau cơ bản giữa phi kim và kim loại", 21],
  ["Nhiễm sắc thể và bộ nhiễm sắc thể", 42], ["Nguyên phân và giảm phân", 43], ["Nhiễm sắc thể giới tính và cơ chế xác định giới tính", 44], ["Di truyền liên kết", 45], ["Đột biến nhiễm sắc thể", 46]];
const monCua = (t) => { const b = CHU_DE.find((c) => c[0] === t)[1]; return Object.keys(PHAN_MON).find((k) => b >= PHAN_MON[k][0] && b <= PHAN_MON[k][1]); };
kho.forEach((q) => {
  const at = q.src + ": " + q.q.slice(0, 50);
  chu(q).forEach((s) => {
    // công thức hoá học viết bằng chữ số dưới dòng (H₂SO₄, F₁, R₁), không viết H2SO4, F1, R1
    assert.ok(!/(?:^|[^A-Za-z])(?:[A-Z][a-z]?)+\d/.test(s.replace(/\d+(?:,\d+)? (?:mL|mol|g|L|kg|V|A|W|J|Ω|m)\b/g, "")), at + ": công thức cần chữ số dưới dòng: " + s);
    // tên chất như sách (oxygen, chlorine, iron(III) oxide, copper(II) sulfate, hydrochloric acid…), không dùng tên kiểu cũ
    assert.ok(!/(?<![\p{L}])(?:axit|oxi|oxit|hiđro|hidro|cacbon|clo|clorua|brom|nitơ|photpho|silic|sunfat|sunfit|sunfua|nitrat|cacbonat|magie|canxi|bazơ|hiđroxit|hidroxit|sắt từ|đồng sunfat|nhôm oxit|kẽm oxit)(?![\p{L}])/iu.test(s), at + ": tên chất, thuật ngữ khác sách: " + s);
    // dấu thanh kiểu cũ như sách (hoá, thuỷ, toả, huỷ, tuỳ, hoà, khoẻ)
    assert.ok(!/(?<![\p{L}])(?:hóa|hòa|thủy|tỏa|hủy|tùy|khỏe|họa|lũy)(?![\p{L}])/iu.test(s), at + ": dấu thanh kiểu mới: " + s);
    // số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân
    assert.ok(!/\d{4,}/.test(s) && !/\d\.\d/.test(s), at + ": số viết sai cách: " + s);
    // ôm viết bằng kí hiệu Ω (chữ Hy Lạp), điện trở suất đơn vị Ωm
    assert.ok(!/\d (?:Ohm|ohm|O)\b/.test(s), at + ": đơn vị điện trở viết Ω: " + s);
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
assert.ok(canBang("2Al + 3CuSO₄ → Al₂(SO₄)₃ + 3Cu") && canBang("Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag") && !canBang("Al + CuSO₄ → Al₂(SO₄)₃ + Cu") && !canBang("Fe + HCl → FeCl₂ + H₂"));
assert.equal(KL("Al₂(SO₄)₃"), 342); assert.equal(KL("ZnCl₂"), 136);
// câu Vật lí, Sinh học không có phương trình hoá học, mũi tên
kho.filter((q) => monCua(q.topic) !== "Hoá học").forEach((q) => chu(q).forEach((s) => assert.ok(!/→|⇌/.test(s), "mũi tên trong câu " + monCua(q.topic) + ": " + s)));

/* ---------- mức độ, ma trận, phân môn ---------- */
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const M = pool.pool.matrix, cells = Object.values(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), pool.n, "tổng ma trận bằng n");
assert.ok(cells.every((v) => v.every((k) => k <= 1)), "ô nào cũng rút nhiều nhất 1 câu");
assert.deepEqual(Object.keys(M), CHU_DE.map((c) => c[0]), "chủ đề theo thứ tự bài của sách");
[S.de1, S.de2, S.own].forEach((id) => assert.deepEqual([...new Set(kho.filter((q) => q.src === id).map((q) => q.topic))], Object.keys(M), id + ": đủ chủ đề, đúng thứ tự"));
// hai đề cố định và câu riêng đều chia đúng ma trận, nên ô nào cũng có gấp ba số câu ô đó rút
[S.de1, S.de2, S.own].forEach((id) => Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => kho.filter((q) => q.src === id && q.topic === t && q.lv === l).length), v, id + " đúng ma trận ở chủ đề " + t)));
// số câu mỗi phân môn đúng như lời dặn của đề
const theoMon = Object.keys(PHAN_MON).map((m) => [m, sum(Object.entries(M).filter(([t]) => monCua(t) === m).map(([, v]) => sum(v)))]);
[S.de1, S.de2].forEach((id) => theoMon.forEach(([m, k]) => assert.ok(new RegExp(`${m} Bài ${PHAN_MON[m][0]}–${PHAN_MON[m][1]} \\([^)]*\\) ${k} câu`).test(bank(id).note), id + ": lời dặn ghi " + m + " " + k + " câu")));
assert.ok(bank(S.own).note.includes("mỗi lần rút " + theoMon.map(([m, k]) => k + " câu " + m).join(", ")), "lời dặn của đề ngẫu nhiên ghi số câu mỗi phân môn");
theoMon.forEach(([m]) => assert.ok(bank(S.own).note.includes(`${m} Bài ${PHAN_MON[m][0]}–${PHAN_MON[m][1]}`), "lời dặn của đề ngẫu nhiên ghi phạm vi " + m));
// đề giữa kì không có câu về đề chung của Sở (Rút ra N9-gk2-ta); phạm vi KHTN của kì thi khớp lời dặn
[S.de1, S.de2, S.own].forEach((id) => assert.ok(!/đề chung/.test(bank(id).note), id + ": đề giữa kì không nhắc đề chung của Sở"));
{
  const ctxL = vm.createContext({ window: {} }); vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ctxL);
  const e = ctxL.window.ONTAP_SEED_EVENTS.find((x) => x.id === "gk2-l9");
  assert.ok(Object.values(S).every((id) => e.banks.includes(id)), "ba đề gắn vào gk2-l9");
  assert.ok(e.scope.includes("KHTN: " + Object.keys(PHAN_MON).map((m) => `${m} Bài ${PHAN_MON[m][0]}–${PHAN_MON[m][1]}`).join(", ")), "phạm vi KHTN của gk2-l9 khớp lời dặn");
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
kho.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của phương án: " + q.q.slice(0, 50)));
// câu số không nguyên dặn làm tròn đến chữ số thập phân thứ hai (phần Đáp án của app ghi hai chữ số)
kho.filter((q) => q.type === "num" && !Number.isInteger(q.ans * 10)).forEach((q) => assert.ok(/làm tròn kết quả đến chữ số thập phân thứ hai/i.test(q.q), "dặn làm tròn: " + q.q.slice(0, 50)));
kho.filter((q) => q.type === "num").forEach((q) => assert.ok(q.unit && q.unit.length <= 4, "câu số có đơn vị ngắn: " + q.q.slice(0, 50)));
const chuThuong = (s) => String(s).normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean);
kho.filter((q) => q.type === "mc").forEach((q) => {
  // đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2); các lựa chọn không trùng nhau
  const m = Math.max(...q.o.slice(1).map((o) => o.length));
  assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + q.q.slice(0, 50));
  assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + q.q.slice(0, 50));
  // đáp án đúng không phải lựa chọn duy nhất có chữ của nhãn chủ đề (Rút ra N6)
  const c = chuThuong(q.topic), tu = c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số)( |$)/u.test(w));
  tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); assert.ok(!(co[0] && !co.slice(1).some(Boolean)), `chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề: ${q.q.slice(0, 60)}`); });
  // ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có (Rút ra N22)
  const dau = q.o.map((o) => o.split(" ")[0]);
  assert.ok(!(q.o.length === 4 && dau.slice(1).every((d) => d === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1), "ba lựa chọn sai cùng mở đầu bằng “" + dau[1] + "”: " + q.q.slice(0, 50));
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

/* ---------- dò lộ đáp án giữa hai câu rút được cùng lúc (khác ô (chủ đề, mức); ô nào cũng chỉ rút 1 câu) ----------
   Đáp án là số (từ hai chữ số, hoặc số thập phân) tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”, “bằng”, “được”): không được có.
   Đáp án bằng chữ (lựa chọn đúng) tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy cả đáp án, Rút ra N19); chuỗi
   có trong đề bài, lựa chọn, lời giải của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM. */
const ten = new Map();
[S.de1, S.de2, S.own].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, (id === S.own ? "own" : id.slice(-3)) + "#" + (i + 1))));
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
const cungLuc = (p, q) => p !== q && (p.topic !== q.topic || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2);
const tu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
// cụm chung của môn, có ở nhiều câu (tên đại lượng, “ra khỏi dung dịch”, “tế bào sinh dưỡng”…): không tính là lộ đáp án
const CUM_CHUNG = ["hiệu điện thế", "dung dịch hcl", "ra khỏi dung", "khỏi dung dịch", "tế bào sinh", "mỗi tế bào", "tế bào con", "là kim loại", "nst tương đồng", "một cặp nst", "vào dung dịch", "và dung dịch", "điện thế của"];
const cum = (s) => { const w = tu(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r.filter((c) => !CUM_CHUNG.includes(c)); };
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
// đã xem (Phiên N9-gk2-khtn): chữ chung hoặc chữ của lựa chọn sai, câu kia không nói tới điều câu này hỏi. “hiệu điện thế của mạng
// điện”: lựa chọn sai của câu công tơ điện (câu này hỏi vì sao đồ dùng trong nhà mắc song song); “+ 2HCl →”: phương trình kẽm, sắt tác
// dụng với HCl ở lời giải câu tính khối lượng (câu này hỏi phương trình của magnesium; hai câu kia chỉ giúp loại một lựa chọn sai, đồng
// không tác dụng với HCl); “dung dịch FeSO₄”: câu đồng không đẩy được sắt (câu này hỏi cặp thí nghiệm chứng minh kẽm mạnh hơn sắt, sắt
// mạnh hơn bạc); “nguyên phân”: câu đếm tế bào sau nhiều lần nguyên phân (câu này hỏi nuôi cấy mô dựa vào quá trình nào); “iron(II)
// sulfate (FeSO₄)”: lựa chọn sai của câu sắt tác dụng với lưu huỳnh; “19”, “80”: số NST của cà rốt lệch bội, 80% Fe₂O₃ của quặng
// (câu này hỏi số NST của trứng mèo, số chromatid); “thụ tinh”: câu tinh trùng mang X hay Y, lựa chọn sai của câu lai phân tích (câu
// này hỏi quá trình khôi phục bộ NST lưỡng bội); “lưu huỳnh”: câu sắt tác dụng với lưu huỳnh (câu này hỏi phi kim có trong que diêm).
const DA_XEM = [
  "de2#6 → own#4: thế của mạng", "de2#6 → own#4: của mạng điện", "de2#10 → own#9: + 2hcl →", "de2#13 → own#9: + 2hcl →",
  "own#9 → own#13: dung dịch feso₄", "de1#22 → own#21: nguyên phân", "de2#22 → own#21: nguyên phân", "own#8 → de1#12: iron ii sulfate", "own#8 → de1#12: ii sulfate feso₄",
  "de2#25 → de1#20: 19", "own#23 → de1#21: thụ tinh", "own#24 → de1#21: thụ tinh", "own#8 → de2#17: lưu huỳnh", "de1#16 → de2#20: 80"
];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 15”, “là 7,44”, cụm của đáp án bằng chữ
{
  const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x }), khac = tim("cặp NST giới tính trong tế bào sinh dưỡng của nam");
  const thuLo = (qs) => { const r = doLo(qs, (q) => q.q.slice(0, 12)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  assert.deepEqual(thuLo([tim("Điện trở của vật dẫn này là bao nhiêu ôm"), gia(khac, "Ví dụ R = 15 Ω.")]), ["15"]);
  assert.deepEqual(thuLo([tim("Cho 5,4 g nhôm (Al)"), gia(khac, "Thể tích khí là 7,44 L.")]), ["7.44"]);
  assert.deepEqual(thuLo([tim("Than hoạt tính làm được việc này"), gia(khac, "Than có tính hấp phụ.")]), ["tính hấp phụ"]);
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
// cụm từ chung của môn (lời dặn làm tròn, cách nói chuẩn của đề bài tập) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ
// có chữ (bỏ qua chuỗi toàn kí hiệu, số)
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
  const khac = BANKS.filter((b) => !b.pool && !/^khtn9-gk2-/.test(b.id)).flatMap((b) => b.questions.map((q) => ({ id: b.id, s: " " + chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại hoặc đọc lại hình (" + soPT + " phương trình hoá học cân bằng); kho " + kho.length + " câu (" + mine.length + " câu riêng), ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề: " + theoMon.map(([m, k]) => m + " " + k).join(", ") + ".");
console.log("MATH OK");
