// Kiểm tra hai ngân hàng lớp 9 giữa kì I của Phiên N9-gk1-tin-congnghe: Tin học (data/banks/9-tin.js, Bài 1–4) và Công nghệ
// (data/banks/9-congnghe.js, Định hướng nghề nghiệp Bài 1–3), theo mẫu tests/tin-congnghe9-ck1.js. Mỗi ngân hàng = Đề 1 + Đề 2 (cùng
// chia đúng ma trận) + đề ngẫu nhiên không có câu riêng; mã đề, số câu lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7.
// Câu có phép tính hoặc có hình được nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong hai kho, đúng đề ghi ở id); đáp án
// tính bằng code (so với ans, o[0], a của câu đúng/sai 4 ý). Tin học: bảng thông tin về câu lạc bộ (đếm mục chưa có thông tin), bảng bốn
// lớp học bơi (chỉ một lớp đáp ứng mọi điều kiện ghi trong đề), đếm đồ vật có bộ xử lí (bảng phân loại ghi trong script). Công nghệ:
// phần trên của khung cơ cấu hệ thống giáo dục quốc dân (ô hai dòng chữ, mũi tên một đầu: chuyển tiếp lên cấp trên, mũi tên hai đầu:
// chuyển đổi cùng cấp; mỗi ý đúng/sai xét lại trên sơ đồ đọc được, sơ đồ đúng như Hình 2.2 của sách), năm nhận bằng thạc sĩ, tuổi
// nhận bằng tiến sĩ (thời gian đào tạo như sách, GD_NAM), số bậc của Khung trình độ quốc gia, bảng vị trí tuyển dụng (cộng số chỗ cần
// người đã qua đào tạo), bảng so sánh hai nghề, biểu đồ cột tỉ lệ lao động đã qua đào tạo (xét từng nhận xét), biểu đồ cột tỉ lệ tin
// tuyển dụng theo nhóm ngành (cộng các nhóm thuộc lĩnh vực kĩ thuật, công nghệ theo bảng ghi trong script), hai biểu đồ cột ghép (số tin
// tuyển dụng hai năm: nghề tăng mạnh nhất; số người đăng kí và số chỗ cần tuyển: mỗi ý đúng/sai xét lại bằng số đọc từ hình). Bảng: đường
// kẻ ngang cách đều, chữ nằm trong một ô và không tràn khỏi ô; biểu đồ: số ở đỉnh cột khớp chiều cao theo trục; sơ đồ: chữ vừa ô, mũi tên
// đi từ cạnh ô này tới cạnh ô kia, không cắt ô nào. Câu trả lời bằng số và câu có hình nào cũng phải có kiểm tra ở đây.
// Rồi: chữ (dấu thanh kiểu cũ như sách “hoá”, “khoẻ”, “tuỳ”; “kĩ”, “lí”; số ngăn hàng nghìn bằng khoảng trắng; Tin học không ghi số hiệu,
// năm ban hành của luật, nghị định; Công nghệ không có tên cơ quan mà sách in năm 2026 đã bỏ; không dùng tên nhân vật của sách Tin học 9),
// lời dặn của đề (các bài theo mục lục, không có câu về đề chung của Sở vì là đề giữa kì), dạng câu (mỗi kho ít nhất 4 câu đúng/sai 4 ý,
// không lặp kiểu Đ/S; mỗi đề cố định có câu đúng/sai 4 ý và câu trả lời ngắn; câu nối có một ô thừa, cặp nối không có chữ chung), mức độ
// và ma trận (chủ đề theo thứ tự bài, đúng chữ chủ đề của kho cuối kì I: đề “Ôn chủ đề” rút chung câu các kho), đáp án đúng không dài
// hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn, không là lựa chọn duy nhất có
// chữ của nhãn chủ đề, ba lựa chọn sai không cùng mở đầu một chữ; rút thử nhiều lần (đúng ma trận, gặp đủ câu của kho; đã làm hết một đề
// cố định thì rút toàn câu của đề kia); đề bài không trùng câu nào trong file, không trùng đề bài, đáp án câu cùng chủ đề của các kho cũ,
// không gần trùng câu của các kho cũ cùng môn (cặp hai âm tiết chung, cả kho cuối kì I); dò lộ đáp án giữa mọi cặp câu của kho (đề “Ôn
// chủ đề” rút chung cả chủ đề, đề ngẫu nhiên rút chung các chủ đề) và giữa câu cùng chủ đề của kho này với các kho cũ (số ở vị trí kết
// quả, cả hai vế một cặp nối, hai ô sắp xếp liền nhau: không được có; chuỗi 3 từ của đáp án bằng chữ in ra với DO_LO=1 để xem tay, đã
// xem ghi ở DA_XEM); bộ dò, bộ đọc hình tự thử với câu, hình cố ý viết sai. Có sách ở ../OnUp-Book (repo riêng tư) thì so mọi trường chữ
// với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp nguyên âm (không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và với câu của mọi kho
// khác (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 5 từ). DO_DE=1 in câu trắc nghiệm mà chỉ đáp án đúng có cặp từ của đề bài.
// Chạy: node tests/tin-congnghe9-gk1.js → in MATH OK.
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
   CHU_DE: chủ đề theo thứ tự bài của sách (nhãn chủ đề, số bài, tên bài theo mục lục sách in năm 2026); cu: đề ngẫu nhiên của kho cuối
   kì I cùng môn (chữ chủ đề của kho này lấy theo kho đó). */
