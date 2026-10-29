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
const thietLap = (s) => { const g = (k) => { const m = s.match(new RegExp(k + ": ([^;]+)")); return m && m[1].trim(); }; return { allow: g("Allow"), data: g("Data"), min: g("Minimum"), max: g("Maximum") }; };
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
  const tb = [], trongTron = (p, c) => dist(p, c) <= 12 + 1e-6;
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
  return { tb, A: f(keyP(nguon.A)), O: f(keyP(nguon.O)), diem, nguon, day };
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
