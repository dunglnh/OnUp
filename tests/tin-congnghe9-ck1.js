// Kiểm tra hai ngân hàng lớp 9 cuối kì I của Phiên N9-ck1-tin-congnghe: Tin học (data/banks/9-tin.js) và Công nghệ
// (data/banks/9-congnghe.js), theo mẫu tests/tin-congnghe6-gk2.js. Mỗi ngân hàng = Đề 1 + Đề 2 (cùng chia đúng ma trận) + đề ngẫu
// nhiên không có câu riêng; mã đề, số câu lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7 như mọi kho lớp 9.
// Câu có phép tính hoặc có hình được nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong hai kho, đúng đề ghi ở id); đáp án
// tính bằng code (so với ans, o[0], cặp nối hoặc thứ tự sắp xếp). Tin học: tiền thừa của máy bán nước (lời giải), tỉ lệ vàng của
// ngôi sao năm cánh (tỉ số tính từ một lần đo, đề không ghi sẵn), bảng các bài viết tìm được (chỉ một bài vừa của nguồn chính thức
// vừa đăng trong năm hỏi; lựa chọn chỉ ghi số bài). Công nghệ: tuổi học xong cao đẳng (số lớp của ba cấp phổ thông, thời gian học
// cao đẳng ngắn nhất như sách), biểu đồ cột số chỗ làm (số ở đỉnh cột khớp chiều cao theo trục), mức độ phù hợp theo thang điểm của
// Bài 5 và bảng đánh giá (đếm dấu × ở cột Khớp; đề không ghi sẵn cách tính điểm, thang xếp loại), hai sơ đồ khung
// cơ cấu hệ thống giáo dục quốc dân: ô có tên, số hoặc “?” (ô bị che), màu ô theo chú thích (phần của hệ thống), mũi tên chỉ hướng
// học tiếp (đoạn thẳng đi từ cạnh ô nguồn, đỉnh mũi tên chạm cạnh ô đích, không cắt ô khác); thử mọi cách điền tên vào các ô có số
// hoặc bị che: chỉ một cách khớp màu và mọi mũi tên khớp hướng học tiếp theo khung (GD, như Bài 2 của sách), và cách đó đúng bằng
// cặp nối, thứ tự của câu. Bảng: đường kẻ ngang cách đều, chữ nằm trong một ô (giữa ô hoặc sát lề trái) và không tràn khỏi ô (ước
// bề rộng chữ). Câu trả lời bằng số và câu có hình nào cũng phải có kiểm tra ở đây.
// Rồi: chữ (dấu thanh kiểu cũ như hai cuốn sách “hoá”, “khoẻ”, “tuỳ”; “kĩ”, “lí”; số ngăn hàng nghìn bằng khoảng trắng; Tin học
// không ghi số hiệu, năm ban hành của luật, nghị định; Công nghệ không có tên cơ quan mà sách in năm 2026 đã bỏ), lời dặn của đề
// (các bài theo mục lục, câu về đề chung của Sở, Công nghệ nhắc mô đun tự chọn), dạng câu (khung Công văn 7991: mỗi kho ít nhất 4
// câu đúng/sai 4 ý, không lặp kiểu Đ/S; mỗi đề cố định có câu đúng/sai 4 ý và câu trả lời ngắn; câu nối có ô thừa), mức độ và ma
// trận (chủ đề theo thứ tự bài), đáp án đúng không dài hơn hẳn lựa chọn sai, không là lựa chọn duy nhất có chữ của nhãn chủ đề, ba
// lựa chọn sai không cùng mở đầu một chữ; rút thử nhiều lần (đúng ma trận, gặp đủ câu của kho; đã làm hết một đề cố định thì rút
// toàn câu của đề kia); đề bài không trùng câu nào trong file, không gần trùng câu của các kho cũ cùng môn; dò lộ đáp án giữa các câu
// rút được cùng lúc (số ở vị trí kết quả, cả hai vế một cặp nối, hai ô sắp xếp liền nhau: không được có; chuỗi 3 từ của đáp án bằng
// chữ in ra với DO_LO=1 để xem tay, đã xem ghi ở DA_XEM). Có sách ở ../OnUp-Book (repo riêng tư) thì so mọi trường chữ với chữ OCR
// của mọi cuốn sau khi bỏ dấu, gộp nguyên âm (không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và với câu của mọi kho khác
// (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 5 từ). DO_DE=1 in câu trắc nghiệm mà chỉ đáp án đúng có cặp từ của đề bài (Rút
// ra N9-ck1-khtn) để xem tay.
// Chạy: node tests/tin-congnghe9-ck1.js → in MATH OK.
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

/* ---------- hai kho: mã đề, số câu lấy từ danh mục ----------
   CHU_DE: chủ đề theo thứ tự bài của sách (nhãn chủ đề, số bài, tên bài theo mục lục sách in năm 2026). */
const MON = [
  ["tin", "Tin học", "9-tin.js", [["Thế giới kĩ thuật số", 1, "Thế giới kĩ thuật số"], ["Thông tin trong giải quyết vấn đề", 2, "Thông tin trong giải quyết vấn đề"],
    ["Một số vấn đề pháp lí về sử dụng dịch vụ Internet", 4, "Một số vấn đề pháp lí về sử dụng dịch vụ Internet"], ["Phần mềm mô phỏng", 5, "Tìm hiểu phần mềm mô phỏng"],
    ["Trình bày thông tin trong trao đổi và hợp tác", 7, "Trình bày thông tin trong trao đổi và hợp tác"]]],
  ["congnghe", "Công nghệ", "9-congnghe.js", [["Nghề nghiệp trong lĩnh vực kĩ thuật và công nghệ", 1, "Nghề nghiệp trong lĩnh vực kĩ thuật và công nghệ"],
    ["Cơ cấu hệ thống giáo dục quốc dân", 2, "Cơ cấu hệ thống giáo dục quốc dân"], ["Thị trường lao động kĩ thuật, công nghệ", 3, "Thị trường lao động kĩ thuật, công nghệ tại Việt Nam"],
    ["Quy trình lựa chọn nghề nghiệp", 4, "Quy trình lựa chọn nghề nghiệp"],
    ["Tự đánh giá mức độ phù hợp với nghề", 5, "Dự án: Tự đánh giá mức độ phù hợp của bản thân với một số ngành nghề thuộc lĩnh vực kĩ thuật, công nghệ"]]]
].map(([m, ten, file, chuDe]) => {
  const re = new RegExp(`^${m}9-ck1-`), p = BANKS.find((b) => b.pool && re.test(b.id));
  assert.ok(p, `thiếu đề ngẫu nhiên ${m}9-ck1`);
  assert.equal(p.pool.from.length, 2, p.id + ": đề ngẫu nhiên lấy câu của hai đề cố định");
  const S = { m, ten, file, chuDe, pool: p.id, de1: p.pool.from[0], de2: p.pool.from[1], kho: p.questions };
  assert.deepEqual(BANKS.filter((b) => re.test(b.id)).map((b) => b.id).sort(), [S.de1, S.de2, S.pool].sort(), m + ": kho gồm hai đề cố định và đề ngẫu nhiên");
  [S.de1, S.de2, S.pool].forEach((id) => {
    const b = bank(id);
    assert.ok(b.grade === 9 && b.subject === ten && b.file === file, id + ": khối 9, môn " + ten + ", file " + file);
    assert.equal(b.minutes, 35, id + ": Tin học, Công nghệ lớp 9 làm 35 phút");
  });
  [S.de1, S.de2].forEach((id) => assert.equal(bank(id).questions.length, bank(id).n, id + ": số câu bằng n của danh mục"));
  assert.ok(S.kho.every((q) => q.src !== p.id), p.id + ": đề ngẫu nhiên không có câu riêng");
  assert.equal(S.kho.length, bank(S.de1).n + bank(S.de2).n, p.id + ": kho = câu của hai đề cố định");
  assert.ok(p.n === bank(S.de1).n && p.n === bank(S.de2).n, p.id + ": mỗi lần rút bằng số câu một đề cố định");
  return S;
});
const [T, C] = MON;
const kho = MON.flatMap((S) => S.kho);
const deCua = (q) => MON.find((S) => S.kho.includes(q));