const MON = [
  ["tin", "Tin học", "9-tin.js", [["Thế giới kĩ thuật số", 1, "Thế giới kĩ thuật số"], ["Thông tin trong giải quyết vấn đề", 2, "Thông tin trong giải quyết vấn đề"],
    ["Một số vấn đề pháp lí về sử dụng dịch vụ Internet", 4, "Một số vấn đề pháp lí về sử dụng dịch vụ Internet"]]],
  ["congnghe", "Công nghệ", "9-congnghe.js", [["Nghề nghiệp trong lĩnh vực kĩ thuật và công nghệ", 1, "Nghề nghiệp trong lĩnh vực kĩ thuật và công nghệ"],
    ["Cơ cấu hệ thống giáo dục quốc dân", 2, "Cơ cấu hệ thống giáo dục quốc dân"], ["Thị trường lao động kĩ thuật, công nghệ", 3, "Thị trường lao động kĩ thuật, công nghệ tại Việt Nam"]]]
].map(([m, ten, file, chuDe]) => {
  const re = new RegExp(`^${m}9-gk1-`), p = BANKS.find((b) => b.pool && re.test(b.id)), cu = BANKS.find((b) => b.pool && b.id === `${m}9-ck1-ngau-nhien`);
  assert.ok(p, `thiếu đề ngẫu nhiên ${m}9-gk1`);
  assert.ok(cu, `thiếu kho cuối kì I ${m}9-ck1`);
  assert.equal(p.pool.from.length, 2, p.id + ": đề ngẫu nhiên lấy câu của hai đề cố định");
  const S = { m, ten, file, chuDe, pool: p.id, cu: cu.id, de1: p.pool.from[0], de2: p.pool.from[1], kho: p.questions };
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
const gan = (x, y) => Math.abs(x - y) <= 0.06; // toạ độ trong hình ghi đến một chữ số thập phân
const sum = (a) => a.reduce((s, v) => s + v, 0);
const val = (s) => +String(s).replace(/\s/g, "").replace(/−/g, "-").replace(",", "."); // "35 000" → 35000, "2,5" → 2.5
const vn = (x) => String(Math.round(x * 1e6) / 1e6).replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace(".", ","); // 500000 → "500 000"

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const daDoc = new Set(); // hình đã đọc lại bằng code
const coChu = (t) => assert.ok(+t["font-size"] >= 13, "chữ trong hình từ 13 trở lên: " + t.t);
const rong = (t) => (t["font-weight"] === "700" ? 0.62 : 0.55) * +t["font-size"] * [...t.t].length; // ước bề rộng dòng chữ (như tests/tin-congnghe9-ck1.js)

/* Bảng (như tests/tin-congnghe9-ck1.js): đường kẻ ngang (các hàng cao bằng nhau), đường kẻ dọc; chữ đặt giữa ô (text-anchor middle) hoặc
   sát lề trái ô, mỗi ô nhiều nhất một chữ, không tràn khỏi ô. Trả về { o: [[chữ từng ô theo hàng, "" là ô trống]] }. */
const docBang = (svg) => {
  daDoc.add(svg);
  const lines = tags(svg, "line"), ngang = lines.filter((l) => num(l, "y1") === num(l, "y2")), doc = lines.filter((l) => num(l, "x1") === num(l, "x2"));
  assert.equal(ngang.length + doc.length, lines.length, "bảng: mọi đường kẻ nằm ngang hoặc thẳng đứng");
  const ys = [...new Set(ngang.map((l) => num(l, "y1")))].sort((a, b) => a - b), xs = [...new Set(doc.map((l) => num(l, "x1")))].sort((a, b) => a - b);
  assert.ok(ys.length === ngang.length && xs.length === doc.length, "bảng: không kẻ trùng đường");
  ngang.forEach((l) => assert.ok(num(l, "x1") === xs[0] && num(l, "x2") === xs[xs.length - 1], "đường ngang kẻ hết bề rộng bảng"));
  doc.forEach((l) => assert.ok(num(l, "y1") === ys[0] && num(l, "y2") === ys[ys.length - 1], "đường dọc kẻ hết chiều cao bảng"));
  ys.forEach((y, i) => i && assert.equal(y - ys[i - 1], ys[1] - ys[0], "các hàng cao bằng nhau"));
  assert.ok(+svg.match(/viewBox="0 0 \d+ (\d+)"/)[1] >= ys[ys.length - 1] && xs[xs.length - 1] <= 320, "bảng nằm trong khung hình");
  const o = Array.from({ length: ys.length - 1 }, () => Array(xs.length - 1).fill(""));
  texts(svg).forEach((t) => {
    coChu(t);
    const x = +t.x, y = +t.y, giua = t["text-anchor"] === "middle";
    const c = xs.findIndex((v, i) => i && (giua ? gan(x, (v + xs[i - 1]) / 2) : x > xs[i - 1] && x - xs[i - 1] <= 10)) - 1;
    const r = ys.findIndex((v, i) => i && y > ys[i - 1] + +t["font-size"] * 0.7 && y < v) - 1;
    assert.ok(c >= 0 && r >= 0 && o[r][c] === "", "chữ nằm trong một ô (giữa ô hoặc sát lề trái), mỗi ô một chữ: " + t.t);
    const w = rong(t), trai = giua ? x - w / 2 : x, phai = giua ? x + w / 2 : x + w;
    assert.ok(trai >= xs[c] && phai <= xs[c + 1], "chữ vừa ô: " + t.t);
    assert.equal(t["font-weight"] === "700", r === 0, "chỉ hàng tiêu đề in đậm: " + t.t);
    o[r][c] = t.t;
  });
  return { o };
};

/* Trục số của biểu đồ: đường lưới ngang tô line, nhãn số bên trái mỗi đường (text-anchor end); đường dưới cùng là 0, nhãn cách đều.
   Trả về { y0, k (giá trị trên mỗi đơn vị chiều cao), nhan (các chữ nhãn) }. */
const trucSo = (svg, TX) => {
  const luoi = tags(svg, "line").filter((l) => l.stroke === "line");
  luoi.forEach((l) => assert.equal(num(l, "y1"), num(l, "y2"), "đường lưới nằm ngang"));
  const nhan = [];
  const truc = luoi.map((l) => { const t = TX.filter((t) => t["text-anchor"] === "end" && +t.x < num(l, "x1") && gan(+t.y, num(l, "y1") + 5)); assert.equal(t.length, 1, "mỗi đường lưới một nhãn"); nhan.push(t[0]); return [num(l, "y1"), val(t[0].t)]; }).sort((a, b) => b[0] - a[0]);
  assert.equal(truc[0][1], 0, "đường dưới cùng là 0");
  const k = (truc[1][1] - truc[0][1]) / (truc[0][0] - truc[1][0]);
  truc.forEach(([y, v]) => assert.ok(close(v, (truc[0][0] - y) * k, 1e-6), "nhãn trục cách đều"));
  return { y0: truc[0][0], k, nhan };
};
/* Cột: tô màu f, đứng trên đường 0, số ở đỉnh cột (giữa cột, cao hơn đỉnh không quá 12) khớp chiều cao theo trục. */
const docCotMau = (svg, TX, y0, k, f) => tags(svg, "rect").filter((r) => r.fill === f && gan(num(r, "y") + num(r, "height"), y0)).map((r) => {
  const cx = num(r, "x") + num(r, "width") / 2, gt = num(r, "height") * k;
  const so = TX.filter((t) => t["text-anchor"] === "middle" && gan(+t.x, cx) && +t.y < num(r, "y") && +t.y > num(r, "y") - 12);
  assert.ok(so.length === 1 && close(val(so[0].t), gt, 1e-6), "số ở đỉnh cột khớp chiều cao theo trục: " + (so[0] || {}).t);
  return { cx, gt, so: so[0], r };
});
/* Biểu đồ cột một dãy (như tests/tin-congnghe9-ck1.js): cột tô acc, tên cột ngay dưới đường 0, một dòng tên trục. Trả về [{ ten, gt }]. */
const docCot = (svg) => {
  daDoc.add(svg);
  const TX = texts(svg); TX.forEach(coChu);
  const { y0, k, nhan } = trucSo(svg, TX);
  const cot = docCotMau(svg, TX, y0, k, "acc").map((c) => {
    const ten = TX.filter((t) => t["text-anchor"] === "middle" && gan(+t.x, c.cx) && +t.y > y0);
    assert.equal(ten.length, 1, "mỗi cột một tên ngay dưới đường 0");
    return { ten: ten[0].t, gt: c.gt, cx: c.cx };
  });
  cot.forEach((c, i) => i && assert.ok(c.cx > cot[i - 1].cx, "các cột xếp từ trái sang phải"));
  assert.equal(TX.length, nhan.length + 2 * cot.length + 1, "mọi chữ là nhãn trục, số, tên cột hoặc tên trục");
  assert.equal(tags(svg, "rect").length, cot.length, "biểu đồ một dãy chỉ có các cột");
  return cot;
};
/* Biểu đồ cột ghép hai dãy: dãy 1 tô acc, dãy 2 tô sun, hai cột của một nhóm liền nhau (dãy 1 bên trái), tên nhóm ở giữa hai cột ngay
   dưới đường 0; chú thích: hai ô vuông nhỏ (cạnh 12, không bo góc) phía trên vùng vẽ, dòng chữ ngay bên phải mỗi ô; một dòng tên trục.
   Trả về { nhom: [{ ten, a, b }], chuThich: [tên dãy 1, tên dãy 2] }. */
const docCotGhep = (svg) => {
  daDoc.add(svg);
  const TX = texts(svg); TX.forEach(coChu);
  const { y0, k, nhan } = trucSo(svg, TX);
  const tren = Math.min(...tags(svg, "line").filter((l) => l.stroke === "line").map((l) => num(l, "y1")));
  const leg = tags(svg, "rect").filter((r) => num(r, "width") === 12 && num(r, "height") === 12 && num(r, "y") + 12 < tren);
  assert.equal(leg.length, 2, "hai ô chú thích phía trên vùng vẽ");
  const chuThich = {};
  leg.forEach((r) => {
    const t = TX.filter((t) => !t["text-anchor"] && +t.x > num(r, "x") + 12 && +t.x <= num(r, "x") + 20 && +t.y > num(r, "y") && +t.y <= num(r, "y") + 12);
    assert.equal(t.length, 1, "mỗi ô chú thích một dòng chữ ngay bên phải"); chuThich[r.fill] = t[0];
  });
  assert.ok(chuThich.acc && chuThich.sun, "chú thích hai màu acc, sun");
  assert.ok(+chuThich.acc.x + rong(chuThich.acc) < num(leg.find((r) => r.fill === "sun"), "x"), "chữ chú thích thứ nhất không đè ô chú thích thứ hai");
  const A = docCotMau(svg, TX, y0, k, "acc"), B = docCotMau(svg, TX, y0, k, "sun");
  assert.equal(A.length, B.length, "mỗi nhóm hai cột");
  const nhom = A.map((a, i) => {
    const b = B[i];
    assert.ok(Math.abs(num(b.r, "x") - (num(a.r, "x") + num(a.r, "width"))) <= 2 && num(a.r, "width") === num(b.r, "width"), "hai cột của một nhóm liền nhau, cùng bề rộng, dãy 1 bên trái");
    const cx = (num(a.r, "x") + num(b.r, "x") + num(b.r, "width")) / 2, ten = TX.filter((t) => t["text-anchor"] === "middle" && close(+t.x, cx, 0.6) && +t.y > y0);
    assert.equal(ten.length, 1, "mỗi nhóm một tên ngay dưới đường 0");
    return { ten: ten[0].t, a: a.gt, b: b.gt };
  });
  A.forEach((a, i) => i && assert.ok(num(a.r, "x") > num(B[i - 1].r, "x") + num(B[i - 1].r, "width"), "các nhóm không đè lên nhau"));
  assert.equal(TX.length, nhan.length + 2 * A.length + A.length + 2 + 1, "mọi chữ là nhãn trục, số, tên nhóm, chú thích hoặc tên trục");
  return { nhom, chuThich: [chuThich.acc.t, chuThich.sun.t] };
};

/* Sơ đồ khung: ô là rect có rx, chữ ở giữa ô (một hay nhiều dòng, ghép lại bằng dấu cách, mỗi dòng vừa ô); mũi tên là đoạn thẳng có
   đầu mũi tên (polygon tô ink: đỉnh trước, hai góc đáy sau, trung điểm đáy là đầu đoạn thẳng) ở một đầu (chuyển tiếp: đi từ cạnh ô nguồn
   tới đỉnh chạm cạnh ô đích) hoặc ở cả hai đầu (chuyển đổi cùng cấp: hai đỉnh chạm cạnh hai ô); không đoạn nào cắt ô; chú thích là ô
   vuông nhỏ không rx với dòng chữ ngay bên phải. Trả về { o: [{ t, fill, h }], mui: [[nguồn, đích]], doi: [[i, j]], chuThich }. */
const docKhung = (svg) => {
  daDoc.add(svg);
  const R = tags(svg, "rect"), TX = texts(svg), L = tags(svg, "line"), P = tags(svg, "polygon");
  TX.forEach(coChu);
  const hop = (r) => [num(r, "x"), num(r, "y"), num(r, "x") + num(r, "width"), num(r, "y") + num(r, "height")];
  const W = +svg.match(/viewBox="0 0 (\d+) (\d+)"/)[1], H = +svg.match(/viewBox="0 0 (\d+) (\d+)"/)[2];
  R.forEach((r) => { const h = hop(r); assert.ok(h[0] >= 0 && h[1] >= 0 && h[2] <= W && h[3] <= H, "ô nằm trong khung hình"); });
  const chuThich = {}, dungChu = new Set();
  R.filter((r) => !r.rx).forEach((r) => {
    const [, y0, x1, y1] = hop(r), t = TX.filter((t) => !t["text-anchor"] && +t.x > x1 && +t.x <= x1 + 10 && +t.y > y0 && +t.y <= y1);
    assert.equal(t.length, 1, "mỗi ô chú thích một dòng chữ ngay bên phải");
    assert.ok(!(r.fill in chuThich), "mỗi màu một chú thích"); chuThich[r.fill] = t[0].t; dungChu.add(t[0]);
  });
  const o = R.filter((r) => r.rx).map((r) => {
    const h = hop(r), t = TX.filter((t) => t["text-anchor"] === "middle" && gan(+t.x, (h[0] + h[2]) / 2) && +t.y > h[1] && +t.y < h[3]).sort((a, b) => +a.y - +b.y);
    assert.ok(t.length >= 1, "mỗi ô có chữ ở giữa");
    t.forEach((d, i) => { assert.ok(rong(d) <= h[2] - h[0] - 8, "chữ vừa ô: " + d.t); assert.ok(+d.y - 13 >= h[1] && +d.y + 4 <= h[3], "dòng chữ nằm trong ô: " + d.t); if (i) assert.ok(+d.y - +t[i - 1].y >= 15, "các dòng chữ không đè nhau"); dungChu.add(d); });
    return { t: t.map((d) => d.t).join(" "), fill: r.fill, h };
  });
  assert.equal(dungChu.size, TX.length, "mọi chữ là chữ trong ô hoặc chú thích");
  const cat = (a, b) => a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];
  o.forEach((x, i) => o.forEach((y, j) => assert.ok(i >= j || !cat(x.h, y.h), "hai ô không đè lên nhau")));
  const tren = (p, h) => p[0] >= h[0] - 0.5 && p[0] <= h[2] + 0.5 && p[1] >= h[1] - 0.5 && p[1] <= h[3] + 0.5 && [p[0] - h[0], p[0] - h[2], p[1] - h[1], p[1] - h[3]].some((d) => Math.abs(d) < 0.5);
  const trong = (p, h) => p[0] > h[0] + 0.5 && p[0] < h[2] - 0.5 && p[1] > h[1] + 0.5 && p[1] < h[3] - 0.5;
  const oCua = (p) => { const i = o.map((x, k) => k).filter((k) => tren(p, o[k].h)); assert.equal(i.length, 1, "đầu mũi tên chạm cạnh đúng một ô"); return i[0]; };
  const dungP = new Set(), mui = [], doi = [];
  L.forEach((l) => {
    const a = [num(l, "x1"), num(l, "y1")], b = [num(l, "x2"), num(l, "y2")];
    const dauO = (e) => P.filter((p) => { const q = pts(p.points); return q.length === 3 && dist([(q[1][0] + q[2][0]) / 2, (q[1][1] + q[2][1]) / 2], e) < 0.2; });
    const da = dauO(a), db = dauO(b);
    assert.ok(da.length <= 1 && db.length <= 1 && da.length + db.length >= 1, "đoạn thẳng có đầu mũi tên ở một hoặc hai đầu");
    [...da, ...db].forEach((p) => { assert.equal(p.fill, "ink", "đầu mũi tên tô ink"); dungP.add(p); });
    const dinh = (p, e, f) => { const d = pts(p.points)[0], u = [e[0] - f[0], e[1] - f[1]], v = [d[0] - e[0], d[1] - e[1]]; assert.ok(Math.abs(u[0] * v[1] - u[1] * v[0]) / Math.hypot(...u) < 0.3 && u[0] * v[0] + u[1] * v[1] > 0, "đỉnh mũi tên thẳng hàng với đoạn thẳng"); return d; };
    let p1, p2;
    if (da.length && db.length) { p1 = dinh(da[0], a, b); p2 = dinh(db[0], b, a); doi.push([oCua(p1), oCua(p2)]); }
    else if (db.length) { p1 = a; p2 = dinh(db[0], b, a); mui.push([oCua(p1), oCua(p2)]); }
    else { p1 = b; p2 = dinh(da[0], a, b); mui.push([oCua(p1), oCua(p2)]); }
    for (let k = 1; k < 60; k++) { const s = [p1[0] + ((p2[0] - p1[0]) * k) / 60, p1[1] + ((p2[1] - p1[1]) * k) / 60]; assert.ok(!o.some((x) => trong(s, x.h)), "mũi tên không cắt ô nào"); }
  });
  assert.equal(dungP.size, P.length, "mọi đầu mũi tên thuộc một đoạn thẳng");
  [...mui, ...doi].forEach(([u, v]) => assert.notEqual(u, v, "mũi tên nối hai ô khác nhau"));
  return { o, mui, doi, chuThich };
};

/* ---------- điều sách nêu (dùng để tính lại) ----------
   GD_NAM: thời gian đào tạo (năm, ít nhất – nhiều nhất) theo khung cơ cấu hệ thống giáo dục quốc dân (Bài 2 Công nghệ 9). KHUNG_TD: Khung
   trình độ quốc gia Việt Nam (8 bậc, 6 trình độ). KT_CN: nhóm ngành thuộc lĩnh vực kĩ thuật, công nghệ (Bài 2: công nghệ thông tin,
   công nghệ kĩ thuật cơ khí, điện, điện tử…); KHAC: nhóm ngành thuộc lĩnh vực khác. XU_LI: đồ vật có (true) hay không có (false) bộ xử lí
   (Bài 1 Tin học 9: thiết bị tiếp nhận, xử lí thông tin). */
const GD_NAM = { "đại học": [3, 5], "thạc sĩ": [1, 2], "tiến sĩ": [3, 4] };
const KHUNG_TD = { bac: 8, trinhDo: 6 };
const KT_CN = ["công nghệ thông tin", "cơ khí, chế tạo", "xây dựng công trình", "điện, điện tử"], KHAC = ["bán hàng", "du lịch, nhà hàng"];
const XU_LI = { "nồi cơm điện tử nấu theo giờ hẹn": true, "đèn pin bật tắt bằng công tắc trượt": false, "máy giặt tự chọn mức nước theo lượng quần áo": true,
  "phích nước giữ nhiệt": false, "điện thoại thông minh": true, "máy xay sinh tố loại thường ấn nút là quay": false };
// mỗi ý đúng/sai 4 ý được xét bằng một luật (biểu thức chính quy của ý → giá trị tính được); ý nào cũng phải có đúng một luật
const luat = (q, LUAT) => q.o.map((o) => { const l = LUAT.filter(([re]) => re.test(o)); assert.equal(l.length, 1, "ý nào cũng có đúng một luật: " + o); return l[0][1](o.match(l[0][0])); });

/* ---------- các câu cần tính ----------
   id: đề chứa câu; has: đoạn chữ của đề; right(q): đáp án tính bằng code (so với ans, o[0], a). */
const CHECKS = [
  { id: T.de1, has: "câu lạc bộ bóng rổ để đăng kí tập", right: (q) => {
    const b = docBang(q.svg), CHUA = ["Đang cập nhật", "Liên hệ để biết"];
    assert.deepEqual(b.o[0], ["Mục cần biết", "Thông tin tìm được"], "hàng đầu là tiêu đề");
    const hang = b.o.slice(1);
    assert.ok(q.q.includes(["không", "một", "hai", "ba", "bốn", "năm", "sáu"][hang.length] + " mục"), "đề nói đúng số mục của bảng");
    hang.forEach(([m, t]) => assert.ok(m && t, "dòng nào cũng có mục và thông tin: " + m));
    const thieu = hang.filter(([, t]) => CHUA.includes(t));
    assert.ok(thieu.length >= 1 && thieu.length < hang.length, "có mục đã có thông tin và mục chưa có");
    thieu.forEach(([m, t]) => assert.ok(q.x.includes(`“${t}” (${m.toLowerCase()})`), "lời giải nêu từng mục chưa có thông tin: " + m));
    assert.ok(q.unit === "mục" && q.x.includes(`còn ${thieu.length} mục`), "lời giải ghi số mục còn thiếu");
    return thieu.length; } },
  { id: T.de2, has: "Nhà Hùng có các đồ vật sau", right: (q) => {
    const ds = q.q.match(/sau: (.+)\. Có bao nhiêu/)[1].split(", ");
    assert.deepEqual(ds.slice().sort(), Object.keys(XU_LI).sort(), "đề kể đúng các đồ vật trong bảng phân loại");
    const co = ds.filter((d) => XU_LI[d]);
    assert.ok(co.length >= 2 && co.length <= ds.length - 2, "có cả đồ vật có và không có bộ xử lí");
    // đồ vật dùng điện mà không có bộ xử lí (dễ nhầm) phải có trong đề
    assert.ok(ds.some((d) => !XU_LI[d] && /công tắc|ấn nút|bấm/.test(d)), "có đồ vật chạy điện mà không có bộ xử lí");
    co.forEach((d) => assert.ok(q.x.toLowerCase().includes(d.split(" ").slice(0, 3).join(" ")), "lời giải nêu đồ vật có bộ xử lí: " + d));
    assert.ok(q.x.includes(`${co.length} đồ vật`) && q.unit === "đồ vật", "lời giải ghi số đồ vật");
    return co.length; } },
  { id: T.de2, has: "bốn lớp học bơi trong hè", right: (q) => {
    const b = docBang(q.svg);
    assert.deepEqual(b.o[0], ["Lớp", "Buổi học", "Học phí/tháng", "Cách nhà"], "hàng đầu là tiêu đề");
    const buoi = q.q.match(/chỉ học được buổi (\S+),/)[1], phi = val(q.q.match(/không quá (\d{1,3}(?: \d{3})*) đồng/)[1]), xa = val(q.q.match(/không quá (\d+(?:,\d+)?) km/)[1]);
    const hang = b.o.slice(1).map(([lop, bh, hp, cn]) => ({ lop, ok: [bh.toLowerCase() === buoi, val(hp.replace(" đồng", "")) <= phi, val(cn.replace(" km", "")) <= xa] }));
    const dat = hang.filter((h) => h.ok.every(Boolean));
    assert.equal(dat.length, 1, "chỉ một lớp đáp ứng cả ba điều kiện");
    hang.filter((h) => h !== dat[0]).forEach((h) => assert.equal(h.ok.filter((v) => !v).length, 1, "mỗi lớp còn lại vướng đúng một điều kiện: lớp " + h.lop));
    assert.ok([0, 1, 2].every((k) => hang.some((h) => !h.ok[k])), "điều kiện nào cũng loại được một lớp");
    assert.deepEqual(q.o.slice().sort(), hang.map((h) => "Lớp " + h.lop).sort(), "bốn lựa chọn là bốn lớp trong bảng");
    return "Lớp " + dat[0].lop; } },
  { id: C.de1, has: "Hình bên vẽ một phần khung cơ cấu", right: (q) => {
    const s = docKhung(q.svg);
    assert.deepEqual(s.chuThich, { "acc-soft": "Giáo dục đại học" }, "chú thích: màu của giáo dục đại học");
    const ten = (t) => { const i = s.o.findIndex((x) => x.t === t); assert.ok(i >= 0, "sơ đồ có ô " + t); return i; };
    const B = ["Đại học định hướng nghiên cứu", "Đại học định hướng ứng dụng", "Thạc sĩ định hướng nghiên cứu", "Thạc sĩ định hướng ứng dụng"].map(ten);
    assert.equal(s.o.length, 4, "sơ đồ có bốn ô");
    // sơ đồ đúng như Hình 2.2: mỗi ô đại học chuyển tiếp lên cả hai ô thạc sĩ; chuyển đổi cùng cấp giữa hai định hướng của cùng một trình độ
    const coMui = (u, v) => s.mui.some(([a, b]) => a === u && b === v), coDoi = (u, v) => s.doi.some(([a, b]) => (a === u && b === v) || (a === v && b === u));
    assert.ok([B[0], B[1]].every((u) => [B[2], B[3]].every((v) => coMui(u, v))) && s.mui.length === 4, "mỗi ô đại học có mũi tên lên cả hai ô thạc sĩ, không có mũi tên khác");
    assert.ok(coDoi(B[0], B[1]) && coDoi(B[2], B[3]) && s.doi.length === 2, "chuyển đổi cùng cấp giữa hai định hướng đại học và giữa hai định hướng thạc sĩ");
    [B[0], B[1]].forEach((i) => [B[2], B[3]].forEach((j) => assert.ok(s.o[i].h[1] > s.o[j].h[3], "ô đại học nằm dưới ô thạc sĩ")));
    const len = (i) => s.mui.filter(([a]) => a === i).map(([, b]) => b);
    return luat(q, [
      [/^Sinh viên đại học định hướng ứng dụng có thể chuyển sang học đại học định hướng nghiên cứu\.$/, () => coDoi(B[1], B[0])],
      [/^Tốt nghiệp đại học định hướng ứng dụng thì chỉ được học thạc sĩ định hướng ứng dụng\.$/, () => len(B[1]).length === 1 && len(B[1])[0] === B[3]],
      [/^Học viên thạc sĩ định hướng nghiên cứu không thể chuyển sang định hướng ứng dụng\.$/, () => !coDoi(B[2], B[3])],
      [/^Cả bốn ô trong sơ đồ đều thuộc giáo dục đại học\.$/, () => s.o.every((x) => s.chuThich[x.fill] === "Giáo dục đại học")]
    ]); } },
  { id: C.de1, has: "nhận bằng thạc sĩ vào năm nào", right: (q) => {
    const [, nam, dh] = q.q.match(/trung học phổ thông năm (\d{4}), học ngay đại học trong (\d) năm/).map(Number), ts = GD_NAM["thạc sĩ"][0];
    assert.ok(dh >= GD_NAM["đại học"][0] && dh <= GD_NAM["đại học"][1], "số năm học đại học nằm trong khung");
    assert.ok(/nhanh nhất/.test(q.q) && q.x.includes(`${nam} + ${dh} = ${nam + dh}`) && q.x.includes(`từ ${GD_NAM["thạc sĩ"][0]} đến ${GD_NAM["thạc sĩ"][1]} năm`) && q.x.includes(`${nam + dh} + ${ts} = ${nam + dh + ts}`), "lời giải ghi phép tính và thời gian đào tạo thạc sĩ");
    return nam + dh + ts; } },
  { id: C.de1, has: "các vị trí một khu công nghiệp đang tuyển", right: (q) => {
    const b = docBang(q.svg);
    assert.deepEqual(b.o[0], ["Vị trí", "Yêu cầu đào tạo", "Số chỗ"], "hàng đầu là tiêu đề");
    const hang = b.o.slice(1).map(([vt, yc, so]) => ({ vt, yc, so: val(so) }));
    const can = hang.filter((h) => h.yc !== "Không yêu cầu");
    assert.ok(can.length >= 2 && can.length < hang.length && can.every((h) => /^(Đã học nghề|Có bằng)/.test(h.yc)), "có vị trí cần và không cần đào tạo");
    assert.ok(q.unit === "chỗ" && q.x.includes(can.map((h) => h.so).join(" + ") + " = " + sum(can.map((h) => h.so))), "lời giải cộng đúng các vị trí cần đào tạo");
    can.forEach((h) => assert.ok(q.x.includes(`${h.vt.toLowerCase()} (${h.so} chỗ)`), "lời giải kể vị trí " + h.vt));
    return sum(can.map((h) => h.so)); } },
  { id: C.de1, has: "số tin tuyển dụng năm 2024 và năm 2026 của ba nghề", right: (q) => {
    const g = docCotGhep(q.svg);
    assert.deepEqual(g.chuThich, ["Năm 2024", "Năm 2026"], "chú thích hai năm");
    const ten = Object.fromEntries([...q.q.matchAll(/nghề ([A-C]) là ([^,:.]+)/g)].map((m) => [m[1], m[2]]));
    assert.deepEqual(g.nhom.map((n) => n.ten), Object.keys(ten).map((k) => "Nghề " + k), "tên nhóm trong hình khớp đề");
    const tang = g.nhom.map((n) => ({ ten: ten[n.ten.slice(-1)], d: n.b - n.a, b: n.b }));
    const max = tang.reduce((a, t) => (t.d > a.d ? t : a));
    assert.ok(tang.filter((t) => t.d === max.d).length === 1 && max.b === Math.max(...tang.map((t) => t.b)), "một nghề tăng mạnh nhất và nhiều tin nhất năm 2026");
    assert.ok(tang.some((t) => t.d < 0) && tang.some((t) => t.d > 0 && t !== max), "có nghề giảm, có nghề gần như không đổi");
    g.nhom.forEach((n) => assert.ok(q.x.includes(`${n.a} lên ${n.b}`) || q.x.includes(`${n.a} xuống ${n.b}`), "lời giải đọc đúng số của nghề " + n.ten));
    assert.deepEqual(q.o.slice(0, 3).map((o) => o.toLowerCase()).sort(), Object.values(ten).sort(), "ba lựa chọn đầu là ba nghề");
    return max.ten[0].toUpperCase() + max.ten.slice(1); } },
  { id: C.de2, has: "Khung trình độ quốc gia Việt Nam có bao nhiêu bậc", right: (q) => {
    assert.ok(q.unit === "bậc" && q.x.includes(`${KHUNG_TD.bac} bậc, ứng với ${KHUNG_TD.trinhDo} trình độ`), "lời giải ghi số bậc, số trình độ");
    return KHUNG_TD.bac; } },
  { id: C.de2, has: "nhận bằng tiến sĩ sớm nhất năm bao nhiêu tuổi", right: (q) => {
    const tuoi = +q.q.match(/nhận bằng thạc sĩ năm (\d+) tuổi/)[1], ts = GD_NAM["tiến sĩ"];
    assert.ok(/rồi học ngay lên tiến sĩ/.test(q.q) && /nhanh nhất/.test(q.q) && q.unit === "tuổi", "đề nói học tiến sĩ ngay sau thạc sĩ, xong nhanh nhất");
    assert.ok(q.x.includes(`từ ${ts[0]} đến ${ts[1]} năm`) && q.x.includes(`${tuoi} + ${ts[0]} = ${tuoi + ts[0]}`), "lời giải ghi thời gian đào tạo tiến sĩ và phép tính");
    return tuoi + ts[0]; } },
  { id: C.de2, has: "số người đăng kí dự tuyển và số chỗ cần tuyển", right: (q) => {
    const g = docCotGhep(q.svg);
    assert.deepEqual(g.chuThich, ["Số người đăng kí", "Số chỗ cần tuyển"], "chú thích hai dãy");
    const ten = Object.fromEntries([...q.q.matchAll(/([A-D]) là ([^,:.]+)/g)].map((m) => [m[2], g.nhom.find((n) => n.ten === "Nghề " + m[1])]));
    assert.equal(Object.keys(ten).length, g.nhom.length, "đề nói tên đủ các nghề trong hình");
    const thieu = (n) => n.a < n.b, ti = (n) => n.b / n.a;
    assert.ok(g.nhom.some(thieu) && g.nhom.some((n) => !thieu(n)), "có nghề thiếu người, có nghề thừa người");
    return luat(q, [
      [/^Cả bốn nghề đều thiếu người so với số chỗ cần tuyển\.$/, () => g.nhom.every(thieu)],
      [/^Ở nghề (.+), số người đăng kí nhiều hơn số chỗ cần tuyển\.$/, (m) => ten[m[1]].a > ten[m[1]].b],
      [/^Tính chung bốn nghề, số người đăng kí ít hơn số chỗ cần tuyển\.$/, () => sum(g.nhom.map((n) => n.a)) < sum(g.nhom.map((n) => n.b))],
      [/^Người đăng kí nghề (.+), (.+) có nhiều cơ hội được tuyển hơn người đăng kí nghề (.+)\.$/, (m) => ti(ten[m[1]]) > ti(ten[m[3]]) && ti(ten[m[2]]) > ti(ten[m[3]])]
    ]); } },
  { id: C.de2, has: "bao nhiêu phần trăm lao động của một tỉnh", right: (q) => {
    const c = docCot(q.svg), gt = c.map((x) => x.gt), nam = c.map((x) => +x.ten);
    nam.forEach((n, i) => i && assert.equal(n, nam[i - 1] + 1, "các năm liên tiếp"));
    const LUAT = [
      [/^Tỉ lệ tăng qua từng năm nhưng vẫn chưa đến một nửa$/, () => gt.every((v, i) => !i || v > gt[i - 1]) && Math.max(...gt) < 50],
      [/^Năm (\d{4}) đã có hơn một nửa số lao động qua đào tạo$/, (m) => gt[nam.indexOf(+m[1])] > 50],
      [/^Tỉ lệ giảm dần từ năm (\d{4}) đến năm (\d{4})$/, () => gt.every((v, i) => !i || v < gt[i - 1])],
      [/^Năm (\d{4}) có tỉ lệ cao nhất trong các năm$/, (m) => gt[nam.indexOf(+m[1])] === Math.max(...gt)]
    ];
    const dung = q.o.filter((o, i) => luat(q, LUAT)[i]);
    assert.equal(dung.length, 1, "chỉ một nhận xét đúng với biểu đồ");
    assert.ok(q.x.includes(`${gt[0]}% (năm ${nam[0]})`) && q.x.includes(`${gt[gt.length - 1]}% (năm ${nam[nam.length - 1]})`), "lời giải đọc đúng số năm đầu, năm cuối");
    return dung[0]; } },
  { id: C.de2, has: "so sánh hai nghề mà Hoa đều thích", right: (q) => {
    const b = docBang(q.svg);
    assert.deepEqual(b.o[0], ["Thông tin", "Nghề A", "Nghề B"], "hàng đầu là tiêu đề");
    const d = Object.fromEntries(b.o.slice(1).map(([k, a, bb]) => [k, { A: a, B: bb }]));
    assert.ok(/học tốt tiếng Anh/.test(q.q), "đề nói Hoa học tốt tiếng Anh");
    const hop = ["A", "B"].filter((n) => d["Nhu cầu tuyển dụng"][n] === "Đang tăng" && (d["Cần biết tiếng Anh"][n] === "Không" || /học tốt tiếng Anh/.test(q.q)));
    assert.equal(hop.length, 1, "chỉ một nghề vừa đang tăng nhu cầu vừa hợp với Hoa");
    assert.ok(d["Trường dạy gần nhà"].A === "Có" && d["Trường dạy gần nhà"].B === "Có" && /chỉ nghề A mới có trường dạy/.test(q.o.join(" | ")), "lựa chọn sai về trường dạy gần nhà trái với bảng");
    assert.ok(["A", "B"].some((n) => d["Nhu cầu tuyển dụng"][n] === "Đang tăng") && /cả hai nghề đều đang giảm/.test(q.o.join(" | ")), "lựa chọn sai “cả hai đều giảm” trái với bảng");
    const dung = q.o.filter((o) => new RegExp(`nghề ${hop[0]}\\b`).test(o) && !/^Chọn nghề|^Không chọn/.test(o));
    assert.equal(dung.length, 1, "chỉ một lựa chọn khuyên ưu tiên nghề " + hop[0]);
    return dung[0]; } },
  { id: C.de2, has: "tin tuyển dụng của năm nhóm ngành", right: (q) => {
    const c = docCot(q.svg);
    const nhom = Object.fromEntries([...q.q.matchAll(/([A-E]) là ([^;:.]+?)(?=; |\. )/g)].map((m) => [m[1], m[2]]));
    assert.deepEqual(c.map((x) => x.ten), Object.keys(nhom), "tên cột khớp đề");
    Object.values(nhom).forEach((t) => assert.ok(KT_CN.includes(t) || KHAC.includes(t), "nhóm ngành có trong bảng phân loại: " + t));
    const kt = c.filter((x) => KT_CN.includes(nhom[x.ten]));
    assert.ok(kt.length >= 2 && kt.length < c.length, "có nhóm thuộc và không thuộc lĩnh vực kĩ thuật, công nghệ");
    assert.ok(q.unit === "%" && q.x.includes(kt.map((x) => x.gt).join(" + ") + " = " + sum(kt.map((x) => x.gt)) + "%"), "lời giải cộng đúng các nhóm");
    return sum(kt.map((x) => x.gt)); } }
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
// bộ đọc hình bắt được hình cố ý vẽ sai: số ở đỉnh cột lệch chiều cao, chữ tràn ô bảng, mũi tên cắt ô, mũi tên một đầu đổi thành hai đầu
{
  const hinh = (has) => kho.find((q) => q.q.includes(has)).svg;
  const hong = (f, svg) => { try { f(svg); return false; } catch (e) { return true; } };
  const cot = hinh("phần trăm lao động của một tỉnh"), ghep = hinh("số người đăng kí dự tuyển"), bang = hinh("bốn lớp học bơi"), kh = hinh("Hình bên vẽ một phần khung");
  assert.ok(!hong(docCot, cot) && hong(docCot, cot.replace(">34<", ">36<")), "bộ đọc biểu đồ cột bắt được số lệch chiều cao");
  assert.ok(!hong(docCotGhep, ghep) && hong(docCotGhep, ghep.replace(">45<", ">40<")), "bộ đọc biểu đồ cột ghép bắt được số lệch chiều cao");
  assert.ok(!hong(docBang, bang) && hong(docBang, bang.replace(">450 000 đồng<", ">450 000 đồng mỗi tháng<")), "bộ đọc bảng bắt được chữ tràn ô");
  const thu = (f) => { try { f(); } catch (e) { return e.message; } return ""; }; // lỗi bộ đọc báo
  assert.ok(!hong(docKhung, kh), "bộ đọc sơ đồ đọc được hình đúng");
  assert.ok(/mũi tên không cắt ô nào/.test(thu(() => docKhung(kh.replace('x1="73.5" y1="150"', 'x1="73.5" y1="196"')))), "bộ đọc sơ đồ bắt được mũi tên cắt ô");
  assert.ok(/chữ vừa ô/.test(thu(() => docKhung(kh.replace(">nghiên cứu<", ">nghiên cứu khoa học cơ bản<")))), "bộ đọc sơ đồ bắt được chữ tràn ô");
  // thêm đầu mũi tên ở chân một mũi tên chuyển tiếp (đầu đoạn thẳng lùi lại 9 cho khớp đáy): thành mũi tên hai đầu
  const s = docKhung(kh.replace('x1="73.5" y1="150"', 'x1="73.5" y1="141"').replace("</svg>", '<polygon points="73.5,150 69,141 78,141" fill="ink"/></svg>'));
  assert.ok(s.doi.length === 3 && s.mui.length === 3, "bộ đọc sơ đồ nhận ra mũi tên hai đầu");
}

/* ---------- chữ, lời dặn ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || [], q.type === "fill" ? q.ans : [], q.unit || []).map(String);
kho.forEach((q) => chu(q).forEach((s) => {
  const at = q.src + ": " + q.q.slice(0, 50) + " → ";
  // dấu thanh kiểu cũ, “kĩ”, “lí” như hai cuốn sách
  assert.ok(!/(?<![\p{L}])(?:hóa|hòa|khỏe|tùy|thỏa|thủy|tỏa|hủy|họa|lũy|xóa|kỹ|lý|tỷ)(?![\p{L}])/iu.test(s), at + "viết như sách (hoá, hoà, khoẻ, tuỳ, thoả, huỷ, kĩ, lí, tỉ): " + s);
  // số ngăn hàng nghìn bằng khoảng trắng (năm viết liền), dấu phẩy thập phân
  assert.ok(!/\d{5,}|\d\.\d/.test(s) && [...s.matchAll(/(?<!\d)\d{4}(?!\d)/g)].every((m) => /^(19|20)\d\d$/.test(m[0])), at + "số viết sai cách: " + s);
  // lời giải không nói “ý thứ hai”, “phương án A”: app xáo phương án
  assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(s), at + "nhắc vị trí của phương án: " + s);
  // Tin học: không ghi số hiệu, năm ban hành của luật, nghị định (văn bản có thể đã được thay sau khi sách in)
  if (deCua(q) === T) assert.ok(!/Nghị định|NĐ-CP|\/QH\d|Luật [^,.;]*\d{4}/.test(s), at + "không ghi số hiệu, năm của văn bản pháp luật: " + s);
  // Công nghệ: tên cơ quan như sách in năm 2026 (không còn Bộ Lao động – Thương binh và Xã hội, Tổng cục Thống kê, Tổng cục Dạy nghề)
  if (deCua(q) === C) assert.ok(!/Thương binh và Xã hội|LĐTBXH|LĐ-TB|Tổng cục|molisa/.test(s), at + "tên cơ quan sách in năm 2026 đã bỏ: " + s);
  // nhân vật của sách Tin học 9 (An, Minh, Khoa) không dùng làm tên trong đề
  assert.ok(!/(?<![\p{L}])(?:An|Minh|Khoa)(?![\p{L}])(?! học)/u.test(s), at + "tên nhân vật của sách: " + s);
  // giữa kì: không có đơn vị hành chính cũ
  assert.ok(!/(?<![\p{L}])huyện(?![\p{L}])|63 tỉnh/iu.test(s), at + "đơn vị hành chính cũ: " + s);
}));
MON.forEach((S) => {
  const nt = bank(S.de1).note;
  assert.equal(bank(S.de2).note, nt, S.m + ": hai đề cùng lời dặn");
  assert.ok(nt.startsWith(`Sách Kết nối tri thức, ${S.ten} 9`) && /giữa học kì I:/.test(nt) && nt.endsWith("Có lời giải từng câu."), S.m + ": lời dặn ghi sách, kì, lời giải");
  assert.ok(!/Sở GD&ĐT|đề chung/.test(nt), S.m + ": đề giữa kì không có câu về đề chung của Sở");
  S.chuDe.forEach(([, n, ten]) => assert.ok(nt.includes(`Bài ${n} ${ten}`), S.m + ": lời dặn ghi Bài " + n + " " + ten));
  assert.ok(nt.includes("10 câu Biết, 8 câu Hiểu, 7 câu Vận dụng") && /đối chiếu (với )?đề cương của trường/.test(nt), S.m + ": lời dặn ghi số câu từng mức, nhắc đề cương");
});
assert.ok(/Bài 3 Thực hành: Đánh giá chất lượng thông tin/.test(bank(T.de1).note) && /không có phần thực hành trên máy/.test(bank(T.de1).note) && !/Bài 5/.test(bank(T.de1).note), "Tin học: lời dặn ghi bài thực hành, dừng ở Bài 4");
assert.ok(/mô đun tự chọn/.test(bank(C.de1).note) && !/Bài 4/.test(bank(C.de1).note), "Công nghệ: lời dặn nhắc mô đun tự chọn, dừng ở Bài 3");

/* ---------- dạng câu, mức độ, ma trận, rút thử ---------- */
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
const chuThuong = (s) => String(s).normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean); // các chữ, giữ dấu
const tuDon = (s) => new Set(String(s).toLowerCase().split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 1)); // các tiếng của một ô (như tests/lsdl4-ck2.js)
MON.forEach((S) => {
  const p = bank(S.pool), M = p.pool.matrix, cells = Object.values(M), K = S.kho, d1 = bank(S.de1).questions, d2 = bank(S.de2).questions;
  assert.ok(K.every((q) => ["mc", "tf4", "num", "fill", "match", "order"].includes(q.type)), S.pool + ": chỉ dùng nhiều lựa chọn, đúng/sai 4 ý, trả lời ngắn, nối cột, sắp xếp; không có tự luận");
  assert.ok(K.every((q) => [1, 2, 3].includes(q.lv)), S.pool + ": câu nào trong kho cũng cần lv");
  assert.ok(cells.every(Array.isArray), S.pool + ": ma trận ghi theo [Biết, Hiểu, Vận dụng]");
  assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], S.pool + ": ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
  assert.equal(sum(cells.map(sum)), p.n, S.pool + ": tổng ma trận bằng n");
  assert.deepEqual(Object.keys(M), S.chuDe.map((c) => c[0]), S.pool + ": chủ đề theo thứ tự bài của sách");
  // chữ chủ đề như kho cuối kì I cùng môn (đề “Ôn chủ đề” rút chung câu cùng chủ đề)
  Object.keys(M).forEach((t) => assert.ok(bank(S.cu).questions.some((q) => q.topic === t), `${S.pool}: chủ đề “${t}” không có ở kho cuối kì I`));
  [d1, d2].forEach((d, i) => {
    assert.deepEqual([...new Set(d.map((q) => q.topic))], Object.keys(M), `${S.pool}: Đề ${i + 1} đủ chủ đề, theo thứ tự của ma trận`);
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `Đề ${i + 1} của ${S.pool} đúng ma trận ở chủ đề ${t}`));
    assert.ok(d.filter((q) => q.type === "tf4").length >= 2 && d.some((q) => ["num", "fill"].includes(q.type)), `Đề ${i + 1} của ${S.pool}: có câu đúng/sai 4 ý và câu trả lời ngắn như khung Công văn 7991`);
  });
  const tf4 = K.filter((q) => q.type === "tf4"), kieu = {};
  assert.ok(tf4.length >= 4, S.pool + ": mỗi kho ít nhất 4 câu đúng/sai 4 ý");
  tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(q.o.length === 4 && /Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
  assert.equal(Math.max(...Object.values(kieu)), 1, S.pool + ": kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
  // nối cột (như tests/lsdl4-ck2.js): một ô thừa, ô bên phải không trùng nhau, cặp nối không có chữ chung (không nối được nhờ chữ trùng)
  K.filter((q) => q.type === "match").forEach((q) => {
    assert.ok(new Set(q.r).size === q.r.length && q.r.length === q.l.length + 1, "nối cột có một ô thừa, ô bên phải không trùng nhau: " + q.q.slice(0, 60));
    q.l.forEach((l, i) => { const chung = [...tuDon(l)].filter((w) => tuDon(q.r[i]).has(w)); assert.deepEqual(chung, [], `cặp nối “${l} → ${q.r[i]}” có chữ trùng`); });
  });
  K.filter((q) => q.type === "order").forEach((q) => assert.ok(q.o.length >= 3 && new Set(q.o).size === q.o.length, "câu sắp xếp có ít nhất 3 ô khác nhau: " + q.q.slice(0, 50)));
  const mc = K.filter((q) => q.type === "mc");
  mc.forEach((q) => {
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
  // đáp án đúng không hay là lựa chọn dài nhất hay ngắn nhất (Rút ra N9-ck1-tin-congnghe): mỗi kiểu không quá một phần ba số câu nhiều lựa chọn
  {
    const hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length)), dai = mc.filter((q) => hon(q, (a, b) => a > b)), ngan = mc.filter((q) => hon(q, (a, b) => a < b));
    assert.ok(dai.length <= mc.length / 3, `${S.pool}: đáp án đúng là lựa chọn dài nhất ở ${dai.length}/${mc.length} câu nhiều lựa chọn`);
    assert.ok(ngan.length <= mc.length / 3, `${S.pool}: đáp án đúng là lựa chọn ngắn nhất ở ${ngan.length}/${mc.length} câu nhiều lựa chọn`);
    console.log(`${S.ten}: đáp án đúng dài nhất ${dai.length}/${mc.length}, ngắn nhất ${ngan.length}/${mc.length} câu nhiều lựa chọn.`);
  }
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

/* ---------- câu của các kho cũ cùng file (cuối kì I, giữa kì II, cuối năm): đề “Ôn chủ đề” rút chung câu cùng chủ đề ---------- */
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const cuCung = (S) => { const cua = new Set([S.de1, S.de2, S.pool]); return BANKS.filter((b) => b.file === S.file && !cua.has(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => Object.assign({ at: b.id + "#" + (i + 1) }, q))); };
const daAn = (q) => (q.type === "mc" ? q.o[0] : q.type === "fill" ? q.ans[0] : q.type === "num" ? String(q.ans) : null);
MON.forEach((S) => {
  const cu = cuCung(S);
  assert.ok(cu.some((c) => c.at.startsWith(S.cu.replace(/ngau-nhien$/, ""))), S.pool + ": có kho cuối kì I để so");
  S.kho.forEach((q) => cu.filter((c) => c.topic === q.topic).forEach((c) => {
    assert.notEqual(goc(q.q), goc(c.q), `${q.src}: đề bài trùng câu ${c.at}`);
    const a = daAn(q), b2 = daAn(c);
    if (a !== null && b2 !== null) assert.notEqual(goc(a), goc(b2), `${q.src} trùng đáp án “${a}” với ${c.at}`);
  }));
});

/* ---------- đề bài không trùng câu nào khác trong file (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng; không gần trùng câu
   của các kho cũ cùng môn (Rút ra N25): đề bài cùng các lựa chọn, ô nối, ô sắp xếp có từ một nửa số cặp hai âm tiết liền nhau
   (tính trên câu ít cặp hơn, bỏ các cặp có ở mọi câu như “nào dưới đây” và cặp của nhãn chủ đề) chung với một câu cũ thì báo ---------- */
const CHUNG = new Set(["nào dưới", "dưới đây", "đây là", "là một", "mỗi ý", "ý sau", "sau đúng", "đúng hay", "hay sai", "ở hình", "nào sau", "sau đây", "theo bài", "bài học"]);
const cap2 = (s) => { const w = String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x); };
const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !CHUNG.has(c) && !nhan.has(c))); };
MON.forEach((S) => {
  const cua = new Set([S.de1, S.de2, S.pool]);
  const file = BANKS.filter((b) => b.file === S.file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => goc(q.q)));
  S.kho.forEach((q) => assert.equal(file.filter((k) => k === goc(q.q)).length, 1, "đề bài trùng câu khác trong file: " + q.q.slice(0, 50)));
  const cu = BANKS.filter((b) => !cua.has(b.id) && (b.subject === S.ten || (S.m === "tin" && /^tincn/.test(b.id)))).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), c: capAm(q) })));
  S.kho.forEach((q) => { const c = capAm(q); cu.forEach((e) => {
    const chung = [...c].filter((x) => e.c.has(x)).length;
    assert.ok(chung / Math.min(c.size, e.c.size) < 0.5, `gần trùng câu của kho cũ ${e.at}: ${q.src} “${q.q.slice(0, 50)}”`);
  }); });
});

