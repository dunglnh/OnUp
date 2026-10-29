// Kiểm tra hai ngân hàng lớp 9 giữa kì II của Phiên N9-gk2-tin-congnghe: Tin học (data/banks/9-tin.js, Chủ đề 4 phần a. Sử dụng bảng
// tính điện tử nâng cao, Bài 9a–13a) và Công nghệ (data/banks/9-congnghe.js, mô đun Lắp đặt mạng điện trong nhà, Bài 1–4), theo mẫu
// tests/tin-congnghe9-ck1.js. Mỗi ngân hàng = Đề 1 + Đề 2 (cùng chia đúng ma trận) + đề ngẫu nhiên không có câu riêng; mã đề, số câu
// lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7 như mọi kho lớp 9.
// Câu có phép tính, có công thức hoặc có hình được nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong hai kho, đúng đề ghi ở id);
// đáp án tính bằng code (so với ans, o[0], a của câu đúng/sai 4 ý, cặp nối). Tin học: đọc lại trang tính trong hình (hàng tên cột A, B…,
// cột số hàng, ô chữ căn trái, ô số căn phải, chữ vừa ô) và biểu đồ cột hai dãy thu, chi (lưới, nhãn trục, số ở đỉnh cột khớp chiều cao,
// chú thích màu); tính lại công thức ghi trong đề bằng một bộ tính nhỏ (COUNTIF, SUMIF, IF lồng nhau, SUM, so sánh, phần trăm, điều kiện
// dạng ">=30", "<5", "Bánh*", địa chỉ ô) và sao chép công thức (địa chỉ tương đối đổi theo, địa chỉ có dấu $ giữ nguyên); thiết lập của
// công cụ xác thực dữ liệu (Whole number, Decimal; between, greater than, less than) được thử với nhiều giá trị: chỉ đáp án đúng khớp yêu
// cầu của đề. Công nghệ: đọc lại sơ đồ nguyên lí vẽ theo kí hiệu của Bảng 3.1 (dây ngang hoặc dọc, chấm tròn ở đúng chỗ nối từ ba dây,
// không có dây bỏ lửng hay chéo nhau, nguồn A và O, cầu chì, công tắc vẽ ở trạng thái ngắt, ổ lấy điện, bóng đèn, số của thiết bị, điểm
// đánh dấu) rồi xét thiết bị nào có điện khi đóng, ngắt công tắc, khi cầu chì đứt, khi nối thêm ổ lấy điện vào hai điểm; mắc nối tiếp,
// song song; thiết bị vẽ bên phải bóng đèn; hình kí hiệu (quạt trần, công tơ điện, oát kế); dòng điện tính toán (công suất chia cho điện
// áp), dòng điện định mức khoảng 130% (chọn loại lớn hơn và gần nhất), thang đo lớn hơn nhưng gần giá trị cần đo nhất. Câu trả lời bằng số
// và câu có hình nào cũng phải có kiểm tra ở đây.
// Rồi: chữ (dấu thanh kiểu cũ như sách: “hoá”, “khoẻ”, “tuỳ”, “thoả”, “kĩ”, “lí”; số ngăn hàng nghìn bằng khoảng trắng, số trong công thức
// nhỏ hơn 1 000; không nhắc vị trí của phương án; không dùng tên nhân vật của sách Tin học 9), lời dặn của đề (các bài theo mục lục, Tin học
// nhắc phần b, Công nghệ nhắc mô đun khác; đề giữa kì không có câu về đề chung của Sở), dạng câu (khung Công văn 7991: mỗi kho ít nhất 4 câu
// đúng/sai 4 ý, không lặp kiểu Đ/S; mỗi đề cố định có câu đúng/sai 4 ý và câu trả lời ngắn; câu nối có ô thừa), mức độ và ma trận (chủ đề
// theo thứ tự bài), đáp án đúng không dài hơn hẳn lựa chọn sai, là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa
// chọn (Rút ra N9-ck1-lsdl-gdcd), không là lựa chọn duy nhất có chữ của nhãn chủ đề, ba lựa chọn sai không cùng mở đầu một chữ; rút thử
// nhiều lần (đúng ma trận, gặp đủ câu của kho; đã làm hết một đề cố định thì rút toàn câu của đề kia); đề bài không trùng câu nào trong
// file, không gần trùng câu của các kho cũ cùng môn; dò lộ đáp án giữa các câu rút được cùng lúc (số ở vị trí kết quả, cả hai vế một cặp
// nối, hai ô sắp xếp liền nhau: không được có; chuỗi 3 từ của đáp án bằng chữ in ra với DO_LO=1 để xem tay, đã xem ghi ở DA_XEM). Có sách ở
// ../OnUp-Book (repo riêng tư) thì so mọi trường chữ với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp nguyên âm (không chuỗi 8 từ nào trùng;
// DO_SACH=1 in chuỗi 6 từ) và với câu của mọi kho khác, cả câu riêng của các đề ngẫu nhiên (không chuỗi 8 từ nào trùng; DO_KHO=1 in
// chuỗi 5 từ). Bộ đọc hình, bộ tính công thức và bộ dò lộ tự thử với hình, công thức, câu cố ý viết sai.
// Chạy: node tests/tin-congnghe9-gk2.js → in MATH OK.
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
  ["tin", "Tin học", "9-tin.js", [["Công cụ xác thực dữ liệu", "9a", "Sử dụng công cụ xác thực dữ liệu"], ["Hàm COUNTIF", "10a", "Sử dụng hàm COUNTIF"],
    ["Hàm SUMIF", "11a", "Sử dụng hàm SUMIF"], ["Hàm IF", "12a", "Sử dụng hàm IF"],
    ["Hoàn thiện bảng tính quản lí tài chính gia đình", "13a", "Hoàn thiện bảng tính quản lí tài chính gia đình"]]],
  ["congnghe", "Công nghệ", "9-congnghe.js", [["Thiết bị đóng cắt và lấy điện trong gia đình", "1", "Thiết bị đóng cắt và lấy điện trong gia đình"],
    ["Dụng cụ đo điện cơ bản", "2", "Dụng cụ đo điện cơ bản"], ["Thiết kế mạng điện trong nhà", "3", "Thiết kế mạng điện trong nhà"],
    ["Vật liệu, thiết bị và dụng cụ lắp đặt mạng điện", "4", "Vật liệu, thiết bị và dụng cụ dùng cho lắp đặt mạng điện trong nhà"]]]
].map(([m, ten, file, chuDe]) => {
  const re = new RegExp(`^${m}9-gk2-`), p = BANKS.find((b) => b.pool && re.test(b.id));
  assert.ok(p, `thiếu đề ngẫu nhiên ${m}9-gk2`);
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
{ // kì thi giữa học kì II lớp 9 gắn đủ sáu mã
  const ctxL = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ctxL);
  const ev = ctxL.window.ONTAP_SEED_EVENTS.find((e) => e.id === "gk2-l9");
  MON.forEach((S) => [S.de1, S.de2, S.pool].forEach((id) => assert.ok(ev.banks.includes(id), "gk2-l9 chưa gắn " + id)));
  assert.ok(/Tin học: Bài 9a–13a/.test(ev.scope) && /Công nghệ: Lắp đặt mạng điện trong nhà, Bài 1–4/.test(ev.scope), "phạm vi của gk2-l9 ghi Tin học, Công nghệ");
}

/* ---------- số ---------- */
const close = (x, y, e = 1e-9) => Math.abs(x - y) < e;
const sum = (a) => a.reduce((s, v) => s + v, 0);
const val = (s) => +String(s).replace(/\s/g, "").replace(/−/g, "-").replace(",", "."); // "1 540" → 1540, "1,4" → 1.4
const tron = (x, k) => Math.round(x * 10 ** k) / 10 ** k;
const vn = (x) => { const [a, b] = String(tron(x, 6)).split("."); return a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); }; // 1540 → "1 540", 1.4 → "1,4"
const SO = "(\\d{1,3}(?: \\d{3})*(?:,\\d+)?)"; // số viết như trong đề

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const daDoc = new Set(); // hình đã đọc lại bằng code
const coChu = (t) => assert.ok(+t["font-size"] >= 13, "chữ trong hình từ 13 trở lên: " + t.t);
const rong = (t) => (t["font-weight"] === "700" ? 0.62 : 0.55) * +t["font-size"] * [...t.t].length; // ước bề rộng dòng chữ (Noto Sans)
const svgRong = (svg) => +attrs(svg.slice(0, svg.indexOf(">") + 1)).viewBox.split(" ")[2];

/* Trang tính: đường kẻ mảnh tô line, nằm ngang hoặc dọc, kẻ hết bảng; hàng đầu (tên cột A, B…) và cột đầu (số hàng 1, 2…) tô nền bg, chữ
   màu muted ở giữa ô; mỗi ô dữ liệu nhiều nhất một chữ: chữ căn trái cách lề 5, số căn phải cách lề 5 (text-anchor end), chữ vừa ô; hàng 1
   là tiêu đề chữ đậm. Trả về { o: { "A1": "Họ tên", "B2": 9, … } } (ô số đọc thành số; “20%” thành 0,2). */
const docTrang = (svg) => {
  daDoc.add(svg);
  assert.ok(svgRong(svg) <= 320, "trang tính rộng không quá 320");
  const L = tags(svg, "line"), TX = texts(svg), R = tags(svg, "rect");
  assert.ok(L.every((l) => l.stroke === "line" && l["stroke-width"] === "1"), "trang tính: đường kẻ mảnh tô line");
  const ngang = L.filter((l) => num(l, "y1") === num(l, "y2")), doc = L.filter((l) => num(l, "x1") === num(l, "x2"));
  assert.equal(ngang.length + doc.length, L.length, "trang tính: đường kẻ nằm ngang hoặc thẳng đứng");
  const ys = ngang.map((l) => num(l, "y1")).sort((a, b) => a - b), xs = doc.map((l) => num(l, "x1")).sort((a, b) => a - b);
  assert.ok(new Set(ys).size === ys.length && new Set(xs).size === xs.length, "trang tính: không kẻ trùng đường");
  ngang.forEach((l) => assert.ok(num(l, "x1") === xs[0] && num(l, "x2") === xs[xs.length - 1], "đường ngang kẻ hết bề rộng"));
  doc.forEach((l) => assert.ok(num(l, "y1") === ys[0] && num(l, "y2") === ys[ys.length - 1], "đường dọc kẻ hết chiều cao"));
  const RH = ys[2] - ys[1];
  ys.slice(2).forEach((y, i) => assert.equal(y - ys[i + 1], RH, "các hàng cao bằng nhau"));
  const W = xs[xs.length - 1], H = ys[ys.length - 1];
  assert.ok(R.some((r) => r.fill === "bg" && num(r, "x") === 0 && num(r, "y") === 0 && num(r, "width") === W && num(r, "height") === ys[1]), "hàng tên cột tô bg");
  assert.ok(R.some((r) => r.fill === "bg" && num(r, "x") === 0 && num(r, "y") === ys[1] && num(r, "width") === xs[1] && num(r, "height") === H - ys[1]), "cột số hàng tô bg");
  TX.forEach(coChu);
  const giua = (a, b, t) => t["text-anchor"] === "middle" && close(+t.x, (a + b) / 2);
  for (let c = 1; c < xs.length - 1; c++) {
    const t = TX.filter((t) => +t.y < ys[1] && giua(xs[c], xs[c + 1], t));
    assert.ok(t.length === 1 && t[0].fill === "muted" && t[0].t === String.fromCharCode(64 + c), "tên cột " + String.fromCharCode(64 + c));
  }
  for (let r = 1; r < ys.length - 1; r++) {
    const t = TX.filter((t) => +t.x < xs[1] && +t.y > ys[r] && +t.y < ys[r + 1]);
    assert.ok(t.length === 1 && t[0].fill === "muted" && giua(xs[0], xs[1], t[0]) && t[0].t === String(r), "số hàng " + r);
  }
  const o = {};
  TX.filter((t) => +t.y > ys[1] && +t.x > xs[1]).forEach((t) => {
    const c = xs.findIndex((x, i) => i && +t.x > xs[i - 1] && +t.x <= x) - 1, r = ys.findIndex((y, i) => i && +t.y > ys[i - 1] && +t.y < y) - 1;
    assert.ok(c >= 1 && r >= 1, "chữ nằm trong một ô: " + t.t);
    const so = t["text-anchor"] === "end";
    assert.ok(so ? close(+t.x, xs[c + 1] - 5) : !t["text-anchor"] && close(+t.x, xs[c] + 5), "ô chữ căn trái, ô số căn phải: " + t.t);
    assert.ok(rong(t) <= xs[c + 1] - xs[c] - 8, "chữ vừa ô: " + t.t);
    assert.equal(t["font-weight"] === "700", r === 1, "hàng 1 (tiêu đề) chữ đậm, hàng khác chữ thường: " + t.t);
    const ten = String.fromCharCode(64 + c) + r;
    assert.ok(!(ten in o), "mỗi ô một chữ: " + ten);
    if (so) { assert.ok(/^-?\d+(,\d+)?%?$/.test(t.t), "ô số: " + t.t); o[ten] = val(t.t.replace("%", "")) / (t.t.endsWith("%") ? 100 : 1); } else o[ten] = t.t;
  });
  return { o };
};