/* ---------- số ---------- */
const close = (x, y, e = 1e-9) => Math.abs(x - y) < e;
const sum = (a) => a.reduce((s, v) => s + v, 0);
const val = (s) => +String(s).replace(/\s/g, "").replace(/−/g, "-").replace(",", "."); // "35 000" → 35000, "1,62" → 1.62
const tron = (x, k) => Math.round(x * 10 ** k) / 10 ** k;
const vn = (x) => { const [a, b] = String(tron(x, 6)).split("."); return a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); }; // 136000 → "136 000", 14.58 → "14,58"
const hoan = (a) => (a.length <= 1 ? [a] : a.flatMap((x, i) => hoan(a.slice(0, i).concat(a.slice(i + 1))).map((r) => [x].concat(r)))); // mọi hoán vị

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const daDoc = new Set(); // hình đã đọc lại bằng code
const coChu = (t) => assert.ok(+t["font-size"] >= 13, "chữ trong hình từ 13 trở lên: " + t.t);
const rong = (t) => (t["font-weight"] === "700" ? 0.62 : 0.55) * +t["font-size"] * [...t.t].length; // ước bề rộng dòng chữ (Noto Sans: trung bình 0,5–0,57 cỡ chữ mỗi kí tự, chữ đậm hơn)

/* Bảng: đường kẻ ngang (các hàng cao bằng nhau), đường kẻ dọc (cột rộng tuỳ chữ); chữ đặt giữa ô (text-anchor middle) hoặc sát lề
   trái ô, mỗi ô nhiều nhất một chữ, không tràn khỏi ô. Trả về { o: [[chữ từng ô theo hàng, "" là ô trống]] }. */
const docBang = (svg) => {
  daDoc.add(svg);
  const lines = tags(svg, "line"), ngang = lines.filter((l) => num(l, "y1") === num(l, "y2")), doc = lines.filter((l) => num(l, "x1") === num(l, "x2"));
  assert.equal(ngang.length + doc.length, lines.length, "bảng: mọi đường kẻ nằm ngang hoặc thẳng đứng");
  const ys = [...new Set(ngang.map((l) => num(l, "y1")))].sort((a, b) => a - b), xs = [...new Set(doc.map((l) => num(l, "x1")))].sort((a, b) => a - b);
  assert.ok(ys.length === ngang.length && xs.length === doc.length, "bảng: không kẻ trùng đường");
  ngang.forEach((l) => assert.ok(num(l, "x1") === xs[0] && num(l, "x2") === xs[xs.length - 1], "đường ngang kẻ hết bề rộng bảng"));
  doc.forEach((l) => assert.ok(num(l, "y1") === ys[0] && num(l, "y2") === ys[ys.length - 1], "đường dọc kẻ hết chiều cao bảng"));
  ys.forEach((y, i) => i && assert.equal(y - ys[i - 1], ys[1] - ys[0], "các hàng cao bằng nhau"));
  const o = Array.from({ length: ys.length - 1 }, () => Array(xs.length - 1).fill(""));
  texts(svg).forEach((t) => {
    coChu(t);
    const x = +t.x, y = +t.y, giua = t["text-anchor"] === "middle";
    const c = xs.findIndex((v, i) => i && (giua ? close(x, (v + xs[i - 1]) / 2) : x > xs[i - 1] && x - xs[i - 1] <= 10)) - 1;
    const r = ys.findIndex((v, i) => i && y > ys[i - 1] + +t["font-size"] * 0.7 && y < v) - 1;
    assert.ok(c >= 0 && r >= 0 && o[r][c] === "", "chữ nằm trong một ô (giữa ô hoặc sát lề trái), mỗi ô một chữ: " + t.t);
    const w = rong(t), trai = giua ? x - w / 2 : x, phai = giua ? x + w / 2 : x + w;
    assert.ok(trai >= xs[c] && phai <= xs[c + 1], "chữ vừa ô: " + t.t);
    o[r][c] = t.t;
  });
  return { o };
};

/* Khung cơ cấu hệ thống giáo dục quốc dân như Bài 2 của Công nghệ 9: phần của hệ thống và các cấp học, trình độ học tiếp được
   (trung cấp dành cho người tốt nghiệp trung học cơ sở; cao đẳng cho người tốt nghiệp trung học phổ thông, hoặc trung cấp và có bằng
   tốt nghiệp trung học phổ thông; đại học cho người tốt nghiệp trung học phổ thông, trung cấp (đủ văn hoá trung học phổ thông), cao
   đẳng; thạc sĩ sau đại học; tiến sĩ sau thạc sĩ hoặc đại học). Tiểu học 5 lớp, trung học cơ sở 4 lớp, trung học phổ thông 3 lớp;
   cao đẳng cho người tốt nghiệp trung học phổ thông học từ 2 đến 3 năm. Màu của ô theo chú thích. Thang xếp loại của bảng đánh giá
   Bài 5: mỗi dấu “x” ở cột trùng khớp được 1 điểm, cột không trùng khớp hoặc để trống 0 điểm; tổng 1–3, 4–6, 7–10 điểm. */
const GD = {
  "Tiểu học": ["Giáo dục phổ thông", ["Trung học cơ sở"]],
  "Trung học cơ sở": ["Giáo dục phổ thông", ["Trung học phổ thông", "Trung cấp"]],
  "Trung học phổ thông": ["Giáo dục phổ thông", ["Cao đẳng", "Đại học"]],
  "Trung cấp": ["Giáo dục nghề nghiệp", ["Cao đẳng", "Đại học"]],
  "Cao đẳng": ["Giáo dục nghề nghiệp", ["Đại học"]],
  "Đại học": ["Giáo dục đại học", ["Thạc sĩ", "Tiến sĩ"]],
  "Thạc sĩ": ["Giáo dục đại học", ["Tiến sĩ"]],
  "Tiến sĩ": ["Giáo dục đại học", []]
};
const SO_LOP = { "tiểu học": 5, "trung học cơ sở": 4, "trung học phổ thông": 3 };
const CAO_DANG = [2, 3]; // số năm học cao đẳng của người tốt nghiệp trung học phổ thông (ít nhất, nhiều nhất)
const THANG_BAI5 = [[1, 3, "không phù hợp"], [4, 6, "phù hợp một phần"], [7, 10, "phù hợp hoàn toàn"]];
const MAU = { "sun-soft": "Giáo dục phổ thông", "ok-soft": "Giáo dục nghề nghiệp", "acc-soft": "Giáo dục đại học" };
const hoc = (a, b) => GD[a][1].includes(b);