/* ---------- dò lộ đáp án (Rút ra N5, N19; bộ dò của tests/tin-congnghe9-ck1.js) giữa mọi cặp câu của kho (đề “Ôn chủ đề” rút chung cả
   chủ đề, đề ngẫu nhiên rút chung các chủ đề) và giữa câu cùng chủ đề của kho này với các kho cũ cùng file. Đáp án là số (từ hai chữ số,
   hoặc số thập phân) chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”, “bằng”, “được”); cặp nối: câu kia có cả hai vế; ô sắp xếp:
   câu kia có cả hai ô liền nhau theo đúng thứ tự. Đáp án bằng chữ (lựa chọn đúng, đáp án câu điền) tách thành các chuỗi 3 từ liền nhau
   (đáp án từ 3 từ trở xuống thì lấy cả đáp án); chuỗi có trong đề bài, lựa chọn, ô nối, lời giải của câu kia thì in ra với DO_LO=1 để
   xem tay, danh sách đã xem ở DA_XEM. ---------- */
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
const tu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum = (s) => { const w = tu(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const coCum = (t, s) => (" " + tu(t).join(" ") + " ").includes(" " + tu(s).join(" ") + " ");
const ten = new Map();
MON.forEach((S) => [S.de1, S.de2].forEach((id) => S.kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace(/9-gk1-/, "-") + "#" + (i + 1)))));
// chuỗi 3 từ là từ ngữ chung của bài học (bộ xử lí, vi phạm pháp luật, người lao động, trung học phổ thông…) hay cụm từ thường gặp
// (đáng tin cậy, kiểm tra lại, trước khi dùng…): có ở nhiều câu, không cho biết đáp án của câu nào nên không in ra
const CUM_CHUNG = new Set(["bộ xử lí", "có gắn bộ", "gắn bộ xử", "thiết bị có", "bị có gắn", "xử lí thông", "lí thông tin", "vi phạm pháp", "phạm pháp luật",
  "không vi phạm", "là vi phạm", "pháp luật về", "đáng tin cậy", "kiểm tra lại", "nguồn chính thức", "chính thức của", "nội dung của", "tài khoản của",
  "của người khác", "thông tin trên", "có thể đã", "khi không được", "rồi mới quyết", "mới quyết định", "trước khi dùng", "chính xác",
  "kĩ thuật công", "thuật công nghệ", "người lao động", "lao động của", "lao động được", "lao động tăng", "lao động cần", "lao động theo", "sức lao động",
  "cung lao động", "cầu lao động", "nguồn cung lao", "nhu cầu tuyển", "theo nhu cầu", "trung học phổ", "học phổ thông", "trung học cơ", "học cơ sở",
  "học trung học", "qua đào tạo", "đào tạo nghề", "nơi đào tạo", "tin tuyển dụng", "của xã hội", "với công việc", "công việc được", "có kĩ năng",
  "những kĩ năng", "lập kế hoạch", "có bộ xử", "bị có bộ", "các thiết bị", "của các thiết", "thiết bị số"]);