/* Biểu đồ cột hai dãy: lưới ngang tô line, nhãn trục bên trái mỗi đường (text-anchor end, muted); cột tô acc hoặc sun đứng trên đường 0,
   số ở đỉnh cột khớp chiều cao theo trục; tên nhóm (tháng) ngay dưới đường 0, giữa hai cột; chú thích là ô vuông 10 × 10 và chữ bên phải.
   Trả về { nhom: [tên…], day: { "Thu": [giá trị theo nhóm…], "Chi": […] } }. */
const docCot2 = (svg) => {
  daDoc.add(svg);
  const TX = texts(svg), luoi = tags(svg, "line").filter((l) => l.stroke === "line"), R = tags(svg, "rect");
  TX.forEach(coChu);
  luoi.forEach((l) => assert.equal(num(l, "y1"), num(l, "y2"), "đường lưới nằm ngang"));
  const truc = luoi.map((l) => { const t = TX.filter((t) => t["text-anchor"] === "end" && t.fill === "muted" && +t.x < num(l, "x1") && close(+t.y, num(l, "y1") + 5)); assert.equal(t.length, 1, "mỗi đường lưới một nhãn"); return [num(l, "y1"), val(t[0].t)]; }).sort((a, b) => b[0] - a[0]);
  assert.equal(truc[0][1], 0, "đường dưới cùng là 0");
  const k = (truc[1][1] - truc[0][1]) / (truc[0][0] - truc[1][0]), y0 = truc[0][0];
  truc.forEach(([y, v]) => assert.ok(close(v, (y0 - y) * k, 1e-6), "nhãn trục cách đều"));
  const chuThich = {};
  R.filter((r) => num(r, "width") === 10 && num(r, "height") === 10).forEach((r) => {
    const t = TX.filter((t) => !t["text-anchor"] && +t.x > num(r, "x") + 10 && +t.x <= num(r, "x") + 16 && close(+t.y, num(r, "y") + 10));
    assert.equal(t.length, 1, "mỗi ô chú thích một chữ bên phải"); chuThich[r.fill] = t[0].t;
  });
  assert.deepEqual(Object.values(chuThich).sort(), ["Chi", "Thu"], "chú thích hai dãy Thu, Chi");
  const cot = R.filter((r) => r.fill in chuThich && num(r, "width") !== 10).map((r) => {
    const cx = num(r, "x") + num(r, "width") / 2, gt = num(r, "height") * k;
    assert.ok(close(num(r, "y") + num(r, "height"), y0, 1e-6), "cột đứng trên đường 0");
    const so = TX.filter((t) => t["text-anchor"] === "middle" && close(+t.x, cx, 1e-6) && +t.y < num(r, "y") && +t.y > num(r, "y") - 12);
    assert.ok(so.length === 1 && close(val(so[0].t), gt, 1e-6), "số ở đỉnh cột khớp chiều cao theo trục");
    return { cx, day: chuThich[r.fill], gt };
  }).sort((a, b) => a.cx - b.cx);
  const nhom = [], day = { Thu: [], Chi: [] };
  for (let i = 0; i < cot.length; i += 2) {
    const [a, b] = [cot[i], cot[i + 1]], g = (a.cx + b.cx) / 2;
    assert.ok(a.day === "Thu" && b.day === "Chi", "mỗi nhóm cột Thu đứng trước cột Chi");
    const t = TX.filter((t) => t["text-anchor"] === "middle" && close(+t.x, g, 1e-6) && +t.y > y0);
    assert.equal(t.length, 1, "mỗi nhóm một tên dưới đường 0");
    nhom.push(t[0].t); day.Thu.push(a.gt); day.Chi.push(b.gt);
  }
  assert.equal(TX.length, truc.length + cot.length + nhom.length + 2, "mọi chữ là nhãn trục, số ở đỉnh cột, tên nhóm hoặc chú thích");
  return { nhom, day };
};

/* ---------- bộ tính công thức bảng tính ----------
   Công thức như sách: =COUNTIF(range, criteria), =SUMIF(range, criteria, [sum_range]), =IF(logical_test, [value_if_true],
   [value_if_false]) (lồng được), =SUM(…), phép + − * /, so sánh > < >= <= = <>, phần trăm 50%; địa chỉ có thể có dấu $. o: giá trị các ô. */
const soCot = (s) => [...s].reduce((a, ch) => a * 26 + ch.charCodeAt(0) - 64, 0), tenCot = (n) => (n > 26 ? tenCot(Math.floor((n - 1) / 26)) : "") + String.fromCharCode(65 + ((n - 1) % 26));
const ngoaiNgoac = (f, fn) => f.split('"').map((p, i) => (i % 2 ? p : fn(p))).join('"');
const chep = (f, dh, dc) => ngoaiNgoac(f, (p) => p.replace(/(\$?)([A-Z]+)(\$?)(\d+)/g, (m, a, c, b, r) => a + (a ? c : tenCot(soCot(c) + dc)) + b + (b ? r : String(+r + dh))));
const vung = (s) => { const [p, q] = s.replace(/\$/g, "").split(":"), m = (x) => x.match(/^([A-Z]+)(\d+)$/), a = m(p), b = m(q || p), ra = [];
  for (let c = soCot(a[1]); c <= soCot(b[1]); c++) for (let r = +a[2]; r <= +b[2]; r++) ra.push(tenCot(c) + r); return ra; };