/* Sơ đồ khung: ô là rect có rx, một dòng chữ ở giữa (tên, số của ô, hoặc “?” khi bị che); mũi tên là đoạn thẳng đi từ cạnh ô nguồn
   và đầu mũi tên (polygon tô ink: đỉnh trước, hai góc đáy sau, trung điểm đáy là đầu đoạn thẳng) có đỉnh chạm cạnh ô đích, không cắt
   ô nào khác; chú thích (nếu có) là ô vuông nhỏ không rx với dòng chữ ngay bên phải. Trả về { o: [{ t, fill, h }], canh: [[nguồn,
   đích]] (chỉ số trong o), chuThich: { màu: tên phần } }. */
const docKhung = (svg) => {
  daDoc.add(svg);
  const R = tags(svg, "rect"), TX = texts(svg), L = tags(svg, "line"), P = tags(svg, "polygon");
  TX.forEach(coChu);
  const hop = (r) => [num(r, "x"), num(r, "y"), num(r, "x") + num(r, "width"), num(r, "y") + num(r, "height")];
  const chuThich = {};
  R.filter((r) => !r.rx).forEach((r) => {
    const [, y0, x1, y1] = hop(r), t = TX.filter((t) => !t["text-anchor"] && +t.x > x1 && +t.x <= x1 + 10 && +t.y > y0 && +t.y <= y1);
    assert.equal(t.length, 1, "mỗi ô chú thích một dòng chữ ngay bên phải");
    assert.ok(!(r.fill in chuThich), "mỗi màu một chú thích"); chuThich[r.fill] = t[0].t;
  });
  const o = R.filter((r) => r.rx).map((r) => {
    const h = hop(r), t = TX.filter((t) => t["text-anchor"] === "middle" && close(+t.x, (h[0] + h[2]) / 2) && +t.y > h[1] && +t.y < h[3]);
    assert.equal(t.length, 1, "mỗi ô một dòng chữ ở giữa");
    assert.ok(rong(t[0]) <= h[2] - h[0] - 8, "chữ vừa ô: " + t[0].t);
    return { t: t[0].t, fill: r.fill, h };
  });
  assert.equal(TX.length, o.length + Object.keys(chuThich).length, "mọi chữ là chữ trong ô hoặc chú thích");
  const cat = (a, b) => a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];
  o.forEach((x, i) => o.forEach((y, j) => assert.ok(i >= j || !cat(x.h, y.h), "hai ô không đè lên nhau")));
  const tren = (p, h) => p[0] >= h[0] - 0.5 && p[0] <= h[2] + 0.5 && p[1] >= h[1] - 0.5 && p[1] <= h[3] + 0.5 && [p[0] - h[0], p[0] - h[2], p[1] - h[1], p[1] - h[3]].some((d) => Math.abs(d) < 0.5);
  const trong = (p, h) => p[0] > h[0] + 0.5 && p[0] < h[2] - 0.5 && p[1] > h[1] + 0.5 && p[1] < h[3] - 0.5;
  assert.equal(L.length, P.length, "mỗi đoạn thẳng một đầu mũi tên");
  const canh = L.map((l) => {
    const a = [num(l, "x1"), num(l, "y1")], b = [num(l, "x2"), num(l, "y2")];
    const dau = P.filter((p) => { const q = pts(p.points); return q.length === 3 && dist([(q[1][0] + q[2][0]) / 2, (q[1][1] + q[2][1]) / 2], b) < 0.2; });
    assert.ok(dau.length === 1 && dau[0].fill === "ink", "đoạn thẳng có đúng một đầu mũi tên tô ink");
    const d = pts(dau[0].points)[0], u = [b[0] - a[0], b[1] - a[1]], v = [d[0] - b[0], d[1] - b[1]];
    assert.ok(Math.abs(u[0] * v[1] - u[1] * v[0]) / Math.hypot(...u) < 0.3 && u[0] * v[0] + u[1] * v[1] > 0, "đỉnh mũi tên thẳng hàng với đoạn thẳng, ở phía đầu");
    const nguon = o.map((x, i) => i).filter((i) => tren(a, o[i].h)), dich = o.map((x, i) => i).filter((i) => tren(d, o[i].h));
    assert.ok(nguon.length === 1 && dich.length === 1 && nguon[0] !== dich[0], "mũi tên đi từ cạnh một ô đến cạnh ô khác");
    for (let k = 1; k < 60; k++) { const s = [a[0] + ((d[0] - a[0]) * k) / 60, a[1] + ((d[1] - a[1]) * k) / 60]; assert.ok(!o.some((x) => trong(s, x.h)), "mũi tên không cắt ô nào"); }
    return [nguon[0], dich[0]];
  });
  return { o, canh, chuThich };
};

/* Biểu đồ cột: đường lưới ngang tô line, nhãn trục bên trái mỗi đường (text-anchor end); cột tô acc đứng trên đường 0, số ở đỉnh cột
   khớp chiều cao theo trục, tên cột ngay dưới đường 0. Trả về [{ ten, gt }]. */
const docCot = (svg) => {
  daDoc.add(svg);
  const TX = texts(svg), luoi = tags(svg, "line").filter((l) => l.stroke === "line");
  TX.forEach(coChu);
  luoi.forEach((l) => assert.equal(num(l, "y1"), num(l, "y2"), "đường lưới nằm ngang"));
  const truc = luoi.map((l) => { const t = TX.filter((t) => t["text-anchor"] === "end" && +t.x < num(l, "x1") && close(+t.y, num(l, "y1") + 5)); assert.equal(t.length, 1, "mỗi đường lưới một nhãn"); return [num(l, "y1"), val(t[0].t)]; }).sort((a, b) => b[0] - a[0]);
  assert.equal(truc[0][1], 0, "đường dưới cùng là 0");
  const k = (truc[1][1] - truc[0][1]) / (truc[0][0] - truc[1][0]); // giá trị trên mỗi đơn vị chiều cao
  truc.forEach(([y, v]) => assert.ok(close(v, (truc[0][0] - y) * k), "nhãn trục cách đều"));
  const y0 = truc[0][0];
  const cot = tags(svg, "rect").filter((r) => r.fill === "acc").map((r) => {
    const cx = num(r, "x") + num(r, "width") / 2, gt = num(r, "height") * k;
    assert.ok(close(num(r, "y") + num(r, "height"), y0), "cột đứng trên đường 0");
    const so = TX.filter((t) => t["text-anchor"] === "middle" && close(+t.x, cx) && +t.y < num(r, "y") && +t.y > num(r, "y") - 12);
    assert.ok(so.length === 1 && close(val(so[0].t), gt), "số ở đỉnh cột khớp chiều cao theo trục");
    const ten = TX.filter((t) => t["text-anchor"] === "middle" && close(+t.x, cx) && +t.y > y0);
    assert.equal(ten.length, 1, "mỗi cột một tên ngay dưới đường 0");
    return { ten: ten[0].t, gt };
  });
  assert.equal(TX.length, truc.length + 2 * cot.length + 1, "mọi chữ là nhãn trục, số, tên cột hoặc tên trục");
  return cot;
};

/* ---------- các câu cần tính ----------
   id: đề chứa câu; has: đoạn chữ của đề; right(q): đáp án tính bằng code (so với ans, o[0], cặp nối l[i] → r[i] hoặc thứ tự o). */