const doLo = (qs, tenCau, cungLuc) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    const so = q.type === "num" && (q.ans >= 10 || !Number.isInteger(q.ans)) ? [q.ans] : [];
    const C3 = q.type === "mc" ? [...new Set(cum(q.o[0]))] : q.type === "fill" ? [...new Set(cum(q.ans[0]))] : [];
    const cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [], lien = q.type === "order" ? q.o.slice(1).map((o, k) => [q.o[k], o]) : [];
    qs.forEach((p) => {
      if (p === q || !cungLuc(p, q)) return;
      const Cp = chu(p).concat(p.svg ? [texts(p.svg).map((t) => t.t).join(" | ")] : []), at = `${tenCau(p)} → ${tenCau(q)}: `, Tp = " " + Cp.map((s) => tu(s).join(" ")).join(" | ") + " "; // cả chữ trong hình
      so.filter((x) => Cp.flatMap(soKQ).some((y) => close(x, y))).forEach((x) => lo.push(at + x));
      cap.filter(([l, r]) => Cp.some((t) => coCum(t, l) && coCum(t, r))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      lien.filter(([a, b]) => Cp.some((t) => { const x = t.toLowerCase().indexOf(a.toLowerCase()), y = t.toLowerCase().indexOf(b.toLowerCase()); return x >= 0 && y > x; })).forEach(([a, b]) => lo.push(at + a + " → " + b));
      C3.filter((c) => !CUM_CHUNG.has(c) && Tp.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
const loAll = [], chuAll = [];
MON.forEach((S) => {
  // mọi cặp câu của kho
  const r = doLo(S.kho, (q) => ten.get(q), () => true); loAll.push(...r.lo); chuAll.push(...r.chuLo);
  // câu cùng chủ đề của kho này với các kho cũ cùng file (chỉ cặp khác kho)
  const cu = cuCung(S);
  cu.forEach((c) => ten.set(c, c.at.replace(/9-(ck1|gk2|ck2)-/, "-$1-")));
  Object.keys(bank(S.pool).pool.matrix).forEach((t) => {
    const qs = S.kho.filter((q) => q.topic === t).concat(cu.filter((c) => c.topic === t));
    const r2 = doLo(qs, (q) => ten.get(q), (p, q) => S.kho.includes(p) !== S.kho.includes(q)); loAll.push(...r2.lo); chuAll.push(...r2.chuLo);
  });
});
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuAll.join("\n"));
// đã xem (Phiên N9-gk1-tin-congnghe): tên trình độ, thời gian đào tạo ở lựa chọn sai của câu khác (đại học, từ 2 đến 3 năm, từ 3 đến 5 năm,
// trung cấp nghề), tên ngành, tên nghề, tên nguồn tin (công nghệ kĩ thuật, sửa chữa máy, bài giới thiệu, các doanh nghiệp, trường đào tạo), khả năng của
// máy tính ở lựa chọn sai của câu kho cuối kì I (kết nối toàn cầu, tốc độ cao), từ thường gặp (địa chỉ nhà, người khác khi, đang thiếu
// người, nhu cầu thợ, khoa học, công nghệ, sự phát triển của, giáo dục thường xuyên, nghề đang cần), chữ trùng ngẫu nhiên (“phù hợp,
// công việc”, “quá trình làm việc”, “thông tin tuyển sinh”, “hợp lí có thể”): không câu nào cho biết đáp án của câu kia.
const DA_XEM = [
  "tin-de1#20 → tin-de2#13: bài giới thiệu", "tin-de2#16 → tin-de2#13: bài giới thiệu", "tin-de2#20 → tin-de2#14: lí có thể",
  "tin-ck1-de1#2 → tin-de1#3: kết nối toàn", "tin-ck1-de1#2 → tin-de1#3: nối toàn cầu", "tin-ck1-de1#2 → tin-de1#3: toàn cầu tốc",
  "tin-ck1-de1#2 → tin-de1#3: cầu tốc độ", "tin-ck1-de1#2 → tin-de1#3: tốc độ cao", "tin-ck1-de1#7 → tin-de2#13: bài giới thiệu",
  "tin-de1#19 → tin-ck1-de1#12: người khác khi", "tin-de1#25 → tin-ck1-de1#12: địa chỉ nhà", "tin-de2#22 → tin-ck1-de1#12: người khác khi",
  "tin-de2#25 → tin-ck1-de1#12: địa chỉ nhà", "congnghe-de1#2 → congnghe-de1#1: hợp công việc", "congnghe-de2#8 → congnghe-de1#9: từ 3 đến",
  "congnghe-de2#8 → congnghe-de1#9: 3 đến 5", "congnghe-de2#8 → congnghe-de1#9: đến 5 năm", "congnghe-de2#13 → congnghe-de1#9: từ 3 đến",
  "congnghe-de1#17 → congnghe-de1#13: trường đào tạo", "congnghe-de1#25 → congnghe-de1#17: các doanh nghiệp", "congnghe-de1#22 → congnghe-de2#1: nghề đang cần",
  "congnghe-de1#13 → congnghe-de2#6: học nghề sửa", "congnghe-de2#6 → congnghe-de2#7: sửa chữa máy", "congnghe-de1#9 → congnghe-de2#8: từ 2 đến",
  "congnghe-de1#9 → congnghe-de2#8: 2 đến 3", "congnghe-de1#9 → congnghe-de2#8: đến 3 năm",
  "congnghe-de1#9 → congnghe-de2#12: đại học", "congnghe-de1#10 → congnghe-de2#12: đại học",
  "congnghe-de1#11 → congnghe-de2#12: đại học", "congnghe-de1#12 → congnghe-de2#12: đại học", "congnghe-de1#13 → congnghe-de2#12: đại học",
  "congnghe-de1#14 → congnghe-de2#12: đại học", "congnghe-de2#1 → congnghe-de2#12: đại học", "congnghe-de1#23 → congnghe-de2#21: đang thiếu người",
  "congnghe-de1#24 → congnghe-de2#21: đang thiếu người", "congnghe-de1#18 → congnghe-de2#25: nhu cầu thợ", "congnghe-de2#5 → congnghe-ck1-de2#3: trình làm việc",
  "congnghe-ck1-de2#9 → congnghe-de1#8: giáo dục thường", "congnghe-ck1-de2#9 → congnghe-de1#8: dục thường xuyên", "congnghe-ck1-de1#9 → congnghe-de2#8: từ 2 đến",
  "congnghe-ck1-de1#9 → congnghe-de2#8: 2 đến 3", "congnghe-ck1-de1#9 → congnghe-de2#8: đến 3 năm", "congnghe-ck1-de1#8 → congnghe-de2#12: đại học",
  "congnghe-ck1-de1#10 → congnghe-de2#12: đại học", "congnghe-ck1-de2#8 → congnghe-de2#12: đại học", "congnghe-ck1-de2#9 → congnghe-de2#12: đại học",
  "congnghe-de1#10 → congnghe-ck1-de1#10: trung cấp nghề", "congnghe-de2#8 → congnghe-ck1-de1#10: học trung cấp", "congnghe-de1#8 → congnghe-ck1-de2#9: giáo dục thường",
  "congnghe-de1#8 → congnghe-ck1-de2#9: dục thường xuyên", "congnghe-ck1-de2#11 → congnghe-de1#17: thông tin tuyển", "congnghe-ck1-de2#14 → congnghe-de1#17: doanh nghiệp đăng",
  "congnghe-de2#16 → congnghe-ck1-de1#13: sự phát triển", "congnghe-de2#16 → congnghe-ck1-de1#13: phát triển của", "congnghe-de2#20 → congnghe-ck1-de1#13: khoa học công",
  "congnghe-de2#20 → congnghe-ck1-de1#13: học công nghệ"
];
assert.deepEqual(chuAll, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loAll, [], "lộ đáp án:\n" + loAll.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 35”, cả hai vế một cặp nối, hai ô sắp xếp liền nhau, cụm của đáp án
// trắc nghiệm
{
  const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x }), khac = tim("trình độ đại học được đào tạo");
  const thuLo = (qs) => { const r = doLo(qs, (q) => q.q.slice(0, 12), () => true); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  assert.deepEqual(thuLo([tim("các vị trí một khu công nghiệp đang tuyển"), khac]), [], "câu không sửa thì không báo");
  assert.ok(thuLo([tim("các vị trí một khu công nghiệp đang tuyển"), gia(khac, "Ví dụ 20 + 15 = 35 chỗ.")]).includes("35"));
  assert.ok(thuLo([tim("với lĩnh vực mà thiết bị đó"), gia(khac, "Máy rút tiền tự động đặt ở ngân hàng thuộc dịch vụ tài chính.")]).includes("Máy rút tiền tự động đặt ở ngân hàng → Dịch vụ tài chính"));
  const sx = tim("Máy giặt nhà Hoà");
  assert.ok(thuLo([sx, gia(khac, sx.o[1] + ", rồi " + sx.o[2].toLowerCase() + ".")]).includes(sx.o[1] + " → " + sx.o[2]));
  assert.ok(thuLo([tim("thiếu thợ hàn"), gia(khac, "Thị trường điều tiết giá cả sức lao động.")]).includes("điều tiết giá"));
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book; trùng ý với các kho khác (Rút ra N21) ----------
   Cụm từ chung của môn (tên bài, tên chủ đề, tên chương, tên cơ quan, tên ngành, tên trình độ như sách) thay bằng dấu ngăn trước khi so;
   chuỗi so phải có ít nhất 5 từ có chữ. */
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần (các vòng lặp lồng nhau gọi lại trên cùng chữ; kết quả như cũ)
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
const khongDau = nhoChuoi((s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim());
const TU_CHUNG = MON.flatMap((S) => S.chuDe.flatMap((c) => [c[0], c[2]])).concat(["Máy tính và cộng đồng", "Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
  "Đạo đức, pháp luật và văn hoá trong môi trường số", "Thực hành: Đánh giá chất lượng thông tin", "Sở Giáo dục và Đào tạo", "lĩnh vực kĩ thuật, công nghệ",
  "lĩnh vực kĩ thuật và công nghệ", "khung cơ cấu hệ thống giáo dục quốc dân", "cơ quan quản lí lao động và việc làm", "cơ quan quản lí giáo dục nghề nghiệp",
  "Khung trình độ quốc gia Việt Nam", "quản trị cơ sở dữ liệu và mạng máy tính", "Định hướng nghề nghiệp", "Mỗi ý sau đúng hay sai",
  "công nghệ kĩ thuật vật liệu xây dựng", "kĩ thuật điều khiển và tự động hoá", "công nghệ kĩ thuật cơ khí", "công nghệ chế tạo máy",
  "nhu cầu sản xuất, tiêu dùng hàng hoá"])
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const boChuoi = (ds, k) => { const out = new Map(); ds.forEach(([id, s]) => { const w = khongDau(s).split(" ").filter(Boolean); for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k).join(" "); if (!out.has(c)) out.set(c, new Set()); out.get(c).add(id); } }); return out; };
const bao = (bo, k) => [...new Set(kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].filter((c) => bo.has(c)).map((c) => `${ten.get(q)} ~ ${[...bo.get(c)].join(", ")}: ${c}`)))];
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
if (SACH.length) {
  assert.ok(["tin-hoc-9", "cong-nghe-9-dinh-huong-nghe-nghiep"].every((c) => SACH.some((f) => f.includes(path.join("lop-9", c)))), "OnUp-Book có Tin học 9, Công nghệ 9 – Định hướng nghề nghiệp");
  const ds = SACH.map((f) => [path.basename(path.dirname(f)), fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")]);
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + bao(boChuoi(ds, 6), 6).join("\n"));
  const s8 = bao(boChuoi(ds, 8), 8);
  assert.deepEqual(s8, [], "chuỗi 8 từ trùng chữ của sách:\n" + s8.join("\n"));
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
{
  const cua = new Set(MON.flatMap((S) => [S.de1, S.de2, S.pool]));
  const ds = BANKS.filter((b) => !cua.has(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => [b.id, chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).join(" | ")]));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + bao(boChuoi(ds, 5), 5).join("\n"));
  const k8 = bao(boChuoi(ds, 8), 8);
  assert.deepEqual(k8, [], "chuỗi 8 từ trùng câu của kho khác:\n" + k8.join("\n"));
}
console.log(CHECKS.length + " câu đã tính lại hoặc đọc lại hình; " + MON.map((S) => `${S.ten}: kho ${S.kho.length} câu, ma trận 10 – 8 – 7 trên ${S.chuDe.length} chủ đề`).join("; ") + ".");
console.log("MATH OK");