const khop = (v, dk) => { // ô có giá trị v thoả điều kiện dk của COUNTIF, SUMIF
  if (typeof dk === "number") return typeof v === "number" && close(v, dk);
  const m = String(dk).match(/^(<=|>=|<>|<|>|=)?(.*)$/), op = m[1] || "=", s = m[2], n = /^-?\d+(\.\d+)?%?$/.test(s) ? +s.replace("%", "") / (s.endsWith("%") ? 100 : 1) : null;
  if (n !== null) { if (typeof v !== "number") return op === "<>"; return { "=": close(v, n), "<>": !close(v, n), "<": v < n, ">": v > n, "<=": v <= n + 1e-12, ">=": v >= n - 1e-12 }[op]; }
  if (typeof v !== "string") return op === "<>";
  const re = new RegExp("^" + s.toLowerCase().replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".") + "$", "u");
  return op === "<>" ? !re.test(v.toLowerCase()) : op === "=" && re.test(v.toLowerCase());
};
function tinh(f, o) {
  assert.ok(f.startsWith("="), "công thức bắt đầu bằng dấu =: " + f);
  const tk = [], re = /\s*(?:("[^"]*")|(\d+(?:\.\d+)?%?)|(\$?[A-Z]+\$?\d+(?::\$?[A-Z]+\$?\d+)?)|([A-Z]+)\(|(<=|>=|<>|[-+*/=<>(),&]))/y;
  let m, i = 1;
  for (re.lastIndex = 1; i < f.length; i = re.lastIndex) { m = re.exec(f); assert.ok(m, "không đọc được công thức: " + f.slice(i)); tk.push(m[1] ? { s: m[1].slice(1, -1) } : m[2] ? { n: +m[2].replace("%", "") / (m[2].endsWith("%") ? 100 : 1) } : m[3] ? { ref: m[3] } : m[4] ? { fn: m[4] } : { op: m[5] }); }
  let p = 0;
  const nhin = () => tk[p], an = (op) => { assert.ok(tk[p] && tk[p].op === op, `công thức thiếu “${op}”: ${f}`); p++; };
  const giaTri = (x) => (Array.isArray(x) ? assert.fail("vùng đứng một mình: " + f) : x);
  const soHoc = (x) => (x === "" || x === undefined ? 0 : x);
  const ss = () => { const a = cong(); const t = nhin(); if (t && ["=", "<>", "<", ">", "<=", ">="].includes(t.op)) { p++; const b = cong(), x = giaTri(a), y = giaTri(b);
      return { "=": x === y || (typeof x === "number" && typeof y === "number" && close(x, y)), "<>": x !== y, "<": x < y, ">": x > y, "<=": x <= y, ">=": x >= y }[t.op]; } return a; };
  const cong = () => { let a = nhan(); while (nhin() && ["+", "-"].includes(nhin().op)) { const op = tk[p++].op, b = nhan(); a = op === "+" ? soHoc(a) + soHoc(b) : soHoc(a) - soHoc(b); } return a; };
  const nhan = () => { let a = mot(); while (nhin() && ["*", "/"].includes(nhin().op)) { const op = tk[p++].op, b = mot(); a = op === "*" ? soHoc(a) * soHoc(b) : soHoc(a) / soHoc(b); } return a; };
  const mot = () => { const t = tk[p++]; assert.ok(t, "công thức thiếu phần sau: " + f);
    if (t.op === "-") return -soHoc(mot());
    if (t.op === "(") { const v = ss(); an(")"); return v; }
    if ("s" in t || "n" in t) return "s" in t ? t.s : t.n;
    if (t.ref) return t.ref.includes(":") ? vung(t.ref) : (o[t.ref.replace(/\$/g, "")] === undefined ? "" : o[t.ref.replace(/\$/g, "")]);
    if (t.fn) { const ts = []; if (!(nhin() && nhin().op === ")")) { ts.push(ss()); while (nhin() && nhin().op === ",") { p++; ts.push(ss()); } } an(")"); return HAM[t.fn](ts); }
    assert.fail("không đọc được công thức: " + f); };
  const HAM = {
    COUNTIF: ([r, dk]) => vung2(r).filter((c) => khop(o[c] === undefined ? "" : o[c], dk)).length,
    SUMIF: ([r, dk, s]) => { const a = vung2(r), b = s ? vung2(s) : a; assert.equal(a.length, b.length, "range và sum_range cùng số ô"); return sum(a.map((c, i) => (khop(o[c] === undefined ? "" : o[c], dk) && typeof o[b[i]] === "number" ? o[b[i]] : 0))); },
    IF: ([dk, a = true, b = false]) => (dk ? a : b),
    SUM: (ts) => sum(ts.flatMap((x) => (Array.isArray(x) ? x.map((c) => o[c]) : [x])).filter((v) => typeof v === "number"))
  };
  const vung2 = (x) => (Array.isArray(x) ? x : assert.fail("cần một vùng ô: " + f));
  const v = ss();
  assert.equal(p, tk.length, "công thức còn thừa: " + f);
  return v;
}
// các công thức có trong một đoạn chữ: =TÊN(…) (cân ngoặc, bỏ qua chữ trong ngoặc kép) hoặc =ô-ô
const congThuc = (s) => {
  const ra = [];
  for (let i = s.indexOf("="); i >= 0; i = s.indexOf("=", i + 1)) {
    const m = s.slice(i).match(/^=([A-Z]+)\(/);
    if (!m) { const n = s.slice(i).match(/^=([A-Z]+\d+[-+][A-Z]+\d+)/); if (n) ra.push("=" + n[1]); continue; }
    let k = i + m[0].length, d = 1, q = false;
    for (; k < s.length && d; k++) { const ch = s[k]; if (ch === '"') q = !q; else if (!q && ch === "(") d++; else if (!q && ch === ")") d--; }
    assert.equal(d, 0, "công thức thiếu ngoặc đóng: " + s.slice(i, i + 40));
    ra.push(s.slice(i, k)); i = k - 1;
  }
  return ra;
};

/* Thiết lập của công cụ xác thực dữ liệu ghi như “Allow: Whole number; Data: between; Minimum: 1; Maximum: 6”: giá trị v có được nhận không. */
const thietLap = (s) => { const g = (k) => { const m = s.match(new RegExp(k + ": (.+?)(?=;|\\.(?:\\s|$)|$)")); return m && m[1].trim(); }; return { allow: g("Allow"), data: g("Data"), min: g("Minimum"), max: g("Maximum") }; };
const nhanGiaTri = (tl, v) => {
  if (typeof v !== "number") return tl.allow === "Any value" || !tl.allow;
  if (tl.allow === "Whole number" && !Number.isInteger(v)) return false;
  assert.ok(["Whole number", "Decimal"].includes(tl.allow), "kiểu dữ liệu chưa thử: " + tl.allow);
  const a = tl.min === null ? null : val(tl.min), b = tl.max === null ? null : val(tl.max);
  return { between: v >= a && v <= b, "greater than": v > a, "less than": v < b, "greater than or equal to": v >= a, "less than or equal to": v <= b }[tl.data];
};

/* Sơ đồ nguyên lí (Bài 3 của Công nghệ 9, kí hiệu theo Bảng 3.1): dây là nét 2 tô ink nằm ngang hoặc dọc; nguồn là chữ A, O đậm ngay trên
   đầu dây, có nét gạch chéo ở đầu dây; cầu chì là hình chữ nhật 10 × 24 hoặc 24 × 10 tô surface có nét mảnh xuyên qua, hai đầu nối ở giữa
   hai cạnh ngắn; công tắc hai cực, ổ lấy điện, bóng đèn là vòng tròn bán kính 12 tô surface (công tắc: hai chấm nằm ngang và lưỡi gạt đi
   từ một chấm, không chạm chấm kia: trạng thái ngắt; ổ lấy điện: hai vòng tròn nhỏ; bóng đèn: dấu nhân), hai đầu nối là chỗ dây chạm vòng
   tròn; chỗ nối của từ ba dây có chấm tròn đậm bán kính 3, chỗ khác không có; không dây nào bỏ lửng, chéo nhau hay xuyên qua kí hiệu; mỗi
   thiết bị một số (ngay trên, cầu chì dọc thì bên trái); điểm đánh dấu là vòng tròn rỗng bán kính 3,5 nằm trên dây, có chữ cái đậm bên
   cạnh. Trả về { tb: [{ loai, so, nut: [nút, nút], tam }], A, O, diem: { P: nút… } }; nút là nhóm các điểm nối với nhau chỉ bằng dây. */
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const keyP = (p) => p[0] + "," + p[1];
const same = (p, q) => close(p[0], q[0], 1e-6) && close(p[1], q[1], 1e-6);
const trongDoan = (p, [a, b]) => (a[0] === b[0] ? close(p[0], a[0], 1e-6) && p[1] > Math.min(a[1], b[1]) + 1e-6 && p[1] < Math.max(a[1], b[1]) - 1e-6
  : close(p[1], a[1], 1e-6) && p[0] > Math.min(a[0], b[0]) + 1e-6 && p[0] < Math.max(a[0], b[0]) - 1e-6);
const docSoDo = (svg) => {
  daDoc.add(svg);
  assert.ok(svgRong(svg) <= 320, "sơ đồ rộng không quá 320");
  const LN = tags(svg, "line"), CI = tags(svg, "circle"), RE = tags(svg, "rect"), TX = texts(svg);
  TX.forEach(coChu);
  const tb = [], trongTron = (p, c) => dist(p, c) <= 12 + 0.05;
  CI.filter((c) => c.r === "12").forEach((c) => {
    assert.ok(c.fill === "surface" && c.stroke === "ink" && c["stroke-width"] === "2", "vòng tròn thiết bị tô surface, viền ink nét 2");
    const tam = [+c.cx, +c.cy], nho = CI.filter((d) => d !== c && dist([+d.cx, +d.cy], tam) < 10);
    const net = LN.filter((l) => l["stroke-width"] === "1.5" && trongTron([+l.x1, +l.y1], tam) && trongTron([+l.x2, +l.y2], tam));
    const cham = nho.filter((d) => d.r === "2" && d.fill === "ink"), lo = nho.filter((d) => d.r === "3" && d.fill === "surface");
    let loai;
    if (cham.length === 2 && !lo.length && net.length === 1) {
      const l = net[0], a = [+l.x1, +l.y1], b = [+l.x2, +l.y2], ch = cham.map((d) => [+d.cx, +d.cy]);
      assert.ok(close(ch[0][1], ch[1][1]) && Math.abs(ch[0][0] - ch[1][0]) >= 8, "hai chấm của công tắc nằm ngang");
      assert.ok(ch.some((x) => same(x, a)) && !ch.some((x) => dist(x, b) < 3), "công tắc vẽ ở trạng thái ngắt: lưỡi gạt đi từ một chấm, không chạm chấm kia");
      loai = "congTac";
    } else if (lo.length === 2 && !cham.length && !net.length) {
      assert.ok(close(+lo[0].cy, +lo[1].cy) && close(+lo[0].cy, tam[1]), "hai lỗ của ổ lấy điện nằm ngang giữa vòng tròn");
      loai = "oCam";
    } else if (!nho.length && net.length === 2) {
      net.forEach((l) => assert.ok(close(dist([+l.x1, +l.y1], tam), 12, 0.05) && close(dist([+l.x2, +l.y2], tam), 12, 0.05) && close((+l.x1 + +l.x2) / 2, tam[0], 1e-6) && close((+l.y1 + +l.y2) / 2, tam[1], 1e-6), "dấu nhân của bóng đèn: hai nét chéo qua tâm"));
      loai = "den";
    } else assert.fail("vòng tròn không rõ là thiết bị nào");
    tb.push({ loai, tam, hop: [tam[0] - 12, tam[1] - 12, tam[0] + 12, tam[1] + 12] });
  });
  RE.forEach((r) => {
    const [x, y, w, h] = ["x", "y", "width", "height"].map((k) => num(r, k)), doc = h > w, tam = [x + w / 2, y + h / 2];
    assert.ok(r.fill === "surface" && r.stroke === "ink" && ((w === 10 && h === 24) || (w === 24 && h === 10)), "hình chữ nhật là cầu chì 10 × 24");
    const giua = LN.filter((l) => l["stroke-width"] === "1" && (doc ? +l.x1 === tam[0] && +l.x2 === tam[0] && +l.y1 === y && +l.y2 === y + h : +l.y1 === tam[1] && +l.y2 === tam[1] && +l.x1 === x && +l.x2 === x + w));
    assert.equal(giua.length, 1, "cầu chì có nét mảnh xuyên qua theo chiều dài");
    tb.push({ loai: "cauChi", tam, doc, hop: [x, y, x + w, y + h], dau: doc ? [[tam[0], y], [tam[0], y + h]] : [[x, tam[1]], [x + w, tam[1]]] });
  });
  const trongHop = (p, h, e = 1e-6) => p[0] >= h[0] - e && p[0] <= h[2] + e && p[1] >= h[1] - e && p[1] <= h[3] + e;
  const day = [], gach = [];
  LN.forEach((l) => {
    const a = [+l.x1, +l.y1], b = [+l.x2, +l.y2];
    if (l["stroke-width"] !== "2") { assert.ok(tb.some((t) => trongHop(a, t.hop) && trongHop(b, t.hop)), "nét mảnh chỉ nằm trong kí hiệu"); return; }
    assert.equal(l.stroke, "ink", "dây tô ink");
    if (a[0] === b[0] || a[1] === b[1]) { assert.ok(!same(a, b), "dây có độ dài"); day.push([a, b]); } else gach.push([a, b]);
  });
  // không dây nào xuyên qua kí hiệu, không có hai dây chéo nhau
  day.forEach(([a, b]) => tb.forEach((t) => { for (let k = 1; k < 40; k++) { const p = [a[0] + ((b[0] - a[0]) * k) / 40, a[1] + ((b[1] - a[1]) * k) / 40]; assert.ok(!trongHop(p, [t.hop[0] + 0.5, t.hop[1] + 0.5, t.hop[2] - 0.5, t.hop[3] - 0.5], 0), "dây xuyên qua kí hiệu"); } }));
  day.forEach((d) => day.forEach((e) => { if (d[0][1] === d[1][1] && e[0][0] === e[1][0]) { const p = [e[0][0], d[0][1]]; assert.ok(!(trongDoan(p, d) && trongDoan(p, e)), "hai dây chéo nhau: " + keyP(p)); } }));
  // hai đầu nối của mỗi thiết bị: chỗ dây chạm vòng tròn (hai bên trái, phải) hoặc giữa hai cạnh ngắn của cầu chì
  const dauDay = day.flat();
  tb.forEach((t) => {
    t.dau = t.loai === "cauChi" ? t.dau : dauDay.filter((p) => close(dist(p, t.tam), 12, 1e-6));
    if (t.loai !== "cauChi") assert.ok(t.dau.length === 2 && t.dau.every((p) => close(p[1], t.tam[1])), "thiết bị có đúng hai đầu nối ở hai bên");
    t.dau.forEach((p) => assert.equal(dauDay.filter((q) => same(p, q)).length, 1, "mỗi đầu nối của thiết bị có đúng một dây"));
  });
  // nguồn: chữ A, O đậm ngay trên đầu dây (cách 10), có nét gạch chéo ở đầu dây
  const nguon = {};
  TX.filter((t) => t["font-weight"] === "700" && /^[AO]$/.test(t.t)).forEach((t) => {
    const p = [+t.x, +t.y + 10];
    assert.equal(dauDay.filter((q) => same(p, q)).length, 1, "đầu dây nguồn " + t.t + " ngay dưới chữ");
    assert.equal(gach.filter(([a, b]) => dist([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], p) < 2.5).length, 1, "đầu dây nguồn " + t.t + " có nét gạch chéo");
    assert.ok(!(t.t in nguon), "mỗi nguồn một chữ"); nguon[t.t] = p;
  });
  assert.deepEqual(Object.keys(nguon).sort(), ["A", "O"], "sơ đồ có nguồn A và O");
  assert.equal(gach.length, 2, "chỉ hai nét gạch chéo ở đầu dây nguồn");
  // nút: gộp các điểm nối với nhau bằng dây
  const cha = new Map(), f = (k) => { while (cha.has(k) && cha.get(k) !== k) k = cha.get(k); return k; }, u = (a, b) => { a = f(a); b = f(b); if (a !== b) cha.set(a, b); };
  day.forEach(([a, b]) => u(keyP(a), keyP(b)));
  dauDay.forEach((p) => day.forEach((d) => { if (trongDoan(p, d)) u(keyP(p), keyP(d[0])); }));
  const dauTB = tb.flatMap((t) => t.dau).concat(Object.values(nguon));
  const bac = (p) => dauDay.filter((q) => same(p, q)).length + dauTB.filter((q) => same(p, q)).length + 2 * day.filter((d) => trongDoan(p, d)).length;
  const cham = CI.filter((c) => c.r === "3" && c.fill === "ink").map((c) => [+c.cx, +c.cy]);
  [...new Set(dauDay.map(keyP))].map((k) => k.split(",").map(Number)).forEach((p) => {
    assert.ok(bac(p) >= 2, "dây bỏ lửng ở " + keyP(p));
    assert.equal(cham.some((c) => same(c, p)), bac(p) >= 3, "chấm tròn đậm đúng ở chỗ nối của từ ba dây: " + keyP(p));
  });
  cham.forEach((c) => assert.ok(dauDay.some((p) => same(p, c)), "chấm tròn đậm ở đầu dây"));
  // số của thiết bị: chữ số gần tâm nhất (không quá 24)
  TX.filter((t) => /^\d+$/.test(t.t)).forEach((t) => {
    const g = tb.map((x) => [dist([+t.x, +t.y - 5], x.tam), x]).sort((a, b) => a[0] - b[0]);
    assert.ok(g[0][0] < 24 && (!g[1] || g[1][0] > g[0][0] + 6), "số " + t.t + " ở ngay cạnh một thiết bị");
    assert.ok(!g[0][1].so, "mỗi thiết bị một số"); g[0][1].so = +t.t;
  });
  tb.forEach((t) => assert.ok(t.so, "thiết bị chưa có số"));
  assert.equal(new Set(tb.map((t) => t.so)).size, tb.length, "số của thiết bị không trùng");
  tb.forEach((t) => { t.nut = t.dau.map((p) => f(keyP(p))); assert.notEqual(t.nut[0], t.nut[1], "thiết bị " + t.so + " bị nối tắt"); });
  // điểm đánh dấu
  const diem = {};
  CI.filter((c) => c.r === "3.5").forEach((c) => {
    const p = [+c.cx, +c.cy], t = TX.filter((x) => x["font-weight"] === "700" && /^[A-Z]$/.test(x.t) && !/^[AO]$/.test(x.t) && dist([+x.x, +x.y - 5], p) < 16);
    assert.ok(c.fill === "surface" && t.length === 1, "điểm đánh dấu có một chữ cái bên cạnh");
    const d = day.filter((d) => trongDoan(p, d) || same(p, d[0]) || same(p, d[1]));
    assert.equal(d.length, 1, "điểm " + t[0].t + " nằm trên một dây");
    diem[t[0].t] = f(keyP(d[0][0]));
  });
  return { tb, A: f(keyP(nguon.A)), O: f(keyP(nguon.O)), diem, nguon, day, nutCua: (p) => f(keyP(p)) };
};
const thietBi = (sd, so) => { const t = sd.tb.find((x) => x.so === so); assert.ok(t, "sơ đồ không có thiết bị số " + so); return t; };
// các thiết bị tiêu thụ (đèn, ổ lấy điện, thêm cả thiết bị nối thêm) có điện khi đóng các công tắc dong, cầu chì dut bị đứt
const coDien = (sd, { dong = [], dut = [], them = [] } = {}) => {
  const cha = new Map(), f = (k) => { while (cha.has(k) && cha.get(k) !== k) k = cha.get(k); return k; }, u = (a, b) => { a = f(a); b = f(b); if (a !== b) cha.set(a, b); };
  sd.tb.forEach((t) => { if ((t.loai === "congTac" && dong.includes(t.so)) || (t.loai === "cauChi" && !dut.includes(t.so))) u(t.nut[0], t.nut[1]); });
  assert.notEqual(f(sd.A), f(sd.O), "chập mạch giữa A và O");
  return new Set(sd.tb.filter((t) => t.loai === "den" || t.loai === "oCam").concat(them)
    .filter((t) => { const [a, b] = t.nut.map(f); return (a === f(sd.A) && b === f(sd.O)) || (a === f(sd.O) && b === f(sd.A)); }).map((t) => t.so));
};
const congTacCua = (sd) => sd.tb.filter((t) => t.loai === "congTac").map((t) => t.so);
const moiCach = (ds) => ds.reduce((a, x) => a.concat(a.map((s) => s.concat([x]))), [[]]); // mọi tập con
// mắc nối tiếp: chung một nút mà chỉ hai thiết bị đó nối vào; song song: cùng hai nút
const dauTai = (sd, n) => sd.tb.filter((t) => t.nut.includes(n)).length + [sd.A, sd.O].filter((k) => k === n).length;
const noiTiep = (sd, a, b) => a.nut.some((n) => b.nut.includes(n) && dauTai(sd, n) === 2);
const songSong = (sd, a, b) => [...a.nut].sort().join() === [...b.nut].sort().join();

/* Hình kí hiệu: mỗi kí hiệu một số ở dưới; quạt trần là hai tam giác chụm đỉnh vào vòng tròn nhỏ ở giữa; công tơ điện là hình chữ nhật có
   chữ kWh; đồng hồ đo là vòng tròn bán kính 13 có chữ (W: oát kế, V: vôn kế, A: ampe kế, Ω: ôm kế). Trả về [[số, tên], …]. */
const docKiHieu = (svg) => {
  daDoc.add(svg);
  const PO = tags(svg, "polygon"), CI = tags(svg, "circle"), RE = tags(svg, "rect"), TX = texts(svg);
  TX.forEach(coChu);
  return TX.filter((t) => /^\d$/.test(t.t)).sort((a, b) => +a.x - +b.x).map((t) => {
    const gan = (px) => Math.abs(px - +t.x) < 45;
    const p = PO.filter((x) => pts(x.points).every((q) => gan(q[0]))), r = RE.filter((x) => gan(num(x, "x") + num(x, "width") / 2)), c = CI.filter((x) => gan(+x.cx));
    const chu = TX.filter((x) => x !== t && gan(+x.x)).map((x) => x.t);
    let loai;
    if (p.length === 2 && c.length === 1 && c[0].r === "4" && !r.length && !chu.length) {
      const tam = [+c[0].cx, +c[0].cy];
      p.forEach((x) => { const q = pts(x.points), dinh = q.filter((v) => q.filter((w) => w[0] === v[0]).length === 1); assert.ok(q.length === 3 && dinh.length === 1 && close(dist(dinh[0], tam), 4, 1e-6), "đỉnh tam giác chạm vòng tròn nhỏ"); });
      assert.ok(pts(p[0].points).every((v) => v[0] < tam[0]) !== pts(p[1].points).every((v) => v[0] < tam[0]), "hai tam giác ở hai bên vòng tròn");
      loai = "Quạt trần";
    } else if (r.length === 1 && !p.length && !c.length && chu.join() === "kWh") loai = "Công tơ điện";
    else if (c.length === 1 && c[0].r === "13" && !p.length && !r.length && chu.length === 1) loai = { W: "Oát kế", V: "Vôn kế", A: "Ampe kế", "Ω": "Ôm kế" }[chu[0]];
    assert.ok(loai, "kí hiệu số " + t.t + " chưa rõ là thiết bị nào");
    return [+t.t, loai];
  });
};
const dieuKhien = (sd, sw) => { const all = congTacCua(sd), a = coDien(sd, { dong: all }), b = coDien(sd, { dong: all.filter((x) => x !== sw) }); return new Set([...a].filter((x) => !b.has(x))); };

/* ---------- các câu cần tính ----------
   id: đề chứa câu; has: đoạn chữ của đề; right(q): đáp án tính bằng code (so với ans, o[0], a của câu đúng/sai 4 ý, cặp nối l[i] → r[i]). */
const so = (re, s) => { const m = s.match(re); assert.ok(m, "không đọc được “" + re + "” trong: " + s.slice(0, 80)); return m.slice(1).map(val); };
const SO_CHU = { "một": 1, "hai": 2, "ba": 3, "bốn": 4, "năm": 5, "sáu": 6, "bảy": 7 };
const soLuong = (s) => (/^\d+$/.test(s) ? +s : SO_CHU[s]);
const ham = (f) => { // các tham số ở ngoài cùng của =TÊN(…)
  const ra = []; let d = 0, q = false, cur = "";
  for (const ch of f.slice(f.indexOf("(") + 1, -1)) { if (ch === '"') q = !q; if (!q && ch === "(") d++; if (!q && ch === ")") d--; if (!q && !d && ch === ",") { ra.push(cur); cur = ""; } else cur += ch; }
  return ra.concat([cur]);
};
const oKhop = (r, dk, o) => vung(r).filter((c) => khop(o[c] === undefined ? "" : o[c], dk));
const coLoiGiai = (q, ...ds) => ds.forEach((d) => assert.ok(q.x.includes(d), `lời giải thiếu “${d}”: ${q.q.slice(0, 50)}`));
// thang đo điện áp ghi như “V− 2 V, 20 V, 200 V, 1 000 V; V~ 200 V, 750 V”; chọn thang cùng loại, lớn hơn nhưng gần giá trị cần đo nhất
const thangDo = (q) => {
  const ds = {}; q.q.match(/thang đo điện áp: ([^.]+)\./)[1].split("; ").forEach((p) => { const [, k, r] = p.match(/^(V[−~]) (.+)$/); ds[k] = r.split(", ").map((x) => val(x.replace(/ V$/, ""))); });
  const [v] = so(new RegExp(`khoảng ${SO} V, (?:xoay chiều|một chiều)`), q.q), k = /khoảng [\d ]+ V, xoay chiều/.test(q.q) ? "V~" : "V−";
  const chon = Math.min(...ds[k].filter((x) => x > v));
  assert.ok(ds[k].some((x) => x < v), "có thang nhỏ hơn giá trị cần đo để thử");
  coLoiGiai(q, `nên chọn thang ${k}`, `gần ${vn(v)} V nhất là ${vn(chon)} V`);
  return `${k} ${vn(chon)} V`;
};
// đồ dùng điện ghi trong đề: “6 bóng đèn LED, mỗi bóng 220 V – 22 W”, “một ti vi 220 V – 154 W” → [[số lượng, tên, công suất]]
const doDung = (s) => [...s.matchAll(/(\d+|một|hai|ba|bốn|năm|sáu) ([^,–()\d]+?)(?:, mỗi [^,–()\d]+?)? 220 V – (\d{1,3}(?: \d{3})*) W/g)].map((m) => [soLuong(m[1]), m[2], val(m[3])]);
const chonLoai = (ds, can) => Math.min(...ds.filter((a) => a >= can - 1e-9)); // loại lớn hơn và gần nhất

const CHECKS = [
  /* Tin học, Đề 1 */
  { id: T.de1, has: "Maximum: 40", right: (q) => {
    const tl = thietLap(q.q); assert.ok(tl.allow === "Whole number" && tl.data === "between", "đọc được thiết lập");
    return q.o.map((y) => { const m = y.match(/^Giá trị (\S+) được nhận vào ô\.$/); assert.ok(m, "ý: " + y); return nhanGiaTri(tl, /^-?\d+(,\d+)?$/.test(m[1]) ? val(m[1]) : m[1]); }); } },
  { id: T.de1, has: "=COUNTIF(B2:B30,\"Bánh*\")", right: (q) => {
    const o = {}; ["Bánh mì", "Xôi bánh", "Bánh", "Phở bò", "Bánh cuốn", "bánh bao"].forEach((m, i) => (o["B" + (i + 2)] = m));
    assert.deepEqual(oKhop("B2:B7", "Bánh*", o), ["B2", "B4", "B6", "B7"], "“Bánh*”: bắt đầu bằng Bánh, không đếm ô kết thúc bằng Bánh");
    assert.equal(tinh(congThuc(q.q)[0], o), 4); assert.ok(/bắt đầu bằng chữ Bánh/.test(q.o[0]) && q.o.slice(1).every((x) => !/bắt đầu/.test(x)), "chỉ đáp án đúng nói “bắt đầu”");
    return q.o[0]; } },
  { id: T.de1, has: "Sao chép công thức ở G2 sang ô G3", right: (q) => chep(congThuc(q.q)[0], 1, 0) },
  { id: T.de1, has: "=COUNTIF(C2:C9,\"Cầu lông\")", right: (q) => {
    const b = docTrang(q.svg), f = congThuc(q.q)[0], ds = oKhop(ham(f)[0], ham(f)[1].slice(1, -1), b.o);
    coLoiGiai(q, ds.join(", ")); return tinh(f, b.o); } },
  { id: T.de1, has: "số phút đọc sách", right: (q) => {
    const b = docTrang(q.svg), f = congThuc(q.q)[0], ds = oKhop(ham(f)[0], ham(f)[1].slice(1, -1), b.o);
    coLoiGiai(q, ds.map((c) => vn(b.o[c])).join(", ") + " (ở " + ds.join(", ") + ")"); return tinh(f, b.o); } },
  { id: T.de1, has: "Phần nào của công thức là tham số sum_range", right: (q) => { const t = ham(congThuc(q.q)[0]); assert.equal(t.length, 3); return t[2]; } },
  { id: T.de1, has: "số túi rác", right: (q) => {
    const b = docTrang(q.svg), f = congThuc(q.q)[0], [r, dk, s] = ham(f), ds = oKhop(r, dk.slice(1, -1), b.o), tien = ds.map((c) => b.o["C" + c.slice(1)]);
    coLoiGiai(q, ds.join(", "), tien.join(" + ") + " = " + vn(sum(tien))); assert.equal(s, "C2:C9"); return tinh(f, b.o); } },
  { id: T.de1, has: "gian hàng hội chợ", right: (q) => {
    const b = docTrang(q.svg), f = congThuc(q.q)[0], [r, dk] = ham(f), ds = oKhop(r, dk.slice(1, -1), b.o), tien = ds.map((c) => b.o["C" + c.slice(1)]);
    coLoiGiai(q, tien.join(" + ") + " = " + vn(sum(tien))); ds.forEach((c) => coLoiGiai(q, `${b.o["A" + c.slice(1)]} (${b.o[c]})`)); return tinh(f, b.o); } },
  { id: T.de1, has: "điểm thi đua của bốn tổ", right: (q) => {
    const b = docTrang(q.svg), f = congThuc(q.q)[0], kq = {};
    for (let r = 2; b.o["A" + r] !== undefined; r++) kq["C" + r] = tinh(chep(f, r - 2, 0), b.o);
    assert.equal(Object.keys(kq).length, 4, "bốn tổ");
    return q.o.map((y) => { let m;
      if ((m = y.match(/^Ô (C\d) hiển thị “(.+)”\.$/))) return kq[m[1]] === m[2];
      if ((m = y.match(/^Có (\S+) tổ được xếp “(.+)”\.$/))) return Object.values(kq).filter((v) => v === m[2]).length === soLuong(m[1]);
      return assert.fail("ý chưa đọc được: " + y); }); } },
  { id: T.de1, has: "Muốn ô C2 ghi “Cần giảm”", right: (q) => {
    const yc = (h) => (h > 2 ? "Cần giảm" : "Hợp lí"), dung = q.o.filter((f) => [0, 1, 2, 2.5, 3, 5].every((h) => tinh(f, { B2: h }) === yc(h)));
    assert.equal(dung.length, 1, "chỉ một công thức đúng yêu cầu"); return dung[0]; } },
  { id: T.de1, has: "phí giao hàng", right: (q) => {
    const b = docTrang(q.svg), f = congThuc(q.q)[0], phi = [];
    for (let r = 2; b.o["B" + r] !== undefined; r++) phi.push(tinh(chep(f, r - 2, 0), b.o));
    const tra = phi.filter((v) => v > 0); coLoiGiai(q, `${vn(tra[0])} × ${tra.length} = ${vn(sum(phi))}`); return sum(phi); } },
  { id: T.de1, has: "Công thức nào ở ô E8", right: (q) => {
    const dung = q.o.filter((f) => [0, 1, 2].every((k) => { const o = {}; let t = 0; for (let r = 2; r <= 7; r++) { o["E" + r] = 10 * r + 37 * k + 3; t += o["E" + r]; } return close(tinh(f, o), t); }));
    assert.equal(dung.length, 1, "chỉ một công thức cho tổng số tiền"); return dung[0]; } },
  { id: T.de1, has: "quản lí tiền tiêu vặt", right: (q) => {
    const b = docTrang(q.svg), chi = Object.keys(b.o).filter((k) => /^B\d+$/.test(k) && k !== "B1").map((k) => b.o[k]), [thu] = so(new RegExp(`tổng thu tháng 3 \\(${SO} nghìn đồng\\)`), q.q);
    coLoiGiai(q, chi.join(" + ") + " = " + vn(sum(chi)), `${vn(thu)} − ${vn(sum(chi))} = ${vn(thu - sum(chi))}`);
    return tinh(congThuc(q.q).find((f) => f === "=C4-C5"), { C4: thu, C5: sum(chi) }); } },
  /* Tin học, Đề 2 */
  { id: T.de2, has: "Mỗi bàn có từ 1 đến 6 khách", right: (q) => {
    const yc = (v) => Number.isInteger(v) && v >= 1 && v <= 6, dung = q.o.filter((o) => [-1, 0, 0.5, 1, 2.5, 3, 6, 6.5, 7, 10].every((v) => nhanGiaTri(thietLap(o), v) === yc(v)));
    assert.equal(dung.length, 1, "chỉ một thiết lập khớp yêu cầu"); return dung[0]; } },
  { id: T.de2, has: "=COUNTIF(B2:B40,E2)", right: (q) => {
    const o = { E2: "Bảo tàng", B2: "Bảo tàng", B3: "Công viên", B4: "bảo tàng", B5: "Vườn thú", B6: "Bảo tàng cổ" };
    assert.equal(tinh(congThuc(q.q)[0], o), 2, "điều kiện là ô E2: đếm ô giống giá trị ở E2"); assert.ok(/giống giá trị ở ô E2/.test(q.o[0]));
    return q.o[0]; } },
  { id: T.de2, has: "điểm bài kiểm tra của 10 bạn", right: (q) => {
    const b = docTrang(q.svg), f = congThuc(q.q)[0], ds = oKhop(ham(f)[0], ham(f)[1].slice(1, -1), b.o);
    coLoiGiai(q, ds.map((c) => vn(b.o[c])).join(", ") + " (ở " + ds.join(", ") + ")"); return tinh(f, b.o); } },
  { id: T.de2, has: "đồ uống yêu thích", right: (q) => { const b = docTrang(q.svg);
    return q.o.map((y) => { const m = y.match(/^(=COUNTIF\(.*\)) cho kết quả (\d+)\.$/); assert.ok(m, "ý: " + y); return tinh(m[1], b.o) === +m[2]; }); } },
  { id: T.de2, has: "chuyến dã ngoại", right: (q) => {
    const b = docTrang(q.svg), [f2, f3] = congThuc(q.q), [a, c] = [tinh(f2, b.o), tinh(f3, b.o)];
    coLoiGiai(q, `F2 = ${oKhop("B2:B9", "Ăn uống", b.o).map((x) => b.o["C" + x.slice(1)]).join(" + ")} = ${vn(a)}`, `F3 = ${oKhop("B2:B9", "Đi lại", b.o).map((x) => b.o["C" + x.slice(1)]).join(" + ")} = ${vn(c)}`, `${vn(a)} − ${vn(c)} = ${vn(a - c)}`);
    return a - c; } },
  { id: T.de2, has: "ngày hội trồng cây", right: (q) => { const b = docTrang(q.svg);
    return q.o.map((y) => { let m;
      if ((m = y.match(/^(=SUMIF\(.*\)) cho kết quả (\d+)\.$/))) return tinh(m[1], b.o) === +m[2];
      if ((m = y.match(/^Khối (\d+) trồng được nhiều cây hơn khối (\d+)\.$/))) return tinh(`=SUMIF(B2:B9,${m[1]},C2:C9)`, b.o) > tinh(`=SUMIF(B2:B9,${m[2]},C2:C9)`, b.o);
      return assert.fail("ý chưa đọc được: " + y); }); } },
  { id: T.de2, has: "tổng số giờ tình nguyện của Tổ 2", right: (q) => {
    const dung = q.o.filter((f) => [0, 1, 2].every((k) => { const o = {}; let t = 0; for (let r = 2; r <= 13; r++) { o["B" + r] = "Tổ " + (1 + ((r + k) % 3)); o["D" + r] = 2 + ((r * 7 + k) % 9); if (o["B" + r] === "Tổ 2") t += o["D" + r]; } return close(tinh(f, o), t); }));
    assert.equal(dung.length, 1, "chỉ một công thức cho tổng số giờ của Tổ 2"); return dung[0]; } },
  { id: T.de2, has: "=IF(D2>=80", right: (q) => { const [d] = so(/Ô D2 chứa số (\d+)/, q.q); return tinh(congThuc(q.q)[0], { D2: d }); } },
  { id: T.de2, has: "phần trăm pin còn lại", right: (q) => { const f = congThuc(q.q)[0];
    return q.o.map((y) => { let m;
      if ((m = y.match(/^Nếu B2 là (\d+)% thì C2 hiển thị “(.+)”\.$/))) return tinh(f, { B2: +m[1] / 100 }) === m[2];
      if ((m = y.match(/^Đổi điều kiện thành (B2[<>=]+\d+%) thì với B2 là (\d+)%, C2 vẫn hiển thị “(.+)”\.$/))) return tinh(f.replace(/B2[<>=]+\d+%/, m[1]), { B2: +m[2] / 100 }) === m[3];
      return assert.fail("ý chưa đọc được: " + y); }); } },
  { id: T.de2, has: "Câu lạc bộ đọc sách", right: (q) => {
    const b = docTrang(q.svg), f = congThuc(q.q)[0], d = [];
    for (let r = 2; b.o["B" + r] !== undefined; r++) d.push(tinh(chep(f, r - 2, 0), b.o));
    const [a, c] = [d.filter((v) => v === 10).length, d.filter((v) => v === 3).length];
    assert.equal(a + c, d.length); coLoiGiai(q, `10 × ${a} + 3 × ${c} = ${vn(sum(d))}`); return sum(d); } },
  { id: T.de2, has: "bốn tháng đầu năm", right: (q) => {
    const c = docCot2(q.svg), hieu = c.nhom.map((t, i) => c.day.Thu[i] - c.day.Chi[i]), k = hieu.indexOf(Math.max(...hieu));
    assert.equal(hieu.filter((v) => v === hieu[k]).length, 1, "một tháng thu hơn chi nhiều nhất");
    c.nhom.forEach((t, i) => coLoiGiai(q, `${t.toLowerCase()}: ${vn(c.day.Thu[i])} − ${vn(c.day.Chi[i])} = ${hieu[i] < 0 ? "−" + vn(-hieu[i]) : vn(hieu[i])}`));
    return c.nhom[k]; } },
  { id: T.de2, has: "ba tháng của một gia đình", right: (q) => {
    const b = docTrang(q.svg), f = congThuc(q.q)[0], H = [2, 3, 4], D = H.map((r) => tinh(chep(f, r - 2, 0), b.o));
    const thu = sum(H.map((r) => b.o["B" + r])), chi = sum(H.map((r) => b.o["C" + r]));
    return q.o.map((y) => { let m;
      if ((m = y.match(/^Ô D(\d) có giá trị âm\.$/))) return D[+m[1] - 2] < 0;
      if ((m = y.match(/^Tổng thu ba tháng lớn hơn tổng chi ba tháng (\d+) triệu đồng\.$/))) return thu - chi === +m[1];
      if ((m = y.match(/^(Tháng \d+) có chênh lệch thu, chi lớn nhất trong ba tháng\.$/))) return D[H.findIndex((r) => b.o["A" + r] === m[1])] === Math.max(...D);
      if ((m = y.match(/^Nếu (tháng \d+) bớt (\d+) triệu đồng tiền chi thì D(\d) bằng (-?\d+)\.$/))) {
        const r = +m[3]; assert.equal(b.o["A" + r].toLowerCase(), m[1]);
        return tinh(chep(f, r - 2, 0), Object.assign({}, b.o, { ["C" + r]: b.o["C" + r] - +m[2] })) === +m[4]; }
      return assert.fail("ý chưa đọc được: " + y); }); } },
  { id: T.de2, has: "hiển thị −300", right: (q) => {
    const [v] = so(/hiển thị (−\d+) \(nghìn đồng\)/, q.q), [c4, c5] = ["C4", "C5"].map((k) => (q.q.includes(`ô ${k} là tổng thu`) && k === "C4") || (q.q.includes(`ô ${k} là tổng chi`) && k === "C5"));
    assert.ok(v < 0 && c4 && c5 && congThuc(q.q).includes("=C4-C5"), "C6 = tổng thu − tổng chi, âm");
    return `Tháng 10 gia đình chi nhiều hơn thu ${vn(-v)} nghìn đồng`; } },
  /* Công nghệ, Đề 1 */
  { id: C.de1, has: "Giang cần đo điện áp của ổ cắm", right: thangDo },
  { id: C.de1, has: "ba kí hiệu dùng trong sơ đồ", right: (q) => { const k = docKiHieu(q.svg); assert.equal(k.length, q.l.length);
    return q.l.map((l) => { const n = +l.match(/^Kí hiệu (\d)$/)[1]; return [l, k.find((x) => x[0] === n)[1]]; }); } },
  { id: C.de1, has: "Phúc đóng công tắc số 4", right: (q) => {
    const sd = docSoDo(q.svg), [dong] = so(/đóng công tắc số (\d+)/, q.q), [ngat] = so(/công tắc số (\d+) vẫn ngắt/, q.q);
    assert.deepEqual(congTacCua(sd).sort(), [dong, ngat].sort(), "đề nói trạng thái của mọi công tắc");
    const co = coDien(sd, { dong: [dong] }), loai = { "Ổ lấy điện": "oCam", "bóng đèn": "den", "Bóng đèn": "den" };
    const dung = q.o.filter((o) => { const ds = [...o.matchAll(/(Ổ lấy điện|bóng đèn|Bóng đèn) số (\d+)/g)];
      ds.forEach((m) => assert.equal(thietBi(sd, +m[2]).loai, loai[m[1]], "lựa chọn gọi đúng tên thiết bị số " + m[2]));
      return ds.length === co.size && ds.every((m) => co.has(+m[2])); });
    assert.equal(dung.length, 1, "chỉ một lựa chọn khớp"); return dung[0]; } },
  { id: C.de1, has: "Bạn Thảo vẽ sơ đồ nguyên lí", right: (q) => {
    // lưu ý khi vẽ của Bài 3: mạch nguồn thường đặt ngang; thiết bị đóng cắt, bảo vệ, lấy điện ở bên trái thiết bị điện; công tắc vẽ ở
    // trạng thái ngắt (docSoDo đã kiểm tra). Ba lựa chọn sai là điều hình vẽ đúng: mạch nguồn có đoạn dài nằm ngang, bóng đèn là vòng tròn
    // có dấu nhân (docSoDo nhận ra), hai dây nguồn ghi A, O; chỉ chỗ đặt cầu chì, công tắc là chưa đúng.
    const sd = docSoDo(q.svg), den = sd.tb.filter((t) => t.loai === "den"), kia = sd.tb.filter((t) => t.loai !== "den");
    assert.ok(den.length === 1 && kia.length === 2 && kia.every((t) => close(t.tam[1], den[0].tam[1]) && t.tam[0] > den[0].tam[0]), "cầu chì và công tắc cùng nhánh, ở bên phải bóng đèn");
    assert.deepEqual(kia.map((t) => t.loai).sort(), ["cauChi", "congTac"]);
    assert.ok(sd.day.some(([a, b]) => a[1] === b[1] && Math.abs(a[0] - b[0]) > 150 && [sd.A, sd.O].includes(sd.nutCua(a))), "mạch nguồn có đoạn dài nằm ngang");
    assert.ok(sd.nguon.A && sd.nguon.O, "hai dây nguồn ghi A, O");
    const ct = kia.find((t) => t.loai === "congTac").so;
    assert.ok(coDien(sd, { dong: [ct] }).has(den[0].so) && !coDien(sd).has(den[0].so), "đóng công tắc thì đèn sáng, ngắt thì tắt");
    assert.ok(/^Mạch nguồn được vẽ nằm ngang$/.test(q.o[1]) && /^Bóng đèn được vẽ bằng vòng tròn có dấu nhân$/.test(q.o[2]) && /^Hai dây nguồn được ghi kí hiệu A và O$/.test(q.o[3]), "ba lựa chọn sai là ba điều vừa kiểm tra");
    assert.ok(/bên phải bóng đèn/.test(q.o[0]), "đáp án đúng là chỗ vẽ bên phải");
    return q.o[0]; } },
  { id: C.de1, has: "có hai cầu chì", right: (q) => { const sd = docSoDo(q.svg), tat = congTacCua(sd);
    assert.equal(sd.tb.filter((t) => t.loai === "cauChi").length, 2);
    return q.o.map((y) => { let m;
      if ((m = y.match(/^Cầu chì số (\d+) đứt thì cả hai bóng đèn và ổ lấy điện số (\d+) đều mất điện\.$/))) return sd.tb.filter((t) => t.loai === "den").length === 2 && thietBi(sd, +m[2]).loai === "oCam" && coDien(sd, { dong: tat, dut: [+m[1]] }).size === 0;
      if ((m = y.match(/^Cầu chì số (\d+) đứt thì bóng đèn số (\d+) không sáng được\.$/))) return !coDien(sd, { dong: tat, dut: [+m[1]] }).has(+m[2]);
      if ((m = y.match(/^Cầu chì số (\d+) được mắc nối tiếp với ổ lấy điện số (\d+)\.$/))) return noiTiep(sd, thietBi(sd, +m[1]), thietBi(sd, +m[2]));
      if ((m = y.match(/^Cầu chì số (\d+) được mắc trên dây ([AO])\.$/))) return thietBi(sd, +m[1]).nut.includes(sd[m[2]]);
      return assert.fail("ý chưa đọc được: " + y); }); } },
  { id: C.de1, has: "lò vi sóng 1 100 W", right: (q) => {
    const P = [...q.q.matchAll(new RegExp(SO + " W", "g"))].map((m) => val(m[1])), I = sum(P) / 220, can = 1.3 * I;
    const loai = q.q.match(/aptomat loại ([^.]+)\./)[1].split(", ").map((x) => val(x.replace(/ A$/, ""))), chon = chonLoai(loai, can);
    coLoiGiai(q, `(${P.map(vn).join(" + ")}) : 220 = ${vn(I)} (A)`, `${vn(can)} A`, `gần nhất: ${vn(chon)} A`); return vn(chon) + " A"; } },
  { id: C.de1, has: "Bình nóng lạnh ghi 220 V – 2 500 W", right: (q) => { const [U, P] = so(new RegExp(`ghi ${SO} V – ${SO} W`), q.q), can = 1.3 * P / U;
    coLoiGiai(q, `${vn(P)} : ${vn(U)} ≈ ${vn(tron(P / U, 1))} (A)`, `khoảng ${vn(tron(can, 1))} A`);
    return q.o.map((y) => { const [a, v] = so(new RegExp(`^Công tắc ${SO} A – ${SO} V dùng được\\.$`), y); return a >= can && v >= 220; }); } },
  { id: C.de1, has: "6 bóng đèn LED", right: (q) => { const d = doDung(q.q), P = sum(d.map(([n, , p]) => n * p));
    assert.equal(d.length, 2); coLoiGiai(q, d.map(([n, , p]) => `${n} × ${p}`).join(" + ") + ` = ${d.map(([n, , p]) => vn(n * p)).join(" + ")} = ${vn(P)} (W)`, `${vn(P)} : 220 = ${vn(P / 220)} (A)`);
    return P / 220; } },
  /* Công nghệ, Đề 2 */
  { id: C.de2, has: "bình ắc quy xe máy", right: thangDo },
  { id: C.de2, has: "hai bóng đèn số 3, số 4", right: (q) => {
    const sd = docSoDo(q.svg), ct = congTacCua(sd), [d3, d4] = [3, 4].map((n) => thietBi(sd, n));
    assert.ok(d3.loai === "den" && d4.loai === "den" && songSong(sd, d3, d4), "hai bóng đèn 3, 4 mắc song song");
    return q.o.map((y) => { let m;
      if ((m = y.match(/^Công tắc số (\d+) điều khiển cả bóng đèn số (\d+) và bóng đèn số (\d+)\.$/))) { const ds = dieuKhien(sd, +m[1]); return ds.size === 2 && ds.has(+m[2]) && ds.has(+m[3]); }
      if ((m = y.match(/^Hai bóng đèn số (\d+) và số (\d+) được mắc nối tiếp với nhau\.$/))) return noiTiep(sd, thietBi(sd, +m[1]), thietBi(sd, +m[2]));
      if ((m = y.match(/^Có thể bật bóng đèn số (\d+) mà không bật bóng đèn số (\d+)\.$/))) return moiCach(ct).some((dong) => { const c = coDien(sd, { dong }); return c.has(+m[1]) && !c.has(+m[2]); });
      if ((m = y.match(/^Khi công tắc số (\d+) ngắt \(như hình\), cả hai bóng đèn đều không sáng\.$/))) return moiCach(ct.filter((x) => x !== +m[1])).every((dong) => { const c = coDien(sd, { dong }); return !c.has(3) && !c.has(4); });
      return assert.fail("ý chưa đọc được: " + y); }); } },
  { id: C.de2, has: "Ngọc lập bản danh sách", right: (q) => {
    const sd = docSoDo(q.svg), dem = (l) => sd.tb.filter((t) => t.loai === l).length, ct = congTacCua(sd);
    ct.forEach((s) => assert.equal(dieuKhien(sd, s).size, 1, "mỗi công tắc điều khiển một bóng đèn"));
    sd.tb.filter((t) => t.loai === "oCam").forEach((t) => assert.ok(coDien(sd).has(t.so), "ổ lấy điện luôn có điện"));
    sd.tb.forEach((t) => coLoiGiai(q, String(t.so)));
    return `${dem("cauChi")} cầu chì, ${dem("congTac")} công tắc, ${dem("den")} bóng đèn, ${dem("oCam")} ổ lấy điện`; } },
  { id: C.de2, has: "Cần lắp thêm vào sơ đồ ở hình một ổ lấy điện", right: (q) => {
    const sd = docSoDo(q.svg), ct = congTacCua(sd), cc = sd.tb.filter((t) => t.loai === "cauChi").map((t) => t.so);
    assert.deepEqual(cc, [1], "một cầu chì số 1");
    const hop = (o) => { const m = o.match(/^([A-Z]) và ([A-Z])$/), x = { so: "X", nut: [sd.diem[m[1]], sd.diem[m[2]]] };
      if (x.nut[0] === x.nut[1]) return false;
      return moiCach(ct).every((dong) => coDien(sd, { dong, them: [x] }).has("X") && !coDien(sd, { dong, dut: cc, them: [x] }).has("X")); };
    const dung = q.o.filter(hop); assert.equal(dung.length, 1, "chỉ một cách nối: ổ luôn có điện và được cầu chì bảo vệ"); return dung[0]; } },
  { id: C.de2, has: "Máy giặt ghi 220 V – 1 540 W", right: (q) => {
    const [U, P] = so(new RegExp(`ghi ${SO} V – ${SO} W`), q.q), I = P / U, can = 1.3 * I, loai = q.q.match(/trong các loại (.+?), nên/)[1].split(", ").map((x) => val(x.replace(/ A$/, "")));
    coLoiGiai(q, `${vn(P)} : ${vn(U)} = ${vn(I)} (A)`, `${vn(I)} × 1,3 = ${vn(can)} (A)`); return vn(chonLoai(loai, can)) + " A"; } },
  { id: C.de2, has: "Phòng ngủ của Uyên", right: (q) => {
    const d = doDung(q.q), I = sum(d.map(([n, , p]) => n * p)) / 220, P = (ten) => d.find(([, t]) => t.includes(ten))[2];
    assert.equal(d.length, 3);
    return q.o.map((y) => { let m;
      if ((m = y.match(new RegExp(`^Khi tắt (\\S+), dòng điện tính toán của mạch giảm còn ${SO} A\\.$`)))) return close(I - P(m[1]) / 220, val(m[2]));
      if ((m = y.match(new RegExp(`^Dòng điện tính toán của mạch là ${SO} A\\.$`)))) return close(I, val(m[1]));
      if ((m = y.match(/^Dòng điện qua quạt khi chạy lớn hơn dòng điện qua ổ sạc máy tính\.$/))) return P("quạt") > P("ổ cắm sạc");
      if ((m = y.match(new RegExp(`^Aptomat cho mạch cần dòng điện định mức ít nhất khoảng ${SO} A\\.$`)))) return close(1.3 * I, val(m[1]));
      return assert.fail("ý chưa đọc được: " + y); }); } },
  { id: C.de2, has: "ti vi 220 V – 154 W", right: (q) => { const d = doDung(q.q), P = sum(d.map(([n, , p]) => n * p)), I = P / 220;
    assert.equal(d.length, 3); coLoiGiai(q, `= ${vn(P)} (W)`, `${vn(P)} : 220 = ${vn(I)} (A)`, `${vn(I)} × 130% = ${vn(1.3 * I)} (A)`); return 1.3 * I; } }
];
const giaTri = (q) => (q.type === "num" ? (typeof q.ans === "string" ? q.ans : q.ans) : q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : q.type === "order" ? q.o : q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a : q.o[0]);
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
// mọi công thức ghi trong câu Tin học đọc được, số trong công thức nhỏ hơn 1 000
T.kho.forEach((q) => [q.q, q.x].concat(q.o || []).forEach((s) => congThuc(s).forEach((f) => {
  if (/\b(range|criteria|sum_range|logical_test|value_if_true|value_if_false)\b/.test(f)) return; // cú pháp của hàm, không phải công thức
  if (!f.includes("!")) { const o = {}; assert.doesNotThrow(() => tinh(f, o), "công thức không đọc được: " + f); }
  ngoaiNgoac(f, (p) => p.replace(/\$?[A-Z]+\$?\d+/g, "")).replace(/"[^"]*"/g, "").match(/\d+/g)?.forEach((n) => assert.ok(+n < 1000, "số trong công thức từ 1 000 trở lên: " + f));
})));
// sơ đồ đưa ra làm mẫu (mọi sơ đồ trừ câu tìm chỗ vẽ chưa đúng) theo lưu ý khi vẽ của Bài 3: công tắc, cầu chì ở bên trái bóng đèn, ổ lấy
// điện cùng nhánh
C.kho.filter((q) => q.svg && q.type !== "match" && !q.q.includes("Bạn Thảo vẽ")).forEach((q) => {
  const sd = docSoDo(q.svg);
  sd.tb.filter((t) => ["den", "oCam"].includes(t.loai)).forEach((t) => sd.tb.filter((x) => ["congTac", "cauChi"].includes(x.loai) && close(x.tam[1], t.tam[1]))
    .forEach((x) => assert.ok(x.tam[0] < t.tam[0], `thiết bị số ${x.so} vẽ bên phải thiết bị số ${t.so}: ${q.q.slice(0, 50)}`)));
});

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
  // nhân vật của sách Tin học 9 (An, Minh, Khoa) không dùng làm tên trong đề
  assert.ok(!/(?<![\p{L}])(?:An|Minh|Khoa)(?![\p{L}])(?! học)/u.test(s), at + "tên nhân vật của sách: " + s);
  // dấu trừ của số âm là “−” (U+2212) như các kho khác; công thức giữ dấu “-” như phần mềm bảng tính
  assert.ok(!/(?<![A-Z\d)])-\d/.test(s.replace(/=[^ ]*/g, "")), at + "số âm viết bằng dấu “−”: " + s);
}));
MON.forEach((S) => {
  const nt = bank(S.de1).note;
  assert.equal(bank(S.de2).note, nt, S.m + ": hai đề cùng lời dặn");
  assert.ok(nt.startsWith(`Sách Kết nối tri thức, ${S.ten} 9`) && nt.endsWith("Có lời giải từng câu."), S.m + ": lời dặn ghi sách, cuối lời dặn là “Có lời giải từng câu.”");
  S.chuDe.forEach(([, n, ten]) => assert.ok(nt.includes(`Bài ${n} ${ten}`), S.m + ": lời dặn ghi Bài " + n + " " + ten));
  assert.ok(!/Sở GD|Sở Giáo dục|đề chung/.test(nt), S.m + ": đề giữa kì không có câu về đề chung của Sở");
  assert.ok(/đối chiếu đề cương của trường/.test(nt), S.m + ": lời dặn nhắc đối chiếu đề cương của trường");
});
assert.ok(/Chủ đề 4 phần a\. Sử dụng bảng tính điện tử nâng cao/.test(bank(T.de1).note) && /phần b\. Làm quen với phần mềm làm video \(Bài 9b–13b\)/.test(bank(T.de1).note) && /không có phần thực hành trên máy/.test(bank(T.de1).note), "Tin học: lời dặn ghi phần a, nhắc phần b, hỏi qua tình huống");
assert.ok(/mô đun Lắp đặt mạng điện trong nhà/.test(bank(C.de1).note) && /mô đun khác/.test(bank(C.de1).note) && /Định hướng nghề nghiệp ở học kì II/.test(bank(C.de1).note), "Công nghệ: lời dặn ghi mô đun, nhắc mô đun khác và Định hướng nghề nghiệp");

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
  const mc = K.filter((q) => q.type === "mc");
  mc.forEach((q) => {
    // đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2), không phải lựa chọn duy nhất có chữ của nhãn chủ đề (Rút ra N6)
    const m = Math.max(...q.o.slice(1).map((o) => o.length));
    assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + q.q.slice(0, 60));
    assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + q.q.slice(0, 60));
    const c = chuThuong(q.topic), tu = c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số|cho)( |$)/u.test(w)); // từ hai âm tiết của nhãn
    tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); assert.ok(!(co[0] && !co.slice(1).some(Boolean)), `chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề: ${q.q.slice(0, 60)}`); });
    // ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có (Rút ra N22)
    const dau = q.o.map((o) => o.split(" ")[0]);
    assert.ok(!(q.o.length === 4 && dau.slice(1).every((d) => d === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1), "ba lựa chọn sai cùng mở đầu bằng “" + dau[1] + "”: " + q.q.slice(0, 50));
  });
  // đáp án đúng không hay là lựa chọn dài nhất hay ngắn nhất (Rút ra N9-ck1-tin-congnghe): mỗi kiểu không quá một phần ba số câu nhiều lựa chọn
  const hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
  assert.ok(mc.filter((q) => hon(q, (a, b) => a > b)).length <= mc.length / 3, S.pool + ": đáp án đúng là lựa chọn dài nhất ở quá một phần ba số câu nhiều lựa chọn");
  assert.ok(mc.filter((q) => hon(q, (a, b) => a < b)).length <= mc.length / 3, S.pool + ": đáp án đúng là lựa chọn ngắn nhất ở quá một phần ba số câu nhiều lựa chọn");
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
   của các kho cũ cùng môn (Rút ra N25), cả kho cuối kì I lớp 9: đề bài cùng các lựa chọn, ô nối, ô sắp xếp có từ một nửa số cặp hai âm
   tiết liền nhau (tính trên câu ít cặp hơn, bỏ các cặp có ở mọi câu như “nào dưới đây” và cặp của nhãn chủ đề) chung với một câu cũ thì
   báo ---------- */
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const CHUNG = new Set(["nào dưới", "dưới đây", "đây là", "là một", "mỗi ý", "ý sau", "sau đúng", "đúng hay", "hay sai", "ở hình", "nào sau", "sau đây"]);
const cap2 = (s) => { const w = String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x); };
const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !CHUNG.has(c) && !nhan.has(c))); };
const ten = new Map();
MON.forEach((S) => [S.de1, S.de2].forEach((id) => bank(id).questions.forEach((q, i) => ten.set(S.kho.find((k) => k.src === id && k.q === q.q), id.replace(/9-gk2-/, "-") + "#" + (i + 1)))));
assert.equal(ten.size, kho.length, "mỗi câu của kho có một tên");
MON.forEach((S) => {
  const cua = new Set([S.de1, S.de2]);
  const file = BANKS.filter((b) => b.file === S.file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => goc(q.q)));
  S.kho.forEach((q) => assert.equal(file.filter((k) => k === goc(q.q)).length, 1, "đề bài trùng câu khác trong file: " + q.q.slice(0, 50)));
  const cu = BANKS.filter((b) => !cua.has(b.id) && (b.subject === S.ten || /^tincn/.test(b.id)))
    .flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), c: capAm(q) })));
  assert.ok(cu.length > 0, S.m + ": có kho cũ cùng môn để so");
  S.kho.forEach((q) => { const c = capAm(q); cu.forEach((e) => {
    const chung = [...c].filter((x) => e.c.has(x)).length;
    assert.ok(chung / Math.min(c.size, e.c.size) < 0.5, `gần trùng câu của kho cũ ${e.at}: ${ten.get(q)} “${q.q.slice(0, 50)}”`);
  }); });
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
// đã xem (Phiên N9-gk2-tin-congnghe): chữ chung, câu kia không cho biết điều câu này hỏi. Tin học: “cần kiểm tra”, “các ô trong”,
// “thoả mãn điều kiện”, “có giá trị”, “tất cả các”, “tổng chi của”, “gia đình chi”, “gõ vào ô”, “allow whole number” (lựa chọn sai của
// câu chọn List): cụm từ thường; “tiết kiệm”, “mong muốn cá nhân”, “cho nhu cầu”: tên ba mục của quy tắc 50-30-20 có ở cả hai câu về
// quy tắc này, câu kia không cho biết phần 20% dành cho mục nào hay vé xem phim thuộc mục nào; “được nhận vào”, “nhận vào ô”: ý của câu
// đúng/sai 4 ý về giá trị nào được nhận, không nói ô hiện thông báo lỗi (ba lựa chọn sai của câu kia cũng là giá trị không được nhận);
// “tháng 3”: tháng của câu tiền tiêu vặt, không phải tháng trên biểu đồ. Công nghệ: “aptomat”: tên thiết bị có ở nhiều câu, không câu
// nào nói aptomat tự động cắt mạch khi ngắn mạch, quá tải; “đồng” (đồng hồ vạn năng, dây đồng): không câu nào nói cực nối điện làm bằng
// đồng; “công tơ điện”: câu nối kí hiệu và lựa chọn sai của câu cầu dao không nói công tơ điện 1 pha; “sơ đồ lắp”, “đồ lắp đặt”: câu kia
// hỏi các bước thiết kế sơ đồ lắp đặt, không nói sơ đồ nào dùng để dự trù vật liệu; “16 a”, “10 a”: loại thiết bị của câu khác (cổng đo
// 10 A, công tắc của bình nóng lạnh, danh sách aptomat, ổ cắm để chọn), không phải kết quả tính cho mạch câu này hỏi; “ổ lấy điện”, “bóng
// đèn số”, “lấy điện số”, “và bóng đèn”, “số 2 và”, “nối với nhau”, “các thiết bị”, “đồ dùng điện”, “chọn thang đo”, “đo màu đen”, “điện
// tiêu thụ”, “phích cắm điện”, “rồi mới chuyển”, “được vẽ ở”, “công tắc được vẽ”, “dây dẫn nối”, “dùng an toàn”, “cần kiểm tra”: cụm từ
// thường.
const DA_XEM = [
  "tin-de2#4 → tin-de1#2: gõ vào ô",
  "tin-de1#17 → tin-de1#6: cần kiểm tra",
  "tin-de1#24 → tin-de1#11: các ô trong",
  "tin-de2#4 → tin-de1#11: thoả mãn điều",
  "tin-de2#4 → tin-de1#11: mãn điều kiện",
  "tin-de2#12 → tin-de1#11: thoả mãn điều",
  "tin-de2#12 → tin-de1#11: mãn điều kiện",
  "tin-de2#16 → tin-de1#16: tiết kiệm",
  "tin-de1#5 → tin-de2#4: được nhận vào",
  "tin-de1#5 → tin-de2#4: nhận vào ô",
  "tin-de1#3 → tin-de2#5: allow whole number",
  "tin-de1#12 → tin-de2#6: có giá trị",
  "tin-de2#25 → tin-de2#6: có giá trị",
  "tin-de1#16 → tin-de2#11: cho nhu cầu",
  "tin-de1#16 → tin-de2#16: mong muốn cá",
  "tin-de1#16 → tin-de2#16: muốn cá nhân",
  "tin-de1#11 → tin-de2#17: tất cả các",
  "tin-de2#23 → tin-de2#17: tổng chi của",
  "tin-de2#7 → tin-de2#23: gia đình chi",
  "tin-de2#7 → tin-de2#23: đình chi nhiều",
  "tin-de1#25 → tin-de2#24: tháng 3",
  "congnghe-de1#21 → congnghe-de1#1: aptomat",
  "congnghe-de1#23 → congnghe-de1#1: aptomat",
  "congnghe-de2#3 → congnghe-de1#1: aptomat",
  "congnghe-de2#19 → congnghe-de1#1: aptomat",
  "congnghe-de2#21 → congnghe-de1#1: aptomat",
  "congnghe-de2#24 → congnghe-de1#1: aptomat",
  "congnghe-de2#25 → congnghe-de1#1: aptomat",
  "congnghe-de1#6 → congnghe-de1#2: đồng",
  "congnghe-de1#7 → congnghe-de1#2: đồng",
  "congnghe-de1#8 → congnghe-de1#2: đồng",
  "congnghe-de1#10 → congnghe-de1#2: đồng",
  "congnghe-de2#6 → congnghe-de1#2: đồng",
  "congnghe-de2#7 → congnghe-de1#2: đồng",
  "congnghe-de2#8 → congnghe-de1#2: đồng",
  "congnghe-de2#9 → congnghe-de1#2: đồng",
  "congnghe-de2#10 → congnghe-de1#2: đồng",
  "congnghe-de2#22 → congnghe-de1#2: đồng",
  "congnghe-de1#12 → congnghe-de1#7: công tơ điện",
  "congnghe-de2#1 → congnghe-de1#7: công tơ điện",
  "congnghe-de1#10 → congnghe-de1#8: chọn thang đo",
  "congnghe-de2#10 → congnghe-de1#8: chọn thang đo",
  "congnghe-de1#3 → congnghe-de1#11: dây dẫn nối",
  "congnghe-de2#11 → congnghe-de1#11: nối với nhau",
  "congnghe-de2#13 → congnghe-de1#13: sơ đồ lắp",
  "congnghe-de2#13 → congnghe-de1#13: đồ lắp đặt",
  "congnghe-de1#16 → congnghe-de1#15: ổ lấy điện",
  "congnghe-de1#17 → congnghe-de1#15: ổ lấy điện",
  "congnghe-de1#17 → congnghe-de1#15: lấy điện số",
  "congnghe-de1#17 → congnghe-de1#15: bóng đèn số",
  "congnghe-de2#14 → congnghe-de1#15: và bóng đèn",
  "congnghe-de2#14 → congnghe-de1#15: bóng đèn số",
  "congnghe-de2#16 → congnghe-de1#15: ổ lấy điện",
  "congnghe-de2#17 → congnghe-de1#15: ổ lấy điện",
  "congnghe-de2#17 → congnghe-de1#15: số 2 và",
  "congnghe-de2#12 → congnghe-de1#16: công tắc được",
  "congnghe-de2#12 → congnghe-de1#16: tắc được vẽ",
  "congnghe-de2#12 → congnghe-de1#16: được vẽ ở",
  "congnghe-de1#21 → congnghe-de1#18: điện tiêu thụ",
  "congnghe-de1#1 → congnghe-de1#21: đồ dùng điện",
  "congnghe-de1#14 → congnghe-de1#21: đồ dùng điện",
  "congnghe-de1#16 → congnghe-de1#21: đồ dùng điện",
  "congnghe-de2#3 → congnghe-de1#21: đồ dùng điện",
  "congnghe-de2#13 → congnghe-de1#21: đồ dùng điện",
  "congnghe-de2#16 → congnghe-de1#21: đồ dùng điện",
  "congnghe-de2#19 → congnghe-de1#21: đồ dùng điện",
  "congnghe-de1#4 → congnghe-de1#22: dùng an toàn",
  "congnghe-de1#24 → congnghe-de1#23: 16 a",
  "congnghe-de2#23 → congnghe-de1#23: 16 a",
  "congnghe-de1#22 → congnghe-de2#1: cần kiểm tra",
  "congnghe-de2#19 → congnghe-de2#3: phích cắm điện",
  "congnghe-de1#8 → congnghe-de2#7: rồi mới chuyển",
  "congnghe-de1#6 → congnghe-de2#9: đo màu đen",
  "congnghe-de2#7 → congnghe-de2#9: đo màu đen",
  "congnghe-de1#11 → congnghe-de2#11: nối với nhau",
  "congnghe-de1#14 → congnghe-de2#11: các thiết bị",
  "congnghe-de2#3 → congnghe-de2#11: các thiết bị",
  "congnghe-de1#15 → congnghe-de2#16: ổ lấy điện",
  "congnghe-de1#16 → congnghe-de2#16: ổ lấy điện",
  "congnghe-de1#17 → congnghe-de2#16: ổ lấy điện",
  "congnghe-de2#17 → congnghe-de2#16: ổ lấy điện",
  "congnghe-de1#6 → congnghe-de2#23: 10 a",
  "congnghe-de1#23 → congnghe-de2#23: 10 a",
  "congnghe-de1#24 → congnghe-de2#23: 10 a"
];
assert.deepEqual(chuAll, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loAll, [], "lộ đáp án:\n" + loAll.join("\n"));
const tim = (has) => { const r = kho.filter((q) => q.q.includes(has)); assert.equal(r.length, 1, has); return r[0]; };
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 33”, cả hai vế một cặp nối, hai ô sắp xếp liền nhau, cụm của đáp án
// trắc nghiệm
{
  const gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x }), khac = tim("Lệnh Data Validation");
  const thuLo = (qs) => { const M = new Proxy({}, { get: () => [1, 1, 1] }), r = doLo(qs, M, (q) => q.q.slice(0, 12)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  assert.deepEqual(thuLo([tim("số túi rác"), khac]), [], "câu không sửa thì không báo");
  assert.ok(thuLo([tim("số túi rác"), gia(khac, "Ví dụ ô H2 = 33.")]).includes("33"));
  assert.ok(thuLo([tim("ba kí hiệu dùng trong sơ đồ"), gia(khac, "Kí hiệu 1 là quạt trần.")]).includes("Kí hiệu 1 → Quạt trần"));
  const sx = tim("Sắp xếp các việc Phúc làm");
  assert.ok(thuLo([sx, gia(khac, sx.o[0] + ". Sau đó: " + sx.o[1] + ".")]).includes(sx.o[0] + " → " + sx.o[1]));
  assert.ok(thuLo([tim("que đo màu đen luôn được nối"), gia(khac, "Que màu đen cắm vào cổng chung COM.")]).includes("cổng chung com"));
}

/* ---------- bộ đọc hình, bộ tính công thức tự thử với hình, công thức cố ý viết sai ---------- */
{
  const loi = (f, re) => assert.throws(f, re);
  const doi = (s, a, b) => { assert.ok(s.includes(a), "chuỗi để sửa: " + a); return s.replace(a, b); };
  // bộ tính công thức, sao chép công thức, xác thực dữ liệu
  const o = { A1: 1, A2: 2, A3: 3, B1: "Bánh mì", B2: "Xôi", B3: "bánh bao", C1: 10, C2: 20, C3: 30 };
  assert.equal(tinh('=COUNTIF(A1:A3,">=2")', o), 2);
  assert.equal(tinh('=COUNTIF(B1:B3,"Bánh*")', o), 2, "không phân biệt chữ hoa, chữ thường");
  assert.equal(tinh('=COUNTIF(B1:B3,"Xôi")', o), 1);
  assert.equal(tinh('=SUMIF(A1:A3,">1",C1:C3)', o), 50);
  assert.equal(tinh('=SUMIF(A1:A3,"<3")', o), 3);
  assert.equal(tinh('=IF(A2>=2,"Đạt","Chưa đạt")', o), "Đạt");
  assert.equal(tinh('=IF(A1>=2,"Giỏi",IF(A1>=1,"Khá","Yếu"))', o), "Khá");
  assert.equal(tinh("=SUM(C1:C3)-A3", o), 57);
  assert.equal(tinh("=IF(A1>50%,1,0)", o), 1);
  assert.equal(chep("=COUNTIF($B$2:$B$31,F2)", 1, 0), "=COUNTIF($B$2:$B$31,F3)");
  assert.equal(chep("=$B2+C$3", 2, 1), "=$B4+D$3");
  assert.equal(chep('=IF(B2>=50,"B2","C")', 1, 0), '=IF(B3>=50,"B2","C")', "chữ trong ngoặc kép giữ nguyên khi sao chép");
  loi(() => tinh("=SUMIF(A1:A3,1,C1:C2)", o), /range và sum_range cùng số ô/);
  loi(() => tinh("=COUNTIF(A1:A3", o), /công thức thiếu “\)”/);
  const tl = thietLap("Allow: Decimal; Data: greater than; Minimum: 0.");
  assert.deepEqual([0, 0.5, 7].map((v) => nhanGiaTri(tl, v)), [false, true, true]);
  assert.deepEqual([2, 6, 2.5].map((v) => nhanGiaTri(thietLap("Allow: Whole number; Data: less than; Maximum: 6"), v)), [true, false, false]);
  // trang tính (hình sửa xong mới đưa vào bộ đọc; bộ đọc phải báo đúng chỗ sai)
  const hong = (doc, goc, sai, re) => { assert.notEqual(sai, goc, "hình chưa bị sửa"); assert.throws(() => doc(sai), re); };
  const bang = tim("điểm bài kiểm tra của 10 bạn").svg;
  assert.doesNotThrow(() => docTrang(bang));
  hong(docTrang, bang, bang.replace(/ text-anchor="end"/, ""), /ô chữ căn trái, ô số căn phải/);
  hong(docTrang, bang, doi(bang, 'fill="muted">B</text>', 'fill="muted">D</text>'), /tên cột B/);
  hong(docTrang, bang, doi(bang, ">Giang</text>", ">Giang Thị Hồng Nhung</text>"), /chữ vừa ô/);
  // biểu đồ cột
  const cot = tim("bốn tháng đầu năm").svg;
  hong(docCot2, cot, doi(cot, ">16</text>", ">17</text>"), /số ở đỉnh cột khớp chiều cao/);
  // sơ đồ nguyên lí
  const sd = tim("Phúc đóng công tắc số 4").svg;
  hong(docSoDo, sd, doi(sd, '<circle cx="40" cy="148" r="3" fill="ink" stroke="none"/>', ""), /chấm tròn đậm đúng ở chỗ nối/);
  hong(docSoDo, sd, doi(sd, "</svg>", '<circle cx="160" cy="148" r="3" fill="ink" stroke="none"/></svg>'), /chấm tròn đậm ở đầu dây/);
  hong(docSoDo, sd, doi(sd, 'x2="115" y2="142"', 'x2="116" y2="151"'), /trạng thái ngắt/);
  hong(docSoDo, sd, doi(sd, '<line x1="40" y1="148" x2="98" y2="148" stroke="ink" stroke-width="2"/>', ""), /hai đầu nối/);
  hong(docSoDo, sd, doi(sd, "</svg>", '<line x1="160" y1="60" x2="160" y2="180" stroke="ink" stroke-width="2"/></svg>'), /hai dây chéo nhau/);
  // hình kí hiệu
  const kh = tim("ba kí hiệu dùng trong sơ đồ").svg;
  hong(docKiHieu, kh, doi(kh, ">kWh</text>", ">Wh</text>"), /chưa rõ là thiết bị nào/);
  assert.deepEqual(docKiHieu(doi(kh, ">W</text>", ">V</text>"))[2], [3, "Vôn kế"], "đọc chữ trong vòng tròn của đồng hồ đo");
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book; trùng ý với các kho khác (Rút ra N21) ----------
   Cụm từ chung của môn (tên bài, tên mô đun, cú pháp hàm IF như sách) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ. */
const khongDau = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const TU_CHUNG = ["Hoàn thiện bảng tính quản lí tài chính gia đình", "bảng tính quản lí tài chính gia đình", "Sử dụng công cụ xác thực dữ liệu",
  "Thiết bị đóng cắt và lấy điện trong gia đình", "Vật liệu, thiết bị và dụng cụ dùng cho lắp đặt mạng điện trong nhà", "Lắp đặt mạng điện trong nhà",
  "=IF(logical_test, [value_if_true], [value_if_false])"]
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const boChuoi = (ds, k) => { const out = new Map(); ds.forEach(([id, s]) => { const w = khongDau(s).split(" ").filter(Boolean); for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k).join(" "); if (!out.has(c)) out.set(c, new Set()); out.get(c).add(id); } }); return out; };
const bao = (bo, k) => [...new Set(kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].filter((c) => bo.has(c)).map((c) => `${ten.get(q)} ~ ${[...bo.get(c)].join(", ")}: ${c}`)))];
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
if (SACH.length) {
  assert.ok(["tin-hoc-9", "cong-nghe-9-lap-dat-mang-dien-trong-nha"].every((c) => SACH.some((f) => f.includes(path.join("lop-9", c)))), "OnUp-Book có Tin học 9, Công nghệ 9 – Lắp đặt mạng điện trong nhà");
  const ds = SACH.map((f) => [path.basename(path.dirname(f)), fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")]);
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + bao(boChuoi(ds, 6), 6).join("\n"));
  assert.deepEqual(bao(boChuoi(ds, 8), 8), [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
{
  const cua = new Set(MON.flatMap((S) => [S.de1, S.de2, S.pool]));
  const ds = BANKS.filter((b) => !cua.has(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => [b.id, chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).join(" | ")]));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + bao(boChuoi(ds, 5), 5).join("\n"));
  assert.deepEqual(bao(boChuoi(ds, 8), 8), [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(CHECKS.length + " câu đã tính lại hoặc đọc lại hình; " + MON.map((S) => `${S.ten}: kho ${S.kho.length} câu, ma trận 10 – 8 – 7 trên ${S.chuDe.length} chủ đề`).join("; ") + ".");
console.log("MATH OK");