const CHECKS = [
  { id: T.de1, has: "cho tờ 20 000 đồng vào máy bán nước", right: (q) => {
    const [, a, b] = q.q.match(/tờ (\d{1,3}(?: \d{3})*) đồng .* giá (\d{1,3}(?: \d{3})*) đồng/);
    assert.ok(q.x.includes(`${a} − ${b} = ${vn(val(a) - val(b))} đồng`), "lời giải tính đúng tiền thừa");
    const tinh = q.o.filter((o) => /trừ/.test(o));
    assert.equal(tinh.length, 1, "chỉ một lựa chọn là việc tính toán"); return tinh[0]; } },
  { id: T.de1, has: "ngôi sao năm cánh đều", right: (q) => {
    // đề cho một lần đo (AB, AC) rồi độ dài AB mới, không ghi sẵn tỉ số: học sinh dùng điều Bài 6 cho thấy (tỉ số không đổi khi phóng to, thu nhỏ)
    const [, ab, ac] = q.q.match(/AB = (\d+(?:,\d+)?) cm, AC = (\d+(?:,\d+)?) cm/).map(val), ab2 = val(q.q.match(/AB dài (\d+(?:,\d+)?) cm/)[1]), r = ac / ab, phi = (1 + Math.sqrt(5)) / 2;
    assert.ok(!/tỉ số|tỉ lệ|xấp xỉ/.test(q.q), "đề không ghi sẵn tỉ số");
    assert.ok(close(r, tron(phi, 2)) && /Làm tròn kết quả đến hàng phần mười/.test(q.q) && q.unit === "cm" && q.tol === 0.1, "lần đo cho tỉ lệ vàng 1,62; dặn làm tròn đến hàng phần mười");
    assert.equal(tron(phi * ab2, 1), tron(r * ab2, 1), "tính bằng tỉ lệ vàng chính xác cũng ra cùng kết quả");
    assert.ok(q.x.includes(`${vn(ac)} : ${vn(ab)} = ${vn(r)}`) && q.x.includes(`${vn(r)} × ${vn(ab2)} = ${vn(r * ab2)} ≈ ${vn(tron(r * ab2, 1))}`), "lời giải ghi tỉ số và phép tính");
    return tron(r * ab2, 1); } },
  { id: T.de2, has: "lịch học và học phí lớp bơi", right: (q) => {
    const b = docBang(q.svg);
    assert.deepEqual(b.o[0], ["Bài", "Nguồn", "Ngày đăng"], "hàng đầu là tiêu đề");
    const [, thang, nam] = q.q.match(/tháng (\d+)\/(\d{4})/), noi = q.q.match(/của (Nhà văn hoá phường)/)[1];
    const hang = b.o.slice(1).map(([bai, nguon, ngay]) => { const [d, m, y] = ngay.split("/").map(Number); return { bai, nguon, t: y * 400 + m * 31 + d, y, m }; });
    const chinhThuc = (h) => h.nguon === "Trang " + noi, dung = hang.filter((h) => chinhThuc(h) && h.y === +nam && h.m <= +thang);
    assert.equal(dung.length, 1, "chỉ một bài vừa của nguồn chính thức vừa đăng trong năm hỏi, trước tháng hỏi");
    // lựa chọn chỉ ghi số bài: phải đọc bảng mới chọn được
    assert.deepEqual(q.o.slice().sort(), hang.map((h) => "Bài viết " + h.bai).sort(), "bốn lựa chọn là “Bài viết N” của bốn dòng trong bảng");
    const muon = hang.reduce((a, h) => (h.t > a.t ? h : a));
    assert.ok(muon !== dung[0] && !chinhThuc(muon), "bài đăng muộn nhất không phải của nguồn chính thức");
    assert.ok(hang.some((h) => chinhThuc(h) && h.y < +nam) && hang.some((h) => /quảng cáo/.test(h.nguon)), "có bài cũ của nguồn chính thức và bài của trang quảng cáo");
    return "Bài viết " + dung[0].bai; } },
  { id: T.de2, has: "theo ba tiêu chí, xếp theo thứ tự ưu tiên", right: (q) => {
    // các tiêu chí theo thứ tự ưu tiên; mỗi trường đạt hoặc không đạt từng tiêu chí (viết đúng chữ của tiêu chí là đạt)
    const tc = [...q.q.matchAll(/\((\d)\) ([^;.]+)[;.]/g)].map((m, k) => (assert.equal(+m[1], k + 1), m[2]));
    const truong = [...q.q.matchAll(/Trường ([A-Z]) ([^.]+)\./g)].map((m) => {
      const y = m[2].split(", ");
      assert.equal(y.length, tc.length, "mỗi trường nói đủ các tiêu chí theo thứ tự");
      return { ten: "Trường " + m[1], dat: y.map((v, k) => (v === tc[k] ? 1 : (assert.ok(v.startsWith("không ") || /^học hai buổi/.test(v), "ý không đạt: " + v), 0))) };
    });
    assert.ok(truong.length === q.o.length && new Set(truong.map((t) => sum(t.dat))).size === 1, "các trường đạt cùng số tiêu chí: phải xét theo thứ tự ưu tiên");
    const thu = truong.slice().sort((a, b) => { const k = a.dat.findIndex((v, i) => v !== b.dat[i]); return k < 0 ? 0 : b.dat[k] - a.dat[k]; });
    thu.forEach((t, k) => k && assert.notDeepEqual(t.dat, thu[k - 1].dat, "không có hai trường ngang nhau"));
    return thu.map((t) => t.ten); } },
  { id: C.de1, has: "Nối mỗi ô được đánh số", right: (q) => {
    const s = docKhung(q.svg);
    assert.deepEqual(s.chuThich, MAU, "chú thích màu: phổ thông, nghề nghiệp, đại học");
    s.o.filter((x) => !/^\d+$/.test(x.t)).forEach((x) => assert.equal(MAU[x.fill], GD[x.t][0], "ô có tên đúng màu của phần: " + x.t));
    const so = q.l.map((l) => { const i = s.o.findIndex((x) => "Ô số " + x.t === l); assert.ok(i >= 0, "cột trái là các ô có số của hình: " + l); return i; });
    assert.equal(so.length, s.o.filter((x) => /^\d+$/.test(x.t)).length, "cột trái có mọi ô có số");
    assert.ok(q.r.length > q.l.length, "câu nối có ô thừa");
    const ten = (gan) => (i) => (so.includes(i) ? gan[so.indexOf(i)] : s.o[i].t);
    const hop = hoan(q.r).map((p) => p.slice(0, so.length)).filter((g, k, all) => all.findIndex((h) => h.join() === g.join()) === k)
      .filter((g) => g.every((t, k) => GD[t] && MAU[s.o[so[k]].fill] === GD[t][0] && !s.o.some((x) => x.t === t)) && s.canh.every(([u, v]) => hoc(ten(g)(u), ten(g)(v))));
    assert.equal(hop.length, 1, "chỉ một cách điền tên vào các ô có số khớp màu và mũi tên");
    return q.l.map((l, k) => [l, hop[0][k]]); } },
  { id: C.de1, has: "vào lớp 1 năm", right: (q) => {
    // tuổi học xong cao đẳng: số lớp của ba cấp phổ thông và thời gian ngắn nhất của cao đẳng (người tốt nghiệp trung học phổ thông)
    const tuoi = +q.q.match(/vào lớp 1 năm (\d+) tuổi/)[1], P = SO_LOP, lop = P["tiểu học"] + P["trung học cơ sở"] + P["trung học phổ thông"], cd = CAO_DANG[0];
    assert.ok(/Học xong trung học phổ thông, \S+ vào học cao đẳng ngay/.test(q.q) && /thời gian ngắn nhất/.test(q.q) && q.unit === "tuổi", "đề nói học cao đẳng ngay sau trung học phổ thông, trong thời gian ngắn nhất");
    assert.ok(q.x.includes(`${P["tiểu học"]} + ${P["trung học cơ sở"]} + ${P["trung học phổ thông"]} = ${lop}`) && q.x.includes(`từ ${CAO_DANG[0]} đến ${CAO_DANG[1]} năm`) && q.x.includes(`${tuoi} + ${lop} + ${cd} = ${tuoi + lop + cd}`), "lời giải ghi số lớp, thời gian học cao đẳng và phép tính");
    return tuoi + lop + cd; } },
  { id: C.de1, has: "số chỗ làm cần tuyển của bốn nhóm ngành", right: (q) => {
    const c = docCot(q.svg), gt = c.map((x) => x.gt), max = c.find((x) => x.gt === Math.max(...gt)), min = c.find((x) => x.gt === Math.min(...gt));
    assert.ok(gt.filter((v) => v === max.gt).length === 1 && gt.filter((v) => v === min.gt).length === 1, "một nhóm nhiều nhất, một nhóm ít nhất");
    assert.ok(q.unit === "chỗ" && q.x.includes(`${max.ten} cần tuyển nhiều nhất (${max.gt} chỗ)`) && q.x.includes(`${min.ten} cần tuyển ít nhất (${min.gt} chỗ)`) && q.x.includes(`${max.gt} − ${min.gt} = ${max.gt - min.gt}`), "lời giải đọc đúng biểu đồ");
    return max.gt - min.gt; } },
  { id: C.de1, has: "Bảng đánh giá của Nam có", right: (q) => {
    const so = (re) => +q.q.match(re)[1], tong = so(/có (\d+) mục/), khop = so(/“trùng khớp” ở (\d+) mục/), khong = so(/“không trùng khớp” ở (\d+) mục/), trong = so(/bỏ trống (\d+) mục/);
    assert.equal(khop + khong + trong, tong, "số mục cộng lại bằng số mục của bảng");
    // câu Vận dụng của Bài 5: đề không ghi sẵn cách tính điểm, thang xếp loại (học sinh dùng điều đã học); lời giải ghi như sách
    assert.ok(!/điểm/.test(q.q.replace("cách tính điểm", "")), "đề không ghi sẵn cách tính điểm, thang xếp loại");
    const muc = THANG_BAI5.find(([a, b]) => khop >= a && khop <= b)[2];
    assert.ok(q.x.includes(`Nam được ${khop} điểm`) && q.x.includes(THANG_BAI5.map(([a, b, t]) => `${a}–${b} điểm: ${t}`).join("; ")), "lời giải ghi số điểm và thang xếp loại của Bài 5");
    return muc[0].toUpperCase() + muc.slice(1); } },
  { id: C.de2, has: "con đường chị đã đi", right: (q) => {
    const s = docKhung(q.svg);
    assert.deepEqual(s.chuThich, {}, "sơ đồ không có chú thích");
    s.o.filter((x) => x.t === "?").forEach((x) => assert.equal(x.fill, "surface", "ô bị che không tô màu của phần nào"));
    s.o.filter((x) => x.t !== "?").forEach((x) => assert.equal(MAU[x.fill], GD[x.t][0], "ô có tên đúng màu của phần (như chú thích của sơ đồ kia): " + x.t));
    const dau = s.o.map((x, i) => i).filter((i) => !s.canh.some(([, v]) => v === i));
    assert.equal(dau.length, 1, "một ô đầu đường đi");
    const duong = [dau[0]];
    for (let r; (r = s.canh.filter(([u]) => u === duong[duong.length - 1])).length; ) { assert.equal(r.length, 1, "đường đi không rẽ nhánh"); duong.push(r[0][1]); }
    assert.equal(duong.length, s.o.length, "đường đi qua mọi ô");
    duong.slice(1).forEach((v, k) => assert.ok(s.o[v].h[1] < s.o[duong[k]].h[1], "đường đi từ dưới lên"));
    assert.ok(q.q.includes("tốt nghiệp " + s.o[duong[0]].t.toLowerCase()) && /từ dưới lên/.test(q.q), "đề nói điểm xuất phát và chiều đọc");
    const che = duong.filter((i) => s.o[i].t === "?");
    assert.equal(che.length, q.o.length, "mỗi ô sắp xếp ứng với một ô bị che");
    const hop = hoan(q.o).filter((p) => { const ten = (i) => (che.includes(i) ? p[che.indexOf(i)] : s.o[i].t); return duong.slice(1).every((v, k) => hoc(ten(duong[k]), ten(v))); });
    assert.equal(hop.length, 1, "chỉ một thứ tự điền các ô bị che khớp các mũi tên");
    return hop[0]; } },
  { id: C.de2, has: "bảng đánh giá của Tùng", right: (q) => {
    const b = docBang(q.svg);
    assert.deepEqual(b.o[0], ["Mục đánh giá", "Khớp", "Không khớp"], "hàng đầu là tiêu đề");
    const hang = b.o.slice(1);
    hang.forEach((h) => assert.ok(h[0] && ["", "×"].includes(h[1]) && ["", "×"].includes(h[2]) && !(h[1] && h[2]), "mỗi dòng nhiều nhất một dấu ×: " + h[0]));
    assert.ok(hang.some((h) => !h[1] && !h[2]) && hang.some((h) => h[2]), "có dòng chưa đánh giá và dòng không trùng khớp");
    assert.ok(!/được \d+ điểm/.test(q.q) && q.x.includes("Mỗi dấu × ở cột Khớp được 1 điểm"), "đề không ghi sẵn cách tính điểm, lời giải ghi như sách");
    const khop = hang.filter((h) => h[1]);
    assert.ok(q.unit === "điểm" && q.x.includes(`Cột Khớp có ${khop.length} dấu × (${khop.map((h) => h[0][0].toLowerCase() + h[0].slice(1)).join(", ")})`), "lời giải kể các dòng trùng khớp");
    return khop.length; } }
];
const giaTri = (q) => (q.type === "num" ? q.ans : q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : q.type === "order" ? q.o : q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a : q.o[0]);
const daKiem = new Set();
CHECKS.forEach((c) => {
  const hits = kho.filter((q) => q.q.includes(c.has));
  assert.equal(hits.length, 1, "đoạn chữ phải ứng với đúng một câu: " + c.has);
  const q = hits[0];
  assert.equal(q.src, c.id, "câu ở đúng đề: " + c.has);
  const r = c.right(q), got = giaTri(q);
  if (typeof r === "number") assert.ok(close(got, r), `đáp án ${got} khác kết quả tính ${r}: ${q.q.slice(0, 70)}`);
  else assert.deepEqual(got, r, `đáp án “${got}” khác kết quả tính “${r}”: ${q.q.slice(0, 70)}`);
  daKiem.add(q);
});
kho.filter((q) => q.svg || q.type === "num").forEach((q) => assert.ok(daKiem.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + q.q.slice(0, 60)));

/* ---------- chữ, lời dặn ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || [], q.type === "fill" ? q.ans : [], q.unit || []).map(String);
kho.forEach((q) => chu(q).forEach((s) => {
  const at = q.src + ": " + q.q.slice(0, 50) + " → ";
  // dấu thanh kiểu cũ, “kĩ”, “lí” như hai cuốn sách
  assert.ok(!/(?<![\p{L}])(?:hóa|hòa|khỏe|tùy|thỏa|thủy|tỏa|hủy|họa|lũy|xóa|kỹ|lý)(?![\p{L}])/iu.test(s), at + "viết như sách (hoá, hoà, khoẻ, tuỳ, thoả, kĩ, lí): " + s);
  // số ngăn hàng nghìn bằng khoảng trắng (năm viết liền), dấu phẩy thập phân
  assert.ok(!/\d{5,}|\d\.\d/.test(s) && [...s.matchAll(/(?<!\d)\d{4}(?!\d)/g)].every((m) => /^(19|20)\d\d$/.test(m[0])), at + "số viết sai cách: " + s);
  // lời giải không nói “ý thứ hai”, “phương án A”: app xáo phương án
  assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(s), at + "nhắc vị trí của phương án: " + s);
  // Tin học: không ghi số hiệu, năm ban hành của luật, nghị định (văn bản có thể đã được thay sau khi sách in)
  if (deCua(q) === T) assert.ok(!/Nghị định|NĐ-CP|\/QH\d|Luật [^,.;]*\d{4}/.test(s), at + "không ghi số hiệu, năm của văn bản pháp luật: " + s);
  // Công nghệ: tên cơ quan như sách in năm 2026 (không còn Bộ Lao động – Thương binh và Xã hội, Tổng cục Thống kê, Tổng cục Dạy nghề)
  if (deCua(q) === C) assert.ok(!/Thương binh và Xã hội|LĐTBXH|LĐ-TB|Tổng cục Thống kê|Tổng cục Dạy nghề|Tổng cục Giáo dục nghề nghiệp/.test(s), at + "tên cơ quan sách in năm 2026 đã bỏ: " + s);
  // nhân vật của sách Tin học 9 (An, Minh, Khoa) không dùng làm tên trong đề
  assert.ok(!/(?<![\p{L}])(?:An|Minh|Khoa)(?![\p{L}])(?! học)/u.test(s), at + "tên nhân vật của sách: " + s);
}));
const SO = "Từ năm học 2026–2027 Sở GD&ĐT ra đề chung cuối kì một số môn lớp 9; xem thông báo của Sở về môn và cấu trúc đề.";
MON.forEach((S) => {
  const nt = bank(S.de1).note;
  assert.equal(bank(S.de2).note, nt, S.m + ": hai đề cùng lời dặn");
  assert.ok(nt.startsWith(`Sách Kết nối tri thức, ${S.ten} 9`) && nt.endsWith(SO), S.m + ": lời dặn ghi sách và câu về đề chung của Sở");
  S.chuDe.forEach(([, n, ten]) => assert.ok(nt.includes(`Bài ${n} ${ten}`), S.m + ": lời dặn ghi Bài " + n + " " + ten));
  assert.ok(!/Thương binh và Xã hội|Tổng cục/.test(nt), S.m + ": lời dặn không có tên cơ quan cũ");
});
assert.ok(/Bài 3 Thực hành: Đánh giá chất lượng thông tin/.test(bank(T.de1).note) && /Bài 6 Thực hành: Khai thác phần mềm mô phỏng/.test(bank(T.de1).note) && /Bài 8 Thực hành: Sử dụng công cụ trực quan trình bày thông tin trong trao đổi và hợp tác/.test(bank(T.de1).note) && /không có phần thực hành trên máy/.test(bank(T.de1).note), "Tin học: lời dặn ghi ba bài thực hành, hỏi qua tình huống");
assert.ok(/mô đun tự chọn/.test(bank(C.de1).note) && /đối chiếu đề cương của trường/.test(bank(C.de1).note), "Công nghệ: lời dặn nhắc trường dạy mô đun tự chọn ở học kì I thì đối chiếu đề cương");

/* ---------- dạng câu, mức độ, ma trận, rút thử ---------- */
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
const chuThuong = (s) => String(s).normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean); // các chữ, giữ dấu
MON.forEach((S) => {
  const p = bank(S.pool), M = p.pool.matrix, cells = Object.values(M), K = S.kho, d1 = bank(S.de1).questions, d2 = bank(S.de2).questions;
  assert.ok(K.every((q) => ["mc", "tf4", "num", "fill", "match", "order"].includes(q.type)), S.pool + ": chỉ dùng nhiều lựa chọn, đúng/sai 4 ý, trả lời ngắn, nối cột, sắp xếp; không có tự luận");
  assert.ok(K.every((q) => [1, 2, 3].includes(q.lv)), S.pool + ": câu nào trong kho cũng cần lv");
  assert.ok(cells.every(Array.isArray), S.pool + ": ma trận ghi theo [Biết, Hiểu, Vận dụng]");
  assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], S.pool + ": ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
  assert.equal(sum(cells.map(sum)), p.n, S.pool + ": tổng ma trận bằng n");
  assert.deepEqual(Object.keys(M), S.chuDe.map((c) => c[0]), S.pool + ": chủ đề theo thứ tự bài của sách");
  [d1, d2].forEach((d, i) => {
    assert.deepEqual([...new Set(d.map((q) => q.topic))], Object.keys(M), `${S.pool}: Đề ${i + 1} đủ chủ đề, theo thứ tự của ma trận`);
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `Đề ${i + 1} của ${S.pool} đúng ma trận ở chủ đề ${t}`));
    assert.ok(d.filter((q) => q.type === "tf4").length >= 2 && d.some((q) => ["num", "fill"].includes(q.type)), `Đề ${i + 1} của ${S.pool}: có câu đúng/sai 4 ý và câu trả lời ngắn như khung Công văn 7991`);
  });
  const tf4 = K.filter((q) => q.type === "tf4"), kieu = {};
  assert.ok(tf4.length >= 4, S.pool + ": mỗi kho ít nhất 4 câu đúng/sai 4 ý");
  tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(q.o.length === 4 && /Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
  assert.equal(Math.max(...Object.values(kieu)), 1, S.pool + ": kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
  K.filter((q) => q.type === "match").forEach((q) => assert.ok(q.r.length > q.l.length && new Set(q.r).size === q.r.length, "câu nối có ô thừa, các ô không trùng nhau: " + q.q.slice(0, 50)));
  K.filter((q) => q.type === "order").forEach((q) => assert.ok(q.o.length >= 3 && new Set(q.o).size === q.o.length, "câu sắp xếp có ít nhất 3 ô khác nhau: " + q.q.slice(0, 50)));
  K.filter((q) => q.type === "mc").forEach((q) => {
    // đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2), không phải lựa chọn duy nhất có chữ của nhãn chủ đề (Rút ra N6)
    const m = Math.max(...q.o.slice(1).map((o) => o.length));
    assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + q.q.slice(0, 60));
    assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + q.q.slice(0, 60));
    const c = chuThuong(q.topic), tu = c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số)( |$)/u.test(w)); // từ hai âm tiết của nhãn
    tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); assert.ok(!(co[0] && !co.slice(1).some(Boolean)), `chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề: ${q.q.slice(0, 60)}`); });
    // ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có (Rút ra N22)
    const dau = q.o.map((o) => o.split(" ")[0]);
    assert.ok(!(q.o.length === 4 && dau.slice(1).every((d) => d === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1), "ba lựa chọn sai cùng mở đầu bằng “" + dau[1] + "”: " + q.q.slice(0, 50));
  });
  const seen = new Set();
  for (let k = 0; k < 300; k++) {
    const d = Quiz.draw(p);
    assert.equal(d.notes.length, 0, S.pool + ": rút thử có ghi chú: " + d.notes.join("; "));
    assert.equal(d.questions.length, p.n);
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d.questions, t, l)), v, `${S.pool}: rút đúng ma trận ở chủ đề ${t}`));
    d.questions.forEach((q) => seen.add(Quiz.key(q)));
  }
  assert.equal(seen.size, K.length, S.pool + ": 300 lần rút thử phải gặp đủ câu của kho");
  // học sinh đã làm hết một đề cố định (đúng cả) thì đề ngẫu nhiên rút toàn câu của đề kia
  [[S.de1, S.de2], [S.de2, S.de1]].forEach(([lam, con]) => {
    const hist = (q) => (q.src === lam ? { done: 1, wrong: 0 } : null);
    for (let k = 0; k < 30; k++) {
      const d = Quiz.draw(p, hist);
      assert.ok(d.notes.length === 0 && d.questions.length === p.n && d.questions.every((q) => q.src === con), `${S.pool}: đã làm hết ${lam} thì rút toàn câu của ${con}`);
    }
  });
});
// đáp án đúng là lựa chọn duy nhất có cặp từ của đề bài (Rút ra N9-ck1-khtn): in ra để xem tay
if (process.env.DO_DE) {
  const cap = (s) => { const w = chuThuong(s); return new Set(w.slice(1).map((x, k) => w[k] + " " + x)); };
  kho.filter((q) => q.type === "mc").forEach((q) => {
    const de = cap(q.q), co = q.o.map((o) => [...cap(o)].filter((c) => de.has(c)));
    if (co[0].length && co.slice(1).every((c) => !c.length)) console.log(`${q.src}: “${q.o[0]}” lặp “${co[0].join("”, “")}” của đề`);
  });
}

/* ---------- đề bài không trùng câu nào khác trong file (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng; không gần trùng câu
   của các kho cũ cùng môn (Rút ra N25): đề bài cùng các lựa chọn, ô nối, ô sắp xếp có từ một nửa số cặp hai âm tiết liền nhau
   (tính trên câu ít cặp hơn, bỏ các cặp có ở mọi câu như “nào dưới đây” và cặp của nhãn chủ đề) chung với một câu cũ thì báo ---------- */
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const CHUNG = new Set(["nào dưới", "dưới đây", "đây là", "là một", "mỗi ý", "ý sau", "sau đúng", "đúng hay", "hay sai", "ở hình", "nào sau", "sau đây"]);
const cap2 = (s) => { const w = String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x); };
const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !CHUNG.has(c) && !nhan.has(c))); };
MON.forEach((S) => {
  const mon = BANKS.filter((b) => !b.pool && b.subject === S.ten || /^tincn/.test(b.id) && !b.pool);
  const moi = S.kho.map((q) => ({ at: q.src + "#" + (bank(q.src).questions.indexOf(bank(q.src).questions.find((x) => x.q === q.q)) + 1), k: goc(q.q), c: capAm(q), q }));
  const file = BANKS.filter((b) => b.file === S.file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => goc(q.q)));
  moi.forEach((d) => assert.equal(file.filter((k) => k === d.k).length, 1, "đề bài trùng câu khác trong file: " + d.q.q.slice(0, 50)));
  const cu = mon.filter((b) => b.grade !== 9).flatMap((b) => b.questions.map((q, i) => ({ at: b.id + "#" + (i + 1), c: capAm(q) })));
  moi.forEach((d) => cu.forEach((e) => {
    const chung = [...d.c].filter((x) => e.c.has(x)).length;
    assert.ok(chung / Math.min(d.c.size, e.c.size) < 0.5, `gần trùng câu của kho cũ ${e.at}: ${d.at} “${d.q.q.slice(0, 50)}”`);
  }));
});

/* ---------- dò lộ đáp án (Rút ra N5, N19) giữa hai câu rút được cùng lúc: khác ô (chủ đề, mức), hoặc cùng một ô rút từ 2 câu.
   Đáp án là số (từ hai chữ số, hoặc số thập phân) chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”, “bằng”, “được”); cặp nối:
   câu kia có cả hai vế; ô sắp xếp: câu kia có cả hai ô liền nhau theo đúng thứ tự. Đáp án bằng chữ (lựa chọn đúng, đáp án câu điền)
   tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy cả đáp án); chuỗi có trong đề bài, lựa chọn, ô nối, lời giải
   của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM. ---------- */
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
const tu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum = (s) => { const w = tu(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const coCum = (t, s) => (" " + tu(t).join(" ") + " ").includes(" " + tu(s).join(" ") + " ");
const ten = new Map();
MON.forEach((S) => [S.de1, S.de2].forEach((id) => S.kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace(/9-ck1-/, "-") + "#" + (i + 1)))));
const doLo = (qs, M, tenCau = (q) => ten.get(q)) => {
  const cungLuc = (p, q) => p !== q && (p.topic !== q.topic || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2);
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    const so = q.type === "num" && (q.ans >= 10 || !Number.isInteger(q.ans)) ? [q.ans] : [];
    const C3 = q.type === "mc" ? [...new Set(cum(q.o[0]))] : q.type === "fill" ? [...new Set(cum(q.ans[0]))] : [];
    const cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [], lien = q.type === "order" ? q.o.slice(1).map((o, k) => [q.o[k], o]) : [];
    qs.forEach((p) => {
      if (!cungLuc(p, q)) return;
      const Cp = chu(p), at = `${tenCau(p)} → ${tenCau(q)}: `, Tp = " " + Cp.map((s) => tu(s).join(" ")).join(" | ") + " ";
      so.filter((x) => Cp.flatMap(soKQ).some((y) => close(x, y))).forEach((x) => lo.push(at + x));
      cap.filter(([l, r]) => Cp.some((t) => coCum(t, l) && coCum(t, r))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      lien.filter(([a, b]) => Cp.some((t) => { const x = t.toLowerCase().indexOf(a.toLowerCase()), y = t.toLowerCase().indexOf(b.toLowerCase()); return x >= 0 && y > x; })).forEach(([a, b]) => lo.push(at + a + " → " + b));
      C3.filter((c) => Tp.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
const loAll = [], chuAll = [];
MON.forEach((S) => { const r = doLo(S.kho, bank(S.pool).pool.matrix); loAll.push(...r.lo); chuAll.push(...r.chuLo); });
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuAll.join("\n"));
// đã xem (Phiên N9-ck1-tin-congnghe): chữ chung, câu kia không cho biết điều câu này hỏi. Tin học: “chính xác” (đáp án câu điền tên
// tiêu chí) chỉ là tính từ thường ở câu khác (tính toán chính xác, tài liệu chính xác…), không câu nào nói thông tin sai tên phố thiếu
// tiêu chí gì; “chia sẻ để”, “sẻ để các”: câu “KHÔNG phải là cách” kể cách chia sẻ để xem và để cùng sửa một lúc, không kể cách chia sẻ
// để các thành viên chủ động cập nhật; “sơ đồ dòng thời gian”: ý đúng của câu đúng/sai 4 ý nói sơ đồ này tạo được từ mẫu có sẵn, không
// nói nó dùng để trình bày tiến trình (câu kia hỏi điều đó, và chính tên công cụ đã nói lên điều đó); “mỗi bạn làm”, “bạn làm một”: câu
// kia tả nhóm chia nhau mỗi bạn một trang, không nói làm riêng rồi chọn một bài có phải là cách hợp tác hay không; “mô phỏng giúp”:
// câu kia hỏi phần mềm mô phỏng giúp gì nói chung; “có chất lượng”: câu về thông tin có chất lượng (câu kia hỏi chọn phần mềm mô
// phỏng); “thiết bị số”, “phần mềm có”, “so sánh các”, “theo thứ tự”, “lượng dữ liệu” (chất lượng dữ liệu), “của người khác”: cụm từ
// thường. Công nghệ: “quy trình lựa chọn nghề nghiệp” là tên Bài 4 (nhãn chủ đề), câu kia không nói dự án Bài 5 làm theo quy trình
// đó; “nhóm nghiệp vụ”: câu kia chỉ nêu tên nhóm (ô thừa của câu nối), không tả nét tính cách của nhóm; “môi trường làm việc”: câu
// kia hỏi môi trường làm việc của nghề kĩ thuật, công nghệ, không nói gì về lí thuyết Holland; “của gia đình”: câu Vân nói truyền
// thống gia đình đáng tham khảo, không phân loại yếu tố; “làm việc nhóm”: một dòng của bảng đánh giá, chính đề câu Long đã tả việc
// Long ít trao đổi với bạn; “bản thân và”, “làm công nhân”, “nghề hợp với”, “trao đổi với”, “hợp với mình”, “ngành kĩ thuật”: cụm từ
// thường.
const DA_XEM = [
  "tin-de1#21 → tin-de1#2: lượng dữ liệu",
  "tin-de2#12 → tin-de1#12: của người khác",
  "tin-de1#15 → tin-de1#18: mô phỏng giúp",
  "tin-de2#15 → tin-de1#18: mô phỏng giúp",
  "tin-de2#24 → tin-de1#20: mỗi bạn làm",
  "tin-de2#24 → tin-de1#20: bạn làm một",
  "tin-de2#25 → tin-de1#20: mỗi bạn làm",
  "tin-de1#20 → tin-de1#22: chia sẻ để",
  "tin-de1#20 → tin-de1#22: sẻ để các",
  "tin-de2#23 → tin-de1#24: sơ đồ dòng",
  "tin-de2#23 → tin-de1#24: đồ dòng thời",
  "tin-de2#23 → tin-de1#24: dòng thời gian",
  "tin-de1#2 → tin-de2#7: chính xác",
  "tin-de1#3 → tin-de2#7: chính xác",
  "tin-de2#17 → tin-de2#7: chính xác",
  "tin-de2#19 → tin-de2#7: chính xác",
  "tin-de1#11 → tin-de2#11: thiết bị số",
  "tin-de2#2 → tin-de2#11: thiết bị số",
  "tin-de2#5 → tin-de2#16: có chất lượng",
  "tin-de2#17 → tin-de2#16: phần mềm có",
  "tin-de2#6 → tin-de2#17: so sánh các",
  "tin-de1#8 → tin-de2#21: theo thứ tự",
  "tin-de2#8 → tin-de2#21: theo thứ tự",
  "congnghe-de2#4 → congnghe-de1#2: bản thân và",
  "congnghe-de2#4 → congnghe-de1#11: làm công nhân",
  "congnghe-de1#3 → congnghe-de1#16: môi trường làm",
  "congnghe-de1#3 → congnghe-de1#16: trường làm việc",
  "congnghe-de1#20 → congnghe-de1#18: của gia đình",
  "congnghe-de1#5 → congnghe-de1#20: nghề hợp với",
  "congnghe-de2#4 → congnghe-de1#20: nghề hợp với",
  "congnghe-de2#6 → congnghe-de1#20: trao đổi với",
  "congnghe-de1#21 → congnghe-de1#23: quy trình lựa",
  "congnghe-de1#21 → congnghe-de1#23: trình lựa chọn",
  "congnghe-de1#21 → congnghe-de1#23: lựa chọn nghề",
  "congnghe-de1#21 → congnghe-de1#23: chọn nghề nghiệp",
  "congnghe-de1#21 → congnghe-de1#24: hợp với mình",
  "congnghe-de2#25 → congnghe-de2#6: làm việc nhóm",
  "congnghe-de1#19 → congnghe-de2#19: nhóm nghiệp vụ",
  "congnghe-de1#10 → congnghe-de2#21: học ngành kĩ",
  "congnghe-de1#10 → congnghe-de2#21: ngành kĩ thuật"
];
assert.deepEqual(chuAll, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loAll, [], "lộ đáp án:\n" + loAll.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 14,6”, cả hai vế một cặp nối, hai ô sắp xếp liền nhau, cụm của đáp án
// trắc nghiệm, đáp án câu điền
{
  const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x }), khac = tim("mẫu giáo dành cho trẻ em");
  const thuLo = (qs) => { const M = new Proxy({}, { get: () => [1, 1, 1] }), r = doLo(qs, M, (q) => q.q.slice(0, 12)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  assert.deepEqual(thuLo([tim("ngôi sao năm cánh đều"), khac]), [], "câu không sửa thì không báo");
  assert.ok(thuLo([tim("ngôi sao năm cánh đều"), gia(khac, "Ví dụ AC = 14,6 cm.")]).includes("14.6"));
  assert.ok(thuLo([tim("Nối mỗi bạn với nhóm tính cách"), gia(khac, "Quý giàu tưởng tượng, thích vẽ tranh, chơi đàn, sáng tác: nhóm nghệ thuật.")]).includes("Quý giàu tưởng tượng, thích vẽ tranh, chơi đàn, sáng tác → Nhóm nghệ thuật"));
  const sx = tim("Sắp xếp các việc Đông làm");
  assert.ok(thuLo([sx, gia(khac, sx.o[0] + ". Sau đó: " + sx.o[1] + ".")]).includes(sx.o[0] + " → " + sx.o[1]));
  assert.ok(thuLo([tim("điểm chuẩn cao hơn nhiều"), gia(khac, "Cần cân nhắc tính khả thi của phương án.")]).includes("tính khả thi"));
  assert.ok(thuLo([tim("Trang giới thiệu của một bảo tàng"), gia(khac, "Thông tin sai địa chỉ thì thiếu tính chính xác.")]).includes("chính xác"));
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
// cụm từ chung của môn (tên bài, tên văn bản, tên cơ quan như sách) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ
const TU_CHUNG = ["Sở Giáo dục và Đào tạo", "làm tròn kết quả đến hàng phần mười", "lĩnh vực kĩ thuật, công nghệ", "lĩnh vực kĩ thuật và công nghệ",
  "khung cơ cấu hệ thống giáo dục quốc dân", "cơ quan quản lí lao động và việc làm", "cơ quan quản lí giáo dục nghề nghiệp", "bản tin thị trường lao động Việt Nam",
  "sự phát triển của khoa học, công nghệ", "tự đánh giá mức độ phù hợp"].map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
if (SACH.length) {
  assert.ok(SACH.some((f) => /tin-hoc-9/.test(f)) && SACH.some((f) => /cong-nghe-9-dinh-huong-nghe-nghiep/.test(f)), "OnUp-Book có Tin học 9, Công nghệ 9 – Định hướng nghề nghiệp");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · trang in \d+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => chu(q).flatMap((s) => chuoi(s, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi từ liền nhau trùng câu của kho khác ---------- */
{
  const khac = BANKS.filter((b) => !b.pool && !MON.some((S) => [S.de1, S.de2].includes(b.id))).flatMap((b) => b.questions.map((q) => ({ id: b.id, s: " " + chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(CHECKS.length + " câu đã tính lại hoặc đọc lại hình; " + MON.map((S) => `${S.ten}: kho ${S.kho.length} câu, ma trận 10 – 8 – 7 trên ${S.chuDe.length} chủ đề`).join("; ") + ".");
console.log("MATH OK");
